// Re-export helper utilities from vanilla
export { sameUrlPath, except, only, rejectNullValues, kebabCase, isStandardDomEvent } from '@inertiaui/vanilla'
import { generateId as vanillaGenerateId } from '@inertiaui/vanilla'

export function parseResponseData(data: unknown): unknown {
    return typeof data === 'string' ? JSON.parse(data) : data
}

// Wrap generateId with custom callback support for testing
let generateIdUsingCallback: (() => string) | null = null

export function generateIdUsing(callback: (() => string) | null): void {
    generateIdUsingCallback = callback
}

export function generateId(prefix = 'inertiaui_'): string {
    if (generateIdUsingCallback) {
        return generateIdUsingCallback()
    }
    return vanillaGenerateId(prefix)
}
