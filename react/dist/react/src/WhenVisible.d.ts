import { ReactNode, ElementType } from 'react';
import { ReloadOptions } from './types';
interface WhenVisibleProps {
    children: ReactNode;
    data?: string | string[];
    params?: ReloadOptions;
    buffer?: number;
    as?: ElementType;
    always?: boolean;
    fallback?: ReactNode;
}
declare const WhenVisible: {
    ({ children, data, params, buffer, as, always, fallback }: WhenVisibleProps): string | number | bigint | boolean | Iterable<ReactNode> | Promise<string | number | bigint | boolean | import('react').ReactPortal | import('react').ReactElement<unknown, string | import('react').JSXElementConstructor<any>> | Iterable<ReactNode>> | import('react').ReactElement<any, string | import('react').JSXElementConstructor<any>>;
    displayName: string;
};
export default WhenVisible;
