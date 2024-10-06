import { TransitionChild, DialogPanel } from '@headlessui/react'
import CloseButton from './CloseButton'
import clsx from 'clsx'

const ModalContent = ({ modalContext, modalProps, children }) => {
    return (
        <div className="im-modal-container fixed inset-0 z-40 overflow-y-auto p-4">
            <div
                className={clsx('im-modal-positioner flex min-h-full justify-center', {
                    'items-start': modalProps.position === 'top',
                    'items-center': modalProps.position === 'center',
                    'items-end': modalProps.position === 'bottom',
                })}
            >
                <TransitionChild
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    afterLeave={modalContext.afterLeave}
                    className={clsx('im-modal-wrapper w-full transition duration-300 ease-in-out', modalContext.onTopOfStack ? '' : 'blur-sm', {
                        'sm:max-w-sm': modalProps.maxWidth === 'sm',
                        'sm:max-w-md': modalProps.maxWidth === 'md',
                        'sm:max-w-md md:max-w-lg': modalProps.maxWidth === 'lg',
                        'sm:max-w-md md:max-w-xl': modalProps.maxWidth === 'xl',
                        'sm:max-w-md md:max-w-xl lg:max-w-2xl': modalProps.maxWidth === '2xl',
                        'sm:max-w-md md:max-w-xl lg:max-w-3xl': modalProps.maxWidth === '3xl',
                        'sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl': modalProps.maxWidth === '4xl',
                        'sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl': modalProps.maxWidth === '5xl',
                        'sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl': modalProps.maxWidth === '6xl',
                        'sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl': modalProps.maxWidth === '7xl',
                    })}
                >
                    <DialogPanel className={`im-modal-content relative ${modalProps.paddingClasses} ${modalProps.panelClasses}`}>
                        {modalProps.closeButton && (
                            <div className="absolute right-0 top-0 pr-3 pt-3">
                                <CloseButton onClick={modalContext.close} />
                            </div>
                        )}
                        {typeof children === 'function' ? children({ modalContext, modalProps }) : children}
                    </DialogPanel>
                </TransitionChild>
            </div>
        </div>
    )
}

export default ModalContent
