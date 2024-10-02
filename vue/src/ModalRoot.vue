<script setup>
import { useModalStack } from './modalStack'
import ModalResolver from './ModalResolver.vue'

const modalStack = useModalStack()
</script>

<template>
    <slot />

    <ModalResolver
        v-if="modalStack.stack.value.length"
        :index="0"
    />
</template>
