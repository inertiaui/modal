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