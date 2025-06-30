<script setup lang="ts">
import { DialogOverlay, DialogPortal, DialogRoot } from 'reka-ui'
import ModalContent from './ModalContent.vue'
import HeadlessModal from './HeadlessModal.vue'
import SlideoverContent from './SlideoverContent.vue'
import { onBeforeMount, onUnmounted, ref } from 'vue'
import type { Ref } from 'vue'
import type { ModalInstance } from './types'

const modal: Ref<ModalInstance | null> = ref(null)
const rendered = ref(false)

defineEmits<{
    'after-leave': []
    blur: []
    close: []
    focus: []
    success: []
}>()

defineExpose({
    afterLeave: () => modal.value?.afterLeave(),
    close: () => modal.value?.close(),
    emit: (event: string, ...args: any[]) => modal.value?.emit(event, ...args),
    getChildModal: () => modal.value?.getChildModal(),
    getParentModal: () => modal.value?.getParentModal(),
    reload: (options?: any) => modal.value?.reload(options),
    setOpen: (open: boolean) => modal.value?.setOpen(open),

    get config() {
        return modal.value?.config
    },
    get id() {
        return modal.value?.id
    },
    get index() {
        return modal.value?.index
    },
    get isOpen() {
        return modal.value?.isOpen
    },
    get modalContext() {
        return modal.value
    },
    get onTopOfStack() {
        return modal.value?.onTopOfStack
    },
    get shouldRender() {
        return modal.value?.shouldRender
    },
})

let observer

onBeforeMount(() => {
    // Workaround for: https://github.com/unovue/reka-ui/issues/1540
    observer = new MutationObserver(() => {
        if (document.body.style.pointerEvents === 'none') {
            document.body.style.pointerEvents = ''
        }
    })

    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] })
})

onUnmounted(() => {
    if (observer) {
        observer.disconnect()
        observer = null
    }
})
</script>

<template>
    <HeadlessModal
        ref="modal"
        v-slot="{
            afterLeave,
            close,
            config,
            emit,
            getChildModal,
            getParentModal,
            id,
            index,
            isOpen,
            modalContext,
            onTopOfStack,
            reload,
            setOpen,
            shouldRender,
        }"
        @success="$emit('success')"
        @close="$emit('close')"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
    >
        <DialogRoot
            :open="isOpen"
            @update:open="setOpen"
        >
            <DialogPortal>
                <div
                    :data-inertiaui-modal-id="id"
                    :data-inertiaui-modal-index="index"
                    class="im-dialog relative z-20"
                    :aria-hidden="!onTopOfStack"
                >
                    <Transition
                        v-if="index?.value === 0 && onTopOfStack?.value"
                        :appear="!rendered"
                        enter-active-class="transition transform ease-in-out duration-300"
                        enter-from-class="opacity-0"
                        enter-to-class="opacity-100"
                        leave-active-class="transition transform ease-in-out duration-300"
                        leave-from-class="opacity-100"
                        leave-to-class="opacity-0"
                        @after-appear="rendered = true"
                    >
                        <DialogOverlay class="im-backdrop fixed inset-0 z-30 bg-black/75" />
                    </Transition>

                    <!-- On multiple modals, only show a backdrop for the modal that is on top of the stack -->
                    <div
                        v-if="(index?.value ?? 0) > 0 && onTopOfStack?.value"
                        class="im-backdrop fixed inset-0 z-30 bg-black/75"
                    />

                    <!-- The modal/slideover content itself -->
                    <component
                        :is="config?.slideover ? SlideoverContent : ModalContent"
                        :modal-context="modalContext"
                        :config="config"
                        @after-leave="$emit('after-leave')"
                    >
                        <slot
                            :id="id"
                            :after-leave="afterLeave"
                            :close="close"
                            :config="config"
                            :emit="emit"
                            :get-child-modal="getChildModal"
                            :get-parent-modal="getParentModal"
                            :index="index"
                            :is-open="isOpen"
                            :modal-context="modalContext"
                            :on-top-of-stack="onTopOfStack"
                            :reload="reload"
                            :set-open="setOpen"
                            :should-render="shouldRender"
                        />
                    </component>
                </div>
            </DialogPortal>
        </DialogRoot>
    </HeadlessModal>
</template>
