# Upgrade Guide

This guide covers upgrading from Inertia Modal 0.x to version 2.x.

## Installation

Update the Composer package:

```bash
composer require inertiaui/modal:^2.0.0-beta.1
```

If you originally installed the frontend package via NPM (instead of using the Composer symlink), update it as well:

::: code-group

```bash [Vue]
npm install @inertiaui/modal-vue@^2.0.0-beta.1
```

```bash [React]
npm install @inertiaui/modal-react@^2.0.0-beta.1
```

:::

If you're unsure which method you used, check the [Installation](/v2/installation) docs for more details.

## Requirements Changes

Version 2.x has updated minimum requirements:

| Dependency | 0.x | 2.x |
|------------|-----|-----|
| PHP | 8.2+ | 8.2+ |
| Laravel | 10.48+ | 11.11+ or 12+ |
| Inertia Laravel | 1.3+ or 2.0+ | 2.0+ |
| React | 18.2+ or 19+ | 19+ |
| Vue | 3.4+ | 3.4+ |
| `@inertiajs/react` | 1.3+ or 2.x | 2.3.15+ |
| `@inertiajs/vue3` | 1.3+ or 2.x | 2.3.15+ |
| Tailwind CSS | 3.x | 4+ (or 3.x with [headless mode](/v2/headless-mode)) |

## Configuration Changes

### New Configuration Options

Version 2.x introduces new configuration options:

```js
putConfig({
    useNativeDialog: true,  // NEW - uses native <dialog> element (default: true)
    appElement: '#app',     // NEW - selector for aria-hidden when modal opens
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

The `appElement` option specifies which DOM element should be marked as `aria-hidden` when a modal is open. The default is `'#app'`. If your app uses a different root element (e.g., `'#root'`), update this value accordingly. Set to `null` to disable this behavior.

## Tailwind CSS Configuration

### Tailwind CSS 4

Version 2.x is designed for Tailwind CSS 4. If you're migrating from Tailwind 3, replace the `content` array in your `tailwind.config.js` with `@source` directives in your CSS:

::: code-group

```css [Vue]
@source "../node_modules/@inertiaui/modal-vue/src";
```

```css [React]
@source "../node_modules/@inertiaui/modal-react/src";
```

:::

See the [Tailwind CSS 4 upgrade guide](https://tailwindcss.com/docs/upgrade-guide) for the full migration process.

### Tailwind CSS 3

If you're staying on Tailwind CSS 3, you can use the package in [headless mode](/v2/headless-mode) and provide your own UI, or stay on v0.x which supports Tailwind CSS 3 out of the box.

If you're on Tailwind 3 and using headless mode, update your content paths to include `.ts` and `.tsx` files:

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

Modals now use the native HTML `<dialog>` element by default, providing better accessibility and native backdrop handling.

> [!WARNING] Breaking Change
> The native dialog changes how modals render in the DOM. If you have custom CSS targeting the `.im-backdrop` element, note that this element is no longer rendered when `useNativeDialog` is `true` (the default). Instead, the backdrop is rendered via the `::backdrop` pseudo-element, which requires plain CSS — Tailwind CSS cannot target it. See the [Styling](/v2/styling) page for details.

To opt out and use the previous behavior:

```js
putConfig({
    useNativeDialog: false,
})
```

### Local Modal Props

You can now pass props to [local modals](/v2/local-modals#passing-props-to-local-modals) when opening them programmatically:

```js
visitModal('#confirm-action', {
    props: {
        message: 'Are you sure?',
        itemId: 123,
    },
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

1. **React 18 is no longer supported** — upgrade to React 19
2. **Inertia.js v1 is no longer supported** — upgrade to Inertia Laravel 2.0+ and `@inertiajs/react` or `@inertiajs/vue3` 2.3.15+
3. **Laravel 10 is no longer supported** — upgrade to Laravel 11.11+ or 12+
4. **Tailwind CSS 4 is required** — the default UI is built for Tailwind 4. Use [headless mode](/v2/headless-mode) if you need to stay on Tailwind 3
5. **Native `<dialog>` element is the default** — the `.im-backdrop` element is no longer rendered. Custom backdrop CSS needs to target `dialog.im-dialog::backdrop` instead. Set `useNativeDialog: false` to opt out
6. **Tailwind content paths changed** — source files are now TypeScript (`.ts`/`.tsx`). If using Tailwind 3, update your content paths accordingly
