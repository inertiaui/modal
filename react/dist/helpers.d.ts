export { sameUrlPath, except, only, rejectNullValues, kebabCase, isStandardDomEvent } from '@inertiaui/vanilla';
export declare function generateIdUsing(callback: (() => string) | null): void;
export declare function generateId(prefix?: string): string;
export { lockScroll, unlockScroll, getScrollLockCount, getFocusableElements, createFocusTrap, focusFirstElement, onClickOutside, onEscapeKey, markAriaHidden, unmarkAriaHidden, createDialog, } from '@inertiaui/vanilla';
export type { CleanupFunction, FocusTrapOptions, ClickOutsideOptions, EscapeKeyOptions, DialogOptions, Dialog, } from '@inertiaui/vanilla';
