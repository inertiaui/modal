var dt = Object.defineProperty;
var ct = (e, t, n) => t in e ? dt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var B = (e, t, n) => ct(e, typeof t != "symbol" ? t + "" : t, n);
import * as $e from "vue";
import { computed as A, provide as xe, openBlock as h, createBlock as C, unref as v, mergeProps as $, createCommentVNode as k, ref as y, onUnmounted as X, onBeforeMount as ft, watch as I, createElementBlock as j, Fragment as we, renderSlot as E, h as W, readonly as mt, markRaw as Te, nextTick as U, inject as be, onBeforeUnmount as ie, onMounted as ce, useAttrs as Fe, defineComponent as O, Comment as pt, cloneVNode as vt, toRefs as je, getCurrentInstance as V, normalizeProps as gt, guardReactiveProps as yt, withCtx as x, reactive as Re, createVNode as S, watchEffect as R, effectScope as Ue, Teleport as ht, toHandlerKey as xt, camelize as wt, normalizeStyle as bt, getCurrentScope as Ct, onScopeDispose as Et, createElementVNode as T, normalizeClass as z, Transition as Ce, resolveDynamicComponent as _e, withModifiers as Ot, toValue as At } from "vue";
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
    let r = t * 1e3 / n;
    const i = setInterval(() => {
      const d = e();
      d && (clearInterval(i), o(d)), --r <= 0 && (clearInterval(i), l(new Error("Condition not met in time")));
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
    const t = e, n = G(), o = A(() => n.stack.value[t.index]);
    return xe("modalContext", o), (l, a) => {
      var r;
      return (r = o.value) != null && r.component ? (h(), C(v(o).component, $({ key: 0 }, o.value.props, {
        onModalEvent: a[0] || (a[0] = (i, ...d) => o.value.emit(i, ...d))
      }), null, 16)) : k("", !0);
    };
  }
}, $t = {
  __name: "ModalRoot",
  setup(e) {
    const t = G(), n = y(!1), o = y(null);
    X(Y.on("start", () => n.value = !0)), X(Y.on("finish", () => n.value = !1)), X(
      Y.on("navigate", (r) => {
        const i = r.detail.page.props._inertiaui_modal;
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
    const l = (r) => (t.stack.value.length && (r.headers["X-InertiaUI-Modal-Base-Url"] = t.getBaseUrl()), r);
    ft(() => {
      ue.interceptors.request.use(l);
    }), X(() => {
      ue.interceptors.request.eject(l);
    });
    const a = qe();
    return I(
      () => {
        var r;
        return (r = a.props) == null ? void 0 : r._inertiaui_modal;
      },
      (r, i) => {
        var d;
        r && i && r.component === i.component && r.url === i.url && ((d = t.stack.value[0]) == null || d.updateProps(r.props ?? {}));
      }
    ), (r, i) => (h(), j(we, null, [
      E(r.$slots, "default"),
      v(t).stack.value.length ? (h(), C(Xe, {
        key: 0,
        index: 0
      })) : k("", !0)
    ], 64));
  }
};
let me = null;
const Q = y(null), b = y([]), de = y({}), Pt = (e) => {
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
    this.id = Oe.generateId(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = t, this.props = y(n.props), this.response = n, this.config = o, this.onCloseCallback = l, this.afterLeaveCallback = a, this.index = A(() => b.value.findIndex((r) => r.id === this.id)), this.onTopOfStack = A(() => {
      var i;
      return b.value.length < 2 ? !0 : ((i = b.value.map((d) => ({ id: d.id, shouldRender: d.shouldRender })).reverse().find((d) => d.shouldRender)) == null ? void 0 : i.id) === this.id;
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
function Lt(e, t, n = {}, o = {}, l = {}, a = null, r = null, i = "brackets", d = !1) {
  return new Promise((c, m) => {
    if (e.startsWith("#")) {
      c(Nt(e.substring(1), l, a, r));
      return;
    }
    const [u, p] = Mt(t, e || "", n, i);
    let s = d && b.value.length === 0;
    if (b.value.length === 0 && (Q.value = typeof window < "u" ? window.location.href : ""), o = {
      ...o,
      Accept: "text/html, application/xhtml+xml",
      "X-Requested-With": "XMLHttpRequest",
      "X-Inertia": !0,
      "X-Inertia-Version": qe().version,
      "X-InertiaUI-Modal": !0,
      "X-InertiaUI-Modal-Use-Router": s ? 1 : 0,
      "X-InertiaUI-Modal-Base-Url": Q.value
    }, s)
      return Y.visit(u, {
        method: t,
        data: p,
        headers: o,
        preserveScroll: !0,
        preserveState: !0,
        onError: m,
        onFinish: () => It(() => b.value[0]).then((f) => {
          const g = f.onCloseCallback, w = f.afterLeaveCallback;
          f.update(
            l,
            () => {
              a == null || a(), g == null || g();
            },
            () => {
              r == null || r(), w == null || w();
            }
          ), c(f);
        })
      });
    ue({ url: u, method: t, data: p, headers: o }).then((f) => c(ze(f.data, l, a, r))).catch(m);
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
    const o = e, l = G(), a = o.name ? y({}) : be("modalContext"), r = A(() => {
      var f;
      const s = ((f = a.value.config) == null ? void 0 : f.slideover) ?? o.slideover ?? Ee("type") === "slideover";
      return {
        slideover: s,
        closeButton: o.closeButton ?? q(s, "closeButton"),
        closeExplicitly: o.closeExplicitly ?? q(s, "closeExplicitly"),
        maxWidth: o.maxWidth ?? q(s, "maxWidth"),
        paddingClasses: o.paddingClasses ?? q(s, "paddingClasses"),
        panelClasses: o.panelClasses ?? q(s, "panelClasses"),
        position: o.position ?? q(s, "position"),
        ...a.value.config
      };
    });
    o.name && (l.registerLocalModal(o.name, function(s) {
      a.value = s, c();
    }), ie(() => {
      l.removeLocalModal(o.name);
    })), ce(() => {
      o.name || c();
    });
    const i = y(null);
    ie(() => {
      var s;
      return (s = i.value) == null ? void 0 : s.call(i);
    });
    const d = Fe();
    function c() {
      i.value = a.value.registerEventListenersFromAttrs(d);
    }
    const m = n;
    function u(s, ...f) {
      m("modal-event", s, ...f);
    }
    t({
      emit: u,
      afterLeave: () => {
        var s;
        return (s = a.value) == null ? void 0 : s.afterLeave();
      },
      close: () => {
        var s;
        return (s = a.value) == null ? void 0 : s.close();
      },
      reload: (...s) => {
        var f;
        return (f = a.value) == null ? void 0 : f.reload(...s);
      },
      setOpen: (...s) => {
        var f;
        return (f = a.value) == null ? void 0 : f.setOpen(...s);
      },
      getChildModal: () => {
        var s;
        return (s = a.value) == null ? void 0 : s.getChildModal();
      },
      getParentModal: () => {
        var s;
        return (s = a.value) == null ? void 0 : s.getParentModal();
      },
      get config() {
        var s;
        return (s = a.value) == null ? void 0 : s.config;
      },
      get id() {
        var s;
        return (s = a.value) == null ? void 0 : s.id;
      },
      get index() {
        var s;
        return (s = a.value) == null ? void 0 : s.index;
      },
      get isOpen() {
        var s;
        return (s = a.value) == null ? void 0 : s.isOpen;
      },
      get modalContext() {
        var s;
        return (s = a.value) == null ? void 0 : s.modalContext;
      },
      get onTopOfStack() {
        var s;
        return (s = a.value) == null ? void 0 : s.onTopOfStack;
      },
      get shouldRender() {
        var s;
        return (s = a.value) == null ? void 0 : s.shouldRender;
      }
    });
    const p = A(() => {
      var s;
      return (s = l.stack.value.find((f) => f.shouldRender && f.index > a.value.index)) == null ? void 0 : s.index;
    });
    return (s, f) => (h(), j(we, null, [
      v(a).shouldRender ? E(s.$slots, "default", {
        key: 0,
        id: v(a).id,
        afterLeave: v(a).afterLeave,
        close: v(a).close,
        config: r.value,
        emit: u,
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
      p.value ? (h(), C(Xe, {
        key: 1,
        index: p.value
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
  Xt() && ie(e, t);
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
  const a = [], r = () => {
    a.forEach((m) => m()), a.length = 0;
  }, i = (m, u, p, s) => (m.addEventListener(u, p, s), () => m.removeEventListener(u, p, s)), d = I(
    () => [ee(t), Se(l)],
    ([m, u]) => {
      if (r(), !m)
        return;
      const p = _t(u) ? { ...u } : u;
      a.push(
        ...n.flatMap((s) => o.map((f) => i(m, s, f, p)))
      );
    },
    { immediate: !0, flush: "post" }
  ), c = () => {
    d(), r();
  };
  return He(c), c;
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
    passive: r = !1,
    dedupe: i = !1
  } = o, d = Vt(t);
  return Je(l, a, (c) => {
    c.repeat && Se(i) || d(c) && n(c);
  }, r);
}
function Zt() {
  const e = y(!1), t = V();
  return t && ce(() => {
    e.value = !0;
  }, t), e;
}
function Jt(e) {
  return JSON.parse(JSON.stringify(e));
}
function Yt(e, t, n, o = {}) {
  var l, a, r;
  const {
    clone: i = !1,
    passive: d = !1,
    eventName: c,
    deep: m = !1,
    defaultValue: u,
    shouldEmit: p
  } = o, s = V(), f = n || (s == null ? void 0 : s.emit) || ((l = s == null ? void 0 : s.$emit) == null ? void 0 : l.bind(s)) || ((r = (a = s == null ? void 0 : s.proxy) == null ? void 0 : a.$emit) == null ? void 0 : r.bind(s == null ? void 0 : s.proxy));
  let g = c;
  g = g || `update:${t.toString()}`;
  const w = (D) => i ? typeof i == "function" ? i(D) : Jt(D) : D, M = () => Rt(e[t]) ? w(e[t]) : u, Z = (D) => {
    p ? p(D) && f(g, D) : f(g, D);
  };
  if (d) {
    const D = M(), te = y(D);
    let ne = !1;
    return I(
      () => e[t],
      (oe) => {
        ne || (ne = !0, te.value = w(oe), U(() => ne = !1));
      }
    ), I(
      te,
      (oe) => {
        !ne && (oe !== e[t] || m) && Z(oe);
      },
      { deep: m }
    ), te;
  } else
    return A({
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
function he(e, t, n = ".", o) {
  if (!pe(t))
    return he(e, {}, n);
  const l = Object.assign({}, t);
  for (const a in e) {
    if (a === "__proto__" || a === "constructor")
      continue;
    const r = e[a];
    r != null && (Array.isArray(r) && Array.isArray(l[a]) ? l[a] = [...r, ...l[a]] : pe(r) && pe(l[a]) ? l[a] = he(
      r,
      l[a],
      (n ? `${n}.` : "") + a.toString()
    ) : l[a] = r);
  }
  return l;
}
function Qt(e) {
  return (...t) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    t.reduce((n, o) => he(n, o, ""), {})
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
  const e = y(/* @__PURE__ */ new Map()), t = y(), n = A(() => {
    for (const r of e.value.values())
      if (r)
        return !0;
    return !1;
  }), o = Ye({
    scrollBody: y(!0)
  });
  let l = null;
  const a = () => {
    document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.body.style.removeProperty("--scrollbar-width"), document.body.style.overflow = t.value ?? "", Pe && (l == null || l()), t.value = void 0;
  };
  return I(n, (r, i) => {
    var d;
    if (!_)
      return;
    if (!r) {
      i && a();
      return;
    }
    t.value === void 0 && (t.value = document.body.style.overflow);
    const c = window.innerWidth - document.documentElement.clientWidth, m = { padding: c, margin: 0 }, u = (d = o.scrollBody) != null && d.value ? typeof o.scrollBody.value == "object" ? Gt({
      padding: o.scrollBody.value.padding === !0 ? c : o.scrollBody.value.padding,
      margin: o.scrollBody.value.margin === !0 ? c : o.scrollBody.value.margin
    }, m) : m : { padding: 0, margin: 0 };
    c > 0 && (document.body.style.paddingRight = typeof u.padding == "number" ? `${u.padding}px` : String(u.padding), document.body.style.marginRight = typeof u.margin == "number" ? `${u.margin}px` : String(u.margin), document.body.style.setProperty("--scrollbar-width", `${c}px`), document.body.style.overflow = "hidden"), Pe && (l = Je(
      document,
      "touchmove",
      (p) => ln(p),
      { passive: !1 }
    )), U(() => {
      document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden";
    });
  }, { immediate: !0, flush: "sync" }), e;
});
function on(e) {
  const t = tn(6), n = nn();
  n.value.set(t, e);
  const o = A({
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
  const e = V(), t = y(), n = A(() => {
    var r, i;
    return ["#text", "#comment"].includes((r = t.value) == null ? void 0 : r.$el.nodeName) ? (i = t.value) == null ? void 0 : i.$el.nextElementSibling : ee(t);
  }), o = Object.assign({}, e.exposed), l = {};
  for (const r in e.props)
    Object.defineProperty(l, r, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[r]
    });
  if (Object.keys(o).length > 0)
    for (const r in o)
      Object.defineProperty(l, r, {
        enumerable: !0,
        configurable: !0,
        get: () => o[r]
      });
  Object.defineProperty(l, "$el", {
    enumerable: !0,
    configurable: !0,
    get: () => e.vnode.el
  }), e.exposed = l;
  function a(r) {
    t.value = r, !(r instanceof Element || !r) && (Object.defineProperty(l, "$el", {
      enumerable: !0,
      configurable: !0,
      get: () => r.$el
    }), e.exposed = l);
  }
  return { forwardRef: a, currentRef: t, currentElement: n };
}
var an = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, K = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakMap(), re = {}, ve = 0, Ge = function(e) {
  return e && (e.host || Ge(e.parentNode));
}, rn = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var o = Ge(n);
    return o && e.contains(o) ? o : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, sn = function(e, t, n, o) {
  var l = rn(t, Array.isArray(e) ? e : [e]);
  re[n] || (re[n] = /* @__PURE__ */ new WeakMap());
  var a = re[n], r = [], i = /* @__PURE__ */ new Set(), d = new Set(l), c = function(u) {
    !u || i.has(u) || (i.add(u), c(u.parentNode));
  };
  l.forEach(c);
  var m = function(u) {
    !u || d.has(u) || Array.prototype.forEach.call(u.children, function(p) {
      if (i.has(p))
        m(p);
      else
        try {
          var s = p.getAttribute(o), f = s !== null && s !== "false", g = (K.get(p) || 0) + 1, w = (a.get(p) || 0) + 1;
          K.set(p, g), a.set(p, w), r.push(p), g === 1 && f && ae.set(p, !0), w === 1 && p.setAttribute(n, "true"), f || p.setAttribute(o, "true");
        } catch (M) {
          console.error("aria-hidden: cannot operate on ", p, M);
        }
    });
  };
  return m(t), i.clear(), ve++, function() {
    r.forEach(function(u) {
      var p = K.get(u) - 1, s = a.get(u) - 1;
      K.set(u, p), a.set(u, s), p || (ae.has(u) || u.removeAttribute(o), ae.delete(u)), s || u.removeAttribute(n);
    }), ve--, ve || (K = /* @__PURE__ */ new WeakMap(), K = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakMap(), re = {});
  };
}, un = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var o = Array.from(Array.isArray(e) ? e : [e]), l = an(e);
  return l ? (o.push.apply(o, Array.from(l.querySelectorAll("[aria-live]"))), sn(o, l, n, "aria-hidden")) : function() {
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
  const n = y(e);
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
const Ie = O({
  name: "PrimitiveSlot",
  inheritAttrs: !1,
  setup(e, { attrs: t, slots: n }) {
    return () => {
      var o, l;
      if (!n.default)
        return null;
      const a = Be(n.default()), r = a.findIndex((m) => m.type !== pt);
      if (r === -1)
        return a;
      const i = a[r];
      (o = i.props) == null || delete o.ref;
      const d = i.props ? $(t, i.props) : t;
      t.class && (l = i.props) != null && l.class && delete i.props.class;
      const c = vt(i, d);
      for (const m in d)
        m.startsWith("on") && (c.props || (c.props = {}), c.props[m] = d[m]);
      return a.length === 1 ? c : (a[r] = c, a);
    };
  }
}), H = O({
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
  const e = y(), t = A(() => {
    var n, o;
    return ["#text", "#comment"].includes((n = e.value) == null ? void 0 : n.$el.nodeName) ? (o = e.value) == null ? void 0 : o.$el.nextElementSibling : ee(e);
  });
  return {
    primitiveElement: e,
    currentElement: t
  };
}
function mn(e, t) {
  const n = y({}), o = y("none"), l = e.value ? "mounted" : "unmounted", { state: a, dispatch: r } = fn(l, {
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
  }), i = (p) => {
    var s;
    if (_) {
      const f = new CustomEvent(p, { bubbles: !1, cancelable: !1 });
      (s = t.value) == null || s.dispatchEvent(f);
    }
  };
  I(
    e,
    async (p, s) => {
      var f;
      const g = s !== p;
      if (await U(), g) {
        const w = o.value, M = se(t.value);
        p ? (r("MOUNT"), i("enter"), M === "none" && i("after-enter")) : M === "none" || ((f = n.value) == null ? void 0 : f.display) === "none" ? (r("UNMOUNT"), i("leave"), i("after-leave")) : s && w !== M ? (r("ANIMATION_OUT"), i("leave")) : (r("UNMOUNT"), i("after-leave"));
      }
    },
    { immediate: !0 }
  );
  const d = (p) => {
    const s = se(t.value), f = s.includes(
      p.animationName
    ), g = a.value === "mounted" ? "enter" : "leave";
    p.target === t.value && f && (i(`after-${g}`), r("ANIMATION_END")), p.target === t.value && s === "none" && r("ANIMATION_END");
  }, c = (p) => {
    p.target === t.value && (o.value = se(t.value));
  }, m = I(
    t,
    (p, s) => {
      p ? (n.value = getComputedStyle(p), p.addEventListener("animationstart", c), p.addEventListener("animationcancel", d), p.addEventListener("animationend", d)) : (r("ANIMATION_END"), s == null || s.removeEventListener("animationstart", c), s == null || s.removeEventListener("animationcancel", d), s == null || s.removeEventListener("animationend", d));
    },
    { immediate: !0 }
  ), u = I(a, () => {
    const p = se(t.value);
    o.value = a.value === "mounted" ? p : "none";
  });
  return X(() => {
    m(), u();
  }), {
    isPresent: A(
      () => ["mounted", "unmountSuspended"].includes(a.value)
    )
  };
}
function se(e) {
  return e && getComputedStyle(e).animationName || "none";
}
const tt = O({
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
    const { present: l, forceMount: a } = je(e), r = y(), { isPresent: i } = mn(l, r);
    n({ present: i });
    let d = t.default({ present: i });
    d = Be(d || []);
    const c = V();
    if (d && (d == null ? void 0 : d.length) > 1) {
      const m = (o = c == null ? void 0 : c.parent) != null && o.type.name ? `<${c.parent.type.name} />` : "component";
      throw new Error(
        [
          `Detected an invalid children for \`${m}\` for  \`Presence\` component.`,
          "",
          "Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.",
          "You can apply a few solutions:",
          [
            "Provide a single child element so that `presence` directive attach correctly.",
            "Ensure the first child is an actual element instead of a raw text node or comment node."
          ].map((u) => `  - ${u}`).join(`
`)
        ].join(`
`)
      );
    }
    return () => a.value || l.value || i.value ? W(t.default({ present: i })[0], {
      ref: (m) => {
        const u = ee(m);
        return typeof (u == null ? void 0 : u.hasAttribute) > "u" || (u != null && u.hasAttribute("data-radix-popper-content-wrapper") ? r.value = u.firstElementChild : r.value = u), u;
      }
    }) : null;
  }
}), [F, pn] = Me("DialogRoot"), vn = /* @__PURE__ */ O({
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
    }), l = y(), a = y(), { modal: r } = je(n);
    return pn({
      open: o,
      modal: r,
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
    }), (i, d) => E(i.$slots, "default", { open: v(o) });
  }
}), gn = /* @__PURE__ */ O({
  __name: "Teleport",
  props: {
    to: { default: "body" },
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = Zt();
    return (n, o) => v(t) || n.forceMount ? (h(), C(ht, {
      key: 0,
      to: n.to,
      disabled: n.disabled
    }, [
      E(n.$slots, "default")
    ], 8, ["to", "disabled"])) : k("", !0);
  }
}), yn = /* @__PURE__ */ O({
  __name: "DialogPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = e;
    return (n, o) => (h(), C(v(gn), gt(yt(t)), {
      default: x(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), hn = "dismissableLayer.pointerDownOutside", xn = "dismissableLayer.focusOutside";
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
  const o = ((n = t == null ? void 0 : t.value) == null ? void 0 : n.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), l = y(!1), a = y(() => {
  });
  return R((r) => {
    if (!_)
      return;
    const i = async (c) => {
      const m = c.target;
      if (t != null && t.value) {
        if (nt(t.value, m)) {
          l.value = !1;
          return;
        }
        if (c.target && !l.value) {
          let u = function() {
            Ve(
              hn,
              e,
              p
            );
          };
          const p = { originalEvent: c };
          c.pointerType === "touch" ? (o.removeEventListener("click", a.value), a.value = u, o.addEventListener("click", a.value, {
            once: !0
          })) : u();
        } else
          o.removeEventListener("click", a.value);
        l.value = !1;
      }
    }, d = window.setTimeout(() => {
      o.addEventListener("pointerdown", i);
    }, 0);
    r(() => {
      window.clearTimeout(d), o.removeEventListener("pointerdown", i), o.removeEventListener("click", a.value);
    });
  }), {
    onPointerDownCapture: () => l.value = !0
  };
}
function bn(e, t) {
  var n;
  const o = ((n = t == null ? void 0 : t.value) == null ? void 0 : n.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), l = y(!1);
  return R((a) => {
    if (!_)
      return;
    const r = async (i) => {
      t != null && t.value && (await U(), !(!t.value || nt(t.value, i.target)) && i.target && !l.value && Ve(
        xn,
        e,
        { originalEvent: i }
      ));
    };
    o.addEventListener("focusin", r), a(() => o.removeEventListener("focusin", r));
  }), {
    onFocusCapture: () => l.value = !0,
    onBlurCapture: () => l.value = !1
  };
}
const N = Re({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Cn = /* @__PURE__ */ O({
  __name: "DismissableLayer",
  props: {
    disableOutsidePointerEvents: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "dismiss"],
  setup(e, { emit: t }) {
    const n = e, o = t, { forwardRef: l, currentElement: a } = P(), r = A(
      () => {
        var f;
        return ((f = a.value) == null ? void 0 : f.ownerDocument) ?? globalThis.document;
      }
    ), i = A(() => N.layersRoot), d = A(() => a.value ? Array.from(i.value).indexOf(a.value) : -1), c = A(() => N.layersWithOutsidePointerEventsDisabled.size > 0), m = A(() => {
      const f = Array.from(i.value), [g] = [...N.layersWithOutsidePointerEventsDisabled].slice(-1), w = f.indexOf(g);
      return d.value >= w;
    }), u = wn(async (f) => {
      const g = [...N.branches].some(
        (w) => w == null ? void 0 : w.contains(f.target)
      );
      !m.value || g || (o("pointerDownOutside", f), o("interactOutside", f), await U(), f.defaultPrevented || o("dismiss"));
    }, a), p = bn((f) => {
      [...N.branches].some(
        (g) => g == null ? void 0 : g.contains(f.target)
      ) || (o("focusOutside", f), o("interactOutside", f), f.defaultPrevented || o("dismiss"));
    }, a);
    Ht("Escape", (f) => {
      d.value === i.value.size - 1 && (o("escapeKeyDown", f), f.defaultPrevented || o("dismiss"));
    });
    let s;
    return R((f) => {
      a.value && (n.disableOutsidePointerEvents && (N.layersWithOutsidePointerEventsDisabled.size === 0 && (s = r.value.body.style.pointerEvents, r.value.body.style.pointerEvents = "none"), N.layersWithOutsidePointerEventsDisabled.add(a.value)), i.value.add(a.value), f(() => {
        n.disableOutsidePointerEvents && N.layersWithOutsidePointerEventsDisabled.size === 1 && (r.value.body.style.pointerEvents = s);
      }));
    }), R((f) => {
      f(() => {
        a.value && (i.value.delete(a.value), N.layersWithOutsidePointerEventsDisabled.delete(a.value));
      });
    }), (f, g) => (h(), C(v(H), {
      ref: v(l),
      "as-child": f.asChild,
      as: f.as,
      "data-dismissable-layer": "",
      style: bt({
        pointerEvents: c.value ? m.value ? "auto" : "none" : void 0
      }),
      onFocusCapture: v(p).onFocusCapture,
      onBlurCapture: v(p).onBlurCapture,
      onPointerdownCapture: v(u).onPointerDownCapture
    }, {
      default: x(() => [
        E(f.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as", "style", "onFocusCapture", "onBlurCapture", "onPointerdownCapture"]));
  }
}), ge = "focusScope.autoFocusOnMount", ye = "focusScope.autoFocusOnUnmount", Ne = { bubbles: !1, cancelable: !0 };
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
const Sn = Ft(() => y([]));
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
const In = /* @__PURE__ */ O({
  __name: "FocusScope",
  props: {
    loop: { type: Boolean, default: !1 },
    trapped: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["mountAutoFocus", "unmountAutoFocus"],
  setup(e, { emit: t }) {
    const n = e, o = t, { currentRef: l, currentElement: a } = P(), r = y(null), i = Bn(), d = Re({
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    });
    R((m) => {
      if (!_)
        return;
      const u = a.value;
      if (!n.trapped)
        return;
      function p(w) {
        if (d.paused || !u)
          return;
        const M = w.target;
        u.contains(M) ? r.value = M : L(r.value, { select: !0 });
      }
      function s(w) {
        if (d.paused || !u)
          return;
        const M = w.relatedTarget;
        M !== null && (u.contains(M) || L(r.value, { select: !0 }));
      }
      function f(w) {
        u.contains(r.value) || L(u);
      }
      document.addEventListener("focusin", p), document.addEventListener("focusout", s);
      const g = new MutationObserver(f);
      u && g.observe(u, { childList: !0, subtree: !0 }), m(() => {
        document.removeEventListener("focusin", p), document.removeEventListener("focusout", s), g.disconnect();
      });
    }), R(async (m) => {
      const u = a.value;
      if (await U(), !u)
        return;
      i.add(d);
      const p = document.activeElement;
      if (!u.contains(p)) {
        const s = new CustomEvent(ge, Ne);
        u.addEventListener(ge, (f) => o("mountAutoFocus", f)), u.dispatchEvent(s), s.defaultPrevented || (En(Dn(ot(u)), {
          select: !0
        }), document.activeElement === p && L(u));
      }
      m(() => {
        u.removeEventListener(ge, (g) => o("mountAutoFocus", g));
        const s = new CustomEvent(ye, Ne), f = (g) => {
          o("unmountAutoFocus", g);
        };
        u.addEventListener(ye, f), u.dispatchEvent(s), setTimeout(() => {
          s.defaultPrevented || L(p ?? document.body, { select: !0 }), u.removeEventListener(ye, f), i.remove(d);
        }, 0);
      });
    });
    function c(m) {
      if (!n.loop && !n.trapped || d.paused)
        return;
      const u = m.key === "Tab" && !m.altKey && !m.ctrlKey && !m.metaKey, p = document.activeElement;
      if (u && p) {
        const s = m.currentTarget, [f, g] = On(s);
        f && g ? !m.shiftKey && p === g ? (m.preventDefault(), n.loop && L(f, { select: !0 })) : m.shiftKey && p === f && (m.preventDefault(), n.loop && L(g, { select: !0 })) : p === s && m.preventDefault();
      }
    }
    return (m, u) => (h(), C(v(H), {
      ref_key: "currentRef",
      ref: l,
      tabindex: "-1",
      "as-child": m.asChild,
      as: m.as,
      onKeydown: c
    }, {
      default: x(() => [
        E(m.$slots, "default")
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
  const r = `Warning: \`${t}\` requires a \`${e}\` for the component to be accessible for screen reader users.

If you want to hide the \`${e}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://www.radix-vue.com/components/${n}`, i = `Warning: Missing \`Description\` or \`aria-describedby="undefined"\` for ${t}.`;
  ce(() => {
    var d;
    document.getElementById(o) || console.warn(r);
    const c = (d = a.value) == null ? void 0 : d.getAttribute("aria-describedby");
    l && c && (document.getElementById(l) || console.warn(i));
  });
}
const lt = /* @__PURE__ */ O({
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
    const n = e, o = t, l = F(), { forwardRef: a, currentElement: r } = P();
    return l.titleId || (l.titleId = ke(void 0, "radix-vue-dialog-title")), l.descriptionId || (l.descriptionId = ke(void 0, "radix-vue-dialog-description")), ce(() => {
      l.contentElement = r, document.activeElement !== document.body && (l.triggerElement.value = document.activeElement);
    }), process.env.NODE_ENV !== "production" && Nn({
      titleName: "DialogTitle",
      contentName: "DialogContent",
      componentLink: "dialog.html#title",
      titleId: l.titleId,
      descriptionId: l.descriptionId,
      contentElement: r
    }), (i, d) => (h(), C(v(In), {
      "as-child": "",
      loop: "",
      trapped: n.trapFocus,
      onMountAutoFocus: d[5] || (d[5] = (c) => o("openAutoFocus", c)),
      onUnmountAutoFocus: d[6] || (d[6] = (c) => o("closeAutoFocus", c))
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
          onDismiss: d[0] || (d[0] = (c) => v(l).onOpenChange(!1)),
          onEscapeKeyDown: d[1] || (d[1] = (c) => o("escapeKeyDown", c)),
          onFocusOutside: d[2] || (d[2] = (c) => o("focusOutside", c)),
          onInteractOutside: d[3] || (d[3] = (c) => o("interactOutside", c)),
          onPointerDownOutside: d[4] || (d[4] = (c) => o("pointerDownOutside", c))
        }), {
          default: x(() => [
            E(i.$slots, "default")
          ]),
          _: 3
        }, 16, ["id", "as", "as-child", "disable-outside-pointer-events", "aria-describedby", "aria-labelledby", "data-state"])
      ]),
      _: 3
    }, 8, ["trapped"]));
  }
}), Ln = /* @__PURE__ */ O({
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
    const n = e, o = t, l = F(), a = De(o), { forwardRef: r, currentElement: i } = P();
    return dn(i), (d, c) => (h(), C(lt, $({ ...n, ...v(a) }, {
      ref: v(r),
      "trap-focus": v(l).open.value,
      "disable-outside-pointer-events": !0,
      onCloseAutoFocus: c[0] || (c[0] = (m) => {
        var u;
        m.defaultPrevented || (m.preventDefault(), (u = v(l).triggerElement.value) == null || u.focus());
      }),
      onPointerDownOutside: c[1] || (c[1] = (m) => {
        const u = m.detail.originalEvent, p = u.button === 0 && u.ctrlKey === !0;
        (u.button === 2 || p) && m.preventDefault();
      }),
      onFocusOutside: c[2] || (c[2] = (m) => {
        m.preventDefault();
      })
    }), {
      default: x(() => [
        E(d.$slots, "default")
      ]),
      _: 3
    }, 16, ["trap-focus"]));
  }
}), Wn = /* @__PURE__ */ O({
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
    const l = F(), a = y(!1), r = y(!1);
    return (i, d) => (h(), C(lt, $({ ...n, ...v(o) }, {
      "trap-focus": !1,
      "disable-outside-pointer-events": !1,
      onCloseAutoFocus: d[0] || (d[0] = (c) => {
        var m;
        c.defaultPrevented || (a.value || (m = v(l).triggerElement.value) == null || m.focus(), c.preventDefault()), a.value = !1, r.value = !1;
      }),
      onInteractOutside: d[1] || (d[1] = (c) => {
        var m;
        c.defaultPrevented || (a.value = !0, c.detail.originalEvent.type === "pointerdown" && (r.value = !0));
        const u = c.target;
        (m = v(l).triggerElement.value) != null && m.contains(u) && c.preventDefault(), c.detail.originalEvent.type === "focusin" && r.value && c.preventDefault();
      })
    }), {
      default: x(() => [
        E(i.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), at = /* @__PURE__ */ O({
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
    const n = e, o = t, l = F(), a = De(o), { forwardRef: r } = P();
    return (i, d) => (h(), C(v(tt), {
      present: i.forceMount || v(l).open.value
    }, {
      default: x(() => [
        v(l).modal.value ? (h(), C(Ln, $({
          key: 0,
          ref: v(r)
        }, { ...n, ...v(a), ...i.$attrs }), {
          default: x(() => [
            E(i.$slots, "default")
          ]),
          _: 3
        }, 16)) : (h(), C(Wn, $({
          key: 1,
          ref: v(r)
        }, { ...n, ...v(a), ...i.$attrs }), {
          default: x(() => [
            E(i.$slots, "default")
          ]),
          _: 3
        }, 16))
      ]),
      _: 3
    }, 8, ["present"]));
  }
}), Tn = /* @__PURE__ */ O({
  __name: "DialogOverlayImpl",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = F();
    return on(!0), P(), (n, o) => (h(), C(v(H), {
      as: n.as,
      "as-child": n.asChild,
      "data-state": v(t).open.value ? "open" : "closed",
      style: { "pointer-events": "auto" }
    }, {
      default: x(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child", "data-state"]));
  }
}), Fn = /* @__PURE__ */ O({
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
      return (a = v(t)) != null && a.modal.value ? (h(), C(v(tt), {
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
              E(o.$slots, "default")
            ]),
            _: 3
          }, 16, ["as", "as-child"])
        ]),
        _: 3
      }, 8, ["present"])) : k("", !0);
    };
  }
}), jn = /* @__PURE__ */ O({
  __name: "DialogClose",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(e) {
    const t = e;
    P();
    const n = F();
    return (o, l) => (h(), C(v(H), $(t, {
      type: o.as === "button" ? "button" : void 0,
      onClick: l[0] || (l[0] = (a) => v(n).onOpenChange(!1))
    }), {
      default: x(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["type"]));
  }
}), rt = /* @__PURE__ */ O({
  __name: "DialogTitle",
  props: {
    asChild: { type: Boolean },
    as: { default: "h2" }
  },
  setup(e) {
    const t = e, n = F();
    return P(), (o, l) => (h(), C(v(H), $(t, {
      id: v(n).titleId
    }), {
      default: x(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["id"]));
  }
}), st = /* @__PURE__ */ O({
  __name: "VisuallyHidden",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(e) {
    return P(), (t, n) => (h(), C(v(H), {
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
        E(t.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
}), [it, ao] = Me("CollectionProvider");
O({
  name: "CollectionSlot",
  setup(e, { slots: t }) {
    const n = it(), { primitiveElement: o, currentElement: l } = et();
    return I(l, () => {
      n.collectionRef.value = l.value;
    }), () => W(Ie, { ref: o }, t);
  }
});
O({
  name: "CollectionItem",
  inheritAttrs: !1,
  props: {
    value: {
      // It accepts any value
      validator: () => !0
    }
  },
  setup(e, { slots: t, attrs: n }) {
    const o = it(), { primitiveElement: l, currentElement: a } = et();
    return R((r) => {
      if (a.value) {
        const i = Te(a.value);
        o.itemMap.value.set(i, { ref: a.value, value: e.value }), r(() => o.itemMap.value.delete(i));
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
    return (t, n) => (h(), C(v(jn), { class: "im-close-button text-gray-400 hover:text-gray-500" }, {
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
    return (t, n) => (h(), j("div", Un, [
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
                S(v(st), { "as-child": "" }, {
                  default: x(() => [
                    S(v(rt))
                  ]),
                  _: 1
                }),
                T("div", {
                  class: z(["im-modal-content relative", [e.config.paddingClasses, e.config.panelClasses]])
                }, [
                  e.config.closeButton ? (h(), j("div", _n, [
                    S(ut)
                  ])) : k("", !0),
                  E(t.$slots, "default", {
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
    return (t, n) => (h(), j("div", Kn, [
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
                S(v(st), { "as-child": "" }, {
                  default: x(() => [
                    S(v(rt))
                  ]),
                  _: 1
                }),
                T("div", {
                  class: z(["im-slideover-content relative", [e.config.paddingClasses, e.config.panelClasses]])
                }, [
                  e.config.closeButton ? (h(), j("div", Xn, [
                    S(ut)
                  ])) : k("", !0),
                  E(t.$slots, "default", {
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
}, ro = {
  __name: "Modal",
  setup(e, { expose: t }) {
    const n = y(null), o = y(!1);
    return t({
      afterLeave: () => {
        var l;
        return (l = n.value) == null ? void 0 : l.afterLeave();
      },
      close: () => {
        var l;
        return (l = n.value) == null ? void 0 : l.close();
      },
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
      reload: (...l) => {
        var a;
        return (a = n.value) == null ? void 0 : a.reload(...l);
      },
      setOpen: (...l) => {
        var a;
        return (a = n.value) == null ? void 0 : a.setOpen(...l);
      },
      get config() {
        var l;
        return (l = n.value) == null ? void 0 : l.config;
      },
      get id() {
        var l;
        return (l = n.value) == null ? void 0 : l.id;
      },
      get index() {
        var l;
        return (l = n.value) == null ? void 0 : l.index;
      },
      get isOpen() {
        var l;
        return (l = n.value) == null ? void 0 : l.isOpen;
      },
      get modalContext() {
        var l;
        return (l = n.value) == null ? void 0 : l.modalContext;
      },
      get onTopOfStack() {
        var l;
        return (l = n.value) == null ? void 0 : l.onTopOfStack;
      },
      get shouldRender() {
        var l;
        return (l = n.value) == null ? void 0 : l.shouldRender;
      }
    }), (l, a) => (h(), C(Tt, {
      ref_key: "modal",
      ref: n
    }, {
      default: x(({
        afterLeave: r,
        close: i,
        config: d,
        emit: c,
        getChildModal: m,
        getParentModal: u,
        id: p,
        index: s,
        isOpen: f,
        modalContext: g,
        onTopOfStack: w,
        reload: M,
        setOpen: Z,
        shouldRender: D
      }) => [
        S(v(vn), {
          open: f,
          "onUpdate:open": Z
        }, {
          default: x(() => [
            S(v(yn), null, {
              default: x(() => [
                T("div", {
                  "data-inertiaui-modal-id": p,
                  "data-inertiaui-modal-index": s,
                  class: "im-dialog relative z-20"
                }, [
                  s === 0 && w ? (h(), C(Ce, {
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
                  s > 0 && w ? (h(), j("div", Hn)) : k("", !0),
                  (h(), C(_e(d != null && d.slideover ? zn : qn), {
                    "modal-context": g,
                    config: d
                  }, {
                    default: x(() => [
                      E(l.$slots, "default", {
                        id: p,
                        afterLeave: r,
                        close: i,
                        config: d,
                        emit: c,
                        getChildModal: m,
                        getParentModal: u,
                        index: s,
                        isOpen: f,
                        modalContext: g,
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
}, so = {
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
    const n = e, o = y(!1), l = G(), a = y(null);
    xe("modalContext", a);
    const r = t, i = y(!1), d = A(() => n.navigate ?? Ee("navigate"));
    I(
      () => {
        var g;
        return (g = a.value) == null ? void 0 : g.onTopOfStack;
      },
      (g) => {
        a.value && (g && i.value ? r("focus") : g || r("blur"), i.value = !g);
      }
    );
    const c = y(null);
    ie(() => {
      var g;
      return (g = c.value) == null ? void 0 : g.call(c);
    });
    const m = Fe();
    function u() {
      c.value = a.value.registerEventListenersFromAttrs(m);
    }
    I(a, (g, w) => {
      g && !w && (u(), r("success"));
    });
    function p() {
      r("close");
    }
    function s() {
      a.value = null, r("after-leave");
    }
    function f() {
      o.value || (n.href.startsWith("#") || (o.value = !0, r("start")), l.visit(
        n.href,
        n.method,
        n.data,
        n.headers,
        Dt(Ke(n, Wt)),
        p,
        s,
        n.queryStringArrayFormat,
        d.value
      ).then((g) => {
        a.value = g;
      }).catch((g) => r("error", g)).finally(() => o.value = !1));
    }
    return (g, w) => (h(), C(_e(e.as), $(v(m), {
      href: e.href,
      onClick: Ot(f, ["prevent"])
    }), {
      default: x(() => [
        E(g.$slots, "default", { loading: o.value })
      ]),
      _: 3
    }, 16, ["href"]));
  }
};
function io() {
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
  ro as Modal,
  so as ModalLink,
  $t as ModalRoot,
  Ee as getConfig,
  no as initFromPageProps,
  to as putConfig,
  oo as renderApp,
  eo as resetConfig,
  io as useModal,
  uo as visitModal
};
