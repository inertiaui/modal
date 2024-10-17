import { ModalLink } from '@inertiaui/modal-react';
import Container from './Container';

export default function PropsFromConfig() {
    return (
        <Container>
            <div className="flex justify-between">
                <h2 className="text-lg font-medium text-gray-900">Prop from Config</h2>
            </div>
            <ModalLink
                href="/users/1/edit"
                className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md"
            >
                Open
            </ModalLink>
        </Container>
    );
}