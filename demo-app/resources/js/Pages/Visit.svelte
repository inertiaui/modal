<script>
    import Container from './Container.svelte'
    import { Modal, ModalLink, visitModal } from '@inertiaui/modal-svelte'
    import { Link } from '@inertiajs/svelte'

    let { navigate = false } = $props()

    function visitEdit() {
        visitModal('/users/1/edit', {
            navigate: true,
            listeners: {
                userGreets(greeting) {
                    alert(greeting)
                }
            }
        })
    }
</script>

<Container>
    <div class="">
        <h2 class="text-lg font-medium text-gray-900">Visit programmatically</h2>
        <div class="flex flex-col items-start">
            <button onclick={() => visitModal('#local')} type="button">
                Open Local Modal
            </button>

            <button onclick={() => visitModal('/data', { method: 'post', data: { message: 'Hi again!' } })} type="button">
                Open Route Modal
            </button>

            <button onclick={visitEdit} type="button">
                Open Route Modal With Navigate
            </button>
        </div>
    </div>

    <div class="mt-8">
        <h2 class="text-lg font-medium text-gray-900">Other stuff</h2>
        <div class="flex flex-col items-start">
            <Link href="/conditionally-redirect?redirect=1" dusk="conditional-redirect">
                Open page that redirects to modal
            </Link>

            <ModalLink {navigate} href="/modal-props-ignore-first-load" dusk="modal-props-ignore-first-load">
                Open Modal with props that ignore first load
            </ModalLink>
        </div>
    </div>
</Container>

<Modal name="local">
    Hi there!
</Modal>
