import { ref } from 'vue'
import { createFocusTrap } from 'focus-trap'

export function useFocusTrap(wrapper, closeExplicitly, onDeactivateCallback) {
    const trap = ref(null)

    if (wrapper) {
        trap.value = createFocusTrap(wrapper, {
            clickOutsideDeactivates: !closeExplicitly,
            escapeDeactivates: !closeExplicitly,
            onDeactivate: () => onDeactivateCallback?.(),
            fallbackFocus: () => wrapper,
        })

        trap.value.activate()
    }

    const deactivate = () => {
        trap.value?.deactivate()
        trap.value = null
    }

    return {
        deactivate,
        wrapper,
    }
}
