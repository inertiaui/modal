import { computed, provide, openBlock, createBlock, unref, mergeProps, createCommentVNode, onUnmounted, onMounted, watch, createElementBlock, Fragment, renderSlot, ref, h, readonly, markRaw, nextTick, toValue, inject, onBeforeUnmount, useAttrs, createElementVNode, normalizeClass, createVNode, withModifiers, withCtx, Teleport, Transition, resolveDynamicComponent } from "vue";
import { generateId as generateId$1, only, sameUrlPath, kebabCase, except, cancelAnimations, onEscapeKey, createFocusTrap, animate, lockScroll, markAriaHidden, rejectNullValues } from "@inertiaui/vanilla";
import * as vanilla from "@inertiaui/vanilla";
import { usePage, router, progress } from "@inertiajs/vue3";
import { mergeDataIntoQueryString } from "@inertiajs/core";
import Axios from "axios";
const defaultConfig = {
  type: "modal",
  navigate: false,
  useNativeDialog: true,
  appElement: "#app",
  modal: {
    closeButton: true,
    closeExplicitly: false,
    closeOnClickOutside: true,
    maxWidth: "2xl",
    paddingClasses: "p-4 sm:p-6",
    panelClasses: "bg-white rounded",
    position: "center"
  },
  slideover: {
    closeButton: true,
    closeExplicitly: false,
    closeOnClickOutside: true,
    maxWidth: "md",
    paddingClasses: "p-4 sm:p-6",
    panelClasses: "bg-white min-h-screen",
    position: "right"
  }
};
class Config {
  constructor() {
    this.config = {};
    this.reset();
  }
  reset() {
    this.config = JSON.parse(JSON.stringify(defaultConfig));
  }
  put(key, value) {
    if (typeof key === "object") {
      this.config = {
        type: key.type ?? defaultConfig.type,
        navigate: key.navigate ?? defaultConfig.navigate,
        useNativeDialog: key.useNativeDialog ?? defaultConfig.useNativeDialog,
        appElement: key.appElement !== void 0 ? key.appElement : defaultConfig.appElement,
        modal: { ...defaultConfig.modal, ...key.modal ?? {} },
        slideover: { ...defaultConfig.slideover, ...key.slideover ?? {} }
      };
      return;
    }
    const keys = key.split(".");
    let current = this.config;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]] = current[keys[i]] || {};
    }
    current[keys[keys.length - 1]] = value;
  }
  get(key) {
    if (typeof key === "undefined") {
      return this.config;
    }
    const keys = key.split(".");
    let current = this.config;
    for (const k of keys) {
      if (current === null || current === void 0 || typeof current !== "object") {
        return null;
      }
      current = current[k];
    }
    return current === void 0 ? null : current;
  }
}
const configInstance = new Config();
const resetConfig = () => configInstance.reset();
const putConfig = (key, value) => configInstance.put(key, value);
const getConfig = (key) => configInstance.get(key);
const getConfigByType = (isSlideover, key) => configInstance.get(isSlideover ? `slideover.${key}` : `modal.${key}`);
function generateId(prefix = "inertiaui_modal_") {
  return generateId$1(prefix);
}
const _sfc_main$9 = {
  __name: "ModalRenderer",
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const modalStack = useModalStack();
    const modalContext = computed(() => {
      return modalStack.stack.value[props.index];
    });
    provide("modalContext", modalContext);
    return (_ctx, _cache) => {
      return modalContext.value?.component ? (openBlock(), createBlock(unref(modalContext).component, mergeProps({ key: 0 }, unref(only)(modalContext.value.props ?? {}, modalContext.value.getComponentPropKeys(), true), {
        onModalEvent: _cache[0] || (_cache[0] = (event, ...args) => modalContext.value.emit(event, ...args))
      }), null, 16)) : createCommentVNode("", true);
    };
  }
};
const _sfc_main$8 = {
  __name: "ModalRoot",
  setup(__props) {
    const modalStack = useModalStack();
    const $page = usePage();
    let isNavigating = false;
    const pendingModalKeys = /* @__PURE__ */ new Set();
    const getModalKey = (modalData) => modalData.id || `${modalData.component}:${modalData.url}`;
    onUnmounted(router.on("start", () => isNavigating = true));
    onUnmounted(router.on("finish", () => isNavigating = false));
    onUnmounted(
      router.on("navigate", ($event) => {
        const modalOnBase = $event.detail.page.props._inertiaui_modal;
        const pageUrl = $event.detail.page.url;
        if (modalStack.isClosingToBaseUrl(pageUrl)) {
          modalStack.clearClosingToBaseUrl();
          modalStack.closeAll(true);
          modalStack.setBaseUrl(null);
          return;
        }
        if (!modalOnBase) {
          modalStack.closeAll(true);
          modalStack.setBaseUrl(null);
          return;
        }
        if (!sameUrlPath(pageUrl, modalOnBase.url)) {
          modalStack.closeAll(true);
          modalStack.setBaseUrl(null);
          return;
        }
        const modalKey = getModalKey(modalOnBase);
        if (pendingModalKeys.has(modalKey)) {
          return;
        }
        if (modalOnBase.id && modalStack.stack.value.some((m) => m.id === modalOnBase.id)) {
          return;
        }
        if (modalStack.stack.value.some((m) => m.response?.component === modalOnBase.component && sameUrlPath(m.response?.url, modalOnBase.url))) {
          return;
        }
        modalStack.setBaseUrl(modalOnBase.baseUrl);
        pendingModalKeys.add(modalKey);
        modalStack.pushFromResponseData(modalOnBase, {}, () => {
          if (!modalOnBase.baseUrl) {
            console.error("No base url in modal response data so cannot navigate back");
            return;
          }
          if (!isNavigating && typeof window !== "undefined" && window.location.href !== modalOnBase.baseUrl) {
            router.visit(modalOnBase.baseUrl, {
              preserveScroll: true,
              preserveState: true
            });
          }
        }).finally(() => {
          pendingModalKeys.delete(modalKey);
        });
      })
    );
    const axiosRequestInterceptor = (config) => {
      const baseUrlValue = modalStack.getBaseUrl() ?? $page.props?._inertiaui_modal?.baseUrl ?? null;
      if (baseUrlValue) {
        config.headers["X-InertiaUI-Modal-Base-Url"] = baseUrlValue;
      }
      return config;
    };
    let axiosInterceptorId = null;
    onMounted(() => axiosInterceptorId = Axios.interceptors.request.use(axiosRequestInterceptor));
    onUnmounted(() => axiosInterceptorId !== null && Axios.interceptors.request.eject(axiosInterceptorId));
    watch(
      () => $page.props?._inertiaui_modal,
      (newModal, previousModal) => {
        if (!newModal) {
          return;
        }
        if (previousModal && newModal.component === previousModal.component && sameUrlPath(newModal.url, previousModal.url)) {
          modalStack.stack.value[0]?.updateProps(newModal.props ?? {});
          return;
        }
        if (!previousModal && modalStack.stack.value.length > 0) {
          const existingModal = modalStack.stack.value.find(
            (m) => m.response?.component === newModal.component && sameUrlPath(m.response?.url, newModal.url)
          );
          if (existingModal) {
            existingModal.updateProps(newModal.props ?? {});
          }
        }
      }
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        renderSlot(_ctx.$slots, "default"),
        unref(modalStack).stack.value.length ? (openBlock(), createBlock(_sfc_main$9, {
          key: 0,
          index: 0
        })) : createCommentVNode("", true)
      ], 64);
    };
  }
};
let resolveComponent = null;
const baseUrl = ref(null);
const stack = ref([]);
const localModals = ref({});
let closingToBaseUrlTarget = null;
const prefetchCache = /* @__PURE__ */ new Map();
const prefetchInFlight = /* @__PURE__ */ new Map();
function getPrefetchCacheKey(url, method, data) {
  return `${method}:${url}:${JSON.stringify(data)}`;
}
function getCachedResponse(url, method, data) {
  const key = getPrefetchCacheKey(url, method, data);
  const cached = prefetchCache.get(key);
  if (!cached) {
    return null;
  }
  if (Date.now() > cached.expiresAt) {
    prefetchCache.delete(key);
    return null;
  }
  return cached.response;
}
function setCachedResponse(url, method, data, response, cacheFor) {
  const key = getPrefetchCacheKey(url, method, data);
  prefetchCache.set(key, {
    response,
    timestamp: Date.now(),
    expiresAt: Date.now() + cacheFor
  });
}
function prefetch(href, options = {}) {
  if (href.startsWith("#")) {
    return Promise.resolve();
  }
  const method = (options.method ?? "get").toLowerCase();
  const data = options.data ?? {};
  const headers = options.headers ?? {};
  const queryStringArrayFormat = options.queryStringArrayFormat ?? "brackets";
  const cacheFor = options.cacheFor ?? 3e4;
  const [url, mergedData] = mergeDataIntoQueryString(method, href || "", data, queryStringArrayFormat);
  const cached = getCachedResponse(url, method, mergedData);
  if (cached) {
    return Promise.resolve();
  }
  const cacheKey = getPrefetchCacheKey(url, method, mergedData);
  const inFlight = prefetchInFlight.get(cacheKey);
  if (inFlight) {
    return inFlight.then(() => {
    });
  }
  options.onPrefetching?.();
  const requestHeaders = {
    ...headers,
    Accept: "text/html, application/xhtml+xml",
    "X-Requested-With": "XMLHttpRequest",
    "X-Inertia": "true",
    "X-Inertia-Version": usePage().version ?? "",
    "X-InertiaUI-Modal": generateId(),
    "X-InertiaUI-Modal-Base-Url": baseUrl.value ?? ""
  };
  const request = Axios({ url, method, data: mergedData, headers: requestHeaders }).then((response) => {
    setCachedResponse(url, method, mergedData, response, cacheFor);
    options.onPrefetched?.();
    return response;
  }).finally(() => {
    prefetchInFlight.delete(cacheKey);
  });
  prefetchInFlight.set(cacheKey, request);
  return request.then(() => {
  });
}
const setComponentResolver = (resolver) => {
  resolveComponent = resolver;
};
const initFromPageProps = (pageProps) => {
  if (pageProps.resolveComponent) {
    resolveComponent = pageProps.resolveComponent;
  }
};
class Modal {
  constructor(component, response, config, onClose, afterLeave) {
    this.getComponentPropKeys = () => {
      if (!this.component) {
        return [];
      }
      const componentProps = this.component.props;
      if (Array.isArray(componentProps)) {
        return componentProps;
      }
      return componentProps ? Object.keys(componentProps) : [];
    };
    this.getParentModal = () => {
      const index = this.index.value;
      if (index < 1) {
        return null;
      }
      return stack.value.slice(0, index).reverse().find((modal) => modal.isOpen);
    };
    this.getChildModal = () => {
      const index = this.index.value;
      if (index === stack.value.length - 1) {
        return null;
      }
      return stack.value.slice(index + 1).find((modal) => modal.isOpen) ?? null;
    };
    this.show = () => {
      const index = this.index.value;
      if (index > -1) {
        if (stack.value[index].isOpen) {
          return;
        }
        stack.value[index].isOpen = true;
        stack.value[index].shouldRender = true;
      }
    };
    this.close = () => {
      const index = this.index.value;
      if (index > -1) {
        if (!stack.value[index].isOpen) {
          return;
        }
        Object.keys(this.listeners).forEach((event) => {
          this.off(event);
        });
        stack.value[index].isOpen = false;
        this.onCloseCallback?.();
        this.onCloseCallback = null;
      }
    };
    this.setOpen = (open) => {
      if (open) {
        this.show();
      } else {
        this.close();
      }
    };
    this.afterLeave = () => {
      const index = this.index.value;
      if (index > -1) {
        if (stack.value[index].isOpen) {
          return;
        }
        stack.value[index].shouldRender = false;
        this.afterLeaveCallback?.();
        this.afterLeaveCallback = null;
      }
      if (index === 0) {
        stack.value = [];
        const savedBaseUrl = baseUrl.value;
        baseUrl.value = null;
        closingToBaseUrlTarget = savedBaseUrl;
        if (savedBaseUrl && typeof window !== "undefined") {
          router.push({
            url: savedBaseUrl,
            preserveScroll: true,
            preserveState: true,
            // Clear _inertiaui_modal prop to prevent modal from reopening
            // Must explicitly set to undefined since props are merged
            props: (currentProps) => {
              const { _inertiaui_modal, ...rest } = currentProps;
              return { ...rest, _inertiaui_modal: void 0 };
            }
          });
        }
      }
    };
    this.on = (event, callback) => {
      event = kebabCase(event);
      this.listeners[event] = this.listeners[event] ?? [];
      this.listeners[event].push(callback);
    };
    this.off = (event, callback) => {
      event = kebabCase(event);
      if (callback) {
        this.listeners[event] = this.listeners[event]?.filter((cb) => cb !== callback) ?? [];
      } else {
        delete this.listeners[event];
      }
    };
    this.emit = (event, ...args) => {
      this.listeners[kebabCase(event)]?.forEach((callback) => callback(...args));
    };
    this.registerEventListenersFromAttrs = ($attrs) => {
      const unsubscribers = [];
      Object.keys($attrs).filter((key) => key.startsWith("on")).forEach((key) => {
        const eventName = kebabCase(key).replace(/^on-/, "");
        const callback = $attrs[key];
        this.on(eventName, callback);
        unsubscribers.push(() => this.off(eventName, callback));
      });
      return () => unsubscribers.forEach((unsub) => unsub());
    };
    this.reload = (options = {}) => {
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
      const method = (options.method ?? "get").toLowerCase();
      const data = options.data ?? {};
      options.onStart?.();
      Axios({
        url: this.response.url,
        method,
        data: method === "get" ? {} : data,
        params: method === "get" ? data : {},
        headers: {
          ...options.headers ?? {},
          Accept: "text/html, application/xhtml+xml",
          "X-Inertia": "true",
          "X-Inertia-Partial-Component": this.response.component,
          "X-Inertia-Version": this.response.version ?? "",
          "X-Inertia-Partial-Data": keys.join(","),
          "X-InertiaUI-Modal": generateId(),
          "X-InertiaUI-Modal-Base-Url": baseUrl.value ?? ""
        }
      }).then((response2) => {
        this.updateProps(response2.data.props);
        options.onSuccess?.(response2);
      }).catch((error) => {
        options.onError?.(error);
      }).finally(() => {
        options.onFinish?.();
      });
    };
    this.updateProps = (props) => {
      Object.assign(this.props.value, props);
    };
    this.id = response.id ?? generateId();
    this.isOpen = false;
    this.shouldRender = false;
    this.listeners = {};
    this.component = component;
    this.props = ref(response.props ?? {});
    this.response = response;
    this.config = config ?? {};
    this.onCloseCallback = onClose ?? null;
    this.afterLeaveCallback = afterLeave ?? null;
    this.index = computed(() => stack.value.findIndex((m) => m.id === this.id));
    this.onTopOfStack = computed(() => {
      if (stack.value.length < 2) {
        return true;
      }
      const modals = stack.value.map((modal) => ({ id: modal.id, shouldRender: modal.shouldRender }));
      return modals.reverse().find((modal) => modal.shouldRender)?.id === this.id;
    });
  }
}
function registerLocalModal(name, callback) {
  localModals.value[name] = { name, callback };
}
function pushLocalModal(name, config, onClose, afterLeave, props) {
  if (!localModals.value[name]) {
    throw new Error(`The local modal "${name}" has not been registered.`);
  }
  const responseData = { props: props ?? {} };
  const modal = push(null, responseData, config, onClose, afterLeave);
  modal.name = name;
  localModals.value[name].callback(modal);
  return modal;
}
function isValidModalResponse(data) {
  return typeof data === "object" && data !== null && "component" in data && typeof data.component === "string";
}
function updateBrowserUrl(url, useBrowserHistory, modalData) {
  if (!url || !useBrowserHistory || typeof window === "undefined") {
    return;
  }
  router.push({
    url,
    preserveScroll: true,
    preserveState: true,
    // Store modal data in page props for history navigation
    // This allows forward/back to restore the modal
    props: modalData ? (currentProps) => ({
      ...currentProps,
      _inertiaui_modal: {
        ...modalData,
        baseUrl: baseUrl.value
      }
    }) : void 0
  });
}
function pushFromResponseData(responseData, config = {}, onClose = null, onAfterLeave = null) {
  if (!resolveComponent) {
    return Promise.reject(new Error("Component resolver not set"));
  }
  if (!isValidModalResponse(responseData)) {
    return Promise.reject(
      new Error(
        "Invalid modal response. This usually happens when the server returns a redirect (e.g., due to session expiration). Check if the user is still authenticated."
      )
    );
  }
  return resolveComponent(responseData.component).then(
    (component) => push(markRaw(component), responseData, config, onClose, onAfterLeave)
  );
}
function visit(href, method, payload = {}, headers = {}, config = {}, onClose = null, onAfterLeave = null, queryStringArrayFormat = "brackets", useBrowserHistory = false, onStart = null, onSuccess = null, onError = null, props = null) {
  const modalId = generateId();
  return new Promise((resolve, reject) => {
    if (href.startsWith("#")) {
      resolve(pushLocalModal(href.substring(1), config, onClose, onAfterLeave, props));
      return;
    }
    const [url, data] = mergeDataIntoQueryString(method, href || "", payload, queryStringArrayFormat);
    const cachedResponse = getCachedResponse(url, method, data);
    if (cachedResponse) {
      onSuccess?.(cachedResponse);
      pushFromResponseData(cachedResponse.data, config, onClose, onAfterLeave).then((modal) => {
        updateBrowserUrl(cachedResponse.data.url, useBrowserHistory, cachedResponse.data);
        resolve(modal);
      }).catch(reject);
      return;
    }
    if (stack.value.length === 0) {
      baseUrl.value = typeof window !== "undefined" ? window.location.href : "";
    }
    const requestHeaders = {
      ...headers,
      Accept: "text/html, application/xhtml+xml",
      "X-Requested-With": "XMLHttpRequest",
      "X-Inertia": "true",
      "X-Inertia-Version": usePage().version ?? "",
      "X-InertiaUI-Modal": modalId,
      "X-InertiaUI-Modal-Base-Url": baseUrl.value ?? ""
    };
    onStart?.();
    progress?.start();
    Axios({ url, method, data, headers: requestHeaders }).then((response) => {
      onSuccess?.(response);
      pushFromResponseData(response.data, config, onClose, onAfterLeave).then((modal) => {
        updateBrowserUrl(response.data.url, useBrowserHistory, response.data);
        resolve(modal);
      }).catch(reject);
    }).catch((...args) => {
      onError?.(...args);
      reject(args[0]);
    }).finally(() => {
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
  stack.value.push(newModal);
  loadDeferredProps(newModal);
  nextTick(() => newModal.show());
  return newModal;
}
const modalPropNames = ["closeButton", "closeExplicitly", "closeOnClickOutside", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"];
const renderApp = (App, props) => {
  if (props.resolveComponent) {
    resolveComponent = props.resolveComponent;
  }
  return () => h(_sfc_main$8, () => h(App, props));
};
function useModalStack() {
  return {
    setComponentResolver,
    getBaseUrl: () => baseUrl.value,
    setBaseUrl: (url) => baseUrl.value = url,
    isClosingToBaseUrl: (pageUrl) => {
      if (!closingToBaseUrlTarget) return false;
      const targetPath = new URL(closingToBaseUrlTarget, "http://x").pathname;
      const pagePath = new URL(pageUrl, "http://x").pathname;
      return targetPath === pagePath;
    },
    clearClosingToBaseUrl: () => closingToBaseUrlTarget = null,
    stack: readonly(stack),
    push,
    pushFromResponseData,
    closeAll: (force = false) => {
      if (force) {
        stack.value = [];
      } else {
        [...stack.value].reverse().forEach((modal) => modal.close());
      }
    },
    reset: () => stack.value = [],
    visit,
    registerLocalModal,
    removeLocalModal: (name) => delete localModals.value[name]
  };
}
function useModal() {
  return toValue(inject("modalContext", null));
}
const _sfc_main$7 = {
  __name: "Deferred",
  props: {
    data: {
      type: [String, Array],
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const modalContext = inject("modalContext");
    if (!modalContext) {
      throw new Error("Deferred component must be used inside a Modal component");
    }
    const allKeysAreAvailable = computed(() => {
      const keys = Array.isArray(props.data) ? props.data : [props.data];
      return keys.every((key) => modalContext.value.props[key] !== void 0);
    });
    return (_ctx, _cache) => {
      return allKeysAreAvailable.value ? renderSlot(_ctx.$slots, "default", { key: 0 }) : renderSlot(_ctx.$slots, "fallback", { key: 1 });
    };
  }
};
const _sfc_main$6 = /* @__PURE__ */ Object.assign({
  inheritAttrs: false
}, {
  __name: "HeadlessModal",
  props: {
    name: {
      type: String,
      required: false
    },
    // The slideover prop is on top because we need to know if it's a slideover
    // before we can determine the default value of other props
    slideover: {
      type: Boolean,
      default: null
    },
    closeButton: {
      type: Boolean,
      default: null
    },
    closeExplicitly: {
      type: Boolean,
      default: null
    },
    closeOnClickOutside: {
      type: Boolean,
      default: null
    },
    maxWidth: {
      type: String,
      default: null
    },
    paddingClasses: {
      type: [Boolean, String],
      default: null
    },
    panelClasses: {
      type: [Boolean, String],
      default: null
    },
    position: {
      type: String,
      default: null
    }
  },
  emits: ["modal-event", "focus", "blur", "close", "success"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const modalStack = useModalStack();
    const modalContext = props.name ? ref({}) : inject("modalContext");
    const config = computed(() => {
      const isSlideover = modalContext.value.config?.slideover ?? props.slideover ?? getConfig("type") === "slideover";
      return {
        slideover: isSlideover,
        closeButton: props.closeButton ?? getConfigByType(isSlideover, "closeButton"),
        closeExplicitly: props.closeExplicitly ?? getConfigByType(isSlideover, "closeExplicitly"),
        closeOnClickOutside: props.closeOnClickOutside ?? getConfigByType(isSlideover, "closeOnClickOutside"),
        maxWidth: props.maxWidth ?? getConfigByType(isSlideover, "maxWidth"),
        paddingClasses: props.paddingClasses ?? getConfigByType(isSlideover, "paddingClasses"),
        panelClasses: props.panelClasses ?? getConfigByType(isSlideover, "panelClasses"),
        position: props.position ?? getConfigByType(isSlideover, "position"),
        ...modalContext.value.config
      };
    });
    if (props.name) {
      modalStack.registerLocalModal(props.name, function(context) {
        modalContext.value = context;
        registerEventListeners();
      });
      onBeforeUnmount(() => {
        modalStack.removeLocalModal(props.name);
      });
    }
    onMounted(() => {
      if (!props.name) {
        registerEventListeners();
      }
    });
    const unsubscribeEventListeners = ref(null);
    onBeforeUnmount(() => unsubscribeEventListeners.value?.());
    const $attrs = useAttrs();
    function registerEventListeners() {
      unsubscribeEventListeners.value = modalContext.value.registerEventListenersFromAttrs($attrs);
    }
    const emits = __emit;
    function emit(event, ...args) {
      emits("modal-event", event, ...args);
    }
    __expose({
      emit,
      afterLeave: () => modalContext.value?.afterLeave(),
      close: () => modalContext.value?.close(),
      reload: (...args) => modalContext.value?.reload(...args),
      setOpen: (...args) => modalContext.value?.setOpen(...args),
      getChildModal: () => modalContext.value?.getChildModal(),
      getParentModal: () => modalContext.value?.getParentModal(),
      get config() {
        return modalContext.value?.config;
      },
      get id() {
        return modalContext.value?.id;
      },
      get index() {
        return modalContext.value?.index;
      },
      get isOpen() {
        return modalContext.value?.isOpen;
      },
      get modalContext() {
        return modalContext.value?.modalContext;
      },
      get onTopOfStack() {
        return modalContext.value?.onTopOfStack;
      },
      get shouldRender() {
        return modalContext.value?.shouldRender;
      }
    });
    watch(
      () => modalContext.value?.onTopOfStack,
      (onTopOfStack, previousOnTopOfStack) => {
        if (onTopOfStack && !previousOnTopOfStack) {
          emits("focus");
        } else if (!onTopOfStack && previousOnTopOfStack) {
          emits("blur");
        }
      }
    );
    watch(
      () => modalContext.value?.isOpen,
      (isOpen, previousIsOpen) => {
        if (isOpen) {
          emits("success");
        } else if (previousIsOpen === true) {
          emits("close");
        }
      },
      { immediate: true }
    );
    const nextIndex = computed(() => {
      return modalStack.stack.value.find((m) => m.shouldRender && m.index > modalContext.value.index)?.index;
    });
    const modalProps = computed(() => {
      const ctx = modalContext.value;
      if (!ctx) return {};
      return unref(ctx.props) ?? {};
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        unref(modalContext).shouldRender ? renderSlot(_ctx.$slots, "default", mergeProps({ key: 0 }, modalProps.value, {
          id: unref(modalContext).id,
          afterLeave: unref(modalContext).afterLeave,
          close: unref(modalContext).close,
          config: config.value,
          emit,
          getChildModal: unref(modalContext).getChildModal,
          getParentModal: unref(modalContext).getParentModal,
          index: unref(modalContext).index,
          isOpen: unref(modalContext).isOpen,
          modalContext: unref(modalContext),
          onTopOfStack: unref(modalContext).onTopOfStack,
          reload: unref(modalContext).reload,
          setOpen: unref(modalContext).setOpen,
          shouldRender: unref(modalContext).shouldRender
        })) : createCommentVNode("", true),
        nextIndex.value ? (openBlock(), createBlock(_sfc_main$9, {
          key: 1,
          index: nextIndex.value
        }, null, 8, ["index"])) : createCommentVNode("", true)
      ], 64);
    };
  }
});
const _sfc_main$5 = {
  __name: "CloseButton",
  setup(__props) {
    const modal = useModal();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", {
        type: "button",
        class: "im-close-button text-gray-400 hover:text-gray-500",
        onClick: _cache[0] || (_cache[0] = ($event) => unref(modal).close())
      }, [..._cache[1] || (_cache[1] = [
        createElementVNode("span", { class: "sr-only" }, "Close", -1),
        createElementVNode("svg", {
          class: "size-6",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "2",
          stroke: "currentColor",
          "aria-hidden": "true"
        }, [
          createElementVNode("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M6 18L18 6M6 6l12 12"
          })
        ], -1)
      ])]);
    };
  }
};
const maxWidthClasses = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-md md:max-w-lg",
  xl: "sm:max-w-md md:max-w-xl",
  "2xl": "sm:max-w-md md:max-w-xl lg:max-w-2xl",
  "3xl": "sm:max-w-md md:max-w-xl lg:max-w-3xl",
  "4xl": "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl",
  "5xl": "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl",
  "6xl": "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl",
  "7xl": "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl"
};
const defaultMaxWidth = "2xl";
function getMaxWidthClass(maxWidth) {
  return maxWidthClasses[maxWidth] || maxWidthClasses[defaultMaxWidth];
}
const _hoisted_1$2 = { class: "im-modal-container fixed inset-0 overflow-y-auto p-4" };
const _hoisted_2$2 = ["data-inertiaui-modal-entered"];
const _hoisted_3$1 = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
};
const _hoisted_4$1 = ["data-inertiaui-modal-entered"];
const _hoisted_5$1 = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
};
const _sfc_main$4 = {
  __name: "ModalContent",
  props: {
    modalContext: Object,
    config: Object,
    useNativeDialog: Boolean,
    isFirstModal: Boolean
  },
  emits: ["after-leave"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isRendered = ref(false);
    const isVisible = ref(false);
    const entered = ref(false);
    const wrapperRef = ref(null);
    const dialogRef = ref(null);
    const nativeWrapperRef = ref(null);
    let cleanupFocusTrap = null;
    let cleanupEscapeKey = null;
    const maxWidthClass = computed(() => getMaxWidthClass(props.config.maxWidth));
    async function animateIn(element) {
      if (!element) return;
      isVisible.value = true;
      await animate(element, [
        { transform: "translate3d(0, 1rem, 0) scale(0.95)", opacity: 0 },
        { transform: "translate3d(0, 0, 0) scale(1)", opacity: 1 }
      ]);
      entered.value = true;
      setupFocusTrap();
    }
    async function animateOut(element) {
      if (!element) return;
      isVisible.value = false;
      await animate(element, [
        { transform: "translate3d(0, 0, 0) scale(1)", opacity: 1 },
        { transform: "translate3d(0, 1rem, 0) scale(0.95)", opacity: 0 }
      ]);
      isRendered.value = false;
      if (props.useNativeDialog && dialogRef.value) {
        dialogRef.value.close();
      }
      emit("after-leave");
      props.modalContext.afterLeave();
    }
    function show() {
      isRendered.value = true;
      nextTick(() => {
        const wrapper = props.useNativeDialog ? nativeWrapperRef.value : wrapperRef.value;
        animateIn(wrapper);
      });
    }
    function hide() {
      entered.value = false;
      const wrapper = props.useNativeDialog ? nativeWrapperRef.value : wrapperRef.value;
      animateOut(wrapper);
    }
    function setupFocusTrap() {
      if (props.useNativeDialog) return;
      if (!wrapperRef.value || !props.modalContext.onTopOfStack) return;
      if (cleanupFocusTrap) return;
      cleanupFocusTrap = createFocusTrap(wrapperRef.value, {
        initialFocus: true,
        returnFocus: false
      });
    }
    function cleanupFocusTrap_() {
      if (cleanupFocusTrap) {
        cleanupFocusTrap();
        cleanupFocusTrap = null;
      }
    }
    function setupEscapeKey() {
      if (props.useNativeDialog) return;
      if (cleanupEscapeKey) return;
      if (props.config?.closeExplicitly) return;
      cleanupEscapeKey = onEscapeKey(() => {
        if (props.modalContext.onTopOfStack) {
          props.modalContext.close();
        }
      });
    }
    function cleanupEscapeKey_() {
      if (cleanupEscapeKey) {
        cleanupEscapeKey();
        cleanupEscapeKey = null;
      }
    }
    function handleClickOutside(event) {
      if (props.useNativeDialog) return;
      if (!props.modalContext.onTopOfStack) return;
      if (props.config?.closeExplicitly) return;
      if (props.config?.closeOnClickOutside === false) return;
      if (!wrapperRef.value) return;
      if (!wrapperRef.value.contains(event.target)) {
        props.modalContext.close();
      }
    }
    function handleCancel(event) {
      event.preventDefault();
      if (props.modalContext.onTopOfStack && !props.config?.closeExplicitly) {
        props.modalContext.close();
      }
    }
    function handleDialogClick(event) {
      if (event.target === dialogRef.value) {
        if (props.modalContext.onTopOfStack && !props.config?.closeExplicitly && props.config?.closeOnClickOutside !== false) {
          props.modalContext.close();
        }
      }
    }
    function openDialog() {
      if (dialogRef.value && !dialogRef.value.open) {
        dialogRef.value.showModal();
        nextTick(() => {
          animateIn(nativeWrapperRef.value);
        });
      }
    }
    function closeDialog() {
      if (dialogRef.value && dialogRef.value.open) {
        entered.value = false;
        animateOut(nativeWrapperRef.value);
      }
    }
    onMounted(() => {
      if (props.useNativeDialog) {
        if (props.modalContext.isOpen) {
          openDialog();
        }
      } else {
        setupEscapeKey();
        if (props.modalContext.isOpen) {
          show();
        }
      }
    });
    onUnmounted(() => {
      const wrapper = props.useNativeDialog ? nativeWrapperRef.value : wrapperRef.value;
      if (wrapper) {
        cancelAnimations(wrapper);
      }
      if (props.useNativeDialog) {
        if (dialogRef.value?.open) {
          dialogRef.value.close();
        }
      } else {
        cleanupFocusTrap_();
        cleanupEscapeKey_();
      }
    });
    watch(
      () => props.modalContext.onTopOfStack,
      (onTop) => {
        if (props.useNativeDialog) return;
        if (onTop) {
          setupEscapeKey();
          if (entered.value) {
            setupFocusTrap();
          }
        } else {
          cleanupFocusTrap_();
          cleanupEscapeKey_();
        }
      }
    );
    watch(
      () => props.modalContext.isOpen,
      (isOpen) => {
        if (props.useNativeDialog) {
          if (isOpen) {
            openDialog();
          } else {
            closeDialog();
          }
        } else {
          if (isOpen) {
            show();
          } else {
            hide();
          }
        }
      }
    );
    return (_ctx, _cache) => {
      return __props.useNativeDialog ? (openBlock(), createElementBlock("dialog", {
        key: 0,
        ref_key: "dialogRef",
        ref: dialogRef,
        class: normalizeClass([
          "im-modal-dialog m-0 overflow-visible bg-transparent p-0",
          "size-full max-h-none max-w-none",
          "backdrop:bg-black/75 backdrop:transition-opacity backdrop:duration-300",
          isVisible.value ? "backdrop:opacity-100" : "backdrop:opacity-0",
          !__props.isFirstModal && "backdrop:bg-transparent"
        ]),
        onCancel: handleCancel,
        onClick: handleDialogClick
      }, [
        createElementVNode("div", _hoisted_1$2, [
          createElementVNode("div", {
            class: normalizeClass(["im-modal-positioner flex min-h-full justify-center", {
              "items-start": __props.config.position === "top",
              "items-center": __props.config.position === "center",
              "items-end": __props.config.position === "bottom"
            }])
          }, [
            createElementVNode("div", {
              ref_key: "nativeWrapperRef",
              ref: nativeWrapperRef,
              class: normalizeClass([
                "im-modal-wrapper w-full transition-[filter] duration-300",
                __props.modalContext.onTopOfStack ? "" : "blur-xs",
                maxWidthClass.value
              ])
            }, [
              createElementVNode("div", {
                class: normalizeClass(["im-modal-content relative", [__props.config.paddingClasses, __props.config.panelClasses]]),
                "data-inertiaui-modal-entered": entered.value
              }, [
                __props.config.closeButton ? (openBlock(), createElementBlock("div", _hoisted_3$1, [
                  createVNode(_sfc_main$5)
                ])) : createCommentVNode("", true),
                renderSlot(_ctx.$slots, "default", {
                  modalContext: __props.modalContext,
                  config: __props.config
                })
              ], 10, _hoisted_2$2)
            ], 2)
          ], 2)
        ])
      ], 34)) : isRendered.value ? (openBlock(), createElementBlock("div", {
        key: 1,
        class: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4",
        onMousedown: withModifiers(handleClickOutside, ["self"])
      }, [
        createElementVNode("div", {
          class: normalizeClass(["im-modal-positioner flex min-h-full justify-center", {
            "items-start": __props.config.position === "top",
            "items-center": __props.config.position === "center",
            "items-end": __props.config.position === "bottom"
          }]),
          onMousedown: withModifiers(handleClickOutside, ["self"])
        }, [
          createElementVNode("div", {
            ref_key: "wrapperRef",
            ref: wrapperRef,
            role: "dialog",
            "aria-modal": "true",
            class: normalizeClass([
              "im-modal-wrapper w-full transition-[filter] duration-300",
              __props.modalContext.onTopOfStack ? "" : "blur-xs",
              maxWidthClass.value
            ])
          }, [
            _cache[0] || (_cache[0] = createElementVNode("span", { class: "sr-only" }, "Dialog", -1)),
            createElementVNode("div", {
              class: normalizeClass(["im-modal-content relative", [__props.config.paddingClasses, __props.config.panelClasses]]),
              "data-inertiaui-modal-entered": entered.value
            }, [
              __props.config.closeButton ? (openBlock(), createElementBlock("div", _hoisted_5$1, [
                createVNode(_sfc_main$5)
              ])) : createCommentVNode("", true),
              renderSlot(_ctx.$slots, "default", {
                modalContext: __props.modalContext,
                config: __props.config
              })
            ], 10, _hoisted_4$1)
          ], 2)
        ], 34)
      ], 32)) : createCommentVNode("", true);
    };
  }
};
const _hoisted_1$1 = { class: "im-slideover-container fixed inset-0 overflow-y-auto overflow-x-hidden" };
const _hoisted_2$1 = ["data-inertiaui-modal-entered"];
const _hoisted_3 = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
};
const _hoisted_4 = ["data-inertiaui-modal-entered"];
const _hoisted_5 = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
};
const _sfc_main$3 = {
  __name: "SlideoverContent",
  props: {
    modalContext: Object,
    config: Object,
    useNativeDialog: Boolean,
    isFirstModal: Boolean
  },
  emits: ["after-leave"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isRendered = ref(false);
    const isVisible = ref(false);
    const entered = ref(false);
    const wrapperRef = ref(null);
    const dialogRef = ref(null);
    const nativeWrapperRef = ref(null);
    let cleanupFocusTrap = null;
    let cleanupEscapeKey = null;
    const maxWidthClass = computed(() => getMaxWidthClass(props.config.maxWidth));
    const getTranslateX = () => props.config.position === "left" ? "-100%" : "100%";
    async function animateIn(element) {
      if (!element) return;
      isVisible.value = true;
      const translateX = getTranslateX();
      await animate(element, [
        { transform: `translate3d(${translateX}, 0, 0)`, opacity: 0 },
        { transform: "translate3d(0, 0, 0)", opacity: 1 }
      ]);
      entered.value = true;
      setupFocusTrap();
    }
    async function animateOut(element) {
      if (!element) return;
      isVisible.value = false;
      const translateX = getTranslateX();
      await animate(element, [
        { transform: "translate3d(0, 0, 0)", opacity: 1 },
        { transform: `translate3d(${translateX}, 0, 0)`, opacity: 0 }
      ]);
      isRendered.value = false;
      if (props.useNativeDialog && dialogRef.value) {
        dialogRef.value.close();
      }
      emit("after-leave");
      props.modalContext.afterLeave();
    }
    function show() {
      isRendered.value = true;
      nextTick(() => {
        const wrapper = props.useNativeDialog ? nativeWrapperRef.value : wrapperRef.value;
        animateIn(wrapper);
      });
    }
    function hide() {
      entered.value = false;
      const wrapper = props.useNativeDialog ? nativeWrapperRef.value : wrapperRef.value;
      animateOut(wrapper);
    }
    function setupFocusTrap() {
      if (props.useNativeDialog) return;
      if (!wrapperRef.value || !props.modalContext.onTopOfStack) return;
      if (cleanupFocusTrap) return;
      cleanupFocusTrap = createFocusTrap(wrapperRef.value, {
        initialFocus: true,
        returnFocus: false
      });
    }
    function cleanupFocusTrap_() {
      if (cleanupFocusTrap) {
        cleanupFocusTrap();
        cleanupFocusTrap = null;
      }
    }
    function setupEscapeKey() {
      if (props.useNativeDialog) return;
      if (cleanupEscapeKey) return;
      if (props.config?.closeExplicitly) return;
      cleanupEscapeKey = onEscapeKey(() => {
        if (props.modalContext.onTopOfStack) {
          props.modalContext.close();
        }
      });
    }
    function cleanupEscapeKey_() {
      if (cleanupEscapeKey) {
        cleanupEscapeKey();
        cleanupEscapeKey = null;
      }
    }
    function handleClickOutside(event) {
      if (props.useNativeDialog) return;
      if (!props.modalContext.onTopOfStack) return;
      if (props.config?.closeExplicitly) return;
      if (props.config?.closeOnClickOutside === false) return;
      if (!wrapperRef.value) return;
      if (!wrapperRef.value.contains(event.target)) {
        props.modalContext.close();
      }
    }
    function handleCancel(event) {
      event.preventDefault();
      if (props.modalContext.onTopOfStack && !props.config?.closeExplicitly) {
        props.modalContext.close();
      }
    }
    function handleDialogClick(event) {
      if (event.target === dialogRef.value) {
        if (props.modalContext.onTopOfStack && !props.config?.closeExplicitly && props.config?.closeOnClickOutside !== false) {
          props.modalContext.close();
        }
      }
    }
    function openDialog() {
      if (dialogRef.value && !dialogRef.value.open) {
        dialogRef.value.showModal();
        nextTick(() => {
          animateIn(nativeWrapperRef.value);
        });
      }
    }
    function closeDialog() {
      if (dialogRef.value && dialogRef.value.open) {
        entered.value = false;
        animateOut(nativeWrapperRef.value);
      }
    }
    onMounted(() => {
      if (props.useNativeDialog) {
        if (props.modalContext.isOpen) {
          openDialog();
        }
      } else {
        setupEscapeKey();
        if (props.modalContext.isOpen) {
          show();
        }
      }
    });
    onUnmounted(() => {
      const wrapper = props.useNativeDialog ? nativeWrapperRef.value : wrapperRef.value;
      if (wrapper) {
        cancelAnimations(wrapper);
      }
      if (props.useNativeDialog) {
        if (dialogRef.value?.open) {
          dialogRef.value.close();
        }
      } else {
        cleanupFocusTrap_();
        cleanupEscapeKey_();
      }
    });
    watch(
      () => props.modalContext.onTopOfStack,
      (onTop) => {
        if (props.useNativeDialog) return;
        if (onTop) {
          setupEscapeKey();
          if (entered.value) {
            setupFocusTrap();
          }
        } else {
          cleanupFocusTrap_();
          cleanupEscapeKey_();
        }
      }
    );
    watch(
      () => props.modalContext.isOpen,
      (isOpen) => {
        if (props.useNativeDialog) {
          if (isOpen) {
            openDialog();
          } else {
            closeDialog();
          }
        } else {
          if (isOpen) {
            show();
          } else {
            hide();
          }
        }
      }
    );
    return (_ctx, _cache) => {
      return __props.useNativeDialog ? (openBlock(), createElementBlock("dialog", {
        key: 0,
        ref_key: "dialogRef",
        ref: dialogRef,
        class: normalizeClass([
          "im-slideover-dialog m-0 overflow-visible bg-transparent p-0",
          "size-full max-h-none max-w-none",
          "backdrop:bg-black/75 backdrop:transition-opacity backdrop:duration-300",
          isVisible.value ? "backdrop:opacity-100" : "backdrop:opacity-0",
          !__props.isFirstModal && "backdrop:bg-transparent"
        ]),
        onCancel: handleCancel,
        onClick: handleDialogClick
      }, [
        createElementVNode("div", _hoisted_1$1, [
          createElementVNode("div", {
            class: normalizeClass(["im-slideover-positioner flex min-h-full items-center", {
              "justify-start rtl:justify-end": __props.config.position === "left",
              "justify-end rtl:justify-start": __props.config.position === "right"
            }])
          }, [
            createElementVNode("div", {
              ref_key: "nativeWrapperRef",
              ref: nativeWrapperRef,
              class: normalizeClass([
                "im-slideover-wrapper w-full transition-[filter] duration-300",
                __props.modalContext.onTopOfStack ? "" : "blur-xs",
                maxWidthClass.value
              ])
            }, [
              createElementVNode("div", {
                class: normalizeClass(["im-slideover-content relative", [__props.config.paddingClasses, __props.config.panelClasses]]),
                "data-inertiaui-modal-entered": entered.value
              }, [
                __props.config.closeButton ? (openBlock(), createElementBlock("div", _hoisted_3, [
                  createVNode(_sfc_main$5)
                ])) : createCommentVNode("", true),
                renderSlot(_ctx.$slots, "default", {
                  modalContext: __props.modalContext,
                  config: __props.config
                })
              ], 10, _hoisted_2$1)
            ], 2)
          ], 2)
        ])
      ], 34)) : isRendered.value ? (openBlock(), createElementBlock("div", {
        key: 1,
        class: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden",
        onMousedown: withModifiers(handleClickOutside, ["self"])
      }, [
        createElementVNode("div", {
          class: normalizeClass(["im-slideover-positioner flex min-h-full items-center", {
            "justify-start rtl:justify-end": __props.config.position === "left",
            "justify-end rtl:justify-start": __props.config.position === "right"
          }]),
          onMousedown: withModifiers(handleClickOutside, ["self"])
        }, [
          createElementVNode("div", {
            ref_key: "wrapperRef",
            ref: wrapperRef,
            role: "dialog",
            "aria-modal": "true",
            class: normalizeClass([
              "im-slideover-wrapper w-full transition-[filter] duration-300",
              __props.modalContext.onTopOfStack ? "" : "blur-xs",
              maxWidthClass.value
            ])
          }, [
            _cache[0] || (_cache[0] = createElementVNode("span", { class: "sr-only" }, "Dialog", -1)),
            createElementVNode("div", {
              class: normalizeClass(["im-slideover-content relative", [__props.config.paddingClasses, __props.config.panelClasses]]),
              "data-inertiaui-modal-entered": entered.value
            }, [
              __props.config.closeButton ? (openBlock(), createElementBlock("div", _hoisted_5, [
                createVNode(_sfc_main$5)
              ])) : createCommentVNode("", true),
              renderSlot(_ctx.$slots, "default", {
                modalContext: __props.modalContext,
                config: __props.config
              })
            ], 10, _hoisted_4)
          ], 2)
        ], 34)
      ], 32)) : createCommentVNode("", true);
    };
  }
};
const _hoisted_1 = ["data-inertiaui-modal-id", "data-inertiaui-modal-index", "aria-hidden"];
const _hoisted_2 = {
  key: 0,
  class: "im-backdrop fixed inset-0 z-30 bg-black/75"
};
const _sfc_main$2 = {
  __name: "Modal",
  emits: ["after-leave", "blur", "close", "focus", "success"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const modal = ref(null);
    const rendered = ref(false);
    const emits = __emit;
    __expose({
      afterLeave: () => modal.value?.afterLeave(),
      close: () => modal.value?.close(),
      emit: (...args) => modal.value?.emit(...args),
      getChildModal: () => modal.value?.getChildModal(),
      getParentModal: () => modal.value?.getParentModal(),
      reload: (...args) => modal.value?.reload(...args),
      setOpen: (...args) => modal.value?.setOpen(...args),
      get config() {
        return modal.value?.config;
      },
      get id() {
        return modal.value?.id;
      },
      get index() {
        return modal.value?.index;
      },
      get isOpen() {
        return modal.value?.isOpen;
      },
      get modalContext() {
        return modal.value?.modalContext;
      },
      get onTopOfStack() {
        return modal.value?.onTopOfStack;
      },
      get shouldRender() {
        return modal.value?.shouldRender;
      }
    });
    let cleanupScrollLock = null;
    let cleanupAriaHidden = null;
    onMounted(() => {
      if (modal.value?.isOpen && !cleanupScrollLock) {
        cleanupScrollLock = lockScroll();
        cleanupAriaHidden = markAriaHidden(getConfig("appElement"));
      }
    });
    onUnmounted(() => {
      cleanupScrollLock?.();
      cleanupAriaHidden?.();
    });
    function onSuccessEvent() {
      emits("success");
      if (!cleanupScrollLock) {
        cleanupScrollLock = lockScroll();
        cleanupAriaHidden = markAriaHidden(getConfig("appElement"));
      }
    }
    function onCloseEvent() {
      emits("close");
      cleanupScrollLock?.();
      cleanupAriaHidden?.();
      cleanupScrollLock = null;
      cleanupAriaHidden = null;
    }
    const useNativeDialog = computed(() => getConfig("useNativeDialog"));
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$6, {
        ref_key: "modal",
        ref: modal,
        onSuccess: onSuccessEvent,
        onClose: onCloseEvent,
        onFocus: _cache[2] || (_cache[2] = ($event) => emits("focus")),
        onBlur: _cache[3] || (_cache[3] = ($event) => emits("blur"))
      }, {
        default: withCtx(({
          afterLeave,
          close,
          config,
          emit,
          getChildModal,
          getParentModal,
          id,
          index,
          isOpen,
          modalContext,
          onTopOfStack,
          reload,
          setOpen,
          shouldRender,
          ...props
        }) => [
          (openBlock(), createBlock(Teleport, { to: "body" }, [
            createElementVNode("div", {
              "data-inertiaui-modal-id": id,
              "data-inertiaui-modal-index": index,
              class: "im-dialog relative z-20",
              "aria-hidden": !onTopOfStack
            }, [
              index === 0 && !useNativeDialog.value ? (openBlock(), createBlock(Transition, {
                key: 0,
                appear: !rendered.value,
                "enter-active-class": "transition transform ease-in-out duration-300",
                "enter-from-class": "opacity-0",
                "enter-to-class": "opacity-100",
                "leave-active-class": "transition transform ease-in-out duration-300",
                "leave-from-class": "opacity-100",
                "leave-to-class": "opacity-0",
                onAfterAppear: _cache[0] || (_cache[0] = ($event) => rendered.value = true)
              }, {
                default: withCtx(() => [
                  isOpen ? (openBlock(), createElementBlock("div", _hoisted_2)) : createCommentVNode("", true)
                ]),
                _: 2
              }, 1032, ["appear"])) : createCommentVNode("", true),
              (openBlock(), createBlock(resolveDynamicComponent(config?.slideover ? _sfc_main$3 : _sfc_main$4), {
                "modal-context": modalContext,
                config,
                "use-native-dialog": useNativeDialog.value,
                "is-first-modal": index === 0,
                onAfterLeave: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("after-leave"))
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", mergeProps(props, {
                    id,
                    afterLeave,
                    close,
                    config,
                    emit,
                    getChildModal,
                    getParentModal,
                    index,
                    isOpen,
                    modalContext,
                    onTopOfStack,
                    reload,
                    setOpen,
                    shouldRender
                  }))
                ]),
                _: 2
              }, 1064, ["modal-context", "config", "use-native-dialog", "is-first-modal"]))
            ], 8, _hoisted_1)
          ]))
        ]),
        _: 3
      }, 512);
    };
  }
};
const _sfc_main$1 = {
  __name: "ModalLink",
  props: {
    href: {
      type: String,
      required: true
    },
    method: {
      type: String,
      default: "get"
    },
    data: {
      type: Object,
      default: () => ({})
    },
    as: {
      type: [String, Object],
      default: "a"
    },
    headers: {
      type: Object,
      default: () => ({})
    },
    queryStringArrayFormat: {
      type: String,
      default: "brackets"
    },
    navigate: {
      type: Boolean,
      default: null
    },
    // Prefetch options (#146)
    prefetch: {
      type: [Boolean, String, Array],
      default: false
    },
    cacheFor: {
      type: Number,
      default: 3e4
    },
    // Passthrough to Modal.vue
    closeButton: {
      type: Boolean,
      required: false,
      default: null
    },
    closeExplicitly: {
      type: Boolean,
      required: false,
      default: null
    },
    closeOnClickOutside: {
      type: Boolean,
      required: false,
      default: null
    },
    maxWidth: {
      type: String,
      required: false,
      default: null
    },
    paddingClasses: {
      type: [Boolean, String],
      required: false,
      default: null
    },
    panelClasses: {
      type: [Boolean, String],
      required: false,
      default: null
    },
    position: {
      type: String,
      required: false,
      default: null
    },
    slideover: {
      type: Boolean,
      required: false,
      default: null
    }
  },
  emits: ["after-leave", "blur", "close", "error", "focus", "start", "success", "prefetching", "prefetched"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const loading = ref(false);
    const modalStack = useModalStack();
    const modalContext = ref(null);
    provide("modalContext", modalContext);
    const emit = __emit;
    const isBlurred = ref(false);
    const shouldNavigate = computed(() => {
      return props.navigate ?? getConfig("navigate");
    });
    const hoverTimeout = ref(null);
    const prefetchModes = computed(() => {
      if (props.prefetch === true) {
        return ["hover"];
      }
      if (props.prefetch === false) {
        return [];
      }
      if (Array.isArray(props.prefetch)) {
        return props.prefetch;
      }
      return [props.prefetch];
    });
    function doPrefetch() {
      prefetch(props.href, {
        method: props.method,
        data: props.data,
        headers: props.headers,
        queryStringArrayFormat: props.queryStringArrayFormat,
        cacheFor: props.cacheFor,
        onPrefetching: () => emit("prefetching"),
        onPrefetched: () => emit("prefetched")
      });
    }
    function onMouseenter() {
      if (!prefetchModes.value.includes("hover")) return;
      hoverTimeout.value = setTimeout(() => {
        doPrefetch();
      }, 75);
    }
    function onMouseleave() {
      if (hoverTimeout.value) {
        clearTimeout(hoverTimeout.value);
        hoverTimeout.value = null;
      }
    }
    function onMousedown(event) {
      if (!prefetchModes.value.includes("click")) return;
      if (event.button !== 0) return;
      doPrefetch();
    }
    onMounted(() => {
      if (prefetchModes.value.includes("mount")) {
        doPrefetch();
      }
    });
    watch(
      () => modalContext.value?.onTopOfStack,
      (onTopOfStack) => {
        if (modalContext.value) {
          if (onTopOfStack && isBlurred.value) {
            emit("focus");
          } else if (!onTopOfStack) {
            emit("blur");
          }
          isBlurred.value = !onTopOfStack;
        }
      }
    );
    const unsubscribeEventListeners = ref(null);
    onBeforeUnmount(() => {
      unsubscribeEventListeners.value?.();
      if (hoverTimeout.value) {
        clearTimeout(hoverTimeout.value);
      }
    });
    const $attrs = useAttrs();
    function registerEventListeners() {
      unsubscribeEventListeners.value = modalContext.value.registerEventListenersFromAttrs($attrs);
    }
    watch(modalContext, (value, oldValue) => {
      if (value && !oldValue) {
        registerEventListeners();
        emit("success");
      }
    });
    function onClose() {
      emit("close");
    }
    function onAfterLeave() {
      modalContext.value = null;
      emit("after-leave");
    }
    function handle() {
      if (loading.value) {
        return;
      }
      if (!props.href.startsWith("#")) {
        loading.value = true;
        emit("start");
      }
      modalStack.visit(
        props.href,
        props.method,
        props.data,
        props.headers,
        rejectNullValues(only(props, modalPropNames)),
        onClose,
        onAfterLeave,
        props.queryStringArrayFormat,
        shouldNavigate.value
      ).then((context) => {
        modalContext.value = context;
      }).catch((error) => {
        console.error(error);
        emit("error", error);
      }).finally(() => loading.value = false);
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(__props.as), mergeProps(unref($attrs), {
        href: __props.href,
        onClick: withModifiers(handle, ["prevent"]),
        onMouseenter,
        onMouseleave,
        onMousedown
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", { loading: loading.value })
        ]),
        _: 3
      }, 16, ["href"]);
    };
  }
};
const _sfc_main = {
  __name: "WhenVisible",
  props: {
    data: [String, Array],
    params: Object,
    buffer: { type: Number, default: 0 },
    as: { type: String, default: "div" },
    always: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const modalContext = inject("modalContext");
    if (!modalContext) {
      throw new Error("Deferred component must be used inside a Modal component");
    }
    const loaded = ref(false);
    const fetching = ref(false);
    const rootElement = ref(null);
    let observer = null;
    const getReloadParams = () => {
      if (props.data) {
        return { only: Array.isArray(props.data) ? props.data : [props.data] };
      }
      if (!props.params) {
        throw new Error("You must provide either a `data` or `params` prop.");
      }
      return props.params;
    };
    const observeElement = () => {
      if (!rootElement.value) {
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) {
            return;
          }
          if (!props.always) {
            observer.disconnect();
          }
          if (fetching.value) {
            return;
          }
          fetching.value = true;
          const reloadParams = getReloadParams();
          modalContext.value.reload({
            ...reloadParams,
            onStart: () => {
              fetching.value = true;
              reloadParams.onStart?.();
            },
            onFinish: () => {
              loaded.value = true;
              fetching.value = false;
              reloadParams.onFinish?.();
            }
          });
        },
        { rootMargin: `${props.buffer}px` }
      );
      observer.observe(rootElement.value);
    };
    onMounted(observeElement);
    onUnmounted(() => observer?.disconnect());
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(props.as), {
        ref_key: "rootElement",
        ref: rootElement
      }, {
        default: withCtx(() => [
          loaded.value ? renderSlot(_ctx.$slots, "default", { key: 0 }) : renderSlot(_ctx.$slots, "fallback", { key: 1 })
        ]),
        _: 3
      }, 512);
    };
  }
};
function visitModal(url, options = {}) {
  return useModalStack().visit(
    url,
    options.method ?? "get",
    options.data ?? {},
    options.headers ?? {},
    options.config ?? {},
    options.onClose,
    options.onAfterLeave,
    options.queryStringArrayFormat ?? "brackets",
    options.navigate ?? getConfig("navigate"),
    options.onStart,
    options.onSuccess,
    options.onError,
    options.props ?? null
  ).then((modal) => {
    const listeners = options.listeners ?? {};
    Object.keys(listeners).forEach((event) => {
      const eventName = kebabCase(event);
      modal.on(eventName, listeners[event]);
    });
    return modal;
  });
}
export {
  _sfc_main$7 as Deferred,
  _sfc_main$6 as HeadlessModal,
  _sfc_main$2 as Modal,
  Modal as ModalInstance,
  _sfc_main$1 as ModalLink,
  _sfc_main$8 as ModalRoot,
  _sfc_main as WhenVisible,
  vanilla as dialogUtils,
  getConfig,
  initFromPageProps,
  modalPropNames,
  prefetch,
  putConfig,
  renderApp,
  resetConfig,
  useModal,
  useModalStack,
  visitModal
};
//# sourceMappingURL=inertiaui-modal.js.map
