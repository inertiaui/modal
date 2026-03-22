import React, { useMemo, createElement } from 'react'
import { useModalStack } from './ModalRoot'
import type { ModalRendererProps } from './types'

const ModalIndexContext = React.createContext<number | null>(null)
ModalIndexContext.displayName = 'ModalIndexContext'

export const useModalIndex = (): number | null => {
    return React.useContext(ModalIndexContext)
}

const ModalRenderer = ({ index }: ModalRendererProps) => {
    const { stack } = useModalStack()

    const modalContext = useMemo(() => {
        return stack[index]
    }, [stack, index])

    if (!modalContext?.component) {
        return null
    }

    return (
        <ModalIndexContext.Provider value={index}>
            {createElement(modalContext.component as React.ComponentType<Record<string, unknown>>, {
                ...modalContext.props,
                onModalEvent: (...args: unknown[]) => modalContext.emit('modal-event', ...args),
            })}
        </ModalIndexContext.Provider>
    )
}

export default ModalRenderer
