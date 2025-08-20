import { generateId, except, kebabCase } from './helpers'
import { router } from '@inertiajs/svelte'
import { mergeDataIntoQueryString } from '@inertiajs/core'
import { default as Axios } from 'axios'
import { getConfig } from './config'
import { mount } from 'svelte'
import ModalRoot from './ModalRoot.svelte'

let pageVersion = null
let resolveComponent = null

const stack = $state([])
let localModals = $state({})
let pendingModalUpdates = $state({})
let baseUrl = $state(null)
let baseModalsToWaitFor = $state({})

const setComponentResolver = (resolver) => {
    resolveComponent = resolver
}

export const initFromPageProps = (pageProps) => {
    if (pageProps.initialPage) {
        pageVersion = pageProps.initialPage.version
    }

    if (pageProps.resolveComponent) {
        resolveComponent = pageProps.resolveComponent
    }
}

class Modal {
    constructor(component, response, config, onClose, afterLeave) {
        this.id = response.id ?? generateId()
        this.isOpen = $state(false)
        this.shouldRender = $state(false)
        this.listeners = {}

        this.component = component
        this.props = $state(response.props)
        this.response = response
        this.config = config ?? {}
        this.onCloseCallback = onClose
        this.afterLeaveCallback = afterLeave

        if (pendingModalUpdates[this.id]) {
            this.config = {
                ...this.config,
                ...(pendingModalUpdates[this.id].config ?? {}),
            }

            const pendingOnClose = pendingModalUpdates[this.id].onClose
            const pendingOnAfterLeave = pendingModalUpdates[this.id].onAfterLeave

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

            delete pendingModalUpdates[this.id]
        }

        this.index = $derived(stack.findIndex((m) => m.id === this.id))
        this.onTopOfStack = $derived.by(() => {
            if (stack.length < 2) {
                return true
            }

            const modals = stack.map((modal) => ({ id: modal.id, shouldRender: modal.shouldRender }))

            return modals.reverse().find((modal) => modal.shouldRender)?.id === this.id
        })
    }

    getParentModal = () => {
        const index = this.index

        if (index < 1) {
            // This is the first modal in the stack
            return null
        }

        // Find the first open modal before this one
        return stack
            .slice(0, index)
            .reverse()
            .find((modal) => modal.isOpen)
    }

    getChildModal = () => {
        const index = this.index

        if (index === stack.length - 1) {
            // This is the last modal in the stack
            return null
        }

        // Find the first open modal after this one
        return stack.slice(index + 1).find((modal) => modal.isOpen)
    }

    show = () => {
        const index = this.index

        if (index > -1) {
            if (this.isOpen) {
                // Only open if the modal is closed
                return
            }

            this.isOpen = true
            this.shouldRender = true
        }
    }

    close = () => {
        const index = this.index

        if (index > -1) {
            if (!this.isOpen) {
                // Only close if the modal is open
                return
            }

            Object.keys(this.listeners).forEach((event) => {
                this.off(event)
            })

            this.isOpen = false
            this.onCloseCallback?.()
            this.onCloseCallback = null
        }
    }

    setOpen = (open) => {
        open ? this.show() : this.close()
    }

