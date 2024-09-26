# Reload Props

Just like [regular Inertia pages](https://inertiajs.com/partial-reloads), the props of a modal can be reloaded without a full page refresh. You can use the `reload` method from the slot props of the `Modal` component:

```vue
<script setup>
defineProps(['permissions', 'roles']);
</script>

<template>
    <Modal #default="{ reload }">
        <button @click="reload()">
            Reload all
        </button>
    </Modal>
</template>
```

You can pass an object to the `reload` method to specify which props to reload:

```js
reload({ except: ['roles'] })
reload({ only: ['permissions'] })
```

Alternatively, you can use the `ref` attribute to get a reference to the modal component and call the method on it.

```vue
<script setup>
import { ref } from 'vue';

const modalRef = ref(null);

function reloadPermissions() {
    modalRef.value.reload({ only: ['permissions'] });
}
</script>

<template>
    <Modal ref="modalRef">
        <!-- ... -->
    </Modal>
</template>
```

## Example with Nested / Stacked Modal

The `reload` function is great to combine with [nested modals](/nested-stacked-modals.html). For example, you can reload the parent modal when the child modal is closed:

```vue
<script setup>
defineProps(['roles']);
</script>

<template>
    <Modal #default="{ reload }">
        <select name="role_id">
            <option v-for="role in roles" :key="role.id" :value="role.id">
                {{ role.name }}
            </option>
        </select>

        <ModalLink href="/roles/create" @close="reload">
            Add Role
        </ModalLink>
    </Modal>
</template>
```

In this example, a new role can be created in the child modal. When the child modal is closed, the parent modal will reload the `roles` prop to reflect the new role so that it appears in the select dropdown.
