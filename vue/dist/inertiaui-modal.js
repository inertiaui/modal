var ft = Object.defineProperty;
var mt = (e, t, n) => t in e ? ft(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var S = (e, t, n) => mt(e, typeof t != "symbol" ? t + "" : t, n);
import * as ke from "vue";
import { computed as $, provide as Ce, createBlock as C, createCommentVNode as L, openBlock as x, unref as p, mergeProps as N, ref as h, onUnmounted as G, onBeforeMount as pt, watch as I, createElementBlock as q, Fragment as Ee, renderSlot as O, h as F, readonly as vt, markRaw as je, nextTick as X, inject as Oe, onBeforeUnmount as de, onMounted as me, useAttrs as Ue, defineComponent as A, toRefs as _e, normalizeProps as gt, guardReactiveProps as yt, withCtx as w, createVNode as B, getCurrentInstance as Z, Teleport as ht, toHandlerKey as xt, camelize as wt, effectScope as qe, Comment as bt, cloneVNode as Ct, getCurrentScope as Et, onScopeDispose as Ot, reactive as Ke, watchEffect as K, normalizeStyle as At, createElementVNode as j, normalizeClass as J, Transition as Ae, resolveDynamicComponent as Xe, withModifiers as Mt, toValue as $t } from "vue";
import { router as te, usePage as ze } from "@inertiajs/vue3";
import { mergeDataIntoQueryString as Bt } from "@inertiajs/core";
import ce from "axios";
const ee = {
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
    this.config = JSON.parse(JSON.stringify(ee));
  }
  put(t, n) {
    if (typeof t == "object") {
      this.config = {
        type: t.type ?? ee.type,
        navigate: t.navigate ?? ee.navigate,
        modal: { ...ee.modal, ...t.modal ?? {} },
        slideover: { ...ee.slideover, ...t.slideover ?? {} }
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
const pe = new It(), ro = () => pe.reset(), so = (e, t) => pe.put(e, t), Me = (e) => pe.get(e), V = (e, t) => pe.get(e ? `slideover.${t}` : `modal.${t}`);
function St(e, t) {
  return e = typeof e == "string" ? new URL(e, window.location.origin) : e, t = typeof t == "string" ? new URL(t, window.location.origin) : t, `${e.origin}${e.pathname}` == `${t.origin}${t.pathname}`;
}
function we(e = "inertiaui_modal_") {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `${e}${crypto.randomUUID()}` : `${e}${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
}
function Dt(e, t) {
  return Array.isArray(e) ? e.filter((n) => !t.includes(n)) : Object.keys(e).reduce((n, o) => (t.includes(o) || (n[o] = e[o]), n), {});
}
function Ve(e, t) {
  return Array.isArray(e) ? e.filter((n) => t.includes(n)) : t.reduce((n, o) => (o in e && (n[o] = e[o]), n), {});
}
function Pt(e) {
  return Array.isArray(e) ? e.filter((t) => t !== null) : Object.keys(e).reduce((t, n) => (n in e && e[n] !== null && (t[n] = e[n]), t), {});
}
function Nt(e, t = 3, n = 10) {
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
function re(e) {
  return e ? (e = e.replace(/_/g, "-"), e = e.replace(/-+/g, "-"), /[A-Z]/.test(e) ? (e = e.replace(/\s+/g, "").replace(/_/g, "").replace(/(?:^|\s|-)+([A-Za-z])/g, (t, n) => n.toUpperCase()), e = e.replace(/(.)(?=[A-Z])/g, "$1-"), e.toLowerCase()) : e) : "";
}
const He = {
  __name: "ModalRenderer",
  props: {
    index: {
      type: Number,
      required: !0
    }
  },
  setup(e) {
    const t = e, n = oe(), o = $(() => n.stack.value[t.index]);
    return Ce("modalContext", o), (l, a) => {
      var r;
      return (r = o.value) != null && r.component ? (x(), C(p(o).component, N({ key: 0 }, o.value.props, {
        onModalEvent: a[0] || (a[0] = (i, ...d) => o.value.emit(i, ...d))
      }), null, 16)) : L("", !0);
    };
  }
}, kt = {
  __name: "ModalRoot",
  setup(e) {
    const t = oe(), n = h(!1), o = h(null);
    G(te.on("start", () => n.value = !0)), G(te.on("finish", () => n.value = !1)), G(
      te.on("navigate", (r) => {
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
          !n.value && window.location.href !== i.baseUrl && te.visit(i.baseUrl, {
            preserveScroll: !0,
            preserveState: !0
          });
        });
      })
    );
    const l = (r) => (t.stack.value.length && (r.headers["X-InertiaUI-Modal-Base-Url"] = t.getBaseUrl()), r);
    pt(() => {
      ce.interceptors.request.use(l);
    }), G(() => {
      ce.interceptors.request.eject(l);
    });
    const a = ze();
    return I(
      () => {
        var r;
        return (r = a.props) == null ? void 0 : r._inertiaui_modal;
      },
      (r, i) => {
        var d;
        r && i && r.component === i.component && St(r.url, i.url) && ((d = t.stack.value[0]) == null || d.updateProps(r.props ?? {}));
      }
    ), (r, i) => (x(), q(Ee, null, [
      O(r.$slots, "default"),
      p(t).stack.value.length ? (x(), C(He, {
        key: 0,
        index: 0
      })) : L("", !0)
    ], 64));
  }
};
let ve = null;
const Y = h({}), ne = h(null), E = h([]), fe = h({}), Lt = (e) => {
  ve = e;
}, io = (e) => {
  e.resolveComponent && (ve = e.resolveComponent);
};
class Rt {
  constructor(t, n, o, l, a) {
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
      t = re(t), this.listeners[t] = this.listeners[t] ?? [], this.listeners[t].push(n);
    });
    S(this, "off", (t, n) => {
      var o;
      t = re(t), n ? this.listeners[t] = ((o = this.listeners[t]) == null ? void 0 : o.filter((l) => l !== n)) ?? [] : delete this.listeners[t];
    });
    S(this, "emit", (t, ...n) => {
      var o;
      (o = this.listeners[re(t)]) == null || o.forEach((l) => l(...n));
    });
    S(this, "registerEventListenersFromAttrs", (t) => {
      const n = [];
      return Object.keys(t).filter((o) => o.startsWith("on")).forEach((o) => {
        const l = re(o).replace(/^on-/, "");
        this.on(l, t[o]), n.push(() => this.off(l, t[o]));
      }), () => n.forEach((o) => o());
    });
    S(this, "reload", (t = {}) => {
      var o;
      let n = Object.keys(this.response.props);
      t.only && (n = Ve(n, t.only)), t.except && (n = Dt(n, t.except)), (o = this.response) != null && o.url && ce.get(this.response.url, {
        headers: {
          Accept: "text/html, application/xhtml+xml",
          "X-Inertia": !0,
          "X-Inertia-Partial-Component": this.response.component,
          "X-Inertia-Version": this.response.version,
          "X-Inertia-Partial-Data": n.join(","),
          "X-InertiaUI-Modal": we(),
          "X-InertiaUI-Modal-Use-Router": 0,
          "X-InertiaUI-Modal-Base-Url": ne.value
        }
      }).then((l) => {
        this.updateProps(l.data.props);
      });
    });
    S(this, "updateProps", (t) => {
      Object.assign(this.props.value, t);
    });
    if (this.id = n.id ?? we(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = t, this.props = h(n.props), this.response = n, this.config = o ?? {}, this.onCloseCallback = l, this.afterLeaveCallback = a, Y.value[this.id]) {
      this.config = {
        ...this.config,
        ...Y.value[this.id].config ?? {}
      };
      const r = Y.value[this.id].onClose, i = Y.value[this.id].onAfterLeave;
      r && (this.onCloseCallback = l ? () => {
        l(), r();
      } : r), i && (this.afterLeaveCallback = a ? () => {
        a(), i();
      } : i), delete Y.value[this.id];
    }
    this.index = $(() => E.value.findIndex((r) => r.id === this.id)), this.onTopOfStack = $(() => {
      var i;
      return E.value.length < 2 ? !0 : ((i = E.value.map((d) => ({ id: d.id, shouldRender: d.shouldRender })).reverse().find((d) => d.shouldRender)) == null ? void 0 : i.id) === this.id;
    });
  }
}
function Tt(e, t) {
  fe.value[e] = { name: e, callback: t };
}
function Wt(e, t, n, o) {
  if (!fe.value[e])
    throw new Error(`The local modal "${e}" has not been registered.`);
  const l = $e(null, {}, t, n, o);
  return l.name = e, fe.value[e].callback(l), l;
}
function Ye(e, t = {}, n = null, o = null) {
  return ve(e.component).then((l) => $e(je(l), e, t, n, o));
}
function Ft(e, t, n = {}, o = {}, l = {}, a = null, r = null, i = "brackets", d = !1) {
  const f = we();
  return new Promise((c, u) => {
    if (e.startsWith("#")) {
      c(Wt(e.substring(1), l, a, r));
      return;
    }
    const [v, s] = Bt(t, e || "", n, i);
    let m = d && E.value.length === 0;
    if (E.value.length === 0 && (ne.value = typeof window < "u" ? window.location.href : ""), o = {
      ...o,
      Accept: "text/html, application/xhtml+xml",
      "X-Requested-With": "XMLHttpRequest",
      "X-Inertia": !0,
      "X-Inertia-Version": ze().version,
      "X-InertiaUI-Modal": f,
      "X-InertiaUI-Modal-Use-Router": m ? 1 : 0,
      "X-InertiaUI-Modal-Base-Url": ne.value
    }, m)
      return Y.value[f] = { config: l, onClose: a, onAfterLeave: r }, te.visit(v, {
        method: t,
        data: s,
        headers: o,
        preserveScroll: !0,
        preserveState: !0,
        onError: u,
        onFinish: () => Nt(() => E.value[0]).then(c)
      });
    ce({ url: v, method: t, data: s, headers: o }).then((g) => c(Ye(g.data, l, a, r))).catch(u);
  });
}
function $e(e, t, n, o, l) {
  const a = new Rt(e, t, n, o, l);
  return E.value.push(a), X(() => a.show()), a;
}
const jt = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], uo = (e, t) => (t.resolveComponent && (ve = t.resolveComponent), () => F(kt, () => F(e, t)));
function oe() {
  return {
    setComponentResolver: Lt,
    getBaseUrl: () => ne.value,
    setBaseUrl: (e) => ne.value = e,
    stack: vt(E),
    push: $e,
    pushFromResponseData: Ye,
    closeAll: () => [...E.value].reverse().forEach((e) => e.close()),
    reset: () => E.value = [],
    visit: Ft,
    registerLocalModal: Tt,
    removeLocalModal: (e) => delete fe.value[e]
  };
}
const Ut = /* @__PURE__ */ Object.assign({
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
    const o = e, l = oe(), a = o.name ? h({}) : Oe("modalContext"), r = $(() => {
      var m;
      const s = ((m = a.value.config) == null ? void 0 : m.slideover) ?? o.slideover ?? Me("type") === "slideover";
      return {
        slideover: s,
        closeButton: o.closeButton ?? V(s, "closeButton"),
        closeExplicitly: o.closeExplicitly ?? V(s, "closeExplicitly"),
        maxWidth: o.maxWidth ?? V(s, "maxWidth"),
        paddingClasses: o.paddingClasses ?? V(s, "paddingClasses"),
        panelClasses: o.panelClasses ?? V(s, "panelClasses"),
        position: o.position ?? V(s, "position"),
        ...a.value.config
      };
    });
    o.name && (l.registerLocalModal(o.name, function(s) {
      a.value = s, f();
    }), de(() => {
      l.removeLocalModal(o.name);
    })), me(() => {
      o.name || f();
    });
    const i = h(null);
    de(() => {
      var s;
      return (s = i.value) == null ? void 0 : s.call(i);
    });
    const d = Ue();
    function f() {
      i.value = a.value.registerEventListenersFromAttrs(d);
    }
    const c = n;
    function u(s, ...m) {
      c("modal-event", s, ...m);
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
    }), I(
      () => {
        var s;
        return (s = a.value) == null ? void 0 : s.onTopOfStack;
      },
      (s, m) => {
        s && !m ? c("focus") : !s && m && c("blur");
      }
    ), I(
      () => {
        var s;
        return (s = a.value) == null ? void 0 : s.isOpen;
      },
      (s) => {
        c(s ? "success" : "close");
      },
      { immediate: !0 }
    );
    const v = $(() => {
      var s;
      return (s = l.stack.value.find((m) => m.shouldRender && m.index > a.value.index)) == null ? void 0 : s.index;
    });
    return (s, m) => (x(), q(Ee, null, [
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
      v.value ? (x(), C(He, {
        key: 1,
        index: v.value
      }, null, 8, ["index"])) : L("", !0)
    ], 64));
  }
});
function Be(e, t) {
  const n = typeof e == "string" && !t ? `${e}Context` : t, o = Symbol(n);
  return [(l) => {
    const a = Oe(o, l);
    if (a || a === null)
      return a;
    throw new Error(
      `Injection \`${o.toString()}\` not found. Component must be used within ${Array.isArray(e) ? `one of the following components: ${e.join(
        ", "
      )}` : `\`${e}\``}`
    );
  }, (l) => (Ce(o, l), l)];
}
function Ge(e, t, n) {
  const o = n.originalEvent.target, l = new CustomEvent(e, {
    bubbles: !1,
    cancelable: !0,
    detail: n
  });
  t && o.addEventListener(e, t, { once: !0 }), o.dispatchEvent(l);
}
function Je(e) {
  return Et() ? (Ot(e), !0) : !1;
}
function _t(e) {
  let t = !1, n;
  const o = qe(!0);
  return (...l) => (t || (n = o.run(() => e(...l)), t = !0), n);
}
function qt(e) {
  let t = 0, n, o;
  const l = () => {
    t -= 1, o && t <= 0 && (o.stop(), n = void 0, o = void 0);
  };
  return (...a) => (t += 1, n || (o = qe(!0), n = o.run(() => e(...a))), Je(l), n);
}
function Ie(e) {
  return typeof e == "function" ? e() : p(e);
}
const z = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Kt = (e) => typeof e < "u", Xt = Object.prototype.toString, zt = (e) => Xt.call(e) === "[object Object]", Vt = () => {
}, Le = /* @__PURE__ */ Ht();
function Ht() {
  var e, t;
  return z && ((e = window == null ? void 0 : window.navigator) == null ? void 0 : e.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((t = window == null ? void 0 : window.navigator) == null ? void 0 : t.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function Yt(e) {
  return Z();
}
function Gt(e, t) {
  Yt() && de(e, t);
}
function le(e) {
  var t;
  const n = Ie(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const Se = z ? window : void 0;
function Ze(...e) {
  let t, n, o, l;
  if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([n, o, l] = e, t = Se) : [t, n, o, l] = e, !t)
    return Vt;
  Array.isArray(n) || (n = [n]), Array.isArray(o) || (o = [o]);
  const a = [], r = () => {
    a.forEach((c) => c()), a.length = 0;
  }, i = (c, u, v, s) => (c.addEventListener(u, v, s), () => c.removeEventListener(u, v, s)), d = I(
    () => [le(t), Ie(l)],
    ([c, u]) => {
      if (r(), !c)
        return;
      const v = zt(u) ? { ...u } : u;
      a.push(
        ...n.flatMap((s) => o.map((m) => i(c, s, m, v)))
      );
    },
    { immediate: !0, flush: "post" }
  ), f = () => {
    d(), r();
  };
  return Je(f), f;
}
function Jt(e) {
  return typeof e == "function" ? e : typeof e == "string" ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => !0;
}
function Zt(...e) {
  let t, n, o = {};
  e.length === 3 ? (t = e[0], n = e[1], o = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (t = !0, n = e[0], o = e[1]) : (t = e[0], n = e[1]) : (t = !0, n = e[0]);
  const {
    target: l = Se,
    eventName: a = "keydown",
    passive: r = !1,
    dedupe: i = !1
  } = o, d = Jt(t);
  return Ze(l, a, (f) => {
    f.repeat && Ie(i) || d(f) && n(f);
  }, r);
}
function Qt() {
  const e = h(!1), t = Z();
  return t && me(() => {
    e.value = !0;
  }, t), e;
}
function en(e) {
  return JSON.parse(JSON.stringify(e));
}
function tn(e, t, n, o = {}) {
  var l, a, r;
  const {
    clone: i = !1,
    passive: d = !1,
    eventName: f,
    deep: c = !1,
    defaultValue: u,
    shouldEmit: v
  } = o, s = Z(), m = n || (s == null ? void 0 : s.emit) || ((l = s == null ? void 0 : s.$emit) == null ? void 0 : l.bind(s)) || ((r = (a = s == null ? void 0 : s.proxy) == null ? void 0 : a.$emit) == null ? void 0 : r.bind(s == null ? void 0 : s.proxy));
  let g = f;
  g = g || `update:${t.toString()}`;
  const y = (M) => i ? typeof i == "function" ? i(M) : en(M) : M, b = () => Kt(e[t]) ? y(e[t]) : u, D = (M) => {
    v ? v(M) && m(g, M) : m(g, M);
  };
  if (d) {
    const M = b(), R = h(M);
    let P = !1;
    return I(
      () => e[t],
      (ae) => {
        P || (P = !0, R.value = y(ae), X(() => P = !1));
      }
    ), I(
      R,
      (ae) => {
        !P && (ae !== e[t] || c) && D(ae);
      },
      { deep: c }
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
function De(e) {
  return e ? e.flatMap((t) => t.type === Ee ? De(t.children) : [t]) : [];
}
function U() {
  let e = document.activeElement;
  if (e == null)
    return null;
  for (; e != null && e.shadowRoot != null && e.shadowRoot.activeElement != null; )
    e = e.shadowRoot.activeElement;
  return e;
}
function ge(e) {
  if (e === null || typeof e != "object")
    return !1;
  const t = Object.getPrototypeOf(e);
  return t !== null && t !== Object.prototype && Object.getPrototypeOf(t) !== null || Symbol.iterator in e ? !1 : Symbol.toStringTag in e ? Object.prototype.toString.call(e) === "[object Module]" : !0;
}
function be(e, t, n = ".", o) {
  if (!ge(t))
    return be(e, {}, n);
  const l = Object.assign({}, t);
  for (const a in e) {
    if (a === "__proto__" || a === "constructor")
      continue;
    const r = e[a];
    r != null && (Array.isArray(r) && Array.isArray(l[a]) ? l[a] = [...r, ...l[a]] : ge(r) && ge(l[a]) ? l[a] = be(
      r,
      l[a],
      (n ? `${n}.` : "") + a.toString()
    ) : l[a] = r);
  }
  return l;
}
function nn(e) {
  return (...t) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    t.reduce((n, o) => be(n, o, ""), {})
  );
}
const on = nn(), [Qe, co] = Be("ConfigProvider");
let ln = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", an = (e = 21) => {
  let t = "", n = e;
  for (; n--; )
    t += ln[Math.random() * 64 | 0];
  return t;
};
const rn = qt(() => {
  const e = h(/* @__PURE__ */ new Map()), t = h(), n = $(() => {
    for (const r of e.value.values())
      if (r)
        return !0;
    return !1;
  }), o = Qe({
    scrollBody: h(!0)
  });
  let l = null;
  const a = () => {
    document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.body.style.removeProperty("--scrollbar-width"), document.body.style.overflow = t.value ?? "", Le && (l == null || l()), t.value = void 0;
  };
  return I(n, (r, i) => {
    var d;
    if (!z)
      return;
    if (!r) {
      i && a();
      return;
    }
    t.value === void 0 && (t.value = document.body.style.overflow);
    const f = window.innerWidth - document.documentElement.clientWidth, c = { padding: f, margin: 0 }, u = (d = o.scrollBody) != null && d.value ? typeof o.scrollBody.value == "object" ? on({
      padding: o.scrollBody.value.padding === !0 ? f : o.scrollBody.value.padding,
      margin: o.scrollBody.value.margin === !0 ? f : o.scrollBody.value.margin
    }, c) : c : { padding: 0, margin: 0 };
    f > 0 && (document.body.style.paddingRight = typeof u.padding == "number" ? `${u.padding}px` : String(u.padding), document.body.style.marginRight = typeof u.margin == "number" ? `${u.margin}px` : String(u.margin), document.body.style.setProperty("--scrollbar-width", `${f}px`), document.body.style.overflow = "hidden"), Le && (l = Ze(
      document,
      "touchmove",
      (v) => un(v),
      { passive: !1 }
    )), X(() => {
      document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden";
    });
  }, { immediate: !0, flush: "sync" }), e;
});
function sn(e) {
  const t = an(6), n = rn();
  n.value.set(t, e);
  const o = $({
    get: () => n.value.get(t) ?? !1,
    set: (l) => n.value.set(t, l)
  });
  return Gt(() => {
    n.value.delete(t);
  }), o;
}
function et(e) {
  const t = window.getComputedStyle(e);
  if (t.overflowX === "scroll" || t.overflowY === "scroll" || t.overflowX === "auto" && e.clientWidth < e.scrollWidth || t.overflowY === "auto" && e.clientHeight < e.scrollHeight)
    return !0;
  {
    const n = e.parentNode;
    return !n || n.tagName === "BODY" ? !1 : et(n);
  }
}
function un(e) {
  const t = e || window.event, n = t.target;
  return n instanceof Element && et(n) ? !1 : t.touches.length > 1 ? !0 : (t.preventDefault && t.cancelable && t.preventDefault(), !1);
}
function Pe(e) {
  const t = Z(), n = t == null ? void 0 : t.type.emits, o = {};
  return n != null && n.length || console.warn(
    `No emitted event found. Please check component: ${t == null ? void 0 : t.type.__name}`
  ), n == null || n.forEach((l) => {
    o[xt(wt(l))] = (...a) => e(l, ...a);
  }), o;
}
function k() {
  const e = Z(), t = h(), n = $(() => {
    var r, i;
    return ["#text", "#comment"].includes((r = t.value) == null ? void 0 : r.$el.nodeName) ? (i = t.value) == null ? void 0 : i.$el.nextElementSibling : le(t);
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
var dn = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, H = /* @__PURE__ */ new WeakMap(), se = /* @__PURE__ */ new WeakMap(), ie = {}, ye = 0, tt = function(e) {
  return e && (e.host || tt(e.parentNode));
}, cn = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var o = tt(n);
    return o && e.contains(o) ? o : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, fn = function(e, t, n, o) {
  var l = cn(t, Array.isArray(e) ? e : [e]);
  ie[n] || (ie[n] = /* @__PURE__ */ new WeakMap());
  var a = ie[n], r = [], i = /* @__PURE__ */ new Set(), d = new Set(l), f = function(u) {
    !u || i.has(u) || (i.add(u), f(u.parentNode));
  };
  l.forEach(f);
  var c = function(u) {
    !u || d.has(u) || Array.prototype.forEach.call(u.children, function(v) {
      if (i.has(v))
        c(v);
      else
        try {
          var s = v.getAttribute(o), m = s !== null && s !== "false", g = (H.get(v) || 0) + 1, y = (a.get(v) || 0) + 1;
          H.set(v, g), a.set(v, y), r.push(v), g === 1 && m && se.set(v, !0), y === 1 && v.setAttribute(n, "true"), m || v.setAttribute(o, "true");
        } catch (b) {
          console.error("aria-hidden: cannot operate on ", v, b);
        }
    });
  };
  return c(t), i.clear(), ye++, function() {
    r.forEach(function(u) {
      var v = H.get(u) - 1, s = a.get(u) - 1;
      H.set(u, v), a.set(u, s), v || (se.has(u) || u.removeAttribute(o), se.delete(u)), s || u.removeAttribute(n);
    }), ye--, ye || (H = /* @__PURE__ */ new WeakMap(), H = /* @__PURE__ */ new WeakMap(), se = /* @__PURE__ */ new WeakMap(), ie = {});
  };
}, mn = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var o = Array.from(Array.isArray(e) ? e : [e]), l = dn(e);
  return l ? (o.push.apply(o, Array.from(l.querySelectorAll("[aria-live]"))), fn(o, l, n, "aria-hidden")) : function() {
    return null;
  };
};
function pn(e) {
  let t;
  I(() => le(e), (n) => {
    n ? t = mn(n) : t && t();
  }), G(() => {
    t && t();
  });
}
let vn = 0;
function Re(e, t = "radix") {
  const n = Qe({ useId: void 0 });
  return ke.useId ? `${t}-${ke.useId()}` : n.useId ? `${t}-${n.useId()}` : `${t}-${++vn}`;
}
function gn(e, t) {
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
const Ne = A({
  name: "PrimitiveSlot",
  inheritAttrs: !1,
  setup(e, { attrs: t, slots: n }) {
    return () => {
      var o, l;
      if (!n.default)
        return null;
      const a = De(n.default()), r = a.findIndex((c) => c.type !== bt);
      if (r === -1)
        return a;
      const i = a[r];
      (o = i.props) == null || delete o.ref;
      const d = i.props ? N(t, i.props) : t;
      t.class && (l = i.props) != null && l.class && delete i.props.class;
      const f = Ct(i, d);
      for (const c in d)
        c.startsWith("on") && (f.props || (f.props = {}), f.props[c] = d[c]);
      return a.length === 1 ? f : (a[r] = f, a);
    };
  }
}), Q = A({
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
    return typeof o == "string" && ["area", "img", "input"].includes(o) ? () => F(o, t) : o !== "template" ? () => F(e.as, t, { default: n.default }) : () => F(Ne, t, { default: n.default });
  }
});
function nt() {
  const e = h(), t = $(() => {
    var n, o;
    return ["#text", "#comment"].includes((n = e.value) == null ? void 0 : n.$el.nodeName) ? (o = e.value) == null ? void 0 : o.$el.nextElementSibling : le(e);
  });
  return {
    primitiveElement: e,
    currentElement: t
  };
}
function yn(e, t) {
  var n;
  const o = h({}), l = h("none"), a = h(e), r = e.value ? "mounted" : "unmounted";
  let i;
  const d = ((n = t.value) == null ? void 0 : n.ownerDocument.defaultView) ?? Se, { state: f, dispatch: c } = gn(r, {
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
    if (z) {
      const D = new CustomEvent(y, { bubbles: !1, cancelable: !1 });
      (b = t.value) == null || b.dispatchEvent(D);
    }
  };
  I(
    e,
    async (y, b) => {
      var D;
      const M = b !== y;
      if (await X(), M) {
        const R = l.value, P = ue(t.value);
        y ? (c("MOUNT"), u("enter"), P === "none" && u("after-enter")) : P === "none" || ((D = o.value) == null ? void 0 : D.display) === "none" ? (c("UNMOUNT"), u("leave"), u("after-leave")) : b && R !== P ? (c("ANIMATION_OUT"), u("leave")) : (c("UNMOUNT"), u("after-leave"));
      }
    },
    { immediate: !0 }
  );
  const v = (y) => {
    const b = ue(t.value), D = b.includes(
      y.animationName
    ), M = f.value === "mounted" ? "enter" : "leave";
    if (y.target === t.value && D && (u(`after-${M}`), c("ANIMATION_END"), !a.value)) {
      const R = t.value.style.animationFillMode;
      t.value.style.animationFillMode = "forwards", i = d == null ? void 0 : d.setTimeout(() => {
        var P;
        ((P = t.value) == null ? void 0 : P.style.animationFillMode) === "forwards" && (t.value.style.animationFillMode = R);
      });
    }
    y.target === t.value && b === "none" && c("ANIMATION_END");
  }, s = (y) => {
    y.target === t.value && (l.value = ue(t.value));
  }, m = I(
    t,
    (y, b) => {
      y ? (o.value = getComputedStyle(y), y.addEventListener("animationstart", s), y.addEventListener("animationcancel", v), y.addEventListener("animationend", v)) : (c("ANIMATION_END"), i !== void 0 && (d == null || d.clearTimeout(i)), b == null || b.removeEventListener("animationstart", s), b == null || b.removeEventListener("animationcancel", v), b == null || b.removeEventListener("animationend", v));
    },
    { immediate: !0 }
  ), g = I(f, () => {
    const y = ue(t.value);
    l.value = f.value === "mounted" ? y : "none";
  });
  return G(() => {
    m(), g();
  }), {
    isPresent: $(
      () => ["mounted", "unmountSuspended"].includes(f.value)
    )
  };
}
function ue(e) {
  return e && getComputedStyle(e).animationName || "none";
}
const ot = A({
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
    const { present: l, forceMount: a } = _e(e), r = h(), { isPresent: i } = yn(l, r);
    n({ present: i });
    let d = t.default({ present: i });
    d = De(d || []);
    const f = Z();
    if (d && (d == null ? void 0 : d.length) > 1) {
      const c = (o = f == null ? void 0 : f.parent) != null && o.type.name ? `<${f.parent.type.name} />` : "component";
      throw new Error(
        [
          `Detected an invalid children for \`${c}\` for  \`Presence\` component.`,
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
    return () => a.value || l.value || i.value ? F(t.default({ present: i })[0], {
      ref: (c) => {
        const u = le(c);
        return typeof (u == null ? void 0 : u.hasAttribute) > "u" || (u != null && u.hasAttribute("data-radix-popper-content-wrapper") ? r.value = u.firstElementChild : r.value = u), u;
      }
    }) : null;
  }
}), [_, hn] = Be("DialogRoot"), xn = /* @__PURE__ */ A({
  inheritAttrs: !1,
  __name: "DialogRoot",
  props: {
    open: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: !1 },
    modal: { type: Boolean, default: !0 }
  },
  emits: ["update:open"],
  setup(e, { emit: t }) {
    const n = e, o = tn(n, "open", t, {
      defaultValue: n.defaultOpen,
      passive: n.open === void 0
    }), l = h(), a = h(), { modal: r } = _e(n);
    return hn({
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
}), wn = /* @__PURE__ */ A({
  __name: "Teleport",
  props: {
    to: { default: "body" },
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = Qt();
    return (n, o) => p(t) || n.forceMount ? (x(), C(ht, {
      key: 0,
      to: n.to,
      disabled: n.disabled
    }, [
      O(n.$slots, "default")
    ], 8, ["to", "disabled"])) : L("", !0);
  }
}), bn = /* @__PURE__ */ A({
  __name: "DialogPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = e;
    return (n, o) => (x(), C(p(wn), gt(yt(t)), {
      default: w(() => [
        O(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), Cn = "dismissableLayer.pointerDownOutside", En = "dismissableLayer.focusOutside";
function lt(e, t) {
  const n = t.closest(
    "[data-dismissable-layer]"
  ), o = e.dataset.dismissableLayer === "" ? e : e.querySelector(
    "[data-dismissable-layer]"
  ), l = Array.from(
    e.ownerDocument.querySelectorAll("[data-dismissable-layer]")
  );
  return !!(n && o === n || l.indexOf(o) < l.indexOf(n));
}
function On(e, t) {
  var n;
  const o = ((n = t == null ? void 0 : t.value) == null ? void 0 : n.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), l = h(!1), a = h(() => {
  });
  return K((r) => {
    if (!z)
      return;
    const i = async (f) => {
      const c = f.target;
      if (t != null && t.value) {
        if (lt(t.value, c)) {
          l.value = !1;
          return;
        }
        if (f.target && !l.value) {
          let u = function() {
            Ge(
              Cn,
              e,
              v
            );
          };
          const v = { originalEvent: f };
          f.pointerType === "touch" ? (o.removeEventListener("click", a.value), a.value = u, o.addEventListener("click", a.value, {
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
function An(e, t) {
  var n;
  const o = ((n = t == null ? void 0 : t.value) == null ? void 0 : n.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), l = h(!1);
  return K((a) => {
    if (!z)
      return;
    const r = async (i) => {
      t != null && t.value && (await X(), !(!t.value || lt(t.value, i.target)) && i.target && !l.value && Ge(
        En,
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
const T = Ke({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Mn = /* @__PURE__ */ A({
  __name: "DismissableLayer",
  props: {
    disableOutsidePointerEvents: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "dismiss"],
  setup(e, { emit: t }) {
    const n = e, o = t, { forwardRef: l, currentElement: a } = k(), r = $(
      () => {
        var m;
        return ((m = a.value) == null ? void 0 : m.ownerDocument) ?? globalThis.document;
      }
    ), i = $(() => T.layersRoot), d = $(() => a.value ? Array.from(i.value).indexOf(a.value) : -1), f = $(() => T.layersWithOutsidePointerEventsDisabled.size > 0), c = $(() => {
      const m = Array.from(i.value), [g] = [...T.layersWithOutsidePointerEventsDisabled].slice(-1), y = m.indexOf(g);
      return d.value >= y;
    }), u = On(async (m) => {
      const g = [...T.branches].some(
        (y) => y == null ? void 0 : y.contains(m.target)
      );
      !c.value || g || (o("pointerDownOutside", m), o("interactOutside", m), await X(), m.defaultPrevented || o("dismiss"));
    }, a), v = An((m) => {
      [...T.branches].some(
        (g) => g == null ? void 0 : g.contains(m.target)
      ) || (o("focusOutside", m), o("interactOutside", m), m.defaultPrevented || o("dismiss"));
    }, a);
    Zt("Escape", (m) => {
      d.value === i.value.size - 1 && (o("escapeKeyDown", m), m.defaultPrevented || o("dismiss"));
    });
    let s;
    return K((m) => {
      a.value && (n.disableOutsidePointerEvents && (T.layersWithOutsidePointerEventsDisabled.size === 0 && (s = r.value.body.style.pointerEvents, r.value.body.style.pointerEvents = "none"), T.layersWithOutsidePointerEventsDisabled.add(a.value)), i.value.add(a.value), m(() => {
        n.disableOutsidePointerEvents && T.layersWithOutsidePointerEventsDisabled.size === 1 && (r.value.body.style.pointerEvents = s);
      }));
    }), K((m) => {
      m(() => {
        a.value && (i.value.delete(a.value), T.layersWithOutsidePointerEventsDisabled.delete(a.value));
      });
    }), (m, g) => (x(), C(p(Q), {
      ref: p(l),
      "as-child": m.asChild,
      as: m.as,
      "data-dismissable-layer": "",
      style: At({
        pointerEvents: f.value ? c.value ? "auto" : "none" : void 0
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
}), he = "focusScope.autoFocusOnMount", xe = "focusScope.autoFocusOnUnmount", Te = { bubbles: !1, cancelable: !0 };
function $n(e, { select: t = !1 } = {}) {
  const n = U();
  for (const o of e)
    if (W(o, { select: t }), U() !== n)
      return !0;
}
function Bn(e) {
  const t = at(e), n = We(t, e), o = We(t.reverse(), e);
  return [n, o];
}
function at(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (o) => {
      const l = o.tagName === "INPUT" && o.type === "hidden";
      return o.disabled || o.hidden || l ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function We(e, t) {
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
function Sn(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function W(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = U();
    e.focus({ preventScroll: !0 }), e !== n && Sn(e) && t && e.select();
  }
}
const Dn = _t(() => h([]));
function Pn() {
  const e = Dn();
  return {
    add(t) {
      const n = e.value[0];
      t !== n && (n == null || n.pause()), e.value = Fe(e.value, t), e.value.unshift(t);
    },
    remove(t) {
      var n;
      e.value = Fe(e.value, t), (n = e.value[0]) == null || n.resume();
    }
  };
}
function Fe(e, t) {
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
    const n = e, o = t, { currentRef: l, currentElement: a } = k(), r = h(null), i = Pn(), d = Ke({
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    });
    K((c) => {
      if (!z)
        return;
      const u = a.value;
      if (!n.trapped)
        return;
      function v(y) {
        if (d.paused || !u)
          return;
        const b = y.target;
        u.contains(b) ? r.value = b : W(r.value, { select: !0 });
      }
      function s(y) {
        if (d.paused || !u)
          return;
        const b = y.relatedTarget;
        b !== null && (u.contains(b) || W(r.value, { select: !0 }));
      }
      function m(y) {
        u.contains(r.value) || W(u);
      }
      document.addEventListener("focusin", v), document.addEventListener("focusout", s);
      const g = new MutationObserver(m);
      u && g.observe(u, { childList: !0, subtree: !0 }), c(() => {
        document.removeEventListener("focusin", v), document.removeEventListener("focusout", s), g.disconnect();
      });
    }), K(async (c) => {
      const u = a.value;
      if (await X(), !u)
        return;
      i.add(d);
      const v = U();
      if (!u.contains(v)) {
        const s = new CustomEvent(he, Te);
        u.addEventListener(he, (m) => o("mountAutoFocus", m)), u.dispatchEvent(s), s.defaultPrevented || ($n(Nn(at(u)), {
          select: !0
        }), U() === v && W(u));
      }
      c(() => {
        u.removeEventListener(he, (g) => o("mountAutoFocus", g));
        const s = new CustomEvent(xe, Te), m = (g) => {
          o("unmountAutoFocus", g);
        };
        u.addEventListener(xe, m), u.dispatchEvent(s), setTimeout(() => {
          s.defaultPrevented || W(v ?? document.body, { select: !0 }), u.removeEventListener(xe, m), i.remove(d);
        }, 0);
      });
    });
    function f(c) {
      if (!n.loop && !n.trapped || d.paused)
        return;
      const u = c.key === "Tab" && !c.altKey && !c.ctrlKey && !c.metaKey, v = U();
      if (u && v) {
        const s = c.currentTarget, [m, g] = Bn(s);
        m && g ? !c.shiftKey && v === g ? (c.preventDefault(), n.loop && W(m, { select: !0 })) : c.shiftKey && v === m && (c.preventDefault(), n.loop && W(g, { select: !0 })) : v === s && c.preventDefault();
      }
    }
    return (c, u) => (x(), C(p(Q), {
      ref_key: "currentRef",
      ref: l,
      tabindex: "-1",
      "as-child": c.asChild,
      as: c.as,
      onKeydown: f
    }, {
      default: w(() => [
        O(c.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as"]));
  }
});
function Ln(e) {
  return e ? "open" : "closed";
}
const Rn = "DialogTitle", Tn = "DialogContent";
function Wn({
  titleName: e = Rn,
  contentName: t = Tn,
  componentLink: n = "dialog.html#title",
  titleId: o,
  descriptionId: l,
  contentElement: a
}) {
  const r = `Warning: \`${t}\` requires a \`${e}\` for the component to be accessible for screen reader users.

If you want to hide the \`${e}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://www.radix-vue.com/components/${n}`, i = `Warning: Missing \`Description\` or \`aria-describedby="undefined"\` for ${t}.`;
  me(() => {
    var d;
    document.getElementById(o) || console.warn(r);
    const f = (d = a.value) == null ? void 0 : d.getAttribute("aria-describedby");
    l && f && (document.getElementById(l) || console.warn(i));
  });
}
const rt = /* @__PURE__ */ A({
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
    const n = e, o = t, l = _(), { forwardRef: a, currentElement: r } = k();
    return l.titleId || (l.titleId = Re(void 0, "radix-vue-dialog-title")), l.descriptionId || (l.descriptionId = Re(void 0, "radix-vue-dialog-description")), me(() => {
      l.contentElement = r, U() !== document.body && (l.triggerElement.value = U());
    }), process.env.NODE_ENV !== "production" && Wn({
      titleName: "DialogTitle",
      contentName: "DialogContent",
      componentLink: "dialog.html#title",
      titleId: l.titleId,
      descriptionId: l.descriptionId,
      contentElement: r
    }), (i, d) => (x(), C(p(kn), {
      "as-child": "",
      loop: "",
      trapped: n.trapFocus,
      onMountAutoFocus: d[5] || (d[5] = (f) => o("openAutoFocus", f)),
      onUnmountAutoFocus: d[6] || (d[6] = (f) => o("closeAutoFocus", f))
    }, {
      default: w(() => [
        B(p(Mn), N({
          id: p(l).contentId,
          ref: p(a),
          as: i.as,
          "as-child": i.asChild,
          "disable-outside-pointer-events": i.disableOutsidePointerEvents,
          role: "dialog",
          "aria-describedby": p(l).descriptionId,
          "aria-labelledby": p(l).titleId,
          "data-state": p(Ln)(p(l).open.value)
        }, i.$attrs, {
          onDismiss: d[0] || (d[0] = (f) => p(l).onOpenChange(!1)),
          onEscapeKeyDown: d[1] || (d[1] = (f) => o("escapeKeyDown", f)),
          onFocusOutside: d[2] || (d[2] = (f) => o("focusOutside", f)),
          onInteractOutside: d[3] || (d[3] = (f) => o("interactOutside", f)),
          onPointerDownOutside: d[4] || (d[4] = (f) => o("pointerDownOutside", f))
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
}), Fn = /* @__PURE__ */ A({
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
    const n = e, o = t, l = _(), a = Pe(o), { forwardRef: r, currentElement: i } = k();
    return pn(i), (d, f) => (x(), C(rt, N({ ...n, ...p(a) }, {
      ref: p(r),
      "trap-focus": p(l).open.value,
      "disable-outside-pointer-events": !0,
      onCloseAutoFocus: f[0] || (f[0] = (c) => {
        var u;
        c.defaultPrevented || (c.preventDefault(), (u = p(l).triggerElement.value) == null || u.focus());
      }),
      onPointerDownOutside: f[1] || (f[1] = (c) => {
        const u = c.detail.originalEvent, v = u.button === 0 && u.ctrlKey === !0;
        (u.button === 2 || v) && c.preventDefault();
      }),
      onFocusOutside: f[2] || (f[2] = (c) => {
        c.preventDefault();
      })
    }), {
      default: w(() => [
        O(d.$slots, "default")
      ]),
      _: 3
    }, 16, ["trap-focus"]));
  }
}), jn = /* @__PURE__ */ A({
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
    k();
    const l = _(), a = h(!1), r = h(!1);
    return (i, d) => (x(), C(rt, N({ ...n, ...p(o) }, {
      "trap-focus": !1,
      "disable-outside-pointer-events": !1,
      onCloseAutoFocus: d[0] || (d[0] = (f) => {
        var c;
        f.defaultPrevented || (a.value || (c = p(l).triggerElement.value) == null || c.focus(), f.preventDefault()), a.value = !1, r.value = !1;
      }),
      onInteractOutside: d[1] || (d[1] = (f) => {
        var c;
        f.defaultPrevented || (a.value = !0, f.detail.originalEvent.type === "pointerdown" && (r.value = !0));
        const u = f.target;
        (c = p(l).triggerElement.value) != null && c.contains(u) && f.preventDefault(), f.detail.originalEvent.type === "focusin" && r.value && f.preventDefault();
      })
    }), {
      default: w(() => [
        O(i.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), st = /* @__PURE__ */ A({
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
    const n = e, o = t, l = _(), a = Pe(o), { forwardRef: r } = k();
    return (i, d) => (x(), C(p(ot), {
      present: i.forceMount || p(l).open.value
    }, {
      default: w(() => [
        p(l).modal.value ? (x(), C(Fn, N({
          key: 0,
          ref: p(r)
        }, { ...n, ...p(a), ...i.$attrs }), {
          default: w(() => [
            O(i.$slots, "default")
          ]),
          _: 3
        }, 16)) : (x(), C(jn, N({
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
}), Un = /* @__PURE__ */ A({
  __name: "DialogOverlayImpl",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = _();
    return sn(!0), k(), (n, o) => (x(), C(p(Q), {
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
}), _n = /* @__PURE__ */ A({
  __name: "DialogOverlay",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = _(), { forwardRef: n } = k();
    return (o, l) => {
      var a;
      return (a = p(t)) != null && a.modal.value ? (x(), C(p(ot), {
        key: 0,
        present: o.forceMount || p(t).open.value
      }, {
        default: w(() => [
          B(Un, N(o.$attrs, {
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
}), qn = /* @__PURE__ */ A({
  __name: "DialogClose",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(e) {
    const t = e;
    k();
    const n = _();
    return (o, l) => (x(), C(p(Q), N(t, {
      type: o.as === "button" ? "button" : void 0,
      onClick: l[0] || (l[0] = (a) => p(n).onOpenChange(!1))
    }), {
      default: w(() => [
        O(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["type"]));
  }
}), it = /* @__PURE__ */ A({
  __name: "DialogTitle",
  props: {
    asChild: { type: Boolean },
    as: { default: "h2" }
  },
  setup(e) {
    const t = e, n = _();
    return k(), (o, l) => (x(), C(p(Q), N(t, {
      id: p(n).titleId
    }), {
      default: w(() => [
        O(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["id"]));
  }
}), ut = /* @__PURE__ */ A({
  __name: "VisuallyHidden",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(e) {
    return k(), (t, n) => (x(), C(p(Q), {
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
}), [dt, fo] = Be("CollectionProvider");
A({
  name: "CollectionSlot",
  setup(e, { slots: t }) {
    const n = dt(), { primitiveElement: o, currentElement: l } = nt();
    return I(l, () => {
      n.collectionRef.value = l.value;
    }), () => F(Ne, { ref: o }, t);
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
    const o = dt(), { primitiveElement: l, currentElement: a } = nt();
    return K((r) => {
      if (a.value) {
        const i = je(a.value);
        o.itemMap.value.set(i, { ref: a.value, value: e.value }), r(() => o.itemMap.value.delete(i));
      }
    }), () => F(Ne, { ...n, [o.attrName]: "", ref: l }, t);
  }
});
function Kn() {
  if (typeof matchMedia == "function")
    return matchMedia("(pointer:coarse)").matches ? "coarse" : "fine";
}
Kn();
const ct = {
  __name: "CloseButton",
  setup(e) {
    return (t, n) => (x(), C(p(qn), { class: "im-close-button text-gray-400 hover:text-gray-500" }, {
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
}, Xn = { class: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4" }, zn = ["data-inertiaui-modal-entered"], Vn = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, Hn = {
  __name: "ModalContent",
  props: {
    modalContext: Object,
    config: Object
  },
  setup(e) {
    const t = h(!1);
    return (n, o) => (x(), q("div", Xn, [
      j("div", {
        class: J(["im-modal-positioner flex min-h-full justify-center", {
          "items-start": e.config.position === "top",
          "items-center": e.config.position === "center",
          "items-end": e.config.position === "bottom"
        }])
      }, [
        B(Ae, {
          appear: "",
          "enter-from-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          "enter-to-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-from-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-to-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          onAfterEnter: o[2] || (o[2] = (l) => t.value = !0),
          onAfterLeave: e.modalContext.afterLeave
        }, {
          default: w(() => [
            B(p(st), {
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
                B(p(ut), { "as-child": "" }, {
                  default: w(() => [
                    B(p(it))
                  ]),
                  _: 1
                }),
                j("div", {
                  class: J(["im-modal-content relative", [e.config.paddingClasses, e.config.panelClasses]]),
                  "data-inertiaui-modal-entered": t.value
                }, [
                  e.config.closeButton ? (x(), q("div", Vn, [
                    B(ct)
                  ])) : L("", !0),
                  O(n.$slots, "default", {
                    modalContext: e.modalContext,
                    config: e.config
                  })
                ], 10, zn)
              ]),
              _: 3
            }, 8, ["class"])
          ]),
          _: 3
        }, 8, ["onAfterLeave"])
      ], 2)
    ]));
  }
}, Yn = { class: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden" }, Gn = ["data-inertiaui-modal-entered"], Jn = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, Zn = {
  __name: "SlideoverContent",
  props: {
    modalContext: Object,
    config: Object
  },
  setup(e) {
    const t = h(!1);
    return (n, o) => (x(), q("div", Yn, [
      j("div", {
        class: J(["im-slideover-positioner flex min-h-full items-center", {
          "justify-start rtl:justify-end": e.config.position === "left",
          "justify-end rtl:justify-start": e.config.position === "right"
        }])
      }, [
        B(Ae, {
          appear: "",
          "enter-from-class": "opacity-0 " + (e.config.position === "left" ? "-translate-x-full" : "translate-x-full"),
          "enter-to-class": "opacity-100 translate-x-0",
          "leave-from-class": "opacity-100 translate-x-0",
          "leave-to-class": "opacity-0 " + (e.config.position === "left" ? "-translate-x-full" : "translate-x-full"),
          onAfterEnter: o[2] || (o[2] = (l) => t.value = !0),
          onAfterLeave: e.modalContext.afterLeave
        }, {
          default: w(() => [
            B(p(st), {
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
                B(p(ut), { "as-child": "" }, {
                  default: w(() => [
                    B(p(it))
                  ]),
                  _: 1
                }),
                j("div", {
                  class: J(["im-slideover-content relative", [e.config.paddingClasses, e.config.panelClasses]]),
                  "data-inertiaui-modal-entered": t.value
                }, [
                  e.config.closeButton ? (x(), q("div", Jn, [
                    B(ct)
                  ])) : L("", !0),
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
}, Qn = ["data-inertiaui-modal-id", "data-inertiaui-modal-index", "aria-hidden"], eo = {
  key: 1,
  class: "im-backdrop fixed inset-0 z-30 bg-black/75"
}, mo = {
  __name: "Modal",
  emits: ["after-leave", "blur", "close", "focus", "success"],
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
    }), (l, a) => (x(), C(Ut, {
      ref_key: "modal",
      ref: n,
      onSuccess: a[2] || (a[2] = (r) => l.$emit("success")),
      onClose: a[3] || (a[3] = (r) => l.$emit("close")),
      onFocus: a[4] || (a[4] = (r) => l.$emit("focus")),
      onBlur: a[5] || (a[5] = (r) => l.$emit("blur"))
    }, {
      default: w(({
        afterLeave: r,
        close: i,
        config: d,
        emit: f,
        getChildModal: c,
        getParentModal: u,
        id: v,
        index: s,
        isOpen: m,
        modalContext: g,
        onTopOfStack: y,
        reload: b,
        setOpen: D,
        shouldRender: M
      }) => [
        B(p(xn), {
          open: m,
          "onUpdate:open": D
        }, {
          default: w(() => [
            B(p(bn), null, {
              default: w(() => [
                j("div", {
                  "data-inertiaui-modal-id": v,
                  "data-inertiaui-modal-index": s,
                  class: "im-dialog relative z-20",
                  "aria-hidden": !y
                }, [
                  s === 0 && y ? (x(), C(Ae, {
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
                      B(p(_n), { class: "im-backdrop fixed inset-0 z-30 bg-black/75" })
                    ]),
                    _: 1
                  }, 8, ["appear"])) : L("", !0),
                  s > 0 && y ? (x(), q("div", eo)) : L("", !0),
                  (x(), C(Xe(d != null && d.slideover ? Zn : Hn), {
                    "modal-context": g,
                    config: d,
                    onAfterLeave: a[1] || (a[1] = (R) => l.$emit("after-leave"))
                  }, {
                    default: w(() => [
                      O(l.$slots, "default", {
                        id: v,
                        afterLeave: r,
                        close: i,
                        config: d,
                        emit: f,
                        getChildModal: c,
                        getParentModal: u,
                        index: s,
                        isOpen: m,
                        modalContext: g,
                        onTopOfStack: y,
                        reload: b,
                        setOpen: D,
                        shouldRender: M
                      })
                    ]),
                    _: 2
                  }, 1064, ["modal-context", "config"]))
                ], 8, Qn)
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
}, po = {
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
    const n = e, o = h(!1), l = oe(), a = h(null);
    Ce("modalContext", a);
    const r = t, i = h(!1), d = $(() => n.navigate ?? Me("navigate"));
    I(
      () => {
        var g;
        return (g = a.value) == null ? void 0 : g.onTopOfStack;
      },
      (g) => {
        a.value && (g && i.value ? r("focus") : g || r("blur"), i.value = !g);
      }
    );
    const f = h(null);
    de(() => {
      var g;
      (g = f.value) == null || g.call(f);
    });
    const c = Ue();
    function u() {
      f.value = a.value.registerEventListenersFromAttrs(c);
    }
    I(a, (g, y) => {
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
        Pt(Ve(n, jt)),
        v,
        s,
        n.queryStringArrayFormat,
        d.value
      ).then((g) => {
        a.value = g;
      }).catch((g) => r("error", g)).finally(() => o.value = !1));
    }
    return (g, y) => (x(), C(Xe(e.as), N(p(c), {
      href: e.href,
      onClick: Mt(m, ["prevent"])
    }), {
      default: w(() => [
        O(g.$slots, "default", { loading: o.value })
      ]),
      _: 3
    }, 16, ["href"]));
  }
};
function vo() {
  return $t(Oe("modalContext", null));
}
function go(e, t = {}) {
  return oe().visit(
    e,
    t.method ?? "get",
    t.data ?? {},
    t.headers ?? {},
    t.config ?? {},
    t.onClose,
    t.onAfterLeave,
    t.queryStringArrayFormat ?? "brackets",
    t.navigate ?? Me("navigate")
  ).then((n) => {
    const o = t.listeners ?? {};
    return Object.keys(o).forEach((l) => {
      const a = l.replace(/([A-Z])/g, "-$1").toLowerCase();
      n.on(a, o[l]);
    }), n;
  });
}
export {
  Ut as HeadlessModal,
  mo as Modal,
  po as ModalLink,
  kt as ModalRoot,
  Me as getConfig,
  io as initFromPageProps,
  so as putConfig,
  uo as renderApp,
  ro as resetConfig,
  vo as useModal,
  go as visitModal
};
