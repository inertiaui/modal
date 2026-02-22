<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick, computed } from 'vue'
import CloseButton from './CloseButton.vue'
import { createFocusTrap, onEscapeKey } from './dialog'
import { getMaxWidthClass } from './constants'

const props = defineProps({
    modalContext: Object,
    config: Object,
    useNativeDialog: Boolean,
    isFirstModal: Boolean,
})

const emit = defineEmits(['after-leave'])

const entered = ref(false)
const isLeaving = ref(false)
const wrapperRef = ref(null)
const dialogRef = ref(null)

let cleanupFocusTrap = null
let cleanupEscapeKey = null

const maxWidthClass = computed(() => getMaxWidthClass(props.config.maxWidth))

// ============ Non-native dialog handlers ============

function setupFocusTrap() {
    if (props.useNativeDialog) return
    if (!wrapperRef.value || !props.modalContext.onTopOfStack) return
    if (cleanupFocusTrap) return

    cleanupFocusTrap = createFocusTrap(wrapperRef.value, {
        initialFocus: true,
        returnFocus: false,
    })
}

function cleanupFocusTrap_() {
    if (cleanupFocusTrap) {
        cleanupFocusTrap()
        cleanupFocusTrap = null
    }
}

function setupEscapeKey() {
    if (props.useNativeDialog) return
    if (cleanupEscapeKey) return
    if (props.config?.closeExplicitly) return

    cleanupEscapeKey = onEscapeKey(() => {
        if (props.modalContext.onTopOfStack) {
            props.modalContext.close()
        }
    })
}

function cleanupEscapeKey_() {
    if (cleanupEscapeKey) {
        cleanupEscapeKey()
        cleanupEscapeKey = null
    }
}

function handleClickOutside(event) {
    if (props.useNativeDialog) return
    if (!props.modalContext.onTopOfStack) return
    if (props.config?.closeExplicitly) return
    if (props.config?.closeOnClickOutside === false) return
    if (!wrapperRef.value) return

    if (!wrapperRef.value.contains(event.target)) {
        props.modalContext.close()
    }
}

function onAfterEnter() {
    entered.value = true
    setupFocusTrap()
}

function onAfterLeave() {
    emit('after-leave')
    props.modalContext.afterLeave()
}

// ============ Native dialog handlers ============

function handleCancel(event) {
    event.preventDefault()
    if (props.modalContext.onTopOfStack && !props.config?.closeExplicitly) {
        props.modalContext.close()
    }
}

function handleDialogClick(event) {
    if (event.target === dialogRef.value) {
        if (props.modalContext.onTopOfStack && !props.config?.closeExplicitly && props.config?.closeOnClickOutside !== false) {
            props.modalContext.close()
        }
    }
}

function openDialog() {
    if (dialogRef.value && !dialogRef.value.open) {
        dialogRef.value.showModal()
        nextTick(() => {
            requestAnimationFrame(() => {
                entered.value = true
            })
        })
    }
}

function closeDialog() {
    if (dialogRef.value && dialogRef.value.open) {
        isLeaving.value = true
        entered.value = false
        setTimeout(() => {
            if (dialogRef.value) {
                dialogRef.value.close()
            }
            isLeaving.value = false
            emit('after-leave')
            props.modalContext.afterLeave()
        }, 300)
    }
}

// ============ Lifecycle ============

onMounted(() => {
    if (props.useNativeDialog) {
        if (props.modalContext.isOpen) {
            openDialog()
        }
    } else {
        setupEscapeKey()
    }
})

onUnmounted(() => {
    if (props.useNativeDialog) {
        if (dialogRef.value?.open) {
            dialogRef.value.close()
        }
    } else {
        cleanupFocusTrap_()
        cleanupEscapeKey_()
    }
})

watch(
    () => props.modalContext.onTopOfStack,
    (onTop) => {
        if (props.useNativeDialog) return

        if (onTop) {
            setupEscapeKey()
            if (entered.value) {
                setupFocusTrap()
            }
        } else {
            cleanupFocusTrap_()
            cleanupEscapeKey_()
        }
    },
)

watch(
    () => props.modalContext.isOpen,
    (isOpen) => {
        if (!props.useNativeDialog) return

        if (isOpen) {
            openDialog()
        } else if (!isLeaving.value) {
            closeDialog()
        }
    },
)
</script>

<template>
    <!-- Native dialog mode -->
    <dialog
        v-if="useNativeDialog"
        ref="dialogRef"
        :class="[
            'im-modal-dialog m-0 overflow-visible bg-transparent p-0',
            'size-full max-h-none max-w-none',
            'backdrop:bg-black/75 backdrop:transition-opacity backdrop:duration-300',
            entered ? 'backdrop:opacity-100' : 'backdrop:opacity-0',
            !isFirstModal && 'backdrop:bg-transparent',
        ]"
        @cancel="handleCancel"
        @click="handleDialogClick"
    >
        <div class="im-modal-container fixed inset-0 overflow-y-auto p-4">
            <div
                class="im-modal-positioner flex min-h-full justify-center"
                :class="{
                    'items-start': config.position === 'top',
                    'items-center': config.position === 'center',
                    'items-end': config.position === 'bottom',
                }"
            >
                <div
                    :class="[
                        'im-modal-wrapper w-full transition duration-300 ease-in-out',
                        modalContext.onTopOfStack ? '' : 'blur-xs',
                        entered && !isLeaving ? 'translate-y-0 opacity-100 sm:scale-100' : 'translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95',
                        maxWidthClass,
                    ]"
                >
                    <div
                        class="im-modal-content relative"
                        :data-inertiaui-modal-entered="entered"
                        :class="[config.paddingClasses, config.panelClasses]"
                    >
                        <div
                            v-if="config.closeButton"
                            class="absolute right-0 top-0 pr-3 pt-3"
                        >
                            <CloseButton />
                        </div>

                        <slot
                            :modal-context="modalContext"
                            :config="config"
                        />
                    </div>
                </div>
            </div>
        </div>
    </dialog>

    <!-- Non-native dialog mode -->
    <div
        v-else
        class="im-modal-container fixed inset-0 z-40 overflow-y-auto p-4"
        @mousedown.self="handleClickOutside"
    >
        <div
            class="im-modal-positioner flex min-h-full justify-center"
            :class="{
                'items-start': config.position === 'top',
                'items-center': config.position === 'center',
                'items-end': config.position === 'bottom',
            }"
            @mousedown.self="handleClickOutside"
        >
            <Transition
                appear
                enter-active-class="transition duration-300 ease-in-out"
                enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enter-to-class="opacity-100 translate-y-0 sm:scale-100"
                leave-active-class="transition duration-300 ease-in-out"
                leave-from-class="opacity-100 translate-y-0 sm:scale-100"
                leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                @after-enter="onAfterEnter"
                @after-leave="onAfterLeave"
            >
                <div
                    v-if="modalContext.isOpen"
                    ref="wrapperRef"
                    role="dialog"
                    aria-modal="true"
                    :class="['im-modal-wrapper w-full', modalContext.onTopOfStack ? '' : 'blur-xs', maxWidthClass]"
                >
                    <span class="sr-only">Dialog</span>

                    <div
                        class="im-modal-content relative"
                        :data-inertiaui-modal-entered="entered"
                        :class="[config.paddingClasses, config.panelClasses]"
                    >
                        <div
                            v-if="config.closeButton"
                            class="absolute right-0 top-0 pr-3 pt-3"
                        >
                            <CloseButton />
                        </div>

                        <slot
                            :modal-context="modalContext"
                            :config="config"
                        />
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>
