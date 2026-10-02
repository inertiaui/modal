<script lang="ts">
    import { lockScroll, markAriaHidden } from '@inertiaui/vanilla'
    import { cubicInOut } from 'svelte/easing'
    import { fade } from 'svelte/transition'
    import { onDestroy, type Snippet } from 'svelte'

    import { getConfig } from './config.js'
    import HeadlessModal from './HeadlessModal.svelte'
    import PanelContent from './PanelContent.svelte'
    import { portal } from './portal.js'
    import type { Modal as ModalInstance } from './modalStack.svelte.js'

    interface HeadlessApi {
        afterLeave: () => void
        close: () => void
        emit: (event: string, ...args: unknown[]) => void
        getChildModal: () => ReturnType<ModalInstance['getChildModal']> | undefined
        getParentModal: () => ReturnType<ModalInstance['getParentModal']> | undefined
        reload: (...args: Parameters<ModalInstance['reload']>) => void
        setOpen: (...args: Parameters<ModalInstance['setOpen']>) => void
    }

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
        onAfterLeave?: () => void
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
        onAfterLeave,
        ...rest
    }: Props = $props()

    let headless = $state<HeadlessApi | undefined>()
    let cleanupScrollLock: (() => void) | null = null
    let cleanupAriaHidden: (() => void) | null = null

    const useNativeDialog = Boolean(getConfig('useNativeDialog'))

    function onSuccessEvent(): void {
        onSuccess?.()

        if (!cleanupScrollLock) {
            cleanupScrollLock = lockScroll()
            cleanupAriaHidden = markAriaHidden(getConfig('appElement') as string)
        }
    }

    function onCloseEvent(): void {
        onClose?.()
        cleanupScrollLock?.()
        cleanupAriaHidden?.()
        cleanupScrollLock = null
        cleanupAriaHidden = null
    }

    onDestroy(() => {
        cleanupScrollLock?.()
        cleanupAriaHidden?.()
    })

    export function afterLeave(): void {
        headless?.afterLeave()
    }

    export function close(): void {
        headless?.close()
    }

    export function emit(event: string, ...args: unknown[]): void {
        headless?.emit(event, ...args)
    }

    export function getChildModal(): ReturnType<ModalInstance['getChildModal']> | undefined {
        return headless?.getChildModal() ?? undefined
    }

    export function getParentModal(): ReturnType<ModalInstance['getParentModal']> | undefined {
        return headless?.getParentModal() ?? undefined
    }

    export function reload(...args: Parameters<ModalInstance['reload']>): void {
        headless?.reload(...args)
    }

    export function setOpen(...args: Parameters<ModalInstance['setOpen']>): void {
        headless?.setOpen(...args)
    }
</script>

<HeadlessModal
    bind:this={headless}
    {name}
    {slideover}
    {closeButton}
    {closeExplicitly}
    {closeOnClickOutside}
    {maxWidth}
    {paddingClasses}
    {panelClasses}
    {position}
    {onFocus}
    {onBlur}
    onClose={onCloseEvent}
    onSuccess={onSuccessEvent}
    {...rest}
>
    {#snippet children(slotProps)}
        <div {@attach portal} data-inertiaui-modal-id={slotProps.id} data-inertiaui-modal-index={slotProps.index} class="im-dialog relative z-20" aria-hidden={!slotProps.onTopOfStack}>
            {#if slotProps.index === 0 && !useNativeDialog && slotProps.isOpen}
                <div class="im-backdrop fixed inset-0 z-30 bg-black/75" transition:fade={{ duration: 300, easing: cubicInOut }}></div>
            {/if}

            <PanelContent
                variant={slotProps.config?.slideover ? 'slideover' : 'modal'}
                modalContext={slotProps.modalContext}
                config={slotProps.config}
                {useNativeDialog}
                isFirstModal={slotProps.index === 0}
                onAfterLeave={() => onAfterLeave?.()}
            >
                {@render children?.(slotProps)}
            </PanelContent>
        </div>
    {/snippet}
</HeadlessModal>
