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

## Inertia.js Configuration

Inertia Modal requires a `ModalRoot` component to be mounted in your app. You can do this in the main `app.js` file where you initialize your Inertia app using the `createInertiaApp` function.

You only need to change the render function to include the `ModalRoot` component and pass the `App` component as a child of `ModalRoot`. If you're using React, you also need to wrap the `ModalRoot` component with the `ModalStackProvider` component.

::: code-group

```js [Vue]
import { renderApp } from '@inertiaui/modal-vue' // [!code ++]

createInertiaApp({
    setup({ el, App, props, plugin }) {
        return
            createApp({ render: () => h(App, props) }) // [!code --]
            createApp({ render: () => h(ModalRoot, () => h(App, props)) }) // [!code ++]
            .use(plugin)
            .mount(el)
    }
})
```

```jsx [React]
import { renderApp } from '@inertiaui/modal-react' // [!code ++]

createInertiaApp({
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <App {...props} /> // [!code --]
            renderApp(App, props) // [!code ++]
        );
    }
});
```

:::

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
