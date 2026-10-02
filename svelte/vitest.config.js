import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vitest/config'

export default defineConfig({
    plugins: [svelte({ compilerOptions: { runes: true } })],
    test: {
        globals: true,
        environment: 'happy-dom',
    },
})
