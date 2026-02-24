// Re-export helper utilities from vanilla
export { generateId, sameUrlPath, except, only, rejectNullValues, kebabCase, isStandardDomEvent } from '@inertiaui/vanilla'

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
