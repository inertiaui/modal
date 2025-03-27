# Nested / Stacked Modals

Inertia Modal supports opening modals from within other modals. There's actually nothing special you need to do to make this work. Just use the `ModalLink` component inside the `Modal` component, and it will automatically open the new modal on top of the existing one:

::: code-group

```vue [Vue]
<template>
    <Modal>
        <ModalLink href="/modal-2">
            Open Modal 2
        </ModalLink>
    </Modal>
</template>
```

```jsx [React]
export default function EditUser() {
    return (
        <Modal>
            <ModalLink href="/modal-2">
                Open Modal 2
            </ModalLink>
        </Modal>
    );
}
```

:::

## Communicating Between Modals

The `Modal` slot props contain `getParentModal` and `getChildModal` functions that allow you to grab the previous and next modals in the stack. Here is an example of triggering an event on the parent modal from the child modal:

::: code-group

```vue [Vue]
<template>
    <Modal #default="{ getParentModal }">
        <button type="button" @click="getParentModal().emit('message', 'Hello from child')">
            Push message to parent
        </button>
    </Modal>
</template>
```

```jsx [React]
export default function EditUser() {
    return (
        <Modal>
            {({ getParentModal }) => (
                <button type="button" onClick={() => getParentModal().emit('message', 'Hello from child')}>
                    Push message to parent
                </button>
            )}
        </Modal>
    );
}
```

:::

Alternatively, you can use the `ref` attribute to get a reference to the modal component and call the method on it.

::: code-group

```vue [Vue]
<script setup>
import { ref } from 'vue';

const modalRef = ref(null);

function sendMessageToParent() {
    modalRef.value.getParentModal().emit('message', 'Hello from child');
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

export default function EditUser() {
    const modalRef = useRef(null);

    function sendMessageToParent() {
        modalRef.current.getParentModal().emit('message', 'Hello from child');
    }

    return (
        <Modal ref={modalRef}>
            {/* ... */}
        </Modal>
    );
}
```

:::

On the parent modal, you can listen to the event like a regular event listener:

::: code-group

```vue [Vue]
<template>
    <Modal @message="handleMessage">
        <!-- ... -->
    </Modal>
</template>
```

```jsx [React]
export default function EditUser() {
    function handleMessage(message) {
        console.log(message);
    }

    return (
        <Modal onMessage={handleMessage}>
            {/* ... */}
        </Modal>
    );
}
```

:::

## Listen for changes

Instead of using the `emit` method with custom event names, you may use one of these built-in events on the `ModalLink` component:

- `close`: Triggered when the modal is closed.
- `after-leave`: Triggered after the modal has been closed, the transition has ended, and it has been removed from the DOM.
- `blur`: Triggered when another modal is opened and the current modal is not the topmost modal.
- `focus`: Triggered when the opened child modal is closed and the current modal is focused again.

This can be useful for updating something in the parent modal when the child modal is closed.

::: code-group

```vue [Vue]
<script setup>
function handleClosedChildModal() {
    console.log('Child modal closed');
}
</script>

<template>
    <!-- Parent Modal... -->
    <Modal>
        <ModalLink href="/modal-2" @close="handleClosedChildModal">
            Open Modal 2
        </ModalLink>
    </Modal>
</template>
```

```jsx [React]
export default function EditUser() {
    function handleClosedChildModal() {
        console.log('Child modal closed');
    }

    return (
        <Modal>
            <ModalLink href="/modal-2" onClose={handleClosedChildModal}>
                Open Modal 2
            </ModalLink>
        </Modal>
    );
}
```

:::

Another great example is reloading the parent modal when the child modal is closed. This is described in the [Reload Props](/reload-props#example-with-nested-stack-modal) documentation.
