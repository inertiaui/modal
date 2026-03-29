// Re-export from vanilla package
import { generateId as vanillaGenerateId } from '@inertiaui/vanilla'
export { except, only, rejectNullValues, kebabCase, isStandardDomEvent, sameUrlPath } from '@inertiaui/vanilla'
export function parseResponseData(data: unknown): unknown {
    return typeof data === 'string' ? JSON.parse(data) : data
}

// Modal-specific helpers

let generateIdUsingCallback: (() => string) | null = null

function generateIdUsing(callback: () => string): void {
    generateIdUsingCallback = callback
}

function generateId(prefix: string = 'inertiaui_modal_'): string {
    if (generateIdUsingCallback) {
        return generateIdUsingCallback()
    }
    return vanillaGenerateId(prefix)
}

export { generateIdUsing, generateId }
