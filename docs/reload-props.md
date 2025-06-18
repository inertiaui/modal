# Reload Props

Just like [regular Inertia pages](https://inertiajs.com/partial-reloads), the props of a modal can be reloaded without a full page refresh. You can use the `reload` method from the slot props of the `Modal` component:

::: code-group

```vue [Vue]
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

```jsx [React]
export default function MyPage({ permissions, roles }) {
    return (
        <Modal>
            {({ reload }) => (
                <button onClick={reload}>
                    Reload all
                </button>
            )}
        </Modal>
    );
}
```

:::

You can pass an object to the `reload` method to specify which props to reload:

```js
reload({ except: ['roles'] })
reload({ only: ['permissions'] })
```

Just like regular Inertia requests, you can also pass additional data and headers.

```js
reload({ data: { email: 'john.doe@example.com' } })
reload({ headers: { 'X-Custom-Header': 'value' } })
```

Alternatively, you can use the `ref` attribute to get a reference to the modal component and call the method on it.

::: code-group

```vue [Vue]
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

```jsx [React]
import { useRef } from 'react';

export default function MyPage({ permissions, roles }) {
    const modalRef = useRef(null);

    function reloadPermissions() {
        modalRef.current.reload({ only: ['permissions'] });
    }

    return (
        <Modal ref={modalRef}>
            {/* ... */}
        </Modal>
    );
}
```

:::

## Example with Nested / Stacked Modal

The `reload` function is great to combine with [nested modals](/nested-stacked-modals). For example, you can reload the parent modal when the child modal is closed:

::: code-group

```vue [Vue]
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

```jsx [React]
export default function MyPage({ roles }) {
    return (
        <Modal>
            {({ reload }) => (
                <>
                    <select name="role_id">
                        {roles.map(role => (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </select>

                    <ModalLink href="/roles/create" onClose={reload}>
                        Add Role
                    </ModalLink>
                </>
            )}
        </Modal>
    );
}
```

:::

In this example, a new role can be created in the child modal. When the child modal is closed, the parent modal will reload the `roles` prop to reflect the new role so that it appears in the select dropdown.
