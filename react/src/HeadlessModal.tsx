import { useMemo, useState, forwardRef, useImperativeHandle, useEffect, useRef, ReactNode } from 'react'
import { getConfig, getConfigByType } from './config'
import { useModalIndex } from './ModalRenderer'
import { useModalStack } from './ModalRoot'
import ModalRenderer from './ModalRenderer'
import type { Modal, ModalConfig, ReloadOptions } from './types'

interface HeadlessModalConfig {
    slideover: boolean
    closeButton: boolean
    closeExplicitly: boolean
    closeOnClickOutside: boolean
    maxWidth: string
    paddingClasses: string
    panelClasses: string
    position: string
}

interface HeadlessModalRenderProps {
    afterLeave: () => void
    close: () => void
    config: HeadlessModalConfig
    emit: (event: string, ...args: unknown[]) => void
    getChildModal: () => Modal | null
    getParentModal: () => Modal | null
    id: string
    index: number
    isOpen: boolean
    modalContext: Modal
    onTopOfStack: boolean
    reload: (options?: ReloadOptions) => void
    setOpen: (open: boolean) => void
    shouldRender: boolean
    // Allow additional props from visitModal
    [key: string]: unknown
}

interface HeadlessModalBaseProps {
    name?: string
    children: ReactNode | ((props: HeadlessModalRenderProps) => ReactNode)
    onFocus?: () => void
    onBlur?: () => void
    onClose?: () => void
    onSuccess?: () => void
    slideover?: boolean
    closeButton?: boolean
    closeExplicitly?: boolean
    closeOnClickOutside?: boolean
    maxWidth?: string
    paddingClasses?: string
    panelClasses?: string
    position?: string
}

type HeadlessModalProps = HeadlessModalBaseProps & Record<string, unknown>

export interface HeadlessModalRef {
    afterLeave: () => void
    close: () => void
    emit: (event: string, ...args: unknown[]) => void
    getChildModal: () => Modal | null | undefined
    getParentModal: () => Modal | null | undefined
    reload: (options?: ReloadOptions) => void
    setOpen: (open: boolean) => void
    readonly id: string | undefined
    readonly index: number | undefined
    readonly isOpen: boolean | undefined
    readonly config: ModalConfig | undefined
    readonly modalContext: Modal | null
    readonly onTopOfStack: boolean | undefined
    readonly shouldRender: boolean | undefined
}

const HeadlessModal = forwardRef<HeadlessModalRef, HeadlessModalProps>(
    (allProps, ref) => {
        const { name, children, onFocus, onBlur, onClose, onSuccess, ...props } = allProps as HeadlessModalBaseProps & Record<string, unknown>
        const modalIndex = useModalIndex()
        const { stack, registerLocalModal, removeLocalModal } = useModalStack()

        const [localModalContext, setLocalModalContext] = useState<Modal | null>(null)
        const modalContext = useMemo(
            () => (name ? localModalContext : stack[modalIndex]),
            [name, localModalContext, modalIndex, stack],
        )

        const nextIndex = useMemo(() => {
            return stack.find((m) => m.shouldRender && m.index > (modalContext?.index ?? -1))?.index
        }, [modalIndex, stack])

        const configSlideover = useMemo(
            () => modalContext?.config.slideover ?? props.slideover ?? getConfig('type') === 'slideover',
            [props.slideover, modalContext?.config.slideover],
        )

        const config: HeadlessModalConfig = useMemo(
            () => ({
                slideover: configSlideover as boolean,
                closeButton: (props.closeButton ?? getConfigByType(configSlideover as boolean, 'closeButton')) as boolean,
                closeExplicitly: (props.closeExplicitly ?? getConfigByType(configSlideover as boolean, 'closeExplicitly')) as boolean,
                closeOnClickOutside: (props.closeOnClickOutside ?? getConfigByType(configSlideover as boolean, 'closeOnClickOutside')) as boolean,
                maxWidth: (props.maxWidth ?? getConfigByType(configSlideover as boolean, 'maxWidth')) as string,
                paddingClasses: (props.paddingClasses ?? getConfigByType(configSlideover as boolean, 'paddingClasses')) as string,
                panelClasses: (props.panelClasses ?? getConfigByType(configSlideover as boolean, 'panelClasses')) as string,
                position: (props.position ?? getConfigByType(configSlideover as boolean, 'position')) as string,
                ...modalContext?.config,
            }),
            [props, modalContext?.config, configSlideover],
        )

        useEffect(() => {
            if (name) {
                let removeListeners: (() => void) | null = null

                registerLocalModal(name as string, (localContext) => {
                    removeListeners = localContext.registerEventListenersFromProps(props as Record<string, unknown>)
                    setLocalModalContext(localContext)
                })

                return () => {
                    removeListeners?.()
                    removeListeners = null
                    removeLocalModal(name as string)
                }
            }

            return modalContext?.registerEventListenersFromProps(props as Record<string, unknown>)
        }, [name])

        // Store the latest modalContext in a ref to maintain reference
        const modalContextRef = useRef(modalContext)

        // Update the ref whenever modalContext changes
        useEffect(() => {
            modalContextRef.current = modalContext
        }, [modalContext])

        // Track previous isOpen value to only emit close when transitioning from true to false
        const previousIsOpenRef = useRef<boolean | undefined>(undefined)

        useEffect(() => {
            if (modalContext !== null) {
                if (modalContext.isOpen) {
                    onSuccess?.()
                } else if (previousIsOpenRef.current === true) {
                    // Only call onClose when transitioning from open to closed,
                    // not when the component first mounts with isOpen undefined/false
                    onClose?.()
                }
                previousIsOpenRef.current = modalContext.isOpen
            }
        }, [modalContext?.isOpen])

        const [rendered, setRendered] = useState(false)

        useEffect(() => {
            if (rendered && modalContext !== null && modalContext.isOpen) {
                if (modalContext.onTopOfStack) {
                    onFocus?.()
                } else {
                    onBlur?.()
                }
            }

            setRendered(true)
        }, [modalContext?.onTopOfStack])

        useImperativeHandle(
            ref,
            () => ({
                afterLeave: () => modalContextRef.current?.afterLeave(),
                close: () => modalContextRef.current?.close(),
                emit: (...args: [string, ...unknown[]]) => modalContextRef.current?.emit(...args),
                getChildModal: () => modalContextRef.current?.getChildModal(),
                getParentModal: () => modalContextRef.current?.getParentModal(),
                reload: (options?: ReloadOptions) => modalContextRef.current?.reload(options),
                setOpen: (open: boolean) => modalContextRef.current?.setOpen(open),

                get id() {
                    return modalContextRef.current?.id
                },
                get index() {
                    return modalContextRef.current?.index
                },
                get isOpen() {
                    return modalContextRef.current?.isOpen
                },
                get config() {
                    return modalContextRef.current?.config
                },
                get modalContext() {
                    return modalContextRef.current
                },
                get onTopOfStack() {
                    return modalContextRef.current?.onTopOfStack
                },
                get shouldRender() {
                    return modalContextRef.current?.shouldRender
                },
            }),
            [modalContext],
        )

        if (!modalContext?.shouldRender) {
            return null
        }

        return (
            <>
                {typeof children === 'function'
                    ? children({
                          // Spread props first so they can be overridden by built-in props
                          ...modalContext.props,
                          afterLeave: modalContext.afterLeave,
                          close: modalContext.close,
                          config,
                          emit: modalContext.emit,
                          getChildModal: modalContext.getChildModal,
                          getParentModal: modalContext.getParentModal,
                          id: modalContext.id,
                          index: modalContext.index,
                          isOpen: modalContext.isOpen,
                          modalContext,
                          onTopOfStack: modalContext.onTopOfStack,
                          reload: modalContext.reload,
                          setOpen: modalContext.setOpen,
                          shouldRender: modalContext.shouldRender,
                      })
                    : children}

                {/* Next modal in the stack */}
                {nextIndex !== undefined && <ModalRenderer index={nextIndex} />}
            </>
        )
    },
)

HeadlessModal.displayName = 'HeadlessModal'
export default HeadlessModal
