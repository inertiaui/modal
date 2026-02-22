import { ReactNode } from 'react';
import { Modal } from './types';
interface SlideoverContentConfig {
    maxWidth: string;
    paddingClasses: string;
    panelClasses: string;
    position: string;
    closeButton: boolean;
    closeExplicitly?: boolean;
    closeOnClickOutside?: boolean;
}
interface SlideoverContentProps {
    modalContext: Modal;
    config: SlideoverContentConfig;
    useNativeDialog: boolean;
    isFirstModal: boolean;
    onAfterLeave?: () => void;
    children: ReactNode | ((props: {
        modalContext: Modal;
        config: SlideoverContentConfig;
    }) => ReactNode);
}
declare const SlideoverContent: ({ modalContext, config, useNativeDialog, isFirstModal, onAfterLeave, children }: SlideoverContentProps) => import("react/jsx-runtime").JSX.Element;
export default SlideoverContent;
