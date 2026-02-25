# Requirements

Inertia Modal has the following requirements:

## Backend

- PHP 8.2+
- Laravel 11.11+ or Laravel 12+
- Inertia Laravel 2.0+

## Frontend

- Tailwind CSS 4+
- **React**: React 19+ with `@inertiajs/react` 2.3.15+
- **Vue**: Vue 3.4+ with `@inertiajs/vue3` 2.3.15+

The package is designed and tested to work with Laravel and Inertia.js v2. It may work with other backend frameworks, but there is no guarantee or support for such configurations.

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