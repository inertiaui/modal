import { ModalLink } from 'inertiaui/modal';
import Container from './Container';

export default function Emit() {
    return (
        <Container>
            <div className="flex justify-between">
                <h2 className="text-lg font-medium text-gray-900">Emit</h2>
            </div>
            <ModalLink
                dusk="modal-link"
                href="/users/1/edit"
                className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md"
            >
                Open Modal
            </ModalLink>
        </Container>
    );
}