(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("@inertiaui/vanilla"), require("@inertiajs/vue3"), require("@inertiajs/core"), require("axios")) : typeof define === "function" && define.amd ? define(["exports", "vue", "@inertiaui/vanilla", "@inertiajs/vue3", "@inertiajs/core", "axios"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.InertiaUIModal = {}, global.Vue, global.InertiaUIVanilla, global.InertiaVue3, global.InertiaCore, global.axios));
})(this, (function(exports2, vue, vanilla, vue3, core, Axios) {
  "use strict";
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
    return vanilla.generateId(prefix);
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
      const modalContext = vue.computed(() => {
        return modalStack.stack.value[props.index];
      });
      vue.provide("modalContext", modalContext);
      return (_ctx, _cache) => {
        return modalContext.value?.component ? (vue.openBlock(), vue.createBlock(vue.unref(modalContext).component, vue.mergeProps({ key: 0 }, vue.unref(vanilla.only)(modalContext.value.props ?? {}, modalContext.value.getComponentPropKeys(), true), {
          onModalEvent: _cache[0] || (_cache[0] = (event, ...args) => modalContext.value.emit(event, ...args))
        }), null, 16)) : vue.createCommentVNode("", true);
      };
    }
  };
  const _sfc_main$8 = {
    __name: "ModalRoot",
    setup(__props) {
      const modalStack = useModalStack();
      const $page = vue3.usePage();
      let isNavigating = false;
      const pendingModalKeys = /* @__PURE__ */ new Set();
      const getModalKey = (modalData) => modalData.id || `${modalData.component}:${modalData.url}`;
      vue.onUnmounted(vue3.router.on("start", () => isNavigating = true));
      vue.onUnmounted(vue3.router.on("finish", () => isNavigating = false));
      vue.onUnmounted(
        vue3.router.on("navigate", ($event) => {
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
          if (!vanilla.sameUrlPath(pageUrl, modalOnBase.url)) {
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
          if (modalStack.stack.value.some((m) => m.response?.component === modalOnBase.component && vanilla.sameUrlPath(m.response?.url, modalOnBase.url))) {
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
              vue3.router.visit(modalOnBase.baseUrl, {
                preserveScroll: true,
                preserveState: true
              });
            }
          }).then(() => {
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
      vue.onMounted(() => axiosInterceptorId = Axios.interceptors.request.use(axiosRequestInterceptor));
      vue.onUnmounted(() => axiosInterceptorId !== null && Axios.interceptors.request.eject(axiosInterceptorId));
      vue.watch(
        () => $page.props?._inertiaui_modal,
        (newModal, previousModal) => {
          if (!newModal) {
            return;
          }
          if (previousModal && newModal.component === previousModal.component && vanilla.sameUrlPath(newModal.url, previousModal.url)) {
            modalStack.stack.value[0]?.updateProps(newModal.props ?? {});
            return;
          }
          if (!previousModal && modalStack.stack.value.length > 0) {
            const existingModal = modalStack.stack.value.find(
              (m) => m.response?.component === newModal.component && vanilla.sameUrlPath(m.response?.url, newModal.url)
            );
            if (existingModal) {
              existingModal.updateProps(newModal.props ?? {});
            }
          }
        }
      );
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.renderSlot(_ctx.$slots, "default"),
          vue.unref(modalStack).stack.value.length ? (vue.openBlock(), vue.createBlock(_sfc_main$9, {
            key: 0,
            index: 0
          })) : vue.createCommentVNode("", true)
        ], 64);
      };
    }
  };
  let resolveComponent = null;
  const baseUrl = vue.ref(null);
  const stack = vue.ref([]);
  const localModals = vue.ref({});
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
    const [url, mergedData] = core.mergeDataIntoQueryString(method, href || "", data, queryStringArrayFormat);
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
      "X-Inertia": true,
      "X-Inertia-Version": vue3.usePage().version ?? "",
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
            vue3.router.push({
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
        event = vanilla.kebabCase(event);
        this.listeners[event] = this.listeners[event] ?? [];
        this.listeners[event].push(callback);
      };
      this.off = (event, callback) => {
        event = vanilla.kebabCase(event);
        if (callback) {
          this.listeners[event] = this.listeners[event]?.filter((cb) => cb !== callback) ?? [];
        } else {
          delete this.listeners[event];
        }
      };
      this.emit = (event, ...args) => {
        this.listeners[vanilla.kebabCase(event)]?.forEach((callback) => callback(...args));
      };
      this.registerEventListenersFromAttrs = ($attrs) => {
        const unsubscribers = [];
        Object.keys($attrs).filter((key) => key.startsWith("on")).forEach((key) => {
          const eventName = vanilla.kebabCase(key).replace(/^on-/, "");
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
          keys = vanilla.except(keys, options.except);
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
            "X-Inertia": true,
            "X-Inertia-Partial-Component": this.response.component,
            "X-Inertia-Version": this.response.version ?? "",
            "X-Inertia-Partial-Data": keys.join(","),
            "X-InertiaUI-Modal": generateId(),
            "X-InertiaUI-Modal-Base-Url": baseUrl.value
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
      this.props = vue.ref(response.props ?? {});
      this.response = response;
      this.config = config ?? {};
      this.onCloseCallback = onClose ?? null;
      this.afterLeaveCallback = afterLeave ?? null;
      this.index = vue.computed(() => stack.value.findIndex((m) => m.id === this.id));
      this.onTopOfStack = vue.computed(() => {
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
    vue3.router.push({
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
      (component) => push(vue.markRaw(component), responseData, config, onClose, onAfterLeave)
    );
  }
  function visit(href, method, payload = {}, headers = {}, config = {}, onClose = null, onAfterLeave = null, queryStringArrayFormat = "brackets", useBrowserHistory = false, onStart = null, onSuccess = null, onError = null, props = null) {
    const modalId = generateId();
    return new Promise((resolve, reject) => {
      if (href.startsWith("#")) {
        resolve(pushLocalModal(href.substring(1), config, onClose, onAfterLeave, props));
        return;
      }
      const [url, data] = core.mergeDataIntoQueryString(method, href || "", payload, queryStringArrayFormat);
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
        "X-Inertia": true,
        "X-Inertia-Version": vue3.usePage().version ?? "",
        "X-InertiaUI-Modal": modalId,
        "X-InertiaUI-Modal-Base-Url": baseUrl.value
      };
      onStart?.();
      vue3.progress?.start();
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
        vue3.progress?.finish();
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
    vue.nextTick(() => newModal.show());
    return newModal;
  }
  const modalPropNames = ["closeButton", "closeExplicitly", "closeOnClickOutside", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"];
  const renderApp = (App, props) => {
    if (props.resolveComponent) {
      resolveComponent = props.resolveComponent;
    }
    return () => vue.h(_sfc_main$8, () => vue.h(App, props));
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
      stack: vue.readonly(stack),
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
    return vue.toValue(vue.inject("modalContext", null));
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
      const modalContext = vue.inject("modalContext");
      if (!modalContext) {
        throw new Error("Deferred component must be used inside a Modal component");
      }
      const allKeysAreAvailable = vue.computed(() => {
        const keys = Array.isArray(props.data) ? props.data : [props.data];
        return keys.every((key) => modalContext.value.props[key] !== void 0);
      });
      return (_ctx, _cache) => {
        return allKeysAreAvailable.value ? vue.renderSlot(_ctx.$slots, "default", { key: 0 }) : vue.renderSlot(_ctx.$slots, "fallback", { key: 1 });
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
      const modalContext = props.name ? vue.ref({}) : vue.inject("modalContext");
      const config = vue.computed(() => {
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
        vue.onBeforeUnmount(() => {
          modalStack.removeLocalModal(props.name);
        });
      }
      vue.onMounted(() => {
        if (!props.name) {
          registerEventListeners();
        }
      });
      const unsubscribeEventListeners = vue.ref(null);
      vue.onBeforeUnmount(() => unsubscribeEventListeners.value?.());
      const $attrs = vue.useAttrs();
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
      vue.watch(
        () => modalContext.value?.onTopOfStack,
        (onTopOfStack, previousOnTopOfStack) => {
          if (onTopOfStack && !previousOnTopOfStack) {
            emits("focus");
          } else if (!onTopOfStack && previousOnTopOfStack) {
            emits("blur");
          }
        }
      );
      vue.watch(
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
      const nextIndex = vue.computed(() => {
        return modalStack.stack.value.find((m) => m.shouldRender && m.index > modalContext.value.index)?.index;
      });
      const modalProps = vue.computed(() => {
        const ctx = modalContext.value;
        if (!ctx) return {};
        return vue.unref(ctx.props) ?? {};
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.unref(modalContext).shouldRender ? vue.renderSlot(_ctx.$slots, "default", vue.mergeProps({ key: 0 }, modalProps.value, {
            id: vue.unref(modalContext).id,
            afterLeave: vue.unref(modalContext).afterLeave,
            close: vue.unref(modalContext).close,
            config: config.value,
            emit,
            getChildModal: vue.unref(modalContext).getChildModal,
            getParentModal: vue.unref(modalContext).getParentModal,
            index: vue.unref(modalContext).index,
            isOpen: vue.unref(modalContext).isOpen,
            modalContext: vue.unref(modalContext),
            onTopOfStack: vue.unref(modalContext).onTopOfStack,
            reload: vue.unref(modalContext).reload,
            setOpen: vue.unref(modalContext).setOpen,
            shouldRender: vue.unref(modalContext).shouldRender
          })) : vue.createCommentVNode("", true),
          nextIndex.value ? (vue.openBlock(), vue.createBlock(_sfc_main$9, {
            key: 1,
            index: nextIndex.value
          }, null, 8, ["index"])) : vue.createCommentVNode("", true)
        ], 64);
      };
    }
  });
  const _sfc_main$5 = {
    __name: "CloseButton",
    setup(__props) {
      const modal = useModal();
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("button", {
          type: "button",
          class: "im-close-button text-gray-400 hover:text-gray-500",
          onClick: _cache[0] || (_cache[0] = ($event) => vue.unref(modal).close())
        }, [..._cache[1] || (_cache[1] = [
          vue.createElementVNode("span", { class: "sr-only" }, "Close", -1),
          vue.createElementVNode("svg", {
            class: "size-6",
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            "stroke-width": "2",
            stroke: "currentColor",
            "aria-hidden": "true"
          }, [
            vue.createElementVNode("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M6 18L18 6M6 6l12 12"
            })
          ], -1)
        ])]);
      };
    }
  };
  const dialog = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    createDialog: vanilla.createDialog,
    createFocusTrap: vanilla.createFocusTrap,
    focusFirstElement: vanilla.focusFirstElement,
    getFocusableElements: vanilla.getFocusableElements,
    getScrollLockCount: vanilla.getScrollLockCount,
    lockScroll: vanilla.lockScroll,
    markAriaHidden: vanilla.markAriaHidden,
    onClickOutside: vanilla.onClickOutside,
    onEscapeKey: vanilla.onEscapeKey,
    onTransitionEnd: vanilla.onTransitionEnd,
    unlockScroll: vanilla.unlockScroll,
    unmarkAriaHidden: vanilla.unmarkAriaHidden
  }, Symbol.toStringTag, { value: "Module" }));
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
      const entered = vue.ref(false);
      const isLeaving = vue.ref(false);
      const wrapperRef = vue.ref(null);
      const dialogRef = vue.ref(null);
      const nativeWrapperRef = vue.ref(null);
      let cleanupFocusTrap = null;
      let cleanupEscapeKey = null;
      const maxWidthClass = vue.computed(() => getMaxWidthClass(props.config.maxWidth));
      function setupFocusTrap() {
        if (props.useNativeDialog) return;
        if (!wrapperRef.value || !props.modalContext.onTopOfStack) return;
        if (cleanupFocusTrap) return;
        cleanupFocusTrap = vanilla.createFocusTrap(wrapperRef.value, {
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
        cleanupEscapeKey = vanilla.onEscapeKey(() => {
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
      function onAfterEnter() {
        entered.value = true;
        setupFocusTrap();
      }
      function onAfterLeave() {
        emit("after-leave");
        props.modalContext.afterLeave();
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
          vue.nextTick(() => {
            requestAnimationFrame(() => {
              entered.value = true;
            });
          });
        }
      }
      function closeDialog() {
        if (dialogRef.value && dialogRef.value.open) {
          isLeaving.value = true;
          entered.value = false;
          const wrapper = nativeWrapperRef.value;
          if (wrapper) {
            vanilla.onTransitionEnd(wrapper, finishClose);
          } else {
            finishClose();
          }
        }
      }
      function finishClose() {
        if (dialogRef.value) {
          dialogRef.value.close();
        }
        isLeaving.value = false;
        emit("after-leave");
        props.modalContext.afterLeave();
      }
      vue.onMounted(() => {
        if (props.useNativeDialog) {
          if (props.modalContext.isOpen) {
            openDialog();
          }
        } else {
          setupEscapeKey();
        }
      });
      vue.onUnmounted(() => {
        if (props.useNativeDialog) {
          if (dialogRef.value?.open) {
            dialogRef.value.close();
          }
        } else {
          cleanupFocusTrap_();
          cleanupEscapeKey_();
        }
      });
      vue.watch(
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
      vue.watch(
        () => props.modalContext.isOpen,
        (isOpen) => {
          if (!props.useNativeDialog) return;
          if (isOpen) {
            openDialog();
          } else if (!isLeaving.value) {
            closeDialog();
          }
        }
      );
      return (_ctx, _cache) => {
        return __props.useNativeDialog ? (vue.openBlock(), vue.createElementBlock("dialog", {
          key: 0,
          ref_key: "dialogRef",
          ref: dialogRef,
          class: vue.normalizeClass([
            "im-modal-dialog m-0 overflow-visible bg-transparent p-0",
            "size-full max-h-none max-w-none",
            "backdrop:bg-black/75 backdrop:transition-opacity backdrop:duration-300",
            entered.value ? "backdrop:opacity-100" : "backdrop:opacity-0",
            !__props.isFirstModal && "backdrop:bg-transparent"
          ]),
          onCancel: handleCancel,
          onClick: handleDialogClick
        }, [
          vue.createElementVNode("div", _hoisted_1$2, [
            vue.createElementVNode("div", {
              class: vue.normalizeClass(["im-modal-positioner flex min-h-full justify-center", {
                "items-start": __props.config.position === "top",
                "items-center": __props.config.position === "center",
                "items-end": __props.config.position === "bottom"
              }])
            }, [
              vue.createElementVNode("div", {
                ref_key: "nativeWrapperRef",
                ref: nativeWrapperRef,
                class: vue.normalizeClass([
                  "im-modal-wrapper w-full transition duration-300 ease-in-out",
                  __props.modalContext.onTopOfStack ? "" : "blur-xs",
                  entered.value && !isLeaving.value ? "translate-y-0 opacity-100 sm:scale-100" : "translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95",
                  maxWidthClass.value
                ])
              }, [
                vue.createElementVNode("div", {
                  class: vue.normalizeClass(["im-modal-content relative", [__props.config.paddingClasses, __props.config.panelClasses]]),
                  "data-inertiaui-modal-entered": entered.value
                }, [
                  __props.config.closeButton ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3$1, [
                    vue.createVNode(_sfc_main$5)
                  ])) : vue.createCommentVNode("", true),
                  vue.renderSlot(_ctx.$slots, "default", {
                    modalContext: __props.modalContext,
                    config: __props.config
                  })
                ], 10, _hoisted_2$2)
              ], 2)
            ], 2)
          ])
        ], 34)) : (vue.openBlock(), vue.createElementBlock("div", {
          key: 1,
          class: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4",
          onMousedown: vue.withModifiers(handleClickOutside, ["self"])
        }, [
          vue.createElementVNode("div", {
            class: vue.normalizeClass(["im-modal-positioner flex min-h-full justify-center", {
              "items-start": __props.config.position === "top",
              "items-center": __props.config.position === "center",
              "items-end": __props.config.position === "bottom"
            }]),
            onMousedown: vue.withModifiers(handleClickOutside, ["self"])
          }, [
            vue.createVNode(vue.Transition, {
              appear: "",
              "enter-active-class": "transition duration-300 ease-in-out",
              "enter-from-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
              "enter-to-class": "opacity-100 translate-y-0 sm:scale-100",
              "leave-active-class": "transition duration-300 ease-in-out",
              "leave-from-class": "opacity-100 translate-y-0 sm:scale-100",
              "leave-to-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
              onAfterEnter,
              onAfterLeave
            }, {
              default: vue.withCtx(() => [
                __props.modalContext.isOpen ? (vue.openBlock(), vue.createElementBlock("div", {
                  key: 0,
                  ref_key: "wrapperRef",
                  ref: wrapperRef,
                  role: "dialog",
                  "aria-modal": "true",
                  class: vue.normalizeClass(["im-modal-wrapper w-full", __props.modalContext.onTopOfStack ? "" : "blur-xs", maxWidthClass.value])
                }, [
                  _cache[0] || (_cache[0] = vue.createElementVNode("span", { class: "sr-only" }, "Dialog", -1)),
                  vue.createElementVNode("div", {
                    class: vue.normalizeClass(["im-modal-content relative", [__props.config.paddingClasses, __props.config.panelClasses]]),
                    "data-inertiaui-modal-entered": entered.value
                  }, [
                    __props.config.closeButton ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_5$1, [
                      vue.createVNode(_sfc_main$5)
                    ])) : vue.createCommentVNode("", true),
                    vue.renderSlot(_ctx.$slots, "default", {
                      modalContext: __props.modalContext,
                      config: __props.config
                    })
                  ], 10, _hoisted_4$1)
                ], 2)) : vue.createCommentVNode("", true)
              ]),
              _: 3
            })
          ], 34)
        ], 32));
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
      const entered = vue.ref(false);
      const isLeaving = vue.ref(false);
      const wrapperRef = vue.ref(null);
      const dialogRef = vue.ref(null);
      const nativeWrapperRef = vue.ref(null);
      let cleanupFocusTrap = null;
      let cleanupEscapeKey = null;
      const maxWidthClass = vue.computed(() => getMaxWidthClass(props.config.maxWidth));
      const transformEnterFrom = vue.computed(() => props.config.position === "left" ? "-translate-x-full" : "translate-x-full");
      function setupFocusTrap() {
        if (props.useNativeDialog) return;
        if (!wrapperRef.value || !props.modalContext.onTopOfStack) return;
        if (cleanupFocusTrap) return;
        cleanupFocusTrap = vanilla.createFocusTrap(wrapperRef.value, {
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
        cleanupEscapeKey = vanilla.onEscapeKey(() => {
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
      function onAfterEnter() {
        entered.value = true;
        setupFocusTrap();
      }
      function onAfterLeave() {
        emit("after-leave");
        props.modalContext.afterLeave();
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
          vue.nextTick(() => {
            requestAnimationFrame(() => {
              entered.value = true;
            });
          });
        }
      }
      function closeDialog() {
        if (dialogRef.value && dialogRef.value.open) {
          isLeaving.value = true;
          entered.value = false;
          const wrapper = nativeWrapperRef.value;
          if (wrapper) {
            vanilla.onTransitionEnd(wrapper, finishClose);
          } else {
            finishClose();
          }
        }
      }
      function finishClose() {
        if (dialogRef.value) {
          dialogRef.value.close();
        }
        isLeaving.value = false;
        emit("after-leave");
        props.modalContext.afterLeave();
      }
      vue.onMounted(() => {
        if (props.useNativeDialog) {
          if (props.modalContext.isOpen) {
            openDialog();
          }
        } else {
          setupEscapeKey();
        }
      });
      vue.onUnmounted(() => {
        if (props.useNativeDialog) {
          if (dialogRef.value?.open) {
            dialogRef.value.close();
          }
        } else {
          cleanupFocusTrap_();
          cleanupEscapeKey_();
        }
      });
      vue.watch(
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
      vue.watch(
        () => props.modalContext.isOpen,
        (isOpen) => {
          if (!props.useNativeDialog) return;
          if (isOpen) {
            openDialog();
          } else if (!isLeaving.value) {
            closeDialog();
          }
        }
      );
      return (_ctx, _cache) => {
        return __props.useNativeDialog ? (vue.openBlock(), vue.createElementBlock("dialog", {
          key: 0,
          ref_key: "dialogRef",
          ref: dialogRef,
          class: vue.normalizeClass([
            "im-slideover-dialog m-0 overflow-visible bg-transparent p-0",
            "size-full max-h-none max-w-none",
            "backdrop:bg-black/75 backdrop:transition-opacity backdrop:duration-300",
            entered.value ? "backdrop:opacity-100" : "backdrop:opacity-0",
            !__props.isFirstModal && "backdrop:bg-transparent"
          ]),
          onCancel: handleCancel,
          onClick: handleDialogClick
        }, [
          vue.createElementVNode("div", _hoisted_1$1, [
            vue.createElementVNode("div", {
              class: vue.normalizeClass(["im-slideover-positioner flex min-h-full items-center", {
                "justify-start rtl:justify-end": __props.config.position === "left",
                "justify-end rtl:justify-start": __props.config.position === "right"
              }])
            }, [
              vue.createElementVNode("div", {
                ref_key: "nativeWrapperRef",
                ref: nativeWrapperRef,
                class: vue.normalizeClass([
                  "im-slideover-wrapper w-full transition duration-300 ease-in-out",
                  __props.modalContext.onTopOfStack ? "" : "blur-xs",
                  entered.value && !isLeaving.value ? "translate-x-0 opacity-100" : __props.config.position === "left" ? "-translate-x-full opacity-0" : "translate-x-full opacity-0",
                  maxWidthClass.value
                ])
              }, [
                vue.createElementVNode("div", {
                  class: vue.normalizeClass(["im-slideover-content relative", [__props.config.paddingClasses, __props.config.panelClasses]]),
                  "data-inertiaui-modal-entered": entered.value
                }, [
                  __props.config.closeButton ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3, [
                    vue.createVNode(_sfc_main$5)
                  ])) : vue.createCommentVNode("", true),
                  vue.renderSlot(_ctx.$slots, "default", {
                    modalContext: __props.modalContext,
                    config: __props.config
                  })
                ], 10, _hoisted_2$1)
              ], 2)
            ], 2)
          ])
        ], 34)) : (vue.openBlock(), vue.createElementBlock("div", {
          key: 1,
          class: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden",
          onMousedown: vue.withModifiers(handleClickOutside, ["self"])
        }, [
          vue.createElementVNode("div", {
            class: vue.normalizeClass(["im-slideover-positioner flex min-h-full items-center", {
              "justify-start rtl:justify-end": __props.config.position === "left",
              "justify-end rtl:justify-start": __props.config.position === "right"
            }]),
            onMousedown: vue.withModifiers(handleClickOutside, ["self"])
          }, [
            vue.createVNode(vue.Transition, {
              appear: "",
              "enter-active-class": "transition duration-300 ease-in-out",
              "enter-from-class": "opacity-0 " + transformEnterFrom.value,
              "enter-to-class": "opacity-100 translate-x-0",
              "leave-active-class": "transition duration-300 ease-in-out",
              "leave-from-class": "opacity-100 translate-x-0",
              "leave-to-class": "opacity-0 " + transformEnterFrom.value,
              onAfterEnter,
              onAfterLeave
            }, {
              default: vue.withCtx(() => [
                __props.modalContext.isOpen ? (vue.openBlock(), vue.createElementBlock("div", {
                  key: 0,
                  ref_key: "wrapperRef",
                  ref: wrapperRef,
                  role: "dialog",
                  "aria-modal": "true",
                  class: vue.normalizeClass(["im-slideover-wrapper w-full", __props.modalContext.onTopOfStack ? "" : "blur-xs", maxWidthClass.value])
                }, [
                  _cache[0] || (_cache[0] = vue.createElementVNode("span", { class: "sr-only" }, "Dialog", -1)),
                  vue.createElementVNode("div", {
                    class: vue.normalizeClass(["im-slideover-content relative", [__props.config.paddingClasses, __props.config.panelClasses]]),
                    "data-inertiaui-modal-entered": entered.value
                  }, [
                    __props.config.closeButton ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_5, [
                      vue.createVNode(_sfc_main$5)
                    ])) : vue.createCommentVNode("", true),
                    vue.renderSlot(_ctx.$slots, "default", {
                      modalContext: __props.modalContext,
                      config: __props.config
                    })
                  ], 10, _hoisted_4)
                ], 2)) : vue.createCommentVNode("", true)
              ]),
              _: 3
            }, 8, ["enter-from-class", "leave-to-class"])
          ], 34)
        ], 32));
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
      const modal = vue.ref(null);
      const rendered = vue.ref(false);
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
      vue.onMounted(() => {
        if (modal.value?.isOpen && !cleanupScrollLock) {
          cleanupScrollLock = vanilla.lockScroll();
          cleanupAriaHidden = vanilla.markAriaHidden(getConfig("appElement"));
        }
      });
      vue.onUnmounted(() => {
        cleanupScrollLock?.();
        cleanupAriaHidden?.();
      });
      function onSuccessEvent() {
        emits("success");
        if (!cleanupScrollLock) {
          cleanupScrollLock = vanilla.lockScroll();
          cleanupAriaHidden = vanilla.markAriaHidden(getConfig("appElement"));
        }
      }
      function onCloseEvent() {
        emits("close");
        cleanupScrollLock?.();
        cleanupAriaHidden?.();
        cleanupScrollLock = null;
        cleanupAriaHidden = null;
      }
      const useNativeDialog = vue.computed(() => getConfig("useNativeDialog"));
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(_sfc_main$6, {
          ref_key: "modal",
          ref: modal,
          onSuccess: onSuccessEvent,
          onClose: onCloseEvent,
          onFocus: _cache[2] || (_cache[2] = ($event) => emits("focus")),
          onBlur: _cache[3] || (_cache[3] = ($event) => emits("blur"))
        }, {
          default: vue.withCtx(({
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
            (vue.openBlock(), vue.createBlock(vue.Teleport, { to: "body" }, [
              vue.createElementVNode("div", {
                "data-inertiaui-modal-id": id,
                "data-inertiaui-modal-index": index,
                class: "im-dialog relative z-20",
                "aria-hidden": !onTopOfStack
              }, [
                index === 0 && !useNativeDialog.value ? (vue.openBlock(), vue.createBlock(vue.Transition, {
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
                  default: vue.withCtx(() => [
                    isOpen ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2)) : vue.createCommentVNode("", true)
                  ]),
                  _: 2
                }, 1032, ["appear"])) : vue.createCommentVNode("", true),
                (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(config?.slideover ? _sfc_main$3 : _sfc_main$4), {
                  "modal-context": modalContext,
                  config,
                  "use-native-dialog": useNativeDialog.value,
                  "is-first-modal": index === 0,
                  onAfterLeave: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("after-leave"))
                }, {
                  default: vue.withCtx(() => [
                    vue.renderSlot(_ctx.$slots, "default", vue.mergeProps(props, {
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
      const loading = vue.ref(false);
      const modalStack = useModalStack();
      const modalContext = vue.ref(null);
      vue.provide("modalContext", modalContext);
      const emit = __emit;
      const isBlurred = vue.ref(false);
      const shouldNavigate = vue.computed(() => {
        return props.navigate ?? getConfig("navigate");
      });
      const hoverTimeout = vue.ref(null);
      const prefetchModes = vue.computed(() => {
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
      vue.onMounted(() => {
        if (prefetchModes.value.includes("mount")) {
          doPrefetch();
        }
      });
      vue.watch(
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
      const unsubscribeEventListeners = vue.ref(null);
      vue.onBeforeUnmount(() => {
        unsubscribeEventListeners.value?.();
        if (hoverTimeout.value) {
          clearTimeout(hoverTimeout.value);
        }
      });
      const $attrs = vue.useAttrs();
      function registerEventListeners() {
        unsubscribeEventListeners.value = modalContext.value.registerEventListenersFromAttrs($attrs);
      }
      vue.watch(modalContext, (value, oldValue) => {
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
          vanilla.rejectNullValues(vanilla.only(props, modalPropNames)),
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
        return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(__props.as), vue.mergeProps(vue.unref($attrs), {
          href: __props.href,
          onClick: vue.withModifiers(handle, ["prevent"]),
          onMouseenter,
          onMouseleave,
          onMousedown
        }), {
          default: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "default", { loading: loading.value })
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
      const modalContext = vue.inject("modalContext");
      if (!modalContext) {
        throw new Error("Deferred component must be used inside a Modal component");
      }
      const loaded = vue.ref(false);
      const fetching = vue.ref(false);
      const rootElement = vue.ref(null);
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
      vue.onMounted(observeElement);
      vue.onUnmounted(() => observer?.disconnect());
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(props.as), {
          ref_key: "rootElement",
          ref: rootElement
        }, {
          default: vue.withCtx(() => [
            loaded.value ? vue.renderSlot(_ctx.$slots, "default", { key: 0 }) : vue.renderSlot(_ctx.$slots, "fallback", { key: 1 })
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
        const eventName = vanilla.kebabCase(event);
        modal.on(eventName, listeners[event]);
      });
      return modal;
    });
  }
  exports2.Deferred = _sfc_main$7;
  exports2.HeadlessModal = _sfc_main$6;
  exports2.Modal = _sfc_main$2;
  exports2.ModalInstance = Modal;
  exports2.ModalLink = _sfc_main$1;
  exports2.ModalRoot = _sfc_main$8;
  exports2.WhenVisible = _sfc_main;
  exports2.dialogUtils = dialog;
  exports2.getConfig = getConfig;
  exports2.initFromPageProps = initFromPageProps;
  exports2.modalPropNames = modalPropNames;
  exports2.prefetch = prefetch;
  exports2.putConfig = putConfig;
  exports2.renderApp = renderApp;
  exports2.resetConfig = resetConfig;
  exports2.useModal = useModal;
  exports2.useModalStack = useModalStack;
  exports2.visitModal = visitModal;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
}));
//# sourceMappingURL=inertiaui-modal.umd.cjs.map
