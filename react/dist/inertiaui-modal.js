var Va = Object.defineProperty;
var za = (e, t, r) => t in e ? Va(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var Pe = (e, t, r) => za(e, typeof t != "symbol" ? t + "" : t, r);
import * as Rt from "react";
import C, { useState as Q, useEffect as oe, useLayoutEffect as Ga, useRef as U, createContext as he, useContext as fe, forwardRef as Qo, Fragment as we, isValidElement as Ka, cloneElement as Ja, createElement as Ya, useMemo as re, useId as It, useSyncExternalStore as Xa, useCallback as Ce, useReducer as Qa, createRef as Za, useImperativeHandle as es } from "react";
import { router as Zo } from "@inertiajs/react";
import { createPortal as ts } from "react-dom";
const zt = {
  type: "modal",
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
class rs {
  constructor() {
    this.config = {}, this.reset();
  }
  reset() {
    this.config = JSON.parse(JSON.stringify(zt));
  }
  put(t, r) {
    if (typeof t == "object") {
      this.config = {
        type: t.type ?? zt.type,
        modal: { ...zt.modal, ...t.modal ?? {} },
        slideover: { ...zt.slideover, ...t.slideover ?? {} }
      };
      return;
    }
    const n = t.split(".");
    let o = this.config;
    for (let i = 0; i < n.length - 1; i++)
      o = o[n[i]] = o[n[i]] || {};
    o[n[n.length - 1]] = r;
  }
  get(t) {
    if (typeof t > "u")
      return this.config;
    const r = t.split(".");
    let n = this.config;
    for (const o of r) {
      if (n[o] === void 0)
        return null;
      n = n[o];
    }
    return n;
  }
}
const fr = new rs(), pp = () => fr.reset(), mp = (e, t) => fr.put(e, t), ns = (e) => fr.get(e), ot = (e, t) => fr.get(e ? `slideover.${t}` : `modal.${t}`);
var Qr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function os(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function is(e) {
  if (e.__esModule) return e;
  var t = e.default;
  if (typeof t == "function") {
    var r = function n() {
      return this instanceof n ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    r.prototype = t.prototype;
  } else r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(e).forEach(function(n) {
    var o = Object.getOwnPropertyDescriptor(e, n);
    Object.defineProperty(r, n, o.get ? o : {
      enumerable: !0,
      get: function() {
        return e[n];
      }
    });
  }), r;
}
var Zr = { exports: {} }, Et = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var to;
function as() {
  if (to) return Et;
  to = 1;
  var e = C, t = Symbol.for("react.element"), r = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, o = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function a(s, l, f) {
    var u, y = {}, h = null, v = null;
    f !== void 0 && (h = "" + f), l.key !== void 0 && (h = "" + l.key), l.ref !== void 0 && (v = l.ref);
    for (u in l) n.call(l, u) && !i.hasOwnProperty(u) && (y[u] = l[u]);
    if (s && s.defaultProps) for (u in l = s.defaultProps, l) y[u] === void 0 && (y[u] = l[u]);
    return { $$typeof: t, type: s, key: h, ref: v, props: y, _owner: o.current };
  }
  return Et.Fragment = r, Et.jsx = a, Et.jsxs = a, Et;
}
var St = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ro;
function ss() {
  return ro || (ro = 1, process.env.NODE_ENV !== "production" && function() {
    var e = C, t = Symbol.for("react.element"), r = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), f = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), y = Symbol.for("react.memo"), h = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), c = Symbol.iterator, p = "@@iterator";
    function m(d) {
      if (d === null || typeof d != "object")
        return null;
      var w = c && d[c] || d[p];
      return typeof w == "function" ? w : null;
    }
    var b = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function E(d) {
      {
        for (var w = arguments.length, O = new Array(w > 1 ? w - 1 : 0), P = 1; P < w; P++)
          O[P - 1] = arguments[P];
        S("error", d, O);
      }
    }
    function S(d, w, O) {
      {
        var P = b.ReactDebugCurrentFrame, k = P.getStackAddendum();
        k !== "" && (w += "%s", O = O.concat([k]));
        var B = O.map(function(D) {
          return String(D);
        });
        B.unshift("Warning: " + w), Function.prototype.apply.call(console[d], console, B);
      }
    }
    var x = !1, A = !1, T = !1, $ = !1, j = !1, H;
    H = Symbol.for("react.module.reference");
    function I(d) {
      return !!(typeof d == "string" || typeof d == "function" || d === n || d === i || j || d === o || d === f || d === u || $ || d === v || x || A || T || typeof d == "object" && d !== null && (d.$$typeof === h || d.$$typeof === y || d.$$typeof === a || d.$$typeof === s || d.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      d.$$typeof === H || d.getModuleId !== void 0));
    }
    function Y(d, w, O) {
      var P = d.displayName;
      if (P)
        return P;
      var k = w.displayName || w.name || "";
      return k !== "" ? O + "(" + k + ")" : O;
    }
    function Z(d) {
      return d.displayName || "Context";
    }
    function R(d) {
      if (d == null)
        return null;
      if (typeof d.tag == "number" && E("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof d == "function")
        return d.displayName || d.name || null;
      if (typeof d == "string")
        return d;
      switch (d) {
        case n:
          return "Fragment";
        case r:
          return "Portal";
        case i:
          return "Profiler";
        case o:
          return "StrictMode";
        case f:
          return "Suspense";
        case u:
          return "SuspenseList";
      }
      if (typeof d == "object")
        switch (d.$$typeof) {
          case s:
            var w = d;
            return Z(w) + ".Consumer";
          case a:
            var O = d;
            return Z(O._context) + ".Provider";
          case l:
            return Y(d, d.render, "ForwardRef");
          case y:
            var P = d.displayName || null;
            return P !== null ? P : R(d.type) || "Memo";
          case h: {
            var k = d, B = k._payload, D = k._init;
            try {
              return R(D(B));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var M = Object.assign, K = 0, pe, ge, Se, ne, W, _e, Wt;
    function te() {
    }
    te.__reactDisabledLog = !0;
    function Tr() {
      {
        if (K === 0) {
          pe = console.log, ge = console.info, Se = console.warn, ne = console.error, W = console.group, _e = console.groupCollapsed, Wt = console.groupEnd;
          var d = {
            configurable: !0,
            enumerable: !0,
            value: te,
            writable: !0
          };
          Object.defineProperties(console, {
            info: d,
            log: d,
            warn: d,
            error: d,
            group: d,
            groupCollapsed: d,
            groupEnd: d
          });
        }
        K++;
      }
    }
    function We() {
      {
        if (K--, K === 0) {
          var d = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: M({}, d, {
              value: pe
            }),
            info: M({}, d, {
              value: ge
            }),
            warn: M({}, d, {
              value: Se
            }),
            error: M({}, d, {
              value: ne
            }),
            group: M({}, d, {
              value: W
            }),
            groupCollapsed: M({}, d, {
              value: _e
            }),
            groupEnd: M({}, d, {
              value: Wt
            })
          });
        }
        K < 0 && E("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var He = b.ReactCurrentDispatcher, Ne;
    function xe(d, w, O) {
      {
        if (Ne === void 0)
          try {
            throw Error();
          } catch (k) {
            var P = k.stack.trim().match(/\n( *(at )?)/);
            Ne = P && P[1] || "";
          }
        return `
` + Ne + d;
      }
    }
    var Rr = !1, Ht;
    {
      var wa = typeof WeakMap == "function" ? WeakMap : Map;
      Ht = new wa();
    }
    function Un(d, w) {
      if (!d || Rr)
        return "";
      {
        var O = Ht.get(d);
        if (O !== void 0)
          return O;
      }
      var P;
      Rr = !0;
      var k = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var B;
      B = He.current, He.current = null, Tr();
      try {
        if (w) {
          var D = function() {
            throw Error();
          };
          if (Object.defineProperty(D.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(D, []);
            } catch (le) {
              P = le;
            }
            Reflect.construct(d, [], D);
          } else {
            try {
              D.call();
            } catch (le) {
              P = le;
            }
            d.call(D.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (le) {
            P = le;
          }
          d();
        }
      } catch (le) {
        if (le && P && typeof le.stack == "string") {
          for (var _ = le.stack.split(`
`), ae = P.stack.split(`
`), z = _.length - 1, J = ae.length - 1; z >= 1 && J >= 0 && _[z] !== ae[J]; )
            J--;
          for (; z >= 1 && J >= 0; z--, J--)
            if (_[z] !== ae[J]) {
              if (z !== 1 || J !== 1)
                do
                  if (z--, J--, J < 0 || _[z] !== ae[J]) {
                    var ye = `
` + _[z].replace(" at new ", " at ");
                    return d.displayName && ye.includes("<anonymous>") && (ye = ye.replace("<anonymous>", d.displayName)), typeof d == "function" && Ht.set(d, ye), ye;
                  }
                while (z >= 1 && J >= 0);
              break;
            }
        }
      } finally {
        Rr = !1, He.current = B, We(), Error.prepareStackTrace = k;
      }
      var nt = d ? d.displayName || d.name : "", qe = nt ? xe(nt) : "";
      return typeof d == "function" && Ht.set(d, qe), qe;
    }
    function Ea(d, w, O) {
      return Un(d, !1);
    }
    function Sa(d) {
      var w = d.prototype;
      return !!(w && w.isReactComponent);
    }
    function qt(d, w, O) {
      if (d == null)
        return "";
      if (typeof d == "function")
        return Un(d, Sa(d));
      if (typeof d == "string")
        return xe(d);
      switch (d) {
        case f:
          return xe("Suspense");
        case u:
          return xe("SuspenseList");
      }
      if (typeof d == "object")
        switch (d.$$typeof) {
          case l:
            return Ea(d.render);
          case y:
            return qt(d.type, w, O);
          case h: {
            var P = d, k = P._payload, B = P._init;
            try {
              return qt(B(k), w, O);
            } catch {
            }
          }
        }
      return "";
    }
    var bt = Object.prototype.hasOwnProperty, Wn = {}, Hn = b.ReactDebugCurrentFrame;
    function Vt(d) {
      if (d) {
        var w = d._owner, O = qt(d.type, d._source, w ? w.type : null);
        Hn.setExtraStackFrame(O);
      } else
        Hn.setExtraStackFrame(null);
    }
    function xa(d, w, O, P, k) {
      {
        var B = Function.call.bind(bt);
        for (var D in d)
          if (B(d, D)) {
            var _ = void 0;
            try {
              if (typeof d[D] != "function") {
                var ae = Error((P || "React class") + ": " + O + " type `" + D + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof d[D] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw ae.name = "Invariant Violation", ae;
              }
              _ = d[D](w, D, P, O, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (z) {
              _ = z;
            }
            _ && !(_ instanceof Error) && (Vt(k), E("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", P || "React class", O, D, typeof _), Vt(null)), _ instanceof Error && !(_.message in Wn) && (Wn[_.message] = !0, Vt(k), E("Failed %s type: %s", O, _.message), Vt(null));
          }
      }
    }
    var Oa = Array.isArray;
    function Pr(d) {
      return Oa(d);
    }
    function Aa(d) {
      {
        var w = typeof Symbol == "function" && Symbol.toStringTag, O = w && d[Symbol.toStringTag] || d.constructor.name || "Object";
        return O;
      }
    }
    function Ta(d) {
      try {
        return qn(d), !1;
      } catch {
        return !0;
      }
    }
    function qn(d) {
      return "" + d;
    }
    function Vn(d) {
      if (Ta(d))
        return E("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Aa(d)), qn(d);
    }
    var wt = b.ReactCurrentOwner, Ra = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, zn, Gn, Cr;
    Cr = {};
    function Pa(d) {
      if (bt.call(d, "ref")) {
        var w = Object.getOwnPropertyDescriptor(d, "ref").get;
        if (w && w.isReactWarning)
          return !1;
      }
      return d.ref !== void 0;
    }
    function Ca(d) {
      if (bt.call(d, "key")) {
        var w = Object.getOwnPropertyDescriptor(d, "key").get;
        if (w && w.isReactWarning)
          return !1;
      }
      return d.key !== void 0;
    }
    function Fa(d, w) {
      if (typeof d.ref == "string" && wt.current && w && wt.current.stateNode !== w) {
        var O = R(wt.current.type);
        Cr[O] || (E('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', R(wt.current.type), d.ref), Cr[O] = !0);
      }
    }
    function $a(d, w) {
      {
        var O = function() {
          zn || (zn = !0, E("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", w));
        };
        O.isReactWarning = !0, Object.defineProperty(d, "key", {
          get: O,
          configurable: !0
        });
      }
    }
    function _a(d, w) {
      {
        var O = function() {
          Gn || (Gn = !0, E("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", w));
        };
        O.isReactWarning = !0, Object.defineProperty(d, "ref", {
          get: O,
          configurable: !0
        });
      }
    }
    var Na = function(d, w, O, P, k, B, D) {
      var _ = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: d,
        key: w,
        ref: O,
        props: D,
        // Record the component responsible for creating this element.
        _owner: B
      };
      return _._store = {}, Object.defineProperty(_._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(_, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: P
      }), Object.defineProperty(_, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: k
      }), Object.freeze && (Object.freeze(_.props), Object.freeze(_)), _;
    };
    function Da(d, w, O, P, k) {
      {
        var B, D = {}, _ = null, ae = null;
        O !== void 0 && (Vn(O), _ = "" + O), Ca(w) && (Vn(w.key), _ = "" + w.key), Pa(w) && (ae = w.ref, Fa(w, k));
        for (B in w)
          bt.call(w, B) && !Ra.hasOwnProperty(B) && (D[B] = w[B]);
        if (d && d.defaultProps) {
          var z = d.defaultProps;
          for (B in z)
            D[B] === void 0 && (D[B] = z[B]);
        }
        if (_ || ae) {
          var J = typeof d == "function" ? d.displayName || d.name || "Unknown" : d;
          _ && $a(D, J), ae && _a(D, J);
        }
        return Na(d, _, ae, k, P, wt.current, D);
      }
    }
    var Fr = b.ReactCurrentOwner, Kn = b.ReactDebugCurrentFrame;
    function rt(d) {
      if (d) {
        var w = d._owner, O = qt(d.type, d._source, w ? w.type : null);
        Kn.setExtraStackFrame(O);
      } else
        Kn.setExtraStackFrame(null);
    }
    var $r;
    $r = !1;
    function _r(d) {
      return typeof d == "object" && d !== null && d.$$typeof === t;
    }
    function Jn() {
      {
        if (Fr.current) {
          var d = R(Fr.current.type);
          if (d)
            return `

Check the render method of \`` + d + "`.";
        }
        return "";
      }
    }
    function Ia(d) {
      return "";
    }
    var Yn = {};
    function La(d) {
      {
        var w = Jn();
        if (!w) {
          var O = typeof d == "string" ? d : d.displayName || d.name;
          O && (w = `

Check the top-level render call using <` + O + ">.");
        }
        return w;
      }
    }
    function Xn(d, w) {
      {
        if (!d._store || d._store.validated || d.key != null)
          return;
        d._store.validated = !0;
        var O = La(w);
        if (Yn[O])
          return;
        Yn[O] = !0;
        var P = "";
        d && d._owner && d._owner !== Fr.current && (P = " It was passed a child from " + R(d._owner.type) + "."), rt(d), E('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', O, P), rt(null);
      }
    }
    function Qn(d, w) {
      {
        if (typeof d != "object")
          return;
        if (Pr(d))
          for (var O = 0; O < d.length; O++) {
            var P = d[O];
            _r(P) && Xn(P, w);
          }
        else if (_r(d))
          d._store && (d._store.validated = !0);
        else if (d) {
          var k = m(d);
          if (typeof k == "function" && k !== d.entries)
            for (var B = k.call(d), D; !(D = B.next()).done; )
              _r(D.value) && Xn(D.value, w);
        }
      }
    }
    function Ma(d) {
      {
        var w = d.type;
        if (w == null || typeof w == "string")
          return;
        var O;
        if (typeof w == "function")
          O = w.propTypes;
        else if (typeof w == "object" && (w.$$typeof === l || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        w.$$typeof === y))
          O = w.propTypes;
        else
          return;
        if (O) {
          var P = R(w);
          xa(O, d.props, "prop", P, d);
        } else if (w.PropTypes !== void 0 && !$r) {
          $r = !0;
          var k = R(w);
          E("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", k || "Unknown");
        }
        typeof w.getDefaultProps == "function" && !w.getDefaultProps.isReactClassApproved && E("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ka(d) {
      {
        for (var w = Object.keys(d.props), O = 0; O < w.length; O++) {
          var P = w[O];
          if (P !== "children" && P !== "key") {
            rt(d), E("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", P), rt(null);
            break;
          }
        }
        d.ref !== null && (rt(d), E("Invalid attribute `ref` supplied to `React.Fragment`."), rt(null));
      }
    }
    var Zn = {};
    function eo(d, w, O, P, k, B) {
      {
        var D = I(d);
        if (!D) {
          var _ = "";
          (d === void 0 || typeof d == "object" && d !== null && Object.keys(d).length === 0) && (_ += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ae = Ia();
          ae ? _ += ae : _ += Jn();
          var z;
          d === null ? z = "null" : Pr(d) ? z = "array" : d !== void 0 && d.$$typeof === t ? (z = "<" + (R(d.type) || "Unknown") + " />", _ = " Did you accidentally export a JSX literal instead of a component?") : z = typeof d, E("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", z, _);
        }
        var J = Da(d, w, O, k, B);
        if (J == null)
          return J;
        if (D) {
          var ye = w.children;
          if (ye !== void 0)
            if (P)
              if (Pr(ye)) {
                for (var nt = 0; nt < ye.length; nt++)
                  Qn(ye[nt], d);
                Object.freeze && Object.freeze(ye);
              } else
                E("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Qn(ye, d);
        }
        if (bt.call(w, "key")) {
          var qe = R(d), le = Object.keys(w).filter(function(qa) {
            return qa !== "key";
          }), Nr = le.length > 0 ? "{key: someKey, " + le.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Zn[qe + Nr]) {
            var Ha = le.length > 0 ? "{" + le.join(": ..., ") + ": ...}" : "{}";
            E(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Nr, qe, Ha, qe), Zn[qe + Nr] = !0;
          }
        }
        return d === n ? ka(J) : Ma(J), J;
      }
    }
    function ja(d, w, O) {
      return eo(d, w, O, !0);
    }
    function Ba(d, w, O) {
      return eo(d, w, O, !1);
    }
    var Ua = Ba, Wa = ja;
    St.Fragment = n, St.jsx = Ua, St.jsxs = Wa;
  }()), St;
}
process.env.NODE_ENV === "production" ? Zr.exports = as() : Zr.exports = ss();
var L = Zr.exports;
function ei(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (r = ei(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function tr() {
  for (var e, t, r = 0, n = "", o = arguments.length; r < o; r++) (e = arguments[r]) && (t = ei(e)) && (n && (n += " "), n += t);
  return n;
}
var ls = Object.defineProperty, us = (e, t, r) => t in e ? ls(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Dr = (e, t, r) => (us(e, typeof t != "symbol" ? t + "" : t, r), r);
let cs = class {
  constructor() {
    Dr(this, "current", this.detect()), Dr(this, "handoffState", "pending"), Dr(this, "currentId", 0);
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
}, Ye = new cs();
function dr(e) {
  return Ye.isServer ? null : e instanceof Node ? e.ownerDocument : e != null && e.hasOwnProperty("current") && e.current instanceof Node ? e.current.ownerDocument : document;
}
function pr(e) {
  typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch((t) => setTimeout(() => {
    throw t;
  }));
}
function Be() {
  let e = [], t = { addEventListener(r, n, o, i) {
    return r.addEventListener(n, o, i), t.add(() => r.removeEventListener(n, o, i));
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
    return pr(() => {
      n.current && r[0]();
    }), t.add(() => {
      n.current = !1;
    });
  }, style(r, n, o) {
    let i = r.style.getPropertyValue(n);
    return Object.assign(r.style, { [n]: o }), this.add(() => {
      Object.assign(r.style, { [n]: i });
    });
  }, group(r) {
    let n = Be();
    return r(n), this.add(() => n.dispose());
  }, add(r) {
    return e.includes(r) || e.push(r), () => {
      let n = e.indexOf(r);
      if (n >= 0) for (let o of e.splice(n, 1)) o();
    };
  }, dispose() {
    for (let r of e.splice(0)) r();
  } };
  return t;
}
function En() {
  let [e] = Q(Be);
  return oe(() => () => e.dispose(), [e]), e;
}
let se = (e, t) => {
  Ye.isServer ? oe(e, t) : Ga(e, t);
};
function tt(e) {
  let t = U(e);
  return se(() => {
    t.current = e;
  }, [e]), t;
}
let q = function(e) {
  let t = tt(e);
  return C.useCallback((...r) => t.current(...r), [t]);
}, fs = he(void 0);
function ds() {
  return fe(fs);
}
function en(...e) {
  return Array.from(new Set(e.flatMap((t) => typeof t == "string" ? t.split(" ") : []))).filter(Boolean).join(" ");
}
function je(e, t, ...r) {
  if (e in t) {
    let o = t[e];
    return typeof o == "function" ? o(...r) : o;
  }
  let n = new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map((o) => `"${o}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(n, je), n;
}
var rr = ((e) => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(rr || {}), Me = ((e) => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(Me || {});
function ve({ ourProps: e, theirProps: t, slot: r, defaultTag: n, features: o, visible: i = !0, name: a, mergeRefs: s }) {
  s = s ?? ps;
  let l = ti(t, e);
  if (i) return Gt(l, r, n, a, s);
  let f = o ?? 0;
  if (f & 2) {
    let { static: u = !1, ...y } = l;
    if (u) return Gt(y, r, n, a, s);
  }
  if (f & 1) {
    let { unmount: u = !0, ...y } = l;
    return je(u ? 0 : 1, { 0() {
      return null;
    }, 1() {
      return Gt({ ...y, hidden: !0, style: { display: "none" } }, r, n, a, s);
    } });
  }
  return Gt(l, r, n, a, s);
}
function Gt(e, t = {}, r, n, o) {
  let { as: i = r, children: a, refName: s = "ref", ...l } = Ir(e, ["unmount", "static"]), f = e.ref !== void 0 ? { [s]: e.ref } : {}, u = typeof a == "function" ? a(t) : a;
  "className" in l && l.className && typeof l.className == "function" && (l.className = l.className(t)), l["aria-labelledby"] && l["aria-labelledby"] === l.id && (l["aria-labelledby"] = void 0);
  let y = {};
  if (t) {
    let h = !1, v = [];
    for (let [c, p] of Object.entries(t)) typeof p == "boolean" && (h = !0), p === !0 && v.push(c.replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`));
    if (h) {
      y["data-headlessui-state"] = v.join(" ");
      for (let c of v) y[`data-${c}`] = "";
    }
  }
  if (i === we && (Object.keys(Ve(l)).length > 0 || Object.keys(Ve(y)).length > 0)) if (!Ka(u) || Array.isArray(u) && u.length > 1) {
    if (Object.keys(Ve(l)).length > 0) throw new Error(['Passing props on "Fragment"!', "", `The current component <${n} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(Ve(l)).concat(Object.keys(Ve(y))).map((h) => `  - ${h}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((h) => `  - ${h}`).join(`
`)].join(`
`));
  } else {
    let h = u.props, v = h == null ? void 0 : h.className, c = typeof v == "function" ? (...b) => en(v(...b), l.className) : en(v, l.className), p = c ? { className: c } : {}, m = ti(u.props, Ve(Ir(l, ["ref"])));
    for (let b in y) b in m && delete y[b];
    return Ja(u, Object.assign({}, m, y, f, { ref: o(u.ref, f.ref) }, p));
  }
  return Ya(i, Object.assign({}, Ir(l, ["ref"]), i !== we && f, i !== we && y), u);
}
function ps(...e) {
  return e.every((t) => t == null) ? void 0 : (t) => {
    for (let r of e) r != null && (typeof r == "function" ? r(t) : r.current = t);
  };
}
function ti(...e) {
  if (e.length === 0) return {};
  if (e.length === 1) return e[0];
  let t = {}, r = {};
  for (let n of e) for (let o in n) o.startsWith("on") && typeof n[o] == "function" ? (r[o] != null || (r[o] = []), r[o].push(n[o])) : t[o] = n[o];
  if (t.disabled || t["aria-disabled"]) for (let n in r) /^(on(?:Click|Pointer|Mouse|Key)(?:Down|Up|Press)?)$/.test(n) && (r[n] = [(o) => {
    var i;
    return (i = o == null ? void 0 : o.preventDefault) == null ? void 0 : i.call(o);
  }]);
  for (let n in r) Object.assign(t, { [n](o, ...i) {
    let a = r[n];
    for (let s of a) {
      if ((o instanceof Event || (o == null ? void 0 : o.nativeEvent) instanceof Event) && o.defaultPrevented) return;
      s(o, ...i);
    }
  } });
  return t;
}
function de(e) {
  var t;
  return Object.assign(Qo(e), { displayName: (t = e.displayName) != null ? t : e.name });
}
function Ve(e) {
  let t = Object.assign({}, e);
  for (let r in t) t[r] === void 0 && delete t[r];
  return t;
}
function Ir(e, t = []) {
  let r = Object.assign({}, e);
  for (let n of t) n in r && delete r[n];
  return r;
}
let ms = "span";
var nr = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(nr || {});
function ys(e, t) {
  var r;
  let { features: n = 1, ...o } = e, i = { ref: t, "aria-hidden": (n & 2) === 2 ? !0 : (r = o["aria-hidden"]) != null ? r : void 0, hidden: (n & 4) === 4 ? !0 : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(n & 4) === 4 && (n & 2) !== 2 && { display: "none" } } };
  return ve({ ourProps: i, theirProps: o, slot: {}, defaultTag: ms, name: "Hidden" });
}
let tn = de(ys), ri = Symbol();
function hs(e, t = !0) {
  return Object.assign(e, { [ri]: t });
}
function Re(...e) {
  let t = U(e);
  oe(() => {
    t.current = e;
  }, [e]);
  let r = q((n) => {
    for (let o of t.current) o != null && (typeof o == "function" ? o(n) : o.current = n);
  });
  return e.every((n) => n == null || (n == null ? void 0 : n[ri])) ? void 0 : r;
}
let Sn = he(null);
Sn.displayName = "DescriptionContext";
function ni() {
  let e = fe(Sn);
  if (e === null) {
    let t = new Error("You used a <Description /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(t, ni), t;
  }
  return e;
}
function vs() {
  let [e, t] = Q([]);
  return [e.length > 0 ? e.join(" ") : void 0, re(() => function(r) {
    let n = q((i) => (t((a) => [...a, i]), () => t((a) => {
      let s = a.slice(), l = s.indexOf(i);
      return l !== -1 && s.splice(l, 1), s;
    }))), o = re(() => ({ register: n, slot: r.slot, name: r.name, props: r.props, value: r.value }), [n, r.slot, r.name, r.props, r.value]);
    return C.createElement(Sn.Provider, { value: o }, r.children);
  }, [t])];
}
let gs = "p";
function bs(e, t) {
  let r = It(), n = ds(), { id: o = `headlessui-description-${r}`, ...i } = e, a = ni(), s = Re(t);
  se(() => a.register(o), [o, a.register]);
  let l = n || !1, f = re(() => ({ ...a.slot, disabled: l }), [a.slot, l]), u = { ref: s, ...a.props, id: o };
  return ve({ ourProps: u, theirProps: i, slot: f, defaultTag: gs, name: a.name || "Description" });
}
let ws = de(bs), Es = Object.assign(ws, {});
var oi = ((e) => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(oi || {});
let Ss = he(() => {
});
function xs({ value: e, children: t }) {
  return C.createElement(Ss.Provider, { value: e }, t);
}
let Os = class extends Map {
  constructor(t) {
    super(), this.factory = t;
  }
  get(t) {
    let r = super.get(t);
    return r === void 0 && (r = this.factory(t), this.set(t, r)), r;
  }
};
function ii(e, t) {
  let r = e(), n = /* @__PURE__ */ new Set();
  return { getSnapshot() {
    return r;
  }, subscribe(o) {
    return n.add(o), () => n.delete(o);
  }, dispatch(o, ...i) {
    let a = t[o].call(r, ...i);
    a && (r = a, n.forEach((s) => s()));
  } };
}
function ai(e) {
  return Xa(e.subscribe, e.getSnapshot, e.getSnapshot);
}
let As = new Os(() => ii(() => [], { ADD(e) {
  return this.includes(e) ? this : [...this, e];
}, REMOVE(e) {
  let t = this.indexOf(e);
  if (t === -1) return this;
  let r = this.slice();
  return r.splice(t, 1), r;
} }));
function pt(e, t) {
  let r = As.get(t), n = It(), o = ai(r);
  if (se(() => {
    if (e) return r.dispatch("ADD", n), () => r.dispatch("REMOVE", n);
  }, [r, e]), !e) return !1;
  let i = o.indexOf(n), a = o.length;
  return i === -1 && (i = a, a += 1), i === a - 1;
}
let rn = /* @__PURE__ */ new Map(), Pt = /* @__PURE__ */ new Map();
function no(e) {
  var t;
  let r = (t = Pt.get(e)) != null ? t : 0;
  return Pt.set(e, r + 1), r !== 0 ? () => oo(e) : (rn.set(e, { "aria-hidden": e.getAttribute("aria-hidden"), inert: e.inert }), e.setAttribute("aria-hidden", "true"), e.inert = !0, () => oo(e));
}
function oo(e) {
  var t;
  let r = (t = Pt.get(e)) != null ? t : 1;
  if (r === 1 ? Pt.delete(e) : Pt.set(e, r - 1), r !== 1) return;
  let n = rn.get(e);
  n && (n["aria-hidden"] === null ? e.removeAttribute("aria-hidden") : e.setAttribute("aria-hidden", n["aria-hidden"]), e.inert = n.inert, rn.delete(e));
}
function Ts(e, { allowed: t, disallowed: r } = {}) {
  let n = pt(e, "inert-others");
  se(() => {
    var o, i;
    if (!n) return;
    let a = Be();
    for (let l of (o = r == null ? void 0 : r()) != null ? o : []) l && a.add(no(l));
    let s = (i = t == null ? void 0 : t()) != null ? i : [];
    for (let l of s) {
      if (!l) continue;
      let f = dr(l);
      if (!f) continue;
      let u = l.parentElement;
      for (; u && u !== f.body; ) {
        for (let y of u.children) s.some((h) => y.contains(h)) || a.add(no(y));
        u = u.parentElement;
      }
    }
    return a.dispose;
  }, [n, t, r]);
}
function Rs(e, t, r) {
  let n = tt((o) => {
    let i = o.getBoundingClientRect();
    i.x === 0 && i.y === 0 && i.width === 0 && i.height === 0 && r();
  });
  oe(() => {
    if (!e) return;
    let o = t === null ? null : t instanceof HTMLElement ? t : t.current;
    if (!o) return;
    let i = Be();
    if (typeof ResizeObserver < "u") {
      let a = new ResizeObserver(() => n.current(o));
      a.observe(o), i.add(() => a.disconnect());
    }
    if (typeof IntersectionObserver < "u") {
      let a = new IntersectionObserver(() => n.current(o));
      a.observe(o), i.add(() => a.disconnect());
    }
    return () => i.dispose();
  }, [t, n, e]);
}
let or = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e) => `${e}:not([tabindex='-1'])`).join(","), Ps = ["[data-autofocus]"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var Fe = ((e) => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e[e.AutoFocus = 64] = "AutoFocus", e))(Fe || {}), nn = ((e) => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(nn || {}), Cs = ((e) => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(Cs || {});
function Fs(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(or)).sort((t, r) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (r.tabIndex || Number.MAX_SAFE_INTEGER)));
}
function $s(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(Ps)).sort((t, r) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (r.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var si = ((e) => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(si || {});
function _s(e, t = 0) {
  var r;
  return e === ((r = dr(e)) == null ? void 0 : r.body) ? !1 : je(t, { 0() {
    return e.matches(or);
  }, 1() {
    let n = e;
    for (; n !== null; ) {
      if (n.matches(or)) return !0;
      n = n.parentElement;
    }
    return !1;
  } });
}
var Ns = ((e) => (e[e.Keyboard = 0] = "Keyboard", e[e.Mouse = 1] = "Mouse", e))(Ns || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (e) => {
  e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (e) => {
  e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
function $e(e) {
  e == null || e.focus({ preventScroll: !0 });
}
let Ds = ["textarea", "input"].join(",");
function Is(e) {
  var t, r;
  return (r = (t = e == null ? void 0 : e.matches) == null ? void 0 : t.call(e, Ds)) != null ? r : !1;
}
function Ls(e, t = (r) => r) {
  return e.slice().sort((r, n) => {
    let o = t(r), i = t(n);
    if (o === null || i === null) return 0;
    let a = o.compareDocumentPosition(i);
    return a & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : a & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function Ct(e, t, { sorted: r = !0, relativeTo: n = null, skipElements: o = [] } = {}) {
  let i = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : document : e.ownerDocument, a = Array.isArray(e) ? r ? Ls(e) : e : t & 64 ? $s(e) : Fs(e);
  o.length > 0 && a.length > 1 && (a = a.filter((v) => !o.some((c) => c != null && "current" in c ? (c == null ? void 0 : c.current) === v : c === v))), n = n ?? i.activeElement;
  let s = (() => {
    if (t & 5) return 1;
    if (t & 10) return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), l = (() => {
    if (t & 1) return 0;
    if (t & 2) return Math.max(0, a.indexOf(n)) - 1;
    if (t & 4) return Math.max(0, a.indexOf(n)) + 1;
    if (t & 8) return a.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), f = t & 32 ? { preventScroll: !0 } : {}, u = 0, y = a.length, h;
  do {
    if (u >= y || u + y <= 0) return 0;
    let v = l + u;
    if (t & 16) v = (v + y) % y;
    else {
      if (v < 0) return 3;
      if (v >= y) return 1;
    }
    h = a[v], h == null || h.focus(f), u += s;
  } while (h !== i.activeElement);
  return t & 6 && Is(h) && h.select(), 2;
}
function li() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function Ms() {
  return /Android/gi.test(window.navigator.userAgent);
}
function ks() {
  return li() || Ms();
}
function xt(e, t, r, n) {
  let o = tt(r);
  oe(() => {
    if (!e) return;
    function i(a) {
      o.current(a);
    }
    return document.addEventListener(t, i, n), () => document.removeEventListener(t, i, n);
  }, [e, t, n]);
}
function ui(e, t, r, n) {
  let o = tt(r);
  oe(() => {
    if (!e) return;
    function i(a) {
      o.current(a);
    }
    return window.addEventListener(t, i, n), () => window.removeEventListener(t, i, n);
  }, [e, t, n]);
}
const io = 30;
function js(e, t, r) {
  let n = pt(e, "outside-click"), o = tt(r), i = Ce(function(l, f) {
    if (l.defaultPrevented) return;
    let u = f(l);
    if (u === null || !u.getRootNode().contains(u) || !u.isConnected) return;
    let y = function h(v) {
      return typeof v == "function" ? h(v()) : Array.isArray(v) || v instanceof Set ? v : [v];
    }(t);
    for (let h of y) if (h !== null && (h.contains(u) || l.composed && l.composedPath().includes(h))) return;
    return !_s(u, si.Loose) && u.tabIndex !== -1 && l.preventDefault(), o.current(l, u);
  }, [o, t]), a = U(null);
  xt(n, "pointerdown", (l) => {
    var f, u;
    a.current = ((u = (f = l.composedPath) == null ? void 0 : f.call(l)) == null ? void 0 : u[0]) || l.target;
  }, !0), xt(n, "mousedown", (l) => {
    var f, u;
    a.current = ((u = (f = l.composedPath) == null ? void 0 : f.call(l)) == null ? void 0 : u[0]) || l.target;
  }, !0), xt(n, "click", (l) => {
    ks() || a.current && (i(l, () => a.current), a.current = null);
  }, !0);
  let s = U({ x: 0, y: 0 });
  xt(n, "touchstart", (l) => {
    s.current.x = l.touches[0].clientX, s.current.y = l.touches[0].clientY;
  }, !0), xt(n, "touchend", (l) => {
    let f = { x: l.changedTouches[0].clientX, y: l.changedTouches[0].clientY };
    if (!(Math.abs(f.x - s.current.x) >= io || Math.abs(f.y - s.current.y) >= io)) return i(l, () => l.target instanceof HTMLElement ? l.target : null);
  }, !0), ui(n, "blur", (l) => i(l, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), !0);
}
function Lt(...e) {
  return re(() => dr(...e), [...e]);
}
function ci(e, t, r, n) {
  let o = tt(r);
  oe(() => {
    e = e ?? window;
    function i(a) {
      o.current(a);
    }
    return e.addEventListener(t, i, n), () => e.removeEventListener(t, i, n);
  }, [e, t, n]);
}
function Bs() {
  let e;
  return { before({ doc: t }) {
    var r;
    let n = t.documentElement, o = (r = t.defaultView) != null ? r : window;
    e = Math.max(0, o.innerWidth - n.clientWidth);
  }, after({ doc: t, d: r }) {
    let n = t.documentElement, o = Math.max(0, n.clientWidth - n.offsetWidth), i = Math.max(0, e - o);
    r.style(n, "paddingRight", `${i}px`);
  } };
}
function Us() {
  return li() ? { before({ doc: e, d: t, meta: r }) {
    function n(o) {
      return r.containers.flatMap((i) => i()).some((i) => i.contains(o));
    }
    t.microTask(() => {
      var o;
      if (window.getComputedStyle(e.documentElement).scrollBehavior !== "auto") {
        let s = Be();
        s.style(e.documentElement, "scrollBehavior", "auto"), t.add(() => t.microTask(() => s.dispose()));
      }
      let i = (o = window.scrollY) != null ? o : window.pageYOffset, a = null;
      t.addEventListener(e, "click", (s) => {
        if (s.target instanceof HTMLElement) try {
          let l = s.target.closest("a");
          if (!l) return;
          let { hash: f } = new URL(l.href), u = e.querySelector(f);
          u && !n(u) && (a = u);
        } catch {
        }
      }, !0), t.addEventListener(e, "touchstart", (s) => {
        if (s.target instanceof HTMLElement) if (n(s.target)) {
          let l = s.target;
          for (; l.parentElement && n(l.parentElement); ) l = l.parentElement;
          t.style(l, "overscrollBehavior", "contain");
        } else t.style(s.target, "touchAction", "none");
      }), t.addEventListener(e, "touchmove", (s) => {
        if (s.target instanceof HTMLElement) {
          if (s.target.tagName === "INPUT") return;
          if (n(s.target)) {
            let l = s.target;
            for (; l.parentElement && l.dataset.headlessuiPortal !== "" && !(l.scrollHeight > l.clientHeight || l.scrollWidth > l.clientWidth); ) l = l.parentElement;
            l.dataset.headlessuiPortal === "" && s.preventDefault();
          } else s.preventDefault();
        }
      }, { passive: !1 }), t.add(() => {
        var s;
        let l = (s = window.scrollY) != null ? s : window.pageYOffset;
        i !== l && window.scrollTo(0, i), a && a.isConnected && (a.scrollIntoView({ block: "nearest" }), a = null);
      });
    });
  } } : {};
}
function Ws() {
  return { before({ doc: e, d: t }) {
    t.style(e.documentElement, "overflow", "hidden");
  } };
}
function Hs(e) {
  let t = {};
  for (let r of e) Object.assign(t, r(t));
  return t;
}
let Ke = ii(() => /* @__PURE__ */ new Map(), { PUSH(e, t) {
  var r;
  let n = (r = this.get(e)) != null ? r : { doc: e, count: 0, d: Be(), meta: /* @__PURE__ */ new Set() };
  return n.count++, n.meta.add(t), this.set(e, n), this;
}, POP(e, t) {
  let r = this.get(e);
  return r && (r.count--, r.meta.delete(t)), this;
}, SCROLL_PREVENT({ doc: e, d: t, meta: r }) {
  let n = { doc: e, d: t, meta: Hs(r) }, o = [Us(), Bs(), Ws()];
  o.forEach(({ before: i }) => i == null ? void 0 : i(n)), o.forEach(({ after: i }) => i == null ? void 0 : i(n));
}, SCROLL_ALLOW({ d: e }) {
  e.dispose();
}, TEARDOWN({ doc: e }) {
  this.delete(e);
} });
Ke.subscribe(() => {
  let e = Ke.getSnapshot(), t = /* @__PURE__ */ new Map();
  for (let [r] of e) t.set(r, r.documentElement.style.overflow);
  for (let r of e.values()) {
    let n = t.get(r.doc) === "hidden", o = r.count !== 0;
    (o && !n || !o && n) && Ke.dispatch(r.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", r), r.count === 0 && Ke.dispatch("TEARDOWN", r);
  }
});
function qs(e, t, r = () => ({ containers: [] })) {
  let n = ai(Ke), o = t ? n.get(t) : void 0, i = o ? o.count > 0 : !1;
  return se(() => {
    if (!(!t || !e)) return Ke.dispatch("PUSH", t, r), () => Ke.dispatch("POP", t, r);
  }, [e, t]), i;
}
function Vs(e, t, r = () => [document.body]) {
  let n = pt(e, "scroll-lock");
  qs(n, t, (o) => {
    var i;
    return { containers: [...(i = o.containers) != null ? i : [], r] };
  });
}
function zs(e = 0) {
  let [t, r] = Q(e), n = Ce((l) => r(l), [t]), o = Ce((l) => r((f) => f | l), [t]), i = Ce((l) => (t & l) === l, [t]), a = Ce((l) => r((f) => f & ~l), [r]), s = Ce((l) => r((f) => f ^ l), [r]);
  return { flags: t, setFlag: n, addFlag: o, hasFlag: i, removeFlag: a, toggleFlag: s };
}
var ao, so;
typeof process < "u" && typeof globalThis < "u" && typeof Element < "u" && ((ao = process == null ? void 0 : process.env) == null ? void 0 : ao.NODE_ENV) === "test" && typeof ((so = Element == null ? void 0 : Element.prototype) == null ? void 0 : so.getAnimations) > "u" && (Element.prototype.getAnimations = function() {
  return console.warn(["Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.", "Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.", "", "Example usage:", "```js", "import { mockAnimationsApi } from 'jsdom-testing-mocks'", "mockAnimationsApi()", "```"].join(`
`)), [];
});
var Gs = ((e) => (e[e.None = 0] = "None", e[e.Closed = 1] = "Closed", e[e.Enter = 2] = "Enter", e[e.Leave = 4] = "Leave", e))(Gs || {});
function Ks(e) {
  let t = {};
  for (let r in e) e[r] === !0 && (t[`data-${r}`] = "");
  return t;
}
function Js(e, t, r, n) {
  let [o, i] = Q(r), { hasFlag: a, addFlag: s, removeFlag: l } = zs(e && o ? 3 : 0), f = U(!1), u = U(!1), y = En();
  return se(() => {
    var h;
    if (e) {
      if (r && i(!0), !t) {
        r && s(3);
        return;
      }
      return (h = n == null ? void 0 : n.start) == null || h.call(n, r), Ys(t, { inFlight: f, prepare() {
        u.current ? u.current = !1 : u.current = f.current, f.current = !0, !u.current && (r ? (s(3), l(4)) : (s(4), l(2)));
      }, run() {
        u.current ? r ? (l(3), s(4)) : (l(4), s(3)) : r ? l(1) : s(1);
      }, done() {
        var v;
        u.current && typeof t.getAnimations == "function" && t.getAnimations().length > 0 || (f.current = !1, l(7), r || i(!1), (v = n == null ? void 0 : n.end) == null || v.call(n, r));
      } });
    }
  }, [e, r, t, y]), e ? [o, { closed: a(1), enter: a(2), leave: a(4), transition: a(2) || a(4) }] : [r, { closed: void 0, enter: void 0, leave: void 0, transition: void 0 }];
}
function Ys(e, { prepare: t, run: r, done: n, inFlight: o }) {
  let i = Be();
  return Qs(e, { prepare: t, inFlight: o }), i.nextFrame(() => {
    r(), i.requestAnimationFrame(() => {
      i.add(Xs(e, n));
    });
  }), i.dispose;
}
function Xs(e, t) {
  var r, n;
  let o = Be();
  if (!e) return o.dispose;
  let i = !1;
  o.add(() => {
    i = !0;
  });
  let a = (n = (r = e.getAnimations) == null ? void 0 : r.call(e).filter((s) => s instanceof CSSTransition)) != null ? n : [];
  return a.length === 0 ? (t(), o.dispose) : (Promise.allSettled(a.map((s) => s.finished)).then(() => {
    i || t();
  }), o.dispose);
}
function Qs(e, { inFlight: t, prepare: r }) {
  if (t != null && t.current) {
    r();
    return;
  }
  let n = e.style.transition;
  e.style.transition = "none", r(), e.offsetHeight, e.style.transition = n;
}
function xn(e, t) {
  let r = U([]), n = q(e);
  oe(() => {
    let o = [...r.current];
    for (let [i, a] of t.entries()) if (r.current[i] !== a) {
      let s = n(t, o);
      return r.current = t, s;
    }
  }, [n, ...t]);
}
let mr = he(null);
mr.displayName = "OpenClosedContext";
var be = ((e) => (e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(be || {});
function yr() {
  return fe(mr);
}
function Zs({ value: e, children: t }) {
  return C.createElement(mr.Provider, { value: e }, t);
}
function el({ children: e }) {
  return C.createElement(mr.Provider, { value: null }, e);
}
function tl(e) {
  function t() {
    document.readyState !== "loading" && (e(), document.removeEventListener("DOMContentLoaded", t));
  }
  typeof window < "u" && typeof document < "u" && (document.addEventListener("DOMContentLoaded", t), t());
}
let Le = [];
tl(() => {
  function e(t) {
    if (!(t.target instanceof HTMLElement) || t.target === document.body || Le[0] === t.target) return;
    let r = t.target;
    r = r.closest(or), Le.unshift(r ?? t.target), Le = Le.filter((n) => n != null && n.isConnected), Le.splice(10);
  }
  window.addEventListener("click", e, { capture: !0 }), window.addEventListener("mousedown", e, { capture: !0 }), window.addEventListener("focus", e, { capture: !0 }), document.body.addEventListener("click", e, { capture: !0 }), document.body.addEventListener("mousedown", e, { capture: !0 }), document.body.addEventListener("focus", e, { capture: !0 });
});
function fi(e) {
  let t = q(e), r = U(!1);
  oe(() => (r.current = !1, () => {
    r.current = !0, pr(() => {
      r.current && t();
    });
  }), [t]);
}
function rl() {
  let e = typeof document > "u";
  return "useSyncExternalStore" in Rt ? ((t) => t.useSyncExternalStore)(Rt)(() => () => {
  }, () => !1, () => !e) : !1;
}
function Mt() {
  let e = rl(), [t, r] = Rt.useState(Ye.isHandoffComplete);
  return t && Ye.isHandoffComplete === !1 && r(!1), Rt.useEffect(() => {
    t !== !0 && r(!0);
  }, [t]), Rt.useEffect(() => Ye.handoff(), []), e ? !1 : t;
}
let di = he(!1);
function nl() {
  return fe(di);
}
function lo(e) {
  return C.createElement(di.Provider, { value: e.force }, e.children);
}
function ol(e) {
  let t = nl(), r = fe(mi), n = Lt(e), [o, i] = Q(() => {
    var a;
    if (!t && r !== null) return (a = r.current) != null ? a : null;
    if (Ye.isServer) return null;
    let s = n == null ? void 0 : n.getElementById("headlessui-portal-root");
    if (s) return s;
    if (n === null) return null;
    let l = n.createElement("div");
    return l.setAttribute("id", "headlessui-portal-root"), n.body.appendChild(l);
  });
  return oe(() => {
    o !== null && (n != null && n.body.contains(o) || n == null || n.body.appendChild(o));
  }, [o, n]), oe(() => {
    t || r !== null && i(r.current);
  }, [r, i, t]), o;
}
let pi = we, il = de(function(e, t) {
  let r = e, n = U(null), o = Re(hs((u) => {
    n.current = u;
  }), t), i = Lt(n), a = ol(n), [s] = Q(() => {
    var u;
    return Ye.isServer ? null : (u = i == null ? void 0 : i.createElement("div")) != null ? u : null;
  }), l = fe(on), f = Mt();
  return se(() => {
    !a || !s || a.contains(s) || (s.setAttribute("data-headlessui-portal", ""), a.appendChild(s));
  }, [a, s]), se(() => {
    if (s && l) return l.register(s);
  }, [l, s]), fi(() => {
    var u;
    !a || !s || (s instanceof Node && a.contains(s) && a.removeChild(s), a.childNodes.length <= 0 && ((u = a.parentElement) == null || u.removeChild(a)));
  }), f ? !a || !s ? null : ts(ve({ ourProps: { ref: o }, theirProps: r, slot: {}, defaultTag: pi, name: "Portal" }), s) : null;
});
function al(e, t) {
  let r = Re(t), { enabled: n = !0, ...o } = e;
  return n ? C.createElement(il, { ...o, ref: r }) : ve({ ourProps: { ref: r }, theirProps: o, slot: {}, defaultTag: pi, name: "Portal" });
}
let sl = we, mi = he(null);
function ll(e, t) {
  let { target: r, ...n } = e, o = { ref: Re(t) };
  return C.createElement(mi.Provider, { value: r }, ve({ ourProps: o, theirProps: n, defaultTag: sl, name: "Popover.Group" }));
}
let on = he(null);
function ul() {
  let e = fe(on), t = U([]), r = q((i) => (t.current.push(i), e && e.register(i), () => n(i))), n = q((i) => {
    let a = t.current.indexOf(i);
    a !== -1 && t.current.splice(a, 1), e && e.unregister(i);
  }), o = re(() => ({ register: r, unregister: n, portals: t }), [r, n, t]);
  return [t, re(() => function({ children: i }) {
    return C.createElement(on.Provider, { value: o }, i);
  }, [o])];
}
let cl = de(al), yi = de(ll), fl = Object.assign(cl, { Group: yi });
function dl(e, t = typeof document < "u" ? document.defaultView : null, r) {
  let n = pt(e, "escape");
  ci(t, "keydown", (o) => {
    n && (o.defaultPrevented || o.key === oi.Escape && r(o));
  });
}
function pl() {
  var e;
  let [t] = Q(() => typeof window < "u" && typeof window.matchMedia == "function" ? window.matchMedia("(pointer: coarse)") : null), [r, n] = Q((e = t == null ? void 0 : t.matches) != null ? e : !1);
  return se(() => {
    if (!t) return;
    function o(i) {
      n(i.matches);
    }
    return t.addEventListener("change", o), () => t.removeEventListener("change", o);
  }, [t]), r;
}
function ml({ defaultContainers: e = [], portals: t, mainTreeNode: r } = {}) {
  let n = Lt(r), o = q(() => {
    var i, a;
    let s = [];
    for (let l of e) l !== null && (l instanceof HTMLElement ? s.push(l) : "current" in l && l.current instanceof HTMLElement && s.push(l.current));
    if (t != null && t.current) for (let l of t.current) s.push(l);
    for (let l of (i = n == null ? void 0 : n.querySelectorAll("html > *, body > *")) != null ? i : []) l !== document.body && l !== document.head && l instanceof HTMLElement && l.id !== "headlessui-portal-root" && (r && (l.contains(r) || l.contains((a = r == null ? void 0 : r.getRootNode()) == null ? void 0 : a.host)) || s.some((f) => l.contains(f)) || s.push(l));
    return s;
  });
  return { resolveContainers: o, contains: q((i) => o().some((a) => a.contains(i))) };
}
let hi = he(null);
function uo({ children: e, node: t }) {
  let [r, n] = Q(null), o = vi(t ?? r);
  return C.createElement(hi.Provider, { value: o }, e, o === null && C.createElement(tn, { features: nr.Hidden, ref: (i) => {
    var a, s;
    if (i) {
      for (let l of (s = (a = dr(i)) == null ? void 0 : a.querySelectorAll("html > *, body > *")) != null ? s : []) if (l !== document.body && l !== document.head && l instanceof HTMLElement && l != null && l.contains(i)) {
        n(l);
        break;
      }
    }
  } }));
}
function vi(e = null) {
  var t;
  return (t = fe(hi)) != null ? t : e;
}
function On() {
  let e = U(!1);
  return se(() => (e.current = !0, () => {
    e.current = !1;
  }), []), e;
}
var Tt = ((e) => (e[e.Forwards = 0] = "Forwards", e[e.Backwards = 1] = "Backwards", e))(Tt || {});
function yl() {
  let e = U(0);
  return ui(!0, "keydown", (t) => {
    t.key === "Tab" && (e.current = t.shiftKey ? 1 : 0);
  }, !0), e;
}
function gi(e) {
  if (!e) return /* @__PURE__ */ new Set();
  if (typeof e == "function") return new Set(e());
  let t = /* @__PURE__ */ new Set();
  for (let r of e.current) r.current instanceof HTMLElement && t.add(r.current);
  return t;
}
let hl = "div";
var ze = ((e) => (e[e.None = 0] = "None", e[e.InitialFocus = 1] = "InitialFocus", e[e.TabLock = 2] = "TabLock", e[e.FocusLock = 4] = "FocusLock", e[e.RestoreFocus = 8] = "RestoreFocus", e[e.AutoFocus = 16] = "AutoFocus", e))(ze || {});
function vl(e, t) {
  let r = U(null), n = Re(r, t), { initialFocus: o, initialFocusFallback: i, containers: a, features: s = 15, ...l } = e;
  Mt() || (s = 0);
  let f = Lt(r);
  El(s, { ownerDocument: f });
  let u = Sl(s, { ownerDocument: f, container: r, initialFocus: o, initialFocusFallback: i });
  xl(s, { ownerDocument: f, container: r, containers: a, previousActiveElement: u });
  let y = yl(), h = q((b) => {
    let E = r.current;
    E && ((S) => S())(() => {
      je(y.current, { [Tt.Forwards]: () => {
        Ct(E, Fe.First, { skipElements: [b.relatedTarget, i] });
      }, [Tt.Backwards]: () => {
        Ct(E, Fe.Last, { skipElements: [b.relatedTarget, i] });
      } });
    });
  }), v = pt(!!(s & 2), "focus-trap#tab-lock"), c = En(), p = U(!1), m = { ref: n, onKeyDown(b) {
    b.key == "Tab" && (p.current = !0, c.requestAnimationFrame(() => {
      p.current = !1;
    }));
  }, onBlur(b) {
    if (!(s & 4)) return;
    let E = gi(a);
    r.current instanceof HTMLElement && E.add(r.current);
    let S = b.relatedTarget;
    S instanceof HTMLElement && S.dataset.headlessuiFocusGuard !== "true" && (bi(E, S) || (p.current ? Ct(r.current, je(y.current, { [Tt.Forwards]: () => Fe.Next, [Tt.Backwards]: () => Fe.Previous }) | Fe.WrapAround, { relativeTo: b.target }) : b.target instanceof HTMLElement && $e(b.target)));
  } };
  return C.createElement(C.Fragment, null, v && C.createElement(tn, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: h, features: nr.Focusable }), ve({ ourProps: m, theirProps: l, defaultTag: hl, name: "FocusTrap" }), v && C.createElement(tn, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: h, features: nr.Focusable }));
}
let gl = de(vl), bl = Object.assign(gl, { features: ze });
function wl(e = !0) {
  let t = U(Le.slice());
  return xn(([r], [n]) => {
    n === !0 && r === !1 && pr(() => {
      t.current.splice(0);
    }), n === !1 && r === !0 && (t.current = Le.slice());
  }, [e, Le, t]), q(() => {
    var r;
    return (r = t.current.find((n) => n != null && n.isConnected)) != null ? r : null;
  });
}
function El(e, { ownerDocument: t }) {
  let r = !!(e & 8), n = wl(r);
  xn(() => {
    r || (t == null ? void 0 : t.activeElement) === (t == null ? void 0 : t.body) && $e(n());
  }, [r]), fi(() => {
    r && $e(n());
  });
}
function Sl(e, { ownerDocument: t, container: r, initialFocus: n, initialFocusFallback: o }) {
  let i = U(null), a = pt(!!(e & 1), "focus-trap#initial-focus"), s = On();
  return xn(() => {
    if (e === 0) return;
    if (!a) {
      o != null && o.current && $e(o.current);
      return;
    }
    let l = r.current;
    l && pr(() => {
      if (!s.current) return;
      let f = t == null ? void 0 : t.activeElement;
      if (n != null && n.current) {
        if ((n == null ? void 0 : n.current) === f) {
          i.current = f;
          return;
        }
      } else if (l.contains(f)) {
        i.current = f;
        return;
      }
      if (n != null && n.current) $e(n.current);
      else {
        if (e & 16) {
          if (Ct(l, Fe.First | Fe.AutoFocus) !== nn.Error) return;
        } else if (Ct(l, Fe.First) !== nn.Error) return;
        if (o != null && o.current && ($e(o.current), (t == null ? void 0 : t.activeElement) === o.current)) return;
        console.warn("There are no focusable elements inside the <FocusTrap />");
      }
      i.current = t == null ? void 0 : t.activeElement;
    });
  }, [o, a, e]), i;
}
function xl(e, { ownerDocument: t, container: r, containers: n, previousActiveElement: o }) {
  let i = On(), a = !!(e & 4);
  ci(t == null ? void 0 : t.defaultView, "focus", (s) => {
    if (!a || !i.current) return;
    let l = gi(n);
    r.current instanceof HTMLElement && l.add(r.current);
    let f = o.current;
    if (!f) return;
    let u = s.target;
    u && u instanceof HTMLElement ? bi(l, u) ? (o.current = u, $e(u)) : (s.preventDefault(), s.stopPropagation(), $e(f)) : $e(o.current);
  }, !0);
}
function bi(e, t) {
  for (let r of e) if (r.contains(t)) return !0;
  return !1;
}
function wi(e) {
  var t;
  return !!(e.enter || e.enterFrom || e.enterTo || e.leave || e.leaveFrom || e.leaveTo) || ((t = e.as) != null ? t : Si) !== we || C.Children.count(e.children) === 1;
}
let hr = he(null);
hr.displayName = "TransitionContext";
var Ol = ((e) => (e.Visible = "visible", e.Hidden = "hidden", e))(Ol || {});
function Al() {
  let e = fe(hr);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
function Tl() {
  let e = fe(vr);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
let vr = he(null);
vr.displayName = "NestingContext";
function gr(e) {
  return "children" in e ? gr(e.children) : e.current.filter(({ el: t }) => t.current !== null).filter(({ state: t }) => t === "visible").length > 0;
}
function Ei(e, t) {
  let r = tt(e), n = U([]), o = On(), i = En(), a = q((v, c = Me.Hidden) => {
    let p = n.current.findIndex(({ el: m }) => m === v);
    p !== -1 && (je(c, { [Me.Unmount]() {
      n.current.splice(p, 1);
    }, [Me.Hidden]() {
      n.current[p].state = "hidden";
    } }), i.microTask(() => {
      var m;
      !gr(n) && o.current && ((m = r.current) == null || m.call(r));
    }));
  }), s = q((v) => {
    let c = n.current.find(({ el: p }) => p === v);
    return c ? c.state !== "visible" && (c.state = "visible") : n.current.push({ el: v, state: "visible" }), () => a(v, Me.Unmount);
  }), l = U([]), f = U(Promise.resolve()), u = U({ enter: [], leave: [] }), y = q((v, c, p) => {
    l.current.splice(0), t && (t.chains.current[c] = t.chains.current[c].filter(([m]) => m !== v)), t == null || t.chains.current[c].push([v, new Promise((m) => {
      l.current.push(m);
    })]), t == null || t.chains.current[c].push([v, new Promise((m) => {
      Promise.all(u.current[c].map(([b, E]) => E)).then(() => m());
    })]), c === "enter" ? f.current = f.current.then(() => t == null ? void 0 : t.wait.current).then(() => p(c)) : p(c);
  }), h = q((v, c, p) => {
    Promise.all(u.current[c].splice(0).map(([m, b]) => b)).then(() => {
      var m;
      (m = l.current.shift()) == null || m();
    }).then(() => p(c));
  });
  return re(() => ({ children: n, register: s, unregister: a, onStart: y, onStop: h, wait: f, chains: u }), [s, a, n, y, h, u, f]);
}
let Si = we, xi = rr.RenderStrategy;
function Rl(e, t) {
  var r, n;
  let { transition: o = !0, beforeEnter: i, afterEnter: a, beforeLeave: s, afterLeave: l, enter: f, enterFrom: u, enterTo: y, entered: h, leave: v, leaveFrom: c, leaveTo: p, ...m } = e, [b, E] = Q(null), S = U(null), x = wi(e), A = Re(...x ? [S, t, E] : t === null ? [] : [t]), T = (r = m.unmount) == null || r ? Me.Unmount : Me.Hidden, { show: $, appear: j, initial: H } = Al(), [I, Y] = Q($ ? "visible" : "hidden"), Z = Tl(), { register: R, unregister: M } = Z;
  se(() => R(S), [R, S]), se(() => {
    if (T === Me.Hidden && S.current) {
      if ($ && I !== "visible") {
        Y("visible");
        return;
      }
      return je(I, { hidden: () => M(S), visible: () => R(S) });
    }
  }, [I, S, R, M, $, T]);
  let K = Mt();
  se(() => {
    if (x && K && I === "visible" && S.current === null) throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
  }, [S, I, K, x]);
  let pe = H && !j, ge = j && $ && H, Se = U(!1), ne = Ei(() => {
    Se.current || (Y("hidden"), M(S));
  }, Z), W = q((He) => {
    Se.current = !0;
    let Ne = He ? "enter" : "leave";
    ne.onStart(S, Ne, (xe) => {
      xe === "enter" ? i == null || i() : xe === "leave" && (s == null || s());
    });
  }), _e = q((He) => {
    let Ne = He ? "enter" : "leave";
    Se.current = !1, ne.onStop(S, Ne, (xe) => {
      xe === "enter" ? a == null || a() : xe === "leave" && (l == null || l());
    }), Ne === "leave" && !gr(ne) && (Y("hidden"), M(S));
  });
  oe(() => {
    x && o || (W($), _e($));
  }, [$, x, o]);
  let Wt = !(!o || !x || !K || pe), [, te] = Js(Wt, b, $, { start: W, end: _e }), Tr = Ve({ ref: A, className: ((n = en(m.className, ge && f, ge && u, te.enter && f, te.enter && te.closed && u, te.enter && !te.closed && y, te.leave && v, te.leave && !te.closed && c, te.leave && te.closed && p, !te.transition && $ && h)) == null ? void 0 : n.trim()) || void 0, ...Ks(te) }), We = 0;
  return I === "visible" && (We |= be.Open), I === "hidden" && (We |= be.Closed), te.enter && (We |= be.Opening), te.leave && (We |= be.Closing), C.createElement(vr.Provider, { value: ne }, C.createElement(Zs, { value: We }, ve({ ourProps: Tr, theirProps: m, defaultTag: Si, features: xi, visible: I === "visible", name: "Transition.Child" })));
}
function Pl(e, t) {
  let { show: r, appear: n = !1, unmount: o = !0, ...i } = e, a = U(null), s = wi(e), l = Re(...s ? [a, t] : t === null ? [] : [t]);
  Mt();
  let f = yr();
  if (r === void 0 && f !== null && (r = (f & be.Open) === be.Open), r === void 0) throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
  let [u, y] = Q(r ? "visible" : "hidden"), h = Ei(() => {
    r || y("hidden");
  }), [v, c] = Q(!0), p = U([r]);
  se(() => {
    v !== !1 && p.current[p.current.length - 1] !== r && (p.current.push(r), c(!1));
  }, [p, r]);
  let m = re(() => ({ show: r, appear: n, initial: v }), [r, n, v]);
  se(() => {
    r ? y("visible") : !gr(h) && a.current !== null && y("hidden");
  }, [r, h]);
  let b = { unmount: o }, E = q(() => {
    var x;
    v && c(!1), (x = e.beforeEnter) == null || x.call(e);
  }), S = q(() => {
    var x;
    v && c(!1), (x = e.beforeLeave) == null || x.call(e);
  });
  return C.createElement(vr.Provider, { value: h }, C.createElement(hr.Provider, { value: m }, ve({ ourProps: { ...b, as: we, children: C.createElement(Oi, { ref: l, ...b, ...i, beforeEnter: E, beforeLeave: S }) }, theirProps: {}, defaultTag: we, features: xi, visible: u === "visible", name: "Transition" })));
}
function Cl(e, t) {
  let r = fe(hr) !== null, n = yr() !== null;
  return C.createElement(C.Fragment, null, !r && n ? C.createElement(an, { ref: t, ...e }) : C.createElement(Oi, { ref: t, ...e }));
}
let an = de(Pl), Oi = de(Rl), mt = de(Cl), Ai = Object.assign(an, { Child: mt, Root: an });
var Fl = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(Fl || {}), $l = ((e) => (e[e.SetTitleId = 0] = "SetTitleId", e))($l || {});
let _l = { 0(e, t) {
  return e.titleId === t.id ? e : { ...e, titleId: t.id };
} }, An = he(null);
An.displayName = "DialogContext";
function br(e) {
  let t = fe(An);
  if (t === null) {
    let r = new Error(`<${e} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(r, br), r;
  }
  return t;
}
function Nl(e, t) {
  return je(t.type, _l, e, t);
}
let co = de(function(e, t) {
  let r = It(), { id: n = `headlessui-dialog-${r}`, open: o, onClose: i, initialFocus: a, role: s = "dialog", autoFocus: l = !0, __demoMode: f = !1, unmount: u = !1, ...y } = e, h = U(!1);
  s = function() {
    return s === "dialog" || s === "alertdialog" ? s : (h.current || (h.current = !0, console.warn(`Invalid role [${s}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog");
  }();
  let v = yr();
  o === void 0 && v !== null && (o = (v & be.Open) === be.Open);
  let c = U(null), p = Re(c, t), m = Lt(c), b = o ? 0 : 1, [E, S] = Qa(Nl, { titleId: null, descriptionId: null, panelRef: Za() }), x = q(() => i(!1)), A = q((W) => S({ type: 0, id: W })), T = Mt() ? b === 0 : !1, [$, j] = ul(), H = { get current() {
    var W;
    return (W = E.panelRef.current) != null ? W : c.current;
  } }, I = vi(), { resolveContainers: Y } = ml({ mainTreeNode: I, portals: $, defaultContainers: [H] }), Z = v !== null ? (v & be.Closing) === be.Closing : !1;
  Ts(f || Z ? !1 : T, { allowed: q(() => {
    var W, _e;
    return [(_e = (W = c.current) == null ? void 0 : W.closest("[data-headlessui-portal]")) != null ? _e : null];
  }), disallowed: q(() => {
    var W;
    return [(W = I == null ? void 0 : I.closest("body > *:not(#headlessui-portal-root)")) != null ? W : null];
  }) }), js(T, Y, (W) => {
    W.preventDefault(), x();
  }), dl(T, m == null ? void 0 : m.defaultView, (W) => {
    W.preventDefault(), W.stopPropagation(), document.activeElement && "blur" in document.activeElement && typeof document.activeElement.blur == "function" && document.activeElement.blur(), x();
  }), Vs(f || Z ? !1 : T, m, Y), Rs(T, c, x);
  let [R, M] = vs(), K = re(() => [{ dialogState: b, close: x, setTitleId: A, unmount: u }, E], [b, E, x, A, u]), pe = re(() => ({ open: b === 0 }), [b]), ge = { ref: p, id: n, role: s, tabIndex: -1, "aria-modal": f ? void 0 : b === 0 ? !0 : void 0, "aria-labelledby": E.titleId, "aria-describedby": R, unmount: u }, Se = !pl(), ne = ze.None;
  return T && !f && (ne |= ze.RestoreFocus, ne |= ze.TabLock, l && (ne |= ze.AutoFocus), Se && (ne |= ze.InitialFocus)), C.createElement(el, null, C.createElement(lo, { force: !0 }, C.createElement(fl, null, C.createElement(An.Provider, { value: K }, C.createElement(yi, { target: c }, C.createElement(lo, { force: !1 }, C.createElement(M, { slot: pe }, C.createElement(j, null, C.createElement(bl, { initialFocus: a, initialFocusFallback: c, containers: Y, features: ne }, C.createElement(xs, { value: x }, ve({ ourProps: ge, theirProps: y, slot: pe, defaultTag: Dl, features: Il, visible: b === 0, name: "Dialog" })))))))))));
}), Dl = "div", Il = rr.RenderStrategy | rr.Static;
function Ll(e, t) {
  let { transition: r = !1, open: n, ...o } = e, i = yr(), a = e.hasOwnProperty("open") || i !== null, s = e.hasOwnProperty("onClose");
  if (!a && !s) throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");
  if (!a) throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");
  if (!s) throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");
  if (!i && typeof e.open != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${e.open}`);
  if (typeof e.onClose != "function") throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${e.onClose}`);
  return (n !== void 0 || r) && !o.static ? C.createElement(uo, null, C.createElement(Ai, { show: n, transition: r, unmount: o.unmount }, C.createElement(co, { ref: t, ...o }))) : C.createElement(uo, null, C.createElement(co, { ref: t, open: n, ...o }));
}
let Ml = "div";
function kl(e, t) {
  let r = It(), { id: n = `headlessui-dialog-panel-${r}`, transition: o = !1, ...i } = e, [{ dialogState: a, unmount: s }, l] = br("Dialog.Panel"), f = Re(t, l.panelRef), u = re(() => ({ open: a === 0 }), [a]), y = q((v) => {
    v.stopPropagation();
  }), h = { ref: f, id: n, onClick: y };
  return C.createElement(o ? mt : we, { ...o ? { unmount: s } : {} }, ve({ ourProps: h, theirProps: i, slot: u, defaultTag: Ml, name: "Dialog.Panel" }));
}
let jl = "div";
function Bl(e, t) {
  let { transition: r = !1, ...n } = e, [{ dialogState: o, unmount: i }] = br("Dialog.Backdrop"), a = re(() => ({ open: o === 0 }), [o]), s = { ref: t, "aria-hidden": !0 };
  return C.createElement(r ? mt : we, { ...r ? { unmount: i } : {} }, ve({ ourProps: s, theirProps: n, slot: a, defaultTag: jl, name: "Dialog.Backdrop" }));
}
let Ul = "h2";
function Wl(e, t) {
  let r = It(), { id: n = `headlessui-dialog-title-${r}`, ...o } = e, [{ dialogState: i, setTitleId: a }] = br("Dialog.Title"), s = Re(t);
  oe(() => (a(n), () => a(null)), [n, a]);
  let l = re(() => ({ open: i === 0 }), [i]);
  return ve({ ourProps: { ref: s, id: n }, theirProps: o, slot: l, defaultTag: Ul, name: "Dialog.Title" });
}
let Hl = de(Ll), Tn = de(kl);
de(Bl);
let ql = de(Wl), Vl = Object.assign(Hl, { Panel: Tn, Title: ql, Description: Es });
function Ti(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: zl } = Object.prototype, { getPrototypeOf: Rn } = Object, wr = /* @__PURE__ */ ((e) => (t) => {
  const r = zl.call(t);
  return e[r] || (e[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), Ee = (e) => (e = e.toLowerCase(), (t) => wr(t) === e), Er = (e) => (t) => typeof t === e, { isArray: yt } = Array, Nt = Er("undefined");
function Gl(e) {
  return e !== null && !Nt(e) && e.constructor !== null && !Nt(e.constructor) && me(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Ri = Ee("ArrayBuffer");
function Kl(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Ri(e.buffer), t;
}
const Jl = Er("string"), me = Er("function"), Pi = Er("number"), Sr = (e) => e !== null && typeof e == "object", Yl = (e) => e === !0 || e === !1, Xt = (e) => {
  if (wr(e) !== "object")
    return !1;
  const t = Rn(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, Xl = Ee("Date"), Ql = Ee("File"), Zl = Ee("Blob"), eu = Ee("FileList"), tu = (e) => Sr(e) && me(e.pipe), ru = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || me(e.append) && ((t = wr(e)) === "formdata" || // detect form-data instance
  t === "object" && me(e.toString) && e.toString() === "[object FormData]"));
}, nu = Ee("URLSearchParams"), [ou, iu, au, su] = ["ReadableStream", "Request", "Response", "Headers"].map(Ee), lu = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function kt(e, t, { allOwnKeys: r = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let n, o;
  if (typeof e != "object" && (e = [e]), yt(e))
    for (n = 0, o = e.length; n < o; n++)
      t.call(null, e[n], n, e);
  else {
    const i = r ? Object.getOwnPropertyNames(e) : Object.keys(e), a = i.length;
    let s;
    for (n = 0; n < a; n++)
      s = i[n], t.call(null, e[s], s, e);
  }
}
function Ci(e, t) {
  t = t.toLowerCase();
  const r = Object.keys(e);
  let n = r.length, o;
  for (; n-- > 0; )
    if (o = r[n], t === o.toLowerCase())
      return o;
  return null;
}
const Je = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Fi = (e) => !Nt(e) && e !== Je;
function sn() {
  const { caseless: e } = Fi(this) && this || {}, t = {}, r = (n, o) => {
    const i = e && Ci(t, o) || o;
    Xt(t[i]) && Xt(n) ? t[i] = sn(t[i], n) : Xt(n) ? t[i] = sn({}, n) : yt(n) ? t[i] = n.slice() : t[i] = n;
  };
  for (let n = 0, o = arguments.length; n < o; n++)
    arguments[n] && kt(arguments[n], r);
  return t;
}
const uu = (e, t, r, { allOwnKeys: n } = {}) => (kt(t, (o, i) => {
  r && me(o) ? e[i] = Ti(o, r) : e[i] = o;
}, { allOwnKeys: n }), e), cu = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), fu = (e, t, r, n) => {
  e.prototype = Object.create(t.prototype, n), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), r && Object.assign(e.prototype, r);
}, du = (e, t, r, n) => {
  let o, i, a;
  const s = {};
  if (t = t || {}, e == null) return t;
  do {
    for (o = Object.getOwnPropertyNames(e), i = o.length; i-- > 0; )
      a = o[i], (!n || n(a, e, t)) && !s[a] && (t[a] = e[a], s[a] = !0);
    e = r !== !1 && Rn(e);
  } while (e && (!r || r(e, t)) && e !== Object.prototype);
  return t;
}, pu = (e, t, r) => {
  e = String(e), (r === void 0 || r > e.length) && (r = e.length), r -= t.length;
  const n = e.indexOf(t, r);
  return n !== -1 && n === r;
}, mu = (e) => {
  if (!e) return null;
  if (yt(e)) return e;
  let t = e.length;
  if (!Pi(t)) return null;
  const r = new Array(t);
  for (; t-- > 0; )
    r[t] = e[t];
  return r;
}, yu = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Rn(Uint8Array)), hu = (e, t) => {
  const n = (e && e[Symbol.iterator]).call(e);
  let o;
  for (; (o = n.next()) && !o.done; ) {
    const i = o.value;
    t.call(e, i[0], i[1]);
  }
}, vu = (e, t) => {
  let r;
  const n = [];
  for (; (r = e.exec(t)) !== null; )
    n.push(r);
  return n;
}, gu = Ee("HTMLFormElement"), bu = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(r, n, o) {
    return n.toUpperCase() + o;
  }
), fo = (({ hasOwnProperty: e }) => (t, r) => e.call(t, r))(Object.prototype), wu = Ee("RegExp"), $i = (e, t) => {
  const r = Object.getOwnPropertyDescriptors(e), n = {};
  kt(r, (o, i) => {
    let a;
    (a = t(o, i, e)) !== !1 && (n[i] = a || o);
  }), Object.defineProperties(e, n);
}, Eu = (e) => {
  $i(e, (t, r) => {
    if (me(e) && ["arguments", "caller", "callee"].indexOf(r) !== -1)
      return !1;
    const n = e[r];
    if (me(n)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + r + "'");
      });
    }
  });
}, Su = (e, t) => {
  const r = {}, n = (o) => {
    o.forEach((i) => {
      r[i] = !0;
    });
  };
  return yt(e) ? n(e) : n(String(e).split(t)), r;
}, xu = () => {
}, Ou = (e, t) => e != null && Number.isFinite(e = +e) ? e : t, Lr = "abcdefghijklmnopqrstuvwxyz", po = "0123456789", _i = {
  DIGIT: po,
  ALPHA: Lr,
  ALPHA_DIGIT: Lr + Lr.toUpperCase() + po
}, Au = (e = 16, t = _i.ALPHA_DIGIT) => {
  let r = "";
  const { length: n } = t;
  for (; e--; )
    r += t[Math.random() * n | 0];
  return r;
};
function Tu(e) {
  return !!(e && me(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const Ru = (e) => {
  const t = new Array(10), r = (n, o) => {
    if (Sr(n)) {
      if (t.indexOf(n) >= 0)
        return;
      if (!("toJSON" in n)) {
        t[o] = n;
        const i = yt(n) ? [] : {};
        return kt(n, (a, s) => {
          const l = r(a, o + 1);
          !Nt(l) && (i[s] = l);
        }), t[o] = void 0, i;
      }
    }
    return n;
  };
  return r(e, 0);
}, Pu = Ee("AsyncFunction"), Cu = (e) => e && (Sr(e) || me(e)) && me(e.then) && me(e.catch), Ni = ((e, t) => e ? setImmediate : t ? ((r, n) => (Je.addEventListener("message", ({ source: o, data: i }) => {
  o === Je && i === r && n.length && n.shift()();
}, !1), (o) => {
  n.push(o), Je.postMessage(r, "*");
}))(`axios@${Math.random()}`, []) : (r) => setTimeout(r))(
  typeof setImmediate == "function",
  me(Je.postMessage)
), Fu = typeof queueMicrotask < "u" ? queueMicrotask.bind(Je) : typeof process < "u" && process.nextTick || Ni, g = {
  isArray: yt,
  isArrayBuffer: Ri,
  isBuffer: Gl,
  isFormData: ru,
  isArrayBufferView: Kl,
  isString: Jl,
  isNumber: Pi,
  isBoolean: Yl,
  isObject: Sr,
  isPlainObject: Xt,
  isReadableStream: ou,
  isRequest: iu,
  isResponse: au,
  isHeaders: su,
  isUndefined: Nt,
  isDate: Xl,
  isFile: Ql,
  isBlob: Zl,
  isRegExp: wu,
  isFunction: me,
  isStream: tu,
  isURLSearchParams: nu,
  isTypedArray: yu,
  isFileList: eu,
  forEach: kt,
  merge: sn,
  extend: uu,
  trim: lu,
  stripBOM: cu,
  inherits: fu,
  toFlatObject: du,
  kindOf: wr,
  kindOfTest: Ee,
  endsWith: pu,
  toArray: mu,
  forEachEntry: hu,
  matchAll: vu,
  isHTMLForm: gu,
  hasOwnProperty: fo,
  hasOwnProp: fo,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: $i,
  freezeMethods: Eu,
  toObjectSet: Su,
  toCamelCase: bu,
  noop: xu,
  toFiniteNumber: Ou,
  findKey: Ci,
  global: Je,
  isContextDefined: Fi,
  ALPHABET: _i,
  generateString: Au,
  isSpecCompliantForm: Tu,
  toJSONObject: Ru,
  isAsyncFn: Pu,
  isThenable: Cu,
  setImmediate: Ni,
  asap: Fu
};
function F(e, t, r, n, o) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), r && (this.config = r), n && (this.request = n), o && (this.response = o, this.status = o.status ? o.status : null);
}
g.inherits(F, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: g.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const Di = F.prototype, Ii = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  Ii[e] = { value: e };
});
Object.defineProperties(F, Ii);
Object.defineProperty(Di, "isAxiosError", { value: !0 });
F.from = (e, t, r, n, o, i) => {
  const a = Object.create(Di);
  return g.toFlatObject(e, a, function(l) {
    return l !== Error.prototype;
  }, (s) => s !== "isAxiosError"), F.call(a, e.message, t, r, n, o), a.cause = e, a.name = e.name, i && Object.assign(a, i), a;
};
const $u = null;
function ln(e) {
  return g.isPlainObject(e) || g.isArray(e);
}
function Li(e) {
  return g.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function mo(e, t, r) {
  return e ? e.concat(t).map(function(o, i) {
    return o = Li(o), !r && i ? "[" + o + "]" : o;
  }).join(r ? "." : "") : t;
}
function _u(e) {
  return g.isArray(e) && !e.some(ln);
}
const Nu = g.toFlatObject(g, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function xr(e, t, r) {
  if (!g.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), r = g.toFlatObject(r, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(p, m) {
    return !g.isUndefined(m[p]);
  });
  const n = r.metaTokens, o = r.visitor || u, i = r.dots, a = r.indexes, l = (r.Blob || typeof Blob < "u" && Blob) && g.isSpecCompliantForm(t);
  if (!g.isFunction(o))
    throw new TypeError("visitor must be a function");
  function f(c) {
    if (c === null) return "";
    if (g.isDate(c))
      return c.toISOString();
    if (!l && g.isBlob(c))
      throw new F("Blob is not supported. Use a Buffer instead.");
    return g.isArrayBuffer(c) || g.isTypedArray(c) ? l && typeof Blob == "function" ? new Blob([c]) : Buffer.from(c) : c;
  }
  function u(c, p, m) {
    let b = c;
    if (c && !m && typeof c == "object") {
      if (g.endsWith(p, "{}"))
        p = n ? p : p.slice(0, -2), c = JSON.stringify(c);
      else if (g.isArray(c) && _u(c) || (g.isFileList(c) || g.endsWith(p, "[]")) && (b = g.toArray(c)))
        return p = Li(p), b.forEach(function(S, x) {
          !(g.isUndefined(S) || S === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            a === !0 ? mo([p], x, i) : a === null ? p : p + "[]",
            f(S)
          );
        }), !1;
    }
    return ln(c) ? !0 : (t.append(mo(m, p, i), f(c)), !1);
  }
  const y = [], h = Object.assign(Nu, {
    defaultVisitor: u,
    convertValue: f,
    isVisitable: ln
  });
  function v(c, p) {
    if (!g.isUndefined(c)) {
      if (y.indexOf(c) !== -1)
        throw Error("Circular reference detected in " + p.join("."));
      y.push(c), g.forEach(c, function(b, E) {
        (!(g.isUndefined(b) || b === null) && o.call(
          t,
          b,
          g.isString(E) ? E.trim() : E,
          p,
          h
        )) === !0 && v(b, p ? p.concat(E) : [E]);
      }), y.pop();
    }
  }
  if (!g.isObject(e))
    throw new TypeError("data must be an object");
  return v(e), t;
}
function yo(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(n) {
    return t[n];
  });
}
function Pn(e, t) {
  this._pairs = [], e && xr(e, this, t);
}
const Mi = Pn.prototype;
Mi.append = function(t, r) {
  this._pairs.push([t, r]);
};
Mi.toString = function(t) {
  const r = t ? function(n) {
    return t.call(this, n, yo);
  } : yo;
  return this._pairs.map(function(o) {
    return r(o[0]) + "=" + r(o[1]);
  }, "").join("&");
};
function Du(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function ki(e, t, r) {
  if (!t)
    return e;
  const n = r && r.encode || Du, o = r && r.serialize;
  let i;
  if (o ? i = o(t, r) : i = g.isURLSearchParams(t) ? t.toString() : new Pn(t, r).toString(n), i) {
    const a = e.indexOf("#");
    a !== -1 && (e = e.slice(0, a)), e += (e.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return e;
}
class ho {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, r, n) {
    return this.handlers.push({
      fulfilled: t,
      rejected: r,
      synchronous: n ? n.synchronous : !1,
      runWhen: n ? n.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    g.forEach(this.handlers, function(n) {
      n !== null && t(n);
    });
  }
}
const ji = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Iu = typeof URLSearchParams < "u" ? URLSearchParams : Pn, Lu = typeof FormData < "u" ? FormData : null, Mu = typeof Blob < "u" ? Blob : null, ku = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Iu,
    FormData: Lu,
    Blob: Mu
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, Cn = typeof window < "u" && typeof document < "u", un = typeof navigator == "object" && navigator || void 0, ju = Cn && (!un || ["ReactNative", "NativeScript", "NS"].indexOf(un.product) < 0), Bu = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Uu = Cn && window.location.href || "http://localhost", Wu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: Cn,
  hasStandardBrowserEnv: ju,
  hasStandardBrowserWebWorkerEnv: Bu,
  navigator: un,
  origin: Uu
}, Symbol.toStringTag, { value: "Module" })), ue = {
  ...Wu,
  ...ku
};
function Hu(e, t) {
  return xr(e, new ue.classes.URLSearchParams(), Object.assign({
    visitor: function(r, n, o, i) {
      return ue.isNode && g.isBuffer(r) ? (this.append(n, r.toString("base64")), !1) : i.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function qu(e) {
  return g.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function Vu(e) {
  const t = {}, r = Object.keys(e);
  let n;
  const o = r.length;
  let i;
  for (n = 0; n < o; n++)
    i = r[n], t[i] = e[i];
  return t;
}
function Bi(e) {
  function t(r, n, o, i) {
    let a = r[i++];
    if (a === "__proto__") return !0;
    const s = Number.isFinite(+a), l = i >= r.length;
    return a = !a && g.isArray(o) ? o.length : a, l ? (g.hasOwnProp(o, a) ? o[a] = [o[a], n] : o[a] = n, !s) : ((!o[a] || !g.isObject(o[a])) && (o[a] = []), t(r, n, o[a], i) && g.isArray(o[a]) && (o[a] = Vu(o[a])), !s);
  }
  if (g.isFormData(e) && g.isFunction(e.entries)) {
    const r = {};
    return g.forEachEntry(e, (n, o) => {
      t(qu(n), o, r, 0);
    }), r;
  }
  return null;
}
function zu(e, t, r) {
  if (g.isString(e))
    try {
      return (t || JSON.parse)(e), g.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (0, JSON.stringify)(e);
}
const jt = {
  transitional: ji,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, r) {
    const n = r.getContentType() || "", o = n.indexOf("application/json") > -1, i = g.isObject(t);
    if (i && g.isHTMLForm(t) && (t = new FormData(t)), g.isFormData(t))
      return o ? JSON.stringify(Bi(t)) : t;
    if (g.isArrayBuffer(t) || g.isBuffer(t) || g.isStream(t) || g.isFile(t) || g.isBlob(t) || g.isReadableStream(t))
      return t;
    if (g.isArrayBufferView(t))
      return t.buffer;
    if (g.isURLSearchParams(t))
      return r.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let s;
    if (i) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return Hu(t, this.formSerializer).toString();
      if ((s = g.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
        const l = this.env && this.env.FormData;
        return xr(
          s ? { "files[]": t } : t,
          l && new l(),
          this.formSerializer
        );
      }
    }
    return i || o ? (r.setContentType("application/json", !1), zu(t)) : t;
  }],
  transformResponse: [function(t) {
    const r = this.transitional || jt.transitional, n = r && r.forcedJSONParsing, o = this.responseType === "json";
    if (g.isResponse(t) || g.isReadableStream(t))
      return t;
    if (t && g.isString(t) && (n && !this.responseType || o)) {
      const a = !(r && r.silentJSONParsing) && o;
      try {
        return JSON.parse(t);
      } catch (s) {
        if (a)
          throw s.name === "SyntaxError" ? F.from(s, F.ERR_BAD_RESPONSE, this, null, this.response) : s;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: ue.classes.FormData,
    Blob: ue.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
g.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  jt.headers[e] = {};
});
const Gu = g.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), Ku = (e) => {
  const t = {};
  let r, n, o;
  return e && e.split(`
`).forEach(function(a) {
    o = a.indexOf(":"), r = a.substring(0, o).trim().toLowerCase(), n = a.substring(o + 1).trim(), !(!r || t[r] && Gu[r]) && (r === "set-cookie" ? t[r] ? t[r].push(n) : t[r] = [n] : t[r] = t[r] ? t[r] + ", " + n : n);
  }), t;
}, vo = Symbol("internals");
function Ot(e) {
  return e && String(e).trim().toLowerCase();
}
function Qt(e) {
  return e === !1 || e == null ? e : g.isArray(e) ? e.map(Qt) : String(e);
}
function Ju(e) {
  const t = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(e); )
    t[n[1]] = n[2];
  return t;
}
const Yu = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Mr(e, t, r, n, o) {
  if (g.isFunction(n))
    return n.call(this, t, r);
  if (o && (t = r), !!g.isString(t)) {
    if (g.isString(n))
      return t.indexOf(n) !== -1;
    if (g.isRegExp(n))
      return n.test(t);
  }
}
function Xu(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, r, n) => r.toUpperCase() + n);
}
function Qu(e, t) {
  const r = g.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(e, n + r, {
      value: function(o, i, a) {
        return this[n].call(this, t, o, i, a);
      },
      configurable: !0
    });
  });
}
class ce {
  constructor(t) {
    t && this.set(t);
  }
  set(t, r, n) {
    const o = this;
    function i(s, l, f) {
      const u = Ot(l);
      if (!u)
        throw new Error("header name must be a non-empty string");
      const y = g.findKey(o, u);
      (!y || o[y] === void 0 || f === !0 || f === void 0 && o[y] !== !1) && (o[y || l] = Qt(s));
    }
    const a = (s, l) => g.forEach(s, (f, u) => i(f, u, l));
    if (g.isPlainObject(t) || t instanceof this.constructor)
      a(t, r);
    else if (g.isString(t) && (t = t.trim()) && !Yu(t))
      a(Ku(t), r);
    else if (g.isHeaders(t))
      for (const [s, l] of t.entries())
        i(l, s, n);
    else
      t != null && i(r, t, n);
    return this;
  }
  get(t, r) {
    if (t = Ot(t), t) {
      const n = g.findKey(this, t);
      if (n) {
        const o = this[n];
        if (!r)
          return o;
        if (r === !0)
          return Ju(o);
        if (g.isFunction(r))
          return r.call(this, o, n);
        if (g.isRegExp(r))
          return r.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, r) {
    if (t = Ot(t), t) {
      const n = g.findKey(this, t);
      return !!(n && this[n] !== void 0 && (!r || Mr(this, this[n], n, r)));
    }
    return !1;
  }
  delete(t, r) {
    const n = this;
    let o = !1;
    function i(a) {
      if (a = Ot(a), a) {
        const s = g.findKey(n, a);
        s && (!r || Mr(n, n[s], s, r)) && (delete n[s], o = !0);
      }
    }
    return g.isArray(t) ? t.forEach(i) : i(t), o;
  }
  clear(t) {
    const r = Object.keys(this);
    let n = r.length, o = !1;
    for (; n--; ) {
      const i = r[n];
      (!t || Mr(this, this[i], i, t, !0)) && (delete this[i], o = !0);
    }
    return o;
  }
  normalize(t) {
    const r = this, n = {};
    return g.forEach(this, (o, i) => {
      const a = g.findKey(n, i);
      if (a) {
        r[a] = Qt(o), delete r[i];
        return;
      }
      const s = t ? Xu(i) : String(i).trim();
      s !== i && delete r[i], r[s] = Qt(o), n[s] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const r = /* @__PURE__ */ Object.create(null);
    return g.forEach(this, (n, o) => {
      n != null && n !== !1 && (r[o] = t && g.isArray(n) ? n.join(", ") : n);
    }), r;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, r]) => t + ": " + r).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...r) {
    const n = new this(t);
    return r.forEach((o) => n.set(o)), n;
  }
  static accessor(t) {
    const n = (this[vo] = this[vo] = {
      accessors: {}
    }).accessors, o = this.prototype;
    function i(a) {
      const s = Ot(a);
      n[s] || (Qu(o, a), n[s] = !0);
    }
    return g.isArray(t) ? t.forEach(i) : i(t), this;
  }
}
ce.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
g.reduceDescriptors(ce.prototype, ({ value: e }, t) => {
  let r = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(n) {
      this[r] = n;
    }
  };
});
g.freezeMethods(ce);
function kr(e, t) {
  const r = this || jt, n = t || r, o = ce.from(n.headers);
  let i = n.data;
  return g.forEach(e, function(s) {
    i = s.call(r, i, o.normalize(), t ? t.status : void 0);
  }), o.normalize(), i;
}
function Ui(e) {
  return !!(e && e.__CANCEL__);
}
function ht(e, t, r) {
  F.call(this, e ?? "canceled", F.ERR_CANCELED, t, r), this.name = "CanceledError";
}
g.inherits(ht, F, {
  __CANCEL__: !0
});
function Wi(e, t, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? e(r) : t(new F(
    "Request failed with status code " + r.status,
    [F.ERR_BAD_REQUEST, F.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
    r.config,
    r.request,
    r
  ));
}
function Zu(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function ec(e, t) {
  e = e || 10;
  const r = new Array(e), n = new Array(e);
  let o = 0, i = 0, a;
  return t = t !== void 0 ? t : 1e3, function(l) {
    const f = Date.now(), u = n[i];
    a || (a = f), r[o] = l, n[o] = f;
    let y = i, h = 0;
    for (; y !== o; )
      h += r[y++], y = y % e;
    if (o = (o + 1) % e, o === i && (i = (i + 1) % e), f - a < t)
      return;
    const v = u && f - u;
    return v ? Math.round(h * 1e3 / v) : void 0;
  };
}
function tc(e, t) {
  let r = 0, n = 1e3 / t, o, i;
  const a = (f, u = Date.now()) => {
    r = u, o = null, i && (clearTimeout(i), i = null), e.apply(null, f);
  };
  return [(...f) => {
    const u = Date.now(), y = u - r;
    y >= n ? a(f, u) : (o = f, i || (i = setTimeout(() => {
      i = null, a(o);
    }, n - y)));
  }, () => o && a(o)];
}
const ir = (e, t, r = 3) => {
  let n = 0;
  const o = ec(50, 250);
  return tc((i) => {
    const a = i.loaded, s = i.lengthComputable ? i.total : void 0, l = a - n, f = o(l), u = a <= s;
    n = a;
    const y = {
      loaded: a,
      total: s,
      progress: s ? a / s : void 0,
      bytes: l,
      rate: f || void 0,
      estimated: f && s && u ? (s - a) / f : void 0,
      event: i,
      lengthComputable: s != null,
      [t ? "download" : "upload"]: !0
    };
    e(y);
  }, r);
}, go = (e, t) => {
  const r = e != null;
  return [(n) => t[0]({
    lengthComputable: r,
    total: e,
    loaded: n
  }), t[1]];
}, bo = (e) => (...t) => g.asap(() => e(...t)), rc = ue.hasStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const t = ue.navigator && /(msie|trident)/i.test(ue.navigator.userAgent), r = document.createElement("a");
    let n;
    function o(i) {
      let a = i;
      return t && (r.setAttribute("href", a), a = r.href), r.setAttribute("href", a), {
        href: r.href,
        protocol: r.protocol ? r.protocol.replace(/:$/, "") : "",
        host: r.host,
        search: r.search ? r.search.replace(/^\?/, "") : "",
        hash: r.hash ? r.hash.replace(/^#/, "") : "",
        hostname: r.hostname,
        port: r.port,
        pathname: r.pathname.charAt(0) === "/" ? r.pathname : "/" + r.pathname
      };
    }
    return n = o(window.location.href), function(a) {
      const s = g.isString(a) ? o(a) : a;
      return s.protocol === n.protocol && s.host === n.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  /* @__PURE__ */ function() {
    return function() {
      return !0;
    };
  }()
), nc = ue.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, r, n, o, i) {
      const a = [e + "=" + encodeURIComponent(t)];
      g.isNumber(r) && a.push("expires=" + new Date(r).toGMTString()), g.isString(n) && a.push("path=" + n), g.isString(o) && a.push("domain=" + o), i === !0 && a.push("secure"), document.cookie = a.join("; ");
    },
    read(e) {
      const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
      return t ? decodeURIComponent(t[3]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function oc(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function ic(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Hi(e, t) {
  return e && !oc(t) ? ic(e, t) : t;
}
const wo = (e) => e instanceof ce ? { ...e } : e;
function et(e, t) {
  t = t || {};
  const r = {};
  function n(f, u, y) {
    return g.isPlainObject(f) && g.isPlainObject(u) ? g.merge.call({ caseless: y }, f, u) : g.isPlainObject(u) ? g.merge({}, u) : g.isArray(u) ? u.slice() : u;
  }
  function o(f, u, y) {
    if (g.isUndefined(u)) {
      if (!g.isUndefined(f))
        return n(void 0, f, y);
    } else return n(f, u, y);
  }
  function i(f, u) {
    if (!g.isUndefined(u))
      return n(void 0, u);
  }
  function a(f, u) {
    if (g.isUndefined(u)) {
      if (!g.isUndefined(f))
        return n(void 0, f);
    } else return n(void 0, u);
  }
  function s(f, u, y) {
    if (y in t)
      return n(f, u);
    if (y in e)
      return n(void 0, f);
  }
  const l = {
    url: i,
    method: i,
    data: i,
    baseURL: a,
    transformRequest: a,
    transformResponse: a,
    paramsSerializer: a,
    timeout: a,
    timeoutMessage: a,
    withCredentials: a,
    withXSRFToken: a,
    adapter: a,
    responseType: a,
    xsrfCookieName: a,
    xsrfHeaderName: a,
    onUploadProgress: a,
    onDownloadProgress: a,
    decompress: a,
    maxContentLength: a,
    maxBodyLength: a,
    beforeRedirect: a,
    transport: a,
    httpAgent: a,
    httpsAgent: a,
    cancelToken: a,
    socketPath: a,
    responseEncoding: a,
    validateStatus: s,
    headers: (f, u) => o(wo(f), wo(u), !0)
  };
  return g.forEach(Object.keys(Object.assign({}, e, t)), function(u) {
    const y = l[u] || o, h = y(e[u], t[u], u);
    g.isUndefined(h) && y !== s || (r[u] = h);
  }), r;
}
const qi = (e) => {
  const t = et({}, e);
  let { data: r, withXSRFToken: n, xsrfHeaderName: o, xsrfCookieName: i, headers: a, auth: s } = t;
  t.headers = a = ce.from(a), t.url = ki(Hi(t.baseURL, t.url), e.params, e.paramsSerializer), s && a.set(
    "Authorization",
    "Basic " + btoa((s.username || "") + ":" + (s.password ? unescape(encodeURIComponent(s.password)) : ""))
  );
  let l;
  if (g.isFormData(r)) {
    if (ue.hasStandardBrowserEnv || ue.hasStandardBrowserWebWorkerEnv)
      a.setContentType(void 0);
    else if ((l = a.getContentType()) !== !1) {
      const [f, ...u] = l ? l.split(";").map((y) => y.trim()).filter(Boolean) : [];
      a.setContentType([f || "multipart/form-data", ...u].join("; "));
    }
  }
  if (ue.hasStandardBrowserEnv && (n && g.isFunction(n) && (n = n(t)), n || n !== !1 && rc(t.url))) {
    const f = o && i && nc.read(i);
    f && a.set(o, f);
  }
  return t;
}, ac = typeof XMLHttpRequest < "u", sc = ac && function(e) {
  return new Promise(function(r, n) {
    const o = qi(e);
    let i = o.data;
    const a = ce.from(o.headers).normalize();
    let { responseType: s, onUploadProgress: l, onDownloadProgress: f } = o, u, y, h, v, c;
    function p() {
      v && v(), c && c(), o.cancelToken && o.cancelToken.unsubscribe(u), o.signal && o.signal.removeEventListener("abort", u);
    }
    let m = new XMLHttpRequest();
    m.open(o.method.toUpperCase(), o.url, !0), m.timeout = o.timeout;
    function b() {
      if (!m)
        return;
      const S = ce.from(
        "getAllResponseHeaders" in m && m.getAllResponseHeaders()
      ), A = {
        data: !s || s === "text" || s === "json" ? m.responseText : m.response,
        status: m.status,
        statusText: m.statusText,
        headers: S,
        config: e,
        request: m
      };
      Wi(function($) {
        r($), p();
      }, function($) {
        n($), p();
      }, A), m = null;
    }
    "onloadend" in m ? m.onloadend = b : m.onreadystatechange = function() {
      !m || m.readyState !== 4 || m.status === 0 && !(m.responseURL && m.responseURL.indexOf("file:") === 0) || setTimeout(b);
    }, m.onabort = function() {
      m && (n(new F("Request aborted", F.ECONNABORTED, e, m)), m = null);
    }, m.onerror = function() {
      n(new F("Network Error", F.ERR_NETWORK, e, m)), m = null;
    }, m.ontimeout = function() {
      let x = o.timeout ? "timeout of " + o.timeout + "ms exceeded" : "timeout exceeded";
      const A = o.transitional || ji;
      o.timeoutErrorMessage && (x = o.timeoutErrorMessage), n(new F(
        x,
        A.clarifyTimeoutError ? F.ETIMEDOUT : F.ECONNABORTED,
        e,
        m
      )), m = null;
    }, i === void 0 && a.setContentType(null), "setRequestHeader" in m && g.forEach(a.toJSON(), function(x, A) {
      m.setRequestHeader(A, x);
    }), g.isUndefined(o.withCredentials) || (m.withCredentials = !!o.withCredentials), s && s !== "json" && (m.responseType = o.responseType), f && ([h, c] = ir(f, !0), m.addEventListener("progress", h)), l && m.upload && ([y, v] = ir(l), m.upload.addEventListener("progress", y), m.upload.addEventListener("loadend", v)), (o.cancelToken || o.signal) && (u = (S) => {
      m && (n(!S || S.type ? new ht(null, e, m) : S), m.abort(), m = null);
    }, o.cancelToken && o.cancelToken.subscribe(u), o.signal && (o.signal.aborted ? u() : o.signal.addEventListener("abort", u)));
    const E = Zu(o.url);
    if (E && ue.protocols.indexOf(E) === -1) {
      n(new F("Unsupported protocol " + E + ":", F.ERR_BAD_REQUEST, e));
      return;
    }
    m.send(i || null);
  });
}, lc = (e, t) => {
  const { length: r } = e = e ? e.filter(Boolean) : [];
  if (t || r) {
    let n = new AbortController(), o;
    const i = function(f) {
      if (!o) {
        o = !0, s();
        const u = f instanceof Error ? f : this.reason;
        n.abort(u instanceof F ? u : new ht(u instanceof Error ? u.message : u));
      }
    };
    let a = t && setTimeout(() => {
      a = null, i(new F(`timeout ${t} of ms exceeded`, F.ETIMEDOUT));
    }, t);
    const s = () => {
      e && (a && clearTimeout(a), a = null, e.forEach((f) => {
        f.unsubscribe ? f.unsubscribe(i) : f.removeEventListener("abort", i);
      }), e = null);
    };
    e.forEach((f) => f.addEventListener("abort", i));
    const { signal: l } = n;
    return l.unsubscribe = () => g.asap(s), l;
  }
}, uc = function* (e, t) {
  let r = e.byteLength;
  if (r < t) {
    yield e;
    return;
  }
  let n = 0, o;
  for (; n < r; )
    o = n + t, yield e.slice(n, o), n = o;
}, cc = async function* (e, t) {
  for await (const r of fc(e))
    yield* uc(r, t);
}, fc = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const t = e.getReader();
  try {
    for (; ; ) {
      const { done: r, value: n } = await t.read();
      if (r)
        break;
      yield n;
    }
  } finally {
    await t.cancel();
  }
}, Eo = (e, t, r, n) => {
  const o = cc(e, t);
  let i = 0, a, s = (l) => {
    a || (a = !0, n && n(l));
  };
  return new ReadableStream({
    async pull(l) {
      try {
        const { done: f, value: u } = await o.next();
        if (f) {
          s(), l.close();
          return;
        }
        let y = u.byteLength;
        if (r) {
          let h = i += y;
          r(h);
        }
        l.enqueue(new Uint8Array(u));
      } catch (f) {
        throw s(f), f;
      }
    },
    cancel(l) {
      return s(l), o.return();
    }
  }, {
    highWaterMark: 2
  });
}, Or = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", Vi = Or && typeof ReadableStream == "function", dc = Or && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((e) => (t) => e.encode(t))(new TextEncoder()) : async (e) => new Uint8Array(await new Response(e).arrayBuffer())), zi = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, pc = Vi && zi(() => {
  let e = !1;
  const t = new Request(ue.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return e = !0, "half";
    }
  }).headers.has("Content-Type");
  return e && !t;
}), So = 64 * 1024, cn = Vi && zi(() => g.isReadableStream(new Response("").body)), ar = {
  stream: cn && ((e) => e.body)
};
Or && ((e) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
    !ar[t] && (ar[t] = g.isFunction(e[t]) ? (r) => r[t]() : (r, n) => {
      throw new F(`Response type '${t}' is not supported`, F.ERR_NOT_SUPPORT, n);
    });
  });
})(new Response());
const mc = async (e) => {
  if (e == null)
    return 0;
  if (g.isBlob(e))
    return e.size;
  if (g.isSpecCompliantForm(e))
    return (await new Request(ue.origin, {
      method: "POST",
      body: e
    }).arrayBuffer()).byteLength;
  if (g.isArrayBufferView(e) || g.isArrayBuffer(e))
    return e.byteLength;
  if (g.isURLSearchParams(e) && (e = e + ""), g.isString(e))
    return (await dc(e)).byteLength;
}, yc = async (e, t) => {
  const r = g.toFiniteNumber(e.getContentLength());
  return r ?? mc(t);
}, hc = Or && (async (e) => {
  let {
    url: t,
    method: r,
    data: n,
    signal: o,
    cancelToken: i,
    timeout: a,
    onDownloadProgress: s,
    onUploadProgress: l,
    responseType: f,
    headers: u,
    withCredentials: y = "same-origin",
    fetchOptions: h
  } = qi(e);
  f = f ? (f + "").toLowerCase() : "text";
  let v = lc([o, i && i.toAbortSignal()], a), c;
  const p = v && v.unsubscribe && (() => {
    v.unsubscribe();
  });
  let m;
  try {
    if (l && pc && r !== "get" && r !== "head" && (m = await yc(u, n)) !== 0) {
      let A = new Request(t, {
        method: "POST",
        body: n,
        duplex: "half"
      }), T;
      if (g.isFormData(n) && (T = A.headers.get("content-type")) && u.setContentType(T), A.body) {
        const [$, j] = go(
          m,
          ir(bo(l))
        );
        n = Eo(A.body, So, $, j);
      }
    }
    g.isString(y) || (y = y ? "include" : "omit");
    const b = "credentials" in Request.prototype;
    c = new Request(t, {
      ...h,
      signal: v,
      method: r.toUpperCase(),
      headers: u.normalize().toJSON(),
      body: n,
      duplex: "half",
      credentials: b ? y : void 0
    });
    let E = await fetch(c);
    const S = cn && (f === "stream" || f === "response");
    if (cn && (s || S && p)) {
      const A = {};
      ["status", "statusText", "headers"].forEach((H) => {
        A[H] = E[H];
      });
      const T = g.toFiniteNumber(E.headers.get("content-length")), [$, j] = s && go(
        T,
        ir(bo(s), !0)
      ) || [];
      E = new Response(
        Eo(E.body, So, $, () => {
          j && j(), p && p();
        }),
        A
      );
    }
    f = f || "text";
    let x = await ar[g.findKey(ar, f) || "text"](E, e);
    return !S && p && p(), await new Promise((A, T) => {
      Wi(A, T, {
        data: x,
        headers: ce.from(E.headers),
        status: E.status,
        statusText: E.statusText,
        config: e,
        request: c
      });
    });
  } catch (b) {
    throw p && p(), b && b.name === "TypeError" && /fetch/i.test(b.message) ? Object.assign(
      new F("Network Error", F.ERR_NETWORK, e, c),
      {
        cause: b.cause || b
      }
    ) : F.from(b, b && b.code, e, c);
  }
}), fn = {
  http: $u,
  xhr: sc,
  fetch: hc
};
g.forEach(fn, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const xo = (e) => `- ${e}`, vc = (e) => g.isFunction(e) || e === null || e === !1, Gi = {
  getAdapter: (e) => {
    e = g.isArray(e) ? e : [e];
    const { length: t } = e;
    let r, n;
    const o = {};
    for (let i = 0; i < t; i++) {
      r = e[i];
      let a;
      if (n = r, !vc(r) && (n = fn[(a = String(r)).toLowerCase()], n === void 0))
        throw new F(`Unknown adapter '${a}'`);
      if (n)
        break;
      o[a || "#" + i] = n;
    }
    if (!n) {
      const i = Object.entries(o).map(
        ([s, l]) => `adapter ${s} ` + (l === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let a = t ? i.length > 1 ? `since :
` + i.map(xo).join(`
`) : " " + xo(i[0]) : "as no adapter specified";
      throw new F(
        "There is no suitable adapter to dispatch the request " + a,
        "ERR_NOT_SUPPORT"
      );
    }
    return n;
  },
  adapters: fn
};
function jr(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new ht(null, e);
}
function Oo(e) {
  return jr(e), e.headers = ce.from(e.headers), e.data = kr.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), Gi.getAdapter(e.adapter || jt.adapter)(e).then(function(n) {
    return jr(e), n.data = kr.call(
      e,
      e.transformResponse,
      n
    ), n.headers = ce.from(n.headers), n;
  }, function(n) {
    return Ui(n) || (jr(e), n && n.response && (n.response.data = kr.call(
      e,
      e.transformResponse,
      n.response
    ), n.response.headers = ce.from(n.response.headers))), Promise.reject(n);
  });
}
const Ki = "1.7.7", Fn = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  Fn[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Ao = {};
Fn.transitional = function(t, r, n) {
  function o(i, a) {
    return "[Axios v" + Ki + "] Transitional option '" + i + "'" + a + (n ? ". " + n : "");
  }
  return (i, a, s) => {
    if (t === !1)
      throw new F(
        o(a, " has been removed" + (r ? " in " + r : "")),
        F.ERR_DEPRECATED
      );
    return r && !Ao[a] && (Ao[a] = !0, console.warn(
      o(
        a,
        " has been deprecated since v" + r + " and will be removed in the near future"
      )
    )), t ? t(i, a, s) : !0;
  };
};
function gc(e, t, r) {
  if (typeof e != "object")
    throw new F("options must be an object", F.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(e);
  let o = n.length;
  for (; o-- > 0; ) {
    const i = n[o], a = t[i];
    if (a) {
      const s = e[i], l = s === void 0 || a(s, i, e);
      if (l !== !0)
        throw new F("option " + i + " must be " + l, F.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0)
      throw new F("Unknown option " + i, F.ERR_BAD_OPTION);
  }
}
const dn = {
  assertOptions: gc,
  validators: Fn
}, De = dn.validators;
class Xe {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new ho(),
      response: new ho()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(t, r) {
    try {
      return await this._request(t, r);
    } catch (n) {
      if (n instanceof Error) {
        let o;
        Error.captureStackTrace ? Error.captureStackTrace(o = {}) : o = new Error();
        const i = o.stack ? o.stack.replace(/^.+\n/, "") : "";
        try {
          n.stack ? i && !String(n.stack).endsWith(i.replace(/^.+\n.+\n/, "")) && (n.stack += `
` + i) : n.stack = i;
        } catch {
        }
      }
      throw n;
    }
  }
  _request(t, r) {
    typeof t == "string" ? (r = r || {}, r.url = t) : r = t || {}, r = et(this.defaults, r);
    const { transitional: n, paramsSerializer: o, headers: i } = r;
    n !== void 0 && dn.assertOptions(n, {
      silentJSONParsing: De.transitional(De.boolean),
      forcedJSONParsing: De.transitional(De.boolean),
      clarifyTimeoutError: De.transitional(De.boolean)
    }, !1), o != null && (g.isFunction(o) ? r.paramsSerializer = {
      serialize: o
    } : dn.assertOptions(o, {
      encode: De.function,
      serialize: De.function
    }, !0)), r.method = (r.method || this.defaults.method || "get").toLowerCase();
    let a = i && g.merge(
      i.common,
      i[r.method]
    );
    i && g.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (c) => {
        delete i[c];
      }
    ), r.headers = ce.concat(a, i);
    const s = [];
    let l = !0;
    this.interceptors.request.forEach(function(p) {
      typeof p.runWhen == "function" && p.runWhen(r) === !1 || (l = l && p.synchronous, s.unshift(p.fulfilled, p.rejected));
    });
    const f = [];
    this.interceptors.response.forEach(function(p) {
      f.push(p.fulfilled, p.rejected);
    });
    let u, y = 0, h;
    if (!l) {
      const c = [Oo.bind(this), void 0];
      for (c.unshift.apply(c, s), c.push.apply(c, f), h = c.length, u = Promise.resolve(r); y < h; )
        u = u.then(c[y++], c[y++]);
      return u;
    }
    h = s.length;
    let v = r;
    for (y = 0; y < h; ) {
      const c = s[y++], p = s[y++];
      try {
        v = c(v);
      } catch (m) {
        p.call(this, m);
        break;
      }
    }
    try {
      u = Oo.call(this, v);
    } catch (c) {
      return Promise.reject(c);
    }
    for (y = 0, h = f.length; y < h; )
      u = u.then(f[y++], f[y++]);
    return u;
  }
  getUri(t) {
    t = et(this.defaults, t);
    const r = Hi(t.baseURL, t.url);
    return ki(r, t.params, t.paramsSerializer);
  }
}
g.forEach(["delete", "get", "head", "options"], function(t) {
  Xe.prototype[t] = function(r, n) {
    return this.request(et(n || {}, {
      method: t,
      url: r,
      data: (n || {}).data
    }));
  };
});
g.forEach(["post", "put", "patch"], function(t) {
  function r(n) {
    return function(i, a, s) {
      return this.request(et(s || {}, {
        method: t,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: i,
        data: a
      }));
    };
  }
  Xe.prototype[t] = r(), Xe.prototype[t + "Form"] = r(!0);
});
class $n {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let r;
    this.promise = new Promise(function(i) {
      r = i;
    });
    const n = this;
    this.promise.then((o) => {
      if (!n._listeners) return;
      let i = n._listeners.length;
      for (; i-- > 0; )
        n._listeners[i](o);
      n._listeners = null;
    }), this.promise.then = (o) => {
      let i;
      const a = new Promise((s) => {
        n.subscribe(s), i = s;
      }).then(o);
      return a.cancel = function() {
        n.unsubscribe(i);
      }, a;
    }, t(function(i, a, s) {
      n.reason || (n.reason = new ht(i, a, s), r(n.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const r = this._listeners.indexOf(t);
    r !== -1 && this._listeners.splice(r, 1);
  }
  toAbortSignal() {
    const t = new AbortController(), r = (n) => {
      t.abort(n);
    };
    return this.subscribe(r), t.signal.unsubscribe = () => this.unsubscribe(r), t.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new $n(function(o) {
        t = o;
      }),
      cancel: t
    };
  }
}
function bc(e) {
  return function(r) {
    return e.apply(null, r);
  };
}
function wc(e) {
  return g.isObject(e) && e.isAxiosError === !0;
}
const pn = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(pn).forEach(([e, t]) => {
  pn[t] = e;
});
function Ji(e) {
  const t = new Xe(e), r = Ti(Xe.prototype.request, t);
  return g.extend(r, Xe.prototype, t, { allOwnKeys: !0 }), g.extend(r, t, null, { allOwnKeys: !0 }), r.create = function(o) {
    return Ji(et(e, o));
  }, r;
}
const G = Ji(jt);
G.Axios = Xe;
G.CanceledError = ht;
G.CancelToken = $n;
G.isCancel = Ui;
G.VERSION = Ki;
G.toFormData = xr;
G.AxiosError = F;
G.Cancel = G.CanceledError;
G.all = function(t) {
  return Promise.all(t);
};
G.spread = bc;
G.isAxiosError = wc;
G.mergeConfig = et;
G.AxiosHeaders = ce;
G.formToJSON = (e) => Bi(g.isHTMLForm(e) ? new FormData(e) : e);
G.getAdapter = Gi.getAdapter;
G.HttpStatusCode = pn;
G.default = G;
function Ec(e, t) {
  return Array.isArray(e) ? e.filter((r) => !t.includes(r)) : Object.keys(e).reduce((r, n) => (t.includes(n) || (r[n] = e[n]), r), {});
}
function Yi(e, t) {
  return Array.isArray(e) ? e.filter((r) => t.includes(r)) : t.reduce((r, n) => (n in e && (r[n] = e[n]), r), {});
}
function Sc(e) {
  return Array.isArray(e) ? e.filter((t) => t !== null) : Object.keys(e).reduce((t, r) => (r in e && e[r] !== null && (t[r] = e[r]), t), {});
}
function xc(e = 3, t = 100) {
  const r = () => Zo.page || null;
  return new Promise((n, o) => {
    let i = r();
    if (i) {
      n(i);
      return;
    }
    let a = e * 1e3 / t;
    const s = setInterval(() => {
      i = r(), i && (clearInterval(s), n(i)), --a <= 0 && (clearInterval(s), o(new Error("Inertia page not available")));
    }, t);
  });
}
var Oc = function(t) {
  return Ac(t) && !Tc(t);
};
function Ac(e) {
  return !!e && typeof e == "object";
}
function Tc(e) {
  var t = Object.prototype.toString.call(e);
  return t === "[object RegExp]" || t === "[object Date]" || Cc(e);
}
var Rc = typeof Symbol == "function" && Symbol.for, Pc = Rc ? Symbol.for("react.element") : 60103;
function Cc(e) {
  return e.$$typeof === Pc;
}
function Fc(e) {
  return Array.isArray(e) ? [] : {};
}
function Dt(e, t) {
  return t.clone !== !1 && t.isMergeableObject(e) ? ut(Fc(e), e, t) : e;
}
function $c(e, t, r) {
  return e.concat(t).map(function(n) {
    return Dt(n, r);
  });
}
function _c(e, t) {
  if (!t.customMerge)
    return ut;
  var r = t.customMerge(e);
  return typeof r == "function" ? r : ut;
}
function Nc(e) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter(function(t) {
    return Object.propertyIsEnumerable.call(e, t);
  }) : [];
}
function To(e) {
  return Object.keys(e).concat(Nc(e));
}
function Xi(e, t) {
  try {
    return t in e;
  } catch {
    return !1;
  }
}
function Dc(e, t) {
  return Xi(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t));
}
function Ic(e, t, r) {
  var n = {};
  return r.isMergeableObject(e) && To(e).forEach(function(o) {
    n[o] = Dt(e[o], r);
  }), To(t).forEach(function(o) {
    Dc(e, o) || (Xi(e, o) && r.isMergeableObject(t[o]) ? n[o] = _c(o, r)(e[o], t[o], r) : n[o] = Dt(t[o], r));
  }), n;
}
function ut(e, t, r) {
  r = r || {}, r.arrayMerge = r.arrayMerge || $c, r.isMergeableObject = r.isMergeableObject || Oc, r.cloneUnlessOtherwiseSpecified = Dt;
  var n = Array.isArray(t), o = Array.isArray(e), i = n === o;
  return i ? n ? r.arrayMerge(e, t, r) : Ic(e, t, r) : Dt(t, r);
}
ut.all = function(t, r) {
  if (!Array.isArray(t))
    throw new Error("first argument should be an array");
  return t.reduce(function(n, o) {
    return ut(n, o, r);
  }, {});
};
var Lc = ut, Mc = Lc;
const kc = /* @__PURE__ */ os(Mc);
var jc = Error, Bc = EvalError, Uc = RangeError, Wc = ReferenceError, Qi = SyntaxError, Bt = TypeError, Hc = URIError, qc = function() {
  if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
    return !1;
  if (typeof Symbol.iterator == "symbol")
    return !0;
  var t = {}, r = Symbol("test"), n = Object(r);
  if (typeof r == "string" || Object.prototype.toString.call(r) !== "[object Symbol]" || Object.prototype.toString.call(n) !== "[object Symbol]")
    return !1;
  var o = 42;
  t[r] = o;
  for (r in t)
    return !1;
  if (typeof Object.keys == "function" && Object.keys(t).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(t).length !== 0)
    return !1;
  var i = Object.getOwnPropertySymbols(t);
  if (i.length !== 1 || i[0] !== r || !Object.prototype.propertyIsEnumerable.call(t, r))
    return !1;
  if (typeof Object.getOwnPropertyDescriptor == "function") {
    var a = Object.getOwnPropertyDescriptor(t, r);
    if (a.value !== o || a.enumerable !== !0)
      return !1;
  }
  return !0;
}, Ro = typeof Symbol < "u" && Symbol, Vc = qc, zc = function() {
  return typeof Ro != "function" || typeof Symbol != "function" || typeof Ro("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : Vc();
}, Br = {
  __proto__: null,
  foo: {}
}, Gc = Object, Kc = function() {
  return { __proto__: Br }.foo === Br.foo && !(Br instanceof Gc);
}, Jc = "Function.prototype.bind called on incompatible ", Yc = Object.prototype.toString, Xc = Math.max, Qc = "[object Function]", Po = function(t, r) {
  for (var n = [], o = 0; o < t.length; o += 1)
    n[o] = t[o];
  for (var i = 0; i < r.length; i += 1)
    n[i + t.length] = r[i];
  return n;
}, Zc = function(t, r) {
  for (var n = [], o = r, i = 0; o < t.length; o += 1, i += 1)
    n[i] = t[o];
  return n;
}, ef = function(e, t) {
  for (var r = "", n = 0; n < e.length; n += 1)
    r += e[n], n + 1 < e.length && (r += t);
  return r;
}, tf = function(t) {
  var r = this;
  if (typeof r != "function" || Yc.apply(r) !== Qc)
    throw new TypeError(Jc + r);
  for (var n = Zc(arguments, 1), o, i = function() {
    if (this instanceof o) {
      var u = r.apply(
        this,
        Po(n, arguments)
      );
      return Object(u) === u ? u : this;
    }
    return r.apply(
      t,
      Po(n, arguments)
    );
  }, a = Xc(0, r.length - n.length), s = [], l = 0; l < a; l++)
    s[l] = "$" + l;
  if (o = Function("binder", "return function (" + ef(s, ",") + "){ return binder.apply(this,arguments); }")(i), r.prototype) {
    var f = function() {
    };
    f.prototype = r.prototype, o.prototype = new f(), f.prototype = null;
  }
  return o;
}, rf = tf, _n = Function.prototype.bind || rf, nf = Function.prototype.call, of = Object.prototype.hasOwnProperty, af = _n, sf = af.call(nf, of), N, lf = jc, uf = Bc, cf = Uc, ff = Wc, ct = Qi, lt = Bt, df = Hc, Zi = Function, Ur = function(e) {
  try {
    return Zi('"use strict"; return (' + e + ").constructor;")();
  } catch {
  }
}, Qe = Object.getOwnPropertyDescriptor;
if (Qe)
  try {
    Qe({}, "");
  } catch {
    Qe = null;
  }
var Wr = function() {
  throw new lt();
}, pf = Qe ? function() {
  try {
    return arguments.callee, Wr;
  } catch {
    try {
      return Qe(arguments, "callee").get;
    } catch {
      return Wr;
    }
  }
}() : Wr, it = zc(), mf = Kc(), ee = Object.getPrototypeOf || (mf ? function(e) {
  return e.__proto__;
} : null), st = {}, yf = typeof Uint8Array > "u" || !ee ? N : ee(Uint8Array), Ze = {
  __proto__: null,
  "%AggregateError%": typeof AggregateError > "u" ? N : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? N : ArrayBuffer,
  "%ArrayIteratorPrototype%": it && ee ? ee([][Symbol.iterator]()) : N,
  "%AsyncFromSyncIteratorPrototype%": N,
  "%AsyncFunction%": st,
  "%AsyncGenerator%": st,
  "%AsyncGeneratorFunction%": st,
  "%AsyncIteratorPrototype%": st,
  "%Atomics%": typeof Atomics > "u" ? N : Atomics,
  "%BigInt%": typeof BigInt > "u" ? N : BigInt,
  "%BigInt64Array%": typeof BigInt64Array > "u" ? N : BigInt64Array,
  "%BigUint64Array%": typeof BigUint64Array > "u" ? N : BigUint64Array,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView > "u" ? N : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": lf,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": uf,
  "%Float32Array%": typeof Float32Array > "u" ? N : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? N : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? N : FinalizationRegistry,
  "%Function%": Zi,
  "%GeneratorFunction%": st,
  "%Int8Array%": typeof Int8Array > "u" ? N : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? N : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? N : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": it && ee ? ee(ee([][Symbol.iterator]())) : N,
  "%JSON%": typeof JSON == "object" ? JSON : N,
  "%Map%": typeof Map > "u" ? N : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !it || !ee ? N : ee((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": Object,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise > "u" ? N : Promise,
  "%Proxy%": typeof Proxy > "u" ? N : Proxy,
  "%RangeError%": cf,
  "%ReferenceError%": ff,
  "%Reflect%": typeof Reflect > "u" ? N : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? N : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !it || !ee ? N : ee((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? N : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": it && ee ? ee(""[Symbol.iterator]()) : N,
  "%Symbol%": it ? Symbol : N,
  "%SyntaxError%": ct,
  "%ThrowTypeError%": pf,
  "%TypedArray%": yf,
  "%TypeError%": lt,
  "%Uint8Array%": typeof Uint8Array > "u" ? N : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? N : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? N : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? N : Uint32Array,
  "%URIError%": df,
  "%WeakMap%": typeof WeakMap > "u" ? N : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? N : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? N : WeakSet
};
if (ee)
  try {
    null.error;
  } catch (e) {
    var hf = ee(ee(e));
    Ze["%Error.prototype%"] = hf;
  }
var vf = function e(t) {
  var r;
  if (t === "%AsyncFunction%")
    r = Ur("async function () {}");
  else if (t === "%GeneratorFunction%")
    r = Ur("function* () {}");
  else if (t === "%AsyncGeneratorFunction%")
    r = Ur("async function* () {}");
  else if (t === "%AsyncGenerator%") {
    var n = e("%AsyncGeneratorFunction%");
    n && (r = n.prototype);
  } else if (t === "%AsyncIteratorPrototype%") {
    var o = e("%AsyncGenerator%");
    o && ee && (r = ee(o.prototype));
  }
  return Ze[t] = r, r;
}, Co = {
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
}, Ut = _n, sr = sf, gf = Ut.call(Function.call, Array.prototype.concat), bf = Ut.call(Function.apply, Array.prototype.splice), Fo = Ut.call(Function.call, String.prototype.replace), lr = Ut.call(Function.call, String.prototype.slice), wf = Ut.call(Function.call, RegExp.prototype.exec), Ef = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, Sf = /\\(\\)?/g, xf = function(t) {
  var r = lr(t, 0, 1), n = lr(t, -1);
  if (r === "%" && n !== "%")
    throw new ct("invalid intrinsic syntax, expected closing `%`");
  if (n === "%" && r !== "%")
    throw new ct("invalid intrinsic syntax, expected opening `%`");
  var o = [];
  return Fo(t, Ef, function(i, a, s, l) {
    o[o.length] = s ? Fo(l, Sf, "$1") : a || i;
  }), o;
}, Of = function(t, r) {
  var n = t, o;
  if (sr(Co, n) && (o = Co[n], n = "%" + o[0] + "%"), sr(Ze, n)) {
    var i = Ze[n];
    if (i === st && (i = vf(n)), typeof i > "u" && !r)
      throw new lt("intrinsic " + t + " exists, but is not available. Please file an issue!");
    return {
      alias: o,
      name: n,
      value: i
    };
  }
  throw new ct("intrinsic " + t + " does not exist!");
}, vt = function(t, r) {
  if (typeof t != "string" || t.length === 0)
    throw new lt("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof r != "boolean")
    throw new lt('"allowMissing" argument must be a boolean');
  if (wf(/^%?[^%]*%?$/, t) === null)
    throw new ct("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var n = xf(t), o = n.length > 0 ? n[0] : "", i = Of("%" + o + "%", r), a = i.name, s = i.value, l = !1, f = i.alias;
  f && (o = f[0], bf(n, gf([0, 1], f)));
  for (var u = 1, y = !0; u < n.length; u += 1) {
    var h = n[u], v = lr(h, 0, 1), c = lr(h, -1);
    if ((v === '"' || v === "'" || v === "`" || c === '"' || c === "'" || c === "`") && v !== c)
      throw new ct("property names with quotes must have matching quotes");
    if ((h === "constructor" || !y) && (l = !0), o += "." + h, a = "%" + o + "%", sr(Ze, a))
      s = Ze[a];
    else if (s != null) {
      if (!(h in s)) {
        if (!r)
          throw new lt("base intrinsic for " + t + " exists, but the property is not available.");
        return;
      }
      if (Qe && u + 1 >= n.length) {
        var p = Qe(s, h);
        y = !!p, y && "get" in p && !("originalValue" in p.get) ? s = p.get : s = s[h];
      } else
        y = sr(s, h), s = s[h];
      y && !l && (Ze[a] = s);
    }
  }
  return s;
}, ea = { exports: {} }, Hr, $o;
function Nn() {
  if ($o) return Hr;
  $o = 1;
  var e = vt, t = e("%Object.defineProperty%", !0) || !1;
  if (t)
    try {
      t({}, "a", { value: 1 });
    } catch {
      t = !1;
    }
  return Hr = t, Hr;
}
var Af = vt, Zt = Af("%Object.getOwnPropertyDescriptor%", !0);
if (Zt)
  try {
    Zt([], "length");
  } catch {
    Zt = null;
  }
var ta = Zt, _o = Nn(), Tf = Qi, at = Bt, No = ta, Rf = function(t, r, n) {
  if (!t || typeof t != "object" && typeof t != "function")
    throw new at("`obj` must be an object or a function`");
  if (typeof r != "string" && typeof r != "symbol")
    throw new at("`property` must be a string or a symbol`");
  if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
    throw new at("`nonEnumerable`, if provided, must be a boolean or null");
  if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
    throw new at("`nonWritable`, if provided, must be a boolean or null");
  if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
    throw new at("`nonConfigurable`, if provided, must be a boolean or null");
  if (arguments.length > 6 && typeof arguments[6] != "boolean")
    throw new at("`loose`, if provided, must be a boolean");
  var o = arguments.length > 3 ? arguments[3] : null, i = arguments.length > 4 ? arguments[4] : null, a = arguments.length > 5 ? arguments[5] : null, s = arguments.length > 6 ? arguments[6] : !1, l = !!No && No(t, r);
  if (_o)
    _o(t, r, {
      configurable: a === null && l ? l.configurable : !a,
      enumerable: o === null && l ? l.enumerable : !o,
      value: n,
      writable: i === null && l ? l.writable : !i
    });
  else if (s || !o && !i && !a)
    t[r] = n;
  else
    throw new Tf("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
}, mn = Nn(), ra = function() {
  return !!mn;
};
ra.hasArrayLengthDefineBug = function() {
  if (!mn)
    return null;
  try {
    return mn([], "length", { value: 1 }).length !== 1;
  } catch {
    return !0;
  }
};
var Pf = ra, Cf = vt, Do = Rf, Ff = Pf(), Io = ta, Lo = Bt, $f = Cf("%Math.floor%"), _f = function(t, r) {
  if (typeof t != "function")
    throw new Lo("`fn` is not a function");
  if (typeof r != "number" || r < 0 || r > 4294967295 || $f(r) !== r)
    throw new Lo("`length` must be a positive 32-bit integer");
  var n = arguments.length > 2 && !!arguments[2], o = !0, i = !0;
  if ("length" in t && Io) {
    var a = Io(t, "length");
    a && !a.configurable && (o = !1), a && !a.writable && (i = !1);
  }
  return (o || i || !n) && (Ff ? Do(
    /** @type {Parameters<define>[0]} */
    t,
    "length",
    r,
    !0,
    !0
  ) : Do(
    /** @type {Parameters<define>[0]} */
    t,
    "length",
    r
  )), t;
};
(function(e) {
  var t = _n, r = vt, n = _f, o = Bt, i = r("%Function.prototype.apply%"), a = r("%Function.prototype.call%"), s = r("%Reflect.apply%", !0) || t.call(a, i), l = Nn(), f = r("%Math.max%");
  e.exports = function(h) {
    if (typeof h != "function")
      throw new o("a function is required");
    var v = s(t, a, arguments);
    return n(
      v,
      1 + f(0, h.length - (arguments.length - 1)),
      !0
    );
  };
  var u = function() {
    return s(t, i, arguments);
  };
  l ? l(e.exports, "apply", { value: u }) : e.exports.apply = u;
})(ea);
var Nf = ea.exports, na = vt, oa = Nf, Df = oa(na("String.prototype.indexOf")), If = function(t, r) {
  var n = na(t, !!r);
  return typeof n == "function" && Df(t, ".prototype.") > -1 ? oa(n) : n;
};
const Lf = {}, Mf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Lf
}, Symbol.toStringTag, { value: "Module" })), kf = /* @__PURE__ */ is(Mf);
var Dn = typeof Map == "function" && Map.prototype, qr = Object.getOwnPropertyDescriptor && Dn ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, ur = Dn && qr && typeof qr.get == "function" ? qr.get : null, Mo = Dn && Map.prototype.forEach, In = typeof Set == "function" && Set.prototype, Vr = Object.getOwnPropertyDescriptor && In ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, cr = In && Vr && typeof Vr.get == "function" ? Vr.get : null, ko = In && Set.prototype.forEach, jf = typeof WeakMap == "function" && WeakMap.prototype, Ft = jf ? WeakMap.prototype.has : null, Bf = typeof WeakSet == "function" && WeakSet.prototype, $t = Bf ? WeakSet.prototype.has : null, Uf = typeof WeakRef == "function" && WeakRef.prototype, jo = Uf ? WeakRef.prototype.deref : null, Wf = Boolean.prototype.valueOf, Hf = Object.prototype.toString, qf = Function.prototype.toString, Vf = String.prototype.match, Ln = String.prototype.slice, ke = String.prototype.replace, zf = String.prototype.toUpperCase, Bo = String.prototype.toLowerCase, ia = RegExp.prototype.test, Uo = Array.prototype.concat, Te = Array.prototype.join, Gf = Array.prototype.slice, Wo = Math.floor, yn = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, zr = Object.getOwnPropertySymbols, hn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, ft = typeof Symbol == "function" && typeof Symbol.iterator == "object", ie = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === ft || !0) ? Symbol.toStringTag : null, aa = Object.prototype.propertyIsEnumerable, Ho = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(e) {
  return e.__proto__;
} : null);
function qo(e, t) {
  if (e === 1 / 0 || e === -1 / 0 || e !== e || e && e > -1e3 && e < 1e3 || ia.call(/e/, t))
    return t;
  var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof e == "number") {
    var n = e < 0 ? -Wo(-e) : Wo(e);
    if (n !== e) {
      var o = String(n), i = Ln.call(t, o.length + 1);
      return ke.call(o, r, "$&_") + "." + ke.call(ke.call(i, /([0-9]{3})/g, "$&_"), /_$/, "");
    }
  }
  return ke.call(t, r, "$&_");
}
var vn = kf, Vo = vn.custom, zo = la(Vo) ? Vo : null, Kf = function e(t, r, n, o) {
  var i = r || {};
  if (Ie(i, "quoteStyle") && i.quoteStyle !== "single" && i.quoteStyle !== "double")
    throw new TypeError('option "quoteStyle" must be "single" or "double"');
  if (Ie(i, "maxStringLength") && (typeof i.maxStringLength == "number" ? i.maxStringLength < 0 && i.maxStringLength !== 1 / 0 : i.maxStringLength !== null))
    throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
  var a = Ie(i, "customInspect") ? i.customInspect : !0;
  if (typeof a != "boolean" && a !== "symbol")
    throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
  if (Ie(i, "indent") && i.indent !== null && i.indent !== "	" && !(parseInt(i.indent, 10) === i.indent && i.indent > 0))
    throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
  if (Ie(i, "numericSeparator") && typeof i.numericSeparator != "boolean")
    throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
  var s = i.numericSeparator;
  if (typeof t > "u")
    return "undefined";
  if (t === null)
    return "null";
  if (typeof t == "boolean")
    return t ? "true" : "false";
  if (typeof t == "string")
    return ca(t, i);
  if (typeof t == "number") {
    if (t === 0)
      return 1 / 0 / t > 0 ? "0" : "-0";
    var l = String(t);
    return s ? qo(t, l) : l;
  }
  if (typeof t == "bigint") {
    var f = String(t) + "n";
    return s ? qo(t, f) : f;
  }
  var u = typeof i.depth > "u" ? 5 : i.depth;
  if (typeof n > "u" && (n = 0), n >= u && u > 0 && typeof t == "object")
    return gn(t) ? "[Array]" : "[Object]";
  var y = dd(i, n);
  if (typeof o > "u")
    o = [];
  else if (ua(o, t) >= 0)
    return "[Circular]";
  function h(R, M, K) {
    if (M && (o = Gf.call(o), o.push(M)), K) {
      var pe = {
        depth: i.depth
      };
      return Ie(i, "quoteStyle") && (pe.quoteStyle = i.quoteStyle), e(R, pe, n + 1, o);
    }
    return e(R, i, n + 1, o);
  }
  if (typeof t == "function" && !Go(t)) {
    var v = nd(t), c = Kt(t, h);
    return "[Function" + (v ? ": " + v : " (anonymous)") + "]" + (c.length > 0 ? " { " + Te.call(c, ", ") + " }" : "");
  }
  if (la(t)) {
    var p = ft ? ke.call(String(t), /^(Symbol\(.*\))_[^)]*$/, "$1") : hn.call(t);
    return typeof t == "object" && !ft ? At(p) : p;
  }
  if (ud(t)) {
    for (var m = "<" + Bo.call(String(t.nodeName)), b = t.attributes || [], E = 0; E < b.length; E++)
      m += " " + b[E].name + "=" + sa(Jf(b[E].value), "double", i);
    return m += ">", t.childNodes && t.childNodes.length && (m += "..."), m += "</" + Bo.call(String(t.nodeName)) + ">", m;
  }
  if (gn(t)) {
    if (t.length === 0)
      return "[]";
    var S = Kt(t, h);
    return y && !fd(S) ? "[" + bn(S, y) + "]" : "[ " + Te.call(S, ", ") + " ]";
  }
  if (Xf(t)) {
    var x = Kt(t, h);
    return !("cause" in Error.prototype) && "cause" in t && !aa.call(t, "cause") ? "{ [" + String(t) + "] " + Te.call(Uo.call("[cause]: " + h(t.cause), x), ", ") + " }" : x.length === 0 ? "[" + String(t) + "]" : "{ [" + String(t) + "] " + Te.call(x, ", ") + " }";
  }
  if (typeof t == "object" && a) {
    if (zo && typeof t[zo] == "function" && vn)
      return vn(t, { depth: u - n });
    if (a !== "symbol" && typeof t.inspect == "function")
      return t.inspect();
  }
  if (od(t)) {
    var A = [];
    return Mo && Mo.call(t, function(R, M) {
      A.push(h(M, t, !0) + " => " + h(R, t));
    }), Ko("Map", ur.call(t), A, y);
  }
  if (sd(t)) {
    var T = [];
    return ko && ko.call(t, function(R) {
      T.push(h(R, t));
    }), Ko("Set", cr.call(t), T, y);
  }
  if (id(t))
    return Gr("WeakMap");
  if (ld(t))
    return Gr("WeakSet");
  if (ad(t))
    return Gr("WeakRef");
  if (Zf(t))
    return At(h(Number(t)));
  if (td(t))
    return At(h(yn.call(t)));
  if (ed(t))
    return At(Wf.call(t));
  if (Qf(t))
    return At(h(String(t)));
  if (typeof window < "u" && t === window)
    return "{ [object Window] }";
  if (typeof globalThis < "u" && t === globalThis || typeof Qr < "u" && t === Qr)
    return "{ [object globalThis] }";
  if (!Yf(t) && !Go(t)) {
    var $ = Kt(t, h), j = Ho ? Ho(t) === Object.prototype : t instanceof Object || t.constructor === Object, H = t instanceof Object ? "" : "null prototype", I = !j && ie && Object(t) === t && ie in t ? Ln.call(Ue(t), 8, -1) : H ? "Object" : "", Y = j || typeof t.constructor != "function" ? "" : t.constructor.name ? t.constructor.name + " " : "", Z = Y + (I || H ? "[" + Te.call(Uo.call([], I || [], H || []), ": ") + "] " : "");
    return $.length === 0 ? Z + "{}" : y ? Z + "{" + bn($, y) + "}" : Z + "{ " + Te.call($, ", ") + " }";
  }
  return String(t);
};
function sa(e, t, r) {
  var n = (r.quoteStyle || t) === "double" ? '"' : "'";
  return n + e + n;
}
function Jf(e) {
  return ke.call(String(e), /"/g, "&quot;");
}
function gn(e) {
  return Ue(e) === "[object Array]" && (!ie || !(typeof e == "object" && ie in e));
}
function Yf(e) {
  return Ue(e) === "[object Date]" && (!ie || !(typeof e == "object" && ie in e));
}
function Go(e) {
  return Ue(e) === "[object RegExp]" && (!ie || !(typeof e == "object" && ie in e));
}
function Xf(e) {
  return Ue(e) === "[object Error]" && (!ie || !(typeof e == "object" && ie in e));
}
function Qf(e) {
  return Ue(e) === "[object String]" && (!ie || !(typeof e == "object" && ie in e));
}
function Zf(e) {
  return Ue(e) === "[object Number]" && (!ie || !(typeof e == "object" && ie in e));
}
function ed(e) {
  return Ue(e) === "[object Boolean]" && (!ie || !(typeof e == "object" && ie in e));
}
function la(e) {
  if (ft)
    return e && typeof e == "object" && e instanceof Symbol;
  if (typeof e == "symbol")
    return !0;
  if (!e || typeof e != "object" || !hn)
    return !1;
  try {
    return hn.call(e), !0;
  } catch {
  }
  return !1;
}
function td(e) {
  if (!e || typeof e != "object" || !yn)
    return !1;
  try {
    return yn.call(e), !0;
  } catch {
  }
  return !1;
}
var rd = Object.prototype.hasOwnProperty || function(e) {
  return e in this;
};
function Ie(e, t) {
  return rd.call(e, t);
}
function Ue(e) {
  return Hf.call(e);
}
function nd(e) {
  if (e.name)
    return e.name;
  var t = Vf.call(qf.call(e), /^function\s*([\w$]+)/);
  return t ? t[1] : null;
}
function ua(e, t) {
  if (e.indexOf)
    return e.indexOf(t);
  for (var r = 0, n = e.length; r < n; r++)
    if (e[r] === t)
      return r;
  return -1;
}
function od(e) {
  if (!ur || !e || typeof e != "object")
    return !1;
  try {
    ur.call(e);
    try {
      cr.call(e);
    } catch {
      return !0;
    }
    return e instanceof Map;
  } catch {
  }
  return !1;
}
function id(e) {
  if (!Ft || !e || typeof e != "object")
    return !1;
  try {
    Ft.call(e, Ft);
    try {
      $t.call(e, $t);
    } catch {
      return !0;
    }
    return e instanceof WeakMap;
  } catch {
  }
  return !1;
}
function ad(e) {
  if (!jo || !e || typeof e != "object")
    return !1;
  try {
    return jo.call(e), !0;
  } catch {
  }
  return !1;
}
function sd(e) {
  if (!cr || !e || typeof e != "object")
    return !1;
  try {
    cr.call(e);
    try {
      ur.call(e);
    } catch {
      return !0;
    }
    return e instanceof Set;
  } catch {
  }
  return !1;
}
function ld(e) {
  if (!$t || !e || typeof e != "object")
    return !1;
  try {
    $t.call(e, $t);
    try {
      Ft.call(e, Ft);
    } catch {
      return !0;
    }
    return e instanceof WeakSet;
  } catch {
  }
  return !1;
}
function ud(e) {
  return !e || typeof e != "object" ? !1 : typeof HTMLElement < "u" && e instanceof HTMLElement ? !0 : typeof e.nodeName == "string" && typeof e.getAttribute == "function";
}
function ca(e, t) {
  if (e.length > t.maxStringLength) {
    var r = e.length - t.maxStringLength, n = "... " + r + " more character" + (r > 1 ? "s" : "");
    return ca(Ln.call(e, 0, t.maxStringLength), t) + n;
  }
  var o = ke.call(ke.call(e, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, cd);
  return sa(o, "single", t);
}
function cd(e) {
  var t = e.charCodeAt(0), r = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[t];
  return r ? "\\" + r : "\\x" + (t < 16 ? "0" : "") + zf.call(t.toString(16));
}
function At(e) {
  return "Object(" + e + ")";
}
function Gr(e) {
  return e + " { ? }";
}
function Ko(e, t, r, n) {
  var o = n ? bn(r, n) : Te.call(r, ", ");
  return e + " (" + t + ") {" + o + "}";
}
function fd(e) {
  for (var t = 0; t < e.length; t++)
    if (ua(e[t], `
`) >= 0)
      return !1;
  return !0;
}
function dd(e, t) {
  var r;
  if (e.indent === "	")
    r = "	";
  else if (typeof e.indent == "number" && e.indent > 0)
    r = Te.call(Array(e.indent + 1), " ");
  else
    return null;
  return {
    base: r,
    prev: Te.call(Array(t + 1), r)
  };
}
function bn(e, t) {
  if (e.length === 0)
    return "";
  var r = `
` + t.prev + t.base;
  return r + Te.call(e, "," + r) + `
` + t.prev;
}
function Kt(e, t) {
  var r = gn(e), n = [];
  if (r) {
    n.length = e.length;
    for (var o = 0; o < e.length; o++)
      n[o] = Ie(e, o) ? t(e[o], e) : "";
  }
  var i = typeof zr == "function" ? zr(e) : [], a;
  if (ft) {
    a = {};
    for (var s = 0; s < i.length; s++)
      a["$" + i[s]] = i[s];
  }
  for (var l in e)
    Ie(e, l) && (r && String(Number(l)) === l && l < e.length || ft && a["$" + l] instanceof Symbol || (ia.call(/[^\w$]/, l) ? n.push(t(l, e) + ": " + t(e[l], e)) : n.push(l + ": " + t(e[l], e))));
  if (typeof zr == "function")
    for (var f = 0; f < i.length; f++)
      aa.call(e, i[f]) && n.push("[" + t(i[f]) + "]: " + t(e[i[f]], e));
  return n;
}
var fa = vt, gt = If, pd = Kf, md = Bt, Jt = fa("%WeakMap%", !0), Yt = fa("%Map%", !0), yd = gt("WeakMap.prototype.get", !0), hd = gt("WeakMap.prototype.set", !0), vd = gt("WeakMap.prototype.has", !0), gd = gt("Map.prototype.get", !0), bd = gt("Map.prototype.set", !0), wd = gt("Map.prototype.has", !0), Mn = function(e, t) {
  for (var r = e, n; (n = r.next) !== null; r = n)
    if (n.key === t)
      return r.next = n.next, n.next = /** @type {NonNullable<typeof list.next>} */
      e.next, e.next = n, n;
}, Ed = function(e, t) {
  var r = Mn(e, t);
  return r && r.value;
}, Sd = function(e, t, r) {
  var n = Mn(e, t);
  n ? n.value = r : e.next = /** @type {import('.').ListNode<typeof value>} */
  {
    // eslint-disable-line no-param-reassign, no-extra-parens
    key: t,
    next: e.next,
    value: r
  };
}, xd = function(e, t) {
  return !!Mn(e, t);
}, Od = function() {
  var t, r, n, o = {
    assert: function(i) {
      if (!o.has(i))
        throw new md("Side channel does not contain " + pd(i));
    },
    get: function(i) {
      if (Jt && i && (typeof i == "object" || typeof i == "function")) {
        if (t)
          return yd(t, i);
      } else if (Yt) {
        if (r)
          return gd(r, i);
      } else if (n)
        return Ed(n, i);
    },
    has: function(i) {
      if (Jt && i && (typeof i == "object" || typeof i == "function")) {
        if (t)
          return vd(t, i);
      } else if (Yt) {
        if (r)
          return wd(r, i);
      } else if (n)
        return xd(n, i);
      return !1;
    },
    set: function(i, a) {
      Jt && i && (typeof i == "object" || typeof i == "function") ? (t || (t = new Jt()), hd(t, i, a)) : Yt ? (r || (r = new Yt()), bd(r, i, a)) : (n || (n = { key: {}, next: null }), Sd(n, i, a));
    }
  };
  return o;
}, Ad = String.prototype.replace, Td = /%20/g, Kr = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
}, kn = {
  default: Kr.RFC3986,
  formatters: {
    RFC1738: function(e) {
      return Ad.call(e, Td, "+");
    },
    RFC3986: function(e) {
      return String(e);
    }
  },
  RFC1738: Kr.RFC1738,
  RFC3986: Kr.RFC3986
}, Rd = kn, Jr = Object.prototype.hasOwnProperty, Ge = Array.isArray, Oe = function() {
  for (var e = [], t = 0; t < 256; ++t)
    e.push("%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase());
  return e;
}(), Pd = function(t) {
  for (; t.length > 1; ) {
    var r = t.pop(), n = r.obj[r.prop];
    if (Ge(n)) {
      for (var o = [], i = 0; i < n.length; ++i)
        typeof n[i] < "u" && o.push(n[i]);
      r.obj[r.prop] = o;
    }
  }
}, da = function(t, r) {
  for (var n = r && r.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, o = 0; o < t.length; ++o)
    typeof t[o] < "u" && (n[o] = t[o]);
  return n;
}, Cd = function e(t, r, n) {
  if (!r)
    return t;
  if (typeof r != "object") {
    if (Ge(t))
      t.push(r);
    else if (t && typeof t == "object")
      (n && (n.plainObjects || n.allowPrototypes) || !Jr.call(Object.prototype, r)) && (t[r] = !0);
    else
      return [t, r];
    return t;
  }
  if (!t || typeof t != "object")
    return [t].concat(r);
  var o = t;
  return Ge(t) && !Ge(r) && (o = da(t, n)), Ge(t) && Ge(r) ? (r.forEach(function(i, a) {
    if (Jr.call(t, a)) {
      var s = t[a];
      s && typeof s == "object" && i && typeof i == "object" ? t[a] = e(s, i, n) : t.push(i);
    } else
      t[a] = i;
  }), t) : Object.keys(r).reduce(function(i, a) {
    var s = r[a];
    return Jr.call(i, a) ? i[a] = e(i[a], s, n) : i[a] = s, i;
  }, o);
}, Fd = function(t, r) {
  return Object.keys(r).reduce(function(n, o) {
    return n[o] = r[o], n;
  }, t);
}, $d = function(e, t, r) {
  var n = e.replace(/\+/g, " ");
  if (r === "iso-8859-1")
    return n.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n);
  } catch {
    return n;
  }
}, Yr = 1024, _d = function(t, r, n, o, i) {
  if (t.length === 0)
    return t;
  var a = t;
  if (typeof t == "symbol" ? a = Symbol.prototype.toString.call(t) : typeof t != "string" && (a = String(t)), n === "iso-8859-1")
    return escape(a).replace(/%u[0-9a-f]{4}/gi, function(v) {
      return "%26%23" + parseInt(v.slice(2), 16) + "%3B";
    });
  for (var s = "", l = 0; l < a.length; l += Yr) {
    for (var f = a.length >= Yr ? a.slice(l, l + Yr) : a, u = [], y = 0; y < f.length; ++y) {
      var h = f.charCodeAt(y);
      if (h === 45 || h === 46 || h === 95 || h === 126 || h >= 48 && h <= 57 || h >= 65 && h <= 90 || h >= 97 && h <= 122 || i === Rd.RFC1738 && (h === 40 || h === 41)) {
        u[u.length] = f.charAt(y);
        continue;
      }
      if (h < 128) {
        u[u.length] = Oe[h];
        continue;
      }
      if (h < 2048) {
        u[u.length] = Oe[192 | h >> 6] + Oe[128 | h & 63];
        continue;
      }
      if (h < 55296 || h >= 57344) {
        u[u.length] = Oe[224 | h >> 12] + Oe[128 | h >> 6 & 63] + Oe[128 | h & 63];
        continue;
      }
      y += 1, h = 65536 + ((h & 1023) << 10 | f.charCodeAt(y) & 1023), u[u.length] = Oe[240 | h >> 18] + Oe[128 | h >> 12 & 63] + Oe[128 | h >> 6 & 63] + Oe[128 | h & 63];
    }
    s += u.join("");
  }
  return s;
}, Nd = function(t) {
  for (var r = [{ obj: { o: t }, prop: "o" }], n = [], o = 0; o < r.length; ++o)
    for (var i = r[o], a = i.obj[i.prop], s = Object.keys(a), l = 0; l < s.length; ++l) {
      var f = s[l], u = a[f];
      typeof u == "object" && u !== null && n.indexOf(u) === -1 && (r.push({ obj: a, prop: f }), n.push(u));
    }
  return Pd(r), t;
}, Dd = function(t) {
  return Object.prototype.toString.call(t) === "[object RegExp]";
}, Id = function(t) {
  return !t || typeof t != "object" ? !1 : !!(t.constructor && t.constructor.isBuffer && t.constructor.isBuffer(t));
}, Ld = function(t, r) {
  return [].concat(t, r);
}, Md = function(t, r) {
  if (Ge(t)) {
    for (var n = [], o = 0; o < t.length; o += 1)
      n.push(r(t[o]));
    return n;
  }
  return r(t);
}, pa = {
  arrayToObject: da,
  assign: Fd,
  combine: Ld,
  compact: Nd,
  decode: $d,
  encode: _d,
  isBuffer: Id,
  isRegExp: Dd,
  maybeMap: Md,
  merge: Cd
}, ma = Od, er = pa, _t = kn, kd = Object.prototype.hasOwnProperty, ya = {
  brackets: function(t) {
    return t + "[]";
  },
  comma: "comma",
  indices: function(t, r) {
    return t + "[" + r + "]";
  },
  repeat: function(t) {
    return t;
  }
}, Ae = Array.isArray, jd = Array.prototype.push, ha = function(e, t) {
  jd.apply(e, Ae(t) ? t : [t]);
}, Bd = Date.prototype.toISOString, Jo = _t.default, X = {
  addQueryPrefix: !1,
  allowDots: !1,
  allowEmptyArrays: !1,
  arrayFormat: "indices",
  charset: "utf-8",
  charsetSentinel: !1,
  delimiter: "&",
  encode: !0,
  encodeDotInKeys: !1,
  encoder: er.encode,
  encodeValuesOnly: !1,
  format: Jo,
  formatter: _t.formatters[Jo],
  // deprecated
  indices: !1,
  serializeDate: function(t) {
    return Bd.call(t);
  },
  skipNulls: !1,
  strictNullHandling: !1
}, Ud = function(t) {
  return typeof t == "string" || typeof t == "number" || typeof t == "boolean" || typeof t == "symbol" || typeof t == "bigint";
}, Xr = {}, Wd = function e(t, r, n, o, i, a, s, l, f, u, y, h, v, c, p, m, b, E) {
  for (var S = t, x = E, A = 0, T = !1; (x = x.get(Xr)) !== void 0 && !T; ) {
    var $ = x.get(t);
    if (A += 1, typeof $ < "u") {
      if ($ === A)
        throw new RangeError("Cyclic object value");
      T = !0;
    }
    typeof x.get(Xr) > "u" && (A = 0);
  }
  if (typeof u == "function" ? S = u(r, S) : S instanceof Date ? S = v(S) : n === "comma" && Ae(S) && (S = er.maybeMap(S, function(W) {
    return W instanceof Date ? v(W) : W;
  })), S === null) {
    if (a)
      return f && !m ? f(r, X.encoder, b, "key", c) : r;
    S = "";
  }
  if (Ud(S) || er.isBuffer(S)) {
    if (f) {
      var j = m ? r : f(r, X.encoder, b, "key", c);
      return [p(j) + "=" + p(f(S, X.encoder, b, "value", c))];
    }
    return [p(r) + "=" + p(String(S))];
  }
  var H = [];
  if (typeof S > "u")
    return H;
  var I;
  if (n === "comma" && Ae(S))
    m && f && (S = er.maybeMap(S, f)), I = [{ value: S.length > 0 ? S.join(",") || null : void 0 }];
  else if (Ae(u))
    I = u;
  else {
    var Y = Object.keys(S);
    I = y ? Y.sort(y) : Y;
  }
  var Z = l ? r.replace(/\./g, "%2E") : r, R = o && Ae(S) && S.length === 1 ? Z + "[]" : Z;
  if (i && Ae(S) && S.length === 0)
    return R + "[]";
  for (var M = 0; M < I.length; ++M) {
    var K = I[M], pe = typeof K == "object" && typeof K.value < "u" ? K.value : S[K];
    if (!(s && pe === null)) {
      var ge = h && l ? K.replace(/\./g, "%2E") : K, Se = Ae(S) ? typeof n == "function" ? n(R, ge) : R : R + (h ? "." + ge : "[" + ge + "]");
      E.set(t, A);
      var ne = ma();
      ne.set(Xr, E), ha(H, e(
        pe,
        Se,
        n,
        o,
        i,
        a,
        s,
        l,
        n === "comma" && m && Ae(S) ? null : f,
        u,
        y,
        h,
        v,
        c,
        p,
        m,
        b,
        ne
      ));
    }
  }
  return H;
}, Hd = function(t) {
  if (!t)
    return X;
  if (typeof t.allowEmptyArrays < "u" && typeof t.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof t.encodeDotInKeys < "u" && typeof t.encodeDotInKeys != "boolean")
    throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
  if (t.encoder !== null && typeof t.encoder < "u" && typeof t.encoder != "function")
    throw new TypeError("Encoder has to be a function.");
  var r = t.charset || X.charset;
  if (typeof t.charset < "u" && t.charset !== "utf-8" && t.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var n = _t.default;
  if (typeof t.format < "u") {
    if (!kd.call(_t.formatters, t.format))
      throw new TypeError("Unknown format option provided.");
    n = t.format;
  }
  var o = _t.formatters[n], i = X.filter;
  (typeof t.filter == "function" || Ae(t.filter)) && (i = t.filter);
  var a;
  if (t.arrayFormat in ya ? a = t.arrayFormat : "indices" in t ? a = t.indices ? "indices" : "repeat" : a = X.arrayFormat, "commaRoundTrip" in t && typeof t.commaRoundTrip != "boolean")
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  var s = typeof t.allowDots > "u" ? t.encodeDotInKeys === !0 ? !0 : X.allowDots : !!t.allowDots;
  return {
    addQueryPrefix: typeof t.addQueryPrefix == "boolean" ? t.addQueryPrefix : X.addQueryPrefix,
    allowDots: s,
    allowEmptyArrays: typeof t.allowEmptyArrays == "boolean" ? !!t.allowEmptyArrays : X.allowEmptyArrays,
    arrayFormat: a,
    charset: r,
    charsetSentinel: typeof t.charsetSentinel == "boolean" ? t.charsetSentinel : X.charsetSentinel,
    commaRoundTrip: t.commaRoundTrip,
    delimiter: typeof t.delimiter > "u" ? X.delimiter : t.delimiter,
    encode: typeof t.encode == "boolean" ? t.encode : X.encode,
    encodeDotInKeys: typeof t.encodeDotInKeys == "boolean" ? t.encodeDotInKeys : X.encodeDotInKeys,
    encoder: typeof t.encoder == "function" ? t.encoder : X.encoder,
    encodeValuesOnly: typeof t.encodeValuesOnly == "boolean" ? t.encodeValuesOnly : X.encodeValuesOnly,
    filter: i,
    format: n,
    formatter: o,
    serializeDate: typeof t.serializeDate == "function" ? t.serializeDate : X.serializeDate,
    skipNulls: typeof t.skipNulls == "boolean" ? t.skipNulls : X.skipNulls,
    sort: typeof t.sort == "function" ? t.sort : null,
    strictNullHandling: typeof t.strictNullHandling == "boolean" ? t.strictNullHandling : X.strictNullHandling
  };
}, qd = function(e, t) {
  var r = e, n = Hd(t), o, i;
  typeof n.filter == "function" ? (i = n.filter, r = i("", r)) : Ae(n.filter) && (i = n.filter, o = i);
  var a = [];
  if (typeof r != "object" || r === null)
    return "";
  var s = ya[n.arrayFormat], l = s === "comma" && n.commaRoundTrip;
  o || (o = Object.keys(r)), n.sort && o.sort(n.sort);
  for (var f = ma(), u = 0; u < o.length; ++u) {
    var y = o[u];
    n.skipNulls && r[y] === null || ha(a, Wd(
      r[y],
      y,
      s,
      l,
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
  var h = a.join(n.delimiter), v = n.addQueryPrefix === !0 ? "?" : "";
  return n.charsetSentinel && (n.charset === "iso-8859-1" ? v += "utf8=%26%2310003%3B&" : v += "utf8=%E2%9C%93&"), h.length > 0 ? v + h : "";
}, dt = pa, wn = Object.prototype.hasOwnProperty, Vd = Array.isArray, V = {
  allowDots: !1,
  allowEmptyArrays: !1,
  allowPrototypes: !1,
  allowSparse: !1,
  arrayLimit: 20,
  charset: "utf-8",
  charsetSentinel: !1,
  comma: !1,
  decodeDotInKeys: !1,
  decoder: dt.decode,
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
}, zd = function(e) {
  return e.replace(/&#(\d+);/g, function(t, r) {
    return String.fromCharCode(parseInt(r, 10));
  });
}, va = function(e, t) {
  return e && typeof e == "string" && t.comma && e.indexOf(",") > -1 ? e.split(",") : e;
}, Gd = "utf8=%26%2310003%3B", Kd = "utf8=%E2%9C%93", Jd = function(t, r) {
  var n = { __proto__: null }, o = r.ignoreQueryPrefix ? t.replace(/^\?/, "") : t;
  o = o.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  var i = r.parameterLimit === 1 / 0 ? void 0 : r.parameterLimit, a = o.split(r.delimiter, i), s = -1, l, f = r.charset;
  if (r.charsetSentinel)
    for (l = 0; l < a.length; ++l)
      a[l].indexOf("utf8=") === 0 && (a[l] === Kd ? f = "utf-8" : a[l] === Gd && (f = "iso-8859-1"), s = l, l = a.length);
  for (l = 0; l < a.length; ++l)
    if (l !== s) {
      var u = a[l], y = u.indexOf("]="), h = y === -1 ? u.indexOf("=") : y + 1, v, c;
      h === -1 ? (v = r.decoder(u, V.decoder, f, "key"), c = r.strictNullHandling ? null : "") : (v = r.decoder(u.slice(0, h), V.decoder, f, "key"), c = dt.maybeMap(
        va(u.slice(h + 1), r),
        function(m) {
          return r.decoder(m, V.decoder, f, "value");
        }
      )), c && r.interpretNumericEntities && f === "iso-8859-1" && (c = zd(c)), u.indexOf("[]=") > -1 && (c = Vd(c) ? [c] : c);
      var p = wn.call(n, v);
      p && r.duplicates === "combine" ? n[v] = dt.combine(n[v], c) : (!p || r.duplicates === "last") && (n[v] = c);
    }
  return n;
}, Yd = function(e, t, r, n) {
  for (var o = n ? t : va(t, r), i = e.length - 1; i >= 0; --i) {
    var a, s = e[i];
    if (s === "[]" && r.parseArrays)
      a = r.allowEmptyArrays && (o === "" || r.strictNullHandling && o === null) ? [] : [].concat(o);
    else {
      a = r.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var l = s.charAt(0) === "[" && s.charAt(s.length - 1) === "]" ? s.slice(1, -1) : s, f = r.decodeDotInKeys ? l.replace(/%2E/g, ".") : l, u = parseInt(f, 10);
      !r.parseArrays && f === "" ? a = { 0: o } : !isNaN(u) && s !== f && String(u) === f && u >= 0 && r.parseArrays && u <= r.arrayLimit ? (a = [], a[u] = o) : f !== "__proto__" && (a[f] = o);
    }
    o = a;
  }
  return o;
}, Xd = function(t, r, n, o) {
  if (t) {
    var i = n.allowDots ? t.replace(/\.([^.[]+)/g, "[$1]") : t, a = /(\[[^[\]]*])/, s = /(\[[^[\]]*])/g, l = n.depth > 0 && a.exec(i), f = l ? i.slice(0, l.index) : i, u = [];
    if (f) {
      if (!n.plainObjects && wn.call(Object.prototype, f) && !n.allowPrototypes)
        return;
      u.push(f);
    }
    for (var y = 0; n.depth > 0 && (l = s.exec(i)) !== null && y < n.depth; ) {
      if (y += 1, !n.plainObjects && wn.call(Object.prototype, l[1].slice(1, -1)) && !n.allowPrototypes)
        return;
      u.push(l[1]);
    }
    if (l) {
      if (n.strictDepth === !0)
        throw new RangeError("Input depth exceeded depth option of " + n.depth + " and strictDepth is true");
      u.push("[" + i.slice(l.index) + "]");
    }
    return Yd(u, r, n, o);
  }
}, Qd = function(t) {
  if (!t)
    return V;
  if (typeof t.allowEmptyArrays < "u" && typeof t.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof t.decodeDotInKeys < "u" && typeof t.decodeDotInKeys != "boolean")
    throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
  if (t.decoder !== null && typeof t.decoder < "u" && typeof t.decoder != "function")
    throw new TypeError("Decoder has to be a function.");
  if (typeof t.charset < "u" && t.charset !== "utf-8" && t.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var r = typeof t.charset > "u" ? V.charset : t.charset, n = typeof t.duplicates > "u" ? V.duplicates : t.duplicates;
  if (n !== "combine" && n !== "first" && n !== "last")
    throw new TypeError("The duplicates option must be either combine, first, or last");
  var o = typeof t.allowDots > "u" ? t.decodeDotInKeys === !0 ? !0 : V.allowDots : !!t.allowDots;
  return {
    allowDots: o,
    allowEmptyArrays: typeof t.allowEmptyArrays == "boolean" ? !!t.allowEmptyArrays : V.allowEmptyArrays,
    allowPrototypes: typeof t.allowPrototypes == "boolean" ? t.allowPrototypes : V.allowPrototypes,
    allowSparse: typeof t.allowSparse == "boolean" ? t.allowSparse : V.allowSparse,
    arrayLimit: typeof t.arrayLimit == "number" ? t.arrayLimit : V.arrayLimit,
    charset: r,
    charsetSentinel: typeof t.charsetSentinel == "boolean" ? t.charsetSentinel : V.charsetSentinel,
    comma: typeof t.comma == "boolean" ? t.comma : V.comma,
    decodeDotInKeys: typeof t.decodeDotInKeys == "boolean" ? t.decodeDotInKeys : V.decodeDotInKeys,
    decoder: typeof t.decoder == "function" ? t.decoder : V.decoder,
    delimiter: typeof t.delimiter == "string" || dt.isRegExp(t.delimiter) ? t.delimiter : V.delimiter,
    // eslint-disable-next-line no-implicit-coercion, no-extra-parens
    depth: typeof t.depth == "number" || t.depth === !1 ? +t.depth : V.depth,
    duplicates: n,
    ignoreQueryPrefix: t.ignoreQueryPrefix === !0,
    interpretNumericEntities: typeof t.interpretNumericEntities == "boolean" ? t.interpretNumericEntities : V.interpretNumericEntities,
    parameterLimit: typeof t.parameterLimit == "number" ? t.parameterLimit : V.parameterLimit,
    parseArrays: t.parseArrays !== !1,
    plainObjects: typeof t.plainObjects == "boolean" ? t.plainObjects : V.plainObjects,
    strictDepth: typeof t.strictDepth == "boolean" ? !!t.strictDepth : V.strictDepth,
    strictNullHandling: typeof t.strictNullHandling == "boolean" ? t.strictNullHandling : V.strictNullHandling
  };
}, Zd = function(e, t) {
  var r = Qd(t);
  if (e === "" || e === null || typeof e > "u")
    return r.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var n = typeof e == "string" ? Jd(e, r) : e, o = r.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, i = Object.keys(n), a = 0; a < i.length; ++a) {
    var s = i[a], l = Xd(s, n[s], r, typeof e == "string");
    o = dt.merge(o, l, r);
  }
  return r.allowSparse === !0 ? o : dt.compact(o);
}, ep = qd, tp = Zd, rp = kn, Yo = {
  formats: rp,
  parse: tp,
  stringify: ep
}, np = { exports: {} };
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */
(function(e, t) {
  (function(r, n) {
    e.exports = n();
  })(Qr, function() {
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
    r.configure = function(c) {
      var p, m;
      for (p in c)
        m = c[p], m !== void 0 && c.hasOwnProperty(p) && (n[p] = m);
      return this;
    }, r.status = null, r.set = function(c) {
      var p = r.isStarted();
      c = o(c, n.minimum, 1), r.status = c === 1 ? null : c;
      var m = r.render(!p), b = m.querySelector(n.barSelector), E = n.speed, S = n.easing;
      return m.offsetWidth, s(function(x) {
        n.positionUsing === "" && (n.positionUsing = r.getPositioningCSS()), l(b, a(c, E, S)), c === 1 ? (l(m, {
          transition: "none",
          opacity: 1
        }), m.offsetWidth, setTimeout(function() {
          l(m, {
            transition: "all " + E + "ms linear",
            opacity: 0
          }), setTimeout(function() {
            r.remove(), x();
          }, E);
        }, E)) : setTimeout(x, E);
      }), this;
    }, r.isStarted = function() {
      return typeof r.status == "number";
    }, r.start = function() {
      r.status || r.set(0);
      var c = function() {
        setTimeout(function() {
          r.status && (r.trickle(), c());
        }, n.trickleSpeed);
      };
      return n.trickle && c(), this;
    }, r.done = function(c) {
      return !c && !r.status ? this : r.inc(0.3 + 0.5 * Math.random()).set(1);
    }, r.inc = function(c) {
      var p = r.status;
      return p ? (typeof c != "number" && (c = (1 - p) * o(Math.random() * p, 0.1, 0.95)), p = o(p + c, 0, 0.994), r.set(p)) : r.start();
    }, r.trickle = function() {
      return r.inc(Math.random() * n.trickleRate);
    }, function() {
      var c = 0, p = 0;
      r.promise = function(m) {
        return !m || m.state() === "resolved" ? this : (p === 0 && r.start(), c++, p++, m.always(function() {
          p--, p === 0 ? (c = 0, r.done()) : r.set((c - p) / c);
        }), this);
      };
    }(), r.render = function(c) {
      if (r.isRendered()) return document.getElementById("nprogress");
      u(document.documentElement, "nprogress-busy");
      var p = document.createElement("div");
      p.id = "nprogress", p.innerHTML = n.template;
      var m = p.querySelector(n.barSelector), b = c ? "-100" : i(r.status || 0), E = document.querySelector(n.parent), S;
      return l(m, {
        transition: "all 0 linear",
        transform: "translate3d(" + b + "%,0,0)"
      }), n.showSpinner || (S = p.querySelector(n.spinnerSelector), S && v(S)), E != document.body && u(E, "nprogress-custom-parent"), E.appendChild(p), p;
    }, r.remove = function() {
      y(document.documentElement, "nprogress-busy"), y(document.querySelector(n.parent), "nprogress-custom-parent");
      var c = document.getElementById("nprogress");
      c && v(c);
    }, r.isRendered = function() {
      return !!document.getElementById("nprogress");
    }, r.getPositioningCSS = function() {
      var c = document.body.style, p = "WebkitTransform" in c ? "Webkit" : "MozTransform" in c ? "Moz" : "msTransform" in c ? "ms" : "OTransform" in c ? "O" : "";
      return p + "Perspective" in c ? "translate3d" : p + "Transform" in c ? "translate" : "margin";
    };
    function o(c, p, m) {
      return c < p ? p : c > m ? m : c;
    }
    function i(c) {
      return (-1 + c) * 100;
    }
    function a(c, p, m) {
      var b;
      return n.positionUsing === "translate3d" ? b = { transform: "translate3d(" + i(c) + "%,0,0)" } : n.positionUsing === "translate" ? b = { transform: "translate(" + i(c) + "%,0)" } : b = { "margin-left": i(c) + "%" }, b.transition = "all " + p + "ms " + m, b;
    }
    var s = /* @__PURE__ */ function() {
      var c = [];
      function p() {
        var m = c.shift();
        m && m(p);
      }
      return function(m) {
        c.push(m), c.length == 1 && p();
      };
    }(), l = /* @__PURE__ */ function() {
      var c = ["Webkit", "O", "Moz", "ms"], p = {};
      function m(x) {
        return x.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(A, T) {
          return T.toUpperCase();
        });
      }
      function b(x) {
        var A = document.body.style;
        if (x in A) return x;
        for (var T = c.length, $ = x.charAt(0).toUpperCase() + x.slice(1), j; T--; )
          if (j = c[T] + $, j in A) return j;
        return x;
      }
      function E(x) {
        return x = m(x), p[x] || (p[x] = b(x));
      }
      function S(x, A, T) {
        A = E(A), x.style[A] = T;
      }
      return function(x, A) {
        var T = arguments, $, j;
        if (T.length == 2)
          for ($ in A)
            j = A[$], j !== void 0 && A.hasOwnProperty($) && S(x, $, j);
        else
          S(x, T[1], T[2]);
      };
    }();
    function f(c, p) {
      var m = typeof c == "string" ? c : h(c);
      return m.indexOf(" " + p + " ") >= 0;
    }
    function u(c, p) {
      var m = h(c), b = m + p;
      f(m, p) || (c.className = b.substring(1));
    }
    function y(c, p) {
      var m = h(c), b;
      f(c, p) && (b = m.replace(" " + p + " ", " "), c.className = b.substring(1, b.length - 1));
    }
    function h(c) {
      return (" " + (c.className || "") + " ").replace(/\s+/gi, " ");
    }
    function v(c) {
      c && c.parentNode && c.parentNode.removeChild(c);
    }
    return r;
  });
})(np);
function op(e, t, r, n = "brackets") {
  let o = /^https?:\/\//.test(t.toString()), i = o || t.toString().startsWith("/"), a = !i && !t.toString().startsWith("#") && !t.toString().startsWith("?"), s = t.toString().includes("?") || e === "get" && Object.keys(r).length, l = t.toString().includes("#"), f = new URL(t.toString(), "http://localhost");
  return e === "get" && Object.keys(r).length && (f.search = Yo.stringify(kc(Yo.parse(f.search, { ignoreQueryPrefix: !0 }), r), { encodeValuesOnly: !0, arrayFormat: n }), r = {}), [[o ? `${f.protocol}//${f.host}` : "", i ? f.pathname : "", a ? f.pathname.substring(1) : "", s ? f.search : "", l ? f.hash : ""].join(""), r];
}
const Ar = he(null);
Ar.displayName = "ModalStackContext";
const vp = ({ children: e }) => {
  const [t, r] = Q([]), [n, o] = Q({});
  class i {
    constructor(c, p, m, b, E) {
      Pe(this, "updateStack", (c) => {
        r((p) => {
          const m = c([...p]);
          return m.forEach((b, E) => {
            m[E].index = E, m[E].onTopOfStack = E === m.length - 1;
          }), m;
        });
      });
      Pe(this, "close", () => {
        this.updateStack(
          (c) => c.map((p) => {
            var m;
            return p.id === this.id && (Object.keys(p.listeners).forEach((b) => {
              p.off(b);
            }), p.open = !1, (m = p.onCloseCallback) == null || m.call(p)), p;
          })
        );
      });
      Pe(this, "afterLeave", () => {
        this.updateStack(
          (c) => c.filter((p) => {
            var m;
            return p.id !== this.id ? !0 : ((m = p.afterLeaveCallback) == null || m.call(p), !1);
          })
        );
      });
      Pe(this, "on", (c, p) => {
        this.listeners[c] = this.listeners[c] ?? [], this.listeners[c].push(p);
      });
      Pe(this, "off", (c, p) => {
        var m;
        p ? this.listeners[c] = ((m = this.listeners[c]) == null ? void 0 : m.filter((b) => b !== p)) ?? [] : delete this.listeners[c];
      });
      Pe(this, "emit", (c, ...p) => {
        var m;
        return console.log("Emitting", c, "with args", p), (m = this.listeners[c]) == null || m.forEach((b) => b(...p)), "OK";
      });
      Pe(this, "registerEventListenersFromProps", (c) => {
        const p = [];
        return Object.keys(c).filter((m) => m.startsWith("on")).forEach((m) => {
          const b = m.replace(/^on/, "").replace(/^./, (E) => E.toLowerCase()).replace(/([A-Z])/g, "-$1").toLowerCase();
          this.on(b, c[m]), p.push(() => this.off(b, c[m]));
        }), () => p.forEach((m) => m());
      });
      Pe(this, "reload", (c = {}) => {
        let p = Object.keys(this.response.props);
        c.only && (p = Yi(p, c.only)), c.except && (p = Ec(p, c.except)), G.get(this.response.url, {
          headers: {
            Accept: "text/html, application/xhtml+xml",
            "X-Inertia": !0,
            "X-Inertia-Partial-Component": this.response.component,
            "X-Inertia-Version": this.response.version,
            "X-Inertia-Partial-Data": p.join(",")
          }
        }).then((m) => {
          Object.assign(this.componentProps, m.data.props), r((b) => [...b]);
        });
      });
      this.id = i.generateId(), this.open = !0, this.listeners = {}, this.component = c, this.componentProps = p.props, this.response = p, this.modalProps = m, this.onCloseCallback = b, this.afterLeaveCallback = E, this.index = -1, this.getParentModal = () => null, this.getChildModal = () => null, this.onTopOfStack = !0;
    }
    static generateId() {
      return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `inertiaui_modal_${crypto.randomUUID()}` : `inertiaui_modal_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
    }
  }
  const a = (v, c, p, m, b) => {
    const E = new i(v, c, p, m, b);
    return r((S) => {
      const x = [...S, E];
      return x.forEach((A, T) => {
        A.index = T, A.onTopOfStack = T === x.length - 1;
      }), x.forEach((A, T) => {
        A.getParentModal = () => T > 0 ? x[T - 1] : null, A.getChildModal = () => T < x.length - 1 ? x[T + 1] : null;
      }), x;
    }), E;
  };
  function s(v, c, p, m) {
    if (!n[v])
      throw new Error(`The local modal "${v}" has not been registered.`);
    const b = a(null, {}, c, p, m);
    return b.name = v, n[v].callback(b), b;
  }
  const l = (v, c = {}) => f(
    v,
    c.method ?? "get",
    c.data ?? {},
    c.headers ?? {},
    c.config ?? {},
    c.onClose,
    c.onAfterLeave,
    c.queryStringArrayFormat ?? "brackets"
  ), f = (v, c, p = {}, m = {}, b = {}, E = null, S = null, x = "brackets") => new Promise((A, T) => {
    if (v.startsWith("#")) {
      const H = s(v.substring(1), b, E, S);
      A(H);
      return;
    }
    const [$, j] = op(c, v || "", p, x);
    xc().then((H) => {
      G({
        url: $,
        method: c,
        data: j,
        headers: {
          ...m,
          Accept: "text/html, application/xhtml+xml",
          "X-Requested-With": "XMLHttpRequest",
          "X-Inertia": !0,
          "X-Inertia-Version": H.version,
          "X-InertiaUI-Modal": !0
        }
      }).then((I) => {
        Zo.resolveComponent(I.data.component).then((Y) => {
          A(a(Y, I.data, b, E, S));
        });
      }).catch((I) => {
        T(I);
      });
    });
  }), h = {
    stack: t,
    localModals: n,
    push: a,
    reset: () => r([]),
    visit: f,
    visitModal: l,
    registerLocalModal: (v, c) => {
      o((p) => ({
        ...p,
        [v]: { name: v, callback: c }
      }));
    },
    removeLocalModal: (v) => {
      o((c) => {
        const p = { ...c };
        return delete p[v], p;
      });
    }
  };
  return /* @__PURE__ */ L.jsx(Ar.Provider, { value: h, children: e });
}, jn = () => {
  const e = fe(Ar);
  if (e === null)
    throw new Error("useModalStack must be used within a ModalStackProvider");
  return e;
}, Xo = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], gp = ({ children: e }) => {
  const t = fe(Ar).stack;
  return /* @__PURE__ */ L.jsxs(L.Fragment, { children: [
    e,
    t.length > 0 && /* @__PURE__ */ L.jsx(ga, { index: 0 })
  ] });
}, Bn = C.createContext(null);
Bn.displayName = "ModalIndexContext";
const ip = () => {
  const e = C.useContext(Bn);
  if (e === void 0)
    throw new Error("useModalIndex must be used within a ModalIndexProvider");
  return e;
}, ga = ({ index: e }) => {
  const { stack: t } = jn(), r = t[e];
  return !r || !r.component ? null : /* @__PURE__ */ L.jsx(Bn.Provider, { value: e, children: /* @__PURE__ */ L.jsx(
    r.component,
    {
      ...r.componentProps,
      onModalEvent: (...n) => r.emit(...n)
    }
  ) });
};
function ba({ onClick: e }) {
  return /* @__PURE__ */ L.jsxs(
    "button",
    {
      type: "button",
      className: "im-close-button text-gray-400 hover:text-gray-500",
      onClick: e,
      children: [
        /* @__PURE__ */ L.jsx("span", { className: "sr-only", children: "Close" }),
        /* @__PURE__ */ L.jsx(
          "svg",
          {
            className: "size-6",
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: "2",
            stroke: "currentColor",
            "aria-hidden": "true",
            children: /* @__PURE__ */ L.jsx(
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
const ap = ({ modalContext: e, modalProps: t, children: r }) => /* @__PURE__ */ L.jsx("div", { className: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4", children: /* @__PURE__ */ L.jsx(
  "div",
  {
    className: tr("im-modal-positioner flex min-h-full justify-center", {
      "items-start": t.position === "top",
      "items-center": t.position === "center",
      "items-end": t.position === "bottom"
    }),
    children: /* @__PURE__ */ L.jsx(
      mt,
      {
        enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
        enterTo: "opacity-100 translate-y-0 sm:scale-100",
        leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
        leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
        afterLeave: e.afterLeave,
        className: tr("im-modal-wrapper w-full transition duration-300 ease-in-out", e.onTopOfStack ? "" : "blur-sm", {
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
        children: /* @__PURE__ */ L.jsxs(Tn, { className: `im-modal-content relative ${t.paddingClasses} ${t.panelClasses}`, children: [
          t.closeButton && /* @__PURE__ */ L.jsx("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ L.jsx(ba, { onClick: e.close }) }),
          typeof r == "function" ? r({ modalContext: e, modalProps: t }) : r
        ] })
      }
    )
  }
) }), sp = ({ modalContext: e, modalProps: t, children: r }) => /* @__PURE__ */ L.jsx("div", { className: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ L.jsx(
  "div",
  {
    className: tr("im-slideover-positioner flex min-h-full items-center", {
      "justify-start": t.position === "left",
      "justify-end": t.position === "right"
    }),
    children: /* @__PURE__ */ L.jsx(
      mt,
      {
        enterFrom: `opacity-0 ${t.position === "left" ? "-translate-x-full" : "translate-x-full"}`,
        enterTo: "opacity-100 translate-x-0",
        leaveFrom: "opacity-100 translate-x-0",
        leaveTo: `opacity-0 ${t.position === "left" ? "-translate-x-full" : "translate-x-full"}`,
        afterLeave: e.afterLeave,
        className: tr("im-slideover-wrapper w-full transition duration-300 ease-in-out", e.onTopOfStack ? "" : "blur-sm", {
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
        children: /* @__PURE__ */ L.jsxs(Tn, { className: `im-slideover-content relative ${t.paddingClasses} ${t.panelClasses}`, children: [
          t.closeButton && /* @__PURE__ */ L.jsx("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ L.jsx(ba, { onClick: e.close }) }),
          typeof r == "function" ? r({ modalContext: e, modalProps: t }) : r
        ] })
      }
    )
  }
) }), lp = Qo(({ name: e, children: t, ...r }, n) => {
  const o = ip(), { stack: i, registerLocalModal: a, removeLocalModal: s } = jn(), [l, f] = Q(null), u = re(() => e ? l : i[o]), y = re(() => (u == null ? void 0 : u.modalProps.slideover) ?? r.slideover ?? ns("type") === "slideover", [r.slideover]), h = re(
    () => ({
      slideover: y,
      closeButton: r.closeButton ?? ot(y, "closeButton"),
      closeExplicitly: r.closeExplicitly ?? ot(y, "closeExplicitly"),
      maxWidth: r.maxWidth ?? ot(y, "maxWidth"),
      paddingClasses: r.paddingClasses ?? ot(y, "paddingClasses"),
      panelClasses: r.panelClasses ?? ot(y, "panelClasses"),
      position: r.position ?? ot(y, "position"),
      ...u == null ? void 0 : u.modalProps
    }),
    [r, u == null ? void 0 : u.modalProps]
  ), v = re(() => h.slideover ? sp : ap, [h.slideover]);
  oe(() => {
    if (e) {
      let p = null;
      return a(e, (m) => {
        p = m.registerEventListenersFromProps(r), f(m);
      }), () => {
        p == null || p(), p = null, s(e);
      };
    }
    return u.registerEventListenersFromProps(r);
  }, [e]), es(
    n,
    () => ({
      close: () => u.close(),
      emit: (...p) => u.emit(...p),
      getChildModal: () => u.getChildModal(),
      getParentModal: () => u.getParentModal(),
      modalContext: u,
      reload: () => u.reload()
    }),
    [u]
  );
  const c = () => {
    h.closeExplicitly || u.close();
  };
  return u && /* @__PURE__ */ L.jsx(
    Ai,
    {
      appear: !0,
      show: u.open ?? !1,
      children: /* @__PURE__ */ L.jsxs(
        Vl,
        {
          as: "div",
          className: "im-dialog relative z-20",
          onClose: c,
          "data-inertiaui-modal-id": u.id,
          "data-inertiaui-modal-index": u.index,
          children: [
            u.index === 0 ? /* @__PURE__ */ L.jsx(
              mt,
              {
                enter: "transition transform ease-in-out duration-300",
                enterFrom: "opacity-0",
                enterTo: "opacity-100",
                leave: "transition transform ease-in-out duration-300",
                leaveFrom: "opacity-100",
                leaveTo: "opacity-0",
                children: u.onTopOfStack ? /* @__PURE__ */ L.jsx(
                  "div",
                  {
                    className: "im-backdrop fixed inset-0 z-30 bg-black/75",
                    "aria-hidden": "true"
                  }
                ) : /* @__PURE__ */ L.jsx("div", {})
              }
            ) : null,
            u.index > 0 && u.onTopOfStack ? /* @__PURE__ */ L.jsx("div", { className: "im-backdrop fixed inset-0 z-30 bg-black/75" }) : null,
            /* @__PURE__ */ L.jsx(
              v,
              {
                modalContext: u,
                modalProps: h,
                children: typeof t == "function" ? t({
                  close: u.close,
                  emit: u.emit,
                  getChildModal: u.getChildModal,
                  getParentModal: u.getParentModal,
                  modalContext: u,
                  modalProps: h,
                  reload: u.reload
                }) : t
              }
            ),
            i[u.index + 1] && /* @__PURE__ */ L.jsx(ga, { index: u.index + 1 })
          ]
        }
      )
    }
  );
});
lp.displayName = "Modal";
const bp = ({
  href: e,
  method: t = "get",
  data: r = {},
  as: n = "a",
  fragment: o = null,
  headers: i = {},
  queryStringArrayFormat: a = "brackets",
  onAfterLeave: s = null,
  onBlur: l = null,
  onClose: f = null,
  onError: u = null,
  onFocus: y = null,
  onStart: h = null,
  onSuccess: v = null,
  children: c,
  ...p
}) => {
  const [m, b] = Q(!1), [E, S] = Q(null), { stack: x, visit: A } = jn(), T = {}, $ = {};
  Object.keys(p).forEach((R) => {
    Xo.includes(R) || (R.startsWith("on") && typeof p[R] == "function" ? R.toLowerCase() in window ? T[R] = p[R] : $[R] = p[R] : T[R] = p[R]);
  }), oe(() => {
    o && window.location.hash === `#${o}` && Z();
  }, [o]);
  const [j, H] = Q(!1);
  oe(() => {
    E && (E.onTopOfStack && j ? y == null || y() : !E.onTopOfStack && !j && (l == null || l()), H(!E.onTopOfStack));
  }, [x]);
  const I = Ce(
    (R) => {
      o && R === 0 && (window.location.hash = ""), f == null || f();
    },
    [f, o]
  ), Y = Ce(() => {
    S(null), s == null || s();
  }, [s]), Z = Ce(
    (R) => {
      R == null || R.preventDefault(), !m && (e.startsWith("#") || (b(!0), h == null || h()), A(
        e,
        t,
        r,
        i,
        Sc(Yi(p, Xo)),
        () => I(x.length),
        Y,
        a
      ).then((M) => {
        S(M), o && M.index === 0 && (window.location.hash = o), M.registerEventListenersFromProps($), v == null || v();
      }).catch((M) => {
        console.error(M), u == null || u(M);
      }).finally(() => b(!1)));
    },
    [e, t, r, i, a, p, I, Y]
  );
  return /* @__PURE__ */ L.jsx(
    n,
    {
      ...T,
      href: e,
      onClick: Z,
      children: typeof c == "function" ? c({ loading: m }) : c
    }
  );
};
export {
  lp as Modal,
  bp as ModalLink,
  gp as ModalRoot,
  vp as ModalStackProvider,
  ns as getConfig,
  mp as putConfig,
  pp as resetConfig,
  ip as useModalIndex,
  jn as useModalStack
};
