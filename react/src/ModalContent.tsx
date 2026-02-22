import { useState, useEffect, useRef, useCallback, useMemo, ReactNode, SyntheticEvent, MouseEvent } from 'react'
import CloseButton from './CloseButton'
import clsx from 'clsx'
import { createFocusTrap, onEscapeKey } from '../../vue/src/dialog'
import { getMaxWidthClass } from '../../vue/src/constants'
import type { Modal } from './types'

interface ModalContentConfig {
    maxWidth: string
    paddingClasses: string
    panelClasses: string
    position: string
    closeButton: boolean
    closeExplicitly?: boolean
    closeOnClickOutside?: boolean
}

interface ModalContentProps {
    modalContext: Modal
    config: ModalContentConfig
    useNativeDialog: boolean
    isFirstModal: boolean
    onAfterLeave?: () => void
    children: ReactNode | ((props: { modalContext: Modal; config: ModalContentConfig }) => ReactNode)
}

const ModalContent = ({ modalContext, config, useNativeDialog, isFirstModal, onAfterLeave, children }: ModalContentProps) => {
    const [entered, setEntered] = useState(false)
    const [isLeaving, setIsLeaving] = useState(false)
    const [transitionState, setTransitionState] = useState<'entering' | 'entered' | 'leaving' | 'exited'>('entering')
    const wrapperRef = useRef<HTMLDivElement>(null)
    const dialogRef = useRef<HTMLDialogElement>(null)
    const cleanupFocusTrapRef = useRef<(() => void) | null>(null)
    const cleanupEscapeKeyRef = useRef<(() => void) | null>(null)
    const initialRender = useRef(true)

    const maxWidthClass = useMemo(() => getMaxWidthClass(config.maxWidth), [config.maxWidth])

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

    const closeDialog = useCallback(() => {
        if (dialogRef.current && dialogRef.current.open) {
            setIsLeaving(true)
            setEntered(false)
            setTimeout(() => {
                if (dialogRef.current) {
                    dialogRef.current.close()
                }
                setIsLeaving(false)
                onAfterLeave?.()
                modalContext.afterLeave()
            }, 300)
        }
    }, [onAfterLeave, modalContext])

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
                    setTimeout(() => {
                        setEntered(true)
                        setupFocusTrap()
                    }, 300)
                })
            })
        }
    }, [modalContext.isOpen, setupFocusTrap, useNativeDialog])

    // Handle leave animation (non-native only)
    useEffect(() => {
        if (useNativeDialog) return

        if (!modalContext.isOpen && transitionState === 'entered') {
            setTransitionState('leaving')
            setTimeout(() => {
                setTransitionState('exited')
                onAfterLeave?.()
                modalContext.afterLeave()
            }, 300)
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
            className={`im-modal-content relative ${config.paddingClasses} ${config.panelClasses}`}
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
                    'im-modal-dialog m-0 overflow-visible bg-transparent p-0',
                    'size-full max-h-none max-w-none',
                    'backdrop:bg-black/75 backdrop:transition-opacity backdrop:duration-300',
                    entered ? 'backdrop:opacity-100' : 'backdrop:opacity-0',
                    !isFirstModal && 'backdrop:bg-transparent',
                )}
                onCancel={handleCancel}
                onClick={handleDialogClick}
            >
                <div className="im-modal-container fixed inset-0 overflow-y-auto p-4">
                    <div
                        className={clsx('im-modal-positioner flex min-h-full justify-center', {
                            'items-start': config.position === 'top',
                            'items-center': config.position === 'center',
                            'items-end': config.position === 'bottom',
                        })}
                    >
                        <div
                            className={clsx(
                                'im-modal-wrapper w-full transition duration-300 ease-in-out',
                                modalContext.onTopOfStack ? '' : 'blur-xs',
                                entered && !isLeaving ? 'translate-y-0 opacity-100 sm:scale-100' : 'translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95',
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
            className="im-modal-container fixed inset-0 z-40 overflow-y-auto p-4"
            onMouseDown={handleClickOutside}
        >
            <div
                className={clsx('im-modal-positioner flex min-h-full justify-center', {
                    'items-start': config.position === 'top',
                    'items-center': config.position === 'center',
                    'items-end': config.position === 'bottom',
                })}
                onMouseDown={handleClickOutside}
            >
                <div
                    ref={wrapperRef}
                    role="dialog"
                    aria-modal="true"
                    className={clsx(
                        'im-modal-wrapper w-full transition duration-300 ease-in-out',
                        modalContext.onTopOfStack ? '' : 'blur-xs',
                        isEntering || isLeavingNonNative ? 'translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95' : 'translate-y-0 opacity-100 sm:scale-100',
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

export default ModalContent
