import { getConfig, putConfig, resetConfig } from './config.js'
import Modal from './Modal.jsx'
import ModalLink from './ModalLink.jsx'
import { useModalIndex } from './ModalRenderer.jsx'
import { useModalStack, ModalRoot, ModalStackProvider } from './ModalRoot.jsx'

export { useModalIndex, useModalStack, Modal, ModalLink, ModalRoot, ModalStackProvider, getConfig, putConfig, resetConfig }
