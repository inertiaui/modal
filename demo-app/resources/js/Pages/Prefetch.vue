<script setup>
import { ModalLink } from '@inertiaui/modal-vue'
import { ref } from 'vue'

import Container from './Container.vue'

const log = ref([])

function push(value) {
    log.value.push(value)
}
</script>

<template>
    <Container>
        <div class="flex flex-col items-start gap-4">
            <h2 class="text-lg font-medium text-gray-900">Prefetch Test</h2>

            <p data-testid="log">{{ log.join(',') }}</p>

            <ModalLink
                href="/users/1/edit"
                prefetch="hover"
                data-testid="prefetch-hover"
                class="rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-600"
                @prefetching="push('prefetching')"
                @prefetched="push('prefetched')"
                @success="push('success')"
            >
                Prefetch on Hover
            </ModalLink>

            <ModalLink
                href="/users/1/edit"
                prefetch="click"
                data-testid="prefetch-click"
                class="rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-600"
                @prefetching="push('click-prefetching')"
                @prefetched="push('click-prefetched')"
                @success="push('click-success')"
            >
                Prefetch on Click
            </ModalLink>

            <ModalLink
                href="/users/1/edit"
                prefetch="mount"
                data-testid="prefetch-mount"
                class="rounded-md bg-purple-100 px-2 py-1 text-xs font-medium text-purple-600"
                @prefetching="push('mount-prefetching')"
                @prefetched="push('mount-prefetched')"
                @success="push('mount-success')"
            >
                Prefetch on Mount
            </ModalLink>

            <ModalLink
                href="/users/1/edit"
                :prefetch="['hover', 'click']"
                data-testid="prefetch-multiple"
                class="rounded-md bg-orange-100 px-2 py-1 text-xs font-medium text-orange-600"
                @prefetching="push('multi-prefetching')"
                @prefetched="push('multi-prefetched')"
                @success="push('multi-success')"
            >
                Prefetch on Hover and Click
            </ModalLink>

            <ModalLink
                href="/users/1/edit"
                :prefetch="true"
                data-testid="prefetch-true"
                class="rounded-md bg-teal-100 px-2 py-1 text-xs font-medium text-teal-600"
                @prefetching="push('true-prefetching')"
                @prefetched="push('true-prefetched')"
                @success="push('true-success')"
            >
                Prefetch=true (default hover)
            </ModalLink>
        </div>
    </Container>
</template>
