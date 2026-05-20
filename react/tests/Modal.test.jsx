import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import { resetConfig, putConfig } from '../src/config'

vi.mock('../src/HeadlessModal', () => ({
    default: ({ children }) =>
        children({
            afterLeave: () => {},
            close: () => {},
            config: { slideover: false },
            emit: () => {},
            getChildModal: () => null,
            getParentModal: () => null,
            id: 'test',
            index: 0,
            isOpen: false,
            modalContext: {},
            onTopOfStack: true,
            reload: () => {},
            setOpen: () => {},
            shouldRender: false,
        }),
}))

vi.mock('../src/ModalContent', () => ({
    default: ({ useNativeDialog }) => (
        <div data-testid="content" data-use-native-dialog={String(useNativeDialog)} />
    ),
}))

vi.mock('../src/SlideoverContent', () => ({
    default: ({ useNativeDialog }) => (
        <div data-testid="slideover" data-use-native-dialog={String(useNativeDialog)} />
    ),
}))

import Modal from '../src/Modal'

describe('Modal useNativeDialog prop', () => {
    beforeEach(() => {
        resetConfig()
        cleanup()
    })

    it('falls back to global config when prop omitted (default true)', () => {
        const { getByTestId } = render(<Modal>child</Modal>)
        expect(getByTestId('content').getAttribute('data-use-native-dialog')).toBe('true')
    })

    it('respects per-modal opt-out via prop', () => {
        const { getByTestId } = render(<Modal useNativeDialog={false}>child</Modal>)
        expect(getByTestId('content').getAttribute('data-use-native-dialog')).toBe('false')
    })

    it('respects per-modal opt-in via prop when global is false', () => {
        putConfig('useNativeDialog', false)
        const { getByTestId } = render(<Modal useNativeDialog={true}>child</Modal>)
        expect(getByTestId('content').getAttribute('data-use-native-dialog')).toBe('true')
    })

    it('inherits false from global when prop omitted', () => {
        putConfig('useNativeDialog', false)
        const { getByTestId } = render(<Modal>child</Modal>)
        expect(getByTestId('content').getAttribute('data-use-native-dialog')).toBe('false')
    })
})
