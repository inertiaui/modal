# Modal Props

Just like regular Inertia pages, modals can also receive props. This works similarly to how you would pass props to a regular Inertia page. Let's say you have a modal for editing a user:

```php
return Inertia::render('EditUser', [
    'roles' => Role::pluck('name', 'id'),
    'user' => $user,
]);
```

Then, in your modal component, you can access these props:

::: code-group

```vue [Vue]
<script setup>
defineProps({ roles: Object, user: Object })
</script>

<template>
    <div>
        <h1>Edit User {{ user.name }}</h1>
        <form>
            <!-- ... -->
        </form>
    </div>
</template>
```

```jsx [React]
export default function EditUser({ roles, user }) {
    return (
        <div>
            <h1>Edit User {user.name}</h1>
            <form>
                {/* ... */}
            </form>
        </div>
    )
}
```

:::

## Accessing Props using `useModal`

If you're using child components within your modal, you can pass props to them, but you can also access the modal's props using the `useModal` hook. This is useful when you need to access the modal's props in a child component that is not directly receiving them as props.

::: code-group

```vue [Vue]
<script setup>
import { useModal } from '@inertiaui/modal-vue'

const { props } = useModal()
</script>

<template>
    <p>User Status: {{ props.user.status }}</p>
</template>
```

```jsx [React]
import { useModal } from '@inertiaui/modal-react'

export default function EditUser() {
    const { props } = useModal()

    return (
        <p>User Status: {props.user.status}</p>
    )
}
```

:::