import { onMounted, nextTick, watch } from 'vue'
import { inBrowser, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

export default {
    extends: DefaultTheme,

    setup() {
        if (inBrowser) {
            const route = useRoute()

            function showCodeWithLabel(labelText) {
                document.querySelectorAll(`.vp-code-group .tabs label`).forEach((label) => {
                    if (label.innerText === labelText) {
                        label.click()
                    }
                })
            }

            onMounted(() => {
                document.querySelectorAll('.vp-code-group .tabs label').forEach((label) => {
                    label.addEventListener('click', () => {
                        localStorage.setItem('codeGroupTab', label.innerText)
                        showCodeWithLabel(label.innerText)
                    })
                });
            })

            watch(
                () => route.path,
                () => {
                    // Restore tab from local storage
                    const tab = localStorage.getItem('codeGroupTab')
                    if (tab) {
                        nextTick(() => showCodeWithLabel(tab))
                    }
                },
                { immediate: true }
            )
        }
    }
}