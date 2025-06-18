<script setup>
import Container from './Container.vue'
import { Modal, ModalLink, visitModal } from '@inertiaui/modal-vue'
import { Link } from '@inertiajs/vue3'

defineProps({
    navigate: Boolean,
})

function visitEdit() {
    visitModal('/users/1/edit', {
        navigate: true,
        listeners: {
            userGreets(greeting) {
                alert(greeting);
            }
        }
    })
}
</script>

<template>
    <Container>
        <div class="">
            <h2 class="text-lg font-medium text-gray-900">Visit programmatically</h2>
            <div class="flex flex-col items-start">
                <button @click="visitModal('#local')" type="button">
                    Open Local Modal
                </button>

                <button @click="visitModal('/data', { method: 'post', data: { message: 'Hi again!' } })" type="button">
                    Open Route Modal
                </button>

                <button @click="visitEdit" type="button">
                    Open Route Modal With Navigate
                </button>
            </div>
        </div>

        <div class="mt-8">
            <h2 class="text-lg font-medium text-gray-900">Other stuff</h2>
            <div class="flex flex-col items-start">
                <Link href="/conditionally-redirect?redirect=1" dusk="conditional-redirect">
                    Open page that redirects to modal
                </Link>

                <ModalLink :navigate href="/modal-props-ignore-first-load" dusk="modal-props-ignore-first-load">
                    Open Modal with props that ignore first load
                </ModalLink>
            </div>
        </div>
    </Container>

    <Modal name="local">
        Hi there!
    </Modal>
</template>