import { getConfig, putConfig, resetConfig } from './config.js'
import Modal from './Modal.vue'
import ModalLink from './ModalLink.vue'
import ModalRoot from './ModalRoot.vue'
import { useModalStack } from './modalStack.js'

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

export { Modal, ModalLink, ModalRoot, getConfig, putConfig, resetConfig, visitModal }
