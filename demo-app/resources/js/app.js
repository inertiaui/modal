import './bootstrap'
import '../css/app.css'

import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { ZiggyVue } from '../../vendor/tightenco/ziggy'
import { putConfig, ModalRoot } from '@inertiaui/modal-vue'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(ModalRoot, () => h(App, props)) })
            .use(plugin)
            .use(ZiggyVue)
            .mount(el)
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