<script>
    import { Modal } from '@inertiaui/modal-svelte'

    let { message } = $props()
</script>

<Modal>
    <p dusk="message">{ message }</p>
</Modal>
