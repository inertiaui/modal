var dt = Object.defineProperty;
var ct = (e, t, n) => t in e ? dt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var I = (e, t, n) => ct(e, typeof t != "symbol" ? t + "" : t, n);
import * as De from "vue";
import { computed as B, provide as xe, openBlock as x, createBlock as C, unref as p, mergeProps as k, createCommentVNode as L, ref as h, onUnmounted as H, onBeforeMount as ft, watch as $, createElementBlock as _, Fragment as we, renderSlot as O, h as R, readonly as mt, markRaw as Fe, nextTick as K, inject as be, onBeforeUnmount as se, onMounted as ce, useAttrs as Re, defineComponent as A, Comment as pt, cloneVNode as vt, toRefs as je, getCurrentInstance as Y, normalizeProps as gt, guardReactiveProps as yt, withCtx as w, reactive as Ue, createVNode as S, watchEffect as q, effectScope as _e, Teleport as ht, toHandlerKey as xt, camelize as wt, normalizeStyle as bt, getCurrentScope as Et, onScopeDispose as Ct, createElementVNode as j, normalizeClass as J, Transition as Ee, resolveDynamicComponent as qe, withModifiers as Ot, toValue as At } from "vue";
import { router as Q, usePage as Ke } from "@inertiajs/vue3";
import { mergeDataIntoQueryString as Mt } from "@inertiajs/core";
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
class Bt {
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
const fe = new Bt(), eo = () => fe.reset(), to = (e, t) => fe.put(e, t), Ce = (e) => fe.get(e), z = (e, t) => fe.get(e ? `slideover.${t}` : `modal.${t}`);
function St(e, t) {
  return Array.isArray(e) ? e.filter((n) => !t.includes(n)) : Object.keys(e).reduce((n, o) => (t.includes(o) || (n[o] = e[o]), n), {});
}
function Xe(e, t) {
  return Array.isArray(e) ? e.filter((n) => t.includes(n)) : t.reduce((n, o) => (o in e && (n[o] = e[o]), n), {});
}
function It(e) {
  return Array.isArray(e) ? e.filter((t) => t !== null) : Object.keys(e).reduce((t, n) => (n in e && e[n] !== null && (t[n] = e[n]), t), {});
}
function Pt(e, t = 3, n = 10) {
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
const ze = {
  __name: "ModalRenderer",
  props: {
    index: {
      type: Number,
      required: !0
    }
  },
  setup(e) {
    const t = e, n = te(), o = B(() => n.stack.value[t.index]);
    return xe("modalContext", o), (l, a) => {
      var r;
      return (r = o.value) != null && r.component ? (x(), C(p(o).component, k({ key: 0 }, o.value.props, {
        onModalEvent: a[0] || (a[0] = (i, ...d) => o.value.emit(i, ...d))
      }), null, 16)) : L("", !0);
    };
  }
}, $t = {
  __name: "ModalRoot",
  setup(e) {
    const t = te(), n = h(!1), o = h(null);
    H(Q.on("start", () => n.value = !0)), H(Q.on("finish", () => n.value = !1)), H(
      Q.on("navigate", (r) => {
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
          !n.value && window.location.href !== i.baseUrl && Q.visit(i.baseUrl, {
            preserveScroll: !0,
            preserveState: !0
          });
        });
      })
    );
    const l = (r) => (t.stack.value.length && (r.headers["X-InertiaUI-Modal-Base-Url"] = t.getBaseUrl()), r);
    ft(() => {
      ue.interceptors.request.use(l);
    }), H(() => {
      ue.interceptors.request.eject(l);
    });
    const a = Ke();
    return $(
      () => {
        var r;
        return (r = a.props) == null ? void 0 : r._inertiaui_modal;
      },
      (r, i) => {
        var d;
        r && i && r.component === i.component && r.url === i.url && ((d = t.stack.value[0]) == null || d.updateProps(r.props ?? {}));
      }
    ), (r, i) => (x(), _(we, null, [
      O(r.$slots, "default"),
      p(t).stack.value.length ? (x(), C(ze, {
        key: 0,
        index: 0
      })) : L("", !0)
    ], 64));
  }
};
let me = null;
const ee = h(null), E = h([]), de = h({}), Dt = (e) => {
  me = e;
}, no = (e) => {
  e.resolveComponent && (me = e.resolveComponent);
};
class Oe {
  constructor(t, n, o, l, a) {
    I(this, "update", (t, n, o) => {
      const l = this.index.value;
      l > -1 && (E.value[l].config = t, E.value[l].onCloseCallback = n, E.value[l].afterLeaveCallback = o);
    });
    I(this, "getParentModal", () => {
      const t = this.index.value;
      return t < 1 ? null : E.value.slice(0, t).reverse().find((n) => n.isOpen);
    });
    I(this, "getChildModal", () => {
      const t = this.index.value;
      return t === E.value.length - 1 ? null : E.value.slice(t + 1).find((n) => n.isOpen);
    });
    I(this, "show", () => {
      const t = this.index.value;
      if (t > -1) {
        if (E.value[t].isOpen)
          return;
        E.value[t].isOpen = !0, E.value[t].shouldRender = !0;
      }
    });
    I(this, "close", () => {
      var n;
      const t = this.index.value;
      if (t > -1) {
        if (!E.value[t].isOpen)
          return;
        Object.keys(this.listeners).forEach((o) => {
          this.off(o);
        }), E.value[t].isOpen = !1, (n = this.onCloseCallback) == null || n.call(this), this.onCloseCallback = null;
      }
    });
    I(this, "setOpen", (t) => {
      t ? this.show() : this.close();
    });
    I(this, "afterLeave", () => {
      var n;
      const t = this.index.value;
      if (t > -1) {
        if (E.value[t].isOpen)
          return;
        E.value[t].shouldRender = !1, (n = this.afterLeaveCallback) == null || n.call(this), this.afterLeaveCallback = null;
      }
      t === 0 && (E.value = []);
    });
    I(this, "on", (t, n) => {
      t = le(t), this.listeners[t] = this.listeners[t] ?? [], this.listeners[t].push(n);
    });
    I(this, "off", (t, n) => {
      var o;
      t = le(t), n ? this.listeners[t] = ((o = this.listeners[t]) == null ? void 0 : o.filter((l) => l !== n)) ?? [] : delete this.listeners[t];
    });
    I(this, "emit", (t, ...n) => {
      var o;
      (o = this.listeners[le(t)]) == null || o.forEach((l) => l(...n));
    });
    I(this, "registerEventListenersFromAttrs", (t) => {
      const n = [];
      return Object.keys(t).filter((o) => o.startsWith("on")).forEach((o) => {
        const l = le(o).replace(/^on-/, "");
        this.on(l, t[o]), n.push(() => this.off(l, t[o]));
      }), () => n.forEach((o) => o());
    });
    I(this, "reload", (t = {}) => {
      var o;
      let n = Object.keys(this.response.props);
      t.only && (n = Xe(n, t.only)), t.except && (n = St(n, t.except)), (o = this.response) != null && o.url && ue.get(this.response.url, {
        headers: {
          Accept: "text/html, application/xhtml+xml",
          "X-Inertia": !0,
          "X-Inertia-Partial-Component": this.response.component,
          "X-Inertia-Version": this.response.version,
          "X-Inertia-Partial-Data": n.join(","),
          "X-InertiaUI-Modal": !0,
          "X-InertiaUI-Modal-Use-Router": 0,
          "X-InertiaUI-Modal-Base-Url": ee.value
        }
      }).then((l) => {
        this.updateProps(l.data.props);
      });
    });
    I(this, "updateProps", (t) => {
      Object.assign(this.props.value, t);
    });
    this.id = Oe.generateId(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = t, this.props = h(n.props), this.response = n, this.config = o, this.onCloseCallback = l, this.afterLeaveCallback = a, this.index = B(() => E.value.findIndex((r) => r.id === this.id)), this.onTopOfStack = B(() => {
      var i;
      return E.value.length < 2 ? !0 : ((i = E.value.map((d) => ({ id: d.id, shouldRender: d.shouldRender })).reverse().find((d) => d.shouldRender)) == null ? void 0 : i.id) === this.id;
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
function Ve(e, t = {}, n = null, o = null) {
  return me(e.component).then((l) => Ae(Fe(l), e, t, n, o));
}
function Lt(e, t, n = {}, o = {}, l = {}, a = null, r = null, i = "brackets", d = !1) {
  return new Promise((c, f) => {
    if (e.startsWith("#")) {
      c(Nt(e.substring(1), l, a, r));
      return;
    }
    const [u, v] = Mt(t, e || "", n, i);
    let s = d && E.value.length === 0;
    if (E.value.length === 0 && (ee.value = typeof window < "u" ? window.location.href : ""), o = {
      ...o,
      Accept: "text/html, application/xhtml+xml",
      "X-Requested-With": "XMLHttpRequest",
      "X-Inertia": !0,
      "X-Inertia-Version": Ke().version,
      "X-InertiaUI-Modal": !0,
      "X-InertiaUI-Modal-Use-Router": s ? 1 : 0,
      "X-InertiaUI-Modal-Base-Url": ee.value
    }, s)
      return Q.visit(u, {
        method: t,
        data: v,
        headers: o,
        preserveScroll: !0,
        preserveState: !0,
        onError: f,
        onFinish: () => Pt(() => E.value[0]).then((m) => {
          const g = m.onCloseCallback, y = m.afterLeaveCallback;
          m.update(
            l,
            () => {
              a == null || a(), g == null || g();
            },
            () => {
              r == null || r(), y == null || y();
            }
          ), c(m);
        })
      });
    ue({ url: u, method: t, data: v, headers: o }).then((m) => c(Ve(m.data, l, a, r))).catch(f);
  });
}
function Ae(e, t, n, o, l) {
  const a = new Oe(e, t, n, o, l);
  return E.value.push(a), K(() => {
    a.show();
  }), a;
}
const Tt = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], oo = (e, t) => (t.resolveComponent && (me = t.resolveComponent), () => R($t, () => R(e, t)));
function te() {
  return {
    setComponentResolver: Dt,
    getBaseUrl: () => ee.value,
    setBaseUrl: (e) => ee.value = e,
    stack: mt(E),
    push: Ae,
    pushFromResponseData: Ve,
    closeAll: () => [...E.value].reverse().forEach((e) => e.close()),
    reset: () => E.value = [],
    visit: Lt,
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
    const o = e, l = te(), a = o.name ? h({}) : be("modalContext"), r = B(() => {
      var m;
      const s = ((m = a.value.config) == null ? void 0 : m.slideover) ?? o.slideover ?? Ce("type") === "slideover";
      return {
        slideover: s,
        closeButton: o.closeButton ?? z(s, "closeButton"),
        closeExplicitly: o.closeExplicitly ?? z(s, "closeExplicitly"),
        maxWidth: o.maxWidth ?? z(s, "maxWidth"),
        paddingClasses: o.paddingClasses ?? z(s, "paddingClasses"),
        panelClasses: o.panelClasses ?? z(s, "panelClasses"),
        position: o.position ?? z(s, "position"),
        ...a.value.config
      };
    });
    o.name && (l.registerLocalModal(o.name, function(s) {
      a.value = s, c();
    }), se(() => {
      l.removeLocalModal(o.name);
    })), ce(() => {
      o.name || c();
    });
    const i = h(null);
    se(() => {
      var s;
      return (s = i.value) == null ? void 0 : s.call(i);
    });
    const d = Re();
    function c() {
      i.value = a.value.registerEventListenersFromAttrs(d);
    }
    const f = n;
    function u(s, ...m) {
      f("modal-event", s, ...m);
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
        var m;
        return (m = a.value) == null ? void 0 : m.reload(...s);
      },
      setOpen: (...s) => {
        var m;
        return (m = a.value) == null ? void 0 : m.setOpen(...s);
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
    const v = B(() => {
      var s;
      return (s = l.stack.value.find((m) => m.shouldRender && m.index > a.value.index)) == null ? void 0 : s.index;
    });
    return (s, m) => (x(), _(we, null, [
      p(a).shouldRender ? O(s.$slots, "default", {
        key: 0,
        id: p(a).id,
        afterLeave: p(a).afterLeave,
        close: p(a).close,
        config: r.value,
        emit: u,
        getChildModal: p(a).getChildModal,
        getParentModal: p(a).getParentModal,
        index: p(a).index,
        isOpen: p(a).isOpen,
        modalContext: p(a),
        onTopOfStack: p(a).onTopOfStack,
        reload: p(a).reload,
        setOpen: p(a).setOpen,
        shouldRender: p(a).shouldRender
      }) : L("", !0),
      v.value ? (x(), C(ze, {
        key: 1,
        index: v.value
      }, null, 8, ["index"])) : L("", !0)
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
function He(e, t, n) {
  const o = n.originalEvent.target, l = new CustomEvent(e, {
    bubbles: !1,
    cancelable: !0,
    detail: n
  });
  t && o.addEventListener(e, t, { once: !0 }), o.dispatchEvent(l);
}
function Je(e) {
  return Et() ? (Ct(e), !0) : !1;
}
function Ft(e) {
  let t = !1, n;
  const o = _e(!0);
  return (...l) => (t || (n = o.run(() => e(...l)), t = !0), n);
}
function Rt(e) {
  let t = 0, n, o;
  const l = () => {
    t -= 1, o && t <= 0 && (o.stop(), n = void 0, o = void 0);
  };
  return (...a) => (t += 1, n || (o = _e(!0), n = o.run(() => e(...a))), Je(l), n);
}
function Be(e) {
  return typeof e == "function" ? e() : p(e);
}
const X = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const jt = (e) => typeof e < "u", Ut = Object.prototype.toString, _t = (e) => Ut.call(e) === "[object Object]", qt = () => {
}, ke = /* @__PURE__ */ Kt();
function Kt() {
  var e, t;
  return X && ((e = window == null ? void 0 : window.navigator) == null ? void 0 : e.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((t = window == null ? void 0 : window.navigator) == null ? void 0 : t.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function Xt(e) {
  return Y();
}
function zt(e, t) {
  Xt() && se(e, t);
}
function ne(e) {
  var t;
  const n = Be(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const Se = X ? window : void 0;
function Ye(...e) {
  let t, n, o, l;
  if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([n, o, l] = e, t = Se) : [t, n, o, l] = e, !t)
    return qt;
  Array.isArray(n) || (n = [n]), Array.isArray(o) || (o = [o]);
  const a = [], r = () => {
    a.forEach((f) => f()), a.length = 0;
  }, i = (f, u, v, s) => (f.addEventListener(u, v, s), () => f.removeEventListener(u, v, s)), d = $(
    () => [ne(t), Be(l)],
    ([f, u]) => {
      if (r(), !f)
        return;
      const v = _t(u) ? { ...u } : u;
      a.push(
        ...n.flatMap((s) => o.map((m) => i(f, s, m, v)))
      );
    },
    { immediate: !0, flush: "post" }
  ), c = () => {
    d(), r();
  };
  return Je(c), c;
}
function Vt(e) {
  return typeof e == "function" ? e : typeof e == "string" ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => !0;
}
function Ht(...e) {
  let t, n, o = {};
  e.length === 3 ? (t = e[0], n = e[1], o = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (t = !0, n = e[0], o = e[1]) : (t = e[0], n = e[1]) : (t = !0, n = e[0]);
  const {
    target: l = Se,
    eventName: a = "keydown",
    passive: r = !1,
    dedupe: i = !1
  } = o, d = Vt(t);
  return Ye(l, a, (c) => {
    c.repeat && Be(i) || d(c) && n(c);
  }, r);
}
function Jt() {
  const e = h(!1), t = Y();
  return t && ce(() => {
    e.value = !0;
  }, t), e;
}
function Yt(e) {
  return JSON.parse(JSON.stringify(e));
}
function Gt(e, t, n, o = {}) {
  var l, a, r;
  const {
    clone: i = !1,
    passive: d = !1,
    eventName: c,
    deep: f = !1,
    defaultValue: u,
    shouldEmit: v
  } = o, s = Y(), m = n || (s == null ? void 0 : s.emit) || ((l = s == null ? void 0 : s.$emit) == null ? void 0 : l.bind(s)) || ((r = (a = s == null ? void 0 : s.proxy) == null ? void 0 : a.$emit) == null ? void 0 : r.bind(s == null ? void 0 : s.proxy));
  let g = c;
  g = g || `update:${t.toString()}`;
  const y = (M) => i ? typeof i == "function" ? i(M) : Yt(M) : M, b = () => jt(e[t]) ? y(e[t]) : u, P = (M) => {
    v ? v(M) && m(g, M) : m(g, M);
  };
  if (d) {
    const M = b(), W = h(M);
    let D = !1;
    return $(
      () => e[t],
      (oe) => {
        D || (D = !0, W.value = y(oe), K(() => D = !1));
      }
    ), $(
      W,
      (oe) => {
        !D && (oe !== e[t] || f) && P(oe);
      },
      { deep: f }
    ), W;
  } else
    return B({
      get() {
        return b();
      },
      set(M) {
        P(M);
      }
    });
}
function Ie(e) {
  return e ? e.flatMap((t) => t.type === we ? Ie(t.children) : [t]) : [];
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
function Zt(e) {
  return (...t) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    t.reduce((n, o) => he(n, o, ""), {})
  );
}
const Qt = Zt(), [Ge, lo] = Me("ConfigProvider");
let en = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", tn = (e = 21) => {
  let t = "", n = e;
  for (; n--; )
    t += en[Math.random() * 64 | 0];
  return t;
};
const nn = Rt(() => {
  const e = h(/* @__PURE__ */ new Map()), t = h(), n = B(() => {
    for (const r of e.value.values())
      if (r)
        return !0;
    return !1;
  }), o = Ge({
    scrollBody: h(!0)
  });
  let l = null;
  const a = () => {
    document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.body.style.removeProperty("--scrollbar-width"), document.body.style.overflow = t.value ?? "", ke && (l == null || l()), t.value = void 0;
  };
  return $(n, (r, i) => {
    var d;
    if (!X)
      return;
    if (!r) {
      i && a();
      return;
    }
    t.value === void 0 && (t.value = document.body.style.overflow);
    const c = window.innerWidth - document.documentElement.clientWidth, f = { padding: c, margin: 0 }, u = (d = o.scrollBody) != null && d.value ? typeof o.scrollBody.value == "object" ? Qt({
      padding: o.scrollBody.value.padding === !0 ? c : o.scrollBody.value.padding,
      margin: o.scrollBody.value.margin === !0 ? c : o.scrollBody.value.margin
    }, f) : f : { padding: 0, margin: 0 };
    c > 0 && (document.body.style.paddingRight = typeof u.padding == "number" ? `${u.padding}px` : String(u.padding), document.body.style.marginRight = typeof u.margin == "number" ? `${u.margin}px` : String(u.margin), document.body.style.setProperty("--scrollbar-width", `${c}px`), document.body.style.overflow = "hidden"), ke && (l = Ye(
      document,
      "touchmove",
      (v) => ln(v),
      { passive: !1 }
    )), K(() => {
      document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden";
    });
  }, { immediate: !0, flush: "sync" }), e;
});
function on(e) {
  const t = tn(6), n = nn();
  n.value.set(t, e);
  const o = B({
    get: () => n.value.get(t) ?? !1,
    set: (l) => n.value.set(t, l)
  });
  return zt(() => {
    n.value.delete(t);
  }), o;
}
function Ze(e) {
  const t = window.getComputedStyle(e);
  if (t.overflowX === "scroll" || t.overflowY === "scroll" || t.overflowX === "auto" && e.clientWidth < e.scrollWidth || t.overflowY === "auto" && e.clientHeight < e.scrollHeight)
    return !0;
  {
    const n = e.parentNode;
    return !n || n.tagName === "BODY" ? !1 : Ze(n);
  }
}
function ln(e) {
  const t = e || window.event, n = t.target;
  return n instanceof Element && Ze(n) ? !1 : t.touches.length > 1 ? !0 : (t.preventDefault && t.cancelable && t.preventDefault(), !1);
}
function Pe(e) {
  const t = Y(), n = t == null ? void 0 : t.type.emits, o = {};
  return n != null && n.length || console.warn(
    `No emitted event found. Please check component: ${t == null ? void 0 : t.type.__name}`
  ), n == null || n.forEach((l) => {
    o[xt(wt(l))] = (...a) => e(l, ...a);
  }), o;
}
function N() {
  const e = Y(), t = h(), n = B(() => {
    var r, i;
    return ["#text", "#comment"].includes((r = t.value) == null ? void 0 : r.$el.nodeName) ? (i = t.value) == null ? void 0 : i.$el.nextElementSibling : ne(t);
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
}, V = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakMap(), re = {}, ve = 0, Qe = function(e) {
  return e && (e.host || Qe(e.parentNode));
}, rn = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var o = Qe(n);
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
  var f = function(u) {
    !u || d.has(u) || Array.prototype.forEach.call(u.children, function(v) {
      if (i.has(v))
        f(v);
      else
        try {
          var s = v.getAttribute(o), m = s !== null && s !== "false", g = (V.get(v) || 0) + 1, y = (a.get(v) || 0) + 1;
          V.set(v, g), a.set(v, y), r.push(v), g === 1 && m && ae.set(v, !0), y === 1 && v.setAttribute(n, "true"), m || v.setAttribute(o, "true");
        } catch (b) {
          console.error("aria-hidden: cannot operate on ", v, b);
        }
    });
  };
  return f(t), i.clear(), ve++, function() {
    r.forEach(function(u) {
      var v = V.get(u) - 1, s = a.get(u) - 1;
      V.set(u, v), a.set(u, s), v || (ae.has(u) || u.removeAttribute(o), ae.delete(u)), s || u.removeAttribute(n);
    }), ve--, ve || (V = /* @__PURE__ */ new WeakMap(), V = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakMap(), re = {});
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
  $(() => ne(e), (n) => {
    n ? t = un(n) : t && t();
  }), H(() => {
    t && t();
  });
}
let cn = 0;
function Ne(e, t = "radix") {
  const n = Ge({ useId: void 0 });
  return De.useId ? `${t}-${De.useId()}` : n.useId ? `${t}-${n.useId()}` : `${t}-${++cn}`;
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
const $e = A({
  name: "PrimitiveSlot",
  inheritAttrs: !1,
  setup(e, { attrs: t, slots: n }) {
    return () => {
      var o, l;
      if (!n.default)
        return null;
      const a = Ie(n.default()), r = a.findIndex((f) => f.type !== pt);
      if (r === -1)
        return a;
      const i = a[r];
      (o = i.props) == null || delete o.ref;
      const d = i.props ? k(t, i.props) : t;
      t.class && (l = i.props) != null && l.class && delete i.props.class;
      const c = vt(i, d);
      for (const f in d)
        f.startsWith("on") && (c.props || (c.props = {}), c.props[f] = d[f]);
      return a.length === 1 ? c : (a[r] = c, a);
    };
  }
}), G = A({
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
    return typeof o == "string" && ["area", "img", "input"].includes(o) ? () => R(o, t) : o !== "template" ? () => R(e.as, t, { default: n.default }) : () => R($e, t, { default: n.default });
  }
});
function et() {
  const e = h(), t = B(() => {
    var n, o;
    return ["#text", "#comment"].includes((n = e.value) == null ? void 0 : n.$el.nodeName) ? (o = e.value) == null ? void 0 : o.$el.nextElementSibling : ne(e);
  });
  return {
    primitiveElement: e,
    currentElement: t
  };
}
function mn(e, t) {
  var n;
  const o = h({}), l = h("none"), a = h(e), r = e.value ? "mounted" : "unmounted";
  let i;
  const d = ((n = t.value) == null ? void 0 : n.ownerDocument.defaultView) ?? Se, { state: c, dispatch: f } = fn(r, {
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
  }), u = (y) => {
    var b;
    if (X) {
      const P = new CustomEvent(y, { bubbles: !1, cancelable: !1 });
      (b = t.value) == null || b.dispatchEvent(P);
    }
  };
  $(
    e,
    async (y, b) => {
      var P;
      const M = b !== y;
      if (await K(), M) {
        const W = l.value, D = ie(t.value);
        y ? (f("MOUNT"), u("enter"), D === "none" && u("after-enter")) : D === "none" || ((P = o.value) == null ? void 0 : P.display) === "none" ? (f("UNMOUNT"), u("leave"), u("after-leave")) : b && W !== D ? (f("ANIMATION_OUT"), u("leave")) : (f("UNMOUNT"), u("after-leave"));
      }
    },
    { immediate: !0 }
  );
  const v = (y) => {
    const b = ie(t.value), P = b.includes(
      y.animationName
    ), M = c.value === "mounted" ? "enter" : "leave";
    if (y.target === t.value && P && (u(`after-${M}`), f("ANIMATION_END"), !a.value)) {
      const W = t.value.style.animationFillMode;
      t.value.style.animationFillMode = "forwards", i = d == null ? void 0 : d.setTimeout(() => {
        var D;
        ((D = t.value) == null ? void 0 : D.style.animationFillMode) === "forwards" && (t.value.style.animationFillMode = W);
      });
    }
    y.target === t.value && b === "none" && f("ANIMATION_END");
  }, s = (y) => {
    y.target === t.value && (l.value = ie(t.value));
  }, m = $(
    t,
    (y, b) => {
      y ? (o.value = getComputedStyle(y), y.addEventListener("animationstart", s), y.addEventListener("animationcancel", v), y.addEventListener("animationend", v)) : (f("ANIMATION_END"), d == null || d.clearTimeout(i), b == null || b.removeEventListener("animationstart", s), b == null || b.removeEventListener("animationcancel", v), b == null || b.removeEventListener("animationend", v));
    },
    { immediate: !0 }
  ), g = $(c, () => {
    const y = ie(t.value);
    l.value = c.value === "mounted" ? y : "none";
  });
  return H(() => {
    m(), g();
  }), {
    isPresent: B(
      () => ["mounted", "unmountSuspended"].includes(c.value)
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
    const { present: l, forceMount: a } = je(e), r = h(), { isPresent: i } = mn(l, r);
    n({ present: i });
    let d = t.default({ present: i });
    d = Ie(d || []);
    const c = Y();
    if (d && (d == null ? void 0 : d.length) > 1) {
      const f = (o = c == null ? void 0 : c.parent) != null && o.type.name ? `<${c.parent.type.name} />` : "component";
      throw new Error(
        [
          `Detected an invalid children for \`${f}\` for  \`Presence\` component.`,
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
    return () => a.value || l.value || i.value ? R(t.default({ present: i })[0], {
      ref: (f) => {
        const u = ne(f);
        return typeof (u == null ? void 0 : u.hasAttribute) > "u" || (u != null && u.hasAttribute("data-radix-popper-content-wrapper") ? r.value = u.firstElementChild : r.value = u), u;
      }
    }) : null;
  }
}), [U, pn] = Me("DialogRoot"), vn = /* @__PURE__ */ A({
  inheritAttrs: !1,
  __name: "DialogRoot",
  props: {
    open: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: !1 },
    modal: { type: Boolean, default: !0 }
  },
  emits: ["update:open"],
  setup(e, { emit: t }) {
    const n = e, o = Gt(n, "open", t, {
      defaultValue: n.defaultOpen,
      passive: n.open === void 0
    }), l = h(), a = h(), { modal: r } = je(n);
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
    }), (i, d) => O(i.$slots, "default", { open: p(o) });
  }
}), gn = /* @__PURE__ */ A({
  __name: "Teleport",
  props: {
    to: { default: "body" },
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = Jt();
    return (n, o) => p(t) || n.forceMount ? (x(), C(ht, {
      key: 0,
      to: n.to,
      disabled: n.disabled
    }, [
      O(n.$slots, "default")
    ], 8, ["to", "disabled"])) : L("", !0);
  }
}), yn = /* @__PURE__ */ A({
  __name: "DialogPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = e;
    return (n, o) => (x(), C(p(gn), gt(yt(t)), {
      default: w(() => [
        O(n.$slots, "default")
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
  const o = ((n = t == null ? void 0 : t.value) == null ? void 0 : n.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), l = h(!1), a = h(() => {
  });
  return q((r) => {
    if (!X)
      return;
    const i = async (c) => {
      const f = c.target;
      if (t != null && t.value) {
        if (nt(t.value, f)) {
          l.value = !1;
          return;
        }
        if (c.target && !l.value) {
          let u = function() {
            He(
              hn,
              e,
              v
            );
          };
          const v = { originalEvent: c };
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
  const o = ((n = t == null ? void 0 : t.value) == null ? void 0 : n.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), l = h(!1);
  return q((a) => {
    if (!X)
      return;
    const r = async (i) => {
      t != null && t.value && (await K(), !(!t.value || nt(t.value, i.target)) && i.target && !l.value && He(
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
const T = Ue({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), En = /* @__PURE__ */ A({
  __name: "DismissableLayer",
  props: {
    disableOutsidePointerEvents: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "dismiss"],
  setup(e, { emit: t }) {
    const n = e, o = t, { forwardRef: l, currentElement: a } = N(), r = B(
      () => {
        var m;
        return ((m = a.value) == null ? void 0 : m.ownerDocument) ?? globalThis.document;
      }
    ), i = B(() => T.layersRoot), d = B(() => a.value ? Array.from(i.value).indexOf(a.value) : -1), c = B(() => T.layersWithOutsidePointerEventsDisabled.size > 0), f = B(() => {
      const m = Array.from(i.value), [g] = [...T.layersWithOutsidePointerEventsDisabled].slice(-1), y = m.indexOf(g);
      return d.value >= y;
    }), u = wn(async (m) => {
      const g = [...T.branches].some(
        (y) => y == null ? void 0 : y.contains(m.target)
      );
      !f.value || g || (o("pointerDownOutside", m), o("interactOutside", m), await K(), m.defaultPrevented || o("dismiss"));
    }, a), v = bn((m) => {
      [...T.branches].some(
        (g) => g == null ? void 0 : g.contains(m.target)
      ) || (o("focusOutside", m), o("interactOutside", m), m.defaultPrevented || o("dismiss"));
    }, a);
    Ht("Escape", (m) => {
      d.value === i.value.size - 1 && (o("escapeKeyDown", m), m.defaultPrevented || o("dismiss"));
    });
    let s;
    return q((m) => {
      a.value && (n.disableOutsidePointerEvents && (T.layersWithOutsidePointerEventsDisabled.size === 0 && (s = r.value.body.style.pointerEvents, r.value.body.style.pointerEvents = "none"), T.layersWithOutsidePointerEventsDisabled.add(a.value)), i.value.add(a.value), m(() => {
        n.disableOutsidePointerEvents && T.layersWithOutsidePointerEventsDisabled.size === 1 && (r.value.body.style.pointerEvents = s);
      }));
    }), q((m) => {
      m(() => {
        a.value && (i.value.delete(a.value), T.layersWithOutsidePointerEventsDisabled.delete(a.value));
      });
    }), (m, g) => (x(), C(p(G), {
      ref: p(l),
      "as-child": m.asChild,
      as: m.as,
      "data-dismissable-layer": "",
      style: bt({
        pointerEvents: c.value ? f.value ? "auto" : "none" : void 0
      }),
      onFocusCapture: p(v).onFocusCapture,
      onBlurCapture: p(v).onBlurCapture,
      onPointerdownCapture: p(u).onPointerDownCapture
    }, {
      default: w(() => [
        O(m.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as", "style", "onFocusCapture", "onBlurCapture", "onPointerdownCapture"]));
  }
}), ge = "focusScope.autoFocusOnMount", ye = "focusScope.autoFocusOnUnmount", Le = { bubbles: !1, cancelable: !0 };
function Cn(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const o of e)
    if (F(o, { select: t }), document.activeElement !== n)
      return !0;
}
function On(e) {
  const t = ot(e), n = Te(t, e), o = Te(t.reverse(), e);
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
function Te(e, t) {
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
function F(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Mn(e) && t && e.select();
  }
}
const Bn = Ft(() => h([]));
function Sn() {
  const e = Bn();
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
function In(e) {
  return e.filter((t) => t.tagName !== "A");
}
const Pn = /* @__PURE__ */ A({
  __name: "FocusScope",
  props: {
    loop: { type: Boolean, default: !1 },
    trapped: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["mountAutoFocus", "unmountAutoFocus"],
  setup(e, { emit: t }) {
    const n = e, o = t, { currentRef: l, currentElement: a } = N(), r = h(null), i = Sn(), d = Ue({
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    });
    q((f) => {
      if (!X)
        return;
      const u = a.value;
      if (!n.trapped)
        return;
      function v(y) {
        if (d.paused || !u)
          return;
        const b = y.target;
        u.contains(b) ? r.value = b : F(r.value, { select: !0 });
      }
      function s(y) {
        if (d.paused || !u)
          return;
        const b = y.relatedTarget;
        b !== null && (u.contains(b) || F(r.value, { select: !0 }));
      }
      function m(y) {
        u.contains(r.value) || F(u);
      }
      document.addEventListener("focusin", v), document.addEventListener("focusout", s);
      const g = new MutationObserver(m);
      u && g.observe(u, { childList: !0, subtree: !0 }), f(() => {
        document.removeEventListener("focusin", v), document.removeEventListener("focusout", s), g.disconnect();
      });
    }), q(async (f) => {
      const u = a.value;
      if (await K(), !u)
        return;
      i.add(d);
      const v = document.activeElement;
      if (!u.contains(v)) {
        const s = new CustomEvent(ge, Le);
        u.addEventListener(ge, (m) => o("mountAutoFocus", m)), u.dispatchEvent(s), s.defaultPrevented || (Cn(In(ot(u)), {
          select: !0
        }), document.activeElement === v && F(u));
      }
      f(() => {
        u.removeEventListener(ge, (g) => o("mountAutoFocus", g));
        const s = new CustomEvent(ye, Le), m = (g) => {
          o("unmountAutoFocus", g);
        };
        u.addEventListener(ye, m), u.dispatchEvent(s), setTimeout(() => {
          s.defaultPrevented || F(v ?? document.body, { select: !0 }), u.removeEventListener(ye, m), i.remove(d);
        }, 0);
      });
    });
    function c(f) {
      if (!n.loop && !n.trapped || d.paused)
        return;
      const u = f.key === "Tab" && !f.altKey && !f.ctrlKey && !f.metaKey, v = document.activeElement;
      if (u && v) {
        const s = f.currentTarget, [m, g] = On(s);
        m && g ? !f.shiftKey && v === g ? (f.preventDefault(), n.loop && F(m, { select: !0 })) : f.shiftKey && v === m && (f.preventDefault(), n.loop && F(g, { select: !0 })) : v === s && f.preventDefault();
      }
    }
    return (f, u) => (x(), C(p(G), {
      ref_key: "currentRef",
      ref: l,
      tabindex: "-1",
      "as-child": f.asChild,
      as: f.as,
      onKeydown: c
    }, {
      default: w(() => [
        O(f.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as"]));
  }
});
function $n(e) {
  return e ? "open" : "closed";
}
const Dn = "DialogTitle", kn = "DialogContent";
function Nn({
  titleName: e = Dn,
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
    const n = e, o = t, l = U(), { forwardRef: a, currentElement: r } = N();
    return l.titleId || (l.titleId = Ne(void 0, "radix-vue-dialog-title")), l.descriptionId || (l.descriptionId = Ne(void 0, "radix-vue-dialog-description")), ce(() => {
      l.contentElement = r, document.activeElement !== document.body && (l.triggerElement.value = document.activeElement);
    }), process.env.NODE_ENV !== "production" && Nn({
      titleName: "DialogTitle",
      contentName: "DialogContent",
      componentLink: "dialog.html#title",
      titleId: l.titleId,
      descriptionId: l.descriptionId,
      contentElement: r
    }), (i, d) => (x(), C(p(Pn), {
      "as-child": "",
      loop: "",
      trapped: n.trapFocus,
      onMountAutoFocus: d[5] || (d[5] = (c) => o("openAutoFocus", c)),
      onUnmountAutoFocus: d[6] || (d[6] = (c) => o("closeAutoFocus", c))
    }, {
      default: w(() => [
        S(p(En), k({
          id: p(l).contentId,
          ref: p(a),
          as: i.as,
          "as-child": i.asChild,
          "disable-outside-pointer-events": i.disableOutsidePointerEvents,
          role: "dialog",
          "aria-describedby": p(l).descriptionId,
          "aria-labelledby": p(l).titleId,
          "data-state": p($n)(p(l).open.value)
        }, i.$attrs, {
          onDismiss: d[0] || (d[0] = (c) => p(l).onOpenChange(!1)),
          onEscapeKeyDown: d[1] || (d[1] = (c) => o("escapeKeyDown", c)),
          onFocusOutside: d[2] || (d[2] = (c) => o("focusOutside", c)),
          onInteractOutside: d[3] || (d[3] = (c) => o("interactOutside", c)),
          onPointerDownOutside: d[4] || (d[4] = (c) => o("pointerDownOutside", c))
        }), {
          default: w(() => [
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
    const n = e, o = t, l = U(), a = Pe(o), { forwardRef: r, currentElement: i } = N();
    return dn(i), (d, c) => (x(), C(lt, k({ ...n, ...p(a) }, {
      ref: p(r),
      "trap-focus": p(l).open.value,
      "disable-outside-pointer-events": !0,
      onCloseAutoFocus: c[0] || (c[0] = (f) => {
        var u;
        f.defaultPrevented || (f.preventDefault(), (u = p(l).triggerElement.value) == null || u.focus());
      }),
      onPointerDownOutside: c[1] || (c[1] = (f) => {
        const u = f.detail.originalEvent, v = u.button === 0 && u.ctrlKey === !0;
        (u.button === 2 || v) && f.preventDefault();
      }),
      onFocusOutside: c[2] || (c[2] = (f) => {
        f.preventDefault();
      })
    }), {
      default: w(() => [
        O(d.$slots, "default")
      ]),
      _: 3
    }, 16, ["trap-focus"]));
  }
}), Tn = /* @__PURE__ */ A({
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
    const n = e, o = Pe(t);
    N();
    const l = U(), a = h(!1), r = h(!1);
    return (i, d) => (x(), C(lt, k({ ...n, ...p(o) }, {
      "trap-focus": !1,
      "disable-outside-pointer-events": !1,
      onCloseAutoFocus: d[0] || (d[0] = (c) => {
        var f;
        c.defaultPrevented || (a.value || (f = p(l).triggerElement.value) == null || f.focus(), c.preventDefault()), a.value = !1, r.value = !1;
      }),
      onInteractOutside: d[1] || (d[1] = (c) => {
        var f;
        c.defaultPrevented || (a.value = !0, c.detail.originalEvent.type === "pointerdown" && (r.value = !0));
        const u = c.target;
        (f = p(l).triggerElement.value) != null && f.contains(u) && c.preventDefault(), c.detail.originalEvent.type === "focusin" && r.value && c.preventDefault();
      })
    }), {
      default: w(() => [
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
    const n = e, o = t, l = U(), a = Pe(o), { forwardRef: r } = N();
    return (i, d) => (x(), C(p(tt), {
      present: i.forceMount || p(l).open.value
    }, {
      default: w(() => [
        p(l).modal.value ? (x(), C(Ln, k({
          key: 0,
          ref: p(r)
        }, { ...n, ...p(a), ...i.$attrs }), {
          default: w(() => [
            O(i.$slots, "default")
          ]),
          _: 3
        }, 16)) : (x(), C(Tn, k({
          key: 1,
          ref: p(r)
        }, { ...n, ...p(a), ...i.$attrs }), {
          default: w(() => [
            O(i.$slots, "default")
          ]),
          _: 3
        }, 16))
      ]),
      _: 3
    }, 8, ["present"]));
  }
}), Wn = /* @__PURE__ */ A({
  __name: "DialogOverlayImpl",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = U();
    return on(!0), N(), (n, o) => (x(), C(p(G), {
      as: n.as,
      "as-child": n.asChild,
      "data-state": p(t).open.value ? "open" : "closed",
      style: { "pointer-events": "auto" }
    }, {
      default: w(() => [
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
    const t = U(), { forwardRef: n } = N();
    return (o, l) => {
      var a;
      return (a = p(t)) != null && a.modal.value ? (x(), C(p(tt), {
        key: 0,
        present: o.forceMount || p(t).open.value
      }, {
        default: w(() => [
          S(Wn, k(o.$attrs, {
            ref: p(n),
            as: o.as,
            "as-child": o.asChild
          }), {
            default: w(() => [
              O(o.$slots, "default")
            ]),
            _: 3
          }, 16, ["as", "as-child"])
        ]),
        _: 3
      }, 8, ["present"])) : L("", !0);
    };
  }
}), Rn = /* @__PURE__ */ A({
  __name: "DialogClose",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(e) {
    const t = e;
    N();
    const n = U();
    return (o, l) => (x(), C(p(G), k(t, {
      type: o.as === "button" ? "button" : void 0,
      onClick: l[0] || (l[0] = (a) => p(n).onOpenChange(!1))
    }), {
      default: w(() => [
        O(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["type"]));
  }
}), rt = /* @__PURE__ */ A({
  __name: "DialogTitle",
  props: {
    asChild: { type: Boolean },
    as: { default: "h2" }
  },
  setup(e) {
    const t = e, n = U();
    return N(), (o, l) => (x(), C(p(G), k(t, {
      id: p(n).titleId
    }), {
      default: w(() => [
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
    return N(), (t, n) => (x(), C(p(G), {
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
      default: w(() => [
        O(t.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
}), [st, ao] = Me("CollectionProvider");
A({
  name: "CollectionSlot",
  setup(e, { slots: t }) {
    const n = st(), { primitiveElement: o, currentElement: l } = et();
    return $(l, () => {
      n.collectionRef.value = l.value;
    }), () => R($e, { ref: o }, t);
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
    const o = st(), { primitiveElement: l, currentElement: a } = et();
    return q((r) => {
      if (a.value) {
        const i = Fe(a.value);
        o.itemMap.value.set(i, { ref: a.value, value: e.value }), r(() => o.itemMap.value.delete(i));
      }
    }), () => R($e, { ...n, [o.attrName]: "", ref: l }, t);
  }
});
function jn() {
  if (typeof matchMedia == "function")
    return matchMedia("(pointer:coarse)").matches ? "coarse" : "fine";
}
jn();
const ut = {
  __name: "CloseButton",
  setup(e) {
    return (t, n) => (x(), C(p(Rn), { class: "im-close-button text-gray-400 hover:text-gray-500" }, {
      default: w(() => n[0] || (n[0] = [
        j("span", { class: "sr-only" }, "Close", -1),
        j("svg", {
          class: "size-6",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "2",
          stroke: "currentColor",
          "aria-hidden": "true"
        }, [
          j("path", {
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
    return (t, n) => (x(), _("div", Un, [
      j("div", {
        class: J(["im-modal-positioner flex min-h-full justify-center", {
          "items-start": e.config.position === "top",
          "items-center": e.config.position === "center",
          "items-end": e.config.position === "bottom"
        }])
      }, [
        S(Ee, {
          appear: "",
          "enter-from-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          "enter-to-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-from-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-to-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          onAfterLeave: e.modalContext.afterLeave
        }, {
          default: w(() => [
            S(p(at), {
              "aria-describedby": void 0,
              class: J({
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
              default: w(() => [
                S(p(it), { "as-child": "" }, {
                  default: w(() => [
                    S(p(rt))
                  ]),
                  _: 1
                }),
                j("div", {
                  class: J(["im-modal-content relative", [e.config.paddingClasses, e.config.panelClasses]])
                }, [
                  e.config.closeButton ? (x(), _("div", _n, [
                    S(ut)
                  ])) : L("", !0),
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
    return (t, n) => (x(), _("div", Kn, [
      j("div", {
        class: J(["im-slideover-positioner flex min-h-full items-center", {
          "justify-start rtl:justify-end": e.config.position === "left",
          "justify-end rtl:justify-start": e.config.position === "right"
        }])
      }, [
        S(Ee, {
          appear: "",
          "enter-from-class": "opacity-0 " + (e.config.position === "left" ? "-translate-x-full" : "translate-x-full"),
          "enter-to-class": "opacity-100 translate-x-0",
          "leave-from-class": "opacity-100 translate-x-0",
          "leave-to-class": "opacity-0 " + (e.config.position === "left" ? "-translate-x-full" : "translate-x-full"),
          onAfterLeave: e.modalContext.afterLeave
        }, {
          default: w(() => [
            S(p(at), {
              "aria-describedby": void 0,
              class: J({
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
              default: w(() => [
                S(p(it), { "as-child": "" }, {
                  default: w(() => [
                    S(p(rt))
                  ]),
                  _: 1
                }),
                j("div", {
                  class: J(["im-slideover-content relative", [e.config.paddingClasses, e.config.panelClasses]])
                }, [
                  e.config.closeButton ? (x(), _("div", Xn, [
                    S(ut)
                  ])) : L("", !0),
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
}, ro = {
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
    }), (l, a) => (x(), C(Wt, {
      ref_key: "modal",
      ref: n
    }, {
      default: w(({
        afterLeave: r,
        close: i,
        config: d,
        emit: c,
        getChildModal: f,
        getParentModal: u,
        id: v,
        index: s,
        isOpen: m,
        modalContext: g,
        onTopOfStack: y,
        reload: b,
        setOpen: P,
        shouldRender: M
      }) => [
        S(p(vn), {
          open: m,
          "onUpdate:open": P
        }, {
          default: w(() => [
            S(p(yn), null, {
              default: w(() => [
                j("div", {
                  "data-inertiaui-modal-id": v,
                  "data-inertiaui-modal-index": s,
                  class: "im-dialog relative z-20"
                }, [
                  s === 0 && y ? (x(), C(Ee, {
                    key: 0,
                    appear: !o.value,
                    "enter-active-class": "transition transform ease-in-out duration-300",
                    "enter-from-class": "opacity-0",
                    "enter-to-class": "opacity-100",
                    "leave-active-class": "transition transform ease-in-out duration-300",
                    "leave-from-class": "opacity-100",
                    "leave-to-class": "opacity-0",
                    onAfterAppear: a[0] || (a[0] = (W) => o.value = !0)
                  }, {
                    default: w(() => [
                      S(p(Fn), { class: "im-backdrop fixed inset-0 z-30 bg-black/75" })
                    ]),
                    _: 1
                  }, 8, ["appear"])) : L("", !0),
                  s > 0 && y ? (x(), _("div", Hn)) : L("", !0),
                  (x(), C(qe(d != null && d.slideover ? zn : qn), {
                    "modal-context": g,
                    config: d
                  }, {
                    default: w(() => [
                      O(l.$slots, "default", {
                        id: v,
                        afterLeave: r,
                        close: i,
                        config: d,
                        emit: c,
                        getChildModal: f,
                        getParentModal: u,
                        index: s,
                        isOpen: m,
                        modalContext: g,
                        onTopOfStack: y,
                        reload: b,
                        setOpen: P,
                        shouldRender: M
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
    const n = e, o = h(!1), l = te(), a = h(null);
    xe("modalContext", a);
    const r = t, i = h(!1), d = B(() => n.navigate ?? Ce("navigate"));
    $(
      () => {
        var g;
        return (g = a.value) == null ? void 0 : g.onTopOfStack;
      },
      (g) => {
        a.value && (g && i.value ? r("focus") : g || r("blur"), i.value = !g);
      }
    );
    const c = h(null);
    se(() => {
      var g;
      return (g = c.value) == null ? void 0 : g.call(c);
    });
    const f = Re();
    function u() {
      c.value = a.value.registerEventListenersFromAttrs(f);
    }
    $(a, (g, y) => {
      g && !y && (u(), r("success"));
    });
    function v() {
      r("close");
    }
    function s() {
      a.value = null, r("after-leave");
    }
    function m() {
      o.value || (n.href.startsWith("#") || (o.value = !0, r("start")), l.visit(
        n.href,
        n.method,
        n.data,
        n.headers,
        It(Xe(n, Tt)),
        v,
        s,
        n.queryStringArrayFormat,
        d.value
      ).then((g) => {
        a.value = g;
      }).catch((g) => r("error", g)).finally(() => o.value = !1));
    }
    return (g, y) => (x(), C(qe(e.as), k(p(f), {
      href: e.href,
      onClick: Ot(m, ["prevent"])
    }), {
      default: w(() => [
        O(g.$slots, "default", { loading: o.value })
      ]),
      _: 3
    }, 16, ["href"]));
  }
};
function so() {
  return At(be("modalContext", null));
}
function uo(e, t = {}) {
  return te().visit(
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
  ro as Modal,
  io as ModalLink,
  $t as ModalRoot,
  Ce as getConfig,
  no as initFromPageProps,
  to as putConfig,
  oo as renderApp,
  eo as resetConfig,
  so as useModal,
  uo as visitModal
};
