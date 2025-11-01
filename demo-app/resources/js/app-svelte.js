import './bootstrap'
import '../css/app.css'

import { createInertiaApp } from '@inertiajs/svelte'

import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { putConfig, renderApp } from '@inertiaui/modal-svelte'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.svelte`, import.meta.glob('./Pages/**/*.svelte')),
    setup({ el, App, props }) {
        renderApp(el, App, props)
    },
    progress: {
        color: '#4B5563',
    },
})

if(window.location.pathname === '/props-from-config') {
    putConfig({
        type: 'slideover',
        slideover: {
            closeButton: false,
            closeExplicitly: true,
            maxWidth: '2xl',
            paddingClasses: 'p-8',
            panelClasses: 'min-h-screen bg-red-100',
            position: 'left',
        }
    })
}
