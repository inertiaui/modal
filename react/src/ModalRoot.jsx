import { createElement, useEffect, useState, useRef } from 'react'
import { default as Axios } from 'axios'
import { except, kebabCase, generateId, sameUrlPath } from './helpers'
import { router, usePage } from '@inertiajs/react'
import { mergeDataIntoQueryString } from '@inertiajs/core'
import { createContext, useContext } from 'react'
import ModalRenderer from './ModalRenderer'
import { getConfig } from './config'

const ModalStackContext = createContext(null)
ModalStackContext.displayName = 'ModalStackContext'

let pageVersion = null
let resolveComponent = null
let baseUrl = null
let baseModalsToWaitFor = {}
let localStackCopy = []
let pendingModalUpdates = {}

export const ModalStackProvider = ({ children }) => {
    const [stack, setStack] = useState([])
    const [localModals, setLocalModals] = useState({})

    const updateStack = (withStack) => {
        setStack((prevStack) => {
            const newStack = withStack([...prevStack])

            const isOnTopOfStack = (modalId) => {
                if (newStack.length < 2) {
                    return true
                }

                return (
                    newStack
                        .map((modal) => ({ id: modal.id, shouldRender: modal.shouldRender }))
                        .reverse()
                        .find((modal) => modal.shouldRender)?.id === modalId
                )
            }

            newStack.forEach((modal, index) => {
                newStack[index].onTopOfStack = isOnTopOfStack(modal.id)
                newStack[index].getParentModal = () => {
                    if (index < 1) {
                        // This is the first modal in the stack
                        return null
                    }

                    // Find the first open modal before this one
                    return newStack
                        .slice(0, index)
                        .reverse()
                        .find((modal) => modal.isOpen)
                }
                newStack[index].getChildModal = () => {
                    if (index === newStack.length - 1) {
                        // This is the last modal in the stack
                        return null
                    }

                    // Find the first open modal after this one
                    return newStack.slice(index + 1).find((modal) => modal.isOpen)
                }
            })

            return newStack
        })
    }

    useEffect(() => {
        localStackCopy = stack
    }, [stack])

    class Modal {
        constructor(component, response, config, onClose, afterLeave) {
            this.id = response.id ?? generateId()
            this.isOpen = false
            this.shouldRender = false
            this.listeners = {}

            this.component = component
            this.props = response.props
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

            this.index = -1 // Will be set when added to the stack
            this.getParentModal = () => null // Will be set in push()
            this.getChildModal = () => null // Will be set in push()
            this.onTopOfStack = true // Will be updated in push()
        }

        static generateId() {
            if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
                return `inertiaui_modal_${crypto.randomUUID()}`
            }
            // Fallback for environments where crypto.randomUUID is not available
            return `inertiaui_modal_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`
        }

        show = () => {
            updateStack((prevStack) =>
                prevStack.map((modal) => {
                    if (modal.id === this.id && !modal.isOpen) {
                        modal.isOpen = true
                        modal.shouldRender = true
                    }
                    return modal
                }),
            )
        }

        setOpen = (open) => {
            open ? this.show() : this.close()
        }

        close = () => {
            updateStack((currentStack) => {
                let modalClosed = false

                const newStack = currentStack.map((modal) => {
                    if (modal.id === this.id && modal.isOpen) {
                        Object.keys(modal.listeners).forEach((event) => {
                            modal.off(event)
                        })

                        modal.isOpen = false
                        modal.onCloseCallback?.()
                        modalClosed = true
                    }
                    return modal
                })

                return modalClosed ? newStack : currentStack
            })
        }

        afterLeave = () => {
            if (this.isOpen) {
                return
            }

            updateStack((prevStack) => {
                const updatedStack = prevStack.map((modal) => {
                    if (modal.id === this.id && !modal.isOpen) {
                        modal.shouldRender = false
                        modal.afterLeaveCallback?.()
                        modal.afterLeaveCallback = null
                    }
                    return modal
                })

                return this.index === 0 ? [] : updatedStack
            })
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
                    // e.g. onRefreshKey -> refresh-key
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
            updateStack((prevStack) => prevStack) // Trigger re-render
        }
    }

    const pushFromResponseData = (responseData, config = {}, onClose = null, onAfterLeave = null) => {
        return resolveComponent(responseData.component).then((component) => push(component, responseData, config, onClose, onAfterLeave))
    }

    const loadDeferredProps = (modal) => {
        const deferred = modal.response?.meta?.deferredProps

        if (!deferred) {
            return
        }

        Object.keys(deferred).forEach((key) => {
            modal.reload({ only: deferred[key] })
        })
    }

    const push = (component, response, config, onClose, afterLeave) => {
        const newModal = new Modal(component, response, config, onClose, afterLeave)
        newModal.index = stack.length

        updateStack((prevStack) => [...prevStack, newModal])
        loadDeferredProps(newModal)

        newModal.show()

        return newModal
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

    const visitModal = (url, options = {}) =>
        visit(
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

    const visit = (
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
    ) => {
        const modalId = generateId()

        return new Promise((resolve, reject) => {
            if (href.startsWith('#')) {
                resolve(pushLocalModal(href.substring(1), config, onClose, onAfterLeave))
                return
            }

            const [url, data] = mergeDataIntoQueryString(method, href || '', payload, queryStringArrayFormat)

            let useInertiaRouter = useBrowserHistory && stack.length === 0

            if (stack.length === 0) {
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
                baseModalsToWaitFor = {}

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

            //

            onStart?.()

            Axios({
                url,
                method,
                data,
                headers,
            })
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

    const registerLocalModal = (name, callback) => {
        setLocalModals((prevLocalModals) => ({
            ...prevLocalModals,
            [name]: { name, callback },
        }))
    }

    const removeLocalModal = (name) => {
        setLocalModals((prevLocalModals) => {
            const newLocalModals = { ...prevLocalModals }
            delete newLocalModals[name]
            return newLocalModals
        })
    }

    const value = {
        stack,
        localModals,
        push,
        pushFromResponseData,
        length: () => localStackCopy.length,
        closeAll: () => {
            localStackCopy.reverse().forEach((modal) => modal.close())
        },
        reset: () => updateStack(() => []),
        visit,
        visitModal,
        registerLocalModal,
        removeLocalModal,
        onModalOnBase: (modalOnBase) => {
            const resolve = baseModalsToWaitFor[modalOnBase.id]

            if (resolve) {
                resolve(modalOnBase)
                delete baseModalsToWaitFor[modalOnBase.id]
            }
        },
    }

    return <ModalStackContext.Provider value={value}>{children}</ModalStackContext.Provider>
}

export const useModalStack = () => {
    const context = useContext(ModalStackContext)
    if (context === null) {
        throw new Error('useModalStack must be used within a ModalStackProvider')
    }
    return context
}

export const modalPropNames = ['closeButton', 'closeExplicitly', 'maxWidth', 'paddingClasses', 'panelClasses', 'position', 'slideover']

export const initFromPageProps = (pageProps) => {
    if (pageProps.initialPage) {
        pageVersion = pageProps.initialPage.version
    }

    if (pageProps.resolveComponent) {
        resolveComponent = pageProps.resolveComponent
    }
}

export const renderApp = (App, pageProps) => {
    initFromPageProps(pageProps)

    const renderInertiaApp = ({ Component, props, key }) => {
        const renderComponent = () => {
            const child = createElement(Component, { key, ...props })

            if (typeof Component.layout === 'function') {
                return Component.layout(child)
            }

            if (Array.isArray(Component.layout)) {
                const layouts = Component.layout
                    .concat(child)
                    .reverse()
                    .reduce((children, Layout) => createElement(Layout, props, children))

                return layouts
            }

            return child
        }

        return (
            <>
                {renderComponent()}
                <ModalRoot />
            </>
        )
    }

    return (
        <ModalStackProvider>
            <App {...pageProps}>{renderInertiaApp}</App>
        </ModalStackProvider>
    )
}

export const ModalRoot = ({ children }) => {
    const context = useContext(ModalStackContext)
    const $page = usePage()

    let isNavigating = false
    let previousModalOnBase = false
    let initialModalStillOpened = $page.props?._inertiaui_modal ? true : false

    useEffect(() => router.on('start', () => (isNavigating = true)), [])
    useEffect(() => router.on('finish', () => (isNavigating = false)), [])
    useEffect(
        () =>
            router.on('navigate', function ($event) {
                const modalOnBase = $event.detail.page.props._inertiaui_modal

                if (!modalOnBase) {
                    previousModalOnBase && context.closeAll()
                    baseUrl = null
                    initialModalStillOpened = false
                    return
                }

                previousModalOnBase = modalOnBase
                baseUrl = modalOnBase.baseUrl

                context
                    .pushFromResponseData(modalOnBase, {}, () => {
                        if (!modalOnBase.baseUrl) {
                            console.error('No base url in modal response data so cannot navigate back')
                            return
                        }
                        if (!isNavigating && window.location.href !== modalOnBase.baseUrl) {
                            router.visit(modalOnBase.baseUrl, {
                                preserveScroll: true,
                                preserveState: true,
                            })
                        }
                    })
                    .then(context.onModalOnBase)
            }),
        [],
    )

    const axiosRequestInterceptor = (config) => {
        // A Modal is opened on top of a base route, so we need to pass this base route
        // so it can redirect back with the back() helper method...
        config.headers['X-InertiaUI-Modal-Base-Url'] = baseUrl ?? (initialModalStillOpened ? $page.props._inertiaui_modal?.baseUrl : null)

        return config
    }

    useEffect(() => {
        Axios.interceptors.request.use(axiosRequestInterceptor)
        return () => Axios.interceptors.request.eject(axiosRequestInterceptor)
    }, [])

    const previousModalRef = useRef()

    useEffect(() => {
        const newModal = $page.props?._inertiaui_modal
        const previousModal = previousModalRef.current

        // Store the current value for the next render
        previousModalRef.current = newModal

        if (newModal && previousModal && newModal.component === previousModal.component && sameUrlPath(newModal.url, previousModal.url)) {
            context.stack[0]?.updateProps(newModal.props ?? {})
        }
    }, [$page.props?._inertiaui_modal])

    return (
        <>
            {children}
            {context.stack.length > 0 && <ModalRenderer index={0} />}
        </>
    )
}
