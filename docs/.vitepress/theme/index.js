import { createInertiaUiTheme } from '@inertiaui/docs-theme'

import '@inertiaui/docs-theme/base.css'
import { inBrowser, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h, nextTick, onMounted, watch } from 'vue'

import VersionBanner from './VersionBanner.vue'

export default createInertiaUiTheme(DefaultTheme, {
    codeGroupStorageKey: 'inertiauiModalCodeGroupTab',
    useRoute,
    Layout() {
        return h(DefaultTheme.Layout, null, {
            'doc-before': () => h(VersionBanner),
        })
    },

    setup() {
        if (!inBrowser) {
            return
        }

        const route = useRoute()

        function updateVersionLabel() {
            const path = route.path
            let label = 'v3'
            if (path.includes('/v2/')) label = 'v2'
            else if (path.includes('/v0/')) label = 'v0'

            const el = document.querySelector('.VPNavBarMenuGroup .text')
            if (el && ['v3', 'v2', 'v0'].includes(el.textContent.trim())) {
                el.textContent = label
            }
        }

        onMounted(() => {
            nextTick(() => {
                updateVersionLabel()
            })
        })

        watch(
            () => route.path,
            () => {
                nextTick(() => {
                    updateVersionLabel()
                })
            },
        )
    },
})
