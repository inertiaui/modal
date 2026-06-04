<script setup>
import * as InertiaVue from '@inertiajs/vue3'
import { ModalLink } from '@inertiaui/modal-vue'

import Container from './Container.vue'

const props = defineProps({
    user: Object,
    deferred: String,
})
</script>

<template>
    <Container>
        <div class="">
            <p class="text-2xl font-medium text-gray-900">{{ user.name }}</p>
            <p class="text-xl text-gray-500">{{ user.email }}</p>
        </div>

        <component v-if="InertiaVue.Deferred" :is="InertiaVue.Deferred" data="deferred">
            <template #fallback> Loading... </template>

            <p data-testid="deferred">{{ deferred }}</p>
        </component>

        <p v-else data-testid="deferred">No Deferred Component</p>

        <ModalLink
            navigate
            as="button"
            :data-testid="'edit-user-' + user.id"
            :href="`/users/${user.id}/edit`"
            class="mt-4 rounded-md bg-indigo-100 px-3 py-2 text-sm font-medium text-indigo-600"
        >
            Edit
        </ModalLink>
    </Container>
</template>
