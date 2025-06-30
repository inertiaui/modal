import { computed, readonly, ref, markRaw, h, nextTick } from 'vue'
import { generateId, except, kebabCase } from './helpers'
import { router } from '@inertiajs/vue3'
import { usePage } from '@inertiajs/vue3'
import { mergeDataIntoQueryString } from '@inertiajs/core'
import { default as Axios } from 'axios'
import ModalRoot from './ModalRoot.vue'

let resolveComponent = null

const pendingModalUpdates = ref({})
const baseUrl = ref(null)
const baseModalsToWaitFor = ref({})
const stack = ref([])
const localModals = ref({})

const setComponentResolver = (resolver) => {
    resolveComponent = resolver
}

export const initFromPageProps = (pageProps) => {
    if (pageProps.resolveComponent) {
        resolveComponent = pageProps.resolveComponent
    }
}

class Modal {
    constructor(component, response, config, onClose, afterLeave) {
        this.id = response.id ?? generateId()
        this.isOpen = false
        this.shouldRender = false
        this.listeners = {}

        this.component = component
        this.props = ref(response.props)
        this.response = response
        this.config = config ?? {}
        this.onCloseCallback = onClose
        this.afterLeaveCallback = afterLeave

        if (pendingModalUpdates.value[this.id]) {
            this.config = {
                ...this.config,
                ...(pendingModalUpdates.value[this.id].config ?? {}),
            }

            const pendingOnClose = pendingModalUpdates.value[this.id].onClose
            const pendingOnAfterLeave = pendingModalUpdates.value[this.id].onAfterLeave

            if (pendingOnClose) {
                this.onCloseCallback = onClose
                    ? () => {
                          onClose()
                          pendingOnClose()
                      }
                    : pendingOnClose
            }

            if (pendingOnAfterLeave) {
                this.afterLeaveCallback = afterLeave
                    ? () => {
                          afterLeave()
                          pendingOnAfterLeave()
                      }
                    : pendingOnAfterLeave
            }

            delete pendingModalUpdates.value[this.id]
        }

        this.index = computed(() => stack.value.findIndex((m) => m.id === this.id))
        this.onTopOfStack = computed(() => {
            if (stack.value.length < 2) {
                return true
            }

            const modals = stack.value.map((modal) => ({ id: modal.id, shouldRender: modal.shouldRender }))

            return modals.reverse().find((modal) => modal.shouldRender)?.id === this.id
        })
    }

    getComponentPropKeys = () => {
        if (Array.isArray(this.component.props)) {
            return this.component.props
        }

        return this.component.props ? Object.keys(this.component.props) : []
    }

    getParentModal = () => {
        const index = this.index.value

        if (index < 1) {
            // This is the first modal in the stack
            return null
        }

        // Find the first open modal before this one
        return stack.value
            .slice(0, index)
            .reverse()
            .find((modal) => modal.isOpen)
    }

    getChildModal = () => {
        const index = this.index.value

        if (index === stack.value.length - 1) {
            // This is the last modal in the stack
            return null
        }

        // Find the first open modal after this one
        return stack.value.slice(index + 1).find((modal) => modal.isOpen)
    }

    show = () => {
        const index = this.index.value

        if (index > -1) {
            if (stack.value[index].isOpen) {
                // Only open if the modal is closed
                return
            }

            stack.value[index].isOpen = true
            stack.value[index].shouldRender = true
        }
    }

    close = () => {
        const index = this.index.value

        if (index > -1) {
            if (!stack.value[index].isOpen) {
                // Only close if the modal is open
                return
            }

            Object.keys(this.listeners).forEach((event) => {
                this.off(event)
            })

            stack.value[index].isOpen = false
            this.onCloseCallback?.()
            this.onCloseCallback = null
        }
    }

    setOpen = (open) => {
        open ? this.show() : this.close()
    }

    afterLeave = () => {
        const index = this.index.value

        if (index > -1) {
            if (stack.value[index].isOpen) {
                // Only execute the callback if the modal is closed
                return
            }

            stack.value[index].shouldRender = false
            this.afterLeaveCallback?.()
            this.afterLeaveCallback = null
        }

        if (index === 0) {
            stack.value = []
        }
    }

    on = (event, callback) => {
        event = kebabCase(event)
        this.listeners[event] = this.listeners[event] ?? []
        this.listeners[event].push(callback)
    }

    off = (event, callback) => {
        event = kebabCase(event)
        if (callback) {
            this.listeners[event] = this.listeners[event]?.filter((cb) => cb !== callback) ?? []
        } else {
            delete this.listeners[event]
        }
    }

    emit = (event, ...args) => {
        this.listeners[kebabCase(event)]?.forEach((callback) => callback(...args))
    }

    registerEventListenersFromAttrs = ($attrs) => {
        const unsubscribers = []

        Object.keys($attrs)
            .filter((key) => key.startsWith('on'))
            .forEach((key) => {
                const eventName = kebabCase(key).replace(/^on-/, '')
                this.on(eventName, $attrs[key])
                unsubscribers.push(() => this.off(eventName, $attrs[key]))
            })

        return () => unsubscribers.forEach((unsub) => unsub())
    }

