import { useMemo, useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import { getConfig, getConfigByType } from './config'
import { useModalIndex } from './ModalRenderer.jsx'
import { useModalStack } from './ModalRoot.jsx'
import ModalRenderer from './ModalRenderer'

const HeadlessModal = forwardRef(({ name, children, ...props }, ref) => {
    const modalIndex = useModalIndex()
    const { stack, registerLocalModal, removeLocalModal } = useModalStack()

    const [localModalContext, setLocalModalContext] = useState(null)
    let modalContextCopy = name ? localModalContext : stack[modalIndex]
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
                modalContextCopy = localContext
            })

            return () => {
                removeListeners?.()
                removeListeners = null
                removeLocalModal(name)
            }
        }

        return modalContext.registerEventListenersFromProps(props)
    }, [name])

    useImperativeHandle(
        ref,
        () => ({
            afterLeave: () => modalContextCopy.afterLeave(),
            close: () => modalContextCopy.close(),
            config,
            emit: (...args) => modalContextCopy.emit(...args),
            getChildModal: () => modalContextCopy.getChildModal(),
            getParentModal: () => modalContextCopy.getParentModal(),
            id: modalContextCopy?.id,
            index: modalContextCopy?.index,
            isOpen: modalContextCopy?.isOpen,
            modalContext: modalContextCopy,
            onTopOfStack: modalContextCopy?.onTopOfStack,
            reload: () => modalContextCopy.reload(),
            setOpen: () => modalContextCopy.setOpen(),
            shouldRender: modalContextCopy?.shouldRender,
        }),
        [modalContextCopy],
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
