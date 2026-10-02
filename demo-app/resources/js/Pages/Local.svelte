<script>
    import { Modal, ModalLink } from '@inertiaui/modal-svelte'

    import Container from './Container.svelte'

    let modalRef = $state()
</script>

<Container>
    <div class="flex justify-between">
        <h2 class="text-lg font-medium text-gray-900">Local</h2>

        <ModalLink href="#local" class="rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-600"> Open Local Modal </ModalLink>
    </div>
</Container>

<Modal name="local" bind:this={modalRef}>
    {#snippet children({ id })}
        This is a local modal

        <ModalLink href="/roles/create"> Create Role </ModalLink>

        <button onclick={() => modalRef.close()}>Close Modal through Ref</button>

        <button onclick={() => alert(id)}>Alert Modal ID</button>
    {/snippet}
</Modal>
