import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';

import fs from 'fs';
import dotenv from 'dotenv';
const env = dotenv.parse(fs.readFileSync('.env'));
const reactStack = env.APP_STACK === 'react';
const packagesAreInstalled = fs.existsSync('node_modules/@inertiaui/modal-react') && fs.existsSync('node_modules/@inertiaui/modal-vue');

export default defineConfig({
    resolve: packagesAreInstalled ? {} : {
        dedupe: ['@inertiajs/react', '@inertiajs/vue3', 'axios'],
        alias: {
            '@inertiaui/modal-react': '/../react',
            '@inertiaui/modal-vue': '/../vue'
        }
    },

    plugins: [
        laravel({
            input: reactStack ? 'resources/js/app.jsx' : 'resources/js/app.js',
            refresh: true,
        }),
        reactStack ? react() : vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
});
