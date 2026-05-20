// Re-export helper utilities from vanilla
export { sameUrlPath, except, only, rejectNullValues, kebabCase, isStandardDomEvent } from '@inertiaui/vanilla'
export function parseResponseData(data: unknown): unknown {
    return typeof data === 'string' ? JSON.parse(data) : data
}

type ClickEventLike = {
    button?: number
    ctrlKey?: boolean
    metaKey?: boolean
    shiftKey?: boolean
    altKey?: boolean
    defaultPrevented?: boolean
}

export function shouldInterceptClick(event: ClickEventLike | undefined, isAnchor: boolean): boolean {
    if (!isAnchor) return true
    if (!event) return true
    if (event.defaultPrevented) return false
    if (event.button !== undefined && event.button !== 0) return false
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return false
    return true
}
import { generateId as vanillaGenerateId } from '@inertiaui/vanilla'

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
