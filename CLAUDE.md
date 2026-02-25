# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important Rules

- **Never close GitHub issues** - Only the maintainer closes issues
- **Never comment on GitHub issues on behalf of the maintainer** - Do not use `gh issue comment` or similar commands
- **One fix per commit** - Each commit should only address one issue. Multiple commits per fix is fine, but do not bundle multiple issue fixes into a single commit. This allows tracking which commits relate to which issues.
- **Verify bugfix tests fail without the fix** - When adding E2E tests for bugfixes, verify that the tests actually fail without the fix by temporarily reverting the fix and running the test. This ensures the test is actually testing the fix and not just passing coincidentally.
- **Re-read GitHub issue after fixing** - After completing a fix, re-read the original GitHub issue to verify the fix addresses the reported problem and we haven't lost track of the actual issue.

## Allowed Commands

The following commands can be run without asking for permission:

- `php artisan serve` - Start the Laravel development server (can run in background when needed for browser tests)
- `cd react && npm run dev` - Start React package Vite dev server (watch mode)
- `cd vue && npm run dev` - Start Vue package Vite dev server (watch mode)
- `cd demo-app && npm run dev` - Start demo app Vite dev server (watch mode)

### Development Servers

**IMPORTANT**: When dev servers are running, do NOT run `npm run build` - Vite watches for changes and rebuilds automatically.

For active development, spin up these servers in background (hot reloading, no manual rebuilds needed):

```bash
cd react && npm run dev      # React dev server
cd vue && npm run dev        # Vue dev server
cd demo-app && npm run dev   # demo-app Vite dev server
cd demo-app && php artisan serve  # demo-app Laravel server
```

Then use the switch scripts to change frameworks:

```bash
cd demo-app
./switch-demo-to-react.sh   # Switch to React
./switch-demo-to-vue.sh     # Switch to Vue
```

Changes to React/Vue source will automatically rebuild and the demo-app will pick them up.

## Project Overview

Inertia Modal is a Laravel package that enables opening any route in a Modal or Slideover without modifying existing routes or controllers. It's part of the Inertia UI suite and supports both React and Vue 3 frontends.

- **Documentation**: <https://inertiaui.com/inertia-modal/docs>
- **Published Packages**:
  - PHP: `inertiaui/modal` (Composer)
  - React: `@inertiaui/modal-react` (NPM)
  - Vue: `@inertiaui/modal-vue` (NPM)

## Repository Structure

This is a monorepo with three main components:

- `/src` - PHP Laravel package source (published to Composer)
- `/react` - React implementation (published to NPM as separate package)
- `/vue` - Vue 3 implementation (published to NPM as separate package)
- `/demo-app` - Full Laravel application for testing/development with Dusk tests
- `/docs` - Documentation files (not published)

## Commands

### PHP Development

```bash
# Run static analysis
composer analyse

# Format code
composer format

# Refactor code with Rector
composer refactor

# Run all checks (analyse + refactor + format + eslint)
composer all
```

### Frontend Development

```bash
# Lint React code
composer eslint-react
# Or: cd react && npm run eslint

# Lint Vue code
composer eslint-vue
# Or: cd vue && npm run eslint

# Build React package
cd react && npm run build

# Build Vue package
cd vue && npm run build

# Watch mode for development
cd react && npm run dev
cd vue && npm run dev

# Run Vue tests
cd vue && npm run test
```

### Build & Release

```bash
# Build everything (all checks + both frontends)
composer build

# Update all dependencies (PHP, React, Vue, demo-app)
composer update-all

# Version bump (sets version in React/Vue packages, rebuilds)
composer version -- 1.0.0-beta-6
```

### Demo App Development

The demo app is a full Laravel application for manual testing and browser tests:

```bash
cd demo-app

# Install/update dependencies
composer install && npm install

# Run development server
php artisan serve

# Build frontend assets
npm run dev

# Run all tests (unit + browser)
./vendor/bin/pest

# Run only browser tests
./vendor/bin/pest tests/Browser

# Update demo app dependencies
composer update && npm upgrade
```

### CI Monitoring

After pushing changes, monitor the CI workflow with GitHub CLI:

```bash
# Watch CI run in real-time
gh run watch

# List recent workflow runs
gh run list

# View specific run details
gh run view <run-id>

# View failed job logs
gh run view <run-id> --log-failed

# View failed logs and search for specific errors
gh run view <run-id> --log-failed 2>&1 | grep -A 20 "FAILED"
```

### Git Commit Guidelines

- **Always create new commits** instead of amending existing ones. This preserves history and makes it easier to track changes.
- Never use `git commit --amend` or `git push --force` unless explicitly requested.
- **Use one-liner commit messages** - keep them short and simple, no multi-line descriptions.
- **Commit as @pascalbaljet** - never add Co-Authored-By headers or similar.
- **Run tests locally before committing** - ensure browser tests pass for both React and Vue stacks before pushing.

## Architecture Overview

### How Modals Work

The modal system uses a **dual-request pattern**:

1. **User triggers modal** via `ModalLink` or `visitModal()` call
2. **Frontend makes request** with special headers:
   - `X-InertiaUI-Modal`: Unique modal ID
   - `X-InertiaUI-Modal-Base-Url`: Background page URL
3. **Backend returns modal response** via `Inertia::modal('Component', $props)`
4. **Modal class orchestrates two requests**:
   - Renders the modal component
   - Makes internal subrequest to base URL (background page)
   - Combines both responses
5. **Frontend receives combined data** and adds modal to stack

### Base URL Concept

The "base URL" is the page that renders behind the modal:

- **First modal**: Uses current page as base
- **Nested modals**: Inherit parent's base URL
- **On close**: Returns to base URL (not previous modal)
- This creates consistent back-navigation regardless of modal depth

### Backend Architecture (PHP)

**Core Classes** (`/src`):

- **`Modal`** - Main entry point implementing `Responsable`. Called via `Inertia::modal()` macro. Orchestrates the dual-request pattern and header communication.

- **`DispatchBaseUrlRequest`** - Internal subrequest dispatcher. Makes HTTP request to base URL, strips middleware that shouldn't run twice (e.g., cookie encryption), returns base page props.

- **`ModalConfig`** - Fluent builder for modal configuration (type, position, styling, close behavior).

- **`ModalVisit`** - Fluent builder for modal visit options (method, navigate mode, data, headers, config).

- **`Redirector`** - Extends Laravel's redirector to make `back()` respect modal base URLs. Enable via config: `inertiaui-modal.bind_extended_redirector`.

- **`ModalServiceProvider`** - Registers `Inertia::modal()` macro, optionally replaces redirector, hooks into Inertia response serialization.

**Enums**: `ModalType` (Modal/Slideover), `ModalPosition`, `QueryStringArrayFormat`

**Helpers** (`src/helpers.php`):

- `back_from_modal()` - Redirects to modal base URL if in modal context

### Frontend Architecture (React & Vue)

Both implementations are parallel - same functionality, different framework patterns.

**Modal Stack Pattern**:

- Single ordered array holds all active modals
- New modals pushed to end (FIFO)
- Only top modal is interactive (`onTopOfStack` flag)
- Parent-child relationships queryable via `getParentModal()`, `getChildModal()`

**React Key Files** (`/react/src`):

- **`ModalRoot.jsx`** / **`ModalStackProvider`** - Context provider managing modal stack. Listens to router events, intercepts Axios responses, creates modals from server data.

- **`Modal` class** (JavaScript class, not component) - Manages individual modal state (open/closed, shouldRender). Methods: `show()`, `close()`, `reload()`, `emit()`, `on()`, `off()`.

- **`Modal.jsx`** component - Modal wrapper with portal, backdrop, and transitions. Renders either `ModalContent` or `SlideoverContent` based on config.

- **`HeadlessModal.jsx`** - Core modal logic and lifecycle. Handles config merging, event system, local modal registration, deferred props.

- **`ModalLink.jsx`** - Component for clickable links that open modals. Separates DOM events from modal lifecycle callbacks.

- **`useModal()` hook** - Returns current modal context for components rendered inside modals. Access to `close()`, `reload()`, `emit()`, parent/child modals, etc.

**Vue Differences** (`/vue/src`):

- **`modalStack.js`** - Composable (not context provider) managing stack state
- **`useModalStack()`** - Returns object with methods instead of context value
- Uses Vue `ref()` and `computed()` for reactivity
- `markRaw()` prevents unnecessary component reactivity
- `ModalRoot.vue` is wrapper around `ModalRenderer.vue`

**Configuration Flow**:

1. Backend sets initial config via `ModalConfig` builder
2. Frontend merges: props > ModalLink attributes > global config (`getConfig()`)
3. Result applied to modal wrapper component

**Event System**:

- Modals can emit/listen to custom events
- Props with `on` prefix auto-register as listeners (kebab-cased: `onRefreshKey` → `refresh-key`)
- Used for parent-child modal communication

### Request/Response Headers

**Request Headers** (Frontend → Backend):

```
X-InertiaUI-Modal: {unique-modal-id}
X-InertiaUI-Modal-Base-Url: https://example.com/users
```

**Response** (Backend → Frontend):

```json
{
  "component": "EditUser",
  "props": {
    "user": {...},
    "_inertiaui_modal": {
      "id": "{modal-id}",
      "baseUrl": "https://example.com/users"
    }
  },
  "url": "/users/123/edit"
}
```

### Deferred Props Pattern

Modals support Inertia's deferred props:

1. Backend includes deferred prop names in response meta
2. Frontend tracks via `meta.deferredProps`
3. Modal calls `reload()` with partial headers to fetch deferred props
4. Props updated without recreating modal

## Code Patterns & Conventions

### Backend Controller Pattern

```php
// Simple modal
return Inertia::modal('EditUser', ['user' => $user]);

// With base URL
return Inertia::modal('EditUser', ['user' => $user])
    ->baseRoute('users.index');

// With config
return Inertia::modal('EditUser', ['user' => $user])
    ->maxWidth('2xl')
    ->position('center')
    ->slideover();

// Using back_from_modal() helper
return Inertia::modal('EditUser', [...])
    ->baseUrl(back_from_modal() ? route('users.index') : null);
```

### React Usage Pattern

```jsx
// Wrap app with provider
<ModalStackProvider>
  <App {...props} />
</ModalStackProvider>

// Link component
<ModalLink href="/users/123/edit" maxWidth="2xl">
  Edit User
</ModalLink>

// Programmatic visit
const { visitModal } = useModalStack()
visitModal('/users/123/edit', { maxWidth: '2xl' })

// Inside modal component
const modal = useModal()
modal.close()
modal.reload({ only: ['user'] })
modal.emit('user-updated')
```

### Vue Usage Pattern

```vue
<!-- Wrap app -->
<ModalRoot>
  <App v-bind="$page.props" />
</ModalRoot>

<!-- Link component -->
<ModalLink href="/users/123/edit" max-width="2xl">
  Edit User
</ModalLink>

<!-- Programmatic visit -->
<script setup>
const { visitModal } = useModalStack()
visitModal('/users/123/edit', { maxWidth: '2xl' })

// Inside modal component
const modal = useModal()
modal.close()
modal.reload({ only: ['user'] })
modal.emit('user-updated')
</script>
```

## Important Implementation Details

### Middleware Exclusion

Base URL subrequests exclude cookie encryption middleware to prevent double-encryption:

```php
Modal::excludeMiddlewareOnBaseUrl([
    \Illuminate\Cookie\Middleware\EncryptCookies::class,
])
```

Cookies are already encrypted in original request, so subrequest must skip this middleware.

### Navigate vs XHR Mode

Two modes for modal requests:

1. **XHR Mode** (default): Makes Axios request, dual-request pattern runs, base page renders behind modal
2. **Navigate Mode**: Uses Inertia router for first modal only, subsequent modals use XHR

Set globally via `putConfig({ navigate: true })` or per-visit via `ModalLink` prop.

### Modal Stack Lifecycle

```
User opens Modal A
  → Stack: [A]
  → A is on top, interactive

User opens Modal B from A
  → Stack: [A, B]
  → B is on top, A becomes non-interactive

User closes B
  → Stack: [A]
  → A becomes interactive again
  → No navigation to base URL yet

User closes A
  → Stack: []
  → Navigate to base URL
```

### Local vs Remote Modals

- **Remote modals**: Fetched from backend (standard flow)
- **Local modals**: Registered in frontend via `registerLocalModal('name', Component)`, no backend request needed

### Shared Dialog Utilities (`@inertiaui/vanilla`)

Both React and Vue implementations use framework-agnostic dialog utilities from the `@inertiaui/vanilla` package. This package lives at `/Users/pascalbaljet/Sites/vanilla` (outside this repo) and contains **only generic utilities** that can be shared across all InertiaUI packages (modal, form, table, etc.):

- **Helper utilities**: `generateId`, `except`, `only`, `rejectNullValues`, `kebabCase`, `isStandardDomEvent`, `sameUrlPath`
- **Dialog utilities**: `lockScroll`, `unlockScroll`, `createFocusTrap`, `onEscapeKey`, `onClickOutside`, `markAriaHidden`, `onTransitionEnd`, `createDialog`

