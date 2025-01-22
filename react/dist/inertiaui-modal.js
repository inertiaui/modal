var fn = Object.defineProperty;
var mn = (e, t, n) => t in e ? fn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var q = (e, t, n) => mn(e, typeof t != "symbol" ? t + "" : t, n);
import * as Ee from "react";
import E, { createContext as U, useState as L, useEffect as M, useContext as R, useRef as O, createElement as Ie, useMemo as C, forwardRef as dt, useImperativeHandle as Lt, useLayoutEffect as pn, useCallback as Y, Fragment as G, isValidElement as hn, cloneElement as vn, useId as Pe, useSyncExternalStore as gn, useReducer as wn, createRef as yn } from "react";
import { jsx as T, jsxs as ue, Fragment as ct } from "react/jsx-runtime";
import Re from "axios";
import { router as xe, usePage as xn } from "@inertiajs/react";
import { mergeDataIntoQueryString as bn } from "@inertiajs/core";
import { createPortal as En } from "react-dom";
const ge = {
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
class $n {
  constructor() {
    this.config = {}, this.reset();
  }
  reset() {
    this.config = JSON.parse(JSON.stringify(ge));
  }
  put(t, n) {
    if (typeof t == "object") {
      this.config = {
        type: t.type ?? ge.type,
        navigate: t.navigate ?? ge.navigate,
        modal: { ...ge.modal, ...t.modal ?? {} },
        slideover: { ...ge.slideover, ...t.slideover ?? {} }
      };
      return;
    }
    const r = t.split(".");
    let l = this.config;
    for (let a = 0; a < r.length - 1; a++)
      l = l[r[a]] = l[r[a]] || {};
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
const We = new $n(), Ml = () => We.reset(), Sl = (e, t) => We.put(e, t), ft = (e) => We.get(e), de = (e, t) => We.get(e ? `slideover.${t}` : `modal.${t}`);
function Qe(e = "inertiaui_modal_") {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `${e}${crypto.randomUUID()}` : `${e}${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
}
function Tn(e, t) {
  return Array.isArray(e) ? e.filter((n) => !t.includes(n)) : Object.keys(e).reduce((n, r) => (t.includes(r) || (n[r] = e[r]), n), {});
}
function Ft(e, t) {
  return Array.isArray(e) ? e.filter((n) => t.includes(n)) : t.reduce((n, r) => (r in e && (n[r] = e[r]), n), {});
}
function On(e) {
  return Array.isArray(e) ? e.filter((t) => t !== null) : Object.keys(e).reduce((t, n) => (n in e && e[n] !== null && (t[n] = e[n]), t), {});
}
function Pn(e, t = 3, n = 10) {
  return new Promise((r, l) => {
    const a = e();
    if (a) {
      r(a);
      return;
    }
    let o = t * 1e3 / n;
    const u = setInterval(() => {
      const i = e();
      i && (clearInterval(u), r(i)), --o <= 0 && (clearInterval(u), l(new Error("Condition not met in time")));
    }, n);
  });
}
function we(e) {
  return e ? (e = e.replace(/_/g, "-"), e = e.replace(/-+/g, "-"), /[A-Z]/.test(e) ? (e = e.replace(/\s+/g, "").replace(/_/g, "").replace(/(?:^|\s|-)+([A-Za-z])/g, (t, n) => n.toUpperCase()), e = e.replace(/(.)(?=[A-Z])/g, "$1-"), e.toLowerCase()) : e) : "";
}
const _e = U(null);
_e.displayName = "ModalStackContext";
let Ct = null, kt = null, $e = null, nt = null, rt = [], ce = {};
const Mn = ({ children: e }) => {
  const [t, n] = L([]), [r, l] = L({}), a = (v) => {
    n((s) => {
      const m = v([...s]), p = (g) => {
        var x;
        return m.length < 2 ? !0 : ((x = m.map((h) => ({ id: h.id, shouldRender: h.shouldRender })).reverse().find((h) => h.shouldRender)) == null ? void 0 : x.id) === g;
      };
      return m.forEach((g, x) => {
        m[x].onTopOfStack = p(g.id), m[x].getParentModal = () => x < 1 ? null : m.slice(0, x).reverse().find((h) => h.isOpen), m[x].getChildModal = () => x === m.length - 1 ? null : m.slice(x + 1).find((h) => h.isOpen);
      }), m;
    });
  };
  M(() => {
    rt = t;
  }, [t]);
  class o {
    constructor(s, m, p, g, x) {
      q(this, "show", () => {
        a(
          (s) => s.map((m) => (m.id === this.id && !m.isOpen && (m.isOpen = !0, m.shouldRender = !0), m))
        );
      });
      q(this, "setOpen", (s) => {
        s ? this.show() : this.close();
      });
      q(this, "close", () => {
        a(
          (s) => s.map((m) => {
            var p;
            return m.id === this.id && m.isOpen && (Object.keys(m.listeners).forEach((g) => {
              m.off(g);
            }), m.isOpen = !1, (p = m.onCloseCallback) == null || p.call(m)), m;
          })
        );
      });
      q(this, "afterLeave", () => {
        this.isOpen || a((s) => {
          const m = s.map((p) => {
            var g;
            return p.id === this.id && !p.isOpen && (p.shouldRender = !1, (g = p.afterLeaveCallback) == null || g.call(p), p.afterLeaveCallback = null), p;
          });
          return this.index === 0 ? [] : m;
        });
      });
      q(this, "on", (s, m) => {
        s = we(s), this.listeners[s] = this.listeners[s] ?? [], this.listeners[s].push(m);
      });
      q(this, "off", (s, m) => {
        var p;
        s = we(s), m ? this.listeners[s] = ((p = this.listeners[s]) == null ? void 0 : p.filter((g) => g !== m)) ?? [] : delete this.listeners[s];
      });
      q(this, "emit", (s, ...m) => {
        var p;
        (p = this.listeners[we(s)]) == null || p.forEach((g) => g(...m));
      });
      q(this, "registerEventListenersFromProps", (s) => {
        const m = [];
        return Object.keys(s).filter((p) => p.startsWith("on")).forEach((p) => {
          const g = we(p).replace(/^on-/, "");
          this.on(g, s[p]), m.push(() => this.off(g, s[p]));
        }), () => m.forEach((p) => p());
      });
      q(this, "reload", (s = {}) => {
        var p;
        let m = Object.keys(this.response.props);
        s.only && (m = Ft(m, s.only)), s.except && (m = Tn(m, s.except)), (p = this.response) != null && p.url && Re.get(this.response.url, {
          headers: {
            Accept: "text/html, application/xhtml+xml",
            "X-Inertia": !0,
            "X-Inertia-Partial-Component": this.response.component,
            "X-Inertia-Version": this.response.version,
            "X-Inertia-Partial-Data": m.join(","),
            "X-InertiaUI-Modal": Qe(),
            "X-InertiaUI-Modal-Use-Router": 0,
            "X-InertiaUI-Modal-Base-Url": $e
          }
        }).then((g) => {
          this.updateProps(g.data.props);
        });
      });
      q(this, "updateProps", (s) => {
        Object.assign(this.props, s), a((m) => m);
      });
      if (this.id = m.id ?? Qe(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = s, this.props = m.props, this.response = m, this.config = p ?? {}, this.onCloseCallback = g, this.afterLeaveCallback = x, ce[this.id]) {
        this.config = {
          ...this.config,
          ...ce[this.id].config ?? {}
        };
        const h = ce[this.id].onClose, $ = ce[this.id].onAfterLeave;
        h && (this.onCloseCallback = g ? () => {
          g(), h();
        } : h), $ && (this.afterLeaveCallback = x ? () => {
          x(), $();
        } : $), delete ce[this.id];
      }
      this.index = -1, this.getParentModal = () => null, this.getChildModal = () => null, this.onTopOfStack = !0;
    }
    static generateId() {
      return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `inertiaui_modal_${crypto.randomUUID()}` : `inertiaui_modal_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
    }
  }
  const u = (v, s = {}, m = null, p = null) => kt(v.component).then((g) => i(g, v, s, m, p)), i = (v, s, m, p, g) => {
    const x = new o(v, s, m, p, g);
    return x.index = t.length, a((h) => [...h, x]), x.show(), x;
  };
  function d(v, s, m, p) {
    if (!r[v])
      throw new Error(`The local modal "${v}" has not been registered.`);
    const g = i(null, {}, s, m, p);
    return g.name = v, r[v].callback(g), g;
  }
  const f = (v, s = {}) => y(
    v,
    s.method ?? "get",
    s.data ?? {},
    s.headers ?? {},
    s.config ?? {},
    s.onClose,
    s.onAfterLeave,
    s.queryStringArrayFormat ?? "brackets",
    s.navigate ?? ft("navigate")
  ).then((m) => {
    const p = s.listeners ?? {};
    return Object.keys(p).forEach((g) => {
      const x = we(g);
      m.on(x, p[g]);
    }), m;
  }), y = (v, s, m = {}, p = {}, g = {}, x = null, h = null, $ = "brackets", F = !1) => {
    const j = Qe();
    return new Promise((_, N) => {
      if (v.startsWith("#")) {
        _(d(v.substring(1), g, x, h));
        return;
      }
      const [H, B] = bn(s, v || "", m, $);
      let X = F && t.length === 0;
      if (t.length === 0 && ($e = typeof window < "u" ? window.location.href : ""), p = {
        ...p,
        Accept: "text/html, application/xhtml+xml",
        "X-Requested-With": "XMLHttpRequest",
        "X-Inertia": !0,
        "X-Inertia-Version": Ct,
        "X-InertiaUI-Modal": j,
        "X-InertiaUI-Modal-Use-Router": X ? 1 : 0,
        "X-InertiaUI-Modal-Base-Url": $e
      }, X)
        return nt = null, ce[j] = {
          config: g,
          onClose: x,
          onAfterLeave: h
        }, xe.visit(H, {
          method: s,
          data: B,
          headers: p,
          preserveScroll: !0,
          preserveState: !0,
          onError: N,
          onFinish: () => {
            Pn(() => nt).then(_);
          }
        });
      Re({
        url: H,
        method: s,
        data: B,
        headers: p
      }).then((P) => _(u(P.data, g, x, h))).catch((P) => {
        N(P);
      });
    });
  }, c = {
    stack: t,
    localModals: r,
    push: i,
    pushFromResponseData: u,
    closeAll: () => {
      rt.reverse().forEach((v) => v.close());
    },
    reset: () => a(() => []),
    visit: y,
    visitModal: f,
    registerLocalModal: (v, s) => {
      l((m) => ({
        ...m,
        [v]: { name: v, callback: s }
      }));
    },
    removeLocalModal: (v) => {
      l((s) => {
        const m = { ...s };
        return delete m[v], m;
      });
    }
  };
  return /* @__PURE__ */ T(_e.Provider, { value: c, children: e });
}, Be = () => {
  const e = R(_e);
  if (e === null)
    throw new Error("useModalStack must be used within a ModalStackProvider");
  return e;
}, xt = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], Sn = (e) => {
  e.initialPage && (Ct = e.initialPage.version), e.resolveComponent && (kt = e.resolveComponent);
}, Ll = (e, t) => (Sn(t), /* @__PURE__ */ T(Mn, { children: /* @__PURE__ */ T(e, { ...t, children: ({ Component: r, props: l, key: a }) => /* @__PURE__ */ ue(ct, { children: [
  (() => {
    const u = Ie(r, { key: a, ...l });
    return typeof r.layout == "function" ? r.layout(u) : Array.isArray(r.layout) ? r.layout.concat(u).reverse().reduce((d, f) => Ie(f, l, d)) : u;
  })(),
  /* @__PURE__ */ T(Ln, {})
] }) }) })), Ln = ({ children: e }) => {
  var u;
  const t = R(_e);
  let n = !1, r = !1;
  M(() => xe.on("start", () => n = !0), []), M(() => xe.on("finish", () => n = !1), []), M(
    () => xe.on("navigate", function(i) {
      const d = i.detail.page.props._inertiaui_modal;
      if (!d) {
        r && t.closeAll();
        return;
      }
      r = d, $e = d.baseUrl, t.pushFromResponseData(d, {}, () => {
        if (!d.baseUrl) {
          console.error("No base url in modal response data so cannot navigate back");
          return;
        }
        !n && window.location.href !== d.baseUrl && xe.visit(d.baseUrl, {
          preserveScroll: !0,
          preserveState: !0
        });
      }).then((f) => {
        nt = f;
      });
    }),
    []
  );
  const l = (i) => (rt.length && (i.headers["X-InertiaUI-Modal-Base-Url"] = $e), i);
  M(() => (Re.interceptors.request.use(l), () => Re.interceptors.request.eject(l)), []);
  const a = xn(), o = O();
  return M(() => {
    var f, y;
    const i = (f = a.props) == null ? void 0 : f._inertiaui_modal, d = o.current;
    o.current = i, i && d && i.component === d.component && i.url === d.url && ((y = t.stack[0]) == null || y.updateProps(i.props ?? {}));
  }, [(u = a.props) == null ? void 0 : u._inertiaui_modal]), /* @__PURE__ */ ue(ct, { children: [
    e,
    t.stack.length > 0 && /* @__PURE__ */ T(At, { index: 0 })
  ] });
}, mt = E.createContext(null);
mt.displayName = "ModalIndexContext";
const Nt = () => {
  const e = E.useContext(mt);
  if (e === void 0)
    throw new Error("useModalIndex must be used within a ModalIndexProvider");
  return e;
}, At = ({ index: e }) => {
  const { stack: t } = Be(), n = C(() => t[e], [t, e]);
  return (n == null ? void 0 : n.component) && /* @__PURE__ */ T(mt.Provider, { value: e, children: /* @__PURE__ */ T(
    n.component,
    {
      ...n.props,
      onModalEvent: (...r) => n.emit(...r)
    }
  ) });
}, It = dt(({ name: e, children: t, onFocus: n = null, onBlur: r = null, onClose: l = null, onSuccess: a = null, ...o }, u) => {
  const i = Nt(), { stack: d, registerLocalModal: f, removeLocalModal: y } = Be(), [b, w] = L(null), c = C(() => e ? b : d[i], [e, b, i, d]), v = C(() => {
    var h;
    return (h = d.find(($) => $.shouldRender && $.index > (c == null ? void 0 : c.index))) == null ? void 0 : h.index;
  }, [i, d]), s = C(() => (c == null ? void 0 : c.config.slideover) ?? o.slideover ?? ft("type") === "slideover", [o.slideover]), m = C(
    () => ({
      slideover: s,
      closeButton: o.closeButton ?? de(s, "closeButton"),
      closeExplicitly: o.closeExplicitly ?? de(s, "closeExplicitly"),
      maxWidth: o.maxWidth ?? de(s, "maxWidth"),
      paddingClasses: o.paddingClasses ?? de(s, "paddingClasses"),
      panelClasses: o.panelClasses ?? de(s, "panelClasses"),
      position: o.position ?? de(s, "position"),
      ...c == null ? void 0 : c.config
    }),
    [o, c == null ? void 0 : c.config]
  );
  M(() => {
    if (e) {
      let h = null;
      return f(e, ($) => {
        h = $.registerEventListenersFromProps(o), w($);
      }), () => {
        h == null || h(), h = null, y(e);
      };
    }
    return c.registerEventListenersFromProps(o);
  }, [e]);
  const p = O(c);
  M(() => {
    p.current = c;
  }, [c]), M(() => {
    c !== null && (c.isOpen ? a == null || a() : l == null || l());
  }, [c == null ? void 0 : c.isOpen]);
  const [g, x] = L(!1);
  return M(() => {
    g && c !== null && c.isOpen && (c.onTopOfStack ? n == null || n() : r == null || r()), x(!0);
  }, [c == null ? void 0 : c.onTopOfStack]), Lt(
    u,
    () => ({
      afterLeave: () => {
        var h;
        return (h = p.current) == null ? void 0 : h.afterLeave();
      },
      close: () => {
        var h;
        return (h = p.current) == null ? void 0 : h.close();
      },
      emit: (...h) => {
        var $;
        return ($ = p.current) == null ? void 0 : $.emit(...h);
      },
      getChildModal: () => {
        var h;
        return (h = p.current) == null ? void 0 : h.getChildModal();
      },
      getParentModal: () => {
        var h;
        return (h = p.current) == null ? void 0 : h.getParentModal();
      },
      reload: (...h) => {
        var $;
        return ($ = p.current) == null ? void 0 : $.reload(...h);
      },
      setOpen: () => {
        var h;
        return (h = p.current) == null ? void 0 : h.setOpen();
      },
      get id() {
        var h;
        return (h = p.current) == null ? void 0 : h.id;
      },
      get index() {
        var h;
        return (h = p.current) == null ? void 0 : h.index;
      },
      get isOpen() {
        var h;
        return (h = p.current) == null ? void 0 : h.isOpen;
      },
      get config() {
        var h;
        return (h = p.current) == null ? void 0 : h.config;
      },
      get modalContext() {
        return p.current;
      },
      get onTopOfStack() {
        var h;
        return (h = p.current) == null ? void 0 : h.onTopOfStack;
      },
      get shouldRender() {
        var h;
        return (h = p.current) == null ? void 0 : h.shouldRender;
      }
    }),
    [c]
  ), (c == null ? void 0 : c.shouldRender) && /* @__PURE__ */ ue(ct, { children: [
    typeof t == "function" ? t({
      afterLeave: c.afterLeave,
      close: c.close,
      config: m,
      emit: c.emit,
      getChildModal: c.getChildModal,
      getParentModal: c.getParentModal,
      id: c.id,
      index: c.index,
      isOpen: c.isOpen,
      modalContext: c,
      onTopOfStack: c.onTopOfStack,
      reload: c.reload,
      setOpen: c.setOpen,
      shouldRender: c.shouldRender
    }) : t,
    v && /* @__PURE__ */ T(At, { index: v })
  ] });
});
It.displayName = "HeadlessModal";
function Rt(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var l = e.length;
    for (t = 0; t < l; t++) e[t] && (n = Rt(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function De() {
  for (var e, t, n = 0, r = "", l = arguments.length; n < l; n++) (e = arguments[n]) && (t = Rt(e)) && (r && (r += " "), r += t);
  return r;
}
var Fn = Object.defineProperty, Cn = (e, t, n) => t in e ? Fn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, et = (e, t, n) => (Cn(e, typeof t != "symbol" ? t + "" : t, n), n);
let kn = class {
  constructor() {
    et(this, "current", this.detect()), et(this, "handoffState", "pending"), et(this, "currentId", 0);
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
}, oe = new kn();
function Xe(e) {
  return oe.isServer ? null : e instanceof Node ? e.ownerDocument : e != null && e.hasOwnProperty("current") && e.current instanceof Node ? e.current.ownerDocument : document;
}
function Ve(e) {
  typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch((t) => setTimeout(() => {
    throw t;
  }));
}
function re() {
  let e = [], t = { addEventListener(n, r, l, a) {
    return n.addEventListener(r, l, a), t.add(() => n.removeEventListener(r, l, a));
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
    return Ve(() => {
      r.current && n[0]();
    }), t.add(() => {
      r.current = !1;
    });
  }, style(n, r, l) {
    let a = n.style.getPropertyValue(r);
    return Object.assign(n.style, { [r]: l }), this.add(() => {
      Object.assign(n.style, { [r]: a });
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
function pt() {
  let [e] = L(re);
  return M(() => () => e.dispose(), [e]), e;
}
let A = (e, t) => {
  oe.isServer ? M(e, t) : pn(e, t);
};
function se(e) {
  let t = O(e);
  return A(() => {
    t.current = e;
  }, [e]), t;
}
let S = function(e) {
  let t = se(e);
  return E.useCallback((...n) => t.current(...n), [t]);
}, Nn = U(void 0);
function An() {
  return R(Nn);
}
function lt(...e) {
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
var je = ((e) => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(je || {}), te = ((e) => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(te || {});
function W() {
  let e = Rn();
  return Y((t) => In({ mergeRefs: e, ...t }), [e]);
}
function In({ ourProps: e, theirProps: t, slot: n, defaultTag: r, features: l, visible: a = !0, name: o, mergeRefs: u }) {
  u = u ?? Dn;
  let i = Dt(t, e);
  if (a) return Ae(i, n, r, o, u);
  let d = l ?? 0;
  if (d & 2) {
    let { static: f = !1, ...y } = i;
    if (f) return Ae(y, n, r, o, u);
  }
  if (d & 1) {
    let { unmount: f = !0, ...y } = i;
    return ne(f ? 0 : 1, { 0() {
      return null;
    }, 1() {
      return Ae({ ...y, hidden: !0, style: { display: "none" } }, n, r, o, u);
    } });
  }
  return Ae(i, n, r, o, u);
}
function Ae(e, t = {}, n, r, l) {
  let { as: a = n, children: o, refName: u = "ref", ...i } = tt(e, ["unmount", "static"]), d = e.ref !== void 0 ? { [u]: e.ref } : {}, f = typeof o == "function" ? o(t) : o;
  "className" in i && i.className && typeof i.className == "function" && (i.className = i.className(t)), i["aria-labelledby"] && i["aria-labelledby"] === i.id && (i["aria-labelledby"] = void 0);
  let y = {};
  if (t) {
    let b = !1, w = [];
    for (let [c, v] of Object.entries(t)) typeof v == "boolean" && (b = !0), v === !0 && w.push(c.replace(/([A-Z])/g, (s) => `-${s.toLowerCase()}`));
    if (b) {
      y["data-headlessui-state"] = w.join(" ");
      for (let c of w) y[`data-${c}`] = "";
    }
  }
  if (a === G && (Object.keys(le(i)).length > 0 || Object.keys(le(y)).length > 0)) if (!hn(f) || Array.isArray(f) && f.length > 1) {
    if (Object.keys(le(i)).length > 0) throw new Error(['Passing props on "Fragment"!', "", `The current component <${r} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(le(i)).concat(Object.keys(le(y))).map((b) => `  - ${b}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((b) => `  - ${b}`).join(`
`)].join(`
`));
  } else {
    let b = f.props, w = b == null ? void 0 : b.className, c = typeof w == "function" ? (...m) => lt(w(...m), i.className) : lt(w, i.className), v = c ? { className: c } : {}, s = Dt(f.props, le(tt(i, ["ref"])));
    for (let m in y) m in s && delete y[m];
    return vn(f, Object.assign({}, s, y, d, { ref: l(jn(f), d.ref) }, v));
  }
  return Ie(a, Object.assign({}, tt(i, ["ref"]), a !== G && d, a !== G && y), f);
}
function Rn() {
  let e = O([]), t = Y((n) => {
    for (let r of e.current) r != null && (typeof r == "function" ? r(n) : r.current = n);
  }, []);
  return (...n) => {
    if (!n.every((r) => r == null)) return e.current = n, t;
  };
}
function Dn(...e) {
  return e.every((t) => t == null) ? void 0 : (t) => {
    for (let n of e) n != null && (typeof n == "function" ? n(t) : n.current = t);
  };
}
function Dt(...e) {
  if (e.length === 0) return {};
  if (e.length === 1) return e[0];
  let t = {}, n = {};
  for (let r of e) for (let l in r) l.startsWith("on") && typeof r[l] == "function" ? (n[l] != null || (n[l] = []), n[l].push(r[l])) : t[l] = r[l];
  if (t.disabled || t["aria-disabled"]) for (let r in n) /^(on(?:Click|Pointer|Mouse|Key)(?:Down|Up|Press)?)$/.test(r) && (n[r] = [(l) => {
    var a;
    return (a = l == null ? void 0 : l.preventDefault) == null ? void 0 : a.call(l);
  }]);
  for (let r in n) Object.assign(t, { [r](l, ...a) {
    let o = n[r];
    for (let u of o) {
      if ((l instanceof Event || (l == null ? void 0 : l.nativeEvent) instanceof Event) && l.defaultPrevented) return;
      u(l, ...a);
    }
  } });
  return t;
}
function D(e) {
  var t;
  return Object.assign(dt(e), { displayName: (t = e.displayName) != null ? t : e.name });
}
function le(e) {
  let t = Object.assign({}, e);
  for (let n in t) t[n] === void 0 && delete t[n];
  return t;
}
function tt(e, t = []) {
  let n = Object.assign({}, e);
  for (let r of t) r in n && delete n[r];
  return n;
}
function jn(e) {
  return E.version.split(".")[0] >= "19" ? e.props.ref : e.ref;
}
let Hn = "span";
var He = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(He || {});
function Un(e, t) {
  var n;
  let { features: r = 1, ...l } = e, a = { ref: t, "aria-hidden": (r & 2) === 2 ? !0 : (n = l["aria-hidden"]) != null ? n : void 0, hidden: (r & 4) === 4 ? !0 : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(r & 4) === 4 && (r & 2) !== 2 && { display: "none" } } };
  return W()({ ourProps: a, theirProps: l, slot: {}, defaultTag: Hn, name: "Hidden" });
}
let it = D(Un), jt = Symbol();
function Wn(e, t = !0) {
  return Object.assign(e, { [jt]: t });
}
function Z(...e) {
  let t = O(e);
  M(() => {
    t.current = e;
  }, [e]);
  let n = S((r) => {
    for (let l of t.current) l != null && (typeof l == "function" ? l(r) : l.current = r);
  });
  return e.every((r) => r == null || (r == null ? void 0 : r[jt])) ? void 0 : n;
}
let ht = U(null);
ht.displayName = "DescriptionContext";
function Ht() {
  let e = R(ht);
  if (e === null) {
    let t = new Error("You used a <Description /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(t, Ht), t;
  }
  return e;
}
function _n() {
  let [e, t] = L([]);
  return [e.length > 0 ? e.join(" ") : void 0, C(() => function(n) {
    let r = S((a) => (t((o) => [...o, a]), () => t((o) => {
      let u = o.slice(), i = u.indexOf(a);
      return i !== -1 && u.splice(i, 1), u;
    }))), l = C(() => ({ register: r, slot: n.slot, name: n.name, props: n.props, value: n.value }), [r, n.slot, n.name, n.props, n.value]);
    return E.createElement(ht.Provider, { value: l }, n.children);
  }, [t])];
}
let Bn = "p";
function Xn(e, t) {
  let n = Pe(), r = An(), { id: l = `headlessui-description-${n}`, ...a } = e, o = Ht(), u = Z(t);
  A(() => o.register(l), [l, o.register]);
  let i = r || !1, d = C(() => ({ ...o.slot, disabled: i }), [o.slot, i]), f = { ref: u, ...o.props, id: l };
  return W()({ ourProps: f, theirProps: a, slot: d, defaultTag: Bn, name: o.name || "Description" });
}
let Vn = D(Xn), qn = Object.assign(Vn, {});
var Ut = ((e) => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(Ut || {});
let Yn = U(() => {
});
function zn({ value: e, children: t }) {
  return E.createElement(Yn.Provider, { value: e }, t);
}
let Gn = class extends Map {
  constructor(t) {
    super(), this.factory = t;
  }
  get(t) {
    let n = super.get(t);
    return n === void 0 && (n = this.factory(t), this.set(t, n)), n;
  }
};
function Wt(e, t) {
  let n = e(), r = /* @__PURE__ */ new Set();
  return { getSnapshot() {
    return n;
  }, subscribe(l) {
    return r.add(l), () => r.delete(l);
  }, dispatch(l, ...a) {
    let o = t[l].call(n, ...a);
    o && (n = o, r.forEach((u) => u()));
  } };
}
function _t(e) {
  return gn(e.subscribe, e.getSnapshot, e.getSnapshot);
}
let Kn = new Gn(() => Wt(() => [], { ADD(e) {
  return this.includes(e) ? this : [...this, e];
}, REMOVE(e) {
  let t = this.indexOf(e);
  if (t === -1) return this;
  let n = this.slice();
  return n.splice(t, 1), n;
} }));
function fe(e, t) {
  let n = Kn.get(t), r = Pe(), l = _t(n);
  if (A(() => {
    if (e) return n.dispatch("ADD", r), () => n.dispatch("REMOVE", r);
  }, [n, e]), !e) return !1;
  let a = l.indexOf(r), o = l.length;
  return a === -1 && (a = o, o += 1), a === o - 1;
}
let at = /* @__PURE__ */ new Map(), Te = /* @__PURE__ */ new Map();
function bt(e) {
  var t;
  let n = (t = Te.get(e)) != null ? t : 0;
  return Te.set(e, n + 1), n !== 0 ? () => Et(e) : (at.set(e, { "aria-hidden": e.getAttribute("aria-hidden"), inert: e.inert }), e.setAttribute("aria-hidden", "true"), e.inert = !0, () => Et(e));
}
function Et(e) {
  var t;
  let n = (t = Te.get(e)) != null ? t : 1;
  if (n === 1 ? Te.delete(e) : Te.set(e, n - 1), n !== 1) return;
  let r = at.get(e);
  r && (r["aria-hidden"] === null ? e.removeAttribute("aria-hidden") : e.setAttribute("aria-hidden", r["aria-hidden"]), e.inert = r.inert, at.delete(e));
}
function Zn(e, { allowed: t, disallowed: n } = {}) {
  let r = fe(e, "inert-others");
  A(() => {
    var l, a;
    if (!r) return;
    let o = re();
    for (let i of (l = n == null ? void 0 : n()) != null ? l : []) i && o.add(bt(i));
    let u = (a = t == null ? void 0 : t()) != null ? a : [];
    for (let i of u) {
      if (!i) continue;
      let d = Xe(i);
      if (!d) continue;
      let f = i.parentElement;
      for (; f && f !== d.body; ) {
        for (let y of f.children) u.some((b) => y.contains(b)) || o.add(bt(y));
        f = f.parentElement;
      }
    }
    return o.dispose;
  }, [r, t, n]);
}
function Jn(e, t, n) {
  let r = se((l) => {
    let a = l.getBoundingClientRect();
    a.x === 0 && a.y === 0 && a.width === 0 && a.height === 0 && n();
  });
  M(() => {
    if (!e) return;
    let l = t === null ? null : t instanceof HTMLElement ? t : t.current;
    if (!l) return;
    let a = re();
    if (typeof ResizeObserver < "u") {
      let o = new ResizeObserver(() => r.current(l));
      o.observe(l), a.add(() => o.disconnect());
    }
    if (typeof IntersectionObserver < "u") {
      let o = new IntersectionObserver(() => r.current(l));
      o.observe(l), a.add(() => o.disconnect());
    }
    return () => a.dispose();
  }, [t, r, e]);
}
let Ue = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e) => `${e}:not([tabindex='-1'])`).join(","), Qn = ["[data-autofocus]"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var J = ((e) => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e[e.AutoFocus = 64] = "AutoFocus", e))(J || {}), ot = ((e) => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(ot || {}), er = ((e) => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(er || {});
function tr(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(Ue)).sort((t, n) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (n.tabIndex || Number.MAX_SAFE_INTEGER)));
}
function nr(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(Qn)).sort((t, n) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (n.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var Bt = ((e) => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(Bt || {});
function rr(e, t = 0) {
  var n;
  return e === ((n = Xe(e)) == null ? void 0 : n.body) ? !1 : ne(t, { 0() {
    return e.matches(Ue);
  }, 1() {
    let r = e;
    for (; r !== null; ) {
      if (r.matches(Ue)) return !0;
      r = r.parentElement;
    }
    return !1;
  } });
}
var lr = ((e) => (e[e.Keyboard = 0] = "Keyboard", e[e.Mouse = 1] = "Mouse", e))(lr || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (e) => {
  e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (e) => {
  e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
function Q(e) {
  e == null || e.focus({ preventScroll: !0 });
}
let ir = ["textarea", "input"].join(",");
function ar(e) {
  var t, n;
  return (n = (t = e == null ? void 0 : e.matches) == null ? void 0 : t.call(e, ir)) != null ? n : !1;
}
function or(e, t = (n) => n) {
  return e.slice().sort((n, r) => {
    let l = t(n), a = t(r);
    if (l === null || a === null) return 0;
    let o = l.compareDocumentPosition(a);
    return o & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : o & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function Oe(e, t, { sorted: n = !0, relativeTo: r = null, skipElements: l = [] } = {}) {
  let a = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : document : e.ownerDocument, o = Array.isArray(e) ? n ? or(e) : e : t & 64 ? nr(e) : tr(e);
  l.length > 0 && o.length > 1 && (o = o.filter((w) => !l.some((c) => c != null && "current" in c ? (c == null ? void 0 : c.current) === w : c === w))), r = r ?? a.activeElement;
  let u = (() => {
    if (t & 5) return 1;
    if (t & 10) return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), i = (() => {
    if (t & 1) return 0;
    if (t & 2) return Math.max(0, o.indexOf(r)) - 1;
    if (t & 4) return Math.max(0, o.indexOf(r)) + 1;
    if (t & 8) return o.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), d = t & 32 ? { preventScroll: !0 } : {}, f = 0, y = o.length, b;
  do {
    if (f >= y || f + y <= 0) return 0;
    let w = i + f;
    if (t & 16) w = (w + y) % y;
    else {
      if (w < 0) return 3;
      if (w >= y) return 1;
    }
    b = o[w], b == null || b.focus(d), f += u;
  } while (b !== a.activeElement);
  return t & 6 && ar(b) && b.select(), 2;
}
function Xt() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function ur() {
  return /Android/gi.test(window.navigator.userAgent);
}
function sr() {
  return Xt() || ur();
}
function ye(e, t, n, r) {
  let l = se(n);
  M(() => {
    if (!e) return;
    function a(o) {
      l.current(o);
    }
    return document.addEventListener(t, a, r), () => document.removeEventListener(t, a, r);
  }, [e, t, r]);
}
function Vt(e, t, n, r) {
  let l = se(n);
  M(() => {
    if (!e) return;
    function a(o) {
      l.current(o);
    }
    return window.addEventListener(t, a, r), () => window.removeEventListener(t, a, r);
  }, [e, t, r]);
}
const $t = 30;
function dr(e, t, n) {
  let r = fe(e, "outside-click"), l = se(n), a = Y(function(i, d) {
    if (i.defaultPrevented) return;
    let f = d(i);
    if (f === null || !f.getRootNode().contains(f) || !f.isConnected) return;
    let y = function b(w) {
      return typeof w == "function" ? b(w()) : Array.isArray(w) || w instanceof Set ? w : [w];
    }(t);
    for (let b of y) if (b !== null && (b.contains(f) || i.composed && i.composedPath().includes(b))) return;
    return !rr(f, Bt.Loose) && f.tabIndex !== -1 && i.preventDefault(), l.current(i, f);
  }, [l, t]), o = O(null);
  ye(r, "pointerdown", (i) => {
    var d, f;
    o.current = ((f = (d = i.composedPath) == null ? void 0 : d.call(i)) == null ? void 0 : f[0]) || i.target;
  }, !0), ye(r, "mousedown", (i) => {
    var d, f;
    o.current = ((f = (d = i.composedPath) == null ? void 0 : d.call(i)) == null ? void 0 : f[0]) || i.target;
  }, !0), ye(r, "click", (i) => {
    sr() || o.current && (a(i, () => o.current), o.current = null);
  }, !0);
  let u = O({ x: 0, y: 0 });
  ye(r, "touchstart", (i) => {
    u.current.x = i.touches[0].clientX, u.current.y = i.touches[0].clientY;
  }, !0), ye(r, "touchend", (i) => {
    let d = { x: i.changedTouches[0].clientX, y: i.changedTouches[0].clientY };
    if (!(Math.abs(d.x - u.current.x) >= $t || Math.abs(d.y - u.current.y) >= $t)) return a(i, () => i.target instanceof HTMLElement ? i.target : null);
  }, !0), Vt(r, "blur", (i) => a(i, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), !0);
}
function Me(...e) {
  return C(() => Xe(...e), [...e]);
}
function qt(e, t, n, r) {
  let l = se(n);
  M(() => {
    e = e ?? window;
    function a(o) {
      l.current(o);
    }
    return e.addEventListener(t, a, r), () => e.removeEventListener(t, a, r);
  }, [e, t, r]);
}
function cr() {
  let e;
  return { before({ doc: t }) {
    var n;
    let r = t.documentElement, l = (n = t.defaultView) != null ? n : window;
    e = Math.max(0, l.innerWidth - r.clientWidth);
  }, after({ doc: t, d: n }) {
    let r = t.documentElement, l = Math.max(0, r.clientWidth - r.offsetWidth), a = Math.max(0, e - l);
    n.style(r, "paddingRight", `${a}px`);
  } };
}
function fr() {
  return Xt() ? { before({ doc: e, d: t, meta: n }) {
    function r(l) {
      return n.containers.flatMap((a) => a()).some((a) => a.contains(l));
    }
    t.microTask(() => {
      var l;
      if (window.getComputedStyle(e.documentElement).scrollBehavior !== "auto") {
        let u = re();
        u.style(e.documentElement, "scrollBehavior", "auto"), t.add(() => t.microTask(() => u.dispose()));
      }
      let a = (l = window.scrollY) != null ? l : window.pageYOffset, o = null;
      t.addEventListener(e, "click", (u) => {
        if (u.target instanceof HTMLElement) try {
          let i = u.target.closest("a");
          if (!i) return;
          let { hash: d } = new URL(i.href), f = e.querySelector(d);
          f && !r(f) && (o = f);
        } catch {
        }
      }, !0), t.addEventListener(e, "touchstart", (u) => {
        if (u.target instanceof HTMLElement) if (r(u.target)) {
          let i = u.target;
          for (; i.parentElement && r(i.parentElement); ) i = i.parentElement;
          t.style(i, "overscrollBehavior", "contain");
        } else t.style(u.target, "touchAction", "none");
      }), t.addEventListener(e, "touchmove", (u) => {
        if (u.target instanceof HTMLElement) {
          if (u.target.tagName === "INPUT") return;
          if (r(u.target)) {
            let i = u.target;
            for (; i.parentElement && i.dataset.headlessuiPortal !== "" && !(i.scrollHeight > i.clientHeight || i.scrollWidth > i.clientWidth); ) i = i.parentElement;
            i.dataset.headlessuiPortal === "" && u.preventDefault();
          } else u.preventDefault();
        }
      }, { passive: !1 }), t.add(() => {
        var u;
        let i = (u = window.scrollY) != null ? u : window.pageYOffset;
        a !== i && window.scrollTo(0, a), o && o.isConnected && (o.scrollIntoView({ block: "nearest" }), o = null);
      });
    });
  } } : {};
}
function mr() {
  return { before({ doc: e, d: t }) {
    t.style(e.documentElement, "overflow", "hidden");
  } };
}
function pr(e) {
  let t = {};
  for (let n of e) Object.assign(t, n(t));
  return t;
}
let ae = Wt(() => /* @__PURE__ */ new Map(), { PUSH(e, t) {
  var n;
  let r = (n = this.get(e)) != null ? n : { doc: e, count: 0, d: re(), meta: /* @__PURE__ */ new Set() };
  return r.count++, r.meta.add(t), this.set(e, r), this;
}, POP(e, t) {
  let n = this.get(e);
  return n && (n.count--, n.meta.delete(t)), this;
}, SCROLL_PREVENT({ doc: e, d: t, meta: n }) {
  let r = { doc: e, d: t, meta: pr(n) }, l = [fr(), cr(), mr()];
  l.forEach(({ before: a }) => a == null ? void 0 : a(r)), l.forEach(({ after: a }) => a == null ? void 0 : a(r));
}, SCROLL_ALLOW({ d: e }) {
  e.dispose();
}, TEARDOWN({ doc: e }) {
  this.delete(e);
} });
ae.subscribe(() => {
  let e = ae.getSnapshot(), t = /* @__PURE__ */ new Map();
  for (let [n] of e) t.set(n, n.documentElement.style.overflow);
  for (let n of e.values()) {
    let r = t.get(n.doc) === "hidden", l = n.count !== 0;
    (l && !r || !l && r) && ae.dispatch(n.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", n), n.count === 0 && ae.dispatch("TEARDOWN", n);
  }
});
function hr(e, t, n = () => ({ containers: [] })) {
  let r = _t(ae), l = t ? r.get(t) : void 0, a = l ? l.count > 0 : !1;
  return A(() => {
    if (!(!t || !e)) return ae.dispatch("PUSH", t, n), () => ae.dispatch("POP", t, n);
  }, [e, t]), a;
}
function vr(e, t, n = () => [document.body]) {
  let r = fe(e, "scroll-lock");
  hr(r, t, (l) => {
    var a;
    return { containers: [...(a = l.containers) != null ? a : [], n] };
  });
}
function gr(e = 0) {
  let [t, n] = L(e), r = Y((i) => n(i), [t]), l = Y((i) => n((d) => d | i), [t]), a = Y((i) => (t & i) === i, [t]), o = Y((i) => n((d) => d & ~i), [n]), u = Y((i) => n((d) => d ^ i), [n]);
  return { flags: t, setFlag: r, addFlag: l, hasFlag: a, removeFlag: o, toggleFlag: u };
}
var Tt, Ot;
typeof process < "u" && typeof globalThis < "u" && typeof Element < "u" && ((Tt = process == null ? void 0 : process.env) == null ? void 0 : Tt.NODE_ENV) === "test" && typeof ((Ot = Element == null ? void 0 : Element.prototype) == null ? void 0 : Ot.getAnimations) > "u" && (Element.prototype.getAnimations = function() {
  return console.warn(["Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.", "Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.", "", "Example usage:", "```js", "import { mockAnimationsApi } from 'jsdom-testing-mocks'", "mockAnimationsApi()", "```"].join(`
`)), [];
});
var wr = ((e) => (e[e.None = 0] = "None", e[e.Closed = 1] = "Closed", e[e.Enter = 2] = "Enter", e[e.Leave = 4] = "Leave", e))(wr || {});
function yr(e) {
  let t = {};
  for (let n in e) e[n] === !0 && (t[`data-${n}`] = "");
  return t;
}
function xr(e, t, n, r) {
  let [l, a] = L(n), { hasFlag: o, addFlag: u, removeFlag: i } = gr(e && l ? 3 : 0), d = O(!1), f = O(!1), y = pt();
  return A(() => {
    var b;
    if (e) {
      if (n && a(!0), !t) {
        n && u(3);
        return;
      }
      return (b = r == null ? void 0 : r.start) == null || b.call(r, n), br(t, { inFlight: d, prepare() {
        f.current ? f.current = !1 : f.current = d.current, d.current = !0, !f.current && (n ? (u(3), i(4)) : (u(4), i(2)));
      }, run() {
        f.current ? n ? (i(3), u(4)) : (i(4), u(3)) : n ? i(1) : u(1);
      }, done() {
        var w;
        f.current && typeof t.getAnimations == "function" && t.getAnimations().length > 0 || (d.current = !1, i(7), n || a(!1), (w = r == null ? void 0 : r.end) == null || w.call(r, n));
      } });
    }
  }, [e, n, t, y]), e ? [l, { closed: o(1), enter: o(2), leave: o(4), transition: o(2) || o(4) }] : [n, { closed: void 0, enter: void 0, leave: void 0, transition: void 0 }];
}
function br(e, { prepare: t, run: n, done: r, inFlight: l }) {
  let a = re();
  return $r(e, { prepare: t, inFlight: l }), a.nextFrame(() => {
    n(), a.requestAnimationFrame(() => {
      a.add(Er(e, r));
    });
  }), a.dispose;
}
function Er(e, t) {
  var n, r;
  let l = re();
  if (!e) return l.dispose;
  let a = !1;
  l.add(() => {
    a = !0;
  });
  let o = (r = (n = e.getAnimations) == null ? void 0 : n.call(e).filter((u) => u instanceof CSSTransition)) != null ? r : [];
  return o.length === 0 ? (t(), l.dispose) : (Promise.allSettled(o.map((u) => u.finished)).then(() => {
    a || t();
  }), l.dispose);
}
function $r(e, { inFlight: t, prepare: n }) {
  if (t != null && t.current) {
    n();
    return;
  }
  let r = e.style.transition;
  e.style.transition = "none", n(), e.offsetHeight, e.style.transition = r;
}
function vt(e, t) {
  let n = O([]), r = S(e);
  M(() => {
    let l = [...n.current];
    for (let [a, o] of t.entries()) if (n.current[a] !== o) {
      let u = r(t, l);
      return n.current = t, u;
    }
  }, [r, ...t]);
}
let qe = U(null);
qe.displayName = "OpenClosedContext";
var z = ((e) => (e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(z || {});
function Ye() {
  return R(qe);
}
function Tr({ value: e, children: t }) {
  return E.createElement(qe.Provider, { value: e }, t);
}
function Or({ children: e }) {
  return E.createElement(qe.Provider, { value: null }, e);
}
function Pr(e) {
  function t() {
    document.readyState !== "loading" && (e(), document.removeEventListener("DOMContentLoaded", t));
  }
  typeof window < "u" && typeof document < "u" && (document.addEventListener("DOMContentLoaded", t), t());
}
let ee = [];
Pr(() => {
  function e(t) {
    if (!(t.target instanceof HTMLElement) || t.target === document.body || ee[0] === t.target) return;
    let n = t.target;
    n = n.closest(Ue), ee.unshift(n ?? t.target), ee = ee.filter((r) => r != null && r.isConnected), ee.splice(10);
  }
  window.addEventListener("click", e, { capture: !0 }), window.addEventListener("mousedown", e, { capture: !0 }), window.addEventListener("focus", e, { capture: !0 }), document.body.addEventListener("click", e, { capture: !0 }), document.body.addEventListener("mousedown", e, { capture: !0 }), document.body.addEventListener("focus", e, { capture: !0 });
});
function Yt(e) {
  let t = S(e), n = O(!1);
  M(() => (n.current = !1, () => {
    n.current = !0, Ve(() => {
      n.current && t();
    });
  }), [t]);
}
function Mr() {
  let e = typeof document > "u";
  return "useSyncExternalStore" in Ee ? ((t) => t.useSyncExternalStore)(Ee)(() => () => {
  }, () => !1, () => !e) : !1;
}
function Se() {
  let e = Mr(), [t, n] = Ee.useState(oe.isHandoffComplete);
  return t && oe.isHandoffComplete === !1 && n(!1), Ee.useEffect(() => {
    t !== !0 && n(!0);
  }, [t]), Ee.useEffect(() => oe.handoff(), []), e ? !1 : t;
}
let zt = U(!1);
function Sr() {
  return R(zt);
}
function Pt(e) {
  return E.createElement(zt.Provider, { value: e.force }, e.children);
}
function Lr(e) {
  let t = Sr(), n = R(Kt), r = Me(e), [l, a] = L(() => {
    var o;
    if (!t && n !== null) return (o = n.current) != null ? o : null;
    if (oe.isServer) return null;
    let u = r == null ? void 0 : r.getElementById("headlessui-portal-root");
    if (u) return u;
    if (r === null) return null;
    let i = r.createElement("div");
    return i.setAttribute("id", "headlessui-portal-root"), r.body.appendChild(i);
  });
  return M(() => {
    l !== null && (r != null && r.body.contains(l) || r == null || r.body.appendChild(l));
  }, [l, r]), M(() => {
    t || n !== null && a(n.current);
  }, [n, a, t]), l;
}
let Gt = G, Fr = D(function(e, t) {
  let n = e, r = O(null), l = Z(Wn((y) => {
    r.current = y;
  }), t), a = Me(r), o = Lr(r), [u] = L(() => {
    var y;
    return oe.isServer ? null : (y = a == null ? void 0 : a.createElement("div")) != null ? y : null;
  }), i = R(ut), d = Se();
  A(() => {
    !o || !u || o.contains(u) || (u.setAttribute("data-headlessui-portal", ""), o.appendChild(u));
  }, [o, u]), A(() => {
    if (u && i) return i.register(u);
  }, [i, u]), Yt(() => {
    var y;
    !o || !u || (u instanceof Node && o.contains(u) && o.removeChild(u), o.childNodes.length <= 0 && ((y = o.parentElement) == null || y.removeChild(o)));
  });
  let f = W();
  return d ? !o || !u ? null : En(f({ ourProps: { ref: l }, theirProps: n, slot: {}, defaultTag: Gt, name: "Portal" }), u) : null;
});
function Cr(e, t) {
  let n = Z(t), { enabled: r = !0, ...l } = e, a = W();
  return r ? E.createElement(Fr, { ...l, ref: n }) : a({ ourProps: { ref: n }, theirProps: l, slot: {}, defaultTag: Gt, name: "Portal" });
}
let kr = G, Kt = U(null);
function Nr(e, t) {
  let { target: n, ...r } = e, l = { ref: Z(t) }, a = W();
  return E.createElement(Kt.Provider, { value: n }, a({ ourProps: l, theirProps: r, defaultTag: kr, name: "Popover.Group" }));
}
let ut = U(null);
function Ar() {
  let e = R(ut), t = O([]), n = S((a) => (t.current.push(a), e && e.register(a), () => r(a))), r = S((a) => {
    let o = t.current.indexOf(a);
    o !== -1 && t.current.splice(o, 1), e && e.unregister(a);
  }), l = C(() => ({ register: n, unregister: r, portals: t }), [n, r, t]);
  return [t, C(() => function({ children: a }) {
    return E.createElement(ut.Provider, { value: l }, a);
  }, [l])];
}
let Ir = D(Cr), Zt = D(Nr), Rr = Object.assign(Ir, { Group: Zt });
function Dr(e, t = typeof document < "u" ? document.defaultView : null, n) {
  let r = fe(e, "escape");
  qt(t, "keydown", (l) => {
    r && (l.defaultPrevented || l.key === Ut.Escape && n(l));
  });
}
function jr() {
  var e;
  let [t] = L(() => typeof window < "u" && typeof window.matchMedia == "function" ? window.matchMedia("(pointer: coarse)") : null), [n, r] = L((e = t == null ? void 0 : t.matches) != null ? e : !1);
  return A(() => {
    if (!t) return;
    function l(a) {
      r(a.matches);
    }
    return t.addEventListener("change", l), () => t.removeEventListener("change", l);
  }, [t]), n;
}
function Hr({ defaultContainers: e = [], portals: t, mainTreeNode: n } = {}) {
  let r = Me(n), l = S(() => {
    var a, o;
    let u = [];
    for (let i of e) i !== null && (i instanceof HTMLElement ? u.push(i) : "current" in i && i.current instanceof HTMLElement && u.push(i.current));
    if (t != null && t.current) for (let i of t.current) u.push(i);
    for (let i of (a = r == null ? void 0 : r.querySelectorAll("html > *, body > *")) != null ? a : []) i !== document.body && i !== document.head && i instanceof HTMLElement && i.id !== "headlessui-portal-root" && (n && (i.contains(n) || i.contains((o = n == null ? void 0 : n.getRootNode()) == null ? void 0 : o.host)) || u.some((d) => i.contains(d)) || u.push(i));
    return u;
  });
  return { resolveContainers: l, contains: S((a) => l().some((o) => o.contains(a))) };
}
let Jt = U(null);
function Mt({ children: e, node: t }) {
  let [n, r] = L(null), l = Qt(t ?? n);
  return E.createElement(Jt.Provider, { value: l }, e, l === null && E.createElement(it, { features: He.Hidden, ref: (a) => {
    var o, u;
    if (a) {
      for (let i of (u = (o = Xe(a)) == null ? void 0 : o.querySelectorAll("html > *, body > *")) != null ? u : []) if (i !== document.body && i !== document.head && i instanceof HTMLElement && i != null && i.contains(a)) {
        r(i);
        break;
      }
    }
  } }));
}
function Qt(e = null) {
  var t;
  return (t = R(Jt)) != null ? t : e;
}
function gt() {
  let e = O(!1);
  return A(() => (e.current = !0, () => {
    e.current = !1;
  }), []), e;
}
var be = ((e) => (e[e.Forwards = 0] = "Forwards", e[e.Backwards = 1] = "Backwards", e))(be || {});
function Ur() {
  let e = O(0);
  return Vt(!0, "keydown", (t) => {
    t.key === "Tab" && (e.current = t.shiftKey ? 1 : 0);
  }, !0), e;
}
function en(e) {
  if (!e) return /* @__PURE__ */ new Set();
  if (typeof e == "function") return new Set(e());
  let t = /* @__PURE__ */ new Set();
  for (let n of e.current) n.current instanceof HTMLElement && t.add(n.current);
  return t;
}
let Wr = "div";
var ie = ((e) => (e[e.None = 0] = "None", e[e.InitialFocus = 1] = "InitialFocus", e[e.TabLock = 2] = "TabLock", e[e.FocusLock = 4] = "FocusLock", e[e.RestoreFocus = 8] = "RestoreFocus", e[e.AutoFocus = 16] = "AutoFocus", e))(ie || {});
function _r(e, t) {
  let n = O(null), r = Z(n, t), { initialFocus: l, initialFocusFallback: a, containers: o, features: u = 15, ...i } = e;
  Se() || (u = 0);
  let d = Me(n);
  qr(u, { ownerDocument: d });
  let f = Yr(u, { ownerDocument: d, container: n, initialFocus: l, initialFocusFallback: a });
  zr(u, { ownerDocument: d, container: n, containers: o, previousActiveElement: f });
  let y = Ur(), b = S((p) => {
    let g = n.current;
    g && ((x) => x())(() => {
      ne(y.current, { [be.Forwards]: () => {
        Oe(g, J.First, { skipElements: [p.relatedTarget, a] });
      }, [be.Backwards]: () => {
        Oe(g, J.Last, { skipElements: [p.relatedTarget, a] });
      } });
    });
  }), w = fe(!!(u & 2), "focus-trap#tab-lock"), c = pt(), v = O(!1), s = { ref: r, onKeyDown(p) {
    p.key == "Tab" && (v.current = !0, c.requestAnimationFrame(() => {
      v.current = !1;
    }));
  }, onBlur(p) {
    if (!(u & 4)) return;
    let g = en(o);
    n.current instanceof HTMLElement && g.add(n.current);
    let x = p.relatedTarget;
    x instanceof HTMLElement && x.dataset.headlessuiFocusGuard !== "true" && (tn(g, x) || (v.current ? Oe(n.current, ne(y.current, { [be.Forwards]: () => J.Next, [be.Backwards]: () => J.Previous }) | J.WrapAround, { relativeTo: p.target }) : p.target instanceof HTMLElement && Q(p.target)));
  } }, m = W();
  return E.createElement(E.Fragment, null, w && E.createElement(it, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: b, features: He.Focusable }), m({ ourProps: s, theirProps: i, defaultTag: Wr, name: "FocusTrap" }), w && E.createElement(it, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: b, features: He.Focusable }));
}
let Br = D(_r), Xr = Object.assign(Br, { features: ie });
function Vr(e = !0) {
  let t = O(ee.slice());
  return vt(([n], [r]) => {
    r === !0 && n === !1 && Ve(() => {
      t.current.splice(0);
    }), r === !1 && n === !0 && (t.current = ee.slice());
  }, [e, ee, t]), S(() => {
    var n;
    return (n = t.current.find((r) => r != null && r.isConnected)) != null ? n : null;
  });
}
function qr(e, { ownerDocument: t }) {
  let n = !!(e & 8), r = Vr(n);
  vt(() => {
    n || (t == null ? void 0 : t.activeElement) === (t == null ? void 0 : t.body) && Q(r());
  }, [n]), Yt(() => {
    n && Q(r());
  });
}
function Yr(e, { ownerDocument: t, container: n, initialFocus: r, initialFocusFallback: l }) {
  let a = O(null), o = fe(!!(e & 1), "focus-trap#initial-focus"), u = gt();
  return vt(() => {
    if (e === 0) return;
    if (!o) {
      l != null && l.current && Q(l.current);
      return;
    }
    let i = n.current;
    i && Ve(() => {
      if (!u.current) return;
      let d = t == null ? void 0 : t.activeElement;
      if (r != null && r.current) {
        if ((r == null ? void 0 : r.current) === d) {
          a.current = d;
          return;
        }
      } else if (i.contains(d)) {
        a.current = d;
        return;
      }
      if (r != null && r.current) Q(r.current);
      else {
        if (e & 16) {
          if (Oe(i, J.First | J.AutoFocus) !== ot.Error) return;
        } else if (Oe(i, J.First) !== ot.Error) return;
        if (l != null && l.current && (Q(l.current), (t == null ? void 0 : t.activeElement) === l.current)) return;
        console.warn("There are no focusable elements inside the <FocusTrap />");
      }
      a.current = t == null ? void 0 : t.activeElement;
    });
  }, [l, o, e]), a;
}
function zr(e, { ownerDocument: t, container: n, containers: r, previousActiveElement: l }) {
  let a = gt(), o = !!(e & 4);
  qt(t == null ? void 0 : t.defaultView, "focus", (u) => {
    if (!o || !a.current) return;
    let i = en(r);
    n.current instanceof HTMLElement && i.add(n.current);
    let d = l.current;
    if (!d) return;
    let f = u.target;
    f && f instanceof HTMLElement ? tn(i, f) ? (l.current = f, Q(f)) : (u.preventDefault(), u.stopPropagation(), Q(d)) : Q(l.current);
  }, !0);
}
function tn(e, t) {
  for (let n of e) if (n.contains(t)) return !0;
  return !1;
}
function nn(e) {
  var t;
  return !!(e.enter || e.enterFrom || e.enterTo || e.leave || e.leaveFrom || e.leaveTo) || ((t = e.as) != null ? t : ln) !== G || E.Children.count(e.children) === 1;
}
let ze = U(null);
ze.displayName = "TransitionContext";
var Gr = ((e) => (e.Visible = "visible", e.Hidden = "hidden", e))(Gr || {});
function Kr() {
  let e = R(ze);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
function Zr() {
  let e = R(Ge);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
let Ge = U(null);
Ge.displayName = "NestingContext";
function Ke(e) {
  return "children" in e ? Ke(e.children) : e.current.filter(({ el: t }) => t.current !== null).filter(({ state: t }) => t === "visible").length > 0;
}
function rn(e, t) {
  let n = se(e), r = O([]), l = gt(), a = pt(), o = S((w, c = te.Hidden) => {
    let v = r.current.findIndex(({ el: s }) => s === w);
    v !== -1 && (ne(c, { [te.Unmount]() {
      r.current.splice(v, 1);
    }, [te.Hidden]() {
      r.current[v].state = "hidden";
    } }), a.microTask(() => {
      var s;
      !Ke(r) && l.current && ((s = n.current) == null || s.call(n));
    }));
  }), u = S((w) => {
    let c = r.current.find(({ el: v }) => v === w);
    return c ? c.state !== "visible" && (c.state = "visible") : r.current.push({ el: w, state: "visible" }), () => o(w, te.Unmount);
  }), i = O([]), d = O(Promise.resolve()), f = O({ enter: [], leave: [] }), y = S((w, c, v) => {
    i.current.splice(0), t && (t.chains.current[c] = t.chains.current[c].filter(([s]) => s !== w)), t == null || t.chains.current[c].push([w, new Promise((s) => {
      i.current.push(s);
    })]), t == null || t.chains.current[c].push([w, new Promise((s) => {
      Promise.all(f.current[c].map(([m, p]) => p)).then(() => s());
    })]), c === "enter" ? d.current = d.current.then(() => t == null ? void 0 : t.wait.current).then(() => v(c)) : v(c);
  }), b = S((w, c, v) => {
    Promise.all(f.current[c].splice(0).map(([s, m]) => m)).then(() => {
      var s;
      (s = i.current.shift()) == null || s();
    }).then(() => v(c));
  });
  return C(() => ({ children: r, register: u, unregister: o, onStart: y, onStop: b, wait: d, chains: f }), [u, o, r, y, b, f, d]);
}
let ln = G, an = je.RenderStrategy;
function Jr(e, t) {
  var n, r;
  let { transition: l = !0, beforeEnter: a, afterEnter: o, beforeLeave: u, afterLeave: i, enter: d, enterFrom: f, enterTo: y, entered: b, leave: w, leaveFrom: c, leaveTo: v, ...s } = e, [m, p] = L(null), g = O(null), x = nn(e), h = Z(...x ? [g, t, p] : t === null ? [] : [t]), $ = (n = s.unmount) == null || n ? te.Unmount : te.Hidden, { show: F, appear: j, initial: _ } = Kr(), [N, H] = L(F ? "visible" : "hidden"), B = Zr(), { register: X, unregister: P } = B;
  A(() => X(g), [X, g]), A(() => {
    if ($ === te.Hidden && g.current) {
      if (F && N !== "visible") {
        H("visible");
        return;
      }
      return ne(N, { hidden: () => P(g), visible: () => X(g) });
    }
  }, [N, g, X, P, F, $]);
  let V = Se();
  A(() => {
    if (x && V && N === "visible" && g.current === null) throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
  }, [g, N, V, x]);
  let Le = _ && !j, Fe = j && F && _, pe = O(!1), K = rn(() => {
    pe.current || (H("hidden"), P(g));
  }, B), Ce = S((Je) => {
    pe.current = !0;
    let Ne = Je ? "enter" : "leave";
    K.onStart(g, Ne, (ve) => {
      ve === "enter" ? a == null || a() : ve === "leave" && (u == null || u());
    });
  }), k = S((Je) => {
    let Ne = Je ? "enter" : "leave";
    pe.current = !1, K.onStop(g, Ne, (ve) => {
      ve === "enter" ? o == null || o() : ve === "leave" && (i == null || i());
    }), Ne === "leave" && !Ke(K) && (H("hidden"), P(g));
  });
  M(() => {
    x && l || (Ce(F), k(F));
  }, [F, x, l]);
  let ke = !(!l || !x || !V || Le), [, I] = xr(ke, m, F, { start: Ce, end: k }), dn = le({ ref: h, className: ((r = lt(s.className, Fe && d, Fe && f, I.enter && d, I.enter && I.closed && f, I.enter && !I.closed && y, I.leave && w, I.leave && !I.closed && c, I.leave && I.closed && v, !I.transition && F && b)) == null ? void 0 : r.trim()) || void 0, ...yr(I) }), he = 0;
  N === "visible" && (he |= z.Open), N === "hidden" && (he |= z.Closed), I.enter && (he |= z.Opening), I.leave && (he |= z.Closing);
  let cn = W();
  return E.createElement(Ge.Provider, { value: K }, E.createElement(Tr, { value: he }, cn({ ourProps: dn, theirProps: s, defaultTag: ln, features: an, visible: N === "visible", name: "Transition.Child" })));
}
function Qr(e, t) {
  let { show: n, appear: r = !1, unmount: l = !0, ...a } = e, o = O(null), u = nn(e), i = Z(...u ? [o, t] : t === null ? [] : [t]);
  Se();
  let d = Ye();
  if (n === void 0 && d !== null && (n = (d & z.Open) === z.Open), n === void 0) throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
  let [f, y] = L(n ? "visible" : "hidden"), b = rn(() => {
    n || y("hidden");
  }), [w, c] = L(!0), v = O([n]);
  A(() => {
    w !== !1 && v.current[v.current.length - 1] !== n && (v.current.push(n), c(!1));
  }, [v, n]);
  let s = C(() => ({ show: n, appear: r, initial: w }), [n, r, w]);
  A(() => {
    n ? y("visible") : !Ke(b) && o.current !== null && y("hidden");
  }, [n, b]);
  let m = { unmount: l }, p = S(() => {
    var h;
    w && c(!1), (h = e.beforeEnter) == null || h.call(e);
  }), g = S(() => {
    var h;
    w && c(!1), (h = e.beforeLeave) == null || h.call(e);
  }), x = W();
  return E.createElement(Ge.Provider, { value: b }, E.createElement(ze.Provider, { value: s }, x({ ourProps: { ...m, as: G, children: E.createElement(on, { ref: i, ...m, ...a, beforeEnter: p, beforeLeave: g }) }, theirProps: {}, defaultTag: G, features: an, visible: f === "visible", name: "Transition" })));
}
function el(e, t) {
  let n = R(ze) !== null, r = Ye() !== null;
  return E.createElement(E.Fragment, null, !n && r ? E.createElement(st, { ref: t, ...e }) : E.createElement(on, { ref: t, ...e }));
}
let st = D(Qr), on = D(Jr), me = D(el), un = Object.assign(st, { Child: me, Root: st });
var tl = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(tl || {}), nl = ((e) => (e[e.SetTitleId = 0] = "SetTitleId", e))(nl || {});
let rl = { 0(e, t) {
  return e.titleId === t.id ? e : { ...e, titleId: t.id };
} }, wt = U(null);
wt.displayName = "DialogContext";
function Ze(e) {
  let t = R(wt);
  if (t === null) {
    let n = new Error(`<${e} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(n, Ze), n;
  }
  return t;
}
function ll(e, t) {
  return ne(t.type, rl, e, t);
}
let St = D(function(e, t) {
  let n = Pe(), { id: r = `headlessui-dialog-${n}`, open: l, onClose: a, initialFocus: o, role: u = "dialog", autoFocus: i = !0, __demoMode: d = !1, unmount: f = !1, ...y } = e, b = O(!1);
  u = function() {
    return u === "dialog" || u === "alertdialog" ? u : (b.current || (b.current = !0, console.warn(`Invalid role [${u}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog");
  }();
  let w = Ye();
  l === void 0 && w !== null && (l = (w & z.Open) === z.Open);
  let c = O(null), v = Z(c, t), s = Me(c), m = l ? 0 : 1, [p, g] = wn(ll, { titleId: null, descriptionId: null, panelRef: yn() }), x = S(() => a(!1)), h = S((k) => g({ type: 0, id: k })), $ = Se() ? m === 0 : !1, [F, j] = Ar(), _ = { get current() {
    var k;
    return (k = p.panelRef.current) != null ? k : c.current;
  } }, N = Qt(), { resolveContainers: H } = Hr({ mainTreeNode: N, portals: F, defaultContainers: [_] }), B = w !== null ? (w & z.Closing) === z.Closing : !1;
  Zn(d || B ? !1 : $, { allowed: S(() => {
    var k, ke;
    return [(ke = (k = c.current) == null ? void 0 : k.closest("[data-headlessui-portal]")) != null ? ke : null];
  }), disallowed: S(() => {
    var k;
    return [(k = N == null ? void 0 : N.closest("body > *:not(#headlessui-portal-root)")) != null ? k : null];
  }) }), dr($, H, (k) => {
    k.preventDefault(), x();
  }), Dr($, s == null ? void 0 : s.defaultView, (k) => {
    k.preventDefault(), k.stopPropagation(), document.activeElement && "blur" in document.activeElement && typeof document.activeElement.blur == "function" && document.activeElement.blur(), x();
  }), vr(d || B ? !1 : $, s, H), Jn($, c, x);
  let [X, P] = _n(), V = C(() => [{ dialogState: m, close: x, setTitleId: h, unmount: f }, p], [m, p, x, h, f]), Le = C(() => ({ open: m === 0 }), [m]), Fe = { ref: v, id: r, role: u, tabIndex: -1, "aria-modal": d ? void 0 : m === 0 ? !0 : void 0, "aria-labelledby": p.titleId, "aria-describedby": X, unmount: f }, pe = !jr(), K = ie.None;
  $ && !d && (K |= ie.RestoreFocus, K |= ie.TabLock, i && (K |= ie.AutoFocus), pe && (K |= ie.InitialFocus));
  let Ce = W();
  return E.createElement(Or, null, E.createElement(Pt, { force: !0 }, E.createElement(Rr, null, E.createElement(wt.Provider, { value: V }, E.createElement(Zt, { target: c }, E.createElement(Pt, { force: !1 }, E.createElement(P, { slot: Le }, E.createElement(j, null, E.createElement(Xr, { initialFocus: o, initialFocusFallback: c, containers: H, features: K }, E.createElement(zn, { value: x }, Ce({ ourProps: Fe, theirProps: y, slot: Le, defaultTag: il, features: al, visible: m === 0, name: "Dialog" })))))))))));
}), il = "div", al = je.RenderStrategy | je.Static;
function ol(e, t) {
  let { transition: n = !1, open: r, ...l } = e, a = Ye(), o = e.hasOwnProperty("open") || a !== null, u = e.hasOwnProperty("onClose");
  if (!o && !u) throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");
  if (!o) throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");
  if (!u) throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");
  if (!a && typeof e.open != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${e.open}`);
  if (typeof e.onClose != "function") throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${e.onClose}`);
  return (r !== void 0 || n) && !l.static ? E.createElement(Mt, null, E.createElement(un, { show: r, transition: n, unmount: l.unmount }, E.createElement(St, { ref: t, ...l }))) : E.createElement(Mt, null, E.createElement(St, { ref: t, open: r, ...l }));
}
let ul = "div";
function sl(e, t) {
  let n = Pe(), { id: r = `headlessui-dialog-panel-${n}`, transition: l = !1, ...a } = e, [{ dialogState: o, unmount: u }, i] = Ze("Dialog.Panel"), d = Z(t, i.panelRef), f = C(() => ({ open: o === 0 }), [o]), y = S((s) => {
    s.stopPropagation();
  }), b = { ref: d, id: r, onClick: y }, w = l ? me : G, c = l ? { unmount: u } : {}, v = W();
  return E.createElement(w, { ...c }, v({ ourProps: b, theirProps: a, slot: f, defaultTag: ul, name: "Dialog.Panel" }));
}
let dl = "div";
function cl(e, t) {
  let { transition: n = !1, ...r } = e, [{ dialogState: l, unmount: a }] = Ze("Dialog.Backdrop"), o = C(() => ({ open: l === 0 }), [l]), u = { ref: t, "aria-hidden": !0 }, i = n ? me : G, d = n ? { unmount: a } : {}, f = W();
  return E.createElement(i, { ...d }, f({ ourProps: u, theirProps: r, slot: o, defaultTag: dl, name: "Dialog.Backdrop" }));
}
let fl = "h2";
function ml(e, t) {
  let n = Pe(), { id: r = `headlessui-dialog-title-${n}`, ...l } = e, [{ dialogState: a, setTitleId: o }] = Ze("Dialog.Title"), u = Z(t);
  M(() => (o(r), () => o(null)), [r, o]);
  let i = C(() => ({ open: a === 0 }), [a]), d = { ref: u, id: r };
  return W()({ ourProps: d, theirProps: l, slot: i, defaultTag: fl, name: "Dialog.Title" });
}
let pl = D(ol), yt = D(sl);
D(cl);
let hl = D(ml), vl = Object.assign(pl, { Panel: yt, Title: hl, Description: qn });
function sn({ onClick: e }) {
  return /* @__PURE__ */ ue(
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
const gl = ({ modalContext: e, config: t, children: n }) => {
  const [r, l] = L(!1);
  return /* @__PURE__ */ T("div", { className: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4", children: /* @__PURE__ */ T(
    "div",
    {
      className: De("im-modal-positioner flex min-h-full justify-center", {
        "items-start": t.position === "top",
        "items-center": t.position === "center",
        "items-end": t.position === "bottom"
      }),
      children: /* @__PURE__ */ T(
        me,
        {
          as: "div",
          enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          enterTo: "opacity-100 translate-y-0 sm:scale-100",
          leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
          leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          afterEnter: () => l(!0),
          afterLeave: e.afterLeave,
          className: De("im-modal-wrapper w-full transition duration-300 ease-in-out", e.onTopOfStack ? "" : "blur-sm", {
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
          children: /* @__PURE__ */ ue(
            yt,
            {
              className: `im-modal-content relative ${t.paddingClasses} ${t.panelClasses}`,
              "data-inertiaui-modal-entered": r,
              children: [
                t.closeButton && /* @__PURE__ */ T("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ T(sn, { onClick: e.close }) }),
                typeof n == "function" ? n({ modalContext: e, config: t }) : n
              ]
            }
          )
        }
      )
    }
  ) });
}, wl = ({ modalContext: e, config: t, children: n }) => {
  const [r, l] = L(!1);
  return /* @__PURE__ */ T("div", { className: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ T(
    "div",
    {
      className: De("im-slideover-positioner flex min-h-full items-center", {
        "justify-start rtl:justify-end": (t == null ? void 0 : t.position) === "left",
        "justify-end rtl:justify-start": (t == null ? void 0 : t.position) === "right"
      }),
      children: /* @__PURE__ */ T(
        me,
        {
          as: "div",
          enterFrom: `opacity-0 ${t.position === "left" ? "-translate-x-full" : "translate-x-full"}`,
          enterTo: "opacity-100 translate-x-0",
          leaveFrom: "opacity-100 translate-x-0",
          leaveTo: `opacity-0 ${t.position === "left" ? "-translate-x-full" : "translate-x-full"}`,
          afterEnter: () => l(!0),
          afterLeave: e.afterLeave,
          className: De("im-slideover-wrapper w-full transition duration-300 ease-in-out", e.onTopOfStack ? "" : "blur-sm", {
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
          children: /* @__PURE__ */ ue(
            yt,
            {
              className: `im-slideover-content relative ${t.paddingClasses} ${t.panelClasses}`,
              "data-inertiaui-modal-entered": r,
              children: [
                t.closeButton && /* @__PURE__ */ T("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ T(sn, { onClick: e.close }) }),
                typeof n == "function" ? n({ modalContext: e, config: t }) : n
              ]
            }
          )
        }
      )
    }
  ) });
}, yl = dt(({ name: e, children: t, onFocus: n = null, onBlur: r = null, onClose: l = null, onSuccess: a = null, onAfterLeave: o = null, ...u }, i) => {
  const d = (y) => typeof t == "function" ? t(y) : t, f = O(null);
  return Lt(i, () => f.current, [f]), /* @__PURE__ */ T(
    It,
    {
      ref: f,
      name: e,
      onFocus: n,
      onBlur: r,
      onClose: l,
      onSuccess: a,
      ...u,
      children: ({
        afterLeave: y,
        close: b,
        config: w,
        emit: c,
        getChildModal: v,
        getParentModal: s,
        id: m,
        index: p,
        isOpen: g,
        modalContext: x,
        onTopOfStack: h,
        reload: $,
        setOpen: F,
        shouldRender: j
      }) => /* @__PURE__ */ T(
        un,
        {
          appear: !0,
          show: g ?? !1,
          afterLeave: o,
          children: /* @__PURE__ */ ue(
            vl,
            {
              as: "div",
              className: "im-dialog relative z-20",
              onClose: () => w.closeExplicitly ? null : b(),
              "data-inertiaui-modal-id": m,
              "data-inertiaui-modal-index": p,
              children: [
                p === 0 ? /* @__PURE__ */ T(
                  me,
                  {
                    enter: "transition transform ease-in-out duration-300",
                    enterFrom: "opacity-0",
                    enterTo: "opacity-100",
                    leave: "transition transform ease-in-out duration-300",
                    leaveFrom: "opacity-100",
                    leaveTo: "opacity-0",
                    children: h ? /* @__PURE__ */ T(
                      "div",
                      {
                        className: "im-backdrop fixed inset-0 z-30 bg-black/75",
                        "aria-hidden": "true"
                      }
                    ) : /* @__PURE__ */ T("div", {})
                  }
                ) : null,
                p > 0 && h ? /* @__PURE__ */ T("div", { className: "im-backdrop fixed inset-0 z-30 bg-black/75" }) : null,
                w.slideover ? /* @__PURE__ */ T(
                  wl,
                  {
                    modalContext: x,
                    config: w,
                    children: d({
                      afterLeave: y,
                      close: b,
                      config: w,
                      emit: c,
                      getChildModal: v,
                      getParentModal: s,
                      id: m,
                      index: p,
                      isOpen: g,
                      modalContext: x,
                      onTopOfStack: h,
                      reload: $,
                      setOpen: F,
                      shouldRender: j
                    })
                  }
                ) : /* @__PURE__ */ T(
                  gl,
                  {
                    modalContext: x,
                    config: w,
                    children: d({
                      afterLeave: y,
                      close: b,
                      config: w,
                      emit: c,
                      getChildModal: v,
                      getParentModal: s,
                      id: m,
                      index: p,
                      isOpen: g,
                      modalContext: x,
                      onTopOfStack: h,
                      reload: $,
                      setOpen: F,
                      shouldRender: j
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
yl.displayName = "Modal";
const kl = ({
  href: e,
  method: t = "get",
  data: n = {},
  as: r = "a",
  headers: l = {},
  queryStringArrayFormat: a = "brackets",
  onAfterLeave: o = null,
  onBlur: u = null,
  onClose: i = null,
  onError: d = null,
  onFocus: f = null,
  onStart: y = null,
  onSuccess: b = null,
  navigate: w = null,
  children: c,
  ...v
}) => {
  const [s, m] = L(!1), [p, g] = L(null), { stack: x, visit: h } = Be(), $ = C(() => w ?? ft("navigate"), [w]), F = {}, j = {};
  Object.keys(v).forEach((P) => {
    xt.includes(P) || (P.startsWith("on") && typeof v[P] == "function" ? P.toLowerCase() in window ? F[P] = v[P] : j[P] = v[P] : F[P] = v[P]);
  });
  const [_, N] = L(!1);
  M(() => {
    p && (p.onTopOfStack && _ ? f == null || f() : !p.onTopOfStack && !_ && (u == null || u()), N(!p.onTopOfStack));
  }, [x]);
  const H = Y(() => {
    i == null || i();
  }, [i]), B = Y(() => {
    g(null), o == null || o();
  }, [o]), X = Y(
    (P) => {
      P == null || P.preventDefault(), !s && (e.startsWith("#") || (m(!0), y == null || y()), h(
        e,
        t,
        n,
        l,
        On(Ft(v, xt)),
        () => H(x.length),
        B,
        a,
        $
      ).then((V) => {
        g(V), V.registerEventListenersFromProps(j), b == null || b();
      }).catch((V) => {
        console.error(V), d == null || d(V);
      }).finally(() => m(!1)));
    },
    [e, t, n, l, a, v, H, B]
  );
  return /* @__PURE__ */ T(
    r,
    {
      ...F,
      href: e,
      onClick: X,
      children: typeof c == "function" ? c({ loading: s }) : c
    }
  );
};
function Nl() {
  return Be().stack[Nt()] ?? null;
}
const Al = (e) => (t) => (t.default.layout = (n) => Ie(e, {}, n), t);
export {
  It as HeadlessModal,
  yl as Modal,
  kl as ModalLink,
  Ln as ModalRoot,
  Mn as ModalStackProvider,
  ft as getConfig,
  Sn as initFromPageProps,
  Sl as putConfig,
  Ll as renderApp,
  Ml as resetConfig,
  Al as setPageLayout,
  Nl as useModal,
  Nt as useModalIndex,
  Be as useModalStack
};
