<script>
    import { Modal, ModalLink } from '@inertiaui/modal-svelte'

    function log(value) {
        console.log(value)
    }
</script>

<Modal
    onSuccess={() => log('success')}
    onBlur={() => log('blur')}
    onFocus={() => log('focus')}
    onClose={() => log('close')}
    onAfterLeave={() => log('after-leave')}
>
    <ModalLink href="/roles/create">
        Create role
    </ModalLink>
</Modal>
