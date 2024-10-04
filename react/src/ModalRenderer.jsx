import React, { useEffect } from 'react'
import { useModalStack } from './ModalRoot'

const ModalIndexContext = React.createContext(null)
ModalIndexContext.displayName = 'ModalIndexContext'

export const useModalIndex = () => {
    const context = React.useContext(ModalIndexContext)
    if (context === undefined) {
        throw new Error('useModalIndex must be used within a ModalIndexProvider')
    }
    return context
}

const ModalRenderer = ({ index }) => {
    const { stack } = useModalStack()

    const modalContext = stack[index]

    useEffect(() => {
        return () => {
            if (modalContext) {
                modalContext.afterLeave()
            }
        }
    }, [modalContext])

    if (!modalContext || !modalContext.component) {
        return null
    }

    const handleModalEvent = (event, ...args) => {
        modalContext.emit(event, ...args)
    }

    return (
        <ModalIndexContext.Provider value={index}>
            <modalContext.component
                {...modalContext.componentProps}
                onModalEvent={handleModalEvent}
            />
        </ModalIndexContext.Provider>
    )
}

export default ModalRenderer
