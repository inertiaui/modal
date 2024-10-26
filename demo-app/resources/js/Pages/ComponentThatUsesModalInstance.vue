<script setup>
import { useModal } from '@inertiaui/modal-vue'

const modal = useModal()
</script>

<template>
    <div v-if="modal">
        <button @click="modal.close()">Close Modal with index {{ modal.index }}</button>
    </div>
</template>
