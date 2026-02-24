// Re-export from vanilla package
import { generateId as vanillaGenerateId, except, only, rejectNullValues, kebabCase, isStandardDomEvent } from '@inertiaui/vanilla'
export { except, only, rejectNullValues, kebabCase, isStandardDomEvent }

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

function sameUrlPath(url1: string | URL | undefined | null, url2: string | URL | undefined | null): boolean {
    if (!url1 || !url2) {
        return false
    }
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost'
    const parsed1 = typeof url1 === 'string' ? new URL(url1, origin) : url1
    const parsed2 = typeof url2 === 'string' ? new URL(url2, origin) : url2

    return `${parsed1.origin}${parsed1.pathname}` === `${parsed2.origin}${parsed2.pathname}`
}

export { generateIdUsing, generateId, sameUrlPath }
