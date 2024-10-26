<script setup>
import { onMounted,ref } from 'vue';
import Container from './Container.vue'
import { ModalLink } from '@inertiaui/modal-vue'
import { Link } from '@inertiajs/vue3'
import ComponentThatUsesModalInstance from './ComponentThatUsesModalInstance.vue';

defineProps({
    users: Object,
    random: Number,
    navigate: Boolean,
});

const rand = () => Math.floor(Math.random() * 100000) + 1

const stateA = ref(rand())
const stateB = ref(rand())

onMounted(() => {
    stateB.value = rand()
})

function alertGreeting(greeting) {
    alert(greeting)
}
</script>

<template>
    <Container>
        <div class="flex justify-between">
            <h2 class="text-lg font-medium text-gray-900">Users</h2>
            <!-- <p dusk="state-a">S: {{ random }}</p>
            <p dusk="state-a">A: {{ stateA }}</p>
            <p dusk="state-b">B: {{ stateB }}</p> -->
        </div>

        <div class="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
            <ul class="divide-y divide-gray-200">
                <li v-for="user in users" :key="user.id" class="flex items-center justify-between py-4 px-6 hover:bg-gray-50">
                    <div class="flex items-center w-full">
                        <div class="">
                            <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                            <div class="text-sm text-gray-500">{{ user.email }}</div>
                        </div>
                        <div class="ml-auto flex items-center space-x-2">
                            <Link :href="`/users/${user.id}`" class="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md">View</Link>
                            <ModalLink
                                :navigate="navigate"
                                :dusk="'edit-user-' + user.id"
                                :href="`/users/${user.id}/edit`"
                                class="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md"
                                @user-greets="alertGreeting"
                            >
                                Edit
                            </ModalLink>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <ComponentThatUsesModalInstance />
    </Container>
</template>
