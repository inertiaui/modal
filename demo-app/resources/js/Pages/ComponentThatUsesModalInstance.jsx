import { useModal } from '@inertiaui/modal-react'

export default function ComponentThatUsesModalInstance() {
    const modal = useModal()

    return (
        modal ? <div>
            <button onClick={() => modal.close()}>Close Modal with index {modal.index}</button>
        </div> : <div />
    )
}