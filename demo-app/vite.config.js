import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';

import fs from 'fs';
import dotenv from 'dotenv';
const env = dotenv.parse(fs.readFileSync('.env'));
const reactStack = env.APP_STACK === 'react';

export default defineConfig({
    resolve: {
        dedupe: ['@inertiajs/react', '@inertiajs/vue3'],
        alias: {'inertiaui/modal': reactStack ? '/../react' : '/../vue'}
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
