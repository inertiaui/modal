import { useMemo, useState, forwardRef, useImperativeHandle, useEffect } from 'react'
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

    const modalPropsSlideover = useMemo(() => modalContext?.modalProps.slideover ?? props.slideover ?? getConfig('type') === 'slideover', [props.slideover])

    const modalProps = useMemo(
        () => ({
            slideover: modalPropsSlideover,
            closeButton: props.closeButton ?? getConfigByType(modalPropsSlideover, 'closeButton'),
            closeExplicitly: props.closeExplicitly ?? getConfigByType(modalPropsSlideover, 'closeExplicitly'),
            maxWidth: props.maxWidth ?? getConfigByType(modalPropsSlideover, 'maxWidth'),
            paddingClasses: props.paddingClasses ?? getConfigByType(modalPropsSlideover, 'paddingClasses'),
            panelClasses: props.panelClasses ?? getConfigByType(modalPropsSlideover, 'panelClasses'),
            position: props.position ?? getConfigByType(modalPropsSlideover, 'position'),
            ...modalContext?.modalProps,
        }),
        [props, modalContext?.modalProps],
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

    useImperativeHandle(
        ref,
        () => ({
            afterLeave: () => modalContext.afterLeave(),
            close: () => modalContext.close(),
            emit: (...args) => modalContext.emit(...args),
            getChildModal: () => modalContext.getChildModal(),
            getParentModal: () => modalContext.getParentModal(),
            index: modalContext?.index,
            isOpen: modalContext?.open,
            modalContext,
            modalProps,
            reload: () => modalContext.reload(),
            setOpen: () => modalContext.setOpen(),
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
                          emit: modalContext.emit,
                          getChildModal: modalContext.getChildModal,
                          getParentModal: modalContext.getParentModal,
                          index: modalContext.index,
                          isOpen: modalContext.open,
                          modalContext,
                          modalProps,
                          reload: modalContext.reload,
                          setOpen: modalContext.setOpen,
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