    afterLeave = () => {
        const index = this.index

        if (index > -1) {
            if (this.isOpen) {
                // Only execute the callback if the modal is closed
                return
            }

            this.shouldRender = false
            this.afterLeaveCallback?.()
            this.afterLeaveCallback = null
        }

        if (index === 0) {
            stack.length = 0 // NL: https://svelte.dev/docs/svelte/$state#Passing-state-across-modules
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

    registerEventListenersFromProps = (props) => {
        const unsubscribers = []

        Object.keys(props)
            .filter((key) => key.startsWith('on'))
            .forEach((key) => {
                const eventName = kebabCase(key).replace(/^on-/, '')
                this.on(eventName, props[key])
                unsubscribers.push(() => this.off(eventName, props[key]))
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
                'X-InertiaUI-Modal-Base-Url': baseUrl,
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
        Object.assign(this.props, props)
    }
}

function registerLocalModal(name, callback) {
    localModals[name] = { name, callback }
}

function pushLocalModal(name, config, onClose, afterLeave) {
    if (!localModals[name]) {
        throw new Error(`The local modal "${name}" has not been registered.`)
    }

    const modal = push(null, {}, config, onClose, afterLeave)
    modal.name = name
    localModals[name].callback(modal)
    return modal
}

function pushFromResponseData(responseData, config = {}, onClose = null, onAfterLeave = null) {
    return resolveComponent(responseData.component).then((component) => push(component, responseData, config, onClose, onAfterLeave))
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
    stack.push(newModal)
    loadDeferredProps(newModal)

    // Use setTimeout to ensure the modal is added to the stack before showing
    setTimeout(() => newModal.show(), 0)

    return newModal
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
    onError = null
) {
    const modalId = generateId()

    return new Promise((resolve, reject) => {
        if (href.startsWith('#')) {
            resolve(pushLocalModal(href.substring(1), config, onClose, onAfterLeave))
            return
        }

        const [url, data] = mergeDataIntoQueryString(method, href || '', payload, queryStringArrayFormat)

        let useInertiaRouter = useBrowserHistory && stack.length === 0

        if (stack.length === 0) {
            console.log('setting baseUrl', typeof window)
            baseUrl = typeof window !== 'undefined' ? window.location.href : ''
        }

        headers = {
            ...headers,
            Accept: 'text/html, application/xhtml+xml',
            'X-Requested-With': 'XMLHttpRequest',
            'X-Inertia': true,
            'X-Inertia-Version': pageVersion,
            'X-InertiaUI-Modal': modalId,
            'X-InertiaUI-Modal-Use-Router': useInertiaRouter ? 1 : 0,
            'X-InertiaUI-Modal-Base-Url': baseUrl,
        }

        if (useInertiaRouter) {
            //baseModalsToWaitFor = {} // NL: this came from react

            pendingModalUpdates[modalId] = {
                config,
                onClose,
                onAfterLeave,
            }

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
                    baseModalsToWaitFor[modalId] = resolve
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

export function visitModal(url, options = {}) {
    return visit(
        url,
        options.method ?? 'get',
        options.data ?? {},
        options.headers ?? {},
        options.config ?? {},
        options.onClose,
        options.onAfterLeave,
        options.queryStringArrayFormat ?? 'brackets',
        options.navigate ?? getConfig('navigate'),
        options.onStart,
        options.onSuccess,
        options.onError,
    ).then((modal) => {
        const listeners = options.listeners ?? {}

        Object.keys(listeners).forEach((event) => {
            // e.g. refreshKey -> refresh-key
            const eventName = kebabCase(event)
            modal.on(eventName, listeners[event])
        })

        return modal
    })
}

export const modalPropNames = ['closeButton', 'closeExplicitly', 'maxWidth', 'paddingClasses', 'panelClasses', 'position', 'slideover']

export const renderApp = (el, App, pageProps) => {
    initFromPageProps(pageProps)
    mount(ModalRoot, { target: el, props: { el, App, pageProps } })
}

export function useModalStack() {
    return {
        setComponentResolver,
        getBaseUrl: () => baseUrl,
        setBaseUrl: (url) => (baseUrl = url),
        stack,
        push,
        pushFromResponseData,
        length: () => stack.length,
        closeAll: () => [...stack].reverse().forEach((modal) => modal.close()),
        reset: () => (stack.length = 0),
        visit,
        visitModal,
        registerLocalModal,
        removeLocalModal: (name) => delete localModals[name],
        onModalOnBase: (modalOnBase) => {
            const resolve = baseModalsToWaitFor[modalOnBase.id]

            if (resolve) {
                resolve(modalOnBase)
                delete baseModalsToWaitFor[modalOnBase.id]
            }
        },
    }
}
