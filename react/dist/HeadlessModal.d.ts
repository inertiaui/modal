import { ReactNode } from 'react';
import { Modal, ModalConfig, ReloadOptions } from './types';
interface HeadlessModalConfig {
    slideover: boolean;
    closeButton: boolean;
    closeExplicitly: boolean;
    closeOnClickOutside: boolean;
    maxWidth: string;
    paddingClasses: string;
    panelClasses: string;
    position: string;
}
interface HeadlessModalRenderProps {
    afterLeave: () => void;
    close: () => void;
    config: HeadlessModalConfig;
    emit: (event: string, ...args: unknown[]) => void;
    getChildModal: () => Modal | null;
    getParentModal: () => Modal | null;
    id: string;
    index: number;
    isOpen: boolean;
    modalContext: Modal;
    onTopOfStack: boolean;
    reload: (options?: ReloadOptions) => void;
    setOpen: (open: boolean) => void;
    shouldRender: boolean;
    [key: string]: unknown;
}
interface HeadlessModalBaseProps {
    name?: string;
    children: ReactNode | ((props: HeadlessModalRenderProps) => ReactNode);
    onFocus?: () => void;
    onBlur?: () => void;
    onClose?: () => void;
    onSuccess?: () => void;
    slideover?: boolean;
    closeButton?: boolean;
    closeExplicitly?: boolean;
    closeOnClickOutside?: boolean;
    maxWidth?: string;
    paddingClasses?: string;
    panelClasses?: string;
    position?: string;
}
type HeadlessModalProps = HeadlessModalBaseProps & Record<string, unknown>;
export interface HeadlessModalRef {
    afterLeave: () => void;
    close: () => void;
    emit: (event: string, ...args: unknown[]) => void;
    getChildModal: () => Modal | null | undefined;
    getParentModal: () => Modal | null | undefined;
    reload: (options?: ReloadOptions) => void;
    setOpen: (open: boolean) => void;
    readonly id: string | undefined;
    readonly index: number | undefined;
    readonly isOpen: boolean | undefined;
    readonly config: ModalConfig | undefined;
    readonly modalContext: Modal | null;
    readonly onTopOfStack: boolean | undefined;
    readonly shouldRender: boolean | undefined;
}
declare const HeadlessModal: import('react').ForwardRefExoticComponent<Omit<HeadlessModalProps, "ref"> & import('react').RefAttributes<HeadlessModalRef>>;
export default HeadlessModal;
