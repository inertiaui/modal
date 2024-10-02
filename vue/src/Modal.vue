<script setup>
import { inject, onBeforeUnmount, ref, provide } from 'vue'
import ModalContent from './ModalContent.vue'
import ModalResolver from './ModalWrapper.vue'
import ModalWrapper from './ModalWrapper.vue'
import SlideoverContent from './SlideoverContent.vue'
import { useModalStack } from './modalStack'

const props = defineProps({
    name: {
        type: String,
        required: false,
    },
})

const modalStack = useModalStack()
const injectedModalContext = props.name ? ref({}) : inject('modalContext')

if (props.name) {
    modalStack.registerLocalModal(props.name, function (context) {
        injectedModalContext.value = context
    })

    // Now this component is the provider instead of ModalLink
    provide('modalContext', injectedModalContext)

    onBeforeUnmount(() => {
        modalStack.removeLocalModal(props.name)
    })
}

const emits = defineEmits(['emit'])

function emit(event, ...args) {
    emits('emit', event, ...args)
}

defineExpose({
    close: injectedModalContext.value.close,
    emit,
    getChildModal: injectedModalContext.value.getChildModal,
    getParentModal: injectedModalContext.value.getParentModal,
    modalContext: injectedModalContext.value,
    reload: injectedModalContext.value.reload,
})
</script>

<template>
    <ModalWrapper v-slot="{ modalContext, modalProps }">
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
        <ModalResolver
            v-if="modalStack.stack.value[modalContext.index + 1]"
            :index="modalContext.index + 1"
        />
    </ModalWrapper>
</template>
