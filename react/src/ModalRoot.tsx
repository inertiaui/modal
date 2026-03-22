import { createElement, useEffect, useState, useRef, useReducer, ReactNode, ComponentType } from 'react'
import { default as Axios, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { except, kebabCase, generateId, sameUrlPath } from './helpers'
import { router, usePage, progress } from '@inertiajs/react'
import { mergeDataIntoQueryString, type RequestPayload } from '@inertiajs/core'
import { createContext, useContext } from 'react'
import ModalRenderer from './ModalRenderer'
import { getConfig } from './config'
import type {
    Modal,
    ModalConfig,
    ModalResponseData,
    ModalStackContextValue,
    VisitOptions,
    ReloadOptions,
    EventCallback,
    ComponentResolver,
    PageProps,
    ModalRootProps,
    LocalModal,
    PrefetchOptions,
} from './types'

const ModalStackContext = createContext<ModalStackContextValue | null>(null)
ModalStackContext.displayName = 'ModalStackContext'

let pageVersion: string | null = null
let resolveComponent: ComponentResolver | null = null
let baseUrl: string | null = null

// Track the URL we're closing to (prevents navigate handler from re-setting baseUrl)
// Only suppresses if navigate event URL matches this URL
let closingToBaseUrlTarget: string | null = null

// Prefetch cache (#146)
interface PrefetchCacheEntry {
    response: AxiosResponse
    timestamp: number
    expiresAt: number
}

const prefetchCache = new Map<string, PrefetchCacheEntry>()
const prefetchInFlight = new Map<string, Promise<AxiosResponse>>()

function getPrefetchCacheKey(url: string, method: string, data: RequestPayload): string {
    return `${method}:${url}:${JSON.stringify(data)}`
}

function getCachedResponse(url: string, method: string, data: RequestPayload): AxiosResponse | null {
    const key = getPrefetchCacheKey(url, method, data)
    const cached = prefetchCache.get(key)

    if (!cached) {
        return null
    }

    if (Date.now() > cached.expiresAt) {
        prefetchCache.delete(key)
        return null
    }

    return cached.response
}

function setCachedResponse(url: string, method: string, data: RequestPayload, response: AxiosResponse, cacheFor: number): void {
    const key = getPrefetchCacheKey(url, method, data)
    prefetchCache.set(key, {
        response,
        timestamp: Date.now(),
        expiresAt: Date.now() + cacheFor,
    })
}

export function prefetch(href: string, options: PrefetchOptions = {}): Promise<void> {
    if (href.startsWith('#')) {
        return Promise.resolve()
    }

    const method = (options.method ?? 'get').toLowerCase()
    const data = options.data ?? ({} as RequestPayload)
    const headers = options.headers ?? {}
    const queryStringArrayFormat = options.queryStringArrayFormat ?? 'brackets'
    const cacheFor = options.cacheFor ?? 30000

    const [url, mergedData] = mergeDataIntoQueryString(method as 'get' | 'post' | 'put' | 'patch' | 'delete', href || '', data, queryStringArrayFormat)

    // Check if already cached
    const cached = getCachedResponse(url, method, mergedData)
    if (cached) {
        return Promise.resolve()
    }

    // Check if already in flight
    const cacheKey = getPrefetchCacheKey(url, method, mergedData)
    const inFlight = prefetchInFlight.get(cacheKey)
    if (inFlight) {
        return inFlight.then(() => {})
    }

    options.onPrefetching?.()

    const requestHeaders: Record<string, string> = {
        ...headers,
        Accept: 'text/html, application/xhtml+xml',
        'X-Requested-With': 'XMLHttpRequest',
        'X-Inertia': 'true',
        'X-Inertia-Version': pageVersion ?? '',
        'X-InertiaUI-Modal': generateId(),
        'X-InertiaUI-Modal-Base-Url': baseUrl ?? '',
    }

    const request = Axios({
        url,
        method,
        data: mergedData,
        headers: requestHeaders,
    })
        .then((response) => {
            setCachedResponse(url, method, mergedData, response, cacheFor)
            options.onPrefetched?.()
            return response
        })
        .finally(() => {
            prefetchInFlight.delete(cacheKey)
        })

    prefetchInFlight.set(cacheKey, request)

    return request.then(() => {})
}

interface ModalStackProviderProps {
    children: ReactNode
}

export const ModalStackProvider = ({ children }: ModalStackProviderProps) => {
    // Use ref for synchronous access to stack, state only for triggering re-renders
    const stackRef = useRef<Modal[]>([])
    const [, forceUpdate] = useReducer((x) => x + 1, 0)
    const [localModals, setLocalModals] = useState<Record<string, LocalModal>>({})

    const updateStack = (withStack: (prevStack: Modal[]) => Modal[]) => {
        const newStack = withStack([...stackRef.current])

        const isOnTopOfStack = (modalId: string) => {
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
                return (
                    stackRef.current
                        .slice(0, index)
                        .reverse()
                        .find((m) => m.isOpen) ?? null
                )
            }
            newStack[index].getChildModal = () => {
                if (index === stackRef.current.length - 1) {
                    // This is the last modal in the stack
                    return null
                }

                // Find the first open modal after this one
                return stackRef.current.slice(index + 1).find((m) => m.isOpen) ?? null
            }
        })

        stackRef.current = newStack
        forceUpdate()
    }

    class ModalClass implements Modal {
        id: string
        isOpen: boolean
        shouldRender: boolean
        listeners: Record<string, EventCallback[]>
        component: ComponentType | null
        props: Record<string, unknown>
        response: ModalResponseData
        config: ModalConfig
        onCloseCallback: (() => void) | null
        afterLeaveCallback: (() => void) | null
        index: number
        onTopOfStack: boolean
        name?: string
        getParentModal: () => Modal | null
        getChildModal: () => Modal | null

        constructor(
            component: ComponentType | null,
            response: ModalResponseData,
            config?: ModalConfig | null,
            onClose?: (() => void) | null,
            afterLeave?: (() => void) | null,
        ) {
            this.id = response.id ?? generateId()
            this.isOpen = false
            this.shouldRender = false
            this.listeners = {}

            this.component = component
            this.props = response.props ?? {}
            this.response = response
            this.config = config ?? {}
            this.onCloseCallback = onClose ?? null
            this.afterLeaveCallback = afterLeave ?? null

            this.index = -1 // Will be set when added to the stack
            this.getParentModal = () => null // Will be set in push()
            this.getChildModal = () => null // Will be set in push()
            this.onTopOfStack = true // Will be updated in push()
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

        setOpen = (open: boolean) => {
            if (open) {
                this.show()
            } else {
                this.close()
            }
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

                if (this.index === 0) {
                    // Update browser URL back to base when all modals are closed
                    // Clear baseUrl BEFORE router.push to prevent the navigate event
                    // from setting it back (race condition with props callback)
                    const savedBaseUrl = baseUrl
                    baseUrl = null

                    // Set target URL to prevent navigate handler from re-setting baseUrl
                    // Only suppresses navigate events to this specific URL
                    closingToBaseUrlTarget = savedBaseUrl

                    if (savedBaseUrl && typeof window !== 'undefined') {
                        router.push({
                            url: savedBaseUrl,
                            preserveScroll: true,
                            preserveState: true,
                            // Clear _inertiaui_modal prop to prevent modal from reopening
                            props: (currentProps: Record<string, unknown>) => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                const { _inertiaui_modal, ...rest } = currentProps
                                return { ...rest, _inertiaui_modal: undefined }
                            },
                        })
                    }
                    return []
                }

                return updatedStack
            })
        }

        on = (event: string, callback: EventCallback) => {
            event = kebabCase(event)
            this.listeners[event] = this.listeners[event] ?? []
            this.listeners[event].push(callback)
        }

        off = (event: string, callback?: EventCallback) => {
            event = kebabCase(event)
            if (callback) {
                this.listeners[event] = this.listeners[event]?.filter((cb) => cb !== callback) ?? []
            } else {
                delete this.listeners[event]
            }
        }

        emit = (event: string, ...args: unknown[]) => {
            this.listeners[kebabCase(event)]?.forEach((callback) => callback(...args))
        }

        registerEventListenersFromProps = (props: Record<string, unknown>) => {
            const unsubscribers: (() => void)[] = []

            Object.keys(props)
                .filter((key) => key.startsWith('on'))
                .forEach((key) => {
                    // e.g. onRefreshKey -> refresh-key
                    const eventName = kebabCase(key).replace(/^on-/, '')
                    const callback = props[key] as EventCallback
                    this.on(eventName, callback)
                    unsubscribers.push(() => this.off(eventName, callback))
                })

            return () => unsubscribers.forEach((unsub) => unsub())
        }

        reload = (options: ReloadOptions = {}) => {
            let keys = Object.keys(this.response.props)

            if (options.only) {
                keys = options.only
            }

            if (options.except) {
                keys = except(keys, options.except) as string[]
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
                    'X-Inertia': 'true',
                    'X-Inertia-Partial-Component': this.response.component,
                    'X-Inertia-Version': this.response.version ?? '',
                    'X-Inertia-Partial-Data': keys.join(','),
                    'X-InertiaUI-Modal': generateId(),
                    'X-InertiaUI-Modal-Base-Url': baseUrl ?? '',
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

        updateProps = (props: Record<string, unknown>) => {
            Object.assign(this.props, props)
            updateStack((prevStack) => prevStack) // Trigger re-render
        }
    }

    const isValidModalResponse = (data: unknown): data is ModalResponseData => {
        return (
            typeof data === 'object' &&
            data !== null &&
            'component' in data &&
            typeof (data as ModalResponseData).component === 'string'
        )
    }

    const pushFromResponseData = (
        responseData: ModalResponseData,
        config: ModalConfig = {},
        onClose: (() => void) | null = null,
        onAfterLeave: (() => void) | null = null,
    ): Promise<Modal> => {
        if (!resolveComponent) {
            return Promise.reject(new Error('resolveComponent not set'))
        }

        if (!isValidModalResponse(responseData)) {
            return Promise.reject(
                new Error(
                    'Invalid modal response. This usually happens when the server returns a redirect (e.g., due to session expiration). ' +
                        'Check if the user is still authenticated.',
                ),
            )
        }

        return resolveComponent(responseData.component).then((component) =>
            push(component, responseData, config, onClose, onAfterLeave),
        )
    }

    const loadDeferredProps = (modal: Modal) => {
        const deferred = modal.response?.meta?.deferredProps

        if (!deferred) {
            return
        }

        Object.keys(deferred).forEach((key) => {
            modal.reload({ only: deferred[key] })
        })
    }

    const push = (
        component: ComponentType | null,
        response: ModalResponseData,
        config?: ModalConfig | null,
        onClose?: (() => void) | null,
        afterLeave?: (() => void) | null,
    ): Modal => {
        const newModal = new ModalClass(component, response, config, onClose, afterLeave)
        newModal.index = stackRef.current.length

        updateStack((prevStack) => [...prevStack, newModal])
        loadDeferredProps(newModal)

        newModal.show()

        return newModal
    }

    function pushLocalModal(
        name: string,
        config?: ModalConfig | null,
        onClose?: (() => void) | null,
        afterLeave?: (() => void) | null,
        props?: Record<string, unknown> | null,
    ): Modal {
        if (!localModals[name]) {
            throw new Error(`The local modal "${name}" has not been registered.`)
        }

        const responseData = { props: props ?? {} } as ModalResponseData
        const modal = push(null, responseData, config, onClose, afterLeave)
        modal.name = name
        localModals[name].callback(modal)
        return modal
    }

    const visitModal = (url: string, options: VisitOptions = {}): Promise<Modal> =>
        visit(
            url,
            options.method ?? 'get',
            options.data ?? ({} as RequestPayload),
            options.headers ?? {},
            options.config ?? {},
            options.onClose ?? null,
            options.onAfterLeave ?? null,
            options.queryStringArrayFormat ?? 'brackets',
            options.navigate ?? (getConfig('navigate') as boolean),
            options.onStart ?? null,
            options.onSuccess ?? null,
            options.onError ?? null,
            options.props ?? null,
        ).then((modal) => {
            const listeners = options.listeners ?? {}

            Object.keys(listeners).forEach((event) => {
                // e.g. refreshKey -> refresh-key
                const eventName = kebabCase(event)
                modal.on(eventName, listeners[event])
            })

            return modal
        })

    const updateBrowserUrl = (url: string | undefined, useBrowserHistory: boolean, modalData?: ModalResponseData): void => {
        if (!url || !useBrowserHistory || typeof window === 'undefined') {
            return
        }

        router.push({
            url,
            preserveScroll: true,
            preserveState: true,
            // Store modal data in page props for history navigation
            props: modalData
                ? (currentProps: Record<string, unknown>) => ({
                      ...currentProps,
                      _inertiaui_modal: {
                          ...modalData,
                          baseUrl,
                      },
                  })
                : undefined,
        })
    }

    const visit = (
        href: string,
        method: string,
        payload: RequestPayload = {},
        headers: Record<string, string> = {},
        config: ModalConfig = {},
        onClose: (() => void) | null = null,
        onAfterLeave: (() => void) | null = null,
        queryStringArrayFormat: 'brackets' | 'indices' = 'brackets',
        useBrowserHistory = false,
        onStart: (() => void) | null = null,
        onSuccess: ((response?: AxiosResponse) => void) | null = null,
        onError: ((...args: unknown[]) => void) | null = null,
        props: Record<string, unknown> | null = null,
    ): Promise<Modal> => {
        const modalId = generateId()

        return new Promise((resolve, reject) => {
            if (href.startsWith('#')) {
                resolve(pushLocalModal(href.substring(1), config, onClose, onAfterLeave, props))
                return
            }

            const [url, data] = mergeDataIntoQueryString(method as 'get' | 'post' | 'put' | 'patch' | 'delete', href || '', payload, queryStringArrayFormat)

            // Check for cached prefetch response (#146)
            const cachedResponse = getCachedResponse(url, method, data)
            if (cachedResponse) {
                onSuccess?.(cachedResponse)
                pushFromResponseData(cachedResponse.data, config, onClose, onAfterLeave)
                    .then((modal) => {
                        updateBrowserUrl(cachedResponse.data.url, useBrowserHistory, cachedResponse.data)
                        resolve(modal)
                    })
                    .catch(reject)
                return
            }

            if (stackRef.current.length === 0) {
                baseUrl = typeof window !== 'undefined' ? window.location.href : ''
            }

            const requestHeaders: Record<string, string> = {
                ...headers,
                Accept: 'text/html, application/xhtml+xml',
                'X-Requested-With': 'XMLHttpRequest',
                'X-Inertia': 'true',
                'X-Inertia-Version': pageVersion ?? '',
                'X-InertiaUI-Modal': modalId,
                'X-InertiaUI-Modal-Base-Url': baseUrl ?? '',
            }

            onStart?.()

            progress?.start()

            Axios({
                url,
                method,
                data,
                headers: requestHeaders,
            })
                .then((response) => {
                    onSuccess?.(response)
                    pushFromResponseData(response.data, config, onClose, onAfterLeave)
                        .then((modal) => {
                            updateBrowserUrl(response.data.url, useBrowserHistory, response.data)
                            resolve(modal)
                        })
                        .catch(reject)
                })
                .catch((...args: unknown[]) => {
                    onError?.(...args)
                    reject(args[0])
                })
                .finally(() => {
                    progress?.finish()
                })
        })
    }

    const registerLocalModal = (name: string, callback: (modal: Modal) => void) => {
        setLocalModals((prevLocalModals) => ({
            ...prevLocalModals,
            [name]: { name, callback },
        }))
    }

    const removeLocalModal = (name: string) => {
        setLocalModals((prevLocalModals) => {
            const newLocalModals = { ...prevLocalModals }
            delete newLocalModals[name]
            return newLocalModals
        })
    }

    // Create value object with getter for stack to ensure we always get current ref value
    const value: ModalStackContextValue = {
        get stack() {
            return stackRef.current
        },
        localModals,
        push,
        pushFromResponseData,
        length: () => stackRef.current.length,
        closeAll: (force = false) => {
            if (force) {
                // Force close: immediately remove all modals without transition
                updateStack(() => [])
            } else {
                // Normal close: trigger leave transition for each modal
                ;[...stackRef.current].reverse().forEach((modal) => modal.close())
            }
        },
        reset: () => updateStack(() => []),
        visit,
        visitModal,
        registerLocalModal,
        removeLocalModal,
    }

    return <ModalStackContext.Provider value={value}>{children}</ModalStackContext.Provider>
}

export const useModalStack = (): ModalStackContextValue => {
    const context = useContext(ModalStackContext)
    if (context === null) {
        throw new Error('useModalStack must be used within a ModalStackProvider')
    }
    return context
}

export const modalPropNames = ['closeButton', 'closeExplicitly', 'closeOnClickOutside', 'maxWidth', 'paddingClasses', 'panelClasses', 'position', 'slideover']

export const initFromPageProps = (pageProps: PageProps) => {
    if (pageProps.initialPage) {
        pageVersion = pageProps.initialPage.version ?? null
    }

    if (pageProps.resolveComponent) {
        resolveComponent = pageProps.resolveComponent
    }
}

interface RenderInertiaAppProps {
    Component: ComponentType & { layout?: ((page: ReactNode) => ReactNode) | ComponentType[] }
    props: Record<string, unknown>
    key: string
}

export const renderApp = (App: ComponentType<{ children: (props: RenderInertiaAppProps) => ReactNode }>, pageProps: PageProps) => {
    initFromPageProps(pageProps)

    const renderInertiaApp = ({ Component, props, key }: RenderInertiaAppProps) => {
        const renderComponent = () => {
            const child = createElement(Component, { key, ...props })

            if (typeof Component.layout === 'function') {
                return Component.layout(child)
            }

            if (Array.isArray(Component.layout)) {
                return Component.layout
                    .slice()
                    .reverse()
                    .reduce(
                        (acc, Layout) => createElement(Layout as ComponentType<Record<string, unknown>>, props, acc),
                        child as ReactNode,
                    )
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
            <App {...(pageProps as Record<string, unknown>)}>{renderInertiaApp}</App>
        </ModalStackProvider>
    )
}

interface InertiaUIModalPageProps {
    _inertiaui_modal?: ModalResponseData & { baseUrl: string }
    [key: string]: unknown
}

export const ModalRoot = ({ children }: ModalRootProps) => {
    const context = useContext(ModalStackContext)
    const $page = usePage<InertiaUIModalPageProps>()
    const pendingModalKeysRef = useRef(new Set<string>())

    // Generate a unique key for deduplication (handles case when modal has no id)
    const getModalKey = (modalData: ModalResponseData) => modalData.id || `${modalData.component}:${modalData.url}`

    const isNavigatingRef = useRef(false)
    const initialModalStillOpenedRef = useRef(!!$page.props?._inertiaui_modal)

    useEffect(() => router.on('start', () => (isNavigatingRef.current = true)), [])
    useEffect(() => router.on('finish', () => (isNavigatingRef.current = false)), [])
    useEffect(
        () =>
            router.on('navigate', function ($event) {
                const modalOnBase = ($event as { detail: { page: { props: InertiaUIModalPageProps; url: string } } }).detail.page.props._inertiaui_modal
                const pageUrl = ($event as { detail: { page: { url: string } } }).detail.page.url

                // If we're closing to this specific URL, don't re-open the modal
                // This handles the race condition where router.push in afterLeave
                // fires a navigate event before the props callback clears _inertiaui_modal
                // Only suppresses when navigating to our closing target URL (not browser back to modal)
                if (closingToBaseUrlTarget) {
                    const targetPath = new URL(closingToBaseUrlTarget, 'http://x').pathname
                    const pagePath = new URL(pageUrl, 'http://x').pathname
                    if (targetPath === pagePath) {
                        closingToBaseUrlTarget = null
                        context?.closeAll(true)
                        baseUrl = null
                        initialModalStillOpenedRef.current = false
                        return
                    }
                    closingToBaseUrlTarget = null
                }

                if (!modalOnBase) {
                    // No modal data - close any open modals (force close without transition)
                    context?.closeAll(true)
                    baseUrl = null
                    initialModalStillOpenedRef.current = false
                    return
                }

                // If the page URL doesn't match the modal URL, close all modals
                if (!sameUrlPath(pageUrl, modalOnBase.url)) {
                    context?.closeAll(true)
                    baseUrl = null
                    initialModalStillOpenedRef.current = false
                    return
                }

                // Skip if this modal is already being pushed (handles duplicate navigate events)
                const modalKey = getModalKey(modalOnBase)
                if (pendingModalKeysRef.current.has(modalKey)) {
                    return
                }

                // Also skip if a modal with this id is already in the stack
                if (modalOnBase.id && context?.stack.some((m) => m.id === modalOnBase.id)) {
                    return
                }

                // Skip if a modal with the same component and URL is already open
                if (context?.stack.some((m) => m.response?.component === modalOnBase.component && sameUrlPath(m.response?.url, modalOnBase.url))) {
                    return
                }

                // Only set baseUrl when we're actually opening a new modal
                // (after deduplication checks pass)
                baseUrl = modalOnBase.baseUrl

                pendingModalKeysRef.current.add(modalKey)

                context
                    ?.pushFromResponseData(modalOnBase, {}, () => {
                        if (!modalOnBase.baseUrl) {
                            console.error('No base url in modal response data so cannot navigate back')
                            return
                        }
                        if (!isNavigatingRef.current && typeof window !== 'undefined' && window.location.href !== modalOnBase.baseUrl) {
                            router.visit(modalOnBase.baseUrl, {
                                preserveScroll: true,
                                preserveState: true,
                            })
                        }
                    })
                    .finally(() => {
                        pendingModalKeysRef.current.delete(modalKey)
                    })
            }),
        [],
    )

    const axiosRequestInterceptor = (config: InternalAxiosRequestConfig) => {
        // A Modal is opened on top of a base route, so we need to pass this base route
        // so it can redirect back with the back() helper method...
        // Only send the header when we have an actual base URL value
        const baseUrlValue = baseUrl ?? (initialModalStillOpenedRef.current ? $page.props._inertiaui_modal?.baseUrl : null)
        if (baseUrlValue) {
            config.headers['X-InertiaUI-Modal-Base-Url'] = baseUrlValue
        }

        return config
    }

    useEffect(() => {
        const interceptorId = Axios.interceptors.request.use(axiosRequestInterceptor)
        return () => Axios.interceptors.request.eject(interceptorId)
    }, [])

    const previousModalRef = useRef<(ModalResponseData & { baseUrl: string }) | undefined>(undefined)

    useEffect(() => {
        const newModal = $page.props?._inertiaui_modal
        const previousModal = previousModalRef.current

        // Store the current value for the next render
        previousModalRef.current = newModal

        if (!newModal) {
            return
        }

        // If there's a previous modal with same component/URL, update its props
        if (previousModal && newModal.component === previousModal.component && sameUrlPath(newModal.url, previousModal.url)) {
            context?.stack[0]?.updateProps(newModal.props ?? {})
            return
        }

        // If there's no previous modal but we have modals in the stack (opened via XHR),
        // check if the new modal matches any open modal and update its props
        if (!previousModal && context && context.stack.length > 0) {
            const existingModal = context.stack.find(
                (m) => m.response?.component === newModal.component && sameUrlPath(m.response?.url, newModal.url),
            )
            if (existingModal) {
                existingModal.updateProps(newModal.props ?? {})
            }
        }
    }, [$page.props?._inertiaui_modal])

    return (
        <>
            {children}
            {context && context.stack.length > 0 && <ModalRenderer index={0} />}
        </>
    )
}
