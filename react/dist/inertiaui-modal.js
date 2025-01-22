var fn = Object.defineProperty;
var mn = (e, t, n) => t in e ? fn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var q = (e, t, n) => mn(e, typeof t != "symbol" ? t + "" : t, n);
import * as Ee from "react";
import E, { createContext as H, useState as S, useEffect as M, useContext as R, useRef as O, createElement as Re, useMemo as C, forwardRef as dt, useImperativeHandle as St, useLayoutEffect as pn, useCallback as Y, Fragment as G, isValidElement as hn, cloneElement as vn, useId as Pe, useSyncExternalStore as gn, useReducer as wn, createRef as yn } from "react";
import { jsx as T, jsxs as se, Fragment as ct } from "react/jsx-runtime";
import De from "axios";
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
const _e = new $n(), Ll = () => _e.reset(), Sl = (e, t) => _e.put(e, t), ft = (e) => _e.get(e), de = (e, t) => _e.get(e ? `slideover.${t}` : `modal.${t}`);
function Tn(e, t) {
  return e = typeof e == "string" ? new URL(e, window.location.origin) : e, t = typeof t == "string" ? new URL(t, window.location.origin) : t, `${e.origin}${e.pathname}` == `${t.origin}${t.pathname}`;
}
function et(e = "inertiaui_modal_") {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `${e}${crypto.randomUUID()}` : `${e}${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
}
function On(e, t) {
  return Array.isArray(e) ? e.filter((n) => !t.includes(n)) : Object.keys(e).reduce((n, r) => (t.includes(r) || (n[r] = e[r]), n), {});
}
function Ft(e, t) {
  return Array.isArray(e) ? e.filter((n) => t.includes(n)) : t.reduce((n, r) => (r in e && (n[r] = e[r]), n), {});
}
function Pn(e) {
  return Array.isArray(e) ? e.filter((t) => t !== null) : Object.keys(e).reduce((t, n) => (n in e && e[n] !== null && (t[n] = e[n]), t), {});
}
function Mn(e, t = 3, n = 10) {
  return new Promise((r, l) => {
    const a = e();
    if (a) {
      r(a);
      return;
    }
    let o = t * 1e3 / n;
    const s = setInterval(() => {
      const i = e();
      i && (clearInterval(s), r(i)), --o <= 0 && (clearInterval(s), l(new Error("Condition not met in time")));
    }, n);
  });
}
function we(e) {
  return e ? (e = e.replace(/_/g, "-"), e = e.replace(/-+/g, "-"), /[A-Z]/.test(e) ? (e = e.replace(/\s+/g, "").replace(/_/g, "").replace(/(?:^|\s|-)+([A-Za-z])/g, (t, n) => n.toUpperCase()), e = e.replace(/(.)(?=[A-Z])/g, "$1-"), e.toLowerCase()) : e) : "";
}
const Be = H(null);
Be.displayName = "ModalStackContext";
let Ct = null, kt = null, $e = null, rt = null, Ie = [], ce = {};
const Ln = ({ children: e }) => {
  const [t, n] = S([]), [r, l] = S({}), a = (v) => {
    n((u) => {
      const m = v([...u]), p = (g) => {
        var x;
        return m.length < 2 ? !0 : ((x = m.map((h) => ({ id: h.id, shouldRender: h.shouldRender })).reverse().find((h) => h.shouldRender)) == null ? void 0 : x.id) === g;
      };
      return m.forEach((g, x) => {
        m[x].onTopOfStack = p(g.id), m[x].getParentModal = () => x < 1 ? null : m.slice(0, x).reverse().find((h) => h.isOpen), m[x].getChildModal = () => x === m.length - 1 ? null : m.slice(x + 1).find((h) => h.isOpen);
      }), m;
    });
  };
  M(() => {
    Ie = t;
  }, [t]);
  class o {
    constructor(u, m, p, g, x) {
      q(this, "show", () => {
        a(
          (u) => u.map((m) => (m.id === this.id && !m.isOpen && (m.isOpen = !0, m.shouldRender = !0), m))
        );
      });
      q(this, "setOpen", (u) => {
        u ? this.show() : this.close();
      });
      q(this, "close", () => {
        a(
          (u) => u.map((m) => {
            var p;
            return m.id === this.id && m.isOpen && (Object.keys(m.listeners).forEach((g) => {
              m.off(g);
            }), m.isOpen = !1, (p = m.onCloseCallback) == null || p.call(m)), m;
          })
        );
      });
      q(this, "afterLeave", () => {
        this.isOpen || a((u) => {
          const m = u.map((p) => {
            var g;
            return p.id === this.id && !p.isOpen && (p.shouldRender = !1, (g = p.afterLeaveCallback) == null || g.call(p), p.afterLeaveCallback = null), p;
          });
          return this.index === 0 ? [] : m;
        });
      });
      q(this, "on", (u, m) => {
        u = we(u), this.listeners[u] = this.listeners[u] ?? [], this.listeners[u].push(m);
      });
      q(this, "off", (u, m) => {
        var p;
        u = we(u), m ? this.listeners[u] = ((p = this.listeners[u]) == null ? void 0 : p.filter((g) => g !== m)) ?? [] : delete this.listeners[u];
      });
      q(this, "emit", (u, ...m) => {
        var p;
        (p = this.listeners[we(u)]) == null || p.forEach((g) => g(...m));
      });
      q(this, "registerEventListenersFromProps", (u) => {
        const m = [];
        return Object.keys(u).filter((p) => p.startsWith("on")).forEach((p) => {
          const g = we(p).replace(/^on-/, "");
          this.on(g, u[p]), m.push(() => this.off(g, u[p]));
        }), () => m.forEach((p) => p());
      });
      q(this, "reload", (u = {}) => {
        var p;
        let m = Object.keys(this.response.props);
        u.only && (m = Ft(m, u.only)), u.except && (m = On(m, u.except)), (p = this.response) != null && p.url && De.get(this.response.url, {
          headers: {
            Accept: "text/html, application/xhtml+xml",
            "X-Inertia": !0,
            "X-Inertia-Partial-Component": this.response.component,
            "X-Inertia-Version": this.response.version,
            "X-Inertia-Partial-Data": m.join(","),
            "X-InertiaUI-Modal": et(),
            "X-InertiaUI-Modal-Use-Router": 0,
            "X-InertiaUI-Modal-Base-Url": $e
          }
        }).then((g) => {
          this.updateProps(g.data.props);
        });
      });
      q(this, "updateProps", (u) => {
        Object.assign(this.props, u), a((m) => m);
      });
      if (this.id = m.id ?? et(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = u, this.props = m.props, this.response = m, this.config = p ?? {}, this.onCloseCallback = g, this.afterLeaveCallback = x, ce[this.id]) {
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
  const s = (v, u = {}, m = null, p = null) => kt(v.component).then((g) => i(g, v, u, m, p)), i = (v, u, m, p, g) => {
    const x = new o(v, u, m, p, g);
    return x.index = t.length, a((h) => [...h, x]), x.show(), x;
  };
  function d(v, u, m, p) {
    if (!r[v])
      throw new Error(`The local modal "${v}" has not been registered.`);
    const g = i(null, {}, u, m, p);
    return g.name = v, r[v].callback(g), g;
  }
  const f = (v, u = {}) => y(
    v,
    u.method ?? "get",
    u.data ?? {},
    u.headers ?? {},
    u.config ?? {},
    u.onClose,
    u.onAfterLeave,
    u.queryStringArrayFormat ?? "brackets",
    u.navigate ?? ft("navigate")
  ).then((m) => {
    const p = u.listeners ?? {};
    return Object.keys(p).forEach((g) => {
      const x = we(g);
      m.on(x, p[g]);
    }), m;
  }), y = (v, u, m = {}, p = {}, g = {}, x = null, h = null, $ = "brackets", F = !1) => {
    const j = et();
    return new Promise((_, N) => {
      if (v.startsWith("#")) {
        _(d(v.substring(1), g, x, h));
        return;
      }
      const [U, B] = bn(u, v || "", m, $);
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
        return rt = null, ce[j] = {
          config: g,
          onClose: x,
          onAfterLeave: h
        }, xe.visit(U, {
          method: u,
          data: B,
          headers: p,
          preserveScroll: !0,
          preserveState: !0,
          onError: N,
          onFinish: () => {
            Mn(() => rt).then(_);
          }
        });
      De({
        url: U,
        method: u,
        data: B,
        headers: p
      }).then((P) => _(s(P.data, g, x, h))).catch((P) => {
        N(P);
      });
    });
  }, c = {
    stack: t,
    localModals: r,
    push: i,
    pushFromResponseData: s,
    length: () => Ie.length,
    closeAll: () => {
      Ie.reverse().forEach((v) => v.close());
    },
    reset: () => a(() => []),
    visit: y,
    visitModal: f,
    registerLocalModal: (v, u) => {
      l((m) => ({
        ...m,
        [v]: { name: v, callback: u }
      }));
    },
    removeLocalModal: (v) => {
      l((u) => {
        const m = { ...u };
        return delete m[v], m;
      });
    }
  };
  return /* @__PURE__ */ T(Be.Provider, { value: c, children: e });
}, Xe = () => {
  const e = R(Be);
  if (e === null)
    throw new Error("useModalStack must be used within a ModalStackProvider");
  return e;
}, xt = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], Sn = (e) => {
  e.initialPage && (Ct = e.initialPage.version), e.resolveComponent && (kt = e.resolveComponent);
}, Fl = (e, t) => (Sn(t), /* @__PURE__ */ T(Ln, { children: /* @__PURE__ */ T(e, { ...t, children: ({ Component: r, props: l, key: a }) => /* @__PURE__ */ se(ct, { children: [
  (() => {
    const s = Re(r, { key: a, ...l });
    return typeof r.layout == "function" ? r.layout(s) : Array.isArray(r.layout) ? r.layout.concat(s).reverse().reduce((d, f) => Re(f, l, d)) : s;
  })(),
  /* @__PURE__ */ T(Fn, {})
] }) }) })), Fn = ({ children: e }) => {
  var s;
  const t = R(Be);
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
        rt = f;
      });
    }),
    []
  );
  const l = (i) => (Ie.length && (i.headers["X-InertiaUI-Modal-Base-Url"] = $e), i);
  M(() => (De.interceptors.request.use(l), () => De.interceptors.request.eject(l)), []);
  const a = xn(), o = O();
  return M(() => {
    var f, y;
    const i = (f = a.props) == null ? void 0 : f._inertiaui_modal, d = o.current;
    o.current = i, i && d && i.component === d.component && Tn(i.url, d.url) && ((y = t.stack[0]) == null || y.updateProps(i.props ?? {}));
  }, [(s = a.props) == null ? void 0 : s._inertiaui_modal]), /* @__PURE__ */ se(ct, { children: [
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
  const { stack: t } = Xe(), n = C(() => t[e], [t, e]);
  return (n == null ? void 0 : n.component) && /* @__PURE__ */ T(mt.Provider, { value: e, children: /* @__PURE__ */ T(
    n.component,
    {
      ...n.props,
      onModalEvent: (...r) => n.emit(...r)
    }
  ) });
}, It = dt(({ name: e, children: t, onFocus: n = null, onBlur: r = null, onClose: l = null, onSuccess: a = null, ...o }, s) => {
  const i = Nt(), { stack: d, registerLocalModal: f, removeLocalModal: y } = Xe(), [b, w] = S(null), c = C(() => e ? b : d[i], [e, b, i, d]), v = C(() => {
    var h;
    return (h = d.find(($) => $.shouldRender && $.index > (c == null ? void 0 : c.index))) == null ? void 0 : h.index;
  }, [i, d]), u = C(() => (c == null ? void 0 : c.config.slideover) ?? o.slideover ?? ft("type") === "slideover", [o.slideover]), m = C(
    () => ({
      slideover: u,
      closeButton: o.closeButton ?? de(u, "closeButton"),
      closeExplicitly: o.closeExplicitly ?? de(u, "closeExplicitly"),
      maxWidth: o.maxWidth ?? de(u, "maxWidth"),
      paddingClasses: o.paddingClasses ?? de(u, "paddingClasses"),
      panelClasses: o.panelClasses ?? de(u, "panelClasses"),
      position: o.position ?? de(u, "position"),
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
  const [g, x] = S(!1);
  return M(() => {
    g && c !== null && c.isOpen && (c.onTopOfStack ? n == null || n() : r == null || r()), x(!0);
  }, [c == null ? void 0 : c.onTopOfStack]), St(
    s,
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
  ), (c == null ? void 0 : c.shouldRender) && /* @__PURE__ */ se(ct, { children: [
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
function je() {
  for (var e, t, n = 0, r = "", l = arguments.length; n < l; n++) (e = arguments[n]) && (t = Rt(e)) && (r && (r += " "), r += t);
  return r;
}
var Cn = Object.defineProperty, kn = (e, t, n) => t in e ? Cn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, tt = (e, t, n) => (kn(e, typeof t != "symbol" ? t + "" : t, n), n);
let Nn = class {
  constructor() {
    tt(this, "current", this.detect()), tt(this, "handoffState", "pending"), tt(this, "currentId", 0);
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
}, oe = new Nn();
function Ve(e) {
  return oe.isServer ? null : e instanceof Node ? e.ownerDocument : e != null && e.hasOwnProperty("current") && e.current instanceof Node ? e.current.ownerDocument : document;
}
function qe(e) {
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
    return qe(() => {
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
  let [e] = S(re);
  return M(() => () => e.dispose(), [e]), e;
}
let A = (e, t) => {
  oe.isServer ? M(e, t) : pn(e, t);
};
function ue(e) {
  let t = O(e);
  return A(() => {
    t.current = e;
  }, [e]), t;
}
let L = function(e) {
  let t = ue(e);
  return E.useCallback((...n) => t.current(...n), [t]);
}, An = H(void 0);
function In() {
  return R(An);
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
var Ue = ((e) => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(Ue || {}), te = ((e) => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(te || {});
function W() {
  let e = Dn();
  return Y((t) => Rn({ mergeRefs: e, ...t }), [e]);
}
function Rn({ ourProps: e, theirProps: t, slot: n, defaultTag: r, features: l, visible: a = !0, name: o, mergeRefs: s }) {
  s = s ?? jn;
  let i = Dt(t, e);
  if (a) return Ae(i, n, r, o, s);
  let d = l ?? 0;
  if (d & 2) {
    let { static: f = !1, ...y } = i;
    if (f) return Ae(y, n, r, o, s);
  }
  if (d & 1) {
    let { unmount: f = !0, ...y } = i;
    return ne(f ? 0 : 1, { 0() {
      return null;
    }, 1() {
      return Ae({ ...y, hidden: !0, style: { display: "none" } }, n, r, o, s);
    } });
  }
  return Ae(i, n, r, o, s);
}
function Ae(e, t = {}, n, r, l) {
  let { as: a = n, children: o, refName: s = "ref", ...i } = nt(e, ["unmount", "static"]), d = e.ref !== void 0 ? { [s]: e.ref } : {}, f = typeof o == "function" ? o(t) : o;
  "className" in i && i.className && typeof i.className == "function" && (i.className = i.className(t)), i["aria-labelledby"] && i["aria-labelledby"] === i.id && (i["aria-labelledby"] = void 0);
  let y = {};
  if (t) {
    let b = !1, w = [];
    for (let [c, v] of Object.entries(t)) typeof v == "boolean" && (b = !0), v === !0 && w.push(c.replace(/([A-Z])/g, (u) => `-${u.toLowerCase()}`));
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
    let b = f.props, w = b == null ? void 0 : b.className, c = typeof w == "function" ? (...m) => lt(w(...m), i.className) : lt(w, i.className), v = c ? { className: c } : {}, u = Dt(f.props, le(nt(i, ["ref"])));
    for (let m in y) m in u && delete y[m];
    return vn(f, Object.assign({}, u, y, d, { ref: l(Un(f), d.ref) }, v));
  }
  return Re(a, Object.assign({}, nt(i, ["ref"]), a !== G && d, a !== G && y), f);
}
function Dn() {
  let e = O([]), t = Y((n) => {
    for (let r of e.current) r != null && (typeof r == "function" ? r(n) : r.current = n);
  }, []);
  return (...n) => {
    if (!n.every((r) => r == null)) return e.current = n, t;
  };
}
function jn(...e) {
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
    for (let s of o) {
      if ((l instanceof Event || (l == null ? void 0 : l.nativeEvent) instanceof Event) && l.defaultPrevented) return;
      s(l, ...a);
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
function nt(e, t = []) {
  let n = Object.assign({}, e);
  for (let r of t) r in n && delete n[r];
  return n;
}
function Un(e) {
  return E.version.split(".")[0] >= "19" ? e.props.ref : e.ref;
}
let Hn = "span";
var He = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(He || {});
function Wn(e, t) {
  var n;
  let { features: r = 1, ...l } = e, a = { ref: t, "aria-hidden": (r & 2) === 2 ? !0 : (n = l["aria-hidden"]) != null ? n : void 0, hidden: (r & 4) === 4 ? !0 : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(r & 4) === 4 && (r & 2) !== 2 && { display: "none" } } };
  return W()({ ourProps: a, theirProps: l, slot: {}, defaultTag: Hn, name: "Hidden" });
}
let it = D(Wn), jt = Symbol();
function _n(e, t = !0) {
  return Object.assign(e, { [jt]: t });
}
function Z(...e) {
  let t = O(e);
  M(() => {
    t.current = e;
  }, [e]);
  let n = L((r) => {
    for (let l of t.current) l != null && (typeof l == "function" ? l(r) : l.current = r);
  });
  return e.every((r) => r == null || (r == null ? void 0 : r[jt])) ? void 0 : n;
}
let ht = H(null);
ht.displayName = "DescriptionContext";
function Ut() {
  let e = R(ht);
  if (e === null) {
    let t = new Error("You used a <Description /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(t, Ut), t;
  }
  return e;
}
function Bn() {
  let [e, t] = S([]);
  return [e.length > 0 ? e.join(" ") : void 0, C(() => function(n) {
    let r = L((a) => (t((o) => [...o, a]), () => t((o) => {
      let s = o.slice(), i = s.indexOf(a);
      return i !== -1 && s.splice(i, 1), s;
    }))), l = C(() => ({ register: r, slot: n.slot, name: n.name, props: n.props, value: n.value }), [r, n.slot, n.name, n.props, n.value]);
    return E.createElement(ht.Provider, { value: l }, n.children);
  }, [t])];
}
let Xn = "p";
function Vn(e, t) {
  let n = Pe(), r = In(), { id: l = `headlessui-description-${n}`, ...a } = e, o = Ut(), s = Z(t);
  A(() => o.register(l), [l, o.register]);
  let i = r || !1, d = C(() => ({ ...o.slot, disabled: i }), [o.slot, i]), f = { ref: s, ...o.props, id: l };
  return W()({ ourProps: f, theirProps: a, slot: d, defaultTag: Xn, name: o.name || "Description" });
}
let qn = D(Vn), Yn = Object.assign(qn, {});
var Ht = ((e) => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(Ht || {});
let zn = H(() => {
});
function Gn({ value: e, children: t }) {
  return E.createElement(zn.Provider, { value: e }, t);
}
let Kn = class extends Map {
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
    o && (n = o, r.forEach((s) => s()));
  } };
}
function _t(e) {
  return gn(e.subscribe, e.getSnapshot, e.getSnapshot);
}
let Zn = new Kn(() => Wt(() => [], { ADD(e) {
  return this.includes(e) ? this : [...this, e];
}, REMOVE(e) {
  let t = this.indexOf(e);
  if (t === -1) return this;
  let n = this.slice();
  return n.splice(t, 1), n;
} }));
function fe(e, t) {
  let n = Zn.get(t), r = Pe(), l = _t(n);
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
function Jn(e, { allowed: t, disallowed: n } = {}) {
  let r = fe(e, "inert-others");
  A(() => {
    var l, a;
    if (!r) return;
    let o = re();
    for (let i of (l = n == null ? void 0 : n()) != null ? l : []) i && o.add(bt(i));
    let s = (a = t == null ? void 0 : t()) != null ? a : [];
    for (let i of s) {
      if (!i) continue;
      let d = Ve(i);
      if (!d) continue;
      let f = i.parentElement;
      for (; f && f !== d.body; ) {
        for (let y of f.children) s.some((b) => y.contains(b)) || o.add(bt(y));
        f = f.parentElement;
      }
    }
    return o.dispose;
  }, [r, t, n]);
}
function Qn(e, t, n) {
  let r = ue((l) => {
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
let We = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e) => `${e}:not([tabindex='-1'])`).join(","), er = ["[data-autofocus]"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var J = ((e) => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e[e.AutoFocus = 64] = "AutoFocus", e))(J || {}), ot = ((e) => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(ot || {}), tr = ((e) => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(tr || {});
function nr(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(We)).sort((t, n) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (n.tabIndex || Number.MAX_SAFE_INTEGER)));
}
function rr(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(er)).sort((t, n) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (n.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var Bt = ((e) => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(Bt || {});
function lr(e, t = 0) {
  var n;
  return e === ((n = Ve(e)) == null ? void 0 : n.body) ? !1 : ne(t, { 0() {
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
var ir = ((e) => (e[e.Keyboard = 0] = "Keyboard", e[e.Mouse = 1] = "Mouse", e))(ir || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (e) => {
  e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (e) => {
  e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
function Q(e) {
  e == null || e.focus({ preventScroll: !0 });
}
let ar = ["textarea", "input"].join(",");
function or(e) {
  var t, n;
  return (n = (t = e == null ? void 0 : e.matches) == null ? void 0 : t.call(e, ar)) != null ? n : !1;
}
function sr(e, t = (n) => n) {
  return e.slice().sort((n, r) => {
    let l = t(n), a = t(r);
    if (l === null || a === null) return 0;
    let o = l.compareDocumentPosition(a);
    return o & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : o & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function Oe(e, t, { sorted: n = !0, relativeTo: r = null, skipElements: l = [] } = {}) {
  let a = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : document : e.ownerDocument, o = Array.isArray(e) ? n ? sr(e) : e : t & 64 ? rr(e) : nr(e);
  l.length > 0 && o.length > 1 && (o = o.filter((w) => !l.some((c) => c != null && "current" in c ? (c == null ? void 0 : c.current) === w : c === w))), r = r ?? a.activeElement;
  let s = (() => {
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
    b = o[w], b == null || b.focus(d), f += s;
  } while (b !== a.activeElement);
  return t & 6 && or(b) && b.select(), 2;
}
function Xt() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function ur() {
  return /Android/gi.test(window.navigator.userAgent);
}
function dr() {
  return Xt() || ur();
}
function ye(e, t, n, r) {
  let l = ue(n);
  M(() => {
    if (!e) return;
    function a(o) {
      l.current(o);
    }
    return document.addEventListener(t, a, r), () => document.removeEventListener(t, a, r);
  }, [e, t, r]);
}
function Vt(e, t, n, r) {
  let l = ue(n);
  M(() => {
    if (!e) return;
    function a(o) {
      l.current(o);
    }
    return window.addEventListener(t, a, r), () => window.removeEventListener(t, a, r);
  }, [e, t, r]);
}
const $t = 30;
function cr(e, t, n) {
  let r = fe(e, "outside-click"), l = ue(n), a = Y(function(i, d) {
    if (i.defaultPrevented) return;
    let f = d(i);
    if (f === null || !f.getRootNode().contains(f) || !f.isConnected) return;
    let y = function b(w) {
      return typeof w == "function" ? b(w()) : Array.isArray(w) || w instanceof Set ? w : [w];
    }(t);
    for (let b of y) if (b !== null && (b.contains(f) || i.composed && i.composedPath().includes(b))) return;
    return !lr(f, Bt.Loose) && f.tabIndex !== -1 && i.preventDefault(), l.current(i, f);
  }, [l, t]), o = O(null);
  ye(r, "pointerdown", (i) => {
    var d, f;
    o.current = ((f = (d = i.composedPath) == null ? void 0 : d.call(i)) == null ? void 0 : f[0]) || i.target;
  }, !0), ye(r, "mousedown", (i) => {
    var d, f;
    o.current = ((f = (d = i.composedPath) == null ? void 0 : d.call(i)) == null ? void 0 : f[0]) || i.target;
  }, !0), ye(r, "click", (i) => {
    dr() || o.current && (a(i, () => o.current), o.current = null);
  }, !0);
  let s = O({ x: 0, y: 0 });
  ye(r, "touchstart", (i) => {
    s.current.x = i.touches[0].clientX, s.current.y = i.touches[0].clientY;
  }, !0), ye(r, "touchend", (i) => {
    let d = { x: i.changedTouches[0].clientX, y: i.changedTouches[0].clientY };
    if (!(Math.abs(d.x - s.current.x) >= $t || Math.abs(d.y - s.current.y) >= $t)) return a(i, () => i.target instanceof HTMLElement ? i.target : null);
  }, !0), Vt(r, "blur", (i) => a(i, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), !0);
}
function Me(...e) {
  return C(() => Ve(...e), [...e]);
}
function qt(e, t, n, r) {
  let l = ue(n);
  M(() => {
    e = e ?? window;
    function a(o) {
      l.current(o);
    }
    return e.addEventListener(t, a, r), () => e.removeEventListener(t, a, r);
  }, [e, t, r]);
}
function fr() {
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
function mr() {
  return Xt() ? { before({ doc: e, d: t, meta: n }) {
    function r(l) {
      return n.containers.flatMap((a) => a()).some((a) => a.contains(l));
    }
    t.microTask(() => {
      var l;
      if (window.getComputedStyle(e.documentElement).scrollBehavior !== "auto") {
        let s = re();
        s.style(e.documentElement, "scrollBehavior", "auto"), t.add(() => t.microTask(() => s.dispose()));
      }
      let a = (l = window.scrollY) != null ? l : window.pageYOffset, o = null;
      t.addEventListener(e, "click", (s) => {
        if (s.target instanceof HTMLElement) try {
          let i = s.target.closest("a");
          if (!i) return;
          let { hash: d } = new URL(i.href), f = e.querySelector(d);
          f && !r(f) && (o = f);
        } catch {
        }
      }, !0), t.addEventListener(e, "touchstart", (s) => {
        if (s.target instanceof HTMLElement) if (r(s.target)) {
          let i = s.target;
          for (; i.parentElement && r(i.parentElement); ) i = i.parentElement;
          t.style(i, "overscrollBehavior", "contain");
        } else t.style(s.target, "touchAction", "none");
      }), t.addEventListener(e, "touchmove", (s) => {
        if (s.target instanceof HTMLElement) {
          if (s.target.tagName === "INPUT") return;
          if (r(s.target)) {
            let i = s.target;
            for (; i.parentElement && i.dataset.headlessuiPortal !== "" && !(i.scrollHeight > i.clientHeight || i.scrollWidth > i.clientWidth); ) i = i.parentElement;
            i.dataset.headlessuiPortal === "" && s.preventDefault();
          } else s.preventDefault();
        }
      }, { passive: !1 }), t.add(() => {
        var s;
        let i = (s = window.scrollY) != null ? s : window.pageYOffset;
        a !== i && window.scrollTo(0, a), o && o.isConnected && (o.scrollIntoView({ block: "nearest" }), o = null);
      });
    });
  } } : {};
}
function pr() {
  return { before({ doc: e, d: t }) {
    t.style(e.documentElement, "overflow", "hidden");
  } };
}
function hr(e) {
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
  let r = { doc: e, d: t, meta: hr(n) }, l = [mr(), fr(), pr()];
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
function vr(e, t, n = () => ({ containers: [] })) {
  let r = _t(ae), l = t ? r.get(t) : void 0, a = l ? l.count > 0 : !1;
  return A(() => {
    if (!(!t || !e)) return ae.dispatch("PUSH", t, n), () => ae.dispatch("POP", t, n);
  }, [e, t]), a;
}
function gr(e, t, n = () => [document.body]) {
  let r = fe(e, "scroll-lock");
  vr(r, t, (l) => {
    var a;
    return { containers: [...(a = l.containers) != null ? a : [], n] };
  });
}
function wr(e = 0) {
  let [t, n] = S(e), r = Y((i) => n(i), [t]), l = Y((i) => n((d) => d | i), [t]), a = Y((i) => (t & i) === i, [t]), o = Y((i) => n((d) => d & ~i), [n]), s = Y((i) => n((d) => d ^ i), [n]);
  return { flags: t, setFlag: r, addFlag: l, hasFlag: a, removeFlag: o, toggleFlag: s };
}
var Tt, Ot;
typeof process < "u" && typeof globalThis < "u" && typeof Element < "u" && ((Tt = process == null ? void 0 : process.env) == null ? void 0 : Tt.NODE_ENV) === "test" && typeof ((Ot = Element == null ? void 0 : Element.prototype) == null ? void 0 : Ot.getAnimations) > "u" && (Element.prototype.getAnimations = function() {
  return console.warn(["Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.", "Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.", "", "Example usage:", "```js", "import { mockAnimationsApi } from 'jsdom-testing-mocks'", "mockAnimationsApi()", "```"].join(`
`)), [];
});
var yr = ((e) => (e[e.None = 0] = "None", e[e.Closed = 1] = "Closed", e[e.Enter = 2] = "Enter", e[e.Leave = 4] = "Leave", e))(yr || {});
function xr(e) {
  let t = {};
  for (let n in e) e[n] === !0 && (t[`data-${n}`] = "");
  return t;
}
function br(e, t, n, r) {
  let [l, a] = S(n), { hasFlag: o, addFlag: s, removeFlag: i } = wr(e && l ? 3 : 0), d = O(!1), f = O(!1), y = pt();
  return A(() => {
    var b;
    if (e) {
      if (n && a(!0), !t) {
        n && s(3);
        return;
      }
      return (b = r == null ? void 0 : r.start) == null || b.call(r, n), Er(t, { inFlight: d, prepare() {
        f.current ? f.current = !1 : f.current = d.current, d.current = !0, !f.current && (n ? (s(3), i(4)) : (s(4), i(2)));
      }, run() {
        f.current ? n ? (i(3), s(4)) : (i(4), s(3)) : n ? i(1) : s(1);
      }, done() {
        var w;
        f.current && typeof t.getAnimations == "function" && t.getAnimations().length > 0 || (d.current = !1, i(7), n || a(!1), (w = r == null ? void 0 : r.end) == null || w.call(r, n));
      } });
    }
  }, [e, n, t, y]), e ? [l, { closed: o(1), enter: o(2), leave: o(4), transition: o(2) || o(4) }] : [n, { closed: void 0, enter: void 0, leave: void 0, transition: void 0 }];
}
function Er(e, { prepare: t, run: n, done: r, inFlight: l }) {
  let a = re();
  return Tr(e, { prepare: t, inFlight: l }), a.nextFrame(() => {
    n(), a.requestAnimationFrame(() => {
      a.add($r(e, r));
    });
  }), a.dispose;
}
function $r(e, t) {
  var n, r;
  let l = re();
  if (!e) return l.dispose;
  let a = !1;
  l.add(() => {
    a = !0;
  });
  let o = (r = (n = e.getAnimations) == null ? void 0 : n.call(e).filter((s) => s instanceof CSSTransition)) != null ? r : [];
  return o.length === 0 ? (t(), l.dispose) : (Promise.allSettled(o.map((s) => s.finished)).then(() => {
    a || t();
  }), l.dispose);
}
function Tr(e, { inFlight: t, prepare: n }) {
  if (t != null && t.current) {
    n();
    return;
  }
  let r = e.style.transition;
  e.style.transition = "none", n(), e.offsetHeight, e.style.transition = r;
}
function vt(e, t) {
  let n = O([]), r = L(e);
  M(() => {
    let l = [...n.current];
    for (let [a, o] of t.entries()) if (n.current[a] !== o) {
      let s = r(t, l);
      return n.current = t, s;
    }
  }, [r, ...t]);
}
let Ye = H(null);
Ye.displayName = "OpenClosedContext";
var z = ((e) => (e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(z || {});
function ze() {
  return R(Ye);
}
function Or({ value: e, children: t }) {
  return E.createElement(Ye.Provider, { value: e }, t);
}
function Pr({ children: e }) {
  return E.createElement(Ye.Provider, { value: null }, e);
}
function Mr(e) {
  function t() {
    document.readyState !== "loading" && (e(), document.removeEventListener("DOMContentLoaded", t));
  }
  typeof window < "u" && typeof document < "u" && (document.addEventListener("DOMContentLoaded", t), t());
}
let ee = [];
Mr(() => {
  function e(t) {
    if (!(t.target instanceof HTMLElement) || t.target === document.body || ee[0] === t.target) return;
    let n = t.target;
    n = n.closest(We), ee.unshift(n ?? t.target), ee = ee.filter((r) => r != null && r.isConnected), ee.splice(10);
  }
  window.addEventListener("click", e, { capture: !0 }), window.addEventListener("mousedown", e, { capture: !0 }), window.addEventListener("focus", e, { capture: !0 }), document.body.addEventListener("click", e, { capture: !0 }), document.body.addEventListener("mousedown", e, { capture: !0 }), document.body.addEventListener("focus", e, { capture: !0 });
});
function Yt(e) {
  let t = L(e), n = O(!1);
  M(() => (n.current = !1, () => {
    n.current = !0, qe(() => {
      n.current && t();
    });
  }), [t]);
}
function Lr() {
  let e = typeof document > "u";
  return "useSyncExternalStore" in Ee ? ((t) => t.useSyncExternalStore)(Ee)(() => () => {
  }, () => !1, () => !e) : !1;
}
function Le() {
  let e = Lr(), [t, n] = Ee.useState(oe.isHandoffComplete);
  return t && oe.isHandoffComplete === !1 && n(!1), Ee.useEffect(() => {
    t !== !0 && n(!0);
  }, [t]), Ee.useEffect(() => oe.handoff(), []), e ? !1 : t;
}
let zt = H(!1);
function Sr() {
  return R(zt);
}
function Pt(e) {
  return E.createElement(zt.Provider, { value: e.force }, e.children);
}
function Fr(e) {
  let t = Sr(), n = R(Kt), r = Me(e), [l, a] = S(() => {
    var o;
    if (!t && n !== null) return (o = n.current) != null ? o : null;
    if (oe.isServer) return null;
    let s = r == null ? void 0 : r.getElementById("headlessui-portal-root");
    if (s) return s;
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
let Gt = G, Cr = D(function(e, t) {
  let n = e, r = O(null), l = Z(_n((y) => {
    r.current = y;
  }), t), a = Me(r), o = Fr(r), [s] = S(() => {
    var y;
    return oe.isServer ? null : (y = a == null ? void 0 : a.createElement("div")) != null ? y : null;
  }), i = R(st), d = Le();
  A(() => {
    !o || !s || o.contains(s) || (s.setAttribute("data-headlessui-portal", ""), o.appendChild(s));
  }, [o, s]), A(() => {
    if (s && i) return i.register(s);
  }, [i, s]), Yt(() => {
    var y;
    !o || !s || (s instanceof Node && o.contains(s) && o.removeChild(s), o.childNodes.length <= 0 && ((y = o.parentElement) == null || y.removeChild(o)));
  });
  let f = W();
  return d ? !o || !s ? null : En(f({ ourProps: { ref: l }, theirProps: n, slot: {}, defaultTag: Gt, name: "Portal" }), s) : null;
});
function kr(e, t) {
  let n = Z(t), { enabled: r = !0, ...l } = e, a = W();
  return r ? E.createElement(Cr, { ...l, ref: n }) : a({ ourProps: { ref: n }, theirProps: l, slot: {}, defaultTag: Gt, name: "Portal" });
}
let Nr = G, Kt = H(null);
function Ar(e, t) {
  let { target: n, ...r } = e, l = { ref: Z(t) }, a = W();
  return E.createElement(Kt.Provider, { value: n }, a({ ourProps: l, theirProps: r, defaultTag: Nr, name: "Popover.Group" }));
}
let st = H(null);
function Ir() {
  let e = R(st), t = O([]), n = L((a) => (t.current.push(a), e && e.register(a), () => r(a))), r = L((a) => {
    let o = t.current.indexOf(a);
    o !== -1 && t.current.splice(o, 1), e && e.unregister(a);
  }), l = C(() => ({ register: n, unregister: r, portals: t }), [n, r, t]);
  return [t, C(() => function({ children: a }) {
    return E.createElement(st.Provider, { value: l }, a);
  }, [l])];
}
let Rr = D(kr), Zt = D(Ar), Dr = Object.assign(Rr, { Group: Zt });
function jr(e, t = typeof document < "u" ? document.defaultView : null, n) {
  let r = fe(e, "escape");
  qt(t, "keydown", (l) => {
    r && (l.defaultPrevented || l.key === Ht.Escape && n(l));
  });
}
function Ur() {
  var e;
  let [t] = S(() => typeof window < "u" && typeof window.matchMedia == "function" ? window.matchMedia("(pointer: coarse)") : null), [n, r] = S((e = t == null ? void 0 : t.matches) != null ? e : !1);
  return A(() => {
    if (!t) return;
    function l(a) {
      r(a.matches);
    }
    return t.addEventListener("change", l), () => t.removeEventListener("change", l);
  }, [t]), n;
}
function Hr({ defaultContainers: e = [], portals: t, mainTreeNode: n } = {}) {
  let r = Me(n), l = L(() => {
    var a, o;
    let s = [];
    for (let i of e) i !== null && (i instanceof HTMLElement ? s.push(i) : "current" in i && i.current instanceof HTMLElement && s.push(i.current));
    if (t != null && t.current) for (let i of t.current) s.push(i);
    for (let i of (a = r == null ? void 0 : r.querySelectorAll("html > *, body > *")) != null ? a : []) i !== document.body && i !== document.head && i instanceof HTMLElement && i.id !== "headlessui-portal-root" && (n && (i.contains(n) || i.contains((o = n == null ? void 0 : n.getRootNode()) == null ? void 0 : o.host)) || s.some((d) => i.contains(d)) || s.push(i));
    return s;
  });
  return { resolveContainers: l, contains: L((a) => l().some((o) => o.contains(a))) };
}
let Jt = H(null);
function Mt({ children: e, node: t }) {
  let [n, r] = S(null), l = Qt(t ?? n);
  return E.createElement(Jt.Provider, { value: l }, e, l === null && E.createElement(it, { features: He.Hidden, ref: (a) => {
    var o, s;
    if (a) {
      for (let i of (s = (o = Ve(a)) == null ? void 0 : o.querySelectorAll("html > *, body > *")) != null ? s : []) if (i !== document.body && i !== document.head && i instanceof HTMLElement && i != null && i.contains(a)) {
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
function Wr() {
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
let _r = "div";
var ie = ((e) => (e[e.None = 0] = "None", e[e.InitialFocus = 1] = "InitialFocus", e[e.TabLock = 2] = "TabLock", e[e.FocusLock = 4] = "FocusLock", e[e.RestoreFocus = 8] = "RestoreFocus", e[e.AutoFocus = 16] = "AutoFocus", e))(ie || {});
function Br(e, t) {
  let n = O(null), r = Z(n, t), { initialFocus: l, initialFocusFallback: a, containers: o, features: s = 15, ...i } = e;
  Le() || (s = 0);
  let d = Me(n);
  Yr(s, { ownerDocument: d });
  let f = zr(s, { ownerDocument: d, container: n, initialFocus: l, initialFocusFallback: a });
  Gr(s, { ownerDocument: d, container: n, containers: o, previousActiveElement: f });
  let y = Wr(), b = L((p) => {
    let g = n.current;
    g && ((x) => x())(() => {
      ne(y.current, { [be.Forwards]: () => {
        Oe(g, J.First, { skipElements: [p.relatedTarget, a] });
      }, [be.Backwards]: () => {
        Oe(g, J.Last, { skipElements: [p.relatedTarget, a] });
      } });
    });
  }), w = fe(!!(s & 2), "focus-trap#tab-lock"), c = pt(), v = O(!1), u = { ref: r, onKeyDown(p) {
    p.key == "Tab" && (v.current = !0, c.requestAnimationFrame(() => {
      v.current = !1;
    }));
  }, onBlur(p) {
    if (!(s & 4)) return;
    let g = en(o);
    n.current instanceof HTMLElement && g.add(n.current);
    let x = p.relatedTarget;
    x instanceof HTMLElement && x.dataset.headlessuiFocusGuard !== "true" && (tn(g, x) || (v.current ? Oe(n.current, ne(y.current, { [be.Forwards]: () => J.Next, [be.Backwards]: () => J.Previous }) | J.WrapAround, { relativeTo: p.target }) : p.target instanceof HTMLElement && Q(p.target)));
  } }, m = W();
  return E.createElement(E.Fragment, null, w && E.createElement(it, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: b, features: He.Focusable }), m({ ourProps: u, theirProps: i, defaultTag: _r, name: "FocusTrap" }), w && E.createElement(it, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: b, features: He.Focusable }));
}
let Xr = D(Br), Vr = Object.assign(Xr, { features: ie });
function qr(e = !0) {
  let t = O(ee.slice());
  return vt(([n], [r]) => {
    r === !0 && n === !1 && qe(() => {
      t.current.splice(0);
    }), r === !1 && n === !0 && (t.current = ee.slice());
  }, [e, ee, t]), L(() => {
    var n;
    return (n = t.current.find((r) => r != null && r.isConnected)) != null ? n : null;
  });
}
function Yr(e, { ownerDocument: t }) {
  let n = !!(e & 8), r = qr(n);
  vt(() => {
    n || (t == null ? void 0 : t.activeElement) === (t == null ? void 0 : t.body) && Q(r());
  }, [n]), Yt(() => {
    n && Q(r());
  });
}
function zr(e, { ownerDocument: t, container: n, initialFocus: r, initialFocusFallback: l }) {
  let a = O(null), o = fe(!!(e & 1), "focus-trap#initial-focus"), s = gt();
  return vt(() => {
    if (e === 0) return;
    if (!o) {
      l != null && l.current && Q(l.current);
      return;
    }
    let i = n.current;
    i && qe(() => {
      if (!s.current) return;
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
function Gr(e, { ownerDocument: t, container: n, containers: r, previousActiveElement: l }) {
  let a = gt(), o = !!(e & 4);
  qt(t == null ? void 0 : t.defaultView, "focus", (s) => {
    if (!o || !a.current) return;
    let i = en(r);
    n.current instanceof HTMLElement && i.add(n.current);
    let d = l.current;
    if (!d) return;
    let f = s.target;
    f && f instanceof HTMLElement ? tn(i, f) ? (l.current = f, Q(f)) : (s.preventDefault(), s.stopPropagation(), Q(d)) : Q(l.current);
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
let Ge = H(null);
Ge.displayName = "TransitionContext";
var Kr = ((e) => (e.Visible = "visible", e.Hidden = "hidden", e))(Kr || {});
function Zr() {
  let e = R(Ge);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
function Jr() {
  let e = R(Ke);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
let Ke = H(null);
Ke.displayName = "NestingContext";
function Ze(e) {
  return "children" in e ? Ze(e.children) : e.current.filter(({ el: t }) => t.current !== null).filter(({ state: t }) => t === "visible").length > 0;
}
function rn(e, t) {
  let n = ue(e), r = O([]), l = gt(), a = pt(), o = L((w, c = te.Hidden) => {
    let v = r.current.findIndex(({ el: u }) => u === w);
    v !== -1 && (ne(c, { [te.Unmount]() {
      r.current.splice(v, 1);
    }, [te.Hidden]() {
      r.current[v].state = "hidden";
    } }), a.microTask(() => {
      var u;
      !Ze(r) && l.current && ((u = n.current) == null || u.call(n));
    }));
  }), s = L((w) => {
    let c = r.current.find(({ el: v }) => v === w);
    return c ? c.state !== "visible" && (c.state = "visible") : r.current.push({ el: w, state: "visible" }), () => o(w, te.Unmount);
  }), i = O([]), d = O(Promise.resolve()), f = O({ enter: [], leave: [] }), y = L((w, c, v) => {
    i.current.splice(0), t && (t.chains.current[c] = t.chains.current[c].filter(([u]) => u !== w)), t == null || t.chains.current[c].push([w, new Promise((u) => {
      i.current.push(u);
    })]), t == null || t.chains.current[c].push([w, new Promise((u) => {
      Promise.all(f.current[c].map(([m, p]) => p)).then(() => u());
    })]), c === "enter" ? d.current = d.current.then(() => t == null ? void 0 : t.wait.current).then(() => v(c)) : v(c);
  }), b = L((w, c, v) => {
    Promise.all(f.current[c].splice(0).map(([u, m]) => m)).then(() => {
      var u;
      (u = i.current.shift()) == null || u();
    }).then(() => v(c));
  });
  return C(() => ({ children: r, register: s, unregister: o, onStart: y, onStop: b, wait: d, chains: f }), [s, o, r, y, b, f, d]);
}
let ln = G, an = Ue.RenderStrategy;
function Qr(e, t) {
  var n, r;
  let { transition: l = !0, beforeEnter: a, afterEnter: o, beforeLeave: s, afterLeave: i, enter: d, enterFrom: f, enterTo: y, entered: b, leave: w, leaveFrom: c, leaveTo: v, ...u } = e, [m, p] = S(null), g = O(null), x = nn(e), h = Z(...x ? [g, t, p] : t === null ? [] : [t]), $ = (n = u.unmount) == null || n ? te.Unmount : te.Hidden, { show: F, appear: j, initial: _ } = Zr(), [N, U] = S(F ? "visible" : "hidden"), B = Jr(), { register: X, unregister: P } = B;
  A(() => X(g), [X, g]), A(() => {
    if ($ === te.Hidden && g.current) {
      if (F && N !== "visible") {
        U("visible");
        return;
      }
      return ne(N, { hidden: () => P(g), visible: () => X(g) });
    }
  }, [N, g, X, P, F, $]);
  let V = Le();
  A(() => {
    if (x && V && N === "visible" && g.current === null) throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
  }, [g, N, V, x]);
  let Se = _ && !j, Fe = j && F && _, pe = O(!1), K = rn(() => {
    pe.current || (U("hidden"), P(g));
  }, B), Ce = L((Qe) => {
    pe.current = !0;
    let Ne = Qe ? "enter" : "leave";
    K.onStart(g, Ne, (ve) => {
      ve === "enter" ? a == null || a() : ve === "leave" && (s == null || s());
    });
  }), k = L((Qe) => {
    let Ne = Qe ? "enter" : "leave";
    pe.current = !1, K.onStop(g, Ne, (ve) => {
      ve === "enter" ? o == null || o() : ve === "leave" && (i == null || i());
    }), Ne === "leave" && !Ze(K) && (U("hidden"), P(g));
  });
  M(() => {
    x && l || (Ce(F), k(F));
  }, [F, x, l]);
  let ke = !(!l || !x || !V || Se), [, I] = br(ke, m, F, { start: Ce, end: k }), dn = le({ ref: h, className: ((r = lt(u.className, Fe && d, Fe && f, I.enter && d, I.enter && I.closed && f, I.enter && !I.closed && y, I.leave && w, I.leave && !I.closed && c, I.leave && I.closed && v, !I.transition && F && b)) == null ? void 0 : r.trim()) || void 0, ...xr(I) }), he = 0;
  N === "visible" && (he |= z.Open), N === "hidden" && (he |= z.Closed), I.enter && (he |= z.Opening), I.leave && (he |= z.Closing);
  let cn = W();
  return E.createElement(Ke.Provider, { value: K }, E.createElement(Or, { value: he }, cn({ ourProps: dn, theirProps: u, defaultTag: ln, features: an, visible: N === "visible", name: "Transition.Child" })));
}
function el(e, t) {
  let { show: n, appear: r = !1, unmount: l = !0, ...a } = e, o = O(null), s = nn(e), i = Z(...s ? [o, t] : t === null ? [] : [t]);
  Le();
  let d = ze();
  if (n === void 0 && d !== null && (n = (d & z.Open) === z.Open), n === void 0) throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
  let [f, y] = S(n ? "visible" : "hidden"), b = rn(() => {
    n || y("hidden");
  }), [w, c] = S(!0), v = O([n]);
  A(() => {
    w !== !1 && v.current[v.current.length - 1] !== n && (v.current.push(n), c(!1));
  }, [v, n]);
  let u = C(() => ({ show: n, appear: r, initial: w }), [n, r, w]);
  A(() => {
    n ? y("visible") : !Ze(b) && o.current !== null && y("hidden");
  }, [n, b]);
  let m = { unmount: l }, p = L(() => {
    var h;
    w && c(!1), (h = e.beforeEnter) == null || h.call(e);
  }), g = L(() => {
    var h;
    w && c(!1), (h = e.beforeLeave) == null || h.call(e);
  }), x = W();
  return E.createElement(Ke.Provider, { value: b }, E.createElement(Ge.Provider, { value: u }, x({ ourProps: { ...m, as: G, children: E.createElement(on, { ref: i, ...m, ...a, beforeEnter: p, beforeLeave: g }) }, theirProps: {}, defaultTag: G, features: an, visible: f === "visible", name: "Transition" })));
}
function tl(e, t) {
  let n = R(Ge) !== null, r = ze() !== null;
  return E.createElement(E.Fragment, null, !n && r ? E.createElement(ut, { ref: t, ...e }) : E.createElement(on, { ref: t, ...e }));
}
let ut = D(el), on = D(Qr), me = D(tl), sn = Object.assign(ut, { Child: me, Root: ut });
var nl = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(nl || {}), rl = ((e) => (e[e.SetTitleId = 0] = "SetTitleId", e))(rl || {});
let ll = { 0(e, t) {
  return e.titleId === t.id ? e : { ...e, titleId: t.id };
} }, wt = H(null);
wt.displayName = "DialogContext";
function Je(e) {
  let t = R(wt);
  if (t === null) {
    let n = new Error(`<${e} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(n, Je), n;
  }
  return t;
}
function il(e, t) {
  return ne(t.type, ll, e, t);
}
let Lt = D(function(e, t) {
  let n = Pe(), { id: r = `headlessui-dialog-${n}`, open: l, onClose: a, initialFocus: o, role: s = "dialog", autoFocus: i = !0, __demoMode: d = !1, unmount: f = !1, ...y } = e, b = O(!1);
  s = function() {
    return s === "dialog" || s === "alertdialog" ? s : (b.current || (b.current = !0, console.warn(`Invalid role [${s}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog");
  }();
  let w = ze();
  l === void 0 && w !== null && (l = (w & z.Open) === z.Open);
  let c = O(null), v = Z(c, t), u = Me(c), m = l ? 0 : 1, [p, g] = wn(il, { titleId: null, descriptionId: null, panelRef: yn() }), x = L(() => a(!1)), h = L((k) => g({ type: 0, id: k })), $ = Le() ? m === 0 : !1, [F, j] = Ir(), _ = { get current() {
    var k;
    return (k = p.panelRef.current) != null ? k : c.current;
  } }, N = Qt(), { resolveContainers: U } = Hr({ mainTreeNode: N, portals: F, defaultContainers: [_] }), B = w !== null ? (w & z.Closing) === z.Closing : !1;
  Jn(d || B ? !1 : $, { allowed: L(() => {
    var k, ke;
    return [(ke = (k = c.current) == null ? void 0 : k.closest("[data-headlessui-portal]")) != null ? ke : null];
  }), disallowed: L(() => {
    var k;
    return [(k = N == null ? void 0 : N.closest("body > *:not(#headlessui-portal-root)")) != null ? k : null];
  }) }), cr($, U, (k) => {
    k.preventDefault(), x();
  }), jr($, u == null ? void 0 : u.defaultView, (k) => {
    k.preventDefault(), k.stopPropagation(), document.activeElement && "blur" in document.activeElement && typeof document.activeElement.blur == "function" && document.activeElement.blur(), x();
  }), gr(d || B ? !1 : $, u, U), Qn($, c, x);
  let [X, P] = Bn(), V = C(() => [{ dialogState: m, close: x, setTitleId: h, unmount: f }, p], [m, p, x, h, f]), Se = C(() => ({ open: m === 0 }), [m]), Fe = { ref: v, id: r, role: s, tabIndex: -1, "aria-modal": d ? void 0 : m === 0 ? !0 : void 0, "aria-labelledby": p.titleId, "aria-describedby": X, unmount: f }, pe = !Ur(), K = ie.None;
  $ && !d && (K |= ie.RestoreFocus, K |= ie.TabLock, i && (K |= ie.AutoFocus), pe && (K |= ie.InitialFocus));
  let Ce = W();
  return E.createElement(Pr, null, E.createElement(Pt, { force: !0 }, E.createElement(Dr, null, E.createElement(wt.Provider, { value: V }, E.createElement(Zt, { target: c }, E.createElement(Pt, { force: !1 }, E.createElement(P, { slot: Se }, E.createElement(j, null, E.createElement(Vr, { initialFocus: o, initialFocusFallback: c, containers: U, features: K }, E.createElement(Gn, { value: x }, Ce({ ourProps: Fe, theirProps: y, slot: Se, defaultTag: al, features: ol, visible: m === 0, name: "Dialog" })))))))))));
}), al = "div", ol = Ue.RenderStrategy | Ue.Static;
function sl(e, t) {
  let { transition: n = !1, open: r, ...l } = e, a = ze(), o = e.hasOwnProperty("open") || a !== null, s = e.hasOwnProperty("onClose");
  if (!o && !s) throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");
  if (!o) throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");
  if (!s) throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");
  if (!a && typeof e.open != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${e.open}`);
  if (typeof e.onClose != "function") throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${e.onClose}`);
  return (r !== void 0 || n) && !l.static ? E.createElement(Mt, null, E.createElement(sn, { show: r, transition: n, unmount: l.unmount }, E.createElement(Lt, { ref: t, ...l }))) : E.createElement(Mt, null, E.createElement(Lt, { ref: t, open: r, ...l }));
}
let ul = "div";
function dl(e, t) {
  let n = Pe(), { id: r = `headlessui-dialog-panel-${n}`, transition: l = !1, ...a } = e, [{ dialogState: o, unmount: s }, i] = Je("Dialog.Panel"), d = Z(t, i.panelRef), f = C(() => ({ open: o === 0 }), [o]), y = L((u) => {
    u.stopPropagation();
  }), b = { ref: d, id: r, onClick: y }, w = l ? me : G, c = l ? { unmount: s } : {}, v = W();
  return E.createElement(w, { ...c }, v({ ourProps: b, theirProps: a, slot: f, defaultTag: ul, name: "Dialog.Panel" }));
}
let cl = "div";
function fl(e, t) {
  let { transition: n = !1, ...r } = e, [{ dialogState: l, unmount: a }] = Je("Dialog.Backdrop"), o = C(() => ({ open: l === 0 }), [l]), s = { ref: t, "aria-hidden": !0 }, i = n ? me : G, d = n ? { unmount: a } : {}, f = W();
  return E.createElement(i, { ...d }, f({ ourProps: s, theirProps: r, slot: o, defaultTag: cl, name: "Dialog.Backdrop" }));
}
let ml = "h2";
function pl(e, t) {
  let n = Pe(), { id: r = `headlessui-dialog-title-${n}`, ...l } = e, [{ dialogState: a, setTitleId: o }] = Je("Dialog.Title"), s = Z(t);
  M(() => (o(r), () => o(null)), [r, o]);
  let i = C(() => ({ open: a === 0 }), [a]), d = { ref: s, id: r };
  return W()({ ourProps: d, theirProps: l, slot: i, defaultTag: ml, name: "Dialog.Title" });
}
let hl = D(sl), yt = D(dl);
D(fl);
let vl = D(pl), gl = Object.assign(hl, { Panel: yt, Title: vl, Description: Yn });
function un({ onClick: e }) {
  return /* @__PURE__ */ se(
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
const wl = ({ modalContext: e, config: t, children: n }) => {
  const [r, l] = S(!1);
  return /* @__PURE__ */ T("div", { className: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4", children: /* @__PURE__ */ T(
    "div",
    {
      className: je("im-modal-positioner flex min-h-full justify-center", {
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
            yt,
            {
              className: `im-modal-content relative ${t.paddingClasses} ${t.panelClasses}`,
              "data-inertiaui-modal-entered": r,
              children: [
                t.closeButton && /* @__PURE__ */ T("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ T(un, { onClick: e.close }) }),
                typeof n == "function" ? n({ modalContext: e, config: t }) : n
              ]
            }
          )
        }
      )
    }
  ) });
}, yl = ({ modalContext: e, config: t, children: n }) => {
  const [r, l] = S(!1);
  return /* @__PURE__ */ T("div", { className: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ T(
    "div",
    {
      className: je("im-slideover-positioner flex min-h-full items-center", {
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
            yt,
            {
              className: `im-slideover-content relative ${t.paddingClasses} ${t.panelClasses}`,
              "data-inertiaui-modal-entered": r,
              children: [
                t.closeButton && /* @__PURE__ */ T("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ T(un, { onClick: e.close }) }),
                typeof n == "function" ? n({ modalContext: e, config: t }) : n
              ]
            }
          )
        }
      )
    }
  ) });
}, xl = dt(({ name: e, children: t, onFocus: n = null, onBlur: r = null, onClose: l = null, onSuccess: a = null, onAfterLeave: o = null, ...s }, i) => {
  const d = (y) => typeof t == "function" ? t(y) : t, f = O(null);
  return St(i, () => f.current, [f]), /* @__PURE__ */ T(
    It,
    {
      ref: f,
      name: e,
      onFocus: n,
      onBlur: r,
      onClose: l,
      onSuccess: a,
      ...s,
      children: ({
        afterLeave: y,
        close: b,
        config: w,
        emit: c,
        getChildModal: v,
        getParentModal: u,
        id: m,
        index: p,
        isOpen: g,
        modalContext: x,
        onTopOfStack: h,
        reload: $,
        setOpen: F,
        shouldRender: j
      }) => /* @__PURE__ */ T(
        sn,
        {
          appear: !0,
          show: g ?? !1,
          afterLeave: o,
          children: /* @__PURE__ */ se(
            gl,
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
                  yl,
                  {
                    modalContext: x,
                    config: w,
                    children: d({
                      afterLeave: y,
                      close: b,
                      config: w,
                      emit: c,
                      getChildModal: v,
                      getParentModal: u,
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
                      getParentModal: u,
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
xl.displayName = "Modal";
const Nl = ({
  href: e,
  method: t = "get",
  data: n = {},
  as: r = "a",
  headers: l = {},
  queryStringArrayFormat: a = "brackets",
  onAfterLeave: o = null,
  onBlur: s = null,
  onClose: i = null,
  onError: d = null,
  onFocus: f = null,
  onStart: y = null,
  onSuccess: b = null,
  navigate: w = null,
  children: c,
  ...v
}) => {
  const [u, m] = S(!1), [p, g] = S(null), { stack: x, visit: h } = Xe(), $ = C(() => w ?? ft("navigate"), [w]), F = {}, j = {};
  Object.keys(v).forEach((P) => {
    xt.includes(P) || (P.startsWith("on") && typeof v[P] == "function" ? P.toLowerCase() in window ? F[P] = v[P] : j[P] = v[P] : F[P] = v[P]);
  });
  const [_, N] = S(!1);
  M(() => {
    p && (p.onTopOfStack && _ ? f == null || f() : !p.onTopOfStack && !_ && (s == null || s()), N(!p.onTopOfStack));
  }, [x]);
  const U = Y(() => {
    i == null || i();
  }, [i]), B = Y(() => {
    g(null), o == null || o();
  }, [o]), X = Y(
    (P) => {
      P == null || P.preventDefault(), !u && (e.startsWith("#") || (m(!0), y == null || y()), h(
        e,
        t,
        n,
        l,
        Pn(Ft(v, xt)),
        () => U(x.length),
        B,
        a,
        $
      ).then((V) => {
        g(V), V.registerEventListenersFromProps(j), b == null || b();
      }).catch((V) => {
        console.error(V), d == null || d(V);
      }).finally(() => m(!1)));
    },
    [e, t, n, l, a, v, U, B]
  );
  return /* @__PURE__ */ T(
    r,
    {
      ...F,
      href: e,
      onClick: X,
      children: typeof c == "function" ? c({ loading: u }) : c
    }
  );
};
function Al() {
  return Xe().stack[Nt()] ?? null;
}
const Il = (e) => (t) => (t.default.layout = (n) => Re(e, {}, n), t);
export {
  It as HeadlessModal,
  xl as Modal,
  Nl as ModalLink,
  Fn as ModalRoot,
  Ln as ModalStackProvider,
  ft as getConfig,
  Sn as initFromPageProps,
  Sl as putConfig,
  Fl as renderApp,
  Ll as resetConfig,
  Il as setPageLayout,
  Al as useModal,
  Nt as useModalIndex,
  Xe as useModalStack
};
