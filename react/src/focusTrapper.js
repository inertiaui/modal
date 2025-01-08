import { createFocusTrap } from 'focus-trap'

export function focusTrapper(wrapper, closeExplicitly, onDeactivateCallback) {
    let trap = null

    if (wrapper) {
        trap = createFocusTrap(wrapper, {
            clickOutsideDeactivates: !closeExplicitly,
            escapeDeactivates: !closeExplicitly,
            onDeactivate: () => onDeactivateCallback?.(),
            fallbackFocus: () => wrapper,
        })

        trap.activate()
    }

    const deactivate = () => {
        trap?.deactivate()
        trap = null
    }

    return { deactivate, wrapper }
}
