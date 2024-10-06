import { TransitionChild, DialogPanel } from '@headlessui/react'
import CloseButton from './CloseButton'
import clsx from 'clsx'

const SlideoverContent = ({ modalContext, modalProps, children }) => {
    return (
        <div className="im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden">
            <div
                className={clsx('im-slideover-positioner flex min-h-full items-center', {
                    'justify-start': modalProps.position === 'left',
                    'justify-end': modalProps.position === 'right',
                })}
            >
                <TransitionChild
                    enterFrom={`opacity-0 ${modalProps.position === 'left' ? '-translate-x-full' : 'translate-x-full'}`}
                    enterTo="opacity-100 translate-x-0"
                    leaveFrom="opacity-100 translate-x-0"
                    leaveTo={`opacity-0 ${modalProps.position === 'left' ? '-translate-x-full' : 'translate-x-full'}`}
                    afterLeave={modalContext.afterLeave}
                    className={clsx('im-slideover-wrapper w-full transition duration-300 ease-in-out', modalContext.onTopOfStack ? '' : 'blur-sm', {
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
                    <DialogPanel className={`im-slideover-content relative ${modalProps.paddingClasses} ${modalProps.panelClasses}`}>
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

export default SlideoverContent
