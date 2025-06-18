var mt = Object.defineProperty;
var pt = (t, e, n) => e in t ? mt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var B = (t, e, n) => pt(t, typeof e != "symbol" ? e + "" : e, n);
import * as Re from "vue";
import { computed as $, provide as Oe, createBlock as C, createCommentVNode as L, openBlock as x, unref as p, mergeProps as N, onUnmounted as q, onBeforeMount as vt, onMounted as Q, watch as D, createElementBlock as K, Fragment as Ae, renderSlot as E, ref as h, h as W, readonly as gt, markRaw as _e, nextTick as V, toValue as yt, inject as ae, onBeforeUnmount as me, useAttrs as qe, defineComponent as A, toRefs as Ke, normalizeProps as ht, guardReactiveProps as xt, withCtx as w, createVNode as S, getCurrentInstance as ee, Teleport as wt, toHandlerKey as bt, camelize as Et, effectScope as Xe, Comment as Ct, cloneVNode as Ot, getCurrentScope as At, onScopeDispose as $t, reactive as Ve, watchEffect as X, normalizeStyle as Mt, createElementVNode as j, normalizeClass as G, Transition as $e, resolveDynamicComponent as Me, withModifiers as St } from "vue";
import { usePage as ze, router as oe } from "@inertiajs/vue3";
import { mergeDataIntoQueryString as Bt } from "@inertiajs/core";
import pe from "axios";
const ne = {
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
class Dt {
  constructor() {
    this.config = {}, this.reset();
  }
  reset() {
    this.config = JSON.parse(JSON.stringify(ne));
  }
  put(e, n) {
    if (typeof e == "object") {
      this.config = {
        type: e.type ?? ne.type,
        navigate: e.navigate ?? ne.navigate,
        modal: { ...ne.modal, ...e.modal ?? {} },
        slideover: { ...ne.slideover, ...e.slideover ?? {} }
      };
      return;
    }
    const o = e.split(".");
    let l = this.config;
    for (let a = 0; a < o.length - 1; a++)
      l = l[o[a]] = l[o[a]] || {};
    l[o[o.length - 1]] = n;
  }
  get(e) {
    if (typeof e > "u")
      return this.config;
    const n = e.split(".");
    let o = this.config;
    for (const l of n) {
      if (o[l] === void 0)
        return null;
      o = o[l];
    }
    return o;
  }
}
const ge = new Dt(), io = () => ge.reset(), uo = (t, e) => ge.put(t, e), Se = (t) => ge.get(t), H = (t, e) => ge.get(t ? `slideover.${e}` : `modal.${e}`);
function It(t, e) {
  return t = typeof t == "string" ? new URL(t, window.location.origin) : t, e = typeof e == "string" ? new URL(e, window.location.origin) : e, `${t.origin}${t.pathname}` == `${e.origin}${e.pathname}`;
}
function Ee(t = "inertiaui_modal_") {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `${t}${crypto.randomUUID()}` : `${t}${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
}
function Z(t) {
  return typeof t == "string" ? t.toLowerCase() : t;
}
function Pt(t, e, n = !1) {
  return n && (e = e.map(Z)), Array.isArray(t) ? t.filter((o) => !e.includes(n ? Z(o) : o)) : Object.keys(t).reduce((o, l) => (e.includes(n ? Z(l) : l) || (o[l] = t[l]), o), {});
}
function He(t, e, n = !1) {
  return n && (e = e.map(Z)), Array.isArray(t) ? t.filter((o) => e.includes(n ? Z(o) : o)) : Object.keys(t).reduce((o, l) => (e.includes(n ? Z(l) : l) && (o[l] = t[l]), o), {});
}
function Nt(t) {
  return Array.isArray(t) ? t.filter((e) => e !== null) : Object.keys(t).reduce((e, n) => (n in t && t[n] !== null && (e[n] = t[n]), e), {});
}
function kt(t, e = 3, n = 10) {
  return new Promise((o, l) => {
    const a = t();
    if (a) {
      o(a);
      return;
    }
    let r = e * 1e3 / n;
    const s = setInterval(() => {
      const u = t();
      u && (clearInterval(s), o(u)), --r <= 0 && (clearInterval(s), l(new Error("Condition not met in time")));
    }, n);
  });
}
function ue(t) {
  return t ? (t = t.replace(/_/g, "-"), t = t.replace(/-+/g, "-"), /[A-Z]/.test(t) ? (t = t.replace(/\s+/g, "").replace(/_/g, "").replace(/(?:^|\s|-)+([A-Za-z])/g, (e, n) => n.toUpperCase()), t = t.replace(/(.)(?=[A-Z])/g, "$1-"), t.toLowerCase()) : t) : "";
}
const Ye = {
  __name: "ModalRenderer",
  props: {
    index: {
      type: Number,
      required: !0
    }
  },
  setup(t) {
    const e = t, n = re(), o = $(() => n.stack.value[e.index]);
    return Oe("modalContext", o), (l, a) => {
      var r;
      return (r = o.value) != null && r.component ? (x(), C(p(o).component, N({ key: 0 }, p(He)(o.value.props ?? {}, o.value.getComponentPropKeys(), !0), {
        onModalEvent: a[0] || (a[0] = (s, ...u) => o.value.emit(s, ...u))
      }), null, 16)) : L("", !0);
    };
  }
}, Lt = {
  __name: "ModalRoot",
  setup(t) {
    const e = re(), n = ze();
    let o = !1, l = null, a = !1;
    q(oe.on("start", () => o = !0)), q(oe.on("finish", () => o = !1)), q(
      oe.on("navigate", (s) => {
        const u = s.detail.page.props._inertiaui_modal;
        if (!u) {
          l && e.closeAll(), e.setBaseUrl(null), a = !1;
          return;
        }
        l = u, e.setBaseUrl(u.baseUrl), e.pushFromResponseData(u, {}, () => {
          if (!u.baseUrl) {
            console.error("No base url in modal response data so cannot navigate back");
            return;
          }
          !o && window.location.href !== u.baseUrl && oe.visit(u.baseUrl, {
            preserveScroll: !0,
            preserveState: !0
          });
        });
      })
    );
    const r = (s) => {
      var u;
      return s.headers["X-InertiaUI-Modal-Base-Url"] = e.getBaseUrl() ?? (a ? (u = n.props._inertiaui_modal) == null ? void 0 : u.baseUrl : null), s;
    };
    return vt(() => pe.interceptors.request.use(r)), Q(() => a = !!n.props._inertiaui_modal), q(() => pe.interceptors.request.eject(r)), D(
      () => {
        var s;
        return (s = n.props) == null ? void 0 : s._inertiaui_modal;
      },
      (s, u) => {
        var f;
        s && u && s.component === u.component && It(s.url, u.url) && ((f = e.stack.value[0]) == null || f.updateProps(s.props ?? {}));
      }
    ), (s, u) => (x(), K(Ae, null, [
      E(s.$slots, "default"),
      p(e).stack.value.length ? (x(), C(Ye, {
        key: 0,
        index: 0
      })) : L("", !0)
    ], 64));
  }
};
let ye = null;
const J = h({}), le = h(null), O = h([]), ve = h({}), Rt = (t) => {
  ye = t;
}, co = (t) => {
  t.resolveComponent && (ye = t.resolveComponent);
};
class Ft {
  constructor(e, n, o, l, a) {
    B(this, "getComponentPropKeys", () => Array.isArray(this.component.props) ? this.component.props : this.component.props ? Object.keys(this.component.props) : []);
    B(this, "getParentModal", () => {
      const e = this.index.value;
      return e < 1 ? null : O.value.slice(0, e).reverse().find((n) => n.isOpen);
    });
    B(this, "getChildModal", () => {
      const e = this.index.value;
      return e === O.value.length - 1 ? null : O.value.slice(e + 1).find((n) => n.isOpen);
    });
    B(this, "show", () => {
      const e = this.index.value;
      if (e > -1) {
        if (O.value[e].isOpen)
          return;
        O.value[e].isOpen = !0, O.value[e].shouldRender = !0;
      }
    });
    B(this, "close", () => {
      var n;
      const e = this.index.value;
      if (e > -1) {
        if (!O.value[e].isOpen)
          return;
        Object.keys(this.listeners).forEach((o) => {
          this.off(o);
        }), O.value[e].isOpen = !1, (n = this.onCloseCallback) == null || n.call(this), this.onCloseCallback = null;
      }
    });
    B(this, "setOpen", (e) => {
      e ? this.show() : this.close();
    });
    B(this, "afterLeave", () => {
      var n;
      const e = this.index.value;
      if (e > -1) {
        if (O.value[e].isOpen)
          return;
        O.value[e].shouldRender = !1, (n = this.afterLeaveCallback) == null || n.call(this), this.afterLeaveCallback = null;
      }
      e === 0 && (O.value = []);
    });
    B(this, "on", (e, n) => {
      e = ue(e), this.listeners[e] = this.listeners[e] ?? [], this.listeners[e].push(n);
    });
    B(this, "off", (e, n) => {
      var o;
      e = ue(e), n ? this.listeners[e] = ((o = this.listeners[e]) == null ? void 0 : o.filter((l) => l !== n)) ?? [] : delete this.listeners[e];
    });
    B(this, "emit", (e, ...n) => {
      var o;
      (o = this.listeners[ue(e)]) == null || o.forEach((l) => l(...n));
    });
    B(this, "registerEventListenersFromAttrs", (e) => {
      const n = [];
      return Object.keys(e).filter((o) => o.startsWith("on")).forEach((o) => {
        const l = ue(o).replace(/^on-/, "");
        this.on(l, e[o]), n.push(() => this.off(l, e[o]));
      }), () => n.forEach((o) => o());
    });
    B(this, "reload", (e = {}) => {
      var a, r;
      let n = Object.keys(this.response.props);
      if (e.only && (n = e.only), e.except && (n = Pt(n, e.except)), !((a = this.response) != null && a.url))
        return;
      const o = (e.method ?? "get").toLowerCase(), l = e.data ?? {};
      (r = e.onStart) == null || r.call(e), pe({
        url: this.response.url,
        method: o,
        data: o === "get" ? {} : l,
        params: o === "get" ? l : {},
        headers: {
          ...e.headers ?? {},
          Accept: "text/html, application/xhtml+xml",
          "X-Inertia": !0,
          "X-Inertia-Partial-Component": this.response.component,
          "X-Inertia-Version": this.response.version,
          "X-Inertia-Partial-Data": n.join(","),
          "X-InertiaUI-Modal": Ee(),
          "X-InertiaUI-Modal-Use-Router": 0,
          "X-InertiaUI-Modal-Base-Url": le.value
        }
      }).then((s) => {
        var u;
        this.updateProps(s.data.props), (u = e.onSuccess) == null || u.call(e, s);
      }).catch((s) => {
        var u;
        (u = e.onError) == null || u.call(e, s);
      }).finally(() => {
        var s;
        (s = e.onFinish) == null || s.call(e);
      });
    });
    B(this, "updateProps", (e) => {
      Object.assign(this.props.value, e);
    });
    if (this.id = n.id ?? Ee(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = e, this.props = h(n.props), this.response = n, this.config = o ?? {}, this.onCloseCallback = l, this.afterLeaveCallback = a, J.value[this.id]) {
      this.config = {
        ...this.config,
        ...J.value[this.id].config ?? {}
      };
      const r = J.value[this.id].onClose, s = J.value[this.id].onAfterLeave;
      r && (this.onCloseCallback = l ? () => {
        l(), r();
      } : r), s && (this.afterLeaveCallback = a ? () => {
        a(), s();
      } : s), delete J.value[this.id];
    }
    this.index = $(() => O.value.findIndex((r) => r.id === this.id)), this.onTopOfStack = $(() => {
      var s;
      return O.value.length < 2 ? !0 : ((s = O.value.map((u) => ({ id: u.id, shouldRender: u.shouldRender })).reverse().find((u) => u.shouldRender)) == null ? void 0 : s.id) === this.id;
    });
  }
}
function Tt(t, e) {
  ve.value[t] = { name: t, callback: e };
}
function Wt(t, e, n, o) {
  if (!ve.value[t])
    throw new Error(`The local modal "${t}" has not been registered.`);
  const l = Be(null, {}, e, n, o);
  return l.name = t, ve.value[t].callback(l), l;
}
function Je(t, e = {}, n = null, o = null) {
  return ye(t.component).then((l) => Be(_e(l), t, e, n, o));
}
function jt(t, e, n = {}, o = {}, l = {}, a = null, r = null, s = "brackets", u = !1) {
  const f = Ee();
  return new Promise((c, d) => {
    if (t.startsWith("#")) {
      c(Wt(t.substring(1), l, a, r));
      return;
    }
    const [v, i] = Bt(e, t || "", n, s);
    let m = u && O.value.length === 0;
    if (O.value.length === 0 && (le.value = typeof window < "u" ? window.location.href : ""), o = {
      ...o,
      Accept: "text/html, application/xhtml+xml",
      "X-Requested-With": "XMLHttpRequest",
      "X-Inertia": !0,
      "X-Inertia-Version": ze().version,
      "X-InertiaUI-Modal": f,
      "X-InertiaUI-Modal-Use-Router": m ? 1 : 0,
      "X-InertiaUI-Modal-Base-Url": le.value
    }, m)
      return J.value[f] = { config: l, onClose: a, onAfterLeave: r }, oe.visit(v, {
        method: e,
        data: i,
        headers: o,
        preserveScroll: !0,
        preserveState: !0,
        onError: d,
        onFinish: () => kt(() => O.value[0]).then(c)
      });
    pe({ url: v, method: e, data: i, headers: o }).then((g) => c(Je(g.data, l, a, r))).catch(d);
  });
}
function Ut(t) {
  var n, o;
  const e = (o = (n = t.response) == null ? void 0 : n.meta) == null ? void 0 : o.deferredProps;
  e && Object.keys(e).forEach((l) => {
    t.reload({ only: e[l] });
  });
}
function Be(t, e, n, o, l) {
  const a = new Ft(t, e, n, o, l);
  return O.value.push(a), Ut(a), V(() => a.show()), a;
}
const _t = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], fo = (t, e) => (e.resolveComponent && (ye = e.resolveComponent), () => W(Lt, () => W(t, e)));
function re() {
  return {
    setComponentResolver: Rt,
    getBaseUrl: () => le.value,
    setBaseUrl: (t) => le.value = t,
    stack: gt(O),
    push: Be,
    pushFromResponseData: Je,
    closeAll: () => [...O.value].reverse().forEach((t) => t.close()),
    reset: () => O.value = [],
    visit: jt,
    registerLocalModal: Tt,
    removeLocalModal: (t) => delete ve.value[t]
  };
}
function mo() {
  return yt(ae("modalContext", null));
}
const po = {
  __name: "Deferred",
  props: {
    data: {
      type: [String, Array],
      required: !0
    }
  },
  setup(t) {
    const e = t, n = ae("modalContext");
    if (!n)
      throw new Error("Deferred component must be used inside a Modal component");
    const o = $(() => (Array.isArray(e.data) ? e.data : [e.data]).every((a) => n.value.props[a] !== void 0));
    return (l, a) => o.value ? E(l.$slots, "default", { key: 0 }) : E(l.$slots, "fallback", { key: 1 });
  }
}, qt = /* @__PURE__ */ Object.assign({
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
  setup(t, { expose: e, emit: n }) {
    const o = t, l = re(), a = o.name ? h({}) : ae("modalContext"), r = $(() => {
      var m;
      const i = ((m = a.value.config) == null ? void 0 : m.slideover) ?? o.slideover ?? Se("type") === "slideover";
      return {
        slideover: i,
        closeButton: o.closeButton ?? H(i, "closeButton"),
        closeExplicitly: o.closeExplicitly ?? H(i, "closeExplicitly"),
        maxWidth: o.maxWidth ?? H(i, "maxWidth"),
        paddingClasses: o.paddingClasses ?? H(i, "paddingClasses"),
        panelClasses: o.panelClasses ?? H(i, "panelClasses"),
        position: o.position ?? H(i, "position"),
        ...a.value.config
      };
    });
    o.name && (l.registerLocalModal(o.name, function(i) {
      a.value = i, f();
    }), me(() => {
      l.removeLocalModal(o.name);
    })), Q(() => {
      o.name || f();
    });
    const s = h(null);
    me(() => {
      var i;
      return (i = s.value) == null ? void 0 : i.call(s);
    });
    const u = qe();
    function f() {
      s.value = a.value.registerEventListenersFromAttrs(u);
    }
    const c = n;
    function d(i, ...m) {
      c("modal-event", i, ...m);
    }
    e({
      emit: d,
      afterLeave: () => {
        var i;
        return (i = a.value) == null ? void 0 : i.afterLeave();
      },
      close: () => {
        var i;
        return (i = a.value) == null ? void 0 : i.close();
      },
      reload: (...i) => {
        var m;
        return (m = a.value) == null ? void 0 : m.reload(...i);
      },
      setOpen: (...i) => {
        var m;
        return (m = a.value) == null ? void 0 : m.setOpen(...i);
      },
      getChildModal: () => {
        var i;
        return (i = a.value) == null ? void 0 : i.getChildModal();
      },
      getParentModal: () => {
        var i;
        return (i = a.value) == null ? void 0 : i.getParentModal();
      },
      get config() {
        var i;
        return (i = a.value) == null ? void 0 : i.config;
      },
      get id() {
        var i;
        return (i = a.value) == null ? void 0 : i.id;
      },
      get index() {
        var i;
        return (i = a.value) == null ? void 0 : i.index;
      },
      get isOpen() {
        var i;
        return (i = a.value) == null ? void 0 : i.isOpen;
      },
      get modalContext() {
        var i;
        return (i = a.value) == null ? void 0 : i.modalContext;
      },
      get onTopOfStack() {
        var i;
        return (i = a.value) == null ? void 0 : i.onTopOfStack;
      },
      get shouldRender() {
        var i;
        return (i = a.value) == null ? void 0 : i.shouldRender;
      }
    }), D(
      () => {
        var i;
        return (i = a.value) == null ? void 0 : i.onTopOfStack;
      },
      (i, m) => {
        i && !m ? c("focus") : !i && m && c("blur");
      }
    ), D(
      () => {
        var i;
        return (i = a.value) == null ? void 0 : i.isOpen;
      },
      (i) => {
        c(i ? "success" : "close");
      },
      { immediate: !0 }
    );
    const v = $(() => {
      var i;
      return (i = l.stack.value.find((m) => m.shouldRender && m.index > a.value.index)) == null ? void 0 : i.index;
    });
    return (i, m) => (x(), K(Ae, null, [
      p(a).shouldRender ? E(i.$slots, "default", {
        key: 0,
        id: p(a).id,
        afterLeave: p(a).afterLeave,
        close: p(a).close,
        config: r.value,
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
      }) : L("", !0),
      v.value ? (x(), C(Ye, {
        key: 1,
        index: v.value
      }, null, 8, ["index"])) : L("", !0)
    ], 64));
  }
});
function De(t, e) {
  const n = typeof t == "string" && !e ? `${t}Context` : e, o = Symbol(n);
  return [(l) => {
    const a = ae(o, l);
    if (a || a === null)
      return a;
    throw new Error(
      `Injection \`${o.toString()}\` not found. Component must be used within ${Array.isArray(t) ? `one of the following components: ${t.join(
        ", "
      )}` : `\`${t}\``}`
    );
  }, (l) => (Oe(o, l), l)];
}
function Ge(t, e, n) {
  const o = n.originalEvent.target, l = new CustomEvent(t, {
    bubbles: !1,
    cancelable: !0,
    detail: n
  });
  e && o.addEventListener(t, e, { once: !0 }), o.dispatchEvent(l);
}
function Ze(t) {
  return At() ? ($t(t), !0) : !1;
}
function Kt(t) {
  let e = !1, n;
  const o = Xe(!0);
  return (...l) => (e || (n = o.run(() => t(...l)), e = !0), n);
}
function Xt(t) {
  let e = 0, n, o;
  const l = () => {
    e -= 1, o && e <= 0 && (o.stop(), n = void 0, o = void 0);
  };
  return (...a) => (e += 1, n || (o = Xe(!0), n = o.run(() => t(...a))), Ze(l), n);
}
function Ie(t) {
  return typeof t == "function" ? t() : p(t);
}
const z = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Vt = (t) => typeof t < "u", zt = Object.prototype.toString, Ht = (t) => zt.call(t) === "[object Object]", Yt = () => {
}, Fe = /* @__PURE__ */ Jt();
function Jt() {
  var t, e;
  return z && ((t = window == null ? void 0 : window.navigator) == null ? void 0 : t.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((e = window == null ? void 0 : window.navigator) == null ? void 0 : e.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function Gt(t) {
  return ee();
}
function Zt(t, e) {
  Gt() && me(t, e);
}
function se(t) {
  var e;
  const n = Ie(t);
  return (e = n == null ? void 0 : n.$el) != null ? e : n;
}
const Pe = z ? window : void 0;
function Qe(...t) {
  let e, n, o, l;
  if (typeof t[0] == "string" || Array.isArray(t[0]) ? ([n, o, l] = t, e = Pe) : [e, n, o, l] = t, !e)
    return Yt;
  Array.isArray(n) || (n = [n]), Array.isArray(o) || (o = [o]);
  const a = [], r = () => {
    a.forEach((c) => c()), a.length = 0;
  }, s = (c, d, v, i) => (c.addEventListener(d, v, i), () => c.removeEventListener(d, v, i)), u = D(
    () => [se(e), Ie(l)],
    ([c, d]) => {
      if (r(), !c)
        return;
      const v = Ht(d) ? { ...d } : d;
      a.push(
        ...n.flatMap((i) => o.map((m) => s(c, i, m, v)))
      );
    },
    { immediate: !0, flush: "post" }
  ), f = () => {
    u(), r();
  };
  return Ze(f), f;
}
function Qt(t) {
  return typeof t == "function" ? t : typeof t == "string" ? (e) => e.key === t : Array.isArray(t) ? (e) => t.includes(e.key) : () => !0;
}
function en(...t) {
  let e, n, o = {};
  t.length === 3 ? (e = t[0], n = t[1], o = t[2]) : t.length === 2 ? typeof t[1] == "object" ? (e = !0, n = t[0], o = t[1]) : (e = t[0], n = t[1]) : (e = !0, n = t[0]);
  const {
    target: l = Pe,
    eventName: a = "keydown",
    passive: r = !1,
    dedupe: s = !1
  } = o, u = Qt(e);
  return Qe(l, a, (f) => {
    f.repeat && Ie(s) || u(f) && n(f);
  }, r);
}
function tn() {
  const t = h(!1), e = ee();
  return e && Q(() => {
    t.value = !0;
  }, e), t;
}
function nn(t) {
  return JSON.parse(JSON.stringify(t));
}
function on(t, e, n, o = {}) {
  var l, a, r;
  const {
    clone: s = !1,
    passive: u = !1,
    eventName: f,
    deep: c = !1,
    defaultValue: d,
    shouldEmit: v
  } = o, i = ee(), m = n || (i == null ? void 0 : i.emit) || ((l = i == null ? void 0 : i.$emit) == null ? void 0 : l.bind(i)) || ((r = (a = i == null ? void 0 : i.proxy) == null ? void 0 : a.$emit) == null ? void 0 : r.bind(i == null ? void 0 : i.proxy));
  let g = f;
  g = g || `update:${e.toString()}`;
  const y = (M) => s ? typeof s == "function" ? s(M) : nn(M) : M, b = () => Vt(t[e]) ? y(t[e]) : d, I = (M) => {
    v ? v(M) && m(g, M) : m(g, M);
  };
  if (u) {
    const M = b(), R = h(M);
    let P = !1;
    return D(
      () => t[e],
      (ie) => {
        P || (P = !0, R.value = y(ie), V(() => P = !1));
      }
    ), D(
      R,
      (ie) => {
        !P && (ie !== t[e] || c) && I(ie);
      },
      { deep: c }
    ), R;
  } else
    return $({
      get() {
        return b();
      },
      set(M) {
        I(M);
      }
    });
}
function Ne(t) {
  return t ? t.flatMap((e) => e.type === Ae ? Ne(e.children) : [e]) : [];
}
function U() {
  let t = document.activeElement;
  if (t == null)
    return null;
  for (; t != null && t.shadowRoot != null && t.shadowRoot.activeElement != null; )
    t = t.shadowRoot.activeElement;
  return t;
}
function he(t) {
  if (t === null || typeof t != "object")
    return !1;
  const e = Object.getPrototypeOf(t);
  return e !== null && e !== Object.prototype && Object.getPrototypeOf(e) !== null || Symbol.iterator in t ? !1 : Symbol.toStringTag in t ? Object.prototype.toString.call(t) === "[object Module]" : !0;
}
function Ce(t, e, n = ".", o) {
  if (!he(e))
    return Ce(t, {}, n);
  const l = Object.assign({}, e);
  for (const a in t) {
    if (a === "__proto__" || a === "constructor")
      continue;
    const r = t[a];
    r != null && (Array.isArray(r) && Array.isArray(l[a]) ? l[a] = [...r, ...l[a]] : he(r) && he(l[a]) ? l[a] = Ce(
      r,
      l[a],
      (n ? `${n}.` : "") + a.toString()
    ) : l[a] = r);
  }
  return l;
}
function ln(t) {
  return (...e) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    e.reduce((n, o) => Ce(n, o, ""), {})
  );
}
const an = ln(), [et, vo] = De("ConfigProvider");
let rn = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", sn = (t = 21) => {
  let e = "", n = t;
  for (; n--; )
    e += rn[Math.random() * 64 | 0];
  return e;
};
const un = Xt(() => {
  const t = h(/* @__PURE__ */ new Map()), e = h(), n = $(() => {
    for (const r of t.value.values())
      if (r)
        return !0;
    return !1;
  }), o = et({
    scrollBody: h(!0)
  });
  let l = null;
  const a = () => {
    document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.body.style.removeProperty("--scrollbar-width"), document.body.style.overflow = e.value ?? "", Fe && (l == null || l()), e.value = void 0;
  };
  return D(n, (r, s) => {
    var u;
    if (!z)
      return;
    if (!r) {
      s && a();
      return;
    }
    e.value === void 0 && (e.value = document.body.style.overflow);
    const f = window.innerWidth - document.documentElement.clientWidth, c = { padding: f, margin: 0 }, d = (u = o.scrollBody) != null && u.value ? typeof o.scrollBody.value == "object" ? an({
      padding: o.scrollBody.value.padding === !0 ? f : o.scrollBody.value.padding,
      margin: o.scrollBody.value.margin === !0 ? f : o.scrollBody.value.margin
    }, c) : c : { padding: 0, margin: 0 };
    f > 0 && (document.body.style.paddingRight = typeof d.padding == "number" ? `${d.padding}px` : String(d.padding), document.body.style.marginRight = typeof d.margin == "number" ? `${d.margin}px` : String(d.margin), document.body.style.setProperty("--scrollbar-width", `${f}px`), document.body.style.overflow = "hidden"), Fe && (l = Qe(
      document,
      "touchmove",
      (v) => cn(v),
      { passive: !1 }
    )), V(() => {
      document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden";
    });
  }, { immediate: !0, flush: "sync" }), t;
});
function dn(t) {
  const e = sn(6), n = un();
  n.value.set(e, t);
  const o = $({
    get: () => n.value.get(e) ?? !1,
    set: (l) => n.value.set(e, l)
  });
  return Zt(() => {
    n.value.delete(e);
  }), o;
}
function tt(t) {
  const e = window.getComputedStyle(t);
  if (e.overflowX === "scroll" || e.overflowY === "scroll" || e.overflowX === "auto" && t.clientWidth < t.scrollWidth || e.overflowY === "auto" && t.clientHeight < t.scrollHeight)
    return !0;
  {
    const n = t.parentNode;
    return !(n instanceof Element) || n.tagName === "BODY" ? !1 : tt(n);
  }
}
function cn(t) {
  const e = t || window.event, n = e.target;
  return n instanceof Element && tt(n) ? !1 : e.touches.length > 1 ? !0 : (e.preventDefault && e.cancelable && e.preventDefault(), !1);
}
function ke(t) {
  const e = ee(), n = e == null ? void 0 : e.type.emits, o = {};
  return n != null && n.length || console.warn(
    `No emitted event found. Please check component: ${e == null ? void 0 : e.type.__name}`
  ), n == null || n.forEach((l) => {
    o[bt(Et(l))] = (...a) => t(l, ...a);
  }), o;
}
function k() {
  const t = ee(), e = h(), n = $(() => {
    var r, s;
    return ["#text", "#comment"].includes((r = e.value) == null ? void 0 : r.$el.nodeName) ? (s = e.value) == null ? void 0 : s.$el.nextElementSibling : se(e);
  }), o = Object.assign({}, t.exposed), l = {};
  for (const r in t.props)
    Object.defineProperty(l, r, {
      enumerable: !0,
      configurable: !0,
      get: () => t.props[r]
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
    get: () => t.vnode.el
  }), t.exposed = l;
  function a(r) {
    e.value = r, r && (Object.defineProperty(l, "$el", {
      enumerable: !0,
      configurable: !0,
      get: () => r instanceof Element ? r : r.$el
    }), t.exposed = l);
  }
  return { forwardRef: a, currentRef: e, currentElement: n };
}
var fn = function(t) {
  if (typeof document > "u")
    return null;
  var e = Array.isArray(t) ? t[0] : t;
  return e.ownerDocument.body;
}, Y = /* @__PURE__ */ new WeakMap(), de = /* @__PURE__ */ new WeakMap(), ce = {}, xe = 0, nt = function(t) {
  return t && (t.host || nt(t.parentNode));
}, mn = function(t, e) {
  return e.map(function(n) {
    if (t.contains(n))
      return n;
    var o = nt(n);
    return o && t.contains(o) ? o : (console.error("aria-hidden", n, "in not contained inside", t, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, pn = function(t, e, n, o) {
  var l = mn(e, Array.isArray(t) ? t : [t]);
  ce[n] || (ce[n] = /* @__PURE__ */ new WeakMap());
  var a = ce[n], r = [], s = /* @__PURE__ */ new Set(), u = new Set(l), f = function(d) {
    !d || s.has(d) || (s.add(d), f(d.parentNode));
  };
  l.forEach(f);
  var c = function(d) {
    !d || u.has(d) || Array.prototype.forEach.call(d.children, function(v) {
      if (s.has(v))
        c(v);
      else
        try {
          var i = v.getAttribute(o), m = i !== null && i !== "false", g = (Y.get(v) || 0) + 1, y = (a.get(v) || 0) + 1;
          Y.set(v, g), a.set(v, y), r.push(v), g === 1 && m && de.set(v, !0), y === 1 && v.setAttribute(n, "true"), m || v.setAttribute(o, "true");
        } catch (b) {
          console.error("aria-hidden: cannot operate on ", v, b);
        }
    });
  };
  return c(e), s.clear(), xe++, function() {
    r.forEach(function(d) {
      var v = Y.get(d) - 1, i = a.get(d) - 1;
      Y.set(d, v), a.set(d, i), v || (de.has(d) || d.removeAttribute(o), de.delete(d)), i || d.removeAttribute(n);
    }), xe--, xe || (Y = /* @__PURE__ */ new WeakMap(), Y = /* @__PURE__ */ new WeakMap(), de = /* @__PURE__ */ new WeakMap(), ce = {});
  };
}, vn = function(t, e, n) {
  n === void 0 && (n = "data-aria-hidden");
  var o = Array.from(Array.isArray(t) ? t : [t]), l = fn(t);
  return l ? (o.push.apply(o, Array.from(l.querySelectorAll("[aria-live]"))), pn(o, l, n, "aria-hidden")) : function() {
    return null;
  };
};
function gn(t) {
  let e;
  D(() => se(t), (n) => {
    n ? e = vn(n) : e && e();
  }), q(() => {
    e && e();
  });
}
let yn = 0;
function Te(t, e = "radix") {
  const n = et({ useId: void 0 });
  return Re.useId ? `${e}-${Re.useId()}` : n.useId ? `${e}-${n.useId()}` : `${e}-${++yn}`;
}
function hn(t, e) {
  const n = h(t);
  function o(l) {
    return e[n.value][l] ?? n.value;
  }
  return {
    state: n,
    dispatch: (l) => {
      n.value = o(l);
    }
  };
}
const Le = A({
  name: "PrimitiveSlot",
  inheritAttrs: !1,
  setup(t, { attrs: e, slots: n }) {
    return () => {
      var o, l;
      if (!n.default)
        return null;
      const a = Ne(n.default()), r = a.findIndex((c) => c.type !== Ct);
      if (r === -1)
        return a;
      const s = a[r];
      (o = s.props) == null || delete o.ref;
      const u = s.props ? N(e, s.props) : e;
      e.class && (l = s.props) != null && l.class && delete s.props.class;
      const f = Ot(s, u);
      for (const c in u)
        c.startsWith("on") && (f.props || (f.props = {}), f.props[c] = u[c]);
      return a.length === 1 ? f : (a[r] = f, a);
    };
  }
}), te = A({
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
  setup(t, { attrs: e, slots: n }) {
    const o = t.asChild ? "template" : t.as;
    return typeof o == "string" && ["area", "img", "input"].includes(o) ? () => W(o, e) : o !== "template" ? () => W(t.as, e, { default: n.default }) : () => W(Le, e, { default: n.default });
  }
});
function ot() {
  const t = h(), e = $(() => {
    var n, o;
    return ["#text", "#comment"].includes((n = t.value) == null ? void 0 : n.$el.nodeName) ? (o = t.value) == null ? void 0 : o.$el.nextElementSibling : se(t);
  });
  return {
    primitiveElement: t,
    currentElement: e
  };
}
function xn(t, e) {
  var n;
  const o = h({}), l = h("none"), a = h(t), r = t.value ? "mounted" : "unmounted";
  let s;
  const u = ((n = e.value) == null ? void 0 : n.ownerDocument.defaultView) ?? Pe, { state: f, dispatch: c } = hn(r, {
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
  }), d = (y) => {
    var b;
    if (z) {
      const I = new CustomEvent(y, { bubbles: !1, cancelable: !1 });
      (b = e.value) == null || b.dispatchEvent(I);
    }
  };
  D(
    t,
    async (y, b) => {
      var I;
      const M = b !== y;
      if (await V(), M) {
        const R = l.value, P = fe(e.value);
        y ? (c("MOUNT"), d("enter"), P === "none" && d("after-enter")) : P === "none" || ((I = o.value) == null ? void 0 : I.display) === "none" ? (c("UNMOUNT"), d("leave"), d("after-leave")) : b && R !== P ? (c("ANIMATION_OUT"), d("leave")) : (c("UNMOUNT"), d("after-leave"));
      }
    },
    { immediate: !0 }
  );
  const v = (y) => {
    const b = fe(e.value), I = b.includes(
      y.animationName
    ), M = f.value === "mounted" ? "enter" : "leave";
    if (y.target === e.value && I && (d(`after-${M}`), c("ANIMATION_END"), !a.value)) {
      const R = e.value.style.animationFillMode;
      e.value.style.animationFillMode = "forwards", s = u == null ? void 0 : u.setTimeout(() => {
        var P;
        ((P = e.value) == null ? void 0 : P.style.animationFillMode) === "forwards" && (e.value.style.animationFillMode = R);
      });
    }
    y.target === e.value && b === "none" && c("ANIMATION_END");
  }, i = (y) => {
    y.target === e.value && (l.value = fe(e.value));
  }, m = D(
    e,
    (y, b) => {
      y ? (o.value = getComputedStyle(y), y.addEventListener("animationstart", i), y.addEventListener("animationcancel", v), y.addEventListener("animationend", v)) : (c("ANIMATION_END"), s !== void 0 && (u == null || u.clearTimeout(s)), b == null || b.removeEventListener("animationstart", i), b == null || b.removeEventListener("animationcancel", v), b == null || b.removeEventListener("animationend", v));
    },
    { immediate: !0 }
  ), g = D(f, () => {
    const y = fe(e.value);
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
function fe(t) {
  return t && getComputedStyle(t).animationName || "none";
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
  setup(t, { slots: e, expose: n }) {
    var o;
    const { present: l, forceMount: a } = Ke(t), r = h(), { isPresent: s } = xn(l, r);
    n({ present: s });
    let u = e.default({ present: s });
    u = Ne(u || []);
    const f = ee();
    if (u && (u == null ? void 0 : u.length) > 1) {
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
          ].map((d) => `  - ${d}`).join(`
`)
        ].join(`
`)
      );
    }
    return () => a.value || l.value || s.value ? W(e.default({ present: s })[0], {
      ref: (c) => {
        const d = se(c);
        return typeof (d == null ? void 0 : d.hasAttribute) > "u" || (d != null && d.hasAttribute("data-radix-popper-content-wrapper") ? r.value = d.firstElementChild : r.value = d), d;
      }
    }) : null;
  }
}), [_, wn] = De("DialogRoot"), bn = /* @__PURE__ */ A({
  inheritAttrs: !1,
  __name: "DialogRoot",
  props: {
    open: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: !1 },
    modal: { type: Boolean, default: !0 }
  },
  emits: ["update:open"],
  setup(t, { emit: e }) {
    const n = t, o = on(n, "open", e, {
      defaultValue: n.defaultOpen,
      passive: n.open === void 0
    }), l = h(), a = h(), { modal: r } = Ke(n);
    return wn({
      open: o,
      modal: r,
      openModal: () => {
        o.value = !0;
      },
      onOpenChange: (s) => {
        o.value = s;
      },
      onOpenToggle: () => {
        o.value = !o.value;
      },
      contentId: "",
      titleId: "",
      descriptionId: "",
      triggerElement: l,
      contentElement: a
    }), (s, u) => E(s.$slots, "default", { open: p(o) });
  }
}), En = /* @__PURE__ */ A({
  __name: "Teleport",
  props: {
    to: { default: "body" },
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(t) {
    const e = tn();
    return (n, o) => p(e) || n.forceMount ? (x(), C(wt, {
      key: 0,
      to: n.to,
      disabled: n.disabled
    }, [
      E(n.$slots, "default")
    ], 8, ["to", "disabled"])) : L("", !0);
  }
}), Cn = /* @__PURE__ */ A({
  __name: "DialogPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(t) {
    const e = t;
    return (n, o) => (x(), C(p(En), ht(xt(e)), {
      default: w(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), On = "dismissableLayer.pointerDownOutside", An = "dismissableLayer.focusOutside";
function at(t, e) {
  const n = e.closest(
    "[data-dismissable-layer]"
  ), o = t.dataset.dismissableLayer === "" ? t : t.querySelector(
    "[data-dismissable-layer]"
  ), l = Array.from(
    t.ownerDocument.querySelectorAll("[data-dismissable-layer]")
  );
  return !!(n && o === n || l.indexOf(o) < l.indexOf(n));
}
function $n(t, e) {
  var n;
  const o = ((n = e == null ? void 0 : e.value) == null ? void 0 : n.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), l = h(!1), a = h(() => {
  });
  return X((r) => {
    if (!z)
      return;
    const s = async (f) => {
      const c = f.target;
      if (e != null && e.value) {
        if (at(e.value, c)) {
          l.value = !1;
          return;
        }
        if (f.target && !l.value) {
          let d = function() {
            Ge(
              On,
              t,
              v
            );
          };
          const v = { originalEvent: f };
          f.pointerType === "touch" ? (o.removeEventListener("click", a.value), a.value = d, o.addEventListener("click", a.value, {
            once: !0
          })) : d();
        } else
          o.removeEventListener("click", a.value);
        l.value = !1;
      }
    }, u = window.setTimeout(() => {
      o.addEventListener("pointerdown", s);
    }, 0);
    r(() => {
      window.clearTimeout(u), o.removeEventListener("pointerdown", s), o.removeEventListener("click", a.value);
    });
  }), {
    onPointerDownCapture: () => l.value = !0
  };
}
function Mn(t, e) {
  var n;
  const o = ((n = e == null ? void 0 : e.value) == null ? void 0 : n.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), l = h(!1);
  return X((a) => {
    if (!z)
      return;
    const r = async (s) => {
      e != null && e.value && (await V(), !(!e.value || at(e.value, s.target)) && s.target && !l.value && Ge(
        An,
        t,
        { originalEvent: s }
      ));
    };
    o.addEventListener("focusin", r), a(() => o.removeEventListener("focusin", r));
  }), {
    onFocusCapture: () => l.value = !0,
    onBlurCapture: () => l.value = !1
  };
}
const F = Ve({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Sn = /* @__PURE__ */ A({
  __name: "DismissableLayer",
  props: {
    disableOutsidePointerEvents: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "dismiss"],
  setup(t, { emit: e }) {
    const n = t, o = e, { forwardRef: l, currentElement: a } = k(), r = $(
      () => {
        var m;
        return ((m = a.value) == null ? void 0 : m.ownerDocument) ?? globalThis.document;
      }
    ), s = $(() => F.layersRoot), u = $(() => a.value ? Array.from(s.value).indexOf(a.value) : -1), f = $(() => F.layersWithOutsidePointerEventsDisabled.size > 0), c = $(() => {
      const m = Array.from(s.value), [g] = [...F.layersWithOutsidePointerEventsDisabled].slice(-1), y = m.indexOf(g);
      return u.value >= y;
    }), d = $n(async (m) => {
      const g = [...F.branches].some(
        (y) => y == null ? void 0 : y.contains(m.target)
      );
      !c.value || g || (o("pointerDownOutside", m), o("interactOutside", m), await V(), m.defaultPrevented || o("dismiss"));
    }, a), v = Mn((m) => {
      [...F.branches].some(
        (g) => g == null ? void 0 : g.contains(m.target)
      ) || (o("focusOutside", m), o("interactOutside", m), m.defaultPrevented || o("dismiss"));
    }, a);
    en("Escape", (m) => {
      u.value === s.value.size - 1 && (o("escapeKeyDown", m), m.defaultPrevented || o("dismiss"));
    });
    let i;
    return X((m) => {
      a.value && (n.disableOutsidePointerEvents && (F.layersWithOutsidePointerEventsDisabled.size === 0 && (i = r.value.body.style.pointerEvents, r.value.body.style.pointerEvents = "none"), F.layersWithOutsidePointerEventsDisabled.add(a.value)), s.value.add(a.value), m(() => {
        n.disableOutsidePointerEvents && F.layersWithOutsidePointerEventsDisabled.size === 1 && (r.value.body.style.pointerEvents = i);
      }));
    }), X((m) => {
      m(() => {
        a.value && (s.value.delete(a.value), F.layersWithOutsidePointerEventsDisabled.delete(a.value));
      });
    }), (m, g) => (x(), C(p(te), {
      ref: p(l),
      "as-child": m.asChild,
      as: m.as,
      "data-dismissable-layer": "",
      style: Mt({
        pointerEvents: f.value ? c.value ? "auto" : "none" : void 0
      }),
      onFocusCapture: p(v).onFocusCapture,
      onBlurCapture: p(v).onBlurCapture,
      onPointerdownCapture: p(d).onPointerDownCapture
    }, {
      default: w(() => [
        E(m.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as", "style", "onFocusCapture", "onBlurCapture", "onPointerdownCapture"]));
  }
}), we = "focusScope.autoFocusOnMount", be = "focusScope.autoFocusOnUnmount", We = { bubbles: !1, cancelable: !0 };
function Bn(t, { select: e = !1 } = {}) {
  const n = U();
  for (const o of t)
    if (T(o, { select: e }), U() !== n)
      return !0;
}
function Dn(t) {
  const e = rt(t), n = je(e, t), o = je(e.reverse(), t);
  return [n, o];
}
function rt(t) {
  const e = [], n = document.createTreeWalker(t, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (o) => {
      const l = o.tagName === "INPUT" && o.type === "hidden";
      return o.disabled || o.hidden || l ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) e.push(n.currentNode);
  return e;
}
function je(t, e) {
  for (const n of t)
    if (!In(n, { upTo: e }))
      return n;
}
function In(t, { upTo: e }) {
  if (getComputedStyle(t).visibility === "hidden")
    return !0;
  for (; t; ) {
    if (e !== void 0 && t === e)
      return !1;
    if (getComputedStyle(t).display === "none")
      return !0;
    t = t.parentElement;
  }
  return !1;
}
function Pn(t) {
  return t instanceof HTMLInputElement && "select" in t;
}
function T(t, { select: e = !1 } = {}) {
  if (t && t.focus) {
    const n = U();
    t.focus({ preventScroll: !0 }), t !== n && Pn(t) && e && t.select();
  }
}
const Nn = Kt(() => h([]));
function kn() {
  const t = Nn();
  return {
    add(e) {
      const n = t.value[0];
      e !== n && (n == null || n.pause()), t.value = Ue(t.value, e), t.value.unshift(e);
    },
    remove(e) {
      var n;
      t.value = Ue(t.value, e), (n = t.value[0]) == null || n.resume();
    }
  };
}
function Ue(t, e) {
  const n = [...t], o = n.indexOf(e);
  return o !== -1 && n.splice(o, 1), n;
}
function Ln(t) {
  return t.filter((e) => e.tagName !== "A");
}
const Rn = /* @__PURE__ */ A({
  __name: "FocusScope",
  props: {
    loop: { type: Boolean, default: !1 },
    trapped: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["mountAutoFocus", "unmountAutoFocus"],
  setup(t, { emit: e }) {
    const n = t, o = e, { currentRef: l, currentElement: a } = k(), r = h(null), s = kn(), u = Ve({
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    });
    X((c) => {
      if (!z)
        return;
      const d = a.value;
      if (!n.trapped)
        return;
      function v(y) {
        if (u.paused || !d)
          return;
        const b = y.target;
        d.contains(b) ? r.value = b : T(r.value, { select: !0 });
      }
      function i(y) {
        if (u.paused || !d)
          return;
        const b = y.relatedTarget;
        b !== null && (d.contains(b) || T(r.value, { select: !0 }));
      }
      function m(y) {
        d.contains(r.value) || T(d);
      }
      document.addEventListener("focusin", v), document.addEventListener("focusout", i);
      const g = new MutationObserver(m);
      d && g.observe(d, { childList: !0, subtree: !0 }), c(() => {
        document.removeEventListener("focusin", v), document.removeEventListener("focusout", i), g.disconnect();
      });
    }), X(async (c) => {
      const d = a.value;
      if (await V(), !d)
        return;
      s.add(u);
      const v = U();
      if (!d.contains(v)) {
        const i = new CustomEvent(we, We);
        d.addEventListener(we, (m) => o("mountAutoFocus", m)), d.dispatchEvent(i), i.defaultPrevented || (Bn(Ln(rt(d)), {
          select: !0
        }), U() === v && T(d));
      }
      c(() => {
        d.removeEventListener(we, (g) => o("mountAutoFocus", g));
        const i = new CustomEvent(be, We), m = (g) => {
          o("unmountAutoFocus", g);
        };
        d.addEventListener(be, m), d.dispatchEvent(i), setTimeout(() => {
          i.defaultPrevented || T(v ?? document.body, { select: !0 }), d.removeEventListener(be, m), s.remove(u);
        }, 0);
      });
    });
    function f(c) {
      if (!n.loop && !n.trapped || u.paused)
        return;
      const d = c.key === "Tab" && !c.altKey && !c.ctrlKey && !c.metaKey, v = U();
      if (d && v) {
        const i = c.currentTarget, [m, g] = Dn(i);
        m && g ? !c.shiftKey && v === g ? (c.preventDefault(), n.loop && T(m, { select: !0 })) : c.shiftKey && v === m && (c.preventDefault(), n.loop && T(g, { select: !0 })) : v === i && c.preventDefault();
      }
    }
    return (c, d) => (x(), C(p(te), {
      ref_key: "currentRef",
      ref: l,
      tabindex: "-1",
      "as-child": c.asChild,
      as: c.as,
      onKeydown: f
    }, {
      default: w(() => [
        E(c.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as"]));
  }
});
function Fn(t) {
  return t ? "open" : "closed";
}
const Tn = "DialogTitle", Wn = "DialogContent";
function jn({
  titleName: t = Tn,
  contentName: e = Wn,
  componentLink: n = "dialog.html#title",
  titleId: o,
  descriptionId: l,
  contentElement: a
}) {
  const r = `Warning: \`${e}\` requires a \`${t}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://www.radix-vue.com/components/${n}`, s = `Warning: Missing \`Description\` or \`aria-describedby="undefined"\` for ${e}.`;
  Q(() => {
    var u;
    document.getElementById(o) || console.warn(r);
    const f = (u = a.value) == null ? void 0 : u.getAttribute("aria-describedby");
    l && f && (document.getElementById(l) || console.warn(s));
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
  setup(t, { emit: e }) {
    const n = t, o = e, l = _(), { forwardRef: a, currentElement: r } = k();
    return l.titleId || (l.titleId = Te(void 0, "radix-vue-dialog-title")), l.descriptionId || (l.descriptionId = Te(void 0, "radix-vue-dialog-description")), Q(() => {
      l.contentElement = r, U() !== document.body && (l.triggerElement.value = U());
    }), process.env.NODE_ENV !== "production" && jn({
      titleName: "DialogTitle",
      contentName: "DialogContent",
      componentLink: "dialog.html#title",
      titleId: l.titleId,
      descriptionId: l.descriptionId,
      contentElement: r
    }), (s, u) => (x(), C(p(Rn), {
      "as-child": "",
      loop: "",
      trapped: n.trapFocus,
      onMountAutoFocus: u[5] || (u[5] = (f) => o("openAutoFocus", f)),
      onUnmountAutoFocus: u[6] || (u[6] = (f) => o("closeAutoFocus", f))
    }, {
      default: w(() => [
        S(p(Sn), N({
          id: p(l).contentId,
          ref: p(a),
          as: s.as,
          "as-child": s.asChild,
          "disable-outside-pointer-events": s.disableOutsidePointerEvents,
          role: "dialog",
          "aria-describedby": p(l).descriptionId,
          "aria-labelledby": p(l).titleId,
          "data-state": p(Fn)(p(l).open.value)
        }, s.$attrs, {
          onDismiss: u[0] || (u[0] = (f) => p(l).onOpenChange(!1)),
          onEscapeKeyDown: u[1] || (u[1] = (f) => o("escapeKeyDown", f)),
          onFocusOutside: u[2] || (u[2] = (f) => o("focusOutside", f)),
          onInteractOutside: u[3] || (u[3] = (f) => o("interactOutside", f)),
          onPointerDownOutside: u[4] || (u[4] = (f) => o("pointerDownOutside", f))
        }), {
          default: w(() => [
            E(s.$slots, "default")
          ]),
          _: 3
        }, 16, ["id", "as", "as-child", "disable-outside-pointer-events", "aria-describedby", "aria-labelledby", "data-state"])
      ]),
      _: 3
    }, 8, ["trapped"]));
  }
}), Un = /* @__PURE__ */ A({
  __name: "DialogContentModal",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(t, { emit: e }) {
    const n = t, o = e, l = _(), a = ke(o), { forwardRef: r, currentElement: s } = k();
    return gn(s), (u, f) => (x(), C(st, N({ ...n, ...p(a) }, {
      ref: p(r),
      "trap-focus": p(l).open.value,
      "disable-outside-pointer-events": !0,
      onCloseAutoFocus: f[0] || (f[0] = (c) => {
        var d;
        c.defaultPrevented || (c.preventDefault(), (d = p(l).triggerElement.value) == null || d.focus());
      }),
      onPointerDownOutside: f[1] || (f[1] = (c) => {
        const d = c.detail.originalEvent, v = d.button === 0 && d.ctrlKey === !0;
        (d.button === 2 || v) && c.preventDefault();
      }),
      onFocusOutside: f[2] || (f[2] = (c) => {
        c.preventDefault();
      })
    }), {
      default: w(() => [
        E(u.$slots, "default")
      ]),
      _: 3
    }, 16, ["trap-focus"]));
  }
}), _n = /* @__PURE__ */ A({
  __name: "DialogContentNonModal",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(t, { emit: e }) {
    const n = t, o = ke(e);
    k();
    const l = _(), a = h(!1), r = h(!1);
    return (s, u) => (x(), C(st, N({ ...n, ...p(o) }, {
      "trap-focus": !1,
      "disable-outside-pointer-events": !1,
      onCloseAutoFocus: u[0] || (u[0] = (f) => {
        var c;
        f.defaultPrevented || (a.value || (c = p(l).triggerElement.value) == null || c.focus(), f.preventDefault()), a.value = !1, r.value = !1;
      }),
      onInteractOutside: u[1] || (u[1] = (f) => {
        var c;
        f.defaultPrevented || (a.value = !0, f.detail.originalEvent.type === "pointerdown" && (r.value = !0));
        const d = f.target;
        (c = p(l).triggerElement.value) != null && c.contains(d) && f.preventDefault(), f.detail.originalEvent.type === "focusin" && r.value && f.preventDefault();
      })
    }), {
      default: w(() => [
        E(s.$slots, "default")
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
  setup(t, { emit: e }) {
    const n = t, o = e, l = _(), a = ke(o), { forwardRef: r } = k();
    return (s, u) => (x(), C(p(lt), {
      present: s.forceMount || p(l).open.value
    }, {
      default: w(() => [
        p(l).modal.value ? (x(), C(Un, N({
          key: 0,
          ref: p(r)
        }, { ...n, ...p(a), ...s.$attrs }), {
          default: w(() => [
            E(s.$slots, "default")
          ]),
          _: 3
        }, 16)) : (x(), C(_n, N({
          key: 1,
          ref: p(r)
        }, { ...n, ...p(a), ...s.$attrs }), {
          default: w(() => [
            E(s.$slots, "default")
          ]),
          _: 3
        }, 16))
      ]),
      _: 3
    }, 8, ["present"]));
  }
}), qn = /* @__PURE__ */ A({
  __name: "DialogOverlayImpl",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(t) {
    const e = _();
    return dn(!0), k(), (n, o) => (x(), C(p(te), {
      as: n.as,
      "as-child": n.asChild,
      "data-state": p(e).open.value ? "open" : "closed",
      style: { "pointer-events": "auto" }
    }, {
      default: w(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child", "data-state"]));
  }
}), Kn = /* @__PURE__ */ A({
  __name: "DialogOverlay",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(t) {
    const e = _(), { forwardRef: n } = k();
    return (o, l) => {
      var a;
      return (a = p(e)) != null && a.modal.value ? (x(), C(p(lt), {
        key: 0,
        present: o.forceMount || p(e).open.value
      }, {
        default: w(() => [
          S(qn, N(o.$attrs, {
            ref: p(n),
            as: o.as,
            "as-child": o.asChild
          }), {
            default: w(() => [
              E(o.$slots, "default")
            ]),
            _: 3
          }, 16, ["as", "as-child"])
        ]),
        _: 3
      }, 8, ["present"])) : L("", !0);
    };
  }
}), Xn = /* @__PURE__ */ A({
  __name: "DialogClose",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(t) {
    const e = t;
    k();
    const n = _();
    return (o, l) => (x(), C(p(te), N(e, {
      type: o.as === "button" ? "button" : void 0,
      onClick: l[0] || (l[0] = (a) => p(n).onOpenChange(!1))
    }), {
      default: w(() => [
        E(o.$slots, "default")
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
  setup(t) {
    const e = t, n = _();
    return k(), (o, l) => (x(), C(p(te), N(e, {
      id: p(n).titleId
    }), {
      default: w(() => [
        E(o.$slots, "default")
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
  setup(t) {
    return k(), (e, n) => (x(), C(p(te), {
      as: e.as,
      "as-child": e.asChild,
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
        E(e.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
}), [ct, go] = De("CollectionProvider");
A({
  name: "CollectionSlot",
  setup(t, { slots: e }) {
    const n = ct(), { primitiveElement: o, currentElement: l } = ot();
    return D(l, () => {
      n.collectionRef.value = l.value;
    }), () => W(Le, { ref: o }, e);
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
  setup(t, { slots: e, attrs: n }) {
    const o = ct(), { primitiveElement: l, currentElement: a } = ot();
    return X((r) => {
      if (a.value) {
        const s = _e(a.value);
        o.itemMap.value.set(s, { ref: a.value, value: t.value }), r(() => o.itemMap.value.delete(s));
      }
    }), () => W(Le, { ...n, [o.attrName]: "", ref: l }, e);
  }
});
function Vn() {
  if (typeof matchMedia == "function")
    return matchMedia("(pointer:coarse)").matches ? "coarse" : "fine";
}
Vn();
const ft = {
  __name: "CloseButton",
  setup(t) {
    return (e, n) => (x(), C(p(Xn), { class: "im-close-button text-gray-400 hover:text-gray-500" }, {
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
}, zn = { class: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4" }, Hn = ["data-inertiaui-modal-entered"], Yn = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, Jn = {
  __name: "ModalContent",
  props: {
    modalContext: Object,
    config: Object
  },
  setup(t) {
    const e = h(!1);
    return (n, o) => (x(), K("div", zn, [
      j("div", {
        class: G(["im-modal-positioner flex min-h-full justify-center", {
          "items-start": t.config.position === "top",
          "items-center": t.config.position === "center",
          "items-end": t.config.position === "bottom"
        }])
      }, [
        S($e, {
          appear: "",
          "enter-from-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          "enter-to-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-from-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-to-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          onAfterEnter: o[2] || (o[2] = (l) => e.value = !0),
          onAfterLeave: t.modalContext.afterLeave
        }, {
          default: w(() => [
            S(p(it), {
              "aria-describedby": void 0,
              class: G({
                "im-modal-wrapper w-full transition duration-300 ease-in-out": !0,
                "blur-sm": !t.modalContext.onTopOfStack,
                "sm:max-w-sm": t.config.maxWidth == "sm",
                "sm:max-w-md": t.config.maxWidth == "md",
                "sm:max-w-md md:max-w-lg": t.config.maxWidth == "lg",
                "sm:max-w-md md:max-w-xl": t.config.maxWidth == "xl",
                "sm:max-w-md md:max-w-xl lg:max-w-2xl": t.config.maxWidth == "2xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl": t.config.maxWidth == "3xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl": t.config.maxWidth == "4xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl": t.config.maxWidth == "5xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl": t.config.maxWidth == "6xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl": t.config.maxWidth == "7xl"
              }),
              onEscapeKeyDown: o[0] || (o[0] = (l) => {
                var a;
                return ((a = t.config) == null ? void 0 : a.closeExplicitly) && l.preventDefault();
              }),
              onInteractOutside: o[1] || (o[1] = (l) => {
                var a;
                return ((a = t.config) == null ? void 0 : a.closeExplicitly) && l.preventDefault();
              })
            }, {
              default: w(() => [
                S(p(dt), { "as-child": "" }, {
                  default: w(() => [
                    S(p(ut))
                  ]),
                  _: 1
                }),
                j("div", {
                  class: G(["im-modal-content relative", [t.config.paddingClasses, t.config.panelClasses]]),
                  "data-inertiaui-modal-entered": e.value
                }, [
                  t.config.closeButton ? (x(), K("div", Yn, [
                    S(ft)
                  ])) : L("", !0),
                  E(n.$slots, "default", {
                    modalContext: t.modalContext,
                    config: t.config
                  })
                ], 10, Hn)
              ]),
              _: 3
            }, 8, ["class"])
          ]),
          _: 3
        }, 8, ["onAfterLeave"])
      ], 2)
    ]));
  }
}, Gn = { class: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden" }, Zn = ["data-inertiaui-modal-entered"], Qn = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, eo = {
  __name: "SlideoverContent",
  props: {
    modalContext: Object,
    config: Object
  },
  setup(t) {
    const e = h(!1);
    return (n, o) => (x(), K("div", Gn, [
      j("div", {
        class: G(["im-slideover-positioner flex min-h-full items-center", {
          "justify-start rtl:justify-end": t.config.position === "left",
          "justify-end rtl:justify-start": t.config.position === "right"
        }])
      }, [
        S($e, {
          appear: "",
          "enter-from-class": "opacity-0 " + (t.config.position === "left" ? "-translate-x-full" : "translate-x-full"),
          "enter-to-class": "opacity-100 translate-x-0",
          "leave-from-class": "opacity-100 translate-x-0",
          "leave-to-class": "opacity-0 " + (t.config.position === "left" ? "-translate-x-full" : "translate-x-full"),
          onAfterEnter: o[2] || (o[2] = (l) => e.value = !0),
          onAfterLeave: t.modalContext.afterLeave
        }, {
          default: w(() => [
            S(p(it), {
              "aria-describedby": void 0,
              class: G({
                "im-slideover-wrapper w-full transition duration-300 ease-in-out": !0,
                "blur-sm": !t.modalContext.onTopOfStack,
                "sm:max-w-sm": t.config.maxWidth == "sm",
                "sm:max-w-md": t.config.maxWidth == "md",
                "sm:max-w-md md:max-w-lg": t.config.maxWidth == "lg",
                "sm:max-w-md md:max-w-xl": t.config.maxWidth == "xl",
                "sm:max-w-md md:max-w-xl lg:max-w-2xl": t.config.maxWidth == "2xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl": t.config.maxWidth == "3xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl": t.config.maxWidth == "4xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl": t.config.maxWidth == "5xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl": t.config.maxWidth == "6xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl": t.config.maxWidth == "7xl"
              }),
              onEscapeKeyDown: o[0] || (o[0] = (l) => {
                var a;
                return ((a = t.config) == null ? void 0 : a.closeExplicitly) && l.preventDefault();
              }),
              onInteractOutside: o[1] || (o[1] = (l) => {
                var a;
                return ((a = t.config) == null ? void 0 : a.closeExplicitly) && l.preventDefault();
              })
            }, {
              default: w(() => [
                S(p(dt), { "as-child": "" }, {
                  default: w(() => [
                    S(p(ut))
                  ]),
                  _: 1
                }),
                j("div", {
                  class: G(["im-slideover-content relative", [t.config.paddingClasses, t.config.panelClasses]]),
                  "data-inertiaui-modal-entered": e.value
                }, [
                  t.config.closeButton ? (x(), K("div", Qn, [
                    S(ft)
                  ])) : L("", !0),
                  E(n.$slots, "default", {
                    modalContext: t.modalContext,
                    config: t.config
                  })
                ], 10, Zn)
              ]),
              _: 3
            }, 8, ["class"])
          ]),
          _: 3
        }, 8, ["enter-from-class", "leave-to-class", "onAfterLeave"])
      ], 2)
    ]));
  }
}, to = ["data-inertiaui-modal-id", "data-inertiaui-modal-index", "aria-hidden"], no = {
  key: 1,
  class: "im-backdrop fixed inset-0 z-30 bg-black/75"
}, yo = {
  __name: "Modal",
  emits: ["after-leave", "blur", "close", "focus", "success"],
  setup(t, { expose: e }) {
    const n = h(null), o = h(!1);
    return e({
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
    }), (l, a) => (x(), C(qt, {
      ref_key: "modal",
      ref: n,
      onSuccess: a[2] || (a[2] = (r) => l.$emit("success")),
      onClose: a[3] || (a[3] = (r) => l.$emit("close")),
      onFocus: a[4] || (a[4] = (r) => l.$emit("focus")),
      onBlur: a[5] || (a[5] = (r) => l.$emit("blur"))
    }, {
      default: w(({
        afterLeave: r,
        close: s,
        config: u,
        emit: f,
        getChildModal: c,
        getParentModal: d,
        id: v,
        index: i,
        isOpen: m,
        modalContext: g,
        onTopOfStack: y,
        reload: b,
        setOpen: I,
        shouldRender: M
      }) => [
        S(p(bn), {
          open: m,
          "onUpdate:open": I
        }, {
          default: w(() => [
            S(p(Cn), null, {
              default: w(() => [
                j("div", {
                  "data-inertiaui-modal-id": v,
                  "data-inertiaui-modal-index": i,
                  class: "im-dialog relative z-20",
                  "aria-hidden": !y
                }, [
                  i === 0 && y ? (x(), C($e, {
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
                      S(p(Kn), { class: "im-backdrop fixed inset-0 z-30 bg-black/75" })
                    ]),
                    _: 1
                  }, 8, ["appear"])) : L("", !0),
                  i > 0 && y ? (x(), K("div", no)) : L("", !0),
                  (x(), C(Me(u != null && u.slideover ? eo : Jn), {
                    "modal-context": g,
                    config: u,
                    onAfterLeave: a[1] || (a[1] = (R) => l.$emit("after-leave"))
                  }, {
                    default: w(() => [
                      E(l.$slots, "default", {
                        id: v,
                        afterLeave: r,
                        close: s,
                        config: u,
                        emit: f,
                        getChildModal: c,
                        getParentModal: d,
                        index: i,
                        isOpen: m,
                        modalContext: g,
                        onTopOfStack: y,
                        reload: b,
                        setOpen: I,
                        shouldRender: M
                      })
                    ]),
                    _: 2
                  }, 1064, ["modal-context", "config"]))
                ], 8, to)
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
}, ho = {
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
  setup(t, { emit: e }) {
    const n = t, o = h(!1), l = re(), a = h(null);
    Oe("modalContext", a);
    const r = e, s = h(!1), u = $(() => n.navigate ?? Se("navigate"));
    D(
      () => {
        var g;
        return (g = a.value) == null ? void 0 : g.onTopOfStack;
      },
      (g) => {
        a.value && (g && s.value ? r("focus") : g || r("blur"), s.value = !g);
      }
    );
    const f = h(null);
    me(() => {
      var g;
      (g = f.value) == null || g.call(f);
    });
    const c = qe();
    function d() {
      f.value = a.value.registerEventListenersFromAttrs(c);
    }
    D(a, (g, y) => {
      g && !y && (d(), r("success"));
    });
    function v() {
      r("close");
    }
    function i() {
      a.value = null, r("after-leave");
    }
    function m() {
      o.value || (n.href.startsWith("#") || (o.value = !0, r("start")), l.visit(
        n.href,
        n.method,
        n.data,
        n.headers,
        Nt(He(n, _t)),
        v,
        i,
        n.queryStringArrayFormat,
        u.value
      ).then((g) => {
        a.value = g;
      }).catch((g) => r("error", g)).finally(() => o.value = !1));
    }
    return (g, y) => (x(), C(Me(t.as), N(p(c), {
      href: t.href,
      onClick: St(m, ["prevent"])
    }), {
      default: w(() => [
        E(g.$slots, "default", { loading: o.value })
      ]),
      _: 3
    }, 16, ["href"]));
  }
}, xo = {
  __name: "WhenVisible",
  props: {
    data: [String, Array],
    params: Object,
    buffer: { type: Number, default: 0 },
    as: { type: String, default: "div" },
    always: { type: Boolean, default: !1 }
  },
  setup(t) {
    const e = t, n = ae("modalContext");
    if (!n)
      throw new Error("Deferred component must be used inside a Modal component");
    const o = h(!1), l = h(!1), a = h(null);
    let r = null;
    const s = () => {
      if (e.data)
        return { only: Array.isArray(e.data) ? e.data : [e.data] };
      if (!e.params)
        throw new Error("You must provide either a `data` or `params` prop.");
      return e.params;
    };
    return Q(() => {
      a.value && (r = new IntersectionObserver(
        (f) => {
          if (!f[0].isIntersecting || (e.always || r.disconnect(), l.value))
            return;
          l.value = !0;
          const c = s();
          n.value.reload({
            ...c,
            onStart: () => {
              var d;
              l.value = !0, (d = c.onStart) == null || d.call(c);
            },
            onFinish: () => {
              var d;
              o.value = !0, l.value = !1, (d = c.onFinish) == null || d.call(c);
            }
          });
        },
        { rootMargin: `${e.buffer}px` }
      ), r.observe(a.value));
    }), q(() => r == null ? void 0 : r.disconnect()), (f, c) => (x(), C(Me(e.as), {
      ref_key: "rootElement",
      ref: a
    }, {
      default: w(() => [
        o.value ? E(f.$slots, "default", { key: 0 }) : E(f.$slots, "fallback", { key: 1 })
      ]),
      _: 3
    }, 512));
  }
};
function wo(t, e = {}) {
  return re().visit(
    t,
    e.method ?? "get",
    e.data ?? {},
    e.headers ?? {},
    e.config ?? {},
    e.onClose,
    e.onAfterLeave,
    e.queryStringArrayFormat ?? "brackets",
    e.navigate ?? Se("navigate")
  ).then((n) => {
    const o = e.listeners ?? {};
    return Object.keys(o).forEach((l) => {
      const a = l.replace(/([A-Z])/g, "-$1").toLowerCase();
      n.on(a, o[l]);
    }), n;
  });
}
export {
  po as Deferred,
  qt as HeadlessModal,
  yo as Modal,
  ho as ModalLink,
  Lt as ModalRoot,
  xo as WhenVisible,
  Se as getConfig,
  co as initFromPageProps,
  uo as putConfig,
  fo as renderApp,
  io as resetConfig,
  mo as useModal,
  wo as visitModal
};
