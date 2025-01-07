var Or = Object.defineProperty;
var Pr = (e, t, n) => t in e ? Or(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var le = (e, t, n) => Pr(e, typeof t != "symbol" ? t + "" : t, n);
import * as Xe from "react";
import O, { createContext as ae, useState as V, useEffect as L, useContext as Z, useRef as j, createElement as rt, useMemo as B, forwardRef as It, useImperativeHandle as yn, useLayoutEffect as Rr, useCallback as oe, Fragment as se, isValidElement as Sr, cloneElement as Cr, useId as Ge, useSyncExternalStore as $r, useReducer as Fr, createRef as kr } from "react";
import lt from "axios";
import { router as Ve, usePage as jr } from "@inertiajs/react";
import { mergeDataIntoQueryString as _r } from "@inertiajs/core";
import { createPortal as Mr } from "react-dom";
const De = {
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
class Ar {
  constructor() {
    this.config = {}, this.reset();
  }
  reset() {
    this.config = JSON.parse(JSON.stringify(De));
  }
  put(t, n) {
    if (typeof t == "object") {
      this.config = {
        type: t.type ?? De.type,
        navigate: t.navigate ?? De.navigate,
        modal: { ...De.modal, ...t.modal ?? {} },
        slideover: { ...De.slideover, ...t.slideover ?? {} }
      };
      return;
    }
    const r = t.split(".");
    let l = this.config;
    for (let o = 0; o < r.length - 1; o++)
      l = l[r[o]] = l[r[o]] || {};
    l[r[r.length - 1]] = n;
  }
  get(t) {
    if (typeof t > "u")
      return this.config;
    const n = t.split(".");
    let r = this.config;
    for (const l of n) {
      if (r[l] === void 0)
        return null;
      r = r[l];
    }
    return r;
  }
}
const st = new Ar(), Wa = () => st.reset(), Ua = (e, t) => st.put(e, t), Nt = (e) => st.get(e), Me = (e, t) => st.get(e ? `slideover.${t}` : `modal.${t}`);
var Ct = { exports: {} }, We = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var un;
function Lr() {
  if (un) return We;
  un = 1;
  var e = O, t = Symbol.for("react.element"), n = Symbol.for("react.fragment"), r = Object.prototype.hasOwnProperty, l = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = { key: !0, ref: !0, __self: !0, __source: !0 };
  function u(s, i, p) {
    var c, w = {}, b = null, y = null;
    p !== void 0 && (b = "" + p), i.key !== void 0 && (b = "" + i.key), i.ref !== void 0 && (y = i.ref);
    for (c in i) r.call(i, c) && !o.hasOwnProperty(c) && (w[c] = i[c]);
    if (s && s.defaultProps) for (c in i = s.defaultProps, i) w[c] === void 0 && (w[c] = i[c]);
    return { $$typeof: t, type: s, key: b, ref: y, props: w, _owner: l.current };
  }
  return We.Fragment = n, We.jsx = u, We.jsxs = u, We;
}
var Ue = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var sn;
function Ir() {
  return sn || (sn = 1, process.env.NODE_ENV !== "production" && function() {
    var e = O, t = Symbol.for("react.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), u = Symbol.for("react.provider"), s = Symbol.for("react.context"), i = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), c = Symbol.for("react.suspense_list"), w = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), y = Symbol.for("react.offscreen"), g = Symbol.iterator, f = "@@iterator";
    function d(a) {
      if (a === null || typeof a != "object")
        return null;
      var h = g && a[g] || a[f];
      return typeof h == "function" ? h : null;
    }
    var m = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function v(a) {
      {
        for (var h = arguments.length, E = new Array(h > 1 ? h - 1 : 0), P = 1; P < h; P++)
          E[P - 1] = arguments[P];
        x("error", a, E);
      }
    }
    function x(a, h, E) {
      {
        var P = m.ReactDebugCurrentFrame, k = P.getStackAddendum();
        k !== "" && (h += "%s", E = E.concat([k]));
        var _ = E.map(function(C) {
          return String(C);
        });
        _.unshift("Warning: " + h), Function.prototype.apply.call(console[a], console, _);
      }
    }
    var T = !1, F = !1, X = !1, U = !1, ee = !1, te;
    te = Symbol.for("react.module.reference");
    function H(a) {
      return !!(typeof a == "string" || typeof a == "function" || a === r || a === o || ee || a === l || a === p || a === c || U || a === y || T || F || X || typeof a == "object" && a !== null && (a.$$typeof === b || a.$$typeof === w || a.$$typeof === u || a.$$typeof === s || a.$$typeof === i || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      a.$$typeof === te || a.getModuleId !== void 0));
    }
    function q(a, h, E) {
      var P = a.displayName;
      if (P)
        return P;
      var k = h.displayName || h.name || "";
      return k !== "" ? E + "(" + k + ")" : E;
    }
    function G(a) {
      return a.displayName || "Context";
    }
    function M(a) {
      if (a == null)
        return null;
      if (typeof a.tag == "number" && v("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof a == "function")
        return a.displayName || a.name || null;
      if (typeof a == "string")
        return a;
      switch (a) {
        case r:
          return "Fragment";
        case n:
          return "Portal";
        case o:
          return "Profiler";
        case l:
          return "StrictMode";
        case p:
          return "Suspense";
        case c:
          return "SuspenseList";
      }
      if (typeof a == "object")
        switch (a.$$typeof) {
          case s:
            var h = a;
            return G(h) + ".Consumer";
          case u:
            var E = a;
            return G(E._context) + ".Provider";
          case i:
            return q(a, a.render, "ForwardRef");
          case w:
            var P = a.displayName || null;
            return P !== null ? P : M(a.type) || "Memo";
          case b: {
            var k = a, _ = k._payload, C = k._init;
            try {
              return M(C(_));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var $ = Object.assign, I = 0, be, xe, he, ne, Ee, N, Te;
    function Y() {
    }
    Y.__reactDisabledLog = !0;
    function bt() {
      {
        if (I === 0) {
          be = console.log, xe = console.info, he = console.warn, ne = console.error, Ee = console.group, N = console.groupCollapsed, Te = console.groupEnd;
          var a = {
            configurable: !0,
            enumerable: !0,
            value: Y,
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
        I++;
      }
    }
    function Oe() {
      {
        if (I--, I === 0) {
          var a = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: $({}, a, {
              value: be
            }),
            info: $({}, a, {
              value: xe
            }),
            warn: $({}, a, {
              value: he
            }),
            error: $({}, a, {
              value: ne
            }),
            group: $({}, a, {
              value: Ee
            }),
            groupCollapsed: $({}, a, {
              value: N
            }),
            groupEnd: $({}, a, {
              value: Te
            })
          });
        }
        I < 0 && v("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ie = m.ReactCurrentDispatcher, Pe;
    function de(a, h, E) {
      {
        if (Pe === void 0)
          try {
            throw Error();
          } catch (k) {
            var P = k.stack.trim().match(/\n( *(at )?)/);
            Pe = P && P[1] || "";
          }
        return `
` + Pe + a;
      }
    }
    var fe = !1, Qe;
    {
      var Qn = typeof WeakMap == "function" ? WeakMap : Map;
      Qe = new Qn();
    }
    function Xt(a, h) {
      if (!a || fe)
        return "";
      {
        var E = Qe.get(a);
        if (E !== void 0)
          return E;
      }
      var P;
      fe = !0;
      var k = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var _;
      _ = Ie.current, Ie.current = null, bt();
      try {
        if (h) {
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
            Reflect.construct(a, [], C);
          } else {
            try {
              C.call();
            } catch (J) {
              P = J;
            }
            a.call(C.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (J) {
            P = J;
          }
          a();
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
                    var re = `
` + S[D].replace(" at new ", " at ");
                    return a.displayName && re.includes("<anonymous>") && (re = re.replace("<anonymous>", a.displayName)), typeof a == "function" && Qe.set(a, re), re;
                  }
                while (D >= 1 && W >= 0);
              break;
            }
        }
      } finally {
        fe = !1, Ie.current = _, Oe(), Error.prepareStackTrace = k;
      }
      var _e = a ? a.displayName || a.name : "", Re = _e ? de(_e) : "";
      return typeof a == "function" && Qe.set(a, Re), Re;
    }
    function er(a, h, E) {
      return Xt(a, !1);
    }
    function tr(a) {
      var h = a.prototype;
      return !!(h && h.isReactComponent);
    }
    function et(a, h, E) {
      if (a == null)
        return "";
      if (typeof a == "function")
        return Xt(a, tr(a));
      if (typeof a == "string")
        return de(a);
      switch (a) {
        case p:
          return de("Suspense");
        case c:
          return de("SuspenseList");
      }
      if (typeof a == "object")
        switch (a.$$typeof) {
          case i:
            return er(a.render);
          case w:
            return et(a.type, h, E);
          case b: {
            var P = a, k = P._payload, _ = P._init;
            try {
              return et(_(k), h, E);
            } catch {
            }
          }
        }
      return "";
    }
    var Ne = Object.prototype.hasOwnProperty, qt = {}, Kt = m.ReactDebugCurrentFrame;
    function tt(a) {
      if (a) {
        var h = a._owner, E = et(a.type, a._source, h ? h.type : null);
        Kt.setExtraStackFrame(E);
      } else
        Kt.setExtraStackFrame(null);
    }
    function nr(a, h, E, P, k) {
      {
        var _ = Function.call.bind(Ne);
        for (var C in a)
          if (_(a, C)) {
            var S = void 0;
            try {
              if (typeof a[C] != "function") {
                var K = Error((P || "React class") + ": " + E + " type `" + C + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[C] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw K.name = "Invariant Violation", K;
              }
              S = a[C](h, C, P, E, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (D) {
              S = D;
            }
            S && !(S instanceof Error) && (tt(k), v("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", P || "React class", E, C, typeof S), tt(null)), S instanceof Error && !(S.message in qt) && (qt[S.message] = !0, tt(k), v("Failed %s type: %s", E, S.message), tt(null));
          }
      }
    }
    var rr = Array.isArray;
    function xt(a) {
      return rr(a);
    }
    function lr(a) {
      {
        var h = typeof Symbol == "function" && Symbol.toStringTag, E = h && a[Symbol.toStringTag] || a.constructor.name || "Object";
        return E;
      }
    }
    function ar(a) {
      try {
        return zt(a), !1;
      } catch {
        return !0;
      }
    }
    function zt(a) {
      return "" + a;
    }
    function Gt(a) {
      if (ar(a))
        return v("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", lr(a)), zt(a);
    }
    var Jt = m.ReactCurrentOwner, ir = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Zt, Qt;
    function or(a) {
      if (Ne.call(a, "ref")) {
        var h = Object.getOwnPropertyDescriptor(a, "ref").get;
        if (h && h.isReactWarning)
          return !1;
      }
      return a.ref !== void 0;
    }
    function ur(a) {
      if (Ne.call(a, "key")) {
        var h = Object.getOwnPropertyDescriptor(a, "key").get;
        if (h && h.isReactWarning)
          return !1;
      }
      return a.key !== void 0;
    }
    function sr(a, h) {
      typeof a.ref == "string" && Jt.current;
    }
    function cr(a, h) {
      {
        var E = function() {
          Zt || (Zt = !0, v("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", h));
        };
        E.isReactWarning = !0, Object.defineProperty(a, "key", {
          get: E,
          configurable: !0
        });
      }
    }
    function dr(a, h) {
      {
        var E = function() {
          Qt || (Qt = !0, v("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", h));
        };
        E.isReactWarning = !0, Object.defineProperty(a, "ref", {
          get: E,
          configurable: !0
        });
      }
    }
    var fr = function(a, h, E, P, k, _, C) {
      var S = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: a,
        key: h,
        ref: E,
        props: C,
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
        value: P
      }), Object.defineProperty(S, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: k
      }), Object.freeze && (Object.freeze(S.props), Object.freeze(S)), S;
    };
    function pr(a, h, E, P, k) {
      {
        var _, C = {}, S = null, K = null;
        E !== void 0 && (Gt(E), S = "" + E), ur(h) && (Gt(h.key), S = "" + h.key), or(h) && (K = h.ref, sr(h, k));
        for (_ in h)
          Ne.call(h, _) && !ir.hasOwnProperty(_) && (C[_] = h[_]);
        if (a && a.defaultProps) {
          var D = a.defaultProps;
          for (_ in D)
            C[_] === void 0 && (C[_] = D[_]);
        }
        if (S || K) {
          var W = typeof a == "function" ? a.displayName || a.name || "Unknown" : a;
          S && cr(C, W), K && dr(C, W);
        }
        return fr(a, S, K, k, P, Jt.current, C);
      }
    }
    var Et = m.ReactCurrentOwner, en = m.ReactDebugCurrentFrame;
    function je(a) {
      if (a) {
        var h = a._owner, E = et(a.type, a._source, h ? h.type : null);
        en.setExtraStackFrame(E);
      } else
        en.setExtraStackFrame(null);
    }
    var Tt;
    Tt = !1;
    function Ot(a) {
      return typeof a == "object" && a !== null && a.$$typeof === t;
    }
    function tn() {
      {
        if (Et.current) {
          var a = M(Et.current.type);
          if (a)
            return `

Check the render method of \`` + a + "`.";
        }
        return "";
      }
    }
    function mr(a) {
      return "";
    }
    var nn = {};
    function hr(a) {
      {
        var h = tn();
        if (!h) {
          var E = typeof a == "string" ? a : a.displayName || a.name;
          E && (h = `

Check the top-level render call using <` + E + ">.");
        }
        return h;
      }
    }
    function rn(a, h) {
      {
        if (!a._store || a._store.validated || a.key != null)
          return;
        a._store.validated = !0;
        var E = hr(h);
        if (nn[E])
          return;
        nn[E] = !0;
        var P = "";
        a && a._owner && a._owner !== Et.current && (P = " It was passed a child from " + M(a._owner.type) + "."), je(a), v('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', E, P), je(null);
      }
    }
    function ln(a, h) {
      {
        if (typeof a != "object")
          return;
        if (xt(a))
          for (var E = 0; E < a.length; E++) {
            var P = a[E];
            Ot(P) && rn(P, h);
          }
        else if (Ot(a))
          a._store && (a._store.validated = !0);
        else if (a) {
          var k = d(a);
          if (typeof k == "function" && k !== a.entries)
            for (var _ = k.call(a), C; !(C = _.next()).done; )
              Ot(C.value) && rn(C.value, h);
        }
      }
    }
    function vr(a) {
      {
        var h = a.type;
        if (h == null || typeof h == "string")
          return;
        var E;
        if (typeof h == "function")
          E = h.propTypes;
        else if (typeof h == "object" && (h.$$typeof === i || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        h.$$typeof === w))
          E = h.propTypes;
        else
          return;
        if (E) {
          var P = M(h);
          nr(E, a.props, "prop", P, a);
        } else if (h.PropTypes !== void 0 && !Tt) {
          Tt = !0;
          var k = M(h);
          v("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", k || "Unknown");
        }
        typeof h.getDefaultProps == "function" && !h.getDefaultProps.isReactClassApproved && v("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function gr(a) {
      {
        for (var h = Object.keys(a.props), E = 0; E < h.length; E++) {
          var P = h[E];
          if (P !== "children" && P !== "key") {
            je(a), v("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", P), je(null);
            break;
          }
        }
        a.ref !== null && (je(a), v("Invalid attribute `ref` supplied to `React.Fragment`."), je(null));
      }
    }
    var an = {};
    function on(a, h, E, P, k, _) {
      {
        var C = H(a);
        if (!C) {
          var S = "";
          (a === void 0 || typeof a == "object" && a !== null && Object.keys(a).length === 0) && (S += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var K = mr();
          K ? S += K : S += tn();
          var D;
          a === null ? D = "null" : xt(a) ? D = "array" : a !== void 0 && a.$$typeof === t ? (D = "<" + (M(a.type) || "Unknown") + " />", S = " Did you accidentally export a JSX literal instead of a component?") : D = typeof a, v("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", D, S);
        }
        var W = pr(a, h, E, k, _);
        if (W == null)
          return W;
        if (C) {
          var re = h.children;
          if (re !== void 0)
            if (P)
              if (xt(re)) {
                for (var _e = 0; _e < re.length; _e++)
                  ln(re[_e], a);
                Object.freeze && Object.freeze(re);
              } else
                v("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              ln(re, a);
        }
        if (Ne.call(h, "key")) {
          var Re = M(a), J = Object.keys(h).filter(function(Tr) {
            return Tr !== "key";
          }), Pt = J.length > 0 ? "{key: someKey, " + J.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!an[Re + Pt]) {
            var Er = J.length > 0 ? "{" + J.join(": ..., ") + ": ...}" : "{}";
            v(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Pt, Re, Er, Re), an[Re + Pt] = !0;
          }
        }
        return a === r ? gr(W) : vr(W), W;
      }
    }
    function wr(a, h, E) {
      return on(a, h, E, !0);
    }
    function yr(a, h, E) {
      return on(a, h, E, !1);
    }
    var br = yr, xr = wr;
    Ue.Fragment = r, Ue.jsx = br, Ue.jsxs = xr;
  }()), Ue;
}
process.env.NODE_ENV === "production" ? Ct.exports = Lr() : Ct.exports = Ir();
var R = Ct.exports;
function Nr(e, t) {
  return Array.isArray(e) ? e.filter((n) => !t.includes(n)) : Object.keys(e).reduce((n, r) => (t.includes(r) || (n[r] = e[r]), n), {});
}
function bn(e, t) {
  return Array.isArray(e) ? e.filter((n) => t.includes(n)) : t.reduce((n, r) => (r in e && (n[r] = e[r]), n), {});
}
function Dr(e) {
  return Array.isArray(e) ? e.filter((t) => t !== null) : Object.keys(e).reduce((t, n) => (n in e && e[n] !== null && (t[n] = e[n]), t), {});
}
function Wr(e, t = 3, n = 10) {
  return new Promise((r, l) => {
    const o = e();
    if (o) {
      r(o);
      return;
    }
    let u = t * 1e3 / n;
    const s = setInterval(() => {
      const i = e();
      i && (clearInterval(s), r(i)), --u <= 0 && (clearInterval(s), l(new Error("Condition not met in time")));
    }, n);
  });
}
function He(e) {
  return e ? (e = e.replace(/_/g, "-"), e = e.replace(/-+/g, "-"), /[A-Z]/.test(e) ? (e = e.replace(/\s+/g, "").replace(/_/g, "").replace(/(?:^|\s|-)+([A-Za-z])/g, (t, n) => n.toUpperCase()), e = e.replace(/(.)(?=[A-Z])/g, "$1-"), e.toLowerCase()) : e) : "";
}
const ct = ae(null);
ct.displayName = "ModalStackContext";
let xn = null, En = null, qe = null, $t = null, Ft = [];
const Ur = ({ children: e }) => {
  const [t, n] = V([]), [r, l] = V({}), o = (f) => {
    n((d) => {
      const m = f([...d]), v = (x) => {
        var T;
        return m.length < 2 ? !0 : ((T = m.map((F) => ({ id: F.id, shouldRender: F.shouldRender })).reverse().find((F) => F.shouldRender)) == null ? void 0 : T.id) === x;
      };
      return m.forEach((x, T) => {
        m[T].onTopOfStack = v(x.id), m[T].getParentModal = () => T < 1 ? null : m.slice(0, T).reverse().find((F) => F.isOpen), m[T].getChildModal = () => T === m.length - 1 ? null : m.slice(T + 1).find((F) => F.isOpen);
      }), m;
    });
  };
  L(() => {
    Ft = t;
  }, [t]);
  class u {
    constructor(d, m, v, x, T) {
      le(this, "update", (d, m, v) => {
        o(
          (x) => x.map((T) => (T.id === this.id && (T.config = d, T.onCloseCallback = m, T.afterLeaveCallback = v), T))
        );
      });
      le(this, "show", () => {
        o(
          (d) => d.map((m) => (m.id === this.id && !m.isOpen && (m.isOpen = !0, m.shouldRender = !0), m))
        );
      });
      le(this, "setOpen", (d) => {
        d ? this.show() : this.close();
      });
      le(this, "close", () => {
        o(
          (d) => d.map((m) => {
            var v;
            return m.id === this.id && m.isOpen && (Object.keys(m.listeners).forEach((x) => {
              m.off(x);
            }), m.isOpen = !1, (v = m.onCloseCallback) == null || v.call(m)), m;
          })
        );
      });
      le(this, "afterLeave", () => {
        this.isOpen || o((d) => {
          const m = d.map((v) => {
            var x;
            return v.id === this.id && !v.isOpen && (v.shouldRender = !1, (x = v.afterLeaveCallback) == null || x.call(v), v.afterLeaveCallback = null), v;
          });
          return this.index === 0 ? [] : m;
        });
      });
      le(this, "on", (d, m) => {
        d = He(d), this.listeners[d] = this.listeners[d] ?? [], this.listeners[d].push(m);
      });
      le(this, "off", (d, m) => {
        var v;
        d = He(d), m ? this.listeners[d] = ((v = this.listeners[d]) == null ? void 0 : v.filter((x) => x !== m)) ?? [] : delete this.listeners[d];
      });
      le(this, "emit", (d, ...m) => {
        var v;
        (v = this.listeners[He(d)]) == null || v.forEach((x) => x(...m));
      });
      le(this, "registerEventListenersFromProps", (d) => {
        const m = [];
        return Object.keys(d).filter((v) => v.startsWith("on")).forEach((v) => {
          const x = He(v).replace(/^on-/, "");
          this.on(x, d[v]), m.push(() => this.off(x, d[v]));
        }), () => m.forEach((v) => v());
      });
      le(this, "reload", (d = {}) => {
        var v;
        let m = Object.keys(this.response.props);
        d.only && (m = bn(m, d.only)), d.except && (m = Nr(m, d.except)), (v = this.response) != null && v.url && lt.get(this.response.url, {
          headers: {
            Accept: "text/html, application/xhtml+xml",
            "X-Inertia": !0,
            "X-Inertia-Partial-Component": this.response.component,
            "X-Inertia-Version": this.response.version,
            "X-Inertia-Partial-Data": m.join(","),
            "X-InertiaUI-Modal": !0,
            "X-InertiaUI-Modal-Use-Router": 0,
            "X-InertiaUI-Modal-Base-Url": qe
          }
        }).then((x) => {
          this.updateProps(x.data.props);
        });
      });
      le(this, "updateProps", (d) => {
        Object.assign(this.props, d), o((m) => m);
      });
      this.id = u.generateId(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = d, this.props = m.props, this.response = m, this.config = v, this.onCloseCallback = x, this.afterLeaveCallback = T, this.index = -1, this.getParentModal = () => null, this.getChildModal = () => null, this.onTopOfStack = !0;
    }
    static generateId() {
      return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `inertiaui_modal_${crypto.randomUUID()}` : `inertiaui_modal_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
    }
  }
  const s = (f, d = {}, m = null, v = null) => En(f.component).then((x) => i(x, f, d, m, v)), i = (f, d, m, v, x) => {
    const T = new u(f, d, m, v, x);
    return T.index = t.length, o((F) => [...F, T]), T.show(), T;
  };
  function p(f, d, m, v) {
    if (!r[f])
      throw new Error(`The local modal "${f}" has not been registered.`);
    const x = i(null, {}, d, m, v);
    return x.name = f, r[f].callback(x), x;
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
    d.navigate ?? Nt("navigate")
  ).then((m) => {
    const v = d.listeners ?? {};
    return Object.keys(v).forEach((x) => {
      const T = He(x);
      m.on(T, v[x]);
    }), m;
  }), w = (f, d, m = {}, v = {}, x = {}, T = null, F = null, X = "brackets", U = !1) => new Promise((ee, te) => {
    if (f.startsWith("#")) {
      ee(p(f.substring(1), x, T, F));
      return;
    }
    const [H, q] = _r(d, f || "", m, X);
    let G = U && t.length === 0;
    if (t.length === 0 && (qe = typeof window < "u" ? window.location.href : ""), v = {
      ...v,
      Accept: "text/html, application/xhtml+xml",
      "X-Requested-With": "XMLHttpRequest",
      "X-Inertia": !0,
      "X-Inertia-Version": xn,
      "X-InertiaUI-Modal": !0,
      "X-InertiaUI-Modal-Use-Router": G ? 1 : 0,
      "X-InertiaUI-Modal-Base-Url": qe
    }, G)
      return $t = null, Ve.visit(H, {
        method: d,
        data: q,
        headers: v,
        preserveScroll: !0,
        preserveState: !0,
        onError: te,
        onFinish: () => {
          Wr(() => $t).then((M) => {
            const $ = M.onCloseCallback, I = M.afterLeaveCallback;
            M.update(
              x,
              () => {
                T == null || T(), $ == null || $();
              },
              () => {
                F == null || F(), I == null || I();
              }
            ), ee(M);
          });
        }
      });
    lt({
      url: H,
      method: d,
      data: q,
      headers: v
    }).then((M) => ee(s(M.data, x, T, F))).catch((M) => {
      te(M);
    });
  }), g = {
    stack: t,
    localModals: r,
    push: i,
    pushFromResponseData: s,
    closeAll: () => {
      Ft.reverse().forEach((f) => f.close());
    },
    reset: () => o(() => []),
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
  return /* @__PURE__ */ R.jsx(ct.Provider, { value: g, children: e });
}, dt = () => {
  const e = Z(ct);
  if (e === null)
    throw new Error("useModalStack must be used within a ModalStackProvider");
  return e;
}, cn = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], Hr = (e) => {
  e.initialPage && (xn = e.initialPage.version), e.resolveComponent && (En = e.resolveComponent);
}, Ha = (e, t) => {
  Hr(t);
  const n = ({ Component: r, props: l, key: o }) => {
    const u = () => {
      const s = rt(r, { key: o, ...l });
      return typeof r.layout == "function" ? r.layout(s) : Array.isArray(r.layout) ? r.layout.concat(s).reverse().reduce((p, c) => rt(c, l, p)) : s;
    };
    return /* @__PURE__ */ R.jsxs(R.Fragment, { children: [
      u(),
      /* @__PURE__ */ R.jsx(Br, {})
    ] });
  };
  return /* @__PURE__ */ R.jsx(Ur, { children: /* @__PURE__ */ R.jsx(e, { ...t, children: n }) });
}, Br = ({ children: e }) => {
  var s;
  const t = Z(ct);
  let n = !1, r = !1;
  L(() => Ve.on("start", () => n = !0), []), L(() => Ve.on("finish", () => n = !1), []), L(
    () => Ve.on("navigate", function(i) {
      const p = i.detail.page.props._inertiaui_modal;
      if (!p) {
        r && t.closeAll();
        return;
      }
      r = p, qe = p.baseUrl, t.pushFromResponseData(p, {}, () => {
        if (!p.baseUrl) {
          console.error("No base url in modal response data so cannot navigate back");
          return;
        }
        !n && window.location.href !== p.baseUrl && Ve.visit(p.baseUrl, {
          preserveScroll: !0,
          preserveState: !0
        });
      }).then((c) => {
        $t = c;
      });
    }),
    []
  );
  const l = (i) => (Ft.length && (i.headers["X-InertiaUI-Modal-Base-Url"] = qe), i);
  L(() => (lt.interceptors.request.use(l), () => lt.interceptors.request.eject(l)), []);
  const o = jr(), u = j();
  return L(() => {
    var c, w;
    const i = (c = o.props) == null ? void 0 : c._inertiaui_modal, p = u.current;
    u.current = i, i && p && i.component === p.component && i.url === p.url && ((w = t.stack[0]) == null || w.updateProps(i.props ?? {}));
  }, [(s = o.props) == null ? void 0 : s._inertiaui_modal]), /* @__PURE__ */ R.jsxs(R.Fragment, { children: [
    e,
    t.stack.length > 0 && /* @__PURE__ */ R.jsx(On, { index: 0 })
  ] });
}, Dt = O.createContext(null);
Dt.displayName = "ModalIndexContext";
const Tn = () => {
  const e = O.useContext(Dt);
  if (e === void 0)
    throw new Error("useModalIndex must be used within a ModalIndexProvider");
  return e;
}, On = ({ index: e }) => {
  const { stack: t } = dt(), n = B(() => t[e], [t, e]);
  return (n == null ? void 0 : n.component) && /* @__PURE__ */ R.jsx(Dt.Provider, { value: e, children: /* @__PURE__ */ R.jsx(
    n.component,
    {
      ...n.props,
      onModalEvent: (...r) => n.emit(...r)
    }
  ) });
}, Pn = It(({ name: e, children: t, ...n }, r) => {
  const l = Tn(), { stack: o, registerLocalModal: u, removeLocalModal: s } = dt(), [i, p] = V(null), c = B(() => e ? i : o[l], [e, i, l, o]), w = B(() => {
    var f;
    return (f = o.find((d) => d.shouldRender && d.index > (c == null ? void 0 : c.index))) == null ? void 0 : f.index;
  }, [l, o]), b = B(() => (c == null ? void 0 : c.config.slideover) ?? n.slideover ?? Nt("type") === "slideover", [n.slideover]), y = B(
    () => ({
      slideover: b,
      closeButton: n.closeButton ?? Me(b, "closeButton"),
      closeExplicitly: n.closeExplicitly ?? Me(b, "closeExplicitly"),
      maxWidth: n.maxWidth ?? Me(b, "maxWidth"),
      paddingClasses: n.paddingClasses ?? Me(b, "paddingClasses"),
      panelClasses: n.panelClasses ?? Me(b, "panelClasses"),
      position: n.position ?? Me(b, "position"),
      ...c == null ? void 0 : c.config
    }),
    [n, c == null ? void 0 : c.config]
  );
  L(() => {
    if (e) {
      let f = null;
      return u(e, (d) => {
        f = d.registerEventListenersFromProps(n), p(d);
      }), () => {
        f == null || f(), f = null, s(e);
      };
    }
    return c.registerEventListenersFromProps(n);
  }, [e]);
  const g = j(c);
  return L(() => {
    g.current = c;
  }, [c]), yn(
    r,
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
    w && /* @__PURE__ */ R.jsx(On, { index: w })
  ] });
});
Pn.displayName = "HeadlessModal";
function Rn(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var l = e.length;
    for (t = 0; t < l; t++) e[t] && (n = Rn(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function at() {
  for (var e, t, n = 0, r = "", l = arguments.length; n < l; n++) (e = arguments[n]) && (t = Rn(e)) && (r && (r += " "), r += t);
  return r;
}
var Vr = Object.defineProperty, Yr = (e, t, n) => t in e ? Vr(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Rt = (e, t, n) => (Yr(e, typeof t != "symbol" ? t + "" : t, n), n);
let Xr = class {
  constructor() {
    Rt(this, "current", this.detect()), Rt(this, "handoffState", "pending"), Rt(this, "currentId", 0);
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
}, Fe = new Xr();
function ft(e) {
  return Fe.isServer ? null : e instanceof Node ? e.ownerDocument : e != null && e.hasOwnProperty("current") && e.current instanceof Node ? e.current.ownerDocument : document;
}
function pt(e) {
  typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch((t) => setTimeout(() => {
    throw t;
  }));
}
function ye() {
  let e = [], t = { addEventListener(n, r, l, o) {
    return n.addEventListener(r, l, o), t.add(() => n.removeEventListener(r, l, o));
  }, requestAnimationFrame(...n) {
    let r = requestAnimationFrame(...n);
    return t.add(() => cancelAnimationFrame(r));
  }, nextFrame(...n) {
    return t.requestAnimationFrame(() => t.requestAnimationFrame(...n));
  }, setTimeout(...n) {
    let r = setTimeout(...n);
    return t.add(() => clearTimeout(r));
  }, microTask(...n) {
    let r = { current: !0 };
    return pt(() => {
      r.current && n[0]();
    }), t.add(() => {
      r.current = !1;
    });
  }, style(n, r, l) {
    let o = n.style.getPropertyValue(r);
    return Object.assign(n.style, { [r]: l }), this.add(() => {
      Object.assign(n.style, { [r]: o });
    });
  }, group(n) {
    let r = ye();
    return n(r), this.add(() => r.dispose());
  }, add(n) {
    return e.includes(n) || e.push(n), () => {
      let r = e.indexOf(n);
      if (r >= 0) for (let l of e.splice(r, 1)) l();
    };
  }, dispose() {
    for (let n of e.splice(0)) n();
  } };
  return t;
}
function Wt() {
  let [e] = V(ye);
  return L(() => () => e.dispose(), [e]), e;
}
let z = (e, t) => {
  Fe.isServer ? L(e, t) : Rr(e, t);
};
function ke(e) {
  let t = j(e);
  return z(() => {
    t.current = e;
  }, [e]), t;
}
let A = function(e) {
  let t = ke(e);
  return O.useCallback((...n) => t.current(...n), [t]);
}, qr = ae(void 0);
function Kr() {
  return Z(qr);
}
function kt(...e) {
  return Array.from(new Set(e.flatMap((t) => typeof t == "string" ? t.split(" ") : []))).filter(Boolean).join(" ");
}
function we(e, t, ...n) {
  if (e in t) {
    let l = t[e];
    return typeof l == "function" ? l(...n) : l;
  }
  let r = new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map((l) => `"${l}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(r, we), r;
}
var it = ((e) => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(it || {}), ge = ((e) => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(ge || {});
function ie() {
  let e = Gr();
  return oe((t) => zr({ mergeRefs: e, ...t }), [e]);
}
function zr({ ourProps: e, theirProps: t, slot: n, defaultTag: r, features: l, visible: o = !0, name: u, mergeRefs: s }) {
  s = s ?? Jr;
  let i = Sn(t, e);
  if (o) return nt(i, n, r, u, s);
  let p = l ?? 0;
  if (p & 2) {
    let { static: c = !1, ...w } = i;
    if (c) return nt(w, n, r, u, s);
  }
  if (p & 1) {
    let { unmount: c = !0, ...w } = i;
    return we(c ? 0 : 1, { 0() {
      return null;
    }, 1() {
      return nt({ ...w, hidden: !0, style: { display: "none" } }, n, r, u, s);
    } });
  }
  return nt(i, n, r, u, s);
}
function nt(e, t = {}, n, r, l) {
  let { as: o = n, children: u, refName: s = "ref", ...i } = St(e, ["unmount", "static"]), p = e.ref !== void 0 ? { [s]: e.ref } : {}, c = typeof u == "function" ? u(t) : u;
  "className" in i && i.className && typeof i.className == "function" && (i.className = i.className(t)), i["aria-labelledby"] && i["aria-labelledby"] === i.id && (i["aria-labelledby"] = void 0);
  let w = {};
  if (t) {
    let b = !1, y = [];
    for (let [g, f] of Object.entries(t)) typeof f == "boolean" && (b = !0), f === !0 && y.push(g.replace(/([A-Z])/g, (d) => `-${d.toLowerCase()}`));
    if (b) {
      w["data-headlessui-state"] = y.join(" ");
      for (let g of y) w[`data-${g}`] = "";
    }
  }
  if (o === se && (Object.keys(Se(i)).length > 0 || Object.keys(Se(w)).length > 0)) if (!Sr(c) || Array.isArray(c) && c.length > 1) {
    if (Object.keys(Se(i)).length > 0) throw new Error(['Passing props on "Fragment"!', "", `The current component <${r} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(Se(i)).concat(Object.keys(Se(w))).map((b) => `  - ${b}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((b) => `  - ${b}`).join(`
`)].join(`
`));
  } else {
    let b = c.props, y = b == null ? void 0 : b.className, g = typeof y == "function" ? (...m) => kt(y(...m), i.className) : kt(y, i.className), f = g ? { className: g } : {}, d = Sn(c.props, Se(St(i, ["ref"])));
    for (let m in w) m in d && delete w[m];
    return Cr(c, Object.assign({}, d, w, p, { ref: l(Zr(c), p.ref) }, f));
  }
  return rt(o, Object.assign({}, St(i, ["ref"]), o !== se && p, o !== se && w), c);
}
function Gr() {
  let e = j([]), t = oe((n) => {
    for (let r of e.current) r != null && (typeof r == "function" ? r(n) : r.current = n);
  }, []);
  return (...n) => {
    if (!n.every((r) => r == null)) return e.current = n, t;
  };
}
function Jr(...e) {
  return e.every((t) => t == null) ? void 0 : (t) => {
    for (let n of e) n != null && (typeof n == "function" ? n(t) : n.current = t);
  };
}
function Sn(...e) {
  if (e.length === 0) return {};
  if (e.length === 1) return e[0];
  let t = {}, n = {};
  for (let r of e) for (let l in r) l.startsWith("on") && typeof r[l] == "function" ? (n[l] != null || (n[l] = []), n[l].push(r[l])) : t[l] = r[l];
  if (t.disabled || t["aria-disabled"]) for (let r in n) /^(on(?:Click|Pointer|Mouse|Key)(?:Down|Up|Press)?)$/.test(r) && (n[r] = [(l) => {
    var o;
    return (o = l == null ? void 0 : l.preventDefault) == null ? void 0 : o.call(l);
  }]);
  for (let r in n) Object.assign(t, { [r](l, ...o) {
    let u = n[r];
    for (let s of u) {
      if ((l instanceof Event || (l == null ? void 0 : l.nativeEvent) instanceof Event) && l.defaultPrevented) return;
      s(l, ...o);
    }
  } });
  return t;
}
function Q(e) {
  var t;
  return Object.assign(It(e), { displayName: (t = e.displayName) != null ? t : e.name });
}
function Se(e) {
  let t = Object.assign({}, e);
  for (let n in t) t[n] === void 0 && delete t[n];
  return t;
}
function St(e, t = []) {
  let n = Object.assign({}, e);
  for (let r of t) r in n && delete n[r];
  return n;
}
function Zr(e) {
  return O.version.split(".")[0] >= "19" ? e.props.ref : e.ref;
}
let Qr = "span";
var ot = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(ot || {});
function el(e, t) {
  var n;
  let { features: r = 1, ...l } = e, o = { ref: t, "aria-hidden": (r & 2) === 2 ? !0 : (n = l["aria-hidden"]) != null ? n : void 0, hidden: (r & 4) === 4 ? !0 : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(r & 4) === 4 && (r & 2) !== 2 && { display: "none" } } };
  return ie()({ ourProps: o, theirProps: l, slot: {}, defaultTag: Qr, name: "Hidden" });
}
let jt = Q(el), Cn = Symbol();
function tl(e, t = !0) {
  return Object.assign(e, { [Cn]: t });
}
function ce(...e) {
  let t = j(e);
  L(() => {
    t.current = e;
  }, [e]);
  let n = A((r) => {
    for (let l of t.current) l != null && (typeof l == "function" ? l(r) : l.current = r);
  });
  return e.every((r) => r == null || (r == null ? void 0 : r[Cn])) ? void 0 : n;
}
let Ut = ae(null);
Ut.displayName = "DescriptionContext";
function $n() {
  let e = Z(Ut);
  if (e === null) {
    let t = new Error("You used a <Description /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(t, $n), t;
  }
  return e;
}
function nl() {
  let [e, t] = V([]);
  return [e.length > 0 ? e.join(" ") : void 0, B(() => function(n) {
    let r = A((o) => (t((u) => [...u, o]), () => t((u) => {
      let s = u.slice(), i = s.indexOf(o);
      return i !== -1 && s.splice(i, 1), s;
    }))), l = B(() => ({ register: r, slot: n.slot, name: n.name, props: n.props, value: n.value }), [r, n.slot, n.name, n.props, n.value]);
    return O.createElement(Ut.Provider, { value: l }, n.children);
  }, [t])];
}
let rl = "p";
function ll(e, t) {
  let n = Ge(), r = Kr(), { id: l = `headlessui-description-${n}`, ...o } = e, u = $n(), s = ce(t);
  z(() => u.register(l), [l, u.register]);
  let i = r || !1, p = B(() => ({ ...u.slot, disabled: i }), [u.slot, i]), c = { ref: s, ...u.props, id: l };
  return ie()({ ourProps: c, theirProps: o, slot: p, defaultTag: rl, name: u.name || "Description" });
}
let al = Q(ll), il = Object.assign(al, {});
var Fn = ((e) => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(Fn || {});
let ol = ae(() => {
});
function ul({ value: e, children: t }) {
  return O.createElement(ol.Provider, { value: e }, t);
}
let sl = class extends Map {
  constructor(t) {
    super(), this.factory = t;
  }
  get(t) {
    let n = super.get(t);
    return n === void 0 && (n = this.factory(t), this.set(t, n)), n;
  }
};
function kn(e, t) {
  let n = e(), r = /* @__PURE__ */ new Set();
  return { getSnapshot() {
    return n;
  }, subscribe(l) {
    return r.add(l), () => r.delete(l);
  }, dispatch(l, ...o) {
    let u = t[l].call(n, ...o);
    u && (n = u, r.forEach((s) => s()));
  } };
}
function jn(e) {
  return $r(e.subscribe, e.getSnapshot, e.getSnapshot);
}
let cl = new sl(() => kn(() => [], { ADD(e) {
  return this.includes(e) ? this : [...this, e];
}, REMOVE(e) {
  let t = this.indexOf(e);
  if (t === -1) return this;
  let n = this.slice();
  return n.splice(t, 1), n;
} }));
function Ae(e, t) {
  let n = cl.get(t), r = Ge(), l = jn(n);
  if (z(() => {
    if (e) return n.dispatch("ADD", r), () => n.dispatch("REMOVE", r);
  }, [n, e]), !e) return !1;
  let o = l.indexOf(r), u = l.length;
  return o === -1 && (o = u, u += 1), o === u - 1;
}
let _t = /* @__PURE__ */ new Map(), Ke = /* @__PURE__ */ new Map();
function dn(e) {
  var t;
  let n = (t = Ke.get(e)) != null ? t : 0;
  return Ke.set(e, n + 1), n !== 0 ? () => fn(e) : (_t.set(e, { "aria-hidden": e.getAttribute("aria-hidden"), inert: e.inert }), e.setAttribute("aria-hidden", "true"), e.inert = !0, () => fn(e));
}
function fn(e) {
  var t;
  let n = (t = Ke.get(e)) != null ? t : 1;
  if (n === 1 ? Ke.delete(e) : Ke.set(e, n - 1), n !== 1) return;
  let r = _t.get(e);
  r && (r["aria-hidden"] === null ? e.removeAttribute("aria-hidden") : e.setAttribute("aria-hidden", r["aria-hidden"]), e.inert = r.inert, _t.delete(e));
}
function dl(e, { allowed: t, disallowed: n } = {}) {
  let r = Ae(e, "inert-others");
  z(() => {
    var l, o;
    if (!r) return;
    let u = ye();
    for (let i of (l = n == null ? void 0 : n()) != null ? l : []) i && u.add(dn(i));
    let s = (o = t == null ? void 0 : t()) != null ? o : [];
    for (let i of s) {
      if (!i) continue;
      let p = ft(i);
      if (!p) continue;
      let c = i.parentElement;
      for (; c && c !== p.body; ) {
        for (let w of c.children) s.some((b) => w.contains(b)) || u.add(dn(w));
        c = c.parentElement;
      }
    }
    return u.dispose;
  }, [r, t, n]);
}
function fl(e, t, n) {
  let r = ke((l) => {
    let o = l.getBoundingClientRect();
    o.x === 0 && o.y === 0 && o.width === 0 && o.height === 0 && n();
  });
  L(() => {
    if (!e) return;
    let l = t === null ? null : t instanceof HTMLElement ? t : t.current;
    if (!l) return;
    let o = ye();
    if (typeof ResizeObserver < "u") {
      let u = new ResizeObserver(() => r.current(l));
      u.observe(l), o.add(() => u.disconnect());
    }
    if (typeof IntersectionObserver < "u") {
      let u = new IntersectionObserver(() => r.current(l));
      u.observe(l), o.add(() => u.disconnect());
    }
    return () => o.dispose();
  }, [t, r, e]);
}
let ut = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e) => `${e}:not([tabindex='-1'])`).join(","), pl = ["[data-autofocus]"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var pe = ((e) => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e[e.AutoFocus = 64] = "AutoFocus", e))(pe || {}), Mt = ((e) => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(Mt || {}), ml = ((e) => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(ml || {});
function hl(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(ut)).sort((t, n) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (n.tabIndex || Number.MAX_SAFE_INTEGER)));
}
function vl(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(pl)).sort((t, n) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (n.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var _n = ((e) => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(_n || {});
function gl(e, t = 0) {
  var n;
  return e === ((n = ft(e)) == null ? void 0 : n.body) ? !1 : we(t, { 0() {
    return e.matches(ut);
  }, 1() {
    let r = e;
    for (; r !== null; ) {
      if (r.matches(ut)) return !0;
      r = r.parentElement;
    }
    return !1;
  } });
}
var wl = ((e) => (e[e.Keyboard = 0] = "Keyboard", e[e.Mouse = 1] = "Mouse", e))(wl || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (e) => {
  e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (e) => {
  e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
function me(e) {
  e == null || e.focus({ preventScroll: !0 });
}
let yl = ["textarea", "input"].join(",");
function bl(e) {
  var t, n;
  return (n = (t = e == null ? void 0 : e.matches) == null ? void 0 : t.call(e, yl)) != null ? n : !1;
}
function xl(e, t = (n) => n) {
  return e.slice().sort((n, r) => {
    let l = t(n), o = t(r);
    if (l === null || o === null) return 0;
    let u = l.compareDocumentPosition(o);
    return u & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : u & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function ze(e, t, { sorted: n = !0, relativeTo: r = null, skipElements: l = [] } = {}) {
  let o = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : document : e.ownerDocument, u = Array.isArray(e) ? n ? xl(e) : e : t & 64 ? vl(e) : hl(e);
  l.length > 0 && u.length > 1 && (u = u.filter((y) => !l.some((g) => g != null && "current" in g ? (g == null ? void 0 : g.current) === y : g === y))), r = r ?? o.activeElement;
  let s = (() => {
    if (t & 5) return 1;
    if (t & 10) return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), i = (() => {
    if (t & 1) return 0;
    if (t & 2) return Math.max(0, u.indexOf(r)) - 1;
    if (t & 4) return Math.max(0, u.indexOf(r)) + 1;
    if (t & 8) return u.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), p = t & 32 ? { preventScroll: !0 } : {}, c = 0, w = u.length, b;
  do {
    if (c >= w || c + w <= 0) return 0;
    let y = i + c;
    if (t & 16) y = (y + w) % w;
    else {
      if (y < 0) return 3;
      if (y >= w) return 1;
    }
    b = u[y], b == null || b.focus(p), c += s;
  } while (b !== o.activeElement);
  return t & 6 && bl(b) && b.select(), 2;
}
function Mn() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function El() {
  return /Android/gi.test(window.navigator.userAgent);
}
function Tl() {
  return Mn() || El();
}
function Be(e, t, n, r) {
  let l = ke(n);
  L(() => {
    if (!e) return;
    function o(u) {
      l.current(u);
    }
    return document.addEventListener(t, o, r), () => document.removeEventListener(t, o, r);
  }, [e, t, r]);
}
function An(e, t, n, r) {
  let l = ke(n);
  L(() => {
    if (!e) return;
    function o(u) {
      l.current(u);
    }
    return window.addEventListener(t, o, r), () => window.removeEventListener(t, o, r);
  }, [e, t, r]);
}
const pn = 30;
function Ol(e, t, n) {
  let r = Ae(e, "outside-click"), l = ke(n), o = oe(function(i, p) {
    if (i.defaultPrevented) return;
    let c = p(i);
    if (c === null || !c.getRootNode().contains(c) || !c.isConnected) return;
    let w = function b(y) {
      return typeof y == "function" ? b(y()) : Array.isArray(y) || y instanceof Set ? y : [y];
    }(t);
    for (let b of w) if (b !== null && (b.contains(c) || i.composed && i.composedPath().includes(b))) return;
    return !gl(c, _n.Loose) && c.tabIndex !== -1 && i.preventDefault(), l.current(i, c);
  }, [l, t]), u = j(null);
  Be(r, "pointerdown", (i) => {
    var p, c;
    u.current = ((c = (p = i.composedPath) == null ? void 0 : p.call(i)) == null ? void 0 : c[0]) || i.target;
  }, !0), Be(r, "mousedown", (i) => {
    var p, c;
    u.current = ((c = (p = i.composedPath) == null ? void 0 : p.call(i)) == null ? void 0 : c[0]) || i.target;
  }, !0), Be(r, "click", (i) => {
    Tl() || u.current && (o(i, () => u.current), u.current = null);
  }, !0);
  let s = j({ x: 0, y: 0 });
  Be(r, "touchstart", (i) => {
    s.current.x = i.touches[0].clientX, s.current.y = i.touches[0].clientY;
  }, !0), Be(r, "touchend", (i) => {
    let p = { x: i.changedTouches[0].clientX, y: i.changedTouches[0].clientY };
    if (!(Math.abs(p.x - s.current.x) >= pn || Math.abs(p.y - s.current.y) >= pn)) return o(i, () => i.target instanceof HTMLElement ? i.target : null);
  }, !0), An(r, "blur", (i) => o(i, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), !0);
}
function Je(...e) {
  return B(() => ft(...e), [...e]);
}
function Ln(e, t, n, r) {
  let l = ke(n);
  L(() => {
    e = e ?? window;
    function o(u) {
      l.current(u);
    }
    return e.addEventListener(t, o, r), () => e.removeEventListener(t, o, r);
  }, [e, t, r]);
}
function Pl() {
  let e;
  return { before({ doc: t }) {
    var n;
    let r = t.documentElement, l = (n = t.defaultView) != null ? n : window;
    e = Math.max(0, l.innerWidth - r.clientWidth);
  }, after({ doc: t, d: n }) {
    let r = t.documentElement, l = Math.max(0, r.clientWidth - r.offsetWidth), o = Math.max(0, e - l);
    n.style(r, "paddingRight", `${o}px`);
  } };
}
function Rl() {
  return Mn() ? { before({ doc: e, d: t, meta: n }) {
    function r(l) {
      return n.containers.flatMap((o) => o()).some((o) => o.contains(l));
    }
    t.microTask(() => {
      var l;
      if (window.getComputedStyle(e.documentElement).scrollBehavior !== "auto") {
        let s = ye();
        s.style(e.documentElement, "scrollBehavior", "auto"), t.add(() => t.microTask(() => s.dispose()));
      }
      let o = (l = window.scrollY) != null ? l : window.pageYOffset, u = null;
      t.addEventListener(e, "click", (s) => {
        if (s.target instanceof HTMLElement) try {
          let i = s.target.closest("a");
          if (!i) return;
          let { hash: p } = new URL(i.href), c = e.querySelector(p);
          c && !r(c) && (u = c);
        } catch {
        }
      }, !0), t.addEventListener(e, "touchstart", (s) => {
        if (s.target instanceof HTMLElement) if (r(s.target)) {
          let i = s.target;
          for (; i.parentElement && r(i.parentElement); ) i = i.parentElement;
          t.style(i, "overscrollBehavior", "contain");
        } else t.style(s.target, "touchAction", "none");
      }), t.addEventListener(e, "touchmove", (s) => {
        if (s.target instanceof HTMLElement) {
          if (s.target.tagName === "INPUT") return;
          if (r(s.target)) {
            let i = s.target;
            for (; i.parentElement && i.dataset.headlessuiPortal !== "" && !(i.scrollHeight > i.clientHeight || i.scrollWidth > i.clientWidth); ) i = i.parentElement;
            i.dataset.headlessuiPortal === "" && s.preventDefault();
          } else s.preventDefault();
        }
      }, { passive: !1 }), t.add(() => {
        var s;
        let i = (s = window.scrollY) != null ? s : window.pageYOffset;
        o !== i && window.scrollTo(0, o), u && u.isConnected && (u.scrollIntoView({ block: "nearest" }), u = null);
      });
    });
  } } : {};
}
function Sl() {
  return { before({ doc: e, d: t }) {
    t.style(e.documentElement, "overflow", "hidden");
  } };
}
function Cl(e) {
  let t = {};
  for (let n of e) Object.assign(t, n(t));
  return t;
}
let $e = kn(() => /* @__PURE__ */ new Map(), { PUSH(e, t) {
  var n;
  let r = (n = this.get(e)) != null ? n : { doc: e, count: 0, d: ye(), meta: /* @__PURE__ */ new Set() };
  return r.count++, r.meta.add(t), this.set(e, r), this;
}, POP(e, t) {
  let n = this.get(e);
  return n && (n.count--, n.meta.delete(t)), this;
}, SCROLL_PREVENT({ doc: e, d: t, meta: n }) {
  let r = { doc: e, d: t, meta: Cl(n) }, l = [Rl(), Pl(), Sl()];
  l.forEach(({ before: o }) => o == null ? void 0 : o(r)), l.forEach(({ after: o }) => o == null ? void 0 : o(r));
}, SCROLL_ALLOW({ d: e }) {
  e.dispose();
}, TEARDOWN({ doc: e }) {
  this.delete(e);
} });
$e.subscribe(() => {
  let e = $e.getSnapshot(), t = /* @__PURE__ */ new Map();
  for (let [n] of e) t.set(n, n.documentElement.style.overflow);
  for (let n of e.values()) {
    let r = t.get(n.doc) === "hidden", l = n.count !== 0;
    (l && !r || !l && r) && $e.dispatch(n.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", n), n.count === 0 && $e.dispatch("TEARDOWN", n);
  }
});
function $l(e, t, n = () => ({ containers: [] })) {
  let r = jn($e), l = t ? r.get(t) : void 0, o = l ? l.count > 0 : !1;
  return z(() => {
    if (!(!t || !e)) return $e.dispatch("PUSH", t, n), () => $e.dispatch("POP", t, n);
  }, [e, t]), o;
}
function Fl(e, t, n = () => [document.body]) {
  let r = Ae(e, "scroll-lock");
  $l(r, t, (l) => {
    var o;
    return { containers: [...(o = l.containers) != null ? o : [], n] };
  });
}
function kl(e = 0) {
  let [t, n] = V(e), r = oe((i) => n(i), [t]), l = oe((i) => n((p) => p | i), [t]), o = oe((i) => (t & i) === i, [t]), u = oe((i) => n((p) => p & ~i), [n]), s = oe((i) => n((p) => p ^ i), [n]);
  return { flags: t, setFlag: r, addFlag: l, hasFlag: o, removeFlag: u, toggleFlag: s };
}
var mn, hn;
typeof process < "u" && typeof globalThis < "u" && typeof Element < "u" && ((mn = process == null ? void 0 : process.env) == null ? void 0 : mn.NODE_ENV) === "test" && typeof ((hn = Element == null ? void 0 : Element.prototype) == null ? void 0 : hn.getAnimations) > "u" && (Element.prototype.getAnimations = function() {
  return console.warn(["Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.", "Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.", "", "Example usage:", "```js", "import { mockAnimationsApi } from 'jsdom-testing-mocks'", "mockAnimationsApi()", "```"].join(`
`)), [];
});
var jl = ((e) => (e[e.None = 0] = "None", e[e.Closed = 1] = "Closed", e[e.Enter = 2] = "Enter", e[e.Leave = 4] = "Leave", e))(jl || {});
function _l(e) {
  let t = {};
  for (let n in e) e[n] === !0 && (t[`data-${n}`] = "");
  return t;
}
function Ml(e, t, n, r) {
  let [l, o] = V(n), { hasFlag: u, addFlag: s, removeFlag: i } = kl(e && l ? 3 : 0), p = j(!1), c = j(!1), w = Wt();
  return z(() => {
    var b;
    if (e) {
      if (n && o(!0), !t) {
        n && s(3);
        return;
      }
      return (b = r == null ? void 0 : r.start) == null || b.call(r, n), Al(t, { inFlight: p, prepare() {
        c.current ? c.current = !1 : c.current = p.current, p.current = !0, !c.current && (n ? (s(3), i(4)) : (s(4), i(2)));
      }, run() {
        c.current ? n ? (i(3), s(4)) : (i(4), s(3)) : n ? i(1) : s(1);
      }, done() {
        var y;
        c.current && typeof t.getAnimations == "function" && t.getAnimations().length > 0 || (p.current = !1, i(7), n || o(!1), (y = r == null ? void 0 : r.end) == null || y.call(r, n));
      } });
    }
  }, [e, n, t, w]), e ? [l, { closed: u(1), enter: u(2), leave: u(4), transition: u(2) || u(4) }] : [n, { closed: void 0, enter: void 0, leave: void 0, transition: void 0 }];
}
function Al(e, { prepare: t, run: n, done: r, inFlight: l }) {
  let o = ye();
  return Il(e, { prepare: t, inFlight: l }), o.nextFrame(() => {
    n(), o.requestAnimationFrame(() => {
      o.add(Ll(e, r));
    });
  }), o.dispose;
}
function Ll(e, t) {
  var n, r;
  let l = ye();
  if (!e) return l.dispose;
  let o = !1;
  l.add(() => {
    o = !0;
  });
  let u = (r = (n = e.getAnimations) == null ? void 0 : n.call(e).filter((s) => s instanceof CSSTransition)) != null ? r : [];
  return u.length === 0 ? (t(), l.dispose) : (Promise.allSettled(u.map((s) => s.finished)).then(() => {
    o || t();
  }), l.dispose);
}
function Il(e, { inFlight: t, prepare: n }) {
  if (t != null && t.current) {
    n();
    return;
  }
  let r = e.style.transition;
  e.style.transition = "none", n(), e.offsetHeight, e.style.transition = r;
}
function Ht(e, t) {
  let n = j([]), r = A(e);
  L(() => {
    let l = [...n.current];
    for (let [o, u] of t.entries()) if (n.current[o] !== u) {
      let s = r(t, l);
      return n.current = t, s;
    }
  }, [r, ...t]);
}
let mt = ae(null);
mt.displayName = "OpenClosedContext";
var ue = ((e) => (e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(ue || {});
function ht() {
  return Z(mt);
}
function Nl({ value: e, children: t }) {
  return O.createElement(mt.Provider, { value: e }, t);
}
function Dl({ children: e }) {
  return O.createElement(mt.Provider, { value: null }, e);
}
function Wl(e) {
  function t() {
    document.readyState !== "loading" && (e(), document.removeEventListener("DOMContentLoaded", t));
  }
  typeof window < "u" && typeof document < "u" && (document.addEventListener("DOMContentLoaded", t), t());
}
let ve = [];
Wl(() => {
  function e(t) {
    if (!(t.target instanceof HTMLElement) || t.target === document.body || ve[0] === t.target) return;
    let n = t.target;
    n = n.closest(ut), ve.unshift(n ?? t.target), ve = ve.filter((r) => r != null && r.isConnected), ve.splice(10);
  }
  window.addEventListener("click", e, { capture: !0 }), window.addEventListener("mousedown", e, { capture: !0 }), window.addEventListener("focus", e, { capture: !0 }), document.body.addEventListener("click", e, { capture: !0 }), document.body.addEventListener("mousedown", e, { capture: !0 }), document.body.addEventListener("focus", e, { capture: !0 });
});
function In(e) {
  let t = A(e), n = j(!1);
  L(() => (n.current = !1, () => {
    n.current = !0, pt(() => {
      n.current && t();
    });
  }), [t]);
}
function Ul() {
  let e = typeof document > "u";
  return "useSyncExternalStore" in Xe ? ((t) => t.useSyncExternalStore)(Xe)(() => () => {
  }, () => !1, () => !e) : !1;
}
function Ze() {
  let e = Ul(), [t, n] = Xe.useState(Fe.isHandoffComplete);
  return t && Fe.isHandoffComplete === !1 && n(!1), Xe.useEffect(() => {
    t !== !0 && n(!0);
  }, [t]), Xe.useEffect(() => Fe.handoff(), []), e ? !1 : t;
}
let Nn = ae(!1);
function Hl() {
  return Z(Nn);
}
function vn(e) {
  return O.createElement(Nn.Provider, { value: e.force }, e.children);
}
function Bl(e) {
  let t = Hl(), n = Z(Wn), r = Je(e), [l, o] = V(() => {
    var u;
    if (!t && n !== null) return (u = n.current) != null ? u : null;
    if (Fe.isServer) return null;
    let s = r == null ? void 0 : r.getElementById("headlessui-portal-root");
    if (s) return s;
    if (r === null) return null;
    let i = r.createElement("div");
    return i.setAttribute("id", "headlessui-portal-root"), r.body.appendChild(i);
  });
  return L(() => {
    l !== null && (r != null && r.body.contains(l) || r == null || r.body.appendChild(l));
  }, [l, r]), L(() => {
    t || n !== null && o(n.current);
  }, [n, o, t]), l;
}
let Dn = se, Vl = Q(function(e, t) {
  let n = e, r = j(null), l = ce(tl((w) => {
    r.current = w;
  }), t), o = Je(r), u = Bl(r), [s] = V(() => {
    var w;
    return Fe.isServer ? null : (w = o == null ? void 0 : o.createElement("div")) != null ? w : null;
  }), i = Z(At), p = Ze();
  z(() => {
    !u || !s || u.contains(s) || (s.setAttribute("data-headlessui-portal", ""), u.appendChild(s));
  }, [u, s]), z(() => {
    if (s && i) return i.register(s);
  }, [i, s]), In(() => {
    var w;
    !u || !s || (s instanceof Node && u.contains(s) && u.removeChild(s), u.childNodes.length <= 0 && ((w = u.parentElement) == null || w.removeChild(u)));
  });
  let c = ie();
  return p ? !u || !s ? null : Mr(c({ ourProps: { ref: l }, theirProps: n, slot: {}, defaultTag: Dn, name: "Portal" }), s) : null;
});
function Yl(e, t) {
  let n = ce(t), { enabled: r = !0, ...l } = e, o = ie();
  return r ? O.createElement(Vl, { ...l, ref: n }) : o({ ourProps: { ref: n }, theirProps: l, slot: {}, defaultTag: Dn, name: "Portal" });
}
let Xl = se, Wn = ae(null);
function ql(e, t) {
  let { target: n, ...r } = e, l = { ref: ce(t) }, o = ie();
  return O.createElement(Wn.Provider, { value: n }, o({ ourProps: l, theirProps: r, defaultTag: Xl, name: "Popover.Group" }));
}
let At = ae(null);
function Kl() {
  let e = Z(At), t = j([]), n = A((o) => (t.current.push(o), e && e.register(o), () => r(o))), r = A((o) => {
    let u = t.current.indexOf(o);
    u !== -1 && t.current.splice(u, 1), e && e.unregister(o);
  }), l = B(() => ({ register: n, unregister: r, portals: t }), [n, r, t]);
  return [t, B(() => function({ children: o }) {
    return O.createElement(At.Provider, { value: l }, o);
  }, [l])];
}
let zl = Q(Yl), Un = Q(ql), Gl = Object.assign(zl, { Group: Un });
function Jl(e, t = typeof document < "u" ? document.defaultView : null, n) {
  let r = Ae(e, "escape");
  Ln(t, "keydown", (l) => {
    r && (l.defaultPrevented || l.key === Fn.Escape && n(l));
  });
}
function Zl() {
  var e;
  let [t] = V(() => typeof window < "u" && typeof window.matchMedia == "function" ? window.matchMedia("(pointer: coarse)") : null), [n, r] = V((e = t == null ? void 0 : t.matches) != null ? e : !1);
  return z(() => {
    if (!t) return;
    function l(o) {
      r(o.matches);
    }
    return t.addEventListener("change", l), () => t.removeEventListener("change", l);
  }, [t]), n;
}
function Ql({ defaultContainers: e = [], portals: t, mainTreeNode: n } = {}) {
  let r = Je(n), l = A(() => {
    var o, u;
    let s = [];
    for (let i of e) i !== null && (i instanceof HTMLElement ? s.push(i) : "current" in i && i.current instanceof HTMLElement && s.push(i.current));
    if (t != null && t.current) for (let i of t.current) s.push(i);
    for (let i of (o = r == null ? void 0 : r.querySelectorAll("html > *, body > *")) != null ? o : []) i !== document.body && i !== document.head && i instanceof HTMLElement && i.id !== "headlessui-portal-root" && (n && (i.contains(n) || i.contains((u = n == null ? void 0 : n.getRootNode()) == null ? void 0 : u.host)) || s.some((p) => i.contains(p)) || s.push(i));
    return s;
  });
  return { resolveContainers: l, contains: A((o) => l().some((u) => u.contains(o))) };
}
let Hn = ae(null);
function gn({ children: e, node: t }) {
  let [n, r] = V(null), l = Bn(t ?? n);
  return O.createElement(Hn.Provider, { value: l }, e, l === null && O.createElement(jt, { features: ot.Hidden, ref: (o) => {
    var u, s;
    if (o) {
      for (let i of (s = (u = ft(o)) == null ? void 0 : u.querySelectorAll("html > *, body > *")) != null ? s : []) if (i !== document.body && i !== document.head && i instanceof HTMLElement && i != null && i.contains(o)) {
        r(i);
        break;
      }
    }
  } }));
}
function Bn(e = null) {
  var t;
  return (t = Z(Hn)) != null ? t : e;
}
function Bt() {
  let e = j(!1);
  return z(() => (e.current = !0, () => {
    e.current = !1;
  }), []), e;
}
var Ye = ((e) => (e[e.Forwards = 0] = "Forwards", e[e.Backwards = 1] = "Backwards", e))(Ye || {});
function ea() {
  let e = j(0);
  return An(!0, "keydown", (t) => {
    t.key === "Tab" && (e.current = t.shiftKey ? 1 : 0);
  }, !0), e;
}
function Vn(e) {
  if (!e) return /* @__PURE__ */ new Set();
  if (typeof e == "function") return new Set(e());
  let t = /* @__PURE__ */ new Set();
  for (let n of e.current) n.current instanceof HTMLElement && t.add(n.current);
  return t;
}
let ta = "div";
var Ce = ((e) => (e[e.None = 0] = "None", e[e.InitialFocus = 1] = "InitialFocus", e[e.TabLock = 2] = "TabLock", e[e.FocusLock = 4] = "FocusLock", e[e.RestoreFocus = 8] = "RestoreFocus", e[e.AutoFocus = 16] = "AutoFocus", e))(Ce || {});
function na(e, t) {
  let n = j(null), r = ce(n, t), { initialFocus: l, initialFocusFallback: o, containers: u, features: s = 15, ...i } = e;
  Ze() || (s = 0);
  let p = Je(n);
  ia(s, { ownerDocument: p });
  let c = oa(s, { ownerDocument: p, container: n, initialFocus: l, initialFocusFallback: o });
  ua(s, { ownerDocument: p, container: n, containers: u, previousActiveElement: c });
  let w = ea(), b = A((v) => {
    let x = n.current;
    x && ((T) => T())(() => {
      we(w.current, { [Ye.Forwards]: () => {
        ze(x, pe.First, { skipElements: [v.relatedTarget, o] });
      }, [Ye.Backwards]: () => {
        ze(x, pe.Last, { skipElements: [v.relatedTarget, o] });
      } });
    });
  }), y = Ae(!!(s & 2), "focus-trap#tab-lock"), g = Wt(), f = j(!1), d = { ref: r, onKeyDown(v) {
    v.key == "Tab" && (f.current = !0, g.requestAnimationFrame(() => {
      f.current = !1;
    }));
  }, onBlur(v) {
    if (!(s & 4)) return;
    let x = Vn(u);
    n.current instanceof HTMLElement && x.add(n.current);
    let T = v.relatedTarget;
    T instanceof HTMLElement && T.dataset.headlessuiFocusGuard !== "true" && (Yn(x, T) || (f.current ? ze(n.current, we(w.current, { [Ye.Forwards]: () => pe.Next, [Ye.Backwards]: () => pe.Previous }) | pe.WrapAround, { relativeTo: v.target }) : v.target instanceof HTMLElement && me(v.target)));
  } }, m = ie();
  return O.createElement(O.Fragment, null, y && O.createElement(jt, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: b, features: ot.Focusable }), m({ ourProps: d, theirProps: i, defaultTag: ta, name: "FocusTrap" }), y && O.createElement(jt, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: b, features: ot.Focusable }));
}
let ra = Q(na), la = Object.assign(ra, { features: Ce });
function aa(e = !0) {
  let t = j(ve.slice());
  return Ht(([n], [r]) => {
    r === !0 && n === !1 && pt(() => {
      t.current.splice(0);
    }), r === !1 && n === !0 && (t.current = ve.slice());
  }, [e, ve, t]), A(() => {
    var n;
    return (n = t.current.find((r) => r != null && r.isConnected)) != null ? n : null;
  });
}
function ia(e, { ownerDocument: t }) {
  let n = !!(e & 8), r = aa(n);
  Ht(() => {
    n || (t == null ? void 0 : t.activeElement) === (t == null ? void 0 : t.body) && me(r());
  }, [n]), In(() => {
    n && me(r());
  });
}
function oa(e, { ownerDocument: t, container: n, initialFocus: r, initialFocusFallback: l }) {
  let o = j(null), u = Ae(!!(e & 1), "focus-trap#initial-focus"), s = Bt();
  return Ht(() => {
    if (e === 0) return;
    if (!u) {
      l != null && l.current && me(l.current);
      return;
    }
    let i = n.current;
    i && pt(() => {
      if (!s.current) return;
      let p = t == null ? void 0 : t.activeElement;
      if (r != null && r.current) {
        if ((r == null ? void 0 : r.current) === p) {
          o.current = p;
          return;
        }
      } else if (i.contains(p)) {
        o.current = p;
        return;
      }
      if (r != null && r.current) me(r.current);
      else {
        if (e & 16) {
          if (ze(i, pe.First | pe.AutoFocus) !== Mt.Error) return;
        } else if (ze(i, pe.First) !== Mt.Error) return;
        if (l != null && l.current && (me(l.current), (t == null ? void 0 : t.activeElement) === l.current)) return;
        console.warn("There are no focusable elements inside the <FocusTrap />");
      }
      o.current = t == null ? void 0 : t.activeElement;
    });
  }, [l, u, e]), o;
}
function ua(e, { ownerDocument: t, container: n, containers: r, previousActiveElement: l }) {
  let o = Bt(), u = !!(e & 4);
  Ln(t == null ? void 0 : t.defaultView, "focus", (s) => {
    if (!u || !o.current) return;
    let i = Vn(r);
    n.current instanceof HTMLElement && i.add(n.current);
    let p = l.current;
    if (!p) return;
    let c = s.target;
    c && c instanceof HTMLElement ? Yn(i, c) ? (l.current = c, me(c)) : (s.preventDefault(), s.stopPropagation(), me(p)) : me(l.current);
  }, !0);
}
function Yn(e, t) {
  for (let n of e) if (n.contains(t)) return !0;
  return !1;
}
function Xn(e) {
  var t;
  return !!(e.enter || e.enterFrom || e.enterTo || e.leave || e.leaveFrom || e.leaveTo) || ((t = e.as) != null ? t : Kn) !== se || O.Children.count(e.children) === 1;
}
let vt = ae(null);
vt.displayName = "TransitionContext";
var sa = ((e) => (e.Visible = "visible", e.Hidden = "hidden", e))(sa || {});
function ca() {
  let e = Z(vt);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
function da() {
  let e = Z(gt);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
let gt = ae(null);
gt.displayName = "NestingContext";
function wt(e) {
  return "children" in e ? wt(e.children) : e.current.filter(({ el: t }) => t.current !== null).filter(({ state: t }) => t === "visible").length > 0;
}
function qn(e, t) {
  let n = ke(e), r = j([]), l = Bt(), o = Wt(), u = A((y, g = ge.Hidden) => {
    let f = r.current.findIndex(({ el: d }) => d === y);
    f !== -1 && (we(g, { [ge.Unmount]() {
      r.current.splice(f, 1);
    }, [ge.Hidden]() {
      r.current[f].state = "hidden";
    } }), o.microTask(() => {
      var d;
      !wt(r) && l.current && ((d = n.current) == null || d.call(n));
    }));
  }), s = A((y) => {
    let g = r.current.find(({ el: f }) => f === y);
    return g ? g.state !== "visible" && (g.state = "visible") : r.current.push({ el: y, state: "visible" }), () => u(y, ge.Unmount);
  }), i = j([]), p = j(Promise.resolve()), c = j({ enter: [], leave: [] }), w = A((y, g, f) => {
    i.current.splice(0), t && (t.chains.current[g] = t.chains.current[g].filter(([d]) => d !== y)), t == null || t.chains.current[g].push([y, new Promise((d) => {
      i.current.push(d);
    })]), t == null || t.chains.current[g].push([y, new Promise((d) => {
      Promise.all(c.current[g].map(([m, v]) => v)).then(() => d());
    })]), g === "enter" ? p.current = p.current.then(() => t == null ? void 0 : t.wait.current).then(() => f(g)) : f(g);
  }), b = A((y, g, f) => {
    Promise.all(c.current[g].splice(0).map(([d, m]) => m)).then(() => {
      var d;
      (d = i.current.shift()) == null || d();
    }).then(() => f(g));
  });
  return B(() => ({ children: r, register: s, unregister: u, onStart: w, onStop: b, wait: p, chains: c }), [s, u, r, w, b, c, p]);
}
let Kn = se, zn = it.RenderStrategy;
function fa(e, t) {
  var n, r;
  let { transition: l = !0, beforeEnter: o, afterEnter: u, beforeLeave: s, afterLeave: i, enter: p, enterFrom: c, enterTo: w, entered: b, leave: y, leaveFrom: g, leaveTo: f, ...d } = e, [m, v] = V(null), x = j(null), T = Xn(e), F = ce(...T ? [x, t, v] : t === null ? [] : [t]), X = (n = d.unmount) == null || n ? ge.Unmount : ge.Hidden, { show: U, appear: ee, initial: te } = ca(), [H, q] = V(U ? "visible" : "hidden"), G = da(), { register: M, unregister: $ } = G;
  z(() => M(x), [M, x]), z(() => {
    if (X === ge.Hidden && x.current) {
      if (U && H !== "visible") {
        q("visible");
        return;
      }
      return we(H, { hidden: () => $(x), visible: () => M(x) });
    }
  }, [H, x, M, $, U, X]);
  let I = Ze();
  z(() => {
    if (T && I && H === "visible" && x.current === null) throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
  }, [x, H, I, T]);
  let be = te && !ee, xe = ee && U && te, he = j(!1), ne = qn(() => {
    he.current || (q("hidden"), $(x));
  }, G), Ee = A((Pe) => {
    he.current = !0;
    let de = Pe ? "enter" : "leave";
    ne.onStart(x, de, (fe) => {
      fe === "enter" ? o == null || o() : fe === "leave" && (s == null || s());
    });
  }), N = A((Pe) => {
    let de = Pe ? "enter" : "leave";
    he.current = !1, ne.onStop(x, de, (fe) => {
      fe === "enter" ? u == null || u() : fe === "leave" && (i == null || i());
    }), de === "leave" && !wt(ne) && (q("hidden"), $(x));
  });
  L(() => {
    T && l || (Ee(U), N(U));
  }, [U, T, l]);
  let Te = !(!l || !T || !I || be), [, Y] = Ml(Te, m, U, { start: Ee, end: N }), bt = Se({ ref: F, className: ((r = kt(d.className, xe && p, xe && c, Y.enter && p, Y.enter && Y.closed && c, Y.enter && !Y.closed && w, Y.leave && y, Y.leave && !Y.closed && g, Y.leave && Y.closed && f, !Y.transition && U && b)) == null ? void 0 : r.trim()) || void 0, ..._l(Y) }), Oe = 0;
  H === "visible" && (Oe |= ue.Open), H === "hidden" && (Oe |= ue.Closed), Y.enter && (Oe |= ue.Opening), Y.leave && (Oe |= ue.Closing);
  let Ie = ie();
  return O.createElement(gt.Provider, { value: ne }, O.createElement(Nl, { value: Oe }, Ie({ ourProps: bt, theirProps: d, defaultTag: Kn, features: zn, visible: H === "visible", name: "Transition.Child" })));
}
function pa(e, t) {
  let { show: n, appear: r = !1, unmount: l = !0, ...o } = e, u = j(null), s = Xn(e), i = ce(...s ? [u, t] : t === null ? [] : [t]);
  Ze();
  let p = ht();
  if (n === void 0 && p !== null && (n = (p & ue.Open) === ue.Open), n === void 0) throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
  let [c, w] = V(n ? "visible" : "hidden"), b = qn(() => {
    n || w("hidden");
  }), [y, g] = V(!0), f = j([n]);
  z(() => {
    y !== !1 && f.current[f.current.length - 1] !== n && (f.current.push(n), g(!1));
  }, [f, n]);
  let d = B(() => ({ show: n, appear: r, initial: y }), [n, r, y]);
  z(() => {
    n ? w("visible") : !wt(b) && u.current !== null && w("hidden");
  }, [n, b]);
  let m = { unmount: l }, v = A(() => {
    var F;
    y && g(!1), (F = e.beforeEnter) == null || F.call(e);
  }), x = A(() => {
    var F;
    y && g(!1), (F = e.beforeLeave) == null || F.call(e);
  }), T = ie();
  return O.createElement(gt.Provider, { value: b }, O.createElement(vt.Provider, { value: d }, T({ ourProps: { ...m, as: se, children: O.createElement(Gn, { ref: i, ...m, ...o, beforeEnter: v, beforeLeave: x }) }, theirProps: {}, defaultTag: se, features: zn, visible: c === "visible", name: "Transition" })));
}
function ma(e, t) {
  let n = Z(vt) !== null, r = ht() !== null;
  return O.createElement(O.Fragment, null, !n && r ? O.createElement(Lt, { ref: t, ...e }) : O.createElement(Gn, { ref: t, ...e }));
}
let Lt = Q(pa), Gn = Q(fa), Le = Q(ma), Jn = Object.assign(Lt, { Child: Le, Root: Lt });
var ha = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(ha || {}), va = ((e) => (e[e.SetTitleId = 0] = "SetTitleId", e))(va || {});
let ga = { 0(e, t) {
  return e.titleId === t.id ? e : { ...e, titleId: t.id };
} }, Vt = ae(null);
Vt.displayName = "DialogContext";
function yt(e) {
  let t = Z(Vt);
  if (t === null) {
    let n = new Error(`<${e} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(n, yt), n;
  }
  return t;
}
function wa(e, t) {
  return we(t.type, ga, e, t);
}
let wn = Q(function(e, t) {
  let n = Ge(), { id: r = `headlessui-dialog-${n}`, open: l, onClose: o, initialFocus: u, role: s = "dialog", autoFocus: i = !0, __demoMode: p = !1, unmount: c = !1, ...w } = e, b = j(!1);
  s = function() {
    return s === "dialog" || s === "alertdialog" ? s : (b.current || (b.current = !0, console.warn(`Invalid role [${s}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog");
  }();
  let y = ht();
  l === void 0 && y !== null && (l = (y & ue.Open) === ue.Open);
  let g = j(null), f = ce(g, t), d = Je(g), m = l ? 0 : 1, [v, x] = Fr(wa, { titleId: null, descriptionId: null, panelRef: kr() }), T = A(() => o(!1)), F = A((N) => x({ type: 0, id: N })), X = Ze() ? m === 0 : !1, [U, ee] = Kl(), te = { get current() {
    var N;
    return (N = v.panelRef.current) != null ? N : g.current;
  } }, H = Bn(), { resolveContainers: q } = Ql({ mainTreeNode: H, portals: U, defaultContainers: [te] }), G = y !== null ? (y & ue.Closing) === ue.Closing : !1;
  dl(p || G ? !1 : X, { allowed: A(() => {
    var N, Te;
    return [(Te = (N = g.current) == null ? void 0 : N.closest("[data-headlessui-portal]")) != null ? Te : null];
  }), disallowed: A(() => {
    var N;
    return [(N = H == null ? void 0 : H.closest("body > *:not(#headlessui-portal-root)")) != null ? N : null];
  }) }), Ol(X, q, (N) => {
    N.preventDefault(), T();
  }), Jl(X, d == null ? void 0 : d.defaultView, (N) => {
    N.preventDefault(), N.stopPropagation(), document.activeElement && "blur" in document.activeElement && typeof document.activeElement.blur == "function" && document.activeElement.blur(), T();
  }), Fl(p || G ? !1 : X, d, q), fl(X, g, T);
  let [M, $] = nl(), I = B(() => [{ dialogState: m, close: T, setTitleId: F, unmount: c }, v], [m, v, T, F, c]), be = B(() => ({ open: m === 0 }), [m]), xe = { ref: f, id: r, role: s, tabIndex: -1, "aria-modal": p ? void 0 : m === 0 ? !0 : void 0, "aria-labelledby": v.titleId, "aria-describedby": M, unmount: c }, he = !Zl(), ne = Ce.None;
  X && !p && (ne |= Ce.RestoreFocus, ne |= Ce.TabLock, i && (ne |= Ce.AutoFocus), he && (ne |= Ce.InitialFocus));
  let Ee = ie();
  return O.createElement(Dl, null, O.createElement(vn, { force: !0 }, O.createElement(Gl, null, O.createElement(Vt.Provider, { value: I }, O.createElement(Un, { target: g }, O.createElement(vn, { force: !1 }, O.createElement($, { slot: be }, O.createElement(ee, null, O.createElement(la, { initialFocus: u, initialFocusFallback: g, containers: q, features: ne }, O.createElement(ul, { value: T }, Ee({ ourProps: xe, theirProps: w, slot: be, defaultTag: ya, features: ba, visible: m === 0, name: "Dialog" })))))))))));
}), ya = "div", ba = it.RenderStrategy | it.Static;
function xa(e, t) {
  let { transition: n = !1, open: r, ...l } = e, o = ht(), u = e.hasOwnProperty("open") || o !== null, s = e.hasOwnProperty("onClose");
  if (!u && !s) throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");
  if (!u) throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");
  if (!s) throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");
  if (!o && typeof e.open != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${e.open}`);
  if (typeof e.onClose != "function") throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${e.onClose}`);
  return (r !== void 0 || n) && !l.static ? O.createElement(gn, null, O.createElement(Jn, { show: r, transition: n, unmount: l.unmount }, O.createElement(wn, { ref: t, ...l }))) : O.createElement(gn, null, O.createElement(wn, { ref: t, open: r, ...l }));
}
let Ea = "div";
function Ta(e, t) {
  let n = Ge(), { id: r = `headlessui-dialog-panel-${n}`, transition: l = !1, ...o } = e, [{ dialogState: u, unmount: s }, i] = yt("Dialog.Panel"), p = ce(t, i.panelRef), c = B(() => ({ open: u === 0 }), [u]), w = A((d) => {
    d.stopPropagation();
  }), b = { ref: p, id: r, onClick: w }, y = l ? Le : se, g = l ? { unmount: s } : {}, f = ie();
  return O.createElement(y, { ...g }, f({ ourProps: b, theirProps: o, slot: c, defaultTag: Ea, name: "Dialog.Panel" }));
}
let Oa = "div";
function Pa(e, t) {
  let { transition: n = !1, ...r } = e, [{ dialogState: l, unmount: o }] = yt("Dialog.Backdrop"), u = B(() => ({ open: l === 0 }), [l]), s = { ref: t, "aria-hidden": !0 }, i = n ? Le : se, p = n ? { unmount: o } : {}, c = ie();
  return O.createElement(i, { ...p }, c({ ourProps: s, theirProps: r, slot: u, defaultTag: Oa, name: "Dialog.Backdrop" }));
}
let Ra = "h2";
function Sa(e, t) {
  let n = Ge(), { id: r = `headlessui-dialog-title-${n}`, ...l } = e, [{ dialogState: o, setTitleId: u }] = yt("Dialog.Title"), s = ce(t);
  L(() => (u(r), () => u(null)), [r, u]);
  let i = B(() => ({ open: o === 0 }), [o]), p = { ref: s, id: r };
  return ie()({ ourProps: p, theirProps: l, slot: i, defaultTag: Ra, name: "Dialog.Title" });
}
let Ca = Q(xa), Yt = Q(Ta);
Q(Pa);
let $a = Q(Sa), Fa = Object.assign(Ca, { Panel: Yt, Title: $a, Description: il });
function Zn({ onClick: e }) {
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
const ka = ({ modalContext: e, config: t, children: n }) => /* @__PURE__ */ R.jsx("div", { className: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4", children: /* @__PURE__ */ R.jsx(
  "div",
  {
    className: at("im-modal-positioner flex min-h-full justify-center", {
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
        className: at("im-modal-wrapper w-full transition duration-300 ease-in-out", e.onTopOfStack ? "" : "blur-sm", {
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
        children: /* @__PURE__ */ R.jsxs(Yt, { className: `im-modal-content relative ${t.paddingClasses} ${t.panelClasses}`, children: [
          t.closeButton && /* @__PURE__ */ R.jsx("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ R.jsx(Zn, { onClick: e.close }) }),
          typeof n == "function" ? n({ modalContext: e, config: t }) : n
        ] })
      }
    )
  }
) }), ja = ({ modalContext: e, config: t, children: n }) => /* @__PURE__ */ R.jsx("div", { className: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ R.jsx(
  "div",
  {
    className: at("im-slideover-positioner flex min-h-full items-center", {
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
        className: at("im-slideover-wrapper w-full transition duration-300 ease-in-out", e.onTopOfStack ? "" : "blur-sm", {
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
        children: /* @__PURE__ */ R.jsxs(Yt, { className: `im-slideover-content relative ${t.paddingClasses} ${t.panelClasses}`, children: [
          t.closeButton && /* @__PURE__ */ R.jsx("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ R.jsx(Zn, { onClick: e.close }) }),
          typeof n == "function" ? n({ modalContext: e, config: t }) : n
        ] })
      }
    )
  }
) }), _a = It(({ name: e, children: t, ...n }, r) => {
  const l = (u) => typeof t == "function" ? t(u) : t, o = j(null);
  return yn(r, () => o.current, [o]), /* @__PURE__ */ R.jsx(
    Pn,
    {
      ref: o,
      name: e,
      ...n,
      children: ({
        afterLeave: u,
        close: s,
        config: i,
        emit: p,
        getChildModal: c,
        getParentModal: w,
        id: b,
        index: y,
        isOpen: g,
        modalContext: f,
        onTopOfStack: d,
        reload: m,
        setOpen: v,
        shouldRender: x
      }) => /* @__PURE__ */ R.jsx(
        Jn,
        {
          appear: !0,
          show: g ?? !1,
          children: /* @__PURE__ */ R.jsxs(
            Fa,
            {
              as: "div",
              className: "im-dialog relative z-20",
              onClose: () => i.closeExplicitly ? null : s(),
              "data-inertiaui-modal-id": b,
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
                  ja,
                  {
                    modalContext: f,
                    config: i,
                    children: l({
                      afterLeave: u,
                      close: s,
                      config: i,
                      emit: p,
                      getChildModal: c,
                      getParentModal: w,
                      id: b,
                      index: y,
                      isOpen: g,
                      modalContext: f,
                      onTopOfStack: d,
                      reload: m,
                      setOpen: v,
                      shouldRender: x
                    })
                  }
                ) : /* @__PURE__ */ R.jsx(
                  ka,
                  {
                    modalContext: f,
                    config: i,
                    children: l({
                      afterLeave: u,
                      close: s,
                      config: i,
                      emit: p,
                      getChildModal: c,
                      getParentModal: w,
                      id: b,
                      index: y,
                      isOpen: g,
                      modalContext: f,
                      onTopOfStack: d,
                      reload: m,
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
_a.displayName = "Modal";
const Ya = ({
  href: e,
  method: t = "get",
  data: n = {},
  as: r = "a",
  headers: l = {},
  queryStringArrayFormat: o = "brackets",
  onAfterLeave: u = null,
  onBlur: s = null,
  onClose: i = null,
  onError: p = null,
  onFocus: c = null,
  onStart: w = null,
  onSuccess: b = null,
  navigate: y = null,
  children: g,
  ...f
}) => {
  const [d, m] = V(!1), [v, x] = V(null), { stack: T, visit: F } = dt(), X = B(() => y ?? Nt("navigate"), [y]), U = {}, ee = {};
  Object.keys(f).forEach(($) => {
    cn.includes($) || ($.startsWith("on") && typeof f[$] == "function" ? $.toLowerCase() in window ? U[$] = f[$] : ee[$] = f[$] : U[$] = f[$]);
  });
  const [te, H] = V(!1);
  L(() => {
    v && (v.onTopOfStack && te ? c == null || c() : !v.onTopOfStack && !te && (s == null || s()), H(!v.onTopOfStack));
  }, [T]);
  const q = oe(() => {
    i == null || i();
  }, [i]), G = oe(() => {
    x(null), u == null || u();
  }, [u]), M = oe(
    ($) => {
      $ == null || $.preventDefault(), !d && (e.startsWith("#") || (m(!0), w == null || w()), F(
        e,
        t,
        n,
        l,
        Dr(bn(f, cn)),
        () => q(T.length),
        G,
        o,
        X
      ).then((I) => {
        x(I), I.registerEventListenersFromProps(ee), b == null || b();
      }).catch((I) => {
        console.error(I), p == null || p(I);
      }).finally(() => m(!1)));
    },
    [e, t, n, l, o, f, q, G]
  );
  return /* @__PURE__ */ R.jsx(
    r,
    {
      ...U,
      href: e,
      onClick: M,
      children: typeof g == "function" ? g({ loading: d }) : g
    }
  );
};
function Xa() {
  return dt().stack[Tn()] ?? null;
}
const qa = (e) => (t) => (t.default.layout = (n) => rt(e, {}, n), t);
export {
  Pn as HeadlessModal,
  _a as Modal,
  Ya as ModalLink,
  Br as ModalRoot,
  Ur as ModalStackProvider,
  Nt as getConfig,
  Hr as initFromPageProps,
  Ua as putConfig,
  Ha as renderApp,
  Wa as resetConfig,
  qa as setPageLayout,
  Xa as useModal,
  Tn as useModalIndex,
  dt as useModalStack
};
