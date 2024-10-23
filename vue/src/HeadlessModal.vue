<script setup>
import { getConfig, getConfigByType } from './config'
import { inject, onBeforeUnmount, ref, computed, useAttrs, onMounted } from 'vue'
import { useModalStack } from './modalStack'
import ModalRenderer from './ModalRenderer.vue'

const props = defineProps({
    name: {
        type: String,
        required: false,
    },
    // The slideover prop in on top because we need to know if it's a slideover
    // before we can determine the defaule value of other props
    slideover: {
        type: Boolean,
        default: null,
    },
    closeButton: {
        type: Boolean,
        default: null,
    },
    closeExplicitly: {
        type: Boolean,
        default: null,
    },
    maxWidth: {
        type: String,
        default: null,
    },
    paddingClasses: {
        type: [Boolean, String],
        default: null,
    },
    panelClasses: {
        type: [Boolean, String],
        default: null,
    },
    position: {
        type: String,
        default: null,
    },
})

const modalStack = useModalStack()
const modalContext = props.name ? ref({}) : inject('modalContext')
const modalProps = computed(() => {
    const isSlideover = modalContext.value.modalProps?.slideover ?? props.slideover ?? getConfig('type') === 'slideover'

    return {
        slideover: isSlideover,
        closeButton: props.closeButton ?? getConfigByType(isSlideover, 'closeButton'),
        closeExplicitly: props.closeExplicitly ?? getConfigByType(isSlideover, 'closeExplicitly'),
        maxWidth: props.maxWidth ?? getConfigByType(isSlideover, 'maxWidth'),
        paddingClasses: props.paddingClasses ?? getConfigByType(isSlideover, 'paddingClasses'),
        panelClasses: props.panelClasses ?? getConfigByType(isSlideover, 'panelClasses'),
        position: props.position ?? getConfigByType(isSlideover, 'position'),
        ...modalContext.value.modalProps,
    }
})

// Local Modals...
if (props.name) {
    modalStack.registerLocalModal(props.name, function (context) {
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
    unsubscribeEventListeners.value = modalContext.value.registerEventListenersFromAttrs($attrs)
}

const emits = defineEmits(['modal-event'])

function emit(event, ...args) {
    emits('modal-event', event, ...args)
}

defineExpose({
    afterLeave: modalContext.value.afterLeave,
    close: modalContext.value.close,
    emit,
    getChildModal: modalContext.value.getChildModal,
    getParentModal: modalContext.value.getParentModal,
    id: modalContext.value.id,
    index: modalContext.value.index,
    isOpen: modalContext.value.isOpen,
    modalContext: modalContext.value,
    modalProps: modalProps.value,
    onTopOfStack: modalContext.value.onTopOfStack,
    reload: modalContext.value.reload,
    setOpen: modalContext.value.setOpen,
    shouldRender: modalContext.value.shouldRender,
})

const nextIndex = computed(() => {
    return modalStack.stack.value.find((m) => m.shouldRender && m.index > modalContext.value.index)?.index
})

defineOptions({
    inheritAttrs: false,
})
</script>

<template>
    <slot
        :id="modalContext.id"
        :after-leave="modalContext.afterLeave"
        :close="modalContext.close"
        :emit="emit"
        :get-child-modal="modalContext.getChildModal"
        :get-parent-modal="modalContext.getParentModal"
        :index="modalContext.index"
        :is-open="modalContext.isOpen"
        :modal-context="modalContext"
        :modal-props="modalProps"
        :on-top-of-stack="modalContext.onTopOfStack"
        :reload="modalContext.reload"
        :set-open="modalContext.setOpen"
        :should-render="modalContext.shouldRender"
    />

    <!-- The next modal in the stack -->
    <ModalRenderer
        v-if="nextIndex"
        :index="nextIndex"
    />
</template>
