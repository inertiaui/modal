var Sa = Object.defineProperty;
var Ea = (e, t, r) => t in e ? Sa(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var ce = (e, t, r) => Ea(e, typeof t != "symbol" ? t + "" : t, r);
import * as un from "vue";
import { watchEffect as ae, ref as x, computed as P, cloneVNode as xa, h as _, Fragment as Hr, defineComponent as J, inject as Z, provide as ne, onMounted as j, onUnmounted as ie, watch as Ee, shallowRef as Oa, unref as R, getCurrentInstance as Aa, Teleport as Pa, reactive as Ta, nextTick as Ra, normalizeClass as Fe, readonly as Ca, markRaw as Fa, openBlock as V, createElementBlock as Ie, createElementVNode as ze, createVNode as $e, withCtx as ye, createCommentVNode as De, renderSlot as pt, createBlock as Te, mergeProps as to, onBeforeUnmount as br, useAttrs as ro, withDirectives as $a, vShow as Da, resolveDynamicComponent as no, withModifiers as La, onBeforeMount as Na } from "vue";
import { usePage as Ma, router as Ba } from "@inertiajs/vue3";
const Ot = {
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
class Ia {
  constructor() {
    this.config = {}, this.reset();
  }
  reset() {
    this.config = JSON.parse(JSON.stringify(Ot));
  }
  put(t, r) {
    if (typeof t == "object") {
      this.config = {
        type: t.type ?? Ot.type,
        modal: { ...Ot.modal, ...t.modal ?? {} },
        slideover: { ...Ot.slideover, ...t.slideover ?? {} }
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
const zt = new Ia(), mf = () => zt.reset(), yf = (e, t) => zt.put(e, t), ka = (e) => zt.get(e), je = (e, t) => zt.get(e ? `slideover.${t}` : `modal.${t}`);
function qr(e) {
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
    return qr(() => {
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
let Ua = Symbol("headlessui.useid"), _a = 0;
const Ue = (cn = un.useId) != null ? cn : function() {
  return un.inject(Ua, () => `${++_a}`)();
};
function B(e) {
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
var ja = Object.defineProperty, Wa = (e, t, r) => t in e ? ja(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, fn = (e, t, r) => (Wa(e, typeof t != "symbol" ? t + "" : t, r), r);
let Ha = class {
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
}, yt = new Ha();
function Xe(e) {
  if (yt.isServer) return null;
  if (e instanceof Node) return e.ownerDocument;
  if (e != null && e.hasOwnProperty("value")) {
    let t = B(e);
    if (t) return t.ownerDocument;
  }
  return document;
}
let wr = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var be = ((e) => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e))(be || {}), oo = ((e) => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(oo || {}), qa = ((e) => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(qa || {});
function za(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(wr)).sort((t, r) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (r.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var ao = ((e) => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(ao || {});
function Va(e, t = 0) {
  var r;
  return e === ((r = Xe(e)) == null ? void 0 : r.body) ? !1 : me(t, { 0() {
    return e.matches(wr);
  }, 1() {
    let n = e;
    for (; n !== null; ) {
      if (n.matches(wr)) return !0;
      n = n.parentElement;
    }
    return !1;
  } });
}
var Ga = ((e) => (e[e.Keyboard = 0] = "Keyboard", e[e.Mouse = 1] = "Mouse", e))(Ga || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (e) => {
  e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (e) => {
  e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
function Le(e) {
  e == null || e.focus({ preventScroll: !0 });
}
let Ka = ["textarea", "input"].join(",");
function Ja(e) {
  var t, r;
  return (r = (t = e == null ? void 0 : e.matches) == null ? void 0 : t.call(e, Ka)) != null ? r : !1;
}
function Qa(e, t = (r) => r) {
  return e.slice().sort((r, n) => {
    let o = t(r), a = t(n);
    if (o === null || a === null) return 0;
    let i = o.compareDocumentPosition(a);
    return i & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : i & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function $t(e, t, { sorted: r = !0, relativeTo: n = null, skipElements: o = [] } = {}) {
  var a;
  let i = (a = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : document : e == null ? void 0 : e.ownerDocument) != null ? a : document, l = Array.isArray(e) ? r ? Qa(e) : e : za(e);
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
  })(), c = t & 32 ? { preventScroll: !0 } : {}, y = 0, d = l.length, v;
  do {
    if (y >= d || y + d <= 0) return 0;
    let f = u + y;
    if (t & 16) f = (f + d) % d;
    else {
      if (f < 0) return 3;
      if (f >= d) return 1;
    }
    v = l[f], v == null || v.focus(c), y += s;
  } while (v !== i.activeElement);
  return t & 6 && Ja(v) && v.select(), 2;
}
function io() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function Xa() {
  return /Android/gi.test(window.navigator.userAgent);
}
function Ya() {
  return io() || Xa();
}
function At(e, t, r) {
  yt.isServer || ae((n) => {
    document.addEventListener(e, t, r), n(() => document.removeEventListener(e, t, r));
  });
}
function lo(e, t, r) {
  yt.isServer || ae((n) => {
    window.addEventListener(e, t, r), n(() => window.removeEventListener(e, t, r));
  });
}
function Za(e, t, r = P(() => !0)) {
  function n(a, i) {
    if (!r.value || a.defaultPrevented) return;
    let l = i(a);
    if (l === null || !l.getRootNode().contains(l)) return;
    let s = function u(c) {
      return typeof c == "function" ? u(c()) : Array.isArray(c) || c instanceof Set ? c : [c];
    }(e);
    for (let u of s) {
      if (u === null) continue;
      let c = u instanceof HTMLElement ? u : B(u);
      if (c != null && c.contains(l) || a.composed && a.composedPath().includes(c)) return;
    }
    return !Va(l, ao.Loose) && l.tabIndex !== -1 && a.preventDefault(), t(a, l);
  }
  let o = x(null);
  At("pointerdown", (a) => {
    var i, l;
    r.value && (o.value = ((l = (i = a.composedPath) == null ? void 0 : i.call(a)) == null ? void 0 : l[0]) || a.target);
  }, !0), At("mousedown", (a) => {
    var i, l;
    r.value && (o.value = ((l = (i = a.composedPath) == null ? void 0 : i.call(a)) == null ? void 0 : l[0]) || a.target);
  }, !0), At("click", (a) => {
    Ya() || o.value && (n(a, () => o.value), o.value = null);
  }, !0), At("touchend", (a) => n(a, () => a.target instanceof HTMLElement ? a.target : null), !0), lo("blur", (a) => n(a, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), !0);
}
var Bt = ((e) => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(Bt || {}), we = ((e) => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(we || {});
function ee({ visible: e = !0, features: t = 0, ourProps: r, theirProps: n, ...o }) {
  var a;
  let i = uo(n, r), l = Object.assign(o, { props: i });
  if (e || t & 2 && i.static) return er(l);
  if (t & 1) {
    let s = (a = i.unmount) == null || a ? 0 : 1;
    return me(s, { 0() {
      return null;
    }, 1() {
      return er({ ...o, props: { ...i, hidden: !0, style: { display: "none" } } });
    } });
  }
  return er(l);
}
function er({ props: e, attrs: t, slots: r, slot: n, name: o }) {
  var a, i;
  let { as: l, ...s } = co(e, ["unmount", "static"]), u = (a = r.default) == null ? void 0 : a.call(r, n), c = {};
  if (n) {
    let y = !1, d = [];
    for (let [v, f] of Object.entries(n)) typeof f == "boolean" && (y = !0), f === !0 && d.push(v);
    y && (c["data-headlessui-state"] = d.join(" "));
  }
  if (l === "template") {
    if (u = so(u ?? []), Object.keys(s).length > 0 || Object.keys(t).length > 0) {
      let [y, ...d] = u ?? [];
      if (!ei(y) || d.length > 0) throw new Error(['Passing props on "template"!', "", `The current component <${o} /> is rendering a "template".`, "However we need to passthrough the following props:", Object.keys(s).concat(Object.keys(t)).map((p) => p.trim()).filter((p, h, b) => b.indexOf(p) === h).sort((p, h) => p.localeCompare(h)).map((p) => `  - ${p}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".', "Render a single element as the child so that we can forward the props onto that element."].map((p) => `  - ${p}`).join(`
`)].join(`
`));
      let v = uo((i = y.props) != null ? i : {}, s, c), f = xa(y, v, !0);
      for (let p in v) p.startsWith("on") && (f.props || (f.props = {}), f.props[p] = v[p]);
      return f;
    }
    return Array.isArray(u) && u.length === 1 ? u[0] : u;
  }
  return _(l, Object.assign({}, s, c), { default: () => u });
}
function so(e) {
  return e.flatMap((t) => t.type === Hr ? so(t.children) : [t]);
}
function uo(...e) {
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
function co(e, t = []) {
  let r = Object.assign({}, e);
  for (let n of t) n in r && delete r[n];
  return r;
}
function ei(e) {
  return e == null ? !1 : typeof e.type == "string" || typeof e.type == "object" || typeof e.type == "function";
}
var It = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(It || {});
let Sr = J({ name: "Hidden", props: { as: { type: [Object, String], default: "div" }, features: { type: Number, default: 1 } }, setup(e, { slots: t, attrs: r }) {
  return () => {
    var n;
    let { features: o, ...a } = e, i = { "aria-hidden": (o & 2) === 2 ? !0 : (n = a["aria-hidden"]) != null ? n : void 0, hidden: (o & 4) === 4 ? !0 : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(o & 4) === 4 && (o & 2) !== 2 && { display: "none" } } };
    return ee({ ourProps: i, theirProps: a, slot: {}, attrs: r, slots: t, name: "Hidden" });
  };
} }), fo = Symbol("Context");
var X = ((e) => (e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(X || {});
function ti() {
  return zr() !== null;
}
function zr() {
  return Z(fo, null);
}
function ri(e) {
  ne(fo, e);
}
var po = ((e) => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(po || {});
function ni(e) {
  function t() {
    document.readyState !== "loading" && (e(), document.removeEventListener("DOMContentLoaded", t));
  }
  typeof window < "u" && typeof document < "u" && (document.addEventListener("DOMContentLoaded", t), t());
}
let Ae = [];
ni(() => {
  function e(t) {
    t.target instanceof HTMLElement && t.target !== document.body && Ae[0] !== t.target && (Ae.unshift(t.target), Ae = Ae.filter((r) => r != null && r.isConnected), Ae.splice(10));
  }
  window.addEventListener("click", e, { capture: !0 }), window.addEventListener("mousedown", e, { capture: !0 }), window.addEventListener("focus", e, { capture: !0 }), document.body.addEventListener("click", e, { capture: !0 }), document.body.addEventListener("mousedown", e, { capture: !0 }), document.body.addEventListener("focus", e, { capture: !0 });
});
function mo(e, t, r, n) {
  yt.isServer || ae((o) => {
    e = e ?? window, e.addEventListener(t, r, n), o(() => e.removeEventListener(t, r, n));
  });
}
var lt = ((e) => (e[e.Forwards = 0] = "Forwards", e[e.Backwards = 1] = "Backwards", e))(lt || {});
function oi() {
  let e = x(0);
  return lo("keydown", (t) => {
    t.key === "Tab" && (e.value = t.shiftKey ? 1 : 0);
  }), e;
}
function yo(e) {
  if (!e) return /* @__PURE__ */ new Set();
  if (typeof e == "function") return new Set(e());
  let t = /* @__PURE__ */ new Set();
  for (let r of e.value) {
    let n = B(r);
    n instanceof HTMLElement && t.add(n);
  }
  return t;
}
var ho = ((e) => (e[e.None = 1] = "None", e[e.InitialFocus = 2] = "InitialFocus", e[e.TabLock = 4] = "TabLock", e[e.FocusLock = 8] = "FocusLock", e[e.RestoreFocus = 16] = "RestoreFocus", e[e.All = 30] = "All", e))(ho || {});
let nt = Object.assign(J({ name: "FocusTrap", props: { as: { type: [Object, String], default: "div" }, initialFocus: { type: Object, default: null }, features: { type: Number, default: 30 }, containers: { type: [Object, Function], default: x(/* @__PURE__ */ new Set()) } }, inheritAttrs: !1, setup(e, { attrs: t, slots: r, expose: n }) {
  let o = x(null);
  n({ el: o, $el: o });
  let a = P(() => Xe(o)), i = x(!1);
  j(() => i.value = !0), ie(() => i.value = !1), ii({ ownerDocument: a }, P(() => i.value && !!(e.features & 16)));
  let l = li({ ownerDocument: a, container: o, initialFocus: P(() => e.initialFocus) }, P(() => i.value && !!(e.features & 2)));
  si({ ownerDocument: a, container: o, containers: e.containers, previousActiveElement: l }, P(() => i.value && !!(e.features & 8)));
  let s = oi();
  function u(v) {
    let f = B(o);
    f && ((p) => p())(() => {
      me(s.value, { [lt.Forwards]: () => {
        $t(f, be.First, { skipElements: [v.relatedTarget] });
      }, [lt.Backwards]: () => {
        $t(f, be.Last, { skipElements: [v.relatedTarget] });
      } });
    });
  }
  let c = x(!1);
  function y(v) {
    v.key === "Tab" && (c.value = !0, requestAnimationFrame(() => {
      c.value = !1;
    }));
  }
  function d(v) {
    if (!i.value) return;
    let f = yo(e.containers);
    B(o) instanceof HTMLElement && f.add(B(o));
    let p = v.relatedTarget;
    p instanceof HTMLElement && p.dataset.headlessuiFocusGuard !== "true" && (vo(f, p) || (c.value ? $t(B(o), me(s.value, { [lt.Forwards]: () => be.Next, [lt.Backwards]: () => be.Previous }) | be.WrapAround, { relativeTo: v.target }) : v.target instanceof HTMLElement && Le(v.target)));
  }
  return () => {
    let v = {}, f = { ref: o, onKeydown: y, onFocusout: d }, { features: p, initialFocus: h, containers: b, ...w } = e;
    return _(Hr, [!!(p & 4) && _(Sr, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: u, features: It.Focusable }), ee({ ourProps: f, theirProps: { ...t, ...w }, slot: v, attrs: t, slots: r, name: "FocusTrap" }), !!(p & 4) && _(Sr, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: u, features: It.Focusable })]);
  };
} }), { features: ho });
function ai(e) {
  let t = x(Ae.slice());
  return Ee([e], ([r], [n]) => {
    n === !0 && r === !1 ? qr(() => {
      t.value.splice(0);
    }) : n === !1 && r === !0 && (t.value = Ae.slice());
  }, { flush: "post" }), () => {
    var r;
    return (r = t.value.find((n) => n != null && n.isConnected)) != null ? r : null;
  };
}
function ii({ ownerDocument: e }, t) {
  let r = ai(t);
  j(() => {
    ae(() => {
      var n, o;
      t.value || ((n = e.value) == null ? void 0 : n.activeElement) === ((o = e.value) == null ? void 0 : o.body) && Le(r());
    }, { flush: "post" });
  }), ie(() => {
    t.value && Le(r());
  });
}
function li({ ownerDocument: e, container: t, initialFocus: r }, n) {
  let o = x(null), a = x(!1);
  return j(() => a.value = !0), ie(() => a.value = !1), j(() => {
    Ee([t, r, n], (i, l) => {
      if (i.every((u, c) => (l == null ? void 0 : l[c]) === u) || !n.value) return;
      let s = B(t);
      s && qr(() => {
        var u, c;
        if (!a.value) return;
        let y = B(r), d = (u = e.value) == null ? void 0 : u.activeElement;
        if (y) {
          if (y === d) {
            o.value = d;
            return;
          }
        } else if (s.contains(d)) {
          o.value = d;
          return;
        }
        y ? Le(y) : $t(s, be.First | be.NoScroll) === oo.Error && console.warn("There are no focusable elements inside the <FocusTrap />"), o.value = (c = e.value) == null ? void 0 : c.activeElement;
      });
    }, { immediate: !0, flush: "post" });
  }), o;
}
function si({ ownerDocument: e, container: t, containers: r, previousActiveElement: n }, o) {
  var a;
  mo((a = e.value) == null ? void 0 : a.defaultView, "focus", (i) => {
    if (!o.value) return;
    let l = yo(r);
    B(t) instanceof HTMLElement && l.add(B(t));
    let s = n.value;
    if (!s) return;
    let u = i.target;
    u && u instanceof HTMLElement ? vo(l, u) ? (n.value = u, Le(u)) : (i.preventDefault(), i.stopPropagation(), Le(s)) : Le(n.value);
  }, !0);
}
function vo(e, t) {
  for (let r of e) if (r.contains(t)) return !0;
  return !1;
}
function ui(e) {
  let t = Oa(e.getSnapshot());
  return ie(e.subscribe(() => {
    t.value = e.getSnapshot();
  })), t;
}
function ci(e, t) {
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
function fi() {
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
function di() {
  return io() ? { before({ doc: e, d: t, meta: r }) {
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
function pi() {
  return { before({ doc: e, d: t }) {
    t.style(e.documentElement, "overflow", "hidden");
  } };
}
function mi(e) {
  let t = {};
  for (let r of e) Object.assign(t, r(t));
  return t;
}
let Re = ci(() => /* @__PURE__ */ new Map(), { PUSH(e, t) {
  var r;
  let n = (r = this.get(e)) != null ? r : { doc: e, count: 0, d: mt(), meta: /* @__PURE__ */ new Set() };
  return n.count++, n.meta.add(t), this.set(e, n), this;
}, POP(e, t) {
  let r = this.get(e);
  return r && (r.count--, r.meta.delete(t)), this;
}, SCROLL_PREVENT({ doc: e, d: t, meta: r }) {
  let n = { doc: e, d: t, meta: mi(r) }, o = [di(), fi(), pi()];
  o.forEach(({ before: a }) => a == null ? void 0 : a(n)), o.forEach(({ after: a }) => a == null ? void 0 : a(n));
}, SCROLL_ALLOW({ d: e }) {
  e.dispose();
}, TEARDOWN({ doc: e }) {
  this.delete(e);
} });
Re.subscribe(() => {
  let e = Re.getSnapshot(), t = /* @__PURE__ */ new Map();
  for (let [r] of e) t.set(r, r.documentElement.style.overflow);
  for (let r of e.values()) {
    let n = t.get(r.doc) === "hidden", o = r.count !== 0;
    (o && !n || !o && n) && Re.dispatch(r.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", r), r.count === 0 && Re.dispatch("TEARDOWN", r);
  }
});
function yi(e, t, r) {
  let n = ui(Re), o = P(() => {
    let a = e.value ? n.value.get(e.value) : void 0;
    return a ? a.count > 0 : !1;
  });
  return Ee([e, t], ([a, i], [l], s) => {
    if (!a || !i) return;
    Re.dispatch("PUSH", a, r);
    let u = !1;
    s(() => {
      u || (Re.dispatch("POP", l ?? a, r), u = !0);
    });
  }, { immediate: !0 }), o;
}
let tr = /* @__PURE__ */ new Map(), ot = /* @__PURE__ */ new Map();
function dn(e, t = x(!0)) {
  ae((r) => {
    var n;
    if (!t.value) return;
    let o = B(e);
    if (!o) return;
    r(function() {
      var i;
      if (!o) return;
      let l = (i = ot.get(o)) != null ? i : 1;
      if (l === 1 ? ot.delete(o) : ot.set(o, l - 1), l !== 1) return;
      let s = tr.get(o);
      s && (s["aria-hidden"] === null ? o.removeAttribute("aria-hidden") : o.setAttribute("aria-hidden", s["aria-hidden"]), o.inert = s.inert, tr.delete(o));
    });
    let a = (n = ot.get(o)) != null ? n : 0;
    ot.set(o, a + 1), a === 0 && (tr.set(o, { "aria-hidden": o.getAttribute("aria-hidden"), inert: o.inert }), o.setAttribute("aria-hidden", "true"), o.inert = !0);
  });
}
function hi({ defaultContainers: e = [], portals: t, mainTreeNodeRef: r } = {}) {
  let n = x(null), o = Xe(n);
  function a() {
    var i, l, s;
    let u = [];
    for (let c of e) c !== null && (c instanceof HTMLElement ? u.push(c) : "value" in c && c.value instanceof HTMLElement && u.push(c.value));
    if (t != null && t.value) for (let c of t.value) u.push(c);
    for (let c of (i = o == null ? void 0 : o.querySelectorAll("html > *, body > *")) != null ? i : []) c !== document.body && c !== document.head && c instanceof HTMLElement && c.id !== "headlessui-portal-root" && (c.contains(B(n)) || c.contains((s = (l = B(n)) == null ? void 0 : l.getRootNode()) == null ? void 0 : s.host) || u.some((y) => c.contains(y)) || u.push(c));
    return u;
  }
  return { resolveContainers: a, contains(i) {
    return a().some((l) => l.contains(i));
  }, mainTreeNodeRef: n, MainTreeNode() {
    return r != null ? null : _(Sr, { features: It.Hidden, ref: n });
  } };
}
let go = Symbol("ForcePortalRootContext");
function vi() {
  return Z(go, !1);
}
let Er = J({ name: "ForcePortalRoot", props: { as: { type: [Object, String], default: "template" }, force: { type: Boolean, default: !1 } }, setup(e, { slots: t, attrs: r }) {
  return ne(go, e.force), () => {
    let { force: n, ...o } = e;
    return ee({ theirProps: o, ourProps: {}, slot: {}, slots: t, attrs: r, name: "ForcePortalRoot" });
  };
} }), bo = Symbol("StackContext");
var xr = ((e) => (e[e.Add = 0] = "Add", e[e.Remove = 1] = "Remove", e))(xr || {});
function gi() {
  return Z(bo, () => {
  });
}
function bi({ type: e, enabled: t, element: r, onUpdate: n }) {
  let o = gi();
  function a(...i) {
    n == null || n(...i), o(...i);
  }
  j(() => {
    Ee(t, (i, l) => {
      i ? a(0, e, r) : l === !0 && a(1, e, r);
    }, { immediate: !0, flush: "sync" });
  }), ie(() => {
    t.value && a(1, e, r);
  }), ne(bo, a);
}
let wo = Symbol("DescriptionContext");
function wi() {
  let e = Z(wo, null);
  if (e === null) throw new Error("Missing parent");
  return e;
}
function Si({ slot: e = x({}), name: t = "Description", props: r = {} } = {}) {
  let n = x([]);
  function o(a) {
    return n.value.push(a), () => {
      let i = n.value.indexOf(a);
      i !== -1 && n.value.splice(i, 1);
    };
  }
  return ne(wo, { register: o, slot: e, name: t, props: r }), P(() => n.value.length > 0 ? n.value.join(" ") : void 0);
}
J({ name: "Description", props: { as: { type: [Object, String], default: "p" }, id: { type: String, default: null } }, setup(e, { attrs: t, slots: r }) {
  var n;
  let o = (n = e.id) != null ? n : `headlessui-description-${Ue()}`, a = wi();
  return j(() => ie(a.register(o))), () => {
    let { name: i = "Description", slot: l = x({}), props: s = {} } = a, { ...u } = e, c = { ...Object.entries(s).reduce((y, [d, v]) => Object.assign(y, { [d]: R(v) }), {}), id: o };
    return ee({ ourProps: c, theirProps: u, slot: l.value, attrs: t, slots: r, name: i });
  };
} });
function Ei(e) {
  let t = Xe(e);
  if (!t) {
    if (e === null) return null;
    throw new Error(`[Headless UI]: Cannot find ownerDocument for contextElement: ${e}`);
  }
  let r = t.getElementById("headlessui-portal-root");
  if (r) return r;
  let n = t.createElement("div");
  return n.setAttribute("id", "headlessui-portal-root"), t.body.appendChild(n);
}
const Or = /* @__PURE__ */ new WeakMap();
function xi(e) {
  var t;
  return (t = Or.get(e)) != null ? t : 0;
}
function pn(e, t) {
  let r = t(xi(e));
  return r <= 0 ? Or.delete(e) : Or.set(e, r), r;
}
let So = J({ name: "Portal", props: { as: { type: [Object, String], default: "div" } }, setup(e, { slots: t, attrs: r }) {
  let n = x(null), o = P(() => Xe(n)), a = vi(), i = Z(Eo, null), l = x(a === !0 || i == null ? Ei(n.value) : i.resolveTarget());
  l.value && pn(l.value, (d) => d + 1);
  let s = x(!1);
  j(() => {
    s.value = !0;
  }), ae(() => {
    a || i != null && (l.value = i.resolveTarget());
  });
  let u = Z(Ar, null), c = !1, y = Aa();
  return Ee(n, () => {
    if (c || !u) return;
    let d = B(n);
    d && (ie(u.register(d), y), c = !0);
  }), ie(() => {
    var d, v;
    let f = (d = o.value) == null ? void 0 : d.getElementById("headlessui-portal-root");
    !f || l.value !== f || pn(l.value, (p) => p - 1) || l.value.children.length > 0 || (v = l.value.parentElement) == null || v.removeChild(l.value);
  }), () => {
    if (!s.value || l.value === null) return null;
    let d = { ref: n, "data-headlessui-portal": "" };
    return _(Pa, { to: l.value }, ee({ ourProps: d, theirProps: e, slot: {}, attrs: r, slots: t, name: "Portal" }));
  };
} }), Ar = Symbol("PortalParentContext");
function Oi() {
  let e = Z(Ar, null), t = x([]);
  function r(a) {
    return t.value.push(a), e && e.register(a), () => n(a);
  }
  function n(a) {
    let i = t.value.indexOf(a);
    i !== -1 && t.value.splice(i, 1), e && e.unregister(a);
  }
  let o = { register: r, unregister: n, portals: t };
  return [t, J({ name: "PortalWrapper", setup(a, { slots: i }) {
    return ne(Ar, o), () => {
      var l;
      return (l = i.default) == null ? void 0 : l.call(i);
    };
  } })];
}
let Eo = Symbol("PortalGroupContext"), Ai = J({ name: "PortalGroup", props: { as: { type: [Object, String], default: "template" }, target: { type: Object, default: null } }, setup(e, { attrs: t, slots: r }) {
  let n = Ta({ resolveTarget() {
    return e.target;
  } });
  return ne(Eo, n), () => {
    let { target: o, ...a } = e;
    return ee({ theirProps: a, ourProps: {}, slot: {}, attrs: t, slots: r, name: "PortalGroup" });
  };
} });
var Pi = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(Pi || {});
let Pr = Symbol("DialogContext");
function ht(e) {
  let t = Z(Pr, null);
  if (t === null) {
    let r = new Error(`<${e} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(r, ht), r;
  }
  return t;
}
let Pt = "DC8F892D-2EBD-447C-A4C8-A03058436FF4", Ti = J({ name: "Dialog", inheritAttrs: !1, props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: !1 }, unmount: { type: Boolean, default: !0 }, open: { type: [Boolean, String], default: Pt }, initialFocus: { type: Object, default: null }, id: { type: String, default: null }, role: { type: String, default: "dialog" } }, emits: { close: (e) => !0 }, setup(e, { emit: t, attrs: r, slots: n, expose: o }) {
  var a, i;
  let l = (a = e.id) != null ? a : `headlessui-dialog-${Ue()}`, s = x(!1);
  j(() => {
    s.value = !0;
  });
  let u = !1, c = P(() => e.role === "dialog" || e.role === "alertdialog" ? e.role : (u || (u = !0, console.warn(`Invalid role [${c}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog")), y = x(0), d = zr(), v = P(() => e.open === Pt && d !== null ? (d.value & X.Open) === X.Open : e.open), f = x(null), p = P(() => Xe(f));
  if (o({ el: f, $el: f }), !(e.open !== Pt || d !== null)) throw new Error("You forgot to provide an `open` prop to the `Dialog`.");
  if (typeof v.value != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${v.value === Pt ? void 0 : e.open}`);
  let h = P(() => s.value && v.value ? 0 : 1), b = P(() => h.value === 0), w = P(() => y.value > 1), g = Z(Pr, null) !== null, [S, O] = Oi(), { resolveContainers: T, mainTreeNodeRef: C, MainTreeNode: $ } = hi({ portals: S, defaultContainers: [P(() => {
    var F;
    return (F = ue.panelRef.value) != null ? F : f.value;
  })] }), q = P(() => w.value ? "parent" : "leaf"), Q = P(() => d !== null ? (d.value & X.Closing) === X.Closing : !1), he = P(() => g || Q.value ? !1 : b.value), se = P(() => {
    var F, N, te;
    return (te = Array.from((N = (F = p.value) == null ? void 0 : F.querySelectorAll("body > *")) != null ? N : []).find((re) => re.id === "headlessui-portal-root" ? !1 : re.contains(B(C)) && re instanceof HTMLElement)) != null ? te : null;
  });
  dn(se, he);
  let D = P(() => w.value ? !0 : b.value), z = P(() => {
    var F, N, te;
    return (te = Array.from((N = (F = p.value) == null ? void 0 : F.querySelectorAll("[data-headlessui-portal]")) != null ? N : []).find((re) => re.contains(B(C)) && re instanceof HTMLElement)) != null ? te : null;
  });
  dn(z, D), bi({ type: "Dialog", enabled: P(() => h.value === 0), element: f, onUpdate: (F, N) => {
    if (N === "Dialog") return me(F, { [xr.Add]: () => y.value += 1, [xr.Remove]: () => y.value -= 1 });
  } });
  let k = Si({ name: "DialogDescription", slot: P(() => ({ open: v.value })) }), H = x(null), ue = { titleId: H, panelRef: x(null), dialogState: h, setTitleId(F) {
    H.value !== F && (H.value = F);
  }, close() {
    t("close", !1);
  } };
  ne(Pr, ue);
  let Et = P(() => !(!b.value || w.value));
  Za(T, (F, N) => {
    F.preventDefault(), ue.close(), Ra(() => N == null ? void 0 : N.focus());
  }, Et);
  let rt = P(() => !(w.value || h.value !== 0));
  mo((i = p.value) == null ? void 0 : i.defaultView, "keydown", (F) => {
    rt.value && (F.defaultPrevented || F.key === po.Escape && (F.preventDefault(), F.stopPropagation(), ue.close()));
  });
  let _e = P(() => !(Q.value || h.value !== 0 || g));
  return yi(p, _e, (F) => {
    var N;
    return { containers: [...(N = F.containers) != null ? N : [], T] };
  }), ae((F) => {
    if (h.value !== 0) return;
    let N = B(f);
    if (!N) return;
    let te = new ResizeObserver((re) => {
      for (let Zt of re) {
        let xt = Zt.target.getBoundingClientRect();
        xt.x === 0 && xt.y === 0 && xt.width === 0 && xt.height === 0 && ue.close();
      }
    });
    te.observe(N), F(() => te.disconnect());
  }), () => {
    let { open: F, initialFocus: N, ...te } = e, re = { ...r, ref: f, id: l, role: c.value, "aria-modal": h.value === 0 ? !0 : void 0, "aria-labelledby": H.value, "aria-describedby": k.value }, Zt = { open: h.value === 0 };
    return _(Er, { force: !0 }, () => [_(So, () => _(Ai, { target: f.value }, () => _(Er, { force: !1 }, () => _(nt, { initialFocus: N, containers: T, features: b.value ? me(q.value, { parent: nt.features.RestoreFocus, leaf: nt.features.All & ~nt.features.FocusLock }) : nt.features.None }, () => _(O, {}, () => ee({ ourProps: re, theirProps: { ...te, ...r }, slot: Zt, attrs: r, slots: n, visible: h.value === 0, features: Bt.RenderStrategy | Bt.Static, name: "Dialog" })))))), _($)]);
  };
} });
J({ name: "DialogOverlay", props: { as: { type: [Object, String], default: "div" }, id: { type: String, default: null } }, setup(e, { attrs: t, slots: r }) {
  var n;
  let o = (n = e.id) != null ? n : `headlessui-dialog-overlay-${Ue()}`, a = ht("DialogOverlay");
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
  let a = (o = e.id) != null ? o : `headlessui-dialog-backdrop-${Ue()}`, i = ht("DialogBackdrop"), l = x(null);
  return n({ el: l, $el: l }), j(() => {
    if (i.panelRef.value === null) throw new Error("A <DialogBackdrop /> component is being used, but a <DialogPanel /> component is missing.");
  }), () => {
    let { ...s } = e, u = { id: a, ref: l, "aria-hidden": !0 };
    return _(Er, { force: !0 }, () => _(So, () => ee({ ourProps: u, theirProps: { ...t, ...s }, slot: { open: i.dialogState.value === 0 }, attrs: t, slots: r, name: "DialogBackdrop" })));
  };
} });
let xo = J({ name: "DialogPanel", props: { as: { type: [Object, String], default: "div" }, id: { type: String, default: null } }, setup(e, { attrs: t, slots: r, expose: n }) {
  var o;
  let a = (o = e.id) != null ? o : `headlessui-dialog-panel-${Ue()}`, i = ht("DialogPanel");
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
  let o = (n = e.id) != null ? n : `headlessui-dialog-title-${Ue()}`, a = ht("DialogTitle");
  return j(() => {
    a.setTitleId(o), ie(() => a.setTitleId(null));
  }), () => {
    let { ...i } = e;
    return ee({ ourProps: { id: o }, theirProps: i, slot: { open: a.dialogState.value === 0 }, attrs: t, slots: r, name: "DialogTitle" });
  };
} });
function Ri(e) {
  let t = { called: !1 };
  return (...r) => {
    if (!t.called) return t.called = !0, e(...r);
  };
}
function rr(e, ...t) {
  e && t.length > 0 && e.classList.add(...t);
}
function Tt(e, ...t) {
  e && t.length > 0 && e.classList.remove(...t);
}
var Tr = ((e) => (e.Finished = "finished", e.Cancelled = "cancelled", e))(Tr || {});
function Ci(e, t) {
  let r = mt();
  if (!e) return r.dispose;
  let { transitionDuration: n, transitionDelay: o } = getComputedStyle(e), [a, i] = [n, o].map((l) => {
    let [s = 0] = l.split(",").filter(Boolean).map((u) => u.includes("ms") ? parseFloat(u) : parseFloat(u) * 1e3).sort((u, c) => c - u);
    return s;
  });
  return a !== 0 ? r.setTimeout(() => t("finished"), a + i) : t("finished"), r.add(() => t("cancelled")), r.dispose;
}
function mn(e, t, r, n, o, a) {
  let i = mt(), l = a !== void 0 ? Ri(a) : () => {
  };
  return Tt(e, ...o), rr(e, ...t, ...r), i.nextFrame(() => {
    Tt(e, ...r), rr(e, ...n), i.add(Ci(e, (s) => (Tt(e, ...n, ...t), rr(e, ...o), l(s))));
  }), i.add(() => Tt(e, ...t, ...r, ...n, ...o)), i.add(() => l("cancelled")), i.dispose;
}
function Oe(e = "") {
  return e.split(/\s+/).filter((t) => t.length > 1);
}
let Vr = Symbol("TransitionContext");
var Fi = ((e) => (e.Visible = "visible", e.Hidden = "hidden", e))(Fi || {});
function $i() {
  return Z(Vr, null) !== null;
}
function Di() {
  let e = Z(Vr, null);
  if (e === null) throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  return e;
}
function Li() {
  let e = Z(Gr, null);
  if (e === null) throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  return e;
}
let Gr = Symbol("NestingContext");
function Vt(e) {
  return "children" in e ? Vt(e.children) : e.value.filter(({ state: t }) => t === "visible").length > 0;
}
function Oo(e) {
  let t = x([]), r = x(!1);
  j(() => r.value = !0), ie(() => r.value = !1);
  function n(a, i = we.Hidden) {
    let l = t.value.findIndex(({ id: s }) => s === a);
    l !== -1 && (me(i, { [we.Unmount]() {
      t.value.splice(l, 1);
    }, [we.Hidden]() {
      t.value[l].state = "hidden";
    } }), !Vt(t) && r.value && (e == null || e()));
  }
  function o(a) {
    let i = t.value.find(({ id: l }) => l === a);
    return i ? i.state !== "visible" && (i.state = "visible") : t.value.push({ id: a, state: "visible" }), () => n(a, we.Unmount);
  }
  return { children: t, register: o, unregister: n };
}
let Ao = Bt.RenderStrategy, Gt = J({ props: { as: { type: [Object, String], default: "div" }, show: { type: [Boolean], default: null }, unmount: { type: [Boolean], default: !0 }, appear: { type: [Boolean], default: !1 }, enter: { type: [String], default: "" }, enterFrom: { type: [String], default: "" }, enterTo: { type: [String], default: "" }, entered: { type: [String], default: "" }, leave: { type: [String], default: "" }, leaveFrom: { type: [String], default: "" }, leaveTo: { type: [String], default: "" } }, emits: { beforeEnter: () => !0, afterEnter: () => !0, beforeLeave: () => !0, afterLeave: () => !0 }, setup(e, { emit: t, attrs: r, slots: n, expose: o }) {
  let a = x(0);
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
  if (!$i() && ti()) return () => _(Po, { ...e, onBeforeEnter: i, onAfterEnter: l, onBeforeLeave: s, onAfterLeave: u }, n);
  let c = x(null), y = P(() => e.unmount ? we.Unmount : we.Hidden);
  o({ el: c, $el: c });
  let { show: d, appear: v } = Di(), { register: f, unregister: p } = Li(), h = x(d.value ? "visible" : "hidden"), b = { value: !0 }, w = Ue(), g = { value: !1 }, S = Oo(() => {
    !g.value && h.value !== "hidden" && (h.value = "hidden", p(w), u());
  });
  j(() => {
    let D = f(w);
    ie(D);
  }), ae(() => {
    if (y.value === we.Hidden && w) {
      if (d.value && h.value !== "visible") {
        h.value = "visible";
        return;
      }
      me(h.value, { hidden: () => p(w), visible: () => f(w) });
    }
  });
  let O = Oe(e.enter), T = Oe(e.enterFrom), C = Oe(e.enterTo), $ = Oe(e.entered), q = Oe(e.leave), Q = Oe(e.leaveFrom), he = Oe(e.leaveTo);
  j(() => {
    ae(() => {
      if (h.value === "visible") {
        let D = B(c);
        if (D instanceof Comment && D.data === "") throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
      }
    });
  });
  function se(D) {
    let z = b.value && !v.value, k = B(c);
    !k || !(k instanceof HTMLElement) || z || (g.value = !0, d.value && i(), d.value || s(), D(d.value ? mn(k, O, T, C, $, (H) => {
      g.value = !1, H === Tr.Finished && l();
    }) : mn(k, q, Q, he, $, (H) => {
      g.value = !1, H === Tr.Finished && (Vt(S) || (h.value = "hidden", p(w), u()));
    })));
  }
  return j(() => {
    Ee([d], (D, z, k) => {
      se(k), b.value = !1;
    }, { immediate: !0 });
  }), ne(Gr, S), ri(P(() => me(h.value, { visible: X.Open, hidden: X.Closed }) | a.value)), () => {
    let { appear: D, show: z, enter: k, enterFrom: H, enterTo: ue, entered: Et, leave: rt, leaveFrom: _e, leaveTo: F, ...N } = e, te = { ref: c }, re = { ...N, ...v.value && d.value && yt.isServer ? { class: Fe([r.class, N.class, ...O, ...T]) } : {} };
    return ee({ theirProps: re, ourProps: te, slot: {}, slots: n, attrs: r, features: Ao, visible: h.value === "visible", name: "TransitionChild" });
  };
} }), Ni = Gt, Po = J({ inheritAttrs: !1, props: { as: { type: [Object, String], default: "div" }, show: { type: [Boolean], default: null }, unmount: { type: [Boolean], default: !0 }, appear: { type: [Boolean], default: !1 }, enter: { type: [String], default: "" }, enterFrom: { type: [String], default: "" }, enterTo: { type: [String], default: "" }, entered: { type: [String], default: "" }, leave: { type: [String], default: "" }, leaveFrom: { type: [String], default: "" }, leaveTo: { type: [String], default: "" } }, emits: { beforeEnter: () => !0, afterEnter: () => !0, beforeLeave: () => !0, afterLeave: () => !0 }, setup(e, { emit: t, attrs: r, slots: n }) {
  let o = zr(), a = P(() => e.show === null && o !== null ? (o.value & X.Open) === X.Open : e.show);
  ae(() => {
    if (![!0, !1].includes(a.value)) throw new Error('A <Transition /> is used but it is missing a `:show="true | false"` prop.');
  });
  let i = x(a.value ? "visible" : "hidden"), l = Oo(() => {
    i.value = "hidden";
  }), s = x(!0), u = { show: a, appear: P(() => e.appear || !s.value) };
  return j(() => {
    ae(() => {
      s.value = !1, a.value ? i.value = "visible" : Vt(l) || (i.value = "hidden");
    });
  }), ne(Gr, l), ne(Vr, u), () => {
    let c = co(e, ["show", "appear", "unmount", "onBeforeEnter", "onBeforeLeave", "onAfterEnter", "onAfterLeave"]), y = { unmount: e.unmount };
    return ee({ ourProps: { ...y, as: "template" }, theirProps: {}, slot: {}, slots: { ...n, default: () => [_(Ni, { onBeforeEnter: () => t("beforeEnter"), onAfterEnter: () => t("afterEnter"), onBeforeLeave: () => t("beforeLeave"), onAfterLeave: () => t("afterLeave"), ...r, ...y, ...c }, n.default)] }, attrs: {}, features: Ao, visible: i.value === "visible", name: "Transition" });
  };
} });
function To(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Mi } = Object.prototype, { getPrototypeOf: Kr } = Object, Kt = /* @__PURE__ */ ((e) => (t) => {
  const r = Mi.call(t);
  return e[r] || (e[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), le = (e) => (e = e.toLowerCase(), (t) => Kt(t) === e), Jt = (e) => (t) => typeof t === e, { isArray: Ye } = Array, ft = Jt("undefined");
function Bi(e) {
  return e !== null && !ft(e) && e.constructor !== null && !ft(e.constructor) && Y(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Ro = le("ArrayBuffer");
function Ii(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Ro(e.buffer), t;
}
const ki = Jt("string"), Y = Jt("function"), Co = Jt("number"), Qt = (e) => e !== null && typeof e == "object", Ui = (e) => e === !0 || e === !1, Dt = (e) => {
  if (Kt(e) !== "object")
    return !1;
  const t = Kr(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, _i = le("Date"), ji = le("File"), Wi = le("Blob"), Hi = le("FileList"), qi = (e) => Qt(e) && Y(e.pipe), zi = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || Y(e.append) && ((t = Kt(e)) === "formdata" || // detect form-data instance
  t === "object" && Y(e.toString) && e.toString() === "[object FormData]"));
}, Vi = le("URLSearchParams"), [Gi, Ki, Ji, Qi] = ["ReadableStream", "Request", "Response", "Headers"].map(le), Xi = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function vt(e, t, { allOwnKeys: r = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let n, o;
  if (typeof e != "object" && (e = [e]), Ye(e))
    for (n = 0, o = e.length; n < o; n++)
      t.call(null, e[n], n, e);
  else {
    const a = r ? Object.getOwnPropertyNames(e) : Object.keys(e), i = a.length;
    let l;
    for (n = 0; n < i; n++)
      l = a[n], t.call(null, e[l], l, e);
  }
}
function Fo(e, t) {
  t = t.toLowerCase();
  const r = Object.keys(e);
  let n = r.length, o;
  for (; n-- > 0; )
    if (o = r[n], t === o.toLowerCase())
      return o;
  return null;
}
const Ce = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, $o = (e) => !ft(e) && e !== Ce;
function Rr() {
  const { caseless: e } = $o(this) && this || {}, t = {}, r = (n, o) => {
    const a = e && Fo(t, o) || o;
    Dt(t[a]) && Dt(n) ? t[a] = Rr(t[a], n) : Dt(n) ? t[a] = Rr({}, n) : Ye(n) ? t[a] = n.slice() : t[a] = n;
  };
  for (let n = 0, o = arguments.length; n < o; n++)
    arguments[n] && vt(arguments[n], r);
  return t;
}
const Yi = (e, t, r, { allOwnKeys: n } = {}) => (vt(t, (o, a) => {
  r && Y(o) ? e[a] = To(o, r) : e[a] = o;
}, { allOwnKeys: n }), e), Zi = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), el = (e, t, r, n) => {
  e.prototype = Object.create(t.prototype, n), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), r && Object.assign(e.prototype, r);
}, tl = (e, t, r, n) => {
  let o, a, i;
  const l = {};
  if (t = t || {}, e == null) return t;
  do {
    for (o = Object.getOwnPropertyNames(e), a = o.length; a-- > 0; )
      i = o[a], (!n || n(i, e, t)) && !l[i] && (t[i] = e[i], l[i] = !0);
    e = r !== !1 && Kr(e);
  } while (e && (!r || r(e, t)) && e !== Object.prototype);
  return t;
}, rl = (e, t, r) => {
  e = String(e), (r === void 0 || r > e.length) && (r = e.length), r -= t.length;
  const n = e.indexOf(t, r);
  return n !== -1 && n === r;
}, nl = (e) => {
  if (!e) return null;
  if (Ye(e)) return e;
  let t = e.length;
  if (!Co(t)) return null;
  const r = new Array(t);
  for (; t-- > 0; )
    r[t] = e[t];
  return r;
}, ol = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Kr(Uint8Array)), al = (e, t) => {
  const n = (e && e[Symbol.iterator]).call(e);
  let o;
  for (; (o = n.next()) && !o.done; ) {
    const a = o.value;
    t.call(e, a[0], a[1]);
  }
}, il = (e, t) => {
  let r;
  const n = [];
  for (; (r = e.exec(t)) !== null; )
    n.push(r);
  return n;
}, ll = le("HTMLFormElement"), sl = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(r, n, o) {
    return n.toUpperCase() + o;
  }
), yn = (({ hasOwnProperty: e }) => (t, r) => e.call(t, r))(Object.prototype), ul = le("RegExp"), Do = (e, t) => {
  const r = Object.getOwnPropertyDescriptors(e), n = {};
  vt(r, (o, a) => {
    let i;
    (i = t(o, a, e)) !== !1 && (n[a] = i || o);
  }), Object.defineProperties(e, n);
}, cl = (e) => {
  Do(e, (t, r) => {
    if (Y(e) && ["arguments", "caller", "callee"].indexOf(r) !== -1)
      return !1;
    const n = e[r];
    if (Y(n)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + r + "'");
      });
    }
  });
}, fl = (e, t) => {
  const r = {}, n = (o) => {
    o.forEach((a) => {
      r[a] = !0;
    });
  };
  return Ye(e) ? n(e) : n(String(e).split(t)), r;
}, dl = () => {
}, pl = (e, t) => e != null && Number.isFinite(e = +e) ? e : t, nr = "abcdefghijklmnopqrstuvwxyz", hn = "0123456789", Lo = {
  DIGIT: hn,
  ALPHA: nr,
  ALPHA_DIGIT: nr + nr.toUpperCase() + hn
}, ml = (e = 16, t = Lo.ALPHA_DIGIT) => {
  let r = "";
  const { length: n } = t;
  for (; e--; )
    r += t[Math.random() * n | 0];
  return r;
};
function yl(e) {
  return !!(e && Y(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const hl = (e) => {
  const t = new Array(10), r = (n, o) => {
    if (Qt(n)) {
      if (t.indexOf(n) >= 0)
        return;
      if (!("toJSON" in n)) {
        t[o] = n;
        const a = Ye(n) ? [] : {};
        return vt(n, (i, l) => {
          const s = r(i, o + 1);
          !ft(s) && (a[l] = s);
        }), t[o] = void 0, a;
      }
    }
    return n;
  };
  return r(e, 0);
}, vl = le("AsyncFunction"), gl = (e) => e && (Qt(e) || Y(e)) && Y(e.then) && Y(e.catch), No = ((e, t) => e ? setImmediate : t ? ((r, n) => (Ce.addEventListener("message", ({ source: o, data: a }) => {
  o === Ce && a === r && n.length && n.shift()();
}, !1), (o) => {
  n.push(o), Ce.postMessage(r, "*");
}))(`axios@${Math.random()}`, []) : (r) => setTimeout(r))(
  typeof setImmediate == "function",
  Y(Ce.postMessage)
), bl = typeof queueMicrotask < "u" ? queueMicrotask.bind(Ce) : typeof process < "u" && process.nextTick || No, m = {
  isArray: Ye,
  isArrayBuffer: Ro,
  isBuffer: Bi,
  isFormData: zi,
  isArrayBufferView: Ii,
  isString: ki,
  isNumber: Co,
  isBoolean: Ui,
  isObject: Qt,
  isPlainObject: Dt,
  isReadableStream: Gi,
  isRequest: Ki,
  isResponse: Ji,
  isHeaders: Qi,
  isUndefined: ft,
  isDate: _i,
  isFile: ji,
  isBlob: Wi,
  isRegExp: ul,
  isFunction: Y,
  isStream: qi,
  isURLSearchParams: Vi,
  isTypedArray: ol,
  isFileList: Hi,
  forEach: vt,
  merge: Rr,
  extend: Yi,
  trim: Xi,
  stripBOM: Zi,
  inherits: el,
  toFlatObject: tl,
  kindOf: Kt,
  kindOfTest: le,
  endsWith: rl,
  toArray: nl,
  forEachEntry: al,
  matchAll: il,
  isHTMLForm: ll,
  hasOwnProperty: yn,
  hasOwnProp: yn,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Do,
  freezeMethods: cl,
  toObjectSet: fl,
  toCamelCase: sl,
  noop: dl,
  toFiniteNumber: pl,
  findKey: Fo,
  global: Ce,
  isContextDefined: $o,
  ALPHABET: Lo,
  generateString: ml,
  isSpecCompliantForm: yl,
  toJSONObject: hl,
  isAsyncFn: vl,
  isThenable: gl,
  setImmediate: No,
  asap: bl
};
function E(e, t, r, n, o) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), r && (this.config = r), n && (this.request = n), o && (this.response = o, this.status = o.status ? o.status : null);
}
m.inherits(E, Error, {
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
      config: m.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const Mo = E.prototype, Bo = {};
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
  Bo[e] = { value: e };
});
Object.defineProperties(E, Bo);
Object.defineProperty(Mo, "isAxiosError", { value: !0 });
E.from = (e, t, r, n, o, a) => {
  const i = Object.create(Mo);
  return m.toFlatObject(e, i, function(s) {
    return s !== Error.prototype;
  }, (l) => l !== "isAxiosError"), E.call(i, e.message, t, r, n, o), i.cause = e, i.name = e.name, a && Object.assign(i, a), i;
};
const wl = null;
function Cr(e) {
  return m.isPlainObject(e) || m.isArray(e);
}
function Io(e) {
  return m.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function vn(e, t, r) {
  return e ? e.concat(t).map(function(o, a) {
    return o = Io(o), !r && a ? "[" + o + "]" : o;
  }).join(r ? "." : "") : t;
}
function Sl(e) {
  return m.isArray(e) && !e.some(Cr);
}
const El = m.toFlatObject(m, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function Xt(e, t, r) {
  if (!m.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), r = m.toFlatObject(r, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(p, h) {
    return !m.isUndefined(h[p]);
  });
  const n = r.metaTokens, o = r.visitor || c, a = r.dots, i = r.indexes, s = (r.Blob || typeof Blob < "u" && Blob) && m.isSpecCompliantForm(t);
  if (!m.isFunction(o))
    throw new TypeError("visitor must be a function");
  function u(f) {
    if (f === null) return "";
    if (m.isDate(f))
      return f.toISOString();
    if (!s && m.isBlob(f))
      throw new E("Blob is not supported. Use a Buffer instead.");
    return m.isArrayBuffer(f) || m.isTypedArray(f) ? s && typeof Blob == "function" ? new Blob([f]) : Buffer.from(f) : f;
  }
  function c(f, p, h) {
    let b = f;
    if (f && !h && typeof f == "object") {
      if (m.endsWith(p, "{}"))
        p = n ? p : p.slice(0, -2), f = JSON.stringify(f);
      else if (m.isArray(f) && Sl(f) || (m.isFileList(f) || m.endsWith(p, "[]")) && (b = m.toArray(f)))
        return p = Io(p), b.forEach(function(g, S) {
          !(m.isUndefined(g) || g === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            i === !0 ? vn([p], S, a) : i === null ? p : p + "[]",
            u(g)
          );
        }), !1;
    }
    return Cr(f) ? !0 : (t.append(vn(h, p, a), u(f)), !1);
  }
  const y = [], d = Object.assign(El, {
    defaultVisitor: c,
    convertValue: u,
    isVisitable: Cr
  });
  function v(f, p) {
    if (!m.isUndefined(f)) {
      if (y.indexOf(f) !== -1)
        throw Error("Circular reference detected in " + p.join("."));
      y.push(f), m.forEach(f, function(b, w) {
        (!(m.isUndefined(b) || b === null) && o.call(
          t,
          b,
          m.isString(w) ? w.trim() : w,
          p,
          d
        )) === !0 && v(b, p ? p.concat(w) : [w]);
      }), y.pop();
    }
  }
  if (!m.isObject(e))
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
function Jr(e, t) {
  this._pairs = [], e && Xt(e, this, t);
}
const ko = Jr.prototype;
ko.append = function(t, r) {
  this._pairs.push([t, r]);
};
ko.toString = function(t) {
  const r = t ? function(n) {
    return t.call(this, n, gn);
  } : gn;
  return this._pairs.map(function(o) {
    return r(o[0]) + "=" + r(o[1]);
  }, "").join("&");
};
function xl(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Uo(e, t, r) {
  if (!t)
    return e;
  const n = r && r.encode || xl, o = r && r.serialize;
  let a;
  if (o ? a = o(t, r) : a = m.isURLSearchParams(t) ? t.toString() : new Jr(t, r).toString(n), a) {
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
    m.forEach(this.handlers, function(n) {
      n !== null && t(n);
    });
  }
}
const _o = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Ol = typeof URLSearchParams < "u" ? URLSearchParams : Jr, Al = typeof FormData < "u" ? FormData : null, Pl = typeof Blob < "u" ? Blob : null, Tl = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Ol,
    FormData: Al,
    Blob: Pl
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, Qr = typeof window < "u" && typeof document < "u", Fr = typeof navigator == "object" && navigator || void 0, Rl = Qr && (!Fr || ["ReactNative", "NativeScript", "NS"].indexOf(Fr.product) < 0), Cl = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Fl = Qr && window.location.href || "http://localhost", $l = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: Qr,
  hasStandardBrowserEnv: Rl,
  hasStandardBrowserWebWorkerEnv: Cl,
  navigator: Fr,
  origin: Fl
}, Symbol.toStringTag, { value: "Module" })), G = {
  ...$l,
  ...Tl
};
function Dl(e, t) {
  return Xt(e, new G.classes.URLSearchParams(), Object.assign({
    visitor: function(r, n, o, a) {
      return G.isNode && m.isBuffer(r) ? (this.append(n, r.toString("base64")), !1) : a.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function Ll(e) {
  return m.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function Nl(e) {
  const t = {}, r = Object.keys(e);
  let n;
  const o = r.length;
  let a;
  for (n = 0; n < o; n++)
    a = r[n], t[a] = e[a];
  return t;
}
function jo(e) {
  function t(r, n, o, a) {
    let i = r[a++];
    if (i === "__proto__") return !0;
    const l = Number.isFinite(+i), s = a >= r.length;
    return i = !i && m.isArray(o) ? o.length : i, s ? (m.hasOwnProp(o, i) ? o[i] = [o[i], n] : o[i] = n, !l) : ((!o[i] || !m.isObject(o[i])) && (o[i] = []), t(r, n, o[i], a) && m.isArray(o[i]) && (o[i] = Nl(o[i])), !l);
  }
  if (m.isFormData(e) && m.isFunction(e.entries)) {
    const r = {};
    return m.forEachEntry(e, (n, o) => {
      t(Ll(n), o, r, 0);
    }), r;
  }
  return null;
}
function Ml(e, t, r) {
  if (m.isString(e))
    try {
      return (t || JSON.parse)(e), m.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (0, JSON.stringify)(e);
}
const gt = {
  transitional: _o,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, r) {
    const n = r.getContentType() || "", o = n.indexOf("application/json") > -1, a = m.isObject(t);
    if (a && m.isHTMLForm(t) && (t = new FormData(t)), m.isFormData(t))
      return o ? JSON.stringify(jo(t)) : t;
    if (m.isArrayBuffer(t) || m.isBuffer(t) || m.isStream(t) || m.isFile(t) || m.isBlob(t) || m.isReadableStream(t))
      return t;
    if (m.isArrayBufferView(t))
      return t.buffer;
    if (m.isURLSearchParams(t))
      return r.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let l;
    if (a) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return Dl(t, this.formSerializer).toString();
      if ((l = m.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
        const s = this.env && this.env.FormData;
        return Xt(
          l ? { "files[]": t } : t,
          s && new s(),
          this.formSerializer
        );
      }
    }
    return a || o ? (r.setContentType("application/json", !1), Ml(t)) : t;
  }],
  transformResponse: [function(t) {
    const r = this.transitional || gt.transitional, n = r && r.forcedJSONParsing, o = this.responseType === "json";
    if (m.isResponse(t) || m.isReadableStream(t))
      return t;
    if (t && m.isString(t) && (n && !this.responseType || o)) {
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
    FormData: G.classes.FormData,
    Blob: G.classes.Blob
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
m.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  gt.headers[e] = {};
});
const Bl = m.toObjectSet([
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
]), Il = (e) => {
  const t = {};
  let r, n, o;
  return e && e.split(`
`).forEach(function(i) {
    o = i.indexOf(":"), r = i.substring(0, o).trim().toLowerCase(), n = i.substring(o + 1).trim(), !(!r || t[r] && Bl[r]) && (r === "set-cookie" ? t[r] ? t[r].push(n) : t[r] = [n] : t[r] = t[r] ? t[r] + ", " + n : n);
  }), t;
}, wn = Symbol("internals");
function at(e) {
  return e && String(e).trim().toLowerCase();
}
function Lt(e) {
  return e === !1 || e == null ? e : m.isArray(e) ? e.map(Lt) : String(e);
}
function kl(e) {
  const t = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(e); )
    t[n[1]] = n[2];
  return t;
}
const Ul = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function or(e, t, r, n, o) {
  if (m.isFunction(n))
    return n.call(this, t, r);
  if (o && (t = r), !!m.isString(t)) {
    if (m.isString(n))
      return t.indexOf(n) !== -1;
    if (m.isRegExp(n))
      return n.test(t);
  }
}
function _l(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, r, n) => r.toUpperCase() + n);
}
function jl(e, t) {
  const r = m.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(e, n + r, {
      value: function(o, a, i) {
        return this[n].call(this, t, o, a, i);
      },
      configurable: !0
    });
  });
}
class K {
  constructor(t) {
    t && this.set(t);
  }
  set(t, r, n) {
    const o = this;
    function a(l, s, u) {
      const c = at(s);
      if (!c)
        throw new Error("header name must be a non-empty string");
      const y = m.findKey(o, c);
      (!y || o[y] === void 0 || u === !0 || u === void 0 && o[y] !== !1) && (o[y || s] = Lt(l));
    }
    const i = (l, s) => m.forEach(l, (u, c) => a(u, c, s));
    if (m.isPlainObject(t) || t instanceof this.constructor)
      i(t, r);
    else if (m.isString(t) && (t = t.trim()) && !Ul(t))
      i(Il(t), r);
    else if (m.isHeaders(t))
      for (const [l, s] of t.entries())
        a(s, l, n);
    else
      t != null && a(r, t, n);
    return this;
  }
  get(t, r) {
    if (t = at(t), t) {
      const n = m.findKey(this, t);
      if (n) {
        const o = this[n];
        if (!r)
          return o;
        if (r === !0)
          return kl(o);
        if (m.isFunction(r))
          return r.call(this, o, n);
        if (m.isRegExp(r))
          return r.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, r) {
    if (t = at(t), t) {
      const n = m.findKey(this, t);
      return !!(n && this[n] !== void 0 && (!r || or(this, this[n], n, r)));
    }
    return !1;
  }
  delete(t, r) {
    const n = this;
    let o = !1;
    function a(i) {
      if (i = at(i), i) {
        const l = m.findKey(n, i);
        l && (!r || or(n, n[l], l, r)) && (delete n[l], o = !0);
      }
    }
    return m.isArray(t) ? t.forEach(a) : a(t), o;
  }
  clear(t) {
    const r = Object.keys(this);
    let n = r.length, o = !1;
    for (; n--; ) {
      const a = r[n];
      (!t || or(this, this[a], a, t, !0)) && (delete this[a], o = !0);
    }
    return o;
  }
  normalize(t) {
    const r = this, n = {};
    return m.forEach(this, (o, a) => {
      const i = m.findKey(n, a);
      if (i) {
        r[i] = Lt(o), delete r[a];
        return;
      }
      const l = t ? _l(a) : String(a).trim();
      l !== a && delete r[a], r[l] = Lt(o), n[l] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const r = /* @__PURE__ */ Object.create(null);
    return m.forEach(this, (n, o) => {
      n != null && n !== !1 && (r[o] = t && m.isArray(n) ? n.join(", ") : n);
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
      const l = at(i);
      n[l] || (jl(o, i), n[l] = !0);
    }
    return m.isArray(t) ? t.forEach(a) : a(t), this;
  }
}
K.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
m.reduceDescriptors(K.prototype, ({ value: e }, t) => {
  let r = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(n) {
      this[r] = n;
    }
  };
});
m.freezeMethods(K);
function ar(e, t) {
  const r = this || gt, n = t || r, o = K.from(n.headers);
  let a = n.data;
  return m.forEach(e, function(l) {
    a = l.call(r, a, o.normalize(), t ? t.status : void 0);
  }), o.normalize(), a;
}
function Wo(e) {
  return !!(e && e.__CANCEL__);
}
function Ze(e, t, r) {
  E.call(this, e ?? "canceled", E.ERR_CANCELED, t, r), this.name = "CanceledError";
}
m.inherits(Ze, E, {
  __CANCEL__: !0
});
function Ho(e, t, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? e(r) : t(new E(
    "Request failed with status code " + r.status,
    [E.ERR_BAD_REQUEST, E.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
    r.config,
    r.request,
    r
  ));
}
function Wl(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function Hl(e, t) {
  e = e || 10;
  const r = new Array(e), n = new Array(e);
  let o = 0, a = 0, i;
  return t = t !== void 0 ? t : 1e3, function(s) {
    const u = Date.now(), c = n[a];
    i || (i = u), r[o] = s, n[o] = u;
    let y = a, d = 0;
    for (; y !== o; )
      d += r[y++], y = y % e;
    if (o = (o + 1) % e, o === a && (a = (a + 1) % e), u - i < t)
      return;
    const v = c && u - c;
    return v ? Math.round(d * 1e3 / v) : void 0;
  };
}
function ql(e, t) {
  let r = 0, n = 1e3 / t, o, a;
  const i = (u, c = Date.now()) => {
    r = c, o = null, a && (clearTimeout(a), a = null), e.apply(null, u);
  };
  return [(...u) => {
    const c = Date.now(), y = c - r;
    y >= n ? i(u, c) : (o = u, a || (a = setTimeout(() => {
      a = null, i(o);
    }, n - y)));
  }, () => o && i(o)];
}
const kt = (e, t, r = 3) => {
  let n = 0;
  const o = Hl(50, 250);
  return ql((a) => {
    const i = a.loaded, l = a.lengthComputable ? a.total : void 0, s = i - n, u = o(s), c = i <= l;
    n = i;
    const y = {
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
    e(y);
  }, r);
}, Sn = (e, t) => {
  const r = e != null;
  return [(n) => t[0]({
    lengthComputable: r,
    total: e,
    loaded: n
  }), t[1]];
}, En = (e) => (...t) => m.asap(() => e(...t)), zl = G.hasStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const t = G.navigator && /(msie|trident)/i.test(G.navigator.userAgent), r = document.createElement("a");
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
      const l = m.isString(i) ? o(i) : i;
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
), Vl = G.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, r, n, o, a) {
      const i = [e + "=" + encodeURIComponent(t)];
      m.isNumber(r) && i.push("expires=" + new Date(r).toGMTString()), m.isString(n) && i.push("path=" + n), m.isString(o) && i.push("domain=" + o), a === !0 && i.push("secure"), document.cookie = i.join("; ");
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
function Gl(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Kl(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function qo(e, t) {
  return e && !Gl(t) ? Kl(e, t) : t;
}
const xn = (e) => e instanceof K ? { ...e } : e;
function ke(e, t) {
  t = t || {};
  const r = {};
  function n(u, c, y) {
    return m.isPlainObject(u) && m.isPlainObject(c) ? m.merge.call({ caseless: y }, u, c) : m.isPlainObject(c) ? m.merge({}, c) : m.isArray(c) ? c.slice() : c;
  }
  function o(u, c, y) {
    if (m.isUndefined(c)) {
      if (!m.isUndefined(u))
        return n(void 0, u, y);
    } else return n(u, c, y);
  }
  function a(u, c) {
    if (!m.isUndefined(c))
      return n(void 0, c);
  }
  function i(u, c) {
    if (m.isUndefined(c)) {
      if (!m.isUndefined(u))
        return n(void 0, u);
    } else return n(void 0, c);
  }
  function l(u, c, y) {
    if (y in t)
      return n(u, c);
    if (y in e)
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
  return m.forEach(Object.keys(Object.assign({}, e, t)), function(c) {
    const y = s[c] || o, d = y(e[c], t[c], c);
    m.isUndefined(d) && y !== l || (r[c] = d);
  }), r;
}
const zo = (e) => {
  const t = ke({}, e);
  let { data: r, withXSRFToken: n, xsrfHeaderName: o, xsrfCookieName: a, headers: i, auth: l } = t;
  t.headers = i = K.from(i), t.url = Uo(qo(t.baseURL, t.url), e.params, e.paramsSerializer), l && i.set(
    "Authorization",
    "Basic " + btoa((l.username || "") + ":" + (l.password ? unescape(encodeURIComponent(l.password)) : ""))
  );
  let s;
  if (m.isFormData(r)) {
    if (G.hasStandardBrowserEnv || G.hasStandardBrowserWebWorkerEnv)
      i.setContentType(void 0);
    else if ((s = i.getContentType()) !== !1) {
      const [u, ...c] = s ? s.split(";").map((y) => y.trim()).filter(Boolean) : [];
      i.setContentType([u || "multipart/form-data", ...c].join("; "));
    }
  }
  if (G.hasStandardBrowserEnv && (n && m.isFunction(n) && (n = n(t)), n || n !== !1 && zl(t.url))) {
    const u = o && a && Vl.read(a);
    u && i.set(o, u);
  }
  return t;
}, Jl = typeof XMLHttpRequest < "u", Ql = Jl && function(e) {
  return new Promise(function(r, n) {
    const o = zo(e);
    let a = o.data;
    const i = K.from(o.headers).normalize();
    let { responseType: l, onUploadProgress: s, onDownloadProgress: u } = o, c, y, d, v, f;
    function p() {
      v && v(), f && f(), o.cancelToken && o.cancelToken.unsubscribe(c), o.signal && o.signal.removeEventListener("abort", c);
    }
    let h = new XMLHttpRequest();
    h.open(o.method.toUpperCase(), o.url, !0), h.timeout = o.timeout;
    function b() {
      if (!h)
        return;
      const g = K.from(
        "getAllResponseHeaders" in h && h.getAllResponseHeaders()
      ), O = {
        data: !l || l === "text" || l === "json" ? h.responseText : h.response,
        status: h.status,
        statusText: h.statusText,
        headers: g,
        config: e,
        request: h
      };
      Ho(function(C) {
        r(C), p();
      }, function(C) {
        n(C), p();
      }, O), h = null;
    }
    "onloadend" in h ? h.onloadend = b : h.onreadystatechange = function() {
      !h || h.readyState !== 4 || h.status === 0 && !(h.responseURL && h.responseURL.indexOf("file:") === 0) || setTimeout(b);
    }, h.onabort = function() {
      h && (n(new E("Request aborted", E.ECONNABORTED, e, h)), h = null);
    }, h.onerror = function() {
      n(new E("Network Error", E.ERR_NETWORK, e, h)), h = null;
    }, h.ontimeout = function() {
      let S = o.timeout ? "timeout of " + o.timeout + "ms exceeded" : "timeout exceeded";
      const O = o.transitional || _o;
      o.timeoutErrorMessage && (S = o.timeoutErrorMessage), n(new E(
        S,
        O.clarifyTimeoutError ? E.ETIMEDOUT : E.ECONNABORTED,
        e,
        h
      )), h = null;
    }, a === void 0 && i.setContentType(null), "setRequestHeader" in h && m.forEach(i.toJSON(), function(S, O) {
      h.setRequestHeader(O, S);
    }), m.isUndefined(o.withCredentials) || (h.withCredentials = !!o.withCredentials), l && l !== "json" && (h.responseType = o.responseType), u && ([d, f] = kt(u, !0), h.addEventListener("progress", d)), s && h.upload && ([y, v] = kt(s), h.upload.addEventListener("progress", y), h.upload.addEventListener("loadend", v)), (o.cancelToken || o.signal) && (c = (g) => {
      h && (n(!g || g.type ? new Ze(null, e, h) : g), h.abort(), h = null);
    }, o.cancelToken && o.cancelToken.subscribe(c), o.signal && (o.signal.aborted ? c() : o.signal.addEventListener("abort", c)));
    const w = Wl(o.url);
    if (w && G.protocols.indexOf(w) === -1) {
      n(new E("Unsupported protocol " + w + ":", E.ERR_BAD_REQUEST, e));
      return;
    }
    h.send(a || null);
  });
}, Xl = (e, t) => {
  const { length: r } = e = e ? e.filter(Boolean) : [];
  if (t || r) {
    let n = new AbortController(), o;
    const a = function(u) {
      if (!o) {
        o = !0, l();
        const c = u instanceof Error ? u : this.reason;
        n.abort(c instanceof E ? c : new Ze(c instanceof Error ? c.message : c));
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
    return s.unsubscribe = () => m.asap(l), s;
  }
}, Yl = function* (e, t) {
  let r = e.byteLength;
  if (r < t) {
    yield e;
    return;
  }
  let n = 0, o;
  for (; n < r; )
    o = n + t, yield e.slice(n, o), n = o;
}, Zl = async function* (e, t) {
  for await (const r of es(e))
    yield* Yl(r, t);
}, es = async function* (e) {
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
  const o = Zl(e, t);
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
        let y = c.byteLength;
        if (r) {
          let d = a += y;
          r(d);
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
}, Yt = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", Vo = Yt && typeof ReadableStream == "function", ts = Yt && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((e) => (t) => e.encode(t))(new TextEncoder()) : async (e) => new Uint8Array(await new Response(e).arrayBuffer())), Go = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, rs = Vo && Go(() => {
  let e = !1;
  const t = new Request(G.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return e = !0, "half";
    }
  }).headers.has("Content-Type");
  return e && !t;
}), An = 64 * 1024, $r = Vo && Go(() => m.isReadableStream(new Response("").body)), Ut = {
  stream: $r && ((e) => e.body)
};
Yt && ((e) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
    !Ut[t] && (Ut[t] = m.isFunction(e[t]) ? (r) => r[t]() : (r, n) => {
      throw new E(`Response type '${t}' is not supported`, E.ERR_NOT_SUPPORT, n);
    });
  });
})(new Response());
const ns = async (e) => {
  if (e == null)
    return 0;
  if (m.isBlob(e))
    return e.size;
  if (m.isSpecCompliantForm(e))
    return (await new Request(G.origin, {
      method: "POST",
      body: e
    }).arrayBuffer()).byteLength;
  if (m.isArrayBufferView(e) || m.isArrayBuffer(e))
    return e.byteLength;
  if (m.isURLSearchParams(e) && (e = e + ""), m.isString(e))
    return (await ts(e)).byteLength;
}, os = async (e, t) => {
  const r = m.toFiniteNumber(e.getContentLength());
  return r ?? ns(t);
}, as = Yt && (async (e) => {
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
    withCredentials: y = "same-origin",
    fetchOptions: d
  } = zo(e);
  u = u ? (u + "").toLowerCase() : "text";
  let v = Xl([o, a && a.toAbortSignal()], i), f;
  const p = v && v.unsubscribe && (() => {
    v.unsubscribe();
  });
  let h;
  try {
    if (s && rs && r !== "get" && r !== "head" && (h = await os(c, n)) !== 0) {
      let O = new Request(t, {
        method: "POST",
        body: n,
        duplex: "half"
      }), T;
      if (m.isFormData(n) && (T = O.headers.get("content-type")) && c.setContentType(T), O.body) {
        const [C, $] = Sn(
          h,
          kt(En(s))
        );
        n = On(O.body, An, C, $);
      }
    }
    m.isString(y) || (y = y ? "include" : "omit");
    const b = "credentials" in Request.prototype;
    f = new Request(t, {
      ...d,
      signal: v,
      method: r.toUpperCase(),
      headers: c.normalize().toJSON(),
      body: n,
      duplex: "half",
      credentials: b ? y : void 0
    });
    let w = await fetch(f);
    const g = $r && (u === "stream" || u === "response");
    if ($r && (l || g && p)) {
      const O = {};
      ["status", "statusText", "headers"].forEach((q) => {
        O[q] = w[q];
      });
      const T = m.toFiniteNumber(w.headers.get("content-length")), [C, $] = l && Sn(
        T,
        kt(En(l), !0)
      ) || [];
      w = new Response(
        On(w.body, An, C, () => {
          $ && $(), p && p();
        }),
        O
      );
    }
    u = u || "text";
    let S = await Ut[m.findKey(Ut, u) || "text"](w, e);
    return !g && p && p(), await new Promise((O, T) => {
      Ho(O, T, {
        data: S,
        headers: K.from(w.headers),
        status: w.status,
        statusText: w.statusText,
        config: e,
        request: f
      });
    });
  } catch (b) {
    throw p && p(), b && b.name === "TypeError" && /fetch/i.test(b.message) ? Object.assign(
      new E("Network Error", E.ERR_NETWORK, e, f),
      {
        cause: b.cause || b
      }
    ) : E.from(b, b && b.code, e, f);
  }
}), Dr = {
  http: wl,
  xhr: Ql,
  fetch: as
};
m.forEach(Dr, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Pn = (e) => `- ${e}`, is = (e) => m.isFunction(e) || e === null || e === !1, Ko = {
  getAdapter: (e) => {
    e = m.isArray(e) ? e : [e];
    const { length: t } = e;
    let r, n;
    const o = {};
    for (let a = 0; a < t; a++) {
      r = e[a];
      let i;
      if (n = r, !is(r) && (n = Dr[(i = String(r)).toLowerCase()], n === void 0))
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
  adapters: Dr
};
function ir(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Ze(null, e);
}
function Tn(e) {
  return ir(e), e.headers = K.from(e.headers), e.data = ar.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), Ko.getAdapter(e.adapter || gt.adapter)(e).then(function(n) {
    return ir(e), n.data = ar.call(
      e,
      e.transformResponse,
      n
    ), n.headers = K.from(n.headers), n;
  }, function(n) {
    return Wo(n) || (ir(e), n && n.response && (n.response.data = ar.call(
      e,
      e.transformResponse,
      n.response
    ), n.response.headers = K.from(n.response.headers))), Promise.reject(n);
  });
}
const Jo = "1.7.7", Xr = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  Xr[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Rn = {};
Xr.transitional = function(t, r, n) {
  function o(a, i) {
    return "[Axios v" + Jo + "] Transitional option '" + a + "'" + i + (n ? ". " + n : "");
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
function ls(e, t, r) {
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
const Lr = {
  assertOptions: ls,
  validators: Xr
}, ve = Lr.validators;
class Ne {
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
    typeof t == "string" ? (r = r || {}, r.url = t) : r = t || {}, r = ke(this.defaults, r);
    const { transitional: n, paramsSerializer: o, headers: a } = r;
    n !== void 0 && Lr.assertOptions(n, {
      silentJSONParsing: ve.transitional(ve.boolean),
      forcedJSONParsing: ve.transitional(ve.boolean),
      clarifyTimeoutError: ve.transitional(ve.boolean)
    }, !1), o != null && (m.isFunction(o) ? r.paramsSerializer = {
      serialize: o
    } : Lr.assertOptions(o, {
      encode: ve.function,
      serialize: ve.function
    }, !0)), r.method = (r.method || this.defaults.method || "get").toLowerCase();
    let i = a && m.merge(
      a.common,
      a[r.method]
    );
    a && m.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (f) => {
        delete a[f];
      }
    ), r.headers = K.concat(i, a);
    const l = [];
    let s = !0;
    this.interceptors.request.forEach(function(p) {
      typeof p.runWhen == "function" && p.runWhen(r) === !1 || (s = s && p.synchronous, l.unshift(p.fulfilled, p.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function(p) {
      u.push(p.fulfilled, p.rejected);
    });
    let c, y = 0, d;
    if (!s) {
      const f = [Tn.bind(this), void 0];
      for (f.unshift.apply(f, l), f.push.apply(f, u), d = f.length, c = Promise.resolve(r); y < d; )
        c = c.then(f[y++], f[y++]);
      return c;
    }
    d = l.length;
    let v = r;
    for (y = 0; y < d; ) {
      const f = l[y++], p = l[y++];
      try {
        v = f(v);
      } catch (h) {
        p.call(this, h);
        break;
      }
    }
    try {
      c = Tn.call(this, v);
    } catch (f) {
      return Promise.reject(f);
    }
    for (y = 0, d = u.length; y < d; )
      c = c.then(u[y++], u[y++]);
    return c;
  }
  getUri(t) {
    t = ke(this.defaults, t);
    const r = qo(t.baseURL, t.url);
    return Uo(r, t.params, t.paramsSerializer);
  }
}
m.forEach(["delete", "get", "head", "options"], function(t) {
  Ne.prototype[t] = function(r, n) {
    return this.request(ke(n || {}, {
      method: t,
      url: r,
      data: (n || {}).data
    }));
  };
});
m.forEach(["post", "put", "patch"], function(t) {
  function r(n) {
    return function(a, i, l) {
      return this.request(ke(l || {}, {
        method: t,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: a,
        data: i
      }));
    };
  }
  Ne.prototype[t] = r(), Ne.prototype[t + "Form"] = r(!0);
});
class Yr {
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
      n.reason || (n.reason = new Ze(a, i, l), r(n.reason));
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
      token: new Yr(function(o) {
        t = o;
      }),
      cancel: t
    };
  }
}
function ss(e) {
  return function(r) {
    return e.apply(null, r);
  };
}
function us(e) {
  return m.isObject(e) && e.isAxiosError === !0;
}
const Nr = {
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
Object.entries(Nr).forEach(([e, t]) => {
  Nr[t] = e;
});
function Qo(e) {
  const t = new Ne(e), r = To(Ne.prototype.request, t);
  return m.extend(r, Ne.prototype, t, { allOwnKeys: !0 }), m.extend(r, t, null, { allOwnKeys: !0 }), r.create = function(o) {
    return Qo(ke(e, o));
  }, r;
}
const M = Qo(gt);
M.Axios = Ne;
M.CanceledError = Ze;
M.CancelToken = Yr;
M.isCancel = Wo;
M.VERSION = Jo;
M.toFormData = Xt;
M.AxiosError = E;
M.Cancel = M.CanceledError;
M.all = function(t) {
  return Promise.all(t);
};
M.spread = ss;
M.isAxiosError = us;
M.mergeConfig = ke;
M.AxiosHeaders = K;
M.formToJSON = (e) => jo(m.isHTMLForm(e) ? new FormData(e) : e);
M.getAdapter = Ko.getAdapter;
M.HttpStatusCode = Nr;
M.default = M;
function cs(e, t) {
  return Array.isArray(e) ? e.filter((r) => !t.includes(r)) : Object.keys(e).reduce((r, n) => (t.includes(n) || (r[n] = e[n]), r), {});
}
function Xo(e, t) {
  return Array.isArray(e) ? e.filter((r) => t.includes(r)) : t.reduce((r, n) => (n in e && (r[n] = e[n]), r), {});
}
function fs(e) {
  return Array.isArray(e) ? e.filter((t) => t !== null) : Object.keys(e).reduce((t, r) => (r in e && e[r] !== null && (t[r] = e[r]), t), {});
}
var Mr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ds(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function ps(e) {
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
var ms = function(t) {
  return ys(t) && !hs(t);
};
function ys(e) {
  return !!e && typeof e == "object";
}
function hs(e) {
  var t = Object.prototype.toString.call(e);
  return t === "[object RegExp]" || t === "[object Date]" || bs(e);
}
var vs = typeof Symbol == "function" && Symbol.for, gs = vs ? Symbol.for("react.element") : 60103;
function bs(e) {
  return e.$$typeof === gs;
}
function ws(e) {
  return Array.isArray(e) ? [] : {};
}
function dt(e, t) {
  return t.clone !== !1 && t.isMergeableObject(e) ? Ge(ws(e), e, t) : e;
}
function Ss(e, t, r) {
  return e.concat(t).map(function(n) {
    return dt(n, r);
  });
}
function Es(e, t) {
  if (!t.customMerge)
    return Ge;
  var r = t.customMerge(e);
  return typeof r == "function" ? r : Ge;
}
function xs(e) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter(function(t) {
    return Object.propertyIsEnumerable.call(e, t);
  }) : [];
}
function Cn(e) {
  return Object.keys(e).concat(xs(e));
}
function Yo(e, t) {
  try {
    return t in e;
  } catch {
    return !1;
  }
}
function Os(e, t) {
  return Yo(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t));
}
function As(e, t, r) {
  var n = {};
  return r.isMergeableObject(e) && Cn(e).forEach(function(o) {
    n[o] = dt(e[o], r);
  }), Cn(t).forEach(function(o) {
    Os(e, o) || (Yo(e, o) && r.isMergeableObject(t[o]) ? n[o] = Es(o, r)(e[o], t[o], r) : n[o] = dt(t[o], r));
  }), n;
}
function Ge(e, t, r) {
  r = r || {}, r.arrayMerge = r.arrayMerge || Ss, r.isMergeableObject = r.isMergeableObject || ms, r.cloneUnlessOtherwiseSpecified = dt;
  var n = Array.isArray(t), o = Array.isArray(e), a = n === o;
  return a ? n ? r.arrayMerge(e, t, r) : As(e, t, r) : dt(t, r);
}
Ge.all = function(t, r) {
  if (!Array.isArray(t))
    throw new Error("first argument should be an array");
  return t.reduce(function(n, o) {
    return Ge(n, o, r);
  }, {});
};
var Ps = Ge, Ts = Ps;
const Rs = /* @__PURE__ */ ds(Ts);
var Cs = Error, Fs = EvalError, $s = RangeError, Ds = ReferenceError, Zo = SyntaxError, bt = TypeError, Ls = URIError, Ns = function() {
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
}, Fn = typeof Symbol < "u" && Symbol, Ms = Ns, Bs = function() {
  return typeof Fn != "function" || typeof Symbol != "function" || typeof Fn("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : Ms();
}, lr = {
  __proto__: null,
  foo: {}
}, Is = Object, ks = function() {
  return { __proto__: lr }.foo === lr.foo && !(lr instanceof Is);
}, Us = "Function.prototype.bind called on incompatible ", _s = Object.prototype.toString, js = Math.max, Ws = "[object Function]", $n = function(t, r) {
  for (var n = [], o = 0; o < t.length; o += 1)
    n[o] = t[o];
  for (var a = 0; a < r.length; a += 1)
    n[a + t.length] = r[a];
  return n;
}, Hs = function(t, r) {
  for (var n = [], o = r, a = 0; o < t.length; o += 1, a += 1)
    n[a] = t[o];
  return n;
}, qs = function(e, t) {
  for (var r = "", n = 0; n < e.length; n += 1)
    r += e[n], n + 1 < e.length && (r += t);
  return r;
}, zs = function(t) {
  var r = this;
  if (typeof r != "function" || _s.apply(r) !== Ws)
    throw new TypeError(Us + r);
  for (var n = Hs(arguments, 1), o, a = function() {
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
  }, i = js(0, r.length - n.length), l = [], s = 0; s < i; s++)
    l[s] = "$" + s;
  if (o = Function("binder", "return function (" + qs(l, ",") + "){ return binder.apply(this,arguments); }")(a), r.prototype) {
    var u = function() {
    };
    u.prototype = r.prototype, o.prototype = new u(), u.prototype = null;
  }
  return o;
}, Vs = zs, Zr = Function.prototype.bind || Vs, Gs = Function.prototype.call, Ks = Object.prototype.hasOwnProperty, Js = Zr, Qs = Js.call(Gs, Ks), A, Xs = Cs, Ys = Fs, Zs = $s, eu = Ds, Ke = Zo, Ve = bt, tu = Ls, ea = Function, sr = function(e) {
  try {
    return ea('"use strict"; return (' + e + ").constructor;")();
  } catch {
  }
}, Me = Object.getOwnPropertyDescriptor;
if (Me)
  try {
    Me({}, "");
  } catch {
    Me = null;
  }
var ur = function() {
  throw new Ve();
}, ru = Me ? function() {
  try {
    return arguments.callee, ur;
  } catch {
    try {
      return Me(arguments, "callee").get;
    } catch {
      return ur;
    }
  }
}() : ur, We = Bs(), nu = ks(), U = Object.getPrototypeOf || (nu ? function(e) {
  return e.__proto__;
} : null), qe = {}, ou = typeof Uint8Array > "u" || !U ? A : U(Uint8Array), Be = {
  __proto__: null,
  "%AggregateError%": typeof AggregateError > "u" ? A : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? A : ArrayBuffer,
  "%ArrayIteratorPrototype%": We && U ? U([][Symbol.iterator]()) : A,
  "%AsyncFromSyncIteratorPrototype%": A,
  "%AsyncFunction%": qe,
  "%AsyncGenerator%": qe,
  "%AsyncGeneratorFunction%": qe,
  "%AsyncIteratorPrototype%": qe,
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
  "%Error%": Xs,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": Ys,
  "%Float32Array%": typeof Float32Array > "u" ? A : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? A : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? A : FinalizationRegistry,
  "%Function%": ea,
  "%GeneratorFunction%": qe,
  "%Int8Array%": typeof Int8Array > "u" ? A : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? A : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? A : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": We && U ? U(U([][Symbol.iterator]())) : A,
  "%JSON%": typeof JSON == "object" ? JSON : A,
  "%Map%": typeof Map > "u" ? A : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !We || !U ? A : U((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": Object,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise > "u" ? A : Promise,
  "%Proxy%": typeof Proxy > "u" ? A : Proxy,
  "%RangeError%": Zs,
  "%ReferenceError%": eu,
  "%Reflect%": typeof Reflect > "u" ? A : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? A : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !We || !U ? A : U((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? A : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": We && U ? U(""[Symbol.iterator]()) : A,
  "%Symbol%": We ? Symbol : A,
  "%SyntaxError%": Ke,
  "%ThrowTypeError%": ru,
  "%TypedArray%": ou,
  "%TypeError%": Ve,
  "%Uint8Array%": typeof Uint8Array > "u" ? A : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? A : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? A : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? A : Uint32Array,
  "%URIError%": tu,
  "%WeakMap%": typeof WeakMap > "u" ? A : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? A : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? A : WeakSet
};
if (U)
  try {
    null.error;
  } catch (e) {
    var au = U(U(e));
    Be["%Error.prototype%"] = au;
  }
var iu = function e(t) {
  var r;
  if (t === "%AsyncFunction%")
    r = sr("async function () {}");
  else if (t === "%GeneratorFunction%")
    r = sr("function* () {}");
  else if (t === "%AsyncGeneratorFunction%")
    r = sr("async function* () {}");
  else if (t === "%AsyncGenerator%") {
    var n = e("%AsyncGeneratorFunction%");
    n && (r = n.prototype);
  } else if (t === "%AsyncIteratorPrototype%") {
    var o = e("%AsyncGenerator%");
    o && U && (r = U(o.prototype));
  }
  return Be[t] = r, r;
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
}, wt = Zr, _t = Qs, lu = wt.call(Function.call, Array.prototype.concat), su = wt.call(Function.apply, Array.prototype.splice), Ln = wt.call(Function.call, String.prototype.replace), jt = wt.call(Function.call, String.prototype.slice), uu = wt.call(Function.call, RegExp.prototype.exec), cu = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, fu = /\\(\\)?/g, du = function(t) {
  var r = jt(t, 0, 1), n = jt(t, -1);
  if (r === "%" && n !== "%")
    throw new Ke("invalid intrinsic syntax, expected closing `%`");
  if (n === "%" && r !== "%")
    throw new Ke("invalid intrinsic syntax, expected opening `%`");
  var o = [];
  return Ln(t, cu, function(a, i, l, s) {
    o[o.length] = l ? Ln(s, fu, "$1") : i || a;
  }), o;
}, pu = function(t, r) {
  var n = t, o;
  if (_t(Dn, n) && (o = Dn[n], n = "%" + o[0] + "%"), _t(Be, n)) {
    var a = Be[n];
    if (a === qe && (a = iu(n)), typeof a > "u" && !r)
      throw new Ve("intrinsic " + t + " exists, but is not available. Please file an issue!");
    return {
      alias: o,
      name: n,
      value: a
    };
  }
  throw new Ke("intrinsic " + t + " does not exist!");
}, et = function(t, r) {
  if (typeof t != "string" || t.length === 0)
    throw new Ve("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof r != "boolean")
    throw new Ve('"allowMissing" argument must be a boolean');
  if (uu(/^%?[^%]*%?$/, t) === null)
    throw new Ke("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var n = du(t), o = n.length > 0 ? n[0] : "", a = pu("%" + o + "%", r), i = a.name, l = a.value, s = !1, u = a.alias;
  u && (o = u[0], su(n, lu([0, 1], u)));
  for (var c = 1, y = !0; c < n.length; c += 1) {
    var d = n[c], v = jt(d, 0, 1), f = jt(d, -1);
    if ((v === '"' || v === "'" || v === "`" || f === '"' || f === "'" || f === "`") && v !== f)
      throw new Ke("property names with quotes must have matching quotes");
    if ((d === "constructor" || !y) && (s = !0), o += "." + d, i = "%" + o + "%", _t(Be, i))
      l = Be[i];
    else if (l != null) {
      if (!(d in l)) {
        if (!r)
          throw new Ve("base intrinsic for " + t + " exists, but the property is not available.");
        return;
      }
      if (Me && c + 1 >= n.length) {
        var p = Me(l, d);
        y = !!p, y && "get" in p && !("originalValue" in p.get) ? l = p.get : l = l[d];
      } else
        y = _t(l, d), l = l[d];
      y && !s && (Be[i] = l);
    }
  }
  return l;
}, ta = { exports: {} }, cr, Nn;
function en() {
  if (Nn) return cr;
  Nn = 1;
  var e = et, t = e("%Object.defineProperty%", !0) || !1;
  if (t)
    try {
      t({}, "a", { value: 1 });
    } catch {
      t = !1;
    }
  return cr = t, cr;
}
var mu = et, Nt = mu("%Object.getOwnPropertyDescriptor%", !0);
if (Nt)
  try {
    Nt([], "length");
  } catch {
    Nt = null;
  }
var ra = Nt, Mn = en(), yu = Zo, He = bt, Bn = ra, hu = function(t, r, n) {
  if (!t || typeof t != "object" && typeof t != "function")
    throw new He("`obj` must be an object or a function`");
  if (typeof r != "string" && typeof r != "symbol")
    throw new He("`property` must be a string or a symbol`");
  if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
    throw new He("`nonEnumerable`, if provided, must be a boolean or null");
  if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
    throw new He("`nonWritable`, if provided, must be a boolean or null");
  if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
    throw new He("`nonConfigurable`, if provided, must be a boolean or null");
  if (arguments.length > 6 && typeof arguments[6] != "boolean")
    throw new He("`loose`, if provided, must be a boolean");
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
    throw new yu("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
}, Br = en(), na = function() {
  return !!Br;
};
na.hasArrayLengthDefineBug = function() {
  if (!Br)
    return null;
  try {
    return Br([], "length", { value: 1 }).length !== 1;
  } catch {
    return !0;
  }
};
var vu = na, gu = et, In = hu, bu = vu(), kn = ra, Un = bt, wu = gu("%Math.floor%"), Su = function(t, r) {
  if (typeof t != "function")
    throw new Un("`fn` is not a function");
  if (typeof r != "number" || r < 0 || r > 4294967295 || wu(r) !== r)
    throw new Un("`length` must be a positive 32-bit integer");
  var n = arguments.length > 2 && !!arguments[2], o = !0, a = !0;
  if ("length" in t && kn) {
    var i = kn(t, "length");
    i && !i.configurable && (o = !1), i && !i.writable && (a = !1);
  }
  return (o || a || !n) && (bu ? In(
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
  var t = Zr, r = et, n = Su, o = bt, a = r("%Function.prototype.apply%"), i = r("%Function.prototype.call%"), l = r("%Reflect.apply%", !0) || t.call(i, a), s = en(), u = r("%Math.max%");
  e.exports = function(d) {
    if (typeof d != "function")
      throw new o("a function is required");
    var v = l(t, i, arguments);
    return n(
      v,
      1 + u(0, d.length - (arguments.length - 1)),
      !0
    );
  };
  var c = function() {
    return l(t, a, arguments);
  };
  s ? s(e.exports, "apply", { value: c }) : e.exports.apply = c;
})(ta);
var Eu = ta.exports, oa = et, aa = Eu, xu = aa(oa("String.prototype.indexOf")), Ou = function(t, r) {
  var n = oa(t, !!r);
  return typeof n == "function" && xu(t, ".prototype.") > -1 ? aa(n) : n;
};
const Au = {}, Pu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Au
}, Symbol.toStringTag, { value: "Module" })), Tu = /* @__PURE__ */ ps(Pu);
var tn = typeof Map == "function" && Map.prototype, fr = Object.getOwnPropertyDescriptor && tn ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, Wt = tn && fr && typeof fr.get == "function" ? fr.get : null, _n = tn && Map.prototype.forEach, rn = typeof Set == "function" && Set.prototype, dr = Object.getOwnPropertyDescriptor && rn ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, Ht = rn && dr && typeof dr.get == "function" ? dr.get : null, jn = rn && Set.prototype.forEach, Ru = typeof WeakMap == "function" && WeakMap.prototype, st = Ru ? WeakMap.prototype.has : null, Cu = typeof WeakSet == "function" && WeakSet.prototype, ut = Cu ? WeakSet.prototype.has : null, Fu = typeof WeakRef == "function" && WeakRef.prototype, Wn = Fu ? WeakRef.prototype.deref : null, $u = Boolean.prototype.valueOf, Du = Object.prototype.toString, Lu = Function.prototype.toString, Nu = String.prototype.match, nn = String.prototype.slice, Se = String.prototype.replace, Mu = String.prototype.toUpperCase, Hn = String.prototype.toLowerCase, ia = RegExp.prototype.test, qn = Array.prototype.concat, pe = Array.prototype.join, Bu = Array.prototype.slice, zn = Math.floor, Ir = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, pr = Object.getOwnPropertySymbols, kr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, Je = typeof Symbol == "function" && typeof Symbol.iterator == "object", W = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === Je || !0) ? Symbol.toStringTag : null, la = Object.prototype.propertyIsEnumerable, Vn = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(e) {
  return e.__proto__;
} : null);
function Gn(e, t) {
  if (e === 1 / 0 || e === -1 / 0 || e !== e || e && e > -1e3 && e < 1e3 || ia.call(/e/, t))
    return t;
  var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof e == "number") {
    var n = e < 0 ? -zn(-e) : zn(e);
    if (n !== e) {
      var o = String(n), a = nn.call(t, o.length + 1);
      return Se.call(o, r, "$&_") + "." + Se.call(Se.call(a, /([0-9]{3})/g, "$&_"), /_$/, "");
    }
  }
  return Se.call(t, r, "$&_");
}
var Ur = Tu, Kn = Ur.custom, Jn = ua(Kn) ? Kn : null, Iu = function e(t, r, n, o) {
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
    return fa(t, a);
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
    return _r(t) ? "[Array]" : "[Object]";
  var y = tc(a, n);
  if (typeof o > "u")
    o = [];
  else if (ca(o, t) >= 0)
    return "[Circular]";
  function d(D, z, k) {
    if (z && (o = Bu.call(o), o.push(z)), k) {
      var H = {
        depth: a.depth
      };
      return ge(a, "quoteStyle") && (H.quoteStyle = a.quoteStyle), e(D, H, n + 1, o);
    }
    return e(D, a, n + 1, o);
  }
  if (typeof t == "function" && !Qn(t)) {
    var v = Vu(t), f = Rt(t, d);
    return "[Function" + (v ? ": " + v : " (anonymous)") + "]" + (f.length > 0 ? " { " + pe.call(f, ", ") + " }" : "");
  }
  if (ua(t)) {
    var p = Je ? Se.call(String(t), /^(Symbol\(.*\))_[^)]*$/, "$1") : kr.call(t);
    return typeof t == "object" && !Je ? it(p) : p;
  }
  if (Yu(t)) {
    for (var h = "<" + Hn.call(String(t.nodeName)), b = t.attributes || [], w = 0; w < b.length; w++)
      h += " " + b[w].name + "=" + sa(ku(b[w].value), "double", a);
    return h += ">", t.childNodes && t.childNodes.length && (h += "..."), h += "</" + Hn.call(String(t.nodeName)) + ">", h;
  }
  if (_r(t)) {
    if (t.length === 0)
      return "[]";
    var g = Rt(t, d);
    return y && !ec(g) ? "[" + jr(g, y) + "]" : "[ " + pe.call(g, ", ") + " ]";
  }
  if (_u(t)) {
    var S = Rt(t, d);
    return !("cause" in Error.prototype) && "cause" in t && !la.call(t, "cause") ? "{ [" + String(t) + "] " + pe.call(qn.call("[cause]: " + d(t.cause), S), ", ") + " }" : S.length === 0 ? "[" + String(t) + "]" : "{ [" + String(t) + "] " + pe.call(S, ", ") + " }";
  }
  if (typeof t == "object" && i) {
    if (Jn && typeof t[Jn] == "function" && Ur)
      return Ur(t, { depth: c - n });
    if (i !== "symbol" && typeof t.inspect == "function")
      return t.inspect();
  }
  if (Gu(t)) {
    var O = [];
    return _n && _n.call(t, function(D, z) {
      O.push(d(z, t, !0) + " => " + d(D, t));
    }), Xn("Map", Wt.call(t), O, y);
  }
  if (Qu(t)) {
    var T = [];
    return jn && jn.call(t, function(D) {
      T.push(d(D, t));
    }), Xn("Set", Ht.call(t), T, y);
  }
  if (Ku(t))
    return mr("WeakMap");
  if (Xu(t))
    return mr("WeakSet");
  if (Ju(t))
    return mr("WeakRef");
  if (Wu(t))
    return it(d(Number(t)));
  if (qu(t))
    return it(d(Ir.call(t)));
  if (Hu(t))
    return it($u.call(t));
  if (ju(t))
    return it(d(String(t)));
  if (typeof window < "u" && t === window)
    return "{ [object Window] }";
  if (typeof globalThis < "u" && t === globalThis || typeof Mr < "u" && t === Mr)
    return "{ [object globalThis] }";
  if (!Uu(t) && !Qn(t)) {
    var C = Rt(t, d), $ = Vn ? Vn(t) === Object.prototype : t instanceof Object || t.constructor === Object, q = t instanceof Object ? "" : "null prototype", Q = !$ && W && Object(t) === t && W in t ? nn.call(xe(t), 8, -1) : q ? "Object" : "", he = $ || typeof t.constructor != "function" ? "" : t.constructor.name ? t.constructor.name + " " : "", se = he + (Q || q ? "[" + pe.call(qn.call([], Q || [], q || []), ": ") + "] " : "");
    return C.length === 0 ? se + "{}" : y ? se + "{" + jr(C, y) + "}" : se + "{ " + pe.call(C, ", ") + " }";
  }
  return String(t);
};
function sa(e, t, r) {
  var n = (r.quoteStyle || t) === "double" ? '"' : "'";
  return n + e + n;
}
function ku(e) {
  return Se.call(String(e), /"/g, "&quot;");
}
function _r(e) {
  return xe(e) === "[object Array]" && (!W || !(typeof e == "object" && W in e));
}
function Uu(e) {
  return xe(e) === "[object Date]" && (!W || !(typeof e == "object" && W in e));
}
function Qn(e) {
  return xe(e) === "[object RegExp]" && (!W || !(typeof e == "object" && W in e));
}
function _u(e) {
  return xe(e) === "[object Error]" && (!W || !(typeof e == "object" && W in e));
}
function ju(e) {
  return xe(e) === "[object String]" && (!W || !(typeof e == "object" && W in e));
}
function Wu(e) {
  return xe(e) === "[object Number]" && (!W || !(typeof e == "object" && W in e));
}
function Hu(e) {
  return xe(e) === "[object Boolean]" && (!W || !(typeof e == "object" && W in e));
}
function ua(e) {
  if (Je)
    return e && typeof e == "object" && e instanceof Symbol;
  if (typeof e == "symbol")
    return !0;
  if (!e || typeof e != "object" || !kr)
    return !1;
  try {
    return kr.call(e), !0;
  } catch {
  }
  return !1;
}
function qu(e) {
  if (!e || typeof e != "object" || !Ir)
    return !1;
  try {
    return Ir.call(e), !0;
  } catch {
  }
  return !1;
}
var zu = Object.prototype.hasOwnProperty || function(e) {
  return e in this;
};
function ge(e, t) {
  return zu.call(e, t);
}
function xe(e) {
  return Du.call(e);
}
function Vu(e) {
  if (e.name)
    return e.name;
  var t = Nu.call(Lu.call(e), /^function\s*([\w$]+)/);
  return t ? t[1] : null;
}
function ca(e, t) {
  if (e.indexOf)
    return e.indexOf(t);
  for (var r = 0, n = e.length; r < n; r++)
    if (e[r] === t)
      return r;
  return -1;
}
function Gu(e) {
  if (!Wt || !e || typeof e != "object")
    return !1;
  try {
    Wt.call(e);
    try {
      Ht.call(e);
    } catch {
      return !0;
    }
    return e instanceof Map;
  } catch {
  }
  return !1;
}
function Ku(e) {
  if (!st || !e || typeof e != "object")
    return !1;
  try {
    st.call(e, st);
    try {
      ut.call(e, ut);
    } catch {
      return !0;
    }
    return e instanceof WeakMap;
  } catch {
  }
  return !1;
}
function Ju(e) {
  if (!Wn || !e || typeof e != "object")
    return !1;
  try {
    return Wn.call(e), !0;
  } catch {
  }
  return !1;
}
function Qu(e) {
  if (!Ht || !e || typeof e != "object")
    return !1;
  try {
    Ht.call(e);
    try {
      Wt.call(e);
    } catch {
      return !0;
    }
    return e instanceof Set;
  } catch {
  }
  return !1;
}
function Xu(e) {
  if (!ut || !e || typeof e != "object")
    return !1;
  try {
    ut.call(e, ut);
    try {
      st.call(e, st);
    } catch {
      return !0;
    }
    return e instanceof WeakSet;
  } catch {
  }
  return !1;
}
function Yu(e) {
  return !e || typeof e != "object" ? !1 : typeof HTMLElement < "u" && e instanceof HTMLElement ? !0 : typeof e.nodeName == "string" && typeof e.getAttribute == "function";
}
function fa(e, t) {
  if (e.length > t.maxStringLength) {
    var r = e.length - t.maxStringLength, n = "... " + r + " more character" + (r > 1 ? "s" : "");
    return fa(nn.call(e, 0, t.maxStringLength), t) + n;
  }
  var o = Se.call(Se.call(e, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, Zu);
  return sa(o, "single", t);
}
function Zu(e) {
  var t = e.charCodeAt(0), r = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[t];
  return r ? "\\" + r : "\\x" + (t < 16 ? "0" : "") + Mu.call(t.toString(16));
}
function it(e) {
  return "Object(" + e + ")";
}
function mr(e) {
  return e + " { ? }";
}
function Xn(e, t, r, n) {
  var o = n ? jr(r, n) : pe.call(r, ", ");
  return e + " (" + t + ") {" + o + "}";
}
function ec(e) {
  for (var t = 0; t < e.length; t++)
    if (ca(e[t], `
`) >= 0)
      return !1;
  return !0;
}
function tc(e, t) {
  var r;
  if (e.indent === "	")
    r = "	";
  else if (typeof e.indent == "number" && e.indent > 0)
    r = pe.call(Array(e.indent + 1), " ");
  else
    return null;
  return {
    base: r,
    prev: pe.call(Array(t + 1), r)
  };
}
function jr(e, t) {
  if (e.length === 0)
    return "";
  var r = `
` + t.prev + t.base;
  return r + pe.call(e, "," + r) + `
` + t.prev;
}
function Rt(e, t) {
  var r = _r(e), n = [];
  if (r) {
    n.length = e.length;
    for (var o = 0; o < e.length; o++)
      n[o] = ge(e, o) ? t(e[o], e) : "";
  }
  var a = typeof pr == "function" ? pr(e) : [], i;
  if (Je) {
    i = {};
    for (var l = 0; l < a.length; l++)
      i["$" + a[l]] = a[l];
  }
  for (var s in e)
    ge(e, s) && (r && String(Number(s)) === s && s < e.length || Je && i["$" + s] instanceof Symbol || (ia.call(/[^\w$]/, s) ? n.push(t(s, e) + ": " + t(e[s], e)) : n.push(s + ": " + t(e[s], e))));
  if (typeof pr == "function")
    for (var u = 0; u < a.length; u++)
      la.call(e, a[u]) && n.push("[" + t(a[u]) + "]: " + t(e[a[u]], e));
  return n;
}
var da = et, tt = Ou, rc = Iu, nc = bt, Ct = da("%WeakMap%", !0), Ft = da("%Map%", !0), oc = tt("WeakMap.prototype.get", !0), ac = tt("WeakMap.prototype.set", !0), ic = tt("WeakMap.prototype.has", !0), lc = tt("Map.prototype.get", !0), sc = tt("Map.prototype.set", !0), uc = tt("Map.prototype.has", !0), on = function(e, t) {
  for (var r = e, n; (n = r.next) !== null; r = n)
    if (n.key === t)
      return r.next = n.next, n.next = /** @type {NonNullable<typeof list.next>} */
      e.next, e.next = n, n;
}, cc = function(e, t) {
  var r = on(e, t);
  return r && r.value;
}, fc = function(e, t, r) {
  var n = on(e, t);
  n ? n.value = r : e.next = /** @type {import('.').ListNode<typeof value>} */
  {
    // eslint-disable-line no-param-reassign, no-extra-parens
    key: t,
    next: e.next,
    value: r
  };
}, dc = function(e, t) {
  return !!on(e, t);
}, pc = function() {
  var t, r, n, o = {
    assert: function(a) {
      if (!o.has(a))
        throw new nc("Side channel does not contain " + rc(a));
    },
    get: function(a) {
      if (Ct && a && (typeof a == "object" || typeof a == "function")) {
        if (t)
          return oc(t, a);
      } else if (Ft) {
        if (r)
          return lc(r, a);
      } else if (n)
        return cc(n, a);
    },
    has: function(a) {
      if (Ct && a && (typeof a == "object" || typeof a == "function")) {
        if (t)
          return ic(t, a);
      } else if (Ft) {
        if (r)
          return uc(r, a);
      } else if (n)
        return dc(n, a);
      return !1;
    },
    set: function(a, i) {
      Ct && a && (typeof a == "object" || typeof a == "function") ? (t || (t = new Ct()), ac(t, a, i)) : Ft ? (r || (r = new Ft()), sc(r, a, i)) : (n || (n = { key: {}, next: null }), fc(n, a, i));
    }
  };
  return o;
}, mc = String.prototype.replace, yc = /%20/g, yr = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
}, an = {
  default: yr.RFC3986,
  formatters: {
    RFC1738: function(e) {
      return mc.call(e, yc, "+");
    },
    RFC3986: function(e) {
      return String(e);
    }
  },
  RFC1738: yr.RFC1738,
  RFC3986: yr.RFC3986
}, hc = an, hr = Object.prototype.hasOwnProperty, Pe = Array.isArray, fe = function() {
  for (var e = [], t = 0; t < 256; ++t)
    e.push("%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase());
  return e;
}(), vc = function(t) {
  for (; t.length > 1; ) {
    var r = t.pop(), n = r.obj[r.prop];
    if (Pe(n)) {
      for (var o = [], a = 0; a < n.length; ++a)
        typeof n[a] < "u" && o.push(n[a]);
      r.obj[r.prop] = o;
    }
  }
}, pa = function(t, r) {
  for (var n = r && r.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, o = 0; o < t.length; ++o)
    typeof t[o] < "u" && (n[o] = t[o]);
  return n;
}, gc = function e(t, r, n) {
  if (!r)
    return t;
  if (typeof r != "object") {
    if (Pe(t))
      t.push(r);
    else if (t && typeof t == "object")
      (n && (n.plainObjects || n.allowPrototypes) || !hr.call(Object.prototype, r)) && (t[r] = !0);
    else
      return [t, r];
    return t;
  }
  if (!t || typeof t != "object")
    return [t].concat(r);
  var o = t;
  return Pe(t) && !Pe(r) && (o = pa(t, n)), Pe(t) && Pe(r) ? (r.forEach(function(a, i) {
    if (hr.call(t, i)) {
      var l = t[i];
      l && typeof l == "object" && a && typeof a == "object" ? t[i] = e(l, a, n) : t.push(a);
    } else
      t[i] = a;
  }), t) : Object.keys(r).reduce(function(a, i) {
    var l = r[i];
    return hr.call(a, i) ? a[i] = e(a[i], l, n) : a[i] = l, a;
  }, o);
}, bc = function(t, r) {
  return Object.keys(r).reduce(function(n, o) {
    return n[o] = r[o], n;
  }, t);
}, wc = function(e, t, r) {
  var n = e.replace(/\+/g, " ");
  if (r === "iso-8859-1")
    return n.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n);
  } catch {
    return n;
  }
}, vr = 1024, Sc = function(t, r, n, o, a) {
  if (t.length === 0)
    return t;
  var i = t;
  if (typeof t == "symbol" ? i = Symbol.prototype.toString.call(t) : typeof t != "string" && (i = String(t)), n === "iso-8859-1")
    return escape(i).replace(/%u[0-9a-f]{4}/gi, function(v) {
      return "%26%23" + parseInt(v.slice(2), 16) + "%3B";
    });
  for (var l = "", s = 0; s < i.length; s += vr) {
    for (var u = i.length >= vr ? i.slice(s, s + vr) : i, c = [], y = 0; y < u.length; ++y) {
      var d = u.charCodeAt(y);
      if (d === 45 || d === 46 || d === 95 || d === 126 || d >= 48 && d <= 57 || d >= 65 && d <= 90 || d >= 97 && d <= 122 || a === hc.RFC1738 && (d === 40 || d === 41)) {
        c[c.length] = u.charAt(y);
        continue;
      }
      if (d < 128) {
        c[c.length] = fe[d];
        continue;
      }
      if (d < 2048) {
        c[c.length] = fe[192 | d >> 6] + fe[128 | d & 63];
        continue;
      }
      if (d < 55296 || d >= 57344) {
        c[c.length] = fe[224 | d >> 12] + fe[128 | d >> 6 & 63] + fe[128 | d & 63];
        continue;
      }
      y += 1, d = 65536 + ((d & 1023) << 10 | u.charCodeAt(y) & 1023), c[c.length] = fe[240 | d >> 18] + fe[128 | d >> 12 & 63] + fe[128 | d >> 6 & 63] + fe[128 | d & 63];
    }
    l += c.join("");
  }
  return l;
}, Ec = function(t) {
  for (var r = [{ obj: { o: t }, prop: "o" }], n = [], o = 0; o < r.length; ++o)
    for (var a = r[o], i = a.obj[a.prop], l = Object.keys(i), s = 0; s < l.length; ++s) {
      var u = l[s], c = i[u];
      typeof c == "object" && c !== null && n.indexOf(c) === -1 && (r.push({ obj: i, prop: u }), n.push(c));
    }
  return vc(r), t;
}, xc = function(t) {
  return Object.prototype.toString.call(t) === "[object RegExp]";
}, Oc = function(t) {
  return !t || typeof t != "object" ? !1 : !!(t.constructor && t.constructor.isBuffer && t.constructor.isBuffer(t));
}, Ac = function(t, r) {
  return [].concat(t, r);
}, Pc = function(t, r) {
  if (Pe(t)) {
    for (var n = [], o = 0; o < t.length; o += 1)
      n.push(r(t[o]));
    return n;
  }
  return r(t);
}, ma = {
  arrayToObject: pa,
  assign: bc,
  combine: Ac,
  compact: Ec,
  decode: wc,
  encode: Sc,
  isBuffer: Oc,
  isRegExp: xc,
  maybeMap: Pc,
  merge: gc
}, ya = pc, Mt = ma, ct = an, Tc = Object.prototype.hasOwnProperty, ha = {
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
}, de = Array.isArray, Rc = Array.prototype.push, va = function(e, t) {
  Rc.apply(e, de(t) ? t : [t]);
}, Cc = Date.prototype.toISOString, Yn = ct.default, I = {
  addQueryPrefix: !1,
  allowDots: !1,
  allowEmptyArrays: !1,
  arrayFormat: "indices",
  charset: "utf-8",
  charsetSentinel: !1,
  delimiter: "&",
  encode: !0,
  encodeDotInKeys: !1,
  encoder: Mt.encode,
  encodeValuesOnly: !1,
  format: Yn,
  formatter: ct.formatters[Yn],
  // deprecated
  indices: !1,
  serializeDate: function(t) {
    return Cc.call(t);
  },
  skipNulls: !1,
  strictNullHandling: !1
}, Fc = function(t) {
  return typeof t == "string" || typeof t == "number" || typeof t == "boolean" || typeof t == "symbol" || typeof t == "bigint";
}, gr = {}, $c = function e(t, r, n, o, a, i, l, s, u, c, y, d, v, f, p, h, b, w) {
  for (var g = t, S = w, O = 0, T = !1; (S = S.get(gr)) !== void 0 && !T; ) {
    var C = S.get(t);
    if (O += 1, typeof C < "u") {
      if (C === O)
        throw new RangeError("Cyclic object value");
      T = !0;
    }
    typeof S.get(gr) > "u" && (O = 0);
  }
  if (typeof c == "function" ? g = c(r, g) : g instanceof Date ? g = v(g) : n === "comma" && de(g) && (g = Mt.maybeMap(g, function(_e) {
    return _e instanceof Date ? v(_e) : _e;
  })), g === null) {
    if (i)
      return u && !h ? u(r, I.encoder, b, "key", f) : r;
    g = "";
  }
  if (Fc(g) || Mt.isBuffer(g)) {
    if (u) {
      var $ = h ? r : u(r, I.encoder, b, "key", f);
      return [p($) + "=" + p(u(g, I.encoder, b, "value", f))];
    }
    return [p(r) + "=" + p(String(g))];
  }
  var q = [];
  if (typeof g > "u")
    return q;
  var Q;
  if (n === "comma" && de(g))
    h && u && (g = Mt.maybeMap(g, u)), Q = [{ value: g.length > 0 ? g.join(",") || null : void 0 }];
  else if (de(c))
    Q = c;
  else {
    var he = Object.keys(g);
    Q = y ? he.sort(y) : he;
  }
  var se = s ? r.replace(/\./g, "%2E") : r, D = o && de(g) && g.length === 1 ? se + "[]" : se;
  if (a && de(g) && g.length === 0)
    return D + "[]";
  for (var z = 0; z < Q.length; ++z) {
    var k = Q[z], H = typeof k == "object" && typeof k.value < "u" ? k.value : g[k];
    if (!(l && H === null)) {
      var ue = d && s ? k.replace(/\./g, "%2E") : k, Et = de(g) ? typeof n == "function" ? n(D, ue) : D : D + (d ? "." + ue : "[" + ue + "]");
      w.set(t, O);
      var rt = ya();
      rt.set(gr, w), va(q, e(
        H,
        Et,
        n,
        o,
        a,
        i,
        l,
        s,
        n === "comma" && h && de(g) ? null : u,
        c,
        y,
        d,
        v,
        f,
        p,
        h,
        b,
        rt
      ));
    }
  }
  return q;
}, Dc = function(t) {
  if (!t)
    return I;
  if (typeof t.allowEmptyArrays < "u" && typeof t.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof t.encodeDotInKeys < "u" && typeof t.encodeDotInKeys != "boolean")
    throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
  if (t.encoder !== null && typeof t.encoder < "u" && typeof t.encoder != "function")
    throw new TypeError("Encoder has to be a function.");
  var r = t.charset || I.charset;
  if (typeof t.charset < "u" && t.charset !== "utf-8" && t.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var n = ct.default;
  if (typeof t.format < "u") {
    if (!Tc.call(ct.formatters, t.format))
      throw new TypeError("Unknown format option provided.");
    n = t.format;
  }
  var o = ct.formatters[n], a = I.filter;
  (typeof t.filter == "function" || de(t.filter)) && (a = t.filter);
  var i;
  if (t.arrayFormat in ha ? i = t.arrayFormat : "indices" in t ? i = t.indices ? "indices" : "repeat" : i = I.arrayFormat, "commaRoundTrip" in t && typeof t.commaRoundTrip != "boolean")
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  var l = typeof t.allowDots > "u" ? t.encodeDotInKeys === !0 ? !0 : I.allowDots : !!t.allowDots;
  return {
    addQueryPrefix: typeof t.addQueryPrefix == "boolean" ? t.addQueryPrefix : I.addQueryPrefix,
    allowDots: l,
    allowEmptyArrays: typeof t.allowEmptyArrays == "boolean" ? !!t.allowEmptyArrays : I.allowEmptyArrays,
    arrayFormat: i,
    charset: r,
    charsetSentinel: typeof t.charsetSentinel == "boolean" ? t.charsetSentinel : I.charsetSentinel,
    commaRoundTrip: t.commaRoundTrip,
    delimiter: typeof t.delimiter > "u" ? I.delimiter : t.delimiter,
    encode: typeof t.encode == "boolean" ? t.encode : I.encode,
    encodeDotInKeys: typeof t.encodeDotInKeys == "boolean" ? t.encodeDotInKeys : I.encodeDotInKeys,
    encoder: typeof t.encoder == "function" ? t.encoder : I.encoder,
    encodeValuesOnly: typeof t.encodeValuesOnly == "boolean" ? t.encodeValuesOnly : I.encodeValuesOnly,
    filter: a,
    format: n,
    formatter: o,
    serializeDate: typeof t.serializeDate == "function" ? t.serializeDate : I.serializeDate,
    skipNulls: typeof t.skipNulls == "boolean" ? t.skipNulls : I.skipNulls,
    sort: typeof t.sort == "function" ? t.sort : null,
    strictNullHandling: typeof t.strictNullHandling == "boolean" ? t.strictNullHandling : I.strictNullHandling
  };
}, Lc = function(e, t) {
  var r = e, n = Dc(t), o, a;
  typeof n.filter == "function" ? (a = n.filter, r = a("", r)) : de(n.filter) && (a = n.filter, o = a);
  var i = [];
  if (typeof r != "object" || r === null)
    return "";
  var l = ha[n.arrayFormat], s = l === "comma" && n.commaRoundTrip;
  o || (o = Object.keys(r)), n.sort && o.sort(n.sort);
  for (var u = ya(), c = 0; c < o.length; ++c) {
    var y = o[c];
    n.skipNulls && r[y] === null || va(i, $c(
      r[y],
      y,
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
  var d = i.join(n.delimiter), v = n.addQueryPrefix === !0 ? "?" : "";
  return n.charsetSentinel && (n.charset === "iso-8859-1" ? v += "utf8=%26%2310003%3B&" : v += "utf8=%E2%9C%93&"), d.length > 0 ? v + d : "";
}, Qe = ma, Wr = Object.prototype.hasOwnProperty, Nc = Array.isArray, L = {
  allowDots: !1,
  allowEmptyArrays: !1,
  allowPrototypes: !1,
  allowSparse: !1,
  arrayLimit: 20,
  charset: "utf-8",
  charsetSentinel: !1,
  comma: !1,
  decodeDotInKeys: !1,
  decoder: Qe.decode,
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
}, Mc = function(e) {
  return e.replace(/&#(\d+);/g, function(t, r) {
    return String.fromCharCode(parseInt(r, 10));
  });
}, ga = function(e, t) {
  return e && typeof e == "string" && t.comma && e.indexOf(",") > -1 ? e.split(",") : e;
}, Bc = "utf8=%26%2310003%3B", Ic = "utf8=%E2%9C%93", kc = function(t, r) {
  var n = { __proto__: null }, o = r.ignoreQueryPrefix ? t.replace(/^\?/, "") : t;
  o = o.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  var a = r.parameterLimit === 1 / 0 ? void 0 : r.parameterLimit, i = o.split(r.delimiter, a), l = -1, s, u = r.charset;
  if (r.charsetSentinel)
    for (s = 0; s < i.length; ++s)
      i[s].indexOf("utf8=") === 0 && (i[s] === Ic ? u = "utf-8" : i[s] === Bc && (u = "iso-8859-1"), l = s, s = i.length);
  for (s = 0; s < i.length; ++s)
    if (s !== l) {
      var c = i[s], y = c.indexOf("]="), d = y === -1 ? c.indexOf("=") : y + 1, v, f;
      d === -1 ? (v = r.decoder(c, L.decoder, u, "key"), f = r.strictNullHandling ? null : "") : (v = r.decoder(c.slice(0, d), L.decoder, u, "key"), f = Qe.maybeMap(
        ga(c.slice(d + 1), r),
        function(h) {
          return r.decoder(h, L.decoder, u, "value");
        }
      )), f && r.interpretNumericEntities && u === "iso-8859-1" && (f = Mc(f)), c.indexOf("[]=") > -1 && (f = Nc(f) ? [f] : f);
      var p = Wr.call(n, v);
      p && r.duplicates === "combine" ? n[v] = Qe.combine(n[v], f) : (!p || r.duplicates === "last") && (n[v] = f);
    }
  return n;
}, Uc = function(e, t, r, n) {
  for (var o = n ? t : ga(t, r), a = e.length - 1; a >= 0; --a) {
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
}, _c = function(t, r, n, o) {
  if (t) {
    var a = n.allowDots ? t.replace(/\.([^.[]+)/g, "[$1]") : t, i = /(\[[^[\]]*])/, l = /(\[[^[\]]*])/g, s = n.depth > 0 && i.exec(a), u = s ? a.slice(0, s.index) : a, c = [];
    if (u) {
      if (!n.plainObjects && Wr.call(Object.prototype, u) && !n.allowPrototypes)
        return;
      c.push(u);
    }
    for (var y = 0; n.depth > 0 && (s = l.exec(a)) !== null && y < n.depth; ) {
      if (y += 1, !n.plainObjects && Wr.call(Object.prototype, s[1].slice(1, -1)) && !n.allowPrototypes)
        return;
      c.push(s[1]);
    }
    if (s) {
      if (n.strictDepth === !0)
        throw new RangeError("Input depth exceeded depth option of " + n.depth + " and strictDepth is true");
      c.push("[" + a.slice(s.index) + "]");
    }
    return Uc(c, r, n, o);
  }
}, jc = function(t) {
  if (!t)
    return L;
  if (typeof t.allowEmptyArrays < "u" && typeof t.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof t.decodeDotInKeys < "u" && typeof t.decodeDotInKeys != "boolean")
    throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
  if (t.decoder !== null && typeof t.decoder < "u" && typeof t.decoder != "function")
    throw new TypeError("Decoder has to be a function.");
  if (typeof t.charset < "u" && t.charset !== "utf-8" && t.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var r = typeof t.charset > "u" ? L.charset : t.charset, n = typeof t.duplicates > "u" ? L.duplicates : t.duplicates;
  if (n !== "combine" && n !== "first" && n !== "last")
    throw new TypeError("The duplicates option must be either combine, first, or last");
  var o = typeof t.allowDots > "u" ? t.decodeDotInKeys === !0 ? !0 : L.allowDots : !!t.allowDots;
  return {
    allowDots: o,
    allowEmptyArrays: typeof t.allowEmptyArrays == "boolean" ? !!t.allowEmptyArrays : L.allowEmptyArrays,
    allowPrototypes: typeof t.allowPrototypes == "boolean" ? t.allowPrototypes : L.allowPrototypes,
    allowSparse: typeof t.allowSparse == "boolean" ? t.allowSparse : L.allowSparse,
    arrayLimit: typeof t.arrayLimit == "number" ? t.arrayLimit : L.arrayLimit,
    charset: r,
    charsetSentinel: typeof t.charsetSentinel == "boolean" ? t.charsetSentinel : L.charsetSentinel,
    comma: typeof t.comma == "boolean" ? t.comma : L.comma,
    decodeDotInKeys: typeof t.decodeDotInKeys == "boolean" ? t.decodeDotInKeys : L.decodeDotInKeys,
    decoder: typeof t.decoder == "function" ? t.decoder : L.decoder,
    delimiter: typeof t.delimiter == "string" || Qe.isRegExp(t.delimiter) ? t.delimiter : L.delimiter,
    // eslint-disable-next-line no-implicit-coercion, no-extra-parens
    depth: typeof t.depth == "number" || t.depth === !1 ? +t.depth : L.depth,
    duplicates: n,
    ignoreQueryPrefix: t.ignoreQueryPrefix === !0,
    interpretNumericEntities: typeof t.interpretNumericEntities == "boolean" ? t.interpretNumericEntities : L.interpretNumericEntities,
    parameterLimit: typeof t.parameterLimit == "number" ? t.parameterLimit : L.parameterLimit,
    parseArrays: t.parseArrays !== !1,
    plainObjects: typeof t.plainObjects == "boolean" ? t.plainObjects : L.plainObjects,
    strictDepth: typeof t.strictDepth == "boolean" ? !!t.strictDepth : L.strictDepth,
    strictNullHandling: typeof t.strictNullHandling == "boolean" ? t.strictNullHandling : L.strictNullHandling
  };
}, Wc = function(e, t) {
  var r = jc(t);
  if (e === "" || e === null || typeof e > "u")
    return r.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var n = typeof e == "string" ? kc(e, r) : e, o = r.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, a = Object.keys(n), i = 0; i < a.length; ++i) {
    var l = a[i], s = _c(l, n[l], r, typeof e == "string");
    o = Qe.merge(o, s, r);
  }
  return r.allowSparse === !0 ? o : Qe.compact(o);
}, Hc = Lc, qc = Wc, zc = an, Zn = {
  formats: zc,
  parse: qc,
  stringify: Hc
}, Vc = { exports: {} };
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */
(function(e, t) {
  (function(r, n) {
    e.exports = n();
  })(Mr, function() {
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
      var p, h;
      for (p in f)
        h = f[p], h !== void 0 && f.hasOwnProperty(p) && (n[p] = h);
      return this;
    }, r.status = null, r.set = function(f) {
      var p = r.isStarted();
      f = o(f, n.minimum, 1), r.status = f === 1 ? null : f;
      var h = r.render(!p), b = h.querySelector(n.barSelector), w = n.speed, g = n.easing;
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
      var p = r.status;
      return p ? (typeof f != "number" && (f = (1 - p) * o(Math.random() * p, 0.1, 0.95)), p = o(p + f, 0, 0.994), r.set(p)) : r.start();
    }, r.trickle = function() {
      return r.inc(Math.random() * n.trickleRate);
    }, function() {
      var f = 0, p = 0;
      r.promise = function(h) {
        return !h || h.state() === "resolved" ? this : (p === 0 && r.start(), f++, p++, h.always(function() {
          p--, p === 0 ? (f = 0, r.done()) : r.set((f - p) / f);
        }), this);
      };
    }(), r.render = function(f) {
      if (r.isRendered()) return document.getElementById("nprogress");
      c(document.documentElement, "nprogress-busy");
      var p = document.createElement("div");
      p.id = "nprogress", p.innerHTML = n.template;
      var h = p.querySelector(n.barSelector), b = f ? "-100" : a(r.status || 0), w = document.querySelector(n.parent), g;
      return s(h, {
        transition: "all 0 linear",
        transform: "translate3d(" + b + "%,0,0)"
      }), n.showSpinner || (g = p.querySelector(n.spinnerSelector), g && v(g)), w != document.body && c(w, "nprogress-custom-parent"), w.appendChild(p), p;
    }, r.remove = function() {
      y(document.documentElement, "nprogress-busy"), y(document.querySelector(n.parent), "nprogress-custom-parent");
      var f = document.getElementById("nprogress");
      f && v(f);
    }, r.isRendered = function() {
      return !!document.getElementById("nprogress");
    }, r.getPositioningCSS = function() {
      var f = document.body.style, p = "WebkitTransform" in f ? "Webkit" : "MozTransform" in f ? "Moz" : "msTransform" in f ? "ms" : "OTransform" in f ? "O" : "";
      return p + "Perspective" in f ? "translate3d" : p + "Transform" in f ? "translate" : "margin";
    };
    function o(f, p, h) {
      return f < p ? p : f > h ? h : f;
    }
    function a(f) {
      return (-1 + f) * 100;
    }
    function i(f, p, h) {
      var b;
      return n.positionUsing === "translate3d" ? b = { transform: "translate3d(" + a(f) + "%,0,0)" } : n.positionUsing === "translate" ? b = { transform: "translate(" + a(f) + "%,0)" } : b = { "margin-left": a(f) + "%" }, b.transition = "all " + p + "ms " + h, b;
    }
    var l = /* @__PURE__ */ function() {
      var f = [];
      function p() {
        var h = f.shift();
        h && h(p);
      }
      return function(h) {
        f.push(h), f.length == 1 && p();
      };
    }(), s = /* @__PURE__ */ function() {
      var f = ["Webkit", "O", "Moz", "ms"], p = {};
      function h(S) {
        return S.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(O, T) {
          return T.toUpperCase();
        });
      }
      function b(S) {
        var O = document.body.style;
        if (S in O) return S;
        for (var T = f.length, C = S.charAt(0).toUpperCase() + S.slice(1), $; T--; )
          if ($ = f[T] + C, $ in O) return $;
        return S;
      }
      function w(S) {
        return S = h(S), p[S] || (p[S] = b(S));
      }
      function g(S, O, T) {
        O = w(O), S.style[O] = T;
      }
      return function(S, O) {
        var T = arguments, C, $;
        if (T.length == 2)
          for (C in O)
            $ = O[C], $ !== void 0 && O.hasOwnProperty(C) && g(S, C, $);
        else
          g(S, T[1], T[2]);
      };
    }();
    function u(f, p) {
      var h = typeof f == "string" ? f : d(f);
      return h.indexOf(" " + p + " ") >= 0;
    }
    function c(f, p) {
      var h = d(f), b = h + p;
      u(h, p) || (f.className = b.substring(1));
    }
    function y(f, p) {
      var h = d(f), b;
      u(f, p) && (b = h.replace(" " + p + " ", " "), f.className = b.substring(1, b.length - 1));
    }
    function d(f) {
      return (" " + (f.className || "") + " ").replace(/\s+/gi, " ");
    }
    function v(f) {
      f && f.parentNode && f.parentNode.removeChild(f);
    }
    return r;
  });
})(Vc);
function Gc(e, t, r, n = "brackets") {
  let o = /^https?:\/\//.test(t.toString()), a = o || t.toString().startsWith("/"), i = !a && !t.toString().startsWith("#") && !t.toString().startsWith("?"), l = t.toString().includes("?") || e === "get" && Object.keys(r).length, s = t.toString().includes("#"), u = new URL(t.toString(), "http://localhost");
  return e === "get" && Object.keys(r).length && (u.search = Zn.stringify(Rs(Zn.parse(u.search, { ignoreQueryPrefix: !0 }), r), { encodeValuesOnly: !0, arrayFormat: n }), r = {}), [[o ? `${u.protocol}//${u.host}` : "", a ? u.pathname : "", i ? u.pathname.substring(1) : "", l ? u.search : "", s ? u.hash : ""].join(""), r];
}
const oe = x([]), qt = x({});
class ln {
  constructor(t, r, n, o, a) {
    ce(this, "getAdjacentModal", (t) => {
      const r = this.index.value;
      return oe.value[r + t] ?? null;
    });
    ce(this, "isOnTopOfStack", () => oe.value.length < 2 || oe.value[oe.value.length - 1].id === this.id);
    ce(this, "close", () => {
      var r;
      const t = this.index.value;
      t > -1 && (Object.keys(this.listeners).forEach((n) => {
        this.off(n);
      }), oe.value[t].open = !1, (r = this.onCloseCallback) == null || r.call(this));
    });
    ce(this, "afterLeave", () => {
      var t;
      oe.value = oe.value.filter((r) => r.id !== this.id), (t = this.afterLeaveCallback) == null || t.call(this);
    });
    ce(this, "on", (t, r) => {
      this.listeners[t] = this.listeners[t] ?? [], this.listeners[t].push(r);
    });
    ce(this, "off", (t, r) => {
      var n;
      r ? this.listeners[t] = ((n = this.listeners[t]) == null ? void 0 : n.filter((o) => o !== r)) ?? [] : delete this.listeners[t];
    });
    ce(this, "emit", (t, ...r) => {
      var n;
      (n = this.listeners[t]) == null || n.forEach((o) => o(...r));
    });
    ce(this, "registerEventListenersFromAttrs", (t) => {
      const r = [];
      return Object.keys(t).filter((n) => n.startsWith("on")).forEach((n) => {
        const o = n.replace(/^on/, "").replace(/^./, (a) => a.toLowerCase()).replace(/([A-Z])/g, "-$1").toLowerCase();
        this.on(o, t[n]), r.push(() => this.off(o, t[n]));
      }), () => r.forEach((n) => n());
    });
    ce(this, "reload", (t = {}) => {
      let r = Object.keys(this.response.props);
      t.only && (r = Xo(r, t.only)), t.except && (r = cs(r, t.except)), M.get(this.response.url, {
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
    this.id = ln.generateId(), this.open = !0, this.listeners = {}, this.component = t, this.componentProps = x(r.props), this.response = r, this.modalProps = n, this.onCloseCallback = o, this.afterLeaveCallback = a, this.index = P(() => oe.value.findIndex((i) => i.id === this.id)), this.getParentModal = () => this.getAdjacentModal(-1), this.getChildModal = () => this.getAdjacentModal(1), this.onTopOfStack = P(() => this.isOnTopOfStack());
  }
  static generateId() {
    return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `inertiaui_modal_${crypto.randomUUID()}` : `inertiaui_modal_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
function Kc(e, t) {
  qt.value[e] = { name: e, callback: t };
}
function Jc(e, t, r, n) {
  if (!qt.value[e])
    throw new Error(`The local modal "${e}" has not been registered.`);
  const o = sn(null, {}, t, r, n);
  return o.name = e, qt.value[e].callback(o), o;
}
function Qc(e, t, r = {}, n = {}, o = {}, a = null, i = null, l = "brackets") {
  return new Promise((s, u) => {
    if (e.startsWith("#")) {
      s(Jc(e.substring(1), o, a, i));
      return;
    }
    const [c, y] = Gc(t, e || "", r, l);
    M({
      url: c,
      method: t,
      data: y,
      headers: {
        ...n,
        Accept: "text/html, application/xhtml+xml",
        "X-Requested-With": "XMLHttpRequest",
        "X-Inertia": !0,
        "X-Inertia-Version": Ma().version,
        "X-InertiaUI-Modal": !0
      }
    }).then((d) => {
      Ba.resolveComponent(d.data.component).then((v) => {
        s(sn(Fa(v), d.data, o, a, i));
      });
    }).catch((d) => {
      u(d);
    });
  });
}
function sn(e, t, r, n, o) {
  const a = new ln(e, t, r, n, o);
  return oe.value.push(a), a;
}
const eo = x(!1), Xc = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"];
function St() {
  return {
    stack: Ca(oe),
    push: sn,
    reset: () => oe.value = [],
    visit: Qc,
    registerLocalModal: Kc,
    removeLocalModal: (e) => delete qt.value[e],
    rootPresent: eo,
    verifyRoot: () => {
      if (!eo.value)
        throw new Error(
          "The <ModalRoot> component is missing from your app layout. Please check the documentation for more information: https://inertiaui.com/inertia-modal/docs/installation"
        );
    }
  };
}
const Yc = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, o] of t)
    r[n] = o;
  return r;
}, Zc = {}, ef = {
  type: "button",
  class: "im-close-button text-gray-400 hover:text-gray-500"
};
function tf(e, t) {
  return V(), Ie("button", ef, t[0] || (t[0] = [
    ze("span", { class: "sr-only" }, "Close", -1),
    ze("svg", {
      class: "size-6",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      "stroke-width": "2",
      stroke: "currentColor",
      "aria-hidden": "true"
    }, [
      ze("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M6 18L18 6M6 6l12 12"
      })
    ], -1)
  ]));
}
const ba = /* @__PURE__ */ Yc(Zc, [["render", tf]]), rf = { class: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4" }, nf = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, of = {
  __name: "ModalContent",
  props: {
    modalContext: Object,
    modalProps: Object
  },
  setup(e) {
    return (t, r) => (V(), Ie("div", rf, [
      ze("div", {
        class: Fe(["im-modal-positioner flex min-h-full justify-center", {
          "items-start": e.modalProps.position === "top",
          "items-center": e.modalProps.position === "center",
          "items-end": e.modalProps.position === "bottom"
        }])
      }, [
        $e(R(Gt), {
          "enter-from": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          "enter-to": "opacity-100 translate-y-0 sm:scale-100",
          "leave-from": "opacity-100 translate-y-0 sm:scale-100",
          "leave-to": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          class: Fe({
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
          default: ye(() => [
            $e(R(xo), {
              class: Fe(["im-modal-content relative", [e.modalProps.paddingClasses, e.modalProps.panelClasses]])
            }, {
              default: ye(() => [
                e.modalProps.closeButton ? (V(), Ie("div", nf, [
                  $e(ba, {
                    onClick: e.modalContext.close
                  }, null, 8, ["onClick"])
                ])) : De("", !0),
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
}, wa = {
  __name: "ModalRenderer",
  props: {
    index: {
      type: Number,
      required: !0
    }
  },
  setup(e) {
    const t = e, r = St(), n = P(() => r.stack.value[t.index]);
    return ne("modalContext", n), (o, a) => {
      var i;
      return (i = n.value) != null && i.component ? (V(), Te(R(n).component, to({ key: 0 }, n.value.componentProps, {
        onModalEvent: a[0] || (a[0] = (l, ...s) => n.value.emit(l, ...s))
      }), null, 16)) : De("", !0);
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
    return (t, r) => (V(), Ie("div", af, [
      ze("div", {
        class: Fe(["im-slideover-positioner flex min-h-full items-center", {
          "justify-start": e.modalProps.position === "left",
          "justify-end": e.modalProps.position === "right"
        }])
      }, [
        $e(R(Gt), {
          "enter-from": "opacity-0 " + (e.modalProps.position === "left" ? "-translate-x-full" : "translate-x-full"),
          "enter-to": "opacity-100 translate-x-0",
          "leave-from": "opacity-100 translate-x-0",
          "leave-to": "opacity-0 " + (e.modalProps.position === "left" ? "-translate-x-full" : "translate-x-full"),
          class: Fe({
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
          default: ye(() => [
            $e(R(xo), {
              class: Fe(["im-slideover-content relative", [e.modalProps.paddingClasses, e.modalProps.panelClasses]])
            }, {
              default: ye(() => [
                e.modalProps.closeButton ? (V(), Ie("div", lf, [
                  $e(ba, {
                    onClick: e.modalContext.close
                  }, null, 8, ["onClick"])
                ])) : De("", !0),
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
}, uf = {
  class: "im-backdrop fixed inset-0 z-30 bg-black/75",
  "aria-hidden": "true"
}, cf = {
  key: 1,
  class: "im-backdrop fixed inset-0 z-30 bg-black/75"
}, vf = {
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
    const n = e, o = St(), a = n.name ? x({}) : Z("modalContext"), i = P(() => {
      const v = a.value.modalProps.slideover ?? n.slideover ?? ka("type") === "slideover";
      return {
        slideover: v,
        closeButton: n.closeButton ?? je(v, "closeButton"),
        closeExplicitly: n.closeExplicitly ?? je(v, "closeExplicitly"),
        maxWidth: n.maxWidth ?? je(v, "maxWidth"),
        paddingClasses: n.paddingClasses ?? je(v, "paddingClasses"),
        panelClasses: n.panelClasses ?? je(v, "panelClasses"),
        position: n.position ?? je(v, "position"),
        ...a.value.modalProps
      };
    });
    n.name && (o.registerLocalModal(n.name, function(v) {
      a.value = v, c();
    }), br(() => {
      o.removeLocalModal(n.name);
    })), j(() => {
      o.verifyRoot(), n.name || c();
    });
    function l() {
      i.value.closeExplicitly || a.value.close();
    }
    const s = x(null);
    br(() => {
      var v;
      return (v = s.value) == null ? void 0 : v.call(s);
    });
    const u = ro();
    function c() {
      s.value = a.value.registerEventListenersFromAttrs(u);
    }
    const y = r;
    function d(v, ...f) {
      y("modal-event", v, ...f);
    }
    return t({
      close: a.value.close,
      emit: d,
      getChildModal: a.value.getChildModal,
      getParentModal: a.value.getParentModal,
      modalContext: a.value,
      reload: a.value.reload
    }), (v, f) => (V(), Te(R(Po), {
      unmount: !1,
      show: R(a).open ?? !1,
      enter: "transition transform ease-in-out duration-300",
      "enter-from": "opacity-0 scale-95",
      "enter-to": "opacity-100 scale-100",
      leave: "transition transform ease-in-out duration-300",
      "leave-from": "opacity-100 scale-100",
      "leave-to": "opacity-0 scale-95"
    }, {
      default: ye(() => [
        $e(R(Ti), {
          "data-inertiaui-modal-id": R(a).id,
          "data-inertiaui-modal-index": R(a).index,
          class: "im-dialog relative z-20",
          onClose: l
        }, {
          default: ye(() => [
            R(a).index === 0 ? (V(), Te(R(Gt), {
              key: 0,
              as: "template",
              enter: "transition transform ease-in-out duration-300",
              "enter-from": "opacity-0",
              "enter-to": "opacity-100",
              leave: "transition transform ease-in-out duration-300",
              "leave-from": "opacity-100",
              "leave-to": "opacity-0"
            }, {
              default: ye(() => [
                $a(ze("div", uf, null, 512), [
                  [Da, R(a).onTopOfStack]
                ])
              ]),
              _: 1
            })) : De("", !0),
            R(a).index > 0 && R(a).onTopOfStack ? (V(), Ie("div", cf)) : De("", !0),
            (V(), Te(no(i.value.slideover ? sf : of), {
              "modal-context": R(a),
              "modal-props": i.value
            }, {
              default: ye(() => [
                pt(v.$slots, "default", {
                  close: R(a).close,
                  emit: d,
                  getChildModal: R(a).getChildModal,
                  getParentModal: R(a).getParentModal,
                  modalContext: R(a),
                  modalProps: i.value,
                  reload: R(a).reload
                })
              ]),
              _: 3
            }, 8, ["modal-context", "modal-props"])),
            R(o).stack.value[R(a).index + 1] ? (V(), Te(wa, {
              key: 2,
              index: R(a).index + 1
            }, null, 8, ["index"])) : De("", !0)
          ]),
          _: 3
        }, 8, ["data-inertiaui-modal-id", "data-inertiaui-modal-index"])
      ]),
      _: 3
    }, 8, ["show"]));
  }
}, gf = {
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
    const r = e, n = x(!1), o = St(), a = x(null);
    ne("modalContext", a);
    const i = t, l = x(!1);
    Ee(
      () => {
        var f;
        return (f = a.value) == null ? void 0 : f.isOnTopOfStack();
      },
      (f) => {
        a.value && (f && l.value ? i("focus") : f || i("blur"), l.value = !f);
      }
    ), j(() => {
      o.verifyRoot(), r.fragment && window.location.hash === `#${r.fragment}` && v();
    });
    const s = x(null);
    br(() => {
      var f;
      return (f = s.value) == null ? void 0 : f.call(s);
    });
    const u = ro();
    function c() {
      s.value = a.value.registerEventListenersFromAttrs(u);
    }
    Ee(a, (f, p) => {
      f && !p && (r.fragment && a.value.index === 0 && (window.location.hash = r.fragment), c(), i("success"));
    });
    function y() {
      r.fragment && a.value.index === 0 && (window.location.hash = ""), i("close");
    }
    function d() {
      a.value = null, i("after-leave");
    }
    function v() {
      n.value || (r.href.startsWith("#") || (n.value = !0, i("start")), o.visit(
        r.href,
        r.method,
        r.data,
        r.headers,
        fs(Xo(r, Xc)),
        y,
        d,
        r.queryStringArrayFormat
      ).then((f) => a.value = f).catch((f) => i("error", f)).finally(() => n.value = !1));
    }
    return (f, p) => (V(), Te(no(e.as), to(R(u), {
      href: e.href,
      onClick: La(v, ["prevent"])
    }), {
      default: ye(() => [
        pt(f.$slots, "default", { loading: n.value })
      ]),
      _: 3
    }, 16, ["href"]));
  }
}, bf = {
  __name: "ModalRoot",
  setup(e) {
    const t = St();
    return Na(() => {
      t.rootPresent.value = !0;
    }), (r, n) => (V(), Ie(Hr, null, [
      pt(r.$slots, "default"),
      R(t).stack.value.length ? (V(), Te(wa, {
        key: 0,
        index: 0
      })) : De("", !0)
    ], 64));
  }
};
function wf(e, t = {}) {
  return St().visit(
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
  vf as Modal,
  gf as ModalLink,
  bf as ModalRoot,
  ka as getConfig,
  yf as putConfig,
  mf as resetConfig,
  wf as visitModal
};
