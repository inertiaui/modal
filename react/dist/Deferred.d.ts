import { ReactNode } from 'react';
interface DeferredProps {
    children: ReactNode;
    data: string | string[];
    fallback?: ReactNode;
}
declare const Deferred: {
    ({ children, data, fallback }: DeferredProps): ReactNode;
    displayName: string;
};
export default Deferred;
