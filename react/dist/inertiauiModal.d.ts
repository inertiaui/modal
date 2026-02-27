import { getConfig, putConfig, resetConfig } from './config';
import { useModalIndex } from './ModalRenderer';
import { useModalStack, ModalRoot, ModalStackProvider, renderApp, initFromPageProps, modalPropNames, prefetch } from './ModalRoot';
import { default as useModal } from './useModal';
import { default as Deferred } from './Deferred';
import { default as HeadlessModal } from './HeadlessModal';
import { default as Modal } from './Modal';
import { default as ModalLink } from './ModalLink';
import { default as WhenVisible } from './WhenVisible';
import * as dialogUtils from '@inertiaui/vanilla';
export type { Modal as ModalInstance, ModalConfig, ModalResponseData, ModalStackContextValue, VisitOptions, ReloadOptions, EventCallback, ComponentResolver, PageProps, ModalRootProps, ModalRendererProps, LocalModal, PrefetchOption, PrefetchOptions, } from './types';
export type { ModalTypeConfig } from './config';
export type { CleanupFunction, FocusTrapOptions, EscapeKeyOptions } from '@inertiaui/vanilla';
declare const setPageLayout: <T extends {
    default: {
        layout?: (page: React.ReactNode) => React.ReactNode;
    };
}>(layout: React.ComponentType<{
    children?: React.ReactNode;
}>) => (module: T) => T;
export { Deferred, HeadlessModal, Modal, ModalLink, ModalRoot, ModalStackProvider, WhenVisible, getConfig, initFromPageProps, modalPropNames, putConfig, renderApp, resetConfig, setPageLayout, useModal, useModalIndex, useModalStack, prefetch, dialogUtils, };
