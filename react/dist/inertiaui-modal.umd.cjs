(function(global, factory) {
	typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("react"), require("@inertiaui/vanilla"), require("@inertiajs/react"), require("@inertiajs/core"), require("react/jsx-runtime"), require("react-dom")) : typeof define === "function" && define.amd ? define([
		"exports",
		"react",
		"@inertiaui/vanilla",
		"@inertiajs/react",
		"@inertiajs/core",
		"react/jsx-runtime",
		"react-dom"
	], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.InertiaUIModal = {}, global.React, global.InertiaUIVanilla, global.InertiaReact, global.InertiaCore, global.ReactJSXRuntime, global.ReactDOM));
})(this, function(exports, react, _inertiaui_vanilla, _inertiajs_react, _inertiajs_core, react_jsx_runtime, react_dom) {
	Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
	//#region \0rolldown/runtime.js
	var __create = Object.create;
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __getProtoOf = Object.getPrototypeOf;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
			key = keys[i];
			if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: ((k) => from[k]).bind(null, key),
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
		value: mod,
		enumerable: true
	}) : target, mod));
	//#endregion
	react = __toESM(react, 1);
	_inertiaui_vanilla = __toESM(_inertiaui_vanilla, 1);
	//#region src/config.ts
	var defaultConfig = {
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
	var Config = class {
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
					modal: {
						...defaultConfig.modal,
						...key.modal ?? {}
					},
					slideover: {
						...defaultConfig.slideover,
						...key.slideover ?? {}
					}
				};
				return;
			}
			const keys = key.split(".");
			let current = this.config;
			for (let i = 0; i < keys.length - 1; i++) current = current[keys[i]] = current[keys[i]] || {};
			current[keys[keys.length - 1]] = value;
		}
		get(key) {
			if (typeof key === "undefined") return this.config;
			const keys = key.split(".");
			let current = this.config;
			for (const k of keys) {
				if (current === null || current === void 0 || typeof current !== "object") return null;
				current = current[k];
			}
			return current === void 0 ? null : current;
		}
	};
	var configInstance = new Config();
	var resetConfig = () => configInstance.reset();
	var putConfig = (key, value) => configInstance.put(key, value);
	var getConfig = (key) => configInstance.get(key);
	var getConfigByType = (isSlideover, key) => configInstance.get(isSlideover ? `slideover.${key}` : `modal.${key}`);
	//#endregion
	//#region src/helpers.ts
	function parseResponseData(data) {
		return typeof data === "string" ? JSON.parse(data) : data;
	}
	var generateIdUsingCallback = null;
	function generateId(prefix = "inertiaui_") {
		if (generateIdUsingCallback) return generateIdUsingCallback();
		return (0, _inertiaui_vanilla.generateId)(prefix);
	}
	//#endregion
	//#region src/cache.ts
	var ResponseCache = class {
		constructor() {
			this.cache = /* @__PURE__ */ new Map();
			this.timers = /* @__PURE__ */ new Map();
			this.inFlight = /* @__PURE__ */ new Map();
		}
		static key(method, url, data) {
			return `${method}:${url}:${JSON.stringify(data)}`;
		}
		get(key) {
			const cached = this.cache.get(key);
			if (!cached) return null;
			if (Date.now() > cached.expiresAt) {
				this.delete(key);
				return null;
			}
			return cached.response;
		}
		set(key, response, cacheFor) {
			this.delete(key);
			this.cache.set(key, {
				response,
				expiresAt: Date.now() + cacheFor
			});
			if (cacheFor > 0) this.timers.set(key, setTimeout(() => this.delete(key), cacheFor));
		}
		delete(key) {
			this.cache.delete(key);
			const timer = this.timers.get(key);
			if (timer) {
				clearTimeout(timer);
				this.timers.delete(key);
			}
		}
		getInFlight(key) {
			return this.inFlight.get(key);
		}
		setInFlight(key, promise) {
			this.inFlight.set(key, promise);
		}
		deleteInFlight(key) {
			this.inFlight.delete(key);
		}
	};
	//#endregion
	//#region src/ModalRoot.tsx
	var ModalStackContext = (0, react.createContext)(null);
	ModalStackContext.displayName = "ModalStackContext";
	var baseUrl = null;
	var currentPageVersion = null;
	var closingToBaseUrlTarget = null;
	var prefetchCache = new ResponseCache();
	function prefetch(href, options = {}) {
		if (href.startsWith("#")) return Promise.resolve();
		const method = options.method ?? "get";
		const data = options.data ?? {};
		const headers = options.headers ?? {};
		const queryStringArrayFormat = options.queryStringArrayFormat ?? "brackets";
		const cacheFor = options.cacheFor ?? 3e4;
		const [url, mergedData] = (0, _inertiajs_core.mergeDataIntoQueryString)(method, href || "", data, queryStringArrayFormat);
		const cacheKey = ResponseCache.key(method, url, mergedData);
		if (prefetchCache.get(cacheKey)) return Promise.resolve();
		const inFlight = prefetchCache.getInFlight(cacheKey);
		if (inFlight) return inFlight.then(() => {});
		options.onPrefetching?.();
		const requestHeaders = {
			...headers,
			Accept: "text/html, application/xhtml+xml",
			"X-Requested-With": "XMLHttpRequest",
			"X-Inertia": "true",
			"X-Inertia-Version": currentPageVersion ?? "",
			"X-InertiaUI-Modal": generateId(),
			"X-InertiaUI-Modal-Base-Url": baseUrl ?? ""
		};
		const request = _inertiajs_react.http.getClient().request({
			url,
			method,
			data: mergedData,
			headers: requestHeaders
		}).then((response) => {
			prefetchCache.set(cacheKey, response, cacheFor);
			options.onPrefetched?.();
			return response;
		}).finally(() => {
			prefetchCache.deleteInFlight(cacheKey);
		});
		prefetchCache.setInFlight(cacheKey, request);
		return request.then(() => {});
	}
	var ModalStackProvider = ({ children }) => {
		const stackRef = (0, react.useRef)([]);
		const [, forceUpdate] = (0, react.useReducer)((x) => x + 1, 0);
		const [localModals, setLocalModals] = (0, react.useState)({});
		const updateStack = (withStack) => {
			const newStack = withStack([...stackRef.current]);
			const isOnTopOfStack = (modalId) => {
				if (newStack.length < 2) return true;
				return newStack.map((modal) => ({
					id: modal.id,
					shouldRender: modal.shouldRender
				})).reverse().find((modal) => modal.shouldRender)?.id === modalId;
			};
			newStack.forEach((modal, index) => {
				newStack[index].onTopOfStack = isOnTopOfStack(modal.id);
				newStack[index].getParentModal = () => {
					if (index < 1) return null;
					return stackRef.current.slice(0, index).reverse().find((m) => m.isOpen) ?? null;
				};
				newStack[index].getChildModal = () => {
					if (index === stackRef.current.length - 1) return null;
					return stackRef.current.slice(index + 1).find((m) => m.isOpen) ?? null;
				};
			});
			stackRef.current = newStack;
			forceUpdate();
		};
		class ModalClass {
			constructor(component, response, config, onClose, afterLeave) {
				this.show = () => {
					updateStack((prevStack) => prevStack.map((modal) => {
						if (modal.id === this.id && !modal.isOpen) {
							modal.isOpen = true;
							modal.shouldRender = true;
						}
						return modal;
					}));
				};
				this.setOpen = (open) => {
					if (open) this.show();
					else this.close();
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
					if (this.isOpen) return;
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
							if (savedBaseUrl && typeof window !== "undefined" && !(0, _inertiaui_vanilla.sameUrlPath)(savedBaseUrl, window.location.href)) _inertiajs_react.router.push({
								url: savedBaseUrl,
								preserveScroll: true,
								preserveState: true,
								props: (currentProps) => {
									const { _inertiaui_modal, ...rest } = currentProps;
									return {
										...rest,
										_inertiaui_modal: void 0
									};
								}
							});
							return [];
						}
						return updatedStack;
					});
				};
				this.on = (event, callback) => {
					event = (0, _inertiaui_vanilla.kebabCase)(event);
					this.listeners[event] = this.listeners[event] ?? [];
					this.listeners[event].push(callback);
				};
				this.off = (event, callback) => {
					event = (0, _inertiaui_vanilla.kebabCase)(event);
					if (callback) this.listeners[event] = this.listeners[event]?.filter((cb) => cb !== callback) ?? [];
					else delete this.listeners[event];
				};
				this.emit = (event, ...args) => {
					this.listeners[(0, _inertiaui_vanilla.kebabCase)(event)]?.forEach((callback) => callback(...args));
				};
				this.registerEventListenersFromProps = (props) => {
					const unsubscribers = [];
					Object.keys(props).filter((key) => key.startsWith("on")).forEach((key) => {
						const eventName = (0, _inertiaui_vanilla.kebabCase)(key).replace(/^on-/, "");
						const callback = props[key];
						this.on(eventName, callback);
						unsubscribers.push(() => this.off(eventName, callback));
					});
					return () => unsubscribers.forEach((unsub) => unsub());
				};
				this.reload = (options = {}) => {
					let keys = Object.keys(this.response.props);
					if (options.only) keys = options.only;
					if (options.except) keys = (0, _inertiaui_vanilla.except)(keys, options.except);
					if (!this.response?.url) return;
					const method = options.method ?? "get";
					const data = options.data ?? {};
					options.onStart?.();
					_inertiajs_react.http.getClient().request({
						url: this.response.url,
						method,
						data: method === "get" ? void 0 : data,
						params: method === "get" ? data : void 0,
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
					}).then((response) => {
						this.updateProps(parseResponseData(response.data).props);
						options.onSuccess?.(response);
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
			if (!isValidModalResponse(responseData)) return Promise.reject(/* @__PURE__ */ new Error("Invalid modal response. This usually happens when the server returns a redirect (e.g., due to session expiration). Check if the user is still authenticated."));
			return _inertiajs_react.router.resolveComponent(responseData.component).then((component) => push(component, responseData, config, onClose, onAfterLeave));
		};
		const loadDeferredProps = (modal) => {
			const deferred = modal.response?.meta?.deferredProps;
			if (!deferred) return;
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
			if (!localModals[name]) throw new Error(`The local modal "${name}" has not been registered.`);
			const modal = push(null, { props: props ?? {} }, config, onClose, afterLeave);
			modal.name = name;
			localModals[name].callback(modal);
			return modal;
		}
		const visitModal = (url, options = {}) => visit(url, options.method ?? "get", options.data ?? {}, options.headers ?? {}, options.config ?? {}, options.onClose ?? null, options.onAfterLeave ?? null, options.queryStringArrayFormat ?? "brackets", options.navigate ?? getConfig("navigate"), options.onStart ?? null, options.onSuccess ?? null, options.onError ?? null, options.props ?? null).then((modal) => {
			const listeners = options.listeners ?? {};
			Object.keys(listeners).forEach((event) => {
				const eventName = (0, _inertiaui_vanilla.kebabCase)(event);
				modal.on(eventName, listeners[event]);
			});
			return modal;
		});
		const updateBrowserUrl = (url, useBrowserHistory, modalData) => {
			if (!url || !useBrowserHistory || typeof window === "undefined") return;
			_inertiajs_react.router.push({
				url,
				preserveScroll: true,
				preserveState: true,
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
				const [url, data] = (0, _inertiajs_core.mergeDataIntoQueryString)(method, href || "", payload, queryStringArrayFormat);
				const cachedResponse = prefetchCache.get(ResponseCache.key(method, url, data));
				if (cachedResponse) {
					const cachedData = parseResponseData(cachedResponse.data);
					onSuccess?.(cachedResponse);
					pushFromResponseData(cachedData, config, onClose, onAfterLeave).then((modal) => {
						updateBrowserUrl(cachedData.url, useBrowserHistory, cachedData);
						resolve(modal);
					}).catch(reject);
					return;
				}
				if (stackRef.current.length === 0) baseUrl = typeof window !== "undefined" ? window.location.href : "";
				const requestHeaders = {
					...headers,
					Accept: "text/html, application/xhtml+xml",
					"X-Requested-With": "XMLHttpRequest",
					"X-Inertia": "true",
					"X-Inertia-Version": currentPageVersion ?? "",
					"X-InertiaUI-Modal": modalId,
					"X-InertiaUI-Modal-Base-Url": baseUrl ?? ""
				};
				onStart?.();
				_inertiajs_react.progress?.start();
				_inertiajs_react.http.getClient().request({
					url,
					method,
					data,
					headers: requestHeaders
				}).then((response) => {
					const responseData = parseResponseData(response.data);
					onSuccess?.(response);
					pushFromResponseData(responseData, config, onClose, onAfterLeave).then((modal) => {
						updateBrowserUrl(responseData.url, useBrowserHistory, responseData);
						resolve(modal);
					}).catch(reject);
				}).catch((...args) => {
					onError?.(...args);
					reject(args[0]);
				}).finally(() => {
					_inertiajs_react.progress?.finish();
				});
			});
		};
		const registerLocalModal = (name, callback) => {
			setLocalModals((prevLocalModals) => ({
				...prevLocalModals,
				[name]: {
					name,
					callback
				}
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
				if (force) updateStack(() => []);
				else [...stackRef.current].reverse().forEach((modal) => modal.close());
			},
			reset: () => updateStack(() => []),
			visit,
			visitModal,
			registerLocalModal,
			removeLocalModal
		};
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ModalStackContext.Provider, {
			value,
			children
		});
	};
	var useModalStack = () => {
		const context = (0, react.useContext)(ModalStackContext);
		if (context === null) throw new Error("useModalStack must be used within a ModalStackProvider");
		return context;
	};
	var modalPropNames = [
		"closeButton",
		"closeExplicitly",
		"closeOnClickOutside",
		"maxWidth",
		"paddingClasses",
		"panelClasses",
		"position",
		"slideover"
	];
	var initFromPageProps = (pageProps) => {
		if (pageProps.initialPage) currentPageVersion = pageProps.initialPage.version ?? null;
	};
	var renderApp = (App, pageProps) => {
		initFromPageProps(pageProps);
		const renderInertiaApp = ({ Component, props, key }) => {
			const renderComponent = () => {
				const child = (0, react.createElement)(Component, {
					key,
					...props
				});
				if (typeof Component.layout === "function") return Component.layout(child);
				if (Array.isArray(Component.layout)) return Component.layout.slice().reverse().reduce((acc, Layout) => (0, react.createElement)(Layout, props, acc), child);
				return child;
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [renderComponent(), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ModalRoot, {})] });
		};
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ModalStackProvider, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(App, {
			...pageProps,
			children: renderInertiaApp
		}) });
	};
	var ModalRoot = ({ children }) => {
		const context = (0, react.useContext)(ModalStackContext);
		const $page = (0, _inertiajs_react.usePage)();
		const pendingModalKeysRef = (0, react.useRef)(/* @__PURE__ */ new Set());
		currentPageVersion = $page.version ?? null;
		const getModalKey = (modalData) => modalData.id || `${modalData.component}:${modalData.url}`;
		const isNavigatingRef = (0, react.useRef)(false);
		const pageRef = (0, react.useRef)($page);
		pageRef.current = $page;
		(0, react.useLayoutEffect)(() => _inertiajs_react.http.onRequest((config) => {
			const baseUrlValue = baseUrl ?? pageRef.current.props._inertiaui_modal?.baseUrl ?? null;
			if (baseUrlValue) {
				config.headers = config.headers ?? {};
				config.headers["X-InertiaUI-Modal-Base-Url"] = baseUrlValue;
			}
			return config;
		}), []);
		(0, react.useEffect)(() => _inertiajs_react.router.on("start", () => isNavigatingRef.current = true), []);
		(0, react.useEffect)(() => _inertiajs_react.router.on("finish", () => isNavigatingRef.current = false), []);
		(0, react.useEffect)(() => _inertiajs_react.router.on("navigate", function($event) {
			const modalOnBase = $event.detail.page.props._inertiaui_modal;
			const pageUrl = $event.detail.page.url;
			if (closingToBaseUrlTarget) {
				if (new URL(closingToBaseUrlTarget, "http://x").pathname === new URL(pageUrl, "http://x").pathname) {
					closingToBaseUrlTarget = null;
					context?.closeAll(true);
					baseUrl = null;
					return;
				}
				closingToBaseUrlTarget = null;
			}
			if (!modalOnBase) {
				context?.closeAll(true);
				baseUrl = null;
				return;
			}
			if (!(0, _inertiaui_vanilla.sameUrlPath)(pageUrl, modalOnBase.url)) {
				context?.closeAll(true);
				baseUrl = null;
				return;
			}
			const modalKey = getModalKey(modalOnBase);
			if (pendingModalKeysRef.current.has(modalKey)) return;
			if (modalOnBase.id && context?.stack.some((m) => m.id === modalOnBase.id)) return;
			if (context?.stack.some((m) => m.response?.component === modalOnBase.component && (0, _inertiaui_vanilla.sameUrlPath)(m.response?.url, modalOnBase.url))) return;
			baseUrl = modalOnBase.baseUrl;
			pendingModalKeysRef.current.add(modalKey);
			context?.pushFromResponseData(modalOnBase, {}, () => {
				if (!modalOnBase.baseUrl) {
					console.error("No base url in modal response data so cannot navigate back");
					return;
				}
				baseUrl = null;
				if (!isNavigatingRef.current && typeof window !== "undefined" && window.location.href !== modalOnBase.baseUrl) _inertiajs_react.router.visit(modalOnBase.baseUrl, {
					preserveScroll: true,
					preserveState: true
				});
			}).finally(() => {
				pendingModalKeysRef.current.delete(modalKey);
			});
		}), []);
		const previousModalRef = (0, react.useRef)(void 0);
		(0, react.useEffect)(() => {
			const newModal = $page.props?._inertiaui_modal;
			const previousModal = previousModalRef.current;
			previousModalRef.current = newModal;
			if (!newModal) return;
			if (previousModal && newModal.component === previousModal.component && (0, _inertiaui_vanilla.sameUrlPath)(newModal.url, previousModal.url)) {
				context?.stack[0]?.updateProps(newModal.props ?? {});
				return;
			}
			if (!previousModal && context && context.stack.length > 0) {
				const existingModal = context.stack.find((m) => m.response?.component === newModal.component && (0, _inertiaui_vanilla.sameUrlPath)(m.response?.url, newModal.url));
				if (existingModal) existingModal.updateProps(newModal.props ?? {});
			}
		}, [$page.props?._inertiaui_modal]);
		return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [children, context && context.stack.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ModalRenderer, { index: 0 })] });
	};
	//#endregion
	//#region src/ModalRenderer.tsx
	var ModalIndexContext = react.default.createContext(null);
	ModalIndexContext.displayName = "ModalIndexContext";
	var useModalIndex = () => {
		return react.default.useContext(ModalIndexContext);
	};
	var ModalRenderer = ({ index }) => {
		const { stack } = useModalStack();
		const modalContext = (0, react.useMemo)(() => {
			return stack[index];
		}, [stack, index]);
		if (!modalContext?.component) return null;
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ModalIndexContext.Provider, {
			value: index,
			children: (0, react.createElement)(modalContext.component, {
				...modalContext.props,
				onModalEvent: (...args) => modalContext.emit("modal-event", ...args)
			})
		});
	};
	//#endregion
	//#region src/useModal.ts
	function useModal() {
		return useModalStack().stack[useModalIndex()] ?? null;
	}
	//#endregion
	//#region src/Deferred.tsx
	var Deferred = ({ children, data, fallback }) => {
		if (!data) throw new Error("`<Deferred>` requires a `data` prop to be a string or array of strings");
		const [loaded, setLoaded] = (0, react.useState)(false);
		const keys = Array.isArray(data) ? data : [data];
		const modalProps = useModal()?.props ?? {};
		(0, react.useEffect)(() => {
			setLoaded(keys.every((key) => modalProps[key] !== void 0));
		}, [modalProps, keys]);
		return loaded ? children : fallback;
	};
	Deferred.displayName = "InertiaModalDeferred";
	//#endregion
	//#region src/HeadlessModal.tsx
	var HeadlessModal = (0, react.forwardRef)((allProps, ref) => {
		const { name, children, onFocus, onBlur, onClose, onSuccess, ...props } = allProps;
		const modalIndex = useModalIndex();
		const { stack, registerLocalModal, removeLocalModal } = useModalStack();
		const [localModalContext, setLocalModalContext] = (0, react.useState)(null);
		const modalContext = (0, react.useMemo)(() => name ? localModalContext : stack[modalIndex], [
			name,
			localModalContext,
			modalIndex,
			stack
		]);
		const nextIndex = (0, react.useMemo)(() => {
			return stack.find((m) => m.shouldRender && m.index > (modalContext?.index ?? -1))?.index;
		}, [modalIndex, stack]);
		const configSlideover = (0, react.useMemo)(() => modalContext?.config.slideover ?? props.slideover ?? getConfig("type") === "slideover", [props.slideover, modalContext?.config.slideover]);
		const config = (0, react.useMemo)(() => ({
			slideover: configSlideover,
			closeButton: props.closeButton ?? getConfigByType(configSlideover, "closeButton"),
			closeExplicitly: props.closeExplicitly ?? getConfigByType(configSlideover, "closeExplicitly"),
			closeOnClickOutside: props.closeOnClickOutside ?? getConfigByType(configSlideover, "closeOnClickOutside"),
			maxWidth: props.maxWidth ?? getConfigByType(configSlideover, "maxWidth"),
			paddingClasses: props.paddingClasses ?? getConfigByType(configSlideover, "paddingClasses"),
			panelClasses: props.panelClasses ?? getConfigByType(configSlideover, "panelClasses"),
			position: props.position ?? getConfigByType(configSlideover, "position"),
			...modalContext?.config
		}), [
			props,
			modalContext?.config,
			configSlideover
		]);
		(0, react.useEffect)(() => {
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
		const modalContextRef = (0, react.useRef)(modalContext);
		(0, react.useEffect)(() => {
			modalContextRef.current = modalContext;
		}, [modalContext]);
		const previousIsOpenRef = (0, react.useRef)(void 0);
		(0, react.useEffect)(() => {
			if (modalContext != null) {
				if (modalContext.isOpen) onSuccess?.();
				else if (previousIsOpenRef.current === true) onClose?.();
				previousIsOpenRef.current = modalContext.isOpen;
			}
		}, [modalContext?.isOpen]);
		const [rendered, setRendered] = (0, react.useState)(false);
		(0, react.useEffect)(() => {
			if (rendered && modalContext != null && modalContext.isOpen) if (modalContext.onTopOfStack) onFocus?.();
			else onBlur?.();
			setRendered(true);
		}, [modalContext?.onTopOfStack]);
		(0, react.useImperativeHandle)(ref, () => ({
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
		}), [modalContext]);
		if (!modalContext?.shouldRender) return null;
		return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [typeof children === "function" ? children({
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
		}) : children, nextIndex !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ModalRenderer, { index: nextIndex })] });
	});
	HeadlessModal.displayName = "HeadlessModal";
	//#endregion
	//#region src/CloseButton.tsx
	function CloseButton({ onClick }) {
		return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "im-close-button text-gray-400 hover:text-gray-500",
			onClick,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
				className: "size-6",
				xmlns: "http://www.w3.org/2000/svg",
				fill: "none",
				viewBox: "0 0 24 24",
				strokeWidth: "2",
				stroke: "currentColor",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					strokeLinecap: "round",
					strokeLinejoin: "round",
					d: "M6 18L18 6M6 6l12 12"
				})
			})]
		});
	}
	//#endregion
	//#region ../node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
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
	//#endregion
	//#region src/constants.ts
	/**
	* Max width classes for modals and slideovers.
	* Uses a map lookup for Tailwind 4 compatibility (scanner picks up full class strings).
	*/
	var maxWidthClasses = {
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
	function getMaxWidthClass(maxWidth) {
		return maxWidthClasses[maxWidth] || maxWidthClasses["2xl"];
	}
	//#endregion
	//#region src/ModalContent.tsx
	var ModalContent = ({ modalContext, config, useNativeDialog, isFirstModal, onAfterLeave, children }) => {
		const [isRendered, setIsRendered] = (0, react.useState)(false);
		const [isVisible, setIsVisible] = (0, react.useState)(false);
		const [entered, setEntered] = (0, react.useState)(false);
		const wrapperRef = (0, react.useRef)(null);
		const dialogRef = (0, react.useRef)(null);
		const nativeWrapperRef = (0, react.useRef)(null);
		const cleanupFocusTrapRef = (0, react.useRef)(null);
		const cleanupEscapeKeyRef = (0, react.useRef)(null);
		const maxWidthClass = (0, react.useMemo)(() => getMaxWidthClass(config.maxWidth), [config.maxWidth]);
		const animateIn = (0, react.useCallback)(async (element) => {
			if (!element) return;
			setIsVisible(true);
			await (0, _inertiaui_vanilla.animate)(element, [{
				transform: "translate3d(0, 1rem, 0) scale(0.95)",
				opacity: 0
			}, {
				transform: "translate3d(0, 0, 0) scale(1)",
				opacity: 1
			}]);
			setEntered(true);
		}, []);
		const animateOut = (0, react.useCallback)(async (element) => {
			if (!element) return;
			setIsVisible(false);
			await (0, _inertiaui_vanilla.animate)(element, [{
				transform: "translate3d(0, 0, 0) scale(1)",
				opacity: 1
			}, {
				transform: "translate3d(0, 1rem, 0) scale(0.95)",
				opacity: 0
			}]);
			setIsRendered(false);
			if (useNativeDialog && dialogRef.current) dialogRef.current.close();
			onAfterLeave?.();
			modalContext.afterLeave();
		}, [
			useNativeDialog,
			onAfterLeave,
			modalContext
		]);
		const setupFocusTrap = (0, react.useCallback)(() => {
			if (useNativeDialog) return;
			if (!wrapperRef.current || !modalContext.onTopOfStack) return;
			if (cleanupFocusTrapRef.current) return;
			cleanupFocusTrapRef.current = (0, _inertiaui_vanilla.createFocusTrap)(wrapperRef.current, {
				initialFocus: true,
				returnFocus: false
			});
		}, [modalContext.onTopOfStack, useNativeDialog]);
		const cleanupFocusTrap = (0, react.useCallback)(() => {
			if (cleanupFocusTrapRef.current) {
				cleanupFocusTrapRef.current();
				cleanupFocusTrapRef.current = null;
			}
		}, []);
		const setupEscapeKey = (0, react.useCallback)(() => {
			if (useNativeDialog) return;
			if (cleanupEscapeKeyRef.current) return;
			if (config?.closeExplicitly) return;
			cleanupEscapeKeyRef.current = (0, _inertiaui_vanilla.onEscapeKey)(() => {
				if (modalContext.onTopOfStack) modalContext.close();
			});
		}, [
			config?.closeExplicitly,
			modalContext,
			useNativeDialog
		]);
		const cleanupEscapeKey = (0, react.useCallback)(() => {
			if (cleanupEscapeKeyRef.current) {
				cleanupEscapeKeyRef.current();
				cleanupEscapeKeyRef.current = null;
			}
		}, []);
		const handleClickOutside = (0, react.useCallback)((event) => {
			if (useNativeDialog) return;
			if (!modalContext.onTopOfStack) return;
			if (config?.closeExplicitly) return;
			if (config?.closeOnClickOutside === false) return;
			if (!wrapperRef.current) return;
			if (!wrapperRef.current.contains(event.target)) modalContext.close();
		}, [
			modalContext,
			config?.closeExplicitly,
			config?.closeOnClickOutside,
			useNativeDialog
		]);
		const handleCancel = (0, react.useCallback)((event) => {
			event.preventDefault();
			if (modalContext.onTopOfStack && !config?.closeExplicitly) modalContext.close();
		}, [modalContext, config?.closeExplicitly]);
		const handleDialogClick = (0, react.useCallback)((event) => {
			if (event.target === dialogRef.current) {
				if (modalContext.onTopOfStack && !config?.closeExplicitly && config?.closeOnClickOutside !== false) modalContext.close();
			}
		}, [
			modalContext,
			config?.closeExplicitly,
			config?.closeOnClickOutside
		]);
		const prevIsOpenRef = (0, react.useRef)(modalContext.isOpen);
		(0, react.useEffect)(() => {
			if (useNativeDialog) {
				if (modalContext.isOpen && !dialogRef.current?.open) {
					dialogRef.current?.showModal();
					animateIn(nativeWrapperRef.current);
				} else if (!modalContext.isOpen && prevIsOpenRef.current) {
					setEntered(false);
					animateOut(nativeWrapperRef.current);
				}
			} else if (modalContext.isOpen && !isRendered) setIsRendered(true);
			else if (!modalContext.isOpen && prevIsOpenRef.current) {
				setEntered(false);
				animateOut(wrapperRef.current);
			}
			prevIsOpenRef.current = modalContext.isOpen;
		}, [
			modalContext.isOpen,
			useNativeDialog,
			animateIn,
			animateOut,
			isRendered
		]);
		(0, react.useEffect)(() => {
			if (!useNativeDialog && isRendered && !entered && modalContext.isOpen) animateIn(wrapperRef.current).then(() => {
				setupFocusTrap();
			});
		}, [
			isRendered,
			useNativeDialog,
			entered,
			modalContext.isOpen,
			animateIn,
			setupFocusTrap
		]);
		(0, react.useEffect)(() => {
			if (!useNativeDialog) setupEscapeKey();
			return () => {
				cleanupEscapeKey();
			};
		}, [
			useNativeDialog,
			setupEscapeKey,
			cleanupEscapeKey
		]);
		(0, react.useEffect)(() => {
			if (useNativeDialog) return;
			if (modalContext.onTopOfStack) {
				setupEscapeKey();
				if (entered) setupFocusTrap();
			} else {
				cleanupFocusTrap();
				cleanupEscapeKey();
			}
		}, [
			modalContext.onTopOfStack,
			entered,
			setupEscapeKey,
			setupFocusTrap,
			cleanupFocusTrap,
			cleanupEscapeKey,
			useNativeDialog
		]);
		(0, react.useEffect)(() => {
			return () => {
				const wrapper = useNativeDialog ? nativeWrapperRef.current : wrapperRef.current;
				if (wrapper) (0, _inertiaui_vanilla.cancelAnimations)(wrapper);
				if (useNativeDialog) {
					if (dialogRef.current?.open) dialogRef.current.close();
				} else {
					cleanupFocusTrap();
					cleanupEscapeKey();
				}
			};
		}, [
			useNativeDialog,
			cleanupFocusTrap,
			cleanupEscapeKey
		]);
		const renderContent = () => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: `im-modal-content relative ${config.paddingClasses} ${config.panelClasses}`,
			"data-inertiaui-modal-entered": entered,
			children: [config.closeButton && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "absolute right-0 top-0 pr-3 pt-3",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CloseButton, { onClick: modalContext.close })
			}), typeof children === "function" ? children({
				modalContext,
				config
			}) : children]
		});
		if (useNativeDialog) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("dialog", {
			ref: dialogRef,
			className: clsx("im-modal-dialog m-0 overflow-visible bg-transparent p-0", "size-full max-h-none max-w-none", "backdrop:bg-black/75 backdrop:transition-opacity backdrop:duration-300", isVisible ? "backdrop:opacity-100" : "backdrop:opacity-0", !isFirstModal && "backdrop:bg-transparent"),
			onCancel: handleCancel,
			onClick: handleDialogClick,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "im-modal-container fixed inset-0 overflow-y-auto p-4",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: clsx("im-modal-positioner flex min-h-full justify-center", {
						"items-start": config.position === "top",
						"items-center": config.position === "center",
						"items-end": config.position === "bottom"
					}),
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						ref: nativeWrapperRef,
						className: clsx("im-modal-wrapper w-full transition-[filter] duration-300", modalContext.onTopOfStack ? "" : "blur-xs", maxWidthClass),
						children: renderContent()
					})
				})
			})
		});
		if (!isRendered) return null;
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4",
			onMouseDown: handleClickOutside,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: clsx("im-modal-positioner flex min-h-full justify-center", {
					"items-start": config.position === "top",
					"items-center": config.position === "center",
					"items-end": config.position === "bottom"
				}),
				onMouseDown: handleClickOutside,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					ref: wrapperRef,
					role: "dialog",
					"aria-modal": "true",
					className: clsx("im-modal-wrapper w-full transition-[filter] duration-300", modalContext.onTopOfStack ? "" : "blur-xs", maxWidthClass),
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: "Dialog"
					}), renderContent()]
				})
			})
		});
	};
	//#endregion
	//#region src/SlideoverContent.tsx
	var SlideoverContent = ({ modalContext, config, useNativeDialog, isFirstModal, onAfterLeave, children }) => {
		const [isRendered, setIsRendered] = (0, react.useState)(false);
		const [isVisible, setIsVisible] = (0, react.useState)(false);
		const [entered, setEntered] = (0, react.useState)(false);
		const wrapperRef = (0, react.useRef)(null);
		const dialogRef = (0, react.useRef)(null);
		const nativeWrapperRef = (0, react.useRef)(null);
		const cleanupFocusTrapRef = (0, react.useRef)(null);
		const cleanupEscapeKeyRef = (0, react.useRef)(null);
		const isLeft = config.position === "left";
		const maxWidthClass = (0, react.useMemo)(() => getMaxWidthClass(config.maxWidth), [config.maxWidth]);
		const getTranslateX = (0, react.useCallback)(() => isLeft ? "-100%" : "100%", [isLeft]);
		const animateIn = (0, react.useCallback)(async (element) => {
			if (!element) return;
			setIsVisible(true);
			await (0, _inertiaui_vanilla.animate)(element, [{
				transform: `translate3d(${getTranslateX()}, 0, 0)`,
				opacity: 0
			}, {
				transform: "translate3d(0, 0, 0)",
				opacity: 1
			}]);
			setEntered(true);
		}, [getTranslateX]);
		const animateOut = (0, react.useCallback)(async (element) => {
			if (!element) return;
			setIsVisible(false);
			await (0, _inertiaui_vanilla.animate)(element, [{
				transform: "translate3d(0, 0, 0)",
				opacity: 1
			}, {
				transform: `translate3d(${getTranslateX()}, 0, 0)`,
				opacity: 0
			}]);
			setIsRendered(false);
			if (useNativeDialog && dialogRef.current) dialogRef.current.close();
			onAfterLeave?.();
			modalContext.afterLeave();
		}, [
			getTranslateX,
			useNativeDialog,
			onAfterLeave,
			modalContext
		]);
		const setupFocusTrap = (0, react.useCallback)(() => {
			if (useNativeDialog) return;
			if (!wrapperRef.current || !modalContext.onTopOfStack) return;
			if (cleanupFocusTrapRef.current) return;
			cleanupFocusTrapRef.current = (0, _inertiaui_vanilla.createFocusTrap)(wrapperRef.current, {
				initialFocus: true,
				returnFocus: false
			});
		}, [modalContext.onTopOfStack, useNativeDialog]);
		const cleanupFocusTrap = (0, react.useCallback)(() => {
			if (cleanupFocusTrapRef.current) {
				cleanupFocusTrapRef.current();
				cleanupFocusTrapRef.current = null;
			}
		}, []);
		const setupEscapeKey = (0, react.useCallback)(() => {
			if (useNativeDialog) return;
			if (cleanupEscapeKeyRef.current) return;
			if (config?.closeExplicitly) return;
			cleanupEscapeKeyRef.current = (0, _inertiaui_vanilla.onEscapeKey)(() => {
				if (modalContext.onTopOfStack) modalContext.close();
			});
		}, [
			config?.closeExplicitly,
			modalContext,
			useNativeDialog
		]);
		const cleanupEscapeKey = (0, react.useCallback)(() => {
			if (cleanupEscapeKeyRef.current) {
				cleanupEscapeKeyRef.current();
				cleanupEscapeKeyRef.current = null;
			}
		}, []);
		const handleClickOutside = (0, react.useCallback)((event) => {
			if (useNativeDialog) return;
			if (!modalContext.onTopOfStack) return;
			if (config?.closeExplicitly) return;
			if (config?.closeOnClickOutside === false) return;
			if (!wrapperRef.current) return;
			if (!wrapperRef.current.contains(event.target)) modalContext.close();
		}, [
			modalContext,
			config?.closeExplicitly,
			config?.closeOnClickOutside,
			useNativeDialog
		]);
		const handleCancel = (0, react.useCallback)((event) => {
			event.preventDefault();
			if (modalContext.onTopOfStack && !config?.closeExplicitly) modalContext.close();
		}, [modalContext, config?.closeExplicitly]);
		const handleDialogClick = (0, react.useCallback)((event) => {
			if (event.target === dialogRef.current) {
				if (modalContext.onTopOfStack && !config?.closeExplicitly && config?.closeOnClickOutside !== false) modalContext.close();
			}
		}, [
			modalContext,
			config?.closeExplicitly,
			config?.closeOnClickOutside
		]);
		const prevIsOpenRef = (0, react.useRef)(modalContext.isOpen);
		(0, react.useEffect)(() => {
			if (useNativeDialog) {
				if (modalContext.isOpen && !dialogRef.current?.open) {
					dialogRef.current?.showModal();
					animateIn(nativeWrapperRef.current);
				} else if (!modalContext.isOpen && prevIsOpenRef.current) {
					setEntered(false);
					animateOut(nativeWrapperRef.current);
				}
			} else if (modalContext.isOpen && !isRendered) setIsRendered(true);
			else if (!modalContext.isOpen && prevIsOpenRef.current) {
				setEntered(false);
				animateOut(wrapperRef.current);
			}
			prevIsOpenRef.current = modalContext.isOpen;
		}, [
			modalContext.isOpen,
			useNativeDialog,
			animateIn,
			animateOut,
			isRendered
		]);
		(0, react.useEffect)(() => {
			if (!useNativeDialog && isRendered && !entered && modalContext.isOpen) animateIn(wrapperRef.current).then(() => {
				setupFocusTrap();
			});
		}, [
			isRendered,
			useNativeDialog,
			entered,
			modalContext.isOpen,
			animateIn,
			setupFocusTrap
		]);
		(0, react.useEffect)(() => {
			if (!useNativeDialog) setupEscapeKey();
			return () => {
				cleanupEscapeKey();
			};
		}, [
			useNativeDialog,
			setupEscapeKey,
			cleanupEscapeKey
		]);
		(0, react.useEffect)(() => {
			if (useNativeDialog) return;
			if (modalContext.onTopOfStack) {
				setupEscapeKey();
				if (entered) setupFocusTrap();
			} else {
				cleanupFocusTrap();
				cleanupEscapeKey();
			}
		}, [
			modalContext.onTopOfStack,
			entered,
			setupEscapeKey,
			setupFocusTrap,
			cleanupFocusTrap,
			cleanupEscapeKey,
			useNativeDialog
		]);
		(0, react.useEffect)(() => {
			return () => {
				const wrapper = useNativeDialog ? nativeWrapperRef.current : wrapperRef.current;
				if (wrapper) (0, _inertiaui_vanilla.cancelAnimations)(wrapper);
				if (useNativeDialog) {
					if (dialogRef.current?.open) dialogRef.current.close();
				} else {
					cleanupFocusTrap();
					cleanupEscapeKey();
				}
			};
		}, [
			useNativeDialog,
			cleanupFocusTrap,
			cleanupEscapeKey
		]);
		const renderContent = () => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: `im-slideover-content relative ${config.paddingClasses} ${config.panelClasses}`,
			"data-inertiaui-modal-entered": entered,
			children: [config.closeButton && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "absolute right-0 top-0 pr-3 pt-3",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CloseButton, { onClick: modalContext.close })
			}), typeof children === "function" ? children({
				modalContext,
				config
			}) : children]
		});
		if (useNativeDialog) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("dialog", {
			ref: dialogRef,
			className: clsx("im-slideover-dialog m-0 overflow-visible bg-transparent p-0", "size-full max-h-none max-w-none", "backdrop:bg-black/75 backdrop:transition-opacity backdrop:duration-300", isVisible ? "backdrop:opacity-100" : "backdrop:opacity-0", !isFirstModal && "backdrop:bg-transparent"),
			onCancel: handleCancel,
			onClick: handleDialogClick,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "im-slideover-container fixed inset-0 overflow-y-auto overflow-x-hidden",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: clsx("im-slideover-positioner flex min-h-full items-center", {
						"justify-start rtl:justify-end": config?.position === "left",
						"justify-end rtl:justify-start": config?.position === "right"
					}),
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						ref: nativeWrapperRef,
						className: clsx("im-slideover-wrapper w-full transition-[filter] duration-300", modalContext.onTopOfStack ? "" : "blur-xs", maxWidthClass),
						children: renderContent()
					})
				})
			})
		});
		if (!isRendered) return null;
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden",
			onMouseDown: handleClickOutside,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: clsx("im-slideover-positioner flex min-h-full items-center", {
					"justify-start rtl:justify-end": config?.position === "left",
					"justify-end rtl:justify-start": config?.position === "right"
				}),
				onMouseDown: handleClickOutside,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					ref: wrapperRef,
					role: "dialog",
					"aria-modal": "true",
					className: clsx("im-slideover-wrapper w-full transition-[filter] duration-300", modalContext.onTopOfStack ? "" : "blur-xs", maxWidthClass),
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: "Dialog"
					}), renderContent()]
				})
			})
		});
	};
	//#endregion
	//#region src/Modal.tsx
	var Modal = (0, react.forwardRef)((allProps, ref) => {
		const { name, children, onFocus, onBlur, onClose, onSuccess, onAfterLeave, ...props } = allProps;
		const renderChildren = (contentProps) => {
			if (typeof children === "function") return children(contentProps);
			return children;
		};
		const headlessModalRef = (0, react.useRef)(null);
		const cleanupScrollLockRef = (0, react.useRef)(null);
		const cleanupAriaHiddenRef = (0, react.useRef)(null);
		const [rendered, setRendered] = (0, react.useState)(false);
		const useNativeDialog = (0, react.useMemo)(() => getConfig("useNativeDialog"), []);
		(0, react.useImperativeHandle)(ref, () => headlessModalRef.current, [headlessModalRef]);
		(0, react.useEffect)(() => {
			return () => {
				cleanupScrollLockRef.current?.();
				cleanupAriaHiddenRef.current?.();
			};
		}, []);
		const handleSuccess = (0, react.useCallback)(() => {
			onSuccess?.();
			if (!cleanupScrollLockRef.current) {
				cleanupScrollLockRef.current = (0, _inertiaui_vanilla.lockScroll)();
				cleanupAriaHiddenRef.current = (0, _inertiaui_vanilla.markAriaHidden)(getConfig("appElement"));
			}
		}, [onSuccess]);
		const handleClose = (0, react.useCallback)(() => {
			onClose?.();
			cleanupScrollLockRef.current?.();
			cleanupAriaHiddenRef.current?.();
			cleanupScrollLockRef.current = null;
			cleanupAriaHiddenRef.current = null;
		}, [onClose]);
		const handleAfterLeave = (0, react.useCallback)(() => {
			onAfterLeave?.();
		}, [onAfterLeave]);
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(HeadlessModal, {
			ref: headlessModalRef,
			name,
			onFocus: onFocus ?? void 0,
			onBlur: onBlur ?? void 0,
			onClose: handleClose,
			onSuccess: handleSuccess,
			...props,
			children: ({ afterLeave, close, config, emit, getChildModal, getParentModal, id, index, isOpen, modalContext, onTopOfStack, reload, setOpen, shouldRender, ...extraProps }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ModalPortal, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "im-dialog relative z-20",
				"data-inertiaui-modal-id": id,
				"data-inertiaui-modal-index": index,
				"aria-hidden": !onTopOfStack,
				children: [index === 0 && !useNativeDialog && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(BackdropTransition, {
					show: isOpen,
					appear: !rendered,
					onAfterAppear: () => setRendered(true)
				}), config.slideover ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SlideoverContent, {
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
				}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ModalContent, {
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
				})]
			}) })
		});
	});
	function ModalPortal({ children }) {
		const [mounted, setMounted] = (0, react.useState)(false);
		(0, react.useEffect)(() => {
			setMounted(true);
		}, []);
		if (!mounted) return null;
		return (0, react_dom.createPortal)(children, document.body);
	}
	function BackdropTransition({ show, appear, onAfterAppear }) {
		const [state, setState] = (0, react.useState)(() => {
			if (appear && show) return "entering";
			return show ? "entered" : "exited";
		});
		const initialRender = (0, react.useRef)(true);
		const backdropRef = (0, react.useRef)(null);
		(0, react.useEffect)(() => {
			if (initialRender.current) {
				initialRender.current = false;
				if (appear && show) requestAnimationFrame(() => {
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
		}, [
			show,
			appear,
			onAfterAppear
		]);
		if (state === "exited") return null;
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			ref: backdropRef,
			className: `im-backdrop fixed inset-0 z-30 bg-black/75 transition-opacity duration-300 ease-in-out ${state === "entered" ? "opacity-100" : "opacity-0"}`,
			"aria-hidden": "true"
		});
	}
	Modal.displayName = "Modal";
	//#endregion
	//#region src/ModalLink.tsx
	var ModalLink = ({ href, method = "get", data = {}, as: Component = "a", headers = {}, queryStringArrayFormat = "brackets", onAfterLeave, onBlur, onClose, onError, onFocus, onStart, onSuccess, onPrefetching, onPrefetched, navigate, prefetch: prefetch$1 = false, cacheFor = 3e4, children, ...props }) => {
		const [loading, setLoading] = (0, react.useState)(false);
		const [modalContext, setModalContext] = (0, react.useState)(null);
		const { stack, visit } = useModalStack();
		const hoverTimeout = (0, react.useRef)(null);
		const shouldNavigate = (0, react.useMemo)(() => {
			return navigate ?? getConfig("navigate");
		}, [navigate]);
		const prefetchModes = (0, react.useMemo)(() => {
			if (prefetch$1 === true) return ["hover"];
			if (prefetch$1 === false) return [];
			if (Array.isArray(prefetch$1)) return prefetch$1;
			return [prefetch$1];
		}, [prefetch$1]);
		const doPrefetch = (0, react.useCallback)(() => {
			prefetch(href, {
				method,
				data,
				headers,
				queryStringArrayFormat,
				cacheFor,
				onPrefetching: onPrefetching ?? void 0,
				onPrefetched: onPrefetched ?? void 0
			});
		}, [
			href,
			method,
			data,
			headers,
			queryStringArrayFormat,
			cacheFor,
			onPrefetching,
			onPrefetched
		]);
		const handleMouseEnter = (0, react.useCallback)(() => {
			if (!prefetchModes.includes("hover")) return;
			hoverTimeout.current = setTimeout(() => {
				doPrefetch();
			}, 75);
		}, [prefetchModes, doPrefetch]);
		const handleMouseLeave = (0, react.useCallback)(() => {
			if (hoverTimeout.current) {
				clearTimeout(hoverTimeout.current);
				hoverTimeout.current = null;
			}
		}, []);
		const handleMouseDown = (0, react.useCallback)((event) => {
			if (!prefetchModes.includes("click")) return;
			if (event.button !== 0) return;
			doPrefetch();
		}, [prefetchModes, doPrefetch]);
		(0, react.useEffect)(() => {
			if (prefetchModes.includes("mount")) doPrefetch();
		}, []);
		(0, react.useEffect)(() => {
			return () => {
				if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
			};
		}, []);
		const standardProps = {};
		const customEvents = {};
		Object.keys(props).forEach((key) => {
			if (modalPropNames.includes(key)) return;
			if (key.startsWith("on") && typeof props[key] === "function") if ((0, _inertiaui_vanilla.isStandardDomEvent)(key)) standardProps[key] = props[key];
			else customEvents[key] = props[key];
			else standardProps[key] = props[key];
		});
		const [isBlurred, setIsBlurred] = (0, react.useState)(false);
		(0, react.useEffect)(() => {
			if (!modalContext) return;
			if (modalContext.onTopOfStack && isBlurred) onFocus?.();
			else if (!modalContext.onTopOfStack && !isBlurred) onBlur?.();
			setIsBlurred(!modalContext.onTopOfStack);
		}, [stack]);
		const onCloseCallback = (0, react.useCallback)(() => {
			onClose?.();
		}, [onClose]);
		const onAfterLeaveCallback = (0, react.useCallback)(() => {
			setModalContext(null);
			onAfterLeave?.();
		}, [onAfterLeave]);
		const handle = (0, react.useCallback)((e) => {
			e?.preventDefault();
			if (loading) return;
			if (!href.startsWith("#")) {
				setLoading(true);
				onStart?.();
			}
			visit(href, method, data, headers, (0, _inertiaui_vanilla.rejectNullValues)((0, _inertiaui_vanilla.only)(props, modalPropNames)), () => onCloseCallback(), onAfterLeaveCallback, queryStringArrayFormat, shouldNavigate).then((newModalContext) => {
				setModalContext(newModalContext);
				newModalContext.registerEventListenersFromProps(customEvents);
				onSuccess?.();
			}).catch((error) => {
				console.error(error);
				onError?.(error);
			}).finally(() => setLoading(false));
		}, [
			href,
			method,
			data,
			headers,
			queryStringArrayFormat,
			props,
			onCloseCallback,
			onAfterLeaveCallback
		]);
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Component, {
			...standardProps,
			href,
			onClick: handle,
			onMouseEnter: handleMouseEnter,
			onMouseLeave: handleMouseLeave,
			onMouseDown: handleMouseDown,
			children: typeof children === "function" ? children({ loading }) : children
		});
	};
	//#endregion
	//#region src/WhenVisible.tsx
	var WhenVisible = ({ children, data, params, buffer, as, always, fallback }) => {
		always = always ?? false;
		as = as ?? "div";
		fallback = fallback ?? null;
		const [loaded, setLoaded] = (0, react.useState)(false);
		const hasFetched = (0, react.useRef)(false);
		const fetching = (0, react.useRef)(false);
		const ref = (0, react.useRef)(null);
		const modal = useModal();
		const getReloadParams = (0, react.useCallback)(() => {
			if (data) return { only: Array.isArray(data) ? data : [data] };
			if (!params) throw new Error("You must provide either a `data` or `params` prop.");
			return params;
		}, [params, data]);
		(0, react.useEffect)(() => {
			if (!ref.current) return;
			const observer = new IntersectionObserver((entries) => {
				if (!entries[0].isIntersecting) return;
				if (!always && hasFetched.current) observer.disconnect();
				if (fetching.current) return;
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
						if (!always) observer.disconnect();
					}
				});
			}, { rootMargin: `${buffer || 0}px` });
			observer.observe(ref.current);
			return () => {
				observer.disconnect();
			};
		}, [
			ref,
			getReloadParams,
			buffer
		]);
		if (always || !loaded) return (0, react.createElement)(as, {
			props: null,
			ref
		}, loaded ? children : fallback);
		return loaded ? children : null;
	};
	WhenVisible.displayName = "InertiaWhenVisible";
	//#endregion
	//#region src/inertiauiModal.ts
	var setPageLayout = (layout) => (module) => {
		module.default.layout = (page) => (0, react.createElement)(layout, { children: page });
		return module;
	};
	//#endregion
	exports.Deferred = Deferred;
	exports.HeadlessModal = HeadlessModal;
	exports.Modal = Modal;
	exports.ModalLink = ModalLink;
	exports.ModalRoot = ModalRoot;
	exports.ModalStackProvider = ModalStackProvider;
	exports.WhenVisible = WhenVisible;
	Object.defineProperty(exports, "dialogUtils", {
		enumerable: true,
		get: function() {
			return _inertiaui_vanilla;
		}
	});
	exports.getConfig = getConfig;
	exports.initFromPageProps = initFromPageProps;
	exports.modalPropNames = modalPropNames;
	exports.prefetch = prefetch;
	exports.putConfig = putConfig;
	exports.renderApp = renderApp;
	exports.resetConfig = resetConfig;
	exports.setPageLayout = setPageLayout;
	exports.useModal = useModal;
	exports.useModalIndex = useModalIndex;
	exports.useModalStack = useModalStack;
});

//# sourceMappingURL=inertiaui-modal.umd.cjs.map