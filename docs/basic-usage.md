# Basic Usage

As described in the [introduction](/introduction.html), Inertia Modal is fairly simple to use. There are two main components: `Modal` and `ModalLink`. In the sections below, we will cover how to use these components.

To use the components, you need to import them into your page:

```vue
<script setup>
import { Modal, ModalLink } from '@inertiaui/modal-vue'
</script>
```

Instead of importing the components on every page, you may also consider importing them globally in your `app.js` file:

```js{7-8}
import { Modal, ModalLink } from '@inertiaui/modal-vue'

createInertiaApp({
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .component('Modal', Modal)
            .component('ModalLink', ModalLink)
            .mount(el)
    }
})
```

## `Modal` Component

The `Modal` component is used to wrap the content of the modal. You can place any content inside the `Modal` component, such as forms, tables, or other components.

```vue
<template>
    <Modal>
        <h1>Create User</h1>
        <form>
            <!-- Form fields -->
        </form>
    </Modal>
</template>
```

### Customizing the Modal

You may add additional props to the `Modal` component to customize its behavior and style. Check out the [Configuration](/configuration.html) section for a list of all available props.

## `ModalLink` Component

The `ModalLink` component is very similar to Inertia's [built-in `Link` component](https://inertiajs.com/links). You can pass an `href` prop and additional headers using the `headers` prop. The component is rendered as a regular anchor tag (`<a>`), but you can change the tag using the `as` prop.

```vue
<template>
    <ModalLink href="/users/create">
        Create User
    </ModalLink>
</template>
```

### Method and Data

The `method` prop allows you to specify the HTTP method that should be used when requesting the modal. By default, the method is set to `get`. With the `data` prop, you can pass additional data to the backend.

```vue
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

### Headers

The `headers` prop allows you to pass additional headers to the Inertia request. This is useful if you need to pass custom headers to the backend.

```vue
<template>
    <ModalLink href="/users/create" :headers="{ 'X-Header': 'Value' }">
        Create User
    </ModalLink>
</template>
```

### Custom Tag

The `as` prop allows you to change the tag that is rendered. You can use it to render a button instead of an anchor tag.

```vue
<template>
    <ModalLink href="/users/create" as="button">
        Create User
    </ModalLink>
</template>
```

### Fragment

The `fragment` prop allows you to specify a fragment identifier that will be appended to the URL:

```vue
<template>
    <ModalLink href="/users/create" fragment="create-user">
        Create User
    </ModalLink>
</template>
```

Say you are on the page `/users`, and you click the link above. The URL will change to `/users#create-user`. There are two reasons you might want to use this feature. First, when you refresh the page with the fragment in the URL, the modal will automatically open. Second, you can now share the URL with the fragment with others, and when they open the link, the modal will automatically open for them as well.

### Loading State

The `ModalLink` component has a `loading` slot prop that you can use to show a loading state while the modal is being fetched. You can use this prop to display a loading spinner or text.

```vue
<template>
    <ModalLink #default="{ loading }">
        {{ loading ? 'Loading...' : 'Open Modal' }}
    </ModalLink>
</template>
```

### Events

In addition to the `loading` prop, you can also listen to the events emitted by the `ModalLink` component. You can use the `@start` and `@success` events to show a loading spinner or text.

```vue
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

In addition to the `@start` and `@success` events, there is also a `@error` event. This event is triggered when the Inertia request fails.

```vue
<template>
    <ModalLink @error="errorToast('Whoops! Something went wrong.')">
        <!-- ... -->
    </ModalLink>
</template>
```

Then there are two more events: `@close` and `@after-leave`. The `@close` event is triggered when the modal is closed, and the `@after-leave` event is triggered after the modal has been removed from the DOM.

### Customizing

Just like the `Modal` component, you can pass additional props to the `ModalLink` component to customize its behavior and style. Check out the [Configuration](/configuration.html) section for a list of all available props.
