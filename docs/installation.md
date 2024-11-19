# Installation

There are two ways to install Inertia Modal. First, you can install the package with Composer. This package contains the Laravel package as well as the frontend packages. The advantage of installing it with Composer is that the frontend package is always in sync with the backend package. Alternatively, you can use npm to install the frontend package separately, but this requires you to manage the versions of the frontend and backend packages yourself.

## Composer Installation

```bash
composer require inertiaui/modal
```

After installing the package, you can link the React or Vue package into your project. This will create a symlink in your `node_modules` directory to the package in the `vendor` directory.

::: code-group

```bash [Vue]
npm install vendor/inertiaui/modal/vue
```

```bash [React]
npm install vendor/inertiaui/modal/react
```

:::

## NPM Installation

You may also install the frontend packages separately.

::: code-group

```bash [Vue]
npm install @inertiaui/modal-vue
```

```bash [React]
npm install @inertiaui/modal-react
```

:::

## Inertia.js Configuration

Inertia Modal requires a *root*-component to be mounted in your app. You can do this in the main `app.js` file where you initialize your Inertia app using the `createInertiaApp` function. You only need to change the render function to include the `renderApp` method and pass the `App` component and `props` object to it.

::: code-group

```js [Vue]
import { renderApp } from '@inertiaui/modal-vue' // [!code ++]

createInertiaApp({
    setup({ el, App, props, plugin }) {
        return
            createApp({ render: () => h(App, props) }) // [!code --]
            createApp({ render: renderApp(App, props) }) // [!code ++]
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

If you need more refined control over the mounting process, you should check out the [Custom App Mounting](/custom-app-mounting.md) documentation.

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