import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';
import { svelte } from '@sveltejs/vite-plugin-svelte';

import fs from 'fs';
import dotenv from 'dotenv';
const env = dotenv.parse(fs.readFileSync('.env'));
const packagesAreInstalled = fs.existsSync('node_modules/@inertiaui/modal-react') && fs.existsSync('node_modules/@inertiaui/modal-vue') && fs.existsSync('node_modules/@inertiaui/modal-svelte');

function stackPlugin() {
    switch(env.APP_STACK) {
        case 'vue':
            return vue({
                template: {
                    transformAssetUrls: {
                        base: null,
                        includeAbsolute: false,
                    },
                },
            })
        case 'svelte':
            return svelte()
        default:
            return react()
    }
}

function stackApp() {
    switch(env.APP_STACK) {
        case 'vue':
            return 'resources/js/app.js'
        case 'svelte':
            return 'resources/js/app-svelte.js'
        default:
            return 'resources/js/app.jsx'
    }
}

// NL: why are there aliases here
export default defineConfig({
    resolve: packagesAreInstalled ? {} : {
        dedupe: ['@inertiajs/react', '@inertiajs/vue3', '@inertiajs/svelte', 'axios'],
        alias: {
            '@inertiaui/modal-react': '/../react',
            '@inertiaui/modal-vue': '/../vue',
            '@inertiaui/modal-svelte': '/../svelte'
        }
    },

    plugins: [
        laravel({
            input: stackApp(),
            refresh: true,
        }),
        stackPlugin()
    ],
});
