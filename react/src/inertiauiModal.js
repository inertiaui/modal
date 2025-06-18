import { createElement } from 'react'
import { getConfig, putConfig, resetConfig } from './config.js'
import { useModalIndex } from './ModalRenderer.jsx'
import { useModalStack, ModalRoot, ModalStackProvider, renderApp, initFromPageProps } from './ModalRoot.jsx'
import useModal from './useModal.js'
import Deferred from './Deferred.jsx'
import HeadlessModal from './HeadlessModal.jsx'
import Modal from './Modal.jsx'
import ModalLink from './ModalLink.jsx'
import WhenVisible from './WhenVisible.jsx'

const setPageLayout = (layout) => (module) => {
    module.default.layout = (page) => createElement(layout, {}, page)
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
    putConfig,
    renderApp,
    resetConfig,
    setPageLayout,
    useModal,
    useModalIndex,
    useModalStack,
}
