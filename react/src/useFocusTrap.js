import { useEffect, useRef } from 'react'
import { createFocusTrap } from 'focus-trap'

export function useFocusTrap(closeExplicitly, onDeactivateCallback) {
    const trapRef = useRef(null)

    const activate = (wrapper) => {
        if (wrapper) {
            trapRef.current = createFocusTrap(wrapper, {
                clickOutsideDeactivates: !closeExplicitly,
                escapeDeactivates: !closeExplicitly,
                onDeactivate: () => onDeactivateCallback?.(),

                fallbackFocus: () => wrapper,
            })

            trapRef.current.activate()
        }
    }

    const deactivate = () => {
        trapRef.current?.deactivate()
    }

    useEffect(() => deactivate, [])

    return { activate, deactivate }
}
