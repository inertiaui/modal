import { Dialog, Transition, TransitionChild } from '@headlessui/react'
import { useMemo, useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import { getConfig, getConfigByType } from './config'
import { useModalIndex } from './ModalRenderer.jsx'
import { useModalStack } from './ModalRoot.jsx'
import ModalContent from './ModalContent'
import ModalRenderer from './ModalRenderer'
import SlideoverContent from './SlideoverContent'

const Modal = forwardRef(({ name, children, ...props }, ref) => {
    const modalIndex = useModalIndex()
    const { stack, registerLocalModal, removeLocalModal } = useModalStack()

    const [localModalContext, setLocalModalContext] = useState(null)
    const modalContext = useMemo(() => (name ? localModalContext : stack[modalIndex]))

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

    const Content = useMemo(() => (modalProps.slideover ? SlideoverContent : ModalContent), [modalProps.slideover])

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
            close: () => modalContext.close(),
            emit: (...args) => modalContext.emit(...args),
            getChildModal: () => modalContext.getChildModal(),
            getParentModal: () => modalContext.getParentModal(),
            modalContext: modalContext,
            reload: () => modalContext.reload(),
        }),
        [modalContext],
    )

    const closeDialog = () => {
        if (!modalProps.closeExplicitly) {
            modalContext.close()
        }
    }

    return (
        modalContext && (
            <Transition
                appear={true}
                show={modalContext.open ?? false}
            >
                <Dialog
                    as="div"
                    className="im-dialog relative z-20"
                    onClose={closeDialog}
                    data-inertiaui-modal-id={modalContext.id}
                    data-inertiaui-modal-index={modalContext.index}
                >
                    {/* Only transition the backdrop for the first modal in the stack */}
                    {modalContext.index === 0 ? (
                        <TransitionChild
                            enter="transition transform ease-in-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition transform ease-in-out duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            {modalContext.onTopOfStack ? (
                                <div
                                    className="im-backdrop fixed inset-0 z-30 bg-black/75"
                                    aria-hidden="true"
                                />
                            ) : (
                                <div />
                            )}
                        </TransitionChild>
                    ) : null}

                    {/* On multiple modals, only show a backdrop for the modal that is on top of the stack */}
                    {modalContext.index > 0 && modalContext.onTopOfStack ? <div className="im-backdrop fixed inset-0 z-30 bg-black/75" /> : null}

                    {/* The modal/slideover content itself */}
                    <Content
                        modalContext={modalContext}
                        modalProps={modalProps}
                    >
                        {typeof children === 'function'
                            ? children({
                                  close: modalContext.close,
                                  emit: modalContext.emit,
                                  getChildModal: modalContext.getChildModal,
                                  getParentModal: modalContext.getParentModal,
                                  modalContext,
                                  modalProps,
                                  reload: modalContext.reload,
                              })
                            : children}
                    </Content>

                    {/* Next modal in the stack */}
                    {stack[modalContext.index + 1] && <ModalRenderer index={modalContext.index + 1} />}
                </Dialog>
            </Transition>
        )
    )
})

Modal.displayName = 'Modal'
export default Modal
