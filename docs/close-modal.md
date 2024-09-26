# Close Modal

By default, both the modal and slideover components have a close button. You can hide this button by using the `close-button` prop, as documented in the [Configuration](/configuration.html) section. To close the modal programmatically, you can use the `close` method provided by the `Modal` component.

```vue
<template>
    <Modal v-slot="{ close }">
        <button type="button" @click="close">Close</button>
    </Modal>
</template>
```

Alternatively, you can use the `ref` attribute to get a reference to the modal component and call the `close` method on it.

```vue
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