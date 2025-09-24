var pt = Object.defineProperty;
var mt = (t, e, n) => e in t ? pt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var I = (t, e, n) => mt(t, typeof e != "symbol" ? e + "" : e, n);
import * as ue from "vue";
import { computed as A, provide as Me, createBlock as _, createCommentVNode as F, openBlock as w, unref as m, mergeProps as k, onUnmounted as U, onBeforeMount as je, onMounted as te, watch as P, createElementBlock as H, Fragment as Se, renderSlot as E, ref as x, h as Y, readonly as vt, markRaw as yt, nextTick as K, toValue as L, inject as le, onBeforeUnmount as me, useAttrs as Ke, effectScope as Ve, getCurrentScope as gt, onScopeDispose as ht, getCurrentInstance as ne, shallowRef as xt, toHandlerKey as bt, camelize as wt, defineComponent as M, toRefs as He, Comment as Ct, cloneVNode as Ot, withCtx as C, watchEffect as ee, reactive as Xe, normalizeStyle as Et, createVNode as S, Teleport as _t, normalizeProps as Dt, guardReactiveProps as At, createElementVNode as W, normalizeClass as Z, Transition as Ie, resolveDynamicComponent as Pe, withModifiers as Mt } from "vue";
import * as Fe from "@inertiajs/vue3";
import { usePage as ze, router as re } from "@inertiajs/vue3";
import { mergeDataIntoQueryString as St } from "@inertiajs/core";
import ve from "axios";
const ae = {
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
    this.config = JSON.parse(JSON.stringify(ae));
  }
  put(e, n) {
    if (typeof e == "object") {
      this.config = {
        type: e.type ?? ae.type,
        navigate: e.navigate ?? ae.navigate,
        modal: { ...ae.modal, ...e.modal ?? {} },
        slideover: { ...ae.slideover, ...e.slideover ?? {} }
      };
      return;
    }
    const o = e.split(".");
    let r = this.config;
    for (let a = 0; a < o.length - 1; a++)
      r = r[o[a]] = r[o[a]] || {};
    r[o[o.length - 1]] = n;
  }
  get(e) {
    if (typeof e > "u")
      return this.config;
    const n = e.split(".");
    let o = this.config;
    for (const r of n) {
      if (o[r] === void 0)
        return null;
      o = o[r];
    }
    return o;
  }
}
const ge = new It(), Co = () => ge.reset(), Oo = (t, e) => ge.put(t, e), Be = (t) => ge.get(t), z = (t, e) => ge.get(t ? `slideover.${e}` : `modal.${e}`);
function Pt(t, e) {
  const n = typeof window < "u" ? window.location.origin : "http://localhost";
  return t = typeof t == "string" ? new URL(t, n) : t, e = typeof e == "string" ? new URL(e, n) : e, `${t.origin}${t.pathname}` == `${e.origin}${e.pathname}`;
}
function _e(t = "inertiaui_modal_") {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `${t}${crypto.randomUUID()}` : `${t}${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
}
function Q(t) {
  return typeof t == "string" ? t.toLowerCase() : t;
}
function Bt(t, e, n = !1) {
  return n && (e = e.map(Q)), Array.isArray(t) ? t.filter((o) => !e.includes(n ? Q(o) : o)) : Object.keys(t).reduce((o, r) => (e.includes(n ? Q(r) : r) || (o[r] = t[r]), o), {});
}
function Ge(t, e, n = !1) {
  return n && (e = e.map(Q)), Array.isArray(t) ? t.filter((o) => e.includes(n ? Q(o) : o)) : Object.keys(t).reduce((o, r) => (e.includes(n ? Q(r) : r) && (o[r] = t[r]), o), {});
}
function $t(t) {
  return Array.isArray(t) ? t.filter((e) => e !== null) : Object.keys(t).reduce((e, n) => (n in t && t[n] !== null && (e[n] = t[n]), e), {});
}
function de(t) {
  return t ? (t = t.replace(/_/g, "-"), t = t.replace(/-+/g, "-"), /[A-Z]/.test(t) ? (t = t.replace(/\s+/g, "").replace(/_/g, "").replace(/(?:^|\s|-)+([A-Za-z])/g, (e, n) => n.toUpperCase()), t = t.replace(/(.)(?=[A-Z])/g, "$1-"), t.toLowerCase()) : t) : "";
}
const Je = {
  __name: "ModalRenderer",
  props: {
    index: {
      type: Number,
      required: !0
    }
  },
  setup(t) {
    const e = t, n = ie(), o = A(() => n.stack.value[e.index]);
    return Me("modalContext", o), (r, a) => {
      var s;
      return (s = o.value) != null && s.component ? (w(), _(m(o).component, k({ key: 0 }, m(Ge)(o.value.props ?? {}, o.value.getComponentPropKeys(), !0), {
        onModalEvent: a[0] || (a[0] = (l, ...i) => o.value.emit(l, ...i))
      }), null, 16)) : F("", !0);
    };
  }
}, Lt = {
  __name: "ModalRoot",
  setup(t) {
    const e = ie(), n = ze();
    let o = !1, r = null, a = !1;
    U(re.on("start", () => o = !0)), U(re.on("finish", () => o = !1)), U(
      re.on("navigate", (l) => {
        const i = l.detail.page.props._inertiaui_modal;
        if (!i) {
          r && e.closeAll(), e.setBaseUrl(null), a = !1;
          return;
        }
        r = i, e.setBaseUrl(i.baseUrl), e.pushFromResponseData(i, {}, () => {
          if (!i.baseUrl) {
            console.error("No base url in modal response data so cannot navigate back");
            return;
          }
          !o && typeof window < "u" && window.location.href !== i.baseUrl && re.visit(i.baseUrl, {
            preserveScroll: !0,
            preserveState: !0
          });
        }).then(e.onModalOnBase);
      })
    );
    const s = (l) => {
      var i;
      return l.headers["X-InertiaUI-Modal-Base-Url"] = e.getBaseUrl() ?? (a ? (i = n.props._inertiaui_modal) == null ? void 0 : i.baseUrl : null), l;
    };
    return je(() => ve.interceptors.request.use(s)), te(() => a = !!n.props._inertiaui_modal), U(() => ve.interceptors.request.eject(s)), P(
      () => {
        var l;
        return (l = n.props) == null ? void 0 : l._inertiaui_modal;
      },
      (l, i) => {
        var f;
        l && i && l.component === i.component && Pt(l.url, i.url) && ((f = e.stack.value[0]) == null || f.updateProps(l.props ?? {}));
      }
    ), (l, i) => (w(), H(Se, null, [
      E(l.$slots, "default"),
      m(e).stack.value.length ? (w(), _(Je, {
        key: 0,
        index: 0
      })) : F("", !0)
    ], 64));
  }
};
let he = null;
const J = x({}), se = x(null), De = x({}), D = x([]), ye = x({}), kt = (t) => {
  he = t;
}, Eo = (t) => {
  t.resolveComponent && (he = t.resolveComponent);
};
class Tt {
  constructor(e, n, o, r, a) {
    I(this, "getComponentPropKeys", () => Array.isArray(this.component.props) ? this.component.props : this.component.props ? Object.keys(this.component.props) : []);
    I(this, "getParentModal", () => {
      const e = this.index.value;
      return e < 1 ? null : D.value.slice(0, e).reverse().find((n) => n.isOpen);
    });
    I(this, "getChildModal", () => {
      const e = this.index.value;
      return e === D.value.length - 1 ? null : D.value.slice(e + 1).find((n) => n.isOpen);
    });
    I(this, "show", () => {
      const e = this.index.value;
      if (e > -1) {
        if (D.value[e].isOpen)
          return;
        D.value[e].isOpen = !0, D.value[e].shouldRender = !0;
      }
    });
    I(this, "close", () => {
      var n;
      const e = this.index.value;
      if (e > -1) {
        if (!D.value[e].isOpen)
          return;
        Object.keys(this.listeners).forEach((o) => {
          this.off(o);
        }), D.value[e].isOpen = !1, (n = this.onCloseCallback) == null || n.call(this), this.onCloseCallback = null;
      }
    });
    I(this, "setOpen", (e) => {
      e ? this.show() : this.close();
    });
    I(this, "afterLeave", () => {
      var n;
      const e = this.index.value;
      if (e > -1) {
        if (D.value[e].isOpen)
          return;
        D.value[e].shouldRender = !1, (n = this.afterLeaveCallback) == null || n.call(this), this.afterLeaveCallback = null;
      }
      e === 0 && (D.value = []);
    });
    I(this, "on", (e, n) => {
      e = de(e), this.listeners[e] = this.listeners[e] ?? [], this.listeners[e].push(n);
    });
    I(this, "off", (e, n) => {
      var o;
      e = de(e), n ? this.listeners[e] = ((o = this.listeners[e]) == null ? void 0 : o.filter((r) => r !== n)) ?? [] : delete this.listeners[e];
    });
    I(this, "emit", (e, ...n) => {
      var o;
      (o = this.listeners[de(e)]) == null || o.forEach((r) => r(...n));
    });
    I(this, "registerEventListenersFromAttrs", (e) => {
      const n = [];
      return Object.keys(e).filter((o) => o.startsWith("on")).forEach((o) => {
        const r = de(o).replace(/^on-/, "");
        this.on(r, e[o]), n.push(() => this.off(r, e[o]));
      }), () => n.forEach((o) => o());
    });
    I(this, "reload", (e = {}) => {
      var a, s;
      let n = Object.keys(this.response.props);
      if (e.only && (n = e.only), e.except && (n = Bt(n, e.except)), !((a = this.response) != null && a.url))
        return;
      const o = (e.method ?? "get").toLowerCase(), r = e.data ?? {};
      (s = e.onStart) == null || s.call(e), ve({
        url: this.response.url,
        method: o,
        data: o === "get" ? {} : r,
        params: o === "get" ? r : {},
        headers: {
          ...e.headers ?? {},
          Accept: "text/html, application/xhtml+xml",
          "X-Inertia": !0,
          "X-Inertia-Partial-Component": this.response.component,
          "X-Inertia-Version": this.response.version,
          "X-Inertia-Partial-Data": n.join(","),
          "X-InertiaUI-Modal": _e(),
          "X-InertiaUI-Modal-Use-Router": 0,
          "X-InertiaUI-Modal-Base-Url": se.value
        }
      }).then((l) => {
        var i;
        this.updateProps(l.data.props), (i = e.onSuccess) == null || i.call(e, l);
      }).catch((l) => {
        var i;
        (i = e.onError) == null || i.call(e, l);
      }).finally(() => {
        var l;
        (l = e.onFinish) == null || l.call(e);
      });
    });
    I(this, "updateProps", (e) => {
      Object.assign(this.props.value, e);
    });
    if (this.id = n.id ?? _e(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = e, this.props = x(n.props), this.response = n, this.config = o ?? {}, this.onCloseCallback = r, this.afterLeaveCallback = a, J.value[this.id]) {
      this.config = {
        ...this.config,
        ...J.value[this.id].config ?? {}
      };
      const s = J.value[this.id].onClose, l = J.value[this.id].onAfterLeave;
      s && (this.onCloseCallback = r ? () => {
        r(), s();
      } : s), l && (this.afterLeaveCallback = a ? () => {
        a(), l();
      } : l), delete J.value[this.id];
    }
    this.index = A(() => D.value.findIndex((s) => s.id === this.id)), this.onTopOfStack = A(() => {
      var l;
      return D.value.length < 2 ? !0 : ((l = D.value.map((i) => ({ id: i.id, shouldRender: i.shouldRender })).reverse().find((i) => i.shouldRender)) == null ? void 0 : l.id) === this.id;
    });
  }
}
function Ft(t, e) {
  ye.value[t] = { name: t, callback: e };
}
function qt(t, e, n, o) {
  if (!ye.value[t])
    throw new Error(`The local modal "${t}" has not been registered.`);
  const r = $e(null, {}, e, n, o);
  return r.name = t, ye.value[t].callback(r), r;
}
function Ye(t, e = {}, n = null, o = null) {
  return he(t.component).then((r) => $e(yt(r), t, e, n, o));
}
function Rt(t, e, n = {}, o = {}, r = {}, a = null, s = null, l = "brackets", i = !1, f = null, d = null, c = null) {
  const v = _e();
  return new Promise((u, p) => {
    if (t.startsWith("#")) {
      u(qt(t.substring(1), r, a, s));
      return;
    }
    const [y, b] = St(e, t || "", n, l);
    let h = i && D.value.length === 0;
    if (D.value.length === 0 && (se.value = typeof window < "u" ? window.location.href : ""), o = {
      ...o,
      Accept: "text/html, application/xhtml+xml",
      "X-Requested-With": "XMLHttpRequest",
      "X-Inertia": !0,
      "X-Inertia-Version": ze().version,
      "X-InertiaUI-Modal": v,
      "X-InertiaUI-Modal-Use-Router": h ? 1 : 0,
      "X-InertiaUI-Modal-Base-Url": se.value
    }, h)
      return J.value[v] = { config: r, onClose: a, onAfterLeave: s }, re.visit(y, {
        method: e,
        data: b,
        headers: o,
        preserveScroll: !0,
        preserveState: !0,
        onError(...g) {
          c == null || c(...g), p(...g);
        },
        onStart(...g) {
          f == null || f(...g);
        },
        onSuccess(...g) {
          d == null || d(...g);
        },
        onBefore: () => {
          De.value[v] = u;
        }
      });
    f == null || f();
    const O = (g) => {
      try {
        Fe.progress && g(Fe.progress);
      } catch {
      }
    };
    O((g) => g.start()), ve({ url: y, method: e, data: b, headers: o }).then((g) => {
      d == null || d(g), u(Ye(g.data, r, a, s));
    }).catch((...g) => {
      c == null || c(...g), p(...g);
    }).finally(() => {
      O((g) => g.finish());
    });
  });
}
function Nt(t) {
  var n, o;
  const e = (o = (n = t.response) == null ? void 0 : n.meta) == null ? void 0 : o.deferredProps;
  e && Object.keys(e).forEach((r) => {
    t.reload({ only: e[r] });
  });
}
function $e(t, e, n, o, r) {
  const a = new Tt(t, e, n, o, r);
  return D.value.push(a), Nt(a), K(() => a.show()), a;
}
const Ut = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], _o = (t, e) => (e.resolveComponent && (he = e.resolveComponent), () => Y(Lt, () => Y(t, e)));
function ie() {
  return {
    setComponentResolver: kt,
    getBaseUrl: () => se.value,
    setBaseUrl: (t) => se.value = t,
    stack: vt(D),
    push: $e,
    pushFromResponseData: Ye,
    closeAll: () => [...D.value].reverse().forEach((t) => t.close()),
    reset: () => D.value = [],
    visit: Rt,
    registerLocalModal: Ft,
    removeLocalModal: (t) => delete ye.value[t],
    onModalOnBase(t) {
      const e = De.value[t.id];
      e && (e(t), delete De.value[t.id]);
    }
  };
}
function Do() {
  return L(le("modalContext", null));
}
const Ao = {
  __name: "Deferred",
  props: {
    data: {
      type: [String, Array],
      required: !0
    }
  },
  setup(t) {
    const e = t, n = le("modalContext");
    if (!n)
      throw new Error("Deferred component must be used inside a Modal component");
    const o = A(() => (Array.isArray(e.data) ? e.data : [e.data]).every((a) => n.value.props[a] !== void 0));
    return (r, a) => o.value ? E(r.$slots, "default", { key: 0 }) : E(r.$slots, "fallback", { key: 1 });
  }
}, Wt = /* @__PURE__ */ Object.assign({
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
    const o = t, r = ie(), a = o.name ? x({}) : le("modalContext"), s = A(() => {
      var p;
      const u = ((p = a.value.config) == null ? void 0 : p.slideover) ?? o.slideover ?? Be("type") === "slideover";
      return {
        slideover: u,
        closeButton: o.closeButton ?? z(u, "closeButton"),
        closeExplicitly: o.closeExplicitly ?? z(u, "closeExplicitly"),
        maxWidth: o.maxWidth ?? z(u, "maxWidth"),
        paddingClasses: o.paddingClasses ?? z(u, "paddingClasses"),
        panelClasses: o.panelClasses ?? z(u, "panelClasses"),
        position: o.position ?? z(u, "position"),
        ...a.value.config
      };
    });
    o.name && (r.registerLocalModal(o.name, function(u) {
      a.value = u, f();
    }), me(() => {
      r.removeLocalModal(o.name);
    })), te(() => {
      o.name || f();
    });
    const l = x(null);
    me(() => {
      var u;
      return (u = l.value) == null ? void 0 : u.call(l);
    });
    const i = Ke();
    function f() {
      l.value = a.value.registerEventListenersFromAttrs(i);
    }
    const d = n;
    function c(u, ...p) {
      d("modal-event", u, ...p);
    }
    e({
      emit: c,
      afterLeave: () => {
        var u;
        return (u = a.value) == null ? void 0 : u.afterLeave();
      },
      close: () => {
        var u;
        return (u = a.value) == null ? void 0 : u.close();
      },
      reload: (...u) => {
        var p;
        return (p = a.value) == null ? void 0 : p.reload(...u);
      },
      setOpen: (...u) => {
        var p;
        return (p = a.value) == null ? void 0 : p.setOpen(...u);
      },
      getChildModal: () => {
        var u;
        return (u = a.value) == null ? void 0 : u.getChildModal();
      },
      getParentModal: () => {
        var u;
        return (u = a.value) == null ? void 0 : u.getParentModal();
      },
      get config() {
        var u;
        return (u = a.value) == null ? void 0 : u.config;
      },
      get id() {
        var u;
        return (u = a.value) == null ? void 0 : u.id;
      },
      get index() {
        var u;
        return (u = a.value) == null ? void 0 : u.index;
      },
      get isOpen() {
        var u;
        return (u = a.value) == null ? void 0 : u.isOpen;
      },
      get modalContext() {
        var u;
        return (u = a.value) == null ? void 0 : u.modalContext;
      },
      get onTopOfStack() {
        var u;
        return (u = a.value) == null ? void 0 : u.onTopOfStack;
      },
      get shouldRender() {
        var u;
        return (u = a.value) == null ? void 0 : u.shouldRender;
      }
    }), P(
      () => {
        var u;
        return (u = a.value) == null ? void 0 : u.onTopOfStack;
      },
      (u, p) => {
        u && !p ? d("focus") : !u && p && d("blur");
      }
    ), P(
      () => {
        var u;
        return (u = a.value) == null ? void 0 : u.isOpen;
      },
      (u) => {
        d(u ? "success" : "close");
      },
      { immediate: !0 }
    );
    const v = A(() => {
      var u;
      return (u = r.stack.value.find((p) => p.shouldRender && p.index > a.value.index)) == null ? void 0 : u.index;
    });
    return (u, p) => (w(), H(Se, null, [
      m(a).shouldRender ? E(u.$slots, "default", {
        key: 0,
        id: m(a).id,
        afterLeave: m(a).afterLeave,
        close: m(a).close,
        config: s.value,
        emit: c,
        getChildModal: m(a).getChildModal,
        getParentModal: m(a).getParentModal,
        index: m(a).index,
        isOpen: m(a).isOpen,
        modalContext: m(a),
        onTopOfStack: m(a).onTopOfStack,
        reload: m(a).reload,
        setOpen: m(a).setOpen,
        shouldRender: m(a).shouldRender
      }) : F("", !0),
      v.value ? (w(), _(Je, {
        key: 1,
        index: v.value
      }, null, 8, ["index"])) : F("", !0)
    ], 64));
  }
});
function Ze(t, e) {
  const n = typeof t == "string" && !e ? `${t}Context` : e, o = Symbol(n);
  return [(s) => {
    const l = le(o, s);
    if (l || l === null) return l;
    throw new Error(`Injection \`${o.toString()}\` not found. Component must be used within ${Array.isArray(t) ? `one of the following components: ${t.join(", ")}` : `\`${t}\``}`);
  }, (s) => (Me(o, s), s)];
}
function j() {
  let t = document.activeElement;
  if (t == null) return null;
  for (; t != null && t.shadowRoot != null && t.shadowRoot.activeElement != null; ) t = t.shadowRoot.activeElement;
  return t;
}
function Qe(t, e, n) {
  const o = n.originalEvent.target, r = new CustomEvent(t, {
    bubbles: !1,
    cancelable: !0,
    detail: n
  });
  e && o.addEventListener(t, e, { once: !0 }), o.dispatchEvent(r);
}
function Le(t) {
  return t ? t.flatMap((e) => e.type === Se ? Le(e.children) : [e]) : [];
}
const [et] = Ze("ConfigProvider");
function tt(t) {
  return gt() ? (ht(t), !0) : !1;
}
function jt(t) {
  let e = !1, n;
  const o = Ve(!0);
  return (...r) => (e || (n = o.run(() => t(...r)), e = !0), n);
}
function Kt(t) {
  let e = 0, n, o;
  const r = () => {
    e -= 1, o && e <= 0 && (o.stop(), n = void 0, o = void 0);
  };
  return (...a) => (e += 1, o || (o = Ve(!0), n = o.run(() => t(...a))), tt(r), n);
}
const X = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Vt = (t) => typeof t < "u", Ht = Object.prototype.toString, Xt = (t) => Ht.call(t) === "[object Object]", qe = /* @__PURE__ */ zt();
function zt() {
  var t, e;
  return X && ((t = window == null ? void 0 : window.navigator) == null ? void 0 : t.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((e = window == null ? void 0 : window.navigator) == null ? void 0 : e.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function Gt(t) {
  return ne();
}
function be(t) {
  return Array.isArray(t) ? t : [t];
}
function Jt(t, e) {
  Gt() && me(t, e);
}
function Yt(t, e, n) {
  return P(
    t,
    e,
    {
      ...n,
      immediate: !0
    }
  );
}
const ke = X ? window : void 0;
function xe(t) {
  var e;
  const n = L(t);
  return (e = n == null ? void 0 : n.$el) != null ? e : n;
}
function nt(...t) {
  const e = [], n = () => {
    e.forEach((l) => l()), e.length = 0;
  }, o = (l, i, f, d) => (l.addEventListener(i, f, d), () => l.removeEventListener(i, f, d)), r = A(() => {
    const l = be(L(t[0])).filter((i) => i != null);
    return l.every((i) => typeof i != "string") ? l : void 0;
  }), a = Yt(
    () => {
      var l, i;
      return [
        (i = (l = r.value) == null ? void 0 : l.map((f) => xe(f))) != null ? i : [ke].filter((f) => f != null),
        be(L(r.value ? t[1] : t[0])),
        be(m(r.value ? t[2] : t[1])),
        // @ts-expect-error - TypeScript gets the correct types, but somehow still complains
        L(r.value ? t[3] : t[2])
      ];
    },
    ([l, i, f, d]) => {
      if (n(), !(l != null && l.length) || !(i != null && i.length) || !(f != null && f.length))
        return;
      const c = Xt(d) ? { ...d } : d;
      e.push(
        ...l.flatMap(
          (v) => i.flatMap(
            (u) => f.map((p) => o(v, u, p, c))
          )
        )
      );
    },
    { flush: "post" }
  ), s = () => {
    a(), n();
  };
  return tt(n), s;
}
function Zt() {
  const t = xt(!1), e = ne();
  return e && te(() => {
    t.value = !0;
  }, e), t;
}
function Qt(t) {
  return typeof t == "function" ? t : typeof t == "string" ? (e) => e.key === t : Array.isArray(t) ? (e) => t.includes(e.key) : () => !0;
}
function en(...t) {
  let e, n, o = {};
  t.length === 3 ? (e = t[0], n = t[1], o = t[2]) : t.length === 2 ? typeof t[1] == "object" ? (e = !0, n = t[0], o = t[1]) : (e = t[0], n = t[1]) : (e = !0, n = t[0]);
  const {
    target: r = ke,
    eventName: a = "keydown",
    passive: s = !1,
    dedupe: l = !1
  } = o, i = Qt(e);
  return nt(r, a, (d) => {
    d.repeat && L(l) || i(d) && n(d);
  }, s);
}
function tn(t) {
  return JSON.parse(JSON.stringify(t));
}
function nn(t, e, n, o = {}) {
  var r, a, s;
  const {
    clone: l = !1,
    passive: i = !1,
    eventName: f,
    deep: d = !1,
    defaultValue: c,
    shouldEmit: v
  } = o, u = ne(), p = n || (u == null ? void 0 : u.emit) || ((r = u == null ? void 0 : u.$emit) == null ? void 0 : r.bind(u)) || ((s = (a = u == null ? void 0 : u.proxy) == null ? void 0 : a.$emit) == null ? void 0 : s.bind(u == null ? void 0 : u.proxy));
  let y = f;
  y = y || `update:${e.toString()}`;
  const b = (g) => l ? typeof l == "function" ? l(g) : tn(g) : g, h = () => Vt(t[e]) ? b(t[e]) : c, O = (g) => {
    v ? v(g) && p(y, g) : p(y, g);
  };
  if (i) {
    const g = h(), $ = x(g);
    let T = !1;
    return P(
      () => t[e],
      (B) => {
        T || (T = !0, $.value = b(B), K(() => T = !1));
      }
    ), P(
      $,
      (B) => {
        !T && (B !== t[e] || d) && O(B);
      },
      { deep: d }
    ), $;
  } else
    return A({
      get() {
        return h();
      },
      set(g) {
        O(g);
      }
    });
}
function we(t) {
  if (t === null || typeof t != "object")
    return !1;
  const e = Object.getPrototypeOf(t);
  return e !== null && e !== Object.prototype && Object.getPrototypeOf(e) !== null || Symbol.iterator in t ? !1 : Symbol.toStringTag in t ? Object.prototype.toString.call(t) === "[object Module]" : !0;
}
function Ae(t, e, n = ".", o) {
  if (!we(e))
    return Ae(t, {}, n, o);
  const r = Object.assign({}, e);
  for (const a in t) {
    if (a === "__proto__" || a === "constructor")
      continue;
    const s = t[a];
    s != null && (o && o(r, a, s, n) || (Array.isArray(s) && Array.isArray(r[a]) ? r[a] = [...s, ...r[a]] : we(s) && we(r[a]) ? r[a] = Ae(
      s,
      r[a],
      (n ? `${n}.` : "") + a.toString(),
      o
    ) : r[a] = s));
  }
  return r;
}
function on(t) {
  return (...e) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    e.reduce((n, o) => Ae(n, o, "", t), {})
  );
}
const an = on(), rn = Kt(() => {
  const t = x(/* @__PURE__ */ new Map()), e = x(), n = A(() => {
    for (const s of t.value.values()) if (s) return !0;
    return !1;
  }), o = et({ scrollBody: x(!0) });
  let r = null;
  const a = () => {
    document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.documentElement.style.removeProperty("--scrollbar-width"), document.body.style.overflow = e.value ?? "", qe && (r == null || r()), e.value = void 0;
  };
  return P(n, (s, l) => {
    var c;
    if (!X) return;
    if (!s) {
      l && a();
      return;
    }
    e.value === void 0 && (e.value = document.body.style.overflow);
    const i = window.innerWidth - document.documentElement.clientWidth, f = {
      padding: i,
      margin: 0
    }, d = (c = o.scrollBody) != null && c.value ? typeof o.scrollBody.value == "object" ? an({
      padding: o.scrollBody.value.padding === !0 ? i : o.scrollBody.value.padding,
      margin: o.scrollBody.value.margin === !0 ? i : o.scrollBody.value.margin
    }, f) : f : {
      padding: 0,
      margin: 0
    };
    i > 0 && (document.body.style.paddingRight = typeof d.padding == "number" ? `${d.padding}px` : String(d.padding), document.body.style.marginRight = typeof d.margin == "number" ? `${d.margin}px` : String(d.margin), document.documentElement.style.setProperty("--scrollbar-width", `${i}px`), document.body.style.overflow = "hidden"), qe && (r = nt(document, "touchmove", (v) => ln(v), { passive: !1 })), K(() => {
      document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden";
    });
  }, {
    immediate: !0,
    flush: "sync"
  }), t;
});
function sn(t) {
  const e = Math.random().toString(36).substring(2, 7), n = rn();
  n.value.set(e, t);
  const o = A({
    get: () => n.value.get(e) ?? !1,
    set: (r) => n.value.set(e, r)
  });
  return Jt(() => {
    n.value.delete(e);
  }), o;
}
function ot(t) {
  const e = window.getComputedStyle(t);
  if (e.overflowX === "scroll" || e.overflowY === "scroll" || e.overflowX === "auto" && t.clientWidth < t.scrollWidth || e.overflowY === "auto" && t.clientHeight < t.scrollHeight) return !0;
  {
    const n = t.parentNode;
    return !(n instanceof Element) || n.tagName === "BODY" ? !1 : ot(n);
  }
}
function ln(t) {
  const e = t || window.event, n = e.target;
  return n instanceof Element && ot(n) ? !1 : e.touches.length > 1 ? !0 : (e.preventDefault && e.cancelable && e.preventDefault(), !1);
}
function Te(t) {
  const e = ne(), n = e == null ? void 0 : e.type.emits, o = {};
  return n != null && n.length || console.warn(`No emitted event found. Please check component: ${e == null ? void 0 : e.type.__name}`), n == null || n.forEach((r) => {
    o[bt(wt(r))] = (...a) => t(r, ...a);
  }), o;
}
function q() {
  const t = ne(), e = x(), n = A(() => {
    var s, l;
    return ["#text", "#comment"].includes((s = e.value) == null ? void 0 : s.$el.nodeName) ? (l = e.value) == null ? void 0 : l.$el.nextElementSibling : xe(e);
  }), o = Object.assign({}, t.exposed), r = {};
  for (const s in t.props) Object.defineProperty(r, s, {
    enumerable: !0,
    configurable: !0,
    get: () => t.props[s]
  });
  if (Object.keys(o).length > 0) for (const s in o) Object.defineProperty(r, s, {
    enumerable: !0,
    configurable: !0,
    get: () => o[s]
  });
  Object.defineProperty(r, "$el", {
    enumerable: !0,
    configurable: !0,
    get: () => t.vnode.el
  }), t.exposed = r;
  function a(s) {
    e.value = s, s && (Object.defineProperty(r, "$el", {
      enumerable: !0,
      configurable: !0,
      get: () => s instanceof Element ? s : s.$el
    }), t.exposed = r);
  }
  return {
    forwardRef: a,
    currentRef: e,
    currentElement: n
  };
}
var un = function(t) {
  if (typeof document > "u")
    return null;
  var e = Array.isArray(t) ? t[0] : t;
  return e.ownerDocument.body;
}, G = /* @__PURE__ */ new WeakMap(), ce = /* @__PURE__ */ new WeakMap(), fe = {}, Ce = 0, at = function(t) {
  return t && (t.host || at(t.parentNode));
}, dn = function(t, e) {
  return e.map(function(n) {
    if (t.contains(n))
      return n;
    var o = at(n);
    return o && t.contains(o) ? o : (console.error("aria-hidden", n, "in not contained inside", t, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, cn = function(t, e, n, o) {
  var r = dn(e, Array.isArray(t) ? t : [t]);
  fe[n] || (fe[n] = /* @__PURE__ */ new WeakMap());
  var a = fe[n], s = [], l = /* @__PURE__ */ new Set(), i = new Set(r), f = function(c) {
    !c || l.has(c) || (l.add(c), f(c.parentNode));
  };
  r.forEach(f);
  var d = function(c) {
    !c || i.has(c) || Array.prototype.forEach.call(c.children, function(v) {
      if (l.has(v))
        d(v);
      else
        try {
          var u = v.getAttribute(o), p = u !== null && u !== "false", y = (G.get(v) || 0) + 1, b = (a.get(v) || 0) + 1;
          G.set(v, y), a.set(v, b), s.push(v), y === 1 && p && ce.set(v, !0), b === 1 && v.setAttribute(n, "true"), p || v.setAttribute(o, "true");
        } catch (h) {
          console.error("aria-hidden: cannot operate on ", v, h);
        }
    });
  };
  return d(e), l.clear(), Ce++, function() {
    s.forEach(function(c) {
      var v = G.get(c) - 1, u = a.get(c) - 1;
      G.set(c, v), a.set(c, u), v || (ce.has(c) || c.removeAttribute(o), ce.delete(c)), u || c.removeAttribute(n);
    }), Ce--, Ce || (G = /* @__PURE__ */ new WeakMap(), G = /* @__PURE__ */ new WeakMap(), ce = /* @__PURE__ */ new WeakMap(), fe = {});
  };
}, fn = function(t, e, n) {
  n === void 0 && (n = "data-aria-hidden");
  var o = Array.from(Array.isArray(t) ? t : [t]), r = un(t);
  return r ? (o.push.apply(o, Array.from(r.querySelectorAll("[aria-live], script"))), cn(o, r, n, "aria-hidden")) : function() {
    return null;
  };
};
function pn(t) {
  let e;
  P(() => xe(t), (n) => {
    n ? e = fn(n) : e && e();
  }), U(() => {
    e && e();
  });
}
let mn = 0;
function Re(t, e = "reka") {
  var o;
  if ("useId" in ue) return `${e}-${(o = ue.useId) == null ? void 0 : o.call(ue)}`;
  const n = et({ useId: void 0 });
  return n.useId ? `${e}-${n.useId()}` : `${e}-${++mn}`;
}
function vn(t, e) {
  const n = x(t);
  function o(a) {
    return e[n.value][a] ?? n.value;
  }
  return {
    state: n,
    dispatch: (a) => {
      n.value = o(a);
    }
  };
}
function yn(t, e) {
  var b;
  const n = x({}), o = x("none"), r = x(t), a = t.value ? "mounted" : "unmounted";
  let s;
  const l = ((b = e.value) == null ? void 0 : b.ownerDocument.defaultView) ?? ke, { state: i, dispatch: f } = vn(a, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: { MOUNT: "mounted" }
  }), d = (h) => {
    var O;
    if (X) {
      const g = new CustomEvent(h, {
        bubbles: !1,
        cancelable: !1
      });
      (O = e.value) == null || O.dispatchEvent(g);
    }
  };
  P(t, async (h, O) => {
    var $;
    const g = O !== h;
    if (await K(), g) {
      const T = o.value, B = pe(e.value);
      h ? (f("MOUNT"), d("enter"), B === "none" && d("after-enter")) : B === "none" || B === "undefined" || (($ = n.value) == null ? void 0 : $.display) === "none" ? (f("UNMOUNT"), d("leave"), d("after-leave")) : O && T !== B ? (f("ANIMATION_OUT"), d("leave")) : (f("UNMOUNT"), d("after-leave"));
    }
  }, { immediate: !0 });
  const c = (h) => {
    const O = pe(e.value), g = O.includes(h.animationName), $ = i.value === "mounted" ? "enter" : "leave";
    if (h.target === e.value && g && (d(`after-${$}`), f("ANIMATION_END"), !r.value)) {
      const T = e.value.style.animationFillMode;
      e.value.style.animationFillMode = "forwards", s = l == null ? void 0 : l.setTimeout(() => {
        var B;
        ((B = e.value) == null ? void 0 : B.style.animationFillMode) === "forwards" && (e.value.style.animationFillMode = T);
      });
    }
    h.target === e.value && O === "none" && f("ANIMATION_END");
  }, v = (h) => {
    h.target === e.value && (o.value = pe(e.value));
  }, u = P(e, (h, O) => {
    h ? (n.value = getComputedStyle(h), h.addEventListener("animationstart", v), h.addEventListener("animationcancel", c), h.addEventListener("animationend", c)) : (f("ANIMATION_END"), s !== void 0 && (l == null || l.clearTimeout(s)), O == null || O.removeEventListener("animationstart", v), O == null || O.removeEventListener("animationcancel", c), O == null || O.removeEventListener("animationend", c));
  }, { immediate: !0 }), p = P(i, () => {
    const h = pe(e.value);
    o.value = i.value === "mounted" ? h : "none";
  });
  return U(() => {
    u(), p();
  }), { isPresent: A(() => ["mounted", "unmountSuspended"].includes(i.value)) };
}
function pe(t) {
  return t && getComputedStyle(t).animationName || "none";
}
var rt = M({
  name: "Presence",
  props: {
    present: {
      type: Boolean,
      required: !0
    },
    forceMount: { type: Boolean }
  },
  slots: {},
  setup(t, { slots: e, expose: n }) {
    var f;
    const { present: o, forceMount: r } = He(t), a = x(), { isPresent: s } = yn(o, a);
    n({ present: s });
    let l = e.default({ present: s.value });
    l = Le(l || []);
    const i = ne();
    if (l && (l == null ? void 0 : l.length) > 1) {
      const d = (f = i == null ? void 0 : i.parent) != null && f.type.name ? `<${i.parent.type.name} />` : "component";
      throw new Error([
        `Detected an invalid children for \`${d}\` for  \`Presence\` component.`,
        "",
        "Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.",
        "You can apply a few solutions:",
        ["Provide a single child element so that `presence` directive attach correctly.", "Ensure the first child is an actual element instead of a raw text node or comment node."].map((c) => `  - ${c}`).join(`
`)
      ].join(`
`));
    }
    return () => r.value || o.value || s.value ? Y(e.default({ present: s.value })[0], { ref: (d) => {
      const c = xe(d);
      return typeof (c == null ? void 0 : c.hasAttribute) > "u" || (c != null && c.hasAttribute("data-reka-popper-content-wrapper") ? a.value = c.firstElementChild : a.value = c), c;
    } }) : null;
  }
});
const gn = M({
  name: "PrimitiveSlot",
  inheritAttrs: !1,
  setup(t, { attrs: e, slots: n }) {
    return () => {
      var i;
      if (!n.default) return null;
      const o = Le(n.default()), r = o.findIndex((f) => f.type !== Ct);
      if (r === -1) return o;
      const a = o[r];
      (i = a.props) == null || delete i.ref;
      const s = a.props ? k(e, a.props) : e, l = Ot({
        ...a,
        props: {}
      }, s);
      return o.length === 1 ? l : (o[r] = l, o);
    };
  }
}), hn = [
  "area",
  "img",
  "input"
], oe = M({
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
    return typeof o == "string" && hn.includes(o) ? () => Y(o, e) : o !== "template" ? () => Y(t.as, e, { default: n.default }) : () => Y(gn, e, { default: n.default });
  }
}), [V, xn] = Ze("DialogRoot");
var bn = /* @__PURE__ */ M({
  inheritAttrs: !1,
  __name: "DialogRoot",
  props: {
    open: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    defaultOpen: {
      type: Boolean,
      required: !1,
      default: !1
    },
    modal: {
      type: Boolean,
      required: !1,
      default: !0
    }
  },
  emits: ["update:open"],
  setup(t, { emit: e }) {
    const n = t, r = nn(n, "open", e, {
      defaultValue: n.defaultOpen,
      passive: n.open === void 0
    }), a = x(), s = x(), { modal: l } = He(n);
    return xn({
      open: r,
      modal: l,
      openModal: () => {
        r.value = !0;
      },
      onOpenChange: (i) => {
        r.value = i;
      },
      onOpenToggle: () => {
        r.value = !r.value;
      },
      contentId: "",
      titleId: "",
      descriptionId: "",
      triggerElement: a,
      contentElement: s
    }), (i, f) => E(i.$slots, "default", {
      open: m(r),
      close: () => r.value = !1
    });
  }
}), wn = bn, Cn = /* @__PURE__ */ M({
  __name: "DialogClose",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "button"
    }
  },
  setup(t) {
    const e = t;
    q();
    const n = V();
    return (o, r) => (w(), _(m(oe), k(e, {
      type: o.as === "button" ? "button" : void 0,
      onClick: r[0] || (r[0] = (a) => m(n).onOpenChange(!1))
    }), {
      default: C(() => [E(o.$slots, "default")]),
      _: 3
    }, 16, ["type"]));
  }
}), On = Cn;
const En = "dismissableLayer.pointerDownOutside", _n = "dismissableLayer.focusOutside";
function st(t, e) {
  const n = e.closest("[data-dismissable-layer]"), o = t.dataset.dismissableLayer === "" ? t : t.querySelector("[data-dismissable-layer]"), r = Array.from(t.ownerDocument.querySelectorAll("[data-dismissable-layer]"));
  return !!(n && (o === n || r.indexOf(o) < r.indexOf(n)));
}
function Dn(t, e, n = !0) {
  var s;
  const o = ((s = e == null ? void 0 : e.value) == null ? void 0 : s.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), r = x(!1), a = x(() => {
  });
  return ee((l) => {
    if (!X || !L(n)) return;
    const i = async (d) => {
      const c = d.target;
      if (!(!(e != null && e.value) || !c)) {
        if (st(e.value, c)) {
          r.value = !1;
          return;
        }
        if (d.target && !r.value) {
          let u = function() {
            Qe(En, t, v);
          };
          const v = { originalEvent: d };
          d.pointerType === "touch" ? (o.removeEventListener("click", a.value), a.value = u, o.addEventListener("click", a.value, { once: !0 })) : u();
        } else o.removeEventListener("click", a.value);
        r.value = !1;
      }
    }, f = window.setTimeout(() => {
      o.addEventListener("pointerdown", i);
    }, 0);
    l(() => {
      window.clearTimeout(f), o.removeEventListener("pointerdown", i), o.removeEventListener("click", a.value);
    });
  }), { onPointerDownCapture: () => {
    L(n) && (r.value = !0);
  } };
}
function An(t, e, n = !0) {
  var a;
  const o = ((a = e == null ? void 0 : e.value) == null ? void 0 : a.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), r = x(!1);
  return ee((s) => {
    if (!X || !L(n)) return;
    const l = async (i) => {
      if (!(e != null && e.value)) return;
      await K(), await K();
      const f = i.target;
      !e.value || !f || st(e.value, f) || i.target && !r.value && Qe(_n, t, { originalEvent: i });
    };
    o.addEventListener("focusin", l), s(() => o.removeEventListener("focusin", l));
  }), {
    onFocusCapture: () => {
      L(n) && (r.value = !0);
    },
    onBlurCapture: () => {
      L(n) && (r.value = !1);
    }
  };
}
const R = Xe({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
});
var Mn = /* @__PURE__ */ M({
  __name: "DismissableLayer",
  props: {
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1,
      default: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "dismiss"
  ],
  setup(t, { emit: e }) {
    const n = t, o = e, { forwardRef: r, currentElement: a } = q(), s = A(() => {
      var p;
      return ((p = a.value) == null ? void 0 : p.ownerDocument) ?? globalThis.document;
    }), l = A(() => R.layersRoot), i = A(() => a.value ? Array.from(l.value).indexOf(a.value) : -1), f = A(() => R.layersWithOutsidePointerEventsDisabled.size > 0), d = A(() => {
      const p = Array.from(l.value), [y] = [...R.layersWithOutsidePointerEventsDisabled].slice(-1), b = p.indexOf(y);
      return i.value >= b;
    }), c = Dn(async (p) => {
      const y = [...R.branches].some((b) => b == null ? void 0 : b.contains(p.target));
      !d.value || y || (o("pointerDownOutside", p), o("interactOutside", p), await K(), p.defaultPrevented || o("dismiss"));
    }, a), v = An((p) => {
      [...R.branches].some((b) => b == null ? void 0 : b.contains(p.target)) || (o("focusOutside", p), o("interactOutside", p), p.defaultPrevented || o("dismiss"));
    }, a);
    en("Escape", (p) => {
      i.value === l.value.size - 1 && (o("escapeKeyDown", p), p.defaultPrevented || o("dismiss"));
    });
    let u;
    return ee((p) => {
      a.value && (n.disableOutsidePointerEvents && (R.layersWithOutsidePointerEventsDisabled.size === 0 && (u = s.value.body.style.pointerEvents, s.value.body.style.pointerEvents = "none"), R.layersWithOutsidePointerEventsDisabled.add(a.value)), l.value.add(a.value), p(() => {
        n.disableOutsidePointerEvents && R.layersWithOutsidePointerEventsDisabled.size === 1 && (s.value.body.style.pointerEvents = u);
      }));
    }), ee((p) => {
      p(() => {
        a.value && (l.value.delete(a.value), R.layersWithOutsidePointerEventsDisabled.delete(a.value));
      });
    }), (p, y) => (w(), _(m(oe), {
      ref: m(r),
      "as-child": p.asChild,
      as: p.as,
      "data-dismissable-layer": "",
      style: Et({ pointerEvents: f.value ? d.value ? "auto" : "none" : void 0 }),
      onFocusCapture: m(v).onFocusCapture,
      onBlurCapture: m(v).onBlurCapture,
      onPointerdownCapture: m(c).onPointerDownCapture
    }, {
      default: C(() => [E(p.$slots, "default")]),
      _: 3
    }, 8, [
      "as-child",
      "as",
      "style",
      "onFocusCapture",
      "onBlurCapture",
      "onPointerdownCapture"
    ]));
  }
}), Sn = Mn;
const In = jt(() => x([]));
function Pn() {
  const t = In();
  return {
    add(e) {
      const n = t.value[0];
      e !== n && (n == null || n.pause()), t.value = Ne(t.value, e), t.value.unshift(e);
    },
    remove(e) {
      var n;
      t.value = Ne(t.value, e), (n = t.value[0]) == null || n.resume();
    }
  };
}
function Ne(t, e) {
  const n = [...t], o = n.indexOf(e);
  return o !== -1 && n.splice(o, 1), n;
}
function Bn(t) {
  return t.filter((e) => e.tagName !== "A");
}
const Oe = "focusScope.autoFocusOnMount", Ee = "focusScope.autoFocusOnUnmount", Ue = {
  bubbles: !1,
  cancelable: !0
};
function $n(t, { select: e = !1 } = {}) {
  const n = j();
  for (const o of t)
    if (N(o, { select: e }), j() !== n) return !0;
}
function Ln(t) {
  const e = lt(t), n = We(e, t), o = We(e.reverse(), t);
  return [n, o];
}
function lt(t) {
  const e = [], n = document.createTreeWalker(t, NodeFilter.SHOW_ELEMENT, { acceptNode: (o) => {
    const r = o.tagName === "INPUT" && o.type === "hidden";
    return o.disabled || o.hidden || r ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
  } });
  for (; n.nextNode(); ) e.push(n.currentNode);
  return e;
}
function We(t, e) {
  for (const n of t) if (!kn(n, { upTo: e })) return n;
}
function kn(t, { upTo: e }) {
  if (getComputedStyle(t).visibility === "hidden") return !0;
  for (; t; ) {
    if (e !== void 0 && t === e) return !1;
    if (getComputedStyle(t).display === "none") return !0;
    t = t.parentElement;
  }
  return !1;
}
function Tn(t) {
  return t instanceof HTMLInputElement && "select" in t;
}
function N(t, { select: e = !1 } = {}) {
  if (t && t.focus) {
    const n = j();
    t.focus({ preventScroll: !0 }), t !== n && Tn(t) && e && t.select();
  }
}
var Fn = /* @__PURE__ */ M({
  __name: "FocusScope",
  props: {
    loop: {
      type: Boolean,
      required: !1,
      default: !1
    },
    trapped: {
      type: Boolean,
      required: !1,
      default: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: ["mountAutoFocus", "unmountAutoFocus"],
  setup(t, { emit: e }) {
    const n = t, o = e, { currentRef: r, currentElement: a } = q(), s = x(null), l = Pn(), i = Xe({
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    });
    ee((d) => {
      if (!X) return;
      const c = a.value;
      if (!n.trapped) return;
      function v(b) {
        if (i.paused || !c) return;
        const h = b.target;
        c.contains(h) ? s.value = h : N(s.value, { select: !0 });
      }
      function u(b) {
        if (i.paused || !c) return;
        const h = b.relatedTarget;
        h !== null && (c.contains(h) || N(s.value, { select: !0 }));
      }
      function p(b) {
        c.contains(s.value) || N(c);
      }
      document.addEventListener("focusin", v), document.addEventListener("focusout", u);
      const y = new MutationObserver(p);
      c && y.observe(c, {
        childList: !0,
        subtree: !0
      }), d(() => {
        document.removeEventListener("focusin", v), document.removeEventListener("focusout", u), y.disconnect();
      });
    }), ee(async (d) => {
      const c = a.value;
      if (await K(), !c) return;
      l.add(i);
      const v = j();
      if (!c.contains(v)) {
        const p = new CustomEvent(Oe, Ue);
        c.addEventListener(Oe, (y) => o("mountAutoFocus", y)), c.dispatchEvent(p), p.defaultPrevented || ($n(Bn(lt(c)), { select: !0 }), j() === v && N(c));
      }
      d(() => {
        c.removeEventListener(Oe, (b) => o("mountAutoFocus", b));
        const p = new CustomEvent(Ee, Ue), y = (b) => {
          o("unmountAutoFocus", b);
        };
        c.addEventListener(Ee, y), c.dispatchEvent(p), setTimeout(() => {
          p.defaultPrevented || N(v ?? document.body, { select: !0 }), c.removeEventListener(Ee, y), l.remove(i);
        }, 0);
      });
    });
    function f(d) {
      if (!n.loop && !n.trapped || i.paused) return;
      const c = d.key === "Tab" && !d.altKey && !d.ctrlKey && !d.metaKey, v = j();
      if (c && v) {
        const u = d.currentTarget, [p, y] = Ln(u);
        p && y ? !d.shiftKey && v === y ? (d.preventDefault(), n.loop && N(p, { select: !0 })) : d.shiftKey && v === p && (d.preventDefault(), n.loop && N(y, { select: !0 })) : v === u && d.preventDefault();
      }
    }
    return (d, c) => (w(), _(m(oe), {
      ref_key: "currentRef",
      ref: r,
      tabindex: "-1",
      "as-child": d.asChild,
      as: d.as,
      onKeydown: f
    }, {
      default: C(() => [E(d.$slots, "default")]),
      _: 3
    }, 8, ["as-child", "as"]));
  }
}), qn = Fn;
function Rn(t) {
  return t ? "open" : "closed";
}
const Nn = "DialogTitle", Un = "DialogContent";
function Wn({ titleName: t = Nn, contentName: e = Un, componentLink: n = "dialog.html#title", titleId: o, descriptionId: r, contentElement: a }) {
  const s = `Warning: \`${e}\` requires a \`${t}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://www.reka-ui.com/docs/components/${n}`, l = `Warning: Missing \`Description\` or \`aria-describedby="undefined"\` for ${e}.`;
  te(() => {
    var d;
    document.getElementById(o) || console.warn(s);
    const f = (d = a.value) == null ? void 0 : d.getAttribute("aria-describedby");
    r && f && (document.getElementById(r) || console.warn(l));
  });
}
var jn = /* @__PURE__ */ M({
  __name: "DialogContentImpl",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    trapFocus: {
      type: Boolean,
      required: !1
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(t, { emit: e }) {
    const n = t, o = e, r = V(), { forwardRef: a, currentElement: s } = q();
    return r.titleId || (r.titleId = Re(void 0, "reka-dialog-title")), r.descriptionId || (r.descriptionId = Re(void 0, "reka-dialog-description")), te(() => {
      r.contentElement = s, j() !== document.body && (r.triggerElement.value = j());
    }), process.env.NODE_ENV !== "production" && Wn({
      titleName: "DialogTitle",
      contentName: "DialogContent",
      componentLink: "dialog.html#title",
      titleId: r.titleId,
      descriptionId: r.descriptionId,
      contentElement: s
    }), (l, i) => (w(), _(m(qn), {
      "as-child": "",
      loop: "",
      trapped: n.trapFocus,
      onMountAutoFocus: i[5] || (i[5] = (f) => o("openAutoFocus", f)),
      onUnmountAutoFocus: i[6] || (i[6] = (f) => o("closeAutoFocus", f))
    }, {
      default: C(() => [S(m(Sn), k({
        id: m(r).contentId,
        ref: m(a),
        as: l.as,
        "as-child": l.asChild,
        "disable-outside-pointer-events": l.disableOutsidePointerEvents,
        role: "dialog",
        "aria-describedby": m(r).descriptionId,
        "aria-labelledby": m(r).titleId,
        "data-state": m(Rn)(m(r).open.value)
      }, l.$attrs, {
        onDismiss: i[0] || (i[0] = (f) => m(r).onOpenChange(!1)),
        onEscapeKeyDown: i[1] || (i[1] = (f) => o("escapeKeyDown", f)),
        onFocusOutside: i[2] || (i[2] = (f) => o("focusOutside", f)),
        onInteractOutside: i[3] || (i[3] = (f) => o("interactOutside", f)),
        onPointerDownOutside: i[4] || (i[4] = (f) => o("pointerDownOutside", f))
      }), {
        default: C(() => [E(l.$slots, "default")]),
        _: 3
      }, 16, [
        "id",
        "as",
        "as-child",
        "disable-outside-pointer-events",
        "aria-describedby",
        "aria-labelledby",
        "data-state"
      ])]),
      _: 3
    }, 8, ["trapped"]));
  }
}), it = jn, Kn = /* @__PURE__ */ M({
  __name: "DialogContentModal",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    trapFocus: {
      type: Boolean,
      required: !1
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(t, { emit: e }) {
    const n = t, o = e, r = V(), a = Te(o), { forwardRef: s, currentElement: l } = q();
    return pn(l), (i, f) => (w(), _(it, k({
      ...n,
      ...m(a)
    }, {
      ref: m(s),
      "trap-focus": m(r).open.value,
      "disable-outside-pointer-events": !0,
      onCloseAutoFocus: f[0] || (f[0] = (d) => {
        var c;
        d.defaultPrevented || (d.preventDefault(), (c = m(r).triggerElement.value) == null || c.focus());
      }),
      onPointerDownOutside: f[1] || (f[1] = (d) => {
        const c = d.detail.originalEvent, v = c.button === 0 && c.ctrlKey === !0;
        (c.button === 2 || v) && d.preventDefault();
      }),
      onFocusOutside: f[2] || (f[2] = (d) => {
        d.preventDefault();
      })
    }), {
      default: C(() => [E(i.$slots, "default")]),
      _: 3
    }, 16, ["trap-focus"]));
  }
}), Vn = Kn, Hn = /* @__PURE__ */ M({
  __name: "DialogContentNonModal",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    trapFocus: {
      type: Boolean,
      required: !1
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(t, { emit: e }) {
    const n = t, r = Te(e);
    q();
    const a = V(), s = x(!1), l = x(!1);
    return (i, f) => (w(), _(it, k({
      ...n,
      ...m(r)
    }, {
      "trap-focus": !1,
      "disable-outside-pointer-events": !1,
      onCloseAutoFocus: f[0] || (f[0] = (d) => {
        var c;
        d.defaultPrevented || (s.value || (c = m(a).triggerElement.value) == null || c.focus(), d.preventDefault()), s.value = !1, l.value = !1;
      }),
      onInteractOutside: f[1] || (f[1] = (d) => {
        var u;
        d.defaultPrevented || (s.value = !0, d.detail.originalEvent.type === "pointerdown" && (l.value = !0));
        const c = d.target;
        ((u = m(a).triggerElement.value) == null ? void 0 : u.contains(c)) && d.preventDefault(), d.detail.originalEvent.type === "focusin" && l.value && d.preventDefault();
      })
    }), {
      default: C(() => [E(i.$slots, "default")]),
      _: 3
    }, 16));
  }
}), Xn = Hn, zn = /* @__PURE__ */ M({
  __name: "DialogContent",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(t, { emit: e }) {
    const n = t, o = e, r = V(), a = Te(o), { forwardRef: s } = q();
    return (l, i) => (w(), _(m(rt), { present: l.forceMount || m(r).open.value }, {
      default: C(() => [m(r).modal.value ? (w(), _(Vn, k({
        key: 0,
        ref: m(s)
      }, {
        ...n,
        ...m(a),
        ...l.$attrs
      }), {
        default: C(() => [E(l.$slots, "default")]),
        _: 3
      }, 16)) : (w(), _(Xn, k({
        key: 1,
        ref: m(s)
      }, {
        ...n,
        ...m(a),
        ...l.$attrs
      }), {
        default: C(() => [E(l.$slots, "default")]),
        _: 3
      }, 16))]),
      _: 3
    }, 8, ["present"]));
  }
}), ut = zn, Gn = /* @__PURE__ */ M({
  __name: "DialogOverlayImpl",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(t) {
    const e = V();
    return sn(!0), q(), (n, o) => (w(), _(m(oe), {
      as: n.as,
      "as-child": n.asChild,
      "data-state": m(e).open.value ? "open" : "closed",
      style: { "pointer-events": "auto" }
    }, {
      default: C(() => [E(n.$slots, "default")]),
      _: 3
    }, 8, [
      "as",
      "as-child",
      "data-state"
    ]));
  }
}), Jn = Gn, Yn = /* @__PURE__ */ M({
  __name: "DialogOverlay",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(t) {
    const e = V(), { forwardRef: n } = q();
    return (o, r) => {
      var a;
      return (a = m(e)) != null && a.modal.value ? (w(), _(m(rt), {
        key: 0,
        present: o.forceMount || m(e).open.value
      }, {
        default: C(() => [S(Jn, k(o.$attrs, {
          ref: m(n),
          as: o.as,
          "as-child": o.asChild
        }), {
          default: C(() => [E(o.$slots, "default")]),
          _: 3
        }, 16, ["as", "as-child"])]),
        _: 3
      }, 8, ["present"])) : F("v-if", !0);
    };
  }
}), Zn = Yn, Qn = /* @__PURE__ */ M({
  __name: "Teleport",
  props: {
    to: {
      type: null,
      required: !1,
      default: "body"
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    defer: {
      type: Boolean,
      required: !1
    },
    forceMount: {
      type: Boolean,
      required: !1
    }
  },
  setup(t) {
    const e = Zt();
    return (n, o) => m(e) || n.forceMount ? (w(), _(_t, {
      key: 0,
      to: n.to,
      disabled: n.disabled,
      defer: n.defer
    }, [E(n.$slots, "default")], 8, [
      "to",
      "disabled",
      "defer"
    ])) : F("v-if", !0);
  }
}), eo = Qn, to = /* @__PURE__ */ M({
  __name: "DialogPortal",
  props: {
    to: {
      type: null,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    defer: {
      type: Boolean,
      required: !1
    },
    forceMount: {
      type: Boolean,
      required: !1
    }
  },
  setup(t) {
    const e = t;
    return (n, o) => (w(), _(m(eo), Dt(At(e)), {
      default: C(() => [E(n.$slots, "default")]),
      _: 3
    }, 16));
  }
}), no = to, oo = /* @__PURE__ */ M({
  __name: "DialogTitle",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "h2"
    }
  },
  setup(t) {
    const e = t, n = V();
    return q(), (o, r) => (w(), _(m(oe), k(e, { id: m(n).titleId }), {
      default: C(() => [E(o.$slots, "default")]),
      _: 3
    }, 16, ["id"]));
  }
}), dt = oo, ao = /* @__PURE__ */ M({
  __name: "VisuallyHidden",
  props: {
    feature: {
      type: String,
      required: !1,
      default: "focusable"
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "span"
    }
  },
  setup(t) {
    return (e, n) => (w(), _(m(oe), {
      as: e.as,
      "as-child": e.asChild,
      "aria-hidden": e.feature === "focusable" ? "true" : void 0,
      "data-hidden": e.feature === "fully-hidden" ? "" : void 0,
      tabindex: e.feature === "fully-hidden" ? "-1" : void 0,
      style: {
        position: "absolute",
        border: 0,
        width: "1px",
        height: "1px",
        padding: 0,
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        clipPath: "inset(50%)",
        whiteSpace: "nowrap",
        wordWrap: "normal"
      }
    }, {
      default: C(() => [E(e.$slots, "default")]),
      _: 3
    }, 8, [
      "as",
      "as-child",
      "aria-hidden",
      "data-hidden",
      "tabindex"
    ]));
  }
}), ct = ao;
const ft = {
  __name: "CloseButton",
  setup(t) {
    return (e, n) => (w(), _(m(On), { class: "im-close-button text-gray-400 hover:text-gray-500" }, {
      default: C(() => [...n[0] || (n[0] = [
        W("span", { class: "sr-only" }, "Close", -1),
        W("svg", {
          class: "size-6",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "2",
          stroke: "currentColor",
          "aria-hidden": "true"
        }, [
          W("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M6 18L18 6M6 6l12 12"
          })
        ], -1)
      ])]),
      _: 1
    }));
  }
}, ro = { class: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4" }, so = ["data-inertiaui-modal-entered"], lo = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, io = {
  __name: "ModalContent",
  props: {
    modalContext: Object,
    config: Object
  },
  setup(t) {
    const e = x(!1);
    return (n, o) => (w(), H("div", ro, [
      W("div", {
        class: Z(["im-modal-positioner flex min-h-full justify-center", {
          "items-start": t.config.position === "top",
          "items-center": t.config.position === "center",
          "items-end": t.config.position === "bottom"
        }])
      }, [
        S(Ie, {
          appear: "",
          "enter-from-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          "enter-to-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-from-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-to-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          onAfterEnter: o[2] || (o[2] = (r) => e.value = !0),
          onAfterLeave: t.modalContext.afterLeave
        }, {
          default: C(() => [
            S(m(ut), {
              "aria-describedby": void 0,
              class: Z({
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
              onEscapeKeyDown: o[0] || (o[0] = (r) => {
                var a;
                return ((a = t.config) == null ? void 0 : a.closeExplicitly) && r.preventDefault();
              }),
              onInteractOutside: o[1] || (o[1] = (r) => {
                var a;
                return ((a = t.config) == null ? void 0 : a.closeExplicitly) && r.preventDefault();
              })
            }, {
              default: C(() => [
                S(m(ct), { "as-child": "" }, {
                  default: C(() => [
                    S(m(dt))
                  ]),
                  _: 1
                }),
                W("div", {
                  class: Z(["im-modal-content relative", [t.config.paddingClasses, t.config.panelClasses]]),
                  "data-inertiaui-modal-entered": e.value
                }, [
                  t.config.closeButton ? (w(), H("div", lo, [
                    S(ft)
                  ])) : F("", !0),
                  E(n.$slots, "default", {
                    modalContext: t.modalContext,
                    config: t.config
                  })
                ], 10, so)
              ]),
              _: 3
            }, 8, ["class"])
          ]),
          _: 3
        }, 8, ["onAfterLeave"])
      ], 2)
    ]));
  }
}, uo = { class: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden" }, co = ["data-inertiaui-modal-entered"], fo = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, po = {
  __name: "SlideoverContent",
  props: {
    modalContext: Object,
    config: Object
  },
  setup(t) {
    const e = x(!1);
    return (n, o) => (w(), H("div", uo, [
      W("div", {
        class: Z(["im-slideover-positioner flex min-h-full items-center", {
          "justify-start rtl:justify-end": t.config.position === "left",
          "justify-end rtl:justify-start": t.config.position === "right"
        }])
      }, [
        S(Ie, {
          appear: "",
          "enter-from-class": "opacity-0 " + (t.config.position === "left" ? "-translate-x-full" : "translate-x-full"),
          "enter-to-class": "opacity-100 translate-x-0",
          "leave-from-class": "opacity-100 translate-x-0",
          "leave-to-class": "opacity-0 " + (t.config.position === "left" ? "-translate-x-full" : "translate-x-full"),
          onAfterEnter: o[2] || (o[2] = (r) => e.value = !0),
          onAfterLeave: t.modalContext.afterLeave
        }, {
          default: C(() => [
            S(m(ut), {
              "aria-describedby": void 0,
              class: Z({
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
              onEscapeKeyDown: o[0] || (o[0] = (r) => {
                var a;
                return ((a = t.config) == null ? void 0 : a.closeExplicitly) && r.preventDefault();
              }),
              onInteractOutside: o[1] || (o[1] = (r) => {
                var a;
                return ((a = t.config) == null ? void 0 : a.closeExplicitly) && r.preventDefault();
              })
            }, {
              default: C(() => [
                S(m(ct), { "as-child": "" }, {
                  default: C(() => [
                    S(m(dt))
                  ]),
                  _: 1
                }),
                W("div", {
                  class: Z(["im-slideover-content relative", [t.config.paddingClasses, t.config.panelClasses]]),
                  "data-inertiaui-modal-entered": e.value
                }, [
                  t.config.closeButton ? (w(), H("div", fo, [
                    S(ft)
                  ])) : F("", !0),
                  E(n.$slots, "default", {
                    modalContext: t.modalContext,
                    config: t.config
                  })
                ], 10, co)
              ]),
              _: 3
            }, 8, ["class"])
          ]),
          _: 3
        }, 8, ["enter-from-class", "leave-to-class", "onAfterLeave"])
      ], 2)
    ]));
  }
}, mo = ["data-inertiaui-modal-id", "data-inertiaui-modal-index", "aria-hidden"], vo = {
  key: 1,
  class: "im-backdrop fixed inset-0 z-30 bg-black/75"
}, Mo = {
  __name: "Modal",
  emits: ["after-leave", "blur", "close", "focus", "success"],
  setup(t, { expose: e }) {
    const n = x(null), o = x(!1);
    e({
      afterLeave: () => {
        var a;
        return (a = n.value) == null ? void 0 : a.afterLeave();
      },
      close: () => {
        var a;
        return (a = n.value) == null ? void 0 : a.close();
      },
      emit: (...a) => {
        var s;
        return (s = n.value) == null ? void 0 : s.emit(...a);
      },
      getChildModal: () => {
        var a;
        return (a = n.value) == null ? void 0 : a.getChildModal();
      },
      getParentModal: () => {
        var a;
        return (a = n.value) == null ? void 0 : a.getParentModal();
      },
      reload: (...a) => {
        var s;
        return (s = n.value) == null ? void 0 : s.reload(...a);
      },
      setOpen: (...a) => {
        var s;
        return (s = n.value) == null ? void 0 : s.setOpen(...a);
      },
      get config() {
        var a;
        return (a = n.value) == null ? void 0 : a.config;
      },
      get id() {
        var a;
        return (a = n.value) == null ? void 0 : a.id;
      },
      get index() {
        var a;
        return (a = n.value) == null ? void 0 : a.index;
      },
      get isOpen() {
        var a;
        return (a = n.value) == null ? void 0 : a.isOpen;
      },
      get modalContext() {
        var a;
        return (a = n.value) == null ? void 0 : a.modalContext;
      },
      get onTopOfStack() {
        var a;
        return (a = n.value) == null ? void 0 : a.onTopOfStack;
      },
      get shouldRender() {
        var a;
        return (a = n.value) == null ? void 0 : a.shouldRender;
      }
    });
    let r;
    return je(() => {
      r = new MutationObserver(() => {
        document.body.style.pointerEvents === "none" && (document.body.style.pointerEvents = "");
      }), r.observe(document.body, { attributes: !0, attributeFilter: ["style"] });
    }), U(() => {
      r && (r.disconnect(), r = null);
    }), (a, s) => (w(), _(Wt, {
      ref_key: "modal",
      ref: n,
      onSuccess: s[2] || (s[2] = (l) => a.$emit("success")),
      onClose: s[3] || (s[3] = (l) => a.$emit("close")),
      onFocus: s[4] || (s[4] = (l) => a.$emit("focus")),
      onBlur: s[5] || (s[5] = (l) => a.$emit("blur"))
    }, {
      default: C(({
        afterLeave: l,
        close: i,
        config: f,
        emit: d,
        getChildModal: c,
        getParentModal: v,
        id: u,
        index: p,
        isOpen: y,
        modalContext: b,
        onTopOfStack: h,
        reload: O,
        setOpen: g,
        shouldRender: $
      }) => [
        S(m(wn), {
          open: y,
          "onUpdate:open": g
        }, {
          default: C(() => [
            S(m(no), null, {
              default: C(() => [
                W("div", {
                  "data-inertiaui-modal-id": u,
                  "data-inertiaui-modal-index": p,
                  class: "im-dialog relative z-20",
                  "aria-hidden": !h
                }, [
                  p === 0 && h ? (w(), _(Ie, {
                    key: 0,
                    appear: !o.value,
                    "enter-active-class": "transition transform ease-in-out duration-300",
                    "enter-from-class": "opacity-0",
                    "enter-to-class": "opacity-100",
                    "leave-active-class": "transition transform ease-in-out duration-300",
                    "leave-from-class": "opacity-100",
                    "leave-to-class": "opacity-0",
                    onAfterAppear: s[0] || (s[0] = (T) => o.value = !0)
                  }, {
                    default: C(() => [
                      S(m(Zn), { class: "im-backdrop fixed inset-0 z-30 bg-black/75" })
                    ]),
                    _: 1
                  }, 8, ["appear"])) : F("", !0),
                  p > 0 && h ? (w(), H("div", vo)) : F("", !0),
                  (w(), _(Pe(f != null && f.slideover ? po : io), {
                    "modal-context": b,
                    config: f,
                    onAfterLeave: s[1] || (s[1] = (T) => a.$emit("after-leave"))
                  }, {
                    default: C(() => [
                      E(a.$slots, "default", {
                        id: u,
                        afterLeave: l,
                        close: i,
                        config: f,
                        emit: d,
                        getChildModal: c,
                        getParentModal: v,
                        index: p,
                        isOpen: y,
                        modalContext: b,
                        onTopOfStack: h,
                        reload: O,
                        setOpen: g,
                        shouldRender: $
                      })
                    ]),
                    _: 2
                  }, 1064, ["modal-context", "config"]))
                ], 8, mo)
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
}, So = {
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
    const n = t, o = x(!1), r = ie(), a = x(null);
    Me("modalContext", a);
    const s = e, l = x(!1), i = A(() => n.navigate ?? Be("navigate"));
    P(
      () => {
        var y;
        return (y = a.value) == null ? void 0 : y.onTopOfStack;
      },
      (y) => {
        a.value && (y && l.value ? s("focus") : y || s("blur"), l.value = !y);
      }
    );
    const f = x(null);
    me(() => {
      var y;
      (y = f.value) == null || y.call(f);
    });
    const d = Ke();
    function c() {
      f.value = a.value.registerEventListenersFromAttrs(d);
    }
    P(a, (y, b) => {
      y && !b && (c(), s("success"));
    });
    function v() {
      s("close");
    }
    function u() {
      a.value = null, s("after-leave");
    }
    function p() {
      o.value || (n.href.startsWith("#") || (o.value = !0, s("start")), r.visit(
        n.href,
        n.method,
        n.data,
        n.headers,
        $t(Ge(n, Ut)),
        v,
        u,
        n.queryStringArrayFormat,
        i.value
      ).then((y) => {
        a.value = y;
      }).catch((y) => s("error", y)).finally(() => o.value = !1));
    }
    return (y, b) => (w(), _(Pe(t.as), k(m(d), {
      href: t.href,
      onClick: Mt(p, ["prevent"])
    }), {
      default: C(() => [
        E(y.$slots, "default", { loading: o.value })
      ]),
      _: 3
    }, 16, ["href"]));
  }
}, Io = {
  __name: "WhenVisible",
  props: {
    data: [String, Array],
    params: Object,
    buffer: { type: Number, default: 0 },
    as: { type: String, default: "div" },
    always: { type: Boolean, default: !1 }
  },
  setup(t) {
    const e = t, n = le("modalContext");
    if (!n)
      throw new Error("Deferred component must be used inside a Modal component");
    const o = x(!1), r = x(!1), a = x(null);
    let s = null;
    const l = () => {
      if (e.data)
        return { only: Array.isArray(e.data) ? e.data : [e.data] };
      if (!e.params)
        throw new Error("You must provide either a `data` or `params` prop.");
      return e.params;
    };
    return te(() => {
      a.value && (s = new IntersectionObserver(
        (f) => {
          if (!f[0].isIntersecting || (e.always || s.disconnect(), r.value))
            return;
          r.value = !0;
          const d = l();
          n.value.reload({
            ...d,
            onStart: () => {
              var c;
              r.value = !0, (c = d.onStart) == null || c.call(d);
            },
            onFinish: () => {
              var c;
              o.value = !0, r.value = !1, (c = d.onFinish) == null || c.call(d);
            }
          });
        },
        { rootMargin: `${e.buffer}px` }
      ), s.observe(a.value));
    }), U(() => s == null ? void 0 : s.disconnect()), (f, d) => (w(), _(Pe(e.as), {
      ref_key: "rootElement",
      ref: a
    }, {
      default: C(() => [
        o.value ? E(f.$slots, "default", { key: 0 }) : E(f.$slots, "fallback", { key: 1 })
      ]),
      _: 3
    }, 512));
  }
};
function Po(t, e = {}) {
  return ie().visit(
    t,
    e.method ?? "get",
    e.data ?? {},
    e.headers ?? {},
    e.config ?? {},
    e.onClose,
    e.onAfterLeave,
    e.queryStringArrayFormat ?? "brackets",
    e.navigate ?? Be("navigate"),
    e.onStart,
    e.onSuccess,
    e.onError
  ).then((n) => {
    const o = e.listeners ?? {};
    return Object.keys(o).forEach((r) => {
      const a = r.replace(/([A-Z])/g, "-$1").toLowerCase();
      n.on(a, o[r]);
    }), n;
  });
}
export {
  Ao as Deferred,
  Wt as HeadlessModal,
  Mo as Modal,
  So as ModalLink,
  Lt as ModalRoot,
  Io as WhenVisible,
  Be as getConfig,
  Eo as initFromPageProps,
  Oo as putConfig,
  _o as renderApp,
  Co as resetConfig,
  Do as useModal,
  ie as useModalStack,
  Po as visitModal
};
