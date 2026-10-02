<script>
    import { page } from '@inertiajs/svelte'
    import { ModalLink } from '@inertiaui/modal-svelte'

    import Container from './Container.svelte'

    let { navigate } = $props()

    let log = $state([])

    function push(value) {
        log = [...log, value]
    }
</script>

<Container>
    <div class="flex justify-between">
        <h2 class="text-lg font-medium text-gray-900">Events</h2>

        <p>Page ID: {page.props._inertiaui_modal_page_id}</p>

        <p data-testid="log">{log.join(',')}</p>
    </div>

    <ModalLink
        {navigate}
        data-testid="modal-link"
        href="/users/1/edit"
        class="rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-600"
        onClose={() => push('close')}
        onFocus={() => push('focus')}
        onAfterLeave={() => push('after-leave')}
        onBlur={() => push('blur')}
        onStart={() => push('start')}
        onSuccess={() => push('success')}
    >
        Open Modal
    </ModalLink>
</Container>
