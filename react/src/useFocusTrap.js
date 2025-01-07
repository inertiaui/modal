import { useEffect, useRef } from 'react'
import { createFocusTrap } from 'focus-trap'

export function useFocusTrap(closeExplicitly, onDeactivateCallback) {
    const wrapperRef = useRef(null)

    useEffect(() => {
        if (!wrapperRef.current) {
            return
        }

        const trap = createFocusTrap(wrapperRef.current, {
            clickOutsideDeactivates: !closeExplicitly,
            escapeDeactivates: !closeExplicitly,
            onDeactivate: () => onDeactivateCallback?.(),
            fallbackFocus: () => wrapperRef.current,
        })

        trap.activate()

        return () => trap.deactivate()
    }, [])

    return wrapperRef
}
