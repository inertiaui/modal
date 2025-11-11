var _r = Object.defineProperty;
var jr = (e, t, r) => t in e ? _r(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var K = (e, t, r) => jr(e, typeof t != "symbol" ? t + "" : t, r);
import * as Ce from "react";
import $, { createContext as z, useContext as H, useEffect as L, useRef as S, useState as F, createElement as Re, useMemo as D, forwardRef as Tt, useImperativeHandle as Qt, useLayoutEffect as Wr, useCallback as W, Fragment as ue, isValidElement as Ur, cloneElement as Hr, useId as De, useSyncExternalStore as Vr, useReducer as Br, createRef as Xr } from "react";
import { jsxs as he, Fragment as Mt, jsx as T } from "react/jsx-runtime";
import ze from "axios";
import * as Rt from "@inertiajs/react";
import { usePage as zr, router as Me } from "@inertiajs/react";
import { mergeDataIntoQueryString as Gr } from "@inertiajs/core";
import { createPortal as Kr } from "react-dom";
const Pe = {
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
class qr {
  constructor() {
    this.config = {}, this.reset();
  }
  reset() {
    this.config = JSON.parse(JSON.stringify(Pe));
  }
  put(t, r) {
    if (typeof t == "object") {
      this.config = {
        type: t.type ?? Pe.type,
        navigate: t.navigate ?? Pe.navigate,
        modal: { ...Pe.modal, ...t.modal ?? {} },
        slideover: { ...Pe.slideover, ...t.slideover ?? {} }
      };
      return;
    }
    const n = t.split(".");
    let l = this.config;
    for (let i = 0; i < n.length - 1; i++)
      l = l[n[i]] = l[n[i]] || {};
    l[n[n.length - 1]] = r;
  }
  get(t) {
    if (typeof t > "u")
      return this.config;
    const r = t.split(".");
    let n = this.config;
    for (const l of r) {
      if (n[l] === void 0)
        return null;
      n = n[l];
    }
    return n;
  }
}
const Ze = new qr(), Ei = () => Ze.reset(), $i = (e, t) => Ze.put(e, t), Lt = (e) => Ze.get(e), we = (e, t) => Ze.get(e ? `slideover.${t}` : `modal.${t}`);
function Yr(e, t) {
  const r = typeof window < "u" ? window.location.origin : "http://localhost";
  return e = typeof e == "string" ? new URL(e, r) : e, t = typeof t == "string" ? new URL(t, r) : t, `${e.origin}${e.pathname}` == `${t.origin}${t.pathname}`;
}
function mt(e = "inertiaui_modal_") {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `${e}${crypto.randomUUID()}` : `${e}${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
}
function be(e) {
  return typeof e == "string" ? e.toLowerCase() : e;
}
function Zr(e, t, r = !1) {
  return r && (t = t.map(be)), Array.isArray(e) ? e.filter((n) => !t.includes(r ? be(n) : n)) : Object.keys(e).reduce((n, l) => (t.includes(r ? be(l) : l) || (n[l] = e[l]), n), {});
}
function Jr(e, t, r = !1) {
  return r && (t = t.map(be)), Array.isArray(e) ? e.filter((n) => t.includes(r ? be(n) : n)) : Object.keys(e).reduce((n, l) => (t.includes(r ? be(l) : l) && (n[l] = e[l]), n), {});
}
function Qr(e) {
  return Array.isArray(e) ? e.filter((t) => t !== null) : Object.keys(e).reduce((t, r) => (r in e && e[r] !== null && (t[r] = e[r]), t), {});
}
function Te(e) {
  return e ? (e = e.replace(/_/g, "-"), e = e.replace(/-+/g, "-"), /[A-Z]/.test(e) ? (e = e.replace(/\s+/g, "").replace(/_/g, "").replace(/(?:^|\s|-)+([A-Za-z])/g, (t, r) => r.toUpperCase()), e = e.replace(/(.)(?=[A-Z])/g, "$1-"), e.toLowerCase()) : e) : "";
}
function en(e) {
  if (typeof window < "u")
    return e.toLowerCase() in window;
  if (typeof document < "u") {
    const n = document.createElement("div");
    return e.toLowerCase() in n;
  }
  const t = e.toLowerCase();
  return [
    /^on(click|dblclick|mousedown|mouseup|mouseover|mouseout|mousemove|mouseenter|mouseleave)$/,
    /^on(keydown|keyup|keypress)$/,
    /^on(focus|blur|change|input|submit|reset)$/,
    /^on(load|unload|error|resize|scroll)$/,
    /^on(touchstart|touchend|touchmove|touchcancel)$/,
    /^on(pointerdown|pointerup|pointermove|pointerenter|pointerleave|pointercancel)$/,
    /^on(drag|dragstart|dragend|dragenter|dragleave|dragover|drop)$/,
    /^on(animationstart|animationend|animationiteration)$/,
    /^on(transitionstart|transitionend|transitionrun|transitioncancel)$/
  ].some((n) => n.test(t));
}
const Je = z(null);
Je.displayName = "ModalStackContext";
let er = null, tr = null, xe = null, He = {}, pt = [], ye = {};
const tn = ({ children: e }) => {
  const [t, r] = F([]), [n, l] = F({}), i = (h) => {
    r((u) => {
      const c = h([...u]), v = (w) => {
        var m;
        return c.length < 2 ? !0 : ((m = c.map((x) => ({ id: x.id, shouldRender: x.shouldRender })).reverse().find((x) => x.shouldRender)) == null ? void 0 : m.id) === w;
      };
      return c.forEach((w, m) => {
        c[m].onTopOfStack = v(w.id), c[m].getParentModal = () => m < 1 ? null : c.slice(0, m).reverse().find((x) => x.isOpen), c[m].getChildModal = () => m === c.length - 1 ? null : c.slice(m + 1).find((x) => x.isOpen);
      }), c;
    });
  };
  L(() => {
    pt = t;
  }, [t]);
  class s {
    constructor(u, c, v, w, m) {
      K(this, "show", () => {
        i(
          (u) => u.map((c) => (c.id === this.id && !c.isOpen && (c.isOpen = !0, c.shouldRender = !0), c))
        );
      });
      K(this, "setOpen", (u) => {
        u ? this.show() : this.close();
      });
      K(this, "close", () => {
        i((u) => {
          let c = !1;
          const v = u.map((w) => {
            var m;
            return w.id === this.id && w.isOpen && (Object.keys(w.listeners).forEach((x) => {
              w.off(x);
            }), w.isOpen = !1, (m = w.onCloseCallback) == null || m.call(w), c = !0), w;
          });
          return c ? v : u;
        });
      });
      K(this, "afterLeave", () => {
        this.isOpen || i((u) => {
          const c = u.map((v) => {
            var w;
            return v.id === this.id && !v.isOpen && (v.shouldRender = !1, (w = v.afterLeaveCallback) == null || w.call(v), v.afterLeaveCallback = null), v;
          });
          return this.index === 0 ? [] : c;
        });
      });
      K(this, "on", (u, c) => {
        u = Te(u), this.listeners[u] = this.listeners[u] ?? [], this.listeners[u].push(c);
      });
      K(this, "off", (u, c) => {
        var v;
        u = Te(u), c ? this.listeners[u] = ((v = this.listeners[u]) == null ? void 0 : v.filter((w) => w !== c)) ?? [] : delete this.listeners[u];
      });
      K(this, "emit", (u, ...c) => {
        var v;
        (v = this.listeners[Te(u)]) == null || v.forEach((w) => w(...c));
      });
      K(this, "registerEventListenersFromProps", (u) => {
        const c = [];
        return Object.keys(u).filter((v) => v.startsWith("on")).forEach((v) => {
          const w = Te(v).replace(/^on-/, "");
          this.on(w, u[v]), c.push(() => this.off(w, u[v]));
        }), () => c.forEach((v) => v());
      });
      K(this, "reload", (u = {}) => {
        var m, x;
        let c = Object.keys(this.response.props);
        if (u.only && (c = u.only), u.except && (c = Zr(c, u.except)), !((m = this.response) != null && m.url))
          return;
        const v = (u.method ?? "get").toLowerCase(), w = u.data ?? {};
        (x = u.onStart) == null || x.call(u), ze({
          url: this.response.url,
          method: v,
          data: v === "get" ? {} : w,
          params: v === "get" ? w : {},
          headers: {
            ...u.headers ?? {},
            Accept: "text/html, application/xhtml+xml",
            "X-Inertia": !0,
            "X-Inertia-Partial-Component": this.response.component,
            "X-Inertia-Version": this.response.version,
            "X-Inertia-Partial-Data": c.join(","),
            "X-InertiaUI-Modal": mt(),
            "X-InertiaUI-Modal-Use-Router": 0,
            "X-InertiaUI-Modal-Base-Url": xe
          }
        }).then((O) => {
          var N;
          this.updateProps(O.data.props), (N = u.onSuccess) == null || N.call(u, O);
        }).catch((O) => {
          var N;
          (N = u.onError) == null || N.call(u, O);
        }).finally(() => {
          var O;
          (O = u.onFinish) == null || O.call(u);
        });
      });
      K(this, "updateProps", (u) => {
        Object.assign(this.props, u), i((c) => c);
      });
      if (this.id = c.id ?? mt(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = u, this.props = c.props, this.response = c, this.config = v ?? {}, this.onCloseCallback = w, this.afterLeaveCallback = m, ye[this.id]) {
        this.config = {
          ...this.config,
          ...ye[this.id].config ?? {}
        };
        const x = ye[this.id].onClose, O = ye[this.id].onAfterLeave;
        x && (this.onCloseCallback = w ? () => {
          w(), x();
        } : x), O && (this.afterLeaveCallback = m ? () => {
          m(), O();
        } : O), delete ye[this.id];
      }
      this.index = -1, this.getParentModal = () => null, this.getChildModal = () => null, this.onTopOfStack = !0;
    }
    static generateId() {
      return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `inertiaui_modal_${crypto.randomUUID()}` : `inertiaui_modal_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
    }
  }
  const a = (h, u = {}, c = null, v = null) => tr(h.component).then((w) => f(w, h, u, c, v)), o = (h) => {
    var c, v;
    const u = (v = (c = h.response) == null ? void 0 : c.meta) == null ? void 0 : v.deferredProps;
    u && Object.keys(u).forEach((w) => {
      h.reload({ only: u[w] });
    });
  }, f = (h, u, c, v, w) => {
    const m = new s(h, u, c, v, w);
    return m.index = t.length, i((x) => [...x, m]), o(m), m.show(), m;
  };
  function p(h, u, c, v) {
    if (!n[h])
      throw new Error(`The local modal "${h}" has not been registered.`);
    const w = f(null, {}, u, c, v);
    return w.name = h, n[h].callback(w), w;
  }
  const g = (h, u = {}) => y(
    h,
    u.method ?? "get",
    u.data ?? {},
    u.headers ?? {},
    u.config ?? {},
    u.onClose,
    u.onAfterLeave,
    u.queryStringArrayFormat ?? "brackets",
    u.navigate ?? Lt("navigate"),
    u.onStart,
    u.onSuccess,
    u.onError
  ).then((c) => {
    const v = u.listeners ?? {};
    return Object.keys(v).forEach((w) => {
      const m = Te(w);
      c.on(m, v[w]);
    }), c;
  }), y = (h, u, c = {}, v = {}, w = {}, m = null, x = null, O = "brackets", N = !1, _ = null, C = null, I = null) => {
    const B = mt();
    return new Promise((R, k) => {
      if (h.startsWith("#")) {
        R(p(h.substring(1), w, m, x));
        return;
      }
      const [j, ge] = Gr(u, h || "", c, O);
      let ce = N;
      if (t.length === 0 && (xe = typeof window < "u" ? window.location.href : ""), v = {
        ...v,
        Accept: "text/html, application/xhtml+xml",
        "X-Requested-With": "XMLHttpRequest",
        "X-Inertia": !0,
        "X-Inertia-Version": er,
        "X-InertiaUI-Modal": B,
        "X-InertiaUI-Modal-Use-Router": ce ? 1 : 0,
        "X-InertiaUI-Modal-Base-Url": xe
      }, ce)
        return He = {}, ye[B] = {
          config: w,
          onClose: m,
          onAfterLeave: x
        }, Me.visit(j, {
          method: u,
          data: ge,
          headers: v,
          preserveScroll: !0,
          preserveState: !0,
          onError(...A) {
            I == null || I(...A), k(...A);
          },
          onStart(...A) {
            _ == null || _(...A);
          },
          onSuccess(...A) {
            C == null || C(...A);
          },
          onBefore: () => {
            He[B] = R;
          }
        });
      _ == null || _();
      const J = (A) => {
        try {
          Rt.progress && A(Rt.progress);
        } catch {
        }
      };
      J((A) => A.start()), ze({
        url: j,
        method: u,
        data: ge,
        headers: v
      }).then((A) => {
        C == null || C(A), R(a(A.data, w, m, x));
      }).catch((...A) => {
        I == null || I(...A), k(...A);
      }).finally(() => {
        J((A) => A.finish());
      });
    });
  }, E = {
    stack: t,
    localModals: n,
    push: f,
    pushFromResponseData: a,
    length: () => pt.length,
    closeAll: () => {
      pt.reverse().forEach((h) => h.close());
    },
    reset: () => i(() => []),
    visit: y,
    visitModal: g,
    registerLocalModal: (h, u) => {
      l((c) => ({
        ...c,
        [h]: { name: h, callback: u }
      }));
    },
    removeLocalModal: (h) => {
      l((u) => {
        const c = { ...u };
        return delete c[h], c;
      });
    },
    onModalOnBase: (h) => {
      const u = He[h.id];
      u && (u(h), delete He[h.id]);
    }
  };
  return /* @__PURE__ */ T(Je.Provider, { value: E, children: e });
}, Qe = () => {
  const e = H(Je);
  if (e === null)
    throw new Error("useModalStack must be used within a ModalStackProvider");
  return e;
}, Dt = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], rn = (e) => {
  e.initialPage && (er = e.initialPage.version), e.resolveComponent && (tr = e.resolveComponent);
}, Oi = (e, t) => (rn(t), /* @__PURE__ */ T(tn, { children: /* @__PURE__ */ T(e, { ...t, children: ({ Component: n, props: l, key: i }) => /* @__PURE__ */ he(Mt, { children: [
  (() => {
    const a = Re(n, { key: i, ...l });
    return typeof n.layout == "function" ? n.layout(a) : Array.isArray(n.layout) ? n.layout.concat(a).reverse().reduce((f, p) => Re(p, l, f)) : a;
  })(),
  /* @__PURE__ */ T(nn, {})
] }) }) })), nn = ({ children: e }) => {
  var o, f;
  const t = H(Je), r = zr();
  let n = !1, l = !1, i = !!((o = r.props) != null && o._inertiaui_modal);
  L(() => Me.on("start", () => n = !0), []), L(() => Me.on("finish", () => n = !1), []), L(
    () => Me.on("navigate", function(p) {
      const g = p.detail.page.props._inertiaui_modal;
      if (!g) {
        l && t.closeAll(), xe = null, i = !1;
        return;
      }
      l = g, xe = g.baseUrl, t.pushFromResponseData(g, {}, () => {
        if (!g.baseUrl) {
          console.error("No base url in modal response data so cannot navigate back");
          return;
        }
        !n && typeof window < "u" && window.location.href !== g.baseUrl && Me.visit(g.baseUrl, {
          preserveScroll: !0,
          preserveState: !0
        });
      }).then(t.onModalOnBase);
    }),
    []
  );
  const s = (p) => {
    var g;
    return p.headers["X-InertiaUI-Modal-Base-Url"] = xe ?? (i ? (g = r.props._inertiaui_modal) == null ? void 0 : g.baseUrl : null), p;
  };
  L(() => (ze.interceptors.request.use(s), () => ze.interceptors.request.eject(s)), []);
  const a = S();
  return L(() => {
    var y, b;
    const p = (y = r.props) == null ? void 0 : y._inertiaui_modal, g = a.current;
    a.current = p, p && g && p.component === g.component && Yr(p.url, g.url) && ((b = t.stack[0]) == null || b.updateProps(p.props ?? {}));
  }, [(f = r.props) == null ? void 0 : f._inertiaui_modal]), /* @__PURE__ */ he(Mt, { children: [
    e,
    t.stack.length > 0 && /* @__PURE__ */ T(nr, { index: 0 })
  ] });
}, kt = $.createContext(null);
kt.displayName = "ModalIndexContext";
const rr = () => {
  const e = $.useContext(kt);
  if (e === void 0)
    throw new Error("useModalIndex must be used within a ModalIndexProvider");
  return e;
}, nr = ({ index: e }) => {
  const { stack: t } = Qe(), r = D(() => t[e], [t, e]);
  return (r == null ? void 0 : r.component) && /* @__PURE__ */ T(kt.Provider, { value: e, children: /* @__PURE__ */ T(
    r.component,
    {
      ...r.props,
      onModalEvent: (...n) => r.emit(...n)
    }
  ) });
};
function lr() {
  return Qe().stack[rr()] ?? null;
}
const ln = ({ children: e, data: t, fallback: r }) => {
  if (!t)
    throw new Error("`<Deferred>` requires a `data` prop to be a string or array of strings");
  const [n, l] = F(!1), i = Array.isArray(t) ? t : [t], s = lr().props;
  return L(() => {
    l(i.every((a) => s[a] !== void 0));
  }, [s, i]), n ? e : r;
};
ln.displayName = "InertiaModalDeferred";
const ir = Tt(({ name: e, children: t, onFocus: r = null, onBlur: n = null, onClose: l = null, onSuccess: i = null, ...s }, a) => {
  const o = rr(), { stack: f, registerLocalModal: p, removeLocalModal: g } = Qe(), [y, b] = F(null), d = D(() => e ? y : f[o], [e, y, o, f]), E = D(() => {
    var m;
    return (m = f.find((x) => x.shouldRender && x.index > (d == null ? void 0 : d.index))) == null ? void 0 : m.index;
  }, [o, f]), h = D(() => (d == null ? void 0 : d.config.slideover) ?? s.slideover ?? Lt("type") === "slideover", [s.slideover]), u = D(
    () => ({
      slideover: h,
      closeButton: s.closeButton ?? we(h, "closeButton"),
      closeExplicitly: s.closeExplicitly ?? we(h, "closeExplicitly"),
      maxWidth: s.maxWidth ?? we(h, "maxWidth"),
      paddingClasses: s.paddingClasses ?? we(h, "paddingClasses"),
      panelClasses: s.panelClasses ?? we(h, "panelClasses"),
      position: s.position ?? we(h, "position"),
      ...d == null ? void 0 : d.config
    }),
    [s, d == null ? void 0 : d.config]
  );
  L(() => {
    if (e) {
      let m = null;
      return p(e, (x) => {
        m = x.registerEventListenersFromProps(s), b(x);
      }), () => {
        m == null || m(), m = null, g(e);
      };
    }
    return d.registerEventListenersFromProps(s);
  }, [e]);
  const c = S(d);
  L(() => {
    c.current = d;
  }, [d]), L(() => {
    d !== null && (d.isOpen ? i == null || i() : l == null || l());
  }, [d == null ? void 0 : d.isOpen]);
  const [v, w] = F(!1);
  return L(() => {
    v && d !== null && d.isOpen && (d.onTopOfStack ? r == null || r() : n == null || n()), w(!0);
  }, [d == null ? void 0 : d.onTopOfStack]), Qt(
    a,
    () => ({
      afterLeave: () => {
        var m;
        return (m = c.current) == null ? void 0 : m.afterLeave();
      },
      close: () => {
        var m;
        return (m = c.current) == null ? void 0 : m.close();
      },
      emit: (...m) => {
        var x;
        return (x = c.current) == null ? void 0 : x.emit(...m);
      },
      getChildModal: () => {
        var m;
        return (m = c.current) == null ? void 0 : m.getChildModal();
      },
      getParentModal: () => {
        var m;
        return (m = c.current) == null ? void 0 : m.getParentModal();
      },
      reload: (...m) => {
        var x;
        return (x = c.current) == null ? void 0 : x.reload(...m);
      },
      setOpen: () => {
        var m;
        return (m = c.current) == null ? void 0 : m.setOpen();
      },
      get id() {
        var m;
        return (m = c.current) == null ? void 0 : m.id;
      },
      get index() {
        var m;
        return (m = c.current) == null ? void 0 : m.index;
      },
      get isOpen() {
        var m;
        return (m = c.current) == null ? void 0 : m.isOpen;
      },
      get config() {
        var m;
        return (m = c.current) == null ? void 0 : m.config;
      },
      get modalContext() {
        return c.current;
      },
      get onTopOfStack() {
        var m;
        return (m = c.current) == null ? void 0 : m.onTopOfStack;
      },
      get shouldRender() {
        var m;
        return (m = c.current) == null ? void 0 : m.shouldRender;
      }
    }),
    [d]
  ), (d == null ? void 0 : d.shouldRender) && /* @__PURE__ */ he(Mt, { children: [
    typeof t == "function" ? t({
      afterLeave: d.afterLeave,
      close: d.close,
      config: u,
      emit: d.emit,
      getChildModal: d.getChildModal,
      getParentModal: d.getParentModal,
      id: d.id,
      index: d.index,
      isOpen: d.isOpen,
      modalContext: d,
      onTopOfStack: d.onTopOfStack,
      reload: d.reload,
      setOpen: d.setOpen,
      shouldRender: d.shouldRender
    }) : t,
    E && /* @__PURE__ */ T(nr, { index: E })
  ] });
});
ir.displayName = "HeadlessModal";
function or(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var l = e.length;
    for (t = 0; t < l; t++) e[t] && (r = or(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function Ge() {
  for (var e, t, r = 0, n = "", l = arguments.length; r < l; r++) (e = arguments[r]) && (t = or(e)) && (n && (n += " "), n += t);
  return n;
}
var on = Object.defineProperty, an = (e, t, r) => t in e ? on(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, ht = (e, t, r) => (an(e, typeof t != "symbol" ? t + "" : t, r), r);
let sn = class {
  constructor() {
    ht(this, "current", this.detect()), ht(this, "handoffState", "pending"), ht(this, "currentId", 0);
  }
  set(t) {
    this.current !== t && (this.handoffState = "pending", this.currentId = 0, this.current = t);
  }
  reset() {
    this.set(this.detect());
  }
  nextId() {
    return ++this.currentId;
  }
  get isServer() {
    return this.current === "server";
  }
  get isClient() {
    return this.current === "client";
  }
  detect() {
    return typeof window > "u" || typeof document > "u" ? "server" : "client";
  }
  handoff() {
    this.handoffState === "pending" && (this.handoffState = "complete");
  }
  get isHandoffComplete() {
    return this.handoffState === "complete";
  }
}, ee = new sn();
function et(e) {
  var t, r;
  return ee.isServer ? null : e ? "ownerDocument" in e ? e.ownerDocument : "current" in e ? (r = (t = e.current) == null ? void 0 : t.ownerDocument) != null ? r : document : null : document;
}
function tt(e) {
  typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch((t) => setTimeout(() => {
    throw t;
  }));
}
function ne() {
  let e = [], t = { addEventListener(r, n, l, i) {
    return r.addEventListener(n, l, i), t.add(() => r.removeEventListener(n, l, i));
  }, requestAnimationFrame(...r) {
    let n = requestAnimationFrame(...r);
    return t.add(() => cancelAnimationFrame(n));
  }, nextFrame(...r) {
    return t.requestAnimationFrame(() => t.requestAnimationFrame(...r));
  }, setTimeout(...r) {
    let n = setTimeout(...r);
    return t.add(() => clearTimeout(n));
  }, microTask(...r) {
    let n = { current: !0 };
    return tt(() => {
      n.current && r[0]();
    }), t.add(() => {
      n.current = !1;
    });
  }, style(r, n, l) {
    let i = r.style.getPropertyValue(n);
    return Object.assign(r.style, { [n]: l }), this.add(() => {
      Object.assign(r.style, { [n]: i });
    });
  }, group(r) {
    let n = ne();
    return r(n), this.add(() => n.dispose());
  }, add(r) {
    return e.includes(r) || e.push(r), () => {
      let n = e.indexOf(r);
      if (n >= 0) for (let l of e.splice(n, 1)) l();
    };
  }, dispose() {
    for (let r of e.splice(0)) r();
  } };
  return t;
}
function rt() {
  let [e] = F(ne);
  return L(() => () => e.dispose(), [e]), e;
}
let U = (e, t) => {
  ee.isServer ? L(e, t) : Wr(e, t);
};
function ve(e) {
  let t = S(e);
  return U(() => {
    t.current = e;
  }, [e]), t;
}
let M = function(e) {
  let t = ve(e);
  return $.useCallback((...r) => t.current(...r), [t]);
};
function _e(e) {
  return D(() => e, Object.values(e));
}
let un = z(void 0);
function cn() {
  return H(un);
}
function xt(...e) {
  return Array.from(new Set(e.flatMap((t) => typeof t == "string" ? t.split(" ") : []))).filter(Boolean).join(" ");
}
function re(e, t, ...r) {
  if (e in t) {
    let l = t[e];
    return typeof l == "function" ? l(...r) : l;
  }
  let n = new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map((l) => `"${l}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(n, re), n;
}
var Ke = ((e) => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(Ke || {}), oe = ((e) => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(oe || {});
function G() {
  let e = fn();
  return W((t) => dn({ mergeRefs: e, ...t }), [e]);
}
function dn({ ourProps: e, theirProps: t, slot: r, defaultTag: n, features: l, visible: i = !0, name: s, mergeRefs: a }) {
  a = a ?? mn;
  let o = ar(t, e);
  if (i) return Ve(o, r, n, s, a);
  let f = l ?? 0;
  if (f & 2) {
    let { static: p = !1, ...g } = o;
    if (p) return Ve(g, r, n, s, a);
  }
  if (f & 1) {
    let { unmount: p = !0, ...g } = o;
    return re(p ? 0 : 1, { 0() {
      return null;
    }, 1() {
      return Ve({ ...g, hidden: !0, style: { display: "none" } }, r, n, s, a);
    } });
  }
  return Ve(o, r, n, s, a);
}
function Ve(e, t = {}, r, n, l) {
  let { as: i = r, children: s, refName: a = "ref", ...o } = vt(e, ["unmount", "static"]), f = e.ref !== void 0 ? { [a]: e.ref } : {}, p = typeof s == "function" ? s(t) : s;
  "className" in o && o.className && typeof o.className == "function" && (o.className = o.className(t)), o["aria-labelledby"] && o["aria-labelledby"] === o.id && (o["aria-labelledby"] = void 0);
  let g = {};
  if (t) {
    let y = !1, b = [];
    for (let [d, E] of Object.entries(t)) typeof E == "boolean" && (y = !0), E === !0 && b.push(d.replace(/([A-Z])/g, (h) => `-${h.toLowerCase()}`));
    if (y) {
      g["data-headlessui-state"] = b.join(" ");
      for (let d of b) g[`data-${d}`] = "";
    }
  }
  if (Fe(i) && (Object.keys(de(o)).length > 0 || Object.keys(de(g)).length > 0)) if (!Ur(p) || Array.isArray(p) && p.length > 1 || hn(p)) {
    if (Object.keys(de(o)).length > 0) throw new Error(['Passing props on "Fragment"!', "", `The current component <${n} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(de(o)).concat(Object.keys(de(g))).map((y) => `  - ${y}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((y) => `  - ${y}`).join(`
`)].join(`
`));
  } else {
    let y = p.props, b = y == null ? void 0 : y.className, d = typeof b == "function" ? (...u) => xt(b(...u), o.className) : xt(b, o.className), E = d ? { className: d } : {}, h = ar(p.props, de(vt(o, ["ref"])));
    for (let u in g) u in h && delete g[u];
    return Hr(p, Object.assign({}, h, g, f, { ref: l(pn(p), f.ref) }, E));
  }
  return Re(i, Object.assign({}, vt(o, ["ref"]), !Fe(i) && f, !Fe(i) && g), p);
}
function fn() {
  let e = S([]), t = W((r) => {
    for (let n of e.current) n != null && (typeof n == "function" ? n(r) : n.current = r);
  }, []);
  return (...r) => {
    if (!r.every((n) => n == null)) return e.current = r, t;
  };
}
function mn(...e) {
  return e.every((t) => t == null) ? void 0 : (t) => {
    for (let r of e) r != null && (typeof r == "function" ? r(t) : r.current = t);
  };
}
function ar(...e) {
  if (e.length === 0) return {};
  if (e.length === 1) return e[0];
  let t = {}, r = {};
  for (let n of e) for (let l in n) l.startsWith("on") && typeof n[l] == "function" ? (r[l] != null || (r[l] = []), r[l].push(n[l])) : t[l] = n[l];
  if (t.disabled || t["aria-disabled"]) for (let n in r) /^(on(?:Click|Pointer|Mouse|Key)(?:Down|Up|Press)?)$/.test(n) && (r[n] = [(l) => {
    var i;
    return (i = l == null ? void 0 : l.preventDefault) == null ? void 0 : i.call(l);
  }]);
  for (let n in r) Object.assign(t, { [n](l, ...i) {
    let s = r[n];
    for (let a of s) {
      if ((l instanceof Event || (l == null ? void 0 : l.nativeEvent) instanceof Event) && l.defaultPrevented) return;
      a(l, ...i);
    }
  } });
  return t;
}
function V(e) {
  var t;
  return Object.assign(Tt(e), { displayName: (t = e.displayName) != null ? t : e.name });
}
function de(e) {
  let t = Object.assign({}, e);
  for (let r in t) t[r] === void 0 && delete t[r];
  return t;
}
function vt(e, t = []) {
  let r = Object.assign({}, e);
  for (let n of t) n in r && delete r[n];
  return r;
}
function pn(e) {
  return $.version.split(".")[0] >= "19" ? e.props.ref : e.ref;
}
function Fe(e) {
  return e === ue || e === Symbol.for("react.fragment");
}
function hn(e) {
  return Fe(e.type);
}
let vn = "span";
var qe = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(qe || {});
function gn(e, t) {
  var r;
  let { features: n = 1, ...l } = e, i = { ref: t, "aria-hidden": (n & 2) === 2 ? !0 : (r = l["aria-hidden"]) != null ? r : void 0, hidden: (n & 4) === 4 ? !0 : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(n & 4) === 4 && (n & 2) !== 2 && { display: "none" } } };
  return G()({ ourProps: i, theirProps: l, slot: {}, defaultTag: vn, name: "Hidden" });
}
let Et = V(gn);
function wn(e) {
  return typeof e != "object" || e === null ? !1 : "nodeType" in e;
}
function se(e) {
  return wn(e) && "tagName" in e;
}
function pe(e) {
  return se(e) && "accessKey" in e;
}
function ae(e) {
  return se(e) && "tabIndex" in e;
}
function yn(e) {
  return se(e) && "style" in e;
}
function bn(e) {
  return pe(e) && e.nodeName === "IFRAME";
}
function xn(e) {
  return pe(e) && e.nodeName === "INPUT";
}
let sr = Symbol();
function En(e, t = !0) {
  return Object.assign(e, { [sr]: t });
}
function Z(...e) {
  let t = S(e);
  L(() => {
    t.current = e;
  }, [e]);
  let r = M((n) => {
    for (let l of t.current) l != null && (typeof l == "function" ? l(n) : l.current = n);
  });
  return e.every((n) => n == null || (n == null ? void 0 : n[sr])) ? void 0 : r;
}
let At = z(null);
At.displayName = "DescriptionContext";
function ur() {
  let e = H(At);
  if (e === null) {
    let t = new Error("You used a <Description /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(t, ur), t;
  }
  return e;
}
function $n() {
  let [e, t] = F([]);
  return [e.length > 0 ? e.join(" ") : void 0, D(() => function(r) {
    let n = M((i) => (t((s) => [...s, i]), () => t((s) => {
      let a = s.slice(), o = a.indexOf(i);
      return o !== -1 && a.splice(o, 1), a;
    }))), l = D(() => ({ register: n, slot: r.slot, name: r.name, props: r.props, value: r.value }), [n, r.slot, r.name, r.props, r.value]);
    return $.createElement(At.Provider, { value: l }, r.children);
  }, [t])];
}
let On = "p";
function Sn(e, t) {
  let r = De(), n = cn(), { id: l = `headlessui-description-${r}`, ...i } = e, s = ur(), a = Z(t);
  U(() => s.register(l), [l, s.register]);
  let o = _e({ ...s.slot, disabled: n || !1 }), f = { ref: a, ...s.props, id: l };
  return G()({ ourProps: f, theirProps: i, slot: o, defaultTag: On, name: s.name || "Description" });
}
let Pn = V(Sn), Tn = Object.assign(Pn, {});
var cr = ((e) => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(cr || {});
let Mn = z(() => {
});
function Ln({ value: e, children: t }) {
  return $.createElement(Mn.Provider, { value: e }, t);
}
let dr = class extends Map {
  constructor(t) {
    super(), this.factory = t;
  }
  get(t) {
    let r = super.get(t);
    return r === void 0 && (r = this.factory(t), this.set(t, r)), r;
  }
};
var kn = Object.defineProperty, An = (e, t, r) => t in e ? kn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Cn = (e, t, r) => (An(e, t + "", r), r), fr = (e, t, r) => {
  if (!t.has(e)) throw TypeError("Cannot " + r);
}, X = (e, t, r) => (fr(e, t, "read from private field"), r ? r.call(e) : t.get(e)), gt = (e, t, r) => {
  if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, r);
}, _t = (e, t, r, n) => (fr(e, t, "write to private field"), t.set(e, r), r), Y, Le, ke;
let Fn = class {
  constructor(t) {
    gt(this, Y, {}), gt(this, Le, new dr(() => /* @__PURE__ */ new Set())), gt(this, ke, /* @__PURE__ */ new Set()), Cn(this, "disposables", ne()), _t(this, Y, t), ee.isServer && this.disposables.microTask(() => {
      this.dispose();
    });
  }
  dispose() {
    this.disposables.dispose();
  }
  get state() {
    return X(this, Y);
  }
  subscribe(t, r) {
    if (ee.isServer) return () => {
    };
    let n = { selector: t, callback: r, current: t(X(this, Y)) };
    return X(this, ke).add(n), this.disposables.add(() => {
      X(this, ke).delete(n);
    });
  }
  on(t, r) {
    return ee.isServer ? () => {
    } : (X(this, Le).get(t).add(r), this.disposables.add(() => {
      X(this, Le).get(t).delete(r);
    }));
  }
  send(t) {
    let r = this.reduce(X(this, Y), t);
    if (r !== X(this, Y)) {
      _t(this, Y, r);
      for (let n of X(this, ke)) {
        let l = n.selector(X(this, Y));
        mr(n.current, l) || (n.current = l, n.callback(l));
      }
      for (let n of X(this, Le).get(t.type)) n(X(this, Y), t);
    }
  }
};
Y = /* @__PURE__ */ new WeakMap(), Le = /* @__PURE__ */ new WeakMap(), ke = /* @__PURE__ */ new WeakMap();
function mr(e, t) {
  return Object.is(e, t) ? !0 : typeof e != "object" || e === null || typeof t != "object" || t === null ? !1 : Array.isArray(e) && Array.isArray(t) ? e.length !== t.length ? !1 : wt(e[Symbol.iterator](), t[Symbol.iterator]()) : e instanceof Map && t instanceof Map || e instanceof Set && t instanceof Set ? e.size !== t.size ? !1 : wt(e.entries(), t.entries()) : jt(e) && jt(t) ? wt(Object.entries(e)[Symbol.iterator](), Object.entries(t)[Symbol.iterator]()) : !1;
}
function wt(e, t) {
  do {
    let r = e.next(), n = t.next();
    if (r.done && n.done) return !0;
    if (r.done || n.done || !Object.is(r.value, n.value)) return !1;
  } while (!0);
}
function jt(e) {
  if (Object.prototype.toString.call(e) !== "[object Object]") return !1;
  let t = Object.getPrototypeOf(e);
  return t === null || Object.getPrototypeOf(t) === null;
}
var Nn = Object.defineProperty, In = (e, t, r) => t in e ? Nn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Wt = (e, t, r) => (In(e, typeof t != "symbol" ? t + "" : t, r), r), Rn = ((e) => (e[e.Push = 0] = "Push", e[e.Pop = 1] = "Pop", e))(Rn || {});
let Dn = { 0(e, t) {
  let r = t.id, n = e.stack, l = e.stack.indexOf(r);
  if (l !== -1) {
    let i = e.stack.slice();
    return i.splice(l, 1), i.push(r), n = i, { ...e, stack: n };
  }
  return { ...e, stack: [...e.stack, r] };
}, 1(e, t) {
  let r = t.id, n = e.stack.indexOf(r);
  if (n === -1) return e;
  let l = e.stack.slice();
  return l.splice(n, 1), { ...e, stack: l };
} }, _n = class pr extends Fn {
  constructor() {
    super(...arguments), Wt(this, "actions", { push: (t) => this.send({ type: 0, id: t }), pop: (t) => this.send({ type: 1, id: t }) }), Wt(this, "selectors", { isTop: (t, r) => t.stack[t.stack.length - 1] === r, inStack: (t, r) => t.stack.includes(r) });
  }
  static new() {
    return new pr({ stack: [] });
  }
  reduce(t, r) {
    return re(r.type, Dn, t, r);
  }
};
const hr = new dr(() => _n.new());
var Be = { exports: {} }, yt = {};
/**
 * @license React
 * use-sync-external-store-with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ut;
function jn() {
  if (Ut) return yt;
  Ut = 1;
  var e = $;
  function t(o, f) {
    return o === f && (o !== 0 || 1 / o === 1 / f) || o !== o && f !== f;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e.useSyncExternalStore, l = e.useRef, i = e.useEffect, s = e.useMemo, a = e.useDebugValue;
  return yt.useSyncExternalStoreWithSelector = function(o, f, p, g, y) {
    var b = l(null);
    if (b.current === null) {
      var d = { hasValue: !1, value: null };
      b.current = d;
    } else d = b.current;
    b = s(
      function() {
        function h(m) {
          if (!u) {
            if (u = !0, c = m, m = g(m), y !== void 0 && d.hasValue) {
              var x = d.value;
              if (y(x, m))
                return v = x;
            }
            return v = m;
          }
          if (x = v, r(c, m)) return x;
          var O = g(m);
          return y !== void 0 && y(x, O) ? (c = m, x) : (c = m, v = O);
        }
        var u = !1, c, v, w = p === void 0 ? null : p;
        return [
          function() {
            return h(f());
          },
          w === null ? void 0 : function() {
            return h(w());
          }
        ];
      },
      [f, p, g, y]
    );
    var E = n(o, b[0], b[1]);
    return i(
      function() {
        d.hasValue = !0, d.value = E;
      },
      [E]
    ), a(E), E;
  }, yt;
}
var bt = {};
/**
 * @license React
 * use-sync-external-store-with-selector.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ht;
function Wn() {
  return Ht || (Ht = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(o, f) {
      return o === f && (o !== 0 || 1 / o === 1 / f) || o !== o && f !== f;
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var t = $, r = typeof Object.is == "function" ? Object.is : e, n = t.useSyncExternalStore, l = t.useRef, i = t.useEffect, s = t.useMemo, a = t.useDebugValue;
    bt.useSyncExternalStoreWithSelector = function(o, f, p, g, y) {
      var b = l(null);
      if (b.current === null) {
        var d = { hasValue: !1, value: null };
        b.current = d;
      } else d = b.current;
      b = s(
        function() {
          function h(m) {
            if (!u) {
              if (u = !0, c = m, m = g(m), y !== void 0 && d.hasValue) {
                var x = d.value;
                if (y(x, m))
                  return v = x;
              }
              return v = m;
            }
            if (x = v, r(c, m))
              return x;
            var O = g(m);
            return y !== void 0 && y(x, O) ? (c = m, x) : (c = m, v = O);
          }
          var u = !1, c, v, w = p === void 0 ? null : p;
          return [
            function() {
              return h(f());
            },
            w === null ? void 0 : function() {
              return h(w());
            }
          ];
        },
        [f, p, g, y]
      );
      var E = n(o, b[0], b[1]);
      return i(
        function() {
          d.hasValue = !0, d.value = E;
        },
        [E]
      ), a(E), E;
    }, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), bt;
}
var Vt;
function Un() {
  return Vt || (Vt = 1, process.env.NODE_ENV === "production" ? Be.exports = jn() : Be.exports = Wn()), Be.exports;
}
var Hn = Un();
function vr(e, t, r = mr) {
  return Hn.useSyncExternalStoreWithSelector(M((n) => e.subscribe(Vn, n)), M(() => e.state), M(() => e.state), M(t), r);
}
function Vn(e) {
  return e;
}
function je(e, t) {
  let r = De(), n = hr.get(t), [l, i] = vr(n, W((s) => [n.selectors.isTop(s, r), n.selectors.inStack(s, r)], [n, r]));
  return U(() => {
    if (e) return n.actions.push(r), () => n.actions.pop(r);
  }, [n, e, r]), e ? i ? l : !0 : !1;
}
let $t = /* @__PURE__ */ new Map(), Ne = /* @__PURE__ */ new Map();
function Bt(e) {
  var t;
  let r = (t = Ne.get(e)) != null ? t : 0;
  return Ne.set(e, r + 1), r !== 0 ? () => Xt(e) : ($t.set(e, { "aria-hidden": e.getAttribute("aria-hidden"), inert: e.inert }), e.setAttribute("aria-hidden", "true"), e.inert = !0, () => Xt(e));
}
function Xt(e) {
  var t;
  let r = (t = Ne.get(e)) != null ? t : 1;
  if (r === 1 ? Ne.delete(e) : Ne.set(e, r - 1), r !== 1) return;
  let n = $t.get(e);
  n && (n["aria-hidden"] === null ? e.removeAttribute("aria-hidden") : e.setAttribute("aria-hidden", n["aria-hidden"]), e.inert = n.inert, $t.delete(e));
}
function Bn(e, { allowed: t, disallowed: r } = {}) {
  let n = je(e, "inert-others");
  U(() => {
    var l, i;
    if (!n) return;
    let s = ne();
    for (let o of (l = r == null ? void 0 : r()) != null ? l : []) o && s.add(Bt(o));
    let a = (i = t == null ? void 0 : t()) != null ? i : [];
    for (let o of a) {
      if (!o) continue;
      let f = et(o);
      if (!f) continue;
      let p = o.parentElement;
      for (; p && p !== f.body; ) {
        for (let g of p.children) a.some((y) => g.contains(y)) || s.add(Bt(g));
        p = p.parentElement;
      }
    }
    return s.dispose;
  }, [n, t, r]);
}
function Xn(e, t, r) {
  let n = ve((l) => {
    let i = l.getBoundingClientRect();
    i.x === 0 && i.y === 0 && i.width === 0 && i.height === 0 && r();
  });
  L(() => {
    if (!e) return;
    let l = t === null ? null : pe(t) ? t : t.current;
    if (!l) return;
    let i = ne();
    if (typeof ResizeObserver < "u") {
      let s = new ResizeObserver(() => n.current(l));
      s.observe(l), i.add(() => s.disconnect());
    }
    if (typeof IntersectionObserver < "u") {
      let s = new IntersectionObserver(() => n.current(l));
      s.observe(l), i.add(() => s.disconnect());
    }
    return () => i.dispose();
  }, [t, n, e]);
}
let Ye = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "details>summary", "textarea:not([disabled])"].map((e) => `${e}:not([tabindex='-1'])`).join(","), zn = ["[data-autofocus]"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var Q = ((e) => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e[e.AutoFocus = 64] = "AutoFocus", e))(Q || {}), Ot = ((e) => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(Ot || {}), Gn = ((e) => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(Gn || {});
function Kn(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(Ye)).sort((t, r) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (r.tabIndex || Number.MAX_SAFE_INTEGER)));
}
function qn(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(zn)).sort((t, r) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (r.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var gr = ((e) => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(gr || {});
function Yn(e, t = 0) {
  var r;
  return e === ((r = et(e)) == null ? void 0 : r.body) ? !1 : re(t, { 0() {
    return e.matches(Ye);
  }, 1() {
    let n = e;
    for (; n !== null; ) {
      if (n.matches(Ye)) return !0;
      n = n.parentElement;
    }
    return !1;
  } });
}
var Zn = ((e) => (e[e.Keyboard = 0] = "Keyboard", e[e.Mouse = 1] = "Mouse", e))(Zn || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (e) => {
  e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (e) => {
  e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
function te(e) {
  e == null || e.focus({ preventScroll: !0 });
}
let Jn = ["textarea", "input"].join(",");
function Qn(e) {
  var t, r;
  return (r = (t = e == null ? void 0 : e.matches) == null ? void 0 : t.call(e, Jn)) != null ? r : !1;
}
function el(e, t = (r) => r) {
  return e.slice().sort((r, n) => {
    let l = t(r), i = t(n);
    if (l === null || i === null) return 0;
    let s = l.compareDocumentPosition(i);
    return s & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : s & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function Ie(e, t, { sorted: r = !0, relativeTo: n = null, skipElements: l = [] } = {}) {
  let i = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : document : e.ownerDocument, s = Array.isArray(e) ? r ? el(e) : e : t & 64 ? qn(e) : Kn(e);
  l.length > 0 && s.length > 1 && (s = s.filter((b) => !l.some((d) => d != null && "current" in d ? (d == null ? void 0 : d.current) === b : d === b))), n = n ?? i.activeElement;
  let a = (() => {
    if (t & 5) return 1;
    if (t & 10) return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), o = (() => {
    if (t & 1) return 0;
    if (t & 2) return Math.max(0, s.indexOf(n)) - 1;
    if (t & 4) return Math.max(0, s.indexOf(n)) + 1;
    if (t & 8) return s.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), f = t & 32 ? { preventScroll: !0 } : {}, p = 0, g = s.length, y;
  do {
    if (p >= g || p + g <= 0) return 0;
    let b = o + p;
    if (t & 16) b = (b + g) % g;
    else {
      if (b < 0) return 3;
      if (b >= g) return 1;
    }
    y = s[b], y == null || y.focus(f), p += a;
  } while (y !== i.activeElement);
  return t & 6 && Qn(y) && y.select(), 2;
}
function wr() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function tl() {
  return /Android/gi.test(window.navigator.userAgent);
}
function zt() {
  return wr() || tl();
}
function Xe(e, t, r, n) {
  let l = ve(r);
  L(() => {
    if (!e) return;
    function i(s) {
      l.current(s);
    }
    return document.addEventListener(t, i, n), () => document.removeEventListener(t, i, n);
  }, [e, t, n]);
}
function yr(e, t, r, n) {
  let l = ve(r);
  L(() => {
    if (!e) return;
    function i(s) {
      l.current(s);
    }
    return window.addEventListener(t, i, n), () => window.removeEventListener(t, i, n);
  }, [e, t, n]);
}
const Gt = 30;
function rl(e, t, r) {
  let n = ve(r), l = W(function(a, o) {
    if (a.defaultPrevented) return;
    let f = o(a);
    if (f === null || !f.getRootNode().contains(f) || !f.isConnected) return;
    let p = (function g(y) {
      return typeof y == "function" ? g(y()) : Array.isArray(y) || y instanceof Set ? y : [y];
    })(t);
    for (let g of p) if (g !== null && (g.contains(f) || a.composed && a.composedPath().includes(g))) return;
    return !Yn(f, gr.Loose) && f.tabIndex !== -1 && a.preventDefault(), n.current(a, f);
  }, [n, t]), i = S(null);
  Xe(e, "pointerdown", (a) => {
    var o, f;
    zt() || (i.current = ((f = (o = a.composedPath) == null ? void 0 : o.call(a)) == null ? void 0 : f[0]) || a.target);
  }, !0), Xe(e, "pointerup", (a) => {
    if (zt() || !i.current) return;
    let o = i.current;
    return i.current = null, l(a, () => o);
  }, !0);
  let s = S({ x: 0, y: 0 });
  Xe(e, "touchstart", (a) => {
    s.current.x = a.touches[0].clientX, s.current.y = a.touches[0].clientY;
  }, !0), Xe(e, "touchend", (a) => {
    let o = { x: a.changedTouches[0].clientX, y: a.changedTouches[0].clientY };
    if (!(Math.abs(o.x - s.current.x) >= Gt || Math.abs(o.y - s.current.y) >= Gt)) return l(a, () => ae(a.target) ? a.target : null);
  }, !0), yr(e, "blur", (a) => l(a, () => bn(window.document.activeElement) ? window.document.activeElement : null), !0);
}
function nt(...e) {
  return D(() => et(...e), [...e]);
}
function br(e, t, r, n) {
  let l = ve(r);
  L(() => {
    e = e ?? window;
    function i(s) {
      l.current(s);
    }
    return e.addEventListener(t, i, n), () => e.removeEventListener(t, i, n);
  }, [e, t, n]);
}
function nl(e) {
  return Vr(e.subscribe, e.getSnapshot, e.getSnapshot);
}
function ll(e, t) {
  let r = e(), n = /* @__PURE__ */ new Set();
  return { getSnapshot() {
    return r;
  }, subscribe(l) {
    return n.add(l), () => n.delete(l);
  }, dispatch(l, ...i) {
    let s = t[l].call(r, ...i);
    s && (r = s, n.forEach((a) => a()));
  } };
}
function il() {
  let e;
  return { before({ doc: t }) {
    var r;
    let n = t.documentElement, l = (r = t.defaultView) != null ? r : window;
    e = Math.max(0, l.innerWidth - n.clientWidth);
  }, after({ doc: t, d: r }) {
    let n = t.documentElement, l = Math.max(0, n.clientWidth - n.offsetWidth), i = Math.max(0, e - l);
    r.style(n, "paddingRight", `${i}px`);
  } };
}
function ol() {
  return wr() ? { before({ doc: e, d: t, meta: r }) {
    function n(l) {
      return r.containers.flatMap((i) => i()).some((i) => i.contains(l));
    }
    t.microTask(() => {
      var l;
      if (window.getComputedStyle(e.documentElement).scrollBehavior !== "auto") {
        let a = ne();
        a.style(e.documentElement, "scrollBehavior", "auto"), t.add(() => t.microTask(() => a.dispose()));
      }
      let i = (l = window.scrollY) != null ? l : window.pageYOffset, s = null;
      t.addEventListener(e, "click", (a) => {
        if (ae(a.target)) try {
          let o = a.target.closest("a");
          if (!o) return;
          let { hash: f } = new URL(o.href), p = e.querySelector(f);
          ae(p) && !n(p) && (s = p);
        } catch {
        }
      }, !0), t.addEventListener(e, "touchstart", (a) => {
        if (ae(a.target) && yn(a.target)) if (n(a.target)) {
          let o = a.target;
          for (; o.parentElement && n(o.parentElement); ) o = o.parentElement;
          t.style(o, "overscrollBehavior", "contain");
        } else t.style(a.target, "touchAction", "none");
      }), t.addEventListener(e, "touchmove", (a) => {
        if (ae(a.target)) {
          if (xn(a.target)) return;
          if (n(a.target)) {
            let o = a.target;
            for (; o.parentElement && o.dataset.headlessuiPortal !== "" && !(o.scrollHeight > o.clientHeight || o.scrollWidth > o.clientWidth); ) o = o.parentElement;
            o.dataset.headlessuiPortal === "" && a.preventDefault();
          } else a.preventDefault();
        }
      }, { passive: !1 }), t.add(() => {
        var a;
        let o = (a = window.scrollY) != null ? a : window.pageYOffset;
        i !== o && window.scrollTo(0, i), s && s.isConnected && (s.scrollIntoView({ block: "nearest" }), s = null);
      });
    });
  } } : {};
}
function al() {
  return { before({ doc: e, d: t }) {
    t.style(e.documentElement, "overflow", "hidden");
  } };
}
function sl(e) {
  let t = {};
  for (let r of e) Object.assign(t, r(t));
  return t;
}
let me = ll(() => /* @__PURE__ */ new Map(), { PUSH(e, t) {
  var r;
  let n = (r = this.get(e)) != null ? r : { doc: e, count: 0, d: ne(), meta: /* @__PURE__ */ new Set() };
  return n.count++, n.meta.add(t), this.set(e, n), this;
}, POP(e, t) {
  let r = this.get(e);
  return r && (r.count--, r.meta.delete(t)), this;
}, SCROLL_PREVENT({ doc: e, d: t, meta: r }) {
  let n = { doc: e, d: t, meta: sl(r) }, l = [ol(), il(), al()];
  l.forEach(({ before: i }) => i == null ? void 0 : i(n)), l.forEach(({ after: i }) => i == null ? void 0 : i(n));
}, SCROLL_ALLOW({ d: e }) {
  e.dispose();
}, TEARDOWN({ doc: e }) {
  this.delete(e);
} });
me.subscribe(() => {
  let e = me.getSnapshot(), t = /* @__PURE__ */ new Map();
  for (let [r] of e) t.set(r, r.documentElement.style.overflow);
  for (let r of e.values()) {
    let n = t.get(r.doc) === "hidden", l = r.count !== 0;
    (l && !n || !l && n) && me.dispatch(r.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", r), r.count === 0 && me.dispatch("TEARDOWN", r);
  }
});
function ul(e, t, r = () => ({ containers: [] })) {
  let n = nl(me), l = t ? n.get(t) : void 0, i = l ? l.count > 0 : !1;
  return U(() => {
    if (!(!t || !e)) return me.dispatch("PUSH", t, r), () => me.dispatch("POP", t, r);
  }, [e, t]), i;
}
function cl(e, t, r = () => [document.body]) {
  let n = je(e, "scroll-lock");
  ul(n, t, (l) => {
    var i;
    return { containers: [...(i = l.containers) != null ? i : [], r] };
  });
}
function dl(e = 0) {
  let [t, r] = F(e), n = W((o) => r(o), []), l = W((o) => r((f) => f | o), []), i = W((o) => (t & o) === o, [t]), s = W((o) => r((f) => f & ~o), []), a = W((o) => r((f) => f ^ o), []);
  return { flags: t, setFlag: n, addFlag: l, hasFlag: i, removeFlag: s, toggleFlag: a };
}
var Kt, qt;
typeof process < "u" && typeof globalThis < "u" && typeof Element < "u" && ((Kt = process == null ? void 0 : process.env) == null ? void 0 : Kt.NODE_ENV) === "test" && typeof ((qt = Element == null ? void 0 : Element.prototype) == null ? void 0 : qt.getAnimations) > "u" && (Element.prototype.getAnimations = function() {
  return console.warn(["Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.", "Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.", "", "Example usage:", "```js", "import { mockAnimationsApi } from 'jsdom-testing-mocks'", "mockAnimationsApi()", "```"].join(`
`)), [];
});
var fl = ((e) => (e[e.None = 0] = "None", e[e.Closed = 1] = "Closed", e[e.Enter = 2] = "Enter", e[e.Leave = 4] = "Leave", e))(fl || {});
function ml(e) {
  let t = {};
  for (let r in e) e[r] === !0 && (t[`data-${r}`] = "");
  return t;
}
function pl(e, t, r, n) {
  let [l, i] = F(r), { hasFlag: s, addFlag: a, removeFlag: o } = dl(e && l ? 3 : 0), f = S(!1), p = S(!1), g = rt();
  return U(() => {
    var y;
    if (e) {
      if (r && i(!0), !t) {
        r && a(3);
        return;
      }
      return (y = n == null ? void 0 : n.start) == null || y.call(n, r), hl(t, { inFlight: f, prepare() {
        p.current ? p.current = !1 : p.current = f.current, f.current = !0, !p.current && (r ? (a(3), o(4)) : (a(4), o(2)));
      }, run() {
        p.current ? r ? (o(3), a(4)) : (o(4), a(3)) : r ? o(1) : a(1);
      }, done() {
        var b;
        p.current && typeof t.getAnimations == "function" && t.getAnimations().length > 0 || (f.current = !1, o(7), r || i(!1), (b = n == null ? void 0 : n.end) == null || b.call(n, r));
      } });
    }
  }, [e, r, t, g]), e ? [l, { closed: s(1), enter: s(2), leave: s(4), transition: s(2) || s(4) }] : [r, { closed: void 0, enter: void 0, leave: void 0, transition: void 0 }];
}
function hl(e, { prepare: t, run: r, done: n, inFlight: l }) {
  let i = ne();
  return gl(e, { prepare: t, inFlight: l }), i.nextFrame(() => {
    r(), i.requestAnimationFrame(() => {
      i.add(vl(e, n));
    });
  }), i.dispose;
}
function vl(e, t) {
  var r, n;
  let l = ne();
  if (!e) return l.dispose;
  let i = !1;
  l.add(() => {
    i = !0;
  });
  let s = (n = (r = e.getAnimations) == null ? void 0 : r.call(e).filter((a) => a instanceof CSSTransition)) != null ? n : [];
  return s.length === 0 ? (t(), l.dispose) : (Promise.allSettled(s.map((a) => a.finished)).then(() => {
    i || t();
  }), l.dispose);
}
function gl(e, { inFlight: t, prepare: r }) {
  if (t != null && t.current) {
    r();
    return;
  }
  let n = e.style.transition;
  e.style.transition = "none", r(), e.offsetHeight, e.style.transition = n;
}
function Ct(e, t) {
  let r = S([]), n = M(e);
  L(() => {
    let l = [...r.current];
    for (let [i, s] of t.entries()) if (r.current[i] !== s) {
      let a = n(t, l);
      return r.current = t, a;
    }
  }, [n, ...t]);
}
let lt = z(null);
lt.displayName = "OpenClosedContext";
var q = ((e) => (e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(q || {});
function it() {
  return H(lt);
}
function wl({ value: e, children: t }) {
  return $.createElement(lt.Provider, { value: e }, t);
}
function yl({ children: e }) {
  return $.createElement(lt.Provider, { value: null }, e);
}
function bl(e) {
  function t() {
    document.readyState !== "loading" && (e(), document.removeEventListener("DOMContentLoaded", t));
  }
  typeof window < "u" && typeof document < "u" && (document.addEventListener("DOMContentLoaded", t), t());
}
let ie = [];
bl(() => {
  function e(t) {
    if (!ae(t.target) || t.target === document.body || ie[0] === t.target) return;
    let r = t.target;
    r = r.closest(Ye), ie.unshift(r ?? t.target), ie = ie.filter((n) => n != null && n.isConnected), ie.splice(10);
  }
  window.addEventListener("click", e, { capture: !0 }), window.addEventListener("mousedown", e, { capture: !0 }), window.addEventListener("focus", e, { capture: !0 }), document.body.addEventListener("click", e, { capture: !0 }), document.body.addEventListener("mousedown", e, { capture: !0 }), document.body.addEventListener("focus", e, { capture: !0 });
});
function xr(e) {
  let t = M(e), r = S(!1);
  L(() => (r.current = !1, () => {
    r.current = !0, tt(() => {
      r.current && t();
    });
  }), [t]);
}
let Er = z(!1);
function xl() {
  return H(Er);
}
function Yt(e) {
  return $.createElement(Er.Provider, { value: e.force }, e.children);
}
function El(e) {
  let t = xl(), r = H(Or), [n, l] = F(() => {
    var i;
    if (!t && r !== null) return (i = r.current) != null ? i : null;
    if (ee.isServer) return null;
    let s = e == null ? void 0 : e.getElementById("headlessui-portal-root");
    if (s) return s;
    if (e === null) return null;
    let a = e.createElement("div");
    return a.setAttribute("id", "headlessui-portal-root"), e.body.appendChild(a);
  });
  return L(() => {
    n !== null && (e != null && e.body.contains(n) || e == null || e.body.appendChild(n));
  }, [n, e]), L(() => {
    t || r !== null && l(r.current);
  }, [r, l, t]), n;
}
let $r = ue, $l = V(function(e, t) {
  let { ownerDocument: r = null, ...n } = e, l = S(null), i = Z(En((y) => {
    l.current = y;
  }), t), s = nt(l), a = r ?? s, o = El(a), f = H(St), p = rt(), g = G();
  return xr(() => {
    var y;
    o && o.childNodes.length <= 0 && ((y = o.parentElement) == null || y.removeChild(o));
  }), o ? Kr($.createElement("div", { "data-headlessui-portal": "", ref: (y) => {
    p.dispose(), f && y && p.add(f.register(y));
  } }, g({ ourProps: { ref: i }, theirProps: n, slot: {}, defaultTag: $r, name: "Portal" })), o) : null;
});
function Ol(e, t) {
  let r = Z(t), { enabled: n = !0, ownerDocument: l, ...i } = e, s = G();
  return n ? $.createElement($l, { ...i, ownerDocument: l, ref: r }) : s({ ourProps: { ref: r }, theirProps: i, slot: {}, defaultTag: $r, name: "Portal" });
}
let Sl = ue, Or = z(null);
function Pl(e, t) {
  let { target: r, ...n } = e, l = { ref: Z(t) }, i = G();
  return $.createElement(Or.Provider, { value: r }, i({ ourProps: l, theirProps: n, defaultTag: Sl, name: "Popover.Group" }));
}
let St = z(null);
function Tl() {
  let e = H(St), t = S([]), r = M((i) => (t.current.push(i), e && e.register(i), () => n(i))), n = M((i) => {
    let s = t.current.indexOf(i);
    s !== -1 && t.current.splice(s, 1), e && e.unregister(i);
  }), l = D(() => ({ register: r, unregister: n, portals: t }), [r, n, t]);
  return [t, D(() => function({ children: i }) {
    return $.createElement(St.Provider, { value: l }, i);
  }, [l])];
}
let Ml = V(Ol), Sr = V(Pl), Ll = Object.assign(Ml, { Group: Sr });
function kl(e, t = typeof document < "u" ? document.defaultView : null, r) {
  let n = je(e, "escape");
  br(t, "keydown", (l) => {
    n && (l.defaultPrevented || l.key === cr.Escape && r(l));
  });
}
function Al() {
  var e;
  let [t] = F(() => typeof window < "u" && typeof window.matchMedia == "function" ? window.matchMedia("(pointer: coarse)") : null), [r, n] = F((e = t == null ? void 0 : t.matches) != null ? e : !1);
  return U(() => {
    if (!t) return;
    function l(i) {
      n(i.matches);
    }
    return t.addEventListener("change", l), () => t.removeEventListener("change", l);
  }, [t]), r;
}
function Cl({ defaultContainers: e = [], portals: t, mainTreeNode: r } = {}) {
  let n = nt(r), l = M(() => {
    var i, s;
    let a = [];
    for (let o of e) o !== null && (se(o) ? a.push(o) : "current" in o && se(o.current) && a.push(o.current));
    if (t != null && t.current) for (let o of t.current) a.push(o);
    for (let o of (i = n == null ? void 0 : n.querySelectorAll("html > *, body > *")) != null ? i : []) o !== document.body && o !== document.head && se(o) && o.id !== "headlessui-portal-root" && (r && (o.contains(r) || o.contains((s = r == null ? void 0 : r.getRootNode()) == null ? void 0 : s.host)) || a.some((f) => o.contains(f)) || a.push(o));
    return a;
  });
  return { resolveContainers: l, contains: M((i) => l().some((s) => s.contains(i))) };
}
let Pr = z(null);
function Zt({ children: e, node: t }) {
  let [r, n] = F(null), l = Tr(t ?? r);
  return $.createElement(Pr.Provider, { value: l }, e, l === null && $.createElement(Et, { features: qe.Hidden, ref: (i) => {
    var s, a;
    if (i) {
      for (let o of (a = (s = et(i)) == null ? void 0 : s.querySelectorAll("html > *, body > *")) != null ? a : []) if (o !== document.body && o !== document.head && se(o) && o != null && o.contains(i)) {
        n(o);
        break;
      }
    }
  } }));
}
function Tr(e = null) {
  var t;
  return (t = H(Pr)) != null ? t : e;
}
function Fl() {
  let e = typeof document > "u";
  return "useSyncExternalStore" in Ce ? ((t) => t.useSyncExternalStore)(Ce)(() => () => {
  }, () => !1, () => !e) : !1;
}
function ot() {
  let e = Fl(), [t, r] = Ce.useState(ee.isHandoffComplete);
  return t && ee.isHandoffComplete === !1 && r(!1), Ce.useEffect(() => {
    t !== !0 && r(!0);
  }, [t]), Ce.useEffect(() => ee.handoff(), []), e ? !1 : t;
}
function Ft() {
  let e = S(!1);
  return U(() => (e.current = !0, () => {
    e.current = !1;
  }), []), e;
}
var Ae = ((e) => (e[e.Forwards = 0] = "Forwards", e[e.Backwards = 1] = "Backwards", e))(Ae || {});
function Nl() {
  let e = S(0);
  return yr(!0, "keydown", (t) => {
    t.key === "Tab" && (e.current = t.shiftKey ? 1 : 0);
  }, !0), e;
}
function Mr(e) {
  if (!e) return /* @__PURE__ */ new Set();
  if (typeof e == "function") return new Set(e());
  let t = /* @__PURE__ */ new Set();
  for (let r of e.current) se(r.current) && t.add(r.current);
  return t;
}
let Il = "div";
var fe = ((e) => (e[e.None = 0] = "None", e[e.InitialFocus = 1] = "InitialFocus", e[e.TabLock = 2] = "TabLock", e[e.FocusLock = 4] = "FocusLock", e[e.RestoreFocus = 8] = "RestoreFocus", e[e.AutoFocus = 16] = "AutoFocus", e))(fe || {});
function Rl(e, t) {
  let r = S(null), n = Z(r, t), { initialFocus: l, initialFocusFallback: i, containers: s, features: a = 15, ...o } = e;
  ot() || (a = 0);
  let f = nt(r);
  Wl(a, { ownerDocument: f });
  let p = Ul(a, { ownerDocument: f, container: r, initialFocus: l, initialFocusFallback: i });
  Hl(a, { ownerDocument: f, container: r, containers: s, previousActiveElement: p });
  let g = Nl(), y = M((c) => {
    if (!pe(r.current)) return;
    let v = r.current;
    ((w) => w())(() => {
      re(g.current, { [Ae.Forwards]: () => {
        Ie(v, Q.First, { skipElements: [c.relatedTarget, i] });
      }, [Ae.Backwards]: () => {
        Ie(v, Q.Last, { skipElements: [c.relatedTarget, i] });
      } });
    });
  }), b = je(!!(a & 2), "focus-trap#tab-lock"), d = rt(), E = S(!1), h = { ref: n, onKeyDown(c) {
    c.key == "Tab" && (E.current = !0, d.requestAnimationFrame(() => {
      E.current = !1;
    }));
  }, onBlur(c) {
    if (!(a & 4)) return;
    let v = Mr(s);
    pe(r.current) && v.add(r.current);
    let w = c.relatedTarget;
    ae(w) && w.dataset.headlessuiFocusGuard !== "true" && (Lr(v, w) || (E.current ? Ie(r.current, re(g.current, { [Ae.Forwards]: () => Q.Next, [Ae.Backwards]: () => Q.Previous }) | Q.WrapAround, { relativeTo: c.target }) : ae(c.target) && te(c.target)));
  } }, u = G();
  return $.createElement($.Fragment, null, b && $.createElement(Et, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: y, features: qe.Focusable }), u({ ourProps: h, theirProps: o, defaultTag: Il, name: "FocusTrap" }), b && $.createElement(Et, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: y, features: qe.Focusable }));
}
let Dl = V(Rl), _l = Object.assign(Dl, { features: fe });
function jl(e = !0) {
  let t = S(ie.slice());
  return Ct(([r], [n]) => {
    n === !0 && r === !1 && tt(() => {
      t.current.splice(0);
    }), n === !1 && r === !0 && (t.current = ie.slice());
  }, [e, ie, t]), M(() => {
    var r;
    return (r = t.current.find((n) => n != null && n.isConnected)) != null ? r : null;
  });
}
function Wl(e, { ownerDocument: t }) {
  let r = !!(e & 8), n = jl(r);
  Ct(() => {
    r || (t == null ? void 0 : t.activeElement) === (t == null ? void 0 : t.body) && te(n());
  }, [r]), xr(() => {
    r && te(n());
  });
}
function Ul(e, { ownerDocument: t, container: r, initialFocus: n, initialFocusFallback: l }) {
  let i = S(null), s = je(!!(e & 1), "focus-trap#initial-focus"), a = Ft();
  return Ct(() => {
    if (e === 0) return;
    if (!s) {
      l != null && l.current && te(l.current);
      return;
    }
    let o = r.current;
    o && tt(() => {
      if (!a.current) return;
      let f = t == null ? void 0 : t.activeElement;
      if (n != null && n.current) {
        if ((n == null ? void 0 : n.current) === f) {
          i.current = f;
          return;
        }
      } else if (o.contains(f)) {
        i.current = f;
        return;
      }
      if (n != null && n.current) te(n.current);
      else {
        if (e & 16) {
          if (Ie(o, Q.First | Q.AutoFocus) !== Ot.Error) return;
        } else if (Ie(o, Q.First) !== Ot.Error) return;
        if (l != null && l.current && (te(l.current), (t == null ? void 0 : t.activeElement) === l.current)) return;
        console.warn("There are no focusable elements inside the <FocusTrap />");
      }
      i.current = t == null ? void 0 : t.activeElement;
    });
  }, [l, s, e]), i;
}
function Hl(e, { ownerDocument: t, container: r, containers: n, previousActiveElement: l }) {
  let i = Ft(), s = !!(e & 4);
  br(t == null ? void 0 : t.defaultView, "focus", (a) => {
    if (!s || !i.current) return;
    let o = Mr(n);
    pe(r.current) && o.add(r.current);
    let f = l.current;
    if (!f) return;
    let p = a.target;
    pe(p) ? Lr(o, p) ? (l.current = p, te(p)) : (a.preventDefault(), a.stopPropagation(), te(f)) : te(l.current);
  }, !0);
}
function Lr(e, t) {
  for (let r of e) if (r.contains(t)) return !0;
  return !1;
}
function kr(e) {
  var t;
  return !!(e.enter || e.enterFrom || e.enterTo || e.leave || e.leaveFrom || e.leaveTo) || !Fe((t = e.as) != null ? t : Cr) || $.Children.count(e.children) === 1;
}
let at = z(null);
at.displayName = "TransitionContext";
var Vl = ((e) => (e.Visible = "visible", e.Hidden = "hidden", e))(Vl || {});
function Bl() {
  let e = H(at);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
function Xl() {
  let e = H(st);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
let st = z(null);
st.displayName = "NestingContext";
function ut(e) {
  return "children" in e ? ut(e.children) : e.current.filter(({ el: t }) => t.current !== null).filter(({ state: t }) => t === "visible").length > 0;
}
function Ar(e, t) {
  let r = ve(e), n = S([]), l = Ft(), i = rt(), s = M((b, d = oe.Hidden) => {
    let E = n.current.findIndex(({ el: h }) => h === b);
    E !== -1 && (re(d, { [oe.Unmount]() {
      n.current.splice(E, 1);
    }, [oe.Hidden]() {
      n.current[E].state = "hidden";
    } }), i.microTask(() => {
      var h;
      !ut(n) && l.current && ((h = r.current) == null || h.call(r));
    }));
  }), a = M((b) => {
    let d = n.current.find(({ el: E }) => E === b);
    return d ? d.state !== "visible" && (d.state = "visible") : n.current.push({ el: b, state: "visible" }), () => s(b, oe.Unmount);
  }), o = S([]), f = S(Promise.resolve()), p = S({ enter: [], leave: [] }), g = M((b, d, E) => {
    o.current.splice(0), t && (t.chains.current[d] = t.chains.current[d].filter(([h]) => h !== b)), t == null || t.chains.current[d].push([b, new Promise((h) => {
      o.current.push(h);
    })]), t == null || t.chains.current[d].push([b, new Promise((h) => {
      Promise.all(p.current[d].map(([u, c]) => c)).then(() => h());
    })]), d === "enter" ? f.current = f.current.then(() => t == null ? void 0 : t.wait.current).then(() => E(d)) : E(d);
  }), y = M((b, d, E) => {
    Promise.all(p.current[d].splice(0).map(([h, u]) => u)).then(() => {
      var h;
      (h = o.current.shift()) == null || h();
    }).then(() => E(d));
  });
  return D(() => ({ children: n, register: a, unregister: s, onStart: g, onStop: y, wait: f, chains: p }), [a, s, n, g, y, p, f]);
}
let Cr = ue, Fr = Ke.RenderStrategy;
function zl(e, t) {
  var r, n;
  let { transition: l = !0, beforeEnter: i, afterEnter: s, beforeLeave: a, afterLeave: o, enter: f, enterFrom: p, enterTo: g, entered: y, leave: b, leaveFrom: d, leaveTo: E, ...h } = e, [u, c] = F(null), v = S(null), w = kr(e), m = Z(...w ? [v, t, c] : t === null ? [] : [t]), x = (r = h.unmount) == null || r ? oe.Unmount : oe.Hidden, { show: O, appear: N, initial: _ } = Bl(), [C, I] = F(O ? "visible" : "hidden"), B = Xl(), { register: R, unregister: k } = B;
  U(() => R(v), [R, v]), U(() => {
    if (x === oe.Hidden && v.current) {
      if (O && C !== "visible") {
        I("visible");
        return;
      }
      return re(C, { hidden: () => k(v), visible: () => R(v) });
    }
  }, [C, v, R, k, O, x]);
  let j = ot();
  U(() => {
    if (w && j && C === "visible" && v.current === null) throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
  }, [v, C, j, w]);
  let ge = _ && !N, ce = N && O && _, J = S(!1), A = Ar(() => {
    J.current || (I("hidden"), k(v));
  }, B), $e = M((ft) => {
    J.current = !0;
    let Ue = ft ? "enter" : "leave";
    A.onStart(v, Ue, (Se) => {
      Se === "enter" ? i == null || i() : Se === "leave" && (a == null || a());
    });
  }), le = M((ft) => {
    let Ue = ft ? "enter" : "leave";
    J.current = !1, A.onStop(v, Ue, (Se) => {
      Se === "enter" ? s == null || s() : Se === "leave" && (o == null || o());
    }), Ue === "leave" && !ut(A) && (I("hidden"), k(v));
  });
  L(() => {
    w && l || ($e(O), le(O));
  }, [O, w, l]);
  let dt = !(!l || !w || !j || ge), [, P] = pl(dt, u, O, { start: $e, end: le }), We = de({ ref: m, className: ((n = xt(h.className, ce && f, ce && p, P.enter && f, P.enter && P.closed && p, P.enter && !P.closed && g, P.leave && b, P.leave && !P.closed && d, P.leave && P.closed && E, !P.transition && O && y)) == null ? void 0 : n.trim()) || void 0, ...ml(P) }), Oe = 0;
  C === "visible" && (Oe |= q.Open), C === "hidden" && (Oe |= q.Closed), O && C === "hidden" && (Oe |= q.Opening), !O && C === "visible" && (Oe |= q.Closing);
  let Dr = G();
  return $.createElement(st.Provider, { value: A }, $.createElement(wl, { value: Oe }, Dr({ ourProps: We, theirProps: h, defaultTag: Cr, features: Fr, visible: C === "visible", name: "Transition.Child" })));
}
function Gl(e, t) {
  let { show: r, appear: n = !1, unmount: l = !0, ...i } = e, s = S(null), a = kr(e), o = Z(...a ? [s, t] : t === null ? [] : [t]);
  ot();
  let f = it();
  if (r === void 0 && f !== null && (r = (f & q.Open) === q.Open), r === void 0) throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
  let [p, g] = F(r ? "visible" : "hidden"), y = Ar(() => {
    r || g("hidden");
  }), [b, d] = F(!0), E = S([r]);
  U(() => {
    b !== !1 && E.current[E.current.length - 1] !== r && (E.current.push(r), d(!1));
  }, [E, r]);
  let h = D(() => ({ show: r, appear: n, initial: b }), [r, n, b]);
  U(() => {
    r ? g("visible") : !ut(y) && s.current !== null && g("hidden");
  }, [r, y]);
  let u = { unmount: l }, c = M(() => {
    var m;
    b && d(!1), (m = e.beforeEnter) == null || m.call(e);
  }), v = M(() => {
    var m;
    b && d(!1), (m = e.beforeLeave) == null || m.call(e);
  }), w = G();
  return $.createElement(st.Provider, { value: y }, $.createElement(at.Provider, { value: h }, w({ ourProps: { ...u, as: ue, children: $.createElement(Nr, { ref: o, ...u, ...i, beforeEnter: c, beforeLeave: v }) }, theirProps: {}, defaultTag: ue, features: Fr, visible: p === "visible", name: "Transition" })));
}
function Kl(e, t) {
  let r = H(at) !== null, n = it() !== null;
  return $.createElement($.Fragment, null, !r && n ? $.createElement(Pt, { ref: t, ...e }) : $.createElement(Nr, { ref: t, ...e }));
}
let Pt = V(Gl), Nr = V(zl), Ee = V(Kl), Ir = Object.assign(Pt, { Child: Ee, Root: Pt });
var ql = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(ql || {}), Yl = ((e) => (e[e.SetTitleId = 0] = "SetTitleId", e))(Yl || {});
let Zl = { 0(e, t) {
  return e.titleId === t.id ? e : { ...e, titleId: t.id };
} }, Nt = z(null);
Nt.displayName = "DialogContext";
function ct(e) {
  let t = H(Nt);
  if (t === null) {
    let r = new Error(`<${e} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(r, ct), r;
  }
  return t;
}
function Jl(e, t) {
  return re(t.type, Zl, e, t);
}
let Jt = V(function(e, t) {
  let r = De(), { id: n = `headlessui-dialog-${r}`, open: l, onClose: i, initialFocus: s, role: a = "dialog", autoFocus: o = !0, __demoMode: f = !1, unmount: p = !1, ...g } = e, y = S(!1);
  a = (function() {
    return a === "dialog" || a === "alertdialog" ? a : (y.current || (y.current = !0, console.warn(`Invalid role [${a}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog");
  })();
  let b = it();
  l === void 0 && b !== null && (l = (b & q.Open) === q.Open);
  let d = S(null), E = Z(d, t), h = nt(d), u = l ? 0 : 1, [c, v] = Br(Jl, { titleId: null, descriptionId: null, panelRef: Xr() }), w = M(() => i(!1)), m = M((P) => v({ type: 0, id: P })), x = ot() ? u === 0 : !1, [O, N] = Tl(), _ = { get current() {
    var P;
    return (P = c.panelRef.current) != null ? P : d.current;
  } }, C = Tr(), { resolveContainers: I } = Cl({ mainTreeNode: C, portals: O, defaultContainers: [_] }), B = b !== null ? (b & q.Closing) === q.Closing : !1;
  Bn(f || B ? !1 : x, { allowed: M(() => {
    var P, We;
    return [(We = (P = d.current) == null ? void 0 : P.closest("[data-headlessui-portal]")) != null ? We : null];
  }), disallowed: M(() => {
    var P;
    return [(P = C == null ? void 0 : C.closest("body > *:not(#headlessui-portal-root)")) != null ? P : null];
  }) });
  let R = hr.get(null);
  U(() => {
    if (x) return R.actions.push(n), () => R.actions.pop(n);
  }, [R, n, x]);
  let k = vr(R, W((P) => R.selectors.isTop(P, n), [R, n]));
  rl(k, I, (P) => {
    P.preventDefault(), w();
  }), kl(k, h == null ? void 0 : h.defaultView, (P) => {
    P.preventDefault(), P.stopPropagation(), document.activeElement && "blur" in document.activeElement && typeof document.activeElement.blur == "function" && document.activeElement.blur(), w();
  }), cl(f || B ? !1 : x, h, I), Xn(x, d, w);
  let [j, ge] = $n(), ce = D(() => [{ dialogState: u, close: w, setTitleId: m, unmount: p }, c], [u, w, m, p, c]), J = _e({ open: u === 0 }), A = { ref: E, id: n, role: a, tabIndex: -1, "aria-modal": f ? void 0 : u === 0 ? !0 : void 0, "aria-labelledby": c.titleId, "aria-describedby": j, unmount: p }, $e = !Al(), le = fe.None;
  x && !f && (le |= fe.RestoreFocus, le |= fe.TabLock, o && (le |= fe.AutoFocus), $e && (le |= fe.InitialFocus));
  let dt = G();
  return $.createElement(yl, null, $.createElement(Yt, { force: !0 }, $.createElement(Ll, null, $.createElement(Nt.Provider, { value: ce }, $.createElement(Sr, { target: d }, $.createElement(Yt, { force: !1 }, $.createElement(ge, { slot: J }, $.createElement(N, null, $.createElement(_l, { initialFocus: s, initialFocusFallback: d, containers: I, features: le }, $.createElement(Ln, { value: w }, dt({ ourProps: A, theirProps: g, slot: J, defaultTag: Ql, features: ei, visible: u === 0, name: "Dialog" })))))))))));
}), Ql = "div", ei = Ke.RenderStrategy | Ke.Static;
function ti(e, t) {
  let { transition: r = !1, open: n, ...l } = e, i = it(), s = e.hasOwnProperty("open") || i !== null, a = e.hasOwnProperty("onClose");
  if (!s && !a) throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");
  if (!s) throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");
  if (!a) throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");
  if (!i && typeof e.open != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${e.open}`);
  if (typeof e.onClose != "function") throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${e.onClose}`);
  return (n !== void 0 || r) && !l.static ? $.createElement(Zt, null, $.createElement(Ir, { show: n, transition: r, unmount: l.unmount }, $.createElement(Jt, { ref: t, ...l }))) : $.createElement(Zt, null, $.createElement(Jt, { ref: t, open: n, ...l }));
}
let ri = "div";
function ni(e, t) {
  let r = De(), { id: n = `headlessui-dialog-panel-${r}`, transition: l = !1, ...i } = e, [{ dialogState: s, unmount: a }, o] = ct("Dialog.Panel"), f = Z(t, o.panelRef), p = _e({ open: s === 0 }), g = M((h) => {
    h.stopPropagation();
  }), y = { ref: f, id: n, onClick: g }, b = l ? Ee : ue, d = l ? { unmount: a } : {}, E = G();
  return $.createElement(b, { ...d }, E({ ourProps: y, theirProps: i, slot: p, defaultTag: ri, name: "Dialog.Panel" }));
}
let li = "div";
function ii(e, t) {
  let { transition: r = !1, ...n } = e, [{ dialogState: l, unmount: i }] = ct("Dialog.Backdrop"), s = _e({ open: l === 0 }), a = { ref: t, "aria-hidden": !0 }, o = r ? Ee : ue, f = r ? { unmount: i } : {}, p = G();
  return $.createElement(o, { ...f }, p({ ourProps: a, theirProps: n, slot: s, defaultTag: li, name: "Dialog.Backdrop" }));
}
let oi = "h2";
function ai(e, t) {
  let r = De(), { id: n = `headlessui-dialog-title-${r}`, ...l } = e, [{ dialogState: i, setTitleId: s }] = ct("Dialog.Title"), a = Z(t);
  L(() => (s(n), () => s(null)), [n, s]);
  let o = _e({ open: i === 0 }), f = { ref: a, id: n };
  return G()({ ourProps: f, theirProps: l, slot: o, defaultTag: oi, name: "Dialog.Title" });
}
let si = V(ti), It = V(ni);
V(ii);
let ui = V(ai), ci = Object.assign(si, { Panel: It, Title: ui, Description: Tn });
function Rr({ onClick: e }) {
  return /* @__PURE__ */ he(
    "button",
    {
      type: "button",
      className: "im-close-button text-gray-400 hover:text-gray-500",
      onClick: e,
      children: [
        /* @__PURE__ */ T("span", { className: "sr-only", children: "Close" }),
        /* @__PURE__ */ T(
          "svg",
          {
            className: "size-6",
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: "2",
            stroke: "currentColor",
            "aria-hidden": "true",
            children: /* @__PURE__ */ T(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M6 18L18 6M6 6l12 12"
              }
            )
          }
        )
      ]
    }
  );
}
const di = ({ modalContext: e, config: t, children: r }) => {
  const [n, l] = F(!1);
  return /* @__PURE__ */ T("div", { className: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4", children: /* @__PURE__ */ T(
    "div",
    {
      className: Ge("im-modal-positioner flex min-h-full justify-center", {
        "items-start": t.position === "top",
        "items-center": t.position === "center",
        "items-end": t.position === "bottom"
      }),
      children: /* @__PURE__ */ T(
        Ee,
        {
          as: "div",
          enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          enterTo: "opacity-100 translate-y-0 sm:scale-100",
          leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
          leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          afterEnter: () => l(!0),
          afterLeave: e.afterLeave,
          className: Ge("im-modal-wrapper w-full transition duration-300 ease-in-out", e.onTopOfStack ? "" : "blur-sm", {
            "sm:max-w-sm": t.maxWidth === "sm",
            "sm:max-w-md": t.maxWidth === "md",
            "sm:max-w-md md:max-w-lg": t.maxWidth === "lg",
            "sm:max-w-md md:max-w-xl": t.maxWidth === "xl",
            "sm:max-w-md md:max-w-xl lg:max-w-2xl": t.maxWidth === "2xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl": t.maxWidth === "3xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl": t.maxWidth === "4xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl": t.maxWidth === "5xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl": t.maxWidth === "6xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl": t.maxWidth === "7xl"
          }),
          children: /* @__PURE__ */ he(
            It,
            {
              className: `im-modal-content relative ${t.paddingClasses} ${t.panelClasses}`,
              "data-inertiaui-modal-entered": n,
              children: [
                t.closeButton && /* @__PURE__ */ T("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ T(Rr, { onClick: e.close }) }),
                typeof r == "function" ? r({ modalContext: e, config: t }) : r
              ]
            }
          )
        }
      )
    }
  ) });
}, fi = ({ modalContext: e, config: t, children: r }) => {
  const [n, l] = F(!1);
  return /* @__PURE__ */ T("div", { className: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ T(
    "div",
    {
      className: Ge("im-slideover-positioner flex min-h-full items-center", {
        "justify-start rtl:justify-end": (t == null ? void 0 : t.position) === "left",
        "justify-end rtl:justify-start": (t == null ? void 0 : t.position) === "right"
      }),
      children: /* @__PURE__ */ T(
        Ee,
        {
          as: "div",
          enterFrom: `opacity-0 ${t.position === "left" ? "-translate-x-full" : "translate-x-full"}`,
          enterTo: "opacity-100 translate-x-0",
          leaveFrom: "opacity-100 translate-x-0",
          leaveTo: `opacity-0 ${t.position === "left" ? "-translate-x-full" : "translate-x-full"}`,
          afterEnter: () => l(!0),
          afterLeave: e.afterLeave,
          className: Ge("im-slideover-wrapper w-full transition duration-300 ease-in-out", e.onTopOfStack ? "" : "blur-sm", {
            "sm:max-w-sm": t.maxWidth === "sm",
            "sm:max-w-md": t.maxWidth === "md",
            "sm:max-w-md md:max-w-lg": t.maxWidth === "lg",
            "sm:max-w-md md:max-w-xl": t.maxWidth === "xl",
            "sm:max-w-md md:max-w-xl lg:max-w-2xl": t.maxWidth === "2xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl": t.maxWidth === "3xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl": t.maxWidth === "4xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl": t.maxWidth === "5xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl": t.maxWidth === "6xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl": t.maxWidth === "7xl"
          }),
          children: /* @__PURE__ */ he(
            It,
            {
              className: `im-slideover-content relative ${t.paddingClasses} ${t.panelClasses}`,
              "data-inertiaui-modal-entered": n,
              children: [
                t.closeButton && /* @__PURE__ */ T("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ T(Rr, { onClick: e.close }) }),
                typeof r == "function" ? r({ modalContext: e, config: t }) : r
              ]
            }
          )
        }
      )
    }
  ) });
}, mi = Tt(({ name: e, children: t, onFocus: r = null, onBlur: n = null, onClose: l = null, onSuccess: i = null, onAfterLeave: s = null, ...a }, o) => {
  const f = (g) => typeof t == "function" ? t(g) : t, p = S(null);
  return Qt(o, () => p.current, [p]), /* @__PURE__ */ T(
    ir,
    {
      ref: p,
      name: e,
      onFocus: r,
      onBlur: n,
      onClose: l,
      onSuccess: i,
      ...a,
      children: ({
        afterLeave: g,
        close: y,
        config: b,
        emit: d,
        getChildModal: E,
        getParentModal: h,
        id: u,
        index: c,
        isOpen: v,
        modalContext: w,
        onTopOfStack: m,
        reload: x,
        setOpen: O,
        shouldRender: N
      }) => /* @__PURE__ */ T(
        Ir,
        {
          appear: !0,
          show: v ?? !1,
          afterLeave: s,
          children: /* @__PURE__ */ he(
            ci,
            {
              as: "div",
              className: "im-dialog relative z-20",
              onClose: () => b.closeExplicitly ? null : y(),
              "data-inertiaui-modal-id": u,
              "data-inertiaui-modal-index": c,
              children: [
                c === 0 ? /* @__PURE__ */ T(
                  Ee,
                  {
                    enter: "transition transform ease-in-out duration-300",
                    enterFrom: "opacity-0",
                    enterTo: "opacity-100",
                    leave: "transition transform ease-in-out duration-300",
                    leaveFrom: "opacity-100",
                    leaveTo: "opacity-0",
                    children: m ? /* @__PURE__ */ T(
                      "div",
                      {
                        className: "im-backdrop fixed inset-0 z-30 bg-black/75",
                        "aria-hidden": "true"
                      }
                    ) : /* @__PURE__ */ T("div", {})
                  }
                ) : null,
                c > 0 && m ? /* @__PURE__ */ T("div", { className: "im-backdrop fixed inset-0 z-30 bg-black/75" }) : null,
                b.slideover ? /* @__PURE__ */ T(
                  fi,
                  {
                    modalContext: w,
                    config: b,
                    children: f({
                      afterLeave: g,
                      close: y,
                      config: b,
                      emit: d,
                      getChildModal: E,
                      getParentModal: h,
                      id: u,
                      index: c,
                      isOpen: v,
                      modalContext: w,
                      onTopOfStack: m,
                      reload: x,
                      setOpen: O,
                      shouldRender: N
                    })
                  }
                ) : /* @__PURE__ */ T(
                  di,
                  {
                    modalContext: w,
                    config: b,
                    children: f({
                      afterLeave: g,
                      close: y,
                      config: b,
                      emit: d,
                      getChildModal: E,
                      getParentModal: h,
                      id: u,
                      index: c,
                      isOpen: v,
                      modalContext: w,
                      onTopOfStack: m,
                      reload: x,
                      setOpen: O,
                      shouldRender: N
                    })
                  }
                )
              ]
            }
          )
        }
      )
    }
  );
});
mi.displayName = "Modal";
const Mi = ({
  href: e,
  method: t = "get",
  data: r = {},
  as: n = "a",
  headers: l = {},
  queryStringArrayFormat: i = "brackets",
  onAfterLeave: s = null,
  onBlur: a = null,
  onClose: o = null,
  onError: f = null,
  onFocus: p = null,
  onStart: g = null,
  onSuccess: y = null,
  navigate: b = null,
  children: d,
  ...E
}) => {
  const [h, u] = F(!1), [c, v] = F(null), { stack: w, visit: m } = Qe(), x = D(() => b ?? Lt("navigate"), [b]), O = {}, N = {};
  Object.keys(E).forEach((k) => {
    Dt.includes(k) || (k.startsWith("on") && typeof E[k] == "function" ? en(k) ? O[k] = E[k] : N[k] = E[k] : O[k] = E[k]);
  });
  const [_, C] = F(!1);
  L(() => {
    c && (c.onTopOfStack && _ ? p == null || p() : !c.onTopOfStack && !_ && (a == null || a()), C(!c.onTopOfStack));
  }, [w]);
  const I = W(() => {
    o == null || o();
  }, [o]), B = W(() => {
    v(null), s == null || s();
  }, [s]), R = W(
    (k) => {
      k == null || k.preventDefault(), !h && (e.startsWith("#") || (u(!0), g == null || g()), m(
        e,
        t,
        r,
        l,
        Qr(Jr(E, Dt)),
        () => I(w.length),
        B,
        i,
        x
      ).then((j) => {
        v(j), j.registerEventListenersFromProps(N), y == null || y();
      }).catch((j) => {
        console.error(j), f == null || f(j);
      }).finally(() => u(!1)));
    },
    [e, t, r, l, i, E, I, B]
  );
  return /* @__PURE__ */ T(
    n,
    {
      ...O,
      href: e,
      onClick: R,
      children: typeof d == "function" ? d({ loading: h }) : d
    }
  );
}, pi = ({ children: e, data: t, params: r, buffer: n, as: l, always: i, fallback: s }) => {
  i = i ?? !1, l = l ?? "div", s = s ?? null;
  const [a, o] = F(!1), f = S(!1), p = S(!1), g = S(null), y = lr(), b = W(() => {
    if (t)
      return {
        only: Array.isArray(t) ? t : [t]
      };
    if (!r)
      throw new Error("You must provide either a `data` or `params` prop.");
    return r;
  }, [r, t]);
  return L(() => {
    if (!g.current)
      return;
    const d = new IntersectionObserver(
      (E) => {
        if (!E[0].isIntersecting || (!i && f.current && d.disconnect(), p.current))
          return;
        f.current = !0, p.current = !0;
        const h = b();
        y.reload({
          ...h,
          onStart: (u) => {
            var c;
            p.current = !0, (c = h.onStart) == null || c.call(h, u);
          },
          onFinish: (u) => {
            var c;
            o(!0), p.current = !1, (c = h.onFinish) == null || c.call(h, u), i || d.disconnect();
          }
        });
      },
      {
        rootMargin: `${n || 0}px`
      }
    );
    return d.observe(g.current), () => {
      d.disconnect();
    };
  }, [g, b, n]), i || !a ? Re(
    l,
    {
      props: null,
      ref: g
    },
    a ? e : s
  ) : a ? e : null;
};
pi.displayName = "InertiaWhenVisible";
const Li = (e) => (t) => (t.default.layout = (r) => Re(e, {}, r), t);
export {
  ln as Deferred,
  ir as HeadlessModal,
  mi as Modal,
  Mi as ModalLink,
  nn as ModalRoot,
  tn as ModalStackProvider,
  pi as WhenVisible,
  Lt as getConfig,
  rn as initFromPageProps,
  $i as putConfig,
  Oi as renderApp,
  Ei as resetConfig,
  Li as setPageLayout,
  lr as useModal,
  rr as useModalIndex,
  Qe as useModalStack
};
