import { type Snippet } from 'svelte';
import { type Modal } from './modalStack.svelte.js';
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
    [key: string]: unknown;
}
declare const HeadlessModal: import("svelte").Component<Props, {
    emit: (event: string, ...args: unknown[]) => void;
    afterLeave: () => void;
    close: () => void;
    reload: (options?: import("./modalStack.svelte.js").ReloadOptions) => void;
    setOpen: (open: boolean) => void;
    getChildModal: () => Modal | null | undefined;
    getParentModal: () => Modal | null | undefined;
}, "">;
type HeadlessModal = ReturnType<typeof HeadlessModal>;
export default HeadlessModal;
