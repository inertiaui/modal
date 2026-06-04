import { RequestPayload } from '@inertiajs/core';
import { AxiosResponse } from 'axios';
import { h, Component, Ref, ComputedRef } from 'vue';
export interface ModalResponseData {
    id?: string;
    component: string;
    props: Record<string, unknown>;
    url?: string;
    version?: string;
    meta?: {
        deferredProps?: Record<string, string[]>;
    };
    baseUrl?: string;
}
export interface ModalConfig {
    [key: string]: unknown;
}
export interface ReloadOptions {
    only?: string[];
    except?: string[];
    method?: string;
    data?: Record<string, unknown>;
    headers?: Record<string, string>;
    onStart?: () => void;
    onSuccess?: (response: AxiosResponse) => void;
    onError?: (error: unknown) => void;
    onFinish?: () => void;
}
export interface VisitOptions {
    method?: string;
    data?: RequestPayload;
    headers?: Record<string, string>;
    config?: ModalConfig;
    onClose?: () => void;
    onAfterLeave?: () => void;
    queryStringArrayFormat?: 'brackets' | 'indices';
    navigate?: boolean;
    onStart?: () => void;
    onSuccess?: (response?: AxiosResponse) => void;
    onError?: (...args: unknown[]) => void;
    listeners?: Record<string, (...args: unknown[]) => void>;
    props?: Record<string, unknown>;
}
export type PrefetchOption = boolean | 'hover' | 'click' | 'mount' | Array<'hover' | 'click' | 'mount'>;
export interface PrefetchOptions {
    method?: string;
    data?: RequestPayload;
    headers?: Record<string, string>;
    queryStringArrayFormat?: 'brackets' | 'indices';
    cacheFor?: number;
    onPrefetching?: () => void;
    onPrefetched?: () => void;
}
type EventCallback = (...args: unknown[]) => void;
type ComponentResolver = (name: string) => Promise<Component>;
export declare function prefetch(href: string, options?: PrefetchOptions): Promise<void>;
export declare const initFromPageProps: (pageProps: {
    resolveComponent?: ComponentResolver;
}) => void;
export declare class Modal {
    id: string;
    isOpen: boolean;
    shouldRender: boolean;
    listeners: Record<string, EventCallback[]>;
    component: Component | null;
    props: Ref<Record<string, unknown>>;
    response: ModalResponseData;
    config: ModalConfig;
    onCloseCallback: (() => void) | null;
    afterLeaveCallback: (() => void) | null;
    index: ComputedRef<number>;
    onTopOfStack: ComputedRef<boolean>;
    name?: string;
    constructor(component: Component | null, response: ModalResponseData, config?: ModalConfig | null, onClose?: (() => void) | null, afterLeave?: (() => void) | null);
    getComponentPropKeys: () => string[];
    getParentModal: () => Modal | null | undefined;
    getChildModal: () => Modal | null;
    show: () => void;
    close: () => void;
    setOpen: (open: boolean) => void;
    afterLeave: () => void;
    on: (event: string, callback: EventCallback) => void;
    off: (event: string, callback?: EventCallback) => void;
    emit: (event: string, ...args: unknown[]) => void;
    registerEventListenersFromAttrs: ($attrs: Record<string, unknown>) => (() => void);
    reload: (options?: ReloadOptions) => void;
    updateProps: (props: Record<string, unknown>) => void;
}
declare function registerLocalModal(name: string, callback: (modal: Modal) => void): void;
declare function pushFromResponseData(responseData: ModalResponseData, config?: ModalConfig, onClose?: (() => void) | null, onAfterLeave?: (() => void) | null): Promise<Modal>;
declare function visit(href: string, method: string, payload?: RequestPayload, headers?: Record<string, string>, config?: ModalConfig, onClose?: (() => void) | null, onAfterLeave?: (() => void) | null, queryStringArrayFormat?: 'brackets' | 'indices', useBrowserHistory?: boolean, onStart?: (() => void) | null, onSuccess?: ((response?: AxiosResponse) => void) | null, onError?: ((...args: unknown[]) => void) | null, props?: Record<string, unknown> | null): Promise<Modal>;
declare function push(component: Component | null, response: ModalResponseData, config?: ModalConfig | null, onClose?: (() => void) | null, afterLeave?: (() => void) | null): Modal;
export declare const modalPropNames: string[];
export declare const renderApp: (App: Component, props: {
    resolveComponent?: ComponentResolver;
}) => (() => ReturnType<typeof h>);
export interface ModalStack {
    setComponentResolver: (resolver: ComponentResolver) => void;
    getBaseUrl: () => string | null;
    setBaseUrl: (url: string | null) => void;
    isClosingToBaseUrl: (pageUrl: string) => boolean;
    clearClosingToBaseUrl: () => void;
    stack: Readonly<Ref<readonly Modal[]>>;
    push: typeof push;
    pushFromResponseData: typeof pushFromResponseData;
    closeAll: (force?: boolean) => void;
    reset: () => void;
    visit: typeof visit;
    registerLocalModal: typeof registerLocalModal;
    removeLocalModal: (name: string) => boolean;
}
export declare function useModalStack(): ModalStack;
export {};
