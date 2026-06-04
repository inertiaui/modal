<script setup>
import { ModalLink } from '@inertiaui/modal-vue'

import Container from './Container.vue'

const sizes = ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl']
</script>

<template>
    <Container>
        <div class="flex justify-between">
            <h2 class="text-lg font-medium text-gray-900">Max Width</h2>
        </div>

        <div class="flex flex-wrap gap-2">
            <ModalLink v-for="size in sizes" :key="size" :data-testid="`modal-size-${size}`" :max-width="size" href="/users/1/edit">Modal {{ size }}</ModalLink>

            <ModalLink v-for="size in sizes" slideover :key="size" :data-testid="`slideover-size-${size}`" :max-width="size" href="/users/1/edit"
                >Slideover {{ size }}</ModalLink
            >
        </div>
    </Container>
</template>
