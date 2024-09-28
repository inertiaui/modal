<script setup>
import { modalPropNames, useModalStack } from './modalStack'
import { nextTick, ref, provide, watch, onMounted, useAttrs } from 'vue'
import { only, rejectNullValues } from './helpers'

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
    fragment: {
        type: String,
        default: null,
    },
    headers: {
        type: Object,
        default: () => ({}),
    },
    queryStringArrayFormat: {
        type: String,
        default: 'brackets',
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

watch(
    () => modalContext.value?.isOnTopOfStack(),
    (isOnTopOfStack) => {
        if (modalContext.value) {
            if (isOnTopOfStack && isBlurred.value) {
                emit('focus')
            } else if (!isOnTopOfStack) {
                emit('blur')
            }

            isBlurred.value = !isOnTopOfStack
        }
    },
)

onMounted(() => {
    if (props.fragment && window.location.hash === `#${props.fragment}`) {
        handle()
    }
})

const $attrs = useAttrs()

function handleEmittedEvent(event, ...args) {
    // // e.g. refresh-key -> onRefreshKey
    const kebabEvent = event.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
    const listener = `on${kebabEvent.charAt(0).toUpperCase()}${kebabEvent.slice(1)}`
    if (listener in $attrs) {
        $attrs[listener](...args)
    }
}

watch(modalContext, (value, oldValue) => {
    if (value && !oldValue) {
        if (props.fragment && modalContext.value.index === 0) {
            window.location.hash = props.fragment
        }

        nextTick(() => {
            modalContext.value.open = true
            emit('success')
        })
    }
})

function onClose() {
    if (props.fragment && modalContext.value.index === 0) {
        window.location.hash = ''
    }
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

    const modalProps = rejectNullValues(only(props, modalPropNames))

    if (props.href.startsWith('#')) {
        modalContext.value = modalStack.callLocalModal(props.href.substring(1), modalProps, onClose, onAfterLeave)
        return
    }

    loading.value = true
    emit('start')

    modalStack
        .visit(props.href, props.method, props.data, props.headers, modalProps, onClose, onAfterLeave, props.queryStringArrayFormat)
        .then((context) => {
            modalContext.value = context
        })
        .catch((error) => {
            emit('error', error)
        })
        .finally(() => {
            loading.value = false
        })
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

    <modalContext.component
        v-if="modalContext?.component"
        v-show="false"
        v-bind="modalContext.componentProps"
        @emit="handleEmittedEvent"
    />
</template>
