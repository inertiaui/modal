import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
            rollupTypes: false,
            include: ['src/**/*.ts', 'src/**/*.tsx'],
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
            external: ['@inertiajs/core', '@inertiajs/react', '@inertiaui/vanilla', 'axios', 'react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    '@inertiajs/core': 'InertiaCore',
                    '@inertiajs/react': 'InertiaReact',
                    '@inertiaui/vanilla': 'InertiaUIVanilla',
                    axios: 'axios',
                },
            },
        },
    },
})
