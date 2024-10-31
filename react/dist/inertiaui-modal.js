var Fo = Object.defineProperty;
var Io = (t, e, r) => e in t ? Fo(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var ce = (t, e, r) => Io(t, typeof e != "symbol" ? e + "" : e, r);
import * as ht from "react";
import A, { createContext as fe, useState as Q, useEffect as Y, useContext as ie, useRef as k, createElement as Ar, useMemo as J, forwardRef as Vr, useImperativeHandle as na, useLayoutEffect as Co, useCallback as ve, Fragment as he, isValidElement as Mo, cloneElement as _o, useId as Pt, useSyncExternalStore as Do, useReducer as No, createRef as ko } from "react";
import Lt from "axios";
import { router as vt, usePage as jo } from "@inertiajs/react";
import { createPortal as Lo } from "react-dom";
const ct = {
  type: "modal",
  navigate: !1,
  modal: {
    closeButton: !0,
    closeExplicitly: !1,
    maxWidth: "2xl",
    paddingClasses: "p-4 sm:p-6",
    panelClasses: "bg-white rounded",
    position: "center"
  },
  slideover: {
    closeButton: !0,
    closeExplicitly: !1,
    maxWidth: "md",
    paddingClasses: "p-4 sm:p-6",
    panelClasses: "bg-white min-h-screen",
    position: "right"
  }
};
class Wo {
  constructor() {
    this.config = {}, this.reset();
  }
  reset() {
    this.config = JSON.parse(JSON.stringify(ct));
  }
  put(e, r) {
    if (typeof e == "object") {
      this.config = {
        type: e.type ?? ct.type,
        navigate: e.navigate ?? ct.navigate,
        modal: { ...ct.modal, ...e.modal ?? {} },
        slideover: { ...ct.slideover, ...e.slideover ?? {} }
      };
      return;
    }
    const n = e.split(".");
    let a = this.config;
    for (let o = 0; o < n.length - 1; o++)
      a = a[n[o]] = a[n[o]] || {};
    a[n[n.length - 1]] = r;
  }
  get(e) {
    if (typeof e > "u")
      return this.config;
    const r = e.split(".");
    let n = this.config;
    for (const a of r) {
      if (n[a] === void 0)
        return null;
      n = n[a];
    }
    return n;
  }
}
const zt = new Wo(), Oc = () => zt.reset(), Pc = (t, e) => zt.put(t, e), qr = (t) => zt.get(t), ze = (t, e) => zt.get(t ? `slideover.${e}` : `modal.${e}`);
var Tr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Uo(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Bo(t) {
  if (t.__esModule) return t;
  var e = t.default;
  if (typeof e == "function") {
    var r = function n() {
      return this instanceof n ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    r.prototype = e.prototype;
  } else r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(t).forEach(function(n) {
    var a = Object.getOwnPropertyDescriptor(t, n);
    Object.defineProperty(r, n, a.get ? a : {
      enumerable: !0,
      get: function() {
        return t[n];
      }
    });
  }), r;
}
var $r = { exports: {} }, ft = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var En;
function Ho() {
  if (En) return ft;
  En = 1;
  var t = A, e = Symbol.for("react.element"), r = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, a = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = { key: !0, ref: !0, __self: !0, __source: !0 };
  function l(u, i, f) {
    var s, h = {}, v = null, w = null;
    f !== void 0 && (v = "" + f), i.key !== void 0 && (v = "" + i.key), i.ref !== void 0 && (w = i.ref);
    for (s in i) n.call(i, s) && !o.hasOwnProperty(s) && (h[s] = i[s]);
    if (u && u.defaultProps) for (s in i = u.defaultProps, i) h[s] === void 0 && (h[s] = i[s]);
    return { $$typeof: e, type: u, key: v, ref: w, props: h, _owner: a.current };
  }
  return ft.Fragment = r, ft.jsx = l, ft.jsxs = l, ft;
}
var dt = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Sn;
function Vo() {
  return Sn || (Sn = 1, process.env.NODE_ENV !== "production" && function() {
    var t = A, e = Symbol.for("react.element"), r = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), l = Symbol.for("react.provider"), u = Symbol.for("react.context"), i = Symbol.for("react.forward_ref"), f = Symbol.for("react.suspense"), s = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), v = Symbol.for("react.lazy"), w = Symbol.for("react.offscreen"), d = Symbol.iterator, y = "@@iterator";
    function p(c) {
      if (c === null || typeof c != "object")
        return null;
      var E = d && c[d] || c[y];
      return typeof E == "function" ? E : null;
    }
    var m = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function g(c) {
      {
        for (var E = arguments.length, x = new Array(E > 1 ? E - 1 : 0), P = 1; P < E; P++)
          x[P - 1] = arguments[P];
        b("error", c, x);
      }
    }
    function b(c, E, x) {
      {
        var P = m.ReactDebugCurrentFrame, N = P.getStackAddendum();
        N !== "" && (E += "%s", x = x.concat([N]));
        var L = x.map(function(C) {
          return String(C);
        });
        L.unshift("Warning: " + E), Function.prototype.apply.call(console[c], console, L);
      }
    }
    var S = !1, O = !1, _ = !1, M = !1, W = !1, H;
    H = Symbol.for("react.module.reference");
    function j(c) {
      return !!(typeof c == "string" || typeof c == "function" || c === n || c === o || W || c === a || c === f || c === s || M || c === w || S || O || _ || typeof c == "object" && c !== null && (c.$$typeof === v || c.$$typeof === h || c.$$typeof === l || c.$$typeof === u || c.$$typeof === i || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      c.$$typeof === H || c.getModuleId !== void 0));
    }
    function z(c, E, x) {
      var P = c.displayName;
      if (P)
        return P;
      var N = E.displayName || E.name || "";
      return N !== "" ? x + "(" + N + ")" : x;
    }
    function V(c) {
      return c.displayName || "Context";
    }
    function $(c) {
      if (c == null)
        return null;
      if (typeof c.tag == "number" && g("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof c == "function")
        return c.displayName || c.name || null;
      if (typeof c == "string")
        return c;
      switch (c) {
        case n:
          return "Fragment";
        case r:
          return "Portal";
        case o:
          return "Profiler";
        case a:
          return "StrictMode";
        case f:
          return "Suspense";
        case s:
          return "SuspenseList";
      }
      if (typeof c == "object")
        switch (c.$$typeof) {
          case u:
            var E = c;
            return V(E) + ".Consumer";
          case l:
            var x = c;
            return V(x._context) + ".Provider";
          case i:
            return z(c, c.render, "ForwardRef");
          case h:
            var P = c.displayName || null;
            return P !== null ? P : $(c.type) || "Memo";
          case v: {
            var N = c, L = N._payload, C = N._init;
            try {
              return $(C(L));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var T = Object.assign, D = 0, ue, pe, ge, te, ye, q, _e;
    function ee() {
    }
    ee.__reactDisabledLog = !0;
    function or() {
      {
        if (D === 0) {
          ue = console.log, pe = console.info, ge = console.warn, te = console.error, ye = console.group, q = console.groupCollapsed, _e = console.groupEnd;
          var c = {
            configurable: !0,
            enumerable: !0,
            value: ee,
            writable: !0
          };
          Object.defineProperties(console, {
            info: c,
            log: c,
            warn: c,
            error: c,
            group: c,
            groupCollapsed: c,
            groupEnd: c
          });
        }
        D++;
      }
    }
    function De() {
      {
        if (D--, D === 0) {
          var c = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: T({}, c, {
              value: ue
            }),
            info: T({}, c, {
              value: pe
            }),
            warn: T({}, c, {
              value: ge
            }),
            error: T({}, c, {
              value: te
            }),
            group: T({}, c, {
              value: ye
            }),
            groupCollapsed: T({}, c, {
              value: q
            }),
            groupEnd: T({}, c, {
              value: _e
            })
          });
        }
        D < 0 && g("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var lt = m.ReactCurrentDispatcher, Ne;
    function xe(c, E, x) {
      {
        if (Ne === void 0)
          try {
            throw Error();
          } catch (N) {
            var P = N.stack.trim().match(/\n( *(at )?)/);
            Ne = P && P[1] || "";
          }
        return `
` + Ne + c;
      }
    }
    var Oe = !1, Ft;
    {
      var ao = typeof WeakMap == "function" ? WeakMap : Map;
      Ft = new ao();
    }
    function ln(c, E) {
      if (!c || Oe)
        return "";
      {
        var x = Ft.get(c);
        if (x !== void 0)
          return x;
      }
      var P;
      Oe = !0;
      var N = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var L;
      L = lt.current, lt.current = null, or();
      try {
        if (E) {
          var C = function() {
            throw Error();
          };
          if (Object.defineProperty(C.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(C, []);
            } catch (oe) {
              P = oe;
            }
            Reflect.construct(c, [], C);
          } else {
            try {
              C.call();
            } catch (oe) {
              P = oe;
            }
            c.call(C.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (oe) {
            P = oe;
          }
          c();
        }
      } catch (oe) {
        if (oe && P && typeof oe.stack == "string") {
          for (var F = oe.stack.split(`
`), ne = P.stack.split(`
`), G = F.length - 1, K = ne.length - 1; G >= 1 && K >= 0 && F[G] !== ne[K]; )
            K--;
          for (; G >= 1 && K >= 0; G--, K--)
            if (F[G] !== ne[K]) {
              if (G !== 1 || K !== 1)
                do
                  if (G--, K--, K < 0 || F[G] !== ne[K]) {
                    var se = `
` + F[G].replace(" at new ", " at ");
                    return c.displayName && se.includes("<anonymous>") && (se = se.replace("<anonymous>", c.displayName)), typeof c == "function" && Ft.set(c, se), se;
                  }
                while (G >= 1 && K >= 0);
              break;
            }
        }
      } finally {
        Oe = !1, lt.current = L, De(), Error.prepareStackTrace = N;
      }
      var Ye = c ? c.displayName || c.name : "", ke = Ye ? xe(Ye) : "";
      return typeof c == "function" && Ft.set(c, ke), ke;
    }
    function oo(c, E, x) {
      return ln(c, !1);
    }
    function io(c) {
      var E = c.prototype;
      return !!(E && E.isReactComponent);
    }
    function It(c, E, x) {
      if (c == null)
        return "";
      if (typeof c == "function")
        return ln(c, io(c));
      if (typeof c == "string")
        return xe(c);
      switch (c) {
        case f:
          return xe("Suspense");
        case s:
          return xe("SuspenseList");
      }
      if (typeof c == "object")
        switch (c.$$typeof) {
          case i:
            return oo(c.render);
          case h:
            return It(c.type, E, x);
          case v: {
            var P = c, N = P._payload, L = P._init;
            try {
              return It(L(N), E, x);
            } catch {
            }
          }
        }
      return "";
    }
    var ut = Object.prototype.hasOwnProperty, un = {}, sn = m.ReactDebugCurrentFrame;
    function Ct(c) {
      if (c) {
        var E = c._owner, x = It(c.type, c._source, E ? E.type : null);
        sn.setExtraStackFrame(x);
      } else
        sn.setExtraStackFrame(null);
    }
    function lo(c, E, x, P, N) {
      {
        var L = Function.call.bind(ut);
        for (var C in c)
          if (L(c, C)) {
            var F = void 0;
            try {
              if (typeof c[C] != "function") {
                var ne = Error((P || "React class") + ": " + x + " type `" + C + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof c[C] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw ne.name = "Invariant Violation", ne;
              }
              F = c[C](E, C, P, x, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (G) {
              F = G;
            }
            F && !(F instanceof Error) && (Ct(N), g("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", P || "React class", x, C, typeof F), Ct(null)), F instanceof Error && !(F.message in un) && (un[F.message] = !0, Ct(N), g("Failed %s type: %s", x, F.message), Ct(null));
          }
      }
    }
    var uo = Array.isArray;
    function ir(c) {
      return uo(c);
    }
    function so(c) {
      {
        var E = typeof Symbol == "function" && Symbol.toStringTag, x = E && c[Symbol.toStringTag] || c.constructor.name || "Object";
        return x;
      }
    }
    function co(c) {
      try {
        return cn(c), !1;
      } catch {
        return !0;
      }
    }
    function cn(c) {
      return "" + c;
    }
    function fn(c) {
      if (co(c))
        return g("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", so(c)), cn(c);
    }
    var st = m.ReactCurrentOwner, fo = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, dn, pn, lr;
    lr = {};
    function po(c) {
      if (ut.call(c, "ref")) {
        var E = Object.getOwnPropertyDescriptor(c, "ref").get;
        if (E && E.isReactWarning)
          return !1;
      }
      return c.ref !== void 0;
    }
    function yo(c) {
      if (ut.call(c, "key")) {
        var E = Object.getOwnPropertyDescriptor(c, "key").get;
        if (E && E.isReactWarning)
          return !1;
      }
      return c.key !== void 0;
    }
    function vo(c, E) {
      if (typeof c.ref == "string" && st.current && E && st.current.stateNode !== E) {
        var x = $(st.current.type);
        lr[x] || (g('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', $(st.current.type), c.ref), lr[x] = !0);
      }
    }
    function mo(c, E) {
      {
        var x = function() {
          dn || (dn = !0, g("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", E));
        };
        x.isReactWarning = !0, Object.defineProperty(c, "key", {
          get: x,
          configurable: !0
        });
      }
    }
    function ho(c, E) {
      {
        var x = function() {
          pn || (pn = !0, g("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", E));
        };
        x.isReactWarning = !0, Object.defineProperty(c, "ref", {
          get: x,
          configurable: !0
        });
      }
    }
    var go = function(c, E, x, P, N, L, C) {
      var F = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: e,
        // Built-in properties that belong on the element
        type: c,
        key: E,
        ref: x,
        props: C,
        // Record the component responsible for creating this element.
        _owner: L
      };
      return F._store = {}, Object.defineProperty(F._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(F, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: P
      }), Object.defineProperty(F, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: N
      }), Object.freeze && (Object.freeze(F.props), Object.freeze(F)), F;
    };
    function bo(c, E, x, P, N) {
      {
        var L, C = {}, F = null, ne = null;
        x !== void 0 && (fn(x), F = "" + x), yo(E) && (fn(E.key), F = "" + E.key), po(E) && (ne = E.ref, vo(E, N));
        for (L in E)
          ut.call(E, L) && !fo.hasOwnProperty(L) && (C[L] = E[L]);
        if (c && c.defaultProps) {
          var G = c.defaultProps;
          for (L in G)
            C[L] === void 0 && (C[L] = G[L]);
        }
        if (F || ne) {
          var K = typeof c == "function" ? c.displayName || c.name || "Unknown" : c;
          F && mo(C, K), ne && ho(C, K);
        }
        return go(c, F, ne, N, P, st.current, C);
      }
    }
    var ur = m.ReactCurrentOwner, yn = m.ReactDebugCurrentFrame;
    function Ge(c) {
      if (c) {
        var E = c._owner, x = It(c.type, c._source, E ? E.type : null);
        yn.setExtraStackFrame(x);
      } else
        yn.setExtraStackFrame(null);
    }
    var sr;
    sr = !1;
    function cr(c) {
      return typeof c == "object" && c !== null && c.$$typeof === e;
    }
    function vn() {
      {
        if (ur.current) {
          var c = $(ur.current.type);
          if (c)
            return `

Check the render method of \`` + c + "`.";
        }
        return "";
      }
    }
    function wo(c) {
      return "";
    }
    var mn = {};
    function Eo(c) {
      {
        var E = vn();
        if (!E) {
          var x = typeof c == "string" ? c : c.displayName || c.name;
          x && (E = `

Check the top-level render call using <` + x + ">.");
        }
        return E;
      }
    }
    function hn(c, E) {
      {
        if (!c._store || c._store.validated || c.key != null)
          return;
        c._store.validated = !0;
        var x = Eo(E);
        if (mn[x])
          return;
        mn[x] = !0;
        var P = "";
        c && c._owner && c._owner !== ur.current && (P = " It was passed a child from " + $(c._owner.type) + "."), Ge(c), g('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', x, P), Ge(null);
      }
    }
    function gn(c, E) {
      {
        if (typeof c != "object")
          return;
        if (ir(c))
          for (var x = 0; x < c.length; x++) {
            var P = c[x];
            cr(P) && hn(P, E);
          }
        else if (cr(c))
          c._store && (c._store.validated = !0);
        else if (c) {
          var N = p(c);
          if (typeof N == "function" && N !== c.entries)
            for (var L = N.call(c), C; !(C = L.next()).done; )
              cr(C.value) && hn(C.value, E);
        }
      }
    }
    function So(c) {
      {
        var E = c.type;
        if (E == null || typeof E == "string")
          return;
        var x;
        if (typeof E == "function")
          x = E.propTypes;
        else if (typeof E == "object" && (E.$$typeof === i || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        E.$$typeof === h))
          x = E.propTypes;
        else
          return;
        if (x) {
          var P = $(E);
          lo(x, c.props, "prop", P, c);
        } else if (E.PropTypes !== void 0 && !sr) {
          sr = !0;
          var N = $(E);
          g("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", N || "Unknown");
        }
        typeof E.getDefaultProps == "function" && !E.getDefaultProps.isReactClassApproved && g("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function xo(c) {
      {
        for (var E = Object.keys(c.props), x = 0; x < E.length; x++) {
          var P = E[x];
          if (P !== "children" && P !== "key") {
            Ge(c), g("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", P), Ge(null);
            break;
          }
        }
        c.ref !== null && (Ge(c), g("Invalid attribute `ref` supplied to `React.Fragment`."), Ge(null));
      }
    }
    var bn = {};
    function wn(c, E, x, P, N, L) {
      {
        var C = j(c);
        if (!C) {
          var F = "";
          (c === void 0 || typeof c == "object" && c !== null && Object.keys(c).length === 0) && (F += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ne = wo();
          ne ? F += ne : F += vn();
          var G;
          c === null ? G = "null" : ir(c) ? G = "array" : c !== void 0 && c.$$typeof === e ? (G = "<" + ($(c.type) || "Unknown") + " />", F = " Did you accidentally export a JSX literal instead of a component?") : G = typeof c, g("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", G, F);
        }
        var K = bo(c, E, x, N, L);
        if (K == null)
          return K;
        if (C) {
          var se = E.children;
          if (se !== void 0)
            if (P)
              if (ir(se)) {
                for (var Ye = 0; Ye < se.length; Ye++)
                  gn(se[Ye], c);
                Object.freeze && Object.freeze(se);
              } else
                g("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              gn(se, c);
        }
        if (ut.call(E, "key")) {
          var ke = $(c), oe = Object.keys(E).filter(function(Ro) {
            return Ro !== "key";
          }), fr = oe.length > 0 ? "{key: someKey, " + oe.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!bn[ke + fr]) {
            var $o = oe.length > 0 ? "{" + oe.join(": ..., ") + ": ...}" : "{}";
            g(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, fr, ke, $o, ke), bn[ke + fr] = !0;
          }
        }
        return c === n ? xo(K) : So(K), K;
      }
    }
    function Oo(c, E, x) {
      return wn(c, E, x, !0);
    }
    function Po(c, E, x) {
      return wn(c, E, x, !1);
    }
    var Ao = Po, To = Oo;
    dt.Fragment = n, dt.jsx = Ao, dt.jsxs = To;
  }()), dt;
}
process.env.NODE_ENV === "production" ? $r.exports = Ho() : $r.exports = Vo();
var R = $r.exports;
function qo(t, e) {
  return Array.isArray(t) ? t.filter((r) => !e.includes(r)) : Object.keys(t).reduce((r, n) => (e.includes(n) || (r[n] = t[n]), r), {});
}
function aa(t, e) {
  return Array.isArray(t) ? t.filter((r) => e.includes(r)) : e.reduce((r, n) => (n in t && (r[n] = t[n]), r), {});
}
function Go(t) {
  return Array.isArray(t) ? t.filter((e) => e !== null) : Object.keys(t).reduce((e, r) => (r in t && t[r] !== null && (e[r] = t[r]), e), {});
}
function Yo(t, e = 3, r = 10) {
  return new Promise((n, a) => {
    const o = t();
    if (o) {
      n(o);
      return;
    }
    let l = e * 1e3 / r;
    const u = setInterval(() => {
      const i = t();
      i && (clearInterval(u), n(i)), --l <= 0 && (clearInterval(u), a(new Error("Condition not met in time")));
    }, r);
  });
}
var zo = function(e) {
  return Ko(e) && !Xo(e);
};
function Ko(t) {
  return !!t && typeof t == "object";
}
function Xo(t) {
  var e = Object.prototype.toString.call(t);
  return e === "[object RegExp]" || e === "[object Date]" || Zo(t);
}
var Jo = typeof Symbol == "function" && Symbol.for, Qo = Jo ? Symbol.for("react.element") : 60103;
function Zo(t) {
  return t.$$typeof === Qo;
}
function ei(t) {
  return Array.isArray(t) ? [] : {};
}
function Ot(t, e) {
  return e.clone !== !1 && e.isMergeableObject(t) ? Ze(ei(t), t, e) : t;
}
function ti(t, e, r) {
  return t.concat(e).map(function(n) {
    return Ot(n, r);
  });
}
function ri(t, e) {
  if (!e.customMerge)
    return Ze;
  var r = e.customMerge(t);
  return typeof r == "function" ? r : Ze;
}
function ni(t) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(t).filter(function(e) {
    return Object.propertyIsEnumerable.call(t, e);
  }) : [];
}
function xn(t) {
  return Object.keys(t).concat(ni(t));
}
function oa(t, e) {
  try {
    return e in t;
  } catch {
    return !1;
  }
}
function ai(t, e) {
  return oa(t, e) && !(Object.hasOwnProperty.call(t, e) && Object.propertyIsEnumerable.call(t, e));
}
function oi(t, e, r) {
  var n = {};
  return r.isMergeableObject(t) && xn(t).forEach(function(a) {
    n[a] = Ot(t[a], r);
  }), xn(e).forEach(function(a) {
    ai(t, a) || (oa(t, a) && r.isMergeableObject(e[a]) ? n[a] = ri(a, r)(t[a], e[a], r) : n[a] = Ot(e[a], r));
  }), n;
}
function Ze(t, e, r) {
  r = r || {}, r.arrayMerge = r.arrayMerge || ti, r.isMergeableObject = r.isMergeableObject || zo, r.cloneUnlessOtherwiseSpecified = Ot;
  var n = Array.isArray(e), a = Array.isArray(t), o = n === a;
  return o ? n ? r.arrayMerge(t, e, r) : oi(t, e, r) : Ot(e, r);
}
Ze.all = function(e, r) {
  if (!Array.isArray(e))
    throw new Error("first argument should be an array");
  return e.reduce(function(n, a) {
    return Ze(n, a, r);
  }, {});
};
var ii = Ze, li = ii;
const ui = /* @__PURE__ */ Uo(li);
var si = Error, ci = EvalError, fi = RangeError, di = ReferenceError, ia = SyntaxError, At = TypeError, pi = URIError, yi = function() {
  if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
    return !1;
  if (typeof Symbol.iterator == "symbol")
    return !0;
  var e = {}, r = Symbol("test"), n = Object(r);
  if (typeof r == "string" || Object.prototype.toString.call(r) !== "[object Symbol]" || Object.prototype.toString.call(n) !== "[object Symbol]")
    return !1;
  var a = 42;
  e[r] = a;
  for (r in e)
    return !1;
  if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0)
    return !1;
  var o = Object.getOwnPropertySymbols(e);
  if (o.length !== 1 || o[0] !== r || !Object.prototype.propertyIsEnumerable.call(e, r))
    return !1;
  if (typeof Object.getOwnPropertyDescriptor == "function") {
    var l = Object.getOwnPropertyDescriptor(e, r);
    if (l.value !== a || l.enumerable !== !0)
      return !1;
  }
  return !0;
}, On = typeof Symbol < "u" && Symbol, vi = yi, mi = function() {
  return typeof On != "function" || typeof Symbol != "function" || typeof On("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : vi();
}, dr = {
  __proto__: null,
  foo: {}
}, hi = Object, gi = function() {
  return { __proto__: dr }.foo === dr.foo && !(dr instanceof hi);
}, bi = "Function.prototype.bind called on incompatible ", wi = Object.prototype.toString, Ei = Math.max, Si = "[object Function]", Pn = function(e, r) {
  for (var n = [], a = 0; a < e.length; a += 1)
    n[a] = e[a];
  for (var o = 0; o < r.length; o += 1)
    n[o + e.length] = r[o];
  return n;
}, xi = function(e, r) {
  for (var n = [], a = r, o = 0; a < e.length; a += 1, o += 1)
    n[o] = e[a];
  return n;
}, Oi = function(t, e) {
  for (var r = "", n = 0; n < t.length; n += 1)
    r += t[n], n + 1 < t.length && (r += e);
  return r;
}, Pi = function(e) {
  var r = this;
  if (typeof r != "function" || wi.apply(r) !== Si)
    throw new TypeError(bi + r);
  for (var n = xi(arguments, 1), a, o = function() {
    if (this instanceof a) {
      var s = r.apply(
        this,
        Pn(n, arguments)
      );
      return Object(s) === s ? s : this;
    }
    return r.apply(
      e,
      Pn(n, arguments)
    );
  }, l = Ei(0, r.length - n.length), u = [], i = 0; i < l; i++)
    u[i] = "$" + i;
  if (a = Function("binder", "return function (" + Oi(u, ",") + "){ return binder.apply(this,arguments); }")(o), r.prototype) {
    var f = function() {
    };
    f.prototype = r.prototype, a.prototype = new f(), f.prototype = null;
  }
  return a;
}, Ai = Pi, Gr = Function.prototype.bind || Ai, Ti = Function.prototype.call, $i = Object.prototype.hasOwnProperty, Ri = Gr, Fi = Ri.call(Ti, $i), I, Ii = si, Ci = ci, Mi = fi, _i = di, et = ia, Qe = At, Di = pi, la = Function, pr = function(t) {
  try {
    return la('"use strict"; return (' + t + ").constructor;")();
  } catch {
  }
}, Be = Object.getOwnPropertyDescriptor;
if (Be)
  try {
    Be({}, "");
  } catch {
    Be = null;
  }
var yr = function() {
  throw new Qe();
}, Ni = Be ? function() {
  try {
    return arguments.callee, yr;
  } catch {
    try {
      return Be(arguments, "callee").get;
    } catch {
      return yr;
    }
  }
}() : yr, Ke = mi(), ki = gi(), Z = Object.getPrototypeOf || (ki ? function(t) {
  return t.__proto__;
} : null), Je = {}, ji = typeof Uint8Array > "u" || !Z ? I : Z(Uint8Array), He = {
  __proto__: null,
  "%AggregateError%": typeof AggregateError > "u" ? I : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? I : ArrayBuffer,
  "%ArrayIteratorPrototype%": Ke && Z ? Z([][Symbol.iterator]()) : I,
  "%AsyncFromSyncIteratorPrototype%": I,
  "%AsyncFunction%": Je,
  "%AsyncGenerator%": Je,
  "%AsyncGeneratorFunction%": Je,
  "%AsyncIteratorPrototype%": Je,
  "%Atomics%": typeof Atomics > "u" ? I : Atomics,
  "%BigInt%": typeof BigInt > "u" ? I : BigInt,
  "%BigInt64Array%": typeof BigInt64Array > "u" ? I : BigInt64Array,
  "%BigUint64Array%": typeof BigUint64Array > "u" ? I : BigUint64Array,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView > "u" ? I : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": Ii,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": Ci,
  "%Float32Array%": typeof Float32Array > "u" ? I : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? I : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? I : FinalizationRegistry,
  "%Function%": la,
  "%GeneratorFunction%": Je,
  "%Int8Array%": typeof Int8Array > "u" ? I : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? I : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? I : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": Ke && Z ? Z(Z([][Symbol.iterator]())) : I,
  "%JSON%": typeof JSON == "object" ? JSON : I,
  "%Map%": typeof Map > "u" ? I : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !Ke || !Z ? I : Z((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": Object,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise > "u" ? I : Promise,
  "%Proxy%": typeof Proxy > "u" ? I : Proxy,
  "%RangeError%": Mi,
  "%ReferenceError%": _i,
  "%Reflect%": typeof Reflect > "u" ? I : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? I : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !Ke || !Z ? I : Z((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? I : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": Ke && Z ? Z(""[Symbol.iterator]()) : I,
  "%Symbol%": Ke ? Symbol : I,
  "%SyntaxError%": et,
  "%ThrowTypeError%": Ni,
  "%TypedArray%": ji,
  "%TypeError%": Qe,
  "%Uint8Array%": typeof Uint8Array > "u" ? I : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? I : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? I : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? I : Uint32Array,
  "%URIError%": Di,
  "%WeakMap%": typeof WeakMap > "u" ? I : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? I : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? I : WeakSet
};
if (Z)
  try {
    null.error;
  } catch (t) {
    var Li = Z(Z(t));
    He["%Error.prototype%"] = Li;
  }
var Wi = function t(e) {
  var r;
  if (e === "%AsyncFunction%")
    r = pr("async function () {}");
  else if (e === "%GeneratorFunction%")
    r = pr("function* () {}");
  else if (e === "%AsyncGeneratorFunction%")
    r = pr("async function* () {}");
  else if (e === "%AsyncGenerator%") {
    var n = t("%AsyncGeneratorFunction%");
    n && (r = n.prototype);
  } else if (e === "%AsyncIteratorPrototype%") {
    var a = t("%AsyncGenerator%");
    a && Z && (r = Z(a.prototype));
  }
  return He[e] = r, r;
}, An = {
  __proto__: null,
  "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
  "%ArrayPrototype%": ["Array", "prototype"],
  "%ArrayProto_entries%": ["Array", "prototype", "entries"],
  "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
  "%ArrayProto_keys%": ["Array", "prototype", "keys"],
  "%ArrayProto_values%": ["Array", "prototype", "values"],
  "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
  "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
  "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
  "%BooleanPrototype%": ["Boolean", "prototype"],
  "%DataViewPrototype%": ["DataView", "prototype"],
  "%DatePrototype%": ["Date", "prototype"],
  "%ErrorPrototype%": ["Error", "prototype"],
  "%EvalErrorPrototype%": ["EvalError", "prototype"],
  "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
  "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
  "%FunctionPrototype%": ["Function", "prototype"],
  "%Generator%": ["GeneratorFunction", "prototype"],
  "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
  "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
  "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
  "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
  "%JSONParse%": ["JSON", "parse"],
  "%JSONStringify%": ["JSON", "stringify"],
  "%MapPrototype%": ["Map", "prototype"],
  "%NumberPrototype%": ["Number", "prototype"],
  "%ObjectPrototype%": ["Object", "prototype"],
  "%ObjProto_toString%": ["Object", "prototype", "toString"],
  "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
  "%PromisePrototype%": ["Promise", "prototype"],
  "%PromiseProto_then%": ["Promise", "prototype", "then"],
  "%Promise_all%": ["Promise", "all"],
  "%Promise_reject%": ["Promise", "reject"],
  "%Promise_resolve%": ["Promise", "resolve"],
  "%RangeErrorPrototype%": ["RangeError", "prototype"],
  "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
  "%RegExpPrototype%": ["RegExp", "prototype"],
  "%SetPrototype%": ["Set", "prototype"],
  "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
  "%StringPrototype%": ["String", "prototype"],
  "%SymbolPrototype%": ["Symbol", "prototype"],
  "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
  "%TypedArrayPrototype%": ["TypedArray", "prototype"],
  "%TypeErrorPrototype%": ["TypeError", "prototype"],
  "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
  "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
  "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
  "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
  "%URIErrorPrototype%": ["URIError", "prototype"],
  "%WeakMapPrototype%": ["WeakMap", "prototype"],
  "%WeakSetPrototype%": ["WeakSet", "prototype"]
}, Tt = Gr, Wt = Fi, Ui = Tt.call(Function.call, Array.prototype.concat), Bi = Tt.call(Function.apply, Array.prototype.splice), Tn = Tt.call(Function.call, String.prototype.replace), Ut = Tt.call(Function.call, String.prototype.slice), Hi = Tt.call(Function.call, RegExp.prototype.exec), Vi = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, qi = /\\(\\)?/g, Gi = function(e) {
  var r = Ut(e, 0, 1), n = Ut(e, -1);
  if (r === "%" && n !== "%")
    throw new et("invalid intrinsic syntax, expected closing `%`");
  if (n === "%" && r !== "%")
    throw new et("invalid intrinsic syntax, expected opening `%`");
  var a = [];
  return Tn(e, Vi, function(o, l, u, i) {
    a[a.length] = u ? Tn(i, qi, "$1") : l || o;
  }), a;
}, Yi = function(e, r) {
  var n = e, a;
  if (Wt(An, n) && (a = An[n], n = "%" + a[0] + "%"), Wt(He, n)) {
    var o = He[n];
    if (o === Je && (o = Wi(n)), typeof o > "u" && !r)
      throw new Qe("intrinsic " + e + " exists, but is not available. Please file an issue!");
    return {
      alias: a,
      name: n,
      value: o
    };
  }
  throw new et("intrinsic " + e + " does not exist!");
}, nt = function(e, r) {
  if (typeof e != "string" || e.length === 0)
    throw new Qe("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof r != "boolean")
    throw new Qe('"allowMissing" argument must be a boolean');
  if (Hi(/^%?[^%]*%?$/, e) === null)
    throw new et("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var n = Gi(e), a = n.length > 0 ? n[0] : "", o = Yi("%" + a + "%", r), l = o.name, u = o.value, i = !1, f = o.alias;
  f && (a = f[0], Bi(n, Ui([0, 1], f)));
  for (var s = 1, h = !0; s < n.length; s += 1) {
    var v = n[s], w = Ut(v, 0, 1), d = Ut(v, -1);
    if ((w === '"' || w === "'" || w === "`" || d === '"' || d === "'" || d === "`") && w !== d)
      throw new et("property names with quotes must have matching quotes");
    if ((v === "constructor" || !h) && (i = !0), a += "." + v, l = "%" + a + "%", Wt(He, l))
      u = He[l];
    else if (u != null) {
      if (!(v in u)) {
        if (!r)
          throw new Qe("base intrinsic for " + e + " exists, but the property is not available.");
        return;
      }
      if (Be && s + 1 >= n.length) {
        var y = Be(u, v);
        h = !!y, h && "get" in y && !("originalValue" in y.get) ? u = y.get : u = u[v];
      } else
        h = Wt(u, v), u = u[v];
      h && !i && (He[l] = u);
    }
  }
  return u;
}, ua = { exports: {} }, vr, $n;
function Yr() {
  if ($n) return vr;
  $n = 1;
  var t = nt, e = t("%Object.defineProperty%", !0) || !1;
  if (e)
    try {
      e({}, "a", { value: 1 });
    } catch {
      e = !1;
    }
  return vr = e, vr;
}
var zi = nt, kt = zi("%Object.getOwnPropertyDescriptor%", !0);
if (kt)
  try {
    kt([], "length");
  } catch {
    kt = null;
  }
var sa = kt, Rn = Yr(), Ki = ia, Xe = At, Fn = sa, Xi = function(e, r, n) {
  if (!e || typeof e != "object" && typeof e != "function")
    throw new Xe("`obj` must be an object or a function`");
  if (typeof r != "string" && typeof r != "symbol")
    throw new Xe("`property` must be a string or a symbol`");
  if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
    throw new Xe("`nonEnumerable`, if provided, must be a boolean or null");
  if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
    throw new Xe("`nonWritable`, if provided, must be a boolean or null");
  if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
    throw new Xe("`nonConfigurable`, if provided, must be a boolean or null");
  if (arguments.length > 6 && typeof arguments[6] != "boolean")
    throw new Xe("`loose`, if provided, must be a boolean");
  var a = arguments.length > 3 ? arguments[3] : null, o = arguments.length > 4 ? arguments[4] : null, l = arguments.length > 5 ? arguments[5] : null, u = arguments.length > 6 ? arguments[6] : !1, i = !!Fn && Fn(e, r);
  if (Rn)
    Rn(e, r, {
      configurable: l === null && i ? i.configurable : !l,
      enumerable: a === null && i ? i.enumerable : !a,
      value: n,
      writable: o === null && i ? i.writable : !o
    });
  else if (u || !a && !o && !l)
    e[r] = n;
  else
    throw new Ki("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
}, Rr = Yr(), ca = function() {
  return !!Rr;
};
ca.hasArrayLengthDefineBug = function() {
  if (!Rr)
    return null;
  try {
    return Rr([], "length", { value: 1 }).length !== 1;
  } catch {
    return !0;
  }
};
var Ji = ca, Qi = nt, In = Xi, Zi = Ji(), Cn = sa, Mn = At, el = Qi("%Math.floor%"), tl = function(e, r) {
  if (typeof e != "function")
    throw new Mn("`fn` is not a function");
  if (typeof r != "number" || r < 0 || r > 4294967295 || el(r) !== r)
    throw new Mn("`length` must be a positive 32-bit integer");
  var n = arguments.length > 2 && !!arguments[2], a = !0, o = !0;
  if ("length" in e && Cn) {
    var l = Cn(e, "length");
    l && !l.configurable && (a = !1), l && !l.writable && (o = !1);
  }
  return (a || o || !n) && (Zi ? In(
    /** @type {Parameters<define>[0]} */
    e,
    "length",
    r,
    !0,
    !0
  ) : In(
    /** @type {Parameters<define>[0]} */
    e,
    "length",
    r
  )), e;
};
(function(t) {
  var e = Gr, r = nt, n = tl, a = At, o = r("%Function.prototype.apply%"), l = r("%Function.prototype.call%"), u = r("%Reflect.apply%", !0) || e.call(l, o), i = Yr(), f = r("%Math.max%");
  t.exports = function(v) {
    if (typeof v != "function")
      throw new a("a function is required");
    var w = u(e, l, arguments);
    return n(
      w,
      1 + f(0, v.length - (arguments.length - 1)),
      !0
    );
  };
  var s = function() {
    return u(e, o, arguments);
  };
  i ? i(t.exports, "apply", { value: s }) : t.exports.apply = s;
})(ua);
var rl = ua.exports, fa = nt, da = rl, nl = da(fa("String.prototype.indexOf")), al = function(e, r) {
  var n = fa(e, !!r);
  return typeof n == "function" && nl(e, ".prototype.") > -1 ? da(n) : n;
};
const ol = {}, il = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ol
}, Symbol.toStringTag, { value: "Module" })), ll = /* @__PURE__ */ Bo(il);
var zr = typeof Map == "function" && Map.prototype, mr = Object.getOwnPropertyDescriptor && zr ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, Bt = zr && mr && typeof mr.get == "function" ? mr.get : null, _n = zr && Map.prototype.forEach, Kr = typeof Set == "function" && Set.prototype, hr = Object.getOwnPropertyDescriptor && Kr ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, Ht = Kr && hr && typeof hr.get == "function" ? hr.get : null, Dn = Kr && Set.prototype.forEach, ul = typeof WeakMap == "function" && WeakMap.prototype, gt = ul ? WeakMap.prototype.has : null, sl = typeof WeakSet == "function" && WeakSet.prototype, bt = sl ? WeakSet.prototype.has : null, cl = typeof WeakRef == "function" && WeakRef.prototype, Nn = cl ? WeakRef.prototype.deref : null, fl = Boolean.prototype.valueOf, dl = Object.prototype.toString, pl = Function.prototype.toString, yl = String.prototype.match, Xr = String.prototype.slice, Re = String.prototype.replace, vl = String.prototype.toUpperCase, kn = String.prototype.toLowerCase, pa = RegExp.prototype.test, jn = Array.prototype.concat, Ee = Array.prototype.join, ml = Array.prototype.slice, Ln = Math.floor, Fr = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, gr = Object.getOwnPropertySymbols, Ir = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, tt = typeof Symbol == "function" && typeof Symbol.iterator == "object", re = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === tt || !0) ? Symbol.toStringTag : null, ya = Object.prototype.propertyIsEnumerable, Wn = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(t) {
  return t.__proto__;
} : null);
function Un(t, e) {
  if (t === 1 / 0 || t === -1 / 0 || t !== t || t && t > -1e3 && t < 1e3 || pa.call(/e/, e))
    return e;
  var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof t == "number") {
    var n = t < 0 ? -Ln(-t) : Ln(t);
    if (n !== t) {
      var a = String(n), o = Xr.call(e, a.length + 1);
      return Re.call(a, r, "$&_") + "." + Re.call(Re.call(o, /([0-9]{3})/g, "$&_"), /_$/, "");
    }
  }
  return Re.call(e, r, "$&_");
}
var Cr = ll, Bn = Cr.custom, Hn = ma(Bn) ? Bn : null, hl = function t(e, r, n, a) {
  var o = r || {};
  if (Te(o, "quoteStyle") && o.quoteStyle !== "single" && o.quoteStyle !== "double")
    throw new TypeError('option "quoteStyle" must be "single" or "double"');
  if (Te(o, "maxStringLength") && (typeof o.maxStringLength == "number" ? o.maxStringLength < 0 && o.maxStringLength !== 1 / 0 : o.maxStringLength !== null))
    throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
  var l = Te(o, "customInspect") ? o.customInspect : !0;
  if (typeof l != "boolean" && l !== "symbol")
    throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
  if (Te(o, "indent") && o.indent !== null && o.indent !== "	" && !(parseInt(o.indent, 10) === o.indent && o.indent > 0))
    throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
  if (Te(o, "numericSeparator") && typeof o.numericSeparator != "boolean")
    throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
  var u = o.numericSeparator;
  if (typeof e > "u")
    return "undefined";
  if (e === null)
    return "null";
  if (typeof e == "boolean")
    return e ? "true" : "false";
  if (typeof e == "string")
    return ga(e, o);
  if (typeof e == "number") {
    if (e === 0)
      return 1 / 0 / e > 0 ? "0" : "-0";
    var i = String(e);
    return u ? Un(e, i) : i;
  }
  if (typeof e == "bigint") {
    var f = String(e) + "n";
    return u ? Un(e, f) : f;
  }
  var s = typeof o.depth > "u" ? 5 : o.depth;
  if (typeof n > "u" && (n = 0), n >= s && s > 0 && typeof e == "object")
    return Mr(e) ? "[Array]" : "[Object]";
  var h = Dl(o, n);
  if (typeof a > "u")
    a = [];
  else if (ha(a, e) >= 0)
    return "[Circular]";
  function v($, T, D) {
    if (T && (a = ml.call(a), a.push(T)), D) {
      var ue = {
        depth: o.depth
      };
      return Te(o, "quoteStyle") && (ue.quoteStyle = o.quoteStyle), t($, ue, n + 1, a);
    }
    return t($, o, n + 1, a);
  }
  if (typeof e == "function" && !Vn(e)) {
    var w = Al(e), d = Mt(e, v);
    return "[Function" + (w ? ": " + w : " (anonymous)") + "]" + (d.length > 0 ? " { " + Ee.call(d, ", ") + " }" : "");
  }
  if (ma(e)) {
    var y = tt ? Re.call(String(e), /^(Symbol\(.*\))_[^)]*$/, "$1") : Ir.call(e);
    return typeof e == "object" && !tt ? pt(y) : y;
  }
  if (Cl(e)) {
    for (var p = "<" + kn.call(String(e.nodeName)), m = e.attributes || [], g = 0; g < m.length; g++)
      p += " " + m[g].name + "=" + va(gl(m[g].value), "double", o);
    return p += ">", e.childNodes && e.childNodes.length && (p += "..."), p += "</" + kn.call(String(e.nodeName)) + ">", p;
  }
  if (Mr(e)) {
    if (e.length === 0)
      return "[]";
    var b = Mt(e, v);
    return h && !_l(b) ? "[" + _r(b, h) + "]" : "[ " + Ee.call(b, ", ") + " ]";
  }
  if (wl(e)) {
    var S = Mt(e, v);
    return !("cause" in Error.prototype) && "cause" in e && !ya.call(e, "cause") ? "{ [" + String(e) + "] " + Ee.call(jn.call("[cause]: " + v(e.cause), S), ", ") + " }" : S.length === 0 ? "[" + String(e) + "]" : "{ [" + String(e) + "] " + Ee.call(S, ", ") + " }";
  }
  if (typeof e == "object" && l) {
    if (Hn && typeof e[Hn] == "function" && Cr)
      return Cr(e, { depth: s - n });
    if (l !== "symbol" && typeof e.inspect == "function")
      return e.inspect();
  }
  if (Tl(e)) {
    var O = [];
    return _n && _n.call(e, function($, T) {
      O.push(v(T, e, !0) + " => " + v($, e));
    }), qn("Map", Bt.call(e), O, h);
  }
  if (Fl(e)) {
    var _ = [];
    return Dn && Dn.call(e, function($) {
      _.push(v($, e));
    }), qn("Set", Ht.call(e), _, h);
  }
  if ($l(e))
    return br("WeakMap");
  if (Il(e))
    return br("WeakSet");
  if (Rl(e))
    return br("WeakRef");
  if (Sl(e))
    return pt(v(Number(e)));
  if (Ol(e))
    return pt(v(Fr.call(e)));
  if (xl(e))
    return pt(fl.call(e));
  if (El(e))
    return pt(v(String(e)));
  if (typeof window < "u" && e === window)
    return "{ [object Window] }";
  if (typeof globalThis < "u" && e === globalThis || typeof Tr < "u" && e === Tr)
    return "{ [object globalThis] }";
  if (!bl(e) && !Vn(e)) {
    var M = Mt(e, v), W = Wn ? Wn(e) === Object.prototype : e instanceof Object || e.constructor === Object, H = e instanceof Object ? "" : "null prototype", j = !W && re && Object(e) === e && re in e ? Xr.call(Ce(e), 8, -1) : H ? "Object" : "", z = W || typeof e.constructor != "function" ? "" : e.constructor.name ? e.constructor.name + " " : "", V = z + (j || H ? "[" + Ee.call(jn.call([], j || [], H || []), ": ") + "] " : "");
    return M.length === 0 ? V + "{}" : h ? V + "{" + _r(M, h) + "}" : V + "{ " + Ee.call(M, ", ") + " }";
  }
  return String(e);
};
function va(t, e, r) {
  var n = (r.quoteStyle || e) === "double" ? '"' : "'";
  return n + t + n;
}
function gl(t) {
  return Re.call(String(t), /"/g, "&quot;");
}
function Mr(t) {
  return Ce(t) === "[object Array]" && (!re || !(typeof t == "object" && re in t));
}
function bl(t) {
  return Ce(t) === "[object Date]" && (!re || !(typeof t == "object" && re in t));
}
function Vn(t) {
  return Ce(t) === "[object RegExp]" && (!re || !(typeof t == "object" && re in t));
}
function wl(t) {
  return Ce(t) === "[object Error]" && (!re || !(typeof t == "object" && re in t));
}
function El(t) {
  return Ce(t) === "[object String]" && (!re || !(typeof t == "object" && re in t));
}
function Sl(t) {
  return Ce(t) === "[object Number]" && (!re || !(typeof t == "object" && re in t));
}
function xl(t) {
  return Ce(t) === "[object Boolean]" && (!re || !(typeof t == "object" && re in t));
}
function ma(t) {
  if (tt)
    return t && typeof t == "object" && t instanceof Symbol;
  if (typeof t == "symbol")
    return !0;
  if (!t || typeof t != "object" || !Ir)
    return !1;
  try {
    return Ir.call(t), !0;
  } catch {
  }
  return !1;
}
function Ol(t) {
  if (!t || typeof t != "object" || !Fr)
    return !1;
  try {
    return Fr.call(t), !0;
  } catch {
  }
  return !1;
}
var Pl = Object.prototype.hasOwnProperty || function(t) {
  return t in this;
};
function Te(t, e) {
  return Pl.call(t, e);
}
function Ce(t) {
  return dl.call(t);
}
function Al(t) {
  if (t.name)
    return t.name;
  var e = yl.call(pl.call(t), /^function\s*([\w$]+)/);
  return e ? e[1] : null;
}
function ha(t, e) {
  if (t.indexOf)
    return t.indexOf(e);
  for (var r = 0, n = t.length; r < n; r++)
    if (t[r] === e)
      return r;
  return -1;
}
function Tl(t) {
  if (!Bt || !t || typeof t != "object")
    return !1;
  try {
    Bt.call(t);
    try {
      Ht.call(t);
    } catch {
      return !0;
    }
    return t instanceof Map;
  } catch {
  }
  return !1;
}
function $l(t) {
  if (!gt || !t || typeof t != "object")
    return !1;
  try {
    gt.call(t, gt);
    try {
      bt.call(t, bt);
    } catch {
      return !0;
    }
    return t instanceof WeakMap;
  } catch {
  }
  return !1;
}
function Rl(t) {
  if (!Nn || !t || typeof t != "object")
    return !1;
  try {
    return Nn.call(t), !0;
  } catch {
  }
  return !1;
}
function Fl(t) {
  if (!Ht || !t || typeof t != "object")
    return !1;
  try {
    Ht.call(t);
    try {
      Bt.call(t);
    } catch {
      return !0;
    }
    return t instanceof Set;
  } catch {
  }
  return !1;
}
function Il(t) {
  if (!bt || !t || typeof t != "object")
    return !1;
  try {
    bt.call(t, bt);
    try {
      gt.call(t, gt);
    } catch {
      return !0;
    }
    return t instanceof WeakSet;
  } catch {
  }
  return !1;
}
function Cl(t) {
  return !t || typeof t != "object" ? !1 : typeof HTMLElement < "u" && t instanceof HTMLElement ? !0 : typeof t.nodeName == "string" && typeof t.getAttribute == "function";
}
function ga(t, e) {
  if (t.length > e.maxStringLength) {
    var r = t.length - e.maxStringLength, n = "... " + r + " more character" + (r > 1 ? "s" : "");
    return ga(Xr.call(t, 0, e.maxStringLength), e) + n;
  }
  var a = Re.call(Re.call(t, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, Ml);
  return va(a, "single", e);
}
function Ml(t) {
  var e = t.charCodeAt(0), r = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[e];
  return r ? "\\" + r : "\\x" + (e < 16 ? "0" : "") + vl.call(e.toString(16));
}
function pt(t) {
  return "Object(" + t + ")";
}
function br(t) {
  return t + " { ? }";
}
function qn(t, e, r, n) {
  var a = n ? _r(r, n) : Ee.call(r, ", ");
  return t + " (" + e + ") {" + a + "}";
}
function _l(t) {
  for (var e = 0; e < t.length; e++)
    if (ha(t[e], `
`) >= 0)
      return !1;
  return !0;
}
function Dl(t, e) {
  var r;
  if (t.indent === "	")
    r = "	";
  else if (typeof t.indent == "number" && t.indent > 0)
    r = Ee.call(Array(t.indent + 1), " ");
  else
    return null;
  return {
    base: r,
    prev: Ee.call(Array(e + 1), r)
  };
}
function _r(t, e) {
  if (t.length === 0)
    return "";
  var r = `
` + e.prev + e.base;
  return r + Ee.call(t, "," + r) + `
` + e.prev;
}
function Mt(t, e) {
  var r = Mr(t), n = [];
  if (r) {
    n.length = t.length;
    for (var a = 0; a < t.length; a++)
      n[a] = Te(t, a) ? e(t[a], t) : "";
  }
  var o = typeof gr == "function" ? gr(t) : [], l;
  if (tt) {
    l = {};
    for (var u = 0; u < o.length; u++)
      l["$" + o[u]] = o[u];
  }
  for (var i in t)
    Te(t, i) && (r && String(Number(i)) === i && i < t.length || tt && l["$" + i] instanceof Symbol || (pa.call(/[^\w$]/, i) ? n.push(e(i, t) + ": " + e(t[i], t)) : n.push(i + ": " + e(t[i], t))));
  if (typeof gr == "function")
    for (var f = 0; f < o.length; f++)
      ya.call(t, o[f]) && n.push("[" + e(o[f]) + "]: " + e(t[o[f]], t));
  return n;
}
var ba = nt, at = al, Nl = hl, kl = At, _t = ba("%WeakMap%", !0), Dt = ba("%Map%", !0), jl = at("WeakMap.prototype.get", !0), Ll = at("WeakMap.prototype.set", !0), Wl = at("WeakMap.prototype.has", !0), Ul = at("Map.prototype.get", !0), Bl = at("Map.prototype.set", !0), Hl = at("Map.prototype.has", !0), Jr = function(t, e) {
  for (var r = t, n; (n = r.next) !== null; r = n)
    if (n.key === e)
      return r.next = n.next, n.next = /** @type {NonNullable<typeof list.next>} */
      t.next, t.next = n, n;
}, Vl = function(t, e) {
  var r = Jr(t, e);
  return r && r.value;
}, ql = function(t, e, r) {
  var n = Jr(t, e);
  n ? n.value = r : t.next = /** @type {import('.').ListNode<typeof value>} */
  {
    // eslint-disable-line no-param-reassign, no-extra-parens
    key: e,
    next: t.next,
    value: r
  };
}, Gl = function(t, e) {
  return !!Jr(t, e);
}, Yl = function() {
  var e, r, n, a = {
    assert: function(o) {
      if (!a.has(o))
        throw new kl("Side channel does not contain " + Nl(o));
    },
    get: function(o) {
      if (_t && o && (typeof o == "object" || typeof o == "function")) {
        if (e)
          return jl(e, o);
      } else if (Dt) {
        if (r)
          return Ul(r, o);
      } else if (n)
        return Vl(n, o);
    },
    has: function(o) {
      if (_t && o && (typeof o == "object" || typeof o == "function")) {
        if (e)
          return Wl(e, o);
      } else if (Dt) {
        if (r)
          return Hl(r, o);
      } else if (n)
        return Gl(n, o);
      return !1;
    },
    set: function(o, l) {
      _t && o && (typeof o == "object" || typeof o == "function") ? (e || (e = new _t()), Ll(e, o, l)) : Dt ? (r || (r = new Dt()), Bl(r, o, l)) : (n || (n = { key: {}, next: null }), ql(n, o, l));
    }
  };
  return a;
}, zl = String.prototype.replace, Kl = /%20/g, wr = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
}, Qr = {
  default: wr.RFC3986,
  formatters: {
    RFC1738: function(t) {
      return zl.call(t, Kl, "+");
    },
    RFC3986: function(t) {
      return String(t);
    }
  },
  RFC1738: wr.RFC1738,
  RFC3986: wr.RFC3986
}, Xl = Qr, Er = Object.prototype.hasOwnProperty, Le = Array.isArray, be = function() {
  for (var t = [], e = 0; e < 256; ++e)
    t.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());
  return t;
}(), Jl = function(e) {
  for (; e.length > 1; ) {
    var r = e.pop(), n = r.obj[r.prop];
    if (Le(n)) {
      for (var a = [], o = 0; o < n.length; ++o)
        typeof n[o] < "u" && a.push(n[o]);
      r.obj[r.prop] = a;
    }
  }
}, wa = function(e, r) {
  for (var n = r && r.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, a = 0; a < e.length; ++a)
    typeof e[a] < "u" && (n[a] = e[a]);
  return n;
}, Ql = function t(e, r, n) {
  if (!r)
    return e;
  if (typeof r != "object") {
    if (Le(e))
      e.push(r);
    else if (e && typeof e == "object")
      (n && (n.plainObjects || n.allowPrototypes) || !Er.call(Object.prototype, r)) && (e[r] = !0);
    else
      return [e, r];
    return e;
  }
  if (!e || typeof e != "object")
    return [e].concat(r);
  var a = e;
  return Le(e) && !Le(r) && (a = wa(e, n)), Le(e) && Le(r) ? (r.forEach(function(o, l) {
    if (Er.call(e, l)) {
      var u = e[l];
      u && typeof u == "object" && o && typeof o == "object" ? e[l] = t(u, o, n) : e.push(o);
    } else
      e[l] = o;
  }), e) : Object.keys(r).reduce(function(o, l) {
    var u = r[l];
    return Er.call(o, l) ? o[l] = t(o[l], u, n) : o[l] = u, o;
  }, a);
}, Zl = function(e, r) {
  return Object.keys(r).reduce(function(n, a) {
    return n[a] = r[a], n;
  }, e);
}, eu = function(t, e, r) {
  var n = t.replace(/\+/g, " ");
  if (r === "iso-8859-1")
    return n.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n);
  } catch {
    return n;
  }
}, Sr = 1024, tu = function(e, r, n, a, o) {
  if (e.length === 0)
    return e;
  var l = e;
  if (typeof e == "symbol" ? l = Symbol.prototype.toString.call(e) : typeof e != "string" && (l = String(e)), n === "iso-8859-1")
    return escape(l).replace(/%u[0-9a-f]{4}/gi, function(w) {
      return "%26%23" + parseInt(w.slice(2), 16) + "%3B";
    });
  for (var u = "", i = 0; i < l.length; i += Sr) {
    for (var f = l.length >= Sr ? l.slice(i, i + Sr) : l, s = [], h = 0; h < f.length; ++h) {
      var v = f.charCodeAt(h);
      if (v === 45 || v === 46 || v === 95 || v === 126 || v >= 48 && v <= 57 || v >= 65 && v <= 90 || v >= 97 && v <= 122 || o === Xl.RFC1738 && (v === 40 || v === 41)) {
        s[s.length] = f.charAt(h);
        continue;
      }
      if (v < 128) {
        s[s.length] = be[v];
        continue;
      }
      if (v < 2048) {
        s[s.length] = be[192 | v >> 6] + be[128 | v & 63];
        continue;
      }
      if (v < 55296 || v >= 57344) {
        s[s.length] = be[224 | v >> 12] + be[128 | v >> 6 & 63] + be[128 | v & 63];
        continue;
      }
      h += 1, v = 65536 + ((v & 1023) << 10 | f.charCodeAt(h) & 1023), s[s.length] = be[240 | v >> 18] + be[128 | v >> 12 & 63] + be[128 | v >> 6 & 63] + be[128 | v & 63];
    }
    u += s.join("");
  }
  return u;
}, ru = function(e) {
  for (var r = [{ obj: { o: e }, prop: "o" }], n = [], a = 0; a < r.length; ++a)
    for (var o = r[a], l = o.obj[o.prop], u = Object.keys(l), i = 0; i < u.length; ++i) {
      var f = u[i], s = l[f];
      typeof s == "object" && s !== null && n.indexOf(s) === -1 && (r.push({ obj: l, prop: f }), n.push(s));
    }
  return Jl(r), e;
}, nu = function(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}, au = function(e) {
  return !e || typeof e != "object" ? !1 : !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e));
}, ou = function(e, r) {
  return [].concat(e, r);
}, iu = function(e, r) {
  if (Le(e)) {
    for (var n = [], a = 0; a < e.length; a += 1)
      n.push(r(e[a]));
    return n;
  }
  return r(e);
}, Ea = {
  arrayToObject: wa,
  assign: Zl,
  combine: ou,
  compact: ru,
  decode: eu,
  encode: tu,
  isBuffer: au,
  isRegExp: nu,
  maybeMap: iu,
  merge: Ql
}, Sa = Yl, jt = Ea, wt = Qr, lu = Object.prototype.hasOwnProperty, xa = {
  brackets: function(e) {
    return e + "[]";
  },
  comma: "comma",
  indices: function(e, r) {
    return e + "[" + r + "]";
  },
  repeat: function(e) {
    return e;
  }
}, we = Array.isArray, uu = Array.prototype.push, Oa = function(t, e) {
  uu.apply(t, we(e) ? e : [e]);
}, su = Date.prototype.toISOString, Gn = wt.default, X = {
  addQueryPrefix: !1,
  allowDots: !1,
  allowEmptyArrays: !1,
  arrayFormat: "indices",
  charset: "utf-8",
  charsetSentinel: !1,
  delimiter: "&",
  encode: !0,
  encodeDotInKeys: !1,
  encoder: jt.encode,
  encodeValuesOnly: !1,
  format: Gn,
  formatter: wt.formatters[Gn],
  // deprecated
  indices: !1,
  serializeDate: function(e) {
    return su.call(e);
  },
  skipNulls: !1,
  strictNullHandling: !1
}, cu = function(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean" || typeof e == "symbol" || typeof e == "bigint";
}, xr = {}, fu = function t(e, r, n, a, o, l, u, i, f, s, h, v, w, d, y, p, m, g) {
  for (var b = e, S = g, O = 0, _ = !1; (S = S.get(xr)) !== void 0 && !_; ) {
    var M = S.get(e);
    if (O += 1, typeof M < "u") {
      if (M === O)
        throw new RangeError("Cyclic object value");
      _ = !0;
    }
    typeof S.get(xr) > "u" && (O = 0);
  }
  if (typeof s == "function" ? b = s(r, b) : b instanceof Date ? b = w(b) : n === "comma" && we(b) && (b = jt.maybeMap(b, function(ye) {
    return ye instanceof Date ? w(ye) : ye;
  })), b === null) {
    if (l)
      return f && !p ? f(r, X.encoder, m, "key", d) : r;
    b = "";
  }
  if (cu(b) || jt.isBuffer(b)) {
    if (f) {
      var W = p ? r : f(r, X.encoder, m, "key", d);
      return [y(W) + "=" + y(f(b, X.encoder, m, "value", d))];
    }
    return [y(r) + "=" + y(String(b))];
  }
  var H = [];
  if (typeof b > "u")
    return H;
  var j;
  if (n === "comma" && we(b))
    p && f && (b = jt.maybeMap(b, f)), j = [{ value: b.length > 0 ? b.join(",") || null : void 0 }];
  else if (we(s))
    j = s;
  else {
    var z = Object.keys(b);
    j = h ? z.sort(h) : z;
  }
  var V = i ? r.replace(/\./g, "%2E") : r, $ = a && we(b) && b.length === 1 ? V + "[]" : V;
  if (o && we(b) && b.length === 0)
    return $ + "[]";
  for (var T = 0; T < j.length; ++T) {
    var D = j[T], ue = typeof D == "object" && typeof D.value < "u" ? D.value : b[D];
    if (!(u && ue === null)) {
      var pe = v && i ? D.replace(/\./g, "%2E") : D, ge = we(b) ? typeof n == "function" ? n($, pe) : $ : $ + (v ? "." + pe : "[" + pe + "]");
      g.set(e, O);
      var te = Sa();
      te.set(xr, g), Oa(H, t(
        ue,
        ge,
        n,
        a,
        o,
        l,
        u,
        i,
        n === "comma" && p && we(b) ? null : f,
        s,
        h,
        v,
        w,
        d,
        y,
        p,
        m,
        te
      ));
    }
  }
  return H;
}, du = function(e) {
  if (!e)
    return X;
  if (typeof e.allowEmptyArrays < "u" && typeof e.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof e.encodeDotInKeys < "u" && typeof e.encodeDotInKeys != "boolean")
    throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
  if (e.encoder !== null && typeof e.encoder < "u" && typeof e.encoder != "function")
    throw new TypeError("Encoder has to be a function.");
  var r = e.charset || X.charset;
  if (typeof e.charset < "u" && e.charset !== "utf-8" && e.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var n = wt.default;
  if (typeof e.format < "u") {
    if (!lu.call(wt.formatters, e.format))
      throw new TypeError("Unknown format option provided.");
    n = e.format;
  }
  var a = wt.formatters[n], o = X.filter;
  (typeof e.filter == "function" || we(e.filter)) && (o = e.filter);
  var l;
  if (e.arrayFormat in xa ? l = e.arrayFormat : "indices" in e ? l = e.indices ? "indices" : "repeat" : l = X.arrayFormat, "commaRoundTrip" in e && typeof e.commaRoundTrip != "boolean")
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  var u = typeof e.allowDots > "u" ? e.encodeDotInKeys === !0 ? !0 : X.allowDots : !!e.allowDots;
  return {
    addQueryPrefix: typeof e.addQueryPrefix == "boolean" ? e.addQueryPrefix : X.addQueryPrefix,
    allowDots: u,
    allowEmptyArrays: typeof e.allowEmptyArrays == "boolean" ? !!e.allowEmptyArrays : X.allowEmptyArrays,
    arrayFormat: l,
    charset: r,
    charsetSentinel: typeof e.charsetSentinel == "boolean" ? e.charsetSentinel : X.charsetSentinel,
    commaRoundTrip: e.commaRoundTrip,
    delimiter: typeof e.delimiter > "u" ? X.delimiter : e.delimiter,
    encode: typeof e.encode == "boolean" ? e.encode : X.encode,
    encodeDotInKeys: typeof e.encodeDotInKeys == "boolean" ? e.encodeDotInKeys : X.encodeDotInKeys,
    encoder: typeof e.encoder == "function" ? e.encoder : X.encoder,
    encodeValuesOnly: typeof e.encodeValuesOnly == "boolean" ? e.encodeValuesOnly : X.encodeValuesOnly,
    filter: o,
    format: n,
    formatter: a,
    serializeDate: typeof e.serializeDate == "function" ? e.serializeDate : X.serializeDate,
    skipNulls: typeof e.skipNulls == "boolean" ? e.skipNulls : X.skipNulls,
    sort: typeof e.sort == "function" ? e.sort : null,
    strictNullHandling: typeof e.strictNullHandling == "boolean" ? e.strictNullHandling : X.strictNullHandling
  };
}, pu = function(t, e) {
  var r = t, n = du(e), a, o;
  typeof n.filter == "function" ? (o = n.filter, r = o("", r)) : we(n.filter) && (o = n.filter, a = o);
  var l = [];
  if (typeof r != "object" || r === null)
    return "";
  var u = xa[n.arrayFormat], i = u === "comma" && n.commaRoundTrip;
  a || (a = Object.keys(r)), n.sort && a.sort(n.sort);
  for (var f = Sa(), s = 0; s < a.length; ++s) {
    var h = a[s];
    n.skipNulls && r[h] === null || Oa(l, fu(
      r[h],
      h,
      u,
      i,
      n.allowEmptyArrays,
      n.strictNullHandling,
      n.skipNulls,
      n.encodeDotInKeys,
      n.encode ? n.encoder : null,
      n.filter,
      n.sort,
      n.allowDots,
      n.serializeDate,
      n.format,
      n.formatter,
      n.encodeValuesOnly,
      n.charset,
      f
    ));
  }
  var v = l.join(n.delimiter), w = n.addQueryPrefix === !0 ? "?" : "";
  return n.charsetSentinel && (n.charset === "iso-8859-1" ? w += "utf8=%26%2310003%3B&" : w += "utf8=%E2%9C%93&"), v.length > 0 ? w + v : "";
}, rt = Ea, Dr = Object.prototype.hasOwnProperty, yu = Array.isArray, B = {
  allowDots: !1,
  allowEmptyArrays: !1,
  allowPrototypes: !1,
  allowSparse: !1,
  arrayLimit: 20,
  charset: "utf-8",
  charsetSentinel: !1,
  comma: !1,
  decodeDotInKeys: !1,
  decoder: rt.decode,
  delimiter: "&",
  depth: 5,
  duplicates: "combine",
  ignoreQueryPrefix: !1,
  interpretNumericEntities: !1,
  parameterLimit: 1e3,
  parseArrays: !0,
  plainObjects: !1,
  strictDepth: !1,
  strictNullHandling: !1
}, vu = function(t) {
  return t.replace(/&#(\d+);/g, function(e, r) {
    return String.fromCharCode(parseInt(r, 10));
  });
}, Pa = function(t, e) {
  return t && typeof t == "string" && e.comma && t.indexOf(",") > -1 ? t.split(",") : t;
}, mu = "utf8=%26%2310003%3B", hu = "utf8=%E2%9C%93", gu = function(e, r) {
  var n = { __proto__: null }, a = r.ignoreQueryPrefix ? e.replace(/^\?/, "") : e;
  a = a.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  var o = r.parameterLimit === 1 / 0 ? void 0 : r.parameterLimit, l = a.split(r.delimiter, o), u = -1, i, f = r.charset;
  if (r.charsetSentinel)
    for (i = 0; i < l.length; ++i)
      l[i].indexOf("utf8=") === 0 && (l[i] === hu ? f = "utf-8" : l[i] === mu && (f = "iso-8859-1"), u = i, i = l.length);
  for (i = 0; i < l.length; ++i)
    if (i !== u) {
      var s = l[i], h = s.indexOf("]="), v = h === -1 ? s.indexOf("=") : h + 1, w, d;
      v === -1 ? (w = r.decoder(s, B.decoder, f, "key"), d = r.strictNullHandling ? null : "") : (w = r.decoder(s.slice(0, v), B.decoder, f, "key"), d = rt.maybeMap(
        Pa(s.slice(v + 1), r),
        function(p) {
          return r.decoder(p, B.decoder, f, "value");
        }
      )), d && r.interpretNumericEntities && f === "iso-8859-1" && (d = vu(d)), s.indexOf("[]=") > -1 && (d = yu(d) ? [d] : d);
      var y = Dr.call(n, w);
      y && r.duplicates === "combine" ? n[w] = rt.combine(n[w], d) : (!y || r.duplicates === "last") && (n[w] = d);
    }
  return n;
}, bu = function(t, e, r, n) {
  for (var a = n ? e : Pa(e, r), o = t.length - 1; o >= 0; --o) {
    var l, u = t[o];
    if (u === "[]" && r.parseArrays)
      l = r.allowEmptyArrays && (a === "" || r.strictNullHandling && a === null) ? [] : [].concat(a);
    else {
      l = r.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var i = u.charAt(0) === "[" && u.charAt(u.length - 1) === "]" ? u.slice(1, -1) : u, f = r.decodeDotInKeys ? i.replace(/%2E/g, ".") : i, s = parseInt(f, 10);
      !r.parseArrays && f === "" ? l = { 0: a } : !isNaN(s) && u !== f && String(s) === f && s >= 0 && r.parseArrays && s <= r.arrayLimit ? (l = [], l[s] = a) : f !== "__proto__" && (l[f] = a);
    }
    a = l;
  }
  return a;
}, wu = function(e, r, n, a) {
  if (e) {
    var o = n.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e, l = /(\[[^[\]]*])/, u = /(\[[^[\]]*])/g, i = n.depth > 0 && l.exec(o), f = i ? o.slice(0, i.index) : o, s = [];
    if (f) {
      if (!n.plainObjects && Dr.call(Object.prototype, f) && !n.allowPrototypes)
        return;
      s.push(f);
    }
    for (var h = 0; n.depth > 0 && (i = u.exec(o)) !== null && h < n.depth; ) {
      if (h += 1, !n.plainObjects && Dr.call(Object.prototype, i[1].slice(1, -1)) && !n.allowPrototypes)
        return;
      s.push(i[1]);
    }
    if (i) {
      if (n.strictDepth === !0)
        throw new RangeError("Input depth exceeded depth option of " + n.depth + " and strictDepth is true");
      s.push("[" + o.slice(i.index) + "]");
    }
    return bu(s, r, n, a);
  }
}, Eu = function(e) {
  if (!e)
    return B;
  if (typeof e.allowEmptyArrays < "u" && typeof e.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof e.decodeDotInKeys < "u" && typeof e.decodeDotInKeys != "boolean")
    throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
  if (e.decoder !== null && typeof e.decoder < "u" && typeof e.decoder != "function")
    throw new TypeError("Decoder has to be a function.");
  if (typeof e.charset < "u" && e.charset !== "utf-8" && e.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var r = typeof e.charset > "u" ? B.charset : e.charset, n = typeof e.duplicates > "u" ? B.duplicates : e.duplicates;
  if (n !== "combine" && n !== "first" && n !== "last")
    throw new TypeError("The duplicates option must be either combine, first, or last");
  var a = typeof e.allowDots > "u" ? e.decodeDotInKeys === !0 ? !0 : B.allowDots : !!e.allowDots;
  return {
    allowDots: a,
    allowEmptyArrays: typeof e.allowEmptyArrays == "boolean" ? !!e.allowEmptyArrays : B.allowEmptyArrays,
    allowPrototypes: typeof e.allowPrototypes == "boolean" ? e.allowPrototypes : B.allowPrototypes,
    allowSparse: typeof e.allowSparse == "boolean" ? e.allowSparse : B.allowSparse,
    arrayLimit: typeof e.arrayLimit == "number" ? e.arrayLimit : B.arrayLimit,
    charset: r,
    charsetSentinel: typeof e.charsetSentinel == "boolean" ? e.charsetSentinel : B.charsetSentinel,
    comma: typeof e.comma == "boolean" ? e.comma : B.comma,
    decodeDotInKeys: typeof e.decodeDotInKeys == "boolean" ? e.decodeDotInKeys : B.decodeDotInKeys,
    decoder: typeof e.decoder == "function" ? e.decoder : B.decoder,
    delimiter: typeof e.delimiter == "string" || rt.isRegExp(e.delimiter) ? e.delimiter : B.delimiter,
    // eslint-disable-next-line no-implicit-coercion, no-extra-parens
    depth: typeof e.depth == "number" || e.depth === !1 ? +e.depth : B.depth,
    duplicates: n,
    ignoreQueryPrefix: e.ignoreQueryPrefix === !0,
    interpretNumericEntities: typeof e.interpretNumericEntities == "boolean" ? e.interpretNumericEntities : B.interpretNumericEntities,
    parameterLimit: typeof e.parameterLimit == "number" ? e.parameterLimit : B.parameterLimit,
    parseArrays: e.parseArrays !== !1,
    plainObjects: typeof e.plainObjects == "boolean" ? e.plainObjects : B.plainObjects,
    strictDepth: typeof e.strictDepth == "boolean" ? !!e.strictDepth : B.strictDepth,
    strictNullHandling: typeof e.strictNullHandling == "boolean" ? e.strictNullHandling : B.strictNullHandling
  };
}, Su = function(t, e) {
  var r = Eu(e);
  if (t === "" || t === null || typeof t > "u")
    return r.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var n = typeof t == "string" ? gu(t, r) : t, a = r.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, o = Object.keys(n), l = 0; l < o.length; ++l) {
    var u = o[l], i = wu(u, n[u], r, typeof t == "string");
    a = rt.merge(a, i, r);
  }
  return r.allowSparse === !0 ? a : rt.compact(a);
}, xu = pu, Ou = Su, Pu = Qr, Yn = {
  formats: Pu,
  parse: Ou,
  stringify: xu
}, Au = { exports: {} };
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */
(function(t, e) {
  (function(r, n) {
    t.exports = n();
  })(Tr, function() {
    var r = {};
    r.version = "0.2.0";
    var n = r.settings = {
      minimum: 0.08,
      easing: "ease",
      positionUsing: "",
      speed: 200,
      trickle: !0,
      trickleRate: 0.02,
      trickleSpeed: 800,
      showSpinner: !0,
      barSelector: '[role="bar"]',
      spinnerSelector: '[role="spinner"]',
      parent: "body",
      template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
    };
    r.configure = function(d) {
      var y, p;
      for (y in d)
        p = d[y], p !== void 0 && d.hasOwnProperty(y) && (n[y] = p);
      return this;
    }, r.status = null, r.set = function(d) {
      var y = r.isStarted();
      d = a(d, n.minimum, 1), r.status = d === 1 ? null : d;
      var p = r.render(!y), m = p.querySelector(n.barSelector), g = n.speed, b = n.easing;
      return p.offsetWidth, u(function(S) {
        n.positionUsing === "" && (n.positionUsing = r.getPositioningCSS()), i(m, l(d, g, b)), d === 1 ? (i(p, {
          transition: "none",
          opacity: 1
        }), p.offsetWidth, setTimeout(function() {
          i(p, {
            transition: "all " + g + "ms linear",
            opacity: 0
          }), setTimeout(function() {
            r.remove(), S();
          }, g);
        }, g)) : setTimeout(S, g);
      }), this;
    }, r.isStarted = function() {
      return typeof r.status == "number";
    }, r.start = function() {
      r.status || r.set(0);
      var d = function() {
        setTimeout(function() {
          r.status && (r.trickle(), d());
        }, n.trickleSpeed);
      };
      return n.trickle && d(), this;
    }, r.done = function(d) {
      return !d && !r.status ? this : r.inc(0.3 + 0.5 * Math.random()).set(1);
    }, r.inc = function(d) {
      var y = r.status;
      return y ? (typeof d != "number" && (d = (1 - y) * a(Math.random() * y, 0.1, 0.95)), y = a(y + d, 0, 0.994), r.set(y)) : r.start();
    }, r.trickle = function() {
      return r.inc(Math.random() * n.trickleRate);
    }, function() {
      var d = 0, y = 0;
      r.promise = function(p) {
        return !p || p.state() === "resolved" ? this : (y === 0 && r.start(), d++, y++, p.always(function() {
          y--, y === 0 ? (d = 0, r.done()) : r.set((d - y) / d);
        }), this);
      };
    }(), r.render = function(d) {
      if (r.isRendered()) return document.getElementById("nprogress");
      s(document.documentElement, "nprogress-busy");
      var y = document.createElement("div");
      y.id = "nprogress", y.innerHTML = n.template;
      var p = y.querySelector(n.barSelector), m = d ? "-100" : o(r.status || 0), g = document.querySelector(n.parent), b;
      return i(p, {
        transition: "all 0 linear",
        transform: "translate3d(" + m + "%,0,0)"
      }), n.showSpinner || (b = y.querySelector(n.spinnerSelector), b && w(b)), g != document.body && s(g, "nprogress-custom-parent"), g.appendChild(y), y;
    }, r.remove = function() {
      h(document.documentElement, "nprogress-busy"), h(document.querySelector(n.parent), "nprogress-custom-parent");
      var d = document.getElementById("nprogress");
      d && w(d);
    }, r.isRendered = function() {
      return !!document.getElementById("nprogress");
    }, r.getPositioningCSS = function() {
      var d = document.body.style, y = "WebkitTransform" in d ? "Webkit" : "MozTransform" in d ? "Moz" : "msTransform" in d ? "ms" : "OTransform" in d ? "O" : "";
      return y + "Perspective" in d ? "translate3d" : y + "Transform" in d ? "translate" : "margin";
    };
    function a(d, y, p) {
      return d < y ? y : d > p ? p : d;
    }
    function o(d) {
      return (-1 + d) * 100;
    }
    function l(d, y, p) {
      var m;
      return n.positionUsing === "translate3d" ? m = { transform: "translate3d(" + o(d) + "%,0,0)" } : n.positionUsing === "translate" ? m = { transform: "translate(" + o(d) + "%,0)" } : m = { "margin-left": o(d) + "%" }, m.transition = "all " + y + "ms " + p, m;
    }
    var u = /* @__PURE__ */ function() {
      var d = [];
      function y() {
        var p = d.shift();
        p && p(y);
      }
      return function(p) {
        d.push(p), d.length == 1 && y();
      };
    }(), i = /* @__PURE__ */ function() {
      var d = ["Webkit", "O", "Moz", "ms"], y = {};
      function p(S) {
        return S.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(O, _) {
          return _.toUpperCase();
        });
      }
      function m(S) {
        var O = document.body.style;
        if (S in O) return S;
        for (var _ = d.length, M = S.charAt(0).toUpperCase() + S.slice(1), W; _--; )
          if (W = d[_] + M, W in O) return W;
        return S;
      }
      function g(S) {
        return S = p(S), y[S] || (y[S] = m(S));
      }
      function b(S, O, _) {
        O = g(O), S.style[O] = _;
      }
      return function(S, O) {
        var _ = arguments, M, W;
        if (_.length == 2)
          for (M in O)
            W = O[M], W !== void 0 && O.hasOwnProperty(M) && b(S, M, W);
        else
          b(S, _[1], _[2]);
      };
    }();
    function f(d, y) {
      var p = typeof d == "string" ? d : v(d);
      return p.indexOf(" " + y + " ") >= 0;
    }
    function s(d, y) {
      var p = v(d), m = p + y;
      f(p, y) || (d.className = m.substring(1));
    }
    function h(d, y) {
      var p = v(d), m;
      f(d, y) && (m = p.replace(" " + y + " ", " "), d.className = m.substring(1, m.length - 1));
    }
    function v(d) {
      return (" " + (d.className || "") + " ").replace(/\s+/gi, " ");
    }
    function w(d) {
      d && d.parentNode && d.parentNode.removeChild(d);
    }
    return r;
  });
})(Au);
function Tu(t, e, r, n = "brackets") {
  let a = /^https?:\/\//.test(e.toString()), o = a || e.toString().startsWith("/"), l = !o && !e.toString().startsWith("#") && !e.toString().startsWith("?"), u = e.toString().includes("?") || t === "get" && Object.keys(r).length, i = e.toString().includes("#"), f = new URL(e.toString(), "http://localhost");
  return t === "get" && Object.keys(r).length && (f.search = Yn.stringify(ui(Yn.parse(f.search, { ignoreQueryPrefix: !0 }), r), { encodeValuesOnly: !0, arrayFormat: n }), r = {}), [[a ? `${f.protocol}//${f.host}` : "", o ? f.pathname : "", l ? f.pathname.substring(1) : "", u ? f.search : "", i ? f.hash : ""].join(""), r];
}
const Kt = fe(null);
Kt.displayName = "ModalStackContext";
let Aa = null, Ta = null, Et = null, Nr = null, kr = [];
const $u = ({ children: t }) => {
  const [e, r] = Q([]), [n, a] = Q({}), o = (y) => {
    r((p) => {
      const m = y([...p]), g = (b) => {
        var S;
        return m.length < 2 ? !0 : ((S = m.map((O) => ({ id: O.id, shouldRender: O.shouldRender })).reverse().find((O) => O.shouldRender)) == null ? void 0 : S.id) === b;
      };
      return m.forEach((b, S) => {
        m[S].onTopOfStack = g(b.id), m[S].getParentModal = () => S < 1 ? null : m.slice(0, S).reverse().find((O) => O.isOpen), m[S].getChildModal = () => S === m.length - 1 ? null : m.slice(S + 1).find((O) => O.isOpen);
      }), m;
    });
  };
  Y(() => {
    kr = e;
  }, [e]);
  class l {
    constructor(p, m, g, b, S) {
      ce(this, "update", (p, m, g) => {
        o(
          (b) => b.map((S) => (S.id === this.id && (S.config = p, S.onCloseCallback = m, S.afterLeaveCallback = g), S))
        );
      });
      ce(this, "show", () => {
        o(
          (p) => p.map((m) => (m.id === this.id && !m.isOpen && (m.isOpen = !0, m.shouldRender = !0), m))
        );
      });
      ce(this, "setOpen", (p) => {
        p ? this.show() : this.close();
      });
      ce(this, "close", () => {
        o(
          (p) => p.map((m) => {
            var g;
            return m.id === this.id && m.isOpen && (Object.keys(m.listeners).forEach((b) => {
              m.off(b);
            }), m.isOpen = !1, (g = m.onCloseCallback) == null || g.call(m)), m;
          })
        );
      });
      ce(this, "afterLeave", () => {
        this.isOpen || o((p) => {
          const m = p.map((g) => {
            var b;
            return g.id === this.id && !g.isOpen && (g.shouldRender = !1, (b = g.afterLeaveCallback) == null || b.call(g), g.afterLeaveCallback = null), g;
          });
          return this.index === 0 ? [] : m;
        });
      });
      ce(this, "on", (p, m) => {
        this.listeners[p] = this.listeners[p] ?? [], this.listeners[p].push(m);
      });
      ce(this, "off", (p, m) => {
        var g;
        m ? this.listeners[p] = ((g = this.listeners[p]) == null ? void 0 : g.filter((b) => b !== m)) ?? [] : delete this.listeners[p];
      });
      ce(this, "emit", (p, ...m) => {
        var g;
        (g = this.listeners[p]) == null || g.forEach((b) => b(...m));
      });
      ce(this, "registerEventListenersFromProps", (p) => {
        const m = [];
        return Object.keys(p).filter((g) => g.startsWith("on")).forEach((g) => {
          const b = g.replace(/^on/, "").replace(/^./, (S) => S.toLowerCase()).replace(/([A-Z])/g, "-$1").toLowerCase();
          this.on(b, p[g]), m.push(() => this.off(b, p[g]));
        }), () => m.forEach((g) => g());
      });
      ce(this, "reload", (p = {}) => {
        var g;
        let m = Object.keys(this.response.props);
        p.only && (m = aa(m, p.only)), p.except && (m = qo(m, p.except)), (g = this.response) != null && g.url && Lt.get(this.response.url, {
          headers: {
            Accept: "text/html, application/xhtml+xml",
            "X-Inertia": !0,
            "X-Inertia-Partial-Component": this.response.component,
            "X-Inertia-Version": this.response.version,
            "X-Inertia-Partial-Data": m.join(","),
            "X-InertiaUI-Modal": !0,
            "X-InertiaUI-Modal-Use-Router": 0,
            "X-InertiaUI-Modal-Base-Url": Et
          }
        }).then((b) => {
          this.updateProps(b.data.props);
        });
      });
      ce(this, "updateProps", (p) => {
        Object.assign(this.props, p), o((m) => m);
      });
      this.id = l.generateId(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = p, this.props = m.props, this.response = m, this.config = g, this.onCloseCallback = b, this.afterLeaveCallback = S, this.index = -1, this.getParentModal = () => null, this.getChildModal = () => null, this.onTopOfStack = !0;
    }
    static generateId() {
      return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `inertiaui_modal_${crypto.randomUUID()}` : `inertiaui_modal_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
    }
  }
  const u = (y, p = {}, m = null, g = null) => Ta(y.component).then((b) => i(b, y, p, m, g)), i = (y, p, m, g, b) => {
    const S = new l(y, p, m, g, b);
    return S.index = e.length, o((O) => [...O, S]), S.show(), S;
  };
  function f(y, p, m, g) {
    if (!n[y])
      throw new Error(`The local modal "${y}" has not been registered.`);
    const b = i(null, {}, p, m, g);
    return b.name = y, n[y].callback(b), b;
  }
  const s = (y, p = {}) => h(
    y,
    p.method ?? "get",
    p.data ?? {},
    p.headers ?? {},
    p.config ?? {},
    p.onClose,
    p.onAfterLeave,
    p.queryStringArrayFormat ?? "brackets",
    p.navigate ?? qr("navigate")
  ), h = (y, p, m = {}, g = {}, b = {}, S = null, O = null, _ = "brackets", M = !1) => new Promise((W, H) => {
    if (y.startsWith("#")) {
      W(f(y.substring(1), b, S, O));
      return;
    }
    const [j, z] = Tu(p, y || "", m, _);
    let V = M && e.length === 0;
    if (e.length === 0 && (Et = typeof window < "u" ? window.location.href : ""), g = {
      ...g,
      Accept: "text/html, application/xhtml+xml",
      "X-Requested-With": "XMLHttpRequest",
      "X-Inertia": !0,
      "X-Inertia-Version": Aa,
      "X-InertiaUI-Modal": !0,
      "X-InertiaUI-Modal-Use-Router": V ? 1 : 0,
      "X-InertiaUI-Modal-Base-Url": Et
    }, V)
      return Nr = null, vt.visit(j, {
        method: p,
        data: z,
        headers: g,
        preserveScroll: !0,
        preserveState: !0,
        onError: H,
        onFinish: () => {
          Yo(() => Nr).then(($) => {
            const T = $.onCloseCallback, D = $.afterLeaveCallback;
            $.update(
              b,
              () => {
                S == null || S(), T == null || T();
              },
              () => {
                O == null || O(), D == null || D();
              }
            ), W($);
          });
        }
      });
    Lt({
      url: j,
      method: p,
      data: z,
      headers: g
    }).then(($) => W(u($.data, b, S, O))).catch(($) => {
      H($);
    });
  }), d = {
    stack: e,
    localModals: n,
    push: i,
    pushFromResponseData: u,
    closeAll: () => {
      kr.reverse().forEach((y) => y.close());
    },
    reset: () => o(() => []),
    visit: h,
    visitModal: s,
    registerLocalModal: (y, p) => {
      a((m) => ({
        ...m,
        [y]: { name: y, callback: p }
      }));
    },
    removeLocalModal: (y) => {
      a((p) => {
        const m = { ...p };
        return delete m[y], m;
      });
    }
  };
  return /* @__PURE__ */ R.jsx(Kt.Provider, { value: d, children: t });
}, Xt = () => {
  const t = ie(Kt);
  if (t === null)
    throw new Error("useModalStack must be used within a ModalStackProvider");
  return t;
}, zn = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], Ac = (t, e) => {
  e.initialPage && (Aa = e.initialPage.version), e.resolveComponent && (Ta = e.resolveComponent);
  const r = ({ Component: n, props: a, key: o }) => {
    const l = () => {
      const u = Ar(n, { key: o, ...a });
      return typeof n.layout == "function" ? n.layout(u) : Array.isArray(n.layout) ? n.layout.concat(u).reverse().reduce((f, s) => Ar(s, a, f)) : u;
    };
    return /* @__PURE__ */ R.jsxs(R.Fragment, { children: [
      l(),
      /* @__PURE__ */ R.jsx(Ru, {})
    ] });
  };
  return /* @__PURE__ */ R.jsx($u, { children: /* @__PURE__ */ R.jsx(t, { ...e, children: r }) });
}, Ru = ({ children: t }) => {
  var u;
  const e = ie(Kt);
  let r = !1, n = !1;
  Y(() => vt.on("start", () => r = !0), []), Y(() => vt.on("finish", () => r = !1), []), Y(
    () => vt.on("navigate", function(i) {
      const f = i.detail.page.props._inertiaui_modal;
      if (!f) {
        n && e.closeAll();
        return;
      }
      n = f, Et = f.baseUrl, e.pushFromResponseData(f, {}, () => {
        if (!f.baseUrl) {
          console.error("No base url in modal response data so cannot navigate back");
          return;
        }
        !r && window.location.href !== f.baseUrl && vt.visit(f.baseUrl, {
          preserveScroll: !0,
          preserveState: !0
        });
      }).then((s) => {
        Nr = s;
      });
    }),
    []
  );
  const a = (i) => (kr.length && (i.headers["X-InertiaUI-Modal-Base-Url"] = Et), i);
  Y(() => (Lt.interceptors.request.use(a), () => Lt.interceptors.request.eject(a)), []);
  const o = jo(), l = k();
  return Y(() => {
    var s, h;
    const i = (s = o.props) == null ? void 0 : s._inertiaui_modal, f = l.current;
    l.current = i, i && f && i.component === f.component && i.url === f.url && ((h = e.stack[0]) == null || h.updateProps(i.props ?? {}));
  }, [(u = o.props) == null ? void 0 : u._inertiaui_modal]), /* @__PURE__ */ R.jsxs(R.Fragment, { children: [
    t,
    e.stack.length > 0 && /* @__PURE__ */ R.jsx(Ra, { index: 0 })
  ] });
}, Zr = A.createContext(null);
Zr.displayName = "ModalIndexContext";
const $a = () => {
  const t = A.useContext(Zr);
  if (t === void 0)
    throw new Error("useModalIndex must be used within a ModalIndexProvider");
  return t;
}, Ra = ({ index: t }) => {
  const { stack: e } = Xt(), r = J(() => e[t], [e, t]);
  return (r == null ? void 0 : r.component) && /* @__PURE__ */ R.jsx(Zr.Provider, { value: t, children: /* @__PURE__ */ R.jsx(
    r.component,
    {
      ...r.props,
      onModalEvent: (...n) => r.emit(...n)
    }
  ) });
}, Fa = Vr(({ name: t, children: e, ...r }, n) => {
  const a = $a(), { stack: o, registerLocalModal: l, removeLocalModal: u } = Xt(), [i, f] = Q(null), s = J(() => t ? i : o[a], [t, i, a, o]), h = J(() => {
    var d;
    return (d = o.find((y) => y.shouldRender && y.index > (s == null ? void 0 : s.index))) == null ? void 0 : d.index;
  }, [a, o]), v = J(() => (s == null ? void 0 : s.config.slideover) ?? r.slideover ?? qr("type") === "slideover", [r.slideover]), w = J(
    () => ({
      slideover: v,
      closeButton: r.closeButton ?? ze(v, "closeButton"),
      closeExplicitly: r.closeExplicitly ?? ze(v, "closeExplicitly"),
      maxWidth: r.maxWidth ?? ze(v, "maxWidth"),
      paddingClasses: r.paddingClasses ?? ze(v, "paddingClasses"),
      panelClasses: r.panelClasses ?? ze(v, "panelClasses"),
      position: r.position ?? ze(v, "position"),
      ...s == null ? void 0 : s.config
    }),
    [r, s == null ? void 0 : s.config]
  );
  return Y(() => {
    if (t) {
      let d = null;
      return l(t, (y) => {
        d = y.registerEventListenersFromProps(r), f(y);
      }), () => {
        d == null || d(), d = null, u(t);
      };
    }
    return s.registerEventListenersFromProps(r);
  }, [t]), na(
    n,
    () => ({
      afterLeave: () => s.afterLeave(),
      close: () => s.close(),
      config: w,
      emit: (...d) => s.emit(...d),
      getChildModal: () => s.getChildModal(),
      getParentModal: () => s.getParentModal(),
      id: s == null ? void 0 : s.id,
      index: s == null ? void 0 : s.index,
      isOpen: s == null ? void 0 : s.isOpen,
      modalContext: s,
      onTopOfStack: s == null ? void 0 : s.onTopOfStack,
      reload: () => s.reload(),
      setOpen: () => s.setOpen(),
      shouldRender: s == null ? void 0 : s.shouldRender
    }),
    [s]
  ), (s == null ? void 0 : s.shouldRender) && /* @__PURE__ */ R.jsxs(R.Fragment, { children: [
    typeof e == "function" ? e({
      afterLeave: s.afterLeave,
      close: s.close,
      config: w,
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
    }) : e,
    h && /* @__PURE__ */ R.jsx(Ra, { index: h })
  ] });
});
Fa.displayName = "HeadlessModal";
function Ia(t) {
  var e, r, n = "";
  if (typeof t == "string" || typeof t == "number") n += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var a = t.length;
    for (e = 0; e < a; e++) t[e] && (r = Ia(t[e])) && (n && (n += " "), n += r);
  } else for (r in t) t[r] && (n && (n += " "), n += r);
  return n;
}
function Vt() {
  for (var t, e, r = 0, n = "", a = arguments.length; r < a; r++) (t = arguments[r]) && (e = Ia(t)) && (n && (n += " "), n += e);
  return n;
}
var Fu = Object.defineProperty, Iu = (t, e, r) => e in t ? Fu(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Or = (t, e, r) => (Iu(t, typeof e != "symbol" ? e + "" : e, r), r);
let Cu = class {
  constructor() {
    Or(this, "current", this.detect()), Or(this, "handoffState", "pending"), Or(this, "currentId", 0);
  }
  set(e) {
    this.current !== e && (this.handoffState = "pending", this.currentId = 0, this.current = e);
  }
  reset() {
    this.set(this.detect());
  }
  nextId() {
    return ++this.currentId;
  }
  get isServer() {
    return this.current === "server";
  }
  get isClient() {
    return this.current === "client";
  }
  detect() {
    return typeof window > "u" || typeof document > "u" ? "server" : "client";
  }
  handoff() {
    this.handoffState === "pending" && (this.handoffState = "complete");
  }
  get isHandoffComplete() {
    return this.handoffState === "complete";
  }
}, Ve = new Cu();
function Jt(t) {
  return Ve.isServer ? null : t instanceof Node ? t.ownerDocument : t != null && t.hasOwnProperty("current") && t.current instanceof Node ? t.current.ownerDocument : document;
}
function Qt(t) {
  typeof queueMicrotask == "function" ? queueMicrotask(t) : Promise.resolve().then(t).catch((e) => setTimeout(() => {
    throw e;
  }));
}
function Me() {
  let t = [], e = { addEventListener(r, n, a, o) {
    return r.addEventListener(n, a, o), e.add(() => r.removeEventListener(n, a, o));
  }, requestAnimationFrame(...r) {
    let n = requestAnimationFrame(...r);
    return e.add(() => cancelAnimationFrame(n));
  }, nextFrame(...r) {
    return e.requestAnimationFrame(() => e.requestAnimationFrame(...r));
  }, setTimeout(...r) {
    let n = setTimeout(...r);
    return e.add(() => clearTimeout(n));
  }, microTask(...r) {
    let n = { current: !0 };
    return Qt(() => {
      n.current && r[0]();
    }), e.add(() => {
      n.current = !1;
    });
  }, style(r, n, a) {
    let o = r.style.getPropertyValue(n);
    return Object.assign(r.style, { [n]: a }), this.add(() => {
      Object.assign(r.style, { [n]: o });
    });
  }, group(r) {
    let n = Me();
    return r(n), this.add(() => n.dispose());
  }, add(r) {
    return t.includes(r) || t.push(r), () => {
      let n = t.indexOf(r);
      if (n >= 0) for (let a of t.splice(n, 1)) a();
    };
  }, dispose() {
    for (let r of t.splice(0)) r();
  } };
  return e;
}
function en() {
  let [t] = Q(Me);
  return Y(() => () => t.dispose(), [t]), t;
}
let ae = (t, e) => {
  Ve.isServer ? Y(t, e) : Co(t, e);
};
function qe(t) {
  let e = k(t);
  return ae(() => {
    e.current = t;
  }, [t]), e;
}
let U = function(t) {
  let e = qe(t);
  return A.useCallback((...r) => e.current(...r), [e]);
}, Mu = fe(void 0);
function _u() {
  return ie(Mu);
}
function jr(...t) {
  return Array.from(new Set(t.flatMap((e) => typeof e == "string" ? e.split(" ") : []))).filter(Boolean).join(" ");
}
function Ie(t, e, ...r) {
  if (t in e) {
    let a = e[t];
    return typeof a == "function" ? a(...r) : a;
  }
  let n = new Error(`Tried to handle "${t}" but there is no handler defined. Only defined handlers are: ${Object.keys(e).map((a) => `"${a}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(n, Ie), n;
}
var qt = ((t) => (t[t.None = 0] = "None", t[t.RenderStrategy = 1] = "RenderStrategy", t[t.Static = 2] = "Static", t))(qt || {}), Fe = ((t) => (t[t.Unmount = 0] = "Unmount", t[t.Hidden = 1] = "Hidden", t))(Fe || {});
function de() {
  let t = Nu();
  return ve((e) => Du({ mergeRefs: t, ...e }), [t]);
}
function Du({ ourProps: t, theirProps: e, slot: r, defaultTag: n, features: a, visible: o = !0, name: l, mergeRefs: u }) {
  u = u ?? ku;
  let i = Ca(e, t);
  if (o) return Nt(i, r, n, l, u);
  let f = a ?? 0;
  if (f & 2) {
    let { static: s = !1, ...h } = i;
    if (s) return Nt(h, r, n, l, u);
  }
  if (f & 1) {
    let { unmount: s = !0, ...h } = i;
    return Ie(s ? 0 : 1, { 0() {
      return null;
    }, 1() {
      return Nt({ ...h, hidden: !0, style: { display: "none" } }, r, n, l, u);
    } });
  }
  return Nt(i, r, n, l, u);
}
function Nt(t, e = {}, r, n, a) {
  let { as: o = r, children: l, refName: u = "ref", ...i } = Pr(t, ["unmount", "static"]), f = t.ref !== void 0 ? { [u]: t.ref } : {}, s = typeof l == "function" ? l(e) : l;
  "className" in i && i.className && typeof i.className == "function" && (i.className = i.className(e)), i["aria-labelledby"] && i["aria-labelledby"] === i.id && (i["aria-labelledby"] = void 0);
  let h = {};
  if (e) {
    let v = !1, w = [];
    for (let [d, y] of Object.entries(e)) typeof y == "boolean" && (v = !0), y === !0 && w.push(d.replace(/([A-Z])/g, (p) => `-${p.toLowerCase()}`));
    if (v) {
      h["data-headlessui-state"] = w.join(" ");
      for (let d of w) h[`data-${d}`] = "";
    }
  }
  if (o === he && (Object.keys(je(i)).length > 0 || Object.keys(je(h)).length > 0)) if (!Mo(s) || Array.isArray(s) && s.length > 1) {
    if (Object.keys(je(i)).length > 0) throw new Error(['Passing props on "Fragment"!', "", `The current component <${n} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(je(i)).concat(Object.keys(je(h))).map((v) => `  - ${v}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((v) => `  - ${v}`).join(`
`)].join(`
`));
  } else {
    let v = s.props, w = v == null ? void 0 : v.className, d = typeof w == "function" ? (...m) => jr(w(...m), i.className) : jr(w, i.className), y = d ? { className: d } : {}, p = Ca(s.props, je(Pr(i, ["ref"])));
    for (let m in h) m in p && delete h[m];
    return _o(s, Object.assign({}, p, h, f, { ref: a(s.ref, f.ref) }, y));
  }
  return Ar(o, Object.assign({}, Pr(i, ["ref"]), o !== he && f, o !== he && h), s);
}
function Nu() {
  let t = k([]), e = ve((r) => {
    for (let n of t.current) n != null && (typeof n == "function" ? n(r) : n.current = r);
  }, []);
  return (...r) => {
    if (!r.every((n) => n == null)) return t.current = r, e;
  };
}
function ku(...t) {
  return t.every((e) => e == null) ? void 0 : (e) => {
    for (let r of t) r != null && (typeof r == "function" ? r(e) : r.current = e);
  };
}
function Ca(...t) {
  if (t.length === 0) return {};
  if (t.length === 1) return t[0];
  let e = {}, r = {};
  for (let n of t) for (let a in n) a.startsWith("on") && typeof n[a] == "function" ? (r[a] != null || (r[a] = []), r[a].push(n[a])) : e[a] = n[a];
  if (e.disabled || e["aria-disabled"]) for (let n in r) /^(on(?:Click|Pointer|Mouse|Key)(?:Down|Up|Press)?)$/.test(n) && (r[n] = [(a) => {
    var o;
    return (o = a == null ? void 0 : a.preventDefault) == null ? void 0 : o.call(a);
  }]);
  for (let n in r) Object.assign(e, { [n](a, ...o) {
    let l = r[n];
    for (let u of l) {
      if ((a instanceof Event || (a == null ? void 0 : a.nativeEvent) instanceof Event) && a.defaultPrevented) return;
      u(a, ...o);
    }
  } });
  return e;
}
function le(t) {
  var e;
  return Object.assign(Vr(t), { displayName: (e = t.displayName) != null ? e : t.name });
}
function je(t) {
  let e = Object.assign({}, t);
  for (let r in e) e[r] === void 0 && delete e[r];
  return e;
}
function Pr(t, e = []) {
  let r = Object.assign({}, t);
  for (let n of e) n in r && delete r[n];
  return r;
}
let ju = "span";
var Gt = ((t) => (t[t.None = 1] = "None", t[t.Focusable = 2] = "Focusable", t[t.Hidden = 4] = "Hidden", t))(Gt || {});
function Lu(t, e) {
  var r;
  let { features: n = 1, ...a } = t, o = { ref: e, "aria-hidden": (n & 2) === 2 ? !0 : (r = a["aria-hidden"]) != null ? r : void 0, hidden: (n & 4) === 4 ? !0 : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(n & 4) === 4 && (n & 2) !== 2 && { display: "none" } } };
  return de()({ ourProps: o, theirProps: a, slot: {}, defaultTag: ju, name: "Hidden" });
}
let Lr = le(Lu), Ma = Symbol();
function Wu(t, e = !0) {
  return Object.assign(t, { [Ma]: e });
}
function Se(...t) {
  let e = k(t);
  Y(() => {
    e.current = t;
  }, [t]);
  let r = U((n) => {
    for (let a of e.current) a != null && (typeof a == "function" ? a(n) : a.current = n);
  });
  return t.every((n) => n == null || (n == null ? void 0 : n[Ma])) ? void 0 : r;
}
let tn = fe(null);
tn.displayName = "DescriptionContext";
function _a() {
  let t = ie(tn);
  if (t === null) {
    let e = new Error("You used a <Description /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(e, _a), e;
  }
  return t;
}
function Uu() {
  let [t, e] = Q([]);
  return [t.length > 0 ? t.join(" ") : void 0, J(() => function(r) {
    let n = U((o) => (e((l) => [...l, o]), () => e((l) => {
      let u = l.slice(), i = u.indexOf(o);
      return i !== -1 && u.splice(i, 1), u;
    }))), a = J(() => ({ register: n, slot: r.slot, name: r.name, props: r.props, value: r.value }), [n, r.slot, r.name, r.props, r.value]);
    return A.createElement(tn.Provider, { value: a }, r.children);
  }, [e])];
}
let Bu = "p";
function Hu(t, e) {
  let r = Pt(), n = _u(), { id: a = `headlessui-description-${r}`, ...o } = t, l = _a(), u = Se(e);
  ae(() => l.register(a), [a, l.register]);
  let i = n || !1, f = J(() => ({ ...l.slot, disabled: i }), [l.slot, i]), s = { ref: u, ...l.props, id: a };
  return de()({ ourProps: s, theirProps: o, slot: f, defaultTag: Bu, name: l.name || "Description" });
}
let Vu = le(Hu), qu = Object.assign(Vu, {});
var Da = ((t) => (t.Space = " ", t.Enter = "Enter", t.Escape = "Escape", t.Backspace = "Backspace", t.Delete = "Delete", t.ArrowLeft = "ArrowLeft", t.ArrowUp = "ArrowUp", t.ArrowRight = "ArrowRight", t.ArrowDown = "ArrowDown", t.Home = "Home", t.End = "End", t.PageUp = "PageUp", t.PageDown = "PageDown", t.Tab = "Tab", t))(Da || {});
let Gu = fe(() => {
});
function Yu({ value: t, children: e }) {
  return A.createElement(Gu.Provider, { value: t }, e);
}
let zu = class extends Map {
  constructor(e) {
    super(), this.factory = e;
  }
  get(e) {
    let r = super.get(e);
    return r === void 0 && (r = this.factory(e), this.set(e, r)), r;
  }
};
function Na(t, e) {
  let r = t(), n = /* @__PURE__ */ new Set();
  return { getSnapshot() {
    return r;
  }, subscribe(a) {
    return n.add(a), () => n.delete(a);
  }, dispatch(a, ...o) {
    let l = e[a].call(r, ...o);
    l && (r = l, n.forEach((u) => u()));
  } };
}
function ka(t) {
  return Do(t.subscribe, t.getSnapshot, t.getSnapshot);
}
let Ku = new zu(() => Na(() => [], { ADD(t) {
  return this.includes(t) ? this : [...this, t];
}, REMOVE(t) {
  let e = this.indexOf(t);
  if (e === -1) return this;
  let r = this.slice();
  return r.splice(e, 1), r;
} }));
function ot(t, e) {
  let r = Ku.get(e), n = Pt(), a = ka(r);
  if (ae(() => {
    if (t) return r.dispatch("ADD", n), () => r.dispatch("REMOVE", n);
  }, [r, t]), !t) return !1;
  let o = a.indexOf(n), l = a.length;
  return o === -1 && (o = l, l += 1), o === l - 1;
}
let Wr = /* @__PURE__ */ new Map(), St = /* @__PURE__ */ new Map();
function Kn(t) {
  var e;
  let r = (e = St.get(t)) != null ? e : 0;
  return St.set(t, r + 1), r !== 0 ? () => Xn(t) : (Wr.set(t, { "aria-hidden": t.getAttribute("aria-hidden"), inert: t.inert }), t.setAttribute("aria-hidden", "true"), t.inert = !0, () => Xn(t));
}
function Xn(t) {
  var e;
  let r = (e = St.get(t)) != null ? e : 1;
  if (r === 1 ? St.delete(t) : St.set(t, r - 1), r !== 1) return;
  let n = Wr.get(t);
  n && (n["aria-hidden"] === null ? t.removeAttribute("aria-hidden") : t.setAttribute("aria-hidden", n["aria-hidden"]), t.inert = n.inert, Wr.delete(t));
}
function Xu(t, { allowed: e, disallowed: r } = {}) {
  let n = ot(t, "inert-others");
  ae(() => {
    var a, o;
    if (!n) return;
    let l = Me();
    for (let i of (a = r == null ? void 0 : r()) != null ? a : []) i && l.add(Kn(i));
    let u = (o = e == null ? void 0 : e()) != null ? o : [];
    for (let i of u) {
      if (!i) continue;
      let f = Jt(i);
      if (!f) continue;
      let s = i.parentElement;
      for (; s && s !== f.body; ) {
        for (let h of s.children) u.some((v) => h.contains(v)) || l.add(Kn(h));
        s = s.parentElement;
      }
    }
    return l.dispose;
  }, [n, e, r]);
}
function Ju(t, e, r) {
  let n = qe((a) => {
    let o = a.getBoundingClientRect();
    o.x === 0 && o.y === 0 && o.width === 0 && o.height === 0 && r();
  });
  Y(() => {
    if (!t) return;
    let a = e === null ? null : e instanceof HTMLElement ? e : e.current;
    if (!a) return;
    let o = Me();
    if (typeof ResizeObserver < "u") {
      let l = new ResizeObserver(() => n.current(a));
      l.observe(a), o.add(() => l.disconnect());
    }
    if (typeof IntersectionObserver < "u") {
      let l = new IntersectionObserver(() => n.current(a));
      l.observe(a), o.add(() => l.disconnect());
    }
    return () => o.dispose();
  }, [e, n, t]);
}
let Yt = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((t) => `${t}:not([tabindex='-1'])`).join(","), Qu = ["[data-autofocus]"].map((t) => `${t}:not([tabindex='-1'])`).join(",");
var Pe = ((t) => (t[t.First = 1] = "First", t[t.Previous = 2] = "Previous", t[t.Next = 4] = "Next", t[t.Last = 8] = "Last", t[t.WrapAround = 16] = "WrapAround", t[t.NoScroll = 32] = "NoScroll", t[t.AutoFocus = 64] = "AutoFocus", t))(Pe || {}), Ur = ((t) => (t[t.Error = 0] = "Error", t[t.Overflow = 1] = "Overflow", t[t.Success = 2] = "Success", t[t.Underflow = 3] = "Underflow", t))(Ur || {}), Zu = ((t) => (t[t.Previous = -1] = "Previous", t[t.Next = 1] = "Next", t))(Zu || {});
function es(t = document.body) {
  return t == null ? [] : Array.from(t.querySelectorAll(Yt)).sort((e, r) => Math.sign((e.tabIndex || Number.MAX_SAFE_INTEGER) - (r.tabIndex || Number.MAX_SAFE_INTEGER)));
}
function ts(t = document.body) {
  return t == null ? [] : Array.from(t.querySelectorAll(Qu)).sort((e, r) => Math.sign((e.tabIndex || Number.MAX_SAFE_INTEGER) - (r.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var ja = ((t) => (t[t.Strict = 0] = "Strict", t[t.Loose = 1] = "Loose", t))(ja || {});
function rs(t, e = 0) {
  var r;
  return t === ((r = Jt(t)) == null ? void 0 : r.body) ? !1 : Ie(e, { 0() {
    return t.matches(Yt);
  }, 1() {
    let n = t;
    for (; n !== null; ) {
      if (n.matches(Yt)) return !0;
      n = n.parentElement;
    }
    return !1;
  } });
}
var ns = ((t) => (t[t.Keyboard = 0] = "Keyboard", t[t.Mouse = 1] = "Mouse", t))(ns || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (t) => {
  t.metaKey || t.altKey || t.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (t) => {
  t.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : t.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
function Ae(t) {
  t == null || t.focus({ preventScroll: !0 });
}
let as = ["textarea", "input"].join(",");
function os(t) {
  var e, r;
  return (r = (e = t == null ? void 0 : t.matches) == null ? void 0 : e.call(t, as)) != null ? r : !1;
}
function is(t, e = (r) => r) {
  return t.slice().sort((r, n) => {
    let a = e(r), o = e(n);
    if (a === null || o === null) return 0;
    let l = a.compareDocumentPosition(o);
    return l & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : l & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function xt(t, e, { sorted: r = !0, relativeTo: n = null, skipElements: a = [] } = {}) {
  let o = Array.isArray(t) ? t.length > 0 ? t[0].ownerDocument : document : t.ownerDocument, l = Array.isArray(t) ? r ? is(t) : t : e & 64 ? ts(t) : es(t);
  a.length > 0 && l.length > 1 && (l = l.filter((w) => !a.some((d) => d != null && "current" in d ? (d == null ? void 0 : d.current) === w : d === w))), n = n ?? o.activeElement;
  let u = (() => {
    if (e & 5) return 1;
    if (e & 10) return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), i = (() => {
    if (e & 1) return 0;
    if (e & 2) return Math.max(0, l.indexOf(n)) - 1;
    if (e & 4) return Math.max(0, l.indexOf(n)) + 1;
    if (e & 8) return l.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), f = e & 32 ? { preventScroll: !0 } : {}, s = 0, h = l.length, v;
  do {
    if (s >= h || s + h <= 0) return 0;
    let w = i + s;
    if (e & 16) w = (w + h) % h;
    else {
      if (w < 0) return 3;
      if (w >= h) return 1;
    }
    v = l[w], v == null || v.focus(f), s += u;
  } while (v !== o.activeElement);
  return e & 6 && os(v) && v.select(), 2;
}
function La() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function ls() {
  return /Android/gi.test(window.navigator.userAgent);
}
function us() {
  return La() || ls();
}
function yt(t, e, r, n) {
  let a = qe(r);
  Y(() => {
    if (!t) return;
    function o(l) {
      a.current(l);
    }
    return document.addEventListener(e, o, n), () => document.removeEventListener(e, o, n);
  }, [t, e, n]);
}
function Wa(t, e, r, n) {
  let a = qe(r);
  Y(() => {
    if (!t) return;
    function o(l) {
      a.current(l);
    }
    return window.addEventListener(e, o, n), () => window.removeEventListener(e, o, n);
  }, [t, e, n]);
}
const Jn = 30;
function ss(t, e, r) {
  let n = ot(t, "outside-click"), a = qe(r), o = ve(function(i, f) {
    if (i.defaultPrevented) return;
    let s = f(i);
    if (s === null || !s.getRootNode().contains(s) || !s.isConnected) return;
    let h = function v(w) {
      return typeof w == "function" ? v(w()) : Array.isArray(w) || w instanceof Set ? w : [w];
    }(e);
    for (let v of h) if (v !== null && (v.contains(s) || i.composed && i.composedPath().includes(v))) return;
    return !rs(s, ja.Loose) && s.tabIndex !== -1 && i.preventDefault(), a.current(i, s);
  }, [a, e]), l = k(null);
  yt(n, "pointerdown", (i) => {
    var f, s;
    l.current = ((s = (f = i.composedPath) == null ? void 0 : f.call(i)) == null ? void 0 : s[0]) || i.target;
  }, !0), yt(n, "mousedown", (i) => {
    var f, s;
    l.current = ((s = (f = i.composedPath) == null ? void 0 : f.call(i)) == null ? void 0 : s[0]) || i.target;
  }, !0), yt(n, "click", (i) => {
    us() || l.current && (o(i, () => l.current), l.current = null);
  }, !0);
  let u = k({ x: 0, y: 0 });
  yt(n, "touchstart", (i) => {
    u.current.x = i.touches[0].clientX, u.current.y = i.touches[0].clientY;
  }, !0), yt(n, "touchend", (i) => {
    let f = { x: i.changedTouches[0].clientX, y: i.changedTouches[0].clientY };
    if (!(Math.abs(f.x - u.current.x) >= Jn || Math.abs(f.y - u.current.y) >= Jn)) return o(i, () => i.target instanceof HTMLElement ? i.target : null);
  }, !0), Wa(n, "blur", (i) => o(i, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), !0);
}
function $t(...t) {
  return J(() => Jt(...t), [...t]);
}
function Ua(t, e, r, n) {
  let a = qe(r);
  Y(() => {
    t = t ?? window;
    function o(l) {
      a.current(l);
    }
    return t.addEventListener(e, o, n), () => t.removeEventListener(e, o, n);
  }, [t, e, n]);
}
function cs() {
  let t;
  return { before({ doc: e }) {
    var r;
    let n = e.documentElement, a = (r = e.defaultView) != null ? r : window;
    t = Math.max(0, a.innerWidth - n.clientWidth);
  }, after({ doc: e, d: r }) {
    let n = e.documentElement, a = Math.max(0, n.clientWidth - n.offsetWidth), o = Math.max(0, t - a);
    r.style(n, "paddingRight", `${o}px`);
  } };
}
function fs() {
  return La() ? { before({ doc: t, d: e, meta: r }) {
    function n(a) {
      return r.containers.flatMap((o) => o()).some((o) => o.contains(a));
    }
    e.microTask(() => {
      var a;
      if (window.getComputedStyle(t.documentElement).scrollBehavior !== "auto") {
        let u = Me();
        u.style(t.documentElement, "scrollBehavior", "auto"), e.add(() => e.microTask(() => u.dispose()));
      }
      let o = (a = window.scrollY) != null ? a : window.pageYOffset, l = null;
      e.addEventListener(t, "click", (u) => {
        if (u.target instanceof HTMLElement) try {
          let i = u.target.closest("a");
          if (!i) return;
          let { hash: f } = new URL(i.href), s = t.querySelector(f);
          s && !n(s) && (l = s);
        } catch {
        }
      }, !0), e.addEventListener(t, "touchstart", (u) => {
        if (u.target instanceof HTMLElement) if (n(u.target)) {
          let i = u.target;
          for (; i.parentElement && n(i.parentElement); ) i = i.parentElement;
          e.style(i, "overscrollBehavior", "contain");
        } else e.style(u.target, "touchAction", "none");
      }), e.addEventListener(t, "touchmove", (u) => {
        if (u.target instanceof HTMLElement) {
          if (u.target.tagName === "INPUT") return;
          if (n(u.target)) {
            let i = u.target;
            for (; i.parentElement && i.dataset.headlessuiPortal !== "" && !(i.scrollHeight > i.clientHeight || i.scrollWidth > i.clientWidth); ) i = i.parentElement;
            i.dataset.headlessuiPortal === "" && u.preventDefault();
          } else u.preventDefault();
        }
      }, { passive: !1 }), e.add(() => {
        var u;
        let i = (u = window.scrollY) != null ? u : window.pageYOffset;
        o !== i && window.scrollTo(0, o), l && l.isConnected && (l.scrollIntoView({ block: "nearest" }), l = null);
      });
    });
  } } : {};
}
function ds() {
  return { before({ doc: t, d: e }) {
    e.style(t.documentElement, "overflow", "hidden");
  } };
}
function ps(t) {
  let e = {};
  for (let r of t) Object.assign(e, r(e));
  return e;
}
let Ue = Na(() => /* @__PURE__ */ new Map(), { PUSH(t, e) {
  var r;
  let n = (r = this.get(t)) != null ? r : { doc: t, count: 0, d: Me(), meta: /* @__PURE__ */ new Set() };
  return n.count++, n.meta.add(e), this.set(t, n), this;
}, POP(t, e) {
  let r = this.get(t);
  return r && (r.count--, r.meta.delete(e)), this;
}, SCROLL_PREVENT({ doc: t, d: e, meta: r }) {
  let n = { doc: t, d: e, meta: ps(r) }, a = [fs(), cs(), ds()];
  a.forEach(({ before: o }) => o == null ? void 0 : o(n)), a.forEach(({ after: o }) => o == null ? void 0 : o(n));
}, SCROLL_ALLOW({ d: t }) {
  t.dispose();
}, TEARDOWN({ doc: t }) {
  this.delete(t);
} });
Ue.subscribe(() => {
  let t = Ue.getSnapshot(), e = /* @__PURE__ */ new Map();
  for (let [r] of t) e.set(r, r.documentElement.style.overflow);
  for (let r of t.values()) {
    let n = e.get(r.doc) === "hidden", a = r.count !== 0;
    (a && !n || !a && n) && Ue.dispatch(r.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", r), r.count === 0 && Ue.dispatch("TEARDOWN", r);
  }
});
function ys(t, e, r = () => ({ containers: [] })) {
  let n = ka(Ue), a = e ? n.get(e) : void 0, o = a ? a.count > 0 : !1;
  return ae(() => {
    if (!(!e || !t)) return Ue.dispatch("PUSH", e, r), () => Ue.dispatch("POP", e, r);
  }, [t, e]), o;
}
function vs(t, e, r = () => [document.body]) {
  let n = ot(t, "scroll-lock");
  ys(n, e, (a) => {
    var o;
    return { containers: [...(o = a.containers) != null ? o : [], r] };
  });
}
function ms(t = 0) {
  let [e, r] = Q(t), n = ve((i) => r(i), [e]), a = ve((i) => r((f) => f | i), [e]), o = ve((i) => (e & i) === i, [e]), l = ve((i) => r((f) => f & ~i), [r]), u = ve((i) => r((f) => f ^ i), [r]);
  return { flags: e, setFlag: n, addFlag: a, hasFlag: o, removeFlag: l, toggleFlag: u };
}
var Qn, Zn;
typeof process < "u" && typeof globalThis < "u" && typeof Element < "u" && ((Qn = process == null ? void 0 : process.env) == null ? void 0 : Qn.NODE_ENV) === "test" && typeof ((Zn = Element == null ? void 0 : Element.prototype) == null ? void 0 : Zn.getAnimations) > "u" && (Element.prototype.getAnimations = function() {
  return console.warn(["Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.", "Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.", "", "Example usage:", "```js", "import { mockAnimationsApi } from 'jsdom-testing-mocks'", "mockAnimationsApi()", "```"].join(`
`)), [];
});
var hs = ((t) => (t[t.None = 0] = "None", t[t.Closed = 1] = "Closed", t[t.Enter = 2] = "Enter", t[t.Leave = 4] = "Leave", t))(hs || {});
function gs(t) {
  let e = {};
  for (let r in t) t[r] === !0 && (e[`data-${r}`] = "");
  return e;
}
function bs(t, e, r, n) {
  let [a, o] = Q(r), { hasFlag: l, addFlag: u, removeFlag: i } = ms(t && a ? 3 : 0), f = k(!1), s = k(!1), h = en();
  return ae(() => {
    var v;
    if (t) {
      if (r && o(!0), !e) {
        r && u(3);
        return;
      }
      return (v = n == null ? void 0 : n.start) == null || v.call(n, r), ws(e, { inFlight: f, prepare() {
        s.current ? s.current = !1 : s.current = f.current, f.current = !0, !s.current && (r ? (u(3), i(4)) : (u(4), i(2)));
      }, run() {
        s.current ? r ? (i(3), u(4)) : (i(4), u(3)) : r ? i(1) : u(1);
      }, done() {
        var w;
        s.current && typeof e.getAnimations == "function" && e.getAnimations().length > 0 || (f.current = !1, i(7), r || o(!1), (w = n == null ? void 0 : n.end) == null || w.call(n, r));
      } });
    }
  }, [t, r, e, h]), t ? [a, { closed: l(1), enter: l(2), leave: l(4), transition: l(2) || l(4) }] : [r, { closed: void 0, enter: void 0, leave: void 0, transition: void 0 }];
}
function ws(t, { prepare: e, run: r, done: n, inFlight: a }) {
  let o = Me();
  return Ss(t, { prepare: e, inFlight: a }), o.nextFrame(() => {
    r(), o.requestAnimationFrame(() => {
      o.add(Es(t, n));
    });
  }), o.dispose;
}
function Es(t, e) {
  var r, n;
  let a = Me();
  if (!t) return a.dispose;
  let o = !1;
  a.add(() => {
    o = !0;
  });
  let l = (n = (r = t.getAnimations) == null ? void 0 : r.call(t).filter((u) => u instanceof CSSTransition)) != null ? n : [];
  return l.length === 0 ? (e(), a.dispose) : (Promise.allSettled(l.map((u) => u.finished)).then(() => {
    o || e();
  }), a.dispose);
}
function Ss(t, { inFlight: e, prepare: r }) {
  if (e != null && e.current) {
    r();
    return;
  }
  let n = t.style.transition;
  t.style.transition = "none", r(), t.offsetHeight, t.style.transition = n;
}
function rn(t, e) {
  let r = k([]), n = U(t);
  Y(() => {
    let a = [...r.current];
    for (let [o, l] of e.entries()) if (r.current[o] !== l) {
      let u = n(e, a);
      return r.current = e, u;
    }
  }, [n, ...e]);
}
let Zt = fe(null);
Zt.displayName = "OpenClosedContext";
var me = ((t) => (t[t.Open = 1] = "Open", t[t.Closed = 2] = "Closed", t[t.Closing = 4] = "Closing", t[t.Opening = 8] = "Opening", t))(me || {});
function er() {
  return ie(Zt);
}
function xs({ value: t, children: e }) {
  return A.createElement(Zt.Provider, { value: t }, e);
}
function Os({ children: t }) {
  return A.createElement(Zt.Provider, { value: null }, t);
}
function Ps(t) {
  function e() {
    document.readyState !== "loading" && (t(), document.removeEventListener("DOMContentLoaded", e));
  }
  typeof window < "u" && typeof document < "u" && (document.addEventListener("DOMContentLoaded", e), e());
}
let $e = [];
Ps(() => {
  function t(e) {
    if (!(e.target instanceof HTMLElement) || e.target === document.body || $e[0] === e.target) return;
    let r = e.target;
    r = r.closest(Yt), $e.unshift(r ?? e.target), $e = $e.filter((n) => n != null && n.isConnected), $e.splice(10);
  }
  window.addEventListener("click", t, { capture: !0 }), window.addEventListener("mousedown", t, { capture: !0 }), window.addEventListener("focus", t, { capture: !0 }), document.body.addEventListener("click", t, { capture: !0 }), document.body.addEventListener("mousedown", t, { capture: !0 }), document.body.addEventListener("focus", t, { capture: !0 });
});
function Ba(t) {
  let e = U(t), r = k(!1);
  Y(() => (r.current = !1, () => {
    r.current = !0, Qt(() => {
      r.current && e();
    });
  }), [e]);
}
function As() {
  let t = typeof document > "u";
  return "useSyncExternalStore" in ht ? ((e) => e.useSyncExternalStore)(ht)(() => () => {
  }, () => !1, () => !t) : !1;
}
function Rt() {
  let t = As(), [e, r] = ht.useState(Ve.isHandoffComplete);
  return e && Ve.isHandoffComplete === !1 && r(!1), ht.useEffect(() => {
    e !== !0 && r(!0);
  }, [e]), ht.useEffect(() => Ve.handoff(), []), t ? !1 : e;
}
let Ha = fe(!1);
function Ts() {
  return ie(Ha);
}
function ea(t) {
  return A.createElement(Ha.Provider, { value: t.force }, t.children);
}
function $s(t) {
  let e = Ts(), r = ie(qa), n = $t(t), [a, o] = Q(() => {
    var l;
    if (!e && r !== null) return (l = r.current) != null ? l : null;
    if (Ve.isServer) return null;
    let u = n == null ? void 0 : n.getElementById("headlessui-portal-root");
    if (u) return u;
    if (n === null) return null;
    let i = n.createElement("div");
    return i.setAttribute("id", "headlessui-portal-root"), n.body.appendChild(i);
  });
  return Y(() => {
    a !== null && (n != null && n.body.contains(a) || n == null || n.body.appendChild(a));
  }, [a, n]), Y(() => {
    e || r !== null && o(r.current);
  }, [r, o, e]), a;
}
let Va = he, Rs = le(function(t, e) {
  let r = t, n = k(null), a = Se(Wu((h) => {
    n.current = h;
  }), e), o = $t(n), l = $s(n), [u] = Q(() => {
    var h;
    return Ve.isServer ? null : (h = o == null ? void 0 : o.createElement("div")) != null ? h : null;
  }), i = ie(Br), f = Rt();
  ae(() => {
    !l || !u || l.contains(u) || (u.setAttribute("data-headlessui-portal", ""), l.appendChild(u));
  }, [l, u]), ae(() => {
    if (u && i) return i.register(u);
  }, [i, u]), Ba(() => {
    var h;
    !l || !u || (u instanceof Node && l.contains(u) && l.removeChild(u), l.childNodes.length <= 0 && ((h = l.parentElement) == null || h.removeChild(l)));
  });
  let s = de();
  return f ? !l || !u ? null : Lo(s({ ourProps: { ref: a }, theirProps: r, slot: {}, defaultTag: Va, name: "Portal" }), u) : null;
});
function Fs(t, e) {
  let r = Se(e), { enabled: n = !0, ...a } = t, o = de();
  return n ? A.createElement(Rs, { ...a, ref: r }) : o({ ourProps: { ref: r }, theirProps: a, slot: {}, defaultTag: Va, name: "Portal" });
}
let Is = he, qa = fe(null);
function Cs(t, e) {
  let { target: r, ...n } = t, a = { ref: Se(e) }, o = de();
  return A.createElement(qa.Provider, { value: r }, o({ ourProps: a, theirProps: n, defaultTag: Is, name: "Popover.Group" }));
}
let Br = fe(null);
function Ms() {
  let t = ie(Br), e = k([]), r = U((o) => (e.current.push(o), t && t.register(o), () => n(o))), n = U((o) => {
    let l = e.current.indexOf(o);
    l !== -1 && e.current.splice(l, 1), t && t.unregister(o);
  }), a = J(() => ({ register: r, unregister: n, portals: e }), [r, n, e]);
  return [e, J(() => function({ children: o }) {
    return A.createElement(Br.Provider, { value: a }, o);
  }, [a])];
}
let _s = le(Fs), Ga = le(Cs), Ds = Object.assign(_s, { Group: Ga });
function Ns(t, e = typeof document < "u" ? document.defaultView : null, r) {
  let n = ot(t, "escape");
  Ua(e, "keydown", (a) => {
    n && (a.defaultPrevented || a.key === Da.Escape && r(a));
  });
}
function ks() {
  var t;
  let [e] = Q(() => typeof window < "u" && typeof window.matchMedia == "function" ? window.matchMedia("(pointer: coarse)") : null), [r, n] = Q((t = e == null ? void 0 : e.matches) != null ? t : !1);
  return ae(() => {
    if (!e) return;
    function a(o) {
      n(o.matches);
    }
    return e.addEventListener("change", a), () => e.removeEventListener("change", a);
  }, [e]), r;
}
function js({ defaultContainers: t = [], portals: e, mainTreeNode: r } = {}) {
  let n = $t(r), a = U(() => {
    var o, l;
    let u = [];
    for (let i of t) i !== null && (i instanceof HTMLElement ? u.push(i) : "current" in i && i.current instanceof HTMLElement && u.push(i.current));
    if (e != null && e.current) for (let i of e.current) u.push(i);
    for (let i of (o = n == null ? void 0 : n.querySelectorAll("html > *, body > *")) != null ? o : []) i !== document.body && i !== document.head && i instanceof HTMLElement && i.id !== "headlessui-portal-root" && (r && (i.contains(r) || i.contains((l = r == null ? void 0 : r.getRootNode()) == null ? void 0 : l.host)) || u.some((f) => i.contains(f)) || u.push(i));
    return u;
  });
  return { resolveContainers: a, contains: U((o) => a().some((l) => l.contains(o))) };
}
let Ya = fe(null);
function ta({ children: t, node: e }) {
  let [r, n] = Q(null), a = za(e ?? r);
  return A.createElement(Ya.Provider, { value: a }, t, a === null && A.createElement(Lr, { features: Gt.Hidden, ref: (o) => {
    var l, u;
    if (o) {
      for (let i of (u = (l = Jt(o)) == null ? void 0 : l.querySelectorAll("html > *, body > *")) != null ? u : []) if (i !== document.body && i !== document.head && i instanceof HTMLElement && i != null && i.contains(o)) {
        n(i);
        break;
      }
    }
  } }));
}
function za(t = null) {
  var e;
  return (e = ie(Ya)) != null ? e : t;
}
function nn() {
  let t = k(!1);
  return ae(() => (t.current = !0, () => {
    t.current = !1;
  }), []), t;
}
var mt = ((t) => (t[t.Forwards = 0] = "Forwards", t[t.Backwards = 1] = "Backwards", t))(mt || {});
function Ls() {
  let t = k(0);
  return Wa(!0, "keydown", (e) => {
    e.key === "Tab" && (t.current = e.shiftKey ? 1 : 0);
  }, !0), t;
}
function Ka(t) {
  if (!t) return /* @__PURE__ */ new Set();
  if (typeof t == "function") return new Set(t());
  let e = /* @__PURE__ */ new Set();
  for (let r of t.current) r.current instanceof HTMLElement && e.add(r.current);
  return e;
}
let Ws = "div";
var We = ((t) => (t[t.None = 0] = "None", t[t.InitialFocus = 1] = "InitialFocus", t[t.TabLock = 2] = "TabLock", t[t.FocusLock = 4] = "FocusLock", t[t.RestoreFocus = 8] = "RestoreFocus", t[t.AutoFocus = 16] = "AutoFocus", t))(We || {});
function Us(t, e) {
  let r = k(null), n = Se(r, e), { initialFocus: a, initialFocusFallback: o, containers: l, features: u = 15, ...i } = t;
  Rt() || (u = 0);
  let f = $t(r);
  qs(u, { ownerDocument: f });
  let s = Gs(u, { ownerDocument: f, container: r, initialFocus: a, initialFocusFallback: o });
  Ys(u, { ownerDocument: f, container: r, containers: l, previousActiveElement: s });
  let h = Ls(), v = U((g) => {
    let b = r.current;
    b && ((S) => S())(() => {
      Ie(h.current, { [mt.Forwards]: () => {
        xt(b, Pe.First, { skipElements: [g.relatedTarget, o] });
      }, [mt.Backwards]: () => {
        xt(b, Pe.Last, { skipElements: [g.relatedTarget, o] });
      } });
    });
  }), w = ot(!!(u & 2), "focus-trap#tab-lock"), d = en(), y = k(!1), p = { ref: n, onKeyDown(g) {
    g.key == "Tab" && (y.current = !0, d.requestAnimationFrame(() => {
      y.current = !1;
    }));
  }, onBlur(g) {
    if (!(u & 4)) return;
    let b = Ka(l);
    r.current instanceof HTMLElement && b.add(r.current);
    let S = g.relatedTarget;
    S instanceof HTMLElement && S.dataset.headlessuiFocusGuard !== "true" && (Xa(b, S) || (y.current ? xt(r.current, Ie(h.current, { [mt.Forwards]: () => Pe.Next, [mt.Backwards]: () => Pe.Previous }) | Pe.WrapAround, { relativeTo: g.target }) : g.target instanceof HTMLElement && Ae(g.target)));
  } }, m = de();
  return A.createElement(A.Fragment, null, w && A.createElement(Lr, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: v, features: Gt.Focusable }), m({ ourProps: p, theirProps: i, defaultTag: Ws, name: "FocusTrap" }), w && A.createElement(Lr, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: v, features: Gt.Focusable }));
}
let Bs = le(Us), Hs = Object.assign(Bs, { features: We });
function Vs(t = !0) {
  let e = k($e.slice());
  return rn(([r], [n]) => {
    n === !0 && r === !1 && Qt(() => {
      e.current.splice(0);
    }), n === !1 && r === !0 && (e.current = $e.slice());
  }, [t, $e, e]), U(() => {
    var r;
    return (r = e.current.find((n) => n != null && n.isConnected)) != null ? r : null;
  });
}
function qs(t, { ownerDocument: e }) {
  let r = !!(t & 8), n = Vs(r);
  rn(() => {
    r || (e == null ? void 0 : e.activeElement) === (e == null ? void 0 : e.body) && Ae(n());
  }, [r]), Ba(() => {
    r && Ae(n());
  });
}
function Gs(t, { ownerDocument: e, container: r, initialFocus: n, initialFocusFallback: a }) {
  let o = k(null), l = ot(!!(t & 1), "focus-trap#initial-focus"), u = nn();
  return rn(() => {
    if (t === 0) return;
    if (!l) {
      a != null && a.current && Ae(a.current);
      return;
    }
    let i = r.current;
    i && Qt(() => {
      if (!u.current) return;
      let f = e == null ? void 0 : e.activeElement;
      if (n != null && n.current) {
        if ((n == null ? void 0 : n.current) === f) {
          o.current = f;
          return;
        }
      } else if (i.contains(f)) {
        o.current = f;
        return;
      }
      if (n != null && n.current) Ae(n.current);
      else {
        if (t & 16) {
          if (xt(i, Pe.First | Pe.AutoFocus) !== Ur.Error) return;
        } else if (xt(i, Pe.First) !== Ur.Error) return;
        if (a != null && a.current && (Ae(a.current), (e == null ? void 0 : e.activeElement) === a.current)) return;
        console.warn("There are no focusable elements inside the <FocusTrap />");
      }
      o.current = e == null ? void 0 : e.activeElement;
    });
  }, [a, l, t]), o;
}
function Ys(t, { ownerDocument: e, container: r, containers: n, previousActiveElement: a }) {
  let o = nn(), l = !!(t & 4);
  Ua(e == null ? void 0 : e.defaultView, "focus", (u) => {
    if (!l || !o.current) return;
    let i = Ka(n);
    r.current instanceof HTMLElement && i.add(r.current);
    let f = a.current;
    if (!f) return;
    let s = u.target;
    s && s instanceof HTMLElement ? Xa(i, s) ? (a.current = s, Ae(s)) : (u.preventDefault(), u.stopPropagation(), Ae(f)) : Ae(a.current);
  }, !0);
}
function Xa(t, e) {
  for (let r of t) if (r.contains(e)) return !0;
  return !1;
}
function Ja(t) {
  var e;
  return !!(t.enter || t.enterFrom || t.enterTo || t.leave || t.leaveFrom || t.leaveTo) || ((e = t.as) != null ? e : Za) !== he || A.Children.count(t.children) === 1;
}
let tr = fe(null);
tr.displayName = "TransitionContext";
var zs = ((t) => (t.Visible = "visible", t.Hidden = "hidden", t))(zs || {});
function Ks() {
  let t = ie(tr);
  if (t === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return t;
}
function Xs() {
  let t = ie(rr);
  if (t === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return t;
}
let rr = fe(null);
rr.displayName = "NestingContext";
function nr(t) {
  return "children" in t ? nr(t.children) : t.current.filter(({ el: e }) => e.current !== null).filter(({ state: e }) => e === "visible").length > 0;
}
function Qa(t, e) {
  let r = qe(t), n = k([]), a = nn(), o = en(), l = U((w, d = Fe.Hidden) => {
    let y = n.current.findIndex(({ el: p }) => p === w);
    y !== -1 && (Ie(d, { [Fe.Unmount]() {
      n.current.splice(y, 1);
    }, [Fe.Hidden]() {
      n.current[y].state = "hidden";
    } }), o.microTask(() => {
      var p;
      !nr(n) && a.current && ((p = r.current) == null || p.call(r));
    }));
  }), u = U((w) => {
    let d = n.current.find(({ el: y }) => y === w);
    return d ? d.state !== "visible" && (d.state = "visible") : n.current.push({ el: w, state: "visible" }), () => l(w, Fe.Unmount);
  }), i = k([]), f = k(Promise.resolve()), s = k({ enter: [], leave: [] }), h = U((w, d, y) => {
    i.current.splice(0), e && (e.chains.current[d] = e.chains.current[d].filter(([p]) => p !== w)), e == null || e.chains.current[d].push([w, new Promise((p) => {
      i.current.push(p);
    })]), e == null || e.chains.current[d].push([w, new Promise((p) => {
      Promise.all(s.current[d].map(([m, g]) => g)).then(() => p());
    })]), d === "enter" ? f.current = f.current.then(() => e == null ? void 0 : e.wait.current).then(() => y(d)) : y(d);
  }), v = U((w, d, y) => {
    Promise.all(s.current[d].splice(0).map(([p, m]) => m)).then(() => {
      var p;
      (p = i.current.shift()) == null || p();
    }).then(() => y(d));
  });
  return J(() => ({ children: n, register: u, unregister: l, onStart: h, onStop: v, wait: f, chains: s }), [u, l, n, h, v, s, f]);
}
let Za = he, eo = qt.RenderStrategy;
function Js(t, e) {
  var r, n;
  let { transition: a = !0, beforeEnter: o, afterEnter: l, beforeLeave: u, afterLeave: i, enter: f, enterFrom: s, enterTo: h, entered: v, leave: w, leaveFrom: d, leaveTo: y, ...p } = t, [m, g] = Q(null), b = k(null), S = Ja(t), O = Se(...S ? [b, e, g] : e === null ? [] : [e]), _ = (r = p.unmount) == null || r ? Fe.Unmount : Fe.Hidden, { show: M, appear: W, initial: H } = Ks(), [j, z] = Q(M ? "visible" : "hidden"), V = Xs(), { register: $, unregister: T } = V;
  ae(() => $(b), [$, b]), ae(() => {
    if (_ === Fe.Hidden && b.current) {
      if (M && j !== "visible") {
        z("visible");
        return;
      }
      return Ie(j, { hidden: () => T(b), visible: () => $(b) });
    }
  }, [j, b, $, T, M, _]);
  let D = Rt();
  ae(() => {
    if (S && D && j === "visible" && b.current === null) throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
  }, [b, j, D, S]);
  let ue = H && !W, pe = W && M && H, ge = k(!1), te = Qa(() => {
    ge.current || (z("hidden"), T(b));
  }, V), ye = U((Ne) => {
    ge.current = !0;
    let xe = Ne ? "enter" : "leave";
    te.onStart(b, xe, (Oe) => {
      Oe === "enter" ? o == null || o() : Oe === "leave" && (u == null || u());
    });
  }), q = U((Ne) => {
    let xe = Ne ? "enter" : "leave";
    ge.current = !1, te.onStop(b, xe, (Oe) => {
      Oe === "enter" ? l == null || l() : Oe === "leave" && (i == null || i());
    }), xe === "leave" && !nr(te) && (z("hidden"), T(b));
  });
  Y(() => {
    S && a || (ye(M), q(M));
  }, [M, S, a]);
  let _e = !(!a || !S || !D || ue), [, ee] = bs(_e, m, M, { start: ye, end: q }), or = je({ ref: O, className: ((n = jr(p.className, pe && f, pe && s, ee.enter && f, ee.enter && ee.closed && s, ee.enter && !ee.closed && h, ee.leave && w, ee.leave && !ee.closed && d, ee.leave && ee.closed && y, !ee.transition && M && v)) == null ? void 0 : n.trim()) || void 0, ...gs(ee) }), De = 0;
  j === "visible" && (De |= me.Open), j === "hidden" && (De |= me.Closed), ee.enter && (De |= me.Opening), ee.leave && (De |= me.Closing);
  let lt = de();
  return A.createElement(rr.Provider, { value: te }, A.createElement(xs, { value: De }, lt({ ourProps: or, theirProps: p, defaultTag: Za, features: eo, visible: j === "visible", name: "Transition.Child" })));
}
function Qs(t, e) {
  let { show: r, appear: n = !1, unmount: a = !0, ...o } = t, l = k(null), u = Ja(t), i = Se(...u ? [l, e] : e === null ? [] : [e]);
  Rt();
  let f = er();
  if (r === void 0 && f !== null && (r = (f & me.Open) === me.Open), r === void 0) throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
  let [s, h] = Q(r ? "visible" : "hidden"), v = Qa(() => {
    r || h("hidden");
  }), [w, d] = Q(!0), y = k([r]);
  ae(() => {
    w !== !1 && y.current[y.current.length - 1] !== r && (y.current.push(r), d(!1));
  }, [y, r]);
  let p = J(() => ({ show: r, appear: n, initial: w }), [r, n, w]);
  ae(() => {
    r ? h("visible") : !nr(v) && l.current !== null && h("hidden");
  }, [r, v]);
  let m = { unmount: a }, g = U(() => {
    var O;
    w && d(!1), (O = t.beforeEnter) == null || O.call(t);
  }), b = U(() => {
    var O;
    w && d(!1), (O = t.beforeLeave) == null || O.call(t);
  }), S = de();
  return A.createElement(rr.Provider, { value: v }, A.createElement(tr.Provider, { value: p }, S({ ourProps: { ...m, as: he, children: A.createElement(to, { ref: i, ...m, ...o, beforeEnter: g, beforeLeave: b }) }, theirProps: {}, defaultTag: he, features: eo, visible: s === "visible", name: "Transition" })));
}
function Zs(t, e) {
  let r = ie(tr) !== null, n = er() !== null;
  return A.createElement(A.Fragment, null, !r && n ? A.createElement(Hr, { ref: e, ...t }) : A.createElement(to, { ref: e, ...t }));
}
let Hr = le(Qs), to = le(Js), it = le(Zs), ro = Object.assign(Hr, { Child: it, Root: Hr });
var ec = ((t) => (t[t.Open = 0] = "Open", t[t.Closed = 1] = "Closed", t))(ec || {}), tc = ((t) => (t[t.SetTitleId = 0] = "SetTitleId", t))(tc || {});
let rc = { 0(t, e) {
  return t.titleId === e.id ? t : { ...t, titleId: e.id };
} }, an = fe(null);
an.displayName = "DialogContext";
function ar(t) {
  let e = ie(an);
  if (e === null) {
    let r = new Error(`<${t} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(r, ar), r;
  }
  return e;
}
function nc(t, e) {
  return Ie(e.type, rc, t, e);
}
let ra = le(function(t, e) {
  let r = Pt(), { id: n = `headlessui-dialog-${r}`, open: a, onClose: o, initialFocus: l, role: u = "dialog", autoFocus: i = !0, __demoMode: f = !1, unmount: s = !1, ...h } = t, v = k(!1);
  u = function() {
    return u === "dialog" || u === "alertdialog" ? u : (v.current || (v.current = !0, console.warn(`Invalid role [${u}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog");
  }();
  let w = er();
  a === void 0 && w !== null && (a = (w & me.Open) === me.Open);
  let d = k(null), y = Se(d, e), p = $t(d), m = a ? 0 : 1, [g, b] = No(nc, { titleId: null, descriptionId: null, panelRef: ko() }), S = U(() => o(!1)), O = U((q) => b({ type: 0, id: q })), _ = Rt() ? m === 0 : !1, [M, W] = Ms(), H = { get current() {
    var q;
    return (q = g.panelRef.current) != null ? q : d.current;
  } }, j = za(), { resolveContainers: z } = js({ mainTreeNode: j, portals: M, defaultContainers: [H] }), V = w !== null ? (w & me.Closing) === me.Closing : !1;
  Xu(f || V ? !1 : _, { allowed: U(() => {
    var q, _e;
    return [(_e = (q = d.current) == null ? void 0 : q.closest("[data-headlessui-portal]")) != null ? _e : null];
  }), disallowed: U(() => {
    var q;
    return [(q = j == null ? void 0 : j.closest("body > *:not(#headlessui-portal-root)")) != null ? q : null];
  }) }), ss(_, z, (q) => {
    q.preventDefault(), S();
  }), Ns(_, p == null ? void 0 : p.defaultView, (q) => {
    q.preventDefault(), q.stopPropagation(), document.activeElement && "blur" in document.activeElement && typeof document.activeElement.blur == "function" && document.activeElement.blur(), S();
  }), vs(f || V ? !1 : _, p, z), Ju(_, d, S);
  let [$, T] = Uu(), D = J(() => [{ dialogState: m, close: S, setTitleId: O, unmount: s }, g], [m, g, S, O, s]), ue = J(() => ({ open: m === 0 }), [m]), pe = { ref: y, id: n, role: u, tabIndex: -1, "aria-modal": f ? void 0 : m === 0 ? !0 : void 0, "aria-labelledby": g.titleId, "aria-describedby": $, unmount: s }, ge = !ks(), te = We.None;
  _ && !f && (te |= We.RestoreFocus, te |= We.TabLock, i && (te |= We.AutoFocus), ge && (te |= We.InitialFocus));
  let ye = de();
  return A.createElement(Os, null, A.createElement(ea, { force: !0 }, A.createElement(Ds, null, A.createElement(an.Provider, { value: D }, A.createElement(Ga, { target: d }, A.createElement(ea, { force: !1 }, A.createElement(T, { slot: ue }, A.createElement(W, null, A.createElement(Hs, { initialFocus: l, initialFocusFallback: d, containers: z, features: te }, A.createElement(Yu, { value: S }, ye({ ourProps: pe, theirProps: h, slot: ue, defaultTag: ac, features: oc, visible: m === 0, name: "Dialog" })))))))))));
}), ac = "div", oc = qt.RenderStrategy | qt.Static;
function ic(t, e) {
  let { transition: r = !1, open: n, ...a } = t, o = er(), l = t.hasOwnProperty("open") || o !== null, u = t.hasOwnProperty("onClose");
  if (!l && !u) throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");
  if (!l) throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");
  if (!u) throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");
  if (!o && typeof t.open != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${t.open}`);
  if (typeof t.onClose != "function") throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${t.onClose}`);
  return (n !== void 0 || r) && !a.static ? A.createElement(ta, null, A.createElement(ro, { show: n, transition: r, unmount: a.unmount }, A.createElement(ra, { ref: e, ...a }))) : A.createElement(ta, null, A.createElement(ra, { ref: e, open: n, ...a }));
}
let lc = "div";
function uc(t, e) {
  let r = Pt(), { id: n = `headlessui-dialog-panel-${r}`, transition: a = !1, ...o } = t, [{ dialogState: l, unmount: u }, i] = ar("Dialog.Panel"), f = Se(e, i.panelRef), s = J(() => ({ open: l === 0 }), [l]), h = U((p) => {
    p.stopPropagation();
  }), v = { ref: f, id: n, onClick: h }, w = a ? it : he, d = a ? { unmount: u } : {}, y = de();
  return A.createElement(w, { ...d }, y({ ourProps: v, theirProps: o, slot: s, defaultTag: lc, name: "Dialog.Panel" }));
}
let sc = "div";
function cc(t, e) {
  let { transition: r = !1, ...n } = t, [{ dialogState: a, unmount: o }] = ar("Dialog.Backdrop"), l = J(() => ({ open: a === 0 }), [a]), u = { ref: e, "aria-hidden": !0 }, i = r ? it : he, f = r ? { unmount: o } : {}, s = de();
  return A.createElement(i, { ...f }, s({ ourProps: u, theirProps: n, slot: l, defaultTag: sc, name: "Dialog.Backdrop" }));
}
let fc = "h2";
function dc(t, e) {
  let r = Pt(), { id: n = `headlessui-dialog-title-${r}`, ...a } = t, [{ dialogState: o, setTitleId: l }] = ar("Dialog.Title"), u = Se(e);
  Y(() => (l(n), () => l(null)), [n, l]);
  let i = J(() => ({ open: o === 0 }), [o]), f = { ref: u, id: n };
  return de()({ ourProps: f, theirProps: a, slot: i, defaultTag: fc, name: "Dialog.Title" });
}
let pc = le(ic), on = le(uc);
le(cc);
let yc = le(dc), vc = Object.assign(pc, { Panel: on, Title: yc, Description: qu });
function no({ onClick: t }) {
  return /* @__PURE__ */ R.jsxs(
    "button",
    {
      type: "button",
      className: "im-close-button text-gray-400 hover:text-gray-500",
      onClick: t,
      children: [
        /* @__PURE__ */ R.jsx("span", { className: "sr-only", children: "Close" }),
        /* @__PURE__ */ R.jsx(
          "svg",
          {
            className: "size-6",
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: "2",
            stroke: "currentColor",
            "aria-hidden": "true",
            children: /* @__PURE__ */ R.jsx(
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
const mc = ({ modalContext: t, config: e, children: r }) => /* @__PURE__ */ R.jsx("div", { className: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4", children: /* @__PURE__ */ R.jsx(
  "div",
  {
    className: Vt("im-modal-positioner flex min-h-full justify-center", {
      "items-start": e.position === "top",
      "items-center": e.position === "center",
      "items-end": e.position === "bottom"
    }),
    children: /* @__PURE__ */ R.jsx(
      it,
      {
        enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
        enterTo: "opacity-100 translate-y-0 sm:scale-100",
        leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
        leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
        afterLeave: t.afterLeave,
        className: Vt("im-modal-wrapper w-full transition duration-300 ease-in-out", t.onTopOfStack ? "" : "blur-sm", {
          "sm:max-w-sm": e.maxWidth === "sm",
          "sm:max-w-md": e.maxWidth === "md",
          "sm:max-w-md md:max-w-lg": e.maxWidth === "lg",
          "sm:max-w-md md:max-w-xl": e.maxWidth === "xl",
          "sm:max-w-md md:max-w-xl lg:max-w-2xl": e.maxWidth === "2xl",
          "sm:max-w-md md:max-w-xl lg:max-w-3xl": e.maxWidth === "3xl",
          "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl": e.maxWidth === "4xl",
          "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl": e.maxWidth === "5xl",
          "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl": e.maxWidth === "6xl",
          "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl": e.maxWidth === "7xl"
        }),
        children: /* @__PURE__ */ R.jsxs(on, { className: `im-modal-content relative ${e.paddingClasses} ${e.panelClasses}`, children: [
          e.closeButton && /* @__PURE__ */ R.jsx("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ R.jsx(no, { onClick: t.close }) }),
          typeof r == "function" ? r({ modalContext: t, config: e }) : r
        ] })
      }
    )
  }
) }), hc = ({ modalContext: t, config: e, children: r }) => /* @__PURE__ */ R.jsx("div", { className: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ R.jsx(
  "div",
  {
    className: Vt("im-slideover-positioner flex min-h-full items-center", {
      "justify-start": e.position === "left",
      "justify-end": e.position === "right"
    }),
    children: /* @__PURE__ */ R.jsx(
      it,
      {
        enterFrom: `opacity-0 ${e.position === "left" ? "-translate-x-full" : "translate-x-full"}`,
        enterTo: "opacity-100 translate-x-0",
        leaveFrom: "opacity-100 translate-x-0",
        leaveTo: `opacity-0 ${e.position === "left" ? "-translate-x-full" : "translate-x-full"}`,
        afterLeave: t.afterLeave,
        className: Vt("im-slideover-wrapper w-full transition duration-300 ease-in-out", t.onTopOfStack ? "" : "blur-sm", {
          "sm:max-w-sm": e.maxWidth === "sm",
          "sm:max-w-md": e.maxWidth === "md",
          "sm:max-w-md md:max-w-lg": e.maxWidth === "lg",
          "sm:max-w-md md:max-w-xl": e.maxWidth === "xl",
          "sm:max-w-md md:max-w-xl lg:max-w-2xl": e.maxWidth === "2xl",
          "sm:max-w-md md:max-w-xl lg:max-w-3xl": e.maxWidth === "3xl",
          "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl": e.maxWidth === "4xl",
          "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl": e.maxWidth === "5xl",
          "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl": e.maxWidth === "6xl",
          "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl": e.maxWidth === "7xl"
        }),
        children: /* @__PURE__ */ R.jsxs(on, { className: `im-slideover-content relative ${e.paddingClasses} ${e.panelClasses}`, children: [
          e.closeButton && /* @__PURE__ */ R.jsx("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ R.jsx(no, { onClick: t.close }) }),
          typeof r == "function" ? r({ modalContext: t, config: e }) : r
        ] })
      }
    )
  }
) }), gc = Vr(({ name: t, children: e, ...r }, n) => {
  const a = (l) => typeof e == "function" ? e(l) : e, o = k(null);
  return na(n, () => o.current, [o]), /* @__PURE__ */ R.jsx(
    Fa,
    {
      ref: o,
      name: t,
      ...r,
      children: ({
        afterLeave: l,
        close: u,
        config: i,
        emit: f,
        getChildModal: s,
        getParentModal: h,
        id: v,
        index: w,
        isOpen: d,
        modalContext: y,
        onTopOfStack: p,
        reload: m,
        setOpen: g,
        shouldRender: b
      }) => /* @__PURE__ */ R.jsx(
        ro,
        {
          appear: !0,
          show: d ?? !1,
          children: /* @__PURE__ */ R.jsxs(
            vc,
            {
              as: "div",
              className: "im-dialog relative z-20",
              onClose: () => i.closeExplicitly ? null : u(),
              "data-inertiaui-modal-id": v,
              "data-inertiaui-modal-index": w,
              children: [
                w === 0 ? /* @__PURE__ */ R.jsx(
                  it,
                  {
                    enter: "transition transform ease-in-out duration-300",
                    enterFrom: "opacity-0",
                    enterTo: "opacity-100",
                    leave: "transition transform ease-in-out duration-300",
                    leaveFrom: "opacity-100",
                    leaveTo: "opacity-0",
                    children: p ? /* @__PURE__ */ R.jsx(
                      "div",
                      {
                        className: "im-backdrop fixed inset-0 z-30 bg-black/75",
                        "aria-hidden": "true"
                      }
                    ) : /* @__PURE__ */ R.jsx("div", {})
                  }
                ) : null,
                w > 0 && p ? /* @__PURE__ */ R.jsx("div", { className: "im-backdrop fixed inset-0 z-30 bg-black/75" }) : null,
                i.slideover ? /* @__PURE__ */ R.jsx(
                  hc,
                  {
                    modalContext: y,
                    config: i,
                    children: a({
                      afterLeave: l,
                      close: u,
                      config: i,
                      emit: f,
                      getChildModal: s,
                      getParentModal: h,
                      id: v,
                      index: w,
                      isOpen: d,
                      modalContext: y,
                      onTopOfStack: p,
                      reload: m,
                      setOpen: g,
                      shouldRender: b
                    })
                  }
                ) : /* @__PURE__ */ R.jsx(
                  mc,
                  {
                    modalContext: y,
                    config: i,
                    children: a({
                      afterLeave: l,
                      close: u,
                      config: i,
                      emit: f,
                      getChildModal: s,
                      getParentModal: h,
                      id: v,
                      index: w,
                      isOpen: d,
                      modalContext: y,
                      onTopOfStack: p,
                      reload: m,
                      setOpen: g,
                      shouldRender: b
                    })
                  }
                )
              ]
            }
          )
        }
      )
    }
  );
});
gc.displayName = "Modal";
const Rc = ({
  href: t,
  method: e = "get",
  data: r = {},
  as: n = "a",
  headers: a = {},
  queryStringArrayFormat: o = "brackets",
  onAfterLeave: l = null,
  onBlur: u = null,
  onClose: i = null,
  onError: f = null,
  onFocus: s = null,
  onStart: h = null,
  onSuccess: v = null,
  navigate: w = null,
  children: d,
  ...y
}) => {
  const [p, m] = Q(!1), [g, b] = Q(null), { stack: S, visit: O } = Xt(), _ = J(() => w ?? qr("navigate"), [w]), M = {}, W = {};
  Object.keys(y).forEach((T) => {
    zn.includes(T) || (T.startsWith("on") && typeof y[T] == "function" ? T.toLowerCase() in window ? M[T] = y[T] : W[T] = y[T] : M[T] = y[T]);
  });
  const [H, j] = Q(!1);
  Y(() => {
    g && (g.onTopOfStack && H ? s == null || s() : !g.onTopOfStack && !H && (u == null || u()), j(!g.onTopOfStack));
  }, [S]);
  const z = ve(() => {
    i == null || i();
  }, [i]), V = ve(() => {
    b(null), l == null || l();
  }, [l]), $ = ve(
    (T) => {
      T == null || T.preventDefault(), !p && (t.startsWith("#") || (m(!0), h == null || h()), O(
        t,
        e,
        r,
        a,
        Go(aa(y, zn)),
        () => z(S.length),
        V,
        o,
        _
      ).then((D) => {
        b(D), D.registerEventListenersFromProps(W), v == null || v();
      }).catch((D) => {
        console.error(D), f == null || f(D);
      }).finally(() => m(!1)));
    },
    [t, e, r, a, o, y, z, V]
  );
  return /* @__PURE__ */ R.jsx(
    n,
    {
      ...M,
      href: t,
      onClick: $,
      children: typeof d == "function" ? d({ loading: p }) : d
    }
  );
};
function Fc() {
  return Xt().stack[$a()] ?? null;
}
export {
  Fa as HeadlessModal,
  gc as Modal,
  Rc as ModalLink,
  Ru as ModalRoot,
  $u as ModalStackProvider,
  qr as getConfig,
  Pc as putConfig,
  Ac as renderApp,
  Oc as resetConfig,
  Fc as useModal,
  $a as useModalIndex,
  Xt as useModalStack
};
