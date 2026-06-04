<script setup>
import { Link, useForm } from '@inertiajs/vue3'
import { Modal, ModalLink } from '@inertiaui/modal-vue'
import { ref } from 'vue'

import ComponentThatUsesModalInstance from './ComponentThatUsesModalInstance.vue'

const props = defineProps({
    user: Object,
    roles: Object,
    randomKey: String,
})

const form = useForm({
    name: props.user.name,
    email: props.user.email,
    role_id: props.user.role_id,
})

function updateAndRefresh() {
    form.put(`/users/${props.user.id}?redirect=edit`)
}

const modalRef = ref(null)
const messageRef = ref('')

function submit() {
    form.put(`/users/${props.user.id}`, {
        onSuccess() {
            modalRef.value.close()
        },
    })
}

function onMessage(message) {
    messageRef.value = message
    modalRef.value.getChildModal().emit('greeting', `Thanks from ${props.user.name}`)
}

function reloadWithData() {
    modalRef.value.reload({ only: ['randomKey'], data: { fixedRandomKey: 'from-data' } })
}

function reloadWithHeader() {
    modalRef.value.reload({ only: ['randomKey'], headers: { 'X-Random-Key': 'from-header' } })
}
</script>

<template>
    <Modal ref="modalRef" @message="onMessage" #default="{ close, reload, emit }">
        <div class="">
            <h2 class="text-lg font-medium text-gray-900">Edit User {{ user.name }}</h2>
            <p class="text-sm text-gray-500">
                Random key: <span data-testid="randomKey">{{ randomKey }}</span>
            </p>
            <p data-testid="message" v-text="messageRef" v-if="messageRef" class="text-sm text-gray-500" />
        </div>

        <div class="mt-4 flex flex-col items-start">
            <button type="button" @click="emit('user-greets', 'Hello from EditUser')">Send Message</button>

            <button type="button" @click="reloadWithData">Random Key from Data</button>

            <button type="button" @click="reloadWithHeader">Random Key from Header</button>
        </div>

        <form @submit.prevent="submit" class="mt-8 space-y-6">
            <div class="grid grid-cols-3 gap-6">
                <div class="col-span-6 sm:col-span-3">
                    <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        v-model="form.name"
                        type="text"
                        id="name"
                        name="name"
                        autocomplete="off"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <p v-if="form.errors.name" class="mt-2 text-sm text-red-600" v-text="form.errors.name"></p>
                </div>

                <div class="col-span-6 sm:col-span-3">
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        v-model="form.email"
                        type="email"
                        id="email"
                        name="email"
                        autocomplete="off"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <p v-if="form.errors.email" class="mt-2 text-sm text-red-600" v-text="form.errors.email"></p>
                </div>

                <div class="col-span-6 sm:col-span-3">
                    <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
                    <select
                        v-model="form.role_id"
                        id="role"
                        name="role"
                        autocomplete="off"
                        class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-xs focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                    >
                        <option v-for="(role, id) in props.roles" :key="id" :value="id" v-text="role"></option>
                    </select>

                    <ModalLink
                        @close="reload({ only: ['roles'] })"
                        href="/roles/create"
                        class="mt-2 inline-flex items-center rounded-md border border-indigo-500 bg-transparent px-2 py-1 text-sm text-indigo-600 hover:text-indigo-500"
                    >
                        <svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Add Role
                    </ModalLink>
                </div>
            </div>

            <div class="flex justify-end">
                <Link replace :href="route('users.edit', { user, navigate: 1, randomKey })"> Edit again! </Link>
                <button
                    type="button"
                    @click="close"
                    class="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    @click.prevent="updateAndRefresh"
                    class="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                >
                    Update and refresh
                </button>
                <button
                    type="submit"
                    class="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                >
                    Save
                </button>
            </div>
        </form>

        <ComponentThatUsesModalInstance />
    </Modal>
</template>
