import { getConfig, putConfig, resetConfig } from './config.js'
import { useModalStack } from './modalStack.js'
import HeadlessModal from './HeadlessModal.vue'
import Modal from './Modal.vue'
import ModalLink from './ModalLink.vue'
import ModalRoot from './ModalRoot.vue'

function visitModal(url, options = {}) {
    return useModalStack().visit(
        url,
        options.method ?? 'get',
        options.data ?? {},
        options.headers ?? {},
        options.config ?? {},
        options.onClose,
        options.onAfterLeave,
        options.queryStringArrayFormat ?? 'brackets',
    )
}

export { HeadlessModal, Modal, ModalLink, ModalRoot, getConfig, putConfig, resetConfig, visitModal }
