<script setup>
import { ModalLink } from '@inertiaui/modal-vue';
import Container from './Container.vue'
import * as InertiaVue from '@inertiajs/vue3';

const props = defineProps({
    user: Object,
    deferred: String
});
</script>

<template>
    <Container>
        <div class="">
            <p class="text-2xl font-medium text-gray-900">{{ user.name }}</p>
            <p class="text-xl text-gray-500">{{ user.email }}</p>
        </div>

        <component v-if="InertiaVue.Deferred" :is="InertiaVue.Deferred" data="deferred">
            <template #fallback>
                Loading...
            </template>

            <p dusk="deferred">{{ deferred }}</p>
        </component>

        <p v-else dusk="deferred">No Deferred Component</p>

        <ModalLink navigate as="button" :dusk="'edit-user-' + user.id"
            :href="`/users/${user.id}/edit`"
            class="mt-4 px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-md">
            Edit
        </ModalLink>

    </Container>
</template>