#!/bin/bash
set -e
cd "$(dirname "$0")/.."
cd demo-app
composer require inertiajs/inertia-laravel:^3.0 -W --no-interaction
npm install @inertiajs/react@3.0.0-beta.3 @inertiajs/vue3@3.0.0-beta.3
