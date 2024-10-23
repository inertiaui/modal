<script setup>
import CloseButton from './CloseButton.vue'
import { DialogContent, DialogTitle, VisuallyHidden } from 'radix-vue'

defineProps({
    modalContext: Object,
    modalProps: Object,
})
</script>

<template>
    <!-- Full-screen scrollable container -->
    <div class="im-modal-container fixed inset-0 z-40 overflow-y-auto p-4">
        <!-- Container to center the panel -->
        <div
            class="im-modal-positioner flex min-h-full justify-center"
            :class="{
                'items-start': modalProps.position === 'top',
                'items-center': modalProps.position === 'center',
                'items-end': modalProps.position === 'bottom',
            }"
        >
            <Transition
                appear
                enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enter-to-class="opacity-100 translate-y-0 sm:scale-100"
                leave-from-class="opacity-100 translate-y-0 sm:scale-100"
                leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                @after-leave="modalContext.afterLeave"
            >
                <DialogContent
                    :aria-describedby="undefined"
                    :trap-focus="modalProps?.closeExplicitly"
                    :class="{
                        'im-modal-wrapper w-full transition duration-300 ease-in-out': true,
                        'blur-sm': !modalContext.onTopOfStack,
                        'sm:max-w-sm': modalProps.maxWidth == 'sm',
                        'sm:max-w-md': modalProps.maxWidth == 'md',
                        'sm:max-w-md md:max-w-lg': modalProps.maxWidth == 'lg',
                        'sm:max-w-md md:max-w-xl': modalProps.maxWidth == 'xl',
                        'sm:max-w-md md:max-w-xl lg:max-w-2xl': modalProps.maxWidth == '2xl',
                        'sm:max-w-md md:max-w-xl lg:max-w-3xl': modalProps.maxWidth == '3xl',
                        'sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl': modalProps.maxWidth == '4xl',
                        'sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl': modalProps.maxWidth == '5xl',
                        'sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl': modalProps.maxWidth == '6xl',
                        'sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl': modalProps.maxWidth == '7xl',
                    }"
                >
                    <VisuallyHidden as-child>
                        <DialogTitle />
                    </VisuallyHidden>

                    <div
                        class="im-modal-content relative"
                        :class="[modalProps.paddingClasses, modalProps.panelClasses]"
                    >
                        <div
                            v-if="modalProps.closeButton"
                            class="absolute right-0 top-0 pr-3 pt-3"
                        >
                            <CloseButton />
                        </div>

                        <slot
                            :modal-context="modalContext"
                            :modal-props="modalProps"
                        />
                    </div>
                </DialogContent>
            </Transition>
        </div>
    </div>
</template>
