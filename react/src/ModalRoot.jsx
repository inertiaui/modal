import { useEffect, useState } from 'react'
import { default as Axios } from 'axios'
import { except, only, resolveInteriaPageFromRouter } from './helpers'
import { router } from '@inertiajs/react'
import { mergeDataIntoQueryString } from '@inertiajs/core'
import { createContext, useContext } from 'react'
import ModalRenderer from './ModalRenderer'
import { waitFor } from './helpers'

const ModalStackContext = createContext(null)
ModalStackContext.displayName = 'ModalStackContext'

let baseUrl = null
let newModalOnBase = null
let localStackCopy = []

export const ModalStackProvider = ({ children }) => {
    const [stack, setStack] = useState([])
    const [localModals, setLocalModals] = useState({})

    const updateStack = (withStack) => {
        setStack((prevStack) => {
            const newStack = withStack([...prevStack])

            newStack.forEach((modal, index) => {
                newStack[index].index = index
            })

            const isOnTopOfStack = (modalId) => {
                if (newStack.length < 2) {
                    return true
                }

                const modals = newStack.map((modal) => ({ id: modal.id, open: modal.open }))

                return modals.reverse().find((modal) => modal.open)?.id === modalId
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
                        .find((modal) => modal.open)
                }
                newStack[index].getChildModal = () => {
                    if (index === newStack.length - 1) {
                        // This is the last modal in the stack
                        return null
                    }

                    // Find the first open modal after this one
                    return newStack.slice(index + 1).find((modal) => modal.open)
                }

            })

            return newStack
        })
    }

    useEffect(() => {
        localStackCopy = stack
    }, [stack])

    class Modal {
        constructor(component, response, modalProps, onClose, afterLeave) {
            this.id = Modal.generateId()
            this.open = false
            this.shouldRender = false
            this.listeners = {}

            this.component = component
            this.componentProps = response.props
            this.response = response
            this.modalProps = modalProps
            this.onCloseCallback = onClose
            this.afterLeaveCallback = afterLeave

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

        update = (modalProps, onClose, afterLeave) => {
            updateStack((prevStack) =>
                prevStack.map((modal) => {
                    if (modal.id === this.id) {
                        modal.modalProps = modalProps
                        modal.onCloseCallback = onClose
                        modal.afterLeaveCallback = afterLeave
                    }
                    return modal
                }),
            )
        }

        show = () => {
            updateStack((prevStack) =>
                prevStack.map((modal) => {
                    if (modal.id === this.id && !modal.open) {
                        modal.open = true
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
            console.log('Closing', this.id)
            updateStack((prevStack) =>
                prevStack.map((modal) => {
                    if (modal.id === this.id && modal.open) {
                        Object.keys(modal.listeners).forEach((event) => {
                            modal.off(event)
                        })

                        modal.open = false
                        modal.onCloseCallback?.()
                    }
                    return modal
                }),
            )
        }

        afterLeave = () => {
            console.log('After leave', this.id)
            if (this.open) {
                return
            }

            updateStack((prevStack) => {
                const updatedStack = prevStack.map((modal) => {
                    if (modal.id === this.id && !modal.open) {
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
            console.log('Emitting', event, 'with args', args)
            this.listeners[event]?.forEach((callback) => callback(...args))
            return 'OK'
        }

        registerEventListenersFromProps = (props) => {
            const unsubscribers = []

            Object.keys(props)
                .filter((key) => key.startsWith('on'))
                .forEach((key) => {
                    // e.g. onRefreshKey -> refresh-key
                    const snakeCaseKey = key
                        .replace(/^on/, '')
                        .replace(/^./, (firstLetter) => firstLetter.toLowerCase())
                        .replace(/([A-Z])/g, '-$1')
                        .toLowerCase()

                    this.on(snakeCaseKey, props[key])
                    unsubscribers.push(() => this.off(snakeCaseKey, props[key]))
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
                },
            }).then((response) => {
                Object.assign(this.componentProps, response.data.props)
                updateStack((prevStack) => prevStack) // Trigger re-render
            })
        }
    }

    const pushFromResponseData = (responseData, modalProps = {}, onClose = null, onAfterLeave = null) => {
        return router.resolveComponent(responseData.component).then((component) => push(component, responseData, modalProps, onClose, onAfterLeave))
    }

    const push = (component, response, modalProps, onClose, afterLeave) => {
        const newModal = new Modal(component, response, modalProps, onClose, afterLeave)

        updateStack((prevStack) => [...prevStack, newModal])

        newModal.show()

        return newModal
    }

    function pushLocalModal(name, modalProps, onClose, afterLeave) {
        if (!localModals[name]) {
            throw new Error(`The local modal "${name}" has not been registered.`)
        }

        const modal = push(null, {}, modalProps, onClose, afterLeave)
        modal.name = name
        localModals[name].callback(modal)
        return modal
    }

    const visitModal = (url, options = {}) => {
        return visit(
            url,
            options.method ?? 'get',
            options.data ?? {},
            options.headers ?? {},
            options.config ?? {},
            options.onClose,
            options.onAfterLeave,
            options.queryStringArrayFormat ?? 'brackets',
        )
    }

    const visit = (
        href,
        method,
        payload = {},
        headers = {},
        modalProps = {},
        onClose = null,
        onAfterLeave = null,
        queryStringArrayFormat = 'brackets',
        useBrowserHistory = false,
    ) => {
        return new Promise((resolve, reject) => {
            if (href.startsWith('#')) {
                resolve(pushLocalModal(href.substring(1), modalProps, onClose, onAfterLeave))
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
                'X-InertiaUI-Modal': true,
                'X-InertiaUI-Modal-Use-Router': useInertiaRouter ? 1 : 0,
            }

            resolveInteriaPageFromRouter().then((inertiaPage) => {
                headers['X-Inertia-Version'] = inertiaPage.version

                if (useInertiaRouter) {
                    // Pushing the modal to the stack will be handled by the ModalRoot...
                    return router.visit(url, {
                        method,
                        data,
                        headers,
                        preserveScroll: true,
                        preserveState: true,
                        onError: reject,
                        onFinish: () => {
                            waitFor(() => newModalOnBase).then((modal) => {
                                const originalOnClose = modal.onCloseCallback
                                const originalAfterLeave = modal.afterLeaveCallback

                                modal.update(
                                    modalProps,
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
                                newModalOnBase = null
                            })
                        },
                    })
                }

                //

                Axios({
                    url,
                    method,
                    data,
                    headers,
                })
                    .then((response) => resolve(pushFromResponseData(response.data, modalProps, onClose, onAfterLeave)))
                    .catch((error) => {
                        reject(error)
                    })
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
        closeAll: () => {
            console.log('Closing all modals', { stack, localStackCopy })
            localStackCopy.reverse().forEach((modal) => modal.close())
        },
        reset: () => updateStack(() => []),
        visit,
        visitModal,
        registerLocalModal,
        removeLocalModal,
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

export const ModalRoot = ({ children }) => {
    const context = useContext(ModalStackContext)

    let isNavigating = false

    let previousModalOnBase = false

    useEffect(() => router.on('start', () => (isNavigating = true)), [])
    useEffect(() => router.on('finish', () => (isNavigating = false)), [])
    useEffect(
        () =>
            router.on('navigate', function ($event) {
                const modalOnBase = $event.detail.page.props._inertiaui_modal

                if (!modalOnBase) {
                    previousModalOnBase && context.closeAll()
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
                    .then((newModal) => {
                        newModalOnBase = newModal
                    })
            }),
        [],
    )

    const axiosRequestInterceptor = (config) => {
        // A Modal is opened on top of a base route, so we need to pass this base route
        // so it can redirect back with the back() helper method...
        config.headers['X-InertiaUI-Modal-Base-Url'] = baseUrl
        return config
    }

    useEffect(() => {
        Axios.interceptors.request.use(axiosRequestInterceptor)
        return () => Axios.interceptors.request.eject(axiosRequestInterceptor)
    }, [])

    return (
        <>
            {children}
            {context.stack.length > 0 && <ModalRenderer index={0} />}
        </>
    )
}
