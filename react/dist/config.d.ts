export interface ModalTypeConfig {
    closeButton: boolean;
    closeExplicitly: boolean;
    closeOnClickOutside: boolean;
    maxWidth: string;
    paddingClasses: string;
    panelClasses: string;
    position: string;
}
export interface ModalConfig {
    type: 'modal' | 'slideover';
    navigate: boolean;
    useNativeDialog: boolean;
    appElement: string | null;
    modal: ModalTypeConfig;
    slideover: ModalTypeConfig;
}
export declare const resetConfig: () => void;
export declare const putConfig: (key: string | Partial<ModalConfig>, value?: unknown) => void;
export declare const getConfig: (key?: string) => unknown;
export declare const getConfigByType: (isSlideover: boolean, key: string) => unknown;
