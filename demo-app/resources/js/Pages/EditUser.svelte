<script>
    import axios from 'axios'
    import { onMount, onDestroy } from 'svelte'
    import { Link, useForm } from '@inertiajs/svelte'
    import { Modal, ModalLink } from '@inertiaui/modal-svelte'
    import ComponentThatUsesModalInstance from './ComponentThatUsesModalInstance.svelte'

    let { user, roles, randomKey } = $props()

    const form = useForm({
        name: user.name,
        email: user.email,
        role_id: user.role_id,
    })

    function updateAndRefresh(event) {
        event.preventDefault()
        $form.put(`/users/${user.id}?redirect=edit`)
    }

    let modalRef
    let message = $state('')

    function submit(event) {
        event.preventDefault()
        $form.put(`/users/${user.id}`, {
            onSuccess() {
                modalRef.close()
            }
        })
    }

    function onMessage(msg) {
        message = msg
        modalRef.getChildModal().emit('greeting', `Thanks from ${user.name}`)
    }

    function reloadWithData() {
        modalRef.reload({ only: ['randomKey'], data: { fixedRandomKey: 'from-data' } })
    }

    function reloadWithHeader() {
        modalRef.reload({ only: ['randomKey'], headers: { 'X-Random-Key': 'from-header' } })
    }
</script>

<Modal
    bind:this={modalRef}
    onMessage={onMessage}
>
    {#snippet children({
        afterLeave,
        close,
        reload,
        emit,
        getChildModal,
        getParentModal,
        setOpen,
        id,
        index,
        isOpen,
        config,
        modalContext,
        onTopOfStack,
        shouldRender
    })}
        <div class="">
            <h2 class="text-lg font-medium text-gray-900">Edit User { user.name }</h2>
            <p class="text-sm text-gray-500">Random key: <span dusk="randomKey">{ randomKey }</span></p>
            {#if message}
                <p dusk="message" class="text-sm text-gray-500">{message}</p>
            {/if}
        </div>

        <div class="mt-4 flex flex-col items-start">
            <button type="button" onclick={() => emit('user-greets', 'Hello from EditUser')}>
                Send Message
            </button>

            <button type="button" onclick={reloadWithData}>
                Random Key from Data
            </button>

            <button type="button" onclick={reloadWithHeader}>
                Random Key from Header
            </button>
        </div>

        <form onsubmit={submit} class="mt-8 space-y-6">
            <div class="grid grid-cols-3 gap-6">
                <div class="col-span-6 sm:col-span-3">
                    <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                    <input bind:value={$form.name} type="text" id="name" name="name" autocomplete="off" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    {#if $form.errors?.name}
                        <p class="mt-2 text-sm text-red-600">{$form.errors?.name}</p>
                    {/if}
                </div>

                <div class="col-span-6 sm:col-span-3">
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input bind:value={$form.email} type="email" id="email" name="email" autocomplete="off" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    {#if $form.errors?.email}
                        <p class="mt-2 text-sm text-red-600">{$form.errors?.email}</p>
                    {/if}
                </div>

                <div class="col-span-6 sm:col-span-3">
                    <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
                    <select bind:value={$form.role_id} id="role" name="role" autocomplete="off" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        {#each Object.entries(roles) as [id, role] (id)}
                            <option value={parseInt(id)}>{role}</option>
                        {/each}
                    </select>

                    <ModalLink
                        onClose={reload({ only: ['roles'] })}
                        href="/roles/create" class="mt-2 text-sm text-indigo-600 hover:text-indigo-500 bg-transparent border border-indigo-500 rounded-md py-1 px-2 inline-flex items-center">
                        <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Add Role
                    </ModalLink>
                </div>
            </div>

            <div class="flex justify-end">
                <Link replace href={route('users.edit', { user, navigate: 1, randomKey })}>
                    Edit again!
                </Link>
                <button type="button" onclick={close} class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    Cancel
                </button>
                <button type="button" onclick={updateAndRefresh} class="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Update and refresh
                </button>
                <button type="submit" class="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Save
                </button>
            </div>
        </form>

        <ComponentThatUsesModalInstance />
    {/snippet}
</Modal>
