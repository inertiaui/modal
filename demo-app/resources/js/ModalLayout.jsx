import { ModalRoot } from '@inertiaui/modal-react'

export default function ModalLayout({ children }) {
    return (
        <>
            {children}
            <ModalRoot />
        </>
    )
}