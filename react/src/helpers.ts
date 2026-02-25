// Re-export helper utilities from vanilla
export { sameUrlPath, except, only, rejectNullValues, kebabCase, isStandardDomEvent } from '@inertiaui/vanilla'
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

// Re-export dialog utilities from vanilla
export {
    lockScroll,
    unlockScroll,
    getScrollLockCount,
    getFocusableElements,
    createFocusTrap,
    focusFirstElement,
    onClickOutside,
    onEscapeKey,
    markAriaHidden,
    unmarkAriaHidden,
    createDialog,
} from '@inertiaui/vanilla'

// Re-export types from vanilla
export type {
    CleanupFunction,
    FocusTrapOptions,
    ClickOutsideOptions,
    EscapeKeyOptions,
    DialogOptions,
    Dialog,
} from '@inertiaui/vanilla'
