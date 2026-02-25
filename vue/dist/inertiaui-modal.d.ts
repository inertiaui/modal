import { AxiosResponse } from 'axios';
import { CleanupFunction } from '@inertiaui/vanilla';
import { ClickOutsideOptions } from '@inertiaui/vanilla';
import { Component } from 'vue';
import { ComputedRef } from 'vue';
import { createDialog } from '@inertiaui/vanilla';
import { createFocusTrap } from '@inertiaui/vanilla';
import { default as Deferred } from './Deferred.vue';
import { Dialog } from '@inertiaui/vanilla';
import { DialogOptions } from '@inertiaui/vanilla';
import { EscapeKeyOptions } from '@inertiaui/vanilla';
import { focusFirstElement } from '@inertiaui/vanilla';
import { FocusTrapOptions } from '@inertiaui/vanilla';
import { getFocusableElements } from '@inertiaui/vanilla';
import { getScrollLockCount } from '@inertiaui/vanilla';
import { h } from 'vue';
import { default as HeadlessModal } from './HeadlessModal.vue';
import { lockScroll } from '@inertiaui/vanilla';
import { markAriaHidden } from '@inertiaui/vanilla';
import { default as Modal } from './Modal.vue';
import { default as ModalLink } from './ModalLink.vue';
import { default as ModalRoot } from './ModalRoot.vue';
import { onClickOutside } from '@inertiaui/vanilla';
import { onEscapeKey } from '@inertiaui/vanilla';
import { Ref } from 'vue';
import { RequestPayload } from '@inertiajs/core';
import { unlockScroll } from '@inertiaui/vanilla';
import { unmarkAriaHidden } from '@inertiaui/vanilla';
import { default as WhenVisible } from './WhenVisible.vue';

export { CleanupFunction }

export { ClickOutsideOptions }

declare type ComponentResolver = (name: string) => Promise<Component>;

export { Deferred }

export { Dialog }

export { DialogOptions }

declare namespace dialogUtils {
    export {
        lockScroll,
        unlockScroll,
        getScrollLockCount,
        getFocusableElements,
        createFocusTrap,
        focusFirstElement,
        onClickOutside,
        onEscapeKey,
        markAriaHidden,
        unmarkAriaHidden,
        createDialog,
        CleanupFunction,
        FocusTrapOptions,
        ClickOutsideOptions,
        EscapeKeyOptions,
        DialogOptions,
        Dialog
    }
}
export { dialogUtils }

export { EscapeKeyOptions }

declare type EventCallback = (...args: unknown[]) => void;

export { FocusTrapOptions }

export declare const getConfig: (key?: string) => unknown;

export { HeadlessModal }

export declare const initFromPageProps: (pageProps: {
    resolveComponent?: ComponentResolver;
}) => void;

export { Modal }

export declare interface ModalConfig {
    [key: string]: unknown;
}

declare interface ModalConfig_2 {
    type: 'modal' | 'slideover';
    navigate: boolean;
    useNativeDialog: boolean;
    appElement: string | null;
    modal: ModalTypeConfig;
    slideover: ModalTypeConfig;
}

export declare class ModalInstance {
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
    getParentModal: () => ModalInstance | null | undefined;
    getChildModal: () => ModalInstance | null;
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

export { ModalLink }

export declare const modalPropNames: string[];

export declare interface ModalResponseData {
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

export { ModalRoot }

export declare interface ModalStack {
    setComponentResolver: (resolver: ComponentResolver) => void;
    getBaseUrl: () => string | null;
    setBaseUrl: (url: string | null) => void;
    isClosingToBaseUrl: (pageUrl: string) => boolean;
    clearClosingToBaseUrl: () => void;
    stack: Readonly<Ref<readonly ModalInstance[]>>;
    push: typeof push;
    pushFromResponseData: typeof pushFromResponseData;
    closeAll: (force?: boolean) => void;
    reset: () => void;
    visit: typeof visit;
    registerLocalModal: typeof registerLocalModal;
    removeLocalModal: (name: string) => boolean;
}

export declare interface ModalTypeConfig {
    closeButton: boolean;
    closeExplicitly: boolean;
    closeOnClickOutside: boolean;
    maxWidth: string;
    paddingClasses: string;
    panelClasses: string;
    position: string;
}

export declare function prefetch(href: string, options?: PrefetchOptions): Promise<void>;

export declare type PrefetchOption = boolean | 'hover' | 'click' | 'mount' | Array<'hover' | 'click' | 'mount'>;

export declare interface PrefetchOptions {
    method?: string;
    data?: RequestPayload;
    headers?: Record<string, string>;
    queryStringArrayFormat?: 'brackets' | 'indices';
    cacheFor?: number;
    onPrefetching?: () => void;
    onPrefetched?: () => void;
}

declare function push(component: Component | null, response: ModalResponseData, config?: ModalConfig | null, onClose?: (() => void) | null, afterLeave?: (() => void) | null): ModalInstance;

declare function pushFromResponseData(responseData: ModalResponseData, config?: ModalConfig, onClose?: (() => void) | null, onAfterLeave?: (() => void) | null): Promise<ModalInstance>;

export declare const putConfig: (key: string | Partial<ModalConfig_2>, value?: unknown) => void;

declare function registerLocalModal(name: string, callback: (modal: ModalInstance) => void): void;

export declare interface ReloadOptions {
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

export declare const renderApp: (App: Component, props: {
    resolveComponent?: ComponentResolver;
}) => (() => ReturnType<typeof h>);

export declare const resetConfig: () => void;

export declare function useModal(): ModalInstance | null;

export declare function useModalStack(): ModalStack;

declare function visit(href: string, method: string, payload?: RequestPayload, headers?: Record<string, string>, config?: ModalConfig, onClose?: (() => void) | null, onAfterLeave?: (() => void) | null, queryStringArrayFormat?: 'brackets' | 'indices', useBrowserHistory?: boolean, onStart?: (() => void) | null, onSuccess?: ((response?: AxiosResponse) => void) | null, onError?: ((...args: unknown[]) => void) | null, props?: Record<string, unknown> | null): Promise<ModalInstance>;

export declare function visitModal(url: string, options?: VisitOptions): Promise<ModalInstance>;

export declare interface VisitOptions {
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

export { WhenVisible }

export { }
