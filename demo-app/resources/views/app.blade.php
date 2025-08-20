<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Scripts -->
        @routes

        @if(config('app.stack') === 'react')
            @viteReactRefresh
            @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @elseif(config('app.stack') === 'svelte')
            @vite(['resources/js/app-svelte.js', "resources/js/Pages/{$page['component']}.svelte"])
        @else
            @vite(['resources/js/app.js', "resources/js/Pages/{$page['component']}.vue"])
        @endif

        @inertiaHead
    </head>

    <body class="font-sans antialiased dark:bg-gray-950 dark:text-white bg-gray-100">
        <p class="text-xs">
            @if(config('app.stack') === 'react')
              React stack
            @elseif(config('app.stack') === 'svelte')
              Svelte stack
            @else
              Vue stack
            @endif
        </p>

        @inertia
    </body>
</html>
