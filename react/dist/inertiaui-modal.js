var Ga = Object.defineProperty;
var Ka = (e, t, r) => t in e ? Ga(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var Oe = (e, t, r) => Ka(e, typeof t != "symbol" ? t + "" : t, r);
import * as Rt from "react";
import F, { createContext as he, useState as Q, useContext as fe, forwardRef as En, useMemo as ne, useEffect as oe, useImperativeHandle as Zo, useLayoutEffect as Ja, useRef as U, Fragment as we, isValidElement as Ya, cloneElement as Xa, createElement as Qa, useId as It, useSyncExternalStore as Za, useCallback as Fe, useReducer as es, createRef as ts } from "react";
import { router as ei } from "@inertiajs/react";
import { createPortal as rs } from "react-dom";
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
class ns {
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
const fr = new ns(), mp = () => fr.reset(), yp = (e, t) => fr.put(e, t), os = (e) => fr.get(e), ot = (e, t) => fr.get(e ? `slideover.${t}` : `modal.${t}`);
var Qr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function is(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function as(e) {
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
var ro;
function ss() {
  if (ro) return Et;
  ro = 1;
  var e = F, t = Symbol.for("react.element"), r = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, o = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, i = { key: !0, ref: !0, __self: !0, __source: !0 };
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
var no;
function ls() {
  return no || (no = 1, process.env.NODE_ENV !== "production" && function() {
    var e = F, t = Symbol.for("react.element"), r = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), f = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), y = Symbol.for("react.memo"), h = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), c = Symbol.iterator, p = "@@iterator";
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
        var B = O.map(function(I) {
          return String(I);
        });
        B.unshift("Warning: " + w), Function.prototype.apply.call(console[d], console, B);
      }
    }
    var x = !1, A = !1, T = !1, $ = !1, j = !1, H;
    H = Symbol.for("react.module.reference");
    function L(d) {
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
            var k = d, B = k._payload, I = k._init;
            try {
              return R(I(B));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var M = Object.assign, K = 0, pe, ge, Se, re, W, _e, Wt;
    function te() {
    }
    te.__reactDisabledLog = !0;
    function Tr() {
      {
        if (K === 0) {
          pe = console.log, ge = console.info, Se = console.warn, re = console.error, W = console.group, _e = console.groupCollapsed, Wt = console.groupEnd;
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
              value: re
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
      var Sa = typeof WeakMap == "function" ? WeakMap : Map;
      Ht = new Sa();
    }
    function Wn(d, w) {
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
            } catch (le) {
              P = le;
            }
            Reflect.construct(d, [], I);
          } else {
            try {
              I.call();
            } catch (le) {
              P = le;
            }
            d.call(I.prototype);
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
    function xa(d, w, O) {
      return Wn(d, !1);
    }
    function Oa(d) {
      var w = d.prototype;
      return !!(w && w.isReactComponent);
    }
    function qt(d, w, O) {
      if (d == null)
        return "";
      if (typeof d == "function")
        return Wn(d, Oa(d));
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
            return xa(d.render);
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
    var bt = Object.prototype.hasOwnProperty, Hn = {}, qn = b.ReactDebugCurrentFrame;
    function Vt(d) {
      if (d) {
        var w = d._owner, O = qt(d.type, d._source, w ? w.type : null);
        qn.setExtraStackFrame(O);
      } else
        qn.setExtraStackFrame(null);
    }
    function Aa(d, w, O, P, k) {
      {
        var B = Function.call.bind(bt);
        for (var I in d)
          if (B(d, I)) {
            var _ = void 0;
            try {
              if (typeof d[I] != "function") {
                var ae = Error((P || "React class") + ": " + O + " type `" + I + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof d[I] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw ae.name = "Invariant Violation", ae;
              }
              _ = d[I](w, I, P, O, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (z) {
              _ = z;
            }
            _ && !(_ instanceof Error) && (Vt(k), E("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", P || "React class", O, I, typeof _), Vt(null)), _ instanceof Error && !(_.message in Hn) && (Hn[_.message] = !0, Vt(k), E("Failed %s type: %s", O, _.message), Vt(null));
          }
      }
    }
    var Ta = Array.isArray;
    function Pr(d) {
      return Ta(d);
    }
    function Ra(d) {
      {
        var w = typeof Symbol == "function" && Symbol.toStringTag, O = w && d[Symbol.toStringTag] || d.constructor.name || "Object";
        return O;
      }
    }
    function Pa(d) {
      try {
        return Vn(d), !1;
      } catch {
        return !0;
      }
    }
    function Vn(d) {
      return "" + d;
    }
    function zn(d) {
      if (Pa(d))
        return E("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ra(d)), Vn(d);
    }
    var wt = b.ReactCurrentOwner, Fa = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Gn, Kn, Fr;
    Fr = {};
    function Ca(d) {
      if (bt.call(d, "ref")) {
        var w = Object.getOwnPropertyDescriptor(d, "ref").get;
        if (w && w.isReactWarning)
          return !1;
      }
      return d.ref !== void 0;
    }
    function $a(d) {
      if (bt.call(d, "key")) {
        var w = Object.getOwnPropertyDescriptor(d, "key").get;
        if (w && w.isReactWarning)
          return !1;
      }
      return d.key !== void 0;
    }
    function _a(d, w) {
      if (typeof d.ref == "string" && wt.current && w && wt.current.stateNode !== w) {
        var O = R(wt.current.type);
        Fr[O] || (E('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', R(wt.current.type), d.ref), Fr[O] = !0);
      }
    }
    function Na(d, w) {
      {
        var O = function() {
          Gn || (Gn = !0, E("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", w));
        };
        O.isReactWarning = !0, Object.defineProperty(d, "key", {
          get: O,
          configurable: !0
        });
      }
    }
    function Da(d, w) {
      {
        var O = function() {
          Kn || (Kn = !0, E("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", w));
        };
        O.isReactWarning = !0, Object.defineProperty(d, "ref", {
          get: O,
          configurable: !0
        });
      }
    }
    var Ia = function(d, w, O, P, k, B, I) {
      var _ = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: d,
        key: w,
        ref: O,
        props: I,
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
    function La(d, w, O, P, k) {
      {
        var B, I = {}, _ = null, ae = null;
        O !== void 0 && (zn(O), _ = "" + O), $a(w) && (zn(w.key), _ = "" + w.key), Ca(w) && (ae = w.ref, _a(w, k));
        for (B in w)
          bt.call(w, B) && !Fa.hasOwnProperty(B) && (I[B] = w[B]);
        if (d && d.defaultProps) {
          var z = d.defaultProps;
          for (B in z)
            I[B] === void 0 && (I[B] = z[B]);
        }
        if (_ || ae) {
          var J = typeof d == "function" ? d.displayName || d.name || "Unknown" : d;
          _ && Na(I, J), ae && Da(I, J);
        }
        return Ia(d, _, ae, k, P, wt.current, I);
      }
    }
    var Cr = b.ReactCurrentOwner, Jn = b.ReactDebugCurrentFrame;
    function rt(d) {
      if (d) {
        var w = d._owner, O = qt(d.type, d._source, w ? w.type : null);
        Jn.setExtraStackFrame(O);
      } else
        Jn.setExtraStackFrame(null);
    }
    var $r;
    $r = !1;
    function _r(d) {
      return typeof d == "object" && d !== null && d.$$typeof === t;
    }
    function Yn() {
      {
        if (Cr.current) {
          var d = R(Cr.current.type);
          if (d)
            return `

Check the render method of \`` + d + "`.";
        }
        return "";
      }
    }
    function Ma(d) {
      return "";
    }
    var Xn = {};
    function ka(d) {
      {
        var w = Yn();
        if (!w) {
          var O = typeof d == "string" ? d : d.displayName || d.name;
          O && (w = `

Check the top-level render call using <` + O + ">.");
        }
        return w;
      }
    }
    function Qn(d, w) {
      {
        if (!d._store || d._store.validated || d.key != null)
          return;
        d._store.validated = !0;
        var O = ka(w);
        if (Xn[O])
          return;
        Xn[O] = !0;
        var P = "";
        d && d._owner && d._owner !== Cr.current && (P = " It was passed a child from " + R(d._owner.type) + "."), rt(d), E('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', O, P), rt(null);
      }
    }
    function Zn(d, w) {
      {
        if (typeof d != "object")
          return;
        if (Pr(d))
          for (var O = 0; O < d.length; O++) {
            var P = d[O];
            _r(P) && Qn(P, w);
          }
        else if (_r(d))
          d._store && (d._store.validated = !0);
        else if (d) {
          var k = m(d);
          if (typeof k == "function" && k !== d.entries)
            for (var B = k.call(d), I; !(I = B.next()).done; )
              _r(I.value) && Qn(I.value, w);
        }
      }
    }
    function ja(d) {
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
          Aa(O, d.props, "prop", P, d);
        } else if (w.PropTypes !== void 0 && !$r) {
          $r = !0;
          var k = R(w);
          E("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", k || "Unknown");
        }
        typeof w.getDefaultProps == "function" && !w.getDefaultProps.isReactClassApproved && E("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Ba(d) {
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
    var eo = {};
    function to(d, w, O, P, k, B) {
      {
        var I = L(d);
        if (!I) {
          var _ = "";
          (d === void 0 || typeof d == "object" && d !== null && Object.keys(d).length === 0) && (_ += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ae = Ma();
          ae ? _ += ae : _ += Yn();
          var z;
          d === null ? z = "null" : Pr(d) ? z = "array" : d !== void 0 && d.$$typeof === t ? (z = "<" + (R(d.type) || "Unknown") + " />", _ = " Did you accidentally export a JSX literal instead of a component?") : z = typeof d, E("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", z, _);
        }
        var J = La(d, w, O, k, B);
        if (J == null)
          return J;
        if (I) {
          var ye = w.children;
          if (ye !== void 0)
            if (P)
              if (Pr(ye)) {
                for (var nt = 0; nt < ye.length; nt++)
                  Zn(ye[nt], d);
                Object.freeze && Object.freeze(ye);
              } else
                E("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Zn(ye, d);
        }
        if (bt.call(w, "key")) {
          var qe = R(d), le = Object.keys(w).filter(function(za) {
            return za !== "key";
          }), Nr = le.length > 0 ? "{key: someKey, " + le.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!eo[qe + Nr]) {
            var Va = le.length > 0 ? "{" + le.join(": ..., ") + ": ...}" : "{}";
            E(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Nr, qe, Va, qe), eo[qe + Nr] = !0;
          }
        }
        return d === n ? Ba(J) : ja(J), J;
      }
    }
    function Ua(d, w, O) {
      return to(d, w, O, !0);
    }
    function Wa(d, w, O) {
      return to(d, w, O, !1);
    }
    var Ha = Wa, qa = Ua;
    St.Fragment = n, St.jsx = Ha, St.jsxs = qa;
  }()), St;
}
process.env.NODE_ENV === "production" ? Zr.exports = ss() : Zr.exports = ls();
var D = Zr.exports;
function ti(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: us } = Object.prototype, { getPrototypeOf: Sn } = Object, dr = /* @__PURE__ */ ((e) => (t) => {
  const r = us.call(t);
  return e[r] || (e[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), Ee = (e) => (e = e.toLowerCase(), (t) => dr(t) === e), pr = (e) => (t) => typeof t === e, { isArray: pt } = Array, Nt = pr("undefined");
function cs(e) {
  return e !== null && !Nt(e) && e.constructor !== null && !Nt(e.constructor) && me(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const ri = Ee("ArrayBuffer");
function fs(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && ri(e.buffer), t;
}
const ds = pr("string"), me = pr("function"), ni = pr("number"), mr = (e) => e !== null && typeof e == "object", ps = (e) => e === !0 || e === !1, Xt = (e) => {
  if (dr(e) !== "object")
    return !1;
  const t = Sn(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, ms = Ee("Date"), ys = Ee("File"), hs = Ee("Blob"), vs = Ee("FileList"), gs = (e) => mr(e) && me(e.pipe), bs = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || me(e.append) && ((t = dr(e)) === "formdata" || // detect form-data instance
  t === "object" && me(e.toString) && e.toString() === "[object FormData]"));
}, ws = Ee("URLSearchParams"), [Es, Ss, xs, Os] = ["ReadableStream", "Request", "Response", "Headers"].map(Ee), As = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Lt(e, t, { allOwnKeys: r = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let n, o;
  if (typeof e != "object" && (e = [e]), pt(e))
    for (n = 0, o = e.length; n < o; n++)
      t.call(null, e[n], n, e);
  else {
    const i = r ? Object.getOwnPropertyNames(e) : Object.keys(e), a = i.length;
    let s;
    for (n = 0; n < a; n++)
      s = i[n], t.call(null, e[s], s, e);
  }
}
function oi(e, t) {
  t = t.toLowerCase();
  const r = Object.keys(e);
  let n = r.length, o;
  for (; n-- > 0; )
    if (o = r[n], t === o.toLowerCase())
      return o;
  return null;
}
const Ke = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, ii = (e) => !Nt(e) && e !== Ke;
function en() {
  const { caseless: e } = ii(this) && this || {}, t = {}, r = (n, o) => {
    const i = e && oi(t, o) || o;
    Xt(t[i]) && Xt(n) ? t[i] = en(t[i], n) : Xt(n) ? t[i] = en({}, n) : pt(n) ? t[i] = n.slice() : t[i] = n;
  };
  for (let n = 0, o = arguments.length; n < o; n++)
    arguments[n] && Lt(arguments[n], r);
  return t;
}
const Ts = (e, t, r, { allOwnKeys: n } = {}) => (Lt(t, (o, i) => {
  r && me(o) ? e[i] = ti(o, r) : e[i] = o;
}, { allOwnKeys: n }), e), Rs = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Ps = (e, t, r, n) => {
  e.prototype = Object.create(t.prototype, n), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), r && Object.assign(e.prototype, r);
}, Fs = (e, t, r, n) => {
  let o, i, a;
  const s = {};
  if (t = t || {}, e == null) return t;
  do {
    for (o = Object.getOwnPropertyNames(e), i = o.length; i-- > 0; )
      a = o[i], (!n || n(a, e, t)) && !s[a] && (t[a] = e[a], s[a] = !0);
    e = r !== !1 && Sn(e);
  } while (e && (!r || r(e, t)) && e !== Object.prototype);
  return t;
}, Cs = (e, t, r) => {
  e = String(e), (r === void 0 || r > e.length) && (r = e.length), r -= t.length;
  const n = e.indexOf(t, r);
  return n !== -1 && n === r;
}, $s = (e) => {
  if (!e) return null;
  if (pt(e)) return e;
  let t = e.length;
  if (!ni(t)) return null;
  const r = new Array(t);
  for (; t-- > 0; )
    r[t] = e[t];
  return r;
}, _s = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Sn(Uint8Array)), Ns = (e, t) => {
  const n = (e && e[Symbol.iterator]).call(e);
  let o;
  for (; (o = n.next()) && !o.done; ) {
    const i = o.value;
    t.call(e, i[0], i[1]);
  }
}, Ds = (e, t) => {
  let r;
  const n = [];
  for (; (r = e.exec(t)) !== null; )
    n.push(r);
  return n;
}, Is = Ee("HTMLFormElement"), Ls = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(r, n, o) {
    return n.toUpperCase() + o;
  }
), oo = (({ hasOwnProperty: e }) => (t, r) => e.call(t, r))(Object.prototype), Ms = Ee("RegExp"), ai = (e, t) => {
  const r = Object.getOwnPropertyDescriptors(e), n = {};
  Lt(r, (o, i) => {
    let a;
    (a = t(o, i, e)) !== !1 && (n[i] = a || o);
  }), Object.defineProperties(e, n);
}, ks = (e) => {
  ai(e, (t, r) => {
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
}, js = (e, t) => {
  const r = {}, n = (o) => {
    o.forEach((i) => {
      r[i] = !0;
    });
  };
  return pt(e) ? n(e) : n(String(e).split(t)), r;
}, Bs = () => {
}, Us = (e, t) => e != null && Number.isFinite(e = +e) ? e : t, Dr = "abcdefghijklmnopqrstuvwxyz", io = "0123456789", si = {
  DIGIT: io,
  ALPHA: Dr,
  ALPHA_DIGIT: Dr + Dr.toUpperCase() + io
}, Ws = (e = 16, t = si.ALPHA_DIGIT) => {
  let r = "";
  const { length: n } = t;
  for (; e--; )
    r += t[Math.random() * n | 0];
  return r;
};
function Hs(e) {
  return !!(e && me(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const qs = (e) => {
  const t = new Array(10), r = (n, o) => {
    if (mr(n)) {
      if (t.indexOf(n) >= 0)
        return;
      if (!("toJSON" in n)) {
        t[o] = n;
        const i = pt(n) ? [] : {};
        return Lt(n, (a, s) => {
          const l = r(a, o + 1);
          !Nt(l) && (i[s] = l);
        }), t[o] = void 0, i;
      }
    }
    return n;
  };
  return r(e, 0);
}, Vs = Ee("AsyncFunction"), zs = (e) => e && (mr(e) || me(e)) && me(e.then) && me(e.catch), li = ((e, t) => e ? setImmediate : t ? ((r, n) => (Ke.addEventListener("message", ({ source: o, data: i }) => {
  o === Ke && i === r && n.length && n.shift()();
}, !1), (o) => {
  n.push(o), Ke.postMessage(r, "*");
}))(`axios@${Math.random()}`, []) : (r) => setTimeout(r))(
  typeof setImmediate == "function",
  me(Ke.postMessage)
), Gs = typeof queueMicrotask < "u" ? queueMicrotask.bind(Ke) : typeof process < "u" && process.nextTick || li, g = {
  isArray: pt,
  isArrayBuffer: ri,
  isBuffer: cs,
  isFormData: bs,
  isArrayBufferView: fs,
  isString: ds,
  isNumber: ni,
  isBoolean: ps,
  isObject: mr,
  isPlainObject: Xt,
  isReadableStream: Es,
  isRequest: Ss,
  isResponse: xs,
  isHeaders: Os,
  isUndefined: Nt,
  isDate: ms,
  isFile: ys,
  isBlob: hs,
  isRegExp: Ms,
  isFunction: me,
  isStream: gs,
  isURLSearchParams: ws,
  isTypedArray: _s,
  isFileList: vs,
  forEach: Lt,
  merge: en,
  extend: Ts,
  trim: As,
  stripBOM: Rs,
  inherits: Ps,
  toFlatObject: Fs,
  kindOf: dr,
  kindOfTest: Ee,
  endsWith: Cs,
  toArray: $s,
  forEachEntry: Ns,
  matchAll: Ds,
  isHTMLForm: Is,
  hasOwnProperty: oo,
  hasOwnProp: oo,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: ai,
  freezeMethods: ks,
  toObjectSet: js,
  toCamelCase: Ls,
  noop: Bs,
  toFiniteNumber: Us,
  findKey: oi,
  global: Ke,
  isContextDefined: ii,
  ALPHABET: si,
  generateString: Ws,
  isSpecCompliantForm: Hs,
  toJSONObject: qs,
  isAsyncFn: Vs,
  isThenable: zs,
  setImmediate: li,
  asap: Gs
};
function C(e, t, r, n, o) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), r && (this.config = r), n && (this.request = n), o && (this.response = o, this.status = o.status ? o.status : null);
}
g.inherits(C, Error, {
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
const ui = C.prototype, ci = {};
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
  ci[e] = { value: e };
});
Object.defineProperties(C, ci);
Object.defineProperty(ui, "isAxiosError", { value: !0 });
C.from = (e, t, r, n, o, i) => {
  const a = Object.create(ui);
  return g.toFlatObject(e, a, function(l) {
    return l !== Error.prototype;
  }, (s) => s !== "isAxiosError"), C.call(a, e.message, t, r, n, o), a.cause = e, a.name = e.name, i && Object.assign(a, i), a;
};
const Ks = null;
function tn(e) {
  return g.isPlainObject(e) || g.isArray(e);
}
function fi(e) {
  return g.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function ao(e, t, r) {
  return e ? e.concat(t).map(function(o, i) {
    return o = fi(o), !r && i ? "[" + o + "]" : o;
  }).join(r ? "." : "") : t;
}
function Js(e) {
  return g.isArray(e) && !e.some(tn);
}
const Ys = g.toFlatObject(g, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function yr(e, t, r) {
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
      throw new C("Blob is not supported. Use a Buffer instead.");
    return g.isArrayBuffer(c) || g.isTypedArray(c) ? l && typeof Blob == "function" ? new Blob([c]) : Buffer.from(c) : c;
  }
  function u(c, p, m) {
    let b = c;
    if (c && !m && typeof c == "object") {
      if (g.endsWith(p, "{}"))
        p = n ? p : p.slice(0, -2), c = JSON.stringify(c);
      else if (g.isArray(c) && Js(c) || (g.isFileList(c) || g.endsWith(p, "[]")) && (b = g.toArray(c)))
        return p = fi(p), b.forEach(function(S, x) {
          !(g.isUndefined(S) || S === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            a === !0 ? ao([p], x, i) : a === null ? p : p + "[]",
            f(S)
          );
        }), !1;
    }
    return tn(c) ? !0 : (t.append(ao(m, p, i), f(c)), !1);
  }
  const y = [], h = Object.assign(Ys, {
    defaultVisitor: u,
    convertValue: f,
    isVisitable: tn
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
function so(e) {
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
function xn(e, t) {
  this._pairs = [], e && yr(e, this, t);
}
const di = xn.prototype;
di.append = function(t, r) {
  this._pairs.push([t, r]);
};
di.toString = function(t) {
  const r = t ? function(n) {
    return t.call(this, n, so);
  } : so;
  return this._pairs.map(function(o) {
    return r(o[0]) + "=" + r(o[1]);
  }, "").join("&");
};
function Xs(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function pi(e, t, r) {
  if (!t)
    return e;
  const n = r && r.encode || Xs, o = r && r.serialize;
  let i;
  if (o ? i = o(t, r) : i = g.isURLSearchParams(t) ? t.toString() : new xn(t, r).toString(n), i) {
    const a = e.indexOf("#");
    a !== -1 && (e = e.slice(0, a)), e += (e.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return e;
}
class lo {
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
const mi = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Qs = typeof URLSearchParams < "u" ? URLSearchParams : xn, Zs = typeof FormData < "u" ? FormData : null, el = typeof Blob < "u" ? Blob : null, tl = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Qs,
    FormData: Zs,
    Blob: el
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, On = typeof window < "u" && typeof document < "u", rn = typeof navigator == "object" && navigator || void 0, rl = On && (!rn || ["ReactNative", "NativeScript", "NS"].indexOf(rn.product) < 0), nl = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", ol = On && window.location.href || "http://localhost", il = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: On,
  hasStandardBrowserEnv: rl,
  hasStandardBrowserWebWorkerEnv: nl,
  navigator: rn,
  origin: ol
}, Symbol.toStringTag, { value: "Module" })), ue = {
  ...il,
  ...tl
};
function al(e, t) {
  return yr(e, new ue.classes.URLSearchParams(), Object.assign({
    visitor: function(r, n, o, i) {
      return ue.isNode && g.isBuffer(r) ? (this.append(n, r.toString("base64")), !1) : i.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function sl(e) {
  return g.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function ll(e) {
  const t = {}, r = Object.keys(e);
  let n;
  const o = r.length;
  let i;
  for (n = 0; n < o; n++)
    i = r[n], t[i] = e[i];
  return t;
}
function yi(e) {
  function t(r, n, o, i) {
    let a = r[i++];
    if (a === "__proto__") return !0;
    const s = Number.isFinite(+a), l = i >= r.length;
    return a = !a && g.isArray(o) ? o.length : a, l ? (g.hasOwnProp(o, a) ? o[a] = [o[a], n] : o[a] = n, !s) : ((!o[a] || !g.isObject(o[a])) && (o[a] = []), t(r, n, o[a], i) && g.isArray(o[a]) && (o[a] = ll(o[a])), !s);
  }
  if (g.isFormData(e) && g.isFunction(e.entries)) {
    const r = {};
    return g.forEachEntry(e, (n, o) => {
      t(sl(n), o, r, 0);
    }), r;
  }
  return null;
}
function ul(e, t, r) {
  if (g.isString(e))
    try {
      return (t || JSON.parse)(e), g.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (0, JSON.stringify)(e);
}
const Mt = {
  transitional: mi,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, r) {
    const n = r.getContentType() || "", o = n.indexOf("application/json") > -1, i = g.isObject(t);
    if (i && g.isHTMLForm(t) && (t = new FormData(t)), g.isFormData(t))
      return o ? JSON.stringify(yi(t)) : t;
    if (g.isArrayBuffer(t) || g.isBuffer(t) || g.isStream(t) || g.isFile(t) || g.isBlob(t) || g.isReadableStream(t))
      return t;
    if (g.isArrayBufferView(t))
      return t.buffer;
    if (g.isURLSearchParams(t))
      return r.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let s;
    if (i) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return al(t, this.formSerializer).toString();
      if ((s = g.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
        const l = this.env && this.env.FormData;
        return yr(
          s ? { "files[]": t } : t,
          l && new l(),
          this.formSerializer
        );
      }
    }
    return i || o ? (r.setContentType("application/json", !1), ul(t)) : t;
  }],
  transformResponse: [function(t) {
    const r = this.transitional || Mt.transitional, n = r && r.forcedJSONParsing, o = this.responseType === "json";
    if (g.isResponse(t) || g.isReadableStream(t))
      return t;
    if (t && g.isString(t) && (n && !this.responseType || o)) {
      const a = !(r && r.silentJSONParsing) && o;
      try {
        return JSON.parse(t);
      } catch (s) {
        if (a)
          throw s.name === "SyntaxError" ? C.from(s, C.ERR_BAD_RESPONSE, this, null, this.response) : s;
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
  Mt.headers[e] = {};
});
const cl = g.toObjectSet([
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
]), fl = (e) => {
  const t = {};
  let r, n, o;
  return e && e.split(`
`).forEach(function(a) {
    o = a.indexOf(":"), r = a.substring(0, o).trim().toLowerCase(), n = a.substring(o + 1).trim(), !(!r || t[r] && cl[r]) && (r === "set-cookie" ? t[r] ? t[r].push(n) : t[r] = [n] : t[r] = t[r] ? t[r] + ", " + n : n);
  }), t;
}, uo = Symbol("internals");
function xt(e) {
  return e && String(e).trim().toLowerCase();
}
function Qt(e) {
  return e === !1 || e == null ? e : g.isArray(e) ? e.map(Qt) : String(e);
}
function dl(e) {
  const t = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(e); )
    t[n[1]] = n[2];
  return t;
}
const pl = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Ir(e, t, r, n, o) {
  if (g.isFunction(n))
    return n.call(this, t, r);
  if (o && (t = r), !!g.isString(t)) {
    if (g.isString(n))
      return t.indexOf(n) !== -1;
    if (g.isRegExp(n))
      return n.test(t);
  }
}
function ml(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, r, n) => r.toUpperCase() + n);
}
function yl(e, t) {
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
      const u = xt(l);
      if (!u)
        throw new Error("header name must be a non-empty string");
      const y = g.findKey(o, u);
      (!y || o[y] === void 0 || f === !0 || f === void 0 && o[y] !== !1) && (o[y || l] = Qt(s));
    }
    const a = (s, l) => g.forEach(s, (f, u) => i(f, u, l));
    if (g.isPlainObject(t) || t instanceof this.constructor)
      a(t, r);
    else if (g.isString(t) && (t = t.trim()) && !pl(t))
      a(fl(t), r);
    else if (g.isHeaders(t))
      for (const [s, l] of t.entries())
        i(l, s, n);
    else
      t != null && i(r, t, n);
    return this;
  }
  get(t, r) {
    if (t = xt(t), t) {
      const n = g.findKey(this, t);
      if (n) {
        const o = this[n];
        if (!r)
          return o;
        if (r === !0)
          return dl(o);
        if (g.isFunction(r))
          return r.call(this, o, n);
        if (g.isRegExp(r))
          return r.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, r) {
    if (t = xt(t), t) {
      const n = g.findKey(this, t);
      return !!(n && this[n] !== void 0 && (!r || Ir(this, this[n], n, r)));
    }
    return !1;
  }
  delete(t, r) {
    const n = this;
    let o = !1;
    function i(a) {
      if (a = xt(a), a) {
        const s = g.findKey(n, a);
        s && (!r || Ir(n, n[s], s, r)) && (delete n[s], o = !0);
      }
    }
    return g.isArray(t) ? t.forEach(i) : i(t), o;
  }
  clear(t) {
    const r = Object.keys(this);
    let n = r.length, o = !1;
    for (; n--; ) {
      const i = r[n];
      (!t || Ir(this, this[i], i, t, !0)) && (delete this[i], o = !0);
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
      const s = t ? ml(i) : String(i).trim();
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
    const n = (this[uo] = this[uo] = {
      accessors: {}
    }).accessors, o = this.prototype;
    function i(a) {
      const s = xt(a);
      n[s] || (yl(o, a), n[s] = !0);
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
function Lr(e, t) {
  const r = this || Mt, n = t || r, o = ce.from(n.headers);
  let i = n.data;
  return g.forEach(e, function(s) {
    i = s.call(r, i, o.normalize(), t ? t.status : void 0);
  }), o.normalize(), i;
}
function hi(e) {
  return !!(e && e.__CANCEL__);
}
function mt(e, t, r) {
  C.call(this, e ?? "canceled", C.ERR_CANCELED, t, r), this.name = "CanceledError";
}
g.inherits(mt, C, {
  __CANCEL__: !0
});
function vi(e, t, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? e(r) : t(new C(
    "Request failed with status code " + r.status,
    [C.ERR_BAD_REQUEST, C.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
    r.config,
    r.request,
    r
  ));
}
function hl(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function vl(e, t) {
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
function gl(e, t) {
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
const tr = (e, t, r = 3) => {
  let n = 0;
  const o = vl(50, 250);
  return gl((i) => {
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
}, co = (e, t) => {
  const r = e != null;
  return [(n) => t[0]({
    lengthComputable: r,
    total: e,
    loaded: n
  }), t[1]];
}, fo = (e) => (...t) => g.asap(() => e(...t)), bl = ue.hasStandardBrowserEnv ? (
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
), wl = ue.hasStandardBrowserEnv ? (
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
function El(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Sl(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function gi(e, t) {
  return e && !El(t) ? Sl(e, t) : t;
}
const po = (e) => e instanceof ce ? { ...e } : e;
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
    headers: (f, u) => o(po(f), po(u), !0)
  };
  return g.forEach(Object.keys(Object.assign({}, e, t)), function(u) {
    const y = l[u] || o, h = y(e[u], t[u], u);
    g.isUndefined(h) && y !== s || (r[u] = h);
  }), r;
}
const bi = (e) => {
  const t = et({}, e);
  let { data: r, withXSRFToken: n, xsrfHeaderName: o, xsrfCookieName: i, headers: a, auth: s } = t;
  t.headers = a = ce.from(a), t.url = pi(gi(t.baseURL, t.url), e.params, e.paramsSerializer), s && a.set(
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
  if (ue.hasStandardBrowserEnv && (n && g.isFunction(n) && (n = n(t)), n || n !== !1 && bl(t.url))) {
    const f = o && i && wl.read(i);
    f && a.set(o, f);
  }
  return t;
}, xl = typeof XMLHttpRequest < "u", Ol = xl && function(e) {
  return new Promise(function(r, n) {
    const o = bi(e);
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
      vi(function($) {
        r($), p();
      }, function($) {
        n($), p();
      }, A), m = null;
    }
    "onloadend" in m ? m.onloadend = b : m.onreadystatechange = function() {
      !m || m.readyState !== 4 || m.status === 0 && !(m.responseURL && m.responseURL.indexOf("file:") === 0) || setTimeout(b);
    }, m.onabort = function() {
      m && (n(new C("Request aborted", C.ECONNABORTED, e, m)), m = null);
    }, m.onerror = function() {
      n(new C("Network Error", C.ERR_NETWORK, e, m)), m = null;
    }, m.ontimeout = function() {
      let x = o.timeout ? "timeout of " + o.timeout + "ms exceeded" : "timeout exceeded";
      const A = o.transitional || mi;
      o.timeoutErrorMessage && (x = o.timeoutErrorMessage), n(new C(
        x,
        A.clarifyTimeoutError ? C.ETIMEDOUT : C.ECONNABORTED,
        e,
        m
      )), m = null;
    }, i === void 0 && a.setContentType(null), "setRequestHeader" in m && g.forEach(a.toJSON(), function(x, A) {
      m.setRequestHeader(A, x);
    }), g.isUndefined(o.withCredentials) || (m.withCredentials = !!o.withCredentials), s && s !== "json" && (m.responseType = o.responseType), f && ([h, c] = tr(f, !0), m.addEventListener("progress", h)), l && m.upload && ([y, v] = tr(l), m.upload.addEventListener("progress", y), m.upload.addEventListener("loadend", v)), (o.cancelToken || o.signal) && (u = (S) => {
      m && (n(!S || S.type ? new mt(null, e, m) : S), m.abort(), m = null);
    }, o.cancelToken && o.cancelToken.subscribe(u), o.signal && (o.signal.aborted ? u() : o.signal.addEventListener("abort", u)));
    const E = hl(o.url);
    if (E && ue.protocols.indexOf(E) === -1) {
      n(new C("Unsupported protocol " + E + ":", C.ERR_BAD_REQUEST, e));
      return;
    }
    m.send(i || null);
  });
}, Al = (e, t) => {
  const { length: r } = e = e ? e.filter(Boolean) : [];
  if (t || r) {
    let n = new AbortController(), o;
    const i = function(f) {
      if (!o) {
        o = !0, s();
        const u = f instanceof Error ? f : this.reason;
        n.abort(u instanceof C ? u : new mt(u instanceof Error ? u.message : u));
      }
    };
    let a = t && setTimeout(() => {
      a = null, i(new C(`timeout ${t} of ms exceeded`, C.ETIMEDOUT));
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
}, Tl = function* (e, t) {
  let r = e.byteLength;
  if (r < t) {
    yield e;
    return;
  }
  let n = 0, o;
  for (; n < r; )
    o = n + t, yield e.slice(n, o), n = o;
}, Rl = async function* (e, t) {
  for await (const r of Pl(e))
    yield* Tl(r, t);
}, Pl = async function* (e) {
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
}, mo = (e, t, r, n) => {
  const o = Rl(e, t);
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
}, hr = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", wi = hr && typeof ReadableStream == "function", Fl = hr && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((e) => (t) => e.encode(t))(new TextEncoder()) : async (e) => new Uint8Array(await new Response(e).arrayBuffer())), Ei = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, Cl = wi && Ei(() => {
  let e = !1;
  const t = new Request(ue.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return e = !0, "half";
    }
  }).headers.has("Content-Type");
  return e && !t;
}), yo = 64 * 1024, nn = wi && Ei(() => g.isReadableStream(new Response("").body)), rr = {
  stream: nn && ((e) => e.body)
};
hr && ((e) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
    !rr[t] && (rr[t] = g.isFunction(e[t]) ? (r) => r[t]() : (r, n) => {
      throw new C(`Response type '${t}' is not supported`, C.ERR_NOT_SUPPORT, n);
    });
  });
})(new Response());
const $l = async (e) => {
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
    return (await Fl(e)).byteLength;
}, _l = async (e, t) => {
  const r = g.toFiniteNumber(e.getContentLength());
  return r ?? $l(t);
}, Nl = hr && (async (e) => {
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
  } = bi(e);
  f = f ? (f + "").toLowerCase() : "text";
  let v = Al([o, i && i.toAbortSignal()], a), c;
  const p = v && v.unsubscribe && (() => {
    v.unsubscribe();
  });
  let m;
  try {
    if (l && Cl && r !== "get" && r !== "head" && (m = await _l(u, n)) !== 0) {
      let A = new Request(t, {
        method: "POST",
        body: n,
        duplex: "half"
      }), T;
      if (g.isFormData(n) && (T = A.headers.get("content-type")) && u.setContentType(T), A.body) {
        const [$, j] = co(
          m,
          tr(fo(l))
        );
        n = mo(A.body, yo, $, j);
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
    const S = nn && (f === "stream" || f === "response");
    if (nn && (s || S && p)) {
      const A = {};
      ["status", "statusText", "headers"].forEach((H) => {
        A[H] = E[H];
      });
      const T = g.toFiniteNumber(E.headers.get("content-length")), [$, j] = s && co(
        T,
        tr(fo(s), !0)
      ) || [];
      E = new Response(
        mo(E.body, yo, $, () => {
          j && j(), p && p();
        }),
        A
      );
    }
    f = f || "text";
    let x = await rr[g.findKey(rr, f) || "text"](E, e);
    return !S && p && p(), await new Promise((A, T) => {
      vi(A, T, {
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
      new C("Network Error", C.ERR_NETWORK, e, c),
      {
        cause: b.cause || b
      }
    ) : C.from(b, b && b.code, e, c);
  }
}), on = {
  http: Ks,
  xhr: Ol,
  fetch: Nl
};
g.forEach(on, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const ho = (e) => `- ${e}`, Dl = (e) => g.isFunction(e) || e === null || e === !1, Si = {
  getAdapter: (e) => {
    e = g.isArray(e) ? e : [e];
    const { length: t } = e;
    let r, n;
    const o = {};
    for (let i = 0; i < t; i++) {
      r = e[i];
      let a;
      if (n = r, !Dl(r) && (n = on[(a = String(r)).toLowerCase()], n === void 0))
        throw new C(`Unknown adapter '${a}'`);
      if (n)
        break;
      o[a || "#" + i] = n;
    }
    if (!n) {
      const i = Object.entries(o).map(
        ([s, l]) => `adapter ${s} ` + (l === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let a = t ? i.length > 1 ? `since :
` + i.map(ho).join(`
`) : " " + ho(i[0]) : "as no adapter specified";
      throw new C(
        "There is no suitable adapter to dispatch the request " + a,
        "ERR_NOT_SUPPORT"
      );
    }
    return n;
  },
  adapters: on
};
function Mr(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new mt(null, e);
}
function vo(e) {
  return Mr(e), e.headers = ce.from(e.headers), e.data = Lr.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), Si.getAdapter(e.adapter || Mt.adapter)(e).then(function(n) {
    return Mr(e), n.data = Lr.call(
      e,
      e.transformResponse,
      n
    ), n.headers = ce.from(n.headers), n;
  }, function(n) {
    return hi(n) || (Mr(e), n && n.response && (n.response.data = Lr.call(
      e,
      e.transformResponse,
      n.response
    ), n.response.headers = ce.from(n.response.headers))), Promise.reject(n);
  });
}
const xi = "1.7.7", An = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  An[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const go = {};
An.transitional = function(t, r, n) {
  function o(i, a) {
    return "[Axios v" + xi + "] Transitional option '" + i + "'" + a + (n ? ". " + n : "");
  }
  return (i, a, s) => {
    if (t === !1)
      throw new C(
        o(a, " has been removed" + (r ? " in " + r : "")),
        C.ERR_DEPRECATED
      );
    return r && !go[a] && (go[a] = !0, console.warn(
      o(
        a,
        " has been deprecated since v" + r + " and will be removed in the near future"
      )
    )), t ? t(i, a, s) : !0;
  };
};
function Il(e, t, r) {
  if (typeof e != "object")
    throw new C("options must be an object", C.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(e);
  let o = n.length;
  for (; o-- > 0; ) {
    const i = n[o], a = t[i];
    if (a) {
      const s = e[i], l = s === void 0 || a(s, i, e);
      if (l !== !0)
        throw new C("option " + i + " must be " + l, C.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0)
      throw new C("Unknown option " + i, C.ERR_BAD_OPTION);
  }
}
const an = {
  assertOptions: Il,
  validators: An
}, De = an.validators;
class Ye {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new lo(),
      response: new lo()
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
    n !== void 0 && an.assertOptions(n, {
      silentJSONParsing: De.transitional(De.boolean),
      forcedJSONParsing: De.transitional(De.boolean),
      clarifyTimeoutError: De.transitional(De.boolean)
    }, !1), o != null && (g.isFunction(o) ? r.paramsSerializer = {
      serialize: o
    } : an.assertOptions(o, {
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
      const c = [vo.bind(this), void 0];
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
      u = vo.call(this, v);
    } catch (c) {
      return Promise.reject(c);
    }
    for (y = 0, h = f.length; y < h; )
      u = u.then(f[y++], f[y++]);
    return u;
  }
  getUri(t) {
    t = et(this.defaults, t);
    const r = gi(t.baseURL, t.url);
    return pi(r, t.params, t.paramsSerializer);
  }
}
g.forEach(["delete", "get", "head", "options"], function(t) {
  Ye.prototype[t] = function(r, n) {
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
  Ye.prototype[t] = r(), Ye.prototype[t + "Form"] = r(!0);
});
class Tn {
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
      n.reason || (n.reason = new mt(i, a, s), r(n.reason));
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
      token: new Tn(function(o) {
        t = o;
      }),
      cancel: t
    };
  }
}
function Ll(e) {
  return function(r) {
    return e.apply(null, r);
  };
}
function Ml(e) {
  return g.isObject(e) && e.isAxiosError === !0;
}
const sn = {
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
Object.entries(sn).forEach(([e, t]) => {
  sn[t] = e;
});
function Oi(e) {
  const t = new Ye(e), r = ti(Ye.prototype.request, t);
  return g.extend(r, Ye.prototype, t, { allOwnKeys: !0 }), g.extend(r, t, null, { allOwnKeys: !0 }), r.create = function(o) {
    return Oi(et(e, o));
  }, r;
}
const G = Oi(Mt);
G.Axios = Ye;
G.CanceledError = mt;
G.CancelToken = Tn;
G.isCancel = hi;
G.VERSION = xi;
G.toFormData = yr;
G.AxiosError = C;
G.Cancel = G.CanceledError;
G.all = function(t) {
  return Promise.all(t);
};
G.spread = Ll;
G.isAxiosError = Ml;
G.mergeConfig = et;
G.AxiosHeaders = ce;
G.formToJSON = (e) => yi(g.isHTMLForm(e) ? new FormData(e) : e);
G.getAdapter = Si.getAdapter;
G.HttpStatusCode = sn;
G.default = G;
function kl(e, t) {
  return Array.isArray(e) ? e.filter((r) => !t.includes(r)) : Object.keys(e).reduce((r, n) => (t.includes(n) || (r[n] = e[n]), r), {});
}
function Ai(e, t) {
  return Array.isArray(e) ? e.filter((r) => t.includes(r)) : t.reduce((r, n) => (n in e && (r[n] = e[n]), r), {});
}
function jl(e) {
  return Array.isArray(e) ? e.filter((t) => t !== null) : Object.keys(e).reduce((t, r) => (r in e && e[r] !== null && (t[r] = e[r]), t), {});
}
function Bl(e = 3, t = 100) {
  const r = () => ei.page || null;
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
var Ul = function(t) {
  return Wl(t) && !Hl(t);
};
function Wl(e) {
  return !!e && typeof e == "object";
}
function Hl(e) {
  var t = Object.prototype.toString.call(e);
  return t === "[object RegExp]" || t === "[object Date]" || zl(e);
}
var ql = typeof Symbol == "function" && Symbol.for, Vl = ql ? Symbol.for("react.element") : 60103;
function zl(e) {
  return e.$$typeof === Vl;
}
function Gl(e) {
  return Array.isArray(e) ? [] : {};
}
function Dt(e, t) {
  return t.clone !== !1 && t.isMergeableObject(e) ? ut(Gl(e), e, t) : e;
}
function Kl(e, t, r) {
  return e.concat(t).map(function(n) {
    return Dt(n, r);
  });
}
function Jl(e, t) {
  if (!t.customMerge)
    return ut;
  var r = t.customMerge(e);
  return typeof r == "function" ? r : ut;
}
function Yl(e) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter(function(t) {
    return Object.propertyIsEnumerable.call(e, t);
  }) : [];
}
function bo(e) {
  return Object.keys(e).concat(Yl(e));
}
function Ti(e, t) {
  try {
    return t in e;
  } catch {
    return !1;
  }
}
function Xl(e, t) {
  return Ti(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t));
}
function Ql(e, t, r) {
  var n = {};
  return r.isMergeableObject(e) && bo(e).forEach(function(o) {
    n[o] = Dt(e[o], r);
  }), bo(t).forEach(function(o) {
    Xl(e, o) || (Ti(e, o) && r.isMergeableObject(t[o]) ? n[o] = Jl(o, r)(e[o], t[o], r) : n[o] = Dt(t[o], r));
  }), n;
}
function ut(e, t, r) {
  r = r || {}, r.arrayMerge = r.arrayMerge || Kl, r.isMergeableObject = r.isMergeableObject || Ul, r.cloneUnlessOtherwiseSpecified = Dt;
  var n = Array.isArray(t), o = Array.isArray(e), i = n === o;
  return i ? n ? r.arrayMerge(e, t, r) : Ql(e, t, r) : Dt(t, r);
}
ut.all = function(t, r) {
  if (!Array.isArray(t))
    throw new Error("first argument should be an array");
  return t.reduce(function(n, o) {
    return ut(n, o, r);
  }, {});
};
var Zl = ut, eu = Zl;
const tu = /* @__PURE__ */ is(eu);
var ru = Error, nu = EvalError, ou = RangeError, iu = ReferenceError, Ri = SyntaxError, kt = TypeError, au = URIError, su = function() {
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
}, wo = typeof Symbol < "u" && Symbol, lu = su, uu = function() {
  return typeof wo != "function" || typeof Symbol != "function" || typeof wo("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : lu();
}, kr = {
  __proto__: null,
  foo: {}
}, cu = Object, fu = function() {
  return { __proto__: kr }.foo === kr.foo && !(kr instanceof cu);
}, du = "Function.prototype.bind called on incompatible ", pu = Object.prototype.toString, mu = Math.max, yu = "[object Function]", Eo = function(t, r) {
  for (var n = [], o = 0; o < t.length; o += 1)
    n[o] = t[o];
  for (var i = 0; i < r.length; i += 1)
    n[i + t.length] = r[i];
  return n;
}, hu = function(t, r) {
  for (var n = [], o = r, i = 0; o < t.length; o += 1, i += 1)
    n[i] = t[o];
  return n;
}, vu = function(e, t) {
  for (var r = "", n = 0; n < e.length; n += 1)
    r += e[n], n + 1 < e.length && (r += t);
  return r;
}, gu = function(t) {
  var r = this;
  if (typeof r != "function" || pu.apply(r) !== yu)
    throw new TypeError(du + r);
  for (var n = hu(arguments, 1), o, i = function() {
    if (this instanceof o) {
      var u = r.apply(
        this,
        Eo(n, arguments)
      );
      return Object(u) === u ? u : this;
    }
    return r.apply(
      t,
      Eo(n, arguments)
    );
  }, a = mu(0, r.length - n.length), s = [], l = 0; l < a; l++)
    s[l] = "$" + l;
  if (o = Function("binder", "return function (" + vu(s, ",") + "){ return binder.apply(this,arguments); }")(i), r.prototype) {
    var f = function() {
    };
    f.prototype = r.prototype, o.prototype = new f(), f.prototype = null;
  }
  return o;
}, bu = gu, Rn = Function.prototype.bind || bu, wu = Function.prototype.call, Eu = Object.prototype.hasOwnProperty, Su = Rn, xu = Su.call(wu, Eu), N, Ou = ru, Au = nu, Tu = ou, Ru = iu, ct = Ri, lt = kt, Pu = au, Pi = Function, jr = function(e) {
  try {
    return Pi('"use strict"; return (' + e + ").constructor;")();
  } catch {
  }
}, Xe = Object.getOwnPropertyDescriptor;
if (Xe)
  try {
    Xe({}, "");
  } catch {
    Xe = null;
  }
var Br = function() {
  throw new lt();
}, Fu = Xe ? function() {
  try {
    return arguments.callee, Br;
  } catch {
    try {
      return Xe(arguments, "callee").get;
    } catch {
      return Br;
    }
  }
}() : Br, it = uu(), Cu = fu(), ee = Object.getPrototypeOf || (Cu ? function(e) {
  return e.__proto__;
} : null), st = {}, $u = typeof Uint8Array > "u" || !ee ? N : ee(Uint8Array), Qe = {
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
  "%Error%": Ou,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": Au,
  "%Float32Array%": typeof Float32Array > "u" ? N : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? N : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? N : FinalizationRegistry,
  "%Function%": Pi,
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
  "%RangeError%": Tu,
  "%ReferenceError%": Ru,
  "%Reflect%": typeof Reflect > "u" ? N : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? N : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !it || !ee ? N : ee((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? N : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": it && ee ? ee(""[Symbol.iterator]()) : N,
  "%Symbol%": it ? Symbol : N,
  "%SyntaxError%": ct,
  "%ThrowTypeError%": Fu,
  "%TypedArray%": $u,
  "%TypeError%": lt,
  "%Uint8Array%": typeof Uint8Array > "u" ? N : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? N : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? N : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? N : Uint32Array,
  "%URIError%": Pu,
  "%WeakMap%": typeof WeakMap > "u" ? N : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? N : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? N : WeakSet
};
if (ee)
  try {
    null.error;
  } catch (e) {
    var _u = ee(ee(e));
    Qe["%Error.prototype%"] = _u;
  }
var Nu = function e(t) {
  var r;
  if (t === "%AsyncFunction%")
    r = jr("async function () {}");
  else if (t === "%GeneratorFunction%")
    r = jr("function* () {}");
  else if (t === "%AsyncGeneratorFunction%")
    r = jr("async function* () {}");
  else if (t === "%AsyncGenerator%") {
    var n = e("%AsyncGeneratorFunction%");
    n && (r = n.prototype);
  } else if (t === "%AsyncIteratorPrototype%") {
    var o = e("%AsyncGenerator%");
    o && ee && (r = ee(o.prototype));
  }
  return Qe[t] = r, r;
}, So = {
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
}, jt = Rn, nr = xu, Du = jt.call(Function.call, Array.prototype.concat), Iu = jt.call(Function.apply, Array.prototype.splice), xo = jt.call(Function.call, String.prototype.replace), or = jt.call(Function.call, String.prototype.slice), Lu = jt.call(Function.call, RegExp.prototype.exec), Mu = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, ku = /\\(\\)?/g, ju = function(t) {
  var r = or(t, 0, 1), n = or(t, -1);
  if (r === "%" && n !== "%")
    throw new ct("invalid intrinsic syntax, expected closing `%`");
  if (n === "%" && r !== "%")
    throw new ct("invalid intrinsic syntax, expected opening `%`");
  var o = [];
  return xo(t, Mu, function(i, a, s, l) {
    o[o.length] = s ? xo(l, ku, "$1") : a || i;
  }), o;
}, Bu = function(t, r) {
  var n = t, o;
  if (nr(So, n) && (o = So[n], n = "%" + o[0] + "%"), nr(Qe, n)) {
    var i = Qe[n];
    if (i === st && (i = Nu(n)), typeof i > "u" && !r)
      throw new lt("intrinsic " + t + " exists, but is not available. Please file an issue!");
    return {
      alias: o,
      name: n,
      value: i
    };
  }
  throw new ct("intrinsic " + t + " does not exist!");
}, yt = function(t, r) {
  if (typeof t != "string" || t.length === 0)
    throw new lt("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof r != "boolean")
    throw new lt('"allowMissing" argument must be a boolean');
  if (Lu(/^%?[^%]*%?$/, t) === null)
    throw new ct("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var n = ju(t), o = n.length > 0 ? n[0] : "", i = Bu("%" + o + "%", r), a = i.name, s = i.value, l = !1, f = i.alias;
  f && (o = f[0], Iu(n, Du([0, 1], f)));
  for (var u = 1, y = !0; u < n.length; u += 1) {
    var h = n[u], v = or(h, 0, 1), c = or(h, -1);
    if ((v === '"' || v === "'" || v === "`" || c === '"' || c === "'" || c === "`") && v !== c)
      throw new ct("property names with quotes must have matching quotes");
    if ((h === "constructor" || !y) && (l = !0), o += "." + h, a = "%" + o + "%", nr(Qe, a))
      s = Qe[a];
    else if (s != null) {
      if (!(h in s)) {
        if (!r)
          throw new lt("base intrinsic for " + t + " exists, but the property is not available.");
        return;
      }
      if (Xe && u + 1 >= n.length) {
        var p = Xe(s, h);
        y = !!p, y && "get" in p && !("originalValue" in p.get) ? s = p.get : s = s[h];
      } else
        y = nr(s, h), s = s[h];
      y && !l && (Qe[a] = s);
    }
  }
  return s;
}, Fi = { exports: {} }, Ur, Oo;
function Pn() {
  if (Oo) return Ur;
  Oo = 1;
  var e = yt, t = e("%Object.defineProperty%", !0) || !1;
  if (t)
    try {
      t({}, "a", { value: 1 });
    } catch {
      t = !1;
    }
  return Ur = t, Ur;
}
var Uu = yt, Zt = Uu("%Object.getOwnPropertyDescriptor%", !0);
if (Zt)
  try {
    Zt([], "length");
  } catch {
    Zt = null;
  }
var Ci = Zt, Ao = Pn(), Wu = Ri, at = kt, To = Ci, Hu = function(t, r, n) {
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
  var o = arguments.length > 3 ? arguments[3] : null, i = arguments.length > 4 ? arguments[4] : null, a = arguments.length > 5 ? arguments[5] : null, s = arguments.length > 6 ? arguments[6] : !1, l = !!To && To(t, r);
  if (Ao)
    Ao(t, r, {
      configurable: a === null && l ? l.configurable : !a,
      enumerable: o === null && l ? l.enumerable : !o,
      value: n,
      writable: i === null && l ? l.writable : !i
    });
  else if (s || !o && !i && !a)
    t[r] = n;
  else
    throw new Wu("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
}, ln = Pn(), $i = function() {
  return !!ln;
};
$i.hasArrayLengthDefineBug = function() {
  if (!ln)
    return null;
  try {
    return ln([], "length", { value: 1 }).length !== 1;
  } catch {
    return !0;
  }
};
var qu = $i, Vu = yt, Ro = Hu, zu = qu(), Po = Ci, Fo = kt, Gu = Vu("%Math.floor%"), Ku = function(t, r) {
  if (typeof t != "function")
    throw new Fo("`fn` is not a function");
  if (typeof r != "number" || r < 0 || r > 4294967295 || Gu(r) !== r)
    throw new Fo("`length` must be a positive 32-bit integer");
  var n = arguments.length > 2 && !!arguments[2], o = !0, i = !0;
  if ("length" in t && Po) {
    var a = Po(t, "length");
    a && !a.configurable && (o = !1), a && !a.writable && (i = !1);
  }
  return (o || i || !n) && (zu ? Ro(
    /** @type {Parameters<define>[0]} */
    t,
    "length",
    r,
    !0,
    !0
  ) : Ro(
    /** @type {Parameters<define>[0]} */
    t,
    "length",
    r
  )), t;
};
(function(e) {
  var t = Rn, r = yt, n = Ku, o = kt, i = r("%Function.prototype.apply%"), a = r("%Function.prototype.call%"), s = r("%Reflect.apply%", !0) || t.call(a, i), l = Pn(), f = r("%Math.max%");
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
})(Fi);
var Ju = Fi.exports, _i = yt, Ni = Ju, Yu = Ni(_i("String.prototype.indexOf")), Xu = function(t, r) {
  var n = _i(t, !!r);
  return typeof n == "function" && Yu(t, ".prototype.") > -1 ? Ni(n) : n;
};
const Qu = {}, Zu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Qu
}, Symbol.toStringTag, { value: "Module" })), ec = /* @__PURE__ */ as(Zu);
var Fn = typeof Map == "function" && Map.prototype, Wr = Object.getOwnPropertyDescriptor && Fn ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, ir = Fn && Wr && typeof Wr.get == "function" ? Wr.get : null, Co = Fn && Map.prototype.forEach, Cn = typeof Set == "function" && Set.prototype, Hr = Object.getOwnPropertyDescriptor && Cn ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, ar = Cn && Hr && typeof Hr.get == "function" ? Hr.get : null, $o = Cn && Set.prototype.forEach, tc = typeof WeakMap == "function" && WeakMap.prototype, Pt = tc ? WeakMap.prototype.has : null, rc = typeof WeakSet == "function" && WeakSet.prototype, Ft = rc ? WeakSet.prototype.has : null, nc = typeof WeakRef == "function" && WeakRef.prototype, _o = nc ? WeakRef.prototype.deref : null, oc = Boolean.prototype.valueOf, ic = Object.prototype.toString, ac = Function.prototype.toString, sc = String.prototype.match, $n = String.prototype.slice, Me = String.prototype.replace, lc = String.prototype.toUpperCase, No = String.prototype.toLowerCase, Di = RegExp.prototype.test, Do = Array.prototype.concat, Re = Array.prototype.join, uc = Array.prototype.slice, Io = Math.floor, un = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, qr = Object.getOwnPropertySymbols, cn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, ft = typeof Symbol == "function" && typeof Symbol.iterator == "object", ie = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === ft || !0) ? Symbol.toStringTag : null, Ii = Object.prototype.propertyIsEnumerable, Lo = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(e) {
  return e.__proto__;
} : null);
function Mo(e, t) {
  if (e === 1 / 0 || e === -1 / 0 || e !== e || e && e > -1e3 && e < 1e3 || Di.call(/e/, t))
    return t;
  var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof e == "number") {
    var n = e < 0 ? -Io(-e) : Io(e);
    if (n !== e) {
      var o = String(n), i = $n.call(t, o.length + 1);
      return Me.call(o, r, "$&_") + "." + Me.call(Me.call(i, /([0-9]{3})/g, "$&_"), /_$/, "");
    }
  }
  return Me.call(t, r, "$&_");
}
var fn = ec, ko = fn.custom, jo = Mi(ko) ? ko : null, cc = function e(t, r, n, o) {
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
    return ji(t, i);
  if (typeof t == "number") {
    if (t === 0)
      return 1 / 0 / t > 0 ? "0" : "-0";
    var l = String(t);
    return s ? Mo(t, l) : l;
  }
  if (typeof t == "bigint") {
    var f = String(t) + "n";
    return s ? Mo(t, f) : f;
  }
  var u = typeof i.depth > "u" ? 5 : i.depth;
  if (typeof n > "u" && (n = 0), n >= u && u > 0 && typeof t == "object")
    return dn(t) ? "[Array]" : "[Object]";
  var y = Pc(i, n);
  if (typeof o > "u")
    o = [];
  else if (ki(o, t) >= 0)
    return "[Circular]";
  function h(R, M, K) {
    if (M && (o = uc.call(o), o.push(M)), K) {
      var pe = {
        depth: i.depth
      };
      return Ie(i, "quoteStyle") && (pe.quoteStyle = i.quoteStyle), e(R, pe, n + 1, o);
    }
    return e(R, i, n + 1, o);
  }
  if (typeof t == "function" && !Bo(t)) {
    var v = bc(t), c = Gt(t, h);
    return "[Function" + (v ? ": " + v : " (anonymous)") + "]" + (c.length > 0 ? " { " + Re.call(c, ", ") + " }" : "");
  }
  if (Mi(t)) {
    var p = ft ? Me.call(String(t), /^(Symbol\(.*\))_[^)]*$/, "$1") : cn.call(t);
    return typeof t == "object" && !ft ? Ot(p) : p;
  }
  if (Ac(t)) {
    for (var m = "<" + No.call(String(t.nodeName)), b = t.attributes || [], E = 0; E < b.length; E++)
      m += " " + b[E].name + "=" + Li(fc(b[E].value), "double", i);
    return m += ">", t.childNodes && t.childNodes.length && (m += "..."), m += "</" + No.call(String(t.nodeName)) + ">", m;
  }
  if (dn(t)) {
    if (t.length === 0)
      return "[]";
    var S = Gt(t, h);
    return y && !Rc(S) ? "[" + pn(S, y) + "]" : "[ " + Re.call(S, ", ") + " ]";
  }
  if (pc(t)) {
    var x = Gt(t, h);
    return !("cause" in Error.prototype) && "cause" in t && !Ii.call(t, "cause") ? "{ [" + String(t) + "] " + Re.call(Do.call("[cause]: " + h(t.cause), x), ", ") + " }" : x.length === 0 ? "[" + String(t) + "]" : "{ [" + String(t) + "] " + Re.call(x, ", ") + " }";
  }
  if (typeof t == "object" && a) {
    if (jo && typeof t[jo] == "function" && fn)
      return fn(t, { depth: u - n });
    if (a !== "symbol" && typeof t.inspect == "function")
      return t.inspect();
  }
  if (wc(t)) {
    var A = [];
    return Co && Co.call(t, function(R, M) {
      A.push(h(M, t, !0) + " => " + h(R, t));
    }), Uo("Map", ir.call(t), A, y);
  }
  if (xc(t)) {
    var T = [];
    return $o && $o.call(t, function(R) {
      T.push(h(R, t));
    }), Uo("Set", ar.call(t), T, y);
  }
  if (Ec(t))
    return Vr("WeakMap");
  if (Oc(t))
    return Vr("WeakSet");
  if (Sc(t))
    return Vr("WeakRef");
  if (yc(t))
    return Ot(h(Number(t)));
  if (vc(t))
    return Ot(h(un.call(t)));
  if (hc(t))
    return Ot(oc.call(t));
  if (mc(t))
    return Ot(h(String(t)));
  if (typeof window < "u" && t === window)
    return "{ [object Window] }";
  if (typeof globalThis < "u" && t === globalThis || typeof Qr < "u" && t === Qr)
    return "{ [object globalThis] }";
  if (!dc(t) && !Bo(t)) {
    var $ = Gt(t, h), j = Lo ? Lo(t) === Object.prototype : t instanceof Object || t.constructor === Object, H = t instanceof Object ? "" : "null prototype", L = !j && ie && Object(t) === t && ie in t ? $n.call(Be(t), 8, -1) : H ? "Object" : "", Y = j || typeof t.constructor != "function" ? "" : t.constructor.name ? t.constructor.name + " " : "", Z = Y + (L || H ? "[" + Re.call(Do.call([], L || [], H || []), ": ") + "] " : "");
    return $.length === 0 ? Z + "{}" : y ? Z + "{" + pn($, y) + "}" : Z + "{ " + Re.call($, ", ") + " }";
  }
  return String(t);
};
function Li(e, t, r) {
  var n = (r.quoteStyle || t) === "double" ? '"' : "'";
  return n + e + n;
}
function fc(e) {
  return Me.call(String(e), /"/g, "&quot;");
}
function dn(e) {
  return Be(e) === "[object Array]" && (!ie || !(typeof e == "object" && ie in e));
}
function dc(e) {
  return Be(e) === "[object Date]" && (!ie || !(typeof e == "object" && ie in e));
}
function Bo(e) {
  return Be(e) === "[object RegExp]" && (!ie || !(typeof e == "object" && ie in e));
}
function pc(e) {
  return Be(e) === "[object Error]" && (!ie || !(typeof e == "object" && ie in e));
}
function mc(e) {
  return Be(e) === "[object String]" && (!ie || !(typeof e == "object" && ie in e));
}
function yc(e) {
  return Be(e) === "[object Number]" && (!ie || !(typeof e == "object" && ie in e));
}
function hc(e) {
  return Be(e) === "[object Boolean]" && (!ie || !(typeof e == "object" && ie in e));
}
function Mi(e) {
  if (ft)
    return e && typeof e == "object" && e instanceof Symbol;
  if (typeof e == "symbol")
    return !0;
  if (!e || typeof e != "object" || !cn)
    return !1;
  try {
    return cn.call(e), !0;
  } catch {
  }
  return !1;
}
function vc(e) {
  if (!e || typeof e != "object" || !un)
    return !1;
  try {
    return un.call(e), !0;
  } catch {
  }
  return !1;
}
var gc = Object.prototype.hasOwnProperty || function(e) {
  return e in this;
};
function Ie(e, t) {
  return gc.call(e, t);
}
function Be(e) {
  return ic.call(e);
}
function bc(e) {
  if (e.name)
    return e.name;
  var t = sc.call(ac.call(e), /^function\s*([\w$]+)/);
  return t ? t[1] : null;
}
function ki(e, t) {
  if (e.indexOf)
    return e.indexOf(t);
  for (var r = 0, n = e.length; r < n; r++)
    if (e[r] === t)
      return r;
  return -1;
}
function wc(e) {
  if (!ir || !e || typeof e != "object")
    return !1;
  try {
    ir.call(e);
    try {
      ar.call(e);
    } catch {
      return !0;
    }
    return e instanceof Map;
  } catch {
  }
  return !1;
}
function Ec(e) {
  if (!Pt || !e || typeof e != "object")
    return !1;
  try {
    Pt.call(e, Pt);
    try {
      Ft.call(e, Ft);
    } catch {
      return !0;
    }
    return e instanceof WeakMap;
  } catch {
  }
  return !1;
}
function Sc(e) {
  if (!_o || !e || typeof e != "object")
    return !1;
  try {
    return _o.call(e), !0;
  } catch {
  }
  return !1;
}
function xc(e) {
  if (!ar || !e || typeof e != "object")
    return !1;
  try {
    ar.call(e);
    try {
      ir.call(e);
    } catch {
      return !0;
    }
    return e instanceof Set;
  } catch {
  }
  return !1;
}
function Oc(e) {
  if (!Ft || !e || typeof e != "object")
    return !1;
  try {
    Ft.call(e, Ft);
    try {
      Pt.call(e, Pt);
    } catch {
      return !0;
    }
    return e instanceof WeakSet;
  } catch {
  }
  return !1;
}
function Ac(e) {
  return !e || typeof e != "object" ? !1 : typeof HTMLElement < "u" && e instanceof HTMLElement ? !0 : typeof e.nodeName == "string" && typeof e.getAttribute == "function";
}
function ji(e, t) {
  if (e.length > t.maxStringLength) {
    var r = e.length - t.maxStringLength, n = "... " + r + " more character" + (r > 1 ? "s" : "");
    return ji($n.call(e, 0, t.maxStringLength), t) + n;
  }
  var o = Me.call(Me.call(e, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, Tc);
  return Li(o, "single", t);
}
function Tc(e) {
  var t = e.charCodeAt(0), r = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[t];
  return r ? "\\" + r : "\\x" + (t < 16 ? "0" : "") + lc.call(t.toString(16));
}
function Ot(e) {
  return "Object(" + e + ")";
}
function Vr(e) {
  return e + " { ? }";
}
function Uo(e, t, r, n) {
  var o = n ? pn(r, n) : Re.call(r, ", ");
  return e + " (" + t + ") {" + o + "}";
}
function Rc(e) {
  for (var t = 0; t < e.length; t++)
    if (ki(e[t], `
`) >= 0)
      return !1;
  return !0;
}
function Pc(e, t) {
  var r;
  if (e.indent === "	")
    r = "	";
  else if (typeof e.indent == "number" && e.indent > 0)
    r = Re.call(Array(e.indent + 1), " ");
  else
    return null;
  return {
    base: r,
    prev: Re.call(Array(t + 1), r)
  };
}
function pn(e, t) {
  if (e.length === 0)
    return "";
  var r = `
` + t.prev + t.base;
  return r + Re.call(e, "," + r) + `
` + t.prev;
}
function Gt(e, t) {
  var r = dn(e), n = [];
  if (r) {
    n.length = e.length;
    for (var o = 0; o < e.length; o++)
      n[o] = Ie(e, o) ? t(e[o], e) : "";
  }
  var i = typeof qr == "function" ? qr(e) : [], a;
  if (ft) {
    a = {};
    for (var s = 0; s < i.length; s++)
      a["$" + i[s]] = i[s];
  }
  for (var l in e)
    Ie(e, l) && (r && String(Number(l)) === l && l < e.length || ft && a["$" + l] instanceof Symbol || (Di.call(/[^\w$]/, l) ? n.push(t(l, e) + ": " + t(e[l], e)) : n.push(l + ": " + t(e[l], e))));
  if (typeof qr == "function")
    for (var f = 0; f < i.length; f++)
      Ii.call(e, i[f]) && n.push("[" + t(i[f]) + "]: " + t(e[i[f]], e));
  return n;
}
var Bi = yt, ht = Xu, Fc = cc, Cc = kt, Kt = Bi("%WeakMap%", !0), Jt = Bi("%Map%", !0), $c = ht("WeakMap.prototype.get", !0), _c = ht("WeakMap.prototype.set", !0), Nc = ht("WeakMap.prototype.has", !0), Dc = ht("Map.prototype.get", !0), Ic = ht("Map.prototype.set", !0), Lc = ht("Map.prototype.has", !0), _n = function(e, t) {
  for (var r = e, n; (n = r.next) !== null; r = n)
    if (n.key === t)
      return r.next = n.next, n.next = /** @type {NonNullable<typeof list.next>} */
      e.next, e.next = n, n;
}, Mc = function(e, t) {
  var r = _n(e, t);
  return r && r.value;
}, kc = function(e, t, r) {
  var n = _n(e, t);
  n ? n.value = r : e.next = /** @type {import('.').ListNode<typeof value>} */
  {
    // eslint-disable-line no-param-reassign, no-extra-parens
    key: t,
    next: e.next,
    value: r
  };
}, jc = function(e, t) {
  return !!_n(e, t);
}, Bc = function() {
  var t, r, n, o = {
    assert: function(i) {
      if (!o.has(i))
        throw new Cc("Side channel does not contain " + Fc(i));
    },
    get: function(i) {
      if (Kt && i && (typeof i == "object" || typeof i == "function")) {
        if (t)
          return $c(t, i);
      } else if (Jt) {
        if (r)
          return Dc(r, i);
      } else if (n)
        return Mc(n, i);
    },
    has: function(i) {
      if (Kt && i && (typeof i == "object" || typeof i == "function")) {
        if (t)
          return Nc(t, i);
      } else if (Jt) {
        if (r)
          return Lc(r, i);
      } else if (n)
        return jc(n, i);
      return !1;
    },
    set: function(i, a) {
      Kt && i && (typeof i == "object" || typeof i == "function") ? (t || (t = new Kt()), _c(t, i, a)) : Jt ? (r || (r = new Jt()), Ic(r, i, a)) : (n || (n = { key: {}, next: null }), kc(n, i, a));
    }
  };
  return o;
}, Uc = String.prototype.replace, Wc = /%20/g, zr = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
}, Nn = {
  default: zr.RFC3986,
  formatters: {
    RFC1738: function(e) {
      return Uc.call(e, Wc, "+");
    },
    RFC3986: function(e) {
      return String(e);
    }
  },
  RFC1738: zr.RFC1738,
  RFC3986: zr.RFC3986
}, Hc = Nn, Gr = Object.prototype.hasOwnProperty, ze = Array.isArray, Ae = function() {
  for (var e = [], t = 0; t < 256; ++t)
    e.push("%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase());
  return e;
}(), qc = function(t) {
  for (; t.length > 1; ) {
    var r = t.pop(), n = r.obj[r.prop];
    if (ze(n)) {
      for (var o = [], i = 0; i < n.length; ++i)
        typeof n[i] < "u" && o.push(n[i]);
      r.obj[r.prop] = o;
    }
  }
}, Ui = function(t, r) {
  for (var n = r && r.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, o = 0; o < t.length; ++o)
    typeof t[o] < "u" && (n[o] = t[o]);
  return n;
}, Vc = function e(t, r, n) {
  if (!r)
    return t;
  if (typeof r != "object") {
    if (ze(t))
      t.push(r);
    else if (t && typeof t == "object")
      (n && (n.plainObjects || n.allowPrototypes) || !Gr.call(Object.prototype, r)) && (t[r] = !0);
    else
      return [t, r];
    return t;
  }
  if (!t || typeof t != "object")
    return [t].concat(r);
  var o = t;
  return ze(t) && !ze(r) && (o = Ui(t, n)), ze(t) && ze(r) ? (r.forEach(function(i, a) {
    if (Gr.call(t, a)) {
      var s = t[a];
      s && typeof s == "object" && i && typeof i == "object" ? t[a] = e(s, i, n) : t.push(i);
    } else
      t[a] = i;
  }), t) : Object.keys(r).reduce(function(i, a) {
    var s = r[a];
    return Gr.call(i, a) ? i[a] = e(i[a], s, n) : i[a] = s, i;
  }, o);
}, zc = function(t, r) {
  return Object.keys(r).reduce(function(n, o) {
    return n[o] = r[o], n;
  }, t);
}, Gc = function(e, t, r) {
  var n = e.replace(/\+/g, " ");
  if (r === "iso-8859-1")
    return n.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n);
  } catch {
    return n;
  }
}, Kr = 1024, Kc = function(t, r, n, o, i) {
  if (t.length === 0)
    return t;
  var a = t;
  if (typeof t == "symbol" ? a = Symbol.prototype.toString.call(t) : typeof t != "string" && (a = String(t)), n === "iso-8859-1")
    return escape(a).replace(/%u[0-9a-f]{4}/gi, function(v) {
      return "%26%23" + parseInt(v.slice(2), 16) + "%3B";
    });
  for (var s = "", l = 0; l < a.length; l += Kr) {
    for (var f = a.length >= Kr ? a.slice(l, l + Kr) : a, u = [], y = 0; y < f.length; ++y) {
      var h = f.charCodeAt(y);
      if (h === 45 || h === 46 || h === 95 || h === 126 || h >= 48 && h <= 57 || h >= 65 && h <= 90 || h >= 97 && h <= 122 || i === Hc.RFC1738 && (h === 40 || h === 41)) {
        u[u.length] = f.charAt(y);
        continue;
      }
      if (h < 128) {
        u[u.length] = Ae[h];
        continue;
      }
      if (h < 2048) {
        u[u.length] = Ae[192 | h >> 6] + Ae[128 | h & 63];
        continue;
      }
      if (h < 55296 || h >= 57344) {
        u[u.length] = Ae[224 | h >> 12] + Ae[128 | h >> 6 & 63] + Ae[128 | h & 63];
        continue;
      }
      y += 1, h = 65536 + ((h & 1023) << 10 | f.charCodeAt(y) & 1023), u[u.length] = Ae[240 | h >> 18] + Ae[128 | h >> 12 & 63] + Ae[128 | h >> 6 & 63] + Ae[128 | h & 63];
    }
    s += u.join("");
  }
  return s;
}, Jc = function(t) {
  for (var r = [{ obj: { o: t }, prop: "o" }], n = [], o = 0; o < r.length; ++o)
    for (var i = r[o], a = i.obj[i.prop], s = Object.keys(a), l = 0; l < s.length; ++l) {
      var f = s[l], u = a[f];
      typeof u == "object" && u !== null && n.indexOf(u) === -1 && (r.push({ obj: a, prop: f }), n.push(u));
    }
  return qc(r), t;
}, Yc = function(t) {
  return Object.prototype.toString.call(t) === "[object RegExp]";
}, Xc = function(t) {
  return !t || typeof t != "object" ? !1 : !!(t.constructor && t.constructor.isBuffer && t.constructor.isBuffer(t));
}, Qc = function(t, r) {
  return [].concat(t, r);
}, Zc = function(t, r) {
  if (ze(t)) {
    for (var n = [], o = 0; o < t.length; o += 1)
      n.push(r(t[o]));
    return n;
  }
  return r(t);
}, Wi = {
  arrayToObject: Ui,
  assign: zc,
  combine: Qc,
  compact: Jc,
  decode: Gc,
  encode: Kc,
  isBuffer: Xc,
  isRegExp: Yc,
  maybeMap: Zc,
  merge: Vc
}, Hi = Bc, er = Wi, Ct = Nn, ef = Object.prototype.hasOwnProperty, qi = {
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
}, Te = Array.isArray, tf = Array.prototype.push, Vi = function(e, t) {
  tf.apply(e, Te(t) ? t : [t]);
}, rf = Date.prototype.toISOString, Wo = Ct.default, X = {
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
  format: Wo,
  formatter: Ct.formatters[Wo],
  // deprecated
  indices: !1,
  serializeDate: function(t) {
    return rf.call(t);
  },
  skipNulls: !1,
  strictNullHandling: !1
}, nf = function(t) {
  return typeof t == "string" || typeof t == "number" || typeof t == "boolean" || typeof t == "symbol" || typeof t == "bigint";
}, Jr = {}, of = function e(t, r, n, o, i, a, s, l, f, u, y, h, v, c, p, m, b, E) {
  for (var S = t, x = E, A = 0, T = !1; (x = x.get(Jr)) !== void 0 && !T; ) {
    var $ = x.get(t);
    if (A += 1, typeof $ < "u") {
      if ($ === A)
        throw new RangeError("Cyclic object value");
      T = !0;
    }
    typeof x.get(Jr) > "u" && (A = 0);
  }
  if (typeof u == "function" ? S = u(r, S) : S instanceof Date ? S = v(S) : n === "comma" && Te(S) && (S = er.maybeMap(S, function(W) {
    return W instanceof Date ? v(W) : W;
  })), S === null) {
    if (a)
      return f && !m ? f(r, X.encoder, b, "key", c) : r;
    S = "";
  }
  if (nf(S) || er.isBuffer(S)) {
    if (f) {
      var j = m ? r : f(r, X.encoder, b, "key", c);
      return [p(j) + "=" + p(f(S, X.encoder, b, "value", c))];
    }
    return [p(r) + "=" + p(String(S))];
  }
  var H = [];
  if (typeof S > "u")
    return H;
  var L;
  if (n === "comma" && Te(S))
    m && f && (S = er.maybeMap(S, f)), L = [{ value: S.length > 0 ? S.join(",") || null : void 0 }];
  else if (Te(u))
    L = u;
  else {
    var Y = Object.keys(S);
    L = y ? Y.sort(y) : Y;
  }
  var Z = l ? r.replace(/\./g, "%2E") : r, R = o && Te(S) && S.length === 1 ? Z + "[]" : Z;
  if (i && Te(S) && S.length === 0)
    return R + "[]";
  for (var M = 0; M < L.length; ++M) {
    var K = L[M], pe = typeof K == "object" && typeof K.value < "u" ? K.value : S[K];
    if (!(s && pe === null)) {
      var ge = h && l ? K.replace(/\./g, "%2E") : K, Se = Te(S) ? typeof n == "function" ? n(R, ge) : R : R + (h ? "." + ge : "[" + ge + "]");
      E.set(t, A);
      var re = Hi();
      re.set(Jr, E), Vi(H, e(
        pe,
        Se,
        n,
        o,
        i,
        a,
        s,
        l,
        n === "comma" && m && Te(S) ? null : f,
        u,
        y,
        h,
        v,
        c,
        p,
        m,
        b,
        re
      ));
    }
  }
  return H;
}, af = function(t) {
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
  var n = Ct.default;
  if (typeof t.format < "u") {
    if (!ef.call(Ct.formatters, t.format))
      throw new TypeError("Unknown format option provided.");
    n = t.format;
  }
  var o = Ct.formatters[n], i = X.filter;
  (typeof t.filter == "function" || Te(t.filter)) && (i = t.filter);
  var a;
  if (t.arrayFormat in qi ? a = t.arrayFormat : "indices" in t ? a = t.indices ? "indices" : "repeat" : a = X.arrayFormat, "commaRoundTrip" in t && typeof t.commaRoundTrip != "boolean")
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
}, sf = function(e, t) {
  var r = e, n = af(t), o, i;
  typeof n.filter == "function" ? (i = n.filter, r = i("", r)) : Te(n.filter) && (i = n.filter, o = i);
  var a = [];
  if (typeof r != "object" || r === null)
    return "";
  var s = qi[n.arrayFormat], l = s === "comma" && n.commaRoundTrip;
  o || (o = Object.keys(r)), n.sort && o.sort(n.sort);
  for (var f = Hi(), u = 0; u < o.length; ++u) {
    var y = o[u];
    n.skipNulls && r[y] === null || Vi(a, of(
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
}, dt = Wi, mn = Object.prototype.hasOwnProperty, lf = Array.isArray, V = {
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
}, uf = function(e) {
  return e.replace(/&#(\d+);/g, function(t, r) {
    return String.fromCharCode(parseInt(r, 10));
  });
}, zi = function(e, t) {
  return e && typeof e == "string" && t.comma && e.indexOf(",") > -1 ? e.split(",") : e;
}, cf = "utf8=%26%2310003%3B", ff = "utf8=%E2%9C%93", df = function(t, r) {
  var n = { __proto__: null }, o = r.ignoreQueryPrefix ? t.replace(/^\?/, "") : t;
  o = o.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  var i = r.parameterLimit === 1 / 0 ? void 0 : r.parameterLimit, a = o.split(r.delimiter, i), s = -1, l, f = r.charset;
  if (r.charsetSentinel)
    for (l = 0; l < a.length; ++l)
      a[l].indexOf("utf8=") === 0 && (a[l] === ff ? f = "utf-8" : a[l] === cf && (f = "iso-8859-1"), s = l, l = a.length);
  for (l = 0; l < a.length; ++l)
    if (l !== s) {
      var u = a[l], y = u.indexOf("]="), h = y === -1 ? u.indexOf("=") : y + 1, v, c;
      h === -1 ? (v = r.decoder(u, V.decoder, f, "key"), c = r.strictNullHandling ? null : "") : (v = r.decoder(u.slice(0, h), V.decoder, f, "key"), c = dt.maybeMap(
        zi(u.slice(h + 1), r),
        function(m) {
          return r.decoder(m, V.decoder, f, "value");
        }
      )), c && r.interpretNumericEntities && f === "iso-8859-1" && (c = uf(c)), u.indexOf("[]=") > -1 && (c = lf(c) ? [c] : c);
      var p = mn.call(n, v);
      p && r.duplicates === "combine" ? n[v] = dt.combine(n[v], c) : (!p || r.duplicates === "last") && (n[v] = c);
    }
  return n;
}, pf = function(e, t, r, n) {
  for (var o = n ? t : zi(t, r), i = e.length - 1; i >= 0; --i) {
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
}, mf = function(t, r, n, o) {
  if (t) {
    var i = n.allowDots ? t.replace(/\.([^.[]+)/g, "[$1]") : t, a = /(\[[^[\]]*])/, s = /(\[[^[\]]*])/g, l = n.depth > 0 && a.exec(i), f = l ? i.slice(0, l.index) : i, u = [];
    if (f) {
      if (!n.plainObjects && mn.call(Object.prototype, f) && !n.allowPrototypes)
        return;
      u.push(f);
    }
    for (var y = 0; n.depth > 0 && (l = s.exec(i)) !== null && y < n.depth; ) {
      if (y += 1, !n.plainObjects && mn.call(Object.prototype, l[1].slice(1, -1)) && !n.allowPrototypes)
        return;
      u.push(l[1]);
    }
    if (l) {
      if (n.strictDepth === !0)
        throw new RangeError("Input depth exceeded depth option of " + n.depth + " and strictDepth is true");
      u.push("[" + i.slice(l.index) + "]");
    }
    return pf(u, r, n, o);
  }
}, yf = function(t) {
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
}, hf = function(e, t) {
  var r = yf(t);
  if (e === "" || e === null || typeof e > "u")
    return r.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var n = typeof e == "string" ? df(e, r) : e, o = r.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, i = Object.keys(n), a = 0; a < i.length; ++a) {
    var s = i[a], l = mf(s, n[s], r, typeof e == "string");
    o = dt.merge(o, l, r);
  }
  return r.allowSparse === !0 ? o : dt.compact(o);
}, vf = sf, gf = hf, bf = Nn, Ho = {
  formats: bf,
  parse: gf,
  stringify: vf
}, wf = { exports: {} };
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
})(wf);
function Ef(e, t, r, n = "brackets") {
  let o = /^https?:\/\//.test(t.toString()), i = o || t.toString().startsWith("/"), a = !i && !t.toString().startsWith("#") && !t.toString().startsWith("?"), s = t.toString().includes("?") || e === "get" && Object.keys(r).length, l = t.toString().includes("#"), f = new URL(t.toString(), "http://localhost");
  return e === "get" && Object.keys(r).length && (f.search = Ho.stringify(tu(Ho.parse(f.search, { ignoreQueryPrefix: !0 }), r), { encodeValuesOnly: !0, arrayFormat: n }), r = {}), [[o ? `${f.protocol}//${f.host}` : "", i ? f.pathname : "", a ? f.pathname.substring(1) : "", s ? f.search : "", l ? f.hash : ""].join(""), r];
}
const vr = he(null);
vr.displayName = "ModalStackContext";
const hp = ({ children: e }) => {
  const [t, r] = Q([]), [n, o] = Q({});
  class i {
    constructor(c, p, m, b, E) {
      Oe(this, "updateStack", (c) => {
        r((p) => {
          const m = c([...p]);
          return m.forEach((b, E) => {
            m[E].index = E, m[E].onTopOfStack = E === m.length - 1;
          }), m;
        });
      });
      Oe(this, "setOpen", (c) => {
        c ? this.open = !0 : this.close();
      });
      Oe(this, "close", () => {
        this.updateStack(
          (c) => c.map((p) => {
            var m;
            return p.id === this.id && (Object.keys(p.listeners).forEach((b) => {
              p.off(b);
            }), p.open = !1, (m = p.onCloseCallback) == null || m.call(p)), p;
          })
        );
      });
      Oe(this, "afterLeave", () => {
        this.open || this.updateStack(
          (c) => c.filter((p) => {
            var m;
            return p.id !== this.id ? !0 : ((m = p.afterLeaveCallback) == null || m.call(p), !1);
          })
        );
      });
      Oe(this, "on", (c, p) => {
        this.listeners[c] = this.listeners[c] ?? [], this.listeners[c].push(p);
      });
      Oe(this, "off", (c, p) => {
        var m;
        p ? this.listeners[c] = ((m = this.listeners[c]) == null ? void 0 : m.filter((b) => b !== p)) ?? [] : delete this.listeners[c];
      });
      Oe(this, "emit", (c, ...p) => {
        var m;
        return console.log("Emitting", c, "with args", p), (m = this.listeners[c]) == null || m.forEach((b) => b(...p)), "OK";
      });
      Oe(this, "registerEventListenersFromProps", (c) => {
        const p = [];
        return Object.keys(c).filter((m) => m.startsWith("on")).forEach((m) => {
          const b = m.replace(/^on/, "").replace(/^./, (E) => E.toLowerCase()).replace(/([A-Z])/g, "-$1").toLowerCase();
          this.on(b, c[m]), p.push(() => this.off(b, c[m]));
        }), () => p.forEach((m) => m());
      });
      Oe(this, "reload", (c = {}) => {
        let p = Object.keys(this.response.props);
        c.only && (p = Ai(p, c.only)), c.except && (p = kl(p, c.except)), G.get(this.response.url, {
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
    const [$, j] = Ef(c, v || "", p, x);
    Bl().then((H) => {
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
      }).then((L) => {
        ei.resolveComponent(L.data.component).then((Y) => {
          A(a(Y, L.data, b, E, S));
        });
      }).catch((L) => {
        T(L);
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
  return /* @__PURE__ */ D.jsx(vr.Provider, { value: h, children: e });
}, Dn = () => {
  const e = fe(vr);
  if (e === null)
    throw new Error("useModalStack must be used within a ModalStackProvider");
  return e;
}, qo = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], vp = ({ children: e }) => {
  const t = fe(vr).stack;
  return /* @__PURE__ */ D.jsxs(D.Fragment, { children: [
    e,
    t.length > 0 && /* @__PURE__ */ D.jsx(Gi, { index: 0 })
  ] });
}, In = F.createContext(null);
In.displayName = "ModalIndexContext";
const Sf = () => {
  const e = F.useContext(In);
  if (e === void 0)
    throw new Error("useModalIndex must be used within a ModalIndexProvider");
  return e;
}, Gi = ({ index: e }) => {
  const { stack: t } = Dn(), r = t[e];
  return !r || !r.component ? null : /* @__PURE__ */ D.jsx(In.Provider, { value: e, children: /* @__PURE__ */ D.jsx(
    r.component,
    {
      ...r.componentProps,
      onModalEvent: (...n) => r.emit(...n)
    }
  ) });
}, Ki = En(({ name: e, children: t, ...r }, n) => {
  const o = Sf(), { stack: i, registerLocalModal: a, removeLocalModal: s } = Dn(), [l, f] = Q(null), u = ne(() => e ? l : i[o]), y = ne(() => (u == null ? void 0 : u.modalProps.slideover) ?? r.slideover ?? os("type") === "slideover", [r.slideover]), h = ne(
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
  );
  return oe(() => {
    if (e) {
      let v = null;
      return a(e, (c) => {
        v = c.registerEventListenersFromProps(r), f(c);
      }), () => {
        v == null || v(), v = null, s(e);
      };
    }
    return u.registerEventListenersFromProps(r);
  }, [e]), Zo(
    n,
    () => ({
      afterLeave: () => u.afterLeave(),
      close: () => u.close(),
      emit: (...v) => u.emit(...v),
      getChildModal: () => u.getChildModal(),
      getParentModal: () => u.getParentModal(),
      index: u == null ? void 0 : u.index,
      isOpen: u == null ? void 0 : u.open,
      modalContext: u,
      modalProps: h,
      reload: () => u.reload(),
      setOpen: () => u.setOpen()
    }),
    [u]
  ), u && /* @__PURE__ */ D.jsxs(D.Fragment, { children: [
    typeof t == "function" ? t({
      afterLeave: u.afterLeave,
      close: u.close,
      emit: u.emit,
      getChildModal: u.getChildModal,
      getParentModal: u.getParentModal,
      index: u.index,
      isOpen: u.open,
      modalContext: u,
      modalProps: h,
      reload: u.reload,
      setOpen: u.setOpen
    }) : t,
    i[u.index + 1] && /* @__PURE__ */ D.jsx(Gi, { index: u.index + 1 })
  ] });
});
Ki.displayName = "HeadlessModal";
function Ji(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (r = Ji(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function sr() {
  for (var e, t, r = 0, n = "", o = arguments.length; r < o; r++) (e = arguments[r]) && (t = Ji(e)) && (n && (n += " "), n += t);
  return n;
}
var xf = Object.defineProperty, Of = (e, t, r) => t in e ? xf(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Yr = (e, t, r) => (Of(e, typeof t != "symbol" ? t + "" : t, r), r);
let Af = class {
  constructor() {
    Yr(this, "current", this.detect()), Yr(this, "handoffState", "pending"), Yr(this, "currentId", 0);
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
}, Ze = new Af();
function gr(e) {
  return Ze.isServer ? null : e instanceof Node ? e.ownerDocument : e != null && e.hasOwnProperty("current") && e.current instanceof Node ? e.current.ownerDocument : document;
}
function br(e) {
  typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch((t) => setTimeout(() => {
    throw t;
  }));
}
function Ue() {
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
    return br(() => {
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
    let n = Ue();
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
function Ln() {
  let [e] = Q(Ue);
  return oe(() => () => e.dispose(), [e]), e;
}
let se = (e, t) => {
  Ze.isServer ? oe(e, t) : Ja(e, t);
};
function tt(e) {
  let t = U(e);
  return se(() => {
    t.current = e;
  }, [e]), t;
}
let q = function(e) {
  let t = tt(e);
  return F.useCallback((...r) => t.current(...r), [t]);
}, Tf = he(void 0);
function Rf() {
  return fe(Tf);
}
function yn(...e) {
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
var lr = ((e) => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(lr || {}), ke = ((e) => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(ke || {});
function ve({ ourProps: e, theirProps: t, slot: r, defaultTag: n, features: o, visible: i = !0, name: a, mergeRefs: s }) {
  s = s ?? Pf;
  let l = Yi(t, e);
  if (i) return Yt(l, r, n, a, s);
  let f = o ?? 0;
  if (f & 2) {
    let { static: u = !1, ...y } = l;
    if (u) return Yt(y, r, n, a, s);
  }
  if (f & 1) {
    let { unmount: u = !0, ...y } = l;
    return je(u ? 0 : 1, { 0() {
      return null;
    }, 1() {
      return Yt({ ...y, hidden: !0, style: { display: "none" } }, r, n, a, s);
    } });
  }
  return Yt(l, r, n, a, s);
}
function Yt(e, t = {}, r, n, o) {
  let { as: i = r, children: a, refName: s = "ref", ...l } = Xr(e, ["unmount", "static"]), f = e.ref !== void 0 ? { [s]: e.ref } : {}, u = typeof a == "function" ? a(t) : a;
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
  if (i === we && (Object.keys(Ve(l)).length > 0 || Object.keys(Ve(y)).length > 0)) if (!Ya(u) || Array.isArray(u) && u.length > 1) {
    if (Object.keys(Ve(l)).length > 0) throw new Error(['Passing props on "Fragment"!', "", `The current component <${n} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(Ve(l)).concat(Object.keys(Ve(y))).map((h) => `  - ${h}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((h) => `  - ${h}`).join(`
`)].join(`
`));
  } else {
    let h = u.props, v = h == null ? void 0 : h.className, c = typeof v == "function" ? (...b) => yn(v(...b), l.className) : yn(v, l.className), p = c ? { className: c } : {}, m = Yi(u.props, Ve(Xr(l, ["ref"])));
    for (let b in y) b in m && delete y[b];
    return Xa(u, Object.assign({}, m, y, f, { ref: o(u.ref, f.ref) }, p));
  }
  return Qa(i, Object.assign({}, Xr(l, ["ref"]), i !== we && f, i !== we && y), u);
}
function Pf(...e) {
  return e.every((t) => t == null) ? void 0 : (t) => {
    for (let r of e) r != null && (typeof r == "function" ? r(t) : r.current = t);
  };
}
function Yi(...e) {
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
  return Object.assign(En(e), { displayName: (t = e.displayName) != null ? t : e.name });
}
function Ve(e) {
  let t = Object.assign({}, e);
  for (let r in t) t[r] === void 0 && delete t[r];
  return t;
}
function Xr(e, t = []) {
  let r = Object.assign({}, e);
  for (let n of t) n in r && delete r[n];
  return r;
}
let Ff = "span";
var ur = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(ur || {});
function Cf(e, t) {
  var r;
  let { features: n = 1, ...o } = e, i = { ref: t, "aria-hidden": (n & 2) === 2 ? !0 : (r = o["aria-hidden"]) != null ? r : void 0, hidden: (n & 4) === 4 ? !0 : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(n & 4) === 4 && (n & 2) !== 2 && { display: "none" } } };
  return ve({ ourProps: i, theirProps: o, slot: {}, defaultTag: Ff, name: "Hidden" });
}
let hn = de(Cf), Xi = Symbol();
function $f(e, t = !0) {
  return Object.assign(e, { [Xi]: t });
}
function Pe(...e) {
  let t = U(e);
  oe(() => {
    t.current = e;
  }, [e]);
  let r = q((n) => {
    for (let o of t.current) o != null && (typeof o == "function" ? o(n) : o.current = n);
  });
  return e.every((n) => n == null || (n == null ? void 0 : n[Xi])) ? void 0 : r;
}
let Mn = he(null);
Mn.displayName = "DescriptionContext";
function Qi() {
  let e = fe(Mn);
  if (e === null) {
    let t = new Error("You used a <Description /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(t, Qi), t;
  }
  return e;
}
function _f() {
  let [e, t] = Q([]);
  return [e.length > 0 ? e.join(" ") : void 0, ne(() => function(r) {
    let n = q((i) => (t((a) => [...a, i]), () => t((a) => {
      let s = a.slice(), l = s.indexOf(i);
      return l !== -1 && s.splice(l, 1), s;
    }))), o = ne(() => ({ register: n, slot: r.slot, name: r.name, props: r.props, value: r.value }), [n, r.slot, r.name, r.props, r.value]);
    return F.createElement(Mn.Provider, { value: o }, r.children);
  }, [t])];
}
let Nf = "p";
function Df(e, t) {
  let r = It(), n = Rf(), { id: o = `headlessui-description-${r}`, ...i } = e, a = Qi(), s = Pe(t);
  se(() => a.register(o), [o, a.register]);
  let l = n || !1, f = ne(() => ({ ...a.slot, disabled: l }), [a.slot, l]), u = { ref: s, ...a.props, id: o };
  return ve({ ourProps: u, theirProps: i, slot: f, defaultTag: Nf, name: a.name || "Description" });
}
let If = de(Df), Lf = Object.assign(If, {});
var Zi = ((e) => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(Zi || {});
let Mf = he(() => {
});
function kf({ value: e, children: t }) {
  return F.createElement(Mf.Provider, { value: e }, t);
}
let jf = class extends Map {
  constructor(t) {
    super(), this.factory = t;
  }
  get(t) {
    let r = super.get(t);
    return r === void 0 && (r = this.factory(t), this.set(t, r)), r;
  }
};
function ea(e, t) {
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
function ta(e) {
  return Za(e.subscribe, e.getSnapshot, e.getSnapshot);
}
let Bf = new jf(() => ea(() => [], { ADD(e) {
  return this.includes(e) ? this : [...this, e];
}, REMOVE(e) {
  let t = this.indexOf(e);
  if (t === -1) return this;
  let r = this.slice();
  return r.splice(t, 1), r;
} }));
function vt(e, t) {
  let r = Bf.get(t), n = It(), o = ta(r);
  if (se(() => {
    if (e) return r.dispatch("ADD", n), () => r.dispatch("REMOVE", n);
  }, [r, e]), !e) return !1;
  let i = o.indexOf(n), a = o.length;
  return i === -1 && (i = a, a += 1), i === a - 1;
}
let vn = /* @__PURE__ */ new Map(), $t = /* @__PURE__ */ new Map();
function Vo(e) {
  var t;
  let r = (t = $t.get(e)) != null ? t : 0;
  return $t.set(e, r + 1), r !== 0 ? () => zo(e) : (vn.set(e, { "aria-hidden": e.getAttribute("aria-hidden"), inert: e.inert }), e.setAttribute("aria-hidden", "true"), e.inert = !0, () => zo(e));
}
function zo(e) {
  var t;
  let r = (t = $t.get(e)) != null ? t : 1;
  if (r === 1 ? $t.delete(e) : $t.set(e, r - 1), r !== 1) return;
  let n = vn.get(e);
  n && (n["aria-hidden"] === null ? e.removeAttribute("aria-hidden") : e.setAttribute("aria-hidden", n["aria-hidden"]), e.inert = n.inert, vn.delete(e));
}
function Uf(e, { allowed: t, disallowed: r } = {}) {
  let n = vt(e, "inert-others");
  se(() => {
    var o, i;
    if (!n) return;
    let a = Ue();
    for (let l of (o = r == null ? void 0 : r()) != null ? o : []) l && a.add(Vo(l));
    let s = (i = t == null ? void 0 : t()) != null ? i : [];
    for (let l of s) {
      if (!l) continue;
      let f = gr(l);
      if (!f) continue;
      let u = l.parentElement;
      for (; u && u !== f.body; ) {
        for (let y of u.children) s.some((h) => y.contains(h)) || a.add(Vo(y));
        u = u.parentElement;
      }
    }
    return a.dispose;
  }, [n, t, r]);
}
function Wf(e, t, r) {
  let n = tt((o) => {
    let i = o.getBoundingClientRect();
    i.x === 0 && i.y === 0 && i.width === 0 && i.height === 0 && r();
  });
  oe(() => {
    if (!e) return;
    let o = t === null ? null : t instanceof HTMLElement ? t : t.current;
    if (!o) return;
    let i = Ue();
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
let cr = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e) => `${e}:not([tabindex='-1'])`).join(","), Hf = ["[data-autofocus]"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var Ce = ((e) => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e[e.AutoFocus = 64] = "AutoFocus", e))(Ce || {}), gn = ((e) => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(gn || {}), qf = ((e) => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(qf || {});
function Vf(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(cr)).sort((t, r) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (r.tabIndex || Number.MAX_SAFE_INTEGER)));
}
function zf(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(Hf)).sort((t, r) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (r.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var ra = ((e) => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(ra || {});
function Gf(e, t = 0) {
  var r;
  return e === ((r = gr(e)) == null ? void 0 : r.body) ? !1 : je(t, { 0() {
    return e.matches(cr);
  }, 1() {
    let n = e;
    for (; n !== null; ) {
      if (n.matches(cr)) return !0;
      n = n.parentElement;
    }
    return !1;
  } });
}
var Kf = ((e) => (e[e.Keyboard = 0] = "Keyboard", e[e.Mouse = 1] = "Mouse", e))(Kf || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (e) => {
  e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (e) => {
  e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
function $e(e) {
  e == null || e.focus({ preventScroll: !0 });
}
let Jf = ["textarea", "input"].join(",");
function Yf(e) {
  var t, r;
  return (r = (t = e == null ? void 0 : e.matches) == null ? void 0 : t.call(e, Jf)) != null ? r : !1;
}
function Xf(e, t = (r) => r) {
  return e.slice().sort((r, n) => {
    let o = t(r), i = t(n);
    if (o === null || i === null) return 0;
    let a = o.compareDocumentPosition(i);
    return a & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : a & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function _t(e, t, { sorted: r = !0, relativeTo: n = null, skipElements: o = [] } = {}) {
  let i = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : document : e.ownerDocument, a = Array.isArray(e) ? r ? Xf(e) : e : t & 64 ? zf(e) : Vf(e);
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
  return t & 6 && Yf(h) && h.select(), 2;
}
function na() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function Qf() {
  return /Android/gi.test(window.navigator.userAgent);
}
function Zf() {
  return na() || Qf();
}
function At(e, t, r, n) {
  let o = tt(r);
  oe(() => {
    if (!e) return;
    function i(a) {
      o.current(a);
    }
    return document.addEventListener(t, i, n), () => document.removeEventListener(t, i, n);
  }, [e, t, n]);
}
function oa(e, t, r, n) {
  let o = tt(r);
  oe(() => {
    if (!e) return;
    function i(a) {
      o.current(a);
    }
    return window.addEventListener(t, i, n), () => window.removeEventListener(t, i, n);
  }, [e, t, n]);
}
const Go = 30;
function ed(e, t, r) {
  let n = vt(e, "outside-click"), o = tt(r), i = Fe(function(l, f) {
    if (l.defaultPrevented) return;
    let u = f(l);
    if (u === null || !u.getRootNode().contains(u) || !u.isConnected) return;
    let y = function h(v) {
      return typeof v == "function" ? h(v()) : Array.isArray(v) || v instanceof Set ? v : [v];
    }(t);
    for (let h of y) if (h !== null && (h.contains(u) || l.composed && l.composedPath().includes(h))) return;
    return !Gf(u, ra.Loose) && u.tabIndex !== -1 && l.preventDefault(), o.current(l, u);
  }, [o, t]), a = U(null);
  At(n, "pointerdown", (l) => {
    var f, u;
    a.current = ((u = (f = l.composedPath) == null ? void 0 : f.call(l)) == null ? void 0 : u[0]) || l.target;
  }, !0), At(n, "mousedown", (l) => {
    var f, u;
    a.current = ((u = (f = l.composedPath) == null ? void 0 : f.call(l)) == null ? void 0 : u[0]) || l.target;
  }, !0), At(n, "click", (l) => {
    Zf() || a.current && (i(l, () => a.current), a.current = null);
  }, !0);
  let s = U({ x: 0, y: 0 });
  At(n, "touchstart", (l) => {
    s.current.x = l.touches[0].clientX, s.current.y = l.touches[0].clientY;
  }, !0), At(n, "touchend", (l) => {
    let f = { x: l.changedTouches[0].clientX, y: l.changedTouches[0].clientY };
    if (!(Math.abs(f.x - s.current.x) >= Go || Math.abs(f.y - s.current.y) >= Go)) return i(l, () => l.target instanceof HTMLElement ? l.target : null);
  }, !0), oa(n, "blur", (l) => i(l, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), !0);
}
function Bt(...e) {
  return ne(() => gr(...e), [...e]);
}
function ia(e, t, r, n) {
  let o = tt(r);
  oe(() => {
    e = e ?? window;
    function i(a) {
      o.current(a);
    }
    return e.addEventListener(t, i, n), () => e.removeEventListener(t, i, n);
  }, [e, t, n]);
}
function td() {
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
function rd() {
  return na() ? { before({ doc: e, d: t, meta: r }) {
    function n(o) {
      return r.containers.flatMap((i) => i()).some((i) => i.contains(o));
    }
    t.microTask(() => {
      var o;
      if (window.getComputedStyle(e.documentElement).scrollBehavior !== "auto") {
        let s = Ue();
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
function nd() {
  return { before({ doc: e, d: t }) {
    t.style(e.documentElement, "overflow", "hidden");
  } };
}
function od(e) {
  let t = {};
  for (let r of e) Object.assign(t, r(t));
  return t;
}
let Je = ea(() => /* @__PURE__ */ new Map(), { PUSH(e, t) {
  var r;
  let n = (r = this.get(e)) != null ? r : { doc: e, count: 0, d: Ue(), meta: /* @__PURE__ */ new Set() };
  return n.count++, n.meta.add(t), this.set(e, n), this;
}, POP(e, t) {
  let r = this.get(e);
  return r && (r.count--, r.meta.delete(t)), this;
}, SCROLL_PREVENT({ doc: e, d: t, meta: r }) {
  let n = { doc: e, d: t, meta: od(r) }, o = [rd(), td(), nd()];
  o.forEach(({ before: i }) => i == null ? void 0 : i(n)), o.forEach(({ after: i }) => i == null ? void 0 : i(n));
}, SCROLL_ALLOW({ d: e }) {
  e.dispose();
}, TEARDOWN({ doc: e }) {
  this.delete(e);
} });
Je.subscribe(() => {
  let e = Je.getSnapshot(), t = /* @__PURE__ */ new Map();
  for (let [r] of e) t.set(r, r.documentElement.style.overflow);
  for (let r of e.values()) {
    let n = t.get(r.doc) === "hidden", o = r.count !== 0;
    (o && !n || !o && n) && Je.dispatch(r.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", r), r.count === 0 && Je.dispatch("TEARDOWN", r);
  }
});
function id(e, t, r = () => ({ containers: [] })) {
  let n = ta(Je), o = t ? n.get(t) : void 0, i = o ? o.count > 0 : !1;
  return se(() => {
    if (!(!t || !e)) return Je.dispatch("PUSH", t, r), () => Je.dispatch("POP", t, r);
  }, [e, t]), i;
}
function ad(e, t, r = () => [document.body]) {
  let n = vt(e, "scroll-lock");
  id(n, t, (o) => {
    var i;
    return { containers: [...(i = o.containers) != null ? i : [], r] };
  });
}
function sd(e = 0) {
  let [t, r] = Q(e), n = Fe((l) => r(l), [t]), o = Fe((l) => r((f) => f | l), [t]), i = Fe((l) => (t & l) === l, [t]), a = Fe((l) => r((f) => f & ~l), [r]), s = Fe((l) => r((f) => f ^ l), [r]);
  return { flags: t, setFlag: n, addFlag: o, hasFlag: i, removeFlag: a, toggleFlag: s };
}
var Ko, Jo;
typeof process < "u" && typeof globalThis < "u" && typeof Element < "u" && ((Ko = process == null ? void 0 : process.env) == null ? void 0 : Ko.NODE_ENV) === "test" && typeof ((Jo = Element == null ? void 0 : Element.prototype) == null ? void 0 : Jo.getAnimations) > "u" && (Element.prototype.getAnimations = function() {
  return console.warn(["Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.", "Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.", "", "Example usage:", "```js", "import { mockAnimationsApi } from 'jsdom-testing-mocks'", "mockAnimationsApi()", "```"].join(`
`)), [];
});
var ld = ((e) => (e[e.None = 0] = "None", e[e.Closed = 1] = "Closed", e[e.Enter = 2] = "Enter", e[e.Leave = 4] = "Leave", e))(ld || {});
function ud(e) {
  let t = {};
  for (let r in e) e[r] === !0 && (t[`data-${r}`] = "");
  return t;
}
function cd(e, t, r, n) {
  let [o, i] = Q(r), { hasFlag: a, addFlag: s, removeFlag: l } = sd(e && o ? 3 : 0), f = U(!1), u = U(!1), y = Ln();
  return se(() => {
    var h;
    if (e) {
      if (r && i(!0), !t) {
        r && s(3);
        return;
      }
      return (h = n == null ? void 0 : n.start) == null || h.call(n, r), fd(t, { inFlight: f, prepare() {
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
function fd(e, { prepare: t, run: r, done: n, inFlight: o }) {
  let i = Ue();
  return pd(e, { prepare: t, inFlight: o }), i.nextFrame(() => {
    r(), i.requestAnimationFrame(() => {
      i.add(dd(e, n));
    });
  }), i.dispose;
}
function dd(e, t) {
  var r, n;
  let o = Ue();
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
function pd(e, { inFlight: t, prepare: r }) {
  if (t != null && t.current) {
    r();
    return;
  }
  let n = e.style.transition;
  e.style.transition = "none", r(), e.offsetHeight, e.style.transition = n;
}
function kn(e, t) {
  let r = U([]), n = q(e);
  oe(() => {
    let o = [...r.current];
    for (let [i, a] of t.entries()) if (r.current[i] !== a) {
      let s = n(t, o);
      return r.current = t, s;
    }
  }, [n, ...t]);
}
let wr = he(null);
wr.displayName = "OpenClosedContext";
var be = ((e) => (e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(be || {});
function Er() {
  return fe(wr);
}
function md({ value: e, children: t }) {
  return F.createElement(wr.Provider, { value: e }, t);
}
function yd({ children: e }) {
  return F.createElement(wr.Provider, { value: null }, e);
}
function hd(e) {
  function t() {
    document.readyState !== "loading" && (e(), document.removeEventListener("DOMContentLoaded", t));
  }
  typeof window < "u" && typeof document < "u" && (document.addEventListener("DOMContentLoaded", t), t());
}
let Le = [];
hd(() => {
  function e(t) {
    if (!(t.target instanceof HTMLElement) || t.target === document.body || Le[0] === t.target) return;
    let r = t.target;
    r = r.closest(cr), Le.unshift(r ?? t.target), Le = Le.filter((n) => n != null && n.isConnected), Le.splice(10);
  }
  window.addEventListener("click", e, { capture: !0 }), window.addEventListener("mousedown", e, { capture: !0 }), window.addEventListener("focus", e, { capture: !0 }), document.body.addEventListener("click", e, { capture: !0 }), document.body.addEventListener("mousedown", e, { capture: !0 }), document.body.addEventListener("focus", e, { capture: !0 });
});
function aa(e) {
  let t = q(e), r = U(!1);
  oe(() => (r.current = !1, () => {
    r.current = !0, br(() => {
      r.current && t();
    });
  }), [t]);
}
function vd() {
  let e = typeof document > "u";
  return "useSyncExternalStore" in Rt ? ((t) => t.useSyncExternalStore)(Rt)(() => () => {
  }, () => !1, () => !e) : !1;
}
function Ut() {
  let e = vd(), [t, r] = Rt.useState(Ze.isHandoffComplete);
  return t && Ze.isHandoffComplete === !1 && r(!1), Rt.useEffect(() => {
    t !== !0 && r(!0);
  }, [t]), Rt.useEffect(() => Ze.handoff(), []), e ? !1 : t;
}
let sa = he(!1);
function gd() {
  return fe(sa);
}
function Yo(e) {
  return F.createElement(sa.Provider, { value: e.force }, e.children);
}
function bd(e) {
  let t = gd(), r = fe(ua), n = Bt(e), [o, i] = Q(() => {
    var a;
    if (!t && r !== null) return (a = r.current) != null ? a : null;
    if (Ze.isServer) return null;
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
let la = we, wd = de(function(e, t) {
  let r = e, n = U(null), o = Pe($f((u) => {
    n.current = u;
  }), t), i = Bt(n), a = bd(n), [s] = Q(() => {
    var u;
    return Ze.isServer ? null : (u = i == null ? void 0 : i.createElement("div")) != null ? u : null;
  }), l = fe(bn), f = Ut();
  return se(() => {
    !a || !s || a.contains(s) || (s.setAttribute("data-headlessui-portal", ""), a.appendChild(s));
  }, [a, s]), se(() => {
    if (s && l) return l.register(s);
  }, [l, s]), aa(() => {
    var u;
    !a || !s || (s instanceof Node && a.contains(s) && a.removeChild(s), a.childNodes.length <= 0 && ((u = a.parentElement) == null || u.removeChild(a)));
  }), f ? !a || !s ? null : rs(ve({ ourProps: { ref: o }, theirProps: r, slot: {}, defaultTag: la, name: "Portal" }), s) : null;
});
function Ed(e, t) {
  let r = Pe(t), { enabled: n = !0, ...o } = e;
  return n ? F.createElement(wd, { ...o, ref: r }) : ve({ ourProps: { ref: r }, theirProps: o, slot: {}, defaultTag: la, name: "Portal" });
}
let Sd = we, ua = he(null);
function xd(e, t) {
  let { target: r, ...n } = e, o = { ref: Pe(t) };
  return F.createElement(ua.Provider, { value: r }, ve({ ourProps: o, theirProps: n, defaultTag: Sd, name: "Popover.Group" }));
}
let bn = he(null);
function Od() {
  let e = fe(bn), t = U([]), r = q((i) => (t.current.push(i), e && e.register(i), () => n(i))), n = q((i) => {
    let a = t.current.indexOf(i);
    a !== -1 && t.current.splice(a, 1), e && e.unregister(i);
  }), o = ne(() => ({ register: r, unregister: n, portals: t }), [r, n, t]);
  return [t, ne(() => function({ children: i }) {
    return F.createElement(bn.Provider, { value: o }, i);
  }, [o])];
}
let Ad = de(Ed), ca = de(xd), Td = Object.assign(Ad, { Group: ca });
function Rd(e, t = typeof document < "u" ? document.defaultView : null, r) {
  let n = vt(e, "escape");
  ia(t, "keydown", (o) => {
    n && (o.defaultPrevented || o.key === Zi.Escape && r(o));
  });
}
function Pd() {
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
function Fd({ defaultContainers: e = [], portals: t, mainTreeNode: r } = {}) {
  let n = Bt(r), o = q(() => {
    var i, a;
    let s = [];
    for (let l of e) l !== null && (l instanceof HTMLElement ? s.push(l) : "current" in l && l.current instanceof HTMLElement && s.push(l.current));
    if (t != null && t.current) for (let l of t.current) s.push(l);
    for (let l of (i = n == null ? void 0 : n.querySelectorAll("html > *, body > *")) != null ? i : []) l !== document.body && l !== document.head && l instanceof HTMLElement && l.id !== "headlessui-portal-root" && (r && (l.contains(r) || l.contains((a = r == null ? void 0 : r.getRootNode()) == null ? void 0 : a.host)) || s.some((f) => l.contains(f)) || s.push(l));
    return s;
  });
  return { resolveContainers: o, contains: q((i) => o().some((a) => a.contains(i))) };
}
let fa = he(null);
function Xo({ children: e, node: t }) {
  let [r, n] = Q(null), o = da(t ?? r);
  return F.createElement(fa.Provider, { value: o }, e, o === null && F.createElement(hn, { features: ur.Hidden, ref: (i) => {
    var a, s;
    if (i) {
      for (let l of (s = (a = gr(i)) == null ? void 0 : a.querySelectorAll("html > *, body > *")) != null ? s : []) if (l !== document.body && l !== document.head && l instanceof HTMLElement && l != null && l.contains(i)) {
        n(l);
        break;
      }
    }
  } }));
}
function da(e = null) {
  var t;
  return (t = fe(fa)) != null ? t : e;
}
function jn() {
  let e = U(!1);
  return se(() => (e.current = !0, () => {
    e.current = !1;
  }), []), e;
}
var Tt = ((e) => (e[e.Forwards = 0] = "Forwards", e[e.Backwards = 1] = "Backwards", e))(Tt || {});
function Cd() {
  let e = U(0);
  return oa(!0, "keydown", (t) => {
    t.key === "Tab" && (e.current = t.shiftKey ? 1 : 0);
  }, !0), e;
}
function pa(e) {
  if (!e) return /* @__PURE__ */ new Set();
  if (typeof e == "function") return new Set(e());
  let t = /* @__PURE__ */ new Set();
  for (let r of e.current) r.current instanceof HTMLElement && t.add(r.current);
  return t;
}
let $d = "div";
var Ge = ((e) => (e[e.None = 0] = "None", e[e.InitialFocus = 1] = "InitialFocus", e[e.TabLock = 2] = "TabLock", e[e.FocusLock = 4] = "FocusLock", e[e.RestoreFocus = 8] = "RestoreFocus", e[e.AutoFocus = 16] = "AutoFocus", e))(Ge || {});
function _d(e, t) {
  let r = U(null), n = Pe(r, t), { initialFocus: o, initialFocusFallback: i, containers: a, features: s = 15, ...l } = e;
  Ut() || (s = 0);
  let f = Bt(r);
  Ld(s, { ownerDocument: f });
  let u = Md(s, { ownerDocument: f, container: r, initialFocus: o, initialFocusFallback: i });
  kd(s, { ownerDocument: f, container: r, containers: a, previousActiveElement: u });
  let y = Cd(), h = q((b) => {
    let E = r.current;
    E && ((S) => S())(() => {
      je(y.current, { [Tt.Forwards]: () => {
        _t(E, Ce.First, { skipElements: [b.relatedTarget, i] });
      }, [Tt.Backwards]: () => {
        _t(E, Ce.Last, { skipElements: [b.relatedTarget, i] });
      } });
    });
  }), v = vt(!!(s & 2), "focus-trap#tab-lock"), c = Ln(), p = U(!1), m = { ref: n, onKeyDown(b) {
    b.key == "Tab" && (p.current = !0, c.requestAnimationFrame(() => {
      p.current = !1;
    }));
  }, onBlur(b) {
    if (!(s & 4)) return;
    let E = pa(a);
    r.current instanceof HTMLElement && E.add(r.current);
    let S = b.relatedTarget;
    S instanceof HTMLElement && S.dataset.headlessuiFocusGuard !== "true" && (ma(E, S) || (p.current ? _t(r.current, je(y.current, { [Tt.Forwards]: () => Ce.Next, [Tt.Backwards]: () => Ce.Previous }) | Ce.WrapAround, { relativeTo: b.target }) : b.target instanceof HTMLElement && $e(b.target)));
  } };
  return F.createElement(F.Fragment, null, v && F.createElement(hn, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: h, features: ur.Focusable }), ve({ ourProps: m, theirProps: l, defaultTag: $d, name: "FocusTrap" }), v && F.createElement(hn, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: h, features: ur.Focusable }));
}
let Nd = de(_d), Dd = Object.assign(Nd, { features: Ge });
function Id(e = !0) {
  let t = U(Le.slice());
  return kn(([r], [n]) => {
    n === !0 && r === !1 && br(() => {
      t.current.splice(0);
    }), n === !1 && r === !0 && (t.current = Le.slice());
  }, [e, Le, t]), q(() => {
    var r;
    return (r = t.current.find((n) => n != null && n.isConnected)) != null ? r : null;
  });
}
function Ld(e, { ownerDocument: t }) {
  let r = !!(e & 8), n = Id(r);
  kn(() => {
    r || (t == null ? void 0 : t.activeElement) === (t == null ? void 0 : t.body) && $e(n());
  }, [r]), aa(() => {
    r && $e(n());
  });
}
function Md(e, { ownerDocument: t, container: r, initialFocus: n, initialFocusFallback: o }) {
  let i = U(null), a = vt(!!(e & 1), "focus-trap#initial-focus"), s = jn();
  return kn(() => {
    if (e === 0) return;
    if (!a) {
      o != null && o.current && $e(o.current);
      return;
    }
    let l = r.current;
    l && br(() => {
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
          if (_t(l, Ce.First | Ce.AutoFocus) !== gn.Error) return;
        } else if (_t(l, Ce.First) !== gn.Error) return;
        if (o != null && o.current && ($e(o.current), (t == null ? void 0 : t.activeElement) === o.current)) return;
        console.warn("There are no focusable elements inside the <FocusTrap />");
      }
      i.current = t == null ? void 0 : t.activeElement;
    });
  }, [o, a, e]), i;
}
function kd(e, { ownerDocument: t, container: r, containers: n, previousActiveElement: o }) {
  let i = jn(), a = !!(e & 4);
  ia(t == null ? void 0 : t.defaultView, "focus", (s) => {
    if (!a || !i.current) return;
    let l = pa(n);
    r.current instanceof HTMLElement && l.add(r.current);
    let f = o.current;
    if (!f) return;
    let u = s.target;
    u && u instanceof HTMLElement ? ma(l, u) ? (o.current = u, $e(u)) : (s.preventDefault(), s.stopPropagation(), $e(f)) : $e(o.current);
  }, !0);
}
function ma(e, t) {
  for (let r of e) if (r.contains(t)) return !0;
  return !1;
}
function ya(e) {
  var t;
  return !!(e.enter || e.enterFrom || e.enterTo || e.leave || e.leaveFrom || e.leaveTo) || ((t = e.as) != null ? t : va) !== we || F.Children.count(e.children) === 1;
}
let Sr = he(null);
Sr.displayName = "TransitionContext";
var jd = ((e) => (e.Visible = "visible", e.Hidden = "hidden", e))(jd || {});
function Bd() {
  let e = fe(Sr);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
function Ud() {
  let e = fe(xr);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
let xr = he(null);
xr.displayName = "NestingContext";
function Or(e) {
  return "children" in e ? Or(e.children) : e.current.filter(({ el: t }) => t.current !== null).filter(({ state: t }) => t === "visible").length > 0;
}
function ha(e, t) {
  let r = tt(e), n = U([]), o = jn(), i = Ln(), a = q((v, c = ke.Hidden) => {
    let p = n.current.findIndex(({ el: m }) => m === v);
    p !== -1 && (je(c, { [ke.Unmount]() {
      n.current.splice(p, 1);
    }, [ke.Hidden]() {
      n.current[p].state = "hidden";
    } }), i.microTask(() => {
      var m;
      !Or(n) && o.current && ((m = r.current) == null || m.call(r));
    }));
  }), s = q((v) => {
    let c = n.current.find(({ el: p }) => p === v);
    return c ? c.state !== "visible" && (c.state = "visible") : n.current.push({ el: v, state: "visible" }), () => a(v, ke.Unmount);
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
  return ne(() => ({ children: n, register: s, unregister: a, onStart: y, onStop: h, wait: f, chains: u }), [s, a, n, y, h, u, f]);
}
let va = we, ga = lr.RenderStrategy;
function Wd(e, t) {
  var r, n;
  let { transition: o = !0, beforeEnter: i, afterEnter: a, beforeLeave: s, afterLeave: l, enter: f, enterFrom: u, enterTo: y, entered: h, leave: v, leaveFrom: c, leaveTo: p, ...m } = e, [b, E] = Q(null), S = U(null), x = ya(e), A = Pe(...x ? [S, t, E] : t === null ? [] : [t]), T = (r = m.unmount) == null || r ? ke.Unmount : ke.Hidden, { show: $, appear: j, initial: H } = Bd(), [L, Y] = Q($ ? "visible" : "hidden"), Z = Ud(), { register: R, unregister: M } = Z;
  se(() => R(S), [R, S]), se(() => {
    if (T === ke.Hidden && S.current) {
      if ($ && L !== "visible") {
        Y("visible");
        return;
      }
      return je(L, { hidden: () => M(S), visible: () => R(S) });
    }
  }, [L, S, R, M, $, T]);
  let K = Ut();
  se(() => {
    if (x && K && L === "visible" && S.current === null) throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
  }, [S, L, K, x]);
  let pe = H && !j, ge = j && $ && H, Se = U(!1), re = ha(() => {
    Se.current || (Y("hidden"), M(S));
  }, Z), W = q((He) => {
    Se.current = !0;
    let Ne = He ? "enter" : "leave";
    re.onStart(S, Ne, (xe) => {
      xe === "enter" ? i == null || i() : xe === "leave" && (s == null || s());
    });
  }), _e = q((He) => {
    let Ne = He ? "enter" : "leave";
    Se.current = !1, re.onStop(S, Ne, (xe) => {
      xe === "enter" ? a == null || a() : xe === "leave" && (l == null || l());
    }), Ne === "leave" && !Or(re) && (Y("hidden"), M(S));
  });
  oe(() => {
    x && o || (W($), _e($));
  }, [$, x, o]);
  let Wt = !(!o || !x || !K || pe), [, te] = cd(Wt, b, $, { start: W, end: _e }), Tr = Ve({ ref: A, className: ((n = yn(m.className, ge && f, ge && u, te.enter && f, te.enter && te.closed && u, te.enter && !te.closed && y, te.leave && v, te.leave && !te.closed && c, te.leave && te.closed && p, !te.transition && $ && h)) == null ? void 0 : n.trim()) || void 0, ...ud(te) }), We = 0;
  return L === "visible" && (We |= be.Open), L === "hidden" && (We |= be.Closed), te.enter && (We |= be.Opening), te.leave && (We |= be.Closing), F.createElement(xr.Provider, { value: re }, F.createElement(md, { value: We }, ve({ ourProps: Tr, theirProps: m, defaultTag: va, features: ga, visible: L === "visible", name: "Transition.Child" })));
}
function Hd(e, t) {
  let { show: r, appear: n = !1, unmount: o = !0, ...i } = e, a = U(null), s = ya(e), l = Pe(...s ? [a, t] : t === null ? [] : [t]);
  Ut();
  let f = Er();
  if (r === void 0 && f !== null && (r = (f & be.Open) === be.Open), r === void 0) throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
  let [u, y] = Q(r ? "visible" : "hidden"), h = ha(() => {
    r || y("hidden");
  }), [v, c] = Q(!0), p = U([r]);
  se(() => {
    v !== !1 && p.current[p.current.length - 1] !== r && (p.current.push(r), c(!1));
  }, [p, r]);
  let m = ne(() => ({ show: r, appear: n, initial: v }), [r, n, v]);
  se(() => {
    r ? y("visible") : !Or(h) && a.current !== null && y("hidden");
  }, [r, h]);
  let b = { unmount: o }, E = q(() => {
    var x;
    v && c(!1), (x = e.beforeEnter) == null || x.call(e);
  }), S = q(() => {
    var x;
    v && c(!1), (x = e.beforeLeave) == null || x.call(e);
  });
  return F.createElement(xr.Provider, { value: h }, F.createElement(Sr.Provider, { value: m }, ve({ ourProps: { ...b, as: we, children: F.createElement(ba, { ref: l, ...b, ...i, beforeEnter: E, beforeLeave: S }) }, theirProps: {}, defaultTag: we, features: ga, visible: u === "visible", name: "Transition" })));
}
function qd(e, t) {
  let r = fe(Sr) !== null, n = Er() !== null;
  return F.createElement(F.Fragment, null, !r && n ? F.createElement(wn, { ref: t, ...e }) : F.createElement(ba, { ref: t, ...e }));
}
let wn = de(Hd), ba = de(Wd), gt = de(qd), wa = Object.assign(wn, { Child: gt, Root: wn });
var Vd = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(Vd || {}), zd = ((e) => (e[e.SetTitleId = 0] = "SetTitleId", e))(zd || {});
let Gd = { 0(e, t) {
  return e.titleId === t.id ? e : { ...e, titleId: t.id };
} }, Bn = he(null);
Bn.displayName = "DialogContext";
function Ar(e) {
  let t = fe(Bn);
  if (t === null) {
    let r = new Error(`<${e} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(r, Ar), r;
  }
  return t;
}
function Kd(e, t) {
  return je(t.type, Gd, e, t);
}
let Qo = de(function(e, t) {
  let r = It(), { id: n = `headlessui-dialog-${r}`, open: o, onClose: i, initialFocus: a, role: s = "dialog", autoFocus: l = !0, __demoMode: f = !1, unmount: u = !1, ...y } = e, h = U(!1);
  s = function() {
    return s === "dialog" || s === "alertdialog" ? s : (h.current || (h.current = !0, console.warn(`Invalid role [${s}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog");
  }();
  let v = Er();
  o === void 0 && v !== null && (o = (v & be.Open) === be.Open);
  let c = U(null), p = Pe(c, t), m = Bt(c), b = o ? 0 : 1, [E, S] = es(Kd, { titleId: null, descriptionId: null, panelRef: ts() }), x = q(() => i(!1)), A = q((W) => S({ type: 0, id: W })), T = Ut() ? b === 0 : !1, [$, j] = Od(), H = { get current() {
    var W;
    return (W = E.panelRef.current) != null ? W : c.current;
  } }, L = da(), { resolveContainers: Y } = Fd({ mainTreeNode: L, portals: $, defaultContainers: [H] }), Z = v !== null ? (v & be.Closing) === be.Closing : !1;
  Uf(f || Z ? !1 : T, { allowed: q(() => {
    var W, _e;
    return [(_e = (W = c.current) == null ? void 0 : W.closest("[data-headlessui-portal]")) != null ? _e : null];
  }), disallowed: q(() => {
    var W;
    return [(W = L == null ? void 0 : L.closest("body > *:not(#headlessui-portal-root)")) != null ? W : null];
  }) }), ed(T, Y, (W) => {
    W.preventDefault(), x();
  }), Rd(T, m == null ? void 0 : m.defaultView, (W) => {
    W.preventDefault(), W.stopPropagation(), document.activeElement && "blur" in document.activeElement && typeof document.activeElement.blur == "function" && document.activeElement.blur(), x();
  }), ad(f || Z ? !1 : T, m, Y), Wf(T, c, x);
  let [R, M] = _f(), K = ne(() => [{ dialogState: b, close: x, setTitleId: A, unmount: u }, E], [b, E, x, A, u]), pe = ne(() => ({ open: b === 0 }), [b]), ge = { ref: p, id: n, role: s, tabIndex: -1, "aria-modal": f ? void 0 : b === 0 ? !0 : void 0, "aria-labelledby": E.titleId, "aria-describedby": R, unmount: u }, Se = !Pd(), re = Ge.None;
  return T && !f && (re |= Ge.RestoreFocus, re |= Ge.TabLock, l && (re |= Ge.AutoFocus), Se && (re |= Ge.InitialFocus)), F.createElement(yd, null, F.createElement(Yo, { force: !0 }, F.createElement(Td, null, F.createElement(Bn.Provider, { value: K }, F.createElement(ca, { target: c }, F.createElement(Yo, { force: !1 }, F.createElement(M, { slot: pe }, F.createElement(j, null, F.createElement(Dd, { initialFocus: a, initialFocusFallback: c, containers: Y, features: re }, F.createElement(kf, { value: x }, ve({ ourProps: ge, theirProps: y, slot: pe, defaultTag: Jd, features: Yd, visible: b === 0, name: "Dialog" })))))))))));
}), Jd = "div", Yd = lr.RenderStrategy | lr.Static;
function Xd(e, t) {
  let { transition: r = !1, open: n, ...o } = e, i = Er(), a = e.hasOwnProperty("open") || i !== null, s = e.hasOwnProperty("onClose");
  if (!a && !s) throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");
  if (!a) throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");
  if (!s) throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");
  if (!i && typeof e.open != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${e.open}`);
  if (typeof e.onClose != "function") throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${e.onClose}`);
  return (n !== void 0 || r) && !o.static ? F.createElement(Xo, null, F.createElement(wa, { show: n, transition: r, unmount: o.unmount }, F.createElement(Qo, { ref: t, ...o }))) : F.createElement(Xo, null, F.createElement(Qo, { ref: t, open: n, ...o }));
}
let Qd = "div";
function Zd(e, t) {
  let r = It(), { id: n = `headlessui-dialog-panel-${r}`, transition: o = !1, ...i } = e, [{ dialogState: a, unmount: s }, l] = Ar("Dialog.Panel"), f = Pe(t, l.panelRef), u = ne(() => ({ open: a === 0 }), [a]), y = q((v) => {
    v.stopPropagation();
  }), h = { ref: f, id: n, onClick: y };
  return F.createElement(o ? gt : we, { ...o ? { unmount: s } : {} }, ve({ ourProps: h, theirProps: i, slot: u, defaultTag: Qd, name: "Dialog.Panel" }));
}
let ep = "div";
function tp(e, t) {
  let { transition: r = !1, ...n } = e, [{ dialogState: o, unmount: i }] = Ar("Dialog.Backdrop"), a = ne(() => ({ open: o === 0 }), [o]), s = { ref: t, "aria-hidden": !0 };
  return F.createElement(r ? gt : we, { ...r ? { unmount: i } : {} }, ve({ ourProps: s, theirProps: n, slot: a, defaultTag: ep, name: "Dialog.Backdrop" }));
}
let rp = "h2";
function np(e, t) {
  let r = It(), { id: n = `headlessui-dialog-title-${r}`, ...o } = e, [{ dialogState: i, setTitleId: a }] = Ar("Dialog.Title"), s = Pe(t);
  oe(() => (a(n), () => a(null)), [n, a]);
  let l = ne(() => ({ open: i === 0 }), [i]);
  return ve({ ourProps: { ref: s, id: n }, theirProps: o, slot: l, defaultTag: rp, name: "Dialog.Title" });
}
let op = de(Xd), Un = de(Zd);
de(tp);
let ip = de(np), ap = Object.assign(op, { Panel: Un, Title: ip, Description: Lf });
function Ea({ onClick: e }) {
  return /* @__PURE__ */ D.jsxs(
    "button",
    {
      type: "button",
      className: "im-close-button text-gray-400 hover:text-gray-500",
      onClick: e,
      children: [
        /* @__PURE__ */ D.jsx("span", { className: "sr-only", children: "Close" }),
        /* @__PURE__ */ D.jsx(
          "svg",
          {
            className: "size-6",
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: "2",
            stroke: "currentColor",
            "aria-hidden": "true",
            children: /* @__PURE__ */ D.jsx(
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
const sp = ({ modalContext: e, modalProps: t, children: r }) => /* @__PURE__ */ D.jsx("div", { className: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4", children: /* @__PURE__ */ D.jsx(
  "div",
  {
    className: sr("im-modal-positioner flex min-h-full justify-center", {
      "items-start": t.position === "top",
      "items-center": t.position === "center",
      "items-end": t.position === "bottom"
    }),
    children: /* @__PURE__ */ D.jsx(
      gt,
      {
        enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
        enterTo: "opacity-100 translate-y-0 sm:scale-100",
        leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
        leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
        afterLeave: e.afterLeave,
        className: sr("im-modal-wrapper w-full transition duration-300 ease-in-out", e.onTopOfStack ? "" : "blur-sm", {
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
        children: /* @__PURE__ */ D.jsxs(Un, { className: `im-modal-content relative ${t.paddingClasses} ${t.panelClasses}`, children: [
          t.closeButton && /* @__PURE__ */ D.jsx("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ D.jsx(Ea, { onClick: e.close }) }),
          typeof r == "function" ? r({ modalContext: e, modalProps: t }) : r
        ] })
      }
    )
  }
) }), lp = ({ modalContext: e, modalProps: t, children: r }) => /* @__PURE__ */ D.jsx("div", { className: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ D.jsx(
  "div",
  {
    className: sr("im-slideover-positioner flex min-h-full items-center", {
      "justify-start": t.position === "left",
      "justify-end": t.position === "right"
    }),
    children: /* @__PURE__ */ D.jsx(
      gt,
      {
        enterFrom: `opacity-0 ${t.position === "left" ? "-translate-x-full" : "translate-x-full"}`,
        enterTo: "opacity-100 translate-x-0",
        leaveFrom: "opacity-100 translate-x-0",
        leaveTo: `opacity-0 ${t.position === "left" ? "-translate-x-full" : "translate-x-full"}`,
        afterLeave: e.afterLeave,
        className: sr("im-slideover-wrapper w-full transition duration-300 ease-in-out", e.onTopOfStack ? "" : "blur-sm", {
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
        children: /* @__PURE__ */ D.jsxs(Un, { className: `im-slideover-content relative ${t.paddingClasses} ${t.panelClasses}`, children: [
          t.closeButton && /* @__PURE__ */ D.jsx("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ D.jsx(Ea, { onClick: e.close }) }),
          typeof r == "function" ? r({ modalContext: e, modalProps: t }) : r
        ] })
      }
    )
  }
) }), up = En(({ name: e, children: t, ...r }, n) => {
  const o = (a) => typeof t == "function" ? t(a) : t, i = U(null);
  return Zo(n, () => i.current, [i]), /* @__PURE__ */ D.jsx(
    Ki,
    {
      ref: i,
      name: e,
      ...r,
      children: ({ afterLeave: a, close: s, emit: l, getChildModal: f, getParentModal: u, modalContext: y, modalProps: h, reload: v }) => /* @__PURE__ */ D.jsx(
        wa,
        {
          appear: !0,
          show: y.open ?? !1,
          children: /* @__PURE__ */ D.jsxs(
            ap,
            {
              as: "div",
              className: "im-dialog relative z-20",
              onClose: () => h.closeExplicitly ? null : s(),
              "data-inertiaui-modal-id": y.id,
              "data-inertiaui-modal-index": y.index,
              children: [
                y.index === 0 ? /* @__PURE__ */ D.jsx(
                  gt,
                  {
                    enter: "transition transform ease-in-out duration-300",
                    enterFrom: "opacity-0",
                    enterTo: "opacity-100",
                    leave: "transition transform ease-in-out duration-300",
                    leaveFrom: "opacity-100",
                    leaveTo: "opacity-0",
                    children: y.onTopOfStack ? /* @__PURE__ */ D.jsx(
                      "div",
                      {
                        className: "im-backdrop fixed inset-0 z-30 bg-black/75",
                        "aria-hidden": "true"
                      }
                    ) : /* @__PURE__ */ D.jsx("div", {})
                  }
                ) : null,
                y.index > 0 && y.onTopOfStack ? /* @__PURE__ */ D.jsx("div", { className: "im-backdrop fixed inset-0 z-30 bg-black/75" }) : null,
                h.slideover ? /* @__PURE__ */ D.jsx(
                  lp,
                  {
                    modalContext: y,
                    modalProps: h,
                    children: o({
                      afterLeave: a,
                      close: s,
                      emit: l,
                      getChildModal: f,
                      getParentModal: u,
                      modalContext: y,
                      modalProps: h,
                      reload: v
                    })
                  }
                ) : /* @__PURE__ */ D.jsx(
                  sp,
                  {
                    modalContext: y,
                    modalProps: h,
                    children: o({
                      afterLeave: a,
                      close: s,
                      emit: l,
                      getChildModal: f,
                      getParentModal: u,
                      modalContext: y,
                      modalProps: h,
                      reload: v
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
up.displayName = "Modal";
const wp = ({
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
  const [m, b] = Q(!1), [E, S] = Q(null), { stack: x, visit: A } = Dn(), T = {}, $ = {};
  Object.keys(p).forEach((R) => {
    qo.includes(R) || (R.startsWith("on") && typeof p[R] == "function" ? R.toLowerCase() in window ? T[R] = p[R] : $[R] = p[R] : T[R] = p[R]);
  }), oe(() => {
    o && window.location.hash === `#${o}` && Z();
  }, [o]);
  const [j, H] = Q(!1);
  oe(() => {
    E && (E.onTopOfStack && j ? y == null || y() : !E.onTopOfStack && !j && (l == null || l()), H(!E.onTopOfStack));
  }, [x]);
  const L = Fe(
    (R) => {
      o && R === 0 && (window.location.hash = ""), f == null || f();
    },
    [f, o]
  ), Y = Fe(() => {
    S(null), s == null || s();
  }, [s]), Z = Fe(
    (R) => {
      R == null || R.preventDefault(), !m && (e.startsWith("#") || (b(!0), h == null || h()), A(
        e,
        t,
        r,
        i,
        jl(Ai(p, qo)),
        () => L(x.length),
        Y,
        a
      ).then((M) => {
        S(M), o && M.index === 0 && (window.location.hash = o), M.registerEventListenersFromProps($), v == null || v();
      }).catch((M) => {
        console.error(M), u == null || u(M);
      }).finally(() => b(!1)));
    },
    [e, t, r, i, a, p, L, Y]
  );
  return /* @__PURE__ */ D.jsx(
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
  Ki as HeadlessModal,
  up as Modal,
  wp as ModalLink,
  vp as ModalRoot,
  hp as ModalStackProvider,
  os as getConfig,
  yp as putConfig,
  mp as resetConfig,
  Sf as useModalIndex,
  Dn as useModalStack
};
