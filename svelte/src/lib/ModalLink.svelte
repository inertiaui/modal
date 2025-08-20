<script>
    import { modalPropNames, useModalStack } from './modalStack.svelte.js'
    import { only, rejectNullValues } from './helpers.js'
    import { getConfig } from './config.js'
    import { setContext, onDestroy } from 'svelte'

    let {
        href,
        method = 'get',
        data = {},
        as = 'a',
        headers = {},
        queryStringArrayFormat = 'brackets',
        navigate = null,
        onAfterLeave = null,
        onBlur = null,
        onClose = null,
        onError = null,
        onFocus = null,
        onStart = null,
        onSuccess = null,
        // Modal configuration props (passthrough to Modal)
        closeButton = null,
        closeExplicitly = null,
        maxWidth = null,
        paddingClasses = null,
        panelClasses = null,
        position = null,
        slideover = null,
        children,
        ...restProps
    } = $props()

    let loading = $state(false)
    let modalStack = useModalStack()
    let modalContext = $state(null)
    let isBlurred = false
    let shouldNavigate = $derived(navigate ?? getConfig('navigate'))
    let unsubscribeEventListeners = null

    $effect(() => setContext('modalContext', modalContext))

    $effect(() => {
        if (modalContext) {
            if (modalContext.onTopOfStack && isBlurred) {
                onFocus?.()
            } else if (!modalContext.onTopOfStack && !isBlurred) {
                onBlur?.()
            }

            isBlurred = !modalContext.onTopOfStack
        }
    })

    function handleClose() {
        onClose?.()
    }

    function handleAfterLeave() {
        modalContext = null
        onAfterLeave?.()
    }

    function registerEventListeners() {
        if (modalContext) {
            unsubscribeEventListeners = modalContext.registerEventListenersFromProps(restProps)
        }
    }

    async function handle(e) {
        e?.preventDefault()
        if (loading) return

        if (!href.startsWith('#')) {
            loading = true
            onStart?.()
        }

        try {
            const props = {
                closeButton,
                closeExplicitly,
                maxWidth,
                paddingClasses,
                panelClasses,
                position,
                slideover,
                ...restProps,
            }

            const newModalContext = await modalStack.visit(
                href,
                method,
                data,
                headers,
                rejectNullValues(only(props, modalPropNames)),
                handleClose,
                handleAfterLeave,
                queryStringArrayFormat,
                shouldNavigate,
            )

            modalContext = newModalContext
            registerEventListeners()
            onSuccess?.()
        } catch (error) {
            onError?.(error)
        } finally {
            loading = false
        }
    }

    onDestroy(() => {
        unsubscribeEventListeners?.()
    })

    let componentProps = $derived.by(() => {
        const filtered = {}
        Object.keys(restProps).forEach((key) => {
            if (modalPropNames.includes(key)) return
            if (key.startsWith('on') && typeof restProps[key] === 'function') return
            if (['href', 'method', 'data', 'as', 'headers', 'queryStringArrayFormat', 'navigate'].includes(key)) return

            filtered[key] = restProps[key]
        })
        return filtered
    })
</script>

<svelte:element
    this={as}
    {href}
    {...componentProps}
    onclick={handle}
>
    {@render children?.({ loading })}
</svelte:element>
