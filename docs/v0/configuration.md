# Configuration

The `ModalLink` and `Modal` components have a number of props that allow you to customize their behavior and style. Let's take a look at all the available props.

## Available Props

The following props can be used on both the `ModalLink` and `Modal` components. The props passed to `ModalLink` will take precedence over those passed to `Modal`.

### `close-button`

The `close-button` prop allows you to show or hide the close button in the modal. By default, the close button is shown. To render a custom close button, you can check out the [Close Modal](/close-modal) section.

::: code-group

```vue [Vue]
<template>
    <ModalLink href="/users/create" :close-button="false">
        Create User
    </ModalLink>
</template>
```

```jsx [React]
export default function UserIndex() {
    return (
        <ModalLink href="/users/create" closeButton={false}>
            Create User
        </ModalLink>
    );
}
```

:::

### `close-explicitly`

The `close-explicitly` prop allows you to close the modal explicitly. By default, the modal closes when the user clicks outside of the modal or presses the `Esc` key. If you set `close-explicitly` to `true`, the modal will only close when you press the close button or close it programmatically.

::: code-group

```vue [Vue]
<template>
    <ModalLink href="/users/create" :close-explicitly="true">
        Create User
    </ModalLink>
</template>
```

```jsx [React]
export default function UserIndex() {
    return (
        <ModalLink href="/users/create" closeExplicitly={true}>
            Create User
        </ModalLink>
    );
}
```

:::

### `max-width`

The `max-width` lets you specify the maximum width of the modal. For modals, the default value is `2xl`, and for slideover, the default value is `md`. These values correspond to Tailwind CSS conventions. Valid values are `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `6xl`, and `7xl`.

::: code-group

```vue [Vue]
<template>
    <ModalLink href="/users/create" max-width="lg">
        Create User
    </ModalLink>
</template>
```

```jsx [React]
export default function UserIndex() {
    return (
        <ModalLink href="/users/create" maxWidth="lg">
            Create User
        </ModalLink>
    );
}
```

:::

### `padding-classes`

The `padding-classes` prop allows you to add custom padding classes to the modal. This is useful if you want to add extra padding to the modal content or if you want to remove the default padding. The default classes are `p-4 sm:p-6`.

::: code-group

```vue [Vue]
<template>
    <ModalLink href="/users/create" padding-classes="p-8">
        Create User
    </ModalLink>
</template>
```

```jsx [React]
export default function UserIndex() {
    return (
        <ModalLink href="/users/create" paddingClasses="p-8">
            Create User
        </ModalLink>
    );
}
```

:::

### `panel-classes`

The `panel-classes` prop allows you to add custom classes to the panel of the modal. This is useful if you want to add extra styles to the modal panel, such as a border or shadow. The default classes are `bg-white rounded` for modals and `bg-white min-h-screen` for slideover.

These classes are merged with the padding classes. They are separated by a different prop to allow for more flexibility.

::: code-group

```vue [Vue]
<template>
    <ModalLink href="/users/create" panel-classes="bg-blue-50 rounded-lg">
        Create User
    </ModalLink>
</template>
```

```jsx [React]
export default function UserIndex() {
    return (
        <ModalLink href="/users/create" panelClasses="bg-blue-50 rounded-lg">
            Create User
        </ModalLink>
    );
}
```

:::

### `position`

The `position` prop allows you to specify the position of the modal. The default value is `center` for modals and `right` for slideover. Valid values for modals are `bottom`, `center`, and `top`. Valid values for slideover are `left` and `right`.

::: code-group

```vue [Vue]
<template>
    <ModalLink href="/users/create" position="top">
        Create User
    </ModalLink>
</template>
```

```jsx [React]
export default function UserIndex() {
    return (
        <ModalLink href="/users/create" position="top">
            Create User
        </ModalLink>
    );
}
```

:::

### `slideover`

The `slideover` prop allows you to open the modal as a slideover instead of a modal. The default value is `false`. When you add the `slideover` prop, the modal will open as a slideover.

::: code-group

```vue [Vue]
<template>
    <ModalLink href="/users/create" slideover>
        Create User
    </ModalLink>
</template>
```

```jsx [React]
export default function UserIndex() {
    return (
        <ModalLink href="/users/create" slideover>
            Create User
        </ModalLink>
    );
}
```

:::

## Default configuration

You can set the default configuration for all modals and slideovers by importing the `putConfig` function from the package, for example, in your `app.js` file.

::: code-group

```js [Vue]
import { putConfig } from '@inertiaui/modal-vue'
```

```js [React]
import { putConfig } from '@inertiaui/modal-react'
```

:::

You can call the `putConfig` function with an object containing the configuration that you want to set as the default. Here is an example with the default configuration. Note that there are separate keys for modals and slideovers.

```js
putConfig({
    type: 'modal',
    navigate: false,
    modal: {
        closeButton: true,
        closeExplicitly: false,
        maxWidth: '2xl',
        paddingClasses: 'p-4 sm:p-6',
        panelClasses: 'bg-white rounded',
        position: 'center',
    },
    slideover: {
        closeButton: true,
        closeExplicitly: false,
        maxWidth: 'md',
        paddingClasses: 'p-4 sm:p-6',
        panelClasses: 'bg-white min-h-screen',
        position: 'right',
    },
})
```

Instead of passing a whole object, you can also pass just the keys that you want to override. The other values will be taken from the default configuration.

```js
putConfig({
    modal: {
        closeButton: false,
    },
})
```

Alternatively, you can pass a key and a value to the `putConfig` function using dot notation.

```js
putConfig('modal.closeButton', false)
```
