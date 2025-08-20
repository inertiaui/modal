<script>
    // See: https://github.com/inertiajs/inertia/blob/master/packages/svelte/src/components/WhenVisible.svelte
    import { onMount, onDestroy, getContext } from 'svelte'

    let { data = null, params = null, buffer = 0, as = 'div', always = false, children, fallback } = $props()

    const modalContext = getContext('modalContext')

    if (!modalContext) {
        throw new Error('WhenVisible component must be used inside a Modal component')
    }

    let loaded = $state(false)
    let fetching = $state(false)
    let rootElement = $state(null)
    let observer = null

    function getReloadParams() {
        if (data) {
            return { only: Array.isArray(data) ? data : [data] }
        }

        if (!params) {
            throw new Error('You must provide either a `data` or `params` prop.')
        }

        return params
    }

    function observeElement() {
        if (!rootElement) {
            return
        }

        observer = new IntersectionObserver(
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

                modalContext.reload({
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

        observer.observe(rootElement)
    }

    onMount(() => {
        observeElement()
    })

    onDestroy(() => {
        observer?.disconnect()
    })
</script>

<svelte:element
    this={as}
    bind:this={rootElement}
>
    {#if loaded}
        {@render children?.()}
    {:else}
        {@render fallback?.()}
    {/if}
</svelte:element>
