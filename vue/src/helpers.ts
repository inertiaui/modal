// Re-export from vanilla package
import { generateId as vanillaGenerateId } from '@inertiaui/vanilla'
export { except, only, rejectNullValues, kebabCase, isStandardDomEvent, sameUrlPath } from '@inertiaui/vanilla'

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
