import { useModalIndex } from './ModalRenderer'
import { useModalStack } from './ModalRoot'
import type { Modal } from './types'

export default function useModal(): Modal | null {
    return useModalStack().stack[useModalIndex()] ?? null
}
