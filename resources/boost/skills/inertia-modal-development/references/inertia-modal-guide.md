# Inertia Modal Reference

Complete reference for `inertiaui/modal`. Full documentation: https://inertiaui.com/inertia-modal/docs

## Requirements

### Backend
- PHP 8.2+
- Laravel 11.11+ or Laravel 12+
- Inertia Laravel 2.0+

### Frontend
- Tailwind CSS 4+ (or headless mode with Tailwind 3)
- **React**: React 19+ with `@inertiajs/react` 2.3.15+
- **Vue**: Vue 3.4+ with `@inertiajs/vue3` 2.3.15+

## Installation

### Composer (recommended)
```bash
composer require inertiaui/modal
```

Then link the frontend package:
```bash
# Vue
npm install vendor/inertiaui/modal/vue

# React
npm install vendor/inertiaui/modal/react
```

### NPM (alternative)
```bash
# Vue
npm install @inertiaui/modal-vue

# React
npm install @inertiaui/modal-react
```

## App Setup

### Vue
```js
import { renderApp } from '@inertiaui/modal-vue'

createInertiaApp({
    setup({ el, App, props, plugin }) {
        createApp({ render: renderApp(App, props) })
            .use(plugin)
            .mount(el)
    }
})
```

### React
```jsx
import { renderApp } from '@inertiaui/modal-react'

createInertiaApp({
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(renderApp(App, props));
    }
});
```

### Tailwind CSS 4
Add to your CSS file:
```css
/* Vue */
@source "../node_modules/@inertiaui/modal-vue/src";

/* React */
@source "../node_modules/@inertiaui/modal-react/src";
```

## Backend Usage

### Opening a Route as a Modal
```php
// Simple modal (no URL change)
return Inertia::modal('EditUser', [
    'user' => $user,
    'roles' => Role::pluck('name', 'id'),
]);

// With base route (enables URL change and browser history)
return Inertia::modal('EditUser', ['user' => $user])
    ->baseRoute('users.index');

// With base URL
return Inertia::modal('EditUser', ['user' => $user])
    ->baseUrl('/users');
```

### Deferred Props
```php
Inertia::modal('Invoice/Overview', [
    'invoice' => $invoice,
    'lines' => Inertia::defer(fn () => $invoice->getLines()),
]);
```

### Lazy Props
```php
Inertia::modal('Team', [
    'team' => $team,
    'members' => Inertia::lazy(fn () => $team->getMembers()),
]);
```

### Optional Props (Load When Visible)
```php
Inertia::modal('Invoice/Overview', [
    'invoice' => $invoice,
    'customer' => Inertia::optional(fn () => $invoice->getCustomer()),
]);
```

### Backend Configuration
```php
return Inertia::modal('EditUser', ['user' => $user])
    ->baseRoute('users.index')
    ->maxWidth('2xl')
    ->position('center')
    ->slideover();
```

### Redirector
The package extends Laravel's redirector so `back()` respects modal base URLs. Disable via config:
```php
// config/inertiaui-modal.php
return [
    'bind_extended_redirector' => false,
];
```

Use `back_from_modal()` helper when the extended redirector is disabled.

### Static Methods
```php
// Hook into base URL re-rendering
Modal::beforeBaseRerender(callable $callback);

// Exclude middleware from base URL subrequests
Modal::excludeMiddlewareOnBaseUrl([
    \Illuminate\Cookie\Middleware\EncryptCookies::class,
]);
```

## Frontend Components

### `ModalLink` Component

Basic usage:
```vue
<!-- Vue -->
<ModalLink href="/users/create">Create User</ModalLink>
```
```jsx
// React
<ModalLink href="/users/create">Create User</ModalLink>
```

With props:
```vue
<!-- Vue -->
<ModalLink
    href="/users/create"
    method="post"
    :data="{ default_name: 'John Doe' }"
    :headers="{ 'X-Header': 'Value' }"
    as="button"
    navigate
    slideover
    max-width="lg"
    :close-button="false"
    :close-explicitly="true"
    :close-on-click-outside="false"
    padding-classes="p-8"
    panel-classes="bg-blue-50 rounded-lg"
    position="top"
>
    Create User
</ModalLink>
```

```jsx
// React
<ModalLink
    href="/users/create"
    method="post"
    data={{ default_name: 'John Doe' }}
    headers={{ 'X-Header': 'Value' }}
    as="button"
    navigate={true}
    slideover
    maxWidth="lg"
    closeButton={false}
    closeExplicitly={true}
    closeOnClickOutside={false}
    paddingClasses="p-8"
    panelClasses="bg-blue-50 rounded-lg"
    position="top"
>
    Create User
</ModalLink>
```

