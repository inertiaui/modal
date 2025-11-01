<script>
    import CloseButton from './CloseButton.svelte'
    import { fly } from 'svelte/transition'
    import { quintOut } from 'svelte/easing'

    let { modalContext, config, onAfterLeave, children } = $props()

    let entered = $state(false)

    function handleAfterEnter() {
        entered = true
    }

    function handleAfterLeave() {
        modalContext.afterLeave()
        onAfterLeave?.()
    }

    let translateDirection = $derived(config.position === 'left' ? -1 : 1)
</script>

<!-- Full-screen scrollable container -->
<div class="im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden">
    <!-- Container to position the panel -->
    <div
        class="im-slideover-positioner flex min-h-full items-center"
        class:justify-start={config.position === 'left'}
        class:rtl:justify-end={config.position === 'left'}
        class:justify-end={config.position === 'right'}
        class:rtl:justify-start={config.position === 'right'}
    >
        <div
            class="im-slideover-wrapper w-full"
            class:blur-sm={!modalContext.onTopOfStack}
            class:sm:max-w-sm={config.maxWidth === 'sm'}
            class:sm:max-w-md={config.maxWidth === 'md'}
            class:md:max-w-lg={config.maxWidth === 'lg'}
            class:md:max-w-xl={config.maxWidth === 'xl'}
            class:lg:max-w-2xl={config.maxWidth === '2xl'}
            class:lg:max-w-3xl={config.maxWidth === '3xl'}
            class:xl:max-w-4xl={config.maxWidth === '4xl'}
            class:xl:max-w-5xl={config.maxWidth === '5xl'}
            class:2xl:max-w-6xl={config.maxWidth === '6xl'}
            class:2xl:max-w-7xl={config.maxWidth === '7xl'}
            in:fly|global={{ x: translateDirection * 300, duration: 300, easing: quintOut }}
            out:fly|global={{ x: translateDirection * 300, duration: 300, easing: quintOut }}
            onintroend={handleAfterEnter}
            onoutroend={handleAfterLeave}
        >
            <div
                class="im-slideover-content relative {config.paddingClasses} {config.panelClasses}"
                data-inertiaui-modal-entered={entered}
            >
                {#if config.closeButton}
                    <div class="absolute right-0 top-0 pr-3 pt-3">
                        <CloseButton onclick={modalContext.close} />
                    </div>
                {/if}

                {@render children?.({ modalContext, config })}
            </div>
        </div>
    </div>
</div>
