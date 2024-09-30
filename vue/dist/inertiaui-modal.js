var Ea = Object.defineProperty;
var xa = (e, t, r) => t in e ? Ea(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var ye = (e, t, r) => xa(e, typeof t != "symbol" ? t + "" : t, r);
import * as sn from "vue";
import { watchEffect as ae, ref as O, computed as P, cloneVNode as Oa, h as j, Fragment as _r, defineComponent as J, inject as K, provide as ne, onMounted as _, onUnmounted as ie, watch as Ee, shallowRef as Aa, unref as k, getCurrentInstance as Pa, Teleport as Ta, reactive as Ra, nextTick as eo, normalizeClass as Ce, openBlock as Y, createElementBlock as Me, createElementVNode as He, createVNode as Fe, withCtx as pe, createCommentVNode as ct, renderSlot as pt, readonly as Ca, markRaw as Fa, useAttrs as to, createBlock as ze, withDirectives as ro, vShow as no, onBeforeUnmount as $a, resolveDynamicComponent as oo, mergeProps as un, withModifiers as Da } from "vue";
import { usePage as La, router as Na } from "@inertiajs/vue3";
const xt = {
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
class Ma {
  constructor() {
    this.config = {}, this.reset();
  }
  reset() {
    this.config = JSON.parse(JSON.stringify(xt));
  }
  put(t, r) {
    if (typeof t == "object") {
      this.config = {
        type: t.type ?? xt.type,
        modal: { ...xt.modal, ...t.modal ?? {} },
        slideover: { ...xt.slideover, ...t.slideover ?? {} }
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
const qt = new Ma(), df = () => qt.reset(), pf = (e, t) => qt.put(e, t), Ba = (e) => qt.get(e), Ue = (e, t) => qt.get(e ? `slideover.${t}` : `modal.${t}`);
function Wr(e) {
  typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch((t) => setTimeout(() => {
    throw t;
  }));
}
function mt() {
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
    return Wr(() => {
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
    let n = mt();
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
var cn;
let Ia = Symbol("headlessui.useid"), ka = 0;
const Ie = (cn = sn.useId) != null ? cn : function() {
  return sn.inject(Ia, () => `${++ka}`)();
};
function M(e) {
  var t;
  if (e == null || e.value == null) return null;
  let r = (t = e.value.$el) != null ? t : e.value;
  return r instanceof Node ? r : null;
}
function me(e, t, ...r) {
  if (e in t) {
    let o = t[e];
    return typeof o == "function" ? o(...r) : o;
  }
  let n = new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map((o) => `"${o}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(n, me), n;
}
var Ua = Object.defineProperty, ja = (e, t, r) => t in e ? Ua(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, fn = (e, t, r) => (ja(e, typeof t != "symbol" ? t + "" : t, r), r);
let _a = class {
  constructor() {
    fn(this, "current", this.detect()), fn(this, "currentId", 0);
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
}, yt = new _a();
function Qe(e) {
  if (yt.isServer) return null;
  if (e instanceof Node) return e.ownerDocument;
  if (e != null && e.hasOwnProperty("value")) {
    let t = M(e);
    if (t) return t.ownerDocument;
  }
  return document;
}
let gr = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var be = ((e) => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e))(be || {}), ao = ((e) => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(ao || {}), Wa = ((e) => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(Wa || {});
function Ha(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(gr)).sort((t, r) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (r.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var io = ((e) => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(io || {});
function qa(e, t = 0) {
  var r;
  return e === ((r = Qe(e)) == null ? void 0 : r.body) ? !1 : me(t, { 0() {
    return e.matches(gr);
  }, 1() {
    let n = e;
    for (; n !== null; ) {
      if (n.matches(gr)) return !0;
      n = n.parentElement;
    }
    return !1;
  } });
}
var za = ((e) => (e[e.Keyboard = 0] = "Keyboard", e[e.Mouse = 1] = "Mouse", e))(za || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (e) => {
  e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (e) => {
  e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
function $e(e) {
  e == null || e.focus({ preventScroll: !0 });
}
let Va = ["textarea", "input"].join(",");
function Ga(e) {
  var t, r;
  return (r = (t = e == null ? void 0 : e.matches) == null ? void 0 : t.call(e, Va)) != null ? r : !1;
}
function Ka(e, t = (r) => r) {
  return e.slice().sort((r, n) => {
    let o = t(r), a = t(n);
    if (o === null || a === null) return 0;
    let i = o.compareDocumentPosition(a);
    return i & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : i & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function Ft(e, t, { sorted: r = !0, relativeTo: n = null, skipElements: o = [] } = {}) {
  var a;
  let i = (a = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : document : e == null ? void 0 : e.ownerDocument) != null ? a : document, l = Array.isArray(e) ? r ? Ka(e) : e : Ha(e);
  o.length > 0 && l.length > 1 && (l = l.filter((f) => !o.includes(f))), n = n ?? i.activeElement;
  let s = (() => {
    if (t & 5) return 1;
    if (t & 10) return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), u = (() => {
    if (t & 1) return 0;
    if (t & 2) return Math.max(0, l.indexOf(n)) - 1;
    if (t & 4) return Math.max(0, l.indexOf(n)) + 1;
    if (t & 8) return l.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), c = t & 32 ? { preventScroll: !0 } : {}, m = 0, p = l.length, v;
  do {
    if (m >= p || m + p <= 0) return 0;
    let f = u + m;
    if (t & 16) f = (f + p) % p;
    else {
      if (f < 0) return 3;
      if (f >= p) return 1;
    }
    v = l[f], v == null || v.focus(c), m += s;
  } while (v !== i.activeElement);
  return t & 6 && Ga(v) && v.select(), 2;
}
function lo() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function Ja() {
  return /Android/gi.test(window.navigator.userAgent);
}
function Qa() {
  return lo() || Ja();
}
function Ot(e, t, r) {
  yt.isServer || ae((n) => {
    document.addEventListener(e, t, r), n(() => document.removeEventListener(e, t, r));
  });
}
function so(e, t, r) {
  yt.isServer || ae((n) => {
    window.addEventListener(e, t, r), n(() => window.removeEventListener(e, t, r));
  });
}
function Xa(e, t, r = P(() => !0)) {
  function n(a, i) {
    if (!r.value || a.defaultPrevented) return;
    let l = i(a);
    if (l === null || !l.getRootNode().contains(l)) return;
    let s = function u(c) {
      return typeof c == "function" ? u(c()) : Array.isArray(c) || c instanceof Set ? c : [c];
    }(e);
    for (let u of s) {
      if (u === null) continue;
      let c = u instanceof HTMLElement ? u : M(u);
      if (c != null && c.contains(l) || a.composed && a.composedPath().includes(c)) return;
    }
    return !qa(l, io.Loose) && l.tabIndex !== -1 && a.preventDefault(), t(a, l);
  }
  let o = O(null);
  Ot("pointerdown", (a) => {
    var i, l;
    r.value && (o.value = ((l = (i = a.composedPath) == null ? void 0 : i.call(a)) == null ? void 0 : l[0]) || a.target);
  }, !0), Ot("mousedown", (a) => {
    var i, l;
    r.value && (o.value = ((l = (i = a.composedPath) == null ? void 0 : i.call(a)) == null ? void 0 : l[0]) || a.target);
  }, !0), Ot("click", (a) => {
    Qa() || o.value && (n(a, () => o.value), o.value = null);
  }, !0), Ot("touchend", (a) => n(a, () => a.target instanceof HTMLElement ? a.target : null), !0), so("blur", (a) => n(a, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), !0);
}
var Mt = ((e) => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(Mt || {}), we = ((e) => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(we || {});
function ee({ visible: e = !0, features: t = 0, ourProps: r, theirProps: n, ...o }) {
  var a;
  let i = co(n, r), l = Object.assign(o, { props: i });
  if (e || t & 2 && i.static) return Zt(l);
  if (t & 1) {
    let s = (a = i.unmount) == null || a ? 0 : 1;
    return me(s, { 0() {
      return null;
    }, 1() {
      return Zt({ ...o, props: { ...i, hidden: !0, style: { display: "none" } } });
    } });
  }
  return Zt(l);
}
function Zt({ props: e, attrs: t, slots: r, slot: n, name: o }) {
  var a, i;
  let { as: l, ...s } = fo(e, ["unmount", "static"]), u = (a = r.default) == null ? void 0 : a.call(r, n), c = {};
  if (n) {
    let m = !1, p = [];
    for (let [v, f] of Object.entries(n)) typeof f == "boolean" && (m = !0), f === !0 && p.push(v);
    m && (c["data-headlessui-state"] = p.join(" "));
  }
  if (l === "template") {
    if (u = uo(u ?? []), Object.keys(s).length > 0 || Object.keys(t).length > 0) {
      let [m, ...p] = u ?? [];
      if (!Ya(m) || p.length > 0) throw new Error(['Passing props on "template"!', "", `The current component <${o} /> is rendering a "template".`, "However we need to passthrough the following props:", Object.keys(s).concat(Object.keys(t)).map((d) => d.trim()).filter((d, h, b) => b.indexOf(d) === h).sort((d, h) => d.localeCompare(h)).map((d) => `  - ${d}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".', "Render a single element as the child so that we can forward the props onto that element."].map((d) => `  - ${d}`).join(`
`)].join(`
`));
      let v = co((i = m.props) != null ? i : {}, s, c), f = Oa(m, v, !0);
      for (let d in v) d.startsWith("on") && (f.props || (f.props = {}), f.props[d] = v[d]);
      return f;
    }
    return Array.isArray(u) && u.length === 1 ? u[0] : u;
  }
  return j(l, Object.assign({}, s, c), { default: () => u });
}
function uo(e) {
  return e.flatMap((t) => t.type === _r ? uo(t.children) : [t]);
}
function co(...e) {
  if (e.length === 0) return {};
  if (e.length === 1) return e[0];
  let t = {}, r = {};
  for (let n of e) for (let o in n) o.startsWith("on") && typeof n[o] == "function" ? (r[o] != null || (r[o] = []), r[o].push(n[o])) : t[o] = n[o];
  if (t.disabled || t["aria-disabled"]) return Object.assign(t, Object.fromEntries(Object.keys(r).map((n) => [n, void 0])));
  for (let n in r) Object.assign(t, { [n](o, ...a) {
    let i = r[n];
    for (let l of i) {
      if (o instanceof Event && o.defaultPrevented) return;
      l(o, ...a);
    }
  } });
  return t;
}
function fo(e, t = []) {
  let r = Object.assign({}, e);
  for (let n of t) n in r && delete r[n];
  return r;
}
function Ya(e) {
  return e == null ? !1 : typeof e.type == "string" || typeof e.type == "object" || typeof e.type == "function";
}
var Bt = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(Bt || {});
let br = J({ name: "Hidden", props: { as: { type: [Object, String], default: "div" }, features: { type: Number, default: 1 } }, setup(e, { slots: t, attrs: r }) {
  return () => {
    var n;
    let { features: o, ...a } = e, i = { "aria-hidden": (o & 2) === 2 ? !0 : (n = a["aria-hidden"]) != null ? n : void 0, hidden: (o & 4) === 4 ? !0 : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(o & 4) === 4 && (o & 2) !== 2 && { display: "none" } } };
    return ee({ ourProps: i, theirProps: a, slot: {}, attrs: r, slots: t, name: "Hidden" });
  };
} }), po = Symbol("Context");
var X = ((e) => (e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(X || {});
function Za() {
  return Hr() !== null;
}
function Hr() {
  return K(po, null);
}
function ei(e) {
  ne(po, e);
}
var mo = ((e) => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(mo || {});
function ti(e) {
  function t() {
    document.readyState !== "loading" && (e(), document.removeEventListener("DOMContentLoaded", t));
  }
  typeof window < "u" && typeof document < "u" && (document.addEventListener("DOMContentLoaded", t), t());
}
let Ae = [];
ti(() => {
  function e(t) {
    t.target instanceof HTMLElement && t.target !== document.body && Ae[0] !== t.target && (Ae.unshift(t.target), Ae = Ae.filter((r) => r != null && r.isConnected), Ae.splice(10));
  }
  window.addEventListener("click", e, { capture: !0 }), window.addEventListener("mousedown", e, { capture: !0 }), window.addEventListener("focus", e, { capture: !0 }), document.body.addEventListener("click", e, { capture: !0 }), document.body.addEventListener("mousedown", e, { capture: !0 }), document.body.addEventListener("focus", e, { capture: !0 });
});
function yo(e, t, r, n) {
  yt.isServer || ae((o) => {
    e = e ?? window, e.addEventListener(t, r, n), o(() => e.removeEventListener(t, r, n));
  });
}
var it = ((e) => (e[e.Forwards = 0] = "Forwards", e[e.Backwards = 1] = "Backwards", e))(it || {});
function ri() {
  let e = O(0);
  return so("keydown", (t) => {
    t.key === "Tab" && (e.value = t.shiftKey ? 1 : 0);
  }), e;
}
function ho(e) {
  if (!e) return /* @__PURE__ */ new Set();
  if (typeof e == "function") return new Set(e());
  let t = /* @__PURE__ */ new Set();
  for (let r of e.value) {
    let n = M(r);
    n instanceof HTMLElement && t.add(n);
  }
  return t;
}
var vo = ((e) => (e[e.None = 1] = "None", e[e.InitialFocus = 2] = "InitialFocus", e[e.TabLock = 4] = "TabLock", e[e.FocusLock = 8] = "FocusLock", e[e.RestoreFocus = 16] = "RestoreFocus", e[e.All = 30] = "All", e))(vo || {});
let rt = Object.assign(J({ name: "FocusTrap", props: { as: { type: [Object, String], default: "div" }, initialFocus: { type: Object, default: null }, features: { type: Number, default: 30 }, containers: { type: [Object, Function], default: O(/* @__PURE__ */ new Set()) } }, inheritAttrs: !1, setup(e, { attrs: t, slots: r, expose: n }) {
  let o = O(null);
  n({ el: o, $el: o });
  let a = P(() => Qe(o)), i = O(!1);
  _(() => i.value = !0), ie(() => i.value = !1), oi({ ownerDocument: a }, P(() => i.value && !!(e.features & 16)));
  let l = ai({ ownerDocument: a, container: o, initialFocus: P(() => e.initialFocus) }, P(() => i.value && !!(e.features & 2)));
  ii({ ownerDocument: a, container: o, containers: e.containers, previousActiveElement: l }, P(() => i.value && !!(e.features & 8)));
  let s = ri();
  function u(v) {
    let f = M(o);
    f && ((d) => d())(() => {
      me(s.value, { [it.Forwards]: () => {
        Ft(f, be.First, { skipElements: [v.relatedTarget] });
      }, [it.Backwards]: () => {
        Ft(f, be.Last, { skipElements: [v.relatedTarget] });
      } });
    });
  }
  let c = O(!1);
  function m(v) {
    v.key === "Tab" && (c.value = !0, requestAnimationFrame(() => {
      c.value = !1;
    }));
  }
  function p(v) {
    if (!i.value) return;
    let f = ho(e.containers);
    M(o) instanceof HTMLElement && f.add(M(o));
    let d = v.relatedTarget;
    d instanceof HTMLElement && d.dataset.headlessuiFocusGuard !== "true" && (go(f, d) || (c.value ? Ft(M(o), me(s.value, { [it.Forwards]: () => be.Next, [it.Backwards]: () => be.Previous }) | be.WrapAround, { relativeTo: v.target }) : v.target instanceof HTMLElement && $e(v.target)));
  }
  return () => {
    let v = {}, f = { ref: o, onKeydown: m, onFocusout: p }, { features: d, initialFocus: h, containers: b, ...w } = e;
    return j(_r, [!!(d & 4) && j(br, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: u, features: Bt.Focusable }), ee({ ourProps: f, theirProps: { ...t, ...w }, slot: v, attrs: t, slots: r, name: "FocusTrap" }), !!(d & 4) && j(br, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: u, features: Bt.Focusable })]);
  };
} }), { features: vo });
function ni(e) {
  let t = O(Ae.slice());
  return Ee([e], ([r], [n]) => {
    n === !0 && r === !1 ? Wr(() => {
      t.value.splice(0);
    }) : n === !1 && r === !0 && (t.value = Ae.slice());
  }, { flush: "post" }), () => {
    var r;
    return (r = t.value.find((n) => n != null && n.isConnected)) != null ? r : null;
  };
}
function oi({ ownerDocument: e }, t) {
  let r = ni(t);
  _(() => {
    ae(() => {
      var n, o;
      t.value || ((n = e.value) == null ? void 0 : n.activeElement) === ((o = e.value) == null ? void 0 : o.body) && $e(r());
    }, { flush: "post" });
  }), ie(() => {
    t.value && $e(r());
  });
}
function ai({ ownerDocument: e, container: t, initialFocus: r }, n) {
  let o = O(null), a = O(!1);
  return _(() => a.value = !0), ie(() => a.value = !1), _(() => {
    Ee([t, r, n], (i, l) => {
      if (i.every((u, c) => (l == null ? void 0 : l[c]) === u) || !n.value) return;
      let s = M(t);
      s && Wr(() => {
        var u, c;
        if (!a.value) return;
        let m = M(r), p = (u = e.value) == null ? void 0 : u.activeElement;
        if (m) {
          if (m === p) {
            o.value = p;
            return;
          }
        } else if (s.contains(p)) {
          o.value = p;
          return;
        }
        m ? $e(m) : Ft(s, be.First | be.NoScroll) === ao.Error && console.warn("There are no focusable elements inside the <FocusTrap />"), o.value = (c = e.value) == null ? void 0 : c.activeElement;
      });
    }, { immediate: !0, flush: "post" });
  }), o;
}
function ii({ ownerDocument: e, container: t, containers: r, previousActiveElement: n }, o) {
  var a;
  yo((a = e.value) == null ? void 0 : a.defaultView, "focus", (i) => {
    if (!o.value) return;
    let l = ho(r);
    M(t) instanceof HTMLElement && l.add(M(t));
    let s = n.value;
    if (!s) return;
    let u = i.target;
    u && u instanceof HTMLElement ? go(l, u) ? (n.value = u, $e(u)) : (i.preventDefault(), i.stopPropagation(), $e(s)) : $e(n.value);
  }, !0);
}
function go(e, t) {
  for (let r of e) if (r.contains(t)) return !0;
  return !1;
}
function li(e) {
  let t = Aa(e.getSnapshot());
  return ie(e.subscribe(() => {
    t.value = e.getSnapshot();
  })), t;
}
function si(e, t) {
  let r = e(), n = /* @__PURE__ */ new Set();
  return { getSnapshot() {
    return r;
  }, subscribe(o) {
    return n.add(o), () => n.delete(o);
  }, dispatch(o, ...a) {
    let i = t[o].call(r, ...a);
    i && (r = i, n.forEach((l) => l()));
  } };
}
function ui() {
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
function ci() {
  return lo() ? { before({ doc: e, d: t, meta: r }) {
    function n(o) {
      return r.containers.flatMap((a) => a()).some((a) => a.contains(o));
    }
    t.microTask(() => {
      var o;
      if (window.getComputedStyle(e.documentElement).scrollBehavior !== "auto") {
        let l = mt();
        l.style(e.documentElement, "scrollBehavior", "auto"), t.add(() => t.microTask(() => l.dispose()));
      }
      let a = (o = window.scrollY) != null ? o : window.pageYOffset, i = null;
      t.addEventListener(e, "click", (l) => {
        if (l.target instanceof HTMLElement) try {
          let s = l.target.closest("a");
          if (!s) return;
          let { hash: u } = new URL(s.href), c = e.querySelector(u);
          c && !n(c) && (i = c);
        } catch {
        }
      }, !0), t.addEventListener(e, "touchstart", (l) => {
        if (l.target instanceof HTMLElement) if (n(l.target)) {
          let s = l.target;
          for (; s.parentElement && n(s.parentElement); ) s = s.parentElement;
          t.style(s, "overscrollBehavior", "contain");
        } else t.style(l.target, "touchAction", "none");
      }), t.addEventListener(e, "touchmove", (l) => {
        if (l.target instanceof HTMLElement) {
          if (l.target.tagName === "INPUT") return;
          if (n(l.target)) {
            let s = l.target;
            for (; s.parentElement && s.dataset.headlessuiPortal !== "" && !(s.scrollHeight > s.clientHeight || s.scrollWidth > s.clientWidth); ) s = s.parentElement;
            s.dataset.headlessuiPortal === "" && l.preventDefault();
          } else l.preventDefault();
        }
      }, { passive: !1 }), t.add(() => {
        var l;
        let s = (l = window.scrollY) != null ? l : window.pageYOffset;
        a !== s && window.scrollTo(0, a), i && i.isConnected && (i.scrollIntoView({ block: "nearest" }), i = null);
      });
    });
  } } : {};
}
function fi() {
  return { before({ doc: e, d: t }) {
    t.style(e.documentElement, "overflow", "hidden");
  } };
}
function di(e) {
  let t = {};
  for (let r of e) Object.assign(t, r(t));
  return t;
}
let Te = si(() => /* @__PURE__ */ new Map(), { PUSH(e, t) {
  var r;
  let n = (r = this.get(e)) != null ? r : { doc: e, count: 0, d: mt(), meta: /* @__PURE__ */ new Set() };
  return n.count++, n.meta.add(t), this.set(e, n), this;
}, POP(e, t) {
  let r = this.get(e);
  return r && (r.count--, r.meta.delete(t)), this;
}, SCROLL_PREVENT({ doc: e, d: t, meta: r }) {
  let n = { doc: e, d: t, meta: di(r) }, o = [ci(), ui(), fi()];
  o.forEach(({ before: a }) => a == null ? void 0 : a(n)), o.forEach(({ after: a }) => a == null ? void 0 : a(n));
}, SCROLL_ALLOW({ d: e }) {
  e.dispose();
}, TEARDOWN({ doc: e }) {
  this.delete(e);
} });
Te.subscribe(() => {
  let e = Te.getSnapshot(), t = /* @__PURE__ */ new Map();
  for (let [r] of e) t.set(r, r.documentElement.style.overflow);
  for (let r of e.values()) {
    let n = t.get(r.doc) === "hidden", o = r.count !== 0;
    (o && !n || !o && n) && Te.dispatch(r.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", r), r.count === 0 && Te.dispatch("TEARDOWN", r);
  }
});
function pi(e, t, r) {
  let n = li(Te), o = P(() => {
    let a = e.value ? n.value.get(e.value) : void 0;
    return a ? a.count > 0 : !1;
  });
  return Ee([e, t], ([a, i], [l], s) => {
    if (!a || !i) return;
    Te.dispatch("PUSH", a, r);
    let u = !1;
    s(() => {
      u || (Te.dispatch("POP", l ?? a, r), u = !0);
    });
  }, { immediate: !0 }), o;
}
let er = /* @__PURE__ */ new Map(), nt = /* @__PURE__ */ new Map();
function dn(e, t = O(!0)) {
  ae((r) => {
    var n;
    if (!t.value) return;
    let o = M(e);
    if (!o) return;
    r(function() {
      var i;
      if (!o) return;
      let l = (i = nt.get(o)) != null ? i : 1;
      if (l === 1 ? nt.delete(o) : nt.set(o, l - 1), l !== 1) return;
      let s = er.get(o);
      s && (s["aria-hidden"] === null ? o.removeAttribute("aria-hidden") : o.setAttribute("aria-hidden", s["aria-hidden"]), o.inert = s.inert, er.delete(o));
    });
    let a = (n = nt.get(o)) != null ? n : 0;
    nt.set(o, a + 1), a === 0 && (er.set(o, { "aria-hidden": o.getAttribute("aria-hidden"), inert: o.inert }), o.setAttribute("aria-hidden", "true"), o.inert = !0);
  });
}
function mi({ defaultContainers: e = [], portals: t, mainTreeNodeRef: r } = {}) {
  let n = O(null), o = Qe(n);
  function a() {
    var i, l, s;
    let u = [];
    for (let c of e) c !== null && (c instanceof HTMLElement ? u.push(c) : "value" in c && c.value instanceof HTMLElement && u.push(c.value));
    if (t != null && t.value) for (let c of t.value) u.push(c);
    for (let c of (i = o == null ? void 0 : o.querySelectorAll("html > *, body > *")) != null ? i : []) c !== document.body && c !== document.head && c instanceof HTMLElement && c.id !== "headlessui-portal-root" && (c.contains(M(n)) || c.contains((s = (l = M(n)) == null ? void 0 : l.getRootNode()) == null ? void 0 : s.host) || u.some((m) => c.contains(m)) || u.push(c));
    return u;
  }
  return { resolveContainers: a, contains(i) {
    return a().some((l) => l.contains(i));
  }, mainTreeNodeRef: n, MainTreeNode() {
    return r != null ? null : j(br, { features: Bt.Hidden, ref: n });
  } };
}
let bo = Symbol("ForcePortalRootContext");
function yi() {
  return K(bo, !1);
}
let wr = J({ name: "ForcePortalRoot", props: { as: { type: [Object, String], default: "template" }, force: { type: Boolean, default: !1 } }, setup(e, { slots: t, attrs: r }) {
  return ne(bo, e.force), () => {
    let { force: n, ...o } = e;
    return ee({ theirProps: o, ourProps: {}, slot: {}, slots: t, attrs: r, name: "ForcePortalRoot" });
  };
} }), wo = Symbol("StackContext");
var Sr = ((e) => (e[e.Add = 0] = "Add", e[e.Remove = 1] = "Remove", e))(Sr || {});
function hi() {
  return K(wo, () => {
  });
}
function vi({ type: e, enabled: t, element: r, onUpdate: n }) {
  let o = hi();
  function a(...i) {
    n == null || n(...i), o(...i);
  }
  _(() => {
    Ee(t, (i, l) => {
      i ? a(0, e, r) : l === !0 && a(1, e, r);
    }, { immediate: !0, flush: "sync" });
  }), ie(() => {
    t.value && a(1, e, r);
  }), ne(wo, a);
}
let So = Symbol("DescriptionContext");
function gi() {
  let e = K(So, null);
  if (e === null) throw new Error("Missing parent");
  return e;
}
function bi({ slot: e = O({}), name: t = "Description", props: r = {} } = {}) {
  let n = O([]);
  function o(a) {
    return n.value.push(a), () => {
      let i = n.value.indexOf(a);
      i !== -1 && n.value.splice(i, 1);
    };
  }
  return ne(So, { register: o, slot: e, name: t, props: r }), P(() => n.value.length > 0 ? n.value.join(" ") : void 0);
}
J({ name: "Description", props: { as: { type: [Object, String], default: "p" }, id: { type: String, default: null } }, setup(e, { attrs: t, slots: r }) {
  var n;
  let o = (n = e.id) != null ? n : `headlessui-description-${Ie()}`, a = gi();
  return _(() => ie(a.register(o))), () => {
    let { name: i = "Description", slot: l = O({}), props: s = {} } = a, { ...u } = e, c = { ...Object.entries(s).reduce((m, [p, v]) => Object.assign(m, { [p]: k(v) }), {}), id: o };
    return ee({ ourProps: c, theirProps: u, slot: l.value, attrs: t, slots: r, name: i });
  };
} });
function wi(e) {
  let t = Qe(e);
  if (!t) {
    if (e === null) return null;
    throw new Error(`[Headless UI]: Cannot find ownerDocument for contextElement: ${e}`);
  }
  let r = t.getElementById("headlessui-portal-root");
  if (r) return r;
  let n = t.createElement("div");
  return n.setAttribute("id", "headlessui-portal-root"), t.body.appendChild(n);
}
const Er = /* @__PURE__ */ new WeakMap();
function Si(e) {
  var t;
  return (t = Er.get(e)) != null ? t : 0;
}
function pn(e, t) {
  let r = t(Si(e));
  return r <= 0 ? Er.delete(e) : Er.set(e, r), r;
}
let Eo = J({ name: "Portal", props: { as: { type: [Object, String], default: "div" } }, setup(e, { slots: t, attrs: r }) {
  let n = O(null), o = P(() => Qe(n)), a = yi(), i = K(xo, null), l = O(a === !0 || i == null ? wi(n.value) : i.resolveTarget());
  l.value && pn(l.value, (p) => p + 1);
  let s = O(!1);
  _(() => {
    s.value = !0;
  }), ae(() => {
    a || i != null && (l.value = i.resolveTarget());
  });
  let u = K(xr, null), c = !1, m = Pa();
  return Ee(n, () => {
    if (c || !u) return;
    let p = M(n);
    p && (ie(u.register(p), m), c = !0);
  }), ie(() => {
    var p, v;
    let f = (p = o.value) == null ? void 0 : p.getElementById("headlessui-portal-root");
    !f || l.value !== f || pn(l.value, (d) => d - 1) || l.value.children.length > 0 || (v = l.value.parentElement) == null || v.removeChild(l.value);
  }), () => {
    if (!s.value || l.value === null) return null;
    let p = { ref: n, "data-headlessui-portal": "" };
    return j(Ta, { to: l.value }, ee({ ourProps: p, theirProps: e, slot: {}, attrs: r, slots: t, name: "Portal" }));
  };
} }), xr = Symbol("PortalParentContext");
function Ei() {
  let e = K(xr, null), t = O([]);
  function r(a) {
    return t.value.push(a), e && e.register(a), () => n(a);
  }
  function n(a) {
    let i = t.value.indexOf(a);
    i !== -1 && t.value.splice(i, 1), e && e.unregister(a);
  }
  let o = { register: r, unregister: n, portals: t };
  return [t, J({ name: "PortalWrapper", setup(a, { slots: i }) {
    return ne(xr, o), () => {
      var l;
      return (l = i.default) == null ? void 0 : l.call(i);
    };
  } })];
}
let xo = Symbol("PortalGroupContext"), xi = J({ name: "PortalGroup", props: { as: { type: [Object, String], default: "template" }, target: { type: Object, default: null } }, setup(e, { attrs: t, slots: r }) {
  let n = Ra({ resolveTarget() {
    return e.target;
  } });
  return ne(xo, n), () => {
    let { target: o, ...a } = e;
    return ee({ theirProps: a, ourProps: {}, slot: {}, attrs: t, slots: r, name: "PortalGroup" });
  };
} });
var Oi = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(Oi || {});
let Or = Symbol("DialogContext");
function ht(e) {
  let t = K(Or, null);
  if (t === null) {
    let r = new Error(`<${e} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(r, ht), r;
  }
  return t;
}
let At = "DC8F892D-2EBD-447C-A4C8-A03058436FF4", Ai = J({ name: "Dialog", inheritAttrs: !1, props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: !1 }, unmount: { type: Boolean, default: !0 }, open: { type: [Boolean, String], default: At }, initialFocus: { type: Object, default: null }, id: { type: String, default: null }, role: { type: String, default: "dialog" } }, emits: { close: (e) => !0 }, setup(e, { emit: t, attrs: r, slots: n, expose: o }) {
  var a, i;
  let l = (a = e.id) != null ? a : `headlessui-dialog-${Ie()}`, s = O(!1);
  _(() => {
    s.value = !0;
  });
  let u = !1, c = P(() => e.role === "dialog" || e.role === "alertdialog" ? e.role : (u || (u = !0, console.warn(`Invalid role [${c}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog")), m = O(0), p = Hr(), v = P(() => e.open === At && p !== null ? (p.value & X.Open) === X.Open : e.open), f = O(null), d = P(() => Qe(f));
  if (o({ el: f, $el: f }), !(e.open !== At || p !== null)) throw new Error("You forgot to provide an `open` prop to the `Dialog`.");
  if (typeof v.value != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${v.value === At ? void 0 : e.open}`);
  let h = P(() => s.value && v.value ? 0 : 1), b = P(() => h.value === 0), w = P(() => m.value > 1), g = K(Or, null) !== null, [S, x] = Ei(), { resolveContainers: T, mainTreeNodeRef: R, MainTreeNode: F } = mi({ portals: S, defaultContainers: [P(() => {
    var C;
    return (C = ue.panelRef.value) != null ? C : f.value;
  })] }), q = P(() => w.value ? "parent" : "leaf"), Q = P(() => p !== null ? (p.value & X.Closing) === X.Closing : !1), he = P(() => g || Q.value ? !1 : b.value), se = P(() => {
    var C, L, te;
    return (te = Array.from((L = (C = d.value) == null ? void 0 : C.querySelectorAll("body > *")) != null ? L : []).find((re) => re.id === "headlessui-portal-root" ? !1 : re.contains(M(R)) && re instanceof HTMLElement)) != null ? te : null;
  });
  dn(se, he);
  let $ = P(() => w.value ? !0 : b.value), z = P(() => {
    var C, L, te;
    return (te = Array.from((L = (C = d.value) == null ? void 0 : C.querySelectorAll("[data-headlessui-portal]")) != null ? L : []).find((re) => re.contains(M(R)) && re instanceof HTMLElement)) != null ? te : null;
  });
  dn(z, $), vi({ type: "Dialog", enabled: P(() => h.value === 0), element: f, onUpdate: (C, L) => {
    if (L === "Dialog") return me(C, { [Sr.Add]: () => m.value += 1, [Sr.Remove]: () => m.value -= 1 });
  } });
  let I = bi({ name: "DialogDescription", slot: P(() => ({ open: v.value })) }), H = O(null), ue = { titleId: H, panelRef: O(null), dialogState: h, setTitleId(C) {
    H.value !== C && (H.value = C);
  }, close() {
    t("close", !1);
  } };
  ne(Or, ue);
  let St = P(() => !(!b.value || w.value));
  Xa(T, (C, L) => {
    C.preventDefault(), ue.close(), eo(() => L == null ? void 0 : L.focus());
  }, St);
  let tt = P(() => !(w.value || h.value !== 0));
  yo((i = d.value) == null ? void 0 : i.defaultView, "keydown", (C) => {
    tt.value && (C.defaultPrevented || C.key === mo.Escape && (C.preventDefault(), C.stopPropagation(), ue.close()));
  });
  let ke = P(() => !(Q.value || h.value !== 0 || g));
  return pi(d, ke, (C) => {
    var L;
    return { containers: [...(L = C.containers) != null ? L : [], T] };
  }), ae((C) => {
    if (h.value !== 0) return;
    let L = M(f);
    if (!L) return;
    let te = new ResizeObserver((re) => {
      for (let Yt of re) {
        let Et = Yt.target.getBoundingClientRect();
        Et.x === 0 && Et.y === 0 && Et.width === 0 && Et.height === 0 && ue.close();
      }
    });
    te.observe(L), C(() => te.disconnect());
  }), () => {
    let { open: C, initialFocus: L, ...te } = e, re = { ...r, ref: f, id: l, role: c.value, "aria-modal": h.value === 0 ? !0 : void 0, "aria-labelledby": H.value, "aria-describedby": I.value }, Yt = { open: h.value === 0 };
    return j(wr, { force: !0 }, () => [j(Eo, () => j(xi, { target: f.value }, () => j(wr, { force: !1 }, () => j(rt, { initialFocus: L, containers: T, features: b.value ? me(q.value, { parent: rt.features.RestoreFocus, leaf: rt.features.All & ~rt.features.FocusLock }) : rt.features.None }, () => j(x, {}, () => ee({ ourProps: re, theirProps: { ...te, ...r }, slot: Yt, attrs: r, slots: n, visible: h.value === 0, features: Mt.RenderStrategy | Mt.Static, name: "Dialog" })))))), j(F)]);
  };
} });
J({ name: "DialogOverlay", props: { as: { type: [Object, String], default: "div" }, id: { type: String, default: null } }, setup(e, { attrs: t, slots: r }) {
  var n;
  let o = (n = e.id) != null ? n : `headlessui-dialog-overlay-${Ie()}`, a = ht("DialogOverlay");
  function i(l) {
    l.target === l.currentTarget && (l.preventDefault(), l.stopPropagation(), a.close());
  }
  return () => {
    let { ...l } = e;
    return ee({ ourProps: { id: o, "aria-hidden": !0, onClick: i }, theirProps: l, slot: { open: a.dialogState.value === 0 }, attrs: t, slots: r, name: "DialogOverlay" });
  };
} });
J({ name: "DialogBackdrop", props: { as: { type: [Object, String], default: "div" }, id: { type: String, default: null } }, inheritAttrs: !1, setup(e, { attrs: t, slots: r, expose: n }) {
  var o;
  let a = (o = e.id) != null ? o : `headlessui-dialog-backdrop-${Ie()}`, i = ht("DialogBackdrop"), l = O(null);
  return n({ el: l, $el: l }), _(() => {
    if (i.panelRef.value === null) throw new Error("A <DialogBackdrop /> component is being used, but a <DialogPanel /> component is missing.");
  }), () => {
    let { ...s } = e, u = { id: a, ref: l, "aria-hidden": !0 };
    return j(wr, { force: !0 }, () => j(Eo, () => ee({ ourProps: u, theirProps: { ...t, ...s }, slot: { open: i.dialogState.value === 0 }, attrs: t, slots: r, name: "DialogBackdrop" })));
  };
} });
let Oo = J({ name: "DialogPanel", props: { as: { type: [Object, String], default: "div" }, id: { type: String, default: null } }, setup(e, { attrs: t, slots: r, expose: n }) {
  var o;
  let a = (o = e.id) != null ? o : `headlessui-dialog-panel-${Ie()}`, i = ht("DialogPanel");
  n({ el: i.panelRef, $el: i.panelRef });
  function l(s) {
    s.stopPropagation();
  }
  return () => {
    let { ...s } = e, u = { id: a, ref: i.panelRef, onClick: l };
    return ee({ ourProps: u, theirProps: s, slot: { open: i.dialogState.value === 0 }, attrs: t, slots: r, name: "DialogPanel" });
  };
} });
J({ name: "DialogTitle", props: { as: { type: [Object, String], default: "h2" }, id: { type: String, default: null } }, setup(e, { attrs: t, slots: r }) {
  var n;
  let o = (n = e.id) != null ? n : `headlessui-dialog-title-${Ie()}`, a = ht("DialogTitle");
  return _(() => {
    a.setTitleId(o), ie(() => a.setTitleId(null));
  }), () => {
    let { ...i } = e;
    return ee({ ourProps: { id: o }, theirProps: i, slot: { open: a.dialogState.value === 0 }, attrs: t, slots: r, name: "DialogTitle" });
  };
} });
function Pi(e) {
  let t = { called: !1 };
  return (...r) => {
    if (!t.called) return t.called = !0, e(...r);
  };
}
function tr(e, ...t) {
  e && t.length > 0 && e.classList.add(...t);
}
function Pt(e, ...t) {
  e && t.length > 0 && e.classList.remove(...t);
}
var Ar = ((e) => (e.Finished = "finished", e.Cancelled = "cancelled", e))(Ar || {});
function Ti(e, t) {
  let r = mt();
  if (!e) return r.dispose;
  let { transitionDuration: n, transitionDelay: o } = getComputedStyle(e), [a, i] = [n, o].map((l) => {
    let [s = 0] = l.split(",").filter(Boolean).map((u) => u.includes("ms") ? parseFloat(u) : parseFloat(u) * 1e3).sort((u, c) => c - u);
    return s;
  });
  return a !== 0 ? r.setTimeout(() => t("finished"), a + i) : t("finished"), r.add(() => t("cancelled")), r.dispose;
}
function mn(e, t, r, n, o, a) {
  let i = mt(), l = a !== void 0 ? Pi(a) : () => {
  };
  return Pt(e, ...o), tr(e, ...t, ...r), i.nextFrame(() => {
    Pt(e, ...r), tr(e, ...n), i.add(Ti(e, (s) => (Pt(e, ...n, ...t), tr(e, ...o), l(s))));
  }), i.add(() => Pt(e, ...t, ...r, ...n, ...o)), i.add(() => l("cancelled")), i.dispose;
}
function Oe(e = "") {
  return e.split(/\s+/).filter((t) => t.length > 1);
}
let qr = Symbol("TransitionContext");
var Ri = ((e) => (e.Visible = "visible", e.Hidden = "hidden", e))(Ri || {});
function Ci() {
  return K(qr, null) !== null;
}
function Fi() {
  let e = K(qr, null);
  if (e === null) throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  return e;
}
function $i() {
  let e = K(zr, null);
  if (e === null) throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  return e;
}
let zr = Symbol("NestingContext");
function zt(e) {
  return "children" in e ? zt(e.children) : e.value.filter(({ state: t }) => t === "visible").length > 0;
}
function Ao(e) {
  let t = O([]), r = O(!1);
  _(() => r.value = !0), ie(() => r.value = !1);
  function n(a, i = we.Hidden) {
    let l = t.value.findIndex(({ id: s }) => s === a);
    l !== -1 && (me(i, { [we.Unmount]() {
      t.value.splice(l, 1);
    }, [we.Hidden]() {
      t.value[l].state = "hidden";
    } }), !zt(t) && r.value && (e == null || e()));
  }
  function o(a) {
    let i = t.value.find(({ id: l }) => l === a);
    return i ? i.state !== "visible" && (i.state = "visible") : t.value.push({ id: a, state: "visible" }), () => n(a, we.Unmount);
  }
  return { children: t, register: o, unregister: n };
}
let Po = Mt.RenderStrategy, Vt = J({ props: { as: { type: [Object, String], default: "div" }, show: { type: [Boolean], default: null }, unmount: { type: [Boolean], default: !0 }, appear: { type: [Boolean], default: !1 }, enter: { type: [String], default: "" }, enterFrom: { type: [String], default: "" }, enterTo: { type: [String], default: "" }, entered: { type: [String], default: "" }, leave: { type: [String], default: "" }, leaveFrom: { type: [String], default: "" }, leaveTo: { type: [String], default: "" } }, emits: { beforeEnter: () => !0, afterEnter: () => !0, beforeLeave: () => !0, afterLeave: () => !0 }, setup(e, { emit: t, attrs: r, slots: n, expose: o }) {
  let a = O(0);
  function i() {
    a.value |= X.Opening, t("beforeEnter");
  }
  function l() {
    a.value &= ~X.Opening, t("afterEnter");
  }
  function s() {
    a.value |= X.Closing, t("beforeLeave");
  }
  function u() {
    a.value &= ~X.Closing, t("afterLeave");
  }
  if (!Ci() && Za()) return () => j(To, { ...e, onBeforeEnter: i, onAfterEnter: l, onBeforeLeave: s, onAfterLeave: u }, n);
  let c = O(null), m = P(() => e.unmount ? we.Unmount : we.Hidden);
  o({ el: c, $el: c });
  let { show: p, appear: v } = Fi(), { register: f, unregister: d } = $i(), h = O(p.value ? "visible" : "hidden"), b = { value: !0 }, w = Ie(), g = { value: !1 }, S = Ao(() => {
    !g.value && h.value !== "hidden" && (h.value = "hidden", d(w), u());
  });
  _(() => {
    let $ = f(w);
    ie($);
  }), ae(() => {
    if (m.value === we.Hidden && w) {
      if (p.value && h.value !== "visible") {
        h.value = "visible";
        return;
      }
      me(h.value, { hidden: () => d(w), visible: () => f(w) });
    }
  });
  let x = Oe(e.enter), T = Oe(e.enterFrom), R = Oe(e.enterTo), F = Oe(e.entered), q = Oe(e.leave), Q = Oe(e.leaveFrom), he = Oe(e.leaveTo);
  _(() => {
    ae(() => {
      if (h.value === "visible") {
        let $ = M(c);
        if ($ instanceof Comment && $.data === "") throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
      }
    });
  });
  function se($) {
    let z = b.value && !v.value, I = M(c);
    !I || !(I instanceof HTMLElement) || z || (g.value = !0, p.value && i(), p.value || s(), $(p.value ? mn(I, x, T, R, F, (H) => {
      g.value = !1, H === Ar.Finished && l();
    }) : mn(I, q, Q, he, F, (H) => {
      g.value = !1, H === Ar.Finished && (zt(S) || (h.value = "hidden", d(w), u()));
    })));
  }
  return _(() => {
    Ee([p], ($, z, I) => {
      se(I), b.value = !1;
    }, { immediate: !0 });
  }), ne(zr, S), ei(P(() => me(h.value, { visible: X.Open, hidden: X.Closed }) | a.value)), () => {
    let { appear: $, show: z, enter: I, enterFrom: H, enterTo: ue, entered: St, leave: tt, leaveFrom: ke, leaveTo: C, ...L } = e, te = { ref: c }, re = { ...L, ...v.value && p.value && yt.isServer ? { class: Ce([r.class, L.class, ...x, ...T]) } : {} };
    return ee({ theirProps: re, ourProps: te, slot: {}, slots: n, attrs: r, features: Po, visible: h.value === "visible", name: "TransitionChild" });
  };
} }), Di = Vt, To = J({ inheritAttrs: !1, props: { as: { type: [Object, String], default: "div" }, show: { type: [Boolean], default: null }, unmount: { type: [Boolean], default: !0 }, appear: { type: [Boolean], default: !1 }, enter: { type: [String], default: "" }, enterFrom: { type: [String], default: "" }, enterTo: { type: [String], default: "" }, entered: { type: [String], default: "" }, leave: { type: [String], default: "" }, leaveFrom: { type: [String], default: "" }, leaveTo: { type: [String], default: "" } }, emits: { beforeEnter: () => !0, afterEnter: () => !0, beforeLeave: () => !0, afterLeave: () => !0 }, setup(e, { emit: t, attrs: r, slots: n }) {
  let o = Hr(), a = P(() => e.show === null && o !== null ? (o.value & X.Open) === X.Open : e.show);
  ae(() => {
    if (![!0, !1].includes(a.value)) throw new Error('A <Transition /> is used but it is missing a `:show="true | false"` prop.');
  });
  let i = O(a.value ? "visible" : "hidden"), l = Ao(() => {
    i.value = "hidden";
  }), s = O(!0), u = { show: a, appear: P(() => e.appear || !s.value) };
  return _(() => {
    ae(() => {
      s.value = !1, a.value ? i.value = "visible" : zt(l) || (i.value = "hidden");
    });
  }), ne(zr, l), ne(qr, u), () => {
    let c = fo(e, ["show", "appear", "unmount", "onBeforeEnter", "onBeforeLeave", "onAfterEnter", "onAfterLeave"]), m = { unmount: e.unmount };
    return ee({ ourProps: { ...m, as: "template" }, theirProps: {}, slot: {}, slots: { ...n, default: () => [j(Di, { onBeforeEnter: () => t("beforeEnter"), onAfterEnter: () => t("afterEnter"), onBeforeLeave: () => t("beforeLeave"), onAfterLeave: () => t("afterLeave"), ...r, ...m, ...c }, n.default)] }, attrs: {}, features: Po, visible: i.value === "visible", name: "Transition" });
  };
} });
const Li = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, o] of t)
    r[n] = o;
  return r;
}, Ni = {}, Mi = {
  type: "button",
  class: "im-close-button text-gray-400 hover:text-gray-500"
};
function Bi(e, t) {
  return Y(), Me("button", Mi, t[0] || (t[0] = [
    He("span", { class: "sr-only" }, "Close", -1),
    He("svg", {
      class: "size-6",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      "stroke-width": "2",
      stroke: "currentColor",
      "aria-hidden": "true"
    }, [
      He("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M6 18L18 6M6 6l12 12"
      })
    ], -1)
  ]));
}
const Ro = /* @__PURE__ */ Li(Ni, [["render", Bi]]), Ii = { class: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4" }, ki = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, Ui = {
  __name: "ModalContent",
  props: {
    modalContext: Object,
    modalProps: Object
  },
  setup(e) {
    return (t, r) => (Y(), Me("div", Ii, [
      He("div", {
        class: Ce(["im-modal-positioner flex min-h-full justify-center", {
          "items-start": e.modalProps.position === "top",
          "items-center": e.modalProps.position === "center",
          "items-end": e.modalProps.position === "bottom"
        }])
      }, [
        Fe(k(Vt), {
          "enter-from": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          "enter-to": "opacity-100 translate-y-0 sm:scale-100",
          "leave-from": "opacity-100 translate-y-0 sm:scale-100",
          "leave-to": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          class: Ce({
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
          default: pe(() => [
            Fe(k(Oo), {
              class: Ce(["im-modal-content relative", [e.modalProps.paddingClasses, e.modalProps.panelClasses]])
            }, {
              default: pe(() => [
                e.modalProps.closeButton ? (Y(), Me("div", ki, [
                  Fe(Ro, {
                    onClick: e.modalContext.close
                  }, null, 8, ["onClick"])
                ])) : ct("", !0),
                pt(t.$slots, "default", {
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
};
function Co(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: ji } = Object.prototype, { getPrototypeOf: Vr } = Object, Gt = /* @__PURE__ */ ((e) => (t) => {
  const r = ji.call(t);
  return e[r] || (e[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), le = (e) => (e = e.toLowerCase(), (t) => Gt(t) === e), Kt = (e) => (t) => typeof t === e, { isArray: Xe } = Array, ft = Kt("undefined");
function _i(e) {
  return e !== null && !ft(e) && e.constructor !== null && !ft(e.constructor) && Z(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Fo = le("ArrayBuffer");
function Wi(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Fo(e.buffer), t;
}
const Hi = Kt("string"), Z = Kt("function"), $o = Kt("number"), Jt = (e) => e !== null && typeof e == "object", qi = (e) => e === !0 || e === !1, $t = (e) => {
  if (Gt(e) !== "object")
    return !1;
  const t = Vr(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, zi = le("Date"), Vi = le("File"), Gi = le("Blob"), Ki = le("FileList"), Ji = (e) => Jt(e) && Z(e.pipe), Qi = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || Z(e.append) && ((t = Gt(e)) === "formdata" || // detect form-data instance
  t === "object" && Z(e.toString) && e.toString() === "[object FormData]"));
}, Xi = le("URLSearchParams"), [Yi, Zi, el, tl] = ["ReadableStream", "Request", "Response", "Headers"].map(le), rl = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function vt(e, t, { allOwnKeys: r = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let n, o;
  if (typeof e != "object" && (e = [e]), Xe(e))
    for (n = 0, o = e.length; n < o; n++)
      t.call(null, e[n], n, e);
  else {
    const a = r ? Object.getOwnPropertyNames(e) : Object.keys(e), i = a.length;
    let l;
    for (n = 0; n < i; n++)
      l = a[n], t.call(null, e[l], l, e);
  }
}
function Do(e, t) {
  t = t.toLowerCase();
  const r = Object.keys(e);
  let n = r.length, o;
  for (; n-- > 0; )
    if (o = r[n], t === o.toLowerCase())
      return o;
  return null;
}
const Re = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Lo = (e) => !ft(e) && e !== Re;
function Pr() {
  const { caseless: e } = Lo(this) && this || {}, t = {}, r = (n, o) => {
    const a = e && Do(t, o) || o;
    $t(t[a]) && $t(n) ? t[a] = Pr(t[a], n) : $t(n) ? t[a] = Pr({}, n) : Xe(n) ? t[a] = n.slice() : t[a] = n;
  };
  for (let n = 0, o = arguments.length; n < o; n++)
    arguments[n] && vt(arguments[n], r);
  return t;
}
const nl = (e, t, r, { allOwnKeys: n } = {}) => (vt(t, (o, a) => {
  r && Z(o) ? e[a] = Co(o, r) : e[a] = o;
}, { allOwnKeys: n }), e), ol = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), al = (e, t, r, n) => {
  e.prototype = Object.create(t.prototype, n), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), r && Object.assign(e.prototype, r);
}, il = (e, t, r, n) => {
  let o, a, i;
  const l = {};
  if (t = t || {}, e == null) return t;
  do {
    for (o = Object.getOwnPropertyNames(e), a = o.length; a-- > 0; )
      i = o[a], (!n || n(i, e, t)) && !l[i] && (t[i] = e[i], l[i] = !0);
    e = r !== !1 && Vr(e);
  } while (e && (!r || r(e, t)) && e !== Object.prototype);
  return t;
}, ll = (e, t, r) => {
  e = String(e), (r === void 0 || r > e.length) && (r = e.length), r -= t.length;
  const n = e.indexOf(t, r);
  return n !== -1 && n === r;
}, sl = (e) => {
  if (!e) return null;
  if (Xe(e)) return e;
  let t = e.length;
  if (!$o(t)) return null;
  const r = new Array(t);
  for (; t-- > 0; )
    r[t] = e[t];
  return r;
}, ul = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Vr(Uint8Array)), cl = (e, t) => {
  const n = (e && e[Symbol.iterator]).call(e);
  let o;
  for (; (o = n.next()) && !o.done; ) {
    const a = o.value;
    t.call(e, a[0], a[1]);
  }
}, fl = (e, t) => {
  let r;
  const n = [];
  for (; (r = e.exec(t)) !== null; )
    n.push(r);
  return n;
}, dl = le("HTMLFormElement"), pl = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(r, n, o) {
    return n.toUpperCase() + o;
  }
), yn = (({ hasOwnProperty: e }) => (t, r) => e.call(t, r))(Object.prototype), ml = le("RegExp"), No = (e, t) => {
  const r = Object.getOwnPropertyDescriptors(e), n = {};
  vt(r, (o, a) => {
    let i;
    (i = t(o, a, e)) !== !1 && (n[a] = i || o);
  }), Object.defineProperties(e, n);
}, yl = (e) => {
  No(e, (t, r) => {
    if (Z(e) && ["arguments", "caller", "callee"].indexOf(r) !== -1)
      return !1;
    const n = e[r];
    if (Z(n)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + r + "'");
      });
    }
  });
}, hl = (e, t) => {
  const r = {}, n = (o) => {
    o.forEach((a) => {
      r[a] = !0;
    });
  };
  return Xe(e) ? n(e) : n(String(e).split(t)), r;
}, vl = () => {
}, gl = (e, t) => e != null && Number.isFinite(e = +e) ? e : t, rr = "abcdefghijklmnopqrstuvwxyz", hn = "0123456789", Mo = {
  DIGIT: hn,
  ALPHA: rr,
  ALPHA_DIGIT: rr + rr.toUpperCase() + hn
}, bl = (e = 16, t = Mo.ALPHA_DIGIT) => {
  let r = "";
  const { length: n } = t;
  for (; e--; )
    r += t[Math.random() * n | 0];
  return r;
};
function wl(e) {
  return !!(e && Z(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const Sl = (e) => {
  const t = new Array(10), r = (n, o) => {
    if (Jt(n)) {
      if (t.indexOf(n) >= 0)
        return;
      if (!("toJSON" in n)) {
        t[o] = n;
        const a = Xe(n) ? [] : {};
        return vt(n, (i, l) => {
          const s = r(i, o + 1);
          !ft(s) && (a[l] = s);
        }), t[o] = void 0, a;
      }
    }
    return n;
  };
  return r(e, 0);
}, El = le("AsyncFunction"), xl = (e) => e && (Jt(e) || Z(e)) && Z(e.then) && Z(e.catch), Bo = ((e, t) => e ? setImmediate : t ? ((r, n) => (Re.addEventListener("message", ({ source: o, data: a }) => {
  o === Re && a === r && n.length && n.shift()();
}, !1), (o) => {
  n.push(o), Re.postMessage(r, "*");
}))(`axios@${Math.random()}`, []) : (r) => setTimeout(r))(
  typeof setImmediate == "function",
  Z(Re.postMessage)
), Ol = typeof queueMicrotask < "u" ? queueMicrotask.bind(Re) : typeof process < "u" && process.nextTick || Bo, y = {
  isArray: Xe,
  isArrayBuffer: Fo,
  isBuffer: _i,
  isFormData: Qi,
  isArrayBufferView: Wi,
  isString: Hi,
  isNumber: $o,
  isBoolean: qi,
  isObject: Jt,
  isPlainObject: $t,
  isReadableStream: Yi,
  isRequest: Zi,
  isResponse: el,
  isHeaders: tl,
  isUndefined: ft,
  isDate: zi,
  isFile: Vi,
  isBlob: Gi,
  isRegExp: ml,
  isFunction: Z,
  isStream: Ji,
  isURLSearchParams: Xi,
  isTypedArray: ul,
  isFileList: Ki,
  forEach: vt,
  merge: Pr,
  extend: nl,
  trim: rl,
  stripBOM: ol,
  inherits: al,
  toFlatObject: il,
  kindOf: Gt,
  kindOfTest: le,
  endsWith: ll,
  toArray: sl,
  forEachEntry: cl,
  matchAll: fl,
  isHTMLForm: dl,
  hasOwnProperty: yn,
  hasOwnProp: yn,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: No,
  freezeMethods: yl,
  toObjectSet: hl,
  toCamelCase: pl,
  noop: vl,
  toFiniteNumber: gl,
  findKey: Do,
  global: Re,
  isContextDefined: Lo,
  ALPHABET: Mo,
  generateString: bl,
  isSpecCompliantForm: wl,
  toJSONObject: Sl,
  isAsyncFn: El,
  isThenable: xl,
  setImmediate: Bo,
  asap: Ol
};
function E(e, t, r, n, o) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), r && (this.config = r), n && (this.request = n), o && (this.response = o, this.status = o.status ? o.status : null);
}
y.inherits(E, Error, {
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
      config: y.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const Io = E.prototype, ko = {};
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
  ko[e] = { value: e };
});
Object.defineProperties(E, ko);
Object.defineProperty(Io, "isAxiosError", { value: !0 });
E.from = (e, t, r, n, o, a) => {
  const i = Object.create(Io);
  return y.toFlatObject(e, i, function(s) {
    return s !== Error.prototype;
  }, (l) => l !== "isAxiosError"), E.call(i, e.message, t, r, n, o), i.cause = e, i.name = e.name, a && Object.assign(i, a), i;
};
const Al = null;
function Tr(e) {
  return y.isPlainObject(e) || y.isArray(e);
}
function Uo(e) {
  return y.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function vn(e, t, r) {
  return e ? e.concat(t).map(function(o, a) {
    return o = Uo(o), !r && a ? "[" + o + "]" : o;
  }).join(r ? "." : "") : t;
}
function Pl(e) {
  return y.isArray(e) && !e.some(Tr);
}
const Tl = y.toFlatObject(y, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function Qt(e, t, r) {
  if (!y.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), r = y.toFlatObject(r, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(d, h) {
    return !y.isUndefined(h[d]);
  });
  const n = r.metaTokens, o = r.visitor || c, a = r.dots, i = r.indexes, s = (r.Blob || typeof Blob < "u" && Blob) && y.isSpecCompliantForm(t);
  if (!y.isFunction(o))
    throw new TypeError("visitor must be a function");
  function u(f) {
    if (f === null) return "";
    if (y.isDate(f))
      return f.toISOString();
    if (!s && y.isBlob(f))
      throw new E("Blob is not supported. Use a Buffer instead.");
    return y.isArrayBuffer(f) || y.isTypedArray(f) ? s && typeof Blob == "function" ? new Blob([f]) : Buffer.from(f) : f;
  }
  function c(f, d, h) {
    let b = f;
    if (f && !h && typeof f == "object") {
      if (y.endsWith(d, "{}"))
        d = n ? d : d.slice(0, -2), f = JSON.stringify(f);
      else if (y.isArray(f) && Pl(f) || (y.isFileList(f) || y.endsWith(d, "[]")) && (b = y.toArray(f)))
        return d = Uo(d), b.forEach(function(g, S) {
          !(y.isUndefined(g) || g === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            i === !0 ? vn([d], S, a) : i === null ? d : d + "[]",
            u(g)
          );
        }), !1;
    }
    return Tr(f) ? !0 : (t.append(vn(h, d, a), u(f)), !1);
  }
  const m = [], p = Object.assign(Tl, {
    defaultVisitor: c,
    convertValue: u,
    isVisitable: Tr
  });
  function v(f, d) {
    if (!y.isUndefined(f)) {
      if (m.indexOf(f) !== -1)
        throw Error("Circular reference detected in " + d.join("."));
      m.push(f), y.forEach(f, function(b, w) {
        (!(y.isUndefined(b) || b === null) && o.call(
          t,
          b,
          y.isString(w) ? w.trim() : w,
          d,
          p
        )) === !0 && v(b, d ? d.concat(w) : [w]);
      }), m.pop();
    }
  }
  if (!y.isObject(e))
    throw new TypeError("data must be an object");
  return v(e), t;
}
function gn(e) {
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
function Gr(e, t) {
  this._pairs = [], e && Qt(e, this, t);
}
const jo = Gr.prototype;
jo.append = function(t, r) {
  this._pairs.push([t, r]);
};
jo.toString = function(t) {
  const r = t ? function(n) {
    return t.call(this, n, gn);
  } : gn;
  return this._pairs.map(function(o) {
    return r(o[0]) + "=" + r(o[1]);
  }, "").join("&");
};
function Rl(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function _o(e, t, r) {
  if (!t)
    return e;
  const n = r && r.encode || Rl, o = r && r.serialize;
  let a;
  if (o ? a = o(t, r) : a = y.isURLSearchParams(t) ? t.toString() : new Gr(t, r).toString(n), a) {
    const i = e.indexOf("#");
    i !== -1 && (e = e.slice(0, i)), e += (e.indexOf("?") === -1 ? "?" : "&") + a;
  }
  return e;
}
class bn {
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
    y.forEach(this.handlers, function(n) {
      n !== null && t(n);
    });
  }
}
const Wo = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Cl = typeof URLSearchParams < "u" ? URLSearchParams : Gr, Fl = typeof FormData < "u" ? FormData : null, $l = typeof Blob < "u" ? Blob : null, Dl = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Cl,
    FormData: Fl,
    Blob: $l
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, Kr = typeof window < "u" && typeof document < "u", Rr = typeof navigator == "object" && navigator || void 0, Ll = Kr && (!Rr || ["ReactNative", "NativeScript", "NS"].indexOf(Rr.product) < 0), Nl = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Ml = Kr && window.location.href || "http://localhost", Bl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: Kr,
  hasStandardBrowserEnv: Ll,
  hasStandardBrowserWebWorkerEnv: Nl,
  navigator: Rr,
  origin: Ml
}, Symbol.toStringTag, { value: "Module" })), V = {
  ...Bl,
  ...Dl
};
function Il(e, t) {
  return Qt(e, new V.classes.URLSearchParams(), Object.assign({
    visitor: function(r, n, o, a) {
      return V.isNode && y.isBuffer(r) ? (this.append(n, r.toString("base64")), !1) : a.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function kl(e) {
  return y.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function Ul(e) {
  const t = {}, r = Object.keys(e);
  let n;
  const o = r.length;
  let a;
  for (n = 0; n < o; n++)
    a = r[n], t[a] = e[a];
  return t;
}
function Ho(e) {
  function t(r, n, o, a) {
    let i = r[a++];
    if (i === "__proto__") return !0;
    const l = Number.isFinite(+i), s = a >= r.length;
    return i = !i && y.isArray(o) ? o.length : i, s ? (y.hasOwnProp(o, i) ? o[i] = [o[i], n] : o[i] = n, !l) : ((!o[i] || !y.isObject(o[i])) && (o[i] = []), t(r, n, o[i], a) && y.isArray(o[i]) && (o[i] = Ul(o[i])), !l);
  }
  if (y.isFormData(e) && y.isFunction(e.entries)) {
    const r = {};
    return y.forEachEntry(e, (n, o) => {
      t(kl(n), o, r, 0);
    }), r;
  }
  return null;
}
function jl(e, t, r) {
  if (y.isString(e))
    try {
      return (t || JSON.parse)(e), y.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (0, JSON.stringify)(e);
}
const gt = {
  transitional: Wo,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, r) {
    const n = r.getContentType() || "", o = n.indexOf("application/json") > -1, a = y.isObject(t);
    if (a && y.isHTMLForm(t) && (t = new FormData(t)), y.isFormData(t))
      return o ? JSON.stringify(Ho(t)) : t;
    if (y.isArrayBuffer(t) || y.isBuffer(t) || y.isStream(t) || y.isFile(t) || y.isBlob(t) || y.isReadableStream(t))
      return t;
    if (y.isArrayBufferView(t))
      return t.buffer;
    if (y.isURLSearchParams(t))
      return r.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let l;
    if (a) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return Il(t, this.formSerializer).toString();
      if ((l = y.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
        const s = this.env && this.env.FormData;
        return Qt(
          l ? { "files[]": t } : t,
          s && new s(),
          this.formSerializer
        );
      }
    }
    return a || o ? (r.setContentType("application/json", !1), jl(t)) : t;
  }],
  transformResponse: [function(t) {
    const r = this.transitional || gt.transitional, n = r && r.forcedJSONParsing, o = this.responseType === "json";
    if (y.isResponse(t) || y.isReadableStream(t))
      return t;
    if (t && y.isString(t) && (n && !this.responseType || o)) {
      const i = !(r && r.silentJSONParsing) && o;
      try {
        return JSON.parse(t);
      } catch (l) {
        if (i)
          throw l.name === "SyntaxError" ? E.from(l, E.ERR_BAD_RESPONSE, this, null, this.response) : l;
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
    FormData: V.classes.FormData,
    Blob: V.classes.Blob
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
y.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  gt.headers[e] = {};
});
const _l = y.toObjectSet([
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
]), Wl = (e) => {
  const t = {};
  let r, n, o;
  return e && e.split(`
`).forEach(function(i) {
    o = i.indexOf(":"), r = i.substring(0, o).trim().toLowerCase(), n = i.substring(o + 1).trim(), !(!r || t[r] && _l[r]) && (r === "set-cookie" ? t[r] ? t[r].push(n) : t[r] = [n] : t[r] = t[r] ? t[r] + ", " + n : n);
  }), t;
}, wn = Symbol("internals");
function ot(e) {
  return e && String(e).trim().toLowerCase();
}
function Dt(e) {
  return e === !1 || e == null ? e : y.isArray(e) ? e.map(Dt) : String(e);
}
function Hl(e) {
  const t = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(e); )
    t[n[1]] = n[2];
  return t;
}
const ql = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function nr(e, t, r, n, o) {
  if (y.isFunction(n))
    return n.call(this, t, r);
  if (o && (t = r), !!y.isString(t)) {
    if (y.isString(n))
      return t.indexOf(n) !== -1;
    if (y.isRegExp(n))
      return n.test(t);
  }
}
function zl(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, r, n) => r.toUpperCase() + n);
}
function Vl(e, t) {
  const r = y.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(e, n + r, {
      value: function(o, a, i) {
        return this[n].call(this, t, o, a, i);
      },
      configurable: !0
    });
  });
}
class G {
  constructor(t) {
    t && this.set(t);
  }
  set(t, r, n) {
    const o = this;
    function a(l, s, u) {
      const c = ot(s);
      if (!c)
        throw new Error("header name must be a non-empty string");
      const m = y.findKey(o, c);
      (!m || o[m] === void 0 || u === !0 || u === void 0 && o[m] !== !1) && (o[m || s] = Dt(l));
    }
    const i = (l, s) => y.forEach(l, (u, c) => a(u, c, s));
    if (y.isPlainObject(t) || t instanceof this.constructor)
      i(t, r);
    else if (y.isString(t) && (t = t.trim()) && !ql(t))
      i(Wl(t), r);
    else if (y.isHeaders(t))
      for (const [l, s] of t.entries())
        a(s, l, n);
    else
      t != null && a(r, t, n);
    return this;
  }
  get(t, r) {
    if (t = ot(t), t) {
      const n = y.findKey(this, t);
      if (n) {
        const o = this[n];
        if (!r)
          return o;
        if (r === !0)
          return Hl(o);
        if (y.isFunction(r))
          return r.call(this, o, n);
        if (y.isRegExp(r))
          return r.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, r) {
    if (t = ot(t), t) {
      const n = y.findKey(this, t);
      return !!(n && this[n] !== void 0 && (!r || nr(this, this[n], n, r)));
    }
    return !1;
  }
  delete(t, r) {
    const n = this;
    let o = !1;
    function a(i) {
      if (i = ot(i), i) {
        const l = y.findKey(n, i);
        l && (!r || nr(n, n[l], l, r)) && (delete n[l], o = !0);
      }
    }
    return y.isArray(t) ? t.forEach(a) : a(t), o;
  }
  clear(t) {
    const r = Object.keys(this);
    let n = r.length, o = !1;
    for (; n--; ) {
      const a = r[n];
      (!t || nr(this, this[a], a, t, !0)) && (delete this[a], o = !0);
    }
    return o;
  }
  normalize(t) {
    const r = this, n = {};
    return y.forEach(this, (o, a) => {
      const i = y.findKey(n, a);
      if (i) {
        r[i] = Dt(o), delete r[a];
        return;
      }
      const l = t ? zl(a) : String(a).trim();
      l !== a && delete r[a], r[l] = Dt(o), n[l] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const r = /* @__PURE__ */ Object.create(null);
    return y.forEach(this, (n, o) => {
      n != null && n !== !1 && (r[o] = t && y.isArray(n) ? n.join(", ") : n);
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
    const n = (this[wn] = this[wn] = {
      accessors: {}
    }).accessors, o = this.prototype;
    function a(i) {
      const l = ot(i);
      n[l] || (Vl(o, i), n[l] = !0);
    }
    return y.isArray(t) ? t.forEach(a) : a(t), this;
  }
}
G.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
y.reduceDescriptors(G.prototype, ({ value: e }, t) => {
  let r = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(n) {
      this[r] = n;
    }
  };
});
y.freezeMethods(G);
function or(e, t) {
  const r = this || gt, n = t || r, o = G.from(n.headers);
  let a = n.data;
  return y.forEach(e, function(l) {
    a = l.call(r, a, o.normalize(), t ? t.status : void 0);
  }), o.normalize(), a;
}
function qo(e) {
  return !!(e && e.__CANCEL__);
}
function Ye(e, t, r) {
  E.call(this, e ?? "canceled", E.ERR_CANCELED, t, r), this.name = "CanceledError";
}
y.inherits(Ye, E, {
  __CANCEL__: !0
});
function zo(e, t, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? e(r) : t(new E(
    "Request failed with status code " + r.status,
    [E.ERR_BAD_REQUEST, E.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
    r.config,
    r.request,
    r
  ));
}
function Gl(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function Kl(e, t) {
  e = e || 10;
  const r = new Array(e), n = new Array(e);
  let o = 0, a = 0, i;
  return t = t !== void 0 ? t : 1e3, function(s) {
    const u = Date.now(), c = n[a];
    i || (i = u), r[o] = s, n[o] = u;
    let m = a, p = 0;
    for (; m !== o; )
      p += r[m++], m = m % e;
    if (o = (o + 1) % e, o === a && (a = (a + 1) % e), u - i < t)
      return;
    const v = c && u - c;
    return v ? Math.round(p * 1e3 / v) : void 0;
  };
}
function Jl(e, t) {
  let r = 0, n = 1e3 / t, o, a;
  const i = (u, c = Date.now()) => {
    r = c, o = null, a && (clearTimeout(a), a = null), e.apply(null, u);
  };
  return [(...u) => {
    const c = Date.now(), m = c - r;
    m >= n ? i(u, c) : (o = u, a || (a = setTimeout(() => {
      a = null, i(o);
    }, n - m)));
  }, () => o && i(o)];
}
const It = (e, t, r = 3) => {
  let n = 0;
  const o = Kl(50, 250);
  return Jl((a) => {
    const i = a.loaded, l = a.lengthComputable ? a.total : void 0, s = i - n, u = o(s), c = i <= l;
    n = i;
    const m = {
      loaded: i,
      total: l,
      progress: l ? i / l : void 0,
      bytes: s,
      rate: u || void 0,
      estimated: u && l && c ? (l - i) / u : void 0,
      event: a,
      lengthComputable: l != null,
      [t ? "download" : "upload"]: !0
    };
    e(m);
  }, r);
}, Sn = (e, t) => {
  const r = e != null;
  return [(n) => t[0]({
    lengthComputable: r,
    total: e,
    loaded: n
  }), t[1]];
}, En = (e) => (...t) => y.asap(() => e(...t)), Ql = V.hasStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const t = V.navigator && /(msie|trident)/i.test(V.navigator.userAgent), r = document.createElement("a");
    let n;
    function o(a) {
      let i = a;
      return t && (r.setAttribute("href", i), i = r.href), r.setAttribute("href", i), {
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
    return n = o(window.location.href), function(i) {
      const l = y.isString(i) ? o(i) : i;
      return l.protocol === n.protocol && l.host === n.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  /* @__PURE__ */ function() {
    return function() {
      return !0;
    };
  }()
), Xl = V.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, r, n, o, a) {
      const i = [e + "=" + encodeURIComponent(t)];
      y.isNumber(r) && i.push("expires=" + new Date(r).toGMTString()), y.isString(n) && i.push("path=" + n), y.isString(o) && i.push("domain=" + o), a === !0 && i.push("secure"), document.cookie = i.join("; ");
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
function Yl(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Zl(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Vo(e, t) {
  return e && !Yl(t) ? Zl(e, t) : t;
}
const xn = (e) => e instanceof G ? { ...e } : e;
function Be(e, t) {
  t = t || {};
  const r = {};
  function n(u, c, m) {
    return y.isPlainObject(u) && y.isPlainObject(c) ? y.merge.call({ caseless: m }, u, c) : y.isPlainObject(c) ? y.merge({}, c) : y.isArray(c) ? c.slice() : c;
  }
  function o(u, c, m) {
    if (y.isUndefined(c)) {
      if (!y.isUndefined(u))
        return n(void 0, u, m);
    } else return n(u, c, m);
  }
  function a(u, c) {
    if (!y.isUndefined(c))
      return n(void 0, c);
  }
  function i(u, c) {
    if (y.isUndefined(c)) {
      if (!y.isUndefined(u))
        return n(void 0, u);
    } else return n(void 0, c);
  }
  function l(u, c, m) {
    if (m in t)
      return n(u, c);
    if (m in e)
      return n(void 0, u);
  }
  const s = {
    url: a,
    method: a,
    data: a,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    withXSRFToken: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    responseEncoding: i,
    validateStatus: l,
    headers: (u, c) => o(xn(u), xn(c), !0)
  };
  return y.forEach(Object.keys(Object.assign({}, e, t)), function(c) {
    const m = s[c] || o, p = m(e[c], t[c], c);
    y.isUndefined(p) && m !== l || (r[c] = p);
  }), r;
}
const Go = (e) => {
  const t = Be({}, e);
  let { data: r, withXSRFToken: n, xsrfHeaderName: o, xsrfCookieName: a, headers: i, auth: l } = t;
  t.headers = i = G.from(i), t.url = _o(Vo(t.baseURL, t.url), e.params, e.paramsSerializer), l && i.set(
    "Authorization",
    "Basic " + btoa((l.username || "") + ":" + (l.password ? unescape(encodeURIComponent(l.password)) : ""))
  );
  let s;
  if (y.isFormData(r)) {
    if (V.hasStandardBrowserEnv || V.hasStandardBrowserWebWorkerEnv)
      i.setContentType(void 0);
    else if ((s = i.getContentType()) !== !1) {
      const [u, ...c] = s ? s.split(";").map((m) => m.trim()).filter(Boolean) : [];
      i.setContentType([u || "multipart/form-data", ...c].join("; "));
    }
  }
  if (V.hasStandardBrowserEnv && (n && y.isFunction(n) && (n = n(t)), n || n !== !1 && Ql(t.url))) {
    const u = o && a && Xl.read(a);
    u && i.set(o, u);
  }
  return t;
}, es = typeof XMLHttpRequest < "u", ts = es && function(e) {
  return new Promise(function(r, n) {
    const o = Go(e);
    let a = o.data;
    const i = G.from(o.headers).normalize();
    let { responseType: l, onUploadProgress: s, onDownloadProgress: u } = o, c, m, p, v, f;
    function d() {
      v && v(), f && f(), o.cancelToken && o.cancelToken.unsubscribe(c), o.signal && o.signal.removeEventListener("abort", c);
    }
    let h = new XMLHttpRequest();
    h.open(o.method.toUpperCase(), o.url, !0), h.timeout = o.timeout;
    function b() {
      if (!h)
        return;
      const g = G.from(
        "getAllResponseHeaders" in h && h.getAllResponseHeaders()
      ), x = {
        data: !l || l === "text" || l === "json" ? h.responseText : h.response,
        status: h.status,
        statusText: h.statusText,
        headers: g,
        config: e,
        request: h
      };
      zo(function(R) {
        r(R), d();
      }, function(R) {
        n(R), d();
      }, x), h = null;
    }
    "onloadend" in h ? h.onloadend = b : h.onreadystatechange = function() {
      !h || h.readyState !== 4 || h.status === 0 && !(h.responseURL && h.responseURL.indexOf("file:") === 0) || setTimeout(b);
    }, h.onabort = function() {
      h && (n(new E("Request aborted", E.ECONNABORTED, e, h)), h = null);
    }, h.onerror = function() {
      n(new E("Network Error", E.ERR_NETWORK, e, h)), h = null;
    }, h.ontimeout = function() {
      let S = o.timeout ? "timeout of " + o.timeout + "ms exceeded" : "timeout exceeded";
      const x = o.transitional || Wo;
      o.timeoutErrorMessage && (S = o.timeoutErrorMessage), n(new E(
        S,
        x.clarifyTimeoutError ? E.ETIMEDOUT : E.ECONNABORTED,
        e,
        h
      )), h = null;
    }, a === void 0 && i.setContentType(null), "setRequestHeader" in h && y.forEach(i.toJSON(), function(S, x) {
      h.setRequestHeader(x, S);
    }), y.isUndefined(o.withCredentials) || (h.withCredentials = !!o.withCredentials), l && l !== "json" && (h.responseType = o.responseType), u && ([p, f] = It(u, !0), h.addEventListener("progress", p)), s && h.upload && ([m, v] = It(s), h.upload.addEventListener("progress", m), h.upload.addEventListener("loadend", v)), (o.cancelToken || o.signal) && (c = (g) => {
      h && (n(!g || g.type ? new Ye(null, e, h) : g), h.abort(), h = null);
    }, o.cancelToken && o.cancelToken.subscribe(c), o.signal && (o.signal.aborted ? c() : o.signal.addEventListener("abort", c)));
    const w = Gl(o.url);
    if (w && V.protocols.indexOf(w) === -1) {
      n(new E("Unsupported protocol " + w + ":", E.ERR_BAD_REQUEST, e));
      return;
    }
    h.send(a || null);
  });
}, rs = (e, t) => {
  const { length: r } = e = e ? e.filter(Boolean) : [];
  if (t || r) {
    let n = new AbortController(), o;
    const a = function(u) {
      if (!o) {
        o = !0, l();
        const c = u instanceof Error ? u : this.reason;
        n.abort(c instanceof E ? c : new Ye(c instanceof Error ? c.message : c));
      }
    };
    let i = t && setTimeout(() => {
      i = null, a(new E(`timeout ${t} of ms exceeded`, E.ETIMEDOUT));
    }, t);
    const l = () => {
      e && (i && clearTimeout(i), i = null, e.forEach((u) => {
        u.unsubscribe ? u.unsubscribe(a) : u.removeEventListener("abort", a);
      }), e = null);
    };
    e.forEach((u) => u.addEventListener("abort", a));
    const { signal: s } = n;
    return s.unsubscribe = () => y.asap(l), s;
  }
}, ns = function* (e, t) {
  let r = e.byteLength;
  if (r < t) {
    yield e;
    return;
  }
  let n = 0, o;
  for (; n < r; )
    o = n + t, yield e.slice(n, o), n = o;
}, os = async function* (e, t) {
  for await (const r of as(e))
    yield* ns(r, t);
}, as = async function* (e) {
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
}, On = (e, t, r, n) => {
  const o = os(e, t);
  let a = 0, i, l = (s) => {
    i || (i = !0, n && n(s));
  };
  return new ReadableStream({
    async pull(s) {
      try {
        const { done: u, value: c } = await o.next();
        if (u) {
          l(), s.close();
          return;
        }
        let m = c.byteLength;
        if (r) {
          let p = a += m;
          r(p);
        }
        s.enqueue(new Uint8Array(c));
      } catch (u) {
        throw l(u), u;
      }
    },
    cancel(s) {
      return l(s), o.return();
    }
  }, {
    highWaterMark: 2
  });
}, Xt = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", Ko = Xt && typeof ReadableStream == "function", is = Xt && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((e) => (t) => e.encode(t))(new TextEncoder()) : async (e) => new Uint8Array(await new Response(e).arrayBuffer())), Jo = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, ls = Ko && Jo(() => {
  let e = !1;
  const t = new Request(V.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return e = !0, "half";
    }
  }).headers.has("Content-Type");
  return e && !t;
}), An = 64 * 1024, Cr = Ko && Jo(() => y.isReadableStream(new Response("").body)), kt = {
  stream: Cr && ((e) => e.body)
};
Xt && ((e) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
    !kt[t] && (kt[t] = y.isFunction(e[t]) ? (r) => r[t]() : (r, n) => {
      throw new E(`Response type '${t}' is not supported`, E.ERR_NOT_SUPPORT, n);
    });
  });
})(new Response());
const ss = async (e) => {
  if (e == null)
    return 0;
  if (y.isBlob(e))
    return e.size;
  if (y.isSpecCompliantForm(e))
    return (await new Request(V.origin, {
      method: "POST",
      body: e
    }).arrayBuffer()).byteLength;
  if (y.isArrayBufferView(e) || y.isArrayBuffer(e))
    return e.byteLength;
  if (y.isURLSearchParams(e) && (e = e + ""), y.isString(e))
    return (await is(e)).byteLength;
}, us = async (e, t) => {
  const r = y.toFiniteNumber(e.getContentLength());
  return r ?? ss(t);
}, cs = Xt && (async (e) => {
  let {
    url: t,
    method: r,
    data: n,
    signal: o,
    cancelToken: a,
    timeout: i,
    onDownloadProgress: l,
    onUploadProgress: s,
    responseType: u,
    headers: c,
    withCredentials: m = "same-origin",
    fetchOptions: p
  } = Go(e);
  u = u ? (u + "").toLowerCase() : "text";
  let v = rs([o, a && a.toAbortSignal()], i), f;
  const d = v && v.unsubscribe && (() => {
    v.unsubscribe();
  });
  let h;
  try {
    if (s && ls && r !== "get" && r !== "head" && (h = await us(c, n)) !== 0) {
      let x = new Request(t, {
        method: "POST",
        body: n,
        duplex: "half"
      }), T;
      if (y.isFormData(n) && (T = x.headers.get("content-type")) && c.setContentType(T), x.body) {
        const [R, F] = Sn(
          h,
          It(En(s))
        );
        n = On(x.body, An, R, F);
      }
    }
    y.isString(m) || (m = m ? "include" : "omit");
    const b = "credentials" in Request.prototype;
    f = new Request(t, {
      ...p,
      signal: v,
      method: r.toUpperCase(),
      headers: c.normalize().toJSON(),
      body: n,
      duplex: "half",
      credentials: b ? m : void 0
    });
    let w = await fetch(f);
    const g = Cr && (u === "stream" || u === "response");
    if (Cr && (l || g && d)) {
      const x = {};
      ["status", "statusText", "headers"].forEach((q) => {
        x[q] = w[q];
      });
      const T = y.toFiniteNumber(w.headers.get("content-length")), [R, F] = l && Sn(
        T,
        It(En(l), !0)
      ) || [];
      w = new Response(
        On(w.body, An, R, () => {
          F && F(), d && d();
        }),
        x
      );
    }
    u = u || "text";
    let S = await kt[y.findKey(kt, u) || "text"](w, e);
    return !g && d && d(), await new Promise((x, T) => {
      zo(x, T, {
        data: S,
        headers: G.from(w.headers),
        status: w.status,
        statusText: w.statusText,
        config: e,
        request: f
      });
    });
  } catch (b) {
    throw d && d(), b && b.name === "TypeError" && /fetch/i.test(b.message) ? Object.assign(
      new E("Network Error", E.ERR_NETWORK, e, f),
      {
        cause: b.cause || b
      }
    ) : E.from(b, b && b.code, e, f);
  }
}), Fr = {
  http: Al,
  xhr: ts,
  fetch: cs
};
y.forEach(Fr, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Pn = (e) => `- ${e}`, fs = (e) => y.isFunction(e) || e === null || e === !1, Qo = {
  getAdapter: (e) => {
    e = y.isArray(e) ? e : [e];
    const { length: t } = e;
    let r, n;
    const o = {};
    for (let a = 0; a < t; a++) {
      r = e[a];
      let i;
      if (n = r, !fs(r) && (n = Fr[(i = String(r)).toLowerCase()], n === void 0))
        throw new E(`Unknown adapter '${i}'`);
      if (n)
        break;
      o[i || "#" + a] = n;
    }
    if (!n) {
      const a = Object.entries(o).map(
        ([l, s]) => `adapter ${l} ` + (s === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let i = t ? a.length > 1 ? `since :
` + a.map(Pn).join(`
`) : " " + Pn(a[0]) : "as no adapter specified";
      throw new E(
        "There is no suitable adapter to dispatch the request " + i,
        "ERR_NOT_SUPPORT"
      );
    }
    return n;
  },
  adapters: Fr
};
function ar(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Ye(null, e);
}
function Tn(e) {
  return ar(e), e.headers = G.from(e.headers), e.data = or.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), Qo.getAdapter(e.adapter || gt.adapter)(e).then(function(n) {
    return ar(e), n.data = or.call(
      e,
      e.transformResponse,
      n
    ), n.headers = G.from(n.headers), n;
  }, function(n) {
    return qo(n) || (ar(e), n && n.response && (n.response.data = or.call(
      e,
      e.transformResponse,
      n.response
    ), n.response.headers = G.from(n.response.headers))), Promise.reject(n);
  });
}
const Xo = "1.7.7", Jr = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  Jr[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Rn = {};
Jr.transitional = function(t, r, n) {
  function o(a, i) {
    return "[Axios v" + Xo + "] Transitional option '" + a + "'" + i + (n ? ". " + n : "");
  }
  return (a, i, l) => {
    if (t === !1)
      throw new E(
        o(i, " has been removed" + (r ? " in " + r : "")),
        E.ERR_DEPRECATED
      );
    return r && !Rn[i] && (Rn[i] = !0, console.warn(
      o(
        i,
        " has been deprecated since v" + r + " and will be removed in the near future"
      )
    )), t ? t(a, i, l) : !0;
  };
};
function ds(e, t, r) {
  if (typeof e != "object")
    throw new E("options must be an object", E.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(e);
  let o = n.length;
  for (; o-- > 0; ) {
    const a = n[o], i = t[a];
    if (i) {
      const l = e[a], s = l === void 0 || i(l, a, e);
      if (s !== !0)
        throw new E("option " + a + " must be " + s, E.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0)
      throw new E("Unknown option " + a, E.ERR_BAD_OPTION);
  }
}
const $r = {
  assertOptions: ds,
  validators: Jr
}, ve = $r.validators;
class De {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new bn(),
      response: new bn()
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
        const a = o.stack ? o.stack.replace(/^.+\n/, "") : "";
        try {
          n.stack ? a && !String(n.stack).endsWith(a.replace(/^.+\n.+\n/, "")) && (n.stack += `
` + a) : n.stack = a;
        } catch {
        }
      }
      throw n;
    }
  }
  _request(t, r) {
    typeof t == "string" ? (r = r || {}, r.url = t) : r = t || {}, r = Be(this.defaults, r);
    const { transitional: n, paramsSerializer: o, headers: a } = r;
    n !== void 0 && $r.assertOptions(n, {
      silentJSONParsing: ve.transitional(ve.boolean),
      forcedJSONParsing: ve.transitional(ve.boolean),
      clarifyTimeoutError: ve.transitional(ve.boolean)
    }, !1), o != null && (y.isFunction(o) ? r.paramsSerializer = {
      serialize: o
    } : $r.assertOptions(o, {
      encode: ve.function,
      serialize: ve.function
    }, !0)), r.method = (r.method || this.defaults.method || "get").toLowerCase();
    let i = a && y.merge(
      a.common,
      a[r.method]
    );
    a && y.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (f) => {
        delete a[f];
      }
    ), r.headers = G.concat(i, a);
    const l = [];
    let s = !0;
    this.interceptors.request.forEach(function(d) {
      typeof d.runWhen == "function" && d.runWhen(r) === !1 || (s = s && d.synchronous, l.unshift(d.fulfilled, d.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function(d) {
      u.push(d.fulfilled, d.rejected);
    });
    let c, m = 0, p;
    if (!s) {
      const f = [Tn.bind(this), void 0];
      for (f.unshift.apply(f, l), f.push.apply(f, u), p = f.length, c = Promise.resolve(r); m < p; )
        c = c.then(f[m++], f[m++]);
      return c;
    }
    p = l.length;
    let v = r;
    for (m = 0; m < p; ) {
      const f = l[m++], d = l[m++];
      try {
        v = f(v);
      } catch (h) {
        d.call(this, h);
        break;
      }
    }
    try {
      c = Tn.call(this, v);
    } catch (f) {
      return Promise.reject(f);
    }
    for (m = 0, p = u.length; m < p; )
      c = c.then(u[m++], u[m++]);
    return c;
  }
  getUri(t) {
    t = Be(this.defaults, t);
    const r = Vo(t.baseURL, t.url);
    return _o(r, t.params, t.paramsSerializer);
  }
}
y.forEach(["delete", "get", "head", "options"], function(t) {
  De.prototype[t] = function(r, n) {
    return this.request(Be(n || {}, {
      method: t,
      url: r,
      data: (n || {}).data
    }));
  };
});
y.forEach(["post", "put", "patch"], function(t) {
  function r(n) {
    return function(a, i, l) {
      return this.request(Be(l || {}, {
        method: t,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: a,
        data: i
      }));
    };
  }
  De.prototype[t] = r(), De.prototype[t + "Form"] = r(!0);
});
class Qr {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let r;
    this.promise = new Promise(function(a) {
      r = a;
    });
    const n = this;
    this.promise.then((o) => {
      if (!n._listeners) return;
      let a = n._listeners.length;
      for (; a-- > 0; )
        n._listeners[a](o);
      n._listeners = null;
    }), this.promise.then = (o) => {
      let a;
      const i = new Promise((l) => {
        n.subscribe(l), a = l;
      }).then(o);
      return i.cancel = function() {
        n.unsubscribe(a);
      }, i;
    }, t(function(a, i, l) {
      n.reason || (n.reason = new Ye(a, i, l), r(n.reason));
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
      token: new Qr(function(o) {
        t = o;
      }),
      cancel: t
    };
  }
}
function ps(e) {
  return function(r) {
    return e.apply(null, r);
  };
}
function ms(e) {
  return y.isObject(e) && e.isAxiosError === !0;
}
const Dr = {
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
Object.entries(Dr).forEach(([e, t]) => {
  Dr[t] = e;
});
function Yo(e) {
  const t = new De(e), r = Co(De.prototype.request, t);
  return y.extend(r, De.prototype, t, { allOwnKeys: !0 }), y.extend(r, t, null, { allOwnKeys: !0 }), r.create = function(o) {
    return Yo(Be(e, o));
  }, r;
}
const N = Yo(gt);
N.Axios = De;
N.CanceledError = Ye;
N.CancelToken = Qr;
N.isCancel = qo;
N.VERSION = Xo;
N.toFormData = Qt;
N.AxiosError = E;
N.Cancel = N.CanceledError;
N.all = function(t) {
  return Promise.all(t);
};
N.spread = ps;
N.isAxiosError = ms;
N.mergeConfig = Be;
N.AxiosHeaders = G;
N.formToJSON = (e) => Ho(y.isHTMLForm(e) ? new FormData(e) : e);
N.getAdapter = Qo.getAdapter;
N.HttpStatusCode = Dr;
N.default = N;
function ys(e, t) {
  return Array.isArray(e) ? e.filter((r) => !t.includes(r)) : Object.keys(e).reduce((r, n) => (t.includes(n) || (r[n] = e[n]), r), {});
}
function Xr(e, t) {
  return Array.isArray(e) ? e.filter((r) => t.includes(r)) : t.reduce((r, n) => (n in e && (r[n] = e[n]), r), {});
}
function hs(e) {
  return Array.isArray(e) ? e.filter((t) => t !== null) : Object.keys(e).reduce((t, r) => (r in e && e[r] !== null && (t[r] = e[r]), t), {});
}
var Lr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function vs(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function gs(e) {
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
var bs = function(t) {
  return ws(t) && !Ss(t);
};
function ws(e) {
  return !!e && typeof e == "object";
}
function Ss(e) {
  var t = Object.prototype.toString.call(e);
  return t === "[object RegExp]" || t === "[object Date]" || Os(e);
}
var Es = typeof Symbol == "function" && Symbol.for, xs = Es ? Symbol.for("react.element") : 60103;
function Os(e) {
  return e.$$typeof === xs;
}
function As(e) {
  return Array.isArray(e) ? [] : {};
}
function dt(e, t) {
  return t.clone !== !1 && t.isMergeableObject(e) ? Ve(As(e), e, t) : e;
}
function Ps(e, t, r) {
  return e.concat(t).map(function(n) {
    return dt(n, r);
  });
}
function Ts(e, t) {
  if (!t.customMerge)
    return Ve;
  var r = t.customMerge(e);
  return typeof r == "function" ? r : Ve;
}
function Rs(e) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter(function(t) {
    return Object.propertyIsEnumerable.call(e, t);
  }) : [];
}
function Cn(e) {
  return Object.keys(e).concat(Rs(e));
}
function Zo(e, t) {
  try {
    return t in e;
  } catch {
    return !1;
  }
}
function Cs(e, t) {
  return Zo(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t));
}
function Fs(e, t, r) {
  var n = {};
  return r.isMergeableObject(e) && Cn(e).forEach(function(o) {
    n[o] = dt(e[o], r);
  }), Cn(t).forEach(function(o) {
    Cs(e, o) || (Zo(e, o) && r.isMergeableObject(t[o]) ? n[o] = Ts(o, r)(e[o], t[o], r) : n[o] = dt(t[o], r));
  }), n;
}
function Ve(e, t, r) {
  r = r || {}, r.arrayMerge = r.arrayMerge || Ps, r.isMergeableObject = r.isMergeableObject || bs, r.cloneUnlessOtherwiseSpecified = dt;
  var n = Array.isArray(t), o = Array.isArray(e), a = n === o;
  return a ? n ? r.arrayMerge(e, t, r) : Fs(e, t, r) : dt(t, r);
}
Ve.all = function(t, r) {
  if (!Array.isArray(t))
    throw new Error("first argument should be an array");
  return t.reduce(function(n, o) {
    return Ve(n, o, r);
  }, {});
};
var $s = Ve, Ds = $s;
const Ls = /* @__PURE__ */ vs(Ds);
var Ns = Error, Ms = EvalError, Bs = RangeError, Is = ReferenceError, ea = SyntaxError, bt = TypeError, ks = URIError, Us = function() {
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
    var i = Object.getOwnPropertyDescriptor(t, r);
    if (i.value !== o || i.enumerable !== !0)
      return !1;
  }
  return !0;
}, Fn = typeof Symbol < "u" && Symbol, js = Us, _s = function() {
  return typeof Fn != "function" || typeof Symbol != "function" || typeof Fn("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : js();
}, ir = {
  __proto__: null,
  foo: {}
}, Ws = Object, Hs = function() {
  return { __proto__: ir }.foo === ir.foo && !(ir instanceof Ws);
}, qs = "Function.prototype.bind called on incompatible ", zs = Object.prototype.toString, Vs = Math.max, Gs = "[object Function]", $n = function(t, r) {
  for (var n = [], o = 0; o < t.length; o += 1)
    n[o] = t[o];
  for (var a = 0; a < r.length; a += 1)
    n[a + t.length] = r[a];
  return n;
}, Ks = function(t, r) {
  for (var n = [], o = r, a = 0; o < t.length; o += 1, a += 1)
    n[a] = t[o];
  return n;
}, Js = function(e, t) {
  for (var r = "", n = 0; n < e.length; n += 1)
    r += e[n], n + 1 < e.length && (r += t);
  return r;
}, Qs = function(t) {
  var r = this;
  if (typeof r != "function" || zs.apply(r) !== Gs)
    throw new TypeError(qs + r);
  for (var n = Ks(arguments, 1), o, a = function() {
    if (this instanceof o) {
      var c = r.apply(
        this,
        $n(n, arguments)
      );
      return Object(c) === c ? c : this;
    }
    return r.apply(
      t,
      $n(n, arguments)
    );
  }, i = Vs(0, r.length - n.length), l = [], s = 0; s < i; s++)
    l[s] = "$" + s;
  if (o = Function("binder", "return function (" + Js(l, ",") + "){ return binder.apply(this,arguments); }")(a), r.prototype) {
    var u = function() {
    };
    u.prototype = r.prototype, o.prototype = new u(), u.prototype = null;
  }
  return o;
}, Xs = Qs, Yr = Function.prototype.bind || Xs, Ys = Function.prototype.call, Zs = Object.prototype.hasOwnProperty, eu = Yr, tu = eu.call(Ys, Zs), A, ru = Ns, nu = Ms, ou = Bs, au = Is, Ge = ea, qe = bt, iu = ks, ta = Function, lr = function(e) {
  try {
    return ta('"use strict"; return (' + e + ").constructor;")();
  } catch {
  }
}, Le = Object.getOwnPropertyDescriptor;
if (Le)
  try {
    Le({}, "");
  } catch {
    Le = null;
  }
var sr = function() {
  throw new qe();
}, lu = Le ? function() {
  try {
    return arguments.callee, sr;
  } catch {
    try {
      return Le(arguments, "callee").get;
    } catch {
      return sr;
    }
  }
}() : sr, je = _s(), su = Hs(), U = Object.getPrototypeOf || (su ? function(e) {
  return e.__proto__;
} : null), We = {}, uu = typeof Uint8Array > "u" || !U ? A : U(Uint8Array), Ne = {
  __proto__: null,
  "%AggregateError%": typeof AggregateError > "u" ? A : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? A : ArrayBuffer,
  "%ArrayIteratorPrototype%": je && U ? U([][Symbol.iterator]()) : A,
  "%AsyncFromSyncIteratorPrototype%": A,
  "%AsyncFunction%": We,
  "%AsyncGenerator%": We,
  "%AsyncGeneratorFunction%": We,
  "%AsyncIteratorPrototype%": We,
  "%Atomics%": typeof Atomics > "u" ? A : Atomics,
  "%BigInt%": typeof BigInt > "u" ? A : BigInt,
  "%BigInt64Array%": typeof BigInt64Array > "u" ? A : BigInt64Array,
  "%BigUint64Array%": typeof BigUint64Array > "u" ? A : BigUint64Array,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView > "u" ? A : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": ru,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": nu,
  "%Float32Array%": typeof Float32Array > "u" ? A : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? A : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? A : FinalizationRegistry,
  "%Function%": ta,
  "%GeneratorFunction%": We,
  "%Int8Array%": typeof Int8Array > "u" ? A : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? A : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? A : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": je && U ? U(U([][Symbol.iterator]())) : A,
  "%JSON%": typeof JSON == "object" ? JSON : A,
  "%Map%": typeof Map > "u" ? A : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !je || !U ? A : U((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": Object,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise > "u" ? A : Promise,
  "%Proxy%": typeof Proxy > "u" ? A : Proxy,
  "%RangeError%": ou,
  "%ReferenceError%": au,
  "%Reflect%": typeof Reflect > "u" ? A : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? A : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !je || !U ? A : U((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? A : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": je && U ? U(""[Symbol.iterator]()) : A,
  "%Symbol%": je ? Symbol : A,
  "%SyntaxError%": Ge,
  "%ThrowTypeError%": lu,
  "%TypedArray%": uu,
  "%TypeError%": qe,
  "%Uint8Array%": typeof Uint8Array > "u" ? A : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? A : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? A : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? A : Uint32Array,
  "%URIError%": iu,
  "%WeakMap%": typeof WeakMap > "u" ? A : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? A : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? A : WeakSet
};
if (U)
  try {
    null.error;
  } catch (e) {
    var cu = U(U(e));
    Ne["%Error.prototype%"] = cu;
  }
var fu = function e(t) {
  var r;
  if (t === "%AsyncFunction%")
    r = lr("async function () {}");
  else if (t === "%GeneratorFunction%")
    r = lr("function* () {}");
  else if (t === "%AsyncGeneratorFunction%")
    r = lr("async function* () {}");
  else if (t === "%AsyncGenerator%") {
    var n = e("%AsyncGeneratorFunction%");
    n && (r = n.prototype);
  } else if (t === "%AsyncIteratorPrototype%") {
    var o = e("%AsyncGenerator%");
    o && U && (r = U(o.prototype));
  }
  return Ne[t] = r, r;
}, Dn = {
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
}, wt = Yr, Ut = tu, du = wt.call(Function.call, Array.prototype.concat), pu = wt.call(Function.apply, Array.prototype.splice), Ln = wt.call(Function.call, String.prototype.replace), jt = wt.call(Function.call, String.prototype.slice), mu = wt.call(Function.call, RegExp.prototype.exec), yu = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, hu = /\\(\\)?/g, vu = function(t) {
  var r = jt(t, 0, 1), n = jt(t, -1);
  if (r === "%" && n !== "%")
    throw new Ge("invalid intrinsic syntax, expected closing `%`");
  if (n === "%" && r !== "%")
    throw new Ge("invalid intrinsic syntax, expected opening `%`");
  var o = [];
  return Ln(t, yu, function(a, i, l, s) {
    o[o.length] = l ? Ln(s, hu, "$1") : i || a;
  }), o;
}, gu = function(t, r) {
  var n = t, o;
  if (Ut(Dn, n) && (o = Dn[n], n = "%" + o[0] + "%"), Ut(Ne, n)) {
    var a = Ne[n];
    if (a === We && (a = fu(n)), typeof a > "u" && !r)
      throw new qe("intrinsic " + t + " exists, but is not available. Please file an issue!");
    return {
      alias: o,
      name: n,
      value: a
    };
  }
  throw new Ge("intrinsic " + t + " does not exist!");
}, Ze = function(t, r) {
  if (typeof t != "string" || t.length === 0)
    throw new qe("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof r != "boolean")
    throw new qe('"allowMissing" argument must be a boolean');
  if (mu(/^%?[^%]*%?$/, t) === null)
    throw new Ge("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var n = vu(t), o = n.length > 0 ? n[0] : "", a = gu("%" + o + "%", r), i = a.name, l = a.value, s = !1, u = a.alias;
  u && (o = u[0], pu(n, du([0, 1], u)));
  for (var c = 1, m = !0; c < n.length; c += 1) {
    var p = n[c], v = jt(p, 0, 1), f = jt(p, -1);
    if ((v === '"' || v === "'" || v === "`" || f === '"' || f === "'" || f === "`") && v !== f)
      throw new Ge("property names with quotes must have matching quotes");
    if ((p === "constructor" || !m) && (s = !0), o += "." + p, i = "%" + o + "%", Ut(Ne, i))
      l = Ne[i];
    else if (l != null) {
      if (!(p in l)) {
        if (!r)
          throw new qe("base intrinsic for " + t + " exists, but the property is not available.");
        return;
      }
      if (Le && c + 1 >= n.length) {
        var d = Le(l, p);
        m = !!d, m && "get" in d && !("originalValue" in d.get) ? l = d.get : l = l[p];
      } else
        m = Ut(l, p), l = l[p];
      m && !s && (Ne[i] = l);
    }
  }
  return l;
}, ra = { exports: {} }, ur, Nn;
function Zr() {
  if (Nn) return ur;
  Nn = 1;
  var e = Ze, t = e("%Object.defineProperty%", !0) || !1;
  if (t)
    try {
      t({}, "a", { value: 1 });
    } catch {
      t = !1;
    }
  return ur = t, ur;
}
var bu = Ze, Lt = bu("%Object.getOwnPropertyDescriptor%", !0);
if (Lt)
  try {
    Lt([], "length");
  } catch {
    Lt = null;
  }
var na = Lt, Mn = Zr(), wu = ea, _e = bt, Bn = na, Su = function(t, r, n) {
  if (!t || typeof t != "object" && typeof t != "function")
    throw new _e("`obj` must be an object or a function`");
  if (typeof r != "string" && typeof r != "symbol")
    throw new _e("`property` must be a string or a symbol`");
  if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
    throw new _e("`nonEnumerable`, if provided, must be a boolean or null");
  if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
    throw new _e("`nonWritable`, if provided, must be a boolean or null");
  if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
    throw new _e("`nonConfigurable`, if provided, must be a boolean or null");
  if (arguments.length > 6 && typeof arguments[6] != "boolean")
    throw new _e("`loose`, if provided, must be a boolean");
  var o = arguments.length > 3 ? arguments[3] : null, a = arguments.length > 4 ? arguments[4] : null, i = arguments.length > 5 ? arguments[5] : null, l = arguments.length > 6 ? arguments[6] : !1, s = !!Bn && Bn(t, r);
  if (Mn)
    Mn(t, r, {
      configurable: i === null && s ? s.configurable : !i,
      enumerable: o === null && s ? s.enumerable : !o,
      value: n,
      writable: a === null && s ? s.writable : !a
    });
  else if (l || !o && !a && !i)
    t[r] = n;
  else
    throw new wu("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
}, Nr = Zr(), oa = function() {
  return !!Nr;
};
oa.hasArrayLengthDefineBug = function() {
  if (!Nr)
    return null;
  try {
    return Nr([], "length", { value: 1 }).length !== 1;
  } catch {
    return !0;
  }
};
var Eu = oa, xu = Ze, In = Su, Ou = Eu(), kn = na, Un = bt, Au = xu("%Math.floor%"), Pu = function(t, r) {
  if (typeof t != "function")
    throw new Un("`fn` is not a function");
  if (typeof r != "number" || r < 0 || r > 4294967295 || Au(r) !== r)
    throw new Un("`length` must be a positive 32-bit integer");
  var n = arguments.length > 2 && !!arguments[2], o = !0, a = !0;
  if ("length" in t && kn) {
    var i = kn(t, "length");
    i && !i.configurable && (o = !1), i && !i.writable && (a = !1);
  }
  return (o || a || !n) && (Ou ? In(
    /** @type {Parameters<define>[0]} */
    t,
    "length",
    r,
    !0,
    !0
  ) : In(
    /** @type {Parameters<define>[0]} */
    t,
    "length",
    r
  )), t;
};
(function(e) {
  var t = Yr, r = Ze, n = Pu, o = bt, a = r("%Function.prototype.apply%"), i = r("%Function.prototype.call%"), l = r("%Reflect.apply%", !0) || t.call(i, a), s = Zr(), u = r("%Math.max%");
  e.exports = function(p) {
    if (typeof p != "function")
      throw new o("a function is required");
    var v = l(t, i, arguments);
    return n(
      v,
      1 + u(0, p.length - (arguments.length - 1)),
      !0
    );
  };
  var c = function() {
    return l(t, a, arguments);
  };
  s ? s(e.exports, "apply", { value: c }) : e.exports.apply = c;
})(ra);
var Tu = ra.exports, aa = Ze, ia = Tu, Ru = ia(aa("String.prototype.indexOf")), Cu = function(t, r) {
  var n = aa(t, !!r);
  return typeof n == "function" && Ru(t, ".prototype.") > -1 ? ia(n) : n;
};
const Fu = {}, $u = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fu
}, Symbol.toStringTag, { value: "Module" })), Du = /* @__PURE__ */ gs($u);
var en = typeof Map == "function" && Map.prototype, cr = Object.getOwnPropertyDescriptor && en ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, _t = en && cr && typeof cr.get == "function" ? cr.get : null, jn = en && Map.prototype.forEach, tn = typeof Set == "function" && Set.prototype, fr = Object.getOwnPropertyDescriptor && tn ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, Wt = tn && fr && typeof fr.get == "function" ? fr.get : null, _n = tn && Set.prototype.forEach, Lu = typeof WeakMap == "function" && WeakMap.prototype, lt = Lu ? WeakMap.prototype.has : null, Nu = typeof WeakSet == "function" && WeakSet.prototype, st = Nu ? WeakSet.prototype.has : null, Mu = typeof WeakRef == "function" && WeakRef.prototype, Wn = Mu ? WeakRef.prototype.deref : null, Bu = Boolean.prototype.valueOf, Iu = Object.prototype.toString, ku = Function.prototype.toString, Uu = String.prototype.match, rn = String.prototype.slice, Se = String.prototype.replace, ju = String.prototype.toUpperCase, Hn = String.prototype.toLowerCase, la = RegExp.prototype.test, qn = Array.prototype.concat, de = Array.prototype.join, _u = Array.prototype.slice, zn = Math.floor, Mr = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, dr = Object.getOwnPropertySymbols, Br = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, Ke = typeof Symbol == "function" && typeof Symbol.iterator == "object", W = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === Ke || !0) ? Symbol.toStringTag : null, sa = Object.prototype.propertyIsEnumerable, Vn = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(e) {
  return e.__proto__;
} : null);
function Gn(e, t) {
  if (e === 1 / 0 || e === -1 / 0 || e !== e || e && e > -1e3 && e < 1e3 || la.call(/e/, t))
    return t;
  var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof e == "number") {
    var n = e < 0 ? -zn(-e) : zn(e);
    if (n !== e) {
      var o = String(n), a = rn.call(t, o.length + 1);
      return Se.call(o, r, "$&_") + "." + Se.call(Se.call(a, /([0-9]{3})/g, "$&_"), /_$/, "");
    }
  }
  return Se.call(t, r, "$&_");
}
var Ir = Du, Kn = Ir.custom, Jn = ca(Kn) ? Kn : null, Wu = function e(t, r, n, o) {
  var a = r || {};
  if (ge(a, "quoteStyle") && a.quoteStyle !== "single" && a.quoteStyle !== "double")
    throw new TypeError('option "quoteStyle" must be "single" or "double"');
  if (ge(a, "maxStringLength") && (typeof a.maxStringLength == "number" ? a.maxStringLength < 0 && a.maxStringLength !== 1 / 0 : a.maxStringLength !== null))
    throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
  var i = ge(a, "customInspect") ? a.customInspect : !0;
  if (typeof i != "boolean" && i !== "symbol")
    throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
  if (ge(a, "indent") && a.indent !== null && a.indent !== "	" && !(parseInt(a.indent, 10) === a.indent && a.indent > 0))
    throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
  if (ge(a, "numericSeparator") && typeof a.numericSeparator != "boolean")
    throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
  var l = a.numericSeparator;
  if (typeof t > "u")
    return "undefined";
  if (t === null)
    return "null";
  if (typeof t == "boolean")
    return t ? "true" : "false";
  if (typeof t == "string")
    return da(t, a);
  if (typeof t == "number") {
    if (t === 0)
      return 1 / 0 / t > 0 ? "0" : "-0";
    var s = String(t);
    return l ? Gn(t, s) : s;
  }
  if (typeof t == "bigint") {
    var u = String(t) + "n";
    return l ? Gn(t, u) : u;
  }
  var c = typeof a.depth > "u" ? 5 : a.depth;
  if (typeof n > "u" && (n = 0), n >= c && c > 0 && typeof t == "object")
    return kr(t) ? "[Array]" : "[Object]";
  var m = ic(a, n);
  if (typeof o > "u")
    o = [];
  else if (fa(o, t) >= 0)
    return "[Circular]";
  function p($, z, I) {
    if (z && (o = _u.call(o), o.push(z)), I) {
      var H = {
        depth: a.depth
      };
      return ge(a, "quoteStyle") && (H.quoteStyle = a.quoteStyle), e($, H, n + 1, o);
    }
    return e($, a, n + 1, o);
  }
  if (typeof t == "function" && !Qn(t)) {
    var v = Xu(t), f = Tt(t, p);
    return "[Function" + (v ? ": " + v : " (anonymous)") + "]" + (f.length > 0 ? " { " + de.call(f, ", ") + " }" : "");
  }
  if (ca(t)) {
    var d = Ke ? Se.call(String(t), /^(Symbol\(.*\))_[^)]*$/, "$1") : Br.call(t);
    return typeof t == "object" && !Ke ? at(d) : d;
  }
  if (nc(t)) {
    for (var h = "<" + Hn.call(String(t.nodeName)), b = t.attributes || [], w = 0; w < b.length; w++)
      h += " " + b[w].name + "=" + ua(Hu(b[w].value), "double", a);
    return h += ">", t.childNodes && t.childNodes.length && (h += "..."), h += "</" + Hn.call(String(t.nodeName)) + ">", h;
  }
  if (kr(t)) {
    if (t.length === 0)
      return "[]";
    var g = Tt(t, p);
    return m && !ac(g) ? "[" + Ur(g, m) + "]" : "[ " + de.call(g, ", ") + " ]";
  }
  if (zu(t)) {
    var S = Tt(t, p);
    return !("cause" in Error.prototype) && "cause" in t && !sa.call(t, "cause") ? "{ [" + String(t) + "] " + de.call(qn.call("[cause]: " + p(t.cause), S), ", ") + " }" : S.length === 0 ? "[" + String(t) + "]" : "{ [" + String(t) + "] " + de.call(S, ", ") + " }";
  }
  if (typeof t == "object" && i) {
    if (Jn && typeof t[Jn] == "function" && Ir)
      return Ir(t, { depth: c - n });
    if (i !== "symbol" && typeof t.inspect == "function")
      return t.inspect();
  }
  if (Yu(t)) {
    var x = [];
    return jn && jn.call(t, function($, z) {
      x.push(p(z, t, !0) + " => " + p($, t));
    }), Xn("Map", _t.call(t), x, m);
  }
  if (tc(t)) {
    var T = [];
    return _n && _n.call(t, function($) {
      T.push(p($, t));
    }), Xn("Set", Wt.call(t), T, m);
  }
  if (Zu(t))
    return pr("WeakMap");
  if (rc(t))
    return pr("WeakSet");
  if (ec(t))
    return pr("WeakRef");
  if (Gu(t))
    return at(p(Number(t)));
  if (Ju(t))
    return at(p(Mr.call(t)));
  if (Ku(t))
    return at(Bu.call(t));
  if (Vu(t))
    return at(p(String(t)));
  if (typeof window < "u" && t === window)
    return "{ [object Window] }";
  if (typeof globalThis < "u" && t === globalThis || typeof Lr < "u" && t === Lr)
    return "{ [object globalThis] }";
  if (!qu(t) && !Qn(t)) {
    var R = Tt(t, p), F = Vn ? Vn(t) === Object.prototype : t instanceof Object || t.constructor === Object, q = t instanceof Object ? "" : "null prototype", Q = !F && W && Object(t) === t && W in t ? rn.call(xe(t), 8, -1) : q ? "Object" : "", he = F || typeof t.constructor != "function" ? "" : t.constructor.name ? t.constructor.name + " " : "", se = he + (Q || q ? "[" + de.call(qn.call([], Q || [], q || []), ": ") + "] " : "");
    return R.length === 0 ? se + "{}" : m ? se + "{" + Ur(R, m) + "}" : se + "{ " + de.call(R, ", ") + " }";
  }
  return String(t);
};
function ua(e, t, r) {
  var n = (r.quoteStyle || t) === "double" ? '"' : "'";
  return n + e + n;
}
function Hu(e) {
  return Se.call(String(e), /"/g, "&quot;");
}
function kr(e) {
  return xe(e) === "[object Array]" && (!W || !(typeof e == "object" && W in e));
}
function qu(e) {
  return xe(e) === "[object Date]" && (!W || !(typeof e == "object" && W in e));
}
function Qn(e) {
  return xe(e) === "[object RegExp]" && (!W || !(typeof e == "object" && W in e));
}
function zu(e) {
  return xe(e) === "[object Error]" && (!W || !(typeof e == "object" && W in e));
}
function Vu(e) {
  return xe(e) === "[object String]" && (!W || !(typeof e == "object" && W in e));
}
function Gu(e) {
  return xe(e) === "[object Number]" && (!W || !(typeof e == "object" && W in e));
}
function Ku(e) {
  return xe(e) === "[object Boolean]" && (!W || !(typeof e == "object" && W in e));
}
function ca(e) {
  if (Ke)
    return e && typeof e == "object" && e instanceof Symbol;
  if (typeof e == "symbol")
    return !0;
  if (!e || typeof e != "object" || !Br)
    return !1;
  try {
    return Br.call(e), !0;
  } catch {
  }
  return !1;
}
function Ju(e) {
  if (!e || typeof e != "object" || !Mr)
    return !1;
  try {
    return Mr.call(e), !0;
  } catch {
  }
  return !1;
}
var Qu = Object.prototype.hasOwnProperty || function(e) {
  return e in this;
};
function ge(e, t) {
  return Qu.call(e, t);
}
function xe(e) {
  return Iu.call(e);
}
function Xu(e) {
  if (e.name)
    return e.name;
  var t = Uu.call(ku.call(e), /^function\s*([\w$]+)/);
  return t ? t[1] : null;
}
function fa(e, t) {
  if (e.indexOf)
    return e.indexOf(t);
  for (var r = 0, n = e.length; r < n; r++)
    if (e[r] === t)
      return r;
  return -1;
}
function Yu(e) {
  if (!_t || !e || typeof e != "object")
    return !1;
  try {
    _t.call(e);
    try {
      Wt.call(e);
    } catch {
      return !0;
    }
    return e instanceof Map;
  } catch {
  }
  return !1;
}
function Zu(e) {
  if (!lt || !e || typeof e != "object")
    return !1;
  try {
    lt.call(e, lt);
    try {
      st.call(e, st);
    } catch {
      return !0;
    }
    return e instanceof WeakMap;
  } catch {
  }
  return !1;
}
function ec(e) {
  if (!Wn || !e || typeof e != "object")
    return !1;
  try {
    return Wn.call(e), !0;
  } catch {
  }
  return !1;
}
function tc(e) {
  if (!Wt || !e || typeof e != "object")
    return !1;
  try {
    Wt.call(e);
    try {
      _t.call(e);
    } catch {
      return !0;
    }
    return e instanceof Set;
  } catch {
  }
  return !1;
}
function rc(e) {
  if (!st || !e || typeof e != "object")
    return !1;
  try {
    st.call(e, st);
    try {
      lt.call(e, lt);
    } catch {
      return !0;
    }
    return e instanceof WeakSet;
  } catch {
  }
  return !1;
}
function nc(e) {
  return !e || typeof e != "object" ? !1 : typeof HTMLElement < "u" && e instanceof HTMLElement ? !0 : typeof e.nodeName == "string" && typeof e.getAttribute == "function";
}
function da(e, t) {
  if (e.length > t.maxStringLength) {
    var r = e.length - t.maxStringLength, n = "... " + r + " more character" + (r > 1 ? "s" : "");
    return da(rn.call(e, 0, t.maxStringLength), t) + n;
  }
  var o = Se.call(Se.call(e, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, oc);
  return ua(o, "single", t);
}
function oc(e) {
  var t = e.charCodeAt(0), r = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[t];
  return r ? "\\" + r : "\\x" + (t < 16 ? "0" : "") + ju.call(t.toString(16));
}
function at(e) {
  return "Object(" + e + ")";
}
function pr(e) {
  return e + " { ? }";
}
function Xn(e, t, r, n) {
  var o = n ? Ur(r, n) : de.call(r, ", ");
  return e + " (" + t + ") {" + o + "}";
}
function ac(e) {
  for (var t = 0; t < e.length; t++)
    if (fa(e[t], `
`) >= 0)
      return !1;
  return !0;
}
function ic(e, t) {
  var r;
  if (e.indent === "	")
    r = "	";
  else if (typeof e.indent == "number" && e.indent > 0)
    r = de.call(Array(e.indent + 1), " ");
  else
    return null;
  return {
    base: r,
    prev: de.call(Array(t + 1), r)
  };
}
function Ur(e, t) {
  if (e.length === 0)
    return "";
  var r = `
` + t.prev + t.base;
  return r + de.call(e, "," + r) + `
` + t.prev;
}
function Tt(e, t) {
  var r = kr(e), n = [];
  if (r) {
    n.length = e.length;
    for (var o = 0; o < e.length; o++)
      n[o] = ge(e, o) ? t(e[o], e) : "";
  }
  var a = typeof dr == "function" ? dr(e) : [], i;
  if (Ke) {
    i = {};
    for (var l = 0; l < a.length; l++)
      i["$" + a[l]] = a[l];
  }
  for (var s in e)
    ge(e, s) && (r && String(Number(s)) === s && s < e.length || Ke && i["$" + s] instanceof Symbol || (la.call(/[^\w$]/, s) ? n.push(t(s, e) + ": " + t(e[s], e)) : n.push(s + ": " + t(e[s], e))));
  if (typeof dr == "function")
    for (var u = 0; u < a.length; u++)
      sa.call(e, a[u]) && n.push("[" + t(a[u]) + "]: " + t(e[a[u]], e));
  return n;
}
var pa = Ze, et = Cu, lc = Wu, sc = bt, Rt = pa("%WeakMap%", !0), Ct = pa("%Map%", !0), uc = et("WeakMap.prototype.get", !0), cc = et("WeakMap.prototype.set", !0), fc = et("WeakMap.prototype.has", !0), dc = et("Map.prototype.get", !0), pc = et("Map.prototype.set", !0), mc = et("Map.prototype.has", !0), nn = function(e, t) {
  for (var r = e, n; (n = r.next) !== null; r = n)
    if (n.key === t)
      return r.next = n.next, n.next = /** @type {NonNullable<typeof list.next>} */
      e.next, e.next = n, n;
}, yc = function(e, t) {
  var r = nn(e, t);
  return r && r.value;
}, hc = function(e, t, r) {
  var n = nn(e, t);
  n ? n.value = r : e.next = /** @type {import('.').ListNode<typeof value>} */
  {
    // eslint-disable-line no-param-reassign, no-extra-parens
    key: t,
    next: e.next,
    value: r
  };
}, vc = function(e, t) {
  return !!nn(e, t);
}, gc = function() {
  var t, r, n, o = {
    assert: function(a) {
      if (!o.has(a))
        throw new sc("Side channel does not contain " + lc(a));
    },
    get: function(a) {
      if (Rt && a && (typeof a == "object" || typeof a == "function")) {
        if (t)
          return uc(t, a);
      } else if (Ct) {
        if (r)
          return dc(r, a);
      } else if (n)
        return yc(n, a);
    },
    has: function(a) {
      if (Rt && a && (typeof a == "object" || typeof a == "function")) {
        if (t)
          return fc(t, a);
      } else if (Ct) {
        if (r)
          return mc(r, a);
      } else if (n)
        return vc(n, a);
      return !1;
    },
    set: function(a, i) {
      Rt && a && (typeof a == "object" || typeof a == "function") ? (t || (t = new Rt()), cc(t, a, i)) : Ct ? (r || (r = new Ct()), pc(r, a, i)) : (n || (n = { key: {}, next: null }), hc(n, a, i));
    }
  };
  return o;
}, bc = String.prototype.replace, wc = /%20/g, mr = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
}, on = {
  default: mr.RFC3986,
  formatters: {
    RFC1738: function(e) {
      return bc.call(e, wc, "+");
    },
    RFC3986: function(e) {
      return String(e);
    }
  },
  RFC1738: mr.RFC1738,
  RFC3986: mr.RFC3986
}, Sc = on, yr = Object.prototype.hasOwnProperty, Pe = Array.isArray, ce = function() {
  for (var e = [], t = 0; t < 256; ++t)
    e.push("%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase());
  return e;
}(), Ec = function(t) {
  for (; t.length > 1; ) {
    var r = t.pop(), n = r.obj[r.prop];
    if (Pe(n)) {
      for (var o = [], a = 0; a < n.length; ++a)
        typeof n[a] < "u" && o.push(n[a]);
      r.obj[r.prop] = o;
    }
  }
}, ma = function(t, r) {
  for (var n = r && r.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, o = 0; o < t.length; ++o)
    typeof t[o] < "u" && (n[o] = t[o]);
  return n;
}, xc = function e(t, r, n) {
  if (!r)
    return t;
  if (typeof r != "object") {
    if (Pe(t))
      t.push(r);
    else if (t && typeof t == "object")
      (n && (n.plainObjects || n.allowPrototypes) || !yr.call(Object.prototype, r)) && (t[r] = !0);
    else
      return [t, r];
    return t;
  }
  if (!t || typeof t != "object")
    return [t].concat(r);
  var o = t;
  return Pe(t) && !Pe(r) && (o = ma(t, n)), Pe(t) && Pe(r) ? (r.forEach(function(a, i) {
    if (yr.call(t, i)) {
      var l = t[i];
      l && typeof l == "object" && a && typeof a == "object" ? t[i] = e(l, a, n) : t.push(a);
    } else
      t[i] = a;
  }), t) : Object.keys(r).reduce(function(a, i) {
    var l = r[i];
    return yr.call(a, i) ? a[i] = e(a[i], l, n) : a[i] = l, a;
  }, o);
}, Oc = function(t, r) {
  return Object.keys(r).reduce(function(n, o) {
    return n[o] = r[o], n;
  }, t);
}, Ac = function(e, t, r) {
  var n = e.replace(/\+/g, " ");
  if (r === "iso-8859-1")
    return n.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n);
  } catch {
    return n;
  }
}, hr = 1024, Pc = function(t, r, n, o, a) {
  if (t.length === 0)
    return t;
  var i = t;
  if (typeof t == "symbol" ? i = Symbol.prototype.toString.call(t) : typeof t != "string" && (i = String(t)), n === "iso-8859-1")
    return escape(i).replace(/%u[0-9a-f]{4}/gi, function(v) {
      return "%26%23" + parseInt(v.slice(2), 16) + "%3B";
    });
  for (var l = "", s = 0; s < i.length; s += hr) {
    for (var u = i.length >= hr ? i.slice(s, s + hr) : i, c = [], m = 0; m < u.length; ++m) {
      var p = u.charCodeAt(m);
      if (p === 45 || p === 46 || p === 95 || p === 126 || p >= 48 && p <= 57 || p >= 65 && p <= 90 || p >= 97 && p <= 122 || a === Sc.RFC1738 && (p === 40 || p === 41)) {
        c[c.length] = u.charAt(m);
        continue;
      }
      if (p < 128) {
        c[c.length] = ce[p];
        continue;
      }
      if (p < 2048) {
        c[c.length] = ce[192 | p >> 6] + ce[128 | p & 63];
        continue;
      }
      if (p < 55296 || p >= 57344) {
        c[c.length] = ce[224 | p >> 12] + ce[128 | p >> 6 & 63] + ce[128 | p & 63];
        continue;
      }
      m += 1, p = 65536 + ((p & 1023) << 10 | u.charCodeAt(m) & 1023), c[c.length] = ce[240 | p >> 18] + ce[128 | p >> 12 & 63] + ce[128 | p >> 6 & 63] + ce[128 | p & 63];
    }
    l += c.join("");
  }
  return l;
}, Tc = function(t) {
  for (var r = [{ obj: { o: t }, prop: "o" }], n = [], o = 0; o < r.length; ++o)
    for (var a = r[o], i = a.obj[a.prop], l = Object.keys(i), s = 0; s < l.length; ++s) {
      var u = l[s], c = i[u];
      typeof c == "object" && c !== null && n.indexOf(c) === -1 && (r.push({ obj: i, prop: u }), n.push(c));
    }
  return Ec(r), t;
}, Rc = function(t) {
  return Object.prototype.toString.call(t) === "[object RegExp]";
}, Cc = function(t) {
  return !t || typeof t != "object" ? !1 : !!(t.constructor && t.constructor.isBuffer && t.constructor.isBuffer(t));
}, Fc = function(t, r) {
  return [].concat(t, r);
}, $c = function(t, r) {
  if (Pe(t)) {
    for (var n = [], o = 0; o < t.length; o += 1)
      n.push(r(t[o]));
    return n;
  }
  return r(t);
}, ya = {
  arrayToObject: ma,
  assign: Oc,
  combine: Fc,
  compact: Tc,
  decode: Ac,
  encode: Pc,
  isBuffer: Cc,
  isRegExp: Rc,
  maybeMap: $c,
  merge: xc
}, ha = gc, Nt = ya, ut = on, Dc = Object.prototype.hasOwnProperty, va = {
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
}, fe = Array.isArray, Lc = Array.prototype.push, ga = function(e, t) {
  Lc.apply(e, fe(t) ? t : [t]);
}, Nc = Date.prototype.toISOString, Yn = ut.default, B = {
  addQueryPrefix: !1,
  allowDots: !1,
  allowEmptyArrays: !1,
  arrayFormat: "indices",
  charset: "utf-8",
  charsetSentinel: !1,
  delimiter: "&",
  encode: !0,
  encodeDotInKeys: !1,
  encoder: Nt.encode,
  encodeValuesOnly: !1,
  format: Yn,
  formatter: ut.formatters[Yn],
  // deprecated
  indices: !1,
  serializeDate: function(t) {
    return Nc.call(t);
  },
  skipNulls: !1,
  strictNullHandling: !1
}, Mc = function(t) {
  return typeof t == "string" || typeof t == "number" || typeof t == "boolean" || typeof t == "symbol" || typeof t == "bigint";
}, vr = {}, Bc = function e(t, r, n, o, a, i, l, s, u, c, m, p, v, f, d, h, b, w) {
  for (var g = t, S = w, x = 0, T = !1; (S = S.get(vr)) !== void 0 && !T; ) {
    var R = S.get(t);
    if (x += 1, typeof R < "u") {
      if (R === x)
        throw new RangeError("Cyclic object value");
      T = !0;
    }
    typeof S.get(vr) > "u" && (x = 0);
  }
  if (typeof c == "function" ? g = c(r, g) : g instanceof Date ? g = v(g) : n === "comma" && fe(g) && (g = Nt.maybeMap(g, function(ke) {
    return ke instanceof Date ? v(ke) : ke;
  })), g === null) {
    if (i)
      return u && !h ? u(r, B.encoder, b, "key", f) : r;
    g = "";
  }
  if (Mc(g) || Nt.isBuffer(g)) {
    if (u) {
      var F = h ? r : u(r, B.encoder, b, "key", f);
      return [d(F) + "=" + d(u(g, B.encoder, b, "value", f))];
    }
    return [d(r) + "=" + d(String(g))];
  }
  var q = [];
  if (typeof g > "u")
    return q;
  var Q;
  if (n === "comma" && fe(g))
    h && u && (g = Nt.maybeMap(g, u)), Q = [{ value: g.length > 0 ? g.join(",") || null : void 0 }];
  else if (fe(c))
    Q = c;
  else {
    var he = Object.keys(g);
    Q = m ? he.sort(m) : he;
  }
  var se = s ? r.replace(/\./g, "%2E") : r, $ = o && fe(g) && g.length === 1 ? se + "[]" : se;
  if (a && fe(g) && g.length === 0)
    return $ + "[]";
  for (var z = 0; z < Q.length; ++z) {
    var I = Q[z], H = typeof I == "object" && typeof I.value < "u" ? I.value : g[I];
    if (!(l && H === null)) {
      var ue = p && s ? I.replace(/\./g, "%2E") : I, St = fe(g) ? typeof n == "function" ? n($, ue) : $ : $ + (p ? "." + ue : "[" + ue + "]");
      w.set(t, x);
      var tt = ha();
      tt.set(vr, w), ga(q, e(
        H,
        St,
        n,
        o,
        a,
        i,
        l,
        s,
        n === "comma" && h && fe(g) ? null : u,
        c,
        m,
        p,
        v,
        f,
        d,
        h,
        b,
        tt
      ));
    }
  }
  return q;
}, Ic = function(t) {
  if (!t)
    return B;
  if (typeof t.allowEmptyArrays < "u" && typeof t.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof t.encodeDotInKeys < "u" && typeof t.encodeDotInKeys != "boolean")
    throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
  if (t.encoder !== null && typeof t.encoder < "u" && typeof t.encoder != "function")
    throw new TypeError("Encoder has to be a function.");
  var r = t.charset || B.charset;
  if (typeof t.charset < "u" && t.charset !== "utf-8" && t.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var n = ut.default;
  if (typeof t.format < "u") {
    if (!Dc.call(ut.formatters, t.format))
      throw new TypeError("Unknown format option provided.");
    n = t.format;
  }
  var o = ut.formatters[n], a = B.filter;
  (typeof t.filter == "function" || fe(t.filter)) && (a = t.filter);
  var i;
  if (t.arrayFormat in va ? i = t.arrayFormat : "indices" in t ? i = t.indices ? "indices" : "repeat" : i = B.arrayFormat, "commaRoundTrip" in t && typeof t.commaRoundTrip != "boolean")
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  var l = typeof t.allowDots > "u" ? t.encodeDotInKeys === !0 ? !0 : B.allowDots : !!t.allowDots;
  return {
    addQueryPrefix: typeof t.addQueryPrefix == "boolean" ? t.addQueryPrefix : B.addQueryPrefix,
    allowDots: l,
    allowEmptyArrays: typeof t.allowEmptyArrays == "boolean" ? !!t.allowEmptyArrays : B.allowEmptyArrays,
    arrayFormat: i,
    charset: r,
    charsetSentinel: typeof t.charsetSentinel == "boolean" ? t.charsetSentinel : B.charsetSentinel,
    commaRoundTrip: t.commaRoundTrip,
    delimiter: typeof t.delimiter > "u" ? B.delimiter : t.delimiter,
    encode: typeof t.encode == "boolean" ? t.encode : B.encode,
    encodeDotInKeys: typeof t.encodeDotInKeys == "boolean" ? t.encodeDotInKeys : B.encodeDotInKeys,
    encoder: typeof t.encoder == "function" ? t.encoder : B.encoder,
    encodeValuesOnly: typeof t.encodeValuesOnly == "boolean" ? t.encodeValuesOnly : B.encodeValuesOnly,
    filter: a,
    format: n,
    formatter: o,
    serializeDate: typeof t.serializeDate == "function" ? t.serializeDate : B.serializeDate,
    skipNulls: typeof t.skipNulls == "boolean" ? t.skipNulls : B.skipNulls,
    sort: typeof t.sort == "function" ? t.sort : null,
    strictNullHandling: typeof t.strictNullHandling == "boolean" ? t.strictNullHandling : B.strictNullHandling
  };
}, kc = function(e, t) {
  var r = e, n = Ic(t), o, a;
  typeof n.filter == "function" ? (a = n.filter, r = a("", r)) : fe(n.filter) && (a = n.filter, o = a);
  var i = [];
  if (typeof r != "object" || r === null)
    return "";
  var l = va[n.arrayFormat], s = l === "comma" && n.commaRoundTrip;
  o || (o = Object.keys(r)), n.sort && o.sort(n.sort);
  for (var u = ha(), c = 0; c < o.length; ++c) {
    var m = o[c];
    n.skipNulls && r[m] === null || ga(i, Bc(
      r[m],
      m,
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
      u
    ));
  }
  var p = i.join(n.delimiter), v = n.addQueryPrefix === !0 ? "?" : "";
  return n.charsetSentinel && (n.charset === "iso-8859-1" ? v += "utf8=%26%2310003%3B&" : v += "utf8=%E2%9C%93&"), p.length > 0 ? v + p : "";
}, Je = ya, jr = Object.prototype.hasOwnProperty, Uc = Array.isArray, D = {
  allowDots: !1,
  allowEmptyArrays: !1,
  allowPrototypes: !1,
  allowSparse: !1,
  arrayLimit: 20,
  charset: "utf-8",
  charsetSentinel: !1,
  comma: !1,
  decodeDotInKeys: !1,
  decoder: Je.decode,
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
}, jc = function(e) {
  return e.replace(/&#(\d+);/g, function(t, r) {
    return String.fromCharCode(parseInt(r, 10));
  });
}, ba = function(e, t) {
  return e && typeof e == "string" && t.comma && e.indexOf(",") > -1 ? e.split(",") : e;
}, _c = "utf8=%26%2310003%3B", Wc = "utf8=%E2%9C%93", Hc = function(t, r) {
  var n = { __proto__: null }, o = r.ignoreQueryPrefix ? t.replace(/^\?/, "") : t;
  o = o.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  var a = r.parameterLimit === 1 / 0 ? void 0 : r.parameterLimit, i = o.split(r.delimiter, a), l = -1, s, u = r.charset;
  if (r.charsetSentinel)
    for (s = 0; s < i.length; ++s)
      i[s].indexOf("utf8=") === 0 && (i[s] === Wc ? u = "utf-8" : i[s] === _c && (u = "iso-8859-1"), l = s, s = i.length);
  for (s = 0; s < i.length; ++s)
    if (s !== l) {
      var c = i[s], m = c.indexOf("]="), p = m === -1 ? c.indexOf("=") : m + 1, v, f;
      p === -1 ? (v = r.decoder(c, D.decoder, u, "key"), f = r.strictNullHandling ? null : "") : (v = r.decoder(c.slice(0, p), D.decoder, u, "key"), f = Je.maybeMap(
        ba(c.slice(p + 1), r),
        function(h) {
          return r.decoder(h, D.decoder, u, "value");
        }
      )), f && r.interpretNumericEntities && u === "iso-8859-1" && (f = jc(f)), c.indexOf("[]=") > -1 && (f = Uc(f) ? [f] : f);
      var d = jr.call(n, v);
      d && r.duplicates === "combine" ? n[v] = Je.combine(n[v], f) : (!d || r.duplicates === "last") && (n[v] = f);
    }
  return n;
}, qc = function(e, t, r, n) {
  for (var o = n ? t : ba(t, r), a = e.length - 1; a >= 0; --a) {
    var i, l = e[a];
    if (l === "[]" && r.parseArrays)
      i = r.allowEmptyArrays && (o === "" || r.strictNullHandling && o === null) ? [] : [].concat(o);
    else {
      i = r.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var s = l.charAt(0) === "[" && l.charAt(l.length - 1) === "]" ? l.slice(1, -1) : l, u = r.decodeDotInKeys ? s.replace(/%2E/g, ".") : s, c = parseInt(u, 10);
      !r.parseArrays && u === "" ? i = { 0: o } : !isNaN(c) && l !== u && String(c) === u && c >= 0 && r.parseArrays && c <= r.arrayLimit ? (i = [], i[c] = o) : u !== "__proto__" && (i[u] = o);
    }
    o = i;
  }
  return o;
}, zc = function(t, r, n, o) {
  if (t) {
    var a = n.allowDots ? t.replace(/\.([^.[]+)/g, "[$1]") : t, i = /(\[[^[\]]*])/, l = /(\[[^[\]]*])/g, s = n.depth > 0 && i.exec(a), u = s ? a.slice(0, s.index) : a, c = [];
    if (u) {
      if (!n.plainObjects && jr.call(Object.prototype, u) && !n.allowPrototypes)
        return;
      c.push(u);
    }
    for (var m = 0; n.depth > 0 && (s = l.exec(a)) !== null && m < n.depth; ) {
      if (m += 1, !n.plainObjects && jr.call(Object.prototype, s[1].slice(1, -1)) && !n.allowPrototypes)
        return;
      c.push(s[1]);
    }
    if (s) {
      if (n.strictDepth === !0)
        throw new RangeError("Input depth exceeded depth option of " + n.depth + " and strictDepth is true");
      c.push("[" + a.slice(s.index) + "]");
    }
    return qc(c, r, n, o);
  }
}, Vc = function(t) {
  if (!t)
    return D;
  if (typeof t.allowEmptyArrays < "u" && typeof t.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof t.decodeDotInKeys < "u" && typeof t.decodeDotInKeys != "boolean")
    throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
  if (t.decoder !== null && typeof t.decoder < "u" && typeof t.decoder != "function")
    throw new TypeError("Decoder has to be a function.");
  if (typeof t.charset < "u" && t.charset !== "utf-8" && t.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var r = typeof t.charset > "u" ? D.charset : t.charset, n = typeof t.duplicates > "u" ? D.duplicates : t.duplicates;
  if (n !== "combine" && n !== "first" && n !== "last")
    throw new TypeError("The duplicates option must be either combine, first, or last");
  var o = typeof t.allowDots > "u" ? t.decodeDotInKeys === !0 ? !0 : D.allowDots : !!t.allowDots;
  return {
    allowDots: o,
    allowEmptyArrays: typeof t.allowEmptyArrays == "boolean" ? !!t.allowEmptyArrays : D.allowEmptyArrays,
    allowPrototypes: typeof t.allowPrototypes == "boolean" ? t.allowPrototypes : D.allowPrototypes,
    allowSparse: typeof t.allowSparse == "boolean" ? t.allowSparse : D.allowSparse,
    arrayLimit: typeof t.arrayLimit == "number" ? t.arrayLimit : D.arrayLimit,
    charset: r,
    charsetSentinel: typeof t.charsetSentinel == "boolean" ? t.charsetSentinel : D.charsetSentinel,
    comma: typeof t.comma == "boolean" ? t.comma : D.comma,
    decodeDotInKeys: typeof t.decodeDotInKeys == "boolean" ? t.decodeDotInKeys : D.decodeDotInKeys,
    decoder: typeof t.decoder == "function" ? t.decoder : D.decoder,
    delimiter: typeof t.delimiter == "string" || Je.isRegExp(t.delimiter) ? t.delimiter : D.delimiter,
    // eslint-disable-next-line no-implicit-coercion, no-extra-parens
    depth: typeof t.depth == "number" || t.depth === !1 ? +t.depth : D.depth,
    duplicates: n,
    ignoreQueryPrefix: t.ignoreQueryPrefix === !0,
    interpretNumericEntities: typeof t.interpretNumericEntities == "boolean" ? t.interpretNumericEntities : D.interpretNumericEntities,
    parameterLimit: typeof t.parameterLimit == "number" ? t.parameterLimit : D.parameterLimit,
    parseArrays: t.parseArrays !== !1,
    plainObjects: typeof t.plainObjects == "boolean" ? t.plainObjects : D.plainObjects,
    strictDepth: typeof t.strictDepth == "boolean" ? !!t.strictDepth : D.strictDepth,
    strictNullHandling: typeof t.strictNullHandling == "boolean" ? t.strictNullHandling : D.strictNullHandling
  };
}, Gc = function(e, t) {
  var r = Vc(t);
  if (e === "" || e === null || typeof e > "u")
    return r.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var n = typeof e == "string" ? Hc(e, r) : e, o = r.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, a = Object.keys(n), i = 0; i < a.length; ++i) {
    var l = a[i], s = zc(l, n[l], r, typeof e == "string");
    o = Je.merge(o, s, r);
  }
  return r.allowSparse === !0 ? o : Je.compact(o);
}, Kc = kc, Jc = Gc, Qc = on, Zn = {
  formats: Qc,
  parse: Jc,
  stringify: Kc
}, Xc = { exports: {} };
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */
(function(e, t) {
  (function(r, n) {
    e.exports = n();
  })(Lr, function() {
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
    r.configure = function(f) {
      var d, h;
      for (d in f)
        h = f[d], h !== void 0 && f.hasOwnProperty(d) && (n[d] = h);
      return this;
    }, r.status = null, r.set = function(f) {
      var d = r.isStarted();
      f = o(f, n.minimum, 1), r.status = f === 1 ? null : f;
      var h = r.render(!d), b = h.querySelector(n.barSelector), w = n.speed, g = n.easing;
      return h.offsetWidth, l(function(S) {
        n.positionUsing === "" && (n.positionUsing = r.getPositioningCSS()), s(b, i(f, w, g)), f === 1 ? (s(h, {
          transition: "none",
          opacity: 1
        }), h.offsetWidth, setTimeout(function() {
          s(h, {
            transition: "all " + w + "ms linear",
            opacity: 0
          }), setTimeout(function() {
            r.remove(), S();
          }, w);
        }, w)) : setTimeout(S, w);
      }), this;
    }, r.isStarted = function() {
      return typeof r.status == "number";
    }, r.start = function() {
      r.status || r.set(0);
      var f = function() {
        setTimeout(function() {
          r.status && (r.trickle(), f());
        }, n.trickleSpeed);
      };
      return n.trickle && f(), this;
    }, r.done = function(f) {
      return !f && !r.status ? this : r.inc(0.3 + 0.5 * Math.random()).set(1);
    }, r.inc = function(f) {
      var d = r.status;
      return d ? (typeof f != "number" && (f = (1 - d) * o(Math.random() * d, 0.1, 0.95)), d = o(d + f, 0, 0.994), r.set(d)) : r.start();
    }, r.trickle = function() {
      return r.inc(Math.random() * n.trickleRate);
    }, function() {
      var f = 0, d = 0;
      r.promise = function(h) {
        return !h || h.state() === "resolved" ? this : (d === 0 && r.start(), f++, d++, h.always(function() {
          d--, d === 0 ? (f = 0, r.done()) : r.set((f - d) / f);
        }), this);
      };
    }(), r.render = function(f) {
      if (r.isRendered()) return document.getElementById("nprogress");
      c(document.documentElement, "nprogress-busy");
      var d = document.createElement("div");
      d.id = "nprogress", d.innerHTML = n.template;
      var h = d.querySelector(n.barSelector), b = f ? "-100" : a(r.status || 0), w = document.querySelector(n.parent), g;
      return s(h, {
        transition: "all 0 linear",
        transform: "translate3d(" + b + "%,0,0)"
      }), n.showSpinner || (g = d.querySelector(n.spinnerSelector), g && v(g)), w != document.body && c(w, "nprogress-custom-parent"), w.appendChild(d), d;
    }, r.remove = function() {
      m(document.documentElement, "nprogress-busy"), m(document.querySelector(n.parent), "nprogress-custom-parent");
      var f = document.getElementById("nprogress");
      f && v(f);
    }, r.isRendered = function() {
      return !!document.getElementById("nprogress");
    }, r.getPositioningCSS = function() {
      var f = document.body.style, d = "WebkitTransform" in f ? "Webkit" : "MozTransform" in f ? "Moz" : "msTransform" in f ? "ms" : "OTransform" in f ? "O" : "";
      return d + "Perspective" in f ? "translate3d" : d + "Transform" in f ? "translate" : "margin";
    };
    function o(f, d, h) {
      return f < d ? d : f > h ? h : f;
    }
    function a(f) {
      return (-1 + f) * 100;
    }
    function i(f, d, h) {
      var b;
      return n.positionUsing === "translate3d" ? b = { transform: "translate3d(" + a(f) + "%,0,0)" } : n.positionUsing === "translate" ? b = { transform: "translate(" + a(f) + "%,0)" } : b = { "margin-left": a(f) + "%" }, b.transition = "all " + d + "ms " + h, b;
    }
    var l = /* @__PURE__ */ function() {
      var f = [];
      function d() {
        var h = f.shift();
        h && h(d);
      }
      return function(h) {
        f.push(h), f.length == 1 && d();
      };
    }(), s = /* @__PURE__ */ function() {
      var f = ["Webkit", "O", "Moz", "ms"], d = {};
      function h(S) {
        return S.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(x, T) {
          return T.toUpperCase();
        });
      }
      function b(S) {
        var x = document.body.style;
        if (S in x) return S;
        for (var T = f.length, R = S.charAt(0).toUpperCase() + S.slice(1), F; T--; )
          if (F = f[T] + R, F in x) return F;
        return S;
      }
      function w(S) {
        return S = h(S), d[S] || (d[S] = b(S));
      }
      function g(S, x, T) {
        x = w(x), S.style[x] = T;
      }
      return function(S, x) {
        var T = arguments, R, F;
        if (T.length == 2)
          for (R in x)
            F = x[R], F !== void 0 && x.hasOwnProperty(R) && g(S, R, F);
        else
          g(S, T[1], T[2]);
      };
    }();
    function u(f, d) {
      var h = typeof f == "string" ? f : p(f);
      return h.indexOf(" " + d + " ") >= 0;
    }
    function c(f, d) {
      var h = p(f), b = h + d;
      u(h, d) || (f.className = b.substring(1));
    }
    function m(f, d) {
      var h = p(f), b;
      u(f, d) && (b = h.replace(" " + d + " ", " "), f.className = b.substring(1, b.length - 1));
    }
    function p(f) {
      return (" " + (f.className || "") + " ").replace(/\s+/gi, " ");
    }
    function v(f) {
      f && f.parentNode && f.parentNode.removeChild(f);
    }
    return r;
  });
})(Xc);
function Yc(e, t, r, n = "brackets") {
  let o = /^https?:\/\//.test(t.toString()), a = o || t.toString().startsWith("/"), i = !a && !t.toString().startsWith("#") && !t.toString().startsWith("?"), l = t.toString().includes("?") || e === "get" && Object.keys(r).length, s = t.toString().includes("#"), u = new URL(t.toString(), "http://localhost");
  return e === "get" && Object.keys(r).length && (u.search = Zn.stringify(Ls(Zn.parse(u.search, { ignoreQueryPrefix: !0 }), r), { encodeValuesOnly: !0, arrayFormat: n }), r = {}), [[o ? `${u.protocol}//${u.host}` : "", a ? u.pathname : "", i ? u.pathname.substring(1) : "", l ? u.search : "", s ? u.hash : ""].join(""), r];
}
const oe = O([]), Ht = O({});
class an {
  constructor(t, r, n, o, a) {
    ye(this, "getAdjacentModal", (t) => {
      const r = this.index.value;
      return oe.value[r + t] ?? null;
    });
    ye(this, "isOnTopOfStack", () => oe.value.length < 2 || oe.value[oe.value.length - 1].id === this.id);
    ye(this, "close", () => {
      const t = this.index.value;
      t > -1 && (Object.keys(this.listeners).forEach((r) => {
        this.off(r);
      }), oe.value[t].open = !1, this.onCloseCallback());
    });
    ye(this, "afterLeave", () => {
      oe.value = oe.value.filter((t) => t.id !== this.id), this.afterLeaveCallback();
    });
    ye(this, "on", (t, r) => {
      this.listeners[t] = this.listeners[t] ?? [], this.listeners[t].push(r);
    });
    ye(this, "off", (t, r) => {
      var n;
      r ? this.listeners[t] = ((n = this.listeners[t]) == null ? void 0 : n.filter((o) => o !== r)) ?? [] : delete this.listeners[t];
    });
    ye(this, "emit", (t, ...r) => {
      var n;
      (n = this.listeners[t]) == null || n.forEach((o) => o(...r));
    });
    ye(this, "reload", (t = {}) => {
      let r = Object.keys(this.response.props);
      t.only && (r = Xr(r, t.only)), t.except && (r = ys(r, t.except)), N.get(this.response.url, {
        headers: {
          Accept: "text/html, application/xhtml+xml",
          "X-Inertia": !0,
          "X-Inertia-Partial-Component": this.response.component,
          "X-Inertia-Version": this.response.version,
          "X-Inertia-Partial-Data": r.join(",")
        }
      }).then((n) => {
        Object.assign(this.componentProps.value, n.data.props);
      });
    });
    this.id = an.generateId(), this.open = !1, this.listeners = {}, this.component = t, this.componentProps = O(r.props), this.response = r, this.modalProps = n, this.onCloseCallback = o, this.afterLeaveCallback = a, this.index = P(() => oe.value.findIndex((i) => i.id === this.id)), this.getParentModal = () => this.getAdjacentModal(-1), this.getChildModal = () => this.getAdjacentModal(1), this.onTopOfStack = P(() => this.isOnTopOfStack());
  }
  static generateId() {
    return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `inertiaui_modal_${crypto.randomUUID()}` : `inertiaui_modal_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
function Zc(e, t) {
  Ht.value[e] = { name: e, callback: t };
}
function ef(e, t, r, n) {
  if (Ht.value[e]) {
    const o = ln(null, {}, t, r, n);
    return o.name = e, Ht.value[e].callback(o), o;
  }
}
function tf(e, t, r = {}, n = {}, o = {}, a, i, l = "brackets") {
  const [s, u] = Yc(t, e || "", r, l);
  return new Promise((c, m) => {
    N({
      url: s,
      method: t,
      data: u,
      headers: {
        ...n,
        Accept: "text/html, application/xhtml+xml",
        "X-Requested-With": "XMLHttpRequest",
        "X-Inertia": !0,
        "X-Inertia-Version": La().version,
        "X-InertiaUI-Modal": !0
      }
    }).then((p) => {
      Na.resolveComponent(p.data.component).then((v) => {
        c(ln(Fa(v), p.data, o, a, i));
      });
    }).catch((p) => {
      m(p);
    });
  });
}
function ln(e, t, r, n, o) {
  const a = new an(e, t, r, n, o);
  return oe.value.push(a), a;
}
const wa = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"];
function Sa() {
  return {
    stack: Ca(oe),
    push: ln,
    reset: () => oe.value = [],
    visit: tf,
    callLocalModal: ef,
    registerLocalModal: Zc,
    removeLocalModal: (e) => delete Ht.value[e]
  };
}
const rf = {
  class: "im-backdrop fixed inset-0 z-30 bg-black/75",
  "aria-hidden": "true"
}, nf = {
  key: 1,
  class: "im-backdrop fixed inset-0 z-30 bg-black/75"
}, of = {
  __name: "ModalWrapper",
  props: {
    // The slideover prop in on top because we need to know if it's a slideover
    // before we can determine the defaule value of other props
    slideover: {
      type: Boolean,
      default: () => Ba("type") === "slideover"
    },
    closeButton: {
      type: Boolean,
      default: (e) => Ue(e.slideover, "closeButton")
    },
    closeExplicitly: {
      type: Boolean,
      default: (e) => Ue(e.slideover, "closeExplicitly")
    },
    maxWidth: {
      type: String,
      default: (e) => Ue(e.slideover, "maxWidth")
    },
    paddingClasses: {
      type: [Boolean, String],
      default: (e) => Ue(e.slideover, "paddingClasses")
    },
    panelClasses: {
      type: [Boolean, String],
      default: (e) => Ue(e.slideover, "panelClasses")
    },
    position: {
      type: String,
      default: (e) => Ue(e.slideover, "position")
    }
  },
  setup(e) {
    const t = e, r = K("modalContext"), n = P(() => ({
      ...Xr(t, wa),
      ...r.value.modalProps
    }));
    function o() {
      n.value.closeExplicitly || r.value.close();
    }
    const a = to();
    return Object.keys(a).filter((i) => i.startsWith("on")).forEach((i) => {
      const l = i.replace(/^on/, "").replace(/^./, (s) => s.toLowerCase()).replace(/([A-Z])/g, "-$1").toLowerCase();
      r.value.on(l, a[i]);
    }), (i, l) => {
      var s;
      return Y(), ze(k(To), {
        unmount: !1,
        show: ((s = k(r)) == null ? void 0 : s.open) ?? !1,
        enter: "transition transform ease-in-out duration-300",
        "enter-from": "opacity-0 scale-95",
        "enter-to": "opacity-100 scale-100",
        leave: "transition transform ease-in-out duration-300",
        "leave-from": "opacity-100 scale-100",
        "leave-to": "opacity-0 scale-95"
      }, {
        default: pe(() => {
          var u, c;
          return [
            Fe(k(Ai), {
              "data-inertiaui-modal-id": (u = k(r)) == null ? void 0 : u.id,
              "data-inertiaui-modal-index": (c = k(r)) == null ? void 0 : c.index,
              class: "im-dialog relative z-20",
              onClose: o
            }, {
              default: pe(() => {
                var m, p, v;
                return [
                  ((m = k(r)) == null ? void 0 : m.index) === 0 ? (Y(), ze(k(Vt), {
                    key: 0,
                    as: "template",
                    enter: "transition transform ease-in-out duration-300",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "transition transform ease-in-out duration-300",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: pe(() => {
                      var f;
                      return [
                        ro(He("div", rf, null, 512), [
                          [no, (f = k(r)) == null ? void 0 : f.onTopOfStack]
                        ])
                      ];
                    }),
                    _: 1
                  })) : ct("", !0),
                  ((p = k(r)) == null ? void 0 : p.index) > 0 && ((v = k(r)) != null && v.onTopOfStack) ? (Y(), Me("div", nf)) : ct("", !0),
                  pt(i.$slots, "default", {
                    modalContext: k(r),
                    modalProps: n.value
                  })
                ];
              }),
              _: 3
            }, 8, ["data-inertiaui-modal-id", "data-inertiaui-modal-index"])
          ];
        }),
        _: 3
      }, 8, ["show"]);
    };
  }
}, af = { class: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden" }, lf = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, sf = {
  __name: "SlideoverContent",
  props: {
    modalContext: Object,
    modalProps: Object
  },
  setup(e) {
    return (t, r) => (Y(), Me("div", af, [
      He("div", {
        class: Ce(["im-slideover-positioner flex min-h-full items-center", {
          "justify-start": e.modalProps.position === "left",
          "justify-end": e.modalProps.position === "right"
        }])
      }, [
        Fe(k(Vt), {
          "enter-from": "opacity-0 " + (e.modalProps.position === "left" ? "-translate-x-full" : "translate-x-full"),
          "enter-to": "opacity-100 translate-x-0",
          "leave-from": "opacity-100 translate-x-0",
          "leave-to": "opacity-0 " + (e.modalProps.position === "left" ? "-translate-x-full" : "translate-x-full"),
          class: Ce({
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
          default: pe(() => [
            Fe(k(Oo), {
              class: Ce(["im-slideover-content relative", [e.modalProps.paddingClasses, e.modalProps.panelClasses]])
            }, {
              default: pe(() => [
                e.modalProps.closeButton ? (Y(), Me("div", lf, [
                  Fe(Ro, {
                    onClick: e.modalContext.close
                  }, null, 8, ["onClick"])
                ])) : ct("", !0),
                pt(t.$slots, "default", {
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
}, yf = {
  __name: "Modal",
  props: {
    name: {
      type: String,
      required: !1
    }
  },
  emits: ["emit"],
  setup(e, { expose: t, emit: r }) {
    const n = e, o = Sa(), a = n.name ? O({}) : K("modalContext");
    n.name && (o.registerLocalModal(n.name, function(s) {
      a.value = s;
    }), ne("modalContext", a), $a(() => {
      o.removeLocalModal(n.name);
    }));
    const i = r;
    function l(s, ...u) {
      i("emit", s, ...u);
    }
    return t({
      close: a.value.close,
      emit: l,
      getChildModal: a.value.getChildModal,
      getParentModal: a.value.getParentModal,
      modalContext: a.value,
      reload: a.value.reload
    }), (s, u) => (Y(), ze(of, null, {
      default: pe(({ modalContext: c, modalProps: m }) => [
        (Y(), ze(oo(m.slideover ? sf : Ui), {
          "modal-context": c,
          "modal-props": m
        }, {
          default: pe(() => [
            pt(s.$slots, "default", {
              close: c.close,
              emit: l,
              getChildModal: c.getChildModal,
              getParentModal: c.getParentModal,
              modalContext: c,
              modalProps: m,
              reload: c.reload
            })
          ]),
          _: 2
        }, 1032, ["modal-context", "modal-props"]))
      ]),
      _: 3
    }));
  }
}, hf = {
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
    const r = e, n = O(!1), o = Sa(), a = O(null);
    ne("modalContext", a);
    const i = t, l = O(!1);
    Ee(
      () => {
        var v;
        return (v = a.value) == null ? void 0 : v.isOnTopOfStack();
      },
      (v) => {
        a.value && (v && l.value ? i("focus") : v || i("blur"), l.value = !v);
      }
    ), _(() => {
      r.fragment && window.location.hash === `#${r.fragment}` && p();
    });
    const s = to();
    function u(v, ...f) {
      const d = v.replace(/-([a-z])/g, (b) => b[1].toUpperCase()), h = `on${d.charAt(0).toUpperCase()}${d.slice(1)}`;
      h in s && s[h](...f);
    }
    Ee(a, (v, f) => {
      v && !f && (r.fragment && a.value.index === 0 && (window.location.hash = r.fragment), eo(() => {
        a.value.open = !0, i("success");
      }));
    });
    function c() {
      r.fragment && a.value.index === 0 && (window.location.hash = ""), i("close");
    }
    function m() {
      a.value = null, i("after-leave");
    }
    function p() {
      if (n.value)
        return;
      const v = hs(Xr(r, wa));
      if (r.href.startsWith("#")) {
        a.value = o.callLocalModal(r.href.substring(1), v, c, m);
        return;
      }
      n.value = !0, i("start"), o.visit(r.href, r.method, r.data, r.headers, v, c, m, r.queryStringArrayFormat).then((f) => a.value = f).catch((f) => i("error", f)).finally(() => n.value = !1);
    }
    return (v, f) => {
      var d;
      return Y(), Me(_r, null, [
        (Y(), ze(oo(e.as), un(k(s), {
          href: e.href,
          onClick: Da(p, ["prevent"])
        }), {
          default: pe(() => [
            pt(v.$slots, "default", { loading: n.value })
          ]),
          _: 3
        }, 16, ["href"])),
        (d = a.value) != null && d.component ? ro((Y(), ze(k(a).component, un({ key: 0 }, a.value.componentProps, { onEmit: u }), null, 16)), [
          [no, !1]
        ]) : ct("", !0)
      ], 64);
    };
  }
};
export {
  yf as Modal,
  hf as ModalLink,
  Ba as getConfig,
  pf as putConfig,
  df as resetConfig
};
