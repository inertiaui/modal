<script>
    import Container from './Container.svelte'
    import { ModalLink } from '@inertiaui/modal-svelte'

    let { users = {} } = $props()
</script>

<Container>
    <div class="flex justify-between">
        <h2 class="text-lg font-medium text-gray-900">Prop from ModalLink</h2>
    </div>

    <ModalLink
        href="/users/1/edit"
        class="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md"
        closeButton={false}
        closeExplicitly={true}
        maxWidth="2xl"
        paddingClasses="p-8"
        panelClasses="bg-red-100 min-h-screen"
        position="left"
        slideover={true}
    >
        Edit User 1
    </ModalLink>
</Container>
