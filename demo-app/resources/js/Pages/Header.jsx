import { ModalLink } from '@inertiaui/modal-react';
import Container from './Container';

export default function Header() {
    return (
        <Container>
            <div className="flex justify-between">
                <h2 className="text-lg font-medium text-gray-900">Header</h2>
            </div>
            <ModalLink
                dusk="modal-link"
                href="/roles/create"
                headers={{ 'X-Test-Header': 'Test Header Value' }}
            >
                Open Modal
            </ModalLink>
        </Container>
    );
}