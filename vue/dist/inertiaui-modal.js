var ft = Object.defineProperty;
var mt = (t, e, n) => e in t ? ft(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var I = (t, e, n) => mt(t, typeof e != "symbol" ? e + "" : e, n);
import * as ue from "vue";
import { computed as D, provide as $e, createBlock as C, createCommentVNode as R, openBlock as b, unref as p, mergeProps as k, onUnmounted as j, onBeforeMount as _e, onMounted as te, watch as P, createElementBlock as X, Fragment as Me, renderSlot as E, ref as y, h as Y, readonly as pt, markRaw as vt, nextTick as q, toValue as L, inject as ie, onBeforeUnmount as pe, useAttrs as Ke, defineComponent as $, Comment as ht, cloneVNode as yt, withCtx as w, effectScope as qe, getCurrentScope as gt, onScopeDispose as xt, getCurrentInstance as ne, shallowRef as bt, toRefs as Ve, toHandlerKey as wt, camelize as Et, reactive as Xe, watchEffect as ee, normalizeStyle as Ct, createVNode as M, Teleport as Ot, normalizeProps as At, guardReactiveProps as St, createElementVNode as _, normalizeClass as Z, Transition as Ie, resolveDynamicComponent as Pe, withModifiers as Dt } from "vue";
import { usePage as ze, router as se } from "@inertiajs/vue3";
import { mergeDataIntoQueryString as $t } from "@inertiajs/core";
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
class Mt {
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
    let s = this.config;
    for (let a = 0; a < o.length - 1; a++)
      s = s[o[a]] = s[o[a]] || {};
    s[o[o.length - 1]] = n;
  }
  get(e) {
    if (typeof e > "u")
      return this.config;
    const n = e.split(".");
    let o = this.config;
    for (const s of n) {
      if (o[s] === void 0)
        return null;
      o = o[s];
    }
    return o;
  }
}
const ye = new Mt(), ro = () => ye.reset(), io = (t, e) => ye.put(t, e), Be = (t) => ye.get(t), H = (t, e) => ye.get(t ? `slideover.${e}` : `modal.${e}`);
function It(t, e) {
  return t = typeof t == "string" ? new URL(t, window.location.origin) : t, e = typeof e == "string" ? new URL(e, window.location.origin) : e, `${t.origin}${t.pathname}` == `${e.origin}${e.pathname}`;
}
function Ae(t = "inertiaui_modal_") {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `${t}${crypto.randomUUID()}` : `${t}${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
}
function Q(t) {
  return typeof t == "string" ? t.toLowerCase() : t;
}
function Pt(t, e, n = !1) {
  return n && (e = e.map(Q)), Array.isArray(t) ? t.filter((o) => !e.includes(n ? Q(o) : o)) : Object.keys(t).reduce((o, s) => (e.includes(n ? Q(s) : s) || (o[s] = t[s]), o), {});
}
function He(t, e, n = !1) {
  return n && (e = e.map(Q)), Array.isArray(t) ? t.filter((o) => e.includes(n ? Q(o) : o)) : Object.keys(t).reduce((o, s) => (e.includes(n ? Q(s) : s) && (o[s] = t[s]), o), {});
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
    const e = t, n = le(), o = D(() => n.stack.value[e.index]);
    return $e("modalContext", o), (s, a) => {
      var r;
      return (r = o.value) != null && r.component ? (b(), C(p(o).component, k({ key: 0 }, p(He)(o.value.props ?? {}, o.value.getComponentPropKeys(), !0), {
        onModalEvent: a[0] || (a[0] = (i, ...l) => o.value.emit(i, ...l))
      }), null, 16)) : R("", !0);
    };
  }
}, Lt = {
  __name: "ModalRoot",
  setup(t) {
    const e = le(), n = ze();
    let o = !1, s = null, a = !1;
    j(se.on("start", () => o = !0)), j(se.on("finish", () => o = !1)), j(
      se.on("navigate", (i) => {
        const l = i.detail.page.props._inertiaui_modal;
        if (!l) {
          s && e.closeAll(), e.setBaseUrl(null), a = !1;
          return;
        }
        s = l, e.setBaseUrl(l.baseUrl), e.pushFromResponseData(l, {}, () => {
          if (!l.baseUrl) {
            console.error("No base url in modal response data so cannot navigate back");
            return;
          }
          !o && window.location.href !== l.baseUrl && se.visit(l.baseUrl, {
            preserveScroll: !0,
            preserveState: !0
          });
        }).then(e.onModalOnBase);
      })
    );
    const r = (i) => {
      var l;
      return i.headers["X-InertiaUI-Modal-Base-Url"] = e.getBaseUrl() ?? (a ? (l = n.props._inertiaui_modal) == null ? void 0 : l.baseUrl : null), i;
    };
    return _e(() => ve.interceptors.request.use(r)), te(() => a = !!n.props._inertiaui_modal), j(() => ve.interceptors.request.eject(r)), P(
      () => {
        var i;
        return (i = n.props) == null ? void 0 : i._inertiaui_modal;
      },
      (i, l) => {
        var f;
        i && l && i.component === l.component && It(i.url, l.url) && ((f = e.stack.value[0]) == null || f.updateProps(i.props ?? {}));
      }
    ), (i, l) => (b(), X(Me, null, [
      E(i.$slots, "default"),
      p(e).stack.value.length ? (b(), C(Ge, {
        key: 0,
        index: 0
      })) : R("", !0)
    ], 64));
  }
};
let ge = null;
const J = y({}), re = y(null), Se = y({}), S = y([]), he = y({}), kt = (t) => {
  ge = t;
}, lo = (t) => {
  t.resolveComponent && (ge = t.resolveComponent);
};
class Tt {
  constructor(e, n, o, s, a) {
    I(this, "getComponentPropKeys", () => Array.isArray(this.component.props) ? this.component.props : this.component.props ? Object.keys(this.component.props) : []);
    I(this, "getParentModal", () => {
      const e = this.index.value;
      return e < 1 ? null : S.value.slice(0, e).reverse().find((n) => n.isOpen);
    });
    I(this, "getChildModal", () => {
      const e = this.index.value;
      return e === S.value.length - 1 ? null : S.value.slice(e + 1).find((n) => n.isOpen);
    });
    I(this, "show", () => {
      const e = this.index.value;
      if (e > -1) {
        if (S.value[e].isOpen)
          return;
        S.value[e].isOpen = !0, S.value[e].shouldRender = !0;
      }
    });
    I(this, "close", () => {
      var n;
      const e = this.index.value;
      if (e > -1) {
        if (!S.value[e].isOpen)
          return;
        Object.keys(this.listeners).forEach((o) => {
          this.off(o);
        }), S.value[e].isOpen = !1, (n = this.onCloseCallback) == null || n.call(this), this.onCloseCallback = null;
      }
    });
    I(this, "setOpen", (e) => {
      e ? this.show() : this.close();
    });
    I(this, "afterLeave", () => {
      var n;
      const e = this.index.value;
      if (e > -1) {
        if (S.value[e].isOpen)
          return;
        S.value[e].shouldRender = !1, (n = this.afterLeaveCallback) == null || n.call(this), this.afterLeaveCallback = null;
      }
      e === 0 && (S.value = []);
    });
    I(this, "on", (e, n) => {
      e = de(e), this.listeners[e] = this.listeners[e] ?? [], this.listeners[e].push(n);
    });
    I(this, "off", (e, n) => {
      var o;
      e = de(e), n ? this.listeners[e] = ((o = this.listeners[e]) == null ? void 0 : o.filter((s) => s !== n)) ?? [] : delete this.listeners[e];
    });
    I(this, "emit", (e, ...n) => {
      var o;
      (o = this.listeners[de(e)]) == null || o.forEach((s) => s(...n));
    });
    I(this, "registerEventListenersFromAttrs", (e) => {
      const n = [];
      return Object.keys(e).filter((o) => o.startsWith("on")).forEach((o) => {
        const s = de(o).replace(/^on-/, "");
        this.on(s, e[o]), n.push(() => this.off(s, e[o]));
      }), () => n.forEach((o) => o());
    });
    I(this, "reload", (e = {}) => {
      var a, r;
      let n = Object.keys(this.response.props);
      if (e.only && (n = e.only), e.except && (n = Pt(n, e.except)), !((a = this.response) != null && a.url))
        return;
      const o = (e.method ?? "get").toLowerCase(), s = e.data ?? {};
      (r = e.onStart) == null || r.call(e), ve({
        url: this.response.url,
        method: o,
        data: o === "get" ? {} : s,
        params: o === "get" ? s : {},
        headers: {
          ...e.headers ?? {},
          Accept: "text/html, application/xhtml+xml",
          "X-Inertia": !0,
          "X-Inertia-Partial-Component": this.response.component,
          "X-Inertia-Version": this.response.version,
          "X-Inertia-Partial-Data": n.join(","),
          "X-InertiaUI-Modal": Ae(),
          "X-InertiaUI-Modal-Use-Router": 0,
          "X-InertiaUI-Modal-Base-Url": re.value
        }
      }).then((i) => {
        var l;
        this.updateProps(i.data.props), (l = e.onSuccess) == null || l.call(e, i);
      }).catch((i) => {
        var l;
        (l = e.onError) == null || l.call(e, i);
      }).finally(() => {
        var i;
        (i = e.onFinish) == null || i.call(e);
      });
    });
    I(this, "updateProps", (e) => {
      Object.assign(this.props.value, e);
    });
    if (this.id = n.id ?? Ae(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = e, this.props = y(n.props), this.response = n, this.config = o ?? {}, this.onCloseCallback = s, this.afterLeaveCallback = a, J.value[this.id]) {
      this.config = {
        ...this.config,
        ...J.value[this.id].config ?? {}
      };
      const r = J.value[this.id].onClose, i = J.value[this.id].onAfterLeave;
      r && (this.onCloseCallback = s ? () => {
        s(), r();
      } : r), i && (this.afterLeaveCallback = a ? () => {
        a(), i();
      } : i), delete J.value[this.id];
    }
    this.index = D(() => S.value.findIndex((r) => r.id === this.id)), this.onTopOfStack = D(() => {
      var i;
      return S.value.length < 2 ? !0 : ((i = S.value.map((l) => ({ id: l.id, shouldRender: l.shouldRender })).reverse().find((l) => l.shouldRender)) == null ? void 0 : i.id) === this.id;
    });
  }
}
function Ft(t, e) {
  he.value[t] = { name: t, callback: e };
}
function Rt(t, e, n, o) {
  if (!he.value[t])
    throw new Error(`The local modal "${t}" has not been registered.`);
  const s = Le(null, {}, e, n, o);
  return s.name = t, he.value[t].callback(s), s;
}
function Je(t, e = {}, n = null, o = null) {
  return ge(t.component).then((s) => Le(vt(s), t, e, n, o));
}
function Nt(t, e, n = {}, o = {}, s = {}, a = null, r = null, i = "brackets", l = !1) {
  const f = Ae();
  return new Promise((d, c) => {
    if (t.startsWith("#")) {
      d(Rt(t.substring(1), s, a, r));
      return;
    }
    const [v, u] = $t(e, t || "", n, i);
    let m = l && S.value.length === 0;
    if (S.value.length === 0 && (re.value = typeof window < "u" ? window.location.href : ""), o = {
      ...o,
      Accept: "text/html, application/xhtml+xml",
      "X-Requested-With": "XMLHttpRequest",
      "X-Inertia": !0,
      "X-Inertia-Version": ze().version,
      "X-InertiaUI-Modal": f,
      "X-InertiaUI-Modal-Use-Router": m ? 1 : 0,
      "X-InertiaUI-Modal-Base-Url": re.value
    }, m)
      return J.value[f] = { config: s, onClose: a, onAfterLeave: r }, se.visit(v, {
        method: e,
        data: u,
        headers: o,
        preserveScroll: !0,
        preserveState: !0,
        onError: c,
        onBefore: () => {
          Se.value[f] = d;
        }
      });
    ve({ url: v, method: e, data: u, headers: o }).then((h) => d(Je(h.data, s, a, r))).catch(c);
  });
}
function Ut(t) {
  var n, o;
  const e = (o = (n = t.response) == null ? void 0 : n.meta) == null ? void 0 : o.deferredProps;
  e && Object.keys(e).forEach((s) => {
    t.reload({ only: e[s] });
  });
}
function Le(t, e, n, o, s) {
  const a = new Tt(t, e, n, o, s);
  return S.value.push(a), Ut(a), q(() => a.show()), a;
}
const Wt = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], uo = (t, e) => (e.resolveComponent && (ge = e.resolveComponent), () => Y(Lt, () => Y(t, e)));
function le() {
  return {
    setComponentResolver: kt,
    getBaseUrl: () => re.value,
    setBaseUrl: (t) => re.value = t,
    stack: pt(S),
    push: Le,
    pushFromResponseData: Je,
    closeAll: () => [...S.value].reverse().forEach((t) => t.close()),
    reset: () => S.value = [],
    visit: Nt,
    registerLocalModal: Ft,
    removeLocalModal: (t) => delete he.value[t],
    onModalOnBase(t) {
      const e = Se.value[t.id];
      e && (e(t), delete Se.value[t.id]);
    }
  };
}
function co() {
  return L(ie("modalContext", null));
}
const fo = {
  __name: "Deferred",
  props: {
    data: {
      type: [String, Array],
      required: !0
    }
  },
  setup(t) {
    const e = t, n = ie("modalContext");
    if (!n)
      throw new Error("Deferred component must be used inside a Modal component");
    const o = D(() => (Array.isArray(e.data) ? e.data : [e.data]).every((a) => n.value.props[a] !== void 0));
    return (s, a) => o.value ? E(s.$slots, "default", { key: 0 }) : E(s.$slots, "fallback", { key: 1 });
  }
}, jt = /* @__PURE__ */ Object.assign({
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
    const o = t, s = le(), a = o.name ? y({}) : ie("modalContext"), r = D(() => {
      var m;
      const u = ((m = a.value.config) == null ? void 0 : m.slideover) ?? o.slideover ?? Be("type") === "slideover";
      return {
        slideover: u,
        closeButton: o.closeButton ?? H(u, "closeButton"),
        closeExplicitly: o.closeExplicitly ?? H(u, "closeExplicitly"),
        maxWidth: o.maxWidth ?? H(u, "maxWidth"),
        paddingClasses: o.paddingClasses ?? H(u, "paddingClasses"),
        panelClasses: o.panelClasses ?? H(u, "panelClasses"),
        position: o.position ?? H(u, "position"),
        ...a.value.config
      };
    });
    o.name && (s.registerLocalModal(o.name, function(u) {
      a.value = u, f();
    }), pe(() => {
      s.removeLocalModal(o.name);
    })), te(() => {
      o.name || f();
    });
    const i = y(null);
    pe(() => {
      var u;
      return (u = i.value) == null ? void 0 : u.call(i);
    });
    const l = Ke();
    function f() {
      i.value = a.value.registerEventListenersFromAttrs(l);
    }
    const d = n;
    function c(u, ...m) {
      d("modal-event", u, ...m);
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
        var m;
        return (m = a.value) == null ? void 0 : m.reload(...u);
      },
      setOpen: (...u) => {
        var m;
        return (m = a.value) == null ? void 0 : m.setOpen(...u);
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
      (u, m) => {
        u && !m ? d("focus") : !u && m && d("blur");
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
    const v = D(() => {
      var u;
      return (u = s.stack.value.find((m) => m.shouldRender && m.index > a.value.index)) == null ? void 0 : u.index;
    });
    return (u, m) => (b(), X(Me, null, [
      p(a).shouldRender ? E(u.$slots, "default", {
        key: 0,
        id: p(a).id,
        afterLeave: p(a).afterLeave,
        close: p(a).close,
        config: r.value,
        emit: c,
        getChildModal: p(a).getChildModal,
        getParentModal: p(a).getParentModal,
        index: p(a).index,
        isOpen: p(a).isOpen,
        modalContext: p(a),
        onTopOfStack: p(a).onTopOfStack,
        reload: p(a).reload,
        setOpen: p(a).setOpen,
        shouldRender: p(a).shouldRender
      }) : R("", !0),
      v.value ? (b(), C(Ge, {
        key: 1,
        index: v.value
      }, null, 8, ["index"])) : R("", !0)
    ], 64));
  }
});
function ke(t) {
  return t ? t.flatMap((e) => e.type === Me ? ke(e.children) : [e]) : [];
}
const _t = $({
  name: "PrimitiveSlot",
  inheritAttrs: !1,
  setup(t, { attrs: e, slots: n }) {
    return () => {
      var l;
      if (!n.default)
        return null;
      const o = ke(n.default()), s = o.findIndex((f) => f.type !== ht);
      if (s === -1)
        return o;
      const a = o[s];
      (l = a.props) == null || delete l.ref;
      const r = a.props ? k(e, a.props) : e, i = yt({ ...a, props: {} }, r);
      return o.length === 1 ? i : (o[s] = i, o);
    };
  }
}), Kt = ["area", "img", "input"], oe = $({
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
    return typeof o == "string" && Kt.includes(o) ? () => Y(o, e) : o !== "template" ? () => Y(t.as, e, { default: n.default }) : () => Y(_t, e, { default: n.default });
  }
}), Ye = /* @__PURE__ */ $({
  __name: "VisuallyHidden",
  props: {
    feature: { default: "focusable" },
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(t) {
    return (e, n) => (b(), C(p(oe), {
      as: e.as,
      "as-child": e.asChild,
      "aria-hidden": e.feature === "focusable" ? "true" : void 0,
      "data-hidden": e.feature === "fully-hidden" ? "" : void 0,
      tabindex: e.feature === "fully-hidden" ? "-1" : void 0,
      style: {
        // See: https://github.com/twbs/bootstrap/blob/master/scss/mixins/_screen-reader.scss
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
      default: w(() => [
        E(e.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child", "aria-hidden", "data-hidden", "tabindex"]));
  }
});
function Ze(t) {
  return gt() ? (xt(t), !0) : !1;
}
function qt(t) {
  let e = !1, n;
  const o = qe(!0);
  return (...s) => (e || (n = o.run(() => t(...s)), e = !0), n);
}
function Vt(t) {
  let e = 0, n, o;
  const s = () => {
    e -= 1, o && e <= 0 && (o.stop(), n = void 0, o = void 0);
  };
  return (...a) => (e += 1, o || (o = qe(!0), n = o.run(() => t(...a))), Ze(s), n);
}
const z = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Xt = (t) => typeof t < "u", zt = Object.prototype.toString, Ht = (t) => zt.call(t) === "[object Object]", Re = /* @__PURE__ */ Gt();
function Gt() {
  var t, e;
  return z && ((t = window == null ? void 0 : window.navigator) == null ? void 0 : t.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((e = window == null ? void 0 : window.navigator) == null ? void 0 : e.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function Jt(t) {
  return ne();
}
function be(t) {
  return Array.isArray(t) ? t : [t];
}
function Yt(t, e) {
  Jt() && pe(t, e);
}
function Zt(t, e, n) {
  return P(
    t,
    e,
    {
      ...n,
      immediate: !0
    }
  );
}
const Te = z ? window : void 0;
function xe(t) {
  var e;
  const n = L(t);
  return (e = n == null ? void 0 : n.$el) != null ? e : n;
}
function Qe(...t) {
  const e = [], n = () => {
    e.forEach((i) => i()), e.length = 0;
  }, o = (i, l, f, d) => (i.addEventListener(l, f, d), () => i.removeEventListener(l, f, d)), s = D(() => {
    const i = be(L(t[0])).filter((l) => l != null);
    return i.every((l) => typeof l != "string") ? i : void 0;
  }), a = Zt(
    () => {
      var i, l;
      return [
        (l = (i = s.value) == null ? void 0 : i.map((f) => xe(f))) != null ? l : [Te].filter((f) => f != null),
        be(L(s.value ? t[1] : t[0])),
        be(p(s.value ? t[2] : t[1])),
        // @ts-expect-error - TypeScript gets the correct types, but somehow still complains
        L(s.value ? t[3] : t[2])
      ];
    },
    ([i, l, f, d]) => {
      if (n(), !(i != null && i.length) || !(l != null && l.length) || !(f != null && f.length))
        return;
      const c = Ht(d) ? { ...d } : d;
      e.push(
        ...i.flatMap(
          (v) => l.flatMap(
            (u) => f.map((m) => o(v, u, m, c))
          )
        )
      );
    },
    { flush: "post" }
  ), r = () => {
    a(), n();
  };
  return Ze(n), r;
}
function Qt() {
  const t = bt(!1), e = ne();
  return e && te(() => {
    t.value = !0;
  }, e), t;
}
function en(t) {
  return typeof t == "function" ? t : typeof t == "string" ? (e) => e.key === t : Array.isArray(t) ? (e) => t.includes(e.key) : () => !0;
}
function tn(...t) {
  let e, n, o = {};
  t.length === 3 ? (e = t[0], n = t[1], o = t[2]) : t.length === 2 ? typeof t[1] == "object" ? (e = !0, n = t[0], o = t[1]) : (e = t[0], n = t[1]) : (e = !0, n = t[0]);
  const {
    target: s = Te,
    eventName: a = "keydown",
    passive: r = !1,
    dedupe: i = !1
  } = o, l = en(e);
  return Qe(s, a, (d) => {
    d.repeat && L(i) || l(d) && n(d);
  }, r);
}
function nn(t) {
  return JSON.parse(JSON.stringify(t));
}
function on(t, e, n, o = {}) {
  var s, a, r;
  const {
    clone: i = !1,
    passive: l = !1,
    eventName: f,
    deep: d = !1,
    defaultValue: c,
    shouldEmit: v
  } = o, u = ne(), m = n || (u == null ? void 0 : u.emit) || ((s = u == null ? void 0 : u.$emit) == null ? void 0 : s.bind(u)) || ((r = (a = u == null ? void 0 : u.proxy) == null ? void 0 : a.$emit) == null ? void 0 : r.bind(u == null ? void 0 : u.proxy));
  let h = f;
  h = h || `update:${e.toString()}`;
  const x = (A) => i ? typeof i == "function" ? i(A) : nn(A) : A, g = () => Xt(t[e]) ? x(t[e]) : c, O = (A) => {
    v ? v(A) && m(h, A) : m(h, A);
  };
  if (l) {
    const A = g(), T = y(A);
    let F = !1;
    return P(
      () => t[e],
      (B) => {
        F || (F = !0, T.value = x(B), q(() => F = !1));
      }
    ), P(
      T,
      (B) => {
        !F && (B !== t[e] || d) && O(B);
      },
      { deep: d }
    ), T;
  } else
    return D({
      get() {
        return g();
      },
      set(A) {
        O(A);
      }
    });
}
function et(t, e) {
  const n = typeof t == "string" && !e ? `${t}Context` : e, o = Symbol(n);
  return [(r) => {
    const i = ie(o, r);
    if (i || i === null)
      return i;
    throw new Error(
      `Injection \`${o.toString()}\` not found. Component must be used within ${Array.isArray(t) ? `one of the following components: ${t.join(
        ", "
      )}` : `\`${t}\``}`
    );
  }, (r) => ($e(o, r), r)];
}
const [tt, mo] = et("ConfigProvider");
function N() {
  const t = ne(), e = y(), n = D(() => {
    var r, i;
    return ["#text", "#comment"].includes((r = e.value) == null ? void 0 : r.$el.nodeName) ? (i = e.value) == null ? void 0 : i.$el.nextElementSibling : xe(e);
  }), o = Object.assign({}, t.exposed), s = {};
  for (const r in t.props)
    Object.defineProperty(s, r, {
      enumerable: !0,
      configurable: !0,
      get: () => t.props[r]
    });
  if (Object.keys(o).length > 0)
    for (const r in o)
      Object.defineProperty(s, r, {
        enumerable: !0,
        configurable: !0,
        get: () => o[r]
      });
  Object.defineProperty(s, "$el", {
    enumerable: !0,
    configurable: !0,
    get: () => t.vnode.el
  }), t.exposed = s;
  function a(r) {
    e.value = r, r && (Object.defineProperty(s, "$el", {
      enumerable: !0,
      configurable: !0,
      get: () => r instanceof Element ? r : r.$el
    }), t.exposed = s);
  }
  return { forwardRef: a, currentRef: e, currentElement: n };
}
let an = 0;
function Ne(t, e = "reka") {
  var o;
  const n = tt({ useId: void 0 });
  return Object.hasOwn(ue, "useId") ? `${e}-${(o = ue.useId) == null ? void 0 : o.call(ue)}` : n.useId ? `${e}-${n.useId()}` : `${e}-${++an}`;
}
function sn(t, e) {
  const n = y(t);
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
function rn(t, e) {
  var x;
  const n = y({}), o = y("none"), s = y(t), a = t.value ? "mounted" : "unmounted";
  let r;
  const i = ((x = e.value) == null ? void 0 : x.ownerDocument.defaultView) ?? Te, { state: l, dispatch: f } = sn(a, {
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
  }), d = (g) => {
    var O;
    if (z) {
      const A = new CustomEvent(g, { bubbles: !1, cancelable: !1 });
      (O = e.value) == null || O.dispatchEvent(A);
    }
  };
  P(
    t,
    async (g, O) => {
      var T;
      const A = O !== g;
      if (await q(), A) {
        const F = o.value, B = ce(e.value);
        g ? (f("MOUNT"), d("enter"), B === "none" && d("after-enter")) : B === "none" || B === "undefined" || ((T = n.value) == null ? void 0 : T.display) === "none" ? (f("UNMOUNT"), d("leave"), d("after-leave")) : O && F !== B ? (f("ANIMATION_OUT"), d("leave")) : (f("UNMOUNT"), d("after-leave"));
      }
    },
    { immediate: !0 }
  );
  const c = (g) => {
    const O = ce(e.value), A = O.includes(
      g.animationName
    ), T = l.value === "mounted" ? "enter" : "leave";
    if (g.target === e.value && A && (d(`after-${T}`), f("ANIMATION_END"), !s.value)) {
      const F = e.value.style.animationFillMode;
      e.value.style.animationFillMode = "forwards", r = i == null ? void 0 : i.setTimeout(() => {
        var B;
        ((B = e.value) == null ? void 0 : B.style.animationFillMode) === "forwards" && (e.value.style.animationFillMode = F);
      });
    }
    g.target === e.value && O === "none" && f("ANIMATION_END");
  }, v = (g) => {
    g.target === e.value && (o.value = ce(e.value));
  }, u = P(
    e,
    (g, O) => {
      g ? (n.value = getComputedStyle(g), g.addEventListener("animationstart", v), g.addEventListener("animationcancel", c), g.addEventListener("animationend", c)) : (f("ANIMATION_END"), r !== void 0 && (i == null || i.clearTimeout(r)), O == null || O.removeEventListener("animationstart", v), O == null || O.removeEventListener("animationcancel", c), O == null || O.removeEventListener("animationend", c));
    },
    { immediate: !0 }
  ), m = P(l, () => {
    const g = ce(e.value);
    o.value = l.value === "mounted" ? g : "none";
  });
  return j(() => {
    u(), m();
  }), {
    isPresent: D(
      () => ["mounted", "unmountSuspended"].includes(l.value)
    )
  };
}
function ce(t) {
  return t && getComputedStyle(t).animationName || "none";
}
const nt = $({
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
    var f;
    const { present: o, forceMount: s } = Ve(t), a = y(), { isPresent: r } = rn(o, a);
    n({ present: r });
    let i = e.default({ present: r.value });
    i = ke(i || []);
    const l = ne();
    if (i && (i == null ? void 0 : i.length) > 1) {
      const d = (f = l == null ? void 0 : l.parent) != null && f.type.name ? `<${l.parent.type.name} />` : "component";
      throw new Error(
        [
          `Detected an invalid children for \`${d}\` for  \`Presence\` component.`,
          "",
          "Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.",
          "You can apply a few solutions:",
          [
            "Provide a single child element so that `presence` directive attach correctly.",
            "Ensure the first child is an actual element instead of a raw text node or comment node."
          ].map((c) => `  - ${c}`).join(`
`)
        ].join(`
`)
      );
    }
    return () => s.value || o.value || r.value ? Y(e.default({ present: r.value })[0], {
      ref: (d) => {
        const c = xe(d);
        return typeof (c == null ? void 0 : c.hasAttribute) > "u" || (c != null && c.hasAttribute("data-reka-popper-content-wrapper") ? a.value = c.firstElementChild : a.value = c), c;
      }
    }) : null;
  }
}), [V, ln] = et("DialogRoot"), un = /* @__PURE__ */ $({
  inheritAttrs: !1,
  __name: "DialogRoot",
  props: {
    open: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: !1 },
    modal: { type: Boolean, default: !0 }
  },
  emits: ["update:open"],
  setup(t, { emit: e }) {
    const n = t, s = on(n, "open", e, {
      defaultValue: n.defaultOpen,
      passive: n.open === void 0
    }), a = y(), r = y(), { modal: i } = Ve(n);
    return ln({
      open: s,
      modal: i,
      openModal: () => {
        s.value = !0;
      },
      onOpenChange: (l) => {
        s.value = l;
      },
      onOpenToggle: () => {
        s.value = !s.value;
      },
      contentId: "",
      titleId: "",
      descriptionId: "",
      triggerElement: a,
      contentElement: r
    }), (l, f) => E(l.$slots, "default", {
      open: p(s),
      close: () => s.value = !1
    });
  }
}), dn = /* @__PURE__ */ $({
  __name: "DialogClose",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(t) {
    const e = t;
    N();
    const n = V();
    return (o, s) => (b(), C(p(oe), k(e, {
      type: o.as === "button" ? "button" : void 0,
      onClick: s[0] || (s[0] = (a) => p(n).onOpenChange(!1))
    }), {
      default: w(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["type"]));
  }
});
function Fe(t) {
  const e = ne(), n = e == null ? void 0 : e.type.emits, o = {};
  return n != null && n.length || console.warn(
    `No emitted event found. Please check component: ${e == null ? void 0 : e.type.__name}`
  ), n == null || n.forEach((s) => {
    o[wt(Et(s))] = (...a) => t(s, ...a);
  }), o;
}
function K() {
  let t = document.activeElement;
  if (t == null)
    return null;
  for (; t != null && t.shadowRoot != null && t.shadowRoot.activeElement != null; )
    t = t.shadowRoot.activeElement;
  return t;
}
function cn(t) {
  return t ? "open" : "closed";
}
const fn = "DialogTitle", mn = "DialogContent";
function pn({
  titleName: t = fn,
  contentName: e = mn,
  componentLink: n = "dialog.html#title",
  titleId: o,
  descriptionId: s,
  contentElement: a
}) {
  const r = `Warning: \`${e}\` requires a \`${t}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://www.reka-ui.com/docs/components/${n}`, i = `Warning: Missing \`Description\` or \`aria-describedby="undefined"\` for ${e}.`;
  te(() => {
    var d;
    document.getElementById(o) || console.warn(r);
    const f = (d = a.value) == null ? void 0 : d.getAttribute("aria-describedby");
    s && f && (document.getElementById(s) || console.warn(i));
  });
}
const vn = qt(() => y([]));
function hn() {
  const t = vn();
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
function yn(t) {
  return t.filter((e) => e.tagName !== "A");
}
const we = "focusScope.autoFocusOnMount", Ee = "focusScope.autoFocusOnUnmount", We = { bubbles: !1, cancelable: !0 };
function gn(t, { select: e = !1 } = {}) {
  const n = K();
  for (const o of t)
    if (W(o, { select: e }), K() !== n)
      return !0;
}
function xn(t) {
  const e = ot(t), n = je(e, t), o = je(e.reverse(), t);
  return [n, o];
}
function ot(t) {
  const e = [], n = document.createTreeWalker(t, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (o) => {
      const s = o.tagName === "INPUT" && o.type === "hidden";
      return o.disabled || o.hidden || s ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) e.push(n.currentNode);
  return e;
}
function je(t, e) {
  for (const n of t)
    if (!bn(n, { upTo: e }))
      return n;
}
function bn(t, { upTo: e }) {
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
function wn(t) {
  return t instanceof HTMLInputElement && "select" in t;
}
function W(t, { select: e = !1 } = {}) {
  if (t && t.focus) {
    const n = K();
    t.focus({ preventScroll: !0 }), t !== n && wn(t) && e && t.select();
  }
}
const En = /* @__PURE__ */ $({
  __name: "FocusScope",
  props: {
    loop: { type: Boolean, default: !1 },
    trapped: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["mountAutoFocus", "unmountAutoFocus"],
  setup(t, { emit: e }) {
    const n = t, o = e, { currentRef: s, currentElement: a } = N(), r = y(null), i = hn(), l = Xe({
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    });
    ee((d) => {
      if (!z)
        return;
      const c = a.value;
      if (!n.trapped)
        return;
      function v(x) {
        if (l.paused || !c)
          return;
        const g = x.target;
        c.contains(g) ? r.value = g : W(r.value, { select: !0 });
      }
      function u(x) {
        if (l.paused || !c)
          return;
        const g = x.relatedTarget;
        g !== null && (c.contains(g) || W(r.value, { select: !0 }));
      }
      function m(x) {
        c.contains(r.value) || W(c);
      }
      document.addEventListener("focusin", v), document.addEventListener("focusout", u);
      const h = new MutationObserver(m);
      c && h.observe(c, { childList: !0, subtree: !0 }), d(() => {
        document.removeEventListener("focusin", v), document.removeEventListener("focusout", u), h.disconnect();
      });
    }), ee(async (d) => {
      const c = a.value;
      if (await q(), !c)
        return;
      i.add(l);
      const v = K();
      if (!c.contains(v)) {
        const m = new CustomEvent(we, We);
        c.addEventListener(we, (h) => o("mountAutoFocus", h)), c.dispatchEvent(m), m.defaultPrevented || (gn(yn(ot(c)), {
          select: !0
        }), K() === v && W(c));
      }
      d(() => {
        c.removeEventListener(we, (x) => o("mountAutoFocus", x));
        const m = new CustomEvent(Ee, We), h = (x) => {
          o("unmountAutoFocus", x);
        };
        c.addEventListener(Ee, h), c.dispatchEvent(m), setTimeout(() => {
          m.defaultPrevented || W(v ?? document.body, { select: !0 }), c.removeEventListener(Ee, h), i.remove(l);
        }, 0);
      });
    });
    function f(d) {
      if (!n.loop && !n.trapped || l.paused)
        return;
      const c = d.key === "Tab" && !d.altKey && !d.ctrlKey && !d.metaKey, v = K();
      if (c && v) {
        const u = d.currentTarget, [m, h] = xn(u);
        m && h ? !d.shiftKey && v === h ? (d.preventDefault(), n.loop && W(m, { select: !0 })) : d.shiftKey && v === m && (d.preventDefault(), n.loop && W(h, { select: !0 })) : v === u && d.preventDefault();
      }
    }
    return (d, c) => (b(), C(p(oe), {
      ref_key: "currentRef",
      ref: s,
      tabindex: "-1",
      "as-child": d.asChild,
      as: d.as,
      onKeydown: f
    }, {
      default: w(() => [
        E(d.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as"]));
  }
});
function at(t, e, n) {
  const o = n.originalEvent.target, s = new CustomEvent(t, {
    bubbles: !1,
    cancelable: !0,
    detail: n
  });
  e && o.addEventListener(t, e, { once: !0 }), o.dispatchEvent(s);
}
const Cn = "dismissableLayer.pointerDownOutside", On = "dismissableLayer.focusOutside";
function st(t, e) {
  const n = e.closest(
    "[data-dismissable-layer]"
  ), o = t.dataset.dismissableLayer === "" ? t : t.querySelector(
    "[data-dismissable-layer]"
  ), s = Array.from(
    t.ownerDocument.querySelectorAll("[data-dismissable-layer]")
  );
  return !!(n && (o === n || s.indexOf(o) < s.indexOf(n)));
}
function An(t, e, n = !0) {
  var r;
  const o = ((r = e == null ? void 0 : e.value) == null ? void 0 : r.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), s = y(!1), a = y(() => {
  });
  return ee((i) => {
    if (!z || !L(n))
      return;
    const l = async (d) => {
      const c = d.target;
      if (!(!(e != null && e.value) || !c)) {
        if (st(e.value, c)) {
          s.value = !1;
          return;
        }
        if (d.target && !s.value) {
          let v = function() {
            at(
              Cn,
              t,
              u
            );
          };
          const u = { originalEvent: d };
          d.pointerType === "touch" ? (o.removeEventListener("click", a.value), a.value = v, o.addEventListener("click", a.value, {
            once: !0
          })) : v();
        } else
          o.removeEventListener("click", a.value);
        s.value = !1;
      }
    }, f = window.setTimeout(() => {
      o.addEventListener("pointerdown", l);
    }, 0);
    i(() => {
      window.clearTimeout(f), o.removeEventListener("pointerdown", l), o.removeEventListener("click", a.value);
    });
  }), {
    onPointerDownCapture: () => {
      L(n) && (s.value = !0);
    }
  };
}
function Sn(t, e, n = !0) {
  var a;
  const o = ((a = e == null ? void 0 : e.value) == null ? void 0 : a.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), s = y(!1);
  return ee((r) => {
    if (!z || !L(n))
      return;
    const i = async (l) => {
      if (!(e != null && e.value))
        return;
      await q(), await q();
      const f = l.target;
      !e.value || !f || st(e.value, f) || l.target && !s.value && at(
        On,
        t,
        { originalEvent: l }
      );
    };
    o.addEventListener("focusin", i), r(() => o.removeEventListener("focusin", i));
  }), {
    onFocusCapture: () => {
      L(n) && (s.value = !0);
    },
    onBlurCapture: () => {
      L(n) && (s.value = !1);
    }
  };
}
const U = Xe({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Dn = /* @__PURE__ */ $({
  __name: "DismissableLayer",
  props: {
    disableOutsidePointerEvents: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "dismiss"],
  setup(t, { emit: e }) {
    const n = t, o = e, { forwardRef: s, currentElement: a } = N(), r = D(
      () => {
        var m;
        return ((m = a.value) == null ? void 0 : m.ownerDocument) ?? globalThis.document;
      }
    ), i = D(() => U.layersRoot), l = D(() => a.value ? Array.from(i.value).indexOf(a.value) : -1), f = D(() => U.layersWithOutsidePointerEventsDisabled.size > 0), d = D(() => {
      const m = Array.from(i.value), [h] = [...U.layersWithOutsidePointerEventsDisabled].slice(-1), x = m.indexOf(h);
      return l.value >= x;
    }), c = An(async (m) => {
      const h = [...U.branches].some(
        (x) => x == null ? void 0 : x.contains(m.target)
      );
      !d.value || h || (o("pointerDownOutside", m), o("interactOutside", m), await q(), m.defaultPrevented || o("dismiss"));
    }, a), v = Sn((m) => {
      [...U.branches].some(
        (x) => x == null ? void 0 : x.contains(m.target)
      ) || (o("focusOutside", m), o("interactOutside", m), m.defaultPrevented || o("dismiss"));
    }, a);
    tn("Escape", (m) => {
      l.value === i.value.size - 1 && (o("escapeKeyDown", m), m.defaultPrevented || o("dismiss"));
    });
    let u;
    return ee((m) => {
      a.value && (n.disableOutsidePointerEvents && (U.layersWithOutsidePointerEventsDisabled.size === 0 && (u = r.value.body.style.pointerEvents, r.value.body.style.pointerEvents = "none"), U.layersWithOutsidePointerEventsDisabled.add(a.value)), i.value.add(a.value), m(() => {
        n.disableOutsidePointerEvents && U.layersWithOutsidePointerEventsDisabled.size === 1 && (r.value.body.style.pointerEvents = u);
      }));
    }), ee((m) => {
      m(() => {
        a.value && (i.value.delete(a.value), U.layersWithOutsidePointerEventsDisabled.delete(a.value));
      });
    }), (m, h) => (b(), C(p(oe), {
      ref: p(s),
      "as-child": m.asChild,
      as: m.as,
      "data-dismissable-layer": "",
      style: Ct({
        pointerEvents: f.value ? d.value ? "auto" : "none" : void 0
      }),
      onFocusCapture: p(v).onFocusCapture,
      onBlurCapture: p(v).onBlurCapture,
      onPointerdownCapture: p(c).onPointerDownCapture
    }, {
      default: w(() => [
        E(m.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as", "style", "onFocusCapture", "onBlurCapture", "onPointerdownCapture"]));
  }
}), rt = /* @__PURE__ */ $({
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
    const n = t, o = e, s = V(), { forwardRef: a, currentElement: r } = N();
    return s.titleId || (s.titleId = Ne(void 0, "reka-dialog-title")), s.descriptionId || (s.descriptionId = Ne(void 0, "reka-dialog-description")), te(() => {
      s.contentElement = r, K() !== document.body && (s.triggerElement.value = K());
    }), process.env.NODE_ENV !== "production" && pn({
      titleName: "DialogTitle",
      contentName: "DialogContent",
      componentLink: "dialog.html#title",
      titleId: s.titleId,
      descriptionId: s.descriptionId,
      contentElement: r
    }), (i, l) => (b(), C(p(En), {
      "as-child": "",
      loop: "",
      trapped: n.trapFocus,
      onMountAutoFocus: l[5] || (l[5] = (f) => o("openAutoFocus", f)),
      onUnmountAutoFocus: l[6] || (l[6] = (f) => o("closeAutoFocus", f))
    }, {
      default: w(() => [
        M(p(Dn), k({
          id: p(s).contentId,
          ref: p(a),
          as: i.as,
          "as-child": i.asChild,
          "disable-outside-pointer-events": i.disableOutsidePointerEvents,
          role: "dialog",
          "aria-describedby": p(s).descriptionId,
          "aria-labelledby": p(s).titleId,
          "data-state": p(cn)(p(s).open.value)
        }, i.$attrs, {
          onDismiss: l[0] || (l[0] = (f) => p(s).onOpenChange(!1)),
          onEscapeKeyDown: l[1] || (l[1] = (f) => o("escapeKeyDown", f)),
          onFocusOutside: l[2] || (l[2] = (f) => o("focusOutside", f)),
          onInteractOutside: l[3] || (l[3] = (f) => o("interactOutside", f)),
          onPointerDownOutside: l[4] || (l[4] = (f) => o("pointerDownOutside", f))
        }), {
          default: w(() => [
            E(i.$slots, "default")
          ]),
          _: 3
        }, 16, ["id", "as", "as-child", "disable-outside-pointer-events", "aria-describedby", "aria-labelledby", "data-state"])
      ]),
      _: 3
    }, 8, ["trapped"]));
  }
});
var $n = function(t) {
  if (typeof document > "u")
    return null;
  var e = Array.isArray(t) ? t[0] : t;
  return e.ownerDocument.body;
}, G = /* @__PURE__ */ new WeakMap(), fe = /* @__PURE__ */ new WeakMap(), me = {}, Ce = 0, it = function(t) {
  return t && (t.host || it(t.parentNode));
}, Mn = function(t, e) {
  return e.map(function(n) {
    if (t.contains(n))
      return n;
    var o = it(n);
    return o && t.contains(o) ? o : (console.error("aria-hidden", n, "in not contained inside", t, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, In = function(t, e, n, o) {
  var s = Mn(e, Array.isArray(t) ? t : [t]);
  me[n] || (me[n] = /* @__PURE__ */ new WeakMap());
  var a = me[n], r = [], i = /* @__PURE__ */ new Set(), l = new Set(s), f = function(c) {
    !c || i.has(c) || (i.add(c), f(c.parentNode));
  };
  s.forEach(f);
  var d = function(c) {
    !c || l.has(c) || Array.prototype.forEach.call(c.children, function(v) {
      if (i.has(v))
        d(v);
      else
        try {
          var u = v.getAttribute(o), m = u !== null && u !== "false", h = (G.get(v) || 0) + 1, x = (a.get(v) || 0) + 1;
          G.set(v, h), a.set(v, x), r.push(v), h === 1 && m && fe.set(v, !0), x === 1 && v.setAttribute(n, "true"), m || v.setAttribute(o, "true");
        } catch (g) {
          console.error("aria-hidden: cannot operate on ", v, g);
        }
    });
  };
  return d(e), i.clear(), Ce++, function() {
    r.forEach(function(c) {
      var v = G.get(c) - 1, u = a.get(c) - 1;
      G.set(c, v), a.set(c, u), v || (fe.has(c) || c.removeAttribute(o), fe.delete(c)), u || c.removeAttribute(n);
    }), Ce--, Ce || (G = /* @__PURE__ */ new WeakMap(), G = /* @__PURE__ */ new WeakMap(), fe = /* @__PURE__ */ new WeakMap(), me = {});
  };
}, Pn = function(t, e, n) {
  n === void 0 && (n = "data-aria-hidden");
  var o = Array.from(Array.isArray(t) ? t : [t]), s = $n(t);
  return s ? (o.push.apply(o, Array.from(s.querySelectorAll("[aria-live], script"))), In(o, s, n, "aria-hidden")) : function() {
    return null;
  };
};
function Bn(t) {
  let e;
  P(() => xe(t), (n) => {
    n ? e = Pn(n) : e && e();
  }), j(() => {
    e && e();
  });
}
const Ln = /* @__PURE__ */ $({
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
    const n = t, o = e, s = V(), a = Fe(o), { forwardRef: r, currentElement: i } = N();
    return Bn(i), (l, f) => (b(), C(rt, k({ ...n, ...p(a) }, {
      ref: p(r),
      "trap-focus": p(s).open.value,
      "disable-outside-pointer-events": !0,
      onCloseAutoFocus: f[0] || (f[0] = (d) => {
        var c;
        d.defaultPrevented || (d.preventDefault(), (c = p(s).triggerElement.value) == null || c.focus());
      }),
      onPointerDownOutside: f[1] || (f[1] = (d) => {
        const c = d.detail.originalEvent, v = c.button === 0 && c.ctrlKey === !0;
        (c.button === 2 || v) && d.preventDefault();
      }),
      onFocusOutside: f[2] || (f[2] = (d) => {
        d.preventDefault();
      })
    }), {
      default: w(() => [
        E(l.$slots, "default")
      ]),
      _: 3
    }, 16, ["trap-focus"]));
  }
}), kn = /* @__PURE__ */ $({
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
    const n = t, s = Fe(e);
    N();
    const a = V(), r = y(!1), i = y(!1);
    return (l, f) => (b(), C(rt, k({ ...n, ...p(s) }, {
      "trap-focus": !1,
      "disable-outside-pointer-events": !1,
      onCloseAutoFocus: f[0] || (f[0] = (d) => {
        var c;
        d.defaultPrevented || (r.value || (c = p(a).triggerElement.value) == null || c.focus(), d.preventDefault()), r.value = !1, i.value = !1;
      }),
      onInteractOutside: f[1] || (f[1] = (d) => {
        var u;
        d.defaultPrevented || (r.value = !0, d.detail.originalEvent.type === "pointerdown" && (i.value = !0));
        const c = d.target;
        ((u = p(a).triggerElement.value) == null ? void 0 : u.contains(c)) && d.preventDefault(), d.detail.originalEvent.type === "focusin" && i.value && d.preventDefault();
      })
    }), {
      default: w(() => [
        E(l.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), lt = /* @__PURE__ */ $({
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
    const n = t, o = e, s = V(), a = Fe(o), { forwardRef: r } = N();
    return (i, l) => (b(), C(p(nt), {
      present: i.forceMount || p(s).open.value
    }, {
      default: w(() => [
        p(s).modal.value ? (b(), C(Ln, k({
          key: 0,
          ref: p(r)
        }, { ...n, ...p(a), ...i.$attrs }), {
          default: w(() => [
            E(i.$slots, "default")
          ]),
          _: 3
        }, 16)) : (b(), C(kn, k({
          key: 1,
          ref: p(r)
        }, { ...n, ...p(a), ...i.$attrs }), {
          default: w(() => [
            E(i.$slots, "default")
          ]),
          _: 3
        }, 16))
      ]),
      _: 3
    }, 8, ["present"]));
  }
});
function Oe(t) {
  if (t === null || typeof t != "object")
    return !1;
  const e = Object.getPrototypeOf(t);
  return e !== null && e !== Object.prototype && Object.getPrototypeOf(e) !== null || Symbol.iterator in t ? !1 : Symbol.toStringTag in t ? Object.prototype.toString.call(t) === "[object Module]" : !0;
}
function De(t, e, n = ".", o) {
  if (!Oe(e))
    return De(t, {}, n, o);
  const s = Object.assign({}, e);
  for (const a in t) {
    if (a === "__proto__" || a === "constructor")
      continue;
    const r = t[a];
    r != null && (o && o(s, a, r, n) || (Array.isArray(r) && Array.isArray(s[a]) ? s[a] = [...r, ...s[a]] : Oe(r) && Oe(s[a]) ? s[a] = De(
      r,
      s[a],
      (n ? `${n}.` : "") + a.toString(),
      o
    ) : s[a] = r));
  }
  return s;
}
function Tn(t) {
  return (...e) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    e.reduce((n, o) => De(n, o, "", t), {})
  );
}
const Fn = Tn(), Rn = Vt(() => {
  const t = y(/* @__PURE__ */ new Map()), e = y(), n = D(() => {
    for (const r of t.value.values())
      if (r)
        return !0;
    return !1;
  }), o = tt({
    scrollBody: y(!0)
  });
  let s = null;
  const a = () => {
    document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.documentElement.style.removeProperty("--scrollbar-width"), document.body.style.overflow = e.value ?? "", Re && (s == null || s()), e.value = void 0;
  };
  return P(n, (r, i) => {
    var c;
    if (!z)
      return;
    if (!r) {
      i && a();
      return;
    }
    e.value === void 0 && (e.value = document.body.style.overflow);
    const l = window.innerWidth - document.documentElement.clientWidth, f = { padding: l, margin: 0 }, d = (c = o.scrollBody) != null && c.value ? typeof o.scrollBody.value == "object" ? Fn({
      padding: o.scrollBody.value.padding === !0 ? l : o.scrollBody.value.padding,
      margin: o.scrollBody.value.margin === !0 ? l : o.scrollBody.value.margin
    }, f) : f : { padding: 0, margin: 0 };
    l > 0 && (document.body.style.paddingRight = typeof d.padding == "number" ? `${d.padding}px` : String(d.padding), document.body.style.marginRight = typeof d.margin == "number" ? `${d.margin}px` : String(d.margin), document.documentElement.style.setProperty("--scrollbar-width", `${l}px`), document.body.style.overflow = "hidden"), Re && (s = Qe(
      document,
      "touchmove",
      (v) => Un(v),
      { passive: !1 }
    )), q(() => {
      document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden";
    });
  }, { immediate: !0, flush: "sync" }), t;
});
function Nn(t) {
  const e = Math.random().toString(36).substring(2, 7), n = Rn();
  n.value.set(e, t);
  const o = D({
    get: () => n.value.get(e) ?? !1,
    set: (s) => n.value.set(e, s)
  });
  return Yt(() => {
    n.value.delete(e);
  }), o;
}
function ut(t) {
  const e = window.getComputedStyle(t);
  if (e.overflowX === "scroll" || e.overflowY === "scroll" || e.overflowX === "auto" && t.clientWidth < t.scrollWidth || e.overflowY === "auto" && t.clientHeight < t.scrollHeight)
    return !0;
  {
    const n = t.parentNode;
    return !(n instanceof Element) || n.tagName === "BODY" ? !1 : ut(n);
  }
}
function Un(t) {
  const e = t || window.event, n = e.target;
  return n instanceof Element && ut(n) ? !1 : e.touches.length > 1 ? !0 : (e.preventDefault && e.cancelable && e.preventDefault(), !1);
}
const Wn = /* @__PURE__ */ $({
  __name: "DialogOverlayImpl",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(t) {
    const e = V();
    return Nn(!0), N(), (n, o) => (b(), C(p(oe), {
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
}), jn = /* @__PURE__ */ $({
  __name: "DialogOverlay",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(t) {
    const e = V(), { forwardRef: n } = N();
    return (o, s) => {
      var a;
      return (a = p(e)) != null && a.modal.value ? (b(), C(p(nt), {
        key: 0,
        present: o.forceMount || p(e).open.value
      }, {
        default: w(() => [
          M(Wn, k(o.$attrs, {
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
      }, 8, ["present"])) : R("", !0);
    };
  }
}), _n = /* @__PURE__ */ $({
  __name: "Teleport",
  props: {
    to: { default: "body" },
    disabled: { type: Boolean },
    defer: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(t) {
    const e = Qt();
    return (n, o) => p(e) || n.forceMount ? (b(), C(Ot, {
      key: 0,
      to: n.to,
      disabled: n.disabled,
      defer: n.defer
    }, [
      E(n.$slots, "default")
    ], 8, ["to", "disabled", "defer"])) : R("", !0);
  }
}), dt = /* @__PURE__ */ $({
  __name: "DialogTitle",
  props: {
    asChild: { type: Boolean },
    as: { default: "h2" }
  },
  setup(t) {
    const e = t, n = V();
    return N(), (o, s) => (b(), C(p(oe), k(e, {
      id: p(n).titleId
    }), {
      default: w(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["id"]));
  }
}), Kn = /* @__PURE__ */ $({
  __name: "DialogPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    defer: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(t) {
    const e = t;
    return (n, o) => (b(), C(p(_n), At(St(e)), {
      default: w(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), ct = {
  __name: "CloseButton",
  setup(t) {
    return (e, n) => (b(), C(p(dn), { class: "im-close-button text-gray-400 hover:text-gray-500" }, {
      default: w(() => n[0] || (n[0] = [
        _("span", { class: "sr-only" }, "Close", -1),
        _("svg", {
          class: "size-6",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "2",
          stroke: "currentColor",
          "aria-hidden": "true"
        }, [
          _("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M6 18L18 6M6 6l12 12"
          })
        ], -1)
      ])),
      _: 1,
      __: [0]
    }));
  }
}, qn = { class: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4" }, Vn = ["data-inertiaui-modal-entered"], Xn = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, zn = {
  __name: "ModalContent",
  props: {
    modalContext: Object,
    config: Object
  },
  setup(t) {
    const e = y(!1);
    return (n, o) => (b(), X("div", qn, [
      _("div", {
        class: Z(["im-modal-positioner flex min-h-full justify-center", {
          "items-start": t.config.position === "top",
          "items-center": t.config.position === "center",
          "items-end": t.config.position === "bottom"
        }])
      }, [
        M(Ie, {
          appear: "",
          "enter-from-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          "enter-to-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-from-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-to-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          onAfterEnter: o[2] || (o[2] = (s) => e.value = !0),
          onAfterLeave: t.modalContext.afterLeave
        }, {
          default: w(() => [
            M(p(lt), {
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
              onEscapeKeyDown: o[0] || (o[0] = (s) => {
                var a;
                return ((a = t.config) == null ? void 0 : a.closeExplicitly) && s.preventDefault();
              }),
              onInteractOutside: o[1] || (o[1] = (s) => {
                var a;
                return ((a = t.config) == null ? void 0 : a.closeExplicitly) && s.preventDefault();
              })
            }, {
              default: w(() => [
                M(p(Ye), { "as-child": "" }, {
                  default: w(() => [
                    M(p(dt))
                  ]),
                  _: 1
                }),
                _("div", {
                  class: Z(["im-modal-content relative", [t.config.paddingClasses, t.config.panelClasses]]),
                  "data-inertiaui-modal-entered": e.value
                }, [
                  t.config.closeButton ? (b(), X("div", Xn, [
                    M(ct)
                  ])) : R("", !0),
                  E(n.$slots, "default", {
                    modalContext: t.modalContext,
                    config: t.config
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
}, Hn = { class: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden" }, Gn = ["data-inertiaui-modal-entered"], Jn = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, Yn = {
  __name: "SlideoverContent",
  props: {
    modalContext: Object,
    config: Object
  },
  setup(t) {
    const e = y(!1);
    return (n, o) => (b(), X("div", Hn, [
      _("div", {
        class: Z(["im-slideover-positioner flex min-h-full items-center", {
          "justify-start rtl:justify-end": t.config.position === "left",
          "justify-end rtl:justify-start": t.config.position === "right"
        }])
      }, [
        M(Ie, {
          appear: "",
          "enter-from-class": "opacity-0 " + (t.config.position === "left" ? "-translate-x-full" : "translate-x-full"),
          "enter-to-class": "opacity-100 translate-x-0",
          "leave-from-class": "opacity-100 translate-x-0",
          "leave-to-class": "opacity-0 " + (t.config.position === "left" ? "-translate-x-full" : "translate-x-full"),
          onAfterEnter: o[2] || (o[2] = (s) => e.value = !0),
          onAfterLeave: t.modalContext.afterLeave
        }, {
          default: w(() => [
            M(p(lt), {
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
              onEscapeKeyDown: o[0] || (o[0] = (s) => {
                var a;
                return ((a = t.config) == null ? void 0 : a.closeExplicitly) && s.preventDefault();
              }),
              onInteractOutside: o[1] || (o[1] = (s) => {
                var a;
                return ((a = t.config) == null ? void 0 : a.closeExplicitly) && s.preventDefault();
              })
            }, {
              default: w(() => [
                M(p(Ye), { "as-child": "" }, {
                  default: w(() => [
                    M(p(dt))
                  ]),
                  _: 1
                }),
                _("div", {
                  class: Z(["im-slideover-content relative", [t.config.paddingClasses, t.config.panelClasses]]),
                  "data-inertiaui-modal-entered": e.value
                }, [
                  t.config.closeButton ? (b(), X("div", Jn, [
                    M(ct)
                  ])) : R("", !0),
                  E(n.$slots, "default", {
                    modalContext: t.modalContext,
                    config: t.config
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
}, po = {
  __name: "Modal",
  emits: ["after-leave", "blur", "close", "focus", "success"],
  setup(t, { expose: e }) {
    const n = y(null), o = y(!1);
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
        var r;
        return (r = n.value) == null ? void 0 : r.emit(...a);
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
        var r;
        return (r = n.value) == null ? void 0 : r.reload(...a);
      },
      setOpen: (...a) => {
        var r;
        return (r = n.value) == null ? void 0 : r.setOpen(...a);
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
    let s;
    return _e(() => {
      s = new MutationObserver(() => {
        document.body.style.pointerEvents === "none" && (document.body.style.pointerEvents = "");
      }), s.observe(document.body, { attributes: !0, attributeFilter: ["style"] });
    }), j(() => {
      s && (s.disconnect(), s = null);
    }), (a, r) => (b(), C(jt, {
      ref_key: "modal",
      ref: n,
      onSuccess: r[2] || (r[2] = (i) => a.$emit("success")),
      onClose: r[3] || (r[3] = (i) => a.$emit("close")),
      onFocus: r[4] || (r[4] = (i) => a.$emit("focus")),
      onBlur: r[5] || (r[5] = (i) => a.$emit("blur"))
    }, {
      default: w(({
        afterLeave: i,
        close: l,
        config: f,
        emit: d,
        getChildModal: c,
        getParentModal: v,
        id: u,
        index: m,
        isOpen: h,
        modalContext: x,
        onTopOfStack: g,
        reload: O,
        setOpen: A,
        shouldRender: T
      }) => [
        M(p(un), {
          open: h,
          "onUpdate:open": A
        }, {
          default: w(() => [
            M(p(Kn), null, {
              default: w(() => [
                _("div", {
                  "data-inertiaui-modal-id": u,
                  "data-inertiaui-modal-index": m,
                  class: "im-dialog relative z-20",
                  "aria-hidden": !g
                }, [
                  m === 0 && g ? (b(), C(Ie, {
                    key: 0,
                    appear: !o.value,
                    "enter-active-class": "transition transform ease-in-out duration-300",
                    "enter-from-class": "opacity-0",
                    "enter-to-class": "opacity-100",
                    "leave-active-class": "transition transform ease-in-out duration-300",
                    "leave-from-class": "opacity-100",
                    "leave-to-class": "opacity-0",
                    onAfterAppear: r[0] || (r[0] = (F) => o.value = !0)
                  }, {
                    default: w(() => [
                      M(p(jn), { class: "im-backdrop fixed inset-0 z-30 bg-black/75" })
                    ]),
                    _: 1
                  }, 8, ["appear"])) : R("", !0),
                  m > 0 && g ? (b(), X("div", Qn)) : R("", !0),
                  (b(), C(Pe(f != null && f.slideover ? Yn : zn), {
                    "modal-context": x,
                    config: f,
                    onAfterLeave: r[1] || (r[1] = (F) => a.$emit("after-leave"))
                  }, {
                    default: w(() => [
                      E(a.$slots, "default", {
                        id: u,
                        afterLeave: i,
                        close: l,
                        config: f,
                        emit: d,
                        getChildModal: c,
                        getParentModal: v,
                        index: m,
                        isOpen: h,
                        modalContext: x,
                        onTopOfStack: g,
                        reload: O,
                        setOpen: A,
                        shouldRender: T
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
  setup(t, { emit: e }) {
    const n = t, o = y(!1), s = le(), a = y(null);
    $e("modalContext", a);
    const r = e, i = y(!1), l = D(() => n.navigate ?? Be("navigate"));
    P(
      () => {
        var h;
        return (h = a.value) == null ? void 0 : h.onTopOfStack;
      },
      (h) => {
        a.value && (h && i.value ? r("focus") : h || r("blur"), i.value = !h);
      }
    );
    const f = y(null);
    pe(() => {
      var h;
      (h = f.value) == null || h.call(f);
    });
    const d = Ke();
    function c() {
      f.value = a.value.registerEventListenersFromAttrs(d);
    }
    P(a, (h, x) => {
      h && !x && (c(), r("success"));
    });
    function v() {
      r("close");
    }
    function u() {
      a.value = null, r("after-leave");
    }
    function m() {
      o.value || (n.href.startsWith("#") || (o.value = !0, r("start")), s.visit(
        n.href,
        n.method,
        n.data,
        n.headers,
        Bt(He(n, Wt)),
        v,
        u,
        n.queryStringArrayFormat,
        l.value
      ).then((h) => {
        a.value = h;
      }).catch((h) => r("error", h)).finally(() => o.value = !1));
    }
    return (h, x) => (b(), C(Pe(t.as), k(p(d), {
      href: t.href,
      onClick: Dt(m, ["prevent"])
    }), {
      default: w(() => [
        E(h.$slots, "default", { loading: o.value })
      ]),
      _: 3
    }, 16, ["href"]));
  }
}, ho = {
  __name: "WhenVisible",
  props: {
    data: [String, Array],
    params: Object,
    buffer: { type: Number, default: 0 },
    as: { type: String, default: "div" },
    always: { type: Boolean, default: !1 }
  },
  setup(t) {
    const e = t, n = ie("modalContext");
    if (!n)
      throw new Error("Deferred component must be used inside a Modal component");
    const o = y(!1), s = y(!1), a = y(null);
    let r = null;
    const i = () => {
      if (e.data)
        return { only: Array.isArray(e.data) ? e.data : [e.data] };
      if (!e.params)
        throw new Error("You must provide either a `data` or `params` prop.");
      return e.params;
    };
    return te(() => {
      a.value && (r = new IntersectionObserver(
        (f) => {
          if (!f[0].isIntersecting || (e.always || r.disconnect(), s.value))
            return;
          s.value = !0;
          const d = i();
          n.value.reload({
            ...d,
            onStart: () => {
              var c;
              s.value = !0, (c = d.onStart) == null || c.call(d);
            },
            onFinish: () => {
              var c;
              o.value = !0, s.value = !1, (c = d.onFinish) == null || c.call(d);
            }
          });
        },
        { rootMargin: `${e.buffer}px` }
      ), r.observe(a.value));
    }), j(() => r == null ? void 0 : r.disconnect()), (f, d) => (b(), C(Pe(e.as), {
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
function yo(t, e = {}) {
  return le().visit(
    t,
    e.method ?? "get",
    e.data ?? {},
    e.headers ?? {},
    e.config ?? {},
    e.onClose,
    e.onAfterLeave,
    e.queryStringArrayFormat ?? "brackets",
    e.navigate ?? Be("navigate")
  ).then((n) => {
    const o = e.listeners ?? {};
    return Object.keys(o).forEach((s) => {
      const a = s.replace(/([A-Z])/g, "-$1").toLowerCase();
      n.on(a, o[s]);
    }), n;
  });
}
export {
  fo as Deferred,
  jt as HeadlessModal,
  po as Modal,
  vo as ModalLink,
  Lt as ModalRoot,
  ho as WhenVisible,
  Be as getConfig,
  lo as initFromPageProps,
  io as putConfig,
  uo as renderApp,
  ro as resetConfig,
  co as useModal,
  yo as visitModal
};
