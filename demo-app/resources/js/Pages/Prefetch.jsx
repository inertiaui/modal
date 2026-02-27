import { useState, useCallback } from 'react';
import { ModalLink } from '@inertiaui/modal-react';
import Container from './Container';

export default function Prefetch() {
    const [log, setLog] = useState([]);

    const push = useCallback((value) => {
        setLog((prev) => [...prev, value]);
    }, []);

    return (
        <Container>
            <div className="flex flex-col items-start gap-4">
                <h2 className="text-lg font-medium text-gray-900">Prefetch Test</h2>

                <p data-testid="log">{log.join(',')}</p>

                <ModalLink
                    href="/users/1/edit"
                    prefetch="hover"
                    data-testid="prefetch-hover"
                    className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md"
                    onPrefetching={() => push('prefetching')}
                    onPrefetched={() => push('prefetched')}
                    onSuccess={() => push('success')}
                >
                    Prefetch on Hover
                </ModalLink>

                <ModalLink
                    href="/users/1/edit"
                    prefetch="click"
                    data-testid="prefetch-click"
                    className="px-2 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-md"
                    onPrefetching={() => push('click-prefetching')}
                    onPrefetched={() => push('click-prefetched')}
                    onSuccess={() => push('click-success')}
                >
                    Prefetch on Click
                </ModalLink>

                <ModalLink
                    href="/users/1/edit"
                    prefetch="mount"
                    data-testid="prefetch-mount"
                    className="px-2 py-1 text-xs font-medium text-purple-600 bg-purple-100 rounded-md"
                    onPrefetching={() => push('mount-prefetching')}
                    onPrefetched={() => push('mount-prefetched')}
                    onSuccess={() => push('mount-success')}
                >
                    Prefetch on Mount
                </ModalLink>

                <ModalLink
                    href="/users/1/edit"
                    prefetch={['hover', 'click']}
                    data-testid="prefetch-multiple"
                    className="px-2 py-1 text-xs font-medium text-orange-600 bg-orange-100 rounded-md"
                    onPrefetching={() => push('multi-prefetching')}
                    onPrefetched={() => push('multi-prefetched')}
                    onSuccess={() => push('multi-success')}
                >
                    Prefetch on Hover and Click
                </ModalLink>

                <ModalLink
                    href="/users/1/edit"
                    prefetch={true}
                    data-testid="prefetch-true"
                    className="px-2 py-1 text-xs font-medium text-teal-600 bg-teal-100 rounded-md"
                    onPrefetching={() => push('true-prefetching')}
                    onPrefetched={() => push('true-prefetched')}
                    onSuccess={() => push('true-success')}
                >
                    Prefetch=true (default hover)
                </ModalLink>
            </div>
        </Container>
    );
}
