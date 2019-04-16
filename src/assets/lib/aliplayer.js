/*! Aliplayer - v2.8.0 - 2019-02-22 */
!function o(a, s, l) {
    function u(i, e) {
        if (!s[i]) {
            if (!a[i]) {
                var t = "function" == typeof require && require;
                if (!e && t) return t(i, !0);
                if (c) return c(i, !0);
                var r = new Error("Cannot find module '" + i + "'");
                throw r.code = "MODULE_NOT_FOUND", r;
            }
            var n = s[i] = {
                exports:{}
            };
            a[i][0].call(n.exports, function(e) {
                var t = a[i][1][e];
                return u(t || e);
            }, n, n.exports, o, a, s, l);
        }
        return s[i].exports;
    }
    for (var c = "function" == typeof require && require, e = 0; e < l.length; e++) u(l[e]);
    return u;
}({
    1:[ function(e, t, i) {
        var r, n;
        r = this, n = function() {
            var c, i, e, t, r, d, n, o, a, s, l, u, p = p || (c = Math, i = Object.create || function() {
                function i() {}
                return function(e) {
                    var t;
                    return i.prototype = e, t = new i(), i.prototype = null, t;
                };
            }(), t = (e = {}).lib = {}, r = t.Base = {
                extend:function(e) {
                    var t = i(this);
                    return e && t.mixIn(e), t.hasOwnProperty("init") && this.init !== t.init || (t.init = function() {
                        t.$super.init.apply(this, arguments);
                    }), (t.init.prototype = t).$super = this, t;
                },
                create:function() {
                    var e = this.extend();
                    return e.init.apply(e, arguments), e;
                },
                init:function() {},
                mixIn:function(e) {
                    for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
                    e.hasOwnProperty("toString") && (this.toString = e.toString);
                },
                clone:function() {
                    return this.init.prototype.extend(this);
                }
            }, d = t.WordArray = r.extend({
                init:function(e, t) {
                    e = this.words = e || [], this.sigBytes = null != t ? t :4 * e.length;
                },
                toString:function(e) {
                    return (e || o).stringify(this);
                },
                concat:function(e) {
                    var t = this.words, i = e.words, r = this.sigBytes, n = e.sigBytes;
                    if (this.clamp(), r % 4) for (var o = 0; o < n; o++) {
                        var a = i[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                        t[r + o >>> 2] |= a << 24 - (r + o) % 4 * 8;
                    } else for (o = 0; o < n; o += 4) t[r + o >>> 2] = i[o >>> 2];
                    return this.sigBytes += n, this;
                },
                clamp:function() {
                    var e = this.words, t = this.sigBytes;
                    e[t >>> 2] &= 4294967295 << 32 - t % 4 * 8, e.length = c.ceil(t / 4);
                },
                clone:function() {
                    var e = r.clone.call(this);
                    return e.words = this.words.slice(0), e;
                },
                random:function(e) {
                    for (var t, i = [], r = function(t) {
                        t = t;
                        var i = 987654321, r = 4294967295;
                        return function() {
                            var e = ((i = 36969 * (65535 & i) + (i >> 16) & r) << 16) + (t = 18e3 * (65535 & t) + (t >> 16) & r) & r;
                            return e /= 4294967296, (e += .5) * (.5 < c.random() ? 1 :-1);
                        };
                    }, n = 0; n < e; n += 4) {
                        var o = r(4294967296 * (t || c.random()));
                        t = 987654071 * o(), i.push(4294967296 * o() | 0);
                    }
                    return new d.init(i, e);
                }
            }), n = e.enc = {}, o = n.Hex = {
                stringify:function(e) {
                    for (var t = e.words, i = e.sigBytes, r = [], n = 0; n < i; n++) {
                        var o = t[n >>> 2] >>> 24 - n % 4 * 8 & 255;
                        r.push((o >>> 4).toString(16)), r.push((15 & o).toString(16));
                    }
                    return r.join("");
                },
                parse:function(e) {
                    for (var t = e.length, i = [], r = 0; r < t; r += 2) i[r >>> 3] |= parseInt(e.substr(r, 2), 16) << 24 - r % 8 * 4;
                    return new d.init(i, t / 2);
                }
            }, a = n.Latin1 = {
                stringify:function(e) {
                    for (var t = e.words, i = e.sigBytes, r = [], n = 0; n < i; n++) {
                        var o = t[n >>> 2] >>> 24 - n % 4 * 8 & 255;
                        r.push(String.fromCharCode(o));
                    }
                    return r.join("");
                },
                parse:function(e) {
                    for (var t = e.length, i = [], r = 0; r < t; r++) i[r >>> 2] |= (255 & e.charCodeAt(r)) << 24 - r % 4 * 8;
                    return new d.init(i, t);
                }
            }, s = n.Utf8 = {
                stringify:function(e) {
                    try {
                        return decodeURIComponent(escape(a.stringify(e)));
                    } catch (e) {
                        throw new Error("Malformed UTF-8 data");
                    }
                },
                parse:function(e) {
                    return a.parse(unescape(encodeURIComponent(e)));
                }
            }, l = t.BufferedBlockAlgorithm = r.extend({
                reset:function() {
                    this._data = new d.init(), this._nDataBytes = 0;
                },
                _append:function(e) {
                    "string" == typeof e && (e = s.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes;
                },
                _process:function(e) {
                    var t = this._data, i = t.words, r = t.sigBytes, n = this.blockSize, o = r / (4 * n), a = (o = e ? c.ceil(o) :c.max((0 | o) - this._minBufferSize, 0)) * n, s = c.min(4 * a, r);
                    if (a) {
                        for (var l = 0; l < a; l += n) this._doProcessBlock(i, l);
                        var u = i.splice(0, a);
                        t.sigBytes -= s;
                    }
                    return new d.init(u, s);
                },
                clone:function() {
                    var e = r.clone.call(this);
                    return e._data = this._data.clone(), e;
                },
                _minBufferSize:0
            }), t.Hasher = l.extend({
                cfg:r.extend(),
                init:function(e) {
                    this.cfg = this.cfg.extend(e), this.reset();
                },
                reset:function() {
                    l.reset.call(this), this._doReset();
                },
                update:function(e) {
                    return this._append(e), this._process(), this;
                },
                finalize:function(e) {
                    return e && this._append(e), this._doFinalize();
                },
                blockSize:16,
                _createHelper:function(i) {
                    return function(e, t) {
                        return new i.init(t).finalize(e);
                    };
                },
                _createHmacHelper:function(i) {
                    return function(e, t) {
                        return new u.HMAC.init(i, t).finalize(e);
                    };
                }
            }), u = e.algo = {}, e);
            return p;
        }, "object" == typeof i ? t.exports = i = n() :"function" == typeof define && define.amd ? define([], n) :r.CryptoJS = n();
    }, {} ],
    2:[ function(e, t, i) {
        var r, n;
        r = this, n = function(e) {
            var t, l;
            return l = (t = e).lib.WordArray, t.enc.Base64 = {
                stringify:function(e) {
                    var t = e.words, i = e.sigBytes, r = this._map;
                    e.clamp();
                    for (var n = [], o = 0; o < i; o += 3) for (var a = (t[o >>> 2] >>> 24 - o % 4 * 8 & 255) << 16 | (t[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255) << 8 | t[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, s = 0; s < 4 && o + .75 * s < i; s++) n.push(r.charAt(a >>> 6 * (3 - s) & 63));
                    var l = r.charAt(64);
                    if (l) for (;n.length % 4; ) n.push(l);
                    return n.join("");
                },
                parse:function(e) {
                    var t = e.length, i = this._map, r = this._reverseMap;
                    if (!r) {
                        r = this._reverseMap = [];
                        for (var n = 0; n < i.length; n++) r[i.charCodeAt(n)] = n;
                    }
                    var o = i.charAt(64);
                    if (o) {
                        var a = e.indexOf(o);
                        -1 !== a && (t = a);
                    }
                    return function(e, t, i) {
                        for (var r = [], n = 0, o = 0; o < t; o++) if (o % 4) {
                            var a = i[e.charCodeAt(o - 1)] << o % 4 * 2, s = i[e.charCodeAt(o)] >>> 6 - o % 4 * 2;
                            r[n >>> 2] |= (a | s) << 24 - n % 4 * 8, n++;
                        }
                        return l.create(r, n);
                    }(e, t, r);
                },
                _map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
            }, e.enc.Base64;
        }, "object" == typeof i ? t.exports = i = n(e("./core")) :"function" == typeof define && define.amd ? define([ "./core" ], n) :n(r.CryptoJS);
    }, {
        "./core":1
    } ],
    3:[ function(e, t, i) {
        var r, n;
        r = this, n = function(e) {
            return e.enc.Utf8;
        }, "object" == typeof i ? t.exports = i = n(e("./core")) :"function" == typeof define && define.amd ? define([ "./core" ], n) :n(r.CryptoJS);
    }, {
        "./core":1
    } ],
    4:[ function(e, t, i) {
        var r, n;
        r = this, n = function(e) {
            return e.HmacSHA1;
        }, "object" == typeof i ? t.exports = i = n(e("./core"), e("./sha1"), e("./hmac")) :"function" == typeof define && define.amd ? define([ "./core", "./sha1", "./hmac" ], n) :n(r.CryptoJS);
    }, {
        "./core":1,
        "./hmac":5,
        "./sha1":6
    } ],
    5:[ function(e, t, i) {
        var r, n;
        r = this, n = function(e) {
            var t, i, u;
            i = (t = e).lib.Base, u = t.enc.Utf8, t.algo.HMAC = i.extend({
                init:function(e, t) {
                    e = this._hasher = new e.init(), "string" == typeof t && (t = u.parse(t));
                    var i = e.blockSize, r = 4 * i;
                    t.sigBytes > r && (t = e.finalize(t)), t.clamp();
                    for (var n = this._oKey = t.clone(), o = this._iKey = t.clone(), a = n.words, s = o.words, l = 0; l < i; l++) a[l] ^= 1549556828,
                        s[l] ^= 909522486;
                    n.sigBytes = o.sigBytes = r, this.reset();
                },
                reset:function() {
                    var e = this._hasher;
                    e.reset(), e.update(this._iKey);
                },
                update:function(e) {
                    return this._hasher.update(e), this;
                },
                finalize:function(e) {
                    var t = this._hasher, i = t.finalize(e);
                    return t.reset(), t.finalize(this._oKey.clone().concat(i));
                }
            });
        }, "object" == typeof i ? t.exports = i = n(e("./core")) :"function" == typeof define && define.amd ? define([ "./core" ], n) :n(r.CryptoJS);
    }, {
        "./core":1
    } ],
    6:[ function(e, t, i) {
        var r, n;
        r = this, n = function(e) {
            var t, i, r, n, o, d, a;
            return i = (t = e).lib, r = i.WordArray, n = i.Hasher, o = t.algo, d = [], a = o.SHA1 = n.extend({
                _doReset:function() {
                    this._hash = new r.init([ 1732584193, 4023233417, 2562383102, 271733878, 3285377520 ]);
                },
                _doProcessBlock:function(e, t) {
                    for (var i = this._hash.words, r = i[0], n = i[1], o = i[2], a = i[3], s = i[4], l = 0; l < 80; l++) {
                        if (l < 16) d[l] = 0 | e[t + l]; else {
                            var u = d[l - 3] ^ d[l - 8] ^ d[l - 14] ^ d[l - 16];
                            d[l] = u << 1 | u >>> 31;
                        }
                        var c = (r << 5 | r >>> 27) + s + d[l];
                        c += l < 20 ? 1518500249 + (n & o | ~n & a) :l < 40 ? 1859775393 + (n ^ o ^ a) :l < 60 ? (n & o | n & a | o & a) - 1894007588 :(n ^ o ^ a) - 899497514,
                            s = a, a = o, o = n << 30 | n >>> 2, n = r, r = c;
                    }
                    i[0] = i[0] + r | 0, i[1] = i[1] + n | 0, i[2] = i[2] + o | 0, i[3] = i[3] + a | 0,
                        i[4] = i[4] + s | 0;
                },
                _doFinalize:function() {
                    var e = this._data, t = e.words, i = 8 * this._nDataBytes, r = 8 * e.sigBytes;
                    return t[r >>> 5] |= 128 << 24 - r % 32, t[14 + (r + 64 >>> 9 << 4)] = Math.floor(i / 4294967296),
                        t[15 + (r + 64 >>> 9 << 4)] = i, e.sigBytes = 4 * t.length, this._process(), this._hash;
                },
                clone:function() {
                    var e = n.clone.call(this);
                    return e._hash = this._hash.clone(), e;
                }
            }), t.SHA1 = n._createHelper(a), t.HmacSHA1 = n._createHmacHelper(a), e.SHA1;
        }, "object" == typeof i ? t.exports = i = n(e("./core")) :"function" == typeof define && define.amd ? define([ "./core" ], n) :n(r.CryptoJS);
    }, {
        "./core":1
    } ],
    7:[ function(e, t, i) {
        !function() {
            "use strict";
            function s(n, e) {
                var t;
                if (e = e || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null,
                    this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = e.touchBoundary || 10,
                    this.layer = n, this.tapDelay = e.tapDelay || 200, this.tapTimeout = e.tapTimeout || 700,
                    !s.notNeeded(n)) {
                    for (var i = [ "onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel" ], r = 0, o = i.length; r < o; r++) this[i[r]] = a(this[i[r]], this);
                    l && (n.addEventListener("mouseover", this.onMouse, !0), n.addEventListener("mousedown", this.onMouse, !0),
                        n.addEventListener("mouseup", this.onMouse, !0)), n.addEventListener("click", this.onClick, !0),
                        n.addEventListener("touchstart", this.onTouchStart, !1), n.addEventListener("touchmove", this.onTouchMove, !1),
                        n.addEventListener("touchend", this.onTouchEnd, !1), n.addEventListener("touchcancel", this.onTouchCancel, !1),
                    Event.prototype.stopImmediatePropagation || (n.removeEventListener = function(e, t, i) {
                        var r = Node.prototype.removeEventListener;
                        "click" === e ? r.call(n, e, t.hijacked || t, i) :r.call(n, e, t, i);
                    }, n.addEventListener = function(e, t, i) {
                        var r = Node.prototype.addEventListener;
                        "click" === e ? r.call(n, e, t.hijacked || (t.hijacked = function(e) {
                            e.propagationStopped || t(e);
                        }), i) :r.call(n, e, t, i);
                    }), "function" == typeof n.onclick && (t = n.onclick, n.addEventListener("click", function(e) {
                        t(e);
                    }, !1), n.onclick = null);
                }
                function a(e, t) {
                    return function() {
                        return e.apply(t, arguments);
                    };
                }
            }
            var e = 0 <= navigator.userAgent.indexOf("Windows Phone"), l = 0 < navigator.userAgent.indexOf("Android") && !e, u = /iP(ad|hone|od)/.test(navigator.userAgent) && !e, c = u && /OS 4_\d(_\d)?/.test(navigator.userAgent), d = u && /OS [6-7]_\d/.test(navigator.userAgent), n = 0 < navigator.userAgent.indexOf("BB10");
            s.prototype.needsClick = function(e) {
                switch (e.nodeName.toLowerCase()) {
                    case "button":
                    case "select":
                    case "textarea":
                        if (e.disabled) return !0;
                        break;

                    case "input":
                        if (u && "file" === e.type || e.disabled) return !0;
                        break;

                    case "label":
                    case "iframe":
                    case "video":
                        return !0;
                }
                return /\bneedsclick\b/.test(e.className);
            }, s.prototype.needsFocus = function(e) {
                switch (e.nodeName.toLowerCase()) {
                    case "textarea":
                        return !0;

                    case "select":
                        return !l;

                    case "input":
                        switch (e.type) {
                            case "button":
                            case "checkbox":
                            case "file":
                            case "image":
                            case "radio":
                            case "submit":
                                return !1;
                        }
                        return !e.disabled && !e.readOnly;

                    default:
                        return /\bneedsfocus\b/.test(e.className);
                }
            }, s.prototype.sendClick = function(e, t) {
                var i, r;
                document.activeElement && document.activeElement !== e && document.activeElement.blur(),
                    r = t.changedTouches[0], (i = document.createEvent("MouseEvents")).initMouseEvent(this.determineEventType(e), !0, !0, window, 1, r.screenX, r.screenY, r.clientX, r.clientY, !1, !1, !1, !1, 0, null),
                    i.forwardedTouchEvent = !0, e.dispatchEvent(i);
            }, s.prototype.determineEventType = function(e) {
                return l && "select" === e.tagName.toLowerCase() ? "mousedown" :"click";
            }, s.prototype.focus = function(e) {
                var t;
                u && e.setSelectionRange && 0 !== e.type.indexOf("date") && "time" !== e.type && "month" !== e.type ? (t = e.value.length,
                    e.setSelectionRange(t, t)) :e.focus();
            }, s.prototype.updateScrollParent = function(e) {
                var t, i;
                if (!(t = e.fastClickScrollParent) || !t.contains(e)) {
                    i = e;
                    do {
                        if (i.scrollHeight > i.offsetHeight) {
                            t = i, e.fastClickScrollParent = i;
                            break;
                        }
                        i = i.parentElement;
                    } while (i);
                }
                t && (t.fastClickLastScrollTop = t.scrollTop);
            }, s.prototype.getTargetElementFromEventTarget = function(e) {
                return e.nodeType === Node.TEXT_NODE ? e.parentNode :e;
            }, s.prototype.onTouchStart = function(e) {
                var t, i, r;
                if (1 < e.targetTouches.length) return !0;
                if (t = this.getTargetElementFromEventTarget(e.target), i = e.targetTouches[0],
                    u) {
                    if ((r = window.getSelection()).rangeCount && !r.isCollapsed) return !0;
                    if (!c) {
                        if (i.identifier && i.identifier === this.lastTouchIdentifier) return e.preventDefault(),
                            !1;
                        this.lastTouchIdentifier = i.identifier, this.updateScrollParent(t);
                    }
                }
                return this.trackingClick = !0, this.trackingClickStart = e.timeStamp, this.targetElement = t,
                    this.touchStartX = i.pageX, this.touchStartY = i.pageY, e.timeStamp - this.lastClickTime < this.tapDelay && e.preventDefault(),
                    !0;
            }, s.prototype.touchHasMoved = function(e) {
                var t = e.changedTouches[0], i = this.touchBoundary;
                return Math.abs(t.pageX - this.touchStartX) > i || Math.abs(t.pageY - this.touchStartY) > i;
            }, s.prototype.onTouchMove = function(e) {
                return this.trackingClick && (this.targetElement !== this.getTargetElementFromEventTarget(e.target) || this.touchHasMoved(e)) && (this.trackingClick = !1,
                    this.targetElement = null), !0;
            }, s.prototype.findControl = function(e) {
                return void 0 !== e.control ? e.control :e.htmlFor ? document.getElementById(e.htmlFor) :e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea");
            }, s.prototype.onTouchEnd = function(e) {
                var t, i, r, n, o, a = this.targetElement;
                if (!this.trackingClick) return !0;
                if (e.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0;
                if (e.timeStamp - this.trackingClickStart > this.tapTimeout) return !0;
                if (this.cancelNextClick = !1, this.lastClickTime = e.timeStamp, i = this.trackingClickStart,
                    this.trackingClick = !1, this.trackingClickStart = 0, d && (o = e.changedTouches[0],
                    (a = document.elementFromPoint(o.pageX - window.pageXOffset, o.pageY - window.pageYOffset) || a).fastClickScrollParent = this.targetElement.fastClickScrollParent),
                "label" === (r = a.tagName.toLowerCase())) {
                    if (t = this.findControl(a)) {
                        if (this.focus(a), l) return !1;
                        a = t;
                    }
                } else if (this.needsFocus(a)) return 100 < e.timeStamp - i || u && window.top !== window && "input" === r ? this.targetElement = null :(this.focus(a),
                    this.sendClick(a, e), u && "select" === r || (this.targetElement = null, e.preventDefault())),
                    !1;
                return !(!u || c || !(n = a.fastClickScrollParent) || n.fastClickLastScrollTop === n.scrollTop) || (this.needsClick(a) || (e.preventDefault(),
                    this.sendClick(a, e)), !1);
            }, s.prototype.onTouchCancel = function() {
                this.trackingClick = !1, this.targetElement = null;
            }, s.prototype.onMouse = function(e) {
                return !this.targetElement || !!e.forwardedTouchEvent || !e.cancelable || !(!this.needsClick(this.targetElement) || this.cancelNextClick) || (e.stopImmediatePropagation ? e.stopImmediatePropagation() :e.propagationStopped = !0,
                    e.stopPropagation(), e.preventDefault(), !1);
            }, s.prototype.onClick = function(e) {
                var t;
                return this.trackingClick ? (this.targetElement = null, !(this.trackingClick = !1)) :"submit" === e.target.type && 0 === e.detail || ((t = this.onMouse(e)) || (this.targetElement = null),
                    t);
            }, s.prototype.destroy = function() {
                var e = this.layer;
                l && (e.removeEventListener("mouseover", this.onMouse, !0), e.removeEventListener("mousedown", this.onMouse, !0),
                    e.removeEventListener("mouseup", this.onMouse, !0)), e.removeEventListener("click", this.onClick, !0),
                    e.removeEventListener("touchstart", this.onTouchStart, !1), e.removeEventListener("touchmove", this.onTouchMove, !1),
                    e.removeEventListener("touchend", this.onTouchEnd, !1), e.removeEventListener("touchcancel", this.onTouchCancel, !1);
            }, s.notNeeded = function(e) {
                var t, i, r;
                if (void 0 === window.ontouchstart) return !0;
                if (i = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [ , 0 ])[1]) {
                    if (!l) return !0;
                    if (t = document.querySelector("meta[name=viewport]")) {
                        if (-1 !== t.content.indexOf("user-scalable=no")) return !0;
                        if (31 < i && document.documentElement.scrollWidth <= window.outerWidth) return !0;
                    }
                }
                if (n && 10 <= (r = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/))[1] && 3 <= r[2] && (t = document.querySelector("meta[name=viewport]"))) {
                    if (-1 !== t.content.indexOf("user-scalable=no")) return !0;
                    if (document.documentElement.scrollWidth <= window.outerWidth) return !0;
                }
                return "none" === e.style.msTouchAction || "manipulation" === e.style.touchAction || !!(27 <= +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [ , 0 ])[1] && (t = document.querySelector("meta[name=viewport]")) && (-1 !== t.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) || "none" === e.style.touchAction || "manipulation" === e.style.touchAction;
            }, s.attach = function(e, t) {
                return new s(e, t);
            }, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
                return s;
            }) :void 0 !== t && t.exports ? (t.exports = s.attach, t.exports.FastClick = s) :window.FastClick = s;
        }();
    }, {} ],
    8:[ function(e, t, i) {
        var r = e("../ui/component"), n = (e("../lib/util"), e("../lib/dom")), o = e("../lib/event"), a = (e("../lib/ua"),
            e("../lang/index")), s = e("../player/base/event/eventtype"), l = r.extend({
            init:function(e, t) {
                r.call(this, e, t), this.className = t.className ? t.className :"prism-auto-stream-selector",
                    this.addClass(this.className);
            },
            createEl:function() {
                var e = r.prototype.createEl.call(this, "div");
                return e.innerHTML = "<div><p class='tip-text'></p></div><div class='operators'><a class='prism-button prism-button-ok' type='button'>" + a.get("OK_Text") + "</a><a class='prism-button prism-button-cancel'  target='_blank'>" + a.get("Cancel_Text") + "</a></div>",
                    e;
            },
            bindEvent:function() {
                var r = this;
                r._player.on(s.Private.AutoStreamShow, function(e) {
                    var t = document.querySelector("#" + r.getId() + " .tip-text");
                    if (r._player._getLowerQualityLevel) {
                        var i = r._player._getLowerQualityLevel();
                        i && (r._switchUrl = i, t.innerText = a.get("Auto_Stream_Tip_Text").replace("$$", i.item.desc),
                            n.css(r.el(), "display", "block"));
                    }
                }), r._player.on(s.Private.AutoStreamHide, function(e) {
                    document.querySelector("#" + r.getId() + " .tip-text");
                    n.css(r.el(), "display", "none");
                });
                var e = document.querySelector("#" + r.getId() + " .prism-button-ok");
                o.on(e, "click", function() {
                    r._player._changeStream && r._switchUrl && r._player._changeStream(r._switchUrl.index, a.get("Quality_Change_Text")),
                        n.css(r.el(), "display", "none");
                });
                var t = document.querySelector("#" + r.getId() + " .prism-button-cancel");
                o.on(t, "click", function() {
                    n.css(r.el(), "display", "none");
                });
            }
        });
        t.exports = l;
    }, {
        "../lang/index":17,
        "../lib/dom":24,
        "../lib/event":25,
        "../lib/ua":38,
        "../lib/util":40,
        "../player/base/event/eventtype":48,
        "../ui/component":100
    } ],
    9:[ function(e, t, i) {
        var r = e("../ui/component"), s = e("../lib/dom"), n = e("../lib/event"), o = e("../lib/ua"), a = e("../lib/function"), l = (e("../lang/index"),
            e("../lib/util")), u = e("../config"), c = e("../lib/playerutil"), d = e("../player/base/event/eventtype"), p = r.extend({
            init:function(e, t) {
                r.call(this, e, t), this.className = t.className ? t.className :"prism-liveshift-progress",
                    this.addClass(this.className), this._liveshiftService = e._liveshiftService;
            },
            createEl:function() {
                var e = r.prototype.createEl.call(this);
                return e.innerHTML = '<div class="prism-enable-liveshift"><div class="prism-progress-loaded"></div><div class="prism-progress-played"></div><div class="prism-progress-cursor"><img></img></div><p class="prism-progress-time"></p><div class="prism-liveshift-seperator">00:00:00</div></div><div class="prism-disable-liveshift"></div>',
                    e;
            },
            bindEvent:function() {
                var i = this;
                this.loadedNode = document.querySelector("#" + this.id() + " .prism-progress-loaded"),
                    this.playedNode = document.querySelector("#" + this.id() + " .prism-progress-played"),
                    this.cursorNode = document.querySelector("#" + this.id() + " .prism-progress-cursor"),
                    this.timeNode = document.querySelector("#" + this.id() + " .prism-progress-time"),
                    this.controlNode = document.querySelector("#" + this._player._options.id + " .prism-controlbar"),
                    this.seperatorNode = document.querySelector("#" + this.id() + " .prism-liveshift-seperator"),
                    this.progressNode = document.querySelector("#" + this.id() + " .prism-enable-liveshift");
                var e = document.querySelector("#" + this.id() + " .prism-progress-cursor img"), t = "//" + u.domain + "/de/prismplayer/" + u.h5Version + "/skins/default/img/dragcursor.png";
                u.domain ? -1 < u.domain.indexOf("localhost") && (t = "//" + u.domain + "/build/skins/default/img/dragcursor.png") :t = "de/prismplayer/" + u.h5Version + "/skins/default/img/dragcursor.png",
                    e.src = t, n.on(this.cursorNode, "mousedown", function(e) {
                    i._onMouseDown(e);
                }), n.on(this.cursorNode, "touchstart", function(e) {
                    i._onMouseDown(e);
                }), n.on(this.progressNode, "mousemove", function(e) {
                    i._progressMove(e);
                }), n.on(this.progressNode, "touchmove", function(e) {
                    i._progressMove(e);
                }), n.on(this._el, "click", function(e) {
                    i._onMouseClick(e);
                }), this._player.on(d.Private.HideProgress, function(e) {
                    i._hideProgress(e);
                }), this._player.on(d.Private.CancelHideProgress, function(e) {
                    i._cancelHideProgress(e);
                }), this._player.on(d.Private.ShowBar, function() {
                    i._updateLayout();
                }), n.on(this.progressNode, d.Private.MouseOver, function(e) {
                    i._onMouseOver(e);
                }), n.on(this.progressNode, d.Private.MouseOut, function(e) {
                    i._onMouseOut(e);
                }), this.bindTimeupdate = a.bind(this, this._onTimeupdate), this._player.on(d.Player.TimeUpdate, this.bindTimeupdate),
                c.isLiveShift(this._player._options) && this._player.on(d.Player.Play, function() {
                    i._liveshiftService.start(6e4, function(e) {
                        var t = {
                            mediaId:i._player._options.vid ? i._player._options.vid :"",
                            error_code:e.Code,
                            error_msg:e.Message
                        };
                        i._player.logError(t), i._player.trigger(d.Player.Error, t);
                    });
                }), this._player.on(d.Private.LiveShiftQueryCompleted, function() {
                    i._updateSeperator(), i._updateLayout();
                }), this._player.on(d.Player.Pause, function() {
                    i._liveshiftService.stop();
                }), o.IS_IPAD ? this.interval = setInterval(function() {
                    i._onProgress();
                }, 500) :this._player.on(d.Video.Progress, function() {
                    i._onProgress();
                });
            },
            _updateSeperator:function() {
                this._liveshiftService.currentTimeDisplay && (this.seperatorNode.innerText = this._liveshiftService.currentTimeDisplay);
            },
            _updateLayout:function() {
                var e = this.seperatorNode.offsetWidth, t = this.el().offsetWidth, i = t - e;
                0 != e && 0 != i && (s.css(this.progressNode, "width", 100 * (i - 10) / t + "%"),
                    s.css(this.seperatorNode, "right", -1 * (e + 10) + "px"));
            },
            _progressMove:function(e) {
                var t = this._getSeconds(e), i = this._liveshiftService.availableLiveShiftTime;
                this.timeNode.innerText = "-" + l.formatTime(i - t);
                var r = i ? t / i :0, n = 1 - this.timeNode.clientWidth / this.el().clientWidth;
                n < r && (r = n), this.timeNode && s.css(this.timeNode, "left", 100 * r + "%");
            },
            _hideProgress:function(e) {
                n.off(this.cursorNode, "mousedown"), n.off(this.cursorNode, "touchstart");
            },
            _cancelHideProgress:function(e) {
                var t = this;
                n.on(this.cursorNode, "mousedown", function(e) {
                    t._onMouseDown(e);
                }), n.on(this.cursorNode, "touchstart", function(e) {
                    t._onMouseDown(e);
                });
            },
            _canSeekable:function(e) {
                var t = !0;
                return "function" == typeof this._player.canSeekable && (t = this._player.canSeekable(e)),
                    t;
            },
            _onMouseOver:function(e) {
                this._updateCursorPosition(this._getCurrentTime());
                var t = this;
                setTimeout(function() {
                    s.css(t.cursorNode, "display", "block");
                }), s.css(this.timeNode, "display", "block");
            },
            _onMouseOut:function(e) {
                s.css(this.cursorNode, "display", "none"), s.css(this.timeNode, "display", "none");
            },
            _getSeconds:function(e) {
                for (var t = this.el().offsetLeft, i = this.el(); i = i.offsetParent; ) {
                    var r = s.getTranslateX(i);
                    t += i.offsetLeft + r;
                }
                var n = (e.touches ? e.touches[0].pageX :e.pageX) - t, o = this.progressNode.offsetWidth, a = this._liveshiftService.availableLiveShiftTime;
                return sec = a ? n / o * a :0, sec < 0 && (sec = 0), sec > a && (sec = a), sec;
            },
            _onMouseClick:function(e) {
                var t = this, i = this._getSeconds(e), r = this._liveshiftService.availableLiveShiftTime - i;
                this._player.trigger(d.Private.SeekStart, {
                    fromTime:this._getCurrentTime()
                });
                var n = this._liveshiftService.getSourceUrl(r), o = t._player._options.source, a = c.isHls(t._player._options.source);
                a && n == o ? t._player.seek(i) :t._player._loadByUrlInner(n, i, !0), t._player.trigger(d.Private.Play_Btn_Hide),
                    t._liveshiftService.seekTime = i, t._player.trigger(d.Private.EndStart, {
                    toTime:i,
                    notPlay:!0
                }), t._updateCursorPosition(i), a && setTimeout(function() {
                    t._player.play();
                });
            },
            _onMouseDown:function(e) {
                var t = this;
                e.preventDefault(), this._player.trigger(d.Private.SeekStart, {
                    fromTime:this._getCurrentTime()
                }), n.on(this.controlNode, "mousemove", function(e) {
                    t._onMouseMove(e);
                }), n.on(this.controlNode, "touchmove", function(e) {
                    t._onMouseMove(e);
                }), n.on(this._player.tag, "mouseup", function(e) {
                    t._onMouseUp(e);
                }), n.on(this._player.tag, "touchend", function(e) {
                    t._onMouseUp(e);
                }), n.on(this.controlNode, "mouseup", function(e) {
                    t._onMouseUp(e);
                }), n.on(this.controlNode, "touchend", function(e) {
                    t._onMouseUp(e);
                });
            },
            _onMouseUp:function(e) {
                e.preventDefault(), n.off(this.controlNode, "mousemove"), n.off(this.controlNode, "touchmove"),
                    n.off(this._player.tag, "mouseup"), n.off(this._player.tag, "touchend"), n.off(this.controlNode, "mouseup"),
                    n.off(this.controlNode, "touchend");
                var t = this._liveshiftService.availableLiveShiftTime, i = this.playedNode.offsetWidth / this.el().offsetWidth * t;
                this._player.seek(i), this._player.trigger(d.Private.Play_Btn_Hide), this._liveshiftService.seekTime = i,
                    this._player.trigger(d.Private.EndStart, {
                        toTime:i
                    });
            },
            _onMouseMove:function(e) {
                e.preventDefault();
                var t = this._getSeconds(e);
                this._updateProgressBar(this.playedNode, t), this._updateCursorPosition(t);
            },
            _onTimeupdate:function(e) {
                this._updateProgressBar(this.playedNode, this._getCurrentTime()), this._updateCursorPosition(this._getCurrentTime()),
                    this._player.trigger(d.Private.UpdateProgressBar, {
                        time:this._getCurrentTime()
                    });
            },
            _getCurrentTime:function() {
                var e = this._liveshiftService.seekTime;
                return -1 == e && (e = 0), this._player.getCurrentTime() + e;
            },
            _onProgress:function(e) {
                this._player.getDuration() && 1 <= this._player.getBuffered().length && this._updateProgressBar(this.loadedNode, this._player.getBuffered().end(this._player.getBuffered().length - 1));
            },
            _updateProgressBar:function(e, t) {
                if (1 != this._player._switchSourcing) {
                    var i = 0;
                    if (-1 == this._liveshiftService.seekTime) i = 1; else {
                        var r = this._liveshiftService.availableLiveShiftTime;
                        1 < (i = r ? t / r :0) && (i = 1, this._liveshiftService.seekTime = -1);
                    }
                    this.liveShiftStartDisplay;
                    e && s.css(e, "width", 100 * i + "%");
                }
            },
            _updateCursorPosition:function(e) {
                if (this._player.el() && 1 != this._player._switchSourcing && (0 != e || 0 != this._player.tag.readyState)) {
                    var t = 0;
                    if (-1 == this._liveshiftService.seekTime) t = 1; else {
                        var i = this._liveshiftService.availableLiveShiftTime;
                        1 < (t = i ? e / i :0) && (this._liveshiftService.seekTime = -1);
                    }
                    var r = 1, n = this._player.el().clientWidth;
                    0 != n && (r = 1 - 18 / n), this.cursorNode && (r < t ? (s.css(this.cursorNode, "right", "0px"),
                        s.css(this.cursorNode, "left", "auto")) :(s.css(this.cursorNode, "right", "auto"),
                        s.css(this.cursorNode, "left", 100 * t + "%")));
                }
            }
        });
        t.exports = p;
    }, {
        "../config":11,
        "../lang/index":17,
        "../lib/dom":24,
        "../lib/event":25,
        "../lib/function":26,
        "../lib/playerutil":35,
        "../lib/ua":38,
        "../lib/util":40,
        "../player/base/event/eventtype":48,
        "../ui/component":100
    } ],
    10:[ function(e, t, i) {
        var r = e("../ui/component"), o = e("../lib/util"), a = e("../player/base/event/eventtype"), n = r.extend({
            init:function(e, t) {
                r.call(this, e, t), this.className = t.className ? t.className :"prism-live-time-display",
                    this.addClass(this.className), this._liveshiftService = e._liveshiftService;
            },
            createEl:function() {
                var e = r.prototype.createEl.call(this, "div");
                return e.innerHTML = '<span class="current-time">00:00</span> <span class="time-bound">/</span> <span class="end-time">00:00</span><span class="live-text">Live: </span><span class="live-time"></span>',
                    e;
            },
            bindEvent:function() {
                var n = this;
                this._player.on(a.Video.TimeUpdate, function() {
                    var e = n._liveshiftService, t = document.querySelector("#" + n.id() + " .current-time");
                    if (e.liveShiftStartDisplay && e.availableLiveShiftTime > e.seekTime && -1 != e.seekTime) {
                        var i = n._liveshiftService.getBaseTime(), r = o.formatTime(i + n._player.getCurrentTime());
                        t.innerText = r;
                    } else e.currentTimeDisplay && (t.innerText = e.currentTimeDisplay);
                }), this._player.on(a.Private.LiveShiftQueryCompleted, function() {
                    n.updateTime();
                });
            },
            updateTime:function() {
                document.querySelector("#" + this.id() + " .end-time").innerText = this._liveshiftService.liveTimeRange.endDisplay,
                    document.querySelector("#" + this.id() + " .live-time").innerText = this._liveshiftService.currentTimeDisplay;
            }
        });
        t.exports = n;
    }, {
        "../lib/util":40,
        "../player/base/event/eventtype":48,
        "../ui/component":100
    } ],
    11:[ function(e, t, i) {
        t.exports = {
            domain:"g.alicdn.com",
            flashVersion:"2.8.1",
            h5Version:"2.8.1",
            cityBrain:!0,
            logReportTo:"https://videocloud.cn-hangzhou.log.aliyuncs.com/logstores/newplayer/track"
        };
    }, {} ],
    12:[ function(e, t, i) {
        e("./lang/index").load();
        var r = e("./player/adaptivePlayer"), n = e("./lib/componentutil"), o = e("./config"), a = function(e, t) {
            return r.create(e, t);
        };
        a.getVersion = function() {
            return o.h5Version;
        }, n.register(a);
        var s = window.Aliplayer = a;
        a.players = {}, "function" == typeof define && define.amd ? define([], function() {
            return s;
        }) :"object" == typeof i && "object" == typeof t && (t.exports = s), "undefined" != typeof Uint8Array && (Uint8Array.prototype.slice || Object.defineProperty(Uint8Array.prototype, "slice", {
            value:Array.prototype.slice
        }));
    }, {
        "./config":11,
        "./lang/index":17,
        "./lib/componentutil":20,
        "./player/adaptivePlayer":45
    } ],
    13:[ function(e, t, i) {
        var r = e("../lib/oo"), n = e("../lang/index"), o = r.extend({
            init:function(e, t) {
                this._player = e, this._options = e.options();
            }
        });
        o.prototype.handle = function(e) {
            if (this._options.autoPlayDelay) {
                var t = this._options.autoPlayDelayDisplayText;
                t || (t = n.get("AutoPlayDelayDisplayText").replace("$$", this._options.autoPlayDelay)),
                    this._player.trigger("info_show", t), this._player.trigger("h5_loading_hide"), this._player.trigger("play_btn_hide");
                var i = this;
                this._timeHandler = setTimeout(function() {
                    i._player.trigger("info_hide"), i._options.autoPlayDelay = 0, e && e();
                }, 1e3 * this._options.autoPlayDelay), this._player.on("play", function() {
                    a(i);
                }), this._player.on("pause", function() {
                    a(i);
                });
            }
        }, o.prototype.dispose = function() {
            a(this), this._player = null;
        };
        var a = function(e) {
            e._timeHandler && (clearTimeout(e._timeHandler), e._timeHandler = null);
        };
        t.exports = o;
    }, {
        "../lang/index":17,
        "../lib/oo":33
    } ],
    14:[ function(e, t, i) {
        t.exports = t.exports = {
            OD:"OD",
            FD:"360p",
            LD:"540p",
            SD:"720p",
            HD:"1080p",
            "2K":"2K",
            "4K":"4K",
            FHD:"FHD",
            XLD:"XLD",
            Speed:"Speed",
            Speed_05X_Text:"0.5X",
            Speed_1X_Text:"Normal",
            Speed_125X_Text:"1.25X",
            Speed_15X_Text:"1.5X",
            Speed_2X_Text:"2X",
            Refresh_Text:"Refresh",
            Cancel:"Cancel",
            Mute:"Mute",
            Snapshot:"Snapshot",
            Detection_Text:"Diagnosis",
            Play_DateTime:"Time",
            Quality_Change_Fail_Switch_Text:"Cannot play, switch to ",
            Quality_Change_Text:"Switch to ",
            Quality_The_Url:"The url",
            AutoPlayDelayDisplayText:"Play in $$ seconds",
            Error_Load_Abort_Text:"Data abort erro",
            Error_Network_Text:"Loading failed due to network error",
            Error_Decode_Text:"Decode error",
            Error_Server_Network_NotSupport_Text:"Network error or  the format of video is unsupported",
            Error_Offline_Text:"The network is unreachable, please click Refresh",
            Error_Play_Text:"Error occured while playing",
            Error_Retry_Text:" Please close or refresh",
            Error_AuthKey_Text:"Authentication expired or the domain is not in white list",
            Error_H5_Not_Support_Text:"The format of video is not supported by h5 player，please use flash player",
            Error_Not_Support_M3U8_Text:"The format of m3u8 is not supported by this explorer",
            Error_Not_Support_MP4_Text:"The format of mp4 is not supported by this explorer",
            Error_Not_Support_encrypt_Text:"Play the encrypted video,please set encryptType to 1",
            Error_Vod_URL_Is_Empty_Text:"The url is empty",
            Error_Vod_Fetch_Urls_Text:"Error occured when fetch urls，please close or refresh",
            Fetch_Playauth_Error:"Error occured when fetch playauth close or refresh",
            Error_Playauth_Decode_Text:"PlayAuth parse failed",
            Error_Vid_Not_Same_Text:"Cannot renew url due to vid changed",
            Error_Playauth_Expired_Text:"Playauth expired, please close or refresh",
            Error_MTS_Fetch_Urls_Text:"Error occurred while requesting mst server",
            Error_Load_M3U8_Failed_Text:"The m3u8 file loaded failed",
            Error_Load_M3U8_Timeout_Text:"Timeout error occored when the m3u8 file loaded",
            Error_M3U8_Decode_Text:"The m3u8 file decoded failed",
            Error_TX_Decode_Text:"Video decoded failed",
            Error_Waiting_Timeout_Text:"Buffering timeout, please close or refresh",
            Error_Invalidate_Source:"Video shoud be mp4、mp3、m3u8、mpd or flv",
            Error_Empty_Source:"Video URL shouldn't be empty",
            Error_Vid_Empty_Source:"vid's video URL hasn't been fetched",
            Error_Fetch_NotStream:"The vid has no stream to play",
            Error_Not_Found:"Url is not found",
            Live_End:"Live has finished",
            Play_Before_Fullscreen:"Please play before fullscreen",
            Can_Not_Seekable:"Can not seek to this position",
            Cancel_Text:"Cancel",
            OK_Text:"OK",
            Auto_Stream_Tip_Text:"Internet is slow, does switch to $$",
            Request_Block_Text:"This request is blocked, the video Url should be over https",
            Open_Html_By_File:"Html page should be on the server",
            Maybe_Cors_Error:"please make sure enable cors,<a href='https://help.aliyun.com/document_detail/62950.html?spm=a2c4g.11186623.2.21.Y3n2oi' target='_blank'>refer to document</a>",
            Speed_Switch_To:"Speed switch to ",
            Curent_Volume:"Current volume:",
            Volume_Mute:"set to mute",
            Volume_UnMute:"set to unmute",
            ShiftLiveTime_Error:"Live start time should not be greater than over time",
            Error_Not_Support_Format_On_Mobile:"flv、rmtp can't be supported on mobile，please use m3u8",
            SessionId_Ticket_Invalid:"please assign value for sessionId and ticket properties",
            Http_Error:" An HTTP network request failed with an error, but not from the server.",
            Http_Timeout:"A network request timed out",
            DRM_License_Expired:"DRM license is expired, please refresh",
            Not_Support_DRM:"Browser doesn't support DRM",
            CC_Switch_To:"Subtitle switch to ",
            AudioTrack_Switch_To:"Audio tracks switch to ",
            Subtitle:"Subtitle/CC",
            AudioTrack:"Audio Track",
            Quality:"Quality",
            Auto:"Auto",
            Quality_Switch_To:"Quality switch to ",
            Fullscreen:"Full Screen",
            Setting:"Settings",
            Volume:"Volume",
            Play:"Play",
            Pause:"Pause",
            CloseSubtitle:"Close CC",
            OpenSubtitle:"Open CC",
            ExistFullScreen:"Exit Full Screen",
            Muted:"Muted",
            Retry:"Retry",
            SwitchToLive:"Return to live",
            iOSNotSupportVodEncription:"iOS desn't suport Vod's encription video",
            UseChromeForVodEncription:"This browser desn't suport Vod's encription video, please use latest Chrome"
        };
    }, {} ],
    15:[ function(e, t, i) {
        t.exports = t.exports = {
            OD:"OD",
            LD:"360p",
            FD:"540p",
            SD:"720p",
            HD:"1080p",
            "2K":"2K",
            "4K":"4K",
            FHD:"FHD",
            XLD:"XLD",
            Forbidden_Text:"Internal information is strictly forbidden to outsider",
            Refresh:"Refresh",
            Diagnosis:"Diagnosis",
            Live_Finished:"Live has finished, thanks for watching",
            Play:"Play",
            Pause:"Pause",
            Snapshot:"Snapshot",
            Replay:"Replay",
            Live:"Live",
            Encrypt:"Encrypt",
            Sound:"Sound",
            Fullscreen:"Full Screen",
            Exist_Fullscreen:"Exit Full-screen",
            Resolution:"Resolution",
            Next:"Next Video",
            Brightness:"Brightness",
            Default:"Default",
            Contrast:"Contrast",
            Titles_Credits:"Titles and Credits",
            Skip_Titles:"Skip Titles",
            Skip_Credits:"Skip Credits",
            Not_Support_Out_Site:"The video is not supported for outside website, please watch it by TaoTV",
            Watch_Now:"Watch now",
            Network_Error:"Network is unreachable, please try to refresh",
            Video_Error:"Playing a video error, please try to refresh",
            Decode_Error:"Data decoding error",
            Live_Not_Start:"Live has not started, to be expected",
            Live_Loading:"Live information is loading, please try to refresh",
            Fetch_Playauth_Error:"Error occured when fetch playauth close or refresh",
            Live_End:"Live has finished",
            Live_Abrot:"Signal aborted, please try to refresh",
            Corss_Domain_Error:"Please ensure your domain has obtained IPC license and combined CNAME, \r\n or to set  cross-domain accessing available",
            Url_Timeout_Error:"The video url is timeout, please try to refresh",
            Connetction_Error:"Sorry，the video cannot play because of connection error, please try to watch other videos",
            Fetch_MTS_Error:"Fetching video list failed, please ensure",
            Token_Expired_Error:"Requesting open api failed, please ensure token expired or not",
            Video_Lists_Empty_Error:"The video list is empty, please check the format of video",
            Encrypted_Failed_Error:"Fetching encrypted file failed, please check the permission of player",
            Fetch_Failed_Permission_Error:"Fetching video list failed, please check the permission of player",
            Invalidate_Param_Error:"No video url, please check the parameters",
            AutoPlayDelayDisplayText:"Play in $$ seconds",
            Fetch_MTS_NOT_NotStream_Error:"The vid has no stream to play",
            Cancel_Text:"Cancel",
            OK_Text:"OK",
            Auto_Stream_Tip_Text:"Internet is slow, does switch to $$",
            Open_Html_By_File:"Html page should be on the server",
            Cant_Use_Flash_On_Mobile:"Mobile doesn't support flash player，please use h5 player"
        };
    }, {} ],
    16:[ function(e, t, i) {
        t.exports = t.exports = {
            OD:"原画",
            FD:"流畅",
            LD:"标清",
            SD:"高清",
            HD:"超清",
            "2K":"2K",
            "4K":"4K",
            FHD:"全高清",
            XLD:"极速",
            Forbidden_Text:"内部信息，严禁外传",
            Refresh:"刷新",
            Diagnosis:"诊断",
            Live_Finished:"直播已结束,谢谢观看",
            Play:"播放",
            Pause:"暂停",
            Snapshot:"截图",
            Replay:"重播",
            Live:"直播",
            Encrypt:"加密",
            Sound:"声音",
            Fullscreen:"全屏",
            Exist_Fullscreen:"退出全屏",
            Resolution:"清晰度",
            Next:"下一集",
            Brightness:"亮度",
            Default:"默认",
            Contrast:"对比度",
            Titles_Credits:"片头片尾",
            Skip_Titles:"跳过片头",
            Skip_Credits:"跳过片尾",
            Not_Support_Out_Site:"该视频暂不支持站外播放，请到淘TV观看",
            Watch_Now:"立即观看",
            Network_Error:"网络无法连接，请尝试检查网络后刷新试试",
            Video_Error:"视频播放异常，请刷新试试",
            Decode_Error:"播放数据解码错误",
            Live_Not_Start:"亲，直播还未开始哦，敬请期待",
            Live_Loading:"直播信息加载中，请刷新试试",
            Live_End:"亲，直播已结束",
            Live_Abrot:"当前直播信号中断，请刷新后重试",
            Corss_Domain_Error:"请确认您的域名已完成备案和CNAME绑定，\r\n并处于启用状态，或资源允许跨越访问",
            Url_Timeout_Error:"您所观看的视频地址连接超时，请刷新后重试",
            Connetction_Error:"抱歉,该视频由于连接错误暂时不能播放,请观看其它视频",
            Fetch_MTS_Error:"获取视频列表失败，请确认",
            Token_Expired_Error:"请求接口失败，请确认Token是否过期",
            Video_Lists_Empty_Error:"获取视频列表为空，请确认播放数据与格式",
            Encrypted_Failed_Error:"获取视频加密秘钥错误，请确认播放权限",
            Fetch_Failed_Permission_Error:"获取视频列表失败，请确认播放权限",
            Invalidate_Param_Error:"无输入视频，请确认输入参数",
            AutoPlayDelayDisplayText:"$$秒以后开始播放",
            Fetch_MTS_NOT_NotStream_Error:"此vid没有可播放视频",
            Cancel_Text:"取消",
            OK_Text:"确认",
            Auto_Stream_Tip_Text:"网络不给力，是否切换到$$",
            Fetch_Playauth_Error:"获取播放凭证出错啦，请尝试退出重试或刷新",
            Open_Html_By_File:"不能直接在浏览器打开html文件，请部署到服务端",
            Cant_Use_Flash_On_Mobile:"移动端不支持Flash播放器，请使用h5播放器"
        };
    }, {} ],
    17:[ function(o, e, t) {
        var i = o("../config"), a = o("../lib/storage"), n = (o("../lib/io"), "aliplayer_lang"), s = function() {
            if (void 0 === window[n] || !window[n]) {
                var e = (navigator.language || navigator.browserLanguage).toLowerCase();
                e = e && -1 < e.indexOf("zh") ? "zh-cn" :"en-us", window[n] = e;
            }
            return window[n];
        }, l = function(e, t) {
            var i = d(e), r = "", n = c();
            r = "flash" == e ? "en-us" == n ? o("./flash/en-us") :"zh-cn" == n ? o("./flash/zh-cn") :t[n] :"en-us" == n ? o("./en-us") :"zh-cn" == n ? o("./zh-cn") :t[n],
                a.set(i, JSON.stringify(r)), u(e, r);
        }, u = function(e, t) {
            var i = d(e);
            window[i] = t;
        }, c = function() {
            return s();
        }, d = function(e) {
            var t = c();
            return e || (e = "h5"), "aliplayer_lang_data_" + e + "_" + i.h5Version.replace(/\./g, "_") + "_" + t;
        };
        e.exports.setCurrentLanguage = function(e, t, i) {
            var r = window[n];
            if (void 0 !== e && e || (e = s()), "en-us" != e && "zh-cn" != e && (!i || i && !i[e])) throw new Error("There is not language resource for " + e + ", please specify the language resource by languageTexts property");
            window[n] = e, l(t, i), e != r && o("../lib/constants").updateByLanguage();
        }, e.exports.getCurrentLanguage = s, e.exports.getLanguageData = function(e, t) {
            var i = d(e);
            return window[i];
        }, e.exports.load = l, e.exports.get = function(e, t) {
            t || (t = "h5");
            var i = d(t), r = window[i];
            if (r) return r[e];
        };
    }, {
        "../config":11,
        "../lib/constants":21,
        "../lib/io":30,
        "../lib/storage":37,
        "./en-us":14,
        "./flash/en-us":15,
        "./flash/zh-cn":16,
        "./zh-cn":18
    } ],
    18:[ function(e, t, i) {
        t.exports = t.exports = {
            OD:"原画",
            FD:"流畅",
            LD:"标清",
            SD:"高清",
            HD:"超清",
            "2K":"2K",
            "4K":"4K",
            FHD:"全高清",
            XLD:"极速",
            Speed:"倍速",
            Speed_05X_Text:"0.5X",
            Speed_1X_Text:"正常",
            Speed_125X_Text:"1.25X",
            Speed_15X_Text:"1.5X",
            Speed_2X_Text:"2X",
            Quality_Change_Fail_Switch_Text:"不能播放，切换为",
            Quality_Change_Text:"正在为您切换到 ",
            Quality_The_Url:"此地址",
            Refresh_Text:"刷新",
            Detection_Text:"诊断",
            Cancel:"取消",
            Mute:"静音",
            Snapshot:"截图",
            Play_DateTime:"播放时间",
            AutoPlayDelayDisplayText:"$$秒以后开始播放",
            Error_Load_Abort_Text:"获取数据过程被中止",
            Error_Network_Text:"网络错误加载数据失败",
            Error_Decode_Text:"解码错误",
            Error_Server_Network_NotSupport_Text:"服务器、网络错误或格式不支持",
            Error_Offline_Text:"网络不可用，请确定",
            Error_Play_Text:"播放出错啦",
            Error_Retry_Text:"请尝试退出重试或刷新",
            Error_AuthKey_Text:"可能鉴权过期、域名不在白名单或请求被拦截",
            Error_H5_Not_Support_Text:"h5不支持此格式，请使用flash播放器",
            Error_Not_Support_M3U8_Text:"浏览器不支持m3u8视频播放",
            Error_Not_Support_MP4_Text:"浏览器不支持mp4视频播放",
            Error_Not_Support_encrypt_Text:"播放加密视频，请设置属性encryptType to 1",
            Error_Vod_URL_Is_Empty_Text:"获取播放地址为空",
            Error_Vod_Fetch_Urls_Text:"获取地址出错啦，请尝试退出重试或刷新",
            Fetch_Playauth_Error:"获取播放凭证出错啦，请尝试退出重试或刷新",
            Error_Playauth_Decode_Text:"playauth解析错误",
            Error_Vid_Not_Same_Text:"不能更新地址，vid和播放中的不一致",
            Error_Playauth_Expired_Text:"凭证已过期，请尝试退出重试或刷新",
            Error_MTS_Fetch_Urls_Text:"MTS获取取数失败",
            Error_Load_M3U8_Failed_Text:"获取m3u8文件失败",
            Error_Load_M3U8_Timeout_Text:"获取m3u8文件超时",
            Error_M3U8_Decode_Text:"获取m3u8文件解析失败",
            Error_TX_Decode_Text:"解析数据出错",
            Error_Waiting_Timeout_Text:"缓冲数据超时，请尝试退出重试或刷新",
            Error_Invalidate_Source:"播放地址格式需要为mp4、mp3、m3u8、mpd或flv",
            Error_Empty_Source:"播放地址不能为空",
            Error_Vid_Empty_Source:"vid对应的视频地址还未获取到",
            Error_Fetch_NotStream:"此vid没有可播放视频",
            Error_Not_Found:"播放地址不存在",
            Live_End:"亲，直播已结束",
            Play_Before_Fullscreen:"播放后再全屏",
            Can_Not_Seekable:"不能seek到这里",
            Cancel_Text:"取消",
            OK_Text:"确认",
            Auto_Stream_Tip_Text:"网络不给力，是否切换到$$",
            Request_Block_Text:"浏览器安全策略视频地址不能为http协议，与网站https协议不一致",
            Open_Html_By_File:"不能直接在浏览器打开html文件，请部署到服务端",
            Maybe_Cors_Error:"请确认是否开启了允许跨域访问<a href='https://help.aliyun.com/document_detail/62950.html?spm=a2c4g.11186623.2.21.Y3n2oi' target='_blank'>参考文档</a>",
            Speed_Switch_To:"倍速切换到 ",
            Curent_Volume:"当前音量：",
            Volume_Mute:"设置为静音",
            Volume_UnMute:"设置为非静音",
            ShiftLiveTime_Error:"直播开始时间不能大于直播结束时间",
            Error_Not_Support_Format_On_Mobile:"移动端不支持flv、rmtp视频，请使用m3u8",
            SessionId_Ticket_Invalid:"DRM视频播放，sessionId和ticket属性不能为空",
            Http_Error:"Http网络请求失败",
            Http_Timeout:"http请求超时",
            DRM_License_Expired:"DRM license超时，请刷新",
            Not_Support_DRM:"浏览器不支持DRM视频的播放",
            CC_Switch_To:"字幕切换到 ",
            AudioTrack_Switch_To:"音轨切换到 ",
            Subtitle:"字幕",
            AudioTrack:"音轨",
            Quality:"清晰度",
            Auto:"自动",
            Quality_Switch_To:"清晰度切换到 ",
            Fullscreen:"全屏",
            Setting:"设置",
            Volume:"音量",
            Play:"播放",
            Pause:"暂停",
            CloseSubtitle:"关闭字幕",
            OpenSubtitle:"打开字幕",
            ExistFullScreen:"退出全屏",
            Muted:"静音",
            Retry:"重试",
            SwitchToLive:"返回直播",
            iOSNotSupportVodEncription:"iOS不支持点播加密播放",
            UseChromeForVodEncription:"浏览器不支持点播加密播放，请使用最新Chrome浏览器"
        };
    }, {} ],
    19:[ function(e, t, i) {
        var o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        if (window.Uint8Array) for (var d = new Uint8Array(256), r = 0; r < o.length; r++) d[o.charCodeAt(r)] = r;
        var u = function(e) {
            for (var t = "", i = 0; i < e.length; i += 16e3) {
                var r = e.subarray(i, i + 16e3);
                t += String.fromCharCode.apply(null, r);
            }
            return t;
        };
        unpackPlayReady = function(e) {
            var t = function(e, t, i) {
                if (!e) return "";
                var r;
                if (i || e.byteLength % 2 == 0 || console.log("Data has an incorrect length, must be even."),
                e instanceof ArrayBuffer) r = e; else {
                    var n = new Uint8Array(e.byteLength);
                    n.set(new Uint8Array(e)), r = n.buffer;
                }
                for (var o = Math.floor(e.byteLength / 2), a = new Uint16Array(o), s = new DataView(r), l = 0; l < o; l++) a[l] = s.getUint16(2 * l, t);
                return u(a);
            }(e, !0, !0);
            if (-1 != t.indexOf("PlayReadyKeyMessage")) {
                for (var i = new DOMParser().parseFromString(t, "application/xml"), r = i.getElementsByTagName("HttpHeader"), n = {}, o = 0; o < r.length; ++o) {
                    var a = r[o].querySelector("name"), s = r[o].querySelector("value");
                    n[a.textContent] = s.textContent;
                }
                return {
                    header:n,
                    changange:i.querySelector("Challenge").textContent
                };
            }
            console.log("PlayReady request is already unwrapped.");
        }, t.exports = {
            decode:function(e) {
                var t, i, r, n, o, a = .75 * e.length, s = e.length, l = 0;
                "=" === e[e.length - 1] && (a--, "=" === e[e.length - 2] && a--);
                var u = new ArrayBuffer(a), c = new Uint8Array(u);
                for (t = 0; t < s; t += 4) i = d[e.charCodeAt(t)], r = d[e.charCodeAt(t + 1)], n = d[e.charCodeAt(t + 2)],
                    o = d[e.charCodeAt(t + 3)], c[l++] = i << 2 | r >> 4, c[l++] = (15 & r) << 4 | n >> 2,
                    c[l++] = (3 & n) << 6 | 63 & o;
                return u;
            },
            encode:function(e) {
                var t, i = new Uint8Array(e), r = i.length, n = "";
                for (t = 0; t < r; t += 3) n += o[i[t] >> 2], n += o[(3 & i[t]) << 4 | i[t + 1] >> 4],
                    n += o[(15 & i[t + 1]) << 2 | i[t + 2] >> 6], n += o[63 & i[t + 2]];
                return r % 3 == 2 ? n = n.substring(0, n.length - 1) + "=" :r % 3 == 1 && (n = n.substring(0, n.length - 2) + "=="),
                    n;
            },
            unpackPlayReady:unpackPlayReady
        };
    }, {} ],
    20:[ function(e, t, i) {
        var r = e("./oo"), n = e("../player/base/event/eventtype");
        t.exports.stopPropagation = function(e) {
            window.event ? window.event.cancelBubble = !0 :e.stopPropagation();
        }, t.exports.register = function(e) {
            e.util = {
                stopPropagation:t.exports.stopPropagation
            }, e.Component = r.extend, e.EventType = n.Player;
        };
    }, {
        "../player/base/event/eventtype":48,
        "./oo":33
    } ],
    21:[ function(e, t, i) {
        var r = e("../lang/index");
        t.exports.LOAD_START = "loadstart", t.exports.LOADED_METADATA = "loadedmetadata",
            t.exports.LOADED_DATA = "loadeddata", t.exports.PROGRESS = "progress", t.exports.CAN_PLAY = "canplay",
            t.exports.CAN_PLYA_THROUGH = "canplaythrough", t.exports.PLAY = "play", t.exports.PAUSE = "pause",
            t.exports.ENDED = "ended", t.exports.PLAYING = "playing", t.exports.WAITING = "waiting",
            t.exports.ERROR = "error", t.exports.SUSPEND = "suspend", t.exports.STALLED = "stalled",
            t.exports.AuthKeyExpiredEvent = "authkeyexpired", t.exports.DRMKeySystem = {
            4:"com.microsoft.playready",
            5:"com.widevine.alpha"
        }, t.exports.EncryptionType = {
            Private:1,
            Standard:2,
            ChinaDRM:3,
            PlayReady:4,
            Widevine:5
        }, t.exports.VodEncryptionType = {
            AliyunVoDEncryption:1,
            HLSEncryption:2
        }, t.exports.DRMType = {
            Widevine:"Widevine",
            PlayReady:"PlayReady"
        }, t.exports.ErrorCode = {
            InvalidParameter:4001,
            AuthKeyExpired:4002,
            InvalidSourceURL:4003,
            NotFoundSourceURL:4004,
            StartLoadData:4005,
            LoadedMetadata:4006,
            PlayingError:4007,
            LoadingTimeout:4008,
            RequestDataError:4009,
            EncrptyVideoNotSupport:4010,
            FormatNotSupport:4011,
            PlayauthDecode:4012,
            PlayDataDecode:4013,
            NetworkUnavaiable:4014,
            UserAbort:4015,
            NetworkError:4016,
            URLsIsEmpty:4017,
            CrossDomain:4027,
            OtherError:4400,
            ServerAPIError:4500
        }, t.exports.AuthKeyExpired = 7200, t.exports.AuthKeyRefreshExpired = 7e3, t.exports.AuthInfoExpired = 100,
            t.exports.VideoErrorCode = {
                1:4015,
                2:4016,
                3:4013,
                4:4400
            }, t.exports.IconType = {
            FontClass:"fontclass",
            Symbol:"symbol",
            Sprite:"Sprite"
        }, t.exports.SelectedStreamLevel = "selectedStreamLevel", t.exports.SelectedCC = "selectedCC",
            t.exports.WidthMapToLevel = {
                0:"OD",
                640:"FD",
                960:"LD",
                1280:"SD",
                1920:"HD",
                2580:"2K",
                3840:"4K"
            };
        var n = function() {
            t.exports.VideoErrorCodeText = {
                1:r.get("Error_Load_Abort_Text"),
                2:r.get("Error_Network_Text"),
                3:r.get("Error_Decode_Text"),
                4:r.get("Error_Server_Network_NotSupport_Text")
            }, t.exports.VideoLevels = {
                0:r.get("OD"),
                640:r.get("FD"),
                960:r.get("LD"),
                1280:r.get("SD"),
                1920:r.get("HD"),
                2580:r.get("2K"),
                3840:r.get("4K")
            }, t.exports.QualityLevels = {
                OD:r.get("OD"),
                LD:r.get("LD"),
                FD:r.get("FD"),
                SD:r.get("SD"),
                HD:r.get("HD"),
                "2K":r.get("2K"),
                "4K":r.get("4K"),
                XLD:r.get("XLD"),
                FHD:r.get("FHD")
            }, t.exports.SpeedLevels = [ {
                key:.5,
                text:r.get("Speed_05X_Text")
            }, {
                key:1,
                text:r.get("Speed_1X_Text")
            }, {
                key:1.25,
                text:r.get("Speed_125X_Text")
            }, {
                key:1.5,
                text:r.get("Speed_15X_Text")
            }, {
                key:2,
                text:r.get("Speed_2X_Text")
            } ];
        };
        n(), t.exports.updateByLanguage = n;
    }, {
        "../lang/index":17
    } ],
    22:[ function(e, t, i) {
        t.exports.get = function(e) {
            for (var t = e + "", i = document.cookie.split(";"), r = 0; r < i.length; r++) {
                var n = i[r].trim();
                if (0 == n.indexOf(t)) return unescape(n.substring(t.length + 1, n.length));
            }
            return "";
        }, t.exports.set = function(e, t, i) {
            var r = new Date();
            r.setTime(r.getTime() + 24 * i * 60 * 60 * 1e3);
            var n = "expires=" + r.toGMTString();
            document.cookie = e + "=" + escape(t) + "; " + n;
        };
    }, {} ],
    23:[ function(e, i, t) {
        var r = e("./object");
        i.exports.cache = {}, i.exports.guid = function(e, t) {
            var i, r, n = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), o = [];
            if (t = t || n.length, e) for (i = 0; i < e; i++) o[i] = n[0 | Math.random() * t]; else for (o[8] = o[13] = o[18] = o[23] = "-",
                                                                                                             o[14] = "4", i = 0; i < 36; i++) o[i] || (r = 0 | 16 * Math.random(), o[i] = n[19 == i ? 3 & r | 8 :r]);
            return o.join("");
        }, i.exports.expando = "vdata" + new Date().getTime(), i.exports.getData = function(e) {
            var t = e[i.exports.expando];
            return t || (t = e[i.exports.expando] = i.exports.guid(), i.exports.cache[t] = {}),
                i.exports.cache[t];
        }, i.exports.hasData = function(e) {
            var t = "";
            return e && (t = e[i.exports.expando]), !(!t || r.isEmpty(i.exports.cache[t]));
        }, i.exports.removeData = function(t) {
            var e = "";
            if (t && (e = t[i.exports.expando]), e) {
                delete i.exports.cache[e];
                try {
                    delete t[i.exports.expando];
                } catch (e) {
                    t.removeAttribute ? t.removeAttribute(i.exports.expando) :t[i.exports.expando] = null;
                }
            }
        };
    }, {
        "./object":32
    } ],
    24:[ function(e, n, t) {
        var r = e("./object");
        n.exports.el = function(e) {
            return document.getElementById(e);
        }, n.exports.createEl = function(e, t) {
            var i;
            return e = e || "div", t = t || {}, i = document.createElement(e), r.each(t, function(e, t) {
                -1 !== e.indexOf("aria-") || "role" == e ? i.setAttribute(e, t) :i[e] = t;
            }), i;
        }, n.exports.addClass = function(e, t) {
            -1 == (" " + e.className + " ").indexOf(" " + t + " ") && (e.className = "" === e.className ? t :e.className + " " + t);
        }, n.exports.removeClass = function(e, t) {
            var i, r;
            if (-1 != e.className.indexOf(t)) {
                for (r = (i = e.className.split(" ")).length - 1; 0 <= r; r--) i[r] === t && i.splice(r, 1);
                e.className = i.join(" ");
            }
        }, n.exports.hasClass = function(e, t) {
            return -1 != e.className.indexOf(t);
        }, n.exports.getClasses = function(e) {
            return e.className ? e.className.split(" ") :[];
        }, n.exports.getElementAttributes = function(e) {
            var t, i, r, n, o;
            if (t = {}, i = ",autoplay,controls,loop,muted,default,", e && e.attributes && 0 < e.attributes.length) for (var a = (r = e.attributes).length - 1; 0 <= a; a--) n = r[a].name,
                o = r[a].value, "boolean" != typeof e[n] && -1 === i.indexOf("," + n + ",") || (o = null !== o),
                t[n] = o;
            return t;
        }, n.exports.insertFirst = function(e, t) {
            t.firstChild ? t.insertBefore(e, t.firstChild) :t.appendChild(e);
        }, n.exports.blockTextSelection = function() {
            document.body.focus(), document.onselectstart = function() {
                return !1;
            };
        }, n.exports.unblockTextSelection = function() {
            document.onselectstart = function() {
                return !0;
            };
        }, n.exports.css = function(i, e, t) {
            return !(!i || !i.style) && (e && t ? (i.style[e] = t, !0) :t || "string" != typeof e ? !t && "object" == typeof e && (r.each(e, function(e, t) {
                i.style[e] = t;
            }), !0) :i.style[e]);
        }, n.exports.getTransformName = function(e) {
            var t, i, r = [ "transform", "WebkitTransform", "MozTransform", "msTransform", "OTransform" ], n = r[0];
            for (t = 0, i = r.length; t < i; t++) if (void 0 !== e.style[r[t]]) {
                n = r[t];
                break;
            }
            return n;
        }, n.exports.getTransformEventName = function(e, t) {
            var i, r, n = [ "", "Webkit", "Moz", "ms", "O" ], o = t.toLowerCase(), a = [ "transform", "WebkitTransform", "MozTransform", "msTransform", "OTransform" ];
            for (i = 0, r = a.length; i < r; i++) if (void 0 !== e.style[a[i]]) {
                0 != i && (o = n[i] + t);
                break;
            }
            return o;
        }, n.exports.addCssByStyle = function(e) {
            var t = document, i = t.createElement("style");
            if (i.setAttribute("type", "text/css"), i.styleSheet) i.styleSheet.cssText = e; else {
                var r = t.createTextNode(e);
                i.appendChild(r);
            }
            var n = t.getElementsByTagName("head");
            n.length ? n[0].appendChild(i) :t.documentElement.appendChild(i);
        }, n.exports.getTranslateX = function(e) {
            var t = 0;
            if (e) try {
                var i = window.getComputedStyle(e), r = n.exports.getTransformName(e);
                t = new WebKitCSSMatrix(i[r]).m41;
            } catch (e) {
                console.log(e);
            }
            return t;
        };
    }, {
        "./object":32
    } ],
    25:[ function(e, l, t) {
        var u = e("./object"), c = e("./data"), i = e("./ua"), r = e("fastclick");
        function d(t, i, e, r) {
            u.each(e, function(e) {
                t(i, e, r);
            });
        }
        l.exports.on = function(o, e, t) {
            if (o) {
                if (u.isArray(e)) return d(l.exports.on, o, e, t);
                i.IS_MOBILE && "click" == e && r(o);
                var a = c.getData(o);
                a.handlers || (a.handlers = {}), a.handlers[e] || (a.handlers[e] = []), t.guid || (t.guid = c.guid()),
                    a.handlers[e].push(t), a.dispatcher || (a.disabled = !1, a.dispatcher = function(e) {
                    if (!a.disabled) {
                        e = l.exports.fixEvent(e);
                        var t = a.handlers[e.type];
                        if (t) for (var i = t.slice(0), r = 0, n = i.length; r < n && !e.isImmediatePropagationStopped(); r++) i[r].call(o, e);
                    }
                }), 1 == a.handlers[e].length && (o.addEventListener ? o.addEventListener(e, a.dispatcher, !1) :o.attachEvent && o.attachEvent("on" + e, a.dispatcher));
            }
        }, l.exports.off = function(t, e, i) {
            if (t && c.hasData(t)) {
                var r = c.getData(t);
                if (r.handlers) {
                    if (u.isArray(e)) return d(l.exports.off, t, e, i);
                    var n = function(e) {
                        r.handlers[e] = [], l.exports.cleanUpEvents(t, e);
                    };
                    if (e) {
                        var o = r.handlers[e];
                        if (o) if (i) {
                            if (i.guid) for (var a = 0; a < o.length; a++) o[a].guid === i.guid && o.splice(a--, 1);
                            l.exports.cleanUpEvents(t, e);
                        } else n(e);
                    } else for (var s in r.handlers) n(s);
                }
            }
        }, l.exports.cleanUpEvents = function(e, t) {
            var i = c.getData(e);
            0 === i.handlers[t].length && (delete i.handlers[t], e.removeEventListener ? e.removeEventListener(t, i.dispatcher, !1) :e.detachEvent && e.detachEvent("on" + t, i.dispatcher)),
            u.isEmpty(i.handlers) && (delete i.handlers, delete i.dispatcher, delete i.disabled),
            u.isEmpty(i) && c.removeData(e);
        }, l.exports.fixEvent = function(e) {
            function t() {
                return !0;
            }
            function i() {
                return !1;
            }
            if (!e || !e.isPropagationStopped) {
                var r = e || window.event;
                for (var n in e = {}, r) "layerX" !== n && "layerY" !== n && "keyboardEvent.keyLocation" !== n && ("returnValue" == n && r.preventDefault || (e[n] = r[n]));
                if (e.target || (e.target = e.srcElement || document), e.relatedTarget = e.fromElement === e.target ? e.toElement :e.fromElement,
                    e.preventDefault = function() {
                        r.preventDefault && r.preventDefault(), e.returnValue = !1, e.isDefaultPrevented = t,
                            e.defaultPrevented = !0;
                    }, e.isDefaultPrevented = i, e.defaultPrevented = !1, e.stopPropagation = function() {
                    r.stopPropagation && r.stopPropagation(), e.cancelBubble = !0, e.isPropagationStopped = t;
                }, e.isPropagationStopped = i, e.stopImmediatePropagation = function() {
                    r.stopImmediatePropagation && r.stopImmediatePropagation(), e.isImmediatePropagationStopped = t,
                        e.stopPropagation();
                }, e.isImmediatePropagationStopped = i, null != e.clientX) {
                    var o = document.documentElement, a = document.body;
                    e.pageX = e.clientX + (o && o.scrollLeft || a && a.scrollLeft || 0) - (o && o.clientLeft || a && a.clientLeft || 0),
                        e.pageY = e.clientY + (o && o.scrollTop || a && a.scrollTop || 0) - (o && o.clientTop || a && a.clientTop || 0);
                }
                e.which = e.charCode || e.keyCode, null != e.button && (e.button = 1 & e.button ? 0 :4 & e.button ? 1 :2 & e.button ? 2 :0);
            }
            return e;
        }, l.exports.trigger = function(e, t) {
            if (e) {
                var i = c.hasData(e) ? c.getData(e) :{}, r = e.parentNode || e.ownerDocument;
                if ("string" == typeof t) {
                    var n = null;
                    (e.paramData || 0 == e.paramData) && (n = e.paramData, e.paramData = null, e.removeAttribute(n)),
                        t = {
                            type:t,
                            target:e,
                            paramData:n
                        };
                }
                if (t = l.exports.fixEvent(t), i.dispatcher && i.dispatcher.call(e, t), r && !t.isPropagationStopped() && !1 !== t.bubbles) l.exports.trigger(r, t); else if (!r && !t.defaultPrevented) {
                    var o = c.getData(t.target);
                    t.target[t.type] && (o.disabled = !0, "function" == typeof t.target[t.type] && t.target[t.type](),
                        o.disabled = !1);
                }
                return !t.defaultPrevented;
            }
        }, l.exports.one = function(e, t, i) {
            if (e) {
                if (u.isArray(t)) return d(l.exports.one, e, t, i);
                var r = function() {
                    l.exports.off(e, t, r), i.apply(this, arguments);
                };
                r.guid = i.guid = i.guid || c.guid(), l.exports.on(e, t, r);
            }
        };
    }, {
        "./data":23,
        "./object":32,
        "./ua":38,
        fastclick:7
    } ],
    26:[ function(e, t, i) {
        var n = e("./data");
        t.exports.bind = function(e, t, i) {
            t.guid || (t.guid = n.guid());
            var r = function() {
                return t.apply(e, arguments);
            };
            return r.guid = i ? i + "_" + t.guid :t.guid, r;
        };
    }, {
        "./data":23
    } ],
    27:[ function(e, t, i) {
        var r = /^((?:[a-zA-Z0-9+\-.]+:)?)(\/\/[^\/\;?#]*)?(.*?)??(;.*?)?(\?.*?)?(#.*?)?$/, c = /^([^\/;?#]*)(.*)$/, n = /(?:\/|^)\.(?=\/)/g, o = /(?:\/|^)\.\.\/(?!\.\.\/).*?(?=\/)/g, d = {
            buildAbsoluteURL:function(e, t, i) {
                if (i = i || {}, e = e.trim(), !(t = t.trim())) {
                    if (!i.alwaysNormalize) return e;
                    var r = d.parseURL(e);
                    if (!r) throw new Error("Error trying to parse base URL.");
                    return r.path = d.normalizePath(r.path), d.buildURLFromParts(r);
                }
                var n = d.parseURL(t);
                if (!n) throw new Error("Error trying to parse relative URL.");
                if (n.scheme) return i.alwaysNormalize ? (n.path = d.normalizePath(n.path), d.buildURLFromParts(n)) :t;
                var o = d.parseURL(e);
                if (!o) throw new Error("Error trying to parse base URL.");
                if (!o.netLoc && o.path && "/" !== o.path[0]) {
                    var a = c.exec(o.path);
                    o.netLoc = a[1], o.path = a[2];
                }
                o.netLoc && !o.path && (o.path = "/");
                var s = {
                    scheme:o.scheme,
                    netLoc:n.netLoc,
                    path:null,
                    params:n.params,
                    query:n.query,
                    fragment:n.fragment
                };
                if (!n.netLoc && (s.netLoc = o.netLoc, "/" !== n.path[0])) if (n.path) {
                    var l = o.path, u = l.substring(0, l.lastIndexOf("/") + 1) + n.path;
                    s.path = d.normalizePath(u);
                } else s.path = o.path, n.params || (s.params = o.params, n.query || (s.query = o.query));
                return null === s.path && (s.path = i.alwaysNormalize ? d.normalizePath(n.path) :n.path),
                    d.buildURLFromParts(s);
            },
            parseURL:function(e) {
                var t = r.exec(e);
                return t ? {
                    scheme:t[1] || "",
                    netLoc:t[2] || "",
                    path:t[3] || "",
                    params:t[4] || "",
                    query:t[5] || "",
                    fragment:t[6] || ""
                } :null;
            },
            normalizePath:function(e) {
                for (e = e.split("").reverse().join("").replace(n, ""); e.length !== (e = e.replace(o, "")).length; ) ;
                return e.split("").reverse().join("");
            },
            buildURLFromParts:function(e) {
                return e.scheme + e.netLoc + e.path + e.params + e.query + e.fragment;
            }
        };
        t.exports = d;
    }, {} ],
    28:[ function(e, t, i) {
        var r = /^(\d+)x(\d+)$/, n = /\s*(.+?)\s*=((?:\".*?\")|.*?)(?:,|$)/g, o = function(e) {
            for (var t in "string" == typeof e && (e = this.parseAttrList(e)), e) e.hasOwnProperty(t) && (this[t] = e[t]);
        };
        o.prototype = {
            decimalInteger:function(e) {
                var t = parseInt(this[e], 10);
                return t > Number.MAX_SAFE_INTEGER ? 1 / 0 :t;
            },
            hexadecimalInteger:function(e) {
                if (this[e]) {
                    var t = (this[e] || "0x").slice(2);
                    t = (1 & t.length ? "0" :"") + t;
                    for (var i = new Uint8Array(t.length / 2), r = 0; r < t.length / 2; r++) i[r] = parseInt(t.slice(2 * r, 2 * r + 2), 16);
                    return i;
                }
                return null;
            },
            hexadecimalIntegerAsNumber:function(e) {
                var t = parseInt(this[e], 16);
                return t > Number.MAX_SAFE_INTEGER ? 1 / 0 :t;
            },
            decimalFloatingPoint:function(e) {
                return parseFloat(this[e]);
            },
            enumeratedString:function(e) {
                return this[e];
            },
            decimalResolution:function(e) {
                var t = r.exec(this[e]);
                if (null !== t) return {
                    width:parseInt(t[1], 10),
                    height:parseInt(t[2], 10)
                };
            },
            parseAttrList:function(e) {
                var t, i = {};
                for (n.lastIndex = 0; null !== (t = n.exec(e)); ) {
                    var r = t[2];
                    0 === r.indexOf('"') && r.lastIndexOf('"') === r.length - 1 && (r = r.slice(1, -1)),
                        i[t[1]] = r;
                }
                return i;
            }
        }, t.exports = o;
    }, {} ],
    29:[ function(e, t, i) {
        var w = e("./attrlist"), r = e("../io"), n = e("./URLToolkit"), c = /#EXT-X-STREAM-INF:([^\n\r]*)[\r\n]+([^\r\n]+)/g, u = /#EXT-X-MEDIA:(.*)/g, P = new RegExp([ /#EXTINF:(\d*(?:\.\d+)?)(?:,(.*)\s+)?/.source, /|(?!#)(\S+)/.source, /|#EXT-X-BYTERANGE:*(.+)/.source, /|#EXT-X-PROGRAM-DATE-TIME:(.+)/.source, /|#.*/.source ].join(""), "g"), C = /(?:(?:#(EXTM3U))|(?:#EXT-X-(PLAYLIST-TYPE):(.+))|(?:#EXT-X-(MEDIA-SEQUENCE): *(\d+))|(?:#EXT-X-(TARGETDURATION): *(\d+))|(?:#EXT-X-(KEY):(.+))|(?:#EXT-X-(START):(.+))|(?:#EXT-X-(ENDLIST))|(?:#EXT-X-(DISCONTINUITY-SEQ)UENCE:(\d+))|(?:#EXT-X-(DIS)CONTINUITY))|(?:#EXT-X-(VERSION):(\d+))|(?:#EXT-X-(MAP):(.+))|(?:(#)(.*):(.*))|(?:(#)(.*))(?:.*)\r?\n?/, k = function() {
            this.method = null, this.key = null, this.iv = null, this._uri = null;
        }, I = function() {
            this._url = null, this._byteRange = null, this._decryptdata = null, this.tagList = [];
        };
        I.prototype.getUrl = function() {
            return !this._url && this.relurl && (this._url = n.buildAbsoluteURL(this.baseurl, this.relurl, {
                alwaysNormalize:!0
            })), this._url;
        }, I.prototype.Seturl = function(e) {
            this._url = e;
        }, I.prototype.getProgramDateTime = function() {
            return !this._programDateTime && this.rawProgramDateTime && (this._programDateTime = new Date(Date.parse(this.rawProgramDateTime))),
                this._programDateTime;
        }, I.prototype.GetbyteRange = function() {
            if (!this._byteRange) {
                var e = this._byteRange = [];
                if (this.rawByteRange) {
                    var t = this.rawByteRange.split("@", 2);
                    if (1 === t.length) {
                        var i = this.lastByteRangeEndOffset;
                        e[0] = i || 0;
                    } else e[0] = parseInt(t[1]);
                    e[1] = parseInt(t[0]) + e[0];
                }
            }
            return this._byteRange;
        }, I.prototype.getByteRangeStartOffset = function() {
            return this.byteRange[0];
        }, I.prototype.getByteRangeEndOffset = function() {
            return this.byteRange[1];
        };
        I.prototype.getDecryptdata = function() {
            return this._decryptdata || (this._decryptdata = this.fragmentDecryptdataFromLevelkey(this.levelkey, this.sn)),
                this._decryptdata;
        };
        var o = function() {
            this.loaders = {};
        };
        o.prototype = {
            parseMasterPlaylist:function(e, t) {
                var i, r = [];
                for (c.lastIndex = 0; null != (i = c.exec(e)); ) {
                    var n = {}, o = n.attrs = new w(i[1]);
                    n.url = this.resolve(i[2], t);
                    var a = o.decimalResolution("RESOLUTION");
                    a && (n.width = a.width, n.height = a.height), n.bitrate = o.decimalInteger("AVERAGE-BANDWIDTH") || o.decimalInteger("BANDWIDTH"),
                        n.name = o.NAME;
                    var s = o.CODECS;
                    if (s) {
                        s = s.split(/[ ,]+/);
                        for (var l = 0; l < s.length; l++) {
                            var u = s[l];
                            -1 !== u.indexOf("avc1") ? n.videoCodec = this.avc1toavcoti(u) :-1 !== u.indexOf("hvc1") ? n.videoCodec = u :n.audioCodec = u;
                        }
                    }
                    r.push(n);
                }
                return r;
            },
            parseMasterPlaylistMedia:function(e, t, i, r) {
                var n, o = [], a = 0;
                for (u.lastIndex = 0; null != (n = u.exec(e)); ) {
                    var s = {}, l = new w(n[1]);
                    l.TYPE === i && (s.groupId = l["GROUP-ID"], s.name = l.NAME, s.type = i, s["default"] = "YES" === l.DEFAULT,
                        s.autoselect = "YES" === l.AUTOSELECT, s.forced = "YES" === l.FORCED, l.URI && (s.url = this.resolve(l.URI, t)),
                        s.lang = l.LANGUAGE, s.name || (s.name = s.lang), r && (s.audioCodec = r), s.id = a++,
                        o.push(s));
                }
                return o;
            },
            avc1toavcoti:function(e) {
                var t, i = e.split(".");
                return 2 < i.length ? (t = i.shift() + ".", t += parseInt(i.shift()).toString(16),
                    t += ("000" + parseInt(i.shift()).toString(16)).substr(-4)) :t = e, t;
            },
            parseLevelPlaylist:function(e, t, i, r) {
                var n, o, a = 0, s = 0, l = {
                    type:null,
                    version:null,
                    url:t,
                    fragments:[],
                    live:!0,
                    startSN:0
                }, u = new k(), c = 0, d = null, p = new I();
                for (P.lastIndex = 0; null !== (n = P.exec(e)); ) {
                    var h = n[1];
                    if (h) {
                        p.duration = parseFloat(h);
                        var f = (" " + n[2]).slice(1);
                        p.title = f || null, p.tagList.push(f ? [ "INF", h, f ] :[ "INF", h ]);
                    } else if (n[3]) {
                        if (!isNaN(p.duration)) {
                            var y = a++;
                            p.type = r, p.start = s, p.levelkey = u, p.sn = y, p.level = i, p.cc = c, p.baseurl = t,
                                p.relurl = (" " + n[3]).slice(1), l.fragments.push(p), s += (d = p).duration, p = new I();
                        }
                    } else if (n[4]) {
                        if (p.rawByteRange = (" " + n[4]).slice(1), d) {
                            var v = d.byteRangeEndOffset;
                            v && (p.lastByteRangeEndOffset = v);
                        }
                    } else if (n[5]) p.rawProgramDateTime = (" " + n[5]).slice(1), p.tagList.push([ "PROGRAM-DATE-TIME", p.rawProgramDateTime ]),
                    void 0 === l.programDateTime && (l.programDateTime = new Date(new Date(Date.parse(n[5])) - 1e3 * s)); else {
                        for (n = n[0].match(C), o = 1; o < n.length && void 0 === n[o]; o++) ;
                        var g = (" " + n[o + 1]).slice(1), _ = (" " + n[o + 2]).slice(1);
                        switch (n[o]) {
                            case "#":
                                p.tagList.push(_ ? [ g, _ ] :[ g ]);
                                break;

                            case "PLAYLIST-TYPE":
                                l.type = g.toUpperCase();
                                break;

                            case "MEDIA-SEQUENCE":
                                a = l.startSN = parseInt(g);
                                break;

                            case "TARGETDURATION":
                                l.targetduration = parseFloat(g);
                                break;

                            case "VERSION":
                                l.version = parseInt(g);
                                break;

                            case "EXTM3U":
                                break;

                            case "ENDLIST":
                                l.live = !1;
                                break;

                            case "DIS":
                                c++, p.tagList.push([ "DIS" ]);
                                break;

                            case "DISCONTINUITY-SEQ":
                                c = parseInt(g);
                                break;

                            case "KEY":
                                var m = new w(g), S = m.enumeratedString("METHOD"), b = m.URI, T = m.hexadecimalInteger("IV");
                                S && (u = new k(), b && 0 <= [ "AES-128", "SAMPLE-AES" ].indexOf(S) && (u.method = S,
                                    u.baseuri = t, u.reluri = b, u.key = null, u.iv = T));
                                break;

                            case "START":
                                var x = new w(g).decimalFloatingPoint("TIME-OFFSET");
                                isNaN(x) || (l.startTimeOffset = x);
                                break;

                            case "MAP":
                                var E = new w(g);
                                p.relurl = E.URI, p.rawByteRange = E.BYTERANGE, p.baseurl = t, p.level = i, p.type = r,
                                    p.sn = "initSegment", l.initSegment = p, p = new I();
                                break;

                            default:
                                console.log("line parsed but not handled: result");
                        }
                    }
                }
                return (p = d) && !p.relurl && (l.fragments.pop(), s -= p.duration), l.totalduration = s,
                    l.averagetargetduration = s / l.fragments.length, l.endSN = a - 1, l;
            },
            load:function(o, a) {
                var s = this;
                r.get(o, function(e) {
                    var t = s.parseMasterPlaylist(e, o);
                    if (t.length) {
                        var i = s.parseMasterPlaylistMedia(e, o, "AUDIO", t[0].audioCodec), r = s.parseMasterPlaylistMedia(e, o, "SUBTITLES");
                        if (i.length) {
                            var n = !1;
                            i.forEach(function(e) {
                                e.url || (n = !0);
                            }), !1 === n && t[0].audioCodec && !t[0].attrs.AUDIO && (console.log("audio codec signaled in quality level, but no embedded audio track signaled, create one"),
                                i.unshift({
                                    type:"main",
                                    name:"main"
                                }));
                        }
                    }
                    a({
                        levels:t,
                        audioTracks:i,
                        subtitles:r,
                        url:o
                    });
                }, function(e) {
                    console.log(e);
                });
            },
            resolve:function(e, t) {
                return n.buildAbsoluteURL(t, e, {
                    alwaysNormalize:!0
                });
            },
            parseMasterPlaylist:function(e, t) {
                var i, r = [];
                for (c.lastIndex = 0; null != (i = c.exec(e)); ) {
                    var n = {}, o = n.attrs = new w(i[1]);
                    n.url = this.resolve(i[2], t);
                    var a = o.decimalResolution("RESOLUTION");
                    a && (n.width = a.width, n.height = a.height), n.bitrate = o.decimalInteger("AVERAGE-BANDWIDTH") || o.decimalInteger("BANDWIDTH"),
                        n.name = o.NAME;
                    var s = o.CODECS;
                    if (s) {
                        s = s.split(/[ ,]+/);
                        for (var l = 0; l < s.length; l++) {
                            var u = s[l];
                            -1 !== u.indexOf("avc1") ? n.videoCodec = this.avc1toavcoti(u) :-1 !== u.indexOf("hvc1") ? n.videoCodec = u :n.audioCodec = u;
                        }
                    }
                    r.push(n);
                }
                return r;
            },
            parseMasterPlaylistMedia:function(e, t, i, r) {
                var n, o = [], a = 0;
                for (u.lastIndex = 0; null != (n = u.exec(e)); ) {
                    var s = {}, l = new w(n[1]);
                    l.TYPE === i && (s.groupId = l["GROUP-ID"], s.name = l.NAME, s.type = i, s["default"] = "YES" === l.DEFAULT,
                        s.autoselect = "YES" === l.AUTOSELECT, s.forced = "YES" === l.FORCED, l.URI && (s.url = this.resolve(l.URI, t)),
                        s.lang = l.LANGUAGE, s.name || (s.name = s.lang), r && (s.audioCodec = r), s.id = a++,
                        o.push(s));
                }
                return o;
            },
            avc1toavcoti:function(e) {
                var t, i = e.split(".");
                return 2 < i.length ? (t = i.shift() + ".", t += parseInt(i.shift()).toString(16),
                    t += ("000" + parseInt(i.shift()).toString(16)).substr(-4)) :t = e, t;
            },
            parseLevelPlaylist:function(e, t, i, r) {
                var n, o, a = 0, s = 0, l = {
                    type:null,
                    version:null,
                    url:t,
                    fragments:[],
                    live:!0,
                    startSN:0
                }, u = new k(), c = 0, d = null, p = new I();
                for (P.lastIndex = 0; null !== (n = P.exec(e)); ) {
                    var h = n[1];
                    if (h) {
                        p.duration = parseFloat(h);
                        var f = (" " + n[2]).slice(1);
                        p.title = f || null, p.tagList.push(f ? [ "INF", h, f ] :[ "INF", h ]);
                    } else if (n[3]) {
                        if (!isNaN(p.duration)) {
                            var y = a++;
                            p.type = r, p.start = s, p.levelkey = u, p.sn = y, p.level = i, p.cc = c, p.baseurl = t,
                                p.relurl = (" " + n[3]).slice(1), l.fragments.push(p), s += (d = p).duration, p = new I();
                        }
                    } else if (n[4]) {
                        if (p.rawByteRange = (" " + n[4]).slice(1), d) {
                            var v = d.byteRangeEndOffset;
                            v && (p.lastByteRangeEndOffset = v);
                        }
                    } else if (n[5]) p.rawProgramDateTime = (" " + n[5]).slice(1), p.tagList.push([ "PROGRAM-DATE-TIME", p.rawProgramDateTime ]),
                    void 0 === l.programDateTime && (l.programDateTime = new Date(new Date(Date.parse(n[5])) - 1e3 * s)); else {
                        for (n = n[0].match(C), o = 1; o < n.length && void 0 === n[o]; o++) ;
                        var g = (" " + n[o + 1]).slice(1), _ = (" " + n[o + 2]).slice(1);
                        switch (n[o]) {
                            case "#":
                                p.tagList.push(_ ? [ g, _ ] :[ g ]);
                                break;

                            case "PLAYLIST-TYPE":
                                l.type = g.toUpperCase();
                                break;

                            case "MEDIA-SEQUENCE":
                                a = l.startSN = parseInt(g);
                                break;

                            case "TARGETDURATION":
                                l.targetduration = parseFloat(g);
                                break;

                            case "VERSION":
                                l.version = parseInt(g);
                                break;

                            case "EXTM3U":
                                break;

                            case "ENDLIST":
                                l.live = !1;
                                break;

                            case "DIS":
                                c++, p.tagList.push([ "DIS" ]);
                                break;

                            case "DISCONTINUITY-SEQ":
                                c = parseInt(g);
                                break;

                            case "KEY":
                                var m = new w(g), S = m.enumeratedString("METHOD"), b = m.URI, T = m.hexadecimalInteger("IV");
                                S && (u = new k(), b && 0 <= [ "AES-128", "SAMPLE-AES" ].indexOf(S) && (u.method = S,
                                    u.baseuri = t, u.reluri = b, u.key = null, u.iv = T));
                                break;

                            case "START":
                                var x = new w(g).decimalFloatingPoint("TIME-OFFSET");
                                isNaN(x) || (l.startTimeOffset = x);
                                break;

                            case "MAP":
                                var E = new w(g);
                                p.relurl = E.URI, p.rawByteRange = E.BYTERANGE, p.baseurl = t, p.level = i, p.type = r,
                                    p.sn = "initSegment", l.initSegment = p, p = new I();
                                break;

                            default:
                                console.log("line parsed but not handled: " + n);
                        }
                    }
                }
                return (p = d) && !p.relurl && (l.fragments.pop(), s -= p.duration), l.totalduration = s,
                    l.averagetargetduration = s / l.fragments.length, l.endSN = a - 1, l;
            }
        }, t.exports = o;
    }, {
        "../io":30,
        "./URLToolkit":27,
        "./attrlist":28
    } ],
    30:[ function(e, s, t) {
        var h = e("./url");
        s.exports.get = function(e, t, i, r, n) {
            s.exports.ajax("GET", e, {}, t, i, r, n);
        }, s.exports.post = function(e, t, i, r, n, o) {
            var a = {
                "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
                Accept:"application/json"
            };
            s.exports.ajax("POST", e, t, i, r, n, o, a);
        }, s.exports.ajax = function(e, t, i, r, n, o, a, s) {
            var l, u, c, d;
            n = n || function() {}, "undefined" == typeof XMLHttpRequest && (window.XMLHttpRequest = function() {
                try {
                    return new window.ActiveXObject("Msxml2.XMLHTTP.6.0");
                } catch (e) {}
                try {
                    return new window.ActiveXObject("Msxml2.XMLHTTP.3.0");
                } catch (e) {}
                try {
                    return new window.ActiveXObject("Msxml2.XMLHTTP");
                } catch (e) {}
                throw new Error("This browser does not support XMLHttpRequest.");
            }), u = new XMLHttpRequest(), c = h.parseUrl(t), d = window.location, !(c.protocol + c.host !== d.protocol + d.host) || !window.XDomainRequest || "withCredentials" in u ? (l = "file:" == c.protocol || "file:" == d.protocol,
                u.onreadystatechange = function() {
                    4 === u.readyState && (200 === u.status || l && 0 === u.status ? r(u.responseText) :n(u.responseText));
                }) :((u = new window.XDomainRequest()).onload = function() {
                r(u.responseText);
            }, u.onerror = n, u.onprogress = function() {}, u.ontimeout = n);
            try {
                if (void 0 === o && (o = !0), u.open(e, t, o), a && (u.withCredentials = !0), s) for (var p in s) u.setRequestHeader(p, s[p]);
            } catch (e) {
                return void n(e);
            }
            try {
                u.send(i);
            } catch (e) {
                n(e);
            }
        }, s.exports.jsonp = function(e, t, i) {
            var r = "jsonp_callback_" + Math.round(1e5 * Math.random()), n = document.createElement("script");
            e && (n.src = e + (0 <= e.indexOf("?") ? "&" :"?") + "callback=" + r + "&cb=" + r,
                n.onerror = function() {
                    delete window[r], document.body.removeChild(n), i();
                }, n.onload = function() {
                setTimeout(function() {
                    window[r] && (delete window[r], document.body.removeChild(n));
                }, 0);
            }, window[r] = function(e) {
                delete window[r], document.body.removeChild(n), t(e);
            }, document.body.appendChild(n));
        }, s.exports.loadJS = function(e, t) {
            var i = document.getElementsByTagName("HEAD").item(0), r = document.createElement("script");
            r.type = "text/javascript", r.src = e, r.onload = function() {
                t && t();
            }, i.appendChild(r);
        };
    }, {
        "./url":39
    } ],
    31:[ function(e, t, i) {
        var s = e("./dom");
        t.exports.render = function(e, t) {
            var i = t.align ? t.align :"tl", r = t.x ? t.x :0, n = t.y ? t.y :0, o = r.indexOf && 0 < r.indexOf("%") ? "" :"px", a = n.indexOf && 0 < n.indexOf("%") ? "" :"px";
            "tl" === i ? s.css(e, {
                "float":"left",
                "margin-left":r + o,
                "margin-top":n + a
            }) :"tr" === i ? s.css(e, {
                "float":"right",
                "margin-right":r + o,
                "margin-top":n + a
            }) :"tlabs" === i ? s.css(e, {
                position:"absolute",
                left:r + o,
                top:n + a
            }) :"trabs" === i ? s.css(e, {
                position:"absolute",
                right:r + o,
                top:n + a
            }) :"blabs" === i ? s.css(e, {
                position:"absolute",
                left:r + o,
                bottom:n + a
            }) :"brabs" === i ? s.css(e, {
                position:"absolute",
                right:r + o,
                bottom:n + a
            }) :"cc" === i && s.css(e, {
                position:"absolute",
                left:"50%",
                top:"50%",
                "margin-top":e.offsetHeight / -2 + "px",
                "margin-left":e.offsetWidth / -2 + "px"
            });
        };
    }, {
        "./dom":24
    } ],
    32:[ function(e, a, t) {
        var s = Object.prototype.hasOwnProperty;
        a.exports.create = Object.create || function(e) {
            function t() {}
            return t.prototype = e, new t();
        }, a.exports.isArray = function(e) {
            return "[object Array]" === Object.prototype.toString.call(arg);
        }, a.exports.isEmpty = function(e) {
            for (var t in e) if (null !== e[t]) return !1;
            return !0;
        }, a.exports.each = function(e, t, i) {
            if (a.exports.isArray(e)) for (var r = 0, n = e.length; r < n && !1 !== t.call(i || this, e[r], r); ++r) ; else for (var o in e) if (s.call(e, o) && !1 === t.call(i || this, o, e[o])) break;
            return e;
        }, a.exports.merge = function(e, t) {
            if (!t) return e;
            for (var i in t) s.call(t, i) && (e[i] = t[i]);
            return e;
        }, a.exports.deepMerge = function(e, t) {
            var i, r, n;
            for (i in e = a.exports.copy(e), t) s.call(t, i) && (r = e[i], n = t[i], a.exports.isPlain(r) && a.exports.isPlain(n) ? e[i] = a.exports.deepMerge(r, n) :e[i] = t[i]);
            return e;
        }, a.exports.copy = function(e) {
            return a.exports.merge({}, e);
        }, a.exports.isPlain = function(e) {
            return !!e && "object" == typeof e && "[object Object]" === e.toString() && e.constructor === Object;
        }, a.exports.isArray = Array.isArray || function(e) {
            return "[object Array]" === Object.prototype.toString.call(e);
        }, a.exports.unescape = function(e) {
            return e.replace(/&([^;]+);/g, function(e, t) {
                return {
                    amp:"&",
                    lt:"<",
                    gt:">",
                    quot:'"',
                    "#x27":"'",
                    "#x60":"`"
                }[t.toLowerCase()] || e;
            });
        };
    }, {} ],
    33:[ function(e, t, i) {
        var n = e("./object"), o = function() {};
        (o = function() {}).extend = function(e) {
            var t, i;
            for (var r in t = (e = e || {}).init || e.init || this.prototype.init || this.prototype.init || function() {},
                (((i = function() {
                    t.apply(this, arguments);
                }).prototype = n.create(this.prototype)).constructor = i).extend = o.extend, i.create = o.create,
                e) e.hasOwnProperty(r) && (i.prototype[r] = e[r]);
            return i;
        }, o.create = function() {
            var e = n.create(this.prototype);
            return this.apply(e, arguments), e;
        }, t.exports = o;
    }, {
        "./object":32
    } ],
    34:[ function(e, f, t) {
        var y = e("./object"), i = e("../config"), r = e("./dom"), n = e("./cookie"), o = e("./constants"), a = e("../lang/index"), v = e("./ua"), g = e("../player/base/plugin/defaultemptycomponent"), _ = {
            preload:!0,
            autoplay:!0,
            useNativeControls:!1,
            width:"100%",
            height:"300px",
            cover:"",
            from:"",
            trackLog:!0,
            isLive:!1,
            playsinline:!0,
            showBarTime:5e3,
            rePlay:!1,
            liveRetry:5,
            liveRetryInterval:1,
            liveRetryStep:0,
            format:"",
            definition:"",
            defaultDefinition:"",
            loadDataTimeout:20,
            waitingTimeout:60,
            controlBarForOver:!1,
            controlBarVisibility:"hover",
            enableSystemMenu:!1,
            qualitySort:"asc",
            x5_video_position:"normal",
            x5_type:"",
            x5_fullscreen:!1,
            x5_orientation:"landscape|portrait",
            x5LandscapeAsFullScreen:!0,
            autoPlayDelay:0,
            autoPlayDelayDisplayText:"",
            useHlsPluginForSafari:!1,
            enableMSEForAndroid:!0,
            encryptType:0,
            lang
