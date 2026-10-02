<script>
    import { Link, useForm } from '@inertiajs/svelte'
    import { Modal, ModalLink, visitModal } from '@inertiaui/modal-svelte'

    import Container from './Container.svelte'

    let { navigate } = $props()

    const testRedirectBackForm = useForm({})

    function visitEdit() {
        visitModal('/users/1/edit', {
            navigate: true,
            listeners: {
                userGreets(greeting) {
                    alert(greeting)
                },
            },
        })
    }

    function testRedirectBack() {
        testRedirectBackForm.post('/test-redirect-back')
    }
</script>

<Container>
    <div>
        <h2 class="text-lg font-medium text-gray-900">Visit programmatically</h2>
        <div class="flex flex-col items-start">
            <button onclick={() => visitModal('#local')} type="button">Open Local Modal</button>

            <button onclick={() => visitModal('/data', { method: 'post', data: { message: 'Hi again!' } })} type="button">Open Route Modal</button>

            <button onclick={visitEdit} type="button">Open Route Modal With Navigate</button>
        </div>
    </div>

    <div class="mt-8">
        <h2 class="text-lg font-medium text-gray-900">Other stuff</h2>
        <div class="flex flex-col items-start">
            <Link href="/conditionally-redirect?redirect=1" data-testid="conditional-redirect"> Open page that redirects to modal </Link>

            <ModalLink {navigate} href="/modal-props-ignore-first-load" data-testid="modal-props-ignore-first-load">
                Open Modal with props that ignore first load
            </ModalLink>
        </div>
    </div>

    <div class="mt-8">
        <p class="text-lg font-medium text-gray-900">Visit Page</p>
        <button data-testid="test-redirect-back" onclick={testRedirectBack} class="mt-2 rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white">
            Test Redirect Back
        </button>
    </div>
</Container>

<Modal name="local"> Hi there! </Modal>
