import { useCallback, useState, useEffect, useMemo, useRef } from 'react'
import { useModalStack, modalPropNames } from './ModalRoot'
import { only, rejectNullValues, isStandardDomEvent } from './helpers'
import { getConfig } from './config'

const ModalLink = ({
    href,
    method = 'get',
    data = {},
    as: Component = 'a',
    headers = {},
    queryStringArrayFormat = 'brackets',
    onAfterLeave = null,
    onBlur = null,
    onClose = null,
    onError = null,
    onFocus = null,
    onStart = null,
    onSuccess = null,
    navigate = null,
    prefetch = false,
    cacheFor = 30000,
    cacheTags = [],
    onPrefetching = () => {},
    onPrefetched = () => {},
    children,
    ...props
}) => {
    const [loading, setLoading] = useState(false)
    const [modalContext, setModalContext] = useState(null)
    const { stack, visit, prefetch: prefetchModal } = useModalStack()
    const hoverTimeout = useRef(null)

    const shouldNavigate = useMemo(() => {
        return navigate ?? getConfig('navigate')
    }, [navigate])

    const prefetchModes = useMemo(() => {
        if (prefetch === false) {
            return []
        }

        if (prefetch === true) {
            return ['hover']
        }

        if (typeof prefetch === 'string') {
            return [prefetch]
        }

        return Array.isArray(prefetch) ? prefetch : [prefetch]
    }, [prefetch])

    const cacheForValue = useMemo(() => {
        if (cacheFor !== 30000) {
            return cacheFor
        }

        if (prefetchModes.length === 1 && prefetchModes[0] === 'click') {
            return 0
        }

        return 30000
    }, [cacheFor, prefetchModes])

    const doPrefetch = useCallback(() => {
        return prefetchModal(
            href,
            method,
            data,
            headers,
            queryStringArrayFormat,
            shouldNavigate,
            cacheForValue,
            Array.isArray(cacheTags) ? cacheTags : [cacheTags].filter(Boolean),
            onPrefetching,
            onPrefetched,
        )
    }, [href, method, data, headers, queryStringArrayFormat, shouldNavigate, cacheForValue, cacheTags, onPrefetching, onPrefetched, prefetchModal])

    useEffect(() => {
        return () => {
            clearTimeout(hoverTimeout.current)
        }
    }, [])

    useEffect(() => {
        if (prefetchModes.includes('mount')) {
            setTimeout(() => doPrefetch())
        }
    }, [prefetchModes, doPrefetch])

    // Separate standard props from custom event handlers
    const standardProps = {}
    const customEvents = {}

    Object.keys(props).forEach((key) => {
        if (modalPropNames.includes(key)) {
            return
        }

        if (key.startsWith('on') && typeof props[key] === 'function') {
            if (isStandardDomEvent(key)) {
                standardProps[key] = props[key]
            } else {
                customEvents[key] = props[key]
            }
        } else {
            standardProps[key] = props[key]
        }
    })

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

    const onCloseCallback = useCallback(() => {
        onClose?.()
    }, [onClose])

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
                shouldNavigate,
            )
                .then((newModalContext) => {
                    setModalContext(newModalContext)
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

    const regularEvents = useMemo(
        () => ({
            onClick: handle,
        }),
        [handle],
    )

    const prefetchHoverEvents = useMemo(
        () => ({
            onMouseEnter: () => {
                hoverTimeout.current = window.setTimeout(() => {
                    doPrefetch()
                }, 75)
            },
            onMouseLeave: () => {
                clearTimeout(hoverTimeout.current)
            },
            onClick: handle,
        }),
        [doPrefetch, handle],
    )

    const prefetchClickEvents = useMemo(
        () => ({
            onMouseDown: (event) => {
                if (event.button === 0) {
                    // left click only
                    event.preventDefault()
                    doPrefetch()
                }
            },
            onKeyDown: (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    doPrefetch()
                }
            },
            onMouseUp: (event) => {
                if (event.button === 0) {
                    // left click only
                    event.preventDefault()
                    handle(event)
                }
            },
            onKeyUp: (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    handle(event)
                }
            },
        }),
        [doPrefetch, handle],
    )

    const eventHandlers = useMemo(() => {
        if (prefetchModes.includes('hover')) {
            return prefetchHoverEvents
        }

        if (prefetchModes.includes('click')) {
            return prefetchClickEvents
        }

        return regularEvents
    }, [prefetchModes, prefetchHoverEvents, prefetchClickEvents, regularEvents])

    return (
        <Component
            {...standardProps}
            {...eventHandlers}
            href={href}
        >
            {typeof children === 'function' ? children({ loading }) : children}
        </Component>
    )
}

export default ModalLink
