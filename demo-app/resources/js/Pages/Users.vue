<script setup>
import Container from './Container.vue'
import { Link } from '@inertiajs/vue3';
import { ModalLink } from 'inertiaui/modal'

defineProps({
    users: Object,
});

function alertGreeting(greeting) {
    alert(greeting)
}
</script>

<template>
    <Container>
        <div class="flex justify-between">
            <h2 class="text-lg font-medium text-gray-900">Users</h2>
        </div>

        <div class="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
            <ul class="divide-y divide-gray-200">
                <li v-for="user in users" :key="user.id" class="flex items-center justify-between py-4 px-6 hover:bg-gray-50">
                    <div class="flex items-center w-full">
                        <div class="">
                            <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                            <div class="text-sm text-gray-500">{{ user.email }}</div>
                        </div>
                        <div class="ml-auto">
                            <ModalLink
                                :fragment="'edit-user-' + user.id"
                                :dusk="'edit-user-' + user.id"
                                :href="`/users/${user.id}/edit`"
                                class="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md"
                                #default="{ loading }"
                                @user-greets="alertGreeting"
                            >
                                {{ loading ? 'Loading...' : 'Edit' }}
                            </ModalLink>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </Container>
</template>
