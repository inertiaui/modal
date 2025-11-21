import { getConfig, putConfig, resetConfig } from './config'
import { useModalStack, initFromPageProps, renderApp, type Modal as ModalType } from './modalStack'
import useModal from './useModal'
import Deferred from './Deferred.vue'
import HeadlessModal from './HeadlessModal.vue'
import Modal from './Modal.vue'
import ModalLink from './ModalLink.vue'
import ModalRoot from './ModalRoot.vue'
import WhenVisible from './WhenVisible.vue'
import { Method, QueryStringArrayFormatOption } from '@inertiajs/core'

type OptionsType = {
    method: Method
    data: Record<string, any>
    headers: Record<string, any>
    config: Record<string, any>
    onClose: (() => void) | null
    onAfterLeave: (() => void) | null
    queryStringArrayFormat: QueryStringArrayFormatOption
    navigate: boolean
    onStart: ((...args: any[]) => void) | null
    onSuccess: ((...args: any[]) => void) | null
    onError: ((...args: any[]) => void) | null
    listeners: object | null
}

function visitModal(url: string, options: OptionsType = {}): Promise<ModalType> {
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
        .then((modal) => {
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
    useModalStack,
    visitModal,
}
