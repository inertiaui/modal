import { computed as A, provide as be, openBlock as C, createBlock as L, unref as b, mergeProps as te, createCommentVNode as D, onUnmounted as I, onBeforeMount as Te, onMounted as W, watch as j, createElementBlock as B, Fragment as Oe, renderSlot as F, ref as y, h as ye, readonly as Ne, markRaw as Le, nextTick as de, toValue as je, inject as ae, onBeforeUnmount as se, useAttrs as Me, createElementVNode as O, normalizeClass as E, createVNode as V, withModifiers as z, Transition as fe, withCtx as q, Teleport as Ie, resolveDynamicComponent as me } from "vue";
import { generateId as Pe, only as Se, kebabCase as _, except as Ue, createDialog as qe, createFocusTrap as ve, focusFirstElement as We, getFocusableElements as Xe, getScrollLockCount as Ke, lockScroll as ie, markAriaHidden as re, onClickOutside as Ve, onEscapeKey as pe, unlockScroll as _e, unmarkAriaHidden as ze, rejectNullValues as He } from "@inertiaui/vanilla";
import { usePage as ge, router as K, progress as Ce } from "@inertiajs/vue3";
import { mergeDataIntoQueryString as Ee } from "@inertiajs/core";
import H from "axios";
const X = {
  type: "modal",
  navigate: !1,
  useNativeDialog: !0,
  modal: {
    closeButton: !0,
    closeExplicitly: !1,
    closeOnClickOutside: !0,
    maxWidth: "2xl",
    paddingClasses: "p-4 sm:p-6",
    panelClasses: "bg-white rounded",
    position: "center"
  },
  slideover: {
    closeButton: !0,
    closeExplicitly: !1,
    closeOnClickOutside: !0,
    maxWidth: "md",
    paddingClasses: "p-4 sm:p-6",
    panelClasses: "bg-white min-h-screen",
    position: "right"
  }
};
class Je {
  constructor() {
    this.config = {}, this.reset();
  }
  reset() {
    this.config = JSON.parse(JSON.stringify(X));
  }
  put(n, e) {
    if (typeof n == "object") {
      this.config = {
        type: n.type ?? X.type,
        navigate: n.navigate ?? X.navigate,
        useNativeDialog: n.useNativeDialog ?? X.useNativeDialog,
        modal: { ...X.modal, ...n.modal ?? {} },
        slideover: { ...X.slideover, ...n.slideover ?? {} }
      };
      return;
    }
    const l = n.split(".");
    let u = this.config;
    for (let o = 0; o < l.length - 1; o++)
      u = u[l[o]] = u[l[o]] || {};
    u[l[l.length - 1]] = e;
  }
  get(n) {
    if (typeof n > "u")
      return this.config;
    const e = n.split(".");
    let l = this.config;
    for (const u of e) {
      if (l == null || typeof l != "object")
        return null;
      l = l[u];
    }
    return l === void 0 ? null : l;
  }
}
const ne = new Je(), $t = () => ne.reset(), At = (t, n) => ne.put(t, n), le = (t) => ne.get(t), U = (t, n) => ne.get(t ? `slideover.${n}` : `modal.${n}`);
function G(t = "inertiaui_modal_") {
  return Pe(t);
}
function Y(t, n) {
  const e = typeof window < "u" ? window.location.origin : "http://localhost", l = typeof t == "string" ? new URL(t, e) : t, u = typeof n == "string" ? new URL(n, e) : n;
  return `${l.origin}${l.pathname}` == `${u.origin}${u.pathname}`;
}
const Be = {
  __name: "ModalRenderer",
  props: {
    index: {
      type: Number,
      required: !0
    }
  },
  setup(t) {
    const n = t, e = Q(), l = A(() => e.stack.value[n.index]);
    return be("modalContext", l), (u, o) => {
      var a;
      return (a = l.value) != null && a.component ? (C(), L(b(l).component, te({ key: 0 }, b(Se)(l.value.props ?? {}, l.value.getComponentPropKeys(), !0), {
        onModalEvent: o[0] || (o[0] = (i, ...c) => l.value.emit(i, ...c))
      }), null, 16)) : D("", !0);
    };
  }
}, Qe = {
  __name: "ModalRoot",
  setup(t) {
    const n = Q(), e = ge();
    let l = !1, u = !1;
    const o = /* @__PURE__ */ new Set(), a = (c) => c.id || `${c.component}:${c.url}`;
    I(K.on("start", () => l = !0)), I(K.on("finish", () => l = !1)), I(
      K.on("navigate", (c) => {
        const d = c.detail.page.props._inertiaui_modal, f = c.detail.page.url;
        if (!d) {
          n.closeAll(!0), n.setBaseUrl(null), u = !1;
          return;
        }
        if (!Y(f, d.url)) {
          n.closeAll(!0), n.setBaseUrl(null), u = !1;
          return;
        }
        n.setBaseUrl(d.baseUrl);
        const r = a(d);
        o.has(r) || d.id && n.stack.value.some((m) => m.id === d.id) || n.stack.value.some((m) => {
          var h, s;
          return ((h = m.response) == null ? void 0 : h.component) === d.component && Y((s = m.response) == null ? void 0 : s.url, d.url);
        }) || (o.add(r), n.pushFromResponseData(d, {}, () => {
          if (!d.baseUrl) {
            console.error("No base url in modal response data so cannot navigate back");
            return;
          }
          !l && typeof window < "u" && window.location.href !== d.baseUrl && K.visit(d.baseUrl, {
            preserveScroll: !0,
            preserveState: !0
          });
        }).then(() => {
          o.delete(r);
        }));
      })
    );
    const i = (c) => {
      var f;
      const d = n.getBaseUrl() ?? (u ? (f = e.props._inertiaui_modal) == null ? void 0 : f.baseUrl : null);
      return d && (c.headers["X-InertiaUI-Modal-Base-Url"] = d), c;
    };
    return Te(() => H.interceptors.request.use(i)), W(() => u = !!e.props._inertiaui_modal), I(() => H.interceptors.request.eject(i)), j(
      () => {
        var c;
        return (c = e.props) == null ? void 0 : c._inertiaui_modal;
      },
      (c, d) => {
        var f;
        if (c) {
          if (d && c.component === d.component && Y(c.url, d.url)) {
            (f = n.stack.value[0]) == null || f.updateProps(c.props ?? {});
            return;
          }
          if (!d && n.stack.value.length > 0) {
            const r = n.stack.value.find(
              (m) => {
                var h, s;
                return ((h = m.response) == null ? void 0 : h.component) === c.component && Y((s = m.response) == null ? void 0 : s.url, c.url);
              }
            );
            r && r.updateProps(c.props ?? {});
          }
        }
      }
    ), (c, d) => (C(), B(Oe, null, [
      F(c.$slots, "default"),
      b(n).stack.value.length ? (C(), L(Be, {
        key: 0,
        index: 0
      })) : D("", !0)
    ], 64));
  }
};
let J = null;
const N = y(null), k = y([]), Z = y({}), ue = /* @__PURE__ */ new Map(), oe = /* @__PURE__ */ new Map();
function he(t, n, e) {
  return `${n}:${t}:${JSON.stringify(e)}`;
}
function $e(t, n, e) {
  const l = he(t, n, e), u = ue.get(l);
  return u ? Date.now() > u.expiresAt ? (ue.delete(l), null) : u.response : null;
}
function Ye(t, n, e, l, u) {
  const o = he(t, n, e);
  ue.set(o, {
    response: l,
    timestamp: Date.now(),
    expiresAt: Date.now() + u
  });
}
function Ge(t, n = {}) {
  var s;
  if (t.startsWith("#"))
    return Promise.resolve();
  const e = (n.method ?? "get").toLowerCase(), l = n.data ?? {}, u = n.headers ?? {}, o = n.queryStringArrayFormat ?? "brackets", a = n.cacheFor ?? 3e4, [i, c] = Ee(e, t || "", l, o);
  if ($e(i, e, c))
    return Promise.resolve();
  const f = he(i, e, c), r = oe.get(f);
  if (r)
    return r.then(() => {
    });
  (s = n.onPrefetching) == null || s.call(n);
  const m = {
    ...u,
    Accept: "text/html, application/xhtml+xml",
    "X-Requested-With": "XMLHttpRequest",
    "X-Inertia": !0,
    "X-Inertia-Version": ge().version ?? "",
    "X-InertiaUI-Modal": G(),
    "X-InertiaUI-Modal-Base-Url": N.value
  }, h = H({ url: i, method: e, data: c, headers: m }).then((v) => {
    var M;
    return Ye(i, e, c, v, a), (M = n.onPrefetched) == null || M.call(n), v;
  }).finally(() => {
    oe.delete(f);
  });
  return oe.set(f, h), h.then(() => {
  });
}
const Ze = (t) => {
  J = t;
}, Dt = (t) => {
  t.resolveComponent && (J = t.resolveComponent);
};
class et {
  constructor(n, e, l, u, o) {
    this.getComponentPropKeys = () => {
      if (!this.component)
        return [];
      const a = this.component.props;
      return Array.isArray(a) ? a : a ? Object.keys(a) : [];
    }, this.getParentModal = () => {
      const a = this.index.value;
      return a < 1 ? null : k.value.slice(0, a).reverse().find((i) => i.isOpen);
    }, this.getChildModal = () => {
      const a = this.index.value;
      return a === k.value.length - 1 ? null : k.value.slice(a + 1).find((i) => i.isOpen) ?? null;
    }, this.show = () => {
      const a = this.index.value;
      if (a > -1) {
        if (k.value[a].isOpen)
          return;
        k.value[a].isOpen = !0, k.value[a].shouldRender = !0;
      }
    }, this.close = () => {
      var i;
      const a = this.index.value;
      if (a > -1) {
        if (!k.value[a].isOpen)
          return;
        Object.keys(this.listeners).forEach((c) => {
          this.off(c);
        }), k.value[a].isOpen = !1, (i = this.onCloseCallback) == null || i.call(this), this.onCloseCallback = null;
      }
    }, this.setOpen = (a) => {
      a ? this.show() : this.close();
    }, this.afterLeave = () => {
      var i;
      const a = this.index.value;
      if (a > -1) {
        if (k.value[a].isOpen)
          return;
        k.value[a].shouldRender = !1, (i = this.afterLeaveCallback) == null || i.call(this), this.afterLeaveCallback = null;
      }
      a === 0 && (k.value = [], N.value && typeof window < "u" && K.push({
        url: N.value,
        preserveScroll: !0,
        preserveState: !0,
        // Clear _inertiaui_modal prop to prevent modal from reopening
        // Must explicitly set to undefined since props are merged
        props: (c) => {
          const { _inertiaui_modal: d, ...f } = c;
          return { ...f, _inertiaui_modal: void 0 };
        }
      }), N.value = null);
    }, this.on = (a, i) => {
      a = _(a), this.listeners[a] = this.listeners[a] ?? [], this.listeners[a].push(i);
    }, this.off = (a, i) => {
      var c;
      a = _(a), i ? this.listeners[a] = ((c = this.listeners[a]) == null ? void 0 : c.filter((d) => d !== i)) ?? [] : delete this.listeners[a];
    }, this.emit = (a, ...i) => {
      var c;
      (c = this.listeners[_(a)]) == null || c.forEach((d) => d(...i));
    }, this.registerEventListenersFromAttrs = (a) => {
      const i = [];
      return Object.keys(a).filter((c) => c.startsWith("on")).forEach((c) => {
        const d = _(c).replace(/^on-/, ""), f = a[c];
        this.on(d, f), i.push(() => this.off(d, f));
      }), () => i.forEach((c) => c());
    }, this.reload = (a = {}) => {
      var f, r;
      let i = Object.keys(this.response.props);
      if (a.only && (i = a.only), a.except && (i = Ue(i, a.except)), !((f = this.response) != null && f.url))
        return;
      const c = (a.method ?? "get").toLowerCase(), d = a.data ?? {};
      (r = a.onStart) == null || r.call(a), H({
        url: this.response.url,
        method: c,
        data: c === "get" ? {} : d,
        params: c === "get" ? d : {},
        headers: {
          ...a.headers ?? {},
          Accept: "text/html, application/xhtml+xml",
          "X-Inertia": !0,
          "X-Inertia-Partial-Component": this.response.component,
          "X-Inertia-Version": this.response.version ?? "",
          "X-Inertia-Partial-Data": i.join(","),
          "X-InertiaUI-Modal": G(),
          "X-InertiaUI-Modal-Base-Url": N.value
        }
      }).then((m) => {
        var h;
        this.updateProps(m.data.props), (h = a.onSuccess) == null || h.call(a, m);
      }).catch((m) => {
        var h;
        (h = a.onError) == null || h.call(a, m);
      }).finally(() => {
        var m;
        (m = a.onFinish) == null || m.call(a);
      });
    }, this.updateProps = (a) => {
      Object.assign(this.props.value, a);
    }, this.id = e.id ?? G(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = n, this.props = y(e.props ?? {}), this.response = e, this.config = l ?? {}, this.onCloseCallback = u ?? null, this.afterLeaveCallback = o ?? null, this.index = A(() => k.value.findIndex((a) => a.id === this.id)), this.onTopOfStack = A(() => {
      var i;
      return k.value.length < 2 ? !0 : ((i = k.value.map((c) => ({ id: c.id, shouldRender: c.shouldRender })).reverse().find((c) => c.shouldRender)) == null ? void 0 : i.id) === this.id;
    });
  }
}
function tt(t, n) {
  Z.value[t] = { name: t, callback: n };
}
function at(t, n, e, l, u) {
  if (!Z.value[t])
    throw new Error(`The local modal "${t}" has not been registered.`);
  const a = xe(null, { props: u ?? {} }, n, e, l);
  return a.name = t, Z.value[t].callback(a), a;
}
function nt(t) {
  return typeof t == "object" && t !== null && "component" in t && typeof t.component == "string";
}
function ke(t, n, e) {
  !t || !n || typeof window > "u" || K.push({
    url: t,
    preserveScroll: !0,
    preserveState: !0,
    // Store modal data in page props for history navigation
    // This allows forward/back to restore the modal
    props: e ? (l) => ({
      ...l,
      _inertiaui_modal: {
        ...e,
        baseUrl: N.value
      }
    }) : void 0
  });
}
function ce(t, n = {}, e = null, l = null) {
  return J ? nt(t) ? J(t.component).then(
    (u) => xe(Le(u), t, n, e, l)
  ) : Promise.reject(
    new Error(
      "Invalid modal response. This usually happens when the server returns a redirect (e.g., due to session expiration). Check if the user is still authenticated."
    )
  ) : Promise.reject(new Error("Component resolver not set"));
}
function lt(t, n, e = {}, l = {}, u = {}, o = null, a = null, i = "brackets", c = !1, d = null, f = null, r = null, m = null) {
  const h = G();
  return new Promise((s, v) => {
    var S;
    if (t.startsWith("#")) {
      s(at(t.substring(1), u, o, a, m));
      return;
    }
    const [M, R] = Ee(n, t || "", e, i), $ = $e(M, n, R);
    if ($) {
      f == null || f($), ce($.data, u, o, a).then((p) => {
        ke($.data.url, c, $.data), s(p);
      }).catch(v);
      return;
    }
    k.value.length === 0 && (N.value = typeof window < "u" ? window.location.href : "");
    const T = {
      ...l,
      Accept: "text/html, application/xhtml+xml",
      "X-Requested-With": "XMLHttpRequest",
      "X-Inertia": !0,
      "X-Inertia-Version": ge().version ?? "",
      "X-InertiaUI-Modal": h,
      "X-InertiaUI-Modal-Base-Url": N.value
    };
    d == null || d(), (S = Ce) == null || S.start(), H({ url: M, method: n, data: R, headers: T }).then((p) => {
      f == null || f(p), ce(p.data, u, o, a).then((x) => {
        ke(p.data.url, c, p.data), s(x);
      }).catch(v);
    }).catch((...p) => {
      r == null || r(...p), v(p[0]);
    }).finally(() => {
      var p;
      (p = Ce) == null || p.finish();
    });
  });
}
function ot(t) {
  var e, l;
  const n = (l = (e = t.response) == null ? void 0 : e.meta) == null ? void 0 : l.deferredProps;
  n && Object.keys(n).forEach((u) => {
    t.reload({ only: n[u] });
  });
}
function xe(t, n, e, l, u) {
  const o = new et(t, n, e, l, u);
  return k.value.push(o), ot(o), de(() => o.show()), o;
}
const st = ["closeButton", "closeExplicitly", "closeOnClickOutside", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], Ft = (t, n) => (n.resolveComponent && (J = n.resolveComponent), () => ye(Qe, () => ye(t, n)));
function Q() {
  return {
    setComponentResolver: Ze,
    getBaseUrl: () => N.value,
    setBaseUrl: (t) => N.value = t,
    stack: Ne(k),
    push: xe,
    pushFromResponseData: ce,
    closeAll: (t = !1) => {
      t ? k.value = [] : [...k.value].reverse().forEach((n) => n.close());
    },
    reset: () => k.value = [],
    visit: lt,
    registerLocalModal: tt,
    removeLocalModal: (t) => delete Z.value[t]
  };
}
function it() {
  return je(ae("modalContext", null));
}
const Rt = {
  __name: "Deferred",
  props: {
    data: {
      type: [String, Array],
      required: !0
    }
  },
  setup(t) {
    const n = t, e = ae("modalContext");
    if (!e)
      throw new Error("Deferred component must be used inside a Modal component");
    const l = A(() => (Array.isArray(n.data) ? n.data : [n.data]).every((o) => e.value.props[o] !== void 0));
    return (u, o) => l.value ? F(u.$slots, "default", { key: 0 }) : F(u.$slots, "fallback", { key: 1 });
  }
}, rt = /* @__PURE__ */ Object.assign({
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
    closeOnClickOutside: {
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
  setup(t, { expose: n, emit: e }) {
    const l = t, u = Q(), o = l.name ? y({}) : ae("modalContext"), a = A(() => {
      var v;
      const s = ((v = o.value.config) == null ? void 0 : v.slideover) ?? l.slideover ?? le("type") === "slideover";
      return {
        slideover: s,
        closeButton: l.closeButton ?? U(s, "closeButton"),
        closeExplicitly: l.closeExplicitly ?? U(s, "closeExplicitly"),
        closeOnClickOutside: l.closeOnClickOutside ?? U(s, "closeOnClickOutside"),
        maxWidth: l.maxWidth ?? U(s, "maxWidth"),
        paddingClasses: l.paddingClasses ?? U(s, "paddingClasses"),
        panelClasses: l.panelClasses ?? U(s, "panelClasses"),
        position: l.position ?? U(s, "position"),
        ...o.value.config
      };
    });
    l.name && (u.registerLocalModal(l.name, function(s) {
      o.value = s, d();
    }), se(() => {
      u.removeLocalModal(l.name);
    })), W(() => {
      l.name || d();
    });
    const i = y(null);
    se(() => {
      var s;
      return (s = i.value) == null ? void 0 : s.call(i);
    });
    const c = Me();
    function d() {
      i.value = o.value.registerEventListenersFromAttrs(c);
    }
    const f = e;
    function r(s, ...v) {
      f("modal-event", s, ...v);
    }
    n({
      emit: r,
      afterLeave: () => {
        var s;
        return (s = o.value) == null ? void 0 : s.afterLeave();
      },
      close: () => {
        var s;
        return (s = o.value) == null ? void 0 : s.close();
      },
      reload: (...s) => {
        var v;
        return (v = o.value) == null ? void 0 : v.reload(...s);
      },
      setOpen: (...s) => {
        var v;
        return (v = o.value) == null ? void 0 : v.setOpen(...s);
      },
      getChildModal: () => {
        var s;
        return (s = o.value) == null ? void 0 : s.getChildModal();
      },
      getParentModal: () => {
        var s;
        return (s = o.value) == null ? void 0 : s.getParentModal();
      },
      get config() {
        var s;
        return (s = o.value) == null ? void 0 : s.config;
      },
      get id() {
        var s;
        return (s = o.value) == null ? void 0 : s.id;
      },
      get index() {
        var s;
        return (s = o.value) == null ? void 0 : s.index;
      },
      get isOpen() {
        var s;
        return (s = o.value) == null ? void 0 : s.isOpen;
      },
      get modalContext() {
        var s;
        return (s = o.value) == null ? void 0 : s.modalContext;
      },
      get onTopOfStack() {
        var s;
        return (s = o.value) == null ? void 0 : s.onTopOfStack;
      },
      get shouldRender() {
        var s;
        return (s = o.value) == null ? void 0 : s.shouldRender;
      }
    }), j(
      () => {
        var s;
        return (s = o.value) == null ? void 0 : s.onTopOfStack;
      },
      (s, v) => {
        s && !v ? f("focus") : !s && v && f("blur");
      }
    ), j(
      () => {
        var s;
        return (s = o.value) == null ? void 0 : s.isOpen;
      },
      (s, v) => {
        s ? f("success") : v === !0 && f("close");
      },
      { immediate: !0 }
    );
    const m = A(() => {
      var s;
      return (s = u.stack.value.find((v) => v.shouldRender && v.index > o.value.index)) == null ? void 0 : s.index;
    }), h = A(() => {
      const s = o.value;
      return s ? b(s.props) ?? {} : {};
    });
    return (s, v) => (C(), B(Oe, null, [
      b(o).shouldRender ? F(s.$slots, "default", te({ key: 0 }, h.value, {
        id: b(o).id,
        afterLeave: b(o).afterLeave,
        close: b(o).close,
        config: a.value,
        emit: r,
        getChildModal: b(o).getChildModal,
        getParentModal: b(o).getParentModal,
        index: b(o).index,
        isOpen: b(o).isOpen,
        modalContext: b(o),
        onTopOfStack: b(o).onTopOfStack,
        reload: b(o).reload,
        setOpen: b(o).setOpen,
        shouldRender: b(o).shouldRender
      })) : D("", !0),
      m.value ? (C(), L(Be, {
        key: 1,
        index: m.value
      }, null, 8, ["index"])) : D("", !0)
    ], 64));
  }
}), ee = {
  __name: "CloseButton",
  setup(t) {
    const n = it();
    return (e, l) => (C(), B("button", {
      type: "button",
      class: "im-close-button text-gray-400 hover:text-gray-500",
      onClick: l[0] || (l[0] = (u) => b(n).close())
    }, [...l[1] || (l[1] = [
      O("span", { class: "sr-only" }, "Close", -1),
      O("svg", {
        class: "size-6",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        "stroke-width": "2",
        stroke: "currentColor",
        "aria-hidden": "true"
      }, [
        O("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          d: "M6 18L18 6M6 6l12 12"
        })
      ], -1)
    ])]));
  }
}, Tt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createDialog: qe,
  createFocusTrap: ve,
  focusFirstElement: We,
  getFocusableElements: Xe,
  getScrollLockCount: Ke,
  lockScroll: ie,
  markAriaHidden: re,
  onClickOutside: Ve,
  onEscapeKey: pe,
  unlockScroll: _e,
  unmarkAriaHidden: ze
}, Symbol.toStringTag, { value: "Module" })), we = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-md md:max-w-lg",
  xl: "sm:max-w-md md:max-w-xl",
  "2xl": "sm:max-w-md md:max-w-xl lg:max-w-2xl",
  "3xl": "sm:max-w-md md:max-w-xl lg:max-w-3xl",
  "4xl": "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl",
  "5xl": "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl",
  "6xl": "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl",
  "7xl": "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl"
}, ut = "2xl";
function Ae(t) {
  return we[t] || we[ut];
}
const ct = { class: "im-modal-container fixed inset-0 overflow-y-auto p-4" }, dt = ["data-inertiaui-modal-entered"], ft = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, mt = ["data-inertiaui-modal-entered"], vt = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, pt = {
  __name: "ModalContent",
  props: {
    modalContext: Object,
    config: Object,
    useNativeDialog: Boolean,
    isFirstModal: Boolean
  },
  emits: ["after-leave"],
  setup(t, { emit: n }) {
    const e = t, l = n, u = y(!1), o = y(!1), a = y(null), i = y(null);
    let c = null, d = null;
    const f = A(() => Ae(e.config.maxWidth));
    function r() {
      e.useNativeDialog || !a.value || !e.modalContext.onTopOfStack || c || (c = ve(a.value, {
        initialFocus: !0,
        returnFocus: !1
      }));
    }
    function m() {
      c && (c(), c = null);
    }
    function h() {
      var x;
      e.useNativeDialog || d || (x = e.config) != null && x.closeExplicitly || (d = pe(() => {
        e.modalContext.onTopOfStack && e.modalContext.close();
      }));
    }
    function s() {
      d && (d(), d = null);
    }
    function v(x) {
      var g, w;
      e.useNativeDialog || e.modalContext.onTopOfStack && ((g = e.config) != null && g.closeExplicitly || ((w = e.config) == null ? void 0 : w.closeOnClickOutside) !== !1 && a.value && (a.value.contains(x.target) || e.modalContext.close()));
    }
    function M() {
      u.value = !0, r();
    }
    function R() {
      l("after-leave"), e.modalContext.afterLeave();
    }
    function $(x) {
      var g;
      x.preventDefault(), e.modalContext.onTopOfStack && !((g = e.config) != null && g.closeExplicitly) && e.modalContext.close();
    }
    function T(x) {
      var g, w;
      x.target === i.value && e.modalContext.onTopOfStack && !((g = e.config) != null && g.closeExplicitly) && ((w = e.config) == null ? void 0 : w.closeOnClickOutside) !== !1 && e.modalContext.close();
    }
    function S() {
      i.value && !i.value.open && (i.value.showModal(), de(() => {
        requestAnimationFrame(() => {
          u.value = !0;
        });
      }));
    }
    function p() {
      i.value && i.value.open && (o.value = !0, u.value = !1, setTimeout(() => {
        i.value && i.value.close(), o.value = !1, l("after-leave"), e.modalContext.afterLeave();
      }, 300));
    }
    return W(() => {
      e.useNativeDialog ? e.modalContext.isOpen && S() : h();
    }), I(() => {
      var x;
      e.useNativeDialog ? (x = i.value) != null && x.open && i.value.close() : (m(), s());
    }), j(
      () => e.modalContext.onTopOfStack,
      (x) => {
        e.useNativeDialog || (x ? (h(), u.value && r()) : (m(), s()));
      }
    ), j(
      () => e.modalContext.isOpen,
      (x) => {
        e.useNativeDialog && (x ? S() : o.value || p());
      }
    ), (x, g) => t.useNativeDialog ? (C(), B("dialog", {
      key: 0,
      ref_key: "dialogRef",
      ref: i,
      class: E([
        "im-modal-dialog m-0 overflow-visible bg-transparent p-0",
        "size-full max-h-none max-w-none",
        "backdrop:bg-black/75 backdrop:transition-opacity backdrop:duration-300",
        u.value ? "backdrop:opacity-100" : "backdrop:opacity-0",
        !t.isFirstModal && "backdrop:bg-transparent"
      ]),
      onCancel: $,
      onClick: T
    }, [
      O("div", ct, [
        O("div", {
          class: E(["im-modal-positioner flex min-h-full justify-center", {
            "items-start": t.config.position === "top",
            "items-center": t.config.position === "center",
            "items-end": t.config.position === "bottom"
          }])
        }, [
          O("div", {
            class: E([
              "im-modal-wrapper w-full transition duration-300 ease-in-out",
              t.modalContext.onTopOfStack ? "" : "blur-xs",
              u.value && !o.value ? "translate-y-0 opacity-100 sm:scale-100" : "translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95",
              f.value
            ])
          }, [
            O("div", {
              class: E(["im-modal-content relative", [t.config.paddingClasses, t.config.panelClasses]]),
              "data-inertiaui-modal-entered": u.value
            }, [
              t.config.closeButton ? (C(), B("div", ft, [
                V(ee)
              ])) : D("", !0),
              F(x.$slots, "default", {
                modalContext: t.modalContext,
                config: t.config
              })
            ], 10, dt)
          ], 2)
        ], 2)
      ])
    ], 34)) : (C(), B("div", {
      key: 1,
      class: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4",
      onMousedown: z(v, ["self"])
    }, [
      O("div", {
        class: E(["im-modal-positioner flex min-h-full justify-center", {
          "items-start": t.config.position === "top",
          "items-center": t.config.position === "center",
          "items-end": t.config.position === "bottom"
        }]),
        onMousedown: z(v, ["self"])
      }, [
        V(fe, {
          appear: "",
          "enter-active-class": "transition duration-300 ease-in-out",
          "enter-from-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          "enter-to-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-active-class": "transition duration-300 ease-in-out",
          "leave-from-class": "opacity-100 translate-y-0 sm:scale-100",
          "leave-to-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          onAfterEnter: M,
          onAfterLeave: R
        }, {
          default: q(() => [
            t.modalContext.isOpen ? (C(), B("div", {
              key: 0,
              ref_key: "wrapperRef",
              ref: a,
              role: "dialog",
              "aria-modal": "true",
              class: E(["im-modal-wrapper w-full", t.modalContext.onTopOfStack ? "" : "blur-xs", f.value])
            }, [
              g[0] || (g[0] = O("span", { class: "sr-only" }, "Dialog", -1)),
              O("div", {
                class: E(["im-modal-content relative", [t.config.paddingClasses, t.config.panelClasses]]),
                "data-inertiaui-modal-entered": u.value
              }, [
                t.config.closeButton ? (C(), B("div", vt, [
                  V(ee)
                ])) : D("", !0),
                F(x.$slots, "default", {
                  modalContext: t.modalContext,
                  config: t.config
                })
              ], 10, mt)
            ], 2)) : D("", !0)
          ]),
          _: 3
        })
      ], 34)
    ], 32));
  }
}, gt = { class: "im-slideover-container fixed inset-0 overflow-y-auto overflow-x-hidden" }, ht = ["data-inertiaui-modal-entered"], xt = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, yt = ["data-inertiaui-modal-entered"], Ct = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, kt = {
  __name: "SlideoverContent",
  props: {
    modalContext: Object,
    config: Object,
    useNativeDialog: Boolean,
    isFirstModal: Boolean
  },
  emits: ["after-leave"],
  setup(t, { emit: n }) {
    const e = t, l = n, u = y(!1), o = y(!1), a = y(null), i = y(null);
    let c = null, d = null;
    const f = A(() => Ae(e.config.maxWidth)), r = A(() => e.config.position === "left" ? "-translate-x-full" : "translate-x-full");
    function m() {
      e.useNativeDialog || !a.value || !e.modalContext.onTopOfStack || c || (c = ve(a.value, {
        initialFocus: !0,
        returnFocus: !1
      }));
    }
    function h() {
      c && (c(), c = null);
    }
    function s() {
      var g;
      e.useNativeDialog || d || (g = e.config) != null && g.closeExplicitly || (d = pe(() => {
        e.modalContext.onTopOfStack && e.modalContext.close();
      }));
    }
    function v() {
      d && (d(), d = null);
    }
    function M(g) {
      var w, P;
      e.useNativeDialog || e.modalContext.onTopOfStack && ((w = e.config) != null && w.closeExplicitly || ((P = e.config) == null ? void 0 : P.closeOnClickOutside) !== !1 && a.value && (a.value.contains(g.target) || e.modalContext.close()));
    }
    function R() {
      u.value = !0, m();
    }
    function $() {
      l("after-leave"), e.modalContext.afterLeave();
    }
    function T(g) {
      var w;
      g.preventDefault(), e.modalContext.onTopOfStack && !((w = e.config) != null && w.closeExplicitly) && e.modalContext.close();
    }
    function S(g) {
      var w, P;
      g.target === i.value && e.modalContext.onTopOfStack && !((w = e.config) != null && w.closeExplicitly) && ((P = e.config) == null ? void 0 : P.closeOnClickOutside) !== !1 && e.modalContext.close();
    }
    function p() {
      i.value && !i.value.open && (i.value.showModal(), de(() => {
        requestAnimationFrame(() => {
          u.value = !0;
        });
      }));
    }
    function x() {
      i.value && i.value.open && (o.value = !0, u.value = !1, setTimeout(() => {
        i.value && i.value.close(), o.value = !1, l("after-leave"), e.modalContext.afterLeave();
      }, 300));
    }
    return W(() => {
      e.useNativeDialog ? e.modalContext.isOpen && p() : s();
    }), I(() => {
      var g;
      e.useNativeDialog ? (g = i.value) != null && g.open && i.value.close() : (h(), v());
    }), j(
      () => e.modalContext.onTopOfStack,
      (g) => {
        e.useNativeDialog || (g ? (s(), u.value && m()) : (h(), v()));
      }
    ), j(
      () => e.modalContext.isOpen,
      (g) => {
        e.useNativeDialog && (g ? p() : o.value || x());
      }
    ), (g, w) => t.useNativeDialog ? (C(), B("dialog", {
      key: 0,
      ref_key: "dialogRef",
      ref: i,
      class: E([
        "im-slideover-dialog m-0 overflow-visible bg-transparent p-0",
        "size-full max-h-none max-w-none",
        "backdrop:bg-black/75 backdrop:transition-opacity backdrop:duration-300",
        u.value ? "backdrop:opacity-100" : "backdrop:opacity-0",
        !t.isFirstModal && "backdrop:bg-transparent"
      ]),
      onCancel: T,
      onClick: S
    }, [
      O("div", gt, [
        O("div", {
          class: E(["im-slideover-positioner flex min-h-full items-center", {
            "justify-start rtl:justify-end": t.config.position === "left",
            "justify-end rtl:justify-start": t.config.position === "right"
          }])
        }, [
          O("div", {
            class: E([
              "im-slideover-wrapper w-full transition duration-300 ease-in-out",
              t.modalContext.onTopOfStack ? "" : "blur-xs",
              u.value && !o.value ? "translate-x-0 opacity-100" : t.config.position === "left" ? "-translate-x-full opacity-0" : "translate-x-full opacity-0",
              f.value
            ])
          }, [
            O("div", {
              class: E(["im-slideover-content relative", [t.config.paddingClasses, t.config.panelClasses]]),
              "data-inertiaui-modal-entered": u.value
            }, [
              t.config.closeButton ? (C(), B("div", xt, [
                V(ee)
              ])) : D("", !0),
              F(g.$slots, "default", {
                modalContext: t.modalContext,
                config: t.config
              })
            ], 10, ht)
          ], 2)
        ], 2)
      ])
    ], 34)) : (C(), B("div", {
      key: 1,
      class: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden",
      onMousedown: z(M, ["self"])
    }, [
      O("div", {
        class: E(["im-slideover-positioner flex min-h-full items-center", {
          "justify-start rtl:justify-end": t.config.position === "left",
          "justify-end rtl:justify-start": t.config.position === "right"
        }]),
        onMousedown: z(M, ["self"])
      }, [
        V(fe, {
          appear: "",
          "enter-active-class": "transition duration-300 ease-in-out",
          "enter-from-class": "opacity-0 " + r.value,
          "enter-to-class": "opacity-100 translate-x-0",
          "leave-active-class": "transition duration-300 ease-in-out",
          "leave-from-class": "opacity-100 translate-x-0",
          "leave-to-class": "opacity-0 " + r.value,
          onAfterEnter: R,
          onAfterLeave: $
        }, {
          default: q(() => [
            t.modalContext.isOpen ? (C(), B("div", {
              key: 0,
              ref_key: "wrapperRef",
              ref: a,
              role: "dialog",
              "aria-modal": "true",
              class: E(["im-slideover-wrapper w-full", t.modalContext.onTopOfStack ? "" : "blur-xs", f.value])
            }, [
              w[0] || (w[0] = O("span", { class: "sr-only" }, "Dialog", -1)),
              O("div", {
                class: E(["im-slideover-content relative", [t.config.paddingClasses, t.config.panelClasses]]),
                "data-inertiaui-modal-entered": u.value
              }, [
                t.config.closeButton ? (C(), B("div", Ct, [
                  V(ee)
                ])) : D("", !0),
                F(g.$slots, "default", {
                  modalContext: t.modalContext,
                  config: t.config
                })
              ], 10, yt)
            ], 2)) : D("", !0)
          ]),
          _: 3
        }, 8, ["enter-from-class", "leave-to-class"])
      ], 34)
    ], 32));
  }
}, wt = ["data-inertiaui-modal-id", "data-inertiaui-modal-index", "aria-hidden"], bt = {
  key: 0,
  class: "im-backdrop fixed inset-0 z-30 bg-black/75"
}, Nt = {
  __name: "Modal",
  emits: ["after-leave", "blur", "close", "focus", "success"],
  setup(t, { expose: n, emit: e }) {
    const l = y(null), u = y(!1), o = e;
    n({
      afterLeave: () => {
        var r;
        return (r = l.value) == null ? void 0 : r.afterLeave();
      },
      close: () => {
        var r;
        return (r = l.value) == null ? void 0 : r.close();
      },
      emit: (...r) => {
        var m;
        return (m = l.value) == null ? void 0 : m.emit(...r);
      },
      getChildModal: () => {
        var r;
        return (r = l.value) == null ? void 0 : r.getChildModal();
      },
      getParentModal: () => {
        var r;
        return (r = l.value) == null ? void 0 : r.getParentModal();
      },
      reload: (...r) => {
        var m;
        return (m = l.value) == null ? void 0 : m.reload(...r);
      },
      setOpen: (...r) => {
        var m;
        return (m = l.value) == null ? void 0 : m.setOpen(...r);
      },
      get config() {
        var r;
        return (r = l.value) == null ? void 0 : r.config;
      },
      get id() {
        var r;
        return (r = l.value) == null ? void 0 : r.id;
      },
      get index() {
        var r;
        return (r = l.value) == null ? void 0 : r.index;
      },
      get isOpen() {
        var r;
        return (r = l.value) == null ? void 0 : r.isOpen;
      },
      get modalContext() {
        var r;
        return (r = l.value) == null ? void 0 : r.modalContext;
      },
      get onTopOfStack() {
        var r;
        return (r = l.value) == null ? void 0 : r.onTopOfStack;
      },
      get shouldRender() {
        var r;
        return (r = l.value) == null ? void 0 : r.shouldRender;
      }
    });
    let a = null, i = null;
    W(() => {
      var r;
      (r = l.value) != null && r.isOpen && !a && (a = ie(), i = re("#app"));
    }), I(() => {
      a == null || a(), i == null || i();
    });
    function c() {
      o("success"), a || (a = ie(), i = re("#app"));
    }
    function d() {
      o("close"), a == null || a(), i == null || i(), a = null, i = null;
    }
    const f = A(() => le("useNativeDialog"));
    return (r, m) => (C(), L(rt, {
      ref_key: "modal",
      ref: l,
      onSuccess: c,
      onClose: d,
      onFocus: m[2] || (m[2] = (h) => o("focus")),
      onBlur: m[3] || (m[3] = (h) => o("blur"))
    }, {
      default: q(({
        afterLeave: h,
        close: s,
        config: v,
        emit: M,
        getChildModal: R,
        getParentModal: $,
        id: T,
        index: S,
        isOpen: p,
        modalContext: x,
        onTopOfStack: g,
        reload: w,
        setOpen: P,
        shouldRender: De,
        ...Fe
      }) => [
        (C(), L(Ie, { to: "body" }, [
          O("div", {
            "data-inertiaui-modal-id": T,
            "data-inertiaui-modal-index": S,
            class: "im-dialog relative z-20",
            "aria-hidden": !g
          }, [
            S === 0 && !f.value ? (C(), L(fe, {
              key: 0,
              appear: !u.value,
              "enter-active-class": "transition transform ease-in-out duration-300",
              "enter-from-class": "opacity-0",
              "enter-to-class": "opacity-100",
              "leave-active-class": "transition transform ease-in-out duration-300",
              "leave-from-class": "opacity-100",
              "leave-to-class": "opacity-0",
              onAfterAppear: m[0] || (m[0] = (Re) => u.value = !0)
            }, {
              default: q(() => [
                p ? (C(), B("div", bt)) : D("", !0)
              ]),
              _: 2
            }, 1032, ["appear"])) : D("", !0),
            (C(), L(me(v != null && v.slideover ? kt : pt), {
              "modal-context": x,
              config: v,
              "use-native-dialog": f.value,
              "is-first-modal": S === 0,
              onAfterLeave: m[1] || (m[1] = (Re) => r.$emit("after-leave"))
            }, {
              default: q(() => [
                F(r.$slots, "default", te(Fe, {
                  id: T,
                  afterLeave: h,
                  close: s,
                  config: v,
                  emit: M,
                  getChildModal: R,
                  getParentModal: $,
                  index: S,
                  isOpen: p,
                  modalContext: x,
                  onTopOfStack: g,
                  reload: w,
                  setOpen: P,
                  shouldRender: De
                }))
              ]),
              _: 2
            }, 1064, ["modal-context", "config", "use-native-dialog", "is-first-modal"]))
          ], 8, wt)
        ]))
      ]),
      _: 3
    }, 512));
  }
}, Lt = {
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
      type: [String, Object],
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
    // Prefetch options (#146)
    prefetch: {
      type: [Boolean, String, Array],
      default: !1
    },
    cacheFor: {
      type: Number,
      default: 3e4
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
    closeOnClickOutside: {
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
  emits: ["after-leave", "blur", "close", "error", "focus", "start", "success", "prefetching", "prefetched"],
  setup(t, { emit: n }) {
    const e = t, l = y(!1), u = Q(), o = y(null);
    be("modalContext", o);
    const a = n, i = y(!1), c = A(() => e.navigate ?? le("navigate")), d = y(null), f = A(() => e.prefetch === !0 ? ["hover"] : e.prefetch === !1 ? [] : Array.isArray(e.prefetch) ? e.prefetch : [e.prefetch]);
    function r() {
      Ge(e.href, {
        method: e.method,
        data: e.data,
        headers: e.headers,
        queryStringArrayFormat: e.queryStringArrayFormat,
        cacheFor: e.cacheFor,
        onPrefetching: () => a("prefetching"),
        onPrefetched: () => a("prefetched")
      });
    }
    function m() {
      f.value.includes("hover") && (d.value = setTimeout(() => {
        r();
      }, 75));
    }
    function h() {
      d.value && (clearTimeout(d.value), d.value = null);
    }
    function s(p) {
      f.value.includes("click") && p.button === 0 && r();
    }
    W(() => {
      f.value.includes("mount") && r();
    }), j(
      () => {
        var p;
        return (p = o.value) == null ? void 0 : p.onTopOfStack;
      },
      (p) => {
        o.value && (p && i.value ? a("focus") : p || a("blur"), i.value = !p);
      }
    );
    const v = y(null);
    se(() => {
      var p;
      (p = v.value) == null || p.call(v), d.value && clearTimeout(d.value);
    });
    const M = Me();
    function R() {
      v.value = o.value.registerEventListenersFromAttrs(M);
    }
    j(o, (p, x) => {
      p && !x && (R(), a("success"));
    });
    function $() {
      a("close");
    }
    function T() {
      o.value = null, a("after-leave");
    }
    function S() {
      l.value || (e.href.startsWith("#") || (l.value = !0, a("start")), u.visit(
        e.href,
        e.method,
        e.data,
        e.headers,
        He(Se(e, st)),
        $,
        T,
        e.queryStringArrayFormat,
        c.value
      ).then((p) => {
        o.value = p;
      }).catch((p) => a("error", p)).finally(() => l.value = !1));
    }
    return (p, x) => (C(), L(me(t.as), te(b(M), {
      href: t.href,
      onClick: z(S, ["prevent"]),
      onMouseenter: m,
      onMouseleave: h,
      onMousedown: s
    }), {
      default: q(() => [
        F(p.$slots, "default", { loading: l.value })
      ]),
      _: 3
    }, 16, ["href"]));
  }
}, jt = {
  __name: "WhenVisible",
  props: {
    data: [String, Array],
    params: Object,
    buffer: { type: Number, default: 0 },
    as: { type: String, default: "div" },
    always: { type: Boolean, default: !1 }
  },
  setup(t) {
    const n = t, e = ae("modalContext");
    if (!e)
      throw new Error("Deferred component must be used inside a Modal component");
    const l = y(!1), u = y(!1), o = y(null);
    let a = null;
    const i = () => {
      if (n.data)
        return { only: Array.isArray(n.data) ? n.data : [n.data] };
      if (!n.params)
        throw new Error("You must provide either a `data` or `params` prop.");
      return n.params;
    };
    return W(() => {
      o.value && (a = new IntersectionObserver(
        (d) => {
          if (!d[0].isIntersecting || (n.always || a.disconnect(), u.value))
            return;
          u.value = !0;
          const f = i();
          e.value.reload({
            ...f,
            onStart: () => {
              var r;
              u.value = !0, (r = f.onStart) == null || r.call(f);
            },
            onFinish: () => {
              var r;
              l.value = !0, u.value = !1, (r = f.onFinish) == null || r.call(f);
            }
          });
        },
        { rootMargin: `${n.buffer}px` }
      ), a.observe(o.value));
    }), I(() => a == null ? void 0 : a.disconnect()), (d, f) => (C(), L(me(n.as), {
      ref_key: "rootElement",
      ref: o
    }, {
      default: q(() => [
        l.value ? F(d.$slots, "default", { key: 0 }) : F(d.$slots, "fallback", { key: 1 })
      ]),
      _: 3
    }, 512));
  }
};
function It(t, n = {}) {
  return Q().visit(
    t,
    n.method ?? "get",
    n.data ?? {},
    n.headers ?? {},
    n.config ?? {},
    n.onClose,
    n.onAfterLeave,
    n.queryStringArrayFormat ?? "brackets",
    n.navigate ?? le("navigate"),
    n.onStart,
    n.onSuccess,
    n.onError,
    n.props ?? null
  ).then((e) => {
    const l = n.listeners ?? {};
    return Object.keys(l).forEach((u) => {
      const o = _(u);
      e.on(o, l[u]);
    }), e;
  });
}
export {
  Rt as Deferred,
  rt as HeadlessModal,
  Nt as Modal,
  et as ModalInstance,
  Lt as ModalLink,
  Qe as ModalRoot,
  jt as WhenVisible,
  Tt as dialogUtils,
  le as getConfig,
  Dt as initFromPageProps,
  st as modalPropNames,
  Ge as prefetch,
  At as putConfig,
  Ft as renderApp,
  $t as resetConfig,
  it as useModal,
  Q as useModalStack,
  It as visitModal
};
//# sourceMappingURL=inertiaui-modal.js.map
