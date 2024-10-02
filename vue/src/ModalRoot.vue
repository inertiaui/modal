<script setup>
import { onBeforeMount } from 'vue'
import { useModalStack } from './modalStack'
import ModalRenderer from './ModalRenderer.vue'

const modalStack = useModalStack()

onBeforeMount(() => {
    modalStack.rootPresent.value = true
})
</script>

<template>
    <slot />

    <ModalRenderer
        v-if="modalStack.stack.value.length"
        :index="0"
    />
</template>
