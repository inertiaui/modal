// Minimal Inertia + Inertia Modal bootstrap for the consumer smoke test.
//
// Deliberately tiny: the duplicate-Inertia bug is about how the package and its
// peers resolve and bundle in a real customer install, not about the starter's
// own UI. Modal 2.x wires the modal root through the renderApp() helper, exactly
// as the installation docs show.
import '../css/app.css'
import { createInertiaApp } from '@inertiajs/vue3'
import { renderApp } from '@inertiaui/modal-vue'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createApp } from 'vue'

createInertiaApp({
    resolve: (name) => resolvePageComponent(`./pages/${name}.vue`, import.meta.glob('./pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        createApp({ render: renderApp(App, props) })
            .use(plugin)
            .mount(el)
    },
})
