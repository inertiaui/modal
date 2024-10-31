import { computed, readonly, ref, markRaw, nextTick, h } from 'vue'
import { except, only, waitFor } from './helpers'
import { router } from '@inertiajs/vue3'
import { usePage } from '@inertiajs/vue3'
import { mergeDataIntoQueryString } from '@inertiajs/core'
import { default as Axios } from 'axios'
import ModalRoot from './ModalRoot.vue'

let resolveComponent = null
const baseUrl = ref(null)
const stack = ref([])
const localModals = ref({})

const setComponentResolver = (resolver) => {
    resolveComponent = resolver
}

class Modal {
    constructor(component, response, config, onClose, afterLeave) {
        this.id = Modal.generateId()
        this.isOpen = false
        this.shouldRender = false
        this.listeners = {}

        this.component = component
        this.props = ref(response.props)
        this.response = response
        this.config = config
        this.onCloseCallback = onClose
        this.afterLeaveCallback = afterLeave

        this.index = computed(() => stack.value.findIndex((m) => m.id === this.id))
        this.onTopOfStack = computed(() => {
            if (stack.value.length < 2) {
                return true
            }

            const modals = stack.value.map((modal) => ({ id: modal.id, shouldRender: modal.shouldRender }))

            return modals.reverse().find((modal) => modal.shouldRender)?.id === this.id
        })
    }

    update = (config, onClose, afterLeave) => {
        const index = this.index.value

        if (index > -1) {
            stack.value[index].config = config
            stack.value[index].onCloseCallback = onClose
            stack.value[index].afterLeaveCallback = afterLeave
        }
    }

    static generateId() {
        if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
            return `inertiaui_modal_${crypto.randomUUID()}`
        }
        // Fallback for environments where crypto.randomUUID is not available
        return `inertiaui_modal_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`
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
        this.listeners[event] = this.listeners[event] ?? []
        this.listeners[event].push(callback)
    }

    off = (event, callback) => {
        if (callback) {
            this.listeners[event] = this.listeners[event]?.filter((cb) => cb !== callback) ?? []
        } else {
            delete this.listeners[event]
        }
    }

    emit = (event, ...args) => {
        this.listeners[event]?.forEach((callback) => callback(...args))
    }

    registerEventListenersFromAttrs = ($attrs) => {
        const unsubscribers = []

        Object.keys($attrs)
            .filter((key) => key.startsWith('on'))
            .forEach((key) => {
                // e.g. onRefreshKey -> refresh-key
                const snakeCaseKey = key
                    .replace(/^on/, '')
                    .replace(/^./, (firstLetter) => firstLetter.toLowerCase())
                    .replace(/([A-Z])/g, '-$1')
                    .toLowerCase()

                this.on(snakeCaseKey, $attrs[key])
                unsubscribers.push(() => this.off(snakeCaseKey, $attrs[key]))
            })

        return () => unsubscribers.forEach((unsub) => unsub())
    }

    reload = (options = {}) => {
        let keys = Object.keys(this.response.props)

        if (options.only) {
            keys = only(keys, options.only)
        }

        if (options.except) {
            keys = except(keys, options.except)
        }

        if (!this.response?.url) {
            return
        }

        Axios.get(this.response.url, {
            headers: {
                Accept: 'text/html, application/xhtml+xml',
                'X-Inertia': true,
                'X-Inertia-Partial-Component': this.response.component,
                'X-Inertia-Version': this.response.version,
                'X-Inertia-Partial-Data': keys.join(','),
                'X-InertiaUI-Modal': true,
                'X-InertiaUI-Modal-Use-Router': 0,
                'X-InertiaUI-Modal-Base-Url': baseUrl.value,
            },
        }).then((response) => {
            this.updateProps(response.data.props)
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
) {
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
            'X-InertiaUI-Modal': true,
            'X-InertiaUI-Modal-Use-Router': useInertiaRouter ? 1 : 0,
            'X-InertiaUI-Modal-Base-Url': baseUrl.value,
        }

        if (useInertiaRouter) {
            // Pushing the modal to the stack will be handled by the ModalRoot...
            return router.visit(url, {
                method,
                data,
                headers,
                preserveScroll: true,
                preserveState: true,
                onError: reject,
                onFinish: () =>
                    waitFor(() => stack.value[0]).then((modal) => {
                        const originalOnClose = modal.onCloseCallback
                        const originalAfterLeave = modal.afterLeaveCallback

                        modal.update(
                            config,
                            () => {
                                onClose?.()
                                originalOnClose?.()
                            },
                            () => {
                                onAfterLeave?.()
                                originalAfterLeave?.()
                            },
                        )

                        resolve(modal)
                    }),
            })
        }

        Axios({ url, method, data, headers })
            .then((response) => resolve(pushFromResponseData(response.data, config, onClose, onAfterLeave)))
            .catch(reject)
    })
}

function push(component, response, config, onClose, afterLeave) {
    const newModal = new Modal(component, response, config, onClose, afterLeave)
    stack.value.push(newModal)
    nextTick(() => {
        newModal.show()
    })
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
    }
}
