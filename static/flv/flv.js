!function(e) {
    if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = e();
    else if ("function" == typeof define && define.amd)
        define([], e);
    else {
        var t;
        t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this,
            t.flvjs = e()
    }
}(function() {
    var e;
    return function() {
        function e(t, i, n) {
            function r(a, o) {
                if (!i[a]) {
                    if (!t[a]) {
                        var u = "function" == typeof require && require;
                        if (!o && u)
                            return u(a, !0);
                        if (s)
                            return s(a, !0);
                        var l = new Error("Cannot find module '" + a + "'");
                        throw l.code = "MODULE_NOT_FOUND",
                            l
                    }
                    var d = i[a] = {
                        exports: {}
                    };
                    t[a][0].call(d.exports, function(e) {
                        return r(t[a][1][e] || e)
                    }, d, d.exports, e, t, i, n)
                }
                return i[a].exports
            }
            for (var s = "function" == typeof require && require, a = 0; a < n.length; a++)
                r(n[a]);
            return r
        }
        return e
    }()({
        1: [function(t, i, n) {
            (function(r, s) {
                    !function(t, r) {
                        "object" == typeof n && void 0 !== i ? i.exports = r() : "function" == typeof e && e.amd ? e(r) : t.ES6Promise = r()
                    }(this, function() {
                        "use strict";
                        function e(e) {
                            var t = typeof e;
                            return null !== e && ("object" === t || "function" === t)
                        }
                        function i(e) {
                            return "function" == typeof e
                        }
                        function n(e) {
                            F = e
                        }
                        function a(e) {
                            G = e
                        }
                        function o() {
                            return void 0 !== N ? function() {
                                    N(l)
                                }
                                : u()
                        }
                        function u() {
                            var e = setTimeout;
                            return function() {
                                return e(l, 1)
                            }
                        }
                        function l() {
                            for (var e = 0; e < U; e += 2) {
                                (0,
                                    W[e])(W[e + 1]),
                                    W[e] = void 0,
                                    W[e + 1] = void 0
                            }
                            U = 0
                        }
                        function d(e, t) {
                            var i = this
                                , n = new this.constructor(f);
                            void 0 === n[Y] && T(n);
                            var r = i._state;
                            if (r) {
                                var s = arguments[r - 1];
                                G(function() {
                                    return R(r, n, s, i._result)
                                })
                            } else
                                k(i, n, e, t);
                            return n
                        }
                        function h(e) {
                            var t = this;
                            if (e && "object" == typeof e && e.constructor === t)
                                return e;
                            var i = new t(f);
                            return y(i, e),
                                i
                        }
                        function f() {}
                        function c() {
                            return new TypeError("You cannot resolve a promise with itself")
                        }
                        function _() {
                            return new TypeError("A promises callback cannot return that same promise.")
                        }
                        function m(e, t, i, n) {
                            try {
                                e.call(t, i, n)
                            } catch (e) {
                                return e
                            }
                        }
                        function p(e, t, i) {
                            G(function(e) {
                                var n = !1
                                    , r = m(i, t, function(i) {
                                    n || (n = !0,
                                        t !== i ? y(e, i) : b(e, i))
                                }, function(t) {
                                    n || (n = !0,
                                        S(e, t))
                                }, "Settle: " + (e._label || " unknown promise"));
                                !n && r && (n = !0,
                                    S(e, r))
                            }, e)
                        }
                        function v(e, t) {
                            t._state === Q ? b(e, t._result) : t._state === J ? S(e, t._result) : k(t, void 0, function(t) {
                                return y(e, t)
                            }, function(t) {
                                return S(e, t)
                            })
                        }
                        function g(e, t, n) {
                            t.constructor === e.constructor && n === d && t.constructor.resolve === h ? v(e, t) : void 0 === n ? b(e, t) : i(n) ? p(e, t, n) : b(e, t)
                        }
                        function y(t, i) {
                            if (t === i)
                                S(t, c());
                            else if (e(i)) {
                                var n = void 0;
                                try {
                                    n = i.then
                                } catch (e) {
                                    return void S(t, e)
                                }
                                g(t, i, n)
                            } else
                                b(t, i)
                        }
                        function E(e) {
                            e._onerror && e._onerror(e._result),
                                L(e)
                        }
                        function b(e, t) {
                            e._state === Z && (e._result = t,
                                e._state = Q,
                            0 !== e._subscribers.length && G(L, e))
                        }
                        function S(e, t) {
                            e._state === Z && (e._state = J,
                                e._result = t,
                                G(E, e))
                        }
                        function k(e, t, i, n) {
                            var r = e._subscribers
                                , s = r.length;
                            e._onerror = null,
                                r[s] = t,
                                r[s + Q] = i,
                                r[s + J] = n,
                            0 === s && e._state && G(L, e)
                        }
                        function L(e) {
                            var t = e._subscribers
                                , i = e._state;
                            if (0 !== t.length) {
                                for (var n = void 0, r = void 0, s = e._result, a = 0; a < t.length; a += 3)
                                    n = t[a],
                                        r = t[a + i],
                                        n ? R(i, n, r, s) : r(s);
                                e._subscribers.length = 0
                            }
                        }
                        function R(e, t, n, r) {
                            var s = i(n)
                                , a = void 0
                                , o = void 0
                                , u = !0;
                            if (s) {
                                try {
                                    a = n(r)
                                } catch (e) {
                                    u = !1,
                                        o = e
                                }
                                if (t === a)
                                    return void S(t, _())
                            } else
                                a = r;
                            t._state !== Z || (s && u ? y(t, a) : !1 === u ? S(t, o) : e === Q ? b(t, a) : e === J && S(t, a))
                        }
                        function A(e, t) {
                            try {
                                t(function(t) {
                                    y(e, t)
                                }, function(t) {
                                    S(e, t)
                                })
                            } catch (t) {
                                S(e, t)
                            }
                        }
                        function w() {
                            return $++
                        }
                        function T(e) {
                            e[Y] = $++,
                                e._state = void 0,
                                e._result = void 0,
                                e._subscribers = []
                        }
                        function O() {
                            return new Error("Array Methods must be provided an Array")
                        }
                        function C(e) {
                            return new ee(this,e).promise
                        }
                        function I(e) {
                            var t = this;
                            return new t(P(e) ? function(i, n) {
                                    for (var r = e.length, s = 0; s < r; s++)
                                        t.resolve(e[s]).then(i, n)
                                }
                                : function(e, t) {
                                    return t(new TypeError("You must pass an array to race."))
                                }
                            )
                        }
                        function D(e) {
                            var t = this
                                , i = new t(f);
                            return S(i, e),
                                i
                        }
                        function x() {
                            throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                        }
                        function M() {
                            throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
                        }
                        function B() {
                            var e = void 0;
                            if (void 0 !== s)
                                e = s;
                            else if ("undefined" != typeof self)
                                e = self;
                            else
                                try {
                                    e = Function("return this")()
                                } catch (e) {
                                    throw new Error("polyfill failed because global object is unavailable in this environment")
                                }
                            var t = e.Promise;
                            if (t) {
                                var i = null;
                                try {
                                    i = Object.prototype.toString.call(t.resolve())
                                } catch (e) {}
                                if ("[object Promise]" === i && !t.cast)
                                    return
                            }
                            e.Promise = te
                        }
                        var j = void 0;
                        j = Array.isArray ? Array.isArray : function(e) {
                            return "[object Array]" === Object.prototype.toString.call(e)
                        }
                        ;
                        var P = j
                            , U = 0
                            , N = void 0
                            , F = void 0
                            , G = function(e, t) {
                            W[U] = e,
                                W[U + 1] = t,
                            2 === (U += 2) && (F ? F(l) : X())
                        }
                            , V = "undefined" != typeof window ? window : void 0
                            , z = V || {}
                            , H = z.MutationObserver || z.WebKitMutationObserver
                            , K = "undefined" == typeof self && void 0 !== r && "[object process]" === {}.toString.call(r)
                            , q = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel
                            , W = new Array(1e3)
                            , X = void 0;
                        X = K ? function() {
                            return function() {
                                return r.nextTick(l)
                            }
                        }() : H ? function() {
                            var e = 0
                                , t = new H(l)
                                , i = document.createTextNode("");
                            return t.observe(i, {
                                characterData: !0
                            }),
                                function() {
                                    i.data = e = ++e % 2
                                }
                        }() : q ? function() {
                            var e = new MessageChannel;
                            return e.port1.onmessage = l,
                                function() {
                                    return e.port2.postMessage(0)
                                }
                        }() : void 0 === V && "function" == typeof t ? function() {
                            try {
                                var e = Function("return this")().require("vertx");
                                return N = e.runOnLoop || e.runOnContext,
                                    o()
                            } catch (e) {
                                return u()
                            }
                        }() : u();
                        var Y = Math.random().toString(36).substring(2)
                            , Z = void 0
                            , Q = 1
                            , J = 2
                            , $ = 0
                            , ee = function() {
                            function e(e, t) {
                                this._instanceConstructor = e,
                                    this.promise = new e(f),
                                this.promise[Y] || T(this.promise),
                                    P(t) ? (this.length = t.length,
                                        this._remaining = t.length,
                                        this._result = new Array(this.length),
                                        0 === this.length ? b(this.promise, this._result) : (this.length = this.length || 0,
                                            this._enumerate(t),
                                        0 === this._remaining && b(this.promise, this._result))) : S(this.promise, O())
                            }
                            return e.prototype._enumerate = function(e) {
                                for (var t = 0; this._state === Z && t < e.length; t++)
                                    this._eachEntry(e[t], t)
                            }
                                ,
                                e.prototype._eachEntry = function(e, t) {
                                    var i = this._instanceConstructor
                                        , n = i.resolve;
                                    if (n === h) {
                                        var r = void 0
                                            , s = void 0
                                            , a = !1;
                                        try {
                                            r = e.then
                                        } catch (e) {
                                            a = !0,
                                                s = e
                                        }
                                        if (r === d && e._state !== Z)
                                            this._settledAt(e._state, t, e._result);
                                        else if ("function" != typeof r)
                                            this._remaining--,
                                                this._result[t] = e;
                                        else if (i === te) {
                                            var o = new i(f);
                                            a ? S(o, s) : g(o, e, r),
                                                this._willSettleAt(o, t)
                                        } else
                                            this._willSettleAt(new i(function(t) {
                                                    return t(e)
                                                }
                                            ), t)
                                    } else
                                        this._willSettleAt(n(e), t)
                                }
                                ,
                                e.prototype._settledAt = function(e, t, i) {
                                    var n = this.promise;
                                    n._state === Z && (this._remaining--,
                                        e === J ? S(n, i) : this._result[t] = i),
                                    0 === this._remaining && b(n, this._result)
                                }
                                ,
                                e.prototype._willSettleAt = function(e, t) {
                                    var i = this;
                                    k(e, void 0, function(e) {
                                        return i._settledAt(Q, t, e)
                                    }, function(e) {
                                        return i._settledAt(J, t, e)
                                    })
                                }
                                ,
                                e
                        }()
                            , te = function() {
                            function e(t) {
                                this[Y] = w(),
                                    this._result = this._state = void 0,
                                    this._subscribers = [],
                                f !== t && ("function" != typeof t && x(),
                                    this instanceof e ? A(this, t) : M())
                            }
                            return e.prototype.catch = function(e) {
                                return this.then(null, e)
                            }
                                ,
                                e.prototype.finally = function(e) {
                                    var t = this
                                        , n = t.constructor;
                                    return i(e) ? t.then(function(t) {
                                        return n.resolve(e()).then(function() {
                                            return t
                                        })
                                    }, function(t) {
                                        return n.resolve(e()).then(function() {
                                            throw t
                                        })
                                    }) : t.then(e, e)
                                }
                                ,
                                e
                        }();
                        return te.prototype.then = d,
                            te.all = C,
                            te.race = I,
                            te.resolve = h,
                            te.reject = D,
                            te._setScheduler = n,
                            te._setAsap = a,
                            te._asap = G,
                            te.polyfill = B,
                            te.Promise = te,
                            te
                    })
                }
            ).call(this, t("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }
            , {
                _process: 3
            }],
        2: [function(e, t, i) {
            function n() {
                this._events = this._events || {},
                    this._maxListeners = this._maxListeners || void 0
            }
            function r(e) {
                return "function" == typeof e
            }
            function s(e) {
                return "number" == typeof e
            }
            function a(e) {
                return "object" == typeof e && null !== e
            }
            function o(e) {
                return void 0 === e
            }
            t.exports = n,
                n.EventEmitter = n,
                n.prototype._events = void 0,
                n.prototype._maxListeners = void 0,
                n.defaultMaxListeners = 10,
                n.prototype.setMaxListeners = function(e) {
                    if (!s(e) || e < 0 || isNaN(e))
                        throw TypeError("n must be a positive number");
                    return this._maxListeners = e,
                        this
                }
                ,
                n.prototype.emit = function(e) {
                    var t, i, n, s, u, l;
                    if (this._events || (this._events = {}),
                    "error" === e && (!this._events.error || a(this._events.error) && !this._events.error.length)) {
                        if ((t = arguments[1])instanceof Error)
                            throw t;
                        var d = new Error('Uncaught, unspecified "error" event. (' + t + ")");
                        throw d.context = t,
                            d
                    }
                    if (i = this._events[e],
                        o(i))
                        return !1;
                    if (r(i))
                        switch (arguments.length) {
                            case 1:
                                i.call(this);
                                break;
                            case 2:
                                i.call(this, arguments[1]);
                                break;
                            case 3:
                                i.call(this, arguments[1], arguments[2]);
                                break;
                            default:
                                s = Array.prototype.slice.call(arguments, 1),
                                    i.apply(this, s)
                        }
                    else if (a(i))
                        for (s = Array.prototype.slice.call(arguments, 1),
                                 l = i.slice(),
                                 n = l.length,
                                 u = 0; u < n; u++)
                            l[u].apply(this, s);
                    return !0
                }
                ,
                n.prototype.addListener = function(e, t) {
                    var i;
                    if (!r(t))
                        throw TypeError("listener must be a function");
                    return this._events || (this._events = {}),
                    this._events.newListener && this.emit("newListener", e, r(t.listener) ? t.listener : t),
                        this._events[e] ? a(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t,
                    a(this._events[e]) && !this._events[e].warned && (i = o(this._maxListeners) ? n.defaultMaxListeners : this._maxListeners) && i > 0 && this._events[e].length > i && (this._events[e].warned = !0,
                        console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length),
                    "function" == typeof console.trace && console.trace()),
                        this
                }
                ,
                n.prototype.on = n.prototype.addListener,
                n.prototype.once = function(e, t) {
                    function i() {
                        this.removeListener(e, i),
                        n || (n = !0,
                            t.apply(this, arguments))
                    }
                    if (!r(t))
                        throw TypeError("listener must be a function");
                    var n = !1;
                    return i.listener = t,
                        this.on(e, i),
                        this
                }
                ,
                n.prototype.removeListener = function(e, t) {
                    var i, n, s, o;
                    if (!r(t))
                        throw TypeError("listener must be a function");
                    if (!this._events || !this._events[e])
                        return this;
                    if (i = this._events[e],
                        s = i.length,
                        n = -1,
                    i === t || r(i.listener) && i.listener === t)
                        delete this._events[e],
                        this._events.removeListener && this.emit("removeListener", e, t);
                    else if (a(i)) {
                        for (o = s; o-- > 0; )
                            if (i[o] === t || i[o].listener && i[o].listener === t) {
                                n = o;
                                break
                            }
                        if (n < 0)
                            return this;
                        1 === i.length ? (i.length = 0,
                            delete this._events[e]) : i.splice(n, 1),
                        this._events.removeListener && this.emit("removeListener", e, t)
                    }
                    return this
                }
                ,
                n.prototype.removeAllListeners = function(e) {
                    var t, i;
                    if (!this._events)
                        return this;
                    if (!this._events.removeListener)
                        return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e],
                            this;
                    if (0 === arguments.length) {
                        for (t in this._events)
                            "removeListener" !== t && this.removeAllListeners(t);
                        return this.removeAllListeners("removeListener"),
                            this._events = {},
                            this
                    }
                    if (i = this._events[e],
                        r(i))
                        this.removeListener(e, i);
                    else if (i)
                        for (; i.length; )
                            this.removeListener(e, i[i.length - 1]);
                    return delete this._events[e],
                        this
                }
                ,
                n.prototype.listeners = function(e) {
                    return this._events && this._events[e] ? r(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
                }
                ,
                n.prototype.listenerCount = function(e) {
                    if (this._events) {
                        var t = this._events[e];
                        if (r(t))
                            return 1;
                        if (t)
                            return t.length
                    }
                    return 0
                }
                ,
                n.listenerCount = function(e, t) {
                    return e.listenerCount(t)
                }
        }
            , {}],
        3: [function(e, t, i) {
            function n() {
                throw new Error("setTimeout has not been defined")
            }
            function r() {
                throw new Error("clearTimeout has not been defined")
            }
            function s(e) {
                if (h === setTimeout)
                    return setTimeout(e, 0);
                if ((h === n || !h) && setTimeout)
                    return h = setTimeout,
                        setTimeout(e, 0);
                try {
                    return h(e, 0)
                } catch (t) {
                    try {
                        return h.call(null, e, 0)
                    } catch (t) {
                        return h.call(this, e, 0)
                    }
                }
            }
            function a(e) {
                if (f === clearTimeout)
                    return clearTimeout(e);
                if ((f === r || !f) && clearTimeout)
                    return f = clearTimeout,
                        clearTimeout(e);
                try {
                    return f(e)
                } catch (t) {
                    try {
                        return f.call(null, e)
                    } catch (t) {
                        return f.call(this, e)
                    }
                }
            }
            function o() {
                p && _ && (p = !1,
                    _.length ? m = _.concat(m) : v = -1,
                m.length && u())
            }
            function u() {
                if (!p) {
                    var e = s(o);
                    p = !0;
                    for (var t = m.length; t; ) {
                        for (_ = m,
                                 m = []; ++v < t; )
                            _ && _[v].run();
                        v = -1,
                            t = m.length
                    }
                    _ = null,
                        p = !1,
                        a(e)
                }
            }
            function l(e, t) {
                this.fun = e,
                    this.array = t
            }
            function d() {}
            var h, f, c = t.exports = {};
            !function() {
                try {
                    h = "function" == typeof setTimeout ? setTimeout : n
                } catch (e) {
                    h = n
                }
                try {
                    f = "function" == typeof clearTimeout ? clearTimeout : r
                } catch (e) {
                    f = r
                }
            }();
            var _, m = [], p = !1, v = -1;
            c.nextTick = function(e) {
                var t = new Array(arguments.length - 1);
                if (arguments.length > 1)
                    for (var i = 1; i < arguments.length; i++)
                        t[i - 1] = arguments[i];
                m.push(new l(e,t)),
                1 !== m.length || p || s(u)
            }
                ,
                l.prototype.run = function() {
                    this.fun.apply(null, this.array)
                }
                ,
                c.title = "browser",
                c.browser = !0,
                c.env = {},
                c.argv = [],
                c.version = "",
                c.versions = {},
                c.on = d,
                c.addListener = d,
                c.once = d,
                c.off = d,
                c.removeListener = d,
                c.removeAllListeners = d,
                c.emit = d,
                c.prependListener = d,
                c.prependOnceListener = d,
                c.listeners = function(e) {
                    return []
                }
                ,
                c.binding = function(e) {
                    throw new Error("process.binding is not supported")
                }
                ,
                c.cwd = function() {
                    return "/"
                }
                ,
                c.chdir = function(e) {
                    throw new Error("process.chdir is not supported")
                }
                ,
                c.umask = function() {
                    return 0
                }
        }
            , {}],
        4: [function(e, t, i) {
            var n = arguments[3]
                , r = arguments[4]
                , s = arguments[5]
                , a = JSON.stringify;
            t.exports = function(e, t) {
                function i(e) {
                    p[e] = !0;
                    for (var t in r[e][1]) {
                        var n = r[e][1][t];
                        p[n] || i(n)
                    }
                }
                for (var o, u = Object.keys(s), l = 0, d = u.length; l < d; l++) {
                    var h = u[l]
                        , f = s[h].exports;
                    if (f === e || f && f.default === e) {
                        o = h;
                        break
                    }
                }
                if (!o) {
                    o = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);
                    for (var c = {}, l = 0, d = u.length; l < d; l++) {
                        var h = u[l];
                        c[h] = h
                    }
                    r[o] = ["function(require,module,exports){" + e + "(self); }", c]
                }
                var _ = Math.floor(Math.pow(16, 8) * Math.random()).toString(16)
                    , m = {};
                m[o] = o,
                    r[_] = ["function(require,module,exports){var f = require(" + a(o) + ");(f.default ? f.default : f)(self);}", m];
                var p = {};
                i(_);
                var v = "(" + n + ")({" + Object.keys(p).map(function(e) {
                    return a(e) + ":[" + r[e][0] + "," + a(r[e][1]) + "]"
                }).join(",") + "},{},[" + a(_) + "])"
                    , g = window.URL || window.webkitURL || window.mozURL || window.msURL
                    , y = new Blob([v],{
                    type: "text/javascript"
                });
                if (t && t.bare)
                    return y;
                var E = g.createObjectURL(y)
                    , b = new Worker(E);
                return b.objectURL = E,
                    b
            }
        }
            , {}],
        5: [function(e, t, i) {
            "use strict";
            function n() {
                return Object.assign({}, r)
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            }),
                i.createDefaultConfig = n;
            var r = i.defaultConfig = {
                enableWorker: !1,
                enableStashBuffer: !0,
                stashInitialSize: void 0,
                isLive: !1,
                lazyLoad: !0,
                lazyLoadMaxDuration: 180,
                lazyLoadRecoverDuration: 30,
                deferLoadAfterSourceOpen: !0,
                autoCleanupMaxBackwardDuration: 180,
                autoCleanupMinBackwardDuration: 120,
                statisticsInfoReportInterval: 600,
                fixAudioTimestampGap: !0,
                accurateSeek: !1,
                seekType: "range",
                seekParamStart: "bstart",
                seekParamEnd: "bend",
                rangeLoadZeroStart: !1,
                customSeekHandler: void 0,
                reuseRedirectedURL: !1,
                headers: void 0,
                customLoader: void 0
            }
        }
            , {}],
        6: [function(e, t, i) {
            "use strict";
            function n(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var r = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                        "value"in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i),
                    n && e(t, n),
                        t
                }
            }()
                , s = e("../io/io-controller.js")
                , a = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(s)
                , o = e("../config.js")
                , u = function() {
                function e() {
                    n(this, e)
                }
                return r(e, null, [{
                    key: "supportMSEH264Playback",
                    value: function() {
                        return window.MediaSource && window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"')
                    }
                }, {
                    key: "supportNetworkStreamIO",
                    value: function() {
                        var e = new a.default({},(0,
                            o.createDefaultConfig)())
                            , t = e.loaderType;
                        return e.destroy(),
                        "fetch-stream-loader" == t || "xhr-moz-chunked-loader" == t
                    }
                }, {
                    key: "getNetworkLoaderTypeName",
                    value: function() {
                        var e = new a.default({},(0,
                            o.createDefaultConfig)())
                            , t = e.loaderType;
                        return e.destroy(),
                            t
                    }
                }, {
                    key: "supportNativeMediaPlayback",
                    value: function(t) {
                        void 0 == e.videoElement && (e.videoElement = window.document.createElement("video"));
                        var i = e.videoElement.canPlayType(t);
                        return "probably" === i || "maybe" == i
                    }
                }, {
                    key: "getFeatureList",
                    value: function() {
                        var t = {
                            mseFlvPlayback: !1,
                            mseLiveFlvPlayback: !1,
                            networkStreamIO: !1,
                            networkLoaderName: "",
                            nativeMP4H264Playback: !1,
                            nativeWebmVP8Playback: !1,
                            nativeWebmVP9Playback: !1
                        };
                        return t.mseFlvPlayback = e.supportMSEH264Playback(),
                            t.networkStreamIO = e.supportNetworkStreamIO(),
                            t.networkLoaderName = e.getNetworkLoaderTypeName(),
                            t.mseLiveFlvPlayback = t.mseFlvPlayback && t.networkStreamIO,
                            t.nativeMP4H264Playback = e.supportNativeMediaPlayback('video/mp4; codecs="avc1.42001E, mp4a.40.2"'),
                            t.nativeWebmVP8Playback = e.supportNativeMediaPlayback('video/webm; codecs="vp8.0, vorbis"'),
                            t.nativeWebmVP9Playback = e.supportNativeMediaPlayback('video/webm; codecs="vp9"'),
                            t
                    }
                }]),
                    e
            }();
            i.default = u
        }
            , {
                "../config.js": 5,
                "../io/io-controller.js": 23
            }],
        7: [function(e, t, i) {
            "use strict";
            function n(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var r = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                        "value"in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i),
                    n && e(t, n),
                        t
                }
            }()
                , s = function() {
                function e() {
                    n(this, e),
                        this.mimeType = null,
                        this.duration = null,
                        this.hasAudio = null,
                        this.hasVideo = null,
                        this.audioCodec = null,
                        this.videoCodec = null,
                        this.audioDataRate = null,
                        this.videoDataRate = null,
                        this.audioSampleRate = null,
                        this.audioChannelCount = null,
                        this.width = null,
                        this.height = null,
                        this.fps = null,
                        this.profile = null,
                        this.level = null,
                        this.refFrames = null,
                        this.chromaFormat = null,
                        this.sarNum = null,
                        this.sarDen = null,
                        this.metadata = null,
                        this.segments = null,
                        this.segmentCount = null,
                        this.hasKeyframesIndex = null,
                        this.keyframesIndex = null
                }
                return r(e, [{
                    key: "isComplete",
                    value: function() {
                        var e = !1 === this.hasAudio || !0 === this.hasAudio && null != this.audioCodec && null != this.audioSampleRate && null != this.audioChannelCount
                            , t = !1 === this.hasVideo || !0 === this.hasVideo && null != this.videoCodec && null != this.width && null != this.height && null != this.fps && null != this.profile && null != this.level && null != this.refFrames && null != this.chromaFormat && null != this.sarNum && null != this.sarDen;
                        return null != this.mimeType && null != this.duration && null != this.metadata && null != this.hasKeyframesIndex && e && t
                    }
                }, {
                    key: "isSeekable",
                    value: function() {
                        return !0 === this.hasKeyframesIndex
                    }
                }, {
                    key: "getNearestKeyframe",
                    value: function(e) {
                        if (null == this.keyframesIndex)
                            return null;
                        var t = this.keyframesIndex
                            , i = this._search(t.times, e);
                        return {
                            index: i,
                            milliseconds: t.times[i],
                            fileposition: t.filepositions[i]
                        }
                    }
                }, {
                    key: "_search",
                    value: function(e, t) {
                        var i = 0
                            , n = e.length - 1
                            , r = 0
                            , s = 0
                            , a = n;
                        for (t < e[0] && (i = 0,
                            s = a + 1); s <= a; ) {
                            if ((r = s + Math.floor((a - s) / 2)) === n || t >= e[r] && t < e[r + 1]) {
                                i = r;
                                break
                            }
                            e[r] < t ? s = r + 1 : a = r - 1
                        }
                        return i
                    }
                }]),
                    e
            }();
            i.default = s
        }
            , {}],
        8: [function(e, t, i) {
            "use strict";
            function n(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var r = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                        "value"in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i),
                    n && e(t, n),
                        t
                }
            }();
            i.SampleInfo = function e(t, i, r, s, a) {
                n(this, e),
                    this.dts = t,
                    this.pts = i,
                    this.duration = r,
                    this.originalDts = s,
                    this.isSyncPoint = a,
                    this.fileposition = null
            }
                ,
                i.MediaSegmentInfo = function() {
                    function e() {
                        n(this, e),
                            this.beginDts = 0,
                            this.endDts = 0,
                            this.beginPts = 0,
                            this.endPts = 0,
                            this.originalBeginDts = 0,
                            this.originalEndDts = 0,
                            this.syncPoints = [],
                            this.firstSample = null,
                            this.lastSample = null
                    }
                    return r(e, [{
                        key: "appendSyncPoint",
                        value: function(e) {
                            e.isSyncPoint = !0,
                                this.syncPoints.push(e)
                        }
                    }]),
                        e
                }(),
                i.IDRSampleList = function() {
                    function e() {
                        n(this, e),
                            this._list = []
                    }
                    return r(e, [{
                        key: "clear",
                        value: function() {
                            this._list = []
                        }
                    }, {
                        key: "appendArray",
                        value: function(e) {
                            var t = this._list;
                            0 !== e.length && (t.length > 0 && e[0].originalDts < t[t.length - 1].originalDts && this.clear(),
                                Array.prototype.push.apply(t, e))
                        }
                    }, {
                        key: "getLastSyncPointBeforeDts",
                        value: function(e) {
                            if (0 == this._list.length)
                                return null;
                            var t = this._list
                                , i = 0
                                , n = t.length - 1
                                , r = 0
                                , s = 0
                                , a = n;
                            for (e < t[0].dts && (i = 0,
                                s = a + 1); s <= a; ) {
                                if ((r = s + Math.floor((a - s) / 2)) === n || e >= t[r].dts && e < t[r + 1].dts) {
                                    i = r;
                                    break
                                }
                                t[r].dts < e ? s = r + 1 : a = r - 1
                            }
                            return this._list[i]
                        }
                    }]),
                        e
                }(),
                i.MediaSegmentInfoList = function() {
                    function e(t) {
                        n(this, e),
                            this._type = t,
                            this._list = [],
                            this._lastAppendLocation = -1
                    }
                    return r(e, [{
                        key: "isEmpty",
                        value: function() {
                            return 0 === this._list.length
                        }
                    }, {
                        key: "clear",
                        value: function() {
                            this._list = [],
                                this._lastAppendLocation = -1
                        }
                    }, {
                        key: "_searchNearestSegmentBefore",
                        value: function(e) {
                            var t = this._list;
                            if (0 === t.length)
                                return -2;
                            var i = t.length - 1
                                , n = 0
                                , r = 0
                                , s = i
                                , a = 0;
                            if (e < t[0].originalBeginDts)
                                return a = -1;
                            for (; r <= s; ) {
                                if ((n = r + Math.floor((s - r) / 2)) === i || e > t[n].lastSample.originalDts && e < t[n + 1].originalBeginDts) {
                                    a = n;
                                    break
                                }
                                t[n].originalBeginDts < e ? r = n + 1 : s = n - 1
                            }
                            return a
                        }
                    }, {
                        key: "_searchNearestSegmentAfter",
                        value: function(e) {
                            return this._searchNearestSegmentBefore(e) + 1
                        }
                    }, {
                        key: "append",
                        value: function(e) {
                            var t = this._list
                                , i = e
                                , n = this._lastAppendLocation
                                , r = 0;
                            -1 !== n && n < t.length && i.originalBeginDts >= t[n].lastSample.originalDts && (n === t.length - 1 || n < t.length - 1 && i.originalBeginDts < t[n + 1].originalBeginDts) ? r = n + 1 : t.length > 0 && (r = this._searchNearestSegmentBefore(i.originalBeginDts) + 1),
                                this._lastAppendLocation = r,
                                this._list.splice(r, 0, i)
                        }
                    }, {
                        key: "getLastSegmentBefore",
                        value: function(e) {
                            var t = this._searchNearestSegmentBefore(e);
                            return t >= 0 ? this._list[t] : null
                        }
                    }, {
                        key: "getLastSampleBefore",
                        value: function(e) {
                            var t = this.getLastSegmentBefore(e);
                            return null != t ? t.lastSample : null
                        }
                    }, {
                        key: "getLastSyncPointBefore",
                        value: function(e) {
                            for (var t = this._searchNearestSegmentBefore(e), i = this._list[t].syncPoints; 0 === i.length && t > 0; )
                                t--,
                                    i = this._list[t].syncPoints;
                            return i.length > 0 ? i[i.length - 1] : null
                        }
                    }, {
                        key: "type",
                        get: function() {
                            return this._type
                        }
                    }, {
                        key: "length",
                        get: function() {
                            return this._list.length
                        }
                    }]),
                        e
                }()
        }
            , {}],
        9: [function(e, t, i) {
            "use strict";
            function n(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function r(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                        "value"in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i),
                    n && e(t, n),
                        t
                }
            }()
                , a = e("events")
                , o = n(a)
                , u = e("../utils/logger.js")
                , l = n(u)
                , d = e("../utils/browser.js")
                , h = n(d)
                , f = e("./mse-events.js")
                , c = n(f)
                , _ = e("./media-segment-info.js")
                , m = e("../utils/exception.js")
                , p = function() {
                function e(t) {
                    r(this, e),
                        this.TAG = "MSEController",
                        this._config = t,
                        this._emitter = new o.default,
                    this._config.isLive && void 0 == this._config.autoCleanupSourceBuffer && (this._config.autoCleanupSourceBuffer = !0),
                        this.e = {
                            onSourceOpen: this._onSourceOpen.bind(this),
                            onSourceEnded: this._onSourceEnded.bind(this),
                            onSourceClose: this._onSourceClose.bind(this),
                            onSourceBufferError: this._onSourceBufferError.bind(this),
                            onSourceBufferUpdateEnd: this._onSourceBufferUpdateEnd.bind(this)
                        },
                        this._mediaSource = null,
                        this._mediaSourceObjectURL = null,
                        this._mediaElement = null,
                        this._isBufferFull = !1,
                        this._hasPendingEos = !1,
                        this._requireSetMediaDuration = !1,
                        this._pendingMediaDuration = 0,
                        this._pendingSourceBufferInit = [],
                        this._mimeTypes = {
                            video: null,
                            audio: null
                        },
                        this._sourceBuffers = {
                            video: null,
                            audio: null
                        },
                        this._lastInitSegments = {
                            video: null,
                            audio: null
                        },
                        this._pendingSegments = {
                            video: [],
                            audio: []
                        },
                        this._pendingRemoveRanges = {
                            video: [],
                            audio: []
                        },
                        this._idrList = new _.IDRSampleList
                }
                return s(e, [{
                    key: "destroy",
                    value: function() {
                        (this._mediaElement || this._mediaSource) && this.detachMediaElement(),
                            this.e = null,
                            this._emitter.removeAllListeners(),
                            this._emitter = null
                    }
                }, {
                    key: "on",
                    value: function(e, t) {
                        this._emitter.addListener(e, t)
                    }
                }, {
                    key: "off",
                    value: function(e, t) {
                        this._emitter.removeListener(e, t)
                    }
                }, {
                    key: "attachMediaElement",
                    value: function(e) {
                        if (this._mediaSource)
                            throw new m.IllegalStateException("MediaSource has been attached to an HTMLMediaElement!");
                        var t = this._mediaSource = new window.MediaSource;
                        t.addEventListener("sourceopen", this.e.onSourceOpen),
                            t.addEventListener("sourceended", this.e.onSourceEnded),
                            t.addEventListener("sourceclose", this.e.onSourceClose),
                            this._mediaElement = e,
                            this._mediaSourceObjectURL = window.URL.createObjectURL(this._mediaSource),
                            e.src = this._mediaSourceObjectURL
                    }
                }, {
                    key: "detachMediaElement",
                    value: function() {
                        if (this._mediaSource) {
                            var e = this._mediaSource;
                            for (var t in this._sourceBuffers) {
                                var i = this._pendingSegments[t];
                                i.splice(0, i.length),
                                    this._pendingSegments[t] = null,
                                    this._pendingRemoveRanges[t] = null,
                                    this._lastInitSegments[t] = null;
                                var n = this._sourceBuffers[t];
                                if (n) {
                                    if ("closed" !== e.readyState) {
                                        try {
                                            e.removeSourceBuffer(n)
                                        } catch (e) {
                                            l.default.e(this.TAG, e.message)
                                        }
                                        n.removeEventListener("error", this.e.onSourceBufferError),
                                            n.removeEventListener("updateend", this.e.onSourceBufferUpdateEnd)
                                    }
                                    this._mimeTypes[t] = null,
                                        this._sourceBuffers[t] = null
                                }
                            }
                            if ("open" === e.readyState)
                                try {
                                    e.endOfStream()
                                } catch (e) {
                                    l.default.e(this.TAG, e.message)
                                }
                            e.removeEventListener("sourceopen", this.e.onSourceOpen),
                                e.removeEventListener("sourceended", this.e.onSourceEnded),
                                e.removeEventListener("sourceclose", this.e.onSourceClose),
                                this._pendingSourceBufferInit = [],
                                this._isBufferFull = !1,
                                this._idrList.clear(),
                                this._mediaSource = null
                        }
                        this._mediaElement && (this._mediaElement.src = "",
                            this._mediaElement.removeAttribute("src"),
                            this._mediaElement = null),
                        this._mediaSourceObjectURL && (window.URL.revokeObjectURL(this._mediaSourceObjectURL),
                            this._mediaSourceObjectURL = null)
                    }
                }, {
                    key: "appendInitSegment",
                    value: function(e, t) {
                        if (!this._mediaSource || "open" !== this._mediaSource.readyState)
                            return this._pendingSourceBufferInit.push(e),
                                void this._pendingSegments[e.type].push(e);
                        var i = e
                            , n = "" + i.container;
                        i.codec && i.codec.length > 0 && (n += ";codecs=" + i.codec);
                        var r = !1;
                        if (l.default.v(this.TAG, "Received Initialization Segment, mimeType: " + n),
                            this._lastInitSegments[i.type] = i,
                        n !== this._mimeTypes[i.type]) {
                            if (this._mimeTypes[i.type])
                                l.default.v(this.TAG, "Notice: " + i.type + " mimeType changed, origin: " + this._mimeTypes[i.type] + ", target: " + n);
                            else {
                                r = !0;
                                try {
                                    var s = this._sourceBuffers[i.type] = this._mediaSource.addSourceBuffer(n);
                                    s.addEventListener("error", this.e.onSourceBufferError),
                                        s.addEventListener("updateend", this.e.onSourceBufferUpdateEnd)
                                } catch (e) {
                                    return l.default.e(this.TAG, e.message),
                                        void this._emitter.emit(c.default.ERROR, {
                                            code: e.code,
                                            msg: e.message
                                        })
                                }
                            }
                            this._mimeTypes[i.type] = n
                        }
                        t || this._pendingSegments[i.type].push(i),
                        r || this._sourceBuffers[i.type] && !this._sourceBuffers[i.type].updating && this._doAppendSegments(),
                        h.default.safari && "audio/mpeg" === i.container && i.mediaDuration > 0 && (this._requireSetMediaDuration = !0,
                            this._pendingMediaDuration = i.mediaDuration / 1e3,
                            this._updateMediaSourceDuration())
                    }
                }, {
                    key: "appendMediaSegment",
                    value: function(e) {
                        var t = e;
                        this._pendingSegments[t.type].push(t),
                        this._config.autoCleanupSourceBuffer && this._needCleanupSourceBuffer() && this._doCleanupSourceBuffer();
                        var i = this._sourceBuffers[t.type];
                        !i || i.updating || this._hasPendingRemoveRanges() || this._doAppendSegments()
                    }
                }, {
                    key: "seek",
                    value: function(e) {
                        for (var t in this._sourceBuffers)
                            if (this._sourceBuffers[t]) {
                                var i = this._sourceBuffers[t];
                                if ("open" === this._mediaSource.readyState)
                                    try {
                                        i.abort()
                                    } catch (e) {
                                        l.default.e(this.TAG, e.message)
                                    }
                                this._idrList.clear();
                                var n = this._pendingSegments[t];
                                if (n.splice(0, n.length),
                                "closed" !== this._mediaSource.readyState) {
                                    for (var r = 0; r < i.buffered.length; r++) {
                                        var s = i.buffered.start(r)
                                            , a = i.buffered.end(r);
                                        this._pendingRemoveRanges[t].push({
                                            start: s,
                                            end: a
                                        })
                                    }
                                    if (i.updating || this._doRemoveRanges(),
                                        h.default.safari) {
                                        var o = this._lastInitSegments[t];
                                        o && (this._pendingSegments[t].push(o),
                                        i.updating || this._doAppendSegments())
                                    }
                                }
                            }
                    }
                }, {
                    key: "endOfStream",
                    value: function() {
                        var e = this._mediaSource
                            , t = this._sourceBuffers;
                        if (!e || "open" !== e.readyState)
                            return void (e && "closed" === e.readyState && this._hasPendingSegments() && (this._hasPendingEos = !0));
                        t.video && t.video.updating || t.audio && t.audio.updating ? this._hasPendingEos = !0 : (this._hasPendingEos = !1,
                            e.endOfStream())
                    }
                }, {
                    key: "getNearestKeyframe",
                    value: function(e) {
                        return this._idrList.getLastSyncPointBeforeDts(e)
                    }
                }, {
                    key: "_needCleanupSourceBuffer",
                    value: function() {
                        if (!this._config.autoCleanupSourceBuffer)
                            return !1;
                        var e = this._mediaElement.currentTime;
                        for (var t in this._sourceBuffers) {
                            var i = this._sourceBuffers[t];
                            if (i) {
                                var n = i.buffered;
                                if (n.length >= 1 && e - n.start(0) >= this._config.autoCleanupMaxBackwardDuration)
                                    return !0
                            }
                        }
                        return !1
                    }
                }, {
                    key: "_doCleanupSourceBuffer",
                    value: function() {
                        var e = this._mediaElement.currentTime;
                        for (var t in this._sourceBuffers) {
                            var i = this._sourceBuffers[t];
                            if (i) {
                                for (var n = i.buffered, r = !1, s = 0; s < n.length; s++) {
                                    var a = n.start(s)
                                        , o = n.end(s);
                                    if (a <= e && e < o + 3) {
                                        if (e - a >= this._config.autoCleanupMaxBackwardDuration) {
                                            r = !0;
                                            var u = e - this._config.autoCleanupMinBackwardDuration;
                                            this._pendingRemoveRanges[t].push({
                                                start: a,
                                                end: u
                                            })
                                        }
                                    } else
                                        o < e && (r = !0,
                                            this._pendingRemoveRanges[t].push({
                                                start: a,
                                                end: o
                                            }))
                                }
                                r && !i.updating && this._doRemoveRanges()
                            }
                        }
                    }
                }, {
                    key: "_updateMediaSourceDuration",
                    value: function() {
                        var e = this._sourceBuffers;
                        if (0 !== this._mediaElement.readyState && "open" === this._mediaSource.readyState && !(e.video && e.video.updating || e.audio && e.audio.updating)) {
                            var t = this._mediaSource.duration
                                , i = this._pendingMediaDuration;
                            i > 0 && (isNaN(t) || i > t) && (l.default.v(this.TAG, "Update MediaSource duration from " + t + " to " + i),
                                this._mediaSource.duration = i),
                                this._requireSetMediaDuration = !1,
                                this._pendingMediaDuration = 0
                        }
                    }
                }, {
                    key: "_doRemoveRanges",
                    value: function() {
                        for (var e in this._pendingRemoveRanges)
                            if (this._sourceBuffers[e] && !this._sourceBuffers[e].updating)
                                for (var t = this._sourceBuffers[e], i = this._pendingRemoveRanges[e]; i.length && !t.updating; ) {
                                    var n = i.shift();
                                    t.remove(n.start, n.end)
                                }
                    }
                }, {
                    key: "_doAppendSegments",
                    value: function() {
                        var e = this._pendingSegments;
                        for (var t in e)
                            if (this._sourceBuffers[t] && !this._sourceBuffers[t].updating && e[t].length > 0) {
                                var i = e[t].shift();
                                if (i.timestampOffset) {
                                    var n = this._sourceBuffers[t].timestampOffset
                                        , r = i.timestampOffset / 1e3
                                        , s = Math.abs(n - r);
                                    s > .1 && (l.default.v(this.TAG, "Update MPEG audio timestampOffset from " + n + " to " + r),
                                        this._sourceBuffers[t].timestampOffset = r),
                                        delete i.timestampOffset
                                }
                                if (!i.data || 0 === i.data.byteLength)
                                    continue;
                                try {
                                    this._sourceBuffers[t].appendBuffer(i.data),
                                        this._isBufferFull = !1,
                                    "video" === t && i.hasOwnProperty("info") && this._idrList.appendArray(i.info.syncPoints)
                                } catch (e) {
                                    this._pendingSegments[t].unshift(i),
                                        22 === e.code ? (this._isBufferFull || this._emitter.emit(c.default.BUFFER_FULL),
                                            this._isBufferFull = !0) : (l.default.e(this.TAG, e.message),
                                            this._emitter.emit(c.default.ERROR, {
                                                code: e.code,
                                                msg: e.message
                                            }))
                                }
                            }
                    }
                }, {
                    key: "_onSourceOpen",
                    value: function() {
                        if (l.default.v(this.TAG, "MediaSource onSourceOpen"),
                            this._mediaSource.removeEventListener("sourceopen", this.e.onSourceOpen),
                        this._pendingSourceBufferInit.length > 0)
                            for (var e = this._pendingSourceBufferInit; e.length; ) {
                                var t = e.shift();
                                this.appendInitSegment(t, !0)
                            }
                        this._hasPendingSegments() && this._doAppendSegments(),
                            this._emitter.emit(c.default.SOURCE_OPEN)
                    }
                }, {
                    key: "_onSourceEnded",
                    value: function() {
                        l.default.v(this.TAG, "MediaSource onSourceEnded")
                    }
                }, {
                    key: "_onSourceClose",
                    value: function() {
                        l.default.v(this.TAG, "MediaSource onSourceClose"),
                        this._mediaSource && null != this.e && (this._mediaSource.removeEventListener("sourceopen", this.e.onSourceOpen),
                            this._mediaSource.removeEventListener("sourceended", this.e.onSourceEnded),
                            this._mediaSource.removeEventListener("sourceclose", this.e.onSourceClose))
                    }
                }, {
                    key: "_hasPendingSegments",
                    value: function() {
                        var e = this._pendingSegments;
                        return e.video.length > 0 || e.audio.length > 0
                    }
                }, {
                    key: "_hasPendingRemoveRanges",
                    value: function() {
                        var e = this._pendingRemoveRanges;
                        return e.video.length > 0 || e.audio.length > 0
                    }
                }, {
                    key: "_onSourceBufferUpdateEnd",
                    value: function() {
                        this._requireSetMediaDuration ? this._updateMediaSourceDuration() : this._hasPendingRemoveRanges() ? this._doRemoveRanges() : this._hasPendingSegments() ? this._doAppendSegments() : this._hasPendingEos && this.endOfStream(),
                            this._emitter.emit(c.default.UPDATE_END)
                    }
                }, {
                    key: "_onSourceBufferError",
                    value: function(e) {
                        l.default.e(this.TAG, "SourceBuffer Error: " + e)
                    }
                }]),
                    e
            }();
            i.default = p
        }
            , {
                "../utils/browser.js": 39,
                "../utils/exception.js": 40,
                "../utils/logger.js": 41,
                "./media-segment-info.js": 8,
                "./mse-events.js": 10,
                events: 2
            }],
        10: [function(e, t, i) {
            "use strict";
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var n = {
                ERROR: "error",
                SOURCE_OPEN: "source_open",
                UPDATE_END: "update_end",
                BUFFER_FULL: "buffer_full"
            };
            i.default = n
        }
            , {}],
        11: [function(e, t, i) {
            "use strict";
            function n(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function r(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                        "value"in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i),
                    n && e(t, n),
                        t
                }
            }()
                , a = e("events")
                , o = n(a)
                , u = e("../utils/logger.js")
                , l = n(u)
                , d = e("../utils/logging-control.js")
                , h = n(d)
                , f = e("./transmuxing-controller.js")
                , c = n(f)
                , _ = e("./transmuxing-events.js")
                , m = n(_)
                , p = e("./transmuxing-worker.js")
                , v = n(p)
                , g = e("./media-info.js")
                , y = n(g)
                , E = function() {
                function t(i, n) {
                    if (r(this, t),
                        this.TAG = "Transmuxer",
                        this._emitter = new o.default,
                    n.enableWorker && "undefined" != typeof Worker)
                        try {
                            var s = e("webworkify");
                            this._worker = s(v.default),
                                this._workerDestroying = !1,
                                this._worker.addEventListener("message", this._onWorkerMessage.bind(this)),
                                this._worker.postMessage({
                                    cmd: "init",
                                    param: [i, n]
                                }),
                                this.e = {
                                    onLoggingConfigChanged: this._onLoggingConfigChanged.bind(this)
                                },
                                h.default.registerListener(this.e.onLoggingConfigChanged),
                                this._worker.postMessage({
                                    cmd: "logging_config",
                                    param: h.default.getConfig()
                                })
                        } catch (e) {
                            l.default.e(this.TAG, "Error while initialize transmuxing worker, fallback to inline transmuxing"),
                                this._worker = null,
                                this._controller = new c.default(i,n)
                        }
                    else
                        this._controller = new c.default(i,n);
                    if (this._controller) {
                        var a = this._controller;
                        a.on(m.default.IO_ERROR, this._onIOError.bind(this)),
                            a.on(m.default.DEMUX_ERROR, this._onDemuxError.bind(this)),
                            a.on(m.default.INIT_SEGMENT, this._onInitSegment.bind(this)),
                            a.on(m.default.MEDIA_SEGMENT, this._onMediaSegment.bind(this)),
                            a.on(m.default.LOADING_COMPLETE, this._onLoadingComplete.bind(this)),
                            a.on(m.default.RECOVERED_EARLY_EOF, this._onRecoveredEarlyEof.bind(this)),
                            a.on(m.default.MEDIA_INFO, this._onMediaInfo.bind(this)),
                            a.on(m.default.METADATA_ARRIVED, this._onMetaDataArrived.bind(this)),
                            a.on(m.default.SCRIPTDATA_ARRIVED, this._onScriptDataArrived.bind(this)),
                            a.on(m.default.STATISTICS_INFO, this._onStatisticsInfo.bind(this)),
                            a.on(m.default.RECOMMEND_SEEKPOINT, this._onRecommendSeekpoint.bind(this))
                    }
                }
                return s(t, [{
                    key: "destroy",
                    value: function() {
                        this._worker ? this._workerDestroying || (this._workerDestroying = !0,
                            this._worker.postMessage({
                                cmd: "destroy"
                            }),
                            h.default.removeListener(this.e.onLoggingConfigChanged),
                            this.e = null) : (this._controller.destroy(),
                            this._controller = null),
                            this._emitter.removeAllListeners(),
                            this._emitter = null
                    }
                }, {
                    key: "on",
                    value: function(e, t) {
                        this._emitter.addListener(e, t)
                    }
                }, {
                    key: "off",
                    value: function(e, t) {
                        this._emitter.removeListener(e, t)
                    }
                }, {
                    key: "hasWorker",
                    value: function() {
                        return null != this._worker
                    }
                }, {
                    key: "open",
                    value: function() {
                        this._worker ? this._worker.postMessage({
                            cmd: "start"
                        }) : this._controller.start()
                    }
                }, {
                    key: "close",
                    value: function() {
                        this._worker ? this._worker.postMessage({
                            cmd: "stop"
                        }) : this._controller.stop()
                    }
                }, {
                    key: "seek",
                    value: function(e) {
                        this._worker ? this._worker.postMessage({
                            cmd: "seek",
                            param: e
                        }) : this._controller.seek(e)
                    }
                }, {
                    key: "pause",
                    value: function() {
                        this._worker ? this._worker.postMessage({
                            cmd: "pause"
                        }) : this._controller.pause()
                    }
                }, {
                    key: "resume",
                    value: function() {
                        this._worker ? this._worker.postMessage({
                            cmd: "resume"
                        }) : this._controller.resume()
                    }
                }, {
                    key: "_onInitSegment",
                    value: function(e, t) {
                        var i = this;
                        Promise.resolve().then(function() {
                            i._emitter.emit(m.default.INIT_SEGMENT, e, t)
                        })
                    }
                }, {
                    key: "_onMediaSegment",
                    value: function(e, t) {
                        var i = this;
                        Promise.resolve().then(function() {
                            i._emitter.emit(m.default.MEDIA_SEGMENT, e, t)
                        })
                    }
                }, {
                    key: "_onLoadingComplete",
                    value: function() {
                        var e = this;
                        Promise.resolve().then(function() {
                            e._emitter.emit(m.default.LOADING_COMPLETE)
                        })
                    }
                }, {
                    key: "_onRecoveredEarlyEof",
                    value: function() {
                        var e = this;
                        Promise.resolve().then(function() {
                            e._emitter.emit(m.default.RECOVERED_EARLY_EOF)
                        })
                    }
                }, {
                    key: "_onMediaInfo",
                    value: function(e) {
                        var t = this;
                        Promise.resolve().then(function() {
                            t._emitter.emit(m.default.MEDIA_INFO, e)
                        })
                    }
                }, {
                    key: "_onMetaDataArrived",
                    value: function(e) {
                        var t = this;
                        Promise.resolve().then(function() {
                            t._emitter.emit(m.default.METADATA_ARRIVED, e)
                        })
                    }
                }, {
                    key: "_onScriptDataArrived",
                    value: function(e) {
                        var t = this;
                        Promise.resolve().then(function() {
                            t._emitter.emit(m.default.SCRIPTDATA_ARRIVED, e)
                        })
                    }
                }, {
                    key: "_onStatisticsInfo",
                    value: function(e) {
                        var t = this;
                        Promise.resolve().then(function() {
                            t._emitter.emit(m.default.STATISTICS_INFO, e)
                        })
                    }
                }, {
                    key: "_onIOError",
                    value: function(e, t) {
                        var i = this;
                        Promise.resolve().then(function() {
                            i._emitter.emit(m.default.IO_ERROR, e, t)
                        })
                    }
                }, {
                    key: "_onDemuxError",
                    value: function(e, t) {
                        var i = this;
                        Promise.resolve().then(function() {
                            i._emitter.emit(m.default.DEMUX_ERROR, e, t)
                        })
                    }
                }, {
                    key: "_onRecommendSeekpoint",
                    value: function(e) {
                        var t = this;
                        Promise.resolve().then(function() {
                            t._emitter.emit(m.default.RECOMMEND_SEEKPOINT, e)
                        })
                    }
                }, {
                    key: "_onLoggingConfigChanged",
                    value: function(e) {
                        this._worker && this._worker.postMessage({
                            cmd: "logging_config",
                            param: e
                        })
                    }
                }, {
                    key: "_onWorkerMessage",
                    value: function(e) {
                        var t = e.data
                            , i = t.data;
                        if ("destroyed" === t.msg || this._workerDestroying)
                            return this._workerDestroying = !1,
                                this._worker.terminate(),
                                void (this._worker = null);
                        switch (t.msg) {
                            case m.default.INIT_SEGMENT:
                            case m.default.MEDIA_SEGMENT:
                                this._emitter.emit(t.msg, i.type, i.data);
                                break;
                            case m.default.LOADING_COMPLETE:
                            case m.default.RECOVERED_EARLY_EOF:
                                this._emitter.emit(t.msg);
                                break;
                            case m.default.MEDIA_INFO:
                                Object.setPrototypeOf(i, y.default.prototype),
                                    this._emitter.emit(t.msg, i);
                                break;
                            case m.default.METADATA_ARRIVED:
                            case m.default.SCRIPTDATA_ARRIVED:
                            case m.default.STATISTICS_INFO:
                                this._emitter.emit(t.msg, i);
                                break;
                            case m.default.IO_ERROR:
                            case m.default.DEMUX_ERROR:
                                this._emitter.emit(t.msg, i.type, i.info);
                                break;
                            case m.default.RECOMMEND_SEEKPOINT:
                                this._emitter.emit(t.msg, i);
                                break;
                            case "logcat_callback":
                                l.default.emitter.emit("log", i.type, i.logcat)
                        }
                    }
                }]),
                    t
            }();
            i.default = E
        }
            , {
                "../utils/logger.js": 41,
                "../utils/logging-control.js": 42,
                "./media-info.js": 7,
                "./transmuxing-controller.js": 12,
                "./transmuxing-events.js": 13,
                "./transmuxing-worker.js": 14,
                events: 2,
                webworkify: 4
            }],
        12: [function(e, t, i) {
            "use strict";
            function n(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function r(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                        "value"in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i),
                    n && e(t, n),
                        t
                }
            }()
                , a = e("events")
                , o = n(a)
                , u = e("../utils/logger.js")
                , l = n(u)
                , d = e("../utils/browser.js")
                , h = n(d)
                , f = e("./media-info.js")
                , c = n(f)
                , _ = e("../demux/flv-demuxer.js")
                , m = n(_)
                , p = e("../remux/mp4-remuxer.js")
                , v = n(p)
                , g = e("../demux/demux-errors.js")
                , y = n(g)
                , E = e("../io/io-controller.js")
                , b = n(E)
                , S = e("./transmuxing-events.js")
                , k = n(S)
                , L = (e("../io/loader.js"),
                function() {
                    function e(t, i) {
                        r(this, e),
                            this.TAG = "TransmuxingController",
                            this._emitter = new o.default,
                            this._config = i,
                        t.segments || (t.segments = [{
                            duration: t.duration,
                            filesize: t.filesize,
                            url: t.url
                        }]),
                        "boolean" != typeof t.cors && (t.cors = !0),
                        "boolean" != typeof t.withCredentials && (t.withCredentials = !1),
                            this._mediaDataSource = t,
                            this._currentSegmentIndex = 0;
                        var n = 0;
                        this._mediaDataSource.segments.forEach(function(e) {
                            e.timestampBase = n,
                                n += e.duration,
                                e.cors = t.cors,
                                e.withCredentials = t.withCredentials,
                            i.referrerPolicy && (e.referrerPolicy = i.referrerPolicy)
                        }),
                        isNaN(n) || this._mediaDataSource.duration === n || (this._mediaDataSource.duration = n),
                            this._mediaInfo = null,
                            this._demuxer = null,
                            this._remuxer = null,
                            this._ioctl = null,
                            this._pendingSeekTime = null,
                            this._pendingResolveSeekPoint = null,
                            this._statisticsReporter = null
                    }
                    return s(e, [{
                        key: "destroy",
                        value: function() {
                            this._mediaInfo = null,
                                this._mediaDataSource = null,
                            this._statisticsReporter && this._disableStatisticsReporter(),
                            this._ioctl && (this._ioctl.destroy(),
                                this._ioctl = null),
                            this._demuxer && (this._demuxer.destroy(),
                                this._demuxer = null),
                            this._remuxer && (this._remuxer.destroy(),
                                this._remuxer = null),
                                this._emitter.removeAllListeners(),
                                this._emitter = null
                        }
                    }, {
                        key: "on",
                        value: function(e, t) {
                            this._emitter.addListener(e, t)
                        }
                    }, {
                        key: "off",
                        value: function(e, t) {
                            this._emitter.removeListener(e, t)
                        }
                    }, {
                        key: "start",
                        value: function() {
                            this._loadSegment(0),
                                this._enableStatisticsReporter()
                        }
                    }, {
                        key: "_loadSegment",
                        value: function(e, t) {
                            this._currentSegmentIndex = e;
                            var i = this._mediaDataSource.segments[e]
                                , n = this._ioctl = new b.default(i,this._config,e);
                            n.onError = this._onIOException.bind(this),
                                n.onSeeked = this._onIOSeeked.bind(this),
                                n.onComplete = this._onIOComplete.bind(this),
                                n.onRedirect = this._onIORedirect.bind(this),
                                n.onRecoveredEarlyEof = this._onIORecoveredEarlyEof.bind(this),
                                t ? this._demuxer.bindDataSource(this._ioctl) : n.onDataArrival = this._onInitChunkArrival.bind(this),
                                n.open(t)
                        }
                    }, {
                        key: "stop",
                        value: function() {
                            this._internalAbort(),
                                this._disableStatisticsReporter()
                        }
                    }, {
                        key: "_internalAbort",
                        value: function() {
                            this._ioctl && (this._ioctl.destroy(),
                                this._ioctl = null)
                        }
                    }, {
                        key: "pause",
                        value: function() {
                            this._ioctl && this._ioctl.isWorking() && (this._ioctl.pause(),
                                this._disableStatisticsReporter())
                        }
                    }, {
                        key: "resume",
                        value: function() {
                            this._ioctl && this._ioctl.isPaused() && (this._ioctl.resume(),
                                this._enableStatisticsReporter())
                        }
                    }, {
                        key: "seek",
                        value: function(e) {
                            if (null != this._mediaInfo && this._mediaInfo.isSeekable()) {
                                var t = this._searchSegmentIndexContains(e);
                                if (t === this._currentSegmentIndex) {
                                    var i = this._mediaInfo.segments[t];
                                    if (void 0 == i)
                                        this._pendingSeekTime = e;
                                    else {
                                        var n = i.getNearestKeyframe(e);
                                        this._remuxer.seek(n.milliseconds),
                                            this._ioctl.seek(n.fileposition),
                                            this._pendingResolveSeekPoint = n.milliseconds
                                    }
                                } else {
                                    var r = this._mediaInfo.segments[t];
                                    if (void 0 == r)
                                        this._pendingSeekTime = e,
                                            this._internalAbort(),
                                            this._remuxer.seek(),
                                            this._remuxer.insertDiscontinuity(),
                                            this._loadSegment(t);
                                    else {
                                        var s = r.getNearestKeyframe(e);
                                        this._internalAbort(),
                                            this._remuxer.seek(e),
                                            this._remuxer.insertDiscontinuity(),
                                            this._demuxer.resetMediaInfo(),
                                            this._demuxer.timestampBase = this._mediaDataSource.segments[t].timestampBase,
                                            this._loadSegment(t, s.fileposition),
                                            this._pendingResolveSeekPoint = s.milliseconds,
                                            this._reportSegmentMediaInfo(t)
                                    }
                                }
                                this._enableStatisticsReporter()
                            }
                        }
                    }, {
                        key: "_searchSegmentIndexContains",
                        value: function(e) {
                            for (var t = this._mediaDataSource.segments, i = t.length - 1, n = 0; n < t.length; n++)
                                if (e < t[n].timestampBase) {
                                    i = n - 1;
                                    break
                                }
                            return i
                        }
                    }, {
                        key: "_onInitChunkArrival",
                        value: function(e, t) {
                            var i = this
                                , n = null
                                , r = 0;
                            if (t > 0)
                                this._demuxer.bindDataSource(this._ioctl),
                                    this._demuxer.timestampBase = this._mediaDataSource.segments[this._currentSegmentIndex].timestampBase,
                                    r = this._demuxer.parseChunks(e, t);
                            else if ((n = m.default.probe(e)).match) {
                                this._demuxer = new m.default(n,this._config),
                                this._remuxer || (this._remuxer = new v.default(this._config));
                                var s = this._mediaDataSource;
                                void 0 == s.duration || isNaN(s.duration) || (this._demuxer.overridedDuration = s.duration),
                                "boolean" == typeof s.hasAudio && (this._demuxer.overridedHasAudio = s.hasAudio),
                                "boolean" == typeof s.hasVideo && (this._demuxer.overridedHasVideo = s.hasVideo),
                                    this._demuxer.timestampBase = s.segments[this._currentSegmentIndex].timestampBase,
                                    this._demuxer.onError = this._onDemuxException.bind(this),
                                    this._demuxer.onMediaInfo = this._onMediaInfo.bind(this),
                                    this._demuxer.onMetaDataArrived = this._onMetaDataArrived.bind(this),
                                    this._demuxer.onScriptDataArrived = this._onScriptDataArrived.bind(this),
                                    this._remuxer.bindDataSource(this._demuxer.bindDataSource(this._ioctl)),
                                    this._remuxer.onInitSegment = this._onRemuxerInitSegmentArrival.bind(this),
                                    this._remuxer.onMediaSegment = this._onRemuxerMediaSegmentArrival.bind(this),
                                    r = this._demuxer.parseChunks(e, t)
                            } else
                                n = null,
                                    l.default.e(this.TAG, "Non-FLV, Unsupported media type!"),
                                    Promise.resolve().then(function() {
                                        i._internalAbort()
                                    }),
                                    this._emitter.emit(k.default.DEMUX_ERROR, y.default.FORMAT_UNSUPPORTED, "Non-FLV, Unsupported media type"),
                                    r = 0;
                            return r
                        }
                    }, {
                        key: "_onMediaInfo",
                        value: function(e) {
                            var t = this;
                            null == this._mediaInfo && (this._mediaInfo = Object.assign({}, e),
                                this._mediaInfo.keyframesIndex = null,
                                this._mediaInfo.segments = [],
                                this._mediaInfo.segmentCount = this._mediaDataSource.segments.length,
                                Object.setPrototypeOf(this._mediaInfo, c.default.prototype));
                            var i = Object.assign({}, e);
                            Object.setPrototypeOf(i, c.default.prototype),
                                this._mediaInfo.segments[this._currentSegmentIndex] = i,
                                this._reportSegmentMediaInfo(this._currentSegmentIndex),
                            null != this._pendingSeekTime && Promise.resolve().then(function() {
                                var e = t._pendingSeekTime;
                                t._pendingSeekTime = null,
                                    t.seek(e)
                            })
                        }
                    }, {
                        key: "_onMetaDataArrived",
                        value: function(e) {
                            this._emitter.emit(k.default.METADATA_ARRIVED, e)
                        }
                    }, {
                        key: "_onScriptDataArrived",
                        value: function(e) {
                            this._emitter.emit(k.default.SCRIPTDATA_ARRIVED, e)
                        }
                    }, {
                        key: "_onIOSeeked",
                        value: function() {
                            this._remuxer.insertDiscontinuity()
                        }
                    }, {
                        key: "_onIOComplete",
                        value: function(e) {
                            var t = e
                                , i = t + 1;
                            i < this._mediaDataSource.segments.length ? (this._internalAbort(),
                                this._remuxer.flushStashedSamples(),
                                this._loadSegment(i)) : (this._remuxer.flushStashedSamples(),
                                this._emitter.emit(k.default.LOADING_COMPLETE),
                                this._disableStatisticsReporter())
                        }
                    }, {
                        key: "_onIORedirect",
                        value: function(e) {
                            var t = this._ioctl.extraData;
                            this._mediaDataSource.segments[t].redirectedURL = e
                        }
                    }, {
                        key: "_onIORecoveredEarlyEof",
                        value: function() {
                            this._emitter.emit(k.default.RECOVERED_EARLY_EOF)
                        }
                    }, {
                        key: "_onIOException",
                        value: function(e, t) {
                            l.default.e(this.TAG, "IOException: type = " + e + ", code = " + t.code + ", msg = " + t.msg),
                                this._emitter.emit(k.default.IO_ERROR, e, t),
                                this._disableStatisticsReporter()
                        }
                    }, {
                        key: "_onDemuxException",
                        value: function(e, t) {
                            l.default.e(this.TAG, "DemuxException: type = " + e + ", info = " + t),
                                this._emitter.emit(k.default.DEMUX_ERROR, e, t)
                        }
                    }, {
                        key: "_onRemuxerInitSegmentArrival",
                        value: function(e, t) {
                            this._emitter.emit(k.default.INIT_SEGMENT, e, t)
                        }
                    }, {
                        key: "_onRemuxerMediaSegmentArrival",
                        value: function(e, t) {
                            if (null == this._pendingSeekTime && (this._emitter.emit(k.default.MEDIA_SEGMENT, e, t),
                            null != this._pendingResolveSeekPoint && "video" === e)) {
                                var i = t.info.syncPoints
                                    , n = this._pendingResolveSeekPoint;
                                this._pendingResolveSeekPoint = null,
                                h.default.safari && i.length > 0 && i[0].originalDts === n && (n = i[0].pts),
                                    this._emitter.emit(k.default.RECOMMEND_SEEKPOINT, n)
                            }
                        }
                    }, {
                        key: "_enableStatisticsReporter",
                        value: function() {
                            null == this._statisticsReporter && (this._statisticsReporter = self.setInterval(this._reportStatisticsInfo.bind(this), this._config.statisticsInfoReportInterval))
                        }
                    }, {
                        key: "_disableStatisticsReporter",
                        value: function() {
                            this._statisticsReporter && (self.clearInterval(this._statisticsReporter),
                                this._statisticsReporter = null)
                        }
                    }, {
                        key: "_reportSegmentMediaInfo",
                        value: function(e) {
                            var t = this._mediaInfo.segments[e]
                                , i = Object.assign({}, t);
                            i.duration = this._mediaInfo.duration,
                                i.segmentCount = this._mediaInfo.segmentCount,
                                delete i.segments,
                                delete i.keyframesIndex,
                                this._emitter.emit(k.default.MEDIA_INFO, i)
                        }
                    }, {
                        key: "_reportStatisticsInfo",
                        value: function() {
                            var e = {};
                            e.url = this._ioctl.currentURL,
                                e.hasRedirect = this._ioctl.hasRedirect,
                            e.hasRedirect && (e.redirectedURL = this._ioctl.currentRedirectedURL),
                                e.speed = this._ioctl.currentSpeed,
                                e.loaderType = this._ioctl.loaderType,
                                e.currentSegmentIndex = this._currentSegmentIndex,
                                e.totalSegmentCount = this._mediaDataSource.segments.length,
                                this._emitter.emit(k.default.STATISTICS_INFO, e)
                        }
                    }]),
                        e
                }());
            i.default = L
        }
            , {
                "../demux/demux-errors.js": 16,
                "../demux/flv-demuxer.js": 18,
                "../io/io-controller.js": 23,
                "../io/loader.js": 24,
                "../remux/mp4-remuxer.js": 38,
                "../utils/browser.js": 39,
                "../utils/logger.js": 41,
                "./media-info.js": 7,
                "./transmuxing-events.js": 13,
                events: 2
            }],
        13: [function(e, t, i) {
            "use strict";
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var n = {
                IO_ERROR: "io_error",
                DEMUX_ERROR: "demux_error",
                INIT_SEGMENT: "init_segment",
                MEDIA_SEGMENT: "media_segment",
                LOADING_COMPLETE: "loading_complete",
                RECOVERED_EARLY_EOF: "recovered_early_eof",
                MEDIA_INFO: "media_info",
                METADATA_ARRIVED: "metadata_arrived",
                SCRIPTDATA_ARRIVED: "scriptdata_arrived",
                STATISTICS_INFO: "statistics_info",
                RECOMMEND_SEEKPOINT: "recommend_seekpoint"
            };
            i.default = n
        }
            , {}],
        14: [function(e, t, i) {
            "use strict";
            function n(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var r = e("../utils/logger.js")
                , s = (n(r),
                e("../utils/logging-control.js"))
                , a = n(s)
                , o = e("../utils/polyfill.js")
                , u = n(o)
                , l = e("./transmuxing-controller.js")
                , d = n(l)
                , h = e("./transmuxing-events.js")
                , f = n(h)
                , c = function(e) {
                function t(t, i) {
                    var n = {
                        msg: f.default.INIT_SEGMENT,
                        data: {
                            type: t,
                            data: i
                        }
                    };
                    e.postMessage(n, [i.data])
                }
                function i(t, i) {
                    var n = {
                        msg: f.default.MEDIA_SEGMENT,
                        data: {
                            type: t,
                            data: i
                        }
                    };
                    e.postMessage(n, [i.data])
                }
                function n() {
                    var t = {
                        msg: f.default.LOADING_COMPLETE
                    };
                    e.postMessage(t)
                }
                function r() {
                    var t = {
                        msg: f.default.RECOVERED_EARLY_EOF
                    };
                    e.postMessage(t)
                }
                function s(t) {
                    var i = {
                        msg: f.default.MEDIA_INFO,
                        data: t
                    };
                    e.postMessage(i)
                }
                function o(t) {
                    var i = {
                        msg: f.default.METADATA_ARRIVED,
                        data: t
                    };
                    e.postMessage(i)
                }
                function l(t) {
                    var i = {
                        msg: f.default.SCRIPTDATA_ARRIVED,
                        data: t
                    };
                    e.postMessage(i)
                }
                function h(t) {
                    var i = {
                        msg: f.default.STATISTICS_INFO,
                        data: t
                    };
                    e.postMessage(i)
                }
                function c(t, i) {
                    e.postMessage({
                        msg: f.default.IO_ERROR,
                        data: {
                            type: t,
                            info: i
                        }
                    })
                }
                function _(t, i) {
                    e.postMessage({
                        msg: f.default.DEMUX_ERROR,
                        data: {
                            type: t,
                            info: i
                        }
                    })
                }
                function m(t) {
                    e.postMessage({
                        msg: f.default.RECOMMEND_SEEKPOINT,
                        data: t
                    })
                }
                function p(t, i) {
                    e.postMessage({
                        msg: "logcat_callback",
                        data: {
                            type: t,
                            logcat: i
                        }
                    })
                }
                var v = null
                    , g = p.bind(this);
                u.default.install(),
                    e.addEventListener("message", function(u) {
                        switch (u.data.cmd) {
                            case "init":
                                v = new d.default(u.data.param[0],u.data.param[1]),
                                    v.on(f.default.IO_ERROR, c.bind(this)),
                                    v.on(f.default.DEMUX_ERROR, _.bind(this)),
                                    v.on(f.default.INIT_SEGMENT, t.bind(this)),
                                    v.on(f.default.MEDIA_SEGMENT, i.bind(this)),
                                    v.on(f.default.LOADING_COMPLETE, n.bind(this)),
                                    v.on(f.default.RECOVERED_EARLY_EOF, r.bind(this)),
                                    v.on(f.default.MEDIA_INFO, s.bind(this)),
                                    v.on(f.default.METADATA_ARRIVED, o.bind(this)),
                                    v.on(f.default.SCRIPTDATA_ARRIVED, l.bind(this)),
                                    v.on(f.default.STATISTICS_INFO, h.bind(this)),
                                    v.on(f.default.RECOMMEND_SEEKPOINT, m.bind(this));
                                break;
                            case "destroy":
                                v && (v.destroy(),
                                    v = null),
                                    e.postMessage({
                                        msg: "destroyed"
                                    });
                                break;
                            case "start":
                                v.start();
                                break;
                            case "stop":
                                v.stop();
                                break;
                            case "seek":
                                v.seek(u.data.param);
                                break;
                            case "pause":
                                v.pause();
                                break;
                            case "resume":
                                v.resume();
                                break;
                            case "logging_config":
                                var p = u.data.param;
                                a.default.applyConfig(p),
                                    !0 === p.enableCallback ? a.default.addLogListener(g) : a.default.removeLogListener(g)
                        }
                    })
            };
            i.default = c
        }
            , {
                "../utils/logger.js": 41,
                "../utils/logging-control.js": 42,
                "../utils/polyfill.js": 43,
                "./transmuxing-controller.js": 12,
                "./transmuxing-events.js": 13
            }],
        15: [function(e, t, i) {
            "use strict";
            function n(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function r(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                        "value"in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i),
                    n && e(t, n),
                        t
                }
            }()
                , a = e("../utils/logger.js")
                , o = n(a)
                , u = e("../utils/utf8-conv.js")
                , l = n(u)
                , d = e("../utils/exception.js")
                , h = function() {
                var e = new ArrayBuffer(2);
                return new DataView(e).setInt16(0, 256, !0),
                256 === new Int16Array(e)[0]
            }()
                , f = function() {
                function e() {
                    r(this, e)
                }
                return s(e, null, [{
                    key: "parseScriptData",
                    value: function(t, i, n) {
                        var r = {};
                        try {
                            var s = e.parseValue(t, i, n)
                                , a = e.parseValue(t, i + s.size, n - s.size);
                            r[s.data] = a.data
                        } catch (e) {
                            o.default.e("AMF", e.toString())
                        }
                        return r
                    }
                }, {
                    key: "parseObject",
                    value: function(t, i, n) {
                        if (n < 3)
                            throw new d.IllegalStateException("Data not enough when parse ScriptDataObject");
                        var r = e.parseString(t, i, n)
                            , s = e.parseValue(t, i + r.size, n - r.size)
                            , a = s.objectEnd;
                        return {
                            data: {
                                name: r.data,
                                value: s.data
                            },
                            size: r.size + s.size,
                            objectEnd: a
                        }
                    }
                }, {
                    key: "parseVariable",
                    value: function(t, i, n) {
                        return e.parseObject(t, i, n)
                    }
                }, {
                    key: "parseString",
                    value: function(e, t, i) {
                        if (i < 2)
                            throw new d.IllegalStateException("Data not enough when parse String");
                        var n = new DataView(e,t,i)
                            , r = n.getUint16(0, !h)
                            , s = void 0;
                        return s = r > 0 ? (0,
                            l.default)(new Uint8Array(e,t + 2,r)) : "",
                            {
                                data: s,
                                size: 2 + r
                            }
                    }
                }, {
                    key: "parseLongString",
                    value: function(e, t, i) {
                        if (i < 4)
                            throw new d.IllegalStateException("Data not enough when parse LongString");
                        var n = new DataView(e,t,i)
                            , r = n.getUint32(0, !h)
                            , s = void 0;
                        return s = r > 0 ? (0,
                            l.default)(new Uint8Array(e,t + 4,r)) : "",
                            {
                                data: s,
                                size: 4 + r
                            }
                    }
                }, {
                    key: "parseDate",
                    value: function(e, t, i) {
                        if (i < 10)
                            throw new d.IllegalStateException("Data size invalid when parse Date");
                        var n = new DataView(e,t,i)
                            , r = n.getFloat64(0, !h);
                        return r += 60 * n.getInt16(8, !h) * 1e3,
                            {
                                data: new Date(r),
                                size: 10
                            }
                    }
                }, {
                    key: "parseValue",
                    value: function(t, i, n) {
                        if (n < 1)
                            throw new d.IllegalStateException("Data not enough when parse Value");
                        var r = new DataView(t,i,n)
                            , s = 1
                            , a = r.getUint8(0)
                            , u = void 0
                            , l = !1;
                        try {
                            switch (a) {
                                case 0:
                                    u = r.getFloat64(1, !h),
                                        s += 8;
                                    break;
                                case 1:
                                    u = !!r.getUint8(1),
                                        s += 1;
                                    break;
                                case 2:
                                    var f = e.parseString(t, i + 1, n - 1);
                                    u = f.data,
                                        s += f.size;
                                    break;
                                case 3:
                                    u = {};
                                    var c = 0;
                                    for (9 == (16777215 & r.getUint32(n - 4, !h)) && (c = 3); s < n - 4; ) {
                                        var _ = e.parseObject(t, i + s, n - s - c);
                                        if (_.objectEnd)
                                            break;
                                        u[_.data.name] = _.data.value,
                                            s += _.size
                                    }
                                    if (s <= n - 3) {
                                        9 === (16777215 & r.getUint32(s - 1, !h)) && (s += 3)
                                    }
                                    break;
                                case 8:
                                    u = {},
                                        s += 4;
                                    var m = 0;
                                    for (9 == (16777215 & r.getUint32(n - 4, !h)) && (m = 3); s < n - 8; ) {
                                        var p = e.parseVariable(t, i + s, n - s - m);
                                        if (p.objectEnd)
                                            break;
                                        u[p.data.name] = p.data.value,
                                            s += p.size
                                    }
                                    if (s <= n - 3) {
                                        9 === (16777215 & r.getUint32(s - 1, !h)) && (s += 3)
                                    }
                                    break;
                                case 9:
                                    u = void 0,
                                        s = 1,
                                        l = !0;
                                    break;
                                case 10:
                                    u = [];
                                    var v = r.getUint32(1, !h);
                                    s += 4;
                                    for (var g = 0; g < v; g++) {
                                        var y = e.parseValue(t, i + s, n - s);
                                        u.push(y.data),
                                            s += y.size
                                    }
                                    break;
                                case 11:
                                    var E = e.parseDate(t, i + 1, n - 1);
                                    u = E.data,
                                        s += E.size;
                                    break;
                                case 12:
                                    var b = e.parseString(t, i + 1, n - 1);
                                    u = b.data,
                                        s += b.size;
                                    break;
                                default:
                                    s = n,
                                        o.default.w("AMF", "Unsupported AMF value type " + a)
                            }
                        } catch (e) {
                            o.default.e("AMF", e.toString())
                        }
                        return {
                            data: u,
                            size: s,
                            objectEnd: l
                        }
                    }
                }]),
                    e
            }();
            i.default = f
        }
            , {
                "../utils/exception.js": 40,
                "../utils/logger.js": 41,
                "../utils/utf8-conv.js": 44
            }],
        16: [function(e, t, i) {
            "use strict";
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var n = {
                OK: "OK",
                FORMAT_ERROR: "FormatError",
                FORMAT_UNSUPPORTED: "FormatUnsupported",
                CODEC_UNSUPPORTED: "CodecUnsupported"
            };
            i.default = n
        }
            , {}],
        17: [function(e, t, i) {
            "use strict";
            function n(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var r = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                        "value"in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i),
                    n && e(t, n),
                        t
                }
            }()
                , s = e("../utils/exception.js")
                , a = function() {
                function e(t) {
                    n(this, e),
                        this.TAG = "ExpGolomb",
                        this._buffer = t,
                        this._buffer_index = 0,
                        this._total_bytes = t.byteLength,
                        this._total_bits = 8 * t.byteLength,
                        this._current_word = 0,
                        this._current_word_bits_left = 0
                }
                return r(e, [{
                    key: "destroy",
                    value: function() {
                        this._buffer = null
                    }
                }, {
                    key: "_fillCurrentWord",
                    value: function() {
                        var e = this._total_bytes - this._buffer_index;
                        if (e <= 0)
                            throw new s.IllegalStateException("ExpGolomb: _fillCurrentWord() but no bytes available");
                        var t = Math.min(4, e)
                            , i = new Uint8Array(4);
                        i.set(this._buffer.subarray(this._buffer_index, this._buffer_index + t)),
                            this._current_word = new DataView(i.buffer).getUint32(0, !1),
                            this._buffer_index += t,
                            this._current_word_bits_left = 8 * t
                    }
                }, {
                    key: "readBits",
                    value: function(e) {
                        if (e > 32)
                            throw new s.InvalidArgumentException("ExpGolomb: readBits() bits exceeded max 32bits!");
                        if (e <= this._current_word_bits_left) {
                            var t = this._current_word >>> 32 - e;
                            return this._current_word <<= e,
                                this._current_word_bits_left -= e,
                                t
                        }
                        var i = this._current_word_bits_left ? this._current_word : 0;
                        i >>>= 32 - this._current_word_bits_left;
                        var n = e - this._current_word_bits_left;
                        this._fillCurrentWord();
                        var r = Math.min(n, this._current_word_bits_left)
                            , a = this._current_word >>> 32 - r;
                        return this._current_word <<= r,
                            this._current_word_bits_left -= r,
                            i = i << r | a
                    }
                }, {
                    key: "readBool",
                    value: function() {
                        return 1 === this.readBits(1)
                    }
                }, {
                    key: "readByte",
                    value: function() {
                        return this.readBits(8)
                    }
                }, {
                    key: "_skipLeadingZero",
                    value: function() {
                        var e = void 0;
                        for (e = 0; e < this._current_word_bits_left; e++)
                            if (0 != (this._current_word & 2147483648 >>> e))
                                return this._current_word <<= e,
                                    this._current_word_bits_left -= e,
                                    e;
                        return this._fillCurrentWord(),
                        e + this._skipLeadingZero()
                    }
                }, {
                    key: "readUEG",
                    value: function() {
                        var e = this._skipLeadingZero();
                        return this.readBits(e + 1) - 1
                    }
                }, {
                    key: "readSEG",
                    value: function() {
                        var e = this.readUEG();
                        return 1 & e ? e + 1 >>> 1 : -1 * (e >>> 1)
                    }
                }]),
                    e
            }();
            i.default = a
        }
            , {
                "../utils/exception.js": 40
            }],
        18: [function(e, t, i) {
            "use strict";
            function n(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function r(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function s(e, t) {
                return e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3]
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                , o = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                        "value"in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i),
                    n && e(t, n),
                        t
                }
            }()
                , u = e("../utils/logger.js")
                , l = n(u)
                , d = e("./amf-parser.js")
                , h = n(d)
                , f = e("./sps-parser.js")
                , c = n(f)
                , _ = e("./demux-errors.js")
                , m = n(_)
                , p = e("../core/media-info.js")
                , v = n(p)
                , g = e("../utils/exception.js")
                , y = function() {
                function e(t, i) {
                    r(this, e),
                        this.TAG = "FLVDemuxer",
                        this._config = i,
                        this._onError = null,
                        this._onMediaInfo = null,
                        this._onMetaDataArrived = null,
                        this._onScriptDataArrived = null,
                        this._onTrackMetadata = null,
                        this._onDataAvailable = null,
                        this._dataOffset = t.dataOffset,
                        this._firstParse = !0,
                        this._dispatch = !1,
                        this._hasAudio = t.hasAudioTrack,
                        this._hasVideo = t.hasVideoTrack,
                        this._hasAudioFlagOverrided = !1,
                        this._hasVideoFlagOverrided = !1,
                        this._audioInitialMetadataDispatched = !1,
                        this._videoInitialMetadataDispatched = !1,
                        this._mediaInfo = new v.default,
                        this._mediaInfo.hasAudio = this._hasAudio,
                        this._mediaInfo.hasVideo = this._hasVideo,
                        this._metadata = null,
                        this._audioMetadata = null,
                        this._videoMetadata = null,
                        this._naluLengthSize = 4,
                        this._timestampBase = 0,
                        this._timescale = 1e3,
                        this._duration = 0,
                        this._durationOverrided = !1,
                        this._referenceFrameRate = {
                            fixed: !0,
                            fps: 23.976,
                            fps_num: 23976,
                            fps_den: 1e3
                        },
                        this._flvSoundRateTable = [5500, 11025, 22050, 44100, 48e3],
                        this._mpegSamplingRates = [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350],
                        this._mpegAudioV10SampleRateTable = [44100, 48e3, 32e3, 0],
                        this._mpegAudioV20SampleRateTable = [22050, 24e3, 16e3, 0],
                        this._mpegAudioV25SampleRateTable = [11025, 12e3, 8e3, 0],
                        this._mpegAudioL1BitRateTable = [0, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, -1],
                        this._mpegAudioL2BitRateTable = [0, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, -1],
                        this._mpegAudioL3BitRateTable = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, -1],
                        this._videoTrack = {
                            type: "video",
                            id: 1,
                            sequenceNumber: 0,
                            samples: [],
                            length: 0
                        },
                        this._audioTrack = {
                            type: "audio",
                            id: 2,
                            sequenceNumber: 0,
                            samples: [],
                            length: 0
                        },
                        this._littleEndian = function() {
                            var e = new ArrayBuffer(2);
                            return new DataView(e).setInt16(0, 256, !0),
                            256 === new Int16Array(e)[0]
                        }()
                }
                return o(e, [{
                    key: "destroy",
                    value: function() {
                        this._mediaInfo = null,
                            this._metadata = null,
                            this._audioMetadata = null,
                            this._videoMetadata = null,
                            this._videoTrack = null,
                            this._audioTrack = null,
                            this._onError = null,
                            this._onMediaInfo = null,
                            this._onMetaDataArrived = null,
                            this._onScriptDataArrived = null,
                            this._onTrackMetadata = null,
                            this._onDataAvailable = null
                    }
                }, {
                    key: "bindDataSource",
                    value: function(e) {
                        return e.onDataArrival = this.parseChunks.bind(this),
                            this
                    }
                }, {
                    key: "resetMediaInfo",
                    value: function() {
                        this._mediaInfo = new v.default
                    }
                }, {
                    key: "_isInitialMetadataDispatched",
                    value: function() {
                        return this._hasAudio && this._hasVideo ? this._audioInitialMetadataDispatched && this._videoInitialMetadataDispatched : this._hasAudio && !this._hasVideo ? this._audioInitialMetadataDispatched : !(this._hasAudio || !this._hasVideo) && this._videoInitialMetadataDispatched
                    }
                }, {
                    key: "parseChunks",
                    value: function(t, i) {
                        if (!(this._onError && this._onMediaInfo && this._onTrackMetadata && this._onDataAvailable))
                            throw new g.IllegalStateException("Flv: onError & onMediaInfo & onTrackMetadata & onDataAvailable callback must be specified");
                        var n = 0
                            , r = this._littleEndian;
                        if (0 === i) {
                            if (!(t.byteLength > 13))
                                return 0;
                            n = e.probe(t).dataOffset
                        }
                        if (this._firstParse) {
                            this._firstParse = !1,
                            i + n !== this._dataOffset && l.default.w(this.TAG, "First time parsing but chunk byteStart invalid!");
                            0 !== new DataView(t,n).getUint32(0, !r) && l.default.w(this.TAG, "PrevTagSize0 !== 0 !!!"),
                                n += 4
                        }
                        for (; n < t.byteLength; ) {
                            this._dispatch = !0;
                            var s = new DataView(t,n);
                            if (n + 11 + 4 > t.byteLength)
                                break;
                            var a = s.getUint8(0)
                                , o = 16777215 & s.getUint32(0, !r);
                            if (n + 11 + o + 4 > t.byteLength)
                                break;
                            if (8 === a || 9 === a || 18 === a) {
                                var u = s.getUint8(4)
                                    , d = s.getUint8(5)
                                    , h = s.getUint8(6)
                                    , f = s.getUint8(7)
                                    , c = h | d << 8 | u << 16 | f << 24;
                                0 !== (16777215 & s.getUint32(7, !r)) && l.default.w(this.TAG, "Meet tag which has StreamID != 0!");
                                var _ = n + 11;
                                switch (a) {
                                    case 8:
                                        this._parseAudioData(t, _, o, c);
                                        break;
                                    case 9:
                                        this._parseVideoData(t, _, o, c, i + n);
                                        break;
                                    case 18:
                                        this._parseScriptData(t, _, o)
                                }
                                var m = s.getUint32(11 + o, !r);
                                m !== 11 + o && l.default.w(this.TAG, "Invalid PrevTagSize " + m),
                                    n += 11 + o + 4
                            } else
                                l.default.w(this.TAG, "Unsupported tag type " + a + ", skipped"),
                                    n += 11 + o + 4
                        }
                        return this._isInitialMetadataDispatched() && this._dispatch && (this._audioTrack.length || this._videoTrack.length) && this._onDataAvailable(this._audioTrack, this._videoTrack),
                            n
                    }
                }, {
                    key: "_parseScriptData",
                    value: function(e, t, i) {
                        var n = h.default.parseScriptData(e, t, i);
                        if (n.hasOwnProperty("onMetaData")) {
                            if (null == n.onMetaData || "object" !== a(n.onMetaData))
                                return void l.default.w(this.TAG, "Invalid onMetaData structure!");
                            this._metadata && l.default.w(this.TAG, "Found another onMetaData tag!"),
                                this._metadata = n;
                            var r = this._metadata.onMetaData;
                            if (this._onMetaDataArrived && this._onMetaDataArrived(Object.assign({}, r)),
                            "boolean" == typeof r.hasAudio && !1 === this._hasAudioFlagOverrided && (this._hasAudio = r.hasAudio,
                                this._mediaInfo.hasAudio = this._hasAudio),
                            "boolean" == typeof r.hasVideo && !1 === this._hasVideoFlagOverrided && (this._hasVideo = r.hasVideo,
                                this._mediaInfo.hasVideo = this._hasVideo),
                            "number" == typeof r.audiodatarate && (this._mediaInfo.audioDataRate = r.audiodatarate),
                            "number" == typeof r.videodatarate && (this._mediaInfo.videoDataRate = r.videodatarate),
                            "number" == typeof r.width && (this._mediaInfo.width = r.width),
                            "number" == typeof r.height && (this._mediaInfo.height = r.height),
                            "number" == typeof r.duration) {
                                if (!this._durationOverrided) {
                                    var s = Math.floor(r.duration * this._timescale);
                                    this._duration = s,
                                        this._mediaInfo.duration = s
                                }
                            } else
                                this._mediaInfo.duration = 0;
                            if ("number" == typeof r.framerate) {
                                var o = Math.floor(1e3 * r.framerate);
                                if (o > 0) {
                                    var u = o / 1e3;
                                    this._referenceFrameRate.fixed = !0,
                                        this._referenceFrameRate.fps = u,
                                        this._referenceFrameRate.fps_num = o,
                                        this._referenceFrameRate.fps_den = 1e3,
                                        this._mediaInfo.fps = u
                                }
                            }
                            if ("object" === a(r.keyframes)) {
                                this._mediaInfo.hasKeyframesIndex = !0;
                                var d = r.keyframes;
                                this._mediaInfo.keyframesIndex = this._parseKeyframesIndex(d),
                                    r.keyframes = null
                            } else
                                this._mediaInfo.hasKeyframesIndex = !1;
                            this._dispatch = !1,
                                this._mediaInfo.metadata = r,
                                l.default.v(this.TAG, "Parsed onMetaData"),
                            this._mediaInfo.isComplete() && this._onMediaInfo(this._mediaInfo)
                        }
                        Object.keys(n).length > 0 && this._onScriptDataArrived && this._onScriptDataArrived(Object.assign({}, n))
                    }
                }, {
                    key: "_parseKeyframesIndex",
                    value: function(e) {
                        for (var t = [], i = [], n = 1; n < e.times.length; n++) {
                            var r = this._timestampBase + Math.floor(1e3 * e.times[n]);
                            t.push(r),
                                i.push(e.filepositions[n])
                        }
                        return {
                            times: t,
                            filepositions: i
                        }
                    }
                }, {
                    key: "_parseAudioData",
                    value: function(e, t, i, n) {
                        if (i <= 1)
                            return void l.default.w(this.TAG, "Flv: Invalid audio packet, missing SoundData payload!");
                        if (!0 !== this._hasAudioFlagOverrided || !1 !== this._hasAudio) {
                            var r = (this._littleEndian,
                                new DataView(e,t,i))
                                , s = r.getUint8(0)
                                , a = s >>> 4;
                            if (2 !== a && 10 !== a)
                                return void this._onError(m.default.CODEC_UNSUPPORTED, "Flv: Unsupported audio codec idx: " + a);
                            var o = 0
                                , u = (12 & s) >>> 2;
                            if (!(u >= 0 && u <= 4))
                                return void this._onError(m.default.FORMAT_ERROR, "Flv: Invalid audio sample rate idx: " + u);
                            o = this._flvSoundRateTable[u];
                            var d = 1 & s
                                , h = this._audioMetadata
                                , f = this._audioTrack;
                            if (h || (!1 === this._hasAudio && !1 === this._hasAudioFlagOverrided && (this._hasAudio = !0,
                                this._mediaInfo.hasAudio = !0),
                                h = this._audioMetadata = {},
                                h.type = "audio",
                                h.id = f.id,
                                h.timescale = this._timescale,
                                h.duration = this._duration,
                                h.audioSampleRate = o,
                                h.channelCount = 0 === d ? 1 : 2),
                            10 === a) {
                                var c = this._parseAACAudioData(e, t + 1, i - 1);
                                if (void 0 == c)
                                    return;
                                if (0 === c.packetType) {
                                    h.config && l.default.w(this.TAG, "Found another AudioSpecificConfig!");
                                    var _ = c.data;
                                    h.audioSampleRate = _.samplingRate,
                                        h.channelCount = _.channelCount,
                                        h.codec = _.codec,
                                        h.originalCodec = _.originalCodec,
                                        h.config = _.config,
                                        h.refSampleDuration = 1024 / h.audioSampleRate * h.timescale,
                                        l.default.v(this.TAG, "Parsed AudioSpecificConfig"),
                                        this._isInitialMetadataDispatched() ? this._dispatch && (this._audioTrack.length || this._videoTrack.length) && this._onDataAvailable(this._audioTrack, this._videoTrack) : this._audioInitialMetadataDispatched = !0,
                                        this._dispatch = !1,
                                        this._onTrackMetadata("audio", h);
                                    var p = this._mediaInfo;
                                    p.audioCodec = h.originalCodec,
                                        p.audioSampleRate = h.audioSampleRate,
                                        p.audioChannelCount = h.channelCount,
                                        p.hasVideo ? null != p.videoCodec && (p.mimeType = 'video/x-flv; codecs="' + p.videoCodec + "," + p.audioCodec + '"') : p.mimeType = 'video/x-flv; codecs="' + p.audioCodec + '"',
                                    p.isComplete() && this._onMediaInfo(p)
                                } else if (1 === c.packetType) {
                                    var v = this._timestampBase + n
                                        , g = {
                                        unit: c.data,
                                        length: c.data.byteLength,
                                        dts: v,
                                        pts: v
                                    };
                                    f.samples.push(g),
                                        f.length += c.data.length
                                } else
                                    l.default.e(this.TAG, "Flv: Unsupported AAC data type " + c.packetType)
                            } else if (2 === a) {
                                if (!h.codec) {
                                    var y = this._parseMP3AudioData(e, t + 1, i - 1, !0);
                                    if (void 0 == y)
                                        return;
                                    h.audioSampleRate = y.samplingRate,
                                        h.channelCount = y.channelCount,
                                        h.codec = y.codec,
                                        h.originalCodec = y.originalCodec,
                                        h.refSampleDuration = 1152 / h.audioSampleRate * h.timescale,
                                        l.default.v(this.TAG, "Parsed MPEG Audio Frame Header"),
                                        this._audioInitialMetadataDispatched = !0,
                                        this._onTrackMetadata("audio", h);
                                    var E = this._mediaInfo;
                                    E.audioCodec = h.codec,
                                        E.audioSampleRate = h.audioSampleRate,
                                        E.audioChannelCount = h.channelCount,
                                        E.audioDataRate = y.bitRate,
                                        E.hasVideo ? null != E.videoCodec && (E.mimeType = 'video/x-flv; codecs="' + E.videoCodec + "," + E.audioCodec + '"') : E.mimeType = 'video/x-flv; codecs="' + E.audioCodec + '"',
                                    E.isComplete() && this._onMediaInfo(E)
                                }
                                var b = this._parseMP3AudioData(e, t + 1, i - 1, !1);
                                if (void 0 == b)
                                    return;
                                var S = this._timestampBase + n
                                    , k = {
                                    unit: b,
                                    length: b.byteLength,
                                    dts: S,
                                    pts: S
                                };
                                f.samples.push(k),
                                    f.length += b.length
                            }
                        }
                    }
                }, {
                    key: "_parseAACAudioData",
                    value: function(e, t, i) {
                        if (i <= 1)
                            return void l.default.w(this.TAG, "Flv: Invalid AAC packet, missing AACPacketType or/and Data!");
                        var n = {}
                            , r = new Uint8Array(e,t,i);
                        return n.packetType = r[0],
                            0 === r[0] ? n.data = this._parseAACAudioSpecificConfig(e, t + 1, i - 1) : n.data = r.subarray(1),
                            n
                    }
                }, {
                    key: "_parseAACAudioSpecificConfig",
                    value: function(e, t, i) {
                        var n = new Uint8Array(e,t,i)
                            , r = null
                            , s = 0
                            , a = 0
                            , o = 0
                            , u = null;
                        if (s = a = n[0] >>> 3,
                        (o = (7 & n[0]) << 1 | n[1] >>> 7) < 0 || o >= this._mpegSamplingRates.length)
                            return void this._onError(m.default.FORMAT_ERROR, "Flv: AAC invalid sampling frequency index!");
                        var l = this._mpegSamplingRates[o]
                            , d = (120 & n[1]) >>> 3;
                        if (d < 0 || d >= 8)
                            return void this._onError(m.default.FORMAT_ERROR, "Flv: AAC invalid channel configuration");
                        5 === s && (u = (7 & n[1]) << 1 | n[2] >>> 7,
                            n[2]);
                        var h = self.navigator.userAgent.toLowerCase();
                        return -1 !== h.indexOf("firefox") ? o >= 6 ? (s = 5,
                            r = new Array(4),
                            u = o - 3) : (s = 2,
                            r = new Array(2),
                            u = o) : -1 !== h.indexOf("android") ? (s = 2,
                            r = new Array(2),
                            u = o) : (s = 5,
                            u = o,
                            r = new Array(4),
                            o >= 6 ? u = o - 3 : 1 === d && (s = 2,
                                r = new Array(2),
                                u = o)),
                            r[0] = s << 3,
                            r[0] |= (15 & o) >>> 1,
                            r[1] = (15 & o) << 7,
                            r[1] |= (15 & d) << 3,
                        5 === s && (r[1] |= (15 & u) >>> 1,
                            r[2] = (1 & u) << 7,
                            r[2] |= 8,
                            r[3] = 0),
                            {
                                config: r,
                                samplingRate: l,
                                channelCount: d,
                                codec: "mp4a.40." + s,
                                originalCodec: "mp4a.40." + a
                            }
                    }
                }, {
                    key: "_parseMP3AudioData",
                    value: function(e, t, i, n) {
                        if (i < 4)
                            return void l.default.w(this.TAG, "Flv: Invalid MP3 packet, header missing!");
                        var r = (this._littleEndian,
                            new Uint8Array(e,t,i))
                            , s = null;
                        if (n) {
                            if (255 !== r[0])
                                return;
                            var a = r[1] >>> 3 & 3
                                , o = (6 & r[1]) >> 1
                                , u = (240 & r[2]) >>> 4
                                , d = (12 & r[2]) >>> 2
                                , h = r[3] >>> 6 & 3
                                , f = 3 !== h ? 2 : 1
                                , c = 0
                                , _ = 0;
                            switch (a) {
                                case 0:
                                    c = this._mpegAudioV25SampleRateTable[d];
                                    break;
                                case 2:
                                    c = this._mpegAudioV20SampleRateTable[d];
                                    break;
                                case 3:
                                    c = this._mpegAudioV10SampleRateTable[d]
                            }
                            switch (o) {
                                case 1:
                                    34,
                                    u < this._mpegAudioL3BitRateTable.length && (_ = this._mpegAudioL3BitRateTable[u]);
                                    break;
                                case 2:
                                    33,
                                    u < this._mpegAudioL2BitRateTable.length && (_ = this._mpegAudioL2BitRateTable[u]);
                                    break;
                                case 3:
                                    32,
                                    u < this._mpegAudioL1BitRateTable.length && (_ = this._mpegAudioL1BitRateTable[u])
                            }
                            s = {
                                bitRate: _,
                                samplingRate: c,
                                channelCount: f,
                                codec: "mp3",
                                originalCodec: "mp3"
                            }
                        } else
                            s = r;
                        return s
                    }
                }, {
                    key: "_parseVideoData",
                    value: function(e, t, i, n, r) {
                        if (i <= 1)
                            return void l.default.w(this.TAG, "Flv: Invalid video packet, missing VideoData payload!");
                        if (!0 !== this._hasVideoFlagOverrided || !1 !== this._hasVideo) {
                            var s = new Uint8Array(e,t,i)[0]
                                , a = (240 & s) >>> 4
                                , o = 15 & s;
                            if (7 !== o)
                                return void this._onError(m.default.CODEC_UNSUPPORTED, "Flv: Unsupported codec in video frame: " + o);
                            this._parseAVCVideoPacket(e, t + 1, i - 1, n, r, a)
                        }
                    }
                }, {
                    key: "_parseAVCVideoPacket",
                    value: function(e, t, i, n, r, s) {
                        if (i < 4)
                            return void l.default.w(this.TAG, "Flv: Invalid AVC packet, missing AVCPacketType or/and CompositionTime");
                        var a = this._littleEndian
                            , o = new DataView(e,t,i)
                            , u = o.getUint8(0)
                            , d = 16777215 & o.getUint32(0, !a)
                            , h = d << 8 >> 8;
                        if (0 === u)
                            this._parseAVCDecoderConfigurationRecord(e, t + 4, i - 4);
                        else if (1 === u)
                            this._parseAVCVideoData(e, t + 4, i - 4, n, r, s, h);
                        else if (2 !== u)
                            return void this._onError(m.default.FORMAT_ERROR, "Flv: Invalid video packet type " + u)
                    }
                }, {
                    key: "_parseAVCDecoderConfigurationRecord",
                    value: function(e, t, i) {
                        if (i < 7)
                            return void l.default.w(this.TAG, "Flv: Invalid AVCDecoderConfigurationRecord, lack of data!");
                        var n = this._videoMetadata
                            , r = this._videoTrack
                            , s = this._littleEndian
                            , a = new DataView(e,t,i);
                        n ? void 0 !== n.avcc && l.default.w(this.TAG, "Found another AVCDecoderConfigurationRecord!") : (!1 === this._hasVideo && !1 === this._hasVideoFlagOverrided && (this._hasVideo = !0,
                            this._mediaInfo.hasVideo = !0),
                            n = this._videoMetadata = {},
                            n.type = "video",
                            n.id = r.id,
                            n.timescale = this._timescale,
                            n.duration = this._duration);
                        var o = a.getUint8(0)
                            , u = a.getUint8(1);
                        a.getUint8(2),
                            a.getUint8(3);
                        if (1 !== o || 0 === u)
                            return void this._onError(m.default.FORMAT_ERROR, "Flv: Invalid AVCDecoderConfigurationRecord");
                        if (this._naluLengthSize = 1 + (3 & a.getUint8(4)),
                        3 !== this._naluLengthSize && 4 !== this._naluLengthSize)
                            return void this._onError(m.default.FORMAT_ERROR, "Flv: Strange NaluLengthSizeMinusOne: " + (this._naluLengthSize - 1));
                        var d = 31 & a.getUint8(5);
                        if (0 === d)
                            return void this._onError(m.default.FORMAT_ERROR, "Flv: Invalid AVCDecoderConfigurationRecord: No SPS");
                        d > 1 && l.default.w(this.TAG, "Flv: Strange AVCDecoderConfigurationRecord: SPS Count = " + d);
                        for (var h = 6, f = 0; f < d; f++) {
                            var _ = a.getUint16(h, !s);
                            if (h += 2,
                            0 !== _) {
                                var p = new Uint8Array(e,t + h,_);
                                h += _;
                                var v = c.default.parseSPS(p);
                                if (0 === f) {
                                    n.codecWidth = v.codec_size.width,
                                        n.codecHeight = v.codec_size.height,
                                        n.presentWidth = v.present_size.width,
                                        n.presentHeight = v.present_size.height,
                                        n.profile = v.profile_string,
                                        n.level = v.level_string,
                                        n.bitDepth = v.bit_depth,
                                        n.chromaFormat = v.chroma_format,
                                        n.sarRatio = v.sar_ratio,
                                        n.frameRate = v.frame_rate,
                                    !1 !== v.frame_rate.fixed && 0 !== v.frame_rate.fps_num && 0 !== v.frame_rate.fps_den || (n.frameRate = this._referenceFrameRate);
                                    var g = n.frameRate.fps_den
                                        , y = n.frameRate.fps_num;
                                    n.refSampleDuration = n.timescale * (g / y);
                                    for (var E = p.subarray(1, 4), b = "avc1.", S = 0; S < 3; S++) {
                                        var k = E[S].toString(16);
                                        k.length < 2 && (k = "0" + k),
                                            b += k
                                    }
                                    n.codec = b;
                                    var L = this._mediaInfo;
                                    L.width = n.codecWidth,
                                        L.height = n.codecHeight,
                                        L.fps = n.frameRate.fps,
                                        L.profile = n.profile,
                                        L.level = n.level,
                                        L.refFrames = v.ref_frames,
                                        L.chromaFormat = v.chroma_format_string,
                                        L.sarNum = n.sarRatio.width,
                                        L.sarDen = n.sarRatio.height,
                                        L.videoCodec = b,
                                        L.hasAudio ? null != L.audioCodec && (L.mimeType = 'video/x-flv; codecs="' + L.videoCodec + "," + L.audioCodec + '"') : L.mimeType = 'video/x-flv; codecs="' + L.videoCodec + '"',
                                    L.isComplete() && this._onMediaInfo(L)
                                }
                            }
                        }
                        var R = a.getUint8(h);
                        if (0 === R)
                            return void this._onError(m.default.FORMAT_ERROR, "Flv: Invalid AVCDecoderConfigurationRecord: No PPS");
                        R > 1 && l.default.w(this.TAG, "Flv: Strange AVCDecoderConfigurationRecord: PPS Count = " + R),
                            h++;
                        for (var A = 0; A < R; A++) {
                            var w = a.getUint16(h, !s);
                            h += 2,
                            0 !== w && (h += w)
                        }
                        n.avcc = new Uint8Array(i),
                            n.avcc.set(new Uint8Array(e,t,i), 0),
                            l.default.v(this.TAG, "Parsed AVCDecoderConfigurationRecord"),
                            this._isInitialMetadataDispatched() ? this._dispatch && (this._audioTrack.length || this._videoTrack.length) && this._onDataAvailable(this._audioTrack, this._videoTrack) : this._videoInitialMetadataDispatched = !0,
                            this._dispatch = !1,
                            this._onTrackMetadata("video", n)
                    }
                }, {
                    key: "_parseAVCVideoData",
                    value: function(e, t, i, n, r, s, a) {
                        for (var o = this._littleEndian, u = new DataView(e,t,i), d = [], h = 0, f = 0, c = this._naluLengthSize, _ = this._timestampBase + n, m = 1 === s; f < i; ) {
                            if (f + 4 >= i) {
                                l.default.w(this.TAG, "Malformed Nalu near timestamp " + _ + ", offset = " + f + ", dataSize = " + i);
                                break
                            }
                            var p = u.getUint32(f, !o);
                            if (3 === c && (p >>>= 8),
                            p > i - c)
                                return void l.default.w(this.TAG, "Malformed Nalus near timestamp " + _ + ", NaluSize > DataSize!");
                            var v = 31 & u.getUint8(f + c);
                            5 === v && (m = !0);
                            var g = new Uint8Array(e,t + f,c + p)
                                , y = {
                                type: v,
                                data: g
                            };
                            d.push(y),
                                h += g.byteLength,
                                f += c + p
                        }
                        if (d.length) {
                            var E = this._videoTrack
                                , b = {
                                units: d,
                                length: h,
                                isKeyframe: m,
                                dts: _,
                                cts: a,
                                pts: _ + a
                            };
                            m && (b.fileposition = r),
                                E.samples.push(b),
                                E.length += h
                        }
                    }
                }, {
                    key: "onTrackMetadata",
                    get: function() {
                        return this._onTrackMetadata
                    },
                    set: function(e) {
                        this._onTrackMetadata = e
                    }
                }, {
                    key: "onMediaInfo",
                    get: function() {
                        return this._onMediaInfo
                    },
                    set: function(e) {
                        this._onMediaInfo = e
                    }
                }, {
                    key: "onMetaDataArrived",
                    get: function() {
                        return this._onMetaDataArrived
                    },
                    set: function(e) {
                        this._onMetaDataArrived = e
                    }
                }, {
                    key: "onScriptDataArrived",
                    get: function() {
                        return this._onScriptDataArrived
                    },
                    set: function(e) {
                        this._onScriptDataArrived = e
                    }
                }, {
                    key: "onError",
                    get: function() {
                        return this._onError
                    },
                    set: function(e) {
                        this._onError = e
                    }
                }, {
                    key: "onDataAvailable",
                    get: function() {
                        return this._onDataAvailable
                    },
                    set: function(e) {
                        this._onDataAvailable = e
                    }
                }, {
                    key: "timestampBase",
                    get: function() {
                        return this._timestampBase
                    },
                    set: function(e) {
                        this._timestampBase = e
                    }
                }, {
                    key: "overridedDuration",
                    get: function() {
                        return this._duration
                    },
                    set: function(e) {
                        this._durationOverrided = !0,
                            this._duration = e,
                            this._mediaInfo.duration = e
                    }
                }, {
                    key: "overridedHasAudio",
                    set: function(e) {
                        this._hasAudioFlagOverrided = !0,
                            this._hasAudio = e,
                            this._mediaInfo.hasAudio = e
                    }
                }, {
                    key: "overridedHasVideo",
                    set: function(e) {
                        this._hasVideoFlagOverrided = !0,
                            this._hasVideo = e,
                            this._mediaInfo.hasVideo = e
                    }
                }], [{
                    key: "probe",
                    value: function(e) {
                        var t = new Uint8Array(e)
                            , i = {
                            match: !1
                        };
                        if (70 !== t[0] || 76 !== t[1] || 86 !== t[2] || 1 !== t[3])
                            return i;
                        var n = (4 & t[4]) >>> 2 != 0
                            , r = 0 != (1 & t[4])
                            , a = s(t, 5);
                        return a < 9 ? i : {
                            match: !0,
                            consumed: a,
                            dataOffset: a,
                            hasAudioTrack: n,
                            hasVideoTrack: r
                        }
                    }
                }]),
                    e
            }();
            i.default = y
        }
            , {
                "../core/media-info.js": 7,
                "../utils/exception.js": 40,
                "../utils/logger.js": 41,
                "./amf-parser.js": 15,
                "./demux-errors.js": 16,
                "./sps-parser.js": 19
            }],
        19: [function(e, t, i) {
            "use strict";
            function n(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var r = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                        "value"in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i),
                    n && e(t, n),
                        t
                }
            }()
                , s = e("./exp-golomb.js")
                , a = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(s)
                , o = function() {
                function e() {
                    n(this, e)
                }
                return r(e, null, [{
                    key: "_ebsp2rbsp",
                    value: function(e) {
                        for (var t = e, i = t.byteLength, n = new Uint8Array(i), r = 0, s = 0; s < i; s++)
                            s >= 2 && 3 === t[s] && 0 === t[s - 1] && 0 === t[s - 2] || (n[r] = t[s],
                                r++);
                        return new Uint8Array(n.buffer,0,r)
                    }
                }, {
                    key: "parseSPS",
                    value: function(t) {
                        var i = e._ebsp2rbsp(t)
                            , n = new a.default(i);
                        n.readByte();
                        var r = n.readByte();
                        n.readByte();
                        var s = n.readByte();
                        n.readUEG();
                        var o = e.getProfileString(r)
                            , u = e.getLevelString(s)
                            , l = 1
                            , d = 420
                            , h = [0, 420, 422, 444]
                            , f = 8;
                        if ((100 === r || 110 === r || 122 === r || 244 === r || 44 === r || 83 === r || 86 === r || 118 === r || 128 === r || 138 === r || 144 === r) && (l = n.readUEG(),
                        3 === l && n.readBits(1),
                        l <= 3 && (d = h[l]),
                            f = n.readUEG() + 8,
                            n.readUEG(),
                            n.readBits(1),
                            n.readBool()))
                            for (var c = 3 !== l ? 8 : 12, _ = 0; _ < c; _++)
                                n.readBool() && (_ < 6 ? e._skipScalingList(n, 16) : e._skipScalingList(n, 64));
                        n.readUEG();
                        var m = n.readUEG();
                        if (0 === m)
                            n.readUEG();
                        else if (1 === m) {
                            n.readBits(1),
                                n.readSEG(),
                                n.readSEG();
                            for (var p = n.readUEG(), v = 0; v < p; v++)
                                n.readSEG()
                        }
                        var g = n.readUEG();
                        n.readBits(1);
                        var y = n.readUEG()
                            , E = n.readUEG()
                            , b = n.readBits(1);
                        0 === b && n.readBits(1),
                            n.readBits(1);
                        var S = 0
                            , k = 0
                            , L = 0
                            , R = 0;
                        n.readBool() && (S = n.readUEG(),
                            k = n.readUEG(),
                            L = n.readUEG(),
                            R = n.readUEG());
                        var A = 1
                            , w = 1
                            , T = 0
                            , O = !0
                            , C = 0
                            , I = 0;
                        if (n.readBool()) {
                            if (n.readBool()) {
                                var D = n.readByte()
                                    , x = [1, 12, 10, 16, 40, 24, 20, 32, 80, 18, 15, 64, 160, 4, 3, 2]
                                    , M = [1, 11, 11, 11, 33, 11, 11, 11, 33, 11, 11, 33, 99, 3, 2, 1];
                                D > 0 && D < 16 ? (A = x[D - 1],
                                    w = M[D - 1]) : 255 === D && (A = n.readByte() << 8 | n.readByte(),
                                    w = n.readByte() << 8 | n.readByte())
                            }
                            if (n.readBool() && n.readBool(),
                            n.readBool() && (n.readBits(4),
                            n.readBool() && n.readBits(24)),
                            n.readBool() && (n.readUEG(),
                                n.readUEG()),
                                n.readBool()) {
                                var B = n.readBits(32)
                                    , j = n.readBits(32);
                                O = n.readBool(),
                                    C = j,
                                    I = 2 * B,
                                    T = C / I
                            }
                        }
                        var P = 1;
                        1 === A && 1 === w || (P = A / w);
                        var U = 0
                            , N = 0;
                        if (0 === l)
                            U = 1,
                                N = 2 - b;
                        else {
                            var F = 3 === l ? 1 : 2
                                , G = 1 === l ? 2 : 1;
                            U = F,
                                N = G * (2 - b)
                        }
                        var V = 16 * (y + 1)
                            , z = 16 * (E + 1) * (2 - b);
                        V -= (S + k) * U,
                            z -= (L + R) * N;
                        var H = Math.ceil(V * P);
                        return n.destroy(),
                            n = null,
                            {
                                profile_string: o,
                                level_string: u,
                                bit_depth: f,
                                ref_frames: g,
                                chroma_format: d,
                                chroma_format_string: e.getChromaFormatString(d),
                                frame_rate: {
                                    fixed: O,
                                    fps: T,
                                    fps_den: I,
                                    fps_num: C
                                },
                                sar_ratio: {
                                    width: A,
                                    height: w
                                },
                                codec_size: {
                                    width: V,
                                    height: z
                                },
                                present_size: {
                                    width: H,
                                    height: z
                                }
                            }
                    }
                }, {
                    key: "_skipScalingList",
                    value: function(e, t) {
                        for (var i = 8, n = 8, r = 0, s = 0; s < t; s++)
                            0 !== n && (r = e.readSEG(),
                                n = (i + r + 256) % 256),
                                i = 0 === n ? i : n
                    }
                }, {
                    key: "getProfileString",
                    value: function(e) {
                        switch (e) {
                            case 66:
                                return "Baseline";
                            case 77:
                                return "Main";
                            case 88:
                                return "Extended";
                            case 100:
                                return "High";
                            case 110:
                                return "High10";
                            case 122:
                                return "High422";
                            case 244:
                                return "High444";
                            default:
                                return "Unknown"
                        }
                    }
                }, {
                    key: "getLevelString",
                    value: function(e) {
                        return (e / 10).toFixed(1)
                    }
                }, {
                    key: "getChromaFormatString",
                    value: function(e) {
                        switch (e) {
                            case 420:
                                return "4:2:0";
                            case 422:
                                return "4:2:2";
                            case 444:
                                return "4:4:4";
                            default:
                                return "Unknown"
                        }
                    }
                }]),
                    e
            }();
            i.default = o
        }
            , {
                "./exp-golomb.js": 17
            }],
        20: [function(e, t, i) {
            "use strict";
            function n(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function r(e, t) {
                var i = e;
                if (null == i || "object" !== (void 0 === i ? "undefined" : o(i)))
                    throw new S.InvalidArgumentException("MediaDataSource must be an javascript object!");
                if (!i.hasOwnProperty("type"))
                    throw new S.InvalidArgumentException("MediaDataSource must has type field to indicate video file type!");
                switch (i.type) {
                    case "flv":
                        return new _.default(i,t);
                    default:
                        return new p.default(i,t)
                }
            }
            function s() {
                return h.default.supportMSEH264Playback()
            }
            function a() {
                return h.default.getFeatureList()
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                , u = e("./utils/polyfill.js")
                , l = n(u)
                , d = e("./core/features.js")
                , h = n(d)
                , f = e("./io/loader.js")
                , c = e("./player/flv-player.js")
                , _ = n(c)
                , m = e("./player/native-player.js")
                , p = n(m)
                , v = e("./player/player-events.js")
                , g = n(v)
                , y = e("./player/player-errors.js")
                , E = e("./utils/logging-control.js")
                , b = n(E)
                , S = e("./utils/exception.js");
            l.default.install();
            var k = {};
            k.createPlayer = r,
                k.isSupported = s,
                k.getFeatureList = a,
                k.BaseLoader = f.BaseLoader,
                k.LoaderStatus = f.LoaderStatus,
                k.LoaderErrors = f.LoaderErrors,
                k.Events = g.default,
                k.ErrorTypes = y.ErrorTypes,
                k.ErrorDetails = y.ErrorDetails,
                k.FlvPlayer = _.default,
                k.NativePlayer = p.default,
                k.LoggingControl = b.default,
                Object.defineProperty(k, "version", {
                    enumerable: !0,
                    get: function() {
                        return "1.5.0"
                    }
                }),
                i.default = k
        }
            , {
                "./core/features.js": 6,
                "./io/loader.js": 24,
                "./player/flv-player.js": 32,
                "./player/native-player.js": 33,
                "./player/player-errors.js": 34,
                "./player/player-events.js": 35,
                "./utils/exception.js": 40,
                "./utils/logging-control.js": 42,
                "./utils/polyfill.js": 43
            }],
        21: [function(e, t, i) {
            "use strict";
            t.exports = e("./flv.js").default
        }
            , {
                "./flv.js": 20
            }],
        22: [function(e, t, i) {
            "use strict";
            function n(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function r(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function s(e, t) {
                if (!e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            function a(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                , u = function e(t, i, n) {
                null === t && (t = Function.prototype);
                var r = Object.getOwnPropertyDescriptor(t, i);
                if (void 0 === r) {
                    var s = Object.getPrototypeOf(t);
                    return null === s ? void 0 : e(s, i, n)
                }
                if ("value"in r)
                    return r.value;
                var a = r.get;
                if (void 0 !== a)
                    return a.call(n)
            }
                , l = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                        "value"in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i),
                    n && e(t, n),
                        t
                }
            }()
                , d = e("../utils/logger.js")
                , h = (n(d),
                e("../utils/browser.js"))
                , f = n(h)
                , c = e("./loader.js")
                , _ = e("../utils/exception.js")
                , m = function(e) {
                function t(e, i) {
                    r(this, t);
                    var n = s(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "fetch-stream-loader"));
                    return n.TAG = "FetchStreamLoader",
                        n._seekHandler = e,
                        n._config = i,
                        n._needStash = !0,
                        n._requestAbort = !1,
                        n._contentLength = null,
                        n._receivedLength = 0,
                        n
                }
                return a(t, e),
                    l(t, null, [{
                        key: "isSupported",
                        value: function() {
                            try {
                                var e = f.default.msedge && f.default.version.minor >= 15048
                                    , t = !f.default.msedge || e;
                                return self.fetch && self.ReadableStream && t
                            } catch (e) {
                                return !1
                            }
                        }
                    }]),
                    l(t, [{
                        key: "destroy",
                        value: function() {
                            this.isWorking() && this.abort(),
                                u(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "destroy", this).call(this)
                        }
                    }, {
                        key: "open",
                        value: function(e, t) {
                            var i = this;
                            this._dataSource = e,
                                this._range = t;
                            var n = e.url;
                            this._config.reuseRedirectedURL && void 0 != e.redirectedURL && (n = e.redirectedURL);
                            var r = this._seekHandler.getConfig(n, t)
                                , s = new self.Headers;
                            if ("object" === o(r.headers)) {
                                var a = r.headers;
                                for (var u in a)
                                    a.hasOwnProperty(u) && s.append(u, a[u])
                            }
                            var l = {
                                method: "GET",
                                headers: s,
                                mode: "cors",
                                cache: "default",
                                referrerPolicy: "no-referrer-when-downgrade"
                            };
                            if ("object" === o(this._config.headers))
                                for (var d in this._config.headers)
                                    s.append(d, this._config.headers[d]);
                            !1 === e.cors && (l.mode = "same-origin"),
                            e.withCredentials && (l.credentials = "include"),
                            e.referrerPolicy && (l.referrerPolicy = e.referrerPolicy),
                                this._status = c.LoaderStatus.kConnecting,
                                self.fetch(r.url, l).then(function(e) {
                                    if (i._requestAbort)
                                        return i._requestAbort = !1,
                                            void (i._status = c.LoaderStatus.kIdle);
                                    if (e.ok && e.status >= 200 && e.status <= 299) {
                                        if (e.url !== r.url && i._onURLRedirect) {
                                            var t = i._seekHandler.removeURLParameters(e.url);
                                            i._onURLRedirect(t)
                                        }
                                        var n = e.headers.get("Content-Length");
                                        return null != n && (i._contentLength = parseInt(n),
                                        0 !== i._contentLength && i._onContentLengthKnown && i._onContentLengthKnown(i._contentLength)),
                                            i._pump.call(i, e.body.getReader())
                                    }
                                    if (i._status = c.LoaderStatus.kError,
                                        !i._onError)
                                        throw new _.RuntimeException("FetchStreamLoader: Http code invalid, " + e.status + " " + e.statusText);
                                    i._onError(c.LoaderErrors.HTTP_STATUS_CODE_INVALID, {
                                        code: e.status,
                                        msg: e.statusText
                                    })
                                }).catch(function(e) {
                                    if (i._status = c.LoaderStatus.kError,
                                        !i._onError)
                                        throw e;
                                    i._onError(c.LoaderErrors.EXCEPTION, {
                                        code: -1,
                                        msg: e.message
                                    })
                                })
                        }
                    }, {
                        key: "abort",
                        value: function() {
                            this._requestAbort = !0
                        }
                    }, {
                        key: "_pump",
                        value: function(e) {
                            var t = this;
                            return e.read().then(function(i) {
                                if (i.done)
                                    if (null !== t._contentLength && t._receivedLength < t._contentLength) {
                                        t._status = c.LoaderStatus.kError;
                                        var n = c.LoaderErrors.EARLY_EOF
                                            , r = {
                                            code: -1,
                                            msg: "Fetch stream meet Early-EOF"
                                        };
                                        if (!t._onError)
                                            throw new _.RuntimeException(r.msg);
                                        t._onError(n, r)
                                    } else
                                        t._status = c.LoaderStatus.kComplete,
                                        t._onComplete && t._onComplete(t._range.from, t._range.from + t._receivedLength - 1);
                                else {
                                    if (!0 === t._requestAbort)
                                        return t._requestAbort = !1,
                                            t._status = c.LoaderStatus.kComplete,
                                            e.cancel();
                                    t._status = c.LoaderStatus.kBuffering;
                                    var s = i.value.buffer
                                        , a = t._range.from + t._receivedLength;
                                    t._receivedLength += s.byteLength,
                                    t._onDataArrival && t._onDataArrival(s, a, t._receivedLength),
                                        t._pump(e)
                                }
                            }).catch(function(e) {
                                if (11 !== e.code || !f.default.msedge) {
                                    t._status = c.LoaderStatus.kError;
                                    var i = 0
                                        , n = null;
                                    if (19 !== e.code && "network error" !== e.message || !(null === t._contentLength || null !== t._contentLength && t._receivedLength < t._contentLength) ? (i = c.LoaderErrors.EXCEPTION,
                                        n = {
                                            code: e.code,
                                            msg: e.message
                                        }) : (i = c.LoaderErrors.EARLY_EOF,
                                        n = {
                                            code: e.code,
                                            msg: "Fetch stream meet Early-EOF"
                                        }),
                                        !t._onError)
                                        throw new _.RuntimeException(n.msg);
                                    t._onError(i, n)
                                }
                            })
                        }
                    }]),
                    t
            }(c.BaseLoader);
            i.default = m
        }
            , {
                "../utils/browser.js": 39,
                "../utils/exception.js": 40,
                "../utils/logger.js": 41,
                "./loader.js": 24
            }],
        23: [function(e, t, i) {
            "use strict";
            function n(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function r(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                        "value"in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i),
                    n && e(t, n),
                        t
                }
            }()
                , a = e("../utils/logger.js")
                , o = n(a)
                , u = e("./speed-sampler.js")
                , l = n(u)
                , d = e("./loader.js")
                , h = e("./fetch-stream-loader.js")
                , f = n(h)
                , c = e("./xhr-moz-chunked-loader.js")
                , _ = n(c)
                , m = e("./xhr-msstream-loader.js")
                , p = (n(m),
                e("./xhr-range-loader.js"))
                , v = n(p)
                , g = e("./websocket-loader.js")
                , y = n(g)
                , E = e("./range-seek-handler.js")
                , b = n(E)
                , S = e("./param-seek-handler.js")
                , k = n(S)
                , L = e("../utils/exception.js")
                , R = function() {
                function e(t, i, n) {
                    r(this, e),
                        this.TAG = "IOController",
                        this._config = i,
                        this._extraData = n,
                        this._stashInitialSize = 393216,
                    void 0 != i.stashInitialSize && i.stashInitialSize > 0 && (this._stashInitialSize = i.stashInitialSize),
                        this._stashUsed = 0,
                        this._stashSize = this._stashInitialSize,
                        this._bufferSize = 3145728,
                        this._stashBuffer = new ArrayBuffer(this._bufferSize),
                        this._stashByteStart = 0,
                        this._enableStash = !0,
                    !1 === i.enableStashBuffer && (this._enableStash = !1),
                        this._loader = null,
                        this._loaderClass = null,
                        this._seekHandler = null,
                        this._dataSource = t,
                        this._isWebSocketURL = /wss?:\/\/(.+?)/.test(t.url),
                        this._refTotalLength = t.filesize ? t.filesize : null,
                        this._totalLength = this._refTotalLength,
                        this._fullRequestFlag = !1,
                        this._currentRange = null,
                        this._redirectedURL = null,
                        this._speedNormalized = 0,
                        this._speedSampler = new l.default,
                        this._speedNormalizeList = [64, 128, 256, 384, 512, 768, 1024, 1536, 2048, 3072, 4096],
                        this._isEarlyEofReconnecting = !1,
                        this._paused = !1,
                        this._resumeFrom = 0,
                        this._onDataArrival = null,
                        this._onSeeked = null,
                        this._onError = null,
                        this._onComplete = null,
                        this._onRedirect = null,
                        this._onRecoveredEarlyEof = null,
                        this._selectSeekHandler(),
                        this._selectLoader(),
                        this._createLoader()
                }
                return s(e, [{
                    key: "destroy",
                    value: function() {
                        this._loader.isWorking() && this._loader.abort(),
                            this._loader.destroy(),
                            this._loader = null,
                            this._loaderClass = null,
                            this._dataSource = null,
                            this._stashBuffer = null,
                            this._stashUsed = this._stashSize = this._bufferSize = this._stashByteStart = 0,
                            this._currentRange = null,
                            this._speedSampler = null,
                            this._isEarlyEofReconnecting = !1,
                            this._onDataArrival = null,
                            this._onSeeked = null,
                            this._onError = null,
                            this._onComplete = null,
                            this._onRedirect = null,
                            this._onRecoveredEarlyEof = null,
                            this._extraData = null
                    }
                }, {
                    key: "isWorking",
                    value: function() {
                        return this._loader && this._loader.isWorking() && !this._paused
                    }
                }, {
                    key: "isPaused",
                    value: function() {
                        return this._paused
                    }
                }, {
                    key: "_selectSeekHandler",
                    value: function() {
                        var e = this._config;
                        if ("range" === e.seekType)
                            this._seekHandler = new b.default(this._config.rangeLoadZeroStart);
                        else if ("param" === e.seekType) {
                            var t = e.seekParamStart || "bstart"
                                , i = e.seekParamEnd || "bend";
                            this._seekHandler = new k.default(t,i)
                        } else {
                            if ("custom" !== e.seekType)
                                throw new L.InvalidArgumentException("Invalid seekType in config: " + e.seekType);
                            if ("function" != typeof e.customSeekHandler)
                                throw new L.InvalidArgumentException("Custom seekType specified in config but invalid customSeekHandler!");
                            this._seekHandler = new e.customSeekHandler
                        }
                    }
                }, {
                    key: "_selectLoader",
                    value: function() {
                        if (null != this._config.customLoader)
                            this._loaderClass = this._config.customLoader;
                        else if (this._isWebSocketURL)
                            this._loaderClass = y.default;
                        else if (f.default.isSupported())
                            this._loaderClass = f.default;
                        else if (_.default.isSupported())
                            this._loaderClass = _.default;
                        else {
                            if (!v.default.isSupported())
                                throw new L.RuntimeException("Your browser doesn't support xhr with arraybuffer responseType!");
                            this._loaderClass = v.default
                        }
                    }
                }, {
                    key: "_createLoader",
                    value: function() {
                        this._loader = new this._loaderClass(this._seekHandler,this._config),
                        !1 === this._loader.needStashBuffer && (this._enableStash = !1),
                            this._loader.onContentLengthKnown = this._onContentLengthKnown.bind(this),
                            this._loader.onURLRedirect = this._onURLRedirect.bind(this),
                            this._loader.onDataArrival = this._onLoaderChunkArrival.bind(this),
                            this._loader.onComplete = this._onLoaderComplete.bind(this),
                            this._loader.onError = this._onLoaderError.bind(this)
                    }
                }, {
                    key: "open",
                    value: function(e) {
                        this._currentRange = {
                            from: 0,
                            to: -1
                        },
                        e && (this._currentRange.from = e),
                            this._speedSampler.reset(),
                        e || (this._fullRequestFlag = !0),
                            this._loader.open(this._dataSource, Object.assign({}, this._currentRange))
                    }
                }, {
                    key: "abort",
                    value: function() {
                        this._loader.abort(),
                        this._paused && (this._paused = !1,
                            this._resumeFrom = 0)
                    }
                }, {
                    key: "pause",
                    value: function() {
                        this.isWorking() && (this._loader.abort(),
                            0 !== this._stashUsed ? (this._resumeFrom = this._stashByteStart,
                                this._currentRange.to = this._stashByteStart - 1) : this._resumeFrom = this._currentRange.to + 1,
                            this._stashUsed = 0,
                            this._stashByteStart = 0,
                            this._paused = !0)
                    }
                }, {
                    key: "resume",
                    value: function() {
                        if (this._paused) {
                            this._paused = !1;
                            var e = this._resumeFrom;
                            this._resumeFrom = 0,
                                this._internalSeek(e, !0)
                        }
                    }
                }, {
                    key: "seek",
                    value: function(e) {
                        this._paused = !1,
                            this._stashUsed = 0,
                            this._stashByteStart = 0,
                            this._internalSeek(e, !0)
                    }
                }, {
                    key: "_internalSeek",
                    value: function(e, t) {
                        this._loader.isWorking() && this._loader.abort(),
                            this._flushStashBuffer(t),
                            this._loader.destroy(),
                            this._loader = null;
                        var i = {
                            from: e,
                            to: -1
                        };
                        this._currentRange = {
                            from: i.from,
                            to: -1
                        },
                            this._speedSampler.reset(),
                            this._stashSize = this._stashInitialSize,
                            this._createLoader(),
                            this._loader.open(this._dataSource, i),
                        this._onSeeked && this._onSeeked()
                    }
                }, {
                    key: "updateUrl",
                    value: function(e) {
                        if (!e || "string" != typeof e || 0 === e.length)
                            throw new L.InvalidArgumentException("Url must be a non-empty string!");
                        this._dataSource.url = e
                    }
                }, {
                    key: "_expandBuffer",
                    value: function(e) {
                        for (var t = this._stashSize; t + 1048576 < e; )
                            t *= 2;
                        if ((t += 1048576) !== this._bufferSize) {
                            var i = new ArrayBuffer(t);
                            if (this._stashUsed > 0) {
                                var n = new Uint8Array(this._stashBuffer,0,this._stashUsed);
                                new Uint8Array(i,0,t).set(n, 0)
                            }
                            this._stashBuffer = i,
                                this._bufferSize = t
                        }
                    }
                }, {
                    key: "_normalizeSpeed",
                    value: function(e) {
                        var t = this._speedNormalizeList
                            , i = t.length - 1
                            , n = 0
                            , r = 0
                            , s = i;
                        if (e < t[0])
                            return t[0];
                        for (; r <= s; ) {
                            if ((n = r + Math.floor((s - r) / 2)) === i || e >= t[n] && e < t[n + 1])
                                return t[n];
                            t[n] < e ? r = n + 1 : s = n - 1
                        }
                    }
                }, {
                    key: "_adjustStashSize",
                    value: function(e) {
                        var t = 0;
                        (t = this._config.isLive ? e : e < 512 ? e : e >= 512 && e <= 1024 ? Math.floor(1.5 * e) : 2 * e) > 8192 && (t = 8192);
                        var i = 1024 * t + 1048576;
                        this._bufferSize < i && this._expandBuffer(i),
                            this._stashSize = 1024 * t
                    }
                }, {
                    key: "_dispatchChunks",
                    value: function(e, t) {
                        return this._currentRange.to = t + e.byteLength - 1,
                            this._onDataArrival(e, t)
                    }
                }, {
                    key: "_onURLRedirect",
                    value: function(e) {
                        this._redirectedURL = e,
                        this._onRedirect && this._onRedirect(e)
                    }
                }, {
                    key: "_onContentLengthKnown",
                    value: function(e) {
                        e && this._fullRequestFlag && (this._totalLength = e,
                            this._fullRequestFlag = !1)
                    }
                }, {
                    key: "_onLoaderChunkArrival",
                    value: function(e, t, i) {
                        if (!this._onDataArrival)
                            throw new L.IllegalStateException("IOController: No existing consumer (onDataArrival) callback!");
                        if (!this._paused) {
                            this._isEarlyEofReconnecting && (this._isEarlyEofReconnecting = !1,
                            this._onRecoveredEarlyEof && this._onRecoveredEarlyEof()),
                                this._speedSampler.addBytes(e.byteLength);
                            var n = this._speedSampler.lastSecondKBps;
                            if (0 !== n) {
                                var r = this._normalizeSpeed(n);
                                this._speedNormalized !== r && (this._speedNormalized = r,
                                    this._adjustStashSize(r))
                            }
                            if (this._enableStash)
                                if (0 === this._stashUsed && 0 === this._stashByteStart && (this._stashByteStart = t),
                                this._stashUsed + e.byteLength <= this._stashSize) {
                                    var s = new Uint8Array(this._stashBuffer,0,this._stashSize);
                                    s.set(new Uint8Array(e), this._stashUsed),
                                        this._stashUsed += e.byteLength
                                } else {
                                    var a = new Uint8Array(this._stashBuffer,0,this._bufferSize);
                                    if (this._stashUsed > 0) {
                                        var o = this._stashBuffer.slice(0, this._stashUsed)
                                            , u = this._dispatchChunks(o, this._stashByteStart);
                                        if (u < o.byteLength) {
                                            if (u > 0) {
                                                var l = new Uint8Array(o,u);
                                                a.set(l, 0),
                                                    this._stashUsed = l.byteLength,
                                                    this._stashByteStart += u
                                            }
                                        } else
                                            this._stashUsed = 0,
                                                this._stashByteStart += u;
                                        this._stashUsed + e.byteLength > this._bufferSize && (this._expandBuffer(this._stashUsed + e.byteLength),
                                            a = new Uint8Array(this._stashBuffer,0,this._bufferSize)),
                                            a.set(new Uint8Array(e), this._stashUsed),
                                            this._stashUsed += e.byteLength
                                    } else {
                                        var d = this._dispatchChunks(e, t);
                                        if (d < e.byteLength) {
                                            var h = e.byteLength - d;
                                            h > this._bufferSize && (this._expandBuffer(h),
                                                a = new Uint8Array(this._stashBuffer,0,this._bufferSize)),
                                                a.set(new Uint8Array(e,d), 0),
                                                this._stashUsed += h,
                                                this._stashByteStart = t + d
                                        }
                                    }
                                }
                            else if (0 === this._stashUsed) {
                                var f = this._dispatchChunks(e, t);
                                if (f < e.byteLength) {
                                    var c = e.byteLength - f;
                                    c > this._bufferSize && this._expandBuffer(c);
                                    var _ = new Uint8Array(this._stashBuffer,0,this._bufferSize);
                                    _.set(new Uint8Array(e,f), 0),
                                        this._stashUsed += c,
                                        this._stashByteStart = t + f
                                }
                            } else {
                                this._stashUsed + e.byteLength > this._bufferSize && this._expandBuffer(this._stashUsed + e.byteLength);
                                var m = new Uint8Array(this._stashBuffer,0,this._bufferSize);
                                m.set(new Uint8Array(e), this._stashUsed),
                                    this._stashUsed += e.byteLength;
                                var p = this._dispatchChunks(this._stashBuffer.slice(0, this._stashUsed), this._stashByteStart);
                                if (p < this._stashUsed && p > 0) {
                                    var v = new Uint8Array(this._stashBuffer,p);
                                    m.set(v, 0)
                                }
                                this._stashUsed -= p,
                                    this._stashByteStart += p
                            }
                        }
                    }
                }, {
                    key: "_flushStashBuffer",
                    value: function(e) {
                        if (this._stashUsed > 0) {
                            var t = this._stashBuffer.slice(0, this._stashUsed)
                                , i = this._dispatchChunks(t, this._stashByteStart)
                                , n = t.byteLength - i;
                            if (i < t.byteLength) {
                                if (!e) {
                                    if (i > 0) {
                                        var r = new Uint8Array(this._stashBuffer,0,this._bufferSize)
                                            , s = new Uint8Array(t,i);
                                        r.set(s, 0),
                                            this._stashUsed = s.byteLength,
                                            this._stashByteStart += i
                                    }
                                    return 0
                                }
                                o.default.w(this.TAG, n + " bytes unconsumed data remain when flush buffer, dropped")
                            }
                            return this._stashUsed = 0,
                                this._stashByteStart = 0,
                                n
                        }
                        return 0
                    }
                }, {
                    key: "_onLoaderComplete",
                    value: function(e, t) {
                        this._flushStashBuffer(!0),
                        this._onComplete && this._onComplete(this._extraData)
                    }
                }, {
                    key: "_onLoaderError",
                    value: function(e, t) {
                        switch (o.default.e(this.TAG, "Loader error, code = " + t.code + ", msg = " + t.msg),
                            this._flushStashBuffer(!1),
                        this._isEarlyEofReconnecting && (this._isEarlyEofReconnecting = !1,
                            e = d.LoaderErrors.UNRECOVERABLE_EARLY_EOF),
                            e) {
                            case d.LoaderErrors.EARLY_EOF:
                                if (!this._config.isLive && this._totalLength) {
                                    var i = this._currentRange.to + 1;
                                    return void (i < this._totalLength && (o.default.w(this.TAG, "Connection lost, trying reconnect..."),
                                        this._isEarlyEofReconnecting = !0,
                                        this._internalSeek(i, !1)))
                                }
                                e = d.LoaderErrors.UNRECOVERABLE_EARLY_EOF;
                                break;
                            case d.LoaderErrors.UNRECOVERABLE_EARLY_EOF:
                            case d.LoaderErrors.CONNECTING_TIMEOUT:
                            case d.LoaderErrors.HTTP_STATUS_CODE_INVALID:
                            case d.LoaderErrors.EXCEPTION:
                        }
                        if (!this._onError)
                            throw new L.RuntimeException("IOException: " + t.msg);
                        this._onError(e, t)
                    }
                }, {
                    key: "status",
                    get: function() {
                        return this._loader.status
                    }
                }, {
                    key: "extraData",
                    get: function() {
                        return this._extraData
                    },
                    set: function(e) {
                        this._extraData = e
                    }
                }, {
                    key: "onDataArrival",
                    get: function() {
                        return this._onDataArrival
                    },
                    set: function(e) {
                        this._onDataArrival = e
                    }
                }, {
                    key: "onSeeked",
                    get: function() {
                        return this._onSeeked
                    },
                    set: function(e) {
                        this._onSeeked = e
                    }
                }, {
                    key: "onError",
                    get: function() {
                        return this._onError
                    },
                    set: function(e) {
                        this._onError = e
                    }
                }, {
                    key: "onComplete",
                    get: function() {
                        return this._onComplete
                    },
                    set: function(e) {
                        this._onComplete = e
                    }
                }, {
                    key: "onRedirect",
                    get: function() {
                        return this._onRedirect
                    },
                    set: function(e) {
                        this._onRedirect = e
                    }
                }, {
                    key: "onRecoveredEarlyEof",
                    get: function() {
                        return this._onRecoveredEarlyEof
                    },
                    set: function(e) {
                        this._onRecoveredEarlyEof = e
                    }
                }, {
                    key: "currentURL",
                    get: function() {
                        return this._dataSource.url
                    }
                }, {
                    key: "hasRedirect",
                    get: function() {
                        return null != this._redirectedURL || void 0 != this._dataSource.redirectedURL
                    }
                }, {
                    key: "currentRedirectedURL",
                    get: function() {
                        return this._redirectedURL || this._dataSource.redirectedURL
                    }
                }, {
                    key: "currentSpeed",
                    get: function() {
                        return this._loaderClass === v.default ? this._loader.currentSpeed : this._speedSampler.lastSecondKBps
                    }
                }, {
                    key: "loaderType",
                    get: function() {
                        return this._loader.type
                    }
                }]),
                    e
            }();
            i.default = R
        }
            , {
                "../utils/exception.js": 40,
                "../utils/logger.js": 41,
                "./fetch-stream-loader.js": 22,
                "./loader.js": 24,
                "./param-seek-handler.js": 25,
                "./range-seek-handler.js": 26,
                "./speed-sampler.js": 27,
                "./websocket-loader.js": 28,
                "./xhr-moz-chunked-loader.js": 29,
                "./xhr-msstream-loader.js": 30,
                "./xhr-range-loader.js": 31
            }],
        24: [function(e, t, i) {
            "use strict";
            function n(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            }),
                i.BaseLoader = i.LoaderErrors = i.LoaderStatus = void 0;
            var r = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                        "value"in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i),
                    n && e(t, n),
                        t
                }
            }()
                , s = e("../utils/exception.js")
                , a = i.LoaderStatus = {
                kIdle: 0,
                kConnecting: 1,
                kBuffering: 2,
                kError: 3,
                kComplete: 4
            };
            i.LoaderErrors = {
                OK: "OK",
                EXCEPTION: "Exception",
                HTTP_STATUS_CODE_INVALID: "HttpStatusCodeInvalid",
                CONNECTING_TIMEOUT: "ConnectingTimeout",
                EARLY_EOF: "EarlyEof",
                UNRECOVERABLE_EARLY_EOF: "UnrecoverableEarlyEof"
            },
                i.BaseLoader = function() {
                    function e(t) {
                        n(this, e),
                            this._type = t || "undefined",
                            this._status = a.kIdle,
                            this._needStash = !1,
                            this._onContentLengthKnown = null,
                            this._onURLRedirect = null,
                            this._onDataArrival = null,
                            this._onError = null,
                            this._onComplete = null
                    }
                    return r(e, [{
                        key: "destroy",
                        value: function() {
                            this._status = a.kIdle,
                                this._onContentLengthKnown = null,
                                this._onURLRedirect = null,
                                this._onDataArrival = null,
                                this._onError = null,
                                this._onComplete = null
                        }
                    }, {
                        key: "isWorking",
                        value: function() {
                            return this._status === a.kConnecting || this._status === a.kBuffering
                        }
                    }, {
                        key: "open",
                        value: function(e, t) {
                            throw new s.NotImplementedException("Unimplemented abstract function!")
                        }
                    }, {
                        key: "abort",
                        value: function() {
                            throw new s.NotImplementedException("Unimplemented abstract function!")
                        }
                    }, {
                        key: "type",
                        get: function() {
                            return this._type
                        }
                    }, {
                        key: "status",
                        get: function() {
                            return this._status
                        }
                    }, {
                        key: "needStashBuffer",
                        get: function() {
                            return this._needStash
                        }
                    }, {
                        key: "onContentLengthKnown",
                        get: function() {
                            return this._onContentLengthKnown
                        },
                        set: function(e) {
                            this._onContentLengthKnown = e
                        }
                    }, {
                        key: "onURLRedirect",
                        get: function() {
                            return this._onURLRedirect
                        },
                        set: function(e) {
                            this._onURLRedirect = e
                        }
                    }, {
                        key: "onDataArrival",
                        get: function() {
                            return this._onDataArrival
                        },
                        set: function(e) {
                            this._onDataArrival = e
                        }
                    }, {
                        key: "onError",
                        get: function() {
                            return this._onError
                        },
                        set: function(e) {
                            this._onError = e
                        }
                    }, {
                        key: "onComplete",
                        get: function() {
                            return this._onComplete
                        },
                        set: function(e) {
                            this._onComplete = e
                        }
                    }]),
                        e
                }()
        }
            , {
                "../utils/exception.js": 40
            }],
        25: [function(e, t, i) {
            "use strict";
            function n(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var r = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                        "value"in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i),
                    n && e(t, n),
                        t
                }
            }()
                , s = function() {
                function e(t, i) {
                    n(this, e),
                        this._startName = t,
                        this._endName = i
                }
                return r(e, [{
                    key: "getConfig",
                    value: function(e, t) {
                        var i = e;
                        if (0 !== t.from || -1 !== t.to) {
                            var n = !0;
                            -1 === i.indexOf("?") && (i += "?",
                                n = !1),
                            n && (i += "&"),
                                i += this._startName + "=" + t.from.toString(),
                            -1 !== t.to && (i += "&" + this._endName + "=" + t.to.toString())
                        }
                        return {
                            url: i,
                            headers: {}
                        }
                    }
                }, {
                    key: "removeURLParameters",
                    value: function(e) {
                        var t = e.split("?")[0]
                            , i = void 0
                            , n = e.indexOf("?");
                        -1 !== n && (i = e.substring(n + 1));
                        var r = "";
                        if (void 0 != i && i.length > 0)
                            for (var s = i.split("&"), a = 0; a < s.length; a++) {
                                var o = s[a].split("=")
                                    , u = a > 0;
                                o[0] !== this._startName && o[0] !== this._endName && (u && (r += "&"),
                                    r += s[a])
                            }
                        return 0 === r.length ? t : t + "?" + r
                    }
                }]),
                    e
            }();
            i.default = s
        }
            , {}],
        26: [function(e, t, i) {
            "use strict";
            function n(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var r = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                        "value"in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i),
                    n && e(t, n),
                        t
                }
            }()
                , s = function() {
                function e(t) {
                    n(this, e),
                        this._zeroStart = t || !1
                }
                return r(e, [{
                    key: "getConfig",
                    value: function(e, t) {
                        var i = {};
                        if (0 !== t.from || -1 !== t.to) {
                            var n = void 0;
                            n = -1 !== t.to ? "bytes=" + t.from.toString() + "-" + t.to.toString() : "bytes=" + t.from.toString() + "-",
                                i.Range = n
                        } else
                            this._zeroStart && (i.Range = "bytes=0-");
                        return {
                            url: e,
                            headers: i
                        }
                    }
                }, {
                    key: "removeURLParameters",
                    value: function(e) {
                        return e
                    }
                }]),
                    e
            }();
            i.default = s
        }
            , {}],
        27: [function(e, t, i) {
            "use strict";
            function n(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var r = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                        "value"in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i),
                    n && e(t, n),
                        t
                }
            }()
                , s = function() {
                function e() {
                    n(this, e),
                        this._firstCheckpoint = 0,
                        this._lastCheckpoint = 0,
                        this._intervalBytes = 0,
                        this._totalBytes = 0,
                        this._lastSecondBytes = 0,
                        self.performance && self.performance.now ? this._now = self.performance.now.bind(self.performance) : this._now = Date.now
                }
                return r(e, [{
                    key: "reset",
                    value: function() {
                        this._firstCheckpoint = this._lastCheckpoint = 0,
                            this._totalBytes = this._intervalBytes = 0,
                            this._lastSecondBytes = 0
                    }
                }, {
                    key: "addBytes",
                    value: function(e) {
                        0 === this._firstCheckpoint ? (this._firstCheckpoint = this._now(),
                            this._lastCheckpoint = this._firstCheckpoint,
                            this._intervalBytes += e,
                            this._totalBytes += e) : this._now() - this._lastCheckpoint < 1e3 ? (this._intervalBytes += e,
                            this._totalBytes += e) : (this._lastSecondBytes = this._intervalBytes,
                            this._intervalBytes = e,
                            this._totalBytes += e,
                            this._lastCheckpoint = this._now())
                    }
                }, {
                    key: "currentKBps",
                    get: function() {
                        this.addBytes(0);
                        var e = (this._now() - this._lastCheckpoint) / 1e3;
                        return 0 == e && (e = 1),
                        this._intervalBytes / e / 1024
                    }
                }, {
                    key: "lastSecondKBps",
                    get: function() {
                        return this.addBytes(0),
                            0 !== this._lastSecondBytes ? this._lastSecondBytes / 1024 : this._now() - this._lastCheckpoint >= 500 ? this.currentKBps : 0
                    }
                }, {
                    key: "averageKBps",
                    get: function() {
                        var e = (this._now() - this._firstCheckpoint) / 1e3;
                        return this._totalBytes / e / 1024
                    }
                }]),
                    e
            }();
            i.default = s
        }
            , {}],
        28: [function(e, t, i) {
            "use strict";
            function n(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function r(e, t) {
                if (!e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            function s(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var a = function e(t, i, n) {
                null === t && (t = Function.prototype);
                var r = Object.getOwnPropertyDescriptor(t, i);
                if (void 0 === r) {
                    var s = Object.getPrototypeOf(t);
                    return null === s ? void 0 : e(s, i, n)
                }
                if ("value"in r)
                    return r.value;
                var a = r.get;
                if (void 0 !== a)
                    return a.call(n)
            }
                , o = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                        "value"in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i),
                    n && e(t, n),
                        t
                }
            }()
                , u = e("../utils/logger.js")
                , l = (function(e) {
                e && e.__esModule
            }(u),
                e("./loader.js"))
                , d = e("../utils/exception.js")
                , h = function(e) {
                function t() {
                    n(this, t);
                    var e = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "websocket-loader"));
                    return e.TAG = "WebSocketLoader",
                        e._needStash = !0,
                        e._ws = null,
                        e._requestAbort = !1,
                        e._receivedLength = 0,
                        e
                }
                return s(t, e),
                    o(t, null, [{
                        key: "isSupported",
                        value: function() {
                            try {
                                return void 0 !== self.WebSocket
                            } catch (e) {
                                return !1
                            }
                        }
                    }]),
                    o(t, [{
                        key: "destroy",
                        value: function() {
                            this._ws && this.abort(),
                                a(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "destroy", this).call(this)
                        }
                    }, {
                        key: "open",
                        value: function(e) {
                            try {
                                var t = this._ws = new self.WebSocket(e.url);
                                t.binaryType = "arraybuffer",
                                    t.onopen = this._onWebSocketOpen.bind(this),
                                    t.onclose = this._onWebSocketClose.bind(this),
                                    t.onmessage = this._onWebSocketMessage.bind(this),
                                    t.onerror = this._onWebSocketError.bind(this),
                                    this._status = l.LoaderStatus.kConnecting
                            } catch (e) {
                                this._status = l.LoaderStatus.kError;
                                var i = {
                                    code: e.code,
                                    msg: e.message
                                };
                                if (!this._onError)
                                    throw new d.RuntimeException(i.msg);
                                this._onError(l.LoaderErrors.EXCEPTION, i)
                            }
                        }
                    }, {
                        key: "abort",
                        value: function() {
                            var e = this._ws;
                            !e || 0 !== e.readyState && 1 !== e.readyState || (this._requestAbort = !0,
                                e.close()),
                                this._ws = null,
                                this._status = l.LoaderStatus.kComplete
                        }
                    }, {
                        key: "_onWebSocketOpen",
                        value: function(e) {
                            this._status = l.LoaderStatus.kBuffering
                        }
                    }, {
                        key: "_onWebSocketClose",
                        value: function(e) {
                            if (!0 === this._requestAbort)
                                return void (this._requestAbort = !1);
                            this._status = l.LoaderStatus.kComplete,
                            this._onComplete && this._onComplete(0, this._receivedLength - 1)
                        }
                    }, {
                        key: "_onWebSocketMessage",
                        value: function(e) {
                            var t = this;
                            if (e.data instanceof ArrayBuffer)
                                this._dispatchArrayBuffer(e.data);
                            else if (e.data instanceof Blob) {
                                var i = new FileReader;
                                i.onload = function() {
                                    t._dispatchArrayBuffer(i.result)
                                }
                                    ,
                                    i.readAsArrayBuffer(e.data)
                            } else {
                                this._status = l.LoaderStatus.kError;
                                var n = {
                                    code: -1,
                                    msg: "Unsupported WebSocket message type: " + e.data.constructor.name
                                };
                                if (!this._onError)
                                    throw new d.RuntimeException(n.msg);
                                this._onError(l.LoaderErrors.EXCEPTION, n)
                            }
                        }
                    }, {
                        key: "_dispatchArrayBuffer",
                        value: function(e) {
                            var t = e
                                , i = this._receivedLength;
                            this._receivedLength += t.byteLength,
                            this._onDataArrival && this._onDataArrival(t, i, this._receivedLength)
                        }
                    }, {
                        key: "_onWebSocketError",
                        value: function(e) {
                            this._status = l.LoaderStatus.kError;
                            var t = {
                                code: e.code,
                                msg: e.message
                            };
                            if (!this._onError)
                                throw new d.RuntimeException(t.msg);
                            this._onError(l.LoaderErrors.EXCEPTION, t)
                        }
                    }]),
                    t
            }(l.BaseLoader);
            i.default = h
        }
            , {
                "../utils/exception.js": 40,
                "../utils/logger.js": 41,
                "./loader.js": 24
            }],
        29: [function(e, t, i) {
            "use strict";
            function n(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function r(e, t) {
                if (!e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            function s(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                , o = function e(t, i, n) {
                null === t && (t = Function.prototype);
                var r = Object.getOwnPropertyDescriptor(t, i);
                if (void 0 === r) {
                    var s = Object.getPrototypeOf(t);
                    return null === s ? void 0 : e(s, i, n)
                }
                if ("value"in r)
                    return r.value;
                var a = r.get;
                if (void 0 !== a)
                    return a.call(n)
            }
                , u = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                        "value"in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i),
                    n && e(t, n),
                        t
                }
            }()
                , l = e("../utils/logger.js")
                , d = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(l)
                , h = e("./loader.js")
                , f = e("../utils/exception.js")
                , c = function(e) {
                function t(e, i) {
                    n(this, t);
                    var s = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "xhr-moz-chunked-loader"));
                    return s.TAG = "MozChunkedLoader",
                        s._seekHandler = e,
                        s._config = i,
                        s._needStash = !0,
                        s._xhr = null,
                        s._requestAbort = !1,
                        s._contentLength = null,
                        s._receivedLength = 0,
                        s
                }
                return s(t, e),
                    u(t, null, [{
                        key: "isSupported",
                        value: function() {
                            try {
                                var e = new XMLHttpRequest;
                                return e.open("GET", "https://example.com", !0),
                                    e.responseType = "moz-chunked-arraybuffer",
                                "moz-chunked-arraybuffer" === e.responseType
                            } catch (e) {
                                return d.default.w("MozChunkedLoader", e.message),
                                    !1
                            }
                        }
                    }]),
                    u(t, [{
                        key: "destroy",
                        value: function() {
                            this.isWorking() && this.abort(),
                            this._xhr && (this._xhr.onreadystatechange = null,
                                this._xhr.onprogress = null,
                                this._xhr.onloadend = null,
                                this._xhr.onerror = null,
                                this._xhr = null),
                                o(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "destroy", this).call(this)
                        }
                    }, {
                        key: "open",
                        value: function(e, t) {
                            this._dataSource = e,
                                this._range = t;
                            var i = e.url;
                            this._config.reuseRedirectedURL && void 0 != e.redirectedURL && (i = e.redirectedURL);
                            var n = this._seekHandler.getConfig(i, t);
                            this._requestURL = n.url;
                            var r = this._xhr = new XMLHttpRequest;
                            if (r.open("GET", n.url, !0),
                                r.responseType = "moz-chunked-arraybuffer",
                                r.onreadystatechange = this._onReadyStateChange.bind(this),
                                r.onprogress = this._onProgress.bind(this),
                                r.onloadend = this._onLoadEnd.bind(this),
                                r.onerror = this._onXhrError.bind(this),
                            e.withCredentials && (r.withCredentials = !0),
                            "object" === a(n.headers)) {
                                var s = n.headers;
                                for (var o in s)
                                    s.hasOwnProperty(o) && r.setRequestHeader(o, s[o])
                            }
                            if ("object" === a(this._config.headers)) {
                                var u = this._config.headers;
                                for (var l in u)
                                    u.hasOwnProperty(l) && r.setRequestHeader(l, u[l])
                            }
                            this._status = h.LoaderStatus.kConnecting,
                                r.send()
                        }
                    }, {
                        key: "abort",
                        value: function() {
                            this._requestAbort = !0,
                            this._xhr && this._xhr.abort(),
                                this._status = h.LoaderStatus.kComplete
                        }
                    }, {
                        key: "_onReadyStateChange",
                        value: function(e) {
                            var t = e.target;
                            if (2 === t.readyState) {
                                if (void 0 != t.responseURL && t.responseURL !== this._requestURL && this._onURLRedirect) {
                                    var i = this._seekHandler.removeURLParameters(t.responseURL);
                                    this._onURLRedirect(i)
                                }
                                if (0 !== t.status && (t.status < 200 || t.status > 299)) {
                                    if (this._status = h.LoaderStatus.kError,
                                        !this._onError)
                                        throw new f.RuntimeException("MozChunkedLoader: Http code invalid, " + t.status + " " + t.statusText);
                                    this._onError(h.LoaderErrors.HTTP_STATUS_CODE_INVALID, {
                                        code: t.status,
                                        msg: t.statusText
                                    })
                                } else
                                    this._status = h.LoaderStatus.kBuffering
                            }
                        }
                    }, {
                        key: "_onProgress",
                        value: function(e) {
                            if (this._status !== h.LoaderStatus.kError) {
                                null === this._contentLength && null !== e.total && 0 !== e.total && (this._contentLength = e.total,
                                this._onContentLengthKnown && this._onContentLengthKnown(this._contentLength));
                                var t = e.target.response
                                    , i = this._range.from + this._receivedLength;
                                this._receivedLength += t.byteLength,
                                this._onDataArrival && this._onDataArrival(t, i, this._receivedLength)
                            }
                        }
                    }, {
                        key: "_onLoadEnd",
                        value: function(e) {
                            if (!0 === this._requestAbort)
                                return void (this._requestAbort = !1);
                            this._status !== h.LoaderStatus.kError && (this._status = h.LoaderStatus.kComplete,
                            this._onComplete && this._onComplete(this._range.from, this._range.from + this._receivedLength - 1))
                        }
                    }, {
                        key: "_onXhrError",
                        value: function(e) {
                            this._status = h.LoaderStatus.kError;
                            var t = 0
                                , i = null;
                            if (this._contentLength && e.loaded < this._contentLength ? (t = h.LoaderErrors.EARLY_EOF,
                                i = {
                                    code: -1,
                                    msg: "Moz-Chunked stream meet Early-Eof"
                                }) : (t = h.LoaderErrors.EXCEPTION,
                                i = {
                                    code: -1,
                                    msg: e.constructor.name + " " + e.type
                                }),
                                !this._onError)
                                throw new f.RuntimeException(i.msg);
                            this._onError(t, i)
                        }
                    }]),
                    t
            }(h.BaseLoader);
            i.default = c
        }
            , {
                "../utils/exception.js": 40,
                "../utils/logger.js": 41,
                "./loader.js": 24
            }],
        30: [function(e, t, i) {
            "use strict";
            function n(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function r(e, t) {
                if (!e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            function s(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                , o = function e(t, i, n) {
                null === t && (t = Function.prototype);
                var r = Object.getOwnPropertyDescriptor(t, i);
                if (void 0 === r) {
                    var s = Object.getPrototypeOf(t);
                    return null === s ? void 0 : e(s, i, n)
                }
                if ("value"in r)
                    return r.value;
                var a = r.get;
                if (void 0 !== a)
                    return a.call(n)
            }
                , u = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                        "value"in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i),
                    n && e(t, n),
                        t
                }
            }()
                , l = e("../utils/logger.js")
                , d = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(l)
                , h = e("./loader.js")
                , f = e("../utils/exception.js")
                , c = function(e) {
                function t(e, i) {
                    n(this, t);
                    var s = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "xhr-msstream-loader"));
                    return s.TAG = "MSStreamLoader",
                        s._seekHandler = e,
                        s._config = i,
                        s._needStash = !0,
                        s._xhr = null,
                        s._reader = null,
                        s._totalRange = null,
                        s._currentRange = null,
                        s._currentRequestURL = null,
                        s._currentRedirectedURL = null,
                        s._contentLength = null,
                        s._receivedLength = 0,
                        s._bufferLimit = 16777216,
                        s._lastTimeBufferSize = 0,
                        s._isReconnecting = !1,
                        s
                }
                return s(t, e),
                    u(t, null, [{
                        key: "isSupported",
                        value: function() {
                            try {
                                if (void 0 === self.MSStream || void 0 === self.MSStreamReader)
                                    return !1;
                                var e = new XMLHttpRequest;
                                return e.open("GET", "https://example.com", !0),
                                    e.responseType = "ms-stream",
                                "ms-stream" === e.responseType
                            } catch (e) {
                                return d.default.w("MSStreamLoader", e.message),
                                    !1
                            }
                        }
                    }]),
                    u(t, [{
                        key: "destroy",
                        value: function() {
                            this.isWorking() && this.abort(),
                            this._reader && (this._reader.onprogress = null,
                                this._reader.onload = null,
                                this._reader.onerror = null,
                                this._reader = null),
                            this._xhr && (this._xhr.onreadystatechange = null,
                                this._xhr = null),
                                o(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "destroy", this).call(this)
                        }
                    }, {
                        key: "open",
                        value: function(e, t) {
                            this._internalOpen(e, t, !1)
                        }
                    }, {
                        key: "_internalOpen",
                        value: function(e, t, i) {
                            this._dataSource = e,
                                i ? this._currentRange = t : this._totalRange = t;
                            var n = e.url;
                            this._config.reuseRedirectedURL && (void 0 != this._currentRedirectedURL ? n = this._currentRedirectedURL : void 0 != e.redirectedURL && (n = e.redirectedURL));
                            var r = this._seekHandler.getConfig(n, t);
                            this._currentRequestURL = r.url;
                            var s = this._reader = new self.MSStreamReader;
                            s.onprogress = this._msrOnProgress.bind(this),
                                s.onload = this._msrOnLoad.bind(this),
                                s.onerror = this._msrOnError.bind(this);
                            var o = this._xhr = new XMLHttpRequest;
                            if (o.open("GET", r.url, !0),
                                o.responseType = "ms-stream",
                                o.onreadystatechange = this._xhrOnReadyStateChange.bind(this),
                                o.onerror = this._xhrOnError.bind(this),
                            e.withCredentials && (o.withCredentials = !0),
                            "object" === a(r.headers)) {
                                var u = r.headers;
                                for (var l in u)
                                    u.hasOwnProperty(l) && o.setRequestHeader(l, u[l])
                            }
                            if ("object" === a(this._config.headers)) {
                                var d = this._config.headers;
                                for (var f in d)
                                    d.hasOwnProperty(f) && o.setRequestHeader(f, d[f])
                            }
                            this._isReconnecting ? this._isReconnecting = !1 : this._status = h.LoaderStatus.kConnecting,
                                o.send()
                        }
                    }, {
                        key: "abort",
                        value: function() {
                            this._internalAbort(),
                                this._status = h.LoaderStatus.kComplete
                        }
                    }, {
                        key: "_internalAbort",
                        value: function() {
                            this._reader && (1 === this._reader.readyState && this._reader.abort(),
                                this._reader.onprogress = null,
                                this._reader.onload = null,
                                this._reader.onerror = null,
                                this._reader = null),
                            this._xhr && (this._xhr.abort(),
                                this._xhr.onreadystatechange = null,
                                this._xhr = null)
                        }
                    }, {
                        key: "_xhrOnReadyStateChange",
                        value: function(e) {
                            var t = e.target;
                            if (2 === t.readyState)
                                if (t.status >= 200 && t.status <= 299) {
                                    if (this._status = h.LoaderStatus.kBuffering,
                                    void 0 != t.responseURL) {
                                        var i = this._seekHandler.removeURLParameters(t.responseURL);
                                        t.responseURL !== this._currentRequestURL && i !== this._currentRedirectedURL && (this._currentRedirectedURL = i,
                                        this._onURLRedirect && this._onURLRedirect(i))
                                    }
                                    var n = t.getResponseHeader("Content-Length");
                                    if (null != n && null == this._contentLength) {
                                        var r = parseInt(n);
                                        r > 0 && (this._contentLength = r,
                                        this._onContentLengthKnown && this._onContentLengthKnown(this._contentLength))
                                    }
                                } else {
                                    if (this._status = h.LoaderStatus.kError,
                                        !this._onError)
                                        throw new f.RuntimeException("MSStreamLoader: Http code invalid, " + t.status + " " + t.statusText);
                                    this._onError(h.LoaderErrors.HTTP_STATUS_CODE_INVALID, {
                                        code: t.status,
                                        msg: t.statusText
                                    })
                                }
                            else if (3 === t.readyState && t.status >= 200 && t.status <= 299) {
                                this._status = h.LoaderStatus.kBuffering;
                                var s = t.response;
                                this._reader.readAsArrayBuffer(s)
                            }
                        }
                    }, {
                        key: "_xhrOnError",
                        value: function(e) {
                            this._status = h.LoaderStatus.kError;
                            var t = h.LoaderErrors.EXCEPTION
                                , i = {
                                code: -1,
                                msg: e.constructor.name + " " + e.type
                            };
                            if (!this._onError)
                                throw new f.RuntimeException(i.msg);
                            this._onError(t, i)
                        }
                    }, {
                        key: "_msrOnProgress",
                        value: function(e) {
                            var t = e.target
                                , i = t.result;
                            if (null == i)
                                return void this._doReconnectIfNeeded();
                            var n = i.slice(this._lastTimeBufferSize);
                            this._lastTimeBufferSize = i.byteLength;
                            var r = this._totalRange.from + this._receivedLength;
                            this._receivedLength += n.byteLength,
                            this._onDataArrival && this._onDataArrival(n, r, this._receivedLength),
                            i.byteLength >= this._bufferLimit && (d.default.v(this.TAG, "MSStream buffer exceeded max size near " + (r + n.byteLength) + ", reconnecting..."),
                                this._doReconnectIfNeeded())
                        }
                    }, {
                        key: "_doReconnectIfNeeded",
                        value: function() {
                            if (null == this._contentLength || this._receivedLength < this._contentLength) {
                                this._isReconnecting = !0,
                                    this._lastTimeBufferSize = 0,
                                    this._internalAbort();
                                var e = {
                                    from: this._totalRange.from + this._receivedLength,
                                    to: -1
                                };
                                this._internalOpen(this._dataSource, e, !0)
                            }
                        }
                    }, {
                        key: "_msrOnLoad",
                        value: function(e) {
                            this._status = h.LoaderStatus.kComplete,
                            this._onComplete && this._onComplete(this._totalRange.from, this._totalRange.from + this._receivedLength - 1)
                        }
                    }, {
                        key: "_msrOnError",
                        value: function(e) {
                            this._status = h.LoaderStatus.kError;
                            var t = 0
                                , i = null;
                            if (this._contentLength && this._receivedLength < this._contentLength ? (t = h.LoaderErrors.EARLY_EOF,
                                i = {
                                    code: -1,
                                    msg: "MSStream meet Early-Eof"
                                }) : (t = h.LoaderErrors.EARLY_EOF,
                                i = {
                                    code: -1,
                                    msg: e.constructor.name + " " + e.type
                                }),
                                !this._onError)
                                throw new f.RuntimeException(i.msg);
                            this._onError(t, i)
                        }
                    }]),
                    t
            }(h.BaseLoader);
            i.default = c
        }
            , {
                "../utils/exception.js": 40,
                "../utils/logger.js": 41,
                "./loader.js": 24
            }],
        31: [function(e, t, i) {
            "use strict";
            function n(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function r(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function s(e, t) {
                if (!e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            function a(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                , u = function e(t, i, n) {
                null === t && (t = Function.prototype);
                var r = Object.getOwnPropertyDescriptor(t, i);
                if (void 0 === r) {
                    var s = Object.getPrototypeOf(t);
                    return null === s ? void 0 : e(s, i, n)
                }
                if ("value"in r)
                    return r.value;
                var a = r.get;
                if (void 0 !== a)
                    return a.call(n)
            }
                , l = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                        "value"in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i),
                    n && e(t, n),
                        t
                }
            }()
                , d = e("../utils/logger.js")
                , h = n(d)
                , f = e("./speed-sampler.js")
                , c = n(f)
                , _ = e("./loader.js")
                , m = e("../utils/exception.js")
                , p = function(e) {
                function t(e, i) {
                    r(this, t);
                    var n = s(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "xhr-range-loader"));
                    return n.TAG = "RangeLoader",
                        n._seekHandler = e,
                        n._config = i,
                        n._needStash = !1,
                        n._chunkSizeKBList = [128, 256, 384, 512, 768, 1024, 1536, 2048, 3072, 4096, 5120, 6144, 7168, 8192],
                        n._currentChunkSizeKB = 384,
                        n._currentSpeedNormalized = 0,
                        n._zeroSpeedChunkCount = 0,
                        n._xhr = null,
                        n._speedSampler = new c.default,
                        n._requestAbort = !1,
                        n._waitForTotalLength = !1,
                        n._totalLengthReceived = !1,
                        n._currentRequestURL = null,
                        n._currentRedirectedURL = null,
                        n._currentRequestRange = null,
                        n._totalLength = null,
                        n._contentLength = null,
                        n._receivedLength = 0,
                        n._lastTimeLoaded = 0,
                        n
                }
                return a(t, e),
                    l(t, null, [{
                        key: "isSupported",
                        value: function() {
                            try {
                                var e = new XMLHttpRequest;
                                return e.open("GET", "https://example.com", !0),
                                    e.responseType = "arraybuffer",
                                "arraybuffer" === e.responseType
                            } catch (e) {
                                return h.default.w("RangeLoader", e.message),
                                    !1
                            }
                        }
                    }]),
                    l(t, [{
                        key: "destroy",
                        value: function() {
                            this.isWorking() && this.abort(),
                            this._xhr && (this._xhr.onreadystatechange = null,
                                this._xhr.onprogress = null,
                                this._xhr.onload = null,
                                this._xhr.onerror = null,
                                this._xhr = null),
                                u(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "destroy", this).call(this)
                        }
                    }, {
                        key: "open",
                        value: function(e, t) {
                            this._dataSource = e,
                                this._range = t,
                                this._status = _.LoaderStatus.kConnecting;
                            var i = !1;
                            void 0 != this._dataSource.filesize && 0 !== this._dataSource.filesize && (i = !0,
                                this._totalLength = this._dataSource.filesize),
                                this._totalLengthReceived || i ? this._openSubRange() : (this._waitForTotalLength = !0,
                                    this._internalOpen(this._dataSource, {
                                        from: 0,
                                        to: -1
                                    }))
                        }
                    }, {
                        key: "_openSubRange",
                        value: function() {
                            var e = 1024 * this._currentChunkSizeKB
                                , t = this._range.from + this._receivedLength
                                , i = t + e;
                            null != this._contentLength && i - this._range.from >= this._contentLength && (i = this._range.from + this._contentLength - 1),
                                this._currentRequestRange = {
                                    from: t,
                                    to: i
                                },
                                this._internalOpen(this._dataSource, this._currentRequestRange)
                        }
                    }, {
                        key: "_internalOpen",
                        value: function(e, t) {
                            this._lastTimeLoaded = 0;
                            var i = e.url;
                            this._config.reuseRedirectedURL && (void 0 != this._currentRedirectedURL ? i = this._currentRedirectedURL : void 0 != e.redirectedURL && (i = e.redirectedURL));
                            var n = this._seekHandler.getConfig(i, t);
                            this._currentRequestURL = n.url;
                            var r = this._xhr = new XMLHttpRequest;
                            if (r.open("GET", n.url, !0),
                                r.responseType = "arraybuffer",
                                r.onreadystatechange = this._onReadyStateChange.bind(this),
                                r.onprogress = this._onProgress.bind(this),
                                r.onload = this._onLoad.bind(this),
                                r.onerror = this._onXhrError.bind(this),
                            e.withCredentials && (r.withCredentials = !0),
                            "object" === o(n.headers)) {
                                var s = n.headers;
                                for (var a in s)
                                    s.hasOwnProperty(a) && r.setRequestHeader(a, s[a])
                            }
                            if ("object" === o(this._config.headers)) {
                                var u = this._config.headers;
                                for (var l in u)
                                    u.hasOwnProperty(l) && r.setRequestHeader(l, u[l])
                            }
                            r.send()
                        }
                    }, {
                        key: "abort",
                        value: function() {
                            this._requestAbort = !0,
                                this._internalAbort(),
                                this._status = _.LoaderStatus.kComplete
                        }
                    }, {
                        key: "_internalAbort",
                        value: function() {
                            this._xhr && (this._xhr.onreadystatechange = null,
                                this._xhr.onprogress = null,
                                this._xhr.onload = null,
                                this._xhr.onerror = null,
                                this._xhr.abort(),
                                this._xhr = null)
                        }
                    }, {
                        key: "_onReadyStateChange",
                        value: function(e) {
                            var t = e.target;
                            if (2 === t.readyState) {
                                if (void 0 != t.responseURL) {
                                    var i = this._seekHandler.removeURLParameters(t.responseURL);
                                    t.responseURL !== this._currentRequestURL && i !== this._currentRedirectedURL && (this._currentRedirectedURL = i,
                                    this._onURLRedirect && this._onURLRedirect(i))
                                }
                                if (t.status >= 200 && t.status <= 299) {
                                    if (this._waitForTotalLength)
                                        return;
                                    this._status = _.LoaderStatus.kBuffering
                                } else {
                                    if (this._status = _.LoaderStatus.kError,
                                        !this._onError)
                                        throw new m.RuntimeException("RangeLoader: Http code invalid, " + t.status + " " + t.statusText);
                                    this._onError(_.LoaderErrors.HTTP_STATUS_CODE_INVALID, {
                                        code: t.status,
                                        msg: t.statusText
                                    })
                                }
                            }
                        }
                    }, {
                        key: "_onProgress",
                        value: function(e) {
                            if (this._status !== _.LoaderStatus.kError) {
                                if (null === this._contentLength) {
                                    var t = !1;
                                    if (this._waitForTotalLength) {
                                        this._waitForTotalLength = !1,
                                            this._totalLengthReceived = !0,
                                            t = !0;
                                        var i = e.total;
                                        this._internalAbort(),
                                        null != i & 0 !== i && (this._totalLength = i)
                                    }
                                    if (-1 === this._range.to ? this._contentLength = this._totalLength - this._range.from : this._contentLength = this._range.to - this._range.from + 1,
                                        t)
                                        return void this._openSubRange();
                                    this._onContentLengthKnown && this._onContentLengthKnown(this._contentLength)
                                }
                                var n = e.loaded - this._lastTimeLoaded;
                                this._lastTimeLoaded = e.loaded,
                                    this._speedSampler.addBytes(n)
                            }
                        }
                    }, {
                        key: "_normalizeSpeed",
                        value: function(e) {
                            var t = this._chunkSizeKBList
                                , i = t.length - 1
                                , n = 0
                                , r = 0
                                , s = i;
                            if (e < t[0])
                                return t[0];
                            for (; r <= s; ) {
                                if ((n = r + Math.floor((s - r) / 2)) === i || e >= t[n] && e < t[n + 1])
                                    return t[n];
                                t[n] < e ? r = n + 1 : s = n - 1
                            }
                        }
                    }, {
                        key: "_onLoad",
                        value: function(e) {
                            if (this._status !== _.LoaderStatus.kError) {
                                if (this._waitForTotalLength)
                                    return void (this._waitForTotalLength = !1);
                                this._lastTimeLoaded = 0;
                                var t = this._speedSampler.lastSecondKBps;
                                if (0 === t && ++this._zeroSpeedChunkCount >= 3 && (t = this._speedSampler.currentKBps),
                                0 !== t) {
                                    var i = this._normalizeSpeed(t);
                                    this._currentSpeedNormalized !== i && (this._currentSpeedNormalized = i,
                                        this._currentChunkSizeKB = i)
                                }
                                var n = e.target.response
                                    , r = this._range.from + this._receivedLength;
                                this._receivedLength += n.byteLength;
                                var s = !1;
                                null != this._contentLength && this._receivedLength < this._contentLength ? this._openSubRange() : s = !0,
                                this._onDataArrival && this._onDataArrival(n, r, this._receivedLength),
                                s && (this._status = _.LoaderStatus.kComplete,
                                this._onComplete && this._onComplete(this._range.from, this._range.from + this._receivedLength - 1))
                            }
                        }
                    }, {
                        key: "_onXhrError",
                        value: function(e) {
                            this._status = _.LoaderStatus.kError;
                            var t = 0
                                , i = null;
                            if (this._contentLength && this._receivedLength > 0 && this._receivedLength < this._contentLength ? (t = _.LoaderErrors.EARLY_EOF,
                                i = {
                                    code: -1,
                                    msg: "RangeLoader meet Early-Eof"
                                }) : (t = _.LoaderErrors.EXCEPTION,
                                i = {
                                    code: -1,
                                    msg: e.constructor.name + " " + e.type
                                }),
                                !this._onError)
                                throw new m.RuntimeException(i.msg);
                            this._onError(t, i)
                        }
                    }, {
                        key: "currentSpeed",
                        get: function() {
                            return this._speedSampler.lastSecondKBps
                        }
                    }]),
                    t
            }(_.BaseLoader);
            i.default = p
        }
            , {
                "../utils/exception.js": 40,
                "../utils/logger.js": 41,
                "./loader.js": 24,
                "./speed-sampler.js": 27
            }],
        32: [function(e, t, i) {
            "use strict";
            function n(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function r(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                , a = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                        "value"in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i),
                    n && e(t, n),
                        t
                }
            }()
                , o = e("events")
                , u = n(o)
                , l = e("../utils/logger.js")
                , d = n(l)
                , h = e("../utils/browser.js")
                , f = n(h)
                , c = e("./player-events.js")
                , _ = n(c)
                , m = e("../core/transmuxer.js")
                , p = n(m)
                , v = e("../core/transmuxing-events.js")
                , g = n(v)
                , y = e("../core/mse-controller.js")
                , E = n(y)
                , b = e("../core/mse-events.js")
                , S = n(b)
                , k = e("./player-errors.js")
                , L = e("../config.js")
                , R = e("../utils/exception.js")
                , A = function() {
                function e(t, i) {
                    if (r(this, e),
                        this.TAG = "FlvPlayer",
                        this._type = "FlvPlayer",
                        this._emitter = new u.default,
                        this._config = (0,
                            L.createDefaultConfig)(),
                    "object" === (void 0 === i ? "undefined" : s(i)) && Object.assign(this._config, i),
                    "flv" !== t.type.toLowerCase())
                        throw new R.InvalidArgumentException("FlvPlayer requires an flv MediaDataSource input!");
                    !0 === t.isLive && (this._config.isLive = !0),
                        this.e = {
                            onvLoadedMetadata: this._onvLoadedMetadata.bind(this),
                            onvSeeking: this._onvSeeking.bind(this),
                            onvCanPlay: this._onvCanPlay.bind(this),
                            onvStalled: this._onvStalled.bind(this),
                            onvProgress: this._onvProgress.bind(this)
                        },
                        self.performance && self.performance.now ? this._now = self.performance.now.bind(self.performance) : this._now = Date.now,
                        this._pendingSeekTime = null,
                        this._requestSetTime = !1,
                        this._seekpointRecord = null,
                        this._progressChecker = null,
                        this._mediaDataSource = t,
                        this._mediaElement = null,
                        this._msectl = null,
                        this._transmuxer = null,
                        this._mseSourceOpened = !1,
                        this._hasPendingLoad = !1,
                        this._receivedCanPlay = !1,
                        this._mediaInfo = null,
                        this._statisticsInfo = null;
                    var n = f.default.chrome && (f.default.version.major < 50 || 50 === f.default.version.major && f.default.version.build < 2661);
                    this._alwaysSeekKeyframe = !!(n || f.default.msedge || f.default.msie),
                    this._alwaysSeekKeyframe && (this._config.accurateSeek = !1)
                }
                return a(e, [{
                    key: "destroy",
                    value: function() {
                        null != this._progressChecker && (window.clearInterval(this._progressChecker),
                            this._progressChecker = null),
                        this._transmuxer && this.unload(),
                        this._mediaElement && this.detachMediaElement(),
                            this.e = null,
                            this._mediaDataSource = null,
                            this._emitter.removeAllListeners(),
                            this._emitter = null
                    }
                }, {
                    key: "on",
                    value: function(e, t) {
                        var i = this;
                        e === _.default.MEDIA_INFO ? null != this._mediaInfo && Promise.resolve().then(function() {
                            i._emitter.emit(_.default.MEDIA_INFO, i.mediaInfo)
                        }) : e === _.default.STATISTICS_INFO && null != this._statisticsInfo && Promise.resolve().then(function() {
                            i._emitter.emit(_.default.STATISTICS_INFO, i.statisticsInfo)
                        }),
                            this._emitter.addListener(e, t)
                    }
                }, {
                    key: "off",
                    value: function(e, t) {
                        this._emitter.removeListener(e, t)
                    }
                }, {
                    key: "attachMediaElement",
                    value: function(e) {
                        var t = this;
                        if (this._mediaElement = e,
                            e.addEventListener("loadedmetadata", this.e.onvLoadedMetadata),
                            e.addEventListener("seeking", this.e.onvSeeking),
                            e.addEventListener("canplay", this.e.onvCanPlay),
                            e.addEventListener("stalled", this.e.onvStalled),
                            e.addEventListener("progress", this.e.onvProgress),
                            this._msectl = new E.default(this._config),
                            this._msectl.on(S.default.UPDATE_END, this._onmseUpdateEnd.bind(this)),
                            this._msectl.on(S.default.BUFFER_FULL, this._onmseBufferFull.bind(this)),
                            this._msectl.on(S.default.SOURCE_OPEN, function() {
                                t._mseSourceOpened = !0,
                                t._hasPendingLoad && (t._hasPendingLoad = !1,
                                    t.load())
                            }),
                            this._msectl.on(S.default.ERROR, function(e) {
                                t._emitter.emit(_.default.ERROR, k.ErrorTypes.MEDIA_ERROR, k.ErrorDetails.MEDIA_MSE_ERROR, e)
                            }),
                            this._msectl.attachMediaElement(e),
                        null != this._pendingSeekTime)
                            try {
                                e.currentTime = this._pendingSeekTime,
                                    this._pendingSeekTime = null
                            } catch (e) {}
                    }
                }, {
                    key: "detachMediaElement",
                    value: function() {
                        this._mediaElement && (this._msectl.detachMediaElement(),
                            this._mediaElement.removeEventListener("loadedmetadata", this.e.onvLoadedMetadata),
                            this._mediaElement.removeEventListener("seeking", this.e.onvSeeking),
                            this._mediaElement.removeEventListener("canplay", this.e.onvCanPlay),
                            this._mediaElement.removeEventListener("stalled", this.e.onvStalled),
                            this._mediaElement.removeEventListener("progress", this.e.onvProgress),
                            this._mediaElement = null),
                        this._msectl && (this._msectl.destroy(),
                            this._msectl = null)
                    }
                }, {
                    key: "load",
                    value: function() {
                        var e = this;
                        if (!this._mediaElement)
                            throw new R.IllegalStateException("HTMLMediaElement must be attached before load()!");
                        if (this._transmuxer)
                            throw new R.IllegalStateException("FlvPlayer.load() has been called, please call unload() first!");
                        if (!this._hasPendingLoad) {
                            if (this._config.deferLoadAfterSourceOpen && !1 === this._mseSourceOpened)
                                return void (this._hasPendingLoad = !0);
                            this._mediaElement.readyState > 0 && (this._requestSetTime = !0,
                                this._mediaElement.currentTime = 0),
                                this._transmuxer = new p.default(this._mediaDataSource,this._config),
                                this._transmuxer.on(g.default.INIT_SEGMENT, function(t, i) {
                                    e._msectl.appendInitSegment(i)
                                }),
                                this._transmuxer.on(g.default.MEDIA_SEGMENT, function(t, i) {
                                    if (e._msectl.appendMediaSegment(i),
                                    e._config.lazyLoad && !e._config.isLive) {
                                        var n = e._mediaElement.currentTime;
                                        i.info.endDts >= 1e3 * (n + e._config.lazyLoadMaxDuration) && null == e._progressChecker && (d.default.v(e.TAG, "Maximum buffering duration exceeded, suspend transmuxing task"),
                                            e._suspendTransmuxer())
                                    }
                                }),
                                this._transmuxer.on(g.default.LOADING_COMPLETE, function() {
                                    e._msectl.endOfStream(),
                                        e._emitter.emit(_.default.LOADING_COMPLETE)
                                }),
                                this._transmuxer.on(g.default.RECOVERED_EARLY_EOF, function() {
                                    e._emitter.emit(_.default.RECOVERED_EARLY_EOF)
                                }),
                                this._transmuxer.on(g.default.IO_ERROR, function(t, i) {
                                    e._emitter.emit(_.default.ERROR, k.ErrorTypes.NETWORK_ERROR, t, i)
                                }),
                                this._transmuxer.on(g.default.DEMUX_ERROR, function(t, i) {
                                    e._emitter.emit(_.default.ERROR, k.ErrorTypes.MEDIA_ERROR, t, {
                                        code: -1,
                                        msg: i
                                    })
                                }),
                                this._transmuxer.on(g.default.MEDIA_INFO, function(t) {
                                    e._mediaInfo = t,
                                        e._emitter.emit(_.default.MEDIA_INFO, Object.assign({}, t))
                                }),
                                this._transmuxer.on(g.default.METADATA_ARRIVED, function(t) {
                                    e._emitter.emit(_.default.METADATA_ARRIVED, t)
                                }),
                                this._transmuxer.on(g.default.SCRIPTDATA_ARRIVED, function(t) {
                                    e._emitter.emit(_.default.SCRIPTDATA_ARRIVED, t)
                                }),
                                this._transmuxer.on(g.default.STATISTICS_INFO, function(t) {
                                    e._statisticsInfo = e._fillStatisticsInfo(t),
                                        e._emitter.emit(_.default.STATISTICS_INFO, Object.assign({}, e._statisticsInfo))
                                }),
                                this._transmuxer.on(g.default.RECOMMEND_SEEKPOINT, function(t) {
                                    e._mediaElement && !e._config.accurateSeek && (e._requestSetTime = !0,
                                        e._mediaElement.currentTime = t / 1e3)
                                }),
                                this._transmuxer.open()
                        }
                    }
                }, {
                    key: "unload",
                    value: function() {
                        this._mediaElement && this._mediaElement.pause(),
                        this._msectl && this._msectl.seek(0),
                        this._transmuxer && (this._transmuxer.close(),
                            this._transmuxer.destroy(),
                            this._transmuxer = null)
                    }
                }, {
                    key: "play",
                    value: function() {
                        return this._mediaElement.play()
                    }
                }, {
                    key: "pause",
                    value: function() {
                        this._mediaElement.pause()
                    }
                }, {
                    key: "_fillStatisticsInfo",
                    value: function(e) {
                        if (e.playerType = this._type,
                            !(this._mediaElement instanceof HTMLVideoElement))
                            return e;
                        var t = !0
                            , i = 0
                            , n = 0;
                        if (this._mediaElement.getVideoPlaybackQuality) {
                            var r = this._mediaElement.getVideoPlaybackQuality();
                            i = r.totalVideoFrames,
                                n = r.droppedVideoFrames
                        } else
                            void 0 != this._mediaElement.webkitDecodedFrameCount ? (i = this._mediaElement.webkitDecodedFrameCount,
                                n = this._mediaElement.webkitDroppedFrameCount) : t = !1;
                        return t && (e.decodedFrames = i,
                            e.droppedFrames = n),
                            e
                    }
                }, {
                    key: "_onmseUpdateEnd",
                    value: function() {
                        if (this._config.lazyLoad && !this._config.isLive) {
                            for (var e = this._mediaElement.buffered, t = this._mediaElement.currentTime, i = 0, n = 0; n < e.length; n++) {
                                var r = e.start(n)
                                    , s = e.end(n);
                                if (r <= t && t < s) {
                                    r,
                                        i = s;
                                    break
                                }
                            }
                            i >= t + this._config.lazyLoadMaxDuration && null == this._progressChecker && (d.default.v(this.TAG, "Maximum buffering duration exceeded, suspend transmuxing task"),
                                this._suspendTransmuxer())
                        }
                    }
                }, {
                    key: "_onmseBufferFull",
                    value: function() {
                        d.default.v(this.TAG, "MSE SourceBuffer is full, suspend transmuxing task"),
                        null == this._progressChecker && this._suspendTransmuxer()
                    }
                }, {
                    key: "_suspendTransmuxer",
                    value: function() {
                        this._transmuxer && (this._transmuxer.pause(),
                        null == this._progressChecker && (this._progressChecker = window.setInterval(this._checkProgressAndResume.bind(this), 1e3)))
                    }
                }, {
                    key: "_checkProgressAndResume",
                    value: function() {
                        for (var e = this._mediaElement.currentTime, t = this._mediaElement.buffered, i = !1, n = 0; n < t.length; n++) {
                            var r = t.start(n)
                                , s = t.end(n);
                            if (e >= r && e < s) {
                                e >= s - this._config.lazyLoadRecoverDuration && (i = !0);
                                break
                            }
                        }
                        i && (window.clearInterval(this._progressChecker),
                            this._progressChecker = null,
                        i && (d.default.v(this.TAG, "Continue loading from paused position"),
                            this._transmuxer.resume()))
                    }
                }, {
                    key: "_isTimepointBuffered",
                    value: function(e) {
                        for (var t = this._mediaElement.buffered, i = 0; i < t.length; i++) {
                            var n = t.start(i)
                                , r = t.end(i);
                            if (e >= n && e < r)
                                return !0
                        }
                        return !1
                    }
                }, {
                    key: "_internalSeek",
                    value: function(e) {
                        var t = this._isTimepointBuffered(e)
                            , i = !1
                            , n = 0;
                        if (e < 1 && this._mediaElement.buffered.length > 0) {
                            var r = this._mediaElement.buffered.start(0);
                            (r < 1 && e < r || f.default.safari) && (i = !0,
                                n = f.default.safari ? .1 : r)
                        }
                        if (i)
                            this._requestSetTime = !0,
                                this._mediaElement.currentTime = n;
                        else if (t) {
                            if (this._alwaysSeekKeyframe) {
                                var s = this._msectl.getNearestKeyframe(Math.floor(1e3 * e));
                                this._requestSetTime = !0,
                                    this._mediaElement.currentTime = null != s ? s.dts / 1e3 : e
                            } else
                                this._requestSetTime = !0,
                                    this._mediaElement.currentTime = e;
                            null != this._progressChecker && this._checkProgressAndResume()
                        } else
                            null != this._progressChecker && (window.clearInterval(this._progressChecker),
                                this._progressChecker = null),
                                this._msectl.seek(e),
                                this._transmuxer.seek(Math.floor(1e3 * e)),
                            this._config.accurateSeek && (this._requestSetTime = !0,
                                this._mediaElement.currentTime = e)
                    }
                }, {
                    key: "_checkAndApplyUnbufferedSeekpoint",
                    value: function() {
                        if (this._seekpointRecord)
                            if (this._seekpointRecord.recordTime <= this._now() - 100) {
                                var e = this._mediaElement.currentTime;
                                this._seekpointRecord = null,
                                this._isTimepointBuffered(e) || (null != this._progressChecker && (window.clearTimeout(this._progressChecker),
                                    this._progressChecker = null),
                                    this._msectl.seek(e),
                                    this._transmuxer.seek(Math.floor(1e3 * e)),
                                this._config.accurateSeek && (this._requestSetTime = !0,
                                    this._mediaElement.currentTime = e))
                            } else
                                window.setTimeout(this._checkAndApplyUnbufferedSeekpoint.bind(this), 50)
                    }
                }, {
                    key: "_checkAndResumeStuckPlayback",
                    value: function(e) {
                        var t = this._mediaElement;
                        if (e || !this._receivedCanPlay || t.readyState < 2) {
                            var i = t.buffered;
                            i.length > 0 && t.currentTime < i.start(0) && (d.default.w(this.TAG, "Playback seems stuck at " + t.currentTime + ", seek to " + i.start(0)),
                                this._requestSetTime = !0,
                                this._mediaElement.currentTime = i.start(0),
                                this._mediaElement.removeEventListener("progress", this.e.onvProgress))
                        } else
                            this._mediaElement.removeEventListener("progress", this.e.onvProgress)
                    }
                }, {
                    key: "_onvLoadedMetadata",
                    value: function(e) {
                        null != this._pendingSeekTime && (this._mediaElement.currentTime = this._pendingSeekTime,
                            this._pendingSeekTime = null)
                    }
                }, {
                    key: "_onvSeeking",
                    value: function(e) {
                        var t = this._mediaElement.currentTime
                            , i = this._mediaElement.buffered;
                        if (this._requestSetTime)
                            return void (this._requestSetTime = !1);
                        if (t < 1 && i.length > 0) {
                            var n = i.start(0);
                            if (n < 1 && t < n || f.default.safari)
                                return this._requestSetTime = !0,
                                    void (this._mediaElement.currentTime = f.default.safari ? .1 : n)
                        }
                        if (this._isTimepointBuffered(t)) {
                            if (this._alwaysSeekKeyframe) {
                                var r = this._msectl.getNearestKeyframe(Math.floor(1e3 * t));
                                null != r && (this._requestSetTime = !0,
                                    this._mediaElement.currentTime = r.dts / 1e3)
                            }
                            return void (null != this._progressChecker && this._checkProgressAndResume())
                        }
                        this._seekpointRecord = {
                            seekPoint: t,
                            recordTime: this._now()
                        },
                            window.setTimeout(this._checkAndApplyUnbufferedSeekpoint.bind(this), 50)
                    }
                }, {
                    key: "_onvCanPlay",
                    value: function(e) {
                        this._receivedCanPlay = !0,
                            this._mediaElement.removeEventListener("canplay", this.e.onvCanPlay)
                    }
                }, {
                    key: "_onvStalled",
                    value: function(e) {
                        this._checkAndResumeStuckPlayback(!0)
                    }
                }, {
                    key: "_onvProgress",
                    value: function(e) {
                        this._checkAndResumeStuckPlayback()
                    }
                }, {
                    key: "type",
                    get: function() {
                        return this._type
                    }
                }, {
                    key: "buffered",
                    get: function() {
                        return this._mediaElement.buffered
                    }
                }, {
                    key: "duration",
                    get: function() {
                        return this._mediaElement.duration
                    }
                }, {
                    key: "volume",
                    get: function() {
                        return this._mediaElement.volume
                    },
                    set: function(e) {
                        this._mediaElement.volume = e
                    }
                }, {
                    key: "muted",
                    get: function() {
                        return this._mediaElement.muted
                    },
                    set: function(e) {
                        this._mediaElement.muted = e
                    }
                }, {
                    key: "currentTime",
                    get: function() {
                        return this._mediaElement ? this._mediaElement.currentTime : 0
                    },
                    set: function(e) {
                        this._mediaElement ? this._internalSeek(e) : this._pendingSeekTime = e
                    }
                }, {
                    key: "mediaInfo",
                    get: function() {
                        return Object.assign({}, this._mediaInfo)
                    }
                }, {
                    key: "statisticsInfo",
                    get: function() {
                        return null == this._statisticsInfo && (this._statisticsInfo = {}),
                            this._statisticsInfo = this._fillStatisticsInfo(this._statisticsInfo),
                            Object.assign({}, this._statisticsInfo)
                    }
                }]),
                    e
            }();
            i.default = A
        }
            , {
                "../config.js": 5,
                "../core/mse-controller.js": 9,
                "../core/mse-events.js": 10,
                "../core/transmuxer.js": 11,
                "../core/transmuxing-events.js": 13,
                "../utils/browser.js": 39,
                "../utils/exception.js": 40,
                "../utils/logger.js": 41,
                "./player-errors.js": 34,
                "./player-events.js": 35,
                events: 2
            }],
        33: [function(e, t, i) {
            "use strict";
            function n(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function r(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                , a = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                        "value"in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i),
                    n && e(t, n),
                        t
                }
            }()
                , o = e("events")
                , u = n(o)
                , l = e("./player-events.js")
                , d = n(l)
                , h = e("../config.js")
                , f = e("../utils/exception.js")
                , c = function() {
                function e(t, i) {
                    if (r(this, e),
                        this.TAG = "NativePlayer",
                        this._type = "NativePlayer",
                        this._emitter = new u.default,
                        this._config = (0,
                            h.createDefaultConfig)(),
                    "object" === (void 0 === i ? "undefined" : s(i)) && Object.assign(this._config, i),
                    "flv" === t.type.toLowerCase())
                        throw new f.InvalidArgumentException("NativePlayer does't support flv MediaDataSource input!");
                    if (t.hasOwnProperty("segments"))
                        throw new f.InvalidArgumentException("NativePlayer(" + t.type + ") doesn't support multipart playback!");
                    this.e = {
                        onvLoadedMetadata: this._onvLoadedMetadata.bind(this)
                    },
                        this._pendingSeekTime = null,
                        this._statisticsReporter = null,
                        this._mediaDataSource = t,
                        this._mediaElement = null
                }
                return a(e, [{
                    key: "destroy",
                    value: function() {
                        this._mediaElement && (this.unload(),
                            this.detachMediaElement()),
                            this.e = null,
                            this._mediaDataSource = null,
                            this._emitter.removeAllListeners(),
                            this._emitter = null
                    }
                }, {
                    key: "on",
                    value: function(e, t) {
                        var i = this;
                        e === d.default.MEDIA_INFO ? null != this._mediaElement && 0 !== this._mediaElement.readyState && Promise.resolve().then(function() {
                            i._emitter.emit(d.default.MEDIA_INFO, i.mediaInfo)
                        }) : e === d.default.STATISTICS_INFO && null != this._mediaElement && 0 !== this._mediaElement.readyState && Promise.resolve().then(function() {
                            i._emitter.emit(d.default.STATISTICS_INFO, i.statisticsInfo)
                        }),
                            this._emitter.addListener(e, t)
                    }
                }, {
                    key: "off",
                    value: function(e, t) {
                        this._emitter.removeListener(e, t)
                    }
                }, {
                    key: "attachMediaElement",
                    value: function(e) {
                        if (this._mediaElement = e,
                            e.addEventListener("loadedmetadata", this.e.onvLoadedMetadata),
                        null != this._pendingSeekTime)
                            try {
                                e.currentTime = this._pendingSeekTime,
                                    this._pendingSeekTime = null
                            } catch (e) {}
                    }
                }, {
                    key: "detachMediaElement",
                    value: function() {
                        this._mediaElement && (this._mediaElement.src = "",
                            this._mediaElement.removeAttribute("src"),
                            this._mediaElement.removeEventListener("loadedmetadata", this.e.onvLoadedMetadata),
                            this._mediaElement = null),
                        null != this._statisticsReporter && (window.clearInterval(this._statisticsReporter),
                            this._statisticsReporter = null)
                    }
                }, {
                    key: "load",
                    value: function() {
                        if (!this._mediaElement)
                            throw new f.IllegalStateException("HTMLMediaElement must be attached before load()!");
                        this._mediaElement.src = this._mediaDataSource.url,
                        this._mediaElement.readyState > 0 && (this._mediaElement.currentTime = 0),
                            this._mediaElement.preload = "auto",
                            this._mediaElement.load(),
                            this._statisticsReporter = window.setInterval(this._reportStatisticsInfo.bind(this), this._config.statisticsInfoReportInterval)
                    }
                }, {
                    key: "unload",
                    value: function() {
                        this._mediaElement && (this._mediaElement.src = "",
                            this._mediaElement.removeAttribute("src")),
                        null != this._statisticsReporter && (window.clearInterval(this._statisticsReporter),
                            this._statisticsReporter = null)
                    }
                }, {
                    key: "play",
                    value: function() {
                        return this._mediaElement.play()
                    }
                }, {
                    key: "pause",
                    value: function() {
                        this._mediaElement.pause()
                    }
                }, {
                    key: "_onvLoadedMetadata",
                    value: function(e) {
                        null != this._pendingSeekTime && (this._mediaElement.currentTime = this._pendingSeekTime,
                            this._pendingSeekTime = null),
                            this._emitter.emit(d.default.MEDIA_INFO, this.mediaInfo)
                    }
                }, {
                    key: "_reportStatisticsInfo",
                    value: function() {
                        this._emitter.emit(d.default.STATISTICS_INFO, this.statisticsInfo)
                    }
                }, {
                    key: "type",
                    get: function() {
                        return this._type
                    }
                }, {
                    key: "buffered",
                    get: function() {
                        return this._mediaElement.buffered
                    }
                }, {
                    key: "duration",
                    get: function() {
                        return this._mediaElement.duration
                    }
                }, {
                    key: "volume",
                    get: function() {
                        return this._mediaElement.volume
                    },
                    set: function(e) {
                        this._mediaElement.volume = e
                    }
                }, {
                    key: "muted",
                    get: function() {
                        return this._mediaElement.muted
                    },
                    set: function(e) {
                        this._mediaElement.muted = e
                    }
                }, {
                    key: "currentTime",
                    get: function() {
                        return this._mediaElement ? this._mediaElement.currentTime : 0
                    },
                    set: function(e) {
                        this._mediaElement ? this._mediaElement.currentTime = e : this._pendingSeekTime = e
                    }
                }, {
                    key: "mediaInfo",
                    get: function() {
                        var e = this._mediaElement instanceof HTMLAudioElement ? "audio/" : "video/"
                            , t = {
                            mimeType: e + this._mediaDataSource.type
                        };
                        return this._mediaElement && (t.duration = Math.floor(1e3 * this._mediaElement.duration),
                        this._mediaElement instanceof HTMLVideoElement && (t.width = this._mediaElement.videoWidth,
                            t.height = this._mediaElement.videoHeight)),
                            t
                    }
                }, {
                    key: "statisticsInfo",
                    get: function() {
                        var e = {
                            playerType: this._type,
                            url: this._mediaDataSource.url
                        };
                        if (!(this._mediaElement instanceof HTMLVideoElement))
                            return e;
                        var t = !0
                            , i = 0
                            , n = 0;
                        if (this._mediaElement.getVideoPlaybackQuality) {
                            var r = this._mediaElement.getVideoPlaybackQuality();
                            i = r.totalVideoFrames,
                                n = r.droppedVideoFrames
                        } else
                            void 0 != this._mediaElement.webkitDecodedFrameCount ? (i = this._mediaElement.webkitDecodedFrameCount,
                                n = this._mediaElement.webkitDroppedFrameCount) : t = !1;
                        return t && (e.decodedFrames = i,
                            e.droppedFrames = n),
                            e
                    }
                }]),
                    e
            }();
            i.default = c
        }
            , {
                "../config.js": 5,
                "../utils/exception.js": 40,
                "./player-events.js": 35,
                events: 2
            }],
        34: [function(e, t, i) {
            "use strict";
            Object.defineProperty(i, "__esModule", {
                value: !0
            }),
                i.ErrorDetails = i.ErrorTypes = void 0;
            var n = e("../io/loader.js")
                , r = e("../demux/demux-errors.js")
                , s = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(r);
            i.ErrorTypes = {
                NETWORK_ERROR: "NetworkError",
                MEDIA_ERROR: "MediaError",
                OTHER_ERROR: "OtherError"
            },
                i.ErrorDetails = {
                    NETWORK_EXCEPTION: n.LoaderErrors.EXCEPTION,
                    NETWORK_STATUS_CODE_INVALID: n.LoaderErrors.HTTP_STATUS_CODE_INVALID,
                    NETWORK_TIMEOUT: n.LoaderErrors.CONNECTING_TIMEOUT,
                    NETWORK_UNRECOVERABLE_EARLY_EOF: n.LoaderErrors.UNRECOVERABLE_EARLY_EOF,
                    MEDIA_MSE_ERROR: "MediaMSEError",
                    MEDIA_FORMAT_ERROR: s.default.FORMAT_ERROR,
                    MEDIA_FORMAT_UNSUPPORTED: s.default.FORMAT_UNSUPPORTED,
                    MEDIA_CODEC_UNSUPPORTED: s.default.CODEC_UNSUPPORTED
                }
        }
            , {
                "../demux/demux-errors.js": 16,
                "../io/loader.js": 24
            }],
        35: [function(e, t, i) {
            "use strict";
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var n = {
                ERROR: "error",
                LOADING_COMPLETE: "loading_complete",
                RECOVERED_EARLY_EOF: "recovered_early_eof",
                MEDIA_INFO: "media_info",
                METADATA_ARRIVED: "metadata_arrived",
                SCRIPTDATA_ARRIVED: "scriptdata_arrived",
                STATISTICS_INFO: "statistics_info"
            };
            i.default = n
        }
            , {}],
        36: [function(e, t, i) {
            "use strict";
            function n(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var r = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                        "value"in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i),
                    n && e(t, n),
                        t
                }
            }()
                , s = function() {
                function e() {
                    n(this, e)
                }
                return r(e, null, [{
                    key: "getSilentFrame",
                    value: function(e, t) {
                        if ("mp4a.40.2" === e) {
                            if (1 === t)
                                return new Uint8Array([0, 200, 0, 128, 35, 128]);
                            if (2 === t)
                                return new Uint8Array([33, 0, 73, 144, 2, 25, 0, 35, 128]);
                            if (3 === t)
                                return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 142]);
                            if (4 === t)
                                return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 128, 44, 128, 8, 2, 56]);
                            if (5 === t)
                                return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 56]);
                            if (6 === t)
                                return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 0, 178, 0, 32, 8, 224])
                        } else {
                            if (1 === t)
                                return new Uint8Array([1, 64, 34, 128, 163, 78, 230, 128, 186, 8, 0, 0, 0, 28, 6, 241, 193, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
                            if (2 === t)
                                return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
                            if (3 === t)
                                return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94])
                        }
                        return null
                    }
                }]),
                    e
            }();
            i.default = s
        }
            , {}],
        37: [function(e, t, i) {
            "use strict";
            function n(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var r = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                        "value"in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i),
                    n && e(t, n),
                        t
                }
            }()
                , s = function() {
                function e() {
                    n(this, e)
                }
                return r(e, null, [{
                    key: "init",
                    value: function() {
                        e.types = {
                            avc1: [],
                            avcC: [],
                            btrt: [],
                            dinf: [],
                            dref: [],
                            esds: [],
                            ftyp: [],
                            hdlr: [],
                            mdat: [],
                            mdhd: [],
                            mdia: [],
                            mfhd: [],
                            minf: [],
                            moof: [],
                            moov: [],
                            mp4a: [],
                            mvex: [],
                            mvhd: [],
                            sdtp: [],
                            stbl: [],
                            stco: [],
                            stsc: [],
                            stsd: [],
                            stsz: [],
                            stts: [],
                            tfdt: [],
                            tfhd: [],
                            traf: [],
                            trak: [],
                            trun: [],
                            trex: [],
                            tkhd: [],
                            vmhd: [],
                            smhd: [],
                            ".mp3": []
                        };
                        for (var t in e.types)
                            e.types.hasOwnProperty(t) && (e.types[t] = [t.charCodeAt(0), t.charCodeAt(1), t.charCodeAt(2), t.charCodeAt(3)]);
                        var i = e.constants = {};
                        i.FTYP = new Uint8Array([105, 115, 111, 109, 0, 0, 0, 1, 105, 115, 111, 109, 97, 118, 99, 49]),
                            i.STSD_PREFIX = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]),
                            i.STTS = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]),
                            i.STSC = i.STCO = i.STTS,
                            i.STSZ = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                            i.HDLR_VIDEO = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 105, 100, 101, 111, 72, 97, 110, 100, 108, 101, 114, 0]),
                            i.HDLR_AUDIO = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 115, 111, 117, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101, 114, 0]),
                            i.DREF = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1]),
                            i.SMHD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]),
                            i.VMHD = new Uint8Array([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0])
                    }
                }, {
                    key: "box",
                    value: function(e) {
                        for (var t = 8, i = null, n = Array.prototype.slice.call(arguments, 1), r = n.length, s = 0; s < r; s++)
                            t += n[s].byteLength;
                        i = new Uint8Array(t),
                            i[0] = t >>> 24 & 255,
                            i[1] = t >>> 16 & 255,
                            i[2] = t >>> 8 & 255,
                            i[3] = 255 & t,
                            i.set(e, 4);
                        for (var a = 8, o = 0; o < r; o++)
                            i.set(n[o], a),
                                a += n[o].byteLength;
                        return i
                    }
                }, {
                    key: "generateInitSegment",
                    value: function(t) {
                        var i = e.box(e.types.ftyp, e.constants.FTYP)
                            , n = e.moov(t)
                            , r = new Uint8Array(i.byteLength + n.byteLength);
                        return r.set(i, 0),
                            r.set(n, i.byteLength),
                            r
                    }
                }, {
                    key: "moov",
                    value: function(t) {
                        var i = e.mvhd(t.timescale, t.duration)
                            , n = e.trak(t)
                            , r = e.mvex(t);
                        return e.box(e.types.moov, i, n, r)
                    }
                }, {
                    key: "mvhd",
                    value: function(t, i) {
                        return e.box(e.types.mvhd, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255]))
                    }
                }, {
                    key: "trak",
                    value: function(t) {
                        return e.box(e.types.trak, e.tkhd(t), e.mdia(t))
                    }
                }, {
                    key: "tkhd",
                    value: function(t) {
                        var i = t.id
                            , n = t.duration
                            , r = t.presentWidth
                            , s = t.presentHeight;
                        return e.box(e.types.tkhd, new Uint8Array([0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i, 0, 0, 0, 0, n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, 255 & n, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, r >>> 8 & 255, 255 & r, 0, 0, s >>> 8 & 255, 255 & s, 0, 0]))
                    }
                }, {
                    key: "mdia",
                    value: function(t) {
                        return e.box(e.types.mdia, e.mdhd(t), e.hdlr(t), e.minf(t))
                    }
                }, {
                    key: "mdhd",
                    value: function(t) {
                        var i = t.timescale
                            , n = t.duration;
                        return e.box(e.types.mdhd, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i, n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, 255 & n, 85, 196, 0, 0]))
                    }
                }, {
                    key: "hdlr",
                    value: function(t) {
                        var i = null;
                        return i = "audio" === t.type ? e.constants.HDLR_AUDIO : e.constants.HDLR_VIDEO,
                            e.box(e.types.hdlr, i)
                    }
                }, {
                    key: "minf",
                    value: function(t) {
                        var i = null;
                        return i = "audio" === t.type ? e.box(e.types.smhd, e.constants.SMHD) : e.box(e.types.vmhd, e.constants.VMHD),
                            e.box(e.types.minf, i, e.dinf(), e.stbl(t))
                    }
                }, {
                    key: "dinf",
                    value: function() {
                        return e.box(e.types.dinf, e.box(e.types.dref, e.constants.DREF))
                    }
                }, {
                    key: "stbl",
                    value: function(t) {
                        return e.box(e.types.stbl, e.stsd(t), e.box(e.types.stts, e.constants.STTS), e.box(e.types.stsc, e.constants.STSC), e.box(e.types.stsz, e.constants.STSZ), e.box(e.types.stco, e.constants.STCO))
                    }
                }, {
                    key: "stsd",
                    value: function(t) {
                        return "audio" === t.type ? "mp3" === t.codec ? e.box(e.types.stsd, e.constants.STSD_PREFIX, e.mp3(t)) : e.box(e.types.stsd, e.constants.STSD_PREFIX, e.mp4a(t)) : e.box(e.types.stsd, e.constants.STSD_PREFIX, e.avc1(t))
                    }
                }, {
                    key: "mp3",
                    value: function(t) {
                        var i = t.channelCount
                            , n = t.audioSampleRate
                            , r = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, i, 0, 16, 0, 0, 0, 0, n >>> 8 & 255, 255 & n, 0, 0]);
                        return e.box(e.types[".mp3"], r)
                    }
                }, {
                    key: "mp4a",
                    value: function(t) {
                        var i = t.channelCount
                            , n = t.audioSampleRate
                            , r = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, i, 0, 16, 0, 0, 0, 0, n >>> 8 & 255, 255 & n, 0, 0]);
                        return e.box(e.types.mp4a, r, e.esds(t))
                    }
                }, {
                    key: "esds",
                    value: function(t) {
                        var i = t.config || []
                            , n = i.length
                            , r = new Uint8Array([0, 0, 0, 0, 3, 23 + n, 0, 1, 0, 4, 15 + n, 64, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5].concat([n]).concat(i).concat([6, 1, 2]));
                        return e.box(e.types.esds, r)
                    }
                }, {
                    key: "avc1",
                    value: function(t) {
                        var i = t.avcc
                            , n = t.codecWidth
                            , r = t.codecHeight
                            , s = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, n >>> 8 & 255, 255 & n, r >>> 8 & 255, 255 & r, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 10, 120, 113, 113, 47, 102, 108, 118, 46, 106, 115, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 255, 255]);
                        return e.box(e.types.avc1, s, e.box(e.types.avcC, i))
                    }
                }, {
                    key: "mvex",
                    value: function(t) {
                        return e.box(e.types.mvex, e.trex(t))
                    }
                }, {
                    key: "trex",
                    value: function(t) {
                        var i = t.id
                            , n = new Uint8Array([0, 0, 0, 0, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1]);
                        return e.box(e.types.trex, n)
                    }
                }, {
                    key: "moof",
                    value: function(t, i) {
                        return e.box(e.types.moof, e.mfhd(t.sequenceNumber), e.traf(t, i))
                    }
                }, {
                    key: "mfhd",
                    value: function(t) {
                        var i = new Uint8Array([0, 0, 0, 0, t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t]);
                        return e.box(e.types.mfhd, i)
                    }
                }, {
                    key: "traf",
                    value: function(t, i) {
                        var n = t.id
                            , r = e.box(e.types.tfhd, new Uint8Array([0, 0, 0, 0, n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, 255 & n]))
                            , s = e.box(e.types.tfdt, new Uint8Array([0, 0, 0, 0, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i]))
                            , a = e.sdtp(t)
                            , o = e.trun(t, a.byteLength + 16 + 16 + 8 + 16 + 8 + 8);
                        return e.box(e.types.traf, r, s, o, a)
                    }
                }, {
                    key: "sdtp",
                    value: function(t) {
                        for (var i = t.samples || [], n = i.length, r = new Uint8Array(4 + n), s = 0; s < n; s++) {
                            var a = i[s].flags;
                            r[s + 4] = a.isLeading << 6 | a.dependsOn << 4 | a.isDependedOn << 2 | a.hasRedundancy
                        }
                        return e.box(e.types.sdtp, r)
                    }
                }, {
                    key: "trun",
                    value: function(t, i) {
                        var n = t.samples || []
                            , r = n.length
                            , s = 12 + 16 * r
                            , a = new Uint8Array(s);
                        i += 8 + s,
                            a.set([0, 0, 15, 1, r >>> 24 & 255, r >>> 16 & 255, r >>> 8 & 255, 255 & r, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i], 0);
                        for (var o = 0; o < r; o++) {
                            var u = n[o].duration
                                , l = n[o].size
                                , d = n[o].flags
                                , h = n[o].cts;
                            a.set([u >>> 24 & 255, u >>> 16 & 255, u >>> 8 & 255, 255 & u, l >>> 24 & 255, l >>> 16 & 255, l >>> 8 & 255, 255 & l, d.isLeading << 2 | d.dependsOn, d.isDependedOn << 6 | d.hasRedundancy << 4 | d.isNonSync, 0, 0, h >>> 24 & 255, h >>> 16 & 255, h >>> 8 & 255, 255 & h], 12 + 16 * o)
                        }
                        return e.box(e.types.trun, a)
                    }
                }, {
                    key: "mdat",
                    value: function(t) {
                        return e.box(e.types.mdat, t)
                    }
                }]),
                    e
            }();
            s.init(),
                i.default = s
        }
            , {}],
        38: [function(e, t, i) {
            "use strict";
            function n(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function r(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                        "value"in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i),
                    n && e(t, n),
                        t
                }
            }()
                , a = e("../utils/logger.js")
                , o = n(a)
                , u = e("./mp4-generator.js")
                , l = n(u)
                , d = e("./aac-silent.js")
                , h = n(d)
                , f = e("../utils/browser.js")
                , c = n(f)
                , _ = e("../core/media-segment-info.js")
                , m = e("../utils/exception.js")
                , p = function() {
                function e(t) {
                    r(this, e),
                        this.TAG = "MP4Remuxer",
                        this._config = t,
                        this._isLive = !0 === t.isLive,
                        this._dtsBase = -1,
                        this._dtsBaseInited = !1,
                        this._audioDtsBase = 1 / 0,
                        this._videoDtsBase = 1 / 0,
                        this._audioNextDts = void 0,
                        this._videoNextDts = void 0,
                        this._audioStashedLastSample = null,
                        this._videoStashedLastSample = null,
                        this._audioMeta = null,
                        this._videoMeta = null,
                        this._audioSegmentInfoList = new _.MediaSegmentInfoList("audio"),
                        this._videoSegmentInfoList = new _.MediaSegmentInfoList("video"),
                        this._onInitSegment = null,
                        this._onMediaSegment = null,
                        this._forceFirstIDR = !(!c.default.chrome || !(c.default.version.major < 50 || 50 === c.default.version.major && c.default.version.build < 2661)),
                        this._fillSilentAfterSeek = c.default.msedge || c.default.msie,
                        this._mp3UseMpegAudio = !c.default.firefox,
                        this._fillAudioTimestampGap = this._config.fixAudioTimestampGap
                }
                return s(e, [{
                    key: "destroy",
                    value: function() {
                        this._dtsBase = -1,
                            this._dtsBaseInited = !1,
                            this._audioMeta = null,
                            this._videoMeta = null,
                            this._audioSegmentInfoList.clear(),
                            this._audioSegmentInfoList = null,
                            this._videoSegmentInfoList.clear(),
                            this._videoSegmentInfoList = null,
                            this._onInitSegment = null,
                            this._onMediaSegment = null
                    }
                }, {
                    key: "bindDataSource",
                    value: function(e) {
                        return e.onDataAvailable = this.remux.bind(this),
                            e.onTrackMetadata = this._onTrackMetadataReceived.bind(this),
                            this
                    }
                }, {
                    key: "insertDiscontinuity",
                    value: function() {
                        this._audioNextDts = this._videoNextDts = void 0
                    }
                }, {
                    key: "seek",
                    value: function(e) {
                        this._audioStashedLastSample = null,
                            this._videoStashedLastSample = null,
                            this._videoSegmentInfoList.clear(),
                            this._audioSegmentInfoList.clear()
                    }
                }, {
                    key: "remux",
                    value: function(e, t) {
                        if (!this._onMediaSegment)
                            throw new m.IllegalStateException("MP4Remuxer: onMediaSegment callback must be specificed!");
                        this._dtsBaseInited || this._calculateDtsBase(e, t),
                            this._remuxVideo(t),
                            this._remuxAudio(e)
                    }
                }, {
                    key: "_onTrackMetadataReceived",
                    value: function(e, t) {
                        var i = null
                            , n = "mp4"
                            , r = t.codec;
                        if ("audio" === e)
                            this._audioMeta = t,
                                "mp3" === t.codec && this._mp3UseMpegAudio ? (n = "mpeg",
                                    r = "",
                                    i = new Uint8Array) : i = l.default.generateInitSegment(t);
                        else {
                            if ("video" !== e)
                                return;
                            this._videoMeta = t,
                                i = l.default.generateInitSegment(t)
                        }
                        if (!this._onInitSegment)
                            throw new m.IllegalStateException("MP4Remuxer: onInitSegment callback must be specified!");
                        this._onInitSegment(e, {
                            type: e,
                            data: i.buffer,
                            codec: r,
                            container: e + "/" + n,
                            mediaDuration: t.duration
                        })
                    }
                }, {
                    key: "_calculateDtsBase",
                    value: function(e, t) {
                        this._dtsBaseInited || (e.samples && e.samples.length && (this._audioDtsBase = e.samples[0].dts),
                        t.samples && t.samples.length && (this._videoDtsBase = t.samples[0].dts),
                            this._dtsBase = Math.min(this._audioDtsBase, this._videoDtsBase),
                            this._dtsBaseInited = !0)
                    }
                }, {
                    key: "flushStashedSamples",
                    value: function() {
                        var e = this._videoStashedLastSample
                            , t = this._audioStashedLastSample
                            , i = {
                            type: "video",
                            id: 1,
                            sequenceNumber: 0,
                            samples: [],
                            length: 0
                        };
                        null != e && (i.samples.push(e),
                            i.length = e.length);
                        var n = {
                            type: "audio",
                            id: 2,
                            sequenceNumber: 0,
                            samples: [],
                            length: 0
                        };
                        null != t && (n.samples.push(t),
                            n.length = t.length),
                            this._videoStashedLastSample = null,
                            this._audioStashedLastSample = null,
                            this._remuxVideo(i, !0),
                            this._remuxAudio(n, !0)
                    }
                }, {
                    key: "_remuxAudio",
                    value: function(e, t) {
                        if (null != this._audioMeta) {
                            var i = e
                                , n = i.samples
                                , r = void 0
                                , s = -1
                                , a = -1
                                , u = this._audioMeta.refSampleDuration
                                , d = "mp3" === this._audioMeta.codec && this._mp3UseMpegAudio
                                , f = this._dtsBaseInited && void 0 === this._audioNextDts
                                , m = !1;
                            if (n && 0 !== n.length && (1 !== n.length || t)) {
                                var p = 0
                                    , v = null
                                    , g = 0;
                                d ? (p = 0,
                                    g = i.length) : (p = 8,
                                    g = 8 + i.length);
                                var y = null;
                                if (n.length > 1 && (y = n.pop(),
                                    g -= y.length),
                                null != this._audioStashedLastSample) {
                                    var E = this._audioStashedLastSample;
                                    this._audioStashedLastSample = null,
                                        n.unshift(E),
                                        g += E.length
                                }
                                null != y && (this._audioStashedLastSample = y);
                                var b = n[0].dts - this._dtsBase;
                                if (this._audioNextDts)
                                    r = b - this._audioNextDts;
                                else if (this._audioSegmentInfoList.isEmpty())
                                    r = 0,
                                    this._fillSilentAfterSeek && !this._videoSegmentInfoList.isEmpty() && "mp3" !== this._audioMeta.originalCodec && (m = !0);
                                else {
                                    var S = this._audioSegmentInfoList.getLastSampleBefore(b);
                                    if (null != S) {
                                        var k = b - (S.originalDts + S.duration);
                                        k <= 3 && (k = 0);
                                        var L = S.dts + S.duration + k;
                                        r = b - L
                                    } else
                                        r = 0
                                }
                                if (m) {
                                    var R = b - r
                                        , A = this._videoSegmentInfoList.getLastSegmentBefore(b);
                                    if (null != A && A.beginDts < R) {
                                        var w = h.default.getSilentFrame(this._audioMeta.originalCodec, this._audioMeta.channelCount);
                                        if (w) {
                                            var T = A.beginDts
                                                , O = R - A.beginDts;
                                            o.default.v(this.TAG, "InsertPrefixSilentAudio: dts: " + T + ", duration: " + O),
                                                n.unshift({
                                                    unit: w,
                                                    dts: T,
                                                    pts: T
                                                }),
                                                g += w.byteLength
                                        }
                                    } else
                                        m = !1
                                }
                                for (var C = [], I = 0; I < n.length; I++) {
                                    var D = n[I]
                                        , x = D.unit
                                        , M = D.dts - this._dtsBase
                                        , B = M - r;
                                    -1 === s && (s = B);
                                    var j = 0;
                                    if (I !== n.length - 1) {
                                        j = n[I + 1].dts - this._dtsBase - r - B
                                    } else if (null != y) {
                                        var P = y.dts - this._dtsBase - r;
                                        j = P - B
                                    } else
                                        j = C.length >= 1 ? C[C.length - 1].duration : Math.floor(u);
                                    var U = !1
                                        , N = null;
                                    if (j > 1.5 * u && "mp3" !== this._audioMeta.codec && this._fillAudioTimestampGap && !c.default.safari) {
                                        U = !0;
                                        var F = Math.abs(j - u)
                                            , G = Math.ceil(F / u)
                                            , V = B + u;
                                        o.default.w(this.TAG, "Large audio timestamp gap detected, may cause AV sync to drift. Silent frames will be generated to avoid unsync.\ndts: " + (B + j) + " ms, expected: " + (B + Math.round(u)) + " ms, delta: " + Math.round(F) + " ms, generate: " + G + " frames");
                                        var z = h.default.getSilentFrame(this._audioMeta.originalCodec, this._audioMeta.channelCount);
                                        null == z && (o.default.w(this.TAG, "Unable to generate silent frame for " + this._audioMeta.originalCodec + " with " + this._audioMeta.channelCount + " channels, repeat last frame"),
                                            z = x),
                                            N = [];
                                        for (var H = 0; H < G; H++) {
                                            var K = Math.round(V);
                                            if (N.length > 0) {
                                                var q = N[N.length - 1];
                                                q.duration = K - q.dts
                                            }
                                            var W = {
                                                dts: K,
                                                pts: K,
                                                cts: 0,
                                                unit: z,
                                                size: z.byteLength,
                                                duration: 0,
                                                originalDts: M,
                                                flags: {
                                                    isLeading: 0,
                                                    dependsOn: 1,
                                                    isDependedOn: 0,
                                                    hasRedundancy: 0
                                                }
                                            };
                                            N.push(W),
                                                g += W.size,
                                                V += u
                                        }
                                        var X = N[N.length - 1];
                                        X.duration = B + j - X.dts,
                                            j = Math.round(u)
                                    }
                                    C.push({
                                        dts: B,
                                        pts: B,
                                        cts: 0,
                                        unit: D.unit,
                                        size: D.unit.byteLength,
                                        duration: j,
                                        originalDts: M,
                                        flags: {
                                            isLeading: 0,
                                            dependsOn: 1,
                                            isDependedOn: 0,
                                            hasRedundancy: 0
                                        }
                                    }),
                                    U && C.push.apply(C, N)
                                }
                                d ? v = new Uint8Array(g) : (v = new Uint8Array(g),
                                    v[0] = g >>> 24 & 255,
                                    v[1] = g >>> 16 & 255,
                                    v[2] = g >>> 8 & 255,
                                    v[3] = 255 & g,
                                    v.set(l.default.types.mdat, 4));
                                for (var Y = 0; Y < C.length; Y++) {
                                    var Z = C[Y].unit;
                                    v.set(Z, p),
                                        p += Z.byteLength
                                }
                                var Q = C[C.length - 1];
                                a = Q.dts + Q.duration,
                                    this._audioNextDts = a;
                                var J = new _.MediaSegmentInfo;
                                J.beginDts = s,
                                    J.endDts = a,
                                    J.beginPts = s,
                                    J.endPts = a,
                                    J.originalBeginDts = C[0].originalDts,
                                    J.originalEndDts = Q.originalDts + Q.duration,
                                    J.firstSample = new _.SampleInfo(C[0].dts,C[0].pts,C[0].duration,C[0].originalDts,!1),
                                    J.lastSample = new _.SampleInfo(Q.dts,Q.pts,Q.duration,Q.originalDts,!1),
                                this._isLive || this._audioSegmentInfoList.append(J),
                                    i.samples = C,
                                    i.sequenceNumber++;
                                var $ = null;
                                $ = d ? new Uint8Array : l.default.moof(i, s),
                                    i.samples = [],
                                    i.length = 0;
                                var ee = {
                                    type: "audio",
                                    data: this._mergeBoxes($, v).buffer,
                                    sampleCount: C.length,
                                    info: J
                                };
                                d && f && (ee.timestampOffset = s),
                                    this._onMediaSegment("audio", ee)
                            }
                        }
                    }
                }, {
                    key: "_remuxVideo",
                    value: function(e, t) {
                        if (null != this._videoMeta) {
                            var i = e
                                , n = i.samples
                                , r = void 0
                                , s = -1
                                , a = -1
                                , o = -1
                                , u = -1;
                            if (n && 0 !== n.length && (1 !== n.length || t)) {
                                var d = 8
                                    , h = null
                                    , f = 8 + e.length
                                    , c = null;
                                if (n.length > 1 && (c = n.pop(),
                                    f -= c.length),
                                null != this._videoStashedLastSample) {
                                    var m = this._videoStashedLastSample;
                                    this._videoStashedLastSample = null,
                                        n.unshift(m),
                                        f += m.length
                                }
                                null != c && (this._videoStashedLastSample = c);
                                var p = n[0].dts - this._dtsBase;
                                if (this._videoNextDts)
                                    r = p - this._videoNextDts;
                                else if (this._videoSegmentInfoList.isEmpty())
                                    r = 0;
                                else {
                                    var v = this._videoSegmentInfoList.getLastSampleBefore(p);
                                    if (null != v) {
                                        var g = p - (v.originalDts + v.duration);
                                        g <= 3 && (g = 0);
                                        var y = v.dts + v.duration + g;
                                        r = p - y
                                    } else
                                        r = 0
                                }
                                for (var E = new _.MediaSegmentInfo, b = [], S = 0; S < n.length; S++) {
                                    var k = n[S]
                                        , L = k.dts - this._dtsBase
                                        , R = k.isKeyframe
                                        , A = L - r
                                        , w = k.cts
                                        , T = A + w;
                                    -1 === s && (s = A,
                                        o = T);
                                    var O = 0;
                                    if (S !== n.length - 1) {
                                        O = n[S + 1].dts - this._dtsBase - r - A
                                    } else if (null != c) {
                                        var C = c.dts - this._dtsBase - r;
                                        O = C - A
                                    } else
                                        O = b.length >= 1 ? b[b.length - 1].duration : Math.floor(this._videoMeta.refSampleDuration);
                                    if (R) {
                                        var I = new _.SampleInfo(A,T,O,k.dts,!0);
                                        I.fileposition = k.fileposition,
                                            E.appendSyncPoint(I)
                                    }
                                    b.push({
                                        dts: A,
                                        pts: T,
                                        cts: w,
                                        units: k.units,
                                        size: k.length,
                                        isKeyframe: R,
                                        duration: O,
                                        originalDts: L,
                                        flags: {
                                            isLeading: 0,
                                            dependsOn: R ? 2 : 1,
                                            isDependedOn: R ? 1 : 0,
                                            hasRedundancy: 0,
                                            isNonSync: R ? 0 : 1
                                        }
                                    })
                                }
                                h = new Uint8Array(f),
                                    h[0] = f >>> 24 & 255,
                                    h[1] = f >>> 16 & 255,
                                    h[2] = f >>> 8 & 255,
                                    h[3] = 255 & f,
                                    h.set(l.default.types.mdat, 4);
                                for (var D = 0; D < b.length; D++)
                                    for (var x = b[D].units; x.length; ) {
                                        var M = x.shift()
                                            , B = M.data;
                                        h.set(B, d),
                                            d += B.byteLength
                                    }
                                var j = b[b.length - 1];
                                if (a = j.dts + j.duration,
                                    u = j.pts + j.duration,
                                    this._videoNextDts = a,
                                    E.beginDts = s,
                                    E.endDts = a,
                                    E.beginPts = o,
                                    E.endPts = u,
                                    E.originalBeginDts = b[0].originalDts,
                                    E.originalEndDts = j.originalDts + j.duration,
                                    E.firstSample = new _.SampleInfo(b[0].dts,b[0].pts,b[0].duration,b[0].originalDts,b[0].isKeyframe),
                                    E.lastSample = new _.SampleInfo(j.dts,j.pts,j.duration,j.originalDts,j.isKeyframe),
                                this._isLive || this._videoSegmentInfoList.append(E),
                                    i.samples = b,
                                    i.sequenceNumber++,
                                    this._forceFirstIDR) {
                                    var P = b[0].flags;
                                    P.dependsOn = 2,
                                        P.isNonSync = 0
                                }
                                var U = l.default.moof(i, s);
                                i.samples = [],
                                    i.length = 0,
                                    this._onMediaSegment("video", {
                                        type: "video",
                                        data: this._mergeBoxes(U, h).buffer,
                                        sampleCount: b.length,
                                        info: E
                                    })
                            }
                        }
                    }
                }, {
                    key: "_mergeBoxes",
                    value: function(e, t) {
                        var i = new Uint8Array(e.byteLength + t.byteLength);
                        return i.set(e, 0),
                            i.set(t, e.byteLength),
                            i
                    }
                }, {
                    key: "onInitSegment",
                    get: function() {
                        return this._onInitSegment
                    },
                    set: function(e) {
                        this._onInitSegment = e
                    }
                }, {
                    key: "onMediaSegment",
                    get: function() {
                        return this._onMediaSegment
                    },
                    set: function(e) {
                        this._onMediaSegment = e
                    }
                }]),
                    e
            }();
            i.default = p
        }
            , {
                "../core/media-segment-info.js": 8,
                "../utils/browser.js": 39,
                "../utils/exception.js": 40,
                "../utils/logger.js": 41,
                "./aac-silent.js": 36,
                "./mp4-generator.js": 37
            }],
        39: [function(e, t, i) {
            "use strict";
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var n = {};
            !function() {
                var e = self.navigator.userAgent.toLowerCase()
                    , t = /(edge)\/([\w.]+)/.exec(e) || /(opr)[\/]([\w.]+)/.exec(e) || /(chrome)[ \/]([\w.]+)/.exec(e) || /(iemobile)[\/]([\w.]+)/.exec(e) || /(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(firefox)[ \/]([\w.]+)/.exec(e) || []
                    , i = /(ipad)/.exec(e) || /(ipod)/.exec(e) || /(windows phone)/.exec(e) || /(iphone)/.exec(e) || /(kindle)/.exec(e) || /(android)/.exec(e) || /(windows)/.exec(e) || /(mac)/.exec(e) || /(linux)/.exec(e) || /(cros)/.exec(e) || []
                    , r = {
                    browser: t[5] || t[3] || t[1] || "",
                    version: t[2] || t[4] || "0",
                    majorVersion: t[4] || t[2] || "0",
                    platform: i[0] || ""
                }
                    , s = {};
                if (r.browser) {
                    s[r.browser] = !0;
                    var a = r.majorVersion.split(".");
                    s.version = {
                        major: parseInt(r.majorVersion, 10),
                        string: r.version
                    },
                    a.length > 1 && (s.version.minor = parseInt(a[1], 10)),
                    a.length > 2 && (s.version.build = parseInt(a[2], 10))
                }
                r.platform && (s[r.platform] = !0),
                (s.chrome || s.opr || s.safari) && (s.webkit = !0),
                (s.rv || s.iemobile) && (s.rv && delete s.rv,
                    r.browser = "msie",
                    s.msie = !0),
                s.edge && (delete s.edge,
                    r.browser = "msedge",
                    s.msedge = !0),
                s.opr && (r.browser = "opera",
                    s.opera = !0),
                s.safari && s.android && (r.browser = "android",
                    s.android = !0),
                    s.name = r.browser,
                    s.platform = r.platform;
                for (var o in n)
                    n.hasOwnProperty(o) && delete n[o];
                Object.assign(n, s)
            }(),
                i.default = n
        }
            , {}],
        40: [function(e, t, i) {
            "use strict";
            function n(e, t) {
                if (!e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            function r(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            function s(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var a = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                        "value"in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i),
                    n && e(t, n),
                        t
                }
            }()
                , o = i.RuntimeException = function() {
                function e(t) {
                    s(this, e),
                        this._message = t
                }
                return a(e, [{
                    key: "toString",
                    value: function() {
                        return this.name + ": " + this.message
                    }
                }, {
                    key: "name",
                    get: function() {
                        return "RuntimeException"
                    }
                }, {
                    key: "message",
                    get: function() {
                        return this._message
                    }
                }]),
                    e
            }();
            i.IllegalStateException = function(e) {
                function t(e) {
                    return s(this, t),
                        n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e))
                }
                return r(t, e),
                    a(t, [{
                        key: "name",
                        get: function() {
                            return "IllegalStateException"
                        }
                    }]),
                    t
            }(o),
                i.InvalidArgumentException = function(e) {
                    function t(e) {
                        return s(this, t),
                            n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e))
                    }
                    return r(t, e),
                        a(t, [{
                            key: "name",
                            get: function() {
                                return "InvalidArgumentException"
                            }
                        }]),
                        t
                }(o),
                i.NotImplementedException = function(e) {
                    function t(e) {
                        return s(this, t),
                            n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e))
                    }
                    return r(t, e),
                        a(t, [{
                            key: "name",
                            get: function() {
                                return "NotImplementedException"
                            }
                        }]),
                        t
                }(o)
        }
            , {}],
        41: [function(e, t, i) {
            "use strict";
            function n(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var r = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                        "value"in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i),
                    n && e(t, n),
                        t
                }
            }()
                , s = e("events")
                , a = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(s)
                , o = function() {
                function e() {
                    n(this, e)
                }
                return r(e, null, [{
                    key: "e",
                    value: function(t, i) {
                        t && !e.FORCE_GLOBAL_TAG || (t = e.GLOBAL_TAG);
                        var n = "[" + t + "] > " + i;
                        e.ENABLE_CALLBACK && e.emitter.emit("log", "error", n),
                        e.ENABLE_ERROR && (console.error ? console.error(n) : console.warn ? console.warn(n) : console.log(n))
                    }
                }, {
                    key: "i",
                    value: function(t, i) {
                        t && !e.FORCE_GLOBAL_TAG || (t = e.GLOBAL_TAG);
                        var n = "[" + t + "] > " + i;
                        e.ENABLE_CALLBACK && e.emitter.emit("log", "info", n),
                        e.ENABLE_INFO && (console.info ? console.info(n) : console.log(n))
                    }
                }, {
                    key: "w",
                    value: function(t, i) {
                        t && !e.FORCE_GLOBAL_TAG || (t = e.GLOBAL_TAG);
                        var n = "[" + t + "] > " + i;
                        e.ENABLE_CALLBACK && e.emitter.emit("log", "warn", n),
                        e.ENABLE_WARN && (console.warn ? console.warn(n) : console.log(n))
                    }
                }, {
                    key: "d",
                    value: function(t, i) {
                        t && !e.FORCE_GLOBAL_TAG || (t = e.GLOBAL_TAG);
                        var n = "[" + t + "] > " + i;
                        e.ENABLE_CALLBACK && e.emitter.emit("log", "debug", n),
                        e.ENABLE_DEBUG && (console.debug ? console.debug(n) : console.log(n))
                    }
                }, {
                    key: "v",
                    value: function(t, i) {
                        t && !e.FORCE_GLOBAL_TAG || (t = e.GLOBAL_TAG);
                        var n = "[" + t + "] > " + i;
                        e.ENABLE_CALLBACK && e.emitter.emit("log", "verbose", n),
                        e.ENABLE_VERBOSE && console.log(n)
                    }
                }]),
                    e
            }();
            o.GLOBAL_TAG = "flv.js",
                o.FORCE_GLOBAL_TAG = !1,
                o.ENABLE_ERROR = !0,
                o.ENABLE_INFO = !0,
                o.ENABLE_WARN = !0,
                o.ENABLE_DEBUG = !0,
                o.ENABLE_VERBOSE = !0,
                o.ENABLE_CALLBACK = !1,
                o.emitter = new a.default,
                i.default = o
        }
            , {
                events: 2
            }],
        42: [function(e, t, i) {
            "use strict";
            function n(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function r(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                        "value"in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i),
                    n && e(t, n),
                        t
                }
            }()
                , a = e("events")
                , o = n(a)
                , u = e("./logger.js")
                , l = n(u)
                , d = function() {
                function e() {
                    r(this, e)
                }
                return s(e, null, [{
                    key: "getConfig",
                    value: function() {
                        return {
                            globalTag: l.default.GLOBAL_TAG,
                            forceGlobalTag: l.default.FORCE_GLOBAL_TAG,
                            enableVerbose: l.default.ENABLE_VERBOSE,
                            enableDebug: l.default.ENABLE_DEBUG,
                            enableInfo: l.default.ENABLE_INFO,
                            enableWarn: l.default.ENABLE_WARN,
                            enableError: l.default.ENABLE_ERROR,
                            enableCallback: l.default.ENABLE_CALLBACK
                        }
                    }
                }, {
                    key: "applyConfig",
                    value: function(e) {
                        l.default.GLOBAL_TAG = e.globalTag,
                            l.default.FORCE_GLOBAL_TAG = e.forceGlobalTag,
                            l.default.ENABLE_VERBOSE = e.enableVerbose,
                            l.default.ENABLE_DEBUG = e.enableDebug,
                            l.default.ENABLE_INFO = e.enableInfo,
                            l.default.ENABLE_WARN = e.enableWarn,
                            l.default.ENABLE_ERROR = e.enableError,
                            l.default.ENABLE_CALLBACK = e.enableCallback
                    }
                }, {
                    key: "_notifyChange",
                    value: function() {
                        var t = e.emitter;
                        if (t.listenerCount("change") > 0) {
                            var i = e.getConfig();
                            t.emit("change", i)
                        }
                    }
                }, {
                    key: "registerListener",
                    value: function(t) {
                        e.emitter.addListener("change", t)
                    }
                }, {
                    key: "removeListener",
                    value: function(t) {
                        e.emitter.removeListener("change", t)
                    }
                }, {
                    key: "addLogListener",
                    value: function(t) {
                        l.default.emitter.addListener("log", t),
                        l.default.emitter.listenerCount("log") > 0 && (l.default.ENABLE_CALLBACK = !0,
                            e._notifyChange())
                    }
                }, {
                    key: "removeLogListener",
                    value: function(t) {
                        l.default.emitter.removeListener("log", t),
                        0 === l.default.emitter.listenerCount("log") && (l.default.ENABLE_CALLBACK = !1,
                            e._notifyChange())
                    }
                }, {
                    key: "forceGlobalTag",
                    get: function() {
                        return l.default.FORCE_GLOBAL_TAG
                    },
                    set: function(t) {
                        l.default.FORCE_GLOBAL_TAG = t,
                            e._notifyChange()
                    }
                }, {
                    key: "globalTag",
                    get: function() {
                        return l.default.GLOBAL_TAG
                    },
                    set: function(t) {
                        l.default.GLOBAL_TAG = t,
                            e._notifyChange()
                    }
                }, {
                    key: "enableAll",
                    get: function() {
                        return l.default.ENABLE_VERBOSE && l.default.ENABLE_DEBUG && l.default.ENABLE_INFO && l.default.ENABLE_WARN && l.default.ENABLE_ERROR
                    },
                    set: function(t) {
                        l.default.ENABLE_VERBOSE = t,
                            l.default.ENABLE_DEBUG = t,
                            l.default.ENABLE_INFO = t,
                            l.default.ENABLE_WARN = t,
                            l.default.ENABLE_ERROR = t,
                            e._notifyChange()
                    }
                }, {
                    key: "enableDebug",
                    get: function() {
                        return l.default.ENABLE_DEBUG
                    },
                    set: function(t) {
                        l.default.ENABLE_DEBUG = t,
                            e._notifyChange()
                    }
                }, {
                    key: "enableVerbose",
                    get: function() {
                        return l.default.ENABLE_VERBOSE
                    },
                    set: function(t) {
                        l.default.ENABLE_VERBOSE = t,
                            e._notifyChange()
                    }
                }, {
                    key: "enableInfo",
                    get: function() {
                        return l.default.ENABLE_INFO
                    },
                    set: function(t) {
                        l.default.ENABLE_INFO = t,
                            e._notifyChange()
                    }
                }, {
                    key: "enableWarn",
                    get: function() {
                        return l.default.ENABLE_WARN
                    },
                    set: function(t) {
                        l.default.ENABLE_WARN = t,
                            e._notifyChange()
                    }
                }, {
                    key: "enableError",
                    get: function() {
                        return l.default.ENABLE_ERROR
                    },
                    set: function(t) {
                        l.default.ENABLE_ERROR = t,
                            e._notifyChange()
                    }
                }]),
                    e
            }();
            d.emitter = new o.default,
                i.default = d
        }
            , {
                "./logger.js": 41,
                events: 2
            }],
        43: [function(e, t, i) {
            "use strict";
            function n(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var r = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                        "value"in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i),
                    n && e(t, n),
                        t
                }
            }()
                , s = function() {
                function t() {
                    n(this, t)
                }
                return r(t, null, [{
                    key: "install",
                    value: function() {
                        Object.setPrototypeOf = Object.setPrototypeOf || function(e, t) {
                            return e.__proto__ = t,
                                e
                        }
                            ,
                            Object.assign = Object.assign || function(e) {
                                if (void 0 === e || null === e)
                                    throw new TypeError("Cannot convert undefined or null to object");
                                for (var t = Object(e), i = 1; i < arguments.length; i++) {
                                    var n = arguments[i];
                                    if (void 0 !== n && null !== n)
                                        for (var r in n)
                                            n.hasOwnProperty(r) && (t[r] = n[r])
                                }
                                return t
                            }
                            ,
                        "function" != typeof self.Promise && e("es6-promise").polyfill()
                    }
                }]),
                    t
            }();
            s.install(),
                i.default = s
        }
            , {
                "es6-promise": 1
            }],
        44: [function(e, t, i) {
            "use strict";
            function n(e, t, i) {
                var n = e;
                if (t + i < n.length) {
                    for (; i--; )
                        if (128 != (192 & n[++t]))
                            return !1;
                    return !0
                }
                return !1
            }
            function r(e) {
                for (var t = [], i = e, r = 0, s = e.length; r < s; )
                    if (i[r] < 128)
                        t.push(String.fromCharCode(i[r])),
                            ++r;
                    else {
                        if (i[r] < 192)
                            ;
                        else if (i[r] < 224) {
                            if (n(i, r, 1)) {
                                var a = (31 & i[r]) << 6 | 63 & i[r + 1];
                                if (a >= 128) {
                                    t.push(String.fromCharCode(65535 & a)),
                                        r += 2;
                                    continue
                                }
                            }
                        } else if (i[r] < 240) {
                            if (n(i, r, 2)) {
                                var o = (15 & i[r]) << 12 | (63 & i[r + 1]) << 6 | 63 & i[r + 2];
                                if (o >= 2048 && 55296 != (63488 & o)) {
                                    t.push(String.fromCharCode(65535 & o)),
                                        r += 3;
                                    continue
                                }
                            }
                        } else if (i[r] < 248 && n(i, r, 3)) {
                            var u = (7 & i[r]) << 18 | (63 & i[r + 1]) << 12 | (63 & i[r + 2]) << 6 | 63 & i[r + 3];
                            if (u > 65536 && u < 1114112) {
                                u -= 65536,
                                    t.push(String.fromCharCode(u >>> 10 | 55296)),
                                    t.push(String.fromCharCode(1023 & u | 56320)),
                                    r += 4;
                                continue
                            }
                        }
                        t.push(String.fromCharCode(65533)),
                            ++r
                    }
                return t.join("")
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            }),
                i.default = r
        }
            , {}]
    }, {}, [21])(21)
});
//# sourceMappingURL=flv.min.js.map
