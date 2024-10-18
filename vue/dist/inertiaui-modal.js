var In = Object.defineProperty;
var $n = (t, e, r) => e in t ? In(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var W = (t, e, r) => $n(t, typeof e != "symbol" ? e + "" : e, r);
import * as tr from "vue";
import { defineComponent as R, Comment as Mn, mergeProps as H, cloneVNode as Dn, h as ge, toRefs as Tr, ref as S, getCurrentInstance as Re, renderSlot as B, unref as h, reactive as Br, openBlock as O, createBlock as F, withCtx as $, createVNode as z, createCommentVNode as te, watch as L, watchEffect as se, markRaw as Rr, effectScope as kr, nextTick as ce, computed as N, Fragment as Tt, toHandlerKey as Fn, camelize as Nn, onUnmounted as Me, inject as Wr, provide as Bt, onMounted as ot, onBeforeUnmount as Xe, normalizeStyle as Tn, getCurrentScope as Bn, onScopeDispose as Rn, readonly as kn, createElementBlock as ue, createElementVNode as V, normalizeClass as be, Transition as Rt, withDirectives as kt, vShow as Wt, resolveComponent as Wn, useAttrs as _r, resolveDynamicComponent as Lr, withModifiers as _n, onBeforeMount as Ln } from "vue";
import { router as De, usePage as Ur } from "@inertiajs/vue3";
import Ye from "axios";
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
class Un {
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
    let a = this.config;
    for (let o = 0; o < n.length - 1; o++)
      a = a[n[o]] = a[n[o]] || {};
    a[n[n.length - 1]] = r;
  }
  get(e) {
    if (typeof e > "u")
      return this.config;
    const r = e.split(".");
    let n = this.config;
    for (const a of r) {
      if (n[a] === void 0)
        return null;
      n = n[a];
    }
    return n;
  }
}
const at = new Un(), Kl = () => at.reset(), zl = (t, e) => at.put(t, e), jr = (t) => at.get(t), pe = (t, e) => at.get(t ? `slideover.${e}` : `modal.${e}`);
function _t(t, e) {
  const r = typeof t == "string" && !e ? `${t}Context` : e, n = Symbol(r);
  return [(a) => {
    const o = Wr(n, a);
    if (o || o === null)
      return o;
    throw new Error(
      `Injection \`${n.toString()}\` not found. Component must be used within ${Array.isArray(t) ? `one of the following components: ${t.join(
        ", "
      )}` : `\`${t}\``}`
    );
  }, (a) => (Bt(n, a), a)];
}
function qr(t, e, r) {
  const n = r.originalEvent.target, a = new CustomEvent(t, {
    bubbles: !1,
    cancelable: !0,
    detail: r
  });
  e && n.addEventListener(t, e, { once: !0 }), n.dispatchEvent(a);
}
function Kr(t) {
  return Bn() ? (Rn(t), !0) : !1;
}
function jn(t) {
  let e = !1, r;
  const n = kr(!0);
  return (...a) => (e || (r = n.run(() => t(...a)), e = !0), r);
}
function qn(t) {
  let e = 0, r, n;
  const a = () => {
    e -= 1, n && e <= 0 && (n.stop(), r = void 0, n = void 0);
  };
  return (...o) => (e += 1, r || (n = kr(!0), r = n.run(() => t(...o))), Kr(a), r);
}
function Lt(t) {
  return typeof t == "function" ? t() : h(t);
}
const fe = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Kn = (t) => typeof t < "u", zn = Object.prototype.toString, Gn = (t) => zn.call(t) === "[object Object]", Vn = () => {
}, rr = /* @__PURE__ */ Hn();
function Hn() {
  var t, e;
  return fe && ((t = window == null ? void 0 : window.navigator) == null ? void 0 : t.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((e = window == null ? void 0 : window.navigator) == null ? void 0 : e.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function Qn(t) {
  return Re();
}
function Jn(t, e) {
  Qn() && Xe(t, e);
}
function ke(t) {
  var e;
  const r = Lt(t);
  return (e = r == null ? void 0 : r.$el) != null ? e : r;
}
const zr = fe ? window : void 0;
function Gr(...t) {
  let e, r, n, a;
  if (typeof t[0] == "string" || Array.isArray(t[0]) ? ([r, n, a] = t, e = zr) : [e, r, n, a] = t, !e)
    return Vn;
  Array.isArray(r) || (r = [r]), Array.isArray(n) || (n = [n]);
  const o = [], i = () => {
    o.forEach((d) => d()), o.length = 0;
  }, s = (d, p, f, m) => (d.addEventListener(p, f, m), () => d.removeEventListener(p, f, m)), l = L(
    () => [ke(e), Lt(a)],
    ([d, p]) => {
      if (i(), !d)
        return;
      const f = Gn(p) ? { ...p } : p;
      o.push(
        ...r.flatMap((m) => n.map((u) => s(d, m, u, f)))
      );
    },
    { immediate: !0, flush: "post" }
  ), c = () => {
    l(), i();
  };
  return Kr(c), c;
}
function Xn(t) {
  return typeof t == "function" ? t : typeof t == "string" ? (e) => e.key === t : Array.isArray(t) ? (e) => t.includes(e.key) : () => !0;
}
function Yn(...t) {
  let e, r, n = {};
  t.length === 3 ? (e = t[0], r = t[1], n = t[2]) : t.length === 2 ? typeof t[1] == "object" ? (e = !0, r = t[0], n = t[1]) : (e = t[0], r = t[1]) : (e = !0, r = t[0]);
  const {
    target: a = zr,
    eventName: o = "keydown",
    passive: i = !1,
    dedupe: s = !1
  } = n, l = Xn(e);
  return Gr(a, o, (c) => {
    c.repeat && Lt(s) || l(c) && r(c);
  }, i);
}
function Zn(t) {
  return JSON.parse(JSON.stringify(t));
}
function eo(t, e, r, n = {}) {
  var a, o, i;
  const {
    clone: s = !1,
    passive: l = !1,
    eventName: c,
    deep: d = !1,
    defaultValue: p,
    shouldEmit: f
  } = n, m = Re(), u = r || (m == null ? void 0 : m.emit) || ((a = m == null ? void 0 : m.$emit) == null ? void 0 : a.bind(m)) || ((i = (o = m == null ? void 0 : m.proxy) == null ? void 0 : o.$emit) == null ? void 0 : i.bind(m == null ? void 0 : m.proxy));
  let y = c;
  y = y || `update:${e.toString()}`;
  const v = (g) => s ? typeof s == "function" ? s(g) : Zn(g) : g, b = () => Kn(t[e]) ? v(t[e]) : p, P = (g) => {
    f ? f(g) && u(y, g) : u(y, g);
  };
  if (l) {
    const g = b(), x = S(g);
    let E = !1;
    return L(
      () => t[e],
      (I) => {
        E || (E = !0, x.value = v(I), ce(() => E = !1));
      }
    ), L(
      x,
      (I) => {
        !E && (I !== t[e] || d) && P(I);
      },
      { deep: d }
    ), x;
  } else
    return N({
      get() {
        return b();
      },
      set(g) {
        P(g);
      }
    });
}
function Ut(t) {
  return t ? t.flatMap((e) => e.type === Tt ? Ut(e.children) : [e]) : [];
}
function st(t) {
  if (t === null || typeof t != "object")
    return !1;
  const e = Object.getPrototypeOf(t);
  return e !== null && e !== Object.prototype && Object.getPrototypeOf(e) !== null || Symbol.iterator in t ? !1 : Symbol.toStringTag in t ? Object.prototype.toString.call(t) === "[object Module]" : !0;
}
function Ot(t, e, r = ".", n) {
  if (!st(e))
    return Ot(t, {}, r);
  const a = Object.assign({}, e);
  for (const o in t) {
    if (o === "__proto__" || o === "constructor")
      continue;
    const i = t[o];
    i != null && (Array.isArray(i) && Array.isArray(a[o]) ? a[o] = [...i, ...a[o]] : st(i) && st(a[o]) ? a[o] = Ot(
      i,
      a[o],
      (r ? `${r}.` : "") + o.toString()
    ) : a[o] = i);
  }
  return a;
}
function to(t) {
  return (...e) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    e.reduce((r, n) => Ot(r, n, ""), {})
  );
}
const ro = to(), [Vr, Gl] = _t("ConfigProvider");
let no = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", oo = (t = 21) => {
  let e = "", r = t;
  for (; r--; )
    e += no[Math.random() * 64 | 0];
  return e;
};
const ao = qn(() => {
  const t = S(/* @__PURE__ */ new Map()), e = S(), r = N(() => {
    for (const i of t.value.values())
      if (i)
        return !0;
    return !1;
  }), n = Vr({
    scrollBody: S(!0)
  });
  let a = null;
  const o = () => {
    document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.body.style.removeProperty("--scrollbar-width"), document.body.style.overflow = e.value ?? "", rr && (a == null || a()), e.value = void 0;
  };
  return L(r, (i, s) => {
    var l;
    if (!fe)
      return;
    if (!i) {
      s && o();
      return;
    }
    e.value === void 0 && (e.value = document.body.style.overflow);
    const c = window.innerWidth - document.documentElement.clientWidth, d = { padding: c, margin: 0 }, p = (l = n.scrollBody) != null && l.value ? typeof n.scrollBody.value == "object" ? ro({
      padding: n.scrollBody.value.padding === !0 ? c : n.scrollBody.value.padding,
      margin: n.scrollBody.value.margin === !0 ? c : n.scrollBody.value.margin
    }, d) : d : { padding: 0, margin: 0 };
    c > 0 && (document.body.style.paddingRight = typeof p.padding == "number" ? `${p.padding}px` : String(p.padding), document.body.style.marginRight = typeof p.margin == "number" ? `${p.margin}px` : String(p.margin), document.body.style.setProperty("--scrollbar-width", `${c}px`), document.body.style.overflow = "hidden"), rr && (a = Gr(
      document,
      "touchmove",
      (f) => {
        var m;
        f.target === document.documentElement && (f.touches.length > 1 || (m = f.preventDefault) == null || m.call(f));
      },
      { passive: !1 }
    )), ce(() => {
      document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden";
    });
  }, { immediate: !0, flush: "sync" }), t;
});
function io(t) {
  const e = oo(6), r = ao();
  r.value.set(e, t);
  const n = N({
    get: () => r.value.get(e) ?? !1,
    set: (a) => r.value.set(e, a)
  });
  return Jn(() => {
    r.value.delete(e);
  }), n;
}
function jt(t) {
  const e = Re(), r = e == null ? void 0 : e.type.emits, n = {};
  return r != null && r.length || console.warn(
    `No emitted event found. Please check component: ${e == null ? void 0 : e.type.__name}`
  ), r == null || r.forEach((a) => {
    n[Fn(Nn(a))] = (...o) => t(a, ...o);
  }), n;
}
function re() {
  const t = Re(), e = S(), r = N(() => {
    var i, s;
    return ["#text", "#comment"].includes((i = e.value) == null ? void 0 : i.$el.nodeName) ? (s = e.value) == null ? void 0 : s.$el.nextElementSibling : ke(e);
  }), n = Object.assign({}, t.exposed), a = {};
  for (const i in t.props)
    Object.defineProperty(a, i, {
      enumerable: !0,
      configurable: !0,
      get: () => t.props[i]
    });
  if (Object.keys(n).length > 0)
    for (const i in n)
      Object.defineProperty(a, i, {
        enumerable: !0,
        configurable: !0,
        get: () => n[i]
      });
  Object.defineProperty(a, "$el", {
    enumerable: !0,
    configurable: !0,
    get: () => t.vnode.el
  }), t.exposed = a;
  function o(i) {
    e.value = i, !(i instanceof Element || !i) && (Object.defineProperty(a, "$el", {
      enumerable: !0,
      configurable: !0,
      get: () => i.$el
    }), t.exposed = a);
  }
  return { forwardRef: o, currentRef: e, currentElement: r };
}
var lo = function(t) {
  if (typeof document > "u")
    return null;
  var e = Array.isArray(t) ? t[0] : t;
  return e.ownerDocument.body;
}, ye = /* @__PURE__ */ new WeakMap(), qe = /* @__PURE__ */ new WeakMap(), Ke = {}, ut = 0, Hr = function(t) {
  return t && (t.host || Hr(t.parentNode));
}, so = function(t, e) {
  return e.map(function(r) {
    if (t.contains(r))
      return r;
    var n = Hr(r);
    return n && t.contains(n) ? n : (console.error("aria-hidden", r, "in not contained inside", t, ". Doing nothing"), null);
  }).filter(function(r) {
    return !!r;
  });
}, uo = function(t, e, r, n) {
  var a = so(e, Array.isArray(t) ? t : [t]);
  Ke[r] || (Ke[r] = /* @__PURE__ */ new WeakMap());
  var o = Ke[r], i = [], s = /* @__PURE__ */ new Set(), l = new Set(a), c = function(p) {
    !p || s.has(p) || (s.add(p), c(p.parentNode));
  };
  a.forEach(c);
  var d = function(p) {
    !p || l.has(p) || Array.prototype.forEach.call(p.children, function(f) {
      if (s.has(f))
        d(f);
      else
        try {
          var m = f.getAttribute(n), u = m !== null && m !== "false", y = (ye.get(f) || 0) + 1, v = (o.get(f) || 0) + 1;
          ye.set(f, y), o.set(f, v), i.push(f), y === 1 && u && qe.set(f, !0), v === 1 && f.setAttribute(r, "true"), u || f.setAttribute(n, "true");
        } catch (b) {
          console.error("aria-hidden: cannot operate on ", f, b);
        }
    });
  };
  return d(e), s.clear(), ut++, function() {
    i.forEach(function(p) {
      var f = ye.get(p) - 1, m = o.get(p) - 1;
      ye.set(p, f), o.set(p, m), f || (qe.has(p) || p.removeAttribute(n), qe.delete(p)), m || p.removeAttribute(r);
    }), ut--, ut || (ye = /* @__PURE__ */ new WeakMap(), ye = /* @__PURE__ */ new WeakMap(), qe = /* @__PURE__ */ new WeakMap(), Ke = {});
  };
}, co = function(t, e, r) {
  r === void 0 && (r = "data-aria-hidden");
  var n = Array.from(Array.isArray(t) ? t : [t]), a = lo(t);
  return a ? (n.push.apply(n, Array.from(a.querySelectorAll("[aria-live]"))), uo(n, a, r, "aria-hidden")) : function() {
    return null;
  };
};
function fo(t) {
  let e;
  L(() => ke(t), (r) => {
    r ? e = co(r) : e && e();
  }), Me(() => {
    e && e();
  });
}
let po = 0;
function nr(t, e = "radix") {
  const r = Vr({ useId: void 0 });
  return tr.useId ? `${e}-${tr.useId()}` : r.useId ? `${e}-${r.useId()}` : `${e}-${++po}`;
}
function yo(t, e) {
  const r = S(t);
  function n(a) {
    return e[r.value][a] ?? r.value;
  }
  return {
    state: r,
    dispatch: (a) => {
      r.value = n(a);
    }
  };
}
const qt = R({
  name: "PrimitiveSlot",
  inheritAttrs: !1,
  setup(t, { attrs: e, slots: r }) {
    return () => {
      var n, a;
      if (!r.default)
        return null;
      const o = Ut(r.default()), i = o.findIndex((d) => d.type !== Mn);
      if (i === -1)
        return o;
      const s = o[i];
      (n = s.props) == null || delete n.ref;
      const l = s.props ? H(e, s.props) : e;
      e.class && (a = s.props) != null && a.class && delete s.props.class;
      const c = Dn(s, l);
      for (const d in l)
        d.startsWith("on") && (c.props || (c.props = {}), c.props[d] = l[d]);
      return o.length === 1 ? c : (o[i] = c, o);
    };
  }
}), Kt = R({
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
    return typeof n == "string" && ["area", "img", "input"].includes(n) ? () => ge(n, e) : n !== "template" ? () => ge(t.as, e, { default: r.default }) : () => ge(qt, e, { default: r.default });
  }
});
function Qr() {
  const t = S(), e = N(() => {
    var r, n;
    return ["#text", "#comment"].includes((r = t.value) == null ? void 0 : r.$el.nodeName) ? (n = t.value) == null ? void 0 : n.$el.nextElementSibling : ke(t);
  });
  return {
    primitiveElement: t,
    currentElement: e
  };
}
function mo(t, e) {
  const r = S({}), n = S("none"), a = t.value ? "mounted" : "unmounted", { state: o, dispatch: i } = yo(a, {
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
  }), s = (f) => {
    var m;
    if (fe) {
      const u = new CustomEvent(f, { bubbles: !1, cancelable: !1 });
      (m = e.value) == null || m.dispatchEvent(u);
    }
  };
  L(
    t,
    async (f, m) => {
      var u;
      const y = m !== f;
      if (await ce(), y) {
        const v = n.value, b = ze(e.value);
        f ? (i("MOUNT"), s("enter"), b === "none" && s("after-enter")) : b === "none" || ((u = r.value) == null ? void 0 : u.display) === "none" ? (i("UNMOUNT"), s("leave"), s("after-leave")) : m && v !== b ? (i("ANIMATION_OUT"), s("leave")) : (i("UNMOUNT"), s("after-leave"));
      }
    },
    { immediate: !0 }
  );
  const l = (f) => {
    const m = ze(e.value), u = m.includes(
      f.animationName
    ), y = o.value === "mounted" ? "enter" : "leave";
    f.target === e.value && u && (s(`after-${y}`), i("ANIMATION_END")), f.target === e.value && m === "none" && i("ANIMATION_END");
  }, c = (f) => {
    f.target === e.value && (n.value = ze(e.value));
  }, d = L(
    e,
    (f, m) => {
      f ? (r.value = getComputedStyle(f), f.addEventListener("animationstart", c), f.addEventListener("animationcancel", l), f.addEventListener("animationend", l)) : (i("ANIMATION_END"), m == null || m.removeEventListener("animationstart", c), m == null || m.removeEventListener("animationcancel", l), m == null || m.removeEventListener("animationend", l));
    },
    { immediate: !0 }
  ), p = L(o, () => {
    const f = ze(e.value);
    n.value = o.value === "mounted" ? f : "none";
  });
  return Me(() => {
    d(), p();
  }), {
    isPresent: N(
      () => ["mounted", "unmountSuspended"].includes(o.value)
    )
  };
}
function ze(t) {
  return t && getComputedStyle(t).animationName || "none";
}
const Jr = R({
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
    const { present: a, forceMount: o } = Tr(t), i = S(), { isPresent: s } = mo(a, i);
    r({ present: s });
    let l = e.default({ present: s });
    l = Ut(l || []);
    const c = Re();
    if (l && (l == null ? void 0 : l.length) > 1) {
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
    return () => o.value || a.value || s.value ? ge(e.default({ present: s })[0], {
      ref: (d) => {
        const p = ke(d);
        return typeof (p == null ? void 0 : p.hasAttribute) > "u" || (p != null && p.hasAttribute("data-radix-popper-content-wrapper") ? i.value = p.firstElementChild : i.value = p), p;
      }
    }) : null;
  }
}), [Pe, vo] = _t("DialogRoot"), ho = /* @__PURE__ */ R({
  inheritAttrs: !1,
  __name: "DialogRoot",
  props: {
    open: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: !1 },
    modal: { type: Boolean, default: !0 }
  },
  emits: ["update:open"],
  setup(t, { emit: e }) {
    const r = t, n = eo(r, "open", e, {
      defaultValue: r.defaultOpen,
      passive: r.open === void 0
    }), a = S(), o = S(), { modal: i } = Tr(r);
    return vo({
      open: n,
      modal: i,
      openModal: () => {
        n.value = !0;
      },
      onOpenChange: (s) => {
        n.value = s;
      },
      onOpenToggle: () => {
        n.value = !n.value;
      },
      contentId: "",
      titleId: "",
      descriptionId: "",
      triggerElement: a,
      contentElement: o
    }), (s, l) => B(s.$slots, "default", { open: h(n) });
  }
}), go = "dismissableLayer.pointerDownOutside", bo = "dismissableLayer.focusOutside";
function Xr(t, e) {
  const r = e.closest(
    "[data-dismissable-layer]"
  ), n = t.dataset.dismissableLayer === "" ? t : t.querySelector(
    "[data-dismissable-layer]"
  ), a = Array.from(
    t.ownerDocument.querySelectorAll("[data-dismissable-layer]")
  );
  return !!(r && n === r || a.indexOf(n) < a.indexOf(r));
}
function wo(t, e) {
  var r;
  const n = ((r = e == null ? void 0 : e.value) == null ? void 0 : r.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), a = S(!1), o = S(() => {
  });
  return se((i) => {
    if (!fe)
      return;
    const s = async (c) => {
      const d = c.target;
      if (e != null && e.value) {
        if (Xr(e.value, d)) {
          a.value = !1;
          return;
        }
        if (c.target && !a.value) {
          let p = function() {
            qr(
              go,
              t,
              f
            );
          };
          const f = { originalEvent: c };
          c.pointerType === "touch" ? (n.removeEventListener("click", o.value), o.value = p, n.addEventListener("click", o.value, {
            once: !0
          })) : p();
        } else
          n.removeEventListener("click", o.value);
        a.value = !1;
      }
    }, l = window.setTimeout(() => {
      n.addEventListener("pointerdown", s);
    }, 0);
    i(() => {
      window.clearTimeout(l), n.removeEventListener("pointerdown", s), n.removeEventListener("click", o.value);
    });
  }), {
    onPointerDownCapture: () => a.value = !0
  };
}
function xo(t, e) {
  var r;
  const n = ((r = e == null ? void 0 : e.value) == null ? void 0 : r.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), a = S(!1);
  return se((o) => {
    if (!fe)
      return;
    const i = async (s) => {
      e != null && e.value && (await ce(), !(!e.value || Xr(e.value, s.target)) && s.target && !a.value && qr(
        bo,
        t,
        { originalEvent: s }
      ));
    };
    n.addEventListener("focusin", i), o(() => n.removeEventListener("focusin", i));
  }), {
    onFocusCapture: () => a.value = !0,
    onBlurCapture: () => a.value = !1
  };
}
const G = Br({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), So = /* @__PURE__ */ R({
  __name: "DismissableLayer",
  props: {
    disableOutsidePointerEvents: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "dismiss"],
  setup(t, { emit: e }) {
    const r = t, n = e, { forwardRef: a, currentElement: o } = re(), i = N(
      () => {
        var u;
        return ((u = o.value) == null ? void 0 : u.ownerDocument) ?? globalThis.document;
      }
    ), s = N(() => G.layersRoot), l = N(() => o.value ? Array.from(s.value).indexOf(o.value) : -1), c = N(() => G.layersWithOutsidePointerEventsDisabled.size > 0), d = N(() => {
      const u = Array.from(s.value), [y] = [...G.layersWithOutsidePointerEventsDisabled].slice(-1), v = u.indexOf(y);
      return l.value >= v;
    }), p = wo(async (u) => {
      const y = [...G.branches].some(
        (v) => v == null ? void 0 : v.contains(u.target)
      );
      !d.value || y || (n("pointerDownOutside", u), n("interactOutside", u), await ce(), u.defaultPrevented || n("dismiss"));
    }, o), f = xo((u) => {
      [...G.branches].some(
        (y) => y == null ? void 0 : y.contains(u.target)
      ) || (n("focusOutside", u), n("interactOutside", u), u.defaultPrevented || n("dismiss"));
    }, o);
    Yn("Escape", (u) => {
      l.value === s.value.size - 1 && (n("escapeKeyDown", u), u.defaultPrevented || n("dismiss"));
    });
    let m;
    return se((u) => {
      o.value && (r.disableOutsidePointerEvents && (G.layersWithOutsidePointerEventsDisabled.size === 0 && (m = i.value.body.style.pointerEvents, i.value.body.style.pointerEvents = "none"), G.layersWithOutsidePointerEventsDisabled.add(o.value)), s.value.add(o.value), u(() => {
        r.disableOutsidePointerEvents && G.layersWithOutsidePointerEventsDisabled.size === 1 && (i.value.body.style.pointerEvents = m);
      }));
    }), se((u) => {
      u(() => {
        o.value && (s.value.delete(o.value), G.layersWithOutsidePointerEventsDisabled.delete(o.value));
      });
    }), (u, y) => (O(), F(h(Kt), {
      ref: h(a),
      "as-child": u.asChild,
      as: u.as,
      "data-dismissable-layer": "",
      style: Tn({
        pointerEvents: c.value ? d.value ? "auto" : "none" : void 0
      }),
      onFocusCapture: h(f).onFocusCapture,
      onBlurCapture: h(f).onBlurCapture,
      onPointerdownCapture: h(p).onPointerDownCapture
    }, {
      default: $(() => [
        B(u.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as", "style", "onFocusCapture", "onBlurCapture", "onPointerdownCapture"]));
  }
}), ct = "focusScope.autoFocusOnMount", ft = "focusScope.autoFocusOnUnmount", or = { bubbles: !1, cancelable: !0 };
function Eo(t, { select: e = !1 } = {}) {
  const r = document.activeElement;
  for (const n of t)
    if (Y(n, { select: e }), document.activeElement !== r)
      return !0;
}
function Oo(t) {
  const e = Yr(t), r = ar(e, t), n = ar(e.reverse(), t);
  return [r, n];
}
function Yr(t) {
  const e = [], r = document.createTreeWalker(t, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (n) => {
      const a = n.tagName === "INPUT" && n.type === "hidden";
      return n.disabled || n.hidden || a ? NodeFilter.FILTER_SKIP : n.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; r.nextNode(); ) e.push(r.currentNode);
  return e;
}
function ar(t, e) {
  for (const r of t)
    if (!Po(r, { upTo: e }))
      return r;
}
function Po(t, { upTo: e }) {
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
function Ao(t) {
  return t instanceof HTMLInputElement && "select" in t;
}
function Y(t, { select: e = !1 } = {}) {
  if (t && t.focus) {
    const r = document.activeElement;
    t.focus({ preventScroll: !0 }), t !== r && Ao(t) && e && t.select();
  }
}
const Co = jn(() => S([]));
function Io() {
  const t = Co();
  return {
    add(e) {
      const r = t.value[0];
      e !== r && (r == null || r.pause()), t.value = ir(t.value, e), t.value.unshift(e);
    },
    remove(e) {
      var r;
      t.value = ir(t.value, e), (r = t.value[0]) == null || r.resume();
    }
  };
}
function ir(t, e) {
  const r = [...t], n = r.indexOf(e);
  return n !== -1 && r.splice(n, 1), r;
}
function $o(t) {
  return t.filter((e) => e.tagName !== "A");
}
const Mo = /* @__PURE__ */ R({
  __name: "FocusScope",
  props: {
    loop: { type: Boolean, default: !1 },
    trapped: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["mountAutoFocus", "unmountAutoFocus"],
  setup(t, { emit: e }) {
    const r = t, n = e, { currentRef: a, currentElement: o } = re(), i = S(null), s = Io(), l = Br({
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    });
    se((d) => {
      if (!fe)
        return;
      const p = o.value;
      if (!r.trapped)
        return;
      function f(v) {
        if (l.paused || !p)
          return;
        const b = v.target;
        p.contains(b) ? i.value = b : Y(i.value, { select: !0 });
      }
      function m(v) {
        if (l.paused || !p)
          return;
        const b = v.relatedTarget;
        b !== null && (p.contains(b) || Y(i.value, { select: !0 }));
      }
      function u(v) {
        p.contains(i.value) || Y(p);
      }
      document.addEventListener("focusin", f), document.addEventListener("focusout", m);
      const y = new MutationObserver(u);
      p && y.observe(p, { childList: !0, subtree: !0 }), d(() => {
        document.removeEventListener("focusin", f), document.removeEventListener("focusout", m), y.disconnect();
      });
    }), se(async (d) => {
      const p = o.value;
      if (await ce(), !p)
        return;
      s.add(l);
      const f = document.activeElement;
      if (!p.contains(f)) {
        const m = new CustomEvent(ct, or);
        p.addEventListener(ct, (u) => n("mountAutoFocus", u)), p.dispatchEvent(m), m.defaultPrevented || (Eo($o(Yr(p)), {
          select: !0
        }), document.activeElement === f && Y(p));
      }
      d(() => {
        p.removeEventListener(ct, (y) => n("mountAutoFocus", y));
        const m = new CustomEvent(ft, or), u = (y) => {
          n("unmountAutoFocus", y);
        };
        p.addEventListener(ft, u), p.dispatchEvent(m), setTimeout(() => {
          m.defaultPrevented || Y(f ?? document.body, { select: !0 }), p.removeEventListener(ft, u), s.remove(l);
        }, 0);
      });
    });
    function c(d) {
      if (!r.loop && !r.trapped || l.paused)
        return;
      const p = d.key === "Tab" && !d.altKey && !d.ctrlKey && !d.metaKey, f = document.activeElement;
      if (p && f) {
        const m = d.currentTarget, [u, y] = Oo(m);
        u && y ? !d.shiftKey && f === y ? (d.preventDefault(), r.loop && Y(u, { select: !0 })) : d.shiftKey && f === u && (d.preventDefault(), r.loop && Y(y, { select: !0 })) : f === m && d.preventDefault();
      }
    }
    return (d, p) => (O(), F(h(Kt), {
      ref_key: "currentRef",
      ref: a,
      tabindex: "-1",
      "as-child": d.asChild,
      as: d.as,
      onKeydown: c
    }, {
      default: $(() => [
        B(d.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as"]));
  }
});
function Do(t) {
  return t ? "open" : "closed";
}
const Fo = "DialogTitle", No = "DialogContent";
function To({
  titleName: t = Fo,
  contentName: e = No,
  componentLink: r = "dialog.html#title",
  titleId: n,
  descriptionId: a,
  contentElement: o
}) {
  const i = `Warning: \`${e}\` requires a \`${t}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://www.radix-vue.com/components/${r}`, s = `Warning: Missing \`Description\` or \`aria-describedby="undefined"\` for ${e}.`;
  ot(() => {
    var l;
    document.getElementById(n) || console.warn(i);
    const c = (l = o.value) == null ? void 0 : l.getAttribute("aria-describedby");
    a && c && (document.getElementById(a) || console.warn(s));
  });
}
const Zr = /* @__PURE__ */ R({
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
    const r = t, n = e, a = Pe(), { forwardRef: o, currentElement: i } = re();
    return a.titleId || (a.titleId = nr(void 0, "radix-vue-dialog-title")), a.descriptionId || (a.descriptionId = nr(void 0, "radix-vue-dialog-description")), ot(() => {
      a.contentElement = i, document.activeElement !== document.body && (a.triggerElement.value = document.activeElement);
    }), process.env.NODE_ENV !== "production" && To({
      titleName: "DialogTitle",
      contentName: "DialogContent",
      componentLink: "dialog.html#title",
      titleId: a.titleId,
      descriptionId: a.descriptionId,
      contentElement: i
    }), (s, l) => (O(), F(h(Mo), {
      "as-child": "",
      loop: "",
      trapped: r.trapFocus,
      onMountAutoFocus: l[5] || (l[5] = (c) => n("openAutoFocus", c)),
      onUnmountAutoFocus: l[6] || (l[6] = (c) => n("closeAutoFocus", c))
    }, {
      default: $(() => [
        z(h(So), H({
          id: h(a).contentId,
          ref: h(o),
          as: s.as,
          "as-child": s.asChild,
          "disable-outside-pointer-events": s.disableOutsidePointerEvents,
          role: "dialog",
          "aria-describedby": h(a).descriptionId,
          "aria-labelledby": h(a).titleId,
          "data-state": h(Do)(h(a).open.value)
        }, s.$attrs, {
          onDismiss: l[0] || (l[0] = (c) => h(a).onOpenChange(!1)),
          onEscapeKeyDown: l[1] || (l[1] = (c) => n("escapeKeyDown", c)),
          onFocusOutside: l[2] || (l[2] = (c) => n("focusOutside", c)),
          onInteractOutside: l[3] || (l[3] = (c) => n("interactOutside", c)),
          onPointerDownOutside: l[4] || (l[4] = (c) => n("pointerDownOutside", c))
        }), {
          default: $(() => [
            B(s.$slots, "default")
          ]),
          _: 3
        }, 16, ["id", "as", "as-child", "disable-outside-pointer-events", "aria-describedby", "aria-labelledby", "data-state"])
      ]),
      _: 3
    }, 8, ["trapped"]));
  }
}), Bo = /* @__PURE__ */ R({
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
    const r = t, n = e, a = Pe(), o = jt(n), { forwardRef: i, currentElement: s } = re();
    return fo(s), (l, c) => (O(), F(Zr, H({ ...r, ...h(o) }, {
      ref: h(i),
      "trap-focus": h(a).open.value,
      "disable-outside-pointer-events": !0,
      onCloseAutoFocus: c[0] || (c[0] = (d) => {
        var p;
        d.defaultPrevented || (d.preventDefault(), (p = h(a).triggerElement.value) == null || p.focus());
      }),
      onPointerDownOutside: c[1] || (c[1] = (d) => {
        const p = d.detail.originalEvent, f = p.button === 0 && p.ctrlKey === !0;
        (p.button === 2 || f) && d.preventDefault();
      }),
      onFocusOutside: c[2] || (c[2] = (d) => {
        d.preventDefault();
      })
    }), {
      default: $(() => [
        B(l.$slots, "default")
      ]),
      _: 3
    }, 16, ["trap-focus"]));
  }
}), Ro = /* @__PURE__ */ R({
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
    const r = t, n = jt(e);
    re();
    const a = Pe(), o = S(!1), i = S(!1);
    return (s, l) => (O(), F(Zr, H({ ...r, ...h(n) }, {
      "trap-focus": !1,
      "disable-outside-pointer-events": !1,
      onCloseAutoFocus: l[0] || (l[0] = (c) => {
        var d;
        c.defaultPrevented || (o.value || (d = h(a).triggerElement.value) == null || d.focus(), c.preventDefault()), o.value = !1, i.value = !1;
      }),
      onInteractOutside: l[1] || (l[1] = (c) => {
        var d;
        c.defaultPrevented || (o.value = !0, c.detail.originalEvent.type === "pointerdown" && (i.value = !0));
        const p = c.target;
        (d = h(a).triggerElement.value) != null && d.contains(p) && c.preventDefault(), c.detail.originalEvent.type === "focusin" && i.value && c.preventDefault();
      })
    }), {
      default: $(() => [
        B(s.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), ko = /* @__PURE__ */ R({
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
    const r = t, n = e, a = Pe(), o = jt(n), { forwardRef: i } = re();
    return (s, l) => (O(), F(h(Jr), {
      present: s.forceMount || h(a).open.value
    }, {
      default: $(() => [
        h(a).modal.value ? (O(), F(Bo, H({
          key: 0,
          ref: h(i)
        }, { ...r, ...h(o), ...s.$attrs }), {
          default: $(() => [
            B(s.$slots, "default")
          ]),
          _: 3
        }, 16)) : (O(), F(Ro, H({
          key: 1,
          ref: h(i)
        }, { ...r, ...h(o), ...s.$attrs }), {
          default: $(() => [
            B(s.$slots, "default")
          ]),
          _: 3
        }, 16))
      ]),
      _: 3
    }, 8, ["present"]));
  }
}), Wo = /* @__PURE__ */ R({
  __name: "DialogOverlayImpl",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(t) {
    const e = Pe();
    return io(!0), re(), (r, n) => (O(), F(h(Kt), {
      as: r.as,
      "as-child": r.asChild,
      "data-state": h(e).open.value ? "open" : "closed",
      style: { "pointer-events": "auto" }
    }, {
      default: $(() => [
        B(r.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child", "data-state"]));
  }
}), lr = /* @__PURE__ */ R({
  __name: "DialogOverlay",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(t) {
    const e = Pe(), { forwardRef: r } = re();
    return (n, a) => {
      var o;
      return (o = h(e)) != null && o.modal.value ? (O(), F(h(Jr), {
        key: 0,
        present: n.forceMount || h(e).open.value
      }, {
        default: $(() => [
          z(Wo, H(n.$attrs, {
            ref: h(r),
            as: n.as,
            "as-child": n.asChild
          }), {
            default: $(() => [
              B(n.$slots, "default")
            ]),
            _: 3
          }, 16, ["as", "as-child"])
        ]),
        _: 3
      }, 8, ["present"])) : te("", !0);
    };
  }
}), [en, Vl] = _t("CollectionProvider");
R({
  name: "CollectionSlot",
  setup(t, { slots: e }) {
    const r = en(), { primitiveElement: n, currentElement: a } = Qr();
    return L(a, () => {
      r.collectionRef.value = a.value;
    }), () => ge(qt, { ref: n }, e);
  }
});
R({
  name: "CollectionItem",
  inheritAttrs: !1,
  props: {
    value: {
      // It accepts any value
      validator: () => !0
    }
  },
  setup(t, { slots: e, attrs: r }) {
    const n = en(), { primitiveElement: a, currentElement: o } = Qr();
    return se((i) => {
      if (o.value) {
        const s = Rr(o.value);
        n.itemMap.value.set(s, { ref: o.value, value: t.value }), i(() => n.itemMap.value.delete(s));
      }
    }), () => ge(qt, { ...r, [n.attrName]: "", ref: a }, e);
  }
});
function _o() {
  if (typeof matchMedia == "function")
    return matchMedia("(pointer:coarse)").matches ? "coarse" : "fine";
}
_o();
function Lo(t, e) {
  return Array.isArray(t) ? t.filter((r) => !e.includes(r)) : Object.keys(t).reduce((r, n) => (e.includes(n) || (r[n] = t[n]), r), {});
}
function tn(t, e) {
  return Array.isArray(t) ? t.filter((r) => e.includes(r)) : e.reduce((r, n) => (n in t && (r[n] = t[n]), r), {});
}
function Uo(t) {
  return Array.isArray(t) ? t.filter((e) => e !== null) : Object.keys(t).reduce((e, r) => (r in t && t[r] !== null && (e[r] = t[r]), e), {});
}
function jo(t, e = 3, r = 10) {
  return new Promise((n, a) => {
    const o = t();
    if (o) {
      n(o);
      return;
    }
    let i = e * 1e3 / r;
    const s = setInterval(() => {
      const l = t();
      l && (clearInterval(s), n(l)), --i <= 0 && (clearInterval(s), a(new Error("Condition not met in time")));
    }, r);
  });
}
var Pt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function qo(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Ko(t) {
  if (t.__esModule) return t;
  var e = t.default;
  if (typeof e == "function") {
    var r = function n() {
      return this instanceof n ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    r.prototype = e.prototype;
  } else r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(t).forEach(function(n) {
    var a = Object.getOwnPropertyDescriptor(t, n);
    Object.defineProperty(r, n, a.get ? a : {
      enumerable: !0,
      get: function() {
        return t[n];
      }
    });
  }), r;
}
var zo = function(e) {
  return Go(e) && !Vo(e);
};
function Go(t) {
  return !!t && typeof t == "object";
}
function Vo(t) {
  var e = Object.prototype.toString.call(t);
  return e === "[object RegExp]" || e === "[object Date]" || Jo(t);
}
var Ho = typeof Symbol == "function" && Symbol.for, Qo = Ho ? Symbol.for("react.element") : 60103;
function Jo(t) {
  return t.$$typeof === Qo;
}
function Xo(t) {
  return Array.isArray(t) ? [] : {};
}
function Be(t, e) {
  return e.clone !== !1 && e.isMergeableObject(t) ? xe(Xo(t), t, e) : t;
}
function Yo(t, e, r) {
  return t.concat(e).map(function(n) {
    return Be(n, r);
  });
}
function Zo(t, e) {
  if (!e.customMerge)
    return xe;
  var r = e.customMerge(t);
  return typeof r == "function" ? r : xe;
}
function ea(t) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(t).filter(function(e) {
    return Object.propertyIsEnumerable.call(t, e);
  }) : [];
}
function sr(t) {
  return Object.keys(t).concat(ea(t));
}
function rn(t, e) {
  try {
    return e in t;
  } catch {
    return !1;
  }
}
function ta(t, e) {
  return rn(t, e) && !(Object.hasOwnProperty.call(t, e) && Object.propertyIsEnumerable.call(t, e));
}
function ra(t, e, r) {
  var n = {};
  return r.isMergeableObject(t) && sr(t).forEach(function(a) {
    n[a] = Be(t[a], r);
  }), sr(e).forEach(function(a) {
    ta(t, a) || (rn(t, a) && r.isMergeableObject(e[a]) ? n[a] = Zo(a, r)(t[a], e[a], r) : n[a] = Be(e[a], r));
  }), n;
}
function xe(t, e, r) {
  r = r || {}, r.arrayMerge = r.arrayMerge || Yo, r.isMergeableObject = r.isMergeableObject || zo, r.cloneUnlessOtherwiseSpecified = Be;
  var n = Array.isArray(e), a = Array.isArray(t), o = n === a;
  return o ? n ? r.arrayMerge(t, e, r) : ra(t, e, r) : Be(e, r);
}
xe.all = function(e, r) {
  if (!Array.isArray(e))
    throw new Error("first argument should be an array");
  return e.reduce(function(n, a) {
    return xe(n, a, r);
  }, {});
};
var na = xe, oa = na;
const aa = /* @__PURE__ */ qo(oa);
var ia = Error, la = EvalError, sa = RangeError, ua = ReferenceError, nn = SyntaxError, We = TypeError, ca = URIError, fa = function() {
  if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
    return !1;
  if (typeof Symbol.iterator == "symbol")
    return !0;
  var e = {}, r = Symbol("test"), n = Object(r);
  if (typeof r == "string" || Object.prototype.toString.call(r) !== "[object Symbol]" || Object.prototype.toString.call(n) !== "[object Symbol]")
    return !1;
  var a = 42;
  e[r] = a;
  for (r in e)
    return !1;
  if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0)
    return !1;
  var o = Object.getOwnPropertySymbols(e);
  if (o.length !== 1 || o[0] !== r || !Object.prototype.propertyIsEnumerable.call(e, r))
    return !1;
  if (typeof Object.getOwnPropertyDescriptor == "function") {
    var i = Object.getOwnPropertyDescriptor(e, r);
    if (i.value !== a || i.enumerable !== !0)
      return !1;
  }
  return !0;
}, ur = typeof Symbol < "u" && Symbol, da = fa, pa = function() {
  return typeof ur != "function" || typeof Symbol != "function" || typeof ur("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : da();
}, dt = {
  __proto__: null,
  foo: {}
}, ya = Object, ma = function() {
  return { __proto__: dt }.foo === dt.foo && !(dt instanceof ya);
}, va = "Function.prototype.bind called on incompatible ", ha = Object.prototype.toString, ga = Math.max, ba = "[object Function]", cr = function(e, r) {
  for (var n = [], a = 0; a < e.length; a += 1)
    n[a] = e[a];
  for (var o = 0; o < r.length; o += 1)
    n[o + e.length] = r[o];
  return n;
}, wa = function(e, r) {
  for (var n = [], a = r, o = 0; a < e.length; a += 1, o += 1)
    n[o] = e[a];
  return n;
}, xa = function(t, e) {
  for (var r = "", n = 0; n < t.length; n += 1)
    r += t[n], n + 1 < t.length && (r += e);
  return r;
}, Sa = function(e) {
  var r = this;
  if (typeof r != "function" || ha.apply(r) !== ba)
    throw new TypeError(va + r);
  for (var n = wa(arguments, 1), a, o = function() {
    if (this instanceof a) {
      var d = r.apply(
        this,
        cr(n, arguments)
      );
      return Object(d) === d ? d : this;
    }
    return r.apply(
      e,
      cr(n, arguments)
    );
  }, i = ga(0, r.length - n.length), s = [], l = 0; l < i; l++)
    s[l] = "$" + l;
  if (a = Function("binder", "return function (" + xa(s, ",") + "){ return binder.apply(this,arguments); }")(o), r.prototype) {
    var c = function() {
    };
    c.prototype = r.prototype, a.prototype = new c(), c.prototype = null;
  }
  return a;
}, Ea = Sa, zt = Function.prototype.bind || Ea, Oa = Function.prototype.call, Pa = Object.prototype.hasOwnProperty, Aa = zt, Ca = Aa.call(Oa, Pa), w, Ia = ia, $a = la, Ma = sa, Da = ua, Se = nn, we = We, Fa = ca, on = Function, pt = function(t) {
  try {
    return on('"use strict"; return (' + t + ").constructor;")();
  } catch {
  }
}, ie = Object.getOwnPropertyDescriptor;
if (ie)
  try {
    ie({}, "");
  } catch {
    ie = null;
  }
var yt = function() {
  throw new we();
}, Na = ie ? function() {
  try {
    return arguments.callee, yt;
  } catch {
    try {
      return ie(arguments, "callee").get;
    } catch {
      return yt;
    }
  }
}() : yt, me = pa(), Ta = ma(), D = Object.getPrototypeOf || (Ta ? function(t) {
  return t.__proto__;
} : null), he = {}, Ba = typeof Uint8Array > "u" || !D ? w : D(Uint8Array), le = {
  __proto__: null,
  "%AggregateError%": typeof AggregateError > "u" ? w : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? w : ArrayBuffer,
  "%ArrayIteratorPrototype%": me && D ? D([][Symbol.iterator]()) : w,
  "%AsyncFromSyncIteratorPrototype%": w,
  "%AsyncFunction%": he,
  "%AsyncGenerator%": he,
  "%AsyncGeneratorFunction%": he,
  "%AsyncIteratorPrototype%": he,
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
  "%Error%": Ia,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": $a,
  "%Float32Array%": typeof Float32Array > "u" ? w : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? w : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? w : FinalizationRegistry,
  "%Function%": on,
  "%GeneratorFunction%": he,
  "%Int8Array%": typeof Int8Array > "u" ? w : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? w : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? w : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": me && D ? D(D([][Symbol.iterator]())) : w,
  "%JSON%": typeof JSON == "object" ? JSON : w,
  "%Map%": typeof Map > "u" ? w : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !me || !D ? w : D((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": Object,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise > "u" ? w : Promise,
  "%Proxy%": typeof Proxy > "u" ? w : Proxy,
  "%RangeError%": Ma,
  "%ReferenceError%": Da,
  "%Reflect%": typeof Reflect > "u" ? w : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? w : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !me || !D ? w : D((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? w : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": me && D ? D(""[Symbol.iterator]()) : w,
  "%Symbol%": me ? Symbol : w,
  "%SyntaxError%": Se,
  "%ThrowTypeError%": Na,
  "%TypedArray%": Ba,
  "%TypeError%": we,
  "%Uint8Array%": typeof Uint8Array > "u" ? w : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? w : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? w : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? w : Uint32Array,
  "%URIError%": Fa,
  "%WeakMap%": typeof WeakMap > "u" ? w : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? w : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? w : WeakSet
};
if (D)
  try {
    null.error;
  } catch (t) {
    var Ra = D(D(t));
    le["%Error.prototype%"] = Ra;
  }
var ka = function t(e) {
  var r;
  if (e === "%AsyncFunction%")
    r = pt("async function () {}");
  else if (e === "%GeneratorFunction%")
    r = pt("function* () {}");
  else if (e === "%AsyncGeneratorFunction%")
    r = pt("async function* () {}");
  else if (e === "%AsyncGenerator%") {
    var n = t("%AsyncGeneratorFunction%");
    n && (r = n.prototype);
  } else if (e === "%AsyncIteratorPrototype%") {
    var a = t("%AsyncGenerator%");
    a && D && (r = D(a.prototype));
  }
  return le[e] = r, r;
}, fr = {
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
}, _e = zt, Ze = Ca, Wa = _e.call(Function.call, Array.prototype.concat), _a = _e.call(Function.apply, Array.prototype.splice), dr = _e.call(Function.call, String.prototype.replace), et = _e.call(Function.call, String.prototype.slice), La = _e.call(Function.call, RegExp.prototype.exec), Ua = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, ja = /\\(\\)?/g, qa = function(e) {
  var r = et(e, 0, 1), n = et(e, -1);
  if (r === "%" && n !== "%")
    throw new Se("invalid intrinsic syntax, expected closing `%`");
  if (n === "%" && r !== "%")
    throw new Se("invalid intrinsic syntax, expected opening `%`");
  var a = [];
  return dr(e, Ua, function(o, i, s, l) {
    a[a.length] = s ? dr(l, ja, "$1") : i || o;
  }), a;
}, Ka = function(e, r) {
  var n = e, a;
  if (Ze(fr, n) && (a = fr[n], n = "%" + a[0] + "%"), Ze(le, n)) {
    var o = le[n];
    if (o === he && (o = ka(n)), typeof o > "u" && !r)
      throw new we("intrinsic " + e + " exists, but is not available. Please file an issue!");
    return {
      alias: a,
      name: n,
      value: o
    };
  }
  throw new Se("intrinsic " + e + " does not exist!");
}, Ae = function(e, r) {
  if (typeof e != "string" || e.length === 0)
    throw new we("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof r != "boolean")
    throw new we('"allowMissing" argument must be a boolean');
  if (La(/^%?[^%]*%?$/, e) === null)
    throw new Se("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var n = qa(e), a = n.length > 0 ? n[0] : "", o = Ka("%" + a + "%", r), i = o.name, s = o.value, l = !1, c = o.alias;
  c && (a = c[0], _a(n, Wa([0, 1], c)));
  for (var d = 1, p = !0; d < n.length; d += 1) {
    var f = n[d], m = et(f, 0, 1), u = et(f, -1);
    if ((m === '"' || m === "'" || m === "`" || u === '"' || u === "'" || u === "`") && m !== u)
      throw new Se("property names with quotes must have matching quotes");
    if ((f === "constructor" || !p) && (l = !0), a += "." + f, i = "%" + a + "%", Ze(le, i))
      s = le[i];
    else if (s != null) {
      if (!(f in s)) {
        if (!r)
          throw new we("base intrinsic for " + e + " exists, but the property is not available.");
        return;
      }
      if (ie && d + 1 >= n.length) {
        var y = ie(s, f);
        p = !!y, p && "get" in y && !("originalValue" in y.get) ? s = y.get : s = s[f];
      } else
        p = Ze(s, f), s = s[f];
      p && !l && (le[i] = s);
    }
  }
  return s;
}, an = { exports: {} }, mt, pr;
function Gt() {
  if (pr) return mt;
  pr = 1;
  var t = Ae, e = t("%Object.defineProperty%", !0) || !1;
  if (e)
    try {
      e({}, "a", { value: 1 });
    } catch {
      e = !1;
    }
  return mt = e, mt;
}
var za = Ae, Qe = za("%Object.getOwnPropertyDescriptor%", !0);
if (Qe)
  try {
    Qe([], "length");
  } catch {
    Qe = null;
  }
var ln = Qe, yr = Gt(), Ga = nn, ve = We, mr = ln, Va = function(e, r, n) {
  if (!e || typeof e != "object" && typeof e != "function")
    throw new ve("`obj` must be an object or a function`");
  if (typeof r != "string" && typeof r != "symbol")
    throw new ve("`property` must be a string or a symbol`");
  if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
    throw new ve("`nonEnumerable`, if provided, must be a boolean or null");
  if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
    throw new ve("`nonWritable`, if provided, must be a boolean or null");
  if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
    throw new ve("`nonConfigurable`, if provided, must be a boolean or null");
  if (arguments.length > 6 && typeof arguments[6] != "boolean")
    throw new ve("`loose`, if provided, must be a boolean");
  var a = arguments.length > 3 ? arguments[3] : null, o = arguments.length > 4 ? arguments[4] : null, i = arguments.length > 5 ? arguments[5] : null, s = arguments.length > 6 ? arguments[6] : !1, l = !!mr && mr(e, r);
  if (yr)
    yr(e, r, {
      configurable: i === null && l ? l.configurable : !i,
      enumerable: a === null && l ? l.enumerable : !a,
      value: n,
      writable: o === null && l ? l.writable : !o
    });
  else if (s || !a && !o && !i)
    e[r] = n;
  else
    throw new Ga("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
}, At = Gt(), sn = function() {
  return !!At;
};
sn.hasArrayLengthDefineBug = function() {
  if (!At)
    return null;
  try {
    return At([], "length", { value: 1 }).length !== 1;
  } catch {
    return !0;
  }
};
var Ha = sn, Qa = Ae, vr = Va, Ja = Ha(), hr = ln, gr = We, Xa = Qa("%Math.floor%"), Ya = function(e, r) {
  if (typeof e != "function")
    throw new gr("`fn` is not a function");
  if (typeof r != "number" || r < 0 || r > 4294967295 || Xa(r) !== r)
    throw new gr("`length` must be a positive 32-bit integer");
  var n = arguments.length > 2 && !!arguments[2], a = !0, o = !0;
  if ("length" in e && hr) {
    var i = hr(e, "length");
    i && !i.configurable && (a = !1), i && !i.writable && (o = !1);
  }
  return (a || o || !n) && (Ja ? vr(
    /** @type {Parameters<define>[0]} */
    e,
    "length",
    r,
    !0,
    !0
  ) : vr(
    /** @type {Parameters<define>[0]} */
    e,
    "length",
    r
  )), e;
};
(function(t) {
  var e = zt, r = Ae, n = Ya, a = We, o = r("%Function.prototype.apply%"), i = r("%Function.prototype.call%"), s = r("%Reflect.apply%", !0) || e.call(i, o), l = Gt(), c = r("%Math.max%");
  t.exports = function(f) {
    if (typeof f != "function")
      throw new a("a function is required");
    var m = s(e, i, arguments);
    return n(
      m,
      1 + c(0, f.length - (arguments.length - 1)),
      !0
    );
  };
  var d = function() {
    return s(e, o, arguments);
  };
  l ? l(t.exports, "apply", { value: d }) : t.exports.apply = d;
})(an);
var Za = an.exports, un = Ae, cn = Za, ei = cn(un("String.prototype.indexOf")), ti = function(e, r) {
  var n = un(e, !!r);
  return typeof n == "function" && ei(e, ".prototype.") > -1 ? cn(n) : n;
};
const ri = {}, ni = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ri
}, Symbol.toStringTag, { value: "Module" })), oi = /* @__PURE__ */ Ko(ni);
var Vt = typeof Map == "function" && Map.prototype, vt = Object.getOwnPropertyDescriptor && Vt ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, tt = Vt && vt && typeof vt.get == "function" ? vt.get : null, br = Vt && Map.prototype.forEach, Ht = typeof Set == "function" && Set.prototype, ht = Object.getOwnPropertyDescriptor && Ht ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, rt = Ht && ht && typeof ht.get == "function" ? ht.get : null, wr = Ht && Set.prototype.forEach, ai = typeof WeakMap == "function" && WeakMap.prototype, Fe = ai ? WeakMap.prototype.has : null, ii = typeof WeakSet == "function" && WeakSet.prototype, Ne = ii ? WeakSet.prototype.has : null, li = typeof WeakRef == "function" && WeakRef.prototype, xr = li ? WeakRef.prototype.deref : null, si = Boolean.prototype.valueOf, ui = Object.prototype.toString, ci = Function.prototype.toString, fi = String.prototype.match, Qt = String.prototype.slice, ee = String.prototype.replace, di = String.prototype.toUpperCase, Sr = String.prototype.toLowerCase, fn = RegExp.prototype.test, Er = Array.prototype.concat, K = Array.prototype.join, pi = Array.prototype.slice, Or = Math.floor, Ct = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, gt = Object.getOwnPropertySymbols, It = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, Ee = typeof Symbol == "function" && typeof Symbol.iterator == "object", T = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === Ee || !0) ? Symbol.toStringTag : null, dn = Object.prototype.propertyIsEnumerable, Pr = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(t) {
  return t.__proto__;
} : null);
function Ar(t, e) {
  if (t === 1 / 0 || t === -1 / 0 || t !== t || t && t > -1e3 && t < 1e3 || fn.call(/e/, e))
    return e;
  var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof t == "number") {
    var n = t < 0 ? -Or(-t) : Or(t);
    if (n !== t) {
      var a = String(n), o = Qt.call(e, a.length + 1);
      return ee.call(a, r, "$&_") + "." + ee.call(ee.call(o, /([0-9]{3})/g, "$&_"), /_$/, "");
    }
  }
  return ee.call(e, r, "$&_");
}
var $t = oi, Cr = $t.custom, Ir = yn(Cr) ? Cr : null, yi = function t(e, r, n, a) {
  var o = r || {};
  if (Z(o, "quoteStyle") && o.quoteStyle !== "single" && o.quoteStyle !== "double")
    throw new TypeError('option "quoteStyle" must be "single" or "double"');
  if (Z(o, "maxStringLength") && (typeof o.maxStringLength == "number" ? o.maxStringLength < 0 && o.maxStringLength !== 1 / 0 : o.maxStringLength !== null))
    throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
  var i = Z(o, "customInspect") ? o.customInspect : !0;
  if (typeof i != "boolean" && i !== "symbol")
    throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
  if (Z(o, "indent") && o.indent !== null && o.indent !== "	" && !(parseInt(o.indent, 10) === o.indent && o.indent > 0))
    throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
  if (Z(o, "numericSeparator") && typeof o.numericSeparator != "boolean")
    throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
  var s = o.numericSeparator;
  if (typeof e > "u")
    return "undefined";
  if (e === null)
    return "null";
  if (typeof e == "boolean")
    return e ? "true" : "false";
  if (typeof e == "string")
    return vn(e, o);
  if (typeof e == "number") {
    if (e === 0)
      return 1 / 0 / e > 0 ? "0" : "-0";
    var l = String(e);
    return s ? Ar(e, l) : l;
  }
  if (typeof e == "bigint") {
    var c = String(e) + "n";
    return s ? Ar(e, c) : c;
  }
  var d = typeof o.depth > "u" ? 5 : o.depth;
  if (typeof n > "u" && (n = 0), n >= d && d > 0 && typeof e == "object")
    return Mt(e) ? "[Array]" : "[Object]";
  var p = Fi(o, n);
  if (typeof a > "u")
    a = [];
  else if (mn(a, e) >= 0)
    return "[Circular]";
  function f(U, J, X) {
    if (J && (a = pi.call(a), a.push(J)), X) {
      var Ie = {
        depth: o.depth
      };
      return Z(o, "quoteStyle") && (Ie.quoteStyle = o.quoteStyle), t(U, Ie, n + 1, a);
    }
    return t(U, o, n + 1, a);
  }
  if (typeof e == "function" && !$r(e)) {
    var m = Ei(e), u = Ge(e, f);
    return "[Function" + (m ? ": " + m : " (anonymous)") + "]" + (u.length > 0 ? " { " + K.call(u, ", ") + " }" : "");
  }
  if (yn(e)) {
    var y = Ee ? ee.call(String(e), /^(Symbol\(.*\))_[^)]*$/, "$1") : It.call(e);
    return typeof e == "object" && !Ee ? $e(y) : y;
  }
  if ($i(e)) {
    for (var v = "<" + Sr.call(String(e.nodeName)), b = e.attributes || [], P = 0; P < b.length; P++)
      v += " " + b[P].name + "=" + pn(mi(b[P].value), "double", o);
    return v += ">", e.childNodes && e.childNodes.length && (v += "..."), v += "</" + Sr.call(String(e.nodeName)) + ">", v;
  }
  if (Mt(e)) {
    if (e.length === 0)
      return "[]";
    var g = Ge(e, f);
    return p && !Di(g) ? "[" + Dt(g, p) + "]" : "[ " + K.call(g, ", ") + " ]";
  }
  if (hi(e)) {
    var x = Ge(e, f);
    return !("cause" in Error.prototype) && "cause" in e && !dn.call(e, "cause") ? "{ [" + String(e) + "] " + K.call(Er.call("[cause]: " + f(e.cause), x), ", ") + " }" : x.length === 0 ? "[" + String(e) + "]" : "{ [" + String(e) + "] " + K.call(x, ", ") + " }";
  }
  if (typeof e == "object" && i) {
    if (Ir && typeof e[Ir] == "function" && $t)
      return $t(e, { depth: d - n });
    if (i !== "symbol" && typeof e.inspect == "function")
      return e.inspect();
  }
  if (Oi(e)) {
    var E = [];
    return br && br.call(e, function(U, J) {
      E.push(f(J, e, !0) + " => " + f(U, e));
    }), Mr("Map", tt.call(e), E, p);
  }
  if (Ci(e)) {
    var I = [];
    return wr && wr.call(e, function(U) {
      I.push(f(U, e));
    }), Mr("Set", rt.call(e), I, p);
  }
  if (Pi(e))
    return bt("WeakMap");
  if (Ii(e))
    return bt("WeakSet");
  if (Ai(e))
    return bt("WeakRef");
  if (bi(e))
    return $e(f(Number(e)));
  if (xi(e))
    return $e(f(Ct.call(e)));
  if (wi(e))
    return $e(si.call(e));
  if (gi(e))
    return $e(f(String(e)));
  if (typeof window < "u" && e === window)
    return "{ [object Window] }";
  if (typeof globalThis < "u" && e === globalThis || typeof Pt < "u" && e === Pt)
    return "{ [object globalThis] }";
  if (!vi(e) && !$r(e)) {
    var k = Ge(e, f), _ = Pr ? Pr(e) === Object.prototype : e instanceof Object || e.constructor === Object, oe = e instanceof Object ? "" : "null prototype", Q = !_ && T && Object(e) === e && T in e ? Qt.call(ne(e), 8, -1) : oe ? "Object" : "", Ue = _ || typeof e.constructor != "function" ? "" : e.constructor.name ? e.constructor.name + " " : "", de = Ue + (Q || oe ? "[" + K.call(Er.call([], Q || [], oe || []), ": ") + "] " : "");
    return k.length === 0 ? de + "{}" : p ? de + "{" + Dt(k, p) + "}" : de + "{ " + K.call(k, ", ") + " }";
  }
  return String(e);
};
function pn(t, e, r) {
  var n = (r.quoteStyle || e) === "double" ? '"' : "'";
  return n + t + n;
}
function mi(t) {
  return ee.call(String(t), /"/g, "&quot;");
}
function Mt(t) {
  return ne(t) === "[object Array]" && (!T || !(typeof t == "object" && T in t));
}
function vi(t) {
  return ne(t) === "[object Date]" && (!T || !(typeof t == "object" && T in t));
}
function $r(t) {
  return ne(t) === "[object RegExp]" && (!T || !(typeof t == "object" && T in t));
}
function hi(t) {
  return ne(t) === "[object Error]" && (!T || !(typeof t == "object" && T in t));
}
function gi(t) {
  return ne(t) === "[object String]" && (!T || !(typeof t == "object" && T in t));
}
function bi(t) {
  return ne(t) === "[object Number]" && (!T || !(typeof t == "object" && T in t));
}
function wi(t) {
  return ne(t) === "[object Boolean]" && (!T || !(typeof t == "object" && T in t));
}
function yn(t) {
  if (Ee)
    return t && typeof t == "object" && t instanceof Symbol;
  if (typeof t == "symbol")
    return !0;
  if (!t || typeof t != "object" || !It)
    return !1;
  try {
    return It.call(t), !0;
  } catch {
  }
  return !1;
}
function xi(t) {
  if (!t || typeof t != "object" || !Ct)
    return !1;
  try {
    return Ct.call(t), !0;
  } catch {
  }
  return !1;
}
var Si = Object.prototype.hasOwnProperty || function(t) {
  return t in this;
};
function Z(t, e) {
  return Si.call(t, e);
}
function ne(t) {
  return ui.call(t);
}
function Ei(t) {
  if (t.name)
    return t.name;
  var e = fi.call(ci.call(t), /^function\s*([\w$]+)/);
  return e ? e[1] : null;
}
function mn(t, e) {
  if (t.indexOf)
    return t.indexOf(e);
  for (var r = 0, n = t.length; r < n; r++)
    if (t[r] === e)
      return r;
  return -1;
}
function Oi(t) {
  if (!tt || !t || typeof t != "object")
    return !1;
  try {
    tt.call(t);
    try {
      rt.call(t);
    } catch {
      return !0;
    }
    return t instanceof Map;
  } catch {
  }
  return !1;
}
function Pi(t) {
  if (!Fe || !t || typeof t != "object")
    return !1;
  try {
    Fe.call(t, Fe);
    try {
      Ne.call(t, Ne);
    } catch {
      return !0;
    }
    return t instanceof WeakMap;
  } catch {
  }
  return !1;
}
function Ai(t) {
  if (!xr || !t || typeof t != "object")
    return !1;
  try {
    return xr.call(t), !0;
  } catch {
  }
  return !1;
}
function Ci(t) {
  if (!rt || !t || typeof t != "object")
    return !1;
  try {
    rt.call(t);
    try {
      tt.call(t);
    } catch {
      return !0;
    }
    return t instanceof Set;
  } catch {
  }
  return !1;
}
function Ii(t) {
  if (!Ne || !t || typeof t != "object")
    return !1;
  try {
    Ne.call(t, Ne);
    try {
      Fe.call(t, Fe);
    } catch {
      return !0;
    }
    return t instanceof WeakSet;
  } catch {
  }
  return !1;
}
function $i(t) {
  return !t || typeof t != "object" ? !1 : typeof HTMLElement < "u" && t instanceof HTMLElement ? !0 : typeof t.nodeName == "string" && typeof t.getAttribute == "function";
}
function vn(t, e) {
  if (t.length > e.maxStringLength) {
    var r = t.length - e.maxStringLength, n = "... " + r + " more character" + (r > 1 ? "s" : "");
    return vn(Qt.call(t, 0, e.maxStringLength), e) + n;
  }
  var a = ee.call(ee.call(t, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, Mi);
  return pn(a, "single", e);
}
function Mi(t) {
  var e = t.charCodeAt(0), r = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[e];
  return r ? "\\" + r : "\\x" + (e < 16 ? "0" : "") + di.call(e.toString(16));
}
function $e(t) {
  return "Object(" + t + ")";
}
function bt(t) {
  return t + " { ? }";
}
function Mr(t, e, r, n) {
  var a = n ? Dt(r, n) : K.call(r, ", ");
  return t + " (" + e + ") {" + a + "}";
}
function Di(t) {
  for (var e = 0; e < t.length; e++)
    if (mn(t[e], `
`) >= 0)
      return !1;
  return !0;
}
function Fi(t, e) {
  var r;
  if (t.indent === "	")
    r = "	";
  else if (typeof t.indent == "number" && t.indent > 0)
    r = K.call(Array(t.indent + 1), " ");
  else
    return null;
  return {
    base: r,
    prev: K.call(Array(e + 1), r)
  };
}
function Dt(t, e) {
  if (t.length === 0)
    return "";
  var r = `
` + e.prev + e.base;
  return r + K.call(t, "," + r) + `
` + e.prev;
}
function Ge(t, e) {
  var r = Mt(t), n = [];
  if (r) {
    n.length = t.length;
    for (var a = 0; a < t.length; a++)
      n[a] = Z(t, a) ? e(t[a], t) : "";
  }
  var o = typeof gt == "function" ? gt(t) : [], i;
  if (Ee) {
    i = {};
    for (var s = 0; s < o.length; s++)
      i["$" + o[s]] = o[s];
  }
  for (var l in t)
    Z(t, l) && (r && String(Number(l)) === l && l < t.length || Ee && i["$" + l] instanceof Symbol || (fn.call(/[^\w$]/, l) ? n.push(e(l, t) + ": " + e(t[l], t)) : n.push(l + ": " + e(t[l], t))));
  if (typeof gt == "function")
    for (var c = 0; c < o.length; c++)
      dn.call(t, o[c]) && n.push("[" + e(o[c]) + "]: " + e(t[o[c]], t));
  return n;
}
var hn = Ae, Ce = ti, Ni = yi, Ti = We, Ve = hn("%WeakMap%", !0), He = hn("%Map%", !0), Bi = Ce("WeakMap.prototype.get", !0), Ri = Ce("WeakMap.prototype.set", !0), ki = Ce("WeakMap.prototype.has", !0), Wi = Ce("Map.prototype.get", !0), _i = Ce("Map.prototype.set", !0), Li = Ce("Map.prototype.has", !0), Jt = function(t, e) {
  for (var r = t, n; (n = r.next) !== null; r = n)
    if (n.key === e)
      return r.next = n.next, n.next = /** @type {NonNullable<typeof list.next>} */
      t.next, t.next = n, n;
}, Ui = function(t, e) {
  var r = Jt(t, e);
  return r && r.value;
}, ji = function(t, e, r) {
  var n = Jt(t, e);
  n ? n.value = r : t.next = /** @type {import('.').ListNode<typeof value>} */
  {
    // eslint-disable-line no-param-reassign, no-extra-parens
    key: e,
    next: t.next,
    value: r
  };
}, qi = function(t, e) {
  return !!Jt(t, e);
}, Ki = function() {
  var e, r, n, a = {
    assert: function(o) {
      if (!a.has(o))
        throw new Ti("Side channel does not contain " + Ni(o));
    },
    get: function(o) {
      if (Ve && o && (typeof o == "object" || typeof o == "function")) {
        if (e)
          return Bi(e, o);
      } else if (He) {
        if (r)
          return Wi(r, o);
      } else if (n)
        return Ui(n, o);
    },
    has: function(o) {
      if (Ve && o && (typeof o == "object" || typeof o == "function")) {
        if (e)
          return ki(e, o);
      } else if (He) {
        if (r)
          return Li(r, o);
      } else if (n)
        return qi(n, o);
      return !1;
    },
    set: function(o, i) {
      Ve && o && (typeof o == "object" || typeof o == "function") ? (e || (e = new Ve()), Ri(e, o, i)) : He ? (r || (r = new He()), _i(r, o, i)) : (n || (n = { key: {}, next: null }), ji(n, o, i));
    }
  };
  return a;
}, zi = String.prototype.replace, Gi = /%20/g, wt = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
}, Xt = {
  default: wt.RFC3986,
  formatters: {
    RFC1738: function(t) {
      return zi.call(t, Gi, "+");
    },
    RFC3986: function(t) {
      return String(t);
    }
  },
  RFC1738: wt.RFC1738,
  RFC3986: wt.RFC3986
}, Vi = Xt, xt = Object.prototype.hasOwnProperty, ae = Array.isArray, j = function() {
  for (var t = [], e = 0; e < 256; ++e)
    t.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());
  return t;
}(), Hi = function(e) {
  for (; e.length > 1; ) {
    var r = e.pop(), n = r.obj[r.prop];
    if (ae(n)) {
      for (var a = [], o = 0; o < n.length; ++o)
        typeof n[o] < "u" && a.push(n[o]);
      r.obj[r.prop] = a;
    }
  }
}, gn = function(e, r) {
  for (var n = r && r.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, a = 0; a < e.length; ++a)
    typeof e[a] < "u" && (n[a] = e[a]);
  return n;
}, Qi = function t(e, r, n) {
  if (!r)
    return e;
  if (typeof r != "object") {
    if (ae(e))
      e.push(r);
    else if (e && typeof e == "object")
      (n && (n.plainObjects || n.allowPrototypes) || !xt.call(Object.prototype, r)) && (e[r] = !0);
    else
      return [e, r];
    return e;
  }
  if (!e || typeof e != "object")
    return [e].concat(r);
  var a = e;
  return ae(e) && !ae(r) && (a = gn(e, n)), ae(e) && ae(r) ? (r.forEach(function(o, i) {
    if (xt.call(e, i)) {
      var s = e[i];
      s && typeof s == "object" && o && typeof o == "object" ? e[i] = t(s, o, n) : e.push(o);
    } else
      e[i] = o;
  }), e) : Object.keys(r).reduce(function(o, i) {
    var s = r[i];
    return xt.call(o, i) ? o[i] = t(o[i], s, n) : o[i] = s, o;
  }, a);
}, Ji = function(e, r) {
  return Object.keys(r).reduce(function(n, a) {
    return n[a] = r[a], n;
  }, e);
}, Xi = function(t, e, r) {
  var n = t.replace(/\+/g, " ");
  if (r === "iso-8859-1")
    return n.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n);
  } catch {
    return n;
  }
}, St = 1024, Yi = function(e, r, n, a, o) {
  if (e.length === 0)
    return e;
  var i = e;
  if (typeof e == "symbol" ? i = Symbol.prototype.toString.call(e) : typeof e != "string" && (i = String(e)), n === "iso-8859-1")
    return escape(i).replace(/%u[0-9a-f]{4}/gi, function(m) {
      return "%26%23" + parseInt(m.slice(2), 16) + "%3B";
    });
  for (var s = "", l = 0; l < i.length; l += St) {
    for (var c = i.length >= St ? i.slice(l, l + St) : i, d = [], p = 0; p < c.length; ++p) {
      var f = c.charCodeAt(p);
      if (f === 45 || f === 46 || f === 95 || f === 126 || f >= 48 && f <= 57 || f >= 65 && f <= 90 || f >= 97 && f <= 122 || o === Vi.RFC1738 && (f === 40 || f === 41)) {
        d[d.length] = c.charAt(p);
        continue;
      }
      if (f < 128) {
        d[d.length] = j[f];
        continue;
      }
      if (f < 2048) {
        d[d.length] = j[192 | f >> 6] + j[128 | f & 63];
        continue;
      }
      if (f < 55296 || f >= 57344) {
        d[d.length] = j[224 | f >> 12] + j[128 | f >> 6 & 63] + j[128 | f & 63];
        continue;
      }
      p += 1, f = 65536 + ((f & 1023) << 10 | c.charCodeAt(p) & 1023), d[d.length] = j[240 | f >> 18] + j[128 | f >> 12 & 63] + j[128 | f >> 6 & 63] + j[128 | f & 63];
    }
    s += d.join("");
  }
  return s;
}, Zi = function(e) {
  for (var r = [{ obj: { o: e }, prop: "o" }], n = [], a = 0; a < r.length; ++a)
    for (var o = r[a], i = o.obj[o.prop], s = Object.keys(i), l = 0; l < s.length; ++l) {
      var c = s[l], d = i[c];
      typeof d == "object" && d !== null && n.indexOf(d) === -1 && (r.push({ obj: i, prop: c }), n.push(d));
    }
  return Hi(r), e;
}, el = function(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}, tl = function(e) {
  return !e || typeof e != "object" ? !1 : !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e));
}, rl = function(e, r) {
  return [].concat(e, r);
}, nl = function(e, r) {
  if (ae(e)) {
    for (var n = [], a = 0; a < e.length; a += 1)
      n.push(r(e[a]));
    return n;
  }
  return r(e);
}, bn = {
  arrayToObject: gn,
  assign: Ji,
  combine: rl,
  compact: Zi,
  decode: Xi,
  encode: Yi,
  isBuffer: tl,
  isRegExp: el,
  maybeMap: nl,
  merge: Qi
}, wn = Ki, Je = bn, Te = Xt, ol = Object.prototype.hasOwnProperty, xn = {
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
}, q = Array.isArray, al = Array.prototype.push, Sn = function(t, e) {
  al.apply(t, q(e) ? e : [e]);
}, il = Date.prototype.toISOString, Dr = Te.default, M = {
  addQueryPrefix: !1,
  allowDots: !1,
  allowEmptyArrays: !1,
  arrayFormat: "indices",
  charset: "utf-8",
  charsetSentinel: !1,
  delimiter: "&",
  encode: !0,
  encodeDotInKeys: !1,
  encoder: Je.encode,
  encodeValuesOnly: !1,
  format: Dr,
  formatter: Te.formatters[Dr],
  // deprecated
  indices: !1,
  serializeDate: function(e) {
    return il.call(e);
  },
  skipNulls: !1,
  strictNullHandling: !1
}, ll = function(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean" || typeof e == "symbol" || typeof e == "bigint";
}, Et = {}, sl = function t(e, r, n, a, o, i, s, l, c, d, p, f, m, u, y, v, b, P) {
  for (var g = e, x = P, E = 0, I = !1; (x = x.get(Et)) !== void 0 && !I; ) {
    var k = x.get(e);
    if (E += 1, typeof k < "u") {
      if (k === E)
        throw new RangeError("Cyclic object value");
      I = !0;
    }
    typeof x.get(Et) > "u" && (E = 0);
  }
  if (typeof d == "function" ? g = d(r, g) : g instanceof Date ? g = m(g) : n === "comma" && q(g) && (g = Je.maybeMap(g, function(lt) {
    return lt instanceof Date ? m(lt) : lt;
  })), g === null) {
    if (i)
      return c && !v ? c(r, M.encoder, b, "key", u) : r;
    g = "";
  }
  if (ll(g) || Je.isBuffer(g)) {
    if (c) {
      var _ = v ? r : c(r, M.encoder, b, "key", u);
      return [y(_) + "=" + y(c(g, M.encoder, b, "value", u))];
    }
    return [y(r) + "=" + y(String(g))];
  }
  var oe = [];
  if (typeof g > "u")
    return oe;
  var Q;
  if (n === "comma" && q(g))
    v && c && (g = Je.maybeMap(g, c)), Q = [{ value: g.length > 0 ? g.join(",") || null : void 0 }];
  else if (q(d))
    Q = d;
  else {
    var Ue = Object.keys(g);
    Q = p ? Ue.sort(p) : Ue;
  }
  var de = l ? r.replace(/\./g, "%2E") : r, U = a && q(g) && g.length === 1 ? de + "[]" : de;
  if (o && q(g) && g.length === 0)
    return U + "[]";
  for (var J = 0; J < Q.length; ++J) {
    var X = Q[J], Ie = typeof X == "object" && typeof X.value < "u" ? X.value : g[X];
    if (!(s && Ie === null)) {
      var it = f && l ? X.replace(/\./g, "%2E") : X, Cn = q(g) ? typeof n == "function" ? n(U, it) : U : U + (f ? "." + it : "[" + it + "]");
      P.set(e, E);
      var er = wn();
      er.set(Et, P), Sn(oe, t(
        Ie,
        Cn,
        n,
        a,
        o,
        i,
        s,
        l,
        n === "comma" && v && q(g) ? null : c,
        d,
        p,
        f,
        m,
        u,
        y,
        v,
        b,
        er
      ));
    }
  }
  return oe;
}, ul = function(e) {
  if (!e)
    return M;
  if (typeof e.allowEmptyArrays < "u" && typeof e.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof e.encodeDotInKeys < "u" && typeof e.encodeDotInKeys != "boolean")
    throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
  if (e.encoder !== null && typeof e.encoder < "u" && typeof e.encoder != "function")
    throw new TypeError("Encoder has to be a function.");
  var r = e.charset || M.charset;
  if (typeof e.charset < "u" && e.charset !== "utf-8" && e.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var n = Te.default;
  if (typeof e.format < "u") {
    if (!ol.call(Te.formatters, e.format))
      throw new TypeError("Unknown format option provided.");
    n = e.format;
  }
  var a = Te.formatters[n], o = M.filter;
  (typeof e.filter == "function" || q(e.filter)) && (o = e.filter);
  var i;
  if (e.arrayFormat in xn ? i = e.arrayFormat : "indices" in e ? i = e.indices ? "indices" : "repeat" : i = M.arrayFormat, "commaRoundTrip" in e && typeof e.commaRoundTrip != "boolean")
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  var s = typeof e.allowDots > "u" ? e.encodeDotInKeys === !0 ? !0 : M.allowDots : !!e.allowDots;
  return {
    addQueryPrefix: typeof e.addQueryPrefix == "boolean" ? e.addQueryPrefix : M.addQueryPrefix,
    allowDots: s,
    allowEmptyArrays: typeof e.allowEmptyArrays == "boolean" ? !!e.allowEmptyArrays : M.allowEmptyArrays,
    arrayFormat: i,
    charset: r,
    charsetSentinel: typeof e.charsetSentinel == "boolean" ? e.charsetSentinel : M.charsetSentinel,
    commaRoundTrip: e.commaRoundTrip,
    delimiter: typeof e.delimiter > "u" ? M.delimiter : e.delimiter,
    encode: typeof e.encode == "boolean" ? e.encode : M.encode,
    encodeDotInKeys: typeof e.encodeDotInKeys == "boolean" ? e.encodeDotInKeys : M.encodeDotInKeys,
    encoder: typeof e.encoder == "function" ? e.encoder : M.encoder,
    encodeValuesOnly: typeof e.encodeValuesOnly == "boolean" ? e.encodeValuesOnly : M.encodeValuesOnly,
    filter: o,
    format: n,
    formatter: a,
    serializeDate: typeof e.serializeDate == "function" ? e.serializeDate : M.serializeDate,
    skipNulls: typeof e.skipNulls == "boolean" ? e.skipNulls : M.skipNulls,
    sort: typeof e.sort == "function" ? e.sort : null,
    strictNullHandling: typeof e.strictNullHandling == "boolean" ? e.strictNullHandling : M.strictNullHandling
  };
}, cl = function(t, e) {
  var r = t, n = ul(e), a, o;
  typeof n.filter == "function" ? (o = n.filter, r = o("", r)) : q(n.filter) && (o = n.filter, a = o);
  var i = [];
  if (typeof r != "object" || r === null)
    return "";
  var s = xn[n.arrayFormat], l = s === "comma" && n.commaRoundTrip;
  a || (a = Object.keys(r)), n.sort && a.sort(n.sort);
  for (var c = wn(), d = 0; d < a.length; ++d) {
    var p = a[d];
    n.skipNulls && r[p] === null || Sn(i, sl(
      r[p],
      p,
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
      c
    ));
  }
  var f = i.join(n.delimiter), m = n.addQueryPrefix === !0 ? "?" : "";
  return n.charsetSentinel && (n.charset === "iso-8859-1" ? m += "utf8=%26%2310003%3B&" : m += "utf8=%E2%9C%93&"), f.length > 0 ? m + f : "";
}, Oe = bn, Ft = Object.prototype.hasOwnProperty, fl = Array.isArray, A = {
  allowDots: !1,
  allowEmptyArrays: !1,
  allowPrototypes: !1,
  allowSparse: !1,
  arrayLimit: 20,
  charset: "utf-8",
  charsetSentinel: !1,
  comma: !1,
  decodeDotInKeys: !1,
  decoder: Oe.decode,
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
}, dl = function(t) {
  return t.replace(/&#(\d+);/g, function(e, r) {
    return String.fromCharCode(parseInt(r, 10));
  });
}, En = function(t, e) {
  return t && typeof t == "string" && e.comma && t.indexOf(",") > -1 ? t.split(",") : t;
}, pl = "utf8=%26%2310003%3B", yl = "utf8=%E2%9C%93", ml = function(e, r) {
  var n = { __proto__: null }, a = r.ignoreQueryPrefix ? e.replace(/^\?/, "") : e;
  a = a.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  var o = r.parameterLimit === 1 / 0 ? void 0 : r.parameterLimit, i = a.split(r.delimiter, o), s = -1, l, c = r.charset;
  if (r.charsetSentinel)
    for (l = 0; l < i.length; ++l)
      i[l].indexOf("utf8=") === 0 && (i[l] === yl ? c = "utf-8" : i[l] === pl && (c = "iso-8859-1"), s = l, l = i.length);
  for (l = 0; l < i.length; ++l)
    if (l !== s) {
      var d = i[l], p = d.indexOf("]="), f = p === -1 ? d.indexOf("=") : p + 1, m, u;
      f === -1 ? (m = r.decoder(d, A.decoder, c, "key"), u = r.strictNullHandling ? null : "") : (m = r.decoder(d.slice(0, f), A.decoder, c, "key"), u = Oe.maybeMap(
        En(d.slice(f + 1), r),
        function(v) {
          return r.decoder(v, A.decoder, c, "value");
        }
      )), u && r.interpretNumericEntities && c === "iso-8859-1" && (u = dl(u)), d.indexOf("[]=") > -1 && (u = fl(u) ? [u] : u);
      var y = Ft.call(n, m);
      y && r.duplicates === "combine" ? n[m] = Oe.combine(n[m], u) : (!y || r.duplicates === "last") && (n[m] = u);
    }
  return n;
}, vl = function(t, e, r, n) {
  for (var a = n ? e : En(e, r), o = t.length - 1; o >= 0; --o) {
    var i, s = t[o];
    if (s === "[]" && r.parseArrays)
      i = r.allowEmptyArrays && (a === "" || r.strictNullHandling && a === null) ? [] : [].concat(a);
    else {
      i = r.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var l = s.charAt(0) === "[" && s.charAt(s.length - 1) === "]" ? s.slice(1, -1) : s, c = r.decodeDotInKeys ? l.replace(/%2E/g, ".") : l, d = parseInt(c, 10);
      !r.parseArrays && c === "" ? i = { 0: a } : !isNaN(d) && s !== c && String(d) === c && d >= 0 && r.parseArrays && d <= r.arrayLimit ? (i = [], i[d] = a) : c !== "__proto__" && (i[c] = a);
    }
    a = i;
  }
  return a;
}, hl = function(e, r, n, a) {
  if (e) {
    var o = n.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e, i = /(\[[^[\]]*])/, s = /(\[[^[\]]*])/g, l = n.depth > 0 && i.exec(o), c = l ? o.slice(0, l.index) : o, d = [];
    if (c) {
      if (!n.plainObjects && Ft.call(Object.prototype, c) && !n.allowPrototypes)
        return;
      d.push(c);
    }
    for (var p = 0; n.depth > 0 && (l = s.exec(o)) !== null && p < n.depth; ) {
      if (p += 1, !n.plainObjects && Ft.call(Object.prototype, l[1].slice(1, -1)) && !n.allowPrototypes)
        return;
      d.push(l[1]);
    }
    if (l) {
      if (n.strictDepth === !0)
        throw new RangeError("Input depth exceeded depth option of " + n.depth + " and strictDepth is true");
      d.push("[" + o.slice(l.index) + "]");
    }
    return vl(d, r, n, a);
  }
}, gl = function(e) {
  if (!e)
    return A;
  if (typeof e.allowEmptyArrays < "u" && typeof e.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof e.decodeDotInKeys < "u" && typeof e.decodeDotInKeys != "boolean")
    throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
  if (e.decoder !== null && typeof e.decoder < "u" && typeof e.decoder != "function")
    throw new TypeError("Decoder has to be a function.");
  if (typeof e.charset < "u" && e.charset !== "utf-8" && e.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var r = typeof e.charset > "u" ? A.charset : e.charset, n = typeof e.duplicates > "u" ? A.duplicates : e.duplicates;
  if (n !== "combine" && n !== "first" && n !== "last")
    throw new TypeError("The duplicates option must be either combine, first, or last");
  var a = typeof e.allowDots > "u" ? e.decodeDotInKeys === !0 ? !0 : A.allowDots : !!e.allowDots;
  return {
    allowDots: a,
    allowEmptyArrays: typeof e.allowEmptyArrays == "boolean" ? !!e.allowEmptyArrays : A.allowEmptyArrays,
    allowPrototypes: typeof e.allowPrototypes == "boolean" ? e.allowPrototypes : A.allowPrototypes,
    allowSparse: typeof e.allowSparse == "boolean" ? e.allowSparse : A.allowSparse,
    arrayLimit: typeof e.arrayLimit == "number" ? e.arrayLimit : A.arrayLimit,
    charset: r,
    charsetSentinel: typeof e.charsetSentinel == "boolean" ? e.charsetSentinel : A.charsetSentinel,
    comma: typeof e.comma == "boolean" ? e.comma : A.comma,
    decodeDotInKeys: typeof e.decodeDotInKeys == "boolean" ? e.decodeDotInKeys : A.decodeDotInKeys,
    decoder: typeof e.decoder == "function" ? e.decoder : A.decoder,
    delimiter: typeof e.delimiter == "string" || Oe.isRegExp(e.delimiter) ? e.delimiter : A.delimiter,
    // eslint-disable-next-line no-implicit-coercion, no-extra-parens
    depth: typeof e.depth == "number" || e.depth === !1 ? +e.depth : A.depth,
    duplicates: n,
    ignoreQueryPrefix: e.ignoreQueryPrefix === !0,
    interpretNumericEntities: typeof e.interpretNumericEntities == "boolean" ? e.interpretNumericEntities : A.interpretNumericEntities,
    parameterLimit: typeof e.parameterLimit == "number" ? e.parameterLimit : A.parameterLimit,
    parseArrays: e.parseArrays !== !1,
    plainObjects: typeof e.plainObjects == "boolean" ? e.plainObjects : A.plainObjects,
    strictDepth: typeof e.strictDepth == "boolean" ? !!e.strictDepth : A.strictDepth,
    strictNullHandling: typeof e.strictNullHandling == "boolean" ? e.strictNullHandling : A.strictNullHandling
  };
}, bl = function(t, e) {
  var r = gl(e);
  if (t === "" || t === null || typeof t > "u")
    return r.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var n = typeof t == "string" ? ml(t, r) : t, a = r.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, o = Object.keys(n), i = 0; i < o.length; ++i) {
    var s = o[i], l = hl(s, n[s], r, typeof t == "string");
    a = Oe.merge(a, l, r);
  }
  return r.allowSparse === !0 ? a : Oe.compact(a);
}, wl = cl, xl = bl, Sl = Xt, Fr = {
  formats: Sl,
  parse: xl,
  stringify: wl
}, El = { exports: {} };
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
    r.configure = function(u) {
      var y, v;
      for (y in u)
        v = u[y], v !== void 0 && u.hasOwnProperty(y) && (n[y] = v);
      return this;
    }, r.status = null, r.set = function(u) {
      var y = r.isStarted();
      u = a(u, n.minimum, 1), r.status = u === 1 ? null : u;
      var v = r.render(!y), b = v.querySelector(n.barSelector), P = n.speed, g = n.easing;
      return v.offsetWidth, s(function(x) {
        n.positionUsing === "" && (n.positionUsing = r.getPositioningCSS()), l(b, i(u, P, g)), u === 1 ? (l(v, {
          transition: "none",
          opacity: 1
        }), v.offsetWidth, setTimeout(function() {
          l(v, {
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
      return y ? (typeof u != "number" && (u = (1 - y) * a(Math.random() * y, 0.1, 0.95)), y = a(y + u, 0, 0.994), r.set(y)) : r.start();
    }, r.trickle = function() {
      return r.inc(Math.random() * n.trickleRate);
    }, function() {
      var u = 0, y = 0;
      r.promise = function(v) {
        return !v || v.state() === "resolved" ? this : (y === 0 && r.start(), u++, y++, v.always(function() {
          y--, y === 0 ? (u = 0, r.done()) : r.set((u - y) / u);
        }), this);
      };
    }(), r.render = function(u) {
      if (r.isRendered()) return document.getElementById("nprogress");
      d(document.documentElement, "nprogress-busy");
      var y = document.createElement("div");
      y.id = "nprogress", y.innerHTML = n.template;
      var v = y.querySelector(n.barSelector), b = u ? "-100" : o(r.status || 0), P = document.querySelector(n.parent), g;
      return l(v, {
        transition: "all 0 linear",
        transform: "translate3d(" + b + "%,0,0)"
      }), n.showSpinner || (g = y.querySelector(n.spinnerSelector), g && m(g)), P != document.body && d(P, "nprogress-custom-parent"), P.appendChild(y), y;
    }, r.remove = function() {
      p(document.documentElement, "nprogress-busy"), p(document.querySelector(n.parent), "nprogress-custom-parent");
      var u = document.getElementById("nprogress");
      u && m(u);
    }, r.isRendered = function() {
      return !!document.getElementById("nprogress");
    }, r.getPositioningCSS = function() {
      var u = document.body.style, y = "WebkitTransform" in u ? "Webkit" : "MozTransform" in u ? "Moz" : "msTransform" in u ? "ms" : "OTransform" in u ? "O" : "";
      return y + "Perspective" in u ? "translate3d" : y + "Transform" in u ? "translate" : "margin";
    };
    function a(u, y, v) {
      return u < y ? y : u > v ? v : u;
    }
    function o(u) {
      return (-1 + u) * 100;
    }
    function i(u, y, v) {
      var b;
      return n.positionUsing === "translate3d" ? b = { transform: "translate3d(" + o(u) + "%,0,0)" } : n.positionUsing === "translate" ? b = { transform: "translate(" + o(u) + "%,0)" } : b = { "margin-left": o(u) + "%" }, b.transition = "all " + y + "ms " + v, b;
    }
    var s = /* @__PURE__ */ function() {
      var u = [];
      function y() {
        var v = u.shift();
        v && v(y);
      }
      return function(v) {
        u.push(v), u.length == 1 && y();
      };
    }(), l = /* @__PURE__ */ function() {
      var u = ["Webkit", "O", "Moz", "ms"], y = {};
      function v(x) {
        return x.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(E, I) {
          return I.toUpperCase();
        });
      }
      function b(x) {
        var E = document.body.style;
        if (x in E) return x;
        for (var I = u.length, k = x.charAt(0).toUpperCase() + x.slice(1), _; I--; )
          if (_ = u[I] + k, _ in E) return _;
        return x;
      }
      function P(x) {
        return x = v(x), y[x] || (y[x] = b(x));
      }
      function g(x, E, I) {
        E = P(E), x.style[E] = I;
      }
      return function(x, E) {
        var I = arguments, k, _;
        if (I.length == 2)
          for (k in E)
            _ = E[k], _ !== void 0 && E.hasOwnProperty(k) && g(x, k, _);
        else
          g(x, I[1], I[2]);
      };
    }();
    function c(u, y) {
      var v = typeof u == "string" ? u : f(u);
      return v.indexOf(" " + y + " ") >= 0;
    }
    function d(u, y) {
      var v = f(u), b = v + y;
      c(v, y) || (u.className = b.substring(1));
    }
    function p(u, y) {
      var v = f(u), b;
      c(u, y) && (b = v.replace(" " + y + " ", " "), u.className = b.substring(1, b.length - 1));
    }
    function f(u) {
      return (" " + (u.className || "") + " ").replace(/\s+/gi, " ");
    }
    function m(u) {
      u && u.parentNode && u.parentNode.removeChild(u);
    }
    return r;
  });
})(El);
function Ol(t, e, r, n = "brackets") {
  let a = /^https?:\/\//.test(e.toString()), o = a || e.toString().startsWith("/"), i = !o && !e.toString().startsWith("#") && !e.toString().startsWith("?"), s = e.toString().includes("?") || t === "get" && Object.keys(r).length, l = e.toString().includes("#"), c = new URL(e.toString(), "http://localhost");
  return t === "get" && Object.keys(r).length && (c.search = Fr.stringify(aa(Fr.parse(c.search, { ignoreQueryPrefix: !0 }), r), { encodeValuesOnly: !0, arrayFormat: n }), r = {}), [[a ? `${c.protocol}//${c.host}` : "", o ? c.pathname : "", i ? c.pathname.substring(1) : "", s ? c.search : "", l ? c.hash : ""].join(""), r];
}
const Nt = S(null), C = S([]), nt = S({});
class Yt {
  constructor(e, r, n, a, o) {
    W(this, "update", (e, r, n) => {
      const a = this.index.value;
      a > -1 && (C.value[a].modalProps = e, C.value[a].onCloseCallback = r, C.value[a].afterLeaveCallback = n);
    });
    W(this, "getAdjacentModal", (e) => {
      const r = this.index.value;
      return C.value[r + e] ?? null;
    });
    W(this, "isOnTopOfStack", () => C.value.length < 2 || C.value[C.value.length - 1].id === this.id);
    W(this, "show", () => {
      console.log("calling show");
      const e = this.index.value;
      if (e > -1) {
        if (C.value[e].open)
          return;
        C.value[e].open = !0;
      }
    });
    W(this, "close", () => {
      var r;
      console.log("calling close");
      const e = this.index.value;
      if (e > -1) {
        if (!C.value[e].open)
          return;
        Object.keys(this.listeners).forEach((n) => {
          this.off(n);
        }), C.value[e].open = !1, (r = this.onCloseCallback) == null || r.call(this), this.onCloseCallback = null;
      }
    });
    W(this, "setOpen", (e) => {
      e ? this.show() : this.close();
    });
    W(this, "afterLeave", () => {
      var r;
      console.log("calling afterLeave");
      const e = this.index.value;
      if (e > -1) {
        if (C.value[e].open)
          return;
        C.value = C.value.filter((n) => n.id !== this.id), (r = this.afterLeaveCallback) == null || r.call(this), this.afterLeaveCallback = null;
      }
    });
    W(this, "on", (e, r) => {
      this.listeners[e] = this.listeners[e] ?? [], this.listeners[e].push(r);
    });
    W(this, "off", (e, r) => {
      var n;
      r ? this.listeners[e] = ((n = this.listeners[e]) == null ? void 0 : n.filter((a) => a !== r)) ?? [] : delete this.listeners[e];
    });
    W(this, "emit", (e, ...r) => {
      var n;
      (n = this.listeners[e]) == null || n.forEach((a) => a(...r));
    });
    W(this, "registerEventListenersFromAttrs", (e) => {
      const r = [];
      return Object.keys(e).filter((n) => n.startsWith("on")).forEach((n) => {
        const a = n.replace(/^on/, "").replace(/^./, (o) => o.toLowerCase()).replace(/([A-Z])/g, "-$1").toLowerCase();
        this.on(a, e[n]), r.push(() => this.off(a, e[n]));
      }), () => r.forEach((n) => n());
    });
    W(this, "reload", (e = {}) => {
      var n;
      let r = Object.keys(this.response.props);
      e.only && (r = tn(r, e.only)), e.except && (r = Lo(r, e.except)), (n = this.response) != null && n.url && Ye.get(this.response.url, {
        headers: {
          Accept: "text/html, application/xhtml+xml",
          "X-Inertia": !0,
          "X-Inertia-Partial-Component": this.response.component,
          "X-Inertia-Version": this.response.version,
          "X-Inertia-Partial-Data": r.join(","),
          "X-InertiaUI-Modal": !0,
          "X-InertiaUI-Modal-Use-Router": 0
        }
      }).then((a) => {
        Object.assign(this.componentProps.value, a.data.props);
      });
    });
    this.id = Yt.generateId(), this.open = !1, this.listeners = {}, this.component = e, this.componentProps = S(r.props), this.response = r, this.modalProps = n, this.onCloseCallback = a, this.afterLeaveCallback = o, this.index = N(() => C.value.findIndex((i) => i.id === this.id)), this.getParentModal = () => this.getAdjacentModal(-1), this.getChildModal = () => this.getAdjacentModal(1), this.onTopOfStack = N(() => this.isOnTopOfStack());
  }
  static generateId() {
    return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `inertiaui_modal_${crypto.randomUUID()}` : `inertiaui_modal_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
function Pl(t, e) {
  nt.value[t] = { name: t, callback: e };
}
function Al(t, e, r, n) {
  if (!nt.value[t])
    throw new Error(`The local modal "${t}" has not been registered.`);
  const a = Zt(null, {}, e, r, n);
  return a.name = t, nt.value[t].callback(a), a;
}
function On(t, e = {}, r = null, n = null) {
  return De.resolveComponent(t.component).then((a) => Zt(Rr(a), t, e, r, n));
}
function Cl(t, e, r = {}, n = {}, a = {}, o = null, i = null, s = "brackets", l = !1) {
  return new Promise((c, d) => {
    if (t.startsWith("#")) {
      c(Al(t.substring(1), a, o, i));
      return;
    }
    const [p, f] = Ol(e, t || "", r, s);
    let m = l && C.value.length === 0;
    if (C.value.length === 0 && (Nt.value = typeof window < "u" ? window.location.href : ""), n = {
      ...n,
      Accept: "text/html, application/xhtml+xml",
      "X-Requested-With": "XMLHttpRequest",
      "X-Inertia": !0,
      "X-Inertia-Version": Ur().version,
      "X-InertiaUI-Modal": !0,
      "X-InertiaUI-Modal-Use-Router": m ? 1 : 0
    }, m)
      return De.visit(p, {
        method: e,
        data: f,
        headers: n,
        preserveScroll: !0,
        preserveState: !0,
        onError: d,
        onFinish: () => jo(() => C.value[0]).then((u) => {
          const y = u.onCloseCallback, v = u.afterLeaveCallback;
          u.update(
            a,
            () => {
              o == null || o(), y == null || y();
            },
            () => {
              i == null || i(), v == null || v();
            }
          ), c(u);
        })
      });
    Ye({ url: p, method: e, data: f, headers: n }).then((u) => c(On(u.data, a, o, i))).catch(d);
  });
}
function Zt(t, e, r, n, a) {
  const o = new Yt(t, e, r, n, a);
  return C.value.push(o), ce(() => {
    o.show();
  }), o;
}
const Nr = S(!1), Il = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"];
function Le() {
  return {
    getBaseUrl: () => Nt.value,
    setBaseUrl: (t) => Nt.value = t,
    stack: kn(C),
    push: Zt,
    pushFromResponseData: On,
    closeAll: () => C.value.reverse().forEach((t) => t.close()),
    reset: () => C.value = [],
    visit: Cl,
    registerLocalModal: Pl,
    removeLocalModal: (t) => delete nt.value[t],
    rootPresent: Nr,
    verifyRoot: () => {
      if (!Nr.value)
        throw new Error(
          "The <ModalRoot> component is missing from your app layout. Please check the documentation for more information: https://inertiaui.com/inertia-modal/docs/installation"
        );
    }
  };
}
const $l = (t, e) => {
  const r = t.__vccOpts || t;
  for (const [n, a] of e)
    r[n] = a;
  return r;
}, Ml = {}, Dl = {
  type: "button",
  class: "im-close-button text-gray-400 hover:text-gray-500"
};
function Fl(t, e) {
  return O(), ue("button", Dl, e[0] || (e[0] = [
    V("span", { class: "sr-only" }, "Close", -1),
    V("svg", {
      class: "size-6",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      "stroke-width": "2",
      stroke: "currentColor",
      "aria-hidden": "true"
    }, [
      V("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M6 18L18 6M6 6l12 12"
      })
    ], -1)
  ]));
}
const Pn = /* @__PURE__ */ $l(Ml, [["render", Fl]]), Nl = { class: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4" }, Tl = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, Bl = {
  __name: "ModalContent",
  props: {
    modalContext: Object,
    modalProps: Object
  },
  setup(t) {
    return (e, r) => (O(), ue("div", Nl, [
      V("div", {
        class: be(["im-modal-positioner flex min-h-full justify-center", {
          "items-start": t.modalProps.position === "top",
          "items-center": t.modalProps.position === "center",
          "items-end": t.modalProps.position === "bottom"
        }])
      }, [
        z(Rt, {
          "enter-from-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          "enter-to-class": "opacity-100 translate-y-0 sm:scale-100",
          "enter-active-class": "transition transform ease-in-out duration-300",
          "leave-from-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-to-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          "leave-active-class": "transition transform ease-in-out duration-300"
        }, {
          default: $(() => {
            var n;
            return [
              kt(V("div", {
                class: be({
                  "im-modal-wrapper w-full": !0,
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
              }, [
                V("div", {
                  class: be(["im-modal-content relative", [t.modalProps.paddingClasses, t.modalProps.panelClasses]])
                }, [
                  t.modalProps.closeButton ? (O(), ue("div", Tl, [
                    z(Pn, {
                      onClick: t.modalContext.close
                    }, null, 8, ["onClick"])
                  ])) : te("", !0),
                  B(e.$slots, "default", {
                    modalContext: t.modalContext,
                    modalProps: t.modalProps
                  })
                ], 2)
              ], 2), [
                [Wt, !!((n = t.modalContext) != null && n.show)]
              ])
            ];
          }),
          _: 3
        })
      ], 2)
    ]));
  }
}, An = {
  __name: "ModalRenderer",
  props: {
    index: {
      type: Number,
      required: !0
    }
  },
  setup(t) {
    const e = t, r = Le(), n = N(() => r.stack.value[e.index]);
    return Bt("modalContext", n), (a, o) => {
      var i;
      return (i = n.value) != null && i.component ? (O(), F(h(n).component, H({ key: 0 }, n.value.componentProps, {
        onModalEvent: o[0] || (o[0] = (s, ...l) => n.value.emit(s, ...l))
      }), null, 16)) : te("", !0);
    };
  }
}, Rl = { class: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden" }, kl = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, Wl = {
  __name: "SlideoverContent",
  props: {
    modalContext: Object,
    modalProps: Object
  },
  setup(t) {
    return (e, r) => {
      const n = Wn("DialogPanel");
      return O(), ue("div", Rl, [
        V("div", {
          class: be(["im-slideover-positioner flex min-h-full items-center", {
            "justify-start": t.modalProps.position === "left",
            "justify-end": t.modalProps.position === "right"
          }])
        }, [
          z(Rt, {
            "enter-from-class": "opacity-0 " + (t.modalProps.position === "left" ? "-translate-x-full" : "translate-x-full"),
            "enter-active-class": "transition transform ease-in-out duration-300",
            "enter-to-class": "opacity-100 translate-x-0",
            "leave-from-class": "opacity-100 translate-x-0",
            "leave-to-class": "opacity-0 " + (t.modalProps.position === "left" ? "-translate-x-full" : "translate-x-full"),
            "leave-active-class": "transition transform ease-in-out duration-300"
          }, {
            default: $(() => [
              kt(V("div", {
                class: be({
                  "im-slideover-wrapper w-full": !0,
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
              }, [
                z(n, {
                  class: be(["im-slideover-content relative", [t.modalProps.paddingClasses, t.modalProps.panelClasses]])
                }, {
                  default: $(() => [
                    t.modalProps.closeButton ? (O(), ue("div", kl, [
                      z(Pn, {
                        onClick: t.modalContext.close
                      }, null, 8, ["onClick"])
                    ])) : te("", !0),
                    B(e.$slots, "default", {
                      modalContext: t.modalContext,
                      modalProps: t.modalProps
                    })
                  ]),
                  _: 3
                }, 8, ["class"])
              ], 2), [
                [Wt, t.modalContext.show]
              ])
            ]),
            _: 3
          }, 8, ["enter-from-class", "leave-to-class"])
        ], 2)
      ]);
    };
  }
}, _l = ["data-inertiaui-modal-id", "data-inertiaui-modal-index"], Hl = /* @__PURE__ */ Object.assign({
  inheritAttrs: !1
}, {
  __name: "Modal",
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
    const n = t, a = Le(), o = n.name ? S({}) : Wr("modalContext"), i = N(() => {
      const m = o.value.modalProps.slideover ?? n.slideover ?? jr("type") === "slideover";
      return {
        slideover: m,
        closeButton: n.closeButton ?? pe(m, "closeButton"),
        closeExplicitly: n.closeExplicitly ?? pe(m, "closeExplicitly"),
        maxWidth: n.maxWidth ?? pe(m, "maxWidth"),
        paddingClasses: n.paddingClasses ?? pe(m, "paddingClasses"),
        panelClasses: n.panelClasses ?? pe(m, "panelClasses"),
        position: n.position ?? pe(m, "position"),
        ...o.value.modalProps
      };
    });
    n.name && (a.registerLocalModal(n.name, function(m) {
      o.value = m, d();
    }), Xe(() => {
      a.removeLocalModal(n.name);
    })), ot(() => {
      a.verifyRoot(), n.name || d();
    });
    function s() {
      i.value.closeExplicitly || o.value.close();
    }
    const l = S(null);
    Xe(() => {
      var m;
      return (m = l.value) == null ? void 0 : m.call(l);
    });
    const c = _r();
    function d() {
      l.value = o.value.registerEventListenersFromAttrs(c);
    }
    const p = r;
    function f(m, ...u) {
      p("modal-event", m, ...u);
    }
    return e({
      close: o.value.close,
      emit: f,
      getChildModal: o.value.getChildModal,
      getParentModal: o.value.getParentModal,
      modalContext: o.value,
      reload: o.value.reload
    }), (m, u) => (O(), ue(Tt, null, [
      z(h(ho), {
        open: h(o).open
      }, {
        default: $(({ open: y }) => [
          V("div", {
            "data-inertiaui-modal-id": h(o).id,
            "data-inertiaui-modal-index": h(o).index,
            class: "im-dialog relative z-20"
          }, [
            h(o).index === 0 ? (O(), F(Rt, {
              key: 0,
              "enter-active-class": "transition transform ease-in-out duration-300",
              "enter-from-class": "opacity-0",
              "enter-to-class": "opacity-100",
              "leave-active-class": "transition transform ease-in-out duration-300",
              "leave-from-class": "opacity-100",
              "leave-to-class": "opacity-0"
            }, {
              default: $(() => [
                kt(z(h(lr), { class: "im-backdrop fixed inset-0 z-30 bg-black/75" }, null, 512), [
                  [Wt, h(o).onTopOfStack]
                ])
              ]),
              _: 1
            })) : te("", !0),
            h(o).index > 0 && h(o).onTopOfStack ? (O(), F(h(lr), {
              key: 1,
              class: "im-backdrop fixed inset-0 z-30 bg-black/75"
            })) : te("", !0),
            z(h(ko), {
              "disable-outside-pointer-events": i.value.closeExplicitly,
              onEscapeKeyDown: s,
              onCloseAutoFocus: h(o).afterLeave
            }, {
              default: $(() => [
                (O(), F(Lr(i.value.slideover ? Wl : Bl), {
                  "modal-context": h(o),
                  "modal-props": i.value
                }, {
                  default: $(() => [
                    B(m.$slots, "default", {
                      close: h(o).close,
                      emit: f,
                      getChildModal: h(o).getChildModal,
                      getParentModal: h(o).getParentModal,
                      modalContext: h(o),
                      modalProps: i.value,
                      reload: h(o).reload
                    })
                  ]),
                  _: 3
                }, 8, ["modal-context", "modal-props"]))
              ]),
              _: 3
            }, 8, ["disable-outside-pointer-events", "onCloseAutoFocus"])
          ], 8, _l)
        ]),
        _: 3
      }, 8, ["open"]),
      h(a).stack.value[h(o).index + 1] ? (O(), F(An, {
        key: 0,
        index: h(o).index + 1
      }, null, 8, ["index"])) : te("", !0)
    ], 64));
  }
}), Ql = {
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
    fragment: {
      type: String,
      default: null
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
    const r = t, n = S(!1), a = Le(), o = S(null);
    Bt("modalContext", o);
    const i = e, s = S(!1), l = N(() => r.navigate ?? jr("navigate"));
    L(
      () => {
        var y;
        return (y = o.value) == null ? void 0 : y.isOnTopOfStack();
      },
      (y) => {
        o.value && (y && s.value ? i("focus") : y || i("blur"), s.value = !y);
      }
    ), ot(() => {
      a.verifyRoot(), !l.value && r.fragment && window.location.hash === `#${r.fragment}` && u();
    });
    const c = S(null);
    Xe(() => {
      var y;
      return (y = c.value) == null ? void 0 : y.call(c);
    });
    const d = _r();
    function p() {
      c.value = o.value.registerEventListenersFromAttrs(d);
    }
    L(o, (y, v) => {
      y && !v && (!l.value && r.fragment && o.value.index === 0 && (window.location.hash = r.fragment), p(), i("success"));
    });
    function f() {
      !l.value && r.fragment && o.value.index === 0 && (window.location.hash = ""), i("close");
    }
    function m() {
      o.value = null, i("after-leave");
    }
    function u() {
      n.value || (r.href.startsWith("#") || (n.value = !0, i("start")), a.visit(
        r.href,
        r.method,
        r.data,
        r.headers,
        Uo(tn(r, Il)),
        f,
        m,
        r.queryStringArrayFormat,
        l.value
      ).then((y) => {
        o.value = y;
      }).catch((y) => i("error", y)).finally(() => n.value = !1));
    }
    return (y, v) => (O(), F(Lr(t.as), H(h(d), {
      href: t.href,
      onClick: _n(u, ["prevent"])
    }), {
      default: $(() => [
        B(y.$slots, "default", { loading: n.value })
      ]),
      _: 3
    }, 16, ["href"]));
  }
}, Jl = {
  __name: "ModalRoot",
  setup(t) {
    const e = Le(), r = S(!1);
    Me(De.on("start", () => r.value = !0)), Me(De.on("finish", () => r.value = !1));
    const n = (o) => (o.headers["X-InertiaUI-Modal-Base-Url"] = e.getBaseUrl(), o);
    Ln(() => {
      e.rootPresent.value = !0, Ye.interceptors.request.use(n);
    }), Me(() => {
      Ye.interceptors.request.eject(n), e.rootPresent.value = !1;
    });
    const a = Ur();
    return L(
      () => {
        var o;
        return (o = a.props) == null ? void 0 : o._inertiaui_modal;
      },
      (o) => {
        if (!o) {
          e.closeAll();
          return;
        }
        e.setBaseUrl(o.baseUrl), e.pushFromResponseData(o, {}, () => {
          if (!o.baseUrl) {
            console.error("No base url in modal response data so cannot navigate back");
            return;
          }
          !r.value && window.location.href !== o.baseUrl && De.visit(o.baseUrl, {
            preserveScroll: !0,
            preserveState: !0
          });
        });
      },
      { immediate: !0 }
    ), (o, i) => (O(), ue(Tt, null, [
      B(o.$slots, "default"),
      h(e).stack.value.length ? (O(), F(An, {
        key: 0,
        index: 0
      })) : te("", !0)
    ], 64));
  }
};
function Xl(t, e = {}) {
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
  Hl as Modal,
  Ql as ModalLink,
  Jl as ModalRoot,
  jr as getConfig,
  zl as putConfig,
  Kl as resetConfig,
  Xl as visitModal
};
