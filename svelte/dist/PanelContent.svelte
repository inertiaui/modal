<script lang="ts">
    import { animate, cancelAnimations, createFocusTrap, onEscapeKey } from '@inertiaui/vanilla'
    import { onDestroy, tick, type Snippet } from 'svelte'

    import CloseButton from './CloseButton.svelte'
    import { getMaxWidthClass } from './constants.js'
    import type { Modal } from './modalStack.svelte.js'

    interface PanelConfig {
        slideover?: boolean
        closeButton?: boolean
        closeExplicitly?: boolean
        closeOnClickOutside?: boolean
        maxWidth?: string
        paddingClasses?: string
        panelClasses?: string
        position?: string
    }

    interface Props {
        variant: 'modal' | 'slideover'
        modalContext: Modal
        config: PanelConfig
        useNativeDialog: boolean
        isFirstModal: boolean
        children?: Snippet
        onAfterLeave?: () => void
    }

    let { variant, modalContext, config, useNativeDialog, isFirstModal, children, onAfterLeave }: Props = $props()

    let isRendered = $state(false)
    let isVisible = $state(false)
    let entered = $state(false)
    let wrapperRef = $state<HTMLElement | null>(null)
    let dialogRef = $state<HTMLDialogElement | null>(null)
    let nativeWrapperRef = $state<HTMLElement | null>(null)

    let cleanupFocusTrap: (() => void) | null = null
    let cleanupEscapeKey: (() => void) | null = null

    const maxWidthClass = $derived(getMaxWidthClass(config.maxWidth ?? '2xl'))
    const prefix = $derived(variant === 'slideover' ? 'im-slideover' : 'im-modal')

    const positionerClass = $derived(
        variant === 'slideover'
            ? [
                  'im-slideover-positioner flex min-h-full items-center',
                  {
                      'justify-start rtl:justify-end': config.position === 'left',
                      'justify-end rtl:justify-start': config.position === 'right',
                  },
              ]
            : [
                  'im-modal-positioner flex min-h-full justify-center',
                  {
                      'items-start': config.position === 'top',
                      'items-center': config.position === 'center',
                      'items-end': config.position === 'bottom',
                  },
              ],
    )

    function keyframes(direction: 'in' | 'out'): Keyframe[] {
        if (variant === 'slideover') {
            const translateX = config.position === 'left' ? '-100%' : '100%'

            if (direction === 'in') {
                return [
                    { transform: `translate3d(${translateX}, 0, 0)`, opacity: 0 },
                    { transform: 'translate3d(0, 0, 0)', opacity: 1 },
                ]
            }

            return [
                { transform: 'translate3d(0, 0, 0)', opacity: 1 },
                { transform: `translate3d(${translateX}, 0, 0)`, opacity: 0 },
            ]
        }

        if (direction === 'in') {
            return [
                { transform: 'translate3d(0, 1rem, 0) scale(0.95)', opacity: 0 },
                { transform: 'translate3d(0, 0, 0) scale(1)', opacity: 1 },
            ]
        }

        return [
            { transform: 'translate3d(0, 0, 0) scale(1)', opacity: 1 },
            { transform: 'translate3d(0, 1rem, 0) scale(0.95)', opacity: 0 },
        ]
    }

    function activeWrapper(): HTMLElement | null {
        return useNativeDialog ? nativeWrapperRef : wrapperRef
    }

    async function animateIn(element: HTMLElement | null): Promise<void> {
        if (!element) {
            return
        }

        isVisible = true
        await animate(element, keyframes('in'))
        entered = true
        setupFocusTrap()
    }

    async function animateOut(element: HTMLElement | null): Promise<void> {
        if (!element) {
            return
        }

        isVisible = false
        await animate(element, keyframes('out'))
        isRendered = false

        if (useNativeDialog && dialogRef) {
            dialogRef.close()
        }

        onAfterLeave?.()
        modalContext.afterLeave()
    }

    function show(): void {
        isRendered = true
        tick().then(() => animateIn(activeWrapper()))
    }

    function hide(): void {
        entered = false
        animateOut(activeWrapper())
    }

    function setupFocusTrap(): void {
        if (useNativeDialog || !wrapperRef || !modalContext.onTopOfStack || cleanupFocusTrap) {
            return
        }

        cleanupFocusTrap = createFocusTrap(wrapperRef, {
            initialFocus: true,
            returnFocus: false,
        })
    }

    function clearFocusTrap(): void {
        cleanupFocusTrap?.()
        cleanupFocusTrap = null
    }

    function setupEscapeKey(): void {
        if (useNativeDialog || cleanupEscapeKey || config?.closeExplicitly) {
            return
        }

        cleanupEscapeKey = onEscapeKey(() => {
            if (modalContext.onTopOfStack) {
                modalContext.close()
            }
        })
    }

    function clearEscapeKey(): void {
        cleanupEscapeKey?.()
        cleanupEscapeKey = null
    }

    function handleClickOutside(event: MouseEvent): void {
        if (useNativeDialog || !modalContext.onTopOfStack || config?.closeExplicitly || config?.closeOnClickOutside === false || !wrapperRef) {
            return
        }

        if (!wrapperRef.contains(event.target as Node)) {
            modalContext.close()
        }
    }

    function handleCancel(event: Event): void {
        event.preventDefault()

        if (modalContext.onTopOfStack && !config?.closeExplicitly) {
            modalContext.close()
        }
    }

    function handleDialogClick(event: MouseEvent): void {
        if (event.target !== dialogRef) {
            return
        }

        if (modalContext.onTopOfStack && !config?.closeExplicitly && config?.closeOnClickOutside !== false) {
            modalContext.close()
        }
    }

    function openDialog(): void {
        if (dialogRef && !dialogRef.open) {
            dialogRef.showModal()
            tick().then(() => animateIn(nativeWrapperRef))
        }
    }

    function closeDialog(): void {
        if (dialogRef?.open) {
            entered = false
            animateOut(nativeWrapperRef)
        }
    }

    function onSelfMouseDown(event: MouseEvent): void {
        if (event.target === event.currentTarget) {
            handleClickOutside(event)
        }
    }

    let started = false

    $effect(() => {
        const open = modalContext.isOpen
        const native = useNativeDialog

        if (!started) {
            started = true

            if (native) {
                if (open) {
                    openDialog()
                }
            } else {
                setupEscapeKey()

                if (open) {
                    show()
                }
            }

            return
        }

        if (native) {
            if (open) {
                openDialog()
            } else {
                closeDialog()
            }
        } else if (open) {
            show()
        } else {
            hide()
        }
    })

    $effect(() => {
        const onTop = modalContext.onTopOfStack

        if (useNativeDialog) {
            return
        }

        if (onTop) {
            setupEscapeKey()

            if (entered) {
                setupFocusTrap()
            }
        } else {
            clearFocusTrap()
            clearEscapeKey()
        }
    })

    onDestroy(() => {
        const wrapper = activeWrapper()

        if (wrapper) {
            cancelAnimations(wrapper)
        }

        if (useNativeDialog) {
            if (dialogRef?.open) {
                dialogRef.close()
            }
        } else {
            clearFocusTrap()
            clearEscapeKey()
        }
    })