#### Prefetching
```vue
<!-- Vue -->
<ModalLink href="/users/create" prefetch="hover">Create User</ModalLink>
<ModalLink href="/users/create" prefetch="click">Create User</ModalLink>
<ModalLink href="/users/create" prefetch="mount">Create User</ModalLink>
<ModalLink href="/users/create" :prefetch="['hover', 'click']">Create User</ModalLink>
<ModalLink href="/users/create" :prefetch="true">Create User</ModalLink> <!-- same as "hover" -->
<ModalLink href="/users/create" prefetch="hover" :cache-for="60000">Create User</ModalLink>
```

Programmatic prefetch:
```js
import { prefetch } from '@inertiaui/modal-vue' // or modal-react
prefetch('/users/create')
```

#### Custom Tag / Component
```vue
<!-- Vue: render as button -->
<ModalLink href="/users/create" as="button">Create User</ModalLink>

<!-- Vue: render as custom component -->
<ModalLink href="/users/create" :as="MyCustomButton">Create User</ModalLink>
```

#### Loading State
```vue
<!-- Vue -->
<ModalLink #default="{ loading }">
    {{ loading ? 'Loading...' : 'Open Modal' }}
</ModalLink>
```

```jsx
// React
<ModalLink>
    {({ loading }) => (
        <span>{loading ? 'Loading...' : 'Open Modal'}</span>
    )}
</ModalLink>
```

#### ModalLink Events
- `@start` / `onStart` — request started
- `@success` / `onSuccess` — modal fetched and opened
- `@error` / `onError` — request failed
- `@close` / `onClose` — modal closed
- `@after-leave` / `onAfterLeave` — modal removed from DOM
- `@prefetching` / `onPrefetching` — prefetch started
- `@prefetched` / `onPrefetched` — prefetch completed

### `Modal` Component

Basic usage:
```vue
<!-- Vue -->
<Modal>
    <h1>Create User</h1>
    <form><!-- ... --></form>
</Modal>
```

```jsx
// React
<Modal>
    <h1>Create User</h1>
    <form>{/* ... */}</form>
</Modal>
```

#### Slot Props / Render Props
```vue
<!-- Vue -->
<Modal v-slot="{ close, reload, emit, getParentModal, getChildModal }">
    <button @click="close">Close</button>
    <button @click="reload({ only: ['users'] })">Refresh</button>
    <button @click="emit('userCreated', user)">Save</button>
</Modal>
```

```jsx
// React
<Modal>
    {({ close, reload, emit, getParentModal, getChildModal }) => (
        <>
            <button onClick={close}>Close</button>
            <button onClick={() => reload({ only: ['users'] })}>Refresh</button>
            <button onClick={() => emit('userCreated', user)}>Save</button>
        </>
    )}
</Modal>
```

#### Modal Events
- `@after-leave` / `onAfterLeave` — removed from DOM
- `@blur` / `onBlur` — lost focus (another modal opened on top)
- `@close` / `onClose` — modal closed
- `@focus` / `onFocus` — gained focus (modal on top closed)
- `@success` / `onSuccess` — modal fetched and opened

#### Using Refs
```vue
<!-- Vue -->
<script setup>
const modalRef = ref(null);
function closeModal() { modalRef.value.close(); }
function reloadData() { modalRef.value.reload({ only: ['users'] }); }
function emitEvent() { modalRef.value.emit('userCreated', user); }
</script>
<template>
    <Modal ref="modalRef"><!-- ... --></Modal>
</template>
```

```jsx
// React
const modalRef = useRef(null);
function closeModal() { modalRef.current.close(); }
<Modal ref={modalRef}>{/* ... */}</Modal>
```

### `HeadlessModal` Component

For building custom modal UIs. Provides all modal functionality without default styling.

Available props/slot props:
- `afterLeave` — function to call after leave transition
- `close` — function to close the modal
- `config` — configuration passed to the modal
- `emit` — function to emit an event
- `getChildModal` — function to get first child modal
- `getParentModal` — function to get parent modal
- `id` — modal's unique ID
- `index` — modal stack index
- `isOpen` — boolean, is modal open
- `modalContext` — object with all props
- `onTopOfStack` — boolean, is modal on top
- `reload` — function to reload props
- `setOpen` — function to toggle open state
- `shouldRender` — boolean, should modal render content

