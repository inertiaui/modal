import { useModalIndex } from './ModalRenderer.jsx'
import { useModalStack } from './ModalRoot.jsx'

export default function useModal() {
    return useModalStack().stack[useModalIndex()] ?? null
}
