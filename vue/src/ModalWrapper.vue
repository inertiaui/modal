<script setup>
import { getConfig, getConfigByType } from './config'
import { computed, inject, useAttrs } from 'vue'
import { modalPropNames } from './modalStack'
import { only } from './helpers'
import { TransitionRoot, TransitionChild, Dialog } from '@headlessui/vue'

const props = defineProps({
    // The slideover prop in on top because we need to know if it's a slideover
    // before we can determine the defaule value of other props
    slideover: {
        type: Boolean,
        default: () => getConfig('type') === 'slideover',
    },
    closeButton: {
        type: Boolean,
        default: (props) => getConfigByType(props.slideover, 'closeButton'),
    },
    closeExplicitly: {
        type: Boolean,
        default: (props) => getConfigByType(props.slideover, 'closeExplicitly'),
    },
    maxWidth: {
        type: String,
        default: (props) => getConfigByType(props.slideover, 'maxWidth'),
    },
    paddingClasses: {
        type: [Boolean, String],
        default: (props) => getConfigByType(props.slideover, 'paddingClasses'),
    },
    panelClasses: {
        type: [Boolean, String],
        default: (props) => getConfigByType(props.slideover, 'panelClasses'),
    },
    position: {
        type: String,
        default: (props) => getConfigByType(props.slideover, 'position'),
    },
})

const modalContext = inject('modalContext')
const modalProps = computed(() => {
    return {
        ...only(props, modalPropNames),
        ...modalContext.value.modalProps,
    }
})

function closeDialog() {
    if (!modalProps.value.closeExplicitly) {
        modalContext.value.close()
    }
}

const $attrs = useAttrs()

Object.keys($attrs)
    .filter((key) => key.startsWith('on'))
    .forEach((key) => {
        // e.g. onRefreshKey -> refresh-key
        const snakeCaseKey = key
            .replace(/^on/, '')
            .replace(/^./, (firstLetter) => firstLetter.toLowerCase())
            .replace(/([A-Z])/g, '-$1')
            .toLowerCase()

        modalContext.value.on(snakeCaseKey, $attrs[key])
    })
</script>

<template>
    <TransitionRoot
        :unmount="false"
        :show="modalContext?.open ?? false"
        enter="transition transform ease-in-out duration-300"
        enter-from="opacity-0 scale-95"
        enter-to="opacity-100 scale-100"
        leave="transition transform ease-in-out duration-300"
        leave-from="opacity-100 scale-100"
        leave-to="opacity-0 scale-95"
    >
        <Dialog
            :data-inertiaui-modal-id="modalContext?.id"
            :data-inertiaui-modal-index="modalContext?.index"
            class="im-dialog relative z-20"
            @close="closeDialog"
        >
            <!-- Only transition the backdrop for the first modal in the stack -->
            <TransitionChild
                v-if="modalContext?.index === 0"
                as="template"
                enter="transition transform ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="transition transform ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div
                    v-show="modalContext?.onTopOfStack"
                    class="im-backdrop fixed inset-0 z-30 bg-black/75"
                    aria-hidden="true"
                />
            </TransitionChild>

            <!-- On multiple modals, only show a backdrop for the modal that is on top of the stack -->
            <div
                v-if="modalContext?.index > 0 && modalContext?.onTopOfStack"
                class="im-backdrop fixed inset-0 z-30 bg-black/75"
            />

            <slot
                :modal-context="modalContext"
                :modal-props="modalProps"
            />
        </Dialog>
    </TransitionRoot>
</template>
