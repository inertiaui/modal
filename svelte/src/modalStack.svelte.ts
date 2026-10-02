import type { HttpResponse, Method, RequestPayload } from '@inertiajs/core'
import { mergeDataIntoQueryString } from '@inertiajs/core'
import { http, progress, router, usePage } from '@inertiajs/svelte'
import { tick, type Component } from 'svelte'

import { ResponseCache } from './cache.js'
import type { ModalTypeConfig } from './config.js'
import { except, generateId, kebabCase, parseResponseData, sameUrlPath } from './helpers.js'

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

export type ModalConfig = Partial<ModalTypeConfig & { slideover: boolean }>

export interface ReloadOptions {
    only?: string[]
    except?: string[]
    method?: HttpMethod
    data?: Record<string, unknown>
    headers?: Record<string, string>
    onStart?: () => void
    onSuccess?: (response: HttpResponse) => void
    onError?: (error: unknown) => void
    onFinish?: () => void
}

export interface VisitOptions {
    method?: HttpMethod
    data?: RequestPayload
    headers?: Record<string, string>
    config?: ModalConfig
    onClose?: () => void
    onAfterLeave?: () => void
    queryStringArrayFormat?: 'brackets' | 'indices'
    navigate?: boolean
    onStart?: () => void
    onSuccess?: (response?: HttpResponse) => void
    onError?: (...args: unknown[]) => void
    listeners?: Record<string, (...args: unknown[]) => void>
    props?: Record<string, unknown>
}

export type PrefetchOption = boolean | 'hover' | 'click' | 'mount' | Array<'hover' | 'click' | 'mount'>

export interface PrefetchOptions {
    method?: HttpMethod
    data?: RequestPayload
    headers?: Record<string, string>
    queryStringArrayFormat?: 'brackets' | 'indices'
    cacheFor?: number
    onPrefetching?: () => void
    onPrefetched?: () => void
}

export type HttpMethod = Method
type EventCallback = (...args: unknown[]) => void
type ComponentResolver = (name: string) => Promise<Component<Record<string, unknown>>>

const session = $state({
    baseUrl: null as string | null,
})

const stack = $state<Modal[]>([])
const localModals = $state<Record<string, { name: string; callback: (modal: Modal) => void }>>({})

let closingToBaseUrlTarget: string | null = null

const prefetchCache = new ResponseCache<HttpResponse>()

function clearStack(): void {
    stack.splice(0, stack.length)
}

export function prefetch(href: string, options: PrefetchOptions = {}): Promise<void> {
    if (href.startsWith('#')) {
        return Promise.resolve()
    }

    const method = options.method ?? 'get'
    const data = options.data ?? ({} as RequestPayload)
    const headers = options.headers ?? {}
    const queryStringArrayFormat = options.queryStringArrayFormat ?? 'brackets'
    const cacheFor = options.cacheFor ?? 30000

    const [url, mergedData] = mergeDataIntoQueryString(method, href || '', data, queryStringArrayFormat)
    const cacheKey = ResponseCache.key(method, url, mergedData)

    if (prefetchCache.get(cacheKey)) {
        return Promise.resolve()
    }

    const inFlight = prefetchCache.getInFlight(cacheKey)
    if (inFlight) {
        return inFlight.then(() => {})
    }

    options.onPrefetching?.()

    const requestHeaders: Record<string, string> = {
        ...headers,
        Accept: 'text/html, application/xhtml+xml',
        'X-Requested-With': 'XMLHttpRequest',
        'X-Inertia': 'true',
        'X-Inertia-Version': usePage().version ?? '',
        'X-InertiaUI-Modal': generateId(),
        'X-InertiaUI-Modal-Base-Url': session.baseUrl ?? '',
    }

    const request = http
        .getClient()
        .request({ url, method, data: mergedData, headers: requestHeaders })
        .then((response) => {
            prefetchCache.set(cacheKey, response, cacheFor)
            options.onPrefetched?.()
            return response
        })
        .finally(() => {
            prefetchCache.deleteInFlight(cacheKey)
        })

    prefetchCache.setInFlight(cacheKey, request)

    return request.then(() => {})
}

const setComponentResolver = (_resolver: ComponentResolver): void => {}
export const initFromPageProps = (_pageProps: { resolveComponent?: ComponentResolver }): void => {}

function unwrapComponent(resolved: unknown): Component<Record<string, unknown>> | null {
    if (resolved && typeof resolved === 'object' && 'default' in resolved && (resolved as { default?: unknown }).default) {
        return (resolved as { default: Component<Record<string, unknown>> }).default
    }

    return (resolved as Component<Record<string, unknown>>) ?? null
}

