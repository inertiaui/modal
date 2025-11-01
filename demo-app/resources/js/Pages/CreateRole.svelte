<script>
    import { useForm } from '@inertiajs/svelte'
    import axios from 'axios'
    import { Modal, ModalLink } from '@inertiaui/modal-svelte'
    import ComponentThatUsesModalInstance from './ComponentThatUsesModalInstance.svelte'

    let { headerValue, name } = $props()

    const form = useForm({
        name: '',
    })

    let modalRef
    let greeting = $state('')

    function submit(event) {
        event.preventDefault()
        axios.post('/roles', $form.data()).then(() => modalRef.close())
    }

    function onGreeting(event) {
        greeting = event
    }
</script>

<Modal
    bind:this={modalRef}
    onGreeting={onGreeting}
>
    {#snippet children({ close, getParentModal })}
        <div class="">
            <h2 class="text-lg font-medium text-gray-900">Create Role</h2>
            {#if greeting}
                <p
                    dusk="greeting"
                    class="text-sm text-gray-500"
                >
                    {greeting}
                </p>
            {/if}
            {#if headerValue}
                <p
                    dusk="headerValue"
                    class="text-sm text-gray-500"
                >
                    {headerValue}
                </p>
            {/if}
            {#if name}
                <p
                    dusk="name"
                    class="text-sm text-gray-500"
                >
                    {name}
                </p>
            {/if}
        </div>

        <button type="button" onclick={() => getParentModal().emit('message', 'Hello from child')}>
            Push message to parent
        </button>

        <form
            class="mt-8 space-y-6"
            onsubmit={submit}
        >
            <div class="grid grid-cols-3 gap-6">
                <div class="col-span-6 sm:col-span-3">
                    <label
                        for="name"
                        class="block text-sm font-medium text-gray-700"
                    >
                        Name
                    </label>
                    <input
                        id="name"
                        bind:value={$form.name}
                        type="text"
                        name="name"
                        autocomplete="off"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {#if $form.errors.name}
                        <p class="mt-2 text-sm text-red-600">
                            {$form.errors.name}
                        </p>
                    {/if}
                </div>
            </div>

            <div class="flex items-center justify-end">
                <ModalLink maxWidth="sm" href="#another-local-modal" class="mr-auto text-sm text-pink-500">
                    What's that?
                </ModalLink>

                <button
                    type="button"
                    class="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    onclick={close}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    class="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Save
                </button>
            </div>
        </form>

        <Modal name="another-local-modal">
             Hawaiian noises?
        </Modal>

        <ComponentThatUsesModalInstance />
    {/snippet}
</Modal>
