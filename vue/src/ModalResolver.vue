<script setup>
import { useModalStack } from './modalStack'
import { computed, provide } from 'vue'

const props = defineProps({
    index: Number,
})

const modalStack = useModalStack()

const modalContext = computed(() => {
    return modalStack.stack.value[props.index]
})

provide('modalContext', modalContext)

function handleEmittedEvent(event, ...args) {
    modalContext.value.emit(event, ...args)
}
</script>

<template>
    <modalContext.component
        v-if="modalContext?.component"
        v-bind="modalContext.componentProps"
        @emit="handleEmittedEvent"
    />
</template>
