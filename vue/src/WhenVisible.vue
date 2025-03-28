<script setup>
import { ref, onMounted, onUnmounted, inject } from 'vue'

const props = defineProps({
    data: [String, Array],
    params: Object,
    buffer: { type: Number, default: 0 },
    as: { type: String, default: 'div' },
    always: { type: Boolean, default: false },
})

const modalContext = inject('modalContext')

if (!modalContext) {
    throw new Error('Deferred component must be used inside a Modal component')
}

const loaded = ref(false)
const fetching = ref(false)
const rootElement = ref(null)
let observer = null

const getReloadParams = () => {
    if (props.data) {
        return { only: Array.isArray(props.data) ? props.data : [props.data] }
    }

    if (!props.params) {
        throw new Error('You must provide either a `data` or `params` prop.')
    }

    return props.params
}

const observeElement = () => {
    if (!rootElement.value) {
        return
    }

    observer = new IntersectionObserver(
        (entries) => {
            if (!entries[0].isIntersecting) {
                return
            }

            if (!props.always) {
                observer.disconnect()
            }

            if (fetching.value) {
                return
            }

            fetching.value = true
            const reloadParams = getReloadParams()

            modalContext.value.reload({
                ...reloadParams,
                onStart: () => {
                    fetching.value = true
                    reloadParams.onStart?.()
                },
                onFinish: () => {
                    loaded.value = true
                    fetching.value = false
                    reloadParams.onFinish?.()
                },
            })
        },
        { rootMargin: `${props.buffer}px` },
    )

    observer.observe(rootElement.value)
}

onMounted(observeElement)
onUnmounted(() => observer?.disconnect())
</script>

<template>
    <component
        :is="props.as"
        ref="rootElement"
    >
        <slot v-if="loaded"></slot>
        <slot
            v-else
            name="fallback"
        ></slot>
    </component>
</template>
