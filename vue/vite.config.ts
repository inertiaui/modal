import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [
        vue(),
        dts({
            insertTypesEntry: true,
            rollupTypes: true,
            include: ['src/**/*.ts', 'src/**/*.vue'],
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/inertiauiModal.ts'),
            name: 'InertiaUIModal',
            fileName: 'inertiaui-modal',
        },
        sourcemap: true,
        minify: true,
        rollupOptions: {
            external: ['@inertiajs/core', '@inertiajs/vue3', '@inertiaui/vanilla', 'axios', 'vue'],
            output: {
                globals: {
                    vue: 'Vue',
                    axios: 'axios',
                    '@inertiajs/core': 'InertiaCore',
                    '@inertiajs/vue3': 'InertiaVue3',
                    '@inertiaui/vanilla': 'InertiaUIVanilla',
                },
            },
        },
    },
})
