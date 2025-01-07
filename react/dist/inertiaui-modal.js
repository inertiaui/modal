var Zr = Object.defineProperty;
var Qr = (t, e, r) => e in t ? Zr(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var se = (t, e, r) => Qr(t, typeof e != "symbol" ? e + "" : e, r);
import * as Ie from "react";
import X, { createContext as Ge, useState as re, useEffect as G, useContext as Oe, useRef as Y, createElement as Ke, useMemo as ve, forwardRef as xt, useImperativeHandle as Zt, useLayoutEffect as en, useCallback as ue, Fragment as we, isValidElement as tn, cloneElement as rn } from "react";
import Ve from "axios";
import { router as Ae, usePage as nn } from "@inertiajs/react";
import { mergeDataIntoQueryString as an } from "@inertiajs/core";
const Pe = {
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
class sn {
  constructor() {
    this.config = {}, this.reset();
  }
  reset() {
    this.config = JSON.parse(JSON.stringify(Pe));
  }
  put(e, r) {
    if (typeof e == "object") {
      this.config = {
        type: e.type ?? Pe.type,
        navigate: e.navigate ?? Pe.navigate,
        modal: { ...Pe.modal, ...e.modal ?? {} },
        slideover: { ...Pe.slideover, ...e.slideover ?? {} }
      };
      return;
    }
    const n = e.split(".");
    let i = this.config;
    for (let l = 0; l < n.length - 1; l++)
      i = i[n[l]] = i[n[l]] || {};
    i[n[n.length - 1]] = r;
  }
  get(e) {
    if (typeof e > "u")
      return this.config;
    const r = e.split(".");
    let n = this.config;
    for (const i of r) {
      if (n[i] === void 0)
        return null;
      n = n[i];
    }
    return n;
  }
}
const Je = new sn(), Oa = () => Je.reset(), Ca = (t, e) => Je.put(t, e), Et = (t) => Je.get(t), Re = (t, e) => Je.get(t ? `slideover.${e}` : `modal.${e}`);
var pt = { exports: {} }, Fe = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ut;
function ln() {
  if (Ut) return Fe;
  Ut = 1;
  var t = X, e = Symbol.for("react.element"), r = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, i = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, l = { key: !0, ref: !0, __self: !0, __source: !0 };
  function s(m, o, g) {
    var v, E = {}, R = null, S = null;
    g !== void 0 && (R = "" + g), o.key !== void 0 && (R = "" + o.key), o.ref !== void 0 && (S = o.ref);
    for (v in o) n.call(o, v) && !l.hasOwnProperty(v) && (E[v] = o[v]);
    if (m && m.defaultProps) for (v in o = m.defaultProps, o) E[v] === void 0 && (E[v] = o[v]);
    return { $$typeof: e, type: m, key: R, ref: S, props: E, _owner: i.current };
  }
  return Fe.Fragment = r, Fe.jsx = s, Fe.jsxs = s, Fe;
}
var ke = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Bt;
function on() {
  return Bt || (Bt = 1, process.env.NODE_ENV !== "production" && function() {
    var t = X, e = Symbol.for("react.element"), r = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), l = Symbol.for("react.profiler"), s = Symbol.for("react.provider"), m = Symbol.for("react.context"), o = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), v = Symbol.for("react.suspense_list"), E = Symbol.for("react.memo"), R = Symbol.for("react.lazy"), S = Symbol.for("react.offscreen"), w = Symbol.iterator, f = "@@iterator";
    function d(a) {
      if (a === null || typeof a != "object")
        return null;
      var h = w && a[w] || a[f];
      return typeof h == "function" ? h : null;
    }
    var p = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function b(a) {
      {
        for (var h = arguments.length, x = new Array(h > 1 ? h - 1 : 0), C = 1; C < h; C++)
          x[C - 1] = arguments[C];
        T("error", a, x);
      }
    }
    function T(a, h, x) {
      {
        var C = p.ReactDebugCurrentFrame, D = C.getStackAddendum();
        D !== "" && (h += "%s", x = x.concat([D]));
        var L = x.map(function(j) {
          return String(j);
        });
        L.unshift("Warning: " + h), Function.prototype.apply.call(console[a], console, L);
      }
    }
    var O = !1, A = !1, le = !1, K = !1, J = !1, Q;
    Q = Symbol.for("react.module.reference");
    function H(a) {
      return !!(typeof a == "string" || typeof a == "function" || a === n || a === l || J || a === i || a === g || a === v || K || a === S || O || A || le || typeof a == "object" && a !== null && (a.$$typeof === R || a.$$typeof === E || a.$$typeof === s || a.$$typeof === m || a.$$typeof === o || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      a.$$typeof === Q || a.getModuleId !== void 0));
    }
    function q(a, h, x) {
      var C = a.displayName;
      if (C)
        return C;
      var D = h.displayName || h.name || "";
      return D !== "" ? x + "(" + D + ")" : x;
    }
    function N(a) {
      return a.displayName || "Context";
    }
    function u(a) {
      if (a == null)
        return null;
      if (typeof a.tag == "number" && b("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof a == "function")
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
        case i:
          return "StrictMode";
        case g:
          return "Suspense";
        case v:
          return "SuspenseList";
      }
      if (typeof a == "object")
        switch (a.$$typeof) {
          case m:
            var h = a;
            return N(h) + ".Consumer";
          case s:
            var x = a;
            return N(x._context) + ".Provider";
          case o:
            return q(a, a.render, "ForwardRef");
          case E:
            var C = a.displayName || null;
            return C !== null ? C : u(a.type) || "Memo";
          case R: {
            var D = a, L = D._payload, j = D._init;
            try {
              return u(j(L));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var c = Object.assign, y = 0, I, _, M, P, $, W, ne;
    function U() {
    }
    U.__reactDisabledLog = !0;
    function ae() {
      {
        if (y === 0) {
          I = console.log, _ = console.info, M = console.warn, P = console.error, $ = console.group, W = console.groupCollapsed, ne = console.groupEnd;
          var a = {
            configurable: !0,
            enumerable: !0,
            value: U,
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
        y++;
      }
    }
    function ee() {
      {
        if (y--, y === 0) {
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
              value: M
            }),
            error: c({}, a, {
              value: P
            }),
            group: c({}, a, {
              value: $
            }),
            groupCollapsed: c({}, a, {
              value: W
            }),
            groupEnd: c({}, a, {
              value: ne
            })
          });
        }
        y < 0 && b("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var fe = p.ReactCurrentDispatcher, oe;
    function te(a, h, x) {
      {
        if (oe === void 0)
          try {
            throw Error();
          } catch (D) {
            var C = D.stack.trim().match(/\n( *(at )?)/);
            oe = C && C[1] || "";
          }
        return `
` + oe + a;
      }
    }
    var ce = !1, Me;
    {
      var Cr = typeof WeakMap == "function" ? WeakMap : Map;
      Me = new Cr();
    }
    function Ot(a, h) {
      if (!a || ce)
        return "";
      {
        var x = Me.get(a);
        if (x !== void 0)
          return x;
      }
      var C;
      ce = !0;
      var D = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var L;
      L = fe.current, fe.current = null, ae();
      try {
        if (h) {
          var j = function() {
            throw Error();
          };
          if (Object.defineProperty(j.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(j, []);
            } catch (Z) {
              C = Z;
            }
            Reflect.construct(a, [], j);
          } else {
            try {
              j.call();
            } catch (Z) {
              C = Z;
            }
            a.call(j.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Z) {
            C = Z;
          }
          a();
        }
      } catch (Z) {
        if (Z && C && typeof Z.stack == "string") {
          for (var k = Z.stack.split(`
`), z = C.stack.split(`
`), B = k.length - 1, V = z.length - 1; B >= 1 && V >= 0 && k[B] !== z[V]; )
            V--;
          for (; B >= 1 && V >= 0; B--, V--)
            if (k[B] !== z[V]) {
              if (B !== 1 || V !== 1)
                do
                  if (B--, V--, V < 0 || k[B] !== z[V]) {
                    var ie = `
` + k[B].replace(" at new ", " at ");
                    return a.displayName && ie.includes("<anonymous>") && (ie = ie.replace("<anonymous>", a.displayName)), typeof a == "function" && Me.set(a, ie), ie;
                  }
                while (B >= 1 && V >= 0);
              break;
            }
        }
      } finally {
        ce = !1, fe.current = L, ee(), Error.prepareStackTrace = D;
      }
      var Te = a ? a.displayName || a.name : "", me = Te ? te(Te) : "";
      return typeof a == "function" && Me.set(a, me), me;
    }
    function Pr(a, h, x) {
      return Ot(a, !1);
    }
    function Fr(a) {
      var h = a.prototype;
      return !!(h && h.isReactComponent);
    }
    function Le(a, h, x) {
      if (a == null)
        return "";
      if (typeof a == "function")
        return Ot(a, Fr(a));
      if (typeof a == "string")
        return te(a);
      switch (a) {
        case g:
          return te("Suspense");
        case v:
          return te("SuspenseList");
      }
      if (typeof a == "object")
        switch (a.$$typeof) {
          case o:
            return Pr(a.render);
          case E:
            return Le(a.type, h, x);
          case R: {
            var C = a, D = C._payload, L = C._init;
            try {
              return Le(L(D), h, x);
            } catch {
            }
          }
        }
      return "";
    }
    var Ce = Object.prototype.hasOwnProperty, Ct = {}, Pt = p.ReactDebugCurrentFrame;
    function $e(a) {
      if (a) {
        var h = a._owner, x = Le(a.type, a._source, h ? h.type : null);
        Pt.setExtraStackFrame(x);
      } else
        Pt.setExtraStackFrame(null);
    }
    function kr(a, h, x, C, D) {
      {
        var L = Function.call.bind(Ce);
        for (var j in a)
          if (L(a, j)) {
            var k = void 0;
            try {
              if (typeof a[j] != "function") {
                var z = Error((C || "React class") + ": " + x + " type `" + j + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[j] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw z.name = "Invariant Violation", z;
              }
              k = a[j](h, j, C, x, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (B) {
              k = B;
            }
            k && !(k instanceof Error) && ($e(D), b("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", C || "React class", x, j, typeof k), $e(null)), k instanceof Error && !(k.message in Ct) && (Ct[k.message] = !0, $e(D), b("Failed %s type: %s", x, k.message), $e(null));
          }
      }
    }
    var Nr = Array.isArray;
    function st(a) {
      return Nr(a);
    }
    function jr(a) {
      {
        var h = typeof Symbol == "function" && Symbol.toStringTag, x = h && a[Symbol.toStringTag] || a.constructor.name || "Object";
        return x;
      }
    }
    function Ar(a) {
      try {
        return Ft(a), !1;
      } catch {
        return !0;
      }
    }
    function Ft(a) {
      return "" + a;
    }
    function kt(a) {
      if (Ar(a))
        return b("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", jr(a)), Ft(a);
    }
    var Nt = p.ReactCurrentOwner, Ir = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, jt, At;
    function _r(a) {
      if (Ce.call(a, "ref")) {
        var h = Object.getOwnPropertyDescriptor(a, "ref").get;
        if (h && h.isReactWarning)
          return !1;
      }
      return a.ref !== void 0;
    }
    function Dr(a) {
      if (Ce.call(a, "key")) {
        var h = Object.getOwnPropertyDescriptor(a, "key").get;
        if (h && h.isReactWarning)
          return !1;
      }
      return a.key !== void 0;
    }
    function Mr(a, h) {
      typeof a.ref == "string" && Nt.current;
    }
    function Lr(a, h) {
      {
        var x = function() {
          jt || (jt = !0, b("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", h));
        };
        x.isReactWarning = !0, Object.defineProperty(a, "key", {
          get: x,
          configurable: !0
        });
      }
    }
    function $r(a, h) {
      {
        var x = function() {
          At || (At = !0, b("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", h));
        };
        x.isReactWarning = !0, Object.defineProperty(a, "ref", {
          get: x,
          configurable: !0
        });
      }
    }
    var Wr = function(a, h, x, C, D, L, j) {
      var k = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: e,
        // Built-in properties that belong on the element
        type: a,
        key: h,
        ref: x,
        props: j,
        // Record the component responsible for creating this element.
        _owner: L
      };
      return k._store = {}, Object.defineProperty(k._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(k, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: C
      }), Object.defineProperty(k, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: D
      }), Object.freeze && (Object.freeze(k.props), Object.freeze(k)), k;
    };
    function Ur(a, h, x, C, D) {
      {
        var L, j = {}, k = null, z = null;
        x !== void 0 && (kt(x), k = "" + x), Dr(h) && (kt(h.key), k = "" + h.key), _r(h) && (z = h.ref, Mr(h, D));
        for (L in h)
          Ce.call(h, L) && !Ir.hasOwnProperty(L) && (j[L] = h[L]);
        if (a && a.defaultProps) {
          var B = a.defaultProps;
          for (L in B)
            j[L] === void 0 && (j[L] = B[L]);
        }
        if (k || z) {
          var V = typeof a == "function" ? a.displayName || a.name || "Unknown" : a;
          k && Lr(j, V), z && $r(j, V);
        }
        return Wr(a, k, z, D, C, Nt.current, j);
      }
    }
    var lt = p.ReactCurrentOwner, It = p.ReactDebugCurrentFrame;
    function Ee(a) {
      if (a) {
        var h = a._owner, x = Le(a.type, a._source, h ? h.type : null);
        It.setExtraStackFrame(x);
      } else
        It.setExtraStackFrame(null);
    }
    var ot;
    ot = !1;
    function ut(a) {
      return typeof a == "object" && a !== null && a.$$typeof === e;
    }
    function _t() {
      {
        if (lt.current) {
          var a = u(lt.current.type);
          if (a)
            return `

Check the render method of \`` + a + "`.";
        }
        return "";
      }
    }
    function Br(a) {
      return "";
    }
    var Dt = {};
    function Kr(a) {
      {
        var h = _t();
        if (!h) {
          var x = typeof a == "string" ? a : a.displayName || a.name;
          x && (h = `

Check the top-level render call using <` + x + ">.");
        }
        return h;
      }
    }
    function Mt(a, h) {
      {
        if (!a._store || a._store.validated || a.key != null)
          return;
        a._store.validated = !0;
        var x = Kr(h);
        if (Dt[x])
          return;
        Dt[x] = !0;
        var C = "";
        a && a._owner && a._owner !== lt.current && (C = " It was passed a child from " + u(a._owner.type) + "."), Ee(a), b('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', x, C), Ee(null);
      }
    }
    function Lt(a, h) {
      {
        if (typeof a != "object")
          return;
        if (st(a))
          for (var x = 0; x < a.length; x++) {
            var C = a[x];
            ut(C) && Mt(C, h);
          }
        else if (ut(a))
          a._store && (a._store.validated = !0);
        else if (a) {
          var D = d(a);
          if (typeof D == "function" && D !== a.entries)
            for (var L = D.call(a), j; !(j = L.next()).done; )
              ut(j.value) && Mt(j.value, h);
        }
      }
    }
    function Vr(a) {
      {
        var h = a.type;
        if (h == null || typeof h == "string")
          return;
        var x;
        if (typeof h == "function")
          x = h.propTypes;
        else if (typeof h == "object" && (h.$$typeof === o || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        h.$$typeof === E))
          x = h.propTypes;
        else
          return;
        if (x) {
          var C = u(h);
          kr(x, a.props, "prop", C, a);
        } else if (h.PropTypes !== void 0 && !ot) {
          ot = !0;
          var D = u(h);
          b("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", D || "Unknown");
        }
        typeof h.getDefaultProps == "function" && !h.getDefaultProps.isReactClassApproved && b("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Hr(a) {
      {
        for (var h = Object.keys(a.props), x = 0; x < h.length; x++) {
          var C = h[x];
          if (C !== "children" && C !== "key") {
            Ee(a), b("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", C), Ee(null);
            break;
          }
        }
        a.ref !== null && (Ee(a), b("Invalid attribute `ref` supplied to `React.Fragment`."), Ee(null));
      }
    }
    var $t = {};
    function Wt(a, h, x, C, D, L) {
      {
        var j = H(a);
        if (!j) {
          var k = "";
          (a === void 0 || typeof a == "object" && a !== null && Object.keys(a).length === 0) && (k += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var z = Br();
          z ? k += z : k += _t();
          var B;
          a === null ? B = "null" : st(a) ? B = "array" : a !== void 0 && a.$$typeof === e ? (B = "<" + (u(a.type) || "Unknown") + " />", k = " Did you accidentally export a JSX literal instead of a component?") : B = typeof a, b("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", B, k);
        }
        var V = Ur(a, h, x, D, L);
        if (V == null)
          return V;
        if (j) {
          var ie = h.children;
          if (ie !== void 0)
            if (C)
              if (st(ie)) {
                for (var Te = 0; Te < ie.length; Te++)
                  Lt(ie[Te], a);
                Object.freeze && Object.freeze(ie);
              } else
                b("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Lt(ie, a);
        }
        if (Ce.call(h, "key")) {
          var me = u(a), Z = Object.keys(h).filter(function(Jr) {
            return Jr !== "key";
          }), ct = Z.length > 0 ? "{key: someKey, " + Z.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!$t[me + ct]) {
            var Gr = Z.length > 0 ? "{" + Z.join(": ..., ") + ": ...}" : "{}";
            b(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, ct, me, Gr, me), $t[me + ct] = !0;
          }
        }
        return a === n ? Hr(V) : Vr(V), V;
      }
    }
    function Yr(a, h, x) {
      return Wt(a, h, x, !0);
    }
    function qr(a, h, x) {
      return Wt(a, h, x, !1);
    }
    var Xr = qr, zr = Yr;
    ke.Fragment = n, ke.jsx = Xr, ke.jsxs = zr;
  }()), ke;
}
process.env.NODE_ENV === "production" ? pt.exports = ln() : pt.exports = on();
var F = pt.exports;
const Kt = {
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
function un(t, e) {
  return Array.isArray(t) ? t.filter((r) => !e.includes(r)) : Object.keys(t).reduce((r, n) => (e.includes(n) || (r[n] = t[n]), r), {});
}
function Qt(t, e) {
  return Array.isArray(t) ? t.filter((r) => e.includes(r)) : e.reduce((r, n) => (n in t && (r[n] = t[n]), r), {});
}
function cn(t) {
  return Array.isArray(t) ? t.filter((e) => e !== null) : Object.keys(t).reduce((e, r) => (r in t && t[r] !== null && (e[r] = t[r]), e), {});
}
function dn(t, e = 3, r = 10) {
  return new Promise((n, i) => {
    const l = t();
    if (l) {
      n(l);
      return;
    }
    let s = e * 1e3 / r;
    const m = setInterval(() => {
      const o = t();
      o && (clearInterval(m), n(o)), --s <= 0 && (clearInterval(m), i(new Error("Condition not met in time")));
    }, r);
  });
}
function Ne(t) {
  return t ? (t = t.replace(/_/g, "-"), t = t.replace(/-+/g, "-"), /[A-Z]/.test(t) ? (t = t.replace(/\s+/g, "").replace(/_/g, "").replace(/(?:^|\s|-)+([A-Za-z])/g, (e, r) => r.toUpperCase()), t = t.replace(/(.)(?=[A-Z])/g, "$1-"), t.toLowerCase()) : t) : "";
}
const Ze = Ge(null);
Ze.displayName = "ModalStackContext";
let er = null, tr = null, _e = null, ht = null, mt = [];
const fn = ({ children: t }) => {
  const [e, r] = re([]), [n, i] = re({}), l = (f) => {
    r((d) => {
      const p = f([...d]), b = (T) => {
        var O;
        return p.length < 2 ? !0 : ((O = p.map((A) => ({ id: A.id, shouldRender: A.shouldRender })).reverse().find((A) => A.shouldRender)) == null ? void 0 : O.id) === T;
      };
      return p.forEach((T, O) => {
        p[O].onTopOfStack = b(T.id), p[O].getParentModal = () => O < 1 ? null : p.slice(0, O).reverse().find((A) => A.isOpen), p[O].getChildModal = () => O === p.length - 1 ? null : p.slice(O + 1).find((A) => A.isOpen);
      }), p;
    });
  };
  G(() => {
    mt = e;
  }, [e]);
  class s {
    constructor(d, p, b, T, O) {
      se(this, "update", (d, p, b) => {
        l(
          (T) => T.map((O) => (O.id === this.id && (O.config = d, O.onCloseCallback = p, O.afterLeaveCallback = b), O))
        );
      });
      se(this, "show", () => {
        l(
          (d) => d.map((p) => (p.id === this.id && !p.isOpen && (p.isOpen = !0, p.shouldRender = !0), p))
        );
      });
      se(this, "setOpen", (d) => {
        d ? this.show() : this.close();
      });
      se(this, "close", () => {
        l(
          (d) => d.map((p) => {
            var b;
            return p.id === this.id && p.isOpen && (Object.keys(p.listeners).forEach((T) => {
              p.off(T);
            }), p.isOpen = !1, (b = p.onCloseCallback) == null || b.call(p)), p;
          })
        );
      });
      se(this, "afterLeave", () => {
        this.isOpen || l((d) => {
          const p = d.map((b) => {
            var T;
            return b.id === this.id && !b.isOpen && (b.shouldRender = !1, (T = b.afterLeaveCallback) == null || T.call(b), b.afterLeaveCallback = null), b;
          });
          return this.index === 0 ? [] : p;
        });
      });
      se(this, "on", (d, p) => {
        d = Ne(d), this.listeners[d] = this.listeners[d] ?? [], this.listeners[d].push(p);
      });
      se(this, "off", (d, p) => {
        var b;
        d = Ne(d), p ? this.listeners[d] = ((b = this.listeners[d]) == null ? void 0 : b.filter((T) => T !== p)) ?? [] : delete this.listeners[d];
      });
      se(this, "emit", (d, ...p) => {
        var b;
        (b = this.listeners[Ne(d)]) == null || b.forEach((T) => T(...p));
      });
      se(this, "registerEventListenersFromProps", (d) => {
        const p = [];
        return Object.keys(d).filter((b) => b.startsWith("on")).forEach((b) => {
          const T = Ne(b).replace(/^on-/, "");
          this.on(T, d[b]), p.push(() => this.off(T, d[b]));
        }), () => p.forEach((b) => b());
      });
      se(this, "reload", (d = {}) => {
        var b;
        let p = Object.keys(this.response.props);
        d.only && (p = Qt(p, d.only)), d.except && (p = un(p, d.except)), (b = this.response) != null && b.url && Ve.get(this.response.url, {
          headers: {
            Accept: "text/html, application/xhtml+xml",
            "X-Inertia": !0,
            "X-Inertia-Partial-Component": this.response.component,
            "X-Inertia-Version": this.response.version,
            "X-Inertia-Partial-Data": p.join(","),
            "X-InertiaUI-Modal": !0,
            "X-InertiaUI-Modal-Use-Router": 0,
            "X-InertiaUI-Modal-Base-Url": _e
          }
        }).then((T) => {
          this.updateProps(T.data.props);
        });
      });
      se(this, "updateProps", (d) => {
        Object.assign(this.props, d), l((p) => p);
      });
      this.id = s.generateId(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = d, this.props = p.props, this.response = p, this.config = b, this.onCloseCallback = T, this.afterLeaveCallback = O, this.index = -1, this.getParentModal = () => null, this.getChildModal = () => null, this.onTopOfStack = !0;
    }
    static generateId() {
      return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `inertiaui_modal_${crypto.randomUUID()}` : `inertiaui_modal_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
    }
  }
  const m = (f, d = {}, p = null, b = null) => tr(f.component).then((T) => o(T, f, d, p, b)), o = (f, d, p, b, T) => {
    const O = new s(f, d, p, b, T);
    return O.index = e.length, l((A) => [...A, O]), O.show(), O;
  };
  function g(f, d, p, b) {
    if (!n[f])
      throw new Error(`The local modal "${f}" has not been registered.`);
    const T = o(null, {}, d, p, b);
    return T.name = f, n[f].callback(T), T;
  }
  const v = (f, d = {}) => E(
    f,
    d.method ?? "get",
    d.data ?? {},
    d.headers ?? {},
    d.config ?? {},
    d.onClose,
    d.onAfterLeave,
    d.queryStringArrayFormat ?? "brackets",
    d.navigate ?? Et("navigate")
  ).then((p) => {
    const b = d.listeners ?? {};
    return Object.keys(b).forEach((T) => {
      const O = Ne(T);
      p.on(O, b[T]);
    }), p;
  }), E = (f, d, p = {}, b = {}, T = {}, O = null, A = null, le = "brackets", K = !1) => new Promise((J, Q) => {
    if (f.startsWith("#")) {
      J(g(f.substring(1), T, O, A));
      return;
    }
    const [H, q] = an(d, f || "", p, le);
    let N = K && e.length === 0;
    if (e.length === 0 && (_e = typeof window < "u" ? window.location.href : ""), b = {
      ...b,
      Accept: "text/html, application/xhtml+xml",
      "X-Requested-With": "XMLHttpRequest",
      "X-Inertia": !0,
      "X-Inertia-Version": er,
      "X-InertiaUI-Modal": !0,
      "X-InertiaUI-Modal-Use-Router": N ? 1 : 0,
      "X-InertiaUI-Modal-Base-Url": _e
    }, N)
      return ht = null, Ae.visit(H, {
        method: d,
        data: q,
        headers: b,
        preserveScroll: !0,
        preserveState: !0,
        onError: Q,
        onFinish: () => {
          dn(() => ht).then((u) => {
            const c = u.onCloseCallback, y = u.afterLeaveCallback;
            u.update(
              T,
              () => {
                O == null || O(), c == null || c();
              },
              () => {
                A == null || A(), y == null || y();
              }
            ), J(u);
          });
        }
      });
    Ve({
      url: H,
      method: d,
      data: q,
      headers: b
    }).then((u) => J(m(u.data, T, O, A))).catch((u) => {
      Q(u);
    });
  }), w = {
    stack: e,
    localModals: n,
    push: o,
    pushFromResponseData: m,
    closeAll: () => {
      mt.reverse().forEach((f) => f.close());
    },
    reset: () => l(() => []),
    visit: E,
    visitModal: v,
    registerLocalModal: (f, d) => {
      i((p) => ({
        ...p,
        [f]: { name: f, callback: d }
      }));
    },
    removeLocalModal: (f) => {
      i((d) => {
        const p = { ...d };
        return delete p[f], p;
      });
    }
  };
  return /* @__PURE__ */ F.jsx(Ze.Provider, { value: w, children: t });
}, Qe = () => {
  const t = Oe(Ze);
  if (t === null)
    throw new Error("useModalStack must be used within a ModalStackProvider");
  return t;
}, Vt = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], vn = (t) => {
  t.initialPage && (er = t.initialPage.version), t.resolveComponent && (tr = t.resolveComponent);
}, Pa = (t, e) => {
  vn(e);
  const r = ({ Component: n, props: i, key: l }) => {
    const s = () => {
      const m = Ke(n, { key: l, ...i });
      return typeof n.layout == "function" ? n.layout(m) : Array.isArray(n.layout) ? n.layout.concat(m).reverse().reduce((g, v) => Ke(v, i, g)) : m;
    };
    return /* @__PURE__ */ F.jsxs(F.Fragment, { children: [
      s(),
      /* @__PURE__ */ F.jsx(pn, {})
    ] });
  };
  return /* @__PURE__ */ F.jsx(fn, { children: /* @__PURE__ */ F.jsx(t, { ...e, children: r }) });
}, pn = ({ children: t }) => {
  var m;
  const e = Oe(Ze);
  let r = !1, n = !1;
  G(() => Ae.on("start", () => r = !0), []), G(() => Ae.on("finish", () => r = !1), []), G(
    () => Ae.on("navigate", function(o) {
      const g = o.detail.page.props._inertiaui_modal;
      if (!g) {
        n && e.closeAll();
        return;
      }
      n = g, _e = g.baseUrl, e.pushFromResponseData(g, {}, () => {
        if (!g.baseUrl) {
          console.error("No base url in modal response data so cannot navigate back");
          return;
        }
        !r && window.location.href !== g.baseUrl && Ae.visit(g.baseUrl, {
          preserveScroll: !0,
          preserveState: !0
        });
      }).then((v) => {
        ht = v;
      });
    }),
    []
  );
  const i = (o) => (mt.length && (o.headers["X-InertiaUI-Modal-Base-Url"] = _e), o);
  G(() => (Ve.interceptors.request.use(i), () => Ve.interceptors.request.eject(i)), []);
  const l = nn(), s = Y();
  return G(() => {
    var v, E;
    const o = (v = l.props) == null ? void 0 : v._inertiaui_modal, g = s.current;
    s.current = o, o && g && o.component === g.component && o.url === g.url && ((E = e.stack[0]) == null || E.updateProps(o.props ?? {}));
  }, [(m = l.props) == null ? void 0 : m._inertiaui_modal]), /* @__PURE__ */ F.jsxs(F.Fragment, { children: [
    t,
    e.stack.length > 0 && /* @__PURE__ */ F.jsx(nr, { index: 0 })
  ] });
}, Tt = X.createContext(null);
Tt.displayName = "ModalIndexContext";
const rr = () => {
  const t = X.useContext(Tt);
  if (t === void 0)
    throw new Error("useModalIndex must be used within a ModalIndexProvider");
  return t;
}, nr = ({ index: t }) => {
  const { stack: e } = Qe(), r = ve(() => e[t], [e, t]);
  return (r == null ? void 0 : r.component) && /* @__PURE__ */ F.jsx(Tt.Provider, { value: t, children: /* @__PURE__ */ F.jsx(
    r.component,
    {
      ...r.props,
      onModalEvent: (...n) => r.emit(...n)
    }
  ) });
}, ar = xt(({ name: t, children: e, ...r }, n) => {
  const i = rr(), { stack: l, registerLocalModal: s, removeLocalModal: m } = Qe(), [o, g] = re(null), v = ve(() => t ? o : l[i], [t, o, i, l]), E = ve(() => {
    var f;
    return (f = l.find((d) => d.shouldRender && d.index > (v == null ? void 0 : v.index))) == null ? void 0 : f.index;
  }, [i, l]), R = ve(() => (v == null ? void 0 : v.config.slideover) ?? r.slideover ?? Et("type") === "slideover", [r.slideover]), S = ve(
    () => ({
      slideover: R,
      closeButton: r.closeButton ?? Re(R, "closeButton"),
      closeExplicitly: r.closeExplicitly ?? Re(R, "closeExplicitly"),
      maxWidth: r.maxWidth ?? Re(R, "maxWidth"),
      paddingClasses: r.paddingClasses ?? Re(R, "paddingClasses"),
      panelClasses: r.panelClasses ?? Re(R, "panelClasses"),
      position: r.position ?? Re(R, "position"),
      ...v == null ? void 0 : v.config
    }),
    [r, v == null ? void 0 : v.config]
  );
  G(() => {
    if (t) {
      let f = null;
      return s(t, (d) => {
        f = d.registerEventListenersFromProps(r), g(d);
      }), () => {
        f == null || f(), f = null, m(t);
      };
    }
    return v.registerEventListenersFromProps(r);
  }, [t]);
  const w = Y(v);
  return G(() => {
    w.current = v;
  }, [v]), Zt(
    n,
    () => ({
      afterLeave: () => {
        var f;
        return (f = w.current) == null ? void 0 : f.afterLeave();
      },
      close: () => {
        var f;
        return (f = w.current) == null ? void 0 : f.close();
      },
      emit: (...f) => {
        var d;
        return (d = w.current) == null ? void 0 : d.emit(...f);
      },
      getChildModal: () => {
        var f;
        return (f = w.current) == null ? void 0 : f.getChildModal();
      },
      getParentModal: () => {
        var f;
        return (f = w.current) == null ? void 0 : f.getParentModal();
      },
      reload: (...f) => {
        var d;
        return (d = w.current) == null ? void 0 : d.reload(...f);
      },
      setOpen: () => {
        var f;
        return (f = w.current) == null ? void 0 : f.setOpen();
      },
      get id() {
        var f;
        return (f = w.current) == null ? void 0 : f.id;
      },
      get index() {
        var f;
        return (f = w.current) == null ? void 0 : f.index;
      },
      get isOpen() {
        var f;
        return (f = w.current) == null ? void 0 : f.isOpen;
      },
      get config() {
        var f;
        return (f = w.current) == null ? void 0 : f.config;
      },
      get modalContext() {
        return w.current;
      },
      get onTopOfStack() {
        var f;
        return (f = w.current) == null ? void 0 : f.onTopOfStack;
      },
      get shouldRender() {
        var f;
        return (f = w.current) == null ? void 0 : f.shouldRender;
      }
    }),
    [v]
  ), (v == null ? void 0 : v.shouldRender) && /* @__PURE__ */ F.jsxs(F.Fragment, { children: [
    typeof e == "function" ? e({
      afterLeave: v.afterLeave,
      close: v.close,
      config: S,
      emit: v.emit,
      getChildModal: v.getChildModal,
      getParentModal: v.getParentModal,
      id: v.id,
      index: v.index,
      isOpen: v.isOpen,
      modalContext: v,
      onTopOfStack: v.onTopOfStack,
      reload: v.reload,
      setOpen: v.setOpen,
      shouldRender: v.shouldRender
    }) : e,
    E && /* @__PURE__ */ F.jsx(nr, { index: E })
  ] });
});
ar.displayName = "HeadlessModal";
function ir(t) {
  var e, r, n = "";
  if (typeof t == "string" || typeof t == "number") n += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var i = t.length;
    for (e = 0; e < i; e++) t[e] && (r = ir(t[e])) && (n && (n += " "), n += r);
  } else for (r in t) t[r] && (n && (n += " "), n += r);
  return n;
}
function He() {
  for (var t, e, r = 0, n = "", i = arguments.length; r < i; r++) (t = arguments[r]) && (e = ir(t)) && (n && (n += " "), n += e);
  return n;
}
var hn = Object.defineProperty, mn = (t, e, r) => e in t ? hn(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, dt = (t, e, r) => (mn(t, typeof e != "symbol" ? e + "" : e, r), r);
let bn = class {
  constructor() {
    dt(this, "current", this.detect()), dt(this, "handoffState", "pending"), dt(this, "currentId", 0);
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
}, Be = new bn();
function gn(t) {
  typeof queueMicrotask == "function" ? queueMicrotask(t) : Promise.resolve().then(t).catch((e) => setTimeout(() => {
    throw e;
  }));
}
function et() {
  let t = [], e = { addEventListener(r, n, i, l) {
    return r.addEventListener(n, i, l), e.add(() => r.removeEventListener(n, i, l));
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
    return gn(() => {
      n.current && r[0]();
    }), e.add(() => {
      n.current = !1;
    });
  }, style(r, n, i) {
    let l = r.style.getPropertyValue(n);
    return Object.assign(r.style, { [n]: i }), this.add(() => {
      Object.assign(r.style, { [n]: l });
    });
  }, group(r) {
    let n = et();
    return r(n), this.add(() => n.dispose());
  }, add(r) {
    return t.includes(r) || t.push(r), () => {
      let n = t.indexOf(r);
      if (n >= 0) for (let i of t.splice(n, 1)) i();
    };
  }, dispose() {
    for (let r of t.splice(0)) r();
  } };
  return e;
}
function sr() {
  let [t] = re(et);
  return G(() => () => t.dispose(), [t]), t;
}
let he = (t, e) => {
  Be.isServer ? G(t, e) : en(t, e);
};
function lr(t) {
  let e = Y(t);
  return he(() => {
    e.current = t;
  }, [t]), e;
}
let de = function(t) {
  let e = lr(t);
  return X.useCallback((...r) => e.current(...r), [e]);
};
function bt(...t) {
  return Array.from(new Set(t.flatMap((e) => typeof e == "string" ? e.split(" ") : []))).filter(Boolean).join(" ");
}
function tt(t, e, ...r) {
  if (t in e) {
    let i = e[t];
    return typeof i == "function" ? i(...r) : i;
  }
  let n = new Error(`Tried to handle "${t}" but there is no handler defined. Only defined handlers are: ${Object.keys(e).map((i) => `"${i}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(n, tt), n;
}
var or = ((t) => (t[t.None = 0] = "None", t[t.RenderStrategy = 1] = "RenderStrategy", t[t.Static = 2] = "Static", t))(or || {}), pe = ((t) => (t[t.Unmount = 0] = "Unmount", t[t.Hidden = 1] = "Hidden", t))(pe || {});
function ur() {
  let t = wn();
  return ue((e) => yn({ mergeRefs: t, ...e }), [t]);
}
function yn({ ourProps: t, theirProps: e, slot: r, defaultTag: n, features: i, visible: l = !0, name: s, mergeRefs: m }) {
  m = m ?? xn;
  let o = cr(e, t);
  if (l) return We(o, r, n, s, m);
  let g = i ?? 0;
  if (g & 2) {
    let { static: v = !1, ...E } = o;
    if (v) return We(E, r, n, s, m);
  }
  if (g & 1) {
    let { unmount: v = !0, ...E } = o;
    return tt(v ? 0 : 1, { 0() {
      return null;
    }, 1() {
      return We({ ...E, hidden: !0, style: { display: "none" } }, r, n, s, m);
    } });
  }
  return We(o, r, n, s, m);
}
function We(t, e = {}, r, n, i) {
  let { as: l = r, children: s, refName: m = "ref", ...o } = ft(t, ["unmount", "static"]), g = t.ref !== void 0 ? { [m]: t.ref } : {}, v = typeof s == "function" ? s(e) : s;
  "className" in o && o.className && typeof o.className == "function" && (o.className = o.className(e)), o["aria-labelledby"] && o["aria-labelledby"] === o.id && (o["aria-labelledby"] = void 0);
  let E = {};
  if (e) {
    let R = !1, S = [];
    for (let [w, f] of Object.entries(e)) typeof f == "boolean" && (R = !0), f === !0 && S.push(w.replace(/([A-Z])/g, (d) => `-${d.toLowerCase()}`));
    if (R) {
      E["data-headlessui-state"] = S.join(" ");
      for (let w of S) E[`data-${w}`] = "";
    }
  }
  if (l === we && (Object.keys(be(o)).length > 0 || Object.keys(be(E)).length > 0)) if (!tn(v) || Array.isArray(v) && v.length > 1) {
    if (Object.keys(be(o)).length > 0) throw new Error(['Passing props on "Fragment"!', "", `The current component <${n} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(be(o)).concat(Object.keys(be(E))).map((R) => `  - ${R}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((R) => `  - ${R}`).join(`
`)].join(`
`));
  } else {
    let R = v.props, S = R == null ? void 0 : R.className, w = typeof S == "function" ? (...p) => bt(S(...p), o.className) : bt(S, o.className), f = w ? { className: w } : {}, d = cr(v.props, be(ft(o, ["ref"])));
    for (let p in E) p in d && delete E[p];
    return rn(v, Object.assign({}, d, E, g, { ref: i(En(v), g.ref) }, f));
  }
  return Ke(l, Object.assign({}, ft(o, ["ref"]), l !== we && g, l !== we && E), v);
}
function wn() {
  let t = Y([]), e = ue((r) => {
    for (let n of t.current) n != null && (typeof n == "function" ? n(r) : n.current = r);
  }, []);
  return (...r) => {
    if (!r.every((n) => n == null)) return t.current = r, e;
  };
}
function xn(...t) {
  return t.every((e) => e == null) ? void 0 : (e) => {
    for (let r of t) r != null && (typeof r == "function" ? r(e) : r.current = e);
  };
}
function cr(...t) {
  if (t.length === 0) return {};
  if (t.length === 1) return t[0];
  let e = {}, r = {};
  for (let n of t) for (let i in n) i.startsWith("on") && typeof n[i] == "function" ? (r[i] != null || (r[i] = []), r[i].push(n[i])) : e[i] = n[i];
  if (e.disabled || e["aria-disabled"]) for (let n in r) /^(on(?:Click|Pointer|Mouse|Key)(?:Down|Up|Press)?)$/.test(n) && (r[n] = [(i) => {
    var l;
    return (l = i == null ? void 0 : i.preventDefault) == null ? void 0 : l.call(i);
  }]);
  for (let n in r) Object.assign(e, { [n](i, ...l) {
    let s = r[n];
    for (let m of s) {
      if ((i instanceof Event || (i == null ? void 0 : i.nativeEvent) instanceof Event) && i.defaultPrevented) return;
      m(i, ...l);
    }
  } });
  return e;
}
function Rt(t) {
  var e;
  return Object.assign(xt(t), { displayName: (e = t.displayName) != null ? e : t.name });
}
function be(t) {
  let e = Object.assign({}, t);
  for (let r in e) e[r] === void 0 && delete e[r];
  return e;
}
function ft(t, e = []) {
  let r = Object.assign({}, t);
  for (let n of e) n in r && delete r[n];
  return r;
}
function En(t) {
  return X.version.split(".")[0] >= "19" ? t.props.ref : t.ref;
}
let Tn = Symbol();
function dr(...t) {
  let e = Y(t);
  G(() => {
    e.current = t;
  }, [t]);
  let r = de((n) => {
    for (let i of e.current) i != null && (typeof i == "function" ? i(n) : i.current = n);
  });
  return t.every((n) => n == null || (n == null ? void 0 : n[Tn])) ? void 0 : r;
}
function Rn(t = 0) {
  let [e, r] = re(t), n = ue((o) => r(o), [e]), i = ue((o) => r((g) => g | o), [e]), l = ue((o) => (e & o) === o, [e]), s = ue((o) => r((g) => g & ~o), [r]), m = ue((o) => r((g) => g ^ o), [r]);
  return { flags: e, setFlag: n, addFlag: i, hasFlag: l, removeFlag: s, toggleFlag: m };
}
var Ht, Yt;
typeof process < "u" && typeof globalThis < "u" && typeof Element < "u" && ((Ht = process == null ? void 0 : process.env) == null ? void 0 : Ht.NODE_ENV) === "test" && typeof ((Yt = Element == null ? void 0 : Element.prototype) == null ? void 0 : Yt.getAnimations) > "u" && (Element.prototype.getAnimations = function() {
  return console.warn(["Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.", "Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.", "", "Example usage:", "```js", "import { mockAnimationsApi } from 'jsdom-testing-mocks'", "mockAnimationsApi()", "```"].join(`
`)), [];
});
var Sn = ((t) => (t[t.None = 0] = "None", t[t.Closed = 1] = "Closed", t[t.Enter = 2] = "Enter", t[t.Leave = 4] = "Leave", t))(Sn || {});
function On(t) {
  let e = {};
  for (let r in t) t[r] === !0 && (e[`data-${r}`] = "");
  return e;
}
function Cn(t, e, r, n) {
  let [i, l] = re(r), { hasFlag: s, addFlag: m, removeFlag: o } = Rn(t && i ? 3 : 0), g = Y(!1), v = Y(!1), E = sr();
  return he(() => {
    var R;
    if (t) {
      if (r && l(!0), !e) {
        r && m(3);
        return;
      }
      return (R = n == null ? void 0 : n.start) == null || R.call(n, r), Pn(e, { inFlight: g, prepare() {
        v.current ? v.current = !1 : v.current = g.current, g.current = !0, !v.current && (r ? (m(3), o(4)) : (m(4), o(2)));
      }, run() {
        v.current ? r ? (o(3), m(4)) : (o(4), m(3)) : r ? o(1) : m(1);
      }, done() {
        var S;
        v.current && typeof e.getAnimations == "function" && e.getAnimations().length > 0 || (g.current = !1, o(7), r || l(!1), (S = n == null ? void 0 : n.end) == null || S.call(n, r));
      } });
    }
  }, [t, r, e, E]), t ? [i, { closed: s(1), enter: s(2), leave: s(4), transition: s(2) || s(4) }] : [r, { closed: void 0, enter: void 0, leave: void 0, transition: void 0 }];
}
function Pn(t, { prepare: e, run: r, done: n, inFlight: i }) {
  let l = et();
  return kn(t, { prepare: e, inFlight: i }), l.nextFrame(() => {
    r(), l.requestAnimationFrame(() => {
      l.add(Fn(t, n));
    });
  }), l.dispose;
}
function Fn(t, e) {
  var r, n;
  let i = et();
  if (!t) return i.dispose;
  let l = !1;
  i.add(() => {
    l = !0;
  });
  let s = (n = (r = t.getAnimations) == null ? void 0 : r.call(t).filter((m) => m instanceof CSSTransition)) != null ? n : [];
  return s.length === 0 ? (e(), i.dispose) : (Promise.allSettled(s.map((m) => m.finished)).then(() => {
    l || e();
  }), i.dispose);
}
function kn(t, { inFlight: e, prepare: r }) {
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
var fr = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"], Ye = /* @__PURE__ */ fr.join(","), vr = typeof Element > "u", xe = vr ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, qe = !vr && Element.prototype.getRootNode ? function(t) {
  var e;
  return t == null || (e = t.getRootNode) === null || e === void 0 ? void 0 : e.call(t);
} : function(t) {
  return t == null ? void 0 : t.ownerDocument;
}, Xe = function t(e, r) {
  var n;
  r === void 0 && (r = !0);
  var i = e == null || (n = e.getAttribute) === null || n === void 0 ? void 0 : n.call(e, "inert"), l = i === "" || i === "true", s = l || r && e && t(e.parentNode);
  return s;
}, Nn = function(e) {
  var r, n = e == null || (r = e.getAttribute) === null || r === void 0 ? void 0 : r.call(e, "contenteditable");
  return n === "" || n === "true";
}, pr = function(e, r, n) {
  if (Xe(e))
    return [];
  var i = Array.prototype.slice.apply(e.querySelectorAll(Ye));
  return r && xe.call(e, Ye) && i.unshift(e), i = i.filter(n), i;
}, hr = function t(e, r, n) {
  for (var i = [], l = Array.from(e); l.length; ) {
    var s = l.shift();
    if (!Xe(s, !1))
      if (s.tagName === "SLOT") {
        var m = s.assignedElements(), o = m.length ? m : s.children, g = t(o, !0, n);
        n.flatten ? i.push.apply(i, g) : i.push({
          scopeParent: s,
          candidates: g
        });
      } else {
        var v = xe.call(s, Ye);
        v && n.filter(s) && (r || !e.includes(s)) && i.push(s);
        var E = s.shadowRoot || // check for an undisclosed shadow
        typeof n.getShadowRoot == "function" && n.getShadowRoot(s), R = !Xe(E, !1) && (!n.shadowRootFilter || n.shadowRootFilter(s));
        if (E && R) {
          var S = t(E === !0 ? s.children : E.children, !0, n);
          n.flatten ? i.push.apply(i, S) : i.push({
            scopeParent: s,
            candidates: S
          });
        } else
          l.unshift.apply(l, s.children);
      }
  }
  return i;
}, mr = function(e) {
  return !isNaN(parseInt(e.getAttribute("tabindex"), 10));
}, ge = function(e) {
  if (!e)
    throw new Error("No node provided");
  return e.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName) || Nn(e)) && !mr(e) ? 0 : e.tabIndex;
}, jn = function(e, r) {
  var n = ge(e);
  return n < 0 && r && !mr(e) ? 0 : n;
}, An = function(e, r) {
  return e.tabIndex === r.tabIndex ? e.documentOrder - r.documentOrder : e.tabIndex - r.tabIndex;
}, br = function(e) {
  return e.tagName === "INPUT";
}, In = function(e) {
  return br(e) && e.type === "hidden";
}, _n = function(e) {
  var r = e.tagName === "DETAILS" && Array.prototype.slice.apply(e.children).some(function(n) {
    return n.tagName === "SUMMARY";
  });
  return r;
}, Dn = function(e, r) {
  for (var n = 0; n < e.length; n++)
    if (e[n].checked && e[n].form === r)
      return e[n];
}, Mn = function(e) {
  if (!e.name)
    return !0;
  var r = e.form || qe(e), n = function(m) {
    return r.querySelectorAll('input[type="radio"][name="' + m + '"]');
  }, i;
  if (typeof window < "u" && typeof window.CSS < "u" && typeof window.CSS.escape == "function")
    i = n(window.CSS.escape(e.name));
  else
    try {
      i = n(e.name);
    } catch (s) {
      return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", s.message), !1;
    }
  var l = Dn(i, e.form);
  return !l || l === e;
}, Ln = function(e) {
  return br(e) && e.type === "radio";
}, $n = function(e) {
  return Ln(e) && !Mn(e);
}, Wn = function(e) {
  var r, n = e && qe(e), i = (r = n) === null || r === void 0 ? void 0 : r.host, l = !1;
  if (n && n !== e) {
    var s, m, o;
    for (l = !!((s = i) !== null && s !== void 0 && (m = s.ownerDocument) !== null && m !== void 0 && m.contains(i) || e != null && (o = e.ownerDocument) !== null && o !== void 0 && o.contains(e)); !l && i; ) {
      var g, v, E;
      n = qe(i), i = (g = n) === null || g === void 0 ? void 0 : g.host, l = !!((v = i) !== null && v !== void 0 && (E = v.ownerDocument) !== null && E !== void 0 && E.contains(i));
    }
  }
  return l;
}, qt = function(e) {
  var r = e.getBoundingClientRect(), n = r.width, i = r.height;
  return n === 0 && i === 0;
}, Un = function(e, r) {
  var n = r.displayCheck, i = r.getShadowRoot;
  if (getComputedStyle(e).visibility === "hidden")
    return !0;
  var l = xe.call(e, "details>summary:first-of-type"), s = l ? e.parentElement : e;
  if (xe.call(s, "details:not([open]) *"))
    return !0;
  if (!n || n === "full" || n === "legacy-full") {
    if (typeof i == "function") {
      for (var m = e; e; ) {
        var o = e.parentElement, g = qe(e);
        if (o && !o.shadowRoot && i(o) === !0)
          return qt(e);
        e.assignedSlot ? e = e.assignedSlot : !o && g !== e.ownerDocument ? e = g.host : e = o;
      }
      e = m;
    }
    if (Wn(e))
      return !e.getClientRects().length;
    if (n !== "legacy-full")
      return !0;
  } else if (n === "non-zero-area")
    return qt(e);
  return !1;
}, Bn = function(e) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))
    for (var r = e.parentElement; r; ) {
      if (r.tagName === "FIELDSET" && r.disabled) {
        for (var n = 0; n < r.children.length; n++) {
          var i = r.children.item(n);
          if (i.tagName === "LEGEND")
            return xe.call(r, "fieldset[disabled] *") ? !0 : !i.contains(e);
        }
        return !0;
      }
      r = r.parentElement;
    }
  return !1;
}, ze = function(e, r) {
  return !(r.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  Xe(r) || In(r) || Un(r, e) || // For a details element with a summary, the summary element gets the focus
  _n(r) || Bn(r));
}, gt = function(e, r) {
  return !($n(r) || ge(r) < 0 || !ze(e, r));
}, Kn = function(e) {
  var r = parseInt(e.getAttribute("tabindex"), 10);
  return !!(isNaN(r) || r >= 0);
}, Vn = function t(e) {
  var r = [], n = [];
  return e.forEach(function(i, l) {
    var s = !!i.scopeParent, m = s ? i.scopeParent : i, o = jn(m, s), g = s ? t(i.candidates) : m;
    o === 0 ? s ? r.push.apply(r, g) : r.push(m) : n.push({
      documentOrder: l,
      tabIndex: o,
      item: i,
      isScope: s,
      content: g
    });
  }), n.sort(An).reduce(function(i, l) {
    return l.isScope ? i.push.apply(i, l.content) : i.push(l.content), i;
  }, []).concat(r);
}, Hn = function(e, r) {
  r = r || {};
  var n;
  return r.getShadowRoot ? n = hr([e], r.includeContainer, {
    filter: gt.bind(null, r),
    flatten: !1,
    getShadowRoot: r.getShadowRoot,
    shadowRootFilter: Kn
  }) : n = pr(e, r.includeContainer, gt.bind(null, r)), Vn(n);
}, Yn = function(e, r) {
  r = r || {};
  var n;
  return r.getShadowRoot ? n = hr([e], r.includeContainer, {
    filter: ze.bind(null, r),
    flatten: !0,
    getShadowRoot: r.getShadowRoot
  }) : n = pr(e, r.includeContainer, ze.bind(null, r)), n;
}, Se = function(e, r) {
  if (r = r || {}, !e)
    throw new Error("No node provided");
  return xe.call(e, Ye) === !1 ? !1 : gt(r, e);
}, qn = /* @__PURE__ */ fr.concat("iframe").join(","), vt = function(e, r) {
  if (r = r || {}, !e)
    throw new Error("No node provided");
  return xe.call(e, qn) === !1 ? !1 : ze(r, e);
};
let St = Ge(null);
St.displayName = "OpenClosedContext";
var ye = ((t) => (t[t.Open = 1] = "Open", t[t.Closed = 2] = "Closed", t[t.Closing = 4] = "Closing", t[t.Opening = 8] = "Opening", t))(ye || {});
function gr() {
  return Oe(St);
}
function Xn({ value: t, children: e }) {
  return X.createElement(St.Provider, { value: t }, e);
}
function zn() {
  let t = typeof document > "u";
  return "useSyncExternalStore" in Ie ? ((e) => e.useSyncExternalStore)(Ie)(() => () => {
  }, () => !1, () => !t) : !1;
}
function yr() {
  let t = zn(), [e, r] = Ie.useState(Be.isHandoffComplete);
  return e && Be.isHandoffComplete === !1 && r(!1), Ie.useEffect(() => {
    e !== !0 && r(!0);
  }, [e]), Ie.useEffect(() => Be.handoff(), []), t ? !1 : e;
}
function Gn() {
  let t = Y(!1);
  return he(() => (t.current = !0, () => {
    t.current = !1;
  }), []), t;
}
function wr(t) {
  var e;
  return !!(t.enter || t.enterFrom || t.enterTo || t.leave || t.leaveFrom || t.leaveTo) || ((e = t.as) != null ? e : Er) !== we || X.Children.count(t.children) === 1;
}
let rt = Ge(null);
rt.displayName = "TransitionContext";
var Jn = ((t) => (t.Visible = "visible", t.Hidden = "hidden", t))(Jn || {});
function Zn() {
  let t = Oe(rt);
  if (t === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return t;
}
function Qn() {
  let t = Oe(nt);
  if (t === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return t;
}
let nt = Ge(null);
nt.displayName = "NestingContext";
function at(t) {
  return "children" in t ? at(t.children) : t.current.filter(({ el: e }) => e.current !== null).filter(({ state: e }) => e === "visible").length > 0;
}
function xr(t, e) {
  let r = lr(t), n = Y([]), i = Gn(), l = sr(), s = de((S, w = pe.Hidden) => {
    let f = n.current.findIndex(({ el: d }) => d === S);
    f !== -1 && (tt(w, { [pe.Unmount]() {
      n.current.splice(f, 1);
    }, [pe.Hidden]() {
      n.current[f].state = "hidden";
    } }), l.microTask(() => {
      var d;
      !at(n) && i.current && ((d = r.current) == null || d.call(r));
    }));
  }), m = de((S) => {
    let w = n.current.find(({ el: f }) => f === S);
    return w ? w.state !== "visible" && (w.state = "visible") : n.current.push({ el: S, state: "visible" }), () => s(S, pe.Unmount);
  }), o = Y([]), g = Y(Promise.resolve()), v = Y({ enter: [], leave: [] }), E = de((S, w, f) => {
    o.current.splice(0), e && (e.chains.current[w] = e.chains.current[w].filter(([d]) => d !== S)), e == null || e.chains.current[w].push([S, new Promise((d) => {
      o.current.push(d);
    })]), e == null || e.chains.current[w].push([S, new Promise((d) => {
      Promise.all(v.current[w].map(([p, b]) => b)).then(() => d());
    })]), w === "enter" ? g.current = g.current.then(() => e == null ? void 0 : e.wait.current).then(() => f(w)) : f(w);
  }), R = de((S, w, f) => {
    Promise.all(v.current[w].splice(0).map(([d, p]) => p)).then(() => {
      var d;
      (d = o.current.shift()) == null || d();
    }).then(() => f(w));
  });
  return ve(() => ({ children: n, register: m, unregister: s, onStart: E, onStop: R, wait: g, chains: v }), [m, s, n, E, R, v, g]);
}
let Er = we, Tr = or.RenderStrategy;
function ea(t, e) {
  var r, n;
  let { transition: i = !0, beforeEnter: l, afterEnter: s, beforeLeave: m, afterLeave: o, enter: g, enterFrom: v, enterTo: E, entered: R, leave: S, leaveFrom: w, leaveTo: f, ...d } = t, [p, b] = re(null), T = Y(null), O = wr(t), A = dr(...O ? [T, e, b] : e === null ? [] : [e]), le = (r = d.unmount) == null || r ? pe.Unmount : pe.Hidden, { show: K, appear: J, initial: Q } = Zn(), [H, q] = re(K ? "visible" : "hidden"), N = Qn(), { register: u, unregister: c } = N;
  he(() => u(T), [u, T]), he(() => {
    if (le === pe.Hidden && T.current) {
      if (K && H !== "visible") {
        q("visible");
        return;
      }
      return tt(H, { hidden: () => c(T), visible: () => u(T) });
    }
  }, [H, T, u, c, K, le]);
  let y = yr();
  he(() => {
    if (O && y && H === "visible" && T.current === null) throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
  }, [T, H, y, O]);
  let I = Q && !J, _ = J && K && Q, M = Y(!1), P = xr(() => {
    M.current || (q("hidden"), c(T));
  }, N), $ = de((oe) => {
    M.current = !0;
    let te = oe ? "enter" : "leave";
    P.onStart(T, te, (ce) => {
      ce === "enter" ? l == null || l() : ce === "leave" && (m == null || m());
    });
  }), W = de((oe) => {
    let te = oe ? "enter" : "leave";
    M.current = !1, P.onStop(T, te, (ce) => {
      ce === "enter" ? s == null || s() : ce === "leave" && (o == null || o());
    }), te === "leave" && !at(P) && (q("hidden"), c(T));
  });
  G(() => {
    O && i || ($(K), W(K));
  }, [K, O, i]);
  let ne = !(!i || !O || !y || I), [, U] = Cn(ne, p, K, { start: $, end: W }), ae = be({ ref: A, className: ((n = bt(d.className, _ && g, _ && v, U.enter && g, U.enter && U.closed && v, U.enter && !U.closed && E, U.leave && S, U.leave && !U.closed && w, U.leave && U.closed && f, !U.transition && K && R)) == null ? void 0 : n.trim()) || void 0, ...On(U) }), ee = 0;
  H === "visible" && (ee |= ye.Open), H === "hidden" && (ee |= ye.Closed), U.enter && (ee |= ye.Opening), U.leave && (ee |= ye.Closing);
  let fe = ur();
  return X.createElement(nt.Provider, { value: P }, X.createElement(Xn, { value: ee }, fe({ ourProps: ae, theirProps: d, defaultTag: Er, features: Tr, visible: H === "visible", name: "Transition.Child" })));
}
function ta(t, e) {
  let { show: r, appear: n = !1, unmount: i = !0, ...l } = t, s = Y(null), m = wr(t), o = dr(...m ? [s, e] : e === null ? [] : [e]);
  yr();
  let g = gr();
  if (r === void 0 && g !== null && (r = (g & ye.Open) === ye.Open), r === void 0) throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
  let [v, E] = re(r ? "visible" : "hidden"), R = xr(() => {
    r || E("hidden");
  }), [S, w] = re(!0), f = Y([r]);
  he(() => {
    S !== !1 && f.current[f.current.length - 1] !== r && (f.current.push(r), w(!1));
  }, [f, r]);
  let d = ve(() => ({ show: r, appear: n, initial: S }), [r, n, S]);
  he(() => {
    r ? E("visible") : !at(R) && s.current !== null && E("hidden");
  }, [r, R]);
  let p = { unmount: i }, b = de(() => {
    var A;
    S && w(!1), (A = t.beforeEnter) == null || A.call(t);
  }), T = de(() => {
    var A;
    S && w(!1), (A = t.beforeLeave) == null || A.call(t);
  }), O = ur();
  return X.createElement(nt.Provider, { value: R }, X.createElement(rt.Provider, { value: d }, O({ ourProps: { ...p, as: we, children: X.createElement(Rr, { ref: o, ...p, ...l, beforeEnter: b, beforeLeave: T }) }, theirProps: {}, defaultTag: we, features: Tr, visible: v === "visible", name: "Transition" })));
}
function ra(t, e) {
  let r = Oe(rt) !== null, n = gr() !== null;
  return X.createElement(X.Fragment, null, !r && n ? X.createElement(yt, { ref: e, ...t }) : X.createElement(Rr, { ref: e, ...t }));
}
let yt = Rt(ta), Rr = Rt(ea), it = Rt(ra), na = Object.assign(yt, { Child: it, Root: yt });
function Sr({ onClick: t }) {
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
function wt(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
  return n;
}
function aa(t) {
  if (Array.isArray(t)) return wt(t);
}
function ia(t, e, r) {
  return (e = ca(e)) in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function sa(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t);
}
function la() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Xt(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function zt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Xt(Object(r), !0).forEach(function(n) {
      ia(t, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Xt(Object(r)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t;
}
function oa(t) {
  return aa(t) || sa(t) || da(t) || la();
}
function ua(t, e) {
  if (typeof t != "object" || !t) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
function ca(t) {
  var e = ua(t, "string");
  return typeof e == "symbol" ? e : e + "";
}
function da(t, e) {
  if (t) {
    if (typeof t == "string") return wt(t, e);
    var r = {}.toString.call(t).slice(8, -1);
    return r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set" ? Array.from(t) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? wt(t, e) : void 0;
  }
}
var Gt = {
  activateTrap: function(e, r) {
    if (e.length > 0) {
      var n = e[e.length - 1];
      n !== r && n.pause();
    }
    var i = e.indexOf(r);
    i === -1 || e.splice(i, 1), e.push(r);
  },
  deactivateTrap: function(e, r) {
    var n = e.indexOf(r);
    n !== -1 && e.splice(n, 1), e.length > 0 && e[e.length - 1].unpause();
  }
}, fa = function(e) {
  return e.tagName && e.tagName.toLowerCase() === "input" && typeof e.select == "function";
}, va = function(e) {
  return (e == null ? void 0 : e.key) === "Escape" || (e == null ? void 0 : e.key) === "Esc" || (e == null ? void 0 : e.keyCode) === 27;
}, De = function(e) {
  return (e == null ? void 0 : e.key) === "Tab" || (e == null ? void 0 : e.keyCode) === 9;
}, pa = function(e) {
  return De(e) && !e.shiftKey;
}, ha = function(e) {
  return De(e) && e.shiftKey;
}, Jt = function(e) {
  return setTimeout(e, 0);
}, je = function(e) {
  for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++)
    n[i - 1] = arguments[i];
  return typeof e == "function" ? e.apply(void 0, n) : e;
}, Ue = function(e) {
  return e.target.shadowRoot && typeof e.composedPath == "function" ? e.composedPath()[0] : e.target;
}, ma = [], ba = function(e, r) {
  var n = (r == null ? void 0 : r.document) || document, i = (r == null ? void 0 : r.trapStack) || ma, l = zt({
    returnFocusOnDeactivate: !0,
    escapeDeactivates: !0,
    delayInitialFocus: !0,
    isKeyForward: pa,
    isKeyBackward: ha
  }, r), s = {
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
  }, m, o = function(u, c, y) {
    return u && u[c] !== void 0 ? u[c] : l[y || c];
  }, g = function(u, c) {
    var y = typeof (c == null ? void 0 : c.composedPath) == "function" ? c.composedPath() : void 0;
    return s.containerGroups.findIndex(function(I) {
      var _ = I.container, M = I.tabbableNodes;
      return _.contains(u) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (y == null ? void 0 : y.includes(_)) || M.find(function(P) {
        return P === u;
      });
    });
  }, v = function(u) {
    var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, y = c.hasFallback, I = y === void 0 ? !1 : y, _ = c.params, M = _ === void 0 ? [] : _, P = l[u];
    if (typeof P == "function" && (P = P.apply(void 0, oa(M))), P === !0 && (P = void 0), !P) {
      if (P === void 0 || P === !1)
        return P;
      throw new Error("`".concat(u, "` was specified but was not a node, or did not return a node"));
    }
    var $ = P;
    if (typeof P == "string") {
      try {
        $ = n.querySelector(P);
      } catch (W) {
        throw new Error("`".concat(u, '` appears to be an invalid selector; error="').concat(W.message, '"'));
      }
      if (!$ && !I)
        throw new Error("`".concat(u, "` as selector refers to no known node"));
    }
    return $;
  }, E = function() {
    var u = v("initialFocus", {
      hasFallback: !0
    });
    if (u === !1)
      return !1;
    if (u === void 0 || u && !vt(u, l.tabbableOptions))
      if (g(n.activeElement) >= 0)
        u = n.activeElement;
      else {
        var c = s.tabbableGroups[0], y = c && c.firstTabbableNode;
        u = y || v("fallbackFocus");
      }
    else u === null && (u = v("fallbackFocus"));
    if (!u)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return u;
  }, R = function() {
    if (s.containerGroups = s.containers.map(function(u) {
      var c = Hn(u, l.tabbableOptions), y = Yn(u, l.tabbableOptions), I = c.length > 0 ? c[0] : void 0, _ = c.length > 0 ? c[c.length - 1] : void 0, M = y.find(function(W) {
        return Se(W);
      }), P = y.slice().reverse().find(function(W) {
        return Se(W);
      }), $ = !!c.find(function(W) {
        return ge(W) > 0;
      });
      return {
        container: u,
        tabbableNodes: c,
        focusableNodes: y,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: $,
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
        firstDomTabbableNode: M,
        /** Last tabbable node in container, __DOM__ order; `undefined` if none. */
        lastDomTabbableNode: P,
        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function(ne) {
          var U = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, ae = c.indexOf(ne);
          return ae < 0 ? U ? y.slice(y.indexOf(ne) + 1).find(function(ee) {
            return Se(ee);
          }) : y.slice(0, y.indexOf(ne)).reverse().find(function(ee) {
            return Se(ee);
          }) : c[ae + (U ? 1 : -1)];
        }
      };
    }), s.tabbableGroups = s.containerGroups.filter(function(u) {
      return u.tabbableNodes.length > 0;
    }), s.tabbableGroups.length <= 0 && !v("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (s.containerGroups.find(function(u) {
      return u.posTabIndexesFound;
    }) && s.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, S = function(u) {
    var c = u.activeElement;
    if (c)
      return c.shadowRoot && c.shadowRoot.activeElement !== null ? S(c.shadowRoot) : c;
  }, w = function(u) {
    if (u !== !1 && u !== S(document)) {
      if (!u || !u.focus) {
        w(E());
        return;
      }
      u.focus({
        preventScroll: !!l.preventScroll
      }), s.mostRecentlyFocusedNode = u, fa(u) && u.select();
    }
  }, f = function(u) {
    var c = v("setReturnFocus", {
      params: [u]
    });
    return c || (c === !1 ? !1 : u);
  }, d = function(u) {
    var c = u.target, y = u.event, I = u.isBackward, _ = I === void 0 ? !1 : I;
    c = c || Ue(y), R();
    var M = null;
    if (s.tabbableGroups.length > 0) {
      var P = g(c, y), $ = P >= 0 ? s.containerGroups[P] : void 0;
      if (P < 0)
        _ ? M = s.tabbableGroups[s.tabbableGroups.length - 1].lastTabbableNode : M = s.tabbableGroups[0].firstTabbableNode;
      else if (_) {
        var W = s.tabbableGroups.findIndex(function(oe) {
          var te = oe.firstTabbableNode;
          return c === te;
        });
        if (W < 0 && ($.container === c || vt(c, l.tabbableOptions) && !Se(c, l.tabbableOptions) && !$.nextTabbableNode(c, !1)) && (W = P), W >= 0) {
          var ne = W === 0 ? s.tabbableGroups.length - 1 : W - 1, U = s.tabbableGroups[ne];
          M = ge(c) >= 0 ? U.lastTabbableNode : U.lastDomTabbableNode;
        } else De(y) || (M = $.nextTabbableNode(c, !1));
      } else {
        var ae = s.tabbableGroups.findIndex(function(oe) {
          var te = oe.lastTabbableNode;
          return c === te;
        });
        if (ae < 0 && ($.container === c || vt(c, l.tabbableOptions) && !Se(c, l.tabbableOptions) && !$.nextTabbableNode(c)) && (ae = P), ae >= 0) {
          var ee = ae === s.tabbableGroups.length - 1 ? 0 : ae + 1, fe = s.tabbableGroups[ee];
          M = ge(c) >= 0 ? fe.firstTabbableNode : fe.firstDomTabbableNode;
        } else De(y) || (M = $.nextTabbableNode(c));
      }
    } else
      M = v("fallbackFocus");
    return M;
  }, p = function(u) {
    var c = Ue(u);
    if (!(g(c, u) >= 0)) {
      if (je(l.clickOutsideDeactivates, u)) {
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
      je(l.allowOutsideClick, u) || u.preventDefault();
    }
  }, b = function(u) {
    var c = Ue(u), y = g(c, u) >= 0;
    if (y || c instanceof Document)
      y && (s.mostRecentlyFocusedNode = c);
    else {
      u.stopImmediatePropagation();
      var I, _ = !0;
      if (s.mostRecentlyFocusedNode)
        if (ge(s.mostRecentlyFocusedNode) > 0) {
          var M = g(s.mostRecentlyFocusedNode), P = s.containerGroups[M].tabbableNodes;
          if (P.length > 0) {
            var $ = P.findIndex(function(W) {
              return W === s.mostRecentlyFocusedNode;
            });
            $ >= 0 && (l.isKeyForward(s.recentNavEvent) ? $ + 1 < P.length && (I = P[$ + 1], _ = !1) : $ - 1 >= 0 && (I = P[$ - 1], _ = !1));
          }
        } else
          s.containerGroups.some(function(W) {
            return W.tabbableNodes.some(function(ne) {
              return ge(ne) > 0;
            });
          }) || (_ = !1);
      else
        _ = !1;
      _ && (I = d({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: s.mostRecentlyFocusedNode,
        isBackward: l.isKeyBackward(s.recentNavEvent)
      })), w(I || s.mostRecentlyFocusedNode || E());
    }
    s.recentNavEvent = void 0;
  }, T = function(u) {
    var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    s.recentNavEvent = u;
    var y = d({
      event: u,
      isBackward: c
    });
    y && (De(u) && u.preventDefault(), w(y));
  }, O = function(u) {
    (l.isKeyForward(u) || l.isKeyBackward(u)) && T(u, l.isKeyBackward(u));
  }, A = function(u) {
    va(u) && je(l.escapeDeactivates, u) !== !1 && (u.preventDefault(), m.deactivate());
  }, le = function(u) {
    var c = Ue(u);
    g(c, u) >= 0 || je(l.clickOutsideDeactivates, u) || je(l.allowOutsideClick, u) || (u.preventDefault(), u.stopImmediatePropagation());
  }, K = function() {
    if (s.active)
      return Gt.activateTrap(i, m), s.delayInitialFocusTimer = l.delayInitialFocus ? Jt(function() {
        w(E());
      }) : w(E()), n.addEventListener("focusin", b, !0), n.addEventListener("mousedown", p, {
        capture: !0,
        passive: !1
      }), n.addEventListener("touchstart", p, {
        capture: !0,
        passive: !1
      }), n.addEventListener("click", le, {
        capture: !0,
        passive: !1
      }), n.addEventListener("keydown", O, {
        capture: !0,
        passive: !1
      }), n.addEventListener("keydown", A), m;
  }, J = function() {
    if (s.active)
      return n.removeEventListener("focusin", b, !0), n.removeEventListener("mousedown", p, !0), n.removeEventListener("touchstart", p, !0), n.removeEventListener("click", le, !0), n.removeEventListener("keydown", O, !0), n.removeEventListener("keydown", A), m;
  }, Q = function(u) {
    var c = u.some(function(y) {
      var I = Array.from(y.removedNodes);
      return I.some(function(_) {
        return _ === s.mostRecentlyFocusedNode;
      });
    });
    c && w(E());
  }, H = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(Q) : void 0, q = function() {
    H && (H.disconnect(), s.active && !s.paused && s.containers.map(function(u) {
      H.observe(u, {
        subtree: !0,
        childList: !0
      });
    }));
  };
  return m = {
    get active() {
      return s.active;
    },
    get paused() {
      return s.paused;
    },
    activate: function(u) {
      if (s.active)
        return this;
      var c = o(u, "onActivate"), y = o(u, "onPostActivate"), I = o(u, "checkCanFocusTrap");
      I || R(), s.active = !0, s.paused = !1, s.nodeFocusedBeforeActivation = n.activeElement, c == null || c();
      var _ = function() {
        I && R(), K(), q(), y == null || y();
      };
      return I ? (I(s.containers.concat()).then(_, _), this) : (_(), this);
    },
    deactivate: function(u) {
      if (!s.active)
        return this;
      var c = zt({
        onDeactivate: l.onDeactivate,
        onPostDeactivate: l.onPostDeactivate,
        checkCanReturnFocus: l.checkCanReturnFocus
      }, u);
      clearTimeout(s.delayInitialFocusTimer), s.delayInitialFocusTimer = void 0, J(), s.active = !1, s.paused = !1, q(), Gt.deactivateTrap(i, m);
      var y = o(c, "onDeactivate"), I = o(c, "onPostDeactivate"), _ = o(c, "checkCanReturnFocus"), M = o(c, "returnFocus", "returnFocusOnDeactivate");
      y == null || y();
      var P = function() {
        Jt(function() {
          M && w(f(s.nodeFocusedBeforeActivation)), I == null || I();
        });
      };
      return M && _ ? (_(f(s.nodeFocusedBeforeActivation)).then(P, P), this) : (P(), this);
    },
    pause: function(u) {
      if (s.paused || !s.active)
        return this;
      var c = o(u, "onPause"), y = o(u, "onPostPause");
      return s.paused = !0, c == null || c(), J(), q(), y == null || y(), this;
    },
    unpause: function(u) {
      if (!s.paused || !s.active)
        return this;
      var c = o(u, "onUnpause"), y = o(u, "onPostUnpause");
      return s.paused = !1, c == null || c(), R(), K(), q(), y == null || y(), this;
    },
    updateContainerElements: function(u) {
      var c = [].concat(u).filter(Boolean);
      return s.containers = c.map(function(y) {
        return typeof y == "string" ? n.querySelector(y) : y;
      }), s.active && R(), q(), this;
    }
  }, m.updateContainerElements(e), m;
};
function Or(t, e) {
  const r = Y(null);
  return G(() => {
    if (!r.current)
      return;
    const n = ba(r.current, {
      clickOutsideDeactivates: !t,
      escapeDeactivates: !t,
      onDeactivate: () => e == null ? void 0 : e(),
      fallbackFocus: () => r.current
    });
    return n.activate(), () => n.deactivate();
  }, []), r;
}
const ga = ({ modalContext: t, config: e, children: r }) => {
  const n = Or(e == null ? void 0 : e.closeExplicitly, () => t.close());
  return /* @__PURE__ */ F.jsx("div", { className: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4", children: /* @__PURE__ */ F.jsx(
    "div",
    {
      className: He("im-modal-positioner flex min-h-full justify-center", {
        "items-start": e.position === "top",
        "items-center": e.position === "center",
        "items-end": e.position === "bottom"
      }),
      children: /* @__PURE__ */ F.jsx(
        it,
        {
          as: "div",
          ref: n,
          enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          enterTo: "opacity-100 translate-y-0 sm:scale-100",
          leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
          leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          afterLeave: t.afterLeave,
          className: He(
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
          children: /* @__PURE__ */ F.jsxs("div", { className: `im-modal-content relative ${e.paddingClasses} ${e.panelClasses}`, children: [
            e.closeButton && /* @__PURE__ */ F.jsx("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ F.jsx(Sr, { onClick: t.close }) }),
            typeof r == "function" ? r({ modalContext: t, config: e }) : r
          ] })
        }
      )
    }
  ) });
}, ya = ({ modalContext: t, config: e, children: r }) => {
  const n = Or(e == null ? void 0 : e.closeExplicitly, () => t.close());
  return /* @__PURE__ */ F.jsx("div", { className: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ F.jsx(
    "div",
    {
      className: He("im-slideover-positioner flex min-h-full items-center", {
        "justify-start": e.position === "left",
        "justify-end": e.position === "right"
      }),
      children: /* @__PURE__ */ F.jsx(
        it,
        {
          as: "div",
          ref: n,
          enterFrom: `opacity-0 ${e.position === "left" ? "-translate-x-full" : "translate-x-full"}`,
          enterTo: "opacity-100 translate-x-0",
          leaveFrom: "opacity-100 translate-x-0",
          leaveTo: `opacity-0 ${e.position === "left" ? "-translate-x-full" : "translate-x-full"}`,
          afterLeave: t.afterLeave,
          className: He(
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
          children: /* @__PURE__ */ F.jsxs("div", { className: `im-slideover-content relative ${e.paddingClasses} ${e.panelClasses}`, children: [
            e.closeButton && /* @__PURE__ */ F.jsx("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ F.jsx(Sr, { onClick: t.close }) }),
            typeof r == "function" ? r({ modalContext: t, config: e }) : r
          ] })
        }
      )
    }
  ) });
}, wa = xt(({ name: t, children: e, ...r }, n) => {
  const i = (s) => typeof e == "function" ? e(s) : e, l = Y(null);
  return G(() => {
    var s;
    if (((s = l == null ? void 0 : l.current) == null ? void 0 : s.index) === 0)
      return Kt.prepare(), () => Kt.cleanup();
  }, [l]), Zt(n, () => l.current, [l]), /* @__PURE__ */ F.jsx(
    ar,
    {
      ref: l,
      name: t,
      ...r,
      children: ({
        afterLeave: s,
        close: m,
        config: o,
        emit: g,
        getChildModal: v,
        getParentModal: E,
        id: R,
        index: S,
        isOpen: w,
        modalContext: f,
        onTopOfStack: d,
        reload: p,
        setOpen: b,
        shouldRender: T
      }) => /* @__PURE__ */ F.jsx(
        na,
        {
          appear: !0,
          show: w ?? !1,
          children: /* @__PURE__ */ F.jsxs(
            "div",
            {
              className: "im-dialog relative z-20",
              "data-inertiaui-modal-id": R,
              "data-inertiaui-modal-index": S,
              children: [
                S === 0 ? /* @__PURE__ */ F.jsx(
                  it,
                  {
                    enter: "transition transform ease-in-out duration-300",
                    enterFrom: "opacity-0",
                    enterTo: "opacity-100",
                    leave: "transition transform ease-in-out duration-300",
                    leaveFrom: "opacity-100",
                    leaveTo: "opacity-0",
                    children: d ? /* @__PURE__ */ F.jsx(
                      "div",
                      {
                        className: "im-backdrop fixed inset-0 z-30 bg-black/75",
                        "aria-hidden": "true"
                      }
                    ) : /* @__PURE__ */ F.jsx("div", {})
                  }
                ) : null,
                S > 0 && d ? /* @__PURE__ */ F.jsx("div", { className: "im-backdrop fixed inset-0 z-30 bg-black/75" }) : null,
                o.slideover ? /* @__PURE__ */ F.jsx(
                  ya,
                  {
                    modalContext: f,
                    config: o,
                    children: i({
                      afterLeave: s,
                      close: m,
                      config: o,
                      emit: g,
                      getChildModal: v,
                      getParentModal: E,
                      id: R,
                      index: S,
                      isOpen: w,
                      modalContext: f,
                      onTopOfStack: d,
                      reload: p,
                      setOpen: b,
                      shouldRender: T
                    })
                  }
                ) : /* @__PURE__ */ F.jsx(
                  ga,
                  {
                    modalContext: f,
                    config: o,
                    children: i({
                      afterLeave: s,
                      close: m,
                      config: o,
                      emit: g,
                      getChildModal: v,
                      getParentModal: E,
                      id: R,
                      index: S,
                      isOpen: w,
                      modalContext: f,
                      onTopOfStack: d,
                      reload: p,
                      setOpen: b,
                      shouldRender: T
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
wa.displayName = "Modal";
const ka = ({
  href: t,
  method: e = "get",
  data: r = {},
  as: n = "a",
  headers: i = {},
  queryStringArrayFormat: l = "brackets",
  onAfterLeave: s = null,
  onBlur: m = null,
  onClose: o = null,
  onError: g = null,
  onFocus: v = null,
  onStart: E = null,
  onSuccess: R = null,
  navigate: S = null,
  children: w,
  ...f
}) => {
  const [d, p] = re(!1), [b, T] = re(null), { stack: O, visit: A } = Qe(), le = ve(() => S ?? Et("navigate"), [S]), K = {}, J = {};
  Object.keys(f).forEach((c) => {
    Vt.includes(c) || (c.startsWith("on") && typeof f[c] == "function" ? c.toLowerCase() in window ? K[c] = f[c] : J[c] = f[c] : K[c] = f[c]);
  });
  const [Q, H] = re(!1);
  G(() => {
    b && (b.onTopOfStack && Q ? v == null || v() : !b.onTopOfStack && !Q && (m == null || m()), H(!b.onTopOfStack));
  }, [O]);
  const q = ue(() => {
    o == null || o();
  }, [o]), N = ue(() => {
    T(null), s == null || s();
  }, [s]), u = ue(
    (c) => {
      c == null || c.preventDefault(), !d && (t.startsWith("#") || (p(!0), E == null || E()), A(
        t,
        e,
        r,
        i,
        cn(Qt(f, Vt)),
        () => q(O.length),
        N,
        l,
        le
      ).then((y) => {
        T(y), y.registerEventListenersFromProps(J), R == null || R();
      }).catch((y) => {
        console.error(y), g == null || g(y);
      }).finally(() => p(!1)));
    },
    [t, e, r, i, l, f, q, N]
  );
  return /* @__PURE__ */ F.jsx(
    n,
    {
      ...K,
      href: t,
      onClick: u,
      children: typeof w == "function" ? w({ loading: d }) : w
    }
  );
};
function Na() {
  return Qe().stack[rr()] ?? null;
}
const ja = (t) => (e) => (e.default.layout = (r) => Ke(t, {}, r), e);
export {
  ar as HeadlessModal,
  wa as Modal,
  ka as ModalLink,
  pn as ModalRoot,
  fn as ModalStackProvider,
  Et as getConfig,
  vn as initFromPageProps,
  Ca as putConfig,
  Pa as renderApp,
  Oa as resetConfig,
  ja as setPageLayout,
  Na as useModal,
  rr as useModalIndex,
  Qe as useModalStack
};
