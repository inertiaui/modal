var ut = Object.defineProperty;
var dt = (n, e, t) => e in n ? ut(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var A = (n, e, t) => dt(n, typeof e != "symbol" ? e + "" : e, t);
import { computed as z, provide as Xe, openBlock as F, createBlock as M, unref as O, mergeProps as Ve, createCommentVNode as P, ref as S, onUnmounted as se, onBeforeMount as ct, watch as G, createElementBlock as D, Fragment as ze, renderSlot as Z, h as De, readonly as ft, markRaw as vt, nextTick as mt, inject as Ge, onBeforeUnmount as H, onMounted as ht, useAttrs as He, createElementVNode as R, normalizeClass as X, createVNode as ce, Transition as Oe, withCtx as V, withDirectives as Fe, vShow as Ae, Teleport as bt, resolveDynamicComponent as Ze, withModifiers as pt, toValue as gt } from "vue";
import { router as ne, usePage as Ye } from "@inertiajs/vue3";
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
    const a = e.split(".");
    let o = this.config;
    for (let r = 0; r < a.length - 1; r++)
      o = o[a[r]] = o[a[r]] || {};
    o[a[a.length - 1]] = t;
  }
  get(e) {
    if (typeof e > "u")
      return this.config;
    const t = e.split(".");
    let a = this.config;
    for (const o of t) {
      if (a[o] === void 0)
        return null;
      a = a[o];
    }
    return a;
  }
}
const ge = new yt(), An = () => ge.reset(), Rn = (n, e) => ge.put(n, e), Re = (n) => ge.get(n), W = (n, e) => ge.get(n ? `slideover.${e}` : `modal.${e}`), $e = {
  modifiedElements: [],
  bodyState: {
    hasOverflowHidden: !1,
    hasPointerEventsNone: !1,
    originalPaddingRight: ""
  },
  prepare() {
    const n = window.innerWidth - document.documentElement.clientWidth;
    this.bodyState.originalPaddingRight = document.body.style.paddingRight;
    const e = parseInt(window.getComputedStyle(document.body).paddingRight, 10);
    document.body.style.paddingRight = `${e + n}px`, document.body.classList.contains("overflow-hidden") || (document.body.classList.add("overflow-hidden"), this.bodyState.hasOverflowHidden = !0), document.body.classList.contains("pointer-events-none") || (document.body.classList.add("pointer-events-none"), this.bodyState.hasPointerEventsNone = !0), Array.from(document.body.children).forEach((t) => {
      !t.classList.contains("im-dialog") && t.getAttribute("aria-hidden") !== "true" && (t.setAttribute("aria-hidden", "true"), this.modifiedElements.push(t));
    });
  },
  cleanup() {
    this.bodyState.hasOverflowHidden && (document.body.classList.remove("overflow-hidden"), this.bodyState.hasOverflowHidden = !1), this.bodyState.hasPointerEventsNone && (document.body.classList.remove("pointer-events-none"), this.bodyState.hasPointerEventsNone = !1), document.body.style.paddingRight = this.bodyState.originalPaddingRight, this.bodyState.originalPaddingRight = "", this.modifiedElements.forEach((n) => {
      n.removeAttribute("aria-hidden");
    }), this.modifiedElements = [];
  }
};
function Ee(n = "inertiaui_modal_") {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `${n}${crypto.randomUUID()}` : `${n}${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
}
function wt(n, e) {
  return Array.isArray(n) ? n.filter((t) => !e.includes(t)) : Object.keys(n).reduce((t, a) => (e.includes(a) || (t[a] = n[a]), t), {});
}
function Je(n, e) {
  return Array.isArray(n) ? n.filter((t) => e.includes(t)) : e.reduce((t, a) => (a in n && (t[a] = n[a]), t), {});
}
function Ct(n) {
  return Array.isArray(n) ? n.filter((e) => e !== null) : Object.keys(n).reduce((e, t) => (t in n && n[t] !== null && (e[t] = n[t]), e), {});
}
function St(n, e = 3, t = 10) {
  return new Promise((a, o) => {
    const r = n();
    if (r) {
      a(r);
      return;
    }
    let i = e * 1e3 / t;
    const d = setInterval(() => {
      const f = n();
      f && (clearInterval(d), a(f)), --i <= 0 && (clearInterval(d), o(new Error("Condition not met in time")));
    }, t);
  });
}
function ue(n) {
  return n ? (n = n.replace(/_/g, "-"), n = n.replace(/-+/g, "-"), /[A-Z]/.test(n) ? (n = n.replace(/\s+/g, "").replace(/_/g, "").replace(/(?:^|\s|-)+([A-Za-z])/g, (e, t) => t.toUpperCase()), n = n.replace(/(.)(?=[A-Z])/g, "$1-"), n.toLowerCase()) : n) : "";
}
const Qe = {
  __name: "ModalRenderer",
  props: {
    index: {
      type: Number,
      required: !0
    }
  },
  setup(n) {
    const e = n, t = ie(), a = z(() => t.stack.value[e.index]);
    return Xe("modalContext", a), (o, r) => {
      var i;
      return (i = a.value) != null && i.component ? (F(), M(O(a).component, Ve({ key: 0 }, a.value.props, {
        onModalEvent: r[0] || (r[0] = (d, ...f) => a.value.emit(d, ...f))
      }), null, 16)) : P("", !0);
    };
  }
}, kt = {
  __name: "ModalRoot",
  setup(n) {
    const e = ie(), t = S(!1), a = S(null);
    se(ne.on("start", () => t.value = !0)), se(ne.on("finish", () => t.value = !1)), se(
      ne.on("navigate", (i) => {
        const d = i.detail.page.props._inertiaui_modal;
        if (!d) {
          a.value && e.closeAll();
          return;
        }
        a.value = d, e.setBaseUrl(d.baseUrl), e.pushFromResponseData(d, {}, () => {
          if (!d.baseUrl) {
            console.error("No base url in modal response data so cannot navigate back");
            return;
          }
          !t.value && window.location.href !== d.baseUrl && ne.visit(d.baseUrl, {
            preserveScroll: !0,
            preserveState: !0
          });
        });
      })
    );
    const o = (i) => (e.stack.value.length && (i.headers["X-InertiaUI-Modal-Base-Url"] = e.getBaseUrl()), i);
    ct(() => {
      fe.interceptors.request.use(o);
    }), se(() => {
      fe.interceptors.request.eject(o);
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
      O(e).stack.value.length ? (F(), M(Qe, {
        key: 0,
        index: 0
      })) : P("", !0)
    ], 64));
  }
};
let xe = null;
const K = S({}), re = S(null), C = S([]), ve = S({}), Et = (n) => {
  xe = n;
}, In = (n) => {
  n.resolveComponent && (xe = n.resolveComponent);
};
class Nt {
  constructor(e, t, a, o, r) {
    A(this, "getParentModal", () => {
      const e = this.index.value;
      return e < 1 ? null : C.value.slice(0, e).reverse().find((t) => t.isOpen);
    });
    A(this, "getChildModal", () => {
      const e = this.index.value;
      return e === C.value.length - 1 ? null : C.value.slice(e + 1).find((t) => t.isOpen);
    });
    A(this, "show", () => {
      const e = this.index.value;
      if (e > -1) {
        if (C.value[e].isOpen)
          return;
        C.value[e].isOpen = !0, C.value[e].shouldRender = !0;
      }
    });
    A(this, "close", () => {
      var t;
      const e = this.index.value;
      if (e > -1) {
        if (!C.value[e].isOpen)
          return;
        Object.keys(this.listeners).forEach((a) => {
          this.off(a);
        }), C.value[e].isOpen = !1, (t = this.onCloseCallback) == null || t.call(this), this.onCloseCallback = null;
      }
    });
    A(this, "setOpen", (e) => {
      e ? this.show() : this.close();
    });
    A(this, "afterLeave", () => {
      var t;
      const e = this.index.value;
      if (e > -1) {
        if (C.value[e].isOpen)
          return;
        C.value[e].shouldRender = !1, (t = this.afterLeaveCallback) == null || t.call(this), this.afterLeaveCallback = null;
      }
      e === 0 && (C.value = []);
    });
    A(this, "on", (e, t) => {
      e = ue(e), this.listeners[e] = this.listeners[e] ?? [], this.listeners[e].push(t);
    });
    A(this, "off", (e, t) => {
      var a;
      e = ue(e), t ? this.listeners[e] = ((a = this.listeners[e]) == null ? void 0 : a.filter((o) => o !== t)) ?? [] : delete this.listeners[e];
    });
    A(this, "emit", (e, ...t) => {
      var a;
      (a = this.listeners[ue(e)]) == null || a.forEach((o) => o(...t));
    });
    A(this, "registerEventListenersFromAttrs", (e) => {
      const t = [];
      return Object.keys(e).filter((a) => a.startsWith("on")).forEach((a) => {
        const o = ue(a).replace(/^on-/, "");
        this.on(o, e[a]), t.push(() => this.off(o, e[a]));
      }), () => t.forEach((a) => a());
    });
    A(this, "reload", (e = {}) => {
      var a;
      let t = Object.keys(this.response.props);
      e.only && (t = Je(t, e.only)), e.except && (t = wt(t, e.except)), (a = this.response) != null && a.url && fe.get(this.response.url, {
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
      }).then((o) => {
        this.updateProps(o.data.props);
      });
    });
    A(this, "updateProps", (e) => {
      Object.assign(this.props.value, e);
    });
    if (this.id = t.id ?? Ee(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = e, this.props = S(t.props), this.response = t, this.config = a ?? {}, this.onCloseCallback = o, this.afterLeaveCallback = r, K.value[this.id]) {
      this.config = {
        ...this.config,
        ...K.value[this.id].config ?? {}
      };
      const i = K.value[this.id].onClose, d = K.value[this.id].onAfterLeave;
      i && (this.onCloseCallback = o ? () => {
        o(), i();
      } : i), d && (this.afterLeaveCallback = r ? () => {
        r(), d();
      } : d), delete K.value[this.id];
    }
    this.index = z(() => C.value.findIndex((i) => i.id === this.id)), this.onTopOfStack = z(() => {
      var d;
      return C.value.length < 2 ? !0 : ((d = C.value.map((f) => ({ id: f.id, shouldRender: f.shouldRender })).reverse().find((f) => f.shouldRender)) == null ? void 0 : d.id) === this.id;
    });
  }
}
function Tt(n, e) {
  ve.value[n] = { name: n, callback: e };
}
function Ot(n, e, t, a) {
  if (!ve.value[n])
    throw new Error(`The local modal "${n}" has not been registered.`);
  const o = Ie(null, {}, e, t, a);
  return o.name = n, ve.value[n].callback(o), o;
}
function _e(n, e = {}, t = null, a = null) {
  return xe(n.component).then((o) => Ie(vt(o), n, e, t, a));
}
function Ft(n, e, t = {}, a = {}, o = {}, r = null, i = null, d = "brackets", f = !1) {
  const c = Ee();
  return new Promise((h, y) => {
    if (n.startsWith("#")) {
      h(Ot(n.substring(1), o, r, i));
      return;
    }
    const [T, u] = xt(e, n || "", t, d);
    let m = f && C.value.length === 0;
    if (C.value.length === 0 && (re.value = typeof window < "u" ? window.location.href : ""), a = {
      ...a,
      Accept: "text/html, application/xhtml+xml",
      "X-Requested-With": "XMLHttpRequest",
      "X-Inertia": !0,
      "X-Inertia-Version": Ye().version,
      "X-InertiaUI-Modal": c,
      "X-InertiaUI-Modal-Use-Router": m ? 1 : 0,
      "X-InertiaUI-Modal-Base-Url": re.value
    }, m)
      return K.value[c] = { config: o, onClose: r, onAfterLeave: i }, ne.visit(T, {
        method: e,
        data: u,
        headers: a,
        preserveScroll: !0,
        preserveState: !0,
        onError: y,
        onFinish: () => St(() => C.value[0]).then(h)
      });
    fe({ url: T, method: e, data: u, headers: a }).then((g) => h(_e(g.data, o, r, i))).catch(y);
  });
}
function Ie(n, e, t, a, o) {
  const r = new Nt(n, e, t, a, o);
  return C.value.push(r), mt(() => r.show()), r;
}
const At = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], Pn = (n, e) => (e.resolveComponent && (xe = e.resolveComponent), () => De(kt, () => De(n, e)));
function ie() {
  return {
    setComponentResolver: Et,
    getBaseUrl: () => re.value,
    setBaseUrl: (n) => re.value = n,
    stack: ft(C),
    push: Ie,
    pushFromResponseData: _e,
    closeAll: () => [...C.value].reverse().forEach((n) => n.close()),
    reset: () => C.value = [],
    visit: Ft,
    registerLocalModal: Tt,
    removeLocalModal: (n) => delete ve.value[n]
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
  setup(n, { expose: e, emit: t }) {
    const a = n, o = ie(), r = a.name ? S({}) : Ge("modalContext"), i = z(() => {
      var m;
      const u = ((m = r.value.config) == null ? void 0 : m.slideover) ?? a.slideover ?? Re("type") === "slideover";
      return {
        slideover: u,
        closeButton: a.closeButton ?? W(u, "closeButton"),
        closeExplicitly: a.closeExplicitly ?? W(u, "closeExplicitly"),
        maxWidth: a.maxWidth ?? W(u, "maxWidth"),
        paddingClasses: a.paddingClasses ?? W(u, "paddingClasses"),
        panelClasses: a.panelClasses ?? W(u, "panelClasses"),
        position: a.position ?? W(u, "position"),
        ...r.value.config
      };
    });
    a.name && (o.registerLocalModal(a.name, function(u) {
      r.value = u, c();
    }), H(() => {
      o.removeLocalModal(a.name);
    })), ht(() => {
      a.name || c();
    });
    const d = S(null);
    H(() => {
      var u;
      return (u = d.value) == null ? void 0 : u.call(d);
    });
    const f = He();
    function c() {
      d.value = r.value.registerEventListenersFromAttrs(f);
    }
    const h = t;
    function y(u, ...m) {
      h("modal-event", u, ...m);
    }
    e({
      emit: y,
      afterLeave: () => {
        var u;
        return (u = r.value) == null ? void 0 : u.afterLeave();
      },
      close: () => {
        var u;
        return (u = r.value) == null ? void 0 : u.close();
      },
      reload: (...u) => {
        var m;
        return (m = r.value) == null ? void 0 : m.reload(...u);
      },
      setOpen: (...u) => {
        var m;
        return (m = r.value) == null ? void 0 : m.setOpen(...u);
      },
      getChildModal: () => {
        var u;
        return (u = r.value) == null ? void 0 : u.getChildModal();
      },
      getParentModal: () => {
        var u;
        return (u = r.value) == null ? void 0 : u.getParentModal();
      },
      get config() {
        var u;
        return (u = r.value) == null ? void 0 : u.config;
      },
      get id() {
        var u;
        return (u = r.value) == null ? void 0 : u.id;
      },
      get index() {
        var u;
        return (u = r.value) == null ? void 0 : u.index;
      },
      get isOpen() {
        var u;
        return (u = r.value) == null ? void 0 : u.isOpen;
      },
      get modalContext() {
        var u;
        return (u = r.value) == null ? void 0 : u.modalContext;
      },
      get onTopOfStack() {
        var u;
        return (u = r.value) == null ? void 0 : u.onTopOfStack;
      },
      get shouldRender() {
        var u;
        return (u = r.value) == null ? void 0 : u.shouldRender;
      }
    }), G(
      () => {
        var u;
        return (u = r.value) == null ? void 0 : u.onTopOfStack;
      },
      (u, m) => {
        u && !m ? h("focus") : !u && m && h("blur");
      }
    ), G(
      () => {
        var u;
        return (u = r.value) == null ? void 0 : u.isOpen;
      },
      (u) => {
        h(u ? "success" : "close");
      },
      { immediate: !0 }
    );
    const T = z(() => {
      var u;
      return (u = o.stack.value.find((m) => m.shouldRender && m.index > r.value.index)) == null ? void 0 : u.index;
    });
    return (u, m) => (F(), D(ze, null, [
      O(r).shouldRender ? Z(u.$slots, "default", {
        key: 0,
        id: O(r).id,
        afterLeave: O(r).afterLeave,
        close: O(r).close,
        config: i.value,
        emit: y,
        getChildModal: O(r).getChildModal,
        getParentModal: O(r).getParentModal,
        index: O(r).index,
        isOpen: O(r).isOpen,
        modalContext: O(r),
        onTopOfStack: O(r).onTopOfStack,
        reload: O(r).reload,
        setOpen: O(r).setOpen,
        shouldRender: O(r).shouldRender
      }) : P("", !0),
      T.value ? (F(), M(Qe, {
        key: 1,
        index: T.value
      }, null, 8, ["index"])) : P("", !0)
    ], 64));
  }
}), It = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [a, o] of e)
    t[a] = o;
  return t;
}, Pt = {}, Lt = { class: "im-close-button text-gray-400 hover:text-gray-500" };
function Bt(n, e) {
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
const et = /* @__PURE__ */ It(Pt, [["render", Bt]]);
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var tt = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"], me = /* @__PURE__ */ tt.join(","), nt = typeof Element > "u", U = nt ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, he = !nt && Element.prototype.getRootNode ? function(n) {
  var e;
  return n == null || (e = n.getRootNode) === null || e === void 0 ? void 0 : e.call(n);
} : function(n) {
  return n == null ? void 0 : n.ownerDocument;
}, be = function n(e, t) {
  var a;
  t === void 0 && (t = !0);
  var o = e == null || (a = e.getAttribute) === null || a === void 0 ? void 0 : a.call(e, "inert"), r = o === "" || o === "true", i = r || t && e && n(e.parentNode);
  return i;
}, Mt = function(e) {
  var t, a = e == null || (t = e.getAttribute) === null || t === void 0 ? void 0 : t.call(e, "contenteditable");
  return a === "" || a === "true";
}, at = function(e, t, a) {
  if (be(e))
    return [];
  var o = Array.prototype.slice.apply(e.querySelectorAll(me));
  return t && U.call(e, me) && o.unshift(e), o = o.filter(a), o;
}, rt = function n(e, t, a) {
  for (var o = [], r = Array.from(e); r.length; ) {
    var i = r.shift();
    if (!be(i, !1))
      if (i.tagName === "SLOT") {
        var d = i.assignedElements(), f = d.length ? d : i.children, c = n(f, !0, a);
        a.flatten ? o.push.apply(o, c) : o.push({
          scopeParent: i,
          candidates: c
        });
      } else {
        var h = U.call(i, me);
        h && a.filter(i) && (t || !e.includes(i)) && o.push(i);
        var y = i.shadowRoot || // check for an undisclosed shadow
        typeof a.getShadowRoot == "function" && a.getShadowRoot(i), T = !be(y, !1) && (!a.shadowRootFilter || a.shadowRootFilter(i));
        if (y && T) {
          var u = n(y === !0 ? i.children : y.children, !0, a);
          a.flatten ? o.push.apply(o, u) : o.push({
            scopeParent: i,
            candidates: u
          });
        } else
          r.unshift.apply(r, i.children);
      }
  }
  return o;
}, it = function(e) {
  return !isNaN(parseInt(e.getAttribute("tabindex"), 10));
}, j = function(e) {
  if (!e)
    throw new Error("No node provided");
  return e.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName) || Mt(e)) && !it(e) ? 0 : e.tabIndex;
}, Dt = function(e, t) {
  var a = j(e);
  return a < 0 && t && !it(e) ? 0 : a;
}, $t = function(e, t) {
  return e.tabIndex === t.tabIndex ? e.documentOrder - t.documentOrder : e.tabIndex - t.tabIndex;
}, ot = function(e) {
  return e.tagName === "INPUT";
}, jt = function(e) {
  return ot(e) && e.type === "hidden";
}, Ut = function(e) {
  var t = e.tagName === "DETAILS" && Array.prototype.slice.apply(e.children).some(function(a) {
    return a.tagName === "SUMMARY";
  });
  return t;
}, Wt = function(e, t) {
  for (var a = 0; a < e.length; a++)
    if (e[a].checked && e[a].form === t)
      return e[a];
}, qt = function(e) {
  if (!e.name)
    return !0;
  var t = e.form || he(e), a = function(d) {
    return t.querySelectorAll('input[type="radio"][name="' + d + '"]');
  }, o;
  if (typeof window < "u" && typeof window.CSS < "u" && typeof window.CSS.escape == "function")
    o = a(window.CSS.escape(e.name));
  else
    try {
      o = a(e.name);
    } catch (i) {
      return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", i.message), !1;
    }
  var r = Wt(o, e.form);
  return !r || r === e;
}, Kt = function(e) {
  return ot(e) && e.type === "radio";
}, Xt = function(e) {
  return Kt(e) && !qt(e);
}, Vt = function(e) {
  var t, a = e && he(e), o = (t = a) === null || t === void 0 ? void 0 : t.host, r = !1;
  if (a && a !== e) {
    var i, d, f;
    for (r = !!((i = o) !== null && i !== void 0 && (d = i.ownerDocument) !== null && d !== void 0 && d.contains(o) || e != null && (f = e.ownerDocument) !== null && f !== void 0 && f.contains(e)); !r && o; ) {
      var c, h, y;
      a = he(o), o = (c = a) === null || c === void 0 ? void 0 : c.host, r = !!((h = o) !== null && h !== void 0 && (y = h.ownerDocument) !== null && y !== void 0 && y.contains(o));
    }
  }
  return r;
}, je = function(e) {
  var t = e.getBoundingClientRect(), a = t.width, o = t.height;
  return a === 0 && o === 0;
}, zt = function(e, t) {
  var a = t.displayCheck, o = t.getShadowRoot;
  if (getComputedStyle(e).visibility === "hidden")
    return !0;
  var r = U.call(e, "details>summary:first-of-type"), i = r ? e.parentElement : e;
  if (U.call(i, "details:not([open]) *"))
    return !0;
  if (!a || a === "full" || a === "legacy-full") {
    if (typeof o == "function") {
      for (var d = e; e; ) {
        var f = e.parentElement, c = he(e);
        if (f && !f.shadowRoot && o(f) === !0)
          return je(e);
        e.assignedSlot ? e = e.assignedSlot : !f && c !== e.ownerDocument ? e = c.host : e = f;
      }
      e = d;
    }
    if (Vt(e))
      return !e.getClientRects().length;
    if (a !== "legacy-full")
      return !0;
  } else if (a === "non-zero-area")
    return je(e);
  return !1;
}, Gt = function(e) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))
    for (var t = e.parentElement; t; ) {
      if (t.tagName === "FIELDSET" && t.disabled) {
        for (var a = 0; a < t.children.length; a++) {
          var o = t.children.item(a);
          if (o.tagName === "LEGEND")
            return U.call(t, "fieldset[disabled] *") ? !0 : !o.contains(e);
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
  Ut(t) || Gt(t));
}, Ne = function(e, t) {
  return !(Xt(t) || j(t) < 0 || !pe(e, t));
}, Ht = function(e) {
  var t = parseInt(e.getAttribute("tabindex"), 10);
  return !!(isNaN(t) || t >= 0);
}, Zt = function n(e) {
  var t = [], a = [];
  return e.forEach(function(o, r) {
    var i = !!o.scopeParent, d = i ? o.scopeParent : o, f = Dt(d, i), c = i ? n(o.candidates) : d;
    f === 0 ? i ? t.push.apply(t, c) : t.push(d) : a.push({
      documentOrder: r,
      tabIndex: f,
      item: o,
      isScope: i,
      content: c
    });
  }), a.sort($t).reduce(function(o, r) {
    return r.isScope ? o.push.apply(o, r.content) : o.push(r.content), o;
  }, []).concat(t);
}, Yt = function(e, t) {
  t = t || {};
  var a;
  return t.getShadowRoot ? a = rt([e], t.includeContainer, {
    filter: Ne.bind(null, t),
    flatten: !1,
    getShadowRoot: t.getShadowRoot,
    shadowRootFilter: Ht
  }) : a = at(e, t.includeContainer, Ne.bind(null, t)), Zt(a);
}, Jt = function(e, t) {
  t = t || {};
  var a;
  return t.getShadowRoot ? a = rt([e], t.includeContainer, {
    filter: pe.bind(null, t),
    flatten: !0,
    getShadowRoot: t.getShadowRoot
  }) : a = at(e, t.includeContainer, pe.bind(null, t)), a;
}, q = function(e, t) {
  if (t = t || {}, !e)
    throw new Error("No node provided");
  return U.call(e, me) === !1 ? !1 : Ne(t, e);
}, Qt = /* @__PURE__ */ tt.concat("iframe").join(","), ke = function(e, t) {
  if (t = t || {}, !e)
    throw new Error("No node provided");
  return U.call(e, Qt) === !1 ? !1 : pe(t, e);
};
/*!
* focus-trap 7.6.2
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
function Te(n, e) {
  (e == null || e > n.length) && (e = n.length);
  for (var t = 0, a = Array(e); t < e; t++) a[t] = n[t];
  return a;
}
function _t(n) {
  if (Array.isArray(n)) return Te(n);
}
function en(n, e, t) {
  return (e = on(e)) in n ? Object.defineProperty(n, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : n[e] = t, n;
}
function tn(n) {
  if (typeof Symbol < "u" && n[Symbol.iterator] != null || n["@@iterator"] != null) return Array.from(n);
}
function nn() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ue(n, e) {
  var t = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(n);
    e && (a = a.filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    })), t.push.apply(t, a);
  }
  return t;
}
function We(n) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Ue(Object(t), !0).forEach(function(a) {
      en(n, a, t[a]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t)) : Ue(Object(t)).forEach(function(a) {
      Object.defineProperty(n, a, Object.getOwnPropertyDescriptor(t, a));
    });
  }
  return n;
}
function an(n) {
  return _t(n) || tn(n) || ln(n) || nn();
}
function rn(n, e) {
  if (typeof n != "object" || !n) return n;
  var t = n[Symbol.toPrimitive];
  if (t !== void 0) {
    var a = t.call(n, e || "default");
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(n);
}
function on(n) {
  var e = rn(n, "string");
  return typeof e == "symbol" ? e : e + "";
}
function ln(n, e) {
  if (n) {
    if (typeof n == "string") return Te(n, e);
    var t = {}.toString.call(n).slice(8, -1);
    return t === "Object" && n.constructor && (t = n.constructor.name), t === "Map" || t === "Set" ? Array.from(n) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? Te(n, e) : void 0;
  }
}
var qe = {
  activateTrap: function(e, t) {
    if (e.length > 0) {
      var a = e[e.length - 1];
      a !== t && a.pause();
    }
    var o = e.indexOf(t);
    o === -1 || e.splice(o, 1), e.push(t);
  },
  deactivateTrap: function(e, t) {
    var a = e.indexOf(t);
    a !== -1 && e.splice(a, 1), e.length > 0 && e[e.length - 1].unpause();
  }
}, sn = function(e) {
  return e.tagName && e.tagName.toLowerCase() === "input" && typeof e.select == "function";
}, un = function(e) {
  return (e == null ? void 0 : e.key) === "Escape" || (e == null ? void 0 : e.key) === "Esc" || (e == null ? void 0 : e.keyCode) === 27;
}, ae = function(e) {
  return (e == null ? void 0 : e.key) === "Tab" || (e == null ? void 0 : e.keyCode) === 9;
}, dn = function(e) {
  return ae(e) && !e.shiftKey;
}, cn = function(e) {
  return ae(e) && e.shiftKey;
}, Ke = function(e) {
  return setTimeout(e, 0);
}, te = function(e) {
  for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++)
    a[o - 1] = arguments[o];
  return typeof e == "function" ? e.apply(void 0, a) : e;
}, de = function(e) {
  return e.target.shadowRoot && typeof e.composedPath == "function" ? e.composedPath()[0] : e.target;
}, fn = [], vn = function(e, t) {
  var a = (t == null ? void 0 : t.document) || document, o = (t == null ? void 0 : t.trapStack) || fn, r = We({
    returnFocusOnDeactivate: !0,
    escapeDeactivates: !0,
    delayInitialFocus: !0,
    isKeyForward: dn,
    isKeyBackward: cn
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
    // timer ID for when delayInitialFocus is true and initial focus in this trap
    //  has been delayed during activation
    delayInitialFocusTimer: void 0,
    // the most recent KeyboardEvent for the configured nav key (typically [SHIFT+]TAB), if any
    recentNavEvent: void 0
  }, d, f = function(l, s, v) {
    return l && l[s] !== void 0 ? l[s] : r[v || s];
  }, c = function(l, s) {
    var v = typeof (s == null ? void 0 : s.composedPath) == "function" ? s.composedPath() : void 0;
    return i.containerGroups.findIndex(function(p) {
      var x = p.container, k = p.tabbableNodes;
      return x.contains(l) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (v == null ? void 0 : v.includes(x)) || k.find(function(b) {
        return b === l;
      });
    });
  }, h = function(l) {
    var s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, v = s.hasFallback, p = v === void 0 ? !1 : v, x = s.params, k = x === void 0 ? [] : x, b = r[l];
    if (typeof b == "function" && (b = b.apply(void 0, an(k))), b === !0 && (b = void 0), !b) {
      if (b === void 0 || b === !1)
        return b;
      throw new Error("`".concat(l, "` was specified but was not a node, or did not return a node"));
    }
    var E = b;
    if (typeof b == "string") {
      try {
        E = a.querySelector(b);
      } catch (N) {
        throw new Error("`".concat(l, '` appears to be an invalid selector; error="').concat(N.message, '"'));
      }
      if (!E && !p)
        throw new Error("`".concat(l, "` as selector refers to no known node"));
    }
    return E;
  }, y = function() {
    var l = h("initialFocus", {
      hasFallback: !0
    });
    if (l === !1)
      return !1;
    if (l === void 0 || l && !ke(l, r.tabbableOptions))
      if (c(a.activeElement) >= 0)
        l = a.activeElement;
      else {
        var s = i.tabbableGroups[0], v = s && s.firstTabbableNode;
        l = v || h("fallbackFocus");
      }
    else l === null && (l = h("fallbackFocus"));
    if (!l)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return l;
  }, T = function() {
    if (i.containerGroups = i.containers.map(function(l) {
      var s = Yt(l, r.tabbableOptions), v = Jt(l, r.tabbableOptions), p = s.length > 0 ? s[0] : void 0, x = s.length > 0 ? s[s.length - 1] : void 0, k = v.find(function(N) {
        return q(N);
      }), b = v.slice().reverse().find(function(N) {
        return q(N);
      }), E = !!s.find(function(N) {
        return j(N) > 0;
      });
      return {
        container: l,
        tabbableNodes: s,
        focusableNodes: v,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: E,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode: p,
        /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
        lastTabbableNode: x,
        // NOTE: DOM order is NOT NECESSARILY "document position" order, but figuring that out
        //  would require more than just https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
        //  because that API doesn't work with Shadow DOM as well as it should (@see
        //  https://github.com/whatwg/dom/issues/320) and since this first/last is only needed, so far,
        //  to address an edge case related to positive tabindex support, this seems like a much easier,
        //  "close enough most of the time" alternative for positive tabindexes which should generally
        //  be avoided anyway...
        /** First tabbable node in container, __DOM__ order; `undefined` if none. */
        firstDomTabbableNode: k,
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
          var Q = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, B = s.indexOf($);
          return B < 0 ? Q ? v.slice(v.indexOf($) + 1).find(function(_) {
            return q(_);
          }) : v.slice(0, v.indexOf($)).reverse().find(function(_) {
            return q(_);
          }) : s[B + (Q ? 1 : -1)];
        }
      };
    }), i.tabbableGroups = i.containerGroups.filter(function(l) {
      return l.tabbableNodes.length > 0;
    }), i.tabbableGroups.length <= 0 && !h("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (i.containerGroups.find(function(l) {
      return l.posTabIndexesFound;
    }) && i.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, u = function(l) {
    var s = l.activeElement;
    if (s)
      return s.shadowRoot && s.shadowRoot.activeElement !== null ? u(s.shadowRoot) : s;
  }, m = function(l) {
    if (l !== !1 && l !== u(document)) {
      if (!l || !l.focus) {
        m(y());
        return;
      }
      l.focus({
        preventScroll: !!r.preventScroll
      }), i.mostRecentlyFocusedNode = l, sn(l) && l.select();
    }
  }, g = function(l) {
    var s = h("setReturnFocus", {
      params: [l]
    });
    return s || (s === !1 ? !1 : l);
  }, L = function(l) {
    var s = l.target, v = l.event, p = l.isBackward, x = p === void 0 ? !1 : p;
    s = s || de(v), T();
    var k = null;
    if (i.tabbableGroups.length > 0) {
      var b = c(s, v), E = b >= 0 ? i.containerGroups[b] : void 0;
      if (b < 0)
        x ? k = i.tabbableGroups[i.tabbableGroups.length - 1].lastTabbableNode : k = i.tabbableGroups[0].firstTabbableNode;
      else if (x) {
        var N = i.tabbableGroups.findIndex(function(Ce) {
          var Se = Ce.firstTabbableNode;
          return s === Se;
        });
        if (N < 0 && (E.container === s || ke(s, r.tabbableOptions) && !q(s, r.tabbableOptions) && !E.nextTabbableNode(s, !1)) && (N = b), N >= 0) {
          var $ = N === 0 ? i.tabbableGroups.length - 1 : N - 1, Q = i.tabbableGroups[$];
          k = j(s) >= 0 ? Q.lastTabbableNode : Q.lastDomTabbableNode;
        } else ae(v) || (k = E.nextTabbableNode(s, !1));
      } else {
        var B = i.tabbableGroups.findIndex(function(Ce) {
          var Se = Ce.lastTabbableNode;
          return s === Se;
        });
        if (B < 0 && (E.container === s || ke(s, r.tabbableOptions) && !q(s, r.tabbableOptions) && !E.nextTabbableNode(s)) && (B = b), B >= 0) {
          var _ = B === i.tabbableGroups.length - 1 ? 0 : B + 1, Me = i.tabbableGroups[_];
          k = j(s) >= 0 ? Me.firstTabbableNode : Me.firstDomTabbableNode;
        } else ae(v) || (k = E.nextTabbableNode(s));
      }
    } else
      k = h("fallbackFocus");
    return k;
  }, I = function(l) {
    var s = de(l);
    if (!(c(s, l) >= 0)) {
      if (te(r.clickOutsideDeactivates, l)) {
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
      te(r.allowOutsideClick, l) || l.preventDefault();
    }
  }, oe = function(l) {
    var s = de(l), v = c(s, l) >= 0;
    if (v || s instanceof Document)
      v && (i.mostRecentlyFocusedNode = s);
    else {
      l.stopImmediatePropagation();
      var p, x = !0;
      if (i.mostRecentlyFocusedNode)
        if (j(i.mostRecentlyFocusedNode) > 0) {
          var k = c(i.mostRecentlyFocusedNode), b = i.containerGroups[k].tabbableNodes;
          if (b.length > 0) {
            var E = b.findIndex(function(N) {
              return N === i.mostRecentlyFocusedNode;
            });
            E >= 0 && (r.isKeyForward(i.recentNavEvent) ? E + 1 < b.length && (p = b[E + 1], x = !1) : E - 1 >= 0 && (p = b[E - 1], x = !1));
          }
        } else
          i.containerGroups.some(function(N) {
            return N.tabbableNodes.some(function($) {
              return j($) > 0;
            });
          }) || (x = !1);
      else
        x = !1;
      x && (p = L({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: i.mostRecentlyFocusedNode,
        isBackward: r.isKeyBackward(i.recentNavEvent)
      })), m(p || i.mostRecentlyFocusedNode || y());
    }
    i.recentNavEvent = void 0;
  }, ye = function(l) {
    var s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    i.recentNavEvent = l;
    var v = L({
      event: l,
      isBackward: s
    });
    v && (ae(l) && l.preventDefault(), m(v));
  }, Y = function(l) {
    (r.isKeyForward(l) || r.isKeyBackward(l)) && ye(l, r.isKeyBackward(l));
  }, le = function(l) {
    un(l) && te(r.escapeDeactivates, l) !== !1 && (l.preventDefault(), d.deactivate());
  }, Pe = function(l) {
    var s = de(l);
    c(s, l) >= 0 || te(r.clickOutsideDeactivates, l) || te(r.allowOutsideClick, l) || (l.preventDefault(), l.stopImmediatePropagation());
  }, Le = function() {
    if (i.active)
      return qe.activateTrap(o, d), i.delayInitialFocusTimer = r.delayInitialFocus ? Ke(function() {
        m(y());
      }) : m(y()), a.addEventListener("focusin", oe, !0), a.addEventListener("mousedown", I, {
        capture: !0,
        passive: !1
      }), a.addEventListener("touchstart", I, {
        capture: !0,
        passive: !1
      }), a.addEventListener("click", Pe, {
        capture: !0,
        passive: !1
      }), a.addEventListener("keydown", Y, {
        capture: !0,
        passive: !1
      }), a.addEventListener("keydown", le), d;
  }, Be = function() {
    if (i.active)
      return a.removeEventListener("focusin", oe, !0), a.removeEventListener("mousedown", I, !0), a.removeEventListener("touchstart", I, !0), a.removeEventListener("click", Pe, !0), a.removeEventListener("keydown", Y, !0), a.removeEventListener("keydown", le), d;
  }, st = function(l) {
    var s = l.some(function(v) {
      var p = Array.from(v.removedNodes);
      return p.some(function(x) {
        return x === i.mostRecentlyFocusedNode;
      });
    });
    s && m(y());
  }, we = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(st) : void 0, J = function() {
    we && (we.disconnect(), i.active && !i.paused && i.containers.map(function(l) {
      we.observe(l, {
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
    activate: function(l) {
      if (i.active)
        return this;
      var s = f(l, "onActivate"), v = f(l, "onPostActivate"), p = f(l, "checkCanFocusTrap");
      p || T(), i.active = !0, i.paused = !1, i.nodeFocusedBeforeActivation = a.activeElement, s == null || s();
      var x = function() {
        p && T(), Le(), J(), v == null || v();
      };
      return p ? (p(i.containers.concat()).then(x, x), this) : (x(), this);
    },
    deactivate: function(l) {
      if (!i.active)
        return this;
      var s = We({
        onDeactivate: r.onDeactivate,
        onPostDeactivate: r.onPostDeactivate,
        checkCanReturnFocus: r.checkCanReturnFocus
      }, l);
      clearTimeout(i.delayInitialFocusTimer), i.delayInitialFocusTimer = void 0, Be(), i.active = !1, i.paused = !1, J(), qe.deactivateTrap(o, d);
      var v = f(s, "onDeactivate"), p = f(s, "onPostDeactivate"), x = f(s, "checkCanReturnFocus"), k = f(s, "returnFocus", "returnFocusOnDeactivate");
      v == null || v();
      var b = function() {
        Ke(function() {
          k && m(g(i.nodeFocusedBeforeActivation)), p == null || p();
        });
      };
      return k && x ? (x(g(i.nodeFocusedBeforeActivation)).then(b, b), this) : (b(), this);
    },
    pause: function(l) {
      if (i.paused || !i.active)
        return this;
      var s = f(l, "onPause"), v = f(l, "onPostPause");
      return i.paused = !0, s == null || s(), Be(), J(), v == null || v(), this;
    },
    unpause: function(l) {
      if (!i.paused || !i.active)
        return this;
      var s = f(l, "onUnpause"), v = f(l, "onPostUnpause");
      return i.paused = !1, s == null || s(), T(), Le(), J(), v == null || v(), this;
    },
    updateContainerElements: function(l) {
      var s = [].concat(l).filter(Boolean);
      return i.containers = s.map(function(v) {
        return typeof v == "string" ? a.querySelector(v) : v;
      }), i.active && T(), J(), this;
    }
  }, d.updateContainerElements(e), d;
};
function lt(n, e, t) {
  const a = S(null);
  return n && (a.value = vn(n, {
    clickOutsideDeactivates: !e,
    escapeDeactivates: !e,
    onDeactivate: () => t == null ? void 0 : t(),
    fallbackFocus: () => n
  }), a.value.activate()), {
    deactivate: () => {
      var r;
      (r = a.value) == null || r.deactivate(), a.value = null;
    },
    wrapper: n
  };
}
const mn = { class: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4" }, hn = ["data-inertiaui-modal-entered"], bn = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, pn = {
  __name: "ModalContent",
  props: {
    modalContext: Object,
    config: Object
  },
  emits: ["after-leave"],
  setup(n, { emit: e }) {
    const t = n, a = S(!1), o = S(null);
    let r = null;
    const i = e;
    function d() {
      var c;
      r = lt(o.value, (c = t.config) == null ? void 0 : c.closeExplicitly, () => t.modalContext.close()).deactivate, a.value = !0;
    }
    function f() {
      var c, h;
      (h = (c = t.modalContext).afterLeave) == null || h.call(c), i("after-leave");
    }
    return H(() => r == null ? void 0 : r()), (c, h) => (F(), D("div", mn, [
      R("div", {
        class: X(["im-modal-positioner flex min-h-full justify-center", {
          "items-start": n.config.position === "top",
          "items-center": n.config.position === "center",
          "items-end": n.config.position === "bottom"
        }])
      }, [
        ce(Oe, {
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
              ref: o,
              class: X({
                "im-modal-wrapper pointer-events-auto w-full transition duration-300 ease-in-out": !0,
                "blur-sm": !n.modalContext.onTopOfStack,
                "sm:max-w-sm": n.config.maxWidth == "sm",
                "sm:max-w-md": n.config.maxWidth == "md",
                "sm:max-w-md md:max-w-lg": n.config.maxWidth == "lg",
                "sm:max-w-md md:max-w-xl": n.config.maxWidth == "xl",
                "sm:max-w-md md:max-w-xl lg:max-w-2xl": n.config.maxWidth == "2xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl": n.config.maxWidth == "3xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl": n.config.maxWidth == "4xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl": n.config.maxWidth == "5xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl": n.config.maxWidth == "6xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl": n.config.maxWidth == "7xl"
              })
            }, [
              R("div", {
                class: X(["im-modal-content relative", [n.config.paddingClasses, n.config.panelClasses]]),
                "data-inertiaui-modal-entered": a.value
              }, [
                n.config.closeButton ? (F(), D("div", bn, [
                  ce(et, {
                    onClick: n.modalContext.close
                  }, null, 8, ["onClick"])
                ])) : P("", !0),
                Z(c.$slots, "default", {
                  modalContext: n.modalContext,
                  config: n.config
                })
              ], 10, hn)
            ], 2), [
              [Ae, n.modalContext.isOpen]
            ])
          ]),
          _: 3
        })
      ], 2)
    ]));
  }
}, gn = { class: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden" }, xn = ["data-inertiaui-modal-entered"], yn = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, wn = {
  __name: "SlideoverContent",
  props: {
    modalContext: Object,
    config: Object
  },
  emits: ["after-leave"],
  setup(n, { emit: e }) {
    const t = n, a = S(!1), o = S(null);
    let r = null;
    const i = e;
    function d() {
      var c;
      r = lt(o.value, (c = t.config) == null ? void 0 : c.closeExplicitly, () => t.modalContext.close()).deactivate, a.value = !0;
    }
    function f() {
      var c, h;
      (h = (c = t.modalContext).afterLeave) == null || h.call(c), i("after-leave");
    }
    return H(() => r == null ? void 0 : r()), (c, h) => (F(), D("div", gn, [
      R("div", {
        class: X(["im-slideover-positioner flex min-h-full items-center", {
          "justify-start rtl:justify-end": n.config.position === "left",
          "justify-end rtl:justify-start": n.config.position === "right"
        }])
      }, [
        ce(Oe, {
          appear: "",
          "enter-from-class": "opacity-0 " + (n.config.position === "left" ? "-translate-x-full" : "translate-x-full"),
          "enter-to-class": "opacity-100 translate-x-0",
          "leave-from-class": "opacity-100 translate-x-0",
          "leave-to-class": "opacity-0 " + (n.config.position === "left" ? "-translate-x-full" : "translate-x-full"),
          onAfterEnter: d,
          onAfterLeave: f
        }, {
          default: V(() => [
            Fe(R("div", {
              ref_key: "wrapper",
              ref: o,
              class: X({
                "im-slideover-wrapper pointer-events-auto w-full transition duration-300 ease-in-out": !0,
                "blur-sm": !n.modalContext.onTopOfStack,
                "sm:max-w-sm": n.config.maxWidth == "sm",
                "sm:max-w-md": n.config.maxWidth == "md",
                "sm:max-w-md md:max-w-lg": n.config.maxWidth == "lg",
                "sm:max-w-md md:max-w-xl": n.config.maxWidth == "xl",
                "sm:max-w-md md:max-w-xl lg:max-w-2xl": n.config.maxWidth == "2xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl": n.config.maxWidth == "3xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl": n.config.maxWidth == "4xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl": n.config.maxWidth == "5xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl": n.config.maxWidth == "6xl",
                "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl": n.config.maxWidth == "7xl"
              })
            }, [
              R("div", {
                class: X(["im-slideover-content relative", [n.config.paddingClasses, n.config.panelClasses]]),
                "data-inertiaui-modal-entered": a.value
              }, [
                n.config.closeButton ? (F(), D("div", yn, [
                  ce(et, {
                    onClick: n.modalContext.close
                  }, null, 8, ["onClick"])
                ])) : P("", !0),
                Z(c.$slots, "default", {
                  modalContext: n.modalContext,
                  config: n.config
                })
              ], 10, xn)
            ], 2), [
              [Ae, n.modalContext.isOpen]
            ])
          ]),
          _: 3
        }, 8, ["enter-from-class", "leave-to-class"])
      ], 2)
    ]));
  }
}, Cn = ["data-inertiaui-modal-id", "data-inertiaui-modal-index", "aria-hidden"], Sn = { class: "im-backdrop fixed inset-0 z-30 bg-black/75" }, kn = {
  key: 1,
  class: "im-backdrop fixed inset-0 z-30 bg-black/75"
}, Ln = {
  __name: "Modal",
  emits: ["after-leave", "blur", "close", "focus", "success"],
  setup(n, { expose: e }) {
    const t = S(null), a = S(!1), o = S(!1);
    return G(
      () => t.value,
      (r) => {
        (r == null ? void 0 : r.index) === 0 && ($e.prepare(), o.value = !0);
      }
    ), H(() => {
      o.value && $e.cleanup();
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
    }), (r, i) => (F(), M(Rt, {
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
        getChildModal: y,
        getParentModal: T,
        id: u,
        index: m,
        isOpen: g,
        modalContext: L,
        onTopOfStack: I,
        reload: oe,
        setOpen: ye,
        shouldRender: Y
      }) => [
        Y ? (F(), M(bt, {
          key: 0,
          to: "body"
        }, [
          R("div", {
            "data-inertiaui-modal-id": u,
            "data-inertiaui-modal-index": m,
            class: "im-dialog relative z-20",
            "aria-hidden": !I
          }, [
            m === 0 && I ? (F(), M(Oe, {
              key: 0,
              appear: !a.value,
              "enter-active-class": "transition transform ease-in-out duration-300",
              "enter-from-class": "opacity-0",
              "enter-to-class": "opacity-100",
              "leave-active-class": "transition transform ease-in-out duration-300",
              "leave-from-class": "opacity-100",
              "leave-to-class": "opacity-0",
              onAfterAppear: i[0] || (i[0] = (le) => a.value = !0)
            }, {
              default: V(() => [
                Fe(R("div", Sn, null, 512), [
                  [Ae, g]
                ])
              ]),
              _: 2
            }, 1032, ["appear"])) : P("", !0),
            m > 0 && I ? (F(), D("div", kn)) : P("", !0),
            (F(), M(Ze(c != null && c.slideover ? wn : pn), {
              "modal-context": L,
              config: c,
              onAfterLeave: i[1] || (i[1] = (le) => r.$emit("after-leave"))
            }, {
              default: V(() => [
                Z(r.$slots, "default", {
                  id: u,
                  afterLeave: d,
                  close: f,
                  config: c,
                  emit: h,
                  getChildModal: y,
                  getParentModal: T,
                  index: m,
                  isOpen: g,
                  modalContext: L,
                  onTopOfStack: I,
                  reload: oe,
                  setOpen: ye,
                  shouldRender: Y
                })
              ]),
              _: 2
            }, 1064, ["modal-context", "config"]))
          ], 8, Cn)
        ])) : P("", !0)
      ]),
      _: 3
    }, 512));
  }
}, Bn = {
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
  setup(n, { emit: e }) {
    const t = n, a = S(!1), o = ie(), r = S(null);
    Xe("modalContext", r);
    const i = e, d = S(!1), f = z(() => t.navigate ?? Re("navigate"));
    G(
      () => {
        var g;
        return (g = r.value) == null ? void 0 : g.onTopOfStack;
      },
      (g) => {
        r.value && (g && d.value ? i("focus") : g || i("blur"), d.value = !g);
      }
    );
    const c = S(null);
    H(() => {
      var g;
      (g = c.value) == null || g.call(c);
    });
    const h = He();
    function y() {
      c.value = r.value.registerEventListenersFromAttrs(h);
    }
    G(r, (g, L) => {
      g && !L && (y(), i("success"));
    });
    function T() {
      i("close");
    }
    function u() {
      r.value = null, i("after-leave");
    }
    function m() {
      a.value || (t.href.startsWith("#") || (a.value = !0, i("start")), o.visit(
        t.href,
        t.method,
        t.data,
        t.headers,
        Ct(Je(t, At)),
        T,
        u,
        t.queryStringArrayFormat,
        f.value
      ).then((g) => {
        r.value = g;
      }).catch((g) => i("error", g)).finally(() => a.value = !1));
    }
    return (g, L) => (F(), M(Ze(n.as), Ve(O(h), {
      href: n.href,
      onClick: pt(m, ["prevent"])
    }), {
      default: V(() => [
        Z(g.$slots, "default", { loading: a.value })
      ]),
      _: 3
    }, 16, ["href"]));
  }
};
function Mn() {
  return gt(Ge("modalContext", null));
}
function Dn(n, e = {}) {
  return ie().visit(
    n,
    e.method ?? "get",
    e.data ?? {},
    e.headers ?? {},
    e.config ?? {},
    e.onClose,
    e.onAfterLeave,
    e.queryStringArrayFormat ?? "brackets",
    e.navigate ?? Re("navigate")
  ).then((t) => {
    const a = e.listeners ?? {};
    return Object.keys(a).forEach((o) => {
      const r = o.replace(/([A-Z])/g, "-$1").toLowerCase();
      t.on(r, a[o]);
    }), t;
  });
}
export {
  Rt as HeadlessModal,
  Ln as Modal,
  Bn as ModalLink,
  kt as ModalRoot,
  Re as getConfig,
  In as initFromPageProps,
  Rn as putConfig,
  Pn as renderApp,
  An as resetConfig,
  Mn as useModal,
  Dn as visitModal
};
