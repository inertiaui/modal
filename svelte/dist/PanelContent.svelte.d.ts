import { type Snippet } from 'svelte';
import type { Modal } from './modalStack.svelte.js';
interface PanelConfig {
    slideover?: boolean;
    closeButton?: boolean;
    closeExplicitly?: boolean;
    closeOnClickOutside?: boolean;
    maxWidth?: string;
    paddingClasses?: string;
    panelClasses?: string;
    position?: string;
}
interface Props {
    variant: 'modal' | 'slideover';
    modalContext: Modal;
    config: PanelConfig;
    useNativeDialog: boolean;
    isFirstModal: boolean;
    children?: Snippet;
    onAfterLeave?: () => void;
}
declare const PanelContent: import("svelte").Component<Props, {}, "">;
type PanelContent = ReturnType<typeof PanelContent>;
export default PanelContent;
