import { TransitionChild } from '@headlessui/react'
import CloseButton from './CloseButton'
import clsx from 'clsx'
import { useFocusTrap } from './useFocusTrap'
import { useRef } from 'react'

const SlideoverContent = ({ modalContext, config, children }) => {
    const wrapper = useRef(null);
    const { activate } = useFocusTrap(config?.closeExplicitly, () => modalContext.close());

    return (
        <div className="im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden">
            <div
                className={clsx('im-slideover-positioner flex min-h-full items-center', {
                    'justify-start rtl:justify-end': config?.position === 'left',
                    'justify-end rtl:justify-start': config?.position === 'right',
                })}
            >
                <TransitionChild
                    as="div"
                    ref={wrapper}
                    enterFrom={`opacity-0 ${config.position === 'left' ? '-translate-x-full' : 'translate-x-full'}`}
                    enterTo="opacity-100 translate-x-0"
                    leaveFrom="opacity-100 translate-x-0"
                    leaveTo={`opacity-0 ${config.position === 'left' ? '-translate-x-full' : 'translate-x-full'}`}
                    afterEnter={() => activate(wrapper.current)}
                    afterLeave={modalContext.afterLeave}
                    className={clsx(
                        'im-slideover-wrapper pointer-events-auto w-full transition duration-300 ease-in-out',
                        modalContext.onTopOfStack ? '' : 'blur-sm',
                        {
                            'sm:max-w-sm': config.maxWidth === 'sm',
                            'sm:max-w-md': config.maxWidth === 'md',
                            'sm:max-w-md md:max-w-lg': config.maxWidth === 'lg',
                            'sm:max-w-md md:max-w-xl': config.maxWidth === 'xl',
                            'sm:max-w-md md:max-w-xl lg:max-w-2xl': config.maxWidth === '2xl',
                            'sm:max-w-md md:max-w-xl lg:max-w-3xl': config.maxWidth === '3xl',
                            'sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl': config.maxWidth === '4xl',
                            'sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl': config.maxWidth === '5xl',
                            'sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl': config.maxWidth === '6xl',
                            'sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl': config.maxWidth === '7xl',
                        },
                    )}
                >
                    <div className={`im-slideover-content relative ${config.paddingClasses} ${config.panelClasses}`}>
                        {config.closeButton && (
                            <div className="absolute right-0 top-0 pr-3 pt-3">
                                <CloseButton onClick={modalContext.close} />
                            </div>
                        )}
                        {typeof children === 'function' ? children({ modalContext, config }) : children}
                    </div>
                </TransitionChild>
            </div>
        </div>
    )
}

export default SlideoverContent
