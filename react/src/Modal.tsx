import { forwardRef, useRef, useImperativeHandle, useState, useEffect, useCallback, useMemo, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import HeadlessModal, { HeadlessModalRef } from './HeadlessModal'
import ModalContent from './ModalContent'
import SlideoverContent from './SlideoverContent'
import { lockScroll, markAriaHidden } from '../../vue/src/dialog'
import { getConfig } from './config'
import type { Modal as ModalType, ReloadOptions } from './types'

interface ModalConfig {
    slideover: boolean
    closeButton: boolean
    closeExplicitly: boolean
    maxWidth: string
    paddingClasses: string
    panelClasses: string
    position: string
}

interface ModalRenderProps {
    afterLeave: () => void
    close: () => void
    config: ModalConfig
    emit: (event: string, ...args: unknown[]) => void
    getChildModal: () => ModalType | null
    getParentModal: () => ModalType | null
    id: string
    index: number
    isOpen: boolean
    modalContext: ModalType
    onTopOfStack: boolean
    reload: (options?: ReloadOptions) => void
    setOpen: (open: boolean) => void
    shouldRender: boolean
    // Allow additional props from visitModal
    [key: string]: unknown
}

interface ModalBaseProps {
    name?: string
    children: ReactNode | ((props: ModalRenderProps) => ReactNode)
    onFocus?: () => void
    onBlur?: () => void
    onClose?: () => void
    onSuccess?: () => void
    onAfterLeave?: () => void
    slideover?: boolean
    closeButton?: boolean
    closeExplicitly?: boolean
    maxWidth?: string
    paddingClasses?: string
    panelClasses?: string
    position?: string
}

type ModalProps = ModalBaseProps & Record<string, unknown>

interface BackdropTransitionProps {
    show: boolean
    appear: boolean
    onAfterAppear?: () => void
}

const Modal = forwardRef<HeadlessModalRef, ModalProps>(
    (allProps, ref) => {
        const { name, children, onFocus, onBlur, onClose, onSuccess, onAfterLeave, ...props } = allProps as ModalBaseProps & Record<string, unknown>
        const renderChildren = (contentProps: ModalRenderProps) => {
            if (typeof children === 'function') {
                return children(contentProps)
            }

            return children
        }

        const headlessModalRef = useRef<HeadlessModalRef>(null)
        const cleanupScrollLockRef = useRef<(() => void) | null>(null)
        const cleanupAriaHiddenRef = useRef<(() => void) | null>(null)
        const [rendered, setRendered] = useState(false)
        const useNativeDialog = useMemo(() => getConfig('useNativeDialog') as boolean, [])

        useImperativeHandle(ref, () => headlessModalRef.current!, [headlessModalRef])

        // Cleanup on unmount
        useEffect(() => {
            return () => {
                cleanupScrollLockRef.current?.()
                cleanupAriaHiddenRef.current?.()
            }
        }, [])

        const handleSuccess = useCallback(() => {
            onSuccess?.()
            if (!cleanupScrollLockRef.current) {
                cleanupScrollLockRef.current = lockScroll()
                cleanupAriaHiddenRef.current = markAriaHidden(getConfig('appElement') as string)
            }
        }, [onSuccess])

        const handleClose = useCallback(() => {
            onClose?.()
            cleanupScrollLockRef.current?.()
            cleanupAriaHiddenRef.current?.()
            cleanupScrollLockRef.current = null
            cleanupAriaHiddenRef.current = null
        }, [onClose])

        const handleAfterLeave = useCallback(() => {
            onAfterLeave?.()
        }, [onAfterLeave])

        return (
            <HeadlessModal
                ref={headlessModalRef}
                name={name}
                onFocus={onFocus ?? undefined}
                onBlur={onBlur ?? undefined}
                onClose={handleClose}
                onSuccess={handleSuccess}
                {...props}
            >
                {({
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
                    ...extraProps
                }) => (
                    <ModalPortal>
                        <div
                            className="im-dialog relative z-20"
                            data-inertiaui-modal-id={id}
                            data-inertiaui-modal-index={index}
                            aria-hidden={!onTopOfStack}
                        >
                            {/* Only render backdrop for the first modal (non-native dialog mode) */}
                            {/* Native dialog uses ::backdrop pseudo-element instead */}
                            {index === 0 && !useNativeDialog && (
                                <BackdropTransition
                                    show={isOpen}
                                    appear={!rendered}
                                    onAfterAppear={() => setRendered(true)}
                                />
                            )}

                            {/* The modal/slideover content itself */}
                            {config.slideover ? (
                                <SlideoverContent
                                    modalContext={modalContext}
                                    config={config}
                                    useNativeDialog={useNativeDialog}
                                    isFirstModal={index === 0}
                                    onAfterLeave={handleAfterLeave}
                                >
                                    {renderChildren({
                                        ...extraProps,
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
                                </SlideoverContent>
                            ) : (
                                <ModalContent
                                    modalContext={modalContext}
                                    config={config}
                                    useNativeDialog={useNativeDialog}
                                    isFirstModal={index === 0}
                                    onAfterLeave={handleAfterLeave}
                                >
                                    {renderChildren({
                                        ...extraProps,
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
                                </ModalContent>
                            )}
                        </div>
                    </ModalPortal>
                )}
            </HeadlessModal>
        )
    },
)

// Simple portal component
function ModalPortal({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return createPortal(children, document.body)
}

// Backdrop with CSS transition
function BackdropTransition({ show, appear, onAfterAppear }: BackdropTransitionProps) {
    const [state, setState] = useState<'entering' | 'entered' | 'leaving' | 'exited'>(() => {
        if (appear && show) return 'entering'
        return show ? 'entered' : 'exited'
    })
    const initialRender = useRef(true)
    const backdropRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
            if (appear && show) {
                requestAnimationFrame(() => {
                    setState('entered')
                    const backdrop = backdropRef.current
                    if (backdrop) {
                        const onTransitionEnd = (e: TransitionEvent) => {
                            if (e.target !== backdrop) return
                            backdrop.removeEventListener('transitionend', onTransitionEnd)
                            onAfterAppear?.()
                        }
                        backdrop.addEventListener('transitionend', onTransitionEnd)
                    }
                })
            }
            return
        }

        if (show) {
            setState('entering')
            requestAnimationFrame(() => {
                setState('entered')
            })
        } else {
            setState('leaving')
            const backdrop = backdropRef.current
            if (backdrop) {
                const onTransitionEnd = (e: TransitionEvent) => {
                    if (e.target !== backdrop) return
                    backdrop.removeEventListener('transitionend', onTransitionEnd)
                    setState('exited')
                }
                backdrop.addEventListener('transitionend', onTransitionEnd)
            }
        }
    }, [show, appear, onAfterAppear])

    if (state === 'exited') return null

    const isVisible = state === 'entered'

    return (
        <div
            ref={backdropRef}
            className={`im-backdrop fixed inset-0 z-30 bg-black/75 transition-opacity duration-300 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden="true"
        />
    )
}

Modal.displayName = 'Modal'
export default Modal
