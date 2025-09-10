import { createElement } from 'react'
import { getConfig, putConfig, resetConfig } from './config.js'
import { useModalIndex } from './ModalRenderer.jsx'
import { useModalStack, ModalRoot, ModalStackProvider, renderApp, initFromPageProps, visitModal } from './ModalRoot.jsx'
import useModal from './useModal.js'
import Deferred from './Deferred.jsx'
import HeadlessModal from './HeadlessModal.jsx'
import Modal from './Modal.jsx'
import ModalLink from './ModalLink.jsx'
import WhenVisible from './WhenVisible.jsx'
import { router } from '@inertiajs/react'
import { prefetch } from './prefetch.js'

const setPageLayout = (layout) => (module) => {
    module.default.layout = (page) => createElement(layout, {}, page)
    return module
}

// Note: For programmatic prefetch usage outside of components,
// you should use the prefetch method from useModalStack() hook within a component.
// This standalone function provides basic prefetch functionality.
const prefetchModal = (url, options = {}) => {
    return prefetch(
        url,
        options.method ?? 'get',
        options.data ?? {},
        options.headers ?? {},
        options.queryStringArrayFormat ?? 'brackets',
        options.navigate ?? getConfig('navigate'),
        options.cacheFor ?? 30000,
        Array.isArray(options.cacheTags) ? options.cacheTags : options.cacheTags ? [options.cacheTags] : [],
        null, // baseUrl - will be determined dynamically
        null, // version - will be determined dynamically
        router,
        options.onPrefetching,
        options.onPrefetched,
    )
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
    prefetchModal,
    putConfig,
    renderApp,
    resetConfig,
    setPageLayout,
    useModal,
    useModalIndex,
    useModalStack,
    visitModal,
}
