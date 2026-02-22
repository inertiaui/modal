<script setup>
import Container from './Container.vue'
import { Modal, useModal, visitModal } from '@inertiaui/modal-vue'
import { ref } from 'vue'

const receivedMessage = ref('')

function openWithProps() {
    visitModal('#local-props', {
        props: {
            message: 'Hello from props!',
            count: 42,
        },
    })
}
</script>

<template>
    <Container>
        <div class="flex flex-col items-start gap-4">
            <h2 class="text-lg font-medium text-gray-900">Local Modal with Props</h2>

            <button @click="openWithProps" dusk="open-with-props">
                Open Local Modal with Props
            </button>

            <p dusk="received-message">{{ receivedMessage }}</p>
        </div>
    </Container>

    <Modal name="local-props" v-slot="{ message, count }">
        <div class="p-4">
            <p dusk="modal-message">{{ message }}</p>
            <p dusk="modal-count">{{ count }}</p>
        </div>
    </Modal>
</template>
