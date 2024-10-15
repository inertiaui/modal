<script setup>
import { useForm } from '@inertiajs/vue3';
import { Modal, ModalLink } from '@inertiaui/modal-vue';
import { ref } from 'vue';
import Container from './Container.vue'

const props = defineProps({
    user: Object,
});
</script>

<template>
    <Container>
        <div class="">
            <p class="text-2xl font-medium text-gray-900">{{ user.name }}</p>
            <p class="text-xl text-gray-500">{{ user.email }}</p>
        </div>

        <ModalLink navigate as="button" :fragment="'edit-user-' + user.id" :dusk="'edit-user-' + user.id"
            :href="`/users/${user.id}/edit`"
            class="mt-4 px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-md">
            Edit
        </ModalLink>

    </Container>
</template>