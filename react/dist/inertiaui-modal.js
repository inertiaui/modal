var mn = Object.defineProperty;
var pn = (e, t, n) => t in e ? mn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var q = (e, t, n) => pn(e, typeof t != "symbol" ? t + "" : t, n);
import * as Oe from "react";
import $, { createContext as _, useContext as j, useEffect as M, useRef as O, useState as S, createElement as Me, useMemo as C, forwardRef as dt, useImperativeHandle as Ft, useLayoutEffect as hn, useCallback as W, Fragment as z, isValidElement as vn, cloneElement as gn, useId as Le, useSyncExternalStore as wn, useReducer as yn, createRef as xn } from "react";
import { jsxs as se, Fragment as ft, jsx as P } from "react/jsx-runtime";
import De from "axios";
import { usePage as bn, router as Ee } from "@inertiajs/react";
import { mergeDataIntoQueryString as En } from "@inertiajs/core";
import { createPortal as $n } from "react-dom";
const ye = {
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
class On {
  constructor() {
    this.config = {}, this.reset();
  }
  reset() {
    this.config = JSON.parse(JSON.stringify(ye));
  }
  put(t, n) {
    if (typeof t == "object") {
      this.config = {
        type: t.type ?? ye.type,
        navigate: t.navigate ?? ye.navigate,
        modal: { ...ye.modal, ...t.modal ?? {} },
        slideover: { ...ye.slideover, ...t.slideover ?? {} }
      };
      return;
    }
    const r = t.split(".");
    let l = this.config;
    for (let i = 0; i < r.length - 1; i++)
      l = l[r[i]] = l[r[i]] || {};
    l[r[r.length - 1]] = n;
  }
  get(t) {
    if (typeof t > "u")
      return this.config;
    const n = t.split(".");
    let r = this.config;
    for (const l of n) {
      if (r[l] === void 0)
        return null;
      r = r[l];
    }
    return r;
  }
}
const _e = new On(), Al = () => _e.reset(), Nl = (e, t) => _e.put(e, t), mt = (e) => _e.get(e), ce = (e, t) => _e.get(e ? `slideover.${t}` : `modal.${t}`);
function Tn(e, t) {
  return e = typeof e == "string" ? new URL(e, window.location.origin) : e, t = typeof t == "string" ? new URL(t, window.location.origin) : t, `${e.origin}${e.pathname}` == `${t.origin}${t.pathname}`;
}
function et(e = "inertiaui_modal_") {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `${e}${crypto.randomUUID()}` : `${e}${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
}
function fe(e) {
  return typeof e == "string" ? e.toLowerCase() : e;
}
function Pn(e, t, n = !1) {
  return n && (t = t.map(fe)), Array.isArray(e) ? e.filter((r) => !t.includes(n ? fe(r) : r)) : Object.keys(e).reduce((r, l) => (t.includes(n ? fe(l) : l) || (r[l] = e[l]), r), {});
}
function Mn(e, t, n = !1) {
  return n && (t = t.map(fe)), Array.isArray(e) ? e.filter((r) => t.includes(n ? fe(r) : r)) : Object.keys(e).reduce((r, l) => (t.includes(n ? fe(l) : l) && (r[l] = e[l]), r), {});
}
function Ln(e) {
  return Array.isArray(e) ? e.filter((t) => t !== null) : Object.keys(e).reduce((t, n) => (n in e && e[n] !== null && (t[n] = e[n]), t), {});
}
function Sn(e, t = 3, n = 10) {
  return new Promise((r, l) => {
    const i = e();
    if (i) {
      r(i);
      return;
    }
    let a = t * 1e3 / n;
    const s = setInterval(() => {
      const o = e();
      o && (clearInterval(s), r(o)), --a <= 0 && (clearInterval(s), l(new Error("Condition not met in time")));
    }, n);
  });
}
function xe(e) {
  return e ? (e = e.replace(/_/g, "-"), e = e.replace(/-+/g, "-"), /[A-Z]/.test(e) ? (e = e.replace(/\s+/g, "").replace(/_/g, "").replace(/(?:^|\s|-)+([A-Za-z])/g, (t, n) => n.toUpperCase()), e = e.replace(/(.)(?=[A-Z])/g, "$1-"), e.toLowerCase()) : e) : "";
}
const Be = _(null);
Be.displayName = "ModalStackContext";
let Ct = null, At = null, me = null, lt = null, tt = [], de = {};
const Fn = ({ children: e }) => {
  const [t, n] = S([]), [r, l] = S({}), i = (h) => {
    n((c) => {
      const u = h([...c]), v = (y) => {
        var p;
        return u.length < 2 ? !0 : ((p = u.map((E) => ({ id: E.id, shouldRender: E.shouldRender })).reverse().find((E) => E.shouldRender)) == null ? void 0 : p.id) === y;
      };
      return u.forEach((y, p) => {
        u[p].onTopOfStack = v(y.id), u[p].getParentModal = () => p < 1 ? null : u.slice(0, p).reverse().find((E) => E.isOpen), u[p].getChildModal = () => p === u.length - 1 ? null : u.slice(p + 1).find((E) => E.isOpen);
      }), u;
    });
  };
  M(() => {
    tt = t;
  }, [t]);
  class a {
    constructor(c, u, v, y, p) {
      q(this, "show", () => {
        i(
          (c) => c.map((u) => (u.id === this.id && !u.isOpen && (u.isOpen = !0, u.shouldRender = !0), u))
        );
      });
      q(this, "setOpen", (c) => {
        c ? this.show() : this.close();
      });
      q(this, "close", () => {
        i(
          (c) => c.map((u) => {
            var v;
            return u.id === this.id && u.isOpen && (Object.keys(u.listeners).forEach((y) => {
              u.off(y);
            }), u.isOpen = !1, (v = u.onCloseCallback) == null || v.call(u)), u;
          })
        );
      });
      q(this, "afterLeave", () => {
        this.isOpen || i((c) => {
          const u = c.map((v) => {
            var y;
            return v.id === this.id && !v.isOpen && (v.shouldRender = !1, (y = v.afterLeaveCallback) == null || y.call(v), v.afterLeaveCallback = null), v;
          });
          return this.index === 0 ? [] : u;
        });
      });
      q(this, "on", (c, u) => {
        c = xe(c), this.listeners[c] = this.listeners[c] ?? [], this.listeners[c].push(u);
      });
      q(this, "off", (c, u) => {
        var v;
        c = xe(c), u ? this.listeners[c] = ((v = this.listeners[c]) == null ? void 0 : v.filter((y) => y !== u)) ?? [] : delete this.listeners[c];
      });
      q(this, "emit", (c, ...u) => {
        var v;
        (v = this.listeners[xe(c)]) == null || v.forEach((y) => y(...u));
      });
      q(this, "registerEventListenersFromProps", (c) => {
        const u = [];
        return Object.keys(c).filter((v) => v.startsWith("on")).forEach((v) => {
          const y = xe(v).replace(/^on-/, "");
          this.on(y, c[v]), u.push(() => this.off(y, c[v]));
        }), () => u.forEach((v) => v());
      });
      q(this, "reload", (c = {}) => {
        var p, E;
        let u = Object.keys(this.response.props);
        if (c.only && (u = c.only), c.except && (u = Pn(u, c.except)), !((p = this.response) != null && p.url))
          return;
        const v = (c.method ?? "get").toLowerCase(), y = c.data ?? {};
        (E = c.onStart) == null || E.call(c), De({
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
            "X-Inertia-Partial-Data": u.join(","),
            "X-InertiaUI-Modal": et(),
            "X-InertiaUI-Modal-Use-Router": 0,
            "X-InertiaUI-Modal-Base-Url": me
          }
        }).then((T) => {
          var A;
          this.updateProps(T.data.props), (A = c.onSuccess) == null || A.call(c, T);
        }).catch((T) => {
          var A;
          (A = c.onError) == null || A.call(c, T);
        }).finally(() => {
          var T;
          (T = c.onFinish) == null || T.call(c);
        });
      });
      q(this, "updateProps", (c) => {
        Object.assign(this.props, c), i((u) => u);
      });
      if (this.id = u.id ?? et(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = c, this.props = u.props, this.response = u, this.config = v ?? {}, this.onCloseCallback = y, this.afterLeaveCallback = p, de[this.id]) {
        this.config = {
          ...this.config,
          ...de[this.id].config ?? {}
        };
        const E = de[this.id].onClose, T = de[this.id].onAfterLeave;
        E && (this.onCloseCallback = y ? () => {
          y(), E();
        } : E), T && (this.afterLeaveCallback = p ? () => {
          p(), T();
        } : T), delete de[this.id];
      }
      this.index = -1, this.getParentModal = () => null, this.getChildModal = () => null, this.onTopOfStack = !0;
    }
    static generateId() {
      return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `inertiaui_modal_${crypto.randomUUID()}` : `inertiaui_modal_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
    }
  }
  const s = (h, c = {}, u = null, v = null) => At(h.component).then((y) => m(y, h, c, u, v)), o = (h) => {
    var u, v;
    const c = (v = (u = h.response) == null ? void 0 : u.meta) == null ? void 0 : v.deferredProps;
    c && Object.keys(c).forEach((y) => {
      h.reload({ only: c[y] });
    });
  }, m = (h, c, u, v, y) => {
    const p = new a(h, c, u, v, y);
    return p.index = t.length, i((E) => [...E, p]), o(p), p.show(), p;
  };
  function d(h, c, u, v) {
    if (!r[h])
      throw new Error(`The local modal "${h}" has not been registered.`);
    const y = m(null, {}, c, u, v);
    return y.name = h, r[h].callback(y), y;
  }
  const g = (h, c = {}) => x(
    h,
    c.method ?? "get",
    c.data ?? {},
    c.headers ?? {},
    c.config ?? {},
    c.onClose,
    c.onAfterLeave,
    c.queryStringArrayFormat ?? "brackets",
    c.navigate ?? mt("navigate")
  ).then((u) => {
    const v = c.listeners ?? {};
    return Object.keys(v).forEach((y) => {
      const p = xe(y);
      u.on(p, v[y]);
    }), u;
  }), x = (h, c, u = {}, v = {}, y = {}, p = null, E = null, T = "brackets", A = !1) => {
    const G = et();
    return new Promise((N, H) => {
      if (h.startsWith("#")) {
        N(d(h.substring(1), y, p, E));
        return;
      }
      const [V, X] = En(c, h || "", u, T);
      let L = A && t.length === 0;
      if (t.length === 0 && (me = typeof window < "u" ? window.location.href : ""), v = {
        ...v,
        Accept: "text/html, application/xhtml+xml",
        "X-Requested-With": "XMLHttpRequest",
        "X-Inertia": !0,
        "X-Inertia-Version": Ct,
        "X-InertiaUI-Modal": G,
        "X-InertiaUI-Modal-Use-Router": L ? 1 : 0,
        "X-InertiaUI-Modal-Base-Url": me
      }, L)
        return lt = null, de[G] = {
          config: y,
          onClose: p,
          onAfterLeave: E
        }, Ee.visit(V, {
          method: c,
          data: X,
          headers: v,
          preserveScroll: !0,
          preserveState: !0,
          onError: H,
          onFinish: () => {
            Sn(() => lt).then(N);
          }
        });
      De({
        url: V,
        method: c,
        data: X,
        headers: v
      }).then((k) => N(s(k.data, y, p, E))).catch((k) => {
        H(k);
      });
    });
  }, b = {
    stack: t,
    localModals: r,
    push: m,
    pushFromResponseData: s,
    length: () => tt.length,
    closeAll: () => {
      tt.reverse().forEach((h) => h.close());
    },
    reset: () => i(() => []),
    visit: x,
    visitModal: g,
    registerLocalModal: (h, c) => {
      l((u) => ({
        ...u,
        [h]: { name: h, callback: c }
      }));
    },
    removeLocalModal: (h) => {
      l((c) => {
        const u = { ...c };
        return delete u[h], u;
      });
    }
  };
  return /* @__PURE__ */ P(Be.Provider, { value: b, children: e });
}, Ve = () => {
  const e = j(Be);
  if (e === null)
    throw new Error("useModalStack must be used within a ModalStackProvider");
  return e;
}, bt = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], Cn = (e) => {
  e.initialPage && (Ct = e.initialPage.version), e.resolveComponent && (At = e.resolveComponent);
}, Il = (e, t) => (Cn(t), /* @__PURE__ */ P(Fn, { children: /* @__PURE__ */ P(e, { ...t, children: ({ Component: r, props: l, key: i }) => /* @__PURE__ */ se(ft, { children: [
  (() => {
    const s = Me(r, { key: i, ...l });
    return typeof r.layout == "function" ? r.layout(s) : Array.isArray(r.layout) ? r.layout.concat(s).reverse().reduce((m, d) => Me(d, l, m)) : s;
  })(),
  /* @__PURE__ */ P(An, {})
] }) }) })), An = ({ children: e }) => {
  var o, m;
  const t = j(Be), n = bn();
  let r = !1, l = !1, i = !!((o = n.props) != null && o._inertiaui_modal);
  M(() => Ee.on("start", () => r = !0), []), M(() => Ee.on("finish", () => r = !1), []), M(
    () => Ee.on("navigate", function(d) {
      const g = d.detail.page.props._inertiaui_modal;
      if (!g) {
        l && t.closeAll(), me = null, i = !1;
        return;
      }
      l = g, me = g.baseUrl, t.pushFromResponseData(g, {}, () => {
        if (!g.baseUrl) {
          console.error("No base url in modal response data so cannot navigate back");
          return;
        }
        !r && window.location.href !== g.baseUrl && Ee.visit(g.baseUrl, {
          preserveScroll: !0,
          preserveState: !0
        });
      }).then((x) => {
        lt = x;
      });
    }),
    []
  );
  const a = (d) => {
    var g;
    return d.headers["X-InertiaUI-Modal-Base-Url"] = me ?? (i ? (g = n.props._inertiaui_modal) == null ? void 0 : g.baseUrl : null), d;
  };
  M(() => (De.interceptors.request.use(a), () => De.interceptors.request.eject(a)), []);
  const s = O();
  return M(() => {
    var x, w;
    const d = (x = n.props) == null ? void 0 : x._inertiaui_modal, g = s.current;
    s.current = d, d && g && d.component === g.component && Tn(d.url, g.url) && ((w = t.stack[0]) == null || w.updateProps(d.props ?? {}));
  }, [(m = n.props) == null ? void 0 : m._inertiaui_modal]), /* @__PURE__ */ se(ft, { children: [
    e,
    t.stack.length > 0 && /* @__PURE__ */ P(It, { index: 0 })
  ] });
}, pt = $.createContext(null);
pt.displayName = "ModalIndexContext";
const Nt = () => {
  const e = $.useContext(pt);
  if (e === void 0)
    throw new Error("useModalIndex must be used within a ModalIndexProvider");
  return e;
}, It = ({ index: e }) => {
  const { stack: t } = Ve(), n = C(() => t[e], [t, e]);
  return (n == null ? void 0 : n.component) && /* @__PURE__ */ P(pt.Provider, { value: e, children: /* @__PURE__ */ P(
    n.component,
    {
      ...n.props,
      onModalEvent: (...r) => n.emit(...r)
    }
  ) });
};
function kt() {
  return Ve().stack[Nt()] ?? null;
}
const Nn = ({ children: e, data: t, fallback: n }) => {
  if (!t)
    throw new Error("`<Deferred>` requires a `data` prop to be a string or array of strings");
  const [r, l] = S(!1), i = Array.isArray(t) ? t : [t], a = kt().props;
  return M(() => {
    l(i.every((s) => a[s] !== void 0));
  }, [a, i]), r ? e : n;
};
Nn.displayName = "InertiaModalDeferred";
const Rt = dt(({ name: e, children: t, onFocus: n = null, onBlur: r = null, onClose: l = null, onSuccess: i = null, ...a }, s) => {
  const o = Nt(), { stack: m, registerLocalModal: d, removeLocalModal: g } = Ve(), [x, w] = S(null), f = C(() => e ? x : m[o], [e, x, o, m]), b = C(() => {
    var p;
    return (p = m.find((E) => E.shouldRender && E.index > (f == null ? void 0 : f.index))) == null ? void 0 : p.index;
  }, [o, m]), h = C(() => (f == null ? void 0 : f.config.slideover) ?? a.slideover ?? mt("type") === "slideover", [a.slideover]), c = C(
    () => ({
      slideover: h,
      closeButton: a.closeButton ?? ce(h, "closeButton"),
      closeExplicitly: a.closeExplicitly ?? ce(h, "closeExplicitly"),
      maxWidth: a.maxWidth ?? ce(h, "maxWidth"),
      paddingClasses: a.paddingClasses ?? ce(h, "paddingClasses"),
      panelClasses: a.panelClasses ?? ce(h, "panelClasses"),
      position: a.position ?? ce(h, "position"),
      ...f == null ? void 0 : f.config
    }),
    [a, f == null ? void 0 : f.config]
  );
  M(() => {
    if (e) {
      let p = null;
      return d(e, (E) => {
        p = E.registerEventListenersFromProps(a), w(E);
      }), () => {
        p == null || p(), p = null, g(e);
      };
    }
    return f.registerEventListenersFromProps(a);
  }, [e]);
  const u = O(f);
  M(() => {
    u.current = f;
  }, [f]), M(() => {
    f !== null && (f.isOpen ? i == null || i() : l == null || l());
  }, [f == null ? void 0 : f.isOpen]);
  const [v, y] = S(!1);
  return M(() => {
    v && f !== null && f.isOpen && (f.onTopOfStack ? n == null || n() : r == null || r()), y(!0);
  }, [f == null ? void 0 : f.onTopOfStack]), Ft(
    s,
    () => ({
      afterLeave: () => {
        var p;
        return (p = u.current) == null ? void 0 : p.afterLeave();
      },
      close: () => {
        var p;
        return (p = u.current) == null ? void 0 : p.close();
      },
      emit: (...p) => {
        var E;
        return (E = u.current) == null ? void 0 : E.emit(...p);
      },
      getChildModal: () => {
        var p;
        return (p = u.current) == null ? void 0 : p.getChildModal();
      },
      getParentModal: () => {
        var p;
        return (p = u.current) == null ? void 0 : p.getParentModal();
      },
      reload: (...p) => {
        var E;
        return (E = u.current) == null ? void 0 : E.reload(...p);
      },
      setOpen: () => {
        var p;
        return (p = u.current) == null ? void 0 : p.setOpen();
      },
      get id() {
        var p;
        return (p = u.current) == null ? void 0 : p.id;
      },
      get index() {
        var p;
        return (p = u.current) == null ? void 0 : p.index;
      },
      get isOpen() {
        var p;
        return (p = u.current) == null ? void 0 : p.isOpen;
      },
      get config() {
        var p;
        return (p = u.current) == null ? void 0 : p.config;
      },
      get modalContext() {
        return u.current;
      },
      get onTopOfStack() {
        var p;
        return (p = u.current) == null ? void 0 : p.onTopOfStack;
      },
      get shouldRender() {
        var p;
        return (p = u.current) == null ? void 0 : p.shouldRender;
      }
    }),
    [f]
  ), (f == null ? void 0 : f.shouldRender) && /* @__PURE__ */ se(ft, { children: [
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
    b && /* @__PURE__ */ P(It, { index: b })
  ] });
});
Rt.displayName = "HeadlessModal";
function Dt(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var l = e.length;
    for (t = 0; t < l; t++) e[t] && (n = Dt(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function je() {
  for (var e, t, n = 0, r = "", l = arguments.length; n < l; n++) (e = arguments[n]) && (t = Dt(e)) && (r && (r += " "), r += t);
  return r;
}
var In = Object.defineProperty, kn = (e, t, n) => t in e ? In(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, nt = (e, t, n) => (kn(e, typeof t != "symbol" ? t + "" : t, n), n);
let Rn = class {
  constructor() {
    nt(this, "current", this.detect()), nt(this, "handoffState", "pending"), nt(this, "currentId", 0);
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
}, ae = new Rn();
function Xe(e) {
  return ae.isServer ? null : e instanceof Node ? e.ownerDocument : e != null && e.hasOwnProperty("current") && e.current instanceof Node ? e.current.ownerDocument : document;
}
function qe(e) {
  typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch((t) => setTimeout(() => {
    throw t;
  }));
}
function re() {
  let e = [], t = { addEventListener(n, r, l, i) {
    return n.addEventListener(r, l, i), t.add(() => n.removeEventListener(r, l, i));
  }, requestAnimationFrame(...n) {
    let r = requestAnimationFrame(...n);
    return t.add(() => cancelAnimationFrame(r));
  }, nextFrame(...n) {
    return t.requestAnimationFrame(() => t.requestAnimationFrame(...n));
  }, setTimeout(...n) {
    let r = setTimeout(...n);
    return t.add(() => clearTimeout(r));
  }, microTask(...n) {
    let r = { current: !0 };
    return qe(() => {
      r.current && n[0]();
    }), t.add(() => {
      r.current = !1;
    });
  }, style(n, r, l) {
    let i = n.style.getPropertyValue(r);
    return Object.assign(n.style, { [r]: l }), this.add(() => {
      Object.assign(n.style, { [r]: i });
    });
  }, group(n) {
    let r = re();
    return n(r), this.add(() => r.dispose());
  }, add(n) {
    return e.includes(n) || e.push(n), () => {
      let r = e.indexOf(n);
      if (r >= 0) for (let l of e.splice(r, 1)) l();
    };
  }, dispose() {
    for (let n of e.splice(0)) n();
  } };
  return t;
}
function ht() {
  let [e] = S(re);
  return M(() => () => e.dispose(), [e]), e;
}
let R = (e, t) => {
  ae.isServer ? M(e, t) : hn(e, t);
};
function ue(e) {
  let t = O(e);
  return R(() => {
    t.current = e;
  }, [e]), t;
}
let F = function(e) {
  let t = ue(e);
  return $.useCallback((...n) => t.current(...n), [t]);
}, Dn = _(void 0);
function jn() {
  return j(Dn);
}
function it(...e) {
  return Array.from(new Set(e.flatMap((t) => typeof t == "string" ? t.split(" ") : []))).filter(Boolean).join(" ");
}
function ne(e, t, ...n) {
  if (e in t) {
    let l = t[e];
    return typeof l == "function" ? l(...n) : l;
  }
  let r = new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map((l) => `"${l}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(r, ne), r;
}
var Ue = ((e) => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(Ue || {}), te = ((e) => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(te || {});
function B() {
  let e = Hn();
  return W((t) => Un({ mergeRefs: e, ...t }), [e]);
}
function Un({ ourProps: e, theirProps: t, slot: n, defaultTag: r, features: l, visible: i = !0, name: a, mergeRefs: s }) {
  s = s ?? Wn;
  let o = jt(t, e);
  if (i) return Re(o, n, r, a, s);
  let m = l ?? 0;
  if (m & 2) {
    let { static: d = !1, ...g } = o;
    if (d) return Re(g, n, r, a, s);
  }
  if (m & 1) {
    let { unmount: d = !0, ...g } = o;
    return ne(d ? 0 : 1, { 0() {
      return null;
    }, 1() {
      return Re({ ...g, hidden: !0, style: { display: "none" } }, n, r, a, s);
    } });
  }
  return Re(o, n, r, a, s);
}
function Re(e, t = {}, n, r, l) {
  let { as: i = n, children: a, refName: s = "ref", ...o } = rt(e, ["unmount", "static"]), m = e.ref !== void 0 ? { [s]: e.ref } : {}, d = typeof a == "function" ? a(t) : a;
  "className" in o && o.className && typeof o.className == "function" && (o.className = o.className(t)), o["aria-labelledby"] && o["aria-labelledby"] === o.id && (o["aria-labelledby"] = void 0);
  let g = {};
  if (t) {
    let x = !1, w = [];
    for (let [f, b] of Object.entries(t)) typeof b == "boolean" && (x = !0), b === !0 && w.push(f.replace(/([A-Z])/g, (h) => `-${h.toLowerCase()}`));
    if (x) {
      g["data-headlessui-state"] = w.join(" ");
      for (let f of w) g[`data-${f}`] = "";
    }
  }
  if (i === z && (Object.keys(le(o)).length > 0 || Object.keys(le(g)).length > 0)) if (!vn(d) || Array.isArray(d) && d.length > 1) {
    if (Object.keys(le(o)).length > 0) throw new Error(['Passing props on "Fragment"!', "", `The current component <${r} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(le(o)).concat(Object.keys(le(g))).map((x) => `  - ${x}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((x) => `  - ${x}`).join(`
`)].join(`
`));
  } else {
    let x = d.props, w = x == null ? void 0 : x.className, f = typeof w == "function" ? (...c) => it(w(...c), o.className) : it(w, o.className), b = f ? { className: f } : {}, h = jt(d.props, le(rt(o, ["ref"])));
    for (let c in g) c in h && delete g[c];
    return gn(d, Object.assign({}, h, g, m, { ref: l(_n(d), m.ref) }, b));
  }
  return Me(i, Object.assign({}, rt(o, ["ref"]), i !== z && m, i !== z && g), d);
}
function Hn() {
  let e = O([]), t = W((n) => {
    for (let r of e.current) r != null && (typeof r == "function" ? r(n) : r.current = n);
  }, []);
  return (...n) => {
    if (!n.every((r) => r == null)) return e.current = n, t;
  };
}
function Wn(...e) {
  return e.every((t) => t == null) ? void 0 : (t) => {
    for (let n of e) n != null && (typeof n == "function" ? n(t) : n.current = t);
  };
}
function jt(...e) {
  if (e.length === 0) return {};
  if (e.length === 1) return e[0];
  let t = {}, n = {};
  for (let r of e) for (let l in r) l.startsWith("on") && typeof r[l] == "function" ? (n[l] != null || (n[l] = []), n[l].push(r[l])) : t[l] = r[l];
  if (t.disabled || t["aria-disabled"]) for (let r in n) /^(on(?:Click|Pointer|Mouse|Key)(?:Down|Up|Press)?)$/.test(r) && (n[r] = [(l) => {
    var i;
    return (i = l == null ? void 0 : l.preventDefault) == null ? void 0 : i.call(l);
  }]);
  for (let r in n) Object.assign(t, { [r](l, ...i) {
    let a = n[r];
    for (let s of a) {
      if ((l instanceof Event || (l == null ? void 0 : l.nativeEvent) instanceof Event) && l.defaultPrevented) return;
      s(l, ...i);
    }
  } });
  return t;
}
function U(e) {
  var t;
  return Object.assign(dt(e), { displayName: (t = e.displayName) != null ? t : e.name });
}
function le(e) {
  let t = Object.assign({}, e);
  for (let n in t) t[n] === void 0 && delete t[n];
  return t;
}
function rt(e, t = []) {
  let n = Object.assign({}, e);
  for (let r of t) r in n && delete n[r];
  return n;
}
function _n(e) {
  return $.version.split(".")[0] >= "19" ? e.props.ref : e.ref;
}
let Bn = "span";
var He = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(He || {});
function Vn(e, t) {
  var n;
  let { features: r = 1, ...l } = e, i = { ref: t, "aria-hidden": (r & 2) === 2 ? !0 : (n = l["aria-hidden"]) != null ? n : void 0, hidden: (r & 4) === 4 ? !0 : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(r & 4) === 4 && (r & 2) !== 2 && { display: "none" } } };
  return B()({ ourProps: i, theirProps: l, slot: {}, defaultTag: Bn, name: "Hidden" });
}
let ot = U(Vn), Ut = Symbol();
function Xn(e, t = !0) {
  return Object.assign(e, { [Ut]: t });
}
function Z(...e) {
  let t = O(e);
  M(() => {
    t.current = e;
  }, [e]);
  let n = F((r) => {
    for (let l of t.current) l != null && (typeof l == "function" ? l(r) : l.current = r);
  });
  return e.every((r) => r == null || (r == null ? void 0 : r[Ut])) ? void 0 : n;
}
let vt = _(null);
vt.displayName = "DescriptionContext";
function Ht() {
  let e = j(vt);
  if (e === null) {
    let t = new Error("You used a <Description /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(t, Ht), t;
  }
  return e;
}
function qn() {
  let [e, t] = S([]);
  return [e.length > 0 ? e.join(" ") : void 0, C(() => function(n) {
    let r = F((i) => (t((a) => [...a, i]), () => t((a) => {
      let s = a.slice(), o = s.indexOf(i);
      return o !== -1 && s.splice(o, 1), s;
    }))), l = C(() => ({ register: r, slot: n.slot, name: n.name, props: n.props, value: n.value }), [r, n.slot, n.name, n.props, n.value]);
    return $.createElement(vt.Provider, { value: l }, n.children);
  }, [t])];
}
let Yn = "p";
function zn(e, t) {
  let n = Le(), r = jn(), { id: l = `headlessui-description-${n}`, ...i } = e, a = Ht(), s = Z(t);
  R(() => a.register(l), [l, a.register]);
  let o = r || !1, m = C(() => ({ ...a.slot, disabled: o }), [a.slot, o]), d = { ref: s, ...a.props, id: l };
  return B()({ ourProps: d, theirProps: i, slot: m, defaultTag: Yn, name: a.name || "Description" });
}
let Gn = U(zn), Kn = Object.assign(Gn, {});
var Wt = ((e) => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(Wt || {});
let Zn = _(() => {
});
function Jn({ value: e, children: t }) {
  return $.createElement(Zn.Provider, { value: e }, t);
}
let Qn = class extends Map {
  constructor(t) {
    super(), this.factory = t;
  }
  get(t) {
    let n = super.get(t);
    return n === void 0 && (n = this.factory(t), this.set(t, n)), n;
  }
};
function _t(e, t) {
  let n = e(), r = /* @__PURE__ */ new Set();
  return { getSnapshot() {
    return n;
  }, subscribe(l) {
    return r.add(l), () => r.delete(l);
  }, dispatch(l, ...i) {
    let a = t[l].call(n, ...i);
    a && (n = a, r.forEach((s) => s()));
  } };
}
function Bt(e) {
  return wn(e.subscribe, e.getSnapshot, e.getSnapshot);
}
let er = new Qn(() => _t(() => [], { ADD(e) {
  return this.includes(e) ? this : [...this, e];
}, REMOVE(e) {
  let t = this.indexOf(e);
  if (t === -1) return this;
  let n = this.slice();
  return n.splice(t, 1), n;
} }));
function pe(e, t) {
  let n = er.get(t), r = Le(), l = Bt(n);
  if (R(() => {
    if (e) return n.dispatch("ADD", r), () => n.dispatch("REMOVE", r);
  }, [n, e]), !e) return !1;
  let i = l.indexOf(r), a = l.length;
  return i === -1 && (i = a, a += 1), i === a - 1;
}
let at = /* @__PURE__ */ new Map(), Te = /* @__PURE__ */ new Map();
function Et(e) {
  var t;
  let n = (t = Te.get(e)) != null ? t : 0;
  return Te.set(e, n + 1), n !== 0 ? () => $t(e) : (at.set(e, { "aria-hidden": e.getAttribute("aria-hidden"), inert: e.inert }), e.setAttribute("aria-hidden", "true"), e.inert = !0, () => $t(e));
}
function $t(e) {
  var t;
  let n = (t = Te.get(e)) != null ? t : 1;
  if (n === 1 ? Te.delete(e) : Te.set(e, n - 1), n !== 1) return;
  let r = at.get(e);
  r && (r["aria-hidden"] === null ? e.removeAttribute("aria-hidden") : e.setAttribute("aria-hidden", r["aria-hidden"]), e.inert = r.inert, at.delete(e));
}
function tr(e, { allowed: t, disallowed: n } = {}) {
  let r = pe(e, "inert-others");
  R(() => {
    var l, i;
    if (!r) return;
    let a = re();
    for (let o of (l = n == null ? void 0 : n()) != null ? l : []) o && a.add(Et(o));
    let s = (i = t == null ? void 0 : t()) != null ? i : [];
    for (let o of s) {
      if (!o) continue;
      let m = Xe(o);
      if (!m) continue;
      let d = o.parentElement;
      for (; d && d !== m.body; ) {
        for (let g of d.children) s.some((x) => g.contains(x)) || a.add(Et(g));
        d = d.parentElement;
      }
    }
    return a.dispose;
  }, [r, t, n]);
}
function nr(e, t, n) {
  let r = ue((l) => {
    let i = l.getBoundingClientRect();
    i.x === 0 && i.y === 0 && i.width === 0 && i.height === 0 && n();
  });
  M(() => {
    if (!e) return;
    let l = t === null ? null : t instanceof HTMLElement ? t : t.current;
    if (!l) return;
    let i = re();
    if (typeof ResizeObserver < "u") {
      let a = new ResizeObserver(() => r.current(l));
      a.observe(l), i.add(() => a.disconnect());
    }
    if (typeof IntersectionObserver < "u") {
      let a = new IntersectionObserver(() => r.current(l));
      a.observe(l), i.add(() => a.disconnect());
    }
    return () => i.dispose();
  }, [t, r, e]);
}
let We = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e) => `${e}:not([tabindex='-1'])`).join(","), rr = ["[data-autofocus]"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var J = ((e) => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e[e.AutoFocus = 64] = "AutoFocus", e))(J || {}), st = ((e) => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(st || {}), lr = ((e) => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(lr || {});
function ir(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(We)).sort((t, n) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (n.tabIndex || Number.MAX_SAFE_INTEGER)));
}
function or(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(rr)).sort((t, n) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (n.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var Vt = ((e) => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(Vt || {});
function ar(e, t = 0) {
  var n;
  return e === ((n = Xe(e)) == null ? void 0 : n.body) ? !1 : ne(t, { 0() {
    return e.matches(We);
  }, 1() {
    let r = e;
    for (; r !== null; ) {
      if (r.matches(We)) return !0;
      r = r.parentElement;
    }
    return !1;
  } });
}
var sr = ((e) => (e[e.Keyboard = 0] = "Keyboard", e[e.Mouse = 1] = "Mouse", e))(sr || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (e) => {
  e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (e) => {
  e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
function Q(e) {
  e == null || e.focus({ preventScroll: !0 });
}
let ur = ["textarea", "input"].join(",");
function cr(e) {
  var t, n;
  return (n = (t = e == null ? void 0 : e.matches) == null ? void 0 : t.call(e, ur)) != null ? n : !1;
}
function dr(e, t = (n) => n) {
  return e.slice().sort((n, r) => {
    let l = t(n), i = t(r);
    if (l === null || i === null) return 0;
    let a = l.compareDocumentPosition(i);
    return a & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : a & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function Pe(e, t, { sorted: n = !0, relativeTo: r = null, skipElements: l = [] } = {}) {
  let i = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : document : e.ownerDocument, a = Array.isArray(e) ? n ? dr(e) : e : t & 64 ? or(e) : ir(e);
  l.length > 0 && a.length > 1 && (a = a.filter((w) => !l.some((f) => f != null && "current" in f ? (f == null ? void 0 : f.current) === w : f === w))), r = r ?? i.activeElement;
  let s = (() => {
    if (t & 5) return 1;
    if (t & 10) return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), o = (() => {
    if (t & 1) return 0;
    if (t & 2) return Math.max(0, a.indexOf(r)) - 1;
    if (t & 4) return Math.max(0, a.indexOf(r)) + 1;
    if (t & 8) return a.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), m = t & 32 ? { preventScroll: !0 } : {}, d = 0, g = a.length, x;
  do {
    if (d >= g || d + g <= 0) return 0;
    let w = o + d;
    if (t & 16) w = (w + g) % g;
    else {
      if (w < 0) return 3;
      if (w >= g) return 1;
    }
    x = a[w], x == null || x.focus(m), d += s;
  } while (x !== i.activeElement);
  return t & 6 && cr(x) && x.select(), 2;
}
function Xt() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function fr() {
  return /Android/gi.test(window.navigator.userAgent);
}
function mr() {
  return Xt() || fr();
}
function be(e, t, n, r) {
  let l = ue(n);
  M(() => {
    if (!e) return;
    function i(a) {
      l.current(a);
    }
    return document.addEventListener(t, i, r), () => document.removeEventListener(t, i, r);
  }, [e, t, r]);
}
function qt(e, t, n, r) {
  let l = ue(n);
  M(() => {
    if (!e) return;
    function i(a) {
      l.current(a);
    }
    return window.addEventListener(t, i, r), () => window.removeEventListener(t, i, r);
  }, [e, t, r]);
}
const Ot = 30;
function pr(e, t, n) {
  let r = pe(e, "outside-click"), l = ue(n), i = W(function(o, m) {
    if (o.defaultPrevented) return;
    let d = m(o);
    if (d === null || !d.getRootNode().contains(d) || !d.isConnected) return;
    let g = function x(w) {
      return typeof w == "function" ? x(w()) : Array.isArray(w) || w instanceof Set ? w : [w];
    }(t);
    for (let x of g) if (x !== null && (x.contains(d) || o.composed && o.composedPath().includes(x))) return;
    return !ar(d, Vt.Loose) && d.tabIndex !== -1 && o.preventDefault(), l.current(o, d);
  }, [l, t]), a = O(null);
  be(r, "pointerdown", (o) => {
    var m, d;
    a.current = ((d = (m = o.composedPath) == null ? void 0 : m.call(o)) == null ? void 0 : d[0]) || o.target;
  }, !0), be(r, "mousedown", (o) => {
    var m, d;
    a.current = ((d = (m = o.composedPath) == null ? void 0 : m.call(o)) == null ? void 0 : d[0]) || o.target;
  }, !0), be(r, "click", (o) => {
    mr() || a.current && (i(o, () => a.current), a.current = null);
  }, !0);
  let s = O({ x: 0, y: 0 });
  be(r, "touchstart", (o) => {
    s.current.x = o.touches[0].clientX, s.current.y = o.touches[0].clientY;
  }, !0), be(r, "touchend", (o) => {
    let m = { x: o.changedTouches[0].clientX, y: o.changedTouches[0].clientY };
    if (!(Math.abs(m.x - s.current.x) >= Ot || Math.abs(m.y - s.current.y) >= Ot)) return i(o, () => o.target instanceof HTMLElement ? o.target : null);
  }, !0), qt(r, "blur", (o) => i(o, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), !0);
}
function Se(...e) {
  return C(() => Xe(...e), [...e]);
}
function Yt(e, t, n, r) {
  let l = ue(n);
  M(() => {
    e = e ?? window;
    function i(a) {
      l.current(a);
    }
    return e.addEventListener(t, i, r), () => e.removeEventListener(t, i, r);
  }, [e, t, r]);
}
function hr() {
  let e;
  return { before({ doc: t }) {
    var n;
    let r = t.documentElement, l = (n = t.defaultView) != null ? n : window;
    e = Math.max(0, l.innerWidth - r.clientWidth);
  }, after({ doc: t, d: n }) {
    let r = t.documentElement, l = Math.max(0, r.clientWidth - r.offsetWidth), i = Math.max(0, e - l);
    n.style(r, "paddingRight", `${i}px`);
  } };
}
function vr() {
  return Xt() ? { before({ doc: e, d: t, meta: n }) {
    function r(l) {
      return n.containers.flatMap((i) => i()).some((i) => i.contains(l));
    }
    t.microTask(() => {
      var l;
      if (window.getComputedStyle(e.documentElement).scrollBehavior !== "auto") {
        let s = re();
        s.style(e.documentElement, "scrollBehavior", "auto"), t.add(() => t.microTask(() => s.dispose()));
      }
      let i = (l = window.scrollY) != null ? l : window.pageYOffset, a = null;
      t.addEventListener(e, "click", (s) => {
        if (s.target instanceof HTMLElement) try {
          let o = s.target.closest("a");
          if (!o) return;
          let { hash: m } = new URL(o.href), d = e.querySelector(m);
          d && !r(d) && (a = d);
        } catch {
        }
      }, !0), t.addEventListener(e, "touchstart", (s) => {
        if (s.target instanceof HTMLElement) if (r(s.target)) {
          let o = s.target;
          for (; o.parentElement && r(o.parentElement); ) o = o.parentElement;
          t.style(o, "overscrollBehavior", "contain");
        } else t.style(s.target, "touchAction", "none");
      }), t.addEventListener(e, "touchmove", (s) => {
        if (s.target instanceof HTMLElement) {
          if (s.target.tagName === "INPUT") return;
          if (r(s.target)) {
            let o = s.target;
            for (; o.parentElement && o.dataset.headlessuiPortal !== "" && !(o.scrollHeight > o.clientHeight || o.scrollWidth > o.clientWidth); ) o = o.parentElement;
            o.dataset.headlessuiPortal === "" && s.preventDefault();
          } else s.preventDefault();
        }
      }, { passive: !1 }), t.add(() => {
        var s;
        let o = (s = window.scrollY) != null ? s : window.pageYOffset;
        i !== o && window.scrollTo(0, i), a && a.isConnected && (a.scrollIntoView({ block: "nearest" }), a = null);
      });
    });
  } } : {};
}
function gr() {
  return { before({ doc: e, d: t }) {
    t.style(e.documentElement, "overflow", "hidden");
  } };
}
function wr(e) {
  let t = {};
  for (let n of e) Object.assign(t, n(t));
  return t;
}
let oe = _t(() => /* @__PURE__ */ new Map(), { PUSH(e, t) {
  var n;
  let r = (n = this.get(e)) != null ? n : { doc: e, count: 0, d: re(), meta: /* @__PURE__ */ new Set() };
  return r.count++, r.meta.add(t), this.set(e, r), this;
}, POP(e, t) {
  let n = this.get(e);
  return n && (n.count--, n.meta.delete(t)), this;
}, SCROLL_PREVENT({ doc: e, d: t, meta: n }) {
  let r = { doc: e, d: t, meta: wr(n) }, l = [vr(), hr(), gr()];
  l.forEach(({ before: i }) => i == null ? void 0 : i(r)), l.forEach(({ after: i }) => i == null ? void 0 : i(r));
}, SCROLL_ALLOW({ d: e }) {
  e.dispose();
}, TEARDOWN({ doc: e }) {
  this.delete(e);
} });
oe.subscribe(() => {
  let e = oe.getSnapshot(), t = /* @__PURE__ */ new Map();
  for (let [n] of e) t.set(n, n.documentElement.style.overflow);
  for (let n of e.values()) {
    let r = t.get(n.doc) === "hidden", l = n.count !== 0;
    (l && !r || !l && r) && oe.dispatch(n.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", n), n.count === 0 && oe.dispatch("TEARDOWN", n);
  }
});
function yr(e, t, n = () => ({ containers: [] })) {
  let r = Bt(oe), l = t ? r.get(t) : void 0, i = l ? l.count > 0 : !1;
  return R(() => {
    if (!(!t || !e)) return oe.dispatch("PUSH", t, n), () => oe.dispatch("POP", t, n);
  }, [e, t]), i;
}
function xr(e, t, n = () => [document.body]) {
  let r = pe(e, "scroll-lock");
  yr(r, t, (l) => {
    var i;
    return { containers: [...(i = l.containers) != null ? i : [], n] };
  });
}
function br(e = 0) {
  let [t, n] = S(e), r = W((o) => n(o), [t]), l = W((o) => n((m) => m | o), [t]), i = W((o) => (t & o) === o, [t]), a = W((o) => n((m) => m & ~o), [n]), s = W((o) => n((m) => m ^ o), [n]);
  return { flags: t, setFlag: r, addFlag: l, hasFlag: i, removeFlag: a, toggleFlag: s };
}
var Tt, Pt;
typeof process < "u" && typeof globalThis < "u" && typeof Element < "u" && ((Tt = process == null ? void 0 : process.env) == null ? void 0 : Tt.NODE_ENV) === "test" && typeof ((Pt = Element == null ? void 0 : Element.prototype) == null ? void 0 : Pt.getAnimations) > "u" && (Element.prototype.getAnimations = function() {
  return console.warn(["Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.", "Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.", "", "Example usage:", "```js", "import { mockAnimationsApi } from 'jsdom-testing-mocks'", "mockAnimationsApi()", "```"].join(`
`)), [];
});
var Er = ((e) => (e[e.None = 0] = "None", e[e.Closed = 1] = "Closed", e[e.Enter = 2] = "Enter", e[e.Leave = 4] = "Leave", e))(Er || {});
function $r(e) {
  let t = {};
  for (let n in e) e[n] === !0 && (t[`data-${n}`] = "");
  return t;
}
function Or(e, t, n, r) {
  let [l, i] = S(n), { hasFlag: a, addFlag: s, removeFlag: o } = br(e && l ? 3 : 0), m = O(!1), d = O(!1), g = ht();
  return R(() => {
    var x;
    if (e) {
      if (n && i(!0), !t) {
        n && s(3);
        return;
      }
      return (x = r == null ? void 0 : r.start) == null || x.call(r, n), Tr(t, { inFlight: m, prepare() {
        d.current ? d.current = !1 : d.current = m.current, m.current = !0, !d.current && (n ? (s(3), o(4)) : (s(4), o(2)));
      }, run() {
        d.current ? n ? (o(3), s(4)) : (o(4), s(3)) : n ? o(1) : s(1);
      }, done() {
        var w;
        d.current && typeof t.getAnimations == "function" && t.getAnimations().length > 0 || (m.current = !1, o(7), n || i(!1), (w = r == null ? void 0 : r.end) == null || w.call(r, n));
      } });
    }
  }, [e, n, t, g]), e ? [l, { closed: a(1), enter: a(2), leave: a(4), transition: a(2) || a(4) }] : [n, { closed: void 0, enter: void 0, leave: void 0, transition: void 0 }];
}
function Tr(e, { prepare: t, run: n, done: r, inFlight: l }) {
  let i = re();
  return Mr(e, { prepare: t, inFlight: l }), i.nextFrame(() => {
    n(), i.requestAnimationFrame(() => {
      i.add(Pr(e, r));
    });
  }), i.dispose;
}
function Pr(e, t) {
  var n, r;
  let l = re();
  if (!e) return l.dispose;
  let i = !1;
  l.add(() => {
    i = !0;
  });
  let a = (r = (n = e.getAnimations) == null ? void 0 : n.call(e).filter((s) => s instanceof CSSTransition)) != null ? r : [];
  return a.length === 0 ? (t(), l.dispose) : (Promise.allSettled(a.map((s) => s.finished)).then(() => {
    i || t();
  }), l.dispose);
}
function Mr(e, { inFlight: t, prepare: n }) {
  if (t != null && t.current) {
    n();
    return;
  }
  let r = e.style.transition;
  e.style.transition = "none", n(), e.offsetHeight, e.style.transition = r;
}
function gt(e, t) {
  let n = O([]), r = F(e);
  M(() => {
    let l = [...n.current];
    for (let [i, a] of t.entries()) if (n.current[i] !== a) {
      let s = r(t, l);
      return n.current = t, s;
    }
  }, [r, ...t]);
}
let Ye = _(null);
Ye.displayName = "OpenClosedContext";
var Y = ((e) => (e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(Y || {});
function ze() {
  return j(Ye);
}
function Lr({ value: e, children: t }) {
  return $.createElement(Ye.Provider, { value: e }, t);
}
function Sr({ children: e }) {
  return $.createElement(Ye.Provider, { value: null }, e);
}
function Fr(e) {
  function t() {
    document.readyState !== "loading" && (e(), document.removeEventListener("DOMContentLoaded", t));
  }
  typeof window < "u" && typeof document < "u" && (document.addEventListener("DOMContentLoaded", t), t());
}
let ee = [];
Fr(() => {
  function e(t) {
    if (!(t.target instanceof HTMLElement) || t.target === document.body || ee[0] === t.target) return;
    let n = t.target;
    n = n.closest(We), ee.unshift(n ?? t.target), ee = ee.filter((r) => r != null && r.isConnected), ee.splice(10);
  }
  window.addEventListener("click", e, { capture: !0 }), window.addEventListener("mousedown", e, { capture: !0 }), window.addEventListener("focus", e, { capture: !0 }), document.body.addEventListener("click", e, { capture: !0 }), document.body.addEventListener("mousedown", e, { capture: !0 }), document.body.addEventListener("focus", e, { capture: !0 });
});
function zt(e) {
  let t = F(e), n = O(!1);
  M(() => (n.current = !1, () => {
    n.current = !0, qe(() => {
      n.current && t();
    });
  }), [t]);
}
function Cr() {
  let e = typeof document > "u";
  return "useSyncExternalStore" in Oe ? ((t) => t.useSyncExternalStore)(Oe)(() => () => {
  }, () => !1, () => !e) : !1;
}
function Fe() {
  let e = Cr(), [t, n] = Oe.useState(ae.isHandoffComplete);
  return t && ae.isHandoffComplete === !1 && n(!1), Oe.useEffect(() => {
    t !== !0 && n(!0);
  }, [t]), Oe.useEffect(() => ae.handoff(), []), e ? !1 : t;
}
let Gt = _(!1);
function Ar() {
  return j(Gt);
}
function Mt(e) {
  return $.createElement(Gt.Provider, { value: e.force }, e.children);
}
function Nr(e) {
  let t = Ar(), n = j(Zt), r = Se(e), [l, i] = S(() => {
    var a;
    if (!t && n !== null) return (a = n.current) != null ? a : null;
    if (ae.isServer) return null;
    let s = r == null ? void 0 : r.getElementById("headlessui-portal-root");
    if (s) return s;
    if (r === null) return null;
    let o = r.createElement("div");
    return o.setAttribute("id", "headlessui-portal-root"), r.body.appendChild(o);
  });
  return M(() => {
    l !== null && (r != null && r.body.contains(l) || r == null || r.body.appendChild(l));
  }, [l, r]), M(() => {
    t || n !== null && i(n.current);
  }, [n, i, t]), l;
}
let Kt = z, Ir = U(function(e, t) {
  let n = e, r = O(null), l = Z(Xn((g) => {
    r.current = g;
  }), t), i = Se(r), a = Nr(r), [s] = S(() => {
    var g;
    return ae.isServer ? null : (g = i == null ? void 0 : i.createElement("div")) != null ? g : null;
  }), o = j(ut), m = Fe();
  R(() => {
    !a || !s || a.contains(s) || (s.setAttribute("data-headlessui-portal", ""), a.appendChild(s));
  }, [a, s]), R(() => {
    if (s && o) return o.register(s);
  }, [o, s]), zt(() => {
    var g;
    !a || !s || (s instanceof Node && a.contains(s) && a.removeChild(s), a.childNodes.length <= 0 && ((g = a.parentElement) == null || g.removeChild(a)));
  });
  let d = B();
  return m ? !a || !s ? null : $n(d({ ourProps: { ref: l }, theirProps: n, slot: {}, defaultTag: Kt, name: "Portal" }), s) : null;
});
function kr(e, t) {
  let n = Z(t), { enabled: r = !0, ...l } = e, i = B();
  return r ? $.createElement(Ir, { ...l, ref: n }) : i({ ourProps: { ref: n }, theirProps: l, slot: {}, defaultTag: Kt, name: "Portal" });
}
let Rr = z, Zt = _(null);
function Dr(e, t) {
  let { target: n, ...r } = e, l = { ref: Z(t) }, i = B();
  return $.createElement(Zt.Provider, { value: n }, i({ ourProps: l, theirProps: r, defaultTag: Rr, name: "Popover.Group" }));
}
let ut = _(null);
function jr() {
  let e = j(ut), t = O([]), n = F((i) => (t.current.push(i), e && e.register(i), () => r(i))), r = F((i) => {
    let a = t.current.indexOf(i);
    a !== -1 && t.current.splice(a, 1), e && e.unregister(i);
  }), l = C(() => ({ register: n, unregister: r, portals: t }), [n, r, t]);
  return [t, C(() => function({ children: i }) {
    return $.createElement(ut.Provider, { value: l }, i);
  }, [l])];
}
let Ur = U(kr), Jt = U(Dr), Hr = Object.assign(Ur, { Group: Jt });
function Wr(e, t = typeof document < "u" ? document.defaultView : null, n) {
  let r = pe(e, "escape");
  Yt(t, "keydown", (l) => {
    r && (l.defaultPrevented || l.key === Wt.Escape && n(l));
  });
}
function _r() {
  var e;
  let [t] = S(() => typeof window < "u" && typeof window.matchMedia == "function" ? window.matchMedia("(pointer: coarse)") : null), [n, r] = S((e = t == null ? void 0 : t.matches) != null ? e : !1);
  return R(() => {
    if (!t) return;
    function l(i) {
      r(i.matches);
    }
    return t.addEventListener("change", l), () => t.removeEventListener("change", l);
  }, [t]), n;
}
function Br({ defaultContainers: e = [], portals: t, mainTreeNode: n } = {}) {
  let r = Se(n), l = F(() => {
    var i, a;
    let s = [];
    for (let o of e) o !== null && (o instanceof HTMLElement ? s.push(o) : "current" in o && o.current instanceof HTMLElement && s.push(o.current));
    if (t != null && t.current) for (let o of t.current) s.push(o);
    for (let o of (i = r == null ? void 0 : r.querySelectorAll("html > *, body > *")) != null ? i : []) o !== document.body && o !== document.head && o instanceof HTMLElement && o.id !== "headlessui-portal-root" && (n && (o.contains(n) || o.contains((a = n == null ? void 0 : n.getRootNode()) == null ? void 0 : a.host)) || s.some((m) => o.contains(m)) || s.push(o));
    return s;
  });
  return { resolveContainers: l, contains: F((i) => l().some((a) => a.contains(i))) };
}
let Qt = _(null);
function Lt({ children: e, node: t }) {
  let [n, r] = S(null), l = en(t ?? n);
  return $.createElement(Qt.Provider, { value: l }, e, l === null && $.createElement(ot, { features: He.Hidden, ref: (i) => {
    var a, s;
    if (i) {
      for (let o of (s = (a = Xe(i)) == null ? void 0 : a.querySelectorAll("html > *, body > *")) != null ? s : []) if (o !== document.body && o !== document.head && o instanceof HTMLElement && o != null && o.contains(i)) {
        r(o);
        break;
      }
    }
  } }));
}
function en(e = null) {
  var t;
  return (t = j(Qt)) != null ? t : e;
}
function wt() {
  let e = O(!1);
  return R(() => (e.current = !0, () => {
    e.current = !1;
  }), []), e;
}
var $e = ((e) => (e[e.Forwards = 0] = "Forwards", e[e.Backwards = 1] = "Backwards", e))($e || {});
function Vr() {
  let e = O(0);
  return qt(!0, "keydown", (t) => {
    t.key === "Tab" && (e.current = t.shiftKey ? 1 : 0);
  }, !0), e;
}
function tn(e) {
  if (!e) return /* @__PURE__ */ new Set();
  if (typeof e == "function") return new Set(e());
  let t = /* @__PURE__ */ new Set();
  for (let n of e.current) n.current instanceof HTMLElement && t.add(n.current);
  return t;
}
let Xr = "div";
var ie = ((e) => (e[e.None = 0] = "None", e[e.InitialFocus = 1] = "InitialFocus", e[e.TabLock = 2] = "TabLock", e[e.FocusLock = 4] = "FocusLock", e[e.RestoreFocus = 8] = "RestoreFocus", e[e.AutoFocus = 16] = "AutoFocus", e))(ie || {});
function qr(e, t) {
  let n = O(null), r = Z(n, t), { initialFocus: l, initialFocusFallback: i, containers: a, features: s = 15, ...o } = e;
  Fe() || (s = 0);
  let m = Se(n);
  Kr(s, { ownerDocument: m });
  let d = Zr(s, { ownerDocument: m, container: n, initialFocus: l, initialFocusFallback: i });
  Jr(s, { ownerDocument: m, container: n, containers: a, previousActiveElement: d });
  let g = Vr(), x = F((u) => {
    let v = n.current;
    v && ((y) => y())(() => {
      ne(g.current, { [$e.Forwards]: () => {
        Pe(v, J.First, { skipElements: [u.relatedTarget, i] });
      }, [$e.Backwards]: () => {
        Pe(v, J.Last, { skipElements: [u.relatedTarget, i] });
      } });
    });
  }), w = pe(!!(s & 2), "focus-trap#tab-lock"), f = ht(), b = O(!1), h = { ref: r, onKeyDown(u) {
    u.key == "Tab" && (b.current = !0, f.requestAnimationFrame(() => {
      b.current = !1;
    }));
  }, onBlur(u) {
    if (!(s & 4)) return;
    let v = tn(a);
    n.current instanceof HTMLElement && v.add(n.current);
    let y = u.relatedTarget;
    y instanceof HTMLElement && y.dataset.headlessuiFocusGuard !== "true" && (nn(v, y) || (b.current ? Pe(n.current, ne(g.current, { [$e.Forwards]: () => J.Next, [$e.Backwards]: () => J.Previous }) | J.WrapAround, { relativeTo: u.target }) : u.target instanceof HTMLElement && Q(u.target)));
  } }, c = B();
  return $.createElement($.Fragment, null, w && $.createElement(ot, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: x, features: He.Focusable }), c({ ourProps: h, theirProps: o, defaultTag: Xr, name: "FocusTrap" }), w && $.createElement(ot, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: x, features: He.Focusable }));
}
let Yr = U(qr), zr = Object.assign(Yr, { features: ie });
function Gr(e = !0) {
  let t = O(ee.slice());
  return gt(([n], [r]) => {
    r === !0 && n === !1 && qe(() => {
      t.current.splice(0);
    }), r === !1 && n === !0 && (t.current = ee.slice());
  }, [e, ee, t]), F(() => {
    var n;
    return (n = t.current.find((r) => r != null && r.isConnected)) != null ? n : null;
  });
}
function Kr(e, { ownerDocument: t }) {
  let n = !!(e & 8), r = Gr(n);
  gt(() => {
    n || (t == null ? void 0 : t.activeElement) === (t == null ? void 0 : t.body) && Q(r());
  }, [n]), zt(() => {
    n && Q(r());
  });
}
function Zr(e, { ownerDocument: t, container: n, initialFocus: r, initialFocusFallback: l }) {
  let i = O(null), a = pe(!!(e & 1), "focus-trap#initial-focus"), s = wt();
  return gt(() => {
    if (e === 0) return;
    if (!a) {
      l != null && l.current && Q(l.current);
      return;
    }
    let o = n.current;
    o && qe(() => {
      if (!s.current) return;
      let m = t == null ? void 0 : t.activeElement;
      if (r != null && r.current) {
        if ((r == null ? void 0 : r.current) === m) {
          i.current = m;
          return;
        }
      } else if (o.contains(m)) {
        i.current = m;
        return;
      }
      if (r != null && r.current) Q(r.current);
      else {
        if (e & 16) {
          if (Pe(o, J.First | J.AutoFocus) !== st.Error) return;
        } else if (Pe(o, J.First) !== st.Error) return;
        if (l != null && l.current && (Q(l.current), (t == null ? void 0 : t.activeElement) === l.current)) return;
        console.warn("There are no focusable elements inside the <FocusTrap />");
      }
      i.current = t == null ? void 0 : t.activeElement;
    });
  }, [l, a, e]), i;
}
function Jr(e, { ownerDocument: t, container: n, containers: r, previousActiveElement: l }) {
  let i = wt(), a = !!(e & 4);
  Yt(t == null ? void 0 : t.defaultView, "focus", (s) => {
    if (!a || !i.current) return;
    let o = tn(r);
    n.current instanceof HTMLElement && o.add(n.current);
    let m = l.current;
    if (!m) return;
    let d = s.target;
    d && d instanceof HTMLElement ? nn(o, d) ? (l.current = d, Q(d)) : (s.preventDefault(), s.stopPropagation(), Q(m)) : Q(l.current);
  }, !0);
}
function nn(e, t) {
  for (let n of e) if (n.contains(t)) return !0;
  return !1;
}
function rn(e) {
  var t;
  return !!(e.enter || e.enterFrom || e.enterTo || e.leave || e.leaveFrom || e.leaveTo) || ((t = e.as) != null ? t : on) !== z || $.Children.count(e.children) === 1;
}
let Ge = _(null);
Ge.displayName = "TransitionContext";
var Qr = ((e) => (e.Visible = "visible", e.Hidden = "hidden", e))(Qr || {});
function el() {
  let e = j(Ge);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
function tl() {
  let e = j(Ke);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
let Ke = _(null);
Ke.displayName = "NestingContext";
function Ze(e) {
  return "children" in e ? Ze(e.children) : e.current.filter(({ el: t }) => t.current !== null).filter(({ state: t }) => t === "visible").length > 0;
}
function ln(e, t) {
  let n = ue(e), r = O([]), l = wt(), i = ht(), a = F((w, f = te.Hidden) => {
    let b = r.current.findIndex(({ el: h }) => h === w);
    b !== -1 && (ne(f, { [te.Unmount]() {
      r.current.splice(b, 1);
    }, [te.Hidden]() {
      r.current[b].state = "hidden";
    } }), i.microTask(() => {
      var h;
      !Ze(r) && l.current && ((h = n.current) == null || h.call(n));
    }));
  }), s = F((w) => {
    let f = r.current.find(({ el: b }) => b === w);
    return f ? f.state !== "visible" && (f.state = "visible") : r.current.push({ el: w, state: "visible" }), () => a(w, te.Unmount);
  }), o = O([]), m = O(Promise.resolve()), d = O({ enter: [], leave: [] }), g = F((w, f, b) => {
    o.current.splice(0), t && (t.chains.current[f] = t.chains.current[f].filter(([h]) => h !== w)), t == null || t.chains.current[f].push([w, new Promise((h) => {
      o.current.push(h);
    })]), t == null || t.chains.current[f].push([w, new Promise((h) => {
      Promise.all(d.current[f].map(([c, u]) => u)).then(() => h());
    })]), f === "enter" ? m.current = m.current.then(() => t == null ? void 0 : t.wait.current).then(() => b(f)) : b(f);
  }), x = F((w, f, b) => {
    Promise.all(d.current[f].splice(0).map(([h, c]) => c)).then(() => {
      var h;
      (h = o.current.shift()) == null || h();
    }).then(() => b(f));
  });
  return C(() => ({ children: r, register: s, unregister: a, onStart: g, onStop: x, wait: m, chains: d }), [s, a, r, g, x, d, m]);
}
let on = z, an = Ue.RenderStrategy;
function nl(e, t) {
  var n, r;
  let { transition: l = !0, beforeEnter: i, afterEnter: a, beforeLeave: s, afterLeave: o, enter: m, enterFrom: d, enterTo: g, entered: x, leave: w, leaveFrom: f, leaveTo: b, ...h } = e, [c, u] = S(null), v = O(null), y = rn(e), p = Z(...y ? [v, t, u] : t === null ? [] : [t]), E = (n = h.unmount) == null || n ? te.Unmount : te.Hidden, { show: T, appear: A, initial: G } = el(), [N, H] = S(T ? "visible" : "hidden"), V = tl(), { register: X, unregister: L } = V;
  R(() => X(v), [X, v]), R(() => {
    if (E === te.Hidden && v.current) {
      if (T && N !== "visible") {
        H("visible");
        return;
      }
      return ne(N, { hidden: () => L(v), visible: () => X(v) });
    }
  }, [N, v, X, L, T, E]);
  let k = Fe();
  R(() => {
    if (y && k && N === "visible" && v.current === null) throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
  }, [v, N, k, y]);
  let Ce = G && !A, Ae = A && T && G, ve = O(!1), K = ln(() => {
    ve.current || (H("hidden"), L(v));
  }, V), Ne = F((Qe) => {
    ve.current = !0;
    let ke = Qe ? "enter" : "leave";
    K.onStart(v, ke, (we) => {
      we === "enter" ? i == null || i() : we === "leave" && (s == null || s());
    });
  }), I = F((Qe) => {
    let ke = Qe ? "enter" : "leave";
    ve.current = !1, K.onStop(v, ke, (we) => {
      we === "enter" ? a == null || a() : we === "leave" && (o == null || o());
    }), ke === "leave" && !Ze(K) && (H("hidden"), L(v));
  });
  M(() => {
    y && l || (Ne(T), I(T));
  }, [T, y, l]);
  let Ie = !(!l || !y || !k || Ce), [, D] = Or(Ie, c, T, { start: Ne, end: I }), dn = le({ ref: p, className: ((r = it(h.className, Ae && m, Ae && d, D.enter && m, D.enter && D.closed && d, D.enter && !D.closed && g, D.leave && w, D.leave && !D.closed && f, D.leave && D.closed && b, !D.transition && T && x)) == null ? void 0 : r.trim()) || void 0, ...$r(D) }), ge = 0;
  N === "visible" && (ge |= Y.Open), N === "hidden" && (ge |= Y.Closed), D.enter && (ge |= Y.Opening), D.leave && (ge |= Y.Closing);
  let fn = B();
  return $.createElement(Ke.Provider, { value: K }, $.createElement(Lr, { value: ge }, fn({ ourProps: dn, theirProps: h, defaultTag: on, features: an, visible: N === "visible", name: "Transition.Child" })));
}
function rl(e, t) {
  let { show: n, appear: r = !1, unmount: l = !0, ...i } = e, a = O(null), s = rn(e), o = Z(...s ? [a, t] : t === null ? [] : [t]);
  Fe();
  let m = ze();
  if (n === void 0 && m !== null && (n = (m & Y.Open) === Y.Open), n === void 0) throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
  let [d, g] = S(n ? "visible" : "hidden"), x = ln(() => {
    n || g("hidden");
  }), [w, f] = S(!0), b = O([n]);
  R(() => {
    w !== !1 && b.current[b.current.length - 1] !== n && (b.current.push(n), f(!1));
  }, [b, n]);
  let h = C(() => ({ show: n, appear: r, initial: w }), [n, r, w]);
  R(() => {
    n ? g("visible") : !Ze(x) && a.current !== null && g("hidden");
  }, [n, x]);
  let c = { unmount: l }, u = F(() => {
    var p;
    w && f(!1), (p = e.beforeEnter) == null || p.call(e);
  }), v = F(() => {
    var p;
    w && f(!1), (p = e.beforeLeave) == null || p.call(e);
  }), y = B();
  return $.createElement(Ke.Provider, { value: x }, $.createElement(Ge.Provider, { value: h }, y({ ourProps: { ...c, as: z, children: $.createElement(sn, { ref: o, ...c, ...i, beforeEnter: u, beforeLeave: v }) }, theirProps: {}, defaultTag: z, features: an, visible: d === "visible", name: "Transition" })));
}
function ll(e, t) {
  let n = j(Ge) !== null, r = ze() !== null;
  return $.createElement($.Fragment, null, !n && r ? $.createElement(ct, { ref: t, ...e }) : $.createElement(sn, { ref: t, ...e }));
}
let ct = U(rl), sn = U(nl), he = U(ll), un = Object.assign(ct, { Child: he, Root: ct });
var il = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(il || {}), ol = ((e) => (e[e.SetTitleId = 0] = "SetTitleId", e))(ol || {});
let al = { 0(e, t) {
  return e.titleId === t.id ? e : { ...e, titleId: t.id };
} }, yt = _(null);
yt.displayName = "DialogContext";
function Je(e) {
  let t = j(yt);
  if (t === null) {
    let n = new Error(`<${e} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(n, Je), n;
  }
  return t;
}
function sl(e, t) {
  return ne(t.type, al, e, t);
}
let St = U(function(e, t) {
  let n = Le(), { id: r = `headlessui-dialog-${n}`, open: l, onClose: i, initialFocus: a, role: s = "dialog", autoFocus: o = !0, __demoMode: m = !1, unmount: d = !1, ...g } = e, x = O(!1);
  s = function() {
    return s === "dialog" || s === "alertdialog" ? s : (x.current || (x.current = !0, console.warn(`Invalid role [${s}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog");
  }();
  let w = ze();
  l === void 0 && w !== null && (l = (w & Y.Open) === Y.Open);
  let f = O(null), b = Z(f, t), h = Se(f), c = l ? 0 : 1, [u, v] = yn(sl, { titleId: null, descriptionId: null, panelRef: xn() }), y = F(() => i(!1)), p = F((I) => v({ type: 0, id: I })), E = Fe() ? c === 0 : !1, [T, A] = jr(), G = { get current() {
    var I;
    return (I = u.panelRef.current) != null ? I : f.current;
  } }, N = en(), { resolveContainers: H } = Br({ mainTreeNode: N, portals: T, defaultContainers: [G] }), V = w !== null ? (w & Y.Closing) === Y.Closing : !1;
  tr(m || V ? !1 : E, { allowed: F(() => {
    var I, Ie;
    return [(Ie = (I = f.current) == null ? void 0 : I.closest("[data-headlessui-portal]")) != null ? Ie : null];
  }), disallowed: F(() => {
    var I;
    return [(I = N == null ? void 0 : N.closest("body > *:not(#headlessui-portal-root)")) != null ? I : null];
  }) }), pr(E, H, (I) => {
    I.preventDefault(), y();
  }), Wr(E, h == null ? void 0 : h.defaultView, (I) => {
    I.preventDefault(), I.stopPropagation(), document.activeElement && "blur" in document.activeElement && typeof document.activeElement.blur == "function" && document.activeElement.blur(), y();
  }), xr(m || V ? !1 : E, h, H), nr(E, f, y);
  let [X, L] = qn(), k = C(() => [{ dialogState: c, close: y, setTitleId: p, unmount: d }, u], [c, u, y, p, d]), Ce = C(() => ({ open: c === 0 }), [c]), Ae = { ref: b, id: r, role: s, tabIndex: -1, "aria-modal": m ? void 0 : c === 0 ? !0 : void 0, "aria-labelledby": u.titleId, "aria-describedby": X, unmount: d }, ve = !_r(), K = ie.None;
  E && !m && (K |= ie.RestoreFocus, K |= ie.TabLock, o && (K |= ie.AutoFocus), ve && (K |= ie.InitialFocus));
  let Ne = B();
  return $.createElement(Sr, null, $.createElement(Mt, { force: !0 }, $.createElement(Hr, null, $.createElement(yt.Provider, { value: k }, $.createElement(Jt, { target: f }, $.createElement(Mt, { force: !1 }, $.createElement(L, { slot: Ce }, $.createElement(A, null, $.createElement(zr, { initialFocus: a, initialFocusFallback: f, containers: H, features: K }, $.createElement(Jn, { value: y }, Ne({ ourProps: Ae, theirProps: g, slot: Ce, defaultTag: ul, features: cl, visible: c === 0, name: "Dialog" })))))))))));
}), ul = "div", cl = Ue.RenderStrategy | Ue.Static;
function dl(e, t) {
  let { transition: n = !1, open: r, ...l } = e, i = ze(), a = e.hasOwnProperty("open") || i !== null, s = e.hasOwnProperty("onClose");
  if (!a && !s) throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");
  if (!a) throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");
  if (!s) throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");
  if (!i && typeof e.open != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${e.open}`);
  if (typeof e.onClose != "function") throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${e.onClose}`);
  return (r !== void 0 || n) && !l.static ? $.createElement(Lt, null, $.createElement(un, { show: r, transition: n, unmount: l.unmount }, $.createElement(St, { ref: t, ...l }))) : $.createElement(Lt, null, $.createElement(St, { ref: t, open: r, ...l }));
}
let fl = "div";
function ml(e, t) {
  let n = Le(), { id: r = `headlessui-dialog-panel-${n}`, transition: l = !1, ...i } = e, [{ dialogState: a, unmount: s }, o] = Je("Dialog.Panel"), m = Z(t, o.panelRef), d = C(() => ({ open: a === 0 }), [a]), g = F((h) => {
    h.stopPropagation();
  }), x = { ref: m, id: r, onClick: g }, w = l ? he : z, f = l ? { unmount: s } : {}, b = B();
  return $.createElement(w, { ...f }, b({ ourProps: x, theirProps: i, slot: d, defaultTag: fl, name: "Dialog.Panel" }));
}
let pl = "div";
function hl(e, t) {
  let { transition: n = !1, ...r } = e, [{ dialogState: l, unmount: i }] = Je("Dialog.Backdrop"), a = C(() => ({ open: l === 0 }), [l]), s = { ref: t, "aria-hidden": !0 }, o = n ? he : z, m = n ? { unmount: i } : {}, d = B();
  return $.createElement(o, { ...m }, d({ ourProps: s, theirProps: r, slot: a, defaultTag: pl, name: "Dialog.Backdrop" }));
}
let vl = "h2";
function gl(e, t) {
  let n = Le(), { id: r = `headlessui-dialog-title-${n}`, ...l } = e, [{ dialogState: i, setTitleId: a }] = Je("Dialog.Title"), s = Z(t);
  M(() => (a(r), () => a(null)), [r, a]);
  let o = C(() => ({ open: i === 0 }), [i]), m = { ref: s, id: r };
  return B()({ ourProps: m, theirProps: l, slot: o, defaultTag: vl, name: "Dialog.Title" });
}
let wl = U(dl), xt = U(ml);
U(hl);
let yl = U(gl), xl = Object.assign(wl, { Panel: xt, Title: yl, Description: Kn });
function cn({ onClick: e }) {
  return /* @__PURE__ */ se(
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
const bl = ({ modalContext: e, config: t, children: n }) => {
  const [r, l] = S(!1);
  return /* @__PURE__ */ P("div", { className: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4", children: /* @__PURE__ */ P(
    "div",
    {
      className: je("im-modal-positioner flex min-h-full justify-center", {
        "items-start": t.position === "top",
        "items-center": t.position === "center",
        "items-end": t.position === "bottom"
      }),
      children: /* @__PURE__ */ P(
        he,
        {
          as: "div",
          enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          enterTo: "opacity-100 translate-y-0 sm:scale-100",
          leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
          leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          afterEnter: () => l(!0),
          afterLeave: e.afterLeave,
          className: je("im-modal-wrapper w-full transition duration-300 ease-in-out", e.onTopOfStack ? "" : "blur-sm", {
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
          children: /* @__PURE__ */ se(
            xt,
            {
              className: `im-modal-content relative ${t.paddingClasses} ${t.panelClasses}`,
              "data-inertiaui-modal-entered": r,
              children: [
                t.closeButton && /* @__PURE__ */ P("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ P(cn, { onClick: e.close }) }),
                typeof n == "function" ? n({ modalContext: e, config: t }) : n
              ]
            }
          )
        }
      )
    }
  ) });
}, El = ({ modalContext: e, config: t, children: n }) => {
  const [r, l] = S(!1);
  return /* @__PURE__ */ P("div", { className: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ P(
    "div",
    {
      className: je("im-slideover-positioner flex min-h-full items-center", {
        "justify-start rtl:justify-end": (t == null ? void 0 : t.position) === "left",
        "justify-end rtl:justify-start": (t == null ? void 0 : t.position) === "right"
      }),
      children: /* @__PURE__ */ P(
        he,
        {
          as: "div",
          enterFrom: `opacity-0 ${t.position === "left" ? "-translate-x-full" : "translate-x-full"}`,
          enterTo: "opacity-100 translate-x-0",
          leaveFrom: "opacity-100 translate-x-0",
          leaveTo: `opacity-0 ${t.position === "left" ? "-translate-x-full" : "translate-x-full"}`,
          afterEnter: () => l(!0),
          afterLeave: e.afterLeave,
          className: je("im-slideover-wrapper w-full transition duration-300 ease-in-out", e.onTopOfStack ? "" : "blur-sm", {
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
          children: /* @__PURE__ */ se(
            xt,
            {
              className: `im-slideover-content relative ${t.paddingClasses} ${t.panelClasses}`,
              "data-inertiaui-modal-entered": r,
              children: [
                t.closeButton && /* @__PURE__ */ P("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ P(cn, { onClick: e.close }) }),
                typeof n == "function" ? n({ modalContext: e, config: t }) : n
              ]
            }
          )
        }
      )
    }
  ) });
}, $l = dt(({ name: e, children: t, onFocus: n = null, onBlur: r = null, onClose: l = null, onSuccess: i = null, onAfterLeave: a = null, ...s }, o) => {
  const m = (g) => typeof t == "function" ? t(g) : t, d = O(null);
  return Ft(o, () => d.current, [d]), /* @__PURE__ */ P(
    Rt,
    {
      ref: d,
      name: e,
      onFocus: n,
      onBlur: r,
      onClose: l,
      onSuccess: i,
      ...s,
      children: ({
        afterLeave: g,
        close: x,
        config: w,
        emit: f,
        getChildModal: b,
        getParentModal: h,
        id: c,
        index: u,
        isOpen: v,
        modalContext: y,
        onTopOfStack: p,
        reload: E,
        setOpen: T,
        shouldRender: A
      }) => /* @__PURE__ */ P(
        un,
        {
          appear: !0,
          show: v ?? !1,
          afterLeave: a,
          children: /* @__PURE__ */ se(
            xl,
            {
              as: "div",
              className: "im-dialog relative z-20",
              onClose: () => w.closeExplicitly ? null : x(),
              "data-inertiaui-modal-id": c,
              "data-inertiaui-modal-index": u,
              children: [
                u === 0 ? /* @__PURE__ */ P(
                  he,
                  {
                    enter: "transition transform ease-in-out duration-300",
                    enterFrom: "opacity-0",
                    enterTo: "opacity-100",
                    leave: "transition transform ease-in-out duration-300",
                    leaveFrom: "opacity-100",
                    leaveTo: "opacity-0",
                    children: p ? /* @__PURE__ */ P(
                      "div",
                      {
                        className: "im-backdrop fixed inset-0 z-30 bg-black/75",
                        "aria-hidden": "true"
                      }
                    ) : /* @__PURE__ */ P("div", {})
                  }
                ) : null,
                u > 0 && p ? /* @__PURE__ */ P("div", { className: "im-backdrop fixed inset-0 z-30 bg-black/75" }) : null,
                w.slideover ? /* @__PURE__ */ P(
                  El,
                  {
                    modalContext: y,
                    config: w,
                    children: m({
                      afterLeave: g,
                      close: x,
                      config: w,
                      emit: f,
                      getChildModal: b,
                      getParentModal: h,
                      id: c,
                      index: u,
                      isOpen: v,
                      modalContext: y,
                      onTopOfStack: p,
                      reload: E,
                      setOpen: T,
                      shouldRender: A
                    })
                  }
                ) : /* @__PURE__ */ P(
                  bl,
                  {
                    modalContext: y,
                    config: w,
                    children: m({
                      afterLeave: g,
                      close: x,
                      config: w,
                      emit: f,
                      getChildModal: b,
                      getParentModal: h,
                      id: c,
                      index: u,
                      isOpen: v,
                      modalContext: y,
                      onTopOfStack: p,
                      reload: E,
                      setOpen: T,
                      shouldRender: A
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
$l.displayName = "Modal";
const Dl = ({
  href: e,
  method: t = "get",
  data: n = {},
  as: r = "a",
  headers: l = {},
  queryStringArrayFormat: i = "brackets",
  onAfterLeave: a = null,
  onBlur: s = null,
  onClose: o = null,
  onError: m = null,
  onFocus: d = null,
  onStart: g = null,
  onSuccess: x = null,
  navigate: w = null,
  children: f,
  ...b
}) => {
  const [h, c] = S(!1), [u, v] = S(null), { stack: y, visit: p } = Ve(), E = C(() => w ?? mt("navigate"), [w]), T = {}, A = {};
  Object.keys(b).forEach((L) => {
    bt.includes(L) || (L.startsWith("on") && typeof b[L] == "function" ? L.toLowerCase() in window ? T[L] = b[L] : A[L] = b[L] : T[L] = b[L]);
  });
  const [G, N] = S(!1);
  M(() => {
    u && (u.onTopOfStack && G ? d == null || d() : !u.onTopOfStack && !G && (s == null || s()), N(!u.onTopOfStack));
  }, [y]);
  const H = W(() => {
    o == null || o();
  }, [o]), V = W(() => {
    v(null), a == null || a();
  }, [a]), X = W(
    (L) => {
      L == null || L.preventDefault(), !h && (e.startsWith("#") || (c(!0), g == null || g()), p(
        e,
        t,
        n,
        l,
        Ln(Mn(b, bt)),
        () => H(y.length),
        V,
        i,
        E
      ).then((k) => {
        v(k), k.registerEventListenersFromProps(A), x == null || x();
      }).catch((k) => {
        console.error(k), m == null || m(k);
      }).finally(() => c(!1)));
    },
    [e, t, n, l, i, b, H, V]
  );
  return /* @__PURE__ */ P(
    r,
    {
      ...T,
      href: e,
      onClick: X,
      children: typeof f == "function" ? f({ loading: h }) : f
    }
  );
}, Ol = ({ children: e, data: t, params: n, buffer: r, as: l, always: i, fallback: a }) => {
  i = i ?? !1, l = l ?? "div", a = a ?? null;
  const [s, o] = S(!1), m = O(!1), d = O(!1), g = O(null), x = kt(), w = W(() => {
    if (t)
      return {
        only: Array.isArray(t) ? t : [t]
      };
    if (!n)
      throw new Error("You must provide either a `data` or `params` prop.");
    return n;
  }, [n, t]);
  return M(() => {
    if (!g.current)
      return;
    const f = new IntersectionObserver(
      (b) => {
        if (!b[0].isIntersecting || (!i && m.current && f.disconnect(), d.current))
          return;
        m.current = !0, d.current = !0;
        const h = w();
        x.reload({
          ...h,
          onStart: (c) => {
            var u;
            d.current = !0, (u = h.onStart) == null || u.call(h, c);
          },
          onFinish: (c) => {
            var u;
            o(!0), d.current = !1, (u = h.onFinish) == null || u.call(h, c), i || f.disconnect();
          }
        });
      },
      {
        rootMargin: `${r || 0}px`
      }
    );
    return f.observe(g.current), () => {
      f.disconnect();
    };
  }, [g, w, r]), i || !s ? Me(
    l,
    {
      props: null,
      ref: g
    },
    s ? e : a
  ) : s ? e : null;
};
Ol.displayName = "InertiaWhenVisible";
const jl = (e) => (t) => (t.default.layout = (n) => Me(e, {}, n), t);
export {
  Nn as Deferred,
  Rt as HeadlessModal,
  $l as Modal,
  Dl as ModalLink,
  An as ModalRoot,
  Fn as ModalStackProvider,
  Ol as WhenVisible,
  mt as getConfig,
  Cn as initFromPageProps,
  Nl as putConfig,
  Il as renderApp,
  Al as resetConfig,
  jl as setPageLayout,
  kt as useModal,
  Nt as useModalIndex,
  Ve as useModalStack
};
