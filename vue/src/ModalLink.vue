<script setup>
import { modalPropNames, useModalStack, prefetch as prefetchModal } from './modalStack'
import { ref, provide, computed, watch, useAttrs, onBeforeUnmount, onMounted } from 'vue'
import { only, rejectNullValues } from './helpers'
import { getConfig } from './config'

const props = defineProps({
    href: {
        type: String,
        required: true,
    },
    method: {
        type: String,
        default: 'get',
    },
    data: {
        type: Object,
        default: () => ({}),
    },
    as: {
        type: [String, Object],
        default: 'a',
    },
    headers: {
        type: Object,
        default: () => ({}),
    },
    queryStringArrayFormat: {
        type: String,
        default: 'brackets',
    },
    navigate: {
        type: Boolean,
        default: null,
    },
    // Prefetch options (#146)
    prefetch: {
        type: [Boolean, String, Array],
        default: false,
    },
    cacheFor: {
        type: Number,
        default: 30000,
    },
    // Passthrough to Modal.vue
    closeButton: {
        type: Boolean,
        required: false,
        default: null,
    },
    closeExplicitly: {
        type: Boolean,
        required: false,
        default: null,
    },
    closeOnClickOutside: {
        type: Boolean,
        required: false,
        default: null,
    },
    maxWidth: {
        type: String,
        required: false,
        default: null,
    },
    paddingClasses: {
        type: [Boolean, String],
        required: false,
        default: null,
    },
    panelClasses: {
        type: [Boolean, String],
        required: false,
        default: null,
    },
    position: {
        type: String,
        required: false,
        default: null,
    },
    slideover: {
        type: Boolean,
        required: false,
        default: null,
    },
})

const loading = ref(false)
const modalStack = useModalStack()
const modalContext = ref(null)

provide('modalContext', modalContext)

const emit = defineEmits(['after-leave', 'blur', 'close', 'error', 'focus', 'start', 'success', 'prefetching', 'prefetched'])
const isBlurred = ref(false)

const shouldNavigate = computed(() => {
    return props.navigate ?? getConfig('navigate')
})

// Prefetch logic (#146)
const hoverTimeout = ref(null)

const prefetchModes = computed(() => {
    if (props.prefetch === true) {
        return ['hover']
    }
    if (props.prefetch === false) {
        return []
    }
    if (Array.isArray(props.prefetch)) {
        return props.prefetch
    }
    return [props.prefetch]
})

function doPrefetch() {
    prefetchModal(props.href, {
        method: props.method,
        data: props.data,
        headers: props.headers,
        queryStringArrayFormat: props.queryStringArrayFormat,
        cacheFor: props.cacheFor,
        onPrefetching: () => emit('prefetching'),
        onPrefetched: () => emit('prefetched'),
    })
}

function onMouseenter() {
    if (!prefetchModes.value.includes('hover')) return

    hoverTimeout.value = setTimeout(() => {
        doPrefetch()
    }, 75) // Small delay to avoid prefetching on accidental hovers
}

function onMouseleave() {
    if (hoverTimeout.value) {
        clearTimeout(hoverTimeout.value)
        hoverTimeout.value = null
    }
}

function onMousedown(event) {
    if (!prefetchModes.value.includes('click')) return
    if (event.button !== 0) return // Only left click

    doPrefetch()
}

onMounted(() => {
    if (prefetchModes.value.includes('mount')) {
        doPrefetch()
    }
})

watch(
    () => modalContext.value?.onTopOfStack,
    (onTopOfStack) => {
        if (modalContext.value) {
            if (onTopOfStack && isBlurred.value) {
                emit('focus')
            } else if (!onTopOfStack) {
                emit('blur')
            }

            isBlurred.value = !onTopOfStack
        }
    },
)

const unsubscribeEventListeners = ref(null)

onBeforeUnmount(() => {
    unsubscribeEventListeners.value?.()
    if (hoverTimeout.value) {
        clearTimeout(hoverTimeout.value)
    }
})

const $attrs = useAttrs()

function registerEventListeners() {
    unsubscribeEventListeners.value = modalContext.value.registerEventListenersFromAttrs($attrs)
}

watch(modalContext, (value, oldValue) => {
    if (value && !oldValue) {
        registerEventListeners()
        emit('success')
    }
})

function onClose() {
    emit('close')
}

function onAfterLeave() {
    modalContext.value = null
    emit('after-leave')
}

function handle() {
    if (loading.value) {
        return
    }

    if (!props.href.startsWith('#')) {
        loading.value = true
        emit('start')
    }

    modalStack
        .visit(
            props.href,
            props.method,
            props.data,
            props.headers,
            rejectNullValues(only(props, modalPropNames)),
            onClose,
            onAfterLeave,
            props.queryStringArrayFormat,
            shouldNavigate.value,
        )
        .then((context) => {
            modalContext.value = context
        })
        .catch((error) => {
            console.error(error)
            emit('error', error)
        })
        .finally(() => (loading.value = false))
}
</script>

<template>
    <component
        v-bind="$attrs"
        :is="as"
        :href="href"
        @click.prevent="handle"
        @mouseenter="onMouseenter"
        @mouseleave="onMouseleave"
        @mousedown="onMousedown"
    >
        <slot :loading="loading" />
    </component>
</template>
