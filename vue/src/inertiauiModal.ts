import { getConfig, putConfig, resetConfig } from './config'
import { useModalStack, initFromPageProps, renderApp, Modal as ModalClass, modalPropNames, prefetch } from './modalStack'
import type { ModalStack, ModalResponseData, ModalConfig, ReloadOptions, VisitOptions, PrefetchOption, PrefetchOptions } from './modalStack'
import useModal from './useModal'
import Deferred from './Deferred.vue'
import HeadlessModal from './HeadlessModal.vue'
import ModalComponent from './Modal.vue'
import ModalLink from './ModalLink.vue'
import ModalRoot from './ModalRoot.vue'
import WhenVisible from './WhenVisible.vue'
import * as dialogUtils from '@inertiaui/vanilla'
import { kebabCase } from './helpers'

function visitModal(url: string, options: VisitOptions = {}): Promise<ModalClass> {
    return useModalStack()
        .visit(
            url,
            options.method ?? 'get',
            options.data ?? {},
            options.headers ?? {},
            options.config ?? {},
            options.onClose,
            options.onAfterLeave,
            options.queryStringArrayFormat ?? 'brackets',
            options.navigate ?? (getConfig('navigate') as boolean),
            options.onStart,
            options.onSuccess,
            options.onError,
            options.props ?? null,
        )
        .then((modal) => {
            const listeners = options.listeners ?? {}

            Object.keys(listeners).forEach((event) => {
                // e.g. refreshKey -> refresh-key
                const eventName = kebabCase(event)
                modal.on(eventName, listeners[event])
            })

            return modal
        })
}

export {
    // Components
    Deferred,
    HeadlessModal,
    ModalComponent as Modal,
    ModalLink,
    ModalRoot,
    WhenVisible,
    // Config functions
    getConfig,
    putConfig,
    resetConfig,
    // Modal stack functions
    initFromPageProps,
    renderApp,
    useModal,
    useModalStack,
    visitModal,
    modalPropNames,
    // Prefetch function (#146)
    prefetch,
    // Modal class (exported as ModalInstance to avoid conflict with Modal component)
    ModalClass as ModalInstance,
    // Dialog utilities (framework-agnostic)
    dialogUtils,
}

// Export types
export type { ModalStack, ModalResponseData, ModalConfig, ReloadOptions, VisitOptions, PrefetchOption, PrefetchOptions }
export type { ModalTypeConfig } from './config'
export type { CleanupFunction, FocusTrapOptions, EscapeKeyOptions } from '@inertiaui/vanilla'
