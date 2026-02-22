# Requirements

Inertia Modal has the following requirements:

- Tailwind CSS 4+
- React 19+ or Vue 3.4+

The package is designed and tested to work with Laravel and Inertia.js v1/v2. It may work with other backend frameworks and Inertia.js versions, but there is no guarantee or support for such configurations.

The Base Route / URL feature is supported in both Laravel 10 and 11.

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