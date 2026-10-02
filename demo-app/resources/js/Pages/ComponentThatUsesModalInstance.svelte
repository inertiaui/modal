<script>
    import { useModal } from '@inertiaui/modal-svelte'

    const modal = useModal()

    if (modal) {
        console.log(modal.props.roles)
    }
</script>

{#if modal}
    <div>
        <button onclick={() => modal.close()}>Close Modal with index {modal.index}</button>
    </div>
{/if}
