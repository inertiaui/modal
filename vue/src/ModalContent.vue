<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick, computed } from 'vue'
import CloseButton from './CloseButton.vue'
import { createFocusTrap, onEscapeKey, animate, cancelAnimations } from '@inertiaui/vanilla'
import { getMaxWidthClass } from './constants'

const props = defineProps({
    modalContext: Object,
    config: Object,
    useNativeDialog: Boolean,
    isFirstModal: Boolean,
})

const emit = defineEmits(['after-leave'])

const isRendered = ref(false)
const isVisible = ref(false)  // For backdrop sync
const entered = ref(false)    // After animation completes
const wrapperRef = ref(null)
const dialogRef = ref(null)
const nativeWrapperRef = ref(null)

let cleanupFocusTrap = null
let cleanupEscapeKey = null

const maxWidthClass = computed(() => getMaxWidthClass(props.config.maxWidth))

// ============ Animation handlers using Web Animations API ============

async function animateIn(element) {
    if (!element) return

    isVisible.value = true  // Trigger backdrop immediately

    await animate(element, [
        { transform: 'translate3d(0, 1rem, 0) scale(0.95)', opacity: 0 },
        { transform: 'translate3d(0, 0, 0) scale(1)', opacity: 1 }
    ])

    entered.value = true
    setupFocusTrap()
}

async function animateOut(element) {
    if (!element) return

    isVisible.value = false  // Trigger backdrop fade out immediately

    await animate(element, [
        { transform: 'translate3d(0, 0, 0) scale(1)', opacity: 1 },
        { transform: 'translate3d(0, 1rem, 0) scale(0.95)', opacity: 0 }
    ])

    isRendered.value = false
    if (props.useNativeDialog && dialogRef.value) {
        dialogRef.value.close()
    }
    emit('after-leave')
    props.modalContext.afterLeave()
}

function show() {
    isRendered.value = true
    nextTick(() => {
        const wrapper = props.useNativeDialog ? nativeWrapperRef.value : wrapperRef.value
        animateIn(wrapper)
    })
}

function hide() {
    entered.value = false
    const wrapper = props.useNativeDialog ? nativeWrapperRef.value : wrapperRef.value
    animateOut(wrapper)
}

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
            animateIn(nativeWrapperRef.value)
        })
    }
}

function closeDialog() {
    if (dialogRef.value && dialogRef.value.open) {
        entered.value = false
        animateOut(nativeWrapperRef.value)
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
        if (props.modalContext.isOpen) {
            show()
        }
    }
})

onUnmounted(() => {
    const wrapper = props.useNativeDialog ? nativeWrapperRef.value : wrapperRef.value
    if (wrapper) {
        cancelAnimations(wrapper)
    }
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
        if (props.useNativeDialog) {
            if (isOpen) {
                openDialog()
            } else {
                closeDialog()
            }
        } else {
            if (isOpen) {
                show()
            } else {
                hide()
            }
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
            isVisible ? 'backdrop:opacity-100' : 'backdrop:opacity-0',
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
                    ref="nativeWrapperRef"
                    :class="[
                        'im-modal-wrapper w-full transition-[filter] duration-300',
                        modalContext.onTopOfStack ? '' : 'blur-xs',
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
        v-else-if="isRendered"
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
            <div
                ref="wrapperRef"
                role="dialog"
                aria-modal="true"
                :class="[
                    'im-modal-wrapper w-full transition-[filter] duration-300',
                    modalContext.onTopOfStack ? '' : 'blur-xs',
                    maxWidthClass,
                ]"
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
        </div>
    </div>
</template>