    reload = (options = {}) => {
        let keys = Object.keys(this.response.props)

        if (options.only) {
            keys = options.only
        }

        if (options.except) {
            keys = except(keys, options.except)
        }

        if (!this.response?.url) {
            return
        }

        const method = (options.method ?? 'get').toLowerCase()
        const data = options.data ?? {}

        options.onStart?.()

        Axios({
            url: this.response.url,
            method,
            data: method === 'get' ? {} : data,
            params: method === 'get' ? data : {},
            headers: {
                ...(options.headers ?? {}),
                Accept: 'text/html, application/xhtml+xml',
                'X-Inertia': true,
                'X-Inertia-Partial-Component': this.response.component,
                'X-Inertia-Version': this.response.version,
                'X-Inertia-Partial-Data': keys.join(','),
                'X-InertiaUI-Modal': generateId(),
                'X-InertiaUI-Modal-Use-Router': 0,
                'X-InertiaUI-Modal-Base-Url': baseUrl.value,
            },
        })
            .then((response) => {
                this.updateProps(response.data.props)
                options.onSuccess?.(response)
            })
            .catch((error) => {
                options.onError?.(error)
            })
            .finally(() => {
                options.onFinish?.()
            })
    }

    updateProps = (props) => {
        Object.assign(this.props.value, props)
    }
}

function registerLocalModal(name, callback) {
    localModals.value[name] = { name, callback }
}

function pushLocalModal(name, config, onClose, afterLeave) {
    if (!localModals.value[name]) {
        throw new Error(`The local modal "${name}" has not been registered.`)
    }

    const modal = push(null, {}, config, onClose, afterLeave)
    modal.name = name
    localModals.value[name].callback(modal)
    return modal
}

function pushFromResponseData(responseData, config = {}, onClose = null, onAfterLeave = null) {
    return resolveComponent(responseData.component).then((component) => push(markRaw(component), responseData, config, onClose, onAfterLeave))
}

function visit(
    href,
    method,
    payload = {},
    headers = {},
    config = {},
    onClose = null,
    onAfterLeave = null,
    queryStringArrayFormat = 'brackets',
    useBrowserHistory = false,
    onStart = null,
    onSuccess = null,
    onError = null,
) {
    const modalId = generateId()

    return new Promise((resolve, reject) => {
        if (href.startsWith('#')) {
            resolve(pushLocalModal(href.substring(1), config, onClose, onAfterLeave))
            return
        }

        const [url, data] = mergeDataIntoQueryString(method, href || '', payload, queryStringArrayFormat)

        let useInertiaRouter = useBrowserHistory && stack.value.length === 0

        if (stack.value.length === 0) {
            baseUrl.value = typeof window !== 'undefined' ? window.location.href : ''
        }

        headers = {
            ...headers,
            Accept: 'text/html, application/xhtml+xml',
            'X-Requested-With': 'XMLHttpRequest',
            'X-Inertia': true,
            'X-Inertia-Version': usePage().version,
            'X-InertiaUI-Modal': modalId,
            'X-InertiaUI-Modal-Use-Router': useInertiaRouter ? 1 : 0,
            'X-InertiaUI-Modal-Base-Url': baseUrl.value,
        }

        if (useInertiaRouter) {
            pendingModalUpdates.value[modalId] = { config, onClose, onAfterLeave }

            // Pushing the modal to the stack will be handled by the ModalRoot...
            return router.visit(url, {
                method,
                data,
                headers,
                preserveScroll: true,
                preserveState: true,
                onError(...args) {
                    onError?.(...args)
                    reject(...args)
                },
                onStart(...args) {
                    onStart?.(...args)
                },
                onSuccess(...args) {
                    onSuccess?.(...args)
                },
                onBefore: () => {
                    baseModalsToWaitFor.value[modalId] = resolve
                },
            })
        }

        onStart?.()

        Axios({ url, method, data, headers })
            .then((response) => {
                onSuccess?.(response)
                resolve(pushFromResponseData(response.data, config, onClose, onAfterLeave))
            })
            .catch((...args) => {
                onError?.(...args)
                reject(...args)
            })
    })
}

function loadDeferredProps(modal) {
    const deferred = modal.response?.meta?.deferredProps

    if (!deferred) {
        return
    }

    Object.keys(deferred).forEach((key) => {
        modal.reload({ only: deferred[key] })
    })
}

function push(component, response, config, onClose, afterLeave) {
    const newModal = new Modal(component, response, config, onClose, afterLeave)
    stack.value.push(newModal)
    loadDeferredProps(newModal)

    nextTick(() => newModal.show())

    return newModal
}

export const modalPropNames = ['closeButton', 'closeExplicitly', 'maxWidth', 'paddingClasses', 'panelClasses', 'position', 'slideover']

export const renderApp = (App, props) => {
    if (props.resolveComponent) {
        resolveComponent = props.resolveComponent
    }

    return () => h(ModalRoot, () => h(App, props))
}

export function useModalStack() {
    return {
        setComponentResolver,
        getBaseUrl: () => baseUrl.value,
        setBaseUrl: (url) => (baseUrl.value = url),
        stack: readonly(stack),
        push,
        pushFromResponseData,
        closeAll: () => [...stack.value].reverse().forEach((modal) => modal.close()),
        reset: () => (stack.value = []),
        visit,
        registerLocalModal,
        removeLocalModal: (name) => delete localModals.value[name],
        onModalOnBase(baseModal) {
            const resolve = baseModalsToWaitFor.value[baseModal.id]

            if (resolve) {
                resolve(baseModal)
                delete baseModalsToWaitFor.value[baseModal.id]
            }
        },
    }
}
