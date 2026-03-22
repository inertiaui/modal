(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("react"), require("react/jsx-runtime"), require("axios"), require("@inertiaui/vanilla"), require("@inertiajs/react"), require("@inertiajs/core"), require("react-dom")) : typeof define === "function" && define.amd ? define(["exports", "react", "react/jsx-runtime", "axios", "@inertiaui/vanilla", "@inertiajs/react", "@inertiajs/core", "react-dom"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.InertiaUIModal = {}, global.React, global.ReactJSXRuntime, global.axios, global.InertiaUIVanilla, global.InertiaReact, global.InertiaCore, global.ReactDOM));
})(this, (function(exports2, React, jsxRuntime, Axios, vanilla, react, core, reactDom) {
  "use strict";
  function _interopNamespaceDefault(e) {
    const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
    if (e) {
      for (const k in e) {
        if (k !== "default") {
          const d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: () => e[k]
          });
        }
      }
    }
    n.default = e;
    return Object.freeze(n);
  }
  const vanilla__namespace = /* @__PURE__ */ _interopNamespaceDefault(vanilla);
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
  function generateId(prefix = "inertiaui_") {
    return vanilla.generateId(prefix);
  }
  const ModalStackContext = React.createContext(null);
  ModalStackContext.displayName = "ModalStackContext";
  let pageVersion = null;
  let resolveComponent = null;
  let baseUrl = null;
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
      "X-Inertia": "true",
      "X-Inertia-Version": pageVersion ?? "",
      "X-InertiaUI-Modal": generateId(),
      "X-InertiaUI-Modal-Base-Url": baseUrl ?? ""
    };
    const request = Axios({
      url,
      method,
      data: mergedData,
      headers: requestHeaders
    }).then((response) => {
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
  const ModalStackProvider = ({ children }) => {
    const stackRef = React.useRef([]);
    const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
    const [localModals, setLocalModals] = React.useState({});
    const updateStack = (withStack) => {
      const newStack = withStack([...stackRef.current]);
      const isOnTopOfStack = (modalId) => {
        if (newStack.length < 2) {
          return true;
        }
        return newStack.map((modal) => ({ id: modal.id, shouldRender: modal.shouldRender })).reverse().find((modal) => modal.shouldRender)?.id === modalId;
      };
      newStack.forEach((modal, index) => {
        newStack[index].onTopOfStack = isOnTopOfStack(modal.id);
        newStack[index].getParentModal = () => {
          if (index < 1) {
            return null;
          }
          return stackRef.current.slice(0, index).reverse().find((m) => m.isOpen) ?? null;
        };
        newStack[index].getChildModal = () => {
          if (index === stackRef.current.length - 1) {
            return null;
          }
          return stackRef.current.slice(index + 1).find((m) => m.isOpen) ?? null;
        };
      });
      stackRef.current = newStack;
      forceUpdate();
    };
    class ModalClass {
      constructor(component, response, config, onClose, afterLeave) {
        this.show = () => {
          updateStack(
            (prevStack) => prevStack.map((modal) => {
              if (modal.id === this.id && !modal.isOpen) {
                modal.isOpen = true;
                modal.shouldRender = true;
              }
              return modal;
            })
          );
        };
        this.setOpen = (open) => {
          if (open) {
            this.show();
          } else {
            this.close();
          }
        };
        this.close = () => {
          updateStack((currentStack) => {
            let modalClosed = false;
            const newStack = currentStack.map((modal) => {
              if (modal.id === this.id && modal.isOpen) {
                Object.keys(modal.listeners).forEach((event) => {
                  modal.off(event);
                });
                modal.isOpen = false;
                modal.onCloseCallback?.();
                modalClosed = true;
              }
              return modal;
            });
            return modalClosed ? newStack : currentStack;
          });
        };
        this.afterLeave = () => {
          if (this.isOpen) {
            return;
          }
          updateStack((prevStack) => {
            const updatedStack = prevStack.map((modal) => {
              if (modal.id === this.id && !modal.isOpen) {
                modal.shouldRender = false;
                modal.afterLeaveCallback?.();
                modal.afterLeaveCallback = null;
              }
              return modal;
            });
            if (this.index === 0) {
              const savedBaseUrl = baseUrl;
              baseUrl = null;
              closingToBaseUrlTarget = savedBaseUrl;
              if (savedBaseUrl && typeof window !== "undefined") {
                react.router.push({
                  url: savedBaseUrl,
                  preserveScroll: true,
                  preserveState: true,
                  // Clear _inertiaui_modal prop to prevent modal from reopening
                  props: (currentProps) => {
                    const { _inertiaui_modal, ...rest } = currentProps;
                    return { ...rest, _inertiaui_modal: void 0 };
                  }
                });
              }
              return [];
            }
            return updatedStack;
          });
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
        this.registerEventListenersFromProps = (props) => {
          const unsubscribers = [];
          Object.keys(props).filter((key) => key.startsWith("on")).forEach((key) => {
            const eventName = vanilla.kebabCase(key).replace(/^on-/, "");
            const callback = props[key];
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
              "X-Inertia": "true",
              "X-Inertia-Partial-Component": this.response.component,
              "X-Inertia-Version": this.response.version ?? "",
              "X-Inertia-Partial-Data": keys.join(","),
              "X-InertiaUI-Modal": generateId(),
              "X-InertiaUI-Modal-Base-Url": baseUrl ?? ""
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
          Object.assign(this.props, props);
          updateStack((prevStack) => prevStack);
        };
        this.id = response.id ?? generateId();
        this.isOpen = false;
        this.shouldRender = false;
        this.listeners = {};
        this.component = component;
        this.props = response.props ?? {};
        this.response = response;
        this.config = config ?? {};
        this.onCloseCallback = onClose ?? null;
        this.afterLeaveCallback = afterLeave ?? null;
        this.index = -1;
        this.getParentModal = () => null;
        this.getChildModal = () => null;
        this.onTopOfStack = true;
      }
    }
    const isValidModalResponse = (data) => {
      return typeof data === "object" && data !== null && "component" in data && typeof data.component === "string";
    };
    const pushFromResponseData = (responseData, config = {}, onClose = null, onAfterLeave = null) => {
      if (!resolveComponent) {
        return Promise.reject(new Error("resolveComponent not set"));
      }
      if (!isValidModalResponse(responseData)) {
        return Promise.reject(
          new Error(
            "Invalid modal response. This usually happens when the server returns a redirect (e.g., due to session expiration). Check if the user is still authenticated."
          )
        );
      }
      return resolveComponent(responseData.component).then(
        (component) => push(component, responseData, config, onClose, onAfterLeave)
      );
    };
    const loadDeferredProps = (modal) => {
      const deferred = modal.response?.meta?.deferredProps;
      if (!deferred) {
        return;
      }
      Object.keys(deferred).forEach((key) => {
        modal.reload({ only: deferred[key] });
      });
    };
    const push = (component, response, config, onClose, afterLeave) => {
      const newModal = new ModalClass(component, response, config, onClose, afterLeave);
      newModal.index = stackRef.current.length;
      updateStack((prevStack) => [...prevStack, newModal]);
      loadDeferredProps(newModal);
      newModal.show();
      return newModal;
    };
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
    const visitModal = (url, options = {}) => visit(
      url,
      options.method ?? "get",
      options.data ?? {},
      options.headers ?? {},
      options.config ?? {},
      options.onClose ?? null,
      options.onAfterLeave ?? null,
      options.queryStringArrayFormat ?? "brackets",
      options.navigate ?? getConfig("navigate"),
      options.onStart ?? null,
      options.onSuccess ?? null,
      options.onError ?? null,
      options.props ?? null
    ).then((modal) => {
      const listeners = options.listeners ?? {};
      Object.keys(listeners).forEach((event) => {
        const eventName = vanilla.kebabCase(event);
        modal.on(eventName, listeners[event]);
      });
      return modal;
    });
    const updateBrowserUrl = (url, useBrowserHistory, modalData) => {
      if (!url || !useBrowserHistory || typeof window === "undefined") {
        return;
      }
      react.router.push({
        url,
        preserveScroll: true,
        preserveState: true,
        // Store modal data in page props for history navigation
        props: modalData ? (currentProps) => ({
          ...currentProps,
          _inertiaui_modal: {
            ...modalData,
            baseUrl
          }
        }) : void 0
      });
    };
    const visit = (href, method, payload = {}, headers = {}, config = {}, onClose = null, onAfterLeave = null, queryStringArrayFormat = "brackets", useBrowserHistory = false, onStart = null, onSuccess = null, onError = null, props = null) => {
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
        if (stackRef.current.length === 0) {
          baseUrl = typeof window !== "undefined" ? window.location.href : "";
        }
        const requestHeaders = {
          ...headers,
          Accept: "text/html, application/xhtml+xml",
          "X-Requested-With": "XMLHttpRequest",
          "X-Inertia": "true",
          "X-Inertia-Version": pageVersion ?? "",
          "X-InertiaUI-Modal": modalId,
          "X-InertiaUI-Modal-Base-Url": baseUrl ?? ""
        };
        onStart?.();
        react.progress?.start();
        Axios({
          url,
          method,
          data,
          headers: requestHeaders
        }).then((response) => {
          onSuccess?.(response);
          pushFromResponseData(response.data, config, onClose, onAfterLeave).then((modal) => {
            updateBrowserUrl(response.data.url, useBrowserHistory, response.data);
            resolve(modal);
          }).catch(reject);
        }).catch((...args) => {
          onError?.(...args);
          reject(args[0]);
        }).finally(() => {
          react.progress?.finish();
        });
      });
    };
    const registerLocalModal = (name, callback) => {
      setLocalModals((prevLocalModals) => ({
        ...prevLocalModals,
        [name]: { name, callback }
      }));
    };
    const removeLocalModal = (name) => {
      setLocalModals((prevLocalModals) => {
        const newLocalModals = { ...prevLocalModals };
        delete newLocalModals[name];
        return newLocalModals;
      });
    };
    const value = {
      get stack() {
        return stackRef.current;
      },
      localModals,
      push,
      pushFromResponseData,
      length: () => stackRef.current.length,
      closeAll: (force = false) => {
        if (force) {
          updateStack(() => []);
        } else {
          [...stackRef.current].reverse().forEach((modal) => modal.close());
        }
      },
      reset: () => updateStack(() => []),
      visit,
      visitModal,
      registerLocalModal,
      removeLocalModal
    };
    return /* @__PURE__ */ jsxRuntime.jsx(ModalStackContext.Provider, { value, children });
  };
  const useModalStack = () => {
    const context = React.useContext(ModalStackContext);
    if (context === null) {
      throw new Error("useModalStack must be used within a ModalStackProvider");
    }
    return context;
  };
  const modalPropNames = ["closeButton", "closeExplicitly", "closeOnClickOutside", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"];
  const initFromPageProps = (pageProps) => {
    if (pageProps.initialPage) {
      pageVersion = pageProps.initialPage.version ?? null;
    }
    if (pageProps.resolveComponent) {
      resolveComponent = pageProps.resolveComponent;
    }
  };
  const renderApp = (App, pageProps) => {
    initFromPageProps(pageProps);
    const renderInertiaApp = ({ Component, props, key }) => {
      const renderComponent = () => {
        const child = React.createElement(Component, { key, ...props });
        if (typeof Component.layout === "function") {
          return Component.layout(child);
        }
        if (Array.isArray(Component.layout)) {
          return Component.layout.slice().reverse().reduce(
            (acc, Layout) => React.createElement(Layout, props, acc),
            child
          );
        }
        return child;
      };
      return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        renderComponent(),
        /* @__PURE__ */ jsxRuntime.jsx(ModalRoot, {})
      ] });
    };
    return /* @__PURE__ */ jsxRuntime.jsx(ModalStackProvider, { children: /* @__PURE__ */ jsxRuntime.jsx(App, { ...pageProps, children: renderInertiaApp }) });
  };
  const ModalRoot = ({ children }) => {
    const context = React.useContext(ModalStackContext);
    const $page = react.usePage();
    const pendingModalKeysRef = React.useRef(/* @__PURE__ */ new Set());
    const getModalKey = (modalData) => modalData.id || `${modalData.component}:${modalData.url}`;
    const isNavigatingRef = React.useRef(false);
    const initialModalStillOpenedRef = React.useRef(!!$page.props?._inertiaui_modal);
    React.useEffect(() => react.router.on("start", () => isNavigatingRef.current = true), []);
    React.useEffect(() => react.router.on("finish", () => isNavigatingRef.current = false), []);
    React.useEffect(
      () => react.router.on("navigate", function($event) {
        const modalOnBase = $event.detail.page.props._inertiaui_modal;
        const pageUrl = $event.detail.page.url;
        if (closingToBaseUrlTarget) {
          const targetPath = new URL(closingToBaseUrlTarget, "http://x").pathname;
          const pagePath = new URL(pageUrl, "http://x").pathname;
          if (targetPath === pagePath) {
            closingToBaseUrlTarget = null;
            context?.closeAll(true);
            baseUrl = null;
            initialModalStillOpenedRef.current = false;
            return;
          }
          closingToBaseUrlTarget = null;
        }
        if (!modalOnBase) {
          context?.closeAll(true);
          baseUrl = null;
          initialModalStillOpenedRef.current = false;
          return;
        }
        if (!vanilla.sameUrlPath(pageUrl, modalOnBase.url)) {
          context?.closeAll(true);
          baseUrl = null;
          initialModalStillOpenedRef.current = false;
          return;
        }
        const modalKey = getModalKey(modalOnBase);
        if (pendingModalKeysRef.current.has(modalKey)) {
          return;
        }
        if (modalOnBase.id && context?.stack.some((m) => m.id === modalOnBase.id)) {
          return;
        }
        if (context?.stack.some((m) => m.response?.component === modalOnBase.component && vanilla.sameUrlPath(m.response?.url, modalOnBase.url))) {
          return;
        }
        baseUrl = modalOnBase.baseUrl;
        pendingModalKeysRef.current.add(modalKey);
        context?.pushFromResponseData(modalOnBase, {}, () => {
          if (!modalOnBase.baseUrl) {
            console.error("No base url in modal response data so cannot navigate back");
            return;
          }
          if (!isNavigatingRef.current && typeof window !== "undefined" && window.location.href !== modalOnBase.baseUrl) {
            react.router.visit(modalOnBase.baseUrl, {
              preserveScroll: true,
              preserveState: true
            });
          }
        }).finally(() => {
          pendingModalKeysRef.current.delete(modalKey);
        });
      }),
      []
    );
    const axiosRequestInterceptor = (config) => {
      const baseUrlValue = baseUrl ?? (initialModalStillOpenedRef.current ? $page.props._inertiaui_modal?.baseUrl : null);
      if (baseUrlValue) {
        config.headers["X-InertiaUI-Modal-Base-Url"] = baseUrlValue;
      }
      return config;
    };
    React.useEffect(() => {
      const interceptorId = Axios.interceptors.request.use(axiosRequestInterceptor);
      return () => Axios.interceptors.request.eject(interceptorId);
    }, []);
    const previousModalRef = React.useRef(void 0);
    React.useEffect(() => {
      const newModal = $page.props?._inertiaui_modal;
      const previousModal = previousModalRef.current;
      previousModalRef.current = newModal;
      if (!newModal) {
        return;
      }
      if (previousModal && newModal.component === previousModal.component && vanilla.sameUrlPath(newModal.url, previousModal.url)) {
        context?.stack[0]?.updateProps(newModal.props ?? {});
        return;
      }
      if (!previousModal && context && context.stack.length > 0) {
        const existingModal = context.stack.find(
          (m) => m.response?.component === newModal.component && vanilla.sameUrlPath(m.response?.url, newModal.url)
        );
        if (existingModal) {
          existingModal.updateProps(newModal.props ?? {});
        }
      }
    }, [$page.props?._inertiaui_modal]);
    return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      children,
      context && context.stack.length > 0 && /* @__PURE__ */ jsxRuntime.jsx(ModalRenderer, { index: 0 })
    ] });
  };
  const ModalIndexContext = React.createContext(null);
  ModalIndexContext.displayName = "ModalIndexContext";
  const useModalIndex = () => {
    return React.useContext(ModalIndexContext);
  };
  const ModalRenderer = ({ index }) => {
    const { stack } = useModalStack();
    const modalContext = React.useMemo(() => {
      return stack[index];
    }, [stack, index]);
    if (!modalContext?.component) {
      return null;
    }
    return /* @__PURE__ */ jsxRuntime.jsx(ModalIndexContext.Provider, { value: index, children: React.createElement(modalContext.component, {
      ...modalContext.props,
      onModalEvent: (...args) => modalContext.emit("modal-event", ...args)
    }) });
  };
  function useModal() {
    return useModalStack().stack[useModalIndex()] ?? null;
  }
  const Deferred = ({ children, data, fallback }) => {
    if (!data) {
      throw new Error("`<Deferred>` requires a `data` prop to be a string or array of strings");
    }
    const [loaded, setLoaded] = React.useState(false);
    const keys = Array.isArray(data) ? data : [data];
    const modal = useModal();
    const modalProps = modal?.props ?? {};
    React.useEffect(() => {
      setLoaded(keys.every((key) => modalProps[key] !== void 0));
    }, [modalProps, keys]);
    return loaded ? children : fallback;
  };
  Deferred.displayName = "InertiaModalDeferred";
  const HeadlessModal = React.forwardRef(
    (allProps, ref) => {
      const { name, children, onFocus, onBlur, onClose, onSuccess, ...props } = allProps;
      const modalIndex = useModalIndex();
      const { stack, registerLocalModal, removeLocalModal } = useModalStack();
      const [localModalContext, setLocalModalContext] = React.useState(null);
      const modalContext = React.useMemo(
        () => name ? localModalContext : stack[modalIndex],
        [name, localModalContext, modalIndex, stack]
      );
      const nextIndex = React.useMemo(() => {
        return stack.find((m) => m.shouldRender && m.index > (modalContext?.index ?? -1))?.index;
      }, [modalIndex, stack]);
      const configSlideover = React.useMemo(
        () => modalContext?.config.slideover ?? props.slideover ?? getConfig("type") === "slideover",
        [props.slideover, modalContext?.config.slideover]
      );
      const config = React.useMemo(
        () => ({
          slideover: configSlideover,
          closeButton: props.closeButton ?? getConfigByType(configSlideover, "closeButton"),
          closeExplicitly: props.closeExplicitly ?? getConfigByType(configSlideover, "closeExplicitly"),
          closeOnClickOutside: props.closeOnClickOutside ?? getConfigByType(configSlideover, "closeOnClickOutside"),
          maxWidth: props.maxWidth ?? getConfigByType(configSlideover, "maxWidth"),
          paddingClasses: props.paddingClasses ?? getConfigByType(configSlideover, "paddingClasses"),
          panelClasses: props.panelClasses ?? getConfigByType(configSlideover, "panelClasses"),
          position: props.position ?? getConfigByType(configSlideover, "position"),
          ...modalContext?.config
        }),
        [props, modalContext?.config, configSlideover]
      );
      React.useEffect(() => {
        if (name) {
          let removeListeners = null;
          registerLocalModal(name, (localContext) => {
            removeListeners = localContext.registerEventListenersFromProps(props);
            setLocalModalContext(localContext);
          });
          return () => {
            removeListeners?.();
            removeListeners = null;
            removeLocalModal(name);
          };
        }
        return modalContext?.registerEventListenersFromProps(props);
      }, [name]);
      const modalContextRef = React.useRef(modalContext);
      React.useEffect(() => {
        modalContextRef.current = modalContext;
      }, [modalContext]);
      const previousIsOpenRef = React.useRef(void 0);
      React.useEffect(() => {
        if (modalContext !== null) {
          if (modalContext.isOpen) {
            onSuccess?.();
          } else if (previousIsOpenRef.current === true) {
            onClose?.();
          }
          previousIsOpenRef.current = modalContext.isOpen;
        }
      }, [modalContext?.isOpen]);
      const [rendered, setRendered] = React.useState(false);
      React.useEffect(() => {
        if (rendered && modalContext !== null && modalContext.isOpen) {
          if (modalContext.onTopOfStack) {
            onFocus?.();
          } else {
            onBlur?.();
          }
        }
        setRendered(true);
      }, [modalContext?.onTopOfStack]);
      React.useImperativeHandle(
        ref,
        () => ({
          afterLeave: () => modalContextRef.current?.afterLeave(),
          close: () => modalContextRef.current?.close(),
          emit: (...args) => modalContextRef.current?.emit(...args),
          getChildModal: () => modalContextRef.current?.getChildModal(),
          getParentModal: () => modalContextRef.current?.getParentModal(),
          reload: (options) => modalContextRef.current?.reload(options),
          setOpen: (open) => modalContextRef.current?.setOpen(open),
          get id() {
            return modalContextRef.current?.id;
          },
          get index() {
            return modalContextRef.current?.index;
          },
          get isOpen() {
            return modalContextRef.current?.isOpen;
          },
          get config() {
            return modalContextRef.current?.config;
          },
          get modalContext() {
            return modalContextRef.current;
          },
          get onTopOfStack() {
            return modalContextRef.current?.onTopOfStack;
          },
          get shouldRender() {
            return modalContextRef.current?.shouldRender;
          }
        }),
        [modalContext]
      );
      if (!modalContext?.shouldRender) {
        return null;
      }
      return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        typeof children === "function" ? children({
          // Spread props first so they can be overridden by built-in props
          ...modalContext.props,
          afterLeave: modalContext.afterLeave,
          close: modalContext.close,
          config,
          emit: modalContext.emit,
          getChildModal: modalContext.getChildModal,
          getParentModal: modalContext.getParentModal,
          id: modalContext.id,
          index: modalContext.index,
          isOpen: modalContext.isOpen,
          modalContext,
          onTopOfStack: modalContext.onTopOfStack,
          reload: modalContext.reload,
          setOpen: modalContext.setOpen,
          shouldRender: modalContext.shouldRender
        }) : children,
        nextIndex !== void 0 && /* @__PURE__ */ jsxRuntime.jsx(ModalRenderer, { index: nextIndex })
      ] });
    }
  );
  HeadlessModal.displayName = "HeadlessModal";
  function CloseButton({ onClick }) {
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "button",
      {
        type: "button",
        className: "im-close-button text-gray-400 hover:text-gray-500",
        onClick,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: "Close" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            "svg",
            {
              className: "size-6",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              strokeWidth: "2",
              stroke: "currentColor",
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsxRuntime.jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  d: "M6 18L18 6M6 6l12 12"
                }
              )
            }
          )
        ]
      }
    );
  }
  function r(e) {
    var t, f, n = "";
    if ("string" == typeof e || "number" == typeof e) n += e;
    else if ("object" == typeof e) if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else for (f in e) e[f] && (n && (n += " "), n += f);
    return n;
  }
  function clsx() {
    for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
    return n;
  }
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
  const ModalContent = ({ modalContext, config, useNativeDialog, isFirstModal, onAfterLeave, children }) => {
    const [isRendered, setIsRendered] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(false);
    const [entered, setEntered] = React.useState(false);
    const wrapperRef = React.useRef(null);
    const dialogRef = React.useRef(null);
    const nativeWrapperRef = React.useRef(null);
    const cleanupFocusTrapRef = React.useRef(null);
    const cleanupEscapeKeyRef = React.useRef(null);
    const maxWidthClass = React.useMemo(() => getMaxWidthClass(config.maxWidth), [config.maxWidth]);
    const animateIn = React.useCallback(async (element) => {
      if (!element) return;
      setIsVisible(true);
      await vanilla.animate(element, [
        { transform: "translate3d(0, 1rem, 0) scale(0.95)", opacity: 0 },
        { transform: "translate3d(0, 0, 0) scale(1)", opacity: 1 }
      ]);
      setEntered(true);
    }, []);
    const animateOut = React.useCallback(
      async (element) => {
        if (!element) return;
        setIsVisible(false);
        await vanilla.animate(element, [
          { transform: "translate3d(0, 0, 0) scale(1)", opacity: 1 },
          { transform: "translate3d(0, 1rem, 0) scale(0.95)", opacity: 0 }
        ]);
        setIsRendered(false);
        if (useNativeDialog && dialogRef.current) {
          dialogRef.current.close();
        }
        onAfterLeave?.();
        modalContext.afterLeave();
      },
      [useNativeDialog, onAfterLeave, modalContext]
    );
    const setupFocusTrap = React.useCallback(() => {
      if (useNativeDialog) return;
      if (!wrapperRef.current || !modalContext.onTopOfStack) return;
      if (cleanupFocusTrapRef.current) return;
      cleanupFocusTrapRef.current = vanilla.createFocusTrap(wrapperRef.current, {
        initialFocus: true,
        returnFocus: false
      });
    }, [modalContext.onTopOfStack, useNativeDialog]);
    const cleanupFocusTrap = React.useCallback(() => {
      if (cleanupFocusTrapRef.current) {
        cleanupFocusTrapRef.current();
        cleanupFocusTrapRef.current = null;
      }
    }, []);
    const setupEscapeKey = React.useCallback(() => {
      if (useNativeDialog) return;
      if (cleanupEscapeKeyRef.current) return;
      if (config?.closeExplicitly) return;
      cleanupEscapeKeyRef.current = vanilla.onEscapeKey(() => {
        if (modalContext.onTopOfStack) {
          modalContext.close();
        }
      });
    }, [config?.closeExplicitly, modalContext, useNativeDialog]);
    const cleanupEscapeKey = React.useCallback(() => {
      if (cleanupEscapeKeyRef.current) {
        cleanupEscapeKeyRef.current();
        cleanupEscapeKeyRef.current = null;
      }
    }, []);
    const handleClickOutside = React.useCallback(
      (event) => {
        if (useNativeDialog) return;
        if (!modalContext.onTopOfStack) return;
        if (config?.closeExplicitly) return;
        if (config?.closeOnClickOutside === false) return;
        if (!wrapperRef.current) return;
        if (!wrapperRef.current.contains(event.target)) {
          modalContext.close();
        }
      },
      [modalContext, config?.closeExplicitly, config?.closeOnClickOutside, useNativeDialog]
    );
    const handleCancel = React.useCallback(
      (event) => {
        event.preventDefault();
        if (modalContext.onTopOfStack && !config?.closeExplicitly) {
          modalContext.close();
        }
      },
      [modalContext, config?.closeExplicitly]
    );
    const handleDialogClick = React.useCallback(
      (event) => {
        if (event.target === dialogRef.current) {
          if (modalContext.onTopOfStack && !config?.closeExplicitly && config?.closeOnClickOutside !== false) {
            modalContext.close();
          }
        }
      },
      [modalContext, config?.closeExplicitly, config?.closeOnClickOutside]
    );
    const prevIsOpenRef = React.useRef(modalContext.isOpen);
    React.useEffect(() => {
      if (useNativeDialog) {
        if (modalContext.isOpen && !dialogRef.current?.open) {
          dialogRef.current?.showModal();
          animateIn(nativeWrapperRef.current);
        } else if (!modalContext.isOpen && prevIsOpenRef.current) {
          setEntered(false);
          animateOut(nativeWrapperRef.current);
        }
      } else {
        if (modalContext.isOpen && !isRendered) {
          setIsRendered(true);
        } else if (!modalContext.isOpen && prevIsOpenRef.current) {
          setEntered(false);
          animateOut(wrapperRef.current);
        }
      }
      prevIsOpenRef.current = modalContext.isOpen;
    }, [modalContext.isOpen, useNativeDialog, animateIn, animateOut, isRendered]);
    React.useEffect(() => {
      if (!useNativeDialog && isRendered && !entered && modalContext.isOpen) {
        animateIn(wrapperRef.current).then(() => {
          setupFocusTrap();
        });
      }
    }, [isRendered, useNativeDialog, entered, modalContext.isOpen, animateIn, setupFocusTrap]);
    React.useEffect(() => {
      if (!useNativeDialog) {
        setupEscapeKey();
      }
      return () => {
        cleanupEscapeKey();
      };
    }, [useNativeDialog, setupEscapeKey, cleanupEscapeKey]);
    React.useEffect(() => {
      if (useNativeDialog) return;
      if (modalContext.onTopOfStack) {
        setupEscapeKey();
        if (entered) {
          setupFocusTrap();
        }
      } else {
        cleanupFocusTrap();
        cleanupEscapeKey();
      }
    }, [modalContext.onTopOfStack, entered, setupEscapeKey, setupFocusTrap, cleanupFocusTrap, cleanupEscapeKey, useNativeDialog]);
    React.useEffect(() => {
      return () => {
        const wrapper = useNativeDialog ? nativeWrapperRef.current : wrapperRef.current;
        if (wrapper) {
          vanilla.cancelAnimations(wrapper);
        }
        if (useNativeDialog) {
          if (dialogRef.current?.open) {
            dialogRef.current.close();
          }
        } else {
          cleanupFocusTrap();
          cleanupEscapeKey();
        }
      };
    }, [useNativeDialog, cleanupFocusTrap, cleanupEscapeKey]);
    const renderContent = () => /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        className: `im-modal-content relative ${config.paddingClasses} ${config.panelClasses}`,
        "data-inertiaui-modal-entered": entered,
        children: [
          config.closeButton && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ jsxRuntime.jsx(CloseButton, { onClick: modalContext.close }) }),
          typeof children === "function" ? children({ modalContext, config }) : children
        ]
      }
    );
    if (useNativeDialog) {
      return /* @__PURE__ */ jsxRuntime.jsx(
        "dialog",
        {
          ref: dialogRef,
          className: clsx(
            "im-modal-dialog m-0 overflow-visible bg-transparent p-0",
            "size-full max-h-none max-w-none",
            "backdrop:bg-black/75 backdrop:transition-opacity backdrop:duration-300",
            isVisible ? "backdrop:opacity-100" : "backdrop:opacity-0",
            !isFirstModal && "backdrop:bg-transparent"
          ),
          onCancel: handleCancel,
          onClick: handleDialogClick,
          children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "im-modal-container fixed inset-0 overflow-y-auto p-4", children: /* @__PURE__ */ jsxRuntime.jsx(
            "div",
            {
              className: clsx("im-modal-positioner flex min-h-full justify-center", {
                "items-start": config.position === "top",
                "items-center": config.position === "center",
                "items-end": config.position === "bottom"
              }),
              children: /* @__PURE__ */ jsxRuntime.jsx(
                "div",
                {
                  ref: nativeWrapperRef,
                  className: clsx("im-modal-wrapper w-full transition-[filter] duration-300", modalContext.onTopOfStack ? "" : "blur-xs", maxWidthClass),
                  children: renderContent()
                }
              )
            }
          ) })
        }
      );
    }
    if (!isRendered) return null;
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        className: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4",
        onMouseDown: handleClickOutside,
        children: /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            className: clsx("im-modal-positioner flex min-h-full justify-center", {
              "items-start": config.position === "top",
              "items-center": config.position === "center",
              "items-end": config.position === "bottom"
            }),
            onMouseDown: handleClickOutside,
            children: /* @__PURE__ */ jsxRuntime.jsxs(
              "div",
              {
                ref: wrapperRef,
                role: "dialog",
                "aria-modal": "true",
                className: clsx("im-modal-wrapper w-full transition-[filter] duration-300", modalContext.onTopOfStack ? "" : "blur-xs", maxWidthClass),
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: "Dialog" }),
                  renderContent()
                ]
              }
            )
          }
        )
      }
    );
  };
  const SlideoverContent = ({ modalContext, config, useNativeDialog, isFirstModal, onAfterLeave, children }) => {
    const [isRendered, setIsRendered] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(false);
    const [entered, setEntered] = React.useState(false);
    const wrapperRef = React.useRef(null);
    const dialogRef = React.useRef(null);
    const nativeWrapperRef = React.useRef(null);
    const cleanupFocusTrapRef = React.useRef(null);
    const cleanupEscapeKeyRef = React.useRef(null);
    const isLeft = config.position === "left";
    const maxWidthClass = React.useMemo(() => getMaxWidthClass(config.maxWidth), [config.maxWidth]);
    const getTranslateX = React.useCallback(() => isLeft ? "-100%" : "100%", [isLeft]);
    const animateIn = React.useCallback(
      async (element) => {
        if (!element) return;
        setIsVisible(true);
        const translateX = getTranslateX();
        await vanilla.animate(element, [
          { transform: `translate3d(${translateX}, 0, 0)`, opacity: 0 },
          { transform: "translate3d(0, 0, 0)", opacity: 1 }
        ]);
        setEntered(true);
      },
      [getTranslateX]
    );
    const animateOut = React.useCallback(
      async (element) => {
        if (!element) return;
        setIsVisible(false);
        const translateX = getTranslateX();
        await vanilla.animate(element, [
          { transform: "translate3d(0, 0, 0)", opacity: 1 },
          { transform: `translate3d(${translateX}, 0, 0)`, opacity: 0 }
        ]);
        setIsRendered(false);
        if (useNativeDialog && dialogRef.current) {
          dialogRef.current.close();
        }
        onAfterLeave?.();
        modalContext.afterLeave();
      },
      [getTranslateX, useNativeDialog, onAfterLeave, modalContext]
    );
    const setupFocusTrap = React.useCallback(() => {
      if (useNativeDialog) return;
      if (!wrapperRef.current || !modalContext.onTopOfStack) return;
      if (cleanupFocusTrapRef.current) return;
      cleanupFocusTrapRef.current = vanilla.createFocusTrap(wrapperRef.current, {
        initialFocus: true,
        returnFocus: false
      });
    }, [modalContext.onTopOfStack, useNativeDialog]);
    const cleanupFocusTrap = React.useCallback(() => {
      if (cleanupFocusTrapRef.current) {
        cleanupFocusTrapRef.current();
        cleanupFocusTrapRef.current = null;
      }
    }, []);
    const setupEscapeKey = React.useCallback(() => {
      if (useNativeDialog) return;
      if (cleanupEscapeKeyRef.current) return;
      if (config?.closeExplicitly) return;
      cleanupEscapeKeyRef.current = vanilla.onEscapeKey(() => {
        if (modalContext.onTopOfStack) {
          modalContext.close();
        }
      });
    }, [config?.closeExplicitly, modalContext, useNativeDialog]);
    const cleanupEscapeKey = React.useCallback(() => {
      if (cleanupEscapeKeyRef.current) {
        cleanupEscapeKeyRef.current();
        cleanupEscapeKeyRef.current = null;
      }
    }, []);
    const handleClickOutside = React.useCallback(
      (event) => {
        if (useNativeDialog) return;
        if (!modalContext.onTopOfStack) return;
        if (config?.closeExplicitly) return;
        if (config?.closeOnClickOutside === false) return;
        if (!wrapperRef.current) return;
        if (!wrapperRef.current.contains(event.target)) {
          modalContext.close();
        }
      },
      [modalContext, config?.closeExplicitly, config?.closeOnClickOutside, useNativeDialog]
    );
    const handleCancel = React.useCallback(
      (event) => {
        event.preventDefault();
        if (modalContext.onTopOfStack && !config?.closeExplicitly) {
          modalContext.close();
        }
      },
      [modalContext, config?.closeExplicitly]
    );
    const handleDialogClick = React.useCallback(
      (event) => {
        if (event.target === dialogRef.current) {
          if (modalContext.onTopOfStack && !config?.closeExplicitly && config?.closeOnClickOutside !== false) {
            modalContext.close();
          }
        }
      },
      [modalContext, config?.closeExplicitly, config?.closeOnClickOutside]
    );
    const prevIsOpenRef = React.useRef(modalContext.isOpen);
    React.useEffect(() => {
      if (useNativeDialog) {
        if (modalContext.isOpen && !dialogRef.current?.open) {
          dialogRef.current?.showModal();
          animateIn(nativeWrapperRef.current);
        } else if (!modalContext.isOpen && prevIsOpenRef.current) {
          setEntered(false);
          animateOut(nativeWrapperRef.current);
        }
      } else {
        if (modalContext.isOpen && !isRendered) {
          setIsRendered(true);
        } else if (!modalContext.isOpen && prevIsOpenRef.current) {
          setEntered(false);
          animateOut(wrapperRef.current);
        }
      }
      prevIsOpenRef.current = modalContext.isOpen;
    }, [modalContext.isOpen, useNativeDialog, animateIn, animateOut, isRendered]);
    React.useEffect(() => {
      if (!useNativeDialog && isRendered && !entered && modalContext.isOpen) {
        animateIn(wrapperRef.current).then(() => {
          setupFocusTrap();
        });
      }
    }, [isRendered, useNativeDialog, entered, modalContext.isOpen, animateIn, setupFocusTrap]);
    React.useEffect(() => {
      if (!useNativeDialog) {
        setupEscapeKey();
      }
      return () => {
        cleanupEscapeKey();
      };
    }, [useNativeDialog, setupEscapeKey, cleanupEscapeKey]);
    React.useEffect(() => {
      if (useNativeDialog) return;
      if (modalContext.onTopOfStack) {
        setupEscapeKey();
        if (entered) {
          setupFocusTrap();
        }
      } else {
        cleanupFocusTrap();
        cleanupEscapeKey();
      }
    }, [modalContext.onTopOfStack, entered, setupEscapeKey, setupFocusTrap, cleanupFocusTrap, cleanupEscapeKey, useNativeDialog]);
    React.useEffect(() => {
      return () => {
        const wrapper = useNativeDialog ? nativeWrapperRef.current : wrapperRef.current;
        if (wrapper) {
          vanilla.cancelAnimations(wrapper);
        }
        if (useNativeDialog) {
          if (dialogRef.current?.open) {
            dialogRef.current.close();
          }
        } else {
          cleanupFocusTrap();
          cleanupEscapeKey();
        }
      };
    }, [useNativeDialog, cleanupFocusTrap, cleanupEscapeKey]);
    const renderContent = () => /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        className: `im-slideover-content relative ${config.paddingClasses} ${config.panelClasses}`,
        "data-inertiaui-modal-entered": entered,
        children: [
          config.closeButton && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ jsxRuntime.jsx(CloseButton, { onClick: modalContext.close }) }),
          typeof children === "function" ? children({ modalContext, config }) : children
        ]
      }
    );
    if (useNativeDialog) {
      return /* @__PURE__ */ jsxRuntime.jsx(
        "dialog",
        {
          ref: dialogRef,
          className: clsx(
            "im-slideover-dialog m-0 overflow-visible bg-transparent p-0",
            "size-full max-h-none max-w-none",
            "backdrop:bg-black/75 backdrop:transition-opacity backdrop:duration-300",
            isVisible ? "backdrop:opacity-100" : "backdrop:opacity-0",
            !isFirstModal && "backdrop:bg-transparent"
          ),
          onCancel: handleCancel,
          onClick: handleDialogClick,
          children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "im-slideover-container fixed inset-0 overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ jsxRuntime.jsx(
            "div",
            {
              className: clsx("im-slideover-positioner flex min-h-full items-center", {
                "justify-start rtl:justify-end": config?.position === "left",
                "justify-end rtl:justify-start": config?.position === "right"
              }),
              children: /* @__PURE__ */ jsxRuntime.jsx(
                "div",
                {
                  ref: nativeWrapperRef,
                  className: clsx("im-slideover-wrapper w-full transition-[filter] duration-300", modalContext.onTopOfStack ? "" : "blur-xs", maxWidthClass),
                  children: renderContent()
                }
              )
            }
          ) })
        }
      );
    }
    if (!isRendered) return null;
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        className: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden",
        onMouseDown: handleClickOutside,
        children: /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            className: clsx("im-slideover-positioner flex min-h-full items-center", {
              "justify-start rtl:justify-end": config?.position === "left",
              "justify-end rtl:justify-start": config?.position === "right"
            }),
            onMouseDown: handleClickOutside,
            children: /* @__PURE__ */ jsxRuntime.jsxs(
              "div",
              {
                ref: wrapperRef,
                role: "dialog",
                "aria-modal": "true",
                className: clsx("im-slideover-wrapper w-full transition-[filter] duration-300", modalContext.onTopOfStack ? "" : "blur-xs", maxWidthClass),
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: "Dialog" }),
                  renderContent()
                ]
              }
            )
          }
        )
      }
    );
  };
  const Modal = React.forwardRef(
    (allProps, ref) => {
      const { name, children, onFocus, onBlur, onClose, onSuccess, onAfterLeave, ...props } = allProps;
      const renderChildren = (contentProps) => {
        if (typeof children === "function") {
          return children(contentProps);
        }
        return children;
      };
      const headlessModalRef = React.useRef(null);
      const cleanupScrollLockRef = React.useRef(null);
      const cleanupAriaHiddenRef = React.useRef(null);
      const [rendered, setRendered] = React.useState(false);
      const useNativeDialog = React.useMemo(() => getConfig("useNativeDialog"), []);
      React.useImperativeHandle(ref, () => headlessModalRef.current, [headlessModalRef]);
      React.useEffect(() => {
        return () => {
          cleanupScrollLockRef.current?.();
          cleanupAriaHiddenRef.current?.();
        };
      }, []);
      const handleSuccess = React.useCallback(() => {
        onSuccess?.();
        if (!cleanupScrollLockRef.current) {
          cleanupScrollLockRef.current = vanilla.lockScroll();
          cleanupAriaHiddenRef.current = vanilla.markAriaHidden(getConfig("appElement"));
        }
      }, [onSuccess]);
      const handleClose = React.useCallback(() => {
        onClose?.();
        cleanupScrollLockRef.current?.();
        cleanupAriaHiddenRef.current?.();
        cleanupScrollLockRef.current = null;
        cleanupAriaHiddenRef.current = null;
      }, [onClose]);
      const handleAfterLeave = React.useCallback(() => {
        onAfterLeave?.();
      }, [onAfterLeave]);
      return /* @__PURE__ */ jsxRuntime.jsx(
        HeadlessModal,
        {
          ref: headlessModalRef,
          name,
          onFocus: onFocus ?? void 0,
          onBlur: onBlur ?? void 0,
          onClose: handleClose,
          onSuccess: handleSuccess,
          ...props,
          children: ({
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
            ...extraProps
          }) => /* @__PURE__ */ jsxRuntime.jsx(ModalPortal, { children: /* @__PURE__ */ jsxRuntime.jsxs(
            "div",
            {
              className: "im-dialog relative z-20",
              "data-inertiaui-modal-id": id,
              "data-inertiaui-modal-index": index,
              "aria-hidden": !onTopOfStack,
              children: [
                index === 0 && !useNativeDialog && /* @__PURE__ */ jsxRuntime.jsx(
                  BackdropTransition,
                  {
                    show: isOpen,
                    appear: !rendered,
                    onAfterAppear: () => setRendered(true)
                  }
                ),
                config.slideover ? /* @__PURE__ */ jsxRuntime.jsx(
                  SlideoverContent,
                  {
                    modalContext,
                    config,
                    useNativeDialog,
                    isFirstModal: index === 0,
                    onAfterLeave: handleAfterLeave,
                    children: renderChildren({
                      ...extraProps,
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
                      shouldRender
                    })
                  }
                ) : /* @__PURE__ */ jsxRuntime.jsx(
                  ModalContent,
                  {
                    modalContext,
                    config,
                    useNativeDialog,
                    isFirstModal: index === 0,
                    onAfterLeave: handleAfterLeave,
                    children: renderChildren({
                      ...extraProps,
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
                      shouldRender
                    })
                  }
                )
              ]
            }
          ) })
        }
      );
    }
  );
  function ModalPortal({ children }) {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
      setMounted(true);
    }, []);
    if (!mounted) return null;
    return reactDom.createPortal(children, document.body);
  }
  function BackdropTransition({ show, appear, onAfterAppear }) {
    const [state, setState] = React.useState(() => {
      if (appear && show) return "entering";
      return show ? "entered" : "exited";
    });
    const initialRender = React.useRef(true);
    const backdropRef = React.useRef(null);
    React.useEffect(() => {
      if (initialRender.current) {
        initialRender.current = false;
        if (appear && show) {
          requestAnimationFrame(() => {
            setState("entered");
            const backdrop = backdropRef.current;
            if (backdrop) {
              const onTransitionEnd = (e) => {
                if (e.target !== backdrop) return;
                backdrop.removeEventListener("transitionend", onTransitionEnd);
                onAfterAppear?.();
              };
              backdrop.addEventListener("transitionend", onTransitionEnd);
            }
          });
        }
        return;
      }
      if (show) {
        setState("entering");
        requestAnimationFrame(() => {
          setState("entered");
        });
      } else {
        setState("leaving");
        const backdrop = backdropRef.current;
        if (backdrop) {
          const onTransitionEnd = (e) => {
            if (e.target !== backdrop) return;
            backdrop.removeEventListener("transitionend", onTransitionEnd);
            setState("exited");
          };
          backdrop.addEventListener("transitionend", onTransitionEnd);
        }
      }
    }, [show, appear, onAfterAppear]);
    if (state === "exited") return null;
    const isVisible = state === "entered";
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref: backdropRef,
        className: `im-backdrop fixed inset-0 z-30 bg-black/75 transition-opacity duration-300 ease-in-out ${isVisible ? "opacity-100" : "opacity-0"}`,
        "aria-hidden": "true"
      }
    );
  }
  Modal.displayName = "Modal";
  const ModalLink = ({
    href,
    method = "get",
    data = {},
    as: Component = "a",
    headers = {},
    queryStringArrayFormat = "brackets",
    onAfterLeave,
    onBlur,
    onClose,
    onError,
    onFocus,
    onStart,
    onSuccess,
    onPrefetching,
    onPrefetched,
    navigate,
    prefetch: prefetch$1 = false,
    cacheFor = 3e4,
    children,
    ...props
  }) => {
    const [loading, setLoading] = React.useState(false);
    const [modalContext, setModalContext] = React.useState(null);
    const { stack, visit } = useModalStack();
    const hoverTimeout = React.useRef(null);
    const shouldNavigate = React.useMemo(() => {
      return navigate ?? getConfig("navigate");
    }, [navigate]);
    const prefetchModes = React.useMemo(() => {
      if (prefetch$1 === true) {
        return ["hover"];
      }
      if (prefetch$1 === false) {
        return [];
      }
      if (Array.isArray(prefetch$1)) {
        return prefetch$1;
      }
      return [prefetch$1];
    }, [prefetch$1]);
    const doPrefetch = React.useCallback(() => {
      prefetch(href, {
        method,
        data,
        headers,
        queryStringArrayFormat,
        cacheFor,
        onPrefetching: onPrefetching ?? void 0,
        onPrefetched: onPrefetched ?? void 0
      });
    }, [href, method, data, headers, queryStringArrayFormat, cacheFor, onPrefetching, onPrefetched]);
    const handleMouseEnter = React.useCallback(() => {
      if (!prefetchModes.includes("hover")) return;
      hoverTimeout.current = setTimeout(() => {
        doPrefetch();
      }, 75);
    }, [prefetchModes, doPrefetch]);
    const handleMouseLeave = React.useCallback(() => {
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current);
        hoverTimeout.current = null;
      }
    }, []);
    const handleMouseDown = React.useCallback(
      (event) => {
        if (!prefetchModes.includes("click")) return;
        if (event.button !== 0) return;
        doPrefetch();
      },
      [prefetchModes, doPrefetch]
    );
    React.useEffect(() => {
      if (prefetchModes.includes("mount")) {
        doPrefetch();
      }
    }, []);
    React.useEffect(() => {
      return () => {
        if (hoverTimeout.current) {
          clearTimeout(hoverTimeout.current);
        }
      };
    }, []);
    const standardProps = {};
    const customEvents = {};
    Object.keys(props).forEach((key) => {
      if (modalPropNames.includes(key)) {
        return;
      }
      if (key.startsWith("on") && typeof props[key] === "function") {
        if (vanilla.isStandardDomEvent(key)) {
          standardProps[key] = props[key];
        } else {
          customEvents[key] = props[key];
        }
      } else {
        standardProps[key] = props[key];
      }
    });
    const [isBlurred, setIsBlurred] = React.useState(false);
    React.useEffect(() => {
      if (!modalContext) {
        return;
      }
      if (modalContext.onTopOfStack && isBlurred) {
        onFocus?.();
      } else if (!modalContext.onTopOfStack && !isBlurred) {
        onBlur?.();
      }
      setIsBlurred(!modalContext.onTopOfStack);
    }, [stack]);
    const onCloseCallback = React.useCallback(() => {
      onClose?.();
    }, [onClose]);
    const onAfterLeaveCallback = React.useCallback(() => {
      setModalContext(null);
      onAfterLeave?.();
    }, [onAfterLeave]);
    const handle = React.useCallback(
      (e) => {
        e?.preventDefault();
        if (loading) return;
        if (!href.startsWith("#")) {
          setLoading(true);
          onStart?.();
        }
        visit(
          href,
          method,
          data,
          headers,
          vanilla.rejectNullValues(vanilla.only(props, modalPropNames)),
          () => onCloseCallback(),
          onAfterLeaveCallback,
          queryStringArrayFormat,
          shouldNavigate
        ).then((newModalContext) => {
          setModalContext(newModalContext);
          newModalContext.registerEventListenersFromProps(customEvents);
          onSuccess?.();
        }).catch((error) => {
          console.error(error);
          onError?.(error);
        }).finally(() => setLoading(false));
      },
      [href, method, data, headers, queryStringArrayFormat, props, onCloseCallback, onAfterLeaveCallback]
    );
    return /* @__PURE__ */ jsxRuntime.jsx(
      Component,
      {
        ...standardProps,
        href,
        onClick: handle,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onMouseDown: handleMouseDown,
        children: typeof children === "function" ? children({ loading }) : children
      }
    );
  };
  const WhenVisible = ({ children, data, params, buffer, as, always, fallback }) => {
    always = always ?? false;
    as = as ?? "div";
    fallback = fallback ?? null;
    const [loaded, setLoaded] = React.useState(false);
    const hasFetched = React.useRef(false);
    const fetching = React.useRef(false);
    const ref = React.useRef(null);
    const modal = useModal();
    const getReloadParams = React.useCallback(() => {
      if (data) {
        return {
          only: Array.isArray(data) ? data : [data]
        };
      }
      if (!params) {
        throw new Error("You must provide either a `data` or `params` prop.");
      }
      return params;
    }, [params, data]);
    React.useEffect(() => {
      if (!ref.current) {
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) {
            return;
          }
          if (!always && hasFetched.current) {
            observer.disconnect();
          }
          if (fetching.current) {
            return;
          }
          hasFetched.current = true;
          fetching.current = true;
          const reloadParams = getReloadParams();
          modal?.reload({
            ...reloadParams,
            onStart: () => {
              fetching.current = true;
              reloadParams.onStart?.();
            },
            onFinish: () => {
              setLoaded(true);
              fetching.current = false;
              reloadParams.onFinish?.();
              if (!always) {
                observer.disconnect();
              }
            }
          });
        },
        {
          rootMargin: `${buffer || 0}px`
        }
      );
      observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }, [ref, getReloadParams, buffer]);
    if (always || !loaded) {
      return React.createElement(
        as,
        {
          props: null,
          ref
        },
        loaded ? children : fallback
      );
    }
    return loaded ? children : null;
  };
  WhenVisible.displayName = "InertiaWhenVisible";
  const setPageLayout = (layout) => (module2) => {
    module2.default.layout = (page) => React.createElement(layout, { children: page });
    return module2;
  };
  exports2.dialogUtils = vanilla__namespace;
  exports2.Deferred = Deferred;
  exports2.HeadlessModal = HeadlessModal;
  exports2.Modal = Modal;
  exports2.ModalLink = ModalLink;
  exports2.ModalRoot = ModalRoot;
  exports2.ModalStackProvider = ModalStackProvider;
  exports2.WhenVisible = WhenVisible;
  exports2.getConfig = getConfig;
  exports2.initFromPageProps = initFromPageProps;
  exports2.modalPropNames = modalPropNames;
  exports2.prefetch = prefetch;
  exports2.putConfig = putConfig;
  exports2.renderApp = renderApp;
  exports2.resetConfig = resetConfig;
  exports2.setPageLayout = setPageLayout;
  exports2.useModal = useModal;
  exports2.useModalIndex = useModalIndex;
  exports2.useModalStack = useModalStack;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
}));
//# sourceMappingURL=inertiaui-modal.umd.cjs.map
