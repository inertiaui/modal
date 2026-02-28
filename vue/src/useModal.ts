import { inject, toValue } from 'vue'
import type { Modal } from './modalStack'

export default function useModal(): Modal | null {
    return toValue(inject<Modal | null>('modalContext', null))
}
