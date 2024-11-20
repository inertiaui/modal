import { Modal, ModalLink } from '@inertiaui/modal-react';
import Container from './Container';
import { useRef } from 'react';

export default function Local() {
    const modalRef = useRef(null);

    function closeModal() {
        modalRef.current.close();
    }

    return (
        <>
            <Container>
                <div className="flex justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Local</h2>
                    <ModalLink
                        href="#local"
                        className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md"
                    >
                        Open Local Modal
                    </ModalLink>
                </div>
            </Container>
            <Modal name="local" ref={modalRef}>
                This is a local modal
                <ModalLink href="/roles/create">
                    Create Role
                </ModalLink>
                <button onClick={closeModal}>
                    Close Modal through Ref
                </button>
            </Modal>
        </>
    );
}