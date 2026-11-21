# Upgrade Guide

This guide covers upgrading from Inertia Modal 2.x to version 3.x.

## Why a New Major Version?

Inertia Modal's major version is aligned with the Inertia.js version it supports:

| Inertia Modal | Inertia.js | Status |
|---------------|------------|--------|
| **3.x** | **v3** | **Current** |
| 2.x | v2 | Supported |
| 0.x | v1 | Unsupported |

A separate major version is needed because Inertia 3 replaced Axios with a built-in HTTP client, which required changes to how Inertia Modal intercepts and handles modal responses.

## Installation

Update the Composer package:

```bash
composer require inertiaui/modal:^3.0.0
```

If you originally installed the frontend package via NPM (instead of using the Composer symlink), update it as well:

::: code-group

```bash [Vue]
npm install @inertiaui/modal-vue@^3.0.0
```

```bash [React]
npm install @inertiaui/modal-react@^3.0.0
```

:::

If you're unsure which method you used, check the [Installation](/installation) docs for more details.

## Requirements Changes

Version 3.x has updated minimum requirements:

| Dependency | 2.x | 3.x |
|------------|-----|-----|
| PHP | 8.2+ | 8.2+ |
| Laravel | 11.11+ or 12+ | 12+ |
| Inertia Laravel | 2.0+ | 3.0+ |
| React | 19+ | 19+ |
| Vue | 3.4+ | 3.4+ |
| `@inertiajs/react` | 2.3.15+ | 3.0+ |
| `@inertiajs/vue3` | 2.3.15+ | 3.0+ |
| Tailwind CSS | 4+ (or 3.x with headless mode) | 4+ (or 3.x with headless mode) |

## No API Changes

The Inertia Modal API is unchanged. If your app already runs on Inertia Modal 2.x, upgrading to 3.x only requires updating the dependencies listed above. All components, hooks, composables, and configuration options work the same way.

## Breaking Changes Summary

1. **Inertia.js v2 is no longer supported** — upgrade to Inertia Laravel 3.0+ and `@inertiajs/react` or `@inertiajs/vue3` 3.0+
2. **Laravel 11 is no longer supported** — upgrade to Laravel 12+
