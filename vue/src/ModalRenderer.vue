<script setup>
import { useModalStack } from './modalStack'
import { computed, provide } from 'vue'

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
        v-bind="modalContext.props"
        @modal-event="(event, ...args) => modalContext.emit(event, ...args)"
    />
</template>
