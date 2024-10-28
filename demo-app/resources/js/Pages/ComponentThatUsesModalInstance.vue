<script setup>
import { useModal } from '@inertiaui/modal-vue'

const modal = useModal()

if (modal) {
    const { props } = useModal()
    console.log(props.roles)
}
</script>

<template>
    <div v-if="modal">
        <button @click="modal.close()">Close Modal with index {{ modal.index }}</button>
    </div>
</template>
