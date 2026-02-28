import { describe, it, expect, beforeEach } from 'vitest'
import { except, only, rejectNullValues, kebabCase, isStandardDomEvent, generateId, generateIdUsing, sameUrlPath } from '../src/helpers'

describe('helpers', () => {
    describe('re-exports from vanilla', () => {
        it('should re-export except from vanilla', () => {
            expect(typeof except).toBe('function')
            expect(except({ a: 1, b: 2 }, ['b'])).toEqual({ a: 1 })
        })

        it('should re-export only from vanilla', () => {
            expect(typeof only).toBe('function')
            expect(only({ a: 1, b: 2 }, ['a'])).toEqual({ a: 1 })
        })

        it('should re-export rejectNullValues from vanilla', () => {
            expect(typeof rejectNullValues).toBe('function')
            expect(rejectNullValues({ a: 1, b: null })).toEqual({ a: 1 })
        })

        it('should re-export kebabCase from vanilla', () => {
            expect(typeof kebabCase).toBe('function')
            expect(kebabCase('camelCase')).toBe('camel-case')
        })

        it('should re-export isStandardDomEvent from vanilla', () => {
            expect(typeof isStandardDomEvent).toBe('function')
            expect(isStandardDomEvent('onClick')).toBe(true)
        })
    })

    describe('generateId (modal-specific)', () => {
        beforeEach(() => {
            generateIdUsing(null)
        })

        it('should generate a unique id with modal prefix', () => {
            const id = generateId()
            expect(id).toMatch(/^inertiaui_modal_/)
        })

        it('should generate a unique id with custom prefix', () => {
            const id = generateId('custom_')
            expect(id).toMatch(/^custom_/)
        })

        it('should generate different ids each time', () => {
            const id1 = generateId()
            const id2 = generateId()
            expect(id1).not.toBe(id2)
        })
    })

    describe('generateIdUsing (modal-specific)', () => {
        beforeEach(() => {
            generateIdUsing(null)
        })

        it('should use custom callback when set', () => {
            generateIdUsing(() => 'custom-id')
            expect(generateId()).toBe('custom-id')
        })

        it('should fall back to default when callback is null', () => {
            generateIdUsing(() => 'custom-id')
            generateIdUsing(null)
            expect(generateId()).toMatch(/^inertiaui_modal_/)
        })
    })

    describe('sameUrlPath (modal-specific)', () => {
        it('should return true for same paths', () => {
            expect(sameUrlPath('/users', '/users')).toBe(true)
            expect(sameUrlPath('/users/1', '/users/1')).toBe(true)
        })

        it('should return false for different paths', () => {
            expect(sameUrlPath('/users', '/posts')).toBe(false)
            expect(sameUrlPath('/users/1', '/users/2')).toBe(false)
        })

        it('should ignore query strings', () => {
            expect(sameUrlPath('/users?page=1', '/users?page=2')).toBe(true)
        })

        it('should handle full URLs', () => {
            expect(sameUrlPath('http://localhost/users', 'http://localhost/users')).toBe(true)
            expect(sameUrlPath('http://localhost/users', 'http://localhost/posts')).toBe(false)
        })

        it('should handle URL objects', () => {
            const url1 = new URL('http://localhost/users')
            const url2 = new URL('http://localhost/users')
            expect(sameUrlPath(url1, url2)).toBe(true)
        })
    })
})
