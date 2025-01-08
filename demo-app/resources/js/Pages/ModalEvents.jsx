import { Modal, ModalLink } from '@inertiaui/modal-react'

function log(value) {
    console.log(value)
}

export default function ModalEvents({ }) {
    return (
        <Modal
            onSuccess={() => log('success')}
            onBlur={() => log('blur')}
            onFocus={() => log('focus')}
            onClose={() => log('close')}
            onAfterLeave={() => log('after-leave')}
        >
            <ModalLink href="/roles/create">
                Create role
            </ModalLink>
        </Modal>
    )
}
