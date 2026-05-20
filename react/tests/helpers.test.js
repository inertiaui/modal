import { describe, it, expect } from 'vitest'
import { shouldInterceptClick } from '../src/helpers'

describe('shouldInterceptClick', () => {
    const makeEvent = (overrides = {}) => ({
        button: 0,
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
        altKey: false,
        defaultPrevented: false,
        ...overrides,
    })

    it('intercepts plain left-click on anchor', () => {
        expect(shouldInterceptClick(makeEvent(), true)).toBe(true)
    })

    it('does not intercept ctrl+click on anchor', () => {
        expect(shouldInterceptClick(makeEvent({ ctrlKey: true }), true)).toBe(false)
    })

    it('does not intercept meta+click on anchor (Cmd on macOS)', () => {
        expect(shouldInterceptClick(makeEvent({ metaKey: true }), true)).toBe(false)
    })

    it('does not intercept shift+click on anchor', () => {
        expect(shouldInterceptClick(makeEvent({ shiftKey: true }), true)).toBe(false)
    })

    it('does not intercept alt+click on anchor', () => {
        expect(shouldInterceptClick(makeEvent({ altKey: true }), true)).toBe(false)
    })

    it('does not intercept middle-click on anchor', () => {
        expect(shouldInterceptClick(makeEvent({ button: 1 }), true)).toBe(false)
    })

    it('does not intercept right-click on anchor', () => {
        expect(shouldInterceptClick(makeEvent({ button: 2 }), true)).toBe(false)
    })

    it('does not intercept when defaultPrevented', () => {
        expect(shouldInterceptClick(makeEvent({ defaultPrevented: true }), true)).toBe(false)
    })

    it('always intercepts when rendered as non-anchor (e.g. button)', () => {
        expect(shouldInterceptClick(makeEvent({ ctrlKey: true, button: 1 }), false)).toBe(true)
    })

    it('intercepts when event is undefined', () => {
        expect(shouldInterceptClick(undefined, true)).toBe(true)
    })
})
