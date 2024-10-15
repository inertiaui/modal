var ta = Object.defineProperty;
var ra = (e, t, r) => t in e ? ta(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var z = (e, t, r) => ra(e, typeof t != "symbol" ? t + "" : t, r);
import * as Er from "vue";
import { watchEffect as te, ref as g, computed as S, cloneVNode as na, h as B, Fragment as sr, defineComponent as G, inject as Q, provide as Z, onMounted as W, onUnmounted as q, watch as se, shallowRef as aa, unref as P, getCurrentInstance as oa, Teleport as la, reactive as ia, nextTick as tn, normalizeClass as Se, readonly as ua, markRaw as sa, openBlock as H, createElementBlock as $e, createElementVNode as Le, createVNode as xe, withCtx as ue, createCommentVNode as Ee, renderSlot as Ze, createBlock as be, mergeProps as rn, onBeforeUnmount as Gt, useAttrs as nn, withDirectives as ca, vShow as fa, resolveDynamicComponent as an, withModifiers as da, onBeforeMount as pa } from "vue";
import gt from "axios";
import { router as Ke, usePage as on } from "@inertiajs/vue3";
const ut = {
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
class ya {
  constructor() {
    this.config = {}, this.reset();
  }
  reset() {
    this.config = JSON.parse(JSON.stringify(ut));
  }
  put(t, r) {
    if (typeof t == "object") {
      this.config = {
        type: t.type ?? ut.type,
        modal: { ...ut.modal, ...t.modal ?? {} },
        slideover: { ...ut.slideover, ...t.slideover ?? {} }
      };
      return;
    }
    const n = t.split(".");
    let o = this.config;
    for (let a = 0; a < n.length - 1; a++)
      o = o[n[a]] = o[n[a]] || {};
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
const At = new ya(), hu = () => At.reset(), gu = (e, t) => At.put(e, t), ln = (e) => At.get(e), Fe = (e, t) => At.get(e ? `slideover.${t}` : `modal.${t}`);
function cr(e) {
  typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch((t) => setTimeout(() => {
    throw t;
  }));
}
function et() {
  let e = [], t = { addEventListener(r, n, o, a) {
    return r.addEventListener(n, o, a), t.add(() => r.removeEventListener(n, o, a));
  }, requestAnimationFrame(...r) {
    let n = requestAnimationFrame(...r);
    t.add(() => cancelAnimationFrame(n));
  }, nextFrame(...r) {
    t.requestAnimationFrame(() => {
      t.requestAnimationFrame(...r);
    });
  }, setTimeout(...r) {
    let n = setTimeout(...r);
    t.add(() => clearTimeout(n));
  }, microTask(...r) {
    let n = { current: !0 };
    return cr(() => {
      n.current && r[0]();
    }), t.add(() => {
      n.current = !1;
    });
  }, style(r, n, o) {
    let a = r.style.getPropertyValue(n);
    return Object.assign(r.style, { [n]: o }), this.add(() => {
      Object.assign(r.style, { [n]: a });
    });
  }, group(r) {
    let n = et();
    return r(n), this.add(() => n.dispose());
  }, add(r) {
    return e.push(r), () => {
      let n = e.indexOf(r);
      if (n >= 0) for (let o of e.splice(n, 1)) o();
    };
  }, dispose() {
    for (let r of e.splice(0)) r();
  } };
  return t;
}
var Pr;
let ma = Symbol("headlessui.useid"), va = 0;
const Ce = (Pr = Er.useId) != null ? Pr : function() {
  return Er.inject(ma, () => `${++va}`)();
};
function I(e) {
  var t;
  if (e == null || e.value == null) return null;
  let r = (t = e.value.$el) != null ? t : e.value;
  return r instanceof Node ? r : null;
}
function ie(e, t, ...r) {
  if (e in t) {
    let o = t[e];
    return typeof o == "function" ? o(...r) : o;
  }
  let n = new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map((o) => `"${o}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(n, ie), n;
}
var ha = Object.defineProperty, ga = (e, t, r) => t in e ? ha(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Or = (e, t, r) => (ga(e, typeof t != "symbol" ? t + "" : t, r), r);
let ba = class {
  constructor() {
    Or(this, "current", this.detect()), Or(this, "currentId", 0);
  }
  set(t) {
    this.current !== t && (this.currentId = 0, this.current = t);
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
}, tt = new ba();
function Ue(e) {
  if (tt.isServer) return null;
  if (e instanceof Node) return e.ownerDocument;
  if (e != null && e.hasOwnProperty("value")) {
    let t = I(e);
    if (t) return t.ownerDocument;
  }
  return document;
}
let Vt = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var de = ((e) => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e))(de || {}), un = ((e) => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(un || {}), wa = ((e) => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(wa || {});
function Sa(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(Vt)).sort((t, r) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (r.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var sn = ((e) => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(sn || {});
function xa(e, t = 0) {
  var r;
  return e === ((r = Ue(e)) == null ? void 0 : r.body) ? !1 : ie(t, { 0() {
    return e.matches(Vt);
  }, 1() {
    let n = e;
    for (; n !== null; ) {
      if (n.matches(Vt)) return !0;
      n = n.parentElement;
    }
    return !1;
  } });
}
var Ea = ((e) => (e[e.Keyboard = 0] = "Keyboard", e[e.Mouse = 1] = "Mouse", e))(Ea || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (e) => {
  e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (e) => {
  e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
function Pe(e) {
  e == null || e.focus({ preventScroll: !0 });
}
let Pa = ["textarea", "input"].join(",");
function Oa(e) {
  var t, r;
  return (r = (t = e == null ? void 0 : e.matches) == null ? void 0 : t.call(e, Pa)) != null ? r : !1;
}
function Aa(e, t = (r) => r) {
  return e.slice().sort((r, n) => {
    let o = t(r), a = t(n);
    if (o === null || a === null) return 0;
    let l = o.compareDocumentPosition(a);
    return l & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : l & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function mt(e, t, { sorted: r = !0, relativeTo: n = null, skipElements: o = [] } = {}) {
  var a;
  let l = (a = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : document : e == null ? void 0 : e.ownerDocument) != null ? a : document, i = Array.isArray(e) ? r ? Aa(e) : e : Sa(e);
  o.length > 0 && i.length > 1 && (i = i.filter((s) => !o.includes(s))), n = n ?? l.activeElement;
  let u = (() => {
    if (t & 5) return 1;
    if (t & 10) return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), c = (() => {
    if (t & 1) return 0;
    if (t & 2) return Math.max(0, i.indexOf(n)) - 1;
    if (t & 4) return Math.max(0, i.indexOf(n)) + 1;
    if (t & 8) return i.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), f = t & 32 ? { preventScroll: !0 } : {}, v = 0, p = i.length, y;
  do {
    if (v >= p || v + p <= 0) return 0;
    let s = c + v;
    if (t & 16) s = (s + p) % p;
    else {
      if (s < 0) return 3;
      if (s >= p) return 1;
    }
    y = i[s], y == null || y.focus(f), v += u;
  } while (y !== l.activeElement);
  return t & 6 && Oa(y) && y.select(), 2;
}
function cn() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function $a() {
  return /Android/gi.test(window.navigator.userAgent);
}
function Ca() {
  return cn() || $a();
}
function st(e, t, r) {
  tt.isServer || te((n) => {
    document.addEventListener(e, t, r), n(() => document.removeEventListener(e, t, r));
  });
}
function fn(e, t, r) {
  tt.isServer || te((n) => {
    window.addEventListener(e, t, r), n(() => window.removeEventListener(e, t, r));
  });
}
function Ta(e, t, r = S(() => !0)) {
  function n(a, l) {
    if (!r.value || a.defaultPrevented) return;
    let i = l(a);
    if (i === null || !i.getRootNode().contains(i)) return;
    let u = function c(f) {
      return typeof f == "function" ? c(f()) : Array.isArray(f) || f instanceof Set ? f : [f];
    }(e);
    for (let c of u) {
      if (c === null) continue;
      let f = c instanceof HTMLElement ? c : I(c);
      if (f != null && f.contains(i) || a.composed && a.composedPath().includes(f)) return;
    }
    return !xa(i, sn.Loose) && i.tabIndex !== -1 && a.preventDefault(), t(a, i);
  }
  let o = g(null);
  st("pointerdown", (a) => {
    var l, i;
    r.value && (o.value = ((i = (l = a.composedPath) == null ? void 0 : l.call(a)) == null ? void 0 : i[0]) || a.target);
  }, !0), st("mousedown", (a) => {
    var l, i;
    r.value && (o.value = ((i = (l = a.composedPath) == null ? void 0 : l.call(a)) == null ? void 0 : i[0]) || a.target);
  }, !0), st("click", (a) => {
    Ca() || o.value && (n(a, () => o.value), o.value = null);
  }, !0), st("touchend", (a) => n(a, () => a.target instanceof HTMLElement ? a.target : null), !0), fn("blur", (a) => n(a, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), !0);
}
var bt = ((e) => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(bt || {}), pe = ((e) => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(pe || {});
function X({ visible: e = !0, features: t = 0, ourProps: r, theirProps: n, ...o }) {
  var a;
  let l = pn(n, r), i = Object.assign(o, { props: l });
  if (e || t & 2 && l.static) return Ft(i);
  if (t & 1) {
    let u = (a = l.unmount) == null || a ? 0 : 1;
    return ie(u, { 0() {
      return null;
    }, 1() {
      return Ft({ ...o, props: { ...l, hidden: !0, style: { display: "none" } } });
    } });
  }
  return Ft(i);
}
function Ft({ props: e, attrs: t, slots: r, slot: n, name: o }) {
  var a, l;
  let { as: i, ...u } = yn(e, ["unmount", "static"]), c = (a = r.default) == null ? void 0 : a.call(r, n), f = {};
  if (n) {
    let v = !1, p = [];
    for (let [y, s] of Object.entries(n)) typeof s == "boolean" && (v = !0), s === !0 && p.push(y);
    v && (f["data-headlessui-state"] = p.join(" "));
  }
  if (i === "template") {
    if (c = dn(c ?? []), Object.keys(u).length > 0 || Object.keys(t).length > 0) {
      let [v, ...p] = c ?? [];
      if (!Fa(v) || p.length > 0) throw new Error(['Passing props on "template"!', "", `The current component <${o} /> is rendering a "template".`, "However we need to passthrough the following props:", Object.keys(u).concat(Object.keys(t)).map((d) => d.trim()).filter((d, m, b) => b.indexOf(d) === m).sort((d, m) => d.localeCompare(m)).map((d) => `  - ${d}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".', "Render a single element as the child so that we can forward the props onto that element."].map((d) => `  - ${d}`).join(`
`)].join(`
`));
      let y = pn((l = v.props) != null ? l : {}, u, f), s = na(v, y, !0);
      for (let d in y) d.startsWith("on") && (s.props || (s.props = {}), s.props[d] = y[d]);
      return s;
    }
    return Array.isArray(c) && c.length === 1 ? c[0] : c;
  }
  return B(i, Object.assign({}, u, f), { default: () => c });
}
function dn(e) {
  return e.flatMap((t) => t.type === sr ? dn(t.children) : [t]);
}
function pn(...e) {
  if (e.length === 0) return {};
  if (e.length === 1) return e[0];
  let t = {}, r = {};
  for (let n of e) for (let o in n) o.startsWith("on") && typeof n[o] == "function" ? (r[o] != null || (r[o] = []), r[o].push(n[o])) : t[o] = n[o];
  if (t.disabled || t["aria-disabled"]) return Object.assign(t, Object.fromEntries(Object.keys(r).map((n) => [n, void 0])));
  for (let n in r) Object.assign(t, { [n](o, ...a) {
    let l = r[n];
    for (let i of l) {
      if (o instanceof Event && o.defaultPrevented) return;
      i(o, ...a);
    }
  } });
  return t;
}
function yn(e, t = []) {
  let r = Object.assign({}, e);
  for (let n of t) n in r && delete r[n];
  return r;
}
function Fa(e) {
  return e == null ? !1 : typeof e.type == "string" || typeof e.type == "object" || typeof e.type == "function";
}
var wt = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(wt || {});
let zt = G({ name: "Hidden", props: { as: { type: [Object, String], default: "div" }, features: { type: Number, default: 1 } }, setup(e, { slots: t, attrs: r }) {
  return () => {
    var n;
    let { features: o, ...a } = e, l = { "aria-hidden": (o & 2) === 2 ? !0 : (n = a["aria-hidden"]) != null ? n : void 0, hidden: (o & 4) === 4 ? !0 : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(o & 4) === 4 && (o & 2) !== 2 && { display: "none" } } };
    return X({ ourProps: l, theirProps: a, slot: {}, attrs: r, slots: t, name: "Hidden" });
  };
} }), mn = Symbol("Context");
var K = ((e) => (e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(K || {});
function Ma() {
  return fr() !== null;
}
function fr() {
  return Q(mn, null);
}
function Ia(e) {
  Z(mn, e);
}
var vn = ((e) => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(vn || {});
function Da(e) {
  function t() {
    document.readyState !== "loading" && (e(), document.removeEventListener("DOMContentLoaded", t));
  }
  typeof window < "u" && typeof document < "u" && (document.addEventListener("DOMContentLoaded", t), t());
}
let he = [];
Da(() => {
  function e(t) {
    t.target instanceof HTMLElement && t.target !== document.body && he[0] !== t.target && (he.unshift(t.target), he = he.filter((r) => r != null && r.isConnected), he.splice(10));
  }
  window.addEventListener("click", e, { capture: !0 }), window.addEventListener("mousedown", e, { capture: !0 }), window.addEventListener("focus", e, { capture: !0 }), document.body.addEventListener("click", e, { capture: !0 }), document.body.addEventListener("mousedown", e, { capture: !0 }), document.body.addEventListener("focus", e, { capture: !0 });
});
function hn(e, t, r, n) {
  tt.isServer || te((o) => {
    e = e ?? window, e.addEventListener(t, r, n), o(() => e.removeEventListener(t, r, n));
  });
}
var ze = ((e) => (e[e.Forwards = 0] = "Forwards", e[e.Backwards = 1] = "Backwards", e))(ze || {});
function La() {
  let e = g(0);
  return fn("keydown", (t) => {
    t.key === "Tab" && (e.value = t.shiftKey ? 1 : 0);
  }), e;
}
function gn(e) {
  if (!e) return /* @__PURE__ */ new Set();
  if (typeof e == "function") return new Set(e());
  let t = /* @__PURE__ */ new Set();
  for (let r of e.value) {
    let n = I(r);
    n instanceof HTMLElement && t.add(n);
  }
  return t;
}
var bn = ((e) => (e[e.None = 1] = "None", e[e.InitialFocus = 2] = "InitialFocus", e[e.TabLock = 4] = "TabLock", e[e.FocusLock = 8] = "FocusLock", e[e.RestoreFocus = 16] = "RestoreFocus", e[e.All = 30] = "All", e))(bn || {});
let qe = Object.assign(G({ name: "FocusTrap", props: { as: { type: [Object, String], default: "div" }, initialFocus: { type: Object, default: null }, features: { type: Number, default: 30 }, containers: { type: [Object, Function], default: g(/* @__PURE__ */ new Set()) } }, inheritAttrs: !1, setup(e, { attrs: t, slots: r, expose: n }) {
  let o = g(null);
  n({ el: o, $el: o });
  let a = S(() => Ue(o)), l = g(!1);
  W(() => l.value = !0), q(() => l.value = !1), Na({ ownerDocument: a }, S(() => l.value && !!(e.features & 16)));
  let i = ka({ ownerDocument: a, container: o, initialFocus: S(() => e.initialFocus) }, S(() => l.value && !!(e.features & 2)));
  Ba({ ownerDocument: a, container: o, containers: e.containers, previousActiveElement: i }, S(() => l.value && !!(e.features & 8)));
  let u = La();
  function c(y) {
    let s = I(o);
    s && ((d) => d())(() => {
      ie(u.value, { [ze.Forwards]: () => {
        mt(s, de.First, { skipElements: [y.relatedTarget] });
      }, [ze.Backwards]: () => {
        mt(s, de.Last, { skipElements: [y.relatedTarget] });
      } });
    });
  }
  let f = g(!1);
  function v(y) {
    y.key === "Tab" && (f.value = !0, requestAnimationFrame(() => {
      f.value = !1;
    }));
  }
  function p(y) {
    if (!l.value) return;
    let s = gn(e.containers);
    I(o) instanceof HTMLElement && s.add(I(o));
    let d = y.relatedTarget;
    d instanceof HTMLElement && d.dataset.headlessuiFocusGuard !== "true" && (wn(s, d) || (f.value ? mt(I(o), ie(u.value, { [ze.Forwards]: () => de.Next, [ze.Backwards]: () => de.Previous }) | de.WrapAround, { relativeTo: y.target }) : y.target instanceof HTMLElement && Pe(y.target)));
  }
  return () => {
    let y = {}, s = { ref: o, onKeydown: v, onFocusout: p }, { features: d, initialFocus: m, containers: b, ...E } = e;
    return B(sr, [!!(d & 4) && B(zt, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: c, features: wt.Focusable }), X({ ourProps: s, theirProps: { ...t, ...E }, slot: y, attrs: t, slots: r, name: "FocusTrap" }), !!(d & 4) && B(zt, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: c, features: wt.Focusable })]);
  };
} }), { features: bn });
function Ra(e) {
  let t = g(he.slice());
  return se([e], ([r], [n]) => {
    n === !0 && r === !1 ? cr(() => {
      t.value.splice(0);
    }) : n === !1 && r === !0 && (t.value = he.slice());
  }, { flush: "post" }), () => {
    var r;
    return (r = t.value.find((n) => n != null && n.isConnected)) != null ? r : null;
  };
}
function Na({ ownerDocument: e }, t) {
  let r = Ra(t);
  W(() => {
    te(() => {
      var n, o;
      t.value || ((n = e.value) == null ? void 0 : n.activeElement) === ((o = e.value) == null ? void 0 : o.body) && Pe(r());
    }, { flush: "post" });
  }), q(() => {
    t.value && Pe(r());
  });
}
function ka({ ownerDocument: e, container: t, initialFocus: r }, n) {
  let o = g(null), a = g(!1);
  return W(() => a.value = !0), q(() => a.value = !1), W(() => {
    se([t, r, n], (l, i) => {
      if (l.every((c, f) => (i == null ? void 0 : i[f]) === c) || !n.value) return;
      let u = I(t);
      u && cr(() => {
        var c, f;
        if (!a.value) return;
        let v = I(r), p = (c = e.value) == null ? void 0 : c.activeElement;
        if (v) {
          if (v === p) {
            o.value = p;
            return;
          }
        } else if (u.contains(p)) {
          o.value = p;
          return;
        }
        v ? Pe(v) : mt(u, de.First | de.NoScroll) === un.Error && console.warn("There are no focusable elements inside the <FocusTrap />"), o.value = (f = e.value) == null ? void 0 : f.activeElement;
      });
    }, { immediate: !0, flush: "post" });
  }), o;
}
function Ba({ ownerDocument: e, container: t, containers: r, previousActiveElement: n }, o) {
  var a;
  hn((a = e.value) == null ? void 0 : a.defaultView, "focus", (l) => {
    if (!o.value) return;
    let i = gn(r);
    I(t) instanceof HTMLElement && i.add(I(t));
    let u = n.value;
    if (!u) return;
    let c = l.target;
    c && c instanceof HTMLElement ? wn(i, c) ? (n.value = c, Pe(c)) : (l.preventDefault(), l.stopPropagation(), Pe(u)) : Pe(n.value);
  }, !0);
}
function wn(e, t) {
  for (let r of e) if (r.contains(t)) return !0;
  return !1;
}
function Wa(e) {
  let t = aa(e.getSnapshot());
  return q(e.subscribe(() => {
    t.value = e.getSnapshot();
  })), t;
}
function Ua(e, t) {
  let r = e(), n = /* @__PURE__ */ new Set();
  return { getSnapshot() {
    return r;
  }, subscribe(o) {
    return n.add(o), () => n.delete(o);
  }, dispatch(o, ...a) {
    let l = t[o].call(r, ...a);
    l && (r = l, n.forEach((i) => i()));
  } };
}
function ja() {
  let e;
  return { before({ doc: t }) {
    var r;
    let n = t.documentElement;
    e = ((r = t.defaultView) != null ? r : window).innerWidth - n.clientWidth;
  }, after({ doc: t, d: r }) {
    let n = t.documentElement, o = n.clientWidth - n.offsetWidth, a = e - o;
    r.style(n, "paddingRight", `${a}px`);
  } };
}
function _a() {
  return cn() ? { before({ doc: e, d: t, meta: r }) {
    function n(o) {
      return r.containers.flatMap((a) => a()).some((a) => a.contains(o));
    }
    t.microTask(() => {
      var o;
      if (window.getComputedStyle(e.documentElement).scrollBehavior !== "auto") {
        let i = et();
        i.style(e.documentElement, "scrollBehavior", "auto"), t.add(() => t.microTask(() => i.dispose()));
      }
      let a = (o = window.scrollY) != null ? o : window.pageYOffset, l = null;
      t.addEventListener(e, "click", (i) => {
        if (i.target instanceof HTMLElement) try {
          let u = i.target.closest("a");
          if (!u) return;
          let { hash: c } = new URL(u.href), f = e.querySelector(c);
          f && !n(f) && (l = f);
        } catch {
        }
      }, !0), t.addEventListener(e, "touchstart", (i) => {
        if (i.target instanceof HTMLElement) if (n(i.target)) {
          let u = i.target;
          for (; u.parentElement && n(u.parentElement); ) u = u.parentElement;
          t.style(u, "overscrollBehavior", "contain");
        } else t.style(i.target, "touchAction", "none");
      }), t.addEventListener(e, "touchmove", (i) => {
        if (i.target instanceof HTMLElement) {
          if (i.target.tagName === "INPUT") return;
          if (n(i.target)) {
            let u = i.target;
            for (; u.parentElement && u.dataset.headlessuiPortal !== "" && !(u.scrollHeight > u.clientHeight || u.scrollWidth > u.clientWidth); ) u = u.parentElement;
            u.dataset.headlessuiPortal === "" && i.preventDefault();
          } else i.preventDefault();
        }
      }, { passive: !1 }), t.add(() => {
        var i;
        let u = (i = window.scrollY) != null ? i : window.pageYOffset;
        a !== u && window.scrollTo(0, a), l && l.isConnected && (l.scrollIntoView({ block: "nearest" }), l = null);
      });
    });
  } } : {};
}
function Ha() {
  return { before({ doc: e, d: t }) {
    t.style(e.documentElement, "overflow", "hidden");
  } };
}
function qa(e) {
  let t = {};
  for (let r of e) Object.assign(t, r(t));
  return t;
}
let we = Ua(() => /* @__PURE__ */ new Map(), { PUSH(e, t) {
  var r;
  let n = (r = this.get(e)) != null ? r : { doc: e, count: 0, d: et(), meta: /* @__PURE__ */ new Set() };
  return n.count++, n.meta.add(t), this.set(e, n), this;
}, POP(e, t) {
  let r = this.get(e);
  return r && (r.count--, r.meta.delete(t)), this;
}, SCROLL_PREVENT({ doc: e, d: t, meta: r }) {
  let n = { doc: e, d: t, meta: qa(r) }, o = [_a(), ja(), Ha()];
  o.forEach(({ before: a }) => a == null ? void 0 : a(n)), o.forEach(({ after: a }) => a == null ? void 0 : a(n));
}, SCROLL_ALLOW({ d: e }) {
  e.dispose();
}, TEARDOWN({ doc: e }) {
  this.delete(e);
} });
we.subscribe(() => {
  let e = we.getSnapshot(), t = /* @__PURE__ */ new Map();
  for (let [r] of e) t.set(r, r.documentElement.style.overflow);
  for (let r of e.values()) {
    let n = t.get(r.doc) === "hidden", o = r.count !== 0;
    (o && !n || !o && n) && we.dispatch(r.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", r), r.count === 0 && we.dispatch("TEARDOWN", r);
  }
});
function Ga(e, t, r) {
  let n = Wa(we), o = S(() => {
    let a = e.value ? n.value.get(e.value) : void 0;
    return a ? a.count > 0 : !1;
  });
  return se([e, t], ([a, l], [i], u) => {
    if (!a || !l) return;
    we.dispatch("PUSH", a, r);
    let c = !1;
    u(() => {
      c || (we.dispatch("POP", i ?? a, r), c = !0);
    });
  }, { immediate: !0 }), o;
}
let Mt = /* @__PURE__ */ new Map(), Ge = /* @__PURE__ */ new Map();
function Ar(e, t = g(!0)) {
  te((r) => {
    var n;
    if (!t.value) return;
    let o = I(e);
    if (!o) return;
    r(function() {
      var l;
      if (!o) return;
      let i = (l = Ge.get(o)) != null ? l : 1;
      if (i === 1 ? Ge.delete(o) : Ge.set(o, i - 1), i !== 1) return;
      let u = Mt.get(o);
      u && (u["aria-hidden"] === null ? o.removeAttribute("aria-hidden") : o.setAttribute("aria-hidden", u["aria-hidden"]), o.inert = u.inert, Mt.delete(o));
    });
    let a = (n = Ge.get(o)) != null ? n : 0;
    Ge.set(o, a + 1), a === 0 && (Mt.set(o, { "aria-hidden": o.getAttribute("aria-hidden"), inert: o.inert }), o.setAttribute("aria-hidden", "true"), o.inert = !0);
  });
}
function Va({ defaultContainers: e = [], portals: t, mainTreeNodeRef: r } = {}) {
  let n = g(null), o = Ue(n);
  function a() {
    var l, i, u;
    let c = [];
    for (let f of e) f !== null && (f instanceof HTMLElement ? c.push(f) : "value" in f && f.value instanceof HTMLElement && c.push(f.value));
    if (t != null && t.value) for (let f of t.value) c.push(f);
    for (let f of (l = o == null ? void 0 : o.querySelectorAll("html > *, body > *")) != null ? l : []) f !== document.body && f !== document.head && f instanceof HTMLElement && f.id !== "headlessui-portal-root" && (f.contains(I(n)) || f.contains((u = (i = I(n)) == null ? void 0 : i.getRootNode()) == null ? void 0 : u.host) || c.some((v) => f.contains(v)) || c.push(f));
    return c;
  }
  return { resolveContainers: a, contains(l) {
    return a().some((i) => i.contains(l));
  }, mainTreeNodeRef: n, MainTreeNode() {
    return r != null ? null : B(zt, { features: wt.Hidden, ref: n });
  } };
}
let Sn = Symbol("ForcePortalRootContext");
function za() {
  return Q(Sn, !1);
}
let Kt = G({ name: "ForcePortalRoot", props: { as: { type: [Object, String], default: "template" }, force: { type: Boolean, default: !1 } }, setup(e, { slots: t, attrs: r }) {
  return Z(Sn, e.force), () => {
    let { force: n, ...o } = e;
    return X({ theirProps: o, ourProps: {}, slot: {}, slots: t, attrs: r, name: "ForcePortalRoot" });
  };
} }), xn = Symbol("StackContext");
var Qt = ((e) => (e[e.Add = 0] = "Add", e[e.Remove = 1] = "Remove", e))(Qt || {});
function Ka() {
  return Q(xn, () => {
  });
}
function Qa({ type: e, enabled: t, element: r, onUpdate: n }) {
  let o = Ka();
  function a(...l) {
    n == null || n(...l), o(...l);
  }
  W(() => {
    se(t, (l, i) => {
      l ? a(0, e, r) : i === !0 && a(1, e, r);
    }, { immediate: !0, flush: "sync" });
  }), q(() => {
    t.value && a(1, e, r);
  }), Z(xn, a);
}
let En = Symbol("DescriptionContext");
function Xa() {
  let e = Q(En, null);
  if (e === null) throw new Error("Missing parent");
  return e;
}
function Ja({ slot: e = g({}), name: t = "Description", props: r = {} } = {}) {
  let n = g([]);
  function o(a) {
    return n.value.push(a), () => {
      let l = n.value.indexOf(a);
      l !== -1 && n.value.splice(l, 1);
    };
  }
  return Z(En, { register: o, slot: e, name: t, props: r }), S(() => n.value.length > 0 ? n.value.join(" ") : void 0);
}
G({ name: "Description", props: { as: { type: [Object, String], default: "p" }, id: { type: String, default: null } }, setup(e, { attrs: t, slots: r }) {
  var n;
  let o = (n = e.id) != null ? n : `headlessui-description-${Ce()}`, a = Xa();
  return W(() => q(a.register(o))), () => {
    let { name: l = "Description", slot: i = g({}), props: u = {} } = a, { ...c } = e, f = { ...Object.entries(u).reduce((v, [p, y]) => Object.assign(v, { [p]: P(y) }), {}), id: o };
    return X({ ourProps: f, theirProps: c, slot: i.value, attrs: t, slots: r, name: l });
  };
} });
function Ya(e) {
  let t = Ue(e);
  if (!t) {
    if (e === null) return null;
    throw new Error(`[Headless UI]: Cannot find ownerDocument for contextElement: ${e}`);
  }
  let r = t.getElementById("headlessui-portal-root");
  if (r) return r;
  let n = t.createElement("div");
  return n.setAttribute("id", "headlessui-portal-root"), t.body.appendChild(n);
}
const Xt = /* @__PURE__ */ new WeakMap();
function Za(e) {
  var t;
  return (t = Xt.get(e)) != null ? t : 0;
}
function $r(e, t) {
  let r = t(Za(e));
  return r <= 0 ? Xt.delete(e) : Xt.set(e, r), r;
}
let Pn = G({ name: "Portal", props: { as: { type: [Object, String], default: "div" } }, setup(e, { slots: t, attrs: r }) {
  let n = g(null), o = S(() => Ue(n)), a = za(), l = Q(On, null), i = g(a === !0 || l == null ? Ya(n.value) : l.resolveTarget());
  i.value && $r(i.value, (p) => p + 1);
  let u = g(!1);
  W(() => {
    u.value = !0;
  }), te(() => {
    a || l != null && (i.value = l.resolveTarget());
  });
  let c = Q(Jt, null), f = !1, v = oa();
  return se(n, () => {
    if (f || !c) return;
    let p = I(n);
    p && (q(c.register(p), v), f = !0);
  }), q(() => {
    var p, y;
    let s = (p = o.value) == null ? void 0 : p.getElementById("headlessui-portal-root");
    !s || i.value !== s || $r(i.value, (d) => d - 1) || i.value.children.length > 0 || (y = i.value.parentElement) == null || y.removeChild(i.value);
  }), () => {
    if (!u.value || i.value === null) return null;
    let p = { ref: n, "data-headlessui-portal": "" };
    return B(la, { to: i.value }, X({ ourProps: p, theirProps: e, slot: {}, attrs: r, slots: t, name: "Portal" }));
  };
} }), Jt = Symbol("PortalParentContext");
function eo() {
  let e = Q(Jt, null), t = g([]);
  function r(a) {
    return t.value.push(a), e && e.register(a), () => n(a);
  }
  function n(a) {
    let l = t.value.indexOf(a);
    l !== -1 && t.value.splice(l, 1), e && e.unregister(a);
  }
  let o = { register: r, unregister: n, portals: t };
  return [t, G({ name: "PortalWrapper", setup(a, { slots: l }) {
    return Z(Jt, o), () => {
      var i;
      return (i = l.default) == null ? void 0 : i.call(l);
    };
  } })];
}
let On = Symbol("PortalGroupContext"), to = G({ name: "PortalGroup", props: { as: { type: [Object, String], default: "template" }, target: { type: Object, default: null } }, setup(e, { attrs: t, slots: r }) {
  let n = ia({ resolveTarget() {
    return e.target;
  } });
  return Z(On, n), () => {
    let { target: o, ...a } = e;
    return X({ theirProps: a, ourProps: {}, slot: {}, attrs: t, slots: r, name: "PortalGroup" });
  };
} });
var ro = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(ro || {});
let Yt = Symbol("DialogContext");
function rt(e) {
  let t = Q(Yt, null);
  if (t === null) {
    let r = new Error(`<${e} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(r, rt), r;
  }
  return t;
}
let ct = "DC8F892D-2EBD-447C-A4C8-A03058436FF4", no = G({ name: "Dialog", inheritAttrs: !1, props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: !1 }, unmount: { type: Boolean, default: !0 }, open: { type: [Boolean, String], default: ct }, initialFocus: { type: Object, default: null }, id: { type: String, default: null }, role: { type: String, default: "dialog" } }, emits: { close: (e) => !0 }, setup(e, { emit: t, attrs: r, slots: n, expose: o }) {
  var a, l;
  let i = (a = e.id) != null ? a : `headlessui-dialog-${Ce()}`, u = g(!1);
  W(() => {
    u.value = !0;
  });
  let c = !1, f = S(() => e.role === "dialog" || e.role === "alertdialog" ? e.role : (c || (c = !0, console.warn(`Invalid role [${f}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog")), v = g(0), p = fr(), y = S(() => e.open === ct && p !== null ? (p.value & K.Open) === K.Open : e.open), s = g(null), d = S(() => Ue(s));
  if (o({ el: s, $el: s }), !(e.open !== ct || p !== null)) throw new Error("You forgot to provide an `open` prop to the `Dialog`.");
  if (typeof y.value != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${y.value === ct ? void 0 : e.open}`);
  let m = S(() => u.value && y.value ? 0 : 1), b = S(() => m.value === 0), E = S(() => v.value > 1), h = Q(Yt, null) !== null, [x, A] = eo(), { resolveContainers: $, mainTreeNodeRef: L, MainTreeNode: k } = Va({ portals: x, defaultContainers: [S(() => {
    var O;
    return (O = ne.panelRef.value) != null ? O : s.value;
  })] }), ee = S(() => E.value ? "parent" : "leaf"), V = S(() => p !== null ? (p.value & K.Closing) === K.Closing : !1), ce = S(() => h || V.value ? !1 : b.value), re = S(() => {
    var O, M, J;
    return (J = Array.from((M = (O = d.value) == null ? void 0 : O.querySelectorAll("body > *")) != null ? M : []).find((Y) => Y.id === "headlessui-portal-root" ? !1 : Y.contains(I(L)) && Y instanceof HTMLElement)) != null ? J : null;
  });
  Ar(re, ce);
  let T = S(() => E.value ? !0 : b.value), _ = S(() => {
    var O, M, J;
    return (J = Array.from((M = (O = d.value) == null ? void 0 : O.querySelectorAll("[data-headlessui-portal]")) != null ? M : []).find((Y) => Y.contains(I(L)) && Y instanceof HTMLElement)) != null ? J : null;
  });
  Ar(_, T), Qa({ type: "Dialog", enabled: S(() => m.value === 0), element: s, onUpdate: (O, M) => {
    if (M === "Dialog") return ie(O, { [Qt.Add]: () => v.value += 1, [Qt.Remove]: () => v.value -= 1 });
  } });
  let R = Ja({ name: "DialogDescription", slot: S(() => ({ open: y.value })) }), j = g(null), ne = { titleId: j, panelRef: g(null), dialogState: m, setTitleId(O) {
    j.value !== O && (j.value = O);
  }, close() {
    t("close", !1);
  } };
  Z(Yt, ne);
  let lt = S(() => !(!b.value || E.value));
  Ta($, (O, M) => {
    O.preventDefault(), ne.close(), tn(() => M == null ? void 0 : M.focus());
  }, lt);
  let He = S(() => !(E.value || m.value !== 0));
  hn((l = d.value) == null ? void 0 : l.defaultView, "keydown", (O) => {
    He.value && (O.defaultPrevented || O.key === vn.Escape && (O.preventDefault(), O.stopPropagation(), ne.close()));
  });
  let Te = S(() => !(V.value || m.value !== 0 || h));
  return Ga(d, Te, (O) => {
    var M;
    return { containers: [...(M = O.containers) != null ? M : [], $] };
  }), te((O) => {
    if (m.value !== 0) return;
    let M = I(s);
    if (!M) return;
    let J = new ResizeObserver((Y) => {
      for (let Tt of Y) {
        let it = Tt.target.getBoundingClientRect();
        it.x === 0 && it.y === 0 && it.width === 0 && it.height === 0 && ne.close();
      }
    });
    J.observe(M), O(() => J.disconnect());
  }), () => {
    let { open: O, initialFocus: M, ...J } = e, Y = { ...r, ref: s, id: i, role: f.value, "aria-modal": m.value === 0 ? !0 : void 0, "aria-labelledby": j.value, "aria-describedby": R.value }, Tt = { open: m.value === 0 };
    return B(Kt, { force: !0 }, () => [B(Pn, () => B(to, { target: s.value }, () => B(Kt, { force: !1 }, () => B(qe, { initialFocus: M, containers: $, features: b.value ? ie(ee.value, { parent: qe.features.RestoreFocus, leaf: qe.features.All & ~qe.features.FocusLock }) : qe.features.None }, () => B(A, {}, () => X({ ourProps: Y, theirProps: { ...J, ...r }, slot: Tt, attrs: r, slots: n, visible: m.value === 0, features: bt.RenderStrategy | bt.Static, name: "Dialog" })))))), B(k)]);
  };
} });
G({ name: "DialogOverlay", props: { as: { type: [Object, String], default: "div" }, id: { type: String, default: null } }, setup(e, { attrs: t, slots: r }) {
  var n;
  let o = (n = e.id) != null ? n : `headlessui-dialog-overlay-${Ce()}`, a = rt("DialogOverlay");
  function l(i) {
    i.target === i.currentTarget && (i.preventDefault(), i.stopPropagation(), a.close());
  }
  return () => {
    let { ...i } = e;
    return X({ ourProps: { id: o, "aria-hidden": !0, onClick: l }, theirProps: i, slot: { open: a.dialogState.value === 0 }, attrs: t, slots: r, name: "DialogOverlay" });
  };
} });
G({ name: "DialogBackdrop", props: { as: { type: [Object, String], default: "div" }, id: { type: String, default: null } }, inheritAttrs: !1, setup(e, { attrs: t, slots: r, expose: n }) {
  var o;
  let a = (o = e.id) != null ? o : `headlessui-dialog-backdrop-${Ce()}`, l = rt("DialogBackdrop"), i = g(null);
  return n({ el: i, $el: i }), W(() => {
    if (l.panelRef.value === null) throw new Error("A <DialogBackdrop /> component is being used, but a <DialogPanel /> component is missing.");
  }), () => {
    let { ...u } = e, c = { id: a, ref: i, "aria-hidden": !0 };
    return B(Kt, { force: !0 }, () => B(Pn, () => X({ ourProps: c, theirProps: { ...t, ...u }, slot: { open: l.dialogState.value === 0 }, attrs: t, slots: r, name: "DialogBackdrop" })));
  };
} });
let An = G({ name: "DialogPanel", props: { as: { type: [Object, String], default: "div" }, id: { type: String, default: null } }, setup(e, { attrs: t, slots: r, expose: n }) {
  var o;
  let a = (o = e.id) != null ? o : `headlessui-dialog-panel-${Ce()}`, l = rt("DialogPanel");
  n({ el: l.panelRef, $el: l.panelRef });
  function i(u) {
    u.stopPropagation();
  }
  return () => {
    let { ...u } = e, c = { id: a, ref: l.panelRef, onClick: i };
    return X({ ourProps: c, theirProps: u, slot: { open: l.dialogState.value === 0 }, attrs: t, slots: r, name: "DialogPanel" });
  };
} });
G({ name: "DialogTitle", props: { as: { type: [Object, String], default: "h2" }, id: { type: String, default: null } }, setup(e, { attrs: t, slots: r }) {
  var n;
  let o = (n = e.id) != null ? n : `headlessui-dialog-title-${Ce()}`, a = rt("DialogTitle");
  return W(() => {
    a.setTitleId(o), q(() => a.setTitleId(null));
  }), () => {
    let { ...l } = e;
    return X({ ourProps: { id: o }, theirProps: l, slot: { open: a.dialogState.value === 0 }, attrs: t, slots: r, name: "DialogTitle" });
  };
} });
function ao(e) {
  let t = { called: !1 };
  return (...r) => {
    if (!t.called) return t.called = !0, e(...r);
  };
}
function It(e, ...t) {
  e && t.length > 0 && e.classList.add(...t);
}
function ft(e, ...t) {
  e && t.length > 0 && e.classList.remove(...t);
}
var Zt = ((e) => (e.Finished = "finished", e.Cancelled = "cancelled", e))(Zt || {});
function oo(e, t) {
  let r = et();
  if (!e) return r.dispose;
  let { transitionDuration: n, transitionDelay: o } = getComputedStyle(e), [a, l] = [n, o].map((i) => {
    let [u = 0] = i.split(",").filter(Boolean).map((c) => c.includes("ms") ? parseFloat(c) : parseFloat(c) * 1e3).sort((c, f) => f - c);
    return u;
  });
  return a !== 0 ? r.setTimeout(() => t("finished"), a + l) : t("finished"), r.add(() => t("cancelled")), r.dispose;
}
function Cr(e, t, r, n, o, a) {
  let l = et(), i = a !== void 0 ? ao(a) : () => {
  };
  return ft(e, ...o), It(e, ...t, ...r), l.nextFrame(() => {
    ft(e, ...r), It(e, ...n), l.add(oo(e, (u) => (ft(e, ...n, ...t), It(e, ...o), i(u))));
  }), l.add(() => ft(e, ...t, ...r, ...n, ...o)), l.add(() => i("cancelled")), l.dispose;
}
function ve(e = "") {
  return e.split(/\s+/).filter((t) => t.length > 1);
}
let dr = Symbol("TransitionContext");
var lo = ((e) => (e.Visible = "visible", e.Hidden = "hidden", e))(lo || {});
function io() {
  return Q(dr, null) !== null;
}
function uo() {
  let e = Q(dr, null);
  if (e === null) throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  return e;
}
function so() {
  let e = Q(pr, null);
  if (e === null) throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  return e;
}
let pr = Symbol("NestingContext");
function $t(e) {
  return "children" in e ? $t(e.children) : e.value.filter(({ state: t }) => t === "visible").length > 0;
}
function $n(e) {
  let t = g([]), r = g(!1);
  W(() => r.value = !0), q(() => r.value = !1);
  function n(a, l = pe.Hidden) {
    let i = t.value.findIndex(({ id: u }) => u === a);
    i !== -1 && (ie(l, { [pe.Unmount]() {
      t.value.splice(i, 1);
    }, [pe.Hidden]() {
      t.value[i].state = "hidden";
    } }), !$t(t) && r.value && (e == null || e()));
  }
  function o(a) {
    let l = t.value.find(({ id: i }) => i === a);
    return l ? l.state !== "visible" && (l.state = "visible") : t.value.push({ id: a, state: "visible" }), () => n(a, pe.Unmount);
  }
  return { children: t, register: o, unregister: n };
}
let Cn = bt.RenderStrategy, Ct = G({ props: { as: { type: [Object, String], default: "div" }, show: { type: [Boolean], default: null }, unmount: { type: [Boolean], default: !0 }, appear: { type: [Boolean], default: !1 }, enter: { type: [String], default: "" }, enterFrom: { type: [String], default: "" }, enterTo: { type: [String], default: "" }, entered: { type: [String], default: "" }, leave: { type: [String], default: "" }, leaveFrom: { type: [String], default: "" }, leaveTo: { type: [String], default: "" } }, emits: { beforeEnter: () => !0, afterEnter: () => !0, beforeLeave: () => !0, afterLeave: () => !0 }, setup(e, { emit: t, attrs: r, slots: n, expose: o }) {
  let a = g(0);
  function l() {
    a.value |= K.Opening, t("beforeEnter");
  }
  function i() {
    a.value &= ~K.Opening, t("afterEnter");
  }
  function u() {
    a.value |= K.Closing, t("beforeLeave");
  }
  function c() {
    a.value &= ~K.Closing, t("afterLeave");
  }
  if (!io() && Ma()) return () => B(Tn, { ...e, onBeforeEnter: l, onAfterEnter: i, onBeforeLeave: u, onAfterLeave: c }, n);
  let f = g(null), v = S(() => e.unmount ? pe.Unmount : pe.Hidden);
  o({ el: f, $el: f });
  let { show: p, appear: y } = uo(), { register: s, unregister: d } = so(), m = g(p.value ? "visible" : "hidden"), b = { value: !0 }, E = Ce(), h = { value: !1 }, x = $n(() => {
    !h.value && m.value !== "hidden" && (m.value = "hidden", d(E), c());
  });
  W(() => {
    let T = s(E);
    q(T);
  }), te(() => {
    if (v.value === pe.Hidden && E) {
      if (p.value && m.value !== "visible") {
        m.value = "visible";
        return;
      }
      ie(m.value, { hidden: () => d(E), visible: () => s(E) });
    }
  });
  let A = ve(e.enter), $ = ve(e.enterFrom), L = ve(e.enterTo), k = ve(e.entered), ee = ve(e.leave), V = ve(e.leaveFrom), ce = ve(e.leaveTo);
  W(() => {
    te(() => {
      if (m.value === "visible") {
        let T = I(f);
        if (T instanceof Comment && T.data === "") throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
      }
    });
  });
  function re(T) {
    let _ = b.value && !y.value, R = I(f);
    !R || !(R instanceof HTMLElement) || _ || (h.value = !0, p.value && l(), p.value || u(), T(p.value ? Cr(R, A, $, L, k, (j) => {
      h.value = !1, j === Zt.Finished && i();
    }) : Cr(R, ee, V, ce, k, (j) => {
      h.value = !1, j === Zt.Finished && ($t(x) || (m.value = "hidden", d(E), c()));
    })));
  }
  return W(() => {
    se([p], (T, _, R) => {
      re(R), b.value = !1;
    }, { immediate: !0 });
  }), Z(pr, x), Ia(S(() => ie(m.value, { visible: K.Open, hidden: K.Closed }) | a.value)), () => {
    let { appear: T, show: _, enter: R, enterFrom: j, enterTo: ne, entered: lt, leave: He, leaveFrom: Te, leaveTo: O, ...M } = e, J = { ref: f }, Y = { ...M, ...y.value && p.value && tt.isServer ? { class: Se([r.class, M.class, ...A, ...$]) } : {} };
    return X({ theirProps: Y, ourProps: J, slot: {}, slots: n, attrs: r, features: Cn, visible: m.value === "visible", name: "TransitionChild" });
  };
} }), co = Ct, Tn = G({ inheritAttrs: !1, props: { as: { type: [Object, String], default: "div" }, show: { type: [Boolean], default: null }, unmount: { type: [Boolean], default: !0 }, appear: { type: [Boolean], default: !1 }, enter: { type: [String], default: "" }, enterFrom: { type: [String], default: "" }, enterTo: { type: [String], default: "" }, entered: { type: [String], default: "" }, leave: { type: [String], default: "" }, leaveFrom: { type: [String], default: "" }, leaveTo: { type: [String], default: "" } }, emits: { beforeEnter: () => !0, afterEnter: () => !0, beforeLeave: () => !0, afterLeave: () => !0 }, setup(e, { emit: t, attrs: r, slots: n }) {
  let o = fr(), a = S(() => e.show === null && o !== null ? (o.value & K.Open) === K.Open : e.show);
  te(() => {
    if (![!0, !1].includes(a.value)) throw new Error('A <Transition /> is used but it is missing a `:show="true | false"` prop.');
  });
  let l = g(a.value ? "visible" : "hidden"), i = $n(() => {
    l.value = "hidden";
  }), u = g(!0), c = { show: a, appear: S(() => e.appear || !u.value) };
  return W(() => {
    te(() => {
      u.value = !1, a.value ? l.value = "visible" : $t(i) || (l.value = "hidden");
    });
  }), Z(pr, i), Z(dr, c), () => {
    let f = yn(e, ["show", "appear", "unmount", "onBeforeEnter", "onBeforeLeave", "onAfterEnter", "onAfterLeave"]), v = { unmount: e.unmount };
    return X({ ourProps: { ...v, as: "template" }, theirProps: {}, slot: {}, slots: { ...n, default: () => [B(co, { onBeforeEnter: () => t("beforeEnter"), onAfterEnter: () => t("afterEnter"), onBeforeLeave: () => t("beforeLeave"), onAfterLeave: () => t("afterLeave"), ...r, ...v, ...f }, n.default)] }, attrs: {}, features: Cn, visible: l.value === "visible", name: "Transition" });
  };
} });
function fo(e, t) {
  return Array.isArray(e) ? e.filter((r) => !t.includes(r)) : Object.keys(e).reduce((r, n) => (t.includes(n) || (r[n] = e[n]), r), {});
}
function Fn(e, t) {
  return Array.isArray(e) ? e.filter((r) => t.includes(r)) : t.reduce((r, n) => (n in e && (r[n] = e[n]), r), {});
}
function po(e) {
  return Array.isArray(e) ? e.filter((t) => t !== null) : Object.keys(e).reduce((t, r) => (r in e && e[r] !== null && (t[r] = e[r]), t), {});
}
function yo(e, t = 3, r = 10) {
  return new Promise((n, o) => {
    const a = e();
    if (a) {
      n(a);
      return;
    }
    let l = t * 1e3 / r;
    const i = setInterval(() => {
      const u = e();
      u && (clearInterval(i), n(u)), --l <= 0 && (clearInterval(i), o(new Error("Condition not met in time")));
    }, r);
  });
}
var er = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function mo(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function vo(e) {
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
var ho = function(t) {
  return go(t) && !bo(t);
};
function go(e) {
  return !!e && typeof e == "object";
}
function bo(e) {
  var t = Object.prototype.toString.call(e);
  return t === "[object RegExp]" || t === "[object Date]" || xo(e);
}
var wo = typeof Symbol == "function" && Symbol.for, So = wo ? Symbol.for("react.element") : 60103;
function xo(e) {
  return e.$$typeof === So;
}
function Eo(e) {
  return Array.isArray(e) ? [] : {};
}
function Ye(e, t) {
  return t.clone !== !1 && t.isMergeableObject(e) ? Ne(Eo(e), e, t) : e;
}
function Po(e, t, r) {
  return e.concat(t).map(function(n) {
    return Ye(n, r);
  });
}
function Oo(e, t) {
  if (!t.customMerge)
    return Ne;
  var r = t.customMerge(e);
  return typeof r == "function" ? r : Ne;
}
function Ao(e) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter(function(t) {
    return Object.propertyIsEnumerable.call(e, t);
  }) : [];
}
function Tr(e) {
  return Object.keys(e).concat(Ao(e));
}
function Mn(e, t) {
  try {
    return t in e;
  } catch {
    return !1;
  }
}
function $o(e, t) {
  return Mn(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t));
}
function Co(e, t, r) {
  var n = {};
  return r.isMergeableObject(e) && Tr(e).forEach(function(o) {
    n[o] = Ye(e[o], r);
  }), Tr(t).forEach(function(o) {
    $o(e, o) || (Mn(e, o) && r.isMergeableObject(t[o]) ? n[o] = Oo(o, r)(e[o], t[o], r) : n[o] = Ye(t[o], r));
  }), n;
}
function Ne(e, t, r) {
  r = r || {}, r.arrayMerge = r.arrayMerge || Po, r.isMergeableObject = r.isMergeableObject || ho, r.cloneUnlessOtherwiseSpecified = Ye;
  var n = Array.isArray(t), o = Array.isArray(e), a = n === o;
  return a ? n ? r.arrayMerge(e, t, r) : Co(e, t, r) : Ye(t, r);
}
Ne.all = function(t, r) {
  if (!Array.isArray(t))
    throw new Error("first argument should be an array");
  return t.reduce(function(n, o) {
    return Ne(n, o, r);
  }, {});
};
var To = Ne, Fo = To;
const Mo = /* @__PURE__ */ mo(Fo);
var Io = Error, Do = EvalError, Lo = RangeError, Ro = ReferenceError, In = SyntaxError, nt = TypeError, No = URIError, ko = function() {
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
  var a = Object.getOwnPropertySymbols(t);
  if (a.length !== 1 || a[0] !== r || !Object.prototype.propertyIsEnumerable.call(t, r))
    return !1;
  if (typeof Object.getOwnPropertyDescriptor == "function") {
    var l = Object.getOwnPropertyDescriptor(t, r);
    if (l.value !== o || l.enumerable !== !0)
      return !1;
  }
  return !0;
}, Fr = typeof Symbol < "u" && Symbol, Bo = ko, Wo = function() {
  return typeof Fr != "function" || typeof Symbol != "function" || typeof Fr("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : Bo();
}, Dt = {
  __proto__: null,
  foo: {}
}, Uo = Object, jo = function() {
  return { __proto__: Dt }.foo === Dt.foo && !(Dt instanceof Uo);
}, _o = "Function.prototype.bind called on incompatible ", Ho = Object.prototype.toString, qo = Math.max, Go = "[object Function]", Mr = function(t, r) {
  for (var n = [], o = 0; o < t.length; o += 1)
    n[o] = t[o];
  for (var a = 0; a < r.length; a += 1)
    n[a + t.length] = r[a];
  return n;
}, Vo = function(t, r) {
  for (var n = [], o = r, a = 0; o < t.length; o += 1, a += 1)
    n[a] = t[o];
  return n;
}, zo = function(e, t) {
  for (var r = "", n = 0; n < e.length; n += 1)
    r += e[n], n + 1 < e.length && (r += t);
  return r;
}, Ko = function(t) {
  var r = this;
  if (typeof r != "function" || Ho.apply(r) !== Go)
    throw new TypeError(_o + r);
  for (var n = Vo(arguments, 1), o, a = function() {
    if (this instanceof o) {
      var f = r.apply(
        this,
        Mr(n, arguments)
      );
      return Object(f) === f ? f : this;
    }
    return r.apply(
      t,
      Mr(n, arguments)
    );
  }, l = qo(0, r.length - n.length), i = [], u = 0; u < l; u++)
    i[u] = "$" + u;
  if (o = Function("binder", "return function (" + zo(i, ",") + "){ return binder.apply(this,arguments); }")(a), r.prototype) {
    var c = function() {
    };
    c.prototype = r.prototype, o.prototype = new c(), c.prototype = null;
  }
  return o;
}, Qo = Ko, yr = Function.prototype.bind || Qo, Xo = Function.prototype.call, Jo = Object.prototype.hasOwnProperty, Yo = yr, Zo = Yo.call(Xo, Jo), w, el = Io, tl = Do, rl = Lo, nl = Ro, ke = In, Re = nt, al = No, Dn = Function, Lt = function(e) {
  try {
    return Dn('"use strict"; return (' + e + ").constructor;")();
  } catch {
  }
}, Oe = Object.getOwnPropertyDescriptor;
if (Oe)
  try {
    Oe({}, "");
  } catch {
    Oe = null;
  }
var Rt = function() {
  throw new Re();
}, ol = Oe ? function() {
  try {
    return arguments.callee, Rt;
  } catch {
    try {
      return Oe(arguments, "callee").get;
    } catch {
      return Rt;
    }
  }
}() : Rt, Me = Wo(), ll = jo(), N = Object.getPrototypeOf || (ll ? function(e) {
  return e.__proto__;
} : null), De = {}, il = typeof Uint8Array > "u" || !N ? w : N(Uint8Array), Ae = {
  __proto__: null,
  "%AggregateError%": typeof AggregateError > "u" ? w : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? w : ArrayBuffer,
  "%ArrayIteratorPrototype%": Me && N ? N([][Symbol.iterator]()) : w,
  "%AsyncFromSyncIteratorPrototype%": w,
  "%AsyncFunction%": De,
  "%AsyncGenerator%": De,
  "%AsyncGeneratorFunction%": De,
  "%AsyncIteratorPrototype%": De,
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
  "%Error%": el,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": tl,
  "%Float32Array%": typeof Float32Array > "u" ? w : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? w : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? w : FinalizationRegistry,
  "%Function%": Dn,
  "%GeneratorFunction%": De,
  "%Int8Array%": typeof Int8Array > "u" ? w : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? w : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? w : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": Me && N ? N(N([][Symbol.iterator]())) : w,
  "%JSON%": typeof JSON == "object" ? JSON : w,
  "%Map%": typeof Map > "u" ? w : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !Me || !N ? w : N((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": Object,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise > "u" ? w : Promise,
  "%Proxy%": typeof Proxy > "u" ? w : Proxy,
  "%RangeError%": rl,
  "%ReferenceError%": nl,
  "%Reflect%": typeof Reflect > "u" ? w : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? w : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !Me || !N ? w : N((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? w : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": Me && N ? N(""[Symbol.iterator]()) : w,
  "%Symbol%": Me ? Symbol : w,
  "%SyntaxError%": ke,
  "%ThrowTypeError%": ol,
  "%TypedArray%": il,
  "%TypeError%": Re,
  "%Uint8Array%": typeof Uint8Array > "u" ? w : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? w : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? w : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? w : Uint32Array,
  "%URIError%": al,
  "%WeakMap%": typeof WeakMap > "u" ? w : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? w : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? w : WeakSet
};
if (N)
  try {
    null.error;
  } catch (e) {
    var ul = N(N(e));
    Ae["%Error.prototype%"] = ul;
  }
var sl = function e(t) {
  var r;
  if (t === "%AsyncFunction%")
    r = Lt("async function () {}");
  else if (t === "%GeneratorFunction%")
    r = Lt("function* () {}");
  else if (t === "%AsyncGeneratorFunction%")
    r = Lt("async function* () {}");
  else if (t === "%AsyncGenerator%") {
    var n = e("%AsyncGeneratorFunction%");
    n && (r = n.prototype);
  } else if (t === "%AsyncIteratorPrototype%") {
    var o = e("%AsyncGenerator%");
    o && N && (r = N(o.prototype));
  }
  return Ae[t] = r, r;
}, Ir = {
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
}, at = yr, St = Zo, cl = at.call(Function.call, Array.prototype.concat), fl = at.call(Function.apply, Array.prototype.splice), Dr = at.call(Function.call, String.prototype.replace), xt = at.call(Function.call, String.prototype.slice), dl = at.call(Function.call, RegExp.prototype.exec), pl = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, yl = /\\(\\)?/g, ml = function(t) {
  var r = xt(t, 0, 1), n = xt(t, -1);
  if (r === "%" && n !== "%")
    throw new ke("invalid intrinsic syntax, expected closing `%`");
  if (n === "%" && r !== "%")
    throw new ke("invalid intrinsic syntax, expected opening `%`");
  var o = [];
  return Dr(t, pl, function(a, l, i, u) {
    o[o.length] = i ? Dr(u, yl, "$1") : l || a;
  }), o;
}, vl = function(t, r) {
  var n = t, o;
  if (St(Ir, n) && (o = Ir[n], n = "%" + o[0] + "%"), St(Ae, n)) {
    var a = Ae[n];
    if (a === De && (a = sl(n)), typeof a > "u" && !r)
      throw new Re("intrinsic " + t + " exists, but is not available. Please file an issue!");
    return {
      alias: o,
      name: n,
      value: a
    };
  }
  throw new ke("intrinsic " + t + " does not exist!");
}, je = function(t, r) {
  if (typeof t != "string" || t.length === 0)
    throw new Re("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof r != "boolean")
    throw new Re('"allowMissing" argument must be a boolean');
  if (dl(/^%?[^%]*%?$/, t) === null)
    throw new ke("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var n = ml(t), o = n.length > 0 ? n[0] : "", a = vl("%" + o + "%", r), l = a.name, i = a.value, u = !1, c = a.alias;
  c && (o = c[0], fl(n, cl([0, 1], c)));
  for (var f = 1, v = !0; f < n.length; f += 1) {
    var p = n[f], y = xt(p, 0, 1), s = xt(p, -1);
    if ((y === '"' || y === "'" || y === "`" || s === '"' || s === "'" || s === "`") && y !== s)
      throw new ke("property names with quotes must have matching quotes");
    if ((p === "constructor" || !v) && (u = !0), o += "." + p, l = "%" + o + "%", St(Ae, l))
      i = Ae[l];
    else if (i != null) {
      if (!(p in i)) {
        if (!r)
          throw new Re("base intrinsic for " + t + " exists, but the property is not available.");
        return;
      }
      if (Oe && f + 1 >= n.length) {
        var d = Oe(i, p);
        v = !!d, v && "get" in d && !("originalValue" in d.get) ? i = d.get : i = i[p];
      } else
        v = St(i, p), i = i[p];
      v && !u && (Ae[l] = i);
    }
  }
  return i;
}, Ln = { exports: {} }, Nt, Lr;
function mr() {
  if (Lr) return Nt;
  Lr = 1;
  var e = je, t = e("%Object.defineProperty%", !0) || !1;
  if (t)
    try {
      t({}, "a", { value: 1 });
    } catch {
      t = !1;
    }
  return Nt = t, Nt;
}
var hl = je, vt = hl("%Object.getOwnPropertyDescriptor%", !0);
if (vt)
  try {
    vt([], "length");
  } catch {
    vt = null;
  }
var Rn = vt, Rr = mr(), gl = In, Ie = nt, Nr = Rn, bl = function(t, r, n) {
  if (!t || typeof t != "object" && typeof t != "function")
    throw new Ie("`obj` must be an object or a function`");
  if (typeof r != "string" && typeof r != "symbol")
    throw new Ie("`property` must be a string or a symbol`");
  if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
    throw new Ie("`nonEnumerable`, if provided, must be a boolean or null");
  if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
    throw new Ie("`nonWritable`, if provided, must be a boolean or null");
  if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
    throw new Ie("`nonConfigurable`, if provided, must be a boolean or null");
  if (arguments.length > 6 && typeof arguments[6] != "boolean")
    throw new Ie("`loose`, if provided, must be a boolean");
  var o = arguments.length > 3 ? arguments[3] : null, a = arguments.length > 4 ? arguments[4] : null, l = arguments.length > 5 ? arguments[5] : null, i = arguments.length > 6 ? arguments[6] : !1, u = !!Nr && Nr(t, r);
  if (Rr)
    Rr(t, r, {
      configurable: l === null && u ? u.configurable : !l,
      enumerable: o === null && u ? u.enumerable : !o,
      value: n,
      writable: a === null && u ? u.writable : !a
    });
  else if (i || !o && !a && !l)
    t[r] = n;
  else
    throw new gl("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
}, tr = mr(), Nn = function() {
  return !!tr;
};
Nn.hasArrayLengthDefineBug = function() {
  if (!tr)
    return null;
  try {
    return tr([], "length", { value: 1 }).length !== 1;
  } catch {
    return !0;
  }
};
var wl = Nn, Sl = je, kr = bl, xl = wl(), Br = Rn, Wr = nt, El = Sl("%Math.floor%"), Pl = function(t, r) {
  if (typeof t != "function")
    throw new Wr("`fn` is not a function");
  if (typeof r != "number" || r < 0 || r > 4294967295 || El(r) !== r)
    throw new Wr("`length` must be a positive 32-bit integer");
  var n = arguments.length > 2 && !!arguments[2], o = !0, a = !0;
  if ("length" in t && Br) {
    var l = Br(t, "length");
    l && !l.configurable && (o = !1), l && !l.writable && (a = !1);
  }
  return (o || a || !n) && (xl ? kr(
    /** @type {Parameters<define>[0]} */
    t,
    "length",
    r,
    !0,
    !0
  ) : kr(
    /** @type {Parameters<define>[0]} */
    t,
    "length",
    r
  )), t;
};
(function(e) {
  var t = yr, r = je, n = Pl, o = nt, a = r("%Function.prototype.apply%"), l = r("%Function.prototype.call%"), i = r("%Reflect.apply%", !0) || t.call(l, a), u = mr(), c = r("%Math.max%");
  e.exports = function(p) {
    if (typeof p != "function")
      throw new o("a function is required");
    var y = i(t, l, arguments);
    return n(
      y,
      1 + c(0, p.length - (arguments.length - 1)),
      !0
    );
  };
  var f = function() {
    return i(t, a, arguments);
  };
  u ? u(e.exports, "apply", { value: f }) : e.exports.apply = f;
})(Ln);
var Ol = Ln.exports, kn = je, Bn = Ol, Al = Bn(kn("String.prototype.indexOf")), $l = function(t, r) {
  var n = kn(t, !!r);
  return typeof n == "function" && Al(t, ".prototype.") > -1 ? Bn(n) : n;
};
const Cl = {}, Tl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Cl
}, Symbol.toStringTag, { value: "Module" })), Fl = /* @__PURE__ */ vo(Tl);
var vr = typeof Map == "function" && Map.prototype, kt = Object.getOwnPropertyDescriptor && vr ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, Et = vr && kt && typeof kt.get == "function" ? kt.get : null, Ur = vr && Map.prototype.forEach, hr = typeof Set == "function" && Set.prototype, Bt = Object.getOwnPropertyDescriptor && hr ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, Pt = hr && Bt && typeof Bt.get == "function" ? Bt.get : null, jr = hr && Set.prototype.forEach, Ml = typeof WeakMap == "function" && WeakMap.prototype, Qe = Ml ? WeakMap.prototype.has : null, Il = typeof WeakSet == "function" && WeakSet.prototype, Xe = Il ? WeakSet.prototype.has : null, Dl = typeof WeakRef == "function" && WeakRef.prototype, _r = Dl ? WeakRef.prototype.deref : null, Ll = Boolean.prototype.valueOf, Rl = Object.prototype.toString, Nl = Function.prototype.toString, kl = String.prototype.match, gr = String.prototype.slice, ye = String.prototype.replace, Bl = String.prototype.toUpperCase, Hr = String.prototype.toLowerCase, Wn = RegExp.prototype.test, qr = Array.prototype.concat, le = Array.prototype.join, Wl = Array.prototype.slice, Gr = Math.floor, rr = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, Wt = Object.getOwnPropertySymbols, nr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, Be = typeof Symbol == "function" && typeof Symbol.iterator == "object", U = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === Be || !0) ? Symbol.toStringTag : null, Un = Object.prototype.propertyIsEnumerable, Vr = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(e) {
  return e.__proto__;
} : null);
function zr(e, t) {
  if (e === 1 / 0 || e === -1 / 0 || e !== e || e && e > -1e3 && e < 1e3 || Wn.call(/e/, t))
    return t;
  var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof e == "number") {
    var n = e < 0 ? -Gr(-e) : Gr(e);
    if (n !== e) {
      var o = String(n), a = gr.call(t, o.length + 1);
      return ye.call(o, r, "$&_") + "." + ye.call(ye.call(a, /([0-9]{3})/g, "$&_"), /_$/, "");
    }
  }
  return ye.call(t, r, "$&_");
}
var ar = Fl, Kr = ar.custom, Qr = _n(Kr) ? Kr : null, Ul = function e(t, r, n, o) {
  var a = r || {};
  if (fe(a, "quoteStyle") && a.quoteStyle !== "single" && a.quoteStyle !== "double")
    throw new TypeError('option "quoteStyle" must be "single" or "double"');
  if (fe(a, "maxStringLength") && (typeof a.maxStringLength == "number" ? a.maxStringLength < 0 && a.maxStringLength !== 1 / 0 : a.maxStringLength !== null))
    throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
  var l = fe(a, "customInspect") ? a.customInspect : !0;
  if (typeof l != "boolean" && l !== "symbol")
    throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
  if (fe(a, "indent") && a.indent !== null && a.indent !== "	" && !(parseInt(a.indent, 10) === a.indent && a.indent > 0))
    throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
  if (fe(a, "numericSeparator") && typeof a.numericSeparator != "boolean")
    throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
  var i = a.numericSeparator;
  if (typeof t > "u")
    return "undefined";
  if (t === null)
    return "null";
  if (typeof t == "boolean")
    return t ? "true" : "false";
  if (typeof t == "string")
    return qn(t, a);
  if (typeof t == "number") {
    if (t === 0)
      return 1 / 0 / t > 0 ? "0" : "-0";
    var u = String(t);
    return i ? zr(t, u) : u;
  }
  if (typeof t == "bigint") {
    var c = String(t) + "n";
    return i ? zr(t, c) : c;
  }
  var f = typeof a.depth > "u" ? 5 : a.depth;
  if (typeof n > "u" && (n = 0), n >= f && f > 0 && typeof t == "object")
    return or(t) ? "[Array]" : "[Object]";
  var v = ai(a, n);
  if (typeof o > "u")
    o = [];
  else if (Hn(o, t) >= 0)
    return "[Circular]";
  function p(T, _, R) {
    if (_ && (o = Wl.call(o), o.push(_)), R) {
      var j = {
        depth: a.depth
      };
      return fe(a, "quoteStyle") && (j.quoteStyle = a.quoteStyle), e(T, j, n + 1, o);
    }
    return e(T, a, n + 1, o);
  }
  if (typeof t == "function" && !Xr(t)) {
    var y = Ql(t), s = dt(t, p);
    return "[Function" + (y ? ": " + y : " (anonymous)") + "]" + (s.length > 0 ? " { " + le.call(s, ", ") + " }" : "");
  }
  if (_n(t)) {
    var d = Be ? ye.call(String(t), /^(Symbol\(.*\))_[^)]*$/, "$1") : nr.call(t);
    return typeof t == "object" && !Be ? Ve(d) : d;
  }
  if (ti(t)) {
    for (var m = "<" + Hr.call(String(t.nodeName)), b = t.attributes || [], E = 0; E < b.length; E++)
      m += " " + b[E].name + "=" + jn(jl(b[E].value), "double", a);
    return m += ">", t.childNodes && t.childNodes.length && (m += "..."), m += "</" + Hr.call(String(t.nodeName)) + ">", m;
  }
  if (or(t)) {
    if (t.length === 0)
      return "[]";
    var h = dt(t, p);
    return v && !ni(h) ? "[" + lr(h, v) + "]" : "[ " + le.call(h, ", ") + " ]";
  }
  if (Hl(t)) {
    var x = dt(t, p);
    return !("cause" in Error.prototype) && "cause" in t && !Un.call(t, "cause") ? "{ [" + String(t) + "] " + le.call(qr.call("[cause]: " + p(t.cause), x), ", ") + " }" : x.length === 0 ? "[" + String(t) + "]" : "{ [" + String(t) + "] " + le.call(x, ", ") + " }";
  }
  if (typeof t == "object" && l) {
    if (Qr && typeof t[Qr] == "function" && ar)
      return ar(t, { depth: f - n });
    if (l !== "symbol" && typeof t.inspect == "function")
      return t.inspect();
  }
  if (Xl(t)) {
    var A = [];
    return Ur && Ur.call(t, function(T, _) {
      A.push(p(_, t, !0) + " => " + p(T, t));
    }), Jr("Map", Et.call(t), A, v);
  }
  if (Zl(t)) {
    var $ = [];
    return jr && jr.call(t, function(T) {
      $.push(p(T, t));
    }), Jr("Set", Pt.call(t), $, v);
  }
  if (Jl(t))
    return Ut("WeakMap");
  if (ei(t))
    return Ut("WeakSet");
  if (Yl(t))
    return Ut("WeakRef");
  if (Gl(t))
    return Ve(p(Number(t)));
  if (zl(t))
    return Ve(p(rr.call(t)));
  if (Vl(t))
    return Ve(Ll.call(t));
  if (ql(t))
    return Ve(p(String(t)));
  if (typeof window < "u" && t === window)
    return "{ [object Window] }";
  if (typeof globalThis < "u" && t === globalThis || typeof er < "u" && t === er)
    return "{ [object globalThis] }";
  if (!_l(t) && !Xr(t)) {
    var L = dt(t, p), k = Vr ? Vr(t) === Object.prototype : t instanceof Object || t.constructor === Object, ee = t instanceof Object ? "" : "null prototype", V = !k && U && Object(t) === t && U in t ? gr.call(me(t), 8, -1) : ee ? "Object" : "", ce = k || typeof t.constructor != "function" ? "" : t.constructor.name ? t.constructor.name + " " : "", re = ce + (V || ee ? "[" + le.call(qr.call([], V || [], ee || []), ": ") + "] " : "");
    return L.length === 0 ? re + "{}" : v ? re + "{" + lr(L, v) + "}" : re + "{ " + le.call(L, ", ") + " }";
  }
  return String(t);
};
function jn(e, t, r) {
  var n = (r.quoteStyle || t) === "double" ? '"' : "'";
  return n + e + n;
}
function jl(e) {
  return ye.call(String(e), /"/g, "&quot;");
}
function or(e) {
  return me(e) === "[object Array]" && (!U || !(typeof e == "object" && U in e));
}
function _l(e) {
  return me(e) === "[object Date]" && (!U || !(typeof e == "object" && U in e));
}
function Xr(e) {
  return me(e) === "[object RegExp]" && (!U || !(typeof e == "object" && U in e));
}
function Hl(e) {
  return me(e) === "[object Error]" && (!U || !(typeof e == "object" && U in e));
}
function ql(e) {
  return me(e) === "[object String]" && (!U || !(typeof e == "object" && U in e));
}
function Gl(e) {
  return me(e) === "[object Number]" && (!U || !(typeof e == "object" && U in e));
}
function Vl(e) {
  return me(e) === "[object Boolean]" && (!U || !(typeof e == "object" && U in e));
}
function _n(e) {
  if (Be)
    return e && typeof e == "object" && e instanceof Symbol;
  if (typeof e == "symbol")
    return !0;
  if (!e || typeof e != "object" || !nr)
    return !1;
  try {
    return nr.call(e), !0;
  } catch {
  }
  return !1;
}
function zl(e) {
  if (!e || typeof e != "object" || !rr)
    return !1;
  try {
    return rr.call(e), !0;
  } catch {
  }
  return !1;
}
var Kl = Object.prototype.hasOwnProperty || function(e) {
  return e in this;
};
function fe(e, t) {
  return Kl.call(e, t);
}
function me(e) {
  return Rl.call(e);
}
function Ql(e) {
  if (e.name)
    return e.name;
  var t = kl.call(Nl.call(e), /^function\s*([\w$]+)/);
  return t ? t[1] : null;
}
function Hn(e, t) {
  if (e.indexOf)
    return e.indexOf(t);
  for (var r = 0, n = e.length; r < n; r++)
    if (e[r] === t)
      return r;
  return -1;
}
function Xl(e) {
  if (!Et || !e || typeof e != "object")
    return !1;
  try {
    Et.call(e);
    try {
      Pt.call(e);
    } catch {
      return !0;
    }
    return e instanceof Map;
  } catch {
  }
  return !1;
}
function Jl(e) {
  if (!Qe || !e || typeof e != "object")
    return !1;
  try {
    Qe.call(e, Qe);
    try {
      Xe.call(e, Xe);
    } catch {
      return !0;
    }
    return e instanceof WeakMap;
  } catch {
  }
  return !1;
}
function Yl(e) {
  if (!_r || !e || typeof e != "object")
    return !1;
  try {
    return _r.call(e), !0;
  } catch {
  }
  return !1;
}
function Zl(e) {
  if (!Pt || !e || typeof e != "object")
    return !1;
  try {
    Pt.call(e);
    try {
      Et.call(e);
    } catch {
      return !0;
    }
    return e instanceof Set;
  } catch {
  }
  return !1;
}
function ei(e) {
  if (!Xe || !e || typeof e != "object")
    return !1;
  try {
    Xe.call(e, Xe);
    try {
      Qe.call(e, Qe);
    } catch {
      return !0;
    }
    return e instanceof WeakSet;
  } catch {
  }
  return !1;
}
function ti(e) {
  return !e || typeof e != "object" ? !1 : typeof HTMLElement < "u" && e instanceof HTMLElement ? !0 : typeof e.nodeName == "string" && typeof e.getAttribute == "function";
}
function qn(e, t) {
  if (e.length > t.maxStringLength) {
    var r = e.length - t.maxStringLength, n = "... " + r + " more character" + (r > 1 ? "s" : "");
    return qn(gr.call(e, 0, t.maxStringLength), t) + n;
  }
  var o = ye.call(ye.call(e, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, ri);
  return jn(o, "single", t);
}
function ri(e) {
  var t = e.charCodeAt(0), r = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[t];
  return r ? "\\" + r : "\\x" + (t < 16 ? "0" : "") + Bl.call(t.toString(16));
}
function Ve(e) {
  return "Object(" + e + ")";
}
function Ut(e) {
  return e + " { ? }";
}
function Jr(e, t, r, n) {
  var o = n ? lr(r, n) : le.call(r, ", ");
  return e + " (" + t + ") {" + o + "}";
}
function ni(e) {
  for (var t = 0; t < e.length; t++)
    if (Hn(e[t], `
`) >= 0)
      return !1;
  return !0;
}
function ai(e, t) {
  var r;
  if (e.indent === "	")
    r = "	";
  else if (typeof e.indent == "number" && e.indent > 0)
    r = le.call(Array(e.indent + 1), " ");
  else
    return null;
  return {
    base: r,
    prev: le.call(Array(t + 1), r)
  };
}
function lr(e, t) {
  if (e.length === 0)
    return "";
  var r = `
` + t.prev + t.base;
  return r + le.call(e, "," + r) + `
` + t.prev;
}
function dt(e, t) {
  var r = or(e), n = [];
  if (r) {
    n.length = e.length;
    for (var o = 0; o < e.length; o++)
      n[o] = fe(e, o) ? t(e[o], e) : "";
  }
  var a = typeof Wt == "function" ? Wt(e) : [], l;
  if (Be) {
    l = {};
    for (var i = 0; i < a.length; i++)
      l["$" + a[i]] = a[i];
  }
  for (var u in e)
    fe(e, u) && (r && String(Number(u)) === u && u < e.length || Be && l["$" + u] instanceof Symbol || (Wn.call(/[^\w$]/, u) ? n.push(t(u, e) + ": " + t(e[u], e)) : n.push(u + ": " + t(e[u], e))));
  if (typeof Wt == "function")
    for (var c = 0; c < a.length; c++)
      Un.call(e, a[c]) && n.push("[" + t(a[c]) + "]: " + t(e[a[c]], e));
  return n;
}
var Gn = je, _e = $l, oi = Ul, li = nt, pt = Gn("%WeakMap%", !0), yt = Gn("%Map%", !0), ii = _e("WeakMap.prototype.get", !0), ui = _e("WeakMap.prototype.set", !0), si = _e("WeakMap.prototype.has", !0), ci = _e("Map.prototype.get", !0), fi = _e("Map.prototype.set", !0), di = _e("Map.prototype.has", !0), br = function(e, t) {
  for (var r = e, n; (n = r.next) !== null; r = n)
    if (n.key === t)
      return r.next = n.next, n.next = /** @type {NonNullable<typeof list.next>} */
      e.next, e.next = n, n;
}, pi = function(e, t) {
  var r = br(e, t);
  return r && r.value;
}, yi = function(e, t, r) {
  var n = br(e, t);
  n ? n.value = r : e.next = /** @type {import('.').ListNode<typeof value>} */
  {
    // eslint-disable-line no-param-reassign, no-extra-parens
    key: t,
    next: e.next,
    value: r
  };
}, mi = function(e, t) {
  return !!br(e, t);
}, vi = function() {
  var t, r, n, o = {
    assert: function(a) {
      if (!o.has(a))
        throw new li("Side channel does not contain " + oi(a));
    },
    get: function(a) {
      if (pt && a && (typeof a == "object" || typeof a == "function")) {
        if (t)
          return ii(t, a);
      } else if (yt) {
        if (r)
          return ci(r, a);
      } else if (n)
        return pi(n, a);
    },
    has: function(a) {
      if (pt && a && (typeof a == "object" || typeof a == "function")) {
        if (t)
          return si(t, a);
      } else if (yt) {
        if (r)
          return di(r, a);
      } else if (n)
        return mi(n, a);
      return !1;
    },
    set: function(a, l) {
      pt && a && (typeof a == "object" || typeof a == "function") ? (t || (t = new pt()), ui(t, a, l)) : yt ? (r || (r = new yt()), fi(r, a, l)) : (n || (n = { key: {}, next: null }), yi(n, a, l));
    }
  };
  return o;
}, hi = String.prototype.replace, gi = /%20/g, jt = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
}, wr = {
  default: jt.RFC3986,
  formatters: {
    RFC1738: function(e) {
      return hi.call(e, gi, "+");
    },
    RFC3986: function(e) {
      return String(e);
    }
  },
  RFC1738: jt.RFC1738,
  RFC3986: jt.RFC3986
}, bi = wr, _t = Object.prototype.hasOwnProperty, ge = Array.isArray, ae = function() {
  for (var e = [], t = 0; t < 256; ++t)
    e.push("%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase());
  return e;
}(), wi = function(t) {
  for (; t.length > 1; ) {
    var r = t.pop(), n = r.obj[r.prop];
    if (ge(n)) {
      for (var o = [], a = 0; a < n.length; ++a)
        typeof n[a] < "u" && o.push(n[a]);
      r.obj[r.prop] = o;
    }
  }
}, Vn = function(t, r) {
  for (var n = r && r.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, o = 0; o < t.length; ++o)
    typeof t[o] < "u" && (n[o] = t[o]);
  return n;
}, Si = function e(t, r, n) {
  if (!r)
    return t;
  if (typeof r != "object") {
    if (ge(t))
      t.push(r);
    else if (t && typeof t == "object")
      (n && (n.plainObjects || n.allowPrototypes) || !_t.call(Object.prototype, r)) && (t[r] = !0);
    else
      return [t, r];
    return t;
  }
  if (!t || typeof t != "object")
    return [t].concat(r);
  var o = t;
  return ge(t) && !ge(r) && (o = Vn(t, n)), ge(t) && ge(r) ? (r.forEach(function(a, l) {
    if (_t.call(t, l)) {
      var i = t[l];
      i && typeof i == "object" && a && typeof a == "object" ? t[l] = e(i, a, n) : t.push(a);
    } else
      t[l] = a;
  }), t) : Object.keys(r).reduce(function(a, l) {
    var i = r[l];
    return _t.call(a, l) ? a[l] = e(a[l], i, n) : a[l] = i, a;
  }, o);
}, xi = function(t, r) {
  return Object.keys(r).reduce(function(n, o) {
    return n[o] = r[o], n;
  }, t);
}, Ei = function(e, t, r) {
  var n = e.replace(/\+/g, " ");
  if (r === "iso-8859-1")
    return n.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n);
  } catch {
    return n;
  }
}, Ht = 1024, Pi = function(t, r, n, o, a) {
  if (t.length === 0)
    return t;
  var l = t;
  if (typeof t == "symbol" ? l = Symbol.prototype.toString.call(t) : typeof t != "string" && (l = String(t)), n === "iso-8859-1")
    return escape(l).replace(/%u[0-9a-f]{4}/gi, function(y) {
      return "%26%23" + parseInt(y.slice(2), 16) + "%3B";
    });
  for (var i = "", u = 0; u < l.length; u += Ht) {
    for (var c = l.length >= Ht ? l.slice(u, u + Ht) : l, f = [], v = 0; v < c.length; ++v) {
      var p = c.charCodeAt(v);
      if (p === 45 || p === 46 || p === 95 || p === 126 || p >= 48 && p <= 57 || p >= 65 && p <= 90 || p >= 97 && p <= 122 || a === bi.RFC1738 && (p === 40 || p === 41)) {
        f[f.length] = c.charAt(v);
        continue;
      }
      if (p < 128) {
        f[f.length] = ae[p];
        continue;
      }
      if (p < 2048) {
        f[f.length] = ae[192 | p >> 6] + ae[128 | p & 63];
        continue;
      }
      if (p < 55296 || p >= 57344) {
        f[f.length] = ae[224 | p >> 12] + ae[128 | p >> 6 & 63] + ae[128 | p & 63];
        continue;
      }
      v += 1, p = 65536 + ((p & 1023) << 10 | c.charCodeAt(v) & 1023), f[f.length] = ae[240 | p >> 18] + ae[128 | p >> 12 & 63] + ae[128 | p >> 6 & 63] + ae[128 | p & 63];
    }
    i += f.join("");
  }
  return i;
}, Oi = function(t) {
  for (var r = [{ obj: { o: t }, prop: "o" }], n = [], o = 0; o < r.length; ++o)
    for (var a = r[o], l = a.obj[a.prop], i = Object.keys(l), u = 0; u < i.length; ++u) {
      var c = i[u], f = l[c];
      typeof f == "object" && f !== null && n.indexOf(f) === -1 && (r.push({ obj: l, prop: c }), n.push(f));
    }
  return wi(r), t;
}, Ai = function(t) {
  return Object.prototype.toString.call(t) === "[object RegExp]";
}, $i = function(t) {
  return !t || typeof t != "object" ? !1 : !!(t.constructor && t.constructor.isBuffer && t.constructor.isBuffer(t));
}, Ci = function(t, r) {
  return [].concat(t, r);
}, Ti = function(t, r) {
  if (ge(t)) {
    for (var n = [], o = 0; o < t.length; o += 1)
      n.push(r(t[o]));
    return n;
  }
  return r(t);
}, zn = {
  arrayToObject: Vn,
  assign: xi,
  combine: Ci,
  compact: Oi,
  decode: Ei,
  encode: Pi,
  isBuffer: $i,
  isRegExp: Ai,
  maybeMap: Ti,
  merge: Si
}, Kn = vi, ht = zn, Je = wr, Fi = Object.prototype.hasOwnProperty, Qn = {
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
}, oe = Array.isArray, Mi = Array.prototype.push, Xn = function(e, t) {
  Mi.apply(e, oe(t) ? t : [t]);
}, Ii = Date.prototype.toISOString, Yr = Je.default, D = {
  addQueryPrefix: !1,
  allowDots: !1,
  allowEmptyArrays: !1,
  arrayFormat: "indices",
  charset: "utf-8",
  charsetSentinel: !1,
  delimiter: "&",
  encode: !0,
  encodeDotInKeys: !1,
  encoder: ht.encode,
  encodeValuesOnly: !1,
  format: Yr,
  formatter: Je.formatters[Yr],
  // deprecated
  indices: !1,
  serializeDate: function(t) {
    return Ii.call(t);
  },
  skipNulls: !1,
  strictNullHandling: !1
}, Di = function(t) {
  return typeof t == "string" || typeof t == "number" || typeof t == "boolean" || typeof t == "symbol" || typeof t == "bigint";
}, qt = {}, Li = function e(t, r, n, o, a, l, i, u, c, f, v, p, y, s, d, m, b, E) {
  for (var h = t, x = E, A = 0, $ = !1; (x = x.get(qt)) !== void 0 && !$; ) {
    var L = x.get(t);
    if (A += 1, typeof L < "u") {
      if (L === A)
        throw new RangeError("Cyclic object value");
      $ = !0;
    }
    typeof x.get(qt) > "u" && (A = 0);
  }
  if (typeof f == "function" ? h = f(r, h) : h instanceof Date ? h = y(h) : n === "comma" && oe(h) && (h = ht.maybeMap(h, function(Te) {
    return Te instanceof Date ? y(Te) : Te;
  })), h === null) {
    if (l)
      return c && !m ? c(r, D.encoder, b, "key", s) : r;
    h = "";
  }
  if (Di(h) || ht.isBuffer(h)) {
    if (c) {
      var k = m ? r : c(r, D.encoder, b, "key", s);
      return [d(k) + "=" + d(c(h, D.encoder, b, "value", s))];
    }
    return [d(r) + "=" + d(String(h))];
  }
  var ee = [];
  if (typeof h > "u")
    return ee;
  var V;
  if (n === "comma" && oe(h))
    m && c && (h = ht.maybeMap(h, c)), V = [{ value: h.length > 0 ? h.join(",") || null : void 0 }];
  else if (oe(f))
    V = f;
  else {
    var ce = Object.keys(h);
    V = v ? ce.sort(v) : ce;
  }
  var re = u ? r.replace(/\./g, "%2E") : r, T = o && oe(h) && h.length === 1 ? re + "[]" : re;
  if (a && oe(h) && h.length === 0)
    return T + "[]";
  for (var _ = 0; _ < V.length; ++_) {
    var R = V[_], j = typeof R == "object" && typeof R.value < "u" ? R.value : h[R];
    if (!(i && j === null)) {
      var ne = p && u ? R.replace(/\./g, "%2E") : R, lt = oe(h) ? typeof n == "function" ? n(T, ne) : T : T + (p ? "." + ne : "[" + ne + "]");
      E.set(t, A);
      var He = Kn();
      He.set(qt, E), Xn(ee, e(
        j,
        lt,
        n,
        o,
        a,
        l,
        i,
        u,
        n === "comma" && m && oe(h) ? null : c,
        f,
        v,
        p,
        y,
        s,
        d,
        m,
        b,
        He
      ));
    }
  }
  return ee;
}, Ri = function(t) {
  if (!t)
    return D;
  if (typeof t.allowEmptyArrays < "u" && typeof t.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof t.encodeDotInKeys < "u" && typeof t.encodeDotInKeys != "boolean")
    throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
  if (t.encoder !== null && typeof t.encoder < "u" && typeof t.encoder != "function")
    throw new TypeError("Encoder has to be a function.");
  var r = t.charset || D.charset;
  if (typeof t.charset < "u" && t.charset !== "utf-8" && t.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var n = Je.default;
  if (typeof t.format < "u") {
    if (!Fi.call(Je.formatters, t.format))
      throw new TypeError("Unknown format option provided.");
    n = t.format;
  }
  var o = Je.formatters[n], a = D.filter;
  (typeof t.filter == "function" || oe(t.filter)) && (a = t.filter);
  var l;
  if (t.arrayFormat in Qn ? l = t.arrayFormat : "indices" in t ? l = t.indices ? "indices" : "repeat" : l = D.arrayFormat, "commaRoundTrip" in t && typeof t.commaRoundTrip != "boolean")
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  var i = typeof t.allowDots > "u" ? t.encodeDotInKeys === !0 ? !0 : D.allowDots : !!t.allowDots;
  return {
    addQueryPrefix: typeof t.addQueryPrefix == "boolean" ? t.addQueryPrefix : D.addQueryPrefix,
    allowDots: i,
    allowEmptyArrays: typeof t.allowEmptyArrays == "boolean" ? !!t.allowEmptyArrays : D.allowEmptyArrays,
    arrayFormat: l,
    charset: r,
    charsetSentinel: typeof t.charsetSentinel == "boolean" ? t.charsetSentinel : D.charsetSentinel,
    commaRoundTrip: t.commaRoundTrip,
    delimiter: typeof t.delimiter > "u" ? D.delimiter : t.delimiter,
    encode: typeof t.encode == "boolean" ? t.encode : D.encode,
    encodeDotInKeys: typeof t.encodeDotInKeys == "boolean" ? t.encodeDotInKeys : D.encodeDotInKeys,
    encoder: typeof t.encoder == "function" ? t.encoder : D.encoder,
    encodeValuesOnly: typeof t.encodeValuesOnly == "boolean" ? t.encodeValuesOnly : D.encodeValuesOnly,
    filter: a,
    format: n,
    formatter: o,
    serializeDate: typeof t.serializeDate == "function" ? t.serializeDate : D.serializeDate,
    skipNulls: typeof t.skipNulls == "boolean" ? t.skipNulls : D.skipNulls,
    sort: typeof t.sort == "function" ? t.sort : null,
    strictNullHandling: typeof t.strictNullHandling == "boolean" ? t.strictNullHandling : D.strictNullHandling
  };
}, Ni = function(e, t) {
  var r = e, n = Ri(t), o, a;
  typeof n.filter == "function" ? (a = n.filter, r = a("", r)) : oe(n.filter) && (a = n.filter, o = a);
  var l = [];
  if (typeof r != "object" || r === null)
    return "";
  var i = Qn[n.arrayFormat], u = i === "comma" && n.commaRoundTrip;
  o || (o = Object.keys(r)), n.sort && o.sort(n.sort);
  for (var c = Kn(), f = 0; f < o.length; ++f) {
    var v = o[f];
    n.skipNulls && r[v] === null || Xn(l, Li(
      r[v],
      v,
      i,
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
  var p = l.join(n.delimiter), y = n.addQueryPrefix === !0 ? "?" : "";
  return n.charsetSentinel && (n.charset === "iso-8859-1" ? y += "utf8=%26%2310003%3B&" : y += "utf8=%E2%9C%93&"), p.length > 0 ? y + p : "";
}, We = zn, ir = Object.prototype.hasOwnProperty, ki = Array.isArray, F = {
  allowDots: !1,
  allowEmptyArrays: !1,
  allowPrototypes: !1,
  allowSparse: !1,
  arrayLimit: 20,
  charset: "utf-8",
  charsetSentinel: !1,
  comma: !1,
  decodeDotInKeys: !1,
  decoder: We.decode,
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
}, Bi = function(e) {
  return e.replace(/&#(\d+);/g, function(t, r) {
    return String.fromCharCode(parseInt(r, 10));
  });
}, Jn = function(e, t) {
  return e && typeof e == "string" && t.comma && e.indexOf(",") > -1 ? e.split(",") : e;
}, Wi = "utf8=%26%2310003%3B", Ui = "utf8=%E2%9C%93", ji = function(t, r) {
  var n = { __proto__: null }, o = r.ignoreQueryPrefix ? t.replace(/^\?/, "") : t;
  o = o.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  var a = r.parameterLimit === 1 / 0 ? void 0 : r.parameterLimit, l = o.split(r.delimiter, a), i = -1, u, c = r.charset;
  if (r.charsetSentinel)
    for (u = 0; u < l.length; ++u)
      l[u].indexOf("utf8=") === 0 && (l[u] === Ui ? c = "utf-8" : l[u] === Wi && (c = "iso-8859-1"), i = u, u = l.length);
  for (u = 0; u < l.length; ++u)
    if (u !== i) {
      var f = l[u], v = f.indexOf("]="), p = v === -1 ? f.indexOf("=") : v + 1, y, s;
      p === -1 ? (y = r.decoder(f, F.decoder, c, "key"), s = r.strictNullHandling ? null : "") : (y = r.decoder(f.slice(0, p), F.decoder, c, "key"), s = We.maybeMap(
        Jn(f.slice(p + 1), r),
        function(m) {
          return r.decoder(m, F.decoder, c, "value");
        }
      )), s && r.interpretNumericEntities && c === "iso-8859-1" && (s = Bi(s)), f.indexOf("[]=") > -1 && (s = ki(s) ? [s] : s);
      var d = ir.call(n, y);
      d && r.duplicates === "combine" ? n[y] = We.combine(n[y], s) : (!d || r.duplicates === "last") && (n[y] = s);
    }
  return n;
}, _i = function(e, t, r, n) {
  for (var o = n ? t : Jn(t, r), a = e.length - 1; a >= 0; --a) {
    var l, i = e[a];
    if (i === "[]" && r.parseArrays)
      l = r.allowEmptyArrays && (o === "" || r.strictNullHandling && o === null) ? [] : [].concat(o);
    else {
      l = r.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var u = i.charAt(0) === "[" && i.charAt(i.length - 1) === "]" ? i.slice(1, -1) : i, c = r.decodeDotInKeys ? u.replace(/%2E/g, ".") : u, f = parseInt(c, 10);
      !r.parseArrays && c === "" ? l = { 0: o } : !isNaN(f) && i !== c && String(f) === c && f >= 0 && r.parseArrays && f <= r.arrayLimit ? (l = [], l[f] = o) : c !== "__proto__" && (l[c] = o);
    }
    o = l;
  }
  return o;
}, Hi = function(t, r, n, o) {
  if (t) {
    var a = n.allowDots ? t.replace(/\.([^.[]+)/g, "[$1]") : t, l = /(\[[^[\]]*])/, i = /(\[[^[\]]*])/g, u = n.depth > 0 && l.exec(a), c = u ? a.slice(0, u.index) : a, f = [];
    if (c) {
      if (!n.plainObjects && ir.call(Object.prototype, c) && !n.allowPrototypes)
        return;
      f.push(c);
    }
    for (var v = 0; n.depth > 0 && (u = i.exec(a)) !== null && v < n.depth; ) {
      if (v += 1, !n.plainObjects && ir.call(Object.prototype, u[1].slice(1, -1)) && !n.allowPrototypes)
        return;
      f.push(u[1]);
    }
    if (u) {
      if (n.strictDepth === !0)
        throw new RangeError("Input depth exceeded depth option of " + n.depth + " and strictDepth is true");
      f.push("[" + a.slice(u.index) + "]");
    }
    return _i(f, r, n, o);
  }
}, qi = function(t) {
  if (!t)
    return F;
  if (typeof t.allowEmptyArrays < "u" && typeof t.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof t.decodeDotInKeys < "u" && typeof t.decodeDotInKeys != "boolean")
    throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
  if (t.decoder !== null && typeof t.decoder < "u" && typeof t.decoder != "function")
    throw new TypeError("Decoder has to be a function.");
  if (typeof t.charset < "u" && t.charset !== "utf-8" && t.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var r = typeof t.charset > "u" ? F.charset : t.charset, n = typeof t.duplicates > "u" ? F.duplicates : t.duplicates;
  if (n !== "combine" && n !== "first" && n !== "last")
    throw new TypeError("The duplicates option must be either combine, first, or last");
  var o = typeof t.allowDots > "u" ? t.decodeDotInKeys === !0 ? !0 : F.allowDots : !!t.allowDots;
  return {
    allowDots: o,
    allowEmptyArrays: typeof t.allowEmptyArrays == "boolean" ? !!t.allowEmptyArrays : F.allowEmptyArrays,
    allowPrototypes: typeof t.allowPrototypes == "boolean" ? t.allowPrototypes : F.allowPrototypes,
    allowSparse: typeof t.allowSparse == "boolean" ? t.allowSparse : F.allowSparse,
    arrayLimit: typeof t.arrayLimit == "number" ? t.arrayLimit : F.arrayLimit,
    charset: r,
    charsetSentinel: typeof t.charsetSentinel == "boolean" ? t.charsetSentinel : F.charsetSentinel,
    comma: typeof t.comma == "boolean" ? t.comma : F.comma,
    decodeDotInKeys: typeof t.decodeDotInKeys == "boolean" ? t.decodeDotInKeys : F.decodeDotInKeys,
    decoder: typeof t.decoder == "function" ? t.decoder : F.decoder,
    delimiter: typeof t.delimiter == "string" || We.isRegExp(t.delimiter) ? t.delimiter : F.delimiter,
    // eslint-disable-next-line no-implicit-coercion, no-extra-parens
    depth: typeof t.depth == "number" || t.depth === !1 ? +t.depth : F.depth,
    duplicates: n,
    ignoreQueryPrefix: t.ignoreQueryPrefix === !0,
    interpretNumericEntities: typeof t.interpretNumericEntities == "boolean" ? t.interpretNumericEntities : F.interpretNumericEntities,
    parameterLimit: typeof t.parameterLimit == "number" ? t.parameterLimit : F.parameterLimit,
    parseArrays: t.parseArrays !== !1,
    plainObjects: typeof t.plainObjects == "boolean" ? t.plainObjects : F.plainObjects,
    strictDepth: typeof t.strictDepth == "boolean" ? !!t.strictDepth : F.strictDepth,
    strictNullHandling: typeof t.strictNullHandling == "boolean" ? t.strictNullHandling : F.strictNullHandling
  };
}, Gi = function(e, t) {
  var r = qi(t);
  if (e === "" || e === null || typeof e > "u")
    return r.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var n = typeof e == "string" ? ji(e, r) : e, o = r.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, a = Object.keys(n), l = 0; l < a.length; ++l) {
    var i = a[l], u = Hi(i, n[i], r, typeof e == "string");
    o = We.merge(o, u, r);
  }
  return r.allowSparse === !0 ? o : We.compact(o);
}, Vi = Ni, zi = Gi, Ki = wr, Zr = {
  formats: Ki,
  parse: zi,
  stringify: Vi
}, Qi = { exports: {} };
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */
(function(e, t) {
  (function(r, n) {
    e.exports = n();
  })(er, function() {
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
      var d, m;
      for (d in s)
        m = s[d], m !== void 0 && s.hasOwnProperty(d) && (n[d] = m);
      return this;
    }, r.status = null, r.set = function(s) {
      var d = r.isStarted();
      s = o(s, n.minimum, 1), r.status = s === 1 ? null : s;
      var m = r.render(!d), b = m.querySelector(n.barSelector), E = n.speed, h = n.easing;
      return m.offsetWidth, i(function(x) {
        n.positionUsing === "" && (n.positionUsing = r.getPositioningCSS()), u(b, l(s, E, h)), s === 1 ? (u(m, {
          transition: "none",
          opacity: 1
        }), m.offsetWidth, setTimeout(function() {
          u(m, {
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
      var s = function() {
        setTimeout(function() {
          r.status && (r.trickle(), s());
        }, n.trickleSpeed);
      };
      return n.trickle && s(), this;
    }, r.done = function(s) {
      return !s && !r.status ? this : r.inc(0.3 + 0.5 * Math.random()).set(1);
    }, r.inc = function(s) {
      var d = r.status;
      return d ? (typeof s != "number" && (s = (1 - d) * o(Math.random() * d, 0.1, 0.95)), d = o(d + s, 0, 0.994), r.set(d)) : r.start();
    }, r.trickle = function() {
      return r.inc(Math.random() * n.trickleRate);
    }, function() {
      var s = 0, d = 0;
      r.promise = function(m) {
        return !m || m.state() === "resolved" ? this : (d === 0 && r.start(), s++, d++, m.always(function() {
          d--, d === 0 ? (s = 0, r.done()) : r.set((s - d) / s);
        }), this);
      };
    }(), r.render = function(s) {
      if (r.isRendered()) return document.getElementById("nprogress");
      f(document.documentElement, "nprogress-busy");
      var d = document.createElement("div");
      d.id = "nprogress", d.innerHTML = n.template;
      var m = d.querySelector(n.barSelector), b = s ? "-100" : a(r.status || 0), E = document.querySelector(n.parent), h;
      return u(m, {
        transition: "all 0 linear",
        transform: "translate3d(" + b + "%,0,0)"
      }), n.showSpinner || (h = d.querySelector(n.spinnerSelector), h && y(h)), E != document.body && f(E, "nprogress-custom-parent"), E.appendChild(d), d;
    }, r.remove = function() {
      v(document.documentElement, "nprogress-busy"), v(document.querySelector(n.parent), "nprogress-custom-parent");
      var s = document.getElementById("nprogress");
      s && y(s);
    }, r.isRendered = function() {
      return !!document.getElementById("nprogress");
    }, r.getPositioningCSS = function() {
      var s = document.body.style, d = "WebkitTransform" in s ? "Webkit" : "MozTransform" in s ? "Moz" : "msTransform" in s ? "ms" : "OTransform" in s ? "O" : "";
      return d + "Perspective" in s ? "translate3d" : d + "Transform" in s ? "translate" : "margin";
    };
    function o(s, d, m) {
      return s < d ? d : s > m ? m : s;
    }
    function a(s) {
      return (-1 + s) * 100;
    }
    function l(s, d, m) {
      var b;
      return n.positionUsing === "translate3d" ? b = { transform: "translate3d(" + a(s) + "%,0,0)" } : n.positionUsing === "translate" ? b = { transform: "translate(" + a(s) + "%,0)" } : b = { "margin-left": a(s) + "%" }, b.transition = "all " + d + "ms " + m, b;
    }
    var i = /* @__PURE__ */ function() {
      var s = [];
      function d() {
        var m = s.shift();
        m && m(d);
      }
      return function(m) {
        s.push(m), s.length == 1 && d();
      };
    }(), u = /* @__PURE__ */ function() {
      var s = ["Webkit", "O", "Moz", "ms"], d = {};
      function m(x) {
        return x.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(A, $) {
          return $.toUpperCase();
        });
      }
      function b(x) {
        var A = document.body.style;
        if (x in A) return x;
        for (var $ = s.length, L = x.charAt(0).toUpperCase() + x.slice(1), k; $--; )
          if (k = s[$] + L, k in A) return k;
        return x;
      }
      function E(x) {
        return x = m(x), d[x] || (d[x] = b(x));
      }
      function h(x, A, $) {
        A = E(A), x.style[A] = $;
      }
      return function(x, A) {
        var $ = arguments, L, k;
        if ($.length == 2)
          for (L in A)
            k = A[L], k !== void 0 && A.hasOwnProperty(L) && h(x, L, k);
        else
          h(x, $[1], $[2]);
      };
    }();
    function c(s, d) {
      var m = typeof s == "string" ? s : p(s);
      return m.indexOf(" " + d + " ") >= 0;
    }
    function f(s, d) {
      var m = p(s), b = m + d;
      c(m, d) || (s.className = b.substring(1));
    }
    function v(s, d) {
      var m = p(s), b;
      c(s, d) && (b = m.replace(" " + d + " ", " "), s.className = b.substring(1, b.length - 1));
    }
    function p(s) {
      return (" " + (s.className || "") + " ").replace(/\s+/gi, " ");
    }
    function y(s) {
      s && s.parentNode && s.parentNode.removeChild(s);
    }
    return r;
  });
})(Qi);
function Xi(e, t, r, n = "brackets") {
  let o = /^https?:\/\//.test(t.toString()), a = o || t.toString().startsWith("/"), l = !a && !t.toString().startsWith("#") && !t.toString().startsWith("?"), i = t.toString().includes("?") || e === "get" && Object.keys(r).length, u = t.toString().includes("#"), c = new URL(t.toString(), "http://localhost");
  return e === "get" && Object.keys(r).length && (c.search = Zr.stringify(Mo(Zr.parse(c.search, { ignoreQueryPrefix: !0 }), r), { encodeValuesOnly: !0, arrayFormat: n }), r = {}), [[o ? `${c.protocol}//${c.host}` : "", a ? c.pathname : "", l ? c.pathname.substring(1) : "", i ? c.search : "", u ? c.hash : ""].join(""), r];
}
const ur = g(null), C = g([]), Ot = g({});
class Sr {
  constructor(t, r, n, o, a) {
    z(this, "update", (t, r, n) => {
      const o = this.index.value;
      o > -1 && (C.value[o].modalProps = t, C.value[o].onCloseCallback = r, C.value[o].afterLeaveCallback = n);
    });
    z(this, "getAdjacentModal", (t) => {
      const r = this.index.value;
      return C.value[r + t] ?? null;
    });
    z(this, "isOnTopOfStack", () => C.value.length < 2 || C.value[C.value.length - 1].id === this.id);
    z(this, "show", () => {
      const t = this.index.value;
      if (t > -1) {
        if (C.value[t].open)
          return;
        C.value[t].open = !0;
      }
    });
    z(this, "close", () => {
      var r;
      const t = this.index.value;
      if (t > -1) {
        if (!C.value[t].open)
          return;
        Object.keys(this.listeners).forEach((n) => {
          this.off(n);
        }), C.value[t].open = !1, (r = this.onCloseCallback) == null || r.call(this), this.onCloseCallback = null;
      }
    });
    z(this, "afterLeave", () => {
      var r;
      const t = this.index.value;
      if (t > -1) {
        if (C.value[t].open)
          return;
        C.value = C.value.filter((n) => n.id !== this.id), (r = this.afterLeaveCallback) == null || r.call(this), this.afterLeaveCallback = null;
      }
    });
    z(this, "on", (t, r) => {
      this.listeners[t] = this.listeners[t] ?? [], this.listeners[t].push(r);
    });
    z(this, "off", (t, r) => {
      var n;
      r ? this.listeners[t] = ((n = this.listeners[t]) == null ? void 0 : n.filter((o) => o !== r)) ?? [] : delete this.listeners[t];
    });
    z(this, "emit", (t, ...r) => {
      var n;
      (n = this.listeners[t]) == null || n.forEach((o) => o(...r));
    });
    z(this, "registerEventListenersFromAttrs", (t) => {
      const r = [];
      return Object.keys(t).filter((n) => n.startsWith("on")).forEach((n) => {
        const o = n.replace(/^on/, "").replace(/^./, (a) => a.toLowerCase()).replace(/([A-Z])/g, "-$1").toLowerCase();
        this.on(o, t[n]), r.push(() => this.off(o, t[n]));
      }), () => r.forEach((n) => n());
    });
    z(this, "reload", (t = {}) => {
      var n;
      let r = Object.keys(this.response.props);
      t.only && (r = Fn(r, t.only)), t.except && (r = fo(r, t.except)), (n = this.response) != null && n.url && gt.get(this.response.url, {
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
    z(this, "tap", (t) => (t(this), C.value[this.index] = this, this));
    this.id = Sr.generateId(), this.open = !1, this.listeners = {}, this.component = t, this.componentProps = g(r.props), this.response = r, this.modalProps = n, this.onCloseCallback = o, this.afterLeaveCallback = a, this.index = S(() => C.value.findIndex((l) => l.id === this.id)), this.getParentModal = () => this.getAdjacentModal(-1), this.getChildModal = () => this.getAdjacentModal(1), this.onTopOfStack = S(() => this.isOnTopOfStack());
  }
  static generateId() {
    return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `inertiaui_modal_${crypto.randomUUID()}` : `inertiaui_modal_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
function Ji(e, t) {
  Ot.value[e] = { name: e, callback: t };
}
function Yi(e, t, r, n) {
  if (!Ot.value[e])
    throw new Error(`The local modal "${e}" has not been registered.`);
  const o = xr(null, {}, t, r, n);
  return o.name = e, Ot.value[e].callback(o), o;
}
function Yn(e, t = {}, r = null, n = null) {
  return Ke.resolveComponent(e.component).then((o) => xr(sa(o), e, t, r, n));
}
function Zi(e, t, r = {}, n = {}, o = {}, a = null, l = null, i = "brackets", u = !1) {
  return new Promise((c, f) => {
    if (e.startsWith("#")) {
      c(Yi(e.substring(1), o, a, l));
      return;
    }
    const [v, p] = Xi(t, e || "", r, i);
    let y = u && C.value.length === 0;
    if (C.value.length === 0 && (ur.value = typeof window < "u" ? window.location.href : ""), n = {
      ...n,
      Accept: "text/html, application/xhtml+xml",
      "X-Requested-With": "XMLHttpRequest",
      "X-Inertia": !0,
      "X-Inertia-Version": on().version,
      "X-InertiaUI-Modal": !0,
      "X-InertiaUI-Modal-Use-Router": y ? 1 : 0
    }, y)
      return Ke.visit(v, {
        method: t,
        data: p,
        headers: n,
        preserveScroll: !0,
        preserveState: !0,
        onError: f,
        onFinish: () => yo(() => C.value[0]).then((s) => {
          const d = s.onCloseCallback, m = s.afterLeaveCallback;
          s.update(
            o,
            () => {
              a == null || a(), d == null || d();
            },
            () => {
              l == null || l(), m == null || m();
            }
          ), c(s);
        })
      });
    gt({ url: v, method: t, data: p, headers: n }).then((s) => c(Yn(s.data, o, a, l))).catch(f);
  });
}
function xr(e, t, r, n, o) {
  const a = new Sr(e, t, r, n, o);
  return C.value.push(a), tn(() => {
    a.show();
  }), a;
}
const en = g(!1), eu = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"];
function ot() {
  return {
    getBaseUrl: () => ur.value,
    setBaseUrl: (e) => ur.value = e,
    stack: ua(C),
    push: xr,
    pushFromResponseData: Yn,
    closeAll: () => C.value.reverse().forEach((e) => e.close()),
    reset: () => C.value = [],
    visit: Zi,
    registerLocalModal: Ji,
    removeLocalModal: (e) => delete Ot.value[e],
    rootPresent: en,
    verifyRoot: () => {
      if (!en.value)
        throw new Error(
          "The <ModalRoot> component is missing from your app layout. Please check the documentation for more information: https://inertiaui.com/inertia-modal/docs/installation"
        );
    }
  };
}
const tu = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, o] of t)
    r[n] = o;
  return r;
}, ru = {}, nu = {
  type: "button",
  class: "im-close-button text-gray-400 hover:text-gray-500"
};
function au(e, t) {
  return H(), $e("button", nu, t[0] || (t[0] = [
    Le("span", { class: "sr-only" }, "Close", -1),
    Le("svg", {
      class: "size-6",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      "stroke-width": "2",
      stroke: "currentColor",
      "aria-hidden": "true"
    }, [
      Le("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M6 18L18 6M6 6l12 12"
      })
    ], -1)
  ]));
}
const Zn = /* @__PURE__ */ tu(ru, [["render", au]]), ou = { class: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4" }, lu = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, iu = {
  __name: "ModalContent",
  props: {
    modalContext: Object,
    modalProps: Object
  },
  setup(e) {
    return (t, r) => (H(), $e("div", ou, [
      Le("div", {
        class: Se(["im-modal-positioner flex min-h-full justify-center", {
          "items-start": e.modalProps.position === "top",
          "items-center": e.modalProps.position === "center",
          "items-end": e.modalProps.position === "bottom"
        }])
      }, [
        xe(P(Ct), {
          "enter-from": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          "enter-to": "opacity-100 translate-y-0 sm:scale-100",
          "leave-from": "opacity-100 translate-y-0 sm:scale-100",
          "leave-to": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          class: Se({
            "im-modal-wrapper w-full transition duration-300 ease-in-out": !0,
            "blur-sm": !e.modalContext.onTopOfStack,
            "sm:max-w-sm": e.modalProps.maxWidth == "sm",
            "sm:max-w-md": e.modalProps.maxWidth == "md",
            "sm:max-w-md md:max-w-lg": e.modalProps.maxWidth == "lg",
            "sm:max-w-md md:max-w-xl": e.modalProps.maxWidth == "xl",
            "sm:max-w-md md:max-w-xl lg:max-w-2xl": e.modalProps.maxWidth == "2xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl": e.modalProps.maxWidth == "3xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl": e.modalProps.maxWidth == "4xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl": e.modalProps.maxWidth == "5xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl": e.modalProps.maxWidth == "6xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl": e.modalProps.maxWidth == "7xl"
          }),
          onAfterLeave: e.modalContext.afterLeave
        }, {
          default: ue(() => [
            xe(P(An), {
              class: Se(["im-modal-content relative", [e.modalProps.paddingClasses, e.modalProps.panelClasses]])
            }, {
              default: ue(() => [
                e.modalProps.closeButton ? (H(), $e("div", lu, [
                  xe(Zn, {
                    onClick: e.modalContext.close
                  }, null, 8, ["onClick"])
                ])) : Ee("", !0),
                Ze(t.$slots, "default", {
                  modalContext: e.modalContext,
                  modalProps: e.modalProps
                })
              ]),
              _: 3
            }, 8, ["class"])
          ]),
          _: 3
        }, 8, ["class", "onAfterLeave"])
      ], 2)
    ]));
  }
}, ea = {
  __name: "ModalRenderer",
  props: {
    index: {
      type: Number,
      required: !0
    }
  },
  setup(e) {
    const t = e, r = ot(), n = S(() => r.stack.value[t.index]);
    return Z("modalContext", n), (o, a) => {
      var l;
      return (l = n.value) != null && l.component ? (H(), be(P(n).component, rn({ key: 0 }, n.value.componentProps, {
        onModalEvent: a[0] || (a[0] = (i, ...u) => n.value.emit(i, ...u))
      }), null, 16)) : Ee("", !0);
    };
  }
}, uu = { class: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden" }, su = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, cu = {
  __name: "SlideoverContent",
  props: {
    modalContext: Object,
    modalProps: Object
  },
  setup(e) {
    return (t, r) => (H(), $e("div", uu, [
      Le("div", {
        class: Se(["im-slideover-positioner flex min-h-full items-center", {
          "justify-start": e.modalProps.position === "left",
          "justify-end": e.modalProps.position === "right"
        }])
      }, [
        xe(P(Ct), {
          "enter-from": "opacity-0 " + (e.modalProps.position === "left" ? "-translate-x-full" : "translate-x-full"),
          "enter-to": "opacity-100 translate-x-0",
          "leave-from": "opacity-100 translate-x-0",
          "leave-to": "opacity-0 " + (e.modalProps.position === "left" ? "-translate-x-full" : "translate-x-full"),
          class: Se({
            "im-slideover-wrapper w-full transition duration-300 ease-in-out": !0,
            "blur-sm": !e.modalContext.onTopOfStack,
            "sm:max-w-sm": e.modalProps.maxWidth == "sm",
            "sm:max-w-md": e.modalProps.maxWidth == "md",
            "sm:max-w-md md:max-w-lg": e.modalProps.maxWidth == "lg",
            "sm:max-w-md md:max-w-xl": e.modalProps.maxWidth == "xl",
            "sm:max-w-md md:max-w-xl lg:max-w-2xl": e.modalProps.maxWidth == "2xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl": e.modalProps.maxWidth == "3xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl": e.modalProps.maxWidth == "4xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl": e.modalProps.maxWidth == "5xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl": e.modalProps.maxWidth == "6xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl": e.modalProps.maxWidth == "7xl"
          }),
          onAfterLeave: e.modalContext.afterLeave
        }, {
          default: ue(() => [
            xe(P(An), {
              class: Se(["im-slideover-content relative", [e.modalProps.paddingClasses, e.modalProps.panelClasses]])
            }, {
              default: ue(() => [
                e.modalProps.closeButton ? (H(), $e("div", su, [
                  xe(Zn, {
                    onClick: e.modalContext.close
                  }, null, 8, ["onClick"])
                ])) : Ee("", !0),
                Ze(t.$slots, "default", {
                  modalContext: e.modalContext,
                  modalProps: e.modalProps
                })
              ]),
              _: 3
            }, 8, ["class"])
          ]),
          _: 3
        }, 8, ["enter-from", "leave-to", "class", "onAfterLeave"])
      ], 2)
    ]));
  }
}, fu = {
  class: "im-backdrop fixed inset-0 z-30 bg-black/75",
  "aria-hidden": "true"
}, du = {
  key: 1,
  class: "im-backdrop fixed inset-0 z-30 bg-black/75"
}, wu = {
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
  setup(e, { expose: t, emit: r }) {
    const n = e, o = ot(), a = n.name ? g({}) : Q("modalContext"), l = S(() => {
      const y = a.value.modalProps.slideover ?? n.slideover ?? ln("type") === "slideover";
      return {
        slideover: y,
        closeButton: n.closeButton ?? Fe(y, "closeButton"),
        closeExplicitly: n.closeExplicitly ?? Fe(y, "closeExplicitly"),
        maxWidth: n.maxWidth ?? Fe(y, "maxWidth"),
        paddingClasses: n.paddingClasses ?? Fe(y, "paddingClasses"),
        panelClasses: n.panelClasses ?? Fe(y, "panelClasses"),
        position: n.position ?? Fe(y, "position"),
        ...a.value.modalProps
      };
    });
    n.name && (o.registerLocalModal(n.name, function(y) {
      a.value = y, f();
    }), Gt(() => {
      o.removeLocalModal(n.name);
    })), W(() => {
      o.verifyRoot(), n.name || f();
    });
    function i() {
      l.value.closeExplicitly || a.value.close();
    }
    const u = g(null);
    Gt(() => {
      var y;
      return (y = u.value) == null ? void 0 : y.call(u);
    });
    const c = nn();
    function f() {
      u.value = a.value.registerEventListenersFromAttrs(c);
    }
    const v = r;
    function p(y, ...s) {
      v("modal-event", y, ...s);
    }
    return t({
      close: a.value.close,
      emit: p,
      getChildModal: a.value.getChildModal,
      getParentModal: a.value.getParentModal,
      modalContext: a.value,
      reload: a.value.reload
    }), (y, s) => (H(), be(P(Tn), {
      unmount: !1,
      show: P(a).open ?? !1,
      enter: "transition transform ease-in-out duration-300",
      "enter-from": "opacity-0 scale-95",
      "enter-to": "opacity-100 scale-100",
      leave: "transition transform ease-in-out duration-300",
      "leave-from": "opacity-100 scale-100",
      "leave-to": "opacity-0 scale-95"
    }, {
      default: ue(() => [
        xe(P(no), {
          "data-inertiaui-modal-id": P(a).id,
          "data-inertiaui-modal-index": P(a).index,
          class: "im-dialog relative z-20",
          onClose: i
        }, {
          default: ue(() => [
            P(a).index === 0 ? (H(), be(P(Ct), {
              key: 0,
              as: "template",
              enter: "transition transform ease-in-out duration-300",
              "enter-from": "opacity-0",
              "enter-to": "opacity-100",
              leave: "transition transform ease-in-out duration-300",
              "leave-from": "opacity-100",
              "leave-to": "opacity-0"
            }, {
              default: ue(() => [
                ca(Le("div", fu, null, 512), [
                  [fa, P(a).onTopOfStack]
                ])
              ]),
              _: 1
            })) : Ee("", !0),
            P(a).index > 0 && P(a).onTopOfStack ? (H(), $e("div", du)) : Ee("", !0),
            (H(), be(an(l.value.slideover ? cu : iu), {
              "modal-context": P(a),
              "modal-props": l.value
            }, {
              default: ue(() => [
                Ze(y.$slots, "default", {
                  close: P(a).close,
                  emit: p,
                  getChildModal: P(a).getChildModal,
                  getParentModal: P(a).getParentModal,
                  modalContext: P(a),
                  modalProps: l.value,
                  reload: P(a).reload
                })
              ]),
              _: 3
            }, 8, ["modal-context", "modal-props"])),
            P(o).stack.value[P(a).index + 1] ? (H(), be(ea, {
              key: 2,
              index: P(a).index + 1
            }, null, 8, ["index"])) : Ee("", !0)
          ]),
          _: 3
        }, 8, ["data-inertiaui-modal-id", "data-inertiaui-modal-index"])
      ]),
      _: 3
    }, 8, ["show"]));
  }
}, Su = {
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
  setup(e, { emit: t }) {
    const r = e, n = g(!1), o = ot(), a = g(null);
    Z("modalContext", a);
    const l = t, i = g(!1), u = S(() => r.navigate ?? ln("navigate"));
    se(
      () => {
        var d;
        return (d = a.value) == null ? void 0 : d.isOnTopOfStack();
      },
      (d) => {
        a.value && (d && i.value ? l("focus") : d || l("blur"), i.value = !d);
      }
    ), W(() => {
      o.verifyRoot(), !u.value && r.fragment && window.location.hash === `#${r.fragment}` && s();
    });
    const c = g(null);
    Gt(() => {
      var d;
      return (d = c.value) == null ? void 0 : d.call(c);
    });
    const f = nn();
    function v() {
      c.value = a.value.registerEventListenersFromAttrs(f);
    }
    se(a, (d, m) => {
      d && !m && (!u.value && r.fragment && a.value.index === 0 && (window.location.hash = r.fragment), v(), l("success"));
    });
    function p() {
      !u.value && r.fragment && a.value.index === 0 && (window.location.hash = ""), l("close");
    }
    function y() {
      a.value = null, l("after-leave");
    }
    function s() {
      n.value || (r.href.startsWith("#") || (n.value = !0, l("start")), o.visit(
        r.href,
        r.method,
        r.data,
        r.headers,
        po(Fn(r, eu)),
        p,
        y,
        r.queryStringArrayFormat,
        u.value
      ).then((d) => {
        a.value = d;
      }).catch((d) => l("error", d)).finally(() => n.value = !1));
    }
    return (d, m) => (H(), be(an(e.as), rn(P(f), {
      href: e.href,
      onClick: da(s, ["prevent"])
    }), {
      default: ue(() => [
        Ze(d.$slots, "default", { loading: n.value })
      ]),
      _: 3
    }, 16, ["href"]));
  }
}, xu = {
  __name: "ModalRoot",
  setup(e) {
    const t = ot(), r = g(!1);
    q(Ke.on("start", () => r.value = !0)), q(Ke.on("finish", () => r.value = !1));
    const n = (a) => (a.headers["X-InertiaUI-Modal-Base-Url"] = t.getBaseUrl(), a);
    pa(() => {
      t.rootPresent.value = !0, gt.interceptors.request.use(n);
    }), q(() => {
      gt.interceptors.request.eject(n), t.rootPresent.value = !1;
    });
    const o = on();
    return se(
      () => {
        var a;
        return (a = o.props) == null ? void 0 : a._inertiaui_modal;
      },
      (a) => {
        if (!a) {
          t.closeAll();
          return;
        }
        t.setBaseUrl(a.baseUrl), t.pushFromResponseData(a, {}, () => {
          if (!a.baseUrl) {
            console.error("No base url in modal response data so cannot navigate back");
            return;
          }
          !r.value && window.location.href !== a.baseUrl && Ke.visit(a.baseUrl, {
            preserveScroll: !0,
            preserveState: !0
          });
        });
      },
      { immediate: !0 }
    ), (a, l) => (H(), $e(sr, null, [
      Ze(a.$slots, "default"),
      P(t).stack.value.length ? (H(), be(ea, {
        key: 0,
        index: 0
      })) : Ee("", !0)
    ], 64));
  }
};
function Eu(e, t = {}) {
  return ot().visit(
    e,
    t.method ?? "get",
    t.data ?? {},
    t.headers ?? {},
    t.config ?? {},
    t.onClose,
    t.onAfterLeave,
    t.queryStringArrayFormat ?? "brackets"
  );
}
export {
  wu as Modal,
  Su as ModalLink,
  xu as ModalRoot,
  ln as getConfig,
  gu as putConfig,
  hu as resetConfig,
  Eu as visitModal
};
