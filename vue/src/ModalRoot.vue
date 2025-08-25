<script setup>
import { onBeforeMount, onMounted, onUnmounted, watch } from 'vue'
import { router, usePage } from '@inertiajs/vue3'
import { useModalStack } from './modalStack'
import ModalRenderer from './ModalRenderer.vue'
import { default as Axios } from 'axios'
import { sameUrlPath } from './helpers'

const modalStack = useModalStack()
const $page = usePage()

let isNavigating = false
let previousModalOnBase = null
let initialModalStillOpened = false

onUnmounted(router.on('start', () => (isNavigating = true)))
onUnmounted(router.on('finish', () => (isNavigating = false)))
onUnmounted(
    router.on('navigate', ($event) => {
        const modalOnBase = $event.detail.page.props._inertiaui_modal

        if (!modalOnBase) {
            previousModalOnBase && modalStack.closeAll()
            modalStack.setBaseUrl(null)
            initialModalStillOpened = false
            return
        }

        previousModalOnBase = modalOnBase
        modalStack.setBaseUrl(modalOnBase.baseUrl)

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
            .then(modalStack.onModalOnBase)
    }),
)

const axiosRequestInterceptor = (config) => {
    // A Modal is opened on top of a base route, so we need to pass this base route
    // so it can redirect back with the back() helper method...
    config.headers['X-InertiaUI-Modal-Base-Url'] = modalStack.getBaseUrl() ?? (initialModalStillOpened ? $page.props._inertiaui_modal?.baseUrl : null)

    return config
}

onBeforeMount(() => Axios.interceptors.request.use(axiosRequestInterceptor))
onMounted(() => (initialModalStillOpened = !!$page.props._inertiaui_modal))
onUnmounted(() => Axios.interceptors.request.eject(axiosRequestInterceptor))

watch(
    () => $page.props?._inertiaui_modal,
    (newModal, previousModal) => {
        if (newModal && previousModal && newModal.component === previousModal.component && sameUrlPath(newModal.url, previousModal.url)) {
            modalStack.stack.value[0]?.updateProps(newModal.props ?? {})
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
