<script setup>
import { ref } from 'vue';
import Container from './Container.vue'
import { ModalLink } from '@inertiaui/modal-vue'

const log = ref([])

defineProps({
    navigate: Boolean,
})
</script>

<template>
    <Container>
        <div class="flex justify-between">
            <h2 class="text-lg font-medium text-gray-900">Events</h2>

            <p dusk="log">{{ log.join(',') }}</p>
        </div>

        <ModalLink
            :navigate="navigate"
            dusk="modal-link"
            href="/users/1/edit"
            class="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md"
            @close="log.push('close')"
            @focus="log.push('focus')"
            @after-leave="log.push('after-leave')"
            @blur="log.push('blur')"
            @start="log.push('start')"
            @success="log.push('success')"
        >
            Open Modal
        </ModalLink>
    </Container>
</template>
