import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        // eslintPlugin({
        //     fix: true,
        //     failOnError: false,
        // }),
        react(),
    ],

    build: {
        minify: process.env.NODE_ENV === 'production',
        lib: {
            entry: [resolve(__dirname, 'src/inertiauiModal.js')],
            name: 'InertiaUIModal',
            fileName: 'inertiaui-modal',
        },
        rollupOptions: {
            external: ['@inertiajs/core', '@inertiajs/react', 'axios', 'react', 'react-dom', 'react/jsx-runtime'],
        },
    },
})
