<script lang="ts">
    import type { RequestPayload } from '@inertiajs/core'
    import { onDestroy, type Component, type Snippet } from 'svelte'

    import { getConfig } from './config.js'
    import { isStandardDomEvent, only, rejectNullValues } from './helpers.js'
    import { modalPropNames, prefetch as prefetchModal, useModalStack, type HttpMethod, type Modal, type PrefetchOption } from './modalStack.svelte.js'

    interface Props {
        href: string
        method?: HttpMethod
        data?: RequestPayload
        as?: string | Component<Record<string, unknown>>
        headers?: Record<string, string>
        queryStringArrayFormat?: 'brackets' | 'indices'
        navigate?: boolean
        prefetch?: PrefetchOption
        cacheFor?: number
        closeButton?: boolean | null
        closeExplicitly?: boolean | null
        closeOnClickOutside?: boolean | null
        maxWidth?: string | null
        paddingClasses?: string | boolean | null
        panelClasses?: string | boolean | null
        position?: string | null
        slideover?: boolean | null
        children?: Snippet<[{ loading: boolean }]>
        onAfterLeave?: () => void
        onBlur?: () => void
        onClose?: () => void
        onError?: (error: unknown) => void
        onFocus?: () => void
        onStart?: () => void
        onSuccess?: () => void
        onPrefetching?: () => void
        onPrefetched?: () => void
        onclick?: (event: MouseEvent) => void
        onmouseenter?: (event: MouseEvent) => void
        onmouseleave?: (event: MouseEvent) => void
        onmousedown?: (event: MouseEvent) => void
        [key: string]: unknown
    }

    let {
        href,
        method = 'get',
        data = {},
        as = 'a',
        headers = {},
        queryStringArrayFormat = 'brackets',
        navigate,
        prefetch = false,
        cacheFor = 30000,
        closeButton = null,
        closeExplicitly = null,
        closeOnClickOutside = null,
        maxWidth = null,
        paddingClasses = null,
        panelClasses = null,
        position = null,
        slideover = null,
        children,
        onAfterLeave,
        onBlur,
        onClose,
        onError,
        onFocus,
        onStart,
        onSuccess,
        onPrefetching,
        onPrefetched,
        onclick,
        onmouseenter,
        onmouseleave,
        onmousedown,
        ...rest
    }: Props = $props()

    let loading = $state(false)
    let modalContext = $state<Modal | null>(null)
    let isBlurred = false
    let hoverTimeout: ReturnType<typeof setTimeout> | null = null
    const modalStack = useModalStack()
    const shouldNavigate = $derived(navigate ?? (getConfig('navigate') as boolean))
    const As = $derived(typeof as === 'string' ? null : as)

    const prefetchModes = $derived.by(() => {
        if (prefetch === true) {
            return ['hover']
        }

        if (prefetch === false || prefetch == null) {
            return []
        }

        if (Array.isArray(prefetch)) {
            return prefetch
        }

        return [prefetch]
    })

    const domProps = $derived.by(() => {
        const props: Record<string, unknown> = {}

        for (const [key, value] of Object.entries(rest)) {
            if (key.startsWith('on') && typeof value === 'function' && !isStandardDomEvent(key)) {
                continue
            }

            props[key] = value
        }

        return props
    })

    function doPrefetch(): void {
        prefetchModal(href, {
            method,
            data,
            headers,
            queryStringArrayFormat,
            cacheFor,
            onPrefetching: () => onPrefetching?.(),
            onPrefetched: () => onPrefetched?.(),
        })
    }

    function handleMouseEnter(event: MouseEvent): void {
        onmouseenter?.(event)

        if (!prefetchModes.includes('hover')) {
            return
        }

        hoverTimeout = setTimeout(() => {
            doPrefetch()
        }, 75)
    }

    function handleMouseLeave(event: MouseEvent): void {
        onmouseleave?.(event)

        if (hoverTimeout) {
            clearTimeout(hoverTimeout)
            hoverTimeout = null
        }
    }

    function handleMouseDown(event: MouseEvent): void {
        onmousedown?.(event)

        if (!prefetchModes.includes('click') || event.button !== 0) {
            return
        }

        doPrefetch()
    }

    $effect(() => {
        if (prefetchModes.includes('mount')) {
            doPrefetch()
        }
    })

    $effect(() => {
        const onTop = modalContext?.onTopOfStack

        if (!modalContext || onTop === undefined) {
            return
        }

        if (onTop && isBlurred) {
            onFocus?.()
        } else if (!onTop && !isBlurred && modalContext) {
            onBlur?.()
        }

        isBlurred = !onTop
    })

    let announcedModal: Modal | null = null

    $effect(() => {
        const modal = modalContext

        if (!modal) {
            announcedModal = null
            return
        }

        const unsubscribe = modal.registerEventListenersFromAttrs(rest)

        if (announcedModal !== modal) {
            announcedModal = modal
            onSuccess?.()
        }

        return () => {
            unsubscribe()
        }
    })

    onDestroy(() => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout)
        }
    })

    function handleClose(): void {
        onClose?.()
    }

    function handleAfterLeave(): void {
        modalContext = null
        onAfterLeave?.()
    }

    function handle(event: MouseEvent): void {
        event.preventDefault()
        onclick?.(event)

        if (loading) {
            return
        }

        if (!href.startsWith('#')) {
            loading = true
            onStart?.()
        }

        modalStack
            .visit(
                href,
                method,
                data,
                headers,
                rejectNullValues(only({ closeButton, closeExplicitly, closeOnClickOutside, maxWidth, paddingClasses, panelClasses, position, slideover }, modalPropNames)) as Record<
                    string,
                    unknown
                >,
                handleClose,
                handleAfterLeave,
                queryStringArrayFormat,
                shouldNavigate,
            )
            .then((context) => {
                modalContext = context
            })
            .catch((error) => {
                console.error(error)
                onError?.(error)
            })
            .finally(() => {
                loading = false
            })
    }
</script>

{#snippet body()}
    {@render children?.({ loading })}
{/snippet}

{#if typeof as === 'string'}
    <svelte:element
        this={as}
        {href}
        {...domProps}
        onclick={handle}
        onmouseenter={handleMouseEnter}
        onmouseleave={handleMouseLeave}
        onmousedown={handleMouseDown}
    >
        {@render body()}
    </svelte:element>
{:else if As}
    <As
        {href}
        {...domProps}
        onclick={handle}
        onmouseenter={handleMouseEnter}
        onmouseleave={handleMouseLeave}
        onmousedown={handleMouseDown}
    >
        {@render body()}
    </As>
{/if}
