<script>
    import Container from './Container.svelte'
    import { Modal, ModalLink } from '@inertiaui/modal-svelte'

    let modalRef = $state()

    function closeModal() {
        modalRef.close()
    }

    function alertModalId() {
        alert(modalRef.getId())
    }
</script>

<Container>
    <div class="flex justify-between">
        <h2 class="text-lg font-medium text-gray-900">Local</h2>

        <ModalLink href="#local" class="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md">
            Open Local Modal
        </ModalLink>
    </div>
</Container>

<Modal name="local" bind:this={modalRef}>
    This is a local modal

    <ModalLink href="/roles/create">
        Create Role
    </ModalLink>

    <button onclick={closeModal}>
        Close Modal through Ref
    </button>

    <button onclick={alertModalId}>
        Alert Modal ID
    </button>
</Modal>
