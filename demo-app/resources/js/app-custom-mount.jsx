import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { putConfig, ModalStackProvider, initFromPageProps, setPageLayout } from '@inertiaui/modal-react'
import ModalLayout from './ModalLayout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Configure native dialog mode (defaults to true if not set)
if (import.meta.env.VITE_USE_NATIVE_DIALOG !== undefined) {
    putConfig({ useNativeDialog: import.meta.env.VITE_USE_NATIVE_DIALOG === 'true' })
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx'))
        .then(setPageLayout(ModalLayout)),
    setup({ el, App, props }) {
        const root = createRoot(el);

        initFromPageProps(props);

        root.render(
            <ModalStackProvider>
                <App {...props} />
            </ModalStackProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

if (window.location.pathname === '/props-from-config') {
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