#! /bin/bash

# Prepare React Library for development
cd react
npm install

# Prepare Vue Library for development
cd ../vue
npm install

# Prepare demo app for development
cd ../demo-app
npm install
composer install
if [ ! -f .env ]; then
    cp .env.example .env
fi

php artisan key:generate
touch database/database.sqlite
php artisan migrate:fresh --seed