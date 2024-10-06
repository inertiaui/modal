import React from 'react'
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

    if (!modalContext || !modalContext.component) {
        return null
    }

    return (
        <ModalIndexContext.Provider value={index}>
            <modalContext.component
                {...modalContext.componentProps}
                onModalEvent={(...args) => modalContext.emit(...args)}
            />
        </ModalIndexContext.Provider>
    )
}

export default ModalRenderer
