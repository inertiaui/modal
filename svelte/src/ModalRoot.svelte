<script lang="ts">
    import { http, page, router } from '@inertiajs/svelte'
    import { SvelteSet } from 'svelte/reactivity'
    import { onDestroy, type Component, type Snippet } from 'svelte'

    import { setModalContext } from './context.js'
    import { sameUrlPath } from './helpers.js'
    import ModalRenderer from './ModalRenderer.svelte'
    import { useModalStack, type ModalResponseData } from './modalStack.svelte.js'

    interface Props {
        App?: Component<Record<string, unknown>>
        appProps?: Record<string, unknown>
        children?: Snippet
    }

    let { App, appProps = {}, children }: Props = $props()

    const modalStack = useModalStack()

    setModalContext({
        getModal: () => null,
    })

    let isNavigating = false
    const pendingModalKeys = new SvelteSet<string>()

    const getModalKey = (modalData: ModalResponseData) => modalData.id || `${modalData.component}:${modalData.url}`

    const removeStart = router.on('start', () => {
        isNavigating = true
    })
    const removeFinish = router.on('finish', () => {
        isNavigating = false
    })
    const removeNavigate = router.on('navigate', (event) => {
        const pageEvent = event as { detail: { page: { props: { _inertiaui_modal?: ModalResponseData }; url: string } } }
        const modalOnBase = pageEvent.detail.page.props._inertiaui_modal
        const pageUrl = pageEvent.detail.page.url

        if (modalStack.isClosingToBaseUrl(pageUrl)) {
            modalStack.clearClosingToBaseUrl()
            modalStack.closeAll(true)
            modalStack.setBaseUrl(null)
            return
        }

        if (!modalOnBase) {
            modalStack.closeAll(true)
            modalStack.setBaseUrl(null)
            return
        }

        if (!sameUrlPath(pageUrl, modalOnBase.url)) {
            modalStack.closeAll(true)
            modalStack.setBaseUrl(null)
            return
        }

        const modalKey = getModalKey(modalOnBase)
        if (pendingModalKeys.has(modalKey)) {
            return
        }

        if (modalOnBase.id && modalStack.stack.some((modal) => modal.id === modalOnBase.id)) {
            return
        }

        if (modalStack.stack.some((modal) => modal.response?.component === modalOnBase.component && sameUrlPath(modal.response?.url, modalOnBase.url))) {
            return
        }

        modalStack.setBaseUrl(modalOnBase.baseUrl ?? null)
        pendingModalKeys.add(modalKey)

        modalStack
            .pushFromResponseData(modalOnBase, {}, () => {
                if (!modalOnBase.baseUrl) {
                    console.error('No base url in modal response data so cannot navigate back')
                    return
                }

                modalStack.setBaseUrl(null)

                if (!isNavigating && typeof window !== 'undefined' && window.location.href !== modalOnBase.baseUrl) {
                    router.visit(modalOnBase.baseUrl, {
                        preserveScroll: true,
                        preserveState: true,
                    })
                }
            })
            .finally(() => {
                pendingModalKeys.delete(modalKey)
            })
    })

    const requestInterceptor = (config: { headers?: Record<string, string> }) => {
        const baseUrlValue = modalStack.getBaseUrl() ?? (page.props?._inertiaui_modal as ModalResponseData | undefined)?.baseUrl ?? null

        if (baseUrlValue) {
            config.headers = config.headers ?? {}
            config.headers['X-InertiaUI-Modal-Base-Url'] = baseUrlValue
        }

        return config
    }

    const removeInterceptor = http.onRequest(requestInterceptor)

    onDestroy(() => {
        removeStart()
        removeFinish()
        removeNavigate()
        removeInterceptor()
    })

    let previousModal: ModalResponseData | undefined

    $effect(() => {
        const newModal = page.props?._inertiaui_modal as ModalResponseData | undefined
        const prior = previousModal
        previousModal = newModal

        if (!newModal) {
            return
        }

        if (prior && newModal.component === prior.component && sameUrlPath(newModal.url, prior.url)) {
            modalStack.stack[0]?.updateProps(newModal.props ?? {})
            return
        }

        if (!prior && modalStack.stack.length > 0) {
            const existingModal = modalStack.stack.find((modal) => modal.response?.component === newModal.component && sameUrlPath(modal.response?.url, newModal.url))
            existingModal?.updateProps(newModal.props ?? {})
        }
    })
</script>

{#if App}
    <App {...appProps} />
{:else}
    {@render children?.()}
{/if}

{#if modalStack.stack.length}
    <ModalRenderer index={0} />
{/if}
