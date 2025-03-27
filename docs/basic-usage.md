# Basic Usage

As described in the [introduction](/introduction), Inertia Modal is fairly simple to use. There are two main components: `Modal` and `ModalLink`. In the sections below, we will cover how to use these components.

To use the components, you need to import them into your page:
::: code-group

```vue [Vue]
<script setup>
import { Modal, ModalLink } from '@inertiaui/modal-vue'
</script>
```

```jsx [React]
import { Modal, ModalLink } from '@inertiaui/modal-react'
```

:::

Instead of importing the components on every page, you may also consider importing them globally in your `app.js` file:

```js{7-8}
import { Modal, ModalLink, renderApp } from '@inertiaui/modal-vue'

createInertiaApp({
    setup({ el, App, props, plugin }) {
        return createApp({ render: renderApp(App, props) })
            .use(plugin)
            .component('Modal', Modal)
            .component('ModalLink', ModalLink)
            .mount(el)
    }
})
```

## `Modal` Component

The `Modal` component is used to wrap the content of the modal. You can place any content inside the `Modal` component, such as forms, tables, or other components.

::: code-group

```vue [Vue]
<template>
    <Modal>
        <h1>Create User</h1>
        <form>
            <!-- Form fields -->
        </form>
    </Modal>
</template>
```

```jsx [React]
export default function CreateUserModal() {
    return (
        <Modal>
            <h1>Create User</h1>
            <form>
                {/* Form fields */}
            </form>
        </Modal>
    );
}
```

:::

### `Modal` Events

The `Modal` component emits several events that you can listen to:

- `after-leave`: Triggered after the modal has been removed from the DOM.
- `blur`: Triggered when the modal loses focus because another modal is opened on top of it.
- `close`: Triggered when the modal is closed.
- `focus`: Triggered when the modal gains focus because a modal on top of it has been closed.
- `success`: Triggered when the modal has been successfully fetched and opened.

::: code-group

```vue [Vue]
<template>
    <Modal @close="doSomething">
        <!-- ... -->
    </Modal>
</template>
```

```jsx [React]
export default function CreateUserModal() {
    return (
        <Modal onClose={() => doSomething()}>
            {/* ... */}
        </Modal>
    );
}
```

:::

### Customizing the Modal

You may add additional props to the `Modal` component to customize its behavior and style. Check out the [Configuration](/configuration) section for a list of all available props.

## `ModalLink` Component

The `ModalLink` component is very similar to Inertia's [built-in `Link` component](https://inertiajs.com/links). You can pass an `href` prop and additional headers using the `headers` prop. The component is rendered as a regular anchor tag (`<a>`), but you can change the tag using the `as` prop.

::: code-group

```vue [Vue]
<template>
    <ModalLink href="/users/create">
        Create User
    </ModalLink>
</template>
```

```jsx [React]
export default function UserIndex() {
    return (
        <ModalLink href="/users/create">
            Create User
        </ModalLink>
    );
}
```

:::

### Method and Data

The `method` prop allows you to specify the HTTP method that should be used when requesting the modal. By default, the method is set to `get`. With the `data` prop, you can pass additional data to the backend.

::: code-group

```vue [Vue]
<template>
    <ModalLink
        href="/users/create"
        method="post"
        :data="{ default_name: 'John Doe' }"
    >
        Create User
    </ModalLink>
</template>
```

```jsx [React]
export default function UserIndex() {
    return (
        <ModalLink
            href="/users/create"
            method="post"
            data={{ default_name: 'John Doe' }}
        >
            Create User
        </ModalLink>
    );
}
```

:::

### Headers

The `headers` prop allows you to pass additional headers to the Inertia request. This is useful if you need to pass custom headers to the backend.

::: code-group

```vue [Vue]
<template>
    <ModalLink href="/users/create" :headers="{ 'X-Header': 'Value' }">
        Create User
    </ModalLink>
</template>
```

```jsx [React]
export default function UserIndex() {
    return (
        <ModalLink href="/users/create" headers={{ 'X-Header': 'Value' }}>
            Create User
        </ModalLink>
    );
}
```

:::

### Custom Tag

The `as` prop allows you to change the tag that is rendered. You can use it to render a button instead of an anchor tag.

::: code-group

