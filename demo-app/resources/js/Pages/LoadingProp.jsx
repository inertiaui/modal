import { ModalLink, putConfig } from '@inertiaui/modal-react';
import Container from './Container';

export default function LoadingProp() {
    const params = new URLSearchParams(window.location.search);

    putConfig({
        progress: params.get('progress') === 'false'
            ? false
            : { delay: parseInt(params.get('delay') ?? 0) }
    })

    return (
        <Container>
            <div className="flex justify-between">
                <h2 className="text-lg font-medium text-gray-900">Loading Prop</h2>
            </div>
            <ModalLink
                dusk="modal-link"
                href="/slideover?slow=1"
                className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md"
            >
                {({ loading }) => (
                    loading ? 'Loading...' : 'Open Slideover'
                )}
            </ModalLink>
        </Container>
    );
}
