var Wt = Object.defineProperty;
var Bt = (t, e, n) => e in t ? Wt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var X = (t, e, n) => Bt(t, typeof e != "symbol" ? e + "" : e, n);
import * as ve from "react";
import B, { createContext as Pe, useState as $, useEffect as D, useContext as de, useRef as j, createElement as Ne, useMemo as Y, forwardRef as Ze, useImperativeHandle as ct, useLayoutEffect as Ht, useCallback as V, Fragment as ae, isValidElement as Kt, cloneElement as qt } from "react";
import { jsx as F, jsxs as le, Fragment as Ye } from "react/jsx-runtime";
import Te from "axios";
import { router as he, usePage as Xt } from "@inertiajs/react";
import { mergeDataIntoQueryString as _t } from "@inertiajs/core";
const fe = {
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
class Vt {
  constructor() {
    this.config = {}, this.reset();
  }
  reset() {
    this.config = JSON.parse(JSON.stringify(fe));
  }
  put(e, n) {
    if (typeof e == "object") {
      this.config = {
        type: e.type ?? fe.type,
        navigate: e.navigate ?? fe.navigate,
        modal: { ...fe.modal, ...e.modal ?? {} },
        slideover: { ...fe.slideover, ...e.slideover ?? {} }
      };
      return;
    }
    const r = e.split(".");
    let i = this.config;
    for (let l = 0; l < r.length - 1; l++)
      i = i[r[l]] = i[r[l]] || {};
    i[r[r.length - 1]] = n;
  }
  get(e) {
    if (typeof e > "u")
      return this.config;
    const n = e.split(".");
    let r = this.config;
    for (const i of n) {
      if (r[i] === void 0)
        return null;
      r = r[i];
    }
    return r;
  }
}
const Ie = new Vt(), mr = () => Ie.reset(), pr = (t, e) => Ie.put(t, e), Je = (t) => Ie.get(t), se = (t, e) => Ie.get(t ? `slideover.${e}` : `modal.${e}`), nt = {
  modifiedElements: [],
  bodyState: {
    hasOverflowHidden: !1,
    hasPointerEventsNone: !1,
    originalPaddingRight: ""
  },
  prepare() {
    const t = window.innerWidth - document.documentElement.clientWidth;
    this.bodyState.originalPaddingRight = document.body.style.paddingRight;
    const e = parseInt(window.getComputedStyle(document.body).paddingRight, 10);
    document.body.style.paddingRight = `${e + t}px`, document.body.classList.contains("overflow-hidden") || (document.body.classList.add("overflow-hidden"), this.bodyState.hasOverflowHidden = !0), document.body.classList.contains("pointer-events-none") || (document.body.classList.add("pointer-events-none"), this.bodyState.hasPointerEventsNone = !0), Array.from(document.body.children).forEach((n) => {
      !n.classList.contains("im-dialog") && n.getAttribute("aria-hidden") !== "true" && (n.setAttribute("aria-hidden", "true"), this.modifiedElements.push(n));
    });
  },
  cleanup() {
    this.bodyState.hasOverflowHidden && (document.body.classList.remove("overflow-hidden"), this.bodyState.hasOverflowHidden = !1), this.bodyState.hasPointerEventsNone && (document.body.classList.remove("pointer-events-none"), this.bodyState.hasPointerEventsNone = !1), document.body.style.paddingRight = this.bodyState.originalPaddingRight, this.bodyState.originalPaddingRight = "", this.modifiedElements.forEach((t) => {
      t.removeAttribute("aria-hidden");
    }), this.modifiedElements = [];
  }
};
function We(t = "inertiaui_modal_") {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `${t}${crypto.randomUUID()}` : `${t}${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
}
function zt(t, e) {
  return Array.isArray(t) ? t.filter((n) => !e.includes(n)) : Object.keys(t).reduce((n, r) => (e.includes(r) || (n[r] = t[r]), n), {});
}
function ft(t, e) {
  return Array.isArray(t) ? t.filter((n) => e.includes(n)) : e.reduce((n, r) => (r in t && (n[r] = t[r]), n), {});
}
function Gt(t) {
  return Array.isArray(t) ? t.filter((e) => e !== null) : Object.keys(t).reduce((e, n) => (n in t && t[n] !== null && (e[n] = t[n]), e), {});
}
function Zt(t, e = 3, n = 10) {
  return new Promise((r, i) => {
    const l = t();
    if (l) {
      r(l);
      return;
    }
    let a = e * 1e3 / n;
    const m = setInterval(() => {
      const s = t();
      s && (clearInterval(m), r(s)), --a <= 0 && (clearInterval(m), i(new Error("Condition not met in time")));
    }, n);
  });
}
function me(t) {
  return t ? (t = t.replace(/_/g, "-"), t = t.replace(/-+/g, "-"), /[A-Z]/.test(t) ? (t = t.replace(/\s+/g, "").replace(/_/g, "").replace(/(?:^|\s|-)+([A-Za-z])/g, (e, n) => n.toUpperCase()), t = t.replace(/(.)(?=[A-Z])/g, "$1-"), t.toLowerCase()) : t) : "";
}
const Re = Pe(null);
Re.displayName = "ModalStackContext";
let mt = null, pt = null, be = null, qe = null, Xe = [], oe = {};
const Yt = ({ children: t }) => {
  const [e, n] = $([]), [r, i] = $({}), l = (g) => {
    n((d) => {
      const f = g([...d]), p = (y) => {
        var N;
        return f.length < 2 ? !0 : ((N = f.map((h) => ({ id: h.id, shouldRender: h.shouldRender })).reverse().find((h) => h.shouldRender)) == null ? void 0 : N.id) === y;
      };
      return f.forEach((y, N) => {
        f[N].onTopOfStack = p(y.id), f[N].getParentModal = () => N < 1 ? null : f.slice(0, N).reverse().find((h) => h.isOpen), f[N].getChildModal = () => N === f.length - 1 ? null : f.slice(N + 1).find((h) => h.isOpen);
      }), f;
    });
  };
  D(() => {
    Xe = e;
  }, [e]);
  class a {
    constructor(d, f, p, y, N) {
      X(this, "show", () => {
        l(
          (d) => d.map((f) => (f.id === this.id && !f.isOpen && (f.isOpen = !0, f.shouldRender = !0), f))
        );
      });
      X(this, "setOpen", (d) => {
        d ? this.show() : this.close();
      });
      X(this, "close", () => {
        l(
          (d) => d.map((f) => {
            var p;
            return f.id === this.id && f.isOpen && (Object.keys(f.listeners).forEach((y) => {
              f.off(y);
            }), f.isOpen = !1, (p = f.onCloseCallback) == null || p.call(f)), f;
          })
        );
      });
      X(this, "afterLeave", () => {
        this.isOpen || l((d) => {
          const f = d.map((p) => {
            var y;
            return p.id === this.id && !p.isOpen && (p.shouldRender = !1, (y = p.afterLeaveCallback) == null || y.call(p), p.afterLeaveCallback = null), p;
          });
          return this.index === 0 ? [] : f;
        });
      });
      X(this, "on", (d, f) => {
        d = me(d), this.listeners[d] = this.listeners[d] ?? [], this.listeners[d].push(f);
      });
      X(this, "off", (d, f) => {
        var p;
        d = me(d), f ? this.listeners[d] = ((p = this.listeners[d]) == null ? void 0 : p.filter((y) => y !== f)) ?? [] : delete this.listeners[d];
      });
      X(this, "emit", (d, ...f) => {
        var p;
        (p = this.listeners[me(d)]) == null || p.forEach((y) => y(...f));
      });
      X(this, "registerEventListenersFromProps", (d) => {
        const f = [];
        return Object.keys(d).filter((p) => p.startsWith("on")).forEach((p) => {
          const y = me(p).replace(/^on-/, "");
          this.on(y, d[p]), f.push(() => this.off(y, d[p]));
        }), () => f.forEach((p) => p());
      });
      X(this, "reload", (d = {}) => {
        var p;
        let f = Object.keys(this.response.props);
        d.only && (f = ft(f, d.only)), d.except && (f = zt(f, d.except)), (p = this.response) != null && p.url && Te.get(this.response.url, {
          headers: {
            Accept: "text/html, application/xhtml+xml",
            "X-Inertia": !0,
            "X-Inertia-Partial-Component": this.response.component,
            "X-Inertia-Version": this.response.version,
            "X-Inertia-Partial-Data": f.join(","),
            "X-InertiaUI-Modal": We(),
            "X-InertiaUI-Modal-Use-Router": 0,
            "X-InertiaUI-Modal-Base-Url": be
          }
        }).then((y) => {
          this.updateProps(y.data.props);
        });
      });
      X(this, "updateProps", (d) => {
        Object.assign(this.props, d), l((f) => f);
      });
      if (this.id = f.id ?? We(), this.isOpen = !1, this.shouldRender = !1, this.listeners = {}, this.component = d, this.props = f.props, this.response = f, this.config = p ?? {}, this.onCloseCallback = y, this.afterLeaveCallback = N, oe[this.id]) {
        this.config = {
          ...this.config,
          ...oe[this.id].config ?? {}
        };
        const h = oe[this.id].onClose, k = oe[this.id].onAfterLeave;
        h && (this.onCloseCallback = y ? () => {
          y(), h();
        } : h), k && (this.afterLeaveCallback = N ? () => {
          N(), k();
        } : k), delete oe[this.id];
      }
      this.index = -1, this.getParentModal = () => null, this.getChildModal = () => null, this.onTopOfStack = !0;
    }
    static generateId() {
      return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `inertiaui_modal_${crypto.randomUUID()}` : `inertiaui_modal_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
    }
  }
  const m = (g, d = {}, f = null, p = null) => pt(g.component).then((y) => s(y, g, d, f, p)), s = (g, d, f, p, y) => {
    const N = new a(g, d, f, p, y);
    return N.index = e.length, l((h) => [...h, N]), N.show(), N;
  };
  function v(g, d, f, p) {
    if (!r[g])
      throw new Error(`The local modal "${g}" has not been registered.`);
    const y = s(null, {}, d, f, p);
    return y.name = g, r[g].callback(y), y;
  }
  const b = (g, d = {}) => x(
    g,
    d.method ?? "get",
    d.data ?? {},
    d.headers ?? {},
    d.config ?? {},
    d.onClose,
    d.onAfterLeave,
    d.queryStringArrayFormat ?? "brackets",
    d.navigate ?? Je("navigate")
  ).then((f) => {
    const p = d.listeners ?? {};
    return Object.keys(p).forEach((y) => {
      const N = me(y);
      f.on(N, p[y]);
    }), f;
  }), x = (g, d, f = {}, p = {}, y = {}, N = null, h = null, k = "brackets", A = !1) => {
    const H = We();
    return new Promise((K, U) => {
      if (g.startsWith("#")) {
        K(v(g.substring(1), y, N, h));
        return;
      }
      const [W, O] = _t(d, g || "", f, k);
      let o = A && e.length === 0;
      if (e.length === 0 && (be = typeof window < "u" ? window.location.href : ""), p = {
        ...p,
        Accept: "text/html, application/xhtml+xml",
        "X-Requested-With": "XMLHttpRequest",
        "X-Inertia": !0,
        "X-Inertia-Version": mt,
        "X-InertiaUI-Modal": H,
        "X-InertiaUI-Modal-Use-Router": o ? 1 : 0,
        "X-InertiaUI-Modal-Base-Url": be
      }, o)
        return qe = null, oe[H] = {
          config: y,
          onClose: N,
          onAfterLeave: h
        }, he.visit(W, {
          method: d,
          data: O,
          headers: p,
          preserveScroll: !0,
          preserveState: !0,
          onError: U,
          onFinish: () => {
            Zt(() => qe).then(K);
          }
        });
      Te({
        url: W,
        method: d,
        data: O,
        headers: p
      }).then((u) => K(m(u.data, y, N, h))).catch((u) => {
        U(u);
      });
    });
  }, c = {
    stack: e,
    localModals: r,
    push: s,
    pushFromResponseData: m,
    closeAll: () => {
      Xe.reverse().forEach((g) => g.close());
    },
    reset: () => l(() => []),
    visit: x,
    visitModal: b,
    registerLocalModal: (g, d) => {
      i((f) => ({
        ...f,
        [g]: { name: g, callback: d }
      }));
    },
    removeLocalModal: (g) => {
      i((d) => {
        const f = { ...d };
        return delete f[g], f;
      });
    }
  };
  return /* @__PURE__ */ F(Re.Provider, { value: c, children: t });
}, Ae = () => {
  const t = de(Re);
  if (t === null)
    throw new Error("useModalStack must be used within a ModalStackProvider");
  return t;
}, rt = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"], Jt = (t) => {
  t.initialPage && (mt = t.initialPage.version), t.resolveComponent && (pt = t.resolveComponent);
}, hr = (t, e) => (Jt(e), /* @__PURE__ */ F(Yt, { children: /* @__PURE__ */ F(t, { ...e, children: ({ Component: r, props: i, key: l }) => /* @__PURE__ */ le(Ye, { children: [
  (() => {
    const m = Ne(r, { key: l, ...i });
    return typeof r.layout == "function" ? r.layout(m) : Array.isArray(r.layout) ? r.layout.concat(m).reverse().reduce((v, b) => Ne(b, i, v)) : m;
  })(),
  /* @__PURE__ */ F(Qt, {})
] }) }) })), Qt = ({ children: t }) => {
  var m;
  const e = de(Re);
  let n = !1, r = !1;
  D(() => he.on("start", () => n = !0), []), D(() => he.on("finish", () => n = !1), []), D(
    () => he.on("navigate", function(s) {
      const v = s.detail.page.props._inertiaui_modal;
      if (!v) {
        r && e.closeAll();
        return;
      }
      r = v, be = v.baseUrl, e.pushFromResponseData(v, {}, () => {
        if (!v.baseUrl) {
          console.error("No base url in modal response data so cannot navigate back");
          return;
        }
        !n && window.location.href !== v.baseUrl && he.visit(v.baseUrl, {
          preserveScroll: !0,
          preserveState: !0
        });
      }).then((b) => {
        qe = b;
      });
    }),
    []
  );
  const i = (s) => (Xe.length && (s.headers["X-InertiaUI-Modal-Base-Url"] = be), s);
  D(() => (Te.interceptors.request.use(i), () => Te.interceptors.request.eject(i)), []);
  const l = Xt(), a = j();
  return D(() => {
    var b, x;
    const s = (b = l.props) == null ? void 0 : b._inertiaui_modal, v = a.current;
    a.current = s, s && v && s.component === v.component && s.url === v.url && ((x = e.stack[0]) == null || x.updateProps(s.props ?? {}));
  }, [(m = l.props) == null ? void 0 : m._inertiaui_modal]), /* @__PURE__ */ le(Ye, { children: [
    t,
    e.stack.length > 0 && /* @__PURE__ */ F(vt, { index: 0 })
  ] });
}, Qe = B.createContext(null);
Qe.displayName = "ModalIndexContext";
const ht = () => {
  const t = B.useContext(Qe);
  if (t === void 0)
    throw new Error("useModalIndex must be used within a ModalIndexProvider");
  return t;
}, vt = ({ index: t }) => {
  const { stack: e } = Ae(), n = Y(() => e[t], [e, t]);
  return (n == null ? void 0 : n.component) && /* @__PURE__ */ F(Qe.Provider, { value: t, children: /* @__PURE__ */ F(
    n.component,
    {
      ...n.props,
      onModalEvent: (...r) => n.emit(...r)
    }
  ) });
}, bt = Ze(({ name: t, children: e, onFocus: n = null, onBlur: r = null, onClose: i = null, onSuccess: l = null, ...a }, m) => {
  const s = ht(), { stack: v, registerLocalModal: b, removeLocalModal: x } = Ae(), [T, E] = $(null), c = Y(() => t ? T : v[s], [t, T, s, v]), g = Y(() => {
    var h;
    return (h = v.find((k) => k.shouldRender && k.index > (c == null ? void 0 : c.index))) == null ? void 0 : h.index;
  }, [s, v]), d = Y(() => (c == null ? void 0 : c.config.slideover) ?? a.slideover ?? Je("type") === "slideover", [a.slideover]), f = Y(
    () => ({
      slideover: d,
      closeButton: a.closeButton ?? se(d, "closeButton"),
      closeExplicitly: a.closeExplicitly ?? se(d, "closeExplicitly"),
      maxWidth: a.maxWidth ?? se(d, "maxWidth"),
      paddingClasses: a.paddingClasses ?? se(d, "paddingClasses"),
      panelClasses: a.panelClasses ?? se(d, "panelClasses"),
      position: a.position ?? se(d, "position"),
      ...c == null ? void 0 : c.config
    }),
    [a, c == null ? void 0 : c.config]
  );
  D(() => {
    if (t) {
      let h = null;
      return b(t, (k) => {
        h = k.registerEventListenersFromProps(a), E(k);
      }), () => {
        h == null || h(), h = null, x(t);
      };
    }
    return c.registerEventListenersFromProps(a);
  }, [t]);
  const p = j(c);
  D(() => {
    p.current = c;
  }, [c]), D(() => {
    c !== null && (c.isOpen ? l == null || l() : i == null || i());
  }, [c == null ? void 0 : c.isOpen]);
  const [y, N] = $(!1);
  return D(() => {
    y && c !== null && c.isOpen && (c.onTopOfStack ? n == null || n() : r == null || r()), N(!0);
  }, [c == null ? void 0 : c.onTopOfStack]), ct(
    m,
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
        var k;
        return (k = p.current) == null ? void 0 : k.emit(...h);
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
        var k;
        return (k = p.current) == null ? void 0 : k.reload(...h);
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
  ), (c == null ? void 0 : c.shouldRender) && /* @__PURE__ */ le(Ye, { children: [
    typeof e == "function" ? e({
      afterLeave: c.afterLeave,
      close: c.close,
      config: f,
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
    }) : e,
    g && /* @__PURE__ */ F(vt, { index: g })
  ] });
});
bt.displayName = "HeadlessModal";
function gt(t) {
  var e, n, r = "";
  if (typeof t == "string" || typeof t == "number") r += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var i = t.length;
    for (e = 0; e < i; e++) t[e] && (n = gt(t[e])) && (r && (r += " "), r += n);
  } else for (n in t) t[n] && (r && (r += " "), r += n);
  return r;
}
function Se() {
  for (var t, e, n = 0, r = "", i = arguments.length; n < i; n++) (t = arguments[n]) && (e = gt(t)) && (r && (r += " "), r += e);
  return r;
}
var en = Object.defineProperty, tn = (t, e, n) => e in t ? en(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, Be = (t, e, n) => (tn(t, typeof e != "symbol" ? e + "" : e, n), n);
let nn = class {
  constructor() {
    Be(this, "current", this.detect()), Be(this, "handoffState", "pending"), Be(this, "currentId", 0);
  }
  set(e) {
    this.current !== e && (this.handoffState = "pending", this.currentId = 0, this.current = e);
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
}, Ee = new nn();
function rn(t) {
  typeof queueMicrotask == "function" ? queueMicrotask(t) : Promise.resolve().then(t).catch((e) => setTimeout(() => {
    throw e;
  }));
}
function Me() {
  let t = [], e = { addEventListener(n, r, i, l) {
    return n.addEventListener(r, i, l), e.add(() => n.removeEventListener(r, i, l));
  }, requestAnimationFrame(...n) {
    let r = requestAnimationFrame(...n);
    return e.add(() => cancelAnimationFrame(r));
  }, nextFrame(...n) {
    return e.requestAnimationFrame(() => e.requestAnimationFrame(...n));
  }, setTimeout(...n) {
    let r = setTimeout(...n);
    return e.add(() => clearTimeout(r));
  }, microTask(...n) {
    let r = { current: !0 };
    return rn(() => {
      r.current && n[0]();
    }), e.add(() => {
      r.current = !1;
    });
  }, style(n, r, i) {
    let l = n.style.getPropertyValue(r);
    return Object.assign(n.style, { [r]: i }), this.add(() => {
      Object.assign(n.style, { [r]: l });
    });
  }, group(n) {
    let r = Me();
    return n(r), this.add(() => r.dispose());
  }, add(n) {
    return t.includes(n) || t.push(n), () => {
      let r = t.indexOf(n);
      if (r >= 0) for (let i of t.splice(r, 1)) i();
    };
  }, dispose() {
    for (let n of t.splice(0)) n();
  } };
  return e;
}
function yt() {
  let [t] = $(Me);
  return D(() => () => t.dispose(), [t]), t;
}
let Q = (t, e) => {
  Ee.isServer ? D(t, e) : Ht(t, e);
};
function wt(t) {
  let e = j(t);
  return Q(() => {
    e.current = t;
  }, [t]), e;
}
let G = function(t) {
  let e = wt(t);
  return B.useCallback((...n) => e.current(...n), [e]);
};
function _e(...t) {
  return Array.from(new Set(t.flatMap((e) => typeof e == "string" ? e.split(" ") : []))).filter(Boolean).join(" ");
}
function Le(t, e, ...n) {
  if (t in e) {
    let i = e[t];
    return typeof i == "function" ? i(...n) : i;
  }
  let r = new Error(`Tried to handle "${t}" but there is no handler defined. Only defined handlers are: ${Object.keys(e).map((i) => `"${i}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(r, Le), r;
}
var xt = ((t) => (t[t.None = 0] = "None", t[t.RenderStrategy = 1] = "RenderStrategy", t[t.Static = 2] = "Static", t))(xt || {}), J = ((t) => (t[t.Unmount = 0] = "Unmount", t[t.Hidden = 1] = "Hidden", t))(J || {});
function Et() {
  let t = ln();
  return V((e) => an({ mergeRefs: t, ...e }), [t]);
}
function an({ ourProps: t, theirProps: e, slot: n, defaultTag: r, features: i, visible: l = !0, name: a, mergeRefs: m }) {
  m = m ?? sn;
  let s = Nt(e, t);
  if (l) return we(s, n, r, a, m);
  let v = i ?? 0;
  if (v & 2) {
    let { static: b = !1, ...x } = s;
    if (b) return we(x, n, r, a, m);
  }
  if (v & 1) {
    let { unmount: b = !0, ...x } = s;
    return Le(b ? 0 : 1, { 0() {
      return null;
    }, 1() {
      return we({ ...x, hidden: !0, style: { display: "none" } }, n, r, a, m);
    } });
  }
  return we(s, n, r, a, m);
}
function we(t, e = {}, n, r, i) {
  let { as: l = n, children: a, refName: m = "ref", ...s } = He(t, ["unmount", "static"]), v = t.ref !== void 0 ? { [m]: t.ref } : {}, b = typeof a == "function" ? a(e) : a;
  "className" in s && s.className && typeof s.className == "function" && (s.className = s.className(e)), s["aria-labelledby"] && s["aria-labelledby"] === s.id && (s["aria-labelledby"] = void 0);
  let x = {};
  if (e) {
    let T = !1, E = [];
    for (let [c, g] of Object.entries(e)) typeof g == "boolean" && (T = !0), g === !0 && E.push(c.replace(/([A-Z])/g, (d) => `-${d.toLowerCase()}`));
    if (T) {
      x["data-headlessui-state"] = E.join(" ");
      for (let c of E) x[`data-${c}`] = "";
    }
  }
  if (l === ae && (Object.keys(te(s)).length > 0 || Object.keys(te(x)).length > 0)) if (!Kt(b) || Array.isArray(b) && b.length > 1) {
    if (Object.keys(te(s)).length > 0) throw new Error(['Passing props on "Fragment"!', "", `The current component <${r} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(te(s)).concat(Object.keys(te(x))).map((T) => `  - ${T}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((T) => `  - ${T}`).join(`
`)].join(`
`));
  } else {
    let T = b.props, E = T == null ? void 0 : T.className, c = typeof E == "function" ? (...f) => _e(E(...f), s.className) : _e(E, s.className), g = c ? { className: c } : {}, d = Nt(b.props, te(He(s, ["ref"])));
    for (let f in x) f in d && delete x[f];
    return qt(b, Object.assign({}, d, x, v, { ref: i(on(b), v.ref) }, g));
  }
  return Ne(l, Object.assign({}, He(s, ["ref"]), l !== ae && v, l !== ae && x), b);
}
function ln() {
  let t = j([]), e = V((n) => {
    for (let r of t.current) r != null && (typeof r == "function" ? r(n) : r.current = n);
  }, []);
  return (...n) => {
    if (!n.every((r) => r == null)) return t.current = n, e;
  };
}
function sn(...t) {
  return t.every((e) => e == null) ? void 0 : (e) => {
    for (let n of t) n != null && (typeof n == "function" ? n(e) : n.current = e);
  };
}
function Nt(...t) {
  if (t.length === 0) return {};
  if (t.length === 1) return t[0];
  let e = {}, n = {};
  for (let r of t) for (let i in r) i.startsWith("on") && typeof r[i] == "function" ? (n[i] != null || (n[i] = []), n[i].push(r[i])) : e[i] = r[i];
  if (e.disabled || e["aria-disabled"]) for (let r in n) /^(on(?:Click|Pointer|Mouse|Key)(?:Down|Up|Press)?)$/.test(r) && (n[r] = [(i) => {
    var l;
    return (l = i == null ? void 0 : i.preventDefault) == null ? void 0 : l.call(i);
  }]);
  for (let r in n) Object.assign(e, { [r](i, ...l) {
    let a = n[r];
    for (let m of a) {
      if ((i instanceof Event || (i == null ? void 0 : i.nativeEvent) instanceof Event) && i.defaultPrevented) return;
      m(i, ...l);
    }
  } });
  return e;
}
function et(t) {
  var e;
  return Object.assign(Ze(t), { displayName: (e = t.displayName) != null ? e : t.name });
}
function te(t) {
  let e = Object.assign({}, t);
  for (let n in e) e[n] === void 0 && delete e[n];
  return e;
}
function He(t, e = []) {
  let n = Object.assign({}, t);
  for (let r of e) r in n && delete n[r];
  return n;
}
function on(t) {
  return B.version.split(".")[0] >= "19" ? t.props.ref : t.ref;
}
let un = Symbol();
function Tt(...t) {
  let e = j(t);
  D(() => {
    e.current = t;
  }, [t]);
  let n = G((r) => {
    for (let i of e.current) i != null && (typeof i == "function" ? i(r) : i.current = r);
  });
  return t.every((r) => r == null || (r == null ? void 0 : r[un])) ? void 0 : n;
}
function dn(t = 0) {
  let [e, n] = $(t), r = V((s) => n(s), [e]), i = V((s) => n((v) => v | s), [e]), l = V((s) => (e & s) === s, [e]), a = V((s) => n((v) => v & ~s), [n]), m = V((s) => n((v) => v ^ s), [n]);
  return { flags: e, setFlag: r, addFlag: i, hasFlag: l, removeFlag: a, toggleFlag: m };
}
var at, it;
typeof process < "u" && typeof globalThis < "u" && typeof Element < "u" && ((at = process == null ? void 0 : process.env) == null ? void 0 : at.NODE_ENV) === "test" && typeof ((it = Element == null ? void 0 : Element.prototype) == null ? void 0 : it.getAnimations) > "u" && (Element.prototype.getAnimations = function() {
  return console.warn(["Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.", "Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.", "", "Example usage:", "```js", "import { mockAnimationsApi } from 'jsdom-testing-mocks'", "mockAnimationsApi()", "```"].join(`
`)), [];
});
var cn = ((t) => (t[t.None = 0] = "None", t[t.Closed = 1] = "Closed", t[t.Enter = 2] = "Enter", t[t.Leave = 4] = "Leave", t))(cn || {});
function fn(t) {
  let e = {};
  for (let n in t) t[n] === !0 && (e[`data-${n}`] = "");
  return e;
}
function mn(t, e, n, r) {
  let [i, l] = $(n), { hasFlag: a, addFlag: m, removeFlag: s } = dn(t && i ? 3 : 0), v = j(!1), b = j(!1), x = yt();
  return Q(() => {
    var T;
    if (t) {
      if (n && l(!0), !e) {
        n && m(3);
        return;
      }
      return (T = r == null ? void 0 : r.start) == null || T.call(r, n), pn(e, { inFlight: v, prepare() {
        b.current ? b.current = !1 : b.current = v.current, v.current = !0, !b.current && (n ? (m(3), s(4)) : (m(4), s(2)));
      }, run() {
        b.current ? n ? (s(3), m(4)) : (s(4), m(3)) : n ? s(1) : m(1);
      }, done() {
        var E;
        b.current && typeof e.getAnimations == "function" && e.getAnimations().length > 0 || (v.current = !1, s(7), n || l(!1), (E = r == null ? void 0 : r.end) == null || E.call(r, n));
      } });
    }
  }, [t, n, e, x]), t ? [i, { closed: a(1), enter: a(2), leave: a(4), transition: a(2) || a(4) }] : [n, { closed: void 0, enter: void 0, leave: void 0, transition: void 0 }];
}
function pn(t, { prepare: e, run: n, done: r, inFlight: i }) {
  let l = Me();
  return vn(t, { prepare: e, inFlight: i }), l.nextFrame(() => {
    n(), l.requestAnimationFrame(() => {
      l.add(hn(t, r));
    });
  }), l.dispose;
}
function hn(t, e) {
  var n, r;
  let i = Me();
  if (!t) return i.dispose;
  let l = !1;
  i.add(() => {
    l = !0;
  });
  let a = (r = (n = t.getAnimations) == null ? void 0 : n.call(t).filter((m) => m instanceof CSSTransition)) != null ? r : [];
  return a.length === 0 ? (e(), i.dispose) : (Promise.allSettled(a.map((m) => m.finished)).then(() => {
    l || e();
  }), i.dispose);
}
function vn(t, { inFlight: e, prepare: n }) {
  if (e != null && e.current) {
    n();
    return;
  }
  let r = t.style.transition;
  t.style.transition = "none", n(), t.offsetHeight, t.style.transition = r;
}
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var St = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"], Oe = /* @__PURE__ */ St.join(","), Ot = typeof Element > "u", ie = Ot ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, Fe = !Ot && Element.prototype.getRootNode ? function(t) {
  var e;
  return t == null || (e = t.getRootNode) === null || e === void 0 ? void 0 : e.call(t);
} : function(t) {
  return t == null ? void 0 : t.ownerDocument;
}, ke = function t(e, n) {
  var r;
  n === void 0 && (n = !0);
  var i = e == null || (r = e.getAttribute) === null || r === void 0 ? void 0 : r.call(e, "inert"), l = i === "" || i === "true", a = l || n && e && t(e.parentNode);
  return a;
}, bn = function(e) {
  var n, r = e == null || (n = e.getAttribute) === null || n === void 0 ? void 0 : n.call(e, "contenteditable");
  return r === "" || r === "true";
}, Ft = function(e, n, r) {
  if (ke(e))
    return [];
  var i = Array.prototype.slice.apply(e.querySelectorAll(Oe));
  return n && ie.call(e, Oe) && i.unshift(e), i = i.filter(r), i;
}, kt = function t(e, n, r) {
  for (var i = [], l = Array.from(e); l.length; ) {
    var a = l.shift();
    if (!ke(a, !1))
      if (a.tagName === "SLOT") {
        var m = a.assignedElements(), s = m.length ? m : a.children, v = t(s, !0, r);
        r.flatten ? i.push.apply(i, v) : i.push({
          scopeParent: a,
          candidates: v
        });
      } else {
        var b = ie.call(a, Oe);
        b && r.filter(a) && (n || !e.includes(a)) && i.push(a);
        var x = a.shadowRoot || // check for an undisclosed shadow
        typeof r.getShadowRoot == "function" && r.getShadowRoot(a), T = !ke(x, !1) && (!r.shadowRootFilter || r.shadowRootFilter(a));
        if (x && T) {
          var E = t(x === !0 ? a.children : x.children, !0, r);
          r.flatten ? i.push.apply(i, E) : i.push({
            scopeParent: a,
            candidates: E
          });
        } else
          l.unshift.apply(l, a.children);
      }
  }
  return i;
}, Ct = function(e) {
  return !isNaN(parseInt(e.getAttribute("tabindex"), 10));
}, ne = function(e) {
  if (!e)
    throw new Error("No node provided");
  return e.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName) || bn(e)) && !Ct(e) ? 0 : e.tabIndex;
}, gn = function(e, n) {
  var r = ne(e);
  return r < 0 && n && !Ct(e) ? 0 : r;
}, yn = function(e, n) {
  return e.tabIndex === n.tabIndex ? e.documentOrder - n.documentOrder : e.tabIndex - n.tabIndex;
}, Pt = function(e) {
  return e.tagName === "INPUT";
}, wn = function(e) {
  return Pt(e) && e.type === "hidden";
}, xn = function(e) {
  var n = e.tagName === "DETAILS" && Array.prototype.slice.apply(e.children).some(function(r) {
    return r.tagName === "SUMMARY";
  });
  return n;
}, En = function(e, n) {
  for (var r = 0; r < e.length; r++)
    if (e[r].checked && e[r].form === n)
      return e[r];
}, Nn = function(e) {
  if (!e.name)
    return !0;
  var n = e.form || Fe(e), r = function(m) {
    return n.querySelectorAll('input[type="radio"][name="' + m + '"]');
  }, i;
  if (typeof window < "u" && typeof window.CSS < "u" && typeof window.CSS.escape == "function")
    i = r(window.CSS.escape(e.name));
  else
    try {
      i = r(e.name);
    } catch (a) {
      return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", a.message), !1;
    }
  var l = En(i, e.form);
  return !l || l === e;
}, Tn = function(e) {
  return Pt(e) && e.type === "radio";
}, Sn = function(e) {
  return Tn(e) && !Nn(e);
}, On = function(e) {
  var n, r = e && Fe(e), i = (n = r) === null || n === void 0 ? void 0 : n.host, l = !1;
  if (r && r !== e) {
    var a, m, s;
    for (l = !!((a = i) !== null && a !== void 0 && (m = a.ownerDocument) !== null && m !== void 0 && m.contains(i) || e != null && (s = e.ownerDocument) !== null && s !== void 0 && s.contains(e)); !l && i; ) {
      var v, b, x;
      r = Fe(i), i = (v = r) === null || v === void 0 ? void 0 : v.host, l = !!((b = i) !== null && b !== void 0 && (x = b.ownerDocument) !== null && x !== void 0 && x.contains(i));
    }
  }
  return l;
}, lt = function(e) {
  var n = e.getBoundingClientRect(), r = n.width, i = n.height;
  return r === 0 && i === 0;
}, Fn = function(e, n) {
  var r = n.displayCheck, i = n.getShadowRoot;
  if (getComputedStyle(e).visibility === "hidden")
    return !0;
  var l = ie.call(e, "details>summary:first-of-type"), a = l ? e.parentElement : e;
  if (ie.call(a, "details:not([open]) *"))
    return !0;
  if (!r || r === "full" || r === "legacy-full") {
    if (typeof i == "function") {
      for (var m = e; e; ) {
        var s = e.parentElement, v = Fe(e);
        if (s && !s.shadowRoot && i(s) === !0)
          return lt(e);
        e.assignedSlot ? e = e.assignedSlot : !s && v !== e.ownerDocument ? e = v.host : e = s;
      }
      e = m;
    }
    if (On(e))
      return !e.getClientRects().length;
    if (r !== "legacy-full")
      return !0;
  } else if (r === "non-zero-area")
    return lt(e);
  return !1;
}, kn = function(e) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))
    for (var n = e.parentElement; n; ) {
      if (n.tagName === "FIELDSET" && n.disabled) {
        for (var r = 0; r < n.children.length; r++) {
          var i = n.children.item(r);
          if (i.tagName === "LEGEND")
            return ie.call(n, "fieldset[disabled] *") ? !0 : !i.contains(e);
        }
        return !0;
      }
      n = n.parentElement;
    }
  return !1;
}, Ce = function(e, n) {
  return !(n.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  ke(n) || wn(n) || Fn(n, e) || // For a details element with a summary, the summary element gets the focus
  xn(n) || kn(n));
}, Ve = function(e, n) {
  return !(Sn(n) || ne(n) < 0 || !Ce(e, n));
}, Cn = function(e) {
  var n = parseInt(e.getAttribute("tabindex"), 10);
  return !!(isNaN(n) || n >= 0);
}, Pn = function t(e) {
  var n = [], r = [];
  return e.forEach(function(i, l) {
    var a = !!i.scopeParent, m = a ? i.scopeParent : i, s = gn(m, a), v = a ? t(i.candidates) : m;
    s === 0 ? a ? n.push.apply(n, v) : n.push(m) : r.push({
      documentOrder: l,
      tabIndex: s,
      item: i,
      isScope: a,
      content: v
    });
  }), r.sort(yn).reduce(function(i, l) {
    return l.isScope ? i.push.apply(i, l.content) : i.push(l.content), i;
  }, []).concat(n);
}, In = function(e, n) {
  n = n || {};
  var r;
  return n.getShadowRoot ? r = kt([e], n.includeContainer, {
    filter: Ve.bind(null, n),
    flatten: !1,
    getShadowRoot: n.getShadowRoot,
    shadowRootFilter: Cn
  }) : r = Ft(e, n.includeContainer, Ve.bind(null, n)), Pn(r);
}, Rn = function(e, n) {
  n = n || {};
  var r;
  return n.getShadowRoot ? r = kt([e], n.includeContainer, {
    filter: Ce.bind(null, n),
    flatten: !0,
    getShadowRoot: n.getShadowRoot
  }) : r = Ft(e, n.includeContainer, Ce.bind(null, n)), r;
}, ue = function(e, n) {
  if (n = n || {}, !e)
    throw new Error("No node provided");
  return ie.call(e, Oe) === !1 ? !1 : Ve(n, e);
}, An = /* @__PURE__ */ St.concat("iframe").join(","), Ke = function(e, n) {
  if (n = n || {}, !e)
    throw new Error("No node provided");
  return ie.call(e, An) === !1 ? !1 : Ce(n, e);
};
let tt = Pe(null);
tt.displayName = "OpenClosedContext";
var re = ((t) => (t[t.Open = 1] = "Open", t[t.Closed = 2] = "Closed", t[t.Closing = 4] = "Closing", t[t.Opening = 8] = "Opening", t))(re || {});
function It() {
  return de(tt);
}
function Mn({ value: t, children: e }) {
  return B.createElement(tt.Provider, { value: t }, e);
}
function Ln() {
  let t = typeof document > "u";
  return "useSyncExternalStore" in ve ? ((e) => e.useSyncExternalStore)(ve)(() => () => {
  }, () => !1, () => !t) : !1;
}
function Rt() {
  let t = Ln(), [e, n] = ve.useState(Ee.isHandoffComplete);
  return e && Ee.isHandoffComplete === !1 && n(!1), ve.useEffect(() => {
    e !== !0 && n(!0);
  }, [e]), ve.useEffect(() => Ee.handoff(), []), t ? !1 : e;
}
function jn() {
  let t = j(!1);
  return Q(() => (t.current = !0, () => {
    t.current = !1;
  }), []), t;
}
function At(t) {
  var e;
  return !!(t.enter || t.enterFrom || t.enterTo || t.leave || t.leaveFrom || t.leaveTo) || ((e = t.as) != null ? e : Lt) !== ae || B.Children.count(t.children) === 1;
}
let je = Pe(null);
je.displayName = "TransitionContext";
var Dn = ((t) => (t.Visible = "visible", t.Hidden = "hidden", t))(Dn || {});
function $n() {
  let t = de(je);
  if (t === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return t;
}
function Un() {
  let t = de(De);
  if (t === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return t;
}
let De = Pe(null);
De.displayName = "NestingContext";
function $e(t) {
  return "children" in t ? $e(t.children) : t.current.filter(({ el: e }) => e.current !== null).filter(({ state: e }) => e === "visible").length > 0;
}
function Mt(t, e) {
  let n = wt(t), r = j([]), i = jn(), l = yt(), a = G((E, c = J.Hidden) => {
    let g = r.current.findIndex(({ el: d }) => d === E);
    g !== -1 && (Le(c, { [J.Unmount]() {
      r.current.splice(g, 1);
    }, [J.Hidden]() {
      r.current[g].state = "hidden";
    } }), l.microTask(() => {
      var d;
      !$e(r) && i.current && ((d = n.current) == null || d.call(n));
    }));
  }), m = G((E) => {
    let c = r.current.find(({ el: g }) => g === E);
    return c ? c.state !== "visible" && (c.state = "visible") : r.current.push({ el: E, state: "visible" }), () => a(E, J.Unmount);
  }), s = j([]), v = j(Promise.resolve()), b = j({ enter: [], leave: [] }), x = G((E, c, g) => {
    s.current.splice(0), e && (e.chains.current[c] = e.chains.current[c].filter(([d]) => d !== E)), e == null || e.chains.current[c].push([E, new Promise((d) => {
      s.current.push(d);
    })]), e == null || e.chains.current[c].push([E, new Promise((d) => {
      Promise.all(b.current[c].map(([f, p]) => p)).then(() => d());
    })]), c === "enter" ? v.current = v.current.then(() => e == null ? void 0 : e.wait.current).then(() => g(c)) : g(c);
  }), T = G((E, c, g) => {
    Promise.all(b.current[c].splice(0).map(([d, f]) => f)).then(() => {
      var d;
      (d = s.current.shift()) == null || d();
    }).then(() => g(c));
  });
  return Y(() => ({ children: r, register: m, unregister: a, onStart: x, onStop: T, wait: v, chains: b }), [m, a, r, x, T, b, v]);
}
let Lt = ae, jt = xt.RenderStrategy;
function Wn(t, e) {
  var n, r;
  let { transition: i = !0, beforeEnter: l, afterEnter: a, beforeLeave: m, afterLeave: s, enter: v, enterFrom: b, enterTo: x, entered: T, leave: E, leaveFrom: c, leaveTo: g, ...d } = t, [f, p] = $(null), y = j(null), N = At(t), h = Tt(...N ? [y, e, p] : e === null ? [] : [e]), k = (n = d.unmount) == null || n ? J.Unmount : J.Hidden, { show: A, appear: H, initial: K } = $n(), [U, W] = $(A ? "visible" : "hidden"), O = Un(), { register: o, unregister: u } = O;
  Q(() => o(y), [o, y]), Q(() => {
    if (k === J.Hidden && y.current) {
      if (A && U !== "visible") {
        W("visible");
        return;
      }
      return Le(U, { hidden: () => u(y), visible: () => o(y) });
    }
  }, [U, y, o, u, A, k]);
  let w = Rt();
  Q(() => {
    if (N && w && U === "visible" && y.current === null) throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
  }, [y, U, w, N]);
  let C = K && !H, P = H && A && K, I = j(!1), S = Mt(() => {
    I.current || (W("hidden"), u(y));
  }, O), R = G((ee) => {
    I.current = !0;
    let Z = ee ? "enter" : "leave";
    S.onStart(y, Z, (ce) => {
      ce === "enter" ? l == null || l() : ce === "leave" && (m == null || m());
    });
  }), M = G((ee) => {
    let Z = ee ? "enter" : "leave";
    I.current = !1, S.onStop(y, Z, (ce) => {
      ce === "enter" ? a == null || a() : ce === "leave" && (s == null || s());
    }), Z === "leave" && !$e(S) && (W("hidden"), u(y));
  });
  D(() => {
    N && i || (R(A), M(A));
  }, [A, N, i]);
  let z = !(!i || !N || !w || C), [, L] = mn(z, f, A, { start: R, end: M }), _ = te({ ref: h, className: ((r = _e(d.className, P && v, P && b, L.enter && v, L.enter && L.closed && b, L.enter && !L.closed && x, L.leave && E, L.leave && !L.closed && c, L.leave && L.closed && g, !L.transition && A && T)) == null ? void 0 : r.trim()) || void 0, ...fn(L) }), q = 0;
  U === "visible" && (q |= re.Open), U === "hidden" && (q |= re.Closed), L.enter && (q |= re.Opening), L.leave && (q |= re.Closing);
  let ye = Et();
  return B.createElement(De.Provider, { value: S }, B.createElement(Mn, { value: q }, ye({ ourProps: _, theirProps: d, defaultTag: Lt, features: jt, visible: U === "visible", name: "Transition.Child" })));
}
function Bn(t, e) {
  let { show: n, appear: r = !1, unmount: i = !0, ...l } = t, a = j(null), m = At(t), s = Tt(...m ? [a, e] : e === null ? [] : [e]);
  Rt();
  let v = It();
  if (n === void 0 && v !== null && (n = (v & re.Open) === re.Open), n === void 0) throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
  let [b, x] = $(n ? "visible" : "hidden"), T = Mt(() => {
    n || x("hidden");
  }), [E, c] = $(!0), g = j([n]);
  Q(() => {
    E !== !1 && g.current[g.current.length - 1] !== n && (g.current.push(n), c(!1));
  }, [g, n]);
  let d = Y(() => ({ show: n, appear: r, initial: E }), [n, r, E]);
  Q(() => {
    n ? x("visible") : !$e(T) && a.current !== null && x("hidden");
  }, [n, T]);
  let f = { unmount: i }, p = G(() => {
    var h;
    E && c(!1), (h = t.beforeEnter) == null || h.call(t);
  }), y = G(() => {
    var h;
    E && c(!1), (h = t.beforeLeave) == null || h.call(t);
  }), N = Et();
  return B.createElement(De.Provider, { value: T }, B.createElement(je.Provider, { value: d }, N({ ourProps: { ...f, as: ae, children: B.createElement(Dt, { ref: s, ...f, ...l, beforeEnter: p, beforeLeave: y }) }, theirProps: {}, defaultTag: ae, features: jt, visible: b === "visible", name: "Transition" })));
}
function Hn(t, e) {
  let n = de(je) !== null, r = It() !== null;
  return B.createElement(B.Fragment, null, !n && r ? B.createElement(ze, { ref: e, ...t }) : B.createElement(Dt, { ref: e, ...t }));
}
let ze = et(Bn), Dt = et(Wn), Ue = et(Hn), Kn = Object.assign(ze, { Child: Ue, Root: ze });
function $t({ onClick: t }) {
  return /* @__PURE__ */ le(
    "button",
    {
      type: "button",
      className: "im-close-button text-gray-400 hover:text-gray-500",
      onClick: t,
      children: [
        /* @__PURE__ */ F("span", { className: "sr-only", children: "Close" }),
        /* @__PURE__ */ F(
          "svg",
          {
            className: "size-6",
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: "2",
            stroke: "currentColor",
            "aria-hidden": "true",
            children: /* @__PURE__ */ F(
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
/*!
* focus-trap 7.6.2
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
function Ge(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var n = 0, r = Array(e); n < e; n++) r[n] = t[n];
  return r;
}
function qn(t) {
  if (Array.isArray(t)) return Ge(t);
}
function Xn(t, e, n) {
  return (e = Zn(e)) in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = n, t;
}
function _n(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t);
}
function Vn() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function st(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(t);
    e && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function ot(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? st(Object(n), !0).forEach(function(r) {
      Xn(t, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : st(Object(n)).forEach(function(r) {
      Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return t;
}
function zn(t) {
  return qn(t) || _n(t) || Yn(t) || Vn();
}
function Gn(t, e) {
  if (typeof t != "object" || !t) return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(t, e || "default");
    if (typeof r != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
function Zn(t) {
  var e = Gn(t, "string");
  return typeof e == "symbol" ? e : e + "";
}
function Yn(t, e) {
  if (t) {
    if (typeof t == "string") return Ge(t, e);
    var n = {}.toString.call(t).slice(8, -1);
    return n === "Object" && t.constructor && (n = t.constructor.name), n === "Map" || n === "Set" ? Array.from(t) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Ge(t, e) : void 0;
  }
}
var ut = {
  activateTrap: function(e, n) {
    if (e.length > 0) {
      var r = e[e.length - 1];
      r !== n && r.pause();
    }
    var i = e.indexOf(n);
    i === -1 || e.splice(i, 1), e.push(n);
  },
  deactivateTrap: function(e, n) {
    var r = e.indexOf(n);
    r !== -1 && e.splice(r, 1), e.length > 0 && e[e.length - 1].unpause();
  }
}, Jn = function(e) {
  return e.tagName && e.tagName.toLowerCase() === "input" && typeof e.select == "function";
}, Qn = function(e) {
  return (e == null ? void 0 : e.key) === "Escape" || (e == null ? void 0 : e.key) === "Esc" || (e == null ? void 0 : e.keyCode) === 27;
}, ge = function(e) {
  return (e == null ? void 0 : e.key) === "Tab" || (e == null ? void 0 : e.keyCode) === 9;
}, er = function(e) {
  return ge(e) && !e.shiftKey;
}, tr = function(e) {
  return ge(e) && e.shiftKey;
}, dt = function(e) {
  return setTimeout(e, 0);
}, pe = function(e) {
  for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
    r[i - 1] = arguments[i];
  return typeof e == "function" ? e.apply(void 0, r) : e;
}, xe = function(e) {
  return e.target.shadowRoot && typeof e.composedPath == "function" ? e.composedPath()[0] : e.target;
}, nr = [], rr = function(e, n) {
  var r = (n == null ? void 0 : n.document) || document, i = (n == null ? void 0 : n.trapStack) || nr, l = ot({
    returnFocusOnDeactivate: !0,
    escapeDeactivates: !0,
    delayInitialFocus: !0,
    isKeyForward: er,
    isKeyBackward: tr
  }, n), a = {
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
  }, m, s = function(o, u, w) {
    return o && o[u] !== void 0 ? o[u] : l[w || u];
  }, v = function(o, u) {
    var w = typeof (u == null ? void 0 : u.composedPath) == "function" ? u.composedPath() : void 0;
    return a.containerGroups.findIndex(function(C) {
      var P = C.container, I = C.tabbableNodes;
      return P.contains(o) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (w == null ? void 0 : w.includes(P)) || I.find(function(S) {
        return S === o;
      });
    });
  }, b = function(o) {
    var u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, w = u.hasFallback, C = w === void 0 ? !1 : w, P = u.params, I = P === void 0 ? [] : P, S = l[o];
    if (typeof S == "function" && (S = S.apply(void 0, zn(I))), S === !0 && (S = void 0), !S) {
      if (S === void 0 || S === !1)
        return S;
      throw new Error("`".concat(o, "` was specified but was not a node, or did not return a node"));
    }
    var R = S;
    if (typeof S == "string") {
      try {
        R = r.querySelector(S);
      } catch (M) {
        throw new Error("`".concat(o, '` appears to be an invalid selector; error="').concat(M.message, '"'));
      }
      if (!R && !C)
        throw new Error("`".concat(o, "` as selector refers to no known node"));
    }
    return R;
  }, x = function() {
    var o = b("initialFocus", {
      hasFallback: !0
    });
    if (o === !1)
      return !1;
    if (o === void 0 || o && !Ke(o, l.tabbableOptions))
      if (v(r.activeElement) >= 0)
        o = r.activeElement;
      else {
        var u = a.tabbableGroups[0], w = u && u.firstTabbableNode;
        o = w || b("fallbackFocus");
      }
    else o === null && (o = b("fallbackFocus"));
    if (!o)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return o;
  }, T = function() {
    if (a.containerGroups = a.containers.map(function(o) {
      var u = In(o, l.tabbableOptions), w = Rn(o, l.tabbableOptions), C = u.length > 0 ? u[0] : void 0, P = u.length > 0 ? u[u.length - 1] : void 0, I = w.find(function(M) {
        return ue(M);
      }), S = w.slice().reverse().find(function(M) {
        return ue(M);
      }), R = !!u.find(function(M) {
        return ne(M) > 0;
      });
      return {
        container: o,
        tabbableNodes: u,
        focusableNodes: w,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: R,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode: C,
        /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
        lastTabbableNode: P,
        // NOTE: DOM order is NOT NECESSARILY "document position" order, but figuring that out
        //  would require more than just https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
        //  because that API doesn't work with Shadow DOM as well as it should (@see
        //  https://github.com/whatwg/dom/issues/320) and since this first/last is only needed, so far,
        //  to address an edge case related to positive tabindex support, this seems like a much easier,
        //  "close enough most of the time" alternative for positive tabindexes which should generally
        //  be avoided anyway...
        /** First tabbable node in container, __DOM__ order; `undefined` if none. */
        firstDomTabbableNode: I,
        /** Last tabbable node in container, __DOM__ order; `undefined` if none. */
        lastDomTabbableNode: S,
        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function(z) {
          var L = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, _ = u.indexOf(z);
          return _ < 0 ? L ? w.slice(w.indexOf(z) + 1).find(function(q) {
            return ue(q);
          }) : w.slice(0, w.indexOf(z)).reverse().find(function(q) {
            return ue(q);
          }) : u[_ + (L ? 1 : -1)];
        }
      };
    }), a.tabbableGroups = a.containerGroups.filter(function(o) {
      return o.tabbableNodes.length > 0;
    }), a.tabbableGroups.length <= 0 && !b("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (a.containerGroups.find(function(o) {
      return o.posTabIndexesFound;
    }) && a.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, E = function(o) {
    var u = o.activeElement;
    if (u)
      return u.shadowRoot && u.shadowRoot.activeElement !== null ? E(u.shadowRoot) : u;
  }, c = function(o) {
    if (o !== !1 && o !== E(document)) {
      if (!o || !o.focus) {
        c(x());
        return;
      }
      o.focus({
        preventScroll: !!l.preventScroll
      }), a.mostRecentlyFocusedNode = o, Jn(o) && o.select();
    }
  }, g = function(o) {
    var u = b("setReturnFocus", {
      params: [o]
    });
    return u || (u === !1 ? !1 : o);
  }, d = function(o) {
    var u = o.target, w = o.event, C = o.isBackward, P = C === void 0 ? !1 : C;
    u = u || xe(w), T();
    var I = null;
    if (a.tabbableGroups.length > 0) {
      var S = v(u, w), R = S >= 0 ? a.containerGroups[S] : void 0;
      if (S < 0)
        P ? I = a.tabbableGroups[a.tabbableGroups.length - 1].lastTabbableNode : I = a.tabbableGroups[0].firstTabbableNode;
      else if (P) {
        var M = a.tabbableGroups.findIndex(function(ee) {
          var Z = ee.firstTabbableNode;
          return u === Z;
        });
        if (M < 0 && (R.container === u || Ke(u, l.tabbableOptions) && !ue(u, l.tabbableOptions) && !R.nextTabbableNode(u, !1)) && (M = S), M >= 0) {
          var z = M === 0 ? a.tabbableGroups.length - 1 : M - 1, L = a.tabbableGroups[z];
          I = ne(u) >= 0 ? L.lastTabbableNode : L.lastDomTabbableNode;
        } else ge(w) || (I = R.nextTabbableNode(u, !1));
      } else {
        var _ = a.tabbableGroups.findIndex(function(ee) {
          var Z = ee.lastTabbableNode;
          return u === Z;
        });
        if (_ < 0 && (R.container === u || Ke(u, l.tabbableOptions) && !ue(u, l.tabbableOptions) && !R.nextTabbableNode(u)) && (_ = S), _ >= 0) {
          var q = _ === a.tabbableGroups.length - 1 ? 0 : _ + 1, ye = a.tabbableGroups[q];
          I = ne(u) >= 0 ? ye.firstTabbableNode : ye.firstDomTabbableNode;
        } else ge(w) || (I = R.nextTabbableNode(u));
      }
    } else
      I = b("fallbackFocus");
    return I;
  }, f = function(o) {
    var u = xe(o);
    if (!(v(u, o) >= 0)) {
      if (pe(l.clickOutsideDeactivates, o)) {
        m.deactivate({
          // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
          //  which will result in the outside click setting focus to the node
          //  that was clicked (and if not focusable, to "nothing"); by setting
          //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
          //  on activation (or the configured `setReturnFocus` node), whether the
          //  outside click was on a focusable node or not
          returnFocus: l.returnFocusOnDeactivate
        });
        return;
      }
      pe(l.allowOutsideClick, o) || o.preventDefault();
    }
  }, p = function(o) {
    var u = xe(o), w = v(u, o) >= 0;
    if (w || u instanceof Document)
      w && (a.mostRecentlyFocusedNode = u);
    else {
      o.stopImmediatePropagation();
      var C, P = !0;
      if (a.mostRecentlyFocusedNode)
        if (ne(a.mostRecentlyFocusedNode) > 0) {
          var I = v(a.mostRecentlyFocusedNode), S = a.containerGroups[I].tabbableNodes;
          if (S.length > 0) {
            var R = S.findIndex(function(M) {
              return M === a.mostRecentlyFocusedNode;
            });
            R >= 0 && (l.isKeyForward(a.recentNavEvent) ? R + 1 < S.length && (C = S[R + 1], P = !1) : R - 1 >= 0 && (C = S[R - 1], P = !1));
          }
        } else
          a.containerGroups.some(function(M) {
            return M.tabbableNodes.some(function(z) {
              return ne(z) > 0;
            });
          }) || (P = !1);
      else
        P = !1;
      P && (C = d({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: a.mostRecentlyFocusedNode,
        isBackward: l.isKeyBackward(a.recentNavEvent)
      })), c(C || a.mostRecentlyFocusedNode || x());
    }
    a.recentNavEvent = void 0;
  }, y = function(o) {
    var u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    a.recentNavEvent = o;
    var w = d({
      event: o,
      isBackward: u
    });
    w && (ge(o) && o.preventDefault(), c(w));
  }, N = function(o) {
    (l.isKeyForward(o) || l.isKeyBackward(o)) && y(o, l.isKeyBackward(o));
  }, h = function(o) {
    Qn(o) && pe(l.escapeDeactivates, o) !== !1 && (o.preventDefault(), m.deactivate());
  }, k = function(o) {
    var u = xe(o);
    v(u, o) >= 0 || pe(l.clickOutsideDeactivates, o) || pe(l.allowOutsideClick, o) || (o.preventDefault(), o.stopImmediatePropagation());
  }, A = function() {
    if (a.active)
      return ut.activateTrap(i, m), a.delayInitialFocusTimer = l.delayInitialFocus ? dt(function() {
        c(x());
      }) : c(x()), r.addEventListener("focusin", p, !0), r.addEventListener("mousedown", f, {
        capture: !0,
        passive: !1
      }), r.addEventListener("touchstart", f, {
        capture: !0,
        passive: !1
      }), r.addEventListener("click", k, {
        capture: !0,
        passive: !1
      }), r.addEventListener("keydown", N, {
        capture: !0,
        passive: !1
      }), r.addEventListener("keydown", h), m;
  }, H = function() {
    if (a.active)
      return r.removeEventListener("focusin", p, !0), r.removeEventListener("mousedown", f, !0), r.removeEventListener("touchstart", f, !0), r.removeEventListener("click", k, !0), r.removeEventListener("keydown", N, !0), r.removeEventListener("keydown", h), m;
  }, K = function(o) {
    var u = o.some(function(w) {
      var C = Array.from(w.removedNodes);
      return C.some(function(P) {
        return P === a.mostRecentlyFocusedNode;
      });
    });
    u && c(x());
  }, U = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(K) : void 0, W = function() {
    U && (U.disconnect(), a.active && !a.paused && a.containers.map(function(o) {
      U.observe(o, {
        subtree: !0,
        childList: !0
      });
    }));
  };
  return m = {
    get active() {
      return a.active;
    },
    get paused() {
      return a.paused;
    },
    activate: function(o) {
      if (a.active)
        return this;
      var u = s(o, "onActivate"), w = s(o, "onPostActivate"), C = s(o, "checkCanFocusTrap");
      C || T(), a.active = !0, a.paused = !1, a.nodeFocusedBeforeActivation = r.activeElement, u == null || u();
      var P = function() {
        C && T(), A(), W(), w == null || w();
      };
      return C ? (C(a.containers.concat()).then(P, P), this) : (P(), this);
    },
    deactivate: function(o) {
      if (!a.active)
        return this;
      var u = ot({
        onDeactivate: l.onDeactivate,
        onPostDeactivate: l.onPostDeactivate,
        checkCanReturnFocus: l.checkCanReturnFocus
      }, o);
      clearTimeout(a.delayInitialFocusTimer), a.delayInitialFocusTimer = void 0, H(), a.active = !1, a.paused = !1, W(), ut.deactivateTrap(i, m);
      var w = s(u, "onDeactivate"), C = s(u, "onPostDeactivate"), P = s(u, "checkCanReturnFocus"), I = s(u, "returnFocus", "returnFocusOnDeactivate");
      w == null || w();
      var S = function() {
        dt(function() {
          I && c(g(a.nodeFocusedBeforeActivation)), C == null || C();
        });
      };
      return I && P ? (P(g(a.nodeFocusedBeforeActivation)).then(S, S), this) : (S(), this);
    },
    pause: function(o) {
      if (a.paused || !a.active)
        return this;
      var u = s(o, "onPause"), w = s(o, "onPostPause");
      return a.paused = !0, u == null || u(), H(), W(), w == null || w(), this;
    },
    unpause: function(o) {
      if (!a.paused || !a.active)
        return this;
      var u = s(o, "onUnpause"), w = s(o, "onPostUnpause");
      return a.paused = !1, u == null || u(), T(), A(), W(), w == null || w(), this;
    },
    updateContainerElements: function(o) {
      var u = [].concat(o).filter(Boolean);
      return a.containers = u.map(function(w) {
        return typeof w == "string" ? r.querySelector(w) : w;
      }), a.active && T(), W(), this;
    }
  }, m.updateContainerElements(e), m;
};
function Ut(t, e, n) {
  let r = null;
  return t && (r = rr(t, {
    clickOutsideDeactivates: !e,
    escapeDeactivates: !e,
    onDeactivate: () => n == null ? void 0 : n(),
    fallbackFocus: () => t
  }), r.activate()), { deactivate: () => {
    r == null || r.deactivate(), r = null;
  }, wrapper: t };
}
const ar = ({ modalContext: t, config: e, children: n }) => {
  const [r, i] = $(!1), l = j(null), [a, m] = $(null);
  function s() {
    m(Ut(l.current, e == null ? void 0 : e.closeExplicitly, () => t.close())), i(!0);
  }
  return D(() => () => a == null ? void 0 : a.deactivate(), [a]), /* @__PURE__ */ F("div", { className: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4", children: /* @__PURE__ */ F(
    "div",
    {
      className: Se("im-modal-positioner flex min-h-full justify-center", {
        "items-start": e.position === "top",
        "items-center": e.position === "center",
        "items-end": e.position === "bottom"
      }),
      children: /* @__PURE__ */ F(
        Ue,
        {
          as: "div",
          ref: l,
          enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          enterTo: "opacity-100 translate-y-0 sm:scale-100",
          leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
          leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          afterEnter: s,
          afterLeave: t.afterLeave,
          className: Se(
            "im-modal-wrapper pointer-events-auto w-full transition duration-300 ease-in-out",
            t.onTopOfStack ? "" : "blur-sm",
            {
              "sm:max-w-sm": e.maxWidth === "sm",
              "sm:max-w-md": e.maxWidth === "md",
              "sm:max-w-md md:max-w-lg": e.maxWidth === "lg",
              "sm:max-w-md md:max-w-xl": e.maxWidth === "xl",
              "sm:max-w-md md:max-w-xl lg:max-w-2xl": e.maxWidth === "2xl",
              "sm:max-w-md md:max-w-xl lg:max-w-3xl": e.maxWidth === "3xl",
              "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl": e.maxWidth === "4xl",
              "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl": e.maxWidth === "5xl",
              "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl": e.maxWidth === "6xl",
              "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl": e.maxWidth === "7xl"
            }
          ),
          children: /* @__PURE__ */ le(
            "div",
            {
              className: `im-modal-content relative ${e.paddingClasses} ${e.panelClasses}`,
              "data-inertiaui-modal-entered": r,
              children: [
                e.closeButton && /* @__PURE__ */ F("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ F($t, { onClick: t.close }) }),
                typeof n == "function" ? n({ modalContext: t, config: e }) : n
              ]
            }
          )
        }
      )
    }
  ) });
}, ir = ({ modalContext: t, config: e, children: n }) => {
  const [r, i] = $(!1), l = j(null), [a, m] = $(null);
  function s() {
    m(Ut(l.current, e == null ? void 0 : e.closeExplicitly, () => t.close())), i(!0);
  }
  return D(() => () => a == null ? void 0 : a.deactivate(), [a]), /* @__PURE__ */ F("div", { className: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ F(
    "div",
    {
      className: Se("im-slideover-positioner flex min-h-full items-center", {
        "justify-start rtl:justify-end": (e == null ? void 0 : e.position) === "left",
        "justify-end rtl:justify-start": (e == null ? void 0 : e.position) === "right"
      }),
      children: /* @__PURE__ */ F(
        Ue,
        {
          as: "div",
          ref: l,
          enterFrom: `opacity-0 ${e.position === "left" ? "-translate-x-full" : "translate-x-full"}`,
          enterTo: "opacity-100 translate-x-0",
          leaveFrom: "opacity-100 translate-x-0",
          leaveTo: `opacity-0 ${e.position === "left" ? "-translate-x-full" : "translate-x-full"}`,
          afterEnter: s,
          afterLeave: t.afterLeave,
          className: Se(
            "im-slideover-wrapper pointer-events-auto w-full transition duration-300 ease-in-out",
            t.onTopOfStack ? "" : "blur-sm",
            {
              "sm:max-w-sm": e.maxWidth === "sm",
              "sm:max-w-md": e.maxWidth === "md",
              "sm:max-w-md md:max-w-lg": e.maxWidth === "lg",
              "sm:max-w-md md:max-w-xl": e.maxWidth === "xl",
              "sm:max-w-md md:max-w-xl lg:max-w-2xl": e.maxWidth === "2xl",
              "sm:max-w-md md:max-w-xl lg:max-w-3xl": e.maxWidth === "3xl",
              "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl": e.maxWidth === "4xl",
              "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl": e.maxWidth === "5xl",
              "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl": e.maxWidth === "6xl",
              "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl": e.maxWidth === "7xl"
            }
          ),
          children: /* @__PURE__ */ le(
            "div",
            {
              className: `im-slideover-content relative ${e.paddingClasses} ${e.panelClasses}`,
              "data-inertiaui-modal-entered": r,
              children: [
                e.closeButton && /* @__PURE__ */ F("div", { className: "absolute right-0 top-0 pr-3 pt-3", children: /* @__PURE__ */ F($t, { onClick: t.close }) }),
                typeof n == "function" ? n({ modalContext: t, config: e }) : n
              ]
            }
          )
        }
      )
    }
  ) });
}, lr = Ze(({ name: t, children: e, onFocus: n = null, onBlur: r = null, onClose: i = null, onSuccess: l = null, onAfterLeave: a = null, ...m }, s) => {
  const v = (x) => typeof e == "function" ? e(x) : e, b = j(null);
  return D(() => {
    var x;
    if (((x = b == null ? void 0 : b.current) == null ? void 0 : x.index) === 0)
      return nt.prepare(), () => nt.cleanup();
  }, [b]), ct(s, () => b.current, [b]), /* @__PURE__ */ F(
    bt,
    {
      ref: b,
      name: t,
      onFocus: n,
      onBlur: r,
      onClose: i,
      onSuccess: l,
      ...m,
      children: ({
        afterLeave: x,
        close: T,
        config: E,
        emit: c,
        getChildModal: g,
        getParentModal: d,
        id: f,
        index: p,
        isOpen: y,
        modalContext: N,
        onTopOfStack: h,
        reload: k,
        setOpen: A,
        shouldRender: H
      }) => /* @__PURE__ */ F(
        Kn,
        {
          appear: !0,
          show: y ?? !1,
          afterLeave: a,
          children: /* @__PURE__ */ le(
            "div",
            {
              className: "im-dialog relative z-20",
              "data-inertiaui-modal-id": f,
              "data-inertiaui-modal-index": p,
              children: [
                p === 0 ? /* @__PURE__ */ F(
                  Ue,
                  {
                    enter: "transition transform ease-in-out duration-300",
                    enterFrom: "opacity-0",
                    enterTo: "opacity-100",
                    leave: "transition transform ease-in-out duration-300",
                    leaveFrom: "opacity-100",
                    leaveTo: "opacity-0",
                    children: h ? /* @__PURE__ */ F(
                      "div",
                      {
                        className: "im-backdrop fixed inset-0 z-30 bg-black/75",
                        "aria-hidden": "true"
                      }
                    ) : /* @__PURE__ */ F("div", {})
                  }
                ) : null,
                p > 0 && h ? /* @__PURE__ */ F("div", { className: "im-backdrop fixed inset-0 z-30 bg-black/75" }) : null,
                E.slideover ? /* @__PURE__ */ F(
                  ir,
                  {
                    modalContext: N,
                    config: E,
                    children: v({
                      afterLeave: x,
                      close: T,
                      config: E,
                      emit: c,
                      getChildModal: g,
                      getParentModal: d,
                      id: f,
                      index: p,
                      isOpen: y,
                      modalContext: N,
                      onTopOfStack: h,
                      reload: k,
                      setOpen: A,
                      shouldRender: H
                    })
                  }
                ) : /* @__PURE__ */ F(
                  ar,
                  {
                    modalContext: N,
                    config: E,
                    children: v({
                      afterLeave: x,
                      close: T,
                      config: E,
                      emit: c,
                      getChildModal: g,
                      getParentModal: d,
                      id: f,
                      index: p,
                      isOpen: y,
                      modalContext: N,
                      onTopOfStack: h,
                      reload: k,
                      setOpen: A,
                      shouldRender: H
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
lr.displayName = "Modal";
const br = ({
  href: t,
  method: e = "get",
  data: n = {},
  as: r = "a",
  headers: i = {},
  queryStringArrayFormat: l = "brackets",
  onAfterLeave: a = null,
  onBlur: m = null,
  onClose: s = null,
  onError: v = null,
  onFocus: b = null,
  onStart: x = null,
  onSuccess: T = null,
  navigate: E = null,
  children: c,
  ...g
}) => {
  const [d, f] = $(!1), [p, y] = $(null), { stack: N, visit: h } = Ae(), k = Y(() => E ?? Je("navigate"), [E]), A = {}, H = {};
  Object.keys(g).forEach((u) => {
    rt.includes(u) || (u.startsWith("on") && typeof g[u] == "function" ? u.toLowerCase() in window ? A[u] = g[u] : H[u] = g[u] : A[u] = g[u]);
  });
  const [K, U] = $(!1);
  D(() => {
    p && (p.onTopOfStack && K ? b == null || b() : !p.onTopOfStack && !K && (m == null || m()), U(!p.onTopOfStack));
  }, [N]);
  const W = V(() => {
    s == null || s();
  }, [s]), O = V(() => {
    y(null), a == null || a();
  }, [a]), o = V(
    (u) => {
      u == null || u.preventDefault(), !d && (t.startsWith("#") || (f(!0), x == null || x()), h(
        t,
        e,
        n,
        i,
        Gt(ft(g, rt)),
        () => W(N.length),
        O,
        l,
        k
      ).then((w) => {
        y(w), w.registerEventListenersFromProps(H), T == null || T();
      }).catch((w) => {
        console.error(w), v == null || v(w);
      }).finally(() => f(!1)));
    },
    [t, e, n, i, l, g, W, O]
  );
  return /* @__PURE__ */ F(
    r,
    {
      ...A,
      href: t,
      onClick: o,
      children: typeof c == "function" ? c({ loading: d }) : c
    }
  );
};
function gr() {
  return Ae().stack[ht()] ?? null;
}
const yr = (t) => (e) => (e.default.layout = (n) => Ne(t, {}, n), e);
export {
  bt as HeadlessModal,
  lr as Modal,
  br as ModalLink,
  Qt as ModalRoot,
  Yt as ModalStackProvider,
  Je as getConfig,
  Jt as initFromPageProps,
  pr as putConfig,
  hr as renderApp,
  mr as resetConfig,
  yr as setPageLayout,
  gr as useModal,
  ht as useModalIndex,
  Ae as useModalStack
};
