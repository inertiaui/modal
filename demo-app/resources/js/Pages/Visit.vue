<script setup>
import Container from './Container.vue'
import { Modal, ModalLink, visitModal } from '@inertiaui/modal-vue'
import { Link, useForm } from '@inertiajs/vue3'

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

const testRedirectBackForm = useForm({});
function testRedirectBack() {
    testRedirectBackForm.post('/test-redirect-back');
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

        <div class="mt-8">
            <p class="text-lg font-medium text-gray-900">Visit Page</p>
            <button
                dusk="test-redirect-back"
                @click="testRedirectBack"
                class="mt-2 px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md"
            >
                Test Redirect Back
            </button>
        </div>
    </Container>

    <Modal name="local">
        Hi there!
    </Modal>
</template>