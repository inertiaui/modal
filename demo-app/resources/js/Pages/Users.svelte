<script>
    import { Link } from '@inertiajs/svelte'
    import { ModalLink } from '@inertiaui/modal-svelte'
    import * as InertiaSvelte from '@inertiajs/svelte'
    import ComponentThatUsesModalInstance from './ComponentThatUsesModalInstance.svelte'
    import Container from './Container.svelte'
    import { onMount } from 'svelte'

    let { users, random, navigate, deferred } = $props()

    const rand = () => Math.floor(Math.random() * 100000) + 1
    let stateA = $state(rand())
    let stateB = $state(rand())

    onMount(() => {
        stateB = rand()
    })

    function alertGreeting(greeting) {
        alert(greeting)
    }
</script>


<Container>
    <div class="flex justify-between">
        <h2 class="text-lg font-medium text-gray-900">Users</h2>
        <!-- <p dusk="state-a">S: {{ random }}</p>
        <p dusk="state-a">A: {{ stateA }}</p>
        <p dusk="state-b">B: {{ stateB }}</p> -->
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
    </div>

    <div class="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
        <ul class="divide-y divide-gray-200">
            {#each users as user (user.id)}
                <li class="flex items-center justify-between py-4 px-6 hover:bg-gray-50">
                    <div class="flex items-center w-full">
                        <div class="">
                            <div class="text-sm font-medium text-gray-900">{ user.name }</div>
                            <div class="text-sm text-gray-500">{ user.email }</div>
                        </div>
                        <div class="ml-auto flex items-center space-x-2">
                            <Link href={`/users/${user.id}`} class="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md">View</Link>
                            <ModalLink
                                navigate={navigate}
                                dusk={`edit-user-${user.id}`}
                                href={`/users/${user.id}/edit`}
                                class="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md"
                                onUserGreets={alertGreeting}
                            >
                                Edit
                            </ModalLink>
                            <ModalLink
                                slideover
                                navigate={navigate}
                                dusk={`slideover-user-${user.id}`}
                                href={`/users/${user.id}/edit`}
                                class="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md"
                                onUserGreets={alertGreeting}
                            >
                                Slideover
                            </ModalLink>
                        </div>
                    </div>
                </li>
            {/each}
        </ul>
    </div>

    <ComponentThatUsesModalInstance />
</Container>
