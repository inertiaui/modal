<script lang="ts">
    import type { Snippet } from 'svelte'

    import useModal from './useModal.js'

    interface Props {
        data: string | string[]
        children?: Snippet
        fallback?: Snippet
    }

    let { data, children, fallback }: Props = $props()

    const modal = useModal()

    if (!modal) {
        throw new Error('Deferred component must be used inside a Modal component')
    }

    const keys = $derived(Array.isArray(data) ? data : [data])
    const allKeysAreAvailable = $derived(keys.every((key) => modal.props[key] !== undefined))
</script>

{#if allKeysAreAvailable}
    {@render children?.()}
{:else}
    {@render fallback?.()}
{/if}