### `useModal` Hook / Composable

Access modal context from child components:
```vue
<!-- Vue -->
<script setup>
import { useModal } from '@inertiaui/modal-vue'
const { props, close, reload, emit } = useModal()
</script>
```

```jsx
// React
import { useModal } from '@inertiaui/modal-react'
const { props, close, reload, emit } = useModal()
```

### `Deferred` Component

Import from modal package (not Inertia) when used inside modals:
```vue
<!-- Vue -->
<script setup>
import { Deferred, Modal } from '@inertiaui/modal-vue'
</script>
<template>
    <Modal>
        <Deferred data="lines">
            <template #fallback>Loading...</template>
            <InvoiceLines :lines="lines" />
        </Deferred>
    </Modal>
</template>
```

```jsx
// React
import { Deferred, Modal } from '@inertiaui/modal-react'
<Modal>
    <Deferred data="lines" fallback={<p>Loading...</p>}>
        <InvoiceLines lines={lines} />
    </Deferred>
</Modal>
```

### `WhenVisible` Component

Import from modal package when used inside modals:
```vue
<!-- Vue -->
import { WhenVisible, Modal } from '@inertiaui/modal-vue'
<Modal>
    <WhenVisible data="customer">
        <template #fallback>Loading...</template>
        <CustomerComponent :customer="customer" />
    </WhenVisible>
</Modal>
```

## Programmatic Usage

### `visitModal`
```js
// Vue — standalone function
import { visitModal } from '@inertiaui/modal-vue'
visitModal('/users/create')

// React — from useModalStack hook
import { useModalStack } from '@inertiaui/modal-react'
const { visitModal } = useModalStack()
visitModal('/users/create')
```

Options:
```js
visitModal('/users/create', {
    method: 'post',
    navigate: true,
    data: { default_name: 'John Doe' },
    headers: { 'X-Header': 'Value' },
    config: {
        slideover: true,
    },
    listeners: {
        userCreated(user) { console.log(user) }
    },
    onStart: () => {},
    onSuccess: () => {},
    onError: () => {},
    onClose: () => {},
    onAfterLeave: () => {},
    queryStringArrayFormat: 'brackets', // or 'indices'
})
```

### Local Modals
Open without a server request using `#` prefix:
```vue
<!-- Vue -->
<ModalLink href="#confirm-action">Perform Action</ModalLink>
<Modal name="confirm-action"><!-- ... --></Modal>
```

Pass props to local modals:
```js
visitModal('#confirm-action', {
    props: { message: 'Are you sure?', itemId: 123 }
})
```

Access in modal slot:
```vue
<Modal name="confirm-action" v-slot="{ message, itemId }">
    <p>{{ message }}</p>
</Modal>
```

## Reload Props

```js
// Reload all
reload()

// Reload specific
reload({ only: ['permissions'] })
reload({ except: ['roles'] })

// With data and headers
reload({ data: { email: 'test@example.com' } })
reload({ headers: { 'X-Custom': 'value' } })

// With lifecycle events
reload({
    only: ['permissions'],
    onStart: () => {},
    onSuccess: (response) => {},
    onError: (error) => {},
    onFinish: () => {},
})
```

## Event Bus

### Emitting Events
```vue
<!-- Vue (from modal) -->
<Modal #default="{ emit }">
    <button @click="emit('increaseBy', 1)">Increase</button>
</Modal>
```

### Listening to Events
```vue
<!-- Vue (on ModalLink) -->
<ModalLink href="/modal" @increase-by="handleIncrease">Open</ModalLink>
```

```jsx
// React (on ModalLink)
<ModalLink href="/modal" onIncreaseBy={handleIncrease}>Open</ModalLink>
```

### Programmatic Listeners
```js
visitModal('/users/create', {
    listeners: {
        increaseBy(amount) { console.log(amount) }
    }
})
```

## Nested / Stacked Modals

Just use `ModalLink` inside a `Modal` — it automatically stacks:
```vue
<Modal>
    <ModalLink href="/modal-2">Open Modal 2</ModalLink>
</Modal>
```

### Communicating Between Modals
```vue
<!-- Child modal -->
<Modal #default="{ getParentModal }">
    <button @click="getParentModal().emit('message', 'Hello')">
        Send to parent
    </button>
</Modal>

<!-- Parent modal -->
<Modal @message="handleMessage"><!-- ... --></Modal>
```

