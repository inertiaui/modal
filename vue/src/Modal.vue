<script setup>
import { DialogOverlay, DialogPortal, DialogRoot } from 'radix-vue'
import ModalContent from './ModalContent.vue'
import HeadlessModal from './HeadlessModal.vue'
import SlideoverContent from './SlideoverContent.vue'
import { computed, ref, Transition } from 'vue'

const modal = ref(null)
const rendered = ref(false)

defineExpose({
    afterLeave: () => modal.value?.afterLeave(),
    close: () => modal.value?.close(),
    emit: (...args) => modal.value?.emit(...args),
    getChildModal: () => modal.value?.getChildModal(),
    getParentModal: () => modal.value?.getParentModal(),
    id: computed(() => modal.value?.id),
    index: computed(() => modal.value?.index),
    isOpen: computed(() => modal.value?.isOpen),
    modalContext: computed(() => modal.value?.modalContext),
    modalProps: computed(() => modal.value?.modalProps),
    onTopOfStack: computed(() => modal.value?.onTopOfStack),
    reload: (...args) => modal.value?.reload(...args),
    setOpen: (...args) => modal.value?.setOpen(...args),
    shouldRender: computed(() => modal.value?.shouldRender),
})
</script>

<template>
    <HeadlessModal
        ref="modal"
        v-slot="{
            afterLeave,
            close,
            emit,
            getChildModal,
            getParentModal,
            id,
            index,
            isOpen,
            modalContext,
            modalProps,
            onTopOfStack,
            reload,
            setOpen,
            shouldRender,
        }"
    >
        <DialogRoot
            :open="isOpen"
            @update:open="setOpen"
        >
            <DialogPortal>
                <div
                    v-if="shouldRender"
                    :data-inertiaui-modal-id="id"
                    :data-inertiaui-modal-index="index"
                    class="im-dialog relative z-20"
                >
                    <component
                        :is="getChildModal() ? 'div' : Transition"
                        v-if="index === 0"
                        :appear="true"
                        :enter-from-class="rendered ? '' : 'opacity-0'"
                        enter-to-class="opacity-100"
                        leave-from-class="opacity-100"
                        leave-to-class="opacity-0"
                        @after-appear="rendered = true"
                    >
                        <DialogOverlay
                            v-if="onTopOfStack"
                            class="im-backdrop fixed inset-0 z-30 bg-black/75 transition duration-300 ease-in-out"
                        />
                    </component>

                    <!-- On multiple modals, only show a backdrop for the modal that is on top of the stack -->
                    <DialogOverlay
                        v-if="index > 0 && onTopOfStack"
                        class="im-backdrop fixed inset-0 z-30 bg-black/75"
                    />

                    <!-- The modal/slideover content itself -->
                    <component
                        :is="modalProps?.slideover ? SlideoverContent : ModalContent"
                        :modal-context="modalContext"
                        :modal-props="modalProps"
                    >
                        <slot
                            :id="id"
                            :after-leave="afterLeave"
                            :close="close"
                            :emit="emit"
                            :get-child-modal="getChildModal"
                            :get-parent-modal="getParentModal"
                            :index="index"
                            :modal-context="modalContext"
                            :modal-props="modalProps"
                            :on-top-of-stack="onTopOfStack"
                            :is-open="isOpen"
                            :should-render="shouldRender"
                            :reload="reload"
                            :set-open="setOpen"
                        />
                    </component>
                </div>
            </DialogPortal>
        </DialogRoot>
    </HeadlessModal>
</template>
