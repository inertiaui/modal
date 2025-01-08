import { Transition, TransitionChild } from '@headlessui/react'
import { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import HeadlessModal from './HeadlessModal'
import ModalContent from './ModalContent'
import SlideoverContent from './SlideoverContent'
import { modalDOMHandler } from './helpers'

const Modal = forwardRef(({ name, children, onFocus = null, onBlur = null, onClose = null, onSuccess = null, onAfterLeave = null, ...props }, ref) => {
    const renderChildren = (contentProps) => {
        if (typeof children === 'function') {
            return children(contentProps)
        }

        return children
    }

    const headlessModalRef = useRef(null)

    useEffect(() => {
        if (headlessModalRef?.current?.index === 0) {
            modalDOMHandler.prepare()

            return () => modalDOMHandler.cleanup()
        }
    }, [headlessModalRef])

    useImperativeHandle(ref, () => headlessModalRef.current, [headlessModalRef])

    return (
        <HeadlessModal
            ref={headlessModalRef}
            name={name}
            onFocus={onFocus}
            onBlur={onBlur}
            onClose={onClose}
            onSuccess={onSuccess}
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
            }) => (
                <Transition
                    appear={true}
                    show={isOpen ?? false}
                    afterLeave={onAfterLeave}
                >
                    <div
                        className="im-dialog relative z-20"
                        data-inertiaui-modal-id={id}
                        data-inertiaui-modal-index={index}
                    >
                        {/* Only transition the backdrop for the first modal in the stack */}
                        {index === 0 ? (
                            <TransitionChild
                                enter="transition transform ease-in-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition transform ease-in-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                {onTopOfStack ? (
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
                        {index > 0 && onTopOfStack ? <div className="im-backdrop fixed inset-0 z-30 bg-black/75" /> : null}

                        {/* The modal/slideover content itself */}
                        {config.slideover ? (
                            <SlideoverContent
                                modalContext={modalContext}
                                config={config}
                            >
                                {renderChildren({
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
                            >
                                {renderChildren({
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
                </Transition>
            )}
        </HeadlessModal>
    )
})

Modal.displayName = 'Modal'
export default Modal
