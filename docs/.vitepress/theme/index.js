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
                        const input = document.getElementById(label.getAttribute('for'))

                        if(! input.checked) {
                            label.click()
                        }
                    }
                })
            }

            let preventScroll = false

            function bindClickEvent() {
                document.querySelectorAll('.vp-code-group .tabs label').forEach((label) => {
                    label.addEventListener('click', ($event) => {
                        const labelFor = label.getAttribute('for')
                        const initialRect = label.getBoundingClientRect()
                        const initialScrollY = window.scrollY

                        localStorage.setItem('codeGroupTab', label.innerText)

                        // Show the code
                        showCodeWithLabel(label.innerText)

                        // Use nextTick to ensure DOM is updated
                        nextTick(() => {
                            if (preventScroll || !$event.isTrusted) {
                                return
                            }

                            // Find the new position of the label
                            const labelNew = document.querySelector(`label[for="${labelFor}"]`)
                            const newRect = labelNew.getBoundingClientRect()

                            // Calculate the difference in position relative to the document
                            const yDiff = (newRect.top + window.scrollY) - (initialRect.top + initialScrollY)

                            // Scroll to maintain the label's position
                            window.scrollTo({
                                top: initialScrollY + yDiff,
                                behavior: 'instant'
                            })
                        })
                    })
                });
            }

            onMounted(() => nextTick(() => bindClickEvent()))

            watch(
                () => route.path,
                () => {
                    // Restore tab from local storage
                    const tab = localStorage.getItem('codeGroupTab')
                    if (tab) {
                        const currentScrollY = window.scrollY

                        nextTick(() => {
                            preventScroll = true
                            showCodeWithLabel(tab)
                            preventScroll = false
                            window.scrollTo({ top: currentScrollY, behavior: 'instant' })
                            bindClickEvent()
                        })
                    }
                },
                { immediate: true }
            )
        }
    }
}