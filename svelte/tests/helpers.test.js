import { describe, it, expect } from 'vitest'
import { except, only, rejectNullValues, kebabCase } from '../src/lib/helpers'

describe('helpers', () => {
    describe('except', () => {
        it('should return an object without the specified keys', () => {
            const obj = { a: 1, b: 2, c: 3 }
            expect(except(obj, ['b'])).toEqual({ a: 1, c: 3 })
        })

        it('should return an empty object if all keys are excluded', () => {
            const obj = { a: 1, b: 2 }
            expect(except(obj, ['a', 'b'])).toEqual({})
        })

        it('should return the same object if no keys are excluded', () => {
            const obj = { a: 1, b: 2 }
            expect(except(obj, [])).toEqual(obj)
        })

        it('should return an array without the specified elements', () => {
            const arr = ['a', 'b', 'c', 'd']
            expect(except(arr, ['b', 'd'])).toEqual(['a', 'c'])
        })

        it('should return an empty array if all elements are excluded', () => {
            const arr = ['a', 'b']
            expect(except(arr, ['a', 'b'])).toEqual([])
        })

        it('should return the same array if no elements are excluded', () => {
            const arr = ['a', 'b']
            expect(except(arr, [])).toEqual(arr)
        })
    })

    describe('only', () => {
        it('should return an object with only the specified keys', () => {
            const obj = { a: 1, b: 2, c: 3 }
            expect(only(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 })
        })

        it('should return an empty object if no keys are specified', () => {
            const obj = { a: 1, b: 2 }
            expect(only(obj, [])).toEqual({})
        })

        it('should ignore keys that do not exist in the object', () => {
            const obj = { a: 1, b: 2 }
            expect(only(obj, ['a', 'c'])).toEqual({ a: 1 })
        })

        it('should return an array with only the specified elements', () => {
            const arr = ['a', 'b', 'c', 'd']
            expect(only(arr, ['b', 'd'])).toEqual(['b', 'd'])
        })

        it('should return an empty array if no elements are specified', () => {
            const arr = ['a', 'b']
            expect(only(arr, [])).toEqual([])
        })

        it('should ignore elements that do not exist in the array', () => {
            const arr = ['a', 'b']
            expect(only(arr, ['a', 'c'])).toEqual(['a'])
        })
    })

    describe('rejectNullValues', () => {
        it('should remove keys with null values from an object', () => {
            const obj = { a: 1, b: null, c: 3 }
            expect(rejectNullValues(obj)).toEqual({ a: 1, c: 3 })
        })

        it('should return the same object if no null values exist', () => {
            const obj = { a: 1, b: 2 }
            expect(rejectNullValues(obj)).toEqual(obj)
        })

        it('should return an empty object if all values are null', () => {
            const obj = { a: null, b: null }
            expect(rejectNullValues(obj)).toEqual({})
        })

        it('should remove null values from an array', () => {
            const arr = [1, null, 3, null, 5]
            expect(rejectNullValues(arr)).toEqual([1, 3, 5])
        })

        it('should return the same array if no null values exist', () => {
            const arr = [1, 2, 3]
            expect(rejectNullValues(arr)).toEqual([1, 2, 3])
        })

        it('should return an empty array if all values are null', () => {
            const arr = [null, null, null]
            expect(rejectNullValues(arr)).toEqual([])
        })
    })

    describe('kebabCase', () => {
        it.each([
            // Basic camelCase/PascalCase
            ['camelCase', 'camel-case'],
            ['ThisIsPascalCase', 'this-is-pascal-case'],

            // With numbers
            ['user123Name', 'user123-name'],
            ['FirstName1', 'first-name1'],

            // With acronyms
            ['parseXMLDocument', 'parse-x-m-l-document'],

            // Mixed cases and special chars
            ['snake_case_value', 'snake-case-value'],
            ['already-kebab-case', 'already-kebab-case'],
            ['UPPERCASE', 'u-p-p-e-r-c-a-s-e'],
            ['multiple__underscores', 'multiple-underscores'],
        ])('should convert %s to %s', (input, expected) => {
            expect(kebabCase(input)).toBe(expected)
        })
    })
})
