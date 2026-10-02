<script>
    import { Modal } from '@inertiaui/modal-svelte'

    let { message } = $props()
</script>

<Modal>
    <p data-testid="message">{message}</p>
</Modal>
