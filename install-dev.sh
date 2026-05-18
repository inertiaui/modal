#! /bin/bash
set -e

cd "$(dirname "$0")"

# Install all workspace JS dependencies at the root (vue, react, demo-app)
rm -rf node_modules vue/node_modules react/node_modules demo-app/node_modules
pnpm install

# Prepare demo-app PHP side
cd demo-app
rm -rf vendor
rm -f composer.lock
composer install
if [ ! -f .env ]; then
    cp .env.example .env
fi

php artisan key:generate
touch database/database.sqlite
php artisan migrate:fresh --seed
