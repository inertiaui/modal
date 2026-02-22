<script setup>
import { Link, useForm } from '@inertiajs/vue3'
import { ModalLink } from '@inertiaui/modal-vue'
import { onMounted,ref } from 'vue';
import * as InertiaVue from '@inertiajs/vue3';
import ComponentThatUsesModalInstance from './ComponentThatUsesModalInstance.vue';
import Container from './Container.vue'
import CustomButton from '../Components/CustomButton.vue'

const testRedirectBackForm = useForm({})
const testModalHeaderForm = useForm({})

function testRedirectBack() {
    testRedirectBackForm.post('/test-redirect-back')
}

function testModalHeaderCheck() {
    testModalHeaderForm.post('/test-modal-header-check')
}

defineProps({
    users: Object,
    random: Number,
    navigate: Boolean,
    deferred: String
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
            <component v-if="InertiaVue.Deferred" :is="InertiaVue.Deferred" data="deferred">
                <template #fallback>
                    Loading...
                </template>

                <p dusk="deferred">{{ deferred }}</p>
            </component>

            <p v-else dusk="deferred">No Deferred Component</p>
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
                            <Link
                                :href="`/users/${user.id}`"
                                :dusk="'view-user-' + user.id"
                                class="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md"
                            >
                                View
                            </Link>
                            <ModalLink
                                :navigate="navigate"
                                :dusk="'edit-user-' + user.id"
                                :href="`/users/${user.id}/edit`"
                                class="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md"
                                @user-greets="alertGreeting"
                            >
                                Edit
                            </ModalLink>
                            <ModalLink
                                slideover
                                :navigate="navigate"
                                :dusk="'slideover-user-' + user.id"
                                :href="`/users/${user.id}/edit`"
                                class="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md"
                                @user-greets="alertGreeting"
                            >
                                Slideover
                            </ModalLink>
                            <ModalLink
                                :as="CustomButton"
                                :navigate="navigate"
                                :dusk="'custom-button-user-' + user.id"
                                :href="`/users/${user.id}/edit`"
                            >
                                Custom
                            </ModalLink>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <ComponentThatUsesModalInstance />

        <!-- Test redirect()->back() after modal close (issue #153) -->
        <div class="mt-4 flex space-x-4">
            <button
                dusk="test-redirect-back"
                @click="testRedirectBack"
                class="px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md"
            >
                Test Redirect Back
            </button>
            <button
                dusk="test-modal-header-check"
                @click="testModalHeaderCheck"
                class="px-3 py-2 text-sm font-medium text-white bg-orange-600 rounded-md"
            >
                Check Modal Header
            </button>
            <Link
                dusk="nav-visit"
                href="/visit"
                class="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md"
            >
                Go to Visit Page
            </Link>
            <ModalLink
                :navigate="navigate"
                href="/modal-with-modal-base"
                class="px-3 py-2 text-sm font-medium text-white bg-purple-600 rounded-md"
            >
                Modal with Modal Base
            </ModalLink>
            <ModalLink
                :navigate="navigate"
                href="/modal-invalid-response"
                class="px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-md"
            >
                Invalid Response
            </ModalLink>
        </div>
    </Container>
</template>
