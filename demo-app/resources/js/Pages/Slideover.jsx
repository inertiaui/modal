import { Modal } from '@inertiaui/modal-react';

export default function Slideover() {
    return (
        <Modal
            closeButton={false}
            closeExplicitly={true}
            maxWidth="2xl"
            paddingClasses="p-8"
            panelClasses="bg-red-100 min-h-screen"
            position="left"
            slideover={true}
        >
            <div className="flex justify-between">
                <h2 className="text-lg font-medium text-gray-900">Slideover with Props</h2>
            </div>
        </Modal>
    );
}