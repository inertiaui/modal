<script setup lang="ts">
import { getConfig, getConfigByType } from './config'
import { inject, onBeforeUnmount, ref, computed, useAttrs, onMounted, watch } from 'vue'
import { useModalStack } from './modalStack'
import ModalRenderer from './ModalRenderer.vue'
import type { MaxWidth, ModalPosition, ModalInstance } from './types'
import type { Ref } from 'vue'

interface HeadlessModalProps {
    name?: string
    slideover?: boolean | null
    closeButton?: boolean | null
    closeExplicitly?: boolean | null
    maxWidth?: MaxWidth | null
    paddingClasses?: boolean | string | null
    panelClasses?: boolean | string | null
    position?: ModalPosition | null
}

const props = withDefaults(defineProps<HeadlessModalProps>(), {
    name: undefined,
    slideover: null,
    closeButton: null,
    closeExplicitly: null,
    maxWidth: null,
    paddingClasses: null,
    panelClasses: null,
    position: null,
})

const modalStack = useModalStack()
const modalContext: Ref<ModalInstance | null> = props.name ? ref(null) : inject('modalContext')
const config = computed(() => {
    const isSlideover = modalContext.value?.config?.slideover ?? props.slideover ?? getConfig('type') === 'slideover'

    return {
        slideover: isSlideover,
        closeButton: props.closeButton ?? getConfigByType(isSlideover, 'closeButton'),
        closeExplicitly: props.closeExplicitly ?? getConfigByType(isSlideover, 'closeExplicitly'),
        maxWidth: props.maxWidth ?? getConfigByType(isSlideover, 'maxWidth'),
        paddingClasses: props.paddingClasses ?? getConfigByType(isSlideover, 'paddingClasses'),
        panelClasses: props.panelClasses ?? getConfigByType(isSlideover, 'panelClasses'),
        position: props.position ?? getConfigByType(isSlideover, 'position'),
        ...modalContext.value?.config,
    }
})

// Local Modals...
if (props.name) {
    modalStack.registerLocalModal(props.name, function (context: any) {
        modalContext.value = context
        registerEventListeners()
    })

    onBeforeUnmount(() => {
        modalStack.removeLocalModal(props.name)
    })
}

onMounted(() => {
    if (!props.name) {
        registerEventListeners()
    }
})

const unsubscribeEventListeners = ref(null)
onBeforeUnmount(() => unsubscribeEventListeners.value?.())

const $attrs = useAttrs()

function registerEventListeners() {
    unsubscribeEventListeners.value = modalContext.value?.registerEventListenersFromAttrs($attrs)
}

const emits = defineEmits<{
    'modal-event': [event: string, ...args: any[]]
    focus: []
    blur: []
    close: []
    success: []
}>()

function emit(event: string, ...args: any[]) {
    emits('modal-event', event, ...args)
}

defineExpose({
    emit,
    afterLeave: () => modalContext.value?.afterLeave(),
    close: () => modalContext.value?.close(),
    reload: (options?: any) => modalContext.value?.reload(options),
    setOpen: (open: boolean) => modalContext.value?.setOpen(open),
    getChildModal: () => modalContext.value?.getChildModal(),
    getParentModal: () => modalContext.value?.getParentModal(),

    get config() {
        return modalContext.value?.config
    },
    get id() {
        return modalContext.value?.id
    },
    get index() {
        return modalContext.value?.index
    },
    get isOpen() {
        return modalContext.value?.isOpen
    },
    get modalContext() {
        return modalContext.value
    },
    get onTopOfStack() {
        return modalContext.value?.onTopOfStack
    },
    get shouldRender() {
        return modalContext.value?.shouldRender
    },
})

watch(
    () => modalContext.value?.onTopOfStack,
    (onTopOfStack, previousOnTopOfStack) => {
        if (onTopOfStack && !previousOnTopOfStack) {
            emits('focus')
        } else if (!onTopOfStack && previousOnTopOfStack) {
            emits('blur')
        }
    },
)

watch(
    () => modalContext.value?.isOpen,
    (isOpen) => {
        isOpen ? emits('success') : emits('close')
    },
    { immediate: true },
)

const nextIndex = computed(() => {
    return modalStack.stack.value.find((m) => m.shouldRender && m.index > modalContext.value?.index)?.index
})

defineOptions({
    inheritAttrs: false,
})
</script>

<template>
    <slot
        v-if="modalContext?.shouldRender"
        :id="modalContext?.id"
        :after-leave="modalContext?.afterLeave"
        :close="modalContext?.close"
        :config="config"
        :emit="emit"
        :get-child-modal="modalContext?.getChildModal"
        :get-parent-modal="modalContext?.getParentModal"
        :index="modalContext.index"
        :is-open="modalContext?.isOpen"
        :modal-context="modalContext"
        :on-top-of-stack="modalContext.onTopOfStack"
        :reload="modalContext?.reload"
        :set-open="modalContext?.setOpen"
        :should-render="modalContext?.shouldRender"
    />

    <!-- The next modal in the stack -->
    <ModalRenderer
        v-if="nextIndex"
        :index="nextIndex"
    />
</template>
