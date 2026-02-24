import { ReactNode, ComponentType } from 'react';
import { ModalStackContextValue, PageProps, ModalRootProps, PrefetchOptions } from './types';
export declare function prefetch(href: string, options?: PrefetchOptions): Promise<void>;
interface ModalStackProviderProps {
    children: ReactNode;
}
export declare const ModalStackProvider: ({ children }: ModalStackProviderProps) => import("react/jsx-runtime").JSX.Element;
export declare const useModalStack: () => ModalStackContextValue;
export declare const modalPropNames: string[];
export declare const initFromPageProps: (pageProps: PageProps) => void;
interface RenderInertiaAppProps {
    Component: ComponentType & {
        layout?: ((page: ReactNode) => ReactNode) | ComponentType[];
    };
    props: Record<string, unknown>;
    key: string;
}
export declare const renderApp: (App: ComponentType<{
    children: (props: RenderInertiaAppProps) => ReactNode;
}>, pageProps: PageProps) => import("react/jsx-runtime").JSX.Element;
export declare const ModalRoot: ({ children }: ModalRootProps) => import("react/jsx-runtime").JSX.Element;
export {};
