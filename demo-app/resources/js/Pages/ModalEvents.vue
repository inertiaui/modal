<script setup>
import { Modal, ModalLink } from '@inertiaui/modal-vue'

function log(value) {
    console.log(value)
}
</script>

<template>
    <Modal
        @success="log('success')"
        @blur="log('blur')"
        @focus="log('focus')"
        @close="log('close')"
        @after-leave="log('after-leave')"
    >
        <ModalLink href="/roles/create">
            Create role
        </ModalLink>
    </Modal>
</template>
