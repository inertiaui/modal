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
        const storageKey = 'inertiauiModalCodeGroupTab'
        const boundLabels = new WeakSet()
        let preventScroll = false

        function scrollToY(y) {
            window.scrollTo({
                top: y,
                behavior: 'instant',
            })
        }

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

        function showCodeWithLabel(labelText) {
            document.querySelectorAll('.vp-code-group .tabs label').forEach((label) => {
                if (label.innerText !== labelText) {
                    return
                }

                const input = document.getElementById(label.getAttribute('for'))

                if (input && !input.checked) {
                    label.click()
                }
            })
        }

        function bindClickEvents() {
            document.querySelectorAll('.vp-code-group .tabs label').forEach((label) => {
                if (boundLabels.has(label)) {
                    return
                }

                boundLabels.add(label)

                label.addEventListener('click', (event) => {
                    const labelFor = label.getAttribute('for')
                    const initialRect = label.getBoundingClientRect()
                    const initialScrollY = window.scrollY

                    localStorage.setItem(storageKey, label.innerText)
                    showCodeWithLabel(label.innerText)

                    nextTick(() => {
                        if (preventScroll || !event.isTrusted || !labelFor) {
                            return
                        }

                        const selectedLabel = document.querySelector(`label[for="${labelFor}"]`)

                        if (!selectedLabel) {
                            return
                        }

                        const newRect = selectedLabel.getBoundingClientRect()
                        const yDiff = newRect.top + window.scrollY - (initialRect.top + initialScrollY)

                        scrollToY(initialScrollY + yDiff)
                    })
                })
            })
        }

        function selectTabAndScrollToTop(tab) {
            if (!tab) {
                return
            }

            preventScroll = true
            showCodeWithLabel(tab)

            nextTick(() => {
                preventScroll = false
                scrollToY(0)
            })
        }

        onMounted(() => {
            nextTick(() => {
                updateVersionLabel()
                bindClickEvents()
                selectTabAndScrollToTop(localStorage.getItem(storageKey))
            })
        })

        watch(
            () => route.path,
            () => {
                nextTick(() => {
                    updateVersionLabel()
                    bindClickEvents()
                    selectTabAndScrollToTop(localStorage.getItem(storageKey))
                })
            },
        )
    },
})
