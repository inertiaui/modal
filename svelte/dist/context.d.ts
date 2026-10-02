import type { Modal } from './modalStack.svelte.js';
export interface ModalContextValue {
    getModal: () => Modal | null;
}
export declare const getModalContext: () => ModalContextValue, setModalContext: (context: ModalContextValue) => ModalContextValue;
