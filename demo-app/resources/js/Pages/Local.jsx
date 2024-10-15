import { Modal, ModalLink } from '@inertiaui/modal-react';
import Container from './Container';

export default function Local() {
    return (
        <>
            <Container>
                <div className="flex justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Local</h2>
                    <ModalLink
                        href="#local"
                        fragment="pre"
                        className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md"
                    >
                        Open Local Modal
                    </ModalLink>
                </div>
            </Container>
            <Modal name="local">
                This is a local modal
                <ModalLink href="/roles/create">
                    Create Role
                </ModalLink>
            </Modal>
        </>
    );
}