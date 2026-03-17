#!/bin/bash
set -e
cd "$(dirname "$0")/.."
cd demo-app
composer require inertiajs/inertia-laravel:^1.3 -W --no-interaction
npm install @inertiajs/react@1.3.0 @inertiajs/vue3@1.3.0
