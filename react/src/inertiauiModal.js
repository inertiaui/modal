import { createElement } from 'react'
import { getConfig, putConfig, resetConfig } from './config.js'
import { useModalIndex } from './ModalRenderer.jsx'
import { useModalStack, ModalRoot, ModalStackProvider, renderApp, initFromPageProps } from './ModalRoot.jsx'
import HeadlessModal from './HeadlessModal.jsx'
import Modal from './Modal.jsx'
import ModalLink from './ModalLink.jsx'
import useModal from './useModal.js'

const setPageLayout = (layout) => (module) => {
    module.default.layout = (page) => createElement(layout, {}, page)
    return module
}

export {
    getConfig,
    putConfig,
    resetConfig,
    useModalStack,
    useModalIndex,
    HeadlessModal,
    Modal,
    ModalLink,
    ModalRoot,
    ModalStackProvider,
    renderApp,
    useModal,
    initFromPageProps,
    setPageLayout,
}
