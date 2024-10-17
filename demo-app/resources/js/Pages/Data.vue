<script setup>
import { Modal } from '@inertiaui/modal-vue';

defineProps({
    message: String,
});
</script>

<template>
    <Modal>
        <p dusk="message">{{ message }}</p>
    </Modal>
</template>