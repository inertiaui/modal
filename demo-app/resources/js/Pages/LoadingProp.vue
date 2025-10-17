<script setup>
import Container from './Container.vue'
import { ModalLink, putConfig } from '@inertiaui/modal-vue'

const params = new URLSearchParams(window.location.search);

putConfig({
    progress: params.get('progress') === 'false'
        ? false
        : { delay: parseInt(params.get('delay') ?? 0) }
})
</script>

<template>
    <Container>
        <div class="flex justify-between">
            <h2 class="text-lg font-medium text-gray-900">Loading Prop</h2>
        </div>

        <ModalLink
            dusk="modal-link"
            href="/slideover?slow=1"
            class="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md"
            #default="{ loading }"
        >
            {{ loading ? 'Loading...' : 'Open Slideover' }}
        </ModalLink>
    </Container>
</template>
