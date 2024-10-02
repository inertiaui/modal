<script setup>
import Container from './Container.vue'
import { Modal, visitModal } from 'inertiaui/modal'
</script>

<template>
    <Container>
        <div class="flex justify-between">
            <h2 class="text-lg font-medium text-gray-900">Visit programmatically</h2>

            <button @click="visitModal('#local')" type="button">
                Open Local Modal
            </button>

            <button @click="visitModal('/data', { method: 'post', data: {message: 'Hi again!'}})" type="button">
                Open Route Modal
            </button>
        </div>
    </Container>

    <Modal name="local">
        Hi there!
    </Modal>
</template>