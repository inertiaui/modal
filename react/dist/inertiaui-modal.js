import xe, { createContext as Ve, useContext as Pe, useRef as U, useEffect as W, useReducer as ze, useState as X, createElement as se, useMemo as K, forwardRef as Ie, useImperativeHandle as ge, useCallback as F } from "react";
import le from "axios";
import { generateId as De, createDialog as Je, createFocusTrap as ke, focusFirstElement as Ke, getFocusableElements as He, getScrollLockCount as Ge, lockScroll as Fe, markAriaHidden as Ne, onClickOutside as Qe, onEscapeKey as Oe, unlockScroll as Ze, unmarkAriaHidden as er, kebabCase as re, except as rr, isStandardDomEvent as tr, rejectNullValues as nr, only as sr } from "@inertiaui/vanilla";
import { usePage as lr, router as ee, progress as Te } from "@inertiajs/react";
import { mergeDataIntoQueryString as Ce } from "@inertiajs/core";
import { createPortal as ir } from "react-dom";
const Z = {
  type: "modal",
  navigate: !1,
  useNativeDialog: !0,
  modal: {
    closeButton: !0,
    closeExplicitly: !1,
    closeOnClickOutside: !0,
    maxWidth: "2xl",
    paddingClasses: "p-4 sm:p-6",
    panelClasses: "bg-white rounded",
    position: "center"
  },
  slideover: {
    closeButton: !0,
    closeExplicitly: !1,
    closeOnClickOutside: !0,
    maxWidth: "md",
    paddingClasses: "p-4 sm:p-6",
    panelClasses: "bg-white min-h-screen",
    position: "right"
  }
};
class ar {
  constructor() {
    this.config = {}, this.reset();
  }
  reset() {
    this.config = JSON.parse(JSON.stringify(Z));
  }
  put(e, t) {
    if (typeof e == "object") {
      this.config = {
        type: e.type ?? Z.type,
        navigate: e.navigate ?? Z.navigate,
        useNativeDialog: e.useNativeDialog ?? Z.useNativeDialog,
        modal: { ...Z.modal, ...e.modal ?? {} },
        slideover: { ...Z.slideover, ...e.slideover ?? {} }
      };
      return;
    }
    const u = e.split(".");
    let i = this.config;
    for (let c = 0; c < u.length - 1; c++)
      i = i[u[c]] = i[u[c]] || {};
    i[u[u.length - 1]] = t;
  }
  get(e) {
    if (typeof e > "u")
      return this.config;
    const t = e.split(".");
    let u = this.config;
    for (const i of t) {
      if (u == null || typeof u != "object")
        return null;
      u = u[i];
    }
    return u === void 0 ? null : u;
  }
}
const oe = new ar(), Pr = () => oe.reset(), Ir = (r, e) => oe.put(r, e), ce = (r) => oe.get(r), G = (r, e) => oe.get(r ? `slideover.${e}` : `modal.${e}`);
var ie = { exports: {} }, te = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Re;
function ur() {
  if (Re) return te;
  Re = 1;
  var r = Symbol.for("react.transitional.element"), e = Symbol.for("react.fragment");
  function t(u, i, c) {
    var m = null;
    if (c !== void 0 && (m = "" + c), i.key !== void 0 && (m = "" + i.key), "key" in i) {
      c = {};
      for (var b in i)
        b !== "key" && (c[b] = i[b]);
    } else c = i;
    return i = c.ref, {
      $$typeof: r,
      type: u,
      key: m,
      ref: i !== void 0 ? i : null,
      props: c
    };
  }
  return te.Fragment = e, te.jsx = t, te.jsxs = t, te;
}
var ne = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var je;
function or() {
  return je || (je = 1, process.env.NODE_ENV !== "production" && (function() {
    function r(n) {
      if (n == null) return null;
      if (typeof n == "function")
        return n.$$typeof === E ? null : n.displayName || n.name || null;
      if (typeof n == "string") return n;
      switch (n) {
        case M:
          return "Fragment";
        case p:
          return "Profiler";
        case I:
          return "StrictMode";
        case k:
          return "Suspense";
        case a:
          return "SuspenseList";
        case x:
          return "Activity";
      }
      if (typeof n == "object")
        switch (typeof n.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), n.$$typeof) {
          case s:
            return "Portal";
          case h:
            return n.displayName || "Context";
          case o:
            return (n._context.displayName || "Context") + ".Consumer";
          case w:
            var R = n.render;
            return n = n.displayName, n || (n = R.displayName || R.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
          case l:
            return R = n.displayName || null, R !== null ? R : r(n.type) || "Memo";
          case T:
            R = n._payload, n = n._init;
            try {
              return r(n(R));
            } catch {
            }
        }
      return null;
    }
    function e(n) {
      return "" + n;
    }
    function t(n) {
      try {
        e(n);
        var R = !1;
      } catch {
        R = !0;
      }
      if (R) {
        R = console;
        var P = R.error, S = typeof Symbol == "function" && Symbol.toStringTag && n[Symbol.toStringTag] || n.constructor.name || "Object";
        return P.call(
          R,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          S
        ), e(n);
      }
    }
    function u(n) {
      if (n === M) return "<>";
      if (typeof n == "object" && n !== null && n.$$typeof === T)
        return "<...>";
      try {
        var R = r(n);
        return R ? "<" + R + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function i() {
      var n = g.A;
      return n === null ? null : n.getOwner();
    }
    function c() {
      return Error("react-stack-top-frame");
    }
    function m(n) {
      if (A.call(n, "key")) {
        var R = Object.getOwnPropertyDescriptor(n, "key").get;
        if (R && R.isReactWarning) return !1;
      }
      return n.key !== void 0;
    }
    function b(n, R) {
      function P() {
        L || (L = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          R
        ));
      }
      P.isReactWarning = !0, Object.defineProperty(n, "key", {
        get: P,
        configurable: !0
      });
    }
    function v() {
      var n = r(this.type);
      return Y[n] || (Y[n] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), n = this.props.ref, n !== void 0 ? n : null;
    }
    function N(n, R, P, S, D, fe) {
      var $ = P.ref;
      return n = {
        $$typeof: _,
        type: n,
        key: R,
        props: P,
        _owner: S
      }, ($ !== void 0 ? $ : null) !== null ? Object.defineProperty(n, "ref", {
        enumerable: !1,
        get: v
      }) : Object.defineProperty(n, "ref", { enumerable: !1, value: null }), n._store = {}, Object.defineProperty(n._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(n, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(n, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: D
      }), Object.defineProperty(n, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: fe
      }), Object.freeze && (Object.freeze(n.props), Object.freeze(n)), n;
    }
    function j(n, R, P, S, D, fe) {
      var $ = R.children;
      if ($ !== void 0)
        if (S)
          if (C($)) {
            for (S = 0; S < $.length; S++)
              y($[S]);
            Object.freeze && Object.freeze($);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else y($);
      if (A.call(R, "key")) {
        $ = r(n);
        var Q = Object.keys(R).filter(function(Be) {
          return Be !== "key";
        });
        S = 0 < Q.length ? "{key: someKey, " + Q.join(": ..., ") + ": ...}" : "{key: someKey}", z[$ + S] || (Q = 0 < Q.length ? "{" + Q.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          S,
          $,
          Q,
          $
        ), z[$ + S] = !0);
      }
      if ($ = null, P !== void 0 && (t(P), $ = "" + P), m(R) && (t(R.key), $ = "" + R.key), "key" in R) {
        P = {};
        for (var he in R)
          he !== "key" && (P[he] = R[he]);
      } else P = R;
      return $ && b(
        P,
        typeof n == "function" ? n.displayName || n.name || "Unknown" : n
      ), N(
        n,
        $,
        P,
        i(),
        D,
        fe
      );
    }
    function y(n) {
      f(n) ? n._store && (n._store.validated = 1) : typeof n == "object" && n !== null && n.$$typeof === T && (n._payload.status === "fulfilled" ? f(n._payload.value) && n._payload.value._store && (n._payload.value._store.validated = 1) : n._store && (n._store.validated = 1));
    }
    function f(n) {
      return typeof n == "object" && n !== null && n.$$typeof === _;
    }
    var d = xe, _ = Symbol.for("react.transitional.element"), s = Symbol.for("react.portal"), M = Symbol.for("react.fragment"), I = Symbol.for("react.strict_mode"), p = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), h = Symbol.for("react.context"), w = Symbol.for("react.forward_ref"), k = Symbol.for("react.suspense"), a = Symbol.for("react.suspense_list"), l = Symbol.for("react.memo"), T = Symbol.for("react.lazy"), x = Symbol.for("react.activity"), E = Symbol.for("react.client.reference"), g = d.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, A = Object.prototype.hasOwnProperty, C = Array.isArray, q = console.createTask ? console.createTask : function() {
      return null;
    };
    d = {
      react_stack_bottom_frame: function(n) {
        return n();
      }
    };
    var L, Y = {}, V = d.react_stack_bottom_frame.bind(
      d,
      c
    )(), H = q(u(c)), z = {};
    ne.Fragment = M, ne.jsx = function(n, R, P) {
      var S = 1e4 > g.recentlyCreatedOwnerStacks++;
      return j(
        n,
        R,
        P,
        !1,
        S ? Error("react-stack-top-frame") : V,
        S ? q(u(n)) : H
      );
    }, ne.jsxs = function(n, R, P) {
      var S = 1e4 > g.recentlyCreatedOwnerStacks++;
      return j(
        n,
        R,
        P,
        !0,
        S ? Error("react-stack-top-frame") : V,
        S ? q(u(n)) : H
      );
    };
  })()), ne;
}
var Me;
function cr() {
  return Me || (Me = 1, process.env.NODE_ENV === "production" ? ie.exports = ur() : ie.exports = or()), ie.exports;
}
var O = cr();
function ue(r = "inertiaui_modal_") {
  return De(r);
}
function ae(r, e) {
  const t = typeof window < "u" ? window.location.origin : "http://localhost", u = typeof r == "string" ? new URL(r, t) : r, i = typeof e == "string" ? new URL(e, t) : e;
  return `${u.origin}${u.pathname}` == `${i.origin}${i.pathname}`;
}
const gr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createDialog: Je,
  createFocusTrap: ke,
  focusFirstElement: Ke,
  getFocusableElements: He,
  getScrollLockCount: Ge,
  lockScroll: Fe,
  markAriaHidden: Ne,
  onClickOutside: Qe,
  onEscapeKey: Oe,
  unlockScroll: Ze,
  unmarkAriaHidden: er
}, Symbol.toStringTag, { value: "Module" })), de = Ve(null);
de.displayName = "ModalStackContext";
let be = null, ye = null, B = null;
const ve = /* @__PURE__ */ new Map(), me = /* @__PURE__ */ new Map();
function we(r, e, t) {
  return `${e}:${r}:${JSON.stringify(t)}`;
}
function Ae(r, e, t) {
  const u = we(r, e, t), i = ve.get(u);
  return i ? Date.now() > i.expiresAt ? (ve.delete(u), null) : i.response : null;
}
function dr(r, e, t, u, i) {
  const c = we(r, e, t);
  ve.set(c, {
    response: u,
    timestamp: Date.now(),
    expiresAt: Date.now() + i
  });
}
function pr(r, e = {}) {
  var _;
  if (r.startsWith("#"))
    return Promise.resolve();
  const t = (e.method ?? "get").toLowerCase(), u = e.data ?? {}, i = e.headers ?? {}, c = e.queryStringArrayFormat ?? "brackets", m = e.cacheFor ?? 3e4, [b, v] = Ce(t, r || "", u, c);
  if (Ae(b, t, v))
    return Promise.resolve();
  const j = we(b, t, v), y = me.get(j);
  if (y)
    return y.then(() => {
    });
  (_ = e.onPrefetching) == null || _.call(e);
  const f = {
    ...i,
    Accept: "text/html, application/xhtml+xml",
    "X-Requested-With": "XMLHttpRequest",
    "X-Inertia": "true",
    "X-Inertia-Version": be ?? "",
    "X-InertiaUI-Modal": ue(),
    "X-InertiaUI-Modal-Base-Url": B ?? ""
  }, d = le({
    url: b,
    method: t,
    data: v,
    headers: f
  }).then((s) => {
    var M;
    return dr(b, t, v, s, m), (M = e.onPrefetched) == null || M.call(e), s;
  }).finally(() => {
    me.delete(j);
  });
  return me.set(j, d), d.then(() => {
  });
}
const fr = ({ children: r }) => {
  const e = U([]), [, t] = ze((p) => p + 1, 0), [u, i] = X({}), c = (p) => {
    const o = p([...e.current]), h = (w) => {
      var k;
      return o.length < 2 ? !0 : ((k = o.map((a) => ({ id: a.id, shouldRender: a.shouldRender })).reverse().find((a) => a.shouldRender)) == null ? void 0 : k.id) === w;
    };
    o.forEach((w, k) => {
      o[k].onTopOfStack = h(w.id), o[k].getParentModal = () => k < 1 ? null : e.current.slice(0, k).reverse().find((a) => a.isOpen) ?? null, o[k].getChildModal = () => k === e.current.length - 1 ? null : e.current.slice(k + 1).find((a) => a.isOpen) ?? null;
    }), e.current = o, t();
  };
  class m {
    constructor(o, h, w, k, a) {
      this.show = () => {
        c(
          (l) => l.map((T) => (T.id === this.id && !T.isOpen && (T.isOpen = !0, T.shouldRender = !0), T))
        );
      }, this.setOpen = (l) => {
        l ? this.show() : this.close();
      }, this.close = () => {
        c((l) => {
          let T = !1;
          const x = l.map((E) => {
            var g;
            return E.id === this.id && E.isOpen && (Object.keys(E.listeners).forEach((A) => {
              E.off(A);
            }), E.isOpen = !1, (g = E.onCloseCallback) == null || g.call(E), T = !0), E;
          });
          return T ? x : l;
        });
      }, this.afterLeave = () => {
        this.isOpen || c((l) => {
          const T = l.map((x) => {
            var E;
            return x.id === this.id && !x.isOpen && (x.shouldRender = !1, (E = x.afterLeaveCallback) == null || E.call(x), x.afterLeaveCallback = null), x;
          });
          return this.index === 0 ? (B && typeof window < "u" && ee.push({
            url: B,
            preserveScroll: !0,
            preserveState: !0,
            // Clear _inertiaui_modal prop to prevent modal from reopening
            props: (x) => {
              const { _inertiaui_modal: E, ...g } = x;
              return { ...g, _inertiaui_modal: void 0 };
            }
          }), B = null, []) : T;
        });
      }, this.on = (l, T) => {
        l = re(l), this.listeners[l] = this.listeners[l] ?? [], this.listeners[l].push(T);
      }, this.off = (l, T) => {
        var x;
        l = re(l), T ? this.listeners[l] = ((x = this.listeners[l]) == null ? void 0 : x.filter((E) => E !== T)) ?? [] : delete this.listeners[l];
      }, this.emit = (l, ...T) => {
        var x;
        (x = this.listeners[re(l)]) == null || x.forEach((E) => E(...T));
      }, this.registerEventListenersFromProps = (l) => {
        const T = [];
        return Object.keys(l).filter((x) => x.startsWith("on")).forEach((x) => {
          const E = re(x).replace(/^on-/, ""), g = l[x];
          this.on(E, g), T.push(() => this.off(E, g));
        }), () => T.forEach((x) => x());
      }, this.reload = (l = {}) => {
        var g, A;
        let T = Object.keys(this.response.props);
        if (l.only && (T = l.only), l.except && (T = rr(T, l.except)), !((g = this.response) != null && g.url))
          return;
        const x = (l.method ?? "get").toLowerCase(), E = l.data ?? {};
        (A = l.onStart) == null || A.call(l), le({
          url: this.response.url,
          method: x,
          data: x === "get" ? {} : E,
          params: x === "get" ? E : {},
          headers: {
            ...l.headers ?? {},
            Accept: "text/html, application/xhtml+xml",
            "X-Inertia": "true",
            "X-Inertia-Partial-Component": this.response.component,
            "X-Inertia-Version": this.response.version ?? "",
            "X-Inertia-Partial-Data": T.join(","),
            "X-InertiaUI-Modal": ue(),
            "X-InertiaUI-Modal-Base-Url": B ?? ""
          }
        }).then((C) => {
          var q;
          this.updateProps(C.data.props), (q = l.onSuccess) == null || q.call(l, C);
        }).catch((C) => {
          var q;
          (q = l.onError) == null || q.call(l, C);
        }).finally(() => {
          var C;
          (C = l.onFinish) == null || C.call(l);
        });
      }, this.updateProps = (l) => {
        Object.assign(this.props, l), c((T) => T);
      }, this.id = h.id ?? ue(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = o, this.props = h.props ?? {}, this.response = h, this.config = w ?? {}, this.onCloseCallback = k ?? null, this.afterLeaveCallback = a ?? null, this.index = -1, this.getParentModal = () => null, this.getChildModal = () => null, this.onTopOfStack = !0;
    }
  }
  const b = (p) => typeof p == "object" && p !== null && "component" in p && typeof p.component == "string", v = (p, o = {}, h = null, w = null) => ye ? b(p) ? ye(p.component).then(
    (k) => j(k, p, o, h, w)
  ) : Promise.reject(
    new Error(
      "Invalid modal response. This usually happens when the server returns a redirect (e.g., due to session expiration). Check if the user is still authenticated."
    )
  ) : Promise.reject(new Error("resolveComponent not set")), N = (p) => {
    var h, w;
    const o = (w = (h = p.response) == null ? void 0 : h.meta) == null ? void 0 : w.deferredProps;
    o && Object.keys(o).forEach((k) => {
      p.reload({ only: o[k] });
    });
  }, j = (p, o, h, w, k) => {
    const a = new m(p, o, h, w, k);
    return a.index = e.current.length, c((l) => [...l, a]), N(a), a.show(), a;
  };
  function y(p, o, h, w, k) {
    if (!u[p])
      throw new Error(`The local modal "${p}" has not been registered.`);
    const l = j(null, { props: k ?? {} }, o, h, w);
    return l.name = p, u[p].callback(l), l;
  }
  const f = (p, o = {}) => _(
    p,
    o.method ?? "get",
    o.data ?? {},
    o.headers ?? {},
    o.config ?? {},
    o.onClose ?? null,
    o.onAfterLeave ?? null,
    o.queryStringArrayFormat ?? "brackets",
    o.navigate ?? ce("navigate"),
    o.onStart ?? null,
    o.onSuccess ?? null,
    o.onError ?? null,
    o.props ?? null
  ).then((h) => {
    const w = o.listeners ?? {};
    return Object.keys(w).forEach((k) => {
      const a = re(k);
      h.on(a, w[k]);
    }), h;
  }), d = (p, o, h) => {
    !p || !o || typeof window > "u" || ee.push({
      url: p,
      preserveScroll: !0,
      preserveState: !0,
      // Store modal data in page props for history navigation
      props: h ? (w) => ({
        ...w,
        _inertiaui_modal: {
          ...h,
          baseUrl: B
        }
      }) : void 0
    });
  }, _ = (p, o, h = {}, w = {}, k = {}, a = null, l = null, T = "brackets", x = !1, E = null, g = null, A = null, C = null) => {
    const q = ue();
    return new Promise((L, Y) => {
      var R;
      if (p.startsWith("#")) {
        L(y(p.substring(1), k, a, l, C));
        return;
      }
      const [V, H] = Ce(o, p || "", h, T), z = Ae(V, o, H);
      if (z) {
        g == null || g(z), v(z.data, k, a, l).then((P) => {
          d(z.data.url, x, z.data), L(P);
        }).catch(Y);
        return;
      }
      e.current.length === 0 && (B = typeof window < "u" ? window.location.href : "");
      const n = {
        ...w,
        Accept: "text/html, application/xhtml+xml",
        "X-Requested-With": "XMLHttpRequest",
        "X-Inertia": "true",
        "X-Inertia-Version": be ?? "",
        "X-InertiaUI-Modal": q,
        "X-InertiaUI-Modal-Base-Url": B ?? ""
      };
      E == null || E(), (R = Te) == null || R.start(), le({
        url: V,
        method: o,
        data: H,
        headers: n
      }).then((P) => {
        g == null || g(P), v(P.data, k, a, l).then((S) => {
          d(P.data.url, x, P.data), L(S);
        }).catch(Y);
      }).catch((...P) => {
        A == null || A(...P), Y(P[0]);
      }).finally(() => {
        var P;
        (P = Te) == null || P.finish();
      });
    });
  }, I = {
    get stack() {
      return e.current;
    },
    localModals: u,
    push: j,
    pushFromResponseData: v,
    length: () => e.current.length,
    closeAll: (p = !1) => {
      p ? c(() => []) : [...e.current].reverse().forEach((o) => o.close());
    },
    reset: () => c(() => []),
    visit: _,
    visitModal: f,
    registerLocalModal: (p, o) => {
      i((h) => ({
        ...h,
        [p]: { name: p, callback: o }
      }));
    },
    removeLocalModal: (p) => {
      i((o) => {
        const h = { ...o };
        return delete h[p], h;
      });
    }
  };
  return /* @__PURE__ */ O.jsx(de.Provider, { value: I, children: r });
}, pe = () => {
  const r = Pe(de);
  if (r === null)
    throw new Error("useModalStack must be used within a ModalStackProvider");
  return r;
}, _e = ["closeButton", "closeExplicitly", "closeOnClickOutside", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], hr = (r) => {
  r.initialPage && (be = r.initialPage.version ?? null), r.resolveComponent && (ye = r.resolveComponent);
}, Fr = (r, e) => {
  hr(e);
  const t = ({ Component: u, props: i, key: c }) => {
    const m = () => {
      const b = se(u, { key: c, ...i });
      return typeof u.layout == "function" ? u.layout(b) : Array.isArray(u.layout) ? u.layout.slice().reverse().reduce(
        (v, N) => se(N, i, v),
        b
      ) : b;
    };
    return /* @__PURE__ */ O.jsxs(O.Fragment, { children: [
      m(),
      /* @__PURE__ */ O.jsx(mr, {})
    ] });
  };
  return /* @__PURE__ */ O.jsx(fr, { children: /* @__PURE__ */ O.jsx(r, { ...e, children: t }) });
}, mr = ({ children: r }) => {
  var N, j;
  const e = Pe(de), t = lr(), u = U(/* @__PURE__ */ new Set()), i = (y) => y.id || `${y.component}:${y.url}`, c = U(!1), m = U(!!((N = t.props) != null && N._inertiaui_modal));
  W(() => ee.on("start", () => c.current = !0), []), W(() => ee.on("finish", () => c.current = !1), []), W(
    () => ee.on("navigate", function(y) {
      const f = y.detail.page.props._inertiaui_modal, d = y.detail.page.url;
      if (!f) {
        e == null || e.closeAll(!0), B = null, m.current = !1;
        return;
      }
      if (!ae(d, f.url)) {
        e == null || e.closeAll(!0), B = null, m.current = !1;
        return;
      }
      B = f.baseUrl;
      const _ = i(f);
      u.current.has(_) || f.id && (e != null && e.stack.some((s) => s.id === f.id)) || e != null && e.stack.some((s) => {
        var M, I;
        return ((M = s.response) == null ? void 0 : M.component) === f.component && ae((I = s.response) == null ? void 0 : I.url, f.url);
      }) || (u.current.add(_), e == null || e.pushFromResponseData(f, {}, () => {
        if (!f.baseUrl) {
          console.error("No base url in modal response data so cannot navigate back");
          return;
        }
        !c.current && typeof window < "u" && window.location.href !== f.baseUrl && ee.visit(f.baseUrl, {
          preserveScroll: !0,
          preserveState: !0
        });
      }).then(() => {
        u.current.delete(_);
      }));
    }),
    []
  );
  const b = (y) => {
    var d;
    const f = B ?? (m.current ? (d = t.props._inertiaui_modal) == null ? void 0 : d.baseUrl : null);
    return f && (y.headers["X-InertiaUI-Modal-Base-Url"] = f), y;
  };
  W(() => {
    const y = le.interceptors.request.use(b);
    return () => le.interceptors.request.eject(y);
  }, []);
  const v = U(void 0);
  return W(() => {
    var d, _;
    const y = (d = t.props) == null ? void 0 : d._inertiaui_modal, f = v.current;
    if (v.current = y, !!y) {
      if (f && y.component === f.component && ae(y.url, f.url)) {
        (_ = e == null ? void 0 : e.stack[0]) == null || _.updateProps(y.props ?? {});
        return;
      }
      if (!f && e && e.stack.length > 0) {
        const s = e.stack.find(
          (M) => {
            var I, p;
            return ((I = M.response) == null ? void 0 : I.component) === y.component && ae((p = M.response) == null ? void 0 : p.url, y.url);
          }
        );
        s && s.updateProps(y.props ?? {});
      }
    }
  }, [(j = t.props) == null ? void 0 : j._inertiaui_modal]), /* @__PURE__ */ O.jsxs(O.Fragment, { children: [
    r,
    e && e.stack.length > 0 && /* @__PURE__ */ O.jsx(Ue, { index: 0 })
  ] });
}, Ee = xe.createContext(null);
Ee.displayName = "ModalIndexContext";
const We = () => xe.useContext(Ee), Ue = ({ index: r }) => {
  const { stack: e } = pe(), t = K(() => e[r], [e, r]);
  return t != null && t.component ? /* @__PURE__ */ O.jsx(Ee.Provider, { value: r, children: se(t.component, {
    ...t.props,
    onModalEvent: (...u) => t.emit("modal-event", ...u)
  }) }) : null;
};
function Le() {
  return pe().stack[We()] ?? null;
}
const yr = ({ children: r, data: e, fallback: t }) => {
  if (!e)
    throw new Error("`<Deferred>` requires a `data` prop to be a string or array of strings");
  const [u, i] = X(!1), c = Array.isArray(e) ? e : [e], m = Le(), b = (m == null ? void 0 : m.props) ?? {};
  return W(() => {
    i(c.every((v) => b[v] !== void 0));
  }, [b, c]), u ? r : t;
};
yr.displayName = "InertiaModalDeferred";
const $e = Ie(
  (r, e) => {
    const { name: t, children: u, onFocus: i, onBlur: c, onClose: m, onSuccess: b, ...v } = r, N = We(), { stack: j, registerLocalModal: y, removeLocalModal: f } = pe(), [d, _] = X(null), s = K(
      () => t ? d : j[N],
      [t, d, N, j]
    ), M = K(() => {
      var a;
      return (a = j.find((l) => l.shouldRender && l.index > ((s == null ? void 0 : s.index) ?? -1))) == null ? void 0 : a.index;
    }, [N, j]), I = K(
      () => (s == null ? void 0 : s.config.slideover) ?? v.slideover ?? ce("type") === "slideover",
      [v.slideover, s == null ? void 0 : s.config.slideover]
    ), p = K(
      () => ({
        slideover: I,
        closeButton: v.closeButton ?? G(I, "closeButton"),
        closeExplicitly: v.closeExplicitly ?? G(I, "closeExplicitly"),
        closeOnClickOutside: v.closeOnClickOutside ?? G(I, "closeOnClickOutside"),
        maxWidth: v.maxWidth ?? G(I, "maxWidth"),
        paddingClasses: v.paddingClasses ?? G(I, "paddingClasses"),
        panelClasses: v.panelClasses ?? G(I, "panelClasses"),
        position: v.position ?? G(I, "position"),
        ...s == null ? void 0 : s.config
      }),
      [v, s == null ? void 0 : s.config, I]
    );
    W(() => {
      if (t) {
        let a = null;
        return y(t, (l) => {
          a = l.registerEventListenersFromProps(v), _(l);
        }), () => {
          a == null || a(), a = null, f(t);
        };
      }
      return s == null ? void 0 : s.registerEventListenersFromProps(v);
    }, [t]);
    const o = U(s);
    W(() => {
      o.current = s;
    }, [s]);
    const h = U(void 0);
    W(() => {
      s !== null && (s.isOpen ? b == null || b() : h.current === !0 && (m == null || m()), h.current = s.isOpen);
    }, [s == null ? void 0 : s.isOpen]);
    const [w, k] = X(!1);
    return W(() => {
      w && s !== null && s.isOpen && (s.onTopOfStack ? i == null || i() : c == null || c()), k(!0);
    }, [s == null ? void 0 : s.onTopOfStack]), ge(
      e,
      () => ({
        afterLeave: () => {
          var a;
          return (a = o.current) == null ? void 0 : a.afterLeave();
        },
        close: () => {
          var a;
          return (a = o.current) == null ? void 0 : a.close();
        },
        emit: (...a) => {
          var l;
          return (l = o.current) == null ? void 0 : l.emit(...a);
        },
        getChildModal: () => {
          var a;
          return (a = o.current) == null ? void 0 : a.getChildModal();
        },
        getParentModal: () => {
          var a;
          return (a = o.current) == null ? void 0 : a.getParentModal();
        },
        reload: (a) => {
          var l;
          return (l = o.current) == null ? void 0 : l.reload(a);
        },
        setOpen: (a) => {
          var l;
          return (l = o.current) == null ? void 0 : l.setOpen(a);
        },
        get id() {
          var a;
          return (a = o.current) == null ? void 0 : a.id;
        },
        get index() {
          var a;
          return (a = o.current) == null ? void 0 : a.index;
        },
        get isOpen() {
          var a;
          return (a = o.current) == null ? void 0 : a.isOpen;
        },
        get config() {
          var a;
          return (a = o.current) == null ? void 0 : a.config;
        },
        get modalContext() {
          return o.current;
        },
        get onTopOfStack() {
          var a;
          return (a = o.current) == null ? void 0 : a.onTopOfStack;
        },
        get shouldRender() {
          var a;
          return (a = o.current) == null ? void 0 : a.shouldRender;
        }
      }),
      [s]
    ), s != null && s.shouldRender ? /* @__PURE__ */ O.jsxs(O.Fragment, { children: [
      typeof u == "function" ? u({
        // Spread props first so they can be overridden by built-in props
        ...s.props,
        afterLeave: s.afterLeave,
        close: s.close,
        config: p,
        emit: s.emit,
        getChildModal: s.getChildModal,
        getParentModal: s.getParentModal,
        id: s.id,
        index: s.index,
        isOpen: s.isOpen,
        modalContext: s,
        onTopOfStack: s.onTopOfStack,
        reload: s.reload,
        setOpen: s.setOpen,
        shouldRender: s.shouldRender
      }) : u,
      M !== void 0 && /* @__PURE__ */ O.jsx(Ue, { index: M })
    ] }) : null;
  }
);
$e.displayName = "HeadlessModal";
function qe({ onClick: r }) {
  return /* @__PURE__ */ O.jsxs(
    "button",
    {
      type: "button",
      className: "im-close-button text-gray-400 hover:text-gray-500",
      onClick: r,
      children: [
        /* @__PURE__ */ O.jsx("span", { className: "sr-only", children: "Close" }),
        /* @__PURE__ */ O.jsx(
          "svg",
          {
            className: "size-6",
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: "2",
            stroke: "currentColor",
            "aria-hidden": "true",
            children: /* @__PURE__ */ O.jsx(
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
function Xe(r) {
  var e, t, u = "";
  if (typeof r == "string" || typeof r == "number") u += r;
  else if (typeof r == "object") if (Array.isArray(r)) {
    var i = r.length;
    for (e = 0; e < i; e++) r[e] && (t = Xe(r[e])) && (u && (u += " "), u += t);
  } else for (t in r) r[t] && (u && (u += " "), u += t);
  return u;
}
function J() {
  for (var r, e, t = 0, u = "", i = arguments.length; t < i; t++) (r = arguments[t]) && (e = Xe(r)) && (u && (u += " "), u += e);
  return u;
}
const Se = {
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
}, vr = "2xl";
function Ye(r) {
  return Se[r] || Se[vr];
}
const xr = ({ modalContext: r, config: e, useNativeDialog: t, isFirstModal: u, onAfterLeave: i, children: c }) => {
  const [m, b] = X(!1), [v, N] = X(!1), [j, y] = X("entering"), f = U(null), d = U(null), _ = U(null), s = U(null), M = U(!0), I = K(() => Ye(e.maxWidth), [e.maxWidth]), p = F(() => {
    t || !f.current || !r.onTopOfStack || _.current || (_.current = ke(f.current, {
      initialFocus: !0,
      returnFocus: !1
    }));
  }, [r.onTopOfStack, t]), o = F(() => {
    _.current && (_.current(), _.current = null);
  }, []), h = F(() => {
    t || s.current || e != null && e.closeExplicitly || (s.current = Oe(() => {
      r.onTopOfStack && r.close();
    }));
  }, [e == null ? void 0 : e.closeExplicitly, r, t]), w = F(() => {
    s.current && (s.current(), s.current = null);
  }, []), k = F(
    (C) => {
      t || r.onTopOfStack && (e != null && e.closeExplicitly || (e == null ? void 0 : e.closeOnClickOutside) !== !1 && f.current && (f.current.contains(C.target) || r.close()));
    },
    [r, e == null ? void 0 : e.closeExplicitly, e == null ? void 0 : e.closeOnClickOutside, t]
  ), a = F(
    (C) => {
      C.preventDefault(), r.onTopOfStack && !(e != null && e.closeExplicitly) && r.close();
    },
    [r, e == null ? void 0 : e.closeExplicitly]
  ), l = F(
    (C) => {
      C.target === d.current && r.onTopOfStack && !(e != null && e.closeExplicitly) && (e == null ? void 0 : e.closeOnClickOutside) !== !1 && r.close();
    },
    [r, e == null ? void 0 : e.closeExplicitly, e == null ? void 0 : e.closeOnClickOutside]
  ), T = F(() => {
    d.current && !d.current.open && (d.current.showModal(), requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        b(!0);
      });
    }));
  }, []), x = F(() => {
    d.current && d.current.open && (N(!0), b(!1), setTimeout(() => {
      d.current && d.current.close(), N(!1), i == null || i(), r.afterLeave();
    }, 300));
  }, [i, r]);
  W(() => (t ? r.isOpen && T() : h(), () => {
    var C;
    t ? (C = d.current) != null && C.open && d.current.close() : (o(), w());
  }), []), W(() => {
    t || (r.onTopOfStack ? (h(), m && p()) : (o(), w()));
  }, [r.onTopOfStack, m, h, p, o, w, t]), W(() => {
    t || M.current && r.isOpen && (M.current = !1, requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        y("entered"), setTimeout(() => {
          b(!0), p();
        }, 300);
      });
    }));
  }, [r.isOpen, p, t]), W(() => {
    t || !r.isOpen && j === "entered" && (y("leaving"), setTimeout(() => {
      y("exited"), i == null || i(), r.afterLeave();
    }, 300));
  }, [r.isOpen, j, i, r, t]), W(() => {
    t && (r.isOpen ? T() : v || x());
  }, [r.isOpen, T, x, v, t]);
  const E = () => /* @__PURE__ */ O.jsxs(
    "div",
    {
      className: `im-modal-content relative ${e.paddingClasses} ${e.panelClasses}`,
      "data-inertiaui-modal-entered": m,
      children: [
        e.closeButton && /* @__PURE__ */ O.jsx("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ O.jsx(qe, { onClick: r.close }) }),
        typeof c == "function" ? c({ modalContext: r, config: e }) : c
      ]
    }
  );
  if (t)
    return /* @__PURE__ */ O.jsx(
      "dialog",
      {
        ref: d,
        className: J(
          "im-modal-dialog m-0 overflow-visible bg-transparent p-0",
          "size-full max-h-none max-w-none",
          "backdrop:bg-black/75 backdrop:transition-opacity backdrop:duration-300",
          m ? "backdrop:opacity-100" : "backdrop:opacity-0",
          !u && "backdrop:bg-transparent"
        ),
        onCancel: a,
        onClick: l,
        children: /* @__PURE__ */ O.jsx("div", { className: "im-modal-container fixed inset-0 overflow-y-auto p-4", children: /* @__PURE__ */ O.jsx(
          "div",
          {
            className: J("im-modal-positioner flex min-h-full justify-center", {
              "items-start": e.position === "top",
              "items-center": e.position === "center",
              "items-end": e.position === "bottom"
            }),
            children: /* @__PURE__ */ O.jsx(
              "div",
              {
                className: J(
                  "im-modal-wrapper w-full transition duration-300 ease-in-out",
                  r.onTopOfStack ? "" : "blur-xs",
                  m && !v ? "translate-y-0 opacity-100 sm:scale-100" : "translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95",
                  I
                ),
                children: E()
              }
            )
          }
        ) })
      }
    );
  if (j === "exited") return null;
  const g = j === "entering", A = j === "leaving";
  return /* @__PURE__ */ O.jsx(
    "div",
    {
      className: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4",
      onMouseDown: k,
      children: /* @__PURE__ */ O.jsx(
        "div",
        {
          className: J("im-modal-positioner flex min-h-full justify-center", {
            "items-start": e.position === "top",
            "items-center": e.position === "center",
            "items-end": e.position === "bottom"
          }),
          onMouseDown: k,
          children: /* @__PURE__ */ O.jsxs(
            "div",
            {
              ref: f,
              role: "dialog",
              "aria-modal": "true",
              className: J(
                "im-modal-wrapper w-full transition duration-300 ease-in-out",
                r.onTopOfStack ? "" : "blur-xs",
                g || A ? "translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95" : "translate-y-0 opacity-100 sm:scale-100",
                I
              ),
              children: [
                /* @__PURE__ */ O.jsx("span", { className: "sr-only", children: "Dialog" }),
                E()
              ]
            }
          )
        }
      )
    }
  );
}, kr = ({ modalContext: r, config: e, useNativeDialog: t, isFirstModal: u, onAfterLeave: i, children: c }) => {
  const [m, b] = X(!1), [v, N] = X(!1), [j, y] = X("entering"), f = U(null), d = U(null), _ = U(null), s = U(null), M = U(!0), I = e.position === "left", p = K(() => Ye(e.maxWidth), [e.maxWidth]), o = F(
    (L) => L ? I ? "-translate-x-full opacity-0" : "translate-x-full opacity-0" : "translate-x-0 opacity-100",
    [I]
  ), h = F(() => {
    t || !f.current || !r.onTopOfStack || _.current || (_.current = ke(f.current, {
      initialFocus: !0,
      returnFocus: !1
    }));
  }, [r.onTopOfStack, t]), w = F(() => {
    _.current && (_.current(), _.current = null);
  }, []), k = F(() => {
    t || s.current || e != null && e.closeExplicitly || (s.current = Oe(() => {
      r.onTopOfStack && r.close();
    }));
  }, [e == null ? void 0 : e.closeExplicitly, r, t]), a = F(() => {
    s.current && (s.current(), s.current = null);
  }, []), l = F(
    (L) => {
      t || r.onTopOfStack && (e != null && e.closeExplicitly || (e == null ? void 0 : e.closeOnClickOutside) !== !1 && f.current && (f.current.contains(L.target) || r.close()));
    },
    [r, e == null ? void 0 : e.closeExplicitly, e == null ? void 0 : e.closeOnClickOutside, t]
  ), T = F(
    (L) => {
      L.preventDefault(), r.onTopOfStack && !(e != null && e.closeExplicitly) && r.close();
    },
    [r, e == null ? void 0 : e.closeExplicitly]
  ), x = F(
    (L) => {
      L.target === d.current && r.onTopOfStack && !(e != null && e.closeExplicitly) && (e == null ? void 0 : e.closeOnClickOutside) !== !1 && r.close();
    },
    [r, e == null ? void 0 : e.closeExplicitly, e == null ? void 0 : e.closeOnClickOutside]
  ), E = F(() => {
    d.current && !d.current.open && (d.current.showModal(), requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        b(!0);
      });
    }));
  }, []), g = F(() => {
    d.current && d.current.open && (N(!0), b(!1), setTimeout(() => {
      d.current && d.current.close(), N(!1), i == null || i(), r.afterLeave();
    }, 300));
  }, [i, r]);
  W(() => (t ? r.isOpen && E() : k(), () => {
    var L;
    t ? (L = d.current) != null && L.open && d.current.close() : (w(), a());
  }), []), W(() => {
    t || (r.onTopOfStack ? (k(), m && h()) : (w(), a()));
  }, [r.onTopOfStack, m, k, h, w, a, t]), W(() => {
    t || M.current && r.isOpen && (M.current = !1, requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        y("entered"), setTimeout(() => {
          b(!0), h();
        }, 300);
      });
    }));
  }, [r.isOpen, h, t]), W(() => {
    t || !r.isOpen && j === "entered" && (y("leaving"), setTimeout(() => {
      y("exited"), i == null || i(), r.afterLeave();
    }, 300));
  }, [r.isOpen, j, i, r, t]), W(() => {
    t && (r.isOpen ? E() : v || g());
  }, [r.isOpen, E, g, v, t]);
  const A = () => /* @__PURE__ */ O.jsxs(
    "div",
    {
      className: `im-slideover-content relative ${e.paddingClasses} ${e.panelClasses}`,
      "data-inertiaui-modal-entered": m,
      children: [
        e.closeButton && /* @__PURE__ */ O.jsx("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ O.jsx(qe, { onClick: r.close }) }),
        typeof c == "function" ? c({ modalContext: r, config: e }) : c
      ]
    }
  );
  if (t)
    return /* @__PURE__ */ O.jsx(
      "dialog",
      {
        ref: d,
        className: J(
          "im-slideover-dialog m-0 overflow-visible bg-transparent p-0",
          "size-full max-h-none max-w-none",
          "backdrop:bg-black/75 backdrop:transition-opacity backdrop:duration-300",
          m ? "backdrop:opacity-100" : "backdrop:opacity-0",
          !u && "backdrop:bg-transparent"
        ),
        onCancel: T,
        onClick: x,
        children: /* @__PURE__ */ O.jsx("div", { className: "im-slideover-container fixed inset-0 overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ O.jsx(
          "div",
          {
            className: J("im-slideover-positioner flex min-h-full items-center", {
              "justify-start rtl:justify-end": (e == null ? void 0 : e.position) === "left",
              "justify-end rtl:justify-start": (e == null ? void 0 : e.position) === "right"
            }),
            children: /* @__PURE__ */ O.jsx(
              "div",
              {
                className: J(
                  "im-slideover-wrapper w-full transition duration-300 ease-in-out",
                  r.onTopOfStack ? "" : "blur-xs",
                  o(!(m && !v)),
                  p
                ),
                children: A()
              }
            )
          }
        ) })
      }
    );
  if (j === "exited") return null;
  const C = j === "entering", q = j === "leaving";
  return /* @__PURE__ */ O.jsx(
    "div",
    {
      className: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden",
      onMouseDown: l,
      children: /* @__PURE__ */ O.jsx(
        "div",
        {
          className: J("im-slideover-positioner flex min-h-full items-center", {
            "justify-start rtl:justify-end": (e == null ? void 0 : e.position) === "left",
            "justify-end rtl:justify-start": (e == null ? void 0 : e.position) === "right"
          }),
          onMouseDown: l,
          children: /* @__PURE__ */ O.jsxs(
            "div",
            {
              ref: f,
              role: "dialog",
              "aria-modal": "true",
              className: J(
                "im-slideover-wrapper w-full transition duration-300 ease-in-out",
                r.onTopOfStack ? "" : "blur-xs",
                o(C || q),
                p
              ),
              children: [
                /* @__PURE__ */ O.jsx("span", { className: "sr-only", children: "Dialog" }),
                A()
              ]
            }
          )
        }
      )
    }
  );
}, Or = Ie(
  (r, e) => {
    const { name: t, children: u, onFocus: i, onBlur: c, onClose: m, onSuccess: b, onAfterLeave: v, ...N } = r, j = (h) => typeof u == "function" ? u(h) : u, y = U(null), f = U(null), d = U(null), [_, s] = X(!1), M = K(() => ce("useNativeDialog"), []);
    ge(e, () => y.current, [y]), W(() => () => {
      var h, w;
      (h = f.current) == null || h.call(f), (w = d.current) == null || w.call(d);
    }, []);
    const I = F(() => {
      b == null || b(), f.current || (f.current = Fe(), d.current = Ne("#app"));
    }, [b]), p = F(() => {
      var h, w;
      m == null || m(), (h = f.current) == null || h.call(f), (w = d.current) == null || w.call(d), f.current = null, d.current = null;
    }, [m]), o = F(() => {
      v == null || v();
    }, [v]);
    return /* @__PURE__ */ O.jsx(
      $e,
      {
        ref: y,
        name: t,
        onFocus: i ?? void 0,
        onBlur: c ?? void 0,
        onClose: p,
        onSuccess: I,
        ...N,
        children: ({
          afterLeave: h,
          close: w,
          config: k,
          emit: a,
          getChildModal: l,
          getParentModal: T,
          id: x,
          index: E,
          isOpen: g,
          modalContext: A,
          onTopOfStack: C,
          reload: q,
          setOpen: L,
          shouldRender: Y,
          ...V
        }) => /* @__PURE__ */ O.jsx(br, { children: /* @__PURE__ */ O.jsxs(
          "div",
          {
            className: "im-dialog relative z-20",
            "data-inertiaui-modal-id": x,
            "data-inertiaui-modal-index": E,
            "aria-hidden": !C,
            children: [
              E === 0 && !M && /* @__PURE__ */ O.jsx(
                wr,
                {
                  show: g,
                  appear: !_,
                  onAfterAppear: () => s(!0)
                }
              ),
              k.slideover ? /* @__PURE__ */ O.jsx(
                kr,
                {
                  modalContext: A,
                  config: k,
                  useNativeDialog: M,
                  isFirstModal: E === 0,
                  onAfterLeave: o,
                  children: j({
                    ...V,
                    afterLeave: h,
                    close: w,
                    config: k,
                    emit: a,
                    getChildModal: l,
                    getParentModal: T,
                    id: x,
                    index: E,
                    isOpen: g,
                    modalContext: A,
                    onTopOfStack: C,
                    reload: q,
                    setOpen: L,
                    shouldRender: Y
                  })
                }
              ) : /* @__PURE__ */ O.jsx(
                xr,
                {
                  modalContext: A,
                  config: k,
                  useNativeDialog: M,
                  isFirstModal: E === 0,
                  onAfterLeave: o,
                  children: j({
                    ...V,
                    afterLeave: h,
                    close: w,
                    config: k,
                    emit: a,
                    getChildModal: l,
                    getParentModal: T,
                    id: x,
                    index: E,
                    isOpen: g,
                    modalContext: A,
                    onTopOfStack: C,
                    reload: q,
                    setOpen: L,
                    shouldRender: Y
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
function br({ children: r }) {
  const [e, t] = X(!1);
  return W(() => {
    t(!0);
  }, []), e ? ir(r, document.body) : null;
}
function wr({ show: r, appear: e, onAfterAppear: t }) {
  const [u, i] = X(() => e && r ? "entering" : r ? "entered" : "exited"), c = U(!0);
  if (W(() => {
    if (c.current) {
      c.current = !1, e && r && requestAnimationFrame(() => {
        i("entered"), setTimeout(() => t == null ? void 0 : t(), 300);
      });
      return;
    }
    r ? (i("entering"), requestAnimationFrame(() => {
      i("entered");
    })) : (i("leaving"), setTimeout(() => i("exited"), 300));
  }, [r, e, t]), u === "exited") return null;
  const m = u === "entered";
  return /* @__PURE__ */ O.jsx(
    "div",
    {
      className: `im-backdrop fixed inset-0 z-30 bg-black/75 transition-opacity duration-300 ease-in-out ${m ? "opacity-100" : "opacity-0"}`,
      "aria-hidden": "true"
    }
  );
}
Or.displayName = "Modal";
const Nr = ({
  href: r,
  method: e = "get",
  data: t = {},
  as: u = "a",
  headers: i = {},
  queryStringArrayFormat: c = "brackets",
  onAfterLeave: m,
  onBlur: b,
  onClose: v,
  onError: N,
  onFocus: j,
  onStart: y,
  onSuccess: f,
  onPrefetching: d,
  onPrefetched: _,
  navigate: s,
  prefetch: M = !1,
  cacheFor: I = 3e4,
  children: p,
  ...o
}) => {
  const [h, w] = X(!1), [k, a] = X(null), { stack: l, visit: T } = pe(), x = U(null), E = K(() => s ?? ce("navigate"), [s]), g = K(() => M === !0 ? ["hover"] : M === !1 ? [] : Array.isArray(M) ? M : [M], [M]), A = F(() => {
    pr(r, {
      method: e,
      data: t,
      headers: i,
      queryStringArrayFormat: c,
      cacheFor: I,
      onPrefetching: d ?? void 0,
      onPrefetched: _ ?? void 0
    });
  }, [r, e, t, i, c, I, d, _]), C = F(() => {
    g.includes("hover") && (x.current = setTimeout(() => {
      A();
    }, 75));
  }, [g, A]), q = F(() => {
    x.current && (clearTimeout(x.current), x.current = null);
  }, []), L = F(
    (S) => {
      g.includes("click") && S.button === 0 && A();
    },
    [g, A]
  );
  W(() => {
    g.includes("mount") && A();
  }, []), W(() => () => {
    x.current && clearTimeout(x.current);
  }, []);
  const Y = {}, V = {};
  Object.keys(o).forEach((S) => {
    _e.includes(S) || (S.startsWith("on") && typeof o[S] == "function" ? tr(S) ? Y[S] = o[S] : V[S] = o[S] : Y[S] = o[S]);
  });
  const [H, z] = X(!1);
  W(() => {
    k && (k.onTopOfStack && H ? j == null || j() : !k.onTopOfStack && !H && (b == null || b()), z(!k.onTopOfStack));
  }, [l]);
  const n = F(() => {
    v == null || v();
  }, [v]), R = F(() => {
    a(null), m == null || m();
  }, [m]), P = F(
    (S) => {
      S == null || S.preventDefault(), !h && (r.startsWith("#") || (w(!0), y == null || y()), T(
        r,
        e,
        t,
        i,
        nr(sr(o, _e)),
        () => n(),
        R,
        c,
        E
      ).then((D) => {
        a(D), D.registerEventListenersFromProps(V), f == null || f();
      }).catch((D) => {
        console.error(D), N == null || N(D);
      }).finally(() => w(!1)));
    },
    [r, e, t, i, c, o, n, R]
  );
  return /* @__PURE__ */ O.jsx(
    u,
    {
      ...Y,
      href: r,
      onClick: P,
      onMouseEnter: C,
      onMouseLeave: q,
      onMouseDown: L,
      children: typeof p == "function" ? p({ loading: h }) : p
    }
  );
}, Er = ({ children: r, data: e, params: t, buffer: u, as: i, always: c, fallback: m }) => {
  c = c ?? !1, i = i ?? "div", m = m ?? null;
  const [b, v] = X(!1), N = U(!1), j = U(!1), y = U(null), f = Le(), d = F(() => {
    if (e)
      return {
        only: Array.isArray(e) ? e : [e]
      };
    if (!t)
      throw new Error("You must provide either a `data` or `params` prop.");
    return t;
  }, [t, e]);
  return W(() => {
    if (!y.current)
      return;
    const _ = new IntersectionObserver(
      (s) => {
        if (!s[0].isIntersecting || (!c && N.current && _.disconnect(), j.current))
          return;
        N.current = !0, j.current = !0;
        const M = d();
        f == null || f.reload({
          ...M,
          onStart: () => {
            var I;
            j.current = !0, (I = M.onStart) == null || I.call(M);
          },
          onFinish: () => {
            var I;
            v(!0), j.current = !1, (I = M.onFinish) == null || I.call(M), c || _.disconnect();
          }
        });
      },
      {
        rootMargin: `${u || 0}px`
      }
    );
    return _.observe(y.current), () => {
      _.disconnect();
    };
  }, [y, d, u]), c || !b ? se(
    i,
    {
      props: null,
      ref: y
    },
    b ? r : m
  ) : b ? r : null;
};
Er.displayName = "InertiaWhenVisible";
const Cr = (r) => (e) => (e.default.layout = (t) => se(r, { children: t }), e);
export {
  yr as Deferred,
  $e as HeadlessModal,
  Or as Modal,
  Nr as ModalLink,
  mr as ModalRoot,
  fr as ModalStackProvider,
  Er as WhenVisible,
  gr as dialogUtils,
  ce as getConfig,
  hr as initFromPageProps,
  _e as modalPropNames,
  pr as prefetch,
  Ir as putConfig,
  Fr as renderApp,
  Pr as resetConfig,
  Cr as setPageLayout,
  Le as useModal,
  We as useModalIndex,
  pe as useModalStack
};
//# sourceMappingURL=inertiaui-modal.js.map
