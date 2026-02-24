<script setup>
import { onMounted, onUnmounted, watch } from 'vue'
import { router, usePage } from '@inertiajs/vue3'
import { useModalStack } from './modalStack'
import ModalRenderer from './ModalRenderer.vue'
import { default as Axios } from 'axios'
import { sameUrlPath } from './helpers'

const modalStack = useModalStack()
const $page = usePage()

let isNavigating = false
let initialModalStillOpened = false
const pendingModalKeys = new Set()

// Generate a unique key for deduplication (handles case when modal has no id)
const getModalKey = (modalData) => modalData.id || `${modalData.component}:${modalData.url}`

onUnmounted(router.on('start', () => (isNavigating = true)))
onUnmounted(router.on('finish', () => (isNavigating = false)))
onUnmounted(
    router.on('navigate', ($event) => {
        const modalOnBase = $event.detail.page.props._inertiaui_modal
        const pageUrl = $event.detail.page.url

        // If we're closing to this specific URL, don't re-open the modal
        // This handles the race condition where router.push in afterLeave
        // fires a navigate event before the props callback clears _inertiaui_modal
        // Only suppresses when navigating to our closing target URL (not browser back to modal)
        if (modalStack.isClosingToBaseUrl(pageUrl)) {
            modalStack.clearClosingToBaseUrl()
            modalStack.closeAll(true)
            modalStack.setBaseUrl(null)
            initialModalStillOpened = false
            return
        }

        if (!modalOnBase) {
            // No modal data - close any open modals (force close without transition)
            modalStack.closeAll(true)
            modalStack.setBaseUrl(null)
            initialModalStillOpened = false
            return
        }

        // If the page URL doesn't match the modal URL, close all modals
        // (handles browser back to non-modal URL when history state still has modal data)
        if (!sameUrlPath(pageUrl, modalOnBase.url)) {
            modalStack.closeAll(true)
            modalStack.setBaseUrl(null)
            initialModalStillOpened = false
            return
        }

        // Skip if this modal is already being pushed (handles duplicate navigate events)
        const modalKey = getModalKey(modalOnBase)
        if (pendingModalKeys.has(modalKey)) {
            return
        }

        // Also skip if a modal with this id is already in the stack
        if (modalOnBase.id && modalStack.stack.value.some((m) => m.id === modalOnBase.id)) {
            return
        }

        // Skip if a modal with the same component and URL is already open
        // (handles "Edit again!" case where same modal is revisited with new props)
        if (modalStack.stack.value.some((m) => m.response?.component === modalOnBase.component && sameUrlPath(m.response?.url, modalOnBase.url))) {
            return
        }

        // Only set baseUrl when we're actually opening a new modal
        // (after deduplication checks pass)
        modalStack.setBaseUrl(modalOnBase.baseUrl)
        pendingModalKeys.add(modalKey)

        modalStack
            .pushFromResponseData(modalOnBase, {}, () => {
                if (!modalOnBase.baseUrl) {
                    console.error('No base url in modal response data so cannot navigate back')
                    return
                }

                if (!isNavigating && typeof window !== 'undefined' && window.location.href !== modalOnBase.baseUrl) {
                    router.visit(modalOnBase.baseUrl, {
                        preserveScroll: true,
                        preserveState: true,
                    })
                }
            })
            .then(() => {
                pendingModalKeys.delete(modalKey)
            })
    }),
)

const axiosRequestInterceptor = (config) => {
    // A Modal is opened on top of a base route, so we need to pass this base route
    // so it can redirect back with the back() helper method...
    // Only send the header when we have an actual base URL value
    // Check modalStack first, then fall back to page props if a modal is still open from initial load
    const baseUrlValue = modalStack.getBaseUrl() ?? $page.props?._inertiaui_modal?.baseUrl ?? null
    if (baseUrlValue) {
        config.headers['X-InertiaUI-Modal-Base-Url'] = baseUrlValue
    }

    return config
}

let axiosInterceptorId = null
onMounted(() => (axiosInterceptorId = Axios.interceptors.request.use(axiosRequestInterceptor)))
onUnmounted(() => axiosInterceptorId !== null && Axios.interceptors.request.eject(axiosInterceptorId))

watch(
    () => $page.props?._inertiaui_modal,
    (newModal, previousModal) => {
        if (!newModal) {
            return
        }

        // If there's a previous modal with same component/URL, update its props
        if (previousModal && newModal.component === previousModal.component && sameUrlPath(newModal.url, previousModal.url)) {
            modalStack.stack.value[0]?.updateProps(newModal.props ?? {})
            return
        }

        // If there's no previous modal but we have modals in the stack (opened via XHR),
        // check if the new modal matches any open modal and update its props
        if (!previousModal && modalStack.stack.value.length > 0) {
            const existingModal = modalStack.stack.value.find(
                (m) => m.response?.component === newModal.component && sameUrlPath(m.response?.url, newModal.url),
            )
            if (existingModal) {
                existingModal.updateProps(newModal.props ?? {})
            }
        }
    },
)
</script>

<template>
    <slot />

    <ModalRenderer
        v-if="modalStack.stack.value.length"
        :index="0"
    />
</template>
