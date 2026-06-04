<script setup lang="ts">
import { ModalLink } from '@inertiaui/modal-vue'
</script>

<!-- Base page. The ModalLink opens the modal through the Inertia router (no full
     page reload), which is exactly when a duplicate Inertia copy blows up. -->
<template>
    <div style="padding: 24px">
        <h1>Modal smoke</h1>
        <ModalLink href="/modal-smoke/greet" data-testid="open-modal">Open modal</ModalLink>
    </div>
</template>
