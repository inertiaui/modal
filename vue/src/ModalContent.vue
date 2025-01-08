<script setup>
import { onBeforeUnmount, ref } from 'vue'
import CloseButton from './CloseButton.vue'
import { useFocusTrap } from './useFocusTrap'

const props = defineProps({
    modalContext: Object,
    config: Object,
})

const entered = ref(false)
const wrapper = ref(null)
let deactivate = null

function afterEnter() {
    let { deactivate } = useFocusTrap(wrapper.value, props.config?.closeExplicitly, () => props.modalContext.close())
    entered.value = true
}

onBeforeUnmount(() => deactivate?.())
</script>

<template>
    <!-- Full-screen scrollable container -->
    <div class="im-modal-container fixed inset-0 z-40 overflow-y-auto p-4">
        <!-- Container to center the panel -->
        <div
            class="im-modal-positioner flex min-h-full justify-center"
            :class="{
                'items-start': config.position === 'top',
                'items-center': config.position === 'center',
                'items-end': config.position === 'bottom',
            }"
        >
            <Transition
                appear
                enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enter-to-class="opacity-100 translate-y-0 sm:scale-100"
                leave-from-class="opacity-100 translate-y-0 sm:scale-100"
                leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                @after-enter="afterEnter"
                @after-leave="modalContext.afterLeave"
            >
                <div
                    v-show="modalContext.isOpen"
                    ref="wrapper"
                    :class="{
                        'im-modal-wrapper pointer-events-auto w-full transition duration-300 ease-in-out': true,
                        'blur-sm': !modalContext.onTopOfStack,
                        'sm:max-w-sm': config.maxWidth == 'sm',
                        'sm:max-w-md': config.maxWidth == 'md',
                        'sm:max-w-md md:max-w-lg': config.maxWidth == 'lg',
                        'sm:max-w-md md:max-w-xl': config.maxWidth == 'xl',
                        'sm:max-w-md md:max-w-xl lg:max-w-2xl': config.maxWidth == '2xl',
                        'sm:max-w-md md:max-w-xl lg:max-w-3xl': config.maxWidth == '3xl',
                        'sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl': config.maxWidth == '4xl',
                        'sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl': config.maxWidth == '5xl',
                        'sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl': config.maxWidth == '6xl',
                        'sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl': config.maxWidth == '7xl',
                    }"
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
                            <CloseButton @click="modalContext.close" />
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
