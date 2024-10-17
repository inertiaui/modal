import { ModalLink } from '@inertiaui/modal-react';
import Container from './Container';

export default function PropsFromModal() {
    return (
        <Container>
            <div className="flex justify-between">
                <h2 className="text-lg font-medium text-gray-900">Prop from Modal</h2>
            </div>
            <ModalLink
                href="/slideover"
                className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md"
            >
                Open Slideover
            </ModalLink>
        </Container>
    );
}