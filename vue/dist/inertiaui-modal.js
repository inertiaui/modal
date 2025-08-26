var ft = Object.defineProperty;
var pt = (t, e, n) => e in t ? ft(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var I = (t, e, n) => pt(t, typeof e != "symbol" ? e + "" : e, n);
import * as ue from "vue";
import { computed as A, provide as Me, createBlock as E, createCommentVNode as F, openBlock as w, unref as m, mergeProps as L, onUnmounted as U, onBeforeMount as We, onMounted as te, watch as P, createElementBlock as H, Fragment as Se, renderSlot as O, ref as h, h as Y, readonly as mt, markRaw as vt, nextTick as K, toValue as $, inject as le, onBeforeUnmount as me, useAttrs as je, effectScope as Ke, getCurrentScope as yt, onScopeDispose as gt, getCurrentInstance as ne, shallowRef as ht, toHandlerKey as xt, camelize as bt, defineComponent as M, toRefs as Ve, Comment as wt, cloneVNode as Ct, withCtx as C, watchEffect as ee, reactive as He, normalizeStyle as Ot, createVNode as S, Teleport as Et, normalizeProps as _t, guardReactiveProps as Dt, createElementVNode as W, normalizeClass as Z, Transition as Ie, resolveDynamicComponent as Pe, withModifiers as At } from "vue";
import { usePage as Xe, router as re } from "@inertiajs/vue3";
import { mergeDataIntoQueryString as Mt } from "@inertiajs/core";
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
class St {
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
const ge = new St(), wo = () => ge.reset(), Co = (t, e) => ge.put(t, e), Be = (t) => ge.get(t), z = (t, e) => ge.get(t ? `slideover.${e}` : `modal.${e}`);
function It(t, e) {
  const n = typeof window < "u" ? window.location.origin : "http://localhost";
  return t = typeof t == "string" ? new URL(t, n) : t, e = typeof e == "string" ? new URL(e, n) : e, `${t.origin}${t.pathname}` == `${e.origin}${e.pathname}`;
}
function _e(t = "inertiaui_modal_") {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `${t}${crypto.randomUUID()}` : `${t}${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
}
function Q(t) {
  return typeof t == "string" ? t.toLowerCase() : t;
}
function Pt(t, e, n = !1) {
  return n && (e = e.map(Q)), Array.isArray(t) ? t.filter((o) => !e.includes(n ? Q(o) : o)) : Object.keys(t).reduce((o, r) => (e.includes(n ? Q(r) : r) || (o[r] = t[r]), o), {});
}
function ze(t, e, n = !1) {
  return n && (e = e.map(Q)), Array.isArray(t) ? t.filter((o) => e.includes(n ? Q(o) : o)) : Object.keys(t).reduce((o, r) => (e.includes(n ? Q(r) : r) && (o[r] = t[r]), o), {});
}
function Bt(t) {
  return Array.isArray(t) ? t.filter((e) => e !== null) : Object.keys(t).reduce((e, n) => (n in t && t[n] !== null && (e[n] = t[n]), e), {});
}
function de(t) {
  return t ? (t = t.replace(/_/g, "-"), t = t.replace(/-+/g, "-"), /[A-Z]/.test(t) ? (t = t.replace(/\s+/g, "").replace(/_/g, "").replace(/(?:^|\s|-)+([A-Za-z])/g, (e, n) => n.toUpperCase()), t = t.replace(/(.)(?=[A-Z])/g, "$1-"), t.toLowerCase()) : t) : "";
}
const Ge = {
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
      return (s = o.value) != null && s.component ? (w(), E(m(o).component, L({ key: 0 }, m(ze)(o.value.props ?? {}, o.value.getComponentPropKeys(), !0), {
        onModalEvent: a[0] || (a[0] = (l, ...i) => o.value.emit(l, ...i))
      }), null, 16)) : F("", !0);
    };
  }
}, $t = {
  __name: "ModalRoot",
  setup(t) {
    const e = ie(), n = Xe();
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
    return We(() => ve.interceptors.request.use(s)), te(() => a = !!n.props._inertiaui_modal), U(() => ve.interceptors.request.eject(s)), P(
      () => {
        var l;
        return (l = n.props) == null ? void 0 : l._inertiaui_modal;
      },
      (l, i) => {
        var f;
        l && i && l.component === i.component && It(l.url, i.url) && ((f = e.stack.value[0]) == null || f.updateProps(l.props ?? {}));
      }
    ), (l, i) => (w(), H(Se, null, [
      O(l.$slots, "default"),
      m(e).stack.value.length ? (w(), E(Ge, {
        key: 0,
        index: 0
      })) : F("", !0)
    ], 64));
  }
};
let he = null;
const J = h({}), se = h(null), De = h({}), D = h([]), ye = h({}), Lt = (t) => {
  he = t;
}, Oo = (t) => {
  t.resolveComponent && (he = t.resolveComponent);
};
class kt {
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
      if (e.only && (n = e.only), e.except && (n = Pt(n, e.except)), !((a = this.response) != null && a.url))
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
    if (this.id = n.id ?? _e(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = e, this.props = h(n.props), this.response = n, this.config = o ?? {}, this.onCloseCallback = r, this.afterLeaveCallback = a, J.value[this.id]) {
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
function Tt(t, e) {
  ye.value[t] = { name: t, callback: e };
}
function Ft(t, e, n, o) {
  if (!ye.value[t])
    throw new Error(`The local modal "${t}" has not been registered.`);
  const r = $e(null, {}, e, n, o);
  return r.name = t, ye.value[t].callback(r), r;
}
function Je(t, e = {}, n = null, o = null) {
  return he(t.component).then((r) => $e(vt(r), t, e, n, o));
}
function qt(t, e, n = {}, o = {}, r = {}, a = null, s = null, l = "brackets", i = !1, f = null, d = null, c = null) {
  const v = _e();
  return new Promise((u, p) => {
    if (t.startsWith("#")) {
      u(Ft(t.substring(1), r, a, s));
      return;
    }
    const [y, x] = Mt(e, t || "", n, l);
    let g = i && D.value.length === 0;
    if (D.value.length === 0 && (se.value = typeof window < "u" ? window.location.href : ""), o = {
      ...o,
      Accept: "text/html, application/xhtml+xml",
      "X-Requested-With": "XMLHttpRequest",
      "X-Inertia": !0,
      "X-Inertia-Version": Xe().version,
      "X-InertiaUI-Modal": v,
      "X-InertiaUI-Modal-Use-Router": g ? 1 : 0,
      "X-InertiaUI-Modal-Base-Url": se.value
    }, g)
      return J.value[v] = { config: r, onClose: a, onAfterLeave: s }, re.visit(y, {
        method: e,
        data: x,
        headers: o,
        preserveScroll: !0,
        preserveState: !0,
        onError(...b) {
          c == null || c(...b), p(...b);
        },
        onStart(...b) {
          f == null || f(...b);
        },
        onSuccess(...b) {
          d == null || d(...b);
        },
        onBefore: () => {
          De.value[v] = u;
        }
      });
    f == null || f(), ve({ url: y, method: e, data: x, headers: o }).then((b) => {
      d == null || d(b), u(Je(b.data, r, a, s));
    }).catch((...b) => {
      c == null || c(...b), p(...b);
    });
  });
}
function Rt(t) {
  var n, o;
  const e = (o = (n = t.response) == null ? void 0 : n.meta) == null ? void 0 : o.deferredProps;
  e && Object.keys(e).forEach((r) => {
    t.reload({ only: e[r] });
  });
}
function $e(t, e, n, o, r) {
  const a = new kt(t, e, n, o, r);
  return D.value.push(a), Rt(a), K(() => a.show()), a;
}
const Nt = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], Eo = (t, e) => (e.resolveComponent && (he = e.resolveComponent), () => Y($t, () => Y(t, e)));
function ie() {
  return {
    setComponentResolver: Lt,
    getBaseUrl: () => se.value,
    setBaseUrl: (t) => se.value = t,
    stack: mt(D),
    push: $e,
    pushFromResponseData: Je,
    closeAll: () => [...D.value].reverse().forEach((t) => t.close()),
    reset: () => D.value = [],
    visit: qt,
    registerLocalModal: Tt,
    removeLocalModal: (t) => delete ye.value[t],
    onModalOnBase(t) {
      const e = De.value[t.id];
      e && (e(t), delete De.value[t.id]);
    }
  };
}
function _o() {
  return $(le("modalContext", null));
}
const Do = {
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
    return (r, a) => o.value ? O(r.$slots, "default", { key: 0 }) : O(r.$slots, "fallback", { key: 1 });
  }
}, Ut = /* @__PURE__ */ Object.assign({
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
    const o = t, r = ie(), a = o.name ? h({}) : le("modalContext"), s = A(() => {
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
    const l = h(null);
    me(() => {
      var u;
      return (u = l.value) == null ? void 0 : u.call(l);
    });
    const i = je();
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
      m(a).shouldRender ? O(u.$slots, "default", {
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
      v.value ? (w(), E(Ge, {
        key: 1,
        index: v.value
      }, null, 8, ["index"])) : F("", !0)
    ], 64));
  }
});
function Ye(t, e) {
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
function Ze(t, e, n) {
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
const [Qe, Ao] = Ye("ConfigProvider");
function et(t) {
  return yt() ? (gt(t), !0) : !1;
}
function Wt(t) {
  let e = !1, n;
  const o = Ke(!0);
  return (...r) => (e || (n = o.run(() => t(...r)), e = !0), n);
}
function jt(t) {
  let e = 0, n, o;
  const r = () => {
    e -= 1, o && e <= 0 && (o.stop(), n = void 0, o = void 0);
  };
  return (...a) => (e += 1, o || (o = Ke(!0), n = o.run(() => t(...a))), et(r), n);
}
const X = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Kt = (t) => typeof t < "u", Vt = Object.prototype.toString, Ht = (t) => Vt.call(t) === "[object Object]", Fe = /* @__PURE__ */ Xt();
function Xt() {
  var t, e;
  return X && ((t = window == null ? void 0 : window.navigator) == null ? void 0 : t.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((e = window == null ? void 0 : window.navigator) == null ? void 0 : e.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function zt(t) {
  return ne();
}
function be(t) {
  return Array.isArray(t) ? t : [t];
}
function Gt(t, e) {
  zt() && me(t, e);
}
function Jt(t, e, n) {
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
  const n = $(t);
  return (e = n == null ? void 0 : n.$el) != null ? e : n;
}
function tt(...t) {
  const e = [], n = () => {
    e.forEach((l) => l()), e.length = 0;
  }, o = (l, i, f, d) => (l.addEventListener(i, f, d), () => l.removeEventListener(i, f, d)), r = A(() => {
    const l = be($(t[0])).filter((i) => i != null);
    return l.every((i) => typeof i != "string") ? l : void 0;
  }), a = Jt(
    () => {
      var l, i;
      return [
        (i = (l = r.value) == null ? void 0 : l.map((f) => xe(f))) != null ? i : [ke].filter((f) => f != null),
        be($(r.value ? t[1] : t[0])),
        be(m(r.value ? t[2] : t[1])),
        // @ts-expect-error - TypeScript gets the correct types, but somehow still complains
        $(r.value ? t[3] : t[2])
      ];
    },
    ([l, i, f, d]) => {
      if (n(), !(l != null && l.length) || !(i != null && i.length) || !(f != null && f.length))
        return;
      const c = Ht(d) ? { ...d } : d;
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
  return et(n), s;
}
function Yt() {
  const t = ht(!1), e = ne();
  return e && te(() => {
    t.value = !0;
  }, e), t;
}
function Zt(t) {
  return typeof t == "function" ? t : typeof t == "string" ? (e) => e.key === t : Array.isArray(t) ? (e) => t.includes(e.key) : () => !0;
}
function Qt(...t) {
  let e, n, o = {};
  t.length === 3 ? (e = t[0], n = t[1], o = t[2]) : t.length === 2 ? typeof t[1] == "object" ? (e = !0, n = t[0], o = t[1]) : (e = t[0], n = t[1]) : (e = !0, n = t[0]);
  const {
    target: r = ke,
    eventName: a = "keydown",
    passive: s = !1,
    dedupe: l = !1
  } = o, i = Zt(e);
  return tt(r, a, (d) => {
    d.repeat && $(l) || i(d) && n(d);
  }, s);
}
function en(t) {
  return JSON.parse(JSON.stringify(t));
}
function tn(t, e, n, o = {}) {
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
  const x = (_) => l ? typeof l == "function" ? l(_) : en(_) : _, g = () => Kt(t[e]) ? x(t[e]) : c, b = (_) => {
    v ? v(_) && p(y, _) : p(y, _);
  };
  if (i) {
    const _ = g(), k = h(_);
    let T = !1;
    return P(
      () => t[e],
      (B) => {
        T || (T = !0, k.value = x(B), K(() => T = !1));
      }
    ), P(
      k,
      (B) => {
        !T && (B !== t[e] || d) && b(B);
      },
      { deep: d }
    ), k;
  } else
    return A({
      get() {
        return g();
      },
      set(_) {
        b(_);
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
function nn(t) {
  return (...e) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    e.reduce((n, o) => Ae(n, o, "", t), {})
  );
}
const on = nn(), an = jt(() => {
  const t = h(/* @__PURE__ */ new Map()), e = h(), n = A(() => {
    for (const s of t.value.values()) if (s) return !0;
    return !1;
  }), o = Qe({ scrollBody: h(!0) });
  let r = null;
  const a = () => {
    document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.documentElement.style.removeProperty("--scrollbar-width"), document.body.style.overflow = e.value ?? "", Fe && (r == null || r()), e.value = void 0;
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
    }, d = (c = o.scrollBody) != null && c.value ? typeof o.scrollBody.value == "object" ? on({
      padding: o.scrollBody.value.padding === !0 ? i : o.scrollBody.value.padding,
      margin: o.scrollBody.value.margin === !0 ? i : o.scrollBody.value.margin
    }, f) : f : {
      padding: 0,
      margin: 0
    };
    i > 0 && (document.body.style.paddingRight = typeof d.padding == "number" ? `${d.padding}px` : String(d.padding), document.body.style.marginRight = typeof d.margin == "number" ? `${d.margin}px` : String(d.margin), document.documentElement.style.setProperty("--scrollbar-width", `${i}px`), document.body.style.overflow = "hidden"), Fe && (r = tt(document, "touchmove", (v) => sn(v), { passive: !1 })), K(() => {
      document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden";
    });
  }, {
    immediate: !0,
    flush: "sync"
  }), t;
});
function rn(t) {
  const e = Math.random().toString(36).substring(2, 7), n = an();
  n.value.set(e, t);
  const o = A({
    get: () => n.value.get(e) ?? !1,
    set: (r) => n.value.set(e, r)
  });
  return Gt(() => {
    n.value.delete(e);
  }), o;
}
function nt(t) {
  const e = window.getComputedStyle(t);
  if (e.overflowX === "scroll" || e.overflowY === "scroll" || e.overflowX === "auto" && t.clientWidth < t.scrollWidth || e.overflowY === "auto" && t.clientHeight < t.scrollHeight) return !0;
  {
    const n = t.parentNode;
    return !(n instanceof Element) || n.tagName === "BODY" ? !1 : nt(n);
  }
}
function sn(t) {
  const e = t || window.event, n = e.target;
  return n instanceof Element && nt(n) ? !1 : e.touches.length > 1 ? !0 : (e.preventDefault && e.cancelable && e.preventDefault(), !1);
}
function Te(t) {
  const e = ne(), n = e == null ? void 0 : e.type.emits, o = {};
  return n != null && n.length || console.warn(`No emitted event found. Please check component: ${e == null ? void 0 : e.type.__name}`), n == null || n.forEach((r) => {
    o[xt(bt(r))] = (...a) => t(r, ...a);
  }), o;
}
function q() {
  const t = ne(), e = h(), n = A(() => {
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
var ln = function(t) {
  if (typeof document > "u")
    return null;
  var e = Array.isArray(t) ? t[0] : t;
  return e.ownerDocument.body;
}, G = /* @__PURE__ */ new WeakMap(), ce = /* @__PURE__ */ new WeakMap(), fe = {}, Ce = 0, ot = function(t) {
  return t && (t.host || ot(t.parentNode));
}, un = function(t, e) {
  return e.map(function(n) {
    if (t.contains(n))
      return n;
    var o = ot(n);
    return o && t.contains(o) ? o : (console.error("aria-hidden", n, "in not contained inside", t, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, dn = function(t, e, n, o) {
  var r = un(e, Array.isArray(t) ? t : [t]);
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
          var u = v.getAttribute(o), p = u !== null && u !== "false", y = (G.get(v) || 0) + 1, x = (a.get(v) || 0) + 1;
          G.set(v, y), a.set(v, x), s.push(v), y === 1 && p && ce.set(v, !0), x === 1 && v.setAttribute(n, "true"), p || v.setAttribute(o, "true");
        } catch (g) {
          console.error("aria-hidden: cannot operate on ", v, g);
        }
    });
  };
  return d(e), l.clear(), Ce++, function() {
    s.forEach(function(c) {
      var v = G.get(c) - 1, u = a.get(c) - 1;
      G.set(c, v), a.set(c, u), v || (ce.has(c) || c.removeAttribute(o), ce.delete(c)), u || c.removeAttribute(n);
    }), Ce--, Ce || (G = /* @__PURE__ */ new WeakMap(), G = /* @__PURE__ */ new WeakMap(), ce = /* @__PURE__ */ new WeakMap(), fe = {});
  };
}, cn = function(t, e, n) {
  n === void 0 && (n = "data-aria-hidden");
  var o = Array.from(Array.isArray(t) ? t : [t]), r = ln(t);
  return r ? (o.push.apply(o, Array.from(r.querySelectorAll("[aria-live], script"))), dn(o, r, n, "aria-hidden")) : function() {
    return null;
  };
};
function fn(t) {
  let e;
  P(() => xe(t), (n) => {
    n ? e = cn(n) : e && e();
  }), U(() => {
    e && e();
  });
}
let pn = 0;
function qe(t, e = "reka") {
  var o;
  if ("useId" in ue) return `${e}-${(o = ue.useId) == null ? void 0 : o.call(ue)}`;
  const n = Qe({ useId: void 0 });
  return n.useId ? `${e}-${n.useId()}` : `${e}-${++pn}`;
}
function mn(t, e) {
  const n = h(t);
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
function vn(t, e) {
  var x;
  const n = h({}), o = h("none"), r = h(t), a = t.value ? "mounted" : "unmounted";
  let s;
  const l = ((x = e.value) == null ? void 0 : x.ownerDocument.defaultView) ?? ke, { state: i, dispatch: f } = mn(a, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: { MOUNT: "mounted" }
  }), d = (g) => {
    var b;
    if (X) {
      const _ = new CustomEvent(g, {
        bubbles: !1,
        cancelable: !1
      });
      (b = e.value) == null || b.dispatchEvent(_);
    }
  };
  P(t, async (g, b) => {
    var k;
    const _ = b !== g;
    if (await K(), _) {
      const T = o.value, B = pe(e.value);
      g ? (f("MOUNT"), d("enter"), B === "none" && d("after-enter")) : B === "none" || B === "undefined" || ((k = n.value) == null ? void 0 : k.display) === "none" ? (f("UNMOUNT"), d("leave"), d("after-leave")) : b && T !== B ? (f("ANIMATION_OUT"), d("leave")) : (f("UNMOUNT"), d("after-leave"));
    }
  }, { immediate: !0 });
  const c = (g) => {
    const b = pe(e.value), _ = b.includes(g.animationName), k = i.value === "mounted" ? "enter" : "leave";
    if (g.target === e.value && _ && (d(`after-${k}`), f("ANIMATION_END"), !r.value)) {
      const T = e.value.style.animationFillMode;
      e.value.style.animationFillMode = "forwards", s = l == null ? void 0 : l.setTimeout(() => {
        var B;
        ((B = e.value) == null ? void 0 : B.style.animationFillMode) === "forwards" && (e.value.style.animationFillMode = T);
      });
    }
    g.target === e.value && b === "none" && f("ANIMATION_END");
  }, v = (g) => {
    g.target === e.value && (o.value = pe(e.value));
  }, u = P(e, (g, b) => {
    g ? (n.value = getComputedStyle(g), g.addEventListener("animationstart", v), g.addEventListener("animationcancel", c), g.addEventListener("animationend", c)) : (f("ANIMATION_END"), s !== void 0 && (l == null || l.clearTimeout(s)), b == null || b.removeEventListener("animationstart", v), b == null || b.removeEventListener("animationcancel", c), b == null || b.removeEventListener("animationend", c));
  }, { immediate: !0 }), p = P(i, () => {
    const g = pe(e.value);
    o.value = i.value === "mounted" ? g : "none";
  });
  return U(() => {
    u(), p();
  }), { isPresent: A(() => ["mounted", "unmountSuspended"].includes(i.value)) };
}
function pe(t) {
  return t && getComputedStyle(t).animationName || "none";
}
var at = M({
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
    const { present: o, forceMount: r } = Ve(t), a = h(), { isPresent: s } = vn(o, a);
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
const yn = M({
  name: "PrimitiveSlot",
  inheritAttrs: !1,
  setup(t, { attrs: e, slots: n }) {
    return () => {
      var i;
      if (!n.default) return null;
      const o = Le(n.default()), r = o.findIndex((f) => f.type !== wt);
      if (r === -1) return o;
      const a = o[r];
      (i = a.props) == null || delete i.ref;
      const s = a.props ? L(e, a.props) : e, l = Ct({
        ...a,
        props: {}
      }, s);
      return o.length === 1 ? l : (o[r] = l, o);
    };
  }
}), gn = [
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
    return typeof o == "string" && gn.includes(o) ? () => Y(o, e) : o !== "template" ? () => Y(t.as, e, { default: n.default }) : () => Y(yn, e, { default: n.default });
  }
}), [V, hn] = Ye("DialogRoot");
var xn = /* @__PURE__ */ M({
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
    const n = t, r = tn(n, "open", e, {
      defaultValue: n.defaultOpen,
      passive: n.open === void 0
    }), a = h(), s = h(), { modal: l } = Ve(n);
    return hn({
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
    }), (i, f) => O(i.$slots, "default", {
      open: m(r),
      close: () => r.value = !1
    });
  }
}), bn = xn, wn = /* @__PURE__ */ M({
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
    return (o, r) => (w(), E(m(oe), L(e, {
      type: o.as === "button" ? "button" : void 0,
      onClick: r[0] || (r[0] = (a) => m(n).onOpenChange(!1))
    }), {
      default: C(() => [O(o.$slots, "default")]),
      _: 3
    }, 16, ["type"]));
  }
}), Cn = wn;
const On = "dismissableLayer.pointerDownOutside", En = "dismissableLayer.focusOutside";
function rt(t, e) {
  const n = e.closest("[data-dismissable-layer]"), o = t.dataset.dismissableLayer === "" ? t : t.querySelector("[data-dismissable-layer]"), r = Array.from(t.ownerDocument.querySelectorAll("[data-dismissable-layer]"));
  return !!(n && (o === n || r.indexOf(o) < r.indexOf(n)));
}
function _n(t, e, n = !0) {
  var s;
  const o = ((s = e == null ? void 0 : e.value) == null ? void 0 : s.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), r = h(!1), a = h(() => {
  });
  return ee((l) => {
    if (!X || !$(n)) return;
    const i = async (d) => {
      const c = d.target;
      if (!(!(e != null && e.value) || !c)) {
        if (rt(e.value, c)) {
          r.value = !1;
          return;
        }
        if (d.target && !r.value) {
          let u = function() {
            Ze(On, t, v);
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
    $(n) && (r.value = !0);
  } };
}
function Dn(t, e, n = !0) {
  var a;
  const o = ((a = e == null ? void 0 : e.value) == null ? void 0 : a.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), r = h(!1);
  return ee((s) => {
    if (!X || !$(n)) return;
    const l = async (i) => {
      if (!(e != null && e.value)) return;
      await K(), await K();
      const f = i.target;
      !e.value || !f || rt(e.value, f) || i.target && !r.value && Ze(En, t, { originalEvent: i });
    };
    o.addEventListener("focusin", l), s(() => o.removeEventListener("focusin", l));
  }), {
    onFocusCapture: () => {
      $(n) && (r.value = !0);
    },
    onBlurCapture: () => {
      $(n) && (r.value = !1);
    }
  };
}
const R = He({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
});
var An = /* @__PURE__ */ M({
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
      const p = Array.from(l.value), [y] = [...R.layersWithOutsidePointerEventsDisabled].slice(-1), x = p.indexOf(y);
      return i.value >= x;
    }), c = _n(async (p) => {
      const y = [...R.branches].some((x) => x == null ? void 0 : x.contains(p.target));
      !d.value || y || (o("pointerDownOutside", p), o("interactOutside", p), await K(), p.defaultPrevented || o("dismiss"));
    }, a), v = Dn((p) => {
      [...R.branches].some((x) => x == null ? void 0 : x.contains(p.target)) || (o("focusOutside", p), o("interactOutside", p), p.defaultPrevented || o("dismiss"));
    }, a);
    Qt("Escape", (p) => {
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
    }), (p, y) => (w(), E(m(oe), {
      ref: m(r),
      "as-child": p.asChild,
      as: p.as,
      "data-dismissable-layer": "",
      style: Ot({ pointerEvents: f.value ? d.value ? "auto" : "none" : void 0 }),
      onFocusCapture: m(v).onFocusCapture,
      onBlurCapture: m(v).onBlurCapture,
      onPointerdownCapture: m(c).onPointerDownCapture
    }, {
      default: C(() => [O(p.$slots, "default")]),
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
}), Mn = An;
const Sn = Wt(() => h([]));
function In() {
  const t = Sn();
  return {
    add(e) {
      const n = t.value[0];
      e !== n && (n == null || n.pause()), t.value = Re(t.value, e), t.value.unshift(e);
    },
    remove(e) {
      var n;
      t.value = Re(t.value, e), (n = t.value[0]) == null || n.resume();
    }
  };
}
function Re(t, e) {
  const n = [...t], o = n.indexOf(e);
  return o !== -1 && n.splice(o, 1), n;
}
function Pn(t) {
  return t.filter((e) => e.tagName !== "A");
}
const Oe = "focusScope.autoFocusOnMount", Ee = "focusScope.autoFocusOnUnmount", Ne = {
  bubbles: !1,
  cancelable: !0
};
function Bn(t, { select: e = !1 } = {}) {
  const n = j();
  for (const o of t)
    if (N(o, { select: e }), j() !== n) return !0;
}
function $n(t) {
  const e = st(t), n = Ue(e, t), o = Ue(e.reverse(), t);
  return [n, o];
}
function st(t) {
  const e = [], n = document.createTreeWalker(t, NodeFilter.SHOW_ELEMENT, { acceptNode: (o) => {
    const r = o.tagName === "INPUT" && o.type === "hidden";
    return o.disabled || o.hidden || r ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
  } });
  for (; n.nextNode(); ) e.push(n.currentNode);
  return e;
}
function Ue(t, e) {
  for (const n of t) if (!Ln(n, { upTo: e })) return n;
}
function Ln(t, { upTo: e }) {
  if (getComputedStyle(t).visibility === "hidden") return !0;
  for (; t; ) {
    if (e !== void 0 && t === e) return !1;
    if (getComputedStyle(t).display === "none") return !0;
    t = t.parentElement;
  }
  return !1;
}
function kn(t) {
  return t instanceof HTMLInputElement && "select" in t;
}
function N(t, { select: e = !1 } = {}) {
  if (t && t.focus) {
    const n = j();
    t.focus({ preventScroll: !0 }), t !== n && kn(t) && e && t.select();
  }
}
var Tn = /* @__PURE__ */ M({
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
    const n = t, o = e, { currentRef: r, currentElement: a } = q(), s = h(null), l = In(), i = He({
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
      function v(x) {
        if (i.paused || !c) return;
        const g = x.target;
        c.contains(g) ? s.value = g : N(s.value, { select: !0 });
      }
      function u(x) {
        if (i.paused || !c) return;
        const g = x.relatedTarget;
        g !== null && (c.contains(g) || N(s.value, { select: !0 }));
      }
      function p(x) {
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
        const p = new CustomEvent(Oe, Ne);
        c.addEventListener(Oe, (y) => o("mountAutoFocus", y)), c.dispatchEvent(p), p.defaultPrevented || (Bn(Pn(st(c)), { select: !0 }), j() === v && N(c));
      }
      d(() => {
        c.removeEventListener(Oe, (x) => o("mountAutoFocus", x));
        const p = new CustomEvent(Ee, Ne), y = (x) => {
          o("unmountAutoFocus", x);
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
        const u = d.currentTarget, [p, y] = $n(u);
        p && y ? !d.shiftKey && v === y ? (d.preventDefault(), n.loop && N(p, { select: !0 })) : d.shiftKey && v === p && (d.preventDefault(), n.loop && N(y, { select: !0 })) : v === u && d.preventDefault();
      }
    }
    return (d, c) => (w(), E(m(oe), {
      ref_key: "currentRef",
      ref: r,
      tabindex: "-1",
      "as-child": d.asChild,
      as: d.as,
      onKeydown: f
    }, {
      default: C(() => [O(d.$slots, "default")]),
      _: 3
    }, 8, ["as-child", "as"]));
  }
}), Fn = Tn;
function qn(t) {
  return t ? "open" : "closed";
}
const Rn = "DialogTitle", Nn = "DialogContent";
function Un({ titleName: t = Rn, contentName: e = Nn, componentLink: n = "dialog.html#title", titleId: o, descriptionId: r, contentElement: a }) {
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
var Wn = /* @__PURE__ */ M({
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
    return r.titleId || (r.titleId = qe(void 0, "reka-dialog-title")), r.descriptionId || (r.descriptionId = qe(void 0, "reka-dialog-description")), te(() => {
      r.contentElement = s, j() !== document.body && (r.triggerElement.value = j());
    }), process.env.NODE_ENV !== "production" && Un({
      titleName: "DialogTitle",
      contentName: "DialogContent",
      componentLink: "dialog.html#title",
      titleId: r.titleId,
      descriptionId: r.descriptionId,
      contentElement: s
    }), (l, i) => (w(), E(m(Fn), {
      "as-child": "",
      loop: "",
      trapped: n.trapFocus,
      onMountAutoFocus: i[5] || (i[5] = (f) => o("openAutoFocus", f)),
      onUnmountAutoFocus: i[6] || (i[6] = (f) => o("closeAutoFocus", f))
    }, {
      default: C(() => [S(m(Mn), L({
        id: m(r).contentId,
        ref: m(a),
        as: l.as,
        "as-child": l.asChild,
        "disable-outside-pointer-events": l.disableOutsidePointerEvents,
        role: "dialog",
        "aria-describedby": m(r).descriptionId,
        "aria-labelledby": m(r).titleId,
        "data-state": m(qn)(m(r).open.value)
      }, l.$attrs, {
        onDismiss: i[0] || (i[0] = (f) => m(r).onOpenChange(!1)),
        onEscapeKeyDown: i[1] || (i[1] = (f) => o("escapeKeyDown", f)),
        onFocusOutside: i[2] || (i[2] = (f) => o("focusOutside", f)),
        onInteractOutside: i[3] || (i[3] = (f) => o("interactOutside", f)),
        onPointerDownOutside: i[4] || (i[4] = (f) => o("pointerDownOutside", f))
      }), {
        default: C(() => [O(l.$slots, "default")]),
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
}), lt = Wn, jn = /* @__PURE__ */ M({
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
    return fn(l), (i, f) => (w(), E(lt, L({
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
      default: C(() => [O(i.$slots, "default")]),
      _: 3
    }, 16, ["trap-focus"]));
  }
}), Kn = jn, Vn = /* @__PURE__ */ M({
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
    const a = V(), s = h(!1), l = h(!1);
    return (i, f) => (w(), E(lt, L({
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
      default: C(() => [O(i.$slots, "default")]),
      _: 3
    }, 16));
  }
}), Hn = Vn, Xn = /* @__PURE__ */ M({
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
    return (l, i) => (w(), E(m(at), { present: l.forceMount || m(r).open.value }, {
      default: C(() => [m(r).modal.value ? (w(), E(Kn, L({
        key: 0,
        ref: m(s)
      }, {
        ...n,
        ...m(a),
        ...l.$attrs
      }), {
        default: C(() => [O(l.$slots, "default")]),
        _: 3
      }, 16)) : (w(), E(Hn, L({
        key: 1,
        ref: m(s)
      }, {
        ...n,
        ...m(a),
        ...l.$attrs
      }), {
        default: C(() => [O(l.$slots, "default")]),
        _: 3
      }, 16))]),
      _: 3
    }, 8, ["present"]));
  }
}), it = Xn, zn = /* @__PURE__ */ M({
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
    return rn(!0), q(), (n, o) => (w(), E(m(oe), {
      as: n.as,
      "as-child": n.asChild,
      "data-state": m(e).open.value ? "open" : "closed",
      style: { "pointer-events": "auto" }
    }, {
      default: C(() => [O(n.$slots, "default")]),
      _: 3
    }, 8, [
      "as",
      "as-child",
      "data-state"
    ]));
  }
}), Gn = zn, Jn = /* @__PURE__ */ M({
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
      return (a = m(e)) != null && a.modal.value ? (w(), E(m(at), {
        key: 0,
        present: o.forceMount || m(e).open.value
      }, {
        default: C(() => [S(Gn, L(o.$attrs, {
          ref: m(n),
          as: o.as,
          "as-child": o.asChild
        }), {
          default: C(() => [O(o.$slots, "default")]),
          _: 3
        }, 16, ["as", "as-child"])]),
        _: 3
      }, 8, ["present"])) : F("v-if", !0);
    };
  }
}), Yn = Jn, Zn = /* @__PURE__ */ M({
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
    const e = Yt();
    return (n, o) => m(e) || n.forceMount ? (w(), E(Et, {
      key: 0,
      to: n.to,
      disabled: n.disabled,
      defer: n.defer
    }, [O(n.$slots, "default")], 8, [
      "to",
      "disabled",
      "defer"
    ])) : F("v-if", !0);
  }
}), Qn = Zn, eo = /* @__PURE__ */ M({
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
    return (n, o) => (w(), E(m(Qn), _t(Dt(e)), {
      default: C(() => [O(n.$slots, "default")]),
      _: 3
    }, 16));
  }
}), to = eo, no = /* @__PURE__ */ M({
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
    return q(), (o, r) => (w(), E(m(oe), L(e, { id: m(n).titleId }), {
      default: C(() => [O(o.$slots, "default")]),
      _: 3
    }, 16, ["id"]));
  }
}), ut = no, oo = /* @__PURE__ */ M({
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
    return (e, n) => (w(), E(m(oe), {
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
      default: C(() => [O(e.$slots, "default")]),
      _: 3
    }, 8, [
      "as",
      "as-child",
      "aria-hidden",
      "data-hidden",
      "tabindex"
    ]));
  }
}), dt = oo;
const ct = {
  __name: "CloseButton",
  setup(t) {
    return (e, n) => (w(), E(m(Cn), { class: "im-close-button text-gray-400 hover:text-gray-500" }, {
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
}, ao = { class: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4" }, ro = ["data-inertiaui-modal-entered"], so = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, lo = {
  __name: "ModalContent",
  props: {
    modalContext: Object,
    config: Object
  },
  setup(t) {
    const e = h(!1);
    return (n, o) => (w(), H("div", ao, [
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
            S(m(it), {
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
                S(m(dt), { "as-child": "" }, {
                  default: C(() => [
                    S(m(ut))
                  ]),
                  _: 1
                }),
                W("div", {
                  class: Z(["im-modal-content relative", [t.config.paddingClasses, t.config.panelClasses]]),
                  "data-inertiaui-modal-entered": e.value
                }, [
                  t.config.closeButton ? (w(), H("div", so, [
                    S(ct)
                  ])) : F("", !0),
                  O(n.$slots, "default", {
                    modalContext: t.modalContext,
                    config: t.config
                  })
                ], 10, ro)
              ]),
              _: 3
            }, 8, ["class"])
          ]),
          _: 3
        }, 8, ["onAfterLeave"])
      ], 2)
    ]));
  }
}, io = { class: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden" }, uo = ["data-inertiaui-modal-entered"], co = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, fo = {
  __name: "SlideoverContent",
  props: {
    modalContext: Object,
    config: Object
  },
  setup(t) {
    const e = h(!1);
    return (n, o) => (w(), H("div", io, [
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
            S(m(it), {
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
                S(m(dt), { "as-child": "" }, {
                  default: C(() => [
                    S(m(ut))
                  ]),
                  _: 1
                }),
                W("div", {
                  class: Z(["im-slideover-content relative", [t.config.paddingClasses, t.config.panelClasses]]),
                  "data-inertiaui-modal-entered": e.value
                }, [
                  t.config.closeButton ? (w(), H("div", co, [
                    S(ct)
                  ])) : F("", !0),
                  O(n.$slots, "default", {
                    modalContext: t.modalContext,
                    config: t.config
                  })
                ], 10, uo)
              ]),
              _: 3
            }, 8, ["class"])
          ]),
          _: 3
        }, 8, ["enter-from-class", "leave-to-class", "onAfterLeave"])
      ], 2)
    ]));
  }
}, po = ["data-inertiaui-modal-id", "data-inertiaui-modal-index", "aria-hidden"], mo = {
  key: 1,
  class: "im-backdrop fixed inset-0 z-30 bg-black/75"
}, Mo = {
  __name: "Modal",
  emits: ["after-leave", "blur", "close", "focus", "success"],
  setup(t, { expose: e }) {
    const n = h(null), o = h(!1);
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
    return We(() => {
      r = new MutationObserver(() => {
        document.body.style.pointerEvents === "none" && (document.body.style.pointerEvents = "");
      }), r.observe(document.body, { attributes: !0, attributeFilter: ["style"] });
    }), U(() => {
      r && (r.disconnect(), r = null);
    }), (a, s) => (w(), E(Ut, {
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
        modalContext: x,
        onTopOfStack: g,
        reload: b,
        setOpen: _,
        shouldRender: k
      }) => [
        S(m(bn), {
          open: y,
          "onUpdate:open": _
        }, {
          default: C(() => [
            S(m(to), null, {
              default: C(() => [
                W("div", {
                  "data-inertiaui-modal-id": u,
                  "data-inertiaui-modal-index": p,
                  class: "im-dialog relative z-20",
                  "aria-hidden": !g
                }, [
                  p === 0 && g ? (w(), E(Ie, {
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
                      S(m(Yn), { class: "im-backdrop fixed inset-0 z-30 bg-black/75" })
                    ]),
                    _: 1
                  }, 8, ["appear"])) : F("", !0),
                  p > 0 && g ? (w(), H("div", mo)) : F("", !0),
                  (w(), E(Pe(f != null && f.slideover ? fo : lo), {
                    "modal-context": x,
                    config: f,
                    onAfterLeave: s[1] || (s[1] = (T) => a.$emit("after-leave"))
                  }, {
                    default: C(() => [
                      O(a.$slots, "default", {
                        id: u,
                        afterLeave: l,
                        close: i,
                        config: f,
                        emit: d,
                        getChildModal: c,
                        getParentModal: v,
                        index: p,
                        isOpen: y,
                        modalContext: x,
                        onTopOfStack: g,
                        reload: b,
                        setOpen: _,
                        shouldRender: k
                      })
                    ]),
                    _: 2
                  }, 1064, ["modal-context", "config"]))
                ], 8, po)
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
    const n = t, o = h(!1), r = ie(), a = h(null);
    Me("modalContext", a);
    const s = e, l = h(!1), i = A(() => n.navigate ?? Be("navigate"));
    P(
      () => {
        var y;
        return (y = a.value) == null ? void 0 : y.onTopOfStack;
      },
      (y) => {
        a.value && (y && l.value ? s("focus") : y || s("blur"), l.value = !y);
      }
    );
    const f = h(null);
    me(() => {
      var y;
      (y = f.value) == null || y.call(f);
    });
    const d = je();
    function c() {
      f.value = a.value.registerEventListenersFromAttrs(d);
    }
    P(a, (y, x) => {
      y && !x && (c(), s("success"));
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
        Bt(ze(n, Nt)),
        v,
        u,
        n.queryStringArrayFormat,
        i.value
      ).then((y) => {
        a.value = y;
      }).catch((y) => s("error", y)).finally(() => o.value = !1));
    }
    return (y, x) => (w(), E(Pe(t.as), L(m(d), {
      href: t.href,
      onClick: At(p, ["prevent"])
    }), {
      default: C(() => [
        O(y.$slots, "default", { loading: o.value })
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
    const o = h(!1), r = h(!1), a = h(null);
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
    }), U(() => s == null ? void 0 : s.disconnect()), (f, d) => (w(), E(Pe(e.as), {
      ref_key: "rootElement",
      ref: a
    }, {
      default: C(() => [
        o.value ? O(f.$slots, "default", { key: 0 }) : O(f.$slots, "fallback", { key: 1 })
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
  Do as Deferred,
  Ut as HeadlessModal,
  Mo as Modal,
  So as ModalLink,
  $t as ModalRoot,
  Io as WhenVisible,
  Be as getConfig,
  Oo as initFromPageProps,
  Co as putConfig,
  Eo as renderApp,
  wo as resetConfig,
  _o as useModal,
  ie as useModalStack,
  Po as visitModal
};
