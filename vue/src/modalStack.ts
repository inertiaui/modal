import { computed, readonly, ref, markRaw, h, nextTick, type Component, type Ref, type ComputedRef } from 'vue'
import { generateId, except, kebabCase } from './helpers'
import { router, usePage, progress } from '@inertiajs/vue3'
import { mergeDataIntoQueryString, type RequestPayload } from '@inertiajs/core'
import { default as Axios, type AxiosResponse } from 'axios'
import ModalRoot from './ModalRoot.vue'

// Type definitions
export interface ModalResponseData {
    id?: string
    component: string
    props: Record<string, unknown>
    url?: string
    version?: string
    meta?: {
        deferredProps?: Record<string, string[]>
    }
    baseUrl?: string
}

export interface ModalConfig {
    [key: string]: unknown
}

export interface ReloadOptions {
    only?: string[]
    except?: string[]
    method?: string
    data?: Record<string, unknown>
    headers?: Record<string, string>
    onStart?: () => void
    onSuccess?: (response: AxiosResponse) => void
    onError?: (error: unknown) => void
    onFinish?: () => void
}

export interface VisitOptions {
    method?: string
    data?: RequestPayload
    headers?: Record<string, string>
    config?: ModalConfig
    onClose?: () => void
    onAfterLeave?: () => void
    queryStringArrayFormat?: 'brackets' | 'indices'
    navigate?: boolean
    onStart?: () => void
    onSuccess?: (response?: AxiosResponse) => void
    onError?: (...args: unknown[]) => void
    listeners?: Record<string, (...args: unknown[]) => void>
    // Props to pass to local modals (#152)
    props?: Record<string, unknown>
}

// Prefetch types (#146)
export type PrefetchOption = boolean | 'hover' | 'click' | 'mount' | Array<'hover' | 'click' | 'mount'>

export interface PrefetchOptions {
    method?: string
    data?: RequestPayload
    headers?: Record<string, string>
    queryStringArrayFormat?: 'brackets' | 'indices'
    cacheFor?: number
    onPrefetching?: () => void
    onPrefetched?: () => void
}

type EventCallback = (...args: unknown[]) => void
type ComponentResolver = (name: string) => Promise<Component>

let resolveComponent: ComponentResolver | null = null

const baseUrl = ref<string | null>(null)
const stack = ref<Modal[]>([])
const localModals = ref<Record<string, { name: string; callback: (modal: Modal) => void }>>({})

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

    const requestHeaders: Record<string, string | number | boolean | null> = {
        ...headers,
        Accept: 'text/html, application/xhtml+xml',
        'X-Requested-With': 'XMLHttpRequest',
        'X-Inertia': true,
        'X-Inertia-Version': usePage().version ?? '',
        'X-InertiaUI-Modal': generateId(),
                'X-InertiaUI-Modal-Base-Url': baseUrl.value,
    }

    const request = Axios({ url, method, data: mergedData, headers: requestHeaders })
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

const setComponentResolver = (resolver: ComponentResolver): void => {
    resolveComponent = resolver
}

export const initFromPageProps = (pageProps: { resolveComponent?: ComponentResolver }): void => {
    if (pageProps.resolveComponent) {
        resolveComponent = pageProps.resolveComponent
    }
}

export class Modal {
    id: string
    isOpen: boolean
    shouldRender: boolean
    listeners: Record<string, EventCallback[]>
    component: Component | null
    props: Ref<Record<string, unknown>>
    response: ModalResponseData
    config: ModalConfig
    onCloseCallback: (() => void) | null
    afterLeaveCallback: (() => void) | null
    index: ComputedRef<number>
    onTopOfStack: ComputedRef<boolean>
    name?: string

    constructor(
        component: Component | null,
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
        this.props = ref(response.props ?? {})
        this.response = response
        this.config = config ?? {}
        this.onCloseCallback = onClose ?? null
        this.afterLeaveCallback = afterLeave ?? null

        this.index = computed(() => stack.value.findIndex((m) => m.id === this.id))
        this.onTopOfStack = computed(() => {
            if (stack.value.length < 2) {
                return true
            }

            const modals = stack.value.map((modal) => ({ id: modal.id, shouldRender: modal.shouldRender }))

            return modals.reverse().find((modal) => modal.shouldRender)?.id === this.id
        })
    }

