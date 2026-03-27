# Local Modals

Instead of opening a modal using a URL, you can also insert the modal content directly into the page. This is useful when you want to display a modal that is only relevant to a specific page and doesn't need to be shared across multiple pages. It's also great for simple modals that don't require a lot of logic.

To use a local modal, simply add the `Modal` component to your page and place the content directly inside the component. Next, you need to give the modal a unique name using the `name` prop.

To open the modal, you can use the `ModalLink` component and set the `href` prop to the name of the modal you want to open, prefixed with a `#` symbol.

::: code-group

```vue [Vue]
<template>
    <!-- ... -->

    <ModalLink href="#confirm-action">
        Perform Action
    </ModalLink>

    <Modal name="confirm-action">
        <!-- ... -->
    </Modal>
</template>
```

```jsx [React]
export default function Page() {
    return (
        <div>
            {/* ... */}

            <ModalLink href="#confirm-action">
                Perform Action
            </ModalLink>

            <Modal name="confirm-action">
                {/* ... */}
            </Modal>
        </div>
    );
}
```

:::

## Passing Props to Local Modals

You can pass props to a local modal by using the `visitModal` function with a `props` option. The props will be available in the modal's slot:

::: code-group

```vue [Vue]
<script setup>
import { Modal, visitModal } from '@inertiaui/modal-vue'

function openConfirmModal() {
    visitModal('#confirm-action', {
        props: {
            message: 'Are you sure you want to delete this item?',
            itemId: 123
        }
    })
}
</script>

<template>
    <button @click="openConfirmModal">Delete Item</button>

    <Modal name="confirm-action" v-slot="{ message, itemId }">
        <p>{{ message }}</p>
        <button @click="deleteItem(itemId)">Confirm</button>
    </Modal>
</template>
```

```jsx [React]
import { Modal, useModalStack } from '@inertiaui/modal-react'

export default function Page() {
    const { visitModal } = useModalStack()

    function openConfirmModal() {
        visitModal('#confirm-action', {
            props: {
                message: 'Are you sure you want to delete this item?',
                itemId: 123
            }
        })
    }

    return (
        <div>
            <button onClick={openConfirmModal}>Delete Item</button>

            <Modal name="confirm-action">
                {({ message, itemId }) => (
                    <div>
                        <p>{message}</p>
                        <button onClick={() => deleteItem(itemId)}>Confirm</button>
                    </div>
                )}
            </Modal>
        </div>
    );
}
```

:::

This is particularly useful for reusable confirmation modals or when you need to pass dynamic data to a local modal without making a server request.