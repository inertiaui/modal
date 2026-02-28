import { useCallback, useState, useEffect, useMemo, useRef, ReactNode, ElementType, MouseEvent } from 'react'
import { useModalStack, modalPropNames, prefetch as prefetchModal } from './ModalRoot'
import { only, rejectNullValues, isStandardDomEvent } from './helpers'
import { getConfig } from './config'
import type { Modal, PrefetchOption } from './types'
import type { RequestPayload } from '@inertiajs/core'

interface ModalLinkProps {
    href: string
    method?: string
    data?: RequestPayload
    as?: ElementType
    headers?: Record<string, string>
    queryStringArrayFormat?: 'brackets' | 'indices'
    onAfterLeave?: () => void
    onBlur?: () => void
    onClose?: () => void
    onError?: (error: unknown) => void
    onFocus?: () => void
    onStart?: () => void
    onSuccess?: () => void
    onPrefetching?: () => void
    onPrefetched?: () => void
    navigate?: boolean
    // Prefetch options (#146)
    prefetch?: PrefetchOption
    cacheFor?: number
    children: ReactNode | ((props: { loading: boolean }) => ReactNode)
    [key: string]: unknown
}

const ModalLink = ({
    href,
    method = 'get',
    data = {} as RequestPayload,
    as: Component = 'a',
    headers = {},
    queryStringArrayFormat = 'brackets' as const,
    onAfterLeave,
    onBlur,
    onClose,
    onError,
    onFocus,
    onStart,
    onSuccess,
    onPrefetching,
    onPrefetched,
    navigate,
    prefetch = false,
    cacheFor = 30000,
    children,
    ...props
}: ModalLinkProps) => {
    const [loading, setLoading] = useState(false)
    const [modalContext, setModalContext] = useState<Modal | null>(null)
    const { stack, visit } = useModalStack()
    const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

    const shouldNavigate = useMemo(() => {
        return navigate ?? (getConfig('navigate') as boolean)
    }, [navigate])

    // Prefetch logic (#146)
    const prefetchModes = useMemo(() => {
        if (prefetch === true) {
            return ['hover']
        }
        if (prefetch === false) {
            return []
        }
        if (Array.isArray(prefetch)) {
            return prefetch
        }
        return [prefetch]
    }, [prefetch])

    const doPrefetch = useCallback(() => {
        prefetchModal(href, {
            method,
            data,
            headers,
            queryStringArrayFormat,
            cacheFor,
            onPrefetching: onPrefetching ?? undefined,
            onPrefetched: onPrefetched ?? undefined,
        })
    }, [href, method, data, headers, queryStringArrayFormat, cacheFor, onPrefetching, onPrefetched])

    const handleMouseEnter = useCallback(() => {
        if (!prefetchModes.includes('hover')) return

        hoverTimeout.current = setTimeout(() => {
            doPrefetch()
        }, 75) // Small delay to avoid prefetching on accidental hovers
    }, [prefetchModes, doPrefetch])

    const handleMouseLeave = useCallback(() => {
        if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current)
            hoverTimeout.current = null
        }
    }, [])

    const handleMouseDown = useCallback(
        (event: MouseEvent) => {
            if (!prefetchModes.includes('click')) return
            if (event.button !== 0) return // Only left click

            doPrefetch()
        },
        [prefetchModes, doPrefetch],
    )

    // Prefetch on mount
    useEffect(() => {
        if (prefetchModes.includes('mount')) {
            doPrefetch()
        }
    }, [])

    // Cleanup hover timeout on unmount
    useEffect(() => {
        return () => {
            if (hoverTimeout.current) {
                clearTimeout(hoverTimeout.current)
            }
        }
    }, [])

    // Separate standard props from custom event handlers
    const standardProps: Record<string, unknown> = {}
    const customEvents: Record<string, (...args: unknown[]) => void> = {}

    Object.keys(props).forEach((key) => {
        if (modalPropNames.includes(key)) {
            return
        }

        if (key.startsWith('on') && typeof props[key] === 'function') {
            if (isStandardDomEvent(key)) {
                standardProps[key] = props[key]
            } else {
                customEvents[key] = props[key] as (...args: unknown[]) => void
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
        (e?: MouseEvent) => {
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
                rejectNullValues(only(props, modalPropNames)) as Record<string, unknown>,
                () => onCloseCallback(),
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

    return (
        <Component
            {...standardProps}
            href={href}
            onClick={handle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
        >
            {typeof children === 'function' ? children({ loading }) : children}
        </Component>
    )
}

export default ModalLink
