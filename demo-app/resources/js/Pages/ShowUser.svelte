<script>
    import { Deferred } from '@inertiajs/svelte'
    import { ModalLink } from '@inertiaui/modal-svelte'

    import Container from './Container.svelte'

    let { user, deferred } = $props()
</script>

<Container>
    <div>
        <p class="text-2xl font-medium text-gray-900">{user.name}</p>
        <p class="text-xl text-gray-500">{user.email}</p>
    </div>

    <Deferred data="deferred">
        {#snippet fallback()}
            Loading...
        {/snippet}

        <p data-testid="deferred">{deferred}</p>
    </Deferred>

    <ModalLink
        navigate
        as="button"
        data-testid={'edit-user-' + user.id}
        href={`/users/${user.id}/edit`}
        class="mt-4 rounded-md bg-indigo-100 px-3 py-2 text-sm font-medium text-indigo-600"
    >
        Edit
    </ModalLink>
</Container>
