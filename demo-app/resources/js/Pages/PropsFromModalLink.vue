<script setup>
import Container from './Container.vue'
import { ModalLink } from '@inertiaui/modal-vue'

defineProps({
    users: Object,
});
</script>

<template>
    <Container>
        <div class="flex justify-between">
            <h2 class="text-lg font-medium text-gray-900">Prop from ModalLink</h2>
        </div>

        <ModalLink
            :href="`/users/1/edit`"
            class="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md"
            :close-button="false"
            :close-explicitly="true"
            max-width="2xl"
            padding-classes="p-8"
            panel-classes="bg-red-100 min-h-screen"
            position="left"
            :slideover="true"
        >
            Edit User 1
        </ModalLink>
    </Container>
</template>
