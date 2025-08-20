<script>
    import Container from './Container.svelte'
    import { ModalLink } from '@inertiaui/modal-svelte'
</script>

<Container>
    <div class="flex justify-between">
        <h2 class="text-lg font-medium text-gray-900">POST Visit</h2>

        <ModalLink href="/data" method="post" data={{'message': 'Hey there!'}} class="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md">
            Open POST Modal
        </ModalLink>
    </div>
</Container>
