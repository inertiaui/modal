<script>
    import { ModalLink } from '@inertiaui/modal-svelte'

    import Container from './Container.svelte'
</script>

<Container>
    <div class="flex justify-between">
        <h2 class="text-lg font-medium text-gray-900">Loading Prop</h2>
    </div>

    <ModalLink data-testid="modal-link" href="/slideover?slow=1" class="rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-600">
        {#snippet children({ loading })}
            {loading ? 'Loading...' : 'Open Slideover'}
        {/snippet}
    </ModalLink>
</Container>
