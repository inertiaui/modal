#! /bin/bash

# Prepare React Library for development
cd react
rm -rf node_modules
npm install

# Prepare Vue Library for development
cd ../vue
rm -rf node_modules
npm install

# Prepare Svelte Library for development
cd ../svelte
rm -rf node_modules
npm install

# Prepare demo app for development
cd ../demo-app
rm -rf node_modules
rm -rf vendor
rm composer.lock
npm install
composer install
if [ ! -f .env ]; then
    cp .env.example .env
fi

php artisan key:generate
php artisan dusk:chrome-driver --detect
touch database/database.sqlite
php artisan migrate:fresh --seed
