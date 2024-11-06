import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        eslintPlugin({
            fix: true,
            failOnError: false,
        }),
        vue(),
    ],

    build: {
        lib: {
            entry: [resolve(__dirname, 'src/inertiauiModal.js')],
            name: 'InertiaUIModal',
            fileName: 'inertiaui-modal',
        },
        rollupOptions: {
            external: ['@inertiajs/core', '@inertiajs/vue3', 'axios', 'vue'],
        },
    },
})
