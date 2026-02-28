<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Scripts -->
        @routes

        @if(config('app.stack') === 'react')
            @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @else
            @vite(['resources/js/app.js', "resources/js/Pages/{$page['component']}.vue"])
        @endif

        @inertiaHead

        @if(app()->environment('testing'))
            <style>
                *[class*="duration-"] {
                    transition-duration: 0ms !important;
                }
            </style>
        @endif
    </head>

    <body class="font-sans antialiased dark:bg-gray-950 dark:text-white bg-gray-100">
        <p class="text-xs">
            {{ config('app.stack') === 'react' ? 'React stack' : 'Vue stack' }}
        </p>

        @inertia
    </body>
</html>
