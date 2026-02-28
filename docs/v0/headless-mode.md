# Headless Mode

Though the package comes with a default customizable UI, you can also use it in headless mode and provide your own UI. This way, you can still utilize the package's functionality without the default UI. You may use the `HeadlessModal` component to create your own UI. Please note that you are on your own when it comes to implementing this, as we cannot provide support for the unlimited possibilities of custom UIs.

## `HeadlessModal` component

The `Headless` component provides the following props:

| Prop | Description |
| --- | --- |
| afterLeave | Function to call after the modal has left the screen to remove it from the DOM |
| close | Function to close the modal |
| config | The [configuration](/configuration) passed to the modal |
| emit | Function to emit an event |
| getChildModal | Function to get first the child modal |
| getParentModal | Function to get the parent modal |
| id | The modal's unique ID |
| index | The modal stack index |
| isOpen | Boolean indicating if the modal is open |
| modalContext | Object with all of the props in this table |
| onTopOfStack | Boolean indicating if the modal is on top of the stack |
| reload | Function to [reload](/reload-props) props |
| setOpen | Function to toggle the modal's open state |

Here is an example of how to use the `HeadlessModal` component:

::: code-group

```vue [Vue]
<script setup>
import { HeadlessModal } from '@inertiaui/modal-vue'
import { ref } from 'vue'

const modal = ref(null)

function closeModal() {
    modal.value.close()
}
</script>

<template>
    <HeadlessModal
        ref="modal"
        v-slot="{
            afterLeave,
            close,
            config,
            emit,
            getChildModal,
            getParentModal,
            id,
            index,
            modalContext,
            onTopOfStack,
            isOpen,
            reload,
            setOpen,
        }"
    >
        <!-- Your custom modal here -->
    </HeadlessModal>
</template>
```

```jsx [React]
import { HeadlessModal } from '@inertiaui/modal-react'
import { useRef } from 'react'

export default function UserEdit({ ...props }) {
    const modalRef = useRef(null)

    function closeModal() {
        modalRef.current.close()
    }

    return (
        <HeadlessModal ref={modalRef} {...props}>
            {({ afterLeave,
                close,
                config,
                emit,
                getChildModal,
                getParentModal,
                id,
                index,
                modalContext,
                onTopOfStack,
                isOpen,
                reload,
                setOpen
            }) => (
                {/* Your custom modal here */ }
            )}
        </HeadlessModal>
    )
}
```

:::
