var en = Object.defineProperty;
var tn = (t, e, r) => e in t ? en(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var oe = (t, e, r) => tn(t, typeof e != "symbol" ? e + "" : e, r);
import * as _e from "react";
import J, { createContext as Je, useState as z, useEffect as X, useContext as Pe, useRef as q, createElement as Ve, useMemo as ve, forwardRef as Tt, useImperativeHandle as er, useLayoutEffect as rn, useCallback as ue, Fragment as we, isValidElement as nn, cloneElement as an } from "react";
import He from "axios";
import { router as Ie, usePage as sn } from "@inertiajs/react";
import { mergeDataIntoQueryString as ln } from "@inertiajs/core";
const ke = {
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
class on {
  constructor() {
    this.config = {}, this.reset();
  }
  reset() {
    this.config = JSON.parse(JSON.stringify(ke));
  }
  put(e, r) {
    if (typeof e == "object") {
      this.config = {
        type: e.type ?? ke.type,
        navigate: e.navigate ?? ke.navigate,
        modal: { ...ke.modal, ...e.modal ?? {} },
        slideover: { ...ke.slideover, ...e.slideover ?? {} }
      };
      return;
    }
    const n = e.split(".");
    let s = this.config;
    for (let l = 0; l < n.length - 1; l++)
      s = s[n[l]] = s[n[l]] || {};
    s[n[n.length - 1]] = r;
  }
  get(e) {
    if (typeof e > "u")
      return this.config;
    const r = e.split(".");
    let n = this.config;
    for (const s of r) {
      if (n[s] === void 0)
        return null;
      n = n[s];
    }
    return n;
  }
}
const Ze = new on(), Ca = () => Ze.reset(), ka = (t, e) => Ze.put(t, e), Rt = (t) => Ze.get(t), Re = (t, e) => Ze.get(t ? `slideover.${e}` : `modal.${e}`);
var mt = { exports: {} }, Fe = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Kt;
function un() {
  if (Kt) return Fe;
  Kt = 1;
  var t = J, e = Symbol.for("react.element"), r = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, s = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, l = { key: !0, ref: !0, __self: !0, __source: !0 };
  function i(m, o, g) {
    var y, w = {}, P = null, S = null;
    g !== void 0 && (P = "" + g), o.key !== void 0 && (P = "" + o.key), o.ref !== void 0 && (S = o.ref);
    for (y in o) n.call(o, y) && !l.hasOwnProperty(y) && (w[y] = o[y]);
    if (m && m.defaultProps) for (y in o = m.defaultProps, o) w[y] === void 0 && (w[y] = o[y]);
    return { $$typeof: e, type: m, key: P, ref: S, props: w, _owner: s.current };
  }
  return Fe.Fragment = r, Fe.jsx = i, Fe.jsxs = i, Fe;
}
var Ne = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vt;
function cn() {
  return Vt || (Vt = 1, process.env.NODE_ENV !== "production" && function() {
    var t = J, e = Symbol.for("react.element"), r = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), l = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), m = Symbol.for("react.context"), o = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), y = Symbol.for("react.suspense_list"), w = Symbol.for("react.memo"), P = Symbol.for("react.lazy"), S = Symbol.for("react.offscreen"), p = Symbol.iterator, E = "@@iterator";
    function d(a) {
      if (a === null || typeof a != "object")
        return null;
      var h = p && a[p] || a[E];
      return typeof h == "function" ? h : null;
    }
    var f = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function v(a) {
      {
        for (var h = arguments.length, x = new Array(h > 1 ? h - 1 : 0), C = 1; C < h; C++)
          x[C - 1] = arguments[C];
        R("error", a, x);
      }
    }
    function R(a, h, x) {
      {
        var C = f.ReactDebugCurrentFrame, M = C.getStackAddendum();
        M !== "" && (h += "%s", x = x.concat([M]));
        var $ = x.map(function(A) {
          return String(A);
        });
        $.unshift("Warning: " + h), Function.prototype.apply.call(console[a], console, $);
      }
    }
    var O = !1, b = !1, D = !1, B = !1, Z = !1, ee;
    ee = Symbol.for("react.module.reference");
    function Y(a) {
      return !!(typeof a == "string" || typeof a == "function" || a === n || a === l || Z || a === s || a === g || a === y || B || a === S || O || b || D || typeof a == "object" && a !== null && (a.$$typeof === P || a.$$typeof === w || a.$$typeof === i || a.$$typeof === m || a.$$typeof === o || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      a.$$typeof === ee || a.getModuleId !== void 0));
    }
    function G(a, h, x) {
      var C = a.displayName;
      if (C)
        return C;
      var M = h.displayName || h.name || "";
      return M !== "" ? x + "(" + M + ")" : x;
    }
    function j(a) {
      return a.displayName || "Context";
    }
    function u(a) {
      if (a == null)
        return null;
      if (typeof a.tag == "number" && v("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof a == "function")
        return a.displayName || a.name || null;
      if (typeof a == "string")
        return a;
      switch (a) {
        case n:
          return "Fragment";
        case r:
          return "Portal";
        case l:
          return "Profiler";
        case s:
          return "StrictMode";
        case g:
          return "Suspense";
        case y:
          return "SuspenseList";
      }
      if (typeof a == "object")
        switch (a.$$typeof) {
          case m:
            var h = a;
            return j(h) + ".Consumer";
          case i:
            var x = a;
            return j(x._context) + ".Provider";
          case o:
            return G(a, a.render, "ForwardRef");
          case w:
            var C = a.displayName || null;
            return C !== null ? C : u(a.type) || "Memo";
          case P: {
            var M = a, $ = M._payload, A = M._init;
            try {
              return u(A($));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var c = Object.assign, T = 0, I, _, L, k, W, U, ae;
    function K() {
    }
    K.__reactDisabledLog = !0;
    function ie() {
      {
        if (T === 0) {
          I = console.log, _ = console.info, L = console.warn, k = console.error, W = console.group, U = console.groupCollapsed, ae = console.groupEnd;
          var a = {
            configurable: !0,
            enumerable: !0,
            value: K,
            writable: !0
          };
          Object.defineProperties(console, {
            info: a,
            log: a,
            warn: a,
            error: a,
            group: a,
            groupCollapsed: a,
            groupEnd: a
          });
        }
        T++;
      }
    }
    function re() {
      {
        if (T--, T === 0) {
          var a = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: c({}, a, {
              value: I
            }),
            info: c({}, a, {
              value: _
            }),
            warn: c({}, a, {
              value: L
            }),
            error: c({}, a, {
              value: k
            }),
            group: c({}, a, {
              value: W
            }),
            groupCollapsed: c({}, a, {
              value: U
            }),
            groupEnd: c({}, a, {
              value: ae
            })
          });
        }
        T < 0 && v("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var fe = f.ReactCurrentDispatcher, le;
    function ne(a, h, x) {
      {
        if (le === void 0)
          try {
            throw Error();
          } catch (M) {
            var C = M.stack.trim().match(/\n( *(at )?)/);
            le = C && C[1] || "";
          }
        return `
` + le + a;
      }
    }
    var ce = !1, Le;
    {
      var kr = typeof WeakMap == "function" ? WeakMap : Map;
      Le = new kr();
    }
    function Ct(a, h) {
      if (!a || ce)
        return "";
      {
        var x = Le.get(a);
        if (x !== void 0)
          return x;
      }
      var C;
      ce = !0;
      var M = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var $;
      $ = fe.current, fe.current = null, ie();
      try {
        if (h) {
          var A = function() {
            throw Error();
          };
          if (Object.defineProperty(A.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(A, []);
            } catch (te) {
              C = te;
            }
            Reflect.construct(a, [], A);
          } else {
            try {
              A.call();
            } catch (te) {
              C = te;
            }
            a.call(A.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (te) {
            C = te;
          }
          a();
        }
      } catch (te) {
        if (te && C && typeof te.stack == "string") {
          for (var N = te.stack.split(`
`), Q = C.stack.split(`
`), V = N.length - 1, H = Q.length - 1; V >= 1 && H >= 0 && N[V] !== Q[H]; )
            H--;
          for (; V >= 1 && H >= 0; V--, H--)
            if (N[V] !== Q[H]) {
              if (V !== 1 || H !== 1)
                do
                  if (V--, H--, H < 0 || N[V] !== Q[H]) {
                    var se = `
` + N[V].replace(" at new ", " at ");
                    return a.displayName && se.includes("<anonymous>") && (se = se.replace("<anonymous>", a.displayName)), typeof a == "function" && Le.set(a, se), se;
                  }
                while (V >= 1 && H >= 0);
              break;
            }
        }
      } finally {
        ce = !1, fe.current = $, re(), Error.prepareStackTrace = M;
      }
      var Te = a ? a.displayName || a.name : "", me = Te ? ne(Te) : "";
      return typeof a == "function" && Le.set(a, me), me;
    }
    function Fr(a, h, x) {
      return Ct(a, !1);
    }
    function Nr(a) {
      var h = a.prototype;
      return !!(h && h.isReactComponent);
    }
    function $e(a, h, x) {
      if (a == null)
        return "";
      if (typeof a == "function")
        return Ct(a, Nr(a));
      if (typeof a == "string")
        return ne(a);
      switch (a) {
        case g:
          return ne("Suspense");
        case y:
          return ne("SuspenseList");
      }
      if (typeof a == "object")
        switch (a.$$typeof) {
          case o:
            return Fr(a.render);
          case w:
            return $e(a.type, h, x);
          case P: {
            var C = a, M = C._payload, $ = C._init;
            try {
              return $e($(M), h, x);
            } catch {
            }
          }
        }
      return "";
    }
    var Ce = Object.prototype.hasOwnProperty, kt = {}, Ft = f.ReactDebugCurrentFrame;
    function We(a) {
      if (a) {
        var h = a._owner, x = $e(a.type, a._source, h ? h.type : null);
        Ft.setExtraStackFrame(x);
      } else
        Ft.setExtraStackFrame(null);
    }
    function jr(a, h, x, C, M) {
      {
        var $ = Function.call.bind(Ce);
        for (var A in a)
          if ($(a, A)) {
            var N = void 0;
            try {
              if (typeof a[A] != "function") {
                var Q = Error((C || "React class") + ": " + x + " type `" + A + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[A] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Q.name = "Invariant Violation", Q;
              }
              N = a[A](h, A, C, x, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (V) {
              N = V;
            }
            N && !(N instanceof Error) && (We(M), v("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", C || "React class", x, A, typeof N), We(null)), N instanceof Error && !(N.message in kt) && (kt[N.message] = !0, We(M), v("Failed %s type: %s", x, N.message), We(null));
          }
      }
    }
    var Ar = Array.isArray;
    function lt(a) {
      return Ar(a);
    }
    function Ir(a) {
      {
        var h = typeof Symbol == "function" && Symbol.toStringTag, x = h && a[Symbol.toStringTag] || a.constructor.name || "Object";
        return x;
      }
    }
    function _r(a) {
      try {
        return Nt(a), !1;
      } catch {
        return !0;
      }
    }
    function Nt(a) {
      return "" + a;
    }
    function jt(a) {
      if (_r(a))
        return v("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ir(a)), Nt(a);
    }
    var At = f.ReactCurrentOwner, Dr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, It, _t;
    function Mr(a) {
      if (Ce.call(a, "ref")) {
        var h = Object.getOwnPropertyDescriptor(a, "ref").get;
        if (h && h.isReactWarning)
          return !1;
      }
      return a.ref !== void 0;
    }
    function Lr(a) {
      if (Ce.call(a, "key")) {
        var h = Object.getOwnPropertyDescriptor(a, "key").get;
        if (h && h.isReactWarning)
          return !1;
      }
      return a.key !== void 0;
    }
    function $r(a, h) {
      typeof a.ref == "string" && At.current;
    }
    function Wr(a, h) {
      {
        var x = function() {
          It || (It = !0, v("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", h));
        };
        x.isReactWarning = !0, Object.defineProperty(a, "key", {
          get: x,
          configurable: !0
        });
      }
    }
    function Ur(a, h) {
      {
        var x = function() {
          _t || (_t = !0, v("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", h));
        };
        x.isReactWarning = !0, Object.defineProperty(a, "ref", {
          get: x,
          configurable: !0
        });
      }
    }
    var Br = function(a, h, x, C, M, $, A) {
      var N = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: e,
        // Built-in properties that belong on the element
        type: a,
        key: h,
        ref: x,
        props: A,
        // Record the component responsible for creating this element.
        _owner: $
      };
      return N._store = {}, Object.defineProperty(N._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(N, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: C
      }), Object.defineProperty(N, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: M
      }), Object.freeze && (Object.freeze(N.props), Object.freeze(N)), N;
    };
    function Kr(a, h, x, C, M) {
      {
        var $, A = {}, N = null, Q = null;
        x !== void 0 && (jt(x), N = "" + x), Lr(h) && (jt(h.key), N = "" + h.key), Mr(h) && (Q = h.ref, $r(h, M));
        for ($ in h)
          Ce.call(h, $) && !Dr.hasOwnProperty($) && (A[$] = h[$]);
        if (a && a.defaultProps) {
          var V = a.defaultProps;
          for ($ in V)
            A[$] === void 0 && (A[$] = V[$]);
        }
        if (N || Q) {
          var H = typeof a == "function" ? a.displayName || a.name || "Unknown" : a;
          N && Wr(A, H), Q && Ur(A, H);
        }
        return Br(a, N, Q, M, C, At.current, A);
      }
    }
    var ot = f.ReactCurrentOwner, Dt = f.ReactDebugCurrentFrame;
    function Ee(a) {
      if (a) {
        var h = a._owner, x = $e(a.type, a._source, h ? h.type : null);
        Dt.setExtraStackFrame(x);
      } else
        Dt.setExtraStackFrame(null);
    }
    var ut;
    ut = !1;
    function ct(a) {
      return typeof a == "object" && a !== null && a.$$typeof === e;
    }
    function Mt() {
      {
        if (ot.current) {
          var a = u(ot.current.type);
          if (a)
            return `

Check the render method of \`` + a + "`.";
        }
        return "";
      }
    }
    function Vr(a) {
      return "";
    }
    var Lt = {};
    function Hr(a) {
      {
        var h = Mt();
        if (!h) {
          var x = typeof a == "string" ? a : a.displayName || a.name;
          x && (h = `

Check the top-level render call using <` + x + ">.");
        }
        return h;
      }
    }
    function $t(a, h) {
      {
        if (!a._store || a._store.validated || a.key != null)
          return;
        a._store.validated = !0;
        var x = Hr(h);
        if (Lt[x])
          return;
        Lt[x] = !0;
        var C = "";
        a && a._owner && a._owner !== ot.current && (C = " It was passed a child from " + u(a._owner.type) + "."), Ee(a), v('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', x, C), Ee(null);
      }
    }
    function Wt(a, h) {
      {
        if (typeof a != "object")
          return;
        if (lt(a))
          for (var x = 0; x < a.length; x++) {
            var C = a[x];
            ct(C) && $t(C, h);
          }
        else if (ct(a))
          a._store && (a._store.validated = !0);
        else if (a) {
          var M = d(a);
          if (typeof M == "function" && M !== a.entries)
            for (var $ = M.call(a), A; !(A = $.next()).done; )
              ct(A.value) && $t(A.value, h);
        }
      }
    }
    function Yr(a) {
      {
        var h = a.type;
        if (h == null || typeof h == "string")
          return;
        var x;
        if (typeof h == "function")
          x = h.propTypes;
        else if (typeof h == "object" && (h.$$typeof === o || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        h.$$typeof === w))
          x = h.propTypes;
        else
          return;
        if (x) {
          var C = u(h);
          jr(x, a.props, "prop", C, a);
        } else if (h.PropTypes !== void 0 && !ut) {
          ut = !0;
          var M = u(h);
          v("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", M || "Unknown");
        }
        typeof h.getDefaultProps == "function" && !h.getDefaultProps.isReactClassApproved && v("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function qr(a) {
      {
        for (var h = Object.keys(a.props), x = 0; x < h.length; x++) {
          var C = h[x];
          if (C !== "children" && C !== "key") {
            Ee(a), v("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", C), Ee(null);
            break;
          }
        }
        a.ref !== null && (Ee(a), v("Invalid attribute `ref` supplied to `React.Fragment`."), Ee(null));
      }
    }
    var Ut = {};
    function Bt(a, h, x, C, M, $) {
      {
        var A = Y(a);
        if (!A) {
          var N = "";
          (a === void 0 || typeof a == "object" && a !== null && Object.keys(a).length === 0) && (N += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Q = Vr();
          Q ? N += Q : N += Mt();
          var V;
          a === null ? V = "null" : lt(a) ? V = "array" : a !== void 0 && a.$$typeof === e ? (V = "<" + (u(a.type) || "Unknown") + " />", N = " Did you accidentally export a JSX literal instead of a component?") : V = typeof a, v("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", V, N);
        }
        var H = Kr(a, h, x, M, $);
        if (H == null)
          return H;
        if (A) {
          var se = h.children;
          if (se !== void 0)
            if (C)
              if (lt(se)) {
                for (var Te = 0; Te < se.length; Te++)
                  Wt(se[Te], a);
                Object.freeze && Object.freeze(se);
              } else
                v("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Wt(se, a);
        }
        if (Ce.call(h, "key")) {
          var me = u(a), te = Object.keys(h).filter(function(Qr) {
            return Qr !== "key";
          }), dt = te.length > 0 ? "{key: someKey, " + te.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ut[me + dt]) {
            var Zr = te.length > 0 ? "{" + te.join(": ..., ") + ": ...}" : "{}";
            v(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, dt, me, Zr, me), Ut[me + dt] = !0;
          }
        }
        return a === n ? qr(H) : Yr(H), H;
      }
    }
    function Xr(a, h, x) {
      return Bt(a, h, x, !0);
    }
    function zr(a, h, x) {
      return Bt(a, h, x, !1);
    }
    var Gr = zr, Jr = Xr;
    Ne.Fragment = n, Ne.jsx = Gr, Ne.jsxs = Jr;
  }()), Ne;
}
process.env.NODE_ENV === "production" ? mt.exports = un() : mt.exports = cn();
var F = mt.exports;
const Ht = {
  modifiedElements: [],
  bodyState: {
    hasOverflowHidden: !1,
    hasPointerEventsNone: !1,
    originalPaddingRight: ""
  },
  prepare() {
    const t = window.innerWidth - document.documentElement.clientWidth;
    this.bodyState.originalPaddingRight = document.body.style.paddingRight;
    const e = parseInt(window.getComputedStyle(document.body).paddingRight, 10);
    document.body.style.paddingRight = `${e + t}px`, document.body.classList.contains("overflow-hidden") || (document.body.classList.add("overflow-hidden"), this.bodyState.hasOverflowHidden = !0), document.body.classList.contains("pointer-events-none") || (document.body.classList.add("pointer-events-none"), this.bodyState.hasPointerEventsNone = !0), Array.from(document.body.children).forEach((r) => {
      !r.classList.contains("im-dialog") && r.getAttribute("aria-hidden") !== "true" && (r.setAttribute("aria-hidden", "true"), this.modifiedElements.push(r));
    });
  },
  cleanup() {
    this.bodyState.hasOverflowHidden && (document.body.classList.remove("overflow-hidden"), this.bodyState.hasOverflowHidden = !1), this.bodyState.hasPointerEventsNone && (document.body.classList.remove("pointer-events-none"), this.bodyState.hasPointerEventsNone = !1), document.body.style.paddingRight = this.bodyState.originalPaddingRight, this.bodyState.originalPaddingRight = "", this.modifiedElements.forEach((t) => {
      t.removeAttribute("aria-hidden");
    }), this.modifiedElements = [];
  }
};
function ft(t = "inertiaui_modal_") {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `${t}${crypto.randomUUID()}` : `${t}${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
}
function dn(t, e) {
  return Array.isArray(t) ? t.filter((r) => !e.includes(r)) : Object.keys(t).reduce((r, n) => (e.includes(n) || (r[n] = t[n]), r), {});
}
function tr(t, e) {
  return Array.isArray(t) ? t.filter((r) => e.includes(r)) : e.reduce((r, n) => (n in t && (r[n] = t[n]), r), {});
}
function fn(t) {
  return Array.isArray(t) ? t.filter((e) => e !== null) : Object.keys(t).reduce((e, r) => (r in t && t[r] !== null && (e[r] = t[r]), e), {});
}
function vn(t, e = 3, r = 10) {
  return new Promise((n, s) => {
    const l = t();
    if (l) {
      n(l);
      return;
    }
    let i = e * 1e3 / r;
    const m = setInterval(() => {
      const o = t();
      o && (clearInterval(m), n(o)), --i <= 0 && (clearInterval(m), s(new Error("Condition not met in time")));
    }, r);
  });
}
function je(t) {
  return t ? (t = t.replace(/_/g, "-"), t = t.replace(/-+/g, "-"), /[A-Z]/.test(t) ? (t = t.replace(/\s+/g, "").replace(/_/g, "").replace(/(?:^|\s|-)+([A-Za-z])/g, (e, r) => r.toUpperCase()), t = t.replace(/(.)(?=[A-Z])/g, "$1-"), t.toLowerCase()) : t) : "";
}
const Qe = Je(null);
Qe.displayName = "ModalStackContext";
let rr = null, nr = null, De = null, bt = null, gt = [], Se = {};
const pn = ({ children: t }) => {
  const [e, r] = z([]), [n, s] = z({}), l = (E) => {
    r((d) => {
      const f = E([...d]), v = (R) => {
        var O;
        return f.length < 2 ? !0 : ((O = f.map((b) => ({ id: b.id, shouldRender: b.shouldRender })).reverse().find((b) => b.shouldRender)) == null ? void 0 : O.id) === R;
      };
      return f.forEach((R, O) => {
        f[O].onTopOfStack = v(R.id), f[O].getParentModal = () => O < 1 ? null : f.slice(0, O).reverse().find((b) => b.isOpen), f[O].getChildModal = () => O === f.length - 1 ? null : f.slice(O + 1).find((b) => b.isOpen);
      }), f;
    });
  };
  X(() => {
    gt = e;
  }, [e]);
  class i {
    constructor(d, f, v, R, O) {
      oe(this, "show", () => {
        l(
          (d) => d.map((f) => (f.id === this.id && !f.isOpen && (f.isOpen = !0, f.shouldRender = !0), f))
        );
      });
      oe(this, "setOpen", (d) => {
        d ? this.show() : this.close();
      });
      oe(this, "close", () => {
        l(
          (d) => d.map((f) => {
            var v;
            return f.id === this.id && f.isOpen && (Object.keys(f.listeners).forEach((R) => {
              f.off(R);
            }), f.isOpen = !1, (v = f.onCloseCallback) == null || v.call(f)), f;
          })
        );
      });
      oe(this, "afterLeave", () => {
        this.isOpen || l((d) => {
          const f = d.map((v) => {
            var R;
            return v.id === this.id && !v.isOpen && (v.shouldRender = !1, (R = v.afterLeaveCallback) == null || R.call(v), v.afterLeaveCallback = null), v;
          });
          return this.index === 0 ? [] : f;
        });
      });
      oe(this, "on", (d, f) => {
        d = je(d), this.listeners[d] = this.listeners[d] ?? [], this.listeners[d].push(f);
      });
      oe(this, "off", (d, f) => {
        var v;
        d = je(d), f ? this.listeners[d] = ((v = this.listeners[d]) == null ? void 0 : v.filter((R) => R !== f)) ?? [] : delete this.listeners[d];
      });
      oe(this, "emit", (d, ...f) => {
        var v;
        (v = this.listeners[je(d)]) == null || v.forEach((R) => R(...f));
      });
      oe(this, "registerEventListenersFromProps", (d) => {
        const f = [];
        return Object.keys(d).filter((v) => v.startsWith("on")).forEach((v) => {
          const R = je(v).replace(/^on-/, "");
          this.on(R, d[v]), f.push(() => this.off(R, d[v]));
        }), () => f.forEach((v) => v());
      });
      oe(this, "reload", (d = {}) => {
        var v;
        let f = Object.keys(this.response.props);
        d.only && (f = tr(f, d.only)), d.except && (f = dn(f, d.except)), (v = this.response) != null && v.url && He.get(this.response.url, {
          headers: {
            Accept: "text/html, application/xhtml+xml",
            "X-Inertia": !0,
            "X-Inertia-Partial-Component": this.response.component,
            "X-Inertia-Version": this.response.version,
            "X-Inertia-Partial-Data": f.join(","),
            "X-InertiaUI-Modal": ft(),
            "X-InertiaUI-Modal-Use-Router": 0,
            "X-InertiaUI-Modal-Base-Url": De
          }
        }).then((R) => {
          this.updateProps(R.data.props);
        });
      });
      oe(this, "updateProps", (d) => {
        Object.assign(this.props, d), l((f) => f);
      });
      if (this.id = f.id ?? ft(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = d, this.props = f.props, this.response = f, this.config = v ?? {}, this.onCloseCallback = R, this.afterLeaveCallback = O, Se[this.id]) {
        this.config = {
          ...this.config,
          ...Se[this.id].config ?? {}
        };
        const b = Se[this.id].onClose, D = Se[this.id].onAfterLeave;
        b && (this.onCloseCallback = R ? () => {
          R(), b();
        } : b), D && (this.afterLeaveCallback = O ? () => {
          O(), D();
        } : D), delete Se[this.id];
      }
      this.index = -1, this.getParentModal = () => null, this.getChildModal = () => null, this.onTopOfStack = !0;
    }
    static generateId() {
      return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `inertiaui_modal_${crypto.randomUUID()}` : `inertiaui_modal_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
    }
  }
  const m = (E, d = {}, f = null, v = null) => nr(E.component).then((R) => o(R, E, d, f, v)), o = (E, d, f, v, R) => {
    const O = new i(E, d, f, v, R);
    return O.index = e.length, l((b) => [...b, O]), O.show(), O;
  };
  function g(E, d, f, v) {
    if (!n[E])
      throw new Error(`The local modal "${E}" has not been registered.`);
    const R = o(null, {}, d, f, v);
    return R.name = E, n[E].callback(R), R;
  }
  const y = (E, d = {}) => w(
    E,
    d.method ?? "get",
    d.data ?? {},
    d.headers ?? {},
    d.config ?? {},
    d.onClose,
    d.onAfterLeave,
    d.queryStringArrayFormat ?? "brackets",
    d.navigate ?? Rt("navigate")
  ).then((f) => {
    const v = d.listeners ?? {};
    return Object.keys(v).forEach((R) => {
      const O = je(R);
      f.on(O, v[R]);
    }), f;
  }), w = (E, d, f = {}, v = {}, R = {}, O = null, b = null, D = "brackets", B = !1) => {
    const Z = ft();
    return new Promise((ee, Y) => {
      if (E.startsWith("#")) {
        ee(g(E.substring(1), R, O, b));
        return;
      }
      const [G, j] = ln(d, E || "", f, D);
      let u = B && e.length === 0;
      if (e.length === 0 && (De = typeof window < "u" ? window.location.href : ""), v = {
        ...v,
        Accept: "text/html, application/xhtml+xml",
        "X-Requested-With": "XMLHttpRequest",
        "X-Inertia": !0,
        "X-Inertia-Version": rr,
        "X-InertiaUI-Modal": Z,
        "X-InertiaUI-Modal-Use-Router": u ? 1 : 0,
        "X-InertiaUI-Modal-Base-Url": De
      }, u)
        return bt = null, Se[Z] = {
          config: R,
          onClose: O,
          onAfterLeave: b
        }, Ie.visit(G, {
          method: d,
          data: j,
          headers: v,
          preserveScroll: !0,
          preserveState: !0,
          onError: Y,
          onFinish: () => {
            vn(() => bt).then(ee);
          }
        });
      He({
        url: G,
        method: d,
        data: j,
        headers: v
      }).then((c) => ee(m(c.data, R, O, b))).catch((c) => {
        Y(c);
      });
    });
  }, p = {
    stack: e,
    localModals: n,
    push: o,
    pushFromResponseData: m,
    closeAll: () => {
      gt.reverse().forEach((E) => E.close());
    },
    reset: () => l(() => []),
    visit: w,
    visitModal: y,
    registerLocalModal: (E, d) => {
      s((f) => ({
        ...f,
        [E]: { name: E, callback: d }
      }));
    },
    removeLocalModal: (E) => {
      s((d) => {
        const f = { ...d };
        return delete f[E], f;
      });
    }
  };
  return /* @__PURE__ */ F.jsx(Qe.Provider, { value: p, children: t });
}, et = () => {
  const t = Pe(Qe);
  if (t === null)
    throw new Error("useModalStack must be used within a ModalStackProvider");
  return t;
}, Yt = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], hn = (t) => {
  t.initialPage && (rr = t.initialPage.version), t.resolveComponent && (nr = t.resolveComponent);
}, Fa = (t, e) => {
  hn(e);
  const r = ({ Component: n, props: s, key: l }) => {
    const i = () => {
      const m = Ve(n, { key: l, ...s });
      return typeof n.layout == "function" ? n.layout(m) : Array.isArray(n.layout) ? n.layout.concat(m).reverse().reduce((g, y) => Ve(y, s, g)) : m;
    };
    return /* @__PURE__ */ F.jsxs(F.Fragment, { children: [
      i(),
      /* @__PURE__ */ F.jsx(mn, {})
    ] });
  };
  return /* @__PURE__ */ F.jsx(pn, { children: /* @__PURE__ */ F.jsx(t, { ...e, children: r }) });
}, mn = ({ children: t }) => {
  var m;
  const e = Pe(Qe);
  let r = !1, n = !1;
  X(() => Ie.on("start", () => r = !0), []), X(() => Ie.on("finish", () => r = !1), []), X(
    () => Ie.on("navigate", function(o) {
      const g = o.detail.page.props._inertiaui_modal;
      if (!g) {
        n && e.closeAll();
        return;
      }
      n = g, De = g.baseUrl, e.pushFromResponseData(g, {}, () => {
        if (!g.baseUrl) {
          console.error("No base url in modal response data so cannot navigate back");
          return;
        }
        !r && window.location.href !== g.baseUrl && Ie.visit(g.baseUrl, {
          preserveScroll: !0,
          preserveState: !0
        });
      }).then((y) => {
        bt = y;
      });
    }),
    []
  );
  const s = (o) => (gt.length && (o.headers["X-InertiaUI-Modal-Base-Url"] = De), o);
  X(() => (He.interceptors.request.use(s), () => He.interceptors.request.eject(s)), []);
  const l = sn(), i = q();
  return X(() => {
    var y, w;
    const o = (y = l.props) == null ? void 0 : y._inertiaui_modal, g = i.current;
    i.current = o, o && g && o.component === g.component && o.url === g.url && ((w = e.stack[0]) == null || w.updateProps(o.props ?? {}));
  }, [(m = l.props) == null ? void 0 : m._inertiaui_modal]), /* @__PURE__ */ F.jsxs(F.Fragment, { children: [
    t,
    e.stack.length > 0 && /* @__PURE__ */ F.jsx(ir, { index: 0 })
  ] });
}, St = J.createContext(null);
St.displayName = "ModalIndexContext";
const ar = () => {
  const t = J.useContext(St);
  if (t === void 0)
    throw new Error("useModalIndex must be used within a ModalIndexProvider");
  return t;
}, ir = ({ index: t }) => {
  const { stack: e } = et(), r = ve(() => e[t], [e, t]);
  return (r == null ? void 0 : r.component) && /* @__PURE__ */ F.jsx(St.Provider, { value: t, children: /* @__PURE__ */ F.jsx(
    r.component,
    {
      ...r.props,
      onModalEvent: (...n) => r.emit(...n)
    }
  ) });
}, sr = Tt(({ name: t, children: e, onFocus: r = null, onBlur: n = null, onClose: s = null, onSuccess: l = null, ...i }, m) => {
  const o = ar(), { stack: g, registerLocalModal: y, removeLocalModal: w } = et(), [P, S] = z(null), p = ve(() => t ? P : g[o], [t, P, o, g]), E = ve(() => {
    var b;
    return (b = g.find((D) => D.shouldRender && D.index > (p == null ? void 0 : p.index))) == null ? void 0 : b.index;
  }, [o, g]), d = ve(() => (p == null ? void 0 : p.config.slideover) ?? i.slideover ?? Rt("type") === "slideover", [i.slideover]), f = ve(
    () => ({
      slideover: d,
      closeButton: i.closeButton ?? Re(d, "closeButton"),
      closeExplicitly: i.closeExplicitly ?? Re(d, "closeExplicitly"),
      maxWidth: i.maxWidth ?? Re(d, "maxWidth"),
      paddingClasses: i.paddingClasses ?? Re(d, "paddingClasses"),
      panelClasses: i.panelClasses ?? Re(d, "panelClasses"),
      position: i.position ?? Re(d, "position"),
      ...p == null ? void 0 : p.config
    }),
    [i, p == null ? void 0 : p.config]
  );
  X(() => {
    if (t) {
      let b = null;
      return y(t, (D) => {
        b = D.registerEventListenersFromProps(i), S(D);
      }), () => {
        b == null || b(), b = null, w(t);
      };
    }
    return p.registerEventListenersFromProps(i);
  }, [t]);
  const v = q(p);
  X(() => {
    v.current = p;
  }, [p]), X(() => {
    p !== null && (p.isOpen ? l == null || l() : s == null || s());
  }, [p == null ? void 0 : p.isOpen]);
  const [R, O] = z(!1);
  return X(() => {
    R && p !== null && p.isOpen && (p.onTopOfStack ? r == null || r() : n == null || n()), O(!0);
  }, [p == null ? void 0 : p.onTopOfStack]), er(
    m,
    () => ({
      afterLeave: () => {
        var b;
        return (b = v.current) == null ? void 0 : b.afterLeave();
      },
      close: () => {
        var b;
        return (b = v.current) == null ? void 0 : b.close();
      },
      emit: (...b) => {
        var D;
        return (D = v.current) == null ? void 0 : D.emit(...b);
      },
      getChildModal: () => {
        var b;
        return (b = v.current) == null ? void 0 : b.getChildModal();
      },
      getParentModal: () => {
        var b;
        return (b = v.current) == null ? void 0 : b.getParentModal();
      },
      reload: (...b) => {
        var D;
        return (D = v.current) == null ? void 0 : D.reload(...b);
      },
      setOpen: () => {
        var b;
        return (b = v.current) == null ? void 0 : b.setOpen();
      },
      get id() {
        var b;
        return (b = v.current) == null ? void 0 : b.id;
      },
      get index() {
        var b;
        return (b = v.current) == null ? void 0 : b.index;
      },
      get isOpen() {
        var b;
        return (b = v.current) == null ? void 0 : b.isOpen;
      },
      get config() {
        var b;
        return (b = v.current) == null ? void 0 : b.config;
      },
      get modalContext() {
        return v.current;
      },
      get onTopOfStack() {
        var b;
        return (b = v.current) == null ? void 0 : b.onTopOfStack;
      },
      get shouldRender() {
        var b;
        return (b = v.current) == null ? void 0 : b.shouldRender;
      }
    }),
    [p]
  ), (p == null ? void 0 : p.shouldRender) && /* @__PURE__ */ F.jsxs(F.Fragment, { children: [
    typeof e == "function" ? e({
      afterLeave: p.afterLeave,
      close: p.close,
      config: f,
      emit: p.emit,
      getChildModal: p.getChildModal,
      getParentModal: p.getParentModal,
      id: p.id,
      index: p.index,
      isOpen: p.isOpen,
      modalContext: p,
      onTopOfStack: p.onTopOfStack,
      reload: p.reload,
      setOpen: p.setOpen,
      shouldRender: p.shouldRender
    }) : e,
    E && /* @__PURE__ */ F.jsx(ir, { index: E })
  ] });
});
sr.displayName = "HeadlessModal";
function lr(t) {
  var e, r, n = "";
  if (typeof t == "string" || typeof t == "number") n += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var s = t.length;
    for (e = 0; e < s; e++) t[e] && (r = lr(t[e])) && (n && (n += " "), n += r);
  } else for (r in t) t[r] && (n && (n += " "), n += r);
  return n;
}
function Ye() {
  for (var t, e, r = 0, n = "", s = arguments.length; r < s; r++) (t = arguments[r]) && (e = lr(t)) && (n && (n += " "), n += e);
  return n;
}
var bn = Object.defineProperty, gn = (t, e, r) => e in t ? bn(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, vt = (t, e, r) => (gn(t, typeof e != "symbol" ? e + "" : e, r), r);
let yn = class {
  constructor() {
    vt(this, "current", this.detect()), vt(this, "handoffState", "pending"), vt(this, "currentId", 0);
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
}, Ke = new yn();
function wn(t) {
  typeof queueMicrotask == "function" ? queueMicrotask(t) : Promise.resolve().then(t).catch((e) => setTimeout(() => {
    throw e;
  }));
}
function tt() {
  let t = [], e = { addEventListener(r, n, s, l) {
    return r.addEventListener(n, s, l), e.add(() => r.removeEventListener(n, s, l));
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
    return wn(() => {
      n.current && r[0]();
    }), e.add(() => {
      n.current = !1;
    });
  }, style(r, n, s) {
    let l = r.style.getPropertyValue(n);
    return Object.assign(r.style, { [n]: s }), this.add(() => {
      Object.assign(r.style, { [n]: l });
    });
  }, group(r) {
    let n = tt();
    return r(n), this.add(() => n.dispose());
  }, add(r) {
    return t.includes(r) || t.push(r), () => {
      let n = t.indexOf(r);
      if (n >= 0) for (let s of t.splice(n, 1)) s();
    };
  }, dispose() {
    for (let r of t.splice(0)) r();
  } };
  return e;
}
function or() {
  let [t] = z(tt);
  return X(() => () => t.dispose(), [t]), t;
}
let he = (t, e) => {
  Ke.isServer ? X(t, e) : rn(t, e);
};
function ur(t) {
  let e = q(t);
  return he(() => {
    e.current = t;
  }, [t]), e;
}
let de = function(t) {
  let e = ur(t);
  return J.useCallback((...r) => e.current(...r), [e]);
};
function yt(...t) {
  return Array.from(new Set(t.flatMap((e) => typeof e == "string" ? e.split(" ") : []))).filter(Boolean).join(" ");
}
function rt(t, e, ...r) {
  if (t in e) {
    let s = e[t];
    return typeof s == "function" ? s(...r) : s;
  }
  let n = new Error(`Tried to handle "${t}" but there is no handler defined. Only defined handlers are: ${Object.keys(e).map((s) => `"${s}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(n, rt), n;
}
var cr = ((t) => (t[t.None = 0] = "None", t[t.RenderStrategy = 1] = "RenderStrategy", t[t.Static = 2] = "Static", t))(cr || {}), pe = ((t) => (t[t.Unmount = 0] = "Unmount", t[t.Hidden = 1] = "Hidden", t))(pe || {});
function dr() {
  let t = En();
  return ue((e) => xn({ mergeRefs: t, ...e }), [t]);
}
function xn({ ourProps: t, theirProps: e, slot: r, defaultTag: n, features: s, visible: l = !0, name: i, mergeRefs: m }) {
  m = m ?? Tn;
  let o = fr(e, t);
  if (l) return Ue(o, r, n, i, m);
  let g = s ?? 0;
  if (g & 2) {
    let { static: y = !1, ...w } = o;
    if (y) return Ue(w, r, n, i, m);
  }
  if (g & 1) {
    let { unmount: y = !0, ...w } = o;
    return rt(y ? 0 : 1, { 0() {
      return null;
    }, 1() {
      return Ue({ ...w, hidden: !0, style: { display: "none" } }, r, n, i, m);
    } });
  }
  return Ue(o, r, n, i, m);
}
function Ue(t, e = {}, r, n, s) {
  let { as: l = r, children: i, refName: m = "ref", ...o } = pt(t, ["unmount", "static"]), g = t.ref !== void 0 ? { [m]: t.ref } : {}, y = typeof i == "function" ? i(e) : i;
  "className" in o && o.className && typeof o.className == "function" && (o.className = o.className(e)), o["aria-labelledby"] && o["aria-labelledby"] === o.id && (o["aria-labelledby"] = void 0);
  let w = {};
  if (e) {
    let P = !1, S = [];
    for (let [p, E] of Object.entries(e)) typeof E == "boolean" && (P = !0), E === !0 && S.push(p.replace(/([A-Z])/g, (d) => `-${d.toLowerCase()}`));
    if (P) {
      w["data-headlessui-state"] = S.join(" ");
      for (let p of S) w[`data-${p}`] = "";
    }
  }
  if (l === we && (Object.keys(be(o)).length > 0 || Object.keys(be(w)).length > 0)) if (!nn(y) || Array.isArray(y) && y.length > 1) {
    if (Object.keys(be(o)).length > 0) throw new Error(['Passing props on "Fragment"!', "", `The current component <${n} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(be(o)).concat(Object.keys(be(w))).map((P) => `  - ${P}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((P) => `  - ${P}`).join(`
`)].join(`
`));
  } else {
    let P = y.props, S = P == null ? void 0 : P.className, p = typeof S == "function" ? (...f) => yt(S(...f), o.className) : yt(S, o.className), E = p ? { className: p } : {}, d = fr(y.props, be(pt(o, ["ref"])));
    for (let f in w) f in d && delete w[f];
    return an(y, Object.assign({}, d, w, g, { ref: s(Rn(y), g.ref) }, E));
  }
  return Ve(l, Object.assign({}, pt(o, ["ref"]), l !== we && g, l !== we && w), y);
}
function En() {
  let t = q([]), e = ue((r) => {
    for (let n of t.current) n != null && (typeof n == "function" ? n(r) : n.current = r);
  }, []);
  return (...r) => {
    if (!r.every((n) => n == null)) return t.current = r, e;
  };
}
function Tn(...t) {
  return t.every((e) => e == null) ? void 0 : (e) => {
    for (let r of t) r != null && (typeof r == "function" ? r(e) : r.current = e);
  };
}
function fr(...t) {
  if (t.length === 0) return {};
  if (t.length === 1) return t[0];
  let e = {}, r = {};
  for (let n of t) for (let s in n) s.startsWith("on") && typeof n[s] == "function" ? (r[s] != null || (r[s] = []), r[s].push(n[s])) : e[s] = n[s];
  if (e.disabled || e["aria-disabled"]) for (let n in r) /^(on(?:Click|Pointer|Mouse|Key)(?:Down|Up|Press)?)$/.test(n) && (r[n] = [(s) => {
    var l;
    return (l = s == null ? void 0 : s.preventDefault) == null ? void 0 : l.call(s);
  }]);
  for (let n in r) Object.assign(e, { [n](s, ...l) {
    let i = r[n];
    for (let m of i) {
      if ((s instanceof Event || (s == null ? void 0 : s.nativeEvent) instanceof Event) && s.defaultPrevented) return;
      m(s, ...l);
    }
  } });
  return e;
}
function Ot(t) {
  var e;
  return Object.assign(Tt(t), { displayName: (e = t.displayName) != null ? e : t.name });
}
function be(t) {
  let e = Object.assign({}, t);
  for (let r in e) e[r] === void 0 && delete e[r];
  return e;
}
function pt(t, e = []) {
  let r = Object.assign({}, t);
  for (let n of e) n in r && delete r[n];
  return r;
}
function Rn(t) {
  return J.version.split(".")[0] >= "19" ? t.props.ref : t.ref;
}
let Sn = Symbol();
function vr(...t) {
  let e = q(t);
  X(() => {
    e.current = t;
  }, [t]);
  let r = de((n) => {
    for (let s of e.current) s != null && (typeof s == "function" ? s(n) : s.current = n);
  });
  return t.every((n) => n == null || (n == null ? void 0 : n[Sn])) ? void 0 : r;
}
function On(t = 0) {
  let [e, r] = z(t), n = ue((o) => r(o), [e]), s = ue((o) => r((g) => g | o), [e]), l = ue((o) => (e & o) === o, [e]), i = ue((o) => r((g) => g & ~o), [r]), m = ue((o) => r((g) => g ^ o), [r]);
  return { flags: e, setFlag: n, addFlag: s, hasFlag: l, removeFlag: i, toggleFlag: m };
}
var qt, Xt;
typeof process < "u" && typeof globalThis < "u" && typeof Element < "u" && ((qt = process == null ? void 0 : process.env) == null ? void 0 : qt.NODE_ENV) === "test" && typeof ((Xt = Element == null ? void 0 : Element.prototype) == null ? void 0 : Xt.getAnimations) > "u" && (Element.prototype.getAnimations = function() {
  return console.warn(["Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.", "Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.", "", "Example usage:", "```js", "import { mockAnimationsApi } from 'jsdom-testing-mocks'", "mockAnimationsApi()", "```"].join(`
`)), [];
});
var Pn = ((t) => (t[t.None = 0] = "None", t[t.Closed = 1] = "Closed", t[t.Enter = 2] = "Enter", t[t.Leave = 4] = "Leave", t))(Pn || {});
function Cn(t) {
  let e = {};
  for (let r in t) t[r] === !0 && (e[`data-${r}`] = "");
  return e;
}
function kn(t, e, r, n) {
  let [s, l] = z(r), { hasFlag: i, addFlag: m, removeFlag: o } = On(t && s ? 3 : 0), g = q(!1), y = q(!1), w = or();
  return he(() => {
    var P;
    if (t) {
      if (r && l(!0), !e) {
        r && m(3);
        return;
      }
      return (P = n == null ? void 0 : n.start) == null || P.call(n, r), Fn(e, { inFlight: g, prepare() {
        y.current ? y.current = !1 : y.current = g.current, g.current = !0, !y.current && (r ? (m(3), o(4)) : (m(4), o(2)));
      }, run() {
        y.current ? r ? (o(3), m(4)) : (o(4), m(3)) : r ? o(1) : m(1);
      }, done() {
        var S;
        y.current && typeof e.getAnimations == "function" && e.getAnimations().length > 0 || (g.current = !1, o(7), r || l(!1), (S = n == null ? void 0 : n.end) == null || S.call(n, r));
      } });
    }
  }, [t, r, e, w]), t ? [s, { closed: i(1), enter: i(2), leave: i(4), transition: i(2) || i(4) }] : [r, { closed: void 0, enter: void 0, leave: void 0, transition: void 0 }];
}
function Fn(t, { prepare: e, run: r, done: n, inFlight: s }) {
  let l = tt();
  return jn(t, { prepare: e, inFlight: s }), l.nextFrame(() => {
    r(), l.requestAnimationFrame(() => {
      l.add(Nn(t, n));
    });
  }), l.dispose;
}
function Nn(t, e) {
  var r, n;
  let s = tt();
  if (!t) return s.dispose;
  let l = !1;
  s.add(() => {
    l = !0;
  });
  let i = (n = (r = t.getAnimations) == null ? void 0 : r.call(t).filter((m) => m instanceof CSSTransition)) != null ? n : [];
  return i.length === 0 ? (e(), s.dispose) : (Promise.allSettled(i.map((m) => m.finished)).then(() => {
    l || e();
  }), s.dispose);
}
function jn(t, { inFlight: e, prepare: r }) {
  if (e != null && e.current) {
    r();
    return;
  }
  let n = t.style.transition;
  t.style.transition = "none", r(), t.offsetHeight, t.style.transition = n;
}
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var pr = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"], qe = /* @__PURE__ */ pr.join(","), hr = typeof Element > "u", xe = hr ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, Xe = !hr && Element.prototype.getRootNode ? function(t) {
  var e;
  return t == null || (e = t.getRootNode) === null || e === void 0 ? void 0 : e.call(t);
} : function(t) {
  return t == null ? void 0 : t.ownerDocument;
}, ze = function t(e, r) {
  var n;
  r === void 0 && (r = !0);
  var s = e == null || (n = e.getAttribute) === null || n === void 0 ? void 0 : n.call(e, "inert"), l = s === "" || s === "true", i = l || r && e && t(e.parentNode);
  return i;
}, An = function(e) {
  var r, n = e == null || (r = e.getAttribute) === null || r === void 0 ? void 0 : r.call(e, "contenteditable");
  return n === "" || n === "true";
}, mr = function(e, r, n) {
  if (ze(e))
    return [];
  var s = Array.prototype.slice.apply(e.querySelectorAll(qe));
  return r && xe.call(e, qe) && s.unshift(e), s = s.filter(n), s;
}, br = function t(e, r, n) {
  for (var s = [], l = Array.from(e); l.length; ) {
    var i = l.shift();
    if (!ze(i, !1))
      if (i.tagName === "SLOT") {
        var m = i.assignedElements(), o = m.length ? m : i.children, g = t(o, !0, n);
        n.flatten ? s.push.apply(s, g) : s.push({
          scopeParent: i,
          candidates: g
        });
      } else {
        var y = xe.call(i, qe);
        y && n.filter(i) && (r || !e.includes(i)) && s.push(i);
        var w = i.shadowRoot || // check for an undisclosed shadow
        typeof n.getShadowRoot == "function" && n.getShadowRoot(i), P = !ze(w, !1) && (!n.shadowRootFilter || n.shadowRootFilter(i));
        if (w && P) {
          var S = t(w === !0 ? i.children : w.children, !0, n);
          n.flatten ? s.push.apply(s, S) : s.push({
            scopeParent: i,
            candidates: S
          });
        } else
          l.unshift.apply(l, i.children);
      }
  }
  return s;
}, gr = function(e) {
  return !isNaN(parseInt(e.getAttribute("tabindex"), 10));
}, ge = function(e) {
  if (!e)
    throw new Error("No node provided");
  return e.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName) || An(e)) && !gr(e) ? 0 : e.tabIndex;
}, In = function(e, r) {
  var n = ge(e);
  return n < 0 && r && !gr(e) ? 0 : n;
}, _n = function(e, r) {
  return e.tabIndex === r.tabIndex ? e.documentOrder - r.documentOrder : e.tabIndex - r.tabIndex;
}, yr = function(e) {
  return e.tagName === "INPUT";
}, Dn = function(e) {
  return yr(e) && e.type === "hidden";
}, Mn = function(e) {
  var r = e.tagName === "DETAILS" && Array.prototype.slice.apply(e.children).some(function(n) {
    return n.tagName === "SUMMARY";
  });
  return r;
}, Ln = function(e, r) {
  for (var n = 0; n < e.length; n++)
    if (e[n].checked && e[n].form === r)
      return e[n];
}, $n = function(e) {
  if (!e.name)
    return !0;
  var r = e.form || Xe(e), n = function(m) {
    return r.querySelectorAll('input[type="radio"][name="' + m + '"]');
  }, s;
  if (typeof window < "u" && typeof window.CSS < "u" && typeof window.CSS.escape == "function")
    s = n(window.CSS.escape(e.name));
  else
    try {
      s = n(e.name);
    } catch (i) {
      return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", i.message), !1;
    }
  var l = Ln(s, e.form);
  return !l || l === e;
}, Wn = function(e) {
  return yr(e) && e.type === "radio";
}, Un = function(e) {
  return Wn(e) && !$n(e);
}, Bn = function(e) {
  var r, n = e && Xe(e), s = (r = n) === null || r === void 0 ? void 0 : r.host, l = !1;
  if (n && n !== e) {
    var i, m, o;
    for (l = !!((i = s) !== null && i !== void 0 && (m = i.ownerDocument) !== null && m !== void 0 && m.contains(s) || e != null && (o = e.ownerDocument) !== null && o !== void 0 && o.contains(e)); !l && s; ) {
      var g, y, w;
      n = Xe(s), s = (g = n) === null || g === void 0 ? void 0 : g.host, l = !!((y = s) !== null && y !== void 0 && (w = y.ownerDocument) !== null && w !== void 0 && w.contains(s));
    }
  }
  return l;
}, zt = function(e) {
  var r = e.getBoundingClientRect(), n = r.width, s = r.height;
  return n === 0 && s === 0;
}, Kn = function(e, r) {
  var n = r.displayCheck, s = r.getShadowRoot;
  if (getComputedStyle(e).visibility === "hidden")
    return !0;
  var l = xe.call(e, "details>summary:first-of-type"), i = l ? e.parentElement : e;
  if (xe.call(i, "details:not([open]) *"))
    return !0;
  if (!n || n === "full" || n === "legacy-full") {
    if (typeof s == "function") {
      for (var m = e; e; ) {
        var o = e.parentElement, g = Xe(e);
        if (o && !o.shadowRoot && s(o) === !0)
          return zt(e);
        e.assignedSlot ? e = e.assignedSlot : !o && g !== e.ownerDocument ? e = g.host : e = o;
      }
      e = m;
    }
    if (Bn(e))
      return !e.getClientRects().length;
    if (n !== "legacy-full")
      return !0;
  } else if (n === "non-zero-area")
    return zt(e);
  return !1;
}, Vn = function(e) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))
    for (var r = e.parentElement; r; ) {
      if (r.tagName === "FIELDSET" && r.disabled) {
        for (var n = 0; n < r.children.length; n++) {
          var s = r.children.item(n);
          if (s.tagName === "LEGEND")
            return xe.call(r, "fieldset[disabled] *") ? !0 : !s.contains(e);
        }
        return !0;
      }
      r = r.parentElement;
    }
  return !1;
}, Ge = function(e, r) {
  return !(r.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  ze(r) || Dn(r) || Kn(r, e) || // For a details element with a summary, the summary element gets the focus
  Mn(r) || Vn(r));
}, wt = function(e, r) {
  return !(Un(r) || ge(r) < 0 || !Ge(e, r));
}, Hn = function(e) {
  var r = parseInt(e.getAttribute("tabindex"), 10);
  return !!(isNaN(r) || r >= 0);
}, Yn = function t(e) {
  var r = [], n = [];
  return e.forEach(function(s, l) {
    var i = !!s.scopeParent, m = i ? s.scopeParent : s, o = In(m, i), g = i ? t(s.candidates) : m;
    o === 0 ? i ? r.push.apply(r, g) : r.push(m) : n.push({
      documentOrder: l,
      tabIndex: o,
      item: s,
      isScope: i,
      content: g
    });
  }), n.sort(_n).reduce(function(s, l) {
    return l.isScope ? s.push.apply(s, l.content) : s.push(l.content), s;
  }, []).concat(r);
}, qn = function(e, r) {
  r = r || {};
  var n;
  return r.getShadowRoot ? n = br([e], r.includeContainer, {
    filter: wt.bind(null, r),
    flatten: !1,
    getShadowRoot: r.getShadowRoot,
    shadowRootFilter: Hn
  }) : n = mr(e, r.includeContainer, wt.bind(null, r)), Yn(n);
}, Xn = function(e, r) {
  r = r || {};
  var n;
  return r.getShadowRoot ? n = br([e], r.includeContainer, {
    filter: Ge.bind(null, r),
    flatten: !0,
    getShadowRoot: r.getShadowRoot
  }) : n = mr(e, r.includeContainer, Ge.bind(null, r)), n;
}, Oe = function(e, r) {
  if (r = r || {}, !e)
    throw new Error("No node provided");
  return xe.call(e, qe) === !1 ? !1 : wt(r, e);
}, zn = /* @__PURE__ */ pr.concat("iframe").join(","), ht = function(e, r) {
  if (r = r || {}, !e)
    throw new Error("No node provided");
  return xe.call(e, zn) === !1 ? !1 : Ge(r, e);
};
let Pt = Je(null);
Pt.displayName = "OpenClosedContext";
var ye = ((t) => (t[t.Open = 1] = "Open", t[t.Closed = 2] = "Closed", t[t.Closing = 4] = "Closing", t[t.Opening = 8] = "Opening", t))(ye || {});
function wr() {
  return Pe(Pt);
}
function Gn({ value: t, children: e }) {
  return J.createElement(Pt.Provider, { value: t }, e);
}
function Jn() {
  let t = typeof document > "u";
  return "useSyncExternalStore" in _e ? ((e) => e.useSyncExternalStore)(_e)(() => () => {
  }, () => !1, () => !t) : !1;
}
function xr() {
  let t = Jn(), [e, r] = _e.useState(Ke.isHandoffComplete);
  return e && Ke.isHandoffComplete === !1 && r(!1), _e.useEffect(() => {
    e !== !0 && r(!0);
  }, [e]), _e.useEffect(() => Ke.handoff(), []), t ? !1 : e;
}
function Zn() {
  let t = q(!1);
  return he(() => (t.current = !0, () => {
    t.current = !1;
  }), []), t;
}
function Er(t) {
  var e;
  return !!(t.enter || t.enterFrom || t.enterTo || t.leave || t.leaveFrom || t.leaveTo) || ((e = t.as) != null ? e : Rr) !== we || J.Children.count(t.children) === 1;
}
let nt = Je(null);
nt.displayName = "TransitionContext";
var Qn = ((t) => (t.Visible = "visible", t.Hidden = "hidden", t))(Qn || {});
function ea() {
  let t = Pe(nt);
  if (t === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return t;
}
function ta() {
  let t = Pe(at);
  if (t === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return t;
}
let at = Je(null);
at.displayName = "NestingContext";
function it(t) {
  return "children" in t ? it(t.children) : t.current.filter(({ el: e }) => e.current !== null).filter(({ state: e }) => e === "visible").length > 0;
}
function Tr(t, e) {
  let r = ur(t), n = q([]), s = Zn(), l = or(), i = de((S, p = pe.Hidden) => {
    let E = n.current.findIndex(({ el: d }) => d === S);
    E !== -1 && (rt(p, { [pe.Unmount]() {
      n.current.splice(E, 1);
    }, [pe.Hidden]() {
      n.current[E].state = "hidden";
    } }), l.microTask(() => {
      var d;
      !it(n) && s.current && ((d = r.current) == null || d.call(r));
    }));
  }), m = de((S) => {
    let p = n.current.find(({ el: E }) => E === S);
    return p ? p.state !== "visible" && (p.state = "visible") : n.current.push({ el: S, state: "visible" }), () => i(S, pe.Unmount);
  }), o = q([]), g = q(Promise.resolve()), y = q({ enter: [], leave: [] }), w = de((S, p, E) => {
    o.current.splice(0), e && (e.chains.current[p] = e.chains.current[p].filter(([d]) => d !== S)), e == null || e.chains.current[p].push([S, new Promise((d) => {
      o.current.push(d);
    })]), e == null || e.chains.current[p].push([S, new Promise((d) => {
      Promise.all(y.current[p].map(([f, v]) => v)).then(() => d());
    })]), p === "enter" ? g.current = g.current.then(() => e == null ? void 0 : e.wait.current).then(() => E(p)) : E(p);
  }), P = de((S, p, E) => {
    Promise.all(y.current[p].splice(0).map(([d, f]) => f)).then(() => {
      var d;
      (d = o.current.shift()) == null || d();
    }).then(() => E(p));
  });
  return ve(() => ({ children: n, register: m, unregister: i, onStart: w, onStop: P, wait: g, chains: y }), [m, i, n, w, P, y, g]);
}
let Rr = we, Sr = cr.RenderStrategy;
function ra(t, e) {
  var r, n;
  let { transition: s = !0, beforeEnter: l, afterEnter: i, beforeLeave: m, afterLeave: o, enter: g, enterFrom: y, enterTo: w, entered: P, leave: S, leaveFrom: p, leaveTo: E, ...d } = t, [f, v] = z(null), R = q(null), O = Er(t), b = vr(...O ? [R, e, v] : e === null ? [] : [e]), D = (r = d.unmount) == null || r ? pe.Unmount : pe.Hidden, { show: B, appear: Z, initial: ee } = ea(), [Y, G] = z(B ? "visible" : "hidden"), j = ta(), { register: u, unregister: c } = j;
  he(() => u(R), [u, R]), he(() => {
    if (D === pe.Hidden && R.current) {
      if (B && Y !== "visible") {
        G("visible");
        return;
      }
      return rt(Y, { hidden: () => c(R), visible: () => u(R) });
    }
  }, [Y, R, u, c, B, D]);
  let T = xr();
  he(() => {
    if (O && T && Y === "visible" && R.current === null) throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
  }, [R, Y, T, O]);
  let I = ee && !Z, _ = Z && B && ee, L = q(!1), k = Tr(() => {
    L.current || (G("hidden"), c(R));
  }, j), W = de((le) => {
    L.current = !0;
    let ne = le ? "enter" : "leave";
    k.onStart(R, ne, (ce) => {
      ce === "enter" ? l == null || l() : ce === "leave" && (m == null || m());
    });
  }), U = de((le) => {
    let ne = le ? "enter" : "leave";
    L.current = !1, k.onStop(R, ne, (ce) => {
      ce === "enter" ? i == null || i() : ce === "leave" && (o == null || o());
    }), ne === "leave" && !it(k) && (G("hidden"), c(R));
  });
  X(() => {
    O && s || (W(B), U(B));
  }, [B, O, s]);
  let ae = !(!s || !O || !T || I), [, K] = kn(ae, f, B, { start: W, end: U }), ie = be({ ref: b, className: ((n = yt(d.className, _ && g, _ && y, K.enter && g, K.enter && K.closed && y, K.enter && !K.closed && w, K.leave && S, K.leave && !K.closed && p, K.leave && K.closed && E, !K.transition && B && P)) == null ? void 0 : n.trim()) || void 0, ...Cn(K) }), re = 0;
  Y === "visible" && (re |= ye.Open), Y === "hidden" && (re |= ye.Closed), K.enter && (re |= ye.Opening), K.leave && (re |= ye.Closing);
  let fe = dr();
  return J.createElement(at.Provider, { value: k }, J.createElement(Gn, { value: re }, fe({ ourProps: ie, theirProps: d, defaultTag: Rr, features: Sr, visible: Y === "visible", name: "Transition.Child" })));
}
function na(t, e) {
  let { show: r, appear: n = !1, unmount: s = !0, ...l } = t, i = q(null), m = Er(t), o = vr(...m ? [i, e] : e === null ? [] : [e]);
  xr();
  let g = wr();
  if (r === void 0 && g !== null && (r = (g & ye.Open) === ye.Open), r === void 0) throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
  let [y, w] = z(r ? "visible" : "hidden"), P = Tr(() => {
    r || w("hidden");
  }), [S, p] = z(!0), E = q([r]);
  he(() => {
    S !== !1 && E.current[E.current.length - 1] !== r && (E.current.push(r), p(!1));
  }, [E, r]);
  let d = ve(() => ({ show: r, appear: n, initial: S }), [r, n, S]);
  he(() => {
    r ? w("visible") : !it(P) && i.current !== null && w("hidden");
  }, [r, P]);
  let f = { unmount: s }, v = de(() => {
    var b;
    S && p(!1), (b = t.beforeEnter) == null || b.call(t);
  }), R = de(() => {
    var b;
    S && p(!1), (b = t.beforeLeave) == null || b.call(t);
  }), O = dr();
  return J.createElement(at.Provider, { value: P }, J.createElement(nt.Provider, { value: d }, O({ ourProps: { ...f, as: we, children: J.createElement(Or, { ref: o, ...f, ...l, beforeEnter: v, beforeLeave: R }) }, theirProps: {}, defaultTag: we, features: Sr, visible: y === "visible", name: "Transition" })));
}
function aa(t, e) {
  let r = Pe(nt) !== null, n = wr() !== null;
  return J.createElement(J.Fragment, null, !r && n ? J.createElement(xt, { ref: e, ...t }) : J.createElement(Or, { ref: e, ...t }));
}
let xt = Ot(na), Or = Ot(ra), st = Ot(aa), ia = Object.assign(xt, { Child: st, Root: xt });
function Pr({ onClick: t }) {
  return /* @__PURE__ */ F.jsxs(
    "button",
    {
      type: "button",
      className: "im-close-button text-gray-400 hover:text-gray-500",
      onClick: t,
      children: [
        /* @__PURE__ */ F.jsx("span", { className: "sr-only", children: "Close" }),
        /* @__PURE__ */ F.jsx(
          "svg",
          {
            className: "size-6",
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: "2",
            stroke: "currentColor",
            "aria-hidden": "true",
            children: /* @__PURE__ */ F.jsx(
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
/*!
* focus-trap 7.6.2
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
function Et(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
  return n;
}
function sa(t) {
  if (Array.isArray(t)) return Et(t);
}
function la(t, e, r) {
  return (e = fa(e)) in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function oa(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t);
}
function ua() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Gt(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(s) {
      return Object.getOwnPropertyDescriptor(t, s).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Jt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Gt(Object(r), !0).forEach(function(n) {
      la(t, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Gt(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t;
}
function ca(t) {
  return sa(t) || oa(t) || va(t) || ua();
}
function da(t, e) {
  if (typeof t != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
function fa(t) {
  var e = da(t, "string");
  return typeof e == "symbol" ? e : e + "";
}
function va(t, e) {
  if (t) {
    if (typeof t == "string") return Et(t, e);
    var r = {}.toString.call(t).slice(8, -1);
    return r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set" ? Array.from(t) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Et(t, e) : void 0;
  }
}
var Zt = {
  activateTrap: function(e, r) {
    if (e.length > 0) {
      var n = e[e.length - 1];
      n !== r && n.pause();
    }
    var s = e.indexOf(r);
    s === -1 || e.splice(s, 1), e.push(r);
  },
  deactivateTrap: function(e, r) {
    var n = e.indexOf(r);
    n !== -1 && e.splice(n, 1), e.length > 0 && e[e.length - 1].unpause();
  }
}, pa = function(e) {
  return e.tagName && e.tagName.toLowerCase() === "input" && typeof e.select == "function";
}, ha = function(e) {
  return (e == null ? void 0 : e.key) === "Escape" || (e == null ? void 0 : e.key) === "Esc" || (e == null ? void 0 : e.keyCode) === 27;
}, Me = function(e) {
  return (e == null ? void 0 : e.key) === "Tab" || (e == null ? void 0 : e.keyCode) === 9;
}, ma = function(e) {
  return Me(e) && !e.shiftKey;
}, ba = function(e) {
  return Me(e) && e.shiftKey;
}, Qt = function(e) {
  return setTimeout(e, 0);
}, Ae = function(e) {
  for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), s = 1; s < r; s++)
    n[s - 1] = arguments[s];
  return typeof e == "function" ? e.apply(void 0, n) : e;
}, Be = function(e) {
  return e.target.shadowRoot && typeof e.composedPath == "function" ? e.composedPath()[0] : e.target;
}, ga = [], ya = function(e, r) {
  var n = (r == null ? void 0 : r.document) || document, s = (r == null ? void 0 : r.trapStack) || ga, l = Jt({
    returnFocusOnDeactivate: !0,
    escapeDeactivates: !0,
    delayInitialFocus: !0,
    isKeyForward: ma,
    isKeyBackward: ba
  }, r), i = {
    // containers given to createFocusTrap()
    // @type {Array<HTMLElement>}
    containers: [],
    // list of objects identifying tabbable nodes in `containers` in the trap
    // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
    //  is active, but the trap should never get to a state where there isn't at least one group
    //  with at least one tabbable node in it (that would lead to an error condition that would
    //  result in an error being thrown)
    // @type {Array<{
    //   container: HTMLElement,
    //   tabbableNodes: Array<HTMLElement>, // empty if none
    //   focusableNodes: Array<HTMLElement>, // empty if none
    //   posTabIndexesFound: boolean,
    //   firstTabbableNode: HTMLElement|undefined,
    //   lastTabbableNode: HTMLElement|undefined,
    //   firstDomTabbableNode: HTMLElement|undefined,
    //   lastDomTabbableNode: HTMLElement|undefined,
    //   nextTabbableNode: (node: HTMLElement, forward: boolean) => HTMLElement|undefined
    // }>}
    containerGroups: [],
    // same order/length as `containers` list
    // references to objects in `containerGroups`, but only those that actually have
    //  tabbable nodes in them
    // NOTE: same order as `containers` and `containerGroups`, but __not necessarily__
    //  the same length
    tabbableGroups: [],
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: !1,
    paused: !1,
    // timer ID for when delayInitialFocus is true and initial focus in this trap
    //  has been delayed during activation
    delayInitialFocusTimer: void 0,
    // the most recent KeyboardEvent for the configured nav key (typically [SHIFT+]TAB), if any
    recentNavEvent: void 0
  }, m, o = function(u, c, T) {
    return u && u[c] !== void 0 ? u[c] : l[T || c];
  }, g = function(u, c) {
    var T = typeof (c == null ? void 0 : c.composedPath) == "function" ? c.composedPath() : void 0;
    return i.containerGroups.findIndex(function(I) {
      var _ = I.container, L = I.tabbableNodes;
      return _.contains(u) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (T == null ? void 0 : T.includes(_)) || L.find(function(k) {
        return k === u;
      });
    });
  }, y = function(u) {
    var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, T = c.hasFallback, I = T === void 0 ? !1 : T, _ = c.params, L = _ === void 0 ? [] : _, k = l[u];
    if (typeof k == "function" && (k = k.apply(void 0, ca(L))), k === !0 && (k = void 0), !k) {
      if (k === void 0 || k === !1)
        return k;
      throw new Error("`".concat(u, "` was specified but was not a node, or did not return a node"));
    }
    var W = k;
    if (typeof k == "string") {
      try {
        W = n.querySelector(k);
      } catch (U) {
        throw new Error("`".concat(u, '` appears to be an invalid selector; error="').concat(U.message, '"'));
      }
      if (!W && !I)
        throw new Error("`".concat(u, "` as selector refers to no known node"));
    }
    return W;
  }, w = function() {
    var u = y("initialFocus", {
      hasFallback: !0
    });
    if (u === !1)
      return !1;
    if (u === void 0 || u && !ht(u, l.tabbableOptions))
      if (g(n.activeElement) >= 0)
        u = n.activeElement;
      else {
        var c = i.tabbableGroups[0], T = c && c.firstTabbableNode;
        u = T || y("fallbackFocus");
      }
    else u === null && (u = y("fallbackFocus"));
    if (!u)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return u;
  }, P = function() {
    if (i.containerGroups = i.containers.map(function(u) {
      var c = qn(u, l.tabbableOptions), T = Xn(u, l.tabbableOptions), I = c.length > 0 ? c[0] : void 0, _ = c.length > 0 ? c[c.length - 1] : void 0, L = T.find(function(U) {
        return Oe(U);
      }), k = T.slice().reverse().find(function(U) {
        return Oe(U);
      }), W = !!c.find(function(U) {
        return ge(U) > 0;
      });
      return {
        container: u,
        tabbableNodes: c,
        focusableNodes: T,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: W,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode: I,
        /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
        lastTabbableNode: _,
        // NOTE: DOM order is NOT NECESSARILY "document position" order, but figuring that out
        //  would require more than just https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
        //  because that API doesn't work with Shadow DOM as well as it should (@see
        //  https://github.com/whatwg/dom/issues/320) and since this first/last is only needed, so far,
        //  to address an edge case related to positive tabindex support, this seems like a much easier,
        //  "close enough most of the time" alternative for positive tabindexes which should generally
        //  be avoided anyway...
        /** First tabbable node in container, __DOM__ order; `undefined` if none. */
        firstDomTabbableNode: L,
        /** Last tabbable node in container, __DOM__ order; `undefined` if none. */
        lastDomTabbableNode: k,
        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function(ae) {
          var K = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, ie = c.indexOf(ae);
          return ie < 0 ? K ? T.slice(T.indexOf(ae) + 1).find(function(re) {
            return Oe(re);
          }) : T.slice(0, T.indexOf(ae)).reverse().find(function(re) {
            return Oe(re);
          }) : c[ie + (K ? 1 : -1)];
        }
      };
    }), i.tabbableGroups = i.containerGroups.filter(function(u) {
      return u.tabbableNodes.length > 0;
    }), i.tabbableGroups.length <= 0 && !y("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (i.containerGroups.find(function(u) {
      return u.posTabIndexesFound;
    }) && i.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, S = function(u) {
    var c = u.activeElement;
    if (c)
      return c.shadowRoot && c.shadowRoot.activeElement !== null ? S(c.shadowRoot) : c;
  }, p = function(u) {
    if (u !== !1 && u !== S(document)) {
      if (!u || !u.focus) {
        p(w());
        return;
      }
      u.focus({
        preventScroll: !!l.preventScroll
      }), i.mostRecentlyFocusedNode = u, pa(u) && u.select();
    }
  }, E = function(u) {
    var c = y("setReturnFocus", {
      params: [u]
    });
    return c || (c === !1 ? !1 : u);
  }, d = function(u) {
    var c = u.target, T = u.event, I = u.isBackward, _ = I === void 0 ? !1 : I;
    c = c || Be(T), P();
    var L = null;
    if (i.tabbableGroups.length > 0) {
      var k = g(c, T), W = k >= 0 ? i.containerGroups[k] : void 0;
      if (k < 0)
        _ ? L = i.tabbableGroups[i.tabbableGroups.length - 1].lastTabbableNode : L = i.tabbableGroups[0].firstTabbableNode;
      else if (_) {
        var U = i.tabbableGroups.findIndex(function(le) {
          var ne = le.firstTabbableNode;
          return c === ne;
        });
        if (U < 0 && (W.container === c || ht(c, l.tabbableOptions) && !Oe(c, l.tabbableOptions) && !W.nextTabbableNode(c, !1)) && (U = k), U >= 0) {
          var ae = U === 0 ? i.tabbableGroups.length - 1 : U - 1, K = i.tabbableGroups[ae];
          L = ge(c) >= 0 ? K.lastTabbableNode : K.lastDomTabbableNode;
        } else Me(T) || (L = W.nextTabbableNode(c, !1));
      } else {
        var ie = i.tabbableGroups.findIndex(function(le) {
          var ne = le.lastTabbableNode;
          return c === ne;
        });
        if (ie < 0 && (W.container === c || ht(c, l.tabbableOptions) && !Oe(c, l.tabbableOptions) && !W.nextTabbableNode(c)) && (ie = k), ie >= 0) {
          var re = ie === i.tabbableGroups.length - 1 ? 0 : ie + 1, fe = i.tabbableGroups[re];
          L = ge(c) >= 0 ? fe.firstTabbableNode : fe.firstDomTabbableNode;
        } else Me(T) || (L = W.nextTabbableNode(c));
      }
    } else
      L = y("fallbackFocus");
    return L;
  }, f = function(u) {
    var c = Be(u);
    if (!(g(c, u) >= 0)) {
      if (Ae(l.clickOutsideDeactivates, u)) {
        m.deactivate({
          // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
          //  which will result in the outside click setting focus to the node
          //  that was clicked (and if not focusable, to "nothing"); by setting
          //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
          //  on activation (or the configured `setReturnFocus` node), whether the
          //  outside click was on a focusable node or not
          returnFocus: l.returnFocusOnDeactivate
        });
        return;
      }
      Ae(l.allowOutsideClick, u) || u.preventDefault();
    }
  }, v = function(u) {
    var c = Be(u), T = g(c, u) >= 0;
    if (T || c instanceof Document)
      T && (i.mostRecentlyFocusedNode = c);
    else {
      u.stopImmediatePropagation();
      var I, _ = !0;
      if (i.mostRecentlyFocusedNode)
        if (ge(i.mostRecentlyFocusedNode) > 0) {
          var L = g(i.mostRecentlyFocusedNode), k = i.containerGroups[L].tabbableNodes;
          if (k.length > 0) {
            var W = k.findIndex(function(U) {
              return U === i.mostRecentlyFocusedNode;
            });
            W >= 0 && (l.isKeyForward(i.recentNavEvent) ? W + 1 < k.length && (I = k[W + 1], _ = !1) : W - 1 >= 0 && (I = k[W - 1], _ = !1));
          }
        } else
          i.containerGroups.some(function(U) {
            return U.tabbableNodes.some(function(ae) {
              return ge(ae) > 0;
            });
          }) || (_ = !1);
      else
        _ = !1;
      _ && (I = d({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: i.mostRecentlyFocusedNode,
        isBackward: l.isKeyBackward(i.recentNavEvent)
      })), p(I || i.mostRecentlyFocusedNode || w());
    }
    i.recentNavEvent = void 0;
  }, R = function(u) {
    var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    i.recentNavEvent = u;
    var T = d({
      event: u,
      isBackward: c
    });
    T && (Me(u) && u.preventDefault(), p(T));
  }, O = function(u) {
    (l.isKeyForward(u) || l.isKeyBackward(u)) && R(u, l.isKeyBackward(u));
  }, b = function(u) {
    ha(u) && Ae(l.escapeDeactivates, u) !== !1 && (u.preventDefault(), m.deactivate());
  }, D = function(u) {
    var c = Be(u);
    g(c, u) >= 0 || Ae(l.clickOutsideDeactivates, u) || Ae(l.allowOutsideClick, u) || (u.preventDefault(), u.stopImmediatePropagation());
  }, B = function() {
    if (i.active)
      return Zt.activateTrap(s, m), i.delayInitialFocusTimer = l.delayInitialFocus ? Qt(function() {
        p(w());
      }) : p(w()), n.addEventListener("focusin", v, !0), n.addEventListener("mousedown", f, {
        capture: !0,
        passive: !1
      }), n.addEventListener("touchstart", f, {
        capture: !0,
        passive: !1
      }), n.addEventListener("click", D, {
        capture: !0,
        passive: !1
      }), n.addEventListener("keydown", O, {
        capture: !0,
        passive: !1
      }), n.addEventListener("keydown", b), m;
  }, Z = function() {
    if (i.active)
      return n.removeEventListener("focusin", v, !0), n.removeEventListener("mousedown", f, !0), n.removeEventListener("touchstart", f, !0), n.removeEventListener("click", D, !0), n.removeEventListener("keydown", O, !0), n.removeEventListener("keydown", b), m;
  }, ee = function(u) {
    var c = u.some(function(T) {
      var I = Array.from(T.removedNodes);
      return I.some(function(_) {
        return _ === i.mostRecentlyFocusedNode;
      });
    });
    c && p(w());
  }, Y = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(ee) : void 0, G = function() {
    Y && (Y.disconnect(), i.active && !i.paused && i.containers.map(function(u) {
      Y.observe(u, {
        subtree: !0,
        childList: !0
      });
    }));
  };
  return m = {
    get active() {
      return i.active;
    },
    get paused() {
      return i.paused;
    },
    activate: function(u) {
      if (i.active)
        return this;
      var c = o(u, "onActivate"), T = o(u, "onPostActivate"), I = o(u, "checkCanFocusTrap");
      I || P(), i.active = !0, i.paused = !1, i.nodeFocusedBeforeActivation = n.activeElement, c == null || c();
      var _ = function() {
        I && P(), B(), G(), T == null || T();
      };
      return I ? (I(i.containers.concat()).then(_, _), this) : (_(), this);
    },
    deactivate: function(u) {
      if (!i.active)
        return this;
      var c = Jt({
        onDeactivate: l.onDeactivate,
        onPostDeactivate: l.onPostDeactivate,
        checkCanReturnFocus: l.checkCanReturnFocus
      }, u);
      clearTimeout(i.delayInitialFocusTimer), i.delayInitialFocusTimer = void 0, Z(), i.active = !1, i.paused = !1, G(), Zt.deactivateTrap(s, m);
      var T = o(c, "onDeactivate"), I = o(c, "onPostDeactivate"), _ = o(c, "checkCanReturnFocus"), L = o(c, "returnFocus", "returnFocusOnDeactivate");
      T == null || T();
      var k = function() {
        Qt(function() {
          L && p(E(i.nodeFocusedBeforeActivation)), I == null || I();
        });
      };
      return L && _ ? (_(E(i.nodeFocusedBeforeActivation)).then(k, k), this) : (k(), this);
    },
    pause: function(u) {
      if (i.paused || !i.active)
        return this;
      var c = o(u, "onPause"), T = o(u, "onPostPause");
      return i.paused = !0, c == null || c(), Z(), G(), T == null || T(), this;
    },
    unpause: function(u) {
      if (!i.paused || !i.active)
        return this;
      var c = o(u, "onUnpause"), T = o(u, "onPostUnpause");
      return i.paused = !1, c == null || c(), P(), B(), G(), T == null || T(), this;
    },
    updateContainerElements: function(u) {
      var c = [].concat(u).filter(Boolean);
      return i.containers = c.map(function(T) {
        return typeof T == "string" ? n.querySelector(T) : T;
      }), i.active && P(), G(), this;
    }
  }, m.updateContainerElements(e), m;
};
function Cr(t, e, r) {
  let n = null;
  return t && (n = ya(t, {
    clickOutsideDeactivates: !e,
    escapeDeactivates: !e,
    onDeactivate: () => r == null ? void 0 : r(),
    fallbackFocus: () => t
  }), n.activate()), { deactivate: () => {
    n == null || n.deactivate(), n = null;
  }, wrapper: t };
}
const wa = ({ modalContext: t, config: e, children: r }) => {
  const [n, s] = z(!1), l = q(null), [i, m] = z(null);
  function o() {
    m(Cr(l.current, e == null ? void 0 : e.closeExplicitly, () => t.close())), s(!0);
  }
  return X(() => () => i == null ? void 0 : i.deactivate(), [i]), /* @__PURE__ */ F.jsx("div", { className: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4", children: /* @__PURE__ */ F.jsx(
    "div",
    {
      className: Ye("im-modal-positioner flex min-h-full justify-center", {
        "items-start": e.position === "top",
        "items-center": e.position === "center",
        "items-end": e.position === "bottom"
      }),
      children: /* @__PURE__ */ F.jsx(
        st,
        {
          as: "div",
          ref: l,
          enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          enterTo: "opacity-100 translate-y-0 sm:scale-100",
          leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
          leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          afterEnter: o,
          afterLeave: t.afterLeave,
          className: Ye(
            "im-modal-wrapper pointer-events-auto w-full transition duration-300 ease-in-out",
            t.onTopOfStack ? "" : "blur-sm",
            {
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
            }
          ),
          children: /* @__PURE__ */ F.jsxs(
            "div",
            {
              className: `im-modal-content relative ${e.paddingClasses} ${e.panelClasses}`,
              "data-inertiaui-modal-entered": n,
              children: [
                e.closeButton && /* @__PURE__ */ F.jsx("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ F.jsx(Pr, { onClick: t.close }) }),
                typeof r == "function" ? r({ modalContext: t, config: e }) : r
              ]
            }
          )
        }
      )
    }
  ) });
}, xa = ({ modalContext: t, config: e, children: r }) => {
  const [n, s] = z(!1), l = q(null), [i, m] = z(null);
  function o() {
    m(Cr(l.current, e == null ? void 0 : e.closeExplicitly, () => t.close())), s(!0);
  }
  return X(() => () => i == null ? void 0 : i.deactivate(), [i]), /* @__PURE__ */ F.jsx("div", { className: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ F.jsx(
    "div",
    {
      className: Ye("im-slideover-positioner flex min-h-full items-center", {
        "justify-start rtl:justify-end": (e == null ? void 0 : e.position) === "left",
        "justify-end rtl:justify-start": (e == null ? void 0 : e.position) === "right"
      }),
      children: /* @__PURE__ */ F.jsx(
        st,
        {
          as: "div",
          ref: l,
          enterFrom: `opacity-0 ${e.position === "left" ? "-translate-x-full" : "translate-x-full"}`,
          enterTo: "opacity-100 translate-x-0",
          leaveFrom: "opacity-100 translate-x-0",
          leaveTo: `opacity-0 ${e.position === "left" ? "-translate-x-full" : "translate-x-full"}`,
          afterEnter: o,
          afterLeave: t.afterLeave,
          className: Ye(
            "im-slideover-wrapper pointer-events-auto w-full transition duration-300 ease-in-out",
            t.onTopOfStack ? "" : "blur-sm",
            {
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
            }
          ),
          children: /* @__PURE__ */ F.jsxs(
            "div",
            {
              className: `im-slideover-content relative ${e.paddingClasses} ${e.panelClasses}`,
              "data-inertiaui-modal-entered": n,
              children: [
                e.closeButton && /* @__PURE__ */ F.jsx("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ F.jsx(Pr, { onClick: t.close }) }),
                typeof r == "function" ? r({ modalContext: t, config: e }) : r
              ]
            }
          )
        }
      )
    }
  ) });
}, Ea = Tt(({ name: t, children: e, onFocus: r = null, onBlur: n = null, onClose: s = null, onSuccess: l = null, onAfterLeave: i = null, ...m }, o) => {
  const g = (w) => typeof e == "function" ? e(w) : e, y = q(null);
  return X(() => {
    var w;
    if (((w = y == null ? void 0 : y.current) == null ? void 0 : w.index) === 0)
      return Ht.prepare(), () => Ht.cleanup();
  }, [y]), er(o, () => y.current, [y]), /* @__PURE__ */ F.jsx(
    sr,
    {
      ref: y,
      name: t,
      onFocus: r,
      onBlur: n,
      onClose: s,
      onSuccess: l,
      ...m,
      children: ({
        afterLeave: w,
        close: P,
        config: S,
        emit: p,
        getChildModal: E,
        getParentModal: d,
        id: f,
        index: v,
        isOpen: R,
        modalContext: O,
        onTopOfStack: b,
        reload: D,
        setOpen: B,
        shouldRender: Z
      }) => /* @__PURE__ */ F.jsx(
        ia,
        {
          appear: !0,
          show: R ?? !1,
          afterLeave: i,
          children: /* @__PURE__ */ F.jsxs(
            "div",
            {
              className: "im-dialog relative z-20",
              "data-inertiaui-modal-id": f,
              "data-inertiaui-modal-index": v,
              children: [
                v === 0 ? /* @__PURE__ */ F.jsx(
                  st,
                  {
                    enter: "transition transform ease-in-out duration-300",
                    enterFrom: "opacity-0",
                    enterTo: "opacity-100",
                    leave: "transition transform ease-in-out duration-300",
                    leaveFrom: "opacity-100",
                    leaveTo: "opacity-0",
                    children: b ? /* @__PURE__ */ F.jsx(
                      "div",
                      {
                        className: "im-backdrop fixed inset-0 z-30 bg-black/75",
                        "aria-hidden": "true"
                      }
                    ) : /* @__PURE__ */ F.jsx("div", {})
                  }
                ) : null,
                v > 0 && b ? /* @__PURE__ */ F.jsx("div", { className: "im-backdrop fixed inset-0 z-30 bg-black/75" }) : null,
                S.slideover ? /* @__PURE__ */ F.jsx(
                  xa,
                  {
                    modalContext: O,
                    config: S,
                    children: g({
                      afterLeave: w,
                      close: P,
                      config: S,
                      emit: p,
                      getChildModal: E,
                      getParentModal: d,
                      id: f,
                      index: v,
                      isOpen: R,
                      modalContext: O,
                      onTopOfStack: b,
                      reload: D,
                      setOpen: B,
                      shouldRender: Z
                    })
                  }
                ) : /* @__PURE__ */ F.jsx(
                  wa,
                  {
                    modalContext: O,
                    config: S,
                    children: g({
                      afterLeave: w,
                      close: P,
                      config: S,
                      emit: p,
                      getChildModal: E,
                      getParentModal: d,
                      id: f,
                      index: v,
                      isOpen: R,
                      modalContext: O,
                      onTopOfStack: b,
                      reload: D,
                      setOpen: B,
                      shouldRender: Z
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
Ea.displayName = "Modal";
const ja = ({
  href: t,
  method: e = "get",
  data: r = {},
  as: n = "a",
  headers: s = {},
  queryStringArrayFormat: l = "brackets",
  onAfterLeave: i = null,
  onBlur: m = null,
  onClose: o = null,
  onError: g = null,
  onFocus: y = null,
  onStart: w = null,
  onSuccess: P = null,
  navigate: S = null,
  children: p,
  ...E
}) => {
  const [d, f] = z(!1), [v, R] = z(null), { stack: O, visit: b } = et(), D = ve(() => S ?? Rt("navigate"), [S]), B = {}, Z = {};
  Object.keys(E).forEach((c) => {
    Yt.includes(c) || (c.startsWith("on") && typeof E[c] == "function" ? c.toLowerCase() in window ? B[c] = E[c] : Z[c] = E[c] : B[c] = E[c]);
  });
  const [ee, Y] = z(!1);
  X(() => {
    v && (v.onTopOfStack && ee ? y == null || y() : !v.onTopOfStack && !ee && (m == null || m()), Y(!v.onTopOfStack));
  }, [O]);
  const G = ue(() => {
    o == null || o();
  }, [o]), j = ue(() => {
    R(null), i == null || i();
  }, [i]), u = ue(
    (c) => {
      c == null || c.preventDefault(), !d && (t.startsWith("#") || (f(!0), w == null || w()), b(
        t,
        e,
        r,
        s,
        fn(tr(E, Yt)),
        () => G(O.length),
        j,
        l,
        D
      ).then((T) => {
        R(T), T.registerEventListenersFromProps(Z), P == null || P();
      }).catch((T) => {
        console.error(T), g == null || g(T);
      }).finally(() => f(!1)));
    },
    [t, e, r, s, l, E, G, j]
  );
  return /* @__PURE__ */ F.jsx(
    n,
    {
      ...B,
      href: t,
      onClick: u,
      children: typeof p == "function" ? p({ loading: d }) : p
    }
  );
};
function Aa() {
  return et().stack[ar()] ?? null;
}
const Ia = (t) => (e) => (e.default.layout = (r) => Ve(t, {}, r), e);
export {
  sr as HeadlessModal,
  Ea as Modal,
  ja as ModalLink,
  mn as ModalRoot,
  pn as ModalStackProvider,
  Rt as getConfig,
  hn as initFromPageProps,
  ka as putConfig,
  Fa as renderApp,
  Ca as resetConfig,
  Ia as setPageLayout,
  Aa as useModal,
  ar as useModalIndex,
  et as useModalStack
};
