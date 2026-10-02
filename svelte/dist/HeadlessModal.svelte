<script lang="ts">
    import { type Snippet } from 'svelte'

    import { getConfig, getConfigByType } from './config.js'
    import { getModalContext, setModalContext, type ModalContextValue } from './context.js'
    import ModalRenderer from './ModalRenderer.svelte'
    import { useModalStack, type Modal } from './modalStack.svelte.js'

    interface Props {
        name?: string
        slideover?: boolean
        closeButton?: boolean
        closeExplicitly?: boolean
        closeOnClickOutside?: boolean
        maxWidth?: string
        paddingClasses?: string | boolean
        panelClasses?: string | boolean
        position?: string
        children?: Snippet<[any]>
        onFocus?: () => void
        onBlur?: () => void
        onClose?: () => void
        onSuccess?: () => void
        [key: string]: unknown
    }

    let {
        name,
        slideover,
        closeButton,
        closeExplicitly,
        closeOnClickOutside,
        maxWidth,
        paddingClasses,
        panelClasses,
        position,
        children,
        onFocus,
        onBlur,
        onClose,
        onSuccess,
        ...rest
    }: Props = $props()

    const modalStack = useModalStack()

    let parentContext: ModalContextValue | null = null

    try {
        parentContext = getModalContext()
    } catch {
        parentContext = null
    }

    let localModal = $state<Modal | null>(null)

    function resolveModal(): Modal | null {
        if (name) {
            return localModal
        }

        return parentContext?.getModal() ?? null
    }

    setModalContext({
        getModal: resolveModal,
    })

    const resolvedConfig = $derived.by(() => {
        const modal = resolveModal()
        const isSlideover = Boolean(modal?.config?.slideover ?? slideover ?? getConfig('type') === 'slideover')

        return {
            slideover: isSlideover,
            closeButton: (closeButton ?? getConfigByType(isSlideover, 'closeButton')) as boolean,
            closeExplicitly: (closeExplicitly ?? getConfigByType(isSlideover, 'closeExplicitly')) as boolean,
            closeOnClickOutside: (closeOnClickOutside ?? getConfigByType(isSlideover, 'closeOnClickOutside')) as boolean,
            maxWidth: (maxWidth ?? getConfigByType(isSlideover, 'maxWidth')) as string,
            paddingClasses: (paddingClasses ?? getConfigByType(isSlideover, 'paddingClasses')) as string,
            panelClasses: (panelClasses ?? getConfigByType(isSlideover, 'panelClasses')) as string,
            position: (position ?? getConfigByType(isSlideover, 'position')) as string,
            ...modal?.config,
        }
    })

    $effect(() => {
        if (!name) {
            return
        }

        const modalName = name
        modalStack.registerLocalModal(modalName, (context) => {
            localModal = context
        })

        return () => {
            modalStack.removeLocalModal(modalName)
        }
    })

    $effect(() => {
        const modal = resolveModal()

        if (!modal) {
            return
        }

        return modal.registerEventListenersFromAttrs(rest)
    })

    let previousIsOpen: boolean | undefined
    let previousOnTop: boolean | undefined

    $effect(() => {
        const modal = resolveModal()

        if (!modal) {
            return
        }

        const isOpen = modal.isOpen

        if (isOpen && previousIsOpen !== true) {
            onSuccess?.()
        } else if (!isOpen && previousIsOpen === true) {
            onClose?.()
        }

        previousIsOpen = isOpen
    })

    $effect(() => {
        const modal = resolveModal()

        if (!modal) {
            return
        }

        const onTop = modal.onTopOfStack

        if (previousOnTop === undefined) {
            previousOnTop = onTop
            return
        }

        if (onTop && !previousOnTop) {
            onFocus?.()
        } else if (!onTop && previousOnTop) {
            onBlur?.()
        }

        previousOnTop = onTop
    })

    const nextIndex = $derived.by(() => {
        const modal = resolveModal()

        if (!modal) {
            return undefined
        }

        return modalStack.stack.find((item) => item.shouldRender && item.index > modal.index)?.index
    })

    export function emit(event: string, ...args: unknown[]): void {
        resolveModal()?.emit(event, ...args)
    }

    export function afterLeave(): void {
        resolveModal()?.afterLeave()
    }

    export function close(): void {
        resolveModal()?.close()
    }

    export function reload(...args: Parameters<Modal['reload']>): void {
        resolveModal()?.reload(...args)
    }

    export function setOpen(open: boolean): void {
        resolveModal()?.setOpen(open)
    }

    export function getChildModal(): Modal | null | undefined {
        return resolveModal()?.getChildModal()
    }

    export function getParentModal(): Modal | null | undefined {
        return resolveModal()?.getParentModal()
    }
</script>

{#if resolveModal()?.shouldRender}
    {@const modal = resolveModal()}
    {#if modal}
        {@render children?.({
            ...modal.props,
            id: modal.id,
            afterLeave: modal.afterLeave,
            close: modal.close,
            config: resolvedConfig,
            emit: modal.emit,
            getChildModal: modal.getChildModal,
            getParentModal: modal.getParentModal,
            index: modal.index,
            isOpen: modal.isOpen,
            modalContext: modal,
            onTopOfStack: modal.onTopOfStack,
            reload: modal.reload,
            setOpen: modal.setOpen,
            shouldRender: modal.shouldRender,
        })}
    {/if}
{/if}

{#if nextIndex !== undefined}
    <ModalRenderer index={nextIndex} />
{/if}
