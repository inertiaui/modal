// Re-export from vanilla package
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

// Re-export types
export type { CleanupFunction, FocusTrapOptions, ClickOutsideOptions, EscapeKeyOptions, DialogOptions, Dialog } from '@inertiaui/vanilla'
