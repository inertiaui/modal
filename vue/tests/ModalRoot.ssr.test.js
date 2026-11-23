// @vitest-environment node
import { describe, expect, it, vi } from 'vitest'
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'

const onRequest = vi.fn(() => () => {})

vi.mock('@inertiajs/vue3', () => ({
    http: { onRequest },
    progress: {},
    router: { on: () => () => {} },
    usePage: () => ({ props: {} }),
}))

describe('ModalRoot', () => {
    it('does not register the request interceptor during SSR', async () => {
        const { default: ModalRoot } = await import('../src/ModalRoot.vue')

        await renderToString(createSSRApp({ render: () => h(ModalRoot) }))

        expect(onRequest).not.toHaveBeenCalled()
    })
})
