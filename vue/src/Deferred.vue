<script setup lang="ts">
// See: https://github.com/inertiajs/inertia/blob/48bcd21fb7daf467d0df1bfde2408f161f94a579/packages/vue3/src/deferred.ts
import { computed, inject } from 'vue'

const props = defineProps({
    data: {
        type: [String, Array],
        required: true,
    },
})

const modalContext = inject('modalContext')

if (!modalContext) {
    throw new Error('Deferred component must be used inside a Modal component')
}

const allKeysAreAvailable = computed(() => {
    const keys = Array.isArray(props.data) ? props.data : [props.data]

    return keys.every((key) => modalContext.value.props[key] !== undefined)
})
</script>

<template>
    <slot v-if="allKeysAreAvailable" />

    <slot
        v-else
        name="fallback"
    />
</template>
