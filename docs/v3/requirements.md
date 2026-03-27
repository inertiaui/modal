# Requirements

Inertia Modal has the following requirements:

## Backend

- PHP 8.2+
- Laravel 12+ or Laravel 13+
- Inertia Laravel 3.0+

## Frontend

- Tailwind CSS 4+ (or use [headless mode](/headless-mode) with Tailwind CSS 3)
- **React**: React 19+ with `@inertiajs/react` 3.0+
- **Vue**: Vue 3.4+ with `@inertiajs/vue3` 3.0+

The package is designed and tested to work with Laravel and Inertia.js v3. If you're using Inertia.js v2, please use [Inertia Modal v2](/v2/introduction) instead.

## TypeScript Support

Both the React and Vue packages include TypeScript type definitions. You can import types from the packages:

::: code-group

```ts [Vue]
import type { ModalConfig, ModalTypeConfig } from '@inertiaui/modal-vue'
```

```ts [React]
import type { ModalConfig, ModalTypeConfig } from '@inertiaui/modal-react'
```

:::
