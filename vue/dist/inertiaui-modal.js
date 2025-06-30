var ft = Object.defineProperty;
var mt = (t, e, n) => e in t ? ft(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var I = (t, e, n) => mt(t, typeof e != "symbol" ? e + "" : e, n);
import * as ue from "vue";
import { computed as S, provide as $e, createBlock as O, createCommentVNode as R, openBlock as w, unref as p, mergeProps as k, onUnmounted as j, onBeforeMount as _e, onMounted as te, watch as P, createElementBlock as X, Fragment as Me, renderSlot as E, ref as g, h as Y, readonly as pt, markRaw as vt, nextTick as q, toValue as L, inject as re, onBeforeUnmount as pe, useAttrs as Ke, defineComponent as $, Comment as ht, cloneVNode as yt, withCtx as C, effectScope as qe, getCurrentScope as gt, onScopeDispose as xt, getCurrentInstance as ne, shallowRef as bt, toRefs as Ve, toHandlerKey as wt, camelize as Ct, reactive as Xe, watchEffect as ee, normalizeStyle as Et, createVNode as M, Teleport as Ot, normalizeProps as At, guardReactiveProps as Dt, createElementVNode as _, normalizeClass as Z, Transition as Ie, resolveDynamicComponent as Pe, withModifiers as St } from "vue";
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
const ye = new Mt(), io = () => ye.reset(), ro = (t, e) => ye.put(t, e), Be = (t) => ye.get(t), H = (t, e) => ye.get(t ? `slideover.${e}` : `modal.${e}`);
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
    const e = t, n = le(), o = S(() => n.stack.value[e.index]);
    return $e("modalContext", o), (s, a) => {
      var i;
      return (i = o.value) != null && i.component ? (w(), O(p(o).component, k({ key: 0 }, p(He)(o.value.props ?? {}, o.value.getComponentPropKeys(), !0), {
        onModalEvent: a[0] || (a[0] = (r, ...l) => o.value.emit(r, ...l))
      }), null, 16)) : R("", !0);
    };
  }
}, Lt = {
  __name: "ModalRoot",
  setup(t) {
    const e = le(), n = ze();
    let o = !1, s = null, a = !1;
    j(se.on("start", () => o = !0)), j(se.on("finish", () => o = !1)), j(
      se.on("navigate", (r) => {
        const l = r.detail.page.props._inertiaui_modal;
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
    const i = (r) => {
      var l;
      return r.headers["X-InertiaUI-Modal-Base-Url"] = e.getBaseUrl() ?? (a ? (l = n.props._inertiaui_modal) == null ? void 0 : l.baseUrl : null), r;
    };
    return _e(() => ve.interceptors.request.use(i)), te(() => a = !!n.props._inertiaui_modal), j(() => ve.interceptors.request.eject(i)), P(
      () => {
        var r;
        return (r = n.props) == null ? void 0 : r._inertiaui_modal;
      },
      (r, l) => {
        var f;
        r && l && r.component === l.component && It(r.url, l.url) && ((f = e.stack.value[0]) == null || f.updateProps(r.props ?? {}));
      }
    ), (r, l) => (w(), X(Me, null, [
      E(r.$slots, "default"),
      p(e).stack.value.length ? (w(), O(Ge, {
        key: 0,
        index: 0
      })) : R("", !0)
    ], 64));
  }
};
let ge = null;
const J = g({}), ie = g(null), De = g({}), D = g([]), he = g({}), kt = (t) => {
  ge = t;
}, lo = (t) => {
  t.resolveComponent && (ge = t.resolveComponent);
};
class Tt {
  constructor(e, n, o, s, a) {
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
      var a, i;
      let n = Object.keys(this.response.props);
      if (e.only && (n = e.only), e.except && (n = Pt(n, e.except)), !((a = this.response) != null && a.url))
        return;
      const o = (e.method ?? "get").toLowerCase(), s = e.data ?? {};
      (i = e.onStart) == null || i.call(e), ve({
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
          "X-InertiaUI-Modal-Base-Url": ie.value
        }
      }).then((r) => {
        var l;
        this.updateProps(r.data.props), (l = e.onSuccess) == null || l.call(e, r);
      }).catch((r) => {
        var l;
        (l = e.onError) == null || l.call(e, r);
      }).finally(() => {
        var r;
        (r = e.onFinish) == null || r.call(e);
      });
    });
    I(this, "updateProps", (e) => {
      Object.assign(this.props.value, e);
    });
    if (this.id = n.id ?? Ae(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = e, this.props = g(n.props), this.response = n, this.config = o ?? {}, this.onCloseCallback = s, this.afterLeaveCallback = a, J.value[this.id]) {
      this.config = {
        ...this.config,
        ...J.value[this.id].config ?? {}
      };
      const i = J.value[this.id].onClose, r = J.value[this.id].onAfterLeave;
      i && (this.onCloseCallback = s ? () => {
        s(), i();
      } : i), r && (this.afterLeaveCallback = a ? () => {
        a(), r();
      } : r), delete J.value[this.id];
    }
    this.index = S(() => D.value.findIndex((i) => i.id === this.id)), this.onTopOfStack = S(() => {
      var r;
      return D.value.length < 2 ? !0 : ((r = D.value.map((l) => ({ id: l.id, shouldRender: l.shouldRender })).reverse().find((l) => l.shouldRender)) == null ? void 0 : r.id) === this.id;
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
function Nt(t, e, n = {}, o = {}, s = {}, a = null, i = null, r = "brackets", l = !1, f = null, d = null, c = null) {
  const v = Ae();
  return new Promise((u, m) => {
    if (t.startsWith("#")) {
      u(Rt(t.substring(1), s, a, i));
      return;
    }
    const [h, x] = $t(e, t || "", n, r);
    let y = l && D.value.length === 0;
    if (D.value.length === 0 && (ie.value = typeof window < "u" ? window.location.href : ""), o = {
      ...o,
      Accept: "text/html, application/xhtml+xml",
      "X-Requested-With": "XMLHttpRequest",
      "X-Inertia": !0,
      "X-Inertia-Version": ze().version,
      "X-InertiaUI-Modal": v,
      "X-InertiaUI-Modal-Use-Router": y ? 1 : 0,
      "X-InertiaUI-Modal-Base-Url": ie.value
    }, y)
      return J.value[v] = { config: s, onClose: a, onAfterLeave: i }, se.visit(h, {
        method: e,
        data: x,
        headers: o,
        preserveScroll: !0,
        preserveState: !0,
        onError(...b) {
          c == null || c(...b), m(...b);
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
    f == null || f(), ve({ url: h, method: e, data: x, headers: o }).then((b) => {
      d == null || d(b), u(Je(b.data, s, a, i));
    }).catch((...b) => {
      c == null || c(...b), m(...b);
    });
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
  return D.value.push(a), Ut(a), q(() => a.show()), a;
}
const Wt = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], uo = (t, e) => (e.resolveComponent && (ge = e.resolveComponent), () => Y(Lt, () => Y(t, e)));
function le() {
  return {
    setComponentResolver: kt,
    getBaseUrl: () => ie.value,
    setBaseUrl: (t) => ie.value = t,
    stack: pt(D),
    push: Le,
    pushFromResponseData: Je,
    closeAll: () => [...D.value].reverse().forEach((t) => t.close()),
    reset: () => D.value = [],
    visit: Nt,
    registerLocalModal: Ft,
    removeLocalModal: (t) => delete he.value[t],
    onModalOnBase(t) {
      const e = De.value[t.id];
      e && (e(t), delete De.value[t.id]);
    }
  };
}
function co() {
  return L(re("modalContext", null));
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
    const e = t, n = re("modalContext");
    if (!n)
      throw new Error("Deferred component must be used inside a Modal component");
    const o = S(() => (Array.isArray(e.data) ? e.data : [e.data]).every((a) => n.value.props[a] !== void 0));
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
    const o = t, s = le(), a = o.name ? g({}) : re("modalContext"), i = S(() => {
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
    const r = g(null);
    pe(() => {
      var u;
      return (u = r.value) == null ? void 0 : u.call(r);
    });
    const l = Ke();
    function f() {
      r.value = a.value.registerEventListenersFromAttrs(l);
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
    const v = S(() => {
      var u;
      return (u = s.stack.value.find((m) => m.shouldRender && m.index > a.value.index)) == null ? void 0 : u.index;
    });
    return (u, m) => (w(), X(Me, null, [
      p(a).shouldRender ? E(u.$slots, "default", {
        key: 0,
        id: p(a).id,
        afterLeave: p(a).afterLeave,
        close: p(a).close,
        config: i.value,
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
      v.value ? (w(), O(Ge, {
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
      const i = a.props ? k(e, a.props) : e, r = yt({ ...a, props: {} }, i);
      return o.length === 1 ? r : (o[s] = r, o);
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
    return (e, n) => (w(), O(p(oe), {
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
      default: C(() => [
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
    e.forEach((r) => r()), e.length = 0;
  }, o = (r, l, f, d) => (r.addEventListener(l, f, d), () => r.removeEventListener(l, f, d)), s = S(() => {
    const r = be(L(t[0])).filter((l) => l != null);
    return r.every((l) => typeof l != "string") ? r : void 0;
  }), a = Zt(
    () => {
      var r, l;
      return [
        (l = (r = s.value) == null ? void 0 : r.map((f) => xe(f))) != null ? l : [Te].filter((f) => f != null),
        be(L(s.value ? t[1] : t[0])),
        be(p(s.value ? t[2] : t[1])),
        // @ts-expect-error - TypeScript gets the correct types, but somehow still complains
        L(s.value ? t[3] : t[2])
      ];
    },
    ([r, l, f, d]) => {
      if (n(), !(r != null && r.length) || !(l != null && l.length) || !(f != null && f.length))
        return;
      const c = Ht(d) ? { ...d } : d;
      e.push(
        ...r.flatMap(
          (v) => l.flatMap(
            (u) => f.map((m) => o(v, u, m, c))
          )
        )
      );
    },
    { flush: "post" }
  ), i = () => {
    a(), n();
  };
  return Ze(n), i;
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
    passive: i = !1,
    dedupe: r = !1
  } = o, l = en(e);
  return Qe(s, a, (d) => {
    d.repeat && L(r) || l(d) && n(d);
  }, i);
}
function nn(t) {
  return JSON.parse(JSON.stringify(t));
}
function on(t, e, n, o = {}) {
  var s, a, i;
  const {
    clone: r = !1,
    passive: l = !1,
    eventName: f,
    deep: d = !1,
    defaultValue: c,
    shouldEmit: v
  } = o, u = ne(), m = n || (u == null ? void 0 : u.emit) || ((s = u == null ? void 0 : u.$emit) == null ? void 0 : s.bind(u)) || ((i = (a = u == null ? void 0 : u.proxy) == null ? void 0 : a.$emit) == null ? void 0 : i.bind(u == null ? void 0 : u.proxy));
  let h = f;
  h = h || `update:${e.toString()}`;
  const x = (A) => r ? typeof r == "function" ? r(A) : nn(A) : A, y = () => Xt(t[e]) ? x(t[e]) : c, b = (A) => {
    v ? v(A) && m(h, A) : m(h, A);
  };
  if (l) {
    const A = y(), T = g(A);
    let F = !1;
    return P(
      () => t[e],
      (B) => {
        F || (F = !0, T.value = x(B), q(() => F = !1));
      }
    ), P(
      T,
      (B) => {
        !F && (B !== t[e] || d) && b(B);
      },
      { deep: d }
    ), T;
  } else
    return S({
      get() {
        return y();
      },
      set(A) {
        b(A);
      }
    });
}
function et(t, e) {
  const n = typeof t == "string" && !e ? `${t}Context` : e, o = Symbol(n);
  return [(i) => {
    const r = re(o, i);
    if (r || r === null)
      return r;
    throw new Error(
      `Injection \`${o.toString()}\` not found. Component must be used within ${Array.isArray(t) ? `one of the following components: ${t.join(
        ", "
      )}` : `\`${t}\``}`
    );
  }, (i) => ($e(o, i), i)];
}
const [tt, mo] = et("ConfigProvider");
function N() {
  const t = ne(), e = g(), n = S(() => {
    var i, r;
    return ["#text", "#comment"].includes((i = e.value) == null ? void 0 : i.$el.nodeName) ? (r = e.value) == null ? void 0 : r.$el.nextElementSibling : xe(e);
  }), o = Object.assign({}, t.exposed), s = {};
  for (const i in t.props)
    Object.defineProperty(s, i, {
      enumerable: !0,
      configurable: !0,
      get: () => t.props[i]
    });
  if (Object.keys(o).length > 0)
    for (const i in o)
      Object.defineProperty(s, i, {
        enumerable: !0,
        configurable: !0,
        get: () => o[i]
      });
  Object.defineProperty(s, "$el", {
    enumerable: !0,
    configurable: !0,
    get: () => t.vnode.el
  }), t.exposed = s;
  function a(i) {
    e.value = i, i && (Object.defineProperty(s, "$el", {
      enumerable: !0,
      configurable: !0,
      get: () => i instanceof Element ? i : i.$el
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
  const n = g(t);
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
  const n = g({}), o = g("none"), s = g(t), a = t.value ? "mounted" : "unmounted";
  let i;
  const r = ((x = e.value) == null ? void 0 : x.ownerDocument.defaultView) ?? Te, { state: l, dispatch: f } = sn(a, {
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
      const A = new CustomEvent(y, { bubbles: !1, cancelable: !1 });
      (b = e.value) == null || b.dispatchEvent(A);
    }
  };
  P(
    t,
    async (y, b) => {
      var T;
      const A = b !== y;
      if (await q(), A) {
        const F = o.value, B = ce(e.value);
        y ? (f("MOUNT"), d("enter"), B === "none" && d("after-enter")) : B === "none" || B === "undefined" || ((T = n.value) == null ? void 0 : T.display) === "none" ? (f("UNMOUNT"), d("leave"), d("after-leave")) : b && F !== B ? (f("ANIMATION_OUT"), d("leave")) : (f("UNMOUNT"), d("after-leave"));
      }
    },
    { immediate: !0 }
  );
  const c = (y) => {
    const b = ce(e.value), A = b.includes(
      y.animationName
    ), T = l.value === "mounted" ? "enter" : "leave";
    if (y.target === e.value && A && (d(`after-${T}`), f("ANIMATION_END"), !s.value)) {
      const F = e.value.style.animationFillMode;
      e.value.style.animationFillMode = "forwards", i = r == null ? void 0 : r.setTimeout(() => {
        var B;
        ((B = e.value) == null ? void 0 : B.style.animationFillMode) === "forwards" && (e.value.style.animationFillMode = F);
      });
    }
    y.target === e.value && b === "none" && f("ANIMATION_END");
  }, v = (y) => {
    y.target === e.value && (o.value = ce(e.value));
  }, u = P(
    e,
    (y, b) => {
      y ? (n.value = getComputedStyle(y), y.addEventListener("animationstart", v), y.addEventListener("animationcancel", c), y.addEventListener("animationend", c)) : (f("ANIMATION_END"), i !== void 0 && (r == null || r.clearTimeout(i)), b == null || b.removeEventListener("animationstart", v), b == null || b.removeEventListener("animationcancel", c), b == null || b.removeEventListener("animationend", c));
    },
    { immediate: !0 }
  ), m = P(l, () => {
    const y = ce(e.value);
    o.value = l.value === "mounted" ? y : "none";
  });
  return j(() => {
    u(), m();
  }), {
    isPresent: S(
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
    const { present: o, forceMount: s } = Ve(t), a = g(), { isPresent: i } = rn(o, a);
    n({ present: i });
    let r = e.default({ present: i.value });
    r = ke(r || []);
    const l = ne();
    if (r && (r == null ? void 0 : r.length) > 1) {
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
    return () => s.value || o.value || i.value ? Y(e.default({ present: i.value })[0], {
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
    }), a = g(), i = g(), { modal: r } = Ve(n);
    return ln({
      open: s,
      modal: r,
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
      contentElement: i
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
    return (o, s) => (w(), O(p(oe), k(e, {
      type: o.as === "button" ? "button" : void 0,
      onClick: s[0] || (s[0] = (a) => p(n).onOpenChange(!1))
    }), {
      default: C(() => [
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
    o[wt(Ct(s))] = (...a) => t(s, ...a);
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
  const i = `Warning: \`${e}\` requires a \`${t}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://www.reka-ui.com/docs/components/${n}`, r = `Warning: Missing \`Description\` or \`aria-describedby="undefined"\` for ${e}.`;
  te(() => {
    var d;
    document.getElementById(o) || console.warn(i);
    const f = (d = a.value) == null ? void 0 : d.getAttribute("aria-describedby");
    s && f && (document.getElementById(s) || console.warn(r));
  });
}
const vn = qt(() => g([]));
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
const we = "focusScope.autoFocusOnMount", Ce = "focusScope.autoFocusOnUnmount", We = { bubbles: !1, cancelable: !0 };
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
const Cn = /* @__PURE__ */ $({
  __name: "FocusScope",
  props: {
    loop: { type: Boolean, default: !1 },
    trapped: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["mountAutoFocus", "unmountAutoFocus"],
  setup(t, { emit: e }) {
    const n = t, o = e, { currentRef: s, currentElement: a } = N(), i = g(null), r = hn(), l = Xe({
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
        const y = x.target;
        c.contains(y) ? i.value = y : W(i.value, { select: !0 });
      }
      function u(x) {
        if (l.paused || !c)
          return;
        const y = x.relatedTarget;
        y !== null && (c.contains(y) || W(i.value, { select: !0 }));
      }
      function m(x) {
        c.contains(i.value) || W(c);
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
      r.add(l);
      const v = K();
      if (!c.contains(v)) {
        const m = new CustomEvent(we, We);
        c.addEventListener(we, (h) => o("mountAutoFocus", h)), c.dispatchEvent(m), m.defaultPrevented || (gn(yn(ot(c)), {
          select: !0
        }), K() === v && W(c));
      }
      d(() => {
        c.removeEventListener(we, (x) => o("mountAutoFocus", x));
        const m = new CustomEvent(Ce, We), h = (x) => {
          o("unmountAutoFocus", x);
        };
        c.addEventListener(Ce, h), c.dispatchEvent(m), setTimeout(() => {
          m.defaultPrevented || W(v ?? document.body, { select: !0 }), c.removeEventListener(Ce, h), r.remove(l);
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
    return (d, c) => (w(), O(p(oe), {
      ref_key: "currentRef",
      ref: s,
      tabindex: "-1",
      "as-child": d.asChild,
      as: d.as,
      onKeydown: f
    }, {
      default: C(() => [
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
const En = "dismissableLayer.pointerDownOutside", On = "dismissableLayer.focusOutside";
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
  var i;
  const o = ((i = e == null ? void 0 : e.value) == null ? void 0 : i.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), s = g(!1), a = g(() => {
  });
  return ee((r) => {
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
              En,
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
    r(() => {
      window.clearTimeout(f), o.removeEventListener("pointerdown", l), o.removeEventListener("click", a.value);
    });
  }), {
    onPointerDownCapture: () => {
      L(n) && (s.value = !0);
    }
  };
}
function Dn(t, e, n = !0) {
  var a;
  const o = ((a = e == null ? void 0 : e.value) == null ? void 0 : a.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), s = g(!1);
  return ee((i) => {
    if (!z || !L(n))
      return;
    const r = async (l) => {
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
    o.addEventListener("focusin", r), i(() => o.removeEventListener("focusin", r));
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
}), Sn = /* @__PURE__ */ $({
  __name: "DismissableLayer",
  props: {
    disableOutsidePointerEvents: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "dismiss"],
  setup(t, { emit: e }) {
    const n = t, o = e, { forwardRef: s, currentElement: a } = N(), i = S(
      () => {
        var m;
        return ((m = a.value) == null ? void 0 : m.ownerDocument) ?? globalThis.document;
      }
    ), r = S(() => U.layersRoot), l = S(() => a.value ? Array.from(r.value).indexOf(a.value) : -1), f = S(() => U.layersWithOutsidePointerEventsDisabled.size > 0), d = S(() => {
      const m = Array.from(r.value), [h] = [...U.layersWithOutsidePointerEventsDisabled].slice(-1), x = m.indexOf(h);
      return l.value >= x;
    }), c = An(async (m) => {
      const h = [...U.branches].some(
        (x) => x == null ? void 0 : x.contains(m.target)
      );
      !d.value || h || (o("pointerDownOutside", m), o("interactOutside", m), await q(), m.defaultPrevented || o("dismiss"));
    }, a), v = Dn((m) => {
      [...U.branches].some(
        (x) => x == null ? void 0 : x.contains(m.target)
      ) || (o("focusOutside", m), o("interactOutside", m), m.defaultPrevented || o("dismiss"));
    }, a);
    tn("Escape", (m) => {
      l.value === r.value.size - 1 && (o("escapeKeyDown", m), m.defaultPrevented || o("dismiss"));
    });
    let u;
    return ee((m) => {
      a.value && (n.disableOutsidePointerEvents && (U.layersWithOutsidePointerEventsDisabled.size === 0 && (u = i.value.body.style.pointerEvents, i.value.body.style.pointerEvents = "none"), U.layersWithOutsidePointerEventsDisabled.add(a.value)), r.value.add(a.value), m(() => {
        n.disableOutsidePointerEvents && U.layersWithOutsidePointerEventsDisabled.size === 1 && (i.value.body.style.pointerEvents = u);
      }));
    }), ee((m) => {
      m(() => {
        a.value && (r.value.delete(a.value), U.layersWithOutsidePointerEventsDisabled.delete(a.value));
      });
    }), (m, h) => (w(), O(p(oe), {
      ref: p(s),
      "as-child": m.asChild,
      as: m.as,
      "data-dismissable-layer": "",
      style: Et({
        pointerEvents: f.value ? d.value ? "auto" : "none" : void 0
      }),
      onFocusCapture: p(v).onFocusCapture,
      onBlurCapture: p(v).onBlurCapture,
      onPointerdownCapture: p(c).onPointerDownCapture
    }, {
      default: C(() => [
        E(m.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as", "style", "onFocusCapture", "onBlurCapture", "onPointerdownCapture"]));
  }
}), it = /* @__PURE__ */ $({
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
    const n = t, o = e, s = V(), { forwardRef: a, currentElement: i } = N();
    return s.titleId || (s.titleId = Ne(void 0, "reka-dialog-title")), s.descriptionId || (s.descriptionId = Ne(void 0, "reka-dialog-description")), te(() => {
      s.contentElement = i, K() !== document.body && (s.triggerElement.value = K());
    }), process.env.NODE_ENV !== "production" && pn({
      titleName: "DialogTitle",
      contentName: "DialogContent",
      componentLink: "dialog.html#title",
      titleId: s.titleId,
      descriptionId: s.descriptionId,
      contentElement: i
    }), (r, l) => (w(), O(p(Cn), {
      "as-child": "",
      loop: "",
      trapped: n.trapFocus,
      onMountAutoFocus: l[5] || (l[5] = (f) => o("openAutoFocus", f)),
      onUnmountAutoFocus: l[6] || (l[6] = (f) => o("closeAutoFocus", f))
    }, {
      default: C(() => [
        M(p(Sn), k({
          id: p(s).contentId,
          ref: p(a),
          as: r.as,
          "as-child": r.asChild,
          "disable-outside-pointer-events": r.disableOutsidePointerEvents,
          role: "dialog",
          "aria-describedby": p(s).descriptionId,
          "aria-labelledby": p(s).titleId,
          "data-state": p(cn)(p(s).open.value)
        }, r.$attrs, {
          onDismiss: l[0] || (l[0] = (f) => p(s).onOpenChange(!1)),
          onEscapeKeyDown: l[1] || (l[1] = (f) => o("escapeKeyDown", f)),
          onFocusOutside: l[2] || (l[2] = (f) => o("focusOutside", f)),
          onInteractOutside: l[3] || (l[3] = (f) => o("interactOutside", f)),
          onPointerDownOutside: l[4] || (l[4] = (f) => o("pointerDownOutside", f))
        }), {
          default: C(() => [
            E(r.$slots, "default")
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
}, G = /* @__PURE__ */ new WeakMap(), fe = /* @__PURE__ */ new WeakMap(), me = {}, Ee = 0, rt = function(t) {
  return t && (t.host || rt(t.parentNode));
}, Mn = function(t, e) {
  return e.map(function(n) {
    if (t.contains(n))
      return n;
    var o = rt(n);
    return o && t.contains(o) ? o : (console.error("aria-hidden", n, "in not contained inside", t, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, In = function(t, e, n, o) {
  var s = Mn(e, Array.isArray(t) ? t : [t]);
  me[n] || (me[n] = /* @__PURE__ */ new WeakMap());
  var a = me[n], i = [], r = /* @__PURE__ */ new Set(), l = new Set(s), f = function(c) {
    !c || r.has(c) || (r.add(c), f(c.parentNode));
  };
  s.forEach(f);
  var d = function(c) {
    !c || l.has(c) || Array.prototype.forEach.call(c.children, function(v) {
      if (r.has(v))
        d(v);
      else
        try {
          var u = v.getAttribute(o), m = u !== null && u !== "false", h = (G.get(v) || 0) + 1, x = (a.get(v) || 0) + 1;
          G.set(v, h), a.set(v, x), i.push(v), h === 1 && m && fe.set(v, !0), x === 1 && v.setAttribute(n, "true"), m || v.setAttribute(o, "true");
        } catch (y) {
          console.error("aria-hidden: cannot operate on ", v, y);
        }
    });
  };
  return d(e), r.clear(), Ee++, function() {
    i.forEach(function(c) {
      var v = G.get(c) - 1, u = a.get(c) - 1;
      G.set(c, v), a.set(c, u), v || (fe.has(c) || c.removeAttribute(o), fe.delete(c)), u || c.removeAttribute(n);
    }), Ee--, Ee || (G = /* @__PURE__ */ new WeakMap(), G = /* @__PURE__ */ new WeakMap(), fe = /* @__PURE__ */ new WeakMap(), me = {});
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
    const n = t, o = e, s = V(), a = Fe(o), { forwardRef: i, currentElement: r } = N();
    return Bn(r), (l, f) => (w(), O(it, k({ ...n, ...p(a) }, {
      ref: p(i),
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
      default: C(() => [
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
    const a = V(), i = g(!1), r = g(!1);
    return (l, f) => (w(), O(it, k({ ...n, ...p(s) }, {
      "trap-focus": !1,
      "disable-outside-pointer-events": !1,
      onCloseAutoFocus: f[0] || (f[0] = (d) => {
        var c;
        d.defaultPrevented || (i.value || (c = p(a).triggerElement.value) == null || c.focus(), d.preventDefault()), i.value = !1, r.value = !1;
      }),
      onInteractOutside: f[1] || (f[1] = (d) => {
        var u;
        d.defaultPrevented || (i.value = !0, d.detail.originalEvent.type === "pointerdown" && (r.value = !0));
        const c = d.target;
        ((u = p(a).triggerElement.value) == null ? void 0 : u.contains(c)) && d.preventDefault(), d.detail.originalEvent.type === "focusin" && r.value && d.preventDefault();
      })
    }), {
      default: C(() => [
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
    const n = t, o = e, s = V(), a = Fe(o), { forwardRef: i } = N();
    return (r, l) => (w(), O(p(nt), {
      present: r.forceMount || p(s).open.value
    }, {
      default: C(() => [
        p(s).modal.value ? (w(), O(Ln, k({
          key: 0,
          ref: p(i)
        }, { ...n, ...p(a), ...r.$attrs }), {
          default: C(() => [
            E(r.$slots, "default")
          ]),
          _: 3
        }, 16)) : (w(), O(kn, k({
          key: 1,
          ref: p(i)
        }, { ...n, ...p(a), ...r.$attrs }), {
          default: C(() => [
            E(r.$slots, "default")
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
function Se(t, e, n = ".", o) {
  if (!Oe(e))
    return Se(t, {}, n, o);
  const s = Object.assign({}, e);
  for (const a in t) {
    if (a === "__proto__" || a === "constructor")
      continue;
    const i = t[a];
    i != null && (o && o(s, a, i, n) || (Array.isArray(i) && Array.isArray(s[a]) ? s[a] = [...i, ...s[a]] : Oe(i) && Oe(s[a]) ? s[a] = Se(
      i,
      s[a],
      (n ? `${n}.` : "") + a.toString(),
      o
    ) : s[a] = i));
  }
  return s;
}
function Tn(t) {
  return (...e) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    e.reduce((n, o) => Se(n, o, "", t), {})
  );
}
const Fn = Tn(), Rn = Vt(() => {
  const t = g(/* @__PURE__ */ new Map()), e = g(), n = S(() => {
    for (const i of t.value.values())
      if (i)
        return !0;
    return !1;
  }), o = tt({
    scrollBody: g(!0)
  });
  let s = null;
  const a = () => {
    document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.documentElement.style.removeProperty("--scrollbar-width"), document.body.style.overflow = e.value ?? "", Re && (s == null || s()), e.value = void 0;
  };
  return P(n, (i, r) => {
    var c;
    if (!z)
      return;
    if (!i) {
      r && a();
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
  const o = S({
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
    return Nn(!0), N(), (n, o) => (w(), O(p(oe), {
      as: n.as,
      "as-child": n.asChild,
      "data-state": p(e).open.value ? "open" : "closed",
      style: { "pointer-events": "auto" }
    }, {
      default: C(() => [
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
      return (a = p(e)) != null && a.modal.value ? (w(), O(p(nt), {
        key: 0,
        present: o.forceMount || p(e).open.value
      }, {
        default: C(() => [
          M(Wn, k(o.$attrs, {
            ref: p(n),
            as: o.as,
            "as-child": o.asChild
          }), {
            default: C(() => [
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
    return (n, o) => p(e) || n.forceMount ? (w(), O(Ot, {
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
    return N(), (o, s) => (w(), O(p(oe), k(e, {
      id: p(n).titleId
    }), {
      default: C(() => [
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
    return (n, o) => (w(), O(p(_n), At(Dt(e)), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), ct = {
  __name: "CloseButton",
  setup(t) {
    return (e, n) => (w(), O(p(dn), { class: "im-close-button text-gray-400 hover:text-gray-500" }, {
      default: C(() => n[0] || (n[0] = [
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
    const e = g(!1);
    return (n, o) => (w(), X("div", qn, [
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
          default: C(() => [
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
              default: C(() => [
                M(p(Ye), { "as-child": "" }, {
                  default: C(() => [
                    M(p(dt))
                  ]),
                  _: 1
                }),
                _("div", {
                  class: Z(["im-modal-content relative", [t.config.paddingClasses, t.config.panelClasses]]),
                  "data-inertiaui-modal-entered": e.value
                }, [
                  t.config.closeButton ? (w(), X("div", Xn, [
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
    const e = g(!1);
    return (n, o) => (w(), X("div", Hn, [
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
          default: C(() => [
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
              default: C(() => [
                M(p(Ye), { "as-child": "" }, {
                  default: C(() => [
                    M(p(dt))
                  ]),
                  _: 1
                }),
                _("div", {
                  class: Z(["im-slideover-content relative", [t.config.paddingClasses, t.config.panelClasses]]),
                  "data-inertiaui-modal-entered": e.value
                }, [
                  t.config.closeButton ? (w(), X("div", Jn, [
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
    const n = g(null), o = g(!1);
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
        var i;
        return (i = n.value) == null ? void 0 : i.emit(...a);
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
        var i;
        return (i = n.value) == null ? void 0 : i.reload(...a);
      },
      setOpen: (...a) => {
        var i;
        return (i = n.value) == null ? void 0 : i.setOpen(...a);
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
    }), (a, i) => (w(), O(jt, {
      ref_key: "modal",
      ref: n,
      onSuccess: i[2] || (i[2] = (r) => a.$emit("success")),
      onClose: i[3] || (i[3] = (r) => a.$emit("close")),
      onFocus: i[4] || (i[4] = (r) => a.$emit("focus")),
      onBlur: i[5] || (i[5] = (r) => a.$emit("blur"))
    }, {
      default: C(({
        afterLeave: r,
        close: l,
        config: f,
        emit: d,
        getChildModal: c,
        getParentModal: v,
        id: u,
        index: m,
        isOpen: h,
        modalContext: x,
        onTopOfStack: y,
        reload: b,
        setOpen: A,
        shouldRender: T
      }) => [
        M(p(un), {
          open: h,
          "onUpdate:open": A
        }, {
          default: C(() => [
            M(p(Kn), null, {
              default: C(() => [
                _("div", {
                  "data-inertiaui-modal-id": u,
                  "data-inertiaui-modal-index": m,
                  class: "im-dialog relative z-20",
                  "aria-hidden": !y
                }, [
                  m === 0 && y ? (w(), O(Ie, {
                    key: 0,
                    appear: !o.value,
                    "enter-active-class": "transition transform ease-in-out duration-300",
                    "enter-from-class": "opacity-0",
                    "enter-to-class": "opacity-100",
                    "leave-active-class": "transition transform ease-in-out duration-300",
                    "leave-from-class": "opacity-100",
                    "leave-to-class": "opacity-0",
                    onAfterAppear: i[0] || (i[0] = (F) => o.value = !0)
                  }, {
                    default: C(() => [
                      M(p(jn), { class: "im-backdrop fixed inset-0 z-30 bg-black/75" })
                    ]),
                    _: 1
                  }, 8, ["appear"])) : R("", !0),
                  m > 0 && y ? (w(), X("div", Qn)) : R("", !0),
                  (w(), O(Pe(f != null && f.slideover ? Yn : zn), {
                    "modal-context": x,
                    config: f,
                    onAfterLeave: i[1] || (i[1] = (F) => a.$emit("after-leave"))
                  }, {
                    default: C(() => [
                      E(a.$slots, "default", {
                        id: u,
                        afterLeave: r,
                        close: l,
                        config: f,
                        emit: d,
                        getChildModal: c,
                        getParentModal: v,
                        index: m,
                        isOpen: h,
                        modalContext: x,
                        onTopOfStack: y,
                        reload: b,
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
    const n = t, o = g(!1), s = le(), a = g(null);
    $e("modalContext", a);
    const i = e, r = g(!1), l = S(() => n.navigate ?? Be("navigate"));
    P(
      () => {
        var h;
        return (h = a.value) == null ? void 0 : h.onTopOfStack;
      },
      (h) => {
        a.value && (h && r.value ? i("focus") : h || i("blur"), r.value = !h);
      }
    );
    const f = g(null);
    pe(() => {
      var h;
      (h = f.value) == null || h.call(f);
    });
    const d = Ke();
    function c() {
      f.value = a.value.registerEventListenersFromAttrs(d);
    }
    P(a, (h, x) => {
      h && !x && (c(), i("success"));
    });
    function v() {
      i("close");
    }
    function u() {
      a.value = null, i("after-leave");
    }
    function m() {
      o.value || (n.href.startsWith("#") || (o.value = !0, i("start")), s.visit(
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
      }).catch((h) => i("error", h)).finally(() => o.value = !1));
    }
    return (h, x) => (w(), O(Pe(t.as), k(p(d), {
      href: t.href,
      onClick: St(m, ["prevent"])
    }), {
      default: C(() => [
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
    const e = t, n = re("modalContext");
    if (!n)
      throw new Error("Deferred component must be used inside a Modal component");
    const o = g(!1), s = g(!1), a = g(null);
    let i = null;
    const r = () => {
      if (e.data)
        return { only: Array.isArray(e.data) ? e.data : [e.data] };
      if (!e.params)
        throw new Error("You must provide either a `data` or `params` prop.");
      return e.params;
    };
    return te(() => {
      a.value && (i = new IntersectionObserver(
        (f) => {
          if (!f[0].isIntersecting || (e.always || i.disconnect(), s.value))
            return;
          s.value = !0;
          const d = r();
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
      ), i.observe(a.value));
    }), j(() => i == null ? void 0 : i.disconnect()), (f, d) => (w(), O(Pe(e.as), {
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
    e.navigate ?? Be("navigate"),
    e.onStart,
    e.onSuccess,
    e.onError
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
  ro as putConfig,
  uo as renderApp,
  io as resetConfig,
  co as useModal,
  yo as visitModal
};
