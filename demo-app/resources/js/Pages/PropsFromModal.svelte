<script>
    import Container from './Container.svelte'
    import { ModalLink } from '@inertiaui/modal-svelte'
</script>

<Container>
    <div class="flex justify-between">
        <h2 class="text-lg font-medium text-gray-900">Prop from Modal</h2>
    </div>

    <ModalLink
        href="/slideover"
        class="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md"
    >
        Open Slideover
    </ModalLink>
</Container>
