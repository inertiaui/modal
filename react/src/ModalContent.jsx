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
            top: 'items-start',
            center: 'items-center',
            bottom: 'items-end',
        }
        return positionMap[modalProps.position] || 'items-center'
    }

    const renderChildren = () => {
        if (typeof children === 'function') {
            return children({ modalContext, modalProps })
        }
        return children
    }

    return (
        <div className="im-modal-container fixed inset-0 z-40 overflow-y-auto p-4">
            <div className={`im-modal-positioner flex min-h-full justify-center ${getPositionClass()}`}>
                <TransitionChild
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    afterLeave={modalContext.afterLeave}
                    className={`im-modal-wrapper w-full transition duration-300 ease-in-out ${
                        !modalContext.onTopOfStack ? 'blur-sm' : ''
                    } ${getMaxWidthClass()}`}
                >
                    <DialogPanel className={`im-modal-content relative ${modalProps.paddingClasses} ${modalProps.panelClasses}`}>
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
