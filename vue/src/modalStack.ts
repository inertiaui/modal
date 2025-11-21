import {
    computed,
    readonly,
    ref,
    markRaw,
    h,
    nextTick,
    type Component,
    type Ref,
    type ComputedRef,
} from 'vue'
import { generateId, except, kebabCase } from './helpers'
import { router, usePage } from '@inertiajs/vue3'
import * as InertiaVue from '@inertiajs/vue3'
import { mergeDataIntoQueryString, Method, QueryStringArrayFormatOption } from '@inertiajs/core'
import Axios from 'axios'
import ModalRoot from './ModalRoot.vue'

type ResolveComponent = (name: string) => Promise<Component>

    let resolveComponent: ResolveComponent | null = null

interface PendingModalUpdate {
    config?: Record<string, any>
    onClose?: () => void
        onAfterLeave?: () => void
}

const pendingModalUpdates: Ref<Record<string, PendingModalUpdate>> = ref<Record<string, PendingModalUpdate>>({})
const baseUrl: Ref<string | null> = ref<string | null>(null)
const baseModalsToWaitFor: Ref<Record<string, (modal: Modal) => void>> = ref<Record<string, (modal: Modal) => void>>({})
const stack: Ref<Modal[]> = ref<Modal[]>([])
const localModals: Ref<Record<string, { name: string; callback: (modal: Modal) => void }>> = ref<Record<string, { name: string; callback: (modal: Modal) => void }>>({})

const setComponentResolver = (resolver: ResolveComponent) => {
    resolveComponent = resolver
}

export const initFromPageProps = (pageProps: { resolveComponent?: ResolveComponent }) => {
    if (pageProps.resolveComponent) {
        resolveComponent = pageProps.resolveComponent
    }
}

export type ModalReloadOptions = {
    only?: string[]
    except?: string[]
    method?: string
    data?: any
    onStart?: () => void
    headers?: Record<string, string>
    onError?: (error: any) => void
    onFinish?: () => void
    onSuccess?: (response: any) => void
}

interface ModalResponseMeta {
    deferredProps?: Record<string, string[]>
}

export interface ModalResponse {
    id?: string
    props: Record<string, any>
    url?: string
    component?: string
    version?: string
    meta?: ModalResponseMeta
}

export class Modal {
    // public so external helpers can access/modify
    public id: string
    public isOpen: boolean
    public shouldRender: boolean
    public name?: string

    private listeners: Record<string, Array<(...args: any[]) => void>>
    private component: Component | null
    private props: Ref<Record<string, any>>
    public response: ModalResponse
    private config: Record<string, any>
    private onCloseCallback?: () => void
    private afterLeaveCallback?: () => void
    private index: ComputedRef<number>
    private onTopOfStack: ComputedRef<boolean>

