import { ModalRoot } from '@inertiaui/modal-react'

export default function Layout({ children }) {
    return (
        <>
            {children}
            <ModalRoot />
        </>
    )
}