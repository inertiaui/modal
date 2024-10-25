import { Modal, useModalStack } from '@inertiaui/modal-react';
import Container from './Container';

export default function Visit() {
    const { visitModal } = useModalStack();

    const openLocalModal = () => {
        visitModal('#local');
    };

    return (
        <>
            <Container>
                <div className="flex justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Visit programmatically</h2>
                    <button onClick={openLocalModal} type="button">
                        Open Local Modal
                    </button>
                    <button onClick={() => visitModal('/data', { method: 'post', data: { message: 'Hi again!' } })} type="button">
                        Open Route Modal
                    </button>
                    <button onClick={() => visitModal('/users/1/edit', { navigate: true })} type="button">
                        Open Route Modal With Navigate
                    </button>
                </div>
            </Container>
            <Modal name="local">
                Hi there!
            </Modal>
        </>
    );
}