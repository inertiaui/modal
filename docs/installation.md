# Installation

Now you can install Inertia Modal using npm:

::: code-group

```bash [Vue]
npm install @inertiaui/modal-vue
```

```bash [React]
npm install @inertiaui/modal-react
```

:::

There's no backend package required for Inertia Modal, so you don't need to install anything using Composer.



## Tailwind Configuration

Inertia Modal uses Tailwind CSS for styling. You need to include the package path in the *content* array of your `tailwind.config.js` file:

::: code-group

```js [Vue]
export default {
    content: [
        './node_modules/@inertiaui/modal-vue/src/**/*.{js,vue}',
        // other paths...
    ]
}
```

```js [React]
export default {
    content: [
        './node_modules/@inertiaui/modal-react/src/**/*.{js,jsx}',
        // other paths...
    ]
}
```

:::

## Vite Configuration

There's some additional configuration required to use Inertia Modal. In the `vite.config.js` file, add the following config to the root of the configuration object:

::: code-group

```js [Vue]
resolve: {
    dedupe: ['@inertiajs/vue3']
}
```

```js [React]
resolve: {
    dedupe: ['@inertiajs/react']
}
```

:::

The `dedupe` option is required to prevent Inertia from being bundled multiple times. This is highly likely an Inertia-specific issue, and we are working on a more elegant solution for this.
