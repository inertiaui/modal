<script>
    import { ModalLink } from '@inertiaui/modal-svelte'
    import Container from './Container.svelte'
    import * as InertiaSvelte from '@inertiajs/svelte'

    let {user, deferred} = $props()
</script>

<Container>
    <div class="">
        <p class="text-2xl font-medium text-gray-900">{ user.name }</p>
        <p class="text-xl text-gray-500">{ user.email }</p>
    </div>

    {#if InertiaSvelte.Deferred}
        <InertiaSvelte.Deferred data="deferred">
            {#snippet fallback()}
                Loading...
            {/snippet}

            <p dusk="deferred">{ deferred }</p>
        </InertiaSvelte.Deferred>
    {:else}
        <p dusk="deferred">No Deferred Component</p>
    {/if}

    <ModalLink navigate as="button" dusk={'edit-user-' + user.id}
        href={`/users/${user.id}/edit`}
        class="mt-4 px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-md">
        Edit
    </ModalLink>
</Container>
