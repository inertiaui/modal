<script>
    import { ModalLink } from '@inertiaui/modal-svelte'

    import Container from './Container.svelte'
</script>

<Container>
    <div class="flex justify-between">
        <h2 class="text-lg font-medium text-gray-900">Prop from Modal</h2>
    </div>

    <ModalLink href="/slideover" class="rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-600"> Open Slideover </ModalLink>
</Container>
