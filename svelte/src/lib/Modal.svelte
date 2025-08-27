<script>
    import { createDialog, melt } from '@melt-ui/svelte'
    import HeadlessModal from './HeadlessModal.svelte'
    import ModalContent from './ModalContent.svelte'
    import SlideoverContent from './SlideoverContent.svelte'
    import { fade } from 'svelte/transition'
    import { getConfig, getConfigByType } from './config.js'
    import { getContext } from 'svelte'

    let {
        name = null,
        onFocus = null,
        onBlur = null,
        onClose = null,
        onSuccess = null,
        slideover = null,
        closeButton = null,
        closeExplicitly = null,
        maxWidth = null,
        paddingClasses = null,
        panelClasses = null,
        position = null,
        children,
        ...rest
    } = $props()

    let headlessModal
    const Content = $derived(headlessModal?.getConfig().slideover ? SlideoverContent : ModalContent)

    const handleOpenChange = open => {
        if(open.next === false) {
            headlessModal?.close()
        }
    }

    const modalContext = getContext('modalContext')
    const isSlideover = modalContext?.config?.slideover ?? slideover ?? getConfig('type') === 'slideover'
    const closeExplicitlyConfig = closeExplicitly ?? getConfigByType(isSlideover, 'closeExplicitly')

    const { elements: { portalled, overlay, content } } = createDialog({
        forceVisible: true,
        closeOnOutsideClick: closeExplicitlyConfig !== true,
        escapeBehavior: closeExplicitlyConfig ? 'ignore' : 'close',
        onOpenChange: handleOpenChange
    })

    // Expose methods from HeadlessModal
    export function getId() {
        return headlessModal?.getId()
    }

    export function afterLeave() {
        return headlessModal?.afterLeave()
    }

    export function close() {
        return headlessModal?.close()
    }

    export function emit(...args) {
        return headlessModal?.emit(...args)
    }

    export function getChildModal() {
        return headlessModal?.getChildModal()
    }

    export function getParentModal() {
        return headlessModal?.getParentModal()
    }

    export function reload(...args) {
        return headlessModal?.reload(...args)
    }

    export function setOpen(...args) {
        return headlessModal?.setOpen(...args)
    }
</script>

<HeadlessModal
    bind:this={headlessModal}
    {name}
    {slideover}
    {closeButton}
    {closeExplicitly}
    {maxWidth}
    {paddingClasses}
    {panelClasses}
    {position}
    {onFocus}
    {onBlur}
    {onClose}
    {onSuccess}
    {...rest}
>
    {#snippet children({
        afterLeave,
        close,
        emit,
        getChildModal,
        getParentModal,
        reload,
        setOpen,
        id,
        index,
        isOpen,
        config,
        modalContext,
        onTopOfStack,
        shouldRender,
    })}
        {#if isOpen}
            <div
                use:melt={$portalled}
                class="im-dialog relative z-20"
                data-inertiaui-modal-id={id}
                data-inertiaui-modal-index={index}
                transition:fade={{ duration: 300 }}
                onoutroend={afterLeave}
                aria-hidden={!onTopOfStack}
            >
                <!-- Only transition the backdrop for the first modal in the stack -->
                {#if index === 0 && onTopOfStack}
                    <div
                        use:melt={$overlay}
                        class="im-backdrop fixed inset-0 z-30 bg-black/75"
                        transition:fade|global={{ duration: 300 }}
                    ></div>
                {/if}

                <!-- On multiple modals, only show a backdrop for the modal that is on top of the stack -->
                {#if index > 0 && onTopOfStack}
                    <div class="im-backdrop fixed inset-0 z-30 bg-black/75"></div>
                {/if}

                <!-- The modal/slideover content itself -->
                <Content
                    {modalContext}
                    {config}
                    onoutroend={afterLeave}
                >
                    <div use:melt={$content}>
                        {@render children({
                            afterLeave,
                            close,
                            config,
                            emit,
                            getChildModal,
                            getParentModal,
                            id,
                            index,
                            isOpen,
                            modalContext,
                            onTopOfStack,
                            reload,
                            setOpen,
                            shouldRender,
                        })}
                    </div>
                </Content>
            </div>
        {/if}
    {/snippet}
</HeadlessModal>
