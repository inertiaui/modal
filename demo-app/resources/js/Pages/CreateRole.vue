<script setup>
import { useForm } from '@inertiajs/vue3'
import { default as Axios } from 'axios'
import { Modal, ModalLink } from '@inertiaui/modal-vue'
import { ref } from 'vue'
import ComponentThatUsesModalInstance from './ComponentThatUsesModalInstance.vue'

defineProps(['headerValue', 'name'])

const form = useForm({
    name: '',
})

const modalRef = ref(null)
const greetingRef = ref('')

function submit() {
    Axios.post('/roles', form.data()).then(() => {
        modalRef.value.close()
    })
}
</script>

<template>
    <Modal
        ref="modalRef"
        v-slot="{ close, getParentModal }"
        @greeting="greetingRef = $event"
    >
        <div class="">
            <h2 class="text-lg font-medium text-gray-900">Create Role</h2>
            <p
                v-if="greetingRef"
                data-testid="greeting"
                class="text-sm text-gray-500"
                v-text="greetingRef"
            />
            <p
                v-if="headerValue"
                data-testid="headerValue"
                class="text-sm text-gray-500"
                v-text="headerValue"
            />
            <p
                v-if="name"
                data-testid="name"
                class="text-sm text-gray-500"
                v-text="name"
            />
        </div>

        <button type="button" @click.prevent="getParentModal().emit('message', 'Hello from child')">
            Push message to parent
        </button>

        <form
            class="mt-8 space-y-6"
            @submit.prevent="submit"
        >
            <div class="grid grid-cols-3 gap-6">
                <div class="col-span-6 sm:col-span-3">
                    <label
                        for="name"
                        class="block text-sm font-medium text-gray-700"
                        >Name</label
                    >
                    <input
                        id="name"
                        v-model="form.name"
                        type="text"
                        name="name"
                        autocomplete="off"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <p
                        v-if="form.errors.name"
                        class="mt-2 text-sm text-red-600"
                        v-text="form.errors.name"
                    ></p>
                </div>
            </div>

            <div class="flex items-center justify-end">
                <ModalLink max-width="sm" href="#another-local-modal" class="mr-auto text-sm text-pink-500">
                    What's that?
                </ModalLink>

                <button
                    type="button"
                    class="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    @click.prevent="close"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    class="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Save
                </button>
            </div>
        </form>

        <Modal name="another-local-modal">
             Hawaiian noises?
        </Modal>

        <ComponentThatUsesModalInstance />
    </Modal>
</template>
