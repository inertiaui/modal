var ut = Object.defineProperty;
var dt = (a, e, t) => e in a ? ut(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t;
var R = (a, e, t) => dt(a, typeof e != "symbol" ? e + "" : e, t);
import { computed as V, provide as Ke, openBlock as F, createBlock as M, unref as O, mergeProps as Xe, createCommentVNode as B, ref as T, onUnmounted as ie, onBeforeMount as ct, watch as se, createElementBlock as D, Fragment as Ve, renderSlot as z, h as Me, readonly as ft, markRaw as vt, nextTick as mt, inject as ze, onBeforeUnmount as te, onMounted as Ge, useAttrs as He, createElementVNode as A, normalizeClass as K, createVNode as ue, Transition as Ne, withCtx as X, withDirectives as Te, vShow as Oe, Teleport as ht, resolveDynamicComponent as Ze, withModifiers as pt, toValue as bt } from "vue";
import { router as _, usePage as Ye } from "@inertiajs/vue3";
import { mergeDataIntoQueryString as gt } from "@inertiajs/core";
import de from "axios";
const J = {
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
class xt {
  constructor() {
    this.config = {}, this.reset();
  }
  reset() {
    this.config = JSON.parse(JSON.stringify(J));
  }
  put(e, t) {
    if (typeof e == "object") {
      this.config = {
        type: e.type ?? J.type,
        navigate: e.navigate ?? J.navigate,
        modal: { ...J.modal, ...e.modal ?? {} },
        slideover: { ...J.slideover, ...e.slideover ?? {} }
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
const pe = new xt(), Ea = () => pe.reset(), Na = (a, e) => pe.put(a, e), Fe = (a) => pe.get(a), $ = (a, e) => pe.get(a ? `slideover.${e}` : `modal.${e}`), De = {
  modifiedElements: [],
  bodyState: {
    hasOverflowHidden: !1,
    hasPointerEventsNone: !1,
    originalPaddingRight: ""
  },
  prepare() {
    const a = window.innerWidth - document.documentElement.clientWidth;
    this.bodyState.originalPaddingRight = document.body.style.paddingRight;
    const e = parseInt(window.getComputedStyle(document.body).paddingRight, 10);
    document.body.style.paddingRight = `${e + a}px`, document.body.classList.contains("overflow-hidden") || (document.body.classList.add("overflow-hidden"), this.bodyState.hasOverflowHidden = !0), document.body.classList.contains("pointer-events-none") || (document.body.classList.add("pointer-events-none"), this.bodyState.hasPointerEventsNone = !0), Array.from(document.body.children).forEach((t) => {
      !t.classList.contains("im-dialog") && t.getAttribute("aria-hidden") !== "true" && (t.setAttribute("aria-hidden", "true"), this.modifiedElements.push(t));
    });
  },
  cleanup() {
    this.bodyState.hasOverflowHidden && (document.body.classList.remove("overflow-hidden"), this.bodyState.hasOverflowHidden = !1), this.bodyState.hasPointerEventsNone && (document.body.classList.remove("pointer-events-none"), this.bodyState.hasPointerEventsNone = !1), document.body.style.paddingRight = this.bodyState.originalPaddingRight, this.bodyState.originalPaddingRight = "", this.modifiedElements.forEach((a) => {
      a.removeAttribute("aria-hidden");
    }), this.modifiedElements = [];
  }
};
function yt(a, e) {
  return Array.isArray(a) ? a.filter((t) => !e.includes(t)) : Object.keys(a).reduce((t, n) => (e.includes(n) || (t[n] = a[n]), t), {});
}
function Je(a, e) {
  return Array.isArray(a) ? a.filter((t) => e.includes(t)) : e.reduce((t, n) => (n in a && (t[n] = a[n]), t), {});
}
function wt(a) {
  return Array.isArray(a) ? a.filter((e) => e !== null) : Object.keys(a).reduce((e, t) => (t in a && a[t] !== null && (e[t] = a[t]), e), {});
}
function Ct(a, e = 3, t = 10) {
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
function le(a) {
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
    const e = a, t = ne(), n = V(() => t.stack.value[e.index]);
    return Ke("modalContext", n), (l, r) => {
      var i;
      return (i = n.value) != null && i.component ? (F(), M(O(n).component, Xe({ key: 0 }, n.value.props, {
        onModalEvent: r[0] || (r[0] = (d, ...f) => n.value.emit(d, ...f))
      }), null, 16)) : B("", !0);
    };
  }
}, kt = {
  __name: "ModalRoot",
  setup(a) {
    const e = ne(), t = T(!1), n = T(null);
    ie(_.on("start", () => t.value = !0)), ie(_.on("finish", () => t.value = !1)), ie(
      _.on("navigate", (i) => {
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
          !t.value && window.location.href !== d.baseUrl && _.visit(d.baseUrl, {
            preserveScroll: !0,
            preserveState: !0
          });
        });
      })
    );
    const l = (i) => (e.stack.value.length && (i.headers["X-InertiaUI-Modal-Base-Url"] = e.getBaseUrl()), i);
    ct(() => {
      de.interceptors.request.use(l);
    }), ie(() => {
      de.interceptors.request.eject(l);
    });
    const r = Ye();
    return se(
      () => {
        var i;
        return (i = r.props) == null ? void 0 : i._inertiaui_modal;
      },
      (i, d) => {
        var f;
        i && d && i.component === d.component && i.url === d.url && ((f = e.stack.value[0]) == null || f.updateProps(i.props ?? {}));
      }
    ), (i, d) => (F(), D(Ve, null, [
      z(i.$slots, "default"),
      O(e).stack.value.length ? (F(), M(Qe, {
        key: 0,
        index: 0
      })) : B("", !0)
    ], 64));
  }
};
let be = null;
const ae = T(null), y = T([]), ce = T({}), St = (a) => {
  be = a;
}, Ta = (a) => {
  a.resolveComponent && (be = a.resolveComponent);
};
class Re {
  constructor(e, t, n, l, r) {
    R(this, "update", (e, t, n) => {
      const l = this.index.value;
      l > -1 && (y.value[l].config = e, y.value[l].onCloseCallback = t, y.value[l].afterLeaveCallback = n);
    });
    R(this, "getParentModal", () => {
      const e = this.index.value;
      return e < 1 ? null : y.value.slice(0, e).reverse().find((t) => t.isOpen);
    });
    R(this, "getChildModal", () => {
      const e = this.index.value;
      return e === y.value.length - 1 ? null : y.value.slice(e + 1).find((t) => t.isOpen);
    });
    R(this, "show", () => {
      const e = this.index.value;
      if (e > -1) {
        if (y.value[e].isOpen)
          return;
        y.value[e].isOpen = !0, y.value[e].shouldRender = !0;
      }
    });
    R(this, "close", () => {
      var t;
      const e = this.index.value;
      if (e > -1) {
        if (!y.value[e].isOpen)
          return;
        Object.keys(this.listeners).forEach((n) => {
          this.off(n);
        }), y.value[e].isOpen = !1, (t = this.onCloseCallback) == null || t.call(this), this.onCloseCallback = null;
      }
    });
    R(this, "setOpen", (e) => {
      e ? this.show() : this.close();
    });
    R(this, "afterLeave", () => {
      var t;
      const e = this.index.value;
      if (e > -1) {
        if (y.value[e].isOpen)
          return;
        y.value[e].shouldRender = !1, (t = this.afterLeaveCallback) == null || t.call(this), this.afterLeaveCallback = null;
      }
      e === 0 && (y.value = []);
    });
    R(this, "on", (e, t) => {
      e = le(e), this.listeners[e] = this.listeners[e] ?? [], this.listeners[e].push(t);
    });
    R(this, "off", (e, t) => {
      var n;
      e = le(e), t ? this.listeners[e] = ((n = this.listeners[e]) == null ? void 0 : n.filter((l) => l !== t)) ?? [] : delete this.listeners[e];
    });
    R(this, "emit", (e, ...t) => {
      var n;
      (n = this.listeners[le(e)]) == null || n.forEach((l) => l(...t));
    });
    R(this, "registerEventListenersFromAttrs", (e) => {
      const t = [];
      return Object.keys(e).filter((n) => n.startsWith("on")).forEach((n) => {
        const l = le(n).replace(/^on-/, "");
        this.on(l, e[n]), t.push(() => this.off(l, e[n]));
      }), () => t.forEach((n) => n());
    });
    R(this, "reload", (e = {}) => {
      var n;
      let t = Object.keys(this.response.props);
      e.only && (t = Je(t, e.only)), e.except && (t = yt(t, e.except)), (n = this.response) != null && n.url && de.get(this.response.url, {
        headers: {
          Accept: "text/html, application/xhtml+xml",
          "X-Inertia": !0,
          "X-Inertia-Partial-Component": this.response.component,
          "X-Inertia-Version": this.response.version,
          "X-Inertia-Partial-Data": t.join(","),
          "X-InertiaUI-Modal": !0,
          "X-InertiaUI-Modal-Use-Router": 0,
          "X-InertiaUI-Modal-Base-Url": ae.value
        }
      }).then((l) => {
        this.updateProps(l.data.props);
      });
    });
    R(this, "updateProps", (e) => {
      Object.assign(this.props.value, e);
    });
    this.id = Re.generateId(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = e, this.props = T(t.props), this.response = t, this.config = n, this.onCloseCallback = l, this.afterLeaveCallback = r, this.index = V(() => y.value.findIndex((i) => i.id === this.id)), this.onTopOfStack = V(() => {
      var d;
      return y.value.length < 2 ? !0 : ((d = y.value.map((f) => ({ id: f.id, shouldRender: f.shouldRender })).reverse().find((f) => f.shouldRender)) == null ? void 0 : d.id) === this.id;
    });
  }
  static generateId() {
    return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `inertiaui_modal_${crypto.randomUUID()}` : `inertiaui_modal_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
function Et(a, e) {
  ce.value[a] = { name: a, callback: e };
}
function Nt(a, e, t, n) {
  if (!ce.value[a])
    throw new Error(`The local modal "${a}" has not been registered.`);
  const l = Ie(null, {}, e, t, n);
  return l.name = a, ce.value[a].callback(l), l;
}
function _e(a, e = {}, t = null, n = null) {
  return be(a.component).then((l) => Ie(vt(l), a, e, t, n));
}
function Tt(a, e, t = {}, n = {}, l = {}, r = null, i = null, d = "brackets", f = !1) {
  return new Promise((v, C) => {
    if (a.startsWith("#")) {
      v(Nt(a.substring(1), l, r, i));
      return;
    }
    const [x, N] = gt(e, a || "", t, d);
    let u = f && y.value.length === 0;
    if (y.value.length === 0 && (ae.value = typeof window < "u" ? window.location.href : ""), n = {
      ...n,
      Accept: "text/html, application/xhtml+xml",
      "X-Requested-With": "XMLHttpRequest",
      "X-Inertia": !0,
      "X-Inertia-Version": Ye().version,
      "X-InertiaUI-Modal": !0,
      "X-InertiaUI-Modal-Use-Router": u ? 1 : 0,
      "X-InertiaUI-Modal-Base-Url": ae.value
    }, u)
      return _.visit(x, {
        method: e,
        data: N,
        headers: n,
        preserveScroll: !0,
        preserveState: !0,
        onError: C,
        onFinish: () => Ct(() => y.value[0]).then((m) => {
          const p = m.onCloseCallback, I = m.afterLeaveCallback;
          m.update(
            l,
            () => {
              r == null || r(), p == null || p();
            },
            () => {
              i == null || i(), I == null || I();
            }
          ), v(m);
        })
      });
    de({ url: x, method: e, data: N, headers: n }).then((m) => v(_e(m.data, l, r, i))).catch(C);
  });
}
function Ie(a, e, t, n, l) {
  const r = new Re(a, e, t, n, l);
  return y.value.push(r), mt(() => {
    r.show();
  }), r;
}
const Ot = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], Oa = (a, e) => (e.resolveComponent && (be = e.resolveComponent), () => Me(kt, () => Me(a, e)));
function ne() {
  return {
    setComponentResolver: St,
    getBaseUrl: () => ae.value,
    setBaseUrl: (a) => ae.value = a,
    stack: ft(y),
    push: Ie,
    pushFromResponseData: _e,
    closeAll: () => [...y.value].reverse().forEach((a) => a.close()),
    reset: () => y.value = [],
    visit: Tt,
    registerLocalModal: Et,
    removeLocalModal: (a) => delete ce.value[a]
  };
}
const Ft = /* @__PURE__ */ Object.assign({
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
  emits: ["modal-event"],
  setup(a, { expose: e, emit: t }) {
    const n = a, l = ne(), r = n.name ? T({}) : ze("modalContext"), i = V(() => {
      var m;
      const u = ((m = r.value.config) == null ? void 0 : m.slideover) ?? n.slideover ?? Fe("type") === "slideover";
      return {
        slideover: u,
        closeButton: n.closeButton ?? $(u, "closeButton"),
        closeExplicitly: n.closeExplicitly ?? $(u, "closeExplicitly"),
        maxWidth: n.maxWidth ?? $(u, "maxWidth"),
        paddingClasses: n.paddingClasses ?? $(u, "paddingClasses"),
        panelClasses: n.panelClasses ?? $(u, "panelClasses"),
        position: n.position ?? $(u, "position"),
        ...r.value.config
      };
    });
    n.name && (l.registerLocalModal(n.name, function(u) {
      r.value = u, v();
    }), te(() => {
      l.removeLocalModal(n.name);
    })), Ge(() => {
      n.name || v();
    });
    const d = T(null);
    te(() => {
      var u;
      return (u = d.value) == null ? void 0 : u.call(d);
    });
    const f = He();
    function v() {
      d.value = r.value.registerEventListenersFromAttrs(f);
    }
    const C = t;
    function x(u, ...m) {
      C("modal-event", u, ...m);
    }
    e({
      emit: x,
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
    });
    const N = V(() => {
      var u;
      return (u = l.stack.value.find((m) => m.shouldRender && m.index > r.value.index)) == null ? void 0 : u.index;
    });
    return (u, m) => (F(), D(Ve, null, [
      O(r).shouldRender ? z(u.$slots, "default", {
        key: 0,
        id: O(r).id,
        afterLeave: O(r).afterLeave,
        close: O(r).close,
        config: i.value,
        emit: x,
        getChildModal: O(r).getChildModal,
        getParentModal: O(r).getParentModal,
        index: O(r).index,
        isOpen: O(r).isOpen,
        modalContext: O(r),
        onTopOfStack: O(r).onTopOfStack,
        reload: O(r).reload,
        setOpen: O(r).setOpen,
        shouldRender: O(r).shouldRender
      }) : B("", !0),
      N.value ? (F(), M(Qe, {
        key: 1,
        index: N.value
      }, null, 8, ["index"])) : B("", !0)
    ], 64));
  }
}), Rt = (a, e) => {
  const t = a.__vccOpts || a;
  for (const [n, l] of e)
    t[n] = l;
  return t;
}, It = {}, At = { class: "im-close-button text-gray-400 hover:text-gray-500" };
function Pt(a, e) {
  return F(), D("button", At, e[0] || (e[0] = [
    A("span", { class: "sr-only" }, "Close", -1),
    A("svg", {
      class: "size-6",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      "stroke-width": "2",
      stroke: "currentColor",
      "aria-hidden": "true"
    }, [
      A("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M6 18L18 6M6 6l12 12"
      })
    ], -1)
  ]));
}
const et = /* @__PURE__ */ Rt(It, [["render", Pt]]);
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var tt = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"], fe = /* @__PURE__ */ tt.join(","), at = typeof Element > "u", U = at ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, ve = !at && Element.prototype.getRootNode ? function(a) {
  var e;
  return a == null || (e = a.getRootNode) === null || e === void 0 ? void 0 : e.call(a);
} : function(a) {
  return a == null ? void 0 : a.ownerDocument;
}, me = function a(e, t) {
  var n;
  t === void 0 && (t = !0);
  var l = e == null || (n = e.getAttribute) === null || n === void 0 ? void 0 : n.call(e, "inert"), r = l === "" || l === "true", i = r || t && e && a(e.parentNode);
  return i;
}, Bt = function(e) {
  var t, n = e == null || (t = e.getAttribute) === null || t === void 0 ? void 0 : t.call(e, "contenteditable");
  return n === "" || n === "true";
}, nt = function(e, t, n) {
  if (me(e))
    return [];
  var l = Array.prototype.slice.apply(e.querySelectorAll(fe));
  return t && U.call(e, fe) && l.unshift(e), l = l.filter(n), l;
}, rt = function a(e, t, n) {
  for (var l = [], r = Array.from(e); r.length; ) {
    var i = r.shift();
    if (!me(i, !1))
      if (i.tagName === "SLOT") {
        var d = i.assignedElements(), f = d.length ? d : i.children, v = a(f, !0, n);
        n.flatten ? l.push.apply(l, v) : l.push({
          scopeParent: i,
          candidates: v
        });
      } else {
        var C = U.call(i, fe);
        C && n.filter(i) && (t || !e.includes(i)) && l.push(i);
        var x = i.shadowRoot || // check for an undisclosed shadow
        typeof n.getShadowRoot == "function" && n.getShadowRoot(i), N = !me(x, !1) && (!n.shadowRootFilter || n.shadowRootFilter(i));
        if (x && N) {
          var u = a(x === !0 ? i.children : x.children, !0, n);
          n.flatten ? l.push.apply(l, u) : l.push({
            scopeParent: i,
            candidates: u
          });
        } else
          r.unshift.apply(r, i.children);
      }
  }
  return l;
}, it = function(e) {
  return !isNaN(parseInt(e.getAttribute("tabindex"), 10));
}, W = function(e) {
  if (!e)
    throw new Error("No node provided");
  return e.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName) || Bt(e)) && !it(e) ? 0 : e.tabIndex;
}, Lt = function(e, t) {
  var n = W(e);
  return n < 0 && t && !it(e) ? 0 : n;
}, Mt = function(e, t) {
  return e.tabIndex === t.tabIndex ? e.documentOrder - t.documentOrder : e.tabIndex - t.tabIndex;
}, lt = function(e) {
  return e.tagName === "INPUT";
}, Dt = function(e) {
  return lt(e) && e.type === "hidden";
}, jt = function(e) {
  var t = e.tagName === "DETAILS" && Array.prototype.slice.apply(e.children).some(function(n) {
    return n.tagName === "SUMMARY";
  });
  return t;
}, Wt = function(e, t) {
  for (var n = 0; n < e.length; n++)
    if (e[n].checked && e[n].form === t)
      return e[n];
}, Ut = function(e) {
  if (!e.name)
    return !0;
  var t = e.form || ve(e), n = function(d) {
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
  var r = Wt(l, e.form);
  return !r || r === e;
}, $t = function(e) {
  return lt(e) && e.type === "radio";
}, qt = function(e) {
  return $t(e) && !Ut(e);
}, Kt = function(e) {
  var t, n = e && ve(e), l = (t = n) === null || t === void 0 ? void 0 : t.host, r = !1;
  if (n && n !== e) {
    var i, d, f;
    for (r = !!((i = l) !== null && i !== void 0 && (d = i.ownerDocument) !== null && d !== void 0 && d.contains(l) || e != null && (f = e.ownerDocument) !== null && f !== void 0 && f.contains(e)); !r && l; ) {
      var v, C, x;
      n = ve(l), l = (v = n) === null || v === void 0 ? void 0 : v.host, r = !!((C = l) !== null && C !== void 0 && (x = C.ownerDocument) !== null && x !== void 0 && x.contains(l));
    }
  }
  return r;
}, je = function(e) {
  var t = e.getBoundingClientRect(), n = t.width, l = t.height;
  return n === 0 && l === 0;
}, Xt = function(e, t) {
  var n = t.displayCheck, l = t.getShadowRoot;
  if (getComputedStyle(e).visibility === "hidden")
    return !0;
  var r = U.call(e, "details>summary:first-of-type"), i = r ? e.parentElement : e;
  if (U.call(i, "details:not([open]) *"))
    return !0;
  if (!n || n === "full" || n === "legacy-full") {
    if (typeof l == "function") {
      for (var d = e; e; ) {
        var f = e.parentElement, v = ve(e);
        if (f && !f.shadowRoot && l(f) === !0)
          return je(e);
        e.assignedSlot ? e = e.assignedSlot : !f && v !== e.ownerDocument ? e = v.host : e = f;
      }
      e = d;
    }
    if (Kt(e))
      return !e.getClientRects().length;
    if (n !== "legacy-full")
      return !0;
  } else if (n === "non-zero-area")
    return je(e);
  return !1;
}, Vt = function(e) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))
    for (var t = e.parentElement; t; ) {
      if (t.tagName === "FIELDSET" && t.disabled) {
        for (var n = 0; n < t.children.length; n++) {
          var l = t.children.item(n);
          if (l.tagName === "LEGEND")
            return U.call(t, "fieldset[disabled] *") ? !0 : !l.contains(e);
        }
        return !0;
      }
      t = t.parentElement;
    }
  return !1;
}, he = function(e, t) {
  return !(t.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  me(t) || Dt(t) || Xt(t, e) || // For a details element with a summary, the summary element gets the focus
  jt(t) || Vt(t));
}, Se = function(e, t) {
  return !(qt(t) || W(t) < 0 || !he(e, t));
}, zt = function(e) {
  var t = parseInt(e.getAttribute("tabindex"), 10);
  return !!(isNaN(t) || t >= 0);
}, Gt = function a(e) {
  var t = [], n = [];
  return e.forEach(function(l, r) {
    var i = !!l.scopeParent, d = i ? l.scopeParent : l, f = Lt(d, i), v = i ? a(l.candidates) : d;
    f === 0 ? i ? t.push.apply(t, v) : t.push(d) : n.push({
      documentOrder: r,
      tabIndex: f,
      item: l,
      isScope: i,
      content: v
    });
  }), n.sort(Mt).reduce(function(l, r) {
    return r.isScope ? l.push.apply(l, r.content) : l.push(r.content), l;
  }, []).concat(t);
}, Ht = function(e, t) {
  t = t || {};
  var n;
  return t.getShadowRoot ? n = rt([e], t.includeContainer, {
    filter: Se.bind(null, t),
    flatten: !1,
    getShadowRoot: t.getShadowRoot,
    shadowRootFilter: zt
  }) : n = nt(e, t.includeContainer, Se.bind(null, t)), Gt(n);
}, Zt = function(e, t) {
  t = t || {};
  var n;
  return t.getShadowRoot ? n = rt([e], t.includeContainer, {
    filter: he.bind(null, t),
    flatten: !0,
    getShadowRoot: t.getShadowRoot
  }) : n = nt(e, t.includeContainer, he.bind(null, t)), n;
}, q = function(e, t) {
  if (t = t || {}, !e)
    throw new Error("No node provided");
  return U.call(e, fe) === !1 ? !1 : Se(t, e);
}, Yt = /* @__PURE__ */ tt.concat("iframe").join(","), ke = function(e, t) {
  if (t = t || {}, !e)
    throw new Error("No node provided");
  return U.call(e, Yt) === !1 ? !1 : he(t, e);
};
/*!
* focus-trap 7.6.2
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
function Ee(a, e) {
  (e == null || e > a.length) && (e = a.length);
  for (var t = 0, n = Array(e); t < e; t++) n[t] = a[t];
  return n;
}
function Jt(a) {
  if (Array.isArray(a)) return Ee(a);
}
function Qt(a, e, t) {
  return (e = na(e)) in a ? Object.defineProperty(a, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : a[e] = t, a;
}
function _t(a) {
  if (typeof Symbol < "u" && a[Symbol.iterator] != null || a["@@iterator"] != null) return Array.from(a);
}
function ea() {
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
      Qt(a, n, t[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(t)) : We(Object(t)).forEach(function(n) {
      Object.defineProperty(a, n, Object.getOwnPropertyDescriptor(t, n));
    });
  }
  return a;
}
function ta(a) {
  return Jt(a) || _t(a) || ra(a) || ea();
}
function aa(a, e) {
  if (typeof a != "object" || !a) return a;
  var t = a[Symbol.toPrimitive];
  if (t !== void 0) {
    var n = t.call(a, e || "default");
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(a);
}
function na(a) {
  var e = aa(a, "string");
  return typeof e == "symbol" ? e : e + "";
}
function ra(a, e) {
  if (a) {
    if (typeof a == "string") return Ee(a, e);
    var t = {}.toString.call(a).slice(8, -1);
    return t === "Object" && a.constructor && (t = a.constructor.name), t === "Map" || t === "Set" ? Array.from(a) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? Ee(a, e) : void 0;
  }
}
var $e = {
  activateTrap: function(e, t) {
    if (e.length > 0) {
      var n = e[e.length - 1];
      n !== t && n.pause();
    }
    var l = e.indexOf(t);
    l === -1 || e.splice(l, 1), e.push(t);
  },
  deactivateTrap: function(e, t) {
    var n = e.indexOf(t);
    n !== -1 && e.splice(n, 1), e.length > 0 && e[e.length - 1].unpause();
  }
}, ia = function(e) {
  return e.tagName && e.tagName.toLowerCase() === "input" && typeof e.select == "function";
}, la = function(e) {
  return (e == null ? void 0 : e.key) === "Escape" || (e == null ? void 0 : e.key) === "Esc" || (e == null ? void 0 : e.keyCode) === 27;
}, ee = function(e) {
  return (e == null ? void 0 : e.key) === "Tab" || (e == null ? void 0 : e.keyCode) === 9;
}, oa = function(e) {
  return ee(e) && !e.shiftKey;
}, sa = function(e) {
  return ee(e) && e.shiftKey;
}, qe = function(e) {
  return setTimeout(e, 0);
}, Q = function(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), l = 1; l < t; l++)
    n[l - 1] = arguments[l];
  return typeof e == "function" ? e.apply(void 0, n) : e;
}, oe = function(e) {
  return e.target.shadowRoot && typeof e.composedPath == "function" ? e.composedPath()[0] : e.target;
}, ua = [], da = function(e, t) {
  var n = (t == null ? void 0 : t.document) || document, l = (t == null ? void 0 : t.trapStack) || ua, r = Ue({
    returnFocusOnDeactivate: !0,
    escapeDeactivates: !0,
    delayInitialFocus: !0,
    isKeyForward: oa,
    isKeyBackward: sa
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
  }, d, f = function(o, s, c) {
    return o && o[s] !== void 0 ? o[s] : r[c || s];
  }, v = function(o, s) {
    var c = typeof (s == null ? void 0 : s.composedPath) == "function" ? s.composedPath() : void 0;
    return i.containerGroups.findIndex(function(b) {
      var g = b.container, k = b.tabbableNodes;
      return g.contains(o) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (c == null ? void 0 : c.includes(g)) || k.find(function(h) {
        return h === o;
      });
    });
  }, C = function(o) {
    var s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, c = s.hasFallback, b = c === void 0 ? !1 : c, g = s.params, k = g === void 0 ? [] : g, h = r[o];
    if (typeof h == "function" && (h = h.apply(void 0, ta(k))), h === !0 && (h = void 0), !h) {
      if (h === void 0 || h === !1)
        return h;
      throw new Error("`".concat(o, "` was specified but was not a node, or did not return a node"));
    }
    var S = h;
    if (typeof h == "string") {
      try {
        S = n.querySelector(h);
      } catch (E) {
        throw new Error("`".concat(o, '` appears to be an invalid selector; error="').concat(E.message, '"'));
      }
      if (!S && !b)
        throw new Error("`".concat(o, "` as selector refers to no known node"));
    }
    return S;
  }, x = function() {
    var o = C("initialFocus", {
      hasFallback: !0
    });
    if (o === !1)
      return !1;
    if (o === void 0 || o && !ke(o, r.tabbableOptions))
      if (v(n.activeElement) >= 0)
        o = n.activeElement;
      else {
        var s = i.tabbableGroups[0], c = s && s.firstTabbableNode;
        o = c || C("fallbackFocus");
      }
    else o === null && (o = C("fallbackFocus"));
    if (!o)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return o;
  }, N = function() {
    if (i.containerGroups = i.containers.map(function(o) {
      var s = Ht(o, r.tabbableOptions), c = Zt(o, r.tabbableOptions), b = s.length > 0 ? s[0] : void 0, g = s.length > 0 ? s[s.length - 1] : void 0, k = c.find(function(E) {
        return q(E);
      }), h = c.slice().reverse().find(function(E) {
        return q(E);
      }), S = !!s.find(function(E) {
        return W(E) > 0;
      });
      return {
        container: o,
        tabbableNodes: s,
        focusableNodes: c,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: S,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode: b,
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
        firstDomTabbableNode: k,
        /** Last tabbable node in container, __DOM__ order; `undefined` if none. */
        lastDomTabbableNode: h,
        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function(j) {
          var Z = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, L = s.indexOf(j);
          return L < 0 ? Z ? c.slice(c.indexOf(j) + 1).find(function(Y) {
            return q(Y);
          }) : c.slice(0, c.indexOf(j)).reverse().find(function(Y) {
            return q(Y);
          }) : s[L + (Z ? 1 : -1)];
        }
      };
    }), i.tabbableGroups = i.containerGroups.filter(function(o) {
      return o.tabbableNodes.length > 0;
    }), i.tabbableGroups.length <= 0 && !C("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (i.containerGroups.find(function(o) {
      return o.posTabIndexesFound;
    }) && i.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, u = function(o) {
    var s = o.activeElement;
    if (s)
      return s.shadowRoot && s.shadowRoot.activeElement !== null ? u(s.shadowRoot) : s;
  }, m = function(o) {
    if (o !== !1 && o !== u(document)) {
      if (!o || !o.focus) {
        m(x());
        return;
      }
      o.focus({
        preventScroll: !!r.preventScroll
      }), i.mostRecentlyFocusedNode = o, ia(o) && o.select();
    }
  }, p = function(o) {
    var s = C("setReturnFocus", {
      params: [o]
    });
    return s || (s === !1 ? !1 : o);
  }, I = function(o) {
    var s = o.target, c = o.event, b = o.isBackward, g = b === void 0 ? !1 : b;
    s = s || oe(c), N();
    var k = null;
    if (i.tabbableGroups.length > 0) {
      var h = v(s, c), S = h >= 0 ? i.containerGroups[h] : void 0;
      if (h < 0)
        g ? k = i.tabbableGroups[i.tabbableGroups.length - 1].lastTabbableNode : k = i.tabbableGroups[0].firstTabbableNode;
      else if (g) {
        var E = i.tabbableGroups.findIndex(function(we) {
          var Ce = we.firstTabbableNode;
          return s === Ce;
        });
        if (E < 0 && (S.container === s || ke(s, r.tabbableOptions) && !q(s, r.tabbableOptions) && !S.nextTabbableNode(s, !1)) && (E = h), E >= 0) {
          var j = E === 0 ? i.tabbableGroups.length - 1 : E - 1, Z = i.tabbableGroups[j];
          k = W(s) >= 0 ? Z.lastTabbableNode : Z.lastDomTabbableNode;
        } else ee(c) || (k = S.nextTabbableNode(s, !1));
      } else {
        var L = i.tabbableGroups.findIndex(function(we) {
          var Ce = we.lastTabbableNode;
          return s === Ce;
        });
        if (L < 0 && (S.container === s || ke(s, r.tabbableOptions) && !q(s, r.tabbableOptions) && !S.nextTabbableNode(s)) && (L = h), L >= 0) {
          var Y = L === i.tabbableGroups.length - 1 ? 0 : L + 1, Le = i.tabbableGroups[Y];
          k = W(s) >= 0 ? Le.firstTabbableNode : Le.firstDomTabbableNode;
        } else ee(c) || (k = S.nextTabbableNode(s));
      }
    } else
      k = C("fallbackFocus");
    return k;
  }, P = function(o) {
    var s = oe(o);
    if (!(v(s, o) >= 0)) {
      if (Q(r.clickOutsideDeactivates, o)) {
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
      Q(r.allowOutsideClick, o) || o.preventDefault();
    }
  }, re = function(o) {
    var s = oe(o), c = v(s, o) >= 0;
    if (c || s instanceof Document)
      c && (i.mostRecentlyFocusedNode = s);
    else {
      o.stopImmediatePropagation();
      var b, g = !0;
      if (i.mostRecentlyFocusedNode)
        if (W(i.mostRecentlyFocusedNode) > 0) {
          var k = v(i.mostRecentlyFocusedNode), h = i.containerGroups[k].tabbableNodes;
          if (h.length > 0) {
            var S = h.findIndex(function(E) {
              return E === i.mostRecentlyFocusedNode;
            });
            S >= 0 && (r.isKeyForward(i.recentNavEvent) ? S + 1 < h.length && (b = h[S + 1], g = !1) : S - 1 >= 0 && (b = h[S - 1], g = !1));
          }
        } else
          i.containerGroups.some(function(E) {
            return E.tabbableNodes.some(function(j) {
              return W(j) > 0;
            });
          }) || (g = !1);
      else
        g = !1;
      g && (b = I({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: i.mostRecentlyFocusedNode,
        isBackward: r.isKeyBackward(i.recentNavEvent)
      })), m(b || i.mostRecentlyFocusedNode || x());
    }
    i.recentNavEvent = void 0;
  }, ge = function(o) {
    var s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    i.recentNavEvent = o;
    var c = I({
      event: o,
      isBackward: s
    });
    c && (ee(o) && o.preventDefault(), m(c));
  }, G = function(o) {
    (r.isKeyForward(o) || r.isKeyBackward(o)) && ge(o, r.isKeyBackward(o));
  }, xe = function(o) {
    la(o) && Q(r.escapeDeactivates, o) !== !1 && (o.preventDefault(), d.deactivate());
  }, Ae = function(o) {
    var s = oe(o);
    v(s, o) >= 0 || Q(r.clickOutsideDeactivates, o) || Q(r.allowOutsideClick, o) || (o.preventDefault(), o.stopImmediatePropagation());
  }, Pe = function() {
    if (i.active)
      return $e.activateTrap(l, d), i.delayInitialFocusTimer = r.delayInitialFocus ? qe(function() {
        m(x());
      }) : m(x()), n.addEventListener("focusin", re, !0), n.addEventListener("mousedown", P, {
        capture: !0,
        passive: !1
      }), n.addEventListener("touchstart", P, {
        capture: !0,
        passive: !1
      }), n.addEventListener("click", Ae, {
        capture: !0,
        passive: !1
      }), n.addEventListener("keydown", G, {
        capture: !0,
        passive: !1
      }), n.addEventListener("keydown", xe), d;
  }, Be = function() {
    if (i.active)
      return n.removeEventListener("focusin", re, !0), n.removeEventListener("mousedown", P, !0), n.removeEventListener("touchstart", P, !0), n.removeEventListener("click", Ae, !0), n.removeEventListener("keydown", G, !0), n.removeEventListener("keydown", xe), d;
  }, st = function(o) {
    var s = o.some(function(c) {
      var b = Array.from(c.removedNodes);
      return b.some(function(g) {
        return g === i.mostRecentlyFocusedNode;
      });
    });
    s && m(x());
  }, ye = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(st) : void 0, H = function() {
    ye && (ye.disconnect(), i.active && !i.paused && i.containers.map(function(o) {
      ye.observe(o, {
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
      var s = f(o, "onActivate"), c = f(o, "onPostActivate"), b = f(o, "checkCanFocusTrap");
      b || N(), i.active = !0, i.paused = !1, i.nodeFocusedBeforeActivation = n.activeElement, s == null || s();
      var g = function() {
        b && N(), Pe(), H(), c == null || c();
      };
      return b ? (b(i.containers.concat()).then(g, g), this) : (g(), this);
    },
    deactivate: function(o) {
      if (!i.active)
        return this;
      var s = Ue({
        onDeactivate: r.onDeactivate,
        onPostDeactivate: r.onPostDeactivate,
        checkCanReturnFocus: r.checkCanReturnFocus
      }, o);
      clearTimeout(i.delayInitialFocusTimer), i.delayInitialFocusTimer = void 0, Be(), i.active = !1, i.paused = !1, H(), $e.deactivateTrap(l, d);
      var c = f(s, "onDeactivate"), b = f(s, "onPostDeactivate"), g = f(s, "checkCanReturnFocus"), k = f(s, "returnFocus", "returnFocusOnDeactivate");
      c == null || c();
      var h = function() {
        qe(function() {
          k && m(p(i.nodeFocusedBeforeActivation)), b == null || b();
        });
      };
      return k && g ? (g(p(i.nodeFocusedBeforeActivation)).then(h, h), this) : (h(), this);
    },
    pause: function(o) {
      if (i.paused || !i.active)
        return this;
      var s = f(o, "onPause"), c = f(o, "onPostPause");
      return i.paused = !0, s == null || s(), Be(), H(), c == null || c(), this;
    },
    unpause: function(o) {
      if (!i.paused || !i.active)
        return this;
      var s = f(o, "onUnpause"), c = f(o, "onPostUnpause");
      return i.paused = !1, s == null || s(), N(), Pe(), H(), c == null || c(), this;
    },
    updateContainerElements: function(o) {
      var s = [].concat(o).filter(Boolean);
      return i.containers = s.map(function(c) {
        return typeof c == "string" ? n.querySelector(c) : c;
      }), i.active && N(), H(), this;
    }
  }, d.updateContainerElements(e), d;
};
function ot(a, e) {
  const t = T(null), n = T(null);
  return Ge(() => {
    t.value && (n.value = da(t.value, {
      clickOutsideDeactivates: !a,
      escapeDeactivates: !a,
      onDeactivate: () => e == null ? void 0 : e(),
      fallbackFocus: () => t.value
    }), n.value.activate());
  }), te(() => {
    var l;
    (l = n.value) == null || l.deactivate();
  }), {
    wrapper: t
  };
}
const ca = { class: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4" }, fa = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, va = {
  __name: "ModalContent",
  props: {
    modalContext: Object,
    config: Object
  },
  setup(a) {
    var n;
    const e = a, { wrapper: t } = ot((n = e.config) == null ? void 0 : n.closeExplicitly, () => e.modalContext.close());
    return (l, r) => (F(), D("div", ca, [
      A("div", {
        class: K(["im-modal-positioner flex min-h-full justify-center", {
          "items-start": a.config.position === "top",
          "items-center": a.config.position === "center",
          "items-end": a.config.position === "bottom"
        }])
      }, [
        ue(Ne, {
          appear: "",
          "enter-from-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          "enter-to-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-from-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-to-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          onAfterLeave: a.modalContext.afterLeave
        }, {
          default: X(() => [
            Te(A("div", {
              ref_key: "wrapper",
              ref: t,
              class: K({
                "im-modal-wrapper pointer-events-auto w-full transition duration-300 ease-in-out": !0,
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
              A("div", {
                class: K(["im-modal-content relative", [a.config.paddingClasses, a.config.panelClasses]])
              }, [
                a.config.closeButton ? (F(), D("div", fa, [
                  ue(et, {
                    onClick: a.modalContext.close
                  }, null, 8, ["onClick"])
                ])) : B("", !0),
                z(l.$slots, "default", {
                  modalContext: a.modalContext,
                  config: a.config
                })
              ], 2)
            ], 2), [
              [Oe, a.modalContext.isOpen]
            ])
          ]),
          _: 3
        }, 8, ["onAfterLeave"])
      ], 2)
    ]));
  }
}, ma = { class: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden" }, ha = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, pa = {
  __name: "SlideoverContent",
  props: {
    modalContext: Object,
    config: Object
  },
  setup(a) {
    var n;
    const e = a, { wrapper: t } = ot((n = e.config) == null ? void 0 : n.closeExplicitly, () => e.modalContext.close());
    return (l, r) => (F(), D("div", ma, [
      A("div", {
        class: K(["im-slideover-positioner flex min-h-full items-center", {
          "justify-start rtl:justify-end": a.config.position === "left",
          "justify-end rtl:justify-start": a.config.position === "right"
        }])
      }, [
        ue(Ne, {
          appear: "",
          "enter-from-class": "opacity-0 " + (a.config.position === "left" ? "-translate-x-full" : "translate-x-full"),
          "enter-to-class": "opacity-100 translate-x-0",
          "leave-from-class": "opacity-100 translate-x-0",
          "leave-to-class": "opacity-0 " + (a.config.position === "left" ? "-translate-x-full" : "translate-x-full"),
          onAfterLeave: a.modalContext.afterLeave
        }, {
          default: X(() => [
            Te(A("div", {
              ref_key: "wrapper",
              ref: t,
              class: K({
                "im-slideover-wrapper pointer-events-auto w-full transition duration-300 ease-in-out": !0,
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
              A("div", {
                class: K(["im-slideover-content relative", [a.config.paddingClasses, a.config.panelClasses]])
              }, [
                a.config.closeButton ? (F(), D("div", ha, [
                  ue(et, {
                    onClick: a.modalContext.close
                  }, null, 8, ["onClick"])
                ])) : B("", !0),
                z(l.$slots, "default", {
                  modalContext: a.modalContext,
                  config: a.config
                })
              ], 2)
            ], 2), [
              [Oe, a.modalContext.isOpen]
            ])
          ]),
          _: 3
        }, 8, ["enter-from-class", "leave-to-class", "onAfterLeave"])
      ], 2)
    ]));
  }
}, ba = ["data-inertiaui-modal-id", "data-inertiaui-modal-index", "aria-hidden"], ga = { class: "im-backdrop fixed inset-0 z-30 bg-black/75" }, xa = {
  key: 1,
  class: "im-backdrop fixed inset-0 z-30 bg-black/75"
}, Fa = {
  __name: "Modal",
  setup(a, { expose: e }) {
    const t = T(null), n = T(!1), l = T(!1);
    return se(
      () => t.value,
      (r) => {
        (r == null ? void 0 : r.index) === 0 && (De.prepare(), l.value = !0);
      }
    ), te(() => {
      l.value && De.cleanup();
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
    }), (r, i) => (F(), M(Ft, {
      ref_key: "modal",
      ref: t
    }, {
      default: X(({
        afterLeave: d,
        close: f,
        config: v,
        emit: C,
        getChildModal: x,
        getParentModal: N,
        id: u,
        index: m,
        isOpen: p,
        modalContext: I,
        onTopOfStack: P,
        reload: re,
        setOpen: ge,
        shouldRender: G
      }) => [
        G ? (F(), M(ht, {
          key: 0,
          to: "body"
        }, [
          A("div", {
            "data-inertiaui-modal-id": u,
            "data-inertiaui-modal-index": m,
            class: "im-dialog relative z-20",
            "aria-hidden": !P
          }, [
            m === 0 && P ? (F(), M(Ne, {
              key: 0,
              appear: !n.value,
              "enter-active-class": "transition transform ease-in-out duration-300",
              "enter-from-class": "opacity-0",
              "enter-to-class": "opacity-100",
              "leave-active-class": "transition transform ease-in-out duration-300",
              "leave-from-class": "opacity-100",
              "leave-to-class": "opacity-0",
              onAfterAppear: i[0] || (i[0] = (xe) => n.value = !0)
            }, {
              default: X(() => [
                Te(A("div", ga, null, 512), [
                  [Oe, p]
                ])
              ]),
              _: 2
            }, 1032, ["appear"])) : B("", !0),
            m > 0 && P ? (F(), D("div", xa)) : B("", !0),
            (F(), M(Ze(v != null && v.slideover ? pa : va), {
              "modal-context": I,
              config: v
            }, {
              default: X(() => [
                z(r.$slots, "default", {
                  id: u,
                  afterLeave: d,
                  close: f,
                  config: v,
                  emit: C,
                  getChildModal: x,
                  getParentModal: N,
                  index: m,
                  isOpen: p,
                  modalContext: I,
                  onTopOfStack: P,
                  reload: re,
                  setOpen: ge,
                  shouldRender: G
                })
              ]),
              _: 2
            }, 1032, ["modal-context", "config"]))
          ], 8, ba)
        ])) : B("", !0)
      ]),
      _: 3
    }, 512));
  }
}, Ra = {
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
    const t = a, n = T(!1), l = ne(), r = T(null);
    Ke("modalContext", r);
    const i = e, d = T(!1), f = V(() => t.navigate ?? Fe("navigate"));
    se(
      () => {
        var p;
        return (p = r.value) == null ? void 0 : p.onTopOfStack;
      },
      (p) => {
        r.value && (p && d.value ? i("focus") : p || i("blur"), d.value = !p);
      }
    );
    const v = T(null);
    te(() => {
      var p;
      return (p = v.value) == null ? void 0 : p.call(v);
    });
    const C = He();
    function x() {
      v.value = r.value.registerEventListenersFromAttrs(C);
    }
    se(r, (p, I) => {
      p && !I && (x(), i("success"));
    });
    function N() {
      i("close");
    }
    function u() {
      r.value = null, i("after-leave");
    }
    function m() {
      n.value || (t.href.startsWith("#") || (n.value = !0, i("start")), l.visit(
        t.href,
        t.method,
        t.data,
        t.headers,
        wt(Je(t, Ot)),
        N,
        u,
        t.queryStringArrayFormat,
        f.value
      ).then((p) => {
        r.value = p;
      }).catch((p) => i("error", p)).finally(() => n.value = !1));
    }
    return (p, I) => (F(), M(Ze(a.as), Xe(O(C), {
      href: a.href,
      onClick: pt(m, ["prevent"])
    }), {
      default: X(() => [
        z(p.$slots, "default", { loading: n.value })
      ]),
      _: 3
    }, 16, ["href"]));
  }
};
function Ia() {
  return bt(ze("modalContext", null));
}
function Aa(a, e = {}) {
  return ne().visit(
    a,
    e.method ?? "get",
    e.data ?? {},
    e.headers ?? {},
    e.config ?? {},
    e.onClose,
    e.onAfterLeave,
    e.queryStringArrayFormat ?? "brackets",
    e.navigate ?? Fe("navigate")
  ).then((t) => {
    const n = e.listeners ?? {};
    return Object.keys(n).forEach((l) => {
      const r = l.replace(/([A-Z])/g, "-$1").toLowerCase();
      t.on(r, n[l]);
    }), t;
  });
}
export {
  Ft as HeadlessModal,
  Fa as Modal,
  Ra as ModalLink,
  kt as ModalRoot,
  Fe as getConfig,
  Ta as initFromPageProps,
  Na as putConfig,
  Oa as renderApp,
  Ea as resetConfig,
  Ia as useModal,
  Aa as visitModal
};
