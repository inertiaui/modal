import { Modal, useModalStack } from '@inertiaui/modal-react';
import Container from './Container';

export default function LocalWithProps() {
    const { visitModal } = useModalStack();

    function openWithProps() {
        visitModal('#local-props', {
            props: {
                message: 'Hello from props!',
                count: 42,
            },
        });
    }

    return (
        <>
            <Container>
                <div className="flex flex-col items-start gap-4">
                    <h2 className="text-lg font-medium text-gray-900">Local Modal with Props</h2>

                    <button onClick={openWithProps} dusk="open-with-props">
                        Open Local Modal with Props
                    </button>
                </div>
            </Container>

            <Modal name="local-props">
                {({ message, count }) => (
                    <div className="p-4">
                        <p dusk="modal-message">{message}</p>
                        <p dusk="modal-count">{count}</p>
                    </div>
                )}
            </Modal>
        </>
    );
}