    getComponentPropKeys = (): string[] => {
        if (!this.component) {
            return []
        }

        const componentProps = (this.component as Component & { props?: string[] | Record<string, unknown> }).props

        if (Array.isArray(componentProps)) {
            return componentProps
        }

        return componentProps ? Object.keys(componentProps) : []
    }

    getParentModal = (): Modal | null | undefined => {
        const index = this.index.value

        if (index < 1) {
            // This is the first modal in the stack
            return null
        }

        // Find the first open modal before this one
        return stack.value
            .slice(0, index)
            .reverse()
            .find((modal) => modal.isOpen) as unknown as Modal | undefined
    }

    getChildModal = (): Modal | null => {
        const index = this.index.value

        if (index === stack.value.length - 1) {
            // This is the last modal in the stack
            return null
        }

        // Find the first open modal after this one
        return (stack.value.slice(index + 1).find((modal) => modal.isOpen) as unknown as Modal | undefined) ?? null
    }

    show = (): void => {
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

    close = (): void => {
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

    setOpen = (open: boolean): void => {
        if (open) {
            this.show()
        } else {
            this.close()
        }
    }

    afterLeave = (): void => {
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

            // Update browser URL back to base when all modals are closed
            if (baseUrl.value && typeof window !== 'undefined') {
                router.push({
                    url: baseUrl.value,
                    preserveScroll: true,
                    preserveState: true,
                    // Clear _inertiaui_modal prop to prevent modal from reopening
                    // Must explicitly set to undefined since props are merged
                    props: (currentProps: Record<string, unknown>) => {
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        const { _inertiaui_modal, ...rest } = currentProps
                        return { ...rest, _inertiaui_modal: undefined }
                    },
                })
            }

            baseUrl.value = null
        }
    }

    on = (event: string, callback: EventCallback): void => {
        event = kebabCase(event)
        this.listeners[event] = this.listeners[event] ?? []
        this.listeners[event].push(callback)
    }

    off = (event: string, callback?: EventCallback): void => {
        event = kebabCase(event)
        if (callback) {
            this.listeners[event] = this.listeners[event]?.filter((cb) => cb !== callback) ?? []
        } else {
            delete this.listeners[event]
        }
    }

    emit = (event: string, ...args: unknown[]): void => {
        this.listeners[kebabCase(event)]?.forEach((callback) => callback(...args))
    }

    registerEventListenersFromAttrs = ($attrs: Record<string, unknown>): (() => void) => {
        const unsubscribers: (() => void)[] = []

        Object.keys($attrs)
            .filter((key) => key.startsWith('on'))
            .forEach((key) => {
                const eventName = kebabCase(key).replace(/^on-/, '')
                const callback = $attrs[key] as EventCallback
                this.on(eventName, callback)
                unsubscribers.push(() => this.off(eventName, callback))
            })

        return () => unsubscribers.forEach((unsub) => unsub())
    }

    reload = (options: ReloadOptions = {}): void => {
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
                'X-Inertia': true,
                'X-Inertia-Partial-Component': this.response.component,
                'X-Inertia-Version': this.response.version ?? '',
                'X-Inertia-Partial-Data': keys.join(','),
                'X-InertiaUI-Modal': generateId(),
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

    updateProps = (props: Record<string, unknown>): void => {
        Object.assign(this.props.value, props)
    }
}

function registerLocalModal(name: string, callback: (modal: Modal) => void): void {
    localModals.value[name] = { name, callback }
}

function pushLocalModal(
    name: string,
    config?: ModalConfig | null,
    onClose?: (() => void) | null,
    afterLeave?: (() => void) | null,
    props?: Record<string, unknown> | null,
): Modal {
    if (!localModals.value[name]) {
        throw new Error(`The local modal "${name}" has not been registered.`)
    }

    const responseData = { props: props ?? {} } as ModalResponseData
    const modal = push(null, responseData, config, onClose, afterLeave)
    modal.name = name
    localModals.value[name].callback(modal)
    return modal
}

function isValidModalResponse(data: unknown): data is ModalResponseData {
    return (
        typeof data === 'object' &&
        data !== null &&
        'component' in data &&
        typeof (data as ModalResponseData).component === 'string'
    )
}

function updateBrowserUrl(url: string | undefined, useBrowserHistory: boolean, modalData?: ModalResponseData): void {
    if (!url || !useBrowserHistory || typeof window === 'undefined') {
        return
    }

    router.push({
        url,
        preserveScroll: true,
        preserveState: true,
        // Store modal data in page props for history navigation
        // This allows forward/back to restore the modal
        props: modalData
            ? (currentProps: Record<string, unknown>) => ({
                  ...currentProps,
                  _inertiaui_modal: {
                      ...modalData,
                      baseUrl: baseUrl.value,
                  },
              })
            : undefined,
    })
}

function pushFromResponseData(
    responseData: ModalResponseData,
    config: ModalConfig = {},
    onClose: (() => void) | null = null,
    onAfterLeave: (() => void) | null = null,
): Promise<Modal> {
    if (!resolveComponent) {
        return Promise.reject(new Error('Component resolver not set'))
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
        push(markRaw(component), responseData, config, onClose, onAfterLeave),
    )
}

function visit(
    href: string,
    method: string,
    payload: RequestPayload = {},
    headers: Record<string, string> = {},
    config: ModalConfig = {},
    onClose: (() => void) | null = null,
    onAfterLeave: (() => void) | null = null,
    queryStringArrayFormat: 'brackets' | 'indices' = 'brackets',
    useBrowserHistory: boolean = false,
    onStart: (() => void) | null = null,
    onSuccess: ((response?: AxiosResponse) => void) | null = null,
    onError: ((...args: unknown[]) => void) | null = null,
    props: Record<string, unknown> | null = null,
): Promise<Modal> {
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

        if (stack.value.length === 0) {
            baseUrl.value = typeof window !== 'undefined' ? window.location.href : ''
        }

        const requestHeaders: Record<string, string | number | boolean | null> = {
            ...headers,
            Accept: 'text/html, application/xhtml+xml',
            'X-Requested-With': 'XMLHttpRequest',
            'X-Inertia': true,
            'X-Inertia-Version': usePage().version ?? '',
            'X-InertiaUI-Modal': modalId,
                        'X-InertiaUI-Modal-Base-Url': baseUrl.value,
        }

        onStart?.()

        progress?.start()

        Axios({ url, method, data, headers: requestHeaders })
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

function loadDeferredProps(modal: Modal): void {
    const deferred = modal.response?.meta?.deferredProps

    if (!deferred) {
        return
    }

    Object.keys(deferred).forEach((key) => {
        modal.reload({ only: deferred[key] })
    })
}

function push(
    component: Component | null,
    response: ModalResponseData,
    config?: ModalConfig | null,
    onClose?: (() => void) | null,
    afterLeave?: (() => void) | null,
): Modal {
    const newModal = new Modal(component, response, config, onClose, afterLeave)
    // @ts-expect-error Vue reactivity transforms the Modal instance
    stack.value.push(newModal)
    loadDeferredProps(newModal)

    nextTick(() => newModal.show())

    return newModal
}

export const modalPropNames = ['closeButton', 'closeExplicitly', 'closeOnClickOutside', 'maxWidth', 'paddingClasses', 'panelClasses', 'position', 'slideover']

export const renderApp = (App: Component, props: { resolveComponent?: ComponentResolver }): (() => ReturnType<typeof h>) => {
    if (props.resolveComponent) {
        resolveComponent = props.resolveComponent
    }

    return () => h(ModalRoot, () => h(App, props))
}

export interface ModalStack {
    setComponentResolver: (resolver: ComponentResolver) => void
    getBaseUrl: () => string | null
    setBaseUrl: (url: string | null) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    stack: any
    push: typeof push
    pushFromResponseData: typeof pushFromResponseData
    closeAll: (force?: boolean) => void
    reset: () => void
    visit: typeof visit
    registerLocalModal: typeof registerLocalModal
    removeLocalModal: (name: string) => boolean
}

export function useModalStack(): ModalStack {
    return {
        setComponentResolver,
        getBaseUrl: () => baseUrl.value,
        setBaseUrl: (url: string | null) => (baseUrl.value = url),
        stack: readonly(stack),
        push,
        pushFromResponseData,
        closeAll: (force = false) => {
            if (force) {
                // Force close: immediately remove all modals without transition
                stack.value = []
            } else {
                // Normal close: trigger leave transition for each modal
                ;[...stack.value].reverse().forEach((modal) => modal.close())
            }
        },
        reset: () => (stack.value = []),
        visit,
        registerLocalModal,
        removeLocalModal: (name: string) => delete localModals.value[name],
    }
}
