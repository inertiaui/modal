import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'

export default defineConfig({
    plugins: [
        eslintPlugin({
            fix: true,
            failOnError: false,
        }),
        sveltekit(),
    ],

    build: {
        rollupOptions: {
            external: ['@inertiajs/core', '@inertiajs/svelte', 'axios', 'svelte'],
        },
    },
})
