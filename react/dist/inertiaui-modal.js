var mn = Object.defineProperty;
var pn = (e, t, n) => t in e ? mn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var q = (e, t, n) => pn(e, typeof t != "symbol" ? t + "" : t, n);
import * as Oe from "react";
import E, { createContext as H, useContext as R, useEffect as M, useRef as T, useState as S, createElement as Re, useMemo as C, forwardRef as dt, useImperativeHandle as Ft, useLayoutEffect as hn, useCallback as Y, Fragment as G, isValidElement as vn, cloneElement as gn, useId as Me, useSyncExternalStore as wn, useReducer as xn, createRef as yn } from "react";
import { jsxs as se, Fragment as ft, jsx as O } from "react/jsx-runtime";
import De from "axios";
import { usePage as bn, router as Ee } from "@inertiajs/react";
import { mergeDataIntoQueryString as En } from "@inertiajs/core";
import { createPortal as $n } from "react-dom";
const xe = {
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
    this.config = JSON.parse(JSON.stringify(xe));
  }
  put(t, n) {
    if (typeof t == "object") {
      this.config = {
        type: t.type ?? xe.type,
        navigate: t.navigate ?? xe.navigate,
        modal: { ...xe.modal, ...t.modal ?? {} },
        slideover: { ...xe.slideover, ...t.slideover ?? {} }
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
const _e = new On(), Sl = () => _e.reset(), Fl = (e, t) => _e.put(e, t), mt = (e) => _e.get(e), ce = (e, t) => _e.get(e ? `slideover.${t}` : `modal.${t}`);
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
function Ct(e, t, n = !1) {
  return n && (t = t.map(fe)), Array.isArray(e) ? e.filter((r) => t.includes(n ? fe(r) : r)) : Object.keys(e).reduce((r, l) => (t.includes(n ? fe(l) : l) && (r[l] = e[l]), r), {});
}
function Mn(e) {
  return Array.isArray(e) ? e.filter((t) => t !== null) : Object.keys(e).reduce((t, n) => (n in e && e[n] !== null && (t[n] = e[n]), t), {});
}
function Ln(e, t = 3, n = 10) {
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
function ye(e) {
  return e ? (e = e.replace(/_/g, "-"), e = e.replace(/-+/g, "-"), /[A-Z]/.test(e) ? (e = e.replace(/\s+/g, "").replace(/_/g, "").replace(/(?:^|\s|-)+([A-Za-z])/g, (t, n) => n.toUpperCase()), e = e.replace(/(.)(?=[A-Z])/g, "$1-"), e.toLowerCase()) : e) : "";
}
const Be = H(null);
Be.displayName = "ModalStackContext";
let Nt = null, At = null, me = null, lt = null, tt = [], de = {};
const Sn = ({ children: e }) => {
  const [t, n] = S([]), [r, l] = S({}), i = (x) => {
    n((u) => {
      const f = x([...u]), m = (w) => {
        var b;
        return f.length < 2 ? !0 : ((b = f.map((h) => ({ id: h.id, shouldRender: h.shouldRender })).reverse().find((h) => h.shouldRender)) == null ? void 0 : b.id) === w;
      };
      return f.forEach((w, b) => {
        f[b].onTopOfStack = m(w.id), f[b].getParentModal = () => b < 1 ? null : f.slice(0, b).reverse().find((h) => h.isOpen), f[b].getChildModal = () => b === f.length - 1 ? null : f.slice(b + 1).find((h) => h.isOpen);
      }), f;
    });
  };
  M(() => {
    tt = t;
  }, [t]);
  class a {
    constructor(u, f, m, w, b) {
      q(this, "show", () => {
        i(
          (u) => u.map((f) => (f.id === this.id && !f.isOpen && (f.isOpen = !0, f.shouldRender = !0), f))
        );
      });
      q(this, "setOpen", (u) => {
        u ? this.show() : this.close();
      });
      q(this, "close", () => {
        i(
          (u) => u.map((f) => {
            var m;
            return f.id === this.id && f.isOpen && (Object.keys(f.listeners).forEach((w) => {
              f.off(w);
            }), f.isOpen = !1, (m = f.onCloseCallback) == null || m.call(f)), f;
          })
        );
      });
      q(this, "afterLeave", () => {
        this.isOpen || i((u) => {
          const f = u.map((m) => {
            var w;
            return m.id === this.id && !m.isOpen && (m.shouldRender = !1, (w = m.afterLeaveCallback) == null || w.call(m), m.afterLeaveCallback = null), m;
          });
          return this.index === 0 ? [] : f;
        });
      });
      q(this, "on", (u, f) => {
        u = ye(u), this.listeners[u] = this.listeners[u] ?? [], this.listeners[u].push(f);
      });
      q(this, "off", (u, f) => {
        var m;
        u = ye(u), f ? this.listeners[u] = ((m = this.listeners[u]) == null ? void 0 : m.filter((w) => w !== f)) ?? [] : delete this.listeners[u];
      });
      q(this, "emit", (u, ...f) => {
        var m;
        (m = this.listeners[ye(u)]) == null || m.forEach((w) => w(...f));
      });
      q(this, "registerEventListenersFromProps", (u) => {
        const f = [];
        return Object.keys(u).filter((m) => m.startsWith("on")).forEach((m) => {
          const w = ye(m).replace(/^on-/, "");
          this.on(w, u[m]), f.push(() => this.off(w, u[m]));
        }), () => f.forEach((m) => m());
      });
      q(this, "reload", (u = {}) => {
        var b;
        let f = Object.keys(this.response.props);
        if (u.only && (f = Ct(f, u.only)), u.except && (f = Pn(f, u.except)), !((b = this.response) != null && b.url))
          return;
        const m = (u.method ?? "get").toLowerCase(), w = u.data ?? {};
        De({
          url: this.response.url,
          method: m,
          data: m === "get" ? {} : w,
          params: m === "get" ? w : {},
          headers: {
            ...u.headers ?? {},
            Accept: "text/html, application/xhtml+xml",
            "X-Inertia": !0,
            "X-Inertia-Partial-Component": this.response.component,
            "X-Inertia-Version": this.response.version,
            "X-Inertia-Partial-Data": f.join(","),
            "X-InertiaUI-Modal": et(),
            "X-InertiaUI-Modal-Use-Router": 0,
            "X-InertiaUI-Modal-Base-Url": me
          }
        }).then((h) => {
          this.updateProps(h.data.props);
        });
      });
      q(this, "updateProps", (u) => {
        Object.assign(this.props, u), i((f) => f);
      });
      if (this.id = f.id ?? et(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = u, this.props = f.props, this.response = f, this.config = m ?? {}, this.onCloseCallback = w, this.afterLeaveCallback = b, de[this.id]) {
        this.config = {
          ...this.config,
          ...de[this.id].config ?? {}
        };
        const h = de[this.id].onClose, $ = de[this.id].onAfterLeave;
        h && (this.onCloseCallback = w ? () => {
          w(), h();
        } : h), $ && (this.afterLeaveCallback = b ? () => {
          b(), $();
        } : $), delete de[this.id];
      }
      this.index = -1, this.getParentModal = () => null, this.getChildModal = () => null, this.onTopOfStack = !0;
    }
    static generateId() {
      return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `inertiaui_modal_${crypto.randomUUID()}` : `inertiaui_modal_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
    }
  }
  const s = (x, u = {}, f = null, m = null) => At(x.component).then((w) => o(w, x, u, f, m)), o = (x, u, f, m, w) => {
    const b = new a(x, u, f, m, w);
    return b.index = t.length, i((h) => [...h, b]), b.show(), b;
  };
  function p(x, u, f, m) {
    if (!r[x])
      throw new Error(`The local modal "${x}" has not been registered.`);
    const w = o(null, {}, u, f, m);
    return w.name = x, r[x].callback(w), w;
  }
  const c = (x, u = {}) => v(
    x,
    u.method ?? "get",
    u.data ?? {},
    u.headers ?? {},
    u.config ?? {},
    u.onClose,
    u.onAfterLeave,
    u.queryStringArrayFormat ?? "brackets",
    u.navigate ?? mt("navigate")
  ).then((f) => {
    const m = u.listeners ?? {};
    return Object.keys(m).forEach((w) => {
      const b = ye(w);
      f.on(b, m[w]);
    }), f;
  }), v = (x, u, f = {}, m = {}, w = {}, b = null, h = null, $ = "brackets", F = !1) => {
    const j = et();
    return new Promise((_, A) => {
      if (x.startsWith("#")) {
        _(p(x.substring(1), w, b, h));
        return;
      }
      const [U, B] = En(u, x || "", f, $);
      let X = F && t.length === 0;
      if (t.length === 0 && (me = typeof window < "u" ? window.location.href : ""), m = {
        ...m,
        Accept: "text/html, application/xhtml+xml",
        "X-Requested-With": "XMLHttpRequest",
        "X-Inertia": !0,
        "X-Inertia-Version": Nt,
        "X-InertiaUI-Modal": j,
        "X-InertiaUI-Modal-Use-Router": X ? 1 : 0,
        "X-InertiaUI-Modal-Base-Url": me
      }, X)
        return lt = null, de[j] = {
          config: w,
          onClose: b,
          onAfterLeave: h
        }, Ee.visit(U, {
          method: u,
          data: B,
          headers: m,
          preserveScroll: !0,
          preserveState: !0,
          onError: A,
          onFinish: () => {
            Ln(() => lt).then(_);
          }
        });
      De({
        url: U,
        method: u,
        data: B,
        headers: m
      }).then((P) => _(s(P.data, w, b, h))).catch((P) => {
        A(P);
      });
    });
  }, d = {
    stack: t,
    localModals: r,
    push: o,
    pushFromResponseData: s,
    length: () => tt.length,
    closeAll: () => {
      tt.reverse().forEach((x) => x.close());
    },
    reset: () => i(() => []),
    visit: v,
    visitModal: c,
    registerLocalModal: (x, u) => {
      l((f) => ({
        ...f,
        [x]: { name: x, callback: u }
      }));
    },
    removeLocalModal: (x) => {
      l((u) => {
        const f = { ...u };
        return delete f[x], f;
      });
    }
  };
  return /* @__PURE__ */ O(Be.Provider, { value: d, children: e });
}, Xe = () => {
  const e = R(Be);
  if (e === null)
    throw new Error("useModalStack must be used within a ModalStackProvider");
  return e;
}, bt = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], Fn = (e) => {
  e.initialPage && (Nt = e.initialPage.version), e.resolveComponent && (At = e.resolveComponent);
}, Cl = (e, t) => (Fn(t), /* @__PURE__ */ O(Sn, { children: /* @__PURE__ */ O(e, { ...t, children: ({ Component: r, props: l, key: i }) => /* @__PURE__ */ se(ft, { children: [
  (() => {
    const s = Re(r, { key: i, ...l });
    return typeof r.layout == "function" ? r.layout(s) : Array.isArray(r.layout) ? r.layout.concat(s).reverse().reduce((p, c) => Re(c, l, p)) : s;
  })(),
  /* @__PURE__ */ O(Cn, {})
] }) }) })), Cn = ({ children: e }) => {
  var o, p;
  const t = R(Be), n = bn();
  let r = !1, l = !1, i = !!((o = n.props) != null && o._inertiaui_modal);
  M(() => Ee.on("start", () => r = !0), []), M(() => Ee.on("finish", () => r = !1), []), M(
    () => Ee.on("navigate", function(c) {
      const v = c.detail.page.props._inertiaui_modal;
      if (!v) {
        l && t.closeAll(), me = null, i = !1;
        return;
      }
      l = v, me = v.baseUrl, t.pushFromResponseData(v, {}, () => {
        if (!v.baseUrl) {
          console.error("No base url in modal response data so cannot navigate back");
          return;
        }
        !r && window.location.href !== v.baseUrl && Ee.visit(v.baseUrl, {
          preserveScroll: !0,
          preserveState: !0
        });
      }).then((y) => {
        lt = y;
      });
    }),
    []
  );
  const a = (c) => {
    var v;
    return c.headers["X-InertiaUI-Modal-Base-Url"] = me ?? (i ? (v = n.props._inertiaui_modal) == null ? void 0 : v.baseUrl : null), c;
  };
  M(() => (De.interceptors.request.use(a), () => De.interceptors.request.eject(a)), []);
  const s = T();
  return M(() => {
    var y, g;
    const c = (y = n.props) == null ? void 0 : y._inertiaui_modal, v = s.current;
    s.current = c, c && v && c.component === v.component && Tn(c.url, v.url) && ((g = t.stack[0]) == null || g.updateProps(c.props ?? {}));
  }, [(p = n.props) == null ? void 0 : p._inertiaui_modal]), /* @__PURE__ */ se(ft, { children: [
    e,
    t.stack.length > 0 && /* @__PURE__ */ O(It, { index: 0 })
  ] });
}, pt = E.createContext(null);
pt.displayName = "ModalIndexContext";
const kt = () => {
  const e = E.useContext(pt);
  if (e === void 0)
    throw new Error("useModalIndex must be used within a ModalIndexProvider");
  return e;
}, It = ({ index: e }) => {
  const { stack: t } = Xe(), n = C(() => t[e], [t, e]);
  return (n == null ? void 0 : n.component) && /* @__PURE__ */ O(pt.Provider, { value: e, children: /* @__PURE__ */ O(
    n.component,
    {
      ...n.props,
      onModalEvent: (...r) => n.emit(...r)
    }
  ) });
}, Rt = dt(({ name: e, children: t, onFocus: n = null, onBlur: r = null, onClose: l = null, onSuccess: i = null, ...a }, s) => {
  const o = kt(), { stack: p, registerLocalModal: c, removeLocalModal: v } = Xe(), [y, g] = S(null), d = C(() => e ? y : p[o], [e, y, o, p]), x = C(() => {
    var h;
    return (h = p.find(($) => $.shouldRender && $.index > (d == null ? void 0 : d.index))) == null ? void 0 : h.index;
  }, [o, p]), u = C(() => (d == null ? void 0 : d.config.slideover) ?? a.slideover ?? mt("type") === "slideover", [a.slideover]), f = C(
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
      return c(e, ($) => {
        h = $.registerEventListenersFromProps(a), g($);
      }), () => {
        h == null || h(), h = null, v(e);
      };
    }
    return d.registerEventListenersFromProps(a);
  }, [e]);
  const m = T(d);
  M(() => {
    m.current = d;
  }, [d]), M(() => {
    d !== null && (d.isOpen ? i == null || i() : l == null || l());
  }, [d == null ? void 0 : d.isOpen]);
  const [w, b] = S(!1);
  return M(() => {
    w && d !== null && d.isOpen && (d.onTopOfStack ? n == null || n() : r == null || r()), b(!0);
  }, [d == null ? void 0 : d.onTopOfStack]), Ft(
    s,
    () => ({
      afterLeave: () => {
        var h;
        return (h = m.current) == null ? void 0 : h.afterLeave();
      },
      close: () => {
        var h;
        return (h = m.current) == null ? void 0 : h.close();
      },
      emit: (...h) => {
        var $;
        return ($ = m.current) == null ? void 0 : $.emit(...h);
      },
      getChildModal: () => {
        var h;
        return (h = m.current) == null ? void 0 : h.getChildModal();
      },
      getParentModal: () => {
        var h;
        return (h = m.current) == null ? void 0 : h.getParentModal();
      },
      reload: (...h) => {
        var $;
        return ($ = m.current) == null ? void 0 : $.reload(...h);
      },
      setOpen: () => {
        var h;
        return (h = m.current) == null ? void 0 : h.setOpen();
      },
      get id() {
        var h;
        return (h = m.current) == null ? void 0 : h.id;
      },
      get index() {
        var h;
        return (h = m.current) == null ? void 0 : h.index;
      },
      get isOpen() {
        var h;
        return (h = m.current) == null ? void 0 : h.isOpen;
      },
      get config() {
        var h;
        return (h = m.current) == null ? void 0 : h.config;
      },
      get modalContext() {
        return m.current;
      },
      get onTopOfStack() {
        var h;
        return (h = m.current) == null ? void 0 : h.onTopOfStack;
      },
      get shouldRender() {
        var h;
        return (h = m.current) == null ? void 0 : h.shouldRender;
      }
    }),
    [d]
  ), (d == null ? void 0 : d.shouldRender) && /* @__PURE__ */ se(ft, { children: [
    typeof t == "function" ? t({
      afterLeave: d.afterLeave,
      close: d.close,
      config: f,
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
    x && /* @__PURE__ */ O(It, { index: x })
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
var Nn = Object.defineProperty, An = (e, t, n) => t in e ? Nn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, nt = (e, t, n) => (An(e, typeof t != "symbol" ? t + "" : t, n), n);
let kn = class {
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
let k = (e, t) => {
  ae.isServer ? M(e, t) : hn(e, t);
};
function ue(e) {
  let t = T(e);
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
function W() {
  let e = jn();
  return Y((t) => Dn({ mergeRefs: e, ...t }), [e]);
}
function Dn({ ourProps: e, theirProps: t, slot: n, defaultTag: r, features: l, visible: i = !0, name: a, mergeRefs: s }) {
  s = s ?? Un;
  let o = jt(t, e);
  if (i) return Ie(o, n, r, a, s);
  let p = l ?? 0;
  if (p & 2) {
    let { static: c = !1, ...v } = o;
    if (c) return Ie(v, n, r, a, s);
  }
  if (p & 1) {
    let { unmount: c = !0, ...v } = o;
    return ne(c ? 0 : 1, { 0() {
      return null;
    }, 1() {
      return Ie({ ...v, hidden: !0, style: { display: "none" } }, n, r, a, s);
    } });
  }
  return Ie(o, n, r, a, s);
}
function Ie(e, t = {}, n, r, l) {
  let { as: i = n, children: a, refName: s = "ref", ...o } = rt(e, ["unmount", "static"]), p = e.ref !== void 0 ? { [s]: e.ref } : {}, c = typeof a == "function" ? a(t) : a;
  "className" in o && o.className && typeof o.className == "function" && (o.className = o.className(t)), o["aria-labelledby"] && o["aria-labelledby"] === o.id && (o["aria-labelledby"] = void 0);
  let v = {};
  if (t) {
    let y = !1, g = [];
    for (let [d, x] of Object.entries(t)) typeof x == "boolean" && (y = !0), x === !0 && g.push(d.replace(/([A-Z])/g, (u) => `-${u.toLowerCase()}`));
    if (y) {
      v["data-headlessui-state"] = g.join(" ");
      for (let d of g) v[`data-${d}`] = "";
    }
  }
  if (i === G && (Object.keys(le(o)).length > 0 || Object.keys(le(v)).length > 0)) if (!vn(c) || Array.isArray(c) && c.length > 1) {
    if (Object.keys(le(o)).length > 0) throw new Error(['Passing props on "Fragment"!', "", `The current component <${r} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(le(o)).concat(Object.keys(le(v))).map((y) => `  - ${y}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((y) => `  - ${y}`).join(`
`)].join(`
`));
  } else {
    let y = c.props, g = y == null ? void 0 : y.className, d = typeof g == "function" ? (...f) => it(g(...f), o.className) : it(g, o.className), x = d ? { className: d } : {}, u = jt(c.props, le(rt(o, ["ref"])));
    for (let f in v) f in u && delete v[f];
    return gn(c, Object.assign({}, u, v, p, { ref: l(Hn(c), p.ref) }, x));
  }
  return Re(i, Object.assign({}, rt(o, ["ref"]), i !== G && p, i !== G && v), c);
}
function jn() {
  let e = T([]), t = Y((n) => {
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
function D(e) {
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
function Hn(e) {
  return E.version.split(".")[0] >= "19" ? e.props.ref : e.ref;
}
let Wn = "span";
var He = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(He || {});
function _n(e, t) {
  var n;
  let { features: r = 1, ...l } = e, i = { ref: t, "aria-hidden": (r & 2) === 2 ? !0 : (n = l["aria-hidden"]) != null ? n : void 0, hidden: (r & 4) === 4 ? !0 : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(r & 4) === 4 && (r & 2) !== 2 && { display: "none" } } };
  return W()({ ourProps: i, theirProps: l, slot: {}, defaultTag: Wn, name: "Hidden" });
}
let ot = D(_n), Ut = Symbol();
function Bn(e, t = !0) {
  return Object.assign(e, { [Ut]: t });
}
function Z(...e) {
  let t = T(e);
  M(() => {
    t.current = e;
  }, [e]);
  let n = L((r) => {
    for (let l of t.current) l != null && (typeof l == "function" ? l(r) : l.current = r);
  });
  return e.every((r) => r == null || (r == null ? void 0 : r[Ut])) ? void 0 : n;
}
let vt = H(null);
vt.displayName = "DescriptionContext";
function Ht() {
  let e = R(vt);
  if (e === null) {
    let t = new Error("You used a <Description /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(t, Ht), t;
  }
  return e;
}
function Xn() {
  let [e, t] = S([]);
  return [e.length > 0 ? e.join(" ") : void 0, C(() => function(n) {
    let r = L((i) => (t((a) => [...a, i]), () => t((a) => {
      let s = a.slice(), o = s.indexOf(i);
      return o !== -1 && s.splice(o, 1), s;
    }))), l = C(() => ({ register: r, slot: n.slot, name: n.name, props: n.props, value: n.value }), [r, n.slot, n.name, n.props, n.value]);
    return E.createElement(vt.Provider, { value: l }, n.children);
  }, [t])];
}
let Vn = "p";
function qn(e, t) {
  let n = Me(), r = Rn(), { id: l = `headlessui-description-${n}`, ...i } = e, a = Ht(), s = Z(t);
  k(() => a.register(l), [l, a.register]);
  let o = r || !1, p = C(() => ({ ...a.slot, disabled: o }), [a.slot, o]), c = { ref: s, ...a.props, id: l };
  return W()({ ourProps: c, theirProps: i, slot: p, defaultTag: Vn, name: a.name || "Description" });
}
let Yn = D(qn), zn = Object.assign(Yn, {});
var Wt = ((e) => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(Wt || {});
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
let Jn = new Zn(() => _t(() => [], { ADD(e) {
  return this.includes(e) ? this : [...this, e];
}, REMOVE(e) {
  let t = this.indexOf(e);
  if (t === -1) return this;
  let n = this.slice();
  return n.splice(t, 1), n;
} }));
function pe(e, t) {
  let n = Jn.get(t), r = Me(), l = Bt(n);
  if (k(() => {
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
function Qn(e, { allowed: t, disallowed: n } = {}) {
  let r = pe(e, "inert-others");
  k(() => {
    var l, i;
    if (!r) return;
    let a = re();
    for (let o of (l = n == null ? void 0 : n()) != null ? l : []) o && a.add(Et(o));
    let s = (i = t == null ? void 0 : t()) != null ? i : [];
    for (let o of s) {
      if (!o) continue;
      let p = Ve(o);
      if (!p) continue;
      let c = o.parentElement;
      for (; c && c !== p.body; ) {
        for (let v of c.children) s.some((y) => v.contains(y)) || a.add(Et(v));
        c = c.parentElement;
      }
    }
    return a.dispose;
  }, [r, t, n]);
}
function er(e, t, n) {
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
let We = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e) => `${e}:not([tabindex='-1'])`).join(","), tr = ["[data-autofocus]"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var J = ((e) => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e[e.AutoFocus = 64] = "AutoFocus", e))(J || {}), st = ((e) => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(st || {}), nr = ((e) => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(nr || {});
function rr(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(We)).sort((t, n) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (n.tabIndex || Number.MAX_SAFE_INTEGER)));
}
function lr(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(tr)).sort((t, n) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (n.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var Xt = ((e) => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(Xt || {});
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
    let l = t(n), i = t(r);
    if (l === null || i === null) return 0;
    let a = l.compareDocumentPosition(i);
    return a & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : a & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function Pe(e, t, { sorted: n = !0, relativeTo: r = null, skipElements: l = [] } = {}) {
  let i = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : document : e.ownerDocument, a = Array.isArray(e) ? n ? ur(e) : e : t & 64 ? lr(e) : rr(e);
  l.length > 0 && a.length > 1 && (a = a.filter((g) => !l.some((d) => d != null && "current" in d ? (d == null ? void 0 : d.current) === g : d === g))), r = r ?? i.activeElement;
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
  })(), p = t & 32 ? { preventScroll: !0 } : {}, c = 0, v = a.length, y;
  do {
    if (c >= v || c + v <= 0) return 0;
    let g = o + c;
    if (t & 16) g = (g + v) % v;
    else {
      if (g < 0) return 3;
      if (g >= v) return 1;
    }
    y = a[g], y == null || y.focus(p), c += s;
  } while (y !== i.activeElement);
  return t & 6 && sr(y) && y.select(), 2;
}
function Vt() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function cr() {
  return /Android/gi.test(window.navigator.userAgent);
}
function dr() {
  return Vt() || cr();
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
function fr(e, t, n) {
  let r = pe(e, "outside-click"), l = ue(n), i = Y(function(o, p) {
    if (o.defaultPrevented) return;
    let c = p(o);
    if (c === null || !c.getRootNode().contains(c) || !c.isConnected) return;
    let v = function y(g) {
      return typeof g == "function" ? y(g()) : Array.isArray(g) || g instanceof Set ? g : [g];
    }(t);
    for (let y of v) if (y !== null && (y.contains(c) || o.composed && o.composedPath().includes(y))) return;
    return !ir(c, Xt.Loose) && c.tabIndex !== -1 && o.preventDefault(), l.current(o, c);
  }, [l, t]), a = T(null);
  be(r, "pointerdown", (o) => {
    var p, c;
    a.current = ((c = (p = o.composedPath) == null ? void 0 : p.call(o)) == null ? void 0 : c[0]) || o.target;
  }, !0), be(r, "mousedown", (o) => {
    var p, c;
    a.current = ((c = (p = o.composedPath) == null ? void 0 : p.call(o)) == null ? void 0 : c[0]) || o.target;
  }, !0), be(r, "click", (o) => {
    dr() || a.current && (i(o, () => a.current), a.current = null);
  }, !0);
  let s = T({ x: 0, y: 0 });
  be(r, "touchstart", (o) => {
    s.current.x = o.touches[0].clientX, s.current.y = o.touches[0].clientY;
  }, !0), be(r, "touchend", (o) => {
    let p = { x: o.changedTouches[0].clientX, y: o.changedTouches[0].clientY };
    if (!(Math.abs(p.x - s.current.x) >= Ot || Math.abs(p.y - s.current.y) >= Ot)) return i(o, () => o.target instanceof HTMLElement ? o.target : null);
  }, !0), qt(r, "blur", (o) => i(o, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), !0);
}
function Le(...e) {
  return C(() => Ve(...e), [...e]);
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
function mr() {
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
function pr() {
  return Vt() ? { before({ doc: e, d: t, meta: n }) {
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
          let { hash: p } = new URL(o.href), c = e.querySelector(p);
          c && !r(c) && (a = c);
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
let oe = _t(() => /* @__PURE__ */ new Map(), { PUSH(e, t) {
  var n;
  let r = (n = this.get(e)) != null ? n : { doc: e, count: 0, d: re(), meta: /* @__PURE__ */ new Set() };
  return r.count++, r.meta.add(t), this.set(e, r), this;
}, POP(e, t) {
  let n = this.get(e);
  return n && (n.count--, n.meta.delete(t)), this;
}, SCROLL_PREVENT({ doc: e, d: t, meta: n }) {
  let r = { doc: e, d: t, meta: vr(n) }, l = [pr(), mr(), hr()];
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
function gr(e, t, n = () => ({ containers: [] })) {
  let r = Bt(oe), l = t ? r.get(t) : void 0, i = l ? l.count > 0 : !1;
  return k(() => {
    if (!(!t || !e)) return oe.dispatch("PUSH", t, n), () => oe.dispatch("POP", t, n);
  }, [e, t]), i;
}
function wr(e, t, n = () => [document.body]) {
  let r = pe(e, "scroll-lock");
  gr(r, t, (l) => {
    var i;
    return { containers: [...(i = l.containers) != null ? i : [], n] };
  });
}
function xr(e = 0) {
  let [t, n] = S(e), r = Y((o) => n(o), [t]), l = Y((o) => n((p) => p | o), [t]), i = Y((o) => (t & o) === o, [t]), a = Y((o) => n((p) => p & ~o), [n]), s = Y((o) => n((p) => p ^ o), [n]);
  return { flags: t, setFlag: r, addFlag: l, hasFlag: i, removeFlag: a, toggleFlag: s };
}
var Tt, Pt;
typeof process < "u" && typeof globalThis < "u" && typeof Element < "u" && ((Tt = process == null ? void 0 : process.env) == null ? void 0 : Tt.NODE_ENV) === "test" && typeof ((Pt = Element == null ? void 0 : Element.prototype) == null ? void 0 : Pt.getAnimations) > "u" && (Element.prototype.getAnimations = function() {
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
  let [l, i] = S(n), { hasFlag: a, addFlag: s, removeFlag: o } = xr(e && l ? 3 : 0), p = T(!1), c = T(!1), v = ht();
  return k(() => {
    var y;
    if (e) {
      if (n && i(!0), !t) {
        n && s(3);
        return;
      }
      return (y = r == null ? void 0 : r.start) == null || y.call(r, n), $r(t, { inFlight: p, prepare() {
        c.current ? c.current = !1 : c.current = p.current, p.current = !0, !c.current && (n ? (s(3), o(4)) : (s(4), o(2)));
      }, run() {
        c.current ? n ? (o(3), s(4)) : (o(4), s(3)) : n ? o(1) : s(1);
      }, done() {
        var g;
        c.current && typeof t.getAnimations == "function" && t.getAnimations().length > 0 || (p.current = !1, o(7), n || i(!1), (g = r == null ? void 0 : r.end) == null || g.call(r, n));
      } });
    }
  }, [e, n, t, v]), e ? [l, { closed: a(1), enter: a(2), leave: a(4), transition: a(2) || a(4) }] : [n, { closed: void 0, enter: void 0, leave: void 0, transition: void 0 }];
}
function $r(e, { prepare: t, run: n, done: r, inFlight: l }) {
  let i = re();
  return Tr(e, { prepare: t, inFlight: l }), i.nextFrame(() => {
    n(), i.requestAnimationFrame(() => {
      i.add(Or(e, r));
    });
  }), i.dispose;
}
function Or(e, t) {
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
function Tr(e, { inFlight: t, prepare: n }) {
  if (t != null && t.current) {
    n();
    return;
  }
  let r = e.style.transition;
  e.style.transition = "none", n(), e.offsetHeight, e.style.transition = r;
}
function gt(e, t) {
  let n = T([]), r = L(e);
  M(() => {
    let l = [...n.current];
    for (let [i, a] of t.entries()) if (n.current[i] !== a) {
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
function zt(e) {
  let t = L(e), n = T(!1);
  M(() => (n.current = !1, () => {
    n.current = !0, qe(() => {
      n.current && t();
    });
  }), [t]);
}
function Sr() {
  let e = typeof document > "u";
  return "useSyncExternalStore" in Oe ? ((t) => t.useSyncExternalStore)(Oe)(() => () => {
  }, () => !1, () => !e) : !1;
}
function Se() {
  let e = Sr(), [t, n] = Oe.useState(ae.isHandoffComplete);
  return t && ae.isHandoffComplete === !1 && n(!1), Oe.useEffect(() => {
    t !== !0 && n(!0);
  }, [t]), Oe.useEffect(() => ae.handoff(), []), e ? !1 : t;
}
let Gt = H(!1);
function Fr() {
  return R(Gt);
}
function Mt(e) {
  return E.createElement(Gt.Provider, { value: e.force }, e.children);
}
function Cr(e) {
  let t = Fr(), n = R(Zt), r = Le(e), [l, i] = S(() => {
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
let Kt = G, Nr = D(function(e, t) {
  let n = e, r = T(null), l = Z(Bn((v) => {
    r.current = v;
  }), t), i = Le(r), a = Cr(r), [s] = S(() => {
    var v;
    return ae.isServer ? null : (v = i == null ? void 0 : i.createElement("div")) != null ? v : null;
  }), o = R(ut), p = Se();
  k(() => {
    !a || !s || a.contains(s) || (s.setAttribute("data-headlessui-portal", ""), a.appendChild(s));
  }, [a, s]), k(() => {
    if (s && o) return o.register(s);
  }, [o, s]), zt(() => {
    var v;
    !a || !s || (s instanceof Node && a.contains(s) && a.removeChild(s), a.childNodes.length <= 0 && ((v = a.parentElement) == null || v.removeChild(a)));
  });
  let c = W();
  return p ? !a || !s ? null : $n(c({ ourProps: { ref: l }, theirProps: n, slot: {}, defaultTag: Kt, name: "Portal" }), s) : null;
});
function Ar(e, t) {
  let n = Z(t), { enabled: r = !0, ...l } = e, i = W();
  return r ? E.createElement(Nr, { ...l, ref: n }) : i({ ourProps: { ref: n }, theirProps: l, slot: {}, defaultTag: Kt, name: "Portal" });
}
let kr = G, Zt = H(null);
function Ir(e, t) {
  let { target: n, ...r } = e, l = { ref: Z(t) }, i = W();
  return E.createElement(Zt.Provider, { value: n }, i({ ourProps: l, theirProps: r, defaultTag: kr, name: "Popover.Group" }));
}
let ut = H(null);
function Rr() {
  let e = R(ut), t = T([]), n = L((i) => (t.current.push(i), e && e.register(i), () => r(i))), r = L((i) => {
    let a = t.current.indexOf(i);
    a !== -1 && t.current.splice(a, 1), e && e.unregister(i);
  }), l = C(() => ({ register: n, unregister: r, portals: t }), [n, r, t]);
  return [t, C(() => function({ children: i }) {
    return E.createElement(ut.Provider, { value: l }, i);
  }, [l])];
}
let Dr = D(Ar), Jt = D(Ir), jr = Object.assign(Dr, { Group: Jt });
function Ur(e, t = typeof document < "u" ? document.defaultView : null, n) {
  let r = pe(e, "escape");
  Yt(t, "keydown", (l) => {
    r && (l.defaultPrevented || l.key === Wt.Escape && n(l));
  });
}
function Hr() {
  var e;
  let [t] = S(() => typeof window < "u" && typeof window.matchMedia == "function" ? window.matchMedia("(pointer: coarse)") : null), [n, r] = S((e = t == null ? void 0 : t.matches) != null ? e : !1);
  return k(() => {
    if (!t) return;
    function l(i) {
      r(i.matches);
    }
    return t.addEventListener("change", l), () => t.removeEventListener("change", l);
  }, [t]), n;
}
function Wr({ defaultContainers: e = [], portals: t, mainTreeNode: n } = {}) {
  let r = Le(n), l = L(() => {
    var i, a;
    let s = [];
    for (let o of e) o !== null && (o instanceof HTMLElement ? s.push(o) : "current" in o && o.current instanceof HTMLElement && s.push(o.current));
    if (t != null && t.current) for (let o of t.current) s.push(o);
    for (let o of (i = r == null ? void 0 : r.querySelectorAll("html > *, body > *")) != null ? i : []) o !== document.body && o !== document.head && o instanceof HTMLElement && o.id !== "headlessui-portal-root" && (n && (o.contains(n) || o.contains((a = n == null ? void 0 : n.getRootNode()) == null ? void 0 : a.host)) || s.some((p) => o.contains(p)) || s.push(o));
    return s;
  });
  return { resolveContainers: l, contains: L((i) => l().some((a) => a.contains(i))) };
}
let Qt = H(null);
function Lt({ children: e, node: t }) {
  let [n, r] = S(null), l = en(t ?? n);
  return E.createElement(Qt.Provider, { value: l }, e, l === null && E.createElement(ot, { features: He.Hidden, ref: (i) => {
    var a, s;
    if (i) {
      for (let o of (s = (a = Ve(i)) == null ? void 0 : a.querySelectorAll("html > *, body > *")) != null ? s : []) if (o !== document.body && o !== document.head && o instanceof HTMLElement && o != null && o.contains(i)) {
        r(o);
        break;
      }
    }
  } }));
}
function en(e = null) {
  var t;
  return (t = R(Qt)) != null ? t : e;
}
function wt() {
  let e = T(!1);
  return k(() => (e.current = !0, () => {
    e.current = !1;
  }), []), e;
}
var $e = ((e) => (e[e.Forwards = 0] = "Forwards", e[e.Backwards = 1] = "Backwards", e))($e || {});
function _r() {
  let e = T(0);
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
let Br = "div";
var ie = ((e) => (e[e.None = 0] = "None", e[e.InitialFocus = 1] = "InitialFocus", e[e.TabLock = 2] = "TabLock", e[e.FocusLock = 4] = "FocusLock", e[e.RestoreFocus = 8] = "RestoreFocus", e[e.AutoFocus = 16] = "AutoFocus", e))(ie || {});
function Xr(e, t) {
  let n = T(null), r = Z(n, t), { initialFocus: l, initialFocusFallback: i, containers: a, features: s = 15, ...o } = e;
  Se() || (s = 0);
  let p = Le(n);
  zr(s, { ownerDocument: p });
  let c = Gr(s, { ownerDocument: p, container: n, initialFocus: l, initialFocusFallback: i });
  Kr(s, { ownerDocument: p, container: n, containers: a, previousActiveElement: c });
  let v = _r(), y = L((m) => {
    let w = n.current;
    w && ((b) => b())(() => {
      ne(v.current, { [$e.Forwards]: () => {
        Pe(w, J.First, { skipElements: [m.relatedTarget, i] });
      }, [$e.Backwards]: () => {
        Pe(w, J.Last, { skipElements: [m.relatedTarget, i] });
      } });
    });
  }), g = pe(!!(s & 2), "focus-trap#tab-lock"), d = ht(), x = T(!1), u = { ref: r, onKeyDown(m) {
    m.key == "Tab" && (x.current = !0, d.requestAnimationFrame(() => {
      x.current = !1;
    }));
  }, onBlur(m) {
    if (!(s & 4)) return;
    let w = tn(a);
    n.current instanceof HTMLElement && w.add(n.current);
    let b = m.relatedTarget;
    b instanceof HTMLElement && b.dataset.headlessuiFocusGuard !== "true" && (nn(w, b) || (x.current ? Pe(n.current, ne(v.current, { [$e.Forwards]: () => J.Next, [$e.Backwards]: () => J.Previous }) | J.WrapAround, { relativeTo: m.target }) : m.target instanceof HTMLElement && Q(m.target)));
  } }, f = W();
  return E.createElement(E.Fragment, null, g && E.createElement(ot, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: y, features: He.Focusable }), f({ ourProps: u, theirProps: o, defaultTag: Br, name: "FocusTrap" }), g && E.createElement(ot, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: y, features: He.Focusable }));
}
let Vr = D(Xr), qr = Object.assign(Vr, { features: ie });
function Yr(e = !0) {
  let t = T(ee.slice());
  return gt(([n], [r]) => {
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
  gt(() => {
    n || (t == null ? void 0 : t.activeElement) === (t == null ? void 0 : t.body) && Q(r());
  }, [n]), zt(() => {
    n && Q(r());
  });
}
function Gr(e, { ownerDocument: t, container: n, initialFocus: r, initialFocusFallback: l }) {
  let i = T(null), a = pe(!!(e & 1), "focus-trap#initial-focus"), s = wt();
  return gt(() => {
    if (e === 0) return;
    if (!a) {
      l != null && l.current && Q(l.current);
      return;
    }
    let o = n.current;
    o && qe(() => {
      if (!s.current) return;
      let p = t == null ? void 0 : t.activeElement;
      if (r != null && r.current) {
        if ((r == null ? void 0 : r.current) === p) {
          i.current = p;
          return;
        }
      } else if (o.contains(p)) {
        i.current = p;
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
function Kr(e, { ownerDocument: t, container: n, containers: r, previousActiveElement: l }) {
  let i = wt(), a = !!(e & 4);
  Yt(t == null ? void 0 : t.defaultView, "focus", (s) => {
    if (!a || !i.current) return;
    let o = tn(r);
    n.current instanceof HTMLElement && o.add(n.current);
    let p = l.current;
    if (!p) return;
    let c = s.target;
    c && c instanceof HTMLElement ? nn(o, c) ? (l.current = c, Q(c)) : (s.preventDefault(), s.stopPropagation(), Q(p)) : Q(l.current);
  }, !0);
}
function nn(e, t) {
  for (let n of e) if (n.contains(t)) return !0;
  return !1;
}
function rn(e) {
  var t;
  return !!(e.enter || e.enterFrom || e.enterTo || e.leave || e.leaveFrom || e.leaveTo) || ((t = e.as) != null ? t : on) !== G || E.Children.count(e.children) === 1;
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
function ln(e, t) {
  let n = ue(e), r = T([]), l = wt(), i = ht(), a = L((g, d = te.Hidden) => {
    let x = r.current.findIndex(({ el: u }) => u === g);
    x !== -1 && (ne(d, { [te.Unmount]() {
      r.current.splice(x, 1);
    }, [te.Hidden]() {
      r.current[x].state = "hidden";
    } }), i.microTask(() => {
      var u;
      !Ze(r) && l.current && ((u = n.current) == null || u.call(n));
    }));
  }), s = L((g) => {
    let d = r.current.find(({ el: x }) => x === g);
    return d ? d.state !== "visible" && (d.state = "visible") : r.current.push({ el: g, state: "visible" }), () => a(g, te.Unmount);
  }), o = T([]), p = T(Promise.resolve()), c = T({ enter: [], leave: [] }), v = L((g, d, x) => {
    o.current.splice(0), t && (t.chains.current[d] = t.chains.current[d].filter(([u]) => u !== g)), t == null || t.chains.current[d].push([g, new Promise((u) => {
      o.current.push(u);
    })]), t == null || t.chains.current[d].push([g, new Promise((u) => {
      Promise.all(c.current[d].map(([f, m]) => m)).then(() => u());
    })]), d === "enter" ? p.current = p.current.then(() => t == null ? void 0 : t.wait.current).then(() => x(d)) : x(d);
  }), y = L((g, d, x) => {
    Promise.all(c.current[d].splice(0).map(([u, f]) => f)).then(() => {
      var u;
      (u = o.current.shift()) == null || u();
    }).then(() => x(d));
  });
  return C(() => ({ children: r, register: s, unregister: a, onStart: v, onStop: y, wait: p, chains: c }), [s, a, r, v, y, c, p]);
}
let on = G, an = Ue.RenderStrategy;
function el(e, t) {
  var n, r;
  let { transition: l = !0, beforeEnter: i, afterEnter: a, beforeLeave: s, afterLeave: o, enter: p, enterFrom: c, enterTo: v, entered: y, leave: g, leaveFrom: d, leaveTo: x, ...u } = e, [f, m] = S(null), w = T(null), b = rn(e), h = Z(...b ? [w, t, m] : t === null ? [] : [t]), $ = (n = u.unmount) == null || n ? te.Unmount : te.Hidden, { show: F, appear: j, initial: _ } = Jr(), [A, U] = S(F ? "visible" : "hidden"), B = Qr(), { register: X, unregister: P } = B;
  k(() => X(w), [X, w]), k(() => {
    if ($ === te.Hidden && w.current) {
      if (F && A !== "visible") {
        U("visible");
        return;
      }
      return ne(A, { hidden: () => P(w), visible: () => X(w) });
    }
  }, [A, w, X, P, F, $]);
  let V = Se();
  k(() => {
    if (b && V && A === "visible" && w.current === null) throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
  }, [w, A, V, b]);
  let Fe = _ && !j, Ce = j && F && _, ve = T(!1), K = ln(() => {
    ve.current || (U("hidden"), P(w));
  }, B), Ne = L((Qe) => {
    ve.current = !0;
    let ke = Qe ? "enter" : "leave";
    K.onStart(w, ke, (we) => {
      we === "enter" ? i == null || i() : we === "leave" && (s == null || s());
    });
  }), N = L((Qe) => {
    let ke = Qe ? "enter" : "leave";
    ve.current = !1, K.onStop(w, ke, (we) => {
      we === "enter" ? a == null || a() : we === "leave" && (o == null || o());
    }), ke === "leave" && !Ze(K) && (U("hidden"), P(w));
  });
  M(() => {
    b && l || (Ne(F), N(F));
  }, [F, b, l]);
  let Ae = !(!l || !b || !V || Fe), [, I] = Er(Ae, f, F, { start: Ne, end: N }), dn = le({ ref: h, className: ((r = it(u.className, Ce && p, Ce && c, I.enter && p, I.enter && I.closed && c, I.enter && !I.closed && v, I.leave && g, I.leave && !I.closed && d, I.leave && I.closed && x, !I.transition && F && y)) == null ? void 0 : r.trim()) || void 0, ...br(I) }), ge = 0;
  A === "visible" && (ge |= z.Open), A === "hidden" && (ge |= z.Closed), I.enter && (ge |= z.Opening), I.leave && (ge |= z.Closing);
  let fn = W();
  return E.createElement(Ke.Provider, { value: K }, E.createElement(Pr, { value: ge }, fn({ ourProps: dn, theirProps: u, defaultTag: on, features: an, visible: A === "visible", name: "Transition.Child" })));
}
function tl(e, t) {
  let { show: n, appear: r = !1, unmount: l = !0, ...i } = e, a = T(null), s = rn(e), o = Z(...s ? [a, t] : t === null ? [] : [t]);
  Se();
  let p = ze();
  if (n === void 0 && p !== null && (n = (p & z.Open) === z.Open), n === void 0) throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
  let [c, v] = S(n ? "visible" : "hidden"), y = ln(() => {
    n || v("hidden");
  }), [g, d] = S(!0), x = T([n]);
  k(() => {
    g !== !1 && x.current[x.current.length - 1] !== n && (x.current.push(n), d(!1));
  }, [x, n]);
  let u = C(() => ({ show: n, appear: r, initial: g }), [n, r, g]);
  k(() => {
    n ? v("visible") : !Ze(y) && a.current !== null && v("hidden");
  }, [n, y]);
  let f = { unmount: l }, m = L(() => {
    var h;
    g && d(!1), (h = e.beforeEnter) == null || h.call(e);
  }), w = L(() => {
    var h;
    g && d(!1), (h = e.beforeLeave) == null || h.call(e);
  }), b = W();
  return E.createElement(Ke.Provider, { value: y }, E.createElement(Ge.Provider, { value: u }, b({ ourProps: { ...f, as: G, children: E.createElement(sn, { ref: o, ...f, ...i, beforeEnter: m, beforeLeave: w }) }, theirProps: {}, defaultTag: G, features: an, visible: c === "visible", name: "Transition" })));
}
function nl(e, t) {
  let n = R(Ge) !== null, r = ze() !== null;
  return E.createElement(E.Fragment, null, !n && r ? E.createElement(ct, { ref: t, ...e }) : E.createElement(sn, { ref: t, ...e }));
}
let ct = D(tl), sn = D(el), he = D(nl), un = Object.assign(ct, { Child: he, Root: ct });
var rl = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(rl || {}), ll = ((e) => (e[e.SetTitleId = 0] = "SetTitleId", e))(ll || {});
let il = { 0(e, t) {
  return e.titleId === t.id ? e : { ...e, titleId: t.id };
} }, xt = H(null);
xt.displayName = "DialogContext";
function Je(e) {
  let t = R(xt);
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
  let n = Me(), { id: r = `headlessui-dialog-${n}`, open: l, onClose: i, initialFocus: a, role: s = "dialog", autoFocus: o = !0, __demoMode: p = !1, unmount: c = !1, ...v } = e, y = T(!1);
  s = function() {
    return s === "dialog" || s === "alertdialog" ? s : (y.current || (y.current = !0, console.warn(`Invalid role [${s}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog");
  }();
  let g = ze();
  l === void 0 && g !== null && (l = (g & z.Open) === z.Open);
  let d = T(null), x = Z(d, t), u = Le(d), f = l ? 0 : 1, [m, w] = xn(ol, { titleId: null, descriptionId: null, panelRef: yn() }), b = L(() => i(!1)), h = L((N) => w({ type: 0, id: N })), $ = Se() ? f === 0 : !1, [F, j] = Rr(), _ = { get current() {
    var N;
    return (N = m.panelRef.current) != null ? N : d.current;
  } }, A = en(), { resolveContainers: U } = Wr({ mainTreeNode: A, portals: F, defaultContainers: [_] }), B = g !== null ? (g & z.Closing) === z.Closing : !1;
  Qn(p || B ? !1 : $, { allowed: L(() => {
    var N, Ae;
    return [(Ae = (N = d.current) == null ? void 0 : N.closest("[data-headlessui-portal]")) != null ? Ae : null];
  }), disallowed: L(() => {
    var N;
    return [(N = A == null ? void 0 : A.closest("body > *:not(#headlessui-portal-root)")) != null ? N : null];
  }) }), fr($, U, (N) => {
    N.preventDefault(), b();
  }), Ur($, u == null ? void 0 : u.defaultView, (N) => {
    N.preventDefault(), N.stopPropagation(), document.activeElement && "blur" in document.activeElement && typeof document.activeElement.blur == "function" && document.activeElement.blur(), b();
  }), wr(p || B ? !1 : $, u, U), er($, d, b);
  let [X, P] = Xn(), V = C(() => [{ dialogState: f, close: b, setTitleId: h, unmount: c }, m], [f, m, b, h, c]), Fe = C(() => ({ open: f === 0 }), [f]), Ce = { ref: x, id: r, role: s, tabIndex: -1, "aria-modal": p ? void 0 : f === 0 ? !0 : void 0, "aria-labelledby": m.titleId, "aria-describedby": X, unmount: c }, ve = !Hr(), K = ie.None;
  $ && !p && (K |= ie.RestoreFocus, K |= ie.TabLock, o && (K |= ie.AutoFocus), ve && (K |= ie.InitialFocus));
  let Ne = W();
  return E.createElement(Mr, null, E.createElement(Mt, { force: !0 }, E.createElement(jr, null, E.createElement(xt.Provider, { value: V }, E.createElement(Jt, { target: d }, E.createElement(Mt, { force: !1 }, E.createElement(P, { slot: Fe }, E.createElement(j, null, E.createElement(qr, { initialFocus: a, initialFocusFallback: d, containers: U, features: K }, E.createElement(Kn, { value: b }, Ne({ ourProps: Ce, theirProps: v, slot: Fe, defaultTag: al, features: sl, visible: f === 0, name: "Dialog" })))))))))));
}), al = "div", sl = Ue.RenderStrategy | Ue.Static;
function ul(e, t) {
  let { transition: n = !1, open: r, ...l } = e, i = ze(), a = e.hasOwnProperty("open") || i !== null, s = e.hasOwnProperty("onClose");
  if (!a && !s) throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");
  if (!a) throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");
  if (!s) throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");
  if (!i && typeof e.open != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${e.open}`);
  if (typeof e.onClose != "function") throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${e.onClose}`);
  return (r !== void 0 || n) && !l.static ? E.createElement(Lt, null, E.createElement(un, { show: r, transition: n, unmount: l.unmount }, E.createElement(St, { ref: t, ...l }))) : E.createElement(Lt, null, E.createElement(St, { ref: t, open: r, ...l }));
}
let cl = "div";
function dl(e, t) {
  let n = Me(), { id: r = `headlessui-dialog-panel-${n}`, transition: l = !1, ...i } = e, [{ dialogState: a, unmount: s }, o] = Je("Dialog.Panel"), p = Z(t, o.panelRef), c = C(() => ({ open: a === 0 }), [a]), v = L((u) => {
    u.stopPropagation();
  }), y = { ref: p, id: r, onClick: v }, g = l ? he : G, d = l ? { unmount: s } : {}, x = W();
  return E.createElement(g, { ...d }, x({ ourProps: y, theirProps: i, slot: c, defaultTag: cl, name: "Dialog.Panel" }));
}
let fl = "div";
function ml(e, t) {
  let { transition: n = !1, ...r } = e, [{ dialogState: l, unmount: i }] = Je("Dialog.Backdrop"), a = C(() => ({ open: l === 0 }), [l]), s = { ref: t, "aria-hidden": !0 }, o = n ? he : G, p = n ? { unmount: i } : {}, c = W();
  return E.createElement(o, { ...p }, c({ ourProps: s, theirProps: r, slot: a, defaultTag: fl, name: "Dialog.Backdrop" }));
}
let pl = "h2";
function hl(e, t) {
  let n = Me(), { id: r = `headlessui-dialog-title-${n}`, ...l } = e, [{ dialogState: i, setTitleId: a }] = Je("Dialog.Title"), s = Z(t);
  M(() => (a(r), () => a(null)), [r, a]);
  let o = C(() => ({ open: i === 0 }), [i]), p = { ref: s, id: r };
  return W()({ ourProps: p, theirProps: l, slot: o, defaultTag: pl, name: "Dialog.Title" });
}
let vl = D(ul), yt = D(dl);
D(ml);
let gl = D(hl), wl = Object.assign(vl, { Panel: yt, Title: gl, Description: zn });
function cn({ onClick: e }) {
  return /* @__PURE__ */ se(
    "button",
    {
      type: "button",
      className: "im-close-button text-gray-400 hover:text-gray-500",
      onClick: e,
      children: [
        /* @__PURE__ */ O("span", { className: "sr-only", children: "Close" }),
        /* @__PURE__ */ O(
          "svg",
          {
            className: "size-6",
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: "2",
            stroke: "currentColor",
            "aria-hidden": "true",
            children: /* @__PURE__ */ O(
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
  return /* @__PURE__ */ O("div", { className: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4", children: /* @__PURE__ */ O(
    "div",
    {
      className: je("im-modal-positioner flex min-h-full justify-center", {
        "items-start": t.position === "top",
        "items-center": t.position === "center",
        "items-end": t.position === "bottom"
      }),
      children: /* @__PURE__ */ O(
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
            yt,
            {
              className: `im-modal-content relative ${t.paddingClasses} ${t.panelClasses}`,
              "data-inertiaui-modal-entered": r,
              children: [
                t.closeButton && /* @__PURE__ */ O("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ O(cn, { onClick: e.close }) }),
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
  return /* @__PURE__ */ O("div", { className: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ O(
    "div",
    {
      className: je("im-slideover-positioner flex min-h-full items-center", {
        "justify-start rtl:justify-end": (t == null ? void 0 : t.position) === "left",
        "justify-end rtl:justify-start": (t == null ? void 0 : t.position) === "right"
      }),
      children: /* @__PURE__ */ O(
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
            yt,
            {
              className: `im-slideover-content relative ${t.paddingClasses} ${t.panelClasses}`,
              "data-inertiaui-modal-entered": r,
              children: [
                t.closeButton && /* @__PURE__ */ O("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ O(cn, { onClick: e.close }) }),
                typeof n == "function" ? n({ modalContext: e, config: t }) : n
              ]
            }
          )
        }
      )
    }
  ) });
}, bl = dt(({ name: e, children: t, onFocus: n = null, onBlur: r = null, onClose: l = null, onSuccess: i = null, onAfterLeave: a = null, ...s }, o) => {
  const p = (v) => typeof t == "function" ? t(v) : t, c = T(null);
  return Ft(o, () => c.current, [c]), /* @__PURE__ */ O(
    Rt,
    {
      ref: c,
      name: e,
      onFocus: n,
      onBlur: r,
      onClose: l,
      onSuccess: i,
      ...s,
      children: ({
        afterLeave: v,
        close: y,
        config: g,
        emit: d,
        getChildModal: x,
        getParentModal: u,
        id: f,
        index: m,
        isOpen: w,
        modalContext: b,
        onTopOfStack: h,
        reload: $,
        setOpen: F,
        shouldRender: j
      }) => /* @__PURE__ */ O(
        un,
        {
          appear: !0,
          show: w ?? !1,
          afterLeave: a,
          children: /* @__PURE__ */ se(
            wl,
            {
              as: "div",
              className: "im-dialog relative z-20",
              onClose: () => g.closeExplicitly ? null : y(),
              "data-inertiaui-modal-id": f,
              "data-inertiaui-modal-index": m,
              children: [
                m === 0 ? /* @__PURE__ */ O(
                  he,
                  {
                    enter: "transition transform ease-in-out duration-300",
                    enterFrom: "opacity-0",
                    enterTo: "opacity-100",
                    leave: "transition transform ease-in-out duration-300",
                    leaveFrom: "opacity-100",
                    leaveTo: "opacity-0",
                    children: h ? /* @__PURE__ */ O(
                      "div",
                      {
                        className: "im-backdrop fixed inset-0 z-30 bg-black/75",
                        "aria-hidden": "true"
                      }
                    ) : /* @__PURE__ */ O("div", {})
                  }
                ) : null,
                m > 0 && h ? /* @__PURE__ */ O("div", { className: "im-backdrop fixed inset-0 z-30 bg-black/75" }) : null,
                g.slideover ? /* @__PURE__ */ O(
                  yl,
                  {
                    modalContext: b,
                    config: g,
                    children: p({
                      afterLeave: v,
                      close: y,
                      config: g,
                      emit: d,
                      getChildModal: x,
                      getParentModal: u,
                      id: f,
                      index: m,
                      isOpen: w,
                      modalContext: b,
                      onTopOfStack: h,
                      reload: $,
                      setOpen: F,
                      shouldRender: j
                    })
                  }
                ) : /* @__PURE__ */ O(
                  xl,
                  {
                    modalContext: b,
                    config: g,
                    children: p({
                      afterLeave: v,
                      close: y,
                      config: g,
                      emit: d,
                      getChildModal: x,
                      getParentModal: u,
                      id: f,
                      index: m,
                      isOpen: w,
                      modalContext: b,
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
  queryStringArrayFormat: i = "brackets",
  onAfterLeave: a = null,
  onBlur: s = null,
  onClose: o = null,
  onError: p = null,
  onFocus: c = null,
  onStart: v = null,
  onSuccess: y = null,
  navigate: g = null,
  children: d,
  ...x
}) => {
  const [u, f] = S(!1), [m, w] = S(null), { stack: b, visit: h } = Xe(), $ = C(() => g ?? mt("navigate"), [g]), F = {}, j = {};
  Object.keys(x).forEach((P) => {
    bt.includes(P) || (P.startsWith("on") && typeof x[P] == "function" ? P.toLowerCase() in window ? F[P] = x[P] : j[P] = x[P] : F[P] = x[P]);
  });
  const [_, A] = S(!1);
  M(() => {
    m && (m.onTopOfStack && _ ? c == null || c() : !m.onTopOfStack && !_ && (s == null || s()), A(!m.onTopOfStack));
  }, [b]);
  const U = Y(() => {
    o == null || o();
  }, [o]), B = Y(() => {
    w(null), a == null || a();
  }, [a]), X = Y(
    (P) => {
      P == null || P.preventDefault(), !u && (e.startsWith("#") || (f(!0), v == null || v()), h(
        e,
        t,
        n,
        l,
        Mn(Ct(x, bt)),
        () => U(b.length),
        B,
        i,
        $
      ).then((V) => {
        w(V), V.registerEventListenersFromProps(j), y == null || y();
      }).catch((V) => {
        console.error(V), p == null || p(V);
      }).finally(() => f(!1)));
    },
    [e, t, n, l, i, x, U, B]
  );
  return /* @__PURE__ */ O(
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
  return Xe().stack[kt()] ?? null;
}
const Rl = (e) => (t) => (t.default.layout = (n) => Re(e, {}, n), t);
export {
  Rt as HeadlessModal,
  bl as Modal,
  kl as ModalLink,
  Cn as ModalRoot,
  Sn as ModalStackProvider,
  mt as getConfig,
  Fn as initFromPageProps,
  Fl as putConfig,
  Cl as renderApp,
  Sl as resetConfig,
  Rl as setPageLayout,
  Il as useModal,
  kt as useModalIndex,
  Xe as useModalStack
};
