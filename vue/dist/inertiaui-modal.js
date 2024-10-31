var $n = Object.defineProperty;
var Mn = (t, e, r) => e in t ? $n(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var k = (t, e, r) => Mn(t, typeof e != "symbol" ? e + "" : e, r);
import * as nr from "vue";
import { computed as I, provide as Rt, openBlock as E, createBlock as $, unref as g, mergeProps as q, createCommentVNode as H, ref as S, onUnmounted as we, onBeforeMount as Dn, watch as U, createElementBlock as ce, Fragment as _t, renderSlot as F, h as re, readonly as Fn, markRaw as Br, nextTick as de, inject as kt, onBeforeUnmount as et, onMounted as lt, useAttrs as Tr, defineComponent as B, Comment as Nn, cloneVNode as Bn, toRefs as Rr, getCurrentInstance as Ce, normalizeProps as Tn, guardReactiveProps as Rn, withCtx as O, reactive as _r, createVNode as _, watchEffect as fe, effectScope as kr, Teleport as _n, toHandlerKey as kn, camelize as Ln, normalizeStyle as Wn, getCurrentScope as Un, onScopeDispose as jn, createElementVNode as ne, normalizeClass as xe, Transition as Lt, resolveDynamicComponent as Lr, withModifiers as qn, toValue as Kn } from "vue";
import { router as Be, usePage as Wr } from "@inertiajs/vue3";
import tt from "axios";
const Fe = {
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
class zn {
  constructor() {
    this.config = {}, this.reset();
  }
  reset() {
    this.config = JSON.parse(JSON.stringify(Fe));
  }
  put(e, r) {
    if (typeof e == "object") {
      this.config = {
        type: e.type ?? Fe.type,
        navigate: e.navigate ?? Fe.navigate,
        modal: { ...Fe.modal, ...e.modal ?? {} },
        slideover: { ...Fe.slideover, ...e.slideover ?? {} }
      };
      return;
    }
    const n = e.split(".");
    let o = this.config;
    for (let a = 0; a < n.length - 1; a++)
      o = o[n[a]] = o[n[a]] || {};
    o[n[n.length - 1]] = r;
  }
  get(e) {
    if (typeof e > "u")
      return this.config;
    const r = e.split(".");
    let n = this.config;
    for (const o of r) {
      if (n[o] === void 0)
        return null;
      n = n[o];
    }
    return n;
  }
}
const st = new zn(), Yl = () => st.reset(), Zl = (t, e) => st.put(t, e), Wt = (t) => st.get(t), ve = (t, e) => st.get(t ? `slideover.${e}` : `modal.${e}`);
function Gn(t, e) {
  return Array.isArray(t) ? t.filter((r) => !e.includes(r)) : Object.keys(t).reduce((r, n) => (e.includes(n) || (r[n] = t[n]), r), {});
}
function Ur(t, e) {
  return Array.isArray(t) ? t.filter((r) => e.includes(r)) : e.reduce((r, n) => (n in t && (r[n] = t[n]), r), {});
}
function Vn(t) {
  return Array.isArray(t) ? t.filter((e) => e !== null) : Object.keys(t).reduce((e, r) => (r in t && t[r] !== null && (e[r] = t[r]), e), {});
}
function Hn(t, e = 3, r = 10) {
  return new Promise((n, o) => {
    const a = t();
    if (a) {
      n(a);
      return;
    }
    let i = e * 1e3 / r;
    const l = setInterval(() => {
      const s = t();
      s && (clearInterval(l), n(s)), --i <= 0 && (clearInterval(l), o(new Error("Condition not met in time")));
    }, r);
  });
}
function ze(t) {
  return t ? (t = t.replace(/_/g, "-"), t = t.replace(/-+/g, "-"), /[A-Z]/.test(t) ? (t = t.replace(/\s+/g, "").replace(/_/g, "").replace(/(?:^|\s|-)+([A-Za-z])/g, (e, r) => r.toUpperCase()), t = t.replace(/(.)(?=[A-Z])/g, "$1-"), t.toLowerCase()) : t) : "";
}
var Ct = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Qn(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Xn(t) {
  if (t.__esModule) return t;
  var e = t.default;
  if (typeof e == "function") {
    var r = function n() {
      return this instanceof n ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    r.prototype = e.prototype;
  } else r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(t).forEach(function(n) {
    var o = Object.getOwnPropertyDescriptor(t, n);
    Object.defineProperty(r, n, o.get ? o : {
      enumerable: !0,
      get: function() {
        return t[n];
      }
    });
  }), r;
}
var Jn = function(e) {
  return Yn(e) && !Zn(e);
};
function Yn(t) {
  return !!t && typeof t == "object";
}
function Zn(t) {
  var e = Object.prototype.toString.call(t);
  return e === "[object RegExp]" || e === "[object Date]" || ro(t);
}
var eo = typeof Symbol == "function" && Symbol.for, to = eo ? Symbol.for("react.element") : 60103;
function ro(t) {
  return t.$$typeof === to;
}
function no(t) {
  return Array.isArray(t) ? [] : {};
}
function ke(t, e) {
  return e.clone !== !1 && e.isMergeableObject(t) ? Ee(no(t), t, e) : t;
}
function oo(t, e, r) {
  return t.concat(e).map(function(n) {
    return ke(n, r);
  });
}
function ao(t, e) {
  if (!e.customMerge)
    return Ee;
  var r = e.customMerge(t);
  return typeof r == "function" ? r : Ee;
}
function io(t) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(t).filter(function(e) {
    return Object.propertyIsEnumerable.call(t, e);
  }) : [];
}
function or(t) {
  return Object.keys(t).concat(io(t));
}
function jr(t, e) {
  try {
    return e in t;
  } catch {
    return !1;
  }
}
function lo(t, e) {
  return jr(t, e) && !(Object.hasOwnProperty.call(t, e) && Object.propertyIsEnumerable.call(t, e));
}
function so(t, e, r) {
  var n = {};
  return r.isMergeableObject(t) && or(t).forEach(function(o) {
    n[o] = ke(t[o], r);
  }), or(e).forEach(function(o) {
    lo(t, o) || (jr(t, o) && r.isMergeableObject(e[o]) ? n[o] = ao(o, r)(t[o], e[o], r) : n[o] = ke(e[o], r));
  }), n;
}
function Ee(t, e, r) {
  r = r || {}, r.arrayMerge = r.arrayMerge || oo, r.isMergeableObject = r.isMergeableObject || Jn, r.cloneUnlessOtherwiseSpecified = ke;
  var n = Array.isArray(e), o = Array.isArray(t), a = n === o;
  return a ? n ? r.arrayMerge(t, e, r) : so(t, e, r) : ke(e, r);
}
Ee.all = function(e, r) {
  if (!Array.isArray(e))
    throw new Error("first argument should be an array");
  return e.reduce(function(n, o) {
    return Ee(n, o, r);
  }, {});
};
var uo = Ee, co = uo;
const fo = /* @__PURE__ */ Qn(co);
var po = Error, yo = EvalError, vo = RangeError, mo = ReferenceError, qr = SyntaxError, We = TypeError, go = URIError, ho = function() {
  if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
    return !1;
  if (typeof Symbol.iterator == "symbol")
    return !0;
  var e = {}, r = Symbol("test"), n = Object(r);
  if (typeof r == "string" || Object.prototype.toString.call(r) !== "[object Symbol]" || Object.prototype.toString.call(n) !== "[object Symbol]")
    return !1;
  var o = 42;
  e[r] = o;
  for (r in e)
    return !1;
  if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0)
    return !1;
  var a = Object.getOwnPropertySymbols(e);
  if (a.length !== 1 || a[0] !== r || !Object.prototype.propertyIsEnumerable.call(e, r))
    return !1;
  if (typeof Object.getOwnPropertyDescriptor == "function") {
    var i = Object.getOwnPropertyDescriptor(e, r);
    if (i.value !== o || i.enumerable !== !0)
      return !1;
  }
  return !0;
}, ar = typeof Symbol < "u" && Symbol, bo = ho, wo = function() {
  return typeof ar != "function" || typeof Symbol != "function" || typeof ar("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : bo();
}, ft = {
  __proto__: null,
  foo: {}
}, xo = Object, So = function() {
  return { __proto__: ft }.foo === ft.foo && !(ft instanceof xo);
}, Eo = "Function.prototype.bind called on incompatible ", Oo = Object.prototype.toString, Ao = Math.max, Po = "[object Function]", ir = function(e, r) {
  for (var n = [], o = 0; o < e.length; o += 1)
    n[o] = e[o];
  for (var a = 0; a < r.length; a += 1)
    n[a + e.length] = r[a];
  return n;
}, Co = function(e, r) {
  for (var n = [], o = r, a = 0; o < e.length; o += 1, a += 1)
    n[a] = e[o];
  return n;
}, Io = function(t, e) {
  for (var r = "", n = 0; n < t.length; n += 1)
    r += t[n], n + 1 < t.length && (r += e);
  return r;
}, $o = function(e) {
  var r = this;
  if (typeof r != "function" || Oo.apply(r) !== Po)
    throw new TypeError(Eo + r);
  for (var n = Co(arguments, 1), o, a = function() {
    if (this instanceof o) {
      var d = r.apply(
        this,
        ir(n, arguments)
      );
      return Object(d) === d ? d : this;
    }
    return r.apply(
      e,
      ir(n, arguments)
    );
  }, i = Ao(0, r.length - n.length), l = [], s = 0; s < i; s++)
    l[s] = "$" + s;
  if (o = Function("binder", "return function (" + Io(l, ",") + "){ return binder.apply(this,arguments); }")(a), r.prototype) {
    var c = function() {
    };
    c.prototype = r.prototype, o.prototype = new c(), c.prototype = null;
  }
  return o;
}, Mo = $o, Ut = Function.prototype.bind || Mo, Do = Function.prototype.call, Fo = Object.prototype.hasOwnProperty, No = Ut, Bo = No.call(Do, Fo), w, To = po, Ro = yo, _o = vo, ko = mo, Oe = qr, Se = We, Lo = go, Kr = Function, dt = function(t) {
  try {
    return Kr('"use strict"; return (' + t + ").constructor;")();
  } catch {
  }
}, se = Object.getOwnPropertyDescriptor;
if (se)
  try {
    se({}, "");
  } catch {
    se = null;
  }
var pt = function() {
  throw new Se();
}, Wo = se ? function() {
  try {
    return arguments.callee, pt;
  } catch {
    try {
      return se(arguments, "callee").get;
    } catch {
      return pt;
    }
  }
}() : pt, me = wo(), Uo = So(), T = Object.getPrototypeOf || (Uo ? function(t) {
  return t.__proto__;
} : null), be = {}, jo = typeof Uint8Array > "u" || !T ? w : T(Uint8Array), ue = {
  __proto__: null,
  "%AggregateError%": typeof AggregateError > "u" ? w : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? w : ArrayBuffer,
  "%ArrayIteratorPrototype%": me && T ? T([][Symbol.iterator]()) : w,
  "%AsyncFromSyncIteratorPrototype%": w,
  "%AsyncFunction%": be,
  "%AsyncGenerator%": be,
  "%AsyncGeneratorFunction%": be,
  "%AsyncIteratorPrototype%": be,
  "%Atomics%": typeof Atomics > "u" ? w : Atomics,
  "%BigInt%": typeof BigInt > "u" ? w : BigInt,
  "%BigInt64Array%": typeof BigInt64Array > "u" ? w : BigInt64Array,
  "%BigUint64Array%": typeof BigUint64Array > "u" ? w : BigUint64Array,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView > "u" ? w : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": To,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": Ro,
  "%Float32Array%": typeof Float32Array > "u" ? w : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? w : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? w : FinalizationRegistry,
  "%Function%": Kr,
  "%GeneratorFunction%": be,
  "%Int8Array%": typeof Int8Array > "u" ? w : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? w : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? w : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": me && T ? T(T([][Symbol.iterator]())) : w,
  "%JSON%": typeof JSON == "object" ? JSON : w,
  "%Map%": typeof Map > "u" ? w : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !me || !T ? w : T((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": Object,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise > "u" ? w : Promise,
  "%Proxy%": typeof Proxy > "u" ? w : Proxy,
  "%RangeError%": _o,
  "%ReferenceError%": ko,
  "%Reflect%": typeof Reflect > "u" ? w : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? w : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !me || !T ? w : T((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? w : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": me && T ? T(""[Symbol.iterator]()) : w,
  "%Symbol%": me ? Symbol : w,
  "%SyntaxError%": Oe,
  "%ThrowTypeError%": Wo,
  "%TypedArray%": jo,
  "%TypeError%": Se,
  "%Uint8Array%": typeof Uint8Array > "u" ? w : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? w : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? w : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? w : Uint32Array,
  "%URIError%": Lo,
  "%WeakMap%": typeof WeakMap > "u" ? w : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? w : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? w : WeakSet
};
if (T)
  try {
    null.error;
  } catch (t) {
    var qo = T(T(t));
    ue["%Error.prototype%"] = qo;
  }
var Ko = function t(e) {
  var r;
  if (e === "%AsyncFunction%")
    r = dt("async function () {}");
  else if (e === "%GeneratorFunction%")
    r = dt("function* () {}");
  else if (e === "%AsyncGeneratorFunction%")
    r = dt("async function* () {}");
  else if (e === "%AsyncGenerator%") {
    var n = t("%AsyncGeneratorFunction%");
    n && (r = n.prototype);
  } else if (e === "%AsyncIteratorPrototype%") {
    var o = t("%AsyncGenerator%");
    o && T && (r = T(o.prototype));
  }
  return ue[e] = r, r;
}, lr = {
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
}, Ue = Ut, rt = Bo, zo = Ue.call(Function.call, Array.prototype.concat), Go = Ue.call(Function.apply, Array.prototype.splice), sr = Ue.call(Function.call, String.prototype.replace), nt = Ue.call(Function.call, String.prototype.slice), Vo = Ue.call(Function.call, RegExp.prototype.exec), Ho = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, Qo = /\\(\\)?/g, Xo = function(e) {
  var r = nt(e, 0, 1), n = nt(e, -1);
  if (r === "%" && n !== "%")
    throw new Oe("invalid intrinsic syntax, expected closing `%`");
  if (n === "%" && r !== "%")
    throw new Oe("invalid intrinsic syntax, expected opening `%`");
  var o = [];
  return sr(e, Ho, function(a, i, l, s) {
    o[o.length] = l ? sr(s, Qo, "$1") : i || a;
  }), o;
}, Jo = function(e, r) {
  var n = e, o;
  if (rt(lr, n) && (o = lr[n], n = "%" + o[0] + "%"), rt(ue, n)) {
    var a = ue[n];
    if (a === be && (a = Ko(n)), typeof a > "u" && !r)
      throw new Se("intrinsic " + e + " exists, but is not available. Please file an issue!");
    return {
      alias: o,
      name: n,
      value: a
    };
  }
  throw new Oe("intrinsic " + e + " does not exist!");
}, Ie = function(e, r) {
  if (typeof e != "string" || e.length === 0)
    throw new Se("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof r != "boolean")
    throw new Se('"allowMissing" argument must be a boolean');
  if (Vo(/^%?[^%]*%?$/, e) === null)
    throw new Oe("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var n = Xo(e), o = n.length > 0 ? n[0] : "", a = Jo("%" + o + "%", r), i = a.name, l = a.value, s = !1, c = a.alias;
  c && (o = c[0], Go(n, zo([0, 1], c)));
  for (var d = 1, p = !0; d < n.length; d += 1) {
    var f = n[d], v = nt(f, 0, 1), u = nt(f, -1);
    if ((v === '"' || v === "'" || v === "`" || u === '"' || u === "'" || u === "`") && v !== u)
      throw new Oe("property names with quotes must have matching quotes");
    if ((f === "constructor" || !p) && (s = !0), o += "." + f, i = "%" + o + "%", rt(ue, i))
      l = ue[i];
    else if (l != null) {
      if (!(f in l)) {
        if (!r)
          throw new Se("base intrinsic for " + e + " exists, but the property is not available.");
        return;
      }
      if (se && d + 1 >= n.length) {
        var y = se(l, f);
        p = !!y, p && "get" in y && !("originalValue" in y.get) ? l = y.get : l = l[f];
      } else
        p = rt(l, f), l = l[f];
      p && !s && (ue[i] = l);
    }
  }
  return l;
}, zr = { exports: {} }, yt, ur;
function jt() {
  if (ur) return yt;
  ur = 1;
  var t = Ie, e = t("%Object.defineProperty%", !0) || !1;
  if (e)
    try {
      e({}, "a", { value: 1 });
    } catch {
      e = !1;
    }
  return yt = e, yt;
}
var Yo = Ie, Ye = Yo("%Object.getOwnPropertyDescriptor%", !0);
if (Ye)
  try {
    Ye([], "length");
  } catch {
    Ye = null;
  }
var Gr = Ye, cr = jt(), Zo = qr, ge = We, fr = Gr, ea = function(e, r, n) {
  if (!e || typeof e != "object" && typeof e != "function")
    throw new ge("`obj` must be an object or a function`");
  if (typeof r != "string" && typeof r != "symbol")
    throw new ge("`property` must be a string or a symbol`");
  if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
    throw new ge("`nonEnumerable`, if provided, must be a boolean or null");
  if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
    throw new ge("`nonWritable`, if provided, must be a boolean or null");
  if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
    throw new ge("`nonConfigurable`, if provided, must be a boolean or null");
  if (arguments.length > 6 && typeof arguments[6] != "boolean")
    throw new ge("`loose`, if provided, must be a boolean");
  var o = arguments.length > 3 ? arguments[3] : null, a = arguments.length > 4 ? arguments[4] : null, i = arguments.length > 5 ? arguments[5] : null, l = arguments.length > 6 ? arguments[6] : !1, s = !!fr && fr(e, r);
  if (cr)
    cr(e, r, {
      configurable: i === null && s ? s.configurable : !i,
      enumerable: o === null && s ? s.enumerable : !o,
      value: n,
      writable: a === null && s ? s.writable : !a
    });
  else if (l || !o && !a && !i)
    e[r] = n;
  else
    throw new Zo("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
}, It = jt(), Vr = function() {
  return !!It;
};
Vr.hasArrayLengthDefineBug = function() {
  if (!It)
    return null;
  try {
    return It([], "length", { value: 1 }).length !== 1;
  } catch {
    return !0;
  }
};
var ta = Vr, ra = Ie, dr = ea, na = ta(), pr = Gr, yr = We, oa = ra("%Math.floor%"), aa = function(e, r) {
  if (typeof e != "function")
    throw new yr("`fn` is not a function");
  if (typeof r != "number" || r < 0 || r > 4294967295 || oa(r) !== r)
    throw new yr("`length` must be a positive 32-bit integer");
  var n = arguments.length > 2 && !!arguments[2], o = !0, a = !0;
  if ("length" in e && pr) {
    var i = pr(e, "length");
    i && !i.configurable && (o = !1), i && !i.writable && (a = !1);
  }
  return (o || a || !n) && (na ? dr(
    /** @type {Parameters<define>[0]} */
    e,
    "length",
    r,
    !0,
    !0
  ) : dr(
    /** @type {Parameters<define>[0]} */
    e,
    "length",
    r
  )), e;
};
(function(t) {
  var e = Ut, r = Ie, n = aa, o = We, a = r("%Function.prototype.apply%"), i = r("%Function.prototype.call%"), l = r("%Reflect.apply%", !0) || e.call(i, a), s = jt(), c = r("%Math.max%");
  t.exports = function(f) {
    if (typeof f != "function")
      throw new o("a function is required");
    var v = l(e, i, arguments);
    return n(
      v,
      1 + c(0, f.length - (arguments.length - 1)),
      !0
    );
  };
  var d = function() {
    return l(e, a, arguments);
  };
  s ? s(t.exports, "apply", { value: d }) : t.exports.apply = d;
})(zr);
var ia = zr.exports, Hr = Ie, Qr = ia, la = Qr(Hr("String.prototype.indexOf")), sa = function(e, r) {
  var n = Hr(e, !!r);
  return typeof n == "function" && la(e, ".prototype.") > -1 ? Qr(n) : n;
};
const ua = {}, ca = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ua
}, Symbol.toStringTag, { value: "Module" })), fa = /* @__PURE__ */ Xn(ca);
var qt = typeof Map == "function" && Map.prototype, vt = Object.getOwnPropertyDescriptor && qt ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, ot = qt && vt && typeof vt.get == "function" ? vt.get : null, vr = qt && Map.prototype.forEach, Kt = typeof Set == "function" && Set.prototype, mt = Object.getOwnPropertyDescriptor && Kt ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, at = Kt && mt && typeof mt.get == "function" ? mt.get : null, mr = Kt && Set.prototype.forEach, da = typeof WeakMap == "function" && WeakMap.prototype, Te = da ? WeakMap.prototype.has : null, pa = typeof WeakSet == "function" && WeakSet.prototype, Re = pa ? WeakSet.prototype.has : null, ya = typeof WeakRef == "function" && WeakRef.prototype, gr = ya ? WeakRef.prototype.deref : null, va = Boolean.prototype.valueOf, ma = Object.prototype.toString, ga = Function.prototype.toString, ha = String.prototype.match, zt = String.prototype.slice, te = String.prototype.replace, ba = String.prototype.toUpperCase, hr = String.prototype.toLowerCase, Xr = RegExp.prototype.test, br = Array.prototype.concat, V = Array.prototype.join, wa = Array.prototype.slice, wr = Math.floor, $t = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, gt = Object.getOwnPropertySymbols, Mt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, Ae = typeof Symbol == "function" && typeof Symbol.iterator == "object", R = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === Ae || !0) ? Symbol.toStringTag : null, Jr = Object.prototype.propertyIsEnumerable, xr = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(t) {
  return t.__proto__;
} : null);
function Sr(t, e) {
  if (t === 1 / 0 || t === -1 / 0 || t !== t || t && t > -1e3 && t < 1e3 || Xr.call(/e/, e))
    return e;
  var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof t == "number") {
    var n = t < 0 ? -wr(-t) : wr(t);
    if (n !== t) {
      var o = String(n), a = zt.call(e, o.length + 1);
      return te.call(o, r, "$&_") + "." + te.call(te.call(a, /([0-9]{3})/g, "$&_"), /_$/, "");
    }
  }
  return te.call(e, r, "$&_");
}
var Dt = fa, Er = Dt.custom, Or = Zr(Er) ? Er : null, xa = function t(e, r, n, o) {
  var a = r || {};
  if (ee(a, "quoteStyle") && a.quoteStyle !== "single" && a.quoteStyle !== "double")
    throw new TypeError('option "quoteStyle" must be "single" or "double"');
  if (ee(a, "maxStringLength") && (typeof a.maxStringLength == "number" ? a.maxStringLength < 0 && a.maxStringLength !== 1 / 0 : a.maxStringLength !== null))
    throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
  var i = ee(a, "customInspect") ? a.customInspect : !0;
  if (typeof i != "boolean" && i !== "symbol")
    throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
  if (ee(a, "indent") && a.indent !== null && a.indent !== "	" && !(parseInt(a.indent, 10) === a.indent && a.indent > 0))
    throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
  if (ee(a, "numericSeparator") && typeof a.numericSeparator != "boolean")
    throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
  var l = a.numericSeparator;
  if (typeof e > "u")
    return "undefined";
  if (e === null)
    return "null";
  if (typeof e == "boolean")
    return e ? "true" : "false";
  if (typeof e == "string")
    return tn(e, a);
  if (typeof e == "number") {
    if (e === 0)
      return 1 / 0 / e > 0 ? "0" : "-0";
    var s = String(e);
    return l ? Sr(e, s) : s;
  }
  if (typeof e == "bigint") {
    var c = String(e) + "n";
    return l ? Sr(e, c) : c;
  }
  var d = typeof a.depth > "u" ? 5 : a.depth;
  if (typeof n > "u" && (n = 0), n >= d && d > 0 && typeof e == "object")
    return Ft(e) ? "[Array]" : "[Object]";
  var p = La(a, n);
  if (typeof o > "u")
    o = [];
  else if (en(o, e) >= 0)
    return "[Circular]";
  function f(j, J, Y) {
    if (J && (o = wa.call(o), o.push(J)), Y) {
      var De = {
        depth: a.depth
      };
      return ee(a, "quoteStyle") && (De.quoteStyle = a.quoteStyle), t(j, De, n + 1, o);
    }
    return t(j, a, n + 1, o);
  }
  if (typeof e == "function" && !Ar(e)) {
    var v = Ma(e), u = Ge(e, f);
    return "[Function" + (v ? ": " + v : " (anonymous)") + "]" + (u.length > 0 ? " { " + V.call(u, ", ") + " }" : "");
  }
  if (Zr(e)) {
    var y = Ae ? te.call(String(e), /^(Symbol\(.*\))_[^)]*$/, "$1") : Mt.call(e);
    return typeof e == "object" && !Ae ? Ne(y) : y;
  }
  if (Ra(e)) {
    for (var m = "<" + hr.call(String(e.nodeName)), b = e.attributes || [], A = 0; A < b.length; A++)
      m += " " + b[A].name + "=" + Yr(Sa(b[A].value), "double", a);
    return m += ">", e.childNodes && e.childNodes.length && (m += "..."), m += "</" + hr.call(String(e.nodeName)) + ">", m;
  }
  if (Ft(e)) {
    if (e.length === 0)
      return "[]";
    var h = Ge(e, f);
    return p && !ka(h) ? "[" + Nt(h, p) + "]" : "[ " + V.call(h, ", ") + " ]";
  }
  if (Oa(e)) {
    var x = Ge(e, f);
    return !("cause" in Error.prototype) && "cause" in e && !Jr.call(e, "cause") ? "{ [" + String(e) + "] " + V.call(br.call("[cause]: " + f(e.cause), x), ", ") + " }" : x.length === 0 ? "[" + String(e) + "]" : "{ [" + String(e) + "] " + V.call(x, ", ") + " }";
  }
  if (typeof e == "object" && i) {
    if (Or && typeof e[Or] == "function" && Dt)
      return Dt(e, { depth: d - n });
    if (i !== "symbol" && typeof e.inspect == "function")
      return e.inspect();
  }
  if (Da(e)) {
    var P = [];
    return vr && vr.call(e, function(j, J) {
      P.push(f(J, e, !0) + " => " + f(j, e));
    }), Pr("Map", ot.call(e), P, p);
  }
  if (Ba(e)) {
    var D = [];
    return mr && mr.call(e, function(j) {
      D.push(f(j, e));
    }), Pr("Set", at.call(e), D, p);
  }
  if (Fa(e))
    return ht("WeakMap");
  if (Ta(e))
    return ht("WeakSet");
  if (Na(e))
    return ht("WeakRef");
  if (Pa(e))
    return Ne(f(Number(e)));
  if (Ia(e))
    return Ne(f($t.call(e)));
  if (Ca(e))
    return Ne(va.call(e));
  if (Aa(e))
    return Ne(f(String(e)));
  if (typeof window < "u" && e === window)
    return "{ [object Window] }";
  if (typeof globalThis < "u" && e === globalThis || typeof Ct < "u" && e === Ct)
    return "{ [object globalThis] }";
  if (!Ea(e) && !Ar(e)) {
    var L = Ge(e, f), W = xr ? xr(e) === Object.prototype : e instanceof Object || e.constructor === Object, ie = e instanceof Object ? "" : "null prototype", X = !W && R && Object(e) === e && R in e ? zt.call(oe(e), 8, -1) : ie ? "Object" : "", Ke = W || typeof e.constructor != "function" ? "" : e.constructor.name ? e.constructor.name + " " : "", ye = Ke + (X || ie ? "[" + V.call(br.call([], X || [], ie || []), ": ") + "] " : "");
    return L.length === 0 ? ye + "{}" : p ? ye + "{" + Nt(L, p) + "}" : ye + "{ " + V.call(L, ", ") + " }";
  }
  return String(e);
};
function Yr(t, e, r) {
  var n = (r.quoteStyle || e) === "double" ? '"' : "'";
  return n + t + n;
}
function Sa(t) {
  return te.call(String(t), /"/g, "&quot;");
}
function Ft(t) {
  return oe(t) === "[object Array]" && (!R || !(typeof t == "object" && R in t));
}
function Ea(t) {
  return oe(t) === "[object Date]" && (!R || !(typeof t == "object" && R in t));
}
function Ar(t) {
  return oe(t) === "[object RegExp]" && (!R || !(typeof t == "object" && R in t));
}
function Oa(t) {
  return oe(t) === "[object Error]" && (!R || !(typeof t == "object" && R in t));
}
function Aa(t) {
  return oe(t) === "[object String]" && (!R || !(typeof t == "object" && R in t));
}
function Pa(t) {
  return oe(t) === "[object Number]" && (!R || !(typeof t == "object" && R in t));
}
function Ca(t) {
  return oe(t) === "[object Boolean]" && (!R || !(typeof t == "object" && R in t));
}
function Zr(t) {
  if (Ae)
    return t && typeof t == "object" && t instanceof Symbol;
  if (typeof t == "symbol")
    return !0;
  if (!t || typeof t != "object" || !Mt)
    return !1;
  try {
    return Mt.call(t), !0;
  } catch {
  }
  return !1;
}
function Ia(t) {
  if (!t || typeof t != "object" || !$t)
    return !1;
  try {
    return $t.call(t), !0;
  } catch {
  }
  return !1;
}
var $a = Object.prototype.hasOwnProperty || function(t) {
  return t in this;
};
function ee(t, e) {
  return $a.call(t, e);
}
function oe(t) {
  return ma.call(t);
}
function Ma(t) {
  if (t.name)
    return t.name;
  var e = ha.call(ga.call(t), /^function\s*([\w$]+)/);
  return e ? e[1] : null;
}
function en(t, e) {
  if (t.indexOf)
    return t.indexOf(e);
  for (var r = 0, n = t.length; r < n; r++)
    if (t[r] === e)
      return r;
  return -1;
}
function Da(t) {
  if (!ot || !t || typeof t != "object")
    return !1;
  try {
    ot.call(t);
    try {
      at.call(t);
    } catch {
      return !0;
    }
    return t instanceof Map;
  } catch {
  }
  return !1;
}
function Fa(t) {
  if (!Te || !t || typeof t != "object")
    return !1;
  try {
    Te.call(t, Te);
    try {
      Re.call(t, Re);
    } catch {
      return !0;
    }
    return t instanceof WeakMap;
  } catch {
  }
  return !1;
}
function Na(t) {
  if (!gr || !t || typeof t != "object")
    return !1;
  try {
    return gr.call(t), !0;
  } catch {
  }
  return !1;
}
function Ba(t) {
  if (!at || !t || typeof t != "object")
    return !1;
  try {
    at.call(t);
    try {
      ot.call(t);
    } catch {
      return !0;
    }
    return t instanceof Set;
  } catch {
  }
  return !1;
}
function Ta(t) {
  if (!Re || !t || typeof t != "object")
    return !1;
  try {
    Re.call(t, Re);
    try {
      Te.call(t, Te);
    } catch {
      return !0;
    }
    return t instanceof WeakSet;
  } catch {
  }
  return !1;
}
function Ra(t) {
  return !t || typeof t != "object" ? !1 : typeof HTMLElement < "u" && t instanceof HTMLElement ? !0 : typeof t.nodeName == "string" && typeof t.getAttribute == "function";
}
function tn(t, e) {
  if (t.length > e.maxStringLength) {
    var r = t.length - e.maxStringLength, n = "... " + r + " more character" + (r > 1 ? "s" : "");
    return tn(zt.call(t, 0, e.maxStringLength), e) + n;
  }
  var o = te.call(te.call(t, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, _a);
  return Yr(o, "single", e);
}
function _a(t) {
  var e = t.charCodeAt(0), r = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[e];
  return r ? "\\" + r : "\\x" + (e < 16 ? "0" : "") + ba.call(e.toString(16));
}
function Ne(t) {
  return "Object(" + t + ")";
}
function ht(t) {
  return t + " { ? }";
}
function Pr(t, e, r, n) {
  var o = n ? Nt(r, n) : V.call(r, ", ");
  return t + " (" + e + ") {" + o + "}";
}
function ka(t) {
  for (var e = 0; e < t.length; e++)
    if (en(t[e], `
`) >= 0)
      return !1;
  return !0;
}
function La(t, e) {
  var r;
  if (t.indent === "	")
    r = "	";
  else if (typeof t.indent == "number" && t.indent > 0)
    r = V.call(Array(t.indent + 1), " ");
  else
    return null;
  return {
    base: r,
    prev: V.call(Array(e + 1), r)
  };
}
function Nt(t, e) {
  if (t.length === 0)
    return "";
  var r = `
` + e.prev + e.base;
  return r + V.call(t, "," + r) + `
` + e.prev;
}
function Ge(t, e) {
  var r = Ft(t), n = [];
  if (r) {
    n.length = t.length;
    for (var o = 0; o < t.length; o++)
      n[o] = ee(t, o) ? e(t[o], t) : "";
  }
  var a = typeof gt == "function" ? gt(t) : [], i;
  if (Ae) {
    i = {};
    for (var l = 0; l < a.length; l++)
      i["$" + a[l]] = a[l];
  }
  for (var s in t)
    ee(t, s) && (r && String(Number(s)) === s && s < t.length || Ae && i["$" + s] instanceof Symbol || (Xr.call(/[^\w$]/, s) ? n.push(e(s, t) + ": " + e(t[s], t)) : n.push(s + ": " + e(t[s], t))));
  if (typeof gt == "function")
    for (var c = 0; c < a.length; c++)
      Jr.call(t, a[c]) && n.push("[" + e(a[c]) + "]: " + e(t[a[c]], t));
  return n;
}
var rn = Ie, $e = sa, Wa = xa, Ua = We, Ve = rn("%WeakMap%", !0), He = rn("%Map%", !0), ja = $e("WeakMap.prototype.get", !0), qa = $e("WeakMap.prototype.set", !0), Ka = $e("WeakMap.prototype.has", !0), za = $e("Map.prototype.get", !0), Ga = $e("Map.prototype.set", !0), Va = $e("Map.prototype.has", !0), Gt = function(t, e) {
  for (var r = t, n; (n = r.next) !== null; r = n)
    if (n.key === e)
      return r.next = n.next, n.next = /** @type {NonNullable<typeof list.next>} */
      t.next, t.next = n, n;
}, Ha = function(t, e) {
  var r = Gt(t, e);
  return r && r.value;
}, Qa = function(t, e, r) {
  var n = Gt(t, e);
  n ? n.value = r : t.next = /** @type {import('.').ListNode<typeof value>} */
  {
    // eslint-disable-line no-param-reassign, no-extra-parens
    key: e,
    next: t.next,
    value: r
  };
}, Xa = function(t, e) {
  return !!Gt(t, e);
}, Ja = function() {
  var e, r, n, o = {
    assert: function(a) {
      if (!o.has(a))
        throw new Ua("Side channel does not contain " + Wa(a));
    },
    get: function(a) {
      if (Ve && a && (typeof a == "object" || typeof a == "function")) {
        if (e)
          return ja(e, a);
      } else if (He) {
        if (r)
          return za(r, a);
      } else if (n)
        return Ha(n, a);
    },
    has: function(a) {
      if (Ve && a && (typeof a == "object" || typeof a == "function")) {
        if (e)
          return Ka(e, a);
      } else if (He) {
        if (r)
          return Va(r, a);
      } else if (n)
        return Xa(n, a);
      return !1;
    },
    set: function(a, i) {
      Ve && a && (typeof a == "object" || typeof a == "function") ? (e || (e = new Ve()), qa(e, a, i)) : He ? (r || (r = new He()), Ga(r, a, i)) : (n || (n = { key: {}, next: null }), Qa(n, a, i));
    }
  };
  return o;
}, Ya = String.prototype.replace, Za = /%20/g, bt = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
}, Vt = {
  default: bt.RFC3986,
  formatters: {
    RFC1738: function(t) {
      return Ya.call(t, Za, "+");
    },
    RFC3986: function(t) {
      return String(t);
    }
  },
  RFC1738: bt.RFC1738,
  RFC3986: bt.RFC3986
}, ei = Vt, wt = Object.prototype.hasOwnProperty, le = Array.isArray, z = function() {
  for (var t = [], e = 0; e < 256; ++e)
    t.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());
  return t;
}(), ti = function(e) {
  for (; e.length > 1; ) {
    var r = e.pop(), n = r.obj[r.prop];
    if (le(n)) {
      for (var o = [], a = 0; a < n.length; ++a)
        typeof n[a] < "u" && o.push(n[a]);
      r.obj[r.prop] = o;
    }
  }
}, nn = function(e, r) {
  for (var n = r && r.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, o = 0; o < e.length; ++o)
    typeof e[o] < "u" && (n[o] = e[o]);
  return n;
}, ri = function t(e, r, n) {
  if (!r)
    return e;
  if (typeof r != "object") {
    if (le(e))
      e.push(r);
    else if (e && typeof e == "object")
      (n && (n.plainObjects || n.allowPrototypes) || !wt.call(Object.prototype, r)) && (e[r] = !0);
    else
      return [e, r];
    return e;
  }
  if (!e || typeof e != "object")
    return [e].concat(r);
  var o = e;
  return le(e) && !le(r) && (o = nn(e, n)), le(e) && le(r) ? (r.forEach(function(a, i) {
    if (wt.call(e, i)) {
      var l = e[i];
      l && typeof l == "object" && a && typeof a == "object" ? e[i] = t(l, a, n) : e.push(a);
    } else
      e[i] = a;
  }), e) : Object.keys(r).reduce(function(a, i) {
    var l = r[i];
    return wt.call(a, i) ? a[i] = t(a[i], l, n) : a[i] = l, a;
  }, o);
}, ni = function(e, r) {
  return Object.keys(r).reduce(function(n, o) {
    return n[o] = r[o], n;
  }, e);
}, oi = function(t, e, r) {
  var n = t.replace(/\+/g, " ");
  if (r === "iso-8859-1")
    return n.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n);
  } catch {
    return n;
  }
}, xt = 1024, ai = function(e, r, n, o, a) {
  if (e.length === 0)
    return e;
  var i = e;
  if (typeof e == "symbol" ? i = Symbol.prototype.toString.call(e) : typeof e != "string" && (i = String(e)), n === "iso-8859-1")
    return escape(i).replace(/%u[0-9a-f]{4}/gi, function(v) {
      return "%26%23" + parseInt(v.slice(2), 16) + "%3B";
    });
  for (var l = "", s = 0; s < i.length; s += xt) {
    for (var c = i.length >= xt ? i.slice(s, s + xt) : i, d = [], p = 0; p < c.length; ++p) {
      var f = c.charCodeAt(p);
      if (f === 45 || f === 46 || f === 95 || f === 126 || f >= 48 && f <= 57 || f >= 65 && f <= 90 || f >= 97 && f <= 122 || a === ei.RFC1738 && (f === 40 || f === 41)) {
        d[d.length] = c.charAt(p);
        continue;
      }
      if (f < 128) {
        d[d.length] = z[f];
        continue;
      }
      if (f < 2048) {
        d[d.length] = z[192 | f >> 6] + z[128 | f & 63];
        continue;
      }
      if (f < 55296 || f >= 57344) {
        d[d.length] = z[224 | f >> 12] + z[128 | f >> 6 & 63] + z[128 | f & 63];
        continue;
      }
      p += 1, f = 65536 + ((f & 1023) << 10 | c.charCodeAt(p) & 1023), d[d.length] = z[240 | f >> 18] + z[128 | f >> 12 & 63] + z[128 | f >> 6 & 63] + z[128 | f & 63];
    }
    l += d.join("");
  }
  return l;
}, ii = function(e) {
  for (var r = [{ obj: { o: e }, prop: "o" }], n = [], o = 0; o < r.length; ++o)
    for (var a = r[o], i = a.obj[a.prop], l = Object.keys(i), s = 0; s < l.length; ++s) {
      var c = l[s], d = i[c];
      typeof d == "object" && d !== null && n.indexOf(d) === -1 && (r.push({ obj: i, prop: c }), n.push(d));
    }
  return ti(r), e;
}, li = function(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}, si = function(e) {
  return !e || typeof e != "object" ? !1 : !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e));
}, ui = function(e, r) {
  return [].concat(e, r);
}, ci = function(e, r) {
  if (le(e)) {
    for (var n = [], o = 0; o < e.length; o += 1)
      n.push(r(e[o]));
    return n;
  }
  return r(e);
}, on = {
  arrayToObject: nn,
  assign: ni,
  combine: ui,
  compact: ii,
  decode: oi,
  encode: ai,
  isBuffer: si,
  isRegExp: li,
  maybeMap: ci,
  merge: ri
}, an = Ja, Ze = on, _e = Vt, fi = Object.prototype.hasOwnProperty, ln = {
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
}, G = Array.isArray, di = Array.prototype.push, sn = function(t, e) {
  di.apply(t, G(e) ? e : [e]);
}, pi = Date.prototype.toISOString, Cr = _e.default, N = {
  addQueryPrefix: !1,
  allowDots: !1,
  allowEmptyArrays: !1,
  arrayFormat: "indices",
  charset: "utf-8",
  charsetSentinel: !1,
  delimiter: "&",
  encode: !0,
  encodeDotInKeys: !1,
  encoder: Ze.encode,
  encodeValuesOnly: !1,
  format: Cr,
  formatter: _e.formatters[Cr],
  // deprecated
  indices: !1,
  serializeDate: function(e) {
    return pi.call(e);
  },
  skipNulls: !1,
  strictNullHandling: !1
}, yi = function(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean" || typeof e == "symbol" || typeof e == "bigint";
}, St = {}, vi = function t(e, r, n, o, a, i, l, s, c, d, p, f, v, u, y, m, b, A) {
  for (var h = e, x = A, P = 0, D = !1; (x = x.get(St)) !== void 0 && !D; ) {
    var L = x.get(e);
    if (P += 1, typeof L < "u") {
      if (L === P)
        throw new RangeError("Cyclic object value");
      D = !0;
    }
    typeof x.get(St) > "u" && (P = 0);
  }
  if (typeof d == "function" ? h = d(r, h) : h instanceof Date ? h = v(h) : n === "comma" && G(h) && (h = Ze.maybeMap(h, function(ct) {
    return ct instanceof Date ? v(ct) : ct;
  })), h === null) {
    if (i)
      return c && !m ? c(r, N.encoder, b, "key", u) : r;
    h = "";
  }
  if (yi(h) || Ze.isBuffer(h)) {
    if (c) {
      var W = m ? r : c(r, N.encoder, b, "key", u);
      return [y(W) + "=" + y(c(h, N.encoder, b, "value", u))];
    }
    return [y(r) + "=" + y(String(h))];
  }
  var ie = [];
  if (typeof h > "u")
    return ie;
  var X;
  if (n === "comma" && G(h))
    m && c && (h = Ze.maybeMap(h, c)), X = [{ value: h.length > 0 ? h.join(",") || null : void 0 }];
  else if (G(d))
    X = d;
  else {
    var Ke = Object.keys(h);
    X = p ? Ke.sort(p) : Ke;
  }
  var ye = s ? r.replace(/\./g, "%2E") : r, j = o && G(h) && h.length === 1 ? ye + "[]" : ye;
  if (a && G(h) && h.length === 0)
    return j + "[]";
  for (var J = 0; J < X.length; ++J) {
    var Y = X[J], De = typeof Y == "object" && typeof Y.value < "u" ? Y.value : h[Y];
    if (!(l && De === null)) {
      var ut = f && s ? Y.replace(/\./g, "%2E") : Y, In = G(h) ? typeof n == "function" ? n(j, ut) : j : j + (f ? "." + ut : "[" + ut + "]");
      A.set(e, P);
      var rr = an();
      rr.set(St, A), sn(ie, t(
        De,
        In,
        n,
        o,
        a,
        i,
        l,
        s,
        n === "comma" && m && G(h) ? null : c,
        d,
        p,
        f,
        v,
        u,
        y,
        m,
        b,
        rr
      ));
    }
  }
  return ie;
}, mi = function(e) {
  if (!e)
    return N;
  if (typeof e.allowEmptyArrays < "u" && typeof e.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof e.encodeDotInKeys < "u" && typeof e.encodeDotInKeys != "boolean")
    throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
  if (e.encoder !== null && typeof e.encoder < "u" && typeof e.encoder != "function")
    throw new TypeError("Encoder has to be a function.");
  var r = e.charset || N.charset;
  if (typeof e.charset < "u" && e.charset !== "utf-8" && e.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var n = _e.default;
  if (typeof e.format < "u") {
    if (!fi.call(_e.formatters, e.format))
      throw new TypeError("Unknown format option provided.");
    n = e.format;
  }
  var o = _e.formatters[n], a = N.filter;
  (typeof e.filter == "function" || G(e.filter)) && (a = e.filter);
  var i;
  if (e.arrayFormat in ln ? i = e.arrayFormat : "indices" in e ? i = e.indices ? "indices" : "repeat" : i = N.arrayFormat, "commaRoundTrip" in e && typeof e.commaRoundTrip != "boolean")
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  var l = typeof e.allowDots > "u" ? e.encodeDotInKeys === !0 ? !0 : N.allowDots : !!e.allowDots;
  return {
    addQueryPrefix: typeof e.addQueryPrefix == "boolean" ? e.addQueryPrefix : N.addQueryPrefix,
    allowDots: l,
    allowEmptyArrays: typeof e.allowEmptyArrays == "boolean" ? !!e.allowEmptyArrays : N.allowEmptyArrays,
    arrayFormat: i,
    charset: r,
    charsetSentinel: typeof e.charsetSentinel == "boolean" ? e.charsetSentinel : N.charsetSentinel,
    commaRoundTrip: e.commaRoundTrip,
    delimiter: typeof e.delimiter > "u" ? N.delimiter : e.delimiter,
    encode: typeof e.encode == "boolean" ? e.encode : N.encode,
    encodeDotInKeys: typeof e.encodeDotInKeys == "boolean" ? e.encodeDotInKeys : N.encodeDotInKeys,
    encoder: typeof e.encoder == "function" ? e.encoder : N.encoder,
    encodeValuesOnly: typeof e.encodeValuesOnly == "boolean" ? e.encodeValuesOnly : N.encodeValuesOnly,
    filter: a,
    format: n,
    formatter: o,
    serializeDate: typeof e.serializeDate == "function" ? e.serializeDate : N.serializeDate,
    skipNulls: typeof e.skipNulls == "boolean" ? e.skipNulls : N.skipNulls,
    sort: typeof e.sort == "function" ? e.sort : null,
    strictNullHandling: typeof e.strictNullHandling == "boolean" ? e.strictNullHandling : N.strictNullHandling
  };
}, gi = function(t, e) {
  var r = t, n = mi(e), o, a;
  typeof n.filter == "function" ? (a = n.filter, r = a("", r)) : G(n.filter) && (a = n.filter, o = a);
  var i = [];
  if (typeof r != "object" || r === null)
    return "";
  var l = ln[n.arrayFormat], s = l === "comma" && n.commaRoundTrip;
  o || (o = Object.keys(r)), n.sort && o.sort(n.sort);
  for (var c = an(), d = 0; d < o.length; ++d) {
    var p = o[d];
    n.skipNulls && r[p] === null || sn(i, vi(
      r[p],
      p,
      l,
      s,
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
      c
    ));
  }
  var f = i.join(n.delimiter), v = n.addQueryPrefix === !0 ? "?" : "";
  return n.charsetSentinel && (n.charset === "iso-8859-1" ? v += "utf8=%26%2310003%3B&" : v += "utf8=%E2%9C%93&"), f.length > 0 ? v + f : "";
}, Pe = on, Bt = Object.prototype.hasOwnProperty, hi = Array.isArray, M = {
  allowDots: !1,
  allowEmptyArrays: !1,
  allowPrototypes: !1,
  allowSparse: !1,
  arrayLimit: 20,
  charset: "utf-8",
  charsetSentinel: !1,
  comma: !1,
  decodeDotInKeys: !1,
  decoder: Pe.decode,
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
}, bi = function(t) {
  return t.replace(/&#(\d+);/g, function(e, r) {
    return String.fromCharCode(parseInt(r, 10));
  });
}, un = function(t, e) {
  return t && typeof t == "string" && e.comma && t.indexOf(",") > -1 ? t.split(",") : t;
}, wi = "utf8=%26%2310003%3B", xi = "utf8=%E2%9C%93", Si = function(e, r) {
  var n = { __proto__: null }, o = r.ignoreQueryPrefix ? e.replace(/^\?/, "") : e;
  o = o.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  var a = r.parameterLimit === 1 / 0 ? void 0 : r.parameterLimit, i = o.split(r.delimiter, a), l = -1, s, c = r.charset;
  if (r.charsetSentinel)
    for (s = 0; s < i.length; ++s)
      i[s].indexOf("utf8=") === 0 && (i[s] === xi ? c = "utf-8" : i[s] === wi && (c = "iso-8859-1"), l = s, s = i.length);
  for (s = 0; s < i.length; ++s)
    if (s !== l) {
      var d = i[s], p = d.indexOf("]="), f = p === -1 ? d.indexOf("=") : p + 1, v, u;
      f === -1 ? (v = r.decoder(d, M.decoder, c, "key"), u = r.strictNullHandling ? null : "") : (v = r.decoder(d.slice(0, f), M.decoder, c, "key"), u = Pe.maybeMap(
        un(d.slice(f + 1), r),
        function(m) {
          return r.decoder(m, M.decoder, c, "value");
        }
      )), u && r.interpretNumericEntities && c === "iso-8859-1" && (u = bi(u)), d.indexOf("[]=") > -1 && (u = hi(u) ? [u] : u);
      var y = Bt.call(n, v);
      y && r.duplicates === "combine" ? n[v] = Pe.combine(n[v], u) : (!y || r.duplicates === "last") && (n[v] = u);
    }
  return n;
}, Ei = function(t, e, r, n) {
  for (var o = n ? e : un(e, r), a = t.length - 1; a >= 0; --a) {
    var i, l = t[a];
    if (l === "[]" && r.parseArrays)
      i = r.allowEmptyArrays && (o === "" || r.strictNullHandling && o === null) ? [] : [].concat(o);
    else {
      i = r.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var s = l.charAt(0) === "[" && l.charAt(l.length - 1) === "]" ? l.slice(1, -1) : l, c = r.decodeDotInKeys ? s.replace(/%2E/g, ".") : s, d = parseInt(c, 10);
      !r.parseArrays && c === "" ? i = { 0: o } : !isNaN(d) && l !== c && String(d) === c && d >= 0 && r.parseArrays && d <= r.arrayLimit ? (i = [], i[d] = o) : c !== "__proto__" && (i[c] = o);
    }
    o = i;
  }
  return o;
}, Oi = function(e, r, n, o) {
  if (e) {
    var a = n.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e, i = /(\[[^[\]]*])/, l = /(\[[^[\]]*])/g, s = n.depth > 0 && i.exec(a), c = s ? a.slice(0, s.index) : a, d = [];
    if (c) {
      if (!n.plainObjects && Bt.call(Object.prototype, c) && !n.allowPrototypes)
        return;
      d.push(c);
    }
    for (var p = 0; n.depth > 0 && (s = l.exec(a)) !== null && p < n.depth; ) {
      if (p += 1, !n.plainObjects && Bt.call(Object.prototype, s[1].slice(1, -1)) && !n.allowPrototypes)
        return;
      d.push(s[1]);
    }
    if (s) {
      if (n.strictDepth === !0)
        throw new RangeError("Input depth exceeded depth option of " + n.depth + " and strictDepth is true");
      d.push("[" + a.slice(s.index) + "]");
    }
    return Ei(d, r, n, o);
  }
}, Ai = function(e) {
  if (!e)
    return M;
  if (typeof e.allowEmptyArrays < "u" && typeof e.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof e.decodeDotInKeys < "u" && typeof e.decodeDotInKeys != "boolean")
    throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
  if (e.decoder !== null && typeof e.decoder < "u" && typeof e.decoder != "function")
    throw new TypeError("Decoder has to be a function.");
  if (typeof e.charset < "u" && e.charset !== "utf-8" && e.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var r = typeof e.charset > "u" ? M.charset : e.charset, n = typeof e.duplicates > "u" ? M.duplicates : e.duplicates;
  if (n !== "combine" && n !== "first" && n !== "last")
    throw new TypeError("The duplicates option must be either combine, first, or last");
  var o = typeof e.allowDots > "u" ? e.decodeDotInKeys === !0 ? !0 : M.allowDots : !!e.allowDots;
  return {
    allowDots: o,
    allowEmptyArrays: typeof e.allowEmptyArrays == "boolean" ? !!e.allowEmptyArrays : M.allowEmptyArrays,
    allowPrototypes: typeof e.allowPrototypes == "boolean" ? e.allowPrototypes : M.allowPrototypes,
    allowSparse: typeof e.allowSparse == "boolean" ? e.allowSparse : M.allowSparse,
    arrayLimit: typeof e.arrayLimit == "number" ? e.arrayLimit : M.arrayLimit,
    charset: r,
    charsetSentinel: typeof e.charsetSentinel == "boolean" ? e.charsetSentinel : M.charsetSentinel,
    comma: typeof e.comma == "boolean" ? e.comma : M.comma,
    decodeDotInKeys: typeof e.decodeDotInKeys == "boolean" ? e.decodeDotInKeys : M.decodeDotInKeys,
    decoder: typeof e.decoder == "function" ? e.decoder : M.decoder,
    delimiter: typeof e.delimiter == "string" || Pe.isRegExp(e.delimiter) ? e.delimiter : M.delimiter,
    // eslint-disable-next-line no-implicit-coercion, no-extra-parens
    depth: typeof e.depth == "number" || e.depth === !1 ? +e.depth : M.depth,
    duplicates: n,
    ignoreQueryPrefix: e.ignoreQueryPrefix === !0,
    interpretNumericEntities: typeof e.interpretNumericEntities == "boolean" ? e.interpretNumericEntities : M.interpretNumericEntities,
    parameterLimit: typeof e.parameterLimit == "number" ? e.parameterLimit : M.parameterLimit,
    parseArrays: e.parseArrays !== !1,
    plainObjects: typeof e.plainObjects == "boolean" ? e.plainObjects : M.plainObjects,
    strictDepth: typeof e.strictDepth == "boolean" ? !!e.strictDepth : M.strictDepth,
    strictNullHandling: typeof e.strictNullHandling == "boolean" ? e.strictNullHandling : M.strictNullHandling
  };
}, Pi = function(t, e) {
  var r = Ai(e);
  if (t === "" || t === null || typeof t > "u")
    return r.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var n = typeof t == "string" ? Si(t, r) : t, o = r.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, a = Object.keys(n), i = 0; i < a.length; ++i) {
    var l = a[i], s = Oi(l, n[l], r, typeof t == "string");
    o = Pe.merge(o, s, r);
  }
  return r.allowSparse === !0 ? o : Pe.compact(o);
}, Ci = gi, Ii = Pi, $i = Vt, Ir = {
  formats: $i,
  parse: Ii,
  stringify: Ci
}, Mi = { exports: {} };
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */
(function(t, e) {
  (function(r, n) {
    t.exports = n();
  })(Ct, function() {
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
    r.configure = function(u) {
      var y, m;
      for (y in u)
        m = u[y], m !== void 0 && u.hasOwnProperty(y) && (n[y] = m);
      return this;
    }, r.status = null, r.set = function(u) {
      var y = r.isStarted();
      u = o(u, n.minimum, 1), r.status = u === 1 ? null : u;
      var m = r.render(!y), b = m.querySelector(n.barSelector), A = n.speed, h = n.easing;
      return m.offsetWidth, l(function(x) {
        n.positionUsing === "" && (n.positionUsing = r.getPositioningCSS()), s(b, i(u, A, h)), u === 1 ? (s(m, {
          transition: "none",
          opacity: 1
        }), m.offsetWidth, setTimeout(function() {
          s(m, {
            transition: "all " + A + "ms linear",
            opacity: 0
          }), setTimeout(function() {
            r.remove(), x();
          }, A);
        }, A)) : setTimeout(x, A);
      }), this;
    }, r.isStarted = function() {
      return typeof r.status == "number";
    }, r.start = function() {
      r.status || r.set(0);
      var u = function() {
        setTimeout(function() {
          r.status && (r.trickle(), u());
        }, n.trickleSpeed);
      };
      return n.trickle && u(), this;
    }, r.done = function(u) {
      return !u && !r.status ? this : r.inc(0.3 + 0.5 * Math.random()).set(1);
    }, r.inc = function(u) {
      var y = r.status;
      return y ? (typeof u != "number" && (u = (1 - y) * o(Math.random() * y, 0.1, 0.95)), y = o(y + u, 0, 0.994), r.set(y)) : r.start();
    }, r.trickle = function() {
      return r.inc(Math.random() * n.trickleRate);
    }, function() {
      var u = 0, y = 0;
      r.promise = function(m) {
        return !m || m.state() === "resolved" ? this : (y === 0 && r.start(), u++, y++, m.always(function() {
          y--, y === 0 ? (u = 0, r.done()) : r.set((u - y) / u);
        }), this);
      };
    }(), r.render = function(u) {
      if (r.isRendered()) return document.getElementById("nprogress");
      d(document.documentElement, "nprogress-busy");
      var y = document.createElement("div");
      y.id = "nprogress", y.innerHTML = n.template;
      var m = y.querySelector(n.barSelector), b = u ? "-100" : a(r.status || 0), A = document.querySelector(n.parent), h;
      return s(m, {
        transition: "all 0 linear",
        transform: "translate3d(" + b + "%,0,0)"
      }), n.showSpinner || (h = y.querySelector(n.spinnerSelector), h && v(h)), A != document.body && d(A, "nprogress-custom-parent"), A.appendChild(y), y;
    }, r.remove = function() {
      p(document.documentElement, "nprogress-busy"), p(document.querySelector(n.parent), "nprogress-custom-parent");
      var u = document.getElementById("nprogress");
      u && v(u);
    }, r.isRendered = function() {
      return !!document.getElementById("nprogress");
    }, r.getPositioningCSS = function() {
      var u = document.body.style, y = "WebkitTransform" in u ? "Webkit" : "MozTransform" in u ? "Moz" : "msTransform" in u ? "ms" : "OTransform" in u ? "O" : "";
      return y + "Perspective" in u ? "translate3d" : y + "Transform" in u ? "translate" : "margin";
    };
    function o(u, y, m) {
      return u < y ? y : u > m ? m : u;
    }
    function a(u) {
      return (-1 + u) * 100;
    }
    function i(u, y, m) {
      var b;
      return n.positionUsing === "translate3d" ? b = { transform: "translate3d(" + a(u) + "%,0,0)" } : n.positionUsing === "translate" ? b = { transform: "translate(" + a(u) + "%,0)" } : b = { "margin-left": a(u) + "%" }, b.transition = "all " + y + "ms " + m, b;
    }
    var l = /* @__PURE__ */ function() {
      var u = [];
      function y() {
        var m = u.shift();
        m && m(y);
      }
      return function(m) {
        u.push(m), u.length == 1 && y();
      };
    }(), s = /* @__PURE__ */ function() {
      var u = ["Webkit", "O", "Moz", "ms"], y = {};
      function m(x) {
        return x.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(P, D) {
          return D.toUpperCase();
        });
      }
      function b(x) {
        var P = document.body.style;
        if (x in P) return x;
        for (var D = u.length, L = x.charAt(0).toUpperCase() + x.slice(1), W; D--; )
          if (W = u[D] + L, W in P) return W;
        return x;
      }
      function A(x) {
        return x = m(x), y[x] || (y[x] = b(x));
      }
      function h(x, P, D) {
        P = A(P), x.style[P] = D;
      }
      return function(x, P) {
        var D = arguments, L, W;
        if (D.length == 2)
          for (L in P)
            W = P[L], W !== void 0 && P.hasOwnProperty(L) && h(x, L, W);
        else
          h(x, D[1], D[2]);
      };
    }();
    function c(u, y) {
      var m = typeof u == "string" ? u : f(u);
      return m.indexOf(" " + y + " ") >= 0;
    }
    function d(u, y) {
      var m = f(u), b = m + y;
      c(m, y) || (u.className = b.substring(1));
    }
    function p(u, y) {
      var m = f(u), b;
      c(u, y) && (b = m.replace(" " + y + " ", " "), u.className = b.substring(1, b.length - 1));
    }
    function f(u) {
      return (" " + (u.className || "") + " ").replace(/\s+/gi, " ");
    }
    function v(u) {
      u && u.parentNode && u.parentNode.removeChild(u);
    }
    return r;
  });
})(Mi);
function Di(t, e, r, n = "brackets") {
  let o = /^https?:\/\//.test(e.toString()), a = o || e.toString().startsWith("/"), i = !a && !e.toString().startsWith("#") && !e.toString().startsWith("?"), l = e.toString().includes("?") || t === "get" && Object.keys(r).length, s = e.toString().includes("#"), c = new URL(e.toString(), "http://localhost");
  return t === "get" && Object.keys(r).length && (c.search = Ir.stringify(fo(Ir.parse(c.search, { ignoreQueryPrefix: !0 }), r), { encodeValuesOnly: !0, arrayFormat: n }), r = {}), [[o ? `${c.protocol}//${c.host}` : "", a ? c.pathname : "", i ? c.pathname.substring(1) : "", l ? c.search : "", s ? c.hash : ""].join(""), r];
}
const cn = {
  __name: "ModalRenderer",
  props: {
    index: {
      type: Number,
      required: !0
    }
  },
  setup(t) {
    const e = t, r = je(), n = I(() => r.stack.value[e.index]);
    return Rt("modalContext", n), (o, a) => {
      var i;
      return (i = n.value) != null && i.component ? (E(), $(g(n).component, q({ key: 0 }, n.value.props, {
        onModalEvent: a[0] || (a[0] = (l, ...s) => n.value.emit(l, ...s))
      }), null, 16)) : H("", !0);
    };
  }
}, Fi = {
  __name: "ModalRoot",
  setup(t) {
    const e = je(), r = S(!1), n = S(null);
    we(Be.on("start", () => r.value = !0)), we(Be.on("finish", () => r.value = !1)), we(
      Be.on("navigate", (i) => {
        const l = i.detail.page.props._inertiaui_modal;
        if (!l) {
          n.value && e.closeAll();
          return;
        }
        n.value = l, e.setBaseUrl(l.baseUrl), e.pushFromResponseData(l, {}, () => {
          if (!l.baseUrl) {
            console.error("No base url in modal response data so cannot navigate back");
            return;
          }
          !r.value && window.location.href !== l.baseUrl && Be.visit(l.baseUrl, {
            preserveScroll: !0,
            preserveState: !0
          });
        });
      })
    );
    const o = (i) => (e.stack.value.length && (i.headers["X-InertiaUI-Modal-Base-Url"] = e.getBaseUrl()), i);
    Dn(() => {
      tt.interceptors.request.use(o);
    }), we(() => {
      tt.interceptors.request.eject(o);
    });
    const a = Wr();
    return U(
      () => {
        var i;
        return (i = a.props) == null ? void 0 : i._inertiaui_modal;
      },
      (i, l) => {
        var s;
        i && l && i.component === l.component && i.url === l.url && ((s = e.stack.value[0]) == null || s.updateProps(i.props ?? {}));
      }
    ), (i, l) => (E(), ce(_t, null, [
      F(i.$slots, "default"),
      g(e).stack.value.length ? (E(), $(cn, {
        key: 0,
        index: 0
      })) : H("", !0)
    ], 64));
  }
};
let Ht = null;
const Le = S(null), C = S([]), it = S({}), Ni = (t) => {
  Ht = t;
};
class Qt {
  constructor(e, r, n, o, a) {
    k(this, "update", (e, r, n) => {
      const o = this.index.value;
      o > -1 && (C.value[o].config = e, C.value[o].onCloseCallback = r, C.value[o].afterLeaveCallback = n);
    });
    k(this, "getParentModal", () => {
      const e = this.index.value;
      return e < 1 ? null : C.value.slice(0, e).reverse().find((r) => r.isOpen);
    });
    k(this, "getChildModal", () => {
      const e = this.index.value;
      return e === C.value.length - 1 ? null : C.value.slice(e + 1).find((r) => r.isOpen);
    });
    k(this, "show", () => {
      const e = this.index.value;
      if (e > -1) {
        if (C.value[e].isOpen)
          return;
        C.value[e].isOpen = !0, C.value[e].shouldRender = !0;
      }
    });
    k(this, "close", () => {
      var r;
      const e = this.index.value;
      if (e > -1) {
        if (!C.value[e].isOpen)
          return;
        Object.keys(this.listeners).forEach((n) => {
          this.off(n);
        }), C.value[e].isOpen = !1, (r = this.onCloseCallback) == null || r.call(this), this.onCloseCallback = null;
      }
    });
    k(this, "setOpen", (e) => {
      e ? this.show() : this.close();
    });
    k(this, "afterLeave", () => {
      var r;
      const e = this.index.value;
      if (e > -1) {
        if (C.value[e].isOpen)
          return;
        C.value[e].shouldRender = !1, (r = this.afterLeaveCallback) == null || r.call(this), this.afterLeaveCallback = null;
      }
      e === 0 && (C.value = []);
    });
    k(this, "on", (e, r) => {
      e = ze(e), this.listeners[e] = this.listeners[e] ?? [], this.listeners[e].push(r);
    });
    k(this, "off", (e, r) => {
      var n;
      e = ze(e), r ? this.listeners[e] = ((n = this.listeners[e]) == null ? void 0 : n.filter((o) => o !== r)) ?? [] : delete this.listeners[e];
    });
    k(this, "emit", (e, ...r) => {
      var n;
      (n = this.listeners[ze(e)]) == null || n.forEach((o) => o(...r));
    });
    k(this, "registerEventListenersFromAttrs", (e) => {
      const r = [];
      return Object.keys(e).filter((n) => n.startsWith("on")).forEach((n) => {
        const o = ze(n).replace(/^on-/, "");
        this.on(o, e[n]), r.push(() => this.off(o, e[n]));
      }), () => r.forEach((n) => n());
    });
    k(this, "reload", (e = {}) => {
      var n;
      let r = Object.keys(this.response.props);
      e.only && (r = Ur(r, e.only)), e.except && (r = Gn(r, e.except)), (n = this.response) != null && n.url && tt.get(this.response.url, {
        headers: {
          Accept: "text/html, application/xhtml+xml",
          "X-Inertia": !0,
          "X-Inertia-Partial-Component": this.response.component,
          "X-Inertia-Version": this.response.version,
          "X-Inertia-Partial-Data": r.join(","),
          "X-InertiaUI-Modal": !0,
          "X-InertiaUI-Modal-Use-Router": 0,
          "X-InertiaUI-Modal-Base-Url": Le.value
        }
      }).then((o) => {
        this.updateProps(o.data.props);
      });
    });
    k(this, "updateProps", (e) => {
      Object.assign(this.props.value, e);
    });
    this.id = Qt.generateId(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = e, this.props = S(r.props), this.response = r, this.config = n, this.onCloseCallback = o, this.afterLeaveCallback = a, this.index = I(() => C.value.findIndex((i) => i.id === this.id)), this.onTopOfStack = I(() => {
      var l;
      return C.value.length < 2 ? !0 : ((l = C.value.map((s) => ({ id: s.id, shouldRender: s.shouldRender })).reverse().find((s) => s.shouldRender)) == null ? void 0 : l.id) === this.id;
    });
  }
  static generateId() {
    return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `inertiaui_modal_${crypto.randomUUID()}` : `inertiaui_modal_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
function Bi(t, e) {
  it.value[t] = { name: t, callback: e };
}
function Ti(t, e, r, n) {
  if (!it.value[t])
    throw new Error(`The local modal "${t}" has not been registered.`);
  const o = Xt(null, {}, e, r, n);
  return o.name = t, it.value[t].callback(o), o;
}
function fn(t, e = {}, r = null, n = null) {
  return Ht(t.component).then((o) => Xt(Br(o), t, e, r, n));
}
function Ri(t, e, r = {}, n = {}, o = {}, a = null, i = null, l = "brackets", s = !1) {
  return new Promise((c, d) => {
    if (t.startsWith("#")) {
      c(Ti(t.substring(1), o, a, i));
      return;
    }
    const [p, f] = Di(e, t || "", r, l);
    let v = s && C.value.length === 0;
    if (C.value.length === 0 && (Le.value = typeof window < "u" ? window.location.href : ""), n = {
      ...n,
      Accept: "text/html, application/xhtml+xml",
      "X-Requested-With": "XMLHttpRequest",
      "X-Inertia": !0,
      "X-Inertia-Version": Wr().version,
      "X-InertiaUI-Modal": !0,
      "X-InertiaUI-Modal-Use-Router": v ? 1 : 0,
      "X-InertiaUI-Modal-Base-Url": Le.value
    }, v)
      return Be.visit(p, {
        method: e,
        data: f,
        headers: n,
        preserveScroll: !0,
        preserveState: !0,
        onError: d,
        onFinish: () => Hn(() => C.value[0]).then((u) => {
          const y = u.onCloseCallback, m = u.afterLeaveCallback;
          u.update(
            o,
            () => {
              a == null || a(), y == null || y();
            },
            () => {
              i == null || i(), m == null || m();
            }
          ), c(u);
        })
      });
    tt({ url: p, method: e, data: f, headers: n }).then((u) => c(fn(u.data, o, a, i))).catch(d);
  });
}
function Xt(t, e, r, n, o) {
  const a = new Qt(t, e, r, n, o);
  return C.value.push(a), de(() => {
    a.show();
  }), a;
}
const _i = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], es = (t, e) => (e.resolveComponent && (Ht = e.resolveComponent), () => re(Fi, () => re(t, e)));
function je() {
  return {
    setComponentResolver: Ni,
    getBaseUrl: () => Le.value,
    setBaseUrl: (t) => Le.value = t,
    stack: Fn(C),
    push: Xt,
    pushFromResponseData: fn,
    closeAll: () => [...C.value].reverse().forEach((t) => t.close()),
    reset: () => C.value = [],
    visit: Ri,
    registerLocalModal: Bi,
    removeLocalModal: (t) => delete it.value[t]
  };
}
const ki = /* @__PURE__ */ Object.assign({
  inheritAttrs: !1
}, {
  __name: "HeadlessModal",
  props: {
    name: {
      type: String,
      required: !1
    },
    // The slideover prop in on top because we need to know if it's a slideover
    // before we can determine the defaule value of other props
    slideover: {
      type: Boolean,
      default: null
    },
    closeButton: {
      type: Boolean,
      default: null
    },
    closeExplicitly: {
      type: Boolean,
      default: null
    },
    maxWidth: {
      type: String,
      default: null
    },
    paddingClasses: {
      type: [Boolean, String],
      default: null
    },
    panelClasses: {
      type: [Boolean, String],
      default: null
    },
    position: {
      type: String,
      default: null
    }
  },
  emits: ["modal-event"],
  setup(t, { expose: e, emit: r }) {
    const n = t, o = je(), a = n.name ? S({}) : kt("modalContext"), i = I(() => {
      var u;
      const v = ((u = a.value.config) == null ? void 0 : u.slideover) ?? n.slideover ?? Wt("type") === "slideover";
      return {
        slideover: v,
        closeButton: n.closeButton ?? ve(v, "closeButton"),
        closeExplicitly: n.closeExplicitly ?? ve(v, "closeExplicitly"),
        maxWidth: n.maxWidth ?? ve(v, "maxWidth"),
        paddingClasses: n.paddingClasses ?? ve(v, "paddingClasses"),
        panelClasses: n.panelClasses ?? ve(v, "panelClasses"),
        position: n.position ?? ve(v, "position"),
        ...a.value.config
      };
    });
    n.name && (o.registerLocalModal(n.name, function(v) {
      a.value = v, c();
    }), et(() => {
      o.removeLocalModal(n.name);
    })), lt(() => {
      n.name || c();
    });
    const l = S(null);
    et(() => {
      var v;
      return (v = l.value) == null ? void 0 : v.call(l);
    });
    const s = Tr();
    function c() {
      l.value = a.value.registerEventListenersFromAttrs(s);
    }
    const d = r;
    function p(v, ...u) {
      d("modal-event", v, ...u);
    }
    e({
      afterLeave: a.value.afterLeave,
      close: a.value.close,
      config: i.value,
      emit: p,
      getChildModal: a.value.getChildModal,
      getParentModal: a.value.getParentModal,
      id: a.value.id,
      index: a.value.index,
      isOpen: a.value.isOpen,
      modalContext: a.value,
      onTopOfStack: a.value.onTopOfStack,
      reload: a.value.reload,
      setOpen: a.value.setOpen,
      shouldRender: a.value.shouldRender
    });
    const f = I(() => {
      var v;
      return (v = o.stack.value.find((u) => u.shouldRender && u.index > a.value.index)) == null ? void 0 : v.index;
    });
    return (v, u) => (E(), ce(_t, null, [
      g(a).shouldRender ? F(v.$slots, "default", {
        key: 0,
        id: g(a).id,
        afterLeave: g(a).afterLeave,
        close: g(a).close,
        config: i.value,
        emit: p,
        getChildModal: g(a).getChildModal,
        getParentModal: g(a).getParentModal,
        index: g(a).index,
        isOpen: g(a).isOpen,
        modalContext: g(a),
        onTopOfStack: g(a).onTopOfStack,
        reload: g(a).reload,
        setOpen: g(a).setOpen,
        shouldRender: g(a).shouldRender
      }) : H("", !0),
      f.value ? (E(), $(cn, {
        key: 1,
        index: f.value
      }, null, 8, ["index"])) : H("", !0)
    ], 64));
  }
});
function Jt(t, e) {
  const r = typeof t == "string" && !e ? `${t}Context` : e, n = Symbol(r);
  return [(o) => {
    const a = kt(n, o);
    if (a || a === null)
      return a;
    throw new Error(
      `Injection \`${n.toString()}\` not found. Component must be used within ${Array.isArray(t) ? `one of the following components: ${t.join(
        ", "
      )}` : `\`${t}\``}`
    );
  }, (o) => (Rt(n, o), o)];
}
function dn(t, e, r) {
  const n = r.originalEvent.target, o = new CustomEvent(t, {
    bubbles: !1,
    cancelable: !0,
    detail: r
  });
  e && n.addEventListener(t, e, { once: !0 }), n.dispatchEvent(o);
}
function pn(t) {
  return Un() ? (jn(t), !0) : !1;
}
function Li(t) {
  let e = !1, r;
  const n = kr(!0);
  return (...o) => (e || (r = n.run(() => t(...o)), e = !0), r);
}
function Wi(t) {
  let e = 0, r, n;
  const o = () => {
    e -= 1, n && e <= 0 && (n.stop(), r = void 0, n = void 0);
  };
  return (...a) => (e += 1, r || (n = kr(!0), r = n.run(() => t(...a))), pn(o), r);
}
function Yt(t) {
  return typeof t == "function" ? t() : g(t);
}
const pe = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Ui = (t) => typeof t < "u", ji = Object.prototype.toString, qi = (t) => ji.call(t) === "[object Object]", Ki = () => {
}, $r = /* @__PURE__ */ zi();
function zi() {
  var t, e;
  return pe && ((t = window == null ? void 0 : window.navigator) == null ? void 0 : t.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((e = window == null ? void 0 : window.navigator) == null ? void 0 : e.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function Gi(t) {
  return Ce();
}
function Vi(t, e) {
  Gi() && et(t, e);
}
function qe(t) {
  var e;
  const r = Yt(t);
  return (e = r == null ? void 0 : r.$el) != null ? e : r;
}
const yn = pe ? window : void 0;
function vn(...t) {
  let e, r, n, o;
  if (typeof t[0] == "string" || Array.isArray(t[0]) ? ([r, n, o] = t, e = yn) : [e, r, n, o] = t, !e)
    return Ki;
  Array.isArray(r) || (r = [r]), Array.isArray(n) || (n = [n]);
  const a = [], i = () => {
    a.forEach((d) => d()), a.length = 0;
  }, l = (d, p, f, v) => (d.addEventListener(p, f, v), () => d.removeEventListener(p, f, v)), s = U(
    () => [qe(e), Yt(o)],
    ([d, p]) => {
      if (i(), !d)
        return;
      const f = qi(p) ? { ...p } : p;
      a.push(
        ...r.flatMap((v) => n.map((u) => l(d, v, u, f)))
      );
    },
    { immediate: !0, flush: "post" }
  ), c = () => {
    s(), i();
  };
  return pn(c), c;
}
function Hi(t) {
  return typeof t == "function" ? t : typeof t == "string" ? (e) => e.key === t : Array.isArray(t) ? (e) => t.includes(e.key) : () => !0;
}
function Qi(...t) {
  let e, r, n = {};
  t.length === 3 ? (e = t[0], r = t[1], n = t[2]) : t.length === 2 ? typeof t[1] == "object" ? (e = !0, r = t[0], n = t[1]) : (e = t[0], r = t[1]) : (e = !0, r = t[0]);
  const {
    target: o = yn,
    eventName: a = "keydown",
    passive: i = !1,
    dedupe: l = !1
  } = n, s = Hi(e);
  return vn(o, a, (c) => {
    c.repeat && Yt(l) || s(c) && r(c);
  }, i);
}
function Xi() {
  const t = S(!1), e = Ce();
  return e && lt(() => {
    t.value = !0;
  }, e), t;
}
function Ji(t) {
  return JSON.parse(JSON.stringify(t));
}
function Yi(t, e, r, n = {}) {
  var o, a, i;
  const {
    clone: l = !1,
    passive: s = !1,
    eventName: c,
    deep: d = !1,
    defaultValue: p,
    shouldEmit: f
  } = n, v = Ce(), u = r || (v == null ? void 0 : v.emit) || ((o = v == null ? void 0 : v.$emit) == null ? void 0 : o.bind(v)) || ((i = (a = v == null ? void 0 : v.proxy) == null ? void 0 : a.$emit) == null ? void 0 : i.bind(v == null ? void 0 : v.proxy));
  let y = c;
  y = y || `update:${e.toString()}`;
  const m = (h) => l ? typeof l == "function" ? l(h) : Ji(h) : h, b = () => Ui(t[e]) ? m(t[e]) : p, A = (h) => {
    f ? f(h) && u(y, h) : u(y, h);
  };
  if (s) {
    const h = b(), x = S(h);
    let P = !1;
    return U(
      () => t[e],
      (D) => {
        P || (P = !0, x.value = m(D), de(() => P = !1));
      }
    ), U(
      x,
      (D) => {
        !P && (D !== t[e] || d) && A(D);
      },
      { deep: d }
    ), x;
  } else
    return I({
      get() {
        return b();
      },
      set(h) {
        A(h);
      }
    });
}
function Zt(t) {
  return t ? t.flatMap((e) => e.type === _t ? Zt(e.children) : [e]) : [];
}
function Et(t) {
  if (t === null || typeof t != "object")
    return !1;
  const e = Object.getPrototypeOf(t);
  return e !== null && e !== Object.prototype && Object.getPrototypeOf(e) !== null || Symbol.iterator in t ? !1 : Symbol.toStringTag in t ? Object.prototype.toString.call(t) === "[object Module]" : !0;
}
function Tt(t, e, r = ".", n) {
  if (!Et(e))
    return Tt(t, {}, r);
  const o = Object.assign({}, e);
  for (const a in t) {
    if (a === "__proto__" || a === "constructor")
      continue;
    const i = t[a];
    i != null && (Array.isArray(i) && Array.isArray(o[a]) ? o[a] = [...i, ...o[a]] : Et(i) && Et(o[a]) ? o[a] = Tt(
      i,
      o[a],
      (r ? `${r}.` : "") + a.toString()
    ) : o[a] = i);
  }
  return o;
}
function Zi(t) {
  return (...e) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    e.reduce((r, n) => Tt(r, n, ""), {})
  );
}
const el = Zi(), [mn, ts] = Jt("ConfigProvider");
let tl = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", rl = (t = 21) => {
  let e = "", r = t;
  for (; r--; )
    e += tl[Math.random() * 64 | 0];
  return e;
};
const nl = Wi(() => {
  const t = S(/* @__PURE__ */ new Map()), e = S(), r = I(() => {
    for (const i of t.value.values())
      if (i)
        return !0;
    return !1;
  }), n = mn({
    scrollBody: S(!0)
  });
  let o = null;
  const a = () => {
    document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.body.style.removeProperty("--scrollbar-width"), document.body.style.overflow = e.value ?? "", $r && (o == null || o()), e.value = void 0;
  };
  return U(r, (i, l) => {
    var s;
    if (!pe)
      return;
    if (!i) {
      l && a();
      return;
    }
    e.value === void 0 && (e.value = document.body.style.overflow);
    const c = window.innerWidth - document.documentElement.clientWidth, d = { padding: c, margin: 0 }, p = (s = n.scrollBody) != null && s.value ? typeof n.scrollBody.value == "object" ? el({
      padding: n.scrollBody.value.padding === !0 ? c : n.scrollBody.value.padding,
      margin: n.scrollBody.value.margin === !0 ? c : n.scrollBody.value.margin
    }, d) : d : { padding: 0, margin: 0 };
    c > 0 && (document.body.style.paddingRight = typeof p.padding == "number" ? `${p.padding}px` : String(p.padding), document.body.style.marginRight = typeof p.margin == "number" ? `${p.margin}px` : String(p.margin), document.body.style.setProperty("--scrollbar-width", `${c}px`), document.body.style.overflow = "hidden"), $r && (o = vn(
      document,
      "touchmove",
      (f) => {
        var v;
        f.target === document.documentElement && (f.touches.length > 1 || (v = f.preventDefault) == null || v.call(f));
      },
      { passive: !1 }
    )), de(() => {
      document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden";
    });
  }, { immediate: !0, flush: "sync" }), t;
});
function ol(t) {
  const e = rl(6), r = nl();
  r.value.set(e, t);
  const n = I({
    get: () => r.value.get(e) ?? !1,
    set: (o) => r.value.set(e, o)
  });
  return Vi(() => {
    r.value.delete(e);
  }), n;
}
function er(t) {
  const e = Ce(), r = e == null ? void 0 : e.type.emits, n = {};
  return r != null && r.length || console.warn(
    `No emitted event found. Please check component: ${e == null ? void 0 : e.type.__name}`
  ), r == null || r.forEach((o) => {
    n[kn(Ln(o))] = (...a) => t(o, ...a);
  }), n;
}
function K() {
  const t = Ce(), e = S(), r = I(() => {
    var i, l;
    return ["#text", "#comment"].includes((i = e.value) == null ? void 0 : i.$el.nodeName) ? (l = e.value) == null ? void 0 : l.$el.nextElementSibling : qe(e);
  }), n = Object.assign({}, t.exposed), o = {};
  for (const i in t.props)
    Object.defineProperty(o, i, {
      enumerable: !0,
      configurable: !0,
      get: () => t.props[i]
    });
  if (Object.keys(n).length > 0)
    for (const i in n)
      Object.defineProperty(o, i, {
        enumerable: !0,
        configurable: !0,
        get: () => n[i]
      });
  Object.defineProperty(o, "$el", {
    enumerable: !0,
    configurable: !0,
    get: () => t.vnode.el
  }), t.exposed = o;
  function a(i) {
    e.value = i, !(i instanceof Element || !i) && (Object.defineProperty(o, "$el", {
      enumerable: !0,
      configurable: !0,
      get: () => i.$el
    }), t.exposed = o);
  }
  return { forwardRef: a, currentRef: e, currentElement: r };
}
var al = function(t) {
  if (typeof document > "u")
    return null;
  var e = Array.isArray(t) ? t[0] : t;
  return e.ownerDocument.body;
}, he = /* @__PURE__ */ new WeakMap(), Qe = /* @__PURE__ */ new WeakMap(), Xe = {}, Ot = 0, gn = function(t) {
  return t && (t.host || gn(t.parentNode));
}, il = function(t, e) {
  return e.map(function(r) {
    if (t.contains(r))
      return r;
    var n = gn(r);
    return n && t.contains(n) ? n : (console.error("aria-hidden", r, "in not contained inside", t, ". Doing nothing"), null);
  }).filter(function(r) {
    return !!r;
  });
}, ll = function(t, e, r, n) {
  var o = il(e, Array.isArray(t) ? t : [t]);
  Xe[r] || (Xe[r] = /* @__PURE__ */ new WeakMap());
  var a = Xe[r], i = [], l = /* @__PURE__ */ new Set(), s = new Set(o), c = function(p) {
    !p || l.has(p) || (l.add(p), c(p.parentNode));
  };
  o.forEach(c);
  var d = function(p) {
    !p || s.has(p) || Array.prototype.forEach.call(p.children, function(f) {
      if (l.has(f))
        d(f);
      else
        try {
          var v = f.getAttribute(n), u = v !== null && v !== "false", y = (he.get(f) || 0) + 1, m = (a.get(f) || 0) + 1;
          he.set(f, y), a.set(f, m), i.push(f), y === 1 && u && Qe.set(f, !0), m === 1 && f.setAttribute(r, "true"), u || f.setAttribute(n, "true");
        } catch (b) {
          console.error("aria-hidden: cannot operate on ", f, b);
        }
    });
  };
  return d(e), l.clear(), Ot++, function() {
    i.forEach(function(p) {
      var f = he.get(p) - 1, v = a.get(p) - 1;
      he.set(p, f), a.set(p, v), f || (Qe.has(p) || p.removeAttribute(n), Qe.delete(p)), v || p.removeAttribute(r);
    }), Ot--, Ot || (he = /* @__PURE__ */ new WeakMap(), he = /* @__PURE__ */ new WeakMap(), Qe = /* @__PURE__ */ new WeakMap(), Xe = {});
  };
}, sl = function(t, e, r) {
  r === void 0 && (r = "data-aria-hidden");
  var n = Array.from(Array.isArray(t) ? t : [t]), o = al(t);
  return o ? (n.push.apply(n, Array.from(o.querySelectorAll("[aria-live]"))), ll(n, o, r, "aria-hidden")) : function() {
    return null;
  };
};
function ul(t) {
  let e;
  U(() => qe(t), (r) => {
    r ? e = sl(r) : e && e();
  }), we(() => {
    e && e();
  });
}
let cl = 0;
function Mr(t, e = "radix") {
  const r = mn({ useId: void 0 });
  return nr.useId ? `${e}-${nr.useId()}` : r.useId ? `${e}-${r.useId()}` : `${e}-${++cl}`;
}
function fl(t, e) {
  const r = S(t);
  function n(o) {
    return e[r.value][o] ?? r.value;
  }
  return {
    state: r,
    dispatch: (o) => {
      r.value = n(o);
    }
  };
}
const tr = B({
  name: "PrimitiveSlot",
  inheritAttrs: !1,
  setup(t, { attrs: e, slots: r }) {
    return () => {
      var n, o;
      if (!r.default)
        return null;
      const a = Zt(r.default()), i = a.findIndex((d) => d.type !== Nn);
      if (i === -1)
        return a;
      const l = a[i];
      (n = l.props) == null || delete n.ref;
      const s = l.props ? q(e, l.props) : e;
      e.class && (o = l.props) != null && o.class && delete l.props.class;
      const c = Bn(l, s);
      for (const d in s)
        d.startsWith("on") && (c.props || (c.props = {}), c.props[d] = s[d]);
      return a.length === 1 ? c : (a[i] = c, a);
    };
  }
}), Me = B({
  name: "Primitive",
  inheritAttrs: !1,
  props: {
    asChild: {
      type: Boolean,
      default: !1
    },
    as: {
      type: [String, Object],
      default: "div"
    }
  },
  setup(t, { attrs: e, slots: r }) {
    const n = t.asChild ? "template" : t.as;
    return typeof n == "string" && ["area", "img", "input"].includes(n) ? () => re(n, e) : n !== "template" ? () => re(t.as, e, { default: r.default }) : () => re(tr, e, { default: r.default });
  }
});
function hn() {
  const t = S(), e = I(() => {
    var r, n;
    return ["#text", "#comment"].includes((r = t.value) == null ? void 0 : r.$el.nodeName) ? (n = t.value) == null ? void 0 : n.$el.nextElementSibling : qe(t);
  });
  return {
    primitiveElement: t,
    currentElement: e
  };
}
function dl(t, e) {
  const r = S({}), n = S("none"), o = t.value ? "mounted" : "unmounted", { state: a, dispatch: i } = fl(o, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  }), l = (f) => {
    var v;
    if (pe) {
      const u = new CustomEvent(f, { bubbles: !1, cancelable: !1 });
      (v = e.value) == null || v.dispatchEvent(u);
    }
  };
  U(
    t,
    async (f, v) => {
      var u;
      const y = v !== f;
      if (await de(), y) {
        const m = n.value, b = Je(e.value);
        f ? (i("MOUNT"), l("enter"), b === "none" && l("after-enter")) : b === "none" || ((u = r.value) == null ? void 0 : u.display) === "none" ? (i("UNMOUNT"), l("leave"), l("after-leave")) : v && m !== b ? (i("ANIMATION_OUT"), l("leave")) : (i("UNMOUNT"), l("after-leave"));
      }
    },
    { immediate: !0 }
  );
  const s = (f) => {
    const v = Je(e.value), u = v.includes(
      f.animationName
    ), y = a.value === "mounted" ? "enter" : "leave";
    f.target === e.value && u && (l(`after-${y}`), i("ANIMATION_END")), f.target === e.value && v === "none" && i("ANIMATION_END");
  }, c = (f) => {
    f.target === e.value && (n.value = Je(e.value));
  }, d = U(
    e,
    (f, v) => {
      f ? (r.value = getComputedStyle(f), f.addEventListener("animationstart", c), f.addEventListener("animationcancel", s), f.addEventListener("animationend", s)) : (i("ANIMATION_END"), v == null || v.removeEventListener("animationstart", c), v == null || v.removeEventListener("animationcancel", s), v == null || v.removeEventListener("animationend", s));
    },
    { immediate: !0 }
  ), p = U(a, () => {
    const f = Je(e.value);
    n.value = a.value === "mounted" ? f : "none";
  });
  return we(() => {
    d(), p();
  }), {
    isPresent: I(
      () => ["mounted", "unmountSuspended"].includes(a.value)
    )
  };
}
function Je(t) {
  return t && getComputedStyle(t).animationName || "none";
}
const bn = B({
  name: "Presence",
  props: {
    present: {
      type: Boolean,
      required: !0
    },
    forceMount: {
      type: Boolean
    }
  },
  slots: {},
  setup(t, { slots: e, expose: r }) {
    var n;
    const { present: o, forceMount: a } = Rr(t), i = S(), { isPresent: l } = dl(o, i);
    r({ present: l });
    let s = e.default({ present: l });
    s = Zt(s || []);
    const c = Ce();
    if (s && (s == null ? void 0 : s.length) > 1) {
      const d = (n = c == null ? void 0 : c.parent) != null && n.type.name ? `<${c.parent.type.name} />` : "component";
      throw new Error(
        [
          `Detected an invalid children for \`${d}\` for  \`Presence\` component.`,
          "",
          "Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.",
          "You can apply a few solutions:",
          [
            "Provide a single child element so that `presence` directive attach correctly.",
            "Ensure the first child is an actual element instead of a raw text node or comment node."
          ].map((p) => `  - ${p}`).join(`
`)
        ].join(`
`)
      );
    }
    return () => a.value || o.value || l.value ? re(e.default({ present: l })[0], {
      ref: (d) => {
        const p = qe(d);
        return typeof (p == null ? void 0 : p.hasAttribute) > "u" || (p != null && p.hasAttribute("data-radix-popper-content-wrapper") ? i.value = p.firstElementChild : i.value = p), p;
      }
    }) : null;
  }
}), [ae, pl] = Jt("DialogRoot"), yl = /* @__PURE__ */ B({
  inheritAttrs: !1,
  __name: "DialogRoot",
  props: {
    open: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: !1 },
    modal: { type: Boolean, default: !0 }
  },
  emits: ["update:open"],
  setup(t, { emit: e }) {
    const r = t, n = Yi(r, "open", e, {
      defaultValue: r.defaultOpen,
      passive: r.open === void 0
    }), o = S(), a = S(), { modal: i } = Rr(r);
    return pl({
      open: n,
      modal: i,
      openModal: () => {
        n.value = !0;
      },
      onOpenChange: (l) => {
        n.value = l;
      },
      onOpenToggle: () => {
        n.value = !n.value;
      },
      contentId: "",
      titleId: "",
      descriptionId: "",
      triggerElement: o,
      contentElement: a
    }), (l, s) => F(l.$slots, "default", { open: g(n) });
  }
}), vl = /* @__PURE__ */ B({
  __name: "Teleport",
  props: {
    to: { default: "body" },
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(t) {
    const e = Xi();
    return (r, n) => g(e) || r.forceMount ? (E(), $(_n, {
      key: 0,
      to: r.to,
      disabled: r.disabled
    }, [
      F(r.$slots, "default")
    ], 8, ["to", "disabled"])) : H("", !0);
  }
}), ml = /* @__PURE__ */ B({
  __name: "DialogPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(t) {
    const e = t;
    return (r, n) => (E(), $(g(vl), Tn(Rn(e)), {
      default: O(() => [
        F(r.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), gl = "dismissableLayer.pointerDownOutside", hl = "dismissableLayer.focusOutside";
function wn(t, e) {
  const r = e.closest(
    "[data-dismissable-layer]"
  ), n = t.dataset.dismissableLayer === "" ? t : t.querySelector(
    "[data-dismissable-layer]"
  ), o = Array.from(
    t.ownerDocument.querySelectorAll("[data-dismissable-layer]")
  );
  return !!(r && n === r || o.indexOf(n) < o.indexOf(r));
}
function bl(t, e) {
  var r;
  const n = ((r = e == null ? void 0 : e.value) == null ? void 0 : r.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), o = S(!1), a = S(() => {
  });
  return fe((i) => {
    if (!pe)
      return;
    const l = async (c) => {
      const d = c.target;
      if (e != null && e.value) {
        if (wn(e.value, d)) {
          o.value = !1;
          return;
        }
        if (c.target && !o.value) {
          let p = function() {
            dn(
              gl,
              t,
              f
            );
          };
          const f = { originalEvent: c };
          c.pointerType === "touch" ? (n.removeEventListener("click", a.value), a.value = p, n.addEventListener("click", a.value, {
            once: !0
          })) : p();
        } else
          n.removeEventListener("click", a.value);
        o.value = !1;
      }
    }, s = window.setTimeout(() => {
      n.addEventListener("pointerdown", l);
    }, 0);
    i(() => {
      window.clearTimeout(s), n.removeEventListener("pointerdown", l), n.removeEventListener("click", a.value);
    });
  }), {
    onPointerDownCapture: () => o.value = !0
  };
}
function wl(t, e) {
  var r;
  const n = ((r = e == null ? void 0 : e.value) == null ? void 0 : r.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), o = S(!1);
  return fe((a) => {
    if (!pe)
      return;
    const i = async (l) => {
      e != null && e.value && (await de(), !(!e.value || wn(e.value, l.target)) && l.target && !o.value && dn(
        hl,
        t,
        { originalEvent: l }
      ));
    };
    n.addEventListener("focusin", i), a(() => n.removeEventListener("focusin", i));
  }), {
    onFocusCapture: () => o.value = !0,
    onBlurCapture: () => o.value = !1
  };
}
const Q = _r({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), xl = /* @__PURE__ */ B({
  __name: "DismissableLayer",
  props: {
    disableOutsidePointerEvents: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "dismiss"],
  setup(t, { emit: e }) {
    const r = t, n = e, { forwardRef: o, currentElement: a } = K(), i = I(
      () => {
        var u;
        return ((u = a.value) == null ? void 0 : u.ownerDocument) ?? globalThis.document;
      }
    ), l = I(() => Q.layersRoot), s = I(() => a.value ? Array.from(l.value).indexOf(a.value) : -1), c = I(() => Q.layersWithOutsidePointerEventsDisabled.size > 0), d = I(() => {
      const u = Array.from(l.value), [y] = [...Q.layersWithOutsidePointerEventsDisabled].slice(-1), m = u.indexOf(y);
      return s.value >= m;
    }), p = bl(async (u) => {
      const y = [...Q.branches].some(
        (m) => m == null ? void 0 : m.contains(u.target)
      );
      !d.value || y || (n("pointerDownOutside", u), n("interactOutside", u), await de(), u.defaultPrevented || n("dismiss"));
    }, a), f = wl((u) => {
      [...Q.branches].some(
        (y) => y == null ? void 0 : y.contains(u.target)
      ) || (n("focusOutside", u), n("interactOutside", u), u.defaultPrevented || n("dismiss"));
    }, a);
    Qi("Escape", (u) => {
      s.value === l.value.size - 1 && (n("escapeKeyDown", u), u.defaultPrevented || n("dismiss"));
    });
    let v;
    return fe((u) => {
      a.value && (r.disableOutsidePointerEvents && (Q.layersWithOutsidePointerEventsDisabled.size === 0 && (v = i.value.body.style.pointerEvents, i.value.body.style.pointerEvents = "none"), Q.layersWithOutsidePointerEventsDisabled.add(a.value)), l.value.add(a.value), u(() => {
        r.disableOutsidePointerEvents && Q.layersWithOutsidePointerEventsDisabled.size === 1 && (i.value.body.style.pointerEvents = v);
      }));
    }), fe((u) => {
      u(() => {
        a.value && (l.value.delete(a.value), Q.layersWithOutsidePointerEventsDisabled.delete(a.value));
      });
    }), (u, y) => (E(), $(g(Me), {
      ref: g(o),
      "as-child": u.asChild,
      as: u.as,
      "data-dismissable-layer": "",
      style: Wn({
        pointerEvents: c.value ? d.value ? "auto" : "none" : void 0
      }),
      onFocusCapture: g(f).onFocusCapture,
      onBlurCapture: g(f).onBlurCapture,
      onPointerdownCapture: g(p).onPointerDownCapture
    }, {
      default: O(() => [
        F(u.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as", "style", "onFocusCapture", "onBlurCapture", "onPointerdownCapture"]));
  }
}), At = "focusScope.autoFocusOnMount", Pt = "focusScope.autoFocusOnUnmount", Dr = { bubbles: !1, cancelable: !0 };
function Sl(t, { select: e = !1 } = {}) {
  const r = document.activeElement;
  for (const n of t)
    if (Z(n, { select: e }), document.activeElement !== r)
      return !0;
}
function El(t) {
  const e = xn(t), r = Fr(e, t), n = Fr(e.reverse(), t);
  return [r, n];
}
function xn(t) {
  const e = [], r = document.createTreeWalker(t, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (n) => {
      const o = n.tagName === "INPUT" && n.type === "hidden";
      return n.disabled || n.hidden || o ? NodeFilter.FILTER_SKIP : n.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; r.nextNode(); ) e.push(r.currentNode);
  return e;
}
function Fr(t, e) {
  for (const r of t)
    if (!Ol(r, { upTo: e }))
      return r;
}
function Ol(t, { upTo: e }) {
  if (getComputedStyle(t).visibility === "hidden")
    return !0;
  for (; t; ) {
    if (e !== void 0 && t === e)
      return !1;
    if (getComputedStyle(t).display === "none")
      return !0;
    t = t.parentElement;
  }
  return !1;
}
function Al(t) {
  return t instanceof HTMLInputElement && "select" in t;
}
function Z(t, { select: e = !1 } = {}) {
  if (t && t.focus) {
    const r = document.activeElement;
    t.focus({ preventScroll: !0 }), t !== r && Al(t) && e && t.select();
  }
}
const Pl = Li(() => S([]));
function Cl() {
  const t = Pl();
  return {
    add(e) {
      const r = t.value[0];
      e !== r && (r == null || r.pause()), t.value = Nr(t.value, e), t.value.unshift(e);
    },
    remove(e) {
      var r;
      t.value = Nr(t.value, e), (r = t.value[0]) == null || r.resume();
    }
  };
}
function Nr(t, e) {
  const r = [...t], n = r.indexOf(e);
  return n !== -1 && r.splice(n, 1), r;
}
function Il(t) {
  return t.filter((e) => e.tagName !== "A");
}
const $l = /* @__PURE__ */ B({
  __name: "FocusScope",
  props: {
    loop: { type: Boolean, default: !1 },
    trapped: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["mountAutoFocus", "unmountAutoFocus"],
  setup(t, { emit: e }) {
    const r = t, n = e, { currentRef: o, currentElement: a } = K(), i = S(null), l = Cl(), s = _r({
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    });
    fe((d) => {
      if (!pe)
        return;
      const p = a.value;
      if (!r.trapped)
        return;
      function f(m) {
        if (s.paused || !p)
          return;
        const b = m.target;
        p.contains(b) ? i.value = b : Z(i.value, { select: !0 });
      }
      function v(m) {
        if (s.paused || !p)
          return;
        const b = m.relatedTarget;
        b !== null && (p.contains(b) || Z(i.value, { select: !0 }));
      }
      function u(m) {
        p.contains(i.value) || Z(p);
      }
      document.addEventListener("focusin", f), document.addEventListener("focusout", v);
      const y = new MutationObserver(u);
      p && y.observe(p, { childList: !0, subtree: !0 }), d(() => {
        document.removeEventListener("focusin", f), document.removeEventListener("focusout", v), y.disconnect();
      });
    }), fe(async (d) => {
      const p = a.value;
      if (await de(), !p)
        return;
      l.add(s);
      const f = document.activeElement;
      if (!p.contains(f)) {
        const v = new CustomEvent(At, Dr);
        p.addEventListener(At, (u) => n("mountAutoFocus", u)), p.dispatchEvent(v), v.defaultPrevented || (Sl(Il(xn(p)), {
          select: !0
        }), document.activeElement === f && Z(p));
      }
      d(() => {
        p.removeEventListener(At, (y) => n("mountAutoFocus", y));
        const v = new CustomEvent(Pt, Dr), u = (y) => {
          n("unmountAutoFocus", y);
        };
        p.addEventListener(Pt, u), p.dispatchEvent(v), setTimeout(() => {
          v.defaultPrevented || Z(f ?? document.body, { select: !0 }), p.removeEventListener(Pt, u), l.remove(s);
        }, 0);
      });
    });
    function c(d) {
      if (!r.loop && !r.trapped || s.paused)
        return;
      const p = d.key === "Tab" && !d.altKey && !d.ctrlKey && !d.metaKey, f = document.activeElement;
      if (p && f) {
        const v = d.currentTarget, [u, y] = El(v);
        u && y ? !d.shiftKey && f === y ? (d.preventDefault(), r.loop && Z(u, { select: !0 })) : d.shiftKey && f === u && (d.preventDefault(), r.loop && Z(y, { select: !0 })) : f === v && d.preventDefault();
      }
    }
    return (d, p) => (E(), $(g(Me), {
      ref_key: "currentRef",
      ref: o,
      tabindex: "-1",
      "as-child": d.asChild,
      as: d.as,
      onKeydown: c
    }, {
      default: O(() => [
        F(d.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as"]));
  }
});
function Ml(t) {
  return t ? "open" : "closed";
}
const Dl = "DialogTitle", Fl = "DialogContent";
function Nl({
  titleName: t = Dl,
  contentName: e = Fl,
  componentLink: r = "dialog.html#title",
  titleId: n,
  descriptionId: o,
  contentElement: a
}) {
  const i = `Warning: \`${e}\` requires a \`${t}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://www.radix-vue.com/components/${r}`, l = `Warning: Missing \`Description\` or \`aria-describedby="undefined"\` for ${e}.`;
  lt(() => {
    var s;
    document.getElementById(n) || console.warn(i);
    const c = (s = a.value) == null ? void 0 : s.getAttribute("aria-describedby");
    o && c && (document.getElementById(o) || console.warn(l));
  });
}
const Sn = /* @__PURE__ */ B({
  __name: "DialogContentImpl",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(t, { emit: e }) {
    const r = t, n = e, o = ae(), { forwardRef: a, currentElement: i } = K();
    return o.titleId || (o.titleId = Mr(void 0, "radix-vue-dialog-title")), o.descriptionId || (o.descriptionId = Mr(void 0, "radix-vue-dialog-description")), lt(() => {
      o.contentElement = i, document.activeElement !== document.body && (o.triggerElement.value = document.activeElement);
    }), process.env.NODE_ENV !== "production" && Nl({
      titleName: "DialogTitle",
      contentName: "DialogContent",
      componentLink: "dialog.html#title",
      titleId: o.titleId,
      descriptionId: o.descriptionId,
      contentElement: i
    }), (l, s) => (E(), $(g($l), {
      "as-child": "",
      loop: "",
      trapped: r.trapFocus,
      onMountAutoFocus: s[5] || (s[5] = (c) => n("openAutoFocus", c)),
      onUnmountAutoFocus: s[6] || (s[6] = (c) => n("closeAutoFocus", c))
    }, {
      default: O(() => [
        _(g(xl), q({
          id: g(o).contentId,
          ref: g(a),
          as: l.as,
          "as-child": l.asChild,
          "disable-outside-pointer-events": l.disableOutsidePointerEvents,
          role: "dialog",
          "aria-describedby": g(o).descriptionId,
          "aria-labelledby": g(o).titleId,
          "data-state": g(Ml)(g(o).open.value)
        }, l.$attrs, {
          onDismiss: s[0] || (s[0] = (c) => g(o).onOpenChange(!1)),
          onEscapeKeyDown: s[1] || (s[1] = (c) => n("escapeKeyDown", c)),
          onFocusOutside: s[2] || (s[2] = (c) => n("focusOutside", c)),
          onInteractOutside: s[3] || (s[3] = (c) => n("interactOutside", c)),
          onPointerDownOutside: s[4] || (s[4] = (c) => n("pointerDownOutside", c))
        }), {
          default: O(() => [
            F(l.$slots, "default")
          ]),
          _: 3
        }, 16, ["id", "as", "as-child", "disable-outside-pointer-events", "aria-describedby", "aria-labelledby", "data-state"])
      ]),
      _: 3
    }, 8, ["trapped"]));
  }
}), Bl = /* @__PURE__ */ B({
  __name: "DialogContentModal",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(t, { emit: e }) {
    const r = t, n = e, o = ae(), a = er(n), { forwardRef: i, currentElement: l } = K();
    return ul(l), (s, c) => (E(), $(Sn, q({ ...r, ...g(a) }, {
      ref: g(i),
      "trap-focus": g(o).open.value,
      "disable-outside-pointer-events": !0,
      onCloseAutoFocus: c[0] || (c[0] = (d) => {
        var p;
        d.defaultPrevented || (d.preventDefault(), (p = g(o).triggerElement.value) == null || p.focus());
      }),
      onPointerDownOutside: c[1] || (c[1] = (d) => {
        const p = d.detail.originalEvent, f = p.button === 0 && p.ctrlKey === !0;
        (p.button === 2 || f) && d.preventDefault();
      }),
      onFocusOutside: c[2] || (c[2] = (d) => {
        d.preventDefault();
      })
    }), {
      default: O(() => [
        F(s.$slots, "default")
      ]),
      _: 3
    }, 16, ["trap-focus"]));
  }
}), Tl = /* @__PURE__ */ B({
  __name: "DialogContentNonModal",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(t, { emit: e }) {
    const r = t, n = er(e);
    K();
    const o = ae(), a = S(!1), i = S(!1);
    return (l, s) => (E(), $(Sn, q({ ...r, ...g(n) }, {
      "trap-focus": !1,
      "disable-outside-pointer-events": !1,
      onCloseAutoFocus: s[0] || (s[0] = (c) => {
        var d;
        c.defaultPrevented || (a.value || (d = g(o).triggerElement.value) == null || d.focus(), c.preventDefault()), a.value = !1, i.value = !1;
      }),
      onInteractOutside: s[1] || (s[1] = (c) => {
        var d;
        c.defaultPrevented || (a.value = !0, c.detail.originalEvent.type === "pointerdown" && (i.value = !0));
        const p = c.target;
        (d = g(o).triggerElement.value) != null && d.contains(p) && c.preventDefault(), c.detail.originalEvent.type === "focusin" && i.value && c.preventDefault();
      })
    }), {
      default: O(() => [
        F(l.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), En = /* @__PURE__ */ B({
  __name: "DialogContent",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(t, { emit: e }) {
    const r = t, n = e, o = ae(), a = er(n), { forwardRef: i } = K();
    return (l, s) => (E(), $(g(bn), {
      present: l.forceMount || g(o).open.value
    }, {
      default: O(() => [
        g(o).modal.value ? (E(), $(Bl, q({
          key: 0,
          ref: g(i)
        }, { ...r, ...g(a), ...l.$attrs }), {
          default: O(() => [
            F(l.$slots, "default")
          ]),
          _: 3
        }, 16)) : (E(), $(Tl, q({
          key: 1,
          ref: g(i)
        }, { ...r, ...g(a), ...l.$attrs }), {
          default: O(() => [
            F(l.$slots, "default")
          ]),
          _: 3
        }, 16))
      ]),
      _: 3
    }, 8, ["present"]));
  }
}), Rl = /* @__PURE__ */ B({
  __name: "DialogOverlayImpl",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(t) {
    const e = ae();
    return ol(!0), K(), (r, n) => (E(), $(g(Me), {
      as: r.as,
      "as-child": r.asChild,
      "data-state": g(e).open.value ? "open" : "closed",
      style: { "pointer-events": "auto" }
    }, {
      default: O(() => [
        F(r.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child", "data-state"]));
  }
}), _l = /* @__PURE__ */ B({
  __name: "DialogOverlay",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(t) {
    const e = ae(), { forwardRef: r } = K();
    return (n, o) => {
      var a;
      return (a = g(e)) != null && a.modal.value ? (E(), $(g(bn), {
        key: 0,
        present: n.forceMount || g(e).open.value
      }, {
        default: O(() => [
          _(Rl, q(n.$attrs, {
            ref: g(r),
            as: n.as,
            "as-child": n.asChild
          }), {
            default: O(() => [
              F(n.$slots, "default")
            ]),
            _: 3
          }, 16, ["as", "as-child"])
        ]),
        _: 3
      }, 8, ["present"])) : H("", !0);
    };
  }
}), kl = /* @__PURE__ */ B({
  __name: "DialogClose",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(t) {
    const e = t;
    K();
    const r = ae();
    return (n, o) => (E(), $(g(Me), q(e, {
      type: n.as === "button" ? "button" : void 0,
      onClick: o[0] || (o[0] = (a) => g(r).onOpenChange(!1))
    }), {
      default: O(() => [
        F(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["type"]));
  }
}), On = /* @__PURE__ */ B({
  __name: "DialogTitle",
  props: {
    asChild: { type: Boolean },
    as: { default: "h2" }
  },
  setup(t) {
    const e = t, r = ae();
    return K(), (n, o) => (E(), $(g(Me), q(e, {
      id: g(r).titleId
    }), {
      default: O(() => [
        F(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["id"]));
  }
}), An = /* @__PURE__ */ B({
  __name: "VisuallyHidden",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(t) {
    return K(), (e, r) => (E(), $(g(Me), {
      as: e.as,
      "as-child": e.asChild,
      style: {
        // See: https://github.com/twbs/bootstrap/blob/master/scss/mixins/_screen-reader.scss
        position: "absolute",
        border: 0,
        width: "1px",
        display: "inline-block",
        height: "1px",
        padding: 0,
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        wordWrap: "normal"
      }
    }, {
      default: O(() => [
        F(e.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
}), [Pn, rs] = Jt("CollectionProvider");
B({
  name: "CollectionSlot",
  setup(t, { slots: e }) {
    const r = Pn(), { primitiveElement: n, currentElement: o } = hn();
    return U(o, () => {
      r.collectionRef.value = o.value;
    }), () => re(tr, { ref: n }, e);
  }
});
B({
  name: "CollectionItem",
  inheritAttrs: !1,
  props: {
    value: {
      // It accepts any value
      validator: () => !0
    }
  },
  setup(t, { slots: e, attrs: r }) {
    const n = Pn(), { primitiveElement: o, currentElement: a } = hn();
    return fe((i) => {
      if (a.value) {
        const l = Br(a.value);
        n.itemMap.value.set(l, { ref: a.value, value: t.value }), i(() => n.itemMap.value.delete(l));
      }
    }), () => re(tr, { ...r, [n.attrName]: "", ref: o }, e);
  }
});
function Ll() {
  if (typeof matchMedia == "function")
    return matchMedia("(pointer:coarse)").matches ? "coarse" : "fine";
}
Ll();
const Cn = {
  __name: "CloseButton",
  setup(t) {
    return (e, r) => (E(), $(g(kl), { class: "im-close-button text-gray-400 hover:text-gray-500" }, {
      default: O(() => r[0] || (r[0] = [
        ne("span", { class: "sr-only" }, "Close", -1),
        ne("svg", {
          class: "size-6",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "2",
          stroke: "currentColor",
          "aria-hidden": "true"
        }, [
          ne("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M6 18L18 6M6 6l12 12"
          })
        ], -1)
      ])),
      _: 1
    }));
  }
}, Wl = { class: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4" }, Ul = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, jl = {
  __name: "ModalContent",
  props: {
    modalContext: Object,
    config: Object
  },
  setup(t) {
    return (e, r) => (E(), ce("div", Wl, [
      ne("div", {
        class: xe(["im-modal-positioner flex min-h-full justify-center", {
          "items-start": t.config.position === "top",
          "items-center": t.config.position === "center",
          "items-end": t.config.position === "bottom"
        }])
      }, [
        _(Lt, {
          appear: "",
          "enter-from-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          "enter-to-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-from-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-to-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          onAfterLeave: t.modalContext.afterLeave
        }, {
          default: O(() => [
            _(g(En), {
              "aria-describedby": void 0,
              class: xe({
                "im-modal-wrapper w-full transition duration-300 ease-in-out": !0,
                "blur-sm": !t.modalContext.onTopOfStack,
                "sm:max-w-sm": t.config.maxWidth == "sm",
                "sm:max-w-md": t.config.maxWidth == "md",
                "sm:max-w-md md:max-w-lg": t.config.maxWidth == "lg",
                "sm:max-w-md md:max-w-xl": t.config.maxWidth == "xl",
                "sm:max-w-md md:max-w-xl lg:max-w-2xl": t.config.maxWidth == "2xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl": t.config.maxWidth == "3xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl": t.config.maxWidth == "4xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl": t.config.maxWidth == "5xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl": t.config.maxWidth == "6xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl": t.config.maxWidth == "7xl"
              }),
              onEscapeKeyDown: r[0] || (r[0] = (n) => {
                var o;
                return ((o = t.config) == null ? void 0 : o.closeExplicitly) && n.preventDefault();
              }),
              onInteractOutside: r[1] || (r[1] = (n) => {
                var o;
                return ((o = t.config) == null ? void 0 : o.closeExplicitly) && n.preventDefault();
              })
            }, {
              default: O(() => [
                _(g(An), { "as-child": "" }, {
                  default: O(() => [
                    _(g(On))
                  ]),
                  _: 1
                }),
                ne("div", {
                  class: xe(["im-modal-content relative", [t.config.paddingClasses, t.config.panelClasses]])
                }, [
                  t.config.closeButton ? (E(), ce("div", Ul, [
                    _(Cn)
                  ])) : H("", !0),
                  F(e.$slots, "default", {
                    modalContext: t.modalContext,
                    config: t.config
                  })
                ], 2)
              ]),
              _: 3
            }, 8, ["class"])
          ]),
          _: 3
        }, 8, ["onAfterLeave"])
      ], 2)
    ]));
  }
}, ql = { class: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden" }, Kl = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, zl = {
  __name: "SlideoverContent",
  props: {
    modalContext: Object,
    config: Object
  },
  setup(t) {
    return (e, r) => (E(), ce("div", ql, [
      ne("div", {
        class: xe(["im-slideover-positioner flex min-h-full items-center", {
          "justify-start rtl:justify-end": t.config.position === "left",
          "justify-end rtl:justify-start": t.config.position === "right"
        }])
      }, [
        _(Lt, {
          appear: "",
          "enter-from-class": "opacity-0 " + (t.config.position === "left" ? "-translate-x-full" : "translate-x-full"),
          "enter-to-class": "opacity-100 translate-x-0",
          "leave-from-class": "opacity-100 translate-x-0",
          "leave-to-class": "opacity-0 " + (t.config.position === "left" ? "-translate-x-full" : "translate-x-full"),
          onAfterLeave: t.modalContext.afterLeave
        }, {
          default: O(() => [
            _(g(En), {
              "aria-describedby": void 0,
              class: xe({
                "im-slideover-wrapper w-full transition duration-300 ease-in-out": !0,
                "blur-sm": !t.modalContext.onTopOfStack,
                "sm:max-w-sm": t.config.maxWidth == "sm",
                "sm:max-w-md": t.config.maxWidth == "md",
                "sm:max-w-md md:max-w-lg": t.config.maxWidth == "lg",
                "sm:max-w-md md:max-w-xl": t.config.maxWidth == "xl",
                "sm:max-w-md md:max-w-xl lg:max-w-2xl": t.config.maxWidth == "2xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl": t.config.maxWidth == "3xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl": t.config.maxWidth == "4xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl": t.config.maxWidth == "5xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl": t.config.maxWidth == "6xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl": t.config.maxWidth == "7xl"
              }),
              onEscapeKeyDown: r[0] || (r[0] = (n) => {
                var o;
                return ((o = t.config) == null ? void 0 : o.closeExplicitly) && n.preventDefault();
              }),
              onInteractOutside: r[1] || (r[1] = (n) => {
                var o;
                return ((o = t.config) == null ? void 0 : o.closeExplicitly) && n.preventDefault();
              })
            }, {
              default: O(() => [
                _(g(An), { "as-child": "" }, {
                  default: O(() => [
                    _(g(On))
                  ]),
                  _: 1
                }),
                ne("div", {
                  class: xe(["im-slideover-content relative", [t.config.paddingClasses, t.config.panelClasses]])
                }, [
                  t.config.closeButton ? (E(), ce("div", Kl, [
                    _(Cn)
                  ])) : H("", !0),
                  F(e.$slots, "default", {
                    modalContext: t.modalContext,
                    config: t.config
                  })
                ], 2)
              ]),
              _: 3
            }, 8, ["class"])
          ]),
          _: 3
        }, 8, ["enter-from-class", "leave-to-class", "onAfterLeave"])
      ], 2)
    ]));
  }
}, Gl = ["data-inertiaui-modal-id", "data-inertiaui-modal-index"], Vl = {
  key: 1,
  class: "im-backdrop fixed inset-0 z-30 bg-black/75"
}, ns = {
  __name: "Modal",
  setup(t, { expose: e }) {
    const r = S(null), n = S(!1);
    return e({
      afterLeave: () => {
        var o;
        return (o = r.value) == null ? void 0 : o.afterLeave();
      },
      close: () => {
        var o;
        return (o = r.value) == null ? void 0 : o.close();
      },
      config: I(() => {
        var o;
        return (o = r.value) == null ? void 0 : o.config;
      }),
      emit: (...o) => {
        var a;
        return (a = r.value) == null ? void 0 : a.emit(...o);
      },
      getChildModal: () => {
        var o;
        return (o = r.value) == null ? void 0 : o.getChildModal();
      },
      getParentModal: () => {
        var o;
        return (o = r.value) == null ? void 0 : o.getParentModal();
      },
      id: I(() => {
        var o;
        return (o = r.value) == null ? void 0 : o.id;
      }),
      index: I(() => {
        var o;
        return (o = r.value) == null ? void 0 : o.index;
      }),
      isOpen: I(() => {
        var o;
        return (o = r.value) == null ? void 0 : o.isOpen;
      }),
      modalContext: I(() => {
        var o;
        return (o = r.value) == null ? void 0 : o.modalContext;
      }),
      onTopOfStack: I(() => {
        var o;
        return (o = r.value) == null ? void 0 : o.onTopOfStack;
      }),
      reload: (...o) => {
        var a;
        return (a = r.value) == null ? void 0 : a.reload(...o);
      },
      setOpen: (...o) => {
        var a;
        return (a = r.value) == null ? void 0 : a.setOpen(...o);
      },
      shouldRender: I(() => {
        var o;
        return (o = r.value) == null ? void 0 : o.shouldRender;
      })
    }), (o, a) => (E(), $(ki, {
      ref_key: "modal",
      ref: r
    }, {
      default: O(({
        afterLeave: i,
        close: l,
        config: s,
        emit: c,
        getChildModal: d,
        getParentModal: p,
        id: f,
        index: v,
        isOpen: u,
        modalContext: y,
        onTopOfStack: m,
        reload: b,
        setOpen: A,
        shouldRender: h
      }) => [
        _(g(yl), {
          open: u,
          "onUpdate:open": A
        }, {
          default: O(() => [
            _(g(ml), null, {
              default: O(() => [
                ne("div", {
                  "data-inertiaui-modal-id": f,
                  "data-inertiaui-modal-index": v,
                  class: "im-dialog relative z-20"
                }, [
                  v === 0 && m ? (E(), $(Lt, {
                    key: 0,
                    appear: !n.value,
                    "enter-active-class": "transition transform ease-in-out duration-300",
                    "enter-from-class": "opacity-0",
                    "enter-to-class": "opacity-100",
                    "leave-active-class": "transition transform ease-in-out duration-300",
                    "leave-from-class": "opacity-100",
                    "leave-to-class": "opacity-0",
                    onAfterAppear: a[0] || (a[0] = (x) => n.value = !0)
                  }, {
                    default: O(() => [
                      _(g(_l), { class: "im-backdrop fixed inset-0 z-30 bg-black/75" })
                    ]),
                    _: 1
                  }, 8, ["appear"])) : H("", !0),
                  v > 0 && m ? (E(), ce("div", Vl)) : H("", !0),
                  (E(), $(Lr(s != null && s.slideover ? zl : jl), {
                    "modal-context": y,
                    config: s
                  }, {
                    default: O(() => [
                      F(o.$slots, "default", {
                        id: f,
                        afterLeave: i,
                        close: l,
                        config: s,
                        emit: c,
                        getChildModal: d,
                        getParentModal: p,
                        index: v,
                        isOpen: u,
                        modalContext: y,
                        onTopOfStack: m,
                        reload: b,
                        setOpen: A,
                        shouldRender: h
                      })
                    ]),
                    _: 2
                  }, 1032, ["modal-context", "config"]))
                ], 8, Gl)
              ]),
              _: 2
            }, 1024)
          ]),
          _: 2
        }, 1032, ["open", "onUpdate:open"])
      ]),
      _: 3
    }, 512));
  }
}, os = {
  __name: "ModalLink",
  props: {
    href: {
      type: String,
      required: !0
    },
    method: {
      type: String,
      default: "get"
    },
    data: {
      type: Object,
      default: () => ({})
    },
    as: {
      type: String,
      default: "a"
    },
    headers: {
      type: Object,
      default: () => ({})
    },
    queryStringArrayFormat: {
      type: String,
      default: "brackets"
    },
    navigate: {
      type: Boolean,
      default: null
    },
    // Passthrough to Modal.vue
    closeButton: {
      type: Boolean,
      required: !1,
      default: null
    },
    closeExplicitly: {
      type: Boolean,
      required: !1,
      default: null
    },
    maxWidth: {
      type: String,
      required: !1,
      default: null
    },
    paddingClasses: {
      type: [Boolean, String],
      required: !1,
      default: null
    },
    panelClasses: {
      type: [Boolean, String],
      required: !1,
      default: null
    },
    position: {
      type: String,
      required: !1,
      default: null
    },
    slideover: {
      type: Boolean,
      required: !1,
      default: null
    }
  },
  emits: ["after-leave", "blur", "close", "error", "focus", "start", "success"],
  setup(t, { emit: e }) {
    const r = t, n = S(!1), o = je(), a = S(null);
    Rt("modalContext", a);
    const i = e, l = S(!1), s = I(() => r.navigate ?? Wt("navigate"));
    U(
      () => {
        var y;
        return (y = a.value) == null ? void 0 : y.onTopOfStack;
      },
      (y) => {
        a.value && (y && l.value ? i("focus") : y || i("blur"), l.value = !y);
      }
    );
    const c = S(null);
    et(() => {
      var y;
      return (y = c.value) == null ? void 0 : y.call(c);
    });
    const d = Tr();
    function p() {
      c.value = a.value.registerEventListenersFromAttrs(d);
    }
    U(a, (y, m) => {
      y && !m && (p(), i("success"));
    });
    function f() {
      i("close");
    }
    function v() {
      a.value = null, i("after-leave");
    }
    function u() {
      n.value || (r.href.startsWith("#") || (n.value = !0, i("start")), o.visit(
        r.href,
        r.method,
        r.data,
        r.headers,
        Vn(Ur(r, _i)),
        f,
        v,
        r.queryStringArrayFormat,
        s.value
      ).then((y) => {
        a.value = y;
      }).catch((y) => i("error", y)).finally(() => n.value = !1));
    }
    return (y, m) => (E(), $(Lr(t.as), q(g(d), {
      href: t.href,
      onClick: qn(u, ["prevent"])
    }), {
      default: O(() => [
        F(y.$slots, "default", { loading: n.value })
      ]),
      _: 3
    }, 16, ["href"]));
  }
};
function as() {
  return Kn(kt("modalContext", null));
}
function is(t, e = {}) {
  return je().visit(
    t,
    e.method ?? "get",
    e.data ?? {},
    e.headers ?? {},
    e.config ?? {},
    e.onClose,
    e.onAfterLeave,
    e.queryStringArrayFormat ?? "brackets",
    e.navigate ?? Wt("navigate")
  ).then((r) => {
    const n = e.listeners ?? {};
    return Object.keys(n).forEach((o) => {
      const a = o.replace(/([A-Z])/g, "-$1").toLowerCase();
      r.on(a, n[o]);
    }), r;
  });
}
export {
  ki as HeadlessModal,
  ns as Modal,
  os as ModalLink,
  Fi as ModalRoot,
  Wt as getConfig,
  Zl as putConfig,
  es as renderApp,
  Yl as resetConfig,
  as as useModal,
  is as visitModal
};
