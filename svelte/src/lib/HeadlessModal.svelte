<script>
    import { getContext, onDestroy } from 'svelte'
    import { getConfig as getConfigOuter, getConfigByType } from './config.js'
    import { useModalStack } from './modalStack.svelte.js'
    import ModalRenderer from './ModalRenderer.svelte'

    let {
        name = null,
        slideover = null,
        closeButton = null,
        closeExplicitly = null,
        maxWidth = null,
        paddingClasses = null,
        panelClasses = null,
        position = null,
        onFocus,
        onBlur,
        onClose,
        onSuccess,
        children,
        ...restProps
    } = $props()

    const modalStack = useModalStack()
    let localModalContext = $state({})
    let modalContext = $state(name ? localModalContext : getContext('modalContext'))
    let unsubscribeEventListeners = null

    let config = $derived.by(() => {
        const isSlideover = modalContext?.config?.slideover ?? slideover ?? getConfigOuter('type') === 'slideover'

        return {
            slideover: isSlideover,
            closeButton: closeButton ?? getConfigByType(isSlideover, 'closeButton'),
            closeExplicitly: closeExplicitly ?? getConfigByType(isSlideover, 'closeExplicitly'),
            maxWidth: maxWidth ?? getConfigByType(isSlideover, 'maxWidth'),
            paddingClasses: paddingClasses ?? getConfigByType(isSlideover, 'paddingClasses'),
            panelClasses: panelClasses ?? getConfigByType(isSlideover, 'panelClasses'),
            position: position ?? getConfigByType(isSlideover, 'position'),
            ...(modalContext?.config || {}),
        }
    })

    let nextIndex = $derived.by(() => {
        if (!modalContext) return null
        return modalStack.stack.find((m) => m.shouldRender && m.index > modalContext.index)?.index
    })

    if (name) {
        modalStack.registerLocalModal(name, (context) => {
            modalContext = context
            unsubscribeEventListeners = context.registerEventListenersFromProps(restProps)
        })
    }

    $effect(() => {
        if (!name && modalContext) {
            unsubscribeEventListeners = modalContext.registerEventListenersFromProps(restProps)
        }
    })

    onDestroy(() => {
        if (name) {
            modalStack.removeLocalModal(name)
        }
        unsubscribeEventListeners?.()
    })

    let previousOnTopOfStack = false
    $effect(() => {
        if (modalContext.onTopOfStack && !previousOnTopOfStack) {
            onFocus?.()
        } else if (!modalContext.onTopOfStack && previousOnTopOfStack) {
            onBlur?.()
        }

        previousOnTopOfStack = modalContext.onTopOfStack
    })

    $effect(() => {
        if (modalContext.isOpen) {
            onSuccess?.()
        } else {
            onClose?.()
        }
    })

    export function afterLeave() {
        return modalContext?.afterLeave()
    }

    export function close() {
        return modalContext?.close()
    }

    export function emit(...args) {
        return modalContext?.emit(...args)
    }

    export function getChildModal() {
        return modalContext?.getChildModal()
    }

    export function getParentModal() {
        return modalContext?.getParentModal()
    }

    export function reload(...args) {
        return modalContext?.reload(...args)
    }

    export function setOpen(...args) {
        return modalContext?.setOpen(...args)
    }

    export function getId() {
        return modalContext?.id
    }

    export function getIndex() {
        return modalContext?.index
    }

    export function getIsOpen() {
        return modalContext?.isOpen
    }

    export function getConfig() {
        return config
    }

    export function getModalContext() {
        return modalContext
    }

    export function getOnTopOfStack() {
        return modalContext?.onTopOfStack || false
    }

    export function getShouldRender() {
        return modalContext?.shouldRender
    }
</script>

{#if modalContext?.shouldRender}
    {@render children({
        afterLeave: modalContext.afterLeave,
        close: modalContext.close,
        config,
        emit: modalContext.emit,
        getChildModal: modalContext.getChildModal,
        getParentModal: modalContext.getParentModal,
        id: modalContext.id,
        index: modalContext.index,
        isOpen: modalContext.isOpen,
        modalContext: modalContext,
        onTopOfStack: modalContext.onTopOfStack,
        reload: modalContext.reload,
        setOpen: modalContext.setOpen,
        shouldRender: modalContext.shouldRender,
    })}

    <!-- The next modal in the stack -->
    {#if nextIndex}
        <ModalRenderer index={nextIndex} />
    {/if}
{/if}
