var Io = Object.defineProperty;
var Co = (t, e, r) => e in t ? Io(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var ce = (t, e, r) => Co(t, typeof e != "symbol" ? e + "" : e, r);
import * as gt from "react";
import A, { createContext as fe, useState as Q, useEffect as z, useContext as ie, useRef as k, createElement as Tr, useMemo as J, forwardRef as qr, useImperativeHandle as aa, useLayoutEffect as Mo, useCallback as ve, Fragment as he, isValidElement as _o, cloneElement as Do, useId as At, useSyncExternalStore as No, useReducer as ko, createRef as jo } from "react";
import Wt from "axios";
import { router as mt, usePage as Lo } from "@inertiajs/react";
import { createPortal as Wo } from "react-dom";
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
class Uo {
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
const Kt = new Uo(), Pc = () => Kt.reset(), Ac = (t, e) => Kt.put(t, e), Gr = (t) => Kt.get(t), Ye = (t, e) => Kt.get(t ? `slideover.${e}` : `modal.${e}`);
var $r = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Bo(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Ho(t) {
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
var Rr = { exports: {} }, ft = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Sn;
function Vo() {
  if (Sn) return ft;
  Sn = 1;
  var t = A, e = Symbol.for("react.element"), r = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, a = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = { key: !0, ref: !0, __self: !0, __source: !0 };
  function l(u, i, f) {
    var s, g = {}, v = null, w = null;
    f !== void 0 && (v = "" + f), i.key !== void 0 && (v = "" + i.key), i.ref !== void 0 && (w = i.ref);
    for (s in i) n.call(i, s) && !o.hasOwnProperty(s) && (g[s] = i[s]);
    if (u && u.defaultProps) for (s in i = u.defaultProps, i) g[s] === void 0 && (g[s] = i[s]);
    return { $$typeof: e, type: u, key: v, ref: w, props: g, _owner: a.current };
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
var xn;
function qo() {
  return xn || (xn = 1, process.env.NODE_ENV !== "production" && function() {
    var t = A, e = Symbol.for("react.element"), r = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), l = Symbol.for("react.provider"), u = Symbol.for("react.context"), i = Symbol.for("react.forward_ref"), f = Symbol.for("react.suspense"), s = Symbol.for("react.suspense_list"), g = Symbol.for("react.memo"), v = Symbol.for("react.lazy"), w = Symbol.for("react.offscreen"), d = Symbol.iterator, y = "@@iterator";
    function p(c) {
      if (c === null || typeof c != "object")
        return null;
      var E = d && c[d] || c[y];
      return typeof E == "function" ? E : null;
    }
    var m = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function h(c) {
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
      return !!(typeof c == "string" || typeof c == "function" || c === n || c === o || W || c === a || c === f || c === s || M || c === w || S || O || _ || typeof c == "object" && c !== null && (c.$$typeof === v || c.$$typeof === g || c.$$typeof === l || c.$$typeof === u || c.$$typeof === i || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      c.$$typeof === H || c.getModuleId !== void 0));
    }
    function Y(c, E, x) {
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
      if (typeof c.tag == "number" && h("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof c == "function")
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
            return Y(c, c.render, "ForwardRef");
          case g:
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
    function ir() {
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
        D < 0 && h("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
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
    var Oe = !1, It;
    {
      var oo = typeof WeakMap == "function" ? WeakMap : Map;
      It = new oo();
    }
    function un(c, E) {
      if (!c || Oe)
        return "";
      {
        var x = It.get(c);
        if (x !== void 0)
          return x;
      }
      var P;
      Oe = !0;
      var N = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var L;
      L = lt.current, lt.current = null, ir();
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
                    return c.displayName && se.includes("<anonymous>") && (se = se.replace("<anonymous>", c.displayName)), typeof c == "function" && It.set(c, se), se;
                  }
                while (G >= 1 && K >= 0);
              break;
            }
        }
      } finally {
        Oe = !1, lt.current = L, De(), Error.prepareStackTrace = N;
      }
      var ze = c ? c.displayName || c.name : "", ke = ze ? xe(ze) : "";
      return typeof c == "function" && It.set(c, ke), ke;
    }
    function io(c, E, x) {
      return un(c, !1);
    }
    function lo(c) {
      var E = c.prototype;
      return !!(E && E.isReactComponent);
    }
    function Ct(c, E, x) {
      if (c == null)
        return "";
      if (typeof c == "function")
        return un(c, lo(c));
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
            return io(c.render);
          case g:
            return Ct(c.type, E, x);
          case v: {
            var P = c, N = P._payload, L = P._init;
            try {
              return Ct(L(N), E, x);
            } catch {
            }
          }
        }
      return "";
    }
    var ut = Object.prototype.hasOwnProperty, sn = {}, cn = m.ReactDebugCurrentFrame;
    function Mt(c) {
      if (c) {
        var E = c._owner, x = Ct(c.type, c._source, E ? E.type : null);
        cn.setExtraStackFrame(x);
      } else
        cn.setExtraStackFrame(null);
    }
    function uo(c, E, x, P, N) {
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
            F && !(F instanceof Error) && (Mt(N), h("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", P || "React class", x, C, typeof F), Mt(null)), F instanceof Error && !(F.message in sn) && (sn[F.message] = !0, Mt(N), h("Failed %s type: %s", x, F.message), Mt(null));
          }
      }
    }
    var so = Array.isArray;
    function lr(c) {
      return so(c);
    }
    function co(c) {
      {
        var E = typeof Symbol == "function" && Symbol.toStringTag, x = E && c[Symbol.toStringTag] || c.constructor.name || "Object";
        return x;
      }
    }
    function fo(c) {
      try {
        return fn(c), !1;
      } catch {
        return !0;
      }
    }
    function fn(c) {
      return "" + c;
    }
    function dn(c) {
      if (fo(c))
        return h("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", co(c)), fn(c);
    }
    var st = m.ReactCurrentOwner, po = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, pn, yn, ur;
    ur = {};
    function yo(c) {
      if (ut.call(c, "ref")) {
        var E = Object.getOwnPropertyDescriptor(c, "ref").get;
        if (E && E.isReactWarning)
          return !1;
      }
      return c.ref !== void 0;
    }
    function vo(c) {
      if (ut.call(c, "key")) {
        var E = Object.getOwnPropertyDescriptor(c, "key").get;
        if (E && E.isReactWarning)
          return !1;
      }
      return c.key !== void 0;
    }
    function mo(c, E) {
      if (typeof c.ref == "string" && st.current && E && st.current.stateNode !== E) {
        var x = $(st.current.type);
        ur[x] || (h('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', $(st.current.type), c.ref), ur[x] = !0);
      }
    }
    function ho(c, E) {
      {
        var x = function() {
          pn || (pn = !0, h("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", E));
        };
        x.isReactWarning = !0, Object.defineProperty(c, "key", {
          get: x,
          configurable: !0
        });
      }
    }
    function go(c, E) {
      {
        var x = function() {
          yn || (yn = !0, h("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", E));
        };
        x.isReactWarning = !0, Object.defineProperty(c, "ref", {
          get: x,
          configurable: !0
        });
      }
    }
    var bo = function(c, E, x, P, N, L, C) {
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
    function wo(c, E, x, P, N) {
      {
        var L, C = {}, F = null, ne = null;
        x !== void 0 && (dn(x), F = "" + x), vo(E) && (dn(E.key), F = "" + E.key), yo(E) && (ne = E.ref, mo(E, N));
        for (L in E)
          ut.call(E, L) && !po.hasOwnProperty(L) && (C[L] = E[L]);
        if (c && c.defaultProps) {
          var G = c.defaultProps;
          for (L in G)
            C[L] === void 0 && (C[L] = G[L]);
        }
        if (F || ne) {
          var K = typeof c == "function" ? c.displayName || c.name || "Unknown" : c;
          F && ho(C, K), ne && go(C, K);
        }
        return bo(c, F, ne, N, P, st.current, C);
      }
    }
    var sr = m.ReactCurrentOwner, vn = m.ReactDebugCurrentFrame;
    function Ge(c) {
      if (c) {
        var E = c._owner, x = Ct(c.type, c._source, E ? E.type : null);
        vn.setExtraStackFrame(x);
      } else
        vn.setExtraStackFrame(null);
    }
    var cr;
    cr = !1;
    function fr(c) {
      return typeof c == "object" && c !== null && c.$$typeof === e;
    }
    function mn() {
      {
        if (sr.current) {
          var c = $(sr.current.type);
          if (c)
            return `

Check the render method of \`` + c + "`.";
        }
        return "";
      }
    }
    function Eo(c) {
      return "";
    }
    var hn = {};
    function So(c) {
      {
        var E = mn();
        if (!E) {
          var x = typeof c == "string" ? c : c.displayName || c.name;
          x && (E = `

Check the top-level render call using <` + x + ">.");
        }
        return E;
      }
    }
    function gn(c, E) {
      {
        if (!c._store || c._store.validated || c.key != null)
          return;
        c._store.validated = !0;
        var x = So(E);
        if (hn[x])
          return;
        hn[x] = !0;
        var P = "";
        c && c._owner && c._owner !== sr.current && (P = " It was passed a child from " + $(c._owner.type) + "."), Ge(c), h('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', x, P), Ge(null);
      }
    }
    function bn(c, E) {
      {
        if (typeof c != "object")
          return;
        if (lr(c))
          for (var x = 0; x < c.length; x++) {
            var P = c[x];
            fr(P) && gn(P, E);
          }
        else if (fr(c))
          c._store && (c._store.validated = !0);
        else if (c) {
          var N = p(c);
          if (typeof N == "function" && N !== c.entries)
            for (var L = N.call(c), C; !(C = L.next()).done; )
              fr(C.value) && gn(C.value, E);
        }
      }
    }
    function xo(c) {
      {
        var E = c.type;
        if (E == null || typeof E == "string")
          return;
        var x;
        if (typeof E == "function")
          x = E.propTypes;
        else if (typeof E == "object" && (E.$$typeof === i || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        E.$$typeof === g))
          x = E.propTypes;
        else
          return;
        if (x) {
          var P = $(E);
          uo(x, c.props, "prop", P, c);
        } else if (E.PropTypes !== void 0 && !cr) {
          cr = !0;
          var N = $(E);
          h("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", N || "Unknown");
        }
        typeof E.getDefaultProps == "function" && !E.getDefaultProps.isReactClassApproved && h("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Oo(c) {
      {
        for (var E = Object.keys(c.props), x = 0; x < E.length; x++) {
          var P = E[x];
          if (P !== "children" && P !== "key") {
            Ge(c), h("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", P), Ge(null);
            break;
          }
        }
        c.ref !== null && (Ge(c), h("Invalid attribute `ref` supplied to `React.Fragment`."), Ge(null));
      }
    }
    var wn = {};
    function En(c, E, x, P, N, L) {
      {
        var C = j(c);
        if (!C) {
          var F = "";
          (c === void 0 || typeof c == "object" && c !== null && Object.keys(c).length === 0) && (F += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ne = Eo();
          ne ? F += ne : F += mn();
          var G;
          c === null ? G = "null" : lr(c) ? G = "array" : c !== void 0 && c.$$typeof === e ? (G = "<" + ($(c.type) || "Unknown") + " />", F = " Did you accidentally export a JSX literal instead of a component?") : G = typeof c, h("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", G, F);
        }
        var K = wo(c, E, x, N, L);
        if (K == null)
          return K;
        if (C) {
          var se = E.children;
          if (se !== void 0)
            if (P)
              if (lr(se)) {
                for (var ze = 0; ze < se.length; ze++)
                  bn(se[ze], c);
                Object.freeze && Object.freeze(se);
              } else
                h("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              bn(se, c);
        }
        if (ut.call(E, "key")) {
          var ke = $(c), oe = Object.keys(E).filter(function(Fo) {
            return Fo !== "key";
          }), dr = oe.length > 0 ? "{key: someKey, " + oe.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!wn[ke + dr]) {
            var Ro = oe.length > 0 ? "{" + oe.join(": ..., ") + ": ...}" : "{}";
            h(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, dr, ke, Ro, ke), wn[ke + dr] = !0;
          }
        }
        return c === n ? Oo(K) : xo(K), K;
      }
    }
    function Po(c, E, x) {
      return En(c, E, x, !0);
    }
    function Ao(c, E, x) {
      return En(c, E, x, !1);
    }
    var To = Ao, $o = Po;
    dt.Fragment = n, dt.jsx = To, dt.jsxs = $o;
  }()), dt;
}
process.env.NODE_ENV === "production" ? Rr.exports = Vo() : Rr.exports = qo();
var R = Rr.exports;
function Go(t, e) {
  return Array.isArray(t) ? t.filter((r) => !e.includes(r)) : Object.keys(t).reduce((r, n) => (e.includes(n) || (r[n] = t[n]), r), {});
}
function oa(t, e) {
  return Array.isArray(t) ? t.filter((r) => e.includes(r)) : e.reduce((r, n) => (n in t && (r[n] = t[n]), r), {});
}
function zo(t) {
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
function pt(t) {
  return t ? (t = t.replace(/_/g, "-"), t = t.replace(/-+/g, "-"), /[A-Z]/.test(t) ? (t = t.replace(/\s+/g, "").replace(/_/g, "").replace(/(?:^|\s|-)+([A-Za-z])/g, (e, r) => r.toUpperCase()), t = t.replace(/(.)(?=[A-Z])/g, "$1-"), t.toLowerCase()) : t) : "";
}
var Ko = function(e) {
  return Xo(e) && !Jo(e);
};
function Xo(t) {
  return !!t && typeof t == "object";
}
function Jo(t) {
  var e = Object.prototype.toString.call(t);
  return e === "[object RegExp]" || e === "[object Date]" || ei(t);
}
var Qo = typeof Symbol == "function" && Symbol.for, Zo = Qo ? Symbol.for("react.element") : 60103;
function ei(t) {
  return t.$$typeof === Zo;
}
function ti(t) {
  return Array.isArray(t) ? [] : {};
}
function Pt(t, e) {
  return e.clone !== !1 && e.isMergeableObject(t) ? Ze(ti(t), t, e) : t;
}
function ri(t, e, r) {
  return t.concat(e).map(function(n) {
    return Pt(n, r);
  });
}
function ni(t, e) {
  if (!e.customMerge)
    return Ze;
  var r = e.customMerge(t);
  return typeof r == "function" ? r : Ze;
}
function ai(t) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(t).filter(function(e) {
    return Object.propertyIsEnumerable.call(t, e);
  }) : [];
}
function On(t) {
  return Object.keys(t).concat(ai(t));
}
function ia(t, e) {
  try {
    return e in t;
  } catch {
    return !1;
  }
}
function oi(t, e) {
  return ia(t, e) && !(Object.hasOwnProperty.call(t, e) && Object.propertyIsEnumerable.call(t, e));
}
function ii(t, e, r) {
  var n = {};
  return r.isMergeableObject(t) && On(t).forEach(function(a) {
    n[a] = Pt(t[a], r);
  }), On(e).forEach(function(a) {
    oi(t, a) || (ia(t, a) && r.isMergeableObject(e[a]) ? n[a] = ni(a, r)(t[a], e[a], r) : n[a] = Pt(e[a], r));
  }), n;
}
function Ze(t, e, r) {
  r = r || {}, r.arrayMerge = r.arrayMerge || ri, r.isMergeableObject = r.isMergeableObject || Ko, r.cloneUnlessOtherwiseSpecified = Pt;
  var n = Array.isArray(e), a = Array.isArray(t), o = n === a;
  return o ? n ? r.arrayMerge(t, e, r) : ii(t, e, r) : Pt(e, r);
}
Ze.all = function(e, r) {
  if (!Array.isArray(e))
    throw new Error("first argument should be an array");
  return e.reduce(function(n, a) {
    return Ze(n, a, r);
  }, {});
};
var li = Ze, ui = li;
const si = /* @__PURE__ */ Bo(ui);
var ci = Error, fi = EvalError, di = RangeError, pi = ReferenceError, la = SyntaxError, Tt = TypeError, yi = URIError, vi = function() {
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
}, Pn = typeof Symbol < "u" && Symbol, mi = vi, hi = function() {
  return typeof Pn != "function" || typeof Symbol != "function" || typeof Pn("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : mi();
}, pr = {
  __proto__: null,
  foo: {}
}, gi = Object, bi = function() {
  return { __proto__: pr }.foo === pr.foo && !(pr instanceof gi);
}, wi = "Function.prototype.bind called on incompatible ", Ei = Object.prototype.toString, Si = Math.max, xi = "[object Function]", An = function(e, r) {
  for (var n = [], a = 0; a < e.length; a += 1)
    n[a] = e[a];
  for (var o = 0; o < r.length; o += 1)
    n[o + e.length] = r[o];
  return n;
}, Oi = function(e, r) {
  for (var n = [], a = r, o = 0; a < e.length; a += 1, o += 1)
    n[o] = e[a];
  return n;
}, Pi = function(t, e) {
  for (var r = "", n = 0; n < t.length; n += 1)
    r += t[n], n + 1 < t.length && (r += e);
  return r;
}, Ai = function(e) {
  var r = this;
  if (typeof r != "function" || Ei.apply(r) !== xi)
    throw new TypeError(wi + r);
  for (var n = Oi(arguments, 1), a, o = function() {
    if (this instanceof a) {
      var s = r.apply(
        this,
        An(n, arguments)
      );
      return Object(s) === s ? s : this;
    }
    return r.apply(
      e,
      An(n, arguments)
    );
  }, l = Si(0, r.length - n.length), u = [], i = 0; i < l; i++)
    u[i] = "$" + i;
  if (a = Function("binder", "return function (" + Pi(u, ",") + "){ return binder.apply(this,arguments); }")(o), r.prototype) {
    var f = function() {
    };
    f.prototype = r.prototype, a.prototype = new f(), f.prototype = null;
  }
  return a;
}, Ti = Ai, zr = Function.prototype.bind || Ti, $i = Function.prototype.call, Ri = Object.prototype.hasOwnProperty, Fi = zr, Ii = Fi.call($i, Ri), I, Ci = ci, Mi = fi, _i = di, Di = pi, et = la, Qe = Tt, Ni = yi, ua = Function, yr = function(t) {
  try {
    return ua('"use strict"; return (' + t + ").constructor;")();
  } catch {
  }
}, Be = Object.getOwnPropertyDescriptor;
if (Be)
  try {
    Be({}, "");
  } catch {
    Be = null;
  }
var vr = function() {
  throw new Qe();
}, ki = Be ? function() {
  try {
    return arguments.callee, vr;
  } catch {
    try {
      return Be(arguments, "callee").get;
    } catch {
      return vr;
    }
  }
}() : vr, Ke = hi(), ji = bi(), Z = Object.getPrototypeOf || (ji ? function(t) {
  return t.__proto__;
} : null), Je = {}, Li = typeof Uint8Array > "u" || !Z ? I : Z(Uint8Array), He = {
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
  "%Error%": Ci,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": Mi,
  "%Float32Array%": typeof Float32Array > "u" ? I : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? I : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? I : FinalizationRegistry,
  "%Function%": ua,
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
  "%RangeError%": _i,
  "%ReferenceError%": Di,
  "%Reflect%": typeof Reflect > "u" ? I : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? I : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !Ke || !Z ? I : Z((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? I : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": Ke && Z ? Z(""[Symbol.iterator]()) : I,
  "%Symbol%": Ke ? Symbol : I,
  "%SyntaxError%": et,
  "%ThrowTypeError%": ki,
  "%TypedArray%": Li,
  "%TypeError%": Qe,
  "%Uint8Array%": typeof Uint8Array > "u" ? I : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? I : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? I : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? I : Uint32Array,
  "%URIError%": Ni,
  "%WeakMap%": typeof WeakMap > "u" ? I : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? I : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? I : WeakSet
};
if (Z)
  try {
    null.error;
  } catch (t) {
    var Wi = Z(Z(t));
    He["%Error.prototype%"] = Wi;
  }
var Ui = function t(e) {
  var r;
  if (e === "%AsyncFunction%")
    r = yr("async function () {}");
  else if (e === "%GeneratorFunction%")
    r = yr("function* () {}");
  else if (e === "%AsyncGeneratorFunction%")
    r = yr("async function* () {}");
  else if (e === "%AsyncGenerator%") {
    var n = t("%AsyncGeneratorFunction%");
    n && (r = n.prototype);
  } else if (e === "%AsyncIteratorPrototype%") {
    var a = t("%AsyncGenerator%");
    a && Z && (r = Z(a.prototype));
  }
  return He[e] = r, r;
}, Tn = {
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
}, $t = zr, Ut = Ii, Bi = $t.call(Function.call, Array.prototype.concat), Hi = $t.call(Function.apply, Array.prototype.splice), $n = $t.call(Function.call, String.prototype.replace), Bt = $t.call(Function.call, String.prototype.slice), Vi = $t.call(Function.call, RegExp.prototype.exec), qi = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, Gi = /\\(\\)?/g, zi = function(e) {
  var r = Bt(e, 0, 1), n = Bt(e, -1);
  if (r === "%" && n !== "%")
    throw new et("invalid intrinsic syntax, expected closing `%`");
  if (n === "%" && r !== "%")
    throw new et("invalid intrinsic syntax, expected opening `%`");
  var a = [];
  return $n(e, qi, function(o, l, u, i) {
    a[a.length] = u ? $n(i, Gi, "$1") : l || o;
  }), a;
}, Yi = function(e, r) {
  var n = e, a;
  if (Ut(Tn, n) && (a = Tn[n], n = "%" + a[0] + "%"), Ut(He, n)) {
    var o = He[n];
    if (o === Je && (o = Ui(n)), typeof o > "u" && !r)
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
  if (Vi(/^%?[^%]*%?$/, e) === null)
    throw new et("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var n = zi(e), a = n.length > 0 ? n[0] : "", o = Yi("%" + a + "%", r), l = o.name, u = o.value, i = !1, f = o.alias;
  f && (a = f[0], Hi(n, Bi([0, 1], f)));
  for (var s = 1, g = !0; s < n.length; s += 1) {
    var v = n[s], w = Bt(v, 0, 1), d = Bt(v, -1);
    if ((w === '"' || w === "'" || w === "`" || d === '"' || d === "'" || d === "`") && w !== d)
      throw new et("property names with quotes must have matching quotes");
    if ((v === "constructor" || !g) && (i = !0), a += "." + v, l = "%" + a + "%", Ut(He, l))
      u = He[l];
    else if (u != null) {
      if (!(v in u)) {
        if (!r)
          throw new Qe("base intrinsic for " + e + " exists, but the property is not available.");
        return;
      }
      if (Be && s + 1 >= n.length) {
        var y = Be(u, v);
        g = !!y, g && "get" in y && !("originalValue" in y.get) ? u = y.get : u = u[v];
      } else
        g = Ut(u, v), u = u[v];
      g && !i && (He[l] = u);
    }
  }
  return u;
}, sa = { exports: {} }, mr, Rn;
function Yr() {
  if (Rn) return mr;
  Rn = 1;
  var t = nt, e = t("%Object.defineProperty%", !0) || !1;
  if (e)
    try {
      e({}, "a", { value: 1 });
    } catch {
      e = !1;
    }
  return mr = e, mr;
}
var Ki = nt, jt = Ki("%Object.getOwnPropertyDescriptor%", !0);
if (jt)
  try {
    jt([], "length");
  } catch {
    jt = null;
  }
var ca = jt, Fn = Yr(), Xi = la, Xe = Tt, In = ca, Ji = function(e, r, n) {
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
  var a = arguments.length > 3 ? arguments[3] : null, o = arguments.length > 4 ? arguments[4] : null, l = arguments.length > 5 ? arguments[5] : null, u = arguments.length > 6 ? arguments[6] : !1, i = !!In && In(e, r);
  if (Fn)
    Fn(e, r, {
      configurable: l === null && i ? i.configurable : !l,
      enumerable: a === null && i ? i.enumerable : !a,
      value: n,
      writable: o === null && i ? i.writable : !o
    });
  else if (u || !a && !o && !l)
    e[r] = n;
  else
    throw new Xi("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
}, Fr = Yr(), fa = function() {
  return !!Fr;
};
fa.hasArrayLengthDefineBug = function() {
  if (!Fr)
    return null;
  try {
    return Fr([], "length", { value: 1 }).length !== 1;
  } catch {
    return !0;
  }
};
var Qi = fa, Zi = nt, Cn = Ji, el = Qi(), Mn = ca, _n = Tt, tl = Zi("%Math.floor%"), rl = function(e, r) {
  if (typeof e != "function")
    throw new _n("`fn` is not a function");
  if (typeof r != "number" || r < 0 || r > 4294967295 || tl(r) !== r)
    throw new _n("`length` must be a positive 32-bit integer");
  var n = arguments.length > 2 && !!arguments[2], a = !0, o = !0;
  if ("length" in e && Mn) {
    var l = Mn(e, "length");
    l && !l.configurable && (a = !1), l && !l.writable && (o = !1);
  }
  return (a || o || !n) && (el ? Cn(
    /** @type {Parameters<define>[0]} */
    e,
    "length",
    r,
    !0,
    !0
  ) : Cn(
    /** @type {Parameters<define>[0]} */
    e,
    "length",
    r
  )), e;
};
(function(t) {
  var e = zr, r = nt, n = rl, a = Tt, o = r("%Function.prototype.apply%"), l = r("%Function.prototype.call%"), u = r("%Reflect.apply%", !0) || e.call(l, o), i = Yr(), f = r("%Math.max%");
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
})(sa);
var nl = sa.exports, da = nt, pa = nl, al = pa(da("String.prototype.indexOf")), ol = function(e, r) {
  var n = da(e, !!r);
  return typeof n == "function" && al(e, ".prototype.") > -1 ? pa(n) : n;
};
const il = {}, ll = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: il
}, Symbol.toStringTag, { value: "Module" })), ul = /* @__PURE__ */ Ho(ll);
var Kr = typeof Map == "function" && Map.prototype, hr = Object.getOwnPropertyDescriptor && Kr ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, Ht = Kr && hr && typeof hr.get == "function" ? hr.get : null, Dn = Kr && Map.prototype.forEach, Xr = typeof Set == "function" && Set.prototype, gr = Object.getOwnPropertyDescriptor && Xr ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, Vt = Xr && gr && typeof gr.get == "function" ? gr.get : null, Nn = Xr && Set.prototype.forEach, sl = typeof WeakMap == "function" && WeakMap.prototype, bt = sl ? WeakMap.prototype.has : null, cl = typeof WeakSet == "function" && WeakSet.prototype, wt = cl ? WeakSet.prototype.has : null, fl = typeof WeakRef == "function" && WeakRef.prototype, kn = fl ? WeakRef.prototype.deref : null, dl = Boolean.prototype.valueOf, pl = Object.prototype.toString, yl = Function.prototype.toString, vl = String.prototype.match, Jr = String.prototype.slice, Re = String.prototype.replace, ml = String.prototype.toUpperCase, jn = String.prototype.toLowerCase, ya = RegExp.prototype.test, Ln = Array.prototype.concat, Ee = Array.prototype.join, hl = Array.prototype.slice, Wn = Math.floor, Ir = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, br = Object.getOwnPropertySymbols, Cr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, tt = typeof Symbol == "function" && typeof Symbol.iterator == "object", re = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === tt || !0) ? Symbol.toStringTag : null, va = Object.prototype.propertyIsEnumerable, Un = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(t) {
  return t.__proto__;
} : null);
function Bn(t, e) {
  if (t === 1 / 0 || t === -1 / 0 || t !== t || t && t > -1e3 && t < 1e3 || ya.call(/e/, e))
    return e;
  var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof t == "number") {
    var n = t < 0 ? -Wn(-t) : Wn(t);
    if (n !== t) {
      var a = String(n), o = Jr.call(e, a.length + 1);
      return Re.call(a, r, "$&_") + "." + Re.call(Re.call(o, /([0-9]{3})/g, "$&_"), /_$/, "");
    }
  }
  return Re.call(e, r, "$&_");
}
var Mr = ul, Hn = Mr.custom, Vn = ha(Hn) ? Hn : null, gl = function t(e, r, n, a) {
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
    return ba(e, o);
  if (typeof e == "number") {
    if (e === 0)
      return 1 / 0 / e > 0 ? "0" : "-0";
    var i = String(e);
    return u ? Bn(e, i) : i;
  }
  if (typeof e == "bigint") {
    var f = String(e) + "n";
    return u ? Bn(e, f) : f;
  }
  var s = typeof o.depth > "u" ? 5 : o.depth;
  if (typeof n > "u" && (n = 0), n >= s && s > 0 && typeof e == "object")
    return _r(e) ? "[Array]" : "[Object]";
  var g = Nl(o, n);
  if (typeof a > "u")
    a = [];
  else if (ga(a, e) >= 0)
    return "[Circular]";
  function v($, T, D) {
    if (T && (a = hl.call(a), a.push(T)), D) {
      var ue = {
        depth: o.depth
      };
      return Te(o, "quoteStyle") && (ue.quoteStyle = o.quoteStyle), t($, ue, n + 1, a);
    }
    return t($, o, n + 1, a);
  }
  if (typeof e == "function" && !qn(e)) {
    var w = Tl(e), d = _t(e, v);
    return "[Function" + (w ? ": " + w : " (anonymous)") + "]" + (d.length > 0 ? " { " + Ee.call(d, ", ") + " }" : "");
  }
  if (ha(e)) {
    var y = tt ? Re.call(String(e), /^(Symbol\(.*\))_[^)]*$/, "$1") : Cr.call(e);
    return typeof e == "object" && !tt ? yt(y) : y;
  }
  if (Ml(e)) {
    for (var p = "<" + jn.call(String(e.nodeName)), m = e.attributes || [], h = 0; h < m.length; h++)
      p += " " + m[h].name + "=" + ma(bl(m[h].value), "double", o);
    return p += ">", e.childNodes && e.childNodes.length && (p += "..."), p += "</" + jn.call(String(e.nodeName)) + ">", p;
  }
  if (_r(e)) {
    if (e.length === 0)
      return "[]";
    var b = _t(e, v);
    return g && !Dl(b) ? "[" + Dr(b, g) + "]" : "[ " + Ee.call(b, ", ") + " ]";
  }
  if (El(e)) {
    var S = _t(e, v);
    return !("cause" in Error.prototype) && "cause" in e && !va.call(e, "cause") ? "{ [" + String(e) + "] " + Ee.call(Ln.call("[cause]: " + v(e.cause), S), ", ") + " }" : S.length === 0 ? "[" + String(e) + "]" : "{ [" + String(e) + "] " + Ee.call(S, ", ") + " }";
  }
  if (typeof e == "object" && l) {
    if (Vn && typeof e[Vn] == "function" && Mr)
      return Mr(e, { depth: s - n });
    if (l !== "symbol" && typeof e.inspect == "function")
      return e.inspect();
  }
  if ($l(e)) {
    var O = [];
    return Dn && Dn.call(e, function($, T) {
      O.push(v(T, e, !0) + " => " + v($, e));
    }), Gn("Map", Ht.call(e), O, g);
  }
  if (Il(e)) {
    var _ = [];
    return Nn && Nn.call(e, function($) {
      _.push(v($, e));
    }), Gn("Set", Vt.call(e), _, g);
  }
  if (Rl(e))
    return wr("WeakMap");
  if (Cl(e))
    return wr("WeakSet");
  if (Fl(e))
    return wr("WeakRef");
  if (xl(e))
    return yt(v(Number(e)));
  if (Pl(e))
    return yt(v(Ir.call(e)));
  if (Ol(e))
    return yt(dl.call(e));
  if (Sl(e))
    return yt(v(String(e)));
  if (typeof window < "u" && e === window)
    return "{ [object Window] }";
  if (typeof globalThis < "u" && e === globalThis || typeof $r < "u" && e === $r)
    return "{ [object globalThis] }";
  if (!wl(e) && !qn(e)) {
    var M = _t(e, v), W = Un ? Un(e) === Object.prototype : e instanceof Object || e.constructor === Object, H = e instanceof Object ? "" : "null prototype", j = !W && re && Object(e) === e && re in e ? Jr.call(Ce(e), 8, -1) : H ? "Object" : "", Y = W || typeof e.constructor != "function" ? "" : e.constructor.name ? e.constructor.name + " " : "", V = Y + (j || H ? "[" + Ee.call(Ln.call([], j || [], H || []), ": ") + "] " : "");
    return M.length === 0 ? V + "{}" : g ? V + "{" + Dr(M, g) + "}" : V + "{ " + Ee.call(M, ", ") + " }";
  }
  return String(e);
};
function ma(t, e, r) {
  var n = (r.quoteStyle || e) === "double" ? '"' : "'";
  return n + t + n;
}
function bl(t) {
  return Re.call(String(t), /"/g, "&quot;");
}
function _r(t) {
  return Ce(t) === "[object Array]" && (!re || !(typeof t == "object" && re in t));
}
function wl(t) {
  return Ce(t) === "[object Date]" && (!re || !(typeof t == "object" && re in t));
}
function qn(t) {
  return Ce(t) === "[object RegExp]" && (!re || !(typeof t == "object" && re in t));
}
function El(t) {
  return Ce(t) === "[object Error]" && (!re || !(typeof t == "object" && re in t));
}
function Sl(t) {
  return Ce(t) === "[object String]" && (!re || !(typeof t == "object" && re in t));
}
function xl(t) {
  return Ce(t) === "[object Number]" && (!re || !(typeof t == "object" && re in t));
}
function Ol(t) {
  return Ce(t) === "[object Boolean]" && (!re || !(typeof t == "object" && re in t));
}
function ha(t) {
  if (tt)
    return t && typeof t == "object" && t instanceof Symbol;
  if (typeof t == "symbol")
    return !0;
  if (!t || typeof t != "object" || !Cr)
    return !1;
  try {
    return Cr.call(t), !0;
  } catch {
  }
  return !1;
}
function Pl(t) {
  if (!t || typeof t != "object" || !Ir)
    return !1;
  try {
    return Ir.call(t), !0;
  } catch {
  }
  return !1;
}
var Al = Object.prototype.hasOwnProperty || function(t) {
  return t in this;
};
function Te(t, e) {
  return Al.call(t, e);
}
function Ce(t) {
  return pl.call(t);
}
function Tl(t) {
  if (t.name)
    return t.name;
  var e = vl.call(yl.call(t), /^function\s*([\w$]+)/);
  return e ? e[1] : null;
}
function ga(t, e) {
  if (t.indexOf)
    return t.indexOf(e);
  for (var r = 0, n = t.length; r < n; r++)
    if (t[r] === e)
      return r;
  return -1;
}
function $l(t) {
  if (!Ht || !t || typeof t != "object")
    return !1;
  try {
    Ht.call(t);
    try {
      Vt.call(t);
    } catch {
      return !0;
    }
    return t instanceof Map;
  } catch {
  }
  return !1;
}
function Rl(t) {
  if (!bt || !t || typeof t != "object")
    return !1;
  try {
    bt.call(t, bt);
    try {
      wt.call(t, wt);
    } catch {
      return !0;
    }
    return t instanceof WeakMap;
  } catch {
  }
  return !1;
}
function Fl(t) {
  if (!kn || !t || typeof t != "object")
    return !1;
  try {
    return kn.call(t), !0;
  } catch {
  }
  return !1;
}
function Il(t) {
  if (!Vt || !t || typeof t != "object")
    return !1;
  try {
    Vt.call(t);
    try {
      Ht.call(t);
    } catch {
      return !0;
    }
    return t instanceof Set;
  } catch {
  }
  return !1;
}
function Cl(t) {
  if (!wt || !t || typeof t != "object")
    return !1;
  try {
    wt.call(t, wt);
    try {
      bt.call(t, bt);
    } catch {
      return !0;
    }
    return t instanceof WeakSet;
  } catch {
  }
  return !1;
}
function Ml(t) {
  return !t || typeof t != "object" ? !1 : typeof HTMLElement < "u" && t instanceof HTMLElement ? !0 : typeof t.nodeName == "string" && typeof t.getAttribute == "function";
}
function ba(t, e) {
  if (t.length > e.maxStringLength) {
    var r = t.length - e.maxStringLength, n = "... " + r + " more character" + (r > 1 ? "s" : "");
    return ba(Jr.call(t, 0, e.maxStringLength), e) + n;
  }
  var a = Re.call(Re.call(t, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, _l);
  return ma(a, "single", e);
}
function _l(t) {
  var e = t.charCodeAt(0), r = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[e];
  return r ? "\\" + r : "\\x" + (e < 16 ? "0" : "") + ml.call(e.toString(16));
}
function yt(t) {
  return "Object(" + t + ")";
}
function wr(t) {
  return t + " { ? }";
}
function Gn(t, e, r, n) {
  var a = n ? Dr(r, n) : Ee.call(r, ", ");
  return t + " (" + e + ") {" + a + "}";
}
function Dl(t) {
  for (var e = 0; e < t.length; e++)
    if (ga(t[e], `
`) >= 0)
      return !1;
  return !0;
}
function Nl(t, e) {
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
function Dr(t, e) {
  if (t.length === 0)
    return "";
  var r = `
` + e.prev + e.base;
  return r + Ee.call(t, "," + r) + `
` + e.prev;
}
function _t(t, e) {
  var r = _r(t), n = [];
  if (r) {
    n.length = t.length;
    for (var a = 0; a < t.length; a++)
      n[a] = Te(t, a) ? e(t[a], t) : "";
  }
  var o = typeof br == "function" ? br(t) : [], l;
  if (tt) {
    l = {};
    for (var u = 0; u < o.length; u++)
      l["$" + o[u]] = o[u];
  }
  for (var i in t)
    Te(t, i) && (r && String(Number(i)) === i && i < t.length || tt && l["$" + i] instanceof Symbol || (ya.call(/[^\w$]/, i) ? n.push(e(i, t) + ": " + e(t[i], t)) : n.push(i + ": " + e(t[i], t))));
  if (typeof br == "function")
    for (var f = 0; f < o.length; f++)
      va.call(t, o[f]) && n.push("[" + e(o[f]) + "]: " + e(t[o[f]], t));
  return n;
}
var wa = nt, at = ol, kl = gl, jl = Tt, Dt = wa("%WeakMap%", !0), Nt = wa("%Map%", !0), Ll = at("WeakMap.prototype.get", !0), Wl = at("WeakMap.prototype.set", !0), Ul = at("WeakMap.prototype.has", !0), Bl = at("Map.prototype.get", !0), Hl = at("Map.prototype.set", !0), Vl = at("Map.prototype.has", !0), Qr = function(t, e) {
  for (var r = t, n; (n = r.next) !== null; r = n)
    if (n.key === e)
      return r.next = n.next, n.next = /** @type {NonNullable<typeof list.next>} */
      t.next, t.next = n, n;
}, ql = function(t, e) {
  var r = Qr(t, e);
  return r && r.value;
}, Gl = function(t, e, r) {
  var n = Qr(t, e);
  n ? n.value = r : t.next = /** @type {import('.').ListNode<typeof value>} */
  {
    // eslint-disable-line no-param-reassign, no-extra-parens
    key: e,
    next: t.next,
    value: r
  };
}, zl = function(t, e) {
  return !!Qr(t, e);
}, Yl = function() {
  var e, r, n, a = {
    assert: function(o) {
      if (!a.has(o))
        throw new jl("Side channel does not contain " + kl(o));
    },
    get: function(o) {
      if (Dt && o && (typeof o == "object" || typeof o == "function")) {
        if (e)
          return Ll(e, o);
      } else if (Nt) {
        if (r)
          return Bl(r, o);
      } else if (n)
        return ql(n, o);
    },
    has: function(o) {
      if (Dt && o && (typeof o == "object" || typeof o == "function")) {
        if (e)
          return Ul(e, o);
      } else if (Nt) {
        if (r)
          return Vl(r, o);
      } else if (n)
        return zl(n, o);
      return !1;
    },
    set: function(o, l) {
      Dt && o && (typeof o == "object" || typeof o == "function") ? (e || (e = new Dt()), Wl(e, o, l)) : Nt ? (r || (r = new Nt()), Hl(r, o, l)) : (n || (n = { key: {}, next: null }), Gl(n, o, l));
    }
  };
  return a;
}, Kl = String.prototype.replace, Xl = /%20/g, Er = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
}, Zr = {
  default: Er.RFC3986,
  formatters: {
    RFC1738: function(t) {
      return Kl.call(t, Xl, "+");
    },
    RFC3986: function(t) {
      return String(t);
    }
  },
  RFC1738: Er.RFC1738,
  RFC3986: Er.RFC3986
}, Jl = Zr, Sr = Object.prototype.hasOwnProperty, Le = Array.isArray, be = function() {
  for (var t = [], e = 0; e < 256; ++e)
    t.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());
  return t;
}(), Ql = function(e) {
  for (; e.length > 1; ) {
    var r = e.pop(), n = r.obj[r.prop];
    if (Le(n)) {
      for (var a = [], o = 0; o < n.length; ++o)
        typeof n[o] < "u" && a.push(n[o]);
      r.obj[r.prop] = a;
    }
  }
}, Ea = function(e, r) {
  for (var n = r && r.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, a = 0; a < e.length; ++a)
    typeof e[a] < "u" && (n[a] = e[a]);
  return n;
}, Zl = function t(e, r, n) {
  if (!r)
    return e;
  if (typeof r != "object") {
    if (Le(e))
      e.push(r);
    else if (e && typeof e == "object")
      (n && (n.plainObjects || n.allowPrototypes) || !Sr.call(Object.prototype, r)) && (e[r] = !0);
    else
      return [e, r];
    return e;
  }
  if (!e || typeof e != "object")
    return [e].concat(r);
  var a = e;
  return Le(e) && !Le(r) && (a = Ea(e, n)), Le(e) && Le(r) ? (r.forEach(function(o, l) {
    if (Sr.call(e, l)) {
      var u = e[l];
      u && typeof u == "object" && o && typeof o == "object" ? e[l] = t(u, o, n) : e.push(o);
    } else
      e[l] = o;
  }), e) : Object.keys(r).reduce(function(o, l) {
    var u = r[l];
    return Sr.call(o, l) ? o[l] = t(o[l], u, n) : o[l] = u, o;
  }, a);
}, eu = function(e, r) {
  return Object.keys(r).reduce(function(n, a) {
    return n[a] = r[a], n;
  }, e);
}, tu = function(t, e, r) {
  var n = t.replace(/\+/g, " ");
  if (r === "iso-8859-1")
    return n.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n);
  } catch {
    return n;
  }
}, xr = 1024, ru = function(e, r, n, a, o) {
  if (e.length === 0)
    return e;
  var l = e;
  if (typeof e == "symbol" ? l = Symbol.prototype.toString.call(e) : typeof e != "string" && (l = String(e)), n === "iso-8859-1")
    return escape(l).replace(/%u[0-9a-f]{4}/gi, function(w) {
      return "%26%23" + parseInt(w.slice(2), 16) + "%3B";
    });
  for (var u = "", i = 0; i < l.length; i += xr) {
    for (var f = l.length >= xr ? l.slice(i, i + xr) : l, s = [], g = 0; g < f.length; ++g) {
      var v = f.charCodeAt(g);
      if (v === 45 || v === 46 || v === 95 || v === 126 || v >= 48 && v <= 57 || v >= 65 && v <= 90 || v >= 97 && v <= 122 || o === Jl.RFC1738 && (v === 40 || v === 41)) {
        s[s.length] = f.charAt(g);
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
      g += 1, v = 65536 + ((v & 1023) << 10 | f.charCodeAt(g) & 1023), s[s.length] = be[240 | v >> 18] + be[128 | v >> 12 & 63] + be[128 | v >> 6 & 63] + be[128 | v & 63];
    }
    u += s.join("");
  }
  return u;
}, nu = function(e) {
  for (var r = [{ obj: { o: e }, prop: "o" }], n = [], a = 0; a < r.length; ++a)
    for (var o = r[a], l = o.obj[o.prop], u = Object.keys(l), i = 0; i < u.length; ++i) {
      var f = u[i], s = l[f];
      typeof s == "object" && s !== null && n.indexOf(s) === -1 && (r.push({ obj: l, prop: f }), n.push(s));
    }
  return Ql(r), e;
}, au = function(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}, ou = function(e) {
  return !e || typeof e != "object" ? !1 : !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e));
}, iu = function(e, r) {
  return [].concat(e, r);
}, lu = function(e, r) {
  if (Le(e)) {
    for (var n = [], a = 0; a < e.length; a += 1)
      n.push(r(e[a]));
    return n;
  }
  return r(e);
}, Sa = {
  arrayToObject: Ea,
  assign: eu,
  combine: iu,
  compact: nu,
  decode: tu,
  encode: ru,
  isBuffer: ou,
  isRegExp: au,
  maybeMap: lu,
  merge: Zl
}, xa = Yl, Lt = Sa, Et = Zr, uu = Object.prototype.hasOwnProperty, Oa = {
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
}, we = Array.isArray, su = Array.prototype.push, Pa = function(t, e) {
  su.apply(t, we(e) ? e : [e]);
}, cu = Date.prototype.toISOString, zn = Et.default, X = {
  addQueryPrefix: !1,
  allowDots: !1,
  allowEmptyArrays: !1,
  arrayFormat: "indices",
  charset: "utf-8",
  charsetSentinel: !1,
  delimiter: "&",
  encode: !0,
  encodeDotInKeys: !1,
  encoder: Lt.encode,
  encodeValuesOnly: !1,
  format: zn,
  formatter: Et.formatters[zn],
  // deprecated
  indices: !1,
  serializeDate: function(e) {
    return cu.call(e);
  },
  skipNulls: !1,
  strictNullHandling: !1
}, fu = function(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean" || typeof e == "symbol" || typeof e == "bigint";
}, Or = {}, du = function t(e, r, n, a, o, l, u, i, f, s, g, v, w, d, y, p, m, h) {
  for (var b = e, S = h, O = 0, _ = !1; (S = S.get(Or)) !== void 0 && !_; ) {
    var M = S.get(e);
    if (O += 1, typeof M < "u") {
      if (M === O)
        throw new RangeError("Cyclic object value");
      _ = !0;
    }
    typeof S.get(Or) > "u" && (O = 0);
  }
  if (typeof s == "function" ? b = s(r, b) : b instanceof Date ? b = w(b) : n === "comma" && we(b) && (b = Lt.maybeMap(b, function(ye) {
    return ye instanceof Date ? w(ye) : ye;
  })), b === null) {
    if (l)
      return f && !p ? f(r, X.encoder, m, "key", d) : r;
    b = "";
  }
  if (fu(b) || Lt.isBuffer(b)) {
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
    p && f && (b = Lt.maybeMap(b, f)), j = [{ value: b.length > 0 ? b.join(",") || null : void 0 }];
  else if (we(s))
    j = s;
  else {
    var Y = Object.keys(b);
    j = g ? Y.sort(g) : Y;
  }
  var V = i ? r.replace(/\./g, "%2E") : r, $ = a && we(b) && b.length === 1 ? V + "[]" : V;
  if (o && we(b) && b.length === 0)
    return $ + "[]";
  for (var T = 0; T < j.length; ++T) {
    var D = j[T], ue = typeof D == "object" && typeof D.value < "u" ? D.value : b[D];
    if (!(u && ue === null)) {
      var pe = v && i ? D.replace(/\./g, "%2E") : D, ge = we(b) ? typeof n == "function" ? n($, pe) : $ : $ + (v ? "." + pe : "[" + pe + "]");
      h.set(e, O);
      var te = xa();
      te.set(Or, h), Pa(H, t(
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
        g,
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
}, pu = function(e) {
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
  var n = Et.default;
  if (typeof e.format < "u") {
    if (!uu.call(Et.formatters, e.format))
      throw new TypeError("Unknown format option provided.");
    n = e.format;
  }
  var a = Et.formatters[n], o = X.filter;
  (typeof e.filter == "function" || we(e.filter)) && (o = e.filter);
  var l;
  if (e.arrayFormat in Oa ? l = e.arrayFormat : "indices" in e ? l = e.indices ? "indices" : "repeat" : l = X.arrayFormat, "commaRoundTrip" in e && typeof e.commaRoundTrip != "boolean")
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
}, yu = function(t, e) {
  var r = t, n = pu(e), a, o;
  typeof n.filter == "function" ? (o = n.filter, r = o("", r)) : we(n.filter) && (o = n.filter, a = o);
  var l = [];
  if (typeof r != "object" || r === null)
    return "";
  var u = Oa[n.arrayFormat], i = u === "comma" && n.commaRoundTrip;
  a || (a = Object.keys(r)), n.sort && a.sort(n.sort);
  for (var f = xa(), s = 0; s < a.length; ++s) {
    var g = a[s];
    n.skipNulls && r[g] === null || Pa(l, du(
      r[g],
      g,
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
}, rt = Sa, Nr = Object.prototype.hasOwnProperty, vu = Array.isArray, B = {
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
}, mu = function(t) {
  return t.replace(/&#(\d+);/g, function(e, r) {
    return String.fromCharCode(parseInt(r, 10));
  });
}, Aa = function(t, e) {
  return t && typeof t == "string" && e.comma && t.indexOf(",") > -1 ? t.split(",") : t;
}, hu = "utf8=%26%2310003%3B", gu = "utf8=%E2%9C%93", bu = function(e, r) {
  var n = { __proto__: null }, a = r.ignoreQueryPrefix ? e.replace(/^\?/, "") : e;
  a = a.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  var o = r.parameterLimit === 1 / 0 ? void 0 : r.parameterLimit, l = a.split(r.delimiter, o), u = -1, i, f = r.charset;
  if (r.charsetSentinel)
    for (i = 0; i < l.length; ++i)
      l[i].indexOf("utf8=") === 0 && (l[i] === gu ? f = "utf-8" : l[i] === hu && (f = "iso-8859-1"), u = i, i = l.length);
  for (i = 0; i < l.length; ++i)
    if (i !== u) {
      var s = l[i], g = s.indexOf("]="), v = g === -1 ? s.indexOf("=") : g + 1, w, d;
      v === -1 ? (w = r.decoder(s, B.decoder, f, "key"), d = r.strictNullHandling ? null : "") : (w = r.decoder(s.slice(0, v), B.decoder, f, "key"), d = rt.maybeMap(
        Aa(s.slice(v + 1), r),
        function(p) {
          return r.decoder(p, B.decoder, f, "value");
        }
      )), d && r.interpretNumericEntities && f === "iso-8859-1" && (d = mu(d)), s.indexOf("[]=") > -1 && (d = vu(d) ? [d] : d);
      var y = Nr.call(n, w);
      y && r.duplicates === "combine" ? n[w] = rt.combine(n[w], d) : (!y || r.duplicates === "last") && (n[w] = d);
    }
  return n;
}, wu = function(t, e, r, n) {
  for (var a = n ? e : Aa(e, r), o = t.length - 1; o >= 0; --o) {
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
}, Eu = function(e, r, n, a) {
  if (e) {
    var o = n.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e, l = /(\[[^[\]]*])/, u = /(\[[^[\]]*])/g, i = n.depth > 0 && l.exec(o), f = i ? o.slice(0, i.index) : o, s = [];
    if (f) {
      if (!n.plainObjects && Nr.call(Object.prototype, f) && !n.allowPrototypes)
        return;
      s.push(f);
    }
    for (var g = 0; n.depth > 0 && (i = u.exec(o)) !== null && g < n.depth; ) {
      if (g += 1, !n.plainObjects && Nr.call(Object.prototype, i[1].slice(1, -1)) && !n.allowPrototypes)
        return;
      s.push(i[1]);
    }
    if (i) {
      if (n.strictDepth === !0)
        throw new RangeError("Input depth exceeded depth option of " + n.depth + " and strictDepth is true");
      s.push("[" + o.slice(i.index) + "]");
    }
    return wu(s, r, n, a);
  }
}, Su = function(e) {
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
}, xu = function(t, e) {
  var r = Su(e);
  if (t === "" || t === null || typeof t > "u")
    return r.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var n = typeof t == "string" ? bu(t, r) : t, a = r.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, o = Object.keys(n), l = 0; l < o.length; ++l) {
    var u = o[l], i = Eu(u, n[u], r, typeof t == "string");
    a = rt.merge(a, i, r);
  }
  return r.allowSparse === !0 ? a : rt.compact(a);
}, Ou = yu, Pu = xu, Au = Zr, Yn = {
  formats: Au,
  parse: Pu,
  stringify: Ou
}, Tu = { exports: {} };
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */
(function(t, e) {
  (function(r, n) {
    t.exports = n();
  })($r, function() {
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
      var p = r.render(!y), m = p.querySelector(n.barSelector), h = n.speed, b = n.easing;
      return p.offsetWidth, u(function(S) {
        n.positionUsing === "" && (n.positionUsing = r.getPositioningCSS()), i(m, l(d, h, b)), d === 1 ? (i(p, {
          transition: "none",
          opacity: 1
        }), p.offsetWidth, setTimeout(function() {
          i(p, {
            transition: "all " + h + "ms linear",
            opacity: 0
          }), setTimeout(function() {
            r.remove(), S();
          }, h);
        }, h)) : setTimeout(S, h);
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
      var p = y.querySelector(n.barSelector), m = d ? "-100" : o(r.status || 0), h = document.querySelector(n.parent), b;
      return i(p, {
        transition: "all 0 linear",
        transform: "translate3d(" + m + "%,0,0)"
      }), n.showSpinner || (b = y.querySelector(n.spinnerSelector), b && w(b)), h != document.body && s(h, "nprogress-custom-parent"), h.appendChild(y), y;
    }, r.remove = function() {
      g(document.documentElement, "nprogress-busy"), g(document.querySelector(n.parent), "nprogress-custom-parent");
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
      function h(S) {
        return S = p(S), y[S] || (y[S] = m(S));
      }
      function b(S, O, _) {
        O = h(O), S.style[O] = _;
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
    function g(d, y) {
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
})(Tu);
function $u(t, e, r, n = "brackets") {
  let a = /^https?:\/\//.test(e.toString()), o = a || e.toString().startsWith("/"), l = !o && !e.toString().startsWith("#") && !e.toString().startsWith("?"), u = e.toString().includes("?") || t === "get" && Object.keys(r).length, i = e.toString().includes("#"), f = new URL(e.toString(), "http://localhost");
  return t === "get" && Object.keys(r).length && (f.search = Yn.stringify(si(Yn.parse(f.search, { ignoreQueryPrefix: !0 }), r), { encodeValuesOnly: !0, arrayFormat: n }), r = {}), [[a ? `${f.protocol}//${f.host}` : "", o ? f.pathname : "", l ? f.pathname.substring(1) : "", u ? f.search : "", i ? f.hash : ""].join(""), r];
}
const Xt = fe(null);
Xt.displayName = "ModalStackContext";
let Ta = null, $a = null, St = null, kr = null, jr = [];
const Ru = ({ children: t }) => {
  const [e, r] = Q([]), [n, a] = Q({}), o = (y) => {
    r((p) => {
      const m = y([...p]), h = (b) => {
        var S;
        return m.length < 2 ? !0 : ((S = m.map((O) => ({ id: O.id, shouldRender: O.shouldRender })).reverse().find((O) => O.shouldRender)) == null ? void 0 : S.id) === b;
      };
      return m.forEach((b, S) => {
        m[S].onTopOfStack = h(b.id), m[S].getParentModal = () => S < 1 ? null : m.slice(0, S).reverse().find((O) => O.isOpen), m[S].getChildModal = () => S === m.length - 1 ? null : m.slice(S + 1).find((O) => O.isOpen);
      }), m;
    });
  };
  z(() => {
    jr = e;
  }, [e]);
  class l {
    constructor(p, m, h, b, S) {
      ce(this, "update", (p, m, h) => {
        o(
          (b) => b.map((S) => (S.id === this.id && (S.config = p, S.onCloseCallback = m, S.afterLeaveCallback = h), S))
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
            var h;
            return m.id === this.id && m.isOpen && (Object.keys(m.listeners).forEach((b) => {
              m.off(b);
            }), m.isOpen = !1, (h = m.onCloseCallback) == null || h.call(m)), m;
          })
        );
      });
      ce(this, "afterLeave", () => {
        this.isOpen || o((p) => {
          const m = p.map((h) => {
            var b;
            return h.id === this.id && !h.isOpen && (h.shouldRender = !1, (b = h.afterLeaveCallback) == null || b.call(h), h.afterLeaveCallback = null), h;
          });
          return this.index === 0 ? [] : m;
        });
      });
      ce(this, "on", (p, m) => {
        p = pt(p), this.listeners[p] = this.listeners[p] ?? [], this.listeners[p].push(m);
      });
      ce(this, "off", (p, m) => {
        var h;
        p = pt(p), m ? this.listeners[p] = ((h = this.listeners[p]) == null ? void 0 : h.filter((b) => b !== m)) ?? [] : delete this.listeners[p];
      });
      ce(this, "emit", (p, ...m) => {
        var h;
        (h = this.listeners[pt(p)]) == null || h.forEach((b) => b(...m));
      });
      ce(this, "registerEventListenersFromProps", (p) => {
        const m = [];
        return Object.keys(p).filter((h) => h.startsWith("on")).forEach((h) => {
          const b = pt(h).replace(/^on-/, "");
          this.on(b, p[h]), m.push(() => this.off(b, p[h]));
        }), () => m.forEach((h) => h());
      });
      ce(this, "reload", (p = {}) => {
        var h;
        let m = Object.keys(this.response.props);
        p.only && (m = oa(m, p.only)), p.except && (m = Go(m, p.except)), (h = this.response) != null && h.url && Wt.get(this.response.url, {
          headers: {
            Accept: "text/html, application/xhtml+xml",
            "X-Inertia": !0,
            "X-Inertia-Partial-Component": this.response.component,
            "X-Inertia-Version": this.response.version,
            "X-Inertia-Partial-Data": m.join(","),
            "X-InertiaUI-Modal": !0,
            "X-InertiaUI-Modal-Use-Router": 0,
            "X-InertiaUI-Modal-Base-Url": St
          }
        }).then((b) => {
          this.updateProps(b.data.props);
        });
      });
      ce(this, "updateProps", (p) => {
        Object.assign(this.props, p), o((m) => m);
      });
      this.id = l.generateId(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = p, this.props = m.props, this.response = m, this.config = h, this.onCloseCallback = b, this.afterLeaveCallback = S, this.index = -1, this.getParentModal = () => null, this.getChildModal = () => null, this.onTopOfStack = !0;
    }
    static generateId() {
      return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `inertiaui_modal_${crypto.randomUUID()}` : `inertiaui_modal_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
    }
  }
  const u = (y, p = {}, m = null, h = null) => $a(y.component).then((b) => i(b, y, p, m, h)), i = (y, p, m, h, b) => {
    const S = new l(y, p, m, h, b);
    return S.index = e.length, o((O) => [...O, S]), S.show(), S;
  };
  function f(y, p, m, h) {
    if (!n[y])
      throw new Error(`The local modal "${y}" has not been registered.`);
    const b = i(null, {}, p, m, h);
    return b.name = y, n[y].callback(b), b;
  }
  const s = (y, p = {}) => g(
    y,
    p.method ?? "get",
    p.data ?? {},
    p.headers ?? {},
    p.config ?? {},
    p.onClose,
    p.onAfterLeave,
    p.queryStringArrayFormat ?? "brackets",
    p.navigate ?? Gr("navigate")
  ).then((m) => {
    const h = p.listeners ?? {};
    return Object.keys(h).forEach((b) => {
      const S = pt(b);
      m.on(S, h[b]);
    }), m;
  }), g = (y, p, m = {}, h = {}, b = {}, S = null, O = null, _ = "brackets", M = !1) => new Promise((W, H) => {
    if (y.startsWith("#")) {
      W(f(y.substring(1), b, S, O));
      return;
    }
    const [j, Y] = $u(p, y || "", m, _);
    let V = M && e.length === 0;
    if (e.length === 0 && (St = typeof window < "u" ? window.location.href : ""), h = {
      ...h,
      Accept: "text/html, application/xhtml+xml",
      "X-Requested-With": "XMLHttpRequest",
      "X-Inertia": !0,
      "X-Inertia-Version": Ta,
      "X-InertiaUI-Modal": !0,
      "X-InertiaUI-Modal-Use-Router": V ? 1 : 0,
      "X-InertiaUI-Modal-Base-Url": St
    }, V)
      return kr = null, mt.visit(j, {
        method: p,
        data: Y,
        headers: h,
        preserveScroll: !0,
        preserveState: !0,
        onError: H,
        onFinish: () => {
          Yo(() => kr).then(($) => {
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
    Wt({
      url: j,
      method: p,
      data: Y,
      headers: h
    }).then(($) => W(u($.data, b, S, O))).catch(($) => {
      H($);
    });
  }), d = {
    stack: e,
    localModals: n,
    push: i,
    pushFromResponseData: u,
    closeAll: () => {
      jr.reverse().forEach((y) => y.close());
    },
    reset: () => o(() => []),
    visit: g,
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
  return /* @__PURE__ */ R.jsx(Xt.Provider, { value: d, children: t });
}, Jt = () => {
  const t = ie(Xt);
  if (t === null)
    throw new Error("useModalStack must be used within a ModalStackProvider");
  return t;
}, Kn = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], Tc = (t, e) => {
  e.initialPage && (Ta = e.initialPage.version), e.resolveComponent && ($a = e.resolveComponent);
  const r = ({ Component: n, props: a, key: o }) => {
    const l = () => {
      const u = Tr(n, { key: o, ...a });
      return typeof n.layout == "function" ? n.layout(u) : Array.isArray(n.layout) ? n.layout.concat(u).reverse().reduce((f, s) => Tr(s, a, f)) : u;
    };
    return /* @__PURE__ */ R.jsxs(R.Fragment, { children: [
      l(),
      /* @__PURE__ */ R.jsx(Fu, {})
    ] });
  };
  return /* @__PURE__ */ R.jsx(Ru, { children: /* @__PURE__ */ R.jsx(t, { ...e, children: r }) });
}, Fu = ({ children: t }) => {
  var u;
  const e = ie(Xt);
  let r = !1, n = !1;
  z(() => mt.on("start", () => r = !0), []), z(() => mt.on("finish", () => r = !1), []), z(
    () => mt.on("navigate", function(i) {
      const f = i.detail.page.props._inertiaui_modal;
      if (!f) {
        n && e.closeAll();
        return;
      }
      n = f, St = f.baseUrl, e.pushFromResponseData(f, {}, () => {
        if (!f.baseUrl) {
          console.error("No base url in modal response data so cannot navigate back");
          return;
        }
        !r && window.location.href !== f.baseUrl && mt.visit(f.baseUrl, {
          preserveScroll: !0,
          preserveState: !0
        });
      }).then((s) => {
        kr = s;
      });
    }),
    []
  );
  const a = (i) => (jr.length && (i.headers["X-InertiaUI-Modal-Base-Url"] = St), i);
  z(() => (Wt.interceptors.request.use(a), () => Wt.interceptors.request.eject(a)), []);
  const o = Lo(), l = k();
  return z(() => {
    var s, g;
    const i = (s = o.props) == null ? void 0 : s._inertiaui_modal, f = l.current;
    l.current = i, i && f && i.component === f.component && i.url === f.url && ((g = e.stack[0]) == null || g.updateProps(i.props ?? {}));
  }, [(u = o.props) == null ? void 0 : u._inertiaui_modal]), /* @__PURE__ */ R.jsxs(R.Fragment, { children: [
    t,
    e.stack.length > 0 && /* @__PURE__ */ R.jsx(Fa, { index: 0 })
  ] });
}, en = A.createContext(null);
en.displayName = "ModalIndexContext";
const Ra = () => {
  const t = A.useContext(en);
  if (t === void 0)
    throw new Error("useModalIndex must be used within a ModalIndexProvider");
  return t;
}, Fa = ({ index: t }) => {
  const { stack: e } = Jt(), r = J(() => e[t], [e, t]);
  return (r == null ? void 0 : r.component) && /* @__PURE__ */ R.jsx(en.Provider, { value: t, children: /* @__PURE__ */ R.jsx(
    r.component,
    {
      ...r.props,
      onModalEvent: (...n) => r.emit(...n)
    }
  ) });
}, Ia = qr(({ name: t, children: e, ...r }, n) => {
  const a = Ra(), { stack: o, registerLocalModal: l, removeLocalModal: u } = Jt(), [i, f] = Q(null), s = J(() => t ? i : o[a], [t, i, a, o]), g = J(() => {
    var d;
    return (d = o.find((y) => y.shouldRender && y.index > (s == null ? void 0 : s.index))) == null ? void 0 : d.index;
  }, [a, o]), v = J(() => (s == null ? void 0 : s.config.slideover) ?? r.slideover ?? Gr("type") === "slideover", [r.slideover]), w = J(
    () => ({
      slideover: v,
      closeButton: r.closeButton ?? Ye(v, "closeButton"),
      closeExplicitly: r.closeExplicitly ?? Ye(v, "closeExplicitly"),
      maxWidth: r.maxWidth ?? Ye(v, "maxWidth"),
      paddingClasses: r.paddingClasses ?? Ye(v, "paddingClasses"),
      panelClasses: r.panelClasses ?? Ye(v, "panelClasses"),
      position: r.position ?? Ye(v, "position"),
      ...s == null ? void 0 : s.config
    }),
    [r, s == null ? void 0 : s.config]
  );
  return z(() => {
    if (t) {
      let d = null;
      return l(t, (y) => {
        d = y.registerEventListenersFromProps(r), f(y);
      }), () => {
        d == null || d(), d = null, u(t);
      };
    }
    return s.registerEventListenersFromProps(r);
  }, [t]), aa(
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
    g && /* @__PURE__ */ R.jsx(Fa, { index: g })
  ] });
});
Ia.displayName = "HeadlessModal";
function Ca(t) {
  var e, r, n = "";
  if (typeof t == "string" || typeof t == "number") n += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var a = t.length;
    for (e = 0; e < a; e++) t[e] && (r = Ca(t[e])) && (n && (n += " "), n += r);
  } else for (r in t) t[r] && (n && (n += " "), n += r);
  return n;
}
function qt() {
  for (var t, e, r = 0, n = "", a = arguments.length; r < a; r++) (t = arguments[r]) && (e = Ca(t)) && (n && (n += " "), n += e);
  return n;
}
var Iu = Object.defineProperty, Cu = (t, e, r) => e in t ? Iu(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Pr = (t, e, r) => (Cu(t, typeof e != "symbol" ? e + "" : e, r), r);
let Mu = class {
  constructor() {
    Pr(this, "current", this.detect()), Pr(this, "handoffState", "pending"), Pr(this, "currentId", 0);
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
}, Ve = new Mu();
function Qt(t) {
  return Ve.isServer ? null : t instanceof Node ? t.ownerDocument : t != null && t.hasOwnProperty("current") && t.current instanceof Node ? t.current.ownerDocument : document;
}
function Zt(t) {
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
    return Zt(() => {
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
function tn() {
  let [t] = Q(Me);
  return z(() => () => t.dispose(), [t]), t;
}
let ae = (t, e) => {
  Ve.isServer ? z(t, e) : Mo(t, e);
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
}, _u = fe(void 0);
function Du() {
  return ie(_u);
}
function Lr(...t) {
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
var Gt = ((t) => (t[t.None = 0] = "None", t[t.RenderStrategy = 1] = "RenderStrategy", t[t.Static = 2] = "Static", t))(Gt || {}), Fe = ((t) => (t[t.Unmount = 0] = "Unmount", t[t.Hidden = 1] = "Hidden", t))(Fe || {});
function de() {
  let t = ku();
  return ve((e) => Nu({ mergeRefs: t, ...e }), [t]);
}
function Nu({ ourProps: t, theirProps: e, slot: r, defaultTag: n, features: a, visible: o = !0, name: l, mergeRefs: u }) {
  u = u ?? ju;
  let i = Ma(e, t);
  if (o) return kt(i, r, n, l, u);
  let f = a ?? 0;
  if (f & 2) {
    let { static: s = !1, ...g } = i;
    if (s) return kt(g, r, n, l, u);
  }
  if (f & 1) {
    let { unmount: s = !0, ...g } = i;
    return Ie(s ? 0 : 1, { 0() {
      return null;
    }, 1() {
      return kt({ ...g, hidden: !0, style: { display: "none" } }, r, n, l, u);
    } });
  }
  return kt(i, r, n, l, u);
}
function kt(t, e = {}, r, n, a) {
  let { as: o = r, children: l, refName: u = "ref", ...i } = Ar(t, ["unmount", "static"]), f = t.ref !== void 0 ? { [u]: t.ref } : {}, s = typeof l == "function" ? l(e) : l;
  "className" in i && i.className && typeof i.className == "function" && (i.className = i.className(e)), i["aria-labelledby"] && i["aria-labelledby"] === i.id && (i["aria-labelledby"] = void 0);
  let g = {};
  if (e) {
    let v = !1, w = [];
    for (let [d, y] of Object.entries(e)) typeof y == "boolean" && (v = !0), y === !0 && w.push(d.replace(/([A-Z])/g, (p) => `-${p.toLowerCase()}`));
    if (v) {
      g["data-headlessui-state"] = w.join(" ");
      for (let d of w) g[`data-${d}`] = "";
    }
  }
  if (o === he && (Object.keys(je(i)).length > 0 || Object.keys(je(g)).length > 0)) if (!_o(s) || Array.isArray(s) && s.length > 1) {
    if (Object.keys(je(i)).length > 0) throw new Error(['Passing props on "Fragment"!', "", `The current component <${n} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(je(i)).concat(Object.keys(je(g))).map((v) => `  - ${v}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((v) => `  - ${v}`).join(`
`)].join(`
`));
  } else {
    let v = s.props, w = v == null ? void 0 : v.className, d = typeof w == "function" ? (...m) => Lr(w(...m), i.className) : Lr(w, i.className), y = d ? { className: d } : {}, p = Ma(s.props, je(Ar(i, ["ref"])));
    for (let m in g) m in p && delete g[m];
    return Do(s, Object.assign({}, p, g, f, { ref: a(s.ref, f.ref) }, y));
  }
  return Tr(o, Object.assign({}, Ar(i, ["ref"]), o !== he && f, o !== he && g), s);
}
function ku() {
  let t = k([]), e = ve((r) => {
    for (let n of t.current) n != null && (typeof n == "function" ? n(r) : n.current = r);
  }, []);
  return (...r) => {
    if (!r.every((n) => n == null)) return t.current = r, e;
  };
}
function ju(...t) {
  return t.every((e) => e == null) ? void 0 : (e) => {
    for (let r of t) r != null && (typeof r == "function" ? r(e) : r.current = e);
  };
}
function Ma(...t) {
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
  return Object.assign(qr(t), { displayName: (e = t.displayName) != null ? e : t.name });
}
function je(t) {
  let e = Object.assign({}, t);
  for (let r in e) e[r] === void 0 && delete e[r];
  return e;
}
function Ar(t, e = []) {
  let r = Object.assign({}, t);
  for (let n of e) n in r && delete r[n];
  return r;
}
let Lu = "span";
var zt = ((t) => (t[t.None = 1] = "None", t[t.Focusable = 2] = "Focusable", t[t.Hidden = 4] = "Hidden", t))(zt || {});
function Wu(t, e) {
  var r;
  let { features: n = 1, ...a } = t, o = { ref: e, "aria-hidden": (n & 2) === 2 ? !0 : (r = a["aria-hidden"]) != null ? r : void 0, hidden: (n & 4) === 4 ? !0 : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(n & 4) === 4 && (n & 2) !== 2 && { display: "none" } } };
  return de()({ ourProps: o, theirProps: a, slot: {}, defaultTag: Lu, name: "Hidden" });
}
let Wr = le(Wu), _a = Symbol();
function Uu(t, e = !0) {
  return Object.assign(t, { [_a]: e });
}
function Se(...t) {
  let e = k(t);
  z(() => {
    e.current = t;
  }, [t]);
  let r = U((n) => {
    for (let a of e.current) a != null && (typeof a == "function" ? a(n) : a.current = n);
  });
  return t.every((n) => n == null || (n == null ? void 0 : n[_a])) ? void 0 : r;
}
let rn = fe(null);
rn.displayName = "DescriptionContext";
function Da() {
  let t = ie(rn);
  if (t === null) {
    let e = new Error("You used a <Description /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(e, Da), e;
  }
  return t;
}
function Bu() {
  let [t, e] = Q([]);
  return [t.length > 0 ? t.join(" ") : void 0, J(() => function(r) {
    let n = U((o) => (e((l) => [...l, o]), () => e((l) => {
      let u = l.slice(), i = u.indexOf(o);
      return i !== -1 && u.splice(i, 1), u;
    }))), a = J(() => ({ register: n, slot: r.slot, name: r.name, props: r.props, value: r.value }), [n, r.slot, r.name, r.props, r.value]);
    return A.createElement(rn.Provider, { value: a }, r.children);
  }, [e])];
}
let Hu = "p";
function Vu(t, e) {
  let r = At(), n = Du(), { id: a = `headlessui-description-${r}`, ...o } = t, l = Da(), u = Se(e);
  ae(() => l.register(a), [a, l.register]);
  let i = n || !1, f = J(() => ({ ...l.slot, disabled: i }), [l.slot, i]), s = { ref: u, ...l.props, id: a };
  return de()({ ourProps: s, theirProps: o, slot: f, defaultTag: Hu, name: l.name || "Description" });
}
let qu = le(Vu), Gu = Object.assign(qu, {});
var Na = ((t) => (t.Space = " ", t.Enter = "Enter", t.Escape = "Escape", t.Backspace = "Backspace", t.Delete = "Delete", t.ArrowLeft = "ArrowLeft", t.ArrowUp = "ArrowUp", t.ArrowRight = "ArrowRight", t.ArrowDown = "ArrowDown", t.Home = "Home", t.End = "End", t.PageUp = "PageUp", t.PageDown = "PageDown", t.Tab = "Tab", t))(Na || {});
let zu = fe(() => {
});
function Yu({ value: t, children: e }) {
  return A.createElement(zu.Provider, { value: t }, e);
}
let Ku = class extends Map {
  constructor(e) {
    super(), this.factory = e;
  }
  get(e) {
    let r = super.get(e);
    return r === void 0 && (r = this.factory(e), this.set(e, r)), r;
  }
};
function ka(t, e) {
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
function ja(t) {
  return No(t.subscribe, t.getSnapshot, t.getSnapshot);
}
let Xu = new Ku(() => ka(() => [], { ADD(t) {
  return this.includes(t) ? this : [...this, t];
}, REMOVE(t) {
  let e = this.indexOf(t);
  if (e === -1) return this;
  let r = this.slice();
  return r.splice(e, 1), r;
} }));
function ot(t, e) {
  let r = Xu.get(e), n = At(), a = ja(r);
  if (ae(() => {
    if (t) return r.dispatch("ADD", n), () => r.dispatch("REMOVE", n);
  }, [r, t]), !t) return !1;
  let o = a.indexOf(n), l = a.length;
  return o === -1 && (o = l, l += 1), o === l - 1;
}
let Ur = /* @__PURE__ */ new Map(), xt = /* @__PURE__ */ new Map();
function Xn(t) {
  var e;
  let r = (e = xt.get(t)) != null ? e : 0;
  return xt.set(t, r + 1), r !== 0 ? () => Jn(t) : (Ur.set(t, { "aria-hidden": t.getAttribute("aria-hidden"), inert: t.inert }), t.setAttribute("aria-hidden", "true"), t.inert = !0, () => Jn(t));
}
function Jn(t) {
  var e;
  let r = (e = xt.get(t)) != null ? e : 1;
  if (r === 1 ? xt.delete(t) : xt.set(t, r - 1), r !== 1) return;
  let n = Ur.get(t);
  n && (n["aria-hidden"] === null ? t.removeAttribute("aria-hidden") : t.setAttribute("aria-hidden", n["aria-hidden"]), t.inert = n.inert, Ur.delete(t));
}
function Ju(t, { allowed: e, disallowed: r } = {}) {
  let n = ot(t, "inert-others");
  ae(() => {
    var a, o;
    if (!n) return;
    let l = Me();
    for (let i of (a = r == null ? void 0 : r()) != null ? a : []) i && l.add(Xn(i));
    let u = (o = e == null ? void 0 : e()) != null ? o : [];
    for (let i of u) {
      if (!i) continue;
      let f = Qt(i);
      if (!f) continue;
      let s = i.parentElement;
      for (; s && s !== f.body; ) {
        for (let g of s.children) u.some((v) => g.contains(v)) || l.add(Xn(g));
        s = s.parentElement;
      }
    }
    return l.dispose;
  }, [n, e, r]);
}
function Qu(t, e, r) {
  let n = qe((a) => {
    let o = a.getBoundingClientRect();
    o.x === 0 && o.y === 0 && o.width === 0 && o.height === 0 && r();
  });
  z(() => {
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
let Yt = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((t) => `${t}:not([tabindex='-1'])`).join(","), Zu = ["[data-autofocus]"].map((t) => `${t}:not([tabindex='-1'])`).join(",");
var Pe = ((t) => (t[t.First = 1] = "First", t[t.Previous = 2] = "Previous", t[t.Next = 4] = "Next", t[t.Last = 8] = "Last", t[t.WrapAround = 16] = "WrapAround", t[t.NoScroll = 32] = "NoScroll", t[t.AutoFocus = 64] = "AutoFocus", t))(Pe || {}), Br = ((t) => (t[t.Error = 0] = "Error", t[t.Overflow = 1] = "Overflow", t[t.Success = 2] = "Success", t[t.Underflow = 3] = "Underflow", t))(Br || {}), es = ((t) => (t[t.Previous = -1] = "Previous", t[t.Next = 1] = "Next", t))(es || {});
function ts(t = document.body) {
  return t == null ? [] : Array.from(t.querySelectorAll(Yt)).sort((e, r) => Math.sign((e.tabIndex || Number.MAX_SAFE_INTEGER) - (r.tabIndex || Number.MAX_SAFE_INTEGER)));
}
function rs(t = document.body) {
  return t == null ? [] : Array.from(t.querySelectorAll(Zu)).sort((e, r) => Math.sign((e.tabIndex || Number.MAX_SAFE_INTEGER) - (r.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var La = ((t) => (t[t.Strict = 0] = "Strict", t[t.Loose = 1] = "Loose", t))(La || {});
function ns(t, e = 0) {
  var r;
  return t === ((r = Qt(t)) == null ? void 0 : r.body) ? !1 : Ie(e, { 0() {
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
var as = ((t) => (t[t.Keyboard = 0] = "Keyboard", t[t.Mouse = 1] = "Mouse", t))(as || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (t) => {
  t.metaKey || t.altKey || t.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (t) => {
  t.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : t.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
function Ae(t) {
  t == null || t.focus({ preventScroll: !0 });
}
let os = ["textarea", "input"].join(",");
function is(t) {
  var e, r;
  return (r = (e = t == null ? void 0 : t.matches) == null ? void 0 : e.call(t, os)) != null ? r : !1;
}
function ls(t, e = (r) => r) {
  return t.slice().sort((r, n) => {
    let a = e(r), o = e(n);
    if (a === null || o === null) return 0;
    let l = a.compareDocumentPosition(o);
    return l & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : l & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function Ot(t, e, { sorted: r = !0, relativeTo: n = null, skipElements: a = [] } = {}) {
  let o = Array.isArray(t) ? t.length > 0 ? t[0].ownerDocument : document : t.ownerDocument, l = Array.isArray(t) ? r ? ls(t) : t : e & 64 ? rs(t) : ts(t);
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
  })(), f = e & 32 ? { preventScroll: !0 } : {}, s = 0, g = l.length, v;
  do {
    if (s >= g || s + g <= 0) return 0;
    let w = i + s;
    if (e & 16) w = (w + g) % g;
    else {
      if (w < 0) return 3;
      if (w >= g) return 1;
    }
    v = l[w], v == null || v.focus(f), s += u;
  } while (v !== o.activeElement);
  return e & 6 && is(v) && v.select(), 2;
}
function Wa() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function us() {
  return /Android/gi.test(window.navigator.userAgent);
}
function ss() {
  return Wa() || us();
}
function vt(t, e, r, n) {
  let a = qe(r);
  z(() => {
    if (!t) return;
    function o(l) {
      a.current(l);
    }
    return document.addEventListener(e, o, n), () => document.removeEventListener(e, o, n);
  }, [t, e, n]);
}
function Ua(t, e, r, n) {
  let a = qe(r);
  z(() => {
    if (!t) return;
    function o(l) {
      a.current(l);
    }
    return window.addEventListener(e, o, n), () => window.removeEventListener(e, o, n);
  }, [t, e, n]);
}
const Qn = 30;
function cs(t, e, r) {
  let n = ot(t, "outside-click"), a = qe(r), o = ve(function(i, f) {
    if (i.defaultPrevented) return;
    let s = f(i);
    if (s === null || !s.getRootNode().contains(s) || !s.isConnected) return;
    let g = function v(w) {
      return typeof w == "function" ? v(w()) : Array.isArray(w) || w instanceof Set ? w : [w];
    }(e);
    for (let v of g) if (v !== null && (v.contains(s) || i.composed && i.composedPath().includes(v))) return;
    return !ns(s, La.Loose) && s.tabIndex !== -1 && i.preventDefault(), a.current(i, s);
  }, [a, e]), l = k(null);
  vt(n, "pointerdown", (i) => {
    var f, s;
    l.current = ((s = (f = i.composedPath) == null ? void 0 : f.call(i)) == null ? void 0 : s[0]) || i.target;
  }, !0), vt(n, "mousedown", (i) => {
    var f, s;
    l.current = ((s = (f = i.composedPath) == null ? void 0 : f.call(i)) == null ? void 0 : s[0]) || i.target;
  }, !0), vt(n, "click", (i) => {
    ss() || l.current && (o(i, () => l.current), l.current = null);
  }, !0);
  let u = k({ x: 0, y: 0 });
  vt(n, "touchstart", (i) => {
    u.current.x = i.touches[0].clientX, u.current.y = i.touches[0].clientY;
  }, !0), vt(n, "touchend", (i) => {
    let f = { x: i.changedTouches[0].clientX, y: i.changedTouches[0].clientY };
    if (!(Math.abs(f.x - u.current.x) >= Qn || Math.abs(f.y - u.current.y) >= Qn)) return o(i, () => i.target instanceof HTMLElement ? i.target : null);
  }, !0), Ua(n, "blur", (i) => o(i, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), !0);
}
function Rt(...t) {
  return J(() => Qt(...t), [...t]);
}
function Ba(t, e, r, n) {
  let a = qe(r);
  z(() => {
    t = t ?? window;
    function o(l) {
      a.current(l);
    }
    return t.addEventListener(e, o, n), () => t.removeEventListener(e, o, n);
  }, [t, e, n]);
}
function fs() {
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
function ds() {
  return Wa() ? { before({ doc: t, d: e, meta: r }) {
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
function ps() {
  return { before({ doc: t, d: e }) {
    e.style(t.documentElement, "overflow", "hidden");
  } };
}
function ys(t) {
  let e = {};
  for (let r of t) Object.assign(e, r(e));
  return e;
}
let Ue = ka(() => /* @__PURE__ */ new Map(), { PUSH(t, e) {
  var r;
  let n = (r = this.get(t)) != null ? r : { doc: t, count: 0, d: Me(), meta: /* @__PURE__ */ new Set() };
  return n.count++, n.meta.add(e), this.set(t, n), this;
}, POP(t, e) {
  let r = this.get(t);
  return r && (r.count--, r.meta.delete(e)), this;
}, SCROLL_PREVENT({ doc: t, d: e, meta: r }) {
  let n = { doc: t, d: e, meta: ys(r) }, a = [ds(), fs(), ps()];
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
function vs(t, e, r = () => ({ containers: [] })) {
  let n = ja(Ue), a = e ? n.get(e) : void 0, o = a ? a.count > 0 : !1;
  return ae(() => {
    if (!(!e || !t)) return Ue.dispatch("PUSH", e, r), () => Ue.dispatch("POP", e, r);
  }, [t, e]), o;
}
function ms(t, e, r = () => [document.body]) {
  let n = ot(t, "scroll-lock");
  vs(n, e, (a) => {
    var o;
    return { containers: [...(o = a.containers) != null ? o : [], r] };
  });
}
function hs(t = 0) {
  let [e, r] = Q(t), n = ve((i) => r(i), [e]), a = ve((i) => r((f) => f | i), [e]), o = ve((i) => (e & i) === i, [e]), l = ve((i) => r((f) => f & ~i), [r]), u = ve((i) => r((f) => f ^ i), [r]);
  return { flags: e, setFlag: n, addFlag: a, hasFlag: o, removeFlag: l, toggleFlag: u };
}
var Zn, ea;
typeof process < "u" && typeof globalThis < "u" && typeof Element < "u" && ((Zn = process == null ? void 0 : process.env) == null ? void 0 : Zn.NODE_ENV) === "test" && typeof ((ea = Element == null ? void 0 : Element.prototype) == null ? void 0 : ea.getAnimations) > "u" && (Element.prototype.getAnimations = function() {
  return console.warn(["Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.", "Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.", "", "Example usage:", "```js", "import { mockAnimationsApi } from 'jsdom-testing-mocks'", "mockAnimationsApi()", "```"].join(`
`)), [];
});
var gs = ((t) => (t[t.None = 0] = "None", t[t.Closed = 1] = "Closed", t[t.Enter = 2] = "Enter", t[t.Leave = 4] = "Leave", t))(gs || {});
function bs(t) {
  let e = {};
  for (let r in t) t[r] === !0 && (e[`data-${r}`] = "");
  return e;
}
function ws(t, e, r, n) {
  let [a, o] = Q(r), { hasFlag: l, addFlag: u, removeFlag: i } = hs(t && a ? 3 : 0), f = k(!1), s = k(!1), g = tn();
  return ae(() => {
    var v;
    if (t) {
      if (r && o(!0), !e) {
        r && u(3);
        return;
      }
      return (v = n == null ? void 0 : n.start) == null || v.call(n, r), Es(e, { inFlight: f, prepare() {
        s.current ? s.current = !1 : s.current = f.current, f.current = !0, !s.current && (r ? (u(3), i(4)) : (u(4), i(2)));
      }, run() {
        s.current ? r ? (i(3), u(4)) : (i(4), u(3)) : r ? i(1) : u(1);
      }, done() {
        var w;
        s.current && typeof e.getAnimations == "function" && e.getAnimations().length > 0 || (f.current = !1, i(7), r || o(!1), (w = n == null ? void 0 : n.end) == null || w.call(n, r));
      } });
    }
  }, [t, r, e, g]), t ? [a, { closed: l(1), enter: l(2), leave: l(4), transition: l(2) || l(4) }] : [r, { closed: void 0, enter: void 0, leave: void 0, transition: void 0 }];
}
function Es(t, { prepare: e, run: r, done: n, inFlight: a }) {
  let o = Me();
  return xs(t, { prepare: e, inFlight: a }), o.nextFrame(() => {
    r(), o.requestAnimationFrame(() => {
      o.add(Ss(t, n));
    });
  }), o.dispose;
}
function Ss(t, e) {
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
function xs(t, { inFlight: e, prepare: r }) {
  if (e != null && e.current) {
    r();
    return;
  }
  let n = t.style.transition;
  t.style.transition = "none", r(), t.offsetHeight, t.style.transition = n;
}
function nn(t, e) {
  let r = k([]), n = U(t);
  z(() => {
    let a = [...r.current];
    for (let [o, l] of e.entries()) if (r.current[o] !== l) {
      let u = n(e, a);
      return r.current = e, u;
    }
  }, [n, ...e]);
}
let er = fe(null);
er.displayName = "OpenClosedContext";
var me = ((t) => (t[t.Open = 1] = "Open", t[t.Closed = 2] = "Closed", t[t.Closing = 4] = "Closing", t[t.Opening = 8] = "Opening", t))(me || {});
function tr() {
  return ie(er);
}
function Os({ value: t, children: e }) {
  return A.createElement(er.Provider, { value: t }, e);
}
function Ps({ children: t }) {
  return A.createElement(er.Provider, { value: null }, t);
}
function As(t) {
  function e() {
    document.readyState !== "loading" && (t(), document.removeEventListener("DOMContentLoaded", e));
  }
  typeof window < "u" && typeof document < "u" && (document.addEventListener("DOMContentLoaded", e), e());
}
let $e = [];
As(() => {
  function t(e) {
    if (!(e.target instanceof HTMLElement) || e.target === document.body || $e[0] === e.target) return;
    let r = e.target;
    r = r.closest(Yt), $e.unshift(r ?? e.target), $e = $e.filter((n) => n != null && n.isConnected), $e.splice(10);
  }
  window.addEventListener("click", t, { capture: !0 }), window.addEventListener("mousedown", t, { capture: !0 }), window.addEventListener("focus", t, { capture: !0 }), document.body.addEventListener("click", t, { capture: !0 }), document.body.addEventListener("mousedown", t, { capture: !0 }), document.body.addEventListener("focus", t, { capture: !0 });
});
function Ha(t) {
  let e = U(t), r = k(!1);
  z(() => (r.current = !1, () => {
    r.current = !0, Zt(() => {
      r.current && e();
    });
  }), [e]);
}
function Ts() {
  let t = typeof document > "u";
  return "useSyncExternalStore" in gt ? ((e) => e.useSyncExternalStore)(gt)(() => () => {
  }, () => !1, () => !t) : !1;
}
function Ft() {
  let t = Ts(), [e, r] = gt.useState(Ve.isHandoffComplete);
  return e && Ve.isHandoffComplete === !1 && r(!1), gt.useEffect(() => {
    e !== !0 && r(!0);
  }, [e]), gt.useEffect(() => Ve.handoff(), []), t ? !1 : e;
}
let Va = fe(!1);
function $s() {
  return ie(Va);
}
function ta(t) {
  return A.createElement(Va.Provider, { value: t.force }, t.children);
}
function Rs(t) {
  let e = $s(), r = ie(Ga), n = Rt(t), [a, o] = Q(() => {
    var l;
    if (!e && r !== null) return (l = r.current) != null ? l : null;
    if (Ve.isServer) return null;
    let u = n == null ? void 0 : n.getElementById("headlessui-portal-root");
    if (u) return u;
    if (n === null) return null;
    let i = n.createElement("div");
    return i.setAttribute("id", "headlessui-portal-root"), n.body.appendChild(i);
  });
  return z(() => {
    a !== null && (n != null && n.body.contains(a) || n == null || n.body.appendChild(a));
  }, [a, n]), z(() => {
    e || r !== null && o(r.current);
  }, [r, o, e]), a;
}
let qa = he, Fs = le(function(t, e) {
  let r = t, n = k(null), a = Se(Uu((g) => {
    n.current = g;
  }), e), o = Rt(n), l = Rs(n), [u] = Q(() => {
    var g;
    return Ve.isServer ? null : (g = o == null ? void 0 : o.createElement("div")) != null ? g : null;
  }), i = ie(Hr), f = Ft();
  ae(() => {
    !l || !u || l.contains(u) || (u.setAttribute("data-headlessui-portal", ""), l.appendChild(u));
  }, [l, u]), ae(() => {
    if (u && i) return i.register(u);
  }, [i, u]), Ha(() => {
    var g;
    !l || !u || (u instanceof Node && l.contains(u) && l.removeChild(u), l.childNodes.length <= 0 && ((g = l.parentElement) == null || g.removeChild(l)));
  });
  let s = de();
  return f ? !l || !u ? null : Wo(s({ ourProps: { ref: a }, theirProps: r, slot: {}, defaultTag: qa, name: "Portal" }), u) : null;
});
function Is(t, e) {
  let r = Se(e), { enabled: n = !0, ...a } = t, o = de();
  return n ? A.createElement(Fs, { ...a, ref: r }) : o({ ourProps: { ref: r }, theirProps: a, slot: {}, defaultTag: qa, name: "Portal" });
}
let Cs = he, Ga = fe(null);
function Ms(t, e) {
  let { target: r, ...n } = t, a = { ref: Se(e) }, o = de();
  return A.createElement(Ga.Provider, { value: r }, o({ ourProps: a, theirProps: n, defaultTag: Cs, name: "Popover.Group" }));
}
let Hr = fe(null);
function _s() {
  let t = ie(Hr), e = k([]), r = U((o) => (e.current.push(o), t && t.register(o), () => n(o))), n = U((o) => {
    let l = e.current.indexOf(o);
    l !== -1 && e.current.splice(l, 1), t && t.unregister(o);
  }), a = J(() => ({ register: r, unregister: n, portals: e }), [r, n, e]);
  return [e, J(() => function({ children: o }) {
    return A.createElement(Hr.Provider, { value: a }, o);
  }, [a])];
}
let Ds = le(Is), za = le(Ms), Ns = Object.assign(Ds, { Group: za });
function ks(t, e = typeof document < "u" ? document.defaultView : null, r) {
  let n = ot(t, "escape");
  Ba(e, "keydown", (a) => {
    n && (a.defaultPrevented || a.key === Na.Escape && r(a));
  });
}
function js() {
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
function Ls({ defaultContainers: t = [], portals: e, mainTreeNode: r } = {}) {
  let n = Rt(r), a = U(() => {
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
function ra({ children: t, node: e }) {
  let [r, n] = Q(null), a = Ka(e ?? r);
  return A.createElement(Ya.Provider, { value: a }, t, a === null && A.createElement(Wr, { features: zt.Hidden, ref: (o) => {
    var l, u;
    if (o) {
      for (let i of (u = (l = Qt(o)) == null ? void 0 : l.querySelectorAll("html > *, body > *")) != null ? u : []) if (i !== document.body && i !== document.head && i instanceof HTMLElement && i != null && i.contains(o)) {
        n(i);
        break;
      }
    }
  } }));
}
function Ka(t = null) {
  var e;
  return (e = ie(Ya)) != null ? e : t;
}
function an() {
  let t = k(!1);
  return ae(() => (t.current = !0, () => {
    t.current = !1;
  }), []), t;
}
var ht = ((t) => (t[t.Forwards = 0] = "Forwards", t[t.Backwards = 1] = "Backwards", t))(ht || {});
function Ws() {
  let t = k(0);
  return Ua(!0, "keydown", (e) => {
    e.key === "Tab" && (t.current = e.shiftKey ? 1 : 0);
  }, !0), t;
}
function Xa(t) {
  if (!t) return /* @__PURE__ */ new Set();
  if (typeof t == "function") return new Set(t());
  let e = /* @__PURE__ */ new Set();
  for (let r of t.current) r.current instanceof HTMLElement && e.add(r.current);
  return e;
}
let Us = "div";
var We = ((t) => (t[t.None = 0] = "None", t[t.InitialFocus = 1] = "InitialFocus", t[t.TabLock = 2] = "TabLock", t[t.FocusLock = 4] = "FocusLock", t[t.RestoreFocus = 8] = "RestoreFocus", t[t.AutoFocus = 16] = "AutoFocus", t))(We || {});
function Bs(t, e) {
  let r = k(null), n = Se(r, e), { initialFocus: a, initialFocusFallback: o, containers: l, features: u = 15, ...i } = t;
  Ft() || (u = 0);
  let f = Rt(r);
  Gs(u, { ownerDocument: f });
  let s = zs(u, { ownerDocument: f, container: r, initialFocus: a, initialFocusFallback: o });
  Ys(u, { ownerDocument: f, container: r, containers: l, previousActiveElement: s });
  let g = Ws(), v = U((h) => {
    let b = r.current;
    b && ((S) => S())(() => {
      Ie(g.current, { [ht.Forwards]: () => {
        Ot(b, Pe.First, { skipElements: [h.relatedTarget, o] });
      }, [ht.Backwards]: () => {
        Ot(b, Pe.Last, { skipElements: [h.relatedTarget, o] });
      } });
    });
  }), w = ot(!!(u & 2), "focus-trap#tab-lock"), d = tn(), y = k(!1), p = { ref: n, onKeyDown(h) {
    h.key == "Tab" && (y.current = !0, d.requestAnimationFrame(() => {
      y.current = !1;
    }));
  }, onBlur(h) {
    if (!(u & 4)) return;
    let b = Xa(l);
    r.current instanceof HTMLElement && b.add(r.current);
    let S = h.relatedTarget;
    S instanceof HTMLElement && S.dataset.headlessuiFocusGuard !== "true" && (Ja(b, S) || (y.current ? Ot(r.current, Ie(g.current, { [ht.Forwards]: () => Pe.Next, [ht.Backwards]: () => Pe.Previous }) | Pe.WrapAround, { relativeTo: h.target }) : h.target instanceof HTMLElement && Ae(h.target)));
  } }, m = de();
  return A.createElement(A.Fragment, null, w && A.createElement(Wr, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: v, features: zt.Focusable }), m({ ourProps: p, theirProps: i, defaultTag: Us, name: "FocusTrap" }), w && A.createElement(Wr, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: v, features: zt.Focusable }));
}
let Hs = le(Bs), Vs = Object.assign(Hs, { features: We });
function qs(t = !0) {
  let e = k($e.slice());
  return nn(([r], [n]) => {
    n === !0 && r === !1 && Zt(() => {
      e.current.splice(0);
    }), n === !1 && r === !0 && (e.current = $e.slice());
  }, [t, $e, e]), U(() => {
    var r;
    return (r = e.current.find((n) => n != null && n.isConnected)) != null ? r : null;
  });
}
function Gs(t, { ownerDocument: e }) {
  let r = !!(t & 8), n = qs(r);
  nn(() => {
    r || (e == null ? void 0 : e.activeElement) === (e == null ? void 0 : e.body) && Ae(n());
  }, [r]), Ha(() => {
    r && Ae(n());
  });
}
function zs(t, { ownerDocument: e, container: r, initialFocus: n, initialFocusFallback: a }) {
  let o = k(null), l = ot(!!(t & 1), "focus-trap#initial-focus"), u = an();
  return nn(() => {
    if (t === 0) return;
    if (!l) {
      a != null && a.current && Ae(a.current);
      return;
    }
    let i = r.current;
    i && Zt(() => {
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
          if (Ot(i, Pe.First | Pe.AutoFocus) !== Br.Error) return;
        } else if (Ot(i, Pe.First) !== Br.Error) return;
        if (a != null && a.current && (Ae(a.current), (e == null ? void 0 : e.activeElement) === a.current)) return;
        console.warn("There are no focusable elements inside the <FocusTrap />");
      }
      o.current = e == null ? void 0 : e.activeElement;
    });
  }, [a, l, t]), o;
}
function Ys(t, { ownerDocument: e, container: r, containers: n, previousActiveElement: a }) {
  let o = an(), l = !!(t & 4);
  Ba(e == null ? void 0 : e.defaultView, "focus", (u) => {
    if (!l || !o.current) return;
    let i = Xa(n);
    r.current instanceof HTMLElement && i.add(r.current);
    let f = a.current;
    if (!f) return;
    let s = u.target;
    s && s instanceof HTMLElement ? Ja(i, s) ? (a.current = s, Ae(s)) : (u.preventDefault(), u.stopPropagation(), Ae(f)) : Ae(a.current);
  }, !0);
}
function Ja(t, e) {
  for (let r of t) if (r.contains(e)) return !0;
  return !1;
}
function Qa(t) {
  var e;
  return !!(t.enter || t.enterFrom || t.enterTo || t.leave || t.leaveFrom || t.leaveTo) || ((e = t.as) != null ? e : eo) !== he || A.Children.count(t.children) === 1;
}
let rr = fe(null);
rr.displayName = "TransitionContext";
var Ks = ((t) => (t.Visible = "visible", t.Hidden = "hidden", t))(Ks || {});
function Xs() {
  let t = ie(rr);
  if (t === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return t;
}
function Js() {
  let t = ie(nr);
  if (t === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return t;
}
let nr = fe(null);
nr.displayName = "NestingContext";
function ar(t) {
  return "children" in t ? ar(t.children) : t.current.filter(({ el: e }) => e.current !== null).filter(({ state: e }) => e === "visible").length > 0;
}
function Za(t, e) {
  let r = qe(t), n = k([]), a = an(), o = tn(), l = U((w, d = Fe.Hidden) => {
    let y = n.current.findIndex(({ el: p }) => p === w);
    y !== -1 && (Ie(d, { [Fe.Unmount]() {
      n.current.splice(y, 1);
    }, [Fe.Hidden]() {
      n.current[y].state = "hidden";
    } }), o.microTask(() => {
      var p;
      !ar(n) && a.current && ((p = r.current) == null || p.call(r));
    }));
  }), u = U((w) => {
    let d = n.current.find(({ el: y }) => y === w);
    return d ? d.state !== "visible" && (d.state = "visible") : n.current.push({ el: w, state: "visible" }), () => l(w, Fe.Unmount);
  }), i = k([]), f = k(Promise.resolve()), s = k({ enter: [], leave: [] }), g = U((w, d, y) => {
    i.current.splice(0), e && (e.chains.current[d] = e.chains.current[d].filter(([p]) => p !== w)), e == null || e.chains.current[d].push([w, new Promise((p) => {
      i.current.push(p);
    })]), e == null || e.chains.current[d].push([w, new Promise((p) => {
      Promise.all(s.current[d].map(([m, h]) => h)).then(() => p());
    })]), d === "enter" ? f.current = f.current.then(() => e == null ? void 0 : e.wait.current).then(() => y(d)) : y(d);
  }), v = U((w, d, y) => {
    Promise.all(s.current[d].splice(0).map(([p, m]) => m)).then(() => {
      var p;
      (p = i.current.shift()) == null || p();
    }).then(() => y(d));
  });
  return J(() => ({ children: n, register: u, unregister: l, onStart: g, onStop: v, wait: f, chains: s }), [u, l, n, g, v, s, f]);
}
let eo = he, to = Gt.RenderStrategy;
function Qs(t, e) {
  var r, n;
  let { transition: a = !0, beforeEnter: o, afterEnter: l, beforeLeave: u, afterLeave: i, enter: f, enterFrom: s, enterTo: g, entered: v, leave: w, leaveFrom: d, leaveTo: y, ...p } = t, [m, h] = Q(null), b = k(null), S = Qa(t), O = Se(...S ? [b, e, h] : e === null ? [] : [e]), _ = (r = p.unmount) == null || r ? Fe.Unmount : Fe.Hidden, { show: M, appear: W, initial: H } = Xs(), [j, Y] = Q(M ? "visible" : "hidden"), V = Js(), { register: $, unregister: T } = V;
  ae(() => $(b), [$, b]), ae(() => {
    if (_ === Fe.Hidden && b.current) {
      if (M && j !== "visible") {
        Y("visible");
        return;
      }
      return Ie(j, { hidden: () => T(b), visible: () => $(b) });
    }
  }, [j, b, $, T, M, _]);
  let D = Ft();
  ae(() => {
    if (S && D && j === "visible" && b.current === null) throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
  }, [b, j, D, S]);
  let ue = H && !W, pe = W && M && H, ge = k(!1), te = Za(() => {
    ge.current || (Y("hidden"), T(b));
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
    }), xe === "leave" && !ar(te) && (Y("hidden"), T(b));
  });
  z(() => {
    S && a || (ye(M), q(M));
  }, [M, S, a]);
  let _e = !(!a || !S || !D || ue), [, ee] = ws(_e, m, M, { start: ye, end: q }), ir = je({ ref: O, className: ((n = Lr(p.className, pe && f, pe && s, ee.enter && f, ee.enter && ee.closed && s, ee.enter && !ee.closed && g, ee.leave && w, ee.leave && !ee.closed && d, ee.leave && ee.closed && y, !ee.transition && M && v)) == null ? void 0 : n.trim()) || void 0, ...bs(ee) }), De = 0;
  j === "visible" && (De |= me.Open), j === "hidden" && (De |= me.Closed), ee.enter && (De |= me.Opening), ee.leave && (De |= me.Closing);
  let lt = de();
  return A.createElement(nr.Provider, { value: te }, A.createElement(Os, { value: De }, lt({ ourProps: ir, theirProps: p, defaultTag: eo, features: to, visible: j === "visible", name: "Transition.Child" })));
}
function Zs(t, e) {
  let { show: r, appear: n = !1, unmount: a = !0, ...o } = t, l = k(null), u = Qa(t), i = Se(...u ? [l, e] : e === null ? [] : [e]);
  Ft();
  let f = tr();
  if (r === void 0 && f !== null && (r = (f & me.Open) === me.Open), r === void 0) throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
  let [s, g] = Q(r ? "visible" : "hidden"), v = Za(() => {
    r || g("hidden");
  }), [w, d] = Q(!0), y = k([r]);
  ae(() => {
    w !== !1 && y.current[y.current.length - 1] !== r && (y.current.push(r), d(!1));
  }, [y, r]);
  let p = J(() => ({ show: r, appear: n, initial: w }), [r, n, w]);
  ae(() => {
    r ? g("visible") : !ar(v) && l.current !== null && g("hidden");
  }, [r, v]);
  let m = { unmount: a }, h = U(() => {
    var O;
    w && d(!1), (O = t.beforeEnter) == null || O.call(t);
  }), b = U(() => {
    var O;
    w && d(!1), (O = t.beforeLeave) == null || O.call(t);
  }), S = de();
  return A.createElement(nr.Provider, { value: v }, A.createElement(rr.Provider, { value: p }, S({ ourProps: { ...m, as: he, children: A.createElement(ro, { ref: i, ...m, ...o, beforeEnter: h, beforeLeave: b }) }, theirProps: {}, defaultTag: he, features: to, visible: s === "visible", name: "Transition" })));
}
function ec(t, e) {
  let r = ie(rr) !== null, n = tr() !== null;
  return A.createElement(A.Fragment, null, !r && n ? A.createElement(Vr, { ref: e, ...t }) : A.createElement(ro, { ref: e, ...t }));
}
let Vr = le(Zs), ro = le(Qs), it = le(ec), no = Object.assign(Vr, { Child: it, Root: Vr });
var tc = ((t) => (t[t.Open = 0] = "Open", t[t.Closed = 1] = "Closed", t))(tc || {}), rc = ((t) => (t[t.SetTitleId = 0] = "SetTitleId", t))(rc || {});
let nc = { 0(t, e) {
  return t.titleId === e.id ? t : { ...t, titleId: e.id };
} }, on = fe(null);
on.displayName = "DialogContext";
function or(t) {
  let e = ie(on);
  if (e === null) {
    let r = new Error(`<${t} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(r, or), r;
  }
  return e;
}
function ac(t, e) {
  return Ie(e.type, nc, t, e);
}
let na = le(function(t, e) {
  let r = At(), { id: n = `headlessui-dialog-${r}`, open: a, onClose: o, initialFocus: l, role: u = "dialog", autoFocus: i = !0, __demoMode: f = !1, unmount: s = !1, ...g } = t, v = k(!1);
  u = function() {
    return u === "dialog" || u === "alertdialog" ? u : (v.current || (v.current = !0, console.warn(`Invalid role [${u}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog");
  }();
  let w = tr();
  a === void 0 && w !== null && (a = (w & me.Open) === me.Open);
  let d = k(null), y = Se(d, e), p = Rt(d), m = a ? 0 : 1, [h, b] = ko(ac, { titleId: null, descriptionId: null, panelRef: jo() }), S = U(() => o(!1)), O = U((q) => b({ type: 0, id: q })), _ = Ft() ? m === 0 : !1, [M, W] = _s(), H = { get current() {
    var q;
    return (q = h.panelRef.current) != null ? q : d.current;
  } }, j = Ka(), { resolveContainers: Y } = Ls({ mainTreeNode: j, portals: M, defaultContainers: [H] }), V = w !== null ? (w & me.Closing) === me.Closing : !1;
  Ju(f || V ? !1 : _, { allowed: U(() => {
    var q, _e;
    return [(_e = (q = d.current) == null ? void 0 : q.closest("[data-headlessui-portal]")) != null ? _e : null];
  }), disallowed: U(() => {
    var q;
    return [(q = j == null ? void 0 : j.closest("body > *:not(#headlessui-portal-root)")) != null ? q : null];
  }) }), cs(_, Y, (q) => {
    q.preventDefault(), S();
  }), ks(_, p == null ? void 0 : p.defaultView, (q) => {
    q.preventDefault(), q.stopPropagation(), document.activeElement && "blur" in document.activeElement && typeof document.activeElement.blur == "function" && document.activeElement.blur(), S();
  }), ms(f || V ? !1 : _, p, Y), Qu(_, d, S);
  let [$, T] = Bu(), D = J(() => [{ dialogState: m, close: S, setTitleId: O, unmount: s }, h], [m, h, S, O, s]), ue = J(() => ({ open: m === 0 }), [m]), pe = { ref: y, id: n, role: u, tabIndex: -1, "aria-modal": f ? void 0 : m === 0 ? !0 : void 0, "aria-labelledby": h.titleId, "aria-describedby": $, unmount: s }, ge = !js(), te = We.None;
  _ && !f && (te |= We.RestoreFocus, te |= We.TabLock, i && (te |= We.AutoFocus), ge && (te |= We.InitialFocus));
  let ye = de();
  return A.createElement(Ps, null, A.createElement(ta, { force: !0 }, A.createElement(Ns, null, A.createElement(on.Provider, { value: D }, A.createElement(za, { target: d }, A.createElement(ta, { force: !1 }, A.createElement(T, { slot: ue }, A.createElement(W, null, A.createElement(Vs, { initialFocus: l, initialFocusFallback: d, containers: Y, features: te }, A.createElement(Yu, { value: S }, ye({ ourProps: pe, theirProps: g, slot: ue, defaultTag: oc, features: ic, visible: m === 0, name: "Dialog" })))))))))));
}), oc = "div", ic = Gt.RenderStrategy | Gt.Static;
function lc(t, e) {
  let { transition: r = !1, open: n, ...a } = t, o = tr(), l = t.hasOwnProperty("open") || o !== null, u = t.hasOwnProperty("onClose");
  if (!l && !u) throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");
  if (!l) throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");
  if (!u) throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");
  if (!o && typeof t.open != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${t.open}`);
  if (typeof t.onClose != "function") throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${t.onClose}`);
  return (n !== void 0 || r) && !a.static ? A.createElement(ra, null, A.createElement(no, { show: n, transition: r, unmount: a.unmount }, A.createElement(na, { ref: e, ...a }))) : A.createElement(ra, null, A.createElement(na, { ref: e, open: n, ...a }));
}
let uc = "div";
function sc(t, e) {
  let r = At(), { id: n = `headlessui-dialog-panel-${r}`, transition: a = !1, ...o } = t, [{ dialogState: l, unmount: u }, i] = or("Dialog.Panel"), f = Se(e, i.panelRef), s = J(() => ({ open: l === 0 }), [l]), g = U((p) => {
    p.stopPropagation();
  }), v = { ref: f, id: n, onClick: g }, w = a ? it : he, d = a ? { unmount: u } : {}, y = de();
  return A.createElement(w, { ...d }, y({ ourProps: v, theirProps: o, slot: s, defaultTag: uc, name: "Dialog.Panel" }));
}
let cc = "div";
function fc(t, e) {
  let { transition: r = !1, ...n } = t, [{ dialogState: a, unmount: o }] = or("Dialog.Backdrop"), l = J(() => ({ open: a === 0 }), [a]), u = { ref: e, "aria-hidden": !0 }, i = r ? it : he, f = r ? { unmount: o } : {}, s = de();
  return A.createElement(i, { ...f }, s({ ourProps: u, theirProps: n, slot: l, defaultTag: cc, name: "Dialog.Backdrop" }));
}
let dc = "h2";
function pc(t, e) {
  let r = At(), { id: n = `headlessui-dialog-title-${r}`, ...a } = t, [{ dialogState: o, setTitleId: l }] = or("Dialog.Title"), u = Se(e);
  z(() => (l(n), () => l(null)), [n, l]);
  let i = J(() => ({ open: o === 0 }), [o]), f = { ref: u, id: n };
  return de()({ ourProps: f, theirProps: a, slot: i, defaultTag: dc, name: "Dialog.Title" });
}
let yc = le(lc), ln = le(sc);
le(fc);
let vc = le(pc), mc = Object.assign(yc, { Panel: ln, Title: vc, Description: Gu });
function ao({ onClick: t }) {
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
const hc = ({ modalContext: t, config: e, children: r }) => /* @__PURE__ */ R.jsx("div", { className: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4", children: /* @__PURE__ */ R.jsx(
  "div",
  {
    className: qt("im-modal-positioner flex min-h-full justify-center", {
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
        className: qt("im-modal-wrapper w-full transition duration-300 ease-in-out", t.onTopOfStack ? "" : "blur-sm", {
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
        children: /* @__PURE__ */ R.jsxs(ln, { className: `im-modal-content relative ${e.paddingClasses} ${e.panelClasses}`, children: [
          e.closeButton && /* @__PURE__ */ R.jsx("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ R.jsx(ao, { onClick: t.close }) }),
          typeof r == "function" ? r({ modalContext: t, config: e }) : r
        ] })
      }
    )
  }
) }), gc = ({ modalContext: t, config: e, children: r }) => /* @__PURE__ */ R.jsx("div", { className: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ R.jsx(
  "div",
  {
    className: qt("im-slideover-positioner flex min-h-full items-center", {
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
        className: qt("im-slideover-wrapper w-full transition duration-300 ease-in-out", t.onTopOfStack ? "" : "blur-sm", {
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
        children: /* @__PURE__ */ R.jsxs(ln, { className: `im-slideover-content relative ${e.paddingClasses} ${e.panelClasses}`, children: [
          e.closeButton && /* @__PURE__ */ R.jsx("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ R.jsx(ao, { onClick: t.close }) }),
          typeof r == "function" ? r({ modalContext: t, config: e }) : r
        ] })
      }
    )
  }
) }), bc = qr(({ name: t, children: e, ...r }, n) => {
  const a = (l) => typeof e == "function" ? e(l) : e, o = k(null);
  return aa(n, () => o.current, [o]), /* @__PURE__ */ R.jsx(
    Ia,
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
        getParentModal: g,
        id: v,
        index: w,
        isOpen: d,
        modalContext: y,
        onTopOfStack: p,
        reload: m,
        setOpen: h,
        shouldRender: b
      }) => /* @__PURE__ */ R.jsx(
        no,
        {
          appear: !0,
          show: d ?? !1,
          children: /* @__PURE__ */ R.jsxs(
            mc,
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
                  gc,
                  {
                    modalContext: y,
                    config: i,
                    children: a({
                      afterLeave: l,
                      close: u,
                      config: i,
                      emit: f,
                      getChildModal: s,
                      getParentModal: g,
                      id: v,
                      index: w,
                      isOpen: d,
                      modalContext: y,
                      onTopOfStack: p,
                      reload: m,
                      setOpen: h,
                      shouldRender: b
                    })
                  }
                ) : /* @__PURE__ */ R.jsx(
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
                      getParentModal: g,
                      id: v,
                      index: w,
                      isOpen: d,
                      modalContext: y,
                      onTopOfStack: p,
                      reload: m,
                      setOpen: h,
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
bc.displayName = "Modal";
const Fc = ({
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
  onStart: g = null,
  onSuccess: v = null,
  navigate: w = null,
  children: d,
  ...y
}) => {
  const [p, m] = Q(!1), [h, b] = Q(null), { stack: S, visit: O } = Jt(), _ = J(() => w ?? Gr("navigate"), [w]), M = {}, W = {};
  Object.keys(y).forEach((T) => {
    Kn.includes(T) || (T.startsWith("on") && typeof y[T] == "function" ? T.toLowerCase() in window ? M[T] = y[T] : W[T] = y[T] : M[T] = y[T]);
  });
  const [H, j] = Q(!1);
  z(() => {
    h && (h.onTopOfStack && H ? s == null || s() : !h.onTopOfStack && !H && (u == null || u()), j(!h.onTopOfStack));
  }, [S]);
  const Y = ve(() => {
    i == null || i();
  }, [i]), V = ve(() => {
    b(null), l == null || l();
  }, [l]), $ = ve(
    (T) => {
      T == null || T.preventDefault(), !p && (t.startsWith("#") || (m(!0), g == null || g()), O(
        t,
        e,
        r,
        a,
        zo(oa(y, Kn)),
        () => Y(S.length),
        V,
        o,
        _
      ).then((D) => {
        b(D), D.registerEventListenersFromProps(W), v == null || v();
      }).catch((D) => {
        console.error(D), f == null || f(D);
      }).finally(() => m(!1)));
    },
    [t, e, r, a, o, y, Y, V]
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
function Ic() {
  return Jt().stack[Ra()] ?? null;
}
export {
  Ia as HeadlessModal,
  bc as Modal,
  Fc as ModalLink,
  Fu as ModalRoot,
  Ru as ModalStackProvider,
  Gr as getConfig,
  Ac as putConfig,
  Tc as renderApp,
  Pc as resetConfig,
  Ic as useModal,
  Ra as useModalIndex,
  Jt as useModalStack
};
