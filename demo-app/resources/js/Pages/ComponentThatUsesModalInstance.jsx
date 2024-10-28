import { useModal } from '@inertiaui/modal-react'

export default function ComponentThatUsesModalInstance() {
    const modal = useModal()

    if (modal) {
        const { props } = useModal()
        console.log(props.roles)
    }

    return (
        modal ? <div>
            <button onClick={() => modal.close()}>Close Modal with index {modal.index}</button>
        </div> : <div />
    )
}