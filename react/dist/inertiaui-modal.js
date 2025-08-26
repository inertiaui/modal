var Rr = Object.defineProperty;
var Dr = (e, t, r) => t in e ? Rr(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var q = (e, t, r) => Dr(e, typeof t != "symbol" ? t + "" : t, r);
import * as Ae from "react";
import $, { createContext as z, useContext as H, useEffect as L, useRef as S, useState as A, createElement as Ne, useMemo as N, forwardRef as Ot, useImperativeHandle as Yt, useLayoutEffect as _r, useCallback as U, Fragment as Y, isValidElement as jr, cloneElement as Wr, useId as Ie, useSyncExternalStore as Ur, useReducer as Hr, createRef as Vr } from "react";
import { jsxs as pe, Fragment as St, jsx as T } from "react/jsx-runtime";
import Xe from "axios";
import { usePage as Br, router as Te } from "@inertiajs/react";
import { mergeDataIntoQueryString as Xr } from "@inertiajs/core";
import { createPortal as zr } from "react-dom";
const Se = {
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
class Gr {
  constructor() {
    this.config = {}, this.reset();
  }
  reset() {
    this.config = JSON.parse(JSON.stringify(Se));
  }
  put(t, r) {
    if (typeof t == "object") {
      this.config = {
        type: t.type ?? Se.type,
        navigate: t.navigate ?? Se.navigate,
        modal: { ...Se.modal, ...t.modal ?? {} },
        slideover: { ...Se.slideover, ...t.slideover ?? {} }
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
const Ye = new Gr(), wi = () => Ye.reset(), yi = (e, t) => Ye.put(e, t), Pt = (e) => Ye.get(e), we = (e, t) => Ye.get(e ? `slideover.${t}` : `modal.${t}`);
function qr(e, t) {
  const r = typeof window < "u" ? window.location.origin : "http://localhost";
  return e = typeof e == "string" ? new URL(e, r) : e, t = typeof t == "string" ? new URL(t, r) : t, `${e.origin}${e.pathname}` == `${t.origin}${t.pathname}`;
}
function ct(e = "inertiaui_modal_") {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `${e}${crypto.randomUUID()}` : `${e}${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
}
function be(e) {
  return typeof e == "string" ? e.toLowerCase() : e;
}
function Kr(e, t, r = !1) {
  return r && (t = t.map(be)), Array.isArray(e) ? e.filter((n) => !t.includes(r ? be(n) : n)) : Object.keys(e).reduce((n, l) => (t.includes(r ? be(l) : l) || (n[l] = e[l]), n), {});
}
function Yr(e, t, r = !1) {
  return r && (t = t.map(be)), Array.isArray(e) ? e.filter((n) => t.includes(r ? be(n) : n)) : Object.keys(e).reduce((n, l) => (t.includes(r ? be(l) : l) && (n[l] = e[l]), n), {});
}
function Zr(e) {
  return Array.isArray(e) ? e.filter((t) => t !== null) : Object.keys(e).reduce((t, r) => (r in e && e[r] !== null && (t[r] = e[r]), t), {});
}
function Pe(e) {
  return e ? (e = e.replace(/_/g, "-"), e = e.replace(/-+/g, "-"), /[A-Z]/.test(e) ? (e = e.replace(/\s+/g, "").replace(/_/g, "").replace(/(?:^|\s|-)+([A-Za-z])/g, (t, r) => r.toUpperCase()), e = e.replace(/(.)(?=[A-Z])/g, "$1-"), e.toLowerCase()) : e) : "";
}
function Jr(e) {
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
const Ze = z(null);
Ze.displayName = "ModalStackContext";
let Zt = null, Jt = null, xe = null, Ue = {}, dt = [], ye = {};
const Qr = ({ children: e }) => {
  const [t, r] = A([]), [n, l] = A({}), i = (h) => {
    r((c) => {
      const d = h([...c]), v = (y) => {
        var m;
        return d.length < 2 ? !0 : ((m = d.map((x) => ({ id: x.id, shouldRender: x.shouldRender })).reverse().find((x) => x.shouldRender)) == null ? void 0 : m.id) === y;
      };
      return d.forEach((y, m) => {
        d[m].onTopOfStack = v(y.id), d[m].getParentModal = () => m < 1 ? null : d.slice(0, m).reverse().find((x) => x.isOpen), d[m].getChildModal = () => m === d.length - 1 ? null : d.slice(m + 1).find((x) => x.isOpen);
      }), d;
    });
  };
  L(() => {
    dt = t;
  }, [t]);
  class s {
    constructor(c, d, v, y, m) {
      q(this, "show", () => {
        i(
          (c) => c.map((d) => (d.id === this.id && !d.isOpen && (d.isOpen = !0, d.shouldRender = !0), d))
        );
      });
      q(this, "setOpen", (c) => {
        c ? this.show() : this.close();
      });
      q(this, "close", () => {
        i((c) => {
          let d = !1;
          const v = c.map((y) => {
            var m;
            return y.id === this.id && y.isOpen && (Object.keys(y.listeners).forEach((x) => {
              y.off(x);
            }), y.isOpen = !1, (m = y.onCloseCallback) == null || m.call(y), d = !0), y;
          });
          return d ? v : c;
        });
      });
      q(this, "afterLeave", () => {
        this.isOpen || i((c) => {
          const d = c.map((v) => {
            var y;
            return v.id === this.id && !v.isOpen && (v.shouldRender = !1, (y = v.afterLeaveCallback) == null || y.call(v), v.afterLeaveCallback = null), v;
          });
          return this.index === 0 ? [] : d;
        });
      });
      q(this, "on", (c, d) => {
        c = Pe(c), this.listeners[c] = this.listeners[c] ?? [], this.listeners[c].push(d);
      });
      q(this, "off", (c, d) => {
        var v;
        c = Pe(c), d ? this.listeners[c] = ((v = this.listeners[c]) == null ? void 0 : v.filter((y) => y !== d)) ?? [] : delete this.listeners[c];
      });
      q(this, "emit", (c, ...d) => {
        var v;
        (v = this.listeners[Pe(c)]) == null || v.forEach((y) => y(...d));
      });
      q(this, "registerEventListenersFromProps", (c) => {
        const d = [];
        return Object.keys(c).filter((v) => v.startsWith("on")).forEach((v) => {
          const y = Pe(v).replace(/^on-/, "");
          this.on(y, c[v]), d.push(() => this.off(y, c[v]));
        }), () => d.forEach((v) => v());
      });
      q(this, "reload", (c = {}) => {
        var m, x;
        let d = Object.keys(this.response.props);
        if (c.only && (d = c.only), c.except && (d = Kr(d, c.except)), !((m = this.response) != null && m.url))
          return;
        const v = (c.method ?? "get").toLowerCase(), y = c.data ?? {};
        (x = c.onStart) == null || x.call(c), Xe({
          url: this.response.url,
          method: v,
          data: v === "get" ? {} : y,
          params: v === "get" ? y : {},
          headers: {
            ...c.headers ?? {},
            Accept: "text/html, application/xhtml+xml",
            "X-Inertia": !0,
            "X-Inertia-Partial-Component": this.response.component,
            "X-Inertia-Version": this.response.version,
            "X-Inertia-Partial-Data": d.join(","),
            "X-InertiaUI-Modal": ct(),
            "X-InertiaUI-Modal-Use-Router": 0,
            "X-InertiaUI-Modal-Base-Url": xe
          }
        }).then((O) => {
          var I;
          this.updateProps(O.data.props), (I = c.onSuccess) == null || I.call(c, O);
        }).catch((O) => {
          var I;
          (I = c.onError) == null || I.call(c, O);
        }).finally(() => {
          var O;
          (O = c.onFinish) == null || O.call(c);
        });
      });
      q(this, "updateProps", (c) => {
        Object.assign(this.props, c), i((d) => d);
      });
      if (this.id = d.id ?? ct(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = c, this.props = d.props, this.response = d, this.config = v ?? {}, this.onCloseCallback = y, this.afterLeaveCallback = m, ye[this.id]) {
        this.config = {
          ...this.config,
          ...ye[this.id].config ?? {}
        };
        const x = ye[this.id].onClose, O = ye[this.id].onAfterLeave;
        x && (this.onCloseCallback = y ? () => {
          y(), x();
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
  const a = (h, c = {}, d = null, v = null) => Jt(h.component).then((y) => u(y, h, c, d, v)), o = (h) => {
    var d, v;
    const c = (v = (d = h.response) == null ? void 0 : d.meta) == null ? void 0 : v.deferredProps;
    c && Object.keys(c).forEach((y) => {
      h.reload({ only: c[y] });
    });
  }, u = (h, c, d, v, y) => {
    const m = new s(h, c, d, v, y);
    return m.index = t.length, i((x) => [...x, m]), o(m), m.show(), m;
  };
  function p(h, c, d, v) {
    if (!n[h])
      throw new Error(`The local modal "${h}" has not been registered.`);
    const y = u(null, {}, c, d, v);
    return y.name = h, n[h].callback(y), y;
  }
  const w = (h, c = {}) => b(
    h,
    c.method ?? "get",
    c.data ?? {},
    c.headers ?? {},
    c.config ?? {},
    c.onClose,
    c.onAfterLeave,
    c.queryStringArrayFormat ?? "brackets",
    c.navigate ?? Pt("navigate"),
    c.onStart,
    c.onSuccess,
    c.onError
  ).then((d) => {
    const v = c.listeners ?? {};
    return Object.keys(v).forEach((y) => {
      const m = Pe(y);
      d.on(m, v[y]);
    }), d;
  }), b = (h, c, d = {}, v = {}, y = {}, m = null, x = null, O = "brackets", I = !1, j = null, C = null, R = null) => {
    const B = ct();
    return new Promise((D, k) => {
      if (h.startsWith("#")) {
        D(p(h.substring(1), y, m, x));
        return;
      }
      const [W, ve] = Xr(c, h || "", d, O);
      let ue = I && t.length === 0;
      if (t.length === 0 && (xe = typeof window < "u" ? window.location.href : ""), v = {
        ...v,
        Accept: "text/html, application/xhtml+xml",
        "X-Requested-With": "XMLHttpRequest",
        "X-Inertia": !0,
        "X-Inertia-Version": Zt,
        "X-InertiaUI-Modal": B,
        "X-InertiaUI-Modal-Use-Router": ue ? 1 : 0,
        "X-InertiaUI-Modal-Base-Url": xe
      }, ue)
        return Ue = {}, ye[B] = {
          config: y,
          onClose: m,
          onAfterLeave: x
        }, Te.visit(W, {
          method: c,
          data: ve,
          headers: v,
          preserveScroll: !0,
          preserveState: !0,
          onError(...F) {
            R == null || R(...F), k(...F);
          },
          onStart(...F) {
            j == null || j(...F);
          },
          onSuccess(...F) {
            C == null || C(...F);
          },
          onBefore: () => {
            Ue[B] = D;
          }
        });
      j == null || j(), Xe({
        url: W,
        method: c,
        data: ve,
        headers: v
      }).then((F) => {
        C == null || C(F), D(a(F.data, y, m, x));
      }).catch((...F) => {
        R == null || R(...F), k(...F);
      });
    });
  }, E = {
    stack: t,
    localModals: n,
    push: u,
    pushFromResponseData: a,
    length: () => dt.length,
    closeAll: () => {
      dt.reverse().forEach((h) => h.close());
    },
    reset: () => i(() => []),
    visit: b,
    visitModal: w,
    registerLocalModal: (h, c) => {
      l((d) => ({
        ...d,
        [h]: { name: h, callback: c }
      }));
    },
    removeLocalModal: (h) => {
      l((c) => {
        const d = { ...c };
        return delete d[h], d;
      });
    },
    onModalOnBase: (h) => {
      const c = Ue[h.id];
      c && (c(h), delete Ue[h.id]);
    }
  };
  return /* @__PURE__ */ T(Ze.Provider, { value: E, children: e });
}, Je = () => {
  const e = H(Ze);
  if (e === null)
    throw new Error("useModalStack must be used within a ModalStackProvider");
  return e;
}, Nt = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], en = (e) => {
  e.initialPage && (Zt = e.initialPage.version), e.resolveComponent && (Jt = e.resolveComponent);
}, bi = (e, t) => (en(t), /* @__PURE__ */ T(Qr, { children: /* @__PURE__ */ T(e, { ...t, children: ({ Component: n, props: l, key: i }) => /* @__PURE__ */ pe(St, { children: [
  (() => {
    const a = Ne(n, { key: i, ...l });
    return typeof n.layout == "function" ? n.layout(a) : Array.isArray(n.layout) ? n.layout.concat(a).reverse().reduce((u, p) => Ne(p, l, u)) : a;
  })(),
  /* @__PURE__ */ T(tn, {})
] }) }) })), tn = ({ children: e }) => {
  var o, u;
  const t = H(Ze), r = Br();
  let n = !1, l = !1, i = !!((o = r.props) != null && o._inertiaui_modal);
  L(() => Te.on("start", () => n = !0), []), L(() => Te.on("finish", () => n = !1), []), L(
    () => Te.on("navigate", function(p) {
      const w = p.detail.page.props._inertiaui_modal;
      if (!w) {
        l && t.closeAll(), xe = null, i = !1;
        return;
      }
      l = w, xe = w.baseUrl, t.pushFromResponseData(w, {}, () => {
        if (!w.baseUrl) {
          console.error("No base url in modal response data so cannot navigate back");
          return;
        }
        !n && typeof window < "u" && window.location.href !== w.baseUrl && Te.visit(w.baseUrl, {
          preserveScroll: !0,
          preserveState: !0
        });
      }).then(t.onModalOnBase);
    }),
    []
  );
  const s = (p) => {
    var w;
    return p.headers["X-InertiaUI-Modal-Base-Url"] = xe ?? (i ? (w = r.props._inertiaui_modal) == null ? void 0 : w.baseUrl : null), p;
  };
  L(() => (Xe.interceptors.request.use(s), () => Xe.interceptors.request.eject(s)), []);
  const a = S();
  return L(() => {
    var b, g;
    const p = (b = r.props) == null ? void 0 : b._inertiaui_modal, w = a.current;
    a.current = p, p && w && p.component === w.component && qr(p.url, w.url) && ((g = t.stack[0]) == null || g.updateProps(p.props ?? {}));
  }, [(u = r.props) == null ? void 0 : u._inertiaui_modal]), /* @__PURE__ */ pe(St, { children: [
    e,
    t.stack.length > 0 && /* @__PURE__ */ T(er, { index: 0 })
  ] });
}, Tt = $.createContext(null);
Tt.displayName = "ModalIndexContext";
const Qt = () => {
  const e = $.useContext(Tt);
  if (e === void 0)
    throw new Error("useModalIndex must be used within a ModalIndexProvider");
  return e;
}, er = ({ index: e }) => {
  const { stack: t } = Je(), r = N(() => t[e], [t, e]);
  return (r == null ? void 0 : r.component) && /* @__PURE__ */ T(Tt.Provider, { value: e, children: /* @__PURE__ */ T(
    r.component,
    {
      ...r.props,
      onModalEvent: (...n) => r.emit(...n)
    }
  ) });
};
function tr() {
  return Je().stack[Qt()] ?? null;
}
const rn = ({ children: e, data: t, fallback: r }) => {
  if (!t)
    throw new Error("`<Deferred>` requires a `data` prop to be a string or array of strings");
  const [n, l] = A(!1), i = Array.isArray(t) ? t : [t], s = tr().props;
  return L(() => {
    l(i.every((a) => s[a] !== void 0));
  }, [s, i]), n ? e : r;
};
rn.displayName = "InertiaModalDeferred";
const rr = Ot(({ name: e, children: t, onFocus: r = null, onBlur: n = null, onClose: l = null, onSuccess: i = null, ...s }, a) => {
  const o = Qt(), { stack: u, registerLocalModal: p, removeLocalModal: w } = Je(), [b, g] = A(null), f = N(() => e ? b : u[o], [e, b, o, u]), E = N(() => {
    var m;
    return (m = u.find((x) => x.shouldRender && x.index > (f == null ? void 0 : f.index))) == null ? void 0 : m.index;
  }, [o, u]), h = N(() => (f == null ? void 0 : f.config.slideover) ?? s.slideover ?? Pt("type") === "slideover", [s.slideover]), c = N(
    () => ({
      slideover: h,
      closeButton: s.closeButton ?? we(h, "closeButton"),
      closeExplicitly: s.closeExplicitly ?? we(h, "closeExplicitly"),
      maxWidth: s.maxWidth ?? we(h, "maxWidth"),
      paddingClasses: s.paddingClasses ?? we(h, "paddingClasses"),
      panelClasses: s.panelClasses ?? we(h, "panelClasses"),
      position: s.position ?? we(h, "position"),
      ...f == null ? void 0 : f.config
    }),
    [s, f == null ? void 0 : f.config]
  );
  L(() => {
    if (e) {
      let m = null;
      return p(e, (x) => {
        m = x.registerEventListenersFromProps(s), g(x);
      }), () => {
        m == null || m(), m = null, w(e);
      };
    }
    return f.registerEventListenersFromProps(s);
  }, [e]);
  const d = S(f);
  L(() => {
    d.current = f;
  }, [f]), L(() => {
    f !== null && (f.isOpen ? i == null || i() : l == null || l());
  }, [f == null ? void 0 : f.isOpen]);
  const [v, y] = A(!1);
  return L(() => {
    v && f !== null && f.isOpen && (f.onTopOfStack ? r == null || r() : n == null || n()), y(!0);
  }, [f == null ? void 0 : f.onTopOfStack]), Yt(
    a,
    () => ({
      afterLeave: () => {
        var m;
        return (m = d.current) == null ? void 0 : m.afterLeave();
      },
      close: () => {
        var m;
        return (m = d.current) == null ? void 0 : m.close();
      },
      emit: (...m) => {
        var x;
        return (x = d.current) == null ? void 0 : x.emit(...m);
      },
      getChildModal: () => {
        var m;
        return (m = d.current) == null ? void 0 : m.getChildModal();
      },
      getParentModal: () => {
        var m;
        return (m = d.current) == null ? void 0 : m.getParentModal();
      },
      reload: (...m) => {
        var x;
        return (x = d.current) == null ? void 0 : x.reload(...m);
      },
      setOpen: () => {
        var m;
        return (m = d.current) == null ? void 0 : m.setOpen();
      },
      get id() {
        var m;
        return (m = d.current) == null ? void 0 : m.id;
      },
      get index() {
        var m;
        return (m = d.current) == null ? void 0 : m.index;
      },
      get isOpen() {
        var m;
        return (m = d.current) == null ? void 0 : m.isOpen;
      },
      get config() {
        var m;
        return (m = d.current) == null ? void 0 : m.config;
      },
      get modalContext() {
        return d.current;
      },
      get onTopOfStack() {
        var m;
        return (m = d.current) == null ? void 0 : m.onTopOfStack;
      },
      get shouldRender() {
        var m;
        return (m = d.current) == null ? void 0 : m.shouldRender;
      }
    }),
    [f]
  ), (f == null ? void 0 : f.shouldRender) && /* @__PURE__ */ pe(St, { children: [
    typeof t == "function" ? t({
      afterLeave: f.afterLeave,
      close: f.close,
      config: c,
      emit: f.emit,
      getChildModal: f.getChildModal,
      getParentModal: f.getParentModal,
      id: f.id,
      index: f.index,
      isOpen: f.isOpen,
      modalContext: f,
      onTopOfStack: f.onTopOfStack,
      reload: f.reload,
      setOpen: f.setOpen,
      shouldRender: f.shouldRender
    }) : t,
    E && /* @__PURE__ */ T(er, { index: E })
  ] });
});
rr.displayName = "HeadlessModal";
function nr(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var l = e.length;
    for (t = 0; t < l; t++) e[t] && (r = nr(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function ze() {
  for (var e, t, r = 0, n = "", l = arguments.length; r < l; r++) (e = arguments[r]) && (t = nr(e)) && (n && (n += " "), n += t);
  return n;
}
var nn = Object.defineProperty, ln = (e, t, r) => t in e ? nn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, ft = (e, t, r) => (ln(e, typeof t != "symbol" ? t + "" : t, r), r);
let on = class {
  constructor() {
    ft(this, "current", this.detect()), ft(this, "handoffState", "pending"), ft(this, "currentId", 0);
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
}, J = new on();
function Qe(e) {
  var t, r;
  return J.isServer ? null : e ? "ownerDocument" in e ? e.ownerDocument : "current" in e ? (r = (t = e.current) == null ? void 0 : t.ownerDocument) != null ? r : document : null : document;
}
function et(e) {
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
    return et(() => {
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
function Mt() {
  let [e] = A(ne);
  return L(() => () => e.dispose(), [e]), e;
}
let _ = (e, t) => {
  J.isServer ? L(e, t) : _r(e, t);
};
function he(e) {
  let t = S(e);
  return _(() => {
    t.current = e;
  }, [e]), t;
}
let M = function(e) {
  let t = he(e);
  return $.useCallback((...r) => t.current(...r), [t]);
}, an = z(void 0);
function sn() {
  return H(an);
}
function wt(...e) {
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
var Ge = ((e) => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(Ge || {}), oe = ((e) => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(oe || {});
function G() {
  let e = cn();
  return U((t) => un({ mergeRefs: e, ...t }), [e]);
}
function un({ ourProps: e, theirProps: t, slot: r, defaultTag: n, features: l, visible: i = !0, name: s, mergeRefs: a }) {
  a = a ?? dn;
  let o = lr(t, e);
  if (i) return He(o, r, n, s, a);
  let u = l ?? 0;
  if (u & 2) {
    let { static: p = !1, ...w } = o;
    if (p) return He(w, r, n, s, a);
  }
  if (u & 1) {
    let { unmount: p = !0, ...w } = o;
    return re(p ? 0 : 1, { 0() {
      return null;
    }, 1() {
      return He({ ...w, hidden: !0, style: { display: "none" } }, r, n, s, a);
    } });
  }
  return He(o, r, n, s, a);
}
function He(e, t = {}, r, n, l) {
  let { as: i = r, children: s, refName: a = "ref", ...o } = mt(e, ["unmount", "static"]), u = e.ref !== void 0 ? { [a]: e.ref } : {}, p = typeof s == "function" ? s(t) : s;
  "className" in o && o.className && typeof o.className == "function" && (o.className = o.className(t)), o["aria-labelledby"] && o["aria-labelledby"] === o.id && (o["aria-labelledby"] = void 0);
  let w = {};
  if (t) {
    let b = !1, g = [];
    for (let [f, E] of Object.entries(t)) typeof E == "boolean" && (b = !0), E === !0 && g.push(f.replace(/([A-Z])/g, (h) => `-${h.toLowerCase()}`));
    if (b) {
      w["data-headlessui-state"] = g.join(" ");
      for (let f of g) w[`data-${f}`] = "";
    }
  }
  if (i === Y && (Object.keys(ce(o)).length > 0 || Object.keys(ce(w)).length > 0)) if (!jr(p) || Array.isArray(p) && p.length > 1) {
    if (Object.keys(ce(o)).length > 0) throw new Error(['Passing props on "Fragment"!', "", `The current component <${n} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(ce(o)).concat(Object.keys(ce(w))).map((b) => `  - ${b}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((b) => `  - ${b}`).join(`
`)].join(`
`));
  } else {
    let b = p.props, g = b == null ? void 0 : b.className, f = typeof g == "function" ? (...c) => wt(g(...c), o.className) : wt(g, o.className), E = f ? { className: f } : {}, h = lr(p.props, ce(mt(o, ["ref"])));
    for (let c in w) c in h && delete w[c];
    return Wr(p, Object.assign({}, h, w, u, { ref: l(fn(p), u.ref) }, E));
  }
  return Ne(i, Object.assign({}, mt(o, ["ref"]), i !== Y && u, i !== Y && w), p);
}
function cn() {
  let e = S([]), t = U((r) => {
    for (let n of e.current) n != null && (typeof n == "function" ? n(r) : n.current = r);
  }, []);
  return (...r) => {
    if (!r.every((n) => n == null)) return e.current = r, t;
  };
}
function dn(...e) {
  return e.every((t) => t == null) ? void 0 : (t) => {
    for (let r of e) r != null && (typeof r == "function" ? r(t) : r.current = t);
  };
}
function lr(...e) {
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
  return Object.assign(Ot(e), { displayName: (t = e.displayName) != null ? t : e.name });
}
function ce(e) {
  let t = Object.assign({}, e);
  for (let r in t) t[r] === void 0 && delete t[r];
  return t;
}
function mt(e, t = []) {
  let r = Object.assign({}, e);
  for (let n of t) n in r && delete r[n];
  return r;
}
function fn(e) {
  return $.version.split(".")[0] >= "19" ? e.props.ref : e.ref;
}
let mn = "span";
var qe = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(qe || {});
function pn(e, t) {
  var r;
  let { features: n = 1, ...l } = e, i = { ref: t, "aria-hidden": (n & 2) === 2 ? !0 : (r = l["aria-hidden"]) != null ? r : void 0, hidden: (n & 4) === 4 ? !0 : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(n & 4) === 4 && (n & 2) !== 2 && { display: "none" } } };
  return G()({ ourProps: i, theirProps: l, slot: {}, defaultTag: mn, name: "Hidden" });
}
let yt = V(pn);
function ir(e) {
  return typeof e != "object" || e === null ? !1 : "nodeType" in e;
}
function se(e) {
  return ir(e) && "tagName" in e;
}
function me(e) {
  return se(e) && "accessKey" in e;
}
function ae(e) {
  return se(e) && "tabIndex" in e;
}
function hn(e) {
  return se(e) && "style" in e;
}
function vn(e) {
  return me(e) && e.nodeName === "IFRAME";
}
function gn(e) {
  return me(e) && e.nodeName === "INPUT";
}
let or = Symbol();
function wn(e, t = !0) {
  return Object.assign(e, { [or]: t });
}
function Q(...e) {
  let t = S(e);
  L(() => {
    t.current = e;
  }, [e]);
  let r = M((n) => {
    for (let l of t.current) l != null && (typeof l == "function" ? l(n) : l.current = n);
  });
  return e.every((n) => n == null || (n == null ? void 0 : n[or])) ? void 0 : r;
}
let Lt = z(null);
Lt.displayName = "DescriptionContext";
function ar() {
  let e = H(Lt);
  if (e === null) {
    let t = new Error("You used a <Description /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(t, ar), t;
  }
  return e;
}
function yn() {
  let [e, t] = A([]);
  return [e.length > 0 ? e.join(" ") : void 0, N(() => function(r) {
    let n = M((i) => (t((s) => [...s, i]), () => t((s) => {
      let a = s.slice(), o = a.indexOf(i);
      return o !== -1 && a.splice(o, 1), a;
    }))), l = N(() => ({ register: n, slot: r.slot, name: r.name, props: r.props, value: r.value }), [n, r.slot, r.name, r.props, r.value]);
    return $.createElement(Lt.Provider, { value: l }, r.children);
  }, [t])];
}
let bn = "p";
function xn(e, t) {
  let r = Ie(), n = sn(), { id: l = `headlessui-description-${r}`, ...i } = e, s = ar(), a = Q(t);
  _(() => s.register(l), [l, s.register]);
  let o = n || !1, u = N(() => ({ ...s.slot, disabled: o }), [s.slot, o]), p = { ref: a, ...s.props, id: l };
  return G()({ ourProps: p, theirProps: i, slot: u, defaultTag: bn, name: s.name || "Description" });
}
let En = V(xn), $n = Object.assign(En, {});
var sr = ((e) => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(sr || {});
let On = z(() => {
});
function Sn({ value: e, children: t }) {
  return $.createElement(On.Provider, { value: e }, t);
}
let ur = class extends Map {
  constructor(t) {
    super(), this.factory = t;
  }
  get(t) {
    let r = super.get(t);
    return r === void 0 && (r = this.factory(t), this.set(t, r)), r;
  }
};
var Pn = Object.defineProperty, Tn = (e, t, r) => t in e ? Pn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Mn = (e, t, r) => (Tn(e, t + "", r), r), cr = (e, t, r) => {
  if (!t.has(e)) throw TypeError("Cannot " + r);
}, X = (e, t, r) => (cr(e, t, "read from private field"), r ? r.call(e) : t.get(e)), pt = (e, t, r) => {
  if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, r);
}, It = (e, t, r, n) => (cr(e, t, "write to private field"), t.set(e, r), r), Z, Me, Le;
let Ln = class {
  constructor(t) {
    pt(this, Z, {}), pt(this, Me, new ur(() => /* @__PURE__ */ new Set())), pt(this, Le, /* @__PURE__ */ new Set()), Mn(this, "disposables", ne()), It(this, Z, t), J.isServer && this.disposables.microTask(() => {
      this.dispose();
    });
  }
  dispose() {
    this.disposables.dispose();
  }
  get state() {
    return X(this, Z);
  }
  subscribe(t, r) {
    if (J.isServer) return () => {
    };
    let n = { selector: t, callback: r, current: t(X(this, Z)) };
    return X(this, Le).add(n), this.disposables.add(() => {
      X(this, Le).delete(n);
    });
  }
  on(t, r) {
    return J.isServer ? () => {
    } : (X(this, Me).get(t).add(r), this.disposables.add(() => {
      X(this, Me).get(t).delete(r);
    }));
  }
  send(t) {
    let r = this.reduce(X(this, Z), t);
    if (r !== X(this, Z)) {
      It(this, Z, r);
      for (let n of X(this, Le)) {
        let l = n.selector(X(this, Z));
        dr(n.current, l) || (n.current = l, n.callback(l));
      }
      for (let n of X(this, Me).get(t.type)) n(X(this, Z), t);
    }
  }
};
Z = /* @__PURE__ */ new WeakMap(), Me = /* @__PURE__ */ new WeakMap(), Le = /* @__PURE__ */ new WeakMap();
function dr(e, t) {
  return Object.is(e, t) ? !0 : typeof e != "object" || e === null || typeof t != "object" || t === null ? !1 : Array.isArray(e) && Array.isArray(t) ? e.length !== t.length ? !1 : ht(e[Symbol.iterator](), t[Symbol.iterator]()) : e instanceof Map && t instanceof Map || e instanceof Set && t instanceof Set ? e.size !== t.size ? !1 : ht(e.entries(), t.entries()) : Rt(e) && Rt(t) ? ht(Object.entries(e)[Symbol.iterator](), Object.entries(t)[Symbol.iterator]()) : !1;
}
function ht(e, t) {
  do {
    let r = e.next(), n = t.next();
    if (r.done && n.done) return !0;
    if (r.done || n.done || !Object.is(r.value, n.value)) return !1;
  } while (!0);
}
function Rt(e) {
  if (Object.prototype.toString.call(e) !== "[object Object]") return !1;
  let t = Object.getPrototypeOf(e);
  return t === null || Object.getPrototypeOf(t) === null;
}
var kn = Object.defineProperty, An = (e, t, r) => t in e ? kn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Dt = (e, t, r) => (An(e, typeof t != "symbol" ? t + "" : t, r), r), Cn = ((e) => (e[e.Push = 0] = "Push", e[e.Pop = 1] = "Pop", e))(Cn || {});
let Fn = { 0(e, t) {
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
} }, Nn = class fr extends Ln {
  constructor() {
    super(...arguments), Dt(this, "actions", { push: (t) => this.send({ type: 0, id: t }), pop: (t) => this.send({ type: 1, id: t }) }), Dt(this, "selectors", { isTop: (t, r) => t.stack[t.stack.length - 1] === r, inStack: (t, r) => t.stack.includes(r) });
  }
  static new() {
    return new fr({ stack: [] });
  }
  reduce(t, r) {
    return re(r.type, Fn, t, r);
  }
};
const mr = new ur(() => Nn.new());
var Ve = { exports: {} }, vt = {};
/**
 * @license React
 * use-sync-external-store-with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _t;
function In() {
  if (_t) return vt;
  _t = 1;
  var e = $;
  function t(o, u) {
    return o === u && (o !== 0 || 1 / o === 1 / u) || o !== o && u !== u;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e.useSyncExternalStore, l = e.useRef, i = e.useEffect, s = e.useMemo, a = e.useDebugValue;
  return vt.useSyncExternalStoreWithSelector = function(o, u, p, w, b) {
    var g = l(null);
    if (g.current === null) {
      var f = { hasValue: !1, value: null };
      g.current = f;
    } else f = g.current;
    g = s(
      function() {
        function h(m) {
          if (!c) {
            if (c = !0, d = m, m = w(m), b !== void 0 && f.hasValue) {
              var x = f.value;
              if (b(x, m))
                return v = x;
            }
            return v = m;
          }
          if (x = v, r(d, m)) return x;
          var O = w(m);
          return b !== void 0 && b(x, O) ? (d = m, x) : (d = m, v = O);
        }
        var c = !1, d, v, y = p === void 0 ? null : p;
        return [
          function() {
            return h(u());
          },
          y === null ? void 0 : function() {
            return h(y());
          }
        ];
      },
      [u, p, w, b]
    );
    var E = n(o, g[0], g[1]);
    return i(
      function() {
        f.hasValue = !0, f.value = E;
      },
      [E]
    ), a(E), E;
  }, vt;
}
var gt = {};
/**
 * @license React
 * use-sync-external-store-with-selector.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var jt;
function Rn() {
  return jt || (jt = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(o, u) {
      return o === u && (o !== 0 || 1 / o === 1 / u) || o !== o && u !== u;
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var t = $, r = typeof Object.is == "function" ? Object.is : e, n = t.useSyncExternalStore, l = t.useRef, i = t.useEffect, s = t.useMemo, a = t.useDebugValue;
    gt.useSyncExternalStoreWithSelector = function(o, u, p, w, b) {
      var g = l(null);
      if (g.current === null) {
        var f = { hasValue: !1, value: null };
        g.current = f;
      } else f = g.current;
      g = s(
        function() {
          function h(m) {
            if (!c) {
              if (c = !0, d = m, m = w(m), b !== void 0 && f.hasValue) {
                var x = f.value;
                if (b(x, m))
                  return v = x;
              }
              return v = m;
            }
            if (x = v, r(d, m))
              return x;
            var O = w(m);
            return b !== void 0 && b(x, O) ? (d = m, x) : (d = m, v = O);
          }
          var c = !1, d, v, y = p === void 0 ? null : p;
          return [
            function() {
              return h(u());
            },
            y === null ? void 0 : function() {
              return h(y());
            }
          ];
        },
        [u, p, w, b]
      );
      var E = n(o, g[0], g[1]);
      return i(
        function() {
          f.hasValue = !0, f.value = E;
        },
        [E]
      ), a(E), E;
    }, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), gt;
}
var Wt;
function Dn() {
  return Wt || (Wt = 1, process.env.NODE_ENV === "production" ? Ve.exports = In() : Ve.exports = Rn()), Ve.exports;
}
var _n = Dn();
function pr(e, t, r = dr) {
  return _n.useSyncExternalStoreWithSelector(M((n) => e.subscribe(jn, n)), M(() => e.state), M(() => e.state), M(t), r);
}
function jn(e) {
  return e;
}
function Re(e, t) {
  let r = Ie(), n = mr.get(t), [l, i] = pr(n, U((s) => [n.selectors.isTop(s, r), n.selectors.inStack(s, r)], [n, r]));
  return _(() => {
    if (e) return n.actions.push(r), () => n.actions.pop(r);
  }, [n, e, r]), e ? i ? l : !0 : !1;
}
let bt = /* @__PURE__ */ new Map(), Ce = /* @__PURE__ */ new Map();
function Ut(e) {
  var t;
  let r = (t = Ce.get(e)) != null ? t : 0;
  return Ce.set(e, r + 1), r !== 0 ? () => Ht(e) : (bt.set(e, { "aria-hidden": e.getAttribute("aria-hidden"), inert: e.inert }), e.setAttribute("aria-hidden", "true"), e.inert = !0, () => Ht(e));
}
function Ht(e) {
  var t;
  let r = (t = Ce.get(e)) != null ? t : 1;
  if (r === 1 ? Ce.delete(e) : Ce.set(e, r - 1), r !== 1) return;
  let n = bt.get(e);
  n && (n["aria-hidden"] === null ? e.removeAttribute("aria-hidden") : e.setAttribute("aria-hidden", n["aria-hidden"]), e.inert = n.inert, bt.delete(e));
}
function Wn(e, { allowed: t, disallowed: r } = {}) {
  let n = Re(e, "inert-others");
  _(() => {
    var l, i;
    if (!n) return;
    let s = ne();
    for (let o of (l = r == null ? void 0 : r()) != null ? l : []) o && s.add(Ut(o));
    let a = (i = t == null ? void 0 : t()) != null ? i : [];
    for (let o of a) {
      if (!o) continue;
      let u = Qe(o);
      if (!u) continue;
      let p = o.parentElement;
      for (; p && p !== u.body; ) {
        for (let w of p.children) a.some((b) => w.contains(b)) || s.add(Ut(w));
        p = p.parentElement;
      }
    }
    return s.dispose;
  }, [n, t, r]);
}
function Un(e, t, r) {
  let n = he((l) => {
    let i = l.getBoundingClientRect();
    i.x === 0 && i.y === 0 && i.width === 0 && i.height === 0 && r();
  });
  L(() => {
    if (!e) return;
    let l = t === null ? null : me(t) ? t : t.current;
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
let Ke = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e) => `${e}:not([tabindex='-1'])`).join(","), Hn = ["[data-autofocus]"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var ee = ((e) => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e[e.AutoFocus = 64] = "AutoFocus", e))(ee || {}), xt = ((e) => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(xt || {}), Vn = ((e) => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(Vn || {});
function Bn(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(Ke)).sort((t, r) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (r.tabIndex || Number.MAX_SAFE_INTEGER)));
}
function Xn(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(Hn)).sort((t, r) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (r.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var hr = ((e) => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(hr || {});
function zn(e, t = 0) {
  var r;
  return e === ((r = Qe(e)) == null ? void 0 : r.body) ? !1 : re(t, { 0() {
    return e.matches(Ke);
  }, 1() {
    let n = e;
    for (; n !== null; ) {
      if (n.matches(Ke)) return !0;
      n = n.parentElement;
    }
    return !1;
  } });
}
var Gn = ((e) => (e[e.Keyboard = 0] = "Keyboard", e[e.Mouse = 1] = "Mouse", e))(Gn || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (e) => {
  e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (e) => {
  e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
function te(e) {
  e == null || e.focus({ preventScroll: !0 });
}
let qn = ["textarea", "input"].join(",");
function Kn(e) {
  var t, r;
  return (r = (t = e == null ? void 0 : e.matches) == null ? void 0 : t.call(e, qn)) != null ? r : !1;
}
function Yn(e, t = (r) => r) {
  return e.slice().sort((r, n) => {
    let l = t(r), i = t(n);
    if (l === null || i === null) return 0;
    let s = l.compareDocumentPosition(i);
    return s & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : s & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function Fe(e, t, { sorted: r = !0, relativeTo: n = null, skipElements: l = [] } = {}) {
  let i = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : document : e.ownerDocument, s = Array.isArray(e) ? r ? Yn(e) : e : t & 64 ? Xn(e) : Bn(e);
  l.length > 0 && s.length > 1 && (s = s.filter((g) => !l.some((f) => f != null && "current" in f ? (f == null ? void 0 : f.current) === g : f === g))), n = n ?? i.activeElement;
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
  })(), u = t & 32 ? { preventScroll: !0 } : {}, p = 0, w = s.length, b;
  do {
    if (p >= w || p + w <= 0) return 0;
    let g = o + p;
    if (t & 16) g = (g + w) % w;
    else {
      if (g < 0) return 3;
      if (g >= w) return 1;
    }
    b = s[g], b == null || b.focus(u), p += a;
  } while (b !== i.activeElement);
  return t & 6 && Kn(b) && b.select(), 2;
}
function vr() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function Zn() {
  return /Android/gi.test(window.navigator.userAgent);
}
function Vt() {
  return vr() || Zn();
}
function Be(e, t, r, n) {
  let l = he(r);
  L(() => {
    if (!e) return;
    function i(s) {
      l.current(s);
    }
    return document.addEventListener(t, i, n), () => document.removeEventListener(t, i, n);
  }, [e, t, n]);
}
function gr(e, t, r, n) {
  let l = he(r);
  L(() => {
    if (!e) return;
    function i(s) {
      l.current(s);
    }
    return window.addEventListener(t, i, n), () => window.removeEventListener(t, i, n);
  }, [e, t, n]);
}
const Bt = 30;
function Jn(e, t, r) {
  let n = he(r), l = U(function(a, o) {
    if (a.defaultPrevented) return;
    let u = o(a);
    if (u === null || !u.getRootNode().contains(u) || !u.isConnected) return;
    let p = (function w(b) {
      return typeof b == "function" ? w(b()) : Array.isArray(b) || b instanceof Set ? b : [b];
    })(t);
    for (let w of p) if (w !== null && (w.contains(u) || a.composed && a.composedPath().includes(w))) return;
    return !zn(u, hr.Loose) && u.tabIndex !== -1 && a.preventDefault(), n.current(a, u);
  }, [n, t]), i = S(null);
  Be(e, "pointerdown", (a) => {
    var o, u;
    Vt() || (i.current = ((u = (o = a.composedPath) == null ? void 0 : o.call(a)) == null ? void 0 : u[0]) || a.target);
  }, !0), Be(e, "pointerup", (a) => {
    if (Vt() || !i.current) return;
    let o = i.current;
    return i.current = null, l(a, () => o);
  }, !0);
  let s = S({ x: 0, y: 0 });
  Be(e, "touchstart", (a) => {
    s.current.x = a.touches[0].clientX, s.current.y = a.touches[0].clientY;
  }, !0), Be(e, "touchend", (a) => {
    let o = { x: a.changedTouches[0].clientX, y: a.changedTouches[0].clientY };
    if (!(Math.abs(o.x - s.current.x) >= Bt || Math.abs(o.y - s.current.y) >= Bt)) return l(a, () => ae(a.target) ? a.target : null);
  }, !0), gr(e, "blur", (a) => l(a, () => vn(window.document.activeElement) ? window.document.activeElement : null), !0);
}
function tt(...e) {
  return N(() => Qe(...e), [...e]);
}
function wr(e, t, r, n) {
  let l = he(r);
  L(() => {
    e = e ?? window;
    function i(s) {
      l.current(s);
    }
    return e.addEventListener(t, i, n), () => e.removeEventListener(t, i, n);
  }, [e, t, n]);
}
function Qn(e) {
  return Ur(e.subscribe, e.getSnapshot, e.getSnapshot);
}
function el(e, t) {
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
function tl() {
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
function rl() {
  return vr() ? { before({ doc: e, d: t, meta: r }) {
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
          let { hash: u } = new URL(o.href), p = e.querySelector(u);
          ae(p) && !n(p) && (s = p);
        } catch {
        }
      }, !0), t.addEventListener(e, "touchstart", (a) => {
        if (ae(a.target) && hn(a.target)) if (n(a.target)) {
          let o = a.target;
          for (; o.parentElement && n(o.parentElement); ) o = o.parentElement;
          t.style(o, "overscrollBehavior", "contain");
        } else t.style(a.target, "touchAction", "none");
      }), t.addEventListener(e, "touchmove", (a) => {
        if (ae(a.target)) {
          if (gn(a.target)) return;
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
function nl() {
  return { before({ doc: e, d: t }) {
    t.style(e.documentElement, "overflow", "hidden");
  } };
}
function ll(e) {
  let t = {};
  for (let r of e) Object.assign(t, r(t));
  return t;
}
let fe = el(() => /* @__PURE__ */ new Map(), { PUSH(e, t) {
  var r;
  let n = (r = this.get(e)) != null ? r : { doc: e, count: 0, d: ne(), meta: /* @__PURE__ */ new Set() };
  return n.count++, n.meta.add(t), this.set(e, n), this;
}, POP(e, t) {
  let r = this.get(e);
  return r && (r.count--, r.meta.delete(t)), this;
}, SCROLL_PREVENT({ doc: e, d: t, meta: r }) {
  let n = { doc: e, d: t, meta: ll(r) }, l = [rl(), tl(), nl()];
  l.forEach(({ before: i }) => i == null ? void 0 : i(n)), l.forEach(({ after: i }) => i == null ? void 0 : i(n));
}, SCROLL_ALLOW({ d: e }) {
  e.dispose();
}, TEARDOWN({ doc: e }) {
  this.delete(e);
} });
fe.subscribe(() => {
  let e = fe.getSnapshot(), t = /* @__PURE__ */ new Map();
  for (let [r] of e) t.set(r, r.documentElement.style.overflow);
  for (let r of e.values()) {
    let n = t.get(r.doc) === "hidden", l = r.count !== 0;
    (l && !n || !l && n) && fe.dispatch(r.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", r), r.count === 0 && fe.dispatch("TEARDOWN", r);
  }
});
function il(e, t, r = () => ({ containers: [] })) {
  let n = Qn(fe), l = t ? n.get(t) : void 0, i = l ? l.count > 0 : !1;
  return _(() => {
    if (!(!t || !e)) return fe.dispatch("PUSH", t, r), () => fe.dispatch("POP", t, r);
  }, [e, t]), i;
}
function ol(e, t, r = () => [document.body]) {
  let n = Re(e, "scroll-lock");
  il(n, t, (l) => {
    var i;
    return { containers: [...(i = l.containers) != null ? i : [], r] };
  });
}
function al(e = 0) {
  let [t, r] = A(e), n = U((o) => r(o), [t]), l = U((o) => r((u) => u | o), [t]), i = U((o) => (t & o) === o, [t]), s = U((o) => r((u) => u & ~o), [r]), a = U((o) => r((u) => u ^ o), [r]);
  return { flags: t, setFlag: n, addFlag: l, hasFlag: i, removeFlag: s, toggleFlag: a };
}
var Xt, zt;
typeof process < "u" && typeof globalThis < "u" && typeof Element < "u" && ((Xt = process == null ? void 0 : process.env) == null ? void 0 : Xt.NODE_ENV) === "test" && typeof ((zt = Element == null ? void 0 : Element.prototype) == null ? void 0 : zt.getAnimations) > "u" && (Element.prototype.getAnimations = function() {
  return console.warn(["Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.", "Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.", "", "Example usage:", "```js", "import { mockAnimationsApi } from 'jsdom-testing-mocks'", "mockAnimationsApi()", "```"].join(`
`)), [];
});
var sl = ((e) => (e[e.None = 0] = "None", e[e.Closed = 1] = "Closed", e[e.Enter = 2] = "Enter", e[e.Leave = 4] = "Leave", e))(sl || {});
function ul(e) {
  let t = {};
  for (let r in e) e[r] === !0 && (t[`data-${r}`] = "");
  return t;
}
function cl(e, t, r, n) {
  let [l, i] = A(r), { hasFlag: s, addFlag: a, removeFlag: o } = al(e && l ? 3 : 0), u = S(!1), p = S(!1), w = Mt();
  return _(() => {
    var b;
    if (e) {
      if (r && i(!0), !t) {
        r && a(3);
        return;
      }
      return (b = n == null ? void 0 : n.start) == null || b.call(n, r), dl(t, { inFlight: u, prepare() {
        p.current ? p.current = !1 : p.current = u.current, u.current = !0, !p.current && (r ? (a(3), o(4)) : (a(4), o(2)));
      }, run() {
        p.current ? r ? (o(3), a(4)) : (o(4), a(3)) : r ? o(1) : a(1);
      }, done() {
        var g;
        p.current && typeof t.getAnimations == "function" && t.getAnimations().length > 0 || (u.current = !1, o(7), r || i(!1), (g = n == null ? void 0 : n.end) == null || g.call(n, r));
      } });
    }
  }, [e, r, t, w]), e ? [l, { closed: s(1), enter: s(2), leave: s(4), transition: s(2) || s(4) }] : [r, { closed: void 0, enter: void 0, leave: void 0, transition: void 0 }];
}
function dl(e, { prepare: t, run: r, done: n, inFlight: l }) {
  let i = ne();
  return ml(e, { prepare: t, inFlight: l }), i.nextFrame(() => {
    r(), i.requestAnimationFrame(() => {
      i.add(fl(e, n));
    });
  }), i.dispose;
}
function fl(e, t) {
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
function ml(e, { inFlight: t, prepare: r }) {
  if (t != null && t.current) {
    r();
    return;
  }
  let n = e.style.transition;
  e.style.transition = "none", r(), e.offsetHeight, e.style.transition = n;
}
function kt(e, t) {
  let r = S([]), n = M(e);
  L(() => {
    let l = [...r.current];
    for (let [i, s] of t.entries()) if (r.current[i] !== s) {
      let a = n(t, l);
      return r.current = t, a;
    }
  }, [n, ...t]);
}
let rt = z(null);
rt.displayName = "OpenClosedContext";
var K = ((e) => (e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(K || {});
function nt() {
  return H(rt);
}
function pl({ value: e, children: t }) {
  return $.createElement(rt.Provider, { value: e }, t);
}
function hl({ children: e }) {
  return $.createElement(rt.Provider, { value: null }, e);
}
function vl(e) {
  function t() {
    document.readyState !== "loading" && (e(), document.removeEventListener("DOMContentLoaded", t));
  }
  typeof window < "u" && typeof document < "u" && (document.addEventListener("DOMContentLoaded", t), t());
}
let ie = [];
vl(() => {
  function e(t) {
    if (!ae(t.target) || t.target === document.body || ie[0] === t.target) return;
    let r = t.target;
    r = r.closest(Ke), ie.unshift(r ?? t.target), ie = ie.filter((n) => n != null && n.isConnected), ie.splice(10);
  }
  window.addEventListener("click", e, { capture: !0 }), window.addEventListener("mousedown", e, { capture: !0 }), window.addEventListener("focus", e, { capture: !0 }), document.body.addEventListener("click", e, { capture: !0 }), document.body.addEventListener("mousedown", e, { capture: !0 }), document.body.addEventListener("focus", e, { capture: !0 });
});
function yr(e) {
  let t = M(e), r = S(!1);
  L(() => (r.current = !1, () => {
    r.current = !0, et(() => {
      r.current && t();
    });
  }), [t]);
}
function gl() {
  let e = typeof document > "u";
  return "useSyncExternalStore" in Ae ? ((t) => t.useSyncExternalStore)(Ae)(() => () => {
  }, () => !1, () => !e) : !1;
}
function De() {
  let e = gl(), [t, r] = Ae.useState(J.isHandoffComplete);
  return t && J.isHandoffComplete === !1 && r(!1), Ae.useEffect(() => {
    t !== !0 && r(!0);
  }, [t]), Ae.useEffect(() => J.handoff(), []), e ? !1 : t;
}
let br = z(!1);
function wl() {
  return H(br);
}
function Gt(e) {
  return $.createElement(br.Provider, { value: e.force }, e.children);
}
function yl(e) {
  let t = wl(), r = H(Er), [n, l] = A(() => {
    var i;
    if (!t && r !== null) return (i = r.current) != null ? i : null;
    if (J.isServer) return null;
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
let xr = Y, bl = V(function(e, t) {
  let { ownerDocument: r = null, ...n } = e, l = S(null), i = Q(wn((g) => {
    l.current = g;
  }), t), s = tt(l), a = r ?? s, o = yl(a), [u] = A(() => {
    var g;
    return J.isServer ? null : (g = a == null ? void 0 : a.createElement("div")) != null ? g : null;
  }), p = H(Et), w = De();
  _(() => {
    !o || !u || o.contains(u) || (u.setAttribute("data-headlessui-portal", ""), o.appendChild(u));
  }, [o, u]), _(() => {
    if (u && p) return p.register(u);
  }, [p, u]), yr(() => {
    var g;
    !o || !u || (ir(u) && o.contains(u) && o.removeChild(u), o.childNodes.length <= 0 && ((g = o.parentElement) == null || g.removeChild(o)));
  });
  let b = G();
  return w ? !o || !u ? null : zr(b({ ourProps: { ref: i }, theirProps: n, slot: {}, defaultTag: xr, name: "Portal" }), u) : null;
});
function xl(e, t) {
  let r = Q(t), { enabled: n = !0, ownerDocument: l, ...i } = e, s = G();
  return n ? $.createElement(bl, { ...i, ownerDocument: l, ref: r }) : s({ ourProps: { ref: r }, theirProps: i, slot: {}, defaultTag: xr, name: "Portal" });
}
let El = Y, Er = z(null);
function $l(e, t) {
  let { target: r, ...n } = e, l = { ref: Q(t) }, i = G();
  return $.createElement(Er.Provider, { value: r }, i({ ourProps: l, theirProps: n, defaultTag: El, name: "Popover.Group" }));
}
let Et = z(null);
function Ol() {
  let e = H(Et), t = S([]), r = M((i) => (t.current.push(i), e && e.register(i), () => n(i))), n = M((i) => {
    let s = t.current.indexOf(i);
    s !== -1 && t.current.splice(s, 1), e && e.unregister(i);
  }), l = N(() => ({ register: r, unregister: n, portals: t }), [r, n, t]);
  return [t, N(() => function({ children: i }) {
    return $.createElement(Et.Provider, { value: l }, i);
  }, [l])];
}
let Sl = V(xl), $r = V($l), Pl = Object.assign(Sl, { Group: $r });
function Tl(e, t = typeof document < "u" ? document.defaultView : null, r) {
  let n = Re(e, "escape");
  wr(t, "keydown", (l) => {
    n && (l.defaultPrevented || l.key === sr.Escape && r(l));
  });
}
function Ml() {
  var e;
  let [t] = A(() => typeof window < "u" && typeof window.matchMedia == "function" ? window.matchMedia("(pointer: coarse)") : null), [r, n] = A((e = t == null ? void 0 : t.matches) != null ? e : !1);
  return _(() => {
    if (!t) return;
    function l(i) {
      n(i.matches);
    }
    return t.addEventListener("change", l), () => t.removeEventListener("change", l);
  }, [t]), r;
}
function Ll({ defaultContainers: e = [], portals: t, mainTreeNode: r } = {}) {
  let n = tt(r), l = M(() => {
    var i, s;
    let a = [];
    for (let o of e) o !== null && (se(o) ? a.push(o) : "current" in o && se(o.current) && a.push(o.current));
    if (t != null && t.current) for (let o of t.current) a.push(o);
    for (let o of (i = n == null ? void 0 : n.querySelectorAll("html > *, body > *")) != null ? i : []) o !== document.body && o !== document.head && se(o) && o.id !== "headlessui-portal-root" && (r && (o.contains(r) || o.contains((s = r == null ? void 0 : r.getRootNode()) == null ? void 0 : s.host)) || a.some((u) => o.contains(u)) || a.push(o));
    return a;
  });
  return { resolveContainers: l, contains: M((i) => l().some((s) => s.contains(i))) };
}
let Or = z(null);
function qt({ children: e, node: t }) {
  let [r, n] = A(null), l = Sr(t ?? r);
  return $.createElement(Or.Provider, { value: l }, e, l === null && $.createElement(yt, { features: qe.Hidden, ref: (i) => {
    var s, a;
    if (i) {
      for (let o of (a = (s = Qe(i)) == null ? void 0 : s.querySelectorAll("html > *, body > *")) != null ? a : []) if (o !== document.body && o !== document.head && se(o) && o != null && o.contains(i)) {
        n(o);
        break;
      }
    }
  } }));
}
function Sr(e = null) {
  var t;
  return (t = H(Or)) != null ? t : e;
}
function At() {
  let e = S(!1);
  return _(() => (e.current = !0, () => {
    e.current = !1;
  }), []), e;
}
var ke = ((e) => (e[e.Forwards = 0] = "Forwards", e[e.Backwards = 1] = "Backwards", e))(ke || {});
function kl() {
  let e = S(0);
  return gr(!0, "keydown", (t) => {
    t.key === "Tab" && (e.current = t.shiftKey ? 1 : 0);
  }, !0), e;
}
function Pr(e) {
  if (!e) return /* @__PURE__ */ new Set();
  if (typeof e == "function") return new Set(e());
  let t = /* @__PURE__ */ new Set();
  for (let r of e.current) se(r.current) && t.add(r.current);
  return t;
}
let Al = "div";
var de = ((e) => (e[e.None = 0] = "None", e[e.InitialFocus = 1] = "InitialFocus", e[e.TabLock = 2] = "TabLock", e[e.FocusLock = 4] = "FocusLock", e[e.RestoreFocus = 8] = "RestoreFocus", e[e.AutoFocus = 16] = "AutoFocus", e))(de || {});
function Cl(e, t) {
  let r = S(null), n = Q(r, t), { initialFocus: l, initialFocusFallback: i, containers: s, features: a = 15, ...o } = e;
  De() || (a = 0);
  let u = tt(r);
  Rl(a, { ownerDocument: u });
  let p = Dl(a, { ownerDocument: u, container: r, initialFocus: l, initialFocusFallback: i });
  _l(a, { ownerDocument: u, container: r, containers: s, previousActiveElement: p });
  let w = kl(), b = M((d) => {
    if (!me(r.current)) return;
    let v = r.current;
    ((y) => y())(() => {
      re(w.current, { [ke.Forwards]: () => {
        Fe(v, ee.First, { skipElements: [d.relatedTarget, i] });
      }, [ke.Backwards]: () => {
        Fe(v, ee.Last, { skipElements: [d.relatedTarget, i] });
      } });
    });
  }), g = Re(!!(a & 2), "focus-trap#tab-lock"), f = Mt(), E = S(!1), h = { ref: n, onKeyDown(d) {
    d.key == "Tab" && (E.current = !0, f.requestAnimationFrame(() => {
      E.current = !1;
    }));
  }, onBlur(d) {
    if (!(a & 4)) return;
    let v = Pr(s);
    me(r.current) && v.add(r.current);
    let y = d.relatedTarget;
    ae(y) && y.dataset.headlessuiFocusGuard !== "true" && (Tr(v, y) || (E.current ? Fe(r.current, re(w.current, { [ke.Forwards]: () => ee.Next, [ke.Backwards]: () => ee.Previous }) | ee.WrapAround, { relativeTo: d.target }) : ae(d.target) && te(d.target)));
  } }, c = G();
  return $.createElement($.Fragment, null, g && $.createElement(yt, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: b, features: qe.Focusable }), c({ ourProps: h, theirProps: o, defaultTag: Al, name: "FocusTrap" }), g && $.createElement(yt, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: b, features: qe.Focusable }));
}
let Fl = V(Cl), Nl = Object.assign(Fl, { features: de });
function Il(e = !0) {
  let t = S(ie.slice());
  return kt(([r], [n]) => {
    n === !0 && r === !1 && et(() => {
      t.current.splice(0);
    }), n === !1 && r === !0 && (t.current = ie.slice());
  }, [e, ie, t]), M(() => {
    var r;
    return (r = t.current.find((n) => n != null && n.isConnected)) != null ? r : null;
  });
}
function Rl(e, { ownerDocument: t }) {
  let r = !!(e & 8), n = Il(r);
  kt(() => {
    r || (t == null ? void 0 : t.activeElement) === (t == null ? void 0 : t.body) && te(n());
  }, [r]), yr(() => {
    r && te(n());
  });
}
function Dl(e, { ownerDocument: t, container: r, initialFocus: n, initialFocusFallback: l }) {
  let i = S(null), s = Re(!!(e & 1), "focus-trap#initial-focus"), a = At();
  return kt(() => {
    if (e === 0) return;
    if (!s) {
      l != null && l.current && te(l.current);
      return;
    }
    let o = r.current;
    o && et(() => {
      if (!a.current) return;
      let u = t == null ? void 0 : t.activeElement;
      if (n != null && n.current) {
        if ((n == null ? void 0 : n.current) === u) {
          i.current = u;
          return;
        }
      } else if (o.contains(u)) {
        i.current = u;
        return;
      }
      if (n != null && n.current) te(n.current);
      else {
        if (e & 16) {
          if (Fe(o, ee.First | ee.AutoFocus) !== xt.Error) return;
        } else if (Fe(o, ee.First) !== xt.Error) return;
        if (l != null && l.current && (te(l.current), (t == null ? void 0 : t.activeElement) === l.current)) return;
        console.warn("There are no focusable elements inside the <FocusTrap />");
      }
      i.current = t == null ? void 0 : t.activeElement;
    });
  }, [l, s, e]), i;
}
function _l(e, { ownerDocument: t, container: r, containers: n, previousActiveElement: l }) {
  let i = At(), s = !!(e & 4);
  wr(t == null ? void 0 : t.defaultView, "focus", (a) => {
    if (!s || !i.current) return;
    let o = Pr(n);
    me(r.current) && o.add(r.current);
    let u = l.current;
    if (!u) return;
    let p = a.target;
    me(p) ? Tr(o, p) ? (l.current = p, te(p)) : (a.preventDefault(), a.stopPropagation(), te(u)) : te(l.current);
  }, !0);
}
function Tr(e, t) {
  for (let r of e) if (r.contains(t)) return !0;
  return !1;
}
function Mr(e) {
  var t;
  return !!(e.enter || e.enterFrom || e.enterTo || e.leave || e.leaveFrom || e.leaveTo) || ((t = e.as) != null ? t : kr) !== Y || $.Children.count(e.children) === 1;
}
let lt = z(null);
lt.displayName = "TransitionContext";
var jl = ((e) => (e.Visible = "visible", e.Hidden = "hidden", e))(jl || {});
function Wl() {
  let e = H(lt);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
function Ul() {
  let e = H(it);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
let it = z(null);
it.displayName = "NestingContext";
function ot(e) {
  return "children" in e ? ot(e.children) : e.current.filter(({ el: t }) => t.current !== null).filter(({ state: t }) => t === "visible").length > 0;
}
function Lr(e, t) {
  let r = he(e), n = S([]), l = At(), i = Mt(), s = M((g, f = oe.Hidden) => {
    let E = n.current.findIndex(({ el: h }) => h === g);
    E !== -1 && (re(f, { [oe.Unmount]() {
      n.current.splice(E, 1);
    }, [oe.Hidden]() {
      n.current[E].state = "hidden";
    } }), i.microTask(() => {
      var h;
      !ot(n) && l.current && ((h = r.current) == null || h.call(r));
    }));
  }), a = M((g) => {
    let f = n.current.find(({ el: E }) => E === g);
    return f ? f.state !== "visible" && (f.state = "visible") : n.current.push({ el: g, state: "visible" }), () => s(g, oe.Unmount);
  }), o = S([]), u = S(Promise.resolve()), p = S({ enter: [], leave: [] }), w = M((g, f, E) => {
    o.current.splice(0), t && (t.chains.current[f] = t.chains.current[f].filter(([h]) => h !== g)), t == null || t.chains.current[f].push([g, new Promise((h) => {
      o.current.push(h);
    })]), t == null || t.chains.current[f].push([g, new Promise((h) => {
      Promise.all(p.current[f].map(([c, d]) => d)).then(() => h());
    })]), f === "enter" ? u.current = u.current.then(() => t == null ? void 0 : t.wait.current).then(() => E(f)) : E(f);
  }), b = M((g, f, E) => {
    Promise.all(p.current[f].splice(0).map(([h, c]) => c)).then(() => {
      var h;
      (h = o.current.shift()) == null || h();
    }).then(() => E(f));
  });
  return N(() => ({ children: n, register: a, unregister: s, onStart: w, onStop: b, wait: u, chains: p }), [a, s, n, w, b, p, u]);
}
let kr = Y, Ar = Ge.RenderStrategy;
function Hl(e, t) {
  var r, n;
  let { transition: l = !0, beforeEnter: i, afterEnter: s, beforeLeave: a, afterLeave: o, enter: u, enterFrom: p, enterTo: w, entered: b, leave: g, leaveFrom: f, leaveTo: E, ...h } = e, [c, d] = A(null), v = S(null), y = Mr(e), m = Q(...y ? [v, t, d] : t === null ? [] : [t]), x = (r = h.unmount) == null || r ? oe.Unmount : oe.Hidden, { show: O, appear: I, initial: j } = Wl(), [C, R] = A(O ? "visible" : "hidden"), B = Ul(), { register: D, unregister: k } = B;
  _(() => D(v), [D, v]), _(() => {
    if (x === oe.Hidden && v.current) {
      if (O && C !== "visible") {
        R("visible");
        return;
      }
      return re(C, { hidden: () => k(v), visible: () => D(v) });
    }
  }, [C, v, D, k, O, x]);
  let W = De();
  _(() => {
    if (y && W && C === "visible" && v.current === null) throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
  }, [v, C, W, y]);
  let ve = j && !I, ue = I && O && j, F = S(!1), ge = Lr(() => {
    F.current || (R("hidden"), k(v));
  }, B), _e = M((ut) => {
    F.current = !0;
    let We = ut ? "enter" : "leave";
    ge.onStart(v, We, (Oe) => {
      Oe === "enter" ? i == null || i() : Oe === "leave" && (a == null || a());
    });
  }), le = M((ut) => {
    let We = ut ? "enter" : "leave";
    F.current = !1, ge.onStop(v, We, (Oe) => {
      Oe === "enter" ? s == null || s() : Oe === "leave" && (o == null || o());
    }), We === "leave" && !ot(ge) && (R("hidden"), k(v));
  });
  L(() => {
    y && l || (_e(O), le(O));
  }, [O, y, l]);
  let st = !(!l || !y || !W || ve), [, P] = cl(st, c, O, { start: _e, end: le }), je = ce({ ref: m, className: ((n = wt(h.className, ue && u, ue && p, P.enter && u, P.enter && P.closed && p, P.enter && !P.closed && w, P.leave && g, P.leave && !P.closed && f, P.leave && P.closed && E, !P.transition && O && b)) == null ? void 0 : n.trim()) || void 0, ...ul(P) }), $e = 0;
  C === "visible" && ($e |= K.Open), C === "hidden" && ($e |= K.Closed), O && C === "hidden" && ($e |= K.Opening), !O && C === "visible" && ($e |= K.Closing);
  let Ir = G();
  return $.createElement(it.Provider, { value: ge }, $.createElement(pl, { value: $e }, Ir({ ourProps: je, theirProps: h, defaultTag: kr, features: Ar, visible: C === "visible", name: "Transition.Child" })));
}
function Vl(e, t) {
  let { show: r, appear: n = !1, unmount: l = !0, ...i } = e, s = S(null), a = Mr(e), o = Q(...a ? [s, t] : t === null ? [] : [t]);
  De();
  let u = nt();
  if (r === void 0 && u !== null && (r = (u & K.Open) === K.Open), r === void 0) throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
  let [p, w] = A(r ? "visible" : "hidden"), b = Lr(() => {
    r || w("hidden");
  }), [g, f] = A(!0), E = S([r]);
  _(() => {
    g !== !1 && E.current[E.current.length - 1] !== r && (E.current.push(r), f(!1));
  }, [E, r]);
  let h = N(() => ({ show: r, appear: n, initial: g }), [r, n, g]);
  _(() => {
    r ? w("visible") : !ot(b) && s.current !== null && w("hidden");
  }, [r, b]);
  let c = { unmount: l }, d = M(() => {
    var m;
    g && f(!1), (m = e.beforeEnter) == null || m.call(e);
  }), v = M(() => {
    var m;
    g && f(!1), (m = e.beforeLeave) == null || m.call(e);
  }), y = G();
  return $.createElement(it.Provider, { value: b }, $.createElement(lt.Provider, { value: h }, y({ ourProps: { ...c, as: Y, children: $.createElement(Cr, { ref: o, ...c, ...i, beforeEnter: d, beforeLeave: v }) }, theirProps: {}, defaultTag: Y, features: Ar, visible: p === "visible", name: "Transition" })));
}
function Bl(e, t) {
  let r = H(lt) !== null, n = nt() !== null;
  return $.createElement($.Fragment, null, !r && n ? $.createElement($t, { ref: t, ...e }) : $.createElement(Cr, { ref: t, ...e }));
}
let $t = V(Vl), Cr = V(Hl), Ee = V(Bl), Fr = Object.assign($t, { Child: Ee, Root: $t });
var Xl = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(Xl || {}), zl = ((e) => (e[e.SetTitleId = 0] = "SetTitleId", e))(zl || {});
let Gl = { 0(e, t) {
  return e.titleId === t.id ? e : { ...e, titleId: t.id };
} }, Ct = z(null);
Ct.displayName = "DialogContext";
function at(e) {
  let t = H(Ct);
  if (t === null) {
    let r = new Error(`<${e} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(r, at), r;
  }
  return t;
}
function ql(e, t) {
  return re(t.type, Gl, e, t);
}
let Kt = V(function(e, t) {
  let r = Ie(), { id: n = `headlessui-dialog-${r}`, open: l, onClose: i, initialFocus: s, role: a = "dialog", autoFocus: o = !0, __demoMode: u = !1, unmount: p = !1, ...w } = e, b = S(!1);
  a = (function() {
    return a === "dialog" || a === "alertdialog" ? a : (b.current || (b.current = !0, console.warn(`Invalid role [${a}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog");
  })();
  let g = nt();
  l === void 0 && g !== null && (l = (g & K.Open) === K.Open);
  let f = S(null), E = Q(f, t), h = tt(f), c = l ? 0 : 1, [d, v] = Hr(ql, { titleId: null, descriptionId: null, panelRef: Vr() }), y = M(() => i(!1)), m = M((P) => v({ type: 0, id: P })), x = De() ? c === 0 : !1, [O, I] = Ol(), j = { get current() {
    var P;
    return (P = d.panelRef.current) != null ? P : f.current;
  } }, C = Sr(), { resolveContainers: R } = Ll({ mainTreeNode: C, portals: O, defaultContainers: [j] }), B = g !== null ? (g & K.Closing) === K.Closing : !1;
  Wn(u || B ? !1 : x, { allowed: M(() => {
    var P, je;
    return [(je = (P = f.current) == null ? void 0 : P.closest("[data-headlessui-portal]")) != null ? je : null];
  }), disallowed: M(() => {
    var P;
    return [(P = C == null ? void 0 : C.closest("body > *:not(#headlessui-portal-root)")) != null ? P : null];
  }) });
  let D = mr.get(null);
  _(() => {
    if (x) return D.actions.push(n), () => D.actions.pop(n);
  }, [D, n, x]);
  let k = pr(D, U((P) => D.selectors.isTop(P, n), [D, n]));
  Jn(k, R, (P) => {
    P.preventDefault(), y();
  }), Tl(k, h == null ? void 0 : h.defaultView, (P) => {
    P.preventDefault(), P.stopPropagation(), document.activeElement && "blur" in document.activeElement && typeof document.activeElement.blur == "function" && document.activeElement.blur(), y();
  }), ol(u || B ? !1 : x, h, R), Un(x, f, y);
  let [W, ve] = yn(), ue = N(() => [{ dialogState: c, close: y, setTitleId: m, unmount: p }, d], [c, d, y, m, p]), F = N(() => ({ open: c === 0 }), [c]), ge = { ref: E, id: n, role: a, tabIndex: -1, "aria-modal": u ? void 0 : c === 0 ? !0 : void 0, "aria-labelledby": d.titleId, "aria-describedby": W, unmount: p }, _e = !Ml(), le = de.None;
  x && !u && (le |= de.RestoreFocus, le |= de.TabLock, o && (le |= de.AutoFocus), _e && (le |= de.InitialFocus));
  let st = G();
  return $.createElement(hl, null, $.createElement(Gt, { force: !0 }, $.createElement(Pl, null, $.createElement(Ct.Provider, { value: ue }, $.createElement($r, { target: f }, $.createElement(Gt, { force: !1 }, $.createElement(ve, { slot: F }, $.createElement(I, null, $.createElement(Nl, { initialFocus: s, initialFocusFallback: f, containers: R, features: le }, $.createElement(Sn, { value: y }, st({ ourProps: ge, theirProps: w, slot: F, defaultTag: Kl, features: Yl, visible: c === 0, name: "Dialog" })))))))))));
}), Kl = "div", Yl = Ge.RenderStrategy | Ge.Static;
function Zl(e, t) {
  let { transition: r = !1, open: n, ...l } = e, i = nt(), s = e.hasOwnProperty("open") || i !== null, a = e.hasOwnProperty("onClose");
  if (!s && !a) throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");
  if (!s) throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");
  if (!a) throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");
  if (!i && typeof e.open != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${e.open}`);
  if (typeof e.onClose != "function") throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${e.onClose}`);
  return (n !== void 0 || r) && !l.static ? $.createElement(qt, null, $.createElement(Fr, { show: n, transition: r, unmount: l.unmount }, $.createElement(Kt, { ref: t, ...l }))) : $.createElement(qt, null, $.createElement(Kt, { ref: t, open: n, ...l }));
}
let Jl = "div";
function Ql(e, t) {
  let r = Ie(), { id: n = `headlessui-dialog-panel-${r}`, transition: l = !1, ...i } = e, [{ dialogState: s, unmount: a }, o] = at("Dialog.Panel"), u = Q(t, o.panelRef), p = N(() => ({ open: s === 0 }), [s]), w = M((h) => {
    h.stopPropagation();
  }), b = { ref: u, id: n, onClick: w }, g = l ? Ee : Y, f = l ? { unmount: a } : {}, E = G();
  return $.createElement(g, { ...f }, E({ ourProps: b, theirProps: i, slot: p, defaultTag: Jl, name: "Dialog.Panel" }));
}
let ei = "div";
function ti(e, t) {
  let { transition: r = !1, ...n } = e, [{ dialogState: l, unmount: i }] = at("Dialog.Backdrop"), s = N(() => ({ open: l === 0 }), [l]), a = { ref: t, "aria-hidden": !0 }, o = r ? Ee : Y, u = r ? { unmount: i } : {}, p = G();
  return $.createElement(o, { ...u }, p({ ourProps: a, theirProps: n, slot: s, defaultTag: ei, name: "Dialog.Backdrop" }));
}
let ri = "h2";
function ni(e, t) {
  let r = Ie(), { id: n = `headlessui-dialog-title-${r}`, ...l } = e, [{ dialogState: i, setTitleId: s }] = at("Dialog.Title"), a = Q(t);
  L(() => (s(n), () => s(null)), [n, s]);
  let o = N(() => ({ open: i === 0 }), [i]), u = { ref: a, id: n };
  return G()({ ourProps: u, theirProps: l, slot: o, defaultTag: ri, name: "Dialog.Title" });
}
let li = V(Zl), Ft = V(Ql);
V(ti);
let ii = V(ni), oi = Object.assign(li, { Panel: Ft, Title: ii, Description: $n });
function Nr({ onClick: e }) {
  return /* @__PURE__ */ pe(
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
const ai = ({ modalContext: e, config: t, children: r }) => {
  const [n, l] = A(!1);
  return /* @__PURE__ */ T("div", { className: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4", children: /* @__PURE__ */ T(
    "div",
    {
      className: ze("im-modal-positioner flex min-h-full justify-center", {
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
          className: ze("im-modal-wrapper w-full transition duration-300 ease-in-out", e.onTopOfStack ? "" : "blur-sm", {
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
          children: /* @__PURE__ */ pe(
            Ft,
            {
              className: `im-modal-content relative ${t.paddingClasses} ${t.panelClasses}`,
              "data-inertiaui-modal-entered": n,
              children: [
                t.closeButton && /* @__PURE__ */ T("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ T(Nr, { onClick: e.close }) }),
                typeof r == "function" ? r({ modalContext: e, config: t }) : r
              ]
            }
          )
        }
      )
    }
  ) });
}, si = ({ modalContext: e, config: t, children: r }) => {
  const [n, l] = A(!1);
  return /* @__PURE__ */ T("div", { className: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ T(
    "div",
    {
      className: ze("im-slideover-positioner flex min-h-full items-center", {
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
          className: ze("im-slideover-wrapper w-full transition duration-300 ease-in-out", e.onTopOfStack ? "" : "blur-sm", {
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
          children: /* @__PURE__ */ pe(
            Ft,
            {
              className: `im-slideover-content relative ${t.paddingClasses} ${t.panelClasses}`,
              "data-inertiaui-modal-entered": n,
              children: [
                t.closeButton && /* @__PURE__ */ T("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ T(Nr, { onClick: e.close }) }),
                typeof r == "function" ? r({ modalContext: e, config: t }) : r
              ]
            }
          )
        }
      )
    }
  ) });
}, ui = Ot(({ name: e, children: t, onFocus: r = null, onBlur: n = null, onClose: l = null, onSuccess: i = null, onAfterLeave: s = null, ...a }, o) => {
  const u = (w) => typeof t == "function" ? t(w) : t, p = S(null);
  return Yt(o, () => p.current, [p]), /* @__PURE__ */ T(
    rr,
    {
      ref: p,
      name: e,
      onFocus: r,
      onBlur: n,
      onClose: l,
      onSuccess: i,
      ...a,
      children: ({
        afterLeave: w,
        close: b,
        config: g,
        emit: f,
        getChildModal: E,
        getParentModal: h,
        id: c,
        index: d,
        isOpen: v,
        modalContext: y,
        onTopOfStack: m,
        reload: x,
        setOpen: O,
        shouldRender: I
      }) => /* @__PURE__ */ T(
        Fr,
        {
          appear: !0,
          show: v ?? !1,
          afterLeave: s,
          children: /* @__PURE__ */ pe(
            oi,
            {
              as: "div",
              className: "im-dialog relative z-20",
              onClose: () => g.closeExplicitly ? null : b(),
              "data-inertiaui-modal-id": c,
              "data-inertiaui-modal-index": d,
              children: [
                d === 0 ? /* @__PURE__ */ T(
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
                d > 0 && m ? /* @__PURE__ */ T("div", { className: "im-backdrop fixed inset-0 z-30 bg-black/75" }) : null,
                g.slideover ? /* @__PURE__ */ T(
                  si,
                  {
                    modalContext: y,
                    config: g,
                    children: u({
                      afterLeave: w,
                      close: b,
                      config: g,
                      emit: f,
                      getChildModal: E,
                      getParentModal: h,
                      id: c,
                      index: d,
                      isOpen: v,
                      modalContext: y,
                      onTopOfStack: m,
                      reload: x,
                      setOpen: O,
                      shouldRender: I
                    })
                  }
                ) : /* @__PURE__ */ T(
                  ai,
                  {
                    modalContext: y,
                    config: g,
                    children: u({
                      afterLeave: w,
                      close: b,
                      config: g,
                      emit: f,
                      getChildModal: E,
                      getParentModal: h,
                      id: c,
                      index: d,
                      isOpen: v,
                      modalContext: y,
                      onTopOfStack: m,
                      reload: x,
                      setOpen: O,
                      shouldRender: I
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
ui.displayName = "Modal";
const Oi = ({
  href: e,
  method: t = "get",
  data: r = {},
  as: n = "a",
  headers: l = {},
  queryStringArrayFormat: i = "brackets",
  onAfterLeave: s = null,
  onBlur: a = null,
  onClose: o = null,
  onError: u = null,
  onFocus: p = null,
  onStart: w = null,
  onSuccess: b = null,
  navigate: g = null,
  children: f,
  ...E
}) => {
  const [h, c] = A(!1), [d, v] = A(null), { stack: y, visit: m } = Je(), x = N(() => g ?? Pt("navigate"), [g]), O = {}, I = {};
  Object.keys(E).forEach((k) => {
    Nt.includes(k) || (k.startsWith("on") && typeof E[k] == "function" ? Jr(k) ? O[k] = E[k] : I[k] = E[k] : O[k] = E[k]);
  });
  const [j, C] = A(!1);
  L(() => {
    d && (d.onTopOfStack && j ? p == null || p() : !d.onTopOfStack && !j && (a == null || a()), C(!d.onTopOfStack));
  }, [y]);
  const R = U(() => {
    o == null || o();
  }, [o]), B = U(() => {
    v(null), s == null || s();
  }, [s]), D = U(
    (k) => {
      k == null || k.preventDefault(), !h && (e.startsWith("#") || (c(!0), w == null || w()), m(
        e,
        t,
        r,
        l,
        Zr(Yr(E, Nt)),
        () => R(y.length),
        B,
        i,
        x
      ).then((W) => {
        v(W), W.registerEventListenersFromProps(I), b == null || b();
      }).catch((W) => {
        console.error(W), u == null || u(W);
      }).finally(() => c(!1)));
    },
    [e, t, r, l, i, E, R, B]
  );
  return /* @__PURE__ */ T(
    n,
    {
      ...O,
      href: e,
      onClick: D,
      children: typeof f == "function" ? f({ loading: h }) : f
    }
  );
}, ci = ({ children: e, data: t, params: r, buffer: n, as: l, always: i, fallback: s }) => {
  i = i ?? !1, l = l ?? "div", s = s ?? null;
  const [a, o] = A(!1), u = S(!1), p = S(!1), w = S(null), b = tr(), g = U(() => {
    if (t)
      return {
        only: Array.isArray(t) ? t : [t]
      };
    if (!r)
      throw new Error("You must provide either a `data` or `params` prop.");
    return r;
  }, [r, t]);
  return L(() => {
    if (!w.current)
      return;
    const f = new IntersectionObserver(
      (E) => {
        if (!E[0].isIntersecting || (!i && u.current && f.disconnect(), p.current))
          return;
        u.current = !0, p.current = !0;
        const h = g();
        b.reload({
          ...h,
          onStart: (c) => {
            var d;
            p.current = !0, (d = h.onStart) == null || d.call(h, c);
          },
          onFinish: (c) => {
            var d;
            o(!0), p.current = !1, (d = h.onFinish) == null || d.call(h, c), i || f.disconnect();
          }
        });
      },
      {
        rootMargin: `${n || 0}px`
      }
    );
    return f.observe(w.current), () => {
      f.disconnect();
    };
  }, [w, g, n]), i || !a ? Ne(
    l,
    {
      props: null,
      ref: w
    },
    a ? e : s
  ) : a ? e : null;
};
ci.displayName = "InertiaWhenVisible";
const Si = (e) => (t) => (t.default.layout = (r) => Ne(e, {}, r), t);
export {
  rn as Deferred,
  rr as HeadlessModal,
  ui as Modal,
  Oi as ModalLink,
  tn as ModalRoot,
  Qr as ModalStackProvider,
  ci as WhenVisible,
  Pt as getConfig,
  en as initFromPageProps,
  yi as putConfig,
  bi as renderApp,
  wi as resetConfig,
  Si as setPageLayout,
  tr as useModal,
  Qt as useModalIndex,
  Je as useModalStack
};