    constructor(
        component: Component | null,
        response: ModalResponse,
        config: Record<string, any> = {},
        onClose?: () => void,
    afterLeave?: () => void,
) {
    this.id = response.id ?? generateId()
    this.isOpen = false
    this.shouldRender = false
    this.listeners = {}

    this.component = component
    this.props = ref(response.props ?? {}) as Ref<Record<string, any>>
    this.response = response
    this.config = config ?? {}
    this.onCloseCallback = onClose
    this.afterLeaveCallback = afterLeave

    const pending = pendingModalUpdates.value[this.id]
    if (pending) {
        this.config = {
            ...this.config,
            ...(pending.config ?? {}),
        }

        const pendingOnClose = pending.onClose
        const pendingOnAfterLeave = pending.onAfterLeave

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

    this.index = computed(() => stack.value.findIndex((m: Modal) => m.id === this.id))
    this.onTopOfStack = computed(() => {
        if (stack.value.length < 2) {
            return true
        }

        const modals = stack.value.map((modal) => ({
            id: modal.id,
            shouldRender: modal.shouldRender,
        }))

        return modals.reverse().find((modal: Modal) => modal.shouldRender)?.id === this.id
    })
}

getComponentPropKeys: () => string[] = (): string[] => {
    if (!this.component) return []

    const comp: any = this.component

    if (Array.isArray(comp.props)) {
        return comp.props
    }

    return comp.props ? Object.keys(comp.props) : []
}

getParentModal: () => Modal|null = (): Modal | null => {
    const index = this.index.value

    if (index < 1) {
        return null
    }

    return (
        stack.value
            .slice(0, index)
            .reverse()
            .find((modal: Modal) => modal.isOpen) ?? null
    )
}

getChildModal: () => Modal|null = (): Modal | null => {
    const index = this.index.value

    if (index === stack.value.length - 1) {
        return null
    }

    return stack.value.slice(index + 1).find((modal: Modal) => modal.isOpen) ?? null
}

show: () => void = (): void => {
    const index = this.index.value

    if (index > -1) {
        if (stack.value[index].isOpen) {
            return
        }

        stack.value[index].isOpen = true
        stack.value[index].shouldRender = true
    }
}

close: () => void = (): void => {
    const index = this.index.value

    if (index > -1) {
        if (!stack.value[index].isOpen) {
            return
        }

        Object.keys(this.listeners).forEach((event: string) => {
            this.off(event)
        })

        stack.value[index].isOpen = false
        this.onCloseCallback?.()
        this.onCloseCallback = undefined
    }
}

setOpen: (open: boolean) => void = (open: boolean): void => {
    open ? this.show() : this.close()
}

afterLeave: () => void = (): void => {
    const index = this.index.value

    if (index > -1) {
        if (stack.value[index].isOpen) {
            return
        }

        stack.value[index].shouldRender = false
        this.afterLeaveCallback?.()
        this.afterLeaveCallback = undefined
    }

    if (index === 0) {
        stack.value = []
    }
}

on: (event: string | null, callback: (...args: any[]) => void) => void = (event: string | null, callback: (...args: any[]) => void): void => {
    const evt = kebabCase(event)
    this.listeners[evt] = this.listeners[evt] ?? []
    this.listeners[evt].push(callback)
}

off: (event: string | null, callback?: (...args: any[]) => void) => void = (event: string | null, callback?: (...args: any[]) => void): void => {
    const evt = kebabCase(event)
    if (callback) {
        this.listeners[evt] =
            this.listeners[evt]?.filter((cb) => cb !== callback) ?? []
    } else {
        delete this.listeners[evt]
    }
}

emit: (event: string | null, ...args: any[]) => void = (event: string | null, ...args: any[]): void => {
    const evt = kebabCase(event)
    this.listeners[evt]?.forEach((callback:  (...args: any[]) => void) => callback(...args))
}

registerEventListenersFromAttrs = ($attrs: Record<string, any>): (() => void) => {
    const unsubscribers: Array<() => void> = []

    Object.keys($attrs)
        .filter((key) => key.startsWith('on'))
        .forEach((key) => {
            const eventName = kebabCase(key).replace(/^on-/, '')
            const handler = $attrs[key]
            if (typeof handler === 'function') {
                this.on(eventName, handler)
                unsubscribers.push(() => this.off(eventName, handler))
            }
        })

    return () => unsubscribers.forEach((unsub) => unsub())
}

reload: (options: ModalReloadOptions = {}) => void = (options: ModalReloadOptions = {}): void => {
    let keys: string[] = Object.keys(this.response.props)

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
            'X-Inertia-Version': this.response.version,
            'X-Inertia-Partial-Data': keys.join(','),
            'X-InertiaUI-Modal': generateId(),
            'X-InertiaUI-Modal-Use-Router': 0,
            'X-InertiaUI-Modal-Base-Url': baseUrl.value ?? '',
        },
    })
        .then((response: any): void => {
            this.updateProps(response.data.props)
            options.onSuccess?.(response)
        })
        .catch((error: any): void => {
            options.onError?.(error)
        })
        .finally((): void => {
            options.onFinish?.()
        })
}

updateProps: (props: Record<string, any>) => void = (props: Record<string, any>): void => {
    Object.assign(this.props.value, props)
}
}

function registerLocalModal(name: string, callback: (modal: Modal) => void): void {
    localModals.value[name] = { name, callback }
}

function pushLocalModal(
    name: string,
    config: Record<string, any> = {},
    onClose?: () => void,
    afterLeave?: () => void,
): Modal {
    if (!localModals.value[name]) {
        throw new Error(`The local modal "${name}" has not been registered.`)
    }

    const modal = push(null, { props: {} }, config, onClose, afterLeave)
    modal.name = name
    localModals.value[name].callback(modal)
    return modal
}

function pushFromResponseData(
    responseData: ModalResponse & { component: string },
    config: Record<string, any> = {},
    onClose?: () => void,
    onAfterLeave?: () => void,
): Promise<Modal> {
    if (!resolveComponent) {
    return Promise.reject(new Error('resolveComponent has not been set'))
}

return resolveComponent(responseData.component).then((component) =>
    push(markRaw(component) as Component, responseData, config, onClose, onAfterLeave),
)
}

