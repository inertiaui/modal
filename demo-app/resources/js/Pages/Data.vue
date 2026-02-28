<script setup>
import { Modal } from '@inertiaui/modal-vue';

defineProps({
    message: String,
});
</script>

<template>
    <Modal>
        <p data-testid="message">{{ message }}</p>
    </Modal>
</template>