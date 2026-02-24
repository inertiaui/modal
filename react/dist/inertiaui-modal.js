import React, { createContext, useContext, useRef, useEffect, useReducer, useState, createElement, useMemo, forwardRef, useImperativeHandle, useCallback } from "react";
import Axios from "axios";
import { sameUrlPath, generateId, kebabCase, except, createFocusTrap, onEscapeKey, onTransitionEnd, lockScroll, markAriaHidden, isStandardDomEvent, rejectNullValues, only } from "@inertiaui/vanilla";
import * as vanilla from "@inertiaui/vanilla";
import { usePage, router, progress } from "@inertiajs/react";
import { mergeDataIntoQueryString } from "@inertiajs/core";
import { createPortal } from "react-dom";
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
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production = {};
var hasRequiredReactJsxRuntime_production;
function requireReactJsxRuntime_production() {
  if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
  hasRequiredReactJsxRuntime_production = 1;
  var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
  function jsxProd(type, config, maybeKey) {
    var key = null;
    void 0 !== maybeKey && (key = "" + maybeKey);
    void 0 !== config.key && (key = "" + config.key);
    if ("key" in config) {
      maybeKey = {};
      for (var propName in config)
        "key" !== propName && (maybeKey[propName] = config[propName]);
    } else maybeKey = config;
    config = maybeKey.ref;
    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type,
      key,
      ref: void 0 !== config ? config : null,
      props: maybeKey
    };
  }
  reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
  reactJsxRuntime_production.jsx = jsxProd;
  reactJsxRuntime_production.jsxs = jsxProd;
  return reactJsxRuntime_production;
}
var reactJsxRuntime_development = {};
var hasRequiredReactJsxRuntime_development;
function requireReactJsxRuntime_development() {
  if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
  hasRequiredReactJsxRuntime_development = 1;
  "production" !== process.env.NODE_ENV && (function() {
    function getComponentNameFromType(type) {
      if (null == type) return null;
      if ("function" === typeof type)
        return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
      if ("string" === typeof type) return type;
      switch (type) {
        case REACT_FRAGMENT_TYPE:
          return "Fragment";
        case REACT_PROFILER_TYPE:
          return "Profiler";
        case REACT_STRICT_MODE_TYPE:
          return "StrictMode";
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
        case REACT_ACTIVITY_TYPE:
          return "Activity";
      }
      if ("object" === typeof type)
        switch ("number" === typeof type.tag && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), type.$$typeof) {
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_CONTEXT_TYPE:
            return type.displayName || "Context";
          case REACT_CONSUMER_TYPE:
            return (type._context.displayName || "Context") + ".Consumer";
          case REACT_FORWARD_REF_TYPE:
            var innerType = type.render;
            type = type.displayName;
            type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
            return type;
          case REACT_MEMO_TYPE:
            return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
          case REACT_LAZY_TYPE:
            innerType = type._payload;
            type = type._init;
            try {
              return getComponentNameFromType(type(innerType));
            } catch (x) {
            }
        }
      return null;
    }
    function testStringCoercion(value) {
      return "" + value;
    }
    function checkKeyStringCoercion(value) {
      try {
        testStringCoercion(value);
        var JSCompiler_inline_result = false;
      } catch (e) {
        JSCompiler_inline_result = true;
      }
      if (JSCompiler_inline_result) {
        JSCompiler_inline_result = console;
        var JSCompiler_temp_const = JSCompiler_inline_result.error;
        var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
        JSCompiler_temp_const.call(
          JSCompiler_inline_result,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          JSCompiler_inline_result$jscomp$0
        );
        return testStringCoercion(value);
      }
    }
    function getTaskName(type) {
      if (type === REACT_FRAGMENT_TYPE) return "<>";
      if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
        return "<...>";
      try {
        var name = getComponentNameFromType(type);
        return name ? "<" + name + ">" : "<...>";
      } catch (x) {
        return "<...>";
      }
    }
    function getOwner() {
      var dispatcher = ReactSharedInternals.A;
      return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
      return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
      if (hasOwnProperty.call(config, "key")) {
        var getter = Object.getOwnPropertyDescriptor(config, "key").get;
        if (getter && getter.isReactWarning) return false;
      }
      return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
      function warnAboutAccessingKey() {
        specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          displayName
        ));
      }
      warnAboutAccessingKey.isReactWarning = true;
      Object.defineProperty(props, "key", {
        get: warnAboutAccessingKey,
        configurable: true
      });
    }
    function elementRefGetterWithDeprecationWarning() {
      var componentName = getComponentNameFromType(this.type);
      didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      ));
      componentName = this.props.ref;
      return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
      var refProp = props.ref;
      type = {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        props,
        _owner: owner
      };
      null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
        enumerable: false,
        get: elementRefGetterWithDeprecationWarning
      }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
      type._store = {};
      Object.defineProperty(type._store, "validated", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: 0
      });
      Object.defineProperty(type, "_debugInfo", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: null
      });
      Object.defineProperty(type, "_debugStack", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: debugStack
      });
      Object.defineProperty(type, "_debugTask", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: debugTask
      });
      Object.freeze && (Object.freeze(type.props), Object.freeze(type));
      return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
      var children = config.children;
      if (void 0 !== children)
        if (isStaticChildren)
          if (isArrayImpl(children)) {
            for (isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)
              validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else validateChildKeys(children);
      if (hasOwnProperty.call(config, "key")) {
        children = getComponentNameFromType(type);
        var keys = Object.keys(config).filter(function(k) {
          return "key" !== k;
        });
        isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
        didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error(
          'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
          isStaticChildren,
          children,
          keys,
          children
        ), didWarnAboutKeySpread[children + isStaticChildren] = true);
      }
      children = null;
      void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
      hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
      if ("key" in config) {
        maybeKey = {};
        for (var propName in config)
          "key" !== propName && (maybeKey[propName] = config[propName]);
      } else maybeKey = config;
      children && defineKeyPropWarningGetter(
        maybeKey,
        "function" === typeof type ? type.displayName || type.name || "Unknown" : type
      );
      return ReactElement(
        type,
        children,
        maybeKey,
        getOwner(),
        debugStack,
        debugTask
      );
    }
    function validateChildKeys(node) {
      isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
      return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React$1 = React, REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo"), REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for("react.client.reference"), ReactSharedInternals = React$1.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
      return null;
    };
    React$1 = {
      react_stack_bottom_frame: function(callStackForError) {
        return callStackForError();
      }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React$1.react_stack_bottom_frame.bind(
      React$1,
      UnknownOwner
    )();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
    reactJsxRuntime_development.jsx = function(type, config, maybeKey) {
      var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
      return jsxDEVImpl(
        type,
        config,
        maybeKey,
        false,
        trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
      );
    };
    reactJsxRuntime_development.jsxs = function(type, config, maybeKey) {
      var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
      return jsxDEVImpl(
        type,
        config,
        maybeKey,
        true,
        trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
      );
    };
  })();
  return reactJsxRuntime_development;
}
var hasRequiredJsxRuntime;
function requireJsxRuntime() {
  if (hasRequiredJsxRuntime) return jsxRuntime.exports;
  hasRequiredJsxRuntime = 1;
  if (process.env.NODE_ENV === "production") {
    jsxRuntime.exports = requireReactJsxRuntime_production();
  } else {
    jsxRuntime.exports = requireReactJsxRuntime_development();
  }
  return jsxRuntime.exports;
}
var jsxRuntimeExports = requireJsxRuntime();
const ModalStackContext = createContext(null);
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
  const stackRef = useRef([]);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [localModals, setLocalModals] = useState({});
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
              router.push({
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
      this.registerEventListenersFromProps = (props) => {
        const unsubscribers = [];
        Object.keys(props).filter((key) => key.startsWith("on")).forEach((key) => {
          const eventName = kebabCase(key).replace(/^on-/, "");
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
      const eventName = kebabCase(event);
      modal.on(eventName, listeners[event]);
    });
    return modal;
  });
  const updateBrowserUrl = (url, useBrowserHistory, modalData) => {
    if (!url || !useBrowserHistory || typeof window === "undefined") {
      return;
    }
    router.push({
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
      progress?.start();
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
        progress?.finish();
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ModalStackContext.Provider, { value, children });
};
const useModalStack = () => {
  const context = useContext(ModalStackContext);
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
      const child = createElement(Component, { key, ...props });
      if (typeof Component.layout === "function") {
        return Component.layout(child);
      }
      if (Array.isArray(Component.layout)) {
        return Component.layout.slice().reverse().reduce(
          (acc, Layout) => createElement(Layout, props, acc),
          child
        );
      }
      return child;
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      renderComponent(),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ModalRoot, {})
    ] });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ModalStackProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, { ...pageProps, children: renderInertiaApp }) });
};
const ModalRoot = ({ children }) => {
  const context = useContext(ModalStackContext);
  const $page = usePage();
  const pendingModalKeysRef = useRef(/* @__PURE__ */ new Set());
  const getModalKey = (modalData) => modalData.id || `${modalData.component}:${modalData.url}`;
  const isNavigatingRef = useRef(false);
  const initialModalStillOpenedRef = useRef(!!$page.props?._inertiaui_modal);
  useEffect(() => router.on("start", () => isNavigatingRef.current = true), []);
  useEffect(() => router.on("finish", () => isNavigatingRef.current = false), []);
  useEffect(
    () => router.on("navigate", function($event) {
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
      if (!sameUrlPath(pageUrl, modalOnBase.url)) {
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
      if (context?.stack.some((m) => m.response?.component === modalOnBase.component && sameUrlPath(m.response?.url, modalOnBase.url))) {
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
          router.visit(modalOnBase.baseUrl, {
            preserveScroll: true,
            preserveState: true
          });
        }
      }).then(() => {
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
  useEffect(() => {
    const interceptorId = Axios.interceptors.request.use(axiosRequestInterceptor);
    return () => Axios.interceptors.request.eject(interceptorId);
  }, []);
  const previousModalRef = useRef(void 0);
  useEffect(() => {
    const newModal = $page.props?._inertiaui_modal;
    const previousModal = previousModalRef.current;
    previousModalRef.current = newModal;
    if (!newModal) {
      return;
    }
    if (previousModal && newModal.component === previousModal.component && sameUrlPath(newModal.url, previousModal.url)) {
      context?.stack[0]?.updateProps(newModal.props ?? {});
      return;
    }
    if (!previousModal && context && context.stack.length > 0) {
      const existingModal = context.stack.find(
        (m) => m.response?.component === newModal.component && sameUrlPath(m.response?.url, newModal.url)
      );
      if (existingModal) {
        existingModal.updateProps(newModal.props ?? {});
      }
    }
  }, [$page.props?._inertiaui_modal]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    children,
    context && context.stack.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(ModalRenderer, { index: 0 })
  ] });
};
const ModalIndexContext = React.createContext(null);
ModalIndexContext.displayName = "ModalIndexContext";
const useModalIndex = () => {
  return React.useContext(ModalIndexContext);
};
const ModalRenderer = ({ index }) => {
  const { stack } = useModalStack();
  const modalContext = useMemo(() => {
    return stack[index];
  }, [stack, index]);
  if (!modalContext?.component) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ModalIndexContext.Provider, { value: index, children: createElement(modalContext.component, {
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
  const [loaded, setLoaded] = useState(false);
  const keys = Array.isArray(data) ? data : [data];
  const modal = useModal();
  const modalProps = modal?.props ?? {};
  useEffect(() => {
    setLoaded(keys.every((key) => modalProps[key] !== void 0));
  }, [modalProps, keys]);
  return loaded ? children : fallback;
};
Deferred.displayName = "InertiaModalDeferred";
const HeadlessModal = forwardRef(
  (allProps, ref) => {
    const { name, children, onFocus, onBlur, onClose, onSuccess, ...props } = allProps;
    const modalIndex = useModalIndex();
    const { stack, registerLocalModal, removeLocalModal } = useModalStack();
    const [localModalContext, setLocalModalContext] = useState(null);
    const modalContext = useMemo(
      () => name ? localModalContext : stack[modalIndex],
      [name, localModalContext, modalIndex, stack]
    );
    const nextIndex = useMemo(() => {
      return stack.find((m) => m.shouldRender && m.index > (modalContext?.index ?? -1))?.index;
    }, [modalIndex, stack]);
    const configSlideover = useMemo(
      () => modalContext?.config.slideover ?? props.slideover ?? getConfig("type") === "slideover",
      [props.slideover, modalContext?.config.slideover]
    );
    const config = useMemo(
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
    useEffect(() => {
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
    const modalContextRef = useRef(modalContext);
    useEffect(() => {
      modalContextRef.current = modalContext;
    }, [modalContext]);
    const previousIsOpenRef = useRef(void 0);
    useEffect(() => {
      if (modalContext !== null) {
        if (modalContext.isOpen) {
          onSuccess?.();
        } else if (previousIsOpenRef.current === true) {
          onClose?.();
        }
        previousIsOpenRef.current = modalContext.isOpen;
      }
    }, [modalContext?.isOpen]);
    const [rendered, setRendered] = useState(false);
    useEffect(() => {
      if (rendered && modalContext !== null && modalContext.isOpen) {
        if (modalContext.onTopOfStack) {
          onFocus?.();
        } else {
          onBlur?.();
        }
      }
      setRendered(true);
    }, [modalContext?.onTopOfStack]);
    useImperativeHandle(
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
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
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
      nextIndex !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(ModalRenderer, { index: nextIndex })
    ] });
  }
);
HeadlessModal.displayName = "HeadlessModal";
function CloseButton({ onClick }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      className: "im-close-button text-gray-400 hover:text-gray-500",
      onClick,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "svg",
          {
            className: "size-6",
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: "2",
            stroke: "currentColor",
            "aria-hidden": "true",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
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
  const [entered, setEntered] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [transitionState, setTransitionState] = useState("entering");
  const wrapperRef = useRef(null);
  const dialogRef = useRef(null);
  const nativeWrapperRef = useRef(null);
  const cleanupFocusTrapRef = useRef(null);
  const cleanupEscapeKeyRef = useRef(null);
  const initialRender = useRef(true);
  const maxWidthClass = useMemo(() => getMaxWidthClass(config.maxWidth), [config.maxWidth]);
  const setupFocusTrap = useCallback(() => {
    if (useNativeDialog) return;
    if (!wrapperRef.current || !modalContext.onTopOfStack) return;
    if (cleanupFocusTrapRef.current) return;
    cleanupFocusTrapRef.current = createFocusTrap(wrapperRef.current, {
      initialFocus: true,
      returnFocus: false
    });
  }, [modalContext.onTopOfStack, useNativeDialog]);
  const cleanupFocusTrap = useCallback(() => {
    if (cleanupFocusTrapRef.current) {
      cleanupFocusTrapRef.current();
      cleanupFocusTrapRef.current = null;
    }
  }, []);
  const setupEscapeKey = useCallback(() => {
    if (useNativeDialog) return;
    if (cleanupEscapeKeyRef.current) return;
    if (config?.closeExplicitly) return;
    cleanupEscapeKeyRef.current = onEscapeKey(() => {
      if (modalContext.onTopOfStack) {
        modalContext.close();
      }
    });
  }, [config?.closeExplicitly, modalContext, useNativeDialog]);
  const cleanupEscapeKey = useCallback(() => {
    if (cleanupEscapeKeyRef.current) {
      cleanupEscapeKeyRef.current();
      cleanupEscapeKeyRef.current = null;
    }
  }, []);
  const handleClickOutside = useCallback(
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
  const handleCancel = useCallback(
    (event) => {
      event.preventDefault();
      if (modalContext.onTopOfStack && !config?.closeExplicitly) {
        modalContext.close();
      }
    },
    [modalContext, config?.closeExplicitly]
  );
  const handleDialogClick = useCallback(
    (event) => {
      if (event.target === dialogRef.current) {
        if (modalContext.onTopOfStack && !config?.closeExplicitly && config?.closeOnClickOutside !== false) {
          modalContext.close();
        }
      }
    },
    [modalContext, config?.closeExplicitly, config?.closeOnClickOutside]
  );
  const openDialog = useCallback(() => {
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEntered(true);
        });
      });
    }
  }, []);
  const finishClose = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    setIsLeaving(false);
    onAfterLeave?.();
    modalContext.afterLeave();
  }, [onAfterLeave, modalContext]);
  const closeDialog = useCallback(() => {
    if (dialogRef.current && dialogRef.current.open) {
      setIsLeaving(true);
      setEntered(false);
      const wrapper = nativeWrapperRef.current;
      if (wrapper) {
        onTransitionEnd(wrapper, finishClose);
      } else {
        finishClose();
      }
    }
  }, [finishClose]);
  useEffect(() => {
    if (useNativeDialog) {
      if (modalContext.isOpen) {
        openDialog();
      }
    } else {
      setupEscapeKey();
    }
    return () => {
      if (useNativeDialog) {
        if (dialogRef.current?.open) {
          dialogRef.current.close();
        }
      } else {
        cleanupFocusTrap();
        cleanupEscapeKey();
      }
    };
  }, []);
  useEffect(() => {
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
  useEffect(() => {
    if (useNativeDialog) return;
    if (initialRender.current && modalContext.isOpen) {
      initialRender.current = false;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionState("entered");
          const wrapper = wrapperRef.current;
          if (wrapper) {
            onTransitionEnd(wrapper, () => {
              setEntered(true);
              setupFocusTrap();
            });
          }
        });
      });
    }
  }, [modalContext.isOpen, setupFocusTrap, useNativeDialog]);
  useEffect(() => {
    if (useNativeDialog) return;
    if (!modalContext.isOpen && transitionState === "entered") {
      setTransitionState("leaving");
      const wrapper = wrapperRef.current;
      if (wrapper) {
        onTransitionEnd(wrapper, () => {
          setTransitionState("exited");
          onAfterLeave?.();
          modalContext.afterLeave();
        });
      }
    }
  }, [modalContext.isOpen, transitionState, onAfterLeave, modalContext, useNativeDialog]);
  useEffect(() => {
    if (!useNativeDialog) return;
    if (modalContext.isOpen) {
      openDialog();
    } else if (!isLeaving) {
      closeDialog();
    }
  }, [modalContext.isOpen, openDialog, closeDialog, isLeaving, useNativeDialog]);
  const renderContent = () => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `im-modal-content relative ${config.paddingClasses} ${config.panelClasses}`,
      "data-inertiaui-modal-entered": entered,
      children: [
        config.closeButton && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CloseButton, { onClick: modalContext.close }) }),
        typeof children === "function" ? children({ modalContext, config }) : children
      ]
    }
  );
  if (useNativeDialog) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "dialog",
      {
        ref: dialogRef,
        className: clsx(
          "im-modal-dialog m-0 overflow-visible bg-transparent p-0",
          "size-full max-h-none max-w-none",
          "backdrop:bg-black/75 backdrop:transition-opacity backdrop:duration-300",
          entered ? "backdrop:opacity-100" : "backdrop:opacity-0",
          !isFirstModal && "backdrop:bg-transparent"
        ),
        onCancel: handleCancel,
        onClick: handleDialogClick,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "im-modal-container fixed inset-0 overflow-y-auto p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: clsx("im-modal-positioner flex min-h-full justify-center", {
              "items-start": config.position === "top",
              "items-center": config.position === "center",
              "items-end": config.position === "bottom"
            }),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                ref: nativeWrapperRef,
                className: clsx(
                  "im-modal-wrapper w-full transition duration-300 ease-in-out",
                  modalContext.onTopOfStack ? "" : "blur-xs",
                  entered && !isLeaving ? "translate-y-0 opacity-100 sm:scale-100" : "translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95",
                  maxWidthClass
                ),
                children: renderContent()
              }
            )
          }
        ) })
      }
    );
  }
  if (transitionState === "exited") return null;
  const isEntering = transitionState === "entering";
  const isLeavingNonNative = transitionState === "leaving";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4",
      onMouseDown: handleClickOutside,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: clsx("im-modal-positioner flex min-h-full justify-center", {
            "items-start": config.position === "top",
            "items-center": config.position === "center",
            "items-end": config.position === "bottom"
          }),
          onMouseDown: handleClickOutside,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              ref: wrapperRef,
              role: "dialog",
              "aria-modal": "true",
              className: clsx(
                "im-modal-wrapper w-full transition duration-300 ease-in-out",
                modalContext.onTopOfStack ? "" : "blur-xs",
                isEntering || isLeavingNonNative ? "translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95" : "translate-y-0 opacity-100 sm:scale-100",
                maxWidthClass
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Dialog" }),
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
  const [entered, setEntered] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [transitionState, setTransitionState] = useState("entering");
  const wrapperRef = useRef(null);
  const dialogRef = useRef(null);
  const nativeWrapperRef = useRef(null);
  const cleanupFocusTrapRef = useRef(null);
  const cleanupEscapeKeyRef = useRef(null);
  const initialRender = useRef(true);
  const isLeft = config.position === "left";
  const maxWidthClass = useMemo(() => getMaxWidthClass(config.maxWidth), [config.maxWidth]);
  const getTransformClass = useCallback(
    (isHidden) => {
      if (isHidden) {
        return isLeft ? "-translate-x-full opacity-0" : "translate-x-full opacity-0";
      }
      return "translate-x-0 opacity-100";
    },
    [isLeft]
  );
  const setupFocusTrap = useCallback(() => {
    if (useNativeDialog) return;
    if (!wrapperRef.current || !modalContext.onTopOfStack) return;
    if (cleanupFocusTrapRef.current) return;
    cleanupFocusTrapRef.current = createFocusTrap(wrapperRef.current, {
      initialFocus: true,
      returnFocus: false
    });
  }, [modalContext.onTopOfStack, useNativeDialog]);
  const cleanupFocusTrap = useCallback(() => {
    if (cleanupFocusTrapRef.current) {
      cleanupFocusTrapRef.current();
      cleanupFocusTrapRef.current = null;
    }
  }, []);
  const setupEscapeKey = useCallback(() => {
    if (useNativeDialog) return;
    if (cleanupEscapeKeyRef.current) return;
    if (config?.closeExplicitly) return;
    cleanupEscapeKeyRef.current = onEscapeKey(() => {
      if (modalContext.onTopOfStack) {
        modalContext.close();
      }
    });
  }, [config?.closeExplicitly, modalContext, useNativeDialog]);
  const cleanupEscapeKey = useCallback(() => {
    if (cleanupEscapeKeyRef.current) {
      cleanupEscapeKeyRef.current();
      cleanupEscapeKeyRef.current = null;
    }
  }, []);
  const handleClickOutside = useCallback(
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
  const handleCancel = useCallback(
    (event) => {
      event.preventDefault();
      if (modalContext.onTopOfStack && !config?.closeExplicitly) {
        modalContext.close();
      }
    },
    [modalContext, config?.closeExplicitly]
  );
  const handleDialogClick = useCallback(
    (event) => {
      if (event.target === dialogRef.current) {
        if (modalContext.onTopOfStack && !config?.closeExplicitly && config?.closeOnClickOutside !== false) {
          modalContext.close();
        }
      }
    },
    [modalContext, config?.closeExplicitly, config?.closeOnClickOutside]
  );
  const openDialog = useCallback(() => {
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEntered(true);
        });
      });
    }
  }, []);
  const finishClose = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    setIsLeaving(false);
    onAfterLeave?.();
    modalContext.afterLeave();
  }, [onAfterLeave, modalContext]);
  const closeDialog = useCallback(() => {
    if (dialogRef.current && dialogRef.current.open) {
      setIsLeaving(true);
      setEntered(false);
      const wrapper = nativeWrapperRef.current;
      if (wrapper) {
        onTransitionEnd(wrapper, finishClose);
      } else {
        finishClose();
      }
    }
  }, [finishClose]);
  useEffect(() => {
    if (useNativeDialog) {
      if (modalContext.isOpen) {
        openDialog();
      }
    } else {
      setupEscapeKey();
    }
    return () => {
      if (useNativeDialog) {
        if (dialogRef.current?.open) {
          dialogRef.current.close();
        }
      } else {
        cleanupFocusTrap();
        cleanupEscapeKey();
      }
    };
  }, []);
  useEffect(() => {
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
  useEffect(() => {
    if (useNativeDialog) return;
    if (initialRender.current && modalContext.isOpen) {
      initialRender.current = false;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionState("entered");
          const wrapper = wrapperRef.current;
          if (wrapper) {
            onTransitionEnd(wrapper, () => {
              setEntered(true);
              setupFocusTrap();
            });
          }
        });
      });
    }
  }, [modalContext.isOpen, setupFocusTrap, useNativeDialog]);
  useEffect(() => {
    if (useNativeDialog) return;
    if (!modalContext.isOpen && transitionState === "entered") {
      setTransitionState("leaving");
      const wrapper = wrapperRef.current;
      if (wrapper) {
        onTransitionEnd(wrapper, () => {
          setTransitionState("exited");
          onAfterLeave?.();
          modalContext.afterLeave();
        });
      }
    }
  }, [modalContext.isOpen, transitionState, onAfterLeave, modalContext, useNativeDialog]);
  useEffect(() => {
    if (!useNativeDialog) return;
    if (modalContext.isOpen) {
      openDialog();
    } else if (!isLeaving) {
      closeDialog();
    }
  }, [modalContext.isOpen, openDialog, closeDialog, isLeaving, useNativeDialog]);
  const renderContent = () => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `im-slideover-content relative ${config.paddingClasses} ${config.panelClasses}`,
      "data-inertiaui-modal-entered": entered,
      children: [
        config.closeButton && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CloseButton, { onClick: modalContext.close }) }),
        typeof children === "function" ? children({ modalContext, config }) : children
      ]
    }
  );
  if (useNativeDialog) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "dialog",
      {
        ref: dialogRef,
        className: clsx(
          "im-slideover-dialog m-0 overflow-visible bg-transparent p-0",
          "size-full max-h-none max-w-none",
          "backdrop:bg-black/75 backdrop:transition-opacity backdrop:duration-300",
          entered ? "backdrop:opacity-100" : "backdrop:opacity-0",
          !isFirstModal && "backdrop:bg-transparent"
        ),
        onCancel: handleCancel,
        onClick: handleDialogClick,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "im-slideover-container fixed inset-0 overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: clsx("im-slideover-positioner flex min-h-full items-center", {
              "justify-start rtl:justify-end": config?.position === "left",
              "justify-end rtl:justify-start": config?.position === "right"
            }),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                ref: nativeWrapperRef,
                className: clsx(
                  "im-slideover-wrapper w-full transition duration-300 ease-in-out",
                  modalContext.onTopOfStack ? "" : "blur-xs",
                  getTransformClass(!(entered && !isLeaving)),
                  maxWidthClass
                ),
                children: renderContent()
              }
            )
          }
        ) })
      }
    );
  }
  if (transitionState === "exited") return null;
  const isEntering = transitionState === "entering";
  const isLeavingNonNative = transitionState === "leaving";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden",
      onMouseDown: handleClickOutside,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: clsx("im-slideover-positioner flex min-h-full items-center", {
            "justify-start rtl:justify-end": config?.position === "left",
            "justify-end rtl:justify-start": config?.position === "right"
          }),
          onMouseDown: handleClickOutside,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              ref: wrapperRef,
              role: "dialog",
              "aria-modal": "true",
              className: clsx(
                "im-slideover-wrapper w-full transition duration-300 ease-in-out",
                modalContext.onTopOfStack ? "" : "blur-xs",
                getTransformClass(isEntering || isLeavingNonNative),
                maxWidthClass
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Dialog" }),
                renderContent()
              ]
            }
          )
        }
      )
    }
  );
};
const Modal = forwardRef(
  (allProps, ref) => {
    const { name, children, onFocus, onBlur, onClose, onSuccess, onAfterLeave, ...props } = allProps;
    const renderChildren = (contentProps) => {
      if (typeof children === "function") {
        return children(contentProps);
      }
      return children;
    };
    const headlessModalRef = useRef(null);
    const cleanupScrollLockRef = useRef(null);
    const cleanupAriaHiddenRef = useRef(null);
    const [rendered, setRendered] = useState(false);
    const useNativeDialog = useMemo(() => getConfig("useNativeDialog"), []);
    useImperativeHandle(ref, () => headlessModalRef.current, [headlessModalRef]);
    useEffect(() => {
      return () => {
        cleanupScrollLockRef.current?.();
        cleanupAriaHiddenRef.current?.();
      };
    }, []);
    const handleSuccess = useCallback(() => {
      onSuccess?.();
      if (!cleanupScrollLockRef.current) {
        cleanupScrollLockRef.current = lockScroll();
        cleanupAriaHiddenRef.current = markAriaHidden(getConfig("appElement"));
      }
    }, [onSuccess]);
    const handleClose = useCallback(() => {
      onClose?.();
      cleanupScrollLockRef.current?.();
      cleanupAriaHiddenRef.current?.();
      cleanupScrollLockRef.current = null;
      cleanupAriaHiddenRef.current = null;
    }, [onClose]);
    const handleAfterLeave = useCallback(() => {
      onAfterLeave?.();
    }, [onAfterLeave]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
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
        }) => /* @__PURE__ */ jsxRuntimeExports.jsx(ModalPortal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "im-dialog relative z-20",
            "data-inertiaui-modal-id": id,
            "data-inertiaui-modal-index": index,
            "aria-hidden": !onTopOfStack,
            children: [
              index === 0 && !useNativeDialog && /* @__PURE__ */ jsxRuntimeExports.jsx(
                BackdropTransition,
                {
                  show: isOpen,
                  appear: !rendered,
                  onAfterAppear: () => setRendered(true)
                }
              ),
              config.slideover ? /* @__PURE__ */ jsxRuntimeExports.jsx(
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
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
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
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return createPortal(children, document.body);
}
function BackdropTransition({ show, appear, onAfterAppear }) {
  const [state, setState] = useState(() => {
    if (appear && show) return "entering";
    return show ? "entered" : "exited";
  });
  const initialRender = useRef(true);
  const backdropRef = useRef(null);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      if (appear && show) {
        requestAnimationFrame(() => {
          setState("entered");
          const backdrop = backdropRef.current;
          if (backdrop) {
            const onTransitionEnd2 = (e) => {
              if (e.target !== backdrop) return;
              backdrop.removeEventListener("transitionend", onTransitionEnd2);
              onAfterAppear?.();
            };
            backdrop.addEventListener("transitionend", onTransitionEnd2);
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
        const onTransitionEnd2 = (e) => {
          if (e.target !== backdrop) return;
          backdrop.removeEventListener("transitionend", onTransitionEnd2);
          setState("exited");
        };
        backdrop.addEventListener("transitionend", onTransitionEnd2);
      }
    }
  }, [show, appear, onAfterAppear]);
  if (state === "exited") return null;
  const isVisible = state === "entered";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
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
  const [loading, setLoading] = useState(false);
  const [modalContext, setModalContext] = useState(null);
  const { stack, visit } = useModalStack();
  const hoverTimeout = useRef(null);
  const shouldNavigate = useMemo(() => {
    return navigate ?? getConfig("navigate");
  }, [navigate]);
  const prefetchModes = useMemo(() => {
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
  const doPrefetch = useCallback(() => {
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
  const handleMouseEnter = useCallback(() => {
    if (!prefetchModes.includes("hover")) return;
    hoverTimeout.current = setTimeout(() => {
      doPrefetch();
    }, 75);
  }, [prefetchModes, doPrefetch]);
  const handleMouseLeave = useCallback(() => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
  }, []);
  const handleMouseDown = useCallback(
    (event) => {
      if (!prefetchModes.includes("click")) return;
      if (event.button !== 0) return;
      doPrefetch();
    },
    [prefetchModes, doPrefetch]
  );
  useEffect(() => {
    if (prefetchModes.includes("mount")) {
      doPrefetch();
    }
  }, []);
  useEffect(() => {
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
      if (isStandardDomEvent(key)) {
        standardProps[key] = props[key];
      } else {
        customEvents[key] = props[key];
      }
    } else {
      standardProps[key] = props[key];
    }
  });
  const [isBlurred, setIsBlurred] = useState(false);
  useEffect(() => {
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
  const onCloseCallback = useCallback(() => {
    onClose?.();
  }, [onClose]);
  const onAfterLeaveCallback = useCallback(() => {
    setModalContext(null);
    onAfterLeave?.();
  }, [onAfterLeave]);
  const handle = useCallback(
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
        rejectNullValues(only(props, modalPropNames)),
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
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
  const [loaded, setLoaded] = useState(false);
  const hasFetched = useRef(false);
  const fetching = useRef(false);
  const ref = useRef(null);
  const modal = useModal();
  const getReloadParams = useCallback(() => {
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
  useEffect(() => {
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
    return createElement(
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
const setPageLayout = (layout) => (module) => {
  module.default.layout = (page) => createElement(layout, { children: page });
  return module;
};
export {
  Deferred,
  HeadlessModal,
  Modal,
  ModalLink,
  ModalRoot,
  ModalStackProvider,
  WhenVisible,
  vanilla as dialogUtils,
  getConfig,
  initFromPageProps,
  modalPropNames,
  prefetch,
  putConfig,
  renderApp,
  resetConfig,
  setPageLayout,
  useModal,
  useModalIndex,
  useModalStack
};
//# sourceMappingURL=inertiaui-modal.js.map
