# AI-Assisted Coding

Use [Laravel Boost](https://laravel.com/ai/boost) when you want AI coding
agents to understand how Inertia Modal applications are built. The Composer
package ships a Boost skill with guidance for opening routes in modals and
slideovers, base routes and URLs, nested and stacked modals, prop loading,
event communication, and headless mode.

Laravel Boost installs an MCP server, project guidelines, and optional agent
skills into your application. It discovers the Inertia Modal skill from the
installed Composer package through Boost's
[third-party package skill](https://laravel.com/docs/13.x/boost#third-party-package-skills)
convention.

## Install Laravel Boost

Install Boost as a development dependency after installing `inertiaui/modal`.
Then select the agent integrations you use:

```bash
composer require laravel/boost --dev
php artisan boost:install
```

Applications that already used Boost before adding Inertia Modal should refresh
their generated resources and ask Boost to scan installed packages again:

```bash
php artisan boost:update --discover
```

Boost writes the selected agent files and MCP configuration for supported tools
such as Codex, Claude Code, Cursor, Gemini CLI, GitHub Copilot, and PhpStorm.
See the [Laravel Boost documentation](https://laravel.com/docs/13.x/boost) for
agent-specific setup.

::: info NPM-only installs
The skill ships inside the Composer package. If you installed only the frontend
package with npm, install `inertiaui/modal` with Composer as well to make the
skill available to Boost.
:::

## What the Skill Covers

The Inertia Modal skill gives agents concise package guidance for common
development tasks:

- Returning modal responses from existing controllers with `Inertia::modal()`.
- Opening routes with `ModalLink` and `visitModal()` in Vue and React.
- Configuring the base route or base URL so the background page stays correct.
- Building nested and stacked modals, and communicating between them with the event bus.
- Reloading, lazy, deferred, and load-when-visible props inside a modal.
- Registering local modals and using headless mode for custom modal markup.

Boost is optional and is not required at runtime. Your app works without it. The
skill only improves the context available to your coding agent.
