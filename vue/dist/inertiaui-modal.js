var ut = Object.defineProperty;
var dt = (a, e, t) => e in a ? ut(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t;
var A = (a, e, t) => dt(a, typeof e != "symbol" ? e + "" : e, t);
import { computed as z, provide as Xe, openBlock as F, createBlock as B, unref as T, mergeProps as Ve, createCommentVNode as P, ref as k, onUnmounted as se, onBeforeMount as ct, watch as G, createElementBlock as D, Fragment as ze, renderSlot as Z, h as De, readonly as ft, markRaw as vt, nextTick as mt, inject as Ge, onBeforeUnmount as H, onMounted as ht, useAttrs as He, createElementVNode as R, normalizeClass as X, createVNode as ce, Transition as Te, withCtx as V, withDirectives as Fe, vShow as Ae, Teleport as bt, resolveDynamicComponent as Ze, withModifiers as pt, toValue as gt } from "vue";
import { router as ae, usePage as Ye } from "@inertiajs/vue3";
import { mergeDataIntoQueryString as xt } from "@inertiajs/core";
import fe from "axios";
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
class yt {
  constructor() {
    this.config = {}, this.reset();
  }
  reset() {
    this.config = JSON.parse(JSON.stringify(ee));
  }
  put(e, t) {
    if (typeof e == "object") {
      this.config = {
        type: e.type ?? ee.type,
        navigate: e.navigate ?? ee.navigate,
        modal: { ...ee.modal, ...e.modal ?? {} },
        slideover: { ...ee.slideover, ...e.slideover ?? {} }
      };
      return;
    }
    const n = e.split(".");
    let l = this.config;
    for (let r = 0; r < n.length - 1; r++)
      l = l[n[r]] = l[n[r]] || {};
    l[n[n.length - 1]] = t;
  }
  get(e) {
    if (typeof e > "u")
      return this.config;
    const t = e.split(".");
    let n = this.config;
    for (const l of t) {
      if (n[l] === void 0)
        return null;
      n = n[l];
    }
    return n;
  }
}
const ge = new yt(), Fa = () => ge.reset(), Aa = (a, e) => ge.put(a, e), Re = (a) => ge.get(a), U = (a, e) => ge.get(a ? `slideover.${e}` : `modal.${e}`), $e = {
  modifiedElements: [],
  bodyState: {
    hasOverflowHidden: !1,
    originalPaddingRight: ""
  },
  prepare() {
    const a = window.innerWidth - document.documentElement.clientWidth;
    this.bodyState.originalPaddingRight = document.body.style.paddingRight;
    const e = parseInt(window.getComputedStyle(document.body).paddingRight, 10);
    document.body.style.paddingRight = `${e + a}px`, document.body.classList.contains("overflow-hidden") || (document.body.classList.add("overflow-hidden"), this.bodyState.hasOverflowHidden = !0), Array.from(document.body.children).forEach((t) => {
      !t.classList.contains("im-dialog") && t.getAttribute("aria-hidden") !== "true" && (t.setAttribute("aria-hidden", "true"), this.modifiedElements.push(t));
    });
  },
  cleanup() {
    this.bodyState.hasOverflowHidden && (document.body.classList.remove("overflow-hidden"), this.bodyState.hasOverflowHidden = !1), document.body.style.paddingRight = this.bodyState.originalPaddingRight, this.bodyState.originalPaddingRight = "", this.modifiedElements.forEach((a) => {
      a.removeAttribute("aria-hidden");
    }), this.modifiedElements = [];
  }
};
function Ee(a = "inertiaui_modal_") {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `${a}${crypto.randomUUID()}` : `${a}${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
}
function wt(a, e) {
  return Array.isArray(a) ? a.filter((t) => !e.includes(t)) : Object.keys(a).reduce((t, n) => (e.includes(n) || (t[n] = a[n]), t), {});
}
function Je(a, e) {
  return Array.isArray(a) ? a.filter((t) => e.includes(t)) : e.reduce((t, n) => (n in a && (t[n] = a[n]), t), {});
}
function Ct(a) {
  return Array.isArray(a) ? a.filter((e) => e !== null) : Object.keys(a).reduce((e, t) => (t in a && a[t] !== null && (e[t] = a[t]), e), {});
}
function St(a, e = 3, t = 10) {
  return new Promise((n, l) => {
    const r = a();
    if (r) {
      n(r);
      return;
    }
    let i = e * 1e3 / t;
    const d = setInterval(() => {
      const f = a();
      f && (clearInterval(d), n(f)), --i <= 0 && (clearInterval(d), l(new Error("Condition not met in time")));
    }, t);
  });
}
function ue(a) {
  return a ? (a = a.replace(/_/g, "-"), a = a.replace(/-+/g, "-"), /[A-Z]/.test(a) ? (a = a.replace(/\s+/g, "").replace(/_/g, "").replace(/(?:^|\s|-)+([A-Za-z])/g, (e, t) => t.toUpperCase()), a = a.replace(/(.)(?=[A-Z])/g, "$1-"), a.toLowerCase()) : a) : "";
}
const Qe = {
  __name: "ModalRenderer",
  props: {
    index: {
      type: Number,
      required: !0
    }
  },
  setup(a) {
    const e = a, t = ie(), n = z(() => t.stack.value[e.index]);
    return Xe("modalContext", n), (l, r) => {
      var i;
      return (i = n.value) != null && i.component ? (F(), B(T(n).component, Ve({ key: 0 }, n.value.props, {
        onModalEvent: r[0] || (r[0] = (d, ...f) => n.value.emit(d, ...f))
      }), null, 16)) : P("", !0);
    };
  }
}, kt = {
  __name: "ModalRoot",
  setup(a) {
    const e = ie(), t = k(!1), n = k(null);
    se(ae.on("start", () => t.value = !0)), se(ae.on("finish", () => t.value = !1)), se(
      ae.on("navigate", (i) => {
        const d = i.detail.page.props._inertiaui_modal;
        if (!d) {
          n.value && e.closeAll();
          return;
        }
        n.value = d, e.setBaseUrl(d.baseUrl), e.pushFromResponseData(d, {}, () => {
          if (!d.baseUrl) {
            console.error("No base url in modal response data so cannot navigate back");
            return;
          }
          !t.value && window.location.href !== d.baseUrl && ae.visit(d.baseUrl, {
            preserveScroll: !0,
            preserveState: !0
          });
        });
      })
    );
    const l = (i) => (e.stack.value.length && (i.headers["X-InertiaUI-Modal-Base-Url"] = e.getBaseUrl()), i);
    ct(() => {
      fe.interceptors.request.use(l);
    }), se(() => {
      fe.interceptors.request.eject(l);
    });
    const r = Ye();
    return G(
      () => {
        var i;
        return (i = r.props) == null ? void 0 : i._inertiaui_modal;
      },
      (i, d) => {
        var f;
        i && d && i.component === d.component && i.url === d.url && ((f = e.stack.value[0]) == null || f.updateProps(i.props ?? {}));
      }
    ), (i, d) => (F(), D(ze, null, [
      Z(i.$slots, "default"),
      T(e).stack.value.length ? (F(), B(Qe, {
        key: 0,
        index: 0
      })) : P("", !0)
    ], 64));
  }
};
let xe = null;
const K = k({}), re = k(null), S = k([]), ve = k({}), Et = (a) => {
  xe = a;
}, Ra = (a) => {
  a.resolveComponent && (xe = a.resolveComponent);
};
class Nt {
  constructor(e, t, n, l, r) {
    A(this, "getParentModal", () => {
      const e = this.index.value;
      return e < 1 ? null : S.value.slice(0, e).reverse().find((t) => t.isOpen);
    });
    A(this, "getChildModal", () => {
      const e = this.index.value;
      return e === S.value.length - 1 ? null : S.value.slice(e + 1).find((t) => t.isOpen);
    });
    A(this, "show", () => {
      const e = this.index.value;
      if (e > -1) {
        if (S.value[e].isOpen)
          return;
        S.value[e].isOpen = !0, S.value[e].shouldRender = !0;
      }
    });
    A(this, "close", () => {
      var t;
      const e = this.index.value;
      if (e > -1) {
        if (!S.value[e].isOpen)
          return;
        Object.keys(this.listeners).forEach((n) => {
          this.off(n);
        }), S.value[e].isOpen = !1, (t = this.onCloseCallback) == null || t.call(this), this.onCloseCallback = null;
      }
    });
    A(this, "setOpen", (e) => {
      e ? this.show() : this.close();
    });
    A(this, "afterLeave", () => {
      var t;
      const e = this.index.value;
      if (e > -1) {
        if (S.value[e].isOpen)
          return;
        S.value[e].shouldRender = !1, (t = this.afterLeaveCallback) == null || t.call(this), this.afterLeaveCallback = null;
      }
      e === 0 && (S.value = []);
    });
    A(this, "on", (e, t) => {
      e = ue(e), this.listeners[e] = this.listeners[e] ?? [], this.listeners[e].push(t);
    });
    A(this, "off", (e, t) => {
      var n;
      e = ue(e), t ? this.listeners[e] = ((n = this.listeners[e]) == null ? void 0 : n.filter((l) => l !== t)) ?? [] : delete this.listeners[e];
    });
    A(this, "emit", (e, ...t) => {
      var n;
      (n = this.listeners[ue(e)]) == null || n.forEach((l) => l(...t));
    });
    A(this, "registerEventListenersFromAttrs", (e) => {
      const t = [];
      return Object.keys(e).filter((n) => n.startsWith("on")).forEach((n) => {
        const l = ue(n).replace(/^on-/, "");
        this.on(l, e[n]), t.push(() => this.off(l, e[n]));
      }), () => t.forEach((n) => n());
    });
    A(this, "reload", (e = {}) => {
      var n;
      let t = Object.keys(this.response.props);
      e.only && (t = Je(t, e.only)), e.except && (t = wt(t, e.except)), (n = this.response) != null && n.url && fe.get(this.response.url, {
        headers: {
          Accept: "text/html, application/xhtml+xml",
          "X-Inertia": !0,
          "X-Inertia-Partial-Component": this.response.component,
          "X-Inertia-Version": this.response.version,
          "X-Inertia-Partial-Data": t.join(","),
          "X-InertiaUI-Modal": Ee(),
          "X-InertiaUI-Modal-Use-Router": 0,
          "X-InertiaUI-Modal-Base-Url": re.value
        }
      }).then((l) => {
        this.updateProps(l.data.props);
      });
    });
    A(this, "updateProps", (e) => {
      Object.assign(this.props.value, e);
    });
    if (this.id = t.id ?? Ee(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = e, this.props = k(t.props), this.response = t, this.config = n ?? {}, this.onCloseCallback = l, this.afterLeaveCallback = r, K.value[this.id]) {
      this.config = {
        ...this.config,
        ...K.value[this.id].config ?? {}
      };
      const i = K.value[this.id].onClose, d = K.value[this.id].onAfterLeave;
      i && (this.onCloseCallback = l ? () => {
        l(), i();
      } : i), d && (this.afterLeaveCallback = r ? () => {
        r(), d();
      } : d), delete K.value[this.id];
    }
    this.index = z(() => S.value.findIndex((i) => i.id === this.id)), this.onTopOfStack = z(() => {
      var d;
      return S.value.length < 2 ? !0 : ((d = S.value.map((f) => ({ id: f.id, shouldRender: f.shouldRender })).reverse().find((f) => f.shouldRender)) == null ? void 0 : d.id) === this.id;
    });
  }
}
function Ot(a, e) {
  ve.value[a] = { name: a, callback: e };
}
function Tt(a, e, t, n) {
  if (!ve.value[a])
    throw new Error(`The local modal "${a}" has not been registered.`);
  const l = Ie(null, {}, e, t, n);
  return l.name = a, ve.value[a].callback(l), l;
}
function _e(a, e = {}, t = null, n = null) {
  return xe(a.component).then((l) => Ie(vt(l), a, e, t, n));
}
function Ft(a, e, t = {}, n = {}, l = {}, r = null, i = null, d = "brackets", f = !1) {
  const c = Ee();
  return new Promise((h, w) => {
    if (a.startsWith("#")) {
      h(Tt(a.substring(1), l, r, i));
      return;
    }
    const [O, s] = xt(e, a || "", t, d);
    let m = f && S.value.length === 0;
    if (S.value.length === 0 && (re.value = typeof window < "u" ? window.location.href : ""), n = {
      ...n,
      Accept: "text/html, application/xhtml+xml",
      "X-Requested-With": "XMLHttpRequest",
      "X-Inertia": !0,
      "X-Inertia-Version": Ye().version,
      "X-InertiaUI-Modal": c,
      "X-InertiaUI-Modal-Use-Router": m ? 1 : 0,
      "X-InertiaUI-Modal-Base-Url": re.value
    }, m)
      return K.value[c] = { config: l, onClose: r, onAfterLeave: i }, ae.visit(O, {
        method: e,
        data: s,
        headers: n,
        preserveScroll: !0,
        preserveState: !0,
        onError: w,
        onFinish: () => St(() => S.value[0]).then(h)
      });
    fe({ url: O, method: e, data: s, headers: n }).then((x) => h(_e(x.data, l, r, i))).catch(w);
  });
}
function Ie(a, e, t, n, l) {
  const r = new Nt(a, e, t, n, l);
  return S.value.push(r), mt(() => r.show()), r;
}
const At = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], Ia = (a, e) => (e.resolveComponent && (xe = e.resolveComponent), () => De(kt, () => De(a, e)));
function ie() {
  return {
    setComponentResolver: Et,
    getBaseUrl: () => re.value,
    setBaseUrl: (a) => re.value = a,
    stack: ft(S),
    push: Ie,
    pushFromResponseData: _e,
    closeAll: () => [...S.value].reverse().forEach((a) => a.close()),
    reset: () => S.value = [],
    visit: Ft,
    registerLocalModal: Ot,
    removeLocalModal: (a) => delete ve.value[a]
  };
}
const Rt = /* @__PURE__ */ Object.assign({
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
  setup(a, { expose: e, emit: t }) {
    const n = a, l = ie(), r = n.name ? k({}) : Ge("modalContext"), i = z(() => {
      var m;
      const s = ((m = r.value.config) == null ? void 0 : m.slideover) ?? n.slideover ?? Re("type") === "slideover";
      return {
        slideover: s,
        closeButton: n.closeButton ?? U(s, "closeButton"),
        closeExplicitly: n.closeExplicitly ?? U(s, "closeExplicitly"),
        maxWidth: n.maxWidth ?? U(s, "maxWidth"),
        paddingClasses: n.paddingClasses ?? U(s, "paddingClasses"),
        panelClasses: n.panelClasses ?? U(s, "panelClasses"),
        position: n.position ?? U(s, "position"),
        ...r.value.config
      };
    });
    n.name && (l.registerLocalModal(n.name, function(s) {
      r.value = s, c();
    }), H(() => {
      l.removeLocalModal(n.name);
    })), ht(() => {
      n.name || c();
    });
    const d = k(null);
    H(() => {
      var s;
      return (s = d.value) == null ? void 0 : s.call(d);
    });
    const f = He();
    function c() {
      d.value = r.value.registerEventListenersFromAttrs(f);
    }
    const h = t;
    function w(s, ...m) {
      h("modal-event", s, ...m);
    }
    e({
      emit: w,
      afterLeave: () => {
        var s;
        return (s = r.value) == null ? void 0 : s.afterLeave();
      },
      close: () => {
        var s;
        return (s = r.value) == null ? void 0 : s.close();
      },
      reload: (...s) => {
        var m;
        return (m = r.value) == null ? void 0 : m.reload(...s);
      },
      setOpen: (...s) => {
        var m;
        return (m = r.value) == null ? void 0 : m.setOpen(...s);
      },
      getChildModal: () => {
        var s;
        return (s = r.value) == null ? void 0 : s.getChildModal();
      },
      getParentModal: () => {
        var s;
        return (s = r.value) == null ? void 0 : s.getParentModal();
      },
      get config() {
        var s;
        return (s = r.value) == null ? void 0 : s.config;
      },
      get id() {
        var s;
        return (s = r.value) == null ? void 0 : s.id;
      },
      get index() {
        var s;
        return (s = r.value) == null ? void 0 : s.index;
      },
      get isOpen() {
        var s;
        return (s = r.value) == null ? void 0 : s.isOpen;
      },
      get modalContext() {
        var s;
        return (s = r.value) == null ? void 0 : s.modalContext;
      },
      get onTopOfStack() {
        var s;
        return (s = r.value) == null ? void 0 : s.onTopOfStack;
      },
      get shouldRender() {
        var s;
        return (s = r.value) == null ? void 0 : s.shouldRender;
      }
    }), G(
      () => {
        var s;
        return (s = r.value) == null ? void 0 : s.onTopOfStack;
      },
      (s, m) => {
        s && !m ? h("focus") : !s && m && h("blur");
      }
    ), G(
      () => {
        var s;
        return (s = r.value) == null ? void 0 : s.isOpen;
      },
      (s) => {
        h(s ? "success" : "close");
      },
      { immediate: !0 }
    );
    const O = z(() => {
      var s;
      return (s = l.stack.value.find((m) => m.shouldRender && m.index > r.value.index)) == null ? void 0 : s.index;
    });
    return (s, m) => (F(), D(ze, null, [
      T(r).shouldRender ? Z(s.$slots, "default", {
        key: 0,
        id: T(r).id,
        afterLeave: T(r).afterLeave,
        close: T(r).close,
        config: i.value,
        emit: w,
        getChildModal: T(r).getChildModal,
        getParentModal: T(r).getParentModal,
        index: T(r).index,
        isOpen: T(r).isOpen,
        modalContext: T(r),
        onTopOfStack: T(r).onTopOfStack,
        reload: T(r).reload,
        setOpen: T(r).setOpen,
        shouldRender: T(r).shouldRender
      }) : P("", !0),
      O.value ? (F(), B(Qe, {
        key: 1,
        index: O.value
      }, null, 8, ["index"])) : P("", !0)
    ], 64));
  }
}), It = (a, e) => {
  const t = a.__vccOpts || a;
  for (const [n, l] of e)
    t[n] = l;
  return t;
}, Pt = {}, Lt = { class: "im-close-button text-gray-400 hover:text-gray-500" };
function Mt(a, e) {
  return F(), D("button", Lt, e[0] || (e[0] = [
    R("span", { class: "sr-only" }, "Close", -1),
    R("svg", {
      class: "size-6",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      "stroke-width": "2",
      stroke: "currentColor",
      "aria-hidden": "true"
    }, [
      R("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M6 18L18 6M6 6l12 12"
      })
    ], -1)
  ]));
}
const et = /* @__PURE__ */ It(Pt, [["render", Mt]]);
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var tt = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"], me = /* @__PURE__ */ tt.join(","), at = typeof Element > "u", W = at ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, he = !at && Element.prototype.getRootNode ? function(a) {
  var e;
  return a == null || (e = a.getRootNode) === null || e === void 0 ? void 0 : e.call(a);
} : function(a) {
  return a == null ? void 0 : a.ownerDocument;
}, be = function a(e, t) {
  var n;
  t === void 0 && (t = !0);
  var l = e == null || (n = e.getAttribute) === null || n === void 0 ? void 0 : n.call(e, "inert"), r = l === "" || l === "true", i = r || t && e && a(e.parentNode);
  return i;
}, Bt = function(e) {
  var t, n = e == null || (t = e.getAttribute) === null || t === void 0 ? void 0 : t.call(e, "contenteditable");
  return n === "" || n === "true";
}, nt = function(e, t, n) {
  if (be(e))
    return [];
  var l = Array.prototype.slice.apply(e.querySelectorAll(me));
  return t && W.call(e, me) && l.unshift(e), l = l.filter(n), l;
}, rt = function a(e, t, n) {
  for (var l = [], r = Array.from(e); r.length; ) {
    var i = r.shift();
    if (!be(i, !1))
      if (i.tagName === "SLOT") {
        var d = i.assignedElements(), f = d.length ? d : i.children, c = a(f, !0, n);
        n.flatten ? l.push.apply(l, c) : l.push({
          scopeParent: i,
          candidates: c
        });
      } else {
        var h = W.call(i, me);
        h && n.filter(i) && (t || !e.includes(i)) && l.push(i);
        var w = i.shadowRoot || // check for an undisclosed shadow
        typeof n.getShadowRoot == "function" && n.getShadowRoot(i), O = !be(w, !1) && (!n.shadowRootFilter || n.shadowRootFilter(i));
        if (w && O) {
          var s = a(w === !0 ? i.children : w.children, !0, n);
          n.flatten ? l.push.apply(l, s) : l.push({
            scopeParent: i,
            candidates: s
          });
        } else
          r.unshift.apply(r, i.children);
      }
  }
  return l;
}, it = function(e) {
  return !isNaN(parseInt(e.getAttribute("tabindex"), 10));
}, j = function(e) {
  if (!e)
    throw new Error("No node provided");
  return e.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName) || Bt(e)) && !it(e) ? 0 : e.tabIndex;
}, Dt = function(e, t) {
  var n = j(e);
  return n < 0 && t && !it(e) ? 0 : n;
}, $t = function(e, t) {
  return e.tabIndex === t.tabIndex ? e.documentOrder - t.documentOrder : e.tabIndex - t.tabIndex;
}, lt = function(e) {
  return e.tagName === "INPUT";
}, jt = function(e) {
  return lt(e) && e.type === "hidden";
}, Wt = function(e) {
  var t = e.tagName === "DETAILS" && Array.prototype.slice.apply(e.children).some(function(n) {
    return n.tagName === "SUMMARY";
  });
  return t;
}, Ut = function(e, t) {
  for (var n = 0; n < e.length; n++)
    if (e[n].checked && e[n].form === t)
      return e[n];
}, qt = function(e) {
  if (!e.name)
    return !0;
  var t = e.form || he(e), n = function(d) {
    return t.querySelectorAll('input[type="radio"][name="' + d + '"]');
  }, l;
  if (typeof window < "u" && typeof window.CSS < "u" && typeof window.CSS.escape == "function")
    l = n(window.CSS.escape(e.name));
  else
    try {
      l = n(e.name);
    } catch (i) {
      return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", i.message), !1;
    }
  var r = Ut(l, e.form);
  return !r || r === e;
}, Kt = function(e) {
  return lt(e) && e.type === "radio";
}, Xt = function(e) {
  return Kt(e) && !qt(e);
}, Vt = function(e) {
  var t, n = e && he(e), l = (t = n) === null || t === void 0 ? void 0 : t.host, r = !1;
  if (n && n !== e) {
    var i, d, f;
    for (r = !!((i = l) !== null && i !== void 0 && (d = i.ownerDocument) !== null && d !== void 0 && d.contains(l) || e != null && (f = e.ownerDocument) !== null && f !== void 0 && f.contains(e)); !r && l; ) {
      var c, h, w;
      n = he(l), l = (c = n) === null || c === void 0 ? void 0 : c.host, r = !!((h = l) !== null && h !== void 0 && (w = h.ownerDocument) !== null && w !== void 0 && w.contains(l));
    }
  }
  return r;
}, je = function(e) {
  var t = e.getBoundingClientRect(), n = t.width, l = t.height;
  return n === 0 && l === 0;
}, zt = function(e, t) {
  var n = t.displayCheck, l = t.getShadowRoot;
  if (getComputedStyle(e).visibility === "hidden")
    return !0;
  var r = W.call(e, "details>summary:first-of-type"), i = r ? e.parentElement : e;
  if (W.call(i, "details:not([open]) *"))
    return !0;
  if (!n || n === "full" || n === "legacy-full") {
    if (typeof l == "function") {
      for (var d = e; e; ) {
        var f = e.parentElement, c = he(e);
        if (f && !f.shadowRoot && l(f) === !0)
          return je(e);
        e.assignedSlot ? e = e.assignedSlot : !f && c !== e.ownerDocument ? e = c.host : e = f;
      }
      e = d;
    }
    if (Vt(e))
      return !e.getClientRects().length;
    if (n !== "legacy-full")
      return !0;
  } else if (n === "non-zero-area")
    return je(e);
  return !1;
}, Gt = function(e) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))
    for (var t = e.parentElement; t; ) {
      if (t.tagName === "FIELDSET" && t.disabled) {
        for (var n = 0; n < t.children.length; n++) {
          var l = t.children.item(n);
          if (l.tagName === "LEGEND")
            return W.call(t, "fieldset[disabled] *") ? !0 : !l.contains(e);
        }
        return !0;
      }
      t = t.parentElement;
    }
  return !1;
}, pe = function(e, t) {
  return !(t.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  be(t) || jt(t) || zt(t, e) || // For a details element with a summary, the summary element gets the focus
  Wt(t) || Gt(t));
}, Ne = function(e, t) {
  return !(Xt(t) || j(t) < 0 || !pe(e, t));
}, Ht = function(e) {
  var t = parseInt(e.getAttribute("tabindex"), 10);
  return !!(isNaN(t) || t >= 0);
}, Zt = function a(e) {
  var t = [], n = [];
  return e.forEach(function(l, r) {
    var i = !!l.scopeParent, d = i ? l.scopeParent : l, f = Dt(d, i), c = i ? a(l.candidates) : d;
    f === 0 ? i ? t.push.apply(t, c) : t.push(d) : n.push({
      documentOrder: r,
      tabIndex: f,
      item: l,
      isScope: i,
      content: c
    });
  }), n.sort($t).reduce(function(l, r) {
    return r.isScope ? l.push.apply(l, r.content) : l.push(r.content), l;
  }, []).concat(t);
}, Yt = function(e, t) {
  t = t || {};
  var n;
  return t.getShadowRoot ? n = rt([e], t.includeContainer, {
    filter: Ne.bind(null, t),
    flatten: !1,
    getShadowRoot: t.getShadowRoot,
    shadowRootFilter: Ht
  }) : n = nt(e, t.includeContainer, Ne.bind(null, t)), Zt(n);
}, Jt = function(e, t) {
  t = t || {};
  var n;
  return t.getShadowRoot ? n = rt([e], t.includeContainer, {
    filter: pe.bind(null, t),
    flatten: !0,
    getShadowRoot: t.getShadowRoot
  }) : n = nt(e, t.includeContainer, pe.bind(null, t)), n;
}, q = function(e, t) {
  if (t = t || {}, !e)
    throw new Error("No node provided");
  return W.call(e, me) === !1 ? !1 : Ne(t, e);
}, Qt = /* @__PURE__ */ tt.concat("iframe").join(","), ke = function(e, t) {
  if (t = t || {}, !e)
    throw new Error("No node provided");
  return W.call(e, Qt) === !1 ? !1 : pe(t, e);
};
/*!
* focus-trap 7.6.4
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
function Oe(a, e) {
  (e == null || e > a.length) && (e = a.length);
  for (var t = 0, n = Array(e); t < e; t++) n[t] = a[t];
  return n;
}
function _t(a) {
  if (Array.isArray(a)) return Oe(a);
}
function ea(a, e, t) {
  return (e = ia(e)) in a ? Object.defineProperty(a, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : a[e] = t, a;
}
function ta(a) {
  if (typeof Symbol < "u" && a[Symbol.iterator] != null || a["@@iterator"] != null) return Array.from(a);
}
function aa() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function We(a, e) {
  var t = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(a);
    e && (n = n.filter(function(l) {
      return Object.getOwnPropertyDescriptor(a, l).enumerable;
    })), t.push.apply(t, n);
  }
  return t;
}
function Ue(a) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? We(Object(t), !0).forEach(function(n) {
      ea(a, n, t[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(t)) : We(Object(t)).forEach(function(n) {
      Object.defineProperty(a, n, Object.getOwnPropertyDescriptor(t, n));
    });
  }
  return a;
}
function na(a) {
  return _t(a) || ta(a) || la(a) || aa();
}
function ra(a, e) {
  if (typeof a != "object" || !a) return a;
  var t = a[Symbol.toPrimitive];
  if (t !== void 0) {
    var n = t.call(a, e || "default");
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(a);
}
function ia(a) {
  var e = ra(a, "string");
  return typeof e == "symbol" ? e : e + "";
}
function la(a, e) {
  if (a) {
    if (typeof a == "string") return Oe(a, e);
    var t = {}.toString.call(a).slice(8, -1);
    return t === "Object" && a.constructor && (t = a.constructor.name), t === "Map" || t === "Set" ? Array.from(a) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? Oe(a, e) : void 0;
  }
}
var qe = {
  activateTrap: function(e, t) {
    if (e.length > 0) {
      var n = e[e.length - 1];
      n !== t && n._setPausedState(!0);
    }
    var l = e.indexOf(t);
    l === -1 || e.splice(l, 1), e.push(t);
  },
  deactivateTrap: function(e, t) {
    var n = e.indexOf(t);
    n !== -1 && e.splice(n, 1), e.length > 0 && !e[e.length - 1]._isManuallyPaused() && e[e.length - 1]._setPausedState(!1);
  }
}, oa = function(e) {
  return e.tagName && e.tagName.toLowerCase() === "input" && typeof e.select == "function";
}, sa = function(e) {
  return (e == null ? void 0 : e.key) === "Escape" || (e == null ? void 0 : e.key) === "Esc" || (e == null ? void 0 : e.keyCode) === 27;
}, ne = function(e) {
  return (e == null ? void 0 : e.key) === "Tab" || (e == null ? void 0 : e.keyCode) === 9;
}, ua = function(e) {
  return ne(e) && !e.shiftKey;
}, da = function(e) {
  return ne(e) && e.shiftKey;
}, Ke = function(e) {
  return setTimeout(e, 0);
}, te = function(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), l = 1; l < t; l++)
    n[l - 1] = arguments[l];
  return typeof e == "function" ? e.apply(void 0, n) : e;
}, de = function(e) {
  return e.target.shadowRoot && typeof e.composedPath == "function" ? e.composedPath()[0] : e.target;
}, ca = [], fa = function(e, t) {
  var n = (t == null ? void 0 : t.document) || document, l = (t == null ? void 0 : t.trapStack) || ca, r = Ue({
    returnFocusOnDeactivate: !0,
    escapeDeactivates: !0,
    delayInitialFocus: !0,
    isKeyForward: ua,
    isKeyBackward: da
  }, t), i = {
    // containers given to createFocusTrap()
    // @type {Array<HTMLElement>}
    containers: [],
    // list of objects identifying tabbable nodes in `containers` in the trap
    // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
    //  is active, but the trap should never get to a state where there isn't at least one group
    //  with at least one tabbable node in it (that would lead to an error condition that would
    //  result in an error being thrown)
    // @type {Array<{
    //   container: HTMLElement,
    //   tabbableNodes: Array<HTMLElement>, // empty if none
    //   focusableNodes: Array<HTMLElement>, // empty if none
    //   posTabIndexesFound: boolean,
    //   firstTabbableNode: HTMLElement|undefined,
    //   lastTabbableNode: HTMLElement|undefined,
    //   firstDomTabbableNode: HTMLElement|undefined,
    //   lastDomTabbableNode: HTMLElement|undefined,
    //   nextTabbableNode: (node: HTMLElement, forward: boolean) => HTMLElement|undefined
    // }>}
    containerGroups: [],
    // same order/length as `containers` list
    // references to objects in `containerGroups`, but only those that actually have
    //  tabbable nodes in them
    // NOTE: same order as `containers` and `containerGroups`, but __not necessarily__
    //  the same length
    tabbableGroups: [],
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: !1,
    paused: !1,
    manuallyPaused: !1,
    // timer ID for when delayInitialFocus is true and initial focus in this trap
    //  has been delayed during activation
    delayInitialFocusTimer: void 0,
    // the most recent KeyboardEvent for the configured nav key (typically [SHIFT+]TAB), if any
    recentNavEvent: void 0
  }, d, f = function(o, u, v) {
    return o && o[u] !== void 0 ? o[u] : r[v || u];
  }, c = function(o, u) {
    var v = typeof (u == null ? void 0 : u.composedPath) == "function" ? u.composedPath() : void 0;
    return i.containerGroups.findIndex(function(p) {
      var g = p.container, C = p.tabbableNodes;
      return g.contains(o) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (v == null ? void 0 : v.includes(g)) || C.find(function(b) {
        return b === o;
      });
    });
  }, h = function(o) {
    var u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, v = u.hasFallback, p = v === void 0 ? !1 : v, g = u.params, C = g === void 0 ? [] : g, b = r[o];
    if (typeof b == "function" && (b = b.apply(void 0, na(C))), b === !0 && (b = void 0), !b) {
      if (b === void 0 || b === !1)
        return b;
      throw new Error("`".concat(o, "` was specified but was not a node, or did not return a node"));
    }
    var E = b;
    if (typeof b == "string") {
      try {
        E = n.querySelector(b);
      } catch (N) {
        throw new Error("`".concat(o, '` appears to be an invalid selector; error="').concat(N.message, '"'));
      }
      if (!E && !p)
        throw new Error("`".concat(o, "` as selector refers to no known node"));
    }
    return E;
  }, w = function() {
    var o = h("initialFocus", {
      hasFallback: !0
    });
    if (o === !1)
      return !1;
    if (o === void 0 || o && !ke(o, r.tabbableOptions))
      if (c(n.activeElement) >= 0)
        o = n.activeElement;
      else {
        var u = i.tabbableGroups[0], v = u && u.firstTabbableNode;
        o = v || h("fallbackFocus");
      }
    else o === null && (o = h("fallbackFocus"));
    if (!o)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return o;
  }, O = function() {
    if (i.containerGroups = i.containers.map(function(o) {
      var u = Yt(o, r.tabbableOptions), v = Jt(o, r.tabbableOptions), p = u.length > 0 ? u[0] : void 0, g = u.length > 0 ? u[u.length - 1] : void 0, C = v.find(function(N) {
        return q(N);
      }), b = v.slice().reverse().find(function(N) {
        return q(N);
      }), E = !!u.find(function(N) {
        return j(N) > 0;
      });
      return {
        container: o,
        tabbableNodes: u,
        focusableNodes: v,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: E,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode: p,
        /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
        lastTabbableNode: g,
        // NOTE: DOM order is NOT NECESSARILY "document position" order, but figuring that out
        //  would require more than just https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
        //  because that API doesn't work with Shadow DOM as well as it should (@see
        //  https://github.com/whatwg/dom/issues/320) and since this first/last is only needed, so far,
        //  to address an edge case related to positive tabindex support, this seems like a much easier,
        //  "close enough most of the time" alternative for positive tabindexes which should generally
        //  be avoided anyway...
        /** First tabbable node in container, __DOM__ order; `undefined` if none. */
        firstDomTabbableNode: C,
        /** Last tabbable node in container, __DOM__ order; `undefined` if none. */
        lastDomTabbableNode: b,
        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function($) {
          var Q = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, M = u.indexOf($);
          return M < 0 ? Q ? v.slice(v.indexOf($) + 1).find(function(_) {
            return q(_);
          }) : v.slice(0, v.indexOf($)).reverse().find(function(_) {
            return q(_);
          }) : u[M + (Q ? 1 : -1)];
        }
      };
    }), i.tabbableGroups = i.containerGroups.filter(function(o) {
      return o.tabbableNodes.length > 0;
    }), i.tabbableGroups.length <= 0 && !h("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (i.containerGroups.find(function(o) {
      return o.posTabIndexesFound;
    }) && i.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, s = function(o) {
    var u = o.activeElement;
    if (u)
      return u.shadowRoot && u.shadowRoot.activeElement !== null ? s(u.shadowRoot) : u;
  }, m = function(o) {
    if (o !== !1 && o !== s(document)) {
      if (!o || !o.focus) {
        m(w());
        return;
      }
      o.focus({
        preventScroll: !!r.preventScroll
      }), i.mostRecentlyFocusedNode = o, oa(o) && o.select();
    }
  }, x = function(o) {
    var u = h("setReturnFocus", {
      params: [o]
    });
    return u || (u === !1 ? !1 : o);
  }, L = function(o) {
    var u = o.target, v = o.event, p = o.isBackward, g = p === void 0 ? !1 : p;
    u = u || de(v), O();
    var C = null;
    if (i.tabbableGroups.length > 0) {
      var b = c(u, v), E = b >= 0 ? i.containerGroups[b] : void 0;
      if (b < 0)
        g ? C = i.tabbableGroups[i.tabbableGroups.length - 1].lastTabbableNode : C = i.tabbableGroups[0].firstTabbableNode;
      else if (g) {
        var N = i.tabbableGroups.findIndex(function(Ce) {
          var Se = Ce.firstTabbableNode;
          return u === Se;
        });
        if (N < 0 && (E.container === u || ke(u, r.tabbableOptions) && !q(u, r.tabbableOptions) && !E.nextTabbableNode(u, !1)) && (N = b), N >= 0) {
          var $ = N === 0 ? i.tabbableGroups.length - 1 : N - 1, Q = i.tabbableGroups[$];
          C = j(u) >= 0 ? Q.lastTabbableNode : Q.lastDomTabbableNode;
        } else ne(v) || (C = E.nextTabbableNode(u, !1));
      } else {
        var M = i.tabbableGroups.findIndex(function(Ce) {
          var Se = Ce.lastTabbableNode;
          return u === Se;
        });
        if (M < 0 && (E.container === u || ke(u, r.tabbableOptions) && !q(u, r.tabbableOptions) && !E.nextTabbableNode(u)) && (M = b), M >= 0) {
          var _ = M === i.tabbableGroups.length - 1 ? 0 : M + 1, Be = i.tabbableGroups[_];
          C = j(u) >= 0 ? Be.firstTabbableNode : Be.firstDomTabbableNode;
        } else ne(v) || (C = E.nextTabbableNode(u));
      }
    } else
      C = h("fallbackFocus");
    return C;
  }, I = function(o) {
    var u = de(o);
    if (!(c(u, o) >= 0)) {
      if (te(r.clickOutsideDeactivates, o)) {
        d.deactivate({
          // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
          //  which will result in the outside click setting focus to the node
          //  that was clicked (and if not focusable, to "nothing"); by setting
          //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
          //  on activation (or the configured `setReturnFocus` node), whether the
          //  outside click was on a focusable node or not
          returnFocus: r.returnFocusOnDeactivate
        });
        return;
      }
      te(r.allowOutsideClick, o) || o.preventDefault();
    }
  }, le = function(o) {
    var u = de(o), v = c(u, o) >= 0;
    if (v || u instanceof Document)
      v && (i.mostRecentlyFocusedNode = u);
    else {
      o.stopImmediatePropagation();
      var p, g = !0;
      if (i.mostRecentlyFocusedNode)
        if (j(i.mostRecentlyFocusedNode) > 0) {
          var C = c(i.mostRecentlyFocusedNode), b = i.containerGroups[C].tabbableNodes;
          if (b.length > 0) {
            var E = b.findIndex(function(N) {
              return N === i.mostRecentlyFocusedNode;
            });
            E >= 0 && (r.isKeyForward(i.recentNavEvent) ? E + 1 < b.length && (p = b[E + 1], g = !1) : E - 1 >= 0 && (p = b[E - 1], g = !1));
          }
        } else
          i.containerGroups.some(function(N) {
            return N.tabbableNodes.some(function($) {
              return j($) > 0;
            });
          }) || (g = !1);
      else
        g = !1;
      g && (p = L({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: i.mostRecentlyFocusedNode,
        isBackward: r.isKeyBackward(i.recentNavEvent)
      })), m(p || i.mostRecentlyFocusedNode || w());
    }
    i.recentNavEvent = void 0;
  }, ye = function(o) {
    var u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    i.recentNavEvent = o;
    var v = L({
      event: o,
      isBackward: u
    });
    v && (ne(o) && o.preventDefault(), m(v));
  }, Y = function(o) {
    (r.isKeyForward(o) || r.isKeyBackward(o)) && ye(o, r.isKeyBackward(o));
  }, oe = function(o) {
    sa(o) && te(r.escapeDeactivates, o) !== !1 && (o.preventDefault(), d.deactivate());
  }, Pe = function(o) {
    var u = de(o);
    c(u, o) >= 0 || te(r.clickOutsideDeactivates, o) || te(r.allowOutsideClick, o) || (o.preventDefault(), o.stopImmediatePropagation());
  }, Le = function() {
    if (i.active)
      return qe.activateTrap(l, d), i.delayInitialFocusTimer = r.delayInitialFocus ? Ke(function() {
        m(w());
      }) : m(w()), n.addEventListener("focusin", le, !0), n.addEventListener("mousedown", I, {
        capture: !0,
        passive: !1
      }), n.addEventListener("touchstart", I, {
        capture: !0,
        passive: !1
      }), n.addEventListener("click", Pe, {
        capture: !0,
        passive: !1
      }), n.addEventListener("keydown", Y, {
        capture: !0,
        passive: !1
      }), n.addEventListener("keydown", oe), d;
  }, Me = function() {
    if (i.active)
      return n.removeEventListener("focusin", le, !0), n.removeEventListener("mousedown", I, !0), n.removeEventListener("touchstart", I, !0), n.removeEventListener("click", Pe, !0), n.removeEventListener("keydown", Y, !0), n.removeEventListener("keydown", oe), d;
  }, st = function(o) {
    var u = o.some(function(v) {
      var p = Array.from(v.removedNodes);
      return p.some(function(g) {
        return g === i.mostRecentlyFocusedNode;
      });
    });
    u && m(w());
  }, we = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(st) : void 0, J = function() {
    we && (we.disconnect(), i.active && !i.paused && i.containers.map(function(o) {
      we.observe(o, {
        subtree: !0,
        childList: !0
      });
    }));
  };
  return d = {
    get active() {
      return i.active;
    },
    get paused() {
      return i.paused;
    },
    activate: function(o) {
      if (i.active)
        return this;
      var u = f(o, "onActivate"), v = f(o, "onPostActivate"), p = f(o, "checkCanFocusTrap");
      p || O(), i.active = !0, i.paused = !1, i.nodeFocusedBeforeActivation = n.activeElement, u == null || u();
      var g = function() {
        p && O(), Le(), J(), v == null || v();
      };
      return p ? (p(i.containers.concat()).then(g, g), this) : (g(), this);
    },
    deactivate: function(o) {
      if (!i.active)
        return this;
      var u = Ue({
        onDeactivate: r.onDeactivate,
        onPostDeactivate: r.onPostDeactivate,
        checkCanReturnFocus: r.checkCanReturnFocus
      }, o);
      clearTimeout(i.delayInitialFocusTimer), i.delayInitialFocusTimer = void 0, Me(), i.active = !1, i.paused = !1, J(), qe.deactivateTrap(l, d);
      var v = f(u, "onDeactivate"), p = f(u, "onPostDeactivate"), g = f(u, "checkCanReturnFocus"), C = f(u, "returnFocus", "returnFocusOnDeactivate");
      v == null || v();
      var b = function() {
        Ke(function() {
          C && m(x(i.nodeFocusedBeforeActivation)), p == null || p();
        });
      };
      return C && g ? (g(x(i.nodeFocusedBeforeActivation)).then(b, b), this) : (b(), this);
    },
    pause: function(o) {
      return i.active ? (i.manuallyPaused = !0, this._setPausedState(!0, o)) : this;
    },
    unpause: function(o) {
      return i.active ? (i.manuallyPaused = !1, l[l.length - 1] !== this ? this : this._setPausedState(!1, o)) : this;
    },
    updateContainerElements: function(o) {
      var u = [].concat(o).filter(Boolean);
      return i.containers = u.map(function(v) {
        return typeof v == "string" ? n.querySelector(v) : v;
      }), i.active && O(), J(), this;
    }
  }, Object.defineProperties(d, {
    _isManuallyPaused: {
      value: function() {
        return i.manuallyPaused;
      }
    },
    _setPausedState: {
      value: function(o, u) {
        if (i.paused === o)
          return this;
        if (i.paused = o, o) {
          var v = f(u, "onPause"), p = f(u, "onPostPause");
          v == null || v(), Me(), J(), p == null || p();
        } else {
          var g = f(u, "onUnpause"), C = f(u, "onPostUnpause");
          g == null || g(), O(), Le(), J(), C == null || C();
        }
        return this;
      }
    }
  }), d.updateContainerElements(e), d;
};
function ot(a, e, t) {
  const n = k(null);
  return a && (n.value = fa(a, {
    clickOutsideDeactivates: !e,
    escapeDeactivates: !e,
    onDeactivate: () => t == null ? void 0 : t(),
    fallbackFocus: () => a
  }), n.value.activate()), {
    deactivate: () => {
      var r;
      (r = n.value) == null || r.deactivate(), n.value = null;
    },
    wrapper: a
  };
}
const va = { class: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4" }, ma = ["data-inertiaui-modal-entered"], ha = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, ba = {
  __name: "ModalContent",
  props: {
    modalContext: Object,
    config: Object
  },
  emits: ["after-leave"],
  setup(a, { emit: e }) {
    const t = a, n = k(!1), l = k(null);
    let r = null;
    const i = e;
    function d() {
      var c;
      r = ot(l.value, (c = t.config) == null ? void 0 : c.closeExplicitly, () => t.modalContext.close()).deactivate, n.value = !0;
    }
    function f() {
      var c, h;
      (h = (c = t.modalContext).afterLeave) == null || h.call(c), i("after-leave");
    }
    return H(() => r == null ? void 0 : r()), (c, h) => (F(), D("div", va, [
      R("div", {
        class: X(["im-modal-positioner flex min-h-full justify-center", {
          "items-start": a.config.position === "top",
          "items-center": a.config.position === "center",
          "items-end": a.config.position === "bottom"
        }])
      }, [
        ce(Te, {
          appear: "",
          "enter-from-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          "enter-to-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-from-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-to-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          onAfterEnter: d,
          onAfterLeave: f
        }, {
          default: V(() => [
            Fe(R("div", {
              ref_key: "wrapper",
              ref: l,
              class: X({
                "im-modal-wrapper w-full transition duration-300 ease-in-out": !0,
                "blur-sm": !a.modalContext.onTopOfStack,
                "sm:max-w-sm": a.config.maxWidth == "sm",
                "sm:max-w-md": a.config.maxWidth == "md",
                "sm:max-w-md md:max-w-lg": a.config.maxWidth == "lg",
                "sm:max-w-md md:max-w-xl": a.config.maxWidth == "xl",
                "sm:max-w-md md:max-w-xl lg:max-w-2xl": a.config.maxWidth == "2xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl": a.config.maxWidth == "3xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl": a.config.maxWidth == "4xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl": a.config.maxWidth == "5xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl": a.config.maxWidth == "6xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl": a.config.maxWidth == "7xl"
              })
            }, [
              R("div", {
                class: X(["im-modal-content relative", [a.config.paddingClasses, a.config.panelClasses]]),
                "data-inertiaui-modal-entered": n.value
              }, [
                a.config.closeButton ? (F(), D("div", ha, [
                  ce(et, {
                    onClick: a.modalContext.close
                  }, null, 8, ["onClick"])
                ])) : P("", !0),
                Z(c.$slots, "default", {
                  modalContext: a.modalContext,
                  config: a.config
                })
              ], 10, ma)
            ], 2), [
              [Ae, a.modalContext.isOpen]
            ])
          ]),
          _: 3
        })
      ], 2)
    ]));
  }
}, pa = { class: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden" }, ga = ["data-inertiaui-modal-entered"], xa = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, ya = {
  __name: "SlideoverContent",
  props: {
    modalContext: Object,
    config: Object
  },
  emits: ["after-leave"],
  setup(a, { emit: e }) {
    const t = a, n = k(!1), l = k(null);
    let r = null;
    const i = e;
    function d() {
      var c;
      r = ot(l.value, (c = t.config) == null ? void 0 : c.closeExplicitly, () => t.modalContext.close()).deactivate, n.value = !0;
    }
    function f() {
      var c, h;
      (h = (c = t.modalContext).afterLeave) == null || h.call(c), i("after-leave");
    }
    return H(() => r == null ? void 0 : r()), (c, h) => (F(), D("div", pa, [
      R("div", {
        class: X(["im-slideover-positioner flex min-h-full items-center", {
          "justify-start rtl:justify-end": a.config.position === "left",
          "justify-end rtl:justify-start": a.config.position === "right"
        }])
      }, [
        ce(Te, {
          appear: "",
          "enter-from-class": "opacity-0 " + (a.config.position === "left" ? "-translate-x-full" : "translate-x-full"),
          "enter-to-class": "opacity-100 translate-x-0",
          "leave-from-class": "opacity-100 translate-x-0",
          "leave-to-class": "opacity-0 " + (a.config.position === "left" ? "-translate-x-full" : "translate-x-full"),
          onAfterEnter: d,
          onAfterLeave: f
        }, {
          default: V(() => [
            Fe(R("div", {
              ref_key: "wrapper",
              ref: l,
              class: X({
                "im-slideover-wrapper w-full transition duration-300 ease-in-out": !0,
                "blur-sm": !a.modalContext.onTopOfStack,
                "sm:max-w-sm": a.config.maxWidth == "sm",
                "sm:max-w-md": a.config.maxWidth == "md",
                "sm:max-w-md md:max-w-lg": a.config.maxWidth == "lg",
                "sm:max-w-md md:max-w-xl": a.config.maxWidth == "xl",
                "sm:max-w-md md:max-w-xl lg:max-w-2xl": a.config.maxWidth == "2xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl": a.config.maxWidth == "3xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl": a.config.maxWidth == "4xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl": a.config.maxWidth == "5xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl": a.config.maxWidth == "6xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl": a.config.maxWidth == "7xl"
              })
            }, [
              R("div", {
                class: X(["im-slideover-content relative", [a.config.paddingClasses, a.config.panelClasses]]),
                "data-inertiaui-modal-entered": n.value
              }, [
                a.config.closeButton ? (F(), D("div", xa, [
                  ce(et, {
                    onClick: a.modalContext.close
                  }, null, 8, ["onClick"])
                ])) : P("", !0),
                Z(c.$slots, "default", {
                  modalContext: a.modalContext,
                  config: a.config
                })
              ], 10, ga)
            ], 2), [
              [Ae, a.modalContext.isOpen]
            ])
          ]),
          _: 3
        }, 8, ["enter-from-class", "leave-to-class"])
      ], 2)
    ]));
  }
}, wa = ["data-inertiaui-modal-id", "data-inertiaui-modal-index", "aria-hidden"], Ca = { class: "im-backdrop fixed inset-0 z-30 bg-black/75" }, Sa = {
  key: 1,
  class: "im-backdrop fixed inset-0 z-30 bg-black/75"
}, Pa = {
  __name: "Modal",
  emits: ["after-leave", "blur", "close", "focus", "success"],
  setup(a, { expose: e }) {
    const t = k(null), n = k(!1), l = k(!1);
    return G(
      () => t.value,
      (r) => {
        (r == null ? void 0 : r.index) === 0 && ($e.prepare(), l.value = !0);
      }
    ), H(() => {
      l.value && $e.cleanup();
    }), e({
      afterLeave: () => {
        var r;
        return (r = t.value) == null ? void 0 : r.afterLeave();
      },
      close: () => {
        var r;
        return (r = t.value) == null ? void 0 : r.close();
      },
      emit: (...r) => {
        var i;
        return (i = t.value) == null ? void 0 : i.emit(...r);
      },
      getChildModal: () => {
        var r;
        return (r = t.value) == null ? void 0 : r.getChildModal();
      },
      getParentModal: () => {
        var r;
        return (r = t.value) == null ? void 0 : r.getParentModal();
      },
      reload: (...r) => {
        var i;
        return (i = t.value) == null ? void 0 : i.reload(...r);
      },
      setOpen: (...r) => {
        var i;
        return (i = t.value) == null ? void 0 : i.setOpen(...r);
      },
      get config() {
        var r;
        return (r = t.value) == null ? void 0 : r.config;
      },
      get id() {
        var r;
        return (r = t.value) == null ? void 0 : r.id;
      },
      get index() {
        var r;
        return (r = t.value) == null ? void 0 : r.index;
      },
      get isOpen() {
        var r;
        return (r = t.value) == null ? void 0 : r.isOpen;
      },
      get modalContext() {
        var r;
        return (r = t.value) == null ? void 0 : r.modalContext;
      },
      get onTopOfStack() {
        var r;
        return (r = t.value) == null ? void 0 : r.onTopOfStack;
      },
      get shouldRender() {
        var r;
        return (r = t.value) == null ? void 0 : r.shouldRender;
      }
    }), (r, i) => (F(), B(Rt, {
      ref_key: "modal",
      ref: t,
      onSuccess: i[2] || (i[2] = (d) => r.$emit("success")),
      onClose: i[3] || (i[3] = (d) => r.$emit("close")),
      onFocus: i[4] || (i[4] = (d) => r.$emit("focus")),
      onBlur: i[5] || (i[5] = (d) => r.$emit("blur"))
    }, {
      default: V(({
        afterLeave: d,
        close: f,
        config: c,
        emit: h,
        getChildModal: w,
        getParentModal: O,
        id: s,
        index: m,
        isOpen: x,
        modalContext: L,
        onTopOfStack: I,
        reload: le,
        setOpen: ye,
        shouldRender: Y
      }) => [
        Y ? (F(), B(bt, {
          key: 0,
          to: "body"
        }, [
          R("div", {
            "data-inertiaui-modal-id": s,
            "data-inertiaui-modal-index": m,
            class: "im-dialog relative z-20",
            "aria-hidden": !I
          }, [
            m === 0 && I ? (F(), B(Te, {
              key: 0,
              appear: !n.value,
              "enter-active-class": "transition transform ease-in-out duration-300",
              "enter-from-class": "opacity-0",
              "enter-to-class": "opacity-100",
              "leave-active-class": "transition transform ease-in-out duration-300",
              "leave-from-class": "opacity-100",
              "leave-to-class": "opacity-0",
              onAfterAppear: i[0] || (i[0] = (oe) => n.value = !0)
            }, {
              default: V(() => [
                Fe(R("div", Ca, null, 512), [
                  [Ae, x]
                ])
              ]),
              _: 2
            }, 1032, ["appear"])) : P("", !0),
            m > 0 && I ? (F(), D("div", Sa)) : P("", !0),
            (F(), B(Ze(c != null && c.slideover ? ya : ba), {
              "modal-context": L,
              config: c,
              onAfterLeave: i[1] || (i[1] = (oe) => r.$emit("after-leave"))
            }, {
              default: V(() => [
                Z(r.$slots, "default", {
                  id: s,
                  afterLeave: d,
                  close: f,
                  config: c,
                  emit: h,
                  getChildModal: w,
                  getParentModal: O,
                  index: m,
                  isOpen: x,
                  modalContext: L,
                  onTopOfStack: I,
                  reload: le,
                  setOpen: ye,
                  shouldRender: Y
                })
              ]),
              _: 2
            }, 1064, ["modal-context", "config"]))
          ], 8, wa)
        ])) : P("", !0)
      ]),
      _: 3
    }, 512));
  }
}, La = {
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
  setup(a, { emit: e }) {
    const t = a, n = k(!1), l = ie(), r = k(null);
    Xe("modalContext", r);
    const i = e, d = k(!1), f = z(() => t.navigate ?? Re("navigate"));
    G(
      () => {
        var x;
        return (x = r.value) == null ? void 0 : x.onTopOfStack;
      },
      (x) => {
        r.value && (x && d.value ? i("focus") : x || i("blur"), d.value = !x);
      }
    );
    const c = k(null);
    H(() => {
      var x;
      (x = c.value) == null || x.call(c);
    });
    const h = He();
    function w() {
      c.value = r.value.registerEventListenersFromAttrs(h);
    }
    G(r, (x, L) => {
      x && !L && (w(), i("success"));
    });
    function O() {
      i("close");
    }
    function s() {
      r.value = null, i("after-leave");
    }
    function m() {
      n.value || (t.href.startsWith("#") || (n.value = !0, i("start")), l.visit(
        t.href,
        t.method,
        t.data,
        t.headers,
        Ct(Je(t, At)),
        O,
        s,
        t.queryStringArrayFormat,
        f.value
      ).then((x) => {
        r.value = x;
      }).catch((x) => i("error", x)).finally(() => n.value = !1));
    }
    return (x, L) => (F(), B(Ze(a.as), Ve(T(h), {
      href: a.href,
      onClick: pt(m, ["prevent"])
    }), {
      default: V(() => [
        Z(x.$slots, "default", { loading: n.value })
      ]),
      _: 3
    }, 16, ["href"]));
  }
};
function Ma() {
  return gt(Ge("modalContext", null));
}
function Ba(a, e = {}) {
  return ie().visit(
    a,
    e.method ?? "get",
    e.data ?? {},
    e.headers ?? {},
    e.config ?? {},
    e.onClose,
    e.onAfterLeave,
    e.queryStringArrayFormat ?? "brackets",
    e.navigate ?? Re("navigate")
  ).then((t) => {
    const n = e.listeners ?? {};
    return Object.keys(n).forEach((l) => {
      const r = l.replace(/([A-Z])/g, "-$1").toLowerCase();
      t.on(r, n[l]);
    }), t;
  });
}
export {
  Rt as HeadlessModal,
  Pa as Modal,
  La as ModalLink,
  kt as ModalRoot,
  Re as getConfig,
  Ra as initFromPageProps,
  Aa as putConfig,
  Ia as renderApp,
  Fa as resetConfig,
  Ma as useModal,
  Ba as visitModal
};
