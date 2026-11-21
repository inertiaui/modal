# Requirements

Inertia Modal's major version is aligned with Inertia.js:

| Inertia Modal | Inertia.js | Laravel | Status |
|---------------|------------|---------|--------|
| **3.x** | **v3** | 12+ | **Current** |
| 2.x | v2 | 11.11+ | Supported ([docs](/v2/introduction)) |
| 0.x | v1 | — | Unsupported |

::: warning Version Matching
Inertia Modal 3.x **only** works with Inertia.js v3. If you're using Inertia.js v2, use [Inertia Modal 2.x](/v2/introduction) instead.
:::

## Backend

- PHP 8.2+
- Laravel 12+ or Laravel 13+
- Inertia Laravel 3.0+

## Frontend

- Tailwind CSS 4+ (or use [headless mode](/headless-mode) with Tailwind CSS 3)
- **React**: React 19+ with `@inertiajs/react` 3.0+
- **Vue**: Vue 3.4+ with `@inertiajs/vue3` 3.0+

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
