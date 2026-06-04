<script setup lang="ts">
import { useModal } from '@inertiaui/modal-vue'

defineProps<{ message: string }>()

// useModal() reads the modal/Inertia context, so it throws
// ("Cannot convert undefined or null to object") the moment a second,
// uninitialized Inertia copy is bundled.
const modal = useModal()
</script>

<template>
    <div data-testid="modal-greet" style="padding: 24px">
        <p data-testid="modal-message">{{ message }}</p>
        <button type="button" data-testid="close-modal" @click="modal.close()">Close</button>
    </div>
</template>
