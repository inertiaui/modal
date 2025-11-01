<script>
    import { useModalStack } from './modalStack.svelte.js'
    import { setContext } from 'svelte'

    let { index } = $props()

    const modalStack = useModalStack()

    let modalContext = $derived(modalStack.stack[index])
    setContext('modalContext', modalContext)

    $effect(() => {
        modalContext = modalStack.stack[index]
    })

    $effect(() => {
        setContext('modalContext', modalContext)
    })

    let Page = $derived(modalContext?.component?.default)

    function handleModalEvent(event, ...args) {
        modalContext?.emit(event.type, ...args)
    }
</script>

{#if Page}
    <Page
        {...modalContext.props}
        onModalEvent={handleModalEvent}
    />
{/if}