export class Modal {
    id: string
    isOpen = $state(false)
    shouldRender = $state(false)
    listeners: Record<string, EventCallback[]>
    component: Component<Record<string, unknown>> | null
    props = $state<Record<string, unknown>>({})
    response: ModalResponseData
    config: ModalConfig
    onCloseCallback: (() => void) | null
    afterLeaveCallback: (() => void) | null
    name?: string

    constructor(
        component: Component<Record<string, unknown>> | null,
        response: ModalResponseData,
        config?: ModalConfig | null,
        onClose?: (() => void) | null,
        afterLeave?: (() => void) | null,
    ) {
        this.id = response.id ?? generateId()
        this.listeners = {}
        this.component = component
        this.props = response.props ?? {}
        this.response = response
        this.config = config ?? {}
        this.onCloseCallback = onClose ?? null
        this.afterLeaveCallback = afterLeave ?? null
    }

    get index(): number {
        return stack.findIndex((modal) => modal.id === this.id)
    }

    get onTopOfStack(): boolean {
        if (stack.length < 2) {
            return true
        }

        const modals = stack.map((modal) => ({ id: modal.id, shouldRender: modal.shouldRender }))

        return modals.reverse().find((modal) => modal.shouldRender)?.id === this.id
    }

    getParentModal = (): Modal | null => {
        const index = this.index

        if (index < 1) {
            return null
        }

        return (
            stack
                .slice(0, index)
                .reverse()
                .find((modal) => modal.isOpen) ?? null
        )
    }

    getChildModal = (): Modal | null => {
        const index = this.index

        if (index === stack.length - 1) {
            return null
        }

        return stack.slice(index + 1).find((modal) => modal.isOpen) ?? null
    }

    show = (): void => {
        const index = this.index

        if (index > -1 && !stack[index].isOpen) {
            stack[index].isOpen = true
            stack[index].shouldRender = true
        }
    }

