<script>
    import { Modal, visitModal } from '@inertiaui/modal-svelte'

    import Container from './Container.svelte'
</script>

<Container>
    <div class="flex flex-col items-start gap-4">
        <h2 class="text-lg font-medium text-gray-900">Local Modal with Props</h2>

        <button
            onclick={() =>
                visitModal('#local-props', {
                    props: {
                        message: 'Hello from props!',
                        count: 42,
                    },
                })}
            data-testid="open-with-props"
        >
            Open Local Modal with Props
        </button>
    </div>
</Container>

<Modal name="local-props">
    {#snippet children({ message, count })}
        <div class="p-4">
            <p data-testid="modal-message">{message}</p>
            <p data-testid="modal-count">{count}</p>
        </div>
    {/snippet}
</Modal>
