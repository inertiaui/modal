import { useCallback, useState, useEffect } from 'react'
import { useModalStack, modalPropNames } from './ModalRoot'
import { only, rejectNullValues } from './helpers'

const ModalLink = ({
    href,
    method = 'get',
    data = {},
    as: Component = 'a',
    fragment = null,
    headers = {},
    queryStringArrayFormat = 'brackets',
    onAfterLeave = null,
    onBlur = null,
    onClose = null,
    onError = null,
    onFocus = null,
    onStart = null,
    onSuccess = null,
    children,
    ...props
}) => {
    const [loading, setLoading] = useState(false)
    const [modalContext, setModalContext] = useState(null)
    const { stack, visit } = useModalStack()

    // Separate standard props from custom event handlers
    const standardProps = {}
    const customEvents = {}

    Object.keys(props).forEach((key) => {
        if (modalPropNames.includes(key)) {
            return
        }

        if (key.startsWith('on') && typeof props[key] === 'function') {
            if (key.toLowerCase() in window) {
                standardProps[key] = props[key]
            } else {
                customEvents[key] = props[key]
            }
        } else {
            standardProps[key] = props[key]
        }
    })

    useEffect(() => {
        if (fragment && window.location.hash === `#${fragment}`) {
            handle()
        }
    }, [fragment])

    const [isBlurred, setIsBlurred] = useState(false)

    useEffect(() => {
        if (!modalContext) {
            return
        }

        if (modalContext.onTopOfStack && isBlurred) {
            onFocus?.()
        } else if (!modalContext.onTopOfStack && !isBlurred) {
            onBlur?.()
        }

        setIsBlurred(!modalContext.onTopOfStack)
    }, [stack])

    const onCloseCallback = useCallback(
        (index) => {
            if (fragment && index === 0) {
                window.location.hash = ''
            }
            onClose?.()
        },
        [onClose, fragment],
    )

    const onAfterLeaveCallback = useCallback(() => {
        setModalContext(null)
        onAfterLeave?.()
    }, [onAfterLeave])

    const handle = useCallback(
        (e) => {
            e?.preventDefault()
            if (loading) return

            if (!href.startsWith('#')) {
                setLoading(true)
                onStart?.()
            }

            visit(
                href,
                method,
                data,
                headers,
                rejectNullValues(only(props, modalPropNames)),
                () => onCloseCallback(stack.length),
                onAfterLeaveCallback,
                queryStringArrayFormat,
            )
                .then((newModalContext) => {
                    setModalContext(newModalContext)
                    if (fragment && newModalContext.index === 0) {
                        window.location.hash = fragment
                    }
                    newModalContext.registerEventListenersFromProps(customEvents)
                    onSuccess?.()
                })
                .catch((error) => {
                    console.error(error)
                    onError?.(error)
                })
                .finally(() => setLoading(false))
        },
        [href, method, data, headers, queryStringArrayFormat, props, onCloseCallback, onAfterLeaveCallback],
    )

    return (
        <Component
            {...standardProps}
            href={href}
            onClick={handle}
        >
            {typeof children === 'function' ? children({ loading }) : children}
        </Component>
    )
}

export default ModalLink
