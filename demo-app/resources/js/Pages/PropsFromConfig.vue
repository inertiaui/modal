<script setup>
import Container from './Container.vue'
import { ModalLink } from 'inertiaui/modal'
</script>

<template>
    <Container>
        <div class="flex justify-between">
            <h2 class="text-lg font-medium text-gray-900">Prop from Config</h2>
        </div>

        <ModalLink
            href="/users/1/edit"
            class="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md"
        >
            Open
        </ModalLink>
    </Container>
</template>
