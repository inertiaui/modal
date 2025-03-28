// See: https://github.com/inertiajs/inertia/blob/48bcd21fb7daf467d0df1bfde2408f161f94a579/packages/react/src/WhenVisible.ts
import { createElement, useCallback, useEffect, useRef, useState } from 'react'
import useModal from './useModal'

const WhenVisible = ({ children, data, params, buffer, as, always, fallback }) => {
    always = always ?? false
    as = as ?? 'div'
    fallback = fallback ?? null

    const [loaded, setLoaded] = useState(false)
    const hasFetched = useRef(false)
    const fetching = useRef(false)
    const ref = useRef(null)

    const modal = useModal()

    const getReloadParams = useCallback(() => {
        if (data) {
            return {
                only: Array.isArray(data) ? data : [data],
            }
        }

        if (!params) {
            throw new Error('You must provide either a `data` or `params` prop.')
        }

        return params
    }, [params, data])

    useEffect(() => {
        if (!ref.current) {
            return
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (!entries[0].isIntersecting) {
                    return
                }

                if (!always && hasFetched.current) {
                    observer.disconnect()
                }

                if (fetching.current) {
                    return
                }

                hasFetched.current = true
                fetching.current = true

                const reloadParams = getReloadParams()

                modal.reload({
                    ...reloadParams,
                    onStart: (e) => {
                        fetching.current = true
                        reloadParams.onStart?.(e)
                    },
                    onFinish: (e) => {
                        setLoaded(true)
                        fetching.current = false
                        reloadParams.onFinish?.(e)

                        if (!always) {
                            observer.disconnect()
                        }
                    },
                })
            },
            {
                rootMargin: `${buffer || 0}px`,
            },
        )

        observer.observe(ref.current)

        return () => {
            observer.disconnect()
        }
    }, [ref, getReloadParams, buffer])

    if (always || !loaded) {
        return createElement(
            as,
            {
                props: null,
                ref,
            },
            loaded ? children : fallback,
        )
    }

    return loaded ? children : null
}

WhenVisible.displayName = 'InertiaWhenVisible'

export default WhenVisible
