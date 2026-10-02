import { getModalContext } from './context.js'
import type { Modal } from './modalStack.svelte.js'

export default function useModal(): Modal | null {
    try {
        return getModalContext().getModal()
    } catch {
        return null
    }
}
