<script setup>
import { ModalLink } from '@inertiaui/modal-vue';
import Container from './Container.vue'

const props = defineProps({
    user: Object,
    deferred: String
});

let DeferredComponent = 'div';

import('@inertiajs/vue3').then((InertiaVue) => {
    if (InertiaVue.Deferred) {
        DeferredComponent = InertiaVue.Deferred
    }
});
</script>

<template>
    <Container>
        <div class="">
            <p class="text-2xl font-medium text-gray-900">{{ user.name }}</p>
            <p class="text-xl text-gray-500">{{ user.email }}</p>
        </div>

        <component v-if="DeferredComponent" :is="DeferredComponent" data="deferred">
            <template #fallback>
                <p dusk="deferred-fallback">Loading...</p>
            </template>

            <p dusk="deferred">{{ DeferredComponent === 'div' ? 'No Deferred Component' : deferred }}</p>
        </component>

        <ModalLink navigate as="button" :dusk="'edit-user-' + user.id"
            :href="`/users/${user.id}/edit`"
            class="mt-4 px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-md">
            Edit
        </ModalLink>

    </Container>
</template>