import { createContext } from 'svelte'

import type { Modal } from './modalStack.svelte.js'

export interface ModalContextValue {
    getModal: () => Modal | null
}

export const [getModalContext, setModalContext] = createContext<ModalContextValue>()
