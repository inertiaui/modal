var Rn = Object.defineProperty;
var Pn = (e, t, r) => t in e ? Rn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var le = (e, t, r) => Pn(e, typeof t != "symbol" ? t + "" : t, r);
import * as qe from "react";
import R, { createContext as ie, useState as V, useEffect as D, useContext as Z, useRef as j, createElement as Ct, useMemo as B, forwardRef as Dt, useImperativeHandle as yr, useLayoutEffect as Sn, useCallback as oe, Fragment as ue, isValidElement as $n, cloneElement as Cn, useId as Je, useSyncExternalStore as Fn, useReducer as kn, createRef as jn } from "react";
import lt from "axios";
import { router as Ye, usePage as Mn } from "@inertiajs/react";
import { mergeDataIntoQueryString as _n } from "@inertiajs/core";
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
    for (let o = 0; o < n.length - 1; o++)
      l = l[n[o]] = l[n[o]] || {};
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
const ut = new Ln(), Di = () => ut.reset(), Wi = (e, t) => ut.put(e, t), Wt = (e) => ut.get(e), _e = (e, t) => ut.get(e ? `slideover.${t}` : `modal.${t}`);
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
  var e = R, t = Symbol.for("react.element"), r = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, l = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = { key: !0, ref: !0, __self: !0, __source: !0 };
  function s(c, a, d) {
    var u, g = {}, E = null, w = null;
    d !== void 0 && (E = "" + d), a.key !== void 0 && (E = "" + a.key), a.ref !== void 0 && (w = a.ref);
    for (u in a) n.call(a, u) && !o.hasOwnProperty(u) && (g[u] = a[u]);
    if (c && c.defaultProps) for (u in a = c.defaultProps, a) g[u] === void 0 && (g[u] = a[u]);
    return { $$typeof: t, type: c, key: E, ref: w, props: g, _owner: l.current };
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
    var e = R, t = Symbol.for("react.element"), r = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), s = Symbol.for("react.provider"), c = Symbol.for("react.context"), a = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), g = Symbol.for("react.memo"), E = Symbol.for("react.lazy"), w = Symbol.for("react.offscreen"), y = Symbol.iterator, h = "@@iterator";
    function f(i) {
      if (i === null || typeof i != "object")
        return null;
      var m = y && i[y] || i[h];
      return typeof m == "function" ? m : null;
    }
    var p = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function v(i) {
      {
        for (var m = arguments.length, b = new Array(m > 1 ? m - 1 : 0), O = 1; O < m; O++)
          b[O - 1] = arguments[O];
        x("error", i, b);
      }
    }
    function x(i, m, b) {
      {
        var O = p.ReactDebugCurrentFrame, k = O.getStackAddendum();
        k !== "" && (m += "%s", b = b.concat([k]));
        var _ = b.map(function($) {
          return String($);
        });
        _.unshift("Warning: " + m), Function.prototype.apply.call(console[i], console, _);
      }
    }
    var T = !1, F = !1, X = !1, U = !1, ee = !1, te;
    te = Symbol.for("react.module.reference");
    function H(i) {
      return !!(typeof i == "string" || typeof i == "function" || i === n || i === o || ee || i === l || i === d || i === u || U || i === w || T || F || X || typeof i == "object" && i !== null && (i.$$typeof === E || i.$$typeof === g || i.$$typeof === s || i.$$typeof === c || i.$$typeof === a || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      i.$$typeof === te || i.getModuleId !== void 0));
    }
    function q(i, m, b) {
      var O = i.displayName;
      if (O)
        return O;
      var k = m.displayName || m.name || "";
      return k !== "" ? b + "(" + k + ")" : b;
    }
    function K(i) {
      return i.displayName || "Context";
    }
    function M(i) {
      if (i == null)
        return null;
      if (typeof i.tag == "number" && v("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof i == "function")
        return i.displayName || i.name || null;
      if (typeof i == "string")
        return i;
      switch (i) {
        case n:
          return "Fragment";
        case r:
          return "Portal";
        case o:
          return "Profiler";
        case l:
          return "StrictMode";
        case d:
          return "Suspense";
        case u:
          return "SuspenseList";
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case c:
            var m = i;
            return K(m) + ".Consumer";
          case s:
            var b = i;
            return K(b._context) + ".Provider";
          case a:
            return q(i, i.render, "ForwardRef");
          case g:
            var O = i.displayName || null;
            return O !== null ? O : M(i.type) || "Memo";
          case E: {
            var k = i, _ = k._payload, $ = k._init;
            try {
              return M($(_));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var C = Object.assign, L = 0, be, Ee, ve, re, xe, I, Te;
    function Y() {
    }
    Y.__reactDisabledLog = !0;
    function bt() {
      {
        if (L === 0) {
          be = console.log, Ee = console.info, ve = console.warn, re = console.error, xe = console.group, I = console.groupCollapsed, Te = console.groupEnd;
          var i = {
            configurable: !0,
            enumerable: !0,
            value: Y,
            writable: !0
          };
          Object.defineProperties(console, {
            info: i,
            log: i,
            warn: i,
            error: i,
            group: i,
            groupCollapsed: i,
            groupEnd: i
          });
        }
        L++;
      }
    }
    function Oe() {
      {
        if (L--, L === 0) {
          var i = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: C({}, i, {
              value: be
            }),
            info: C({}, i, {
              value: Ee
            }),
            warn: C({}, i, {
              value: ve
            }),
            error: C({}, i, {
              value: re
            }),
            group: C({}, i, {
              value: xe
            }),
            groupCollapsed: C({}, i, {
              value: I
            }),
            groupEnd: C({}, i, {
              value: Te
            })
          });
        }
        L < 0 && v("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ie = p.ReactCurrentDispatcher, Re;
    function de(i, m, b) {
      {
        if (Re === void 0)
          try {
            throw Error();
          } catch (k) {
            var O = k.stack.trim().match(/\n( *(at )?)/);
            Re = O && O[1] || "";
          }
        return `
` + Re + i;
      }
    }
    var fe = !1, et;
    {
      var Qr = typeof WeakMap == "function" ? WeakMap : Map;
      et = new Qr();
    }
    function zt(i, m) {
      if (!i || fe)
        return "";
      {
        var b = et.get(i);
        if (b !== void 0)
          return b;
      }
      var O;
      fe = !0;
      var k = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var _;
      _ = Ie.current, Ie.current = null, bt();
      try {
        if (m) {
          var $ = function() {
            throw Error();
          };
          if (Object.defineProperty($.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct($, []);
            } catch (J) {
              O = J;
            }
            Reflect.construct(i, [], $);
          } else {
            try {
              $.call();
            } catch (J) {
              O = J;
            }
            i.call($.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (J) {
            O = J;
          }
          i();
        }
      } catch (J) {
        if (J && O && typeof J.stack == "string") {
          for (var S = J.stack.split(`
`), z = O.stack.split(`
`), N = S.length - 1, W = z.length - 1; N >= 1 && W >= 0 && S[N] !== z[W]; )
            W--;
          for (; N >= 1 && W >= 0; N--, W--)
            if (S[N] !== z[W]) {
              if (N !== 1 || W !== 1)
                do
                  if (N--, W--, W < 0 || S[N] !== z[W]) {
                    var ne = `
` + S[N].replace(" at new ", " at ");
                    return i.displayName && ne.includes("<anonymous>") && (ne = ne.replace("<anonymous>", i.displayName)), typeof i == "function" && et.set(i, ne), ne;
                  }
                while (N >= 1 && W >= 0);
              break;
            }
        }
      } finally {
        fe = !1, Ie.current = _, Oe(), Error.prepareStackTrace = k;
      }
      var Me = i ? i.displayName || i.name : "", Pe = Me ? de(Me) : "";
      return typeof i == "function" && et.set(i, Pe), Pe;
    }
    function en(i, m, b) {
      return zt(i, !1);
    }
    function tn(i) {
      var m = i.prototype;
      return !!(m && m.isReactComponent);
    }
    function tt(i, m, b) {
      if (i == null)
        return "";
      if (typeof i == "function")
        return zt(i, tn(i));
      if (typeof i == "string")
        return de(i);
      switch (i) {
        case d:
          return de("Suspense");
        case u:
          return de("SuspenseList");
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case a:
            return en(i.render);
          case g:
            return tt(i.type, m, b);
          case E: {
            var O = i, k = O._payload, _ = O._init;
            try {
              return tt(_(k), m, b);
            } catch {
            }
          }
        }
      return "";
    }
    var Ne = Object.prototype.hasOwnProperty, Gt = {}, Kt = p.ReactDebugCurrentFrame;
    function rt(i) {
      if (i) {
        var m = i._owner, b = tt(i.type, i._source, m ? m.type : null);
        Kt.setExtraStackFrame(b);
      } else
        Kt.setExtraStackFrame(null);
    }
    function rn(i, m, b, O, k) {
      {
        var _ = Function.call.bind(Ne);
        for (var $ in i)
          if (_(i, $)) {
            var S = void 0;
            try {
              if (typeof i[$] != "function") {
                var z = Error((O || "React class") + ": " + b + " type `" + $ + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[$] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw z.name = "Invariant Violation", z;
              }
              S = i[$](m, $, O, b, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (N) {
              S = N;
            }
            S && !(S instanceof Error) && (rt(k), v("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", O || "React class", b, $, typeof S), rt(null)), S instanceof Error && !(S.message in Gt) && (Gt[S.message] = !0, rt(k), v("Failed %s type: %s", b, S.message), rt(null));
          }
      }
    }
    var nn = Array.isArray;
    function Et(i) {
      return nn(i);
    }
    function ln(i) {
      {
        var m = typeof Symbol == "function" && Symbol.toStringTag, b = m && i[Symbol.toStringTag] || i.constructor.name || "Object";
        return b;
      }
    }
    function an(i) {
      try {
        return Jt(i), !1;
      } catch {
        return !0;
      }
    }
    function Jt(i) {
      return "" + i;
    }
    function Zt(i) {
      if (an(i))
        return v("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ln(i)), Jt(i);
    }
    var De = p.ReactCurrentOwner, on = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Qt, er, xt;
    xt = {};
    function sn(i) {
      if (Ne.call(i, "ref")) {
        var m = Object.getOwnPropertyDescriptor(i, "ref").get;
        if (m && m.isReactWarning)
          return !1;
      }
      return i.ref !== void 0;
    }
    function un(i) {
      if (Ne.call(i, "key")) {
        var m = Object.getOwnPropertyDescriptor(i, "key").get;
        if (m && m.isReactWarning)
          return !1;
      }
      return i.key !== void 0;
    }
    function cn(i, m) {
      if (typeof i.ref == "string" && De.current && m && De.current.stateNode !== m) {
        var b = M(De.current.type);
        xt[b] || (v('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', M(De.current.type), i.ref), xt[b] = !0);
      }
    }
    function dn(i, m) {
      {
        var b = function() {
          Qt || (Qt = !0, v("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", m));
        };
        b.isReactWarning = !0, Object.defineProperty(i, "key", {
          get: b,
          configurable: !0
        });
      }
    }
    function fn(i, m) {
      {
        var b = function() {
          er || (er = !0, v("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", m));
        };
        b.isReactWarning = !0, Object.defineProperty(i, "ref", {
          get: b,
          configurable: !0
        });
      }
    }
    var pn = function(i, m, b, O, k, _, $) {
      var S = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: i,
        key: m,
        ref: b,
        props: $,
        // Record the component responsible for creating this element.
        _owner: _
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
        value: O
      }), Object.defineProperty(S, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: k
      }), Object.freeze && (Object.freeze(S.props), Object.freeze(S)), S;
    };
    function mn(i, m, b, O, k) {
      {
        var _, $ = {}, S = null, z = null;
        b !== void 0 && (Zt(b), S = "" + b), un(m) && (Zt(m.key), S = "" + m.key), sn(m) && (z = m.ref, cn(m, k));
        for (_ in m)
          Ne.call(m, _) && !on.hasOwnProperty(_) && ($[_] = m[_]);
        if (i && i.defaultProps) {
          var N = i.defaultProps;
          for (_ in N)
            $[_] === void 0 && ($[_] = N[_]);
        }
        if (S || z) {
          var W = typeof i == "function" ? i.displayName || i.name || "Unknown" : i;
          S && dn($, W), z && fn($, W);
        }
        return pn(i, S, z, k, O, De.current, $);
      }
    }
    var Tt = p.ReactCurrentOwner, tr = p.ReactDebugCurrentFrame;
    function je(i) {
      if (i) {
        var m = i._owner, b = tt(i.type, i._source, m ? m.type : null);
        tr.setExtraStackFrame(b);
      } else
        tr.setExtraStackFrame(null);
    }
    var Ot;
    Ot = !1;
    function Rt(i) {
      return typeof i == "object" && i !== null && i.$$typeof === t;
    }
    function rr() {
      {
        if (Tt.current) {
          var i = M(Tt.current.type);
          if (i)
            return `

Check the render method of \`` + i + "`.";
        }
        return "";
      }
    }
    function vn(i) {
      return "";
    }
    var nr = {};
    function hn(i) {
      {
        var m = rr();
        if (!m) {
          var b = typeof i == "string" ? i : i.displayName || i.name;
          b && (m = `

Check the top-level render call using <` + b + ">.");
        }
        return m;
      }
    }
    function lr(i, m) {
      {
        if (!i._store || i._store.validated || i.key != null)
          return;
        i._store.validated = !0;
        var b = hn(m);
        if (nr[b])
          return;
        nr[b] = !0;
        var O = "";
        i && i._owner && i._owner !== Tt.current && (O = " It was passed a child from " + M(i._owner.type) + "."), je(i), v('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', b, O), je(null);
      }
    }
    function ir(i, m) {
      {
        if (typeof i != "object")
          return;
        if (Et(i))
          for (var b = 0; b < i.length; b++) {
            var O = i[b];
            Rt(O) && lr(O, m);
          }
        else if (Rt(i))
          i._store && (i._store.validated = !0);
        else if (i) {
          var k = f(i);
          if (typeof k == "function" && k !== i.entries)
            for (var _ = k.call(i), $; !($ = _.next()).done; )
              Rt($.value) && lr($.value, m);
        }
      }
    }
    function gn(i) {
      {
        var m = i.type;
        if (m == null || typeof m == "string")
          return;
        var b;
        if (typeof m == "function")
          b = m.propTypes;
        else if (typeof m == "object" && (m.$$typeof === a || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        m.$$typeof === g))
          b = m.propTypes;
        else
          return;
        if (b) {
          var O = M(m);
          rn(b, i.props, "prop", O, i);
        } else if (m.PropTypes !== void 0 && !Ot) {
          Ot = !0;
          var k = M(m);
          v("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", k || "Unknown");
        }
        typeof m.getDefaultProps == "function" && !m.getDefaultProps.isReactClassApproved && v("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function wn(i) {
      {
        for (var m = Object.keys(i.props), b = 0; b < m.length; b++) {
          var O = m[b];
          if (O !== "children" && O !== "key") {
            je(i), v("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", O), je(null);
            break;
          }
        }
        i.ref !== null && (je(i), v("Invalid attribute `ref` supplied to `React.Fragment`."), je(null));
      }
    }
    var ar = {};
    function or(i, m, b, O, k, _) {
      {
        var $ = H(i);
        if (!$) {
          var S = "";
          (i === void 0 || typeof i == "object" && i !== null && Object.keys(i).length === 0) && (S += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var z = vn();
          z ? S += z : S += rr();
          var N;
          i === null ? N = "null" : Et(i) ? N = "array" : i !== void 0 && i.$$typeof === t ? (N = "<" + (M(i.type) || "Unknown") + " />", S = " Did you accidentally export a JSX literal instead of a component?") : N = typeof i, v("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", N, S);
        }
        var W = mn(i, m, b, k, _);
        if (W == null)
          return W;
        if ($) {
          var ne = m.children;
          if (ne !== void 0)
            if (O)
              if (Et(ne)) {
                for (var Me = 0; Me < ne.length; Me++)
                  ir(ne[Me], i);
                Object.freeze && Object.freeze(ne);
              } else
                v("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              ir(ne, i);
        }
        if (Ne.call(m, "key")) {
          var Pe = M(i), J = Object.keys(m).filter(function(On) {
            return On !== "key";
          }), Pt = J.length > 0 ? "{key: someKey, " + J.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!ar[Pe + Pt]) {
            var Tn = J.length > 0 ? "{" + J.join(": ..., ") + ": ...}" : "{}";
            v(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Pt, Pe, Tn, Pe), ar[Pe + Pt] = !0;
          }
        }
        return i === n ? wn(W) : gn(W), W;
      }
    }
    function yn(i, m, b) {
      return or(i, m, b, !0);
    }
    function bn(i, m, b) {
      return or(i, m, b, !1);
    }
    var En = bn, xn = yn;
    He.Fragment = n, He.jsx = En, He.jsxs = xn;
  }()), He;
}
process.env.NODE_ENV === "production" ? Ft.exports = In() : Ft.exports = Nn();
var P = Ft.exports;
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
    const o = e();
    if (o) {
      n(o);
      return;
    }
    let s = t * 1e3 / r;
    const c = setInterval(() => {
      const a = e();
      a && (clearInterval(c), n(a)), --s <= 0 && (clearInterval(c), l(new Error("Condition not met in time")));
    }, r);
  });
}
function Be(e) {
  return e ? (e = e.replace(/_/g, "-"), e = e.replace(/-+/g, "-"), /[A-Z]/.test(e) ? (e = e.replace(/\s+/g, "").replace(/_/g, "").replace(/(?:^|\s|-)+([A-Za-z])/g, (t, r) => r.toUpperCase()), e = e.replace(/(.)(?=[A-Z])/g, "$1-"), e.toLowerCase()) : e) : "";
}
const ct = ie(null);
ct.displayName = "ModalStackContext";
let Er = null, xr = null, ze = null, kt = null, jt = [];
const Hn = ({ children: e }) => {
  const [t, r] = V([]), [n, l] = V({}), o = (h) => {
    r((f) => {
      const p = h([...f]), v = (x) => {
        var T;
        return p.length < 2 ? !0 : ((T = p.map((F) => ({ id: F.id, shouldRender: F.shouldRender })).reverse().find((F) => F.shouldRender)) == null ? void 0 : T.id) === x;
      };
      return p.forEach((x, T) => {
        p[T].onTopOfStack = v(x.id), p[T].getParentModal = () => T < 1 ? null : p.slice(0, T).reverse().find((F) => F.isOpen), p[T].getChildModal = () => T === p.length - 1 ? null : p.slice(T + 1).find((F) => F.isOpen);
      }), p;
    });
  };
  D(() => {
    jt = t;
  }, [t]);
  class s {
    constructor(f, p, v, x, T) {
      le(this, "update", (f, p, v) => {
        o(
          (x) => x.map((T) => (T.id === this.id && (T.config = f, T.onCloseCallback = p, T.afterLeaveCallback = v), T))
        );
      });
      le(this, "show", () => {
        o(
          (f) => f.map((p) => (p.id === this.id && !p.isOpen && (p.isOpen = !0, p.shouldRender = !0), p))
        );
      });
      le(this, "setOpen", (f) => {
        f ? this.show() : this.close();
      });
      le(this, "close", () => {
        o(
          (f) => f.map((p) => {
            var v;
            return p.id === this.id && p.isOpen && (Object.keys(p.listeners).forEach((x) => {
              p.off(x);
            }), p.isOpen = !1, (v = p.onCloseCallback) == null || v.call(p)), p;
          })
        );
      });
      le(this, "afterLeave", () => {
        this.isOpen || o((f) => {
          const p = f.map((v) => {
            var x;
            return v.id === this.id && !v.isOpen && (v.shouldRender = !1, (x = v.afterLeaveCallback) == null || x.call(v), v.afterLeaveCallback = null), v;
          });
          return this.index === 0 ? [] : p;
        });
      });
      le(this, "on", (f, p) => {
        f = Be(f), this.listeners[f] = this.listeners[f] ?? [], this.listeners[f].push(p);
      });
      le(this, "off", (f, p) => {
        var v;
        f = Be(f), p ? this.listeners[f] = ((v = this.listeners[f]) == null ? void 0 : v.filter((x) => x !== p)) ?? [] : delete this.listeners[f];
      });
      le(this, "emit", (f, ...p) => {
        var v;
        (v = this.listeners[Be(f)]) == null || v.forEach((x) => x(...p));
      });
      le(this, "registerEventListenersFromProps", (f) => {
        const p = [];
        return Object.keys(f).filter((v) => v.startsWith("on")).forEach((v) => {
          const x = Be(v).replace(/^on-/, "");
          this.on(x, f[v]), p.push(() => this.off(x, f[v]));
        }), () => p.forEach((v) => v());
      });
      le(this, "reload", (f = {}) => {
        var v;
        let p = Object.keys(this.response.props);
        f.only && (p = br(p, f.only)), f.except && (p = Dn(p, f.except)), (v = this.response) != null && v.url && lt.get(this.response.url, {
          headers: {
            Accept: "text/html, application/xhtml+xml",
            "X-Inertia": !0,
            "X-Inertia-Partial-Component": this.response.component,
            "X-Inertia-Version": this.response.version,
            "X-Inertia-Partial-Data": p.join(","),
            "X-InertiaUI-Modal": !0,
            "X-InertiaUI-Modal-Use-Router": 0,
            "X-InertiaUI-Modal-Base-Url": ze
          }
        }).then((x) => {
          this.updateProps(x.data.props);
        });
      });
      le(this, "updateProps", (f) => {
        Object.assign(this.props, f), o((p) => p);
      });
      this.id = s.generateId(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = f, this.props = p.props, this.response = p, this.config = v, this.onCloseCallback = x, this.afterLeaveCallback = T, this.index = -1, this.getParentModal = () => null, this.getChildModal = () => null, this.onTopOfStack = !0;
    }
    static generateId() {
      return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `inertiaui_modal_${crypto.randomUUID()}` : `inertiaui_modal_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
    }
  }
  const c = (h, f = {}, p = null, v = null) => xr(h.component).then((x) => a(x, h, f, p, v)), a = (h, f, p, v, x) => {
    const T = new s(h, f, p, v, x);
    return T.index = t.length, o((F) => [...F, T]), T.show(), T;
  };
  function d(h, f, p, v) {
    if (!n[h])
      throw new Error(`The local modal "${h}" has not been registered.`);
    const x = a(null, {}, f, p, v);
    return x.name = h, n[h].callback(x), x;
  }
  const u = (h, f = {}) => g(
    h,
    f.method ?? "get",
    f.data ?? {},
    f.headers ?? {},
    f.config ?? {},
    f.onClose,
    f.onAfterLeave,
    f.queryStringArrayFormat ?? "brackets",
    f.navigate ?? Wt("navigate")
  ).then((p) => {
    const v = f.listeners ?? {};
    return Object.keys(v).forEach((x) => {
      const T = Be(x);
      p.on(T, v[x]);
    }), p;
  }), g = (h, f, p = {}, v = {}, x = {}, T = null, F = null, X = "brackets", U = !1) => new Promise((ee, te) => {
    if (h.startsWith("#")) {
      ee(d(h.substring(1), x, T, F));
      return;
    }
    const [H, q] = _n(f, h || "", p, X);
    let K = U && t.length === 0;
    if (t.length === 0 && (ze = typeof window < "u" ? window.location.href : ""), v = {
      ...v,
      Accept: "text/html, application/xhtml+xml",
      "X-Requested-With": "XMLHttpRequest",
      "X-Inertia": !0,
      "X-Inertia-Version": Er,
      "X-InertiaUI-Modal": !0,
      "X-InertiaUI-Modal-Use-Router": K ? 1 : 0,
      "X-InertiaUI-Modal-Base-Url": ze
    }, K)
      return kt = null, Ye.visit(H, {
        method: f,
        data: q,
        headers: v,
        preserveScroll: !0,
        preserveState: !0,
        onError: te,
        onFinish: () => {
          Un(() => kt).then((M) => {
            const C = M.onCloseCallback, L = M.afterLeaveCallback;
            M.update(
              x,
              () => {
                T == null || T(), C == null || C();
              },
              () => {
                F == null || F(), L == null || L();
              }
            ), ee(M);
          });
        }
      });
    lt({
      url: H,
      method: f,
      data: q,
      headers: v
    }).then((M) => ee(c(M.data, x, T, F))).catch((M) => {
      te(M);
    });
  }), y = {
    stack: t,
    localModals: n,
    push: a,
    pushFromResponseData: c,
    closeAll: () => {
      jt.reverse().forEach((h) => h.close());
    },
    reset: () => o(() => []),
    visit: g,
    visitModal: u,
    registerLocalModal: (h, f) => {
      l((p) => ({
        ...p,
        [h]: { name: h, callback: f }
      }));
    },
    removeLocalModal: (h) => {
      l((f) => {
        const p = { ...f };
        return delete p[h], p;
      });
    }
  };
  return /* @__PURE__ */ P.jsx(ct.Provider, { value: y, children: e });
}, dt = () => {
  const e = Z(ct);
  if (e === null)
    throw new Error("useModalStack must be used within a ModalStackProvider");
  return e;
}, cr = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], Ui = (e, t) => {
  t.initialPage && (Er = t.initialPage.version), t.resolveComponent && (xr = t.resolveComponent);
  const r = ({ Component: n, props: l, key: o }) => {
    const s = () => {
      const c = Ct(n, { key: o, ...l });
      return typeof n.layout == "function" ? n.layout(c) : Array.isArray(n.layout) ? n.layout.concat(c).reverse().reduce((d, u) => Ct(u, l, d)) : c;
    };
    return /* @__PURE__ */ P.jsxs(P.Fragment, { children: [
      s(),
      /* @__PURE__ */ P.jsx(Bn, {})
    ] });
  };
  return /* @__PURE__ */ P.jsx(Hn, { children: /* @__PURE__ */ P.jsx(e, { ...t, children: r }) });
}, Bn = ({ children: e }) => {
  var c;
  const t = Z(ct);
  let r = !1, n = !1;
  D(() => Ye.on("start", () => r = !0), []), D(() => Ye.on("finish", () => r = !1), []), D(
    () => Ye.on("navigate", function(a) {
      const d = a.detail.page.props._inertiaui_modal;
      if (!d) {
        n && t.closeAll();
        return;
      }
      n = d, ze = d.baseUrl, t.pushFromResponseData(d, {}, () => {
        if (!d.baseUrl) {
          console.error("No base url in modal response data so cannot navigate back");
          return;
        }
        !r && window.location.href !== d.baseUrl && Ye.visit(d.baseUrl, {
          preserveScroll: !0,
          preserveState: !0
        });
      }).then((u) => {
        kt = u;
      });
    }),
    []
  );
  const l = (a) => (jt.length && (a.headers["X-InertiaUI-Modal-Base-Url"] = ze), a);
  D(() => (lt.interceptors.request.use(l), () => lt.interceptors.request.eject(l)), []);
  const o = Mn(), s = j();
  return D(() => {
    var u, g;
    const a = (u = o.props) == null ? void 0 : u._inertiaui_modal, d = s.current;
    s.current = a, a && d && a.component === d.component && a.url === d.url && ((g = t.stack[0]) == null || g.updateProps(a.props ?? {}));
  }, [(c = o.props) == null ? void 0 : c._inertiaui_modal]), /* @__PURE__ */ P.jsxs(P.Fragment, { children: [
    e,
    t.stack.length > 0 && /* @__PURE__ */ P.jsx(Or, { index: 0 })
  ] });
}, Ut = R.createContext(null);
Ut.displayName = "ModalIndexContext";
const Tr = () => {
  const e = R.useContext(Ut);
  if (e === void 0)
    throw new Error("useModalIndex must be used within a ModalIndexProvider");
  return e;
}, Or = ({ index: e }) => {
  const { stack: t } = dt(), r = B(() => t[e], [t, e]);
  return (r == null ? void 0 : r.component) && /* @__PURE__ */ P.jsx(Ut.Provider, { value: e, children: /* @__PURE__ */ P.jsx(
    r.component,
    {
      ...r.props,
      onModalEvent: (...n) => r.emit(...n)
    }
  ) });
}, Rr = Dt(({ name: e, children: t, ...r }, n) => {
  const l = Tr(), { stack: o, registerLocalModal: s, removeLocalModal: c } = dt(), [a, d] = V(null), u = B(() => e ? a : o[l], [e, a, l, o]), g = B(() => {
    var y;
    return (y = o.find((h) => h.shouldRender && h.index > (u == null ? void 0 : u.index))) == null ? void 0 : y.index;
  }, [l, o]), E = B(() => (u == null ? void 0 : u.config.slideover) ?? r.slideover ?? Wt("type") === "slideover", [r.slideover]), w = B(
    () => ({
      slideover: E,
      closeButton: r.closeButton ?? _e(E, "closeButton"),
      closeExplicitly: r.closeExplicitly ?? _e(E, "closeExplicitly"),
      maxWidth: r.maxWidth ?? _e(E, "maxWidth"),
      paddingClasses: r.paddingClasses ?? _e(E, "paddingClasses"),
      panelClasses: r.panelClasses ?? _e(E, "panelClasses"),
      position: r.position ?? _e(E, "position"),
      ...u == null ? void 0 : u.config
    }),
    [r, u == null ? void 0 : u.config]
  );
  return D(() => {
    if (e) {
      let y = null;
      return s(e, (h) => {
        y = h.registerEventListenersFromProps(r), d(h);
      }), () => {
        y == null || y(), y = null, c(e);
      };
    }
    return u.registerEventListenersFromProps(r);
  }, [e]), yr(
    n,
    () => ({
      afterLeave: () => u.afterLeave(),
      close: () => u.close(),
      config: w,
      emit: (...y) => u.emit(...y),
      getChildModal: () => u.getChildModal(),
      getParentModal: () => u.getParentModal(),
      id: u == null ? void 0 : u.id,
      index: u == null ? void 0 : u.index,
      isOpen: u == null ? void 0 : u.isOpen,
      modalContext: u,
      onTopOfStack: u == null ? void 0 : u.onTopOfStack,
      reload: () => u.reload(),
      setOpen: () => u.setOpen(),
      shouldRender: u == null ? void 0 : u.shouldRender
    }),
    [u]
  ), (u == null ? void 0 : u.shouldRender) && /* @__PURE__ */ P.jsxs(P.Fragment, { children: [
    typeof t == "function" ? t({
      afterLeave: u.afterLeave,
      close: u.close,
      config: w,
      emit: u.emit,
      getChildModal: u.getChildModal,
      getParentModal: u.getParentModal,
      id: u.id,
      index: u.index,
      isOpen: u.isOpen,
      modalContext: u,
      onTopOfStack: u.onTopOfStack,
      reload: u.reload,
      setOpen: u.setOpen,
      shouldRender: u.shouldRender
    }) : t,
    g && /* @__PURE__ */ P.jsx(Or, { index: g })
  ] });
});
Rr.displayName = "HeadlessModal";
function Pr(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var l = e.length;
    for (t = 0; t < l; t++) e[t] && (r = Pr(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function it() {
  for (var e, t, r = 0, n = "", l = arguments.length; r < l; r++) (e = arguments[r]) && (t = Pr(e)) && (n && (n += " "), n += t);
  return n;
}
var Vn = Object.defineProperty, Yn = (e, t, r) => t in e ? Vn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, St = (e, t, r) => (Yn(e, typeof t != "symbol" ? t + "" : t, r), r);
let Xn = class {
  constructor() {
    St(this, "current", this.detect()), St(this, "handoffState", "pending"), St(this, "currentId", 0);
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
}, Fe = new Xn();
function ft(e) {
  return Fe.isServer ? null : e instanceof Node ? e.ownerDocument : e != null && e.hasOwnProperty("current") && e.current instanceof Node ? e.current.ownerDocument : document;
}
function pt(e) {
  typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch((t) => setTimeout(() => {
    throw t;
  }));
}
function ye() {
  let e = [], t = { addEventListener(r, n, l, o) {
    return r.addEventListener(n, l, o), t.add(() => r.removeEventListener(n, l, o));
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
    return pt(() => {
      n.current && r[0]();
    }), t.add(() => {
      n.current = !1;
    });
  }, style(r, n, l) {
    let o = r.style.getPropertyValue(n);
    return Object.assign(r.style, { [n]: l }), this.add(() => {
      Object.assign(r.style, { [n]: o });
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
  return D(() => () => e.dispose(), [e]), e;
}
let G = (e, t) => {
  Fe.isServer ? D(e, t) : Sn(e, t);
};
function ke(e) {
  let t = j(e);
  return G(() => {
    t.current = e;
  }, [e]), t;
}
let A = function(e) {
  let t = ke(e);
  return R.useCallback((...r) => t.current(...r), [t]);
}, qn = ie(void 0);
function zn() {
  return Z(qn);
}
function Mt(...e) {
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
function ae() {
  let e = Kn();
  return oe((t) => Gn({ mergeRefs: e, ...t }), [e]);
}
function Gn({ ourProps: e, theirProps: t, slot: r, defaultTag: n, features: l, visible: o = !0, name: s, mergeRefs: c }) {
  c = c ?? Jn;
  let a = Sr(t, e);
  if (o) return nt(a, r, n, s, c);
  let d = l ?? 0;
  if (d & 2) {
    let { static: u = !1, ...g } = a;
    if (u) return nt(g, r, n, s, c);
  }
  if (d & 1) {
    let { unmount: u = !0, ...g } = a;
    return we(u ? 0 : 1, { 0() {
      return null;
    }, 1() {
      return nt({ ...g, hidden: !0, style: { display: "none" } }, r, n, s, c);
    } });
  }
  return nt(a, r, n, s, c);
}
function nt(e, t = {}, r, n, l) {
  let { as: o = r, children: s, refName: c = "ref", ...a } = $t(e, ["unmount", "static"]), d = e.ref !== void 0 ? { [c]: e.ref } : {}, u = typeof s == "function" ? s(t) : s;
  "className" in a && a.className && typeof a.className == "function" && (a.className = a.className(t)), a["aria-labelledby"] && a["aria-labelledby"] === a.id && (a["aria-labelledby"] = void 0);
  let g = {};
  if (t) {
    let E = !1, w = [];
    for (let [y, h] of Object.entries(t)) typeof h == "boolean" && (E = !0), h === !0 && w.push(y.replace(/([A-Z])/g, (f) => `-${f.toLowerCase()}`));
    if (E) {
      g["data-headlessui-state"] = w.join(" ");
      for (let y of w) g[`data-${y}`] = "";
    }
  }
  if (o === ue && (Object.keys(Se(a)).length > 0 || Object.keys(Se(g)).length > 0)) if (!$n(u) || Array.isArray(u) && u.length > 1) {
    if (Object.keys(Se(a)).length > 0) throw new Error(['Passing props on "Fragment"!', "", `The current component <${n} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(Se(a)).concat(Object.keys(Se(g))).map((E) => `  - ${E}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((E) => `  - ${E}`).join(`
`)].join(`
`));
  } else {
    let E = u.props, w = E == null ? void 0 : E.className, y = typeof w == "function" ? (...p) => Mt(w(...p), a.className) : Mt(w, a.className), h = y ? { className: y } : {}, f = Sr(u.props, Se($t(a, ["ref"])));
    for (let p in g) p in f && delete g[p];
    return Cn(u, Object.assign({}, f, g, d, { ref: l(u.ref, d.ref) }, h));
  }
  return Ct(o, Object.assign({}, $t(a, ["ref"]), o !== ue && d, o !== ue && g), u);
}
function Kn() {
  let e = j([]), t = oe((r) => {
    for (let n of e.current) n != null && (typeof n == "function" ? n(r) : n.current = r);
  }, []);
  return (...r) => {
    if (!r.every((n) => n == null)) return e.current = r, t;
  };
}
function Jn(...e) {
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
    var o;
    return (o = l == null ? void 0 : l.preventDefault) == null ? void 0 : o.call(l);
  }]);
  for (let n in r) Object.assign(t, { [n](l, ...o) {
    let s = r[n];
    for (let c of s) {
      if ((l instanceof Event || (l == null ? void 0 : l.nativeEvent) instanceof Event) && l.defaultPrevented) return;
      c(l, ...o);
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
let Zn = "span";
var ot = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(ot || {});
function Qn(e, t) {
  var r;
  let { features: n = 1, ...l } = e, o = { ref: t, "aria-hidden": (n & 2) === 2 ? !0 : (r = l["aria-hidden"]) != null ? r : void 0, hidden: (n & 4) === 4 ? !0 : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(n & 4) === 4 && (n & 2) !== 2 && { display: "none" } } };
  return ae()({ ourProps: o, theirProps: l, slot: {}, defaultTag: Zn, name: "Hidden" });
}
let _t = Q(Qn), $r = Symbol();
function el(e, t = !0) {
  return Object.assign(e, { [$r]: t });
}
function ce(...e) {
  let t = j(e);
  D(() => {
    t.current = e;
  }, [e]);
  let r = A((n) => {
    for (let l of t.current) l != null && (typeof l == "function" ? l(n) : l.current = n);
  });
  return e.every((n) => n == null || (n == null ? void 0 : n[$r])) ? void 0 : r;
}
let Bt = ie(null);
Bt.displayName = "DescriptionContext";
function Cr() {
  let e = Z(Bt);
  if (e === null) {
    let t = new Error("You used a <Description /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(t, Cr), t;
  }
  return e;
}
function tl() {
  let [e, t] = V([]);
  return [e.length > 0 ? e.join(" ") : void 0, B(() => function(r) {
    let n = A((o) => (t((s) => [...s, o]), () => t((s) => {
      let c = s.slice(), a = c.indexOf(o);
      return a !== -1 && c.splice(a, 1), c;
    }))), l = B(() => ({ register: n, slot: r.slot, name: r.name, props: r.props, value: r.value }), [n, r.slot, r.name, r.props, r.value]);
    return R.createElement(Bt.Provider, { value: l }, r.children);
  }, [t])];
}
let rl = "p";
function nl(e, t) {
  let r = Je(), n = zn(), { id: l = `headlessui-description-${r}`, ...o } = e, s = Cr(), c = ce(t);
  G(() => s.register(l), [l, s.register]);
  let a = n || !1, d = B(() => ({ ...s.slot, disabled: a }), [s.slot, a]), u = { ref: c, ...s.props, id: l };
  return ae()({ ourProps: u, theirProps: o, slot: d, defaultTag: rl, name: s.name || "Description" });
}
let ll = Q(nl), il = Object.assign(ll, {});
var Fr = ((e) => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(Fr || {});
let al = ie(() => {
});
function ol({ value: e, children: t }) {
  return R.createElement(al.Provider, { value: e }, t);
}
let sl = class extends Map {
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
  }, dispatch(l, ...o) {
    let s = t[l].call(r, ...o);
    s && (r = s, n.forEach((c) => c()));
  } };
}
function jr(e) {
  return Fn(e.subscribe, e.getSnapshot, e.getSnapshot);
}
let ul = new sl(() => kr(() => [], { ADD(e) {
  return this.includes(e) ? this : [...this, e];
}, REMOVE(e) {
  let t = this.indexOf(e);
  if (t === -1) return this;
  let r = this.slice();
  return r.splice(t, 1), r;
} }));
function Ae(e, t) {
  let r = ul.get(t), n = Je(), l = jr(r);
  if (G(() => {
    if (e) return r.dispatch("ADD", n), () => r.dispatch("REMOVE", n);
  }, [r, e]), !e) return !1;
  let o = l.indexOf(n), s = l.length;
  return o === -1 && (o = s, s += 1), o === s - 1;
}
let At = /* @__PURE__ */ new Map(), Ge = /* @__PURE__ */ new Map();
function dr(e) {
  var t;
  let r = (t = Ge.get(e)) != null ? t : 0;
  return Ge.set(e, r + 1), r !== 0 ? () => fr(e) : (At.set(e, { "aria-hidden": e.getAttribute("aria-hidden"), inert: e.inert }), e.setAttribute("aria-hidden", "true"), e.inert = !0, () => fr(e));
}
function fr(e) {
  var t;
  let r = (t = Ge.get(e)) != null ? t : 1;
  if (r === 1 ? Ge.delete(e) : Ge.set(e, r - 1), r !== 1) return;
  let n = At.get(e);
  n && (n["aria-hidden"] === null ? e.removeAttribute("aria-hidden") : e.setAttribute("aria-hidden", n["aria-hidden"]), e.inert = n.inert, At.delete(e));
}
function cl(e, { allowed: t, disallowed: r } = {}) {
  let n = Ae(e, "inert-others");
  G(() => {
    var l, o;
    if (!n) return;
    let s = ye();
    for (let a of (l = r == null ? void 0 : r()) != null ? l : []) a && s.add(dr(a));
    let c = (o = t == null ? void 0 : t()) != null ? o : [];
    for (let a of c) {
      if (!a) continue;
      let d = ft(a);
      if (!d) continue;
      let u = a.parentElement;
      for (; u && u !== d.body; ) {
        for (let g of u.children) c.some((E) => g.contains(E)) || s.add(dr(g));
        u = u.parentElement;
      }
    }
    return s.dispose;
  }, [n, t, r]);
}
function dl(e, t, r) {
  let n = ke((l) => {
    let o = l.getBoundingClientRect();
    o.x === 0 && o.y === 0 && o.width === 0 && o.height === 0 && r();
  });
  D(() => {
    if (!e) return;
    let l = t === null ? null : t instanceof HTMLElement ? t : t.current;
    if (!l) return;
    let o = ye();
    if (typeof ResizeObserver < "u") {
      let s = new ResizeObserver(() => n.current(l));
      s.observe(l), o.add(() => s.disconnect());
    }
    if (typeof IntersectionObserver < "u") {
      let s = new IntersectionObserver(() => n.current(l));
      s.observe(l), o.add(() => s.disconnect());
    }
    return () => o.dispose();
  }, [t, n, e]);
}
let st = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e) => `${e}:not([tabindex='-1'])`).join(","), fl = ["[data-autofocus]"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var pe = ((e) => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e[e.AutoFocus = 64] = "AutoFocus", e))(pe || {}), Lt = ((e) => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(Lt || {}), pl = ((e) => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(pl || {});
function ml(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(st)).sort((t, r) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (r.tabIndex || Number.MAX_SAFE_INTEGER)));
}
function vl(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(fl)).sort((t, r) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (r.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var Mr = ((e) => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(Mr || {});
function hl(e, t = 0) {
  var r;
  return e === ((r = ft(e)) == null ? void 0 : r.body) ? !1 : we(t, { 0() {
    return e.matches(st);
  }, 1() {
    let n = e;
    for (; n !== null; ) {
      if (n.matches(st)) return !0;
      n = n.parentElement;
    }
    return !1;
  } });
}
var gl = ((e) => (e[e.Keyboard = 0] = "Keyboard", e[e.Mouse = 1] = "Mouse", e))(gl || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (e) => {
  e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (e) => {
  e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
function me(e) {
  e == null || e.focus({ preventScroll: !0 });
}
let wl = ["textarea", "input"].join(",");
function yl(e) {
  var t, r;
  return (r = (t = e == null ? void 0 : e.matches) == null ? void 0 : t.call(e, wl)) != null ? r : !1;
}
function bl(e, t = (r) => r) {
  return e.slice().sort((r, n) => {
    let l = t(r), o = t(n);
    if (l === null || o === null) return 0;
    let s = l.compareDocumentPosition(o);
    return s & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : s & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function Ke(e, t, { sorted: r = !0, relativeTo: n = null, skipElements: l = [] } = {}) {
  let o = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : document : e.ownerDocument, s = Array.isArray(e) ? r ? bl(e) : e : t & 64 ? vl(e) : ml(e);
  l.length > 0 && s.length > 1 && (s = s.filter((w) => !l.some((y) => y != null && "current" in y ? (y == null ? void 0 : y.current) === w : y === w))), n = n ?? o.activeElement;
  let c = (() => {
    if (t & 5) return 1;
    if (t & 10) return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), a = (() => {
    if (t & 1) return 0;
    if (t & 2) return Math.max(0, s.indexOf(n)) - 1;
    if (t & 4) return Math.max(0, s.indexOf(n)) + 1;
    if (t & 8) return s.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), d = t & 32 ? { preventScroll: !0 } : {}, u = 0, g = s.length, E;
  do {
    if (u >= g || u + g <= 0) return 0;
    let w = a + u;
    if (t & 16) w = (w + g) % g;
    else {
      if (w < 0) return 3;
      if (w >= g) return 1;
    }
    E = s[w], E == null || E.focus(d), u += c;
  } while (E !== o.activeElement);
  return t & 6 && yl(E) && E.select(), 2;
}
function _r() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function El() {
  return /Android/gi.test(window.navigator.userAgent);
}
function xl() {
  return _r() || El();
}
function Ve(e, t, r, n) {
  let l = ke(r);
  D(() => {
    if (!e) return;
    function o(s) {
      l.current(s);
    }
    return document.addEventListener(t, o, n), () => document.removeEventListener(t, o, n);
  }, [e, t, n]);
}
function Ar(e, t, r, n) {
  let l = ke(r);
  D(() => {
    if (!e) return;
    function o(s) {
      l.current(s);
    }
    return window.addEventListener(t, o, n), () => window.removeEventListener(t, o, n);
  }, [e, t, n]);
}
const pr = 30;
function Tl(e, t, r) {
  let n = Ae(e, "outside-click"), l = ke(r), o = oe(function(a, d) {
    if (a.defaultPrevented) return;
    let u = d(a);
    if (u === null || !u.getRootNode().contains(u) || !u.isConnected) return;
    let g = function E(w) {
      return typeof w == "function" ? E(w()) : Array.isArray(w) || w instanceof Set ? w : [w];
    }(t);
    for (let E of g) if (E !== null && (E.contains(u) || a.composed && a.composedPath().includes(E))) return;
    return !hl(u, Mr.Loose) && u.tabIndex !== -1 && a.preventDefault(), l.current(a, u);
  }, [l, t]), s = j(null);
  Ve(n, "pointerdown", (a) => {
    var d, u;
    s.current = ((u = (d = a.composedPath) == null ? void 0 : d.call(a)) == null ? void 0 : u[0]) || a.target;
  }, !0), Ve(n, "mousedown", (a) => {
    var d, u;
    s.current = ((u = (d = a.composedPath) == null ? void 0 : d.call(a)) == null ? void 0 : u[0]) || a.target;
  }, !0), Ve(n, "click", (a) => {
    xl() || s.current && (o(a, () => s.current), s.current = null);
  }, !0);
  let c = j({ x: 0, y: 0 });
  Ve(n, "touchstart", (a) => {
    c.current.x = a.touches[0].clientX, c.current.y = a.touches[0].clientY;
  }, !0), Ve(n, "touchend", (a) => {
    let d = { x: a.changedTouches[0].clientX, y: a.changedTouches[0].clientY };
    if (!(Math.abs(d.x - c.current.x) >= pr || Math.abs(d.y - c.current.y) >= pr)) return o(a, () => a.target instanceof HTMLElement ? a.target : null);
  }, !0), Ar(n, "blur", (a) => o(a, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), !0);
}
function Ze(...e) {
  return B(() => ft(...e), [...e]);
}
function Lr(e, t, r, n) {
  let l = ke(r);
  D(() => {
    e = e ?? window;
    function o(s) {
      l.current(s);
    }
    return e.addEventListener(t, o, n), () => e.removeEventListener(t, o, n);
  }, [e, t, n]);
}
function Ol() {
  let e;
  return { before({ doc: t }) {
    var r;
    let n = t.documentElement, l = (r = t.defaultView) != null ? r : window;
    e = Math.max(0, l.innerWidth - n.clientWidth);
  }, after({ doc: t, d: r }) {
    let n = t.documentElement, l = Math.max(0, n.clientWidth - n.offsetWidth), o = Math.max(0, e - l);
    r.style(n, "paddingRight", `${o}px`);
  } };
}
function Rl() {
  return _r() ? { before({ doc: e, d: t, meta: r }) {
    function n(l) {
      return r.containers.flatMap((o) => o()).some((o) => o.contains(l));
    }
    t.microTask(() => {
      var l;
      if (window.getComputedStyle(e.documentElement).scrollBehavior !== "auto") {
        let c = ye();
        c.style(e.documentElement, "scrollBehavior", "auto"), t.add(() => t.microTask(() => c.dispose()));
      }
      let o = (l = window.scrollY) != null ? l : window.pageYOffset, s = null;
      t.addEventListener(e, "click", (c) => {
        if (c.target instanceof HTMLElement) try {
          let a = c.target.closest("a");
          if (!a) return;
          let { hash: d } = new URL(a.href), u = e.querySelector(d);
          u && !n(u) && (s = u);
        } catch {
        }
      }, !0), t.addEventListener(e, "touchstart", (c) => {
        if (c.target instanceof HTMLElement) if (n(c.target)) {
          let a = c.target;
          for (; a.parentElement && n(a.parentElement); ) a = a.parentElement;
          t.style(a, "overscrollBehavior", "contain");
        } else t.style(c.target, "touchAction", "none");
      }), t.addEventListener(e, "touchmove", (c) => {
        if (c.target instanceof HTMLElement) {
          if (c.target.tagName === "INPUT") return;
          if (n(c.target)) {
            let a = c.target;
            for (; a.parentElement && a.dataset.headlessuiPortal !== "" && !(a.scrollHeight > a.clientHeight || a.scrollWidth > a.clientWidth); ) a = a.parentElement;
            a.dataset.headlessuiPortal === "" && c.preventDefault();
          } else c.preventDefault();
        }
      }, { passive: !1 }), t.add(() => {
        var c;
        let a = (c = window.scrollY) != null ? c : window.pageYOffset;
        o !== a && window.scrollTo(0, o), s && s.isConnected && (s.scrollIntoView({ block: "nearest" }), s = null);
      });
    });
  } } : {};
}
function Pl() {
  return { before({ doc: e, d: t }) {
    t.style(e.documentElement, "overflow", "hidden");
  } };
}
function Sl(e) {
  let t = {};
  for (let r of e) Object.assign(t, r(t));
  return t;
}
let Ce = kr(() => /* @__PURE__ */ new Map(), { PUSH(e, t) {
  var r;
  let n = (r = this.get(e)) != null ? r : { doc: e, count: 0, d: ye(), meta: /* @__PURE__ */ new Set() };
  return n.count++, n.meta.add(t), this.set(e, n), this;
}, POP(e, t) {
  let r = this.get(e);
  return r && (r.count--, r.meta.delete(t)), this;
}, SCROLL_PREVENT({ doc: e, d: t, meta: r }) {
  let n = { doc: e, d: t, meta: Sl(r) }, l = [Rl(), Ol(), Pl()];
  l.forEach(({ before: o }) => o == null ? void 0 : o(n)), l.forEach(({ after: o }) => o == null ? void 0 : o(n));
}, SCROLL_ALLOW({ d: e }) {
  e.dispose();
}, TEARDOWN({ doc: e }) {
  this.delete(e);
} });
Ce.subscribe(() => {
  let e = Ce.getSnapshot(), t = /* @__PURE__ */ new Map();
  for (let [r] of e) t.set(r, r.documentElement.style.overflow);
  for (let r of e.values()) {
    let n = t.get(r.doc) === "hidden", l = r.count !== 0;
    (l && !n || !l && n) && Ce.dispatch(r.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", r), r.count === 0 && Ce.dispatch("TEARDOWN", r);
  }
});
function $l(e, t, r = () => ({ containers: [] })) {
  let n = jr(Ce), l = t ? n.get(t) : void 0, o = l ? l.count > 0 : !1;
  return G(() => {
    if (!(!t || !e)) return Ce.dispatch("PUSH", t, r), () => Ce.dispatch("POP", t, r);
  }, [e, t]), o;
}
function Cl(e, t, r = () => [document.body]) {
  let n = Ae(e, "scroll-lock");
  $l(n, t, (l) => {
    var o;
    return { containers: [...(o = l.containers) != null ? o : [], r] };
  });
}
function Fl(e = 0) {
  let [t, r] = V(e), n = oe((a) => r(a), [t]), l = oe((a) => r((d) => d | a), [t]), o = oe((a) => (t & a) === a, [t]), s = oe((a) => r((d) => d & ~a), [r]), c = oe((a) => r((d) => d ^ a), [r]);
  return { flags: t, setFlag: n, addFlag: l, hasFlag: o, removeFlag: s, toggleFlag: c };
}
var mr, vr;
typeof process < "u" && typeof globalThis < "u" && typeof Element < "u" && ((mr = process == null ? void 0 : process.env) == null ? void 0 : mr.NODE_ENV) === "test" && typeof ((vr = Element == null ? void 0 : Element.prototype) == null ? void 0 : vr.getAnimations) > "u" && (Element.prototype.getAnimations = function() {
  return console.warn(["Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.", "Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.", "", "Example usage:", "```js", "import { mockAnimationsApi } from 'jsdom-testing-mocks'", "mockAnimationsApi()", "```"].join(`
`)), [];
});
var kl = ((e) => (e[e.None = 0] = "None", e[e.Closed = 1] = "Closed", e[e.Enter = 2] = "Enter", e[e.Leave = 4] = "Leave", e))(kl || {});
function jl(e) {
  let t = {};
  for (let r in e) e[r] === !0 && (t[`data-${r}`] = "");
  return t;
}
function Ml(e, t, r, n) {
  let [l, o] = V(r), { hasFlag: s, addFlag: c, removeFlag: a } = Fl(e && l ? 3 : 0), d = j(!1), u = j(!1), g = Ht();
  return G(() => {
    var E;
    if (e) {
      if (r && o(!0), !t) {
        r && c(3);
        return;
      }
      return (E = n == null ? void 0 : n.start) == null || E.call(n, r), _l(t, { inFlight: d, prepare() {
        u.current ? u.current = !1 : u.current = d.current, d.current = !0, !u.current && (r ? (c(3), a(4)) : (c(4), a(2)));
      }, run() {
        u.current ? r ? (a(3), c(4)) : (a(4), c(3)) : r ? a(1) : c(1);
      }, done() {
        var w;
        u.current && typeof t.getAnimations == "function" && t.getAnimations().length > 0 || (d.current = !1, a(7), r || o(!1), (w = n == null ? void 0 : n.end) == null || w.call(n, r));
      } });
    }
  }, [e, r, t, g]), e ? [l, { closed: s(1), enter: s(2), leave: s(4), transition: s(2) || s(4) }] : [r, { closed: void 0, enter: void 0, leave: void 0, transition: void 0 }];
}
function _l(e, { prepare: t, run: r, done: n, inFlight: l }) {
  let o = ye();
  return Ll(e, { prepare: t, inFlight: l }), o.nextFrame(() => {
    r(), o.requestAnimationFrame(() => {
      o.add(Al(e, n));
    });
  }), o.dispose;
}
function Al(e, t) {
  var r, n;
  let l = ye();
  if (!e) return l.dispose;
  let o = !1;
  l.add(() => {
    o = !0;
  });
  let s = (n = (r = e.getAnimations) == null ? void 0 : r.call(e).filter((c) => c instanceof CSSTransition)) != null ? n : [];
  return s.length === 0 ? (t(), l.dispose) : (Promise.allSettled(s.map((c) => c.finished)).then(() => {
    o || t();
  }), l.dispose);
}
function Ll(e, { inFlight: t, prepare: r }) {
  if (t != null && t.current) {
    r();
    return;
  }
  let n = e.style.transition;
  e.style.transition = "none", r(), e.offsetHeight, e.style.transition = n;
}
function Vt(e, t) {
  let r = j([]), n = A(e);
  D(() => {
    let l = [...r.current];
    for (let [o, s] of t.entries()) if (r.current[o] !== s) {
      let c = n(t, l);
      return r.current = t, c;
    }
  }, [n, ...t]);
}
let mt = ie(null);
mt.displayName = "OpenClosedContext";
var se = ((e) => (e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(se || {});
function vt() {
  return Z(mt);
}
function Il({ value: e, children: t }) {
  return R.createElement(mt.Provider, { value: e }, t);
}
function Nl({ children: e }) {
  return R.createElement(mt.Provider, { value: null }, e);
}
function Dl(e) {
  function t() {
    document.readyState !== "loading" && (e(), document.removeEventListener("DOMContentLoaded", t));
  }
  typeof window < "u" && typeof document < "u" && (document.addEventListener("DOMContentLoaded", t), t());
}
let he = [];
Dl(() => {
  function e(t) {
    if (!(t.target instanceof HTMLElement) || t.target === document.body || he[0] === t.target) return;
    let r = t.target;
    r = r.closest(st), he.unshift(r ?? t.target), he = he.filter((n) => n != null && n.isConnected), he.splice(10);
  }
  window.addEventListener("click", e, { capture: !0 }), window.addEventListener("mousedown", e, { capture: !0 }), window.addEventListener("focus", e, { capture: !0 }), document.body.addEventListener("click", e, { capture: !0 }), document.body.addEventListener("mousedown", e, { capture: !0 }), document.body.addEventListener("focus", e, { capture: !0 });
});
function Ir(e) {
  let t = A(e), r = j(!1);
  D(() => (r.current = !1, () => {
    r.current = !0, pt(() => {
      r.current && t();
    });
  }), [t]);
}
function Wl() {
  let e = typeof document > "u";
  return "useSyncExternalStore" in qe ? ((t) => t.useSyncExternalStore)(qe)(() => () => {
  }, () => !1, () => !e) : !1;
}
function Qe() {
  let e = Wl(), [t, r] = qe.useState(Fe.isHandoffComplete);
  return t && Fe.isHandoffComplete === !1 && r(!1), qe.useEffect(() => {
    t !== !0 && r(!0);
  }, [t]), qe.useEffect(() => Fe.handoff(), []), e ? !1 : t;
}
let Nr = ie(!1);
function Ul() {
  return Z(Nr);
}
function hr(e) {
  return R.createElement(Nr.Provider, { value: e.force }, e.children);
}
function Hl(e) {
  let t = Ul(), r = Z(Wr), n = Ze(e), [l, o] = V(() => {
    var s;
    if (!t && r !== null) return (s = r.current) != null ? s : null;
    if (Fe.isServer) return null;
    let c = n == null ? void 0 : n.getElementById("headlessui-portal-root");
    if (c) return c;
    if (n === null) return null;
    let a = n.createElement("div");
    return a.setAttribute("id", "headlessui-portal-root"), n.body.appendChild(a);
  });
  return D(() => {
    l !== null && (n != null && n.body.contains(l) || n == null || n.body.appendChild(l));
  }, [l, n]), D(() => {
    t || r !== null && o(r.current);
  }, [r, o, t]), l;
}
let Dr = ue, Bl = Q(function(e, t) {
  let r = e, n = j(null), l = ce(el((g) => {
    n.current = g;
  }), t), o = Ze(n), s = Hl(n), [c] = V(() => {
    var g;
    return Fe.isServer ? null : (g = o == null ? void 0 : o.createElement("div")) != null ? g : null;
  }), a = Z(It), d = Qe();
  G(() => {
    !s || !c || s.contains(c) || (c.setAttribute("data-headlessui-portal", ""), s.appendChild(c));
  }, [s, c]), G(() => {
    if (c && a) return a.register(c);
  }, [a, c]), Ir(() => {
    var g;
    !s || !c || (c instanceof Node && s.contains(c) && s.removeChild(c), s.childNodes.length <= 0 && ((g = s.parentElement) == null || g.removeChild(s)));
  });
  let u = ae();
  return d ? !s || !c ? null : An(u({ ourProps: { ref: l }, theirProps: r, slot: {}, defaultTag: Dr, name: "Portal" }), c) : null;
});
function Vl(e, t) {
  let r = ce(t), { enabled: n = !0, ...l } = e, o = ae();
  return n ? R.createElement(Bl, { ...l, ref: r }) : o({ ourProps: { ref: r }, theirProps: l, slot: {}, defaultTag: Dr, name: "Portal" });
}
let Yl = ue, Wr = ie(null);
function Xl(e, t) {
  let { target: r, ...n } = e, l = { ref: ce(t) }, o = ae();
  return R.createElement(Wr.Provider, { value: r }, o({ ourProps: l, theirProps: n, defaultTag: Yl, name: "Popover.Group" }));
}
let It = ie(null);
function ql() {
  let e = Z(It), t = j([]), r = A((o) => (t.current.push(o), e && e.register(o), () => n(o))), n = A((o) => {
    let s = t.current.indexOf(o);
    s !== -1 && t.current.splice(s, 1), e && e.unregister(o);
  }), l = B(() => ({ register: r, unregister: n, portals: t }), [r, n, t]);
  return [t, B(() => function({ children: o }) {
    return R.createElement(It.Provider, { value: l }, o);
  }, [l])];
}
let zl = Q(Vl), Ur = Q(Xl), Gl = Object.assign(zl, { Group: Ur });
function Kl(e, t = typeof document < "u" ? document.defaultView : null, r) {
  let n = Ae(e, "escape");
  Lr(t, "keydown", (l) => {
    n && (l.defaultPrevented || l.key === Fr.Escape && r(l));
  });
}
function Jl() {
  var e;
  let [t] = V(() => typeof window < "u" && typeof window.matchMedia == "function" ? window.matchMedia("(pointer: coarse)") : null), [r, n] = V((e = t == null ? void 0 : t.matches) != null ? e : !1);
  return G(() => {
    if (!t) return;
    function l(o) {
      n(o.matches);
    }
    return t.addEventListener("change", l), () => t.removeEventListener("change", l);
  }, [t]), r;
}
function Zl({ defaultContainers: e = [], portals: t, mainTreeNode: r } = {}) {
  let n = Ze(r), l = A(() => {
    var o, s;
    let c = [];
    for (let a of e) a !== null && (a instanceof HTMLElement ? c.push(a) : "current" in a && a.current instanceof HTMLElement && c.push(a.current));
    if (t != null && t.current) for (let a of t.current) c.push(a);
    for (let a of (o = n == null ? void 0 : n.querySelectorAll("html > *, body > *")) != null ? o : []) a !== document.body && a !== document.head && a instanceof HTMLElement && a.id !== "headlessui-portal-root" && (r && (a.contains(r) || a.contains((s = r == null ? void 0 : r.getRootNode()) == null ? void 0 : s.host)) || c.some((d) => a.contains(d)) || c.push(a));
    return c;
  });
  return { resolveContainers: l, contains: A((o) => l().some((s) => s.contains(o))) };
}
let Hr = ie(null);
function gr({ children: e, node: t }) {
  let [r, n] = V(null), l = Br(t ?? r);
  return R.createElement(Hr.Provider, { value: l }, e, l === null && R.createElement(_t, { features: ot.Hidden, ref: (o) => {
    var s, c;
    if (o) {
      for (let a of (c = (s = ft(o)) == null ? void 0 : s.querySelectorAll("html > *, body > *")) != null ? c : []) if (a !== document.body && a !== document.head && a instanceof HTMLElement && a != null && a.contains(o)) {
        n(a);
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
  return G(() => (e.current = !0, () => {
    e.current = !1;
  }), []), e;
}
var Xe = ((e) => (e[e.Forwards = 0] = "Forwards", e[e.Backwards = 1] = "Backwards", e))(Xe || {});
function Ql() {
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
let ei = "div";
var $e = ((e) => (e[e.None = 0] = "None", e[e.InitialFocus = 1] = "InitialFocus", e[e.TabLock = 2] = "TabLock", e[e.FocusLock = 4] = "FocusLock", e[e.RestoreFocus = 8] = "RestoreFocus", e[e.AutoFocus = 16] = "AutoFocus", e))($e || {});
function ti(e, t) {
  let r = j(null), n = ce(r, t), { initialFocus: l, initialFocusFallback: o, containers: s, features: c = 15, ...a } = e;
  Qe() || (c = 0);
  let d = Ze(r);
  ii(c, { ownerDocument: d });
  let u = ai(c, { ownerDocument: d, container: r, initialFocus: l, initialFocusFallback: o });
  oi(c, { ownerDocument: d, container: r, containers: s, previousActiveElement: u });
  let g = Ql(), E = A((v) => {
    let x = r.current;
    x && ((T) => T())(() => {
      we(g.current, { [Xe.Forwards]: () => {
        Ke(x, pe.First, { skipElements: [v.relatedTarget, o] });
      }, [Xe.Backwards]: () => {
        Ke(x, pe.Last, { skipElements: [v.relatedTarget, o] });
      } });
    });
  }), w = Ae(!!(c & 2), "focus-trap#tab-lock"), y = Ht(), h = j(!1), f = { ref: n, onKeyDown(v) {
    v.key == "Tab" && (h.current = !0, y.requestAnimationFrame(() => {
      h.current = !1;
    }));
  }, onBlur(v) {
    if (!(c & 4)) return;
    let x = Vr(s);
    r.current instanceof HTMLElement && x.add(r.current);
    let T = v.relatedTarget;
    T instanceof HTMLElement && T.dataset.headlessuiFocusGuard !== "true" && (Yr(x, T) || (h.current ? Ke(r.current, we(g.current, { [Xe.Forwards]: () => pe.Next, [Xe.Backwards]: () => pe.Previous }) | pe.WrapAround, { relativeTo: v.target }) : v.target instanceof HTMLElement && me(v.target)));
  } }, p = ae();
  return R.createElement(R.Fragment, null, w && R.createElement(_t, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: E, features: ot.Focusable }), p({ ourProps: f, theirProps: a, defaultTag: ei, name: "FocusTrap" }), w && R.createElement(_t, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: E, features: ot.Focusable }));
}
let ri = Q(ti), ni = Object.assign(ri, { features: $e });
function li(e = !0) {
  let t = j(he.slice());
  return Vt(([r], [n]) => {
    n === !0 && r === !1 && pt(() => {
      t.current.splice(0);
    }), n === !1 && r === !0 && (t.current = he.slice());
  }, [e, he, t]), A(() => {
    var r;
    return (r = t.current.find((n) => n != null && n.isConnected)) != null ? r : null;
  });
}
function ii(e, { ownerDocument: t }) {
  let r = !!(e & 8), n = li(r);
  Vt(() => {
    r || (t == null ? void 0 : t.activeElement) === (t == null ? void 0 : t.body) && me(n());
  }, [r]), Ir(() => {
    r && me(n());
  });
}
function ai(e, { ownerDocument: t, container: r, initialFocus: n, initialFocusFallback: l }) {
  let o = j(null), s = Ae(!!(e & 1), "focus-trap#initial-focus"), c = Yt();
  return Vt(() => {
    if (e === 0) return;
    if (!s) {
      l != null && l.current && me(l.current);
      return;
    }
    let a = r.current;
    a && pt(() => {
      if (!c.current) return;
      let d = t == null ? void 0 : t.activeElement;
      if (n != null && n.current) {
        if ((n == null ? void 0 : n.current) === d) {
          o.current = d;
          return;
        }
      } else if (a.contains(d)) {
        o.current = d;
        return;
      }
      if (n != null && n.current) me(n.current);
      else {
        if (e & 16) {
          if (Ke(a, pe.First | pe.AutoFocus) !== Lt.Error) return;
        } else if (Ke(a, pe.First) !== Lt.Error) return;
        if (l != null && l.current && (me(l.current), (t == null ? void 0 : t.activeElement) === l.current)) return;
        console.warn("There are no focusable elements inside the <FocusTrap />");
      }
      o.current = t == null ? void 0 : t.activeElement;
    });
  }, [l, s, e]), o;
}
function oi(e, { ownerDocument: t, container: r, containers: n, previousActiveElement: l }) {
  let o = Yt(), s = !!(e & 4);
  Lr(t == null ? void 0 : t.defaultView, "focus", (c) => {
    if (!s || !o.current) return;
    let a = Vr(n);
    r.current instanceof HTMLElement && a.add(r.current);
    let d = l.current;
    if (!d) return;
    let u = c.target;
    u && u instanceof HTMLElement ? Yr(a, u) ? (l.current = u, me(u)) : (c.preventDefault(), c.stopPropagation(), me(d)) : me(l.current);
  }, !0);
}
function Yr(e, t) {
  for (let r of e) if (r.contains(t)) return !0;
  return !1;
}
function Xr(e) {
  var t;
  return !!(e.enter || e.enterFrom || e.enterTo || e.leave || e.leaveFrom || e.leaveTo) || ((t = e.as) != null ? t : zr) !== ue || R.Children.count(e.children) === 1;
}
let ht = ie(null);
ht.displayName = "TransitionContext";
var si = ((e) => (e.Visible = "visible", e.Hidden = "hidden", e))(si || {});
function ui() {
  let e = Z(ht);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
function ci() {
  let e = Z(gt);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
let gt = ie(null);
gt.displayName = "NestingContext";
function wt(e) {
  return "children" in e ? wt(e.children) : e.current.filter(({ el: t }) => t.current !== null).filter(({ state: t }) => t === "visible").length > 0;
}
function qr(e, t) {
  let r = ke(e), n = j([]), l = Yt(), o = Ht(), s = A((w, y = ge.Hidden) => {
    let h = n.current.findIndex(({ el: f }) => f === w);
    h !== -1 && (we(y, { [ge.Unmount]() {
      n.current.splice(h, 1);
    }, [ge.Hidden]() {
      n.current[h].state = "hidden";
    } }), o.microTask(() => {
      var f;
      !wt(n) && l.current && ((f = r.current) == null || f.call(r));
    }));
  }), c = A((w) => {
    let y = n.current.find(({ el: h }) => h === w);
    return y ? y.state !== "visible" && (y.state = "visible") : n.current.push({ el: w, state: "visible" }), () => s(w, ge.Unmount);
  }), a = j([]), d = j(Promise.resolve()), u = j({ enter: [], leave: [] }), g = A((w, y, h) => {
    a.current.splice(0), t && (t.chains.current[y] = t.chains.current[y].filter(([f]) => f !== w)), t == null || t.chains.current[y].push([w, new Promise((f) => {
      a.current.push(f);
    })]), t == null || t.chains.current[y].push([w, new Promise((f) => {
      Promise.all(u.current[y].map(([p, v]) => v)).then(() => f());
    })]), y === "enter" ? d.current = d.current.then(() => t == null ? void 0 : t.wait.current).then(() => h(y)) : h(y);
  }), E = A((w, y, h) => {
    Promise.all(u.current[y].splice(0).map(([f, p]) => p)).then(() => {
      var f;
      (f = a.current.shift()) == null || f();
    }).then(() => h(y));
  });
  return B(() => ({ children: n, register: c, unregister: s, onStart: g, onStop: E, wait: d, chains: u }), [c, s, n, g, E, u, d]);
}
let zr = ue, Gr = at.RenderStrategy;
function di(e, t) {
  var r, n;
  let { transition: l = !0, beforeEnter: o, afterEnter: s, beforeLeave: c, afterLeave: a, enter: d, enterFrom: u, enterTo: g, entered: E, leave: w, leaveFrom: y, leaveTo: h, ...f } = e, [p, v] = V(null), x = j(null), T = Xr(e), F = ce(...T ? [x, t, v] : t === null ? [] : [t]), X = (r = f.unmount) == null || r ? ge.Unmount : ge.Hidden, { show: U, appear: ee, initial: te } = ui(), [H, q] = V(U ? "visible" : "hidden"), K = ci(), { register: M, unregister: C } = K;
  G(() => M(x), [M, x]), G(() => {
    if (X === ge.Hidden && x.current) {
      if (U && H !== "visible") {
        q("visible");
        return;
      }
      return we(H, { hidden: () => C(x), visible: () => M(x) });
    }
  }, [H, x, M, C, U, X]);
  let L = Qe();
  G(() => {
    if (T && L && H === "visible" && x.current === null) throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
  }, [x, H, L, T]);
  let be = te && !ee, Ee = ee && U && te, ve = j(!1), re = qr(() => {
    ve.current || (q("hidden"), C(x));
  }, K), xe = A((Re) => {
    ve.current = !0;
    let de = Re ? "enter" : "leave";
    re.onStart(x, de, (fe) => {
      fe === "enter" ? o == null || o() : fe === "leave" && (c == null || c());
    });
  }), I = A((Re) => {
    let de = Re ? "enter" : "leave";
    ve.current = !1, re.onStop(x, de, (fe) => {
      fe === "enter" ? s == null || s() : fe === "leave" && (a == null || a());
    }), de === "leave" && !wt(re) && (q("hidden"), C(x));
  });
  D(() => {
    T && l || (xe(U), I(U));
  }, [U, T, l]);
  let Te = !(!l || !T || !L || be), [, Y] = Ml(Te, p, U, { start: xe, end: I }), bt = Se({ ref: F, className: ((n = Mt(f.className, Ee && d, Ee && u, Y.enter && d, Y.enter && Y.closed && u, Y.enter && !Y.closed && g, Y.leave && w, Y.leave && !Y.closed && y, Y.leave && Y.closed && h, !Y.transition && U && E)) == null ? void 0 : n.trim()) || void 0, ...jl(Y) }), Oe = 0;
  H === "visible" && (Oe |= se.Open), H === "hidden" && (Oe |= se.Closed), Y.enter && (Oe |= se.Opening), Y.leave && (Oe |= se.Closing);
  let Ie = ae();
  return R.createElement(gt.Provider, { value: re }, R.createElement(Il, { value: Oe }, Ie({ ourProps: bt, theirProps: f, defaultTag: zr, features: Gr, visible: H === "visible", name: "Transition.Child" })));
}
function fi(e, t) {
  let { show: r, appear: n = !1, unmount: l = !0, ...o } = e, s = j(null), c = Xr(e), a = ce(...c ? [s, t] : t === null ? [] : [t]);
  Qe();
  let d = vt();
  if (r === void 0 && d !== null && (r = (d & se.Open) === se.Open), r === void 0) throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
  let [u, g] = V(r ? "visible" : "hidden"), E = qr(() => {
    r || g("hidden");
  }), [w, y] = V(!0), h = j([r]);
  G(() => {
    w !== !1 && h.current[h.current.length - 1] !== r && (h.current.push(r), y(!1));
  }, [h, r]);
  let f = B(() => ({ show: r, appear: n, initial: w }), [r, n, w]);
  G(() => {
    r ? g("visible") : !wt(E) && s.current !== null && g("hidden");
  }, [r, E]);
  let p = { unmount: l }, v = A(() => {
    var F;
    w && y(!1), (F = e.beforeEnter) == null || F.call(e);
  }), x = A(() => {
    var F;
    w && y(!1), (F = e.beforeLeave) == null || F.call(e);
  }), T = ae();
  return R.createElement(gt.Provider, { value: E }, R.createElement(ht.Provider, { value: f }, T({ ourProps: { ...p, as: ue, children: R.createElement(Kr, { ref: a, ...p, ...o, beforeEnter: v, beforeLeave: x }) }, theirProps: {}, defaultTag: ue, features: Gr, visible: u === "visible", name: "Transition" })));
}
function pi(e, t) {
  let r = Z(ht) !== null, n = vt() !== null;
  return R.createElement(R.Fragment, null, !r && n ? R.createElement(Nt, { ref: t, ...e }) : R.createElement(Kr, { ref: t, ...e }));
}
let Nt = Q(fi), Kr = Q(di), Le = Q(pi), Jr = Object.assign(Nt, { Child: Le, Root: Nt });
var mi = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(mi || {}), vi = ((e) => (e[e.SetTitleId = 0] = "SetTitleId", e))(vi || {});
let hi = { 0(e, t) {
  return e.titleId === t.id ? e : { ...e, titleId: t.id };
} }, Xt = ie(null);
Xt.displayName = "DialogContext";
function yt(e) {
  let t = Z(Xt);
  if (t === null) {
    let r = new Error(`<${e} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(r, yt), r;
  }
  return t;
}
function gi(e, t) {
  return we(t.type, hi, e, t);
}
let wr = Q(function(e, t) {
  let r = Je(), { id: n = `headlessui-dialog-${r}`, open: l, onClose: o, initialFocus: s, role: c = "dialog", autoFocus: a = !0, __demoMode: d = !1, unmount: u = !1, ...g } = e, E = j(!1);
  c = function() {
    return c === "dialog" || c === "alertdialog" ? c : (E.current || (E.current = !0, console.warn(`Invalid role [${c}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog");
  }();
  let w = vt();
  l === void 0 && w !== null && (l = (w & se.Open) === se.Open);
  let y = j(null), h = ce(y, t), f = Ze(y), p = l ? 0 : 1, [v, x] = kn(gi, { titleId: null, descriptionId: null, panelRef: jn() }), T = A(() => o(!1)), F = A((I) => x({ type: 0, id: I })), X = Qe() ? p === 0 : !1, [U, ee] = ql(), te = { get current() {
    var I;
    return (I = v.panelRef.current) != null ? I : y.current;
  } }, H = Br(), { resolveContainers: q } = Zl({ mainTreeNode: H, portals: U, defaultContainers: [te] }), K = w !== null ? (w & se.Closing) === se.Closing : !1;
  cl(d || K ? !1 : X, { allowed: A(() => {
    var I, Te;
    return [(Te = (I = y.current) == null ? void 0 : I.closest("[data-headlessui-portal]")) != null ? Te : null];
  }), disallowed: A(() => {
    var I;
    return [(I = H == null ? void 0 : H.closest("body > *:not(#headlessui-portal-root)")) != null ? I : null];
  }) }), Tl(X, q, (I) => {
    I.preventDefault(), T();
  }), Kl(X, f == null ? void 0 : f.defaultView, (I) => {
    I.preventDefault(), I.stopPropagation(), document.activeElement && "blur" in document.activeElement && typeof document.activeElement.blur == "function" && document.activeElement.blur(), T();
  }), Cl(d || K ? !1 : X, f, q), dl(X, y, T);
  let [M, C] = tl(), L = B(() => [{ dialogState: p, close: T, setTitleId: F, unmount: u }, v], [p, v, T, F, u]), be = B(() => ({ open: p === 0 }), [p]), Ee = { ref: h, id: n, role: c, tabIndex: -1, "aria-modal": d ? void 0 : p === 0 ? !0 : void 0, "aria-labelledby": v.titleId, "aria-describedby": M, unmount: u }, ve = !Jl(), re = $e.None;
  X && !d && (re |= $e.RestoreFocus, re |= $e.TabLock, a && (re |= $e.AutoFocus), ve && (re |= $e.InitialFocus));
  let xe = ae();
  return R.createElement(Nl, null, R.createElement(hr, { force: !0 }, R.createElement(Gl, null, R.createElement(Xt.Provider, { value: L }, R.createElement(Ur, { target: y }, R.createElement(hr, { force: !1 }, R.createElement(C, { slot: be }, R.createElement(ee, null, R.createElement(ni, { initialFocus: s, initialFocusFallback: y, containers: q, features: re }, R.createElement(ol, { value: T }, xe({ ourProps: Ee, theirProps: g, slot: be, defaultTag: wi, features: yi, visible: p === 0, name: "Dialog" })))))))))));
}), wi = "div", yi = at.RenderStrategy | at.Static;
function bi(e, t) {
  let { transition: r = !1, open: n, ...l } = e, o = vt(), s = e.hasOwnProperty("open") || o !== null, c = e.hasOwnProperty("onClose");
  if (!s && !c) throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");
  if (!s) throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");
  if (!c) throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");
  if (!o && typeof e.open != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${e.open}`);
  if (typeof e.onClose != "function") throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${e.onClose}`);
  return (n !== void 0 || r) && !l.static ? R.createElement(gr, null, R.createElement(Jr, { show: n, transition: r, unmount: l.unmount }, R.createElement(wr, { ref: t, ...l }))) : R.createElement(gr, null, R.createElement(wr, { ref: t, open: n, ...l }));
}
let Ei = "div";
function xi(e, t) {
  let r = Je(), { id: n = `headlessui-dialog-panel-${r}`, transition: l = !1, ...o } = e, [{ dialogState: s, unmount: c }, a] = yt("Dialog.Panel"), d = ce(t, a.panelRef), u = B(() => ({ open: s === 0 }), [s]), g = A((f) => {
    f.stopPropagation();
  }), E = { ref: d, id: n, onClick: g }, w = l ? Le : ue, y = l ? { unmount: c } : {}, h = ae();
  return R.createElement(w, { ...y }, h({ ourProps: E, theirProps: o, slot: u, defaultTag: Ei, name: "Dialog.Panel" }));
}
let Ti = "div";
function Oi(e, t) {
  let { transition: r = !1, ...n } = e, [{ dialogState: l, unmount: o }] = yt("Dialog.Backdrop"), s = B(() => ({ open: l === 0 }), [l]), c = { ref: t, "aria-hidden": !0 }, a = r ? Le : ue, d = r ? { unmount: o } : {}, u = ae();
  return R.createElement(a, { ...d }, u({ ourProps: c, theirProps: n, slot: s, defaultTag: Ti, name: "Dialog.Backdrop" }));
}
let Ri = "h2";
function Pi(e, t) {
  let r = Je(), { id: n = `headlessui-dialog-title-${r}`, ...l } = e, [{ dialogState: o, setTitleId: s }] = yt("Dialog.Title"), c = ce(t);
  D(() => (s(n), () => s(null)), [n, s]);
  let a = B(() => ({ open: o === 0 }), [o]), d = { ref: c, id: n };
  return ae()({ ourProps: d, theirProps: l, slot: a, defaultTag: Ri, name: "Dialog.Title" });
}
let Si = Q(bi), qt = Q(xi);
Q(Oi);
let $i = Q(Pi), Ci = Object.assign(Si, { Panel: qt, Title: $i, Description: il });
function Zr({ onClick: e }) {
  return /* @__PURE__ */ P.jsxs(
    "button",
    {
      type: "button",
      className: "im-close-button text-gray-400 hover:text-gray-500",
      onClick: e,
      children: [
        /* @__PURE__ */ P.jsx("span", { className: "sr-only", children: "Close" }),
        /* @__PURE__ */ P.jsx(
          "svg",
          {
            className: "size-6",
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: "2",
            stroke: "currentColor",
            "aria-hidden": "true",
            children: /* @__PURE__ */ P.jsx(
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
const Fi = ({ modalContext: e, config: t, children: r }) => /* @__PURE__ */ P.jsx("div", { className: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4", children: /* @__PURE__ */ P.jsx(
  "div",
  {
    className: it("im-modal-positioner flex min-h-full justify-center", {
      "items-start": t.position === "top",
      "items-center": t.position === "center",
      "items-end": t.position === "bottom"
    }),
    children: /* @__PURE__ */ P.jsx(
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
        children: /* @__PURE__ */ P.jsxs(qt, { className: `im-modal-content relative ${t.paddingClasses} ${t.panelClasses}`, children: [
          t.closeButton && /* @__PURE__ */ P.jsx("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ P.jsx(Zr, { onClick: e.close }) }),
          typeof r == "function" ? r({ modalContext: e, config: t }) : r
        ] })
      }
    )
  }
) }), ki = ({ modalContext: e, config: t, children: r }) => /* @__PURE__ */ P.jsx("div", { className: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ P.jsx(
  "div",
  {
    className: it("im-slideover-positioner flex min-h-full items-center", {
      "justify-start": t.position === "left",
      "justify-end": t.position === "right"
    }),
    children: /* @__PURE__ */ P.jsx(
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
        children: /* @__PURE__ */ P.jsxs(qt, { className: `im-slideover-content relative ${t.paddingClasses} ${t.panelClasses}`, children: [
          t.closeButton && /* @__PURE__ */ P.jsx("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ P.jsx(Zr, { onClick: e.close }) }),
          typeof r == "function" ? r({ modalContext: e, config: t }) : r
        ] })
      }
    )
  }
) }), ji = Dt(({ name: e, children: t, ...r }, n) => {
  const l = (s) => typeof t == "function" ? t(s) : t, o = j(null);
  return yr(n, () => o.current, [o]), /* @__PURE__ */ P.jsx(
    Rr,
    {
      ref: o,
      name: e,
      ...r,
      children: ({
        afterLeave: s,
        close: c,
        config: a,
        emit: d,
        getChildModal: u,
        getParentModal: g,
        id: E,
        index: w,
        isOpen: y,
        modalContext: h,
        onTopOfStack: f,
        reload: p,
        setOpen: v,
        shouldRender: x
      }) => /* @__PURE__ */ P.jsx(
        Jr,
        {
          appear: !0,
          show: y ?? !1,
          children: /* @__PURE__ */ P.jsxs(
            Ci,
            {
              as: "div",
              className: "im-dialog relative z-20",
              onClose: () => a.closeExplicitly ? null : c(),
              "data-inertiaui-modal-id": E,
              "data-inertiaui-modal-index": w,
              children: [
                w === 0 ? /* @__PURE__ */ P.jsx(
                  Le,
                  {
                    enter: "transition transform ease-in-out duration-300",
                    enterFrom: "opacity-0",
                    enterTo: "opacity-100",
                    leave: "transition transform ease-in-out duration-300",
                    leaveFrom: "opacity-100",
                    leaveTo: "opacity-0",
                    children: f ? /* @__PURE__ */ P.jsx(
                      "div",
                      {
                        className: "im-backdrop fixed inset-0 z-30 bg-black/75",
                        "aria-hidden": "true"
                      }
                    ) : /* @__PURE__ */ P.jsx("div", {})
                  }
                ) : null,
                w > 0 && f ? /* @__PURE__ */ P.jsx("div", { className: "im-backdrop fixed inset-0 z-30 bg-black/75" }) : null,
                a.slideover ? /* @__PURE__ */ P.jsx(
                  ki,
                  {
                    modalContext: h,
                    config: a,
                    children: l({
                      afterLeave: s,
                      close: c,
                      config: a,
                      emit: d,
                      getChildModal: u,
                      getParentModal: g,
                      id: E,
                      index: w,
                      isOpen: y,
                      modalContext: h,
                      onTopOfStack: f,
                      reload: p,
                      setOpen: v,
                      shouldRender: x
                    })
                  }
                ) : /* @__PURE__ */ P.jsx(
                  Fi,
                  {
                    modalContext: h,
                    config: a,
                    children: l({
                      afterLeave: s,
                      close: c,
                      config: a,
                      emit: d,
                      getChildModal: u,
                      getParentModal: g,
                      id: E,
                      index: w,
                      isOpen: y,
                      modalContext: h,
                      onTopOfStack: f,
                      reload: p,
                      setOpen: v,
                      shouldRender: x
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
ji.displayName = "Modal";
const Vi = ({
  href: e,
  method: t = "get",
  data: r = {},
  as: n = "a",
  headers: l = {},
  queryStringArrayFormat: o = "brackets",
  onAfterLeave: s = null,
  onBlur: c = null,
  onClose: a = null,
  onError: d = null,
  onFocus: u = null,
  onStart: g = null,
  onSuccess: E = null,
  navigate: w = null,
  children: y,
  ...h
}) => {
  const [f, p] = V(!1), [v, x] = V(null), { stack: T, visit: F } = dt(), X = B(() => w ?? Wt("navigate"), [w]), U = {}, ee = {};
  Object.keys(h).forEach((C) => {
    cr.includes(C) || (C.startsWith("on") && typeof h[C] == "function" ? C.toLowerCase() in window ? U[C] = h[C] : ee[C] = h[C] : U[C] = h[C]);
  });
  const [te, H] = V(!1);
  D(() => {
    v && (v.onTopOfStack && te ? u == null || u() : !v.onTopOfStack && !te && (c == null || c()), H(!v.onTopOfStack));
  }, [T]);
  const q = oe(() => {
    a == null || a();
  }, [a]), K = oe(() => {
    x(null), s == null || s();
  }, [s]), M = oe(
    (C) => {
      C == null || C.preventDefault(), !f && (e.startsWith("#") || (p(!0), g == null || g()), F(
        e,
        t,
        r,
        l,
        Wn(br(h, cr)),
        () => q(T.length),
        K,
        o,
        X
      ).then((L) => {
        x(L), L.registerEventListenersFromProps(ee), E == null || E();
      }).catch((L) => {
        console.error(L), d == null || d(L);
      }).finally(() => p(!1)));
    },
    [e, t, r, l, o, h, q, K]
  );
  return /* @__PURE__ */ P.jsx(
    n,
    {
      ...U,
      href: e,
      onClick: M,
      children: typeof y == "function" ? y({ loading: f }) : y
    }
  );
};
function Yi() {
  return dt().stack[Tr()] ?? null;
}
export {
  Rr as HeadlessModal,
  ji as Modal,
  Vi as ModalLink,
  Bn as ModalRoot,
  Hn as ModalStackProvider,
  Wt as getConfig,
  Wi as putConfig,
  Ui as renderApp,
  Di as resetConfig,
  Yi as useModal,
  Tr as useModalIndex,
  dt as useModalStack
};
