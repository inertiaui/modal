import { getConfig, putConfig, resetConfig } from './config.js'
import { useModalStack, initFromPageProps, renderApp } from './modalStack.js'
import useModal from './useModal.js'
import Deferred from './Deferred.vue'
import HeadlessModal from './HeadlessModal.vue'
import Modal from './Modal.vue'
import ModalLink from './ModalLink.vue'
import ModalRoot from './ModalRoot.vue'
import WhenVisible from './WhenVisible.vue'
import { router } from '@inertiajs/vue3'
import { prefetch } from './prefetch.js'

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

// Note: For programmatic prefetch usage outside of components,
// you should use the prefetch method from useModalStack() hook within a component.
// This standalone function provides basic prefetch functionality.
function prefetchModal(url, options = {}) {
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
    WhenVisible,
    getConfig,
    initFromPageProps,
    prefetchModal,
    putConfig,
    renderApp,
    resetConfig,
    useModal,
    useModalStack,
    visitModal,
}
