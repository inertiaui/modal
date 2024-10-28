var Cn = Object.defineProperty;
var $n = (t, e, r) => e in t ? Cn(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var L = (t, e, r) => $n(t, typeof e != "symbol" ? e + "" : e, r);
import * as rr from "vue";
import { computed as $, provide as Tt, openBlock as O, createBlock as I, unref as g, mergeProps as q, createCommentVNode as H, ref as S, onUnmounted as we, onBeforeMount as In, createElementBlock as ce, Fragment as Rt, renderSlot as F, h as re, readonly as Mn, markRaw as Nr, nextTick as de, inject as _t, onBeforeUnmount as Ye, onMounted as at, useAttrs as Br, defineComponent as B, Comment as Dn, cloneVNode as Fn, toRefs as Tr, getCurrentInstance as Ce, normalizeProps as Nn, guardReactiveProps as Bn, withCtx as E, reactive as Rr, createVNode as _, watch as j, watchEffect as fe, effectScope as _r, Teleport as Tn, toHandlerKey as Rn, camelize as _n, normalizeStyle as kn, getCurrentScope as Ln, onScopeDispose as Wn, createElementVNode as ne, normalizeClass as xe, Transition as kt, resolveDynamicComponent as kr, withModifiers as Un, toValue as jn } from "vue";
import { router as Be, usePage as qn } from "@inertiajs/vue3";
import Ze from "axios";
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
class Kn {
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
const it = new Kn(), Xl = () => it.reset(), Yl = (t, e) => it.put(t, e), Lt = (t) => it.get(t), ve = (t, e) => it.get(t ? `slideover.${e}` : `modal.${e}`);
function zn(t, e) {
  return Array.isArray(t) ? t.filter((r) => !e.includes(r)) : Object.keys(t).reduce((r, n) => (e.includes(n) || (r[n] = t[n]), r), {});
}
function Lr(t, e) {
  return Array.isArray(t) ? t.filter((r) => e.includes(r)) : e.reduce((r, n) => (n in t && (r[n] = t[n]), r), {});
}
function Gn(t) {
  return Array.isArray(t) ? t.filter((e) => e !== null) : Object.keys(t).reduce((e, r) => (r in t && t[r] !== null && (e[r] = t[r]), e), {});
}
function Vn(t, e = 3, r = 10) {
  return new Promise((n, o) => {
    const a = t();
    if (a) {
      n(a);
      return;
    }
    let i = e * 1e3 / r;
    const l = setInterval(() => {
      const u = t();
      u && (clearInterval(l), n(u)), --i <= 0 && (clearInterval(l), o(new Error("Condition not met in time")));
    }, r);
  });
}
var At = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Hn(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Qn(t) {
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
  return Xn(e) && !Yn(e);
};
function Xn(t) {
  return !!t && typeof t == "object";
}
function Yn(t) {
  var e = Object.prototype.toString.call(t);
  return e === "[object RegExp]" || e === "[object Date]" || to(t);
}
var Zn = typeof Symbol == "function" && Symbol.for, eo = Zn ? Symbol.for("react.element") : 60103;
function to(t) {
  return t.$$typeof === eo;
}
function ro(t) {
  return Array.isArray(t) ? [] : {};
}
function ke(t, e) {
  return e.clone !== !1 && e.isMergeableObject(t) ? Oe(ro(t), t, e) : t;
}
function no(t, e, r) {
  return t.concat(e).map(function(n) {
    return ke(n, r);
  });
}
function oo(t, e) {
  if (!e.customMerge)
    return Oe;
  var r = e.customMerge(t);
  return typeof r == "function" ? r : Oe;
}
function ao(t) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(t).filter(function(e) {
    return Object.propertyIsEnumerable.call(t, e);
  }) : [];
}
function nr(t) {
  return Object.keys(t).concat(ao(t));
}
function Wr(t, e) {
  try {
    return e in t;
  } catch {
    return !1;
  }
}
function io(t, e) {
  return Wr(t, e) && !(Object.hasOwnProperty.call(t, e) && Object.propertyIsEnumerable.call(t, e));
}
function lo(t, e, r) {
  var n = {};
  return r.isMergeableObject(t) && nr(t).forEach(function(o) {
    n[o] = ke(t[o], r);
  }), nr(e).forEach(function(o) {
    io(t, o) || (Wr(t, o) && r.isMergeableObject(e[o]) ? n[o] = oo(o, r)(t[o], e[o], r) : n[o] = ke(e[o], r));
  }), n;
}
function Oe(t, e, r) {
  r = r || {}, r.arrayMerge = r.arrayMerge || no, r.isMergeableObject = r.isMergeableObject || Jn, r.cloneUnlessOtherwiseSpecified = ke;
  var n = Array.isArray(e), o = Array.isArray(t), a = n === o;
  return a ? n ? r.arrayMerge(t, e, r) : lo(t, e, r) : ke(e, r);
}
Oe.all = function(e, r) {
  if (!Array.isArray(e))
    throw new Error("first argument should be an array");
  return e.reduce(function(n, o) {
    return Oe(n, o, r);
  }, {});
};
var so = Oe, uo = so;
const co = /* @__PURE__ */ Hn(uo);
var fo = Error, po = EvalError, yo = RangeError, vo = ReferenceError, Ur = SyntaxError, Le = TypeError, mo = URIError, go = function() {
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
}, or = typeof Symbol < "u" && Symbol, ho = go, bo = function() {
  return typeof or != "function" || typeof Symbol != "function" || typeof or("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : ho();
}, ut = {
  __proto__: null,
  foo: {}
}, wo = Object, xo = function() {
  return { __proto__: ut }.foo === ut.foo && !(ut instanceof wo);
}, So = "Function.prototype.bind called on incompatible ", Oo = Object.prototype.toString, Eo = Math.max, Ao = "[object Function]", ar = function(e, r) {
  for (var n = [], o = 0; o < e.length; o += 1)
    n[o] = e[o];
  for (var a = 0; a < r.length; a += 1)
    n[a + e.length] = r[a];
  return n;
}, Po = function(e, r) {
  for (var n = [], o = r, a = 0; o < e.length; o += 1, a += 1)
    n[a] = e[o];
  return n;
}, Co = function(t, e) {
  for (var r = "", n = 0; n < t.length; n += 1)
    r += t[n], n + 1 < t.length && (r += e);
  return r;
}, $o = function(e) {
  var r = this;
  if (typeof r != "function" || Oo.apply(r) !== Ao)
    throw new TypeError(So + r);
  for (var n = Po(arguments, 1), o, a = function() {
    if (this instanceof o) {
      var d = r.apply(
        this,
        ar(n, arguments)
      );
      return Object(d) === d ? d : this;
    }
    return r.apply(
      e,
      ar(n, arguments)
    );
  }, i = Eo(0, r.length - n.length), l = [], u = 0; u < i; u++)
    l[u] = "$" + u;
  if (o = Function("binder", "return function (" + Co(l, ",") + "){ return binder.apply(this,arguments); }")(a), r.prototype) {
    var c = function() {
    };
    c.prototype = r.prototype, o.prototype = new c(), c.prototype = null;
  }
  return o;
}, Io = $o, Wt = Function.prototype.bind || Io, Mo = Function.prototype.call, Do = Object.prototype.hasOwnProperty, Fo = Wt, No = Fo.call(Mo, Do), w, Bo = fo, To = po, Ro = yo, _o = vo, Ee = Ur, Se = Le, ko = mo, jr = Function, ct = function(t) {
  try {
    return jr('"use strict"; return (' + t + ").constructor;")();
  } catch {
  }
}, se = Object.getOwnPropertyDescriptor;
if (se)
  try {
    se({}, "");
  } catch {
    se = null;
  }
var ft = function() {
  throw new Se();
}, Lo = se ? function() {
  try {
    return arguments.callee, ft;
  } catch {
    try {
      return se(arguments, "callee").get;
    } catch {
      return ft;
    }
  }
}() : ft, me = bo(), Wo = xo(), T = Object.getPrototypeOf || (Wo ? function(t) {
  return t.__proto__;
} : null), be = {}, Uo = typeof Uint8Array > "u" || !T ? w : T(Uint8Array), ue = {
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
  "%Error%": Bo,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": To,
  "%Float32Array%": typeof Float32Array > "u" ? w : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? w : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? w : FinalizationRegistry,
  "%Function%": jr,
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
  "%RangeError%": Ro,
  "%ReferenceError%": _o,
  "%Reflect%": typeof Reflect > "u" ? w : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? w : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !me || !T ? w : T((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? w : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": me && T ? T(""[Symbol.iterator]()) : w,
  "%Symbol%": me ? Symbol : w,
  "%SyntaxError%": Ee,
  "%ThrowTypeError%": Lo,
  "%TypedArray%": Uo,
  "%TypeError%": Se,
  "%Uint8Array%": typeof Uint8Array > "u" ? w : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? w : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? w : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? w : Uint32Array,
  "%URIError%": ko,
  "%WeakMap%": typeof WeakMap > "u" ? w : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? w : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? w : WeakSet
};
if (T)
  try {
    null.error;
  } catch (t) {
    var jo = T(T(t));
    ue["%Error.prototype%"] = jo;
  }
var qo = function t(e) {
  var r;
  if (e === "%AsyncFunction%")
    r = ct("async function () {}");
  else if (e === "%GeneratorFunction%")
    r = ct("function* () {}");
  else if (e === "%AsyncGeneratorFunction%")
    r = ct("async function* () {}");
  else if (e === "%AsyncGenerator%") {
    var n = t("%AsyncGeneratorFunction%");
    n && (r = n.prototype);
  } else if (e === "%AsyncIteratorPrototype%") {
    var o = t("%AsyncGenerator%");
    o && T && (r = T(o.prototype));
  }
  return ue[e] = r, r;
}, ir = {
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
}, We = Wt, et = No, Ko = We.call(Function.call, Array.prototype.concat), zo = We.call(Function.apply, Array.prototype.splice), lr = We.call(Function.call, String.prototype.replace), tt = We.call(Function.call, String.prototype.slice), Go = We.call(Function.call, RegExp.prototype.exec), Vo = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, Ho = /\\(\\)?/g, Qo = function(e) {
  var r = tt(e, 0, 1), n = tt(e, -1);
  if (r === "%" && n !== "%")
    throw new Ee("invalid intrinsic syntax, expected closing `%`");
  if (n === "%" && r !== "%")
    throw new Ee("invalid intrinsic syntax, expected opening `%`");
  var o = [];
  return lr(e, Vo, function(a, i, l, u) {
    o[o.length] = l ? lr(u, Ho, "$1") : i || a;
  }), o;
}, Jo = function(e, r) {
  var n = e, o;
  if (et(ir, n) && (o = ir[n], n = "%" + o[0] + "%"), et(ue, n)) {
    var a = ue[n];
    if (a === be && (a = qo(n)), typeof a > "u" && !r)
      throw new Se("intrinsic " + e + " exists, but is not available. Please file an issue!");
    return {
      alias: o,
      name: n,
      value: a
    };
  }
  throw new Ee("intrinsic " + e + " does not exist!");
}, $e = function(e, r) {
  if (typeof e != "string" || e.length === 0)
    throw new Se("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof r != "boolean")
    throw new Se('"allowMissing" argument must be a boolean');
  if (Go(/^%?[^%]*%?$/, e) === null)
    throw new Ee("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var n = Qo(e), o = n.length > 0 ? n[0] : "", a = Jo("%" + o + "%", r), i = a.name, l = a.value, u = !1, c = a.alias;
  c && (o = c[0], zo(n, Ko([0, 1], c)));
  for (var d = 1, p = !0; d < n.length; d += 1) {
    var f = n[d], v = tt(f, 0, 1), s = tt(f, -1);
    if ((v === '"' || v === "'" || v === "`" || s === '"' || s === "'" || s === "`") && v !== s)
      throw new Ee("property names with quotes must have matching quotes");
    if ((f === "constructor" || !p) && (u = !0), o += "." + f, i = "%" + o + "%", et(ue, i))
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
        p = et(l, f), l = l[f];
      p && !u && (ue[i] = l);
    }
  }
  return l;
}, qr = { exports: {} }, dt, sr;
function Ut() {
  if (sr) return dt;
  sr = 1;
  var t = $e, e = t("%Object.defineProperty%", !0) || !1;
  if (e)
    try {
      e({}, "a", { value: 1 });
    } catch {
      e = !1;
    }
  return dt = e, dt;
}
var Xo = $e, Je = Xo("%Object.getOwnPropertyDescriptor%", !0);
if (Je)
  try {
    Je([], "length");
  } catch {
    Je = null;
  }
var Kr = Je, ur = Ut(), Yo = Ur, ge = Le, cr = Kr, Zo = function(e, r, n) {
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
  var o = arguments.length > 3 ? arguments[3] : null, a = arguments.length > 4 ? arguments[4] : null, i = arguments.length > 5 ? arguments[5] : null, l = arguments.length > 6 ? arguments[6] : !1, u = !!cr && cr(e, r);
  if (ur)
    ur(e, r, {
      configurable: i === null && u ? u.configurable : !i,
      enumerable: o === null && u ? u.enumerable : !o,
      value: n,
      writable: a === null && u ? u.writable : !a
    });
  else if (l || !o && !a && !i)
    e[r] = n;
  else
    throw new Yo("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
}, Pt = Ut(), zr = function() {
  return !!Pt;
};
zr.hasArrayLengthDefineBug = function() {
  if (!Pt)
    return null;
  try {
    return Pt([], "length", { value: 1 }).length !== 1;
  } catch {
    return !0;
  }
};
var ea = zr, ta = $e, fr = Zo, ra = ea(), dr = Kr, pr = Le, na = ta("%Math.floor%"), oa = function(e, r) {
  if (typeof e != "function")
    throw new pr("`fn` is not a function");
  if (typeof r != "number" || r < 0 || r > 4294967295 || na(r) !== r)
    throw new pr("`length` must be a positive 32-bit integer");
  var n = arguments.length > 2 && !!arguments[2], o = !0, a = !0;
  if ("length" in e && dr) {
    var i = dr(e, "length");
    i && !i.configurable && (o = !1), i && !i.writable && (a = !1);
  }
  return (o || a || !n) && (ra ? fr(
    /** @type {Parameters<define>[0]} */
    e,
    "length",
    r,
    !0,
    !0
  ) : fr(
    /** @type {Parameters<define>[0]} */
    e,
    "length",
    r
  )), e;
};
(function(t) {
  var e = Wt, r = $e, n = oa, o = Le, a = r("%Function.prototype.apply%"), i = r("%Function.prototype.call%"), l = r("%Reflect.apply%", !0) || e.call(i, a), u = Ut(), c = r("%Math.max%");
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
  u ? u(t.exports, "apply", { value: d }) : t.exports.apply = d;
})(qr);
var aa = qr.exports, Gr = $e, Vr = aa, ia = Vr(Gr("String.prototype.indexOf")), la = function(e, r) {
  var n = Gr(e, !!r);
  return typeof n == "function" && ia(e, ".prototype.") > -1 ? Vr(n) : n;
};
const sa = {}, ua = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sa
}, Symbol.toStringTag, { value: "Module" })), ca = /* @__PURE__ */ Qn(ua);
var jt = typeof Map == "function" && Map.prototype, pt = Object.getOwnPropertyDescriptor && jt ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, rt = jt && pt && typeof pt.get == "function" ? pt.get : null, yr = jt && Map.prototype.forEach, qt = typeof Set == "function" && Set.prototype, yt = Object.getOwnPropertyDescriptor && qt ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, nt = qt && yt && typeof yt.get == "function" ? yt.get : null, vr = qt && Set.prototype.forEach, fa = typeof WeakMap == "function" && WeakMap.prototype, Te = fa ? WeakMap.prototype.has : null, da = typeof WeakSet == "function" && WeakSet.prototype, Re = da ? WeakSet.prototype.has : null, pa = typeof WeakRef == "function" && WeakRef.prototype, mr = pa ? WeakRef.prototype.deref : null, ya = Boolean.prototype.valueOf, va = Object.prototype.toString, ma = Function.prototype.toString, ga = String.prototype.match, Kt = String.prototype.slice, te = String.prototype.replace, ha = String.prototype.toUpperCase, gr = String.prototype.toLowerCase, Hr = RegExp.prototype.test, hr = Array.prototype.concat, V = Array.prototype.join, ba = Array.prototype.slice, br = Math.floor, Ct = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, vt = Object.getOwnPropertySymbols, $t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, Ae = typeof Symbol == "function" && typeof Symbol.iterator == "object", R = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === Ae || !0) ? Symbol.toStringTag : null, Qr = Object.prototype.propertyIsEnumerable, wr = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(t) {
  return t.__proto__;
} : null);
function xr(t, e) {
  if (t === 1 / 0 || t === -1 / 0 || t !== t || t && t > -1e3 && t < 1e3 || Hr.call(/e/, e))
    return e;
  var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof t == "number") {
    var n = t < 0 ? -br(-t) : br(t);
    if (n !== t) {
      var o = String(n), a = Kt.call(e, o.length + 1);
      return te.call(o, r, "$&_") + "." + te.call(te.call(a, /([0-9]{3})/g, "$&_"), /_$/, "");
    }
  }
  return te.call(e, r, "$&_");
}
var It = ca, Sr = It.custom, Or = Xr(Sr) ? Sr : null, wa = function t(e, r, n, o) {
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
    return Zr(e, a);
  if (typeof e == "number") {
    if (e === 0)
      return 1 / 0 / e > 0 ? "0" : "-0";
    var u = String(e);
    return l ? xr(e, u) : u;
  }
  if (typeof e == "bigint") {
    var c = String(e) + "n";
    return l ? xr(e, c) : c;
  }
  var d = typeof a.depth > "u" ? 5 : a.depth;
  if (typeof n > "u" && (n = 0), n >= d && d > 0 && typeof e == "object")
    return Mt(e) ? "[Array]" : "[Object]";
  var p = ka(a, n);
  if (typeof o > "u")
    o = [];
  else if (Yr(o, e) >= 0)
    return "[Circular]";
  function f(U, X, Y) {
    if (X && (o = ba.call(o), o.push(X)), Y) {
      var De = {
        depth: a.depth
      };
      return ee(a, "quoteStyle") && (De.quoteStyle = a.quoteStyle), t(U, De, n + 1, o);
    }
    return t(U, a, n + 1, o);
  }
  if (typeof e == "function" && !Er(e)) {
    var v = Ia(e), s = Ke(e, f);
    return "[Function" + (v ? ": " + v : " (anonymous)") + "]" + (s.length > 0 ? " { " + V.call(s, ", ") + " }" : "");
  }
  if (Xr(e)) {
    var y = Ae ? te.call(String(e), /^(Symbol\(.*\))_[^)]*$/, "$1") : $t.call(e);
    return typeof e == "object" && !Ae ? Ne(y) : y;
  }
  if (Ta(e)) {
    for (var m = "<" + gr.call(String(e.nodeName)), b = e.attributes || [], A = 0; A < b.length; A++)
      m += " " + b[A].name + "=" + Jr(xa(b[A].value), "double", a);
    return m += ">", e.childNodes && e.childNodes.length && (m += "..."), m += "</" + gr.call(String(e.nodeName)) + ">", m;
  }
  if (Mt(e)) {
    if (e.length === 0)
      return "[]";
    var h = Ke(e, f);
    return p && !_a(h) ? "[" + Dt(h, p) + "]" : "[ " + V.call(h, ", ") + " ]";
  }
  if (Oa(e)) {
    var x = Ke(e, f);
    return !("cause" in Error.prototype) && "cause" in e && !Qr.call(e, "cause") ? "{ [" + String(e) + "] " + V.call(hr.call("[cause]: " + f(e.cause), x), ", ") + " }" : x.length === 0 ? "[" + String(e) + "]" : "{ [" + String(e) + "] " + V.call(x, ", ") + " }";
  }
  if (typeof e == "object" && i) {
    if (Or && typeof e[Or] == "function" && It)
      return It(e, { depth: d - n });
    if (i !== "symbol" && typeof e.inspect == "function")
      return e.inspect();
  }
  if (Ma(e)) {
    var P = [];
    return yr && yr.call(e, function(U, X) {
      P.push(f(X, e, !0) + " => " + f(U, e));
    }), Ar("Map", rt.call(e), P, p);
  }
  if (Na(e)) {
    var D = [];
    return vr && vr.call(e, function(U) {
      D.push(f(U, e));
    }), Ar("Set", nt.call(e), D, p);
  }
  if (Da(e))
    return mt("WeakMap");
  if (Ba(e))
    return mt("WeakSet");
  if (Fa(e))
    return mt("WeakRef");
  if (Aa(e))
    return Ne(f(Number(e)));
  if (Ca(e))
    return Ne(f(Ct.call(e)));
  if (Pa(e))
    return Ne(ya.call(e));
  if (Ea(e))
    return Ne(f(String(e)));
  if (typeof window < "u" && e === window)
    return "{ [object Window] }";
  if (typeof globalThis < "u" && e === globalThis || typeof At < "u" && e === At)
    return "{ [object globalThis] }";
  if (!Sa(e) && !Er(e)) {
    var k = Ke(e, f), W = wr ? wr(e) === Object.prototype : e instanceof Object || e.constructor === Object, ie = e instanceof Object ? "" : "null prototype", J = !W && R && Object(e) === e && R in e ? Kt.call(oe(e), 8, -1) : ie ? "Object" : "", qe = W || typeof e.constructor != "function" ? "" : e.constructor.name ? e.constructor.name + " " : "", ye = qe + (J || ie ? "[" + V.call(hr.call([], J || [], ie || []), ": ") + "] " : "");
    return k.length === 0 ? ye + "{}" : p ? ye + "{" + Dt(k, p) + "}" : ye + "{ " + V.call(k, ", ") + " }";
  }
  return String(e);
};
function Jr(t, e, r) {
  var n = (r.quoteStyle || e) === "double" ? '"' : "'";
  return n + t + n;
}
function xa(t) {
  return te.call(String(t), /"/g, "&quot;");
}
function Mt(t) {
  return oe(t) === "[object Array]" && (!R || !(typeof t == "object" && R in t));
}
function Sa(t) {
  return oe(t) === "[object Date]" && (!R || !(typeof t == "object" && R in t));
}
function Er(t) {
  return oe(t) === "[object RegExp]" && (!R || !(typeof t == "object" && R in t));
}
function Oa(t) {
  return oe(t) === "[object Error]" && (!R || !(typeof t == "object" && R in t));
}
function Ea(t) {
  return oe(t) === "[object String]" && (!R || !(typeof t == "object" && R in t));
}
function Aa(t) {
  return oe(t) === "[object Number]" && (!R || !(typeof t == "object" && R in t));
}
function Pa(t) {
  return oe(t) === "[object Boolean]" && (!R || !(typeof t == "object" && R in t));
}
function Xr(t) {
  if (Ae)
    return t && typeof t == "object" && t instanceof Symbol;
  if (typeof t == "symbol")
    return !0;
  if (!t || typeof t != "object" || !$t)
    return !1;
  try {
    return $t.call(t), !0;
  } catch {
  }
  return !1;
}
function Ca(t) {
  if (!t || typeof t != "object" || !Ct)
    return !1;
  try {
    return Ct.call(t), !0;
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
  return va.call(t);
}
function Ia(t) {
  if (t.name)
    return t.name;
  var e = ga.call(ma.call(t), /^function\s*([\w$]+)/);
  return e ? e[1] : null;
}
function Yr(t, e) {
  if (t.indexOf)
    return t.indexOf(e);
  for (var r = 0, n = t.length; r < n; r++)
    if (t[r] === e)
      return r;
  return -1;
}
function Ma(t) {
  if (!rt || !t || typeof t != "object")
    return !1;
  try {
    rt.call(t);
    try {
      nt.call(t);
    } catch {
      return !0;
    }
    return t instanceof Map;
  } catch {
  }
  return !1;
}
function Da(t) {
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
function Fa(t) {
  if (!mr || !t || typeof t != "object")
    return !1;
  try {
    return mr.call(t), !0;
  } catch {
  }
  return !1;
}
function Na(t) {
  if (!nt || !t || typeof t != "object")
    return !1;
  try {
    nt.call(t);
    try {
      rt.call(t);
    } catch {
      return !0;
    }
    return t instanceof Set;
  } catch {
  }
  return !1;
}
function Ba(t) {
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
function Ta(t) {
  return !t || typeof t != "object" ? !1 : typeof HTMLElement < "u" && t instanceof HTMLElement ? !0 : typeof t.nodeName == "string" && typeof t.getAttribute == "function";
}
function Zr(t, e) {
  if (t.length > e.maxStringLength) {
    var r = t.length - e.maxStringLength, n = "... " + r + " more character" + (r > 1 ? "s" : "");
    return Zr(Kt.call(t, 0, e.maxStringLength), e) + n;
  }
  var o = te.call(te.call(t, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, Ra);
  return Jr(o, "single", e);
}
function Ra(t) {
  var e = t.charCodeAt(0), r = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[e];
  return r ? "\\" + r : "\\x" + (e < 16 ? "0" : "") + ha.call(e.toString(16));
}
function Ne(t) {
  return "Object(" + t + ")";
}
function mt(t) {
  return t + " { ? }";
}
function Ar(t, e, r, n) {
  var o = n ? Dt(r, n) : V.call(r, ", ");
  return t + " (" + e + ") {" + o + "}";
}
function _a(t) {
  for (var e = 0; e < t.length; e++)
    if (Yr(t[e], `
`) >= 0)
      return !1;
  return !0;
}
function ka(t, e) {
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
function Dt(t, e) {
  if (t.length === 0)
    return "";
  var r = `
` + e.prev + e.base;
  return r + V.call(t, "," + r) + `
` + e.prev;
}
function Ke(t, e) {
  var r = Mt(t), n = [];
  if (r) {
    n.length = t.length;
    for (var o = 0; o < t.length; o++)
      n[o] = ee(t, o) ? e(t[o], t) : "";
  }
  var a = typeof vt == "function" ? vt(t) : [], i;
  if (Ae) {
    i = {};
    for (var l = 0; l < a.length; l++)
      i["$" + a[l]] = a[l];
  }
  for (var u in t)
    ee(t, u) && (r && String(Number(u)) === u && u < t.length || Ae && i["$" + u] instanceof Symbol || (Hr.call(/[^\w$]/, u) ? n.push(e(u, t) + ": " + e(t[u], t)) : n.push(u + ": " + e(t[u], t))));
  if (typeof vt == "function")
    for (var c = 0; c < a.length; c++)
      Qr.call(t, a[c]) && n.push("[" + e(a[c]) + "]: " + e(t[a[c]], t));
  return n;
}
var en = $e, Ie = la, La = wa, Wa = Le, ze = en("%WeakMap%", !0), Ge = en("%Map%", !0), Ua = Ie("WeakMap.prototype.get", !0), ja = Ie("WeakMap.prototype.set", !0), qa = Ie("WeakMap.prototype.has", !0), Ka = Ie("Map.prototype.get", !0), za = Ie("Map.prototype.set", !0), Ga = Ie("Map.prototype.has", !0), zt = function(t, e) {
  for (var r = t, n; (n = r.next) !== null; r = n)
    if (n.key === e)
      return r.next = n.next, n.next = /** @type {NonNullable<typeof list.next>} */
      t.next, t.next = n, n;
}, Va = function(t, e) {
  var r = zt(t, e);
  return r && r.value;
}, Ha = function(t, e, r) {
  var n = zt(t, e);
  n ? n.value = r : t.next = /** @type {import('.').ListNode<typeof value>} */
  {
    // eslint-disable-line no-param-reassign, no-extra-parens
    key: e,
    next: t.next,
    value: r
  };
}, Qa = function(t, e) {
  return !!zt(t, e);
}, Ja = function() {
  var e, r, n, o = {
    assert: function(a) {
      if (!o.has(a))
        throw new Wa("Side channel does not contain " + La(a));
    },
    get: function(a) {
      if (ze && a && (typeof a == "object" || typeof a == "function")) {
        if (e)
          return Ua(e, a);
      } else if (Ge) {
        if (r)
          return Ka(r, a);
      } else if (n)
        return Va(n, a);
    },
    has: function(a) {
      if (ze && a && (typeof a == "object" || typeof a == "function")) {
        if (e)
          return qa(e, a);
      } else if (Ge) {
        if (r)
          return Ga(r, a);
      } else if (n)
        return Qa(n, a);
      return !1;
    },
    set: function(a, i) {
      ze && a && (typeof a == "object" || typeof a == "function") ? (e || (e = new ze()), ja(e, a, i)) : Ge ? (r || (r = new Ge()), za(r, a, i)) : (n || (n = { key: {}, next: null }), Ha(n, a, i));
    }
  };
  return o;
}, Xa = String.prototype.replace, Ya = /%20/g, gt = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
}, Gt = {
  default: gt.RFC3986,
  formatters: {
    RFC1738: function(t) {
      return Xa.call(t, Ya, "+");
    },
    RFC3986: function(t) {
      return String(t);
    }
  },
  RFC1738: gt.RFC1738,
  RFC3986: gt.RFC3986
}, Za = Gt, ht = Object.prototype.hasOwnProperty, le = Array.isArray, z = function() {
  for (var t = [], e = 0; e < 256; ++e)
    t.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());
  return t;
}(), ei = function(e) {
  for (; e.length > 1; ) {
    var r = e.pop(), n = r.obj[r.prop];
    if (le(n)) {
      for (var o = [], a = 0; a < n.length; ++a)
        typeof n[a] < "u" && o.push(n[a]);
      r.obj[r.prop] = o;
    }
  }
}, tn = function(e, r) {
  for (var n = r && r.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, o = 0; o < e.length; ++o)
    typeof e[o] < "u" && (n[o] = e[o]);
  return n;
}, ti = function t(e, r, n) {
  if (!r)
    return e;
  if (typeof r != "object") {
    if (le(e))
      e.push(r);
    else if (e && typeof e == "object")
      (n && (n.plainObjects || n.allowPrototypes) || !ht.call(Object.prototype, r)) && (e[r] = !0);
    else
      return [e, r];
    return e;
  }
  if (!e || typeof e != "object")
    return [e].concat(r);
  var o = e;
  return le(e) && !le(r) && (o = tn(e, n)), le(e) && le(r) ? (r.forEach(function(a, i) {
    if (ht.call(e, i)) {
      var l = e[i];
      l && typeof l == "object" && a && typeof a == "object" ? e[i] = t(l, a, n) : e.push(a);
    } else
      e[i] = a;
  }), e) : Object.keys(r).reduce(function(a, i) {
    var l = r[i];
    return ht.call(a, i) ? a[i] = t(a[i], l, n) : a[i] = l, a;
  }, o);
}, ri = function(e, r) {
  return Object.keys(r).reduce(function(n, o) {
    return n[o] = r[o], n;
  }, e);
}, ni = function(t, e, r) {
  var n = t.replace(/\+/g, " ");
  if (r === "iso-8859-1")
    return n.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n);
  } catch {
    return n;
  }
}, bt = 1024, oi = function(e, r, n, o, a) {
  if (e.length === 0)
    return e;
  var i = e;
  if (typeof e == "symbol" ? i = Symbol.prototype.toString.call(e) : typeof e != "string" && (i = String(e)), n === "iso-8859-1")
    return escape(i).replace(/%u[0-9a-f]{4}/gi, function(v) {
      return "%26%23" + parseInt(v.slice(2), 16) + "%3B";
    });
  for (var l = "", u = 0; u < i.length; u += bt) {
    for (var c = i.length >= bt ? i.slice(u, u + bt) : i, d = [], p = 0; p < c.length; ++p) {
      var f = c.charCodeAt(p);
      if (f === 45 || f === 46 || f === 95 || f === 126 || f >= 48 && f <= 57 || f >= 65 && f <= 90 || f >= 97 && f <= 122 || a === Za.RFC1738 && (f === 40 || f === 41)) {
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
}, ai = function(e) {
  for (var r = [{ obj: { o: e }, prop: "o" }], n = [], o = 0; o < r.length; ++o)
    for (var a = r[o], i = a.obj[a.prop], l = Object.keys(i), u = 0; u < l.length; ++u) {
      var c = l[u], d = i[c];
      typeof d == "object" && d !== null && n.indexOf(d) === -1 && (r.push({ obj: i, prop: c }), n.push(d));
    }
  return ei(r), e;
}, ii = function(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}, li = function(e) {
  return !e || typeof e != "object" ? !1 : !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e));
}, si = function(e, r) {
  return [].concat(e, r);
}, ui = function(e, r) {
  if (le(e)) {
    for (var n = [], o = 0; o < e.length; o += 1)
      n.push(r(e[o]));
    return n;
  }
  return r(e);
}, rn = {
  arrayToObject: tn,
  assign: ri,
  combine: si,
  compact: ai,
  decode: ni,
  encode: oi,
  isBuffer: li,
  isRegExp: ii,
  maybeMap: ui,
  merge: ti
}, nn = Ja, Xe = rn, _e = Gt, ci = Object.prototype.hasOwnProperty, on = {
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
}, G = Array.isArray, fi = Array.prototype.push, an = function(t, e) {
  fi.apply(t, G(e) ? e : [e]);
}, di = Date.prototype.toISOString, Pr = _e.default, N = {
  addQueryPrefix: !1,
  allowDots: !1,
  allowEmptyArrays: !1,
  arrayFormat: "indices",
  charset: "utf-8",
  charsetSentinel: !1,
  delimiter: "&",
  encode: !0,
  encodeDotInKeys: !1,
  encoder: Xe.encode,
  encodeValuesOnly: !1,
  format: Pr,
  formatter: _e.formatters[Pr],
  // deprecated
  indices: !1,
  serializeDate: function(e) {
    return di.call(e);
  },
  skipNulls: !1,
  strictNullHandling: !1
}, pi = function(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean" || typeof e == "symbol" || typeof e == "bigint";
}, wt = {}, yi = function t(e, r, n, o, a, i, l, u, c, d, p, f, v, s, y, m, b, A) {
  for (var h = e, x = A, P = 0, D = !1; (x = x.get(wt)) !== void 0 && !D; ) {
    var k = x.get(e);
    if (P += 1, typeof k < "u") {
      if (k === P)
        throw new RangeError("Cyclic object value");
      D = !0;
    }
    typeof x.get(wt) > "u" && (P = 0);
  }
  if (typeof d == "function" ? h = d(r, h) : h instanceof Date ? h = v(h) : n === "comma" && G(h) && (h = Xe.maybeMap(h, function(st) {
    return st instanceof Date ? v(st) : st;
  })), h === null) {
    if (i)
      return c && !m ? c(r, N.encoder, b, "key", s) : r;
    h = "";
  }
  if (pi(h) || Xe.isBuffer(h)) {
    if (c) {
      var W = m ? r : c(r, N.encoder, b, "key", s);
      return [y(W) + "=" + y(c(h, N.encoder, b, "value", s))];
    }
    return [y(r) + "=" + y(String(h))];
  }
  var ie = [];
  if (typeof h > "u")
    return ie;
  var J;
  if (n === "comma" && G(h))
    m && c && (h = Xe.maybeMap(h, c)), J = [{ value: h.length > 0 ? h.join(",") || null : void 0 }];
  else if (G(d))
    J = d;
  else {
    var qe = Object.keys(h);
    J = p ? qe.sort(p) : qe;
  }
  var ye = u ? r.replace(/\./g, "%2E") : r, U = o && G(h) && h.length === 1 ? ye + "[]" : ye;
  if (a && G(h) && h.length === 0)
    return U + "[]";
  for (var X = 0; X < J.length; ++X) {
    var Y = J[X], De = typeof Y == "object" && typeof Y.value < "u" ? Y.value : h[Y];
    if (!(l && De === null)) {
      var lt = f && u ? Y.replace(/\./g, "%2E") : Y, Pn = G(h) ? typeof n == "function" ? n(U, lt) : U : U + (f ? "." + lt : "[" + lt + "]");
      A.set(e, P);
      var tr = nn();
      tr.set(wt, A), an(ie, t(
        De,
        Pn,
        n,
        o,
        a,
        i,
        l,
        u,
        n === "comma" && m && G(h) ? null : c,
        d,
        p,
        f,
        v,
        s,
        y,
        m,
        b,
        tr
      ));
    }
  }
  return ie;
}, vi = function(e) {
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
    if (!ci.call(_e.formatters, e.format))
      throw new TypeError("Unknown format option provided.");
    n = e.format;
  }
  var o = _e.formatters[n], a = N.filter;
  (typeof e.filter == "function" || G(e.filter)) && (a = e.filter);
  var i;
  if (e.arrayFormat in on ? i = e.arrayFormat : "indices" in e ? i = e.indices ? "indices" : "repeat" : i = N.arrayFormat, "commaRoundTrip" in e && typeof e.commaRoundTrip != "boolean")
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
}, mi = function(t, e) {
  var r = t, n = vi(e), o, a;
  typeof n.filter == "function" ? (a = n.filter, r = a("", r)) : G(n.filter) && (a = n.filter, o = a);
  var i = [];
  if (typeof r != "object" || r === null)
    return "";
  var l = on[n.arrayFormat], u = l === "comma" && n.commaRoundTrip;
  o || (o = Object.keys(r)), n.sort && o.sort(n.sort);
  for (var c = nn(), d = 0; d < o.length; ++d) {
    var p = o[d];
    n.skipNulls && r[p] === null || an(i, yi(
      r[p],
      p,
      l,
      u,
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
}, Pe = rn, Ft = Object.prototype.hasOwnProperty, gi = Array.isArray, M = {
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
}, hi = function(t) {
  return t.replace(/&#(\d+);/g, function(e, r) {
    return String.fromCharCode(parseInt(r, 10));
  });
}, ln = function(t, e) {
  return t && typeof t == "string" && e.comma && t.indexOf(",") > -1 ? t.split(",") : t;
}, bi = "utf8=%26%2310003%3B", wi = "utf8=%E2%9C%93", xi = function(e, r) {
  var n = { __proto__: null }, o = r.ignoreQueryPrefix ? e.replace(/^\?/, "") : e;
  o = o.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  var a = r.parameterLimit === 1 / 0 ? void 0 : r.parameterLimit, i = o.split(r.delimiter, a), l = -1, u, c = r.charset;
  if (r.charsetSentinel)
    for (u = 0; u < i.length; ++u)
      i[u].indexOf("utf8=") === 0 && (i[u] === wi ? c = "utf-8" : i[u] === bi && (c = "iso-8859-1"), l = u, u = i.length);
  for (u = 0; u < i.length; ++u)
    if (u !== l) {
      var d = i[u], p = d.indexOf("]="), f = p === -1 ? d.indexOf("=") : p + 1, v, s;
      f === -1 ? (v = r.decoder(d, M.decoder, c, "key"), s = r.strictNullHandling ? null : "") : (v = r.decoder(d.slice(0, f), M.decoder, c, "key"), s = Pe.maybeMap(
        ln(d.slice(f + 1), r),
        function(m) {
          return r.decoder(m, M.decoder, c, "value");
        }
      )), s && r.interpretNumericEntities && c === "iso-8859-1" && (s = hi(s)), d.indexOf("[]=") > -1 && (s = gi(s) ? [s] : s);
      var y = Ft.call(n, v);
      y && r.duplicates === "combine" ? n[v] = Pe.combine(n[v], s) : (!y || r.duplicates === "last") && (n[v] = s);
    }
  return n;
}, Si = function(t, e, r, n) {
  for (var o = n ? e : ln(e, r), a = t.length - 1; a >= 0; --a) {
    var i, l = t[a];
    if (l === "[]" && r.parseArrays)
      i = r.allowEmptyArrays && (o === "" || r.strictNullHandling && o === null) ? [] : [].concat(o);
    else {
      i = r.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var u = l.charAt(0) === "[" && l.charAt(l.length - 1) === "]" ? l.slice(1, -1) : l, c = r.decodeDotInKeys ? u.replace(/%2E/g, ".") : u, d = parseInt(c, 10);
      !r.parseArrays && c === "" ? i = { 0: o } : !isNaN(d) && l !== c && String(d) === c && d >= 0 && r.parseArrays && d <= r.arrayLimit ? (i = [], i[d] = o) : c !== "__proto__" && (i[c] = o);
    }
    o = i;
  }
  return o;
}, Oi = function(e, r, n, o) {
  if (e) {
    var a = n.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e, i = /(\[[^[\]]*])/, l = /(\[[^[\]]*])/g, u = n.depth > 0 && i.exec(a), c = u ? a.slice(0, u.index) : a, d = [];
    if (c) {
      if (!n.plainObjects && Ft.call(Object.prototype, c) && !n.allowPrototypes)
        return;
      d.push(c);
    }
    for (var p = 0; n.depth > 0 && (u = l.exec(a)) !== null && p < n.depth; ) {
      if (p += 1, !n.plainObjects && Ft.call(Object.prototype, u[1].slice(1, -1)) && !n.allowPrototypes)
        return;
      d.push(u[1]);
    }
    if (u) {
      if (n.strictDepth === !0)
        throw new RangeError("Input depth exceeded depth option of " + n.depth + " and strictDepth is true");
      d.push("[" + a.slice(u.index) + "]");
    }
    return Si(d, r, n, o);
  }
}, Ei = function(e) {
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
}, Ai = function(t, e) {
  var r = Ei(e);
  if (t === "" || t === null || typeof t > "u")
    return r.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var n = typeof t == "string" ? xi(t, r) : t, o = r.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, a = Object.keys(n), i = 0; i < a.length; ++i) {
    var l = a[i], u = Oi(l, n[l], r, typeof t == "string");
    o = Pe.merge(o, u, r);
  }
  return r.allowSparse === !0 ? o : Pe.compact(o);
}, Pi = mi, Ci = Ai, $i = Gt, Cr = {
  formats: $i,
  parse: Ci,
  stringify: Pi
}, Ii = { exports: {} };
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */
(function(t, e) {
  (function(r, n) {
    t.exports = n();
  })(At, function() {
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
    r.configure = function(s) {
      var y, m;
      for (y in s)
        m = s[y], m !== void 0 && s.hasOwnProperty(y) && (n[y] = m);
      return this;
    }, r.status = null, r.set = function(s) {
      var y = r.isStarted();
      s = o(s, n.minimum, 1), r.status = s === 1 ? null : s;
      var m = r.render(!y), b = m.querySelector(n.barSelector), A = n.speed, h = n.easing;
      return m.offsetWidth, l(function(x) {
        n.positionUsing === "" && (n.positionUsing = r.getPositioningCSS()), u(b, i(s, A, h)), s === 1 ? (u(m, {
          transition: "none",
          opacity: 1
        }), m.offsetWidth, setTimeout(function() {
          u(m, {
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
      var s = function() {
        setTimeout(function() {
          r.status && (r.trickle(), s());
        }, n.trickleSpeed);
      };
      return n.trickle && s(), this;
    }, r.done = function(s) {
      return !s && !r.status ? this : r.inc(0.3 + 0.5 * Math.random()).set(1);
    }, r.inc = function(s) {
      var y = r.status;
      return y ? (typeof s != "number" && (s = (1 - y) * o(Math.random() * y, 0.1, 0.95)), y = o(y + s, 0, 0.994), r.set(y)) : r.start();
    }, r.trickle = function() {
      return r.inc(Math.random() * n.trickleRate);
    }, function() {
      var s = 0, y = 0;
      r.promise = function(m) {
        return !m || m.state() === "resolved" ? this : (y === 0 && r.start(), s++, y++, m.always(function() {
          y--, y === 0 ? (s = 0, r.done()) : r.set((s - y) / s);
        }), this);
      };
    }(), r.render = function(s) {
      if (r.isRendered()) return document.getElementById("nprogress");
      d(document.documentElement, "nprogress-busy");
      var y = document.createElement("div");
      y.id = "nprogress", y.innerHTML = n.template;
      var m = y.querySelector(n.barSelector), b = s ? "-100" : a(r.status || 0), A = document.querySelector(n.parent), h;
      return u(m, {
        transition: "all 0 linear",
        transform: "translate3d(" + b + "%,0,0)"
      }), n.showSpinner || (h = y.querySelector(n.spinnerSelector), h && v(h)), A != document.body && d(A, "nprogress-custom-parent"), A.appendChild(y), y;
    }, r.remove = function() {
      p(document.documentElement, "nprogress-busy"), p(document.querySelector(n.parent), "nprogress-custom-parent");
      var s = document.getElementById("nprogress");
      s && v(s);
    }, r.isRendered = function() {
      return !!document.getElementById("nprogress");
    }, r.getPositioningCSS = function() {
      var s = document.body.style, y = "WebkitTransform" in s ? "Webkit" : "MozTransform" in s ? "Moz" : "msTransform" in s ? "ms" : "OTransform" in s ? "O" : "";
      return y + "Perspective" in s ? "translate3d" : y + "Transform" in s ? "translate" : "margin";
    };
    function o(s, y, m) {
      return s < y ? y : s > m ? m : s;
    }
    function a(s) {
      return (-1 + s) * 100;
    }
    function i(s, y, m) {
      var b;
      return n.positionUsing === "translate3d" ? b = { transform: "translate3d(" + a(s) + "%,0,0)" } : n.positionUsing === "translate" ? b = { transform: "translate(" + a(s) + "%,0)" } : b = { "margin-left": a(s) + "%" }, b.transition = "all " + y + "ms " + m, b;
    }
    var l = /* @__PURE__ */ function() {
      var s = [];
      function y() {
        var m = s.shift();
        m && m(y);
      }
      return function(m) {
        s.push(m), s.length == 1 && y();
      };
    }(), u = /* @__PURE__ */ function() {
      var s = ["Webkit", "O", "Moz", "ms"], y = {};
      function m(x) {
        return x.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(P, D) {
          return D.toUpperCase();
        });
      }
      function b(x) {
        var P = document.body.style;
        if (x in P) return x;
        for (var D = s.length, k = x.charAt(0).toUpperCase() + x.slice(1), W; D--; )
          if (W = s[D] + k, W in P) return W;
        return x;
      }
      function A(x) {
        return x = m(x), y[x] || (y[x] = b(x));
      }
      function h(x, P, D) {
        P = A(P), x.style[P] = D;
      }
      return function(x, P) {
        var D = arguments, k, W;
        if (D.length == 2)
          for (k in P)
            W = P[k], W !== void 0 && P.hasOwnProperty(k) && h(x, k, W);
        else
          h(x, D[1], D[2]);
      };
    }();
    function c(s, y) {
      var m = typeof s == "string" ? s : f(s);
      return m.indexOf(" " + y + " ") >= 0;
    }
    function d(s, y) {
      var m = f(s), b = m + y;
      c(m, y) || (s.className = b.substring(1));
    }
    function p(s, y) {
      var m = f(s), b;
      c(s, y) && (b = m.replace(" " + y + " ", " "), s.className = b.substring(1, b.length - 1));
    }
    function f(s) {
      return (" " + (s.className || "") + " ").replace(/\s+/gi, " ");
    }
    function v(s) {
      s && s.parentNode && s.parentNode.removeChild(s);
    }
    return r;
  });
})(Ii);
function Mi(t, e, r, n = "brackets") {
  let o = /^https?:\/\//.test(e.toString()), a = o || e.toString().startsWith("/"), i = !a && !e.toString().startsWith("#") && !e.toString().startsWith("?"), l = e.toString().includes("?") || t === "get" && Object.keys(r).length, u = e.toString().includes("#"), c = new URL(e.toString(), "http://localhost");
  return t === "get" && Object.keys(r).length && (c.search = Cr.stringify(co(Cr.parse(c.search, { ignoreQueryPrefix: !0 }), r), { encodeValuesOnly: !0, arrayFormat: n }), r = {}), [[o ? `${c.protocol}//${c.host}` : "", a ? c.pathname : "", i ? c.pathname.substring(1) : "", l ? c.search : "", u ? c.hash : ""].join(""), r];
}
const sn = {
  __name: "ModalRenderer",
  props: {
    index: {
      type: Number,
      required: !0
    }
  },
  setup(t) {
    const e = t, r = Ue(), n = $(() => r.stack.value[e.index]);
    return Tt("modalContext", n), (o, a) => {
      var i;
      return (i = n.value) != null && i.component ? (O(), I(g(n).component, q({ key: 0 }, n.value.props, {
        onModalEvent: a[0] || (a[0] = (l, ...u) => n.value.emit(l, ...u))
      }), null, 16)) : H("", !0);
    };
  }
}, Di = {
  __name: "ModalRoot",
  setup(t) {
    const e = Ue(), r = S(!1), n = S(null);
    we(Be.on("start", () => r.value = !0)), we(Be.on("finish", () => r.value = !1)), we(
      Be.on("navigate", (a) => {
        const i = a.detail.page.props._inertiaui_modal;
        if (!i) {
          n.value && e.closeAll();
          return;
        }
        n.value = i, e.setBaseUrl(i.baseUrl), e.pushFromResponseData(i, {}, () => {
          if (!i.baseUrl) {
            console.error("No base url in modal response data so cannot navigate back");
            return;
          }
          !r.value && window.location.href !== i.baseUrl && Be.visit(i.baseUrl, {
            preserveScroll: !0,
            preserveState: !0
          });
        });
      })
    );
    const o = (a) => (a.headers["X-InertiaUI-Modal-Base-Url"] = e.getBaseUrl(), a);
    return In(() => {
      Ze.interceptors.request.use(o);
    }), we(() => {
      Ze.interceptors.request.eject(o);
    }), (a, i) => (O(), ce(Rt, null, [
      F(a.$slots, "default"),
      g(e).stack.value.length ? (O(), I(sn, {
        key: 0,
        index: 0
      })) : H("", !0)
    ], 64));
  }
};
let Vt = null;
const Nt = S(null), C = S([]), ot = S({}), Fi = (t) => {
  Vt = t;
};
class Ht {
  constructor(e, r, n, o, a) {
    L(this, "update", (e, r, n) => {
      const o = this.index.value;
      o > -1 && (C.value[o].config = e, C.value[o].onCloseCallback = r, C.value[o].afterLeaveCallback = n);
    });
    L(this, "getParentModal", () => {
      const e = this.index.value;
      return e < 1 ? null : C.value.slice(0, e).reverse().find((r) => r.isOpen);
    });
    L(this, "getChildModal", () => {
      const e = this.index.value;
      return e === C.value.length - 1 ? null : C.value.slice(e + 1).find((r) => r.isOpen);
    });
    L(this, "show", () => {
      const e = this.index.value;
      if (e > -1) {
        if (C.value[e].isOpen)
          return;
        C.value[e].isOpen = !0, C.value[e].shouldRender = !0;
      }
    });
    L(this, "close", () => {
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
    L(this, "setOpen", (e) => {
      e ? this.show() : this.close();
    });
    L(this, "afterLeave", () => {
      var r;
      const e = this.index.value;
      if (e > -1) {
        if (C.value[e].isOpen)
          return;
        C.value[e].shouldRender = !1, (r = this.afterLeaveCallback) == null || r.call(this), this.afterLeaveCallback = null;
      }
      e === 0 && (C.value = []);
    });
    L(this, "on", (e, r) => {
      this.listeners[e] = this.listeners[e] ?? [], this.listeners[e].push(r);
    });
    L(this, "off", (e, r) => {
      var n;
      r ? this.listeners[e] = ((n = this.listeners[e]) == null ? void 0 : n.filter((o) => o !== r)) ?? [] : delete this.listeners[e];
    });
    L(this, "emit", (e, ...r) => {
      var n;
      (n = this.listeners[e]) == null || n.forEach((o) => o(...r));
    });
    L(this, "registerEventListenersFromAttrs", (e) => {
      const r = [];
      return Object.keys(e).filter((n) => n.startsWith("on")).forEach((n) => {
        const o = n.replace(/^on/, "").replace(/^./, (a) => a.toLowerCase()).replace(/([A-Z])/g, "-$1").toLowerCase();
        this.on(o, e[n]), r.push(() => this.off(o, e[n]));
      }), () => r.forEach((n) => n());
    });
    L(this, "reload", (e = {}) => {
      var n;
      let r = Object.keys(this.response.props);
      e.only && (r = Lr(r, e.only)), e.except && (r = zn(r, e.except)), (n = this.response) != null && n.url && Ze.get(this.response.url, {
        headers: {
          Accept: "text/html, application/xhtml+xml",
          "X-Inertia": !0,
          "X-Inertia-Partial-Component": this.response.component,
          "X-Inertia-Version": this.response.version,
          "X-Inertia-Partial-Data": r.join(","),
          "X-InertiaUI-Modal": !0,
          "X-InertiaUI-Modal-Use-Router": 0
        }
      }).then((o) => {
        Object.assign(this.props.value, o.data.props);
      });
    });
    this.id = Ht.generateId(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = e, this.props = S(r.props), this.response = r, this.config = n, this.onCloseCallback = o, this.afterLeaveCallback = a, this.index = $(() => C.value.findIndex((i) => i.id === this.id)), this.onTopOfStack = $(() => {
      var l;
      return C.value.length < 2 ? !0 : ((l = C.value.map((u) => ({ id: u.id, shouldRender: u.shouldRender })).reverse().find((u) => u.shouldRender)) == null ? void 0 : l.id) === this.id;
    });
  }
  static generateId() {
    return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `inertiaui_modal_${crypto.randomUUID()}` : `inertiaui_modal_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
function Ni(t, e) {
  ot.value[t] = { name: t, callback: e };
}
function Bi(t, e, r, n) {
  if (!ot.value[t])
    throw new Error(`The local modal "${t}" has not been registered.`);
  const o = Qt(null, {}, e, r, n);
  return o.name = t, ot.value[t].callback(o), o;
}
function un(t, e = {}, r = null, n = null) {
  return Vt(t.component).then((o) => Qt(Nr(o), t, e, r, n));
}
function Ti(t, e, r = {}, n = {}, o = {}, a = null, i = null, l = "brackets", u = !1) {
  return new Promise((c, d) => {
    if (t.startsWith("#")) {
      c(Bi(t.substring(1), o, a, i));
      return;
    }
    const [p, f] = Mi(e, t || "", r, l);
    let v = u && C.value.length === 0;
    if (C.value.length === 0 && (Nt.value = typeof window < "u" ? window.location.href : ""), n = {
      ...n,
      Accept: "text/html, application/xhtml+xml",
      "X-Requested-With": "XMLHttpRequest",
      "X-Inertia": !0,
      "X-Inertia-Version": qn().version,
      "X-InertiaUI-Modal": !0,
      "X-InertiaUI-Modal-Use-Router": v ? 1 : 0
    }, v)
      return Be.visit(p, {
        method: e,
        data: f,
        headers: n,
        preserveScroll: !0,
        preserveState: !0,
        onError: d,
        onFinish: () => Vn(() => C.value[0]).then((s) => {
          const y = s.onCloseCallback, m = s.afterLeaveCallback;
          s.update(
            o,
            () => {
              a == null || a(), y == null || y();
            },
            () => {
              i == null || i(), m == null || m();
            }
          ), c(s);
        })
      });
    Ze({ url: p, method: e, data: f, headers: n }).then((s) => c(un(s.data, o, a, i))).catch(d);
  });
}
function Qt(t, e, r, n, o) {
  const a = new Ht(t, e, r, n, o);
  return C.value.push(a), de(() => {
    a.show();
  }), a;
}
const Ri = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], Zl = (t, e) => (e.resolveComponent && (Vt = e.resolveComponent), () => re(Di, () => re(t, e)));
function Ue() {
  return {
    setComponentResolver: Fi,
    getBaseUrl: () => Nt.value,
    setBaseUrl: (t) => Nt.value = t,
    stack: Mn(C),
    push: Qt,
    pushFromResponseData: un,
    closeAll: () => [...C.value].reverse().forEach((t) => t.close()),
    reset: () => C.value = [],
    visit: Ti,
    registerLocalModal: Ni,
    removeLocalModal: (t) => delete ot.value[t]
  };
}
const _i = /* @__PURE__ */ Object.assign({
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
    const n = t, o = Ue(), a = n.name ? S({}) : _t("modalContext"), i = $(() => {
      var s;
      const v = ((s = a.value.config) == null ? void 0 : s.slideover) ?? n.slideover ?? Lt("type") === "slideover";
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
    }), Ye(() => {
      o.removeLocalModal(n.name);
    })), at(() => {
      n.name || c();
    });
    const l = S(null);
    Ye(() => {
      var v;
      return (v = l.value) == null ? void 0 : v.call(l);
    });
    const u = Br();
    function c() {
      l.value = a.value.registerEventListenersFromAttrs(u);
    }
    const d = r;
    function p(v, ...s) {
      d("modal-event", v, ...s);
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
    const f = $(() => {
      var v;
      return (v = o.stack.value.find((s) => s.shouldRender && s.index > a.value.index)) == null ? void 0 : v.index;
    });
    return (v, s) => (O(), ce(Rt, null, [
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
      f.value ? (O(), I(sn, {
        key: 1,
        index: f.value
      }, null, 8, ["index"])) : H("", !0)
    ], 64));
  }
});
function Jt(t, e) {
  const r = typeof t == "string" && !e ? `${t}Context` : e, n = Symbol(r);
  return [(o) => {
    const a = _t(n, o);
    if (a || a === null)
      return a;
    throw new Error(
      `Injection \`${n.toString()}\` not found. Component must be used within ${Array.isArray(t) ? `one of the following components: ${t.join(
        ", "
      )}` : `\`${t}\``}`
    );
  }, (o) => (Tt(n, o), o)];
}
function cn(t, e, r) {
  const n = r.originalEvent.target, o = new CustomEvent(t, {
    bubbles: !1,
    cancelable: !0,
    detail: r
  });
  e && n.addEventListener(t, e, { once: !0 }), n.dispatchEvent(o);
}
function fn(t) {
  return Ln() ? (Wn(t), !0) : !1;
}
function ki(t) {
  let e = !1, r;
  const n = _r(!0);
  return (...o) => (e || (r = n.run(() => t(...o)), e = !0), r);
}
function Li(t) {
  let e = 0, r, n;
  const o = () => {
    e -= 1, n && e <= 0 && (n.stop(), r = void 0, n = void 0);
  };
  return (...a) => (e += 1, r || (n = _r(!0), r = n.run(() => t(...a))), fn(o), r);
}
function Xt(t) {
  return typeof t == "function" ? t() : g(t);
}
const pe = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Wi = (t) => typeof t < "u", Ui = Object.prototype.toString, ji = (t) => Ui.call(t) === "[object Object]", qi = () => {
}, $r = /* @__PURE__ */ Ki();
function Ki() {
  var t, e;
  return pe && ((t = window == null ? void 0 : window.navigator) == null ? void 0 : t.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((e = window == null ? void 0 : window.navigator) == null ? void 0 : e.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function zi(t) {
  return Ce();
}
function Gi(t, e) {
  zi() && Ye(t, e);
}
function je(t) {
  var e;
  const r = Xt(t);
  return (e = r == null ? void 0 : r.$el) != null ? e : r;
}
const dn = pe ? window : void 0;
function pn(...t) {
  let e, r, n, o;
  if (typeof t[0] == "string" || Array.isArray(t[0]) ? ([r, n, o] = t, e = dn) : [e, r, n, o] = t, !e)
    return qi;
  Array.isArray(r) || (r = [r]), Array.isArray(n) || (n = [n]);
  const a = [], i = () => {
    a.forEach((d) => d()), a.length = 0;
  }, l = (d, p, f, v) => (d.addEventListener(p, f, v), () => d.removeEventListener(p, f, v)), u = j(
    () => [je(e), Xt(o)],
    ([d, p]) => {
      if (i(), !d)
        return;
      const f = ji(p) ? { ...p } : p;
      a.push(
        ...r.flatMap((v) => n.map((s) => l(d, v, s, f)))
      );
    },
    { immediate: !0, flush: "post" }
  ), c = () => {
    u(), i();
  };
  return fn(c), c;
}
function Vi(t) {
  return typeof t == "function" ? t : typeof t == "string" ? (e) => e.key === t : Array.isArray(t) ? (e) => t.includes(e.key) : () => !0;
}
function Hi(...t) {
  let e, r, n = {};
  t.length === 3 ? (e = t[0], r = t[1], n = t[2]) : t.length === 2 ? typeof t[1] == "object" ? (e = !0, r = t[0], n = t[1]) : (e = t[0], r = t[1]) : (e = !0, r = t[0]);
  const {
    target: o = dn,
    eventName: a = "keydown",
    passive: i = !1,
    dedupe: l = !1
  } = n, u = Vi(e);
  return pn(o, a, (c) => {
    c.repeat && Xt(l) || u(c) && r(c);
  }, i);
}
function Qi() {
  const t = S(!1), e = Ce();
  return e && at(() => {
    t.value = !0;
  }, e), t;
}
function Ji(t) {
  return JSON.parse(JSON.stringify(t));
}
function Xi(t, e, r, n = {}) {
  var o, a, i;
  const {
    clone: l = !1,
    passive: u = !1,
    eventName: c,
    deep: d = !1,
    defaultValue: p,
    shouldEmit: f
  } = n, v = Ce(), s = r || (v == null ? void 0 : v.emit) || ((o = v == null ? void 0 : v.$emit) == null ? void 0 : o.bind(v)) || ((i = (a = v == null ? void 0 : v.proxy) == null ? void 0 : a.$emit) == null ? void 0 : i.bind(v == null ? void 0 : v.proxy));
  let y = c;
  y = y || `update:${e.toString()}`;
  const m = (h) => l ? typeof l == "function" ? l(h) : Ji(h) : h, b = () => Wi(t[e]) ? m(t[e]) : p, A = (h) => {
    f ? f(h) && s(y, h) : s(y, h);
  };
  if (u) {
    const h = b(), x = S(h);
    let P = !1;
    return j(
      () => t[e],
      (D) => {
        P || (P = !0, x.value = m(D), de(() => P = !1));
      }
    ), j(
      x,
      (D) => {
        !P && (D !== t[e] || d) && A(D);
      },
      { deep: d }
    ), x;
  } else
    return $({
      get() {
        return b();
      },
      set(h) {
        A(h);
      }
    });
}
function Yt(t) {
  return t ? t.flatMap((e) => e.type === Rt ? Yt(e.children) : [e]) : [];
}
function xt(t) {
  if (t === null || typeof t != "object")
    return !1;
  const e = Object.getPrototypeOf(t);
  return e !== null && e !== Object.prototype && Object.getPrototypeOf(e) !== null || Symbol.iterator in t ? !1 : Symbol.toStringTag in t ? Object.prototype.toString.call(t) === "[object Module]" : !0;
}
function Bt(t, e, r = ".", n) {
  if (!xt(e))
    return Bt(t, {}, r);
  const o = Object.assign({}, e);
  for (const a in t) {
    if (a === "__proto__" || a === "constructor")
      continue;
    const i = t[a];
    i != null && (Array.isArray(i) && Array.isArray(o[a]) ? o[a] = [...i, ...o[a]] : xt(i) && xt(o[a]) ? o[a] = Bt(
      i,
      o[a],
      (r ? `${r}.` : "") + a.toString()
    ) : o[a] = i);
  }
  return o;
}
function Yi(t) {
  return (...e) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    e.reduce((r, n) => Bt(r, n, ""), {})
  );
}
const Zi = Yi(), [yn, es] = Jt("ConfigProvider");
let el = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", tl = (t = 21) => {
  let e = "", r = t;
  for (; r--; )
    e += el[Math.random() * 64 | 0];
  return e;
};
const rl = Li(() => {
  const t = S(/* @__PURE__ */ new Map()), e = S(), r = $(() => {
    for (const i of t.value.values())
      if (i)
        return !0;
    return !1;
  }), n = yn({
    scrollBody: S(!0)
  });
  let o = null;
  const a = () => {
    document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.body.style.removeProperty("--scrollbar-width"), document.body.style.overflow = e.value ?? "", $r && (o == null || o()), e.value = void 0;
  };
  return j(r, (i, l) => {
    var u;
    if (!pe)
      return;
    if (!i) {
      l && a();
      return;
    }
    e.value === void 0 && (e.value = document.body.style.overflow);
    const c = window.innerWidth - document.documentElement.clientWidth, d = { padding: c, margin: 0 }, p = (u = n.scrollBody) != null && u.value ? typeof n.scrollBody.value == "object" ? Zi({
      padding: n.scrollBody.value.padding === !0 ? c : n.scrollBody.value.padding,
      margin: n.scrollBody.value.margin === !0 ? c : n.scrollBody.value.margin
    }, d) : d : { padding: 0, margin: 0 };
    c > 0 && (document.body.style.paddingRight = typeof p.padding == "number" ? `${p.padding}px` : String(p.padding), document.body.style.marginRight = typeof p.margin == "number" ? `${p.margin}px` : String(p.margin), document.body.style.setProperty("--scrollbar-width", `${c}px`), document.body.style.overflow = "hidden"), $r && (o = pn(
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
function nl(t) {
  const e = tl(6), r = rl();
  r.value.set(e, t);
  const n = $({
    get: () => r.value.get(e) ?? !1,
    set: (o) => r.value.set(e, o)
  });
  return Gi(() => {
    r.value.delete(e);
  }), n;
}
function Zt(t) {
  const e = Ce(), r = e == null ? void 0 : e.type.emits, n = {};
  return r != null && r.length || console.warn(
    `No emitted event found. Please check component: ${e == null ? void 0 : e.type.__name}`
  ), r == null || r.forEach((o) => {
    n[Rn(_n(o))] = (...a) => t(o, ...a);
  }), n;
}
function K() {
  const t = Ce(), e = S(), r = $(() => {
    var i, l;
    return ["#text", "#comment"].includes((i = e.value) == null ? void 0 : i.$el.nodeName) ? (l = e.value) == null ? void 0 : l.$el.nextElementSibling : je(e);
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
var ol = function(t) {
  if (typeof document > "u")
    return null;
  var e = Array.isArray(t) ? t[0] : t;
  return e.ownerDocument.body;
}, he = /* @__PURE__ */ new WeakMap(), Ve = /* @__PURE__ */ new WeakMap(), He = {}, St = 0, vn = function(t) {
  return t && (t.host || vn(t.parentNode));
}, al = function(t, e) {
  return e.map(function(r) {
    if (t.contains(r))
      return r;
    var n = vn(r);
    return n && t.contains(n) ? n : (console.error("aria-hidden", r, "in not contained inside", t, ". Doing nothing"), null);
  }).filter(function(r) {
    return !!r;
  });
}, il = function(t, e, r, n) {
  var o = al(e, Array.isArray(t) ? t : [t]);
  He[r] || (He[r] = /* @__PURE__ */ new WeakMap());
  var a = He[r], i = [], l = /* @__PURE__ */ new Set(), u = new Set(o), c = function(p) {
    !p || l.has(p) || (l.add(p), c(p.parentNode));
  };
  o.forEach(c);
  var d = function(p) {
    !p || u.has(p) || Array.prototype.forEach.call(p.children, function(f) {
      if (l.has(f))
        d(f);
      else
        try {
          var v = f.getAttribute(n), s = v !== null && v !== "false", y = (he.get(f) || 0) + 1, m = (a.get(f) || 0) + 1;
          he.set(f, y), a.set(f, m), i.push(f), y === 1 && s && Ve.set(f, !0), m === 1 && f.setAttribute(r, "true"), s || f.setAttribute(n, "true");
        } catch (b) {
          console.error("aria-hidden: cannot operate on ", f, b);
        }
    });
  };
  return d(e), l.clear(), St++, function() {
    i.forEach(function(p) {
      var f = he.get(p) - 1, v = a.get(p) - 1;
      he.set(p, f), a.set(p, v), f || (Ve.has(p) || p.removeAttribute(n), Ve.delete(p)), v || p.removeAttribute(r);
    }), St--, St || (he = /* @__PURE__ */ new WeakMap(), he = /* @__PURE__ */ new WeakMap(), Ve = /* @__PURE__ */ new WeakMap(), He = {});
  };
}, ll = function(t, e, r) {
  r === void 0 && (r = "data-aria-hidden");
  var n = Array.from(Array.isArray(t) ? t : [t]), o = ol(t);
  return o ? (n.push.apply(n, Array.from(o.querySelectorAll("[aria-live]"))), il(n, o, r, "aria-hidden")) : function() {
    return null;
  };
};
function sl(t) {
  let e;
  j(() => je(t), (r) => {
    r ? e = ll(r) : e && e();
  }), we(() => {
    e && e();
  });
}
let ul = 0;
function Ir(t, e = "radix") {
  const r = yn({ useId: void 0 });
  return rr.useId ? `${e}-${rr.useId()}` : r.useId ? `${e}-${r.useId()}` : `${e}-${++ul}`;
}
function cl(t, e) {
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
const er = B({
  name: "PrimitiveSlot",
  inheritAttrs: !1,
  setup(t, { attrs: e, slots: r }) {
    return () => {
      var n, o;
      if (!r.default)
        return null;
      const a = Yt(r.default()), i = a.findIndex((d) => d.type !== Dn);
      if (i === -1)
        return a;
      const l = a[i];
      (n = l.props) == null || delete n.ref;
      const u = l.props ? q(e, l.props) : e;
      e.class && (o = l.props) != null && o.class && delete l.props.class;
      const c = Fn(l, u);
      for (const d in u)
        d.startsWith("on") && (c.props || (c.props = {}), c.props[d] = u[d]);
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
    return typeof n == "string" && ["area", "img", "input"].includes(n) ? () => re(n, e) : n !== "template" ? () => re(t.as, e, { default: r.default }) : () => re(er, e, { default: r.default });
  }
});
function mn() {
  const t = S(), e = $(() => {
    var r, n;
    return ["#text", "#comment"].includes((r = t.value) == null ? void 0 : r.$el.nodeName) ? (n = t.value) == null ? void 0 : n.$el.nextElementSibling : je(t);
  });
  return {
    primitiveElement: t,
    currentElement: e
  };
}
function fl(t, e) {
  const r = S({}), n = S("none"), o = t.value ? "mounted" : "unmounted", { state: a, dispatch: i } = cl(o, {
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
      const s = new CustomEvent(f, { bubbles: !1, cancelable: !1 });
      (v = e.value) == null || v.dispatchEvent(s);
    }
  };
  j(
    t,
    async (f, v) => {
      var s;
      const y = v !== f;
      if (await de(), y) {
        const m = n.value, b = Qe(e.value);
        f ? (i("MOUNT"), l("enter"), b === "none" && l("after-enter")) : b === "none" || ((s = r.value) == null ? void 0 : s.display) === "none" ? (i("UNMOUNT"), l("leave"), l("after-leave")) : v && m !== b ? (i("ANIMATION_OUT"), l("leave")) : (i("UNMOUNT"), l("after-leave"));
      }
    },
    { immediate: !0 }
  );
  const u = (f) => {
    const v = Qe(e.value), s = v.includes(
      f.animationName
    ), y = a.value === "mounted" ? "enter" : "leave";
    f.target === e.value && s && (l(`after-${y}`), i("ANIMATION_END")), f.target === e.value && v === "none" && i("ANIMATION_END");
  }, c = (f) => {
    f.target === e.value && (n.value = Qe(e.value));
  }, d = j(
    e,
    (f, v) => {
      f ? (r.value = getComputedStyle(f), f.addEventListener("animationstart", c), f.addEventListener("animationcancel", u), f.addEventListener("animationend", u)) : (i("ANIMATION_END"), v == null || v.removeEventListener("animationstart", c), v == null || v.removeEventListener("animationcancel", u), v == null || v.removeEventListener("animationend", u));
    },
    { immediate: !0 }
  ), p = j(a, () => {
    const f = Qe(e.value);
    n.value = a.value === "mounted" ? f : "none";
  });
  return we(() => {
    d(), p();
  }), {
    isPresent: $(
      () => ["mounted", "unmountSuspended"].includes(a.value)
    )
  };
}
function Qe(t) {
  return t && getComputedStyle(t).animationName || "none";
}
const gn = B({
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
    const { present: o, forceMount: a } = Tr(t), i = S(), { isPresent: l } = fl(o, i);
    r({ present: l });
    let u = e.default({ present: l });
    u = Yt(u || []);
    const c = Ce();
    if (u && (u == null ? void 0 : u.length) > 1) {
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
        const p = je(d);
        return typeof (p == null ? void 0 : p.hasAttribute) > "u" || (p != null && p.hasAttribute("data-radix-popper-content-wrapper") ? i.value = p.firstElementChild : i.value = p), p;
      }
    }) : null;
  }
}), [ae, dl] = Jt("DialogRoot"), pl = /* @__PURE__ */ B({
  inheritAttrs: !1,
  __name: "DialogRoot",
  props: {
    open: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: !1 },
    modal: { type: Boolean, default: !0 }
  },
  emits: ["update:open"],
  setup(t, { emit: e }) {
    const r = t, n = Xi(r, "open", e, {
      defaultValue: r.defaultOpen,
      passive: r.open === void 0
    }), o = S(), a = S(), { modal: i } = Tr(r);
    return dl({
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
    }), (l, u) => F(l.$slots, "default", { open: g(n) });
  }
}), yl = /* @__PURE__ */ B({
  __name: "Teleport",
  props: {
    to: { default: "body" },
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(t) {
    const e = Qi();
    return (r, n) => g(e) || r.forceMount ? (O(), I(Tn, {
      key: 0,
      to: r.to,
      disabled: r.disabled
    }, [
      F(r.$slots, "default")
    ], 8, ["to", "disabled"])) : H("", !0);
  }
}), vl = /* @__PURE__ */ B({
  __name: "DialogPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(t) {
    const e = t;
    return (r, n) => (O(), I(g(yl), Nn(Bn(e)), {
      default: E(() => [
        F(r.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), ml = "dismissableLayer.pointerDownOutside", gl = "dismissableLayer.focusOutside";
function hn(t, e) {
  const r = e.closest(
    "[data-dismissable-layer]"
  ), n = t.dataset.dismissableLayer === "" ? t : t.querySelector(
    "[data-dismissable-layer]"
  ), o = Array.from(
    t.ownerDocument.querySelectorAll("[data-dismissable-layer]")
  );
  return !!(r && n === r || o.indexOf(n) < o.indexOf(r));
}
function hl(t, e) {
  var r;
  const n = ((r = e == null ? void 0 : e.value) == null ? void 0 : r.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), o = S(!1), a = S(() => {
  });
  return fe((i) => {
    if (!pe)
      return;
    const l = async (c) => {
      const d = c.target;
      if (e != null && e.value) {
        if (hn(e.value, d)) {
          o.value = !1;
          return;
        }
        if (c.target && !o.value) {
          let p = function() {
            cn(
              ml,
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
    }, u = window.setTimeout(() => {
      n.addEventListener("pointerdown", l);
    }, 0);
    i(() => {
      window.clearTimeout(u), n.removeEventListener("pointerdown", l), n.removeEventListener("click", a.value);
    });
  }), {
    onPointerDownCapture: () => o.value = !0
  };
}
function bl(t, e) {
  var r;
  const n = ((r = e == null ? void 0 : e.value) == null ? void 0 : r.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), o = S(!1);
  return fe((a) => {
    if (!pe)
      return;
    const i = async (l) => {
      e != null && e.value && (await de(), !(!e.value || hn(e.value, l.target)) && l.target && !o.value && cn(
        gl,
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
const Q = Rr({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), wl = /* @__PURE__ */ B({
  __name: "DismissableLayer",
  props: {
    disableOutsidePointerEvents: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "dismiss"],
  setup(t, { emit: e }) {
    const r = t, n = e, { forwardRef: o, currentElement: a } = K(), i = $(
      () => {
        var s;
        return ((s = a.value) == null ? void 0 : s.ownerDocument) ?? globalThis.document;
      }
    ), l = $(() => Q.layersRoot), u = $(() => a.value ? Array.from(l.value).indexOf(a.value) : -1), c = $(() => Q.layersWithOutsidePointerEventsDisabled.size > 0), d = $(() => {
      const s = Array.from(l.value), [y] = [...Q.layersWithOutsidePointerEventsDisabled].slice(-1), m = s.indexOf(y);
      return u.value >= m;
    }), p = hl(async (s) => {
      const y = [...Q.branches].some(
        (m) => m == null ? void 0 : m.contains(s.target)
      );
      !d.value || y || (n("pointerDownOutside", s), n("interactOutside", s), await de(), s.defaultPrevented || n("dismiss"));
    }, a), f = bl((s) => {
      [...Q.branches].some(
        (y) => y == null ? void 0 : y.contains(s.target)
      ) || (n("focusOutside", s), n("interactOutside", s), s.defaultPrevented || n("dismiss"));
    }, a);
    Hi("Escape", (s) => {
      u.value === l.value.size - 1 && (n("escapeKeyDown", s), s.defaultPrevented || n("dismiss"));
    });
    let v;
    return fe((s) => {
      a.value && (r.disableOutsidePointerEvents && (Q.layersWithOutsidePointerEventsDisabled.size === 0 && (v = i.value.body.style.pointerEvents, i.value.body.style.pointerEvents = "none"), Q.layersWithOutsidePointerEventsDisabled.add(a.value)), l.value.add(a.value), s(() => {
        r.disableOutsidePointerEvents && Q.layersWithOutsidePointerEventsDisabled.size === 1 && (i.value.body.style.pointerEvents = v);
      }));
    }), fe((s) => {
      s(() => {
        a.value && (l.value.delete(a.value), Q.layersWithOutsidePointerEventsDisabled.delete(a.value));
      });
    }), (s, y) => (O(), I(g(Me), {
      ref: g(o),
      "as-child": s.asChild,
      as: s.as,
      "data-dismissable-layer": "",
      style: kn({
        pointerEvents: c.value ? d.value ? "auto" : "none" : void 0
      }),
      onFocusCapture: g(f).onFocusCapture,
      onBlurCapture: g(f).onBlurCapture,
      onPointerdownCapture: g(p).onPointerDownCapture
    }, {
      default: E(() => [
        F(s.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as", "style", "onFocusCapture", "onBlurCapture", "onPointerdownCapture"]));
  }
}), Ot = "focusScope.autoFocusOnMount", Et = "focusScope.autoFocusOnUnmount", Mr = { bubbles: !1, cancelable: !0 };
function xl(t, { select: e = !1 } = {}) {
  const r = document.activeElement;
  for (const n of t)
    if (Z(n, { select: e }), document.activeElement !== r)
      return !0;
}
function Sl(t) {
  const e = bn(t), r = Dr(e, t), n = Dr(e.reverse(), t);
  return [r, n];
}
function bn(t) {
  const e = [], r = document.createTreeWalker(t, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (n) => {
      const o = n.tagName === "INPUT" && n.type === "hidden";
      return n.disabled || n.hidden || o ? NodeFilter.FILTER_SKIP : n.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; r.nextNode(); ) e.push(r.currentNode);
  return e;
}
function Dr(t, e) {
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
function El(t) {
  return t instanceof HTMLInputElement && "select" in t;
}
function Z(t, { select: e = !1 } = {}) {
  if (t && t.focus) {
    const r = document.activeElement;
    t.focus({ preventScroll: !0 }), t !== r && El(t) && e && t.select();
  }
}
const Al = ki(() => S([]));
function Pl() {
  const t = Al();
  return {
    add(e) {
      const r = t.value[0];
      e !== r && (r == null || r.pause()), t.value = Fr(t.value, e), t.value.unshift(e);
    },
    remove(e) {
      var r;
      t.value = Fr(t.value, e), (r = t.value[0]) == null || r.resume();
    }
  };
}
function Fr(t, e) {
  const r = [...t], n = r.indexOf(e);
  return n !== -1 && r.splice(n, 1), r;
}
function Cl(t) {
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
    const r = t, n = e, { currentRef: o, currentElement: a } = K(), i = S(null), l = Pl(), u = Rr({
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
        if (u.paused || !p)
          return;
        const b = m.target;
        p.contains(b) ? i.value = b : Z(i.value, { select: !0 });
      }
      function v(m) {
        if (u.paused || !p)
          return;
        const b = m.relatedTarget;
        b !== null && (p.contains(b) || Z(i.value, { select: !0 }));
      }
      function s(m) {
        p.contains(i.value) || Z(p);
      }
      document.addEventListener("focusin", f), document.addEventListener("focusout", v);
      const y = new MutationObserver(s);
      p && y.observe(p, { childList: !0, subtree: !0 }), d(() => {
        document.removeEventListener("focusin", f), document.removeEventListener("focusout", v), y.disconnect();
      });
    }), fe(async (d) => {
      const p = a.value;
      if (await de(), !p)
        return;
      l.add(u);
      const f = document.activeElement;
      if (!p.contains(f)) {
        const v = new CustomEvent(Ot, Mr);
        p.addEventListener(Ot, (s) => n("mountAutoFocus", s)), p.dispatchEvent(v), v.defaultPrevented || (xl(Cl(bn(p)), {
          select: !0
        }), document.activeElement === f && Z(p));
      }
      d(() => {
        p.removeEventListener(Ot, (y) => n("mountAutoFocus", y));
        const v = new CustomEvent(Et, Mr), s = (y) => {
          n("unmountAutoFocus", y);
        };
        p.addEventListener(Et, s), p.dispatchEvent(v), setTimeout(() => {
          v.defaultPrevented || Z(f ?? document.body, { select: !0 }), p.removeEventListener(Et, s), l.remove(u);
        }, 0);
      });
    });
    function c(d) {
      if (!r.loop && !r.trapped || u.paused)
        return;
      const p = d.key === "Tab" && !d.altKey && !d.ctrlKey && !d.metaKey, f = document.activeElement;
      if (p && f) {
        const v = d.currentTarget, [s, y] = Sl(v);
        s && y ? !d.shiftKey && f === y ? (d.preventDefault(), r.loop && Z(s, { select: !0 })) : d.shiftKey && f === s && (d.preventDefault(), r.loop && Z(y, { select: !0 })) : f === v && d.preventDefault();
      }
    }
    return (d, p) => (O(), I(g(Me), {
      ref_key: "currentRef",
      ref: o,
      tabindex: "-1",
      "as-child": d.asChild,
      as: d.as,
      onKeydown: c
    }, {
      default: E(() => [
        F(d.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as"]));
  }
});
function Il(t) {
  return t ? "open" : "closed";
}
const Ml = "DialogTitle", Dl = "DialogContent";
function Fl({
  titleName: t = Ml,
  contentName: e = Dl,
  componentLink: r = "dialog.html#title",
  titleId: n,
  descriptionId: o,
  contentElement: a
}) {
  const i = `Warning: \`${e}\` requires a \`${t}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://www.radix-vue.com/components/${r}`, l = `Warning: Missing \`Description\` or \`aria-describedby="undefined"\` for ${e}.`;
  at(() => {
    var u;
    document.getElementById(n) || console.warn(i);
    const c = (u = a.value) == null ? void 0 : u.getAttribute("aria-describedby");
    o && c && (document.getElementById(o) || console.warn(l));
  });
}
const wn = /* @__PURE__ */ B({
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
    return o.titleId || (o.titleId = Ir(void 0, "radix-vue-dialog-title")), o.descriptionId || (o.descriptionId = Ir(void 0, "radix-vue-dialog-description")), at(() => {
      o.contentElement = i, document.activeElement !== document.body && (o.triggerElement.value = document.activeElement);
    }), process.env.NODE_ENV !== "production" && Fl({
      titleName: "DialogTitle",
      contentName: "DialogContent",
      componentLink: "dialog.html#title",
      titleId: o.titleId,
      descriptionId: o.descriptionId,
      contentElement: i
    }), (l, u) => (O(), I(g($l), {
      "as-child": "",
      loop: "",
      trapped: r.trapFocus,
      onMountAutoFocus: u[5] || (u[5] = (c) => n("openAutoFocus", c)),
      onUnmountAutoFocus: u[6] || (u[6] = (c) => n("closeAutoFocus", c))
    }, {
      default: E(() => [
        _(g(wl), q({
          id: g(o).contentId,
          ref: g(a),
          as: l.as,
          "as-child": l.asChild,
          "disable-outside-pointer-events": l.disableOutsidePointerEvents,
          role: "dialog",
          "aria-describedby": g(o).descriptionId,
          "aria-labelledby": g(o).titleId,
          "data-state": g(Il)(g(o).open.value)
        }, l.$attrs, {
          onDismiss: u[0] || (u[0] = (c) => g(o).onOpenChange(!1)),
          onEscapeKeyDown: u[1] || (u[1] = (c) => n("escapeKeyDown", c)),
          onFocusOutside: u[2] || (u[2] = (c) => n("focusOutside", c)),
          onInteractOutside: u[3] || (u[3] = (c) => n("interactOutside", c)),
          onPointerDownOutside: u[4] || (u[4] = (c) => n("pointerDownOutside", c))
        }), {
          default: E(() => [
            F(l.$slots, "default")
          ]),
          _: 3
        }, 16, ["id", "as", "as-child", "disable-outside-pointer-events", "aria-describedby", "aria-labelledby", "data-state"])
      ]),
      _: 3
    }, 8, ["trapped"]));
  }
}), Nl = /* @__PURE__ */ B({
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
    const r = t, n = e, o = ae(), a = Zt(n), { forwardRef: i, currentElement: l } = K();
    return sl(l), (u, c) => (O(), I(wn, q({ ...r, ...g(a) }, {
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
      default: E(() => [
        F(u.$slots, "default")
      ]),
      _: 3
    }, 16, ["trap-focus"]));
  }
}), Bl = /* @__PURE__ */ B({
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
    const r = t, n = Zt(e);
    K();
    const o = ae(), a = S(!1), i = S(!1);
    return (l, u) => (O(), I(wn, q({ ...r, ...g(n) }, {
      "trap-focus": !1,
      "disable-outside-pointer-events": !1,
      onCloseAutoFocus: u[0] || (u[0] = (c) => {
        var d;
        c.defaultPrevented || (a.value || (d = g(o).triggerElement.value) == null || d.focus(), c.preventDefault()), a.value = !1, i.value = !1;
      }),
      onInteractOutside: u[1] || (u[1] = (c) => {
        var d;
        c.defaultPrevented || (a.value = !0, c.detail.originalEvent.type === "pointerdown" && (i.value = !0));
        const p = c.target;
        (d = g(o).triggerElement.value) != null && d.contains(p) && c.preventDefault(), c.detail.originalEvent.type === "focusin" && i.value && c.preventDefault();
      })
    }), {
      default: E(() => [
        F(l.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), xn = /* @__PURE__ */ B({
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
    const r = t, n = e, o = ae(), a = Zt(n), { forwardRef: i } = K();
    return (l, u) => (O(), I(g(gn), {
      present: l.forceMount || g(o).open.value
    }, {
      default: E(() => [
        g(o).modal.value ? (O(), I(Nl, q({
          key: 0,
          ref: g(i)
        }, { ...r, ...g(a), ...l.$attrs }), {
          default: E(() => [
            F(l.$slots, "default")
          ]),
          _: 3
        }, 16)) : (O(), I(Bl, q({
          key: 1,
          ref: g(i)
        }, { ...r, ...g(a), ...l.$attrs }), {
          default: E(() => [
            F(l.$slots, "default")
          ]),
          _: 3
        }, 16))
      ]),
      _: 3
    }, 8, ["present"]));
  }
}), Tl = /* @__PURE__ */ B({
  __name: "DialogOverlayImpl",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(t) {
    const e = ae();
    return nl(!0), K(), (r, n) => (O(), I(g(Me), {
      as: r.as,
      "as-child": r.asChild,
      "data-state": g(e).open.value ? "open" : "closed",
      style: { "pointer-events": "auto" }
    }, {
      default: E(() => [
        F(r.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child", "data-state"]));
  }
}), Rl = /* @__PURE__ */ B({
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
      return (a = g(e)) != null && a.modal.value ? (O(), I(g(gn), {
        key: 0,
        present: n.forceMount || g(e).open.value
      }, {
        default: E(() => [
          _(Tl, q(n.$attrs, {
            ref: g(r),
            as: n.as,
            "as-child": n.asChild
          }), {
            default: E(() => [
              F(n.$slots, "default")
            ]),
            _: 3
          }, 16, ["as", "as-child"])
        ]),
        _: 3
      }, 8, ["present"])) : H("", !0);
    };
  }
}), _l = /* @__PURE__ */ B({
  __name: "DialogClose",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(t) {
    const e = t;
    K();
    const r = ae();
    return (n, o) => (O(), I(g(Me), q(e, {
      type: n.as === "button" ? "button" : void 0,
      onClick: o[0] || (o[0] = (a) => g(r).onOpenChange(!1))
    }), {
      default: E(() => [
        F(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["type"]));
  }
}), Sn = /* @__PURE__ */ B({
  __name: "DialogTitle",
  props: {
    asChild: { type: Boolean },
    as: { default: "h2" }
  },
  setup(t) {
    const e = t, r = ae();
    return K(), (n, o) => (O(), I(g(Me), q(e, {
      id: g(r).titleId
    }), {
      default: E(() => [
        F(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["id"]));
  }
}), On = /* @__PURE__ */ B({
  __name: "VisuallyHidden",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(t) {
    return K(), (e, r) => (O(), I(g(Me), {
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
      default: E(() => [
        F(e.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
}), [En, ts] = Jt("CollectionProvider");
B({
  name: "CollectionSlot",
  setup(t, { slots: e }) {
    const r = En(), { primitiveElement: n, currentElement: o } = mn();
    return j(o, () => {
      r.collectionRef.value = o.value;
    }), () => re(er, { ref: n }, e);
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
    const n = En(), { primitiveElement: o, currentElement: a } = mn();
    return fe((i) => {
      if (a.value) {
        const l = Nr(a.value);
        n.itemMap.value.set(l, { ref: a.value, value: t.value }), i(() => n.itemMap.value.delete(l));
      }
    }), () => re(er, { ...r, [n.attrName]: "", ref: o }, e);
  }
});
function kl() {
  if (typeof matchMedia == "function")
    return matchMedia("(pointer:coarse)").matches ? "coarse" : "fine";
}
kl();
const An = {
  __name: "CloseButton",
  setup(t) {
    return (e, r) => (O(), I(g(_l), { class: "im-close-button text-gray-400 hover:text-gray-500" }, {
      default: E(() => r[0] || (r[0] = [
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
}, Ll = { class: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4" }, Wl = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, Ul = {
  __name: "ModalContent",
  props: {
    modalContext: Object,
    config: Object
  },
  setup(t) {
    return (e, r) => (O(), ce("div", Ll, [
      ne("div", {
        class: xe(["im-modal-positioner flex min-h-full justify-center", {
          "items-start": t.config.position === "top",
          "items-center": t.config.position === "center",
          "items-end": t.config.position === "bottom"
        }])
      }, [
        _(kt, {
          appear: "",
          "enter-from-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          "enter-to-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-from-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-to-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          onAfterLeave: t.modalContext.afterLeave
        }, {
          default: E(() => {
            var n;
            return [
              _(g(xn), {
                "aria-describedby": void 0,
                "trap-focus": (n = t.config) == null ? void 0 : n.closeExplicitly,
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
                })
              }, {
                default: E(() => [
                  _(g(On), { "as-child": "" }, {
                    default: E(() => [
                      _(g(Sn))
                    ]),
                    _: 1
                  }),
                  ne("div", {
                    class: xe(["im-modal-content relative", [t.config.paddingClasses, t.config.panelClasses]])
                  }, [
                    t.config.closeButton ? (O(), ce("div", Wl, [
                      _(An)
                    ])) : H("", !0),
                    F(e.$slots, "default", {
                      modalContext: t.modalContext,
                      config: t.config
                    })
                  ], 2)
                ]),
                _: 3
              }, 8, ["trap-focus", "class"])
            ];
          }),
          _: 3
        }, 8, ["onAfterLeave"])
      ], 2)
    ]));
  }
}, jl = { class: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden" }, ql = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, Kl = {
  __name: "SlideoverContent",
  props: {
    modalContext: Object,
    config: Object
  },
  setup(t) {
    return (e, r) => (O(), ce("div", jl, [
      ne("div", {
        class: xe(["im-slideover-positioner flex min-h-full items-center", {
          "justify-start rtl:justify-end": t.config.position === "left",
          "justify-end rtl:justify-start": t.config.position === "right"
        }])
      }, [
        _(kt, {
          appear: "",
          "enter-from-class": "opacity-0 " + (t.config.position === "left" ? "-translate-x-full" : "translate-x-full"),
          "enter-to-class": "opacity-100 translate-x-0",
          "leave-from-class": "opacity-100 translate-x-0",
          "leave-to-class": "opacity-0 " + (t.config.position === "left" ? "-translate-x-full" : "translate-x-full"),
          onAfterLeave: t.modalContext.afterLeave
        }, {
          default: E(() => {
            var n;
            return [
              _(g(xn), {
                "aria-describedby": void 0,
                "trap-focus": (n = t.config) == null ? void 0 : n.closeExplicitly,
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
                })
              }, {
                default: E(() => [
                  _(g(On), { "as-child": "" }, {
                    default: E(() => [
                      _(g(Sn))
                    ]),
                    _: 1
                  }),
                  ne("div", {
                    class: xe(["im-slideover-content relative", [t.config.paddingClasses, t.config.panelClasses]])
                  }, [
                    t.config.closeButton ? (O(), ce("div", ql, [
                      _(An)
                    ])) : H("", !0),
                    F(e.$slots, "default", {
                      modalContext: t.modalContext,
                      config: t.config
                    })
                  ], 2)
                ]),
                _: 3
              }, 8, ["trap-focus", "class"])
            ];
          }),
          _: 3
        }, 8, ["enter-from-class", "leave-to-class", "onAfterLeave"])
      ], 2)
    ]));
  }
}, zl = ["data-inertiaui-modal-id", "data-inertiaui-modal-index"], Gl = {
  key: 1,
  class: "im-backdrop fixed inset-0 z-30 bg-black/75"
}, rs = {
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
      config: $(() => {
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
      id: $(() => {
        var o;
        return (o = r.value) == null ? void 0 : o.id;
      }),
      index: $(() => {
        var o;
        return (o = r.value) == null ? void 0 : o.index;
      }),
      isOpen: $(() => {
        var o;
        return (o = r.value) == null ? void 0 : o.isOpen;
      }),
      modalContext: $(() => {
        var o;
        return (o = r.value) == null ? void 0 : o.modalContext;
      }),
      onTopOfStack: $(() => {
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
      shouldRender: $(() => {
        var o;
        return (o = r.value) == null ? void 0 : o.shouldRender;
      })
    }), (o, a) => (O(), I(_i, {
      ref_key: "modal",
      ref: r
    }, {
      default: E(({
        afterLeave: i,
        close: l,
        config: u,
        emit: c,
        getChildModal: d,
        getParentModal: p,
        id: f,
        index: v,
        isOpen: s,
        modalContext: y,
        onTopOfStack: m,
        reload: b,
        setOpen: A,
        shouldRender: h
      }) => [
        _(g(pl), {
          open: s,
          "onUpdate:open": A
        }, {
          default: E(() => [
            _(g(vl), null, {
              default: E(() => [
                ne("div", {
                  "data-inertiaui-modal-id": f,
                  "data-inertiaui-modal-index": v,
                  class: "im-dialog relative z-20"
                }, [
                  v === 0 && m ? (O(), I(kt, {
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
                    default: E(() => [
                      _(g(Rl), { class: "im-backdrop fixed inset-0 z-30 bg-black/75" })
                    ]),
                    _: 1
                  }, 8, ["appear"])) : H("", !0),
                  v > 0 && m ? (O(), ce("div", Gl)) : H("", !0),
                  (O(), I(kr(u != null && u.slideover ? Kl : Ul), {
                    "modal-context": y,
                    config: u
                  }, {
                    default: E(() => [
                      F(o.$slots, "default", {
                        id: f,
                        afterLeave: i,
                        close: l,
                        config: u,
                        emit: c,
                        getChildModal: d,
                        getParentModal: p,
                        index: v,
                        isOpen: s,
                        modalContext: y,
                        onTopOfStack: m,
                        reload: b,
                        setOpen: A,
                        shouldRender: h
                      })
                    ]),
                    _: 2
                  }, 1032, ["modal-context", "config"]))
                ], 8, zl)
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
}, ns = {
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
    const r = t, n = S(!1), o = Ue(), a = S(null);
    Tt("modalContext", a);
    const i = e, l = S(!1), u = $(() => r.navigate ?? Lt("navigate"));
    j(
      () => {
        var y;
        return (y = a.value) == null ? void 0 : y.onTopOfStack;
      },
      (y) => {
        a.value && (y && l.value ? i("focus") : y || i("blur"), l.value = !y);
      }
    );
    const c = S(null);
    Ye(() => {
      var y;
      return (y = c.value) == null ? void 0 : y.call(c);
    });
    const d = Br();
    function p() {
      c.value = a.value.registerEventListenersFromAttrs(d);
    }
    j(a, (y, m) => {
      y && !m && (p(), i("success"));
    });
    function f() {
      i("close");
    }
    function v() {
      a.value = null, i("after-leave");
    }
    function s() {
      n.value || (r.href.startsWith("#") || (n.value = !0, i("start")), o.visit(
        r.href,
        r.method,
        r.data,
        r.headers,
        Gn(Lr(r, Ri)),
        f,
        v,
        r.queryStringArrayFormat,
        u.value
      ).then((y) => {
        a.value = y;
      }).catch((y) => i("error", y)).finally(() => n.value = !1));
    }
    return (y, m) => (O(), I(kr(t.as), q(g(d), {
      href: t.href,
      onClick: Un(s, ["prevent"])
    }), {
      default: E(() => [
        F(y.$slots, "default", { loading: n.value })
      ]),
      _: 3
    }, 16, ["href"]));
  }
};
function os() {
  return jn(_t("modalContext", null));
}
function as(t, e = {}) {
  return Ue().visit(
    t,
    e.method ?? "get",
    e.data ?? {},
    e.headers ?? {},
    e.config ?? {},
    e.onClose,
    e.onAfterLeave,
    e.queryStringArrayFormat ?? "brackets",
    e.navigate ?? Lt("navigate")
  );
}
export {
  _i as HeadlessModal,
  rs as Modal,
  ns as ModalLink,
  Di as ModalRoot,
  Lt as getConfig,
  Yl as putConfig,
  Zl as renderApp,
  Xl as resetConfig,
  os as useModal,
  as as visitModal
};
