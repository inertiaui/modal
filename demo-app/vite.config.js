import fs from 'fs'

import inertia from '@inertiajs/vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'
import dotenv from 'dotenv'
import laravel from 'laravel-vite-plugin'
import { defineConfig } from 'vite'

const env = dotenv.parse(fs.readFileSync('.env'))
const stack = env.APP_STACK === 'react' || env.APP_STACK === 'svelte' ? env.APP_STACK : 'vue'

const inputs = {
    vue: 'resources/js/app.js',
    react: 'resources/js/app.jsx',
    svelte: 'resources/js/app.svelte.js',
}

export default defineConfig({
    build: {
        minify: false,
    },

    resolve: {
        dedupe: ['@inertiajs/react', '@inertiajs/svelte', '@inertiajs/vue3', 'vue', 'react', 'react-dom', 'svelte'],
        alias: {
            '@inertiaui/modal-react': '/../react',
            '@inertiaui/modal-svelte': '/../svelte',
            '@inertiaui/modal-vue': '/../vue',
        },
    },

    plugins: [
        laravel({
            input: inputs[stack],
            refresh: true,
        }),
        inertia(),
        stack === 'react'
            ? react()
            : stack === 'svelte'
              ? svelte()
              : vue({
                    template: {
                        transformAssetUrls: {
                            base: null,
                            includeAbsolute: false,
                        },
                    },
                }),
        tailwindcss(),
    ],
})
