import './bootstrap'
import '../css/app.css'

import { createInertiaApp } from '@inertiajs/vue3'
import { ZiggyVue } from '../../vendor/tightenco/ziggy'
import { putConfig, withInertiaModal } from '@inertiaui/modal-vue'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

// Configure native dialog mode (defaults to true if not set)
if (import.meta.env.VITE_USE_NATIVE_DIALOG !== undefined) {
    putConfig({ useNativeDialog: import.meta.env.VITE_USE_NATIVE_DIALOG === 'true' })
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    progress: {
        color: '#4B5563',
    },
    withApp(app) {
        withInertiaModal(app)
        app.use(ZiggyVue)
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
