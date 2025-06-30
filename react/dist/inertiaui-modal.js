var Rr = Object.defineProperty;
var _r = (e, t, r) => t in e ? Rr(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var q = (e, t, r) => _r(e, typeof t != "symbol" ? t + "" : t, r);
import * as Ce from "react";
import $, { createContext as z, useContext as H, useEffect as L, useRef as S, useState as C, createElement as Ne, useMemo as N, forwardRef as Ot, useImperativeHandle as Yt, useLayoutEffect as Dr, useCallback as U, Fragment as Y, isValidElement as jr, cloneElement as Wr, useId as Ie, useSyncExternalStore as Ur, useReducer as Hr, createRef as Vr } from "react";
import { jsxs as pe, Fragment as St, jsx as P } from "react/jsx-runtime";
import Xe from "axios";
import { usePage as Br, router as Pe } from "@inertiajs/react";
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
const Ye = new Gr(), gi = () => Ye.reset(), wi = (e, t) => Ye.put(e, t), Tt = (e) => Ye.get(e), we = (e, t) => Ye.get(e ? `slideover.${t}` : `modal.${t}`);
function qr(e, t) {
  return e = typeof e == "string" ? new URL(e, window.location.origin) : e, t = typeof t == "string" ? new URL(t, window.location.origin) : t, `${e.origin}${e.pathname}` == `${t.origin}${t.pathname}`;
}
function ct(e = "inertiaui_modal_") {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `${e}${crypto.randomUUID()}` : `${e}${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
}
function ye(e) {
  return typeof e == "string" ? e.toLowerCase() : e;
}
function Kr(e, t, r = !1) {
  return r && (t = t.map(ye)), Array.isArray(e) ? e.filter((n) => !t.includes(r ? ye(n) : n)) : Object.keys(e).reduce((n, l) => (t.includes(r ? ye(l) : l) || (n[l] = e[l]), n), {});
}
function Yr(e, t, r = !1) {
  return r && (t = t.map(ye)), Array.isArray(e) ? e.filter((n) => t.includes(r ? ye(n) : n)) : Object.keys(e).reduce((n, l) => (t.includes(r ? ye(l) : l) && (n[l] = e[l]), n), {});
}
function Zr(e) {
  return Array.isArray(e) ? e.filter((t) => t !== null) : Object.keys(e).reduce((t, r) => (r in e && e[r] !== null && (t[r] = e[r]), t), {});
}
function Te(e) {
  return e ? (e = e.replace(/_/g, "-"), e = e.replace(/-+/g, "-"), /[A-Z]/.test(e) ? (e = e.replace(/\s+/g, "").replace(/_/g, "").replace(/(?:^|\s|-)+([A-Za-z])/g, (t, r) => r.toUpperCase()), e = e.replace(/(.)(?=[A-Z])/g, "$1-"), e.toLowerCase()) : e) : "";
}
const Ze = z(null);
Ze.displayName = "ModalStackContext";
let Zt = null, Jt = null, xe = null, Ue = {}, dt = [], be = {};
const Jr = ({ children: e }) => {
  const [t, r] = C([]), [n, l] = C({}), i = (h) => {
    r((c) => {
      const d = h([...c]), v = (b) => {
        var m;
        return d.length < 2 ? !0 : ((m = d.map((x) => ({ id: x.id, shouldRender: x.shouldRender })).reverse().find((x) => x.shouldRender)) == null ? void 0 : m.id) === b;
      };
      return d.forEach((b, m) => {
        d[m].onTopOfStack = v(b.id), d[m].getParentModal = () => m < 1 ? null : d.slice(0, m).reverse().find((x) => x.isOpen), d[m].getChildModal = () => m === d.length - 1 ? null : d.slice(m + 1).find((x) => x.isOpen);
      }), d;
    });
  };
  L(() => {
    dt = t;
  }, [t]);
  class s {
    constructor(c, d, v, b, m) {
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
          const v = c.map((b) => {
            var m;
            return b.id === this.id && b.isOpen && (Object.keys(b.listeners).forEach((x) => {
              b.off(x);
            }), b.isOpen = !1, (m = b.onCloseCallback) == null || m.call(b), d = !0), b;
          });
          return d ? v : c;
        });
      });
      q(this, "afterLeave", () => {
        this.isOpen || i((c) => {
          const d = c.map((v) => {
            var b;
            return v.id === this.id && !v.isOpen && (v.shouldRender = !1, (b = v.afterLeaveCallback) == null || b.call(v), v.afterLeaveCallback = null), v;
          });
          return this.index === 0 ? [] : d;
        });
      });
      q(this, "on", (c, d) => {
        c = Te(c), this.listeners[c] = this.listeners[c] ?? [], this.listeners[c].push(d);
      });
      q(this, "off", (c, d) => {
        var v;
        c = Te(c), d ? this.listeners[c] = ((v = this.listeners[c]) == null ? void 0 : v.filter((b) => b !== d)) ?? [] : delete this.listeners[c];
      });
      q(this, "emit", (c, ...d) => {
        var v;
        (v = this.listeners[Te(c)]) == null || v.forEach((b) => b(...d));
      });
      q(this, "registerEventListenersFromProps", (c) => {
        const d = [];
        return Object.keys(c).filter((v) => v.startsWith("on")).forEach((v) => {
          const b = Te(v).replace(/^on-/, "");
          this.on(b, c[v]), d.push(() => this.off(b, c[v]));
        }), () => d.forEach((v) => v());
      });
      q(this, "reload", (c = {}) => {
        var m, x;
        let d = Object.keys(this.response.props);
        if (c.only && (d = c.only), c.except && (d = Kr(d, c.except)), !((m = this.response) != null && m.url))
          return;
        const v = (c.method ?? "get").toLowerCase(), b = c.data ?? {};
        (x = c.onStart) == null || x.call(c), Xe({
          url: this.response.url,
          method: v,
          data: v === "get" ? {} : b,
          params: v === "get" ? b : {},
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
      if (this.id = d.id ?? ct(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = c, this.props = d.props, this.response = d, this.config = v ?? {}, this.onCloseCallback = b, this.afterLeaveCallback = m, be[this.id]) {
        this.config = {
          ...this.config,
          ...be[this.id].config ?? {}
        };
        const x = be[this.id].onClose, O = be[this.id].onAfterLeave;
        x && (this.onCloseCallback = b ? () => {
          b(), x();
        } : x), O && (this.afterLeaveCallback = m ? () => {
          m(), O();
        } : O), delete be[this.id];
      }
      this.index = -1, this.getParentModal = () => null, this.getChildModal = () => null, this.onTopOfStack = !0;
    }
    static generateId() {
      return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `inertiaui_modal_${crypto.randomUUID()}` : `inertiaui_modal_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
    }
  }
  const a = (h, c = {}, d = null, v = null) => Jt(h.component).then((b) => u(b, h, c, d, v)), o = (h) => {
    var d, v;
    const c = (v = (d = h.response) == null ? void 0 : d.meta) == null ? void 0 : v.deferredProps;
    c && Object.keys(c).forEach((b) => {
      h.reload({ only: c[b] });
    });
  }, u = (h, c, d, v, b) => {
    const m = new s(h, c, d, v, b);
    return m.index = t.length, i((x) => [...x, m]), o(m), m.show(), m;
  };
  function p(h, c, d, v) {
    if (!n[h])
      throw new Error(`The local modal "${h}" has not been registered.`);
    const b = u(null, {}, c, d, v);
    return b.name = h, n[h].callback(b), b;
  }
  const w = (h, c = {}) => y(
    h,
    c.method ?? "get",
    c.data ?? {},
    c.headers ?? {},
    c.config ?? {},
    c.onClose,
    c.onAfterLeave,
    c.queryStringArrayFormat ?? "brackets",
    c.navigate ?? Tt("navigate"),
    c.onStart,
    c.onSuccess,
    c.onError
  ).then((d) => {
    const v = c.listeners ?? {};
    return Object.keys(v).forEach((b) => {
      const m = Te(b);
      d.on(m, v[b]);
    }), d;
  }), y = (h, c, d = {}, v = {}, b = {}, m = null, x = null, O = "brackets", I = !1, j = null, F = null, R = null) => {
    const B = ct();
    return new Promise((_, A) => {
      if (h.startsWith("#")) {
        _(p(h.substring(1), b, m, x));
        return;
      }
      const [W, ve] = Xr(c, h || "", d, O);
      let se = I && t.length === 0;
      if (t.length === 0 && (xe = typeof window < "u" ? window.location.href : ""), v = {
        ...v,
        Accept: "text/html, application/xhtml+xml",
        "X-Requested-With": "XMLHttpRequest",
        "X-Inertia": !0,
        "X-Inertia-Version": Zt,
        "X-InertiaUI-Modal": B,
        "X-InertiaUI-Modal-Use-Router": se ? 1 : 0,
        "X-InertiaUI-Modal-Base-Url": xe
      }, se)
        return Ue = {}, be[B] = {
          config: b,
          onClose: m,
          onAfterLeave: x
        }, Pe.visit(W, {
          method: c,
          data: ve,
          headers: v,
          preserveScroll: !0,
          preserveState: !0,
          onError(...k) {
            R == null || R(...k), A(...k);
          },
          onStart(...k) {
            j == null || j(...k);
          },
          onSuccess(...k) {
            F == null || F(...k);
          },
          onBefore: () => {
            Ue[B] = _;
          }
        });
      j == null || j(), Xe({
        url: W,
        method: c,
        data: ve,
        headers: v
      }).then((k) => {
        F == null || F(k), _(a(k.data, b, m, x));
      }).catch((...k) => {
        R == null || R(...k), A(...k);
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
    visit: y,
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
  return /* @__PURE__ */ P(Ze.Provider, { value: E, children: e });
}, Je = () => {
  const e = H(Ze);
  if (e === null)
    throw new Error("useModalStack must be used within a ModalStackProvider");
  return e;
}, Nt = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], Qr = (e) => {
  e.initialPage && (Zt = e.initialPage.version), e.resolveComponent && (Jt = e.resolveComponent);
}, bi = (e, t) => (Qr(t), /* @__PURE__ */ P(Jr, { children: /* @__PURE__ */ P(e, { ...t, children: ({ Component: n, props: l, key: i }) => /* @__PURE__ */ pe(St, { children: [
  (() => {
    const a = Ne(n, { key: i, ...l });
    return typeof n.layout == "function" ? n.layout(a) : Array.isArray(n.layout) ? n.layout.concat(a).reverse().reduce((u, p) => Ne(p, l, u)) : a;
  })(),
  /* @__PURE__ */ P(en, {})
] }) }) })), en = ({ children: e }) => {
  var o, u;
  const t = H(Ze), r = Br();
  let n = !1, l = !1, i = !!((o = r.props) != null && o._inertiaui_modal);
  L(() => Pe.on("start", () => n = !0), []), L(() => Pe.on("finish", () => n = !1), []), L(
    () => Pe.on("navigate", function(p) {
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
        !n && window.location.href !== w.baseUrl && Pe.visit(w.baseUrl, {
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
    var y, g;
    const p = (y = r.props) == null ? void 0 : y._inertiaui_modal, w = a.current;
    a.current = p, p && w && p.component === w.component && qr(p.url, w.url) && ((g = t.stack[0]) == null || g.updateProps(p.props ?? {}));
  }, [(u = r.props) == null ? void 0 : u._inertiaui_modal]), /* @__PURE__ */ pe(St, { children: [
    e,
    t.stack.length > 0 && /* @__PURE__ */ P(er, { index: 0 })
  ] });
}, Pt = $.createContext(null);
Pt.displayName = "ModalIndexContext";
const Qt = () => {
  const e = $.useContext(Pt);
  if (e === void 0)
    throw new Error("useModalIndex must be used within a ModalIndexProvider");
  return e;
}, er = ({ index: e }) => {
  const { stack: t } = Je(), r = N(() => t[e], [t, e]);
  return (r == null ? void 0 : r.component) && /* @__PURE__ */ P(Pt.Provider, { value: e, children: /* @__PURE__ */ P(
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
const tn = ({ children: e, data: t, fallback: r }) => {
  if (!t)
    throw new Error("`<Deferred>` requires a `data` prop to be a string or array of strings");
  const [n, l] = C(!1), i = Array.isArray(t) ? t : [t], s = tr().props;
  return L(() => {
    l(i.every((a) => s[a] !== void 0));
  }, [s, i]), n ? e : r;
};
tn.displayName = "InertiaModalDeferred";
const rr = Ot(({ name: e, children: t, onFocus: r = null, onBlur: n = null, onClose: l = null, onSuccess: i = null, ...s }, a) => {
  const o = Qt(), { stack: u, registerLocalModal: p, removeLocalModal: w } = Je(), [y, g] = C(null), f = N(() => e ? y : u[o], [e, y, o, u]), E = N(() => {
    var m;
    return (m = u.find((x) => x.shouldRender && x.index > (f == null ? void 0 : f.index))) == null ? void 0 : m.index;
  }, [o, u]), h = N(() => (f == null ? void 0 : f.config.slideover) ?? s.slideover ?? Tt("type") === "slideover", [s.slideover]), c = N(
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
  const [v, b] = C(!1);
  return L(() => {
    v && f !== null && f.isOpen && (f.onTopOfStack ? r == null || r() : n == null || n()), b(!0);
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
    E && /* @__PURE__ */ P(er, { index: E })
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
var rn = Object.defineProperty, nn = (e, t, r) => t in e ? rn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, ft = (e, t, r) => (nn(e, typeof t != "symbol" ? t + "" : t, r), r);
let ln = class {
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
}, fe = new ln();
function Qe(e) {
  var t, r;
  return fe.isServer ? null : e ? "ownerDocument" in e ? e.ownerDocument : "current" in e ? (r = (t = e.current) == null ? void 0 : t.ownerDocument) != null ? r : document : null : document;
}
function et(e) {
  typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch((t) => setTimeout(() => {
    throw t;
  }));
}
function re() {
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
    let n = re();
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
  let [e] = C(re);
  return L(() => () => e.dispose(), [e]), e;
}
let D = (e, t) => {
  fe.isServer ? L(e, t) : Dr(e, t);
};
function he(e) {
  let t = S(e);
  return D(() => {
    t.current = e;
  }, [e]), t;
}
let M = function(e) {
  let t = he(e);
  return $.useCallback((...r) => t.current(...r), [t]);
}, on = z(void 0);
function an() {
  return H(on);
}
function wt(...e) {
  return Array.from(new Set(e.flatMap((t) => typeof t == "string" ? t.split(" ") : []))).filter(Boolean).join(" ");
}
function te(e, t, ...r) {
  if (e in t) {
    let l = t[e];
    return typeof l == "function" ? l(...r) : l;
  }
  let n = new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map((l) => `"${l}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(n, te), n;
}
var Ge = ((e) => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(Ge || {}), ie = ((e) => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(ie || {});
function G() {
  let e = un();
  return U((t) => sn({ mergeRefs: e, ...t }), [e]);
}
function sn({ ourProps: e, theirProps: t, slot: r, defaultTag: n, features: l, visible: i = !0, name: s, mergeRefs: a }) {
  a = a ?? cn;
  let o = lr(t, e);
  if (i) return He(o, r, n, s, a);
  let u = l ?? 0;
  if (u & 2) {
    let { static: p = !1, ...w } = o;
    if (p) return He(w, r, n, s, a);
  }
  if (u & 1) {
    let { unmount: p = !0, ...w } = o;
    return te(p ? 0 : 1, { 0() {
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
    let y = !1, g = [];
    for (let [f, E] of Object.entries(t)) typeof E == "boolean" && (y = !0), E === !0 && g.push(f.replace(/([A-Z])/g, (h) => `-${h.toLowerCase()}`));
    if (y) {
      w["data-headlessui-state"] = g.join(" ");
      for (let f of g) w[`data-${f}`] = "";
    }
  }
  if (i === Y && (Object.keys(ue(o)).length > 0 || Object.keys(ue(w)).length > 0)) if (!jr(p) || Array.isArray(p) && p.length > 1) {
    if (Object.keys(ue(o)).length > 0) throw new Error(['Passing props on "Fragment"!', "", `The current component <${n} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(ue(o)).concat(Object.keys(ue(w))).map((y) => `  - ${y}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((y) => `  - ${y}`).join(`
`)].join(`
`));
  } else {
    let y = p.props, g = y == null ? void 0 : y.className, f = typeof g == "function" ? (...c) => wt(g(...c), o.className) : wt(g, o.className), E = f ? { className: f } : {}, h = lr(p.props, ue(mt(o, ["ref"])));
    for (let c in w) c in h && delete w[c];
    return Wr(p, Object.assign({}, h, w, u, { ref: l(dn(p), u.ref) }, E));
  }
  return Ne(i, Object.assign({}, mt(o, ["ref"]), i !== Y && u, i !== Y && w), p);
}
function un() {
  let e = S([]), t = U((r) => {
    for (let n of e.current) n != null && (typeof n == "function" ? n(r) : n.current = r);
  }, []);
  return (...r) => {
    if (!r.every((n) => n == null)) return e.current = r, t;
  };
}
function cn(...e) {
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
function ue(e) {
  let t = Object.assign({}, e);
  for (let r in t) t[r] === void 0 && delete t[r];
  return t;
}
function mt(e, t = []) {
  let r = Object.assign({}, e);
  for (let n of t) n in r && delete r[n];
  return r;
}
function dn(e) {
  return $.version.split(".")[0] >= "19" ? e.props.ref : e.ref;
}
let fn = "span";
var qe = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(qe || {});
function mn(e, t) {
  var r;
  let { features: n = 1, ...l } = e, i = { ref: t, "aria-hidden": (n & 2) === 2 ? !0 : (r = l["aria-hidden"]) != null ? r : void 0, hidden: (n & 4) === 4 ? !0 : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(n & 4) === 4 && (n & 2) !== 2 && { display: "none" } } };
  return G()({ ourProps: i, theirProps: l, slot: {}, defaultTag: fn, name: "Hidden" });
}
let bt = V(mn);
function ir(e) {
  return typeof e != "object" || e === null ? !1 : "nodeType" in e;
}
function ae(e) {
  return ir(e) && "tagName" in e;
}
function me(e) {
  return ae(e) && "accessKey" in e;
}
function oe(e) {
  return ae(e) && "tabIndex" in e;
}
function pn(e) {
  return ae(e) && "style" in e;
}
function hn(e) {
  return me(e) && e.nodeName === "IFRAME";
}
function vn(e) {
  return me(e) && e.nodeName === "INPUT";
}
let or = Symbol();
function gn(e, t = !0) {
  return Object.assign(e, { [or]: t });
}
function J(...e) {
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
function wn() {
  let [e, t] = C([]);
  return [e.length > 0 ? e.join(" ") : void 0, N(() => function(r) {
    let n = M((i) => (t((s) => [...s, i]), () => t((s) => {
      let a = s.slice(), o = a.indexOf(i);
      return o !== -1 && a.splice(o, 1), a;
    }))), l = N(() => ({ register: n, slot: r.slot, name: r.name, props: r.props, value: r.value }), [n, r.slot, r.name, r.props, r.value]);
    return $.createElement(Lt.Provider, { value: l }, r.children);
  }, [t])];
}
let bn = "p";
function yn(e, t) {
  let r = Ie(), n = an(), { id: l = `headlessui-description-${r}`, ...i } = e, s = ar(), a = J(t);
  D(() => s.register(l), [l, s.register]);
  let o = n || !1, u = N(() => ({ ...s.slot, disabled: o }), [s.slot, o]), p = { ref: a, ...s.props, id: l };
  return G()({ ourProps: p, theirProps: i, slot: u, defaultTag: bn, name: s.name || "Description" });
}
let xn = V(yn), En = Object.assign(xn, {});
var sr = ((e) => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(sr || {});
let $n = z(() => {
});
function On({ value: e, children: t }) {
  return $.createElement($n.Provider, { value: e }, t);
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
var Sn = Object.defineProperty, Tn = (e, t, r) => t in e ? Sn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Pn = (e, t, r) => (Tn(e, t + "", r), r), cr = (e, t, r) => {
  if (!t.has(e)) throw TypeError("Cannot " + r);
}, X = (e, t, r) => (cr(e, t, "read from private field"), r ? r.call(e) : t.get(e)), pt = (e, t, r) => {
  if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, r);
}, It = (e, t, r, n) => (cr(e, t, "write to private field"), t.set(e, r), r), Z, Me, Le;
let Mn = class {
  constructor(t) {
    pt(this, Z, {}), pt(this, Me, new ur(() => /* @__PURE__ */ new Set())), pt(this, Le, /* @__PURE__ */ new Set()), Pn(this, "disposables", re()), It(this, Z, t);
  }
  dispose() {
    this.disposables.dispose();
  }
  get state() {
    return X(this, Z);
  }
  subscribe(t, r) {
    let n = { selector: t, callback: r, current: t(X(this, Z)) };
    return X(this, Le).add(n), this.disposables.add(() => {
      X(this, Le).delete(n);
    });
  }
  on(t, r) {
    return X(this, Me).get(t).add(r), this.disposables.add(() => {
      X(this, Me).get(t).delete(r);
    });
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
var Ln = Object.defineProperty, An = (e, t, r) => t in e ? Ln(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, _t = (e, t, r) => (An(e, typeof t != "symbol" ? t + "" : t, r), r), Cn = ((e) => (e[e.Push = 0] = "Push", e[e.Pop = 1] = "Pop", e))(Cn || {});
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
} }, kn = class fr extends Mn {
  constructor() {
    super(...arguments), _t(this, "actions", { push: (t) => this.send({ type: 0, id: t }), pop: (t) => this.send({ type: 1, id: t }) }), _t(this, "selectors", { isTop: (t, r) => t.stack[t.stack.length - 1] === r, inStack: (t, r) => t.stack.includes(r) });
  }
  static new() {
    return new fr({ stack: [] });
  }
  reduce(t, r) {
    return te(r.type, Fn, t, r);
  }
};
const mr = new ur(() => kn.new());
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
var Dt;
function Nn() {
  if (Dt) return vt;
  Dt = 1;
  var e = $;
  function t(o, u) {
    return o === u && (o !== 0 || 1 / o === 1 / u) || o !== o && u !== u;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e.useSyncExternalStore, l = e.useRef, i = e.useEffect, s = e.useMemo, a = e.useDebugValue;
  return vt.useSyncExternalStoreWithSelector = function(o, u, p, w, y) {
    var g = l(null);
    if (g.current === null) {
      var f = { hasValue: !1, value: null };
      g.current = f;
    } else f = g.current;
    g = s(
      function() {
        function h(m) {
          if (!c) {
            if (c = !0, d = m, m = w(m), y !== void 0 && f.hasValue) {
              var x = f.value;
              if (y(x, m))
                return v = x;
            }
            return v = m;
          }
          if (x = v, r(d, m)) return x;
          var O = w(m);
          return y !== void 0 && y(x, O) ? (d = m, x) : (d = m, v = O);
        }
        var c = !1, d, v, b = p === void 0 ? null : p;
        return [
          function() {
            return h(u());
          },
          b === null ? void 0 : function() {
            return h(b());
          }
        ];
      },
      [u, p, w, y]
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
function In() {
  return jt || (jt = 1, process.env.NODE_ENV !== "production" && function() {
    function e(o, u) {
      return o === u && (o !== 0 || 1 / o === 1 / u) || o !== o && u !== u;
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var t = $, r = typeof Object.is == "function" ? Object.is : e, n = t.useSyncExternalStore, l = t.useRef, i = t.useEffect, s = t.useMemo, a = t.useDebugValue;
    gt.useSyncExternalStoreWithSelector = function(o, u, p, w, y) {
      var g = l(null);
      if (g.current === null) {
        var f = { hasValue: !1, value: null };
        g.current = f;
      } else f = g.current;
      g = s(
        function() {
          function h(m) {
            if (!c) {
              if (c = !0, d = m, m = w(m), y !== void 0 && f.hasValue) {
                var x = f.value;
                if (y(x, m))
                  return v = x;
              }
              return v = m;
            }
            if (x = v, r(d, m))
              return x;
            var O = w(m);
            return y !== void 0 && y(x, O) ? (d = m, x) : (d = m, v = O);
          }
          var c = !1, d, v, b = p === void 0 ? null : p;
          return [
            function() {
              return h(u());
            },
            b === null ? void 0 : function() {
              return h(b());
            }
          ];
        },
        [u, p, w, y]
      );
      var E = n(o, g[0], g[1]);
      return i(
        function() {
          f.hasValue = !0, f.value = E;
        },
        [E]
      ), a(E), E;
    }, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  }()), gt;
}
var Wt;
function Rn() {
  return Wt || (Wt = 1, process.env.NODE_ENV === "production" ? Ve.exports = Nn() : Ve.exports = In()), Ve.exports;
}
var _n = Rn();
function pr(e, t, r = dr) {
  return _n.useSyncExternalStoreWithSelector(M((n) => e.subscribe(Dn, n)), M(() => e.state), M(() => e.state), M(t), r);
}
function Dn(e) {
  return e;
}
function Re(e, t) {
  let r = Ie(), n = mr.get(t), [l, i] = pr(n, U((s) => [n.selectors.isTop(s, r), n.selectors.inStack(s, r)], [n, r]));
  return D(() => {
    if (e) return n.actions.push(r), () => n.actions.pop(r);
  }, [n, e, r]), e ? i ? l : !0 : !1;
}
let yt = /* @__PURE__ */ new Map(), Fe = /* @__PURE__ */ new Map();
function Ut(e) {
  var t;
  let r = (t = Fe.get(e)) != null ? t : 0;
  return Fe.set(e, r + 1), r !== 0 ? () => Ht(e) : (yt.set(e, { "aria-hidden": e.getAttribute("aria-hidden"), inert: e.inert }), e.setAttribute("aria-hidden", "true"), e.inert = !0, () => Ht(e));
}
function Ht(e) {
  var t;
  let r = (t = Fe.get(e)) != null ? t : 1;
  if (r === 1 ? Fe.delete(e) : Fe.set(e, r - 1), r !== 1) return;
  let n = yt.get(e);
  n && (n["aria-hidden"] === null ? e.removeAttribute("aria-hidden") : e.setAttribute("aria-hidden", n["aria-hidden"]), e.inert = n.inert, yt.delete(e));
}
function jn(e, { allowed: t, disallowed: r } = {}) {
  let n = Re(e, "inert-others");
  D(() => {
    var l, i;
    if (!n) return;
    let s = re();
    for (let o of (l = r == null ? void 0 : r()) != null ? l : []) o && s.add(Ut(o));
    let a = (i = t == null ? void 0 : t()) != null ? i : [];
    for (let o of a) {
      if (!o) continue;
      let u = Qe(o);
      if (!u) continue;
      let p = o.parentElement;
      for (; p && p !== u.body; ) {
        for (let w of p.children) a.some((y) => w.contains(y)) || s.add(Ut(w));
        p = p.parentElement;
      }
    }
    return s.dispose;
  }, [n, t, r]);
}
function Wn(e, t, r) {
  let n = he((l) => {
    let i = l.getBoundingClientRect();
    i.x === 0 && i.y === 0 && i.width === 0 && i.height === 0 && r();
  });
  L(() => {
    if (!e) return;
    let l = t === null ? null : me(t) ? t : t.current;
    if (!l) return;
    let i = re();
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
let Ke = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e) => `${e}:not([tabindex='-1'])`).join(","), Un = ["[data-autofocus]"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var Q = ((e) => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e[e.AutoFocus = 64] = "AutoFocus", e))(Q || {}), xt = ((e) => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(xt || {}), Hn = ((e) => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(Hn || {});
function Vn(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(Ke)).sort((t, r) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (r.tabIndex || Number.MAX_SAFE_INTEGER)));
}
function Bn(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(Un)).sort((t, r) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (r.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var hr = ((e) => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(hr || {});
function Xn(e, t = 0) {
  var r;
  return e === ((r = Qe(e)) == null ? void 0 : r.body) ? !1 : te(t, { 0() {
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
var zn = ((e) => (e[e.Keyboard = 0] = "Keyboard", e[e.Mouse = 1] = "Mouse", e))(zn || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (e) => {
  e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (e) => {
  e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
function ee(e) {
  e == null || e.focus({ preventScroll: !0 });
}
let Gn = ["textarea", "input"].join(",");
function qn(e) {
  var t, r;
  return (r = (t = e == null ? void 0 : e.matches) == null ? void 0 : t.call(e, Gn)) != null ? r : !1;
}
function Kn(e, t = (r) => r) {
  return e.slice().sort((r, n) => {
    let l = t(r), i = t(n);
    if (l === null || i === null) return 0;
    let s = l.compareDocumentPosition(i);
    return s & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : s & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function ke(e, t, { sorted: r = !0, relativeTo: n = null, skipElements: l = [] } = {}) {
  let i = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : document : e.ownerDocument, s = Array.isArray(e) ? r ? Kn(e) : e : t & 64 ? Bn(e) : Vn(e);
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
  })(), u = t & 32 ? { preventScroll: !0 } : {}, p = 0, w = s.length, y;
  do {
    if (p >= w || p + w <= 0) return 0;
    let g = o + p;
    if (t & 16) g = (g + w) % w;
    else {
      if (g < 0) return 3;
      if (g >= w) return 1;
    }
    y = s[g], y == null || y.focus(u), p += a;
  } while (y !== i.activeElement);
  return t & 6 && qn(y) && y.select(), 2;
}
function vr() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function Yn() {
  return /Android/gi.test(window.navigator.userAgent);
}
function Vt() {
  return vr() || Yn();
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
function Zn(e, t, r) {
  let n = he(r), l = U(function(a, o) {
    if (a.defaultPrevented) return;
    let u = o(a);
    if (u === null || !u.getRootNode().contains(u) || !u.isConnected) return;
    let p = function w(y) {
      return typeof y == "function" ? w(y()) : Array.isArray(y) || y instanceof Set ? y : [y];
    }(t);
    for (let w of p) if (w !== null && (w.contains(u) || a.composed && a.composedPath().includes(w))) return;
    return !Xn(u, hr.Loose) && u.tabIndex !== -1 && a.preventDefault(), n.current(a, u);
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
    if (!(Math.abs(o.x - s.current.x) >= Bt || Math.abs(o.y - s.current.y) >= Bt)) return l(a, () => oe(a.target) ? a.target : null);
  }, !0), gr(e, "blur", (a) => l(a, () => hn(window.document.activeElement) ? window.document.activeElement : null), !0);
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
function Jn(e) {
  return Ur(e.subscribe, e.getSnapshot, e.getSnapshot);
}
function Qn(e, t) {
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
function el() {
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
function tl() {
  return vr() ? { before({ doc: e, d: t, meta: r }) {
    function n(l) {
      return r.containers.flatMap((i) => i()).some((i) => i.contains(l));
    }
    t.microTask(() => {
      var l;
      if (window.getComputedStyle(e.documentElement).scrollBehavior !== "auto") {
        let a = re();
        a.style(e.documentElement, "scrollBehavior", "auto"), t.add(() => t.microTask(() => a.dispose()));
      }
      let i = (l = window.scrollY) != null ? l : window.pageYOffset, s = null;
      t.addEventListener(e, "click", (a) => {
        if (oe(a.target)) try {
          let o = a.target.closest("a");
          if (!o) return;
          let { hash: u } = new URL(o.href), p = e.querySelector(u);
          oe(p) && !n(p) && (s = p);
        } catch {
        }
      }, !0), t.addEventListener(e, "touchstart", (a) => {
        if (oe(a.target) && pn(a.target)) if (n(a.target)) {
          let o = a.target;
          for (; o.parentElement && n(o.parentElement); ) o = o.parentElement;
          t.style(o, "overscrollBehavior", "contain");
        } else t.style(a.target, "touchAction", "none");
      }), t.addEventListener(e, "touchmove", (a) => {
        if (oe(a.target)) {
          if (vn(a.target)) return;
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
function rl() {
  return { before({ doc: e, d: t }) {
    t.style(e.documentElement, "overflow", "hidden");
  } };
}
function nl(e) {
  let t = {};
  for (let r of e) Object.assign(t, r(t));
  return t;
}
let de = Qn(() => /* @__PURE__ */ new Map(), { PUSH(e, t) {
  var r;
  let n = (r = this.get(e)) != null ? r : { doc: e, count: 0, d: re(), meta: /* @__PURE__ */ new Set() };
  return n.count++, n.meta.add(t), this.set(e, n), this;
}, POP(e, t) {
  let r = this.get(e);
  return r && (r.count--, r.meta.delete(t)), this;
}, SCROLL_PREVENT({ doc: e, d: t, meta: r }) {
  let n = { doc: e, d: t, meta: nl(r) }, l = [tl(), el(), rl()];
  l.forEach(({ before: i }) => i == null ? void 0 : i(n)), l.forEach(({ after: i }) => i == null ? void 0 : i(n));
}, SCROLL_ALLOW({ d: e }) {
  e.dispose();
}, TEARDOWN({ doc: e }) {
  this.delete(e);
} });
de.subscribe(() => {
  let e = de.getSnapshot(), t = /* @__PURE__ */ new Map();
  for (let [r] of e) t.set(r, r.documentElement.style.overflow);
  for (let r of e.values()) {
    let n = t.get(r.doc) === "hidden", l = r.count !== 0;
    (l && !n || !l && n) && de.dispatch(r.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", r), r.count === 0 && de.dispatch("TEARDOWN", r);
  }
});
function ll(e, t, r = () => ({ containers: [] })) {
  let n = Jn(de), l = t ? n.get(t) : void 0, i = l ? l.count > 0 : !1;
  return D(() => {
    if (!(!t || !e)) return de.dispatch("PUSH", t, r), () => de.dispatch("POP", t, r);
  }, [e, t]), i;
}
function il(e, t, r = () => [document.body]) {
  let n = Re(e, "scroll-lock");
  ll(n, t, (l) => {
    var i;
    return { containers: [...(i = l.containers) != null ? i : [], r] };
  });
}
function ol(e = 0) {
  let [t, r] = C(e), n = U((o) => r(o), [t]), l = U((o) => r((u) => u | o), [t]), i = U((o) => (t & o) === o, [t]), s = U((o) => r((u) => u & ~o), [r]), a = U((o) => r((u) => u ^ o), [r]);
  return { flags: t, setFlag: n, addFlag: l, hasFlag: i, removeFlag: s, toggleFlag: a };
}
var Xt, zt;
typeof process < "u" && typeof globalThis < "u" && typeof Element < "u" && ((Xt = process == null ? void 0 : process.env) == null ? void 0 : Xt.NODE_ENV) === "test" && typeof ((zt = Element == null ? void 0 : Element.prototype) == null ? void 0 : zt.getAnimations) > "u" && (Element.prototype.getAnimations = function() {
  return console.warn(["Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.", "Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.", "", "Example usage:", "```js", "import { mockAnimationsApi } from 'jsdom-testing-mocks'", "mockAnimationsApi()", "```"].join(`
`)), [];
});
var al = ((e) => (e[e.None = 0] = "None", e[e.Closed = 1] = "Closed", e[e.Enter = 2] = "Enter", e[e.Leave = 4] = "Leave", e))(al || {});
function sl(e) {
  let t = {};
  for (let r in e) e[r] === !0 && (t[`data-${r}`] = "");
  return t;
}
function ul(e, t, r, n) {
  let [l, i] = C(r), { hasFlag: s, addFlag: a, removeFlag: o } = ol(e && l ? 3 : 0), u = S(!1), p = S(!1), w = Mt();
  return D(() => {
    var y;
    if (e) {
      if (r && i(!0), !t) {
        r && a(3);
        return;
      }
      return (y = n == null ? void 0 : n.start) == null || y.call(n, r), cl(t, { inFlight: u, prepare() {
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
function cl(e, { prepare: t, run: r, done: n, inFlight: l }) {
  let i = re();
  return fl(e, { prepare: t, inFlight: l }), i.nextFrame(() => {
    r(), i.requestAnimationFrame(() => {
      i.add(dl(e, n));
    });
  }), i.dispose;
}
function dl(e, t) {
  var r, n;
  let l = re();
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
function fl(e, { inFlight: t, prepare: r }) {
  if (t != null && t.current) {
    r();
    return;
  }
  let n = e.style.transition;
  e.style.transition = "none", r(), e.offsetHeight, e.style.transition = n;
}
function At(e, t) {
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
function ml({ value: e, children: t }) {
  return $.createElement(rt.Provider, { value: e }, t);
}
function pl({ children: e }) {
  return $.createElement(rt.Provider, { value: null }, e);
}
function hl(e) {
  function t() {
    document.readyState !== "loading" && (e(), document.removeEventListener("DOMContentLoaded", t));
  }
  typeof window < "u" && typeof document < "u" && (document.addEventListener("DOMContentLoaded", t), t());
}
let le = [];
hl(() => {
  function e(t) {
    if (!oe(t.target) || t.target === document.body || le[0] === t.target) return;
    let r = t.target;
    r = r.closest(Ke), le.unshift(r ?? t.target), le = le.filter((n) => n != null && n.isConnected), le.splice(10);
  }
  window.addEventListener("click", e, { capture: !0 }), window.addEventListener("mousedown", e, { capture: !0 }), window.addEventListener("focus", e, { capture: !0 }), document.body.addEventListener("click", e, { capture: !0 }), document.body.addEventListener("mousedown", e, { capture: !0 }), document.body.addEventListener("focus", e, { capture: !0 });
});
function br(e) {
  let t = M(e), r = S(!1);
  L(() => (r.current = !1, () => {
    r.current = !0, et(() => {
      r.current && t();
    });
  }), [t]);
}
function vl() {
  let e = typeof document > "u";
  return "useSyncExternalStore" in Ce ? ((t) => t.useSyncExternalStore)(Ce)(() => () => {
  }, () => !1, () => !e) : !1;
}
function _e() {
  let e = vl(), [t, r] = Ce.useState(fe.isHandoffComplete);
  return t && fe.isHandoffComplete === !1 && r(!1), Ce.useEffect(() => {
    t !== !0 && r(!0);
  }, [t]), Ce.useEffect(() => fe.handoff(), []), e ? !1 : t;
}
let yr = z(!1);
function gl() {
  return H(yr);
}
function Gt(e) {
  return $.createElement(yr.Provider, { value: e.force }, e.children);
}
function wl(e) {
  let t = gl(), r = H(Er), [n, l] = C(() => {
    var i;
    if (!t && r !== null) return (i = r.current) != null ? i : null;
    if (fe.isServer) return null;
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
  let { ownerDocument: r = null, ...n } = e, l = S(null), i = J(gn((g) => {
    l.current = g;
  }), t), s = tt(l), a = r ?? s, o = wl(a), [u] = C(() => {
    var g;
    return fe.isServer ? null : (g = a == null ? void 0 : a.createElement("div")) != null ? g : null;
  }), p = H(Et), w = _e();
  D(() => {
    !o || !u || o.contains(u) || (u.setAttribute("data-headlessui-portal", ""), o.appendChild(u));
  }, [o, u]), D(() => {
    if (u && p) return p.register(u);
  }, [p, u]), br(() => {
    var g;
    !o || !u || (ir(u) && o.contains(u) && o.removeChild(u), o.childNodes.length <= 0 && ((g = o.parentElement) == null || g.removeChild(o)));
  });
  let y = G();
  return w ? !o || !u ? null : zr(y({ ourProps: { ref: i }, theirProps: n, slot: {}, defaultTag: xr, name: "Portal" }), u) : null;
});
function yl(e, t) {
  let r = J(t), { enabled: n = !0, ownerDocument: l, ...i } = e, s = G();
  return n ? $.createElement(bl, { ...i, ownerDocument: l, ref: r }) : s({ ourProps: { ref: r }, theirProps: i, slot: {}, defaultTag: xr, name: "Portal" });
}
let xl = Y, Er = z(null);
function El(e, t) {
  let { target: r, ...n } = e, l = { ref: J(t) }, i = G();
  return $.createElement(Er.Provider, { value: r }, i({ ourProps: l, theirProps: n, defaultTag: xl, name: "Popover.Group" }));
}
let Et = z(null);
function $l() {
  let e = H(Et), t = S([]), r = M((i) => (t.current.push(i), e && e.register(i), () => n(i))), n = M((i) => {
    let s = t.current.indexOf(i);
    s !== -1 && t.current.splice(s, 1), e && e.unregister(i);
  }), l = N(() => ({ register: r, unregister: n, portals: t }), [r, n, t]);
  return [t, N(() => function({ children: i }) {
    return $.createElement(Et.Provider, { value: l }, i);
  }, [l])];
}
let Ol = V(yl), $r = V(El), Sl = Object.assign(Ol, { Group: $r });
function Tl(e, t = typeof document < "u" ? document.defaultView : null, r) {
  let n = Re(e, "escape");
  wr(t, "keydown", (l) => {
    n && (l.defaultPrevented || l.key === sr.Escape && r(l));
  });
}
function Pl() {
  var e;
  let [t] = C(() => typeof window < "u" && typeof window.matchMedia == "function" ? window.matchMedia("(pointer: coarse)") : null), [r, n] = C((e = t == null ? void 0 : t.matches) != null ? e : !1);
  return D(() => {
    if (!t) return;
    function l(i) {
      n(i.matches);
    }
    return t.addEventListener("change", l), () => t.removeEventListener("change", l);
  }, [t]), r;
}
function Ml({ defaultContainers: e = [], portals: t, mainTreeNode: r } = {}) {
  let n = tt(r), l = M(() => {
    var i, s;
    let a = [];
    for (let o of e) o !== null && (ae(o) ? a.push(o) : "current" in o && ae(o.current) && a.push(o.current));
    if (t != null && t.current) for (let o of t.current) a.push(o);
    for (let o of (i = n == null ? void 0 : n.querySelectorAll("html > *, body > *")) != null ? i : []) o !== document.body && o !== document.head && ae(o) && o.id !== "headlessui-portal-root" && (r && (o.contains(r) || o.contains((s = r == null ? void 0 : r.getRootNode()) == null ? void 0 : s.host)) || a.some((u) => o.contains(u)) || a.push(o));
    return a;
  });
  return { resolveContainers: l, contains: M((i) => l().some((s) => s.contains(i))) };
}
let Or = z(null);
function qt({ children: e, node: t }) {
  let [r, n] = C(null), l = Sr(t ?? r);
  return $.createElement(Or.Provider, { value: l }, e, l === null && $.createElement(bt, { features: qe.Hidden, ref: (i) => {
    var s, a;
    if (i) {
      for (let o of (a = (s = Qe(i)) == null ? void 0 : s.querySelectorAll("html > *, body > *")) != null ? a : []) if (o !== document.body && o !== document.head && ae(o) && o != null && o.contains(i)) {
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
function Ct() {
  let e = S(!1);
  return D(() => (e.current = !0, () => {
    e.current = !1;
  }), []), e;
}
var Ae = ((e) => (e[e.Forwards = 0] = "Forwards", e[e.Backwards = 1] = "Backwards", e))(Ae || {});
function Ll() {
  let e = S(0);
  return gr(!0, "keydown", (t) => {
    t.key === "Tab" && (e.current = t.shiftKey ? 1 : 0);
  }, !0), e;
}
function Tr(e) {
  if (!e) return /* @__PURE__ */ new Set();
  if (typeof e == "function") return new Set(e());
  let t = /* @__PURE__ */ new Set();
  for (let r of e.current) ae(r.current) && t.add(r.current);
  return t;
}
let Al = "div";
var ce = ((e) => (e[e.None = 0] = "None", e[e.InitialFocus = 1] = "InitialFocus", e[e.TabLock = 2] = "TabLock", e[e.FocusLock = 4] = "FocusLock", e[e.RestoreFocus = 8] = "RestoreFocus", e[e.AutoFocus = 16] = "AutoFocus", e))(ce || {});
function Cl(e, t) {
  let r = S(null), n = J(r, t), { initialFocus: l, initialFocusFallback: i, containers: s, features: a = 15, ...o } = e;
  _e() || (a = 0);
  let u = tt(r);
  Il(a, { ownerDocument: u });
  let p = Rl(a, { ownerDocument: u, container: r, initialFocus: l, initialFocusFallback: i });
  _l(a, { ownerDocument: u, container: r, containers: s, previousActiveElement: p });
  let w = Ll(), y = M((d) => {
    if (!me(r.current)) return;
    let v = r.current;
    ((b) => b())(() => {
      te(w.current, { [Ae.Forwards]: () => {
        ke(v, Q.First, { skipElements: [d.relatedTarget, i] });
      }, [Ae.Backwards]: () => {
        ke(v, Q.Last, { skipElements: [d.relatedTarget, i] });
      } });
    });
  }), g = Re(!!(a & 2), "focus-trap#tab-lock"), f = Mt(), E = S(!1), h = { ref: n, onKeyDown(d) {
    d.key == "Tab" && (E.current = !0, f.requestAnimationFrame(() => {
      E.current = !1;
    }));
  }, onBlur(d) {
    if (!(a & 4)) return;
    let v = Tr(s);
    me(r.current) && v.add(r.current);
    let b = d.relatedTarget;
    oe(b) && b.dataset.headlessuiFocusGuard !== "true" && (Pr(v, b) || (E.current ? ke(r.current, te(w.current, { [Ae.Forwards]: () => Q.Next, [Ae.Backwards]: () => Q.Previous }) | Q.WrapAround, { relativeTo: d.target }) : oe(d.target) && ee(d.target)));
  } }, c = G();
  return $.createElement($.Fragment, null, g && $.createElement(bt, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: y, features: qe.Focusable }), c({ ourProps: h, theirProps: o, defaultTag: Al, name: "FocusTrap" }), g && $.createElement(bt, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: y, features: qe.Focusable }));
}
let Fl = V(Cl), kl = Object.assign(Fl, { features: ce });
function Nl(e = !0) {
  let t = S(le.slice());
  return At(([r], [n]) => {
    n === !0 && r === !1 && et(() => {
      t.current.splice(0);
    }), n === !1 && r === !0 && (t.current = le.slice());
  }, [e, le, t]), M(() => {
    var r;
    return (r = t.current.find((n) => n != null && n.isConnected)) != null ? r : null;
  });
}
function Il(e, { ownerDocument: t }) {
  let r = !!(e & 8), n = Nl(r);
  At(() => {
    r || (t == null ? void 0 : t.activeElement) === (t == null ? void 0 : t.body) && ee(n());
  }, [r]), br(() => {
    r && ee(n());
  });
}
function Rl(e, { ownerDocument: t, container: r, initialFocus: n, initialFocusFallback: l }) {
  let i = S(null), s = Re(!!(e & 1), "focus-trap#initial-focus"), a = Ct();
  return At(() => {
    if (e === 0) return;
    if (!s) {
      l != null && l.current && ee(l.current);
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
      if (n != null && n.current) ee(n.current);
      else {
        if (e & 16) {
          if (ke(o, Q.First | Q.AutoFocus) !== xt.Error) return;
        } else if (ke(o, Q.First) !== xt.Error) return;
        if (l != null && l.current && (ee(l.current), (t == null ? void 0 : t.activeElement) === l.current)) return;
        console.warn("There are no focusable elements inside the <FocusTrap />");
      }
      i.current = t == null ? void 0 : t.activeElement;
    });
  }, [l, s, e]), i;
}
function _l(e, { ownerDocument: t, container: r, containers: n, previousActiveElement: l }) {
  let i = Ct(), s = !!(e & 4);
  wr(t == null ? void 0 : t.defaultView, "focus", (a) => {
    if (!s || !i.current) return;
    let o = Tr(n);
    me(r.current) && o.add(r.current);
    let u = l.current;
    if (!u) return;
    let p = a.target;
    me(p) ? Pr(o, p) ? (l.current = p, ee(p)) : (a.preventDefault(), a.stopPropagation(), ee(u)) : ee(l.current);
  }, !0);
}
function Pr(e, t) {
  for (let r of e) if (r.contains(t)) return !0;
  return !1;
}
function Mr(e) {
  var t;
  return !!(e.enter || e.enterFrom || e.enterTo || e.leave || e.leaveFrom || e.leaveTo) || ((t = e.as) != null ? t : Ar) !== Y || $.Children.count(e.children) === 1;
}
let lt = z(null);
lt.displayName = "TransitionContext";
var Dl = ((e) => (e.Visible = "visible", e.Hidden = "hidden", e))(Dl || {});
function jl() {
  let e = H(lt);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
function Wl() {
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
  let r = he(e), n = S([]), l = Ct(), i = Mt(), s = M((g, f = ie.Hidden) => {
    let E = n.current.findIndex(({ el: h }) => h === g);
    E !== -1 && (te(f, { [ie.Unmount]() {
      n.current.splice(E, 1);
    }, [ie.Hidden]() {
      n.current[E].state = "hidden";
    } }), i.microTask(() => {
      var h;
      !ot(n) && l.current && ((h = r.current) == null || h.call(r));
    }));
  }), a = M((g) => {
    let f = n.current.find(({ el: E }) => E === g);
    return f ? f.state !== "visible" && (f.state = "visible") : n.current.push({ el: g, state: "visible" }), () => s(g, ie.Unmount);
  }), o = S([]), u = S(Promise.resolve()), p = S({ enter: [], leave: [] }), w = M((g, f, E) => {
    o.current.splice(0), t && (t.chains.current[f] = t.chains.current[f].filter(([h]) => h !== g)), t == null || t.chains.current[f].push([g, new Promise((h) => {
      o.current.push(h);
    })]), t == null || t.chains.current[f].push([g, new Promise((h) => {
      Promise.all(p.current[f].map(([c, d]) => d)).then(() => h());
    })]), f === "enter" ? u.current = u.current.then(() => t == null ? void 0 : t.wait.current).then(() => E(f)) : E(f);
  }), y = M((g, f, E) => {
    Promise.all(p.current[f].splice(0).map(([h, c]) => c)).then(() => {
      var h;
      (h = o.current.shift()) == null || h();
    }).then(() => E(f));
  });
  return N(() => ({ children: n, register: a, unregister: s, onStart: w, onStop: y, wait: u, chains: p }), [a, s, n, w, y, p, u]);
}
let Ar = Y, Cr = Ge.RenderStrategy;
function Ul(e, t) {
  var r, n;
  let { transition: l = !0, beforeEnter: i, afterEnter: s, beforeLeave: a, afterLeave: o, enter: u, enterFrom: p, enterTo: w, entered: y, leave: g, leaveFrom: f, leaveTo: E, ...h } = e, [c, d] = C(null), v = S(null), b = Mr(e), m = J(...b ? [v, t, d] : t === null ? [] : [t]), x = (r = h.unmount) == null || r ? ie.Unmount : ie.Hidden, { show: O, appear: I, initial: j } = jl(), [F, R] = C(O ? "visible" : "hidden"), B = Wl(), { register: _, unregister: A } = B;
  D(() => _(v), [_, v]), D(() => {
    if (x === ie.Hidden && v.current) {
      if (O && F !== "visible") {
        R("visible");
        return;
      }
      return te(F, { hidden: () => A(v), visible: () => _(v) });
    }
  }, [F, v, _, A, O, x]);
  let W = _e();
  D(() => {
    if (b && W && F === "visible" && v.current === null) throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
  }, [v, F, W, b]);
  let ve = j && !I, se = I && O && j, k = S(!1), ge = Lr(() => {
    k.current || (R("hidden"), A(v));
  }, B), De = M((ut) => {
    k.current = !0;
    let We = ut ? "enter" : "leave";
    ge.onStart(v, We, (Oe) => {
      Oe === "enter" ? i == null || i() : Oe === "leave" && (a == null || a());
    });
  }), ne = M((ut) => {
    let We = ut ? "enter" : "leave";
    k.current = !1, ge.onStop(v, We, (Oe) => {
      Oe === "enter" ? s == null || s() : Oe === "leave" && (o == null || o());
    }), We === "leave" && !ot(ge) && (R("hidden"), A(v));
  });
  L(() => {
    b && l || (De(O), ne(O));
  }, [O, b, l]);
  let st = !(!l || !b || !W || ve), [, T] = ul(st, c, O, { start: De, end: ne }), je = ue({ ref: m, className: ((n = wt(h.className, se && u, se && p, T.enter && u, T.enter && T.closed && p, T.enter && !T.closed && w, T.leave && g, T.leave && !T.closed && f, T.leave && T.closed && E, !T.transition && O && y)) == null ? void 0 : n.trim()) || void 0, ...sl(T) }), $e = 0;
  F === "visible" && ($e |= K.Open), F === "hidden" && ($e |= K.Closed), O && F === "hidden" && ($e |= K.Opening), !O && F === "visible" && ($e |= K.Closing);
  let Ir = G();
  return $.createElement(it.Provider, { value: ge }, $.createElement(ml, { value: $e }, Ir({ ourProps: je, theirProps: h, defaultTag: Ar, features: Cr, visible: F === "visible", name: "Transition.Child" })));
}
function Hl(e, t) {
  let { show: r, appear: n = !1, unmount: l = !0, ...i } = e, s = S(null), a = Mr(e), o = J(...a ? [s, t] : t === null ? [] : [t]);
  _e();
  let u = nt();
  if (r === void 0 && u !== null && (r = (u & K.Open) === K.Open), r === void 0) throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
  let [p, w] = C(r ? "visible" : "hidden"), y = Lr(() => {
    r || w("hidden");
  }), [g, f] = C(!0), E = S([r]);
  D(() => {
    g !== !1 && E.current[E.current.length - 1] !== r && (E.current.push(r), f(!1));
  }, [E, r]);
  let h = N(() => ({ show: r, appear: n, initial: g }), [r, n, g]);
  D(() => {
    r ? w("visible") : !ot(y) && s.current !== null && w("hidden");
  }, [r, y]);
  let c = { unmount: l }, d = M(() => {
    var m;
    g && f(!1), (m = e.beforeEnter) == null || m.call(e);
  }), v = M(() => {
    var m;
    g && f(!1), (m = e.beforeLeave) == null || m.call(e);
  }), b = G();
  return $.createElement(it.Provider, { value: y }, $.createElement(lt.Provider, { value: h }, b({ ourProps: { ...c, as: Y, children: $.createElement(Fr, { ref: o, ...c, ...i, beforeEnter: d, beforeLeave: v }) }, theirProps: {}, defaultTag: Y, features: Cr, visible: p === "visible", name: "Transition" })));
}
function Vl(e, t) {
  let r = H(lt) !== null, n = nt() !== null;
  return $.createElement($.Fragment, null, !r && n ? $.createElement($t, { ref: t, ...e }) : $.createElement(Fr, { ref: t, ...e }));
}
let $t = V(Hl), Fr = V(Ul), Ee = V(Vl), kr = Object.assign($t, { Child: Ee, Root: $t });
var Bl = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(Bl || {}), Xl = ((e) => (e[e.SetTitleId = 0] = "SetTitleId", e))(Xl || {});
let zl = { 0(e, t) {
  return e.titleId === t.id ? e : { ...e, titleId: t.id };
} }, Ft = z(null);
Ft.displayName = "DialogContext";
function at(e) {
  let t = H(Ft);
  if (t === null) {
    let r = new Error(`<${e} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(r, at), r;
  }
  return t;
}
function Gl(e, t) {
  return te(t.type, zl, e, t);
}
let Kt = V(function(e, t) {
  let r = Ie(), { id: n = `headlessui-dialog-${r}`, open: l, onClose: i, initialFocus: s, role: a = "dialog", autoFocus: o = !0, __demoMode: u = !1, unmount: p = !1, ...w } = e, y = S(!1);
  a = function() {
    return a === "dialog" || a === "alertdialog" ? a : (y.current || (y.current = !0, console.warn(`Invalid role [${a}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog");
  }();
  let g = nt();
  l === void 0 && g !== null && (l = (g & K.Open) === K.Open);
  let f = S(null), E = J(f, t), h = tt(f), c = l ? 0 : 1, [d, v] = Hr(Gl, { titleId: null, descriptionId: null, panelRef: Vr() }), b = M(() => i(!1)), m = M((T) => v({ type: 0, id: T })), x = _e() ? c === 0 : !1, [O, I] = $l(), j = { get current() {
    var T;
    return (T = d.panelRef.current) != null ? T : f.current;
  } }, F = Sr(), { resolveContainers: R } = Ml({ mainTreeNode: F, portals: O, defaultContainers: [j] }), B = g !== null ? (g & K.Closing) === K.Closing : !1;
  jn(u || B ? !1 : x, { allowed: M(() => {
    var T, je;
    return [(je = (T = f.current) == null ? void 0 : T.closest("[data-headlessui-portal]")) != null ? je : null];
  }), disallowed: M(() => {
    var T;
    return [(T = F == null ? void 0 : F.closest("body > *:not(#headlessui-portal-root)")) != null ? T : null];
  }) });
  let _ = mr.get(null);
  D(() => {
    if (x) return _.actions.push(n), () => _.actions.pop(n);
  }, [_, n, x]);
  let A = pr(_, U((T) => _.selectors.isTop(T, n), [_, n]));
  Zn(A, R, (T) => {
    T.preventDefault(), b();
  }), Tl(A, h == null ? void 0 : h.defaultView, (T) => {
    T.preventDefault(), T.stopPropagation(), document.activeElement && "blur" in document.activeElement && typeof document.activeElement.blur == "function" && document.activeElement.blur(), b();
  }), il(u || B ? !1 : x, h, R), Wn(x, f, b);
  let [W, ve] = wn(), se = N(() => [{ dialogState: c, close: b, setTitleId: m, unmount: p }, d], [c, d, b, m, p]), k = N(() => ({ open: c === 0 }), [c]), ge = { ref: E, id: n, role: a, tabIndex: -1, "aria-modal": u ? void 0 : c === 0 ? !0 : void 0, "aria-labelledby": d.titleId, "aria-describedby": W, unmount: p }, De = !Pl(), ne = ce.None;
  x && !u && (ne |= ce.RestoreFocus, ne |= ce.TabLock, o && (ne |= ce.AutoFocus), De && (ne |= ce.InitialFocus));
  let st = G();
  return $.createElement(pl, null, $.createElement(Gt, { force: !0 }, $.createElement(Sl, null, $.createElement(Ft.Provider, { value: se }, $.createElement($r, { target: f }, $.createElement(Gt, { force: !1 }, $.createElement(ve, { slot: k }, $.createElement(I, null, $.createElement(kl, { initialFocus: s, initialFocusFallback: f, containers: R, features: ne }, $.createElement(On, { value: b }, st({ ourProps: ge, theirProps: w, slot: k, defaultTag: ql, features: Kl, visible: c === 0, name: "Dialog" })))))))))));
}), ql = "div", Kl = Ge.RenderStrategy | Ge.Static;
function Yl(e, t) {
  let { transition: r = !1, open: n, ...l } = e, i = nt(), s = e.hasOwnProperty("open") || i !== null, a = e.hasOwnProperty("onClose");
  if (!s && !a) throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");
  if (!s) throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");
  if (!a) throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");
  if (!i && typeof e.open != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${e.open}`);
  if (typeof e.onClose != "function") throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${e.onClose}`);
  return (n !== void 0 || r) && !l.static ? $.createElement(qt, null, $.createElement(kr, { show: n, transition: r, unmount: l.unmount }, $.createElement(Kt, { ref: t, ...l }))) : $.createElement(qt, null, $.createElement(Kt, { ref: t, open: n, ...l }));
}
let Zl = "div";
function Jl(e, t) {
  let r = Ie(), { id: n = `headlessui-dialog-panel-${r}`, transition: l = !1, ...i } = e, [{ dialogState: s, unmount: a }, o] = at("Dialog.Panel"), u = J(t, o.panelRef), p = N(() => ({ open: s === 0 }), [s]), w = M((h) => {
    h.stopPropagation();
  }), y = { ref: u, id: n, onClick: w }, g = l ? Ee : Y, f = l ? { unmount: a } : {}, E = G();
  return $.createElement(g, { ...f }, E({ ourProps: y, theirProps: i, slot: p, defaultTag: Zl, name: "Dialog.Panel" }));
}
let Ql = "div";
function ei(e, t) {
  let { transition: r = !1, ...n } = e, [{ dialogState: l, unmount: i }] = at("Dialog.Backdrop"), s = N(() => ({ open: l === 0 }), [l]), a = { ref: t, "aria-hidden": !0 }, o = r ? Ee : Y, u = r ? { unmount: i } : {}, p = G();
  return $.createElement(o, { ...u }, p({ ourProps: a, theirProps: n, slot: s, defaultTag: Ql, name: "Dialog.Backdrop" }));
}
let ti = "h2";
function ri(e, t) {
  let r = Ie(), { id: n = `headlessui-dialog-title-${r}`, ...l } = e, [{ dialogState: i, setTitleId: s }] = at("Dialog.Title"), a = J(t);
  L(() => (s(n), () => s(null)), [n, s]);
  let o = N(() => ({ open: i === 0 }), [i]), u = { ref: a, id: n };
  return G()({ ourProps: u, theirProps: l, slot: o, defaultTag: ti, name: "Dialog.Title" });
}
let ni = V(Yl), kt = V(Jl);
V(ei);
let li = V(ri), ii = Object.assign(ni, { Panel: kt, Title: li, Description: En });
function Nr({ onClick: e }) {
  return /* @__PURE__ */ pe(
    "button",
    {
      type: "button",
      className: "im-close-button text-gray-400 hover:text-gray-500",
      onClick: e,
      children: [
        /* @__PURE__ */ P("span", { className: "sr-only", children: "Close" }),
        /* @__PURE__ */ P(
          "svg",
          {
            className: "size-6",
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: "2",
            stroke: "currentColor",
            "aria-hidden": "true",
            children: /* @__PURE__ */ P(
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
const oi = ({ modalContext: e, config: t, children: r }) => {
  const [n, l] = C(!1);
  return /* @__PURE__ */ P("div", { className: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4", children: /* @__PURE__ */ P(
    "div",
    {
      className: ze("im-modal-positioner flex min-h-full justify-center", {
        "items-start": t.position === "top",
        "items-center": t.position === "center",
        "items-end": t.position === "bottom"
      }),
      children: /* @__PURE__ */ P(
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
            kt,
            {
              className: `im-modal-content relative ${t.paddingClasses} ${t.panelClasses}`,
              "data-inertiaui-modal-entered": n,
              children: [
                t.closeButton && /* @__PURE__ */ P("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ P(Nr, { onClick: e.close }) }),
                typeof r == "function" ? r({ modalContext: e, config: t }) : r
              ]
            }
          )
        }
      )
    }
  ) });
}, ai = ({ modalContext: e, config: t, children: r }) => {
  const [n, l] = C(!1);
  return /* @__PURE__ */ P("div", { className: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ P(
    "div",
    {
      className: ze("im-slideover-positioner flex min-h-full items-center", {
        "justify-start rtl:justify-end": (t == null ? void 0 : t.position) === "left",
        "justify-end rtl:justify-start": (t == null ? void 0 : t.position) === "right"
      }),
      children: /* @__PURE__ */ P(
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
            kt,
            {
              className: `im-slideover-content relative ${t.paddingClasses} ${t.panelClasses}`,
              "data-inertiaui-modal-entered": n,
              children: [
                t.closeButton && /* @__PURE__ */ P("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ P(Nr, { onClick: e.close }) }),
                typeof r == "function" ? r({ modalContext: e, config: t }) : r
              ]
            }
          )
        }
      )
    }
  ) });
}, si = Ot(({ name: e, children: t, onFocus: r = null, onBlur: n = null, onClose: l = null, onSuccess: i = null, onAfterLeave: s = null, ...a }, o) => {
  const u = (w) => typeof t == "function" ? t(w) : t, p = S(null);
  return Yt(o, () => p.current, [p]), /* @__PURE__ */ P(
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
        close: y,
        config: g,
        emit: f,
        getChildModal: E,
        getParentModal: h,
        id: c,
        index: d,
        isOpen: v,
        modalContext: b,
        onTopOfStack: m,
        reload: x,
        setOpen: O,
        shouldRender: I
      }) => /* @__PURE__ */ P(
        kr,
        {
          appear: !0,
          show: v ?? !1,
          afterLeave: s,
          children: /* @__PURE__ */ pe(
            ii,
            {
              as: "div",
              className: "im-dialog relative z-20",
              onClose: () => g.closeExplicitly ? null : y(),
              "data-inertiaui-modal-id": c,
              "data-inertiaui-modal-index": d,
              children: [
                d === 0 ? /* @__PURE__ */ P(
                  Ee,
                  {
                    enter: "transition transform ease-in-out duration-300",
                    enterFrom: "opacity-0",
                    enterTo: "opacity-100",
                    leave: "transition transform ease-in-out duration-300",
                    leaveFrom: "opacity-100",
                    leaveTo: "opacity-0",
                    children: m ? /* @__PURE__ */ P(
                      "div",
                      {
                        className: "im-backdrop fixed inset-0 z-30 bg-black/75",
                        "aria-hidden": "true"
                      }
                    ) : /* @__PURE__ */ P("div", {})
                  }
                ) : null,
                d > 0 && m ? /* @__PURE__ */ P("div", { className: "im-backdrop fixed inset-0 z-30 bg-black/75" }) : null,
                g.slideover ? /* @__PURE__ */ P(
                  ai,
                  {
                    modalContext: b,
                    config: g,
                    children: u({
                      afterLeave: w,
                      close: y,
                      config: g,
                      emit: f,
                      getChildModal: E,
                      getParentModal: h,
                      id: c,
                      index: d,
                      isOpen: v,
                      modalContext: b,
                      onTopOfStack: m,
                      reload: x,
                      setOpen: O,
                      shouldRender: I
                    })
                  }
                ) : /* @__PURE__ */ P(
                  oi,
                  {
                    modalContext: b,
                    config: g,
                    children: u({
                      afterLeave: w,
                      close: y,
                      config: g,
                      emit: f,
                      getChildModal: E,
                      getParentModal: h,
                      id: c,
                      index: d,
                      isOpen: v,
                      modalContext: b,
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
si.displayName = "Modal";
const $i = ({
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
  onSuccess: y = null,
  navigate: g = null,
  children: f,
  ...E
}) => {
  const [h, c] = C(!1), [d, v] = C(null), { stack: b, visit: m } = Je(), x = N(() => g ?? Tt("navigate"), [g]), O = {}, I = {};
  Object.keys(E).forEach((A) => {
    Nt.includes(A) || (A.startsWith("on") && typeof E[A] == "function" ? A.toLowerCase() in window ? O[A] = E[A] : I[A] = E[A] : O[A] = E[A]);
  });
  const [j, F] = C(!1);
  L(() => {
    d && (d.onTopOfStack && j ? p == null || p() : !d.onTopOfStack && !j && (a == null || a()), F(!d.onTopOfStack));
  }, [b]);
  const R = U(() => {
    o == null || o();
  }, [o]), B = U(() => {
    v(null), s == null || s();
  }, [s]), _ = U(
    (A) => {
      A == null || A.preventDefault(), !h && (e.startsWith("#") || (c(!0), w == null || w()), m(
        e,
        t,
        r,
        l,
        Zr(Yr(E, Nt)),
        () => R(b.length),
        B,
        i,
        x
      ).then((W) => {
        v(W), W.registerEventListenersFromProps(I), y == null || y();
      }).catch((W) => {
        console.error(W), u == null || u(W);
      }).finally(() => c(!1)));
    },
    [e, t, r, l, i, E, R, B]
  );
  return /* @__PURE__ */ P(
    n,
    {
      ...O,
      href: e,
      onClick: _,
      children: typeof f == "function" ? f({ loading: h }) : f
    }
  );
}, ui = ({ children: e, data: t, params: r, buffer: n, as: l, always: i, fallback: s }) => {
  i = i ?? !1, l = l ?? "div", s = s ?? null;
  const [a, o] = C(!1), u = S(!1), p = S(!1), w = S(null), y = tr(), g = U(() => {
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
        y.reload({
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
ui.displayName = "InertiaWhenVisible";
const Oi = (e) => (t) => (t.default.layout = (r) => Ne(e, {}, r), t);
export {
  tn as Deferred,
  rr as HeadlessModal,
  si as Modal,
  $i as ModalLink,
  en as ModalRoot,
  Jr as ModalStackProvider,
  ui as WhenVisible,
  Tt as getConfig,
  Qr as initFromPageProps,
  wi as putConfig,
  bi as renderApp,
  gi as resetConfig,
  Oi as setPageLayout,
  tr as useModal,
  Qt as useModalIndex,
  Je as useModalStack
};
