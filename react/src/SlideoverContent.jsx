import { TransitionChild, DialogPanel } from '@headlessui/react'
import CloseButton from './CloseButton'

const ModalContent = ({ modalContext, modalProps, children }) => {
    const getMaxWidthClass = () => {
        const widthMap = {
            sm: 'sm:max-w-sm',
            md: 'sm:max-w-md',
            lg: 'sm:max-w-md md:max-w-lg',
            xl: 'sm:max-w-md md:max-w-xl',
            '2xl': 'sm:max-w-md md:max-w-xl lg:max-w-2xl',
            '3xl': 'sm:max-w-md md:max-w-xl lg:max-w-3xl',
            '4xl': 'sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl',
            '5xl': 'sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl',
            '6xl': 'sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl',
            '7xl': 'sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl',
        }
        return widthMap[modalProps.maxWidth] || ''
    }

    const getPositionClass = () => {
        const positionMap = {
            left: 'justify-start',
            right: 'justify-end',
        }
        return positionMap[modalProps.position] || 'justify-end'
    }

    const renderChildren = () => {
        if (typeof children === 'function') {
            return children({ modalContext, modalProps })
        }
        return children
    }

    return (
        <div className="im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden">
            <div className={`im-slideover-positioner flex min-h-full items-center ${getPositionClass()}`}>
                <TransitionChild
                    enterFrom={`opacity-0 ${modalProps.position === 'left' ? '-translate-x-full' : 'translate-x-full'}`}
                    enterTo="opacity-100 translate-x-0"
                    leaveFrom="opacity-100 translate-x-0"
                    leaveTo={`opacity-0 ${modalProps.position === 'left' ? '-translate-x-full' : 'translate-x-full'}`}
                    afterLeave={modalContext.afterLeave}
                    className={`im-slideover-wrapper w-full transition duration-300 ease-in-out ${
                        !modalContext.onTopOfStack ? 'blur-sm' : ''
                    } ${getMaxWidthClass()}`}
                >
                    <DialogPanel className={`im-slideover-content relative ${modalProps.paddingClasses} ${modalProps.panelClasses}`}>
                        {modalProps.closeButton && (
                            <div className="absolute right-0 top-0 pr-3 pt-3">
                                <CloseButton onClick={modalContext.close} />
                            </div>
                        )}
                        {renderChildren()}
                    </DialogPanel>
                </TransitionChild>
            </div>
        </div>
    )
}

export default ModalContent
