<script setup>
import Container from './Container.vue'
import { Modal, ModalLink } from 'inertiaui/modal'
</script>

<template>
    <Container>
        <div class="flex justify-between">
            <h2 class="text-lg font-medium text-gray-900">Local</h2>

            <ModalLink href="#local" fragment="pre" class="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md">
                Open Local Modal
            </ModalLink>
        </div>
    </Container>

    <Modal name="local">
        This is a local modal

        <ModalLink href="/roles/create">
            Create Role
        </ModalLink>
    </Modal>
</template>
