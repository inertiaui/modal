<script setup>
import { Modal } from 'inertiaui/modal';
</script>

<template>
     <Modal
        :close-button="false"
        :close-explicitly="true"
        max-width="2xl"
        padding-classes="p-8"
        panel-classes="bg-red-100 min-h-screen"
        position="left"
        :slideover="true"
     >
        <div class="flex justify-between">
            <h2 class="text-lg font-medium text-gray-900">Slideover with Props</h2>
        </div>
     </Modal>
</template>