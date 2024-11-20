import { useMemo, useState, forwardRef, useImperativeHandle, useEffect, useRef } from 'react'
import { getConfig, getConfigByType } from './config'
import { useModalIndex } from './ModalRenderer.jsx'
import { useModalStack } from './ModalRoot.jsx'
import ModalRenderer from './ModalRenderer'

const HeadlessModal = forwardRef(({ name, children, ...props }, ref) => {
    const modalIndex = useModalIndex()
    const { stack, registerLocalModal, removeLocalModal } = useModalStack()

    const [localModalContext, setLocalModalContext] = useState(null)
    const modalContext = useMemo(() => (name ? localModalContext : stack[modalIndex]), [name, localModalContext, modalIndex, stack])

    const nextIndex = useMemo(() => {
        return stack.find((m) => m.shouldRender && m.index > modalContext?.index)?.index
    }, [modalIndex, stack])

    const configSlideover = useMemo(() => modalContext?.config.slideover ?? props.slideover ?? getConfig('type') === 'slideover', [props.slideover])

    const config = useMemo(
        () => ({
            slideover: configSlideover,
            closeButton: props.closeButton ?? getConfigByType(configSlideover, 'closeButton'),
            closeExplicitly: props.closeExplicitly ?? getConfigByType(configSlideover, 'closeExplicitly'),
            maxWidth: props.maxWidth ?? getConfigByType(configSlideover, 'maxWidth'),
            paddingClasses: props.paddingClasses ?? getConfigByType(configSlideover, 'paddingClasses'),
            panelClasses: props.panelClasses ?? getConfigByType(configSlideover, 'panelClasses'),
            position: props.position ?? getConfigByType(configSlideover, 'position'),
            ...modalContext?.config,
        }),
        [props, modalContext?.config],
    )

    useEffect(() => {
        if (name) {
            let removeListeners = null

            registerLocalModal(name, (localContext) => {
                removeListeners = localContext.registerEventListenersFromProps(props)
                setLocalModalContext(localContext)
            })

            return () => {
                removeListeners?.()
                removeListeners = null
                removeLocalModal(name)
            }
        }

        return modalContext.registerEventListenersFromProps(props)
    }, [name])

    // Store the latest modalContext in a ref to maintain reference
    const modalContextRef = useRef(modalContext)

    // Update the ref whenever modalContext changes
    useEffect(() => {
        modalContextRef.current = modalContext
    }, [modalContext])

    useImperativeHandle(
        ref,
        () => ({
            afterLeave: () => modalContextRef.current?.afterLeave(),
            close: () => modalContextRef.current?.close(),
            emit: (...args) => modalContextRef.current?.emit(...args),
            getChildModal: () => modalContextRef.current?.getChildModal(),
            getParentModal: () => modalContextRef.current?.getParentModal(),
            reload: (...args) => modalContextRef.current?.reload(...args),
            setOpen: () => modalContextRef.current?.setOpen(),

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

    return (
        modalContext?.shouldRender && (
            <>
                {typeof children === 'function'
                    ? children({
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
                {nextIndex && <ModalRenderer index={nextIndex} />}
            </>
        )
    )
})

HeadlessModal.displayName = 'HeadlessModal'
export default HeadlessModal
