var Ro = Object.defineProperty;
var Fo = (t, e, r) => e in t ? Ro(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var ye = (t, e, r) => Fo(t, typeof e != "symbol" ? e + "" : e, r);
import * as mt from "react";
import A, { createContext as ce, useState as Q, useEffect as K, useContext as ie, createElement as Pr, useMemo as J, forwardRef as Hr, useImperativeHandle as ra, useLayoutEffect as Co, useRef as j, useCallback as ve, Fragment as he, isValidElement as Io, cloneElement as Mo, useId as xt, useSyncExternalStore as _o, useReducer as Do, createRef as No } from "react";
import jt from "axios";
import { router as yt } from "@inertiajs/react";
import { createPortal as ko } from "react-dom";
const Ct = {
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
class jo {
  constructor() {
    this.config = {}, this.reset();
  }
  reset() {
    this.config = JSON.parse(JSON.stringify(Ct));
  }
  put(e, r) {
    if (typeof e == "object") {
      this.config = {
        type: e.type ?? Ct.type,
        modal: { ...Ct.modal, ...e.modal ?? {} },
        slideover: { ...Ct.slideover, ...e.slideover ?? {} }
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
const Yt = new jo(), xc = () => Yt.reset(), Oc = (t, e) => Yt.put(t, e), na = (t) => Yt.get(t), ze = (t, e) => Yt.get(t ? `slideover.${e}` : `modal.${e}`);
var Ar = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Lo(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Wo(t) {
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
var Tr = { exports: {} }, ct = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var wn;
function Uo() {
  if (wn) return ct;
  wn = 1;
  var t = A, e = Symbol.for("react.element"), r = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, a = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = { key: !0, ref: !0, __self: !0, __source: !0 };
  function l(u, i, d) {
    var s, h = {}, v = null, w = null;
    d !== void 0 && (v = "" + d), i.key !== void 0 && (v = "" + i.key), i.ref !== void 0 && (w = i.ref);
    for (s in i) n.call(i, s) && !o.hasOwnProperty(s) && (h[s] = i[s]);
    if (u && u.defaultProps) for (s in i = u.defaultProps, i) h[s] === void 0 && (h[s] = i[s]);
    return { $$typeof: e, type: u, key: v, ref: w, props: h, _owner: a.current };
  }
  return ct.Fragment = r, ct.jsx = l, ct.jsxs = l, ct;
}
var ft = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var En;
function Bo() {
  return En || (En = 1, process.env.NODE_ENV !== "production" && function() {
    var t = A, e = Symbol.for("react.element"), r = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), l = Symbol.for("react.provider"), u = Symbol.for("react.context"), i = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), s = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), v = Symbol.for("react.lazy"), w = Symbol.for("react.offscreen"), f = Symbol.iterator, y = "@@iterator";
    function p(c) {
      if (c === null || typeof c != "object")
        return null;
      var E = f && c[f] || c[y];
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
        var L = x.map(function(I) {
          return String(I);
        });
        L.unshift("Warning: " + E), Function.prototype.apply.call(console[c], console, L);
      }
    }
    var S = !1, O = !1, _ = !1, M = !1, W = !1, H;
    H = Symbol.for("react.module.reference");
    function k(c) {
      return !!(typeof c == "string" || typeof c == "function" || c === n || c === o || W || c === a || c === d || c === s || M || c === w || S || O || _ || typeof c == "object" && c !== null && (c.$$typeof === v || c.$$typeof === h || c.$$typeof === l || c.$$typeof === u || c.$$typeof === i || // This needs to include all possible module reference object
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
        case d:
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
          case h:
            var P = c.displayName || null;
            return P !== null ? P : $(c.type) || "Memo";
          case v: {
            var N = c, L = N._payload, I = N._init;
            try {
              return $(I(L));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var T = Object.assign, D = 0, ue, de, ge, te, pe, q, _e;
    function ee() {
    }
    ee.__reactDisabledLog = !0;
    function nr() {
      {
        if (D === 0) {
          ue = console.log, de = console.info, ge = console.warn, te = console.error, pe = console.group, q = console.groupCollapsed, _e = console.groupEnd;
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
              value: de
            }),
            warn: T({}, c, {
              value: ge
            }),
            error: T({}, c, {
              value: te
            }),
            group: T({}, c, {
              value: pe
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
    var Oe = !1, $t;
    {
      var no = typeof WeakMap == "function" ? WeakMap : Map;
      $t = new no();
    }
    function on(c, E) {
      if (!c || Oe)
        return "";
      {
        var x = $t.get(c);
        if (x !== void 0)
          return x;
      }
      var P;
      Oe = !0;
      var N = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var L;
      L = lt.current, lt.current = null, nr();
      try {
        if (E) {
          var I = function() {
            throw Error();
          };
          if (Object.defineProperty(I.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(I, []);
            } catch (oe) {
              P = oe;
            }
            Reflect.construct(c, [], I);
          } else {
            try {
              I.call();
            } catch (oe) {
              P = oe;
            }
            c.call(I.prototype);
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
`), G = F.length - 1, z = ne.length - 1; G >= 1 && z >= 0 && F[G] !== ne[z]; )
            z--;
          for (; G >= 1 && z >= 0; G--, z--)
            if (F[G] !== ne[z]) {
              if (G !== 1 || z !== 1)
                do
                  if (G--, z--, z < 0 || F[G] !== ne[z]) {
                    var se = `
` + F[G].replace(" at new ", " at ");
                    return c.displayName && se.includes("<anonymous>") && (se = se.replace("<anonymous>", c.displayName)), typeof c == "function" && $t.set(c, se), se;
                  }
                while (G >= 1 && z >= 0);
              break;
            }
        }
      } finally {
        Oe = !1, lt.current = L, De(), Error.prepareStackTrace = N;
      }
      var Ye = c ? c.displayName || c.name : "", ke = Ye ? xe(Ye) : "";
      return typeof c == "function" && $t.set(c, ke), ke;
    }
    function ao(c, E, x) {
      return on(c, !1);
    }
    function oo(c) {
      var E = c.prototype;
      return !!(E && E.isReactComponent);
    }
    function Rt(c, E, x) {
      if (c == null)
        return "";
      if (typeof c == "function")
        return on(c, oo(c));
      if (typeof c == "string")
        return xe(c);
      switch (c) {
        case d:
          return xe("Suspense");
        case s:
          return xe("SuspenseList");
      }
      if (typeof c == "object")
        switch (c.$$typeof) {
          case i:
            return ao(c.render);
          case h:
            return Rt(c.type, E, x);
          case v: {
            var P = c, N = P._payload, L = P._init;
            try {
              return Rt(L(N), E, x);
            } catch {
            }
          }
        }
      return "";
    }
    var ut = Object.prototype.hasOwnProperty, ln = {}, un = m.ReactDebugCurrentFrame;
    function Ft(c) {
      if (c) {
        var E = c._owner, x = Rt(c.type, c._source, E ? E.type : null);
        un.setExtraStackFrame(x);
      } else
        un.setExtraStackFrame(null);
    }
    function io(c, E, x, P, N) {
      {
        var L = Function.call.bind(ut);
        for (var I in c)
          if (L(c, I)) {
            var F = void 0;
            try {
              if (typeof c[I] != "function") {
                var ne = Error((P || "React class") + ": " + x + " type `" + I + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof c[I] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw ne.name = "Invariant Violation", ne;
              }
              F = c[I](E, I, P, x, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (G) {
              F = G;
            }
            F && !(F instanceof Error) && (Ft(N), g("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", P || "React class", x, I, typeof F), Ft(null)), F instanceof Error && !(F.message in ln) && (ln[F.message] = !0, Ft(N), g("Failed %s type: %s", x, F.message), Ft(null));
          }
      }
    }
    var lo = Array.isArray;
    function ar(c) {
      return lo(c);
    }
    function uo(c) {
      {
        var E = typeof Symbol == "function" && Symbol.toStringTag, x = E && c[Symbol.toStringTag] || c.constructor.name || "Object";
        return x;
      }
    }
    function so(c) {
      try {
        return sn(c), !1;
      } catch {
        return !0;
      }
    }
    function sn(c) {
      return "" + c;
    }
    function cn(c) {
      if (so(c))
        return g("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", uo(c)), sn(c);
    }
    var st = m.ReactCurrentOwner, co = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, fn, dn, or;
    or = {};
    function fo(c) {
      if (ut.call(c, "ref")) {
        var E = Object.getOwnPropertyDescriptor(c, "ref").get;
        if (E && E.isReactWarning)
          return !1;
      }
      return c.ref !== void 0;
    }
    function po(c) {
      if (ut.call(c, "key")) {
        var E = Object.getOwnPropertyDescriptor(c, "key").get;
        if (E && E.isReactWarning)
          return !1;
      }
      return c.key !== void 0;
    }
    function yo(c, E) {
      if (typeof c.ref == "string" && st.current && E && st.current.stateNode !== E) {
        var x = $(st.current.type);
        or[x] || (g('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', $(st.current.type), c.ref), or[x] = !0);
      }
    }
    function vo(c, E) {
      {
        var x = function() {
          fn || (fn = !0, g("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", E));
        };
        x.isReactWarning = !0, Object.defineProperty(c, "key", {
          get: x,
          configurable: !0
        });
      }
    }
    function mo(c, E) {
      {
        var x = function() {
          dn || (dn = !0, g("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", E));
        };
        x.isReactWarning = !0, Object.defineProperty(c, "ref", {
          get: x,
          configurable: !0
        });
      }
    }
    var ho = function(c, E, x, P, N, L, I) {
      var F = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: e,
        // Built-in properties that belong on the element
        type: c,
        key: E,
        ref: x,
        props: I,
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
    function go(c, E, x, P, N) {
      {
        var L, I = {}, F = null, ne = null;
        x !== void 0 && (cn(x), F = "" + x), po(E) && (cn(E.key), F = "" + E.key), fo(E) && (ne = E.ref, yo(E, N));
        for (L in E)
          ut.call(E, L) && !co.hasOwnProperty(L) && (I[L] = E[L]);
        if (c && c.defaultProps) {
          var G = c.defaultProps;
          for (L in G)
            I[L] === void 0 && (I[L] = G[L]);
        }
        if (F || ne) {
          var z = typeof c == "function" ? c.displayName || c.name || "Unknown" : c;
          F && vo(I, z), ne && mo(I, z);
        }
        return ho(c, F, ne, N, P, st.current, I);
      }
    }
    var ir = m.ReactCurrentOwner, pn = m.ReactDebugCurrentFrame;
    function Ge(c) {
      if (c) {
        var E = c._owner, x = Rt(c.type, c._source, E ? E.type : null);
        pn.setExtraStackFrame(x);
      } else
        pn.setExtraStackFrame(null);
    }
    var lr;
    lr = !1;
    function ur(c) {
      return typeof c == "object" && c !== null && c.$$typeof === e;
    }
    function yn() {
      {
        if (ir.current) {
          var c = $(ir.current.type);
          if (c)
            return `

Check the render method of \`` + c + "`.";
        }
        return "";
      }
    }
    function bo(c) {
      return "";
    }
    var vn = {};
    function wo(c) {
      {
        var E = yn();
        if (!E) {
          var x = typeof c == "string" ? c : c.displayName || c.name;
          x && (E = `

Check the top-level render call using <` + x + ">.");
        }
        return E;
      }
    }
    function mn(c, E) {
      {
        if (!c._store || c._store.validated || c.key != null)
          return;
        c._store.validated = !0;
        var x = wo(E);
        if (vn[x])
          return;
        vn[x] = !0;
        var P = "";
        c && c._owner && c._owner !== ir.current && (P = " It was passed a child from " + $(c._owner.type) + "."), Ge(c), g('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', x, P), Ge(null);
      }
    }
    function hn(c, E) {
      {
        if (typeof c != "object")
          return;
        if (ar(c))
          for (var x = 0; x < c.length; x++) {
            var P = c[x];
            ur(P) && mn(P, E);
          }
        else if (ur(c))
          c._store && (c._store.validated = !0);
        else if (c) {
          var N = p(c);
          if (typeof N == "function" && N !== c.entries)
            for (var L = N.call(c), I; !(I = L.next()).done; )
              ur(I.value) && mn(I.value, E);
        }
      }
    }
    function Eo(c) {
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
          io(x, c.props, "prop", P, c);
        } else if (E.PropTypes !== void 0 && !lr) {
          lr = !0;
          var N = $(E);
          g("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", N || "Unknown");
        }
        typeof E.getDefaultProps == "function" && !E.getDefaultProps.isReactClassApproved && g("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function So(c) {
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
    var gn = {};
    function bn(c, E, x, P, N, L) {
      {
        var I = k(c);
        if (!I) {
          var F = "";
          (c === void 0 || typeof c == "object" && c !== null && Object.keys(c).length === 0) && (F += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ne = bo();
          ne ? F += ne : F += yn();
          var G;
          c === null ? G = "null" : ar(c) ? G = "array" : c !== void 0 && c.$$typeof === e ? (G = "<" + ($(c.type) || "Unknown") + " />", F = " Did you accidentally export a JSX literal instead of a component?") : G = typeof c, g("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", G, F);
        }
        var z = go(c, E, x, N, L);
        if (z == null)
          return z;
        if (I) {
          var se = E.children;
          if (se !== void 0)
            if (P)
              if (ar(se)) {
                for (var Ye = 0; Ye < se.length; Ye++)
                  hn(se[Ye], c);
                Object.freeze && Object.freeze(se);
              } else
                g("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              hn(se, c);
        }
        if (ut.call(E, "key")) {
          var ke = $(c), oe = Object.keys(E).filter(function($o) {
            return $o !== "key";
          }), sr = oe.length > 0 ? "{key: someKey, " + oe.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!gn[ke + sr]) {
            var To = oe.length > 0 ? "{" + oe.join(": ..., ") + ": ...}" : "{}";
            g(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, sr, ke, To, ke), gn[ke + sr] = !0;
          }
        }
        return c === n ? So(z) : Eo(z), z;
      }
    }
    function xo(c, E, x) {
      return bn(c, E, x, !0);
    }
    function Oo(c, E, x) {
      return bn(c, E, x, !1);
    }
    var Po = Oo, Ao = xo;
    ft.Fragment = n, ft.jsx = Po, ft.jsxs = Ao;
  }()), ft;
}
process.env.NODE_ENV === "production" ? Tr.exports = Uo() : Tr.exports = Bo();
var R = Tr.exports;
function Ho(t, e) {
  return Array.isArray(t) ? t.filter((r) => !e.includes(r)) : Object.keys(t).reduce((r, n) => (e.includes(n) || (r[n] = t[n]), r), {});
}
function aa(t, e) {
  return Array.isArray(t) ? t.filter((r) => e.includes(r)) : e.reduce((r, n) => (n in t && (r[n] = t[n]), r), {});
}
function Vo(t) {
  return Array.isArray(t) ? t.filter((e) => e !== null) : Object.keys(t).reduce((e, r) => (r in t && t[r] !== null && (e[r] = t[r]), e), {});
}
function qo(t, e = 3, r = 10) {
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
var Go = function(e) {
  return Yo(e) && !zo(e);
};
function Yo(t) {
  return !!t && typeof t == "object";
}
function zo(t) {
  var e = Object.prototype.toString.call(t);
  return e === "[object RegExp]" || e === "[object Date]" || Jo(t);
}
var Ko = typeof Symbol == "function" && Symbol.for, Xo = Ko ? Symbol.for("react.element") : 60103;
function Jo(t) {
  return t.$$typeof === Xo;
}
function Qo(t) {
  return Array.isArray(t) ? [] : {};
}
function St(t, e) {
  return e.clone !== !1 && e.isMergeableObject(t) ? Ze(Qo(t), t, e) : t;
}
function Zo(t, e, r) {
  return t.concat(e).map(function(n) {
    return St(n, r);
  });
}
function ei(t, e) {
  if (!e.customMerge)
    return Ze;
  var r = e.customMerge(t);
  return typeof r == "function" ? r : Ze;
}
function ti(t) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(t).filter(function(e) {
    return Object.propertyIsEnumerable.call(t, e);
  }) : [];
}
function Sn(t) {
  return Object.keys(t).concat(ti(t));
}
function oa(t, e) {
  try {
    return e in t;
  } catch {
    return !1;
  }
}
function ri(t, e) {
  return oa(t, e) && !(Object.hasOwnProperty.call(t, e) && Object.propertyIsEnumerable.call(t, e));
}
function ni(t, e, r) {
  var n = {};
  return r.isMergeableObject(t) && Sn(t).forEach(function(a) {
    n[a] = St(t[a], r);
  }), Sn(e).forEach(function(a) {
    ri(t, a) || (oa(t, a) && r.isMergeableObject(e[a]) ? n[a] = ei(a, r)(t[a], e[a], r) : n[a] = St(e[a], r));
  }), n;
}
function Ze(t, e, r) {
  r = r || {}, r.arrayMerge = r.arrayMerge || Zo, r.isMergeableObject = r.isMergeableObject || Go, r.cloneUnlessOtherwiseSpecified = St;
  var n = Array.isArray(e), a = Array.isArray(t), o = n === a;
  return o ? n ? r.arrayMerge(t, e, r) : ni(t, e, r) : St(e, r);
}
Ze.all = function(e, r) {
  if (!Array.isArray(e))
    throw new Error("first argument should be an array");
  return e.reduce(function(n, a) {
    return Ze(n, a, r);
  }, {});
};
var ai = Ze, oi = ai;
const ii = /* @__PURE__ */ Lo(oi);
var li = Error, ui = EvalError, si = RangeError, ci = ReferenceError, ia = SyntaxError, Ot = TypeError, fi = URIError, di = function() {
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
}, xn = typeof Symbol < "u" && Symbol, pi = di, yi = function() {
  return typeof xn != "function" || typeof Symbol != "function" || typeof xn("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : pi();
}, cr = {
  __proto__: null,
  foo: {}
}, vi = Object, mi = function() {
  return { __proto__: cr }.foo === cr.foo && !(cr instanceof vi);
}, hi = "Function.prototype.bind called on incompatible ", gi = Object.prototype.toString, bi = Math.max, wi = "[object Function]", On = function(e, r) {
  for (var n = [], a = 0; a < e.length; a += 1)
    n[a] = e[a];
  for (var o = 0; o < r.length; o += 1)
    n[o + e.length] = r[o];
  return n;
}, Ei = function(e, r) {
  for (var n = [], a = r, o = 0; a < e.length; a += 1, o += 1)
    n[o] = e[a];
  return n;
}, Si = function(t, e) {
  for (var r = "", n = 0; n < t.length; n += 1)
    r += t[n], n + 1 < t.length && (r += e);
  return r;
}, xi = function(e) {
  var r = this;
  if (typeof r != "function" || gi.apply(r) !== wi)
    throw new TypeError(hi + r);
  for (var n = Ei(arguments, 1), a, o = function() {
    if (this instanceof a) {
      var s = r.apply(
        this,
        On(n, arguments)
      );
      return Object(s) === s ? s : this;
    }
    return r.apply(
      e,
      On(n, arguments)
    );
  }, l = bi(0, r.length - n.length), u = [], i = 0; i < l; i++)
    u[i] = "$" + i;
  if (a = Function("binder", "return function (" + Si(u, ",") + "){ return binder.apply(this,arguments); }")(o), r.prototype) {
    var d = function() {
    };
    d.prototype = r.prototype, a.prototype = new d(), d.prototype = null;
  }
  return a;
}, Oi = xi, Vr = Function.prototype.bind || Oi, Pi = Function.prototype.call, Ai = Object.prototype.hasOwnProperty, Ti = Vr, $i = Ti.call(Pi, Ai), C, Ri = li, Fi = ui, Ci = si, Ii = ci, et = ia, Qe = Ot, Mi = fi, la = Function, fr = function(t) {
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
var dr = function() {
  throw new Qe();
}, _i = Be ? function() {
  try {
    return arguments.callee, dr;
  } catch {
    try {
      return Be(arguments, "callee").get;
    } catch {
      return dr;
    }
  }
}() : dr, Ke = yi(), Di = mi(), Z = Object.getPrototypeOf || (Di ? function(t) {
  return t.__proto__;
} : null), Je = {}, Ni = typeof Uint8Array > "u" || !Z ? C : Z(Uint8Array), He = {
  __proto__: null,
  "%AggregateError%": typeof AggregateError > "u" ? C : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? C : ArrayBuffer,
  "%ArrayIteratorPrototype%": Ke && Z ? Z([][Symbol.iterator]()) : C,
  "%AsyncFromSyncIteratorPrototype%": C,
  "%AsyncFunction%": Je,
  "%AsyncGenerator%": Je,
  "%AsyncGeneratorFunction%": Je,
  "%AsyncIteratorPrototype%": Je,
  "%Atomics%": typeof Atomics > "u" ? C : Atomics,
  "%BigInt%": typeof BigInt > "u" ? C : BigInt,
  "%BigInt64Array%": typeof BigInt64Array > "u" ? C : BigInt64Array,
  "%BigUint64Array%": typeof BigUint64Array > "u" ? C : BigUint64Array,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView > "u" ? C : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": Ri,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": Fi,
  "%Float32Array%": typeof Float32Array > "u" ? C : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? C : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? C : FinalizationRegistry,
  "%Function%": la,
  "%GeneratorFunction%": Je,
  "%Int8Array%": typeof Int8Array > "u" ? C : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? C : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? C : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": Ke && Z ? Z(Z([][Symbol.iterator]())) : C,
  "%JSON%": typeof JSON == "object" ? JSON : C,
  "%Map%": typeof Map > "u" ? C : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !Ke || !Z ? C : Z((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": Object,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise > "u" ? C : Promise,
  "%Proxy%": typeof Proxy > "u" ? C : Proxy,
  "%RangeError%": Ci,
  "%ReferenceError%": Ii,
  "%Reflect%": typeof Reflect > "u" ? C : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? C : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !Ke || !Z ? C : Z((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? C : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": Ke && Z ? Z(""[Symbol.iterator]()) : C,
  "%Symbol%": Ke ? Symbol : C,
  "%SyntaxError%": et,
  "%ThrowTypeError%": _i,
  "%TypedArray%": Ni,
  "%TypeError%": Qe,
  "%Uint8Array%": typeof Uint8Array > "u" ? C : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? C : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? C : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? C : Uint32Array,
  "%URIError%": Mi,
  "%WeakMap%": typeof WeakMap > "u" ? C : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? C : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? C : WeakSet
};
if (Z)
  try {
    null.error;
  } catch (t) {
    var ki = Z(Z(t));
    He["%Error.prototype%"] = ki;
  }
var ji = function t(e) {
  var r;
  if (e === "%AsyncFunction%")
    r = fr("async function () {}");
  else if (e === "%GeneratorFunction%")
    r = fr("function* () {}");
  else if (e === "%AsyncGeneratorFunction%")
    r = fr("async function* () {}");
  else if (e === "%AsyncGenerator%") {
    var n = t("%AsyncGeneratorFunction%");
    n && (r = n.prototype);
  } else if (e === "%AsyncIteratorPrototype%") {
    var a = t("%AsyncGenerator%");
    a && Z && (r = Z(a.prototype));
  }
  return He[e] = r, r;
}, Pn = {
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
}, Pt = Vr, Lt = $i, Li = Pt.call(Function.call, Array.prototype.concat), Wi = Pt.call(Function.apply, Array.prototype.splice), An = Pt.call(Function.call, String.prototype.replace), Wt = Pt.call(Function.call, String.prototype.slice), Ui = Pt.call(Function.call, RegExp.prototype.exec), Bi = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, Hi = /\\(\\)?/g, Vi = function(e) {
  var r = Wt(e, 0, 1), n = Wt(e, -1);
  if (r === "%" && n !== "%")
    throw new et("invalid intrinsic syntax, expected closing `%`");
  if (n === "%" && r !== "%")
    throw new et("invalid intrinsic syntax, expected opening `%`");
  var a = [];
  return An(e, Bi, function(o, l, u, i) {
    a[a.length] = u ? An(i, Hi, "$1") : l || o;
  }), a;
}, qi = function(e, r) {
  var n = e, a;
  if (Lt(Pn, n) && (a = Pn[n], n = "%" + a[0] + "%"), Lt(He, n)) {
    var o = He[n];
    if (o === Je && (o = ji(n)), typeof o > "u" && !r)
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
  if (Ui(/^%?[^%]*%?$/, e) === null)
    throw new et("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var n = Vi(e), a = n.length > 0 ? n[0] : "", o = qi("%" + a + "%", r), l = o.name, u = o.value, i = !1, d = o.alias;
  d && (a = d[0], Wi(n, Li([0, 1], d)));
  for (var s = 1, h = !0; s < n.length; s += 1) {
    var v = n[s], w = Wt(v, 0, 1), f = Wt(v, -1);
    if ((w === '"' || w === "'" || w === "`" || f === '"' || f === "'" || f === "`") && w !== f)
      throw new et("property names with quotes must have matching quotes");
    if ((v === "constructor" || !h) && (i = !0), a += "." + v, l = "%" + a + "%", Lt(He, l))
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
        h = Lt(u, v), u = u[v];
      h && !i && (He[l] = u);
    }
  }
  return u;
}, ua = { exports: {} }, pr, Tn;
function qr() {
  if (Tn) return pr;
  Tn = 1;
  var t = nt, e = t("%Object.defineProperty%", !0) || !1;
  if (e)
    try {
      e({}, "a", { value: 1 });
    } catch {
      e = !1;
    }
  return pr = e, pr;
}
var Gi = nt, Nt = Gi("%Object.getOwnPropertyDescriptor%", !0);
if (Nt)
  try {
    Nt([], "length");
  } catch {
    Nt = null;
  }
var sa = Nt, $n = qr(), Yi = ia, Xe = Ot, Rn = sa, zi = function(e, r, n) {
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
  var a = arguments.length > 3 ? arguments[3] : null, o = arguments.length > 4 ? arguments[4] : null, l = arguments.length > 5 ? arguments[5] : null, u = arguments.length > 6 ? arguments[6] : !1, i = !!Rn && Rn(e, r);
  if ($n)
    $n(e, r, {
      configurable: l === null && i ? i.configurable : !l,
      enumerable: a === null && i ? i.enumerable : !a,
      value: n,
      writable: o === null && i ? i.writable : !o
    });
  else if (u || !a && !o && !l)
    e[r] = n;
  else
    throw new Yi("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
}, $r = qr(), ca = function() {
  return !!$r;
};
ca.hasArrayLengthDefineBug = function() {
  if (!$r)
    return null;
  try {
    return $r([], "length", { value: 1 }).length !== 1;
  } catch {
    return !0;
  }
};
var Ki = ca, Xi = nt, Fn = zi, Ji = Ki(), Cn = sa, In = Ot, Qi = Xi("%Math.floor%"), Zi = function(e, r) {
  if (typeof e != "function")
    throw new In("`fn` is not a function");
  if (typeof r != "number" || r < 0 || r > 4294967295 || Qi(r) !== r)
    throw new In("`length` must be a positive 32-bit integer");
  var n = arguments.length > 2 && !!arguments[2], a = !0, o = !0;
  if ("length" in e && Cn) {
    var l = Cn(e, "length");
    l && !l.configurable && (a = !1), l && !l.writable && (o = !1);
  }
  return (a || o || !n) && (Ji ? Fn(
    /** @type {Parameters<define>[0]} */
    e,
    "length",
    r,
    !0,
    !0
  ) : Fn(
    /** @type {Parameters<define>[0]} */
    e,
    "length",
    r
  )), e;
};
(function(t) {
  var e = Vr, r = nt, n = Zi, a = Ot, o = r("%Function.prototype.apply%"), l = r("%Function.prototype.call%"), u = r("%Reflect.apply%", !0) || e.call(l, o), i = qr(), d = r("%Math.max%");
  t.exports = function(v) {
    if (typeof v != "function")
      throw new a("a function is required");
    var w = u(e, l, arguments);
    return n(
      w,
      1 + d(0, v.length - (arguments.length - 1)),
      !0
    );
  };
  var s = function() {
    return u(e, o, arguments);
  };
  i ? i(t.exports, "apply", { value: s }) : t.exports.apply = s;
})(ua);
var el = ua.exports, fa = nt, da = el, tl = da(fa("String.prototype.indexOf")), rl = function(e, r) {
  var n = fa(e, !!r);
  return typeof n == "function" && tl(e, ".prototype.") > -1 ? da(n) : n;
};
const nl = {}, al = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: nl
}, Symbol.toStringTag, { value: "Module" })), ol = /* @__PURE__ */ Wo(al);
var Gr = typeof Map == "function" && Map.prototype, yr = Object.getOwnPropertyDescriptor && Gr ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, Ut = Gr && yr && typeof yr.get == "function" ? yr.get : null, Mn = Gr && Map.prototype.forEach, Yr = typeof Set == "function" && Set.prototype, vr = Object.getOwnPropertyDescriptor && Yr ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, Bt = Yr && vr && typeof vr.get == "function" ? vr.get : null, _n = Yr && Set.prototype.forEach, il = typeof WeakMap == "function" && WeakMap.prototype, ht = il ? WeakMap.prototype.has : null, ll = typeof WeakSet == "function" && WeakSet.prototype, gt = ll ? WeakSet.prototype.has : null, ul = typeof WeakRef == "function" && WeakRef.prototype, Dn = ul ? WeakRef.prototype.deref : null, sl = Boolean.prototype.valueOf, cl = Object.prototype.toString, fl = Function.prototype.toString, dl = String.prototype.match, zr = String.prototype.slice, Re = String.prototype.replace, pl = String.prototype.toUpperCase, Nn = String.prototype.toLowerCase, pa = RegExp.prototype.test, kn = Array.prototype.concat, Ee = Array.prototype.join, yl = Array.prototype.slice, jn = Math.floor, Rr = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, mr = Object.getOwnPropertySymbols, Fr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, tt = typeof Symbol == "function" && typeof Symbol.iterator == "object", re = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === tt || !0) ? Symbol.toStringTag : null, ya = Object.prototype.propertyIsEnumerable, Ln = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(t) {
  return t.__proto__;
} : null);
function Wn(t, e) {
  if (t === 1 / 0 || t === -1 / 0 || t !== t || t && t > -1e3 && t < 1e3 || pa.call(/e/, e))
    return e;
  var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof t == "number") {
    var n = t < 0 ? -jn(-t) : jn(t);
    if (n !== t) {
      var a = String(n), o = zr.call(e, a.length + 1);
      return Re.call(a, r, "$&_") + "." + Re.call(Re.call(o, /([0-9]{3})/g, "$&_"), /_$/, "");
    }
  }
  return Re.call(e, r, "$&_");
}
var Cr = ol, Un = Cr.custom, Bn = ma(Un) ? Un : null, vl = function t(e, r, n, a) {
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
    return u ? Wn(e, i) : i;
  }
  if (typeof e == "bigint") {
    var d = String(e) + "n";
    return u ? Wn(e, d) : d;
  }
  var s = typeof o.depth > "u" ? 5 : o.depth;
  if (typeof n > "u" && (n = 0), n >= s && s > 0 && typeof e == "object")
    return Ir(e) ? "[Array]" : "[Object]";
  var h = Ml(o, n);
  if (typeof a > "u")
    a = [];
  else if (ha(a, e) >= 0)
    return "[Circular]";
  function v($, T, D) {
    if (T && (a = yl.call(a), a.push(T)), D) {
      var ue = {
        depth: o.depth
      };
      return Te(o, "quoteStyle") && (ue.quoteStyle = o.quoteStyle), t($, ue, n + 1, a);
    }
    return t($, o, n + 1, a);
  }
  if (typeof e == "function" && !Hn(e)) {
    var w = Ol(e), f = It(e, v);
    return "[Function" + (w ? ": " + w : " (anonymous)") + "]" + (f.length > 0 ? " { " + Ee.call(f, ", ") + " }" : "");
  }
  if (ma(e)) {
    var y = tt ? Re.call(String(e), /^(Symbol\(.*\))_[^)]*$/, "$1") : Fr.call(e);
    return typeof e == "object" && !tt ? dt(y) : y;
  }
  if (Fl(e)) {
    for (var p = "<" + Nn.call(String(e.nodeName)), m = e.attributes || [], g = 0; g < m.length; g++)
      p += " " + m[g].name + "=" + va(ml(m[g].value), "double", o);
    return p += ">", e.childNodes && e.childNodes.length && (p += "..."), p += "</" + Nn.call(String(e.nodeName)) + ">", p;
  }
  if (Ir(e)) {
    if (e.length === 0)
      return "[]";
    var b = It(e, v);
    return h && !Il(b) ? "[" + Mr(b, h) + "]" : "[ " + Ee.call(b, ", ") + " ]";
  }
  if (gl(e)) {
    var S = It(e, v);
    return !("cause" in Error.prototype) && "cause" in e && !ya.call(e, "cause") ? "{ [" + String(e) + "] " + Ee.call(kn.call("[cause]: " + v(e.cause), S), ", ") + " }" : S.length === 0 ? "[" + String(e) + "]" : "{ [" + String(e) + "] " + Ee.call(S, ", ") + " }";
  }
  if (typeof e == "object" && l) {
    if (Bn && typeof e[Bn] == "function" && Cr)
      return Cr(e, { depth: s - n });
    if (l !== "symbol" && typeof e.inspect == "function")
      return e.inspect();
  }
  if (Pl(e)) {
    var O = [];
    return Mn && Mn.call(e, function($, T) {
      O.push(v(T, e, !0) + " => " + v($, e));
    }), Vn("Map", Ut.call(e), O, h);
  }
  if ($l(e)) {
    var _ = [];
    return _n && _n.call(e, function($) {
      _.push(v($, e));
    }), Vn("Set", Bt.call(e), _, h);
  }
  if (Al(e))
    return hr("WeakMap");
  if (Rl(e))
    return hr("WeakSet");
  if (Tl(e))
    return hr("WeakRef");
  if (wl(e))
    return dt(v(Number(e)));
  if (Sl(e))
    return dt(v(Rr.call(e)));
  if (El(e))
    return dt(sl.call(e));
  if (bl(e))
    return dt(v(String(e)));
  if (typeof window < "u" && e === window)
    return "{ [object Window] }";
  if (typeof globalThis < "u" && e === globalThis || typeof Ar < "u" && e === Ar)
    return "{ [object globalThis] }";
  if (!hl(e) && !Hn(e)) {
    var M = It(e, v), W = Ln ? Ln(e) === Object.prototype : e instanceof Object || e.constructor === Object, H = e instanceof Object ? "" : "null prototype", k = !W && re && Object(e) === e && re in e ? zr.call(Ie(e), 8, -1) : H ? "Object" : "", Y = W || typeof e.constructor != "function" ? "" : e.constructor.name ? e.constructor.name + " " : "", V = Y + (k || H ? "[" + Ee.call(kn.call([], k || [], H || []), ": ") + "] " : "");
    return M.length === 0 ? V + "{}" : h ? V + "{" + Mr(M, h) + "}" : V + "{ " + Ee.call(M, ", ") + " }";
  }
  return String(e);
};
function va(t, e, r) {
  var n = (r.quoteStyle || e) === "double" ? '"' : "'";
  return n + t + n;
}
function ml(t) {
  return Re.call(String(t), /"/g, "&quot;");
}
function Ir(t) {
  return Ie(t) === "[object Array]" && (!re || !(typeof t == "object" && re in t));
}
function hl(t) {
  return Ie(t) === "[object Date]" && (!re || !(typeof t == "object" && re in t));
}
function Hn(t) {
  return Ie(t) === "[object RegExp]" && (!re || !(typeof t == "object" && re in t));
}
function gl(t) {
  return Ie(t) === "[object Error]" && (!re || !(typeof t == "object" && re in t));
}
function bl(t) {
  return Ie(t) === "[object String]" && (!re || !(typeof t == "object" && re in t));
}
function wl(t) {
  return Ie(t) === "[object Number]" && (!re || !(typeof t == "object" && re in t));
}
function El(t) {
  return Ie(t) === "[object Boolean]" && (!re || !(typeof t == "object" && re in t));
}
function ma(t) {
  if (tt)
    return t && typeof t == "object" && t instanceof Symbol;
  if (typeof t == "symbol")
    return !0;
  if (!t || typeof t != "object" || !Fr)
    return !1;
  try {
    return Fr.call(t), !0;
  } catch {
  }
  return !1;
}
function Sl(t) {
  if (!t || typeof t != "object" || !Rr)
    return !1;
  try {
    return Rr.call(t), !0;
  } catch {
  }
  return !1;
}
var xl = Object.prototype.hasOwnProperty || function(t) {
  return t in this;
};
function Te(t, e) {
  return xl.call(t, e);
}
function Ie(t) {
  return cl.call(t);
}
function Ol(t) {
  if (t.name)
    return t.name;
  var e = dl.call(fl.call(t), /^function\s*([\w$]+)/);
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
function Pl(t) {
  if (!Ut || !t || typeof t != "object")
    return !1;
  try {
    Ut.call(t);
    try {
      Bt.call(t);
    } catch {
      return !0;
    }
    return t instanceof Map;
  } catch {
  }
  return !1;
}
function Al(t) {
  if (!ht || !t || typeof t != "object")
    return !1;
  try {
    ht.call(t, ht);
    try {
      gt.call(t, gt);
    } catch {
      return !0;
    }
    return t instanceof WeakMap;
  } catch {
  }
  return !1;
}
function Tl(t) {
  if (!Dn || !t || typeof t != "object")
    return !1;
  try {
    return Dn.call(t), !0;
  } catch {
  }
  return !1;
}
function $l(t) {
  if (!Bt || !t || typeof t != "object")
    return !1;
  try {
    Bt.call(t);
    try {
      Ut.call(t);
    } catch {
      return !0;
    }
    return t instanceof Set;
  } catch {
  }
  return !1;
}
function Rl(t) {
  if (!gt || !t || typeof t != "object")
    return !1;
  try {
    gt.call(t, gt);
    try {
      ht.call(t, ht);
    } catch {
      return !0;
    }
    return t instanceof WeakSet;
  } catch {
  }
  return !1;
}
function Fl(t) {
  return !t || typeof t != "object" ? !1 : typeof HTMLElement < "u" && t instanceof HTMLElement ? !0 : typeof t.nodeName == "string" && typeof t.getAttribute == "function";
}
function ga(t, e) {
  if (t.length > e.maxStringLength) {
    var r = t.length - e.maxStringLength, n = "... " + r + " more character" + (r > 1 ? "s" : "");
    return ga(zr.call(t, 0, e.maxStringLength), e) + n;
  }
  var a = Re.call(Re.call(t, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, Cl);
  return va(a, "single", e);
}
function Cl(t) {
  var e = t.charCodeAt(0), r = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[e];
  return r ? "\\" + r : "\\x" + (e < 16 ? "0" : "") + pl.call(e.toString(16));
}
function dt(t) {
  return "Object(" + t + ")";
}
function hr(t) {
  return t + " { ? }";
}
function Vn(t, e, r, n) {
  var a = n ? Mr(r, n) : Ee.call(r, ", ");
  return t + " (" + e + ") {" + a + "}";
}
function Il(t) {
  for (var e = 0; e < t.length; e++)
    if (ha(t[e], `
`) >= 0)
      return !1;
  return !0;
}
function Ml(t, e) {
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
function Mr(t, e) {
  if (t.length === 0)
    return "";
  var r = `
` + e.prev + e.base;
  return r + Ee.call(t, "," + r) + `
` + e.prev;
}
function It(t, e) {
  var r = Ir(t), n = [];
  if (r) {
    n.length = t.length;
    for (var a = 0; a < t.length; a++)
      n[a] = Te(t, a) ? e(t[a], t) : "";
  }
  var o = typeof mr == "function" ? mr(t) : [], l;
  if (tt) {
    l = {};
    for (var u = 0; u < o.length; u++)
      l["$" + o[u]] = o[u];
  }
  for (var i in t)
    Te(t, i) && (r && String(Number(i)) === i && i < t.length || tt && l["$" + i] instanceof Symbol || (pa.call(/[^\w$]/, i) ? n.push(e(i, t) + ": " + e(t[i], t)) : n.push(i + ": " + e(t[i], t))));
  if (typeof mr == "function")
    for (var d = 0; d < o.length; d++)
      ya.call(t, o[d]) && n.push("[" + e(o[d]) + "]: " + e(t[o[d]], t));
  return n;
}
var ba = nt, at = rl, _l = vl, Dl = Ot, Mt = ba("%WeakMap%", !0), _t = ba("%Map%", !0), Nl = at("WeakMap.prototype.get", !0), kl = at("WeakMap.prototype.set", !0), jl = at("WeakMap.prototype.has", !0), Ll = at("Map.prototype.get", !0), Wl = at("Map.prototype.set", !0), Ul = at("Map.prototype.has", !0), Kr = function(t, e) {
  for (var r = t, n; (n = r.next) !== null; r = n)
    if (n.key === e)
      return r.next = n.next, n.next = /** @type {NonNullable<typeof list.next>} */
      t.next, t.next = n, n;
}, Bl = function(t, e) {
  var r = Kr(t, e);
  return r && r.value;
}, Hl = function(t, e, r) {
  var n = Kr(t, e);
  n ? n.value = r : t.next = /** @type {import('.').ListNode<typeof value>} */
  {
    // eslint-disable-line no-param-reassign, no-extra-parens
    key: e,
    next: t.next,
    value: r
  };
}, Vl = function(t, e) {
  return !!Kr(t, e);
}, ql = function() {
  var e, r, n, a = {
    assert: function(o) {
      if (!a.has(o))
        throw new Dl("Side channel does not contain " + _l(o));
    },
    get: function(o) {
      if (Mt && o && (typeof o == "object" || typeof o == "function")) {
        if (e)
          return Nl(e, o);
      } else if (_t) {
        if (r)
          return Ll(r, o);
      } else if (n)
        return Bl(n, o);
    },
    has: function(o) {
      if (Mt && o && (typeof o == "object" || typeof o == "function")) {
        if (e)
          return jl(e, o);
      } else if (_t) {
        if (r)
          return Ul(r, o);
      } else if (n)
        return Vl(n, o);
      return !1;
    },
    set: function(o, l) {
      Mt && o && (typeof o == "object" || typeof o == "function") ? (e || (e = new Mt()), kl(e, o, l)) : _t ? (r || (r = new _t()), Wl(r, o, l)) : (n || (n = { key: {}, next: null }), Hl(n, o, l));
    }
  };
  return a;
}, Gl = String.prototype.replace, Yl = /%20/g, gr = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
}, Xr = {
  default: gr.RFC3986,
  formatters: {
    RFC1738: function(t) {
      return Gl.call(t, Yl, "+");
    },
    RFC3986: function(t) {
      return String(t);
    }
  },
  RFC1738: gr.RFC1738,
  RFC3986: gr.RFC3986
}, zl = Xr, br = Object.prototype.hasOwnProperty, Le = Array.isArray, be = function() {
  for (var t = [], e = 0; e < 256; ++e)
    t.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());
  return t;
}(), Kl = function(e) {
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
}, Xl = function t(e, r, n) {
  if (!r)
    return e;
  if (typeof r != "object") {
    if (Le(e))
      e.push(r);
    else if (e && typeof e == "object")
      (n && (n.plainObjects || n.allowPrototypes) || !br.call(Object.prototype, r)) && (e[r] = !0);
    else
      return [e, r];
    return e;
  }
  if (!e || typeof e != "object")
    return [e].concat(r);
  var a = e;
  return Le(e) && !Le(r) && (a = wa(e, n)), Le(e) && Le(r) ? (r.forEach(function(o, l) {
    if (br.call(e, l)) {
      var u = e[l];
      u && typeof u == "object" && o && typeof o == "object" ? e[l] = t(u, o, n) : e.push(o);
    } else
      e[l] = o;
  }), e) : Object.keys(r).reduce(function(o, l) {
    var u = r[l];
    return br.call(o, l) ? o[l] = t(o[l], u, n) : o[l] = u, o;
  }, a);
}, Jl = function(e, r) {
  return Object.keys(r).reduce(function(n, a) {
    return n[a] = r[a], n;
  }, e);
}, Ql = function(t, e, r) {
  var n = t.replace(/\+/g, " ");
  if (r === "iso-8859-1")
    return n.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n);
  } catch {
    return n;
  }
}, wr = 1024, Zl = function(e, r, n, a, o) {
  if (e.length === 0)
    return e;
  var l = e;
  if (typeof e == "symbol" ? l = Symbol.prototype.toString.call(e) : typeof e != "string" && (l = String(e)), n === "iso-8859-1")
    return escape(l).replace(/%u[0-9a-f]{4}/gi, function(w) {
      return "%26%23" + parseInt(w.slice(2), 16) + "%3B";
    });
  for (var u = "", i = 0; i < l.length; i += wr) {
    for (var d = l.length >= wr ? l.slice(i, i + wr) : l, s = [], h = 0; h < d.length; ++h) {
      var v = d.charCodeAt(h);
      if (v === 45 || v === 46 || v === 95 || v === 126 || v >= 48 && v <= 57 || v >= 65 && v <= 90 || v >= 97 && v <= 122 || o === zl.RFC1738 && (v === 40 || v === 41)) {
        s[s.length] = d.charAt(h);
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
      h += 1, v = 65536 + ((v & 1023) << 10 | d.charCodeAt(h) & 1023), s[s.length] = be[240 | v >> 18] + be[128 | v >> 12 & 63] + be[128 | v >> 6 & 63] + be[128 | v & 63];
    }
    u += s.join("");
  }
  return u;
}, eu = function(e) {
  for (var r = [{ obj: { o: e }, prop: "o" }], n = [], a = 0; a < r.length; ++a)
    for (var o = r[a], l = o.obj[o.prop], u = Object.keys(l), i = 0; i < u.length; ++i) {
      var d = u[i], s = l[d];
      typeof s == "object" && s !== null && n.indexOf(s) === -1 && (r.push({ obj: l, prop: d }), n.push(s));
    }
  return Kl(r), e;
}, tu = function(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}, ru = function(e) {
  return !e || typeof e != "object" ? !1 : !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e));
}, nu = function(e, r) {
  return [].concat(e, r);
}, au = function(e, r) {
  if (Le(e)) {
    for (var n = [], a = 0; a < e.length; a += 1)
      n.push(r(e[a]));
    return n;
  }
  return r(e);
}, Ea = {
  arrayToObject: wa,
  assign: Jl,
  combine: nu,
  compact: eu,
  decode: Ql,
  encode: Zl,
  isBuffer: ru,
  isRegExp: tu,
  maybeMap: au,
  merge: Xl
}, Sa = ql, kt = Ea, bt = Xr, ou = Object.prototype.hasOwnProperty, xa = {
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
}, we = Array.isArray, iu = Array.prototype.push, Oa = function(t, e) {
  iu.apply(t, we(e) ? e : [e]);
}, lu = Date.prototype.toISOString, qn = bt.default, X = {
  addQueryPrefix: !1,
  allowDots: !1,
  allowEmptyArrays: !1,
  arrayFormat: "indices",
  charset: "utf-8",
  charsetSentinel: !1,
  delimiter: "&",
  encode: !0,
  encodeDotInKeys: !1,
  encoder: kt.encode,
  encodeValuesOnly: !1,
  format: qn,
  formatter: bt.formatters[qn],
  // deprecated
  indices: !1,
  serializeDate: function(e) {
    return lu.call(e);
  },
  skipNulls: !1,
  strictNullHandling: !1
}, uu = function(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean" || typeof e == "symbol" || typeof e == "bigint";
}, Er = {}, su = function t(e, r, n, a, o, l, u, i, d, s, h, v, w, f, y, p, m, g) {
  for (var b = e, S = g, O = 0, _ = !1; (S = S.get(Er)) !== void 0 && !_; ) {
    var M = S.get(e);
    if (O += 1, typeof M < "u") {
      if (M === O)
        throw new RangeError("Cyclic object value");
      _ = !0;
    }
    typeof S.get(Er) > "u" && (O = 0);
  }
  if (typeof s == "function" ? b = s(r, b) : b instanceof Date ? b = w(b) : n === "comma" && we(b) && (b = kt.maybeMap(b, function(pe) {
    return pe instanceof Date ? w(pe) : pe;
  })), b === null) {
    if (l)
      return d && !p ? d(r, X.encoder, m, "key", f) : r;
    b = "";
  }
  if (uu(b) || kt.isBuffer(b)) {
    if (d) {
      var W = p ? r : d(r, X.encoder, m, "key", f);
      return [y(W) + "=" + y(d(b, X.encoder, m, "value", f))];
    }
    return [y(r) + "=" + y(String(b))];
  }
  var H = [];
  if (typeof b > "u")
    return H;
  var k;
  if (n === "comma" && we(b))
    p && d && (b = kt.maybeMap(b, d)), k = [{ value: b.length > 0 ? b.join(",") || null : void 0 }];
  else if (we(s))
    k = s;
  else {
    var Y = Object.keys(b);
    k = h ? Y.sort(h) : Y;
  }
  var V = i ? r.replace(/\./g, "%2E") : r, $ = a && we(b) && b.length === 1 ? V + "[]" : V;
  if (o && we(b) && b.length === 0)
    return $ + "[]";
  for (var T = 0; T < k.length; ++T) {
    var D = k[T], ue = typeof D == "object" && typeof D.value < "u" ? D.value : b[D];
    if (!(u && ue === null)) {
      var de = v && i ? D.replace(/\./g, "%2E") : D, ge = we(b) ? typeof n == "function" ? n($, de) : $ : $ + (v ? "." + de : "[" + de + "]");
      g.set(e, O);
      var te = Sa();
      te.set(Er, g), Oa(H, t(
        ue,
        ge,
        n,
        a,
        o,
        l,
        u,
        i,
        n === "comma" && p && we(b) ? null : d,
        s,
        h,
        v,
        w,
        f,
        y,
        p,
        m,
        te
      ));
    }
  }
  return H;
}, cu = function(e) {
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
  var n = bt.default;
  if (typeof e.format < "u") {
    if (!ou.call(bt.formatters, e.format))
      throw new TypeError("Unknown format option provided.");
    n = e.format;
  }
  var a = bt.formatters[n], o = X.filter;
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
}, fu = function(t, e) {
  var r = t, n = cu(e), a, o;
  typeof n.filter == "function" ? (o = n.filter, r = o("", r)) : we(n.filter) && (o = n.filter, a = o);
  var l = [];
  if (typeof r != "object" || r === null)
    return "";
  var u = xa[n.arrayFormat], i = u === "comma" && n.commaRoundTrip;
  a || (a = Object.keys(r)), n.sort && a.sort(n.sort);
  for (var d = Sa(), s = 0; s < a.length; ++s) {
    var h = a[s];
    n.skipNulls && r[h] === null || Oa(l, su(
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
      d
    ));
  }
  var v = l.join(n.delimiter), w = n.addQueryPrefix === !0 ? "?" : "";
  return n.charsetSentinel && (n.charset === "iso-8859-1" ? w += "utf8=%26%2310003%3B&" : w += "utf8=%E2%9C%93&"), v.length > 0 ? w + v : "";
}, rt = Ea, _r = Object.prototype.hasOwnProperty, du = Array.isArray, B = {
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
}, pu = function(t) {
  return t.replace(/&#(\d+);/g, function(e, r) {
    return String.fromCharCode(parseInt(r, 10));
  });
}, Pa = function(t, e) {
  return t && typeof t == "string" && e.comma && t.indexOf(",") > -1 ? t.split(",") : t;
}, yu = "utf8=%26%2310003%3B", vu = "utf8=%E2%9C%93", mu = function(e, r) {
  var n = { __proto__: null }, a = r.ignoreQueryPrefix ? e.replace(/^\?/, "") : e;
  a = a.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  var o = r.parameterLimit === 1 / 0 ? void 0 : r.parameterLimit, l = a.split(r.delimiter, o), u = -1, i, d = r.charset;
  if (r.charsetSentinel)
    for (i = 0; i < l.length; ++i)
      l[i].indexOf("utf8=") === 0 && (l[i] === vu ? d = "utf-8" : l[i] === yu && (d = "iso-8859-1"), u = i, i = l.length);
  for (i = 0; i < l.length; ++i)
    if (i !== u) {
      var s = l[i], h = s.indexOf("]="), v = h === -1 ? s.indexOf("=") : h + 1, w, f;
      v === -1 ? (w = r.decoder(s, B.decoder, d, "key"), f = r.strictNullHandling ? null : "") : (w = r.decoder(s.slice(0, v), B.decoder, d, "key"), f = rt.maybeMap(
        Pa(s.slice(v + 1), r),
        function(p) {
          return r.decoder(p, B.decoder, d, "value");
        }
      )), f && r.interpretNumericEntities && d === "iso-8859-1" && (f = pu(f)), s.indexOf("[]=") > -1 && (f = du(f) ? [f] : f);
      var y = _r.call(n, w);
      y && r.duplicates === "combine" ? n[w] = rt.combine(n[w], f) : (!y || r.duplicates === "last") && (n[w] = f);
    }
  return n;
}, hu = function(t, e, r, n) {
  for (var a = n ? e : Pa(e, r), o = t.length - 1; o >= 0; --o) {
    var l, u = t[o];
    if (u === "[]" && r.parseArrays)
      l = r.allowEmptyArrays && (a === "" || r.strictNullHandling && a === null) ? [] : [].concat(a);
    else {
      l = r.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var i = u.charAt(0) === "[" && u.charAt(u.length - 1) === "]" ? u.slice(1, -1) : u, d = r.decodeDotInKeys ? i.replace(/%2E/g, ".") : i, s = parseInt(d, 10);
      !r.parseArrays && d === "" ? l = { 0: a } : !isNaN(s) && u !== d && String(s) === d && s >= 0 && r.parseArrays && s <= r.arrayLimit ? (l = [], l[s] = a) : d !== "__proto__" && (l[d] = a);
    }
    a = l;
  }
  return a;
}, gu = function(e, r, n, a) {
  if (e) {
    var o = n.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e, l = /(\[[^[\]]*])/, u = /(\[[^[\]]*])/g, i = n.depth > 0 && l.exec(o), d = i ? o.slice(0, i.index) : o, s = [];
    if (d) {
      if (!n.plainObjects && _r.call(Object.prototype, d) && !n.allowPrototypes)
        return;
      s.push(d);
    }
    for (var h = 0; n.depth > 0 && (i = u.exec(o)) !== null && h < n.depth; ) {
      if (h += 1, !n.plainObjects && _r.call(Object.prototype, i[1].slice(1, -1)) && !n.allowPrototypes)
        return;
      s.push(i[1]);
    }
    if (i) {
      if (n.strictDepth === !0)
        throw new RangeError("Input depth exceeded depth option of " + n.depth + " and strictDepth is true");
      s.push("[" + o.slice(i.index) + "]");
    }
    return hu(s, r, n, a);
  }
}, bu = function(e) {
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
}, wu = function(t, e) {
  var r = bu(e);
  if (t === "" || t === null || typeof t > "u")
    return r.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var n = typeof t == "string" ? mu(t, r) : t, a = r.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, o = Object.keys(n), l = 0; l < o.length; ++l) {
    var u = o[l], i = gu(u, n[u], r, typeof t == "string");
    a = rt.merge(a, i, r);
  }
  return r.allowSparse === !0 ? a : rt.compact(a);
}, Eu = fu, Su = wu, xu = Xr, Gn = {
  formats: xu,
  parse: Su,
  stringify: Eu
}, Ou = { exports: {} };
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */
(function(t, e) {
  (function(r, n) {
    t.exports = n();
  })(Ar, function() {
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
    r.configure = function(f) {
      var y, p;
      for (y in f)
        p = f[y], p !== void 0 && f.hasOwnProperty(y) && (n[y] = p);
      return this;
    }, r.status = null, r.set = function(f) {
      var y = r.isStarted();
      f = a(f, n.minimum, 1), r.status = f === 1 ? null : f;
      var p = r.render(!y), m = p.querySelector(n.barSelector), g = n.speed, b = n.easing;
      return p.offsetWidth, u(function(S) {
        n.positionUsing === "" && (n.positionUsing = r.getPositioningCSS()), i(m, l(f, g, b)), f === 1 ? (i(p, {
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
      var f = function() {
        setTimeout(function() {
          r.status && (r.trickle(), f());
        }, n.trickleSpeed);
      };
      return n.trickle && f(), this;
    }, r.done = function(f) {
      return !f && !r.status ? this : r.inc(0.3 + 0.5 * Math.random()).set(1);
    }, r.inc = function(f) {
      var y = r.status;
      return y ? (typeof f != "number" && (f = (1 - y) * a(Math.random() * y, 0.1, 0.95)), y = a(y + f, 0, 0.994), r.set(y)) : r.start();
    }, r.trickle = function() {
      return r.inc(Math.random() * n.trickleRate);
    }, function() {
      var f = 0, y = 0;
      r.promise = function(p) {
        return !p || p.state() === "resolved" ? this : (y === 0 && r.start(), f++, y++, p.always(function() {
          y--, y === 0 ? (f = 0, r.done()) : r.set((f - y) / f);
        }), this);
      };
    }(), r.render = function(f) {
      if (r.isRendered()) return document.getElementById("nprogress");
      s(document.documentElement, "nprogress-busy");
      var y = document.createElement("div");
      y.id = "nprogress", y.innerHTML = n.template;
      var p = y.querySelector(n.barSelector), m = f ? "-100" : o(r.status || 0), g = document.querySelector(n.parent), b;
      return i(p, {
        transition: "all 0 linear",
        transform: "translate3d(" + m + "%,0,0)"
      }), n.showSpinner || (b = y.querySelector(n.spinnerSelector), b && w(b)), g != document.body && s(g, "nprogress-custom-parent"), g.appendChild(y), y;
    }, r.remove = function() {
      h(document.documentElement, "nprogress-busy"), h(document.querySelector(n.parent), "nprogress-custom-parent");
      var f = document.getElementById("nprogress");
      f && w(f);
    }, r.isRendered = function() {
      return !!document.getElementById("nprogress");
    }, r.getPositioningCSS = function() {
      var f = document.body.style, y = "WebkitTransform" in f ? "Webkit" : "MozTransform" in f ? "Moz" : "msTransform" in f ? "ms" : "OTransform" in f ? "O" : "";
      return y + "Perspective" in f ? "translate3d" : y + "Transform" in f ? "translate" : "margin";
    };
    function a(f, y, p) {
      return f < y ? y : f > p ? p : f;
    }
    function o(f) {
      return (-1 + f) * 100;
    }
    function l(f, y, p) {
      var m;
      return n.positionUsing === "translate3d" ? m = { transform: "translate3d(" + o(f) + "%,0,0)" } : n.positionUsing === "translate" ? m = { transform: "translate(" + o(f) + "%,0)" } : m = { "margin-left": o(f) + "%" }, m.transition = "all " + y + "ms " + p, m;
    }
    var u = /* @__PURE__ */ function() {
      var f = [];
      function y() {
        var p = f.shift();
        p && p(y);
      }
      return function(p) {
        f.push(p), f.length == 1 && y();
      };
    }(), i = /* @__PURE__ */ function() {
      var f = ["Webkit", "O", "Moz", "ms"], y = {};
      function p(S) {
        return S.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(O, _) {
          return _.toUpperCase();
        });
      }
      function m(S) {
        var O = document.body.style;
        if (S in O) return S;
        for (var _ = f.length, M = S.charAt(0).toUpperCase() + S.slice(1), W; _--; )
          if (W = f[_] + M, W in O) return W;
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
    function d(f, y) {
      var p = typeof f == "string" ? f : v(f);
      return p.indexOf(" " + y + " ") >= 0;
    }
    function s(f, y) {
      var p = v(f), m = p + y;
      d(p, y) || (f.className = m.substring(1));
    }
    function h(f, y) {
      var p = v(f), m;
      d(f, y) && (m = p.replace(" " + y + " ", " "), f.className = m.substring(1, m.length - 1));
    }
    function v(f) {
      return (" " + (f.className || "") + " ").replace(/\s+/gi, " ");
    }
    function w(f) {
      f && f.parentNode && f.parentNode.removeChild(f);
    }
    return r;
  });
})(Ou);
function Pu(t, e, r, n = "brackets") {
  let a = /^https?:\/\//.test(e.toString()), o = a || e.toString().startsWith("/"), l = !o && !e.toString().startsWith("#") && !e.toString().startsWith("?"), u = e.toString().includes("?") || t === "get" && Object.keys(r).length, i = e.toString().includes("#"), d = new URL(e.toString(), "http://localhost");
  return t === "get" && Object.keys(r).length && (d.search = Gn.stringify(ii(Gn.parse(d.search, { ignoreQueryPrefix: !0 }), r), { encodeValuesOnly: !0, arrayFormat: n }), r = {}), [[a ? `${d.protocol}//${d.host}` : "", o ? d.pathname : "", l ? d.pathname.substring(1) : "", u ? d.search : "", i ? d.hash : ""].join(""), r];
}
const zt = ce(null);
zt.displayName = "ModalStackContext";
let Aa = null, Ta = null, Dr = null, Nr = null, Sr = [];
const Au = ({ children: t }) => {
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
  K(() => {
    Sr = e;
  }, [e]);
  class l {
    constructor(p, m, g, b, S) {
      ye(this, "update", (p, m, g) => {
        o(
          (b) => b.map((S) => (S.id === this.id && (S.modalProps = p, S.onCloseCallback = m, S.afterLeaveCallback = g), S))
        );
      });
      ye(this, "show", () => {
        o(
          (p) => p.map((m) => (m.id === this.id && !m.isOpen && (m.isOpen = !0, m.shouldRender = !0), m))
        );
      });
      ye(this, "setOpen", (p) => {
        p ? this.show() : this.close();
      });
      ye(this, "close", () => {
        console.log("Closing", this.id), o(
          (p) => p.map((m) => {
            var g;
            return m.id === this.id && m.isOpen && (Object.keys(m.listeners).forEach((b) => {
              m.off(b);
            }), m.isOpen = !1, (g = m.onCloseCallback) == null || g.call(m)), m;
          })
        );
      });
      ye(this, "afterLeave", () => {
        console.log("After leave", this.id), !this.isOpen && o((p) => {
          const m = p.map((g) => {
            var b;
            return g.id === this.id && !g.isOpen && (g.shouldRender = !1, (b = g.afterLeaveCallback) == null || b.call(g), g.afterLeaveCallback = null), g;
          });
          return this.index === 0 ? [] : m;
        });
      });
      ye(this, "on", (p, m) => {
        this.listeners[p] = this.listeners[p] ?? [], this.listeners[p].push(m);
      });
      ye(this, "off", (p, m) => {
        var g;
        m ? this.listeners[p] = ((g = this.listeners[p]) == null ? void 0 : g.filter((b) => b !== m)) ?? [] : delete this.listeners[p];
      });
      ye(this, "emit", (p, ...m) => {
        var g;
        (g = this.listeners[p]) == null || g.forEach((b) => b(...m));
      });
      ye(this, "registerEventListenersFromProps", (p) => {
        const m = [];
        return Object.keys(p).filter((g) => g.startsWith("on")).forEach((g) => {
          const b = g.replace(/^on/, "").replace(/^./, (S) => S.toLowerCase()).replace(/([A-Z])/g, "-$1").toLowerCase();
          this.on(b, p[g]), m.push(() => this.off(b, p[g]));
        }), () => m.forEach((g) => g());
      });
      ye(this, "reload", (p = {}) => {
        var g;
        let m = Object.keys(this.response.props);
        p.only && (m = aa(m, p.only)), p.except && (m = Ho(m, p.except)), (g = this.response) != null && g.url && jt.get(this.response.url, {
          headers: {
            Accept: "text/html, application/xhtml+xml",
            "X-Inertia": !0,
            "X-Inertia-Partial-Component": this.response.component,
            "X-Inertia-Version": this.response.version,
            "X-Inertia-Partial-Data": m.join(","),
            "X-InertiaUI-Modal": !0,
            "X-InertiaUI-Modal-Use-Router": 0
          }
        }).then((b) => {
          Object.assign(this.componentProps, b.data.props), o((S) => S);
        });
      });
      this.id = l.generateId(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = p, this.componentProps = m.props, this.response = m, this.modalProps = g, this.onCloseCallback = b, this.afterLeaveCallback = S, this.index = -1, this.getParentModal = () => null, this.getChildModal = () => null, this.onTopOfStack = !0;
    }
    static generateId() {
      return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `inertiaui_modal_${crypto.randomUUID()}` : `inertiaui_modal_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
    }
  }
  const u = (y, p = {}, m = null, g = null) => Ta(y.component).then((b) => i(b, y, p, m, g)), i = (y, p, m, g, b) => {
    const S = new l(y, p, m, g, b);
    return S.index = e.length, o((O) => [...O, S]), S.show(), S;
  };
  function d(y, p, m, g) {
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
    p.queryStringArrayFormat ?? "brackets"
  ), h = (y, p, m = {}, g = {}, b = {}, S = null, O = null, _ = "brackets", M = !1) => new Promise((W, H) => {
    if (y.startsWith("#")) {
      W(d(y.substring(1), b, S, O));
      return;
    }
    const [k, Y] = Pu(p, y || "", m, _);
    let V = M && e.length === 0;
    if (e.length === 0 && (Dr = typeof window < "u" ? window.location.href : ""), g = {
      ...g,
      Accept: "text/html, application/xhtml+xml",
      "X-Requested-With": "XMLHttpRequest",
      "X-Inertia": !0,
      "X-Inertia-Version": Aa,
      "X-InertiaUI-Modal": !0,
      "X-InertiaUI-Modal-Use-Router": V ? 1 : 0
    }, V)
      return yt.visit(k, {
        method: p,
        data: Y,
        headers: g,
        preserveScroll: !0,
        preserveState: !0,
        onError: H,
        onFinish: () => {
          qo(() => Nr).then(($) => {
            const T = $.onCloseCallback, D = $.afterLeaveCallback;
            $.update(
              b,
              () => {
                S == null || S(), T == null || T();
              },
              () => {
                O == null || O(), D == null || D();
              }
            ), W($), Nr = null;
          });
        }
      });
    jt({
      url: k,
      method: p,
      data: Y,
      headers: g
    }).then(($) => W(u($.data, b, S, O))).catch(($) => {
      H($);
    });
  }), f = {
    stack: e,
    localModals: n,
    push: i,
    pushFromResponseData: u,
    closeAll: () => {
      console.log("Closing all modals", { stack: e, localStackCopy: Sr }), Sr.reverse().forEach((y) => y.close());
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
  return /* @__PURE__ */ R.jsx(zt.Provider, { value: f, children: t });
}, Jr = () => {
  const t = ie(zt);
  if (t === null)
    throw new Error("useModalStack must be used within a ModalStackProvider");
  return t;
}, Yn = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], Pc = (t, e) => {
  e.initialPage && (Aa = e.initialPage.version), e.resolveComponent && (Ta = e.resolveComponent);
  const r = ({ Component: n, props: a, key: o }) => {
    const l = () => {
      const u = Pr(n, { key: o, ...a });
      return typeof n.layout == "function" ? n.layout(u) : Array.isArray(n.layout) ? n.layout.concat(u).reverse().reduce((d, s) => Pr(s, a, d)) : u;
    };
    return /* @__PURE__ */ R.jsxs(R.Fragment, { children: [
      l(),
      /* @__PURE__ */ R.jsx(Tu, {})
    ] });
  };
  return /* @__PURE__ */ R.jsx(Au, { children: /* @__PURE__ */ R.jsx(t, { ...e, children: r }) });
}, Tu = ({ children: t }) => {
  const e = ie(zt);
  let r = !1, n = !1;
  K(() => yt.on("start", () => r = !0), []), K(() => yt.on("finish", () => r = !1), []), K(
    () => yt.on("navigate", function(o) {
      const l = o.detail.page.props._inertiaui_modal;
      if (!l) {
        n && e.closeAll();
        return;
      }
      n = l, Dr = l.baseUrl, e.pushFromResponseData(l, {}, () => {
        if (!l.baseUrl) {
          console.error("No base url in modal response data so cannot navigate back");
          return;
        }
        !r && window.location.href !== l.baseUrl && yt.visit(l.baseUrl, {
          preserveScroll: !0,
          preserveState: !0
        });
      }).then((u) => {
        Nr = u;
      });
    }),
    []
  );
  const a = (o) => (o.headers["X-InertiaUI-Modal-Base-Url"] = Dr, o);
  return K(() => (jt.interceptors.request.use(a), () => jt.interceptors.request.eject(a)), []), /* @__PURE__ */ R.jsxs(R.Fragment, { children: [
    t,
    e.stack.length > 0 && /* @__PURE__ */ R.jsx($a, { index: 0 })
  ] });
}, Qr = A.createContext(null);
Qr.displayName = "ModalIndexContext";
const $u = () => {
  const t = A.useContext(Qr);
  if (t === void 0)
    throw new Error("useModalIndex must be used within a ModalIndexProvider");
  return t;
}, $a = ({ index: t }) => {
  const { stack: e } = Jr(), r = J(() => e[t], [e, t]);
  return (r == null ? void 0 : r.component) && /* @__PURE__ */ R.jsx(Qr.Provider, { value: t, children: /* @__PURE__ */ R.jsx(
    r.component,
    {
      ...r.componentProps,
      onModalEvent: (...n) => r.emit(...n)
    }
  ) });
}, Ra = Hr(({ name: t, children: e, ...r }, n) => {
  const a = $u(), { stack: o, registerLocalModal: l, removeLocalModal: u } = Jr(), [i, d] = Q(null), s = J(() => t ? i : o[a], [t, i, a, o]), h = J(() => {
    var f;
    return (f = o.find((y) => y.shouldRender && y.index > (s == null ? void 0 : s.index))) == null ? void 0 : f.index;
  }, [a, o]), v = J(() => (s == null ? void 0 : s.modalProps.slideover) ?? r.slideover ?? na("type") === "slideover", [r.slideover]), w = J(
    () => ({
      slideover: v,
      closeButton: r.closeButton ?? ze(v, "closeButton"),
      closeExplicitly: r.closeExplicitly ?? ze(v, "closeExplicitly"),
      maxWidth: r.maxWidth ?? ze(v, "maxWidth"),
      paddingClasses: r.paddingClasses ?? ze(v, "paddingClasses"),
      panelClasses: r.panelClasses ?? ze(v, "panelClasses"),
      position: r.position ?? ze(v, "position"),
      ...s == null ? void 0 : s.modalProps
    }),
    [r, s == null ? void 0 : s.modalProps]
  );
  return K(() => {
    if (t) {
      let f = null;
      return l(t, (y) => {
        f = y.registerEventListenersFromProps(r), d(y);
      }), () => {
        f == null || f(), f = null, u(t);
      };
    }
    return s.registerEventListenersFromProps(r);
  }, [t]), ra(
    n,
    () => ({
      afterLeave: () => s.afterLeave(),
      close: () => s.close(),
      emit: (...f) => s.emit(...f),
      getChildModal: () => s.getChildModal(),
      getParentModal: () => s.getParentModal(),
      id: s == null ? void 0 : s.id,
      index: s == null ? void 0 : s.index,
      isOpen: s == null ? void 0 : s.isOpen,
      modalContext: s,
      modalProps: w,
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
      emit: s.emit,
      getChildModal: s.getChildModal,
      getParentModal: s.getParentModal,
      id: s.id,
      index: s.index,
      isOpen: s.isOpen,
      modalContext: s,
      modalProps: w,
      onTopOfStack: s.onTopOfStack,
      reload: s.reload,
      setOpen: s.setOpen,
      shouldRender: s.shouldRender
    }) : e,
    h && /* @__PURE__ */ R.jsx($a, { index: h })
  ] });
});
Ra.displayName = "HeadlessModal";
function Fa(t) {
  var e, r, n = "";
  if (typeof t == "string" || typeof t == "number") n += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var a = t.length;
    for (e = 0; e < a; e++) t[e] && (r = Fa(t[e])) && (n && (n += " "), n += r);
  } else for (r in t) t[r] && (n && (n += " "), n += r);
  return n;
}
function Ht() {
  for (var t, e, r = 0, n = "", a = arguments.length; r < a; r++) (t = arguments[r]) && (e = Fa(t)) && (n && (n += " "), n += e);
  return n;
}
var Ru = Object.defineProperty, Fu = (t, e, r) => e in t ? Ru(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, xr = (t, e, r) => (Fu(t, typeof e != "symbol" ? e + "" : e, r), r);
let Cu = class {
  constructor() {
    xr(this, "current", this.detect()), xr(this, "handoffState", "pending"), xr(this, "currentId", 0);
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
function Kt(t) {
  return Ve.isServer ? null : t instanceof Node ? t.ownerDocument : t != null && t.hasOwnProperty("current") && t.current instanceof Node ? t.current.ownerDocument : document;
}
function Xt(t) {
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
    return Xt(() => {
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
function Zr() {
  let [t] = Q(Me);
  return K(() => () => t.dispose(), [t]), t;
}
let ae = (t, e) => {
  Ve.isServer ? K(t, e) : Co(t, e);
};
function qe(t) {
  let e = j(t);
  return ae(() => {
    e.current = t;
  }, [t]), e;
}
let U = function(t) {
  let e = qe(t);
  return A.useCallback((...r) => e.current(...r), [e]);
}, Iu = ce(void 0);
function Mu() {
  return ie(Iu);
}
function kr(...t) {
  return Array.from(new Set(t.flatMap((e) => typeof e == "string" ? e.split(" ") : []))).filter(Boolean).join(" ");
}
function Ce(t, e, ...r) {
  if (t in e) {
    let a = e[t];
    return typeof a == "function" ? a(...r) : a;
  }
  let n = new Error(`Tried to handle "${t}" but there is no handler defined. Only defined handlers are: ${Object.keys(e).map((a) => `"${a}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(n, Ce), n;
}
var Vt = ((t) => (t[t.None = 0] = "None", t[t.RenderStrategy = 1] = "RenderStrategy", t[t.Static = 2] = "Static", t))(Vt || {}), Fe = ((t) => (t[t.Unmount = 0] = "Unmount", t[t.Hidden = 1] = "Hidden", t))(Fe || {});
function fe() {
  let t = Du();
  return ve((e) => _u({ mergeRefs: t, ...e }), [t]);
}
function _u({ ourProps: t, theirProps: e, slot: r, defaultTag: n, features: a, visible: o = !0, name: l, mergeRefs: u }) {
  u = u ?? Nu;
  let i = Ca(e, t);
  if (o) return Dt(i, r, n, l, u);
  let d = a ?? 0;
  if (d & 2) {
    let { static: s = !1, ...h } = i;
    if (s) return Dt(h, r, n, l, u);
  }
  if (d & 1) {
    let { unmount: s = !0, ...h } = i;
    return Ce(s ? 0 : 1, { 0() {
      return null;
    }, 1() {
      return Dt({ ...h, hidden: !0, style: { display: "none" } }, r, n, l, u);
    } });
  }
  return Dt(i, r, n, l, u);
}
function Dt(t, e = {}, r, n, a) {
  let { as: o = r, children: l, refName: u = "ref", ...i } = Or(t, ["unmount", "static"]), d = t.ref !== void 0 ? { [u]: t.ref } : {}, s = typeof l == "function" ? l(e) : l;
  "className" in i && i.className && typeof i.className == "function" && (i.className = i.className(e)), i["aria-labelledby"] && i["aria-labelledby"] === i.id && (i["aria-labelledby"] = void 0);
  let h = {};
  if (e) {
    let v = !1, w = [];
    for (let [f, y] of Object.entries(e)) typeof y == "boolean" && (v = !0), y === !0 && w.push(f.replace(/([A-Z])/g, (p) => `-${p.toLowerCase()}`));
    if (v) {
      h["data-headlessui-state"] = w.join(" ");
      for (let f of w) h[`data-${f}`] = "";
    }
  }
  if (o === he && (Object.keys(je(i)).length > 0 || Object.keys(je(h)).length > 0)) if (!Io(s) || Array.isArray(s) && s.length > 1) {
    if (Object.keys(je(i)).length > 0) throw new Error(['Passing props on "Fragment"!', "", `The current component <${n} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(je(i)).concat(Object.keys(je(h))).map((v) => `  - ${v}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((v) => `  - ${v}`).join(`
`)].join(`
`));
  } else {
    let v = s.props, w = v == null ? void 0 : v.className, f = typeof w == "function" ? (...m) => kr(w(...m), i.className) : kr(w, i.className), y = f ? { className: f } : {}, p = Ca(s.props, je(Or(i, ["ref"])));
    for (let m in h) m in p && delete h[m];
    return Mo(s, Object.assign({}, p, h, d, { ref: a(s.ref, d.ref) }, y));
  }
  return Pr(o, Object.assign({}, Or(i, ["ref"]), o !== he && d, o !== he && h), s);
}
function Du() {
  let t = j([]), e = ve((r) => {
    for (let n of t.current) n != null && (typeof n == "function" ? n(r) : n.current = r);
  }, []);
  return (...r) => {
    if (!r.every((n) => n == null)) return t.current = r, e;
  };
}
function Nu(...t) {
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
  return Object.assign(Hr(t), { displayName: (e = t.displayName) != null ? e : t.name });
}
function je(t) {
  let e = Object.assign({}, t);
  for (let r in e) e[r] === void 0 && delete e[r];
  return e;
}
function Or(t, e = []) {
  let r = Object.assign({}, t);
  for (let n of e) n in r && delete r[n];
  return r;
}
let ku = "span";
var qt = ((t) => (t[t.None = 1] = "None", t[t.Focusable = 2] = "Focusable", t[t.Hidden = 4] = "Hidden", t))(qt || {});
function ju(t, e) {
  var r;
  let { features: n = 1, ...a } = t, o = { ref: e, "aria-hidden": (n & 2) === 2 ? !0 : (r = a["aria-hidden"]) != null ? r : void 0, hidden: (n & 4) === 4 ? !0 : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(n & 4) === 4 && (n & 2) !== 2 && { display: "none" } } };
  return fe()({ ourProps: o, theirProps: a, slot: {}, defaultTag: ku, name: "Hidden" });
}
let jr = le(ju), Ia = Symbol();
function Lu(t, e = !0) {
  return Object.assign(t, { [Ia]: e });
}
function Se(...t) {
  let e = j(t);
  K(() => {
    e.current = t;
  }, [t]);
  let r = U((n) => {
    for (let a of e.current) a != null && (typeof a == "function" ? a(n) : a.current = n);
  });
  return t.every((n) => n == null || (n == null ? void 0 : n[Ia])) ? void 0 : r;
}
let en = ce(null);
en.displayName = "DescriptionContext";
function Ma() {
  let t = ie(en);
  if (t === null) {
    let e = new Error("You used a <Description /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(e, Ma), e;
  }
  return t;
}
function Wu() {
  let [t, e] = Q([]);
  return [t.length > 0 ? t.join(" ") : void 0, J(() => function(r) {
    let n = U((o) => (e((l) => [...l, o]), () => e((l) => {
      let u = l.slice(), i = u.indexOf(o);
      return i !== -1 && u.splice(i, 1), u;
    }))), a = J(() => ({ register: n, slot: r.slot, name: r.name, props: r.props, value: r.value }), [n, r.slot, r.name, r.props, r.value]);
    return A.createElement(en.Provider, { value: a }, r.children);
  }, [e])];
}
let Uu = "p";
function Bu(t, e) {
  let r = xt(), n = Mu(), { id: a = `headlessui-description-${r}`, ...o } = t, l = Ma(), u = Se(e);
  ae(() => l.register(a), [a, l.register]);
  let i = n || !1, d = J(() => ({ ...l.slot, disabled: i }), [l.slot, i]), s = { ref: u, ...l.props, id: a };
  return fe()({ ourProps: s, theirProps: o, slot: d, defaultTag: Uu, name: l.name || "Description" });
}
let Hu = le(Bu), Vu = Object.assign(Hu, {});
var _a = ((t) => (t.Space = " ", t.Enter = "Enter", t.Escape = "Escape", t.Backspace = "Backspace", t.Delete = "Delete", t.ArrowLeft = "ArrowLeft", t.ArrowUp = "ArrowUp", t.ArrowRight = "ArrowRight", t.ArrowDown = "ArrowDown", t.Home = "Home", t.End = "End", t.PageUp = "PageUp", t.PageDown = "PageDown", t.Tab = "Tab", t))(_a || {});
let qu = ce(() => {
});
function Gu({ value: t, children: e }) {
  return A.createElement(qu.Provider, { value: t }, e);
}
let Yu = class extends Map {
  constructor(e) {
    super(), this.factory = e;
  }
  get(e) {
    let r = super.get(e);
    return r === void 0 && (r = this.factory(e), this.set(e, r)), r;
  }
};
function Da(t, e) {
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
function Na(t) {
  return _o(t.subscribe, t.getSnapshot, t.getSnapshot);
}
let zu = new Yu(() => Da(() => [], { ADD(t) {
  return this.includes(t) ? this : [...this, t];
}, REMOVE(t) {
  let e = this.indexOf(t);
  if (e === -1) return this;
  let r = this.slice();
  return r.splice(e, 1), r;
} }));
function ot(t, e) {
  let r = zu.get(e), n = xt(), a = Na(r);
  if (ae(() => {
    if (t) return r.dispatch("ADD", n), () => r.dispatch("REMOVE", n);
  }, [r, t]), !t) return !1;
  let o = a.indexOf(n), l = a.length;
  return o === -1 && (o = l, l += 1), o === l - 1;
}
let Lr = /* @__PURE__ */ new Map(), wt = /* @__PURE__ */ new Map();
function zn(t) {
  var e;
  let r = (e = wt.get(t)) != null ? e : 0;
  return wt.set(t, r + 1), r !== 0 ? () => Kn(t) : (Lr.set(t, { "aria-hidden": t.getAttribute("aria-hidden"), inert: t.inert }), t.setAttribute("aria-hidden", "true"), t.inert = !0, () => Kn(t));
}
function Kn(t) {
  var e;
  let r = (e = wt.get(t)) != null ? e : 1;
  if (r === 1 ? wt.delete(t) : wt.set(t, r - 1), r !== 1) return;
  let n = Lr.get(t);
  n && (n["aria-hidden"] === null ? t.removeAttribute("aria-hidden") : t.setAttribute("aria-hidden", n["aria-hidden"]), t.inert = n.inert, Lr.delete(t));
}
function Ku(t, { allowed: e, disallowed: r } = {}) {
  let n = ot(t, "inert-others");
  ae(() => {
    var a, o;
    if (!n) return;
    let l = Me();
    for (let i of (a = r == null ? void 0 : r()) != null ? a : []) i && l.add(zn(i));
    let u = (o = e == null ? void 0 : e()) != null ? o : [];
    for (let i of u) {
      if (!i) continue;
      let d = Kt(i);
      if (!d) continue;
      let s = i.parentElement;
      for (; s && s !== d.body; ) {
        for (let h of s.children) u.some((v) => h.contains(v)) || l.add(zn(h));
        s = s.parentElement;
      }
    }
    return l.dispose;
  }, [n, e, r]);
}
function Xu(t, e, r) {
  let n = qe((a) => {
    let o = a.getBoundingClientRect();
    o.x === 0 && o.y === 0 && o.width === 0 && o.height === 0 && r();
  });
  K(() => {
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
let Gt = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((t) => `${t}:not([tabindex='-1'])`).join(","), Ju = ["[data-autofocus]"].map((t) => `${t}:not([tabindex='-1'])`).join(",");
var Pe = ((t) => (t[t.First = 1] = "First", t[t.Previous = 2] = "Previous", t[t.Next = 4] = "Next", t[t.Last = 8] = "Last", t[t.WrapAround = 16] = "WrapAround", t[t.NoScroll = 32] = "NoScroll", t[t.AutoFocus = 64] = "AutoFocus", t))(Pe || {}), Wr = ((t) => (t[t.Error = 0] = "Error", t[t.Overflow = 1] = "Overflow", t[t.Success = 2] = "Success", t[t.Underflow = 3] = "Underflow", t))(Wr || {}), Qu = ((t) => (t[t.Previous = -1] = "Previous", t[t.Next = 1] = "Next", t))(Qu || {});
function Zu(t = document.body) {
  return t == null ? [] : Array.from(t.querySelectorAll(Gt)).sort((e, r) => Math.sign((e.tabIndex || Number.MAX_SAFE_INTEGER) - (r.tabIndex || Number.MAX_SAFE_INTEGER)));
}
function es(t = document.body) {
  return t == null ? [] : Array.from(t.querySelectorAll(Ju)).sort((e, r) => Math.sign((e.tabIndex || Number.MAX_SAFE_INTEGER) - (r.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var ka = ((t) => (t[t.Strict = 0] = "Strict", t[t.Loose = 1] = "Loose", t))(ka || {});
function ts(t, e = 0) {
  var r;
  return t === ((r = Kt(t)) == null ? void 0 : r.body) ? !1 : Ce(e, { 0() {
    return t.matches(Gt);
  }, 1() {
    let n = t;
    for (; n !== null; ) {
      if (n.matches(Gt)) return !0;
      n = n.parentElement;
    }
    return !1;
  } });
}
var rs = ((t) => (t[t.Keyboard = 0] = "Keyboard", t[t.Mouse = 1] = "Mouse", t))(rs || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (t) => {
  t.metaKey || t.altKey || t.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (t) => {
  t.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : t.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
function Ae(t) {
  t == null || t.focus({ preventScroll: !0 });
}
let ns = ["textarea", "input"].join(",");
function as(t) {
  var e, r;
  return (r = (e = t == null ? void 0 : t.matches) == null ? void 0 : e.call(t, ns)) != null ? r : !1;
}
function os(t, e = (r) => r) {
  return t.slice().sort((r, n) => {
    let a = e(r), o = e(n);
    if (a === null || o === null) return 0;
    let l = a.compareDocumentPosition(o);
    return l & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : l & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function Et(t, e, { sorted: r = !0, relativeTo: n = null, skipElements: a = [] } = {}) {
  let o = Array.isArray(t) ? t.length > 0 ? t[0].ownerDocument : document : t.ownerDocument, l = Array.isArray(t) ? r ? os(t) : t : e & 64 ? es(t) : Zu(t);
  a.length > 0 && l.length > 1 && (l = l.filter((w) => !a.some((f) => f != null && "current" in f ? (f == null ? void 0 : f.current) === w : f === w))), n = n ?? o.activeElement;
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
  })(), d = e & 32 ? { preventScroll: !0 } : {}, s = 0, h = l.length, v;
  do {
    if (s >= h || s + h <= 0) return 0;
    let w = i + s;
    if (e & 16) w = (w + h) % h;
    else {
      if (w < 0) return 3;
      if (w >= h) return 1;
    }
    v = l[w], v == null || v.focus(d), s += u;
  } while (v !== o.activeElement);
  return e & 6 && as(v) && v.select(), 2;
}
function ja() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function is() {
  return /Android/gi.test(window.navigator.userAgent);
}
function ls() {
  return ja() || is();
}
function pt(t, e, r, n) {
  let a = qe(r);
  K(() => {
    if (!t) return;
    function o(l) {
      a.current(l);
    }
    return document.addEventListener(e, o, n), () => document.removeEventListener(e, o, n);
  }, [t, e, n]);
}
function La(t, e, r, n) {
  let a = qe(r);
  K(() => {
    if (!t) return;
    function o(l) {
      a.current(l);
    }
    return window.addEventListener(e, o, n), () => window.removeEventListener(e, o, n);
  }, [t, e, n]);
}
const Xn = 30;
function us(t, e, r) {
  let n = ot(t, "outside-click"), a = qe(r), o = ve(function(i, d) {
    if (i.defaultPrevented) return;
    let s = d(i);
    if (s === null || !s.getRootNode().contains(s) || !s.isConnected) return;
    let h = function v(w) {
      return typeof w == "function" ? v(w()) : Array.isArray(w) || w instanceof Set ? w : [w];
    }(e);
    for (let v of h) if (v !== null && (v.contains(s) || i.composed && i.composedPath().includes(v))) return;
    return !ts(s, ka.Loose) && s.tabIndex !== -1 && i.preventDefault(), a.current(i, s);
  }, [a, e]), l = j(null);
  pt(n, "pointerdown", (i) => {
    var d, s;
    l.current = ((s = (d = i.composedPath) == null ? void 0 : d.call(i)) == null ? void 0 : s[0]) || i.target;
  }, !0), pt(n, "mousedown", (i) => {
    var d, s;
    l.current = ((s = (d = i.composedPath) == null ? void 0 : d.call(i)) == null ? void 0 : s[0]) || i.target;
  }, !0), pt(n, "click", (i) => {
    ls() || l.current && (o(i, () => l.current), l.current = null);
  }, !0);
  let u = j({ x: 0, y: 0 });
  pt(n, "touchstart", (i) => {
    u.current.x = i.touches[0].clientX, u.current.y = i.touches[0].clientY;
  }, !0), pt(n, "touchend", (i) => {
    let d = { x: i.changedTouches[0].clientX, y: i.changedTouches[0].clientY };
    if (!(Math.abs(d.x - u.current.x) >= Xn || Math.abs(d.y - u.current.y) >= Xn)) return o(i, () => i.target instanceof HTMLElement ? i.target : null);
  }, !0), La(n, "blur", (i) => o(i, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), !0);
}
function At(...t) {
  return J(() => Kt(...t), [...t]);
}
function Wa(t, e, r, n) {
  let a = qe(r);
  K(() => {
    t = t ?? window;
    function o(l) {
      a.current(l);
    }
    return t.addEventListener(e, o, n), () => t.removeEventListener(e, o, n);
  }, [t, e, n]);
}
function ss() {
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
function cs() {
  return ja() ? { before({ doc: t, d: e, meta: r }) {
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
          let { hash: d } = new URL(i.href), s = t.querySelector(d);
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
function fs() {
  return { before({ doc: t, d: e }) {
    e.style(t.documentElement, "overflow", "hidden");
  } };
}
function ds(t) {
  let e = {};
  for (let r of t) Object.assign(e, r(e));
  return e;
}
let Ue = Da(() => /* @__PURE__ */ new Map(), { PUSH(t, e) {
  var r;
  let n = (r = this.get(t)) != null ? r : { doc: t, count: 0, d: Me(), meta: /* @__PURE__ */ new Set() };
  return n.count++, n.meta.add(e), this.set(t, n), this;
}, POP(t, e) {
  let r = this.get(t);
  return r && (r.count--, r.meta.delete(e)), this;
}, SCROLL_PREVENT({ doc: t, d: e, meta: r }) {
  let n = { doc: t, d: e, meta: ds(r) }, a = [cs(), ss(), fs()];
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
function ps(t, e, r = () => ({ containers: [] })) {
  let n = Na(Ue), a = e ? n.get(e) : void 0, o = a ? a.count > 0 : !1;
  return ae(() => {
    if (!(!e || !t)) return Ue.dispatch("PUSH", e, r), () => Ue.dispatch("POP", e, r);
  }, [t, e]), o;
}
function ys(t, e, r = () => [document.body]) {
  let n = ot(t, "scroll-lock");
  ps(n, e, (a) => {
    var o;
    return { containers: [...(o = a.containers) != null ? o : [], r] };
  });
}
function vs(t = 0) {
  let [e, r] = Q(t), n = ve((i) => r(i), [e]), a = ve((i) => r((d) => d | i), [e]), o = ve((i) => (e & i) === i, [e]), l = ve((i) => r((d) => d & ~i), [r]), u = ve((i) => r((d) => d ^ i), [r]);
  return { flags: e, setFlag: n, addFlag: a, hasFlag: o, removeFlag: l, toggleFlag: u };
}
var Jn, Qn;
typeof process < "u" && typeof globalThis < "u" && typeof Element < "u" && ((Jn = process == null ? void 0 : process.env) == null ? void 0 : Jn.NODE_ENV) === "test" && typeof ((Qn = Element == null ? void 0 : Element.prototype) == null ? void 0 : Qn.getAnimations) > "u" && (Element.prototype.getAnimations = function() {
  return console.warn(["Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.", "Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.", "", "Example usage:", "```js", "import { mockAnimationsApi } from 'jsdom-testing-mocks'", "mockAnimationsApi()", "```"].join(`
`)), [];
});
var ms = ((t) => (t[t.None = 0] = "None", t[t.Closed = 1] = "Closed", t[t.Enter = 2] = "Enter", t[t.Leave = 4] = "Leave", t))(ms || {});
function hs(t) {
  let e = {};
  for (let r in t) t[r] === !0 && (e[`data-${r}`] = "");
  return e;
}
function gs(t, e, r, n) {
  let [a, o] = Q(r), { hasFlag: l, addFlag: u, removeFlag: i } = vs(t && a ? 3 : 0), d = j(!1), s = j(!1), h = Zr();
  return ae(() => {
    var v;
    if (t) {
      if (r && o(!0), !e) {
        r && u(3);
        return;
      }
      return (v = n == null ? void 0 : n.start) == null || v.call(n, r), bs(e, { inFlight: d, prepare() {
        s.current ? s.current = !1 : s.current = d.current, d.current = !0, !s.current && (r ? (u(3), i(4)) : (u(4), i(2)));
      }, run() {
        s.current ? r ? (i(3), u(4)) : (i(4), u(3)) : r ? i(1) : u(1);
      }, done() {
        var w;
        s.current && typeof e.getAnimations == "function" && e.getAnimations().length > 0 || (d.current = !1, i(7), r || o(!1), (w = n == null ? void 0 : n.end) == null || w.call(n, r));
      } });
    }
  }, [t, r, e, h]), t ? [a, { closed: l(1), enter: l(2), leave: l(4), transition: l(2) || l(4) }] : [r, { closed: void 0, enter: void 0, leave: void 0, transition: void 0 }];
}
function bs(t, { prepare: e, run: r, done: n, inFlight: a }) {
  let o = Me();
  return Es(t, { prepare: e, inFlight: a }), o.nextFrame(() => {
    r(), o.requestAnimationFrame(() => {
      o.add(ws(t, n));
    });
  }), o.dispose;
}
function ws(t, e) {
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
function Es(t, { inFlight: e, prepare: r }) {
  if (e != null && e.current) {
    r();
    return;
  }
  let n = t.style.transition;
  t.style.transition = "none", r(), t.offsetHeight, t.style.transition = n;
}
function tn(t, e) {
  let r = j([]), n = U(t);
  K(() => {
    let a = [...r.current];
    for (let [o, l] of e.entries()) if (r.current[o] !== l) {
      let u = n(e, a);
      return r.current = e, u;
    }
  }, [n, ...e]);
}
let Jt = ce(null);
Jt.displayName = "OpenClosedContext";
var me = ((t) => (t[t.Open = 1] = "Open", t[t.Closed = 2] = "Closed", t[t.Closing = 4] = "Closing", t[t.Opening = 8] = "Opening", t))(me || {});
function Qt() {
  return ie(Jt);
}
function Ss({ value: t, children: e }) {
  return A.createElement(Jt.Provider, { value: t }, e);
}
function xs({ children: t }) {
  return A.createElement(Jt.Provider, { value: null }, t);
}
function Os(t) {
  function e() {
    document.readyState !== "loading" && (t(), document.removeEventListener("DOMContentLoaded", e));
  }
  typeof window < "u" && typeof document < "u" && (document.addEventListener("DOMContentLoaded", e), e());
}
let $e = [];
Os(() => {
  function t(e) {
    if (!(e.target instanceof HTMLElement) || e.target === document.body || $e[0] === e.target) return;
    let r = e.target;
    r = r.closest(Gt), $e.unshift(r ?? e.target), $e = $e.filter((n) => n != null && n.isConnected), $e.splice(10);
  }
  window.addEventListener("click", t, { capture: !0 }), window.addEventListener("mousedown", t, { capture: !0 }), window.addEventListener("focus", t, { capture: !0 }), document.body.addEventListener("click", t, { capture: !0 }), document.body.addEventListener("mousedown", t, { capture: !0 }), document.body.addEventListener("focus", t, { capture: !0 });
});
function Ua(t) {
  let e = U(t), r = j(!1);
  K(() => (r.current = !1, () => {
    r.current = !0, Xt(() => {
      r.current && e();
    });
  }), [e]);
}
function Ps() {
  let t = typeof document > "u";
  return "useSyncExternalStore" in mt ? ((e) => e.useSyncExternalStore)(mt)(() => () => {
  }, () => !1, () => !t) : !1;
}
function Tt() {
  let t = Ps(), [e, r] = mt.useState(Ve.isHandoffComplete);
  return e && Ve.isHandoffComplete === !1 && r(!1), mt.useEffect(() => {
    e !== !0 && r(!0);
  }, [e]), mt.useEffect(() => Ve.handoff(), []), t ? !1 : e;
}
let Ba = ce(!1);
function As() {
  return ie(Ba);
}
function Zn(t) {
  return A.createElement(Ba.Provider, { value: t.force }, t.children);
}
function Ts(t) {
  let e = As(), r = ie(Va), n = At(t), [a, o] = Q(() => {
    var l;
    if (!e && r !== null) return (l = r.current) != null ? l : null;
    if (Ve.isServer) return null;
    let u = n == null ? void 0 : n.getElementById("headlessui-portal-root");
    if (u) return u;
    if (n === null) return null;
    let i = n.createElement("div");
    return i.setAttribute("id", "headlessui-portal-root"), n.body.appendChild(i);
  });
  return K(() => {
    a !== null && (n != null && n.body.contains(a) || n == null || n.body.appendChild(a));
  }, [a, n]), K(() => {
    e || r !== null && o(r.current);
  }, [r, o, e]), a;
}
let Ha = he, $s = le(function(t, e) {
  let r = t, n = j(null), a = Se(Lu((h) => {
    n.current = h;
  }), e), o = At(n), l = Ts(n), [u] = Q(() => {
    var h;
    return Ve.isServer ? null : (h = o == null ? void 0 : o.createElement("div")) != null ? h : null;
  }), i = ie(Ur), d = Tt();
  ae(() => {
    !l || !u || l.contains(u) || (u.setAttribute("data-headlessui-portal", ""), l.appendChild(u));
  }, [l, u]), ae(() => {
    if (u && i) return i.register(u);
  }, [i, u]), Ua(() => {
    var h;
    !l || !u || (u instanceof Node && l.contains(u) && l.removeChild(u), l.childNodes.length <= 0 && ((h = l.parentElement) == null || h.removeChild(l)));
  });
  let s = fe();
  return d ? !l || !u ? null : ko(s({ ourProps: { ref: a }, theirProps: r, slot: {}, defaultTag: Ha, name: "Portal" }), u) : null;
});
function Rs(t, e) {
  let r = Se(e), { enabled: n = !0, ...a } = t, o = fe();
  return n ? A.createElement($s, { ...a, ref: r }) : o({ ourProps: { ref: r }, theirProps: a, slot: {}, defaultTag: Ha, name: "Portal" });
}
let Fs = he, Va = ce(null);
function Cs(t, e) {
  let { target: r, ...n } = t, a = { ref: Se(e) }, o = fe();
  return A.createElement(Va.Provider, { value: r }, o({ ourProps: a, theirProps: n, defaultTag: Fs, name: "Popover.Group" }));
}
let Ur = ce(null);
function Is() {
  let t = ie(Ur), e = j([]), r = U((o) => (e.current.push(o), t && t.register(o), () => n(o))), n = U((o) => {
    let l = e.current.indexOf(o);
    l !== -1 && e.current.splice(l, 1), t && t.unregister(o);
  }), a = J(() => ({ register: r, unregister: n, portals: e }), [r, n, e]);
  return [e, J(() => function({ children: o }) {
    return A.createElement(Ur.Provider, { value: a }, o);
  }, [a])];
}
let Ms = le(Rs), qa = le(Cs), _s = Object.assign(Ms, { Group: qa });
function Ds(t, e = typeof document < "u" ? document.defaultView : null, r) {
  let n = ot(t, "escape");
  Wa(e, "keydown", (a) => {
    n && (a.defaultPrevented || a.key === _a.Escape && r(a));
  });
}
function Ns() {
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
function ks({ defaultContainers: t = [], portals: e, mainTreeNode: r } = {}) {
  let n = At(r), a = U(() => {
    var o, l;
    let u = [];
    for (let i of t) i !== null && (i instanceof HTMLElement ? u.push(i) : "current" in i && i.current instanceof HTMLElement && u.push(i.current));
    if (e != null && e.current) for (let i of e.current) u.push(i);
    for (let i of (o = n == null ? void 0 : n.querySelectorAll("html > *, body > *")) != null ? o : []) i !== document.body && i !== document.head && i instanceof HTMLElement && i.id !== "headlessui-portal-root" && (r && (i.contains(r) || i.contains((l = r == null ? void 0 : r.getRootNode()) == null ? void 0 : l.host)) || u.some((d) => i.contains(d)) || u.push(i));
    return u;
  });
  return { resolveContainers: a, contains: U((o) => a().some((l) => l.contains(o))) };
}
let Ga = ce(null);
function ea({ children: t, node: e }) {
  let [r, n] = Q(null), a = Ya(e ?? r);
  return A.createElement(Ga.Provider, { value: a }, t, a === null && A.createElement(jr, { features: qt.Hidden, ref: (o) => {
    var l, u;
    if (o) {
      for (let i of (u = (l = Kt(o)) == null ? void 0 : l.querySelectorAll("html > *, body > *")) != null ? u : []) if (i !== document.body && i !== document.head && i instanceof HTMLElement && i != null && i.contains(o)) {
        n(i);
        break;
      }
    }
  } }));
}
function Ya(t = null) {
  var e;
  return (e = ie(Ga)) != null ? e : t;
}
function rn() {
  let t = j(!1);
  return ae(() => (t.current = !0, () => {
    t.current = !1;
  }), []), t;
}
var vt = ((t) => (t[t.Forwards = 0] = "Forwards", t[t.Backwards = 1] = "Backwards", t))(vt || {});
function js() {
  let t = j(0);
  return La(!0, "keydown", (e) => {
    e.key === "Tab" && (t.current = e.shiftKey ? 1 : 0);
  }, !0), t;
}
function za(t) {
  if (!t) return /* @__PURE__ */ new Set();
  if (typeof t == "function") return new Set(t());
  let e = /* @__PURE__ */ new Set();
  for (let r of t.current) r.current instanceof HTMLElement && e.add(r.current);
  return e;
}
let Ls = "div";
var We = ((t) => (t[t.None = 0] = "None", t[t.InitialFocus = 1] = "InitialFocus", t[t.TabLock = 2] = "TabLock", t[t.FocusLock = 4] = "FocusLock", t[t.RestoreFocus = 8] = "RestoreFocus", t[t.AutoFocus = 16] = "AutoFocus", t))(We || {});
function Ws(t, e) {
  let r = j(null), n = Se(r, e), { initialFocus: a, initialFocusFallback: o, containers: l, features: u = 15, ...i } = t;
  Tt() || (u = 0);
  let d = At(r);
  Vs(u, { ownerDocument: d });
  let s = qs(u, { ownerDocument: d, container: r, initialFocus: a, initialFocusFallback: o });
  Gs(u, { ownerDocument: d, container: r, containers: l, previousActiveElement: s });
  let h = js(), v = U((g) => {
    let b = r.current;
    b && ((S) => S())(() => {
      Ce(h.current, { [vt.Forwards]: () => {
        Et(b, Pe.First, { skipElements: [g.relatedTarget, o] });
      }, [vt.Backwards]: () => {
        Et(b, Pe.Last, { skipElements: [g.relatedTarget, o] });
      } });
    });
  }), w = ot(!!(u & 2), "focus-trap#tab-lock"), f = Zr(), y = j(!1), p = { ref: n, onKeyDown(g) {
    g.key == "Tab" && (y.current = !0, f.requestAnimationFrame(() => {
      y.current = !1;
    }));
  }, onBlur(g) {
    if (!(u & 4)) return;
    let b = za(l);
    r.current instanceof HTMLElement && b.add(r.current);
    let S = g.relatedTarget;
    S instanceof HTMLElement && S.dataset.headlessuiFocusGuard !== "true" && (Ka(b, S) || (y.current ? Et(r.current, Ce(h.current, { [vt.Forwards]: () => Pe.Next, [vt.Backwards]: () => Pe.Previous }) | Pe.WrapAround, { relativeTo: g.target }) : g.target instanceof HTMLElement && Ae(g.target)));
  } }, m = fe();
  return A.createElement(A.Fragment, null, w && A.createElement(jr, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: v, features: qt.Focusable }), m({ ourProps: p, theirProps: i, defaultTag: Ls, name: "FocusTrap" }), w && A.createElement(jr, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: v, features: qt.Focusable }));
}
let Us = le(Ws), Bs = Object.assign(Us, { features: We });
function Hs(t = !0) {
  let e = j($e.slice());
  return tn(([r], [n]) => {
    n === !0 && r === !1 && Xt(() => {
      e.current.splice(0);
    }), n === !1 && r === !0 && (e.current = $e.slice());
  }, [t, $e, e]), U(() => {
    var r;
    return (r = e.current.find((n) => n != null && n.isConnected)) != null ? r : null;
  });
}
function Vs(t, { ownerDocument: e }) {
  let r = !!(t & 8), n = Hs(r);
  tn(() => {
    r || (e == null ? void 0 : e.activeElement) === (e == null ? void 0 : e.body) && Ae(n());
  }, [r]), Ua(() => {
    r && Ae(n());
  });
}
function qs(t, { ownerDocument: e, container: r, initialFocus: n, initialFocusFallback: a }) {
  let o = j(null), l = ot(!!(t & 1), "focus-trap#initial-focus"), u = rn();
  return tn(() => {
    if (t === 0) return;
    if (!l) {
      a != null && a.current && Ae(a.current);
      return;
    }
    let i = r.current;
    i && Xt(() => {
      if (!u.current) return;
      let d = e == null ? void 0 : e.activeElement;
      if (n != null && n.current) {
        if ((n == null ? void 0 : n.current) === d) {
          o.current = d;
          return;
        }
      } else if (i.contains(d)) {
        o.current = d;
        return;
      }
      if (n != null && n.current) Ae(n.current);
      else {
        if (t & 16) {
          if (Et(i, Pe.First | Pe.AutoFocus) !== Wr.Error) return;
        } else if (Et(i, Pe.First) !== Wr.Error) return;
        if (a != null && a.current && (Ae(a.current), (e == null ? void 0 : e.activeElement) === a.current)) return;
        console.warn("There are no focusable elements inside the <FocusTrap />");
      }
      o.current = e == null ? void 0 : e.activeElement;
    });
  }, [a, l, t]), o;
}
function Gs(t, { ownerDocument: e, container: r, containers: n, previousActiveElement: a }) {
  let o = rn(), l = !!(t & 4);
  Wa(e == null ? void 0 : e.defaultView, "focus", (u) => {
    if (!l || !o.current) return;
    let i = za(n);
    r.current instanceof HTMLElement && i.add(r.current);
    let d = a.current;
    if (!d) return;
    let s = u.target;
    s && s instanceof HTMLElement ? Ka(i, s) ? (a.current = s, Ae(s)) : (u.preventDefault(), u.stopPropagation(), Ae(d)) : Ae(a.current);
  }, !0);
}
function Ka(t, e) {
  for (let r of t) if (r.contains(e)) return !0;
  return !1;
}
function Xa(t) {
  var e;
  return !!(t.enter || t.enterFrom || t.enterTo || t.leave || t.leaveFrom || t.leaveTo) || ((e = t.as) != null ? e : Qa) !== he || A.Children.count(t.children) === 1;
}
let Zt = ce(null);
Zt.displayName = "TransitionContext";
var Ys = ((t) => (t.Visible = "visible", t.Hidden = "hidden", t))(Ys || {});
function zs() {
  let t = ie(Zt);
  if (t === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return t;
}
function Ks() {
  let t = ie(er);
  if (t === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return t;
}
let er = ce(null);
er.displayName = "NestingContext";
function tr(t) {
  return "children" in t ? tr(t.children) : t.current.filter(({ el: e }) => e.current !== null).filter(({ state: e }) => e === "visible").length > 0;
}
function Ja(t, e) {
  let r = qe(t), n = j([]), a = rn(), o = Zr(), l = U((w, f = Fe.Hidden) => {
    let y = n.current.findIndex(({ el: p }) => p === w);
    y !== -1 && (Ce(f, { [Fe.Unmount]() {
      n.current.splice(y, 1);
    }, [Fe.Hidden]() {
      n.current[y].state = "hidden";
    } }), o.microTask(() => {
      var p;
      !tr(n) && a.current && ((p = r.current) == null || p.call(r));
    }));
  }), u = U((w) => {
    let f = n.current.find(({ el: y }) => y === w);
    return f ? f.state !== "visible" && (f.state = "visible") : n.current.push({ el: w, state: "visible" }), () => l(w, Fe.Unmount);
  }), i = j([]), d = j(Promise.resolve()), s = j({ enter: [], leave: [] }), h = U((w, f, y) => {
    i.current.splice(0), e && (e.chains.current[f] = e.chains.current[f].filter(([p]) => p !== w)), e == null || e.chains.current[f].push([w, new Promise((p) => {
      i.current.push(p);
    })]), e == null || e.chains.current[f].push([w, new Promise((p) => {
      Promise.all(s.current[f].map(([m, g]) => g)).then(() => p());
    })]), f === "enter" ? d.current = d.current.then(() => e == null ? void 0 : e.wait.current).then(() => y(f)) : y(f);
  }), v = U((w, f, y) => {
    Promise.all(s.current[f].splice(0).map(([p, m]) => m)).then(() => {
      var p;
      (p = i.current.shift()) == null || p();
    }).then(() => y(f));
  });
  return J(() => ({ children: n, register: u, unregister: l, onStart: h, onStop: v, wait: d, chains: s }), [u, l, n, h, v, s, d]);
}
let Qa = he, Za = Vt.RenderStrategy;
function Xs(t, e) {
  var r, n;
  let { transition: a = !0, beforeEnter: o, afterEnter: l, beforeLeave: u, afterLeave: i, enter: d, enterFrom: s, enterTo: h, entered: v, leave: w, leaveFrom: f, leaveTo: y, ...p } = t, [m, g] = Q(null), b = j(null), S = Xa(t), O = Se(...S ? [b, e, g] : e === null ? [] : [e]), _ = (r = p.unmount) == null || r ? Fe.Unmount : Fe.Hidden, { show: M, appear: W, initial: H } = zs(), [k, Y] = Q(M ? "visible" : "hidden"), V = Ks(), { register: $, unregister: T } = V;
  ae(() => $(b), [$, b]), ae(() => {
    if (_ === Fe.Hidden && b.current) {
      if (M && k !== "visible") {
        Y("visible");
        return;
      }
      return Ce(k, { hidden: () => T(b), visible: () => $(b) });
    }
  }, [k, b, $, T, M, _]);
  let D = Tt();
  ae(() => {
    if (S && D && k === "visible" && b.current === null) throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
  }, [b, k, D, S]);
  let ue = H && !W, de = W && M && H, ge = j(!1), te = Ja(() => {
    ge.current || (Y("hidden"), T(b));
  }, V), pe = U((Ne) => {
    ge.current = !0;
    let xe = Ne ? "enter" : "leave";
    te.onStart(b, xe, (Oe) => {
      Oe === "enter" ? o == null || o() : Oe === "leave" && (u == null || u());
    });
  }), q = U((Ne) => {
    let xe = Ne ? "enter" : "leave";
    ge.current = !1, te.onStop(b, xe, (Oe) => {
      Oe === "enter" ? l == null || l() : Oe === "leave" && (i == null || i());
    }), xe === "leave" && !tr(te) && (Y("hidden"), T(b));
  });
  K(() => {
    S && a || (pe(M), q(M));
  }, [M, S, a]);
  let _e = !(!a || !S || !D || ue), [, ee] = gs(_e, m, M, { start: pe, end: q }), nr = je({ ref: O, className: ((n = kr(p.className, de && d, de && s, ee.enter && d, ee.enter && ee.closed && s, ee.enter && !ee.closed && h, ee.leave && w, ee.leave && !ee.closed && f, ee.leave && ee.closed && y, !ee.transition && M && v)) == null ? void 0 : n.trim()) || void 0, ...hs(ee) }), De = 0;
  k === "visible" && (De |= me.Open), k === "hidden" && (De |= me.Closed), ee.enter && (De |= me.Opening), ee.leave && (De |= me.Closing);
  let lt = fe();
  return A.createElement(er.Provider, { value: te }, A.createElement(Ss, { value: De }, lt({ ourProps: nr, theirProps: p, defaultTag: Qa, features: Za, visible: k === "visible", name: "Transition.Child" })));
}
function Js(t, e) {
  let { show: r, appear: n = !1, unmount: a = !0, ...o } = t, l = j(null), u = Xa(t), i = Se(...u ? [l, e] : e === null ? [] : [e]);
  Tt();
  let d = Qt();
  if (r === void 0 && d !== null && (r = (d & me.Open) === me.Open), r === void 0) throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
  let [s, h] = Q(r ? "visible" : "hidden"), v = Ja(() => {
    r || h("hidden");
  }), [w, f] = Q(!0), y = j([r]);
  ae(() => {
    w !== !1 && y.current[y.current.length - 1] !== r && (y.current.push(r), f(!1));
  }, [y, r]);
  let p = J(() => ({ show: r, appear: n, initial: w }), [r, n, w]);
  ae(() => {
    r ? h("visible") : !tr(v) && l.current !== null && h("hidden");
  }, [r, v]);
  let m = { unmount: a }, g = U(() => {
    var O;
    w && f(!1), (O = t.beforeEnter) == null || O.call(t);
  }), b = U(() => {
    var O;
    w && f(!1), (O = t.beforeLeave) == null || O.call(t);
  }), S = fe();
  return A.createElement(er.Provider, { value: v }, A.createElement(Zt.Provider, { value: p }, S({ ourProps: { ...m, as: he, children: A.createElement(eo, { ref: i, ...m, ...o, beforeEnter: g, beforeLeave: b }) }, theirProps: {}, defaultTag: he, features: Za, visible: s === "visible", name: "Transition" })));
}
function Qs(t, e) {
  let r = ie(Zt) !== null, n = Qt() !== null;
  return A.createElement(A.Fragment, null, !r && n ? A.createElement(Br, { ref: e, ...t }) : A.createElement(eo, { ref: e, ...t }));
}
let Br = le(Js), eo = le(Xs), it = le(Qs), to = Object.assign(Br, { Child: it, Root: Br });
var Zs = ((t) => (t[t.Open = 0] = "Open", t[t.Closed = 1] = "Closed", t))(Zs || {}), ec = ((t) => (t[t.SetTitleId = 0] = "SetTitleId", t))(ec || {});
let tc = { 0(t, e) {
  return t.titleId === e.id ? t : { ...t, titleId: e.id };
} }, nn = ce(null);
nn.displayName = "DialogContext";
function rr(t) {
  let e = ie(nn);
  if (e === null) {
    let r = new Error(`<${t} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(r, rr), r;
  }
  return e;
}
function rc(t, e) {
  return Ce(e.type, tc, t, e);
}
let ta = le(function(t, e) {
  let r = xt(), { id: n = `headlessui-dialog-${r}`, open: a, onClose: o, initialFocus: l, role: u = "dialog", autoFocus: i = !0, __demoMode: d = !1, unmount: s = !1, ...h } = t, v = j(!1);
  u = function() {
    return u === "dialog" || u === "alertdialog" ? u : (v.current || (v.current = !0, console.warn(`Invalid role [${u}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog");
  }();
  let w = Qt();
  a === void 0 && w !== null && (a = (w & me.Open) === me.Open);
  let f = j(null), y = Se(f, e), p = At(f), m = a ? 0 : 1, [g, b] = Do(rc, { titleId: null, descriptionId: null, panelRef: No() }), S = U(() => o(!1)), O = U((q) => b({ type: 0, id: q })), _ = Tt() ? m === 0 : !1, [M, W] = Is(), H = { get current() {
    var q;
    return (q = g.panelRef.current) != null ? q : f.current;
  } }, k = Ya(), { resolveContainers: Y } = ks({ mainTreeNode: k, portals: M, defaultContainers: [H] }), V = w !== null ? (w & me.Closing) === me.Closing : !1;
  Ku(d || V ? !1 : _, { allowed: U(() => {
    var q, _e;
    return [(_e = (q = f.current) == null ? void 0 : q.closest("[data-headlessui-portal]")) != null ? _e : null];
  }), disallowed: U(() => {
    var q;
    return [(q = k == null ? void 0 : k.closest("body > *:not(#headlessui-portal-root)")) != null ? q : null];
  }) }), us(_, Y, (q) => {
    q.preventDefault(), S();
  }), Ds(_, p == null ? void 0 : p.defaultView, (q) => {
    q.preventDefault(), q.stopPropagation(), document.activeElement && "blur" in document.activeElement && typeof document.activeElement.blur == "function" && document.activeElement.blur(), S();
  }), ys(d || V ? !1 : _, p, Y), Xu(_, f, S);
  let [$, T] = Wu(), D = J(() => [{ dialogState: m, close: S, setTitleId: O, unmount: s }, g], [m, g, S, O, s]), ue = J(() => ({ open: m === 0 }), [m]), de = { ref: y, id: n, role: u, tabIndex: -1, "aria-modal": d ? void 0 : m === 0 ? !0 : void 0, "aria-labelledby": g.titleId, "aria-describedby": $, unmount: s }, ge = !Ns(), te = We.None;
  _ && !d && (te |= We.RestoreFocus, te |= We.TabLock, i && (te |= We.AutoFocus), ge && (te |= We.InitialFocus));
  let pe = fe();
  return A.createElement(xs, null, A.createElement(Zn, { force: !0 }, A.createElement(_s, null, A.createElement(nn.Provider, { value: D }, A.createElement(qa, { target: f }, A.createElement(Zn, { force: !1 }, A.createElement(T, { slot: ue }, A.createElement(W, null, A.createElement(Bs, { initialFocus: l, initialFocusFallback: f, containers: Y, features: te }, A.createElement(Gu, { value: S }, pe({ ourProps: de, theirProps: h, slot: ue, defaultTag: nc, features: ac, visible: m === 0, name: "Dialog" })))))))))));
}), nc = "div", ac = Vt.RenderStrategy | Vt.Static;
function oc(t, e) {
  let { transition: r = !1, open: n, ...a } = t, o = Qt(), l = t.hasOwnProperty("open") || o !== null, u = t.hasOwnProperty("onClose");
  if (!l && !u) throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");
  if (!l) throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");
  if (!u) throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");
  if (!o && typeof t.open != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${t.open}`);
  if (typeof t.onClose != "function") throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${t.onClose}`);
  return (n !== void 0 || r) && !a.static ? A.createElement(ea, null, A.createElement(to, { show: n, transition: r, unmount: a.unmount }, A.createElement(ta, { ref: e, ...a }))) : A.createElement(ea, null, A.createElement(ta, { ref: e, open: n, ...a }));
}
let ic = "div";
function lc(t, e) {
  let r = xt(), { id: n = `headlessui-dialog-panel-${r}`, transition: a = !1, ...o } = t, [{ dialogState: l, unmount: u }, i] = rr("Dialog.Panel"), d = Se(e, i.panelRef), s = J(() => ({ open: l === 0 }), [l]), h = U((p) => {
    p.stopPropagation();
  }), v = { ref: d, id: n, onClick: h }, w = a ? it : he, f = a ? { unmount: u } : {}, y = fe();
  return A.createElement(w, { ...f }, y({ ourProps: v, theirProps: o, slot: s, defaultTag: ic, name: "Dialog.Panel" }));
}
let uc = "div";
function sc(t, e) {
  let { transition: r = !1, ...n } = t, [{ dialogState: a, unmount: o }] = rr("Dialog.Backdrop"), l = J(() => ({ open: a === 0 }), [a]), u = { ref: e, "aria-hidden": !0 }, i = r ? it : he, d = r ? { unmount: o } : {}, s = fe();
  return A.createElement(i, { ...d }, s({ ourProps: u, theirProps: n, slot: l, defaultTag: uc, name: "Dialog.Backdrop" }));
}
let cc = "h2";
function fc(t, e) {
  let r = xt(), { id: n = `headlessui-dialog-title-${r}`, ...a } = t, [{ dialogState: o, setTitleId: l }] = rr("Dialog.Title"), u = Se(e);
  K(() => (l(n), () => l(null)), [n, l]);
  let i = J(() => ({ open: o === 0 }), [o]), d = { ref: u, id: n };
  return fe()({ ourProps: d, theirProps: a, slot: i, defaultTag: cc, name: "Dialog.Title" });
}
let dc = le(oc), an = le(lc);
le(sc);
let pc = le(fc), yc = Object.assign(dc, { Panel: an, Title: pc, Description: Vu });
function ro({ onClick: t }) {
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
const vc = ({ modalContext: t, modalProps: e, children: r }) => /* @__PURE__ */ R.jsx("div", { className: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4", children: /* @__PURE__ */ R.jsx(
  "div",
  {
    className: Ht("im-modal-positioner flex min-h-full justify-center", {
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
        className: Ht("im-modal-wrapper w-full transition duration-300 ease-in-out", t.onTopOfStack ? "" : "blur-sm", {
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
        children: /* @__PURE__ */ R.jsxs(an, { className: `im-modal-content relative ${e.paddingClasses} ${e.panelClasses}`, children: [
          e.closeButton && /* @__PURE__ */ R.jsx("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ R.jsx(ro, { onClick: t.close }) }),
          typeof r == "function" ? r({ modalContext: t, modalProps: e }) : r
        ] })
      }
    )
  }
) }), mc = ({ modalContext: t, modalProps: e, children: r }) => /* @__PURE__ */ R.jsx("div", { className: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ R.jsx(
  "div",
  {
    className: Ht("im-slideover-positioner flex min-h-full items-center", {
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
        className: Ht("im-slideover-wrapper w-full transition duration-300 ease-in-out", t.onTopOfStack ? "" : "blur-sm", {
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
        children: /* @__PURE__ */ R.jsxs(an, { className: `im-slideover-content relative ${e.paddingClasses} ${e.panelClasses}`, children: [
          e.closeButton && /* @__PURE__ */ R.jsx("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ R.jsx(ro, { onClick: t.close }) }),
          typeof r == "function" ? r({ modalContext: t, modalProps: e }) : r
        ] })
      }
    )
  }
) }), hc = Hr(({ name: t, children: e, ...r }, n) => {
  const a = (l) => typeof e == "function" ? e(l) : e, o = j(null);
  return ra(n, () => o.current, [o]), /* @__PURE__ */ R.jsx(
    Ra,
    {
      ref: o,
      name: t,
      ...r,
      children: ({
        afterLeave: l,
        close: u,
        emit: i,
        getChildModal: d,
        getParentModal: s,
        id: h,
        index: v,
        isOpen: w,
        modalContext: f,
        modalProps: y,
        onTopOfStack: p,
        reload: m,
        setOpen: g,
        shouldRender: b
      }) => /* @__PURE__ */ R.jsx(
        to,
        {
          appear: !0,
          show: w ?? !1,
          children: /* @__PURE__ */ R.jsxs(
            yc,
            {
              as: "div",
              className: "im-dialog relative z-20",
              onClose: () => y.closeExplicitly ? null : u(),
              "data-inertiaui-modal-id": h,
              "data-inertiaui-modal-index": v,
              children: [
                v === 0 ? /* @__PURE__ */ R.jsx(
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
                v > 0 && p ? /* @__PURE__ */ R.jsx("div", { className: "im-backdrop fixed inset-0 z-30 bg-black/75" }) : null,
                y.slideover ? /* @__PURE__ */ R.jsx(
                  mc,
                  {
                    modalContext: f,
                    modalProps: y,
                    children: a({
                      afterLeave: l,
                      close: u,
                      emit: i,
                      getChildModal: d,
                      getParentModal: s,
                      id: h,
                      index: v,
                      isOpen: w,
                      modalContext: f,
                      modalProps: y,
                      onTopOfStack: p,
                      reload: m,
                      setOpen: g,
                      shouldRender: b
                    })
                  }
                ) : /* @__PURE__ */ R.jsx(
                  vc,
                  {
                    modalContext: f,
                    modalProps: y,
                    children: a({
                      afterLeave: l,
                      close: u,
                      emit: i,
                      getChildModal: d,
                      getParentModal: s,
                      id: h,
                      index: v,
                      isOpen: w,
                      modalContext: f,
                      modalProps: y,
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
hc.displayName = "Modal";
const $c = ({
  href: t,
  method: e = "get",
  data: r = {},
  as: n = "a",
  headers: a = {},
  queryStringArrayFormat: o = "brackets",
  onAfterLeave: l = null,
  onBlur: u = null,
  onClose: i = null,
  onError: d = null,
  onFocus: s = null,
  onStart: h = null,
  onSuccess: v = null,
  navigate: w = null,
  children: f,
  ...y
}) => {
  const [p, m] = Q(!1), [g, b] = Q(null), { stack: S, visit: O } = Jr(), _ = J(() => w ?? na("navigate"), [w]), M = {}, W = {};
  Object.keys(y).forEach((T) => {
    Yn.includes(T) || (T.startsWith("on") && typeof y[T] == "function" ? T.toLowerCase() in window ? M[T] = y[T] : W[T] = y[T] : M[T] = y[T]);
  });
  const [H, k] = Q(!1);
  K(() => {
    g && (g.onTopOfStack && H ? s == null || s() : !g.onTopOfStack && !H && (u == null || u()), k(!g.onTopOfStack));
  }, [S]);
  const Y = ve(() => {
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
        Vo(aa(y, Yn)),
        () => Y(S.length),
        V,
        o,
        _
      ).then((D) => {
        b(D), D.registerEventListenersFromProps(W), v == null || v();
      }).catch((D) => {
        console.error(D), d == null || d(D);
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
      children: typeof f == "function" ? f({ loading: p }) : f
    }
  );
};
export {
  Ra as HeadlessModal,
  hc as Modal,
  $c as ModalLink,
  Tu as ModalRoot,
  Au as ModalStackProvider,
  na as getConfig,
  Oc as putConfig,
  Pc as renderApp,
  xc as resetConfig,
  $u as useModalIndex,
  Jr as useModalStack
};
