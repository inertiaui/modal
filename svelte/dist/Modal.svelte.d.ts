import { type Snippet } from 'svelte';
import type { Modal as ModalInstance } from './modalStack.svelte.js';
interface Props {
    name?: string;
    slideover?: boolean;
    closeButton?: boolean;
    closeExplicitly?: boolean;
    closeOnClickOutside?: boolean;
    maxWidth?: string;
    paddingClasses?: string | boolean;
    panelClasses?: string | boolean;
    position?: string;
    children?: Snippet<[any]>;
    onFocus?: () => void;
    onBlur?: () => void;
    onClose?: () => void;
    onSuccess?: () => void;
    onAfterLeave?: () => void;
    [key: string]: unknown;
}
declare const Modal: import("svelte").Component<Props, {
    afterLeave: () => void;
    close: () => void;
    emit: (event: string, ...args: unknown[]) => void;
    getChildModal: () => ReturnType<ModalInstance["getChildModal"]> | undefined;
    getParentModal: () => ReturnType<ModalInstance["getParentModal"]> | undefined;
    reload: (options?: import("./modalStack.svelte.js").ReloadOptions) => void;
    setOpen: (open: boolean) => void;
}, "">;
type Modal = ReturnType<typeof Modal>;
export default Modal;
