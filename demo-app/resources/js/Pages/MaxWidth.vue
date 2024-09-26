<script setup>
import Container from './Container.vue'
import { ModalLink } from 'inertiaui/modal'
</script>

<template>
    <Container>
        <div class="flex justify-between">
            <h2 class="text-lg font-medium text-gray-900">Max Width</h2>
        </div>

        <div class="flex gap-2 flex-wrap">
            <ModalLink dusk="modal-size-sm" max-width="sm" href="/users/1/edit">Modal sm</ModalLink>
            <ModalLink dusk="modal-size-md" max-width="md" href="/users/1/edit">Modal md</ModalLink>
            <ModalLink dusk="modal-size-lg" max-width="lg" href="/users/1/edit">Modal lg</ModalLink>
            <ModalLink dusk="modal-size-xl" max-width="xl" href="/users/1/edit">Modal xl</ModalLink>
            <ModalLink dusk="modal-size-2xl" max-width="2xl" href="/users/1/edit">Modal 2xl</ModalLink>
            <ModalLink dusk="modal-size-3xl" max-width="3xl" href="/users/1/edit">Modal 3xl</ModalLink>
            <ModalLink dusk="modal-size-4xl" max-width="4xl" href="/users/1/edit">Modal 4xl</ModalLink>
            <ModalLink dusk="modal-size-5xl" max-width="5xl" href="/users/1/edit">Modal 5xl</ModalLink>
            <ModalLink dusk="modal-size-6xl" max-width="6xl" href="/users/1/edit">Modal 6xl</ModalLink>
            <ModalLink dusk="modal-size-7xl" max-width="7xl" href="/users/1/edit">Modal 7xl</ModalLink>
            <ModalLink slideover dusk="slideover-size-sm" max-width="sm" href="/users/1/edit">Slideover sm</ModalLink>
            <ModalLink slideover dusk="slideover-size-md" max-width="md" href="/users/1/edit">Slideover md</ModalLink>
            <ModalLink slideover dusk="slideover-size-lg" max-width="lg" href="/users/1/edit">Slideover lg</ModalLink>
            <ModalLink slideover dusk="slideover-size-xl" max-width="xl" href="/users/1/edit">Slideover xl</ModalLink>
            <ModalLink slideover dusk="slideover-size-2xl" max-width="2xl" href="/users/1/edit">Slideover 2xl</ModalLink>
            <ModalLink slideover dusk="slideover-size-3xl" max-width="3xl" href="/users/1/edit">Slideover 3xl</ModalLink>
            <ModalLink slideover dusk="slideover-size-4xl" max-width="4xl" href="/users/1/edit">Slideover 4xl</ModalLink>
            <ModalLink slideover dusk="slideover-size-5xl" max-width="5xl" href="/users/1/edit">Slideover 5xl</ModalLink>
            <ModalLink slideover dusk="slideover-size-6xl" max-width="6xl" href="/users/1/edit">Slideover 6xl</ModalLink>
            <ModalLink slideover dusk="slideover-size-7xl" max-width="7xl" href="/users/1/edit">Slideover 7xl</ModalLink>
        </div>
    </Container>
</template>
