var Pn = Object.defineProperty;
var Rn = (e, t, r) => t in e ? Pn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var le = (e, t, r) => Rn(e, typeof t != "symbol" ? t + "" : t, r);
import * as qe from "react";
import O, { createContext as oe, useState as V, useEffect as L, useContext as Z, useRef as j, createElement as lt, useMemo as B, forwardRef as Dt, useImperativeHandle as yr, useLayoutEffect as Sn, useCallback as ae, Fragment as ue, isValidElement as Cn, cloneElement as $n, useId as Je, useSyncExternalStore as Fn, useReducer as kn, createRef as jn } from "react";
import ot from "axios";
import { router as Ye, usePage as _n } from "@inertiajs/react";
import { mergeDataIntoQueryString as Mn } from "@inertiajs/core";
import { createPortal as An } from "react-dom";
const We = {
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
class Ln {
  constructor() {
    this.config = {}, this.reset();
  }
  reset() {
    this.config = JSON.parse(JSON.stringify(We));
  }
  put(t, r) {
    if (typeof t == "object") {
      this.config = {
        type: t.type ?? We.type,
        navigate: t.navigate ?? We.navigate,
        modal: { ...We.modal, ...t.modal ?? {} },
        slideover: { ...We.slideover, ...t.slideover ?? {} }
      };
      return;
    }
    const n = t.split(".");
    let l = this.config;
    for (let a = 0; a < n.length - 1; a++)
      l = l[n[a]] = l[n[a]] || {};
    l[n[n.length - 1]] = r;
  }
  get(t) {
    if (typeof t > "u")
      return this.config;
    const r = t.split(".");
    let n = this.config;
    for (const l of r) {
      if (n[l] === void 0)
        return null;
      n = n[l];
    }
    return n;
  }
}
const ct = new Ln(), Ho = () => ct.reset(), Bo = (e, t) => ct.put(e, t), Wt = (e) => ct.get(e), Me = (e, t) => ct.get(e ? `slideover.${t}` : `modal.${t}`);
var Ft = { exports: {} }, Ue = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var sr;
function In() {
  if (sr) return Ue;
  sr = 1;
  var e = O, t = Symbol.for("react.element"), r = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, l = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, a = { key: !0, ref: !0, __self: !0, __source: !0 };
  function s(u, i, p) {
    var c, w = {}, x = null, y = null;
    p !== void 0 && (x = "" + p), i.key !== void 0 && (x = "" + i.key), i.ref !== void 0 && (y = i.ref);
    for (c in i) n.call(i, c) && !a.hasOwnProperty(c) && (w[c] = i[c]);
    if (u && u.defaultProps) for (c in i = u.defaultProps, i) w[c] === void 0 && (w[c] = i[c]);
    return { $$typeof: t, type: u, key: x, ref: y, props: w, _owner: l.current };
  }
  return Ue.Fragment = r, Ue.jsx = s, Ue.jsxs = s, Ue;
}
var He = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ur;
function Nn() {
  return ur || (ur = 1, process.env.NODE_ENV !== "production" && function() {
    var e = O, t = Symbol.for("react.element"), r = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), s = Symbol.for("react.provider"), u = Symbol.for("react.context"), i = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), c = Symbol.for("react.suspense_list"), w = Symbol.for("react.memo"), x = Symbol.for("react.lazy"), y = Symbol.for("react.offscreen"), g = Symbol.iterator, f = "@@iterator";
    function d(o) {
      if (o === null || typeof o != "object")
        return null;
      var v = g && o[g] || o[f];
      return typeof v == "function" ? v : null;
    }
    var m = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function h(o) {
      {
        for (var v = arguments.length, b = new Array(v > 1 ? v - 1 : 0), P = 1; P < v; P++)
          b[P - 1] = arguments[P];
        E("error", o, b);
      }
    }
    function E(o, v, b) {
      {
        var P = m.ReactDebugCurrentFrame, k = P.getStackAddendum();
        k !== "" && (v += "%s", b = b.concat([k]));
        var M = b.map(function(C) {
          return String(C);
        });
        M.unshift("Warning: " + v), Function.prototype.apply.call(console[o], console, M);
      }
    }
    var T = !1, F = !1, X = !1, U = !1, ee = !1, te;
    te = Symbol.for("react.module.reference");
    function H(o) {
      return !!(typeof o == "string" || typeof o == "function" || o === n || o === a || ee || o === l || o === p || o === c || U || o === y || T || F || X || typeof o == "object" && o !== null && (o.$$typeof === x || o.$$typeof === w || o.$$typeof === s || o.$$typeof === u || o.$$typeof === i || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      o.$$typeof === te || o.getModuleId !== void 0));
    }
    function q(o, v, b) {
      var P = o.displayName;
      if (P)
        return P;
      var k = v.displayName || v.name || "";
      return k !== "" ? b + "(" + k + ")" : b;
    }
    function G(o) {
      return o.displayName || "Context";
    }
    function _(o) {
      if (o == null)
        return null;
      if (typeof o.tag == "number" && h("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof o == "function")
        return o.displayName || o.name || null;
      if (typeof o == "string")
        return o;
      switch (o) {
        case n:
          return "Fragment";
        case r:
          return "Portal";
        case a:
          return "Profiler";
        case l:
          return "StrictMode";
        case p:
          return "Suspense";
        case c:
          return "SuspenseList";
      }
      if (typeof o == "object")
        switch (o.$$typeof) {
          case u:
            var v = o;
            return G(v) + ".Consumer";
          case s:
            var b = o;
            return G(b._context) + ".Provider";
          case i:
            return q(o, o.render, "ForwardRef");
          case w:
            var P = o.displayName || null;
            return P !== null ? P : _(o.type) || "Memo";
          case x: {
            var k = o, M = k._payload, C = k._init;
            try {
              return _(C(M));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var $ = Object.assign, I = 0, be, xe, ve, re, Ee, N, Te;
    function Y() {
    }
    Y.__reactDisabledLog = !0;
    function xt() {
      {
        if (I === 0) {
          be = console.log, xe = console.info, ve = console.warn, re = console.error, Ee = console.group, N = console.groupCollapsed, Te = console.groupEnd;
          var o = {
            configurable: !0,
            enumerable: !0,
            value: Y,
            writable: !0
          };
          Object.defineProperties(console, {
            info: o,
            log: o,
            warn: o,
            error: o,
            group: o,
            groupCollapsed: o,
            groupEnd: o
          });
        }
        I++;
      }
    }
    function Oe() {
      {
        if (I--, I === 0) {
          var o = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: $({}, o, {
              value: be
            }),
            info: $({}, o, {
              value: xe
            }),
            warn: $({}, o, {
              value: ve
            }),
            error: $({}, o, {
              value: re
            }),
            group: $({}, o, {
              value: Ee
            }),
            groupCollapsed: $({}, o, {
              value: N
            }),
            groupEnd: $({}, o, {
              value: Te
            })
          });
        }
        I < 0 && h("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ie = m.ReactCurrentDispatcher, Pe;
    function de(o, v, b) {
      {
        if (Pe === void 0)
          try {
            throw Error();
          } catch (k) {
            var P = k.stack.trim().match(/\n( *(at )?)/);
            Pe = P && P[1] || "";
          }
        return `
` + Pe + o;
      }
    }
    var fe = !1, et;
    {
      var Qr = typeof WeakMap == "function" ? WeakMap : Map;
      et = new Qr();
    }
    function Kt(o, v) {
      if (!o || fe)
        return "";
      {
        var b = et.get(o);
        if (b !== void 0)
          return b;
      }
      var P;
      fe = !0;
      var k = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var M;
      M = Ie.current, Ie.current = null, xt();
      try {
        if (v) {
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
            } catch (J) {
              P = J;
            }
            Reflect.construct(o, [], C);
          } else {
            try {
              C.call();
            } catch (J) {
              P = J;
            }
            o.call(C.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (J) {
            P = J;
          }
          o();
        }
      } catch (J) {
        if (J && P && typeof J.stack == "string") {
          for (var S = J.stack.split(`
`), K = P.stack.split(`
`), D = S.length - 1, W = K.length - 1; D >= 1 && W >= 0 && S[D] !== K[W]; )
            W--;
          for (; D >= 1 && W >= 0; D--, W--)
            if (S[D] !== K[W]) {
              if (D !== 1 || W !== 1)
                do
                  if (D--, W--, W < 0 || S[D] !== K[W]) {
                    var ne = `
` + S[D].replace(" at new ", " at ");
                    return o.displayName && ne.includes("<anonymous>") && (ne = ne.replace("<anonymous>", o.displayName)), typeof o == "function" && et.set(o, ne), ne;
                  }
                while (D >= 1 && W >= 0);
              break;
            }
        }
      } finally {
        fe = !1, Ie.current = M, Oe(), Error.prepareStackTrace = k;
      }
      var _e = o ? o.displayName || o.name : "", Re = _e ? de(_e) : "";
      return typeof o == "function" && et.set(o, Re), Re;
    }
    function en(o, v, b) {
      return Kt(o, !1);
    }
    function tn(o) {
      var v = o.prototype;
      return !!(v && v.isReactComponent);
    }
    function tt(o, v, b) {
      if (o == null)
        return "";
      if (typeof o == "function")
        return Kt(o, tn(o));
      if (typeof o == "string")
        return de(o);
      switch (o) {
        case p:
          return de("Suspense");
        case c:
          return de("SuspenseList");
      }
      if (typeof o == "object")
        switch (o.$$typeof) {
          case i:
            return en(o.render);
          case w:
            return tt(o.type, v, b);
          case x: {
            var P = o, k = P._payload, M = P._init;
            try {
              return tt(M(k), v, b);
            } catch {
            }
          }
        }
      return "";
    }
    var Ne = Object.prototype.hasOwnProperty, zt = {}, Gt = m.ReactDebugCurrentFrame;
    function rt(o) {
      if (o) {
        var v = o._owner, b = tt(o.type, o._source, v ? v.type : null);
        Gt.setExtraStackFrame(b);
      } else
        Gt.setExtraStackFrame(null);
    }
    function rn(o, v, b, P, k) {
      {
        var M = Function.call.bind(Ne);
        for (var C in o)
          if (M(o, C)) {
            var S = void 0;
            try {
              if (typeof o[C] != "function") {
                var K = Error((P || "React class") + ": " + b + " type `" + C + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof o[C] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw K.name = "Invariant Violation", K;
              }
              S = o[C](v, C, P, b, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (D) {
              S = D;
            }
            S && !(S instanceof Error) && (rt(k), h("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", P || "React class", b, C, typeof S), rt(null)), S instanceof Error && !(S.message in zt) && (zt[S.message] = !0, rt(k), h("Failed %s type: %s", b, S.message), rt(null));
          }
      }
    }
    var nn = Array.isArray;
    function Et(o) {
      return nn(o);
    }
    function ln(o) {
      {
        var v = typeof Symbol == "function" && Symbol.toStringTag, b = v && o[Symbol.toStringTag] || o.constructor.name || "Object";
        return b;
      }
    }
    function on(o) {
      try {
        return Jt(o), !1;
      } catch {
        return !0;
      }
    }
    function Jt(o) {
      return "" + o;
    }
    function Zt(o) {
      if (on(o))
        return h("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ln(o)), Jt(o);
    }
    var De = m.ReactCurrentOwner, an = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Qt, er, Tt;
    Tt = {};
    function sn(o) {
      if (Ne.call(o, "ref")) {
        var v = Object.getOwnPropertyDescriptor(o, "ref").get;
        if (v && v.isReactWarning)
          return !1;
      }
      return o.ref !== void 0;
    }
    function un(o) {
      if (Ne.call(o, "key")) {
        var v = Object.getOwnPropertyDescriptor(o, "key").get;
        if (v && v.isReactWarning)
          return !1;
      }
      return o.key !== void 0;
    }
    function cn(o, v) {
      if (typeof o.ref == "string" && De.current && v && De.current.stateNode !== v) {
        var b = _(De.current.type);
        Tt[b] || (h('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', _(De.current.type), o.ref), Tt[b] = !0);
      }
    }
    function dn(o, v) {
      {
        var b = function() {
          Qt || (Qt = !0, h("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", v));
        };
        b.isReactWarning = !0, Object.defineProperty(o, "key", {
          get: b,
          configurable: !0
        });
      }
    }
    function fn(o, v) {
      {
        var b = function() {
          er || (er = !0, h("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", v));
        };
        b.isReactWarning = !0, Object.defineProperty(o, "ref", {
          get: b,
          configurable: !0
        });
      }
    }
    var pn = function(o, v, b, P, k, M, C) {
      var S = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: o,
        key: v,
        ref: b,
        props: C,
        // Record the component responsible for creating this element.
        _owner: M
      };
      return S._store = {}, Object.defineProperty(S._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(S, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: P
      }), Object.defineProperty(S, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: k
      }), Object.freeze && (Object.freeze(S.props), Object.freeze(S)), S;
    };
    function mn(o, v, b, P, k) {
      {
        var M, C = {}, S = null, K = null;
        b !== void 0 && (Zt(b), S = "" + b), un(v) && (Zt(v.key), S = "" + v.key), sn(v) && (K = v.ref, cn(v, k));
        for (M in v)
          Ne.call(v, M) && !an.hasOwnProperty(M) && (C[M] = v[M]);
        if (o && o.defaultProps) {
          var D = o.defaultProps;
          for (M in D)
            C[M] === void 0 && (C[M] = D[M]);
        }
        if (S || K) {
          var W = typeof o == "function" ? o.displayName || o.name || "Unknown" : o;
          S && dn(C, W), K && fn(C, W);
        }
        return pn(o, S, K, k, P, De.current, C);
      }
    }
    var Ot = m.ReactCurrentOwner, tr = m.ReactDebugCurrentFrame;
    function je(o) {
      if (o) {
        var v = o._owner, b = tt(o.type, o._source, v ? v.type : null);
        tr.setExtraStackFrame(b);
      } else
        tr.setExtraStackFrame(null);
    }
    var Pt;
    Pt = !1;
    function Rt(o) {
      return typeof o == "object" && o !== null && o.$$typeof === t;
    }
    function rr() {
      {
        if (Ot.current) {
          var o = _(Ot.current.type);
          if (o)
            return `

Check the render method of \`` + o + "`.";
        }
        return "";
      }
    }
    function vn(o) {
      return "";
    }
    var nr = {};
    function hn(o) {
      {
        var v = rr();
        if (!v) {
          var b = typeof o == "string" ? o : o.displayName || o.name;
          b && (v = `

Check the top-level render call using <` + b + ">.");
        }
        return v;
      }
    }
    function lr(o, v) {
      {
        if (!o._store || o._store.validated || o.key != null)
          return;
        o._store.validated = !0;
        var b = hn(v);
        if (nr[b])
          return;
        nr[b] = !0;
        var P = "";
        o && o._owner && o._owner !== Ot.current && (P = " It was passed a child from " + _(o._owner.type) + "."), je(o), h('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', b, P), je(null);
      }
    }
    function or(o, v) {
      {
        if (typeof o != "object")
          return;
        if (Et(o))
          for (var b = 0; b < o.length; b++) {
            var P = o[b];
            Rt(P) && lr(P, v);
          }
        else if (Rt(o))
          o._store && (o._store.validated = !0);
        else if (o) {
          var k = d(o);
          if (typeof k == "function" && k !== o.entries)
            for (var M = k.call(o), C; !(C = M.next()).done; )
              Rt(C.value) && lr(C.value, v);
        }
      }
    }
    function gn(o) {
      {
        var v = o.type;
        if (v == null || typeof v == "string")
          return;
        var b;
        if (typeof v == "function")
          b = v.propTypes;
        else if (typeof v == "object" && (v.$$typeof === i || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        v.$$typeof === w))
          b = v.propTypes;
        else
          return;
        if (b) {
          var P = _(v);
          rn(b, o.props, "prop", P, o);
        } else if (v.PropTypes !== void 0 && !Pt) {
          Pt = !0;
          var k = _(v);
          h("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", k || "Unknown");
        }
        typeof v.getDefaultProps == "function" && !v.getDefaultProps.isReactClassApproved && h("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function wn(o) {
      {
        for (var v = Object.keys(o.props), b = 0; b < v.length; b++) {
          var P = v[b];
          if (P !== "children" && P !== "key") {
            je(o), h("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", P), je(null);
            break;
          }
        }
        o.ref !== null && (je(o), h("Invalid attribute `ref` supplied to `React.Fragment`."), je(null));
      }
    }
    var ir = {};
    function ar(o, v, b, P, k, M) {
      {
        var C = H(o);
        if (!C) {
          var S = "";
          (o === void 0 || typeof o == "object" && o !== null && Object.keys(o).length === 0) && (S += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var K = vn();
          K ? S += K : S += rr();
          var D;
          o === null ? D = "null" : Et(o) ? D = "array" : o !== void 0 && o.$$typeof === t ? (D = "<" + (_(o.type) || "Unknown") + " />", S = " Did you accidentally export a JSX literal instead of a component?") : D = typeof o, h("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", D, S);
        }
        var W = mn(o, v, b, k, M);
        if (W == null)
          return W;
        if (C) {
          var ne = v.children;
          if (ne !== void 0)
            if (P)
              if (Et(ne)) {
                for (var _e = 0; _e < ne.length; _e++)
                  or(ne[_e], o);
                Object.freeze && Object.freeze(ne);
              } else
                h("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              or(ne, o);
        }
        if (Ne.call(v, "key")) {
          var Re = _(o), J = Object.keys(v).filter(function(On) {
            return On !== "key";
          }), St = J.length > 0 ? "{key: someKey, " + J.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!ir[Re + St]) {
            var Tn = J.length > 0 ? "{" + J.join(": ..., ") + ": ...}" : "{}";
            h(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, St, Re, Tn, Re), ir[Re + St] = !0;
          }
        }
        return o === n ? wn(W) : gn(W), W;
      }
    }
    function yn(o, v, b) {
      return ar(o, v, b, !0);
    }
    function bn(o, v, b) {
      return ar(o, v, b, !1);
    }
    var xn = bn, En = yn;
    He.Fragment = n, He.jsx = xn, He.jsxs = En;
  }()), He;
}
process.env.NODE_ENV === "production" ? Ft.exports = In() : Ft.exports = Nn();
var R = Ft.exports;
function Dn(e, t) {
  return Array.isArray(e) ? e.filter((r) => !t.includes(r)) : Object.keys(e).reduce((r, n) => (t.includes(n) || (r[n] = e[n]), r), {});
}
function br(e, t) {
  return Array.isArray(e) ? e.filter((r) => t.includes(r)) : t.reduce((r, n) => (n in e && (r[n] = e[n]), r), {});
}
function Wn(e) {
  return Array.isArray(e) ? e.filter((t) => t !== null) : Object.keys(e).reduce((t, r) => (r in e && e[r] !== null && (t[r] = e[r]), t), {});
}
function Un(e, t = 3, r = 10) {
  return new Promise((n, l) => {
    const a = e();
    if (a) {
      n(a);
      return;
    }
    let s = t * 1e3 / r;
    const u = setInterval(() => {
      const i = e();
      i && (clearInterval(u), n(i)), --s <= 0 && (clearInterval(u), l(new Error("Condition not met in time")));
    }, r);
  });
}
function Be(e) {
  return e ? (e = e.replace(/_/g, "-"), e = e.replace(/-+/g, "-"), /[A-Z]/.test(e) ? (e = e.replace(/\s+/g, "").replace(/_/g, "").replace(/(?:^|\s|-)+([A-Za-z])/g, (t, r) => r.toUpperCase()), e = e.replace(/(.)(?=[A-Z])/g, "$1-"), e.toLowerCase()) : e) : "";
}
const dt = oe(null);
dt.displayName = "ModalStackContext";
let xr = null, Er = null, Ke = null, kt = null, jt = [];
const Hn = ({ children: e }) => {
  const [t, r] = V([]), [n, l] = V({}), a = (f) => {
    r((d) => {
      const m = f([...d]), h = (E) => {
        var T;
        return m.length < 2 ? !0 : ((T = m.map((F) => ({ id: F.id, shouldRender: F.shouldRender })).reverse().find((F) => F.shouldRender)) == null ? void 0 : T.id) === E;
      };
      return m.forEach((E, T) => {
        m[T].onTopOfStack = h(E.id), m[T].getParentModal = () => T < 1 ? null : m.slice(0, T).reverse().find((F) => F.isOpen), m[T].getChildModal = () => T === m.length - 1 ? null : m.slice(T + 1).find((F) => F.isOpen);
      }), m;
    });
  };
  L(() => {
    jt = t;
  }, [t]);
  class s {
    constructor(d, m, h, E, T) {
      le(this, "update", (d, m, h) => {
        a(
          (E) => E.map((T) => (T.id === this.id && (T.config = d, T.onCloseCallback = m, T.afterLeaveCallback = h), T))
        );
      });
      le(this, "show", () => {
        a(
          (d) => d.map((m) => (m.id === this.id && !m.isOpen && (m.isOpen = !0, m.shouldRender = !0), m))
        );
      });
      le(this, "setOpen", (d) => {
        d ? this.show() : this.close();
      });
      le(this, "close", () => {
        a(
          (d) => d.map((m) => {
            var h;
            return m.id === this.id && m.isOpen && (Object.keys(m.listeners).forEach((E) => {
              m.off(E);
            }), m.isOpen = !1, (h = m.onCloseCallback) == null || h.call(m)), m;
          })
        );
      });
      le(this, "afterLeave", () => {
        this.isOpen || a((d) => {
          const m = d.map((h) => {
            var E;
            return h.id === this.id && !h.isOpen && (h.shouldRender = !1, (E = h.afterLeaveCallback) == null || E.call(h), h.afterLeaveCallback = null), h;
          });
          return this.index === 0 ? [] : m;
        });
      });
      le(this, "on", (d, m) => {
        d = Be(d), this.listeners[d] = this.listeners[d] ?? [], this.listeners[d].push(m);
      });
      le(this, "off", (d, m) => {
        var h;
        d = Be(d), m ? this.listeners[d] = ((h = this.listeners[d]) == null ? void 0 : h.filter((E) => E !== m)) ?? [] : delete this.listeners[d];
      });
      le(this, "emit", (d, ...m) => {
        var h;
        (h = this.listeners[Be(d)]) == null || h.forEach((E) => E(...m));
      });
      le(this, "registerEventListenersFromProps", (d) => {
        const m = [];
        return Object.keys(d).filter((h) => h.startsWith("on")).forEach((h) => {
          const E = Be(h).replace(/^on-/, "");
          this.on(E, d[h]), m.push(() => this.off(E, d[h]));
        }), () => m.forEach((h) => h());
      });
      le(this, "reload", (d = {}) => {
        var h;
        let m = Object.keys(this.response.props);
        d.only && (m = br(m, d.only)), d.except && (m = Dn(m, d.except)), (h = this.response) != null && h.url && ot.get(this.response.url, {
          headers: {
            Accept: "text/html, application/xhtml+xml",
            "X-Inertia": !0,
            "X-Inertia-Partial-Component": this.response.component,
            "X-Inertia-Version": this.response.version,
            "X-Inertia-Partial-Data": m.join(","),
            "X-InertiaUI-Modal": !0,
            "X-InertiaUI-Modal-Use-Router": 0,
            "X-InertiaUI-Modal-Base-Url": Ke
          }
        }).then((E) => {
          this.updateProps(E.data.props);
        });
      });
      le(this, "updateProps", (d) => {
        Object.assign(this.props, d), a((m) => m);
      });
      this.id = s.generateId(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = d, this.props = m.props, this.response = m, this.config = h, this.onCloseCallback = E, this.afterLeaveCallback = T, this.index = -1, this.getParentModal = () => null, this.getChildModal = () => null, this.onTopOfStack = !0;
    }
    static generateId() {
      return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `inertiaui_modal_${crypto.randomUUID()}` : `inertiaui_modal_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
    }
  }
  const u = (f, d = {}, m = null, h = null) => Er(f.component).then((E) => i(E, f, d, m, h)), i = (f, d, m, h, E) => {
    const T = new s(f, d, m, h, E);
    return T.index = t.length, a((F) => [...F, T]), T.show(), T;
  };
  function p(f, d, m, h) {
    if (!n[f])
      throw new Error(`The local modal "${f}" has not been registered.`);
    const E = i(null, {}, d, m, h);
    return E.name = f, n[f].callback(E), E;
  }
  const c = (f, d = {}) => w(
    f,
    d.method ?? "get",
    d.data ?? {},
    d.headers ?? {},
    d.config ?? {},
    d.onClose,
    d.onAfterLeave,
    d.queryStringArrayFormat ?? "brackets",
    d.navigate ?? Wt("navigate")
  ).then((m) => {
    const h = d.listeners ?? {};
    return Object.keys(h).forEach((E) => {
      const T = Be(E);
      m.on(T, h[E]);
    }), m;
  }), w = (f, d, m = {}, h = {}, E = {}, T = null, F = null, X = "brackets", U = !1) => new Promise((ee, te) => {
    if (f.startsWith("#")) {
      ee(p(f.substring(1), E, T, F));
      return;
    }
    const [H, q] = Mn(d, f || "", m, X);
    let G = U && t.length === 0;
    if (t.length === 0 && (Ke = typeof window < "u" ? window.location.href : ""), h = {
      ...h,
      Accept: "text/html, application/xhtml+xml",
      "X-Requested-With": "XMLHttpRequest",
      "X-Inertia": !0,
      "X-Inertia-Version": xr,
      "X-InertiaUI-Modal": !0,
      "X-InertiaUI-Modal-Use-Router": G ? 1 : 0,
      "X-InertiaUI-Modal-Base-Url": Ke
    }, G)
      return kt = null, Ye.visit(H, {
        method: d,
        data: q,
        headers: h,
        preserveScroll: !0,
        preserveState: !0,
        onError: te,
        onFinish: () => {
          Un(() => kt).then((_) => {
            const $ = _.onCloseCallback, I = _.afterLeaveCallback;
            _.update(
              E,
              () => {
                T == null || T(), $ == null || $();
              },
              () => {
                F == null || F(), I == null || I();
              }
            ), ee(_);
          });
        }
      });
    ot({
      url: H,
      method: d,
      data: q,
      headers: h
    }).then((_) => ee(u(_.data, E, T, F))).catch((_) => {
      te(_);
    });
  }), g = {
    stack: t,
    localModals: n,
    push: i,
    pushFromResponseData: u,
    closeAll: () => {
      jt.reverse().forEach((f) => f.close());
    },
    reset: () => a(() => []),
    visit: w,
    visitModal: c,
    registerLocalModal: (f, d) => {
      l((m) => ({
        ...m,
        [f]: { name: f, callback: d }
      }));
    },
    removeLocalModal: (f) => {
      l((d) => {
        const m = { ...d };
        return delete m[f], m;
      });
    }
  };
  return /* @__PURE__ */ R.jsx(dt.Provider, { value: g, children: e });
}, ft = () => {
  const e = Z(dt);
  if (e === null)
    throw new Error("useModalStack must be used within a ModalStackProvider");
  return e;
}, cr = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], Bn = (e) => {
  e.initialPage && (xr = e.initialPage.version), e.resolveComponent && (Er = e.resolveComponent);
}, Vo = (e, t) => {
  Bn(t);
  const r = ({ Component: n, props: l, key: a }) => {
    const s = () => {
      const u = lt(n, { key: a, ...l });
      return typeof n.layout == "function" ? n.layout(u) : Array.isArray(n.layout) ? n.layout.concat(u).reverse().reduce((p, c) => lt(c, l, p)) : u;
    };
    return /* @__PURE__ */ R.jsxs(R.Fragment, { children: [
      s(),
      /* @__PURE__ */ R.jsx(Vn, {})
    ] });
  };
  return /* @__PURE__ */ R.jsx(Hn, { children: /* @__PURE__ */ R.jsx(e, { ...t, children: r }) });
}, Vn = ({ children: e }) => {
  var u;
  const t = Z(dt);
  let r = !1, n = !1;
  L(() => Ye.on("start", () => r = !0), []), L(() => Ye.on("finish", () => r = !1), []), L(
    () => Ye.on("navigate", function(i) {
      const p = i.detail.page.props._inertiaui_modal;
      if (!p) {
        n && t.closeAll();
        return;
      }
      n = p, Ke = p.baseUrl, t.pushFromResponseData(p, {}, () => {
        if (!p.baseUrl) {
          console.error("No base url in modal response data so cannot navigate back");
          return;
        }
        !r && window.location.href !== p.baseUrl && Ye.visit(p.baseUrl, {
          preserveScroll: !0,
          preserveState: !0
        });
      }).then((c) => {
        kt = c;
      });
    }),
    []
  );
  const l = (i) => (jt.length && (i.headers["X-InertiaUI-Modal-Base-Url"] = Ke), i);
  L(() => (ot.interceptors.request.use(l), () => ot.interceptors.request.eject(l)), []);
  const a = _n(), s = j();
  return L(() => {
    var c, w;
    const i = (c = a.props) == null ? void 0 : c._inertiaui_modal, p = s.current;
    s.current = i, i && p && i.component === p.component && i.url === p.url && ((w = t.stack[0]) == null || w.updateProps(i.props ?? {}));
  }, [(u = a.props) == null ? void 0 : u._inertiaui_modal]), /* @__PURE__ */ R.jsxs(R.Fragment, { children: [
    e,
    t.stack.length > 0 && /* @__PURE__ */ R.jsx(Or, { index: 0 })
  ] });
}, Ut = O.createContext(null);
Ut.displayName = "ModalIndexContext";
const Tr = () => {
  const e = O.useContext(Ut);
  if (e === void 0)
    throw new Error("useModalIndex must be used within a ModalIndexProvider");
  return e;
}, Or = ({ index: e }) => {
  const { stack: t } = ft(), r = B(() => t[e], [t, e]);
  return (r == null ? void 0 : r.component) && /* @__PURE__ */ R.jsx(Ut.Provider, { value: e, children: /* @__PURE__ */ R.jsx(
    r.component,
    {
      ...r.props,
      onModalEvent: (...n) => r.emit(...n)
    }
  ) });
}, Pr = Dt(({ name: e, children: t, ...r }, n) => {
  const l = Tr(), { stack: a, registerLocalModal: s, removeLocalModal: u } = ft(), [i, p] = V(null), c = B(() => e ? i : a[l], [e, i, l, a]), w = B(() => {
    var f;
    return (f = a.find((d) => d.shouldRender && d.index > (c == null ? void 0 : c.index))) == null ? void 0 : f.index;
  }, [l, a]), x = B(() => (c == null ? void 0 : c.config.slideover) ?? r.slideover ?? Wt("type") === "slideover", [r.slideover]), y = B(
    () => ({
      slideover: x,
      closeButton: r.closeButton ?? Me(x, "closeButton"),
      closeExplicitly: r.closeExplicitly ?? Me(x, "closeExplicitly"),
      maxWidth: r.maxWidth ?? Me(x, "maxWidth"),
      paddingClasses: r.paddingClasses ?? Me(x, "paddingClasses"),
      panelClasses: r.panelClasses ?? Me(x, "panelClasses"),
      position: r.position ?? Me(x, "position"),
      ...c == null ? void 0 : c.config
    }),
    [r, c == null ? void 0 : c.config]
  );
  L(() => {
    if (e) {
      let f = null;
      return s(e, (d) => {
        f = d.registerEventListenersFromProps(r), p(d);
      }), () => {
        f == null || f(), f = null, u(e);
      };
    }
    return c.registerEventListenersFromProps(r);
  }, [e]);
  const g = j(c);
  return L(() => {
    g.current = c;
  }, [c]), yr(
    n,
    () => ({
      afterLeave: () => {
        var f;
        return (f = g.current) == null ? void 0 : f.afterLeave();
      },
      close: () => {
        var f;
        return (f = g.current) == null ? void 0 : f.close();
      },
      emit: (...f) => {
        var d;
        return (d = g.current) == null ? void 0 : d.emit(...f);
      },
      getChildModal: () => {
        var f;
        return (f = g.current) == null ? void 0 : f.getChildModal();
      },
      getParentModal: () => {
        var f;
        return (f = g.current) == null ? void 0 : f.getParentModal();
      },
      reload: (...f) => {
        var d;
        return (d = g.current) == null ? void 0 : d.reload(...f);
      },
      setOpen: () => {
        var f;
        return (f = g.current) == null ? void 0 : f.setOpen();
      },
      get id() {
        var f;
        return (f = g.current) == null ? void 0 : f.id;
      },
      get index() {
        var f;
        return (f = g.current) == null ? void 0 : f.index;
      },
      get isOpen() {
        var f;
        return (f = g.current) == null ? void 0 : f.isOpen;
      },
      get config() {
        var f;
        return (f = g.current) == null ? void 0 : f.config;
      },
      get modalContext() {
        return g.current;
      },
      get onTopOfStack() {
        var f;
        return (f = g.current) == null ? void 0 : f.onTopOfStack;
      },
      get shouldRender() {
        var f;
        return (f = g.current) == null ? void 0 : f.shouldRender;
      }
    }),
    [c]
  ), (c == null ? void 0 : c.shouldRender) && /* @__PURE__ */ R.jsxs(R.Fragment, { children: [
    typeof t == "function" ? t({
      afterLeave: c.afterLeave,
      close: c.close,
      config: y,
      emit: c.emit,
      getChildModal: c.getChildModal,
      getParentModal: c.getParentModal,
      id: c.id,
      index: c.index,
      isOpen: c.isOpen,
      modalContext: c,
      onTopOfStack: c.onTopOfStack,
      reload: c.reload,
      setOpen: c.setOpen,
      shouldRender: c.shouldRender
    }) : t,
    w && /* @__PURE__ */ R.jsx(Or, { index: w })
  ] });
});
Pr.displayName = "HeadlessModal";
function Rr(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var l = e.length;
    for (t = 0; t < l; t++) e[t] && (r = Rr(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function it() {
  for (var e, t, r = 0, n = "", l = arguments.length; r < l; r++) (e = arguments[r]) && (t = Rr(e)) && (n && (n += " "), n += t);
  return n;
}
var Yn = Object.defineProperty, Xn = (e, t, r) => t in e ? Yn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Ct = (e, t, r) => (Xn(e, typeof t != "symbol" ? t + "" : t, r), r);
let qn = class {
  constructor() {
    Ct(this, "current", this.detect()), Ct(this, "handoffState", "pending"), Ct(this, "currentId", 0);
  }
  set(t) {
    this.current !== t && (this.handoffState = "pending", this.currentId = 0, this.current = t);
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
}, Fe = new qn();
function pt(e) {
  return Fe.isServer ? null : e instanceof Node ? e.ownerDocument : e != null && e.hasOwnProperty("current") && e.current instanceof Node ? e.current.ownerDocument : document;
}
function mt(e) {
  typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch((t) => setTimeout(() => {
    throw t;
  }));
}
function ye() {
  let e = [], t = { addEventListener(r, n, l, a) {
    return r.addEventListener(n, l, a), t.add(() => r.removeEventListener(n, l, a));
  }, requestAnimationFrame(...r) {
    let n = requestAnimationFrame(...r);
    return t.add(() => cancelAnimationFrame(n));
  }, nextFrame(...r) {
    return t.requestAnimationFrame(() => t.requestAnimationFrame(...r));
  }, setTimeout(...r) {
    let n = setTimeout(...r);
    return t.add(() => clearTimeout(n));
  }, microTask(...r) {
    let n = { current: !0 };
    return mt(() => {
      n.current && r[0]();
    }), t.add(() => {
      n.current = !1;
    });
  }, style(r, n, l) {
    let a = r.style.getPropertyValue(n);
    return Object.assign(r.style, { [n]: l }), this.add(() => {
      Object.assign(r.style, { [n]: a });
    });
  }, group(r) {
    let n = ye();
    return r(n), this.add(() => n.dispose());
  }, add(r) {
    return e.includes(r) || e.push(r), () => {
      let n = e.indexOf(r);
      if (n >= 0) for (let l of e.splice(n, 1)) l();
    };
  }, dispose() {
    for (let r of e.splice(0)) r();
  } };
  return t;
}
function Ht() {
  let [e] = V(ye);
  return L(() => () => e.dispose(), [e]), e;
}
let z = (e, t) => {
  Fe.isServer ? L(e, t) : Sn(e, t);
};
function ke(e) {
  let t = j(e);
  return z(() => {
    t.current = e;
  }, [e]), t;
}
let A = function(e) {
  let t = ke(e);
  return O.useCallback((...r) => t.current(...r), [t]);
}, Kn = oe(void 0);
function zn() {
  return Z(Kn);
}
function _t(...e) {
  return Array.from(new Set(e.flatMap((t) => typeof t == "string" ? t.split(" ") : []))).filter(Boolean).join(" ");
}
function we(e, t, ...r) {
  if (e in t) {
    let l = t[e];
    return typeof l == "function" ? l(...r) : l;
  }
  let n = new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map((l) => `"${l}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(n, we), n;
}
var at = ((e) => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(at || {}), ge = ((e) => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(ge || {});
function ie() {
  let e = Jn();
  return ae((t) => Gn({ mergeRefs: e, ...t }), [e]);
}
function Gn({ ourProps: e, theirProps: t, slot: r, defaultTag: n, features: l, visible: a = !0, name: s, mergeRefs: u }) {
  u = u ?? Zn;
  let i = Sr(t, e);
  if (a) return nt(i, r, n, s, u);
  let p = l ?? 0;
  if (p & 2) {
    let { static: c = !1, ...w } = i;
    if (c) return nt(w, r, n, s, u);
  }
  if (p & 1) {
    let { unmount: c = !0, ...w } = i;
    return we(c ? 0 : 1, { 0() {
      return null;
    }, 1() {
      return nt({ ...w, hidden: !0, style: { display: "none" } }, r, n, s, u);
    } });
  }
  return nt(i, r, n, s, u);
}
function nt(e, t = {}, r, n, l) {
  let { as: a = r, children: s, refName: u = "ref", ...i } = $t(e, ["unmount", "static"]), p = e.ref !== void 0 ? { [u]: e.ref } : {}, c = typeof s == "function" ? s(t) : s;
  "className" in i && i.className && typeof i.className == "function" && (i.className = i.className(t)), i["aria-labelledby"] && i["aria-labelledby"] === i.id && (i["aria-labelledby"] = void 0);
  let w = {};
  if (t) {
    let x = !1, y = [];
    for (let [g, f] of Object.entries(t)) typeof f == "boolean" && (x = !0), f === !0 && y.push(g.replace(/([A-Z])/g, (d) => `-${d.toLowerCase()}`));
    if (x) {
      w["data-headlessui-state"] = y.join(" ");
      for (let g of y) w[`data-${g}`] = "";
    }
  }
  if (a === ue && (Object.keys(Se(i)).length > 0 || Object.keys(Se(w)).length > 0)) if (!Cn(c) || Array.isArray(c) && c.length > 1) {
    if (Object.keys(Se(i)).length > 0) throw new Error(['Passing props on "Fragment"!', "", `The current component <${n} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(Se(i)).concat(Object.keys(Se(w))).map((x) => `  - ${x}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((x) => `  - ${x}`).join(`
`)].join(`
`));
  } else {
    let x = c.props, y = x == null ? void 0 : x.className, g = typeof y == "function" ? (...m) => _t(y(...m), i.className) : _t(y, i.className), f = g ? { className: g } : {}, d = Sr(c.props, Se($t(i, ["ref"])));
    for (let m in w) m in d && delete w[m];
    return $n(c, Object.assign({}, d, w, p, { ref: l(Qn(c), p.ref) }, f));
  }
  return lt(a, Object.assign({}, $t(i, ["ref"]), a !== ue && p, a !== ue && w), c);
}
function Jn() {
  let e = j([]), t = ae((r) => {
    for (let n of e.current) n != null && (typeof n == "function" ? n(r) : n.current = r);
  }, []);
  return (...r) => {
    if (!r.every((n) => n == null)) return e.current = r, t;
  };
}
function Zn(...e) {
  return e.every((t) => t == null) ? void 0 : (t) => {
    for (let r of e) r != null && (typeof r == "function" ? r(t) : r.current = t);
  };
}
function Sr(...e) {
  if (e.length === 0) return {};
  if (e.length === 1) return e[0];
  let t = {}, r = {};
  for (let n of e) for (let l in n) l.startsWith("on") && typeof n[l] == "function" ? (r[l] != null || (r[l] = []), r[l].push(n[l])) : t[l] = n[l];
  if (t.disabled || t["aria-disabled"]) for (let n in r) /^(on(?:Click|Pointer|Mouse|Key)(?:Down|Up|Press)?)$/.test(n) && (r[n] = [(l) => {
    var a;
    return (a = l == null ? void 0 : l.preventDefault) == null ? void 0 : a.call(l);
  }]);
  for (let n in r) Object.assign(t, { [n](l, ...a) {
    let s = r[n];
    for (let u of s) {
      if ((l instanceof Event || (l == null ? void 0 : l.nativeEvent) instanceof Event) && l.defaultPrevented) return;
      u(l, ...a);
    }
  } });
  return t;
}
function Q(e) {
  var t;
  return Object.assign(Dt(e), { displayName: (t = e.displayName) != null ? t : e.name });
}
function Se(e) {
  let t = Object.assign({}, e);
  for (let r in t) t[r] === void 0 && delete t[r];
  return t;
}
function $t(e, t = []) {
  let r = Object.assign({}, e);
  for (let n of t) n in r && delete r[n];
  return r;
}
function Qn(e) {
  return O.version.split(".")[0] >= "19" ? e.props.ref : e.ref;
}
let el = "span";
var st = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(st || {});
function tl(e, t) {
  var r;
  let { features: n = 1, ...l } = e, a = { ref: t, "aria-hidden": (n & 2) === 2 ? !0 : (r = l["aria-hidden"]) != null ? r : void 0, hidden: (n & 4) === 4 ? !0 : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(n & 4) === 4 && (n & 2) !== 2 && { display: "none" } } };
  return ie()({ ourProps: a, theirProps: l, slot: {}, defaultTag: el, name: "Hidden" });
}
let Mt = Q(tl), Cr = Symbol();
function rl(e, t = !0) {
  return Object.assign(e, { [Cr]: t });
}
function ce(...e) {
  let t = j(e);
  L(() => {
    t.current = e;
  }, [e]);
  let r = A((n) => {
    for (let l of t.current) l != null && (typeof l == "function" ? l(n) : l.current = n);
  });
  return e.every((n) => n == null || (n == null ? void 0 : n[Cr])) ? void 0 : r;
}
let Bt = oe(null);
Bt.displayName = "DescriptionContext";
function $r() {
  let e = Z(Bt);
  if (e === null) {
    let t = new Error("You used a <Description /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(t, $r), t;
  }
  return e;
}
function nl() {
  let [e, t] = V([]);
  return [e.length > 0 ? e.join(" ") : void 0, B(() => function(r) {
    let n = A((a) => (t((s) => [...s, a]), () => t((s) => {
      let u = s.slice(), i = u.indexOf(a);
      return i !== -1 && u.splice(i, 1), u;
    }))), l = B(() => ({ register: n, slot: r.slot, name: r.name, props: r.props, value: r.value }), [n, r.slot, r.name, r.props, r.value]);
    return O.createElement(Bt.Provider, { value: l }, r.children);
  }, [t])];
}
let ll = "p";
function ol(e, t) {
  let r = Je(), n = zn(), { id: l = `headlessui-description-${r}`, ...a } = e, s = $r(), u = ce(t);
  z(() => s.register(l), [l, s.register]);
  let i = n || !1, p = B(() => ({ ...s.slot, disabled: i }), [s.slot, i]), c = { ref: u, ...s.props, id: l };
  return ie()({ ourProps: c, theirProps: a, slot: p, defaultTag: ll, name: s.name || "Description" });
}
let il = Q(ol), al = Object.assign(il, {});
var Fr = ((e) => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(Fr || {});
let sl = oe(() => {
});
function ul({ value: e, children: t }) {
  return O.createElement(sl.Provider, { value: e }, t);
}
let cl = class extends Map {
  constructor(t) {
    super(), this.factory = t;
  }
  get(t) {
    let r = super.get(t);
    return r === void 0 && (r = this.factory(t), this.set(t, r)), r;
  }
};
function kr(e, t) {
  let r = e(), n = /* @__PURE__ */ new Set();
  return { getSnapshot() {
    return r;
  }, subscribe(l) {
    return n.add(l), () => n.delete(l);
  }, dispatch(l, ...a) {
    let s = t[l].call(r, ...a);
    s && (r = s, n.forEach((u) => u()));
  } };
}
function jr(e) {
  return Fn(e.subscribe, e.getSnapshot, e.getSnapshot);
}
let dl = new cl(() => kr(() => [], { ADD(e) {
  return this.includes(e) ? this : [...this, e];
}, REMOVE(e) {
  let t = this.indexOf(e);
  if (t === -1) return this;
  let r = this.slice();
  return r.splice(t, 1), r;
} }));
function Ae(e, t) {
  let r = dl.get(t), n = Je(), l = jr(r);
  if (z(() => {
    if (e) return r.dispatch("ADD", n), () => r.dispatch("REMOVE", n);
  }, [r, e]), !e) return !1;
  let a = l.indexOf(n), s = l.length;
  return a === -1 && (a = s, s += 1), a === s - 1;
}
let At = /* @__PURE__ */ new Map(), ze = /* @__PURE__ */ new Map();
function dr(e) {
  var t;
  let r = (t = ze.get(e)) != null ? t : 0;
  return ze.set(e, r + 1), r !== 0 ? () => fr(e) : (At.set(e, { "aria-hidden": e.getAttribute("aria-hidden"), inert: e.inert }), e.setAttribute("aria-hidden", "true"), e.inert = !0, () => fr(e));
}
function fr(e) {
  var t;
  let r = (t = ze.get(e)) != null ? t : 1;
  if (r === 1 ? ze.delete(e) : ze.set(e, r - 1), r !== 1) return;
  let n = At.get(e);
  n && (n["aria-hidden"] === null ? e.removeAttribute("aria-hidden") : e.setAttribute("aria-hidden", n["aria-hidden"]), e.inert = n.inert, At.delete(e));
}
function fl(e, { allowed: t, disallowed: r } = {}) {
  let n = Ae(e, "inert-others");
  z(() => {
    var l, a;
    if (!n) return;
    let s = ye();
    for (let i of (l = r == null ? void 0 : r()) != null ? l : []) i && s.add(dr(i));
    let u = (a = t == null ? void 0 : t()) != null ? a : [];
    for (let i of u) {
      if (!i) continue;
      let p = pt(i);
      if (!p) continue;
      let c = i.parentElement;
      for (; c && c !== p.body; ) {
        for (let w of c.children) u.some((x) => w.contains(x)) || s.add(dr(w));
        c = c.parentElement;
      }
    }
    return s.dispose;
  }, [n, t, r]);
}
function pl(e, t, r) {
  let n = ke((l) => {
    let a = l.getBoundingClientRect();
    a.x === 0 && a.y === 0 && a.width === 0 && a.height === 0 && r();
  });
  L(() => {
    if (!e) return;
    let l = t === null ? null : t instanceof HTMLElement ? t : t.current;
    if (!l) return;
    let a = ye();
    if (typeof ResizeObserver < "u") {
      let s = new ResizeObserver(() => n.current(l));
      s.observe(l), a.add(() => s.disconnect());
    }
    if (typeof IntersectionObserver < "u") {
      let s = new IntersectionObserver(() => n.current(l));
      s.observe(l), a.add(() => s.disconnect());
    }
    return () => a.dispose();
  }, [t, n, e]);
}
let ut = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e) => `${e}:not([tabindex='-1'])`).join(","), ml = ["[data-autofocus]"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var pe = ((e) => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e[e.AutoFocus = 64] = "AutoFocus", e))(pe || {}), Lt = ((e) => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(Lt || {}), vl = ((e) => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(vl || {});
function hl(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(ut)).sort((t, r) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (r.tabIndex || Number.MAX_SAFE_INTEGER)));
}
function gl(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(ml)).sort((t, r) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (r.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var _r = ((e) => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(_r || {});
function wl(e, t = 0) {
  var r;
  return e === ((r = pt(e)) == null ? void 0 : r.body) ? !1 : we(t, { 0() {
    return e.matches(ut);
  }, 1() {
    let n = e;
    for (; n !== null; ) {
      if (n.matches(ut)) return !0;
      n = n.parentElement;
    }
    return !1;
  } });
}
var yl = ((e) => (e[e.Keyboard = 0] = "Keyboard", e[e.Mouse = 1] = "Mouse", e))(yl || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (e) => {
  e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (e) => {
  e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
function me(e) {
  e == null || e.focus({ preventScroll: !0 });
}
let bl = ["textarea", "input"].join(",");
function xl(e) {
  var t, r;
  return (r = (t = e == null ? void 0 : e.matches) == null ? void 0 : t.call(e, bl)) != null ? r : !1;
}
function El(e, t = (r) => r) {
  return e.slice().sort((r, n) => {
    let l = t(r), a = t(n);
    if (l === null || a === null) return 0;
    let s = l.compareDocumentPosition(a);
    return s & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : s & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function Ge(e, t, { sorted: r = !0, relativeTo: n = null, skipElements: l = [] } = {}) {
  let a = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : document : e.ownerDocument, s = Array.isArray(e) ? r ? El(e) : e : t & 64 ? gl(e) : hl(e);
  l.length > 0 && s.length > 1 && (s = s.filter((y) => !l.some((g) => g != null && "current" in g ? (g == null ? void 0 : g.current) === y : g === y))), n = n ?? a.activeElement;
  let u = (() => {
    if (t & 5) return 1;
    if (t & 10) return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), i = (() => {
    if (t & 1) return 0;
    if (t & 2) return Math.max(0, s.indexOf(n)) - 1;
    if (t & 4) return Math.max(0, s.indexOf(n)) + 1;
    if (t & 8) return s.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), p = t & 32 ? { preventScroll: !0 } : {}, c = 0, w = s.length, x;
  do {
    if (c >= w || c + w <= 0) return 0;
    let y = i + c;
    if (t & 16) y = (y + w) % w;
    else {
      if (y < 0) return 3;
      if (y >= w) return 1;
    }
    x = s[y], x == null || x.focus(p), c += u;
  } while (x !== a.activeElement);
  return t & 6 && xl(x) && x.select(), 2;
}
function Mr() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function Tl() {
  return /Android/gi.test(window.navigator.userAgent);
}
function Ol() {
  return Mr() || Tl();
}
function Ve(e, t, r, n) {
  let l = ke(r);
  L(() => {
    if (!e) return;
    function a(s) {
      l.current(s);
    }
    return document.addEventListener(t, a, n), () => document.removeEventListener(t, a, n);
  }, [e, t, n]);
}
function Ar(e, t, r, n) {
  let l = ke(r);
  L(() => {
    if (!e) return;
    function a(s) {
      l.current(s);
    }
    return window.addEventListener(t, a, n), () => window.removeEventListener(t, a, n);
  }, [e, t, n]);
}
const pr = 30;
function Pl(e, t, r) {
  let n = Ae(e, "outside-click"), l = ke(r), a = ae(function(i, p) {
    if (i.defaultPrevented) return;
    let c = p(i);
    if (c === null || !c.getRootNode().contains(c) || !c.isConnected) return;
    let w = function x(y) {
      return typeof y == "function" ? x(y()) : Array.isArray(y) || y instanceof Set ? y : [y];
    }(t);
    for (let x of w) if (x !== null && (x.contains(c) || i.composed && i.composedPath().includes(x))) return;
    return !wl(c, _r.Loose) && c.tabIndex !== -1 && i.preventDefault(), l.current(i, c);
  }, [l, t]), s = j(null);
  Ve(n, "pointerdown", (i) => {
    var p, c;
    s.current = ((c = (p = i.composedPath) == null ? void 0 : p.call(i)) == null ? void 0 : c[0]) || i.target;
  }, !0), Ve(n, "mousedown", (i) => {
    var p, c;
    s.current = ((c = (p = i.composedPath) == null ? void 0 : p.call(i)) == null ? void 0 : c[0]) || i.target;
  }, !0), Ve(n, "click", (i) => {
    Ol() || s.current && (a(i, () => s.current), s.current = null);
  }, !0);
  let u = j({ x: 0, y: 0 });
  Ve(n, "touchstart", (i) => {
    u.current.x = i.touches[0].clientX, u.current.y = i.touches[0].clientY;
  }, !0), Ve(n, "touchend", (i) => {
    let p = { x: i.changedTouches[0].clientX, y: i.changedTouches[0].clientY };
    if (!(Math.abs(p.x - u.current.x) >= pr || Math.abs(p.y - u.current.y) >= pr)) return a(i, () => i.target instanceof HTMLElement ? i.target : null);
  }, !0), Ar(n, "blur", (i) => a(i, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), !0);
}
function Ze(...e) {
  return B(() => pt(...e), [...e]);
}
function Lr(e, t, r, n) {
  let l = ke(r);
  L(() => {
    e = e ?? window;
    function a(s) {
      l.current(s);
    }
    return e.addEventListener(t, a, n), () => e.removeEventListener(t, a, n);
  }, [e, t, n]);
}
function Rl() {
  let e;
  return { before({ doc: t }) {
    var r;
    let n = t.documentElement, l = (r = t.defaultView) != null ? r : window;
    e = Math.max(0, l.innerWidth - n.clientWidth);
  }, after({ doc: t, d: r }) {
    let n = t.documentElement, l = Math.max(0, n.clientWidth - n.offsetWidth), a = Math.max(0, e - l);
    r.style(n, "paddingRight", `${a}px`);
  } };
}
function Sl() {
  return Mr() ? { before({ doc: e, d: t, meta: r }) {
    function n(l) {
      return r.containers.flatMap((a) => a()).some((a) => a.contains(l));
    }
    t.microTask(() => {
      var l;
      if (window.getComputedStyle(e.documentElement).scrollBehavior !== "auto") {
        let u = ye();
        u.style(e.documentElement, "scrollBehavior", "auto"), t.add(() => t.microTask(() => u.dispose()));
      }
      let a = (l = window.scrollY) != null ? l : window.pageYOffset, s = null;
      t.addEventListener(e, "click", (u) => {
        if (u.target instanceof HTMLElement) try {
          let i = u.target.closest("a");
          if (!i) return;
          let { hash: p } = new URL(i.href), c = e.querySelector(p);
          c && !n(c) && (s = c);
        } catch {
        }
      }, !0), t.addEventListener(e, "touchstart", (u) => {
        if (u.target instanceof HTMLElement) if (n(u.target)) {
          let i = u.target;
          for (; i.parentElement && n(i.parentElement); ) i = i.parentElement;
          t.style(i, "overscrollBehavior", "contain");
        } else t.style(u.target, "touchAction", "none");
      }), t.addEventListener(e, "touchmove", (u) => {
        if (u.target instanceof HTMLElement) {
          if (u.target.tagName === "INPUT") return;
          if (n(u.target)) {
            let i = u.target;
            for (; i.parentElement && i.dataset.headlessuiPortal !== "" && !(i.scrollHeight > i.clientHeight || i.scrollWidth > i.clientWidth); ) i = i.parentElement;
            i.dataset.headlessuiPortal === "" && u.preventDefault();
          } else u.preventDefault();
        }
      }, { passive: !1 }), t.add(() => {
        var u;
        let i = (u = window.scrollY) != null ? u : window.pageYOffset;
        a !== i && window.scrollTo(0, a), s && s.isConnected && (s.scrollIntoView({ block: "nearest" }), s = null);
      });
    });
  } } : {};
}
function Cl() {
  return { before({ doc: e, d: t }) {
    t.style(e.documentElement, "overflow", "hidden");
  } };
}
function $l(e) {
  let t = {};
  for (let r of e) Object.assign(t, r(t));
  return t;
}
let $e = kr(() => /* @__PURE__ */ new Map(), { PUSH(e, t) {
  var r;
  let n = (r = this.get(e)) != null ? r : { doc: e, count: 0, d: ye(), meta: /* @__PURE__ */ new Set() };
  return n.count++, n.meta.add(t), this.set(e, n), this;
}, POP(e, t) {
  let r = this.get(e);
  return r && (r.count--, r.meta.delete(t)), this;
}, SCROLL_PREVENT({ doc: e, d: t, meta: r }) {
  let n = { doc: e, d: t, meta: $l(r) }, l = [Sl(), Rl(), Cl()];
  l.forEach(({ before: a }) => a == null ? void 0 : a(n)), l.forEach(({ after: a }) => a == null ? void 0 : a(n));
}, SCROLL_ALLOW({ d: e }) {
  e.dispose();
}, TEARDOWN({ doc: e }) {
  this.delete(e);
} });
$e.subscribe(() => {
  let e = $e.getSnapshot(), t = /* @__PURE__ */ new Map();
  for (let [r] of e) t.set(r, r.documentElement.style.overflow);
  for (let r of e.values()) {
    let n = t.get(r.doc) === "hidden", l = r.count !== 0;
    (l && !n || !l && n) && $e.dispatch(r.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", r), r.count === 0 && $e.dispatch("TEARDOWN", r);
  }
});
function Fl(e, t, r = () => ({ containers: [] })) {
  let n = jr($e), l = t ? n.get(t) : void 0, a = l ? l.count > 0 : !1;
  return z(() => {
    if (!(!t || !e)) return $e.dispatch("PUSH", t, r), () => $e.dispatch("POP", t, r);
  }, [e, t]), a;
}
function kl(e, t, r = () => [document.body]) {
  let n = Ae(e, "scroll-lock");
  Fl(n, t, (l) => {
    var a;
    return { containers: [...(a = l.containers) != null ? a : [], r] };
  });
}
function jl(e = 0) {
  let [t, r] = V(e), n = ae((i) => r(i), [t]), l = ae((i) => r((p) => p | i), [t]), a = ae((i) => (t & i) === i, [t]), s = ae((i) => r((p) => p & ~i), [r]), u = ae((i) => r((p) => p ^ i), [r]);
  return { flags: t, setFlag: n, addFlag: l, hasFlag: a, removeFlag: s, toggleFlag: u };
}
var mr, vr;
typeof process < "u" && typeof globalThis < "u" && typeof Element < "u" && ((mr = process == null ? void 0 : process.env) == null ? void 0 : mr.NODE_ENV) === "test" && typeof ((vr = Element == null ? void 0 : Element.prototype) == null ? void 0 : vr.getAnimations) > "u" && (Element.prototype.getAnimations = function() {
  return console.warn(["Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.", "Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.", "", "Example usage:", "```js", "import { mockAnimationsApi } from 'jsdom-testing-mocks'", "mockAnimationsApi()", "```"].join(`
`)), [];
});
var _l = ((e) => (e[e.None = 0] = "None", e[e.Closed = 1] = "Closed", e[e.Enter = 2] = "Enter", e[e.Leave = 4] = "Leave", e))(_l || {});
function Ml(e) {
  let t = {};
  for (let r in e) e[r] === !0 && (t[`data-${r}`] = "");
  return t;
}
function Al(e, t, r, n) {
  let [l, a] = V(r), { hasFlag: s, addFlag: u, removeFlag: i } = jl(e && l ? 3 : 0), p = j(!1), c = j(!1), w = Ht();
  return z(() => {
    var x;
    if (e) {
      if (r && a(!0), !t) {
        r && u(3);
        return;
      }
      return (x = n == null ? void 0 : n.start) == null || x.call(n, r), Ll(t, { inFlight: p, prepare() {
        c.current ? c.current = !1 : c.current = p.current, p.current = !0, !c.current && (r ? (u(3), i(4)) : (u(4), i(2)));
      }, run() {
        c.current ? r ? (i(3), u(4)) : (i(4), u(3)) : r ? i(1) : u(1);
      }, done() {
        var y;
        c.current && typeof t.getAnimations == "function" && t.getAnimations().length > 0 || (p.current = !1, i(7), r || a(!1), (y = n == null ? void 0 : n.end) == null || y.call(n, r));
      } });
    }
  }, [e, r, t, w]), e ? [l, { closed: s(1), enter: s(2), leave: s(4), transition: s(2) || s(4) }] : [r, { closed: void 0, enter: void 0, leave: void 0, transition: void 0 }];
}
function Ll(e, { prepare: t, run: r, done: n, inFlight: l }) {
  let a = ye();
  return Nl(e, { prepare: t, inFlight: l }), a.nextFrame(() => {
    r(), a.requestAnimationFrame(() => {
      a.add(Il(e, n));
    });
  }), a.dispose;
}
function Il(e, t) {
  var r, n;
  let l = ye();
  if (!e) return l.dispose;
  let a = !1;
  l.add(() => {
    a = !0;
  });
  let s = (n = (r = e.getAnimations) == null ? void 0 : r.call(e).filter((u) => u instanceof CSSTransition)) != null ? n : [];
  return s.length === 0 ? (t(), l.dispose) : (Promise.allSettled(s.map((u) => u.finished)).then(() => {
    a || t();
  }), l.dispose);
}
function Nl(e, { inFlight: t, prepare: r }) {
  if (t != null && t.current) {
    r();
    return;
  }
  let n = e.style.transition;
  e.style.transition = "none", r(), e.offsetHeight, e.style.transition = n;
}
function Vt(e, t) {
  let r = j([]), n = A(e);
  L(() => {
    let l = [...r.current];
    for (let [a, s] of t.entries()) if (r.current[a] !== s) {
      let u = n(t, l);
      return r.current = t, u;
    }
  }, [n, ...t]);
}
let vt = oe(null);
vt.displayName = "OpenClosedContext";
var se = ((e) => (e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(se || {});
function ht() {
  return Z(vt);
}
function Dl({ value: e, children: t }) {
  return O.createElement(vt.Provider, { value: e }, t);
}
function Wl({ children: e }) {
  return O.createElement(vt.Provider, { value: null }, e);
}
function Ul(e) {
  function t() {
    document.readyState !== "loading" && (e(), document.removeEventListener("DOMContentLoaded", t));
  }
  typeof window < "u" && typeof document < "u" && (document.addEventListener("DOMContentLoaded", t), t());
}
let he = [];
Ul(() => {
  function e(t) {
    if (!(t.target instanceof HTMLElement) || t.target === document.body || he[0] === t.target) return;
    let r = t.target;
    r = r.closest(ut), he.unshift(r ?? t.target), he = he.filter((n) => n != null && n.isConnected), he.splice(10);
  }
  window.addEventListener("click", e, { capture: !0 }), window.addEventListener("mousedown", e, { capture: !0 }), window.addEventListener("focus", e, { capture: !0 }), document.body.addEventListener("click", e, { capture: !0 }), document.body.addEventListener("mousedown", e, { capture: !0 }), document.body.addEventListener("focus", e, { capture: !0 });
});
function Ir(e) {
  let t = A(e), r = j(!1);
  L(() => (r.current = !1, () => {
    r.current = !0, mt(() => {
      r.current && t();
    });
  }), [t]);
}
function Hl() {
  let e = typeof document > "u";
  return "useSyncExternalStore" in qe ? ((t) => t.useSyncExternalStore)(qe)(() => () => {
  }, () => !1, () => !e) : !1;
}
function Qe() {
  let e = Hl(), [t, r] = qe.useState(Fe.isHandoffComplete);
  return t && Fe.isHandoffComplete === !1 && r(!1), qe.useEffect(() => {
    t !== !0 && r(!0);
  }, [t]), qe.useEffect(() => Fe.handoff(), []), e ? !1 : t;
}
let Nr = oe(!1);
function Bl() {
  return Z(Nr);
}
function hr(e) {
  return O.createElement(Nr.Provider, { value: e.force }, e.children);
}
function Vl(e) {
  let t = Bl(), r = Z(Wr), n = Ze(e), [l, a] = V(() => {
    var s;
    if (!t && r !== null) return (s = r.current) != null ? s : null;
    if (Fe.isServer) return null;
    let u = n == null ? void 0 : n.getElementById("headlessui-portal-root");
    if (u) return u;
    if (n === null) return null;
    let i = n.createElement("div");
    return i.setAttribute("id", "headlessui-portal-root"), n.body.appendChild(i);
  });
  return L(() => {
    l !== null && (n != null && n.body.contains(l) || n == null || n.body.appendChild(l));
  }, [l, n]), L(() => {
    t || r !== null && a(r.current);
  }, [r, a, t]), l;
}
let Dr = ue, Yl = Q(function(e, t) {
  let r = e, n = j(null), l = ce(rl((w) => {
    n.current = w;
  }), t), a = Ze(n), s = Vl(n), [u] = V(() => {
    var w;
    return Fe.isServer ? null : (w = a == null ? void 0 : a.createElement("div")) != null ? w : null;
  }), i = Z(It), p = Qe();
  z(() => {
    !s || !u || s.contains(u) || (u.setAttribute("data-headlessui-portal", ""), s.appendChild(u));
  }, [s, u]), z(() => {
    if (u && i) return i.register(u);
  }, [i, u]), Ir(() => {
    var w;
    !s || !u || (u instanceof Node && s.contains(u) && s.removeChild(u), s.childNodes.length <= 0 && ((w = s.parentElement) == null || w.removeChild(s)));
  });
  let c = ie();
  return p ? !s || !u ? null : An(c({ ourProps: { ref: l }, theirProps: r, slot: {}, defaultTag: Dr, name: "Portal" }), u) : null;
});
function Xl(e, t) {
  let r = ce(t), { enabled: n = !0, ...l } = e, a = ie();
  return n ? O.createElement(Yl, { ...l, ref: r }) : a({ ourProps: { ref: r }, theirProps: l, slot: {}, defaultTag: Dr, name: "Portal" });
}
let ql = ue, Wr = oe(null);
function Kl(e, t) {
  let { target: r, ...n } = e, l = { ref: ce(t) }, a = ie();
  return O.createElement(Wr.Provider, { value: r }, a({ ourProps: l, theirProps: n, defaultTag: ql, name: "Popover.Group" }));
}
let It = oe(null);
function zl() {
  let e = Z(It), t = j([]), r = A((a) => (t.current.push(a), e && e.register(a), () => n(a))), n = A((a) => {
    let s = t.current.indexOf(a);
    s !== -1 && t.current.splice(s, 1), e && e.unregister(a);
  }), l = B(() => ({ register: r, unregister: n, portals: t }), [r, n, t]);
  return [t, B(() => function({ children: a }) {
    return O.createElement(It.Provider, { value: l }, a);
  }, [l])];
}
let Gl = Q(Xl), Ur = Q(Kl), Jl = Object.assign(Gl, { Group: Ur });
function Zl(e, t = typeof document < "u" ? document.defaultView : null, r) {
  let n = Ae(e, "escape");
  Lr(t, "keydown", (l) => {
    n && (l.defaultPrevented || l.key === Fr.Escape && r(l));
  });
}
function Ql() {
  var e;
  let [t] = V(() => typeof window < "u" && typeof window.matchMedia == "function" ? window.matchMedia("(pointer: coarse)") : null), [r, n] = V((e = t == null ? void 0 : t.matches) != null ? e : !1);
  return z(() => {
    if (!t) return;
    function l(a) {
      n(a.matches);
    }
    return t.addEventListener("change", l), () => t.removeEventListener("change", l);
  }, [t]), r;
}
function eo({ defaultContainers: e = [], portals: t, mainTreeNode: r } = {}) {
  let n = Ze(r), l = A(() => {
    var a, s;
    let u = [];
    for (let i of e) i !== null && (i instanceof HTMLElement ? u.push(i) : "current" in i && i.current instanceof HTMLElement && u.push(i.current));
    if (t != null && t.current) for (let i of t.current) u.push(i);
    for (let i of (a = n == null ? void 0 : n.querySelectorAll("html > *, body > *")) != null ? a : []) i !== document.body && i !== document.head && i instanceof HTMLElement && i.id !== "headlessui-portal-root" && (r && (i.contains(r) || i.contains((s = r == null ? void 0 : r.getRootNode()) == null ? void 0 : s.host)) || u.some((p) => i.contains(p)) || u.push(i));
    return u;
  });
  return { resolveContainers: l, contains: A((a) => l().some((s) => s.contains(a))) };
}
let Hr = oe(null);
function gr({ children: e, node: t }) {
  let [r, n] = V(null), l = Br(t ?? r);
  return O.createElement(Hr.Provider, { value: l }, e, l === null && O.createElement(Mt, { features: st.Hidden, ref: (a) => {
    var s, u;
    if (a) {
      for (let i of (u = (s = pt(a)) == null ? void 0 : s.querySelectorAll("html > *, body > *")) != null ? u : []) if (i !== document.body && i !== document.head && i instanceof HTMLElement && i != null && i.contains(a)) {
        n(i);
        break;
      }
    }
  } }));
}
function Br(e = null) {
  var t;
  return (t = Z(Hr)) != null ? t : e;
}
function Yt() {
  let e = j(!1);
  return z(() => (e.current = !0, () => {
    e.current = !1;
  }), []), e;
}
var Xe = ((e) => (e[e.Forwards = 0] = "Forwards", e[e.Backwards = 1] = "Backwards", e))(Xe || {});
function to() {
  let e = j(0);
  return Ar(!0, "keydown", (t) => {
    t.key === "Tab" && (e.current = t.shiftKey ? 1 : 0);
  }, !0), e;
}
function Vr(e) {
  if (!e) return /* @__PURE__ */ new Set();
  if (typeof e == "function") return new Set(e());
  let t = /* @__PURE__ */ new Set();
  for (let r of e.current) r.current instanceof HTMLElement && t.add(r.current);
  return t;
}
let ro = "div";
var Ce = ((e) => (e[e.None = 0] = "None", e[e.InitialFocus = 1] = "InitialFocus", e[e.TabLock = 2] = "TabLock", e[e.FocusLock = 4] = "FocusLock", e[e.RestoreFocus = 8] = "RestoreFocus", e[e.AutoFocus = 16] = "AutoFocus", e))(Ce || {});
function no(e, t) {
  let r = j(null), n = ce(r, t), { initialFocus: l, initialFocusFallback: a, containers: s, features: u = 15, ...i } = e;
  Qe() || (u = 0);
  let p = Ze(r);
  ao(u, { ownerDocument: p });
  let c = so(u, { ownerDocument: p, container: r, initialFocus: l, initialFocusFallback: a });
  uo(u, { ownerDocument: p, container: r, containers: s, previousActiveElement: c });
  let w = to(), x = A((h) => {
    let E = r.current;
    E && ((T) => T())(() => {
      we(w.current, { [Xe.Forwards]: () => {
        Ge(E, pe.First, { skipElements: [h.relatedTarget, a] });
      }, [Xe.Backwards]: () => {
        Ge(E, pe.Last, { skipElements: [h.relatedTarget, a] });
      } });
    });
  }), y = Ae(!!(u & 2), "focus-trap#tab-lock"), g = Ht(), f = j(!1), d = { ref: n, onKeyDown(h) {
    h.key == "Tab" && (f.current = !0, g.requestAnimationFrame(() => {
      f.current = !1;
    }));
  }, onBlur(h) {
    if (!(u & 4)) return;
    let E = Vr(s);
    r.current instanceof HTMLElement && E.add(r.current);
    let T = h.relatedTarget;
    T instanceof HTMLElement && T.dataset.headlessuiFocusGuard !== "true" && (Yr(E, T) || (f.current ? Ge(r.current, we(w.current, { [Xe.Forwards]: () => pe.Next, [Xe.Backwards]: () => pe.Previous }) | pe.WrapAround, { relativeTo: h.target }) : h.target instanceof HTMLElement && me(h.target)));
  } }, m = ie();
  return O.createElement(O.Fragment, null, y && O.createElement(Mt, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: x, features: st.Focusable }), m({ ourProps: d, theirProps: i, defaultTag: ro, name: "FocusTrap" }), y && O.createElement(Mt, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: x, features: st.Focusable }));
}
let lo = Q(no), oo = Object.assign(lo, { features: Ce });
function io(e = !0) {
  let t = j(he.slice());
  return Vt(([r], [n]) => {
    n === !0 && r === !1 && mt(() => {
      t.current.splice(0);
    }), n === !1 && r === !0 && (t.current = he.slice());
  }, [e, he, t]), A(() => {
    var r;
    return (r = t.current.find((n) => n != null && n.isConnected)) != null ? r : null;
  });
}
function ao(e, { ownerDocument: t }) {
  let r = !!(e & 8), n = io(r);
  Vt(() => {
    r || (t == null ? void 0 : t.activeElement) === (t == null ? void 0 : t.body) && me(n());
  }, [r]), Ir(() => {
    r && me(n());
  });
}
function so(e, { ownerDocument: t, container: r, initialFocus: n, initialFocusFallback: l }) {
  let a = j(null), s = Ae(!!(e & 1), "focus-trap#initial-focus"), u = Yt();
  return Vt(() => {
    if (e === 0) return;
    if (!s) {
      l != null && l.current && me(l.current);
      return;
    }
    let i = r.current;
    i && mt(() => {
      if (!u.current) return;
      let p = t == null ? void 0 : t.activeElement;
      if (n != null && n.current) {
        if ((n == null ? void 0 : n.current) === p) {
          a.current = p;
          return;
        }
      } else if (i.contains(p)) {
        a.current = p;
        return;
      }
      if (n != null && n.current) me(n.current);
      else {
        if (e & 16) {
          if (Ge(i, pe.First | pe.AutoFocus) !== Lt.Error) return;
        } else if (Ge(i, pe.First) !== Lt.Error) return;
        if (l != null && l.current && (me(l.current), (t == null ? void 0 : t.activeElement) === l.current)) return;
        console.warn("There are no focusable elements inside the <FocusTrap />");
      }
      a.current = t == null ? void 0 : t.activeElement;
    });
  }, [l, s, e]), a;
}
function uo(e, { ownerDocument: t, container: r, containers: n, previousActiveElement: l }) {
  let a = Yt(), s = !!(e & 4);
  Lr(t == null ? void 0 : t.defaultView, "focus", (u) => {
    if (!s || !a.current) return;
    let i = Vr(n);
    r.current instanceof HTMLElement && i.add(r.current);
    let p = l.current;
    if (!p) return;
    let c = u.target;
    c && c instanceof HTMLElement ? Yr(i, c) ? (l.current = c, me(c)) : (u.preventDefault(), u.stopPropagation(), me(p)) : me(l.current);
  }, !0);
}
function Yr(e, t) {
  for (let r of e) if (r.contains(t)) return !0;
  return !1;
}
function Xr(e) {
  var t;
  return !!(e.enter || e.enterFrom || e.enterTo || e.leave || e.leaveFrom || e.leaveTo) || ((t = e.as) != null ? t : Kr) !== ue || O.Children.count(e.children) === 1;
}
let gt = oe(null);
gt.displayName = "TransitionContext";
var co = ((e) => (e.Visible = "visible", e.Hidden = "hidden", e))(co || {});
function fo() {
  let e = Z(gt);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
function po() {
  let e = Z(wt);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
let wt = oe(null);
wt.displayName = "NestingContext";
function yt(e) {
  return "children" in e ? yt(e.children) : e.current.filter(({ el: t }) => t.current !== null).filter(({ state: t }) => t === "visible").length > 0;
}
function qr(e, t) {
  let r = ke(e), n = j([]), l = Yt(), a = Ht(), s = A((y, g = ge.Hidden) => {
    let f = n.current.findIndex(({ el: d }) => d === y);
    f !== -1 && (we(g, { [ge.Unmount]() {
      n.current.splice(f, 1);
    }, [ge.Hidden]() {
      n.current[f].state = "hidden";
    } }), a.microTask(() => {
      var d;
      !yt(n) && l.current && ((d = r.current) == null || d.call(r));
    }));
  }), u = A((y) => {
    let g = n.current.find(({ el: f }) => f === y);
    return g ? g.state !== "visible" && (g.state = "visible") : n.current.push({ el: y, state: "visible" }), () => s(y, ge.Unmount);
  }), i = j([]), p = j(Promise.resolve()), c = j({ enter: [], leave: [] }), w = A((y, g, f) => {
    i.current.splice(0), t && (t.chains.current[g] = t.chains.current[g].filter(([d]) => d !== y)), t == null || t.chains.current[g].push([y, new Promise((d) => {
      i.current.push(d);
    })]), t == null || t.chains.current[g].push([y, new Promise((d) => {
      Promise.all(c.current[g].map(([m, h]) => h)).then(() => d());
    })]), g === "enter" ? p.current = p.current.then(() => t == null ? void 0 : t.wait.current).then(() => f(g)) : f(g);
  }), x = A((y, g, f) => {
    Promise.all(c.current[g].splice(0).map(([d, m]) => m)).then(() => {
      var d;
      (d = i.current.shift()) == null || d();
    }).then(() => f(g));
  });
  return B(() => ({ children: n, register: u, unregister: s, onStart: w, onStop: x, wait: p, chains: c }), [u, s, n, w, x, c, p]);
}
let Kr = ue, zr = at.RenderStrategy;
function mo(e, t) {
  var r, n;
  let { transition: l = !0, beforeEnter: a, afterEnter: s, beforeLeave: u, afterLeave: i, enter: p, enterFrom: c, enterTo: w, entered: x, leave: y, leaveFrom: g, leaveTo: f, ...d } = e, [m, h] = V(null), E = j(null), T = Xr(e), F = ce(...T ? [E, t, h] : t === null ? [] : [t]), X = (r = d.unmount) == null || r ? ge.Unmount : ge.Hidden, { show: U, appear: ee, initial: te } = fo(), [H, q] = V(U ? "visible" : "hidden"), G = po(), { register: _, unregister: $ } = G;
  z(() => _(E), [_, E]), z(() => {
    if (X === ge.Hidden && E.current) {
      if (U && H !== "visible") {
        q("visible");
        return;
      }
      return we(H, { hidden: () => $(E), visible: () => _(E) });
    }
  }, [H, E, _, $, U, X]);
  let I = Qe();
  z(() => {
    if (T && I && H === "visible" && E.current === null) throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
  }, [E, H, I, T]);
  let be = te && !ee, xe = ee && U && te, ve = j(!1), re = qr(() => {
    ve.current || (q("hidden"), $(E));
  }, G), Ee = A((Pe) => {
    ve.current = !0;
    let de = Pe ? "enter" : "leave";
    re.onStart(E, de, (fe) => {
      fe === "enter" ? a == null || a() : fe === "leave" && (u == null || u());
    });
  }), N = A((Pe) => {
    let de = Pe ? "enter" : "leave";
    ve.current = !1, re.onStop(E, de, (fe) => {
      fe === "enter" ? s == null || s() : fe === "leave" && (i == null || i());
    }), de === "leave" && !yt(re) && (q("hidden"), $(E));
  });
  L(() => {
    T && l || (Ee(U), N(U));
  }, [U, T, l]);
  let Te = !(!l || !T || !I || be), [, Y] = Al(Te, m, U, { start: Ee, end: N }), xt = Se({ ref: F, className: ((n = _t(d.className, xe && p, xe && c, Y.enter && p, Y.enter && Y.closed && c, Y.enter && !Y.closed && w, Y.leave && y, Y.leave && !Y.closed && g, Y.leave && Y.closed && f, !Y.transition && U && x)) == null ? void 0 : n.trim()) || void 0, ...Ml(Y) }), Oe = 0;
  H === "visible" && (Oe |= se.Open), H === "hidden" && (Oe |= se.Closed), Y.enter && (Oe |= se.Opening), Y.leave && (Oe |= se.Closing);
  let Ie = ie();
  return O.createElement(wt.Provider, { value: re }, O.createElement(Dl, { value: Oe }, Ie({ ourProps: xt, theirProps: d, defaultTag: Kr, features: zr, visible: H === "visible", name: "Transition.Child" })));
}
function vo(e, t) {
  let { show: r, appear: n = !1, unmount: l = !0, ...a } = e, s = j(null), u = Xr(e), i = ce(...u ? [s, t] : t === null ? [] : [t]);
  Qe();
  let p = ht();
  if (r === void 0 && p !== null && (r = (p & se.Open) === se.Open), r === void 0) throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
  let [c, w] = V(r ? "visible" : "hidden"), x = qr(() => {
    r || w("hidden");
  }), [y, g] = V(!0), f = j([r]);
  z(() => {
    y !== !1 && f.current[f.current.length - 1] !== r && (f.current.push(r), g(!1));
  }, [f, r]);
  let d = B(() => ({ show: r, appear: n, initial: y }), [r, n, y]);
  z(() => {
    r ? w("visible") : !yt(x) && s.current !== null && w("hidden");
  }, [r, x]);
  let m = { unmount: l }, h = A(() => {
    var F;
    y && g(!1), (F = e.beforeEnter) == null || F.call(e);
  }), E = A(() => {
    var F;
    y && g(!1), (F = e.beforeLeave) == null || F.call(e);
  }), T = ie();
  return O.createElement(wt.Provider, { value: x }, O.createElement(gt.Provider, { value: d }, T({ ourProps: { ...m, as: ue, children: O.createElement(Gr, { ref: i, ...m, ...a, beforeEnter: h, beforeLeave: E }) }, theirProps: {}, defaultTag: ue, features: zr, visible: c === "visible", name: "Transition" })));
}
function ho(e, t) {
  let r = Z(gt) !== null, n = ht() !== null;
  return O.createElement(O.Fragment, null, !r && n ? O.createElement(Nt, { ref: t, ...e }) : O.createElement(Gr, { ref: t, ...e }));
}
let Nt = Q(vo), Gr = Q(mo), Le = Q(ho), Jr = Object.assign(Nt, { Child: Le, Root: Nt });
var go = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(go || {}), wo = ((e) => (e[e.SetTitleId = 0] = "SetTitleId", e))(wo || {});
let yo = { 0(e, t) {
  return e.titleId === t.id ? e : { ...e, titleId: t.id };
} }, Xt = oe(null);
Xt.displayName = "DialogContext";
function bt(e) {
  let t = Z(Xt);
  if (t === null) {
    let r = new Error(`<${e} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(r, bt), r;
  }
  return t;
}
function bo(e, t) {
  return we(t.type, yo, e, t);
}
let wr = Q(function(e, t) {
  let r = Je(), { id: n = `headlessui-dialog-${r}`, open: l, onClose: a, initialFocus: s, role: u = "dialog", autoFocus: i = !0, __demoMode: p = !1, unmount: c = !1, ...w } = e, x = j(!1);
  u = function() {
    return u === "dialog" || u === "alertdialog" ? u : (x.current || (x.current = !0, console.warn(`Invalid role [${u}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog");
  }();
  let y = ht();
  l === void 0 && y !== null && (l = (y & se.Open) === se.Open);
  let g = j(null), f = ce(g, t), d = Ze(g), m = l ? 0 : 1, [h, E] = kn(bo, { titleId: null, descriptionId: null, panelRef: jn() }), T = A(() => a(!1)), F = A((N) => E({ type: 0, id: N })), X = Qe() ? m === 0 : !1, [U, ee] = zl(), te = { get current() {
    var N;
    return (N = h.panelRef.current) != null ? N : g.current;
  } }, H = Br(), { resolveContainers: q } = eo({ mainTreeNode: H, portals: U, defaultContainers: [te] }), G = y !== null ? (y & se.Closing) === se.Closing : !1;
  fl(p || G ? !1 : X, { allowed: A(() => {
    var N, Te;
    return [(Te = (N = g.current) == null ? void 0 : N.closest("[data-headlessui-portal]")) != null ? Te : null];
  }), disallowed: A(() => {
    var N;
    return [(N = H == null ? void 0 : H.closest("body > *:not(#headlessui-portal-root)")) != null ? N : null];
  }) }), Pl(X, q, (N) => {
    N.preventDefault(), T();
  }), Zl(X, d == null ? void 0 : d.defaultView, (N) => {
    N.preventDefault(), N.stopPropagation(), document.activeElement && "blur" in document.activeElement && typeof document.activeElement.blur == "function" && document.activeElement.blur(), T();
  }), kl(p || G ? !1 : X, d, q), pl(X, g, T);
  let [_, $] = nl(), I = B(() => [{ dialogState: m, close: T, setTitleId: F, unmount: c }, h], [m, h, T, F, c]), be = B(() => ({ open: m === 0 }), [m]), xe = { ref: f, id: n, role: u, tabIndex: -1, "aria-modal": p ? void 0 : m === 0 ? !0 : void 0, "aria-labelledby": h.titleId, "aria-describedby": _, unmount: c }, ve = !Ql(), re = Ce.None;
  X && !p && (re |= Ce.RestoreFocus, re |= Ce.TabLock, i && (re |= Ce.AutoFocus), ve && (re |= Ce.InitialFocus));
  let Ee = ie();
  return O.createElement(Wl, null, O.createElement(hr, { force: !0 }, O.createElement(Jl, null, O.createElement(Xt.Provider, { value: I }, O.createElement(Ur, { target: g }, O.createElement(hr, { force: !1 }, O.createElement($, { slot: be }, O.createElement(ee, null, O.createElement(oo, { initialFocus: s, initialFocusFallback: g, containers: q, features: re }, O.createElement(ul, { value: T }, Ee({ ourProps: xe, theirProps: w, slot: be, defaultTag: xo, features: Eo, visible: m === 0, name: "Dialog" })))))))))));
}), xo = "div", Eo = at.RenderStrategy | at.Static;
function To(e, t) {
  let { transition: r = !1, open: n, ...l } = e, a = ht(), s = e.hasOwnProperty("open") || a !== null, u = e.hasOwnProperty("onClose");
  if (!s && !u) throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");
  if (!s) throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");
  if (!u) throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");
  if (!a && typeof e.open != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${e.open}`);
  if (typeof e.onClose != "function") throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${e.onClose}`);
  return (n !== void 0 || r) && !l.static ? O.createElement(gr, null, O.createElement(Jr, { show: n, transition: r, unmount: l.unmount }, O.createElement(wr, { ref: t, ...l }))) : O.createElement(gr, null, O.createElement(wr, { ref: t, open: n, ...l }));
}
let Oo = "div";
function Po(e, t) {
  let r = Je(), { id: n = `headlessui-dialog-panel-${r}`, transition: l = !1, ...a } = e, [{ dialogState: s, unmount: u }, i] = bt("Dialog.Panel"), p = ce(t, i.panelRef), c = B(() => ({ open: s === 0 }), [s]), w = A((d) => {
    d.stopPropagation();
  }), x = { ref: p, id: n, onClick: w }, y = l ? Le : ue, g = l ? { unmount: u } : {}, f = ie();
  return O.createElement(y, { ...g }, f({ ourProps: x, theirProps: a, slot: c, defaultTag: Oo, name: "Dialog.Panel" }));
}
let Ro = "div";
function So(e, t) {
  let { transition: r = !1, ...n } = e, [{ dialogState: l, unmount: a }] = bt("Dialog.Backdrop"), s = B(() => ({ open: l === 0 }), [l]), u = { ref: t, "aria-hidden": !0 }, i = r ? Le : ue, p = r ? { unmount: a } : {}, c = ie();
  return O.createElement(i, { ...p }, c({ ourProps: u, theirProps: n, slot: s, defaultTag: Ro, name: "Dialog.Backdrop" }));
}
let Co = "h2";
function $o(e, t) {
  let r = Je(), { id: n = `headlessui-dialog-title-${r}`, ...l } = e, [{ dialogState: a, setTitleId: s }] = bt("Dialog.Title"), u = ce(t);
  L(() => (s(n), () => s(null)), [n, s]);
  let i = B(() => ({ open: a === 0 }), [a]), p = { ref: u, id: n };
  return ie()({ ourProps: p, theirProps: l, slot: i, defaultTag: Co, name: "Dialog.Title" });
}
let Fo = Q(To), qt = Q(Po);
Q(So);
let ko = Q($o), jo = Object.assign(Fo, { Panel: qt, Title: ko, Description: al });
function Zr({ onClick: e }) {
  return /* @__PURE__ */ R.jsxs(
    "button",
    {
      type: "button",
      className: "im-close-button text-gray-400 hover:text-gray-500",
      onClick: e,
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
const _o = ({ modalContext: e, config: t, children: r }) => /* @__PURE__ */ R.jsx("div", { className: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4", children: /* @__PURE__ */ R.jsx(
  "div",
  {
    className: it("im-modal-positioner flex min-h-full justify-center", {
      "items-start": t.position === "top",
      "items-center": t.position === "center",
      "items-end": t.position === "bottom"
    }),
    children: /* @__PURE__ */ R.jsx(
      Le,
      {
        enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
        enterTo: "opacity-100 translate-y-0 sm:scale-100",
        leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
        leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
        afterLeave: e.afterLeave,
        className: it("im-modal-wrapper w-full transition duration-300 ease-in-out", e.onTopOfStack ? "" : "blur-sm", {
          "sm:max-w-sm": t.maxWidth === "sm",
          "sm:max-w-md": t.maxWidth === "md",
          "sm:max-w-md md:max-w-lg": t.maxWidth === "lg",
          "sm:max-w-md md:max-w-xl": t.maxWidth === "xl",
          "sm:max-w-md md:max-w-xl lg:max-w-2xl": t.maxWidth === "2xl",
          "sm:max-w-md md:max-w-xl lg:max-w-3xl": t.maxWidth === "3xl",
          "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl": t.maxWidth === "4xl",
          "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl": t.maxWidth === "5xl",
          "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl": t.maxWidth === "6xl",
          "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl": t.maxWidth === "7xl"
        }),
        children: /* @__PURE__ */ R.jsxs(qt, { className: `im-modal-content relative ${t.paddingClasses} ${t.panelClasses}`, children: [
          t.closeButton && /* @__PURE__ */ R.jsx("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ R.jsx(Zr, { onClick: e.close }) }),
          typeof r == "function" ? r({ modalContext: e, config: t }) : r
        ] })
      }
    )
  }
) }), Mo = ({ modalContext: e, config: t, children: r }) => /* @__PURE__ */ R.jsx("div", { className: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ R.jsx(
  "div",
  {
    className: it("im-slideover-positioner flex min-h-full items-center", {
      "justify-start": t.position === "left",
      "justify-end": t.position === "right"
    }),
    children: /* @__PURE__ */ R.jsx(
      Le,
      {
        enterFrom: `opacity-0 ${t.position === "left" ? "-translate-x-full" : "translate-x-full"}`,
        enterTo: "opacity-100 translate-x-0",
        leaveFrom: "opacity-100 translate-x-0",
        leaveTo: `opacity-0 ${t.position === "left" ? "-translate-x-full" : "translate-x-full"}`,
        afterLeave: e.afterLeave,
        className: it("im-slideover-wrapper w-full transition duration-300 ease-in-out", e.onTopOfStack ? "" : "blur-sm", {
          "sm:max-w-sm": t.maxWidth === "sm",
          "sm:max-w-md": t.maxWidth === "md",
          "sm:max-w-md md:max-w-lg": t.maxWidth === "lg",
          "sm:max-w-md md:max-w-xl": t.maxWidth === "xl",
          "sm:max-w-md md:max-w-xl lg:max-w-2xl": t.maxWidth === "2xl",
          "sm:max-w-md md:max-w-xl lg:max-w-3xl": t.maxWidth === "3xl",
          "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl": t.maxWidth === "4xl",
          "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl": t.maxWidth === "5xl",
          "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl": t.maxWidth === "6xl",
          "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl": t.maxWidth === "7xl"
        }),
        children: /* @__PURE__ */ R.jsxs(qt, { className: `im-slideover-content relative ${t.paddingClasses} ${t.panelClasses}`, children: [
          t.closeButton && /* @__PURE__ */ R.jsx("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ R.jsx(Zr, { onClick: e.close }) }),
          typeof r == "function" ? r({ modalContext: e, config: t }) : r
        ] })
      }
    )
  }
) }), Ao = Dt(({ name: e, children: t, ...r }, n) => {
  const l = (s) => typeof t == "function" ? t(s) : t, a = j(null);
  return yr(n, () => a.current, [a]), /* @__PURE__ */ R.jsx(
    Pr,
    {
      ref: a,
      name: e,
      ...r,
      children: ({
        afterLeave: s,
        close: u,
        config: i,
        emit: p,
        getChildModal: c,
        getParentModal: w,
        id: x,
        index: y,
        isOpen: g,
        modalContext: f,
        onTopOfStack: d,
        reload: m,
        setOpen: h,
        shouldRender: E
      }) => /* @__PURE__ */ R.jsx(
        Jr,
        {
          appear: !0,
          show: g ?? !1,
          children: /* @__PURE__ */ R.jsxs(
            jo,
            {
              as: "div",
              className: "im-dialog relative z-20",
              onClose: () => i.closeExplicitly ? null : u(),
              "data-inertiaui-modal-id": x,
              "data-inertiaui-modal-index": y,
              children: [
                y === 0 ? /* @__PURE__ */ R.jsx(
                  Le,
                  {
                    enter: "transition transform ease-in-out duration-300",
                    enterFrom: "opacity-0",
                    enterTo: "opacity-100",
                    leave: "transition transform ease-in-out duration-300",
                    leaveFrom: "opacity-100",
                    leaveTo: "opacity-0",
                    children: d ? /* @__PURE__ */ R.jsx(
                      "div",
                      {
                        className: "im-backdrop fixed inset-0 z-30 bg-black/75",
                        "aria-hidden": "true"
                      }
                    ) : /* @__PURE__ */ R.jsx("div", {})
                  }
                ) : null,
                y > 0 && d ? /* @__PURE__ */ R.jsx("div", { className: "im-backdrop fixed inset-0 z-30 bg-black/75" }) : null,
                i.slideover ? /* @__PURE__ */ R.jsx(
                  Mo,
                  {
                    modalContext: f,
                    config: i,
                    children: l({
                      afterLeave: s,
                      close: u,
                      config: i,
                      emit: p,
                      getChildModal: c,
                      getParentModal: w,
                      id: x,
                      index: y,
                      isOpen: g,
                      modalContext: f,
                      onTopOfStack: d,
                      reload: m,
                      setOpen: h,
                      shouldRender: E
                    })
                  }
                ) : /* @__PURE__ */ R.jsx(
                  _o,
                  {
                    modalContext: f,
                    config: i,
                    children: l({
                      afterLeave: s,
                      close: u,
                      config: i,
                      emit: p,
                      getChildModal: c,
                      getParentModal: w,
                      id: x,
                      index: y,
                      isOpen: g,
                      modalContext: f,
                      onTopOfStack: d,
                      reload: m,
                      setOpen: h,
                      shouldRender: E
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
Ao.displayName = "Modal";
const qo = ({
  href: e,
  method: t = "get",
  data: r = {},
  as: n = "a",
  headers: l = {},
  queryStringArrayFormat: a = "brackets",
  onAfterLeave: s = null,
  onBlur: u = null,
  onClose: i = null,
  onError: p = null,
  onFocus: c = null,
  onStart: w = null,
  onSuccess: x = null,
  navigate: y = null,
  children: g,
  ...f
}) => {
  const [d, m] = V(!1), [h, E] = V(null), { stack: T, visit: F } = ft(), X = B(() => y ?? Wt("navigate"), [y]), U = {}, ee = {};
  Object.keys(f).forEach(($) => {
    cr.includes($) || ($.startsWith("on") && typeof f[$] == "function" ? $.toLowerCase() in window ? U[$] = f[$] : ee[$] = f[$] : U[$] = f[$]);
  });
  const [te, H] = V(!1);
  L(() => {
    h && (h.onTopOfStack && te ? c == null || c() : !h.onTopOfStack && !te && (u == null || u()), H(!h.onTopOfStack));
  }, [T]);
  const q = ae(() => {
    i == null || i();
  }, [i]), G = ae(() => {
    E(null), s == null || s();
  }, [s]), _ = ae(
    ($) => {
      $ == null || $.preventDefault(), !d && (e.startsWith("#") || (m(!0), w == null || w()), F(
        e,
        t,
        r,
        l,
        Wn(br(f, cr)),
        () => q(T.length),
        G,
        a,
        X
      ).then((I) => {
        E(I), I.registerEventListenersFromProps(ee), x == null || x();
      }).catch((I) => {
        console.error(I), p == null || p(I);
      }).finally(() => m(!1)));
    },
    [e, t, r, l, a, f, q, G]
  );
  return /* @__PURE__ */ R.jsx(
    n,
    {
      ...U,
      href: e,
      onClick: _,
      children: typeof g == "function" ? g({ loading: d }) : g
    }
  );
};
function Ko() {
  return ft().stack[Tr()] ?? null;
}
const zo = (e) => (t) => (t.default.layout = (r) => lt(e, {}, r), t);
export {
  Pr as HeadlessModal,
  Ao as Modal,
  qo as ModalLink,
  Vn as ModalRoot,
  Hn as ModalStackProvider,
  Wt as getConfig,
  Bn as initFromPageProps,
  Bo as putConfig,
  Vo as renderApp,
  Ho as resetConfig,
  zo as setPageLayout,
  Ko as useModal,
  Tr as useModalIndex,
  ft as useModalStack
};
