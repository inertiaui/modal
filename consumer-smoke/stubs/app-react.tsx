// Minimal Inertia + Inertia Modal bootstrap for the consumer smoke test.
//
// Deliberately tiny: the duplicate-Inertia bug is about how the package and its
// peers resolve and bundle in a real customer install, not about the starter's
// own UI. This mirrors the documented setup: ModalStackProvider wraps the app
// (via withApp), and ModalRoot is rendered inside the Inertia context through a
// persistent layout so its usePage() call resolves.
import '../css/app.css'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { ModalStackProvider, ModalRoot } from '@inertiaui/modal-react'

function ModalLayout({ children }) {
    return (
        <>
            {children}
            <ModalRoot />
        </>
    )
}

createInertiaApp({
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    withApp(app) {
        return <ModalStackProvider>{app}</ModalStackProvider>
    },
    layout: () => ModalLayout,
})
