// Minimal Inertia + Inertia Modal bootstrap for the consumer smoke test.
//
// Deliberately tiny: the duplicate-Inertia bug is about how the package and its
// peers resolve and bundle in a real customer install, not about the starter's
// own UI. withInertiaModal() wraps the root render with ModalRoot the same way
// the documented setup does, which is all that is needed to reproduce it.
import '../css/app.css'
import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createApp, h } from 'vue'
import { withInertiaModal } from '@inertiaui/modal-vue'

createInertiaApp({
    resolve: (name) => resolvePageComponent(`./pages/${name}.vue`, import.meta.glob('./pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) })
        app.use(plugin)
        withInertiaModal(app)
        app.mount(el)
    },
})
