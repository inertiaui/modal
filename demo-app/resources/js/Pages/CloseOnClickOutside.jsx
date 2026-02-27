import { useEffect } from 'react';
import { ModalLink, putConfig } from '@inertiaui/modal-react';
import Container from './Container';

export default function CloseOnClickOutside() {
    // Disable native dialog for this test page so we can properly test click-outside
    useEffect(() => {
        putConfig({ useNativeDialog: false })
    }, []);
    return (
        <Container>
            <div className="flex flex-col items-start gap-4">
                <h2 className="text-lg font-medium text-gray-900">Close on Click Outside Test</h2>

                <ModalLink
                    href="/users/1/edit"
                    data-testid="open-with-click-outside"
                    className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md"
                >
                    Open Modal (default - closes on click outside)
                </ModalLink>

                <ModalLink
                    href="/users/1/edit"
                    closeOnClickOutside={false}
                    data-testid="open-without-click-outside"
                    className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md"
                >
                    Open Modal (closeOnClickOutside=false)
                </ModalLink>

                <ModalLink
                    href="/users/1/edit"
                    slideover
                    data-testid="open-slideover-with-click-outside"
                    className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md"
                >
                    Open Slideover (default - closes on click outside)
                </ModalLink>

                <ModalLink
                    href="/users/1/edit"
                    slideover
                    closeOnClickOutside={false}
                    data-testid="open-slideover-without-click-outside"
                    className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md"
                >
                    Open Slideover (closeOnClickOutside=false)
                </ModalLink>
            </div>
        </Container>
    );
}
