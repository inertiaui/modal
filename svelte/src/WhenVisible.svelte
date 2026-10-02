<script lang="ts">
    import type { Snippet } from 'svelte'

    import type { ReloadOptions } from './modalStack.svelte.js'
    import useModal from './useModal.js'

    interface Props {
        data?: string | string[]
        params?: ReloadOptions
        buffer?: number
        as?: string
        always?: boolean
        children?: Snippet
        fallback?: Snippet
    }

    let { data, params, buffer = 0, as = 'div', always = false, children, fallback }: Props = $props()

    const modal = useModal()

    if (!modal) {
        throw new Error('WhenVisible component must be used inside a Modal component')
    }

    let loaded = $state(false)
    let fetching = false

    function getReloadParams(): ReloadOptions {
        if (data) {
            return { only: Array.isArray(data) ? data : [data] }
        }

        if (!params) {
            throw new Error('You must provide either a `data` or `params` prop.')
        }

        return params
    }

    function observeElement(node: HTMLElement): () => void {
        const observer = new IntersectionObserver(
            (entries) => {
                if (!entries[0].isIntersecting) {
                    return
                }

                if (!always) {
                    observer.disconnect()
                }

                if (fetching) {
                    return
                }

                fetching = true
                const reloadParams = getReloadParams()

                modal.reload({
                    ...reloadParams,
                    onStart: () => {
                        fetching = true
                        reloadParams.onStart?.()
                    },
                    onFinish: () => {
                        loaded = true
                        fetching = false
                        reloadParams.onFinish?.()
                    },
                })
            },
            { rootMargin: `${buffer}px` },
        )

        observer.observe(node)

        return () => observer.disconnect()
    }
</script>

<svelte:element this={as} {@attach observeElement}>
    {#if loaded}
        {@render children?.()}
    {:else}
        {@render fallback?.()}
    {/if}
</svelte:element>