```vue [Vue]
<template>
    <ModalLink href="/users/create" as="button">
        Create User
    </ModalLink>
</template>
```

```jsx [React]
export default function UserIndex() {
    return (
        <ModalLink href="/users/create" as="button">
            Create User
        </ModalLink>
    );
}
```

:::

### Loading State

The `ModalLink` component has a `loading` slot prop that you can use to show a loading state while the modal is being fetched. You can use this prop to display a loading spinner or text.

::: code-group

```vue [Vue]
<template>
    <ModalLink #default="{ loading }">
        {{ loading ? 'Loading...' : 'Open Modal' }}
    </ModalLink>
</template>
```

```jsx [React]
export default function UserIndex() {
    return (
        <ModalLink>
            {({ loading }) => (
                <span>{loading ? 'Loading...' : 'Open Modal'}</span>
            )}
        </ModalLink>
    );
}
```

:::

### `ModalLink` Events

In addition to the `loading` prop, you can also listen to the events emitted by the `ModalLink` component. You can use the `@start` and `@success` events to show a loading spinner or text.

::: code-group

```vue [Vue]
<script setup>
import { ref } from 'vue'

const loading = ref(false)
</script>

<template>
    <ModalLink @start="loading = true" @success="loading = false">
        <!-- ... -->
    </ModalLink>
</template>
```

```jsx [React]
export default function UserIndex() {
    const [loading, setLoading] = useState(false)

    return (
        <ModalLink
            onStart={() => setLoading(true)}
            onSuccess={() => setLoading(false)}
        >
            {/* ... */}
        </ModalLink>
    );
}
```

:::

In addition to the `@start` and `@success` events, there is also a `@error` event. This event is triggered when the Inertia request fails.

::: code-group

```vue [Vue]
<template>
    <ModalLink @error="errorToast('Whoops! Something went wrong.')">
        <!-- ... -->
    </ModalLink>
</template>
```

```jsx [React]
export default function UserIndex() {
    return (
        <ModalLink onError={() => errorToast('Whoops! Something went wrong.')}>
            {/* ... */}
        </ModalLink>
    );
}
```

:::

Then there are two more events: `@close` and `@after-leave`. The `@close` event is triggered when the modal is closed, and the `@after-leave` event is triggered after the modal has been removed from the DOM.

> [!WARNING] ModalLink Events and Browser Navigation
> The `close` and `after-leave` events are not triggered when the modal is closed after navigating to it using the browser's back or forward buttons. This is because Inertia.js rerenders the page, and therefore, the `ModalLink` components. Closing the modal will not be linked to the original `ModalLink` component.

### Customizing

Just like the `Modal` component, you can pass additional props to the `ModalLink` component to customize its behavior and style. Check out the [Configuration](/configuration) section for a list of all available props.

## Programmatic Usage

Instead of using the `ModalLink` component, you can also open a modal programmatically using the `visitModal` method.

::: code-group

```vue [Vue]
<script setup>
import { visitModal } from '@inertiaui/modal-vue'

function createUserModal() {
    visitModal('/users/create')
}
</script>

<template>
    <button @click="createUserModal">Create User</button>
</template>
```

```jsx [React]
import { useModalStack } from '@inertiaui/modal-react'

function UserIndex() {
    const modalStack = useModalStack();

    function createUserModal() {
        modalStack.visitModal('/users/create')
    }

    return (
        <button onClick={createUserModal}>Create User</button>
    );
}
```

:::

If you want to open a [Local Modal](/local-modals), you must prepend the URL with a `#`:

```js
visitModal('#confirm-action')
```

The `visitModal` method accepts a second argument, which is an object with options:

```js
visitModal('/users/create', {
    method: 'post',
    navigate: true,
    data: { default_name: 'John Doe' },
    headers: { 'X-Header': 'Value' },
    config: {
        slideover: true,
    }
    listeners: {},
    onClose: () => console.log('Modal closed'),
    onAfterLeave: () => console.log('Modal removed from DOM'),
    queryStringArrayFormat: 'brackets',
})
```

The `config` option allows you to customize the behavior and style of the modal. You should check out the [Configuration](/configuration#default-configuration) section for a list of all available options. The `queryStringArrayFormat` can be set to either `brackets` or `indices`.
