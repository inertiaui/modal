import { Modal } from '@inertiaui/modal-react'

export default function Data({ message }) {
    return (
        <Modal>
            <p dusk="message">{message}</p>
        </Modal>
    );
}