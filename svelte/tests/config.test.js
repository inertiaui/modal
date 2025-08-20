import { describe, it, expect, beforeEach } from 'vitest'
import { resetConfig, putConfig, getConfig } from '../src/lib/config'

describe('Config Module', () => {
    // Reset the config before each test
    beforeEach(() => {
        resetConfig()
    })

    describe('getConfig', () => {
        it('should return the correct value for a top-level key', () => {
            expect(getConfig('type')).toBe('modal')
        })

        it('should return the correct value for a nested key', () => {
            expect(getConfig('modal.closeButton')).toBe(true)
            expect(getConfig('slideover.maxWidth')).toBe('md')
        })

        it('should return null for non-existent keys', () => {
            expect(getConfig('nonexistent')).toBeNull()
            expect(getConfig('modal.nonexistent')).toBeNull()
            expect(getConfig('modal.closeButton.nonexistent')).toBeNull()
        })

        it('should handle deeply nested keys', () => {
            putConfig('a.b.c.d.e', 'deep value')
            expect(getConfig('a.b.c.d.e')).toBe('deep value')
        })
    })

    describe('putConfig', () => {
        it('should set a value for a top-level key', () => {
            putConfig('newKey', 'newValue')
            expect(getConfig('newKey')).toBe('newValue')
        })

        it('should set a value for a nested key', () => {
            putConfig('modal.newKey', 'newValue')
            expect(getConfig('modal.newKey')).toBe('newValue')
        })

        it("should create intermediate objects if they don't exist", () => {
            putConfig('a.b.c', 'nestedValue')
            expect(getConfig('a.b.c')).toBe('nestedValue')
        })

        it('should override existing values', () => {
            putConfig('modal.closeButton', false)
            expect(getConfig('modal.closeButton')).toBe(false)
        })

        it('should handle deeply nested keys', () => {
            putConfig('x.y.z.1.2.3', 'deep nested value')
            expect(getConfig('x.y.z.1.2.3')).toBe('deep nested value')
        })

        it('should handle passing a whole config object', () => {
            const newConfig = {
                type: 'slideover',
                modal: {
                    closeButton: false,
                    maxWidth: 'lg',
                },
                slideover: {
                    position: 'left',
                },
            }
            putConfig(newConfig)

            expect(getConfig('type')).toBe('slideover')
            expect(getConfig('modal.closeButton')).toBe(false)
            expect(getConfig('modal.maxWidth')).toBe('lg')
            expect(getConfig('slideover.position')).toBe('left')

            // Check that untouched properties remain unchanged
            expect(getConfig('modal.closeExplicitly')).toBe(false)
            expect(getConfig('slideover.maxWidth')).toBe('md')
        })
    })

    describe('Integration of putConfig and getConfig', () => {
        it('should be able to set and then get a value', () => {
            putConfig('test.key', 'test value')
            expect(getConfig('test.key')).toBe('test value')
        })

        it('should handle overwriting of object properties', () => {
            putConfig('modal.newObject', { a: 1, b: 2 })
            expect(getConfig('modal.newObject')).toEqual({ a: 1, b: 2 })
            putConfig('modal.newObject.a', 3)
            expect(getConfig('modal.newObject')).toEqual({ a: 3, b: 2 })
        })
    })

    describe('resetConfig', () => {
        it('should reset the config to its default state', () => {
            putConfig('type', 'changed')
            putConfig('newKey', 'newValue')
            putConfig('modal.closeButton', false)

            resetConfig()

            expect(getConfig('type')).toBe('modal')
            expect(getConfig('newKey')).toBeNull()
            expect(getConfig('modal.closeButton')).toBe(true)
        })

        it('should not affect subsequent tests after reset', () => {
            expect(getConfig('type')).toBe('modal')
            expect(getConfig('modal.closeButton')).toBe(true)
        })
    })
})
