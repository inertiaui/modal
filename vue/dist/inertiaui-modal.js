var ut = Object.defineProperty;
var dt = (e, t, n) => t in e ? ut(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var B = (e, t, n) => dt(e, typeof t != "symbol" ? t + "" : t, n);
import * as $e from "vue";
import { computed as C, provide as ge, openBlock as g, createBlock as E, unref as v, mergeProps as $, createCommentVNode as P, ref as h, onUnmounted as z, onBeforeMount as ct, watch as D, createElementBlock as j, Fragment as xe, renderSlot as O, h as W, readonly as ft, markRaw as Te, nextTick as U, inject as we, onBeforeUnmount as re, onMounted as ce, useAttrs as Re, defineComponent as A, Comment as mt, cloneVNode as pt, toRefs as je, getCurrentInstance as V, normalizeProps as vt, guardReactiveProps as yt, withCtx as x, reactive as Fe, createVNode as S, watchEffect as F, effectScope as Ue, Teleport as ht, toHandlerKey as gt, camelize as xt, normalizeStyle as wt, getCurrentScope as bt, onScopeDispose as Ct, createElementVNode as T, normalizeClass as X, Transition as be, resolveDynamicComponent as _e, withModifiers as Et, toValue as Ot } from "vue";
import { router as G, usePage as qe } from "@inertiajs/vue3";
import { mergeDataIntoQueryString as At } from "@inertiajs/core";
import ue from "axios";
const Z = {
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
class Mt {
  constructor() {
    this.config = {}, this.reset();
  }
  reset() {
    this.config = JSON.parse(JSON.stringify(Z));
  }
  put(t, n) {
    if (typeof t == "object") {
      this.config = {
        type: t.type ?? Z.type,
        navigate: t.navigate ?? Z.navigate,
        modal: { ...Z.modal, ...t.modal ?? {} },
        slideover: { ...Z.slideover, ...t.slideover ?? {} }
      };
      return;
    }
    const o = t.split(".");
    let l = this.config;
    for (let a = 0; a < o.length - 1; a++)
      l = l[o[a]] = l[o[a]] || {};
    l[o[o.length - 1]] = n;
  }
  get(t) {
    if (typeof t > "u")
      return this.config;
    const n = t.split(".");
    let o = this.config;
    for (const l of n) {
      if (o[l] === void 0)
        return null;
      o = o[l];
    }
    return o;
  }
}
const fe = new Mt(), Qn = () => fe.reset(), Yn = (e, t) => fe.put(e, t), Ce = (e) => fe.get(e), q = (e, t) => fe.get(e ? `slideover.${t}` : `modal.${t}`);
function St(e, t) {
  return Array.isArray(e) ? e.filter((n) => !t.includes(n)) : Object.keys(e).reduce((n, o) => (t.includes(o) || (n[o] = e[o]), n), {});
}
function Ke(e, t) {
  return Array.isArray(e) ? e.filter((n) => t.includes(n)) : t.reduce((n, o) => (o in e && (n[o] = e[o]), n), {});
}
function Bt(e) {
  return Array.isArray(e) ? e.filter((t) => t !== null) : Object.keys(e).reduce((t, n) => (n in e && e[n] !== null && (t[n] = e[n]), t), {});
}
function It(e, t = 3, n = 10) {
  return new Promise((o, l) => {
    const a = e();
    if (a) {
      o(a);
      return;
    }
    let s = t * 1e3 / n;
    const i = setInterval(() => {
      const u = e();
      u && (clearInterval(i), o(u)), --s <= 0 && (clearInterval(i), l(new Error("Condition not met in time")));
    }, n);
  });
}
function le(e) {
  return e ? (e = e.replace(/_/g, "-"), e = e.replace(/-+/g, "-"), /[A-Z]/.test(e) ? (e = e.replace(/\s+/g, "").replace(/_/g, "").replace(/(?:^|\s|-)+([A-Za-z])/g, (t, n) => n.toUpperCase()), e = e.replace(/(.)(?=[A-Z])/g, "$1-"), e.toLowerCase()) : e) : "";
}
const ze = {
  __name: "ModalRenderer",
  props: {
    index: {
      type: Number,
      required: !0
    }
  },
  setup(e) {
    const t = e, n = Y(), o = C(() => n.stack.value[t.index]);
    return ge("modalContext", o), (l, a) => {
      var s;
      return (s = o.value) != null && s.component ? (g(), E(v(o).component, $({ key: 0 }, o.value.props, {
        onModalEvent: a[0] || (a[0] = (i, ...u) => o.value.emit(i, ...u))
      }), null, 16)) : P("", !0);
    };
  }
}, Dt = {
  __name: "ModalRoot",
  setup(e) {
    const t = Y(), n = h(!1), o = h(null);
    z(G.on("start", () => n.value = !0)), z(G.on("finish", () => n.value = !1)), z(
      G.on("navigate", (s) => {
        const i = s.detail.page.props._inertiaui_modal;
        if (!i) {
          o.value && t.closeAll();
          return;
        }
        o.value = i, t.setBaseUrl(i.baseUrl), t.pushFromResponseData(i, {}, () => {
          if (!i.baseUrl) {
            console.error("No base url in modal response data so cannot navigate back");
            return;
          }
          !n.value && window.location.href !== i.baseUrl && G.visit(i.baseUrl, {
            preserveScroll: !0,
            preserveState: !0
          });
        });
      })
    );
    const l = (s) => (t.stack.value.length && (s.headers["X-InertiaUI-Modal-Base-Url"] = t.getBaseUrl()), s);
    ct(() => {
      ue.interceptors.request.use(l);
    }), z(() => {
      ue.interceptors.request.eject(l);
    });
    const a = qe();
    return D(
      () => {
        var s;
        return (s = a.props) == null ? void 0 : s._inertiaui_modal;
      },
      (s, i) => {
        var u;
        s && i && s.component === i.component && s.url === i.url && ((u = t.stack.value[0]) == null || u.updateProps(s.props ?? {}));
      }
    ), (s, i) => (g(), j(xe, null, [
      O(s.$slots, "default"),
      v(t).stack.value.length ? (g(), E(ze, {
        key: 0,
        index: 0
      })) : P("", !0)
    ], 64));
  }
};
let Ee = null;
const Q = h(null), b = h([]), de = h({}), $t = (e) => {
  Ee = e;
};
class Oe {
  constructor(t, n, o, l, a) {
    B(this, "update", (t, n, o) => {
      const l = this.index.value;
      l > -1 && (b.value[l].config = t, b.value[l].onCloseCallback = n, b.value[l].afterLeaveCallback = o);
    });
    B(this, "getParentModal", () => {
      const t = this.index.value;
      return t < 1 ? null : b.value.slice(0, t).reverse().find((n) => n.isOpen);
    });
    B(this, "getChildModal", () => {
      const t = this.index.value;
      return t === b.value.length - 1 ? null : b.value.slice(t + 1).find((n) => n.isOpen);
    });
    B(this, "show", () => {
      const t = this.index.value;
      if (t > -1) {
        if (b.value[t].isOpen)
          return;
        b.value[t].isOpen = !0, b.value[t].shouldRender = !0;
      }
    });
    B(this, "close", () => {
      var n;
      const t = this.index.value;
      if (t > -1) {
        if (!b.value[t].isOpen)
          return;
        Object.keys(this.listeners).forEach((o) => {
          this.off(o);
        }), b.value[t].isOpen = !1, (n = this.onCloseCallback) == null || n.call(this), this.onCloseCallback = null;
      }
    });
    B(this, "setOpen", (t) => {
      t ? this.show() : this.close();
    });
    B(this, "afterLeave", () => {
      var n;
      const t = this.index.value;
      if (t > -1) {
        if (b.value[t].isOpen)
          return;
        b.value[t].shouldRender = !1, (n = this.afterLeaveCallback) == null || n.call(this), this.afterLeaveCallback = null;
      }
      t === 0 && (b.value = []);
    });
    B(this, "on", (t, n) => {
      t = le(t), this.listeners[t] = this.listeners[t] ?? [], this.listeners[t].push(n);
    });
    B(this, "off", (t, n) => {
      var o;
      t = le(t), n ? this.listeners[t] = ((o = this.listeners[t]) == null ? void 0 : o.filter((l) => l !== n)) ?? [] : delete this.listeners[t];
    });
    B(this, "emit", (t, ...n) => {
      var o;
      (o = this.listeners[le(t)]) == null || o.forEach((l) => l(...n));
    });
    B(this, "registerEventListenersFromAttrs", (t) => {
      const n = [];
      return Object.keys(t).filter((o) => o.startsWith("on")).forEach((o) => {
        const l = le(o).replace(/^on-/, "");
        this.on(l, t[o]), n.push(() => this.off(l, t[o]));
      }), () => n.forEach((o) => o());
    });
    B(this, "reload", (t = {}) => {
      var o;
      let n = Object.keys(this.response.props);
      t.only && (n = Ke(n, t.only)), t.except && (n = St(n, t.except)), (o = this.response) != null && o.url && ue.get(this.response.url, {
        headers: {
          Accept: "text/html, application/xhtml+xml",
          "X-Inertia": !0,
          "X-Inertia-Partial-Component": this.response.component,
          "X-Inertia-Version": this.response.version,
          "X-Inertia-Partial-Data": n.join(","),
          "X-InertiaUI-Modal": !0,
          "X-InertiaUI-Modal-Use-Router": 0,
          "X-InertiaUI-Modal-Base-Url": Q.value
        }
      }).then((l) => {
        this.updateProps(l.data.props);
      });
    });
    B(this, "updateProps", (t) => {
      Object.assign(this.props.value, t);
    });
    this.id = Oe.generateId(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = t, this.props = h(n.props), this.response = n, this.config = o, this.onCloseCallback = l, this.afterLeaveCallback = a, this.index = C(() => b.value.findIndex((s) => s.id === this.id)), this.onTopOfStack = C(() => {
      var i;
      return b.value.length < 2 ? !0 : ((i = b.value.map((u) => ({ id: u.id, shouldRender: u.shouldRender })).reverse().find((u) => u.shouldRender)) == null ? void 0 : i.id) === this.id;
    });
  }
  static generateId() {
    return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `inertiaui_modal_${crypto.randomUUID()}` : `inertiaui_modal_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
function kt(e, t) {
  de.value[e] = { name: e, callback: t };
}
function Pt(e, t, n, o) {
  if (!de.value[e])
    throw new Error(`The local modal "${e}" has not been registered.`);
  const l = Ae(null, {}, t, n, o);
  return l.name = e, de.value[e].callback(l), l;
}
function Xe(e, t = {}, n = null, o = null) {
  return Ee(e.component).then((l) => Ae(Te(l), e, t, n, o));
}
function Nt(e, t, n = {}, o = {}, l = {}, a = null, s = null, i = "brackets", u = !1) {
  return new Promise((d, m) => {
    if (e.startsWith("#")) {
      d(Pt(e.substring(1), l, a, s));
      return;
    }
    const [r, f] = At(t, e || "", n, i);
    let c = u && b.value.length === 0;
    if (b.value.length === 0 && (Q.value = typeof window < "u" ? window.location.href : ""), o = {
      ...o,
      Accept: "text/html, application/xhtml+xml",
      "X-Requested-With": "XMLHttpRequest",
      "X-Inertia": !0,
      "X-Inertia-Version": qe().version,
      "X-InertiaUI-Modal": !0,
      "X-InertiaUI-Modal-Use-Router": c ? 1 : 0,
      "X-InertiaUI-Modal-Base-Url": Q.value
    }, c)
      return G.visit(r, {
        method: t,
        data: f,
        headers: o,
        preserveScroll: !0,
        preserveState: !0,
        onError: m,
        onFinish: () => It(() => b.value[0]).then((p) => {
          const y = p.onCloseCallback, w = p.afterLeaveCallback;
          p.update(
            l,
            () => {
              a == null || a(), y == null || y();
            },
            () => {
              s == null || s(), w == null || w();
            }
          ), d(p);
        })
      });
    ue({ url: r, method: t, data: f, headers: o }).then((p) => d(Xe(p.data, l, a, s))).catch(m);
  });
}
function Ae(e, t, n, o, l) {
  const a = new Oe(e, t, n, o, l);
  return b.value.push(a), U(() => {
    a.show();
  }), a;
}
const Lt = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], eo = (e, t) => (t.resolveComponent && (Ee = t.resolveComponent), () => W(Dt, () => W(e, t)));
function Y() {
  return {
    setComponentResolver: $t,
    getBaseUrl: () => Q.value,
    setBaseUrl: (e) => Q.value = e,
    stack: ft(b),
    push: Ae,
    pushFromResponseData: Xe,
    closeAll: () => [...b.value].reverse().forEach((e) => e.close()),
    reset: () => b.value = [],
    visit: Nt,
    registerLocalModal: kt,
    removeLocalModal: (e) => delete de.value[e]
  };
}
const Wt = /* @__PURE__ */ Object.assign({
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
  setup(e, { expose: t, emit: n }) {
    const o = e, l = Y(), a = o.name ? h({}) : we("modalContext"), s = C(() => {
      var p;
      const c = ((p = a.value.config) == null ? void 0 : p.slideover) ?? o.slideover ?? Ce("type") === "slideover";
      return {
        slideover: c,
        closeButton: o.closeButton ?? q(c, "closeButton"),
        closeExplicitly: o.closeExplicitly ?? q(c, "closeExplicitly"),
        maxWidth: o.maxWidth ?? q(c, "maxWidth"),
        paddingClasses: o.paddingClasses ?? q(c, "paddingClasses"),
        panelClasses: o.panelClasses ?? q(c, "panelClasses"),
        position: o.position ?? q(c, "position"),
        ...a.value.config
      };
    });
    o.name && (l.registerLocalModal(o.name, function(c) {
      a.value = c, d();
    }), re(() => {
      l.removeLocalModal(o.name);
    })), ce(() => {
      o.name || d();
    });
    const i = h(null);
    re(() => {
      var c;
      return (c = i.value) == null ? void 0 : c.call(i);
    });
    const u = Re();
    function d() {
      i.value = a.value.registerEventListenersFromAttrs(u);
    }
    const m = n;
    function r(c, ...p) {
      m("modal-event", c, ...p);
    }
    t({
      afterLeave: a.value.afterLeave,
      close: a.value.close,
      config: s.value,
      emit: r,
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
    const f = C(() => {
      var c;
      return (c = l.stack.value.find((p) => p.shouldRender && p.index > a.value.index)) == null ? void 0 : c.index;
    });
    return (c, p) => (g(), j(xe, null, [
      v(a).shouldRender ? O(c.$slots, "default", {
        key: 0,
        id: v(a).id,
        afterLeave: v(a).afterLeave,
        close: v(a).close,
        config: s.value,
        emit: r,
        getChildModal: v(a).getChildModal,
        getParentModal: v(a).getParentModal,
        index: v(a).index,
        isOpen: v(a).isOpen,
        modalContext: v(a),
        onTopOfStack: v(a).onTopOfStack,
        reload: v(a).reload,
        setOpen: v(a).setOpen,
        shouldRender: v(a).shouldRender
      }) : P("", !0),
      f.value ? (g(), E(ze, {
        key: 1,
        index: f.value
      }, null, 8, ["index"])) : P("", !0)
    ], 64));
  }
});
function Me(e, t) {
  const n = typeof e == "string" && !t ? `${e}Context` : t, o = Symbol(n);
  return [(l) => {
    const a = we(o, l);
    if (a || a === null)
      return a;
    throw new Error(
      `Injection \`${o.toString()}\` not found. Component must be used within ${Array.isArray(e) ? `one of the following components: ${e.join(
        ", "
      )}` : `\`${e}\``}`
    );
  }, (l) => (ge(o, l), l)];
}
function Ve(e, t, n) {
  const o = n.originalEvent.target, l = new CustomEvent(e, {
    bubbles: !1,
    cancelable: !0,
    detail: n
  });
  t && o.addEventListener(e, t, { once: !0 }), o.dispatchEvent(l);
}
function He(e) {
  return bt() ? (Ct(e), !0) : !1;
}
function Tt(e) {
  let t = !1, n;
  const o = Ue(!0);
  return (...l) => (t || (n = o.run(() => e(...l)), t = !0), n);
}
function Rt(e) {
  let t = 0, n, o;
  const l = () => {
    t -= 1, o && t <= 0 && (o.stop(), n = void 0, o = void 0);
  };
  return (...a) => (t += 1, n || (o = Ue(!0), n = o.run(() => e(...a))), He(l), n);
}
function Se(e) {
  return typeof e == "function" ? e() : v(e);
}
const _ = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const jt = (e) => typeof e < "u", Ft = Object.prototype.toString, Ut = (e) => Ft.call(e) === "[object Object]", _t = () => {
}, ke = /* @__PURE__ */ qt();
function qt() {
  var e, t;
  return _ && ((e = window == null ? void 0 : window.navigator) == null ? void 0 : e.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((t = window == null ? void 0 : window.navigator) == null ? void 0 : t.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function Kt(e) {
  return V();
}
function zt(e, t) {
  Kt() && re(e, t);
}
function ee(e) {
  var t;
  const n = Se(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const Je = _ ? window : void 0;
function Ze(...e) {
  let t, n, o, l;
  if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([n, o, l] = e, t = Je) : [t, n, o, l] = e, !t)
    return _t;
  Array.isArray(n) || (n = [n]), Array.isArray(o) || (o = [o]);
  const a = [], s = () => {
    a.forEach((m) => m()), a.length = 0;
  }, i = (m, r, f, c) => (m.addEventListener(r, f, c), () => m.removeEventListener(r, f, c)), u = D(
    () => [ee(t), Se(l)],
    ([m, r]) => {
      if (s(), !m)
        return;
      const f = Ut(r) ? { ...r } : r;
      a.push(
        ...n.flatMap((c) => o.map((p) => i(m, c, p, f)))
      );
    },
    { immediate: !0, flush: "post" }
  ), d = () => {
    u(), s();
  };
  return He(d), d;
}
function Xt(e) {
  return typeof e == "function" ? e : typeof e == "string" ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => !0;
}
function Vt(...e) {
  let t, n, o = {};
  e.length === 3 ? (t = e[0], n = e[1], o = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (t = !0, n = e[0], o = e[1]) : (t = e[0], n = e[1]) : (t = !0, n = e[0]);
  const {
    target: l = Je,
    eventName: a = "keydown",
    passive: s = !1,
    dedupe: i = !1
  } = o, u = Xt(t);
  return Ze(l, a, (d) => {
    d.repeat && Se(i) || u(d) && n(d);
  }, s);
}
function Ht() {
  const e = h(!1), t = V();
  return t && ce(() => {
    e.value = !0;
  }, t), e;
}
function Jt(e) {
  return JSON.parse(JSON.stringify(e));
}
function Zt(e, t, n, o = {}) {
  var l, a, s;
  const {
    clone: i = !1,
    passive: u = !1,
    eventName: d,
    deep: m = !1,
    defaultValue: r,
    shouldEmit: f
  } = o, c = V(), p = n || (c == null ? void 0 : c.emit) || ((l = c == null ? void 0 : c.$emit) == null ? void 0 : l.bind(c)) || ((s = (a = c == null ? void 0 : c.proxy) == null ? void 0 : a.$emit) == null ? void 0 : s.bind(c == null ? void 0 : c.proxy));
  let y = d;
  y = y || `update:${t.toString()}`;
  const w = (I) => i ? typeof i == "function" ? i(I) : Jt(I) : I, M = () => jt(e[t]) ? w(e[t]) : r, J = (I) => {
    f ? f(I) && p(y, I) : p(y, I);
  };
  if (u) {
    const I = M(), te = h(I);
    let ne = !1;
    return D(
      () => e[t],
      (oe) => {
        ne || (ne = !0, te.value = w(oe), U(() => ne = !1));
      }
    ), D(
      te,
      (oe) => {
        !ne && (oe !== e[t] || m) && J(oe);
      },
      { deep: m }
    ), te;
  } else
    return C({
      get() {
        return M();
      },
      set(I) {
        J(I);
      }
    });
}
function Be(e) {
  return e ? e.flatMap((t) => t.type === xe ? Be(t.children) : [t]) : [];
}
function me(e) {
  if (e === null || typeof e != "object")
    return !1;
  const t = Object.getPrototypeOf(e);
  return t !== null && t !== Object.prototype && Object.getPrototypeOf(t) !== null || Symbol.iterator in e ? !1 : Symbol.toStringTag in e ? Object.prototype.toString.call(e) === "[object Module]" : !0;
}
function he(e, t, n = ".", o) {
  if (!me(t))
    return he(e, {}, n);
  const l = Object.assign({}, t);
  for (const a in e) {
    if (a === "__proto__" || a === "constructor")
      continue;
    const s = e[a];
    s != null && (Array.isArray(s) && Array.isArray(l[a]) ? l[a] = [...s, ...l[a]] : me(s) && me(l[a]) ? l[a] = he(
      s,
      l[a],
      (n ? `${n}.` : "") + a.toString()
    ) : l[a] = s);
  }
  return l;
}
function Gt(e) {
  return (...t) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    t.reduce((n, o) => he(n, o, ""), {})
  );
}
const Qt = Gt(), [Ge, to] = Me("ConfigProvider");
let Yt = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", en = (e = 21) => {
  let t = "", n = e;
  for (; n--; )
    t += Yt[Math.random() * 64 | 0];
  return t;
};
const tn = Rt(() => {
  const e = h(/* @__PURE__ */ new Map()), t = h(), n = C(() => {
    for (const s of e.value.values())
      if (s)
        return !0;
    return !1;
  }), o = Ge({
    scrollBody: h(!0)
  });
  let l = null;
  const a = () => {
    document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.body.style.removeProperty("--scrollbar-width"), document.body.style.overflow = t.value ?? "", ke && (l == null || l()), t.value = void 0;
  };
  return D(n, (s, i) => {
    var u;
    if (!_)
      return;
    if (!s) {
      i && a();
      return;
    }
    t.value === void 0 && (t.value = document.body.style.overflow);
    const d = window.innerWidth - document.documentElement.clientWidth, m = { padding: d, margin: 0 }, r = (u = o.scrollBody) != null && u.value ? typeof o.scrollBody.value == "object" ? Qt({
      padding: o.scrollBody.value.padding === !0 ? d : o.scrollBody.value.padding,
      margin: o.scrollBody.value.margin === !0 ? d : o.scrollBody.value.margin
    }, m) : m : { padding: 0, margin: 0 };
    d > 0 && (document.body.style.paddingRight = typeof r.padding == "number" ? `${r.padding}px` : String(r.padding), document.body.style.marginRight = typeof r.margin == "number" ? `${r.margin}px` : String(r.margin), document.body.style.setProperty("--scrollbar-width", `${d}px`), document.body.style.overflow = "hidden"), ke && (l = Ze(
      document,
      "touchmove",
      (f) => {
        var c;
        f.target === document.documentElement && (f.touches.length > 1 || (c = f.preventDefault) == null || c.call(f));
      },
      { passive: !1 }
    )), U(() => {
      document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden";
    });
  }, { immediate: !0, flush: "sync" }), e;
});
function nn(e) {
  const t = en(6), n = tn();
  n.value.set(t, e);
  const o = C({
    get: () => n.value.get(t) ?? !1,
    set: (l) => n.value.set(t, l)
  });
  return zt(() => {
    n.value.delete(t);
  }), o;
}
function Ie(e) {
  const t = V(), n = t == null ? void 0 : t.type.emits, o = {};
  return n != null && n.length || console.warn(
    `No emitted event found. Please check component: ${t == null ? void 0 : t.type.__name}`
  ), n == null || n.forEach((l) => {
    o[gt(xt(l))] = (...a) => e(l, ...a);
  }), o;
}
function k() {
  const e = V(), t = h(), n = C(() => {
    var s, i;
    return ["#text", "#comment"].includes((s = t.value) == null ? void 0 : s.$el.nodeName) ? (i = t.value) == null ? void 0 : i.$el.nextElementSibling : ee(t);
  }), o = Object.assign({}, e.exposed), l = {};
  for (const s in e.props)
    Object.defineProperty(l, s, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[s]
    });
  if (Object.keys(o).length > 0)
    for (const s in o)
      Object.defineProperty(l, s, {
        enumerable: !0,
        configurable: !0,
        get: () => o[s]
      });
  Object.defineProperty(l, "$el", {
    enumerable: !0,
    configurable: !0,
    get: () => e.vnode.el
  }), e.exposed = l;
  function a(s) {
    t.value = s, !(s instanceof Element || !s) && (Object.defineProperty(l, "$el", {
      enumerable: !0,
      configurable: !0,
      get: () => s.$el
    }), e.exposed = l);
  }
  return { forwardRef: a, currentRef: t, currentElement: n };
}
var on = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, K = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakMap(), se = {}, pe = 0, Qe = function(e) {
  return e && (e.host || Qe(e.parentNode));
}, ln = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var o = Qe(n);
    return o && e.contains(o) ? o : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, an = function(e, t, n, o) {
  var l = ln(t, Array.isArray(e) ? e : [e]);
  se[n] || (se[n] = /* @__PURE__ */ new WeakMap());
  var a = se[n], s = [], i = /* @__PURE__ */ new Set(), u = new Set(l), d = function(r) {
    !r || i.has(r) || (i.add(r), d(r.parentNode));
  };
  l.forEach(d);
  var m = function(r) {
    !r || u.has(r) || Array.prototype.forEach.call(r.children, function(f) {
      if (i.has(f))
        m(f);
      else
        try {
          var c = f.getAttribute(o), p = c !== null && c !== "false", y = (K.get(f) || 0) + 1, w = (a.get(f) || 0) + 1;
          K.set(f, y), a.set(f, w), s.push(f), y === 1 && p && ae.set(f, !0), w === 1 && f.setAttribute(n, "true"), p || f.setAttribute(o, "true");
        } catch (M) {
          console.error("aria-hidden: cannot operate on ", f, M);
        }
    });
  };
  return m(t), i.clear(), pe++, function() {
    s.forEach(function(r) {
      var f = K.get(r) - 1, c = a.get(r) - 1;
      K.set(r, f), a.set(r, c), f || (ae.has(r) || r.removeAttribute(o), ae.delete(r)), c || r.removeAttribute(n);
    }), pe--, pe || (K = /* @__PURE__ */ new WeakMap(), K = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakMap(), se = {});
  };
}, sn = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var o = Array.from(Array.isArray(e) ? e : [e]), l = on(e);
  return l ? (o.push.apply(o, Array.from(l.querySelectorAll("[aria-live]"))), an(o, l, n, "aria-hidden")) : function() {
    return null;
  };
};
function rn(e) {
  let t;
  D(() => ee(e), (n) => {
    n ? t = sn(n) : t && t();
  }), z(() => {
    t && t();
  });
}
let un = 0;
function Pe(e, t = "radix") {
  const n = Ge({ useId: void 0 });
  return $e.useId ? `${t}-${$e.useId()}` : n.useId ? `${t}-${n.useId()}` : `${t}-${++un}`;
}
function dn(e, t) {
  const n = h(e);
  function o(l) {
    return t[n.value][l] ?? n.value;
  }
  return {
    state: n,
    dispatch: (l) => {
      n.value = o(l);
    }
  };
}
const De = A({
  name: "PrimitiveSlot",
  inheritAttrs: !1,
  setup(e, { attrs: t, slots: n }) {
    return () => {
      var o, l;
      if (!n.default)
        return null;
      const a = Be(n.default()), s = a.findIndex((m) => m.type !== mt);
      if (s === -1)
        return a;
      const i = a[s];
      (o = i.props) == null || delete o.ref;
      const u = i.props ? $(t, i.props) : t;
      t.class && (l = i.props) != null && l.class && delete i.props.class;
      const d = pt(i, u);
      for (const m in u)
        m.startsWith("on") && (d.props || (d.props = {}), d.props[m] = u[m]);
      return a.length === 1 ? d : (a[s] = d, a);
    };
  }
}), H = A({
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
  setup(e, { attrs: t, slots: n }) {
    const o = e.asChild ? "template" : e.as;
    return typeof o == "string" && ["area", "img", "input"].includes(o) ? () => W(o, t) : o !== "template" ? () => W(e.as, t, { default: n.default }) : () => W(De, t, { default: n.default });
  }
});
function Ye() {
  const e = h(), t = C(() => {
    var n, o;
    return ["#text", "#comment"].includes((n = e.value) == null ? void 0 : n.$el.nodeName) ? (o = e.value) == null ? void 0 : o.$el.nextElementSibling : ee(e);
  });
  return {
    primitiveElement: e,
    currentElement: t
  };
}
function cn(e, t) {
  const n = h({}), o = h("none"), l = e.value ? "mounted" : "unmounted", { state: a, dispatch: s } = dn(l, {
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
  }), i = (f) => {
    var c;
    if (_) {
      const p = new CustomEvent(f, { bubbles: !1, cancelable: !1 });
      (c = t.value) == null || c.dispatchEvent(p);
    }
  };
  D(
    e,
    async (f, c) => {
      var p;
      const y = c !== f;
      if (await U(), y) {
        const w = o.value, M = ie(t.value);
        f ? (s("MOUNT"), i("enter"), M === "none" && i("after-enter")) : M === "none" || ((p = n.value) == null ? void 0 : p.display) === "none" ? (s("UNMOUNT"), i("leave"), i("after-leave")) : c && w !== M ? (s("ANIMATION_OUT"), i("leave")) : (s("UNMOUNT"), i("after-leave"));
      }
    },
    { immediate: !0 }
  );
  const u = (f) => {
    const c = ie(t.value), p = c.includes(
      f.animationName
    ), y = a.value === "mounted" ? "enter" : "leave";
    f.target === t.value && p && (i(`after-${y}`), s("ANIMATION_END")), f.target === t.value && c === "none" && s("ANIMATION_END");
  }, d = (f) => {
    f.target === t.value && (o.value = ie(t.value));
  }, m = D(
    t,
    (f, c) => {
      f ? (n.value = getComputedStyle(f), f.addEventListener("animationstart", d), f.addEventListener("animationcancel", u), f.addEventListener("animationend", u)) : (s("ANIMATION_END"), c == null || c.removeEventListener("animationstart", d), c == null || c.removeEventListener("animationcancel", u), c == null || c.removeEventListener("animationend", u));
    },
    { immediate: !0 }
  ), r = D(a, () => {
    const f = ie(t.value);
    o.value = a.value === "mounted" ? f : "none";
  });
  return z(() => {
    m(), r();
  }), {
    isPresent: C(
      () => ["mounted", "unmountSuspended"].includes(a.value)
    )
  };
}
function ie(e) {
  return e && getComputedStyle(e).animationName || "none";
}
const et = A({
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
  setup(e, { slots: t, expose: n }) {
    var o;
    const { present: l, forceMount: a } = je(e), s = h(), { isPresent: i } = cn(l, s);
    n({ present: i });
    let u = t.default({ present: i });
    u = Be(u || []);
    const d = V();
    if (u && (u == null ? void 0 : u.length) > 1) {
      const m = (o = d == null ? void 0 : d.parent) != null && o.type.name ? `<${d.parent.type.name} />` : "component";
      throw new Error(
        [
          `Detected an invalid children for \`${m}\` for  \`Presence\` component.`,
          "",
          "Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.",
          "You can apply a few solutions:",
          [
            "Provide a single child element so that `presence` directive attach correctly.",
            "Ensure the first child is an actual element instead of a raw text node or comment node."
          ].map((r) => `  - ${r}`).join(`
`)
        ].join(`
`)
      );
    }
    return () => a.value || l.value || i.value ? W(t.default({ present: i })[0], {
      ref: (m) => {
        const r = ee(m);
        return typeof (r == null ? void 0 : r.hasAttribute) > "u" || (r != null && r.hasAttribute("data-radix-popper-content-wrapper") ? s.value = r.firstElementChild : s.value = r), r;
      }
    }) : null;
  }
}), [R, fn] = Me("DialogRoot"), mn = /* @__PURE__ */ A({
  inheritAttrs: !1,
  __name: "DialogRoot",
  props: {
    open: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: !1 },
    modal: { type: Boolean, default: !0 }
  },
  emits: ["update:open"],
  setup(e, { emit: t }) {
    const n = e, o = Zt(n, "open", t, {
      defaultValue: n.defaultOpen,
      passive: n.open === void 0
    }), l = h(), a = h(), { modal: s } = je(n);
    return fn({
      open: o,
      modal: s,
      openModal: () => {
        o.value = !0;
      },
      onOpenChange: (i) => {
        o.value = i;
      },
      onOpenToggle: () => {
        o.value = !o.value;
      },
      contentId: "",
      titleId: "",
      descriptionId: "",
      triggerElement: l,
      contentElement: a
    }), (i, u) => O(i.$slots, "default", { open: v(o) });
  }
}), pn = /* @__PURE__ */ A({
  __name: "Teleport",
  props: {
    to: { default: "body" },
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = Ht();
    return (n, o) => v(t) || n.forceMount ? (g(), E(ht, {
      key: 0,
      to: n.to,
      disabled: n.disabled
    }, [
      O(n.$slots, "default")
    ], 8, ["to", "disabled"])) : P("", !0);
  }
}), vn = /* @__PURE__ */ A({
  __name: "DialogPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = e;
    return (n, o) => (g(), E(v(pn), vt(yt(t)), {
      default: x(() => [
        O(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), yn = "dismissableLayer.pointerDownOutside", hn = "dismissableLayer.focusOutside";
function tt(e, t) {
  const n = t.closest(
    "[data-dismissable-layer]"
  ), o = e.dataset.dismissableLayer === "" ? e : e.querySelector(
    "[data-dismissable-layer]"
  ), l = Array.from(
    e.ownerDocument.querySelectorAll("[data-dismissable-layer]")
  );
  return !!(n && o === n || l.indexOf(o) < l.indexOf(n));
}
function gn(e, t) {
  var n;
  const o = ((n = t == null ? void 0 : t.value) == null ? void 0 : n.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), l = h(!1), a = h(() => {
  });
  return F((s) => {
    if (!_)
      return;
    const i = async (d) => {
      const m = d.target;
      if (t != null && t.value) {
        if (tt(t.value, m)) {
          l.value = !1;
          return;
        }
        if (d.target && !l.value) {
          let r = function() {
            Ve(
              yn,
              e,
              f
            );
          };
          const f = { originalEvent: d };
          d.pointerType === "touch" ? (o.removeEventListener("click", a.value), a.value = r, o.addEventListener("click", a.value, {
            once: !0
          })) : r();
        } else
          o.removeEventListener("click", a.value);
        l.value = !1;
      }
    }, u = window.setTimeout(() => {
      o.addEventListener("pointerdown", i);
    }, 0);
    s(() => {
      window.clearTimeout(u), o.removeEventListener("pointerdown", i), o.removeEventListener("click", a.value);
    });
  }), {
    onPointerDownCapture: () => l.value = !0
  };
}
function xn(e, t) {
  var n;
  const o = ((n = t == null ? void 0 : t.value) == null ? void 0 : n.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), l = h(!1);
  return F((a) => {
    if (!_)
      return;
    const s = async (i) => {
      t != null && t.value && (await U(), !(!t.value || tt(t.value, i.target)) && i.target && !l.value && Ve(
        hn,
        e,
        { originalEvent: i }
      ));
    };
    o.addEventListener("focusin", s), a(() => o.removeEventListener("focusin", s));
  }), {
    onFocusCapture: () => l.value = !0,
    onBlurCapture: () => l.value = !1
  };
}
const N = Fe({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), wn = /* @__PURE__ */ A({
  __name: "DismissableLayer",
  props: {
    disableOutsidePointerEvents: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "dismiss"],
  setup(e, { emit: t }) {
    const n = e, o = t, { forwardRef: l, currentElement: a } = k(), s = C(
      () => {
        var p;
        return ((p = a.value) == null ? void 0 : p.ownerDocument) ?? globalThis.document;
      }
    ), i = C(() => N.layersRoot), u = C(() => a.value ? Array.from(i.value).indexOf(a.value) : -1), d = C(() => N.layersWithOutsidePointerEventsDisabled.size > 0), m = C(() => {
      const p = Array.from(i.value), [y] = [...N.layersWithOutsidePointerEventsDisabled].slice(-1), w = p.indexOf(y);
      return u.value >= w;
    }), r = gn(async (p) => {
      const y = [...N.branches].some(
        (w) => w == null ? void 0 : w.contains(p.target)
      );
      !m.value || y || (o("pointerDownOutside", p), o("interactOutside", p), await U(), p.defaultPrevented || o("dismiss"));
    }, a), f = xn((p) => {
      [...N.branches].some(
        (y) => y == null ? void 0 : y.contains(p.target)
      ) || (o("focusOutside", p), o("interactOutside", p), p.defaultPrevented || o("dismiss"));
    }, a);
    Vt("Escape", (p) => {
      u.value === i.value.size - 1 && (o("escapeKeyDown", p), p.defaultPrevented || o("dismiss"));
    });
    let c;
    return F((p) => {
      a.value && (n.disableOutsidePointerEvents && (N.layersWithOutsidePointerEventsDisabled.size === 0 && (c = s.value.body.style.pointerEvents, s.value.body.style.pointerEvents = "none"), N.layersWithOutsidePointerEventsDisabled.add(a.value)), i.value.add(a.value), p(() => {
        n.disableOutsidePointerEvents && N.layersWithOutsidePointerEventsDisabled.size === 1 && (s.value.body.style.pointerEvents = c);
      }));
    }), F((p) => {
      p(() => {
        a.value && (i.value.delete(a.value), N.layersWithOutsidePointerEventsDisabled.delete(a.value));
      });
    }), (p, y) => (g(), E(v(H), {
      ref: v(l),
      "as-child": p.asChild,
      as: p.as,
      "data-dismissable-layer": "",
      style: wt({
        pointerEvents: d.value ? m.value ? "auto" : "none" : void 0
      }),
      onFocusCapture: v(f).onFocusCapture,
      onBlurCapture: v(f).onBlurCapture,
      onPointerdownCapture: v(r).onPointerDownCapture
    }, {
      default: x(() => [
        O(p.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as", "style", "onFocusCapture", "onBlurCapture", "onPointerdownCapture"]));
  }
}), ve = "focusScope.autoFocusOnMount", ye = "focusScope.autoFocusOnUnmount", Ne = { bubbles: !1, cancelable: !0 };
function bn(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const o of e)
    if (L(o, { select: t }), document.activeElement !== n)
      return !0;
}
function Cn(e) {
  const t = nt(e), n = Le(t, e), o = Le(t.reverse(), e);
  return [n, o];
}
function nt(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (o) => {
      const l = o.tagName === "INPUT" && o.type === "hidden";
      return o.disabled || o.hidden || l ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Le(e, t) {
  for (const n of e)
    if (!En(n, { upTo: t }))
      return n;
}
function En(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden")
    return !0;
  for (; e; ) {
    if (t !== void 0 && e === t)
      return !1;
    if (getComputedStyle(e).display === "none")
      return !0;
    e = e.parentElement;
  }
  return !1;
}
function On(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function L(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && On(e) && t && e.select();
  }
}
const An = Tt(() => h([]));
function Mn() {
  const e = An();
  return {
    add(t) {
      const n = e.value[0];
      t !== n && (n == null || n.pause()), e.value = We(e.value, t), e.value.unshift(t);
    },
    remove(t) {
      var n;
      e.value = We(e.value, t), (n = e.value[0]) == null || n.resume();
    }
  };
}
function We(e, t) {
  const n = [...e], o = n.indexOf(t);
  return o !== -1 && n.splice(o, 1), n;
}
function Sn(e) {
  return e.filter((t) => t.tagName !== "A");
}
const Bn = /* @__PURE__ */ A({
  __name: "FocusScope",
  props: {
    loop: { type: Boolean, default: !1 },
    trapped: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["mountAutoFocus", "unmountAutoFocus"],
  setup(e, { emit: t }) {
    const n = e, o = t, { currentRef: l, currentElement: a } = k(), s = h(null), i = Mn(), u = Fe({
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    });
    F((m) => {
      if (!_)
        return;
      const r = a.value;
      if (!n.trapped)
        return;
      function f(w) {
        if (u.paused || !r)
          return;
        const M = w.target;
        r.contains(M) ? s.value = M : L(s.value, { select: !0 });
      }
      function c(w) {
        if (u.paused || !r)
          return;
        const M = w.relatedTarget;
        M !== null && (r.contains(M) || L(s.value, { select: !0 }));
      }
      function p(w) {
        r.contains(s.value) || L(r);
      }
      document.addEventListener("focusin", f), document.addEventListener("focusout", c);
      const y = new MutationObserver(p);
      r && y.observe(r, { childList: !0, subtree: !0 }), m(() => {
        document.removeEventListener("focusin", f), document.removeEventListener("focusout", c), y.disconnect();
      });
    }), F(async (m) => {
      const r = a.value;
      if (await U(), !r)
        return;
      i.add(u);
      const f = document.activeElement;
      if (!r.contains(f)) {
        const c = new CustomEvent(ve, Ne);
        r.addEventListener(ve, (p) => o("mountAutoFocus", p)), r.dispatchEvent(c), c.defaultPrevented || (bn(Sn(nt(r)), {
          select: !0
        }), document.activeElement === f && L(r));
      }
      m(() => {
        r.removeEventListener(ve, (y) => o("mountAutoFocus", y));
        const c = new CustomEvent(ye, Ne), p = (y) => {
          o("unmountAutoFocus", y);
        };
        r.addEventListener(ye, p), r.dispatchEvent(c), setTimeout(() => {
          c.defaultPrevented || L(f ?? document.body, { select: !0 }), r.removeEventListener(ye, p), i.remove(u);
        }, 0);
      });
    });
    function d(m) {
      if (!n.loop && !n.trapped || u.paused)
        return;
      const r = m.key === "Tab" && !m.altKey && !m.ctrlKey && !m.metaKey, f = document.activeElement;
      if (r && f) {
        const c = m.currentTarget, [p, y] = Cn(c);
        p && y ? !m.shiftKey && f === y ? (m.preventDefault(), n.loop && L(p, { select: !0 })) : m.shiftKey && f === p && (m.preventDefault(), n.loop && L(y, { select: !0 })) : f === c && m.preventDefault();
      }
    }
    return (m, r) => (g(), E(v(H), {
      ref_key: "currentRef",
      ref: l,
      tabindex: "-1",
      "as-child": m.asChild,
      as: m.as,
      onKeydown: d
    }, {
      default: x(() => [
        O(m.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as"]));
  }
});
function In(e) {
  return e ? "open" : "closed";
}
const Dn = "DialogTitle", $n = "DialogContent";
function kn({
  titleName: e = Dn,
  contentName: t = $n,
  componentLink: n = "dialog.html#title",
  titleId: o,
  descriptionId: l,
  contentElement: a
}) {
  const s = `Warning: \`${t}\` requires a \`${e}\` for the component to be accessible for screen reader users.

If you want to hide the \`${e}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://www.radix-vue.com/components/${n}`, i = `Warning: Missing \`Description\` or \`aria-describedby="undefined"\` for ${t}.`;
  ce(() => {
    var u;
    document.getElementById(o) || console.warn(s);
    const d = (u = a.value) == null ? void 0 : u.getAttribute("aria-describedby");
    l && d && (document.getElementById(l) || console.warn(i));
  });
}
const ot = /* @__PURE__ */ A({
  __name: "DialogContentImpl",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(e, { emit: t }) {
    const n = e, o = t, l = R(), { forwardRef: a, currentElement: s } = k();
    return l.titleId || (l.titleId = Pe(void 0, "radix-vue-dialog-title")), l.descriptionId || (l.descriptionId = Pe(void 0, "radix-vue-dialog-description")), ce(() => {
      l.contentElement = s, document.activeElement !== document.body && (l.triggerElement.value = document.activeElement);
    }), process.env.NODE_ENV !== "production" && kn({
      titleName: "DialogTitle",
      contentName: "DialogContent",
      componentLink: "dialog.html#title",
      titleId: l.titleId,
      descriptionId: l.descriptionId,
      contentElement: s
    }), (i, u) => (g(), E(v(Bn), {
      "as-child": "",
      loop: "",
      trapped: n.trapFocus,
      onMountAutoFocus: u[5] || (u[5] = (d) => o("openAutoFocus", d)),
      onUnmountAutoFocus: u[6] || (u[6] = (d) => o("closeAutoFocus", d))
    }, {
      default: x(() => [
        S(v(wn), $({
          id: v(l).contentId,
          ref: v(a),
          as: i.as,
          "as-child": i.asChild,
          "disable-outside-pointer-events": i.disableOutsidePointerEvents,
          role: "dialog",
          "aria-describedby": v(l).descriptionId,
          "aria-labelledby": v(l).titleId,
          "data-state": v(In)(v(l).open.value)
        }, i.$attrs, {
          onDismiss: u[0] || (u[0] = (d) => v(l).onOpenChange(!1)),
          onEscapeKeyDown: u[1] || (u[1] = (d) => o("escapeKeyDown", d)),
          onFocusOutside: u[2] || (u[2] = (d) => o("focusOutside", d)),
          onInteractOutside: u[3] || (u[3] = (d) => o("interactOutside", d)),
          onPointerDownOutside: u[4] || (u[4] = (d) => o("pointerDownOutside", d))
        }), {
          default: x(() => [
            O(i.$slots, "default")
          ]),
          _: 3
        }, 16, ["id", "as", "as-child", "disable-outside-pointer-events", "aria-describedby", "aria-labelledby", "data-state"])
      ]),
      _: 3
    }, 8, ["trapped"]));
  }
}), Pn = /* @__PURE__ */ A({
  __name: "DialogContentModal",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(e, { emit: t }) {
    const n = e, o = t, l = R(), a = Ie(o), { forwardRef: s, currentElement: i } = k();
    return rn(i), (u, d) => (g(), E(ot, $({ ...n, ...v(a) }, {
      ref: v(s),
      "trap-focus": v(l).open.value,
      "disable-outside-pointer-events": !0,
      onCloseAutoFocus: d[0] || (d[0] = (m) => {
        var r;
        m.defaultPrevented || (m.preventDefault(), (r = v(l).triggerElement.value) == null || r.focus());
      }),
      onPointerDownOutside: d[1] || (d[1] = (m) => {
        const r = m.detail.originalEvent, f = r.button === 0 && r.ctrlKey === !0;
        (r.button === 2 || f) && m.preventDefault();
      }),
      onFocusOutside: d[2] || (d[2] = (m) => {
        m.preventDefault();
      })
    }), {
      default: x(() => [
        O(u.$slots, "default")
      ]),
      _: 3
    }, 16, ["trap-focus"]));
  }
}), Nn = /* @__PURE__ */ A({
  __name: "DialogContentNonModal",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(e, { emit: t }) {
    const n = e, o = Ie(t);
    k();
    const l = R(), a = h(!1), s = h(!1);
    return (i, u) => (g(), E(ot, $({ ...n, ...v(o) }, {
      "trap-focus": !1,
      "disable-outside-pointer-events": !1,
      onCloseAutoFocus: u[0] || (u[0] = (d) => {
        var m;
        d.defaultPrevented || (a.value || (m = v(l).triggerElement.value) == null || m.focus(), d.preventDefault()), a.value = !1, s.value = !1;
      }),
      onInteractOutside: u[1] || (u[1] = (d) => {
        var m;
        d.defaultPrevented || (a.value = !0, d.detail.originalEvent.type === "pointerdown" && (s.value = !0));
        const r = d.target;
        (m = v(l).triggerElement.value) != null && m.contains(r) && d.preventDefault(), d.detail.originalEvent.type === "focusin" && s.value && d.preventDefault();
      })
    }), {
      default: x(() => [
        O(i.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), lt = /* @__PURE__ */ A({
  __name: "DialogContent",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(e, { emit: t }) {
    const n = e, o = t, l = R(), a = Ie(o), { forwardRef: s } = k();
    return (i, u) => (g(), E(v(et), {
      present: i.forceMount || v(l).open.value
    }, {
      default: x(() => [
        v(l).modal.value ? (g(), E(Pn, $({
          key: 0,
          ref: v(s)
        }, { ...n, ...v(a), ...i.$attrs }), {
          default: x(() => [
            O(i.$slots, "default")
          ]),
          _: 3
        }, 16)) : (g(), E(Nn, $({
          key: 1,
          ref: v(s)
        }, { ...n, ...v(a), ...i.$attrs }), {
          default: x(() => [
            O(i.$slots, "default")
          ]),
          _: 3
        }, 16))
      ]),
      _: 3
    }, 8, ["present"]));
  }
}), Ln = /* @__PURE__ */ A({
  __name: "DialogOverlayImpl",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = R();
    return nn(!0), k(), (n, o) => (g(), E(v(H), {
      as: n.as,
      "as-child": n.asChild,
      "data-state": v(t).open.value ? "open" : "closed",
      style: { "pointer-events": "auto" }
    }, {
      default: x(() => [
        O(n.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child", "data-state"]));
  }
}), Wn = /* @__PURE__ */ A({
  __name: "DialogOverlay",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = R(), { forwardRef: n } = k();
    return (o, l) => {
      var a;
      return (a = v(t)) != null && a.modal.value ? (g(), E(v(et), {
        key: 0,
        present: o.forceMount || v(t).open.value
      }, {
        default: x(() => [
          S(Ln, $(o.$attrs, {
            ref: v(n),
            as: o.as,
            "as-child": o.asChild
          }), {
            default: x(() => [
              O(o.$slots, "default")
            ]),
            _: 3
          }, 16, ["as", "as-child"])
        ]),
        _: 3
      }, 8, ["present"])) : P("", !0);
    };
  }
}), Tn = /* @__PURE__ */ A({
  __name: "DialogClose",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(e) {
    const t = e;
    k();
    const n = R();
    return (o, l) => (g(), E(v(H), $(t, {
      type: o.as === "button" ? "button" : void 0,
      onClick: l[0] || (l[0] = (a) => v(n).onOpenChange(!1))
    }), {
      default: x(() => [
        O(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["type"]));
  }
}), at = /* @__PURE__ */ A({
  __name: "DialogTitle",
  props: {
    asChild: { type: Boolean },
    as: { default: "h2" }
  },
  setup(e) {
    const t = e, n = R();
    return k(), (o, l) => (g(), E(v(H), $(t, {
      id: v(n).titleId
    }), {
      default: x(() => [
        O(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["id"]));
  }
}), st = /* @__PURE__ */ A({
  __name: "VisuallyHidden",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(e) {
    return k(), (t, n) => (g(), E(v(H), {
      as: t.as,
      "as-child": t.asChild,
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
      default: x(() => [
        O(t.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
}), [it, no] = Me("CollectionProvider");
A({
  name: "CollectionSlot",
  setup(e, { slots: t }) {
    const n = it(), { primitiveElement: o, currentElement: l } = Ye();
    return D(l, () => {
      n.collectionRef.value = l.value;
    }), () => W(De, { ref: o }, t);
  }
});
A({
  name: "CollectionItem",
  inheritAttrs: !1,
  props: {
    value: {
      // It accepts any value
      validator: () => !0
    }
  },
  setup(e, { slots: t, attrs: n }) {
    const o = it(), { primitiveElement: l, currentElement: a } = Ye();
    return F((s) => {
      if (a.value) {
        const i = Te(a.value);
        o.itemMap.value.set(i, { ref: a.value, value: e.value }), s(() => o.itemMap.value.delete(i));
      }
    }), () => W(De, { ...n, [o.attrName]: "", ref: l }, t);
  }
});
function Rn() {
  if (typeof matchMedia == "function")
    return matchMedia("(pointer:coarse)").matches ? "coarse" : "fine";
}
Rn();
const rt = {
  __name: "CloseButton",
  setup(e) {
    return (t, n) => (g(), E(v(Tn), { class: "im-close-button text-gray-400 hover:text-gray-500" }, {
      default: x(() => n[0] || (n[0] = [
        T("span", { class: "sr-only" }, "Close", -1),
        T("svg", {
          class: "size-6",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "2",
          stroke: "currentColor",
          "aria-hidden": "true"
        }, [
          T("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M6 18L18 6M6 6l12 12"
          })
        ], -1)
      ])),
      _: 1
    }));
  }
}, jn = { class: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4" }, Fn = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, Un = {
  __name: "ModalContent",
  props: {
    modalContext: Object,
    config: Object
  },
  setup(e) {
    return (t, n) => (g(), j("div", jn, [
      T("div", {
        class: X(["im-modal-positioner flex min-h-full justify-center", {
          "items-start": e.config.position === "top",
          "items-center": e.config.position === "center",
          "items-end": e.config.position === "bottom"
        }])
      }, [
        S(be, {
          appear: "",
          "enter-from-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          "enter-to-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-from-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-to-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          onAfterLeave: e.modalContext.afterLeave
        }, {
          default: x(() => [
            S(v(lt), {
              "aria-describedby": void 0,
              class: X({
                "im-modal-wrapper w-full transition duration-300 ease-in-out": !0,
                "blur-sm": !e.modalContext.onTopOfStack,
                "sm:max-w-sm": e.config.maxWidth == "sm",
                "sm:max-w-md": e.config.maxWidth == "md",
                "sm:max-w-md md:max-w-lg": e.config.maxWidth == "lg",
                "sm:max-w-md md:max-w-xl": e.config.maxWidth == "xl",
                "sm:max-w-md md:max-w-xl lg:max-w-2xl": e.config.maxWidth == "2xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl": e.config.maxWidth == "3xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl": e.config.maxWidth == "4xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl": e.config.maxWidth == "5xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl": e.config.maxWidth == "6xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl": e.config.maxWidth == "7xl"
              }),
              onEscapeKeyDown: n[0] || (n[0] = (o) => {
                var l;
                return ((l = e.config) == null ? void 0 : l.closeExplicitly) && o.preventDefault();
              }),
              onInteractOutside: n[1] || (n[1] = (o) => {
                var l;
                return ((l = e.config) == null ? void 0 : l.closeExplicitly) && o.preventDefault();
              })
            }, {
              default: x(() => [
                S(v(st), { "as-child": "" }, {
                  default: x(() => [
                    S(v(at))
                  ]),
                  _: 1
                }),
                T("div", {
                  class: X(["im-modal-content relative", [e.config.paddingClasses, e.config.panelClasses]])
                }, [
                  e.config.closeButton ? (g(), j("div", Fn, [
                    S(rt)
                  ])) : P("", !0),
                  O(t.$slots, "default", {
                    modalContext: e.modalContext,
                    config: e.config
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
}, _n = { class: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden" }, qn = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, Kn = {
  __name: "SlideoverContent",
  props: {
    modalContext: Object,
    config: Object
  },
  setup(e) {
    return (t, n) => (g(), j("div", _n, [
      T("div", {
        class: X(["im-slideover-positioner flex min-h-full items-center", {
          "justify-start rtl:justify-end": e.config.position === "left",
          "justify-end rtl:justify-start": e.config.position === "right"
        }])
      }, [
        S(be, {
          appear: "",
          "enter-from-class": "opacity-0 " + (e.config.position === "left" ? "-translate-x-full" : "translate-x-full"),
          "enter-to-class": "opacity-100 translate-x-0",
          "leave-from-class": "opacity-100 translate-x-0",
          "leave-to-class": "opacity-0 " + (e.config.position === "left" ? "-translate-x-full" : "translate-x-full"),
          onAfterLeave: e.modalContext.afterLeave
        }, {
          default: x(() => [
            S(v(lt), {
              "aria-describedby": void 0,
              class: X({
                "im-slideover-wrapper w-full transition duration-300 ease-in-out": !0,
                "blur-sm": !e.modalContext.onTopOfStack,
                "sm:max-w-sm": e.config.maxWidth == "sm",
                "sm:max-w-md": e.config.maxWidth == "md",
                "sm:max-w-md md:max-w-lg": e.config.maxWidth == "lg",
                "sm:max-w-md md:max-w-xl": e.config.maxWidth == "xl",
                "sm:max-w-md md:max-w-xl lg:max-w-2xl": e.config.maxWidth == "2xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl": e.config.maxWidth == "3xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl": e.config.maxWidth == "4xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl": e.config.maxWidth == "5xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl": e.config.maxWidth == "6xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl": e.config.maxWidth == "7xl"
              }),
              onEscapeKeyDown: n[0] || (n[0] = (o) => {
                var l;
                return ((l = e.config) == null ? void 0 : l.closeExplicitly) && o.preventDefault();
              }),
              onInteractOutside: n[1] || (n[1] = (o) => {
                var l;
                return ((l = e.config) == null ? void 0 : l.closeExplicitly) && o.preventDefault();
              })
            }, {
              default: x(() => [
                S(v(st), { "as-child": "" }, {
                  default: x(() => [
                    S(v(at))
                  ]),
                  _: 1
                }),
                T("div", {
                  class: X(["im-slideover-content relative", [e.config.paddingClasses, e.config.panelClasses]])
                }, [
                  e.config.closeButton ? (g(), j("div", qn, [
                    S(rt)
                  ])) : P("", !0),
                  O(t.$slots, "default", {
                    modalContext: e.modalContext,
                    config: e.config
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
}, zn = ["data-inertiaui-modal-id", "data-inertiaui-modal-index"], Xn = {
  key: 1,
  class: "im-backdrop fixed inset-0 z-30 bg-black/75"
}, oo = {
  __name: "Modal",
  setup(e, { expose: t }) {
    const n = h(null), o = h(!1);
    return t({
      afterLeave: () => {
        var l;
        return (l = n.value) == null ? void 0 : l.afterLeave();
      },
      close: () => {
        var l;
        return (l = n.value) == null ? void 0 : l.close();
      },
      config: C(() => {
        var l;
        return (l = n.value) == null ? void 0 : l.config;
      }),
      emit: (...l) => {
        var a;
        return (a = n.value) == null ? void 0 : a.emit(...l);
      },
      getChildModal: () => {
        var l;
        return (l = n.value) == null ? void 0 : l.getChildModal();
      },
      getParentModal: () => {
        var l;
        return (l = n.value) == null ? void 0 : l.getParentModal();
      },
      id: C(() => {
        var l;
        return (l = n.value) == null ? void 0 : l.id;
      }),
      index: C(() => {
        var l;
        return (l = n.value) == null ? void 0 : l.index;
      }),
      isOpen: C(() => {
        var l;
        return (l = n.value) == null ? void 0 : l.isOpen;
      }),
      modalContext: C(() => {
        var l;
        return (l = n.value) == null ? void 0 : l.modalContext;
      }),
      onTopOfStack: C(() => {
        var l;
        return (l = n.value) == null ? void 0 : l.onTopOfStack;
      }),
      reload: (...l) => {
        var a;
        return (a = n.value) == null ? void 0 : a.reload(...l);
      },
      setOpen: (...l) => {
        var a;
        return (a = n.value) == null ? void 0 : a.setOpen(...l);
      },
      shouldRender: C(() => {
        var l;
        return (l = n.value) == null ? void 0 : l.shouldRender;
      })
    }), (l, a) => (g(), E(Wt, {
      ref_key: "modal",
      ref: n
    }, {
      default: x(({
        afterLeave: s,
        close: i,
        config: u,
        emit: d,
        getChildModal: m,
        getParentModal: r,
        id: f,
        index: c,
        isOpen: p,
        modalContext: y,
        onTopOfStack: w,
        reload: M,
        setOpen: J,
        shouldRender: I
      }) => [
        S(v(mn), {
          open: p,
          "onUpdate:open": J
        }, {
          default: x(() => [
            S(v(vn), null, {
              default: x(() => [
                T("div", {
                  "data-inertiaui-modal-id": f,
                  "data-inertiaui-modal-index": c,
                  class: "im-dialog relative z-20"
                }, [
                  c === 0 && w ? (g(), E(be, {
                    key: 0,
                    appear: !o.value,
                    "enter-active-class": "transition transform ease-in-out duration-300",
                    "enter-from-class": "opacity-0",
                    "enter-to-class": "opacity-100",
                    "leave-active-class": "transition transform ease-in-out duration-300",
                    "leave-from-class": "opacity-100",
                    "leave-to-class": "opacity-0",
                    onAfterAppear: a[0] || (a[0] = (te) => o.value = !0)
                  }, {
                    default: x(() => [
                      S(v(Wn), { class: "im-backdrop fixed inset-0 z-30 bg-black/75" })
                    ]),
                    _: 1
                  }, 8, ["appear"])) : P("", !0),
                  c > 0 && w ? (g(), j("div", Xn)) : P("", !0),
                  (g(), E(_e(u != null && u.slideover ? Kn : Un), {
                    "modal-context": y,
                    config: u
                  }, {
                    default: x(() => [
                      O(l.$slots, "default", {
                        id: f,
                        afterLeave: s,
                        close: i,
                        config: u,
                        emit: d,
                        getChildModal: m,
                        getParentModal: r,
                        index: c,
                        isOpen: p,
                        modalContext: y,
                        onTopOfStack: w,
                        reload: M,
                        setOpen: J,
                        shouldRender: I
                      })
                    ]),
                    _: 2
                  }, 1032, ["modal-context", "config"]))
                ], 8, zn)
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
}, lo = {
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
  setup(e, { emit: t }) {
    const n = e, o = h(!1), l = Y(), a = h(null);
    ge("modalContext", a);
    const s = t, i = h(!1), u = C(() => n.navigate ?? Ce("navigate"));
    D(
      () => {
        var y;
        return (y = a.value) == null ? void 0 : y.onTopOfStack;
      },
      (y) => {
        a.value && (y && i.value ? s("focus") : y || s("blur"), i.value = !y);
      }
    );
    const d = h(null);
    re(() => {
      var y;
      return (y = d.value) == null ? void 0 : y.call(d);
    });
    const m = Re();
    function r() {
      d.value = a.value.registerEventListenersFromAttrs(m);
    }
    D(a, (y, w) => {
      y && !w && (r(), s("success"));
    });
    function f() {
      s("close");
    }
    function c() {
      a.value = null, s("after-leave");
    }
    function p() {
      o.value || (n.href.startsWith("#") || (o.value = !0, s("start")), l.visit(
        n.href,
        n.method,
        n.data,
        n.headers,
        Bt(Ke(n, Lt)),
        f,
        c,
        n.queryStringArrayFormat,
        u.value
      ).then((y) => {
        a.value = y;
      }).catch((y) => s("error", y)).finally(() => o.value = !1));
    }
    return (y, w) => (g(), E(_e(e.as), $(v(m), {
      href: e.href,
      onClick: Et(p, ["prevent"])
    }), {
      default: x(() => [
        O(y.$slots, "default", { loading: o.value })
      ]),
      _: 3
    }, 16, ["href"]));
  }
};
function ao() {
  return Ot(we("modalContext", null));
}
function so(e, t = {}) {
  return Y().visit(
    e,
    t.method ?? "get",
    t.data ?? {},
    t.headers ?? {},
    t.config ?? {},
    t.onClose,
    t.onAfterLeave,
    t.queryStringArrayFormat ?? "brackets",
    t.navigate ?? Ce("navigate")
  ).then((n) => {
    const o = t.listeners ?? {};
    return Object.keys(o).forEach((l) => {
      const a = l.replace(/([A-Z])/g, "-$1").toLowerCase();
      n.on(a, o[l]);
    }), n;
  });
}
export {
  Wt as HeadlessModal,
  oo as Modal,
  lo as ModalLink,
  Dt as ModalRoot,
  Ce as getConfig,
  Yn as putConfig,
  eo as renderApp,
  Qn as resetConfig,
  ao as useModal,
  so as visitModal
};
