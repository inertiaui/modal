var pn = Object.defineProperty;
var hn = (e, t, n) => t in e ? pn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var q = (e, t, n) => hn(e, typeof t != "symbol" ? t + "" : t, n);
import * as Ee from "react";
import E, { createContext as H, useContext as R, useEffect as M, useRef as O, useState as S, createElement as Re, useMemo as C, forwardRef as ct, useImperativeHandle as Ft, useLayoutEffect as vn, useCallback as Y, Fragment as G, isValidElement as gn, cloneElement as wn, useId as Pe, useSyncExternalStore as xn, useReducer as yn, createRef as bn } from "react";
import { jsxs as se, Fragment as dt, jsx as T } from "react/jsx-runtime";
import De from "axios";
import { router as ye, usePage as En } from "@inertiajs/react";
import { mergeDataIntoQueryString as $n } from "@inertiajs/core";
import { createPortal as Tn } from "react-dom";
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
class On {
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
    for (let o = 0; o < r.length - 1; o++)
      l = l[r[o]] = l[r[o]] || {};
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
const _e = new On(), Sl = () => _e.reset(), Fl = (e, t) => _e.put(e, t), ft = (e) => _e.get(e), ce = (e, t) => _e.get(e ? `slideover.${t}` : `modal.${t}`);
function Pn(e, t) {
  return e = typeof e == "string" ? new URL(e, window.location.origin) : e, t = typeof t == "string" ? new URL(t, window.location.origin) : t, `${e.origin}${e.pathname}` == `${t.origin}${t.pathname}`;
}
function et(e = "inertiaui_modal_") {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `${e}${crypto.randomUUID()}` : `${e}${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
}
function Ct(e, t, n = !1) {
  const r = (l) => typeof l == "string" ? l.toLowerCase() : l;
  return n && (t = t.map(r)), Array.isArray(e) ? e.filter((l) => !t.includes(n ? r(l) : l)) : Object.keys(e).reduce((l, o) => (t.includes(n ? r(o) : o) || (l[o] = e[o]), l), {});
}
function Nt(e, t) {
  return Array.isArray(e) ? e.filter((n) => t.includes(n)) : t.reduce((n, r) => (r in e && (n[r] = e[r]), n), {});
}
function Mn(e) {
  return Array.isArray(e) ? e.filter((t) => t !== null) : Object.keys(e).reduce((t, n) => (n in e && e[n] !== null && (t[n] = e[n]), t), {});
}
function Ln(e, t = 3, n = 10) {
  return new Promise((r, l) => {
    const o = e();
    if (o) {
      r(o);
      return;
    }
    let a = t * 1e3 / n;
    const s = setInterval(() => {
      const i = e();
      i && (clearInterval(s), r(i)), --a <= 0 && (clearInterval(s), l(new Error("Condition not met in time")));
    }, n);
  });
}
function we(e) {
  return e ? (e = e.replace(/_/g, "-"), e = e.replace(/-+/g, "-"), /[A-Z]/.test(e) ? (e = e.replace(/\s+/g, "").replace(/_/g, "").replace(/(?:^|\s|-)+([A-Za-z])/g, (t, n) => n.toUpperCase()), e = e.replace(/(.)(?=[A-Z])/g, "$1-"), e.toLowerCase()) : e) : "";
}
function yt(e) {
  return Ct(
    e || {},
    [
      "name",
      "slideover",
      "closeButton",
      "close-button",
      "closeExplicitly",
      "close-explicitly",
      "maxWidth",
      "max-width",
      "paddingClasses",
      "padding-classes",
      "panelClasses",
      "panel-classes",
      "position"
    ],
    !0
  );
}
const Be = H(null);
Be.displayName = "ModalStackContext";
let At = null, kt = null, $e = null, rt = null, Ie = [], de = {};
const Sn = ({ children: e }) => {
  const [t, n] = S([]), [r, l] = S({}), o = (v) => {
    n((u) => {
      const m = v([...u]), p = (g) => {
        var y;
        return m.length < 2 ? !0 : ((y = m.map((h) => ({ id: h.id, shouldRender: h.shouldRender })).reverse().find((h) => h.shouldRender)) == null ? void 0 : y.id) === g;
      };
      return m.forEach((g, y) => {
        m[y].onTopOfStack = p(g.id), m[y].getParentModal = () => y < 1 ? null : m.slice(0, y).reverse().find((h) => h.isOpen), m[y].getChildModal = () => y === m.length - 1 ? null : m.slice(y + 1).find((h) => h.isOpen);
      }), m;
    });
  };
  M(() => {
    Ie = t;
  }, [t]);
  class a {
    constructor(u, m, p, g, y) {
      q(this, "show", () => {
        o(
          (u) => u.map((m) => (m.id === this.id && !m.isOpen && (m.isOpen = !0, m.shouldRender = !0), m))
        );
      });
      q(this, "setOpen", (u) => {
        u ? this.show() : this.close();
      });
      q(this, "close", () => {
        o(
          (u) => u.map((m) => {
            var p;
            return m.id === this.id && m.isOpen && (Object.keys(m.listeners).forEach((g) => {
              m.off(g);
            }), m.isOpen = !1, (p = m.onCloseCallback) == null || p.call(m)), m;
          })
        );
      });
      q(this, "afterLeave", () => {
        this.isOpen || o((u) => {
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
        u.only && (m = Nt(m, u.only)), u.except && (m = Ct(m, u.except)), (p = this.response) != null && p.url && De.get(this.response.url, {
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
        Object.assign(this.props, yt(u)), o((m) => m);
      });
      if (this.id = m.id ?? et(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = u, this.props = yt(m.props), this.response = m, this.config = p ?? {}, this.onCloseCallback = g, this.afterLeaveCallback = y, de[this.id]) {
        this.config = {
          ...this.config,
          ...de[this.id].config ?? {}
        };
        const h = de[this.id].onClose, $ = de[this.id].onAfterLeave;
        h && (this.onCloseCallback = g ? () => {
          g(), h();
        } : h), $ && (this.afterLeaveCallback = y ? () => {
          y(), $();
        } : $), delete de[this.id];
      }
      this.index = -1, this.getParentModal = () => null, this.getChildModal = () => null, this.onTopOfStack = !0;
    }
    static generateId() {
      return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `inertiaui_modal_${crypto.randomUUID()}` : `inertiaui_modal_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
    }
  }
  const s = (v, u = {}, m = null, p = null) => kt(v.component).then((g) => i(g, v, u, m, p)), i = (v, u, m, p, g) => {
    const y = new a(v, u, m, p, g);
    return y.index = t.length, o((h) => [...h, y]), y.show(), y;
  };
  function c(v, u, m, p) {
    if (!r[v])
      throw new Error(`The local modal "${v}" has not been registered.`);
    const g = i(null, {}, u, m, p);
    return g.name = v, r[v].callback(g), g;
  }
  const f = (v, u = {}) => x(
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
      const y = we(g);
      m.on(y, p[g]);
    }), m;
  }), x = (v, u, m = {}, p = {}, g = {}, y = null, h = null, $ = "brackets", F = !1) => {
    const j = et();
    return new Promise((_, A) => {
      if (v.startsWith("#")) {
        _(c(v.substring(1), g, y, h));
        return;
      }
      const [U, B] = $n(u, v || "", m, $);
      let X = F && t.length === 0;
      if (t.length === 0 && ($e = typeof window < "u" ? window.location.href : ""), p = {
        ...p,
        Accept: "text/html, application/xhtml+xml",
        "X-Requested-With": "XMLHttpRequest",
        "X-Inertia": !0,
        "X-Inertia-Version": At,
        "X-InertiaUI-Modal": j,
        "X-InertiaUI-Modal-Use-Router": X ? 1 : 0,
        "X-InertiaUI-Modal-Base-Url": $e
      }, X)
        return rt = null, de[j] = {
          config: g,
          onClose: y,
          onAfterLeave: h
        }, ye.visit(U, {
          method: u,
          data: B,
          headers: p,
          preserveScroll: !0,
          preserveState: !0,
          onError: A,
          onFinish: () => {
            Ln(() => rt).then(_);
          }
        });
      De({
        url: U,
        method: u,
        data: B,
        headers: p
      }).then((P) => _(s(P.data, g, y, h))).catch((P) => {
        A(P);
      });
    });
  }, d = {
    stack: t,
    localModals: r,
    push: i,
    pushFromResponseData: s,
    length: () => Ie.length,
    closeAll: () => {
      Ie.reverse().forEach((v) => v.close());
    },
    reset: () => o(() => []),
    visit: x,
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
  return /* @__PURE__ */ T(Be.Provider, { value: d, children: e });
}, Xe = () => {
  const e = R(Be);
  if (e === null)
    throw new Error("useModalStack must be used within a ModalStackProvider");
  return e;
}, bt = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], Fn = (e) => {
  e.initialPage && (At = e.initialPage.version), e.resolveComponent && (kt = e.resolveComponent);
}, Cl = (e, t) => (Fn(t), /* @__PURE__ */ T(Sn, { children: /* @__PURE__ */ T(e, { ...t, children: ({ Component: r, props: l, key: o }) => /* @__PURE__ */ se(dt, { children: [
  (() => {
    const s = Re(r, { key: o, ...l });
    return typeof r.layout == "function" ? r.layout(s) : Array.isArray(r.layout) ? r.layout.concat(s).reverse().reduce((c, f) => Re(f, l, c)) : s;
  })(),
  /* @__PURE__ */ T(Cn, {})
] }) }) })), Cn = ({ children: e }) => {
  var s;
  const t = R(Be);
  let n = !1, r = !1;
  M(() => ye.on("start", () => n = !0), []), M(() => ye.on("finish", () => n = !1), []), M(
    () => ye.on("navigate", function(i) {
      const c = i.detail.page.props._inertiaui_modal;
      if (!c) {
        r && t.closeAll();
        return;
      }
      r = c, $e = c.baseUrl, t.pushFromResponseData(c, {}, () => {
        if (!c.baseUrl) {
          console.error("No base url in modal response data so cannot navigate back");
          return;
        }
        !n && window.location.href !== c.baseUrl && ye.visit(c.baseUrl, {
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
  const o = En(), a = O();
  return M(() => {
    var f, x;
    const i = (f = o.props) == null ? void 0 : f._inertiaui_modal, c = a.current;
    a.current = i, i && c && i.component === c.component && Pn(i.url, c.url) && ((x = t.stack[0]) == null || x.updateProps(i.props ?? {}));
  }, [(s = o.props) == null ? void 0 : s._inertiaui_modal]), /* @__PURE__ */ se(dt, { children: [
    e,
    t.stack.length > 0 && /* @__PURE__ */ T(Rt, { index: 0 })
  ] });
}, mt = E.createContext(null);
mt.displayName = "ModalIndexContext";
const It = () => {
  const e = E.useContext(mt);
  if (e === void 0)
    throw new Error("useModalIndex must be used within a ModalIndexProvider");
  return e;
}, Rt = ({ index: e }) => {
  const { stack: t } = Xe(), n = C(() => t[e], [t, e]);
  return (n == null ? void 0 : n.component) && /* @__PURE__ */ T(mt.Provider, { value: e, children: /* @__PURE__ */ T(
    n.component,
    {
      ...n.props,
      onModalEvent: (...r) => n.emit(...r)
    }
  ) });
}, Dt = ct(({ name: e, children: t, onFocus: n = null, onBlur: r = null, onClose: l = null, onSuccess: o = null, ...a }, s) => {
  const i = It(), { stack: c, registerLocalModal: f, removeLocalModal: x } = Xe(), [b, w] = S(null), d = C(() => e ? b : c[i], [e, b, i, c]), v = C(() => {
    var h;
    return (h = c.find(($) => $.shouldRender && $.index > (d == null ? void 0 : d.index))) == null ? void 0 : h.index;
  }, [i, c]), u = C(() => (d == null ? void 0 : d.config.slideover) ?? a.slideover ?? ft("type") === "slideover", [a.slideover]), m = C(
    () => ({
      slideover: u,
      closeButton: a.closeButton ?? ce(u, "closeButton"),
      closeExplicitly: a.closeExplicitly ?? ce(u, "closeExplicitly"),
      maxWidth: a.maxWidth ?? ce(u, "maxWidth"),
      paddingClasses: a.paddingClasses ?? ce(u, "paddingClasses"),
      panelClasses: a.panelClasses ?? ce(u, "panelClasses"),
      position: a.position ?? ce(u, "position"),
      ...d == null ? void 0 : d.config
    }),
    [a, d == null ? void 0 : d.config]
  );
  M(() => {
    if (e) {
      let h = null;
      return f(e, ($) => {
        h = $.registerEventListenersFromProps(a), w($);
      }), () => {
        h == null || h(), h = null, x(e);
      };
    }
    return d.registerEventListenersFromProps(a);
  }, [e]);
  const p = O(d);
  M(() => {
    p.current = d;
  }, [d]), M(() => {
    d !== null && (d.isOpen ? o == null || o() : l == null || l());
  }, [d == null ? void 0 : d.isOpen]);
  const [g, y] = S(!1);
  return M(() => {
    g && d !== null && d.isOpen && (d.onTopOfStack ? n == null || n() : r == null || r()), y(!0);
  }, [d == null ? void 0 : d.onTopOfStack]), Ft(
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
    [d]
  ), (d == null ? void 0 : d.shouldRender) && /* @__PURE__ */ se(dt, { children: [
    typeof t == "function" ? t({
      afterLeave: d.afterLeave,
      close: d.close,
      config: m,
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
    v && /* @__PURE__ */ T(Rt, { index: v })
  ] });
});
Dt.displayName = "HeadlessModal";
function jt(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var l = e.length;
    for (t = 0; t < l; t++) e[t] && (n = jt(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function je() {
  for (var e, t, n = 0, r = "", l = arguments.length; n < l; n++) (e = arguments[n]) && (t = jt(e)) && (r && (r += " "), r += t);
  return r;
}
var Nn = Object.defineProperty, An = (e, t, n) => t in e ? Nn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, tt = (e, t, n) => (An(e, typeof t != "symbol" ? t + "" : t, n), n);
let kn = class {
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
}, ae = new kn();
function Ve(e) {
  return ae.isServer ? null : e instanceof Node ? e.ownerDocument : e != null && e.hasOwnProperty("current") && e.current instanceof Node ? e.current.ownerDocument : document;
}
function qe(e) {
  typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch((t) => setTimeout(() => {
    throw t;
  }));
}
function re() {
  let e = [], t = { addEventListener(n, r, l, o) {
    return n.addEventListener(r, l, o), t.add(() => n.removeEventListener(r, l, o));
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
    let o = n.style.getPropertyValue(r);
    return Object.assign(n.style, { [r]: l }), this.add(() => {
      Object.assign(n.style, { [r]: o });
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
let k = (e, t) => {
  ae.isServer ? M(e, t) : vn(e, t);
};
function ue(e) {
  let t = O(e);
  return k(() => {
    t.current = e;
  }, [e]), t;
}
let L = function(e) {
  let t = ue(e);
  return E.useCallback((...n) => t.current(...n), [t]);
}, In = H(void 0);
function Rn() {
  return R(In);
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
  let e = jn();
  return Y((t) => Dn({ mergeRefs: e, ...t }), [e]);
}
function Dn({ ourProps: e, theirProps: t, slot: n, defaultTag: r, features: l, visible: o = !0, name: a, mergeRefs: s }) {
  s = s ?? Un;
  let i = Ut(t, e);
  if (o) return ke(i, n, r, a, s);
  let c = l ?? 0;
  if (c & 2) {
    let { static: f = !1, ...x } = i;
    if (f) return ke(x, n, r, a, s);
  }
  if (c & 1) {
    let { unmount: f = !0, ...x } = i;
    return ne(f ? 0 : 1, { 0() {
      return null;
    }, 1() {
      return ke({ ...x, hidden: !0, style: { display: "none" } }, n, r, a, s);
    } });
  }
  return ke(i, n, r, a, s);
}
function ke(e, t = {}, n, r, l) {
  let { as: o = n, children: a, refName: s = "ref", ...i } = nt(e, ["unmount", "static"]), c = e.ref !== void 0 ? { [s]: e.ref } : {}, f = typeof a == "function" ? a(t) : a;
  "className" in i && i.className && typeof i.className == "function" && (i.className = i.className(t)), i["aria-labelledby"] && i["aria-labelledby"] === i.id && (i["aria-labelledby"] = void 0);
  let x = {};
  if (t) {
    let b = !1, w = [];
    for (let [d, v] of Object.entries(t)) typeof v == "boolean" && (b = !0), v === !0 && w.push(d.replace(/([A-Z])/g, (u) => `-${u.toLowerCase()}`));
    if (b) {
      x["data-headlessui-state"] = w.join(" ");
      for (let d of w) x[`data-${d}`] = "";
    }
  }
  if (o === G && (Object.keys(le(i)).length > 0 || Object.keys(le(x)).length > 0)) if (!gn(f) || Array.isArray(f) && f.length > 1) {
    if (Object.keys(le(i)).length > 0) throw new Error(['Passing props on "Fragment"!', "", `The current component <${r} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(le(i)).concat(Object.keys(le(x))).map((b) => `  - ${b}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((b) => `  - ${b}`).join(`
`)].join(`
`));
  } else {
    let b = f.props, w = b == null ? void 0 : b.className, d = typeof w == "function" ? (...m) => lt(w(...m), i.className) : lt(w, i.className), v = d ? { className: d } : {}, u = Ut(f.props, le(nt(i, ["ref"])));
    for (let m in x) m in u && delete x[m];
    return wn(f, Object.assign({}, u, x, c, { ref: l(Hn(f), c.ref) }, v));
  }
  return Re(o, Object.assign({}, nt(i, ["ref"]), o !== G && c, o !== G && x), f);
}
function jn() {
  let e = O([]), t = Y((n) => {
    for (let r of e.current) r != null && (typeof r == "function" ? r(n) : r.current = n);
  }, []);
  return (...n) => {
    if (!n.every((r) => r == null)) return e.current = n, t;
  };
}
function Un(...e) {
  return e.every((t) => t == null) ? void 0 : (t) => {
    for (let n of e) n != null && (typeof n == "function" ? n(t) : n.current = t);
  };
}
function Ut(...e) {
  if (e.length === 0) return {};
  if (e.length === 1) return e[0];
  let t = {}, n = {};
  for (let r of e) for (let l in r) l.startsWith("on") && typeof r[l] == "function" ? (n[l] != null || (n[l] = []), n[l].push(r[l])) : t[l] = r[l];
  if (t.disabled || t["aria-disabled"]) for (let r in n) /^(on(?:Click|Pointer|Mouse|Key)(?:Down|Up|Press)?)$/.test(r) && (n[r] = [(l) => {
    var o;
    return (o = l == null ? void 0 : l.preventDefault) == null ? void 0 : o.call(l);
  }]);
  for (let r in n) Object.assign(t, { [r](l, ...o) {
    let a = n[r];
    for (let s of a) {
      if ((l instanceof Event || (l == null ? void 0 : l.nativeEvent) instanceof Event) && l.defaultPrevented) return;
      s(l, ...o);
    }
  } });
  return t;
}
function D(e) {
  var t;
  return Object.assign(ct(e), { displayName: (t = e.displayName) != null ? t : e.name });
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
function Hn(e) {
  return E.version.split(".")[0] >= "19" ? e.props.ref : e.ref;
}
let Wn = "span";
var He = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(He || {});
function _n(e, t) {
  var n;
  let { features: r = 1, ...l } = e, o = { ref: t, "aria-hidden": (r & 2) === 2 ? !0 : (n = l["aria-hidden"]) != null ? n : void 0, hidden: (r & 4) === 4 ? !0 : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(r & 4) === 4 && (r & 2) !== 2 && { display: "none" } } };
  return W()({ ourProps: o, theirProps: l, slot: {}, defaultTag: Wn, name: "Hidden" });
}
let it = D(_n), Ht = Symbol();
function Bn(e, t = !0) {
  return Object.assign(e, { [Ht]: t });
}
function Z(...e) {
  let t = O(e);
  M(() => {
    t.current = e;
  }, [e]);
  let n = L((r) => {
    for (let l of t.current) l != null && (typeof l == "function" ? l(r) : l.current = r);
  });
  return e.every((r) => r == null || (r == null ? void 0 : r[Ht])) ? void 0 : n;
}
let ht = H(null);
ht.displayName = "DescriptionContext";
function Wt() {
  let e = R(ht);
  if (e === null) {
    let t = new Error("You used a <Description /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(t, Wt), t;
  }
  return e;
}
function Xn() {
  let [e, t] = S([]);
  return [e.length > 0 ? e.join(" ") : void 0, C(() => function(n) {
    let r = L((o) => (t((a) => [...a, o]), () => t((a) => {
      let s = a.slice(), i = s.indexOf(o);
      return i !== -1 && s.splice(i, 1), s;
    }))), l = C(() => ({ register: r, slot: n.slot, name: n.name, props: n.props, value: n.value }), [r, n.slot, n.name, n.props, n.value]);
    return E.createElement(ht.Provider, { value: l }, n.children);
  }, [t])];
}
let Vn = "p";
function qn(e, t) {
  let n = Pe(), r = Rn(), { id: l = `headlessui-description-${n}`, ...o } = e, a = Wt(), s = Z(t);
  k(() => a.register(l), [l, a.register]);
  let i = r || !1, c = C(() => ({ ...a.slot, disabled: i }), [a.slot, i]), f = { ref: s, ...a.props, id: l };
  return W()({ ourProps: f, theirProps: o, slot: c, defaultTag: Vn, name: a.name || "Description" });
}
let Yn = D(qn), zn = Object.assign(Yn, {});
var _t = ((e) => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(_t || {});
let Gn = H(() => {
});
function Kn({ value: e, children: t }) {
  return E.createElement(Gn.Provider, { value: e }, t);
}
let Zn = class extends Map {
  constructor(t) {
    super(), this.factory = t;
  }
  get(t) {
    let n = super.get(t);
    return n === void 0 && (n = this.factory(t), this.set(t, n)), n;
  }
};
function Bt(e, t) {
  let n = e(), r = /* @__PURE__ */ new Set();
  return { getSnapshot() {
    return n;
  }, subscribe(l) {
    return r.add(l), () => r.delete(l);
  }, dispatch(l, ...o) {
    let a = t[l].call(n, ...o);
    a && (n = a, r.forEach((s) => s()));
  } };
}
function Xt(e) {
  return xn(e.subscribe, e.getSnapshot, e.getSnapshot);
}
let Jn = new Zn(() => Bt(() => [], { ADD(e) {
  return this.includes(e) ? this : [...this, e];
}, REMOVE(e) {
  let t = this.indexOf(e);
  if (t === -1) return this;
  let n = this.slice();
  return n.splice(t, 1), n;
} }));
function fe(e, t) {
  let n = Jn.get(t), r = Pe(), l = Xt(n);
  if (k(() => {
    if (e) return n.dispatch("ADD", r), () => n.dispatch("REMOVE", r);
  }, [n, e]), !e) return !1;
  let o = l.indexOf(r), a = l.length;
  return o === -1 && (o = a, a += 1), o === a - 1;
}
let ot = /* @__PURE__ */ new Map(), Te = /* @__PURE__ */ new Map();
function Et(e) {
  var t;
  let n = (t = Te.get(e)) != null ? t : 0;
  return Te.set(e, n + 1), n !== 0 ? () => $t(e) : (ot.set(e, { "aria-hidden": e.getAttribute("aria-hidden"), inert: e.inert }), e.setAttribute("aria-hidden", "true"), e.inert = !0, () => $t(e));
}
function $t(e) {
  var t;
  let n = (t = Te.get(e)) != null ? t : 1;
  if (n === 1 ? Te.delete(e) : Te.set(e, n - 1), n !== 1) return;
  let r = ot.get(e);
  r && (r["aria-hidden"] === null ? e.removeAttribute("aria-hidden") : e.setAttribute("aria-hidden", r["aria-hidden"]), e.inert = r.inert, ot.delete(e));
}
function Qn(e, { allowed: t, disallowed: n } = {}) {
  let r = fe(e, "inert-others");
  k(() => {
    var l, o;
    if (!r) return;
    let a = re();
    for (let i of (l = n == null ? void 0 : n()) != null ? l : []) i && a.add(Et(i));
    let s = (o = t == null ? void 0 : t()) != null ? o : [];
    for (let i of s) {
      if (!i) continue;
      let c = Ve(i);
      if (!c) continue;
      let f = i.parentElement;
      for (; f && f !== c.body; ) {
        for (let x of f.children) s.some((b) => x.contains(b)) || a.add(Et(x));
        f = f.parentElement;
      }
    }
    return a.dispose;
  }, [r, t, n]);
}
function er(e, t, n) {
  let r = ue((l) => {
    let o = l.getBoundingClientRect();
    o.x === 0 && o.y === 0 && o.width === 0 && o.height === 0 && n();
  });
  M(() => {
    if (!e) return;
    let l = t === null ? null : t instanceof HTMLElement ? t : t.current;
    if (!l) return;
    let o = re();
    if (typeof ResizeObserver < "u") {
      let a = new ResizeObserver(() => r.current(l));
      a.observe(l), o.add(() => a.disconnect());
    }
    if (typeof IntersectionObserver < "u") {
      let a = new IntersectionObserver(() => r.current(l));
      a.observe(l), o.add(() => a.disconnect());
    }
    return () => o.dispose();
  }, [t, r, e]);
}
let We = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e) => `${e}:not([tabindex='-1'])`).join(","), tr = ["[data-autofocus]"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var J = ((e) => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e[e.AutoFocus = 64] = "AutoFocus", e))(J || {}), at = ((e) => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(at || {}), nr = ((e) => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(nr || {});
function rr(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(We)).sort((t, n) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (n.tabIndex || Number.MAX_SAFE_INTEGER)));
}
function lr(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(tr)).sort((t, n) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (n.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var Vt = ((e) => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(Vt || {});
function ir(e, t = 0) {
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
var or = ((e) => (e[e.Keyboard = 0] = "Keyboard", e[e.Mouse = 1] = "Mouse", e))(or || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (e) => {
  e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (e) => {
  e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
function Q(e) {
  e == null || e.focus({ preventScroll: !0 });
}
let ar = ["textarea", "input"].join(",");
function sr(e) {
  var t, n;
  return (n = (t = e == null ? void 0 : e.matches) == null ? void 0 : t.call(e, ar)) != null ? n : !1;
}
function ur(e, t = (n) => n) {
  return e.slice().sort((n, r) => {
    let l = t(n), o = t(r);
    if (l === null || o === null) return 0;
    let a = l.compareDocumentPosition(o);
    return a & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : a & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function Oe(e, t, { sorted: n = !0, relativeTo: r = null, skipElements: l = [] } = {}) {
  let o = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : document : e.ownerDocument, a = Array.isArray(e) ? n ? ur(e) : e : t & 64 ? lr(e) : rr(e);
  l.length > 0 && a.length > 1 && (a = a.filter((w) => !l.some((d) => d != null && "current" in d ? (d == null ? void 0 : d.current) === w : d === w))), r = r ?? o.activeElement;
  let s = (() => {
    if (t & 5) return 1;
    if (t & 10) return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), i = (() => {
    if (t & 1) return 0;
    if (t & 2) return Math.max(0, a.indexOf(r)) - 1;
    if (t & 4) return Math.max(0, a.indexOf(r)) + 1;
    if (t & 8) return a.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), c = t & 32 ? { preventScroll: !0 } : {}, f = 0, x = a.length, b;
  do {
    if (f >= x || f + x <= 0) return 0;
    let w = i + f;
    if (t & 16) w = (w + x) % x;
    else {
      if (w < 0) return 3;
      if (w >= x) return 1;
    }
    b = a[w], b == null || b.focus(c), f += s;
  } while (b !== o.activeElement);
  return t & 6 && sr(b) && b.select(), 2;
}
function qt() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function cr() {
  return /Android/gi.test(window.navigator.userAgent);
}
function dr() {
  return qt() || cr();
}
function xe(e, t, n, r) {
  let l = ue(n);
  M(() => {
    if (!e) return;
    function o(a) {
      l.current(a);
    }
    return document.addEventListener(t, o, r), () => document.removeEventListener(t, o, r);
  }, [e, t, r]);
}
function Yt(e, t, n, r) {
  let l = ue(n);
  M(() => {
    if (!e) return;
    function o(a) {
      l.current(a);
    }
    return window.addEventListener(t, o, r), () => window.removeEventListener(t, o, r);
  }, [e, t, r]);
}
const Tt = 30;
function fr(e, t, n) {
  let r = fe(e, "outside-click"), l = ue(n), o = Y(function(i, c) {
    if (i.defaultPrevented) return;
    let f = c(i);
    if (f === null || !f.getRootNode().contains(f) || !f.isConnected) return;
    let x = function b(w) {
      return typeof w == "function" ? b(w()) : Array.isArray(w) || w instanceof Set ? w : [w];
    }(t);
    for (let b of x) if (b !== null && (b.contains(f) || i.composed && i.composedPath().includes(b))) return;
    return !ir(f, Vt.Loose) && f.tabIndex !== -1 && i.preventDefault(), l.current(i, f);
  }, [l, t]), a = O(null);
  xe(r, "pointerdown", (i) => {
    var c, f;
    a.current = ((f = (c = i.composedPath) == null ? void 0 : c.call(i)) == null ? void 0 : f[0]) || i.target;
  }, !0), xe(r, "mousedown", (i) => {
    var c, f;
    a.current = ((f = (c = i.composedPath) == null ? void 0 : c.call(i)) == null ? void 0 : f[0]) || i.target;
  }, !0), xe(r, "click", (i) => {
    dr() || a.current && (o(i, () => a.current), a.current = null);
  }, !0);
  let s = O({ x: 0, y: 0 });
  xe(r, "touchstart", (i) => {
    s.current.x = i.touches[0].clientX, s.current.y = i.touches[0].clientY;
  }, !0), xe(r, "touchend", (i) => {
    let c = { x: i.changedTouches[0].clientX, y: i.changedTouches[0].clientY };
    if (!(Math.abs(c.x - s.current.x) >= Tt || Math.abs(c.y - s.current.y) >= Tt)) return o(i, () => i.target instanceof HTMLElement ? i.target : null);
  }, !0), Yt(r, "blur", (i) => o(i, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), !0);
}
function Me(...e) {
  return C(() => Ve(...e), [...e]);
}
function zt(e, t, n, r) {
  let l = ue(n);
  M(() => {
    e = e ?? window;
    function o(a) {
      l.current(a);
    }
    return e.addEventListener(t, o, r), () => e.removeEventListener(t, o, r);
  }, [e, t, r]);
}
function mr() {
  let e;
  return { before({ doc: t }) {
    var n;
    let r = t.documentElement, l = (n = t.defaultView) != null ? n : window;
    e = Math.max(0, l.innerWidth - r.clientWidth);
  }, after({ doc: t, d: n }) {
    let r = t.documentElement, l = Math.max(0, r.clientWidth - r.offsetWidth), o = Math.max(0, e - l);
    n.style(r, "paddingRight", `${o}px`);
  } };
}
function pr() {
  return qt() ? { before({ doc: e, d: t, meta: n }) {
    function r(l) {
      return n.containers.flatMap((o) => o()).some((o) => o.contains(l));
    }
    t.microTask(() => {
      var l;
      if (window.getComputedStyle(e.documentElement).scrollBehavior !== "auto") {
        let s = re();
        s.style(e.documentElement, "scrollBehavior", "auto"), t.add(() => t.microTask(() => s.dispose()));
      }
      let o = (l = window.scrollY) != null ? l : window.pageYOffset, a = null;
      t.addEventListener(e, "click", (s) => {
        if (s.target instanceof HTMLElement) try {
          let i = s.target.closest("a");
          if (!i) return;
          let { hash: c } = new URL(i.href), f = e.querySelector(c);
          f && !r(f) && (a = f);
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
        o !== i && window.scrollTo(0, o), a && a.isConnected && (a.scrollIntoView({ block: "nearest" }), a = null);
      });
    });
  } } : {};
}
function hr() {
  return { before({ doc: e, d: t }) {
    t.style(e.documentElement, "overflow", "hidden");
  } };
}
function vr(e) {
  let t = {};
  for (let n of e) Object.assign(t, n(t));
  return t;
}
let oe = Bt(() => /* @__PURE__ */ new Map(), { PUSH(e, t) {
  var n;
  let r = (n = this.get(e)) != null ? n : { doc: e, count: 0, d: re(), meta: /* @__PURE__ */ new Set() };
  return r.count++, r.meta.add(t), this.set(e, r), this;
}, POP(e, t) {
  let n = this.get(e);
  return n && (n.count--, n.meta.delete(t)), this;
}, SCROLL_PREVENT({ doc: e, d: t, meta: n }) {
  let r = { doc: e, d: t, meta: vr(n) }, l = [pr(), mr(), hr()];
  l.forEach(({ before: o }) => o == null ? void 0 : o(r)), l.forEach(({ after: o }) => o == null ? void 0 : o(r));
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
function gr(e, t, n = () => ({ containers: [] })) {
  let r = Xt(oe), l = t ? r.get(t) : void 0, o = l ? l.count > 0 : !1;
  return k(() => {
    if (!(!t || !e)) return oe.dispatch("PUSH", t, n), () => oe.dispatch("POP", t, n);
  }, [e, t]), o;
}
function wr(e, t, n = () => [document.body]) {
  let r = fe(e, "scroll-lock");
  gr(r, t, (l) => {
    var o;
    return { containers: [...(o = l.containers) != null ? o : [], n] };
  });
}
function xr(e = 0) {
  let [t, n] = S(e), r = Y((i) => n(i), [t]), l = Y((i) => n((c) => c | i), [t]), o = Y((i) => (t & i) === i, [t]), a = Y((i) => n((c) => c & ~i), [n]), s = Y((i) => n((c) => c ^ i), [n]);
  return { flags: t, setFlag: r, addFlag: l, hasFlag: o, removeFlag: a, toggleFlag: s };
}
var Ot, Pt;
typeof process < "u" && typeof globalThis < "u" && typeof Element < "u" && ((Ot = process == null ? void 0 : process.env) == null ? void 0 : Ot.NODE_ENV) === "test" && typeof ((Pt = Element == null ? void 0 : Element.prototype) == null ? void 0 : Pt.getAnimations) > "u" && (Element.prototype.getAnimations = function() {
  return console.warn(["Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.", "Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.", "", "Example usage:", "```js", "import { mockAnimationsApi } from 'jsdom-testing-mocks'", "mockAnimationsApi()", "```"].join(`
`)), [];
});
var yr = ((e) => (e[e.None = 0] = "None", e[e.Closed = 1] = "Closed", e[e.Enter = 2] = "Enter", e[e.Leave = 4] = "Leave", e))(yr || {});
function br(e) {
  let t = {};
  for (let n in e) e[n] === !0 && (t[`data-${n}`] = "");
  return t;
}
function Er(e, t, n, r) {
  let [l, o] = S(n), { hasFlag: a, addFlag: s, removeFlag: i } = xr(e && l ? 3 : 0), c = O(!1), f = O(!1), x = pt();
  return k(() => {
    var b;
    if (e) {
      if (n && o(!0), !t) {
        n && s(3);
        return;
      }
      return (b = r == null ? void 0 : r.start) == null || b.call(r, n), $r(t, { inFlight: c, prepare() {
        f.current ? f.current = !1 : f.current = c.current, c.current = !0, !f.current && (n ? (s(3), i(4)) : (s(4), i(2)));
      }, run() {
        f.current ? n ? (i(3), s(4)) : (i(4), s(3)) : n ? i(1) : s(1);
      }, done() {
        var w;
        f.current && typeof t.getAnimations == "function" && t.getAnimations().length > 0 || (c.current = !1, i(7), n || o(!1), (w = r == null ? void 0 : r.end) == null || w.call(r, n));
      } });
    }
  }, [e, n, t, x]), e ? [l, { closed: a(1), enter: a(2), leave: a(4), transition: a(2) || a(4) }] : [n, { closed: void 0, enter: void 0, leave: void 0, transition: void 0 }];
}
function $r(e, { prepare: t, run: n, done: r, inFlight: l }) {
  let o = re();
  return Or(e, { prepare: t, inFlight: l }), o.nextFrame(() => {
    n(), o.requestAnimationFrame(() => {
      o.add(Tr(e, r));
    });
  }), o.dispose;
}
function Tr(e, t) {
  var n, r;
  let l = re();
  if (!e) return l.dispose;
  let o = !1;
  l.add(() => {
    o = !0;
  });
  let a = (r = (n = e.getAnimations) == null ? void 0 : n.call(e).filter((s) => s instanceof CSSTransition)) != null ? r : [];
  return a.length === 0 ? (t(), l.dispose) : (Promise.allSettled(a.map((s) => s.finished)).then(() => {
    o || t();
  }), l.dispose);
}
function Or(e, { inFlight: t, prepare: n }) {
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
    for (let [o, a] of t.entries()) if (n.current[o] !== a) {
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
function Pr({ value: e, children: t }) {
  return E.createElement(Ye.Provider, { value: e }, t);
}
function Mr({ children: e }) {
  return E.createElement(Ye.Provider, { value: null }, e);
}
function Lr(e) {
  function t() {
    document.readyState !== "loading" && (e(), document.removeEventListener("DOMContentLoaded", t));
  }
  typeof window < "u" && typeof document < "u" && (document.addEventListener("DOMContentLoaded", t), t());
}
let ee = [];
Lr(() => {
  function e(t) {
    if (!(t.target instanceof HTMLElement) || t.target === document.body || ee[0] === t.target) return;
    let n = t.target;
    n = n.closest(We), ee.unshift(n ?? t.target), ee = ee.filter((r) => r != null && r.isConnected), ee.splice(10);
  }
  window.addEventListener("click", e, { capture: !0 }), window.addEventListener("mousedown", e, { capture: !0 }), window.addEventListener("focus", e, { capture: !0 }), document.body.addEventListener("click", e, { capture: !0 }), document.body.addEventListener("mousedown", e, { capture: !0 }), document.body.addEventListener("focus", e, { capture: !0 });
});
function Gt(e) {
  let t = L(e), n = O(!1);
  M(() => (n.current = !1, () => {
    n.current = !0, qe(() => {
      n.current && t();
    });
  }), [t]);
}
function Sr() {
  let e = typeof document > "u";
  return "useSyncExternalStore" in Ee ? ((t) => t.useSyncExternalStore)(Ee)(() => () => {
  }, () => !1, () => !e) : !1;
}
function Le() {
  let e = Sr(), [t, n] = Ee.useState(ae.isHandoffComplete);
  return t && ae.isHandoffComplete === !1 && n(!1), Ee.useEffect(() => {
    t !== !0 && n(!0);
  }, [t]), Ee.useEffect(() => ae.handoff(), []), e ? !1 : t;
}
let Kt = H(!1);
function Fr() {
  return R(Kt);
}
function Mt(e) {
  return E.createElement(Kt.Provider, { value: e.force }, e.children);
}
function Cr(e) {
  let t = Fr(), n = R(Jt), r = Me(e), [l, o] = S(() => {
    var a;
    if (!t && n !== null) return (a = n.current) != null ? a : null;
    if (ae.isServer) return null;
    let s = r == null ? void 0 : r.getElementById("headlessui-portal-root");
    if (s) return s;
    if (r === null) return null;
    let i = r.createElement("div");
    return i.setAttribute("id", "headlessui-portal-root"), r.body.appendChild(i);
  });
  return M(() => {
    l !== null && (r != null && r.body.contains(l) || r == null || r.body.appendChild(l));
  }, [l, r]), M(() => {
    t || n !== null && o(n.current);
  }, [n, o, t]), l;
}
let Zt = G, Nr = D(function(e, t) {
  let n = e, r = O(null), l = Z(Bn((x) => {
    r.current = x;
  }), t), o = Me(r), a = Cr(r), [s] = S(() => {
    var x;
    return ae.isServer ? null : (x = o == null ? void 0 : o.createElement("div")) != null ? x : null;
  }), i = R(st), c = Le();
  k(() => {
    !a || !s || a.contains(s) || (s.setAttribute("data-headlessui-portal", ""), a.appendChild(s));
  }, [a, s]), k(() => {
    if (s && i) return i.register(s);
  }, [i, s]), Gt(() => {
    var x;
    !a || !s || (s instanceof Node && a.contains(s) && a.removeChild(s), a.childNodes.length <= 0 && ((x = a.parentElement) == null || x.removeChild(a)));
  });
  let f = W();
  return c ? !a || !s ? null : Tn(f({ ourProps: { ref: l }, theirProps: n, slot: {}, defaultTag: Zt, name: "Portal" }), s) : null;
});
function Ar(e, t) {
  let n = Z(t), { enabled: r = !0, ...l } = e, o = W();
  return r ? E.createElement(Nr, { ...l, ref: n }) : o({ ourProps: { ref: n }, theirProps: l, slot: {}, defaultTag: Zt, name: "Portal" });
}
let kr = G, Jt = H(null);
function Ir(e, t) {
  let { target: n, ...r } = e, l = { ref: Z(t) }, o = W();
  return E.createElement(Jt.Provider, { value: n }, o({ ourProps: l, theirProps: r, defaultTag: kr, name: "Popover.Group" }));
}
let st = H(null);
function Rr() {
  let e = R(st), t = O([]), n = L((o) => (t.current.push(o), e && e.register(o), () => r(o))), r = L((o) => {
    let a = t.current.indexOf(o);
    a !== -1 && t.current.splice(a, 1), e && e.unregister(o);
  }), l = C(() => ({ register: n, unregister: r, portals: t }), [n, r, t]);
  return [t, C(() => function({ children: o }) {
    return E.createElement(st.Provider, { value: l }, o);
  }, [l])];
}
let Dr = D(Ar), Qt = D(Ir), jr = Object.assign(Dr, { Group: Qt });
function Ur(e, t = typeof document < "u" ? document.defaultView : null, n) {
  let r = fe(e, "escape");
  zt(t, "keydown", (l) => {
    r && (l.defaultPrevented || l.key === _t.Escape && n(l));
  });
}
function Hr() {
  var e;
  let [t] = S(() => typeof window < "u" && typeof window.matchMedia == "function" ? window.matchMedia("(pointer: coarse)") : null), [n, r] = S((e = t == null ? void 0 : t.matches) != null ? e : !1);
  return k(() => {
    if (!t) return;
    function l(o) {
      r(o.matches);
    }
    return t.addEventListener("change", l), () => t.removeEventListener("change", l);
  }, [t]), n;
}
function Wr({ defaultContainers: e = [], portals: t, mainTreeNode: n } = {}) {
  let r = Me(n), l = L(() => {
    var o, a;
    let s = [];
    for (let i of e) i !== null && (i instanceof HTMLElement ? s.push(i) : "current" in i && i.current instanceof HTMLElement && s.push(i.current));
    if (t != null && t.current) for (let i of t.current) s.push(i);
    for (let i of (o = r == null ? void 0 : r.querySelectorAll("html > *, body > *")) != null ? o : []) i !== document.body && i !== document.head && i instanceof HTMLElement && i.id !== "headlessui-portal-root" && (n && (i.contains(n) || i.contains((a = n == null ? void 0 : n.getRootNode()) == null ? void 0 : a.host)) || s.some((c) => i.contains(c)) || s.push(i));
    return s;
  });
  return { resolveContainers: l, contains: L((o) => l().some((a) => a.contains(o))) };
}
let en = H(null);
function Lt({ children: e, node: t }) {
  let [n, r] = S(null), l = tn(t ?? n);
  return E.createElement(en.Provider, { value: l }, e, l === null && E.createElement(it, { features: He.Hidden, ref: (o) => {
    var a, s;
    if (o) {
      for (let i of (s = (a = Ve(o)) == null ? void 0 : a.querySelectorAll("html > *, body > *")) != null ? s : []) if (i !== document.body && i !== document.head && i instanceof HTMLElement && i != null && i.contains(o)) {
        r(i);
        break;
      }
    }
  } }));
}
function tn(e = null) {
  var t;
  return (t = R(en)) != null ? t : e;
}
function gt() {
  let e = O(!1);
  return k(() => (e.current = !0, () => {
    e.current = !1;
  }), []), e;
}
var be = ((e) => (e[e.Forwards = 0] = "Forwards", e[e.Backwards = 1] = "Backwards", e))(be || {});
function _r() {
  let e = O(0);
  return Yt(!0, "keydown", (t) => {
    t.key === "Tab" && (e.current = t.shiftKey ? 1 : 0);
  }, !0), e;
}
function nn(e) {
  if (!e) return /* @__PURE__ */ new Set();
  if (typeof e == "function") return new Set(e());
  let t = /* @__PURE__ */ new Set();
  for (let n of e.current) n.current instanceof HTMLElement && t.add(n.current);
  return t;
}
let Br = "div";
var ie = ((e) => (e[e.None = 0] = "None", e[e.InitialFocus = 1] = "InitialFocus", e[e.TabLock = 2] = "TabLock", e[e.FocusLock = 4] = "FocusLock", e[e.RestoreFocus = 8] = "RestoreFocus", e[e.AutoFocus = 16] = "AutoFocus", e))(ie || {});
function Xr(e, t) {
  let n = O(null), r = Z(n, t), { initialFocus: l, initialFocusFallback: o, containers: a, features: s = 15, ...i } = e;
  Le() || (s = 0);
  let c = Me(n);
  zr(s, { ownerDocument: c });
  let f = Gr(s, { ownerDocument: c, container: n, initialFocus: l, initialFocusFallback: o });
  Kr(s, { ownerDocument: c, container: n, containers: a, previousActiveElement: f });
  let x = _r(), b = L((p) => {
    let g = n.current;
    g && ((y) => y())(() => {
      ne(x.current, { [be.Forwards]: () => {
        Oe(g, J.First, { skipElements: [p.relatedTarget, o] });
      }, [be.Backwards]: () => {
        Oe(g, J.Last, { skipElements: [p.relatedTarget, o] });
      } });
    });
  }), w = fe(!!(s & 2), "focus-trap#tab-lock"), d = pt(), v = O(!1), u = { ref: r, onKeyDown(p) {
    p.key == "Tab" && (v.current = !0, d.requestAnimationFrame(() => {
      v.current = !1;
    }));
  }, onBlur(p) {
    if (!(s & 4)) return;
    let g = nn(a);
    n.current instanceof HTMLElement && g.add(n.current);
    let y = p.relatedTarget;
    y instanceof HTMLElement && y.dataset.headlessuiFocusGuard !== "true" && (rn(g, y) || (v.current ? Oe(n.current, ne(x.current, { [be.Forwards]: () => J.Next, [be.Backwards]: () => J.Previous }) | J.WrapAround, { relativeTo: p.target }) : p.target instanceof HTMLElement && Q(p.target)));
  } }, m = W();
  return E.createElement(E.Fragment, null, w && E.createElement(it, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: b, features: He.Focusable }), m({ ourProps: u, theirProps: i, defaultTag: Br, name: "FocusTrap" }), w && E.createElement(it, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: b, features: He.Focusable }));
}
let Vr = D(Xr), qr = Object.assign(Vr, { features: ie });
function Yr(e = !0) {
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
function zr(e, { ownerDocument: t }) {
  let n = !!(e & 8), r = Yr(n);
  vt(() => {
    n || (t == null ? void 0 : t.activeElement) === (t == null ? void 0 : t.body) && Q(r());
  }, [n]), Gt(() => {
    n && Q(r());
  });
}
function Gr(e, { ownerDocument: t, container: n, initialFocus: r, initialFocusFallback: l }) {
  let o = O(null), a = fe(!!(e & 1), "focus-trap#initial-focus"), s = gt();
  return vt(() => {
    if (e === 0) return;
    if (!a) {
      l != null && l.current && Q(l.current);
      return;
    }
    let i = n.current;
    i && qe(() => {
      if (!s.current) return;
      let c = t == null ? void 0 : t.activeElement;
      if (r != null && r.current) {
        if ((r == null ? void 0 : r.current) === c) {
          o.current = c;
          return;
        }
      } else if (i.contains(c)) {
        o.current = c;
        return;
      }
      if (r != null && r.current) Q(r.current);
      else {
        if (e & 16) {
          if (Oe(i, J.First | J.AutoFocus) !== at.Error) return;
        } else if (Oe(i, J.First) !== at.Error) return;
        if (l != null && l.current && (Q(l.current), (t == null ? void 0 : t.activeElement) === l.current)) return;
        console.warn("There are no focusable elements inside the <FocusTrap />");
      }
      o.current = t == null ? void 0 : t.activeElement;
    });
  }, [l, a, e]), o;
}
function Kr(e, { ownerDocument: t, container: n, containers: r, previousActiveElement: l }) {
  let o = gt(), a = !!(e & 4);
  zt(t == null ? void 0 : t.defaultView, "focus", (s) => {
    if (!a || !o.current) return;
    let i = nn(r);
    n.current instanceof HTMLElement && i.add(n.current);
    let c = l.current;
    if (!c) return;
    let f = s.target;
    f && f instanceof HTMLElement ? rn(i, f) ? (l.current = f, Q(f)) : (s.preventDefault(), s.stopPropagation(), Q(c)) : Q(l.current);
  }, !0);
}
function rn(e, t) {
  for (let n of e) if (n.contains(t)) return !0;
  return !1;
}
function ln(e) {
  var t;
  return !!(e.enter || e.enterFrom || e.enterTo || e.leave || e.leaveFrom || e.leaveTo) || ((t = e.as) != null ? t : an) !== G || E.Children.count(e.children) === 1;
}
let Ge = H(null);
Ge.displayName = "TransitionContext";
var Zr = ((e) => (e.Visible = "visible", e.Hidden = "hidden", e))(Zr || {});
function Jr() {
  let e = R(Ge);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
function Qr() {
  let e = R(Ke);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
let Ke = H(null);
Ke.displayName = "NestingContext";
function Ze(e) {
  return "children" in e ? Ze(e.children) : e.current.filter(({ el: t }) => t.current !== null).filter(({ state: t }) => t === "visible").length > 0;
}
function on(e, t) {
  let n = ue(e), r = O([]), l = gt(), o = pt(), a = L((w, d = te.Hidden) => {
    let v = r.current.findIndex(({ el: u }) => u === w);
    v !== -1 && (ne(d, { [te.Unmount]() {
      r.current.splice(v, 1);
    }, [te.Hidden]() {
      r.current[v].state = "hidden";
    } }), o.microTask(() => {
      var u;
      !Ze(r) && l.current && ((u = n.current) == null || u.call(n));
    }));
  }), s = L((w) => {
    let d = r.current.find(({ el: v }) => v === w);
    return d ? d.state !== "visible" && (d.state = "visible") : r.current.push({ el: w, state: "visible" }), () => a(w, te.Unmount);
  }), i = O([]), c = O(Promise.resolve()), f = O({ enter: [], leave: [] }), x = L((w, d, v) => {
    i.current.splice(0), t && (t.chains.current[d] = t.chains.current[d].filter(([u]) => u !== w)), t == null || t.chains.current[d].push([w, new Promise((u) => {
      i.current.push(u);
    })]), t == null || t.chains.current[d].push([w, new Promise((u) => {
      Promise.all(f.current[d].map(([m, p]) => p)).then(() => u());
    })]), d === "enter" ? c.current = c.current.then(() => t == null ? void 0 : t.wait.current).then(() => v(d)) : v(d);
  }), b = L((w, d, v) => {
    Promise.all(f.current[d].splice(0).map(([u, m]) => m)).then(() => {
      var u;
      (u = i.current.shift()) == null || u();
    }).then(() => v(d));
  });
  return C(() => ({ children: r, register: s, unregister: a, onStart: x, onStop: b, wait: c, chains: f }), [s, a, r, x, b, f, c]);
}
let an = G, sn = Ue.RenderStrategy;
function el(e, t) {
  var n, r;
  let { transition: l = !0, beforeEnter: o, afterEnter: a, beforeLeave: s, afterLeave: i, enter: c, enterFrom: f, enterTo: x, entered: b, leave: w, leaveFrom: d, leaveTo: v, ...u } = e, [m, p] = S(null), g = O(null), y = ln(e), h = Z(...y ? [g, t, p] : t === null ? [] : [t]), $ = (n = u.unmount) == null || n ? te.Unmount : te.Hidden, { show: F, appear: j, initial: _ } = Jr(), [A, U] = S(F ? "visible" : "hidden"), B = Qr(), { register: X, unregister: P } = B;
  k(() => X(g), [X, g]), k(() => {
    if ($ === te.Hidden && g.current) {
      if (F && A !== "visible") {
        U("visible");
        return;
      }
      return ne(A, { hidden: () => P(g), visible: () => X(g) });
    }
  }, [A, g, X, P, F, $]);
  let V = Le();
  k(() => {
    if (y && V && A === "visible" && g.current === null) throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
  }, [g, A, V, y]);
  let Se = _ && !j, Fe = j && F && _, pe = O(!1), K = on(() => {
    pe.current || (U("hidden"), P(g));
  }, B), Ce = L((Qe) => {
    pe.current = !0;
    let Ae = Qe ? "enter" : "leave";
    K.onStart(g, Ae, (ve) => {
      ve === "enter" ? o == null || o() : ve === "leave" && (s == null || s());
    });
  }), N = L((Qe) => {
    let Ae = Qe ? "enter" : "leave";
    pe.current = !1, K.onStop(g, Ae, (ve) => {
      ve === "enter" ? a == null || a() : ve === "leave" && (i == null || i());
    }), Ae === "leave" && !Ze(K) && (U("hidden"), P(g));
  });
  M(() => {
    y && l || (Ce(F), N(F));
  }, [F, y, l]);
  let Ne = !(!l || !y || !V || Se), [, I] = Er(Ne, m, F, { start: Ce, end: N }), fn = le({ ref: h, className: ((r = lt(u.className, Fe && c, Fe && f, I.enter && c, I.enter && I.closed && f, I.enter && !I.closed && x, I.leave && w, I.leave && !I.closed && d, I.leave && I.closed && v, !I.transition && F && b)) == null ? void 0 : r.trim()) || void 0, ...br(I) }), he = 0;
  A === "visible" && (he |= z.Open), A === "hidden" && (he |= z.Closed), I.enter && (he |= z.Opening), I.leave && (he |= z.Closing);
  let mn = W();
  return E.createElement(Ke.Provider, { value: K }, E.createElement(Pr, { value: he }, mn({ ourProps: fn, theirProps: u, defaultTag: an, features: sn, visible: A === "visible", name: "Transition.Child" })));
}
function tl(e, t) {
  let { show: n, appear: r = !1, unmount: l = !0, ...o } = e, a = O(null), s = ln(e), i = Z(...s ? [a, t] : t === null ? [] : [t]);
  Le();
  let c = ze();
  if (n === void 0 && c !== null && (n = (c & z.Open) === z.Open), n === void 0) throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
  let [f, x] = S(n ? "visible" : "hidden"), b = on(() => {
    n || x("hidden");
  }), [w, d] = S(!0), v = O([n]);
  k(() => {
    w !== !1 && v.current[v.current.length - 1] !== n && (v.current.push(n), d(!1));
  }, [v, n]);
  let u = C(() => ({ show: n, appear: r, initial: w }), [n, r, w]);
  k(() => {
    n ? x("visible") : !Ze(b) && a.current !== null && x("hidden");
  }, [n, b]);
  let m = { unmount: l }, p = L(() => {
    var h;
    w && d(!1), (h = e.beforeEnter) == null || h.call(e);
  }), g = L(() => {
    var h;
    w && d(!1), (h = e.beforeLeave) == null || h.call(e);
  }), y = W();
  return E.createElement(Ke.Provider, { value: b }, E.createElement(Ge.Provider, { value: u }, y({ ourProps: { ...m, as: G, children: E.createElement(un, { ref: i, ...m, ...o, beforeEnter: p, beforeLeave: g }) }, theirProps: {}, defaultTag: G, features: sn, visible: f === "visible", name: "Transition" })));
}
function nl(e, t) {
  let n = R(Ge) !== null, r = ze() !== null;
  return E.createElement(E.Fragment, null, !n && r ? E.createElement(ut, { ref: t, ...e }) : E.createElement(un, { ref: t, ...e }));
}
let ut = D(tl), un = D(el), me = D(nl), cn = Object.assign(ut, { Child: me, Root: ut });
var rl = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(rl || {}), ll = ((e) => (e[e.SetTitleId = 0] = "SetTitleId", e))(ll || {});
let il = { 0(e, t) {
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
function ol(e, t) {
  return ne(t.type, il, e, t);
}
let St = D(function(e, t) {
  let n = Pe(), { id: r = `headlessui-dialog-${n}`, open: l, onClose: o, initialFocus: a, role: s = "dialog", autoFocus: i = !0, __demoMode: c = !1, unmount: f = !1, ...x } = e, b = O(!1);
  s = function() {
    return s === "dialog" || s === "alertdialog" ? s : (b.current || (b.current = !0, console.warn(`Invalid role [${s}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog");
  }();
  let w = ze();
  l === void 0 && w !== null && (l = (w & z.Open) === z.Open);
  let d = O(null), v = Z(d, t), u = Me(d), m = l ? 0 : 1, [p, g] = yn(ol, { titleId: null, descriptionId: null, panelRef: bn() }), y = L(() => o(!1)), h = L((N) => g({ type: 0, id: N })), $ = Le() ? m === 0 : !1, [F, j] = Rr(), _ = { get current() {
    var N;
    return (N = p.panelRef.current) != null ? N : d.current;
  } }, A = tn(), { resolveContainers: U } = Wr({ mainTreeNode: A, portals: F, defaultContainers: [_] }), B = w !== null ? (w & z.Closing) === z.Closing : !1;
  Qn(c || B ? !1 : $, { allowed: L(() => {
    var N, Ne;
    return [(Ne = (N = d.current) == null ? void 0 : N.closest("[data-headlessui-portal]")) != null ? Ne : null];
  }), disallowed: L(() => {
    var N;
    return [(N = A == null ? void 0 : A.closest("body > *:not(#headlessui-portal-root)")) != null ? N : null];
  }) }), fr($, U, (N) => {
    N.preventDefault(), y();
  }), Ur($, u == null ? void 0 : u.defaultView, (N) => {
    N.preventDefault(), N.stopPropagation(), document.activeElement && "blur" in document.activeElement && typeof document.activeElement.blur == "function" && document.activeElement.blur(), y();
  }), wr(c || B ? !1 : $, u, U), er($, d, y);
  let [X, P] = Xn(), V = C(() => [{ dialogState: m, close: y, setTitleId: h, unmount: f }, p], [m, p, y, h, f]), Se = C(() => ({ open: m === 0 }), [m]), Fe = { ref: v, id: r, role: s, tabIndex: -1, "aria-modal": c ? void 0 : m === 0 ? !0 : void 0, "aria-labelledby": p.titleId, "aria-describedby": X, unmount: f }, pe = !Hr(), K = ie.None;
  $ && !c && (K |= ie.RestoreFocus, K |= ie.TabLock, i && (K |= ie.AutoFocus), pe && (K |= ie.InitialFocus));
  let Ce = W();
  return E.createElement(Mr, null, E.createElement(Mt, { force: !0 }, E.createElement(jr, null, E.createElement(wt.Provider, { value: V }, E.createElement(Qt, { target: d }, E.createElement(Mt, { force: !1 }, E.createElement(P, { slot: Se }, E.createElement(j, null, E.createElement(qr, { initialFocus: a, initialFocusFallback: d, containers: U, features: K }, E.createElement(Kn, { value: y }, Ce({ ourProps: Fe, theirProps: x, slot: Se, defaultTag: al, features: sl, visible: m === 0, name: "Dialog" })))))))))));
}), al = "div", sl = Ue.RenderStrategy | Ue.Static;
function ul(e, t) {
  let { transition: n = !1, open: r, ...l } = e, o = ze(), a = e.hasOwnProperty("open") || o !== null, s = e.hasOwnProperty("onClose");
  if (!a && !s) throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");
  if (!a) throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");
  if (!s) throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");
  if (!o && typeof e.open != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${e.open}`);
  if (typeof e.onClose != "function") throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${e.onClose}`);
  return (r !== void 0 || n) && !l.static ? E.createElement(Lt, null, E.createElement(cn, { show: r, transition: n, unmount: l.unmount }, E.createElement(St, { ref: t, ...l }))) : E.createElement(Lt, null, E.createElement(St, { ref: t, open: r, ...l }));
}
let cl = "div";
function dl(e, t) {
  let n = Pe(), { id: r = `headlessui-dialog-panel-${n}`, transition: l = !1, ...o } = e, [{ dialogState: a, unmount: s }, i] = Je("Dialog.Panel"), c = Z(t, i.panelRef), f = C(() => ({ open: a === 0 }), [a]), x = L((u) => {
    u.stopPropagation();
  }), b = { ref: c, id: r, onClick: x }, w = l ? me : G, d = l ? { unmount: s } : {}, v = W();
  return E.createElement(w, { ...d }, v({ ourProps: b, theirProps: o, slot: f, defaultTag: cl, name: "Dialog.Panel" }));
}
let fl = "div";
function ml(e, t) {
  let { transition: n = !1, ...r } = e, [{ dialogState: l, unmount: o }] = Je("Dialog.Backdrop"), a = C(() => ({ open: l === 0 }), [l]), s = { ref: t, "aria-hidden": !0 }, i = n ? me : G, c = n ? { unmount: o } : {}, f = W();
  return E.createElement(i, { ...c }, f({ ourProps: s, theirProps: r, slot: a, defaultTag: fl, name: "Dialog.Backdrop" }));
}
let pl = "h2";
function hl(e, t) {
  let n = Pe(), { id: r = `headlessui-dialog-title-${n}`, ...l } = e, [{ dialogState: o, setTitleId: a }] = Je("Dialog.Title"), s = Z(t);
  M(() => (a(r), () => a(null)), [r, a]);
  let i = C(() => ({ open: o === 0 }), [o]), c = { ref: s, id: r };
  return W()({ ourProps: c, theirProps: l, slot: i, defaultTag: pl, name: "Dialog.Title" });
}
let vl = D(ul), xt = D(dl);
D(ml);
let gl = D(hl), wl = Object.assign(vl, { Panel: xt, Title: gl, Description: zn });
function dn({ onClick: e }) {
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
const xl = ({ modalContext: e, config: t, children: n }) => {
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
            xt,
            {
              className: `im-modal-content relative ${t.paddingClasses} ${t.panelClasses}`,
              "data-inertiaui-modal-entered": r,
              children: [
                t.closeButton && /* @__PURE__ */ T("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ T(dn, { onClick: e.close }) }),
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
            xt,
            {
              className: `im-slideover-content relative ${t.paddingClasses} ${t.panelClasses}`,
              "data-inertiaui-modal-entered": r,
              children: [
                t.closeButton && /* @__PURE__ */ T("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ T(dn, { onClick: e.close }) }),
                typeof n == "function" ? n({ modalContext: e, config: t }) : n
              ]
            }
          )
        }
      )
    }
  ) });
}, bl = ct(({ name: e, children: t, onFocus: n = null, onBlur: r = null, onClose: l = null, onSuccess: o = null, onAfterLeave: a = null, ...s }, i) => {
  const c = (x) => typeof t == "function" ? t(x) : t, f = O(null);
  return Ft(i, () => f.current, [f]), /* @__PURE__ */ T(
    Dt,
    {
      ref: f,
      name: e,
      onFocus: n,
      onBlur: r,
      onClose: l,
      onSuccess: o,
      ...s,
      children: ({
        afterLeave: x,
        close: b,
        config: w,
        emit: d,
        getChildModal: v,
        getParentModal: u,
        id: m,
        index: p,
        isOpen: g,
        modalContext: y,
        onTopOfStack: h,
        reload: $,
        setOpen: F,
        shouldRender: j
      }) => /* @__PURE__ */ T(
        cn,
        {
          appear: !0,
          show: g ?? !1,
          afterLeave: a,
          children: /* @__PURE__ */ se(
            wl,
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
                    modalContext: y,
                    config: w,
                    children: c({
                      afterLeave: x,
                      close: b,
                      config: w,
                      emit: d,
                      getChildModal: v,
                      getParentModal: u,
                      id: m,
                      index: p,
                      isOpen: g,
                      modalContext: y,
                      onTopOfStack: h,
                      reload: $,
                      setOpen: F,
                      shouldRender: j
                    })
                  }
                ) : /* @__PURE__ */ T(
                  xl,
                  {
                    modalContext: y,
                    config: w,
                    children: c({
                      afterLeave: x,
                      close: b,
                      config: w,
                      emit: d,
                      getChildModal: v,
                      getParentModal: u,
                      id: m,
                      index: p,
                      isOpen: g,
                      modalContext: y,
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
bl.displayName = "Modal";
const kl = ({
  href: e,
  method: t = "get",
  data: n = {},
  as: r = "a",
  headers: l = {},
  queryStringArrayFormat: o = "brackets",
  onAfterLeave: a = null,
  onBlur: s = null,
  onClose: i = null,
  onError: c = null,
  onFocus: f = null,
  onStart: x = null,
  onSuccess: b = null,
  navigate: w = null,
  children: d,
  ...v
}) => {
  const [u, m] = S(!1), [p, g] = S(null), { stack: y, visit: h } = Xe(), $ = C(() => w ?? ft("navigate"), [w]), F = {}, j = {};
  Object.keys(v).forEach((P) => {
    bt.includes(P) || (P.startsWith("on") && typeof v[P] == "function" ? P.toLowerCase() in window ? F[P] = v[P] : j[P] = v[P] : F[P] = v[P]);
  });
  const [_, A] = S(!1);
  M(() => {
    p && (p.onTopOfStack && _ ? f == null || f() : !p.onTopOfStack && !_ && (s == null || s()), A(!p.onTopOfStack));
  }, [y]);
  const U = Y(() => {
    i == null || i();
  }, [i]), B = Y(() => {
    g(null), a == null || a();
  }, [a]), X = Y(
    (P) => {
      P == null || P.preventDefault(), !u && (e.startsWith("#") || (m(!0), x == null || x()), h(
        e,
        t,
        n,
        l,
        Mn(Nt(v, bt)),
        () => U(y.length),
        B,
        o,
        $
      ).then((V) => {
        g(V), V.registerEventListenersFromProps(j), b == null || b();
      }).catch((V) => {
        console.error(V), c == null || c(V);
      }).finally(() => m(!1)));
    },
    [e, t, n, l, o, v, U, B]
  );
  return /* @__PURE__ */ T(
    r,
    {
      ...F,
      href: e,
      onClick: X,
      children: typeof d == "function" ? d({ loading: u }) : d
    }
  );
};
function Il() {
  return Xe().stack[It()] ?? null;
}
const Rl = (e) => (t) => (t.default.layout = (n) => Re(e, {}, n), t);
export {
  Dt as HeadlessModal,
  bl as Modal,
  kl as ModalLink,
  Cn as ModalRoot,
  Sn as ModalStackProvider,
  ft as getConfig,
  Fn as initFromPageProps,
  Fl as putConfig,
  Cl as renderApp,
  Sl as resetConfig,
  Rl as setPageLayout,
  Il as useModal,
  It as useModalIndex,
  Xe as useModalStack
};
