<script setup>
import { onBeforeMount, onUnmounted, ref } from 'vue'
import { router } from '@inertiajs/vue3'
import { useModalStack } from './modalStack'
import ModalRenderer from './ModalRenderer.vue'
import { default as Axios } from 'axios'

const modalStack = useModalStack()

const isNavigating = ref(false)
const previousModalOnBase = ref(null)

onUnmounted(router.on('start', () => (isNavigating.value = true)))
onUnmounted(router.on('finish', () => (isNavigating.value = false)))
onUnmounted(
    router.on('navigate', ($event) => {
        const modalOnBase = $event.detail.page.props._inertiaui_modal

        if (!modalOnBase) {
            previousModalOnBase.value && modalStack.closeAll()
            return
        }

        previousModalOnBase.value = modalOnBase
        modalStack.setBaseUrl(modalOnBase.baseUrl)

        modalStack.pushFromResponseData(modalOnBase, {}, () => {
            if (!modalOnBase.baseUrl) {
                console.error('No base url in modal response data so cannot navigate back')
                return
            }

            if (!isNavigating.value && window.location.href !== modalOnBase.baseUrl) {
                router.visit(modalOnBase.baseUrl, {
                    preserveScroll: true,
                    preserveState: true,
                })
            }
        })
    }),
)

const axiosRequestInterceptor = (config) => {
    // A Modal is opened on top of a base route, so we need to pass this base route
    // so it can redirect back with the back() helper method...
    config.headers['X-InertiaUI-Modal-Base-Url'] = modalStack.getBaseUrl()

    return config
}

onBeforeMount(() => {
    Axios.interceptors.request.use(axiosRequestInterceptor)
})

onUnmounted(() => {
    Axios.interceptors.request.eject(axiosRequestInterceptor)
})
</script>

<template>
    <slot />

    <ModalRenderer
        v-if="modalStack.stack.value.length"
        :index="0"
    />
</template>
