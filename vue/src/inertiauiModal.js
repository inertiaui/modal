import { getConfig, putConfig, resetConfig } from './config.js'
import { useModalStack, initFromPageProps, renderApp } from './modalStack.js'
import useModal from './useModal.js'
import Deferred from './Deferred.vue'
import HeadlessModal from './HeadlessModal.vue'
import Modal from './Modal.vue'
import ModalLink from './ModalLink.vue'
import ModalRoot from './ModalRoot.vue'
import WhenVisible from './WhenVisible.vue'

function visitModal(url, options = {}) {
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
    visitModal,
}
