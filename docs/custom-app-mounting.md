# Custom App Mounting

If you need more refined control over the mounting process, contrary to the regular [Inertia.js installation](/installation#inertia-js-configuration), you may ignore the `renderApp` helper method and perform the mounting manually.

## React

In React, you need to make changes to the `app.jsx` file and use a Layout component that renders the `ModalRoot` component after your main content.

### Create a Layout Component

First, create a Layout component that renders the `ModalRoot` component after your main content. In this example, we are naming the component `ModalLayout.jsx`:

```jsx [React]
import { ModalRoot } from '@inertiaui/modal-react'

export default function ModalLayout({ children }) {
    return (
        <>
            {children}
            <ModalRoot />
        </>
    )
}
```

### Update `app.jsx`

First, import your new Layout component and set it as the layout for your pages:

```jsx [React]
createInertiaApp({
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx'))
        .then(function (page) { // [!code ++]
            page.default.layout = (page => <ModalLayout children={page} />) // [!code ++]
            return page; // [!code ++]
        }), // [!code ++]
});
```

If you find this cumbersome, you can also use the `setPageLayout` helper function to set the layout for all pages:

```jsx [React]
import { setPageLayout } from '@inertiaui/modal-react' // [!code ++]

createInertiaApp({
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx'))
        .then(setPageLayout(ModalLayout)), // [!code ++]
});
```

Next, you need to call the `initFromPageProps` method with the `props` object. Lastly, you need to wrap the `App` component within the `ModalStackProvider` component:

```jsx [React]
import { ModalStackProvider, initFromPageProps } from '@inertiaui/modal-react' // [!code ++]

createInertiaApp({
    setup({ el, App, props }) {
        const root = createRoot(el);
        initFromPageProps(props) // [!code ++]

        root.render(
            <ModalStackProvider> // [!code ++]
                <App {...props} />
            </ModalStackProvider> // [!code ++]
        );
    }
});
```

## Vue

In Vue, it is a little bit simpler because you only need to make changes to the main `app.js` file. In this file, you need to call the `initFromPageProps` method with the `props` object. Then, you need to wrap the `App` component within the `ModalRoot` component:

```js [Vue]
import { ModalRoot, initFromPageProps } from '@inertiaui/modal-vue' // [!code ++]

createInertiaApp({
    setup({ el, App, props, plugin }) {
        initFromPageProps(props) // [!code ++]

        return
            createApp({ render: () => h(App, props) }) // [!code --]
            createApp({ render: () => h(ModalRoot, () => h(App, props)) }) // [!code ++]
            .use(plugin)
            .mount(el)
    }
})
```
