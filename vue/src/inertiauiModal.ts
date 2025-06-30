import { getConfig, putConfig, resetConfig } from './config'
import { useModalStack, initFromPageProps, renderApp } from './modalStack'
import useModal from './useModal'
import Deferred from './Deferred.vue'
import HeadlessModal from './HeadlessModal.vue'
import Modal from './Modal.vue'
import ModalLink from './ModalLink.vue'
import ModalRoot from './ModalRoot.vue'
import WhenVisible from './WhenVisible.vue'
import type { Method, RequestPayload, VisitOptions } from '@inertiajs/core'
import type { ModalConfig } from './types'

interface VisitModalOptions {
    method?: Method
    data?: RequestPayload
    headers?: Record<string, string>
    config?: ModalConfig
    onClose?: () => void
    onAfterLeave?: () => void
    queryStringArrayFormat?: string
    navigate?: boolean
    onStart?: () => void
    onSuccess?: (response: any) => void
    onError?: (error: any) => void
    listeners?: Record<string, Function>
}

function visitModal(url: string, options: VisitModalOptions = {}) {
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
            options.navigate ?? getConfig('navigate'),
            options.onStart,
            options.onSuccess,
            options.onError,
        )
        .then((modal: any) => {
            const listeners = options.listeners ?? {}

            Object.keys(listeners).forEach((event) => {
                // e.g. refreshKey -> refresh-key
                const eventName = event.replace(/([A-Z])/g, '-$1').toLowerCase()
                modal.on(eventName, listeners[event])
            })

            return modal
        })
}

export {
    Deferred,
    HeadlessModal,
    Modal,
    ModalLink,
    ModalRoot,
    WhenVisible,
    getConfig,
    initFromPageProps,
    putConfig,
    renderApp,
    resetConfig,
    useModal,
    visitModal,
}
