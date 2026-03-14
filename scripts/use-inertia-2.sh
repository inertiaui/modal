#!/bin/bash
set -e
cd "$(dirname "$0")/.."
cd demo-app
composer require inertiajs/inertia-laravel:^2.0 -W --no-interaction
npm install @inertiajs/react@2.0.0 @inertiajs/vue3@2.0.0
