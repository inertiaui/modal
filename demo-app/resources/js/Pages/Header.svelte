<script>
    import Container from './Container.svelte'
    import { ModalLink } from '@inertiaui/modal-svelte'
</script>

<Container>
    <div class="flex justify-between">
        <h2 class="text-lg font-medium text-gray-900">Header</h2>
    </div>

    <ModalLink
        dusk="modal-link"
        href="/roles/create"
        headers={{ 'X-Test-Header': 'Test Header Value' }}
    >
        Open Modal
    </ModalLink>
</Container>
