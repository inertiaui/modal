import { Modal } from 'inertiaui/modal'

export default function Data({ message }) {
    return (
        <Modal>
            <p dusk="message">{message}</p>
        </Modal>
    );
}