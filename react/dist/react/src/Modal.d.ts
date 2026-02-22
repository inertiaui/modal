import { ReactNode } from 'react';
import { HeadlessModalRef } from './HeadlessModal';
import { Modal as ModalType, ReloadOptions } from './types';
interface ModalConfig {
    slideover: boolean;
    closeButton: boolean;
    closeExplicitly: boolean;
    maxWidth: string;
    paddingClasses: string;
    panelClasses: string;
    position: string;
}
interface ModalRenderProps {
    afterLeave: () => void;
    close: () => void;
    config: ModalConfig;
    emit: (event: string, ...args: unknown[]) => void;
    getChildModal: () => ModalType | null;
    getParentModal: () => ModalType | null;
    id: string;
    index: number;
    isOpen: boolean;
    modalContext: ModalType;
    onTopOfStack: boolean;
    reload: (options?: ReloadOptions) => void;
    setOpen: (open: boolean) => void;
    shouldRender: boolean;
    [key: string]: unknown;
}
interface ModalBaseProps {
    name?: string;
    children: ReactNode | ((props: ModalRenderProps) => ReactNode);
    onFocus?: () => void;
    onBlur?: () => void;
    onClose?: () => void;
    onSuccess?: () => void;
    onAfterLeave?: () => void;
    slideover?: boolean;
    closeButton?: boolean;
    closeExplicitly?: boolean;
    maxWidth?: string;
    paddingClasses?: string;
    panelClasses?: string;
    position?: string;
}
type ModalProps = ModalBaseProps & Record<string, unknown>;
declare const Modal: import('react').ForwardRefExoticComponent<Omit<ModalProps, "ref"> & import('react').RefAttributes<HeadlessModalRef>>;
export default Modal;
