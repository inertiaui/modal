import { mergeDataIntoQueryString } from '@inertiajs/core';
import { http, progress, router, usePage } from '@inertiajs/svelte';
import { tick } from 'svelte';
import { ResponseCache } from './cache.js';
import { except, generateId, kebabCase, parseResponseData, sameUrlPath } from './helpers.js';
const session = $state({
    baseUrl: null,
});
const stack = $state([]);
const localModals = $state({});
let closingToBaseUrlTarget = null;
const prefetchCache = new ResponseCache();
function clearStack() {
    stack.splice(0, stack.length);
}
export function prefetch(href, options = {}) {
    if (href.startsWith('#')) {
        return Promise.resolve();
    }
    const method = options.method ?? 'get';
    const data = options.data ?? {};
    const headers = options.headers ?? {};
    const queryStringArrayFormat = options.queryStringArrayFormat ?? 'brackets';
    const cacheFor = options.cacheFor ?? 30000;
    const [url, mergedData] = mergeDataIntoQueryString(method, href || '', data, queryStringArrayFormat);
    const cacheKey = ResponseCache.key(method, url, mergedData);
    if (prefetchCache.get(cacheKey)) {
        return Promise.resolve();
    }
    const inFlight = prefetchCache.getInFlight(cacheKey);
    if (inFlight) {
        return inFlight.then(() => { });
    }
    options.onPrefetching?.();
    const requestHeaders = {
        ...headers,
        Accept: 'text/html, application/xhtml+xml',
        'X-Requested-With': 'XMLHttpRequest',
        'X-Inertia': 'true',
        'X-Inertia-Version': usePage().version ?? '',
        'X-InertiaUI-Modal': generateId(),
        'X-InertiaUI-Modal-Base-Url': session.baseUrl ?? '',
    };
    const request = http
        .getClient()
        .request({ url, method, data: mergedData, headers: requestHeaders })
        .then((response) => {
        prefetchCache.set(cacheKey, response, cacheFor);
        options.onPrefetched?.();
        return response;
    })
        .finally(() => {
        prefetchCache.deleteInFlight(cacheKey);
    });
    prefetchCache.setInFlight(cacheKey, request);
    return request.then(() => { });
}
const setComponentResolver = (_resolver) => { };
export const initFromPageProps = (_pageProps) => { };
function unwrapComponent(resolved) {
    if (resolved && typeof resolved === 'object' && 'default' in resolved && resolved.default) {
        return resolved.default;
    }
    return resolved ?? null;
}
export class Modal {
    id;
    isOpen = $state(false);
    shouldRender = $state(false);
    listeners;
    component;
    props = $state({});
    response;
    config;
    onCloseCallback;
    afterLeaveCallback;
    name;
    constructor(component, response, config, onClose, afterLeave) {
        this.id = response.id ?? generateId();
        this.listeners = {};
        this.component = component;
        this.props = response.props ?? {};
        this.response = response;
        this.config = config ?? {};
        this.onCloseCallback = onClose ?? null;
        this.afterLeaveCallback = afterLeave ?? null;
    }
    get index() {
        return stack.findIndex((modal) => modal.id === this.id);
    }
    get onTopOfStack() {
        if (stack.length < 2) {
            return true;
        }
        const modals = stack.map((modal) => ({ id: modal.id, shouldRender: modal.shouldRender }));
        return modals.reverse().find((modal) => modal.shouldRender)?.id === this.id;
    }
    getParentModal = () => {
        const index = this.index;
        if (index < 1) {
            return null;
        }
        return (stack
            .slice(0, index)
            .reverse()
            .find((modal) => modal.isOpen) ?? null);
    };
    getChildModal = () => {
        const index = this.index;
        if (index === stack.length - 1) {
            return null;
        }
        return stack.slice(index + 1).find((modal) => modal.isOpen) ?? null;
    };
    show = () => {
        const index = this.index;
        if (index > -1 && !stack[index].isOpen) {
            stack[index].isOpen = true;
            stack[index].shouldRender = true;
        }
    };
    close = () => {
        const index = this.index;
        if (index > -1 && stack[index].isOpen) {
            Object.keys(this.listeners).forEach((event) => {
                this.off(event);
            });
            stack[index].isOpen = false;
            this.onCloseCallback?.();
            this.onCloseCallback = null;
        }
    };
    setOpen = (open) => {
        if (open) {
            this.show();
        }
        else {
            this.close();
        }
    };
    afterLeave = () => {
        const index = this.index;
        if (index > -1) {
            if (stack[index].isOpen) {
                return;
            }
            stack[index].shouldRender = false;
            this.afterLeaveCallback?.();
            this.afterLeaveCallback = null;
        }
        if (index === 0) {
            clearStack();
            const savedBaseUrl = session.baseUrl;
            session.baseUrl = null;
            closingToBaseUrlTarget = savedBaseUrl;
            if (savedBaseUrl && typeof window !== 'undefined' && !sameUrlPath(savedBaseUrl, window.location.href)) {
                router.push({
                    url: savedBaseUrl,
                    preserveScroll: true,
                    preserveState: true,
                    props: (currentProps) => {
                        const { _inertiaui_modal: _removed, ...rest } = currentProps;
                        return { ...rest, _inertiaui_modal: undefined };
                    },
                });
            }
        }
    };
    on = (event, callback) => {
        event = kebabCase(event);
        this.listeners[event] = this.listeners[event] ?? [];
        this.listeners[event].push(callback);
    };
    off = (event, callback) => {
        event = kebabCase(event);
        if (callback) {
            this.listeners[event] = this.listeners[event]?.filter((cb) => cb !== callback) ?? [];
        }
        else {
            delete this.listeners[event];
        }
    };
    emit = (event, ...args) => {
        this.listeners[kebabCase(event)]?.forEach((callback) => callback(...args));
    };
    registerEventListenersFromAttrs = (attrs) => {
        const unsubscribers = [];
        Object.keys(attrs)
            .filter((key) => key.startsWith('on') && typeof attrs[key] === 'function')
            .forEach((key) => {
            const eventName = kebabCase(key).replace(/^on-/, '');
            const callback = attrs[key];
            this.on(eventName, callback);
            unsubscribers.push(() => this.off(eventName, callback));
        });
        return () => unsubscribers.forEach((unsub) => unsub());
    };
    reload = (options = {}) => {
        let keys = Object.keys(this.response.props);
        if (options.only) {
            keys = options.only;
        }
        if (options.except) {
            keys = except(keys, options.except);
        }
        if (!this.response?.url) {
            return;
        }
        const method = options.method ?? 'get';
        const data = options.data ?? {};
        options.onStart?.();
        http.getClient()
            .request({
            url: this.response.url,
            method,
            data: method === 'get' ? undefined : data,
            params: method === 'get' ? data : undefined,
            headers: {
                ...options.headers,
                Accept: 'text/html, application/xhtml+xml',
                'X-Inertia': 'true',
                'X-Inertia-Partial-Component': this.response.component,
                'X-Inertia-Version': this.response.version ?? '',
                'X-Inertia-Partial-Data': keys.join(','),
                'X-InertiaUI-Modal': generateId(),
                'X-InertiaUI-Modal-Base-Url': session.baseUrl ?? '',
            },
        })
            .then((response) => {
            this.updateProps(parseResponseData(response.data).props);
            options.onSuccess?.(response);
        })
            .catch((error) => {
            options.onError?.(error);
        })
            .finally(() => {
            options.onFinish?.();
        });
    };
    updateProps = (props) => {
        Object.assign(this.props, props);
    };
}
function registerLocalModal(name, callback) {
    localModals[name] = { name, callback };
}
function pushLocalModal(name, config, onClose, afterLeave, props) {
    if (!localModals[name]) {
        throw new Error(`The local modal "${name}" has not been registered.`);
    }
    const responseData = { props: props ?? {} };
    const modal = push(null, responseData, config, onClose, afterLeave);
    modal.name = name;
    localModals[name].callback(modal);
    return modal;
}
function isValidModalResponse(data) {
    return typeof data === 'object' && data !== null && 'component' in data && typeof data.component === 'string';
}
function updateBrowserUrl(url, useBrowserHistory, modalData) {
    if (!url || !useBrowserHistory || typeof window === 'undefined') {
        return;
    }
    router.push({
        url,
        preserveScroll: true,
        preserveState: true,
        props: modalData
            ? (currentProps) => ({
                ...currentProps,
                _inertiaui_modal: {
                    ...modalData,
                    baseUrl: session.baseUrl,
                },
            })
            : undefined,
    });
}
function pushFromResponseData(responseData, config = {}, onClose = null, onAfterLeave = null) {
    if (!isValidModalResponse(responseData)) {
        return Promise.reject(new Error('Invalid modal response. This usually happens when the server returns a redirect (e.g., due to session expiration). ' +
            'Check if the user is still authenticated.'));
    }
    return router.resolveComponent(responseData.component).then((component) => push(unwrapComponent(component), responseData, config, onClose, onAfterLeave));
}
function visit(href, method, payload = {}, headers = {}, config = {}, onClose = null, onAfterLeave = null, queryStringArrayFormat = 'brackets', useBrowserHistory = false, onStart = null, onSuccess = null, onError = null, props = null) {
    const modalId = generateId();
    return new Promise((resolve, reject) => {
        if (href.startsWith('#')) {
            resolve(pushLocalModal(href.substring(1), config, onClose, onAfterLeave, props));
            return;
        }
        const [url, data] = mergeDataIntoQueryString(method, href || '', payload, queryStringArrayFormat);
        const cachedResponse = prefetchCache.get(ResponseCache.key(method, url, data));
        if (cachedResponse) {
            const cachedData = parseResponseData(cachedResponse.data);
            onSuccess?.(cachedResponse);
            pushFromResponseData(cachedData, config, onClose, onAfterLeave)
                .then((modal) => {
                updateBrowserUrl(cachedData.url, useBrowserHistory, cachedData);
                resolve(modal);
            })
                .catch(reject);
            return;
        }
        if (stack.length === 0) {
            session.baseUrl = typeof window !== 'undefined' ? window.location.href : '';
        }
        const requestHeaders = {
            ...headers,
            Accept: 'text/html, application/xhtml+xml',
            'X-Requested-With': 'XMLHttpRequest',
            'X-Inertia': 'true',
            'X-Inertia-Version': usePage().version ?? '',
            'X-InertiaUI-Modal': modalId,
            'X-InertiaUI-Modal-Base-Url': session.baseUrl ?? '',
        };
        onStart?.();
        progress?.start();
        http.getClient()
            .request({ url, method, data, headers: requestHeaders })
            .then((response) => {
            const responseData = parseResponseData(response.data);
            onSuccess?.(response);
            pushFromResponseData(responseData, config, onClose, onAfterLeave)
                .then((modal) => {
                updateBrowserUrl(responseData.url, useBrowserHistory, responseData);
                resolve(modal);
            })
                .catch(reject);
        })
            .catch((...args) => {
            onError?.(...args);
            reject(args[0]);
        })
            .finally(() => {
            progress?.finish();
        });
    });
}
function loadDeferredProps(modal) {
    const deferred = modal.response?.meta?.deferredProps;
    if (!deferred) {
        return;
    }
    Object.keys(deferred).forEach((key) => {
        modal.reload({ only: deferred[key] });
    });
}
function push(component, response, config, onClose, afterLeave) {
    const newModal = new Modal(component, response, config, onClose, afterLeave);
    stack.push(newModal);
    loadDeferredProps(newModal);
    tick().then(() => newModal.show());
    return newModal;
}
export const modalPropNames = ['closeButton', 'closeExplicitly', 'closeOnClickOutside', 'maxWidth', 'paddingClasses', 'panelClasses', 'position', 'slideover'];
export function useModalStack() {
    return {
        setComponentResolver,
        getBaseUrl: () => session.baseUrl,
        setBaseUrl: (url) => {
            session.baseUrl = url;
        },
        isClosingToBaseUrl: (pageUrl) => {
            if (!closingToBaseUrlTarget)
                return false;
            const targetPath = new URL(closingToBaseUrlTarget, 'http://x').pathname;
            const pagePath = new URL(pageUrl, 'http://x').pathname;
            return targetPath === pagePath;
        },
        clearClosingToBaseUrl: () => {
            closingToBaseUrlTarget = null;
        },
        stack,
        push,
        pushFromResponseData,
        closeAll: (force = false) => {
            if (force) {
                clearStack();
            }
            else {
                ;
                [...stack].reverse().forEach((modal) => modal.close());
            }
        },
        reset: () => clearStack(),
        visit,
        registerLocalModal,
        removeLocalModal: (name) => delete localModals[name],
    };
}
