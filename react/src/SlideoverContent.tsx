import { useState, useEffect, useRef, useCallback, useMemo, ReactNode, SyntheticEvent, MouseEvent } from 'react'
import CloseButton from './CloseButton'
import clsx from 'clsx'
import { createFocusTrap, onEscapeKey, onTransitionEnd } from '@inertiaui/vanilla'
import { getMaxWidthClass } from './constants'
import type { Modal } from './types'

interface SlideoverContentConfig {
    maxWidth: string
    paddingClasses: string
    panelClasses: string
    position: string
    closeButton: boolean
    closeExplicitly?: boolean
    closeOnClickOutside?: boolean
}

interface SlideoverContentProps {
    modalContext: Modal
    config: SlideoverContentConfig
    useNativeDialog: boolean
    isFirstModal: boolean
    onAfterLeave?: () => void
    children: ReactNode | ((props: { modalContext: Modal; config: SlideoverContentConfig }) => ReactNode)
}

const SlideoverContent = ({ modalContext, config, useNativeDialog, isFirstModal, onAfterLeave, children }: SlideoverContentProps) => {
    const [entered, setEntered] = useState(false)
    const [isLeaving, setIsLeaving] = useState(false)
    const [transitionState, setTransitionState] = useState<'entering' | 'entered' | 'leaving' | 'exited'>('entering')
    const wrapperRef = useRef<HTMLDivElement>(null)
    const dialogRef = useRef<HTMLDialogElement>(null)
    const nativeWrapperRef = useRef<HTMLDivElement>(null)
    const cleanupFocusTrapRef = useRef<(() => void) | null>(null)
    const cleanupEscapeKeyRef = useRef<(() => void) | null>(null)
    const initialRender = useRef(true)

    const isLeft = config.position === 'left'

    const maxWidthClass = useMemo(() => getMaxWidthClass(config.maxWidth), [config.maxWidth])

    // Transform classes for slideover animation
    const getTransformClass = useCallback(
        (isHidden: boolean) => {
            if (isHidden) {
                return isLeft ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0'
            }
            return 'translate-x-0 opacity-100'
        },
        [isLeft],
    )

    // ============ Non-native dialog handlers ============

    const setupFocusTrap = useCallback(() => {
        if (useNativeDialog) return
        if (!wrapperRef.current || !modalContext.onTopOfStack) return
        if (cleanupFocusTrapRef.current) return

        cleanupFocusTrapRef.current = createFocusTrap(wrapperRef.current, {
            initialFocus: true,
            returnFocus: false,
        })
    }, [modalContext.onTopOfStack, useNativeDialog])

    const cleanupFocusTrap = useCallback(() => {
        if (cleanupFocusTrapRef.current) {
            cleanupFocusTrapRef.current()
            cleanupFocusTrapRef.current = null
        }
    }, [])

    const setupEscapeKey = useCallback(() => {
        if (useNativeDialog) return
        if (cleanupEscapeKeyRef.current) return
        if (config?.closeExplicitly) return

        cleanupEscapeKeyRef.current = onEscapeKey(() => {
            if (modalContext.onTopOfStack) {
                modalContext.close()
            }
        })
    }, [config?.closeExplicitly, modalContext, useNativeDialog])

    const cleanupEscapeKey = useCallback(() => {
        if (cleanupEscapeKeyRef.current) {
            cleanupEscapeKeyRef.current()
            cleanupEscapeKeyRef.current = null
        }
    }, [])

    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            if (useNativeDialog) return
            if (!modalContext.onTopOfStack) return
            if (config?.closeExplicitly) return
            if (config?.closeOnClickOutside === false) return
            if (!wrapperRef.current) return

            if (!wrapperRef.current.contains(event.target as Node)) {
                modalContext.close()
            }
        },
        [modalContext, config?.closeExplicitly, config?.closeOnClickOutside, useNativeDialog],
    )

    // ============ Native dialog handlers ============

    const handleCancel = useCallback(
        (event: SyntheticEvent) => {
            event.preventDefault()
            if (modalContext.onTopOfStack && !config?.closeExplicitly) {
                modalContext.close()
            }
        },
        [modalContext, config?.closeExplicitly],
    )

    const handleDialogClick = useCallback(
        (event: MouseEvent) => {
            if (event.target === dialogRef.current) {
                if (modalContext.onTopOfStack && !config?.closeExplicitly && config?.closeOnClickOutside !== false) {
                    modalContext.close()
                }
            }
        },
        [modalContext, config?.closeExplicitly, config?.closeOnClickOutside],
    )

    const openDialog = useCallback(() => {
        if (dialogRef.current && !dialogRef.current.open) {
            dialogRef.current.showModal()
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setEntered(true)
                })
            })
        }
    }, [])

    const finishClose = useCallback(() => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
        setIsLeaving(false)
        onAfterLeave?.()
        modalContext.afterLeave()
    }, [onAfterLeave, modalContext])

    const closeDialog = useCallback(() => {
        if (dialogRef.current && dialogRef.current.open) {
            setIsLeaving(true)
            setEntered(false)

            const wrapper = nativeWrapperRef.current
            if (wrapper) {
                onTransitionEnd(wrapper, finishClose)
            } else {
                finishClose()
            }
        }
    }, [finishClose])

    // ============ Lifecycle ============

    // Initial mount
    useEffect(() => {
        if (useNativeDialog) {
            if (modalContext.isOpen) {
                openDialog()
            }
        } else {
            setupEscapeKey()
        }
        return () => {
            if (useNativeDialog) {
                if (dialogRef.current?.open) {
                    dialogRef.current.close()
                }
            } else {
                cleanupFocusTrap()
                cleanupEscapeKey()
            }
        }
    }, [])

    // Handle becoming top of stack / losing top of stack (non-native only)
    useEffect(() => {
        if (useNativeDialog) return

        if (modalContext.onTopOfStack) {
            setupEscapeKey()
            if (entered) {
                setupFocusTrap()
            }
        } else {
            cleanupFocusTrap()
            cleanupEscapeKey()
        }
    }, [modalContext.onTopOfStack, entered, setupEscapeKey, setupFocusTrap, cleanupFocusTrap, cleanupEscapeKey, useNativeDialog])

    // Handle enter animation (non-native only)
    useEffect(() => {
        if (useNativeDialog) return

        if (initialRender.current && modalContext.isOpen) {
            initialRender.current = false
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setTransitionState('entered')
                    const wrapper = wrapperRef.current
                    if (wrapper) {
                        onTransitionEnd(wrapper, () => {
                            setEntered(true)
                            setupFocusTrap()
                        })
                    }
                })
            })
        }
    }, [modalContext.isOpen, setupFocusTrap, useNativeDialog])

    // Handle leave animation (non-native only)
    useEffect(() => {
        if (useNativeDialog) return

        if (!modalContext.isOpen && transitionState === 'entered') {
            setTransitionState('leaving')
            const wrapper = wrapperRef.current
            if (wrapper) {
                onTransitionEnd(wrapper, () => {
                    setTransitionState('exited')
                    onAfterLeave?.()
                    modalContext.afterLeave()
                })
            }
        }
    }, [modalContext.isOpen, transitionState, onAfterLeave, modalContext, useNativeDialog])

    // Watch for open state changes (native only)
    useEffect(() => {
        if (!useNativeDialog) return

        if (modalContext.isOpen) {
            openDialog()
        } else if (!isLeaving) {
            closeDialog()
        }
    }, [modalContext.isOpen, openDialog, closeDialog, isLeaving, useNativeDialog])

    // ============ Render ============

    const renderContent = () => (
        <div
            className={`im-slideover-content relative ${config.paddingClasses} ${config.panelClasses}`}
            data-inertiaui-modal-entered={entered}
        >
            {config.closeButton && (
                <div className="absolute right-0 top-0 pr-3 pt-3">
                    <CloseButton onClick={modalContext.close} />
                </div>
            )}
            {typeof children === 'function' ? children({ modalContext, config }) : children}
        </div>
    )

    // Native dialog mode
    if (useNativeDialog) {
        return (
            <dialog
                ref={dialogRef}
                className={clsx(
                    'im-slideover-dialog m-0 overflow-visible bg-transparent p-0',
                    'size-full max-h-none max-w-none',
                    'backdrop:bg-black/75 backdrop:transition-opacity backdrop:duration-300',
                    entered ? 'backdrop:opacity-100' : 'backdrop:opacity-0',
                    !isFirstModal && 'backdrop:bg-transparent',
                )}
                onCancel={handleCancel}
                onClick={handleDialogClick}
            >
                <div className="im-slideover-container fixed inset-0 overflow-y-auto overflow-x-hidden">
                    <div
                        className={clsx('im-slideover-positioner flex min-h-full items-center', {
                            'justify-start rtl:justify-end': config?.position === 'left',
                            'justify-end rtl:justify-start': config?.position === 'right',
                        })}
                    >
                        <div
                            ref={nativeWrapperRef}
                            className={clsx(
                                'im-slideover-wrapper w-full transition duration-300 ease-in-out',
                                modalContext.onTopOfStack ? '' : 'blur-xs',
                                getTransformClass(!(entered && !isLeaving)),
                                maxWidthClass,
                            )}
                        >
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </dialog>
        )
    }

    // Non-native dialog mode
    if (transitionState === 'exited') return null

    const isEntering = transitionState === 'entering'
    const isLeavingNonNative = transitionState === 'leaving'

    return (
        <div
            className="im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden"
            onMouseDown={handleClickOutside}
        >
            <div
                className={clsx('im-slideover-positioner flex min-h-full items-center', {
                    'justify-start rtl:justify-end': config?.position === 'left',
                    'justify-end rtl:justify-start': config?.position === 'right',
                })}
                onMouseDown={handleClickOutside}
            >
                <div
                    ref={wrapperRef}
                    role="dialog"
                    aria-modal="true"
                    className={clsx(
                        'im-slideover-wrapper w-full transition duration-300 ease-in-out',
                        modalContext.onTopOfStack ? '' : 'blur-xs',
                        getTransformClass(isEntering || isLeavingNonNative),
                        maxWidthClass,
                    )}
                >
                    <span className="sr-only">Dialog</span>
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}

export default SlideoverContent
