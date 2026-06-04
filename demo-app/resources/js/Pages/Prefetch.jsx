import { ModalLink } from '@inertiaui/modal-react'
import { useState, useCallback } from 'react'

import Container from './Container'

export default function Prefetch() {
    const [log, setLog] = useState([])

    const push = useCallback((value) => {
        setLog((prev) => [...prev, value])
    }, [])

    return (
        <Container>
            <div className="flex flex-col items-start gap-4">
                <h2 className="text-lg font-medium text-gray-900">Prefetch Test</h2>

                <p data-testid="log">{log.join(',')}</p>

                <ModalLink
                    href="/users/1/edit"
                    prefetch="hover"
                    data-testid="prefetch-hover"
                    className="rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-600"
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
                    className="rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-600"
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
                    className="rounded-md bg-purple-100 px-2 py-1 text-xs font-medium text-purple-600"
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
                    className="rounded-md bg-orange-100 px-2 py-1 text-xs font-medium text-orange-600"
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
                    className="rounded-md bg-teal-100 px-2 py-1 text-xs font-medium text-teal-600"
                    onPrefetching={() => push('true-prefetching')}
                    onPrefetched={() => push('true-prefetched')}
                    onSuccess={() => push('true-success')}
                >
                    Prefetch=true (default hover)
                </ModalLink>
            </div>
        </Container>
    )
}
