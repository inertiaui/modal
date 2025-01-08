<script setup>
import { modalPropNames, useModalStack } from './modalStack'
import { ref, provide, computed, watch, useAttrs, onBeforeUnmount } from 'vue'
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

provide('modalContext', modalContext)

const emit = defineEmits(['after-leave', 'blur', 'close', 'error', 'focus', 'start', 'success'])
const isBlurred = ref(false)

const shouldNavigate = computed(() => {
    return props.navigate ?? getConfig('navigate')
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
</script>

<template>
    <component
        v-bind="$attrs"
        :is="as"
        :href="href"
        @click.prevent="handle"
    >
        <slot :loading="loading" />
    </component>
</template>
