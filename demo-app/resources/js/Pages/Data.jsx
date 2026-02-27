import { Modal } from '@inertiaui/modal-react'

export default function Data({ message }) {
    return (
        <Modal>
            <p data-testid="message">{message}</p>
        </Modal>
    );
}