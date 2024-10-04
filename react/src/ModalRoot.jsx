import { useState } from 'react'
import { default as Axios } from 'axios'
import { except, only } from './helpers'
import { router, usePage } from '@inertiajs/react'
import { mergeDataIntoQueryString } from '@inertiajs/core'
import { createContext, useContext } from 'react'
import ModalRenderer from './ModalRenderer'

const ModalStackContext = createContext(null)
ModalStackContext.displayName = 'ModalStackContext'

export const ModalStackProvider = ({ children }) => {
    const [stack, setStack] = useState([])
    const [localModals, setLocalModals] = useState({})

    class Modal {
        constructor(component, response, modalProps, onClose, afterLeave) {
            this.id = Modal.generateId()
            this.open = true
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

        updateStack = (withStack) => {
            setStack((prevStack) => {
                const newStack = withStack([...prevStack])

                newStack.forEach((modal, index) => {
                    newStack[index].index = index
                    newStack[index].onTopOfStack = index === newStack.length - 1
                })

                return newStack
            })
        }

        close = () => {
            this.updateStack((prevStack) =>
                prevStack.map((modal) => {
                    if (modal.id === this.id) {
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
            this.updateStack((prevStack) =>
                prevStack.filter((modal) => {
                    if (modal.id !== this.id) {
                        return true
                    }

                    modal.afterLeaveCallback?.()
                    return false
                }),
            )
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

            Axios.get(this.response.url, {
                headers: {
                    Accept: 'text/html, application/xhtml+xml',
                    'X-Inertia': true,
                    'X-Inertia-Partial-Component': this.response.component,
                    'X-Inertia-Version': this.response.version,
                    'X-Inertia-Partial-Data': keys.join(','),
                },
            }).then((response) => {
                Object.assign(this.componentProps, response.data.props)
                setStack((prevStack) => [...prevStack]) // Trigger re-render
            })
        }
    }

    const push = (component, response, modalProps, onClose, afterLeave) => {
        const newModal = new Modal(component, response, modalProps, onClose, afterLeave)

        setStack((prevStack) => {
            const updatedStack = [...prevStack, newModal]

            // Set index and update onTopOfStack for all modals
            updatedStack.forEach((modal, index) => {
                modal.index = index
                modal.onTopOfStack = index === updatedStack.length - 1
            })

            // Set getParentModal and getChildModal
            updatedStack.forEach((modal, index) => {
                modal.getParentModal = () => (index > 0 ? updatedStack[index - 1] : null)
                modal.getChildModal = () => (index < updatedStack.length - 1 ? updatedStack[index + 1] : null)
            })

            return updatedStack
        })

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

    const visit = (href, method, payload = {}, headers = {}, modalProps = {}, onClose = null, onAfterLeave = null, queryStringArrayFormat = 'brackets') => {
        return new Promise((resolve, reject) => {
            if (href.startsWith('#')) {
                const localModal = pushLocalModal(href.substring(1), modalProps, onClose, onAfterLeave)
                resolve(localModal)
                return
            }

            const [url, data] = mergeDataIntoQueryString(method, href || '', payload, queryStringArrayFormat)

            Axios({
                url,
                method,
                data,
                headers: {
                    ...headers,
                    Accept: 'text/html, application/xhtml+xml',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-Inertia': true,
                    // 'X-Inertia-Version': usePage().version,
                    'X-InertiaUI-Modal': true,
                },
            })
                .then((response) => {
                    router.resolveComponent(response.data.component).then((component) => {
                        resolve(push(component, response.data, modalProps, onClose, onAfterLeave))
                    })
                })
                .catch((error) => {
                    reject(error)
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
        reset: () => setStack([]),
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
    const stack = useContext(ModalStackContext).stack

    return (
        <>
            {children}
            {stack.length > 0 && <ModalRenderer index={0} />}
        </>
    )
}
