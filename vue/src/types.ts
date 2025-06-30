import type { ComputedRef } from 'vue'

export type ModalType = 'modal' | 'slideover'

export type ModalPosition = 'bottom' | 'center' | 'left' | 'right' | 'top'

export type MaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl'

export interface ModalConfig {
    type?: ModalType
    modal?: boolean
    slideover?: boolean
    closeButton?: boolean
    closeExplicitly?: boolean
    maxWidth?: MaxWidth
    paddingClasses?: string
    panelClasses?: string
    position?: ModalPosition
}

export interface ModalProps {
    config?: ModalConfig
    show?: boolean
    maxWidth?: MaxWidth
    closeable?: boolean
    loading?: boolean
    [key: string]: any
}

export interface ModalStackItem {
    id: string
    component: any
    props: ModalProps
    key: string
}

export interface ModalStackState {
    stack: ModalStackItem[]
    currentIndex: number
}

export interface ReloadOptions {
    only?: string[]
    except?: string[]
    method?: string
    data?: Record<string, any>
    headers?: Record<string, string>
    onStart?: () => void
    onSuccess?: (response: any) => void
    onError?: (error: any) => void
    onFinish?: () => void
}

export interface ModalInstance {
    id: string
    isOpen: boolean
    shouldRender: boolean
    index: ComputedRef<number>
    onTopOfStack: ComputedRef<boolean>
    config: ModalConfig
    props: Record<string, any>
    component: any
    response: {
        id?: string
        props: Record<string, any>
        component: string
        url?: string
        version?: string
        meta?: {
            deferredProps?: Record<string, string[]>
        }
    }
    name?: string

    // Methods
    show(): void
    close(): void
    setOpen(open: boolean): void
    afterLeave(): void
    on(event: string, callback: Function): void
    off(event: string, callback?: Function): void
    emit(event: string, ...args: any[]): void
    reload(options?: ReloadOptions): void
    updateProps(props: Record<string, any>): void
    registerEventListenersFromAttrs(attrs: Record<string, any>): () => void
    getComponentPropKeys(): string[]
    getParentModal(): ModalInstance | null
    getChildModal(): ModalInstance | null
}
