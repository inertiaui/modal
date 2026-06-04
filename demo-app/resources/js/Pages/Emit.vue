<script setup>
import { ModalLink } from '@inertiaui/modal-vue'

import Container from './Container.vue'
</script>

<template>
    <Container>
        <div class="flex justify-between">
            <h2 class="text-lg font-medium text-gray-900">Emit</h2>
        </div>

        <ModalLink data-testid="modal-link" href="/users/1/edit" class="rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-600">
            Open Modal
        </ModalLink>
    </Container>
</template>
