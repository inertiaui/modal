import { ModalLink } from '@inertiaui/modal-react'

// Base page. The ModalLink opens the modal through the Inertia router (no full
// page reload), which is exactly when a duplicate Inertia copy blows up.
export default function ModalSmoke() {
    return (
        <div style={{ padding: 24 }}>
            <h1>Modal smoke</h1>
            <ModalLink href="/modal-smoke/greet" data-testid="open-modal">
                Open modal
            </ModalLink>
        </div>
    )
}
