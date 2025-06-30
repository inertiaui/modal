<script setup lang="ts">
// See: https://github.com/inertiajs/inertia/blob/48bcd21fb7daf467d0df1bfde2408f161f94a579/packages/vue3/src/deferred.ts
import { computed, inject } from 'vue'
import type { ModalInstance } from './types'

interface DeferredProps {
    data: string | string[]
}

const props = defineProps<DeferredProps>()

const modalContext = inject<ModalInstance | null>('modalContext')

if (!modalContext) {
    throw new Error('Deferred component must be used inside a Modal component')
}

const allKeysAreAvailable = computed(() => {
    const keys = Array.isArray(props.data) ? props.data : [props.data]

    return keys.every((key) => modalContext?.props[key] !== undefined)
})
</script>

<template>
    <slot v-if="allKeysAreAvailable" />

    <slot
        v-else
        name="fallback"
    />
</template>
