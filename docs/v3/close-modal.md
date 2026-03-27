# Close Modal

By default, both the modal and slideover components have a close button. You can hide this button by using the `close-button` prop, as documented in the [Configuration](/configuration) section. To close the modal programmatically, you can use the `close` method provided by the `Modal` component.

::: code-group

```vue [Vue]
<template>
    <Modal v-slot="{ close }">
        <button type="button" @click="close">Close</button>
    </Modal>
</template>
```

```jsx [React]
export default function MyModal() {
    return (
        <Modal>
            {({ close }) => (
                <button type="button" onClick={close}>Close</button>
            )}
        </Modal>
    );
}
```

:::

Alternatively, you can use the `ref` attribute to get a reference to the modal component and call the `close` method on it.

::: code-group

```vue [Vue]
<script setup>
import { ref } from 'vue';

const modalRef = ref(null);

function closeModal() {
    modalRef.value.close();
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

export default function MyModal() {
    const modalRef = useRef(null);

    function closeModal() {
        modalRef.current.close();
    }

    return (
        <Modal ref={modalRef}>
            {/* ... */}
        </Modal>
    );
}
```

:::