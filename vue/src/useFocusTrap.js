import { onBeforeUnmount, onMounted, ref } from 'vue'
import { createFocusTrap } from 'focus-trap'

export function useFocusTrap(closeExplicitly, onDeactivateCallback) {
    const wrapper = ref(null)
    const trap = ref(null)

    onMounted(() => {
        if (!wrapper.value) {
            return
        }

        trap.value = createFocusTrap(wrapper.value, {
            clickOutsideDeactivates: !closeExplicitly,
            escapeDeactivates: !closeExplicitly,
            onDeactivate: () => onDeactivateCallback?.(),
            fallbackFocus: () => wrapper.value,
        })

        trap.value.activate()
    })

    onBeforeUnmount(() => {
        trap.value?.deactivate()
    })

    return {
        wrapper,
    }
}