function visit(
    href: string,
    method: Method,
    payload: Record<string, any> = {},
    headers: Record<string, any> = {},
    config: Record<string, any> = {},
    onClose: (() => void) | null = null,
    onAfterLeave: (() => void) | null = null,
    queryStringArrayFormat: QueryStringArrayFormatOption,
    useBrowserHistory = false,
    onStart: ((...args: any[]) => void) | null = null,
    onSuccess: ((...args: any[]) => void) | null = null,
    onError: ((...args: any[]) => void) | null = null,
): Promise<Modal> {
    const modalId = generateId()

    return new Promise<Modal>((resolve, reject) => {
        if (href.startsWith('#')) {
            resolve(pushLocalModal(href.substring(1), config, onClose ?? undefined, onAfterLeave ?? undefined))
            return
        }

        const [url, data] = mergeDataIntoQueryString(method, href || '', payload, queryStringArrayFormat)

        const useInertiaRouter = useBrowserHistory && stack.value.length === 0

        if (stack.value.length === 0) {
            baseUrl.value = typeof window !== 'undefined' ? window.location.href : ''
        }

        headers = {
            ...headers,
            Accept: 'text/html, application/xhtml+xml',
            'X-Requested-With': 'XMLHttpRequest',
            'X-Inertia': true,
            'X-Inertia-Version': (usePage() as any).version,
            'X-InertiaUI-Modal': modalId,
            'X-InertiaUI-Modal-Use-Router': useInertiaRouter ? 1 : 0,
            'X-InertiaUI-Modal-Base-Url': baseUrl.value ?? '',
        }

        if (useInertiaRouter) {
            pendingModalUpdates.value[modalId] = {
                config,
                onClose: onClose ?? undefined,
                onAfterLeave: onAfterLeave ?? undefined,
            }

            baseModalsToWaitFor.value[modalId] = (baseModal: Modal) => resolve(baseModal)

            return router.visit(url, {
                method,
                data,
                headers,
                preserveScroll: true,
                preserveState: true,
                onError(...args: any[]) {
                    onError?.(...args)
                    reject(...args)
                },
                onStart(...args: any[]) {
                    onStart?.(...args)
                },
                onSuccess(...args: any[]) {
                    onSuccess?.(...args)
                },
            })
        }

        onStart?.()

        const withProgress = (callback: (progress: any) => void) => {
            try {
                // InertiaVue.progress is optional
                // @ts-ignore
                InertiaVue.progress ? callback(InertiaVue.progress) : null
            } catch {
                // ignore
            }
        }

        withProgress((progress) => progress.start())

        Axios({ url, method, data, headers })
            .then((response: any) => {
                onSuccess?.(response)
                resolve(pushFromResponseData(response.data, config, onClose ?? undefined, onAfterLeave ?? undefined))
            })
            .catch((...args: any[]) => {
                onError?.(...args)
                reject(...args)
            })
            .finally(() => {
                withProgress((progress) => progress.finish())
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
    response: ModalResponse,
    config: Record<string, any> = {},
    onClose?: () => void,
    afterLeave?: () => void,
): Modal {
    const newModal = new Modal(component, response, config, onClose, afterLeave)
    stack.value.push(newModal)
    loadDeferredProps(newModal)

    nextTick(() => newModal.show())

    return newModal
}

export const modalPropNames = [
    'closeButton',
    'closeExplicitly',
    'maxWidth',
    'paddingClasses',
    'panelClasses',
    'position',
    'slideover',
] as const

    export const renderApp = (App: Component, props: Record<string, any>) => {
    if ((props as any).resolveComponent) {
        resolveComponent = (props as any).resolveComponent
    }

    return () => h(ModalRoot, () => h(App, props))
}

export function useModalStack() {
    return {
        setComponentResolver,
        getBaseUrl: () => baseUrl.value,
        setBaseUrl: (url: string) => (baseUrl.value = url),
        stack: readonly(stack),
        push,
        pushFromResponseData,
        closeAll: () => [...stack.value].reverse().forEach((modal) => modal.close()),
        reset: () => (stack.value = []),
        visit,
        registerLocalModal,
        removeLocalModal: (name: string) => delete localModals.value[name],
        onModalOnBase(baseModal: Modal) {
            const resolver = baseModalsToWaitFor.value[baseModal.id]

            if (resolver) {
                resolver(baseModal)
                delete baseModalsToWaitFor.value[baseModal.id]
            }
        },
    }
}
