# Nested / Stacked Modals

Inertia Modal supports opening modals from within other modals. There's actually nothing special you need to do to make this work. Just use the `ModalLink` component inside the `Modal` component, and it will automatically open the new modal on top of the existing one:

```vue
<template>
    <Modal>
        <ModalLink href="/modal-2">
            Open Modal 2
        </ModalLink>
    </Modal>
</template>
```

## Communicating Between Modals

The `Modal` slot props contain `getParentModal` and `getChildModal` functions that allow you to grab the previous and next modals in the stack. Here is an example of triggering an event on the parent modal from the child modal:

```vue
<template>
    <Modal #default="{ getParentModal }">
        <button type="button" @click="getParentModal().emit('message', 'Hello from child')">
            Push message to parent
        </button>
    </Modal>
</template>
```

Alternatively, you can use the `ref` attribute to get a reference to the modal component and call the method on it.

```vue
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

On the parent modal, you can listen to the event like a regular event listener:

```vue
<template>
    <Modal @message="handleMessage">
        <!-- ... -->
    </Modal>
</template>
```

## Listen for changes

Instead of using the `emit` method with custom event names, you may use one of these built-in events on the `ModalLink` component:

- `close`: Triggered when the modal is closed.
- `after-leave`: Triggered after the modal has been closed, the transition has ended, and it has been removed from the DOM.
- `blur`: Triggered when another modal is opened and the current modal is not the topmost modal.
- `focus`: Triggered when the opened child modal is closed and the current modal is focused again.

This can be useful for updating something in the parent modal when the child modal is closed.

```vue
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

Another great example is reloading the parent modal when the child modal is closed. This is described in the [Reload Props](/reload-props.html#example-with-nested-stack-modal) documentation.
