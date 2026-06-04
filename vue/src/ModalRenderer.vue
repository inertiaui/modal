<script setup>
import { computed, provide } from 'vue'

import { only } from './helpers'
import { useModalStack } from './modalStack'

const props = defineProps({
    index: {
        type: Number,
        required: true,
    },
})

const modalStack = useModalStack()

const modalContext = computed(() => {
    return modalStack.stack.value[props.index]
})

provide('modalContext', modalContext)
</script>

<template>
    <modalContext.component
        v-if="modalContext?.component"
        v-bind="only(modalContext.props ?? {}, modalContext.getComponentPropKeys(), true)"
        @modal-event="(event, ...args) => modalContext.emit(event, ...args)"
    />
</template>
