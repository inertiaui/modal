import { ReactNode } from 'react';
import { Modal } from './types';
interface ModalContentConfig {
    maxWidth: string;
    paddingClasses: string;
    panelClasses: string;
    position: string;
    closeButton: boolean;
    closeExplicitly?: boolean;
    closeOnClickOutside?: boolean;
}
interface ModalContentProps {
    modalContext: Modal;
    config: ModalContentConfig;
    useNativeDialog: boolean;
    isFirstModal: boolean;
    onAfterLeave?: () => void;
    children: ReactNode | ((props: {
        modalContext: Modal;
        config: ModalContentConfig;
    }) => ReactNode);
}
declare const ModalContent: ({ modalContext, config, useNativeDialog, isFirstModal, onAfterLeave, children }: ModalContentProps) => import("react/jsx-runtime").JSX.Element;
export default ModalContent;
