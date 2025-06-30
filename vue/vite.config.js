import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        eslintPlugin({
            fix: true,
            failOnError: false,
        }),
    ],

    build: {
        lib: {
            entry: [resolve(__dirname, 'src/inertiauiModal.ts')],
            name: 'InertiaUIModal',
            fileName: 'inertiaui-modal',
            cssFileName: 'style',
        },
        rollupOptions: {
            external: ['@inertiajs/core', '@inertiajs/vue3', 'axios', 'vue'],
        },
    },
    
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
})
