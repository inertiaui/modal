<script>
    import Container from './Container.svelte'
    import { ModalLink } from '@inertiaui/modal-svelte'
    import { page } from '@inertiajs/svelte'

    let { navigate = false } = $props()

    let log = $state([])

    function push(value) {
        log.push(value)
    }
</script>

<Container>
    <div class="flex justify-between">
        <h2 class="text-lg font-medium text-gray-900">Events</h2>

        <p>Page ID: {$page.props._inertiaui_modal_page_id}</p>

        <p dusk="log">{log.join(',')}</p>
    </div>

    <ModalLink
        {navigate}
        dusk="modal-link"
        href="/users/1/edit"
        class="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md"
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
