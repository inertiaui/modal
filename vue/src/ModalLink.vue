<script setup lang="ts">
import { modalPropNames, useModalStack } from './modalStack'
import { ref, provide, computed, watch, useAttrs, onBeforeUnmount } from 'vue'
import { only, rejectNullValues } from './helpers'
import { getConfig } from './config'
import type { MaxWidth, ModalPosition, ModalInstance, ModalConfig } from './types'
import type { Method, RequestPayload } from '@inertiajs/core'
import type { Ref } from 'vue'

interface ModalLinkProps {
    href: string
    method?: Method
    data?: RequestPayload
    as?: string
    headers?: Record<string, string>
    queryStringArrayFormat?: string
    navigate?: boolean | null
    closeButton?: boolean | null
    closeExplicitly?: boolean | null
    maxWidth?: MaxWidth | null
    paddingClasses?: boolean | string | null
    panelClasses?: boolean | string | null
    position?: ModalPosition | null
    slideover?: boolean | null
}

const props = withDefaults(defineProps<ModalLinkProps>(), {
    method: 'get',
    data: () => ({}),
    as: 'a',
    headers: () => ({}),
    queryStringArrayFormat: 'brackets',
    navigate: null,
    closeButton: null,
    closeExplicitly: null,
    maxWidth: null,
    paddingClasses: null,
    panelClasses: null,
    position: null,
    slideover: null,
})

const loading = ref(false)
const modalStack = useModalStack()
const modalContext: Ref<ModalInstance | null> = ref(null)

provide('modalContext', modalContext)

const emit = defineEmits<{
    'after-leave': []
    blur: []
    close: []
    error: [error: any]
    focus: []
    start: []
    success: []
}>()
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
            rejectNullValues(only(props, modalPropNames)) as ModalConfig,
            onClose,
            onAfterLeave,
            props.queryStringArrayFormat,
            shouldNavigate.value,
        )
        .then((context) => {
            modalContext.value = context as any
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