### Form Submissions in Nested Modals
Use Axios (not Inertia router) to avoid closing all modals:
```js
Axios.post('/submit-form', data).then(() => {
    modalRef.value.close() // closes only current modal
})
```

## Configuration

### Global Config
```js
import { putConfig, getConfig, resetConfig } from '@inertiaui/modal-vue'

putConfig({ modal: { closeButton: false } })
putConfig('modal.closeButton', false) // dot notation

const value = getConfig('modal.maxWidth')
const all = getConfig() // entire config

resetConfig() // reset to defaults
```

### All Options

| Option | Default | Description |
|--------|---------|-------------|
| `type` | `'modal'` | `'modal'` or `'slideover'` |
| `navigate` | `false` | Use browser history for modal URLs |
| `useNativeDialog` | `true` | Use native `<dialog>` element |
| `appElement` | `'#app'` | Selector for aria-hidden when modal opens. Set to `null` to disable |
| `modal.closeButton` | `true` | Show close button |
| `modal.closeExplicitly` | `false` | Disable both backdrop click and Esc |
| `modal.closeOnClickOutside` | `true` | Close on backdrop click |
| `modal.maxWidth` | `'2xl'` | Max width: `sm` `md` `lg` `xl` `2xl` `3xl` `4xl` `5xl` `6xl` `7xl` |
| `modal.paddingClasses` | `'p-4 sm:p-6'` | Padding CSS classes |
| `modal.panelClasses` | `'bg-white rounded'` | Panel CSS classes |
| `modal.position` | `'center'` | Position: `bottom` `center` `top` |
| `slideover.closeButton` | `true` | Show close button |
| `slideover.closeExplicitly` | `false` | Disable both backdrop click and Esc |
| `slideover.closeOnClickOutside` | `true` | Close on backdrop click |
| `slideover.maxWidth` | `'md'` | Max width |
| `slideover.paddingClasses` | `'p-4 sm:p-6'` | Padding CSS classes |
| `slideover.panelClasses` | `'bg-white min-h-screen'` | Panel CSS classes |
| `slideover.position` | `'right'` | Position: `left` `right` |

## Styling

### CSS Classes
All classes are prefixed with `im-`:

| Class | Description |
|-------|-------------|
| `im-dialog` | The dialog element |
| `im-close-button` | Close button |
| `im-backdrop` | Backdrop (only when `useNativeDialog: false`) |
| `im-modal-container` | Screen-filling modal container |
| `im-modal-positioner` | Vertical position container |
| `im-modal-wrapper` | Max-width container |
| `im-modal-content` | Modal content |
| `im-slideover-container` | Screen-filling slideover container |
| `im-slideover-positioner` | Vertical position container |
| `im-slideover-wrapper` | Max-width container |
| `im-slideover-content` | Slideover content |

### Native Dialog Backdrop
When `useNativeDialog: true` (default), style the backdrop with CSS:
```css
dialog.im-dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
}
```
Tailwind CSS cannot target `::backdrop` — use plain CSS.

## Custom App Mounting

For more control, use `ModalRoot`/`ModalStackProvider` and `initFromPageProps` directly:

### React
```jsx
import { ModalStackProvider, initFromPageProps, setPageLayout } from '@inertiaui/modal-react'

// Layout component
function ModalLayout({ children }) {
    return <>{children}<ModalRoot /></>
}

createInertiaApp({
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx'))
        .then(setPageLayout(ModalLayout)),
    setup({ el, App, props }) {
        const root = createRoot(el);
        initFromPageProps(props)
        root.render(
            <ModalStackProvider>
                <App {...props} />
            </ModalStackProvider>
        );
    }
});
```

### Vue
```js
import { ModalRoot, initFromPageProps } from '@inertiaui/modal-vue'

createInertiaApp({
    setup({ el, App, props, plugin }) {
        initFromPageProps(props)
        createApp({ render: () => h(ModalRoot, () => h(App, props)) })
            .use(plugin)
            .mount(el)
    }
})
```

## TypeScript

Both packages include type definitions:
```ts
import type { ModalConfig, ModalTypeConfig, VisitOptions, ReloadOptions, PrefetchOption } from '@inertiaui/modal-vue'
// or from '@inertiaui/modal-react'
```

## Base Route / URL

### Backend
```php
return Inertia::modal('EditUser', ['user' => $user])
    ->baseRoute('users.index');
    // or: ->baseUrl('/users');
```

### Frontend
```vue
<!-- Per-link -->
<ModalLink navigate href="/users/create">Create User</ModalLink>

<!-- Global -->
putConfig('navigate', true)
```
