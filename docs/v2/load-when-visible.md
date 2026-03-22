# Load When Visible

Just like with regular Inertia pages, you can make modal props optional, meaning they are not evaluated and passed to the frontend until needed. You may combine this with the `WhenVisible` component to load a prop only when an element becomes visible in the viewport.

> [!WARNING] This feature requires Inertia.js v2.0.

## Make a prop optional

To make a prop optional, simply call the `optional` method and pass a callback that returns the actual data:

```php
Inertia::modal('Invoice/Overview', [
    'invoice' => $invoice,
    'customer' => Inertia::optional(fn () => $invoice->getCustomer()),
]);
```

## `WhenVisible` component

In your modal template, you may use the `WhenVisible` component to load a prop only when the component is in the viewport. This works exactly the same as Inertia's [built-in component](https://inertiajs.com/load-when-visible). In modals, you should import this component from the Modal package instead of the Inertia package.

::: code-group

```vue [Vue]
<script setup>
import { WhenVisible } from '@inertiajs/vue3' // [!code --]
import { WhenVisible, Modal } from '@inertiaui/modal-vue'
import { ref } from 'vue'

defineProps({
    invoice: Object,
    customer: Object,
})

const activeTab = ref('invoice')
</script>

<template>
    <Modal>
        <h1>Invoice {{ invoice.id }}</h1>

        <!-- Tabs for switching between Invoice and Customer details -->

        <div v-show="activeTab === 'customer'">
            <h2>Customer Details</h2>

            <WhenVisible data="customer">
                <template #fallback> Loading customer... </template>

                <CustomerComponent :customer="customer" />
            </WhenVisible>
        </div>
    </Modal>
</template>
```

```jsx [React]
import { WhenVisible } from '@inertiajs/react' // [!code --]
import { WhenVisible, Modal } from '@inertiaui/modal-react'
import { useState } from 'react'

export default function Overview({ invoice, customer }) {
    const [activeTab, setActiveTab] = useState('invoice')

    return (
        <Modal>
            <h1>Invoice {invoice.id}</h1>

            {/* Tabs for switching between Invoice and Customer details */}

            <div className={activeTab !== 'customer' ? 'hidden' : ''}>
                <h2>Customer Details</h2>

                <WhenVisible data="customer" fallback={<p>Loading customer...</p>}>
                    <CustomerComponent customer={customer} />
                </WhenVisible>
            </div>
        </Modal>
    )
}
```

:::

Please check out the [WhenVisible](https://inertiajs.com/load-when-visible) documentation for more information on how to use this component.