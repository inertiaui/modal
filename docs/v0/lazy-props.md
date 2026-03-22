# Lazy Props

Lazy props allow you to delay prop evaluation and prevent them from being passed to the frontend when the modal initially renders. This follows the same concept as [Inertia's lazy data evaluation](https://inertiajs.com/partial-reloads#lazy-data-evaluation), ensuring data is only loaded when explicitly requested.

You can make a prop lazy by using the `lazy` method and simply passing a callback that returns the data you want to load.

```php
Inertia::modal('Team', [
    'team' => $team,
    'members' => Inertia::lazy(fn () => $team->getMembers()),
]);
```

Then in the frontend, you can use the `reload` method to load the lazy prop. For a deeper dive into how reload works, check out the [Reload Props](/reload-props) documentation.

::: code-group

```vue [Vue]
<script setup>
defineProps(['team', 'members']);
</script>

<template>
    <Modal #default="{ reload }">
        <button @click="reload({ only: ['members'] })">
            Show members
        </button>

        <div v-if="members?.length">
            <!-- Display members here -->
        </div>
    </Modal>
</template>
```

```jsx [React]
export default function Team({ team, members }) {
    return (
        <Modal>
            {({ reload }) => (
                <>
                    <button onClick={() => reload({ only: ['members'] })}>
                        Show members
                    </button>

                    {members?.length > 0 && (
                        <div>
                            {/* Display members here */}
                        </div>
                    )}
                </>
            )}
        </Modal>
    );
}
```

:::
