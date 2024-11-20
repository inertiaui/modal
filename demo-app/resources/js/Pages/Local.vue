<script setup>
import Container from './Container.vue'
import { Modal, ModalLink } from '@inertiaui/modal-vue'
import { ref } from 'vue';

const modalRef = ref(null);

function closeModal() {
    modalRef.value.close();
}
</script>

<template>
    <Container>
        <div class="flex justify-between">
            <h2 class="text-lg font-medium text-gray-900">Local</h2>

            <ModalLink href="#local" class="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md">
                Open Local Modal
            </ModalLink>
        </div>
    </Container>

    <Modal name="local" ref="modalRef">
        This is a local modal

        <ModalLink href="/roles/create">
            Create Role
        </ModalLink>

        <button @click="closeModal">
            Close Modal through Ref
        </button>
    </Modal>
</template>