</script>

{#if useNativeDialog}
    <dialog
        bind:this={dialogRef}
        class={[
            `${prefix}-dialog m-0 overflow-visible bg-transparent p-0`,
            'size-full max-h-none max-w-none',
            'backdrop:bg-black/75 backdrop:transition-opacity backdrop:duration-300',
            isVisible ? 'backdrop:opacity-100' : 'backdrop:opacity-0',
            !isFirstModal && 'backdrop:bg-transparent',
        ]}
        oncancel={handleCancel}
        onclick={handleDialogClick}
    >
        <div class={[`${prefix}-container fixed inset-0`, variant === 'slideover' ? 'overflow-x-hidden overflow-y-auto' : 'overflow-y-auto p-4']}>
            <div class={positionerClass}>
                <div bind:this={nativeWrapperRef} class={[`${prefix}-wrapper w-full transition-[filter] duration-300`, modalContext.onTopOfStack ? '' : 'blur-xs', maxWidthClass]}>
                    <div class={[`${prefix}-content relative`, config.paddingClasses, config.panelClasses]} data-inertiaui-modal-entered={entered}>
                        {#if config.closeButton}
                            <div class="absolute top-0 right-0 pt-3 pr-3">
                                <CloseButton />
                            </div>
                        {/if}

                        {@render children?.()}
                    </div>
                </div>
            </div>
        </div>
    </dialog>
{:else if isRendered}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
        class={[`${prefix}-container fixed inset-0 z-40`, variant === 'slideover' ? 'overflow-x-hidden overflow-y-auto' : 'overflow-y-auto p-4']}
        onmousedown={onSelfMouseDown}
    >
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class={positionerClass} onmousedown={onSelfMouseDown}>
            <div
                bind:this={wrapperRef}
                role="dialog"
                aria-modal="true"
                class={[`${prefix}-wrapper w-full transition-[filter] duration-300`, modalContext.onTopOfStack ? '' : 'blur-xs', maxWidthClass]}
            >
                <span class="sr-only">Dialog</span>

                <div class={[`${prefix}-content relative`, config.paddingClasses, config.panelClasses]} data-inertiaui-modal-entered={entered}>
                    {#if config.closeButton}
                        <div class="absolute top-0 right-0 pt-3 pr-3">
                            <CloseButton />
                        </div>
                    {/if}

                    {@render children?.()}
                </div>
            </div>
        </div>
    </div>
{/if}
