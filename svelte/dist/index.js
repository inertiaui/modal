import * as dialogUtils from '@inertiaui/vanilla';
import { mount } from 'svelte';
import { getConfig, putConfig, resetConfig } from './config.js';
import Deferred from './Deferred.svelte';
import HeadlessModal from './HeadlessModal.svelte';
import { kebabCase } from './helpers.js';
import ModalComponent from './Modal.svelte';
import ModalLink from './ModalLink.svelte';
import ModalRoot from './ModalRoot.svelte';
import { initFromPageProps, modalPropNames, Modal as ModalClass, prefetch, useModalStack } from './modalStack.svelte.js';
import useModal from './useModal.js';
import WhenVisible from './WhenVisible.svelte';
function visitModal(url, options = {}) {
    return useModalStack()
        .visit(url, options.method ?? 'get', options.data ?? {}, options.headers ?? {}, options.config ?? {}, options.onClose, options.onAfterLeave, options.queryStringArrayFormat ?? 'brackets', options.navigate ?? getConfig('navigate'), options.onStart, options.onSuccess, options.onError, options.props ?? null)
        .then((modal) => {
        const listeners = options.listeners ?? {};
        Object.keys(listeners).forEach((event) => {
            const eventName = kebabCase(event);
            modal.on(eventName, listeners[event]);
        });
        return modal;
    });
}
function withInertiaModal({ el, App, props }) {
    return mount(ModalRoot, {
        target: el,
        props: {
            App,
            appProps: props,
        },
    });
}
export { Deferred, HeadlessModal, ModalComponent as Modal, ModalLink, ModalRoot, WhenVisible, getConfig, putConfig, resetConfig, initFromPageProps, withInertiaModal, useModal, useModalStack, visitModal, modalPropNames, prefetch, ModalClass as ModalInstance, dialogUtils, };
