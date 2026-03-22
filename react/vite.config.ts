import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [
        react({
            jsxRuntime: 'automatic',
        }),
        dts({
            insertTypesEntry: true,
            rollupTypes: false,
            include: ['src/**/*.ts', 'src/**/*.tsx'],
        }),
    ],
    define: {
        'process.env.NODE_ENV': '"production"',
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/inertiauiModal.ts'),
            name: 'InertiaUIModal',
            fileName: 'inertiaui-modal',
        },
        sourcemap: true,
        minify: false,
        rollupOptions: {
            external: [
                '@inertiajs/core',
                '@inertiajs/react',
                '@inertiaui/vanilla',
                'axios',
                'react',
                'react-dom',
                'react/jsx-runtime',
                'react/jsx-dev-runtime',
            ],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react/jsx-runtime': 'ReactJSXRuntime',
                    '@inertiajs/core': 'InertiaCore',
                    '@inertiajs/react': 'InertiaReact',
                    '@inertiaui/vanilla': 'InertiaUIVanilla',
                    axios: 'axios',
                },
            },
        },
    },
})
