var mt = Object.defineProperty;
var pt = (e, t, n) => t in e ? mt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var S = (e, t, n) => pt(e, typeof t != "symbol" ? t + "" : t, n);
import * as Re from "vue";
import { computed as $, provide as Ee, createBlock as C, createCommentVNode as k, openBlock as x, unref as p, mergeProps as L, onUnmounted as Y, onBeforeMount as vt, onMounted as le, watch as I, createElementBlock as q, Fragment as Oe, renderSlot as O, ref as y, h as F, readonly as gt, markRaw as _e, nextTick as X, inject as Ae, onBeforeUnmount as fe, useAttrs as qe, defineComponent as A, toRefs as Ke, normalizeProps as ht, guardReactiveProps as yt, withCtx as w, createVNode as B, getCurrentInstance as Q, Teleport as xt, toHandlerKey as wt, camelize as bt, effectScope as Xe, Comment as Ct, cloneVNode as Et, getCurrentScope as Ot, onScopeDispose as At, reactive as ze, watchEffect as K, normalizeStyle as Mt, createElementVNode as j, normalizeClass as G, Transition as Me, resolveDynamicComponent as Ve, withModifiers as $t, toValue as Bt } from "vue";
import { usePage as He, router as ne } from "@inertiajs/vue3";
import { mergeDataIntoQueryString as St } from "@inertiajs/core";
import me from "axios";
const te = {
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
class It {
  constructor() {
    this.config = {}, this.reset();
  }
  reset() {
    this.config = JSON.parse(JSON.stringify(te));
  }
  put(t, n) {
    if (typeof t == "object") {
      this.config = {
        type: t.type ?? te.type,
        navigate: t.navigate ?? te.navigate,
        modal: { ...te.modal, ...t.modal ?? {} },
        slideover: { ...te.slideover, ...t.slideover ?? {} }
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
const ve = new It(), so = () => ve.reset(), io = (e, t) => ve.put(e, t), $e = (e) => ve.get(e), V = (e, t) => ve.get(e ? `slideover.${t}` : `modal.${t}`);
function Dt(e, t) {
  return e = typeof e == "string" ? new URL(e, window.location.origin) : e, t = typeof t == "string" ? new URL(t, window.location.origin) : t, `${e.origin}${e.pathname}` == `${t.origin}${t.pathname}`;
}
function be(e = "inertiaui_modal_") {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `${e}${crypto.randomUUID()}` : `${e}${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
}
function Z(e) {
  return typeof e == "string" ? e.toLowerCase() : e;
}
function Pt(e, t, n = !1) {
  return n && (t = t.map(Z)), Array.isArray(e) ? e.filter((o) => !t.includes(n ? Z(o) : o)) : Object.keys(e).reduce((o, l) => (t.includes(n ? Z(l) : l) || (o[l] = e[l]), o), {});
}
function Be(e, t, n = !1) {
  return n && (t = t.map(Z)), Array.isArray(e) ? e.filter((o) => t.includes(n ? Z(o) : o)) : Object.keys(e).reduce((o, l) => (t.includes(n ? Z(l) : l) && (o[l] = e[l]), o), {});
}
function Lt(e) {
  return Array.isArray(e) ? e.filter((t) => t !== null) : Object.keys(e).reduce((t, n) => (n in e && e[n] !== null && (t[n] = e[n]), t), {});
}
function Nt(e, t = 3, n = 10) {
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
function ie(e) {
  return e ? (e = e.replace(/_/g, "-"), e = e.replace(/-+/g, "-"), /[A-Z]/.test(e) ? (e = e.replace(/\s+/g, "").replace(/_/g, "").replace(/(?:^|\s|-)+([A-Za-z])/g, (t, n) => n.toUpperCase()), e = e.replace(/(.)(?=[A-Z])/g, "$1-"), e.toLowerCase()) : e) : "";
}
const Je = {
  __name: "ModalRenderer",
  props: {
    index: {
      type: Number,
      required: !0
    }
  },
  setup(e) {
    const t = e, n = ae(), o = $(() => n.stack.value[t.index]);
    return Ee("modalContext", o), (l, a) => {
      var s;
      return (s = o.value) != null && s.component ? (x(), C(p(o).component, L({ key: 0 }, p(Be)(o.value.props ?? {}, o.value.getComponentPropKeys(), !0), {
        onModalEvent: a[0] || (a[0] = (i, ...u) => o.value.emit(i, ...u))
      }), null, 16)) : k("", !0);
    };
  }
}, kt = {
  __name: "ModalRoot",
  setup(e) {
    const t = ae(), n = He();
    let o = !1, l = null, a = !1;
    Y(ne.on("start", () => o = !0)), Y(ne.on("finish", () => o = !1)), Y(
      ne.on("navigate", (i) => {
        const u = i.detail.page.props._inertiaui_modal;
        if (!u) {
          l && t.closeAll(), t.setBaseUrl(null), a = !1;
          return;
        }
        l = u, t.setBaseUrl(u.baseUrl), t.pushFromResponseData(u, {}, () => {
          if (!u.baseUrl) {
            console.error("No base url in modal response data so cannot navigate back");
            return;
          }
          !o && window.location.href !== u.baseUrl && ne.visit(u.baseUrl, {
            preserveScroll: !0,
            preserveState: !0
          });
        });
      })
    );
    const s = (i) => {
      var u;
      return i.headers["X-InertiaUI-Modal-Base-Url"] = t.getBaseUrl() ?? (a ? (u = n.props._inertiaui_modal) == null ? void 0 : u.baseUrl : null), i;
    };
    return vt(() => me.interceptors.request.use(s)), le(() => a = !!n.props._inertiaui_modal), Y(() => me.interceptors.request.eject(s)), I(
      () => {
        var i;
        return (i = n.props) == null ? void 0 : i._inertiaui_modal;
      },
      (i, u) => {
        var c;
        i && u && i.component === u.component && Dt(i.url, u.url) && ((c = t.stack.value[0]) == null || c.updateProps(i.props ?? {}));
      }
    ), (i, u) => (x(), q(Oe, null, [
      O(i.$slots, "default"),
      p(t).stack.value.length ? (x(), C(Je, {
        key: 0,
        index: 0
      })) : k("", !0)
    ], 64));
  }
};
let ge = null;
const J = y({}), oe = y(null), E = y([]), pe = y({}), Rt = (e) => {
  ge = e;
}, uo = (e) => {
  e.resolveComponent && (ge = e.resolveComponent);
};
class Tt {
  constructor(t, n, o, l, a) {
    S(this, "getComponentPropKeys", () => Array.isArray(this.component.props) ? this.component.props : this.component.props ? Object.keys(this.component.props) : []);
    S(this, "getParentModal", () => {
      const t = this.index.value;
      return t < 1 ? null : E.value.slice(0, t).reverse().find((n) => n.isOpen);
    });
    S(this, "getChildModal", () => {
      const t = this.index.value;
      return t === E.value.length - 1 ? null : E.value.slice(t + 1).find((n) => n.isOpen);
    });
    S(this, "show", () => {
      const t = this.index.value;
      if (t > -1) {
        if (E.value[t].isOpen)
          return;
        E.value[t].isOpen = !0, E.value[t].shouldRender = !0;
      }
    });
    S(this, "close", () => {
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
    S(this, "setOpen", (t) => {
      t ? this.show() : this.close();
    });
    S(this, "afterLeave", () => {
      var n;
      const t = this.index.value;
      if (t > -1) {
        if (E.value[t].isOpen)
          return;
        E.value[t].shouldRender = !1, (n = this.afterLeaveCallback) == null || n.call(this), this.afterLeaveCallback = null;
      }
      t === 0 && (E.value = []);
    });
    S(this, "on", (t, n) => {
      t = ie(t), this.listeners[t] = this.listeners[t] ?? [], this.listeners[t].push(n);
    });
    S(this, "off", (t, n) => {
      var o;
      t = ie(t), n ? this.listeners[t] = ((o = this.listeners[t]) == null ? void 0 : o.filter((l) => l !== n)) ?? [] : delete this.listeners[t];
    });
    S(this, "emit", (t, ...n) => {
      var o;
      (o = this.listeners[ie(t)]) == null || o.forEach((l) => l(...n));
    });
    S(this, "registerEventListenersFromAttrs", (t) => {
      const n = [];
      return Object.keys(t).filter((o) => o.startsWith("on")).forEach((o) => {
        const l = ie(o).replace(/^on-/, "");
        this.on(l, t[o]), n.push(() => this.off(l, t[o]));
      }), () => n.forEach((o) => o());
    });
    S(this, "reload", (t = {}) => {
      var a;
      let n = Object.keys(this.response.props);
      if (t.only && (n = Be(n, t.only)), t.except && (n = Pt(n, t.except)), !((a = this.response) != null && a.url))
        return;
      const o = (t.method ?? "get").toLowerCase(), l = t.data ?? {};
      me({
        url: this.response.url,
        method: o,
        data: o === "get" ? {} : l,
        params: o === "get" ? l : {},
        headers: {
          ...t.headers ?? {},
          Accept: "text/html, application/xhtml+xml",
          "X-Inertia": !0,
          "X-Inertia-Partial-Component": this.response.component,
          "X-Inertia-Version": this.response.version,
          "X-Inertia-Partial-Data": n.join(","),
          "X-InertiaUI-Modal": be(),
          "X-InertiaUI-Modal-Use-Router": 0,
          "X-InertiaUI-Modal-Base-Url": oe.value
        }
      }).then((s) => {
        this.updateProps(s.data.props);
      });
    });
    S(this, "updateProps", (t) => {
      Object.assign(this.props.value, t);
    });
    if (this.id = n.id ?? be(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = t, this.props = y(n.props), this.response = n, this.config = o ?? {}, this.onCloseCallback = l, this.afterLeaveCallback = a, J.value[this.id]) {
      this.config = {
        ...this.config,
        ...J.value[this.id].config ?? {}
      };
      const s = J.value[this.id].onClose, i = J.value[this.id].onAfterLeave;
      s && (this.onCloseCallback = l ? () => {
        l(), s();
      } : s), i && (this.afterLeaveCallback = a ? () => {
        a(), i();
      } : i), delete J.value[this.id];
    }
    this.index = $(() => E.value.findIndex((s) => s.id === this.id)), this.onTopOfStack = $(() => {
      var i;
      return E.value.length < 2 ? !0 : ((i = E.value.map((u) => ({ id: u.id, shouldRender: u.shouldRender })).reverse().find((u) => u.shouldRender)) == null ? void 0 : i.id) === this.id;
    });
  }
}
function Wt(e, t) {
  pe.value[e] = { name: e, callback: t };
}
function Ft(e, t, n, o) {
  if (!pe.value[e])
    throw new Error(`The local modal "${e}" has not been registered.`);
  const l = Se(null, {}, t, n, o);
  return l.name = e, pe.value[e].callback(l), l;
}
function Ye(e, t = {}, n = null, o = null) {
  return ge(e.component).then((l) => Se(_e(l), e, t, n, o));
}
function jt(e, t, n = {}, o = {}, l = {}, a = null, s = null, i = "brackets", u = !1) {
  const c = be();
  return new Promise((f, d) => {
    if (e.startsWith("#")) {
      f(Ft(e.substring(1), l, a, s));
      return;
    }
    const [v, r] = St(t, e || "", n, i);
    let m = u && E.value.length === 0;
    if (E.value.length === 0 && (oe.value = typeof window < "u" ? window.location.href : ""), o = {
      ...o,
      Accept: "text/html, application/xhtml+xml",
      "X-Requested-With": "XMLHttpRequest",
      "X-Inertia": !0,
      "X-Inertia-Version": He().version,
      "X-InertiaUI-Modal": c,
      "X-InertiaUI-Modal-Use-Router": m ? 1 : 0,
      "X-InertiaUI-Modal-Base-Url": oe.value
    }, m)
      return J.value[c] = { config: l, onClose: a, onAfterLeave: s }, ne.visit(v, {
        method: t,
        data: r,
        headers: o,
        preserveScroll: !0,
        preserveState: !0,
        onError: d,
        onFinish: () => Nt(() => E.value[0]).then(f)
      });
    me({ url: v, method: t, data: r, headers: o }).then((g) => f(Ye(g.data, l, a, s))).catch(d);
  });
}
function Se(e, t, n, o, l) {
  const a = new Tt(e, t, n, o, l);
  return E.value.push(a), X(() => a.show()), a;
}
const Ut = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], co = (e, t) => (t.resolveComponent && (ge = t.resolveComponent), () => F(kt, () => F(e, t)));
function ae() {
  return {
    setComponentResolver: Rt,
    getBaseUrl: () => oe.value,
    setBaseUrl: (e) => oe.value = e,
    stack: gt(E),
    push: Se,
    pushFromResponseData: Ye,
    closeAll: () => [...E.value].reverse().forEach((e) => e.close()),
    reset: () => E.value = [],
    visit: jt,
    registerLocalModal: Wt,
    removeLocalModal: (e) => delete pe.value[e]
  };
}
const _t = /* @__PURE__ */ Object.assign({
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
  emits: ["modal-event", "focus", "blur", "close", "success"],
  setup(e, { expose: t, emit: n }) {
    const o = e, l = ae(), a = o.name ? y({}) : Ae("modalContext"), s = $(() => {
      var m;
      const r = ((m = a.value.config) == null ? void 0 : m.slideover) ?? o.slideover ?? $e("type") === "slideover";
      return {
        slideover: r,
        closeButton: o.closeButton ?? V(r, "closeButton"),
        closeExplicitly: o.closeExplicitly ?? V(r, "closeExplicitly"),
        maxWidth: o.maxWidth ?? V(r, "maxWidth"),
        paddingClasses: o.paddingClasses ?? V(r, "paddingClasses"),
        panelClasses: o.panelClasses ?? V(r, "panelClasses"),
        position: o.position ?? V(r, "position"),
        ...a.value.config
      };
    });
    o.name && (l.registerLocalModal(o.name, function(r) {
      a.value = r, c();
    }), fe(() => {
      l.removeLocalModal(o.name);
    })), le(() => {
      o.name || c();
    });
    const i = y(null);
    fe(() => {
      var r;
      return (r = i.value) == null ? void 0 : r.call(i);
    });
    const u = qe();
    function c() {
      i.value = a.value.registerEventListenersFromAttrs(u);
    }
    const f = n;
    function d(r, ...m) {
      f("modal-event", r, ...m);
    }
    t({
      emit: d,
      afterLeave: () => {
        var r;
        return (r = a.value) == null ? void 0 : r.afterLeave();
      },
      close: () => {
        var r;
        return (r = a.value) == null ? void 0 : r.close();
      },
      reload: (...r) => {
        var m;
        return (m = a.value) == null ? void 0 : m.reload(...r);
      },
      setOpen: (...r) => {
        var m;
        return (m = a.value) == null ? void 0 : m.setOpen(...r);
      },
      getChildModal: () => {
        var r;
        return (r = a.value) == null ? void 0 : r.getChildModal();
      },
      getParentModal: () => {
        var r;
        return (r = a.value) == null ? void 0 : r.getParentModal();
      },
      get config() {
        var r;
        return (r = a.value) == null ? void 0 : r.config;
      },
      get id() {
        var r;
        return (r = a.value) == null ? void 0 : r.id;
      },
      get index() {
        var r;
        return (r = a.value) == null ? void 0 : r.index;
      },
      get isOpen() {
        var r;
        return (r = a.value) == null ? void 0 : r.isOpen;
      },
      get modalContext() {
        var r;
        return (r = a.value) == null ? void 0 : r.modalContext;
      },
      get onTopOfStack() {
        var r;
        return (r = a.value) == null ? void 0 : r.onTopOfStack;
      },
      get shouldRender() {
        var r;
        return (r = a.value) == null ? void 0 : r.shouldRender;
      }
    }), I(
      () => {
        var r;
        return (r = a.value) == null ? void 0 : r.onTopOfStack;
      },
      (r, m) => {
        r && !m ? f("focus") : !r && m && f("blur");
      }
    ), I(
      () => {
        var r;
        return (r = a.value) == null ? void 0 : r.isOpen;
      },
      (r) => {
        f(r ? "success" : "close");
      },
      { immediate: !0 }
    );
    const v = $(() => {
      var r;
      return (r = l.stack.value.find((m) => m.shouldRender && m.index > a.value.index)) == null ? void 0 : r.index;
    });
    return (r, m) => (x(), q(Oe, null, [
      p(a).shouldRender ? O(r.$slots, "default", {
        key: 0,
        id: p(a).id,
        afterLeave: p(a).afterLeave,
        close: p(a).close,
        config: s.value,
        emit: d,
        getChildModal: p(a).getChildModal,
        getParentModal: p(a).getParentModal,
        index: p(a).index,
        isOpen: p(a).isOpen,
        modalContext: p(a),
        onTopOfStack: p(a).onTopOfStack,
        reload: p(a).reload,
        setOpen: p(a).setOpen,
        shouldRender: p(a).shouldRender
      }) : k("", !0),
      v.value ? (x(), C(Je, {
        key: 1,
        index: v.value
      }, null, 8, ["index"])) : k("", !0)
    ], 64));
  }
});
function Ie(e, t) {
  const n = typeof e == "string" && !t ? `${e}Context` : t, o = Symbol(n);
  return [(l) => {
    const a = Ae(o, l);
    if (a || a === null)
      return a;
    throw new Error(
      `Injection \`${o.toString()}\` not found. Component must be used within ${Array.isArray(e) ? `one of the following components: ${e.join(
        ", "
      )}` : `\`${e}\``}`
    );
  }, (l) => (Ee(o, l), l)];
}
function Ge(e, t, n) {
  const o = n.originalEvent.target, l = new CustomEvent(e, {
    bubbles: !1,
    cancelable: !0,
    detail: n
  });
  t && o.addEventListener(e, t, { once: !0 }), o.dispatchEvent(l);
}
function Ze(e) {
  return Ot() ? (At(e), !0) : !1;
}
function qt(e) {
  let t = !1, n;
  const o = Xe(!0);
  return (...l) => (t || (n = o.run(() => e(...l)), t = !0), n);
}
function Kt(e) {
  let t = 0, n, o;
  const l = () => {
    t -= 1, o && t <= 0 && (o.stop(), n = void 0, o = void 0);
  };
  return (...a) => (t += 1, n || (o = Xe(!0), n = o.run(() => e(...a))), Ze(l), n);
}
function De(e) {
  return typeof e == "function" ? e() : p(e);
}
const z = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Xt = (e) => typeof e < "u", zt = Object.prototype.toString, Vt = (e) => zt.call(e) === "[object Object]", Ht = () => {
}, Te = /* @__PURE__ */ Jt();
function Jt() {
  var e, t;
  return z && ((e = window == null ? void 0 : window.navigator) == null ? void 0 : e.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((t = window == null ? void 0 : window.navigator) == null ? void 0 : t.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function Yt(e) {
  return Q();
}
function Gt(e, t) {
  Yt() && fe(e, t);
}
function re(e) {
  var t;
  const n = De(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const Pe = z ? window : void 0;
function Qe(...e) {
  let t, n, o, l;
  if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([n, o, l] = e, t = Pe) : [t, n, o, l] = e, !t)
    return Ht;
  Array.isArray(n) || (n = [n]), Array.isArray(o) || (o = [o]);
  const a = [], s = () => {
    a.forEach((f) => f()), a.length = 0;
  }, i = (f, d, v, r) => (f.addEventListener(d, v, r), () => f.removeEventListener(d, v, r)), u = I(
    () => [re(t), De(l)],
    ([f, d]) => {
      if (s(), !f)
        return;
      const v = Vt(d) ? { ...d } : d;
      a.push(
        ...n.flatMap((r) => o.map((m) => i(f, r, m, v)))
      );
    },
    { immediate: !0, flush: "post" }
  ), c = () => {
    u(), s();
  };
  return Ze(c), c;
}
function Zt(e) {
  return typeof e == "function" ? e : typeof e == "string" ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => !0;
}
function Qt(...e) {
  let t, n, o = {};
  e.length === 3 ? (t = e[0], n = e[1], o = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (t = !0, n = e[0], o = e[1]) : (t = e[0], n = e[1]) : (t = !0, n = e[0]);
  const {
    target: l = Pe,
    eventName: a = "keydown",
    passive: s = !1,
    dedupe: i = !1
  } = o, u = Zt(t);
  return Qe(l, a, (c) => {
    c.repeat && De(i) || u(c) && n(c);
  }, s);
}
function en() {
  const e = y(!1), t = Q();
  return t && le(() => {
    e.value = !0;
  }, t), e;
}
function tn(e) {
  return JSON.parse(JSON.stringify(e));
}
function nn(e, t, n, o = {}) {
  var l, a, s;
  const {
    clone: i = !1,
    passive: u = !1,
    eventName: c,
    deep: f = !1,
    defaultValue: d,
    shouldEmit: v
  } = o, r = Q(), m = n || (r == null ? void 0 : r.emit) || ((l = r == null ? void 0 : r.$emit) == null ? void 0 : l.bind(r)) || ((s = (a = r == null ? void 0 : r.proxy) == null ? void 0 : a.$emit) == null ? void 0 : s.bind(r == null ? void 0 : r.proxy));
  let g = c;
  g = g || `update:${t.toString()}`;
  const h = (M) => i ? typeof i == "function" ? i(M) : tn(M) : M, b = () => Xt(e[t]) ? h(e[t]) : d, D = (M) => {
    v ? v(M) && m(g, M) : m(g, M);
  };
  if (u) {
    const M = b(), R = y(M);
    let P = !1;
    return I(
      () => e[t],
      (se) => {
        P || (P = !0, R.value = h(se), X(() => P = !1));
      }
    ), I(
      R,
      (se) => {
        !P && (se !== e[t] || f) && D(se);
      },
      { deep: f }
    ), R;
  } else
    return $({
      get() {
        return b();
      },
      set(M) {
        D(M);
      }
    });
}
function Le(e) {
  return e ? e.flatMap((t) => t.type === Oe ? Le(t.children) : [t]) : [];
}
function U() {
  let e = document.activeElement;
  if (e == null)
    return null;
  for (; e != null && e.shadowRoot != null && e.shadowRoot.activeElement != null; )
    e = e.shadowRoot.activeElement;
  return e;
}
function he(e) {
  if (e === null || typeof e != "object")
    return !1;
  const t = Object.getPrototypeOf(e);
  return t !== null && t !== Object.prototype && Object.getPrototypeOf(t) !== null || Symbol.iterator in e ? !1 : Symbol.toStringTag in e ? Object.prototype.toString.call(e) === "[object Module]" : !0;
}
function Ce(e, t, n = ".", o) {
  if (!he(t))
    return Ce(e, {}, n);
  const l = Object.assign({}, t);
  for (const a in e) {
    if (a === "__proto__" || a === "constructor")
      continue;
    const s = e[a];
    s != null && (Array.isArray(s) && Array.isArray(l[a]) ? l[a] = [...s, ...l[a]] : he(s) && he(l[a]) ? l[a] = Ce(
      s,
      l[a],
      (n ? `${n}.` : "") + a.toString()
    ) : l[a] = s);
  }
  return l;
}
function on(e) {
  return (...t) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    t.reduce((n, o) => Ce(n, o, ""), {})
  );
}
const ln = on(), [et, fo] = Ie("ConfigProvider");
let an = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", rn = (e = 21) => {
  let t = "", n = e;
  for (; n--; )
    t += an[Math.random() * 64 | 0];
  return t;
};
const sn = Kt(() => {
  const e = y(/* @__PURE__ */ new Map()), t = y(), n = $(() => {
    for (const s of e.value.values())
      if (s)
        return !0;
    return !1;
  }), o = et({
    scrollBody: y(!0)
  });
  let l = null;
  const a = () => {
    document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.body.style.removeProperty("--scrollbar-width"), document.body.style.overflow = t.value ?? "", Te && (l == null || l()), t.value = void 0;
  };
  return I(n, (s, i) => {
    var u;
    if (!z)
      return;
    if (!s) {
      i && a();
      return;
    }
    t.value === void 0 && (t.value = document.body.style.overflow);
    const c = window.innerWidth - document.documentElement.clientWidth, f = { padding: c, margin: 0 }, d = (u = o.scrollBody) != null && u.value ? typeof o.scrollBody.value == "object" ? ln({
      padding: o.scrollBody.value.padding === !0 ? c : o.scrollBody.value.padding,
      margin: o.scrollBody.value.margin === !0 ? c : o.scrollBody.value.margin
    }, f) : f : { padding: 0, margin: 0 };
    c > 0 && (document.body.style.paddingRight = typeof d.padding == "number" ? `${d.padding}px` : String(d.padding), document.body.style.marginRight = typeof d.margin == "number" ? `${d.margin}px` : String(d.margin), document.body.style.setProperty("--scrollbar-width", `${c}px`), document.body.style.overflow = "hidden"), Te && (l = Qe(
      document,
      "touchmove",
      (v) => dn(v),
      { passive: !1 }
    )), X(() => {
      document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden";
    });
  }, { immediate: !0, flush: "sync" }), e;
});
function un(e) {
  const t = rn(6), n = sn();
  n.value.set(t, e);
  const o = $({
    get: () => n.value.get(t) ?? !1,
    set: (l) => n.value.set(t, l)
  });
  return Gt(() => {
    n.value.delete(t);
  }), o;
}
function tt(e) {
  const t = window.getComputedStyle(e);
  if (t.overflowX === "scroll" || t.overflowY === "scroll" || t.overflowX === "auto" && e.clientWidth < e.scrollWidth || t.overflowY === "auto" && e.clientHeight < e.scrollHeight)
    return !0;
  {
    const n = e.parentNode;
    return !(n instanceof Element) || n.tagName === "BODY" ? !1 : tt(n);
  }
}
function dn(e) {
  const t = e || window.event, n = t.target;
  return n instanceof Element && tt(n) ? !1 : t.touches.length > 1 ? !0 : (t.preventDefault && t.cancelable && t.preventDefault(), !1);
}
function Ne(e) {
  const t = Q(), n = t == null ? void 0 : t.type.emits, o = {};
  return n != null && n.length || console.warn(
    `No emitted event found. Please check component: ${t == null ? void 0 : t.type.__name}`
  ), n == null || n.forEach((l) => {
    o[wt(bt(l))] = (...a) => e(l, ...a);
  }), o;
}
function N() {
  const e = Q(), t = y(), n = $(() => {
    var s, i;
    return ["#text", "#comment"].includes((s = t.value) == null ? void 0 : s.$el.nodeName) ? (i = t.value) == null ? void 0 : i.$el.nextElementSibling : re(t);
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
    t.value = s, s && (Object.defineProperty(l, "$el", {
      enumerable: !0,
      configurable: !0,
      get: () => s instanceof Element ? s : s.$el
    }), e.exposed = l);
  }
  return { forwardRef: a, currentRef: t, currentElement: n };
}
var cn = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, H = /* @__PURE__ */ new WeakMap(), ue = /* @__PURE__ */ new WeakMap(), de = {}, ye = 0, nt = function(e) {
  return e && (e.host || nt(e.parentNode));
}, fn = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var o = nt(n);
    return o && e.contains(o) ? o : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, mn = function(e, t, n, o) {
  var l = fn(t, Array.isArray(e) ? e : [e]);
  de[n] || (de[n] = /* @__PURE__ */ new WeakMap());
  var a = de[n], s = [], i = /* @__PURE__ */ new Set(), u = new Set(l), c = function(d) {
    !d || i.has(d) || (i.add(d), c(d.parentNode));
  };
  l.forEach(c);
  var f = function(d) {
    !d || u.has(d) || Array.prototype.forEach.call(d.children, function(v) {
      if (i.has(v))
        f(v);
      else
        try {
          var r = v.getAttribute(o), m = r !== null && r !== "false", g = (H.get(v) || 0) + 1, h = (a.get(v) || 0) + 1;
          H.set(v, g), a.set(v, h), s.push(v), g === 1 && m && ue.set(v, !0), h === 1 && v.setAttribute(n, "true"), m || v.setAttribute(o, "true");
        } catch (b) {
          console.error("aria-hidden: cannot operate on ", v, b);
        }
    });
  };
  return f(t), i.clear(), ye++, function() {
    s.forEach(function(d) {
      var v = H.get(d) - 1, r = a.get(d) - 1;
      H.set(d, v), a.set(d, r), v || (ue.has(d) || d.removeAttribute(o), ue.delete(d)), r || d.removeAttribute(n);
    }), ye--, ye || (H = /* @__PURE__ */ new WeakMap(), H = /* @__PURE__ */ new WeakMap(), ue = /* @__PURE__ */ new WeakMap(), de = {});
  };
}, pn = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var o = Array.from(Array.isArray(e) ? e : [e]), l = cn(e);
  return l ? (o.push.apply(o, Array.from(l.querySelectorAll("[aria-live]"))), mn(o, l, n, "aria-hidden")) : function() {
    return null;
  };
};
function vn(e) {
  let t;
  I(() => re(e), (n) => {
    n ? t = pn(n) : t && t();
  }), Y(() => {
    t && t();
  });
}
let gn = 0;
function We(e, t = "radix") {
  const n = et({ useId: void 0 });
  return Re.useId ? `${t}-${Re.useId()}` : n.useId ? `${t}-${n.useId()}` : `${t}-${++gn}`;
}
function hn(e, t) {
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
const ke = A({
  name: "PrimitiveSlot",
  inheritAttrs: !1,
  setup(e, { attrs: t, slots: n }) {
    return () => {
      var o, l;
      if (!n.default)
        return null;
      const a = Le(n.default()), s = a.findIndex((f) => f.type !== Ct);
      if (s === -1)
        return a;
      const i = a[s];
      (o = i.props) == null || delete o.ref;
      const u = i.props ? L(t, i.props) : t;
      t.class && (l = i.props) != null && l.class && delete i.props.class;
      const c = Et(i, u);
      for (const f in u)
        f.startsWith("on") && (c.props || (c.props = {}), c.props[f] = u[f]);
      return a.length === 1 ? c : (a[s] = c, a);
    };
  }
}), ee = A({
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
    return typeof o == "string" && ["area", "img", "input"].includes(o) ? () => F(o, t) : o !== "template" ? () => F(e.as, t, { default: n.default }) : () => F(ke, t, { default: n.default });
  }
});
function ot() {
  const e = y(), t = $(() => {
    var n, o;
    return ["#text", "#comment"].includes((n = e.value) == null ? void 0 : n.$el.nodeName) ? (o = e.value) == null ? void 0 : o.$el.nextElementSibling : re(e);
  });
  return {
    primitiveElement: e,
    currentElement: t
  };
}
function yn(e, t) {
  var n;
  const o = y({}), l = y("none"), a = y(e), s = e.value ? "mounted" : "unmounted";
  let i;
  const u = ((n = t.value) == null ? void 0 : n.ownerDocument.defaultView) ?? Pe, { state: c, dispatch: f } = hn(s, {
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
  }), d = (h) => {
    var b;
    if (z) {
      const D = new CustomEvent(h, { bubbles: !1, cancelable: !1 });
      (b = t.value) == null || b.dispatchEvent(D);
    }
  };
  I(
    e,
    async (h, b) => {
      var D;
      const M = b !== h;
      if (await X(), M) {
        const R = l.value, P = ce(t.value);
        h ? (f("MOUNT"), d("enter"), P === "none" && d("after-enter")) : P === "none" || ((D = o.value) == null ? void 0 : D.display) === "none" ? (f("UNMOUNT"), d("leave"), d("after-leave")) : b && R !== P ? (f("ANIMATION_OUT"), d("leave")) : (f("UNMOUNT"), d("after-leave"));
      }
    },
    { immediate: !0 }
  );
  const v = (h) => {
    const b = ce(t.value), D = b.includes(
      h.animationName
    ), M = c.value === "mounted" ? "enter" : "leave";
    if (h.target === t.value && D && (d(`after-${M}`), f("ANIMATION_END"), !a.value)) {
      const R = t.value.style.animationFillMode;
      t.value.style.animationFillMode = "forwards", i = u == null ? void 0 : u.setTimeout(() => {
        var P;
        ((P = t.value) == null ? void 0 : P.style.animationFillMode) === "forwards" && (t.value.style.animationFillMode = R);
      });
    }
    h.target === t.value && b === "none" && f("ANIMATION_END");
  }, r = (h) => {
    h.target === t.value && (l.value = ce(t.value));
  }, m = I(
    t,
    (h, b) => {
      h ? (o.value = getComputedStyle(h), h.addEventListener("animationstart", r), h.addEventListener("animationcancel", v), h.addEventListener("animationend", v)) : (f("ANIMATION_END"), i !== void 0 && (u == null || u.clearTimeout(i)), b == null || b.removeEventListener("animationstart", r), b == null || b.removeEventListener("animationcancel", v), b == null || b.removeEventListener("animationend", v));
    },
    { immediate: !0 }
  ), g = I(c, () => {
    const h = ce(t.value);
    l.value = c.value === "mounted" ? h : "none";
  });
  return Y(() => {
    m(), g();
  }), {
    isPresent: $(
      () => ["mounted", "unmountSuspended"].includes(c.value)
    )
  };
}
function ce(e) {
  return e && getComputedStyle(e).animationName || "none";
}
const lt = A({
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
    const { present: l, forceMount: a } = Ke(e), s = y(), { isPresent: i } = yn(l, s);
    n({ present: i });
    let u = t.default({ present: i });
    u = Le(u || []);
    const c = Q();
    if (u && (u == null ? void 0 : u.length) > 1) {
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
          ].map((d) => `  - ${d}`).join(`
`)
        ].join(`
`)
      );
    }
    return () => a.value || l.value || i.value ? F(t.default({ present: i })[0], {
      ref: (f) => {
        const d = re(f);
        return typeof (d == null ? void 0 : d.hasAttribute) > "u" || (d != null && d.hasAttribute("data-radix-popper-content-wrapper") ? s.value = d.firstElementChild : s.value = d), d;
      }
    }) : null;
  }
}), [_, xn] = Ie("DialogRoot"), wn = /* @__PURE__ */ A({
  inheritAttrs: !1,
  __name: "DialogRoot",
  props: {
    open: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: !1 },
    modal: { type: Boolean, default: !0 }
  },
  emits: ["update:open"],
  setup(e, { emit: t }) {
    const n = e, o = nn(n, "open", t, {
      defaultValue: n.defaultOpen,
      passive: n.open === void 0
    }), l = y(), a = y(), { modal: s } = Ke(n);
    return xn({
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
    }), (i, u) => O(i.$slots, "default", { open: p(o) });
  }
}), bn = /* @__PURE__ */ A({
  __name: "Teleport",
  props: {
    to: { default: "body" },
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = en();
    return (n, o) => p(t) || n.forceMount ? (x(), C(xt, {
      key: 0,
      to: n.to,
      disabled: n.disabled
    }, [
      O(n.$slots, "default")
    ], 8, ["to", "disabled"])) : k("", !0);
  }
}), Cn = /* @__PURE__ */ A({
  __name: "DialogPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = e;
    return (n, o) => (x(), C(p(bn), ht(yt(t)), {
      default: w(() => [
        O(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), En = "dismissableLayer.pointerDownOutside", On = "dismissableLayer.focusOutside";
function at(e, t) {
  const n = t.closest(
    "[data-dismissable-layer]"
  ), o = e.dataset.dismissableLayer === "" ? e : e.querySelector(
    "[data-dismissable-layer]"
  ), l = Array.from(
    e.ownerDocument.querySelectorAll("[data-dismissable-layer]")
  );
  return !!(n && o === n || l.indexOf(o) < l.indexOf(n));
}
function An(e, t) {
  var n;
  const o = ((n = t == null ? void 0 : t.value) == null ? void 0 : n.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), l = y(!1), a = y(() => {
  });
  return K((s) => {
    if (!z)
      return;
    const i = async (c) => {
      const f = c.target;
      if (t != null && t.value) {
        if (at(t.value, f)) {
          l.value = !1;
          return;
        }
        if (c.target && !l.value) {
          let d = function() {
            Ge(
              En,
              e,
              v
            );
          };
          const v = { originalEvent: c };
          c.pointerType === "touch" ? (o.removeEventListener("click", a.value), a.value = d, o.addEventListener("click", a.value, {
            once: !0
          })) : d();
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
function Mn(e, t) {
  var n;
  const o = ((n = t == null ? void 0 : t.value) == null ? void 0 : n.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), l = y(!1);
  return K((a) => {
    if (!z)
      return;
    const s = async (i) => {
      t != null && t.value && (await X(), !(!t.value || at(t.value, i.target)) && i.target && !l.value && Ge(
        On,
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
const T = ze({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), $n = /* @__PURE__ */ A({
  __name: "DismissableLayer",
  props: {
    disableOutsidePointerEvents: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "dismiss"],
  setup(e, { emit: t }) {
    const n = e, o = t, { forwardRef: l, currentElement: a } = N(), s = $(
      () => {
        var m;
        return ((m = a.value) == null ? void 0 : m.ownerDocument) ?? globalThis.document;
      }
    ), i = $(() => T.layersRoot), u = $(() => a.value ? Array.from(i.value).indexOf(a.value) : -1), c = $(() => T.layersWithOutsidePointerEventsDisabled.size > 0), f = $(() => {
      const m = Array.from(i.value), [g] = [...T.layersWithOutsidePointerEventsDisabled].slice(-1), h = m.indexOf(g);
      return u.value >= h;
    }), d = An(async (m) => {
      const g = [...T.branches].some(
        (h) => h == null ? void 0 : h.contains(m.target)
      );
      !f.value || g || (o("pointerDownOutside", m), o("interactOutside", m), await X(), m.defaultPrevented || o("dismiss"));
    }, a), v = Mn((m) => {
      [...T.branches].some(
        (g) => g == null ? void 0 : g.contains(m.target)
      ) || (o("focusOutside", m), o("interactOutside", m), m.defaultPrevented || o("dismiss"));
    }, a);
    Qt("Escape", (m) => {
      u.value === i.value.size - 1 && (o("escapeKeyDown", m), m.defaultPrevented || o("dismiss"));
    });
    let r;
    return K((m) => {
      a.value && (n.disableOutsidePointerEvents && (T.layersWithOutsidePointerEventsDisabled.size === 0 && (r = s.value.body.style.pointerEvents, s.value.body.style.pointerEvents = "none"), T.layersWithOutsidePointerEventsDisabled.add(a.value)), i.value.add(a.value), m(() => {
        n.disableOutsidePointerEvents && T.layersWithOutsidePointerEventsDisabled.size === 1 && (s.value.body.style.pointerEvents = r);
      }));
    }), K((m) => {
      m(() => {
        a.value && (i.value.delete(a.value), T.layersWithOutsidePointerEventsDisabled.delete(a.value));
      });
    }), (m, g) => (x(), C(p(ee), {
      ref: p(l),
      "as-child": m.asChild,
      as: m.as,
      "data-dismissable-layer": "",
      style: Mt({
        pointerEvents: c.value ? f.value ? "auto" : "none" : void 0
      }),
      onFocusCapture: p(v).onFocusCapture,
      onBlurCapture: p(v).onBlurCapture,
      onPointerdownCapture: p(d).onPointerDownCapture
    }, {
      default: w(() => [
        O(m.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as", "style", "onFocusCapture", "onBlurCapture", "onPointerdownCapture"]));
  }
}), xe = "focusScope.autoFocusOnMount", we = "focusScope.autoFocusOnUnmount", Fe = { bubbles: !1, cancelable: !0 };
function Bn(e, { select: t = !1 } = {}) {
  const n = U();
  for (const o of e)
    if (W(o, { select: t }), U() !== n)
      return !0;
}
function Sn(e) {
  const t = rt(e), n = je(t, e), o = je(t.reverse(), e);
  return [n, o];
}
function rt(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (o) => {
      const l = o.tagName === "INPUT" && o.type === "hidden";
      return o.disabled || o.hidden || l ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function je(e, t) {
  for (const n of e)
    if (!In(n, { upTo: t }))
      return n;
}
function In(e, { upTo: t }) {
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
function Dn(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function W(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = U();
    e.focus({ preventScroll: !0 }), e !== n && Dn(e) && t && e.select();
  }
}
const Pn = qt(() => y([]));
function Ln() {
  const e = Pn();
  return {
    add(t) {
      const n = e.value[0];
      t !== n && (n == null || n.pause()), e.value = Ue(e.value, t), e.value.unshift(t);
    },
    remove(t) {
      var n;
      e.value = Ue(e.value, t), (n = e.value[0]) == null || n.resume();
    }
  };
}
function Ue(e, t) {
  const n = [...e], o = n.indexOf(t);
  return o !== -1 && n.splice(o, 1), n;
}
function Nn(e) {
  return e.filter((t) => t.tagName !== "A");
}
const kn = /* @__PURE__ */ A({
  __name: "FocusScope",
  props: {
    loop: { type: Boolean, default: !1 },
    trapped: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["mountAutoFocus", "unmountAutoFocus"],
  setup(e, { emit: t }) {
    const n = e, o = t, { currentRef: l, currentElement: a } = N(), s = y(null), i = Ln(), u = ze({
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    });
    K((f) => {
      if (!z)
        return;
      const d = a.value;
      if (!n.trapped)
        return;
      function v(h) {
        if (u.paused || !d)
          return;
        const b = h.target;
        d.contains(b) ? s.value = b : W(s.value, { select: !0 });
      }
      function r(h) {
        if (u.paused || !d)
          return;
        const b = h.relatedTarget;
        b !== null && (d.contains(b) || W(s.value, { select: !0 }));
      }
      function m(h) {
        d.contains(s.value) || W(d);
      }
      document.addEventListener("focusin", v), document.addEventListener("focusout", r);
      const g = new MutationObserver(m);
      d && g.observe(d, { childList: !0, subtree: !0 }), f(() => {
        document.removeEventListener("focusin", v), document.removeEventListener("focusout", r), g.disconnect();
      });
    }), K(async (f) => {
      const d = a.value;
      if (await X(), !d)
        return;
      i.add(u);
      const v = U();
      if (!d.contains(v)) {
        const r = new CustomEvent(xe, Fe);
        d.addEventListener(xe, (m) => o("mountAutoFocus", m)), d.dispatchEvent(r), r.defaultPrevented || (Bn(Nn(rt(d)), {
          select: !0
        }), U() === v && W(d));
      }
      f(() => {
        d.removeEventListener(xe, (g) => o("mountAutoFocus", g));
        const r = new CustomEvent(we, Fe), m = (g) => {
          o("unmountAutoFocus", g);
        };
        d.addEventListener(we, m), d.dispatchEvent(r), setTimeout(() => {
          r.defaultPrevented || W(v ?? document.body, { select: !0 }), d.removeEventListener(we, m), i.remove(u);
        }, 0);
      });
    });
    function c(f) {
      if (!n.loop && !n.trapped || u.paused)
        return;
      const d = f.key === "Tab" && !f.altKey && !f.ctrlKey && !f.metaKey, v = U();
      if (d && v) {
        const r = f.currentTarget, [m, g] = Sn(r);
        m && g ? !f.shiftKey && v === g ? (f.preventDefault(), n.loop && W(m, { select: !0 })) : f.shiftKey && v === m && (f.preventDefault(), n.loop && W(g, { select: !0 })) : v === r && f.preventDefault();
      }
    }
    return (f, d) => (x(), C(p(ee), {
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
function Rn(e) {
  return e ? "open" : "closed";
}
const Tn = "DialogTitle", Wn = "DialogContent";
function Fn({
  titleName: e = Tn,
  contentName: t = Wn,
  componentLink: n = "dialog.html#title",
  titleId: o,
  descriptionId: l,
  contentElement: a
}) {
  const s = `Warning: \`${t}\` requires a \`${e}\` for the component to be accessible for screen reader users.

If you want to hide the \`${e}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://www.radix-vue.com/components/${n}`, i = `Warning: Missing \`Description\` or \`aria-describedby="undefined"\` for ${t}.`;
  le(() => {
    var u;
    document.getElementById(o) || console.warn(s);
    const c = (u = a.value) == null ? void 0 : u.getAttribute("aria-describedby");
    l && c && (document.getElementById(l) || console.warn(i));
  });
}
const st = /* @__PURE__ */ A({
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
    const n = e, o = t, l = _(), { forwardRef: a, currentElement: s } = N();
    return l.titleId || (l.titleId = We(void 0, "radix-vue-dialog-title")), l.descriptionId || (l.descriptionId = We(void 0, "radix-vue-dialog-description")), le(() => {
      l.contentElement = s, U() !== document.body && (l.triggerElement.value = U());
    }), process.env.NODE_ENV !== "production" && Fn({
      titleName: "DialogTitle",
      contentName: "DialogContent",
      componentLink: "dialog.html#title",
      titleId: l.titleId,
      descriptionId: l.descriptionId,
      contentElement: s
    }), (i, u) => (x(), C(p(kn), {
      "as-child": "",
      loop: "",
      trapped: n.trapFocus,
      onMountAutoFocus: u[5] || (u[5] = (c) => o("openAutoFocus", c)),
      onUnmountAutoFocus: u[6] || (u[6] = (c) => o("closeAutoFocus", c))
    }, {
      default: w(() => [
        B(p($n), L({
          id: p(l).contentId,
          ref: p(a),
          as: i.as,
          "as-child": i.asChild,
          "disable-outside-pointer-events": i.disableOutsidePointerEvents,
          role: "dialog",
          "aria-describedby": p(l).descriptionId,
          "aria-labelledby": p(l).titleId,
          "data-state": p(Rn)(p(l).open.value)
        }, i.$attrs, {
          onDismiss: u[0] || (u[0] = (c) => p(l).onOpenChange(!1)),
          onEscapeKeyDown: u[1] || (u[1] = (c) => o("escapeKeyDown", c)),
          onFocusOutside: u[2] || (u[2] = (c) => o("focusOutside", c)),
          onInteractOutside: u[3] || (u[3] = (c) => o("interactOutside", c)),
          onPointerDownOutside: u[4] || (u[4] = (c) => o("pointerDownOutside", c))
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
}), jn = /* @__PURE__ */ A({
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
    const n = e, o = t, l = _(), a = Ne(o), { forwardRef: s, currentElement: i } = N();
    return vn(i), (u, c) => (x(), C(st, L({ ...n, ...p(a) }, {
      ref: p(s),
      "trap-focus": p(l).open.value,
      "disable-outside-pointer-events": !0,
      onCloseAutoFocus: c[0] || (c[0] = (f) => {
        var d;
        f.defaultPrevented || (f.preventDefault(), (d = p(l).triggerElement.value) == null || d.focus());
      }),
      onPointerDownOutside: c[1] || (c[1] = (f) => {
        const d = f.detail.originalEvent, v = d.button === 0 && d.ctrlKey === !0;
        (d.button === 2 || v) && f.preventDefault();
      }),
      onFocusOutside: c[2] || (c[2] = (f) => {
        f.preventDefault();
      })
    }), {
      default: w(() => [
        O(u.$slots, "default")
      ]),
      _: 3
    }, 16, ["trap-focus"]));
  }
}), Un = /* @__PURE__ */ A({
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
    const n = e, o = Ne(t);
    N();
    const l = _(), a = y(!1), s = y(!1);
    return (i, u) => (x(), C(st, L({ ...n, ...p(o) }, {
      "trap-focus": !1,
      "disable-outside-pointer-events": !1,
      onCloseAutoFocus: u[0] || (u[0] = (c) => {
        var f;
        c.defaultPrevented || (a.value || (f = p(l).triggerElement.value) == null || f.focus(), c.preventDefault()), a.value = !1, s.value = !1;
      }),
      onInteractOutside: u[1] || (u[1] = (c) => {
        var f;
        c.defaultPrevented || (a.value = !0, c.detail.originalEvent.type === "pointerdown" && (s.value = !0));
        const d = c.target;
        (f = p(l).triggerElement.value) != null && f.contains(d) && c.preventDefault(), c.detail.originalEvent.type === "focusin" && s.value && c.preventDefault();
      })
    }), {
      default: w(() => [
        O(i.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), it = /* @__PURE__ */ A({
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
    const n = e, o = t, l = _(), a = Ne(o), { forwardRef: s } = N();
    return (i, u) => (x(), C(p(lt), {
      present: i.forceMount || p(l).open.value
    }, {
      default: w(() => [
        p(l).modal.value ? (x(), C(jn, L({
          key: 0,
          ref: p(s)
        }, { ...n, ...p(a), ...i.$attrs }), {
          default: w(() => [
            O(i.$slots, "default")
          ]),
          _: 3
        }, 16)) : (x(), C(Un, L({
          key: 1,
          ref: p(s)
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
}), _n = /* @__PURE__ */ A({
  __name: "DialogOverlayImpl",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = _();
    return un(!0), N(), (n, o) => (x(), C(p(ee), {
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
}), qn = /* @__PURE__ */ A({
  __name: "DialogOverlay",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = _(), { forwardRef: n } = N();
    return (o, l) => {
      var a;
      return (a = p(t)) != null && a.modal.value ? (x(), C(p(lt), {
        key: 0,
        present: o.forceMount || p(t).open.value
      }, {
        default: w(() => [
          B(_n, L(o.$attrs, {
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
      }, 8, ["present"])) : k("", !0);
    };
  }
}), Kn = /* @__PURE__ */ A({
  __name: "DialogClose",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(e) {
    const t = e;
    N();
    const n = _();
    return (o, l) => (x(), C(p(ee), L(t, {
      type: o.as === "button" ? "button" : void 0,
      onClick: l[0] || (l[0] = (a) => p(n).onOpenChange(!1))
    }), {
      default: w(() => [
        O(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["type"]));
  }
}), ut = /* @__PURE__ */ A({
  __name: "DialogTitle",
  props: {
    asChild: { type: Boolean },
    as: { default: "h2" }
  },
  setup(e) {
    const t = e, n = _();
    return N(), (o, l) => (x(), C(p(ee), L(t, {
      id: p(n).titleId
    }), {
      default: w(() => [
        O(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["id"]));
  }
}), dt = /* @__PURE__ */ A({
  __name: "VisuallyHidden",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(e) {
    return N(), (t, n) => (x(), C(p(ee), {
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
}), [ct, mo] = Ie("CollectionProvider");
A({
  name: "CollectionSlot",
  setup(e, { slots: t }) {
    const n = ct(), { primitiveElement: o, currentElement: l } = ot();
    return I(l, () => {
      n.collectionRef.value = l.value;
    }), () => F(ke, { ref: o }, t);
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
    const o = ct(), { primitiveElement: l, currentElement: a } = ot();
    return K((s) => {
      if (a.value) {
        const i = _e(a.value);
        o.itemMap.value.set(i, { ref: a.value, value: e.value }), s(() => o.itemMap.value.delete(i));
      }
    }), () => F(ke, { ...n, [o.attrName]: "", ref: l }, t);
  }
});
function Xn() {
  if (typeof matchMedia == "function")
    return matchMedia("(pointer:coarse)").matches ? "coarse" : "fine";
}
Xn();
const ft = {
  __name: "CloseButton",
  setup(e) {
    return (t, n) => (x(), C(p(Kn), { class: "im-close-button text-gray-400 hover:text-gray-500" }, {
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
}, zn = { class: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4" }, Vn = ["data-inertiaui-modal-entered"], Hn = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, Jn = {
  __name: "ModalContent",
  props: {
    modalContext: Object,
    config: Object
  },
  setup(e) {
    const t = y(!1);
    return (n, o) => (x(), q("div", zn, [
      j("div", {
        class: G(["im-modal-positioner flex min-h-full justify-center", {
          "items-start": e.config.position === "top",
          "items-center": e.config.position === "center",
          "items-end": e.config.position === "bottom"
        }])
      }, [
        B(Me, {
          appear: "",
          "enter-from-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          "enter-to-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-from-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-to-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          onAfterEnter: o[2] || (o[2] = (l) => t.value = !0),
          onAfterLeave: e.modalContext.afterLeave
        }, {
          default: w(() => [
            B(p(it), {
              "aria-describedby": void 0,
              class: G({
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
              onEscapeKeyDown: o[0] || (o[0] = (l) => {
                var a;
                return ((a = e.config) == null ? void 0 : a.closeExplicitly) && l.preventDefault();
              }),
              onInteractOutside: o[1] || (o[1] = (l) => {
                var a;
                return ((a = e.config) == null ? void 0 : a.closeExplicitly) && l.preventDefault();
              })
            }, {
              default: w(() => [
                B(p(dt), { "as-child": "" }, {
                  default: w(() => [
                    B(p(ut))
                  ]),
                  _: 1
                }),
                j("div", {
                  class: G(["im-modal-content relative", [e.config.paddingClasses, e.config.panelClasses]]),
                  "data-inertiaui-modal-entered": t.value
                }, [
                  e.config.closeButton ? (x(), q("div", Hn, [
                    B(ft)
                  ])) : k("", !0),
                  O(n.$slots, "default", {
                    modalContext: e.modalContext,
                    config: e.config
                  })
                ], 10, Vn)
              ]),
              _: 3
            }, 8, ["class"])
          ]),
          _: 3
        }, 8, ["onAfterLeave"])
      ], 2)
    ]));
  }
}, Yn = { class: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden" }, Gn = ["data-inertiaui-modal-entered"], Zn = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, Qn = {
  __name: "SlideoverContent",
  props: {
    modalContext: Object,
    config: Object
  },
  setup(e) {
    const t = y(!1);
    return (n, o) => (x(), q("div", Yn, [
      j("div", {
        class: G(["im-slideover-positioner flex min-h-full items-center", {
          "justify-start rtl:justify-end": e.config.position === "left",
          "justify-end rtl:justify-start": e.config.position === "right"
        }])
      }, [
        B(Me, {
          appear: "",
          "enter-from-class": "opacity-0 " + (e.config.position === "left" ? "-translate-x-full" : "translate-x-full"),
          "enter-to-class": "opacity-100 translate-x-0",
          "leave-from-class": "opacity-100 translate-x-0",
          "leave-to-class": "opacity-0 " + (e.config.position === "left" ? "-translate-x-full" : "translate-x-full"),
          onAfterEnter: o[2] || (o[2] = (l) => t.value = !0),
          onAfterLeave: e.modalContext.afterLeave
        }, {
          default: w(() => [
            B(p(it), {
              "aria-describedby": void 0,
              class: G({
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
              onEscapeKeyDown: o[0] || (o[0] = (l) => {
                var a;
                return ((a = e.config) == null ? void 0 : a.closeExplicitly) && l.preventDefault();
              }),
              onInteractOutside: o[1] || (o[1] = (l) => {
                var a;
                return ((a = e.config) == null ? void 0 : a.closeExplicitly) && l.preventDefault();
              })
            }, {
              default: w(() => [
                B(p(dt), { "as-child": "" }, {
                  default: w(() => [
                    B(p(ut))
                  ]),
                  _: 1
                }),
                j("div", {
                  class: G(["im-slideover-content relative", [e.config.paddingClasses, e.config.panelClasses]]),
                  "data-inertiaui-modal-entered": t.value
                }, [
                  e.config.closeButton ? (x(), q("div", Zn, [
                    B(ft)
                  ])) : k("", !0),
                  O(n.$slots, "default", {
                    modalContext: e.modalContext,
                    config: e.config
                  })
                ], 10, Gn)
              ]),
              _: 3
            }, 8, ["class"])
          ]),
          _: 3
        }, 8, ["enter-from-class", "leave-to-class", "onAfterLeave"])
      ], 2)
    ]));
  }
}, eo = ["data-inertiaui-modal-id", "data-inertiaui-modal-index", "aria-hidden"], to = {
  key: 1,
  class: "im-backdrop fixed inset-0 z-30 bg-black/75"
}, po = {
  __name: "Modal",
  emits: ["after-leave", "blur", "close", "focus", "success"],
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
    }), (l, a) => (x(), C(_t, {
      ref_key: "modal",
      ref: n,
      onSuccess: a[2] || (a[2] = (s) => l.$emit("success")),
      onClose: a[3] || (a[3] = (s) => l.$emit("close")),
      onFocus: a[4] || (a[4] = (s) => l.$emit("focus")),
      onBlur: a[5] || (a[5] = (s) => l.$emit("blur"))
    }, {
      default: w(({
        afterLeave: s,
        close: i,
        config: u,
        emit: c,
        getChildModal: f,
        getParentModal: d,
        id: v,
        index: r,
        isOpen: m,
        modalContext: g,
        onTopOfStack: h,
        reload: b,
        setOpen: D,
        shouldRender: M
      }) => [
        B(p(wn), {
          open: m,
          "onUpdate:open": D
        }, {
          default: w(() => [
            B(p(Cn), null, {
              default: w(() => [
                j("div", {
                  "data-inertiaui-modal-id": v,
                  "data-inertiaui-modal-index": r,
                  class: "im-dialog relative z-20",
                  "aria-hidden": !h
                }, [
                  r === 0 && h ? (x(), C(Me, {
                    key: 0,
                    appear: !o.value,
                    "enter-active-class": "transition transform ease-in-out duration-300",
                    "enter-from-class": "opacity-0",
                    "enter-to-class": "opacity-100",
                    "leave-active-class": "transition transform ease-in-out duration-300",
                    "leave-from-class": "opacity-100",
                    "leave-to-class": "opacity-0",
                    onAfterAppear: a[0] || (a[0] = (R) => o.value = !0)
                  }, {
                    default: w(() => [
                      B(p(qn), { class: "im-backdrop fixed inset-0 z-30 bg-black/75" })
                    ]),
                    _: 1
                  }, 8, ["appear"])) : k("", !0),
                  r > 0 && h ? (x(), q("div", to)) : k("", !0),
                  (x(), C(Ve(u != null && u.slideover ? Qn : Jn), {
                    "modal-context": g,
                    config: u,
                    onAfterLeave: a[1] || (a[1] = (R) => l.$emit("after-leave"))
                  }, {
                    default: w(() => [
                      O(l.$slots, "default", {
                        id: v,
                        afterLeave: s,
                        close: i,
                        config: u,
                        emit: c,
                        getChildModal: f,
                        getParentModal: d,
                        index: r,
                        isOpen: m,
                        modalContext: g,
                        onTopOfStack: h,
                        reload: b,
                        setOpen: D,
                        shouldRender: M
                      })
                    ]),
                    _: 2
                  }, 1064, ["modal-context", "config"]))
                ], 8, eo)
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
}, vo = {
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
    const n = e, o = y(!1), l = ae(), a = y(null);
    Ee("modalContext", a);
    const s = t, i = y(!1), u = $(() => n.navigate ?? $e("navigate"));
    I(
      () => {
        var g;
        return (g = a.value) == null ? void 0 : g.onTopOfStack;
      },
      (g) => {
        a.value && (g && i.value ? s("focus") : g || s("blur"), i.value = !g);
      }
    );
    const c = y(null);
    fe(() => {
      var g;
      (g = c.value) == null || g.call(c);
    });
    const f = qe();
    function d() {
      c.value = a.value.registerEventListenersFromAttrs(f);
    }
    I(a, (g, h) => {
      g && !h && (d(), s("success"));
    });
    function v() {
      s("close");
    }
    function r() {
      a.value = null, s("after-leave");
    }
    function m() {
      o.value || (n.href.startsWith("#") || (o.value = !0, s("start")), l.visit(
        n.href,
        n.method,
        n.data,
        n.headers,
        Lt(Be(n, Ut)),
        v,
        r,
        n.queryStringArrayFormat,
        u.value
      ).then((g) => {
        a.value = g;
      }).catch((g) => s("error", g)).finally(() => o.value = !1));
    }
    return (g, h) => (x(), C(Ve(e.as), L(p(f), {
      href: e.href,
      onClick: $t(m, ["prevent"])
    }), {
      default: w(() => [
        O(g.$slots, "default", { loading: o.value })
      ]),
      _: 3
    }, 16, ["href"]));
  }
};
function go() {
  return Bt(Ae("modalContext", null));
}
function ho(e, t = {}) {
  return ae().visit(
    e,
    t.method ?? "get",
    t.data ?? {},
    t.headers ?? {},
    t.config ?? {},
    t.onClose,
    t.onAfterLeave,
    t.queryStringArrayFormat ?? "brackets",
    t.navigate ?? $e("navigate")
  ).then((n) => {
    const o = t.listeners ?? {};
    return Object.keys(o).forEach((l) => {
      const a = l.replace(/([A-Z])/g, "-$1").toLowerCase();
      n.on(a, o[l]);
    }), n;
  });
}
export {
  _t as HeadlessModal,
  po as Modal,
  vo as ModalLink,
  kt as ModalRoot,
  $e as getConfig,
  uo as initFromPageProps,
  io as putConfig,
  co as renderApp,
  so as resetConfig,
  go as useModal,
  ho as visitModal
};
