<script setup>
import { ref } from 'vue';
import Container from './Container.vue'
import { ModalLink } from '@inertiaui/modal-vue'

const log = ref([])

function push(value) {
    log.value.push(value)
}


defineProps({
    navigate: Boolean,
})
</script>

<template>
    <Container>
        <div class="flex justify-between">
            <h2 class="text-lg font-medium text-gray-900">Events</h2>

            <p>Page ID: {{ $page.props._inertiaui_modal_page_id }}</p>

            <p data-testid="log">{{ log.join(',') }}</p>
        </div>

        <ModalLink
            :navigate="navigate"
            data-testid="modal-link"
            href="/users/1/edit"
            class="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md"
            @close="push('close')"
            @focus="push('focus')"
            @after-leave="push('after-leave')"
            @blur="push('blur')"
            @start="push('start')"
            @success="push('success')"
        >
            Open Modal
        </ModalLink>
    </Container>
</template>
