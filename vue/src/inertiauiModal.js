import { getConfig, putConfig, resetConfig } from './config.js'
import { useModalStack, initFromPageProps, renderApp } from './modalStack.js'
import HeadlessModal from './HeadlessModal.vue'
import Modal from './Modal.vue'
import ModalLink from './ModalLink.vue'
import ModalRoot from './ModalRoot.vue'
import useModal from './useModal.js'

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

export { HeadlessModal, Modal, ModalLink, ModalRoot, getConfig, putConfig, resetConfig, visitModal, renderApp, useModal, initFromPageProps }
