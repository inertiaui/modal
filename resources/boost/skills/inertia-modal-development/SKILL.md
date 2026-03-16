---
name: inertia-modal-development
description: Build and work with inertiaui/modal features including opening routes in modals/slideovers, configuring modal behavior, prefetching, local modals, nested modals, event communication, and headless mode. Supports both React and Vue.
license: MIT
metadata:
  author: Inertia UI
---

# Inertia Modal Development

## Overview
Use inertiaui/modal to open any Laravel route in a Modal or Slideover without modifying existing routes or controllers. Works with both React and Vue, supports nested modals, prefetching, local modals, headless mode, and TypeScript.

## When to Activate
- Activate when working with modals or slideovers in a Laravel + Inertia.js application.
- Activate when code references `ModalLink`, `Modal`, `HeadlessModal`, `ModalRoot`, `useModal`, `useModalStack`, `visitModal`, or `Inertia::modal()`.
- Activate when the user wants to open a route in a modal, configure modal behavior, use prefetching, set up nested modals, or communicate between modals.
- Activate when imports reference `@inertiaui/modal-vue` or `@inertiaui/modal-react`.

## Scope
- In scope: modal routes, ModalLink, Modal component, configuration, prefetching, local modals, nested modals, event bus, reload props, deferred props, headless mode, base route/URL, styling.
- Out of scope: general Inertia.js routing without modals, non-Laravel backends.

## Workflow
1. Identify the task (opening a modal, configuring behavior, setting up communication, etc.).
2. Read `references/inertia-modal-guide.md` and focus on the relevant section.
3. Apply the patterns from the reference, using the correct framework (React or Vue).

## Core Concepts

### Backend: Opening a Route as a Modal
Use `Inertia::modal()` instead of `Inertia::render()` in your controller:

```php
return Inertia::modal('EditUser', [
    'user' => $user,
    'roles' => Role::pluck('name', 'id'),
]);
```

With a base route (enables URL changes and browser history):
```php
return Inertia::modal('EditUser', ['user' => $user])
    ->baseRoute('users.index');
```

### Frontend: App Setup
Use `renderApp` in your `app.js`/`app.jsx`:

```js
// Vue
import { renderApp } from '@inertiaui/modal-vue'
createInertiaApp({
    setup({ el, App, props, plugin }) {
        createApp({ render: renderApp(App, props) })
            .use(plugin)
            .mount(el)
    }
})

// React
import { renderApp } from '@inertiaui/modal-react'
createInertiaApp({
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(renderApp(App, props));
    }
});
```

### Frontend: ModalLink Component
```vue
<!-- Vue -->
<ModalLink href="/users/create">Create User</ModalLink>
```

```jsx
// React
<ModalLink href="/users/create">Create User</ModalLink>
```

### Frontend: Modal Component
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

### Programmatic Usage
```js
// Vue
import { visitModal } from '@inertiaui/modal-vue'
visitModal('/users/create')

// React
const { visitModal } = useModalStack()
visitModal('/users/create')
```

### Configuration
```js
import { putConfig } from '@inertiaui/modal-vue' // or modal-react

putConfig({
    type: 'modal',
    navigate: false,
    useNativeDialog: true,
    appElement: '#app',
    modal: {
        closeButton: true,
        closeExplicitly: false,
        closeOnClickOutside: true,
        maxWidth: '2xl',
        paddingClasses: 'p-4 sm:p-6',
        panelClasses: 'bg-white rounded',
        position: 'center',
    },
    slideover: {
        closeButton: true,
        closeExplicitly: false,
        closeOnClickOutside: true,
        maxWidth: 'md',
        paddingClasses: 'p-4 sm:p-6',
        panelClasses: 'bg-white min-h-screen',
        position: 'right',
    },
})
```

## Do and Don't

Do:
- Always use `Inertia::modal()` (not `Inertia::render()`) when opening routes as modals.
- Always call `renderApp` or set up `ModalRoot`/`ModalStackProvider` in your app entry point.
- Use the `navigate` prop on `ModalLink` (or global config) when you want URL changes and browser history.
- Use `closeOnClickOutside` to disable only backdrop clicks; use `closeExplicitly` to disable both backdrop clicks and Esc key.
- Use Axios for form submissions in nested modals to avoid closing the entire stack.
- Import `Deferred` and `WhenVisible` from the modal package (not Inertia) when used inside modals.

Don't:
- Don't forget to set up the `renderApp` helper or `ModalRoot` component — modals won't work without it.
- Don't use `Inertia::render()` for modal routes — use `Inertia::modal()`.
- Don't use `router.post()` (Inertia router) in nested modals — it navigates to the base route and closes all modals. Use Axios instead.
- Don't import `Deferred` or `WhenVisible` from `@inertiajs/vue3` or `@inertiajs/react` when inside a modal — use the modal package's versions.
- Don't reference conversion names in `closeOnClickOutside` and `closeExplicitly` together — `closeExplicitly` supersedes `closeOnClickOutside`.

## References
- `references/inertia-modal-guide.md`
