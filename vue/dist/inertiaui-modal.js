var ft = Object.defineProperty;
var mt = (e, t, n) => t in e ? ft(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var P = (e, t, n) => mt(e, typeof t != "symbol" ? t + "" : t, n);
import * as Le from "vue";
import { computed as $, provide as Ee, openBlock as w, createBlock as E, unref as p, mergeProps as L, createCommentVNode as F, ref as h, onUnmounted as q, onBeforeMount as pt, watch as I, createElementBlock as K, Fragment as Ce, renderSlot as O, h as R, readonly as vt, markRaw as je, nextTick as z, inject as Oe, onBeforeUnmount as ue, onMounted as fe, useAttrs as _e, defineComponent as M, Comment as gt, cloneVNode as yt, toRefs as qe, getCurrentInstance as Z, normalizeProps as ht, guardReactiveProps as xt, withCtx as b, reactive as Ke, createVNode as S, watchEffect as X, effectScope as Xe, Teleport as wt, toHandlerKey as bt, camelize as Et, normalizeStyle as Ct, getCurrentScope as Ot, onScopeDispose as At, createElementVNode as U, normalizeClass as J, Transition as Ae, resolveDynamicComponent as ze, withModifiers as Mt, toValue as $t } from "vue";
import { router as _, usePage as xe } from "@inertiajs/vue3";
import { mergeDataIntoQueryString as St } from "@inertiajs/core";
import de from "axios";
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
class Bt {
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
const me = new Bt(), ao = () => me.reset(), ro = (e, t) => me.put(e, t), Me = (e) => me.get(e), H = (e, t) => me.get(e ? `slideover.${t}` : `modal.${t}`);
function Ne(e, t) {
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
function ae(e) {
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
    const t = e, n = ne(), o = $(() => n.stack.value[t.index]);
    return Ee("modalContext", o), (l, a) => {
      var r;
      return (r = o.value) != null && r.component ? (w(), E(p(o).component, L({ key: 0 }, o.value.props, {
        onModalEvent: a[0] || (a[0] = (i, ...d) => o.value.emit(i, ...d))
      }), null, 16)) : F("", !0);
    };
  }
}, kt = {
  __name: "ModalRoot",
  setup(e) {
    const t = ne(), n = h(!1), o = h(null);
    q(
      _.on("before", (r) => {
        var D;
        if (!Ne(window.location.href, r.detail.visit.url) || r.detail.visit.replace || t.stack.value.length !== 1 || !((D = xe().props) != null && D._inertiaui_modal))
          return !0;
        const {
          method: i,
          data: d,
          only: f,
          except: c,
          headers: u,
          errorBag: v,
          forceFormData: s,
          queryStringArrayFormat: m,
          async: g,
          showProgress: y,
          prefetch: x,
          fresh: B,
          reset: A,
          preserveUrl: k
        } = r.detail.visit;
        return _.visit(r.detail.visit.url, {
          replace: !0,
          preserveScroll: !0,
          preserveState: !0,
          method: i,
          data: d,
          only: f,
          except: c,
          headers: u,
          errorBag: v,
          forceFormData: s,
          queryStringArrayFormat: m,
          async: g,
          showProgress: y,
          prefetch: x,
          fresh: B,
          reset: A,
          preserveUrl: k
        }), !1;
      })
    ), q(_.on("start", () => n.value = !0)), q(_.on("finish", () => n.value = !1)), q(
      _.on("navigate", (r) => {
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
          !n.value && window.location.href !== i.baseUrl && _.visit(i.baseUrl, {
            preserveScroll: !0,
            preserveState: !0
          });
        });
      })
    );
    const l = (r) => (t.stack.value.length && (r.headers["X-InertiaUI-Modal-Base-Url"] = t.getBaseUrl()), r);
    pt(() => {
      de.interceptors.request.use(l);
    }), q(() => {
      de.interceptors.request.eject(l);
    });
    const a = xe();
    return I(
      () => {
        var r;
        return (r = a.props) == null ? void 0 : r._inertiaui_modal;
      },
      (r, i) => {
        var d;
        r && i && r.component === i.component && Ne(r.url, i.url) && ((d = t.stack.value[0]) == null || d.updateProps(r.props ?? {}));
      }
    ), (r, i) => (w(), K(Ce, null, [
      O(r.$slots, "default"),
      p(t).stack.value.length ? (w(), E(He, {
        key: 0,
        index: 0
      })) : F("", !0)
    ], 64));
  }
};
let pe = null;
const Y = h({}), te = h(null), C = h([]), ce = h({}), Lt = (e) => {
  pe = e;
}, so = (e) => {
  e.resolveComponent && (pe = e.resolveComponent);
};
class Nt {
  constructor(t, n, o, l, a) {
    P(this, "getParentModal", () => {
      const t = this.index.value;
      return t < 1 ? null : C.value.slice(0, t).reverse().find((n) => n.isOpen);
    });
    P(this, "getChildModal", () => {
      const t = this.index.value;
      return t === C.value.length - 1 ? null : C.value.slice(t + 1).find((n) => n.isOpen);
    });
    P(this, "show", () => {
      const t = this.index.value;
      if (t > -1) {
        if (C.value[t].isOpen)
          return;
        C.value[t].isOpen = !0, C.value[t].shouldRender = !0;
      }
    });
    P(this, "close", () => {
      var n;
      const t = this.index.value;
      if (t > -1) {
        if (!C.value[t].isOpen)
          return;
        Object.keys(this.listeners).forEach((o) => {
          this.off(o);
        }), C.value[t].isOpen = !1, (n = this.onCloseCallback) == null || n.call(this), this.onCloseCallback = null;
      }
    });
    P(this, "setOpen", (t) => {
      t ? this.show() : this.close();
    });
    P(this, "afterLeave", () => {
      var n;
      const t = this.index.value;
      if (t > -1) {
        if (C.value[t].isOpen)
          return;
        C.value[t].shouldRender = !1, (n = this.afterLeaveCallback) == null || n.call(this), this.afterLeaveCallback = null;
      }
      t === 0 && (C.value = []);
    });
    P(this, "on", (t, n) => {
      t = ae(t), this.listeners[t] = this.listeners[t] ?? [], this.listeners[t].push(n);
    });
    P(this, "off", (t, n) => {
      var o;
      t = ae(t), n ? this.listeners[t] = ((o = this.listeners[t]) == null ? void 0 : o.filter((l) => l !== n)) ?? [] : delete this.listeners[t];
    });
    P(this, "emit", (t, ...n) => {
      var o;
      (o = this.listeners[ae(t)]) == null || o.forEach((l) => l(...n));
    });
    P(this, "registerEventListenersFromAttrs", (t) => {
      const n = [];
      return Object.keys(t).filter((o) => o.startsWith("on")).forEach((o) => {
        const l = ae(o).replace(/^on-/, "");
        this.on(l, t[o]), n.push(() => this.off(l, t[o]));
      }), () => n.forEach((o) => o());
    });
    P(this, "reload", (t = {}) => {
      var o;
      let n = Object.keys(this.response.props);
      t.only && (n = Ve(n, t.only)), t.except && (n = Dt(n, t.except)), (o = this.response) != null && o.url && de.get(this.response.url, {
        headers: {
          Accept: "text/html, application/xhtml+xml",
          "X-Inertia": !0,
          "X-Inertia-Partial-Component": this.response.component,
          "X-Inertia-Version": this.response.version,
          "X-Inertia-Partial-Data": n.join(","),
          "X-InertiaUI-Modal": we(),
          "X-InertiaUI-Modal-Use-Router": 0,
          "X-InertiaUI-Modal-Base-Url": te.value
        }
      }).then((l) => {
        this.updateProps(l.data.props);
      });
    });
    P(this, "updateProps", (t) => {
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
    this.index = $(() => C.value.findIndex((r) => r.id === this.id)), this.onTopOfStack = $(() => {
      var i;
      return C.value.length < 2 ? !0 : ((i = C.value.map((d) => ({ id: d.id, shouldRender: d.shouldRender })).reverse().find((d) => d.shouldRender)) == null ? void 0 : i.id) === this.id;
    });
  }
}
function Ft(e, t) {
  ce.value[e] = { name: e, callback: t };
}
function Wt(e, t, n, o) {
  if (!ce.value[e])
    throw new Error(`The local modal "${e}" has not been registered.`);
  const l = $e(null, {}, t, n, o);
  return l.name = e, ce.value[e].callback(l), l;
}
function Ge(e, t = {}, n = null, o = null) {
  return pe(e.component).then((l) => $e(je(l), e, t, n, o));
}
function Tt(e, t, n = {}, o = {}, l = {}, a = null, r = null, i = "brackets", d = !1) {
  const f = we();
  return new Promise((c, u) => {
    if (e.startsWith("#")) {
      c(Wt(e.substring(1), l, a, r));
      return;
    }
    const [v, s] = St(t, e || "", n, i);
    let m = d && C.value.length === 0;
    if (C.value.length === 0 && (te.value = typeof window < "u" ? window.location.href : ""), o = {
      ...o,
      Accept: "text/html, application/xhtml+xml",
      "X-Requested-With": "XMLHttpRequest",
      "X-Inertia": !0,
      "X-Inertia-Version": xe().version,
      "X-InertiaUI-Modal": f,
      "X-InertiaUI-Modal-Use-Router": m ? 1 : 0,
      "X-InertiaUI-Modal-Base-Url": te.value
    }, m)
      return Y.value[f] = { config: l, onClose: a, onAfterLeave: r }, _.visit(v, {
        method: t,
        data: s,
        headers: o,
        preserveScroll: !0,
        preserveState: !0,
        onError: u,
        onFinish: () => Pt(() => C.value[0]).then(c)
      });
    de({ url: v, method: t, data: s, headers: o }).then((g) => c(Ge(g.data, l, a, r))).catch(u);
  });
}
function $e(e, t, n, o, l) {
  const a = new Nt(e, t, n, o, l);
  return C.value.push(a), z(() => a.show()), a;
}
const Rt = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], io = (e, t) => (t.resolveComponent && (pe = t.resolveComponent), () => R(kt, () => R(e, t)));
function ne() {
  return {
    setComponentResolver: Lt,
    getBaseUrl: () => te.value,
    setBaseUrl: (e) => te.value = e,
    stack: vt(C),
    push: $e,
    pushFromResponseData: Ge,
    closeAll: () => [...C.value].reverse().forEach((e) => e.close()),
    reset: () => C.value = [],
    visit: Tt,
    registerLocalModal: Ft,
    removeLocalModal: (e) => delete ce.value[e]
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
    const o = e, l = ne(), a = o.name ? h({}) : Oe("modalContext"), r = $(() => {
      var m;
      const s = ((m = a.value.config) == null ? void 0 : m.slideover) ?? o.slideover ?? Me("type") === "slideover";
      return {
        slideover: s,
        closeButton: o.closeButton ?? H(s, "closeButton"),
        closeExplicitly: o.closeExplicitly ?? H(s, "closeExplicitly"),
        maxWidth: o.maxWidth ?? H(s, "maxWidth"),
        paddingClasses: o.paddingClasses ?? H(s, "paddingClasses"),
        panelClasses: o.panelClasses ?? H(s, "panelClasses"),
        position: o.position ?? H(s, "position"),
        ...a.value.config
      };
    });
    o.name && (l.registerLocalModal(o.name, function(s) {
      a.value = s, f();
    }), ue(() => {
      l.removeLocalModal(o.name);
    })), fe(() => {
      o.name || f();
    });
    const i = h(null);
    ue(() => {
      var s;
      return (s = i.value) == null ? void 0 : s.call(i);
    });
    const d = _e();
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
    return (s, m) => (w(), K(Ce, null, [
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
      }) : F("", !0),
      v.value ? (w(), E(He, {
        key: 1,
        index: v.value
      }, null, 8, ["index"])) : F("", !0)
    ], 64));
  }
});
function Se(e, t) {
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
  }, (l) => (Ee(o, l), l)];
}
function Ye(e, t, n) {
  const o = n.originalEvent.target, l = new CustomEvent(e, {
    bubbles: !1,
    cancelable: !0,
    detail: n
  });
  t && o.addEventListener(e, t, { once: !0 }), o.dispatchEvent(l);
}
function Je(e) {
  return Ot() ? (At(e), !0) : !1;
}
function jt(e) {
  let t = !1, n;
  const o = Xe(!0);
  return (...l) => (t || (n = o.run(() => e(...l)), t = !0), n);
}
function _t(e) {
  let t = 0, n, o;
  const l = () => {
    t -= 1, o && t <= 0 && (o.stop(), n = void 0, o = void 0);
  };
  return (...a) => (t += 1, n || (o = Xe(!0), n = o.run(() => e(...a))), Je(l), n);
}
function Be(e) {
  return typeof e == "function" ? e() : p(e);
}
const V = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const qt = (e) => typeof e < "u", Kt = Object.prototype.toString, Xt = (e) => Kt.call(e) === "[object Object]", zt = () => {
}, Fe = /* @__PURE__ */ Vt();
function Vt() {
  var e, t;
  return V && ((e = window == null ? void 0 : window.navigator) == null ? void 0 : e.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((t = window == null ? void 0 : window.navigator) == null ? void 0 : t.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function Ht(e) {
  return Z();
}
function Gt(e, t) {
  Ht() && ue(e, t);
}
function oe(e) {
  var t;
  const n = Be(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const De = V ? window : void 0;
function Ze(...e) {
  let t, n, o, l;
  if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([n, o, l] = e, t = De) : [t, n, o, l] = e, !t)
    return zt;
  Array.isArray(n) || (n = [n]), Array.isArray(o) || (o = [o]);
  const a = [], r = () => {
    a.forEach((c) => c()), a.length = 0;
  }, i = (c, u, v, s) => (c.addEventListener(u, v, s), () => c.removeEventListener(u, v, s)), d = I(
    () => [oe(t), Be(l)],
    ([c, u]) => {
      if (r(), !c)
        return;
      const v = Xt(u) ? { ...u } : u;
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
function Yt(e) {
  return typeof e == "function" ? e : typeof e == "string" ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => !0;
}
function Jt(...e) {
  let t, n, o = {};
  e.length === 3 ? (t = e[0], n = e[1], o = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (t = !0, n = e[0], o = e[1]) : (t = e[0], n = e[1]) : (t = !0, n = e[0]);
  const {
    target: l = De,
    eventName: a = "keydown",
    passive: r = !1,
    dedupe: i = !1
  } = o, d = Yt(t);
  return Ze(l, a, (f) => {
    f.repeat && Be(i) || d(f) && n(f);
  }, r);
}
function Zt() {
  const e = h(!1), t = Z();
  return t && fe(() => {
    e.value = !0;
  }, t), e;
}
function Qt(e) {
  return JSON.parse(JSON.stringify(e));
}
function en(e, t, n, o = {}) {
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
  const y = (A) => i ? typeof i == "function" ? i(A) : Qt(A) : A, x = () => qt(e[t]) ? y(e[t]) : u, B = (A) => {
    v ? v(A) && m(g, A) : m(g, A);
  };
  if (d) {
    const A = x(), k = h(A);
    let D = !1;
    return I(
      () => e[t],
      (le) => {
        D || (D = !0, k.value = y(le), z(() => D = !1));
      }
    ), I(
      k,
      (le) => {
        !D && (le !== e[t] || c) && B(le);
      },
      { deep: c }
    ), k;
  } else
    return $({
      get() {
        return x();
      },
      set(A) {
        B(A);
      }
    });
}
function Ie(e) {
  return e ? e.flatMap((t) => t.type === Ce ? Ie(t.children) : [t]) : [];
}
function ve(e) {
  if (e === null || typeof e != "object")
    return !1;
  const t = Object.getPrototypeOf(e);
  return t !== null && t !== Object.prototype && Object.getPrototypeOf(t) !== null || Symbol.iterator in e ? !1 : Symbol.toStringTag in e ? Object.prototype.toString.call(e) === "[object Module]" : !0;
}
function be(e, t, n = ".", o) {
  if (!ve(t))
    return be(e, {}, n);
  const l = Object.assign({}, t);
  for (const a in e) {
    if (a === "__proto__" || a === "constructor")
      continue;
    const r = e[a];
    r != null && (Array.isArray(r) && Array.isArray(l[a]) ? l[a] = [...r, ...l[a]] : ve(r) && ve(l[a]) ? l[a] = be(
      r,
      l[a],
      (n ? `${n}.` : "") + a.toString()
    ) : l[a] = r);
  }
  return l;
}
function tn(e) {
  return (...t) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    t.reduce((n, o) => be(n, o, ""), {})
  );
}
const nn = tn(), [Qe, uo] = Se("ConfigProvider");
let on = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", ln = (e = 21) => {
  let t = "", n = e;
  for (; n--; )
    t += on[Math.random() * 64 | 0];
  return t;
};
const an = _t(() => {
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
    document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.body.style.removeProperty("--scrollbar-width"), document.body.style.overflow = t.value ?? "", Fe && (l == null || l()), t.value = void 0;
  };
  return I(n, (r, i) => {
    var d;
    if (!V)
      return;
    if (!r) {
      i && a();
      return;
    }
    t.value === void 0 && (t.value = document.body.style.overflow);
    const f = window.innerWidth - document.documentElement.clientWidth, c = { padding: f, margin: 0 }, u = (d = o.scrollBody) != null && d.value ? typeof o.scrollBody.value == "object" ? nn({
      padding: o.scrollBody.value.padding === !0 ? f : o.scrollBody.value.padding,
      margin: o.scrollBody.value.margin === !0 ? f : o.scrollBody.value.margin
    }, c) : c : { padding: 0, margin: 0 };
    f > 0 && (document.body.style.paddingRight = typeof u.padding == "number" ? `${u.padding}px` : String(u.padding), document.body.style.marginRight = typeof u.margin == "number" ? `${u.margin}px` : String(u.margin), document.body.style.setProperty("--scrollbar-width", `${f}px`), document.body.style.overflow = "hidden"), Fe && (l = Ze(
      document,
      "touchmove",
      (v) => sn(v),
      { passive: !1 }
    )), z(() => {
      document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden";
    });
  }, { immediate: !0, flush: "sync" }), e;
});
function rn(e) {
  const t = ln(6), n = an();
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
function sn(e) {
  const t = e || window.event, n = t.target;
  return n instanceof Element && et(n) ? !1 : t.touches.length > 1 ? !0 : (t.preventDefault && t.cancelable && t.preventDefault(), !1);
}
function Pe(e) {
  const t = Z(), n = t == null ? void 0 : t.type.emits, o = {};
  return n != null && n.length || console.warn(
    `No emitted event found. Please check component: ${t == null ? void 0 : t.type.__name}`
  ), n == null || n.forEach((l) => {
    o[bt(Et(l))] = (...a) => e(l, ...a);
  }), o;
}
function N() {
  const e = Z(), t = h(), n = $(() => {
    var r, i;
    return ["#text", "#comment"].includes((r = t.value) == null ? void 0 : r.$el.nodeName) ? (i = t.value) == null ? void 0 : i.$el.nextElementSibling : oe(t);
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
var un = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, G = /* @__PURE__ */ new WeakMap(), re = /* @__PURE__ */ new WeakMap(), se = {}, ge = 0, tt = function(e) {
  return e && (e.host || tt(e.parentNode));
}, dn = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var o = tt(n);
    return o && e.contains(o) ? o : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, cn = function(e, t, n, o) {
  var l = dn(t, Array.isArray(e) ? e : [e]);
  se[n] || (se[n] = /* @__PURE__ */ new WeakMap());
  var a = se[n], r = [], i = /* @__PURE__ */ new Set(), d = new Set(l), f = function(u) {
    !u || i.has(u) || (i.add(u), f(u.parentNode));
  };
  l.forEach(f);
  var c = function(u) {
    !u || d.has(u) || Array.prototype.forEach.call(u.children, function(v) {
      if (i.has(v))
        c(v);
      else
        try {
          var s = v.getAttribute(o), m = s !== null && s !== "false", g = (G.get(v) || 0) + 1, y = (a.get(v) || 0) + 1;
          G.set(v, g), a.set(v, y), r.push(v), g === 1 && m && re.set(v, !0), y === 1 && v.setAttribute(n, "true"), m || v.setAttribute(o, "true");
        } catch (x) {
          console.error("aria-hidden: cannot operate on ", v, x);
        }
    });
  };
  return c(t), i.clear(), ge++, function() {
    r.forEach(function(u) {
      var v = G.get(u) - 1, s = a.get(u) - 1;
      G.set(u, v), a.set(u, s), v || (re.has(u) || u.removeAttribute(o), re.delete(u)), s || u.removeAttribute(n);
    }), ge--, ge || (G = /* @__PURE__ */ new WeakMap(), G = /* @__PURE__ */ new WeakMap(), re = /* @__PURE__ */ new WeakMap(), se = {});
  };
}, fn = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var o = Array.from(Array.isArray(e) ? e : [e]), l = un(e);
  return l ? (o.push.apply(o, Array.from(l.querySelectorAll("[aria-live]"))), cn(o, l, n, "aria-hidden")) : function() {
    return null;
  };
};
function mn(e) {
  let t;
  I(() => oe(e), (n) => {
    n ? t = fn(n) : t && t();
  }), q(() => {
    t && t();
  });
}
let pn = 0;
function We(e, t = "radix") {
  const n = Qe({ useId: void 0 });
  return Le.useId ? `${t}-${Le.useId()}` : n.useId ? `${t}-${n.useId()}` : `${t}-${++pn}`;
}
function vn(e, t) {
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
const ke = M({
  name: "PrimitiveSlot",
  inheritAttrs: !1,
  setup(e, { attrs: t, slots: n }) {
    return () => {
      var o, l;
      if (!n.default)
        return null;
      const a = Ie(n.default()), r = a.findIndex((c) => c.type !== gt);
      if (r === -1)
        return a;
      const i = a[r];
      (o = i.props) == null || delete o.ref;
      const d = i.props ? L(t, i.props) : t;
      t.class && (l = i.props) != null && l.class && delete i.props.class;
      const f = yt(i, d);
      for (const c in d)
        c.startsWith("on") && (f.props || (f.props = {}), f.props[c] = d[c]);
      return a.length === 1 ? f : (a[r] = f, a);
    };
  }
}), Q = M({
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
    return typeof o == "string" && ["area", "img", "input"].includes(o) ? () => R(o, t) : o !== "template" ? () => R(e.as, t, { default: n.default }) : () => R(ke, t, { default: n.default });
  }
});
function nt() {
  const e = h(), t = $(() => {
    var n, o;
    return ["#text", "#comment"].includes((n = e.value) == null ? void 0 : n.$el.nodeName) ? (o = e.value) == null ? void 0 : o.$el.nextElementSibling : oe(e);
  });
  return {
    primitiveElement: e,
    currentElement: t
  };
}
function gn(e, t) {
  var n;
  const o = h({}), l = h("none"), a = h(e), r = e.value ? "mounted" : "unmounted";
  let i;
  const d = ((n = t.value) == null ? void 0 : n.ownerDocument.defaultView) ?? De, { state: f, dispatch: c } = vn(r, {
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
    var x;
    if (V) {
      const B = new CustomEvent(y, { bubbles: !1, cancelable: !1 });
      (x = t.value) == null || x.dispatchEvent(B);
    }
  };
  I(
    e,
    async (y, x) => {
      var B;
      const A = x !== y;
      if (await z(), A) {
        const k = l.value, D = ie(t.value);
        y ? (c("MOUNT"), u("enter"), D === "none" && u("after-enter")) : D === "none" || ((B = o.value) == null ? void 0 : B.display) === "none" ? (c("UNMOUNT"), u("leave"), u("after-leave")) : x && k !== D ? (c("ANIMATION_OUT"), u("leave")) : (c("UNMOUNT"), u("after-leave"));
      }
    },
    { immediate: !0 }
  );
  const v = (y) => {
    const x = ie(t.value), B = x.includes(
      y.animationName
    ), A = f.value === "mounted" ? "enter" : "leave";
    if (y.target === t.value && B && (u(`after-${A}`), c("ANIMATION_END"), !a.value)) {
      const k = t.value.style.animationFillMode;
      t.value.style.animationFillMode = "forwards", i = d == null ? void 0 : d.setTimeout(() => {
        var D;
        ((D = t.value) == null ? void 0 : D.style.animationFillMode) === "forwards" && (t.value.style.animationFillMode = k);
      });
    }
    y.target === t.value && x === "none" && c("ANIMATION_END");
  }, s = (y) => {
    y.target === t.value && (l.value = ie(t.value));
  }, m = I(
    t,
    (y, x) => {
      y ? (o.value = getComputedStyle(y), y.addEventListener("animationstart", s), y.addEventListener("animationcancel", v), y.addEventListener("animationend", v)) : (c("ANIMATION_END"), d == null || d.clearTimeout(i), x == null || x.removeEventListener("animationstart", s), x == null || x.removeEventListener("animationcancel", v), x == null || x.removeEventListener("animationend", v));
    },
    { immediate: !0 }
  ), g = I(f, () => {
    const y = ie(t.value);
    l.value = f.value === "mounted" ? y : "none";
  });
  return q(() => {
    m(), g();
  }), {
    isPresent: $(
      () => ["mounted", "unmountSuspended"].includes(f.value)
    )
  };
}
function ie(e) {
  return e && getComputedStyle(e).animationName || "none";
}
const ot = M({
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
    const { present: l, forceMount: a } = qe(e), r = h(), { isPresent: i } = gn(l, r);
    n({ present: i });
    let d = t.default({ present: i });
    d = Ie(d || []);
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
    return () => a.value || l.value || i.value ? R(t.default({ present: i })[0], {
      ref: (c) => {
        const u = oe(c);
        return typeof (u == null ? void 0 : u.hasAttribute) > "u" || (u != null && u.hasAttribute("data-radix-popper-content-wrapper") ? r.value = u.firstElementChild : r.value = u), u;
      }
    }) : null;
  }
}), [j, yn] = Se("DialogRoot"), hn = /* @__PURE__ */ M({
  inheritAttrs: !1,
  __name: "DialogRoot",
  props: {
    open: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: !1 },
    modal: { type: Boolean, default: !0 }
  },
  emits: ["update:open"],
  setup(e, { emit: t }) {
    const n = e, o = en(n, "open", t, {
      defaultValue: n.defaultOpen,
      passive: n.open === void 0
    }), l = h(), a = h(), { modal: r } = qe(n);
    return yn({
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
}), xn = /* @__PURE__ */ M({
  __name: "Teleport",
  props: {
    to: { default: "body" },
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = Zt();
    return (n, o) => p(t) || n.forceMount ? (w(), E(wt, {
      key: 0,
      to: n.to,
      disabled: n.disabled
    }, [
      O(n.$slots, "default")
    ], 8, ["to", "disabled"])) : F("", !0);
  }
}), wn = /* @__PURE__ */ M({
  __name: "DialogPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = e;
    return (n, o) => (w(), E(p(xn), ht(xt(t)), {
      default: b(() => [
        O(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), bn = "dismissableLayer.pointerDownOutside", En = "dismissableLayer.focusOutside";
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
function Cn(e, t) {
  var n;
  const o = ((n = t == null ? void 0 : t.value) == null ? void 0 : n.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), l = h(!1), a = h(() => {
  });
  return X((r) => {
    if (!V)
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
            Ye(
              bn,
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
function On(e, t) {
  var n;
  const o = ((n = t == null ? void 0 : t.value) == null ? void 0 : n.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), l = h(!1);
  return X((a) => {
    if (!V)
      return;
    const r = async (i) => {
      t != null && t.value && (await z(), !(!t.value || lt(t.value, i.target)) && i.target && !l.value && Ye(
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
const W = Ke({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), An = /* @__PURE__ */ M({
  __name: "DismissableLayer",
  props: {
    disableOutsidePointerEvents: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "dismiss"],
  setup(e, { emit: t }) {
    const n = e, o = t, { forwardRef: l, currentElement: a } = N(), r = $(
      () => {
        var m;
        return ((m = a.value) == null ? void 0 : m.ownerDocument) ?? globalThis.document;
      }
    ), i = $(() => W.layersRoot), d = $(() => a.value ? Array.from(i.value).indexOf(a.value) : -1), f = $(() => W.layersWithOutsidePointerEventsDisabled.size > 0), c = $(() => {
      const m = Array.from(i.value), [g] = [...W.layersWithOutsidePointerEventsDisabled].slice(-1), y = m.indexOf(g);
      return d.value >= y;
    }), u = Cn(async (m) => {
      const g = [...W.branches].some(
        (y) => y == null ? void 0 : y.contains(m.target)
      );
      !c.value || g || (o("pointerDownOutside", m), o("interactOutside", m), await z(), m.defaultPrevented || o("dismiss"));
    }, a), v = On((m) => {
      [...W.branches].some(
        (g) => g == null ? void 0 : g.contains(m.target)
      ) || (o("focusOutside", m), o("interactOutside", m), m.defaultPrevented || o("dismiss"));
    }, a);
    Jt("Escape", (m) => {
      d.value === i.value.size - 1 && (o("escapeKeyDown", m), m.defaultPrevented || o("dismiss"));
    });
    let s;
    return X((m) => {
      a.value && (n.disableOutsidePointerEvents && (W.layersWithOutsidePointerEventsDisabled.size === 0 && (s = r.value.body.style.pointerEvents, r.value.body.style.pointerEvents = "none"), W.layersWithOutsidePointerEventsDisabled.add(a.value)), i.value.add(a.value), m(() => {
        n.disableOutsidePointerEvents && W.layersWithOutsidePointerEventsDisabled.size === 1 && (r.value.body.style.pointerEvents = s);
      }));
    }), X((m) => {
      m(() => {
        a.value && (i.value.delete(a.value), W.layersWithOutsidePointerEventsDisabled.delete(a.value));
      });
    }), (m, g) => (w(), E(p(Q), {
      ref: p(l),
      "as-child": m.asChild,
      as: m.as,
      "data-dismissable-layer": "",
      style: Ct({
        pointerEvents: f.value ? c.value ? "auto" : "none" : void 0
      }),
      onFocusCapture: p(v).onFocusCapture,
      onBlurCapture: p(v).onBlurCapture,
      onPointerdownCapture: p(u).onPointerDownCapture
    }, {
      default: b(() => [
        O(m.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as", "style", "onFocusCapture", "onBlurCapture", "onPointerdownCapture"]));
  }
}), ye = "focusScope.autoFocusOnMount", he = "focusScope.autoFocusOnUnmount", Te = { bubbles: !1, cancelable: !0 };
function Mn(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const o of e)
    if (T(o, { select: t }), document.activeElement !== n)
      return !0;
}
function $n(e) {
  const t = at(e), n = Re(t, e), o = Re(t.reverse(), e);
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
function Re(e, t) {
  for (const n of e)
    if (!Sn(n, { upTo: t }))
      return n;
}
function Sn(e, { upTo: t }) {
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
function Bn(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function T(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Bn(e) && t && e.select();
  }
}
const Dn = jt(() => h([]));
function In() {
  const e = Dn();
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
function Pn(e) {
  return e.filter((t) => t.tagName !== "A");
}
const kn = /* @__PURE__ */ M({
  __name: "FocusScope",
  props: {
    loop: { type: Boolean, default: !1 },
    trapped: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["mountAutoFocus", "unmountAutoFocus"],
  setup(e, { emit: t }) {
    const n = e, o = t, { currentRef: l, currentElement: a } = N(), r = h(null), i = In(), d = Ke({
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    });
    X((c) => {
      if (!V)
        return;
      const u = a.value;
      if (!n.trapped)
        return;
      function v(y) {
        if (d.paused || !u)
          return;
        const x = y.target;
        u.contains(x) ? r.value = x : T(r.value, { select: !0 });
      }
      function s(y) {
        if (d.paused || !u)
          return;
        const x = y.relatedTarget;
        x !== null && (u.contains(x) || T(r.value, { select: !0 }));
      }
      function m(y) {
        u.contains(r.value) || T(u);
      }
      document.addEventListener("focusin", v), document.addEventListener("focusout", s);
      const g = new MutationObserver(m);
      u && g.observe(u, { childList: !0, subtree: !0 }), c(() => {
        document.removeEventListener("focusin", v), document.removeEventListener("focusout", s), g.disconnect();
      });
    }), X(async (c) => {
      const u = a.value;
      if (await z(), !u)
        return;
      i.add(d);
      const v = document.activeElement;
      if (!u.contains(v)) {
        const s = new CustomEvent(ye, Te);
        u.addEventListener(ye, (m) => o("mountAutoFocus", m)), u.dispatchEvent(s), s.defaultPrevented || (Mn(Pn(at(u)), {
          select: !0
        }), document.activeElement === v && T(u));
      }
      c(() => {
        u.removeEventListener(ye, (g) => o("mountAutoFocus", g));
        const s = new CustomEvent(he, Te), m = (g) => {
          o("unmountAutoFocus", g);
        };
        u.addEventListener(he, m), u.dispatchEvent(s), setTimeout(() => {
          s.defaultPrevented || T(v ?? document.body, { select: !0 }), u.removeEventListener(he, m), i.remove(d);
        }, 0);
      });
    });
    function f(c) {
      if (!n.loop && !n.trapped || d.paused)
        return;
      const u = c.key === "Tab" && !c.altKey && !c.ctrlKey && !c.metaKey, v = document.activeElement;
      if (u && v) {
        const s = c.currentTarget, [m, g] = $n(s);
        m && g ? !c.shiftKey && v === g ? (c.preventDefault(), n.loop && T(m, { select: !0 })) : c.shiftKey && v === m && (c.preventDefault(), n.loop && T(g, { select: !0 })) : v === s && c.preventDefault();
      }
    }
    return (c, u) => (w(), E(p(Q), {
      ref_key: "currentRef",
      ref: l,
      tabindex: "-1",
      "as-child": c.asChild,
      as: c.as,
      onKeydown: f
    }, {
      default: b(() => [
        O(c.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as"]));
  }
});
function Ln(e) {
  return e ? "open" : "closed";
}
const Nn = "DialogTitle", Fn = "DialogContent";
function Wn({
  titleName: e = Nn,
  contentName: t = Fn,
  componentLink: n = "dialog.html#title",
  titleId: o,
  descriptionId: l,
  contentElement: a
}) {
  const r = `Warning: \`${t}\` requires a \`${e}\` for the component to be accessible for screen reader users.

If you want to hide the \`${e}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://www.radix-vue.com/components/${n}`, i = `Warning: Missing \`Description\` or \`aria-describedby="undefined"\` for ${t}.`;
  fe(() => {
    var d;
    document.getElementById(o) || console.warn(r);
    const f = (d = a.value) == null ? void 0 : d.getAttribute("aria-describedby");
    l && f && (document.getElementById(l) || console.warn(i));
  });
}
const rt = /* @__PURE__ */ M({
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
    const n = e, o = t, l = j(), { forwardRef: a, currentElement: r } = N();
    return l.titleId || (l.titleId = We(void 0, "radix-vue-dialog-title")), l.descriptionId || (l.descriptionId = We(void 0, "radix-vue-dialog-description")), fe(() => {
      l.contentElement = r, document.activeElement !== document.body && (l.triggerElement.value = document.activeElement);
    }), process.env.NODE_ENV !== "production" && Wn({
      titleName: "DialogTitle",
      contentName: "DialogContent",
      componentLink: "dialog.html#title",
      titleId: l.titleId,
      descriptionId: l.descriptionId,
      contentElement: r
    }), (i, d) => (w(), E(p(kn), {
      "as-child": "",
      loop: "",
      trapped: n.trapFocus,
      onMountAutoFocus: d[5] || (d[5] = (f) => o("openAutoFocus", f)),
      onUnmountAutoFocus: d[6] || (d[6] = (f) => o("closeAutoFocus", f))
    }, {
      default: b(() => [
        S(p(An), L({
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
          default: b(() => [
            O(i.$slots, "default")
          ]),
          _: 3
        }, 16, ["id", "as", "as-child", "disable-outside-pointer-events", "aria-describedby", "aria-labelledby", "data-state"])
      ]),
      _: 3
    }, 8, ["trapped"]));
  }
}), Tn = /* @__PURE__ */ M({
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
    const n = e, o = t, l = j(), a = Pe(o), { forwardRef: r, currentElement: i } = N();
    return mn(i), (d, f) => (w(), E(rt, L({ ...n, ...p(a) }, {
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
      default: b(() => [
        O(d.$slots, "default")
      ]),
      _: 3
    }, 16, ["trap-focus"]));
  }
}), Rn = /* @__PURE__ */ M({
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
    const l = j(), a = h(!1), r = h(!1);
    return (i, d) => (w(), E(rt, L({ ...n, ...p(o) }, {
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
      default: b(() => [
        O(i.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), st = /* @__PURE__ */ M({
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
    const n = e, o = t, l = j(), a = Pe(o), { forwardRef: r } = N();
    return (i, d) => (w(), E(p(ot), {
      present: i.forceMount || p(l).open.value
    }, {
      default: b(() => [
        p(l).modal.value ? (w(), E(Tn, L({
          key: 0,
          ref: p(r)
        }, { ...n, ...p(a), ...i.$attrs }), {
          default: b(() => [
            O(i.$slots, "default")
          ]),
          _: 3
        }, 16)) : (w(), E(Rn, L({
          key: 1,
          ref: p(r)
        }, { ...n, ...p(a), ...i.$attrs }), {
          default: b(() => [
            O(i.$slots, "default")
          ]),
          _: 3
        }, 16))
      ]),
      _: 3
    }, 8, ["present"]));
  }
}), Un = /* @__PURE__ */ M({
  __name: "DialogOverlayImpl",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = j();
    return rn(!0), N(), (n, o) => (w(), E(p(Q), {
      as: n.as,
      "as-child": n.asChild,
      "data-state": p(t).open.value ? "open" : "closed",
      style: { "pointer-events": "auto" }
    }, {
      default: b(() => [
        O(n.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child", "data-state"]));
  }
}), jn = /* @__PURE__ */ M({
  __name: "DialogOverlay",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = j(), { forwardRef: n } = N();
    return (o, l) => {
      var a;
      return (a = p(t)) != null && a.modal.value ? (w(), E(p(ot), {
        key: 0,
        present: o.forceMount || p(t).open.value
      }, {
        default: b(() => [
          S(Un, L(o.$attrs, {
            ref: p(n),
            as: o.as,
            "as-child": o.asChild
          }), {
            default: b(() => [
              O(o.$slots, "default")
            ]),
            _: 3
          }, 16, ["as", "as-child"])
        ]),
        _: 3
      }, 8, ["present"])) : F("", !0);
    };
  }
}), _n = /* @__PURE__ */ M({
  __name: "DialogClose",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(e) {
    const t = e;
    N();
    const n = j();
    return (o, l) => (w(), E(p(Q), L(t, {
      type: o.as === "button" ? "button" : void 0,
      onClick: l[0] || (l[0] = (a) => p(n).onOpenChange(!1))
    }), {
      default: b(() => [
        O(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["type"]));
  }
}), it = /* @__PURE__ */ M({
  __name: "DialogTitle",
  props: {
    asChild: { type: Boolean },
    as: { default: "h2" }
  },
  setup(e) {
    const t = e, n = j();
    return N(), (o, l) => (w(), E(p(Q), L(t, {
      id: p(n).titleId
    }), {
      default: b(() => [
        O(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["id"]));
  }
}), ut = /* @__PURE__ */ M({
  __name: "VisuallyHidden",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(e) {
    return N(), (t, n) => (w(), E(p(Q), {
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
      default: b(() => [
        O(t.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
}), [dt, co] = Se("CollectionProvider");
M({
  name: "CollectionSlot",
  setup(e, { slots: t }) {
    const n = dt(), { primitiveElement: o, currentElement: l } = nt();
    return I(l, () => {
      n.collectionRef.value = l.value;
    }), () => R(ke, { ref: o }, t);
  }
});
M({
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
    return X((r) => {
      if (a.value) {
        const i = je(a.value);
        o.itemMap.value.set(i, { ref: a.value, value: e.value }), r(() => o.itemMap.value.delete(i));
      }
    }), () => R(ke, { ...n, [o.attrName]: "", ref: l }, t);
  }
});
function qn() {
  if (typeof matchMedia == "function")
    return matchMedia("(pointer:coarse)").matches ? "coarse" : "fine";
}
qn();
const ct = {
  __name: "CloseButton",
  setup(e) {
    return (t, n) => (w(), E(p(_n), { class: "im-close-button text-gray-400 hover:text-gray-500" }, {
      default: b(() => n[0] || (n[0] = [
        U("span", { class: "sr-only" }, "Close", -1),
        U("svg", {
          class: "size-6",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "2",
          stroke: "currentColor",
          "aria-hidden": "true"
        }, [
          U("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M6 18L18 6M6 6l12 12"
          })
        ], -1)
      ])),
      _: 1
    }));
  }
}, Kn = { class: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4" }, Xn = ["data-inertiaui-modal-entered"], zn = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, Vn = {
  __name: "ModalContent",
  props: {
    modalContext: Object,
    config: Object
  },
  setup(e) {
    const t = h(!1);
    return (n, o) => (w(), K("div", Kn, [
      U("div", {
        class: J(["im-modal-positioner flex min-h-full justify-center", {
          "items-start": e.config.position === "top",
          "items-center": e.config.position === "center",
          "items-end": e.config.position === "bottom"
        }])
      }, [
        S(Ae, {
          appear: "",
          "enter-from-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          "enter-to-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-from-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-to-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          onAfterEnter: o[2] || (o[2] = (l) => t.value = !0),
          onAfterLeave: e.modalContext.afterLeave
        }, {
          default: b(() => [
            S(p(st), {
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
              default: b(() => [
                S(p(ut), { "as-child": "" }, {
                  default: b(() => [
                    S(p(it))
                  ]),
                  _: 1
                }),
                U("div", {
                  class: J(["im-modal-content relative", [e.config.paddingClasses, e.config.panelClasses]]),
                  "data-inertiaui-modal-entered": t.value
                }, [
                  e.config.closeButton ? (w(), K("div", zn, [
                    S(ct)
                  ])) : F("", !0),
                  O(n.$slots, "default", {
                    modalContext: e.modalContext,
                    config: e.config
                  })
                ], 10, Xn)
              ]),
              _: 3
            }, 8, ["class"])
          ]),
          _: 3
        }, 8, ["onAfterLeave"])
      ], 2)
    ]));
  }
}, Hn = { class: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden" }, Gn = ["data-inertiaui-modal-entered"], Yn = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, Jn = {
  __name: "SlideoverContent",
  props: {
    modalContext: Object,
    config: Object
  },
  setup(e) {
    const t = h(!1);
    return (n, o) => (w(), K("div", Hn, [
      U("div", {
        class: J(["im-slideover-positioner flex min-h-full items-center", {
          "justify-start rtl:justify-end": e.config.position === "left",
          "justify-end rtl:justify-start": e.config.position === "right"
        }])
      }, [
        S(Ae, {
          appear: "",
          "enter-from-class": "opacity-0 " + (e.config.position === "left" ? "-translate-x-full" : "translate-x-full"),
          "enter-to-class": "opacity-100 translate-x-0",
          "leave-from-class": "opacity-100 translate-x-0",
          "leave-to-class": "opacity-0 " + (e.config.position === "left" ? "-translate-x-full" : "translate-x-full"),
          onAfterEnter: o[2] || (o[2] = (l) => t.value = !0),
          onAfterLeave: e.modalContext.afterLeave
        }, {
          default: b(() => [
            S(p(st), {
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
              default: b(() => [
                S(p(ut), { "as-child": "" }, {
                  default: b(() => [
                    S(p(it))
                  ]),
                  _: 1
                }),
                U("div", {
                  class: J(["im-slideover-content relative", [e.config.paddingClasses, e.config.panelClasses]]),
                  "data-inertiaui-modal-entered": t.value
                }, [
                  e.config.closeButton ? (w(), K("div", Yn, [
                    S(ct)
                  ])) : F("", !0),
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
}, Zn = ["data-inertiaui-modal-id", "data-inertiaui-modal-index", "aria-hidden"], Qn = {
  key: 1,
  class: "im-backdrop fixed inset-0 z-30 bg-black/75"
}, fo = {
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
    }), (l, a) => (w(), E(Ut, {
      ref_key: "modal",
      ref: n,
      onSuccess: a[2] || (a[2] = (r) => l.$emit("success")),
      onClose: a[3] || (a[3] = (r) => l.$emit("close")),
      onFocus: a[4] || (a[4] = (r) => l.$emit("focus")),
      onBlur: a[5] || (a[5] = (r) => l.$emit("blur"))
    }, {
      default: b(({
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
        reload: x,
        setOpen: B,
        shouldRender: A
      }) => [
        S(p(hn), {
          open: m,
          "onUpdate:open": B
        }, {
          default: b(() => [
            S(p(wn), null, {
              default: b(() => [
                U("div", {
                  "data-inertiaui-modal-id": v,
                  "data-inertiaui-modal-index": s,
                  class: "im-dialog relative z-20",
                  "aria-hidden": !y
                }, [
                  s === 0 && y ? (w(), E(Ae, {
                    key: 0,
                    appear: !o.value,
                    "enter-active-class": "transition transform ease-in-out duration-300",
                    "enter-from-class": "opacity-0",
                    "enter-to-class": "opacity-100",
                    "leave-active-class": "transition transform ease-in-out duration-300",
                    "leave-from-class": "opacity-100",
                    "leave-to-class": "opacity-0",
                    onAfterAppear: a[0] || (a[0] = (k) => o.value = !0)
                  }, {
                    default: b(() => [
                      S(p(jn), { class: "im-backdrop fixed inset-0 z-30 bg-black/75" })
                    ]),
                    _: 1
                  }, 8, ["appear"])) : F("", !0),
                  s > 0 && y ? (w(), K("div", Qn)) : F("", !0),
                  (w(), E(ze(d != null && d.slideover ? Jn : Vn), {
                    "modal-context": g,
                    config: d,
                    onAfterLeave: a[1] || (a[1] = (k) => l.$emit("after-leave"))
                  }, {
                    default: b(() => [
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
                        reload: x,
                        setOpen: B,
                        shouldRender: A
                      })
                    ]),
                    _: 2
                  }, 1064, ["modal-context", "config"]))
                ], 8, Zn)
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
}, mo = {
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
    const n = e, o = h(!1), l = ne(), a = h(null);
    Ee("modalContext", a);
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
    ue(() => {
      var g;
      (g = f.value) == null || g.call(f);
    });
    const c = _e();
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
        It(Ve(n, Rt)),
        v,
        s,
        n.queryStringArrayFormat,
        d.value
      ).then((g) => {
        a.value = g;
      }).catch((g) => r("error", g)).finally(() => o.value = !1));
    }
    return (g, y) => (w(), E(ze(e.as), L(p(c), {
      href: e.href,
      onClick: Mt(m, ["prevent"])
    }), {
      default: b(() => [
        O(g.$slots, "default", { loading: o.value })
      ]),
      _: 3
    }, 16, ["href"]));
  }
};
function po() {
  return $t(Oe("modalContext", null));
}
function vo(e, t = {}) {
  return ne().visit(
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
  fo as Modal,
  mo as ModalLink,
  kt as ModalRoot,
  Me as getConfig,
  so as initFromPageProps,
  ro as putConfig,
  io as renderApp,
  ao as resetConfig,
  po as useModal,
  vo as visitModal
};
