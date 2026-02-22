import { ReactNode, ElementType } from 'react';
import { PrefetchOption } from './types';
import { RequestPayload } from '@inertiajs/core';
interface ModalLinkProps {
    href: string;
    method?: string;
    data?: RequestPayload;
    as?: ElementType;
    headers?: Record<string, string>;
    queryStringArrayFormat?: 'brackets' | 'indices';
    onAfterLeave?: () => void;
    onBlur?: () => void;
    onClose?: () => void;
    onError?: (error: unknown) => void;
    onFocus?: () => void;
    onStart?: () => void;
    onSuccess?: () => void;
    onPrefetching?: () => void;
    onPrefetched?: () => void;
    navigate?: boolean;
    prefetch?: PrefetchOption;
    cacheFor?: number;
    children: ReactNode | ((props: {
        loading: boolean;
    }) => ReactNode);
    [key: string]: unknown;
}
declare const ModalLink: ({ href, method, data, as: Component, headers, queryStringArrayFormat, onAfterLeave, onBlur, onClose, onError, onFocus, onStart, onSuccess, onPrefetching, onPrefetched, navigate, prefetch, cacheFor, children, ...props }: ModalLinkProps) => import("react/jsx-runtime").JSX.Element;
export default ModalLink;
