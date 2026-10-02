<script lang="ts">
    import { setModalContext } from './context.js'
    import { useModalStack } from './modalStack.svelte.js'

    interface Props {
        index: number
    }

    let { index }: Props = $props()

    const modalStack = useModalStack()

    setModalContext({
        getModal: () => modalStack.stack[index] ?? null,
    })

    const modal = $derived(modalStack.stack[index])
    const Page = $derived(modal?.component)
</script>

{#if Page}
    <Page {...modal?.props ?? {}} />
{/if}
