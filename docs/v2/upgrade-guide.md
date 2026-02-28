# Upgrade Guide

This guide covers upgrading from Inertia Modal 0.x to version 2.x.

## Installation

::: code-group

```bash [Composer]
composer require inertiaui/modal:^2.0.0-beta.1
```

```bash [NPM (Vue)]
npm install @inertiaui/modal-vue@^2.0.0-beta.1
```

```bash [NPM (React)]
npm install @inertiaui/modal-react@^2.0.0-beta.1
```

:::

## Requirements Changes

Version 2.x has updated minimum requirements:

| Dependency | 1.x-beta | 2.x |
|------------|----------|-----|
| PHP | 8.1+ | 8.2+ |
| Laravel | 10+ | 11.11+ or 12+ |
| Inertia Laravel | 1.3+ or 2.0+ | 2.0+ |
| React | 18.2+ or 19+ | 19+ |
| Vue | 3.3+ | 3.4+ |
| `@inertiajs/react` | 1.3+ or 2.x | 2.3.15+ |
| `@inertiajs/vue3` | 1.3+ or 2.x | 2.3.15+ |
| Tailwind CSS | 3.x | 4+ |

## Configuration Changes

### Nested Configuration Structure

The configuration structure has changed. Options are now nested under `modal` and `slideover` keys:

```js
// 1.x-beta - flat structure
putConfig({
    closeButton: true,
    maxWidth: '2xl',
})

// 2.x - nested structure
putConfig({
    modal: {
        closeButton: true,
        maxWidth: '2xl',
    },
    slideover: {
        closeButton: true,
        maxWidth: 'md',
    },
})
```

You can still use dot notation to set individual values:

```js
putConfig('modal.closeButton', false)
putConfig('slideover.maxWidth', 'lg')
```

### New Configuration Options

Version 2.x introduces new configuration options:

```js
putConfig({
    useNativeDialog: true,  // NEW - uses native <dialog> element
    modal: {
        closeOnClickOutside: true,  // NEW - close on backdrop click
        // ... other options
    },
    slideover: {
        closeOnClickOutside: true,  // NEW - close on backdrop click
        // ... other options
    },
})
```

## Tailwind CSS Configuration

### Update Content Paths

The packages now use TypeScript, so update your Tailwind content paths to include `.ts` and `.tsx` files:

::: code-group

```js [Vue]
export default {
    content: [
        './node_modules/@inertiaui/modal-vue/src/**/*.{js,ts,vue}', // [!code ++]
        './node_modules/@inertiaui/modal-vue/src/**/*.{js,vue}', // [!code --]
        // other paths...
    ]
}
```

```js [React]
export default {
    content: [
        './node_modules/@inertiaui/modal-react/src/**/*.{js,ts,jsx,tsx}', // [!code ++]
        './node_modules/@inertiaui/modal-react/src/**/*.{js,jsx}', // [!code --]
        // other paths...
    ]
}
```

:::

### Tailwind CSS 4

Version 2.x is designed for Tailwind CSS 4. If you're still on Tailwind CSS 3, you can use the package in [headless mode](/v2/headless-mode) and provide your own UI, or stay on v0.x which supports Tailwind CSS 3.

## New Features

### Prefetch Support

You can now prefetch modal content before the user clicks. This improves perceived performance:

::: code-group

```vue [Vue]
<template>
    <!-- Prefetch on hover -->
    <ModalLink href="/users/create" prefetch="hover">
        Create User
    </ModalLink>

    <!-- Prefetch on mount -->
    <ModalLink href="/users/create" prefetch="mount">
        Create User
    </ModalLink>
</template>
```

```jsx [React]
export default function UserIndex() {
    return (
        <>
            {/* Prefetch on hover */}
            <ModalLink href="/users/create" prefetch="hover">
                Create User
            </ModalLink>

            {/* Prefetch on mount */}
            <ModalLink href="/users/create" prefetch="mount">
                Create User
            </ModalLink>
        </>
    );
}
```

:::

You can also prefetch programmatically:

::: code-group

```js [Vue]
import { prefetch } from '@inertiaui/modal-vue'

prefetch('/users/create')
```

```js [React]
import { prefetch } from '@inertiaui/modal-react'

prefetch('/users/create')
```

:::

### Close on Click Outside

The new `closeOnClickOutside` prop lets you disable closing the modal when clicking on the backdrop, while still allowing the `Esc` key to close it:

::: code-group

```vue [Vue]
<template>
    <ModalLink href="/users/create" :close-on-click-outside="false">
        Create User
    </ModalLink>
</template>
```

```jsx [React]
export default function UserIndex() {
    return (
        <ModalLink href="/users/create" closeOnClickOutside={false}>
            Create User
        </ModalLink>
    );
}
```

:::

> [!TIP] closeExplicitly vs closeOnClickOutside
> Use `closeExplicitly` to disable **both** backdrop clicks and `Esc` key. Use `closeOnClickOutside` to disable only backdrop clicks.

### Native Dialog Element

Modals now use the native HTML `<dialog>` element by default, providing better accessibility and native backdrop handling. You can disable this if needed:

```js
putConfig({
    useNativeDialog: false,
})
```

### TypeScript Support

Both packages now include TypeScript type definitions:

::: code-group

```ts [Vue]
import type { ModalConfig, ModalTypeConfig } from '@inertiaui/modal-vue'
```

```ts [React]
import type { ModalConfig, ModalTypeConfig } from '@inertiaui/modal-react'
```

:::

## Breaking Changes Summary

1. **React 18 is no longer supported** - upgrade to React 19
2. **Inertia.js v1 is no longer supported** - upgrade to v2.3.15+
3. **Configuration is now nested** - update your `putConfig` calls
4. **Tailwind content paths** - add `.ts` and `.tsx` extensions
