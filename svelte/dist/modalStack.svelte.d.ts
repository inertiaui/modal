import type { HttpResponse, Method, RequestPayload } from '@inertiajs/core';
import { type Component } from 'svelte';
import type { ModalTypeConfig } from './config.js';
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
export type ModalConfig = Partial<ModalTypeConfig & {
    slideover: boolean;
}>;
export interface ReloadOptions {
    only?: string[];
    except?: string[];
    method?: HttpMethod;
    data?: Record<string, unknown>;
    headers?: Record<string, string>;
    onStart?: () => void;
    onSuccess?: (response: HttpResponse) => void;
    onError?: (error: unknown) => void;
    onFinish?: () => void;
}
export interface VisitOptions {
    method?: HttpMethod;
    data?: RequestPayload;
    headers?: Record<string, string>;
    config?: ModalConfig;
    onClose?: () => void;
    onAfterLeave?: () => void;
    queryStringArrayFormat?: 'brackets' | 'indices';
    navigate?: boolean;
    onStart?: () => void;
    onSuccess?: (response?: HttpResponse) => void;
    onError?: (...args: unknown[]) => void;
    listeners?: Record<string, (...args: unknown[]) => void>;
    props?: Record<string, unknown>;
}
export type PrefetchOption = boolean | 'hover' | 'click' | 'mount' | Array<'hover' | 'click' | 'mount'>;
export interface PrefetchOptions {
    method?: HttpMethod;
    data?: RequestPayload;
    headers?: Record<string, string>;
    queryStringArrayFormat?: 'brackets' | 'indices';
    cacheFor?: number;
    onPrefetching?: () => void;
    onPrefetched?: () => void;
}
export type HttpMethod = Method;
type EventCallback = (...args: unknown[]) => void;
type ComponentResolver = (name: string) => Promise<Component<Record<string, unknown>>>;
export declare function prefetch(href: string, options?: PrefetchOptions): Promise<void>;
export declare const initFromPageProps: (_pageProps: {
    resolveComponent?: ComponentResolver;
}) => void;
export declare class Modal {
    id: string;
    isOpen: boolean;
    shouldRender: boolean;
    listeners: Record<string, EventCallback[]>;
    component: Component<Record<string, unknown>> | null;
    props: Record<string, unknown>;
    response: ModalResponseData;
    config: ModalConfig;
    onCloseCallback: (() => void) | null;
    afterLeaveCallback: (() => void) | null;
    name?: string;
    constructor(component: Component<Record<string, unknown>> | null, response: ModalResponseData, config?: ModalConfig | null, onClose?: (() => void) | null, afterLeave?: (() => void) | null);
    get index(): number;
    get onTopOfStack(): boolean;
    getParentModal: () => Modal | null;
    getChildModal: () => Modal | null;
    show: () => void;
    close: () => void;
    setOpen: (open: boolean) => void;
    afterLeave: () => void;
    on: (event: string, callback: EventCallback) => void;
    off: (event: string, callback?: EventCallback) => void;
    emit: (event: string, ...args: unknown[]) => void;
    registerEventListenersFromAttrs: (attrs: Record<string, unknown>) => (() => void);
    reload: (options?: ReloadOptions) => void;
    updateProps: (props: Record<string, unknown>) => void;
}
declare function registerLocalModal(name: string, callback: (modal: Modal) => void): void;
declare function pushFromResponseData(responseData: ModalResponseData, config?: ModalConfig, onClose?: (() => void) | null, onAfterLeave?: (() => void) | null): Promise<Modal>;
declare function visit(href: string, method: HttpMethod, payload?: RequestPayload, headers?: Record<string, string>, config?: ModalConfig, onClose?: (() => void) | null, onAfterLeave?: (() => void) | null, queryStringArrayFormat?: 'brackets' | 'indices', useBrowserHistory?: boolean, onStart?: (() => void) | null, onSuccess?: ((response?: HttpResponse) => void) | null, onError?: ((...args: unknown[]) => void) | null, props?: Record<string, unknown> | null): Promise<Modal>;
declare function push(component: Component<Record<string, unknown>> | null, response: ModalResponseData, config?: ModalConfig | null, onClose?: (() => void) | null, afterLeave?: (() => void) | null): Modal;
export declare const modalPropNames: string[];
export interface ModalStack {
    setComponentResolver: (resolver: ComponentResolver) => void;
    getBaseUrl: () => string | null;
    setBaseUrl: (url: string | null) => void;
    isClosingToBaseUrl: (pageUrl: string) => boolean;
    clearClosingToBaseUrl: () => void;
    stack: Modal[];
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