**Important**: Do NOT put modal-specific code in vanilla (like `ModalConfig`, `maxWidthClasses`, etc.). Those belong in the modal packages. The vanilla package is for generic, framework-agnostic utilities only.

All dialog utilities return cleanup functions for proper teardown.

### Backdrop Behavior

Only **one backdrop** is ever rendered, by the first modal in the stack (index === 0). It stays visible as long as that modal is open, regardless of how many modals are stacked on top. Stacked modals do not render their own backdrops.

### No External UI Library Dependencies

The frontend packages have no external UI library dependencies. Focus trapping, scroll locking, transitions, and accessibility are implemented natively using the shared dialog utilities.

### TypeScript Support

Currently no TypeScript definitions included. React uses JSX, Vue uses single-file components. PHP uses strict types throughout.

## Testing

### PHP Tests

No PHPUnit tests in main package (testing via demo app Dusk tests).

Static analysis via PHPStan (Level 5):

```bash
composer analyse
```

### Vue Tests

Vitest tests available:

```bash
cd vue && npm run test
```

### Pest Browser Tests

End-to-end browser tests using Pest Browser Testing (Playwright) in demo app:

```bash
cd demo-app && ./vendor/bin/pest tests/Browser
```

Helper functions are defined in `tests/Pest.php`.

#### Debugging Browser Tests

Use a dedicated `tests/Browser/DebugTest.php` file for debugging:

```php
<?php

use App\Models\User;

it('debugs modal stack', function () {
    $firstUser = User::orderBy('name')->first();

    $page = visit("/users/{$firstUser->id}/edit")
        ->assertPresent('.im-modal-content');

    // Execute JavaScript to inspect DOM/state
    $debugInfo = $page->page()->evaluate('
        JSON.stringify({
            modals: Array.from(document.querySelectorAll(".im-dialog")).map(d => ({
                id: d.dataset.inertiauiModalId,
                index: d.dataset.inertiauiModalIndex
            })),
            // Access window globals set by your debug code
            navigateLog: window.__modalNavigateLog || []
        }, null, 2)
    ');

    echo "\n=== Debug Info ===\n" . $debugInfo . "\n";
});
```

To debug frontend code, add `window.__debugVar` assignments in Vue/React components, then read them via `$page->page()->evaluate()`.

## Configuration

Package config published to `config/inertiaui-modal.php`:

```php
return [
    // Replace Laravel's redirector to support back_from_modal()
    'bind_extended_redirector' => false,
];
```

Frontend global config:

```javascript
import { putConfig } from '@inertiaui/modal-react'

putConfig({
  navigate: false,
  type: 'modal',
  closeButton: true,
  closeExplicitly: false,
  maxWidth: '2xl',
  position: 'center',
})
```

## Development Workflow

1. Start dev servers (see Development Servers section above)
2. Make changes to PHP source (`/src`)
3. Make parallel changes to React (`/react/src`) and Vue (`/vue/src`)
4. Run linting and static analysis: `composer all`
5. Run browser tests: `cd demo-app && ./vendor/bin/pest tests/Browser`
6. For release: `composer build` then `composer version -- X.Y.Z`

## Key Files to Understand

**Backend:**

- `src/Modal.php` - Core modal response logic
- `src/ModalServiceProvider.php` - Laravel integration
- `src/DispatchBaseUrlRequest.php` - Base URL subrequest handling

**React:**

- `react/src/ModalRoot.jsx` - Stack management and router integration
- `react/src/HeadlessModal.jsx` - Modal lifecycle and state
- `react/src/useModal.js` - Hook for accessing modal context

**Vue:**

- `vue/src/modalStack.js` - Stack management composable
- `vue/src/HeadlessModal.vue` - Modal lifecycle and state
- `vue/src/useModal.js` - Composable for accessing modal context

## Package Publishing

The repo publishes to three separate registries:

1. **Composer** (`inertiaui/modal`): PHP source from `/src`
2. **NPM** (`@inertiaui/modal-react`): Built from `/react`, includes `/dist` and `/src`
3. **NPM** (`@inertiaui/modal-vue`): Built from `/vue`, includes `/dist` and `/src`

Version numbers are kept in sync via `composer version` script.

## Browser Automation

Use `agent-browser` for web automation. Run `agent-browser --help` for all commands.

Core workflow:

1. `agent-browser open <url>` - Navigate to page
2. `agent-browser snapshot -i` - Get interactive elements with refs (@e1, @e2)
3. `agent-browser click @e1` / `fill @e2 "text"` - Interact using refs
4. Re-snapshot after page changes
