import { Dialog, Transition, TransitionChild } from '@headlessui/react'
import { forwardRef, useRef, useImperativeHandle } from 'react'
import HeadlessModal from './HeadlessModal'
import ModalContent from './ModalContent'
import SlideoverContent from './SlideoverContent'

const Modal = forwardRef(({ name, children, ...props }, ref) => {
    const renderChildren = (contentProps) => {
        if (typeof children === 'function') {
            return children(contentProps)
        }

        return children
    }

    const headlessModalRef = useRef(null)

    useImperativeHandle(ref, () => headlessModalRef.current, [headlessModalRef])

    return (
        <HeadlessModal
            ref={headlessModalRef}
            name={name}
            {...props}
        >
            {({ afterLeave, close, emit, getChildModal, getParentModal, modalContext, modalProps, reload }) => (
                <Transition
                    appear={true}
                    show={modalContext.open ?? false}
                >
                    <Dialog
                        as="div"
                        className="im-dialog relative z-20"
                        onClose={() => (modalProps.closeExplicitly ? null : close())}
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
                        {modalProps.slideover ? (
                            <SlideoverContent
                                modalContext={modalContext}
                                modalProps={modalProps}
                            >
                                {renderChildren({
                                    afterLeave,
                                    close,
                                    emit,
                                    getChildModal,
                                    getParentModal,
                                    modalContext,
                                    modalProps,
                                    reload,
                                })}
                            </SlideoverContent>
                        ) : (
                            <ModalContent
                                modalContext={modalContext}
                                modalProps={modalProps}
                            >
                                {renderChildren({
                                    afterLeave,
                                    close,
                                    emit,
                                    getChildModal,
                                    getParentModal,
                                    modalContext,
                                    modalProps,
                                    reload,
                                })}
                            </ModalContent>
                        )}
                    </Dialog>
                </Transition>
            )}
        </HeadlessModal>
    )
})

Modal.displayName = 'Modal'
export default Modal
