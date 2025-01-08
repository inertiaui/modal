import { onBeforeUnmount, ref } from 'vue'
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

    onBeforeUnmount(() => {
        trap.value?.deactivate()
    })

    return {
        wrapper,
    }
}
