<script>
    import { Link, useForm } from '@inertiajs/svelte'
    import { Modal, ModalLink } from '@inertiaui/modal-svelte'
    import { untrack } from 'svelte'

    import ComponentThatUsesModalInstance from './ComponentThatUsesModalInstance.svelte'

    let { user, roles, randomKey } = $props()

    const form = useForm(
        untrack(() => ({
            name: user.name,
            email: user.email,
            role_id: user.role_id == null ? user.role_id : String(user.role_id),
        })),
    )

    let modalRef = $state()
    let message = $state('')

    function updateAndRefresh() {
        form.put(`/users/${user.id}?redirect=edit`)
    }

    function submit(event) {
        event.preventDefault()

        form.put(`/users/${user.id}`, {
            onSuccess() {
                modalRef.close()
            },
        })
    }

    function onMessage(nextMessage) {
        message = nextMessage
        modalRef.getChildModal().emit('greeting', `Thanks from ${user.name}`)
    }

    function reloadWithData() {
        modalRef.reload({ only: ['randomKey'], data: { fixedRandomKey: 'from-data' } })
    }

    function reloadWithHeader() {
        modalRef.reload({ only: ['randomKey'], headers: { 'X-Random-Key': 'from-header' } })
    }
</script>

<Modal bind:this={modalRef} {onMessage}>
    {#snippet children({ close, reload, emit })}
        <div>
            <h2 class="text-lg font-medium text-gray-900">Edit User {user.name}</h2>
            <p class="text-sm text-gray-500">
                Random key: <span data-testid="randomKey">{randomKey}</span>
            </p>
            {#if message}
                <p data-testid="message" class="text-sm text-gray-500">{message}</p>
            {/if}
        </div>

        <div class="mt-4 flex flex-col items-start">
            <button type="button" onclick={() => emit('user-greets', 'Hello from EditUser')}>Send Message</button>

            <button type="button" onclick={reloadWithData}>Random Key from Data</button>

            <button type="button" onclick={reloadWithHeader}>Random Key from Header</button>
        </div>

        <form onsubmit={submit} class="mt-8 space-y-6">
            <div class="grid grid-cols-3 gap-6">
                <div class="col-span-6 sm:col-span-3">
                    <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        bind:value={form.name}
                        type="text"
                        id="name"
                        name="name"
                        autocomplete="off"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {#if form.errors.name}
                        <p class="mt-2 text-sm text-red-600">{form.errors.name}</p>
                    {/if}
                </div>

                <div class="col-span-6 sm:col-span-3">
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        bind:value={form.email}
                        type="email"
                        id="email"
                        name="email"
                        autocomplete="off"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {#if form.errors.email}
                        <p class="mt-2 text-sm text-red-600">{form.errors.email}</p>
                    {/if}
                </div>

                <div class="col-span-6 sm:col-span-3">
                    <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
                    <select
                        bind:value={form.role_id}
                        id="role"
                        name="role"
                        autocomplete="off"
                        class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-xs focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                    >
                        {#each Object.entries(roles) as [id, role] (id)}
                            <option value={id}>{role}</option>
                        {/each}
                    </select>

                    <ModalLink
                        onClose={() => reload({ only: ['roles'] })}
                        href="/roles/create"
                        class="mt-2 inline-flex items-center rounded-md border border-indigo-500 bg-transparent px-2 py-1 text-sm text-indigo-600 hover:text-indigo-500"
                    >
                        <svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Add Role
                    </ModalLink>
                </div>
            </div>

            <div class="flex justify-end">
                <Link replace href={`/users/${user.id}/edit?navigate=1&randomKey=${randomKey}`}> Edit again! </Link>
                <button
                    type="button"
                    onclick={close}
                    class="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onclick={updateAndRefresh}
                    class="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                >
                    Update and refresh
                </button>
                <button
                    type="submit"
                    class="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                >
                    Save
                </button>
            </div>
        </form>

        <ComponentThatUsesModalInstance />
    {/snippet}
</Modal>
