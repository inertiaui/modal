<script setup>
import { inject, onBeforeUnmount, ref, computed, useAttrs, onMounted } from 'vue'
import { TransitionRoot, TransitionChild, Dialog } from '@headlessui/vue'

import { getConfig, getConfigByType } from './config'
import { modalPropNames } from './modalStack'
import { only } from './helpers'
import { useModalStack } from './modalStack'
import ModalContent from './ModalContent.vue'
import ModalRenderer from './ModalRenderer.vue'
import SlideoverContent from './SlideoverContent.vue'

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
    const isSlideover = modalContext.value.modalProps.slideover ?? props.slideover ?? getConfig('type') === 'slideover'

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
    modalStack.verifyRoot()

    if (!props.name) {
        registerEventListeners()
    }
})

function closeDialog() {
    if (!modalProps.value.closeExplicitly) {
        modalContext.value.close()
    }
}

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
    close: modalContext.value.close,
    emit,
    getChildModal: modalContext.value.getChildModal,
    getParentModal: modalContext.value.getParentModal,
    modalContext: modalContext.value,
    reload: modalContext.value.reload,
})
</script>

<template>
    <TransitionRoot
        :unmount="false"
        :show="modalContext.open ?? false"
        enter="transition transform ease-in-out duration-300"
        enter-from="opacity-0 scale-95"
        enter-to="opacity-100 scale-100"
        leave="transition transform ease-in-out duration-300"
        leave-from="opacity-100 scale-100"
        leave-to="opacity-0 scale-95"
    >
        <Dialog
            :data-inertiaui-modal-id="modalContext.id"
            :data-inertiaui-modal-index="modalContext.index"
            class="im-dialog relative z-20"
            @close="closeDialog"
        >
            <!-- Only transition the backdrop for the first modal in the stack -->
            <TransitionChild
                v-if="modalContext.index === 0"
                as="template"
                enter="transition transform ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="transition transform ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div
                    v-show="modalContext.onTopOfStack"
                    class="im-backdrop fixed inset-0 z-30 bg-black/75"
                    aria-hidden="true"
                />
            </TransitionChild>

            <!-- On multiple modals, only show a backdrop for the modal that is on top of the stack -->
            <div
                v-if="modalContext.index > 0 && modalContext.onTopOfStack"
                class="im-backdrop fixed inset-0 z-30 bg-black/75"
            />

            <!-- The modal/slideover content itself -->
            <component
                :is="modalProps.slideover ? SlideoverContent : ModalContent"
                :modal-context="modalContext"
                :modal-props="modalProps"
            >
                <slot
                    :close="modalContext.close"
                    :emit="emit"
                    :get-child-modal="modalContext.getChildModal"
                    :get-parent-modal="modalContext.getParentModal"
                    :modal-context="modalContext"
                    :modal-props="modalProps"
                    :reload="modalContext.reload"
                />
            </component>

            <!-- The next modal in the stack -->
            <ModalRenderer
                v-if="modalStack.stack.value[modalContext.index + 1]"
                :index="modalContext.index + 1"
            />
        </Dialog>
    </TransitionRoot>
</template>
