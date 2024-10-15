<script setup>
import Container from './Container.vue'
import { ModalLink } from '@inertiaui/modal-vue'
</script>

<template>
    <Container>
        <div class="flex justify-between">
            <h2 class="text-lg font-medium text-gray-900">Emit</h2>
        </div>

        <ModalLink
            dusk="modal-link"
            href="/users/1/edit"
            class="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md"
        >
            Open Modal
        </ModalLink>
    </Container>
</template>
