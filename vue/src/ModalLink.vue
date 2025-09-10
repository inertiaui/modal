<script setup>
import { modalPropNames, useModalStack } from './modalStack'
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
        type: String,
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
    prefetch: {
        type: [Boolean, String, Array],
        default: false,
    },
    cacheFor: {
        type: [Number, String],
        default: 30000,
    },
    cacheTags: {
        type: [String, Array],
        default: () => [],
    },
    onPrefetching: {
        type: Function,
        default: () => {},
    },
    onPrefetched: {
        type: Function,
        default: () => {},
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
const hoverTimeout = ref(null)

provide('modalContext', modalContext)

const emit = defineEmits(['after-leave', 'blur', 'close', 'error', 'focus', 'start', 'success'])
const isBlurred = ref(false)

const shouldNavigate = computed(() => {
    return props.navigate ?? getConfig('navigate')
})

const prefetchModes = computed(() => {
    if (props.prefetch === false) {
        return []
    }

    if (props.prefetch === true) {
        return ['hover']
    }

    if (typeof props.prefetch === 'string') {
        return [props.prefetch]
    }

    return Array.isArray(props.prefetch) ? props.prefetch : [props.prefetch]
})

const cacheForValue = computed(() => {
    if (props.cacheFor !== 30000) {
        return props.cacheFor
    }

    if (prefetchModes.value.length === 1 && prefetchModes.value[0] === 'click') {
        return 0
    }

    return 30000
})

const prefetch = () => {
    modalStack.prefetch(
        props.href,
        props.method,
        props.data,
        props.headers,
        props.queryStringArrayFormat,
        shouldNavigate.value,
        cacheForValue.value,
        Array.isArray(props.cacheTags) ? props.cacheTags : [props.cacheTags].filter(Boolean),
        props.onPrefetching,
        props.onPrefetched,
    )
}

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
    clearTimeout(hoverTimeout.value)
})

onMounted(() => {
    if (prefetchModes.value.includes('mount')) {
        setTimeout(() => prefetch())
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
        .catch((error) => emit('error', error))
        .finally(() => (loading.value = false))
}

const regularEvents = computed(() => ({
    click: handle,
}))

const prefetchHoverEvents = computed(() => ({
    mouseenter: () => {
        hoverTimeout.value = setTimeout(() => {
            prefetch()
        }, 75)
    },
    mouseleave: () => {
        clearTimeout(hoverTimeout.value)
    },
    click: handle,
}))

const prefetchClickEvents = computed(() => ({
    mousedown: (event) => {
        if (event.button === 0) {
            // left click only
            event.preventDefault()
            prefetch()
        }
    },
    keydown: (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            prefetch()
        }
    },
    mouseup: (event) => {
        if (event.button === 0) {
            // left click only
            event.preventDefault()
            handle()
        }
    },
    keyup: (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            handle()
        }
    },
}))

const eventHandlers = computed(() => {
    if (prefetchModes.value.includes('hover')) {
        return prefetchHoverEvents.value
    }

    if (prefetchModes.value.includes('click')) {
        return prefetchClickEvents.value
    }

    return regularEvents.value
})
</script>

<template>
    <component
        v-bind="$attrs"
        :is="as"
        :href="href"
        v-on="eventHandlers"
    >
        <slot :loading="loading" />
    </component>
</template>
