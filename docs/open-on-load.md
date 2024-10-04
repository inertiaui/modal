# Open On Load

You can open a modal automatically when the page loads by using the `fragment` prop on the `ModalLink` component and by suffixing the page's URL with the fragment value. This is also briefly mentioned in the [ModalLink](/basic-usage.html#fragment) section.

Let's take a look at the `/users` route, which is a page with all users and has a button to open a modal to create a new user:

::: code-group

```vue{7} [Vue]
<template>
    <div>
        <h1>Users</h1>

        <ModalLink
            href="/users/create"
            fragment="create"
        >
            Create New User
        </ModalLink>

        <!-- Table of users... -->
    </div>
</template>
```

```jsx{8} [React]
export default function UserIndex() {
    return (
        <div>
            <h1>Users</h1>

            <ModalLink
                href="/users/create"
                fragment="create"
            >
                Create New User
            </ModalLink>

            {/* Table of users... */}
        </div>
    );
}
```

:::

If you want to share a link to this page that opens the modal automatically, you can append `#create` to the URL. When the page loads, the modal will open automatically.

```
https://example.com/users#create
```