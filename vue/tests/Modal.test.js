import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { resetConfig, putConfig } from '../src/config'

vi.mock('../src/HeadlessModal.vue', () => ({
    default: {
        name: 'HeadlessModal',
        setup(_, { slots, expose }) {
            expose({
                afterLeave: () => {},
                close: () => {},
                emit: () => {},
                getChildModal: () => null,
                getParentModal: () => null,
                reload: () => {},
                setOpen: () => {},
                config: {},
                id: 'test',
                index: 0,
                isOpen: false,
                modalContext: {},
                onTopOfStack: true,
                shouldRender: false,
            })
            return () =>
                slots.default({
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
                })
        },
    },
}))

vi.mock('../src/ModalContent.vue', () => ({
    default: {
        name: 'ModalContent',
        props: ['useNativeDialog', 'modalContext', 'config', 'isFirstModal'],
        setup(props) {
            return () => h('div', { 'data-testid': 'content', 'data-use-native-dialog': String(props.useNativeDialog) })
        },
    },
}))

vi.mock('../src/SlideoverContent.vue', () => ({
    default: {
        name: 'SlideoverContent',
        props: ['useNativeDialog', 'modalContext', 'config', 'isFirstModal'],
        setup(props) {
            return () => h('div', { 'data-testid': 'slideover', 'data-use-native-dialog': String(props.useNativeDialog) })
        },
    },
}))

import Modal from '../src/Modal.vue'

describe('Modal useNativeDialog prop', () => {
    beforeEach(() => {
        resetConfig()
    })

    it('falls back to global config when prop omitted (default true)', () => {
        const wrapper = mount(Modal, { attachTo: document.body })
        expect(document.body.querySelector('[data-testid="content"]')?.getAttribute('data-use-native-dialog')).toBe('true')
        wrapper.unmount()
    })

    it('respects per-modal opt-out via prop', () => {
        const wrapper = mount(Modal, { props: { useNativeDialog: false }, attachTo: document.body })
        expect(document.body.querySelector('[data-testid="content"]')?.getAttribute('data-use-native-dialog')).toBe('false')
        wrapper.unmount()
    })

    it('respects per-modal opt-in via prop when global is false', () => {
        putConfig('useNativeDialog', false)
        const wrapper = mount(Modal, { props: { useNativeDialog: true }, attachTo: document.body })
        expect(document.body.querySelector('[data-testid="content"]')?.getAttribute('data-use-native-dialog')).toBe('true')
        wrapper.unmount()
    })

    it('inherits false from global when prop omitted', () => {
        putConfig('useNativeDialog', false)
        const wrapper = mount(Modal, { attachTo: document.body })
        expect(document.body.querySelector('[data-testid="content"]')?.getAttribute('data-use-native-dialog')).toBe('false')
        wrapper.unmount()
    })
})
