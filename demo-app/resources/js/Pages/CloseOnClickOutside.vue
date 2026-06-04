<script setup>
import { ModalLink, putConfig } from '@inertiaui/modal-vue'
import { onMounted } from 'vue'

import Container from './Container.vue'

// Disable native dialog for this test page so we can properly test click-outside
onMounted(() => {
    putConfig({ useNativeDialog: false })
})
</script>

<template>
    <Container>
        <div class="flex flex-col items-start gap-4">
            <h2 class="text-lg font-medium text-gray-900">Close on Click Outside Test</h2>

            <ModalLink
                href="/users/1/edit"
                data-testid="open-with-click-outside"
                class="rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-600"
            >
                Open Modal (default - closes on click outside)
            </ModalLink>

            <ModalLink
                href="/users/1/edit"
                :closeOnClickOutside="false"
                data-testid="open-without-click-outside"
                class="rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-600"
            >
                Open Modal (closeOnClickOutside=false)
            </ModalLink>

            <ModalLink
                href="/users/1/edit"
                slideover
                data-testid="open-slideover-with-click-outside"
                class="rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-600"
            >
                Open Slideover (default - closes on click outside)
            </ModalLink>

            <ModalLink
                href="/users/1/edit"
                slideover
                :closeOnClickOutside="false"
                data-testid="open-slideover-without-click-outside"
                class="rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-600"
            >
                Open Slideover (closeOnClickOutside=false)
            </ModalLink>
        </div>
    </Container>
</template>