    close = (): void => {
        const index = this.index

        if (index > -1 && stack[index].isOpen) {
            Object.keys(this.listeners).forEach((event) => {
                this.off(event)
            })

            stack[index].isOpen = false
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
        const index = this.index

        if (index > -1) {
            if (stack[index].isOpen) {
                return
            }

            stack[index].shouldRender = false
            this.afterLeaveCallback?.()
            this.afterLeaveCallback = null
        }

        if (index === 0) {
            clearStack()

            const savedBaseUrl = session.baseUrl
            session.baseUrl = null
            closingToBaseUrlTarget = savedBaseUrl

            if (savedBaseUrl && typeof window !== 'undefined' && !sameUrlPath(savedBaseUrl, window.location.href)) {
                router.push({
                    url: savedBaseUrl,
                    preserveScroll: true,
                    preserveState: true,
                    props: (currentProps: Record<string, unknown>) => {
                        const { _inertiaui_modal: _removed, ...rest } = currentProps
                        return { ...rest, _inertiaui_modal: undefined }
                    },
                })
            }
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

    registerEventListenersFromAttrs = (attrs: Record<string, unknown>): (() => void) => {
        const unsubscribers: (() => void)[] = []

        Object.keys(attrs)
            .filter((key) => key.startsWith('on') && typeof attrs[key] === 'function')
            .forEach((key) => {
                const eventName = kebabCase(key).replace(/^on-/, '')
                const callback = attrs[key] as EventCallback
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

        const method = options.method ?? 'get'
        const data = options.data ?? {}

        options.onStart?.()

        http.getClient()
            .request({
                url: this.response.url,
                method,
                data: method === 'get' ? undefined : data,
                params: method === 'get' ? data : undefined,
                headers: {
                    ...options.headers,
                    Accept: 'text/html, application/xhtml+xml',
                    'X-Inertia': 'true',
                    'X-Inertia-Partial-Component': this.response.component,
                    'X-Inertia-Version': this.response.version ?? '',
                    'X-Inertia-Partial-Data': keys.join(','),
                    'X-InertiaUI-Modal': generateId(),
                    'X-InertiaUI-Modal-Base-Url': session.baseUrl ?? '',
                },
            })
            .then((response) => {
                this.updateProps((parseResponseData(response.data) as ModalResponseData).props)
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
        Object.assign(this.props, props)
    }
}

function registerLocalModal(name: string, callback: (modal: Modal) => void): void {
    localModals[name] = { name, callback }
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

function isValidModalResponse(data: unknown): data is ModalResponseData {
    return typeof data === 'object' && data !== null && 'component' in data && typeof (data as ModalResponseData).component === 'string'
}

function updateBrowserUrl(url: string | undefined, useBrowserHistory: boolean, modalData?: ModalResponseData): void {
    if (!url || !useBrowserHistory || typeof window === 'undefined') {
        return
    }

    router.push({
        url,
        preserveScroll: true,
        preserveState: true,
        props: modalData
            ? (currentProps: Record<string, unknown>) => ({
                  ...currentProps,
                  _inertiaui_modal: {
                      ...modalData,
                      baseUrl: session.baseUrl,
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
    if (!isValidModalResponse(responseData)) {
        return Promise.reject(
            new Error(
                'Invalid modal response. This usually happens when the server returns a redirect (e.g., due to session expiration). ' +
                    'Check if the user is still authenticated.',
            ),
        )
    }

    return router.resolveComponent(responseData.component).then((component) => push(unwrapComponent(component), responseData, config, onClose, onAfterLeave))
}

function visit(
    href: string,
    method: HttpMethod,
    payload: RequestPayload = {},
    headers: Record<string, string> = {},
    config: ModalConfig = {},
    onClose: (() => void) | null = null,
    onAfterLeave: (() => void) | null = null,
    queryStringArrayFormat: 'brackets' | 'indices' = 'brackets',
    useBrowserHistory: boolean = false,
    onStart: (() => void) | null = null,
    onSuccess: ((response?: HttpResponse) => void) | null = null,
    onError: ((...args: unknown[]) => void) | null = null,
    props: Record<string, unknown> | null = null,
): Promise<Modal> {
    const modalId = generateId()

    return new Promise((resolve, reject) => {
        if (href.startsWith('#')) {
            resolve(pushLocalModal(href.substring(1), config, onClose, onAfterLeave, props))
            return
        }

        const [url, data] = mergeDataIntoQueryString(method, href || '', payload, queryStringArrayFormat)
        const cachedResponse = prefetchCache.get(ResponseCache.key(method, url, data))

        if (cachedResponse) {
            const cachedData = parseResponseData(cachedResponse.data) as ModalResponseData
            onSuccess?.(cachedResponse)
            pushFromResponseData(cachedData, config, onClose, onAfterLeave)
                .then((modal) => {
                    updateBrowserUrl(cachedData.url, useBrowserHistory, cachedData)
                    resolve(modal)
                })
                .catch(reject)
            return
        }

        if (stack.length === 0) {
            session.baseUrl = typeof window !== 'undefined' ? window.location.href : ''
        }

        const requestHeaders: Record<string, string> = {
            ...headers,
            Accept: 'text/html, application/xhtml+xml',
            'X-Requested-With': 'XMLHttpRequest',
            'X-Inertia': 'true',
            'X-Inertia-Version': usePage().version ?? '',
            'X-InertiaUI-Modal': modalId,
            'X-InertiaUI-Modal-Base-Url': session.baseUrl ?? '',
        }

        onStart?.()
        progress?.start()

        http.getClient()
            .request({ url, method, data, headers: requestHeaders })
            .then((response) => {
                const responseData = parseResponseData(response.data) as ModalResponseData
                onSuccess?.(response)
                pushFromResponseData(responseData, config, onClose, onAfterLeave)
                    .then((modal) => {
                        updateBrowserUrl(responseData.url, useBrowserHistory, responseData)
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
    component: Component<Record<string, unknown>> | null,
    response: ModalResponseData,
    config?: ModalConfig | null,
    onClose?: (() => void) | null,
    afterLeave?: (() => void) | null,
): Modal {
    const newModal = new Modal(component, response, config, onClose, afterLeave)
    stack.push(newModal)
    loadDeferredProps(newModal)
    tick().then(() => newModal.show())

    return newModal
}

export const modalPropNames = ['closeButton', 'closeExplicitly', 'closeOnClickOutside', 'maxWidth', 'paddingClasses', 'panelClasses', 'position', 'slideover']

export interface ModalStack {
    setComponentResolver: (resolver: ComponentResolver) => void
    getBaseUrl: () => string | null
    setBaseUrl: (url: string | null) => void
    isClosingToBaseUrl: (pageUrl: string) => boolean
    clearClosingToBaseUrl: () => void
    stack: Modal[]
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
        getBaseUrl: () => session.baseUrl,
        setBaseUrl: (url: string | null) => {
            session.baseUrl = url
        },
        isClosingToBaseUrl: (pageUrl: string) => {
            if (!closingToBaseUrlTarget) return false
            const targetPath = new URL(closingToBaseUrlTarget, 'http://x').pathname
            const pagePath = new URL(pageUrl, 'http://x').pathname
            return targetPath === pagePath
        },
        clearClosingToBaseUrl: () => {
            closingToBaseUrlTarget = null
        },
        stack,
        push,
        pushFromResponseData,
        closeAll: (force = false) => {
            if (force) {
                clearStack()
            } else {
                ;[...stack].reverse().forEach((modal) => modal.close())
            }
        },
        reset: () => clearStack(),
        visit,
        registerLocalModal,
        removeLocalModal: (name: string) => delete localModals[name],
    }
}
