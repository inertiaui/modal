import * as dialogUtils from '@inertiaui/vanilla'
import { mount, type Component } from 'svelte'

import { getConfig, putConfig, resetConfig } from './config.js'
import Deferred from './Deferred.svelte'
import HeadlessModal from './HeadlessModal.svelte'
import { kebabCase } from './helpers.js'
import ModalComponent from './Modal.svelte'
import ModalLink from './ModalLink.svelte'
import ModalRoot from './ModalRoot.svelte'
import { initFromPageProps, modalPropNames, Modal as ModalClass, prefetch, useModalStack } from './modalStack.svelte.js'
import type {
    HttpMethod,
    ModalConfig,
    ModalResponseData,
    ModalStack,
    PrefetchOption,
    PrefetchOptions,
    ReloadOptions,
    VisitOptions,
} from './modalStack.svelte.js'
import useModal from './useModal.js'
import WhenVisible from './WhenVisible.svelte'

function visitModal(url: string, options: VisitOptions = {}): Promise<ModalClass> {
    return useModalStack()
        .visit(
            url,
            options.method ?? 'get',
            options.data ?? {},
            options.headers ?? {},
            options.config ?? {},
            options.onClose,
            options.onAfterLeave,
            options.queryStringArrayFormat ?? 'brackets',
            options.navigate ?? (getConfig('navigate') as boolean),
            options.onStart,
            options.onSuccess,
            options.onError,
            options.props ?? null,
        )
        .then((modal) => {
            const listeners = options.listeners ?? {}

            Object.keys(listeners).forEach((event) => {
                const eventName = kebabCase(event)
                modal.on(eventName, listeners[event])
            })

            return modal
        })
}

export interface InertiaSvelteSetupOptions {
    el: HTMLElement
    App: Component<Record<string, unknown>>
    props: Record<string, unknown>
}

function withInertiaModal({ el, App, props }: InertiaSvelteSetupOptions) {
    return mount(ModalRoot, {
        target: el,
        props: {
            App,
            appProps: props,
        },
    })
}

export {
    Deferred,
    HeadlessModal,
    ModalComponent as Modal,
    ModalLink,
    ModalRoot,
    WhenVisible,
    getConfig,
    putConfig,
    resetConfig,
    initFromPageProps,
    withInertiaModal,
    useModal,
    useModalStack,
    visitModal,
    modalPropNames,
    prefetch,
    ModalClass as ModalInstance,
    dialogUtils,
}

export type { ModalStack, ModalResponseData, ModalConfig, ReloadOptions, VisitOptions, HttpMethod, PrefetchOption, PrefetchOptions }
export type { ModalTypeConfig } from './config.js'
export type { CleanupFunction, FocusTrapOptions, EscapeKeyOptions } from '@inertiaui/vanilla'
