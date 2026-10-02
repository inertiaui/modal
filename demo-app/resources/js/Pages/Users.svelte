<script>
    import { Deferred, Link, useForm } from '@inertiajs/svelte'
    import { ModalLink } from '@inertiaui/modal-svelte'

    import CustomButton from '../Components/CustomButton.svelte'
    import ComponentThatUsesModalInstance from './ComponentThatUsesModalInstance.svelte'
    import Container from './Container.svelte'

    let { users, random, navigate, deferred } = $props()

    const testRedirectBackForm = useForm({})
    const testModalHeaderForm = useForm({})

    let sawInitialProps = false

    $effect(() => {
        void users
        void random
        void navigate
        void deferred

        if (!sawInitialProps) {
            sawInitialProps = true
            return
        }

        window.__pageUpdateCount = (window.__pageUpdateCount ?? 0) + 1
    })

    function alertGreeting(greeting) {
        alert(greeting)
    }

    function testRedirectBack() {
        testRedirectBackForm.post('/test-redirect-back')
    }

    function testModalHeaderCheck() {
        testModalHeaderForm.post('/test-modal-header-check')
    }
</script>

<Container>
    <div class="flex justify-between">
        <h2 class="text-lg font-medium text-gray-900">Users</h2>
        <Deferred data="deferred">
            {#snippet fallback()}
                Loading...
            {/snippet}

            <p data-testid="deferred">{deferred}</p>
        </Deferred>
    </div>

    <div class="mt-6 overflow-hidden bg-white shadow sm:rounded-md">
        <ul class="divide-y divide-gray-200">
            {#each users as user (user.id)}
                <li class="flex items-center justify-between px-6 py-4 hover:bg-gray-50">
                    <div class="flex w-full items-center">
                        <div>
                            <div class="text-sm font-medium text-gray-900">{user.name}</div>
                            <div class="text-sm text-gray-500">{user.email}</div>
                        </div>
                        <div class="ml-auto flex items-center space-x-2">
                            <Link
                                href={`/users/${user.id}`}
                                data-testid={'view-user-' + user.id}
                                class="rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-600"
                            >
                                View
                            </Link>
                            <ModalLink
                                {navigate}
                                data-testid={'edit-user-' + user.id}
                                href={`/users/${user.id}/edit`}
                                class="rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-600"
                                onUserGreets={alertGreeting}
                            >
                                Edit
                            </ModalLink>
                            <ModalLink
                                slideover
                                {navigate}
                                data-testid={'slideover-user-' + user.id}
                                href={`/users/${user.id}/edit`}
                                class="rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-600"
                                onUserGreets={alertGreeting}
                            >
                                Slideover
                            </ModalLink>
                            <ModalLink as={CustomButton} {navigate} data-testid={'custom-button-user-' + user.id} href={`/users/${user.id}/edit`}>
                                Custom
                            </ModalLink>
                        </div>
                    </div>
                </li>
            {/each}
        </ul>
    </div>
    <ComponentThatUsesModalInstance />

    <div class="mt-4 flex space-x-4">
        <button data-testid="test-redirect-back" onclick={testRedirectBack} class="rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white">
            Test Redirect Back
        </button>
        <button data-testid="test-modal-header-check" onclick={testModalHeaderCheck} class="rounded-md bg-orange-600 px-3 py-2 text-sm font-medium text-white">
            Check Modal Header
        </button>
        <Link data-testid="nav-visit" href="/visit" class="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white"> Go to Visit Page </Link>
        <ModalLink {navigate} href="/modal-with-modal-base" class="rounded-md bg-purple-600 px-3 py-2 text-sm font-medium text-white">
            Modal with Modal Base
        </ModalLink>
        <ModalLink {navigate} href="/modal-invalid-response" class="rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white">
            Invalid Response
        </ModalLink>
    </div>
</Container>
