import * as dialogUtils from '@inertiaui/vanilla';
import { type Component } from 'svelte';
import { getConfig, putConfig, resetConfig } from './config.js';
import Deferred from './Deferred.svelte';
import HeadlessModal from './HeadlessModal.svelte';
import ModalComponent from './Modal.svelte';
import ModalLink from './ModalLink.svelte';
import ModalRoot from './ModalRoot.svelte';
import { initFromPageProps, modalPropNames, Modal as ModalClass, prefetch, useModalStack } from './modalStack.svelte.js';
import useModal from './useModal.js';
import WhenVisible from './WhenVisible.svelte';
import type { HttpMethod, ModalConfig, ModalResponseData, ModalStack, PrefetchOption, PrefetchOptions, ReloadOptions, VisitOptions } from './modalStack.svelte.js';
declare function visitModal(url: string, options?: VisitOptions): Promise<ModalClass>;
export interface InertiaSvelteSetupOptions {
    el: HTMLElement;
    App: Component<Record<string, unknown>>;
    props: Record<string, unknown>;
}
declare function withInertiaModal({ el, App, props }: InertiaSvelteSetupOptions): {};
export { Deferred, HeadlessModal, ModalComponent as Modal, ModalLink, ModalRoot, WhenVisible, getConfig, putConfig, resetConfig, initFromPageProps, withInertiaModal, useModal, useModalStack, visitModal, modalPropNames, prefetch, ModalClass as ModalInstance, dialogUtils, };
export type { ModalStack, ModalResponseData, ModalConfig, ReloadOptions, VisitOptions, HttpMethod, PrefetchOption, PrefetchOptions };
export type { ModalTypeConfig } from './config.js';
export type { CleanupFunction, FocusTrapOptions, EscapeKeyOptions } from '@inertiaui/vanilla';
