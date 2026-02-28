# Event Bus

Sometimes you need to communicate from the modal to the parent page. You can use the `emit` slot prop function for this purpose. Just like [emitting events in Vue](https://vuejs.org/guide/components/events), you can pass a name and a payload to the `emit` function. The parent page can listen to these events using the `@` directive. Here's an example of emitting an event from the modal:

::: code-group

```vue [Vue]
<template>
    <Modal #default="{ emit }">
        <button type="button" @click="emit('increaseBy', 1)">
            Increase by 1
        </button>
    </Modal>
</template>
```

```jsx [React]
export default function MyPage() {
    return (
        <Modal>
            {({ emit }) => (
                <button type="button" onClick={() => emit('increaseBy', 1)}>
                    Increase by 1
                </button>
            )}
        </Modal>
    );
}
```

:::

Alternatively, you can use the `ref` attribute to get a reference to the modal component and call the `emit` method on it.

::: code-group

```vue [Vue]
<script setup>
import { ref } from 'vue';

const modalRef = ref(null);

function increaseBy(amount) {
    modalRef.value.emit('increaseBy', amount);
}
</script>

<template>
    <Modal ref="modalRef">
        <!-- ... -->
    </Modal>
</template>
```

```jsx [React]
import { useRef } from 'react';

export default function MyPage() {
    const modalRef = useRef(null);

    function increaseBy(amount) {
        modalRef.current.emit('increaseBy', amount);
    }

    return (
        <Modal ref={modalRef}>
            {/* ... */}
        </Modal>
    );
}
```

:::

On the parent page, you can listen to the event on the `ModalLink` component:

::: code-group

```vue [Vue]
<template>
    <ModalLink href="/modal" @increase-by="handleIncrease">
        Open Modal
    </ModalLink>
</template>
```

```jsx [React]
export default function MyPage() {
    function handleIncrease(amount) {
        console.log(`Increase by ${amount}`);
    }

    return (
        <ModalLink href="/modal" onIncreaseBy={handleIncrease}>
            Open Modal
        </ModalLink>
    );
}
```

:::

If you're [programmatically opening the modal](/basic-usage#programmatic-usage), you add listeners using the `listeners` option:

```js
visitModal('/users/create', {
    listeners: {
        increaseBy(amount) {
            console.log(`Increase by ${amount}`);
        }
    }
})
```

## Nested / Stacked Modals

To communicate between nested modals, please refer to the [Nested / Stacked Modals](nested-stacked-modals.md) section.
