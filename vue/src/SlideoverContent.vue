<script setup>
import CloseButton from './CloseButton.vue'

defineProps({
    modalContext: Object,
    modalProps: Object,
})
</script>

<template>
    <!-- Full-screen scrollable container -->
    <div class="im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden">
        <!-- Container to center the panel -->
        <div
            class="im-slideover-positioner flex min-h-full items-center"
            :class="{
                'justify-start': modalProps.position === 'left',
                'justify-end': modalProps.position === 'right',
            }"
        >
            <Transition
                :enter-from-class="'opacity-0 ' + (modalProps.position === 'left' ? '-translate-x-full' : 'translate-x-full')"
                enter-active-class="transition transform ease-in-out duration-300"
                enter-to-class="opacity-100 translate-x-0"
                leave-from-class="opacity-100 translate-x-0"
                :leave-to-class="'opacity-0 ' + (modalProps.position === 'left' ? '-translate-x-full' : 'translate-x-full')"
                leave-active-class="transition transform ease-in-out duration-300"
            >
                <div
                    v-show="modalContext.show"
                    :class="{
                        'im-slideover-wrapper w-full': true,
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
                    <DialogPanel
                        class="im-slideover-content relative"
                        :class="[modalProps.paddingClasses, modalProps.panelClasses]"
                    >
                        <div
                            v-if="modalProps.closeButton"
                            class="absolute right-0 top-0 pr-3 pt-3"
                        >
                            <CloseButton @click="modalContext.close" />
                        </div>

                        <slot
                            :modal-context="modalContext"
                            :modal-props="modalProps"
                        />
                    </DialogPanel>
                </div>
            </Transition>
        </div>
    </div>
</template>
