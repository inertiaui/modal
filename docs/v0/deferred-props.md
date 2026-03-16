# Deferred Props

Just like regular Inertia pages, you can defer a prop for your modal so that it loads asynchronously after the modal has been rendered. This can improve the initial rendering speed of the modal.

> [!WARNING] This feature requires Inertia.js v2.0.

## Make a prop deferred

Deferring modal props works exactly the same as [deferring page props](https://inertiajs.com/deferred-props) in Inertia. You may use the `defer` method and pass a callback that returns the actual data:

```php
Inertia::modal('Invoice/Overview', [
    'invoice' => $invoice,
    'lines' => Inertia::defer(fn () => $invoice->getLines()),
]);
```

## `Deferred` Component

In your modal template, you can use the `Deferred` component to render the deferred props. However, instead of importing the component from the Inertia package, you should import the component from the Modal package.

::: code-group

```vue [Vue]
<script setup>
import { Deferred } from '@inertiajs/vue3' // [!code --]
import { Deferred, Modal } from '@inertiaui/modal-vue'

defineProps({
    invoice: Object,
    lines: Array,
})
</script>

<template>
    <Modal>
        <h1>Invoice {{ invoice.id }}</h1>

        <Deferred data="lines">
            <template #fallback> Loading invoice lines... </template>

            <InvoiceLinesComponent :lines="lines" />
        </Deferred>
    </Modal>
</template>
```

```jsx [React]
import { Deferred } from '@inertiajs/react' // [!code --]
import { Deferred, Modal } from '@inertiaui/modal-react'

export default function Overview({ invoice, lines }) {
    return (
        <Modal>
            <h1>Invoice {invoice.id}</h1>

            <Deferred data="lines" fallback={<p>Loading invoice lines...</p>}>
                <InvoiceLinesComponent lines={lines} />
            </Deferred>
        </Modal>
    );
}
```

:::

Please check out the [Deferred Props](https://inertiajs.com/deferred-props) documentation for more information on how to use the `Deferred` component.