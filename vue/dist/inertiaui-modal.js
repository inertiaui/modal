var dt = Object.defineProperty;
var ct = (e, t, n) => t in e ? dt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var B = (e, t, n) => ct(e, typeof t != "symbol" ? t + "" : t, n);
import * as $e from "vue";
import { computed as C, provide as xe, openBlock as g, createBlock as E, unref as v, mergeProps as $, createCommentVNode as k, ref as h, onUnmounted as X, onBeforeMount as ft, watch as I, createElementBlock as j, Fragment as we, renderSlot as O, h as W, readonly as mt, markRaw as Te, nextTick as U, inject as be, onBeforeUnmount as re, onMounted as ce, useAttrs as Fe, defineComponent as A, Comment as pt, cloneVNode as vt, toRefs as je, getCurrentInstance as V, normalizeProps as yt, guardReactiveProps as ht, withCtx as x, reactive as Re, createVNode as S, watchEffect as R, effectScope as Ue, Teleport as gt, toHandlerKey as xt, camelize as wt, normalizeStyle as bt, getCurrentScope as Ct, onScopeDispose as Et, createElementVNode as T, normalizeClass as z, Transition as Ce, resolveDynamicComponent as _e, withModifiers as Ot, toValue as At } from "vue";
import { router as Y, usePage as qe } from "@inertiajs/vue3";
import { mergeDataIntoQueryString as Mt } from "@inertiajs/core";
import ue from "axios";
const J = {
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
class St {
  constructor() {
    this.config = {}, this.reset();
  }
  reset() {
    this.config = JSON.parse(JSON.stringify(J));
  }
  put(t, n) {
    if (typeof t == "object") {
      this.config = {
        type: t.type ?? J.type,
        navigate: t.navigate ?? J.navigate,
        modal: { ...J.modal, ...t.modal ?? {} },
        slideover: { ...J.slideover, ...t.slideover ?? {} }
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
const fe = new St(), eo = () => fe.reset(), to = (e, t) => fe.put(e, t), Ee = (e) => fe.get(e), q = (e, t) => fe.get(e ? `slideover.${t}` : `modal.${t}`);
function Bt(e, t) {
  return Array.isArray(e) ? e.filter((n) => !t.includes(n)) : Object.keys(e).reduce((n, o) => (t.includes(o) || (n[o] = e[o]), n), {});
}
function Ke(e, t) {
  return Array.isArray(e) ? e.filter((n) => t.includes(n)) : t.reduce((n, o) => (o in e && (n[o] = e[o]), n), {});
}
function Dt(e) {
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
const Xe = {
  __name: "ModalRenderer",
  props: {
    index: {
      type: Number,
      required: !0
    }
  },
  setup(e) {
    const t = e, n = G(), o = C(() => n.stack.value[t.index]);
    return xe("modalContext", o), (l, a) => {
      var s;
      return (s = o.value) != null && s.component ? (g(), E(v(o).component, $({ key: 0 }, o.value.props, {
        onModalEvent: a[0] || (a[0] = (i, ...u) => o.value.emit(i, ...u))
      }), null, 16)) : k("", !0);
    };
  }
}, $t = {
  __name: "ModalRoot",
  setup(e) {
    const t = G(), n = h(!1), o = h(null);
    X(Y.on("start", () => n.value = !0)), X(Y.on("finish", () => n.value = !1)), X(
      Y.on("navigate", (s) => {
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
          !n.value && window.location.href !== i.baseUrl && Y.visit(i.baseUrl, {
            preserveScroll: !0,
            preserveState: !0
          });
        });
      })
    );
    const l = (s) => (t.stack.value.length && (s.headers["X-InertiaUI-Modal-Base-Url"] = t.getBaseUrl()), s);
    ft(() => {
      ue.interceptors.request.use(l);
    }), X(() => {
      ue.interceptors.request.eject(l);
    });
    const a = qe();
    return I(
      () => {
        var s;
        return (s = a.props) == null ? void 0 : s._inertiaui_modal;
      },
      (s, i) => {
        var u;
        s && i && s.component === i.component && s.url === i.url && ((u = t.stack.value[0]) == null || u.updateProps(s.props ?? {}));
      }
    ), (s, i) => (g(), j(we, null, [
      O(s.$slots, "default"),
      v(t).stack.value.length ? (g(), E(Xe, {
        key: 0,
        index: 0
      })) : k("", !0)
    ], 64));
  }
};
let me = null;
const Q = h(null), b = h([]), de = h({}), Pt = (e) => {
  me = e;
}, no = (e) => {
  e.resolveComponent && (me = e.resolveComponent);
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
      t.only && (n = Ke(n, t.only)), t.except && (n = Bt(n, t.except)), (o = this.response) != null && o.url && ue.get(this.response.url, {
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
function Nt(e, t, n, o) {
  if (!de.value[e])
    throw new Error(`The local modal "${e}" has not been registered.`);
  const l = Ae(null, {}, t, n, o);
  return l.name = e, de.value[e].callback(l), l;
}
function ze(e, t = {}, n = null, o = null) {
  return me(e.component).then((l) => Ae(Te(l), e, t, n, o));
}
function Lt(e, t, n = {}, o = {}, l = {}, a = null, s = null, i = "brackets", u = !1) {
  return new Promise((d, f) => {
    if (e.startsWith("#")) {
      d(Nt(e.substring(1), l, a, s));
      return;
    }
    const [r, m] = Mt(t, e || "", n, i);
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
      return Y.visit(r, {
        method: t,
        data: m,
        headers: o,
        preserveScroll: !0,
        preserveState: !0,
        onError: f,
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
    ue({ url: r, method: t, data: m, headers: o }).then((p) => d(ze(p.data, l, a, s))).catch(f);
  });
}
function Ae(e, t, n, o, l) {
  const a = new Oe(e, t, n, o, l);
  return b.value.push(a), U(() => {
    a.show();
  }), a;
}
const Wt = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], oo = (e, t) => (t.resolveComponent && (me = t.resolveComponent), () => W($t, () => W(e, t)));
function G() {
  return {
    setComponentResolver: Pt,
    getBaseUrl: () => Q.value,
    setBaseUrl: (e) => Q.value = e,
    stack: mt(b),
    push: Ae,
    pushFromResponseData: ze,
    closeAll: () => [...b.value].reverse().forEach((e) => e.close()),
    reset: () => b.value = [],
    visit: Lt,
    registerLocalModal: kt,
    removeLocalModal: (e) => delete de.value[e]
  };
}
const Tt = /* @__PURE__ */ Object.assign({
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
    const o = e, l = G(), a = o.name ? h({}) : be("modalContext"), s = C(() => {
      var p;
      const c = ((p = a.value.config) == null ? void 0 : p.slideover) ?? o.slideover ?? Ee("type") === "slideover";
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
    const u = Fe();
    function d() {
      i.value = a.value.registerEventListenersFromAttrs(u);
    }
    const f = n;
    function r(c, ...p) {
      f("modal-event", c, ...p);
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
    const m = C(() => {
      var c;
      return (c = l.stack.value.find((p) => p.shouldRender && p.index > a.value.index)) == null ? void 0 : c.index;
    });
    return (c, p) => (g(), j(we, null, [
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
      }) : k("", !0),
      m.value ? (g(), E(Xe, {
        key: 1,
        index: m.value
      }, null, 8, ["index"])) : k("", !0)
    ], 64));
  }
});
function Me(e, t) {
  const n = typeof e == "string" && !t ? `${e}Context` : t, o = Symbol(n);
  return [(l) => {
    const a = be(o, l);
    if (a || a === null)
      return a;
    throw new Error(
      `Injection \`${o.toString()}\` not found. Component must be used within ${Array.isArray(e) ? `one of the following components: ${e.join(
        ", "
      )}` : `\`${e}\``}`
    );
  }, (l) => (xe(o, l), l)];
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
  return Ct() ? (Et(e), !0) : !1;
}
function Ft(e) {
  let t = !1, n;
  const o = Ue(!0);
  return (...l) => (t || (n = o.run(() => e(...l)), t = !0), n);
}
function jt(e) {
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
const Rt = (e) => typeof e < "u", Ut = Object.prototype.toString, _t = (e) => Ut.call(e) === "[object Object]", qt = () => {
}, Pe = /* @__PURE__ */ Kt();
function Kt() {
  var e, t;
  return _ && ((e = window == null ? void 0 : window.navigator) == null ? void 0 : e.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((t = window == null ? void 0 : window.navigator) == null ? void 0 : t.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function Xt(e) {
  return V();
}
function zt(e, t) {
  Xt() && re(e, t);
}
function ee(e) {
  var t;
  const n = Se(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const Ze = _ ? window : void 0;
function Je(...e) {
  let t, n, o, l;
  if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([n, o, l] = e, t = Ze) : [t, n, o, l] = e, !t)
    return qt;
  Array.isArray(n) || (n = [n]), Array.isArray(o) || (o = [o]);
  const a = [], s = () => {
    a.forEach((f) => f()), a.length = 0;
  }, i = (f, r, m, c) => (f.addEventListener(r, m, c), () => f.removeEventListener(r, m, c)), u = I(
    () => [ee(t), Se(l)],
    ([f, r]) => {
      if (s(), !f)
        return;
      const m = _t(r) ? { ...r } : r;
      a.push(
        ...n.flatMap((c) => o.map((p) => i(f, c, p, m)))
      );
    },
    { immediate: !0, flush: "post" }
  ), d = () => {
    u(), s();
  };
  return He(d), d;
}
function Vt(e) {
  return typeof e == "function" ? e : typeof e == "string" ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => !0;
}
function Ht(...e) {
  let t, n, o = {};
  e.length === 3 ? (t = e[0], n = e[1], o = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (t = !0, n = e[0], o = e[1]) : (t = e[0], n = e[1]) : (t = !0, n = e[0]);
  const {
    target: l = Ze,
    eventName: a = "keydown",
    passive: s = !1,
    dedupe: i = !1
  } = o, u = Vt(t);
  return Je(l, a, (d) => {
    d.repeat && Se(i) || u(d) && n(d);
  }, s);
}
function Zt() {
  const e = h(!1), t = V();
  return t && ce(() => {
    e.value = !0;
  }, t), e;
}
function Jt(e) {
  return JSON.parse(JSON.stringify(e));
}
function Yt(e, t, n, o = {}) {
  var l, a, s;
  const {
    clone: i = !1,
    passive: u = !1,
    eventName: d,
    deep: f = !1,
    defaultValue: r,
    shouldEmit: m
  } = o, c = V(), p = n || (c == null ? void 0 : c.emit) || ((l = c == null ? void 0 : c.$emit) == null ? void 0 : l.bind(c)) || ((s = (a = c == null ? void 0 : c.proxy) == null ? void 0 : a.$emit) == null ? void 0 : s.bind(c == null ? void 0 : c.proxy));
  let y = d;
  y = y || `update:${t.toString()}`;
  const w = (D) => i ? typeof i == "function" ? i(D) : Jt(D) : D, M = () => Rt(e[t]) ? w(e[t]) : r, Z = (D) => {
    m ? m(D) && p(y, D) : p(y, D);
  };
  if (u) {
    const D = M(), te = h(D);
    let ne = !1;
    return I(
      () => e[t],
      (oe) => {
        ne || (ne = !0, te.value = w(oe), U(() => ne = !1));
      }
    ), I(
      te,
      (oe) => {
        !ne && (oe !== e[t] || f) && Z(oe);
      },
      { deep: f }
    ), te;
  } else
    return C({
      get() {
        return M();
      },
      set(D) {
        Z(D);
      }
    });
}
function Be(e) {
  return e ? e.flatMap((t) => t.type === we ? Be(t.children) : [t]) : [];
}
function pe(e) {
  if (e === null || typeof e != "object")
    return !1;
  const t = Object.getPrototypeOf(e);
  return t !== null && t !== Object.prototype && Object.getPrototypeOf(t) !== null || Symbol.iterator in e ? !1 : Symbol.toStringTag in e ? Object.prototype.toString.call(e) === "[object Module]" : !0;
}
function ge(e, t, n = ".", o) {
  if (!pe(t))
    return ge(e, {}, n);
  const l = Object.assign({}, t);
  for (const a in e) {
    if (a === "__proto__" || a === "constructor")
      continue;
    const s = e[a];
    s != null && (Array.isArray(s) && Array.isArray(l[a]) ? l[a] = [...s, ...l[a]] : pe(s) && pe(l[a]) ? l[a] = ge(
      s,
      l[a],
      (n ? `${n}.` : "") + a.toString()
    ) : l[a] = s);
  }
  return l;
}
function Qt(e) {
  return (...t) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    t.reduce((n, o) => ge(n, o, ""), {})
  );
}
const Gt = Qt(), [Ye, lo] = Me("ConfigProvider");
let en = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", tn = (e = 21) => {
  let t = "", n = e;
  for (; n--; )
    t += en[Math.random() * 64 | 0];
  return t;
};
const nn = jt(() => {
  const e = h(/* @__PURE__ */ new Map()), t = h(), n = C(() => {
    for (const s of e.value.values())
      if (s)
        return !0;
    return !1;
  }), o = Ye({
    scrollBody: h(!0)
  });
  let l = null;
  const a = () => {
    document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.body.style.removeProperty("--scrollbar-width"), document.body.style.overflow = t.value ?? "", Pe && (l == null || l()), t.value = void 0;
  };
  return I(n, (s, i) => {
    var u;
    if (!_)
      return;
    if (!s) {
      i && a();
      return;
    }
    t.value === void 0 && (t.value = document.body.style.overflow);
    const d = window.innerWidth - document.documentElement.clientWidth, f = { padding: d, margin: 0 }, r = (u = o.scrollBody) != null && u.value ? typeof o.scrollBody.value == "object" ? Gt({
      padding: o.scrollBody.value.padding === !0 ? d : o.scrollBody.value.padding,
      margin: o.scrollBody.value.margin === !0 ? d : o.scrollBody.value.margin
    }, f) : f : { padding: 0, margin: 0 };
    d > 0 && (document.body.style.paddingRight = typeof r.padding == "number" ? `${r.padding}px` : String(r.padding), document.body.style.marginRight = typeof r.margin == "number" ? `${r.margin}px` : String(r.margin), document.body.style.setProperty("--scrollbar-width", `${d}px`), document.body.style.overflow = "hidden"), Pe && (l = Je(
      document,
      "touchmove",
      (m) => ln(m),
      { passive: !1 }
    )), U(() => {
      document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden";
    });
  }, { immediate: !0, flush: "sync" }), e;
});
function on(e) {
  const t = tn(6), n = nn();
  n.value.set(t, e);
  const o = C({
    get: () => n.value.get(t) ?? !1,
    set: (l) => n.value.set(t, l)
  });
  return zt(() => {
    n.value.delete(t);
  }), o;
}
function Qe(e) {
  const t = window.getComputedStyle(e);
  if (t.overflowX === "scroll" || t.overflowY === "scroll" || t.overflowX === "auto" && e.clientWidth < e.scrollWidth || t.overflowY === "auto" && e.clientHeight < e.scrollHeight)
    return !0;
  {
    const n = e.parentNode;
    return !n || n.tagName === "BODY" ? !1 : Qe(n);
  }
}
function ln(e) {
  const t = e || window.event, n = t.target;
  return Qe(n) ? !1 : t.touches.length > 1 ? !0 : (t.preventDefault && t.cancelable && t.preventDefault(), !1);
}
function De(e) {
  const t = V(), n = t == null ? void 0 : t.type.emits, o = {};
  return n != null && n.length || console.warn(
    `No emitted event found. Please check component: ${t == null ? void 0 : t.type.__name}`
  ), n == null || n.forEach((l) => {
    o[xt(wt(l))] = (...a) => e(l, ...a);
  }), o;
}
function P() {
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
var an = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, K = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakMap(), se = {}, ve = 0, Ge = function(e) {
  return e && (e.host || Ge(e.parentNode));
}, sn = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var o = Ge(n);
    return o && e.contains(o) ? o : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, rn = function(e, t, n, o) {
  var l = sn(t, Array.isArray(e) ? e : [e]);
  se[n] || (se[n] = /* @__PURE__ */ new WeakMap());
  var a = se[n], s = [], i = /* @__PURE__ */ new Set(), u = new Set(l), d = function(r) {
    !r || i.has(r) || (i.add(r), d(r.parentNode));
  };
  l.forEach(d);
  var f = function(r) {
    !r || u.has(r) || Array.prototype.forEach.call(r.children, function(m) {
      if (i.has(m))
        f(m);
      else
        try {
          var c = m.getAttribute(o), p = c !== null && c !== "false", y = (K.get(m) || 0) + 1, w = (a.get(m) || 0) + 1;
          K.set(m, y), a.set(m, w), s.push(m), y === 1 && p && ae.set(m, !0), w === 1 && m.setAttribute(n, "true"), p || m.setAttribute(o, "true");
        } catch (M) {
          console.error("aria-hidden: cannot operate on ", m, M);
        }
    });
  };
  return f(t), i.clear(), ve++, function() {
    s.forEach(function(r) {
      var m = K.get(r) - 1, c = a.get(r) - 1;
      K.set(r, m), a.set(r, c), m || (ae.has(r) || r.removeAttribute(o), ae.delete(r)), c || r.removeAttribute(n);
    }), ve--, ve || (K = /* @__PURE__ */ new WeakMap(), K = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakMap(), se = {});
  };
}, un = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var o = Array.from(Array.isArray(e) ? e : [e]), l = an(e);
  return l ? (o.push.apply(o, Array.from(l.querySelectorAll("[aria-live]"))), rn(o, l, n, "aria-hidden")) : function() {
    return null;
  };
};
function dn(e) {
  let t;
  I(() => ee(e), (n) => {
    n ? t = un(n) : t && t();
  }), X(() => {
    t && t();
  });
}
let cn = 0;
function ke(e, t = "radix") {
  const n = Ye({ useId: void 0 });
  return $e.useId ? `${t}-${$e.useId()}` : n.useId ? `${t}-${n.useId()}` : `${t}-${++cn}`;
}
function fn(e, t) {
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
const Ie = A({
  name: "PrimitiveSlot",
  inheritAttrs: !1,
  setup(e, { attrs: t, slots: n }) {
    return () => {
      var o, l;
      if (!n.default)
        return null;
      const a = Be(n.default()), s = a.findIndex((f) => f.type !== pt);
      if (s === -1)
        return a;
      const i = a[s];
      (o = i.props) == null || delete o.ref;
      const u = i.props ? $(t, i.props) : t;
      t.class && (l = i.props) != null && l.class && delete i.props.class;
      const d = vt(i, u);
      for (const f in u)
        f.startsWith("on") && (d.props || (d.props = {}), d.props[f] = u[f]);
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
    return typeof o == "string" && ["area", "img", "input"].includes(o) ? () => W(o, t) : o !== "template" ? () => W(e.as, t, { default: n.default }) : () => W(Ie, t, { default: n.default });
  }
});
function et() {
  const e = h(), t = C(() => {
    var n, o;
    return ["#text", "#comment"].includes((n = e.value) == null ? void 0 : n.$el.nodeName) ? (o = e.value) == null ? void 0 : o.$el.nextElementSibling : ee(e);
  });
  return {
    primitiveElement: e,
    currentElement: t
  };
}
function mn(e, t) {
  const n = h({}), o = h("none"), l = e.value ? "mounted" : "unmounted", { state: a, dispatch: s } = fn(l, {
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
  }), i = (m) => {
    var c;
    if (_) {
      const p = new CustomEvent(m, { bubbles: !1, cancelable: !1 });
      (c = t.value) == null || c.dispatchEvent(p);
    }
  };
  I(
    e,
    async (m, c) => {
      var p;
      const y = c !== m;
      if (await U(), y) {
        const w = o.value, M = ie(t.value);
        m ? (s("MOUNT"), i("enter"), M === "none" && i("after-enter")) : M === "none" || ((p = n.value) == null ? void 0 : p.display) === "none" ? (s("UNMOUNT"), i("leave"), i("after-leave")) : c && w !== M ? (s("ANIMATION_OUT"), i("leave")) : (s("UNMOUNT"), i("after-leave"));
      }
    },
    { immediate: !0 }
  );
  const u = (m) => {
    const c = ie(t.value), p = c.includes(
      m.animationName
    ), y = a.value === "mounted" ? "enter" : "leave";
    m.target === t.value && p && (i(`after-${y}`), s("ANIMATION_END")), m.target === t.value && c === "none" && s("ANIMATION_END");
  }, d = (m) => {
    m.target === t.value && (o.value = ie(t.value));
  }, f = I(
    t,
    (m, c) => {
      m ? (n.value = getComputedStyle(m), m.addEventListener("animationstart", d), m.addEventListener("animationcancel", u), m.addEventListener("animationend", u)) : (s("ANIMATION_END"), c == null || c.removeEventListener("animationstart", d), c == null || c.removeEventListener("animationcancel", u), c == null || c.removeEventListener("animationend", u));
    },
    { immediate: !0 }
  ), r = I(a, () => {
    const m = ie(t.value);
    o.value = a.value === "mounted" ? m : "none";
  });
  return X(() => {
    f(), r();
  }), {
    isPresent: C(
      () => ["mounted", "unmountSuspended"].includes(a.value)
    )
  };
}
function ie(e) {
  return e && getComputedStyle(e).animationName || "none";
}
const tt = A({
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
    const { present: l, forceMount: a } = je(e), s = h(), { isPresent: i } = mn(l, s);
    n({ present: i });
    let u = t.default({ present: i });
    u = Be(u || []);
    const d = V();
    if (u && (u == null ? void 0 : u.length) > 1) {
      const f = (o = d == null ? void 0 : d.parent) != null && o.type.name ? `<${d.parent.type.name} />` : "component";
      throw new Error(
        [
          `Detected an invalid children for \`${f}\` for  \`Presence\` component.`,
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
      ref: (f) => {
        const r = ee(f);
        return typeof (r == null ? void 0 : r.hasAttribute) > "u" || (r != null && r.hasAttribute("data-radix-popper-content-wrapper") ? s.value = r.firstElementChild : s.value = r), r;
      }
    }) : null;
  }
}), [F, pn] = Me("DialogRoot"), vn = /* @__PURE__ */ A({
  inheritAttrs: !1,
  __name: "DialogRoot",
  props: {
    open: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: !1 },
    modal: { type: Boolean, default: !0 }
  },
  emits: ["update:open"],
  setup(e, { emit: t }) {
    const n = e, o = Yt(n, "open", t, {
      defaultValue: n.defaultOpen,
      passive: n.open === void 0
    }), l = h(), a = h(), { modal: s } = je(n);
    return pn({
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
}), yn = /* @__PURE__ */ A({
  __name: "Teleport",
  props: {
    to: { default: "body" },
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = Zt();
    return (n, o) => v(t) || n.forceMount ? (g(), E(gt, {
      key: 0,
      to: n.to,
      disabled: n.disabled
    }, [
      O(n.$slots, "default")
    ], 8, ["to", "disabled"])) : k("", !0);
  }
}), hn = /* @__PURE__ */ A({
  __name: "DialogPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = e;
    return (n, o) => (g(), E(v(yn), yt(ht(t)), {
      default: x(() => [
        O(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), gn = "dismissableLayer.pointerDownOutside", xn = "dismissableLayer.focusOutside";
function nt(e, t) {
  const n = t.closest(
    "[data-dismissable-layer]"
  ), o = e.dataset.dismissableLayer === "" ? e : e.querySelector(
    "[data-dismissable-layer]"
  ), l = Array.from(
    e.ownerDocument.querySelectorAll("[data-dismissable-layer]")
  );
  return !!(n && o === n || l.indexOf(o) < l.indexOf(n));
}
function wn(e, t) {
  var n;
  const o = ((n = t == null ? void 0 : t.value) == null ? void 0 : n.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), l = h(!1), a = h(() => {
  });
  return R((s) => {
    if (!_)
      return;
    const i = async (d) => {
      const f = d.target;
      if (t != null && t.value) {
        if (nt(t.value, f)) {
          l.value = !1;
          return;
        }
        if (d.target && !l.value) {
          let r = function() {
            Ve(
              gn,
              e,
              m
            );
          };
          const m = { originalEvent: d };
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
function bn(e, t) {
  var n;
  const o = ((n = t == null ? void 0 : t.value) == null ? void 0 : n.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), l = h(!1);
  return R((a) => {
    if (!_)
      return;
    const s = async (i) => {
      t != null && t.value && (await U(), !(!t.value || nt(t.value, i.target)) && i.target && !l.value && Ve(
        xn,
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
const N = Re({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Cn = /* @__PURE__ */ A({
  __name: "DismissableLayer",
  props: {
    disableOutsidePointerEvents: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "dismiss"],
  setup(e, { emit: t }) {
    const n = e, o = t, { forwardRef: l, currentElement: a } = P(), s = C(
      () => {
        var p;
        return ((p = a.value) == null ? void 0 : p.ownerDocument) ?? globalThis.document;
      }
    ), i = C(() => N.layersRoot), u = C(() => a.value ? Array.from(i.value).indexOf(a.value) : -1), d = C(() => N.layersWithOutsidePointerEventsDisabled.size > 0), f = C(() => {
      const p = Array.from(i.value), [y] = [...N.layersWithOutsidePointerEventsDisabled].slice(-1), w = p.indexOf(y);
      return u.value >= w;
    }), r = wn(async (p) => {
      const y = [...N.branches].some(
        (w) => w == null ? void 0 : w.contains(p.target)
      );
      !f.value || y || (o("pointerDownOutside", p), o("interactOutside", p), await U(), p.defaultPrevented || o("dismiss"));
    }, a), m = bn((p) => {
      [...N.branches].some(
        (y) => y == null ? void 0 : y.contains(p.target)
      ) || (o("focusOutside", p), o("interactOutside", p), p.defaultPrevented || o("dismiss"));
    }, a);
    Ht("Escape", (p) => {
      u.value === i.value.size - 1 && (o("escapeKeyDown", p), p.defaultPrevented || o("dismiss"));
    });
    let c;
    return R((p) => {
      a.value && (n.disableOutsidePointerEvents && (N.layersWithOutsidePointerEventsDisabled.size === 0 && (c = s.value.body.style.pointerEvents, s.value.body.style.pointerEvents = "none"), N.layersWithOutsidePointerEventsDisabled.add(a.value)), i.value.add(a.value), p(() => {
        n.disableOutsidePointerEvents && N.layersWithOutsidePointerEventsDisabled.size === 1 && (s.value.body.style.pointerEvents = c);
      }));
    }), R((p) => {
      p(() => {
        a.value && (i.value.delete(a.value), N.layersWithOutsidePointerEventsDisabled.delete(a.value));
      });
    }), (p, y) => (g(), E(v(H), {
      ref: v(l),
      "as-child": p.asChild,
      as: p.as,
      "data-dismissable-layer": "",
      style: bt({
        pointerEvents: d.value ? f.value ? "auto" : "none" : void 0
      }),
      onFocusCapture: v(m).onFocusCapture,
      onBlurCapture: v(m).onBlurCapture,
      onPointerdownCapture: v(r).onPointerDownCapture
    }, {
      default: x(() => [
        O(p.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as", "style", "onFocusCapture", "onBlurCapture", "onPointerdownCapture"]));
  }
}), ye = "focusScope.autoFocusOnMount", he = "focusScope.autoFocusOnUnmount", Ne = { bubbles: !1, cancelable: !0 };
function En(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const o of e)
    if (L(o, { select: t }), document.activeElement !== n)
      return !0;
}
function On(e) {
  const t = ot(e), n = Le(t, e), o = Le(t.reverse(), e);
  return [n, o];
}
function ot(e) {
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
    if (!An(n, { upTo: t }))
      return n;
}
function An(e, { upTo: t }) {
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
function Mn(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function L(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Mn(e) && t && e.select();
  }
}
const Sn = Ft(() => h([]));
function Bn() {
  const e = Sn();
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
function Dn(e) {
  return e.filter((t) => t.tagName !== "A");
}
const In = /* @__PURE__ */ A({
  __name: "FocusScope",
  props: {
    loop: { type: Boolean, default: !1 },
    trapped: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["mountAutoFocus", "unmountAutoFocus"],
  setup(e, { emit: t }) {
    const n = e, o = t, { currentRef: l, currentElement: a } = P(), s = h(null), i = Bn(), u = Re({
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    });
    R((f) => {
      if (!_)
        return;
      const r = a.value;
      if (!n.trapped)
        return;
      function m(w) {
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
      document.addEventListener("focusin", m), document.addEventListener("focusout", c);
      const y = new MutationObserver(p);
      r && y.observe(r, { childList: !0, subtree: !0 }), f(() => {
        document.removeEventListener("focusin", m), document.removeEventListener("focusout", c), y.disconnect();
      });
    }), R(async (f) => {
      const r = a.value;
      if (await U(), !r)
        return;
      i.add(u);
      const m = document.activeElement;
      if (!r.contains(m)) {
        const c = new CustomEvent(ye, Ne);
        r.addEventListener(ye, (p) => o("mountAutoFocus", p)), r.dispatchEvent(c), c.defaultPrevented || (En(Dn(ot(r)), {
          select: !0
        }), document.activeElement === m && L(r));
      }
      f(() => {
        r.removeEventListener(ye, (y) => o("mountAutoFocus", y));
        const c = new CustomEvent(he, Ne), p = (y) => {
          o("unmountAutoFocus", y);
        };
        r.addEventListener(he, p), r.dispatchEvent(c), setTimeout(() => {
          c.defaultPrevented || L(m ?? document.body, { select: !0 }), r.removeEventListener(he, p), i.remove(u);
        }, 0);
      });
    });
    function d(f) {
      if (!n.loop && !n.trapped || u.paused)
        return;
      const r = f.key === "Tab" && !f.altKey && !f.ctrlKey && !f.metaKey, m = document.activeElement;
      if (r && m) {
        const c = f.currentTarget, [p, y] = On(c);
        p && y ? !f.shiftKey && m === y ? (f.preventDefault(), n.loop && L(p, { select: !0 })) : f.shiftKey && m === p && (f.preventDefault(), n.loop && L(y, { select: !0 })) : m === c && f.preventDefault();
      }
    }
    return (f, r) => (g(), E(v(H), {
      ref_key: "currentRef",
      ref: l,
      tabindex: "-1",
      "as-child": f.asChild,
      as: f.as,
      onKeydown: d
    }, {
      default: x(() => [
        O(f.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as"]));
  }
});
function $n(e) {
  return e ? "open" : "closed";
}
const Pn = "DialogTitle", kn = "DialogContent";
function Nn({
  titleName: e = Pn,
  contentName: t = kn,
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
const lt = /* @__PURE__ */ A({
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
    const n = e, o = t, l = F(), { forwardRef: a, currentElement: s } = P();
    return l.titleId || (l.titleId = ke(void 0, "radix-vue-dialog-title")), l.descriptionId || (l.descriptionId = ke(void 0, "radix-vue-dialog-description")), ce(() => {
      l.contentElement = s, document.activeElement !== document.body && (l.triggerElement.value = document.activeElement);
    }), process.env.NODE_ENV !== "production" && Nn({
      titleName: "DialogTitle",
      contentName: "DialogContent",
      componentLink: "dialog.html#title",
      titleId: l.titleId,
      descriptionId: l.descriptionId,
      contentElement: s
    }), (i, u) => (g(), E(v(In), {
      "as-child": "",
      loop: "",
      trapped: n.trapFocus,
      onMountAutoFocus: u[5] || (u[5] = (d) => o("openAutoFocus", d)),
      onUnmountAutoFocus: u[6] || (u[6] = (d) => o("closeAutoFocus", d))
    }, {
      default: x(() => [
        S(v(Cn), $({
          id: v(l).contentId,
          ref: v(a),
          as: i.as,
          "as-child": i.asChild,
          "disable-outside-pointer-events": i.disableOutsidePointerEvents,
          role: "dialog",
          "aria-describedby": v(l).descriptionId,
          "aria-labelledby": v(l).titleId,
          "data-state": v($n)(v(l).open.value)
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
}), Ln = /* @__PURE__ */ A({
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
    const n = e, o = t, l = F(), a = De(o), { forwardRef: s, currentElement: i } = P();
    return dn(i), (u, d) => (g(), E(lt, $({ ...n, ...v(a) }, {
      ref: v(s),
      "trap-focus": v(l).open.value,
      "disable-outside-pointer-events": !0,
      onCloseAutoFocus: d[0] || (d[0] = (f) => {
        var r;
        f.defaultPrevented || (f.preventDefault(), (r = v(l).triggerElement.value) == null || r.focus());
      }),
      onPointerDownOutside: d[1] || (d[1] = (f) => {
        const r = f.detail.originalEvent, m = r.button === 0 && r.ctrlKey === !0;
        (r.button === 2 || m) && f.preventDefault();
      }),
      onFocusOutside: d[2] || (d[2] = (f) => {
        f.preventDefault();
      })
    }), {
      default: x(() => [
        O(u.$slots, "default")
      ]),
      _: 3
    }, 16, ["trap-focus"]));
  }
}), Wn = /* @__PURE__ */ A({
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
    const n = e, o = De(t);
    P();
    const l = F(), a = h(!1), s = h(!1);
    return (i, u) => (g(), E(lt, $({ ...n, ...v(o) }, {
      "trap-focus": !1,
      "disable-outside-pointer-events": !1,
      onCloseAutoFocus: u[0] || (u[0] = (d) => {
        var f;
        d.defaultPrevented || (a.value || (f = v(l).triggerElement.value) == null || f.focus(), d.preventDefault()), a.value = !1, s.value = !1;
      }),
      onInteractOutside: u[1] || (u[1] = (d) => {
        var f;
        d.defaultPrevented || (a.value = !0, d.detail.originalEvent.type === "pointerdown" && (s.value = !0));
        const r = d.target;
        (f = v(l).triggerElement.value) != null && f.contains(r) && d.preventDefault(), d.detail.originalEvent.type === "focusin" && s.value && d.preventDefault();
      })
    }), {
      default: x(() => [
        O(i.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), at = /* @__PURE__ */ A({
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
    const n = e, o = t, l = F(), a = De(o), { forwardRef: s } = P();
    return (i, u) => (g(), E(v(tt), {
      present: i.forceMount || v(l).open.value
    }, {
      default: x(() => [
        v(l).modal.value ? (g(), E(Ln, $({
          key: 0,
          ref: v(s)
        }, { ...n, ...v(a), ...i.$attrs }), {
          default: x(() => [
            O(i.$slots, "default")
          ]),
          _: 3
        }, 16)) : (g(), E(Wn, $({
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
}), Tn = /* @__PURE__ */ A({
  __name: "DialogOverlayImpl",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = F();
    return on(!0), P(), (n, o) => (g(), E(v(H), {
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
}), Fn = /* @__PURE__ */ A({
  __name: "DialogOverlay",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = F(), { forwardRef: n } = P();
    return (o, l) => {
      var a;
      return (a = v(t)) != null && a.modal.value ? (g(), E(v(tt), {
        key: 0,
        present: o.forceMount || v(t).open.value
      }, {
        default: x(() => [
          S(Tn, $(o.$attrs, {
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
      }, 8, ["present"])) : k("", !0);
    };
  }
}), jn = /* @__PURE__ */ A({
  __name: "DialogClose",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(e) {
    const t = e;
    P();
    const n = F();
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
}), st = /* @__PURE__ */ A({
  __name: "DialogTitle",
  props: {
    asChild: { type: Boolean },
    as: { default: "h2" }
  },
  setup(e) {
    const t = e, n = F();
    return P(), (o, l) => (g(), E(v(H), $(t, {
      id: v(n).titleId
    }), {
      default: x(() => [
        O(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["id"]));
  }
}), it = /* @__PURE__ */ A({
  __name: "VisuallyHidden",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(e) {
    return P(), (t, n) => (g(), E(v(H), {
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
}), [rt, ao] = Me("CollectionProvider");
A({
  name: "CollectionSlot",
  setup(e, { slots: t }) {
    const n = rt(), { primitiveElement: o, currentElement: l } = et();
    return I(l, () => {
      n.collectionRef.value = l.value;
    }), () => W(Ie, { ref: o }, t);
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
    const o = rt(), { primitiveElement: l, currentElement: a } = et();
    return R((s) => {
      if (a.value) {
        const i = Te(a.value);
        o.itemMap.value.set(i, { ref: a.value, value: e.value }), s(() => o.itemMap.value.delete(i));
      }
    }), () => W(Ie, { ...n, [o.attrName]: "", ref: l }, t);
  }
});
function Rn() {
  if (typeof matchMedia == "function")
    return matchMedia("(pointer:coarse)").matches ? "coarse" : "fine";
}
Rn();
const ut = {
  __name: "CloseButton",
  setup(e) {
    return (t, n) => (g(), E(v(jn), { class: "im-close-button text-gray-400 hover:text-gray-500" }, {
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
}, Un = { class: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4" }, _n = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, qn = {
  __name: "ModalContent",
  props: {
    modalContext: Object,
    config: Object
  },
  setup(e) {
    return (t, n) => (g(), j("div", Un, [
      T("div", {
        class: z(["im-modal-positioner flex min-h-full justify-center", {
          "items-start": e.config.position === "top",
          "items-center": e.config.position === "center",
          "items-end": e.config.position === "bottom"
        }])
      }, [
        S(Ce, {
          appear: "",
          "enter-from-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          "enter-to-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-from-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-to-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          onAfterLeave: e.modalContext.afterLeave
        }, {
          default: x(() => [
            S(v(at), {
              "aria-describedby": void 0,
              class: z({
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
                S(v(it), { "as-child": "" }, {
                  default: x(() => [
                    S(v(st))
                  ]),
                  _: 1
                }),
                T("div", {
                  class: z(["im-modal-content relative", [e.config.paddingClasses, e.config.panelClasses]])
                }, [
                  e.config.closeButton ? (g(), j("div", _n, [
                    S(ut)
                  ])) : k("", !0),
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
}, Kn = { class: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden" }, Xn = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, zn = {
  __name: "SlideoverContent",
  props: {
    modalContext: Object,
    config: Object
  },
  setup(e) {
    return (t, n) => (g(), j("div", Kn, [
      T("div", {
        class: z(["im-slideover-positioner flex min-h-full items-center", {
          "justify-start rtl:justify-end": e.config.position === "left",
          "justify-end rtl:justify-start": e.config.position === "right"
        }])
      }, [
        S(Ce, {
          appear: "",
          "enter-from-class": "opacity-0 " + (e.config.position === "left" ? "-translate-x-full" : "translate-x-full"),
          "enter-to-class": "opacity-100 translate-x-0",
          "leave-from-class": "opacity-100 translate-x-0",
          "leave-to-class": "opacity-0 " + (e.config.position === "left" ? "-translate-x-full" : "translate-x-full"),
          onAfterLeave: e.modalContext.afterLeave
        }, {
          default: x(() => [
            S(v(at), {
              "aria-describedby": void 0,
              class: z({
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
                S(v(it), { "as-child": "" }, {
                  default: x(() => [
                    S(v(st))
                  ]),
                  _: 1
                }),
                T("div", {
                  class: z(["im-slideover-content relative", [e.config.paddingClasses, e.config.panelClasses]])
                }, [
                  e.config.closeButton ? (g(), j("div", Xn, [
                    S(ut)
                  ])) : k("", !0),
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
}, Vn = ["data-inertiaui-modal-id", "data-inertiaui-modal-index"], Hn = {
  key: 1,
  class: "im-backdrop fixed inset-0 z-30 bg-black/75"
}, so = {
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
    }), (l, a) => (g(), E(Tt, {
      ref_key: "modal",
      ref: n
    }, {
      default: x(({
        afterLeave: s,
        close: i,
        config: u,
        emit: d,
        getChildModal: f,
        getParentModal: r,
        id: m,
        index: c,
        isOpen: p,
        modalContext: y,
        onTopOfStack: w,
        reload: M,
        setOpen: Z,
        shouldRender: D
      }) => [
        S(v(vn), {
          open: p,
          "onUpdate:open": Z
        }, {
          default: x(() => [
            S(v(hn), null, {
              default: x(() => [
                T("div", {
                  "data-inertiaui-modal-id": m,
                  "data-inertiaui-modal-index": c,
                  class: "im-dialog relative z-20"
                }, [
                  c === 0 && w ? (g(), E(Ce, {
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
                      S(v(Fn), { class: "im-backdrop fixed inset-0 z-30 bg-black/75" })
                    ]),
                    _: 1
                  }, 8, ["appear"])) : k("", !0),
                  c > 0 && w ? (g(), j("div", Hn)) : k("", !0),
                  (g(), E(_e(u != null && u.slideover ? zn : qn), {
                    "modal-context": y,
                    config: u
                  }, {
                    default: x(() => [
                      O(l.$slots, "default", {
                        id: m,
                        afterLeave: s,
                        close: i,
                        config: u,
                        emit: d,
                        getChildModal: f,
                        getParentModal: r,
                        index: c,
                        isOpen: p,
                        modalContext: y,
                        onTopOfStack: w,
                        reload: M,
                        setOpen: Z,
                        shouldRender: D
                      })
                    ]),
                    _: 2
                  }, 1032, ["modal-context", "config"]))
                ], 8, Vn)
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
}, io = {
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
    const n = e, o = h(!1), l = G(), a = h(null);
    xe("modalContext", a);
    const s = t, i = h(!1), u = C(() => n.navigate ?? Ee("navigate"));
    I(
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
    const f = Fe();
    function r() {
      d.value = a.value.registerEventListenersFromAttrs(f);
    }
    I(a, (y, w) => {
      y && !w && (r(), s("success"));
    });
    function m() {
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
        Dt(Ke(n, Wt)),
        m,
        c,
        n.queryStringArrayFormat,
        u.value
      ).then((y) => {
        a.value = y;
      }).catch((y) => s("error", y)).finally(() => o.value = !1));
    }
    return (y, w) => (g(), E(_e(e.as), $(v(f), {
      href: e.href,
      onClick: Ot(p, ["prevent"])
    }), {
      default: x(() => [
        O(y.$slots, "default", { loading: o.value })
      ]),
      _: 3
    }, 16, ["href"]));
  }
};
function ro() {
  return At(be("modalContext", null));
}
function uo(e, t = {}) {
  return G().visit(
    e,
    t.method ?? "get",
    t.data ?? {},
    t.headers ?? {},
    t.config ?? {},
    t.onClose,
    t.onAfterLeave,
    t.queryStringArrayFormat ?? "brackets",
    t.navigate ?? Ee("navigate")
  ).then((n) => {
    const o = t.listeners ?? {};
    return Object.keys(o).forEach((l) => {
      const a = l.replace(/([A-Z])/g, "-$1").toLowerCase();
      n.on(a, o[l]);
    }), n;
  });
}
export {
  Tt as HeadlessModal,
  so as Modal,
  io as ModalLink,
  $t as ModalRoot,
  Ee as getConfig,
  no as initFromPageProps,
  to as putConfig,
  oo as renderApp,
  eo as resetConfig,
  ro as useModal,
  uo as visitModal
};
