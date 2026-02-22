import { createElement } from 'react'
import { getConfig, putConfig, resetConfig } from './config'
import { useModalIndex } from './ModalRenderer'
import { useModalStack, ModalRoot, ModalStackProvider, renderApp, initFromPageProps, modalPropNames, prefetch } from './ModalRoot'
import useModal from './useModal'
import Deferred from './Deferred'
import HeadlessModal from './HeadlessModal'
import Modal from './Modal'
import ModalLink from './ModalLink'
import WhenVisible from './WhenVisible'
import * as dialogUtils from '../../vue/src/dialog'

// Types
export type {
    Modal as ModalInstance,
    ModalConfig,
    ModalResponseData,
    ModalStackContextValue,
    VisitOptions,
    ReloadOptions,
    EventCallback,
    ComponentResolver,
    PageProps,
    ModalRootProps,
    ModalRendererProps,
    LocalModal,
    // Prefetch types (#146)
    PrefetchOption,
    PrefetchOptions,
} from './types'

export type {
    CleanupFunction,
    FocusTrapOptions,
    ClickOutsideOptions,
    EscapeKeyOptions,
    DialogOptions,
    Dialog,
} from '@inertiaui/vanilla'

const setPageLayout = <T extends { default: { layout?: (page: React.ReactNode) => React.ReactNode } }>(
    layout: React.ComponentType<{ children?: React.ReactNode }>,
) => (module: T): T => {
    module.default.layout = (page) => createElement(layout, { children: page })
    return module
}

export {
    Deferred,
    HeadlessModal,
    Modal,
    ModalLink,
    ModalRoot,
    ModalStackProvider,
    WhenVisible,
    getConfig,
    initFromPageProps,
    modalPropNames,
    putConfig,
    renderApp,
    resetConfig,
    setPageLayout,
    useModal,
    useModalIndex,
    useModalStack,
    // Prefetch function (#146)
    prefetch,
    // Dialog utilities (framework-agnostic)
    dialogUtils,
}
