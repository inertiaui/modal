import { generateId, sameUrlPath, except, only, rejectNullValues, kebabCase, isStandardDomEvent } from './../../vue/src/helpers'
export { generateId, sameUrlPath, except, only, rejectNullValues, kebabCase, isStandardDomEvent }

// Re-export dialog utilities from vanilla (via vue)
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
} from './../../vue/src/dialog'

// Re-export types from vanilla
export type {
    CleanupFunction,
    FocusTrapOptions,
    ClickOutsideOptions,
    EscapeKeyOptions,
    DialogOptions,
    Dialog,
} from '@inertiaui/vanilla'
