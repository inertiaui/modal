var $n = Object.defineProperty;
var In = (t, e, r) => e in t ? $n(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var L = (t, e, r) => In(t, typeof e != "symbol" ? e + "" : e, r);
import * as er from "vue";
import { computed as $, provide as Bt, openBlock as E, createBlock as I, unref as h, mergeProps as q, createCommentVNode as H, ref as S, onUnmounted as Fe, onBeforeMount as Mn, watch as U, createElementBlock as ce, Fragment as Rt, renderSlot as F, h as re, readonly as Dn, markRaw as Dr, nextTick as de, inject as Fr, onBeforeUnmount as Ye, onMounted as at, useAttrs as Nr, defineComponent as T, Comment as Fn, cloneVNode as Nn, toRefs as Tr, getCurrentInstance as Ae, normalizeProps as Tn, guardReactiveProps as Bn, withCtx as O, reactive as Br, createVNode as _, watchEffect as fe, effectScope as Rr, Teleport as Rn, toHandlerKey as _n, camelize as kn, normalizeStyle as Ln, getCurrentScope as Wn, onScopeDispose as Un, createElementVNode as ne, normalizeClass as we, Transition as _t, resolveDynamicComponent as _r, withModifiers as jn } from "vue";
import { router as Qe, usePage as kr } from "@inertiajs/vue3";
import Ze from "axios";
const je = {
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
class qn {
  constructor() {
    this.config = {}, this.reset();
  }
  reset() {
    this.config = JSON.parse(JSON.stringify(je));
  }
  put(e, r) {
    if (typeof e == "object") {
      this.config = {
        type: e.type ?? je.type,
        modal: { ...je.modal, ...e.modal ?? {} },
        slideover: { ...je.slideover, ...e.slideover ?? {} }
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
const it = new qn(), Jl = () => it.reset(), Xl = (t, e) => it.put(t, e), Lr = (t) => it.get(t), me = (t, e) => it.get(t ? `slideover.${e}` : `modal.${e}`);
function Kn(t, e) {
  return Array.isArray(t) ? t.filter((r) => !e.includes(r)) : Object.keys(t).reduce((r, n) => (e.includes(n) || (r[n] = t[n]), r), {});
}
function Wr(t, e) {
  return Array.isArray(t) ? t.filter((r) => e.includes(r)) : e.reduce((r, n) => (n in t && (r[n] = t[n]), r), {});
}
function zn(t) {
  return Array.isArray(t) ? t.filter((e) => e !== null) : Object.keys(t).reduce((e, r) => (r in t && t[r] !== null && (e[r] = t[r]), e), {});
}
function Gn(t, e = 3, r = 10) {
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
var Pt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Vn(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Hn(t) {
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
var Qn = function(e) {
  return Jn(e) && !Xn(e);
};
function Jn(t) {
  return !!t && typeof t == "object";
}
function Xn(t) {
  var e = Object.prototype.toString.call(t);
  return e === "[object RegExp]" || e === "[object Date]" || eo(t);
}
var Yn = typeof Symbol == "function" && Symbol.for, Zn = Yn ? Symbol.for("react.element") : 60103;
function eo(t) {
  return t.$$typeof === Zn;
}
function to(t) {
  return Array.isArray(t) ? [] : {};
}
function Re(t, e) {
  return e.clone !== !1 && e.isMergeableObject(t) ? Se(to(t), t, e) : t;
}
function ro(t, e, r) {
  return t.concat(e).map(function(n) {
    return Re(n, r);
  });
}
function no(t, e) {
  if (!e.customMerge)
    return Se;
  var r = e.customMerge(t);
  return typeof r == "function" ? r : Se;
}
function oo(t) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(t).filter(function(e) {
    return Object.propertyIsEnumerable.call(t, e);
  }) : [];
}
function tr(t) {
  return Object.keys(t).concat(oo(t));
}
function Ur(t, e) {
  try {
    return e in t;
  } catch {
    return !1;
  }
}
function ao(t, e) {
  return Ur(t, e) && !(Object.hasOwnProperty.call(t, e) && Object.propertyIsEnumerable.call(t, e));
}
function io(t, e, r) {
  var n = {};
  return r.isMergeableObject(t) && tr(t).forEach(function(o) {
    n[o] = Re(t[o], r);
  }), tr(e).forEach(function(o) {
    ao(t, o) || (Ur(t, o) && r.isMergeableObject(e[o]) ? n[o] = no(o, r)(t[o], e[o], r) : n[o] = Re(e[o], r));
  }), n;
}
function Se(t, e, r) {
  r = r || {}, r.arrayMerge = r.arrayMerge || ro, r.isMergeableObject = r.isMergeableObject || Qn, r.cloneUnlessOtherwiseSpecified = Re;
  var n = Array.isArray(e), o = Array.isArray(t), a = n === o;
  return a ? n ? r.arrayMerge(t, e, r) : io(t, e, r) : Re(e, r);
}
Se.all = function(e, r) {
  if (!Array.isArray(e))
    throw new Error("first argument should be an array");
  return e.reduce(function(n, o) {
    return Se(n, o, r);
  }, {});
};
var lo = Se, so = lo;
const uo = /* @__PURE__ */ Vn(so);
var co = Error, fo = EvalError, po = RangeError, yo = ReferenceError, jr = SyntaxError, _e = TypeError, mo = URIError, vo = function() {
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
}, rr = typeof Symbol < "u" && Symbol, ho = vo, go = function() {
  return typeof rr != "function" || typeof Symbol != "function" || typeof rr("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : ho();
}, ut = {
  __proto__: null,
  foo: {}
}, bo = Object, wo = function() {
  return { __proto__: ut }.foo === ut.foo && !(ut instanceof bo);
}, xo = "Function.prototype.bind called on incompatible ", So = Object.prototype.toString, Eo = Math.max, Oo = "[object Function]", nr = function(e, r) {
  for (var n = [], o = 0; o < e.length; o += 1)
    n[o] = e[o];
  for (var a = 0; a < r.length; a += 1)
    n[a + e.length] = r[a];
  return n;
}, Po = function(e, r) {
  for (var n = [], o = r, a = 0; o < e.length; o += 1, a += 1)
    n[a] = e[o];
  return n;
}, Ao = function(t, e) {
  for (var r = "", n = 0; n < t.length; n += 1)
    r += t[n], n + 1 < t.length && (r += e);
  return r;
}, Co = function(e) {
  var r = this;
  if (typeof r != "function" || So.apply(r) !== Oo)
    throw new TypeError(xo + r);
  for (var n = Po(arguments, 1), o, a = function() {
    if (this instanceof o) {
      var d = r.apply(
        this,
        nr(n, arguments)
      );
      return Object(d) === d ? d : this;
    }
    return r.apply(
      e,
      nr(n, arguments)
    );
  }, i = Eo(0, r.length - n.length), l = [], u = 0; u < i; u++)
    l[u] = "$" + u;
  if (o = Function("binder", "return function (" + Ao(l, ",") + "){ return binder.apply(this,arguments); }")(a), r.prototype) {
    var c = function() {
    };
    c.prototype = r.prototype, o.prototype = new c(), c.prototype = null;
  }
  return o;
}, $o = Co, kt = Function.prototype.bind || $o, Io = Function.prototype.call, Mo = Object.prototype.hasOwnProperty, Do = kt, Fo = Do.call(Io, Mo), w, No = co, To = fo, Bo = po, Ro = yo, Ee = jr, xe = _e, _o = mo, qr = Function, ct = function(t) {
  try {
    return qr('"use strict"; return (' + t + ").constructor;")();
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
  throw new xe();
}, ko = se ? function() {
  try {
    return arguments.callee, ft;
  } catch {
    try {
      return se(arguments, "callee").get;
    } catch {
      return ft;
    }
  }
}() : ft, ve = go(), Lo = wo(), B = Object.getPrototypeOf || (Lo ? function(t) {
  return t.__proto__;
} : null), be = {}, Wo = typeof Uint8Array > "u" || !B ? w : B(Uint8Array), ue = {
  __proto__: null,
  "%AggregateError%": typeof AggregateError > "u" ? w : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? w : ArrayBuffer,
  "%ArrayIteratorPrototype%": ve && B ? B([][Symbol.iterator]()) : w,
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
  "%Error%": No,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": To,
  "%Float32Array%": typeof Float32Array > "u" ? w : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? w : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? w : FinalizationRegistry,
  "%Function%": qr,
  "%GeneratorFunction%": be,
  "%Int8Array%": typeof Int8Array > "u" ? w : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? w : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? w : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": ve && B ? B(B([][Symbol.iterator]())) : w,
  "%JSON%": typeof JSON == "object" ? JSON : w,
  "%Map%": typeof Map > "u" ? w : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !ve || !B ? w : B((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": Object,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise > "u" ? w : Promise,
  "%Proxy%": typeof Proxy > "u" ? w : Proxy,
  "%RangeError%": Bo,
  "%ReferenceError%": Ro,
  "%Reflect%": typeof Reflect > "u" ? w : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? w : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !ve || !B ? w : B((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? w : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": ve && B ? B(""[Symbol.iterator]()) : w,
  "%Symbol%": ve ? Symbol : w,
  "%SyntaxError%": Ee,
  "%ThrowTypeError%": ko,
  "%TypedArray%": Wo,
  "%TypeError%": xe,
  "%Uint8Array%": typeof Uint8Array > "u" ? w : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? w : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? w : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? w : Uint32Array,
  "%URIError%": _o,
  "%WeakMap%": typeof WeakMap > "u" ? w : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? w : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? w : WeakSet
};
if (B)
  try {
    null.error;
  } catch (t) {
    var Uo = B(B(t));
    ue["%Error.prototype%"] = Uo;
  }
var jo = function t(e) {
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
    o && B && (r = B(o.prototype));
  }
  return ue[e] = r, r;
}, or = {
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
}, ke = kt, et = Fo, qo = ke.call(Function.call, Array.prototype.concat), Ko = ke.call(Function.apply, Array.prototype.splice), ar = ke.call(Function.call, String.prototype.replace), tt = ke.call(Function.call, String.prototype.slice), zo = ke.call(Function.call, RegExp.prototype.exec), Go = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, Vo = /\\(\\)?/g, Ho = function(e) {
  var r = tt(e, 0, 1), n = tt(e, -1);
  if (r === "%" && n !== "%")
    throw new Ee("invalid intrinsic syntax, expected closing `%`");
  if (n === "%" && r !== "%")
    throw new Ee("invalid intrinsic syntax, expected opening `%`");
  var o = [];
  return ar(e, Go, function(a, i, l, u) {
    o[o.length] = l ? ar(u, Vo, "$1") : i || a;
  }), o;
}, Qo = function(e, r) {
  var n = e, o;
  if (et(or, n) && (o = or[n], n = "%" + o[0] + "%"), et(ue, n)) {
    var a = ue[n];
    if (a === be && (a = jo(n)), typeof a > "u" && !r)
      throw new xe("intrinsic " + e + " exists, but is not available. Please file an issue!");
    return {
      alias: o,
      name: n,
      value: a
    };
  }
  throw new Ee("intrinsic " + e + " does not exist!");
}, Ce = function(e, r) {
  if (typeof e != "string" || e.length === 0)
    throw new xe("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof r != "boolean")
    throw new xe('"allowMissing" argument must be a boolean');
  if (zo(/^%?[^%]*%?$/, e) === null)
    throw new Ee("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var n = Ho(e), o = n.length > 0 ? n[0] : "", a = Qo("%" + o + "%", r), i = a.name, l = a.value, u = !1, c = a.alias;
  c && (o = c[0], Ko(n, qo([0, 1], c)));
  for (var d = 1, p = !0; d < n.length; d += 1) {
    var f = n[d], m = tt(f, 0, 1), s = tt(f, -1);
    if ((m === '"' || m === "'" || m === "`" || s === '"' || s === "'" || s === "`") && m !== s)
      throw new Ee("property names with quotes must have matching quotes");
    if ((f === "constructor" || !p) && (u = !0), o += "." + f, i = "%" + o + "%", et(ue, i))
      l = ue[i];
    else if (l != null) {
      if (!(f in l)) {
        if (!r)
          throw new xe("base intrinsic for " + e + " exists, but the property is not available.");
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
}, Kr = { exports: {} }, dt, ir;
function Lt() {
  if (ir) return dt;
  ir = 1;
  var t = Ce, e = t("%Object.defineProperty%", !0) || !1;
  if (e)
    try {
      e({}, "a", { value: 1 });
    } catch {
      e = !1;
    }
  return dt = e, dt;
}
var Jo = Ce, Je = Jo("%Object.getOwnPropertyDescriptor%", !0);
if (Je)
  try {
    Je([], "length");
  } catch {
    Je = null;
  }
var zr = Je, lr = Lt(), Xo = jr, he = _e, sr = zr, Yo = function(e, r, n) {
  if (!e || typeof e != "object" && typeof e != "function")
    throw new he("`obj` must be an object or a function`");
  if (typeof r != "string" && typeof r != "symbol")
    throw new he("`property` must be a string or a symbol`");
  if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
    throw new he("`nonEnumerable`, if provided, must be a boolean or null");
  if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
    throw new he("`nonWritable`, if provided, must be a boolean or null");
  if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
    throw new he("`nonConfigurable`, if provided, must be a boolean or null");
  if (arguments.length > 6 && typeof arguments[6] != "boolean")
    throw new he("`loose`, if provided, must be a boolean");
  var o = arguments.length > 3 ? arguments[3] : null, a = arguments.length > 4 ? arguments[4] : null, i = arguments.length > 5 ? arguments[5] : null, l = arguments.length > 6 ? arguments[6] : !1, u = !!sr && sr(e, r);
  if (lr)
    lr(e, r, {
      configurable: i === null && u ? u.configurable : !i,
      enumerable: o === null && u ? u.enumerable : !o,
      value: n,
      writable: a === null && u ? u.writable : !a
    });
  else if (l || !o && !a && !i)
    e[r] = n;
  else
    throw new Xo("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
}, At = Lt(), Gr = function() {
  return !!At;
};
Gr.hasArrayLengthDefineBug = function() {
  if (!At)
    return null;
  try {
    return At([], "length", { value: 1 }).length !== 1;
  } catch {
    return !0;
  }
};
var Zo = Gr, ea = Ce, ur = Yo, ta = Zo(), cr = zr, fr = _e, ra = ea("%Math.floor%"), na = function(e, r) {
  if (typeof e != "function")
    throw new fr("`fn` is not a function");
  if (typeof r != "number" || r < 0 || r > 4294967295 || ra(r) !== r)
    throw new fr("`length` must be a positive 32-bit integer");
  var n = arguments.length > 2 && !!arguments[2], o = !0, a = !0;
  if ("length" in e && cr) {
    var i = cr(e, "length");
    i && !i.configurable && (o = !1), i && !i.writable && (a = !1);
  }
  return (o || a || !n) && (ta ? ur(
    /** @type {Parameters<define>[0]} */
    e,
    "length",
    r,
    !0,
    !0
  ) : ur(
    /** @type {Parameters<define>[0]} */
    e,
    "length",
    r
  )), e;
};
(function(t) {
  var e = kt, r = Ce, n = na, o = _e, a = r("%Function.prototype.apply%"), i = r("%Function.prototype.call%"), l = r("%Reflect.apply%", !0) || e.call(i, a), u = Lt(), c = r("%Math.max%");
  t.exports = function(f) {
    if (typeof f != "function")
      throw new o("a function is required");
    var m = l(e, i, arguments);
    return n(
      m,
      1 + c(0, f.length - (arguments.length - 1)),
      !0
    );
  };
  var d = function() {
    return l(e, a, arguments);
  };
  u ? u(t.exports, "apply", { value: d }) : t.exports.apply = d;
})(Kr);
var oa = Kr.exports, Vr = Ce, Hr = oa, aa = Hr(Vr("String.prototype.indexOf")), ia = function(e, r) {
  var n = Vr(e, !!r);
  return typeof n == "function" && aa(e, ".prototype.") > -1 ? Hr(n) : n;
};
const la = {}, sa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: la
}, Symbol.toStringTag, { value: "Module" })), ua = /* @__PURE__ */ Hn(sa);
var Wt = typeof Map == "function" && Map.prototype, pt = Object.getOwnPropertyDescriptor && Wt ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, rt = Wt && pt && typeof pt.get == "function" ? pt.get : null, dr = Wt && Map.prototype.forEach, Ut = typeof Set == "function" && Set.prototype, yt = Object.getOwnPropertyDescriptor && Ut ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, nt = Ut && yt && typeof yt.get == "function" ? yt.get : null, pr = Ut && Set.prototype.forEach, ca = typeof WeakMap == "function" && WeakMap.prototype, Ne = ca ? WeakMap.prototype.has : null, fa = typeof WeakSet == "function" && WeakSet.prototype, Te = fa ? WeakSet.prototype.has : null, da = typeof WeakRef == "function" && WeakRef.prototype, yr = da ? WeakRef.prototype.deref : null, pa = Boolean.prototype.valueOf, ya = Object.prototype.toString, ma = Function.prototype.toString, va = String.prototype.match, jt = String.prototype.slice, te = String.prototype.replace, ha = String.prototype.toUpperCase, mr = String.prototype.toLowerCase, Qr = RegExp.prototype.test, vr = Array.prototype.concat, V = Array.prototype.join, ga = Array.prototype.slice, hr = Math.floor, Ct = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, mt = Object.getOwnPropertySymbols, $t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, Oe = typeof Symbol == "function" && typeof Symbol.iterator == "object", R = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === Oe || !0) ? Symbol.toStringTag : null, Jr = Object.prototype.propertyIsEnumerable, gr = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(t) {
  return t.__proto__;
} : null);
function br(t, e) {
  if (t === 1 / 0 || t === -1 / 0 || t !== t || t && t > -1e3 && t < 1e3 || Qr.call(/e/, e))
    return e;
  var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof t == "number") {
    var n = t < 0 ? -hr(-t) : hr(t);
    if (n !== t) {
      var o = String(n), a = jt.call(e, o.length + 1);
      return te.call(o, r, "$&_") + "." + te.call(te.call(a, /([0-9]{3})/g, "$&_"), /_$/, "");
    }
  }
  return te.call(e, r, "$&_");
}
var It = ua, wr = It.custom, xr = Yr(wr) ? wr : null, ba = function t(e, r, n, o) {
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
    return en(e, a);
  if (typeof e == "number") {
    if (e === 0)
      return 1 / 0 / e > 0 ? "0" : "-0";
    var u = String(e);
    return l ? br(e, u) : u;
  }
  if (typeof e == "bigint") {
    var c = String(e) + "n";
    return l ? br(e, c) : c;
  }
  var d = typeof a.depth > "u" ? 5 : a.depth;
  if (typeof n > "u" && (n = 0), n >= d && d > 0 && typeof e == "object")
    return Mt(e) ? "[Array]" : "[Object]";
  var p = _a(a, n);
  if (typeof o > "u")
    o = [];
  else if (Zr(o, e) >= 0)
    return "[Circular]";
  function f(j, X, Y) {
    if (X && (o = ga.call(o), o.push(X)), Y) {
      var Me = {
        depth: a.depth
      };
      return ee(a, "quoteStyle") && (Me.quoteStyle = a.quoteStyle), t(j, Me, n + 1, o);
    }
    return t(j, a, n + 1, o);
  }
  if (typeof e == "function" && !Sr(e)) {
    var m = $a(e), s = qe(e, f);
    return "[Function" + (m ? ": " + m : " (anonymous)") + "]" + (s.length > 0 ? " { " + V.call(s, ", ") + " }" : "");
  }
  if (Yr(e)) {
    var y = Oe ? te.call(String(e), /^(Symbol\(.*\))_[^)]*$/, "$1") : $t.call(e);
    return typeof e == "object" && !Oe ? De(y) : y;
  }
  if (Ta(e)) {
    for (var v = "<" + mr.call(String(e.nodeName)), b = e.attributes || [], P = 0; P < b.length; P++)
      v += " " + b[P].name + "=" + Xr(wa(b[P].value), "double", a);
    return v += ">", e.childNodes && e.childNodes.length && (v += "..."), v += "</" + mr.call(String(e.nodeName)) + ">", v;
  }
  if (Mt(e)) {
    if (e.length === 0)
      return "[]";
    var g = qe(e, f);
    return p && !Ra(g) ? "[" + Dt(g, p) + "]" : "[ " + V.call(g, ", ") + " ]";
  }
  if (Sa(e)) {
    var x = qe(e, f);
    return !("cause" in Error.prototype) && "cause" in e && !Jr.call(e, "cause") ? "{ [" + String(e) + "] " + V.call(vr.call("[cause]: " + f(e.cause), x), ", ") + " }" : x.length === 0 ? "[" + String(e) + "]" : "{ [" + String(e) + "] " + V.call(x, ", ") + " }";
  }
  if (typeof e == "object" && i) {
    if (xr && typeof e[xr] == "function" && It)
      return It(e, { depth: d - n });
    if (i !== "symbol" && typeof e.inspect == "function")
      return e.inspect();
  }
  if (Ia(e)) {
    var A = [];
    return dr && dr.call(e, function(j, X) {
      A.push(f(X, e, !0) + " => " + f(j, e));
    }), Er("Map", rt.call(e), A, p);
  }
  if (Fa(e)) {
    var D = [];
    return pr && pr.call(e, function(j) {
      D.push(f(j, e));
    }), Er("Set", nt.call(e), D, p);
  }
  if (Ma(e))
    return vt("WeakMap");
  if (Na(e))
    return vt("WeakSet");
  if (Da(e))
    return vt("WeakRef");
  if (Oa(e))
    return De(f(Number(e)));
  if (Aa(e))
    return De(f(Ct.call(e)));
  if (Pa(e))
    return De(pa.call(e));
  if (Ea(e))
    return De(f(String(e)));
  if (typeof window < "u" && e === window)
    return "{ [object Window] }";
  if (typeof globalThis < "u" && e === globalThis || typeof Pt < "u" && e === Pt)
    return "{ [object globalThis] }";
  if (!xa(e) && !Sr(e)) {
    var k = qe(e, f), W = gr ? gr(e) === Object.prototype : e instanceof Object || e.constructor === Object, ie = e instanceof Object ? "" : "null prototype", J = !W && R && Object(e) === e && R in e ? jt.call(oe(e), 8, -1) : ie ? "Object" : "", Ue = W || typeof e.constructor != "function" ? "" : e.constructor.name ? e.constructor.name + " " : "", ye = Ue + (J || ie ? "[" + V.call(vr.call([], J || [], ie || []), ": ") + "] " : "");
    return k.length === 0 ? ye + "{}" : p ? ye + "{" + Dt(k, p) + "}" : ye + "{ " + V.call(k, ", ") + " }";
  }
  return String(e);
};
function Xr(t, e, r) {
  var n = (r.quoteStyle || e) === "double" ? '"' : "'";
  return n + t + n;
}
function wa(t) {
  return te.call(String(t), /"/g, "&quot;");
}
function Mt(t) {
  return oe(t) === "[object Array]" && (!R || !(typeof t == "object" && R in t));
}
function xa(t) {
  return oe(t) === "[object Date]" && (!R || !(typeof t == "object" && R in t));
}
function Sr(t) {
  return oe(t) === "[object RegExp]" && (!R || !(typeof t == "object" && R in t));
}
function Sa(t) {
  return oe(t) === "[object Error]" && (!R || !(typeof t == "object" && R in t));
}
function Ea(t) {
  return oe(t) === "[object String]" && (!R || !(typeof t == "object" && R in t));
}
function Oa(t) {
  return oe(t) === "[object Number]" && (!R || !(typeof t == "object" && R in t));
}
function Pa(t) {
  return oe(t) === "[object Boolean]" && (!R || !(typeof t == "object" && R in t));
}
function Yr(t) {
  if (Oe)
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
function Aa(t) {
  if (!t || typeof t != "object" || !Ct)
    return !1;
  try {
    return Ct.call(t), !0;
  } catch {
  }
  return !1;
}
var Ca = Object.prototype.hasOwnProperty || function(t) {
  return t in this;
};
function ee(t, e) {
  return Ca.call(t, e);
}
function oe(t) {
  return ya.call(t);
}
function $a(t) {
  if (t.name)
    return t.name;
  var e = va.call(ma.call(t), /^function\s*([\w$]+)/);
  return e ? e[1] : null;
}
function Zr(t, e) {
  if (t.indexOf)
    return t.indexOf(e);
  for (var r = 0, n = t.length; r < n; r++)
    if (t[r] === e)
      return r;
  return -1;
}
function Ia(t) {
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
function Ma(t) {
  if (!Ne || !t || typeof t != "object")
    return !1;
  try {
    Ne.call(t, Ne);
    try {
      Te.call(t, Te);
    } catch {
      return !0;
    }
    return t instanceof WeakMap;
  } catch {
  }
  return !1;
}
function Da(t) {
  if (!yr || !t || typeof t != "object")
    return !1;
  try {
    return yr.call(t), !0;
  } catch {
  }
  return !1;
}
function Fa(t) {
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
function Na(t) {
  if (!Te || !t || typeof t != "object")
    return !1;
  try {
    Te.call(t, Te);
    try {
      Ne.call(t, Ne);
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
function en(t, e) {
  if (t.length > e.maxStringLength) {
    var r = t.length - e.maxStringLength, n = "... " + r + " more character" + (r > 1 ? "s" : "");
    return en(jt.call(t, 0, e.maxStringLength), e) + n;
  }
  var o = te.call(te.call(t, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, Ba);
  return Xr(o, "single", e);
}
function Ba(t) {
  var e = t.charCodeAt(0), r = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[e];
  return r ? "\\" + r : "\\x" + (e < 16 ? "0" : "") + ha.call(e.toString(16));
}
function De(t) {
  return "Object(" + t + ")";
}
function vt(t) {
  return t + " { ? }";
}
function Er(t, e, r, n) {
  var o = n ? Dt(r, n) : V.call(r, ", ");
  return t + " (" + e + ") {" + o + "}";
}
function Ra(t) {
  for (var e = 0; e < t.length; e++)
    if (Zr(t[e], `
`) >= 0)
      return !1;
  return !0;
}
function _a(t, e) {
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
function qe(t, e) {
  var r = Mt(t), n = [];
  if (r) {
    n.length = t.length;
    for (var o = 0; o < t.length; o++)
      n[o] = ee(t, o) ? e(t[o], t) : "";
  }
  var a = typeof mt == "function" ? mt(t) : [], i;
  if (Oe) {
    i = {};
    for (var l = 0; l < a.length; l++)
      i["$" + a[l]] = a[l];
  }
  for (var u in t)
    ee(t, u) && (r && String(Number(u)) === u && u < t.length || Oe && i["$" + u] instanceof Symbol || (Qr.call(/[^\w$]/, u) ? n.push(e(u, t) + ": " + e(t[u], t)) : n.push(u + ": " + e(t[u], t))));
  if (typeof mt == "function")
    for (var c = 0; c < a.length; c++)
      Jr.call(t, a[c]) && n.push("[" + e(a[c]) + "]: " + e(t[a[c]], t));
  return n;
}
var tn = Ce, $e = ia, ka = ba, La = _e, Ke = tn("%WeakMap%", !0), ze = tn("%Map%", !0), Wa = $e("WeakMap.prototype.get", !0), Ua = $e("WeakMap.prototype.set", !0), ja = $e("WeakMap.prototype.has", !0), qa = $e("Map.prototype.get", !0), Ka = $e("Map.prototype.set", !0), za = $e("Map.prototype.has", !0), qt = function(t, e) {
  for (var r = t, n; (n = r.next) !== null; r = n)
    if (n.key === e)
      return r.next = n.next, n.next = /** @type {NonNullable<typeof list.next>} */
      t.next, t.next = n, n;
}, Ga = function(t, e) {
  var r = qt(t, e);
  return r && r.value;
}, Va = function(t, e, r) {
  var n = qt(t, e);
  n ? n.value = r : t.next = /** @type {import('.').ListNode<typeof value>} */
  {
    // eslint-disable-line no-param-reassign, no-extra-parens
    key: e,
    next: t.next,
    value: r
  };
}, Ha = function(t, e) {
  return !!qt(t, e);
}, Qa = function() {
  var e, r, n, o = {
    assert: function(a) {
      if (!o.has(a))
        throw new La("Side channel does not contain " + ka(a));
    },
    get: function(a) {
      if (Ke && a && (typeof a == "object" || typeof a == "function")) {
        if (e)
          return Wa(e, a);
      } else if (ze) {
        if (r)
          return qa(r, a);
      } else if (n)
        return Ga(n, a);
    },
    has: function(a) {
      if (Ke && a && (typeof a == "object" || typeof a == "function")) {
        if (e)
          return ja(e, a);
      } else if (ze) {
        if (r)
          return za(r, a);
      } else if (n)
        return Ha(n, a);
      return !1;
    },
    set: function(a, i) {
      Ke && a && (typeof a == "object" || typeof a == "function") ? (e || (e = new Ke()), Ua(e, a, i)) : ze ? (r || (r = new ze()), Ka(r, a, i)) : (n || (n = { key: {}, next: null }), Va(n, a, i));
    }
  };
  return o;
}, Ja = String.prototype.replace, Xa = /%20/g, ht = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
}, Kt = {
  default: ht.RFC3986,
  formatters: {
    RFC1738: function(t) {
      return Ja.call(t, Xa, "+");
    },
    RFC3986: function(t) {
      return String(t);
    }
  },
  RFC1738: ht.RFC1738,
  RFC3986: ht.RFC3986
}, Ya = Kt, gt = Object.prototype.hasOwnProperty, le = Array.isArray, z = function() {
  for (var t = [], e = 0; e < 256; ++e)
    t.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());
  return t;
}(), Za = function(e) {
  for (; e.length > 1; ) {
    var r = e.pop(), n = r.obj[r.prop];
    if (le(n)) {
      for (var o = [], a = 0; a < n.length; ++a)
        typeof n[a] < "u" && o.push(n[a]);
      r.obj[r.prop] = o;
    }
  }
}, rn = function(e, r) {
  for (var n = r && r.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, o = 0; o < e.length; ++o)
    typeof e[o] < "u" && (n[o] = e[o]);
  return n;
}, ei = function t(e, r, n) {
  if (!r)
    return e;
  if (typeof r != "object") {
    if (le(e))
      e.push(r);
    else if (e && typeof e == "object")
      (n && (n.plainObjects || n.allowPrototypes) || !gt.call(Object.prototype, r)) && (e[r] = !0);
    else
      return [e, r];
    return e;
  }
  if (!e || typeof e != "object")
    return [e].concat(r);
  var o = e;
  return le(e) && !le(r) && (o = rn(e, n)), le(e) && le(r) ? (r.forEach(function(a, i) {
    if (gt.call(e, i)) {
      var l = e[i];
      l && typeof l == "object" && a && typeof a == "object" ? e[i] = t(l, a, n) : e.push(a);
    } else
      e[i] = a;
  }), e) : Object.keys(r).reduce(function(a, i) {
    var l = r[i];
    return gt.call(a, i) ? a[i] = t(a[i], l, n) : a[i] = l, a;
  }, o);
}, ti = function(e, r) {
  return Object.keys(r).reduce(function(n, o) {
    return n[o] = r[o], n;
  }, e);
}, ri = function(t, e, r) {
  var n = t.replace(/\+/g, " ");
  if (r === "iso-8859-1")
    return n.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n);
  } catch {
    return n;
  }
}, bt = 1024, ni = function(e, r, n, o, a) {
  if (e.length === 0)
    return e;
  var i = e;
  if (typeof e == "symbol" ? i = Symbol.prototype.toString.call(e) : typeof e != "string" && (i = String(e)), n === "iso-8859-1")
    return escape(i).replace(/%u[0-9a-f]{4}/gi, function(m) {
      return "%26%23" + parseInt(m.slice(2), 16) + "%3B";
    });
  for (var l = "", u = 0; u < i.length; u += bt) {
    for (var c = i.length >= bt ? i.slice(u, u + bt) : i, d = [], p = 0; p < c.length; ++p) {
      var f = c.charCodeAt(p);
      if (f === 45 || f === 46 || f === 95 || f === 126 || f >= 48 && f <= 57 || f >= 65 && f <= 90 || f >= 97 && f <= 122 || a === Ya.RFC1738 && (f === 40 || f === 41)) {
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
}, oi = function(e) {
  for (var r = [{ obj: { o: e }, prop: "o" }], n = [], o = 0; o < r.length; ++o)
    for (var a = r[o], i = a.obj[a.prop], l = Object.keys(i), u = 0; u < l.length; ++u) {
      var c = l[u], d = i[c];
      typeof d == "object" && d !== null && n.indexOf(d) === -1 && (r.push({ obj: i, prop: c }), n.push(d));
    }
  return Za(r), e;
}, ai = function(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}, ii = function(e) {
  return !e || typeof e != "object" ? !1 : !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e));
}, li = function(e, r) {
  return [].concat(e, r);
}, si = function(e, r) {
  if (le(e)) {
    for (var n = [], o = 0; o < e.length; o += 1)
      n.push(r(e[o]));
    return n;
  }
  return r(e);
}, nn = {
  arrayToObject: rn,
  assign: ti,
  combine: li,
  compact: oi,
  decode: ri,
  encode: ni,
  isBuffer: ii,
  isRegExp: ai,
  maybeMap: si,
  merge: ei
}, on = Qa, Xe = nn, Be = Kt, ui = Object.prototype.hasOwnProperty, an = {
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
}, G = Array.isArray, ci = Array.prototype.push, ln = function(t, e) {
  ci.apply(t, G(e) ? e : [e]);
}, fi = Date.prototype.toISOString, Or = Be.default, N = {
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
  format: Or,
  formatter: Be.formatters[Or],
  // deprecated
  indices: !1,
  serializeDate: function(e) {
    return fi.call(e);
  },
  skipNulls: !1,
  strictNullHandling: !1
}, di = function(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean" || typeof e == "symbol" || typeof e == "bigint";
}, wt = {}, pi = function t(e, r, n, o, a, i, l, u, c, d, p, f, m, s, y, v, b, P) {
  for (var g = e, x = P, A = 0, D = !1; (x = x.get(wt)) !== void 0 && !D; ) {
    var k = x.get(e);
    if (A += 1, typeof k < "u") {
      if (k === A)
        throw new RangeError("Cyclic object value");
      D = !0;
    }
    typeof x.get(wt) > "u" && (A = 0);
  }
  if (typeof d == "function" ? g = d(r, g) : g instanceof Date ? g = m(g) : n === "comma" && G(g) && (g = Xe.maybeMap(g, function(st) {
    return st instanceof Date ? m(st) : st;
  })), g === null) {
    if (i)
      return c && !v ? c(r, N.encoder, b, "key", s) : r;
    g = "";
  }
  if (di(g) || Xe.isBuffer(g)) {
    if (c) {
      var W = v ? r : c(r, N.encoder, b, "key", s);
      return [y(W) + "=" + y(c(g, N.encoder, b, "value", s))];
    }
    return [y(r) + "=" + y(String(g))];
  }
  var ie = [];
  if (typeof g > "u")
    return ie;
  var J;
  if (n === "comma" && G(g))
    v && c && (g = Xe.maybeMap(g, c)), J = [{ value: g.length > 0 ? g.join(",") || null : void 0 }];
  else if (G(d))
    J = d;
  else {
    var Ue = Object.keys(g);
    J = p ? Ue.sort(p) : Ue;
  }
  var ye = u ? r.replace(/\./g, "%2E") : r, j = o && G(g) && g.length === 1 ? ye + "[]" : ye;
  if (a && G(g) && g.length === 0)
    return j + "[]";
  for (var X = 0; X < J.length; ++X) {
    var Y = J[X], Me = typeof Y == "object" && typeof Y.value < "u" ? Y.value : g[Y];
    if (!(l && Me === null)) {
      var lt = f && u ? Y.replace(/\./g, "%2E") : Y, Cn = G(g) ? typeof n == "function" ? n(j, lt) : j : j + (f ? "." + lt : "[" + lt + "]");
      P.set(e, A);
      var Zt = on();
      Zt.set(wt, P), ln(ie, t(
        Me,
        Cn,
        n,
        o,
        a,
        i,
        l,
        u,
        n === "comma" && v && G(g) ? null : c,
        d,
        p,
        f,
        m,
        s,
        y,
        v,
        b,
        Zt
      ));
    }
  }
  return ie;
}, yi = function(e) {
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
  var n = Be.default;
  if (typeof e.format < "u") {
    if (!ui.call(Be.formatters, e.format))
      throw new TypeError("Unknown format option provided.");
    n = e.format;
  }
  var o = Be.formatters[n], a = N.filter;
  (typeof e.filter == "function" || G(e.filter)) && (a = e.filter);
  var i;
  if (e.arrayFormat in an ? i = e.arrayFormat : "indices" in e ? i = e.indices ? "indices" : "repeat" : i = N.arrayFormat, "commaRoundTrip" in e && typeof e.commaRoundTrip != "boolean")
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
  var r = t, n = yi(e), o, a;
  typeof n.filter == "function" ? (a = n.filter, r = a("", r)) : G(n.filter) && (a = n.filter, o = a);
  var i = [];
  if (typeof r != "object" || r === null)
    return "";
  var l = an[n.arrayFormat], u = l === "comma" && n.commaRoundTrip;
  o || (o = Object.keys(r)), n.sort && o.sort(n.sort);
  for (var c = on(), d = 0; d < o.length; ++d) {
    var p = o[d];
    n.skipNulls && r[p] === null || ln(i, pi(
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
  var f = i.join(n.delimiter), m = n.addQueryPrefix === !0 ? "?" : "";
  return n.charsetSentinel && (n.charset === "iso-8859-1" ? m += "utf8=%26%2310003%3B&" : m += "utf8=%E2%9C%93&"), f.length > 0 ? m + f : "";
}, Pe = nn, Ft = Object.prototype.hasOwnProperty, vi = Array.isArray, M = {
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
}, sn = function(t, e) {
  return t && typeof t == "string" && e.comma && t.indexOf(",") > -1 ? t.split(",") : t;
}, gi = "utf8=%26%2310003%3B", bi = "utf8=%E2%9C%93", wi = function(e, r) {
  var n = { __proto__: null }, o = r.ignoreQueryPrefix ? e.replace(/^\?/, "") : e;
  o = o.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  var a = r.parameterLimit === 1 / 0 ? void 0 : r.parameterLimit, i = o.split(r.delimiter, a), l = -1, u, c = r.charset;
  if (r.charsetSentinel)
    for (u = 0; u < i.length; ++u)
      i[u].indexOf("utf8=") === 0 && (i[u] === bi ? c = "utf-8" : i[u] === gi && (c = "iso-8859-1"), l = u, u = i.length);
  for (u = 0; u < i.length; ++u)
    if (u !== l) {
      var d = i[u], p = d.indexOf("]="), f = p === -1 ? d.indexOf("=") : p + 1, m, s;
      f === -1 ? (m = r.decoder(d, M.decoder, c, "key"), s = r.strictNullHandling ? null : "") : (m = r.decoder(d.slice(0, f), M.decoder, c, "key"), s = Pe.maybeMap(
        sn(d.slice(f + 1), r),
        function(v) {
          return r.decoder(v, M.decoder, c, "value");
        }
      )), s && r.interpretNumericEntities && c === "iso-8859-1" && (s = hi(s)), d.indexOf("[]=") > -1 && (s = vi(s) ? [s] : s);
      var y = Ft.call(n, m);
      y && r.duplicates === "combine" ? n[m] = Pe.combine(n[m], s) : (!y || r.duplicates === "last") && (n[m] = s);
    }
  return n;
}, xi = function(t, e, r, n) {
  for (var o = n ? e : sn(e, r), a = t.length - 1; a >= 0; --a) {
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
}, Si = function(e, r, n, o) {
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
    return xi(d, r, n, o);
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
}, Oi = function(t, e) {
  var r = Ei(e);
  if (t === "" || t === null || typeof t > "u")
    return r.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var n = typeof t == "string" ? wi(t, r) : t, o = r.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, a = Object.keys(n), i = 0; i < a.length; ++i) {
    var l = a[i], u = Si(l, n[l], r, typeof t == "string");
    o = Pe.merge(o, u, r);
  }
  return r.allowSparse === !0 ? o : Pe.compact(o);
}, Pi = mi, Ai = Oi, Ci = Kt, Pr = {
  formats: Ci,
  parse: Ai,
  stringify: Pi
}, $i = { exports: {} };
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */
(function(t, e) {
  (function(r, n) {
    t.exports = n();
  })(Pt, function() {
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
      var y, v;
      for (y in s)
        v = s[y], v !== void 0 && s.hasOwnProperty(y) && (n[y] = v);
      return this;
    }, r.status = null, r.set = function(s) {
      var y = r.isStarted();
      s = o(s, n.minimum, 1), r.status = s === 1 ? null : s;
      var v = r.render(!y), b = v.querySelector(n.barSelector), P = n.speed, g = n.easing;
      return v.offsetWidth, l(function(x) {
        n.positionUsing === "" && (n.positionUsing = r.getPositioningCSS()), u(b, i(s, P, g)), s === 1 ? (u(v, {
          transition: "none",
          opacity: 1
        }), v.offsetWidth, setTimeout(function() {
          u(v, {
            transition: "all " + P + "ms linear",
            opacity: 0
          }), setTimeout(function() {
            r.remove(), x();
          }, P);
        }, P)) : setTimeout(x, P);
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
      r.promise = function(v) {
        return !v || v.state() === "resolved" ? this : (y === 0 && r.start(), s++, y++, v.always(function() {
          y--, y === 0 ? (s = 0, r.done()) : r.set((s - y) / s);
        }), this);
      };
    }(), r.render = function(s) {
      if (r.isRendered()) return document.getElementById("nprogress");
      d(document.documentElement, "nprogress-busy");
      var y = document.createElement("div");
      y.id = "nprogress", y.innerHTML = n.template;
      var v = y.querySelector(n.barSelector), b = s ? "-100" : a(r.status || 0), P = document.querySelector(n.parent), g;
      return u(v, {
        transition: "all 0 linear",
        transform: "translate3d(" + b + "%,0,0)"
      }), n.showSpinner || (g = y.querySelector(n.spinnerSelector), g && m(g)), P != document.body && d(P, "nprogress-custom-parent"), P.appendChild(y), y;
    }, r.remove = function() {
      p(document.documentElement, "nprogress-busy"), p(document.querySelector(n.parent), "nprogress-custom-parent");
      var s = document.getElementById("nprogress");
      s && m(s);
    }, r.isRendered = function() {
      return !!document.getElementById("nprogress");
    }, r.getPositioningCSS = function() {
      var s = document.body.style, y = "WebkitTransform" in s ? "Webkit" : "MozTransform" in s ? "Moz" : "msTransform" in s ? "ms" : "OTransform" in s ? "O" : "";
      return y + "Perspective" in s ? "translate3d" : y + "Transform" in s ? "translate" : "margin";
    };
    function o(s, y, v) {
      return s < y ? y : s > v ? v : s;
    }
    function a(s) {
      return (-1 + s) * 100;
    }
    function i(s, y, v) {
      var b;
      return n.positionUsing === "translate3d" ? b = { transform: "translate3d(" + a(s) + "%,0,0)" } : n.positionUsing === "translate" ? b = { transform: "translate(" + a(s) + "%,0)" } : b = { "margin-left": a(s) + "%" }, b.transition = "all " + y + "ms " + v, b;
    }
    var l = /* @__PURE__ */ function() {
      var s = [];
      function y() {
        var v = s.shift();
        v && v(y);
      }
      return function(v) {
        s.push(v), s.length == 1 && y();
      };
    }(), u = /* @__PURE__ */ function() {
      var s = ["Webkit", "O", "Moz", "ms"], y = {};
      function v(x) {
        return x.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(A, D) {
          return D.toUpperCase();
        });
      }
      function b(x) {
        var A = document.body.style;
        if (x in A) return x;
        for (var D = s.length, k = x.charAt(0).toUpperCase() + x.slice(1), W; D--; )
          if (W = s[D] + k, W in A) return W;
        return x;
      }
      function P(x) {
        return x = v(x), y[x] || (y[x] = b(x));
      }
      function g(x, A, D) {
        A = P(A), x.style[A] = D;
      }
      return function(x, A) {
        var D = arguments, k, W;
        if (D.length == 2)
          for (k in A)
            W = A[k], W !== void 0 && A.hasOwnProperty(k) && g(x, k, W);
        else
          g(x, D[1], D[2]);
      };
    }();
    function c(s, y) {
      var v = typeof s == "string" ? s : f(s);
      return v.indexOf(" " + y + " ") >= 0;
    }
    function d(s, y) {
      var v = f(s), b = v + y;
      c(v, y) || (s.className = b.substring(1));
    }
    function p(s, y) {
      var v = f(s), b;
      c(s, y) && (b = v.replace(" " + y + " ", " "), s.className = b.substring(1, b.length - 1));
    }
    function f(s) {
      return (" " + (s.className || "") + " ").replace(/\s+/gi, " ");
    }
    function m(s) {
      s && s.parentNode && s.parentNode.removeChild(s);
    }
    return r;
  });
})($i);
function Ii(t, e, r, n = "brackets") {
  let o = /^https?:\/\//.test(e.toString()), a = o || e.toString().startsWith("/"), i = !a && !e.toString().startsWith("#") && !e.toString().startsWith("?"), l = e.toString().includes("?") || t === "get" && Object.keys(r).length, u = e.toString().includes("#"), c = new URL(e.toString(), "http://localhost");
  return t === "get" && Object.keys(r).length && (c.search = Pr.stringify(uo(Pr.parse(c.search, { ignoreQueryPrefix: !0 }), r), { encodeValuesOnly: !0, arrayFormat: n }), r = {}), [[o ? `${c.protocol}//${c.host}` : "", a ? c.pathname : "", i ? c.pathname.substring(1) : "", l ? c.search : "", u ? c.hash : ""].join(""), r];
}
const un = {
  __name: "ModalRenderer",
  props: {
    index: {
      type: Number,
      required: !0
    }
  },
  setup(t) {
    const e = t, r = Le(), n = $(() => r.stack.value[e.index]);
    return Bt("modalContext", n), (o, a) => {
      var i;
      return (i = n.value) != null && i.component ? (E(), I(h(n).component, q({ key: 0 }, n.value.componentProps, {
        onModalEvent: a[0] || (a[0] = (l, ...u) => n.value.emit(l, ...u))
      }), null, 16)) : H("", !0);
    };
  }
}, Mi = {
  __name: "ModalRoot",
  setup(t) {
    const e = Le(), r = S(!1);
    Fe(Qe.on("start", () => r.value = !0)), Fe(Qe.on("finish", () => r.value = !1));
    const n = (a) => (a.headers["X-InertiaUI-Modal-Base-Url"] = e.getBaseUrl(), a);
    Mn(() => {
      Ze.interceptors.request.use(n);
    }), Fe(() => {
      Ze.interceptors.request.eject(n);
    });
    const o = kr();
    return U(
      () => {
        var a;
        return (a = o.props) == null ? void 0 : a._inertiaui_modal;
      },
      (a) => {
        if (!a) {
          e.closeAll();
          return;
        }
        e.setBaseUrl(a.baseUrl), e.pushFromResponseData(a, {}, () => {
          if (!a.baseUrl) {
            console.error("No base url in modal response data so cannot navigate back");
            return;
          }
          !r.value && window.location.href !== a.baseUrl && Qe.visit(a.baseUrl, {
            preserveScroll: !0,
            preserveState: !0
          });
        });
      },
      { immediate: !0 }
    ), (a, i) => (E(), ce(Rt, null, [
      F(a.$slots, "default"),
      h(e).stack.value.length ? (E(), I(un, {
        key: 0,
        index: 0
      })) : H("", !0)
    ], 64));
  }
};
let zt = null;
const Nt = S(null), C = S([]), ot = S({}), Di = (t) => {
  zt = t;
};
class Gt {
  constructor(e, r, n, o, a) {
    L(this, "update", (e, r, n) => {
      const o = this.index.value;
      o > -1 && (C.value[o].modalProps = e, C.value[o].onCloseCallback = r, C.value[o].afterLeaveCallback = n);
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
      e.only && (r = Wr(r, e.only)), e.except && (r = Kn(r, e.except)), (n = this.response) != null && n.url && Ze.get(this.response.url, {
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
        Object.assign(this.componentProps.value, o.data.props);
      });
    });
    this.id = Gt.generateId(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = e, this.componentProps = S(r.props), this.response = r, this.modalProps = n, this.onCloseCallback = o, this.afterLeaveCallback = a, this.index = $(() => C.value.findIndex((i) => i.id === this.id)), this.onTopOfStack = $(() => {
      var l;
      return C.value.length < 2 ? !0 : ((l = C.value.map((u) => ({ id: u.id, shouldRender: u.shouldRender })).reverse().find((u) => u.shouldRender)) == null ? void 0 : l.id) === this.id;
    });
  }
  static generateId() {
    return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `inertiaui_modal_${crypto.randomUUID()}` : `inertiaui_modal_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
function Fi(t, e) {
  ot.value[t] = { name: t, callback: e };
}
function Ni(t, e, r, n) {
  if (!ot.value[t])
    throw new Error(`The local modal "${t}" has not been registered.`);
  const o = Vt(null, {}, e, r, n);
  return o.name = t, ot.value[t].callback(o), o;
}
function cn(t, e = {}, r = null, n = null) {
  return zt(t.component).then((o) => Vt(Dr(o), t, e, r, n));
}
function Ti(t, e, r = {}, n = {}, o = {}, a = null, i = null, l = "brackets", u = !1) {
  return new Promise((c, d) => {
    if (t.startsWith("#")) {
      c(Ni(t.substring(1), o, a, i));
      return;
    }
    const [p, f] = Ii(e, t || "", r, l);
    let m = u && C.value.length === 0;
    if (C.value.length === 0 && (Nt.value = typeof window < "u" ? window.location.href : ""), n = {
      ...n,
      Accept: "text/html, application/xhtml+xml",
      "X-Requested-With": "XMLHttpRequest",
      "X-Inertia": !0,
      "X-Inertia-Version": kr().version,
      "X-InertiaUI-Modal": !0,
      "X-InertiaUI-Modal-Use-Router": m ? 1 : 0
    }, m)
      return Qe.visit(p, {
        method: e,
        data: f,
        headers: n,
        preserveScroll: !0,
        preserveState: !0,
        onError: d,
        onFinish: () => Gn(() => C.value[0]).then((s) => {
          const y = s.onCloseCallback, v = s.afterLeaveCallback;
          s.update(
            o,
            () => {
              a == null || a(), y == null || y();
            },
            () => {
              i == null || i(), v == null || v();
            }
          ), c(s);
        })
      });
    Ze({ url: p, method: e, data: f, headers: n }).then((s) => c(cn(s.data, o, a, i))).catch(d);
  });
}
function Vt(t, e, r, n, o) {
  const a = new Gt(t, e, r, n, o);
  return C.value.push(a), de(() => {
    a.show();
  }), a;
}
const Bi = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], Yl = (t, e) => (e.resolveComponent && (zt = e.resolveComponent), () => re(Mi, () => re(t, e)));
function Le() {
  return {
    setComponentResolver: Di,
    getBaseUrl: () => Nt.value,
    setBaseUrl: (t) => Nt.value = t,
    stack: Dn(C),
    push: Vt,
    pushFromResponseData: cn,
    closeAll: () => C.value.reverse().forEach((t) => t.close()),
    reset: () => C.value = [],
    visit: Ti,
    registerLocalModal: Fi,
    removeLocalModal: (t) => delete ot.value[t]
  };
}
const Ri = /* @__PURE__ */ Object.assign({
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
    const n = t, o = Le(), a = n.name ? S({}) : Fr("modalContext"), i = $(() => {
      var s;
      const m = ((s = a.value.modalProps) == null ? void 0 : s.slideover) ?? n.slideover ?? Lr("type") === "slideover";
      return {
        slideover: m,
        closeButton: n.closeButton ?? me(m, "closeButton"),
        closeExplicitly: n.closeExplicitly ?? me(m, "closeExplicitly"),
        maxWidth: n.maxWidth ?? me(m, "maxWidth"),
        paddingClasses: n.paddingClasses ?? me(m, "paddingClasses"),
        panelClasses: n.panelClasses ?? me(m, "panelClasses"),
        position: n.position ?? me(m, "position"),
        ...a.value.modalProps
      };
    });
    n.name && (o.registerLocalModal(n.name, function(m) {
      a.value = m, c();
    }), Ye(() => {
      o.removeLocalModal(n.name);
    })), at(() => {
      n.name || c();
    });
    const l = S(null);
    Ye(() => {
      var m;
      return (m = l.value) == null ? void 0 : m.call(l);
    });
    const u = Nr();
    function c() {
      l.value = a.value.registerEventListenersFromAttrs(u);
    }
    const d = r;
    function p(m, ...s) {
      d("modal-event", m, ...s);
    }
    e({
      afterLeave: a.value.afterLeave,
      close: a.value.close,
      emit: p,
      getChildModal: a.value.getChildModal,
      getParentModal: a.value.getParentModal,
      id: a.value.id,
      index: a.value.index,
      isOpen: a.value.isOpen,
      modalContext: a.value,
      modalProps: i.value,
      onTopOfStack: a.value.onTopOfStack,
      reload: a.value.reload,
      setOpen: a.value.setOpen,
      shouldRender: a.value.shouldRender
    });
    const f = $(() => {
      var m;
      return (m = o.stack.value.find((s) => s.shouldRender && s.index > a.value.index)) == null ? void 0 : m.index;
    });
    return (m, s) => (E(), ce(Rt, null, [
      h(a).shouldRender ? F(m.$slots, "default", {
        key: 0,
        id: h(a).id,
        afterLeave: h(a).afterLeave,
        close: h(a).close,
        emit: p,
        getChildModal: h(a).getChildModal,
        getParentModal: h(a).getParentModal,
        index: h(a).index,
        isOpen: h(a).isOpen,
        modalContext: h(a),
        modalProps: i.value,
        onTopOfStack: h(a).onTopOfStack,
        reload: h(a).reload,
        setOpen: h(a).setOpen,
        shouldRender: h(a).shouldRender
      }) : H("", !0),
      f.value ? (E(), I(un, {
        key: 1,
        index: f.value
      }, null, 8, ["index"])) : H("", !0)
    ], 64));
  }
});
function Ht(t, e) {
  const r = typeof t == "string" && !e ? `${t}Context` : e, n = Symbol(r);
  return [(o) => {
    const a = Fr(n, o);
    if (a || a === null)
      return a;
    throw new Error(
      `Injection \`${n.toString()}\` not found. Component must be used within ${Array.isArray(t) ? `one of the following components: ${t.join(
        ", "
      )}` : `\`${t}\``}`
    );
  }, (o) => (Bt(n, o), o)];
}
function fn(t, e, r) {
  const n = r.originalEvent.target, o = new CustomEvent(t, {
    bubbles: !1,
    cancelable: !0,
    detail: r
  });
  e && n.addEventListener(t, e, { once: !0 }), n.dispatchEvent(o);
}
function dn(t) {
  return Wn() ? (Un(t), !0) : !1;
}
function _i(t) {
  let e = !1, r;
  const n = Rr(!0);
  return (...o) => (e || (r = n.run(() => t(...o)), e = !0), r);
}
function ki(t) {
  let e = 0, r, n;
  const o = () => {
    e -= 1, n && e <= 0 && (n.stop(), r = void 0, n = void 0);
  };
  return (...a) => (e += 1, r || (n = Rr(!0), r = n.run(() => t(...a))), dn(o), r);
}
function Qt(t) {
  return typeof t == "function" ? t() : h(t);
}
const pe = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Li = (t) => typeof t < "u", Wi = Object.prototype.toString, Ui = (t) => Wi.call(t) === "[object Object]", ji = () => {
}, Ar = /* @__PURE__ */ qi();
function qi() {
  var t, e;
  return pe && ((t = window == null ? void 0 : window.navigator) == null ? void 0 : t.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((e = window == null ? void 0 : window.navigator) == null ? void 0 : e.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function Ki(t) {
  return Ae();
}
function zi(t, e) {
  Ki() && Ye(t, e);
}
function We(t) {
  var e;
  const r = Qt(t);
  return (e = r == null ? void 0 : r.$el) != null ? e : r;
}
const pn = pe ? window : void 0;
function yn(...t) {
  let e, r, n, o;
  if (typeof t[0] == "string" || Array.isArray(t[0]) ? ([r, n, o] = t, e = pn) : [e, r, n, o] = t, !e)
    return ji;
  Array.isArray(r) || (r = [r]), Array.isArray(n) || (n = [n]);
  const a = [], i = () => {
    a.forEach((d) => d()), a.length = 0;
  }, l = (d, p, f, m) => (d.addEventListener(p, f, m), () => d.removeEventListener(p, f, m)), u = U(
    () => [We(e), Qt(o)],
    ([d, p]) => {
      if (i(), !d)
        return;
      const f = Ui(p) ? { ...p } : p;
      a.push(
        ...r.flatMap((m) => n.map((s) => l(d, m, s, f)))
      );
    },
    { immediate: !0, flush: "post" }
  ), c = () => {
    u(), i();
  };
  return dn(c), c;
}
function Gi(t) {
  return typeof t == "function" ? t : typeof t == "string" ? (e) => e.key === t : Array.isArray(t) ? (e) => t.includes(e.key) : () => !0;
}
function Vi(...t) {
  let e, r, n = {};
  t.length === 3 ? (e = t[0], r = t[1], n = t[2]) : t.length === 2 ? typeof t[1] == "object" ? (e = !0, r = t[0], n = t[1]) : (e = t[0], r = t[1]) : (e = !0, r = t[0]);
  const {
    target: o = pn,
    eventName: a = "keydown",
    passive: i = !1,
    dedupe: l = !1
  } = n, u = Gi(e);
  return yn(o, a, (c) => {
    c.repeat && Qt(l) || u(c) && r(c);
  }, i);
}
function Hi() {
  const t = S(!1), e = Ae();
  return e && at(() => {
    t.value = !0;
  }, e), t;
}
function Qi(t) {
  return JSON.parse(JSON.stringify(t));
}
function Ji(t, e, r, n = {}) {
  var o, a, i;
  const {
    clone: l = !1,
    passive: u = !1,
    eventName: c,
    deep: d = !1,
    defaultValue: p,
    shouldEmit: f
  } = n, m = Ae(), s = r || (m == null ? void 0 : m.emit) || ((o = m == null ? void 0 : m.$emit) == null ? void 0 : o.bind(m)) || ((i = (a = m == null ? void 0 : m.proxy) == null ? void 0 : a.$emit) == null ? void 0 : i.bind(m == null ? void 0 : m.proxy));
  let y = c;
  y = y || `update:${e.toString()}`;
  const v = (g) => l ? typeof l == "function" ? l(g) : Qi(g) : g, b = () => Li(t[e]) ? v(t[e]) : p, P = (g) => {
    f ? f(g) && s(y, g) : s(y, g);
  };
  if (u) {
    const g = b(), x = S(g);
    let A = !1;
    return U(
      () => t[e],
      (D) => {
        A || (A = !0, x.value = v(D), de(() => A = !1));
      }
    ), U(
      x,
      (D) => {
        !A && (D !== t[e] || d) && P(D);
      },
      { deep: d }
    ), x;
  } else
    return $({
      get() {
        return b();
      },
      set(g) {
        P(g);
      }
    });
}
function Jt(t) {
  return t ? t.flatMap((e) => e.type === Rt ? Jt(e.children) : [e]) : [];
}
function xt(t) {
  if (t === null || typeof t != "object")
    return !1;
  const e = Object.getPrototypeOf(t);
  return e !== null && e !== Object.prototype && Object.getPrototypeOf(e) !== null || Symbol.iterator in t ? !1 : Symbol.toStringTag in t ? Object.prototype.toString.call(t) === "[object Module]" : !0;
}
function Tt(t, e, r = ".", n) {
  if (!xt(e))
    return Tt(t, {}, r);
  const o = Object.assign({}, e);
  for (const a in t) {
    if (a === "__proto__" || a === "constructor")
      continue;
    const i = t[a];
    i != null && (Array.isArray(i) && Array.isArray(o[a]) ? o[a] = [...i, ...o[a]] : xt(i) && xt(o[a]) ? o[a] = Tt(
      i,
      o[a],
      (r ? `${r}.` : "") + a.toString()
    ) : o[a] = i);
  }
  return o;
}
function Xi(t) {
  return (...e) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    e.reduce((r, n) => Tt(r, n, ""), {})
  );
}
const Yi = Xi(), [mn, Zl] = Ht("ConfigProvider");
let Zi = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", el = (t = 21) => {
  let e = "", r = t;
  for (; r--; )
    e += Zi[Math.random() * 64 | 0];
  return e;
};
const tl = ki(() => {
  const t = S(/* @__PURE__ */ new Map()), e = S(), r = $(() => {
    for (const i of t.value.values())
      if (i)
        return !0;
    return !1;
  }), n = mn({
    scrollBody: S(!0)
  });
  let o = null;
  const a = () => {
    document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.body.style.removeProperty("--scrollbar-width"), document.body.style.overflow = e.value ?? "", Ar && (o == null || o()), e.value = void 0;
  };
  return U(r, (i, l) => {
    var u;
    if (!pe)
      return;
    if (!i) {
      l && a();
      return;
    }
    e.value === void 0 && (e.value = document.body.style.overflow);
    const c = window.innerWidth - document.documentElement.clientWidth, d = { padding: c, margin: 0 }, p = (u = n.scrollBody) != null && u.value ? typeof n.scrollBody.value == "object" ? Yi({
      padding: n.scrollBody.value.padding === !0 ? c : n.scrollBody.value.padding,
      margin: n.scrollBody.value.margin === !0 ? c : n.scrollBody.value.margin
    }, d) : d : { padding: 0, margin: 0 };
    c > 0 && (document.body.style.paddingRight = typeof p.padding == "number" ? `${p.padding}px` : String(p.padding), document.body.style.marginRight = typeof p.margin == "number" ? `${p.margin}px` : String(p.margin), document.body.style.setProperty("--scrollbar-width", `${c}px`), document.body.style.overflow = "hidden"), Ar && (o = yn(
      document,
      "touchmove",
      (f) => {
        var m;
        f.target === document.documentElement && (f.touches.length > 1 || (m = f.preventDefault) == null || m.call(f));
      },
      { passive: !1 }
    )), de(() => {
      document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden";
    });
  }, { immediate: !0, flush: "sync" }), t;
});
function rl(t) {
  const e = el(6), r = tl();
  r.value.set(e, t);
  const n = $({
    get: () => r.value.get(e) ?? !1,
    set: (o) => r.value.set(e, o)
  });
  return zi(() => {
    r.value.delete(e);
  }), n;
}
function Xt(t) {
  const e = Ae(), r = e == null ? void 0 : e.type.emits, n = {};
  return r != null && r.length || console.warn(
    `No emitted event found. Please check component: ${e == null ? void 0 : e.type.__name}`
  ), r == null || r.forEach((o) => {
    n[_n(kn(o))] = (...a) => t(o, ...a);
  }), n;
}
function K() {
  const t = Ae(), e = S(), r = $(() => {
    var i, l;
    return ["#text", "#comment"].includes((i = e.value) == null ? void 0 : i.$el.nodeName) ? (l = e.value) == null ? void 0 : l.$el.nextElementSibling : We(e);
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
var nl = function(t) {
  if (typeof document > "u")
    return null;
  var e = Array.isArray(t) ? t[0] : t;
  return e.ownerDocument.body;
}, ge = /* @__PURE__ */ new WeakMap(), Ge = /* @__PURE__ */ new WeakMap(), Ve = {}, St = 0, vn = function(t) {
  return t && (t.host || vn(t.parentNode));
}, ol = function(t, e) {
  return e.map(function(r) {
    if (t.contains(r))
      return r;
    var n = vn(r);
    return n && t.contains(n) ? n : (console.error("aria-hidden", r, "in not contained inside", t, ". Doing nothing"), null);
  }).filter(function(r) {
    return !!r;
  });
}, al = function(t, e, r, n) {
  var o = ol(e, Array.isArray(t) ? t : [t]);
  Ve[r] || (Ve[r] = /* @__PURE__ */ new WeakMap());
  var a = Ve[r], i = [], l = /* @__PURE__ */ new Set(), u = new Set(o), c = function(p) {
    !p || l.has(p) || (l.add(p), c(p.parentNode));
  };
  o.forEach(c);
  var d = function(p) {
    !p || u.has(p) || Array.prototype.forEach.call(p.children, function(f) {
      if (l.has(f))
        d(f);
      else
        try {
          var m = f.getAttribute(n), s = m !== null && m !== "false", y = (ge.get(f) || 0) + 1, v = (a.get(f) || 0) + 1;
          ge.set(f, y), a.set(f, v), i.push(f), y === 1 && s && Ge.set(f, !0), v === 1 && f.setAttribute(r, "true"), s || f.setAttribute(n, "true");
        } catch (b) {
          console.error("aria-hidden: cannot operate on ", f, b);
        }
    });
  };
  return d(e), l.clear(), St++, function() {
    i.forEach(function(p) {
      var f = ge.get(p) - 1, m = a.get(p) - 1;
      ge.set(p, f), a.set(p, m), f || (Ge.has(p) || p.removeAttribute(n), Ge.delete(p)), m || p.removeAttribute(r);
    }), St--, St || (ge = /* @__PURE__ */ new WeakMap(), ge = /* @__PURE__ */ new WeakMap(), Ge = /* @__PURE__ */ new WeakMap(), Ve = {});
  };
}, il = function(t, e, r) {
  r === void 0 && (r = "data-aria-hidden");
  var n = Array.from(Array.isArray(t) ? t : [t]), o = nl(t);
  return o ? (n.push.apply(n, Array.from(o.querySelectorAll("[aria-live]"))), al(n, o, r, "aria-hidden")) : function() {
    return null;
  };
};
function ll(t) {
  let e;
  U(() => We(t), (r) => {
    r ? e = il(r) : e && e();
  }), Fe(() => {
    e && e();
  });
}
let sl = 0;
function Cr(t, e = "radix") {
  const r = mn({ useId: void 0 });
  return er.useId ? `${e}-${er.useId()}` : r.useId ? `${e}-${r.useId()}` : `${e}-${++sl}`;
}
function ul(t, e) {
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
const Yt = T({
  name: "PrimitiveSlot",
  inheritAttrs: !1,
  setup(t, { attrs: e, slots: r }) {
    return () => {
      var n, o;
      if (!r.default)
        return null;
      const a = Jt(r.default()), i = a.findIndex((d) => d.type !== Fn);
      if (i === -1)
        return a;
      const l = a[i];
      (n = l.props) == null || delete n.ref;
      const u = l.props ? q(e, l.props) : e;
      e.class && (o = l.props) != null && o.class && delete l.props.class;
      const c = Nn(l, u);
      for (const d in u)
        d.startsWith("on") && (c.props || (c.props = {}), c.props[d] = u[d]);
      return a.length === 1 ? c : (a[i] = c, a);
    };
  }
}), Ie = T({
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
    return typeof n == "string" && ["area", "img", "input"].includes(n) ? () => re(n, e) : n !== "template" ? () => re(t.as, e, { default: r.default }) : () => re(Yt, e, { default: r.default });
  }
});
function hn() {
  const t = S(), e = $(() => {
    var r, n;
    return ["#text", "#comment"].includes((r = t.value) == null ? void 0 : r.$el.nodeName) ? (n = t.value) == null ? void 0 : n.$el.nextElementSibling : We(t);
  });
  return {
    primitiveElement: t,
    currentElement: e
  };
}
function cl(t, e) {
  const r = S({}), n = S("none"), o = t.value ? "mounted" : "unmounted", { state: a, dispatch: i } = ul(o, {
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
    var m;
    if (pe) {
      const s = new CustomEvent(f, { bubbles: !1, cancelable: !1 });
      (m = e.value) == null || m.dispatchEvent(s);
    }
  };
  U(
    t,
    async (f, m) => {
      var s;
      const y = m !== f;
      if (await de(), y) {
        const v = n.value, b = He(e.value);
        f ? (i("MOUNT"), l("enter"), b === "none" && l("after-enter")) : b === "none" || ((s = r.value) == null ? void 0 : s.display) === "none" ? (i("UNMOUNT"), l("leave"), l("after-leave")) : m && v !== b ? (i("ANIMATION_OUT"), l("leave")) : (i("UNMOUNT"), l("after-leave"));
      }
    },
    { immediate: !0 }
  );
  const u = (f) => {
    const m = He(e.value), s = m.includes(
      f.animationName
    ), y = a.value === "mounted" ? "enter" : "leave";
    f.target === e.value && s && (l(`after-${y}`), i("ANIMATION_END")), f.target === e.value && m === "none" && i("ANIMATION_END");
  }, c = (f) => {
    f.target === e.value && (n.value = He(e.value));
  }, d = U(
    e,
    (f, m) => {
      f ? (r.value = getComputedStyle(f), f.addEventListener("animationstart", c), f.addEventListener("animationcancel", u), f.addEventListener("animationend", u)) : (i("ANIMATION_END"), m == null || m.removeEventListener("animationstart", c), m == null || m.removeEventListener("animationcancel", u), m == null || m.removeEventListener("animationend", u));
    },
    { immediate: !0 }
  ), p = U(a, () => {
    const f = He(e.value);
    n.value = a.value === "mounted" ? f : "none";
  });
  return Fe(() => {
    d(), p();
  }), {
    isPresent: $(
      () => ["mounted", "unmountSuspended"].includes(a.value)
    )
  };
}
function He(t) {
  return t && getComputedStyle(t).animationName || "none";
}
const gn = T({
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
    const { present: o, forceMount: a } = Tr(t), i = S(), { isPresent: l } = cl(o, i);
    r({ present: l });
    let u = e.default({ present: l });
    u = Jt(u || []);
    const c = Ae();
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
        const p = We(d);
        return typeof (p == null ? void 0 : p.hasAttribute) > "u" || (p != null && p.hasAttribute("data-radix-popper-content-wrapper") ? i.value = p.firstElementChild : i.value = p), p;
      }
    }) : null;
  }
}), [ae, fl] = Ht("DialogRoot"), dl = /* @__PURE__ */ T({
  inheritAttrs: !1,
  __name: "DialogRoot",
  props: {
    open: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: !1 },
    modal: { type: Boolean, default: !0 }
  },
  emits: ["update:open"],
  setup(t, { emit: e }) {
    const r = t, n = Ji(r, "open", e, {
      defaultValue: r.defaultOpen,
      passive: r.open === void 0
    }), o = S(), a = S(), { modal: i } = Tr(r);
    return fl({
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
    }), (l, u) => F(l.$slots, "default", { open: h(n) });
  }
}), pl = /* @__PURE__ */ T({
  __name: "Teleport",
  props: {
    to: { default: "body" },
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(t) {
    const e = Hi();
    return (r, n) => h(e) || r.forceMount ? (E(), I(Rn, {
      key: 0,
      to: r.to,
      disabled: r.disabled
    }, [
      F(r.$slots, "default")
    ], 8, ["to", "disabled"])) : H("", !0);
  }
}), yl = /* @__PURE__ */ T({
  __name: "DialogPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(t) {
    const e = t;
    return (r, n) => (E(), I(h(pl), Tn(Bn(e)), {
      default: O(() => [
        F(r.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), ml = "dismissableLayer.pointerDownOutside", vl = "dismissableLayer.focusOutside";
function bn(t, e) {
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
        if (bn(e.value, d)) {
          o.value = !1;
          return;
        }
        if (c.target && !o.value) {
          let p = function() {
            fn(
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
function gl(t, e) {
  var r;
  const n = ((r = e == null ? void 0 : e.value) == null ? void 0 : r.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), o = S(!1);
  return fe((a) => {
    if (!pe)
      return;
    const i = async (l) => {
      e != null && e.value && (await de(), !(!e.value || bn(e.value, l.target)) && l.target && !o.value && fn(
        vl,
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
const Q = Br({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), bl = /* @__PURE__ */ T({
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
      const s = Array.from(l.value), [y] = [...Q.layersWithOutsidePointerEventsDisabled].slice(-1), v = s.indexOf(y);
      return u.value >= v;
    }), p = hl(async (s) => {
      const y = [...Q.branches].some(
        (v) => v == null ? void 0 : v.contains(s.target)
      );
      !d.value || y || (n("pointerDownOutside", s), n("interactOutside", s), await de(), s.defaultPrevented || n("dismiss"));
    }, a), f = gl((s) => {
      [...Q.branches].some(
        (y) => y == null ? void 0 : y.contains(s.target)
      ) || (n("focusOutside", s), n("interactOutside", s), s.defaultPrevented || n("dismiss"));
    }, a);
    Vi("Escape", (s) => {
      u.value === l.value.size - 1 && (n("escapeKeyDown", s), s.defaultPrevented || n("dismiss"));
    });
    let m;
    return fe((s) => {
      a.value && (r.disableOutsidePointerEvents && (Q.layersWithOutsidePointerEventsDisabled.size === 0 && (m = i.value.body.style.pointerEvents, i.value.body.style.pointerEvents = "none"), Q.layersWithOutsidePointerEventsDisabled.add(a.value)), l.value.add(a.value), s(() => {
        r.disableOutsidePointerEvents && Q.layersWithOutsidePointerEventsDisabled.size === 1 && (i.value.body.style.pointerEvents = m);
      }));
    }), fe((s) => {
      s(() => {
        a.value && (l.value.delete(a.value), Q.layersWithOutsidePointerEventsDisabled.delete(a.value));
      });
    }), (s, y) => (E(), I(h(Ie), {
      ref: h(o),
      "as-child": s.asChild,
      as: s.as,
      "data-dismissable-layer": "",
      style: Ln({
        pointerEvents: c.value ? d.value ? "auto" : "none" : void 0
      }),
      onFocusCapture: h(f).onFocusCapture,
      onBlurCapture: h(f).onBlurCapture,
      onPointerdownCapture: h(p).onPointerDownCapture
    }, {
      default: O(() => [
        F(s.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as", "style", "onFocusCapture", "onBlurCapture", "onPointerdownCapture"]));
  }
}), Et = "focusScope.autoFocusOnMount", Ot = "focusScope.autoFocusOnUnmount", $r = { bubbles: !1, cancelable: !0 };
function wl(t, { select: e = !1 } = {}) {
  const r = document.activeElement;
  for (const n of t)
    if (Z(n, { select: e }), document.activeElement !== r)
      return !0;
}
function xl(t) {
  const e = wn(t), r = Ir(e, t), n = Ir(e.reverse(), t);
  return [r, n];
}
function wn(t) {
  const e = [], r = document.createTreeWalker(t, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (n) => {
      const o = n.tagName === "INPUT" && n.type === "hidden";
      return n.disabled || n.hidden || o ? NodeFilter.FILTER_SKIP : n.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; r.nextNode(); ) e.push(r.currentNode);
  return e;
}
function Ir(t, e) {
  for (const r of t)
    if (!Sl(r, { upTo: e }))
      return r;
}
function Sl(t, { upTo: e }) {
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
const Ol = _i(() => S([]));
function Pl() {
  const t = Ol();
  return {
    add(e) {
      const r = t.value[0];
      e !== r && (r == null || r.pause()), t.value = Mr(t.value, e), t.value.unshift(e);
    },
    remove(e) {
      var r;
      t.value = Mr(t.value, e), (r = t.value[0]) == null || r.resume();
    }
  };
}
function Mr(t, e) {
  const r = [...t], n = r.indexOf(e);
  return n !== -1 && r.splice(n, 1), r;
}
function Al(t) {
  return t.filter((e) => e.tagName !== "A");
}
const Cl = /* @__PURE__ */ T({
  __name: "FocusScope",
  props: {
    loop: { type: Boolean, default: !1 },
    trapped: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["mountAutoFocus", "unmountAutoFocus"],
  setup(t, { emit: e }) {
    const r = t, n = e, { currentRef: o, currentElement: a } = K(), i = S(null), l = Pl(), u = Br({
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
      function f(v) {
        if (u.paused || !p)
          return;
        const b = v.target;
        p.contains(b) ? i.value = b : Z(i.value, { select: !0 });
      }
      function m(v) {
        if (u.paused || !p)
          return;
        const b = v.relatedTarget;
        b !== null && (p.contains(b) || Z(i.value, { select: !0 }));
      }
      function s(v) {
        p.contains(i.value) || Z(p);
      }
      document.addEventListener("focusin", f), document.addEventListener("focusout", m);
      const y = new MutationObserver(s);
      p && y.observe(p, { childList: !0, subtree: !0 }), d(() => {
        document.removeEventListener("focusin", f), document.removeEventListener("focusout", m), y.disconnect();
      });
    }), fe(async (d) => {
      const p = a.value;
      if (await de(), !p)
        return;
      l.add(u);
      const f = document.activeElement;
      if (!p.contains(f)) {
        const m = new CustomEvent(Et, $r);
        p.addEventListener(Et, (s) => n("mountAutoFocus", s)), p.dispatchEvent(m), m.defaultPrevented || (wl(Al(wn(p)), {
          select: !0
        }), document.activeElement === f && Z(p));
      }
      d(() => {
        p.removeEventListener(Et, (y) => n("mountAutoFocus", y));
        const m = new CustomEvent(Ot, $r), s = (y) => {
          n("unmountAutoFocus", y);
        };
        p.addEventListener(Ot, s), p.dispatchEvent(m), setTimeout(() => {
          m.defaultPrevented || Z(f ?? document.body, { select: !0 }), p.removeEventListener(Ot, s), l.remove(u);
        }, 0);
      });
    });
    function c(d) {
      if (!r.loop && !r.trapped || u.paused)
        return;
      const p = d.key === "Tab" && !d.altKey && !d.ctrlKey && !d.metaKey, f = document.activeElement;
      if (p && f) {
        const m = d.currentTarget, [s, y] = xl(m);
        s && y ? !d.shiftKey && f === y ? (d.preventDefault(), r.loop && Z(s, { select: !0 })) : d.shiftKey && f === s && (d.preventDefault(), r.loop && Z(y, { select: !0 })) : f === m && d.preventDefault();
      }
    }
    return (d, p) => (E(), I(h(Ie), {
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
function $l(t) {
  return t ? "open" : "closed";
}
const Il = "DialogTitle", Ml = "DialogContent";
function Dl({
  titleName: t = Il,
  contentName: e = Ml,
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
const xn = /* @__PURE__ */ T({
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
    return o.titleId || (o.titleId = Cr(void 0, "radix-vue-dialog-title")), o.descriptionId || (o.descriptionId = Cr(void 0, "radix-vue-dialog-description")), at(() => {
      o.contentElement = i, document.activeElement !== document.body && (o.triggerElement.value = document.activeElement);
    }), process.env.NODE_ENV !== "production" && Dl({
      titleName: "DialogTitle",
      contentName: "DialogContent",
      componentLink: "dialog.html#title",
      titleId: o.titleId,
      descriptionId: o.descriptionId,
      contentElement: i
    }), (l, u) => (E(), I(h(Cl), {
      "as-child": "",
      loop: "",
      trapped: r.trapFocus,
      onMountAutoFocus: u[5] || (u[5] = (c) => n("openAutoFocus", c)),
      onUnmountAutoFocus: u[6] || (u[6] = (c) => n("closeAutoFocus", c))
    }, {
      default: O(() => [
        _(h(bl), q({
          id: h(o).contentId,
          ref: h(a),
          as: l.as,
          "as-child": l.asChild,
          "disable-outside-pointer-events": l.disableOutsidePointerEvents,
          role: "dialog",
          "aria-describedby": h(o).descriptionId,
          "aria-labelledby": h(o).titleId,
          "data-state": h($l)(h(o).open.value)
        }, l.$attrs, {
          onDismiss: u[0] || (u[0] = (c) => h(o).onOpenChange(!1)),
          onEscapeKeyDown: u[1] || (u[1] = (c) => n("escapeKeyDown", c)),
          onFocusOutside: u[2] || (u[2] = (c) => n("focusOutside", c)),
          onInteractOutside: u[3] || (u[3] = (c) => n("interactOutside", c)),
          onPointerDownOutside: u[4] || (u[4] = (c) => n("pointerDownOutside", c))
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
}), Fl = /* @__PURE__ */ T({
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
    const r = t, n = e, o = ae(), a = Xt(n), { forwardRef: i, currentElement: l } = K();
    return ll(l), (u, c) => (E(), I(xn, q({ ...r, ...h(a) }, {
      ref: h(i),
      "trap-focus": h(o).open.value,
      "disable-outside-pointer-events": !0,
      onCloseAutoFocus: c[0] || (c[0] = (d) => {
        var p;
        d.defaultPrevented || (d.preventDefault(), (p = h(o).triggerElement.value) == null || p.focus());
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
        F(u.$slots, "default")
      ]),
      _: 3
    }, 16, ["trap-focus"]));
  }
}), Nl = /* @__PURE__ */ T({
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
    const r = t, n = Xt(e);
    K();
    const o = ae(), a = S(!1), i = S(!1);
    return (l, u) => (E(), I(xn, q({ ...r, ...h(n) }, {
      "trap-focus": !1,
      "disable-outside-pointer-events": !1,
      onCloseAutoFocus: u[0] || (u[0] = (c) => {
        var d;
        c.defaultPrevented || (a.value || (d = h(o).triggerElement.value) == null || d.focus(), c.preventDefault()), a.value = !1, i.value = !1;
      }),
      onInteractOutside: u[1] || (u[1] = (c) => {
        var d;
        c.defaultPrevented || (a.value = !0, c.detail.originalEvent.type === "pointerdown" && (i.value = !0));
        const p = c.target;
        (d = h(o).triggerElement.value) != null && d.contains(p) && c.preventDefault(), c.detail.originalEvent.type === "focusin" && i.value && c.preventDefault();
      })
    }), {
      default: O(() => [
        F(l.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), Sn = /* @__PURE__ */ T({
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
    const r = t, n = e, o = ae(), a = Xt(n), { forwardRef: i } = K();
    return (l, u) => (E(), I(h(gn), {
      present: l.forceMount || h(o).open.value
    }, {
      default: O(() => [
        h(o).modal.value ? (E(), I(Fl, q({
          key: 0,
          ref: h(i)
        }, { ...r, ...h(a), ...l.$attrs }), {
          default: O(() => [
            F(l.$slots, "default")
          ]),
          _: 3
        }, 16)) : (E(), I(Nl, q({
          key: 1,
          ref: h(i)
        }, { ...r, ...h(a), ...l.$attrs }), {
          default: O(() => [
            F(l.$slots, "default")
          ]),
          _: 3
        }, 16))
      ]),
      _: 3
    }, 8, ["present"]));
  }
}), Tl = /* @__PURE__ */ T({
  __name: "DialogOverlayImpl",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(t) {
    const e = ae();
    return rl(!0), K(), (r, n) => (E(), I(h(Ie), {
      as: r.as,
      "as-child": r.asChild,
      "data-state": h(e).open.value ? "open" : "closed",
      style: { "pointer-events": "auto" }
    }, {
      default: O(() => [
        F(r.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child", "data-state"]));
  }
}), Bl = /* @__PURE__ */ T({
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
      return (a = h(e)) != null && a.modal.value ? (E(), I(h(gn), {
        key: 0,
        present: n.forceMount || h(e).open.value
      }, {
        default: O(() => [
          _(Tl, q(n.$attrs, {
            ref: h(r),
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
}), Rl = /* @__PURE__ */ T({
  __name: "DialogClose",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(t) {
    const e = t;
    K();
    const r = ae();
    return (n, o) => (E(), I(h(Ie), q(e, {
      type: n.as === "button" ? "button" : void 0,
      onClick: o[0] || (o[0] = (a) => h(r).onOpenChange(!1))
    }), {
      default: O(() => [
        F(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["type"]));
  }
}), En = /* @__PURE__ */ T({
  __name: "DialogTitle",
  props: {
    asChild: { type: Boolean },
    as: { default: "h2" }
  },
  setup(t) {
    const e = t, r = ae();
    return K(), (n, o) => (E(), I(h(Ie), q(e, {
      id: h(r).titleId
    }), {
      default: O(() => [
        F(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["id"]));
  }
}), On = /* @__PURE__ */ T({
  __name: "VisuallyHidden",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(t) {
    return K(), (e, r) => (E(), I(h(Ie), {
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
}), [Pn, es] = Ht("CollectionProvider");
T({
  name: "CollectionSlot",
  setup(t, { slots: e }) {
    const r = Pn(), { primitiveElement: n, currentElement: o } = hn();
    return U(o, () => {
      r.collectionRef.value = o.value;
    }), () => re(Yt, { ref: n }, e);
  }
});
T({
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
        const l = Dr(a.value);
        n.itemMap.value.set(l, { ref: a.value, value: t.value }), i(() => n.itemMap.value.delete(l));
      }
    }), () => re(Yt, { ...r, [n.attrName]: "", ref: o }, e);
  }
});
function _l() {
  if (typeof matchMedia == "function")
    return matchMedia("(pointer:coarse)").matches ? "coarse" : "fine";
}
_l();
const An = {
  __name: "CloseButton",
  setup(t) {
    return (e, r) => (E(), I(h(Rl), { class: "im-close-button text-gray-400 hover:text-gray-500" }, {
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
}, kl = { class: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4" }, Ll = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, Wl = {
  __name: "ModalContent",
  props: {
    modalContext: Object,
    modalProps: Object
  },
  setup(t) {
    return (e, r) => (E(), ce("div", kl, [
      ne("div", {
        class: we(["im-modal-positioner flex min-h-full justify-center", {
          "items-start": t.modalProps.position === "top",
          "items-center": t.modalProps.position === "center",
          "items-end": t.modalProps.position === "bottom"
        }])
      }, [
        _(_t, {
          appear: "",
          "enter-from-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          "enter-to-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-from-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-to-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          onAfterLeave: t.modalContext.afterLeave
        }, {
          default: O(() => {
            var n;
            return [
              _(h(Sn), {
                "aria-describedby": void 0,
                "trap-focus": (n = t.modalProps) == null ? void 0 : n.closeExplicitly,
                class: we({
                  "im-modal-wrapper w-full transition duration-300 ease-in-out": !0,
                  "blur-sm": !t.modalContext.onTopOfStack,
                  "sm:max-w-sm": t.modalProps.maxWidth == "sm",
                  "sm:max-w-md": t.modalProps.maxWidth == "md",
                  "sm:max-w-md md:max-w-lg": t.modalProps.maxWidth == "lg",
                  "sm:max-w-md md:max-w-xl": t.modalProps.maxWidth == "xl",
                  "sm:max-w-md md:max-w-xl lg:max-w-2xl": t.modalProps.maxWidth == "2xl",
                  "sm:max-w-md md:max-w-xl lg:max-w-3xl": t.modalProps.maxWidth == "3xl",
                  "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl": t.modalProps.maxWidth == "4xl",
                  "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl": t.modalProps.maxWidth == "5xl",
                  "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl": t.modalProps.maxWidth == "6xl",
                  "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl": t.modalProps.maxWidth == "7xl"
                })
              }, {
                default: O(() => [
                  _(h(On), { "as-child": "" }, {
                    default: O(() => [
                      _(h(En))
                    ]),
                    _: 1
                  }),
                  ne("div", {
                    class: we(["im-modal-content relative", [t.modalProps.paddingClasses, t.modalProps.panelClasses]])
                  }, [
                    t.modalProps.closeButton ? (E(), ce("div", Ll, [
                      _(An)
                    ])) : H("", !0),
                    F(e.$slots, "default", {
                      modalContext: t.modalContext,
                      modalProps: t.modalProps
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
}, Ul = { class: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden" }, jl = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, ql = {
  __name: "SlideoverContent",
  props: {
    modalContext: Object,
    modalProps: Object
  },
  setup(t) {
    return (e, r) => (E(), ce("div", Ul, [
      ne("div", {
        class: we(["im-slideover-positioner flex min-h-full items-center", {
          "justify-start": t.modalProps.position === "left",
          "justify-end": t.modalProps.position === "right"
        }])
      }, [
        _(_t, {
          appear: "",
          "enter-from-class": "opacity-0 " + (t.modalProps.position === "left" ? "-translate-x-full" : "translate-x-full"),
          "enter-to-class": "opacity-100 translate-x-0",
          "leave-from-class": "opacity-100 translate-x-0",
          "leave-to-class": "opacity-0 " + (t.modalProps.position === "left" ? "-translate-x-full" : "translate-x-full"),
          onAfterLeave: t.modalContext.afterLeave
        }, {
          default: O(() => {
            var n;
            return [
              _(h(Sn), {
                "aria-describedby": void 0,
                "trap-focus": (n = t.modalProps) == null ? void 0 : n.closeExplicitly,
                class: we({
                  "im-slideover-wrapper w-full transition duration-300 ease-in-out": !0,
                  "blur-sm": !t.modalContext.onTopOfStack,
                  "sm:max-w-sm": t.modalProps.maxWidth == "sm",
                  "sm:max-w-md": t.modalProps.maxWidth == "md",
                  "sm:max-w-md md:max-w-lg": t.modalProps.maxWidth == "lg",
                  "sm:max-w-md md:max-w-xl": t.modalProps.maxWidth == "xl",
                  "sm:max-w-md md:max-w-xl lg:max-w-2xl": t.modalProps.maxWidth == "2xl",
                  "sm:max-w-md md:max-w-xl lg:max-w-3xl": t.modalProps.maxWidth == "3xl",
                  "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl": t.modalProps.maxWidth == "4xl",
                  "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl": t.modalProps.maxWidth == "5xl",
                  "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl": t.modalProps.maxWidth == "6xl",
                  "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl": t.modalProps.maxWidth == "7xl"
                })
              }, {
                default: O(() => [
                  _(h(On), { "as-child": "" }, {
                    default: O(() => [
                      _(h(En))
                    ]),
                    _: 1
                  }),
                  ne("div", {
                    class: we(["im-slideover-content relative", [t.modalProps.paddingClasses, t.modalProps.panelClasses]])
                  }, [
                    t.modalProps.closeButton ? (E(), ce("div", jl, [
                      _(An)
                    ])) : H("", !0),
                    F(e.$slots, "default", {
                      modalContext: t.modalContext,
                      modalProps: t.modalProps
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
}, Kl = ["data-inertiaui-modal-id", "data-inertiaui-modal-index"], zl = {
  key: 1,
  class: "im-backdrop fixed inset-0 z-30 bg-black/75"
}, ts = {
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
      modalProps: $(() => {
        var o;
        return (o = r.value) == null ? void 0 : o.modalProps;
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
    }), (o, a) => (E(), I(Ri, {
      ref_key: "modal",
      ref: r
    }, {
      default: O(({
        afterLeave: i,
        close: l,
        emit: u,
        getChildModal: c,
        getParentModal: d,
        id: p,
        index: f,
        isOpen: m,
        modalContext: s,
        modalProps: y,
        onTopOfStack: v,
        reload: b,
        setOpen: P,
        shouldRender: g
      }) => [
        _(h(dl), {
          open: m,
          "onUpdate:open": P
        }, {
          default: O(() => [
            _(h(yl), null, {
              default: O(() => [
                ne("div", {
                  "data-inertiaui-modal-id": p,
                  "data-inertiaui-modal-index": f,
                  class: "im-dialog relative z-20"
                }, [
                  f === 0 && v ? (E(), I(_t, {
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
                      _(h(Bl), { class: "im-backdrop fixed inset-0 z-30 bg-black/75" })
                    ]),
                    _: 1
                  }, 8, ["appear"])) : H("", !0),
                  f > 0 && v ? (E(), ce("div", zl)) : H("", !0),
                  (E(), I(_r(y != null && y.slideover ? ql : Wl), {
                    "modal-context": s,
                    "modal-props": y
                  }, {
                    default: O(() => [
                      F(o.$slots, "default", {
                        id: p,
                        afterLeave: i,
                        close: l,
                        emit: u,
                        getChildModal: c,
                        getParentModal: d,
                        index: f,
                        modalContext: s,
                        modalProps: y,
                        onTopOfStack: v,
                        isOpen: m,
                        shouldRender: g,
                        reload: b,
                        setOpen: P
                      })
                    ]),
                    _: 2
                  }, 1032, ["modal-context", "modal-props"]))
                ], 8, Kl)
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
}, rs = {
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
    const r = t, n = S(!1), o = Le(), a = S(null);
    Bt("modalContext", a);
    const i = e, l = S(!1), u = $(() => r.navigate ?? Lr("navigate"));
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
    Ye(() => {
      var y;
      return (y = c.value) == null ? void 0 : y.call(c);
    });
    const d = Nr();
    function p() {
      c.value = a.value.registerEventListenersFromAttrs(d);
    }
    U(a, (y, v) => {
      y && !v && (p(), i("success"));
    });
    function f() {
      i("close");
    }
    function m() {
      a.value = null, i("after-leave");
    }
    function s() {
      n.value || (r.href.startsWith("#") || (n.value = !0, i("start")), o.visit(
        r.href,
        r.method,
        r.data,
        r.headers,
        zn(Wr(r, Bi)),
        f,
        m,
        r.queryStringArrayFormat,
        u.value
      ).then((y) => {
        a.value = y;
      }).catch((y) => i("error", y)).finally(() => n.value = !1));
    }
    return (y, v) => (E(), I(_r(t.as), q(h(d), {
      href: t.href,
      onClick: jn(s, ["prevent"])
    }), {
      default: O(() => [
        F(y.$slots, "default", { loading: n.value })
      ]),
      _: 3
    }, 16, ["href"]));
  }
};
function ns(t, e = {}) {
  return Le().visit(
    t,
    e.method ?? "get",
    e.data ?? {},
    e.headers ?? {},
    e.config ?? {},
    e.onClose,
    e.onAfterLeave,
    e.queryStringArrayFormat ?? "brackets"
  );
}
export {
  Ri as HeadlessModal,
  ts as Modal,
  rs as ModalLink,
  Mi as ModalRoot,
  Lr as getConfig,
  Xl as putConfig,
  Yl as renderApp,
  Jl as resetConfig,
  ns as visitModal
};
