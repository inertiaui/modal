import { useModal } from '@inertiaui/modal-react'

// Modal content. useModal() reads the modal/Inertia context, so it throws
// ("usePage must be used within the Inertia component") the moment a second,
// uninitialized Inertia copy is bundled.
export default function Greet({ message }: { message: string }) {
    const modal = useModal()

    return (
        <div data-testid="modal-greet" style={{ padding: 24 }}>
            <p data-testid="modal-message">{message}</p>
            <button type="button" data-testid="close-modal" onClick={() => modal.close()}>
                Close
            </button>
        </div>
    )
}
