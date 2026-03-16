import { AxiosResponse } from 'axios';
import { ComponentType, ReactNode } from 'react';
import { RequestPayload } from '@inertiajs/core';
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
export type EventCallback = (...args: unknown[]) => void;
export type ComponentResolver = (name: string) => Promise<ComponentType>;
export interface Modal {
    id: string;
    isOpen: boolean;
    shouldRender: boolean;
    listeners: Record<string, EventCallback[]>;
    component: ComponentType | null;
    props: Record<string, unknown>;
    response: ModalResponseData;
    config: ModalConfig;
    onCloseCallback: (() => void) | null;
    afterLeaveCallback: (() => void) | null;
    index: number;
    onTopOfStack: boolean;
    name?: string;
    show: () => void;
    close: () => void;
    setOpen: (open: boolean) => void;
    afterLeave: () => void;
    on: (event: string, callback: EventCallback) => void;
    off: (event: string, callback?: EventCallback) => void;
    emit: (event: string, ...args: unknown[]) => void;
    registerEventListenersFromProps: (props: Record<string, unknown>) => () => void;
    reload: (options?: ReloadOptions) => void;
    updateProps: (props: Record<string, unknown>) => void;
    getParentModal: () => Modal | null;
    getChildModal: () => Modal | null;
}
export interface LocalModal {
    name: string;
    callback: (modal: Modal) => void;
}
export interface ModalStackContextValue {
    stack: Modal[];
    localModals: Record<string, LocalModal>;
    push: (component: ComponentType | null, response: ModalResponseData, config?: ModalConfig | null, onClose?: (() => void) | null, afterLeave?: (() => void) | null) => Modal;
    pushFromResponseData: (responseData: ModalResponseData, config?: ModalConfig, onClose?: (() => void) | null, onAfterLeave?: (() => void) | null) => Promise<Modal>;
    length: () => number;
    closeAll: (force?: boolean) => void;
    reset: () => void;
    visit: (href: string, method: string, payload?: RequestPayload, headers?: Record<string, string>, config?: ModalConfig, onClose?: (() => void) | null, onAfterLeave?: (() => void) | null, queryStringArrayFormat?: 'brackets' | 'indices', useBrowserHistory?: boolean, onStart?: (() => void) | null, onSuccess?: ((response?: AxiosResponse) => void) | null, onError?: ((...args: unknown[]) => void) | null) => Promise<Modal>;
    visitModal: (url: string, options?: VisitOptions) => Promise<Modal>;
    registerLocalModal: (name: string, callback: (modal: Modal) => void) => void;
    removeLocalModal: (name: string) => void;
}
export interface PageProps {
    initialPage?: {
        version?: string;
    };
    resolveComponent?: ComponentResolver;
}
export interface ModalRootProps {
    children?: ReactNode;
}
export interface ModalRendererProps {
    index: number;
}
