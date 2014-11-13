
//Weiwei Added
//GLOBAL VARIABLES
//===========

var entry_start=0;
var entry_end=0;

var gameFrames = 0;
var gameStartTime =0;
var gameFinishTime =0;
var gameFPS1 =0;
var gameFPS2 =0;
var gameFPS3 =0;
var gameFPSAVG =0;

var entryFPS=[];
var beforeCutFPS=[];
var afterCutFPS=[];
var calcResultFPS=[];

var cur_run=1;

var entry_cnt=0;
var before_cut=0;
var after_cut=0;
var after_cnt=0;
var before_cnt=0;
var bonus_cnt=0;
var time_cnt=0;

var pri_fps=0;

//===================
(function () {
    var aa = void 0,
        i = !0,
        j = null,
        l = !1;

    function ba() {
        return function () {}
    }
    function ca(a) {
        return function (b) {
            this[a] = b
        }
    }
    function fa(a) {
        return function () {
            return this[a]
        }
    }
    function ia(a) {
        return function () {
            return a
        }
    }
    var ja, la, ma = l,
        na = /var xyz/.test(ba()) ? /\b_super\b/ : /.*/;
    la = ba();
    la.extend = function (a) {
        function b() {
            !ma && this.init && this.init.apply(this, arguments)
        }
        var c = this.prototype;
        ma = i;
        var d = new this;
        ma = l;
        for (var e in a) d[e] = "function" == typeof a[e] && "function" == typeof c[e] && na.test(a[e]) ? function (a, b) {
            return function () {
                var f = this.h;
                this.h = c[a];
                var d = b.apply(this, arguments);
                this.h = f;
                return d
            }
        }(e, a[e]) : a[e];
        b.prototype = d;
        b.extend = arguments.callee;
        return b
    };

    function m(a, b, c, d) {
        this.z = a;
        this.F = b;
        this.D = c;
        this.u = d
    }
    ja = m.prototype;
    ja.Rh = function () {
        return "rgba(" + (255 * this.z >> 0) + "," + (255 * this.F >> 0) + "," + (255 * this.D >> 0) + "," + this.u.toFixed(2) + ")"
    };
    ja.ej = function (a) {
        return this.z === a.z && this.F === a.F && this.D === a.D && this.u === a.u
    };
    ja.copy = function () {
        return new m(this.z, this.F, this.D, this.u)
    };
    ja.$ = function (a) {
        this.z = a.z;
        this.F = a.F;
        this.D = a.D;
        this.u = a.u
    };
    ja.add = function (a) {
        this.z += a.z;
        this.F += a.F;
        this.D += a.D;
        this.u += a.u
    };
    ja.multiply = function (a) {
        this.z *= a;
        this.F *= a;
        this.D *= a;
        this.u *= a
    };
    m.Ib = new m(0, 0, 0, 0);
    m.lb = new m(1, 1, 1, 1);
    m.red = new m(1, 0, 0, 1);
    m.blue = new m(0, 0, 1, 1);
    m.green = new m(0, 1, 0, 1);
    m.CB = new m(0, 0, 0, 1);
    m.iu = m.lb;
    m.Xn = {
        Rl: "rgba(255,255,255,1)",
        qB: "rgba(0,0,0,0)"
    };
    var n = {
        d: 0,
        rb: 1,
        Dc: 2,
        Hf: 4,
        Tb: 8,
        Kf: 16,
        Bf: 32,
        M: 18,
        parse: function (a) {
            var b = this.d;
            0 < a.indexOf("LEFT") ? b = this.rb : 0 < a.indexOf("HCENTER") || "CENTER" === a ? b = this.Dc : 0 < a.indexOf("RIGHT") && (b = this.Hf);
            0 < a.indexOf("TOP") ? b |= this.Tb : 0 < a.indexOf("VCENTER") || "CENTER" === a ? b |= this.Kf : 0 < a.indexOf("BOTTOM") && (b |= this.Bf);
            return b
        }
    };

    function o(a, b) {
        this.x = a;
        this.y = b
    }
    ja = o.prototype;
    ja.add = function (a) {
        this.x += a.x;
        this.y += a.y
    };
    ja.$a = function (a) {
        this.x -= a.x;
        this.y -= a.y
    };
    ja.multiply = function (a) {
        this.x *= a;
        this.y *= a
    };
    ja.xm = function (a) {
        this.x /= a;
        this.y /= a
    };
    ja.Ia = function (a) {
        var b = this.x - a.x,
            a = this.y - a.y;
        return Math.sqrt(b * b + a * a)
    };
    ja.jd = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    };
    ja.rh = function () {
        return 0 === this.x && 0 === this.y
    };
    ja.ej = function (a) {
        return this.x === a.x && this.y === a.y
    };
    ja.Zz = function () {
        this.y = this.x = 0
    };
    ja.normalize = function () {
        this.multiply(1 / this.jd())
    };
    ja.b = function () {
        return Math.atan(this.y / this.x)
    };
    ja.gg = function () {
        return Math.atan2(this.y, this.x)
    };
    ja.copy = function () {
        return new o(this.x, this.y)
    };
    ja.$ = function (a) {
        this.x = a.x;
        this.y = a.y
    };
    ja.round = function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y)
    };
    ja.rotate = function (a) {
        var b = Math.cos(a),
            a = Math.sin(a),
            c = this.x * a + this.y * b;
        this.x = this.x * b - this.y * a;
        this.y = c
    };
    ja.ja = function (a, b, c) {
        this.x -= b;
        this.y -= c;
        this.rotate(a);
        this.x += b;
        this.y += c
    };
    ja.toString = function () {
        return "[" + this.x + ", " + this.y + "]"
    };
    o.Ra = function () {
        return new o(0, 0)
    };
    o.dD = new o(0, 0);
    o.Bh = function () {
        return new o(2147483647, 2147483647)
    };
    o.CA = o.Bh();
    o.add = function (a, b) {
        return new o(a.x + b.x, a.y + b.y)
    };
    o.$a = function (a, b) {
        return new o(a.x - b.x, a.y - b.y)
    };
    o.multiply = function (a, b) {
        return new o(a.x * b, a.y * b)
    };
    o.xm = function (a, b) {
        return new o(a.x / b, a.y / b)
    };
    o.Ia = function (a, b, c, d) {
        a -= c;
        b -= d;
        return Math.sqrt(a * a + b * b)
    };
    o.Gs = function (a) {
        return new o(-a.y, a.x)
    };
    o.Wy = function (a) {
        return new o(a.y, -a.x)
    };
    o.normalize = function (a) {
        return this.multiply(a, 1 / a.jd())
    };
    o.BC = function (a) {
        return new o(-a.x, -a.y)
    };
    o.Uv = Array(64);
    o.Vv = Array(64);
    o.kr = function (a, b) {
        var c = a.length;
        if (1 >= c) return new o(0, 0);
        for (var d = o.Uv, e = o.Vv, g = 1 - b, h = 0; h < c; h++) {
            var f = a[h];
            d[h] = f.x;
            e[h] = f.y
        }
        for (h = c - 1; 0 < h; c--, h--) for (var f = 0, k = 1; f < h; f++, k++) d[f] = d[f] * g + d[k] * b, e[f] = e[f] * g + e[k] * b;
        return new o(d[0], e[0])
    };
    o.Ww = function (a) {
        return new o(Math.cos(a), Math.sin(a))
    };
    var t = {
        oc: 5,
        xk: 0.15,
        d: -1,
        Cf: 1E-6,
        If: 1,
        mv: 80,
        OA: 0.15,
        dB: 10,
        qu: -2,
        He: 2147483647
    }, u;
    u = {
        eb: function (a) {
            this.Vh(document.getElementById(a))
        },
        Vh: function (a) {
            this.element = this.id = a;
            this.context = this.element.getContext("2d");
            this.Wz(m.iu)
        },
        Wz: function (a) {
            a = a.Rh();
            this.context.fillStyle = a;
            this.context.strokeStyle = a
        },
        Xz: function (a) {
            this.context.fillStyle = a;
            this.context.strokeStyle = a
        },
        Vw: function (a, b) {
            var c = this.context,
                d = a[0];
            c.fillStyle = b;
            c.beginPath();
            c.moveTo(d.x, d.y);
            for (var e = 1, g = a.length; e < g; e += 2) d = a[e], c.lineTo(d.x, d.y);
            for (e = a.length - 2; 0 <= e; e -= 2) d = a[e], c.lineTo(d.x, d.y);
            c.fill()
        }
    };
    var oa = {
        Tp: "ACTION_SET_VISIBLE",
        rv: "ACTION_SET_TOUCHABLE",
        sv: "ACTION_SET_UPDATEABLE",
        Hi: "ACTION_SET_DRAWQUAD",
        Jp: "ACTION_PLAY_TIMELINE",
        Gp: "ACTION_PAUSE_TIMELINE",
        Av: "ACTION_STOP_TIMELINE",
        Yu: "ACTION_JUMP_TO_TIMELINE_FRAME"
    };

    function pa(a, b, c) {
        this.Rq = a;
        this.Sq = b;
        this.Og = c
    }
    function qa(a, b) {
        this.Xv = a;
        this.data = b
    }
    qa.create = function (a, b, c, d) {
        return new qa(a, new pa(b, c, d))
    };
    var v = {
        Td: 0,
        Ke: 1,
        Je: 2,
        Be: 3,
        xd: 4,
        RA: 5
    }, w;

    function ra() {
        this.a = o.Ra();
        this.scale = o.Ra();
        this.Ta = 0;
        this.color = m.lb.copy();
        this.Le = []
    }
    function sa(a, b, c, d) {
        this.Rc = a;
        this.bi = b;
        this.ug = c;
        this.value = d
    }
    ra.prototype.copy = function () {
        var a = new ra;
        a.a = this.a.copy();
        a.scale = this.scale.copy();
        a.Ta = this.Ta;
        a.color = this.color.copy();
        a.Le = this.Le.slice(0);
        return a
    };
    sa.prototype.copy = function () {
        return new sa(this.Rc, this.bi, this.ug, this.value.copy())
    };
    sa.W = {
        LINEAR: 0,
        cB: 1,
        zd: 2,
        Jb: 3
    };
    sa.dn = function () {
        return new sa(0, v.Td, sa.W.LINEAR, new ra)
    };
    sa.Pa = function (a, b, c, d) {
        var e = new ra;
        e.a.x = a;
        e.a.y = b;
        return new sa(d, v.Td, c, e)
    };
    sa.vj = function (a, b, c) {
        var d = w.W.LINEAR,
            e = new ra;
        e.scale.x = a;
        e.scale.y = b;
        return new sa(c, v.Ke, d, e)
    };
    sa.me = function (a, b, c) {
        var d = new ra;
        d.Ta = a;
        return new sa(c, v.Je, b, d)
    };
    sa.ta = function (a, b) {
        var c = w.W.LINEAR,
            d = new ra;
        d.color = a;
        return new sa(b, v.Be, c, d)
    };
    sa.uj = function (a, b) {
        var c = new ra;
        c.Le = a;
        return new sa(b, v.xd, sa.W.LINEAR, c)
    };
    sa.dy = function (a) {
        var b = oa.Hi,
            c = new ra,
            a = qa.create(a, b, 0, 0);
        c.Le = [a];
        return new sa(0.04, v.xd, sa.W.LINEAR, c)
    };
    w = sa;
    var x, ta = la.extend({
        init: function (a, b) {
            this.type = b;
            this.state = 0;
            this.Mj = l;
            this.de = this.startTime = 0;
            this.ea = [];
            this.wb = a;
            this.X = t.d;
            this.Yd = w.dn();
            this.Wg = w.dn();
            this.eh = w.dn();
            this.kb = this.za = 0;
            b === v.xd && (this.Wv = [])
        },
        gd: function () {
            this.state = 0
        },
        p: function (a) {
            this.Xj(a, this.ea.length)
        },
        Xj: function (a, b) {
            this.ea[b] = a;
            this.type === v.xd && this.Wv.push(a.value.Le)
        },
        Hm: function (a) {
            for (var b = 0, c = 0; c <= a; c++) b += this.ea[c].Rc;
            return b
        },
        IA: function () {
            this.startTime = this.Hm(0);
            this.de = this.Hm(this.ea.length - 1)
        },
        Zt: function (a) {
            0 === this.state ? this.wb.ud ? this.wb.time + a < this.startTime || this.wb.time > this.de || (1 < this.ea.length ? (this.state = 1, this.X = this.ea.length - 1, this.kb = this.de - this.wb.time, this.X--, this.$f(this.ea[this.X + 1], this.ea[this.X].Rc)) : this.$f(this.ea[0], 0)) : this.wb.time - a > this.de || this.wb.time < this.startTime || (1 < this.ea.length ? (this.state = 1, this.X = 0, this.kb = this.wb.time - this.startTime, this.X++, this.$f(this.ea[this.X - 1], this.ea[this.X].Rc)) : this.$f(this.ea[0], 0)) : (this.za -= a, this.za <= t.Cf && (this.wb.Dh && this.wb.Dh(this.wb, this.ea[this.X], this.X), this.kb = -this.za, this.X === this.ea.length - 1 ? (this.ng(this.ea[this.X]), this.state = 0) : 0 === this.X ? (this.ng(this.ea[this.X]), this.state = 0) : this.wb.ud ? (this.X--, a = this.ea[this.X + 1], this.$f(a, a.Rc)) : (this.X++, this.$f(this.ea[this.X - 1], this.ea[this.X].Rc))))
        },
        cu: function (a) {
            var b = this.wb,
                c;
            if (0 === this.state) b.time >= this.startTime && b.time <= this.de && (this.state = 1, b.ud ? (this.X = this.ea.length - 1, this.kb = this.de - b.time, this.X--, c = this.ea[this.X + 1], this.kj(c, this.ea[this.X],
            c.Rc)) : (this.X = 0, this.kb = b.time - this.startTime, this.X++, c = this.ea[this.X], this.kj(this.ea[this.X - 1], c, c.Rc)));
            else {
                this.za -= a;
                c = this.ea[this.X];
                if (c.ug === w.W.zd || c.ug === w.W.Jb) switch (this.type) {
                    case v.Td:
                        var d = this.Wg.value.a;
                        c = d.x * a;
                        var d = d.y * a,
                            e = this.Yd.value.a,
                            g = e.x,
                            h = e.y;
                        e.x += c;
                        e.y += d;
                        b.element.x += (g + c / 2) * a;
                        b.element.y += (h + d / 2) * a;
                        break;
                    case v.Ke:
                        d = this.Wg.value.scale;
                        c = d.x * a;
                        d = d.y * a;
                        e = this.Yd.value.scale;
                        g = e.x;
                        h = e.y;
                        e.x += c;
                        e.y += d;
                        b.element.Q += (g + c / 2) * a;
                        b.element.Z += (h + d / 2) * a;
                        break;
                    case v.Je:
                        c = this.Wg.value.Ta * a;
                        d = this.Yd.value.Ta;
                        this.Yd.value.Ta += c;
                        b.element.rotation += (d + c / 2) * a;
                        break;
                    case v.Be:
                        var f = this.Yd.value.color;
                        c = f.z;
                        var d = f.F,
                            e = f.D,
                            g = f.u,
                            k = this.Wg.value.color,
                            h = k.z * a,
                            p = k.F * a,
                            q = k.D * a,
                            k = k.u * a;
                        f.z += 2 * h;
                        f.F += 2 * p;
                        f.D += 2 * q;
                        f.u += 2 * k;
                        f = b.element.color;
                        f.z += (c + h / 2) * a;
                        f.F += (d + p / 2) * a;
                        f.D += (e + q / 2) * a;
                        f.u += (g + k / 2) * a
                } else if (c.ug === w.W.LINEAR) switch (c = b.element, d = this.Yd.value, this.type) {
                    case v.Td:
                        c.x += d.a.x * a;
                        c.y += d.a.y * a;
                        break;
                    case v.Ke:
                        c.Q += d.scale.x * a;
                        c.Z += d.scale.y * a;
                        break;
                    case v.Je:
                        c.Ta += d.Ta * a;
                        break;
                    case v.Be:
                        c.color.z += d.color.z * a, c.color.F += d.color.F * a, c.color.D += d.color.D * a, c.color.u += d.color.u * a
                }
                this.za <= t.Cf && (b.Dh && b.Dh(b, this.ea[this.X], this.X), this.kb = -this.za, this.X === this.ea.length - 1 ? (this.ng(this.ea[this.X]), this.state = 0) : 0 === this.X ? (this.ng(this.ea[this.X]), this.state = 0) : b.ud ? (this.X--, c = this.ea[this.X + 1], this.kj(c, this.ea[this.X], c.Rc)) : (this.X++, c = this.ea[this.X], this.kj(this.ea[this.X - 1], c, c.Rc)))
            }
        },
        $f: function (a, b) {
            this.za = b;
            this.ng(a);
            0 < this.kb && (this.Zt(this.kb),
            this.kb = 0)
        },
        ng: function (a) {
            switch (this.type) {
                case v.Td:
                    var b = this.wb.element,
                        a = a.value.a;
                    if (this.Mj) {
                        var c = this.eh.value.a;
                        b.x = c.x + a.x;
                        b.y = c.y + a.y
                    } else b.x = a.x, b.y = a.y;
                    break;
                case v.Ke:
                    a = a.value.scale;
                    b = this.wb.element;
                    this.Mj ? (c = this.eh.value.scale, b.Q = c.x + a.x, b.Z = c.y + a.y) : (b.Q = a.x, b.Z = a.y);
                    break;
                case v.Je:
                    this.wb.element.rotation = this.Mj ? this.eh.value.Ta + a.value.Ta : a.value.Ta;
                    break;
                case v.Be:
                    b = this.wb.element.color;
                    a = a.value.color;
                    this.Mj ? (c = this.eh.value.color, b.z = c.z + a.z, b.F = c.F + a.F, b.D = c.D + a.D,
                    b.u = c.u + a.u) : b.$(a);
                    break;
                case v.xd:
                    b = a.value.Le;
                    a = 0;
                    for (c = b.length; a < c; a++) {
                        var d = b[a];
                        d.Xv.Rr(d.data)
                    }
            }
        },
        Gz: function (a) {
            var a = a.value,
                b = this.wb.element;
            switch (this.type) {
                case v.Td:
                    a.a.x = b.x;
                    a.a.y = b.y;
                    break;
                case v.Ke:
                    a.scale.x = b.Q;
                    a.scale.y = b.Z;
                    break;
                case v.Je:
                    a.Ta = b.rotation;
                    break;
                case v.Be:
                    a.color.$(b.color)
            }
        },
        kj: function (a, b, c) {
            this.za = c;
            this.Gz(this.eh);
            this.ng(a);
            var c = this.Yd.value,
                d = this.Wg.value;
            switch (this.type) {
                case v.Td:
                    var e = c.a,
                        g = b.value.a,
                        a = a.value.a;
                    e.x = (g.x - a.x) / this.za;
                    e.y = (g.y - a.y) / this.za;
                    break;
                case v.Ke:
                    e = c.scale;
                    g = b.value.scale;
                    a = a.value.scale;
                    e.x = (g.x - a.x) / this.za;
                    e.y = (g.y - a.y) / this.za;
                    break;
                case v.Je:
                    c.Ta = (b.value.Ta - a.value.Ta) / this.za;
                    break;
                case v.Be:
                    e = c.color, g = b.value.color, a = a.value.color, e.z = (g.z - a.z) / this.za, e.F = (g.F - a.F) / this.za, e.D = (g.D - a.D) / this.za, e.u = (g.u - a.u) / this.za
            }
            a = b.ug === w.W.zd;
            b = b.ug == w.W.Jb;
            if (a || b) switch (this.type) {
                case v.Td:
                    e = c.a;
                    b = d.a;
                    e.multiply(2);
                    b.x = e.x / this.za;
                    b.y = e.y / this.za;
                    a ? (e.x = 0, e.y = 0) : b.multiply(-1);
                    break;
                case v.Ke:
                    e = c.scale;
                    b = d.scale;
                    e.multiply(2);
                    b.x = e.x / this.za;
                    b.y = e.y / this.za;
                    a ? (e.x = 0, e.y = 0) : b.multiply(-1);
                    break;
                case v.Je:
                    c.Ta *= 2;
                    d.Ta = c.Ta / this.za;
                    a ? c.Ta = 0 : d.Ta *= -1;
                    break;
                case v.Be:
                    e = c.color, b = d.color, e.multiply(2), b.z = e.z / this.za, b.F = e.F / this.za, b.D = e.D / this.za, b.u = e.u / this.za, a ? e.multiply(0) : b.multiply(-1)
            }
            0 < this.kb && (this.cu(this.kb), this.kb = 0)
        }
    }),
        ua = la.extend({
            init: function () {
                this.length = this.time = 0;
                this.df = t.d;
                this.state = ua.U.Mg;
                this.tj = ua.da.Va;
                this.Sc = [];
                this.Dh = this.ab = j;
                this.ud = l;
                this.element = j
            },
            p: function (a) {
                var b = this.Sc[a.bi];
                this.Xj(a, b == j ? 0 : b.ea.length)
            },
            Xj: function (a, b) {
                var c = this.Sc[a.bi];
                c || (this.Sc[a.bi] = c = new ta(this, a.bi));
                c.Xj(a, b)
            },
            Or: function (a) {
                return this.Sc[a]
            },
            play: function () {
                if (this.state !== ua.U.Ig) {
                    this.time = 0;
                    this.ud = l;
                    for (var a = this.length = 0, b = this.Sc.length; a < b; a++) {
                        var c = this.Sc[a];
                        c && (c.IA(), c.de > this.length && (this.length = c.de))
                    }
                }
                this.state = ua.U.Ip;
                this.update(0)
            },
            pause: function () {
                this.state = ua.U.Ig
            },
            Xr: function (a, b) {
                this.state === ua.U.Mg && (this.state = ua.U.Ig);
                this.update(this.Sc[a].Hm(b) - this.time)
            },
            stop: function () {
                this.state = ua.U.Mg;
                this.Aw()
            },
            Aw: function () {
                for (var a = 0, b = this.Sc.length; a < b; a++) {
                    var c = this.Sc[a];
                    c && c.gd()
                }
            },
            update: function (a) {
                if (this.state === ua.U.Ip) {
                    this.time = this.ud ? this.time - a : this.time + a;
                    for (var b = 0, c = this.Sc.length; b < c; b++) {
                        var d = this.Sc[b];
                        d != j && (d.type === v.xd ? d.Zt(a) : d.cu(a))
                    }
                    switch (this.tj) {
                        case ua.da.Hp:
                            this.ud === l && this.time >= this.length - t.Cf ? (this.time = Math.max(0, this.length - (this.time - this.length)), this.ud = i) : this.ud && this.time <= t.Cf && (0 < this.df && (this.df--,
                            0 === this.df && (this.stop(), this.ab && this.ab(this))), this.time = Math.min(-this.time, this.length), this.ud = l);
                            break;
                        case ua.da.Kb:
                            this.time >= this.length - t.Cf && (0 < this.df && (this.df--, 0 === this.df && (this.stop(), this.ab && this.ab(this))), this.time = Math.min(this.time - this.length, this.length));
                            break;
                        case ua.da.Va:
                            this.time >= this.length - t.Cf && (this.stop(), this.ab && this.ab(this))
                    }
                }
            }
        });
    ua.da = {
        Va: 0,
        Kb: 1,
        Hp: 2
    };
    ua.U = {
        Mg: 0,
        Ip: 1,
        Ig: 2
    };
    x = ua;
    var va = {
        OB: 6.283185307179586,
        hc: function (a) {
            return 0.017453292519943295 * a
        },
        tg: function (a) {
            return 57.29577951308232 * a
        }
    }, wa;
    wa = la.extend({
        init: function () {
            this.parent = j;
            this.ci = this.Zb = this.visible = i;
            this.name = j;
            this.mg = this.Od = this.rotation = this.height = this.width = this.ba = this.aa = this.y = this.x = 0;
            this.Z = this.Q = 1;
            this.color = m.lb.copy();
            this.Ut = this.Tt = 0;
            this.anchor = n.Tb | n.rb;
            this.la = n.d;
            this.Fh = this.oe = i;
            this.Gj = l;
            this.children = [];
            this.xe = [];
            this.Of = t.d;
            this.Db = j
        },
        Sg: function () {
            var a = this.la,
                b = this.parent,
                c = this.anchor;
            a !== n.d ? (a & n.rb ? this.aa = b.aa + this.x : a & n.Dc ? this.aa = b.aa + this.x + b.width / 2 : a & n.Hf && (this.aa = b.aa + this.x + b.width),
            a & n.Tb) ? this.ba = b.ba + this.y : a & n.Kf ? this.ba = b.ba + this.y + b.height / 2 : a & n.Bf && (this.ba = b.ba + this.y + b.height) : (this.aa = this.x, this.ba = this.y);
            c & n.Tb || (c & n.Kf ? this.ba -= this.height / 2 : c & n.Bf && (this.ba -= this.height));
            c & n.rb || (c & n.Dc ? this.aa -= this.width / 2 : c & n.Hf && (this.aa -= this.width))
        },
        yc: function () {
            this.Sg();
            var a = 0 !== this.Q && 0 !== this.Z && (1 !== this.Q || 1 !== this.Z),
                b = 0 !== this.rotation,
                c = 0 !== this.Tt || 0 !== this.Ut,
                d = u.context;
            d.save();
            if (a || b) {
                var e = this.aa + this.width / 2 + this.Od,
                    g = this.ba + this.height / 2 + this.mg,
                    h = 0 !== e || 0 !== g;
                h && d.translate(e, g);
                b && d.rotate(va.hc(this.rotation));
                a && d.scale(this.Q, this.Z);
                h && d.translate(-e, -g)
            }
            c && d.translate(this.Tt, this.Ut);
            this.Ms = d.globalAlpha;
            1 !== this.color.u && (d.globalAlpha = this.color.u)
        },
        s: function () {
            this.yc();
            this.xc()
        },
        $g: function () {
            var a = u.context;
            a.strokeStyle = "red";
            a.strokeRect(this.aa, this.ba, this.width, this.height)
        },
        xc: function () {
            var a = u.context;
            this.Bx && this.$g();
            if (this.TB) {
                var b = this.aa + (this.width >> 1) + this.Od,
                    c = this.ba + (this.height >> 1) + this.mg;
                a.save();
                a.lineWidth = 5;
                a.strokeStyle = "#ff0000";
                a.beginPath();
                a.moveTo(b, c);
                a.lineTo(b, c - 100);
                a.closePath();
                a.stroke();
                a.restore()
            }
            this.oe ? !this.Fh && 1 !== this.color.u && (u.context.globalAlpha = this.Ms) : (a.restore(), this.Fh && 1 !== this.color.u && (u.context.globalAlpha = this.color.u));
            for (var b = this.children, c = b.length, d = 0; d < c; d++) {
                var e = b[d];
                e.visible && e.s()
            }
            this.oe ? a.restore() : this.Fh && 1 !== this.color.u && (u.context.globalAlpha = this.Ms)
        },
        update: function (a) {
            for (var b = this.children, c = b.length, d = 0; d < c; d++) {
                var e = b[d];
                e.ci && e.update(a)
            }
            this.Db && this.Db.update(a)
        },
        ex: function (a) {
            for (var b = this.children, c = b.length, d = 0; d < c; d++) {
                var e = b[d];
                if (e.name === a) return e;
                e = e.ex(a);
                if (e !== j) return e
            }
            return j
        },
        VC: function () {
            this.Sg();
            for (var a = this.aa, b = this.ba, c = this.aa + this.width, d = this.ba + this.height, e = this.children, g = e.length, h = 0; h < g; h++) {
                var f = e[h];
                f.Sg();
                f.aa < a && (a = f.aa);
                f.ba < b && (b = f.ba);
                var k = f.aa + f.width,
                    f = f.ba + f.height;
                k > c && (c = k);
                f > d && (d = f)
            }
            this.width = c - a;
            this.height = d - b
        },
        Rr: function (a) {
            switch (a.Rq) {
                case oa.Tp:
                    this.visible = 0 !== a.Og;
                    break;
                case oa.sv:
                    this.ci = 0 !== a.Og;
                    break;
                case oa.rv:
                    this.Zb = 0 !== a.Og;
                    break;
                case oa.Jp:
                    this.P(a.Og);
                    break;
                case oa.Gp:
                    this.Qy();
                    break;
                case oa.Av:
                    this.Et();
                    break;
                case oa.Yu:
                    this.Db.Xr(a.Sq, a.Og);
                    break;
                default:
                    return l
            }
            return i
        },
        N: function (a) {
            this.children.push(a);
            a.parent = this;
            return this.children.length - 1
        },
        Vd: function (a, b) {
            this.children[b] = a;
            a.parent = this
        },
        Nj: function (a) {
            this.children.splice(a, 1).parent = j
        },
        Us: function () {
            this.children = []
        },
        removeChild: function (a) {
            for (var b = this.children, c = b.length, d = 0; d < c; d++) if (a === b[d]) {
                this.Nj(d);
                break
            }
        },
        fb: function (a) {
            return this.children[a]
        },
        IB: function () {
            return this.children.length
        },
        eC: fa("children"),
        $q: function (a) {
            var b = this.xe.length;
            this.Lb(a, b);
            return b
        },
        Lb: function (a, b) {
            a.element = this;
            this.xe[b] = a
        },
        cz: function (a) {
            this.Of === a && this.Et();
            a < this.xe.length && this.xe.splice(a, 1)
        },
        P: function (a) {
            this.Db && this.Db.state !== x.U.Mg && this.Db.stop();
            this.Of = a;
            this.Db = this.xe[a];
            this.Db.play()
        },
        Qy: function () {
            this.Db.pause()
        },
        Et: function () {
            this.Db.stop();
            this.Db = j;
            this.Of = t.d
        },
        Lc: function (a) {
            return this.xe[a]
        },
        Cj: function (a, b) {
            for (var c = l, d = this.children.length - 1; 0 <= d; d--) {
                var e = this.children[d];
                if (e && e.Zb && (e.Cj(a, b) && c === l) && (c = i, !this.Gj)) break
            }
            return c
        },
        Dj: function (a, b) {
            for (var c = l, d = this.children.length - 1; 0 <= d; d--) {
                var e = this.children[d];
                if (e && e.Zb && (e.Dj(a, b) && c === l) && (c = i, !this.Gj)) break
            }
            return c
        },
        qn: function (a, b) {
            for (var c = l, d = this.children.length - 1; 0 <= d; d--) {
                var e = this.children[d];
                if (e && e.Zb && (e.qn(a, b) && c === l) && (c = i, !this.Gj)) break
            }
            return c
        },
        qs: function (a, b) {
            for (var c = l, d = this.children.length - 1; 0 <= d; d--) {
                var e = this.children[d];
                if (e && e.Zb && (e.qs(a, b) && c === l) && (c = i, !this.Gj)) break
            }
            return c
        },
        Sh: function (a) {
            this.ci = this.Zb = this.visible = a
        },
        isEnabled: function () {
            return this.visible && this.Zb && this.ci
        },
        show: function () {
            for (var a = this.children, b = a.length, c = 0; c < b; c++) {
                var d = a[c];
                d.visible && d.show()
            }
        },
        hide: function () {
            for (var a = this.children, b = a.length, c = 0; c < b; c++) {
                var d = a[c];
                d.visible && d.hide()
            }
        }
    });

    function A(a, b, c, d) {
        this.x = a;
        this.y = b;
        this.B = c;
        this.L = d
    }

    function xa(a, b, c, d, e) {
        return (e.x < a ? za : 0) + (e.x > c ? Aa : 0) + (e.y < b ? Ba : 0) + (e.y > d ? Ca : 0)
    }
    A.copy = function (a) {
        return new A(a.x, a.y, a.B, a.L)
    };
    A.qf = function (a) {
        var b = B;
        return new A(a.x * b, a.y * b, a.B * b, a.L * b)
    };
    A.Mh = function (a, b, c, d, e, g, h, f) {
        return !(a > h || c < e || b > f || d < g)
    };
    A.Ts = function (a, b, c, d, e, g, h, f) {
        a = new A(e - a, g - b, h, f);
        0 > a.x && (a.B += a.x, a.x = 0);
        a.x + a.B > c && (a.B = c - a.x);
        0 > a.y && (a.L += a.y, a.y = 0);
        a.y + a.L > d && (a.L = d - a.y);
        return a
    };
    A.pb = function (a, b, c, d, e, g) {
        return a >= c && a < c + e && b >= d && b < d + g
    };
    var za = 1,
        Aa = 2,
        Ba = 4,
        Ca = 8;
    A.cf = function (a, b, c, d, e, g, h, f) {
        var k, p, q = new o(a, b),
            r = new o(c, d),
            s, h = e + h,
            z = g + f,
            f = xa(e, g, h, z, q);
        for (k = xa(e, g, h, z, r); f || k;) {
            if (f & k) return l;
            f ? (p = f, s = q) : (p = k, s = r);
            p & za ? (s.y += (b - d) * (e - s.x) / (a - c), s.x = e) : p & Aa && (s.y += (b - d) * (h - s.x) / (a - c), s.x = h);
            p & Ba ? (s.x += (a - c) * (g - s.y) / (b - d), s.y = g) : p & Ca && (s.x += (a - c) * (z - s.y) / (b - d), s.y = z);
            p == f ? f = xa(e, g, h, z, q) : k = xa(e, g, h, z, r)
        }
        return i
    };
    var Da;
    Da = wa.extend({
        init: function (a) {
            this.h();
            this.C = a;
            this.Aj = t.d;
            this.tf = [];
            this.ye = [];
            this.Nf = []
        },
        Za: function (a, b, c, d) {
            this.tf[a] = b;
            this.ye[a] = c;
            this.Nf[a] = d != j ? d : 1
        },
        bz: function (a) {
            this.tf.splice(a, 1);
            this.ye.splice(a, 1);
            this.Nf.splice(a, 1)
        },
        wj: function (a, b, c, d) {
            this.tf[d] = A.copy(this.C.c[a]);
            var e = this.C.g[a],
                a = this.C.c[a];
            this.ye[d] = new A(b + e.x, c + e.y, a.B, a.L);
            this.Nf[d] = 1
        },
        zr: function (a) {
            a > this.tf.length && (a = this.tf.length);
            for (var b = u.context, c = 0; c < a; c++) {
                var d = this.tf[c],
                    e = this.ye[c],
                    g = this.Nf[c],
                    h = b.globalAlpha,
                    f = Math.ceil(d.B),
                    k = Math.ceil(d.L);
                if (!(0 === f || 0 === k)) {
                    if (g == j) g = 1;
                    else if (0 >= g) continue;
                    else 1 > g && (b.globalAlpha = g);
                    var p = this.lg && this.lg.length > c;
                    if (p) {
                        var q = this.lg[c],
                            r = this.Tj[c],
                            s = 0 !== r.x || 0 !== r.y;
                        0 !== q && (s && b.translate(r.x, r.y), b.rotate(q), s && b.translate(-r.x, -r.y))
                    }
                    var z, D, E;
                    this.Ha ? (z = Math.round(e.x / this.Ha) * this.Ha, D = Math.round(e.y / this.Ha) * this.Ha, E = Math.round(e.B / this.Ha) * this.Ha, e = Math.round(e.L / this.Ha) * this.Ha) : (z = Math.round(e.x), D = Math.round(e.y), E = Math.ceil(e.B), e = Math.ceil(e.L));
                    b.drawImage(this.C.Nc, d.x, d.y, f, k, z, D, E, e);
                    p && 0 !== q && (s && b.translate(r.x, r.y), b.rotate(-q), s && b.translate(-r.x, -r.y));
                    1 !== g && (b.globalAlpha = h)
                }
            }
        },
        s: function () {
            this.yc();
            if (0 !== this.color.u) {
                var a = u.context,
                    b = 0 !== this.aa || 0 !== this.ba;
                b && a.translate(this.aa, this.ba);
                this.zr(this.Aj === t.d ? this.tf.length : this.Aj);
                b && a.translate(-this.aa, -this.ba)
            }
            this.xc()
        }
    });
    var C = {
        Du: 0,
        Gu: 1,
        Bu: 2,
        Ku: 3,
        Ag: 4,
        mi: 5,
        Pu: 6,
        ga: 7,
        Cv: 8,
        cq: 9,
        ul: 10,
        Jg: 11,
        vl: 12,
        yl: 13,
        zl: 14,
        Al: 15,
        Bl: 16,
        gq: 17,
        El: 18,
        iq: 19,
        jq: 20,
        kq: 21,
        Fl: 22,
        Ll: 23,
        lq: 24,
        nq: 25,
        Ad: 26,
        Cl: 27,
        dq: 28,
        fq: 29,
        Dl: 30,
        Il: 31,
        Jl: 32,
        Kl: 33,
        Ml: 34,
        Nl: 35,
        Ji: 36,
        Ki: 37,
        wl: 38,
        tl: 39,
        Hu: 40,
        Iu: 41,
        Tu: 42,
        Ju: 43,
        Qu: 44,
        Ou: 45,
        Ru: 46,
        Mu: 47,
        Nu: 48,
        Lu: 49,
        Eu: 50,
        Xc: 51,
        Fg: 52,
        Cu: 53,
        Su: 54,
        Uu: 55,
        Ak: 56,
        Fu: 57,
        Vu: 58,
        Zk: 59,
        Dg: 60,
        Pk: 61,
        yi: 62,
        Yk: 63,
        wi: 64,
        Qk: 65,
        Rk: 66,
        Yc: 67,
        Mk: 68,
        Xk: 69,
        Wk: 70,
        Vk: 71,
        ti: 72,
        Df: 73,
        xi: 74,
        Ge: 75,
        Ai: 76,
        $k: 77,
        Ef: 78,
        Nk: 79,
        Ok: 80,
        nc: 81,
        Gl: 82,
        Hl: 83,
        Ii: 84,
        Kg: 85,
        Li: 105,
        xl: 106,
        uv: 107,
        Lk: 108,
        Bi: 111,
        Sk: 112,
        Tk: 113,
        Uk: 114,
        Eg: 115,
        Cg: 116,
        zi: 117,
        Mi: 118,
        Ni: 119,
        vi: 120,
        Gk: 121,
        Hk: 122,
        Ik: 123,
        Jk: 124,
        ap: 125,
        bp: 126,
        cp: 127,
        dp: 128,
        ep: 129,
        fp: 130,
        gp: 131,
        hp: 132,
        ip: 133,
        jp: 134,
        Kk: 135,
        kp: 136,
        lp: 137,
        mp: 138,
        np: 139,
        op: 140,
        pp: 141,
        qp: 142,
        si: 143,
        rp: 144,
        sp: 145,
        tp: 146,
        up: 147,
        vp: 148,
        wp: 149,
        jB: 149
    }, Fa = [{
        id: 0
    }, {
        id: 1
    }, {
        id: 2
    }, {
        id: 4,
        fd: -1,
        wc: -42,
        kc: 20,
        Re: "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\u00a9\u00c0\u00e0\u00c2\u00e2\u00c6\u00e6\u00c7\u00e7\u00c8\u00e8\u00c9\u00e9\u00ca\u00ea\u00cb\u00eb\u00ce\u00ee\u00cf\u00ef\u00d4\u00f4\u0152\u0153\u00d9\u00f9\u00db\u00fb\u00dc\u00fc\u00ab\u00bb\u20ac\u00c4\u00e4\u00c9\u00e9\u00d6\u00f6\u00dc\u00fc\u00df\u201e\u201c\u201d\u00b0\u0410\u0411\u0412\u0413\u0414\u0415\u0401\u0416\u0417\u0418\u0419\u041a\u041b\u041c\u041d\u041e\u041f\u0420\u0421\u0422\u0423\u0424\u0425\u0426\u0427\u0428\u0429\u042a\u042b\u042c\u042d\u042e\u042f\u0430\u0431\u0432\u0433\u0434\u0435\u0451\u0436\u0437\u0438\u0439\u043a\u043b\u043c\u043d\u043e\u043f\u0440\u0441\u0442\u0443\u0444\u0445\u0446\u0447\u0448\u0449\u044a\u044b\u044c\u044d\u044e\u044f",
        af: {},
        c: [4, 4, 33, 156, 41, 4, 38, 156, 83, 4, 61, 156, 148, 4, 41, 156, 193, 4, 73, 156, 270, 4, 38, 156, 312, 4, 19, 156, 335, 4, 44, 156, 383, 4, 41, 156, 428, 4, 54, 156, 486, 4, 43, 156, 533, 4, 22, 156, 559, 4, 46, 156, 609, 4, 23, 156, 636, 4, 51, 156, 691, 4, 54, 156, 749, 4, 23, 156, 776, 4, 53, 156, 833, 4, 44, 156, 881, 4, 48, 156, 933, 4, 51, 156, 4, 164, 49, 156, 57, 164, 52, 156, 113, 164, 55, 156, 172, 164, 41, 156, 217, 164, 24, 156, 245, 164, 24, 156, 273, 164, 59, 156, 336, 164, 36, 156, 376, 164, 51, 156, 431, 164, 44, 156, 479, 164, 62, 156, 545, 164, 51, 156, 600, 164, 51, 156, 655, 164, 58, 156, 717, 164, 48, 156, 769,
        164, 46, 156, 819, 164, 45, 156, 868, 164, 50, 156, 922, 164, 49, 156, 975, 164, 24, 156, 4, 324, 45, 156, 53, 324, 45, 156, 102, 324, 54, 156, 160, 324, 73, 156, 237, 324, 43, 156, 284, 324, 63, 156, 351, 324, 59, 156, 414, 324, 54, 156, 472, 324, 51, 156, 527, 324, 57, 156, 588, 324, 56, 156, 648, 324, 59, 156, 711, 324, 52, 156, 767, 324, 74, 156, 845, 324, 63, 156, 912, 324, 47, 156, 4, 484, 67, 156, 75, 484, 65, 156, 144, 484, 54, 156, 202, 484, 56, 156, 262, 484, 40, 156, 306, 484, 74, 156, 384, 484, 24, 156, 412, 484, 45, 156, 461, 484, 51, 156, 516, 484, 49, 156, 569, 484, 48, 156, 621, 484, 43, 156, 668, 484, 47, 156, 719,
        484, 42, 156, 765, 484, 43, 156, 812, 484, 25, 156, 841, 484, 39, 156, 884, 484, 50, 156, 938, 484, 22, 156, 4, 644, 69, 156, 77, 644, 40, 156, 121, 644, 37, 156, 162, 644, 45, 156, 211, 644, 63, 156, 278, 644, 43, 156, 325, 644, 44, 156, 373, 644, 52, 156, 429, 644, 46, 156, 479, 644, 54, 156, 537, 644, 73, 156, 614, 644, 59, 156, 677, 644, 54, 156, 735, 644, 58, 156, 797, 644, 57, 156, 858, 644, 25, 156, 887, 644, 42, 156, 933, 644, 49, 156, 4, 804, 75, 156, 83, 804, 51, 156, 138, 804, 44, 156, 186, 804, 51, 156, 241, 804, 47, 156, 292, 804, 83, 156, 379, 804, 62, 156, 445, 804, 54, 156, 503, 804, 43, 156, 550, 804, 45, 156, 599,
        804, 45, 156, 648, 804, 45, 156, 697, 804, 45, 156, 746, 804, 45, 156, 795, 804, 45, 156, 844, 804, 45, 156, 893, 804, 45, 156, 942, 804, 41, 156, 4, 964, 41, 156, 49, 964, 33, 156, 86, 964, 34, 156, 124, 964, 63, 156, 191, 964, 48, 156, 243, 964, 82, 156, 329, 964, 61, 156, 394, 964, 53, 156, 451, 964, 44, 156, 499, 964, 53, 156, 556, 964, 43, 156, 603, 964, 53, 156, 660, 964, 43, 156, 707, 964, 53, 156, 764, 964, 59, 156, 827, 964, 65, 156, 896, 964, 51, 156, 951, 964, 44, 156, 4, 1124, 45, 156, 53, 1124, 45, 156, 102, 1124, 63, 156, 169, 1124, 48, 156, 221, 1124, 53, 156, 278, 1124, 43, 156, 325, 1124, 53, 156, 382, 1124, 43,
        156, 429, 1124, 43, 156, 476, 1124, 43, 156, 523, 1124, 40, 156, 567, 1124, 65, 156, 636, 1124, 47, 156, 687, 1124, 50, 156, 741, 1124, 49, 156, 794, 1124, 64, 156, 862, 1124, 46, 156, 912, 1124, 46, 156, 4, 1284, 73, 156, 81, 1284, 46, 156, 131, 1284, 54, 156, 189, 1284, 54, 156, 247, 1284, 62, 156, 313, 1284, 62, 156, 379, 1284, 64, 156, 447, 1284, 52, 156, 503, 1284, 59, 156, 566, 1284, 53, 156, 623, 1284, 48, 156, 675, 1284, 49, 156, 728, 1284, 59, 156, 791, 1284, 55, 156, 850, 1284, 59, 156, 913, 1284, 55, 156, 4, 1444, 58, 156, 66, 1444, 49, 156, 119, 1444, 72, 156, 195, 1444, 83, 156, 282, 1444, 62, 156, 348, 1444,
        58, 156, 410, 1444, 50, 156, 464, 1444, 48, 156, 516, 1444, 67, 156, 587, 1444, 51, 156, 642, 1444, 44, 156, 690, 1444, 41, 156, 735, 1444, 39, 156, 778, 1444, 37, 156, 819, 1444, 41, 156, 864, 1444, 40, 156, 908, 1444, 40, 156, 952, 1444, 61, 156, 4, 1604, 38, 156, 46, 1604, 43, 156, 93, 1604, 43, 156, 140, 1604, 44, 156, 188, 1604, 45, 156, 237, 1604, 62, 156, 303, 1604, 42, 156, 349, 1604, 40, 156, 393, 1604, 49, 156, 446, 1604, 46, 156, 496, 1604, 38, 156, 538, 1604, 69, 156, 611, 1604, 42, 156, 657, 1604, 61, 156, 722, 1604, 43, 156, 769, 1604, 45, 156, 818, 1604, 40, 156, 862, 1604, 63, 156, 929, 1604, 65, 156, 4,
        1764, 51, 156, 59, 1764, 51, 156, 114, 1764, 40, 156, 158, 1764, 39, 156, 201, 1764, 60, 156, 265, 1764, 40, 156, 309, 1764, 112, 156]
    }, {
        id: 5,
        fd: 2,
        wc: -90,
        kc: 15,
        Re: "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\u00a9\u00c0\u00e0\u00c2\u00e2\u00c6\u00e6\u00c7\u00e7\u00c8\u00e8\u00c9\u00e9\u00ca\u00ea\u00cb\u00eb\u00ce\u00ee\u00cf\u00ef\u00d4\u00f4\u0152\u0153\u00d9\u00f9\u00db\u00fb\u00dc\u00fc\u00ab\u00bb\u20ac\u00c4\u00e4\u00c9\u00e9\u00d6\u00f6\u00dc\u00fc\u00df\u201e\u201c\u201d\u00b0\u0410\u0411\u0412\u0413\u0414\u0415\u0401\u0416\u0417\u0418\u0419\u041a\u041b\u041c\u041d\u041e\u041f\u0420\u0421\u0422\u0423\u0424\u0425\u0426\u0427\u0428\u0429\u042a\u042b\u042c\u042d\u042e\u042f\u0430\u0431\u0432\u0433\u0434\u0435\u0451\u0436\u0437\u0438\u0439\u043a\u043b\u043c\u043d\u043e\u043f\u0440\u0441\u0442\u0443\u0444\u0445\u0446\u0447\u0448\u0449\u044a\u044b\u044c\u044d\u044e\u044f",
        af: {},
        c: [4, 4, 16, 156, 24, 4, 19, 156, 47, 4, 35, 156, 86, 4, 21, 156, 111, 4, 43, 156, 158, 4, 19, 156, 181, 4, 7, 156, 192, 4, 24, 156, 220, 4, 23, 156, 247, 4, 30, 156, 281, 4, 24, 156, 309, 4, 9, 156, 322, 4, 25, 156, 351, 4, 10, 156, 365, 4, 28, 156, 397, 4, 31, 156, 432, 4, 10, 156, 446, 4, 29, 156, 479, 4, 24, 156, 507, 4, 26, 156, 537, 4, 29, 156, 570, 4, 28, 156, 602, 4, 29, 156, 635, 4, 31, 156, 670, 4, 21, 156, 695, 4, 10, 156, 709, 4, 10, 156, 723, 4, 33, 156, 760, 4, 19, 156, 783, 4, 28, 156, 815, 4, 24, 156, 843, 4, 36, 156, 883, 4, 28, 156, 915, 4, 28, 156, 947, 4, 32, 156, 983, 4, 27, 156, 4, 164, 25, 156, 33, 164, 24, 156, 61, 164,
        28, 156, 93, 164, 28, 156, 125, 164, 10, 156, 139, 164, 25, 156, 168, 164, 24, 156, 196, 164, 31, 156, 231, 164, 43, 156, 278, 164, 24, 156, 306, 164, 37, 156, 347, 164, 34, 156, 385, 164, 30, 156, 419, 164, 29, 156, 452, 164, 32, 156, 488, 164, 31, 156, 523, 164, 34, 156, 561, 164, 29, 156, 594, 164, 43, 156, 641, 164, 36, 156, 681, 164, 26, 156, 711, 164, 39, 156, 754, 164, 38, 156, 796, 164, 30, 156, 830, 164, 32, 156, 866, 164, 22, 156, 892, 164, 44, 156, 940, 164, 11, 156, 955, 164, 25, 156, 984, 164, 29, 156, 4, 324, 27, 156, 35, 324, 26, 156, 65, 324, 24, 156, 93, 324, 26, 156, 123, 324, 23, 156, 150, 324, 24, 156, 178, 324,
        11, 156, 193, 324, 20, 156, 217, 324, 28, 156, 249, 324, 9, 156, 262, 324, 41, 156, 307, 324, 21, 156, 332, 324, 20, 156, 356, 324, 25, 156, 385, 324, 36, 156, 425, 324, 22, 156, 451, 324, 24, 156, 479, 324, 29, 156, 512, 324, 26, 156, 542, 324, 31, 156, 577, 324, 43, 156, 624, 324, 34, 156, 662, 324, 30, 156, 696, 324, 33, 156, 733, 324, 32, 156, 769, 324, 12, 156, 785, 324, 22, 156, 811, 324, 27, 156, 842, 324, 45, 156, 891, 324, 29, 156, 924, 324, 24, 156, 952, 324, 29, 156, 985, 324, 26, 156, 4, 484, 49, 156, 57, 484, 36, 156, 97, 484, 30, 156, 131, 484, 23, 156, 158, 484, 24, 156, 186, 484, 24, 156, 214, 484, 24, 156, 242,
        484, 24, 156, 270, 484, 24, 156, 298, 484, 24, 156, 326, 484, 24, 156, 354, 484, 24, 156, 382, 484, 22, 156, 408, 484, 22, 156, 434, 484, 17, 156, 455, 484, 17, 156, 476, 484, 36, 156, 516, 484, 27, 156, 547, 484, 50, 156, 601, 484, 35, 156, 640, 484, 29, 156, 673, 484, 24, 156, 701, 484, 29, 156, 734, 484, 23, 156, 761, 484, 29, 156, 794, 484, 23, 156, 821, 484, 30, 156, 855, 484, 34, 156, 893, 484, 37, 156, 934, 484, 29, 156, 967, 484, 24, 156, 995, 484, 24, 156, 4, 644, 24, 156, 32, 644, 36, 156, 72, 644, 27, 156, 103, 644, 29, 156, 136, 644, 23, 156, 163, 644, 30, 156, 197, 644, 23, 156, 224, 644, 23, 156, 251, 644, 23, 156,
        278, 644, 22, 156, 304, 644, 38, 156, 346, 644, 26, 156, 376, 644, 28, 156, 408, 644, 28, 156, 440, 644, 38, 156, 482, 644, 25, 156, 511, 644, 25, 156, 540, 644, 44, 156, 588, 644, 26, 156, 618, 644, 30, 156, 652, 644, 30, 156, 686, 644, 37, 156, 727, 644, 36, 156, 767, 644, 37, 156, 808, 644, 29, 156, 841, 644, 34, 156, 879, 644, 30, 156, 913, 644, 28, 156, 945, 644, 27, 156, 976, 644, 34, 156, 4, 804, 31, 156, 39, 804, 34, 156, 77, 804, 31, 156, 112, 804, 33, 156, 149, 804, 28, 156, 181, 804, 43, 156, 228, 804, 51, 156, 283, 804, 36, 156, 323, 804, 33, 156, 360, 804, 28, 156, 392, 804, 27, 156, 423, 804, 40, 156, 467, 804, 29,
        156, 500, 804, 24, 156, 528, 804, 22, 156, 554, 804, 20, 156, 578, 804, 19, 156, 601, 804, 22, 156, 627, 804, 21, 156, 652, 804, 21, 156, 677, 804, 36, 156, 717, 804, 20, 156, 741, 804, 24, 156, 769, 804, 24, 156, 797, 804, 24, 156, 825, 804, 25, 156, 854, 804, 35, 156, 893, 804, 24, 156, 921, 804, 22, 156, 947, 804, 28, 156, 979, 804, 26, 156, 4, 964, 20, 156, 28, 964, 41, 156, 73, 964, 23, 156, 100, 964, 36, 156, 140, 964, 24, 156, 168, 964, 25, 156, 197, 964, 22, 156, 223, 964, 37, 156, 264, 964, 38, 156, 306, 964, 30, 156, 340, 964, 29, 156, 373, 964, 22, 156, 399, 964, 21, 156, 424, 964, 35, 156, 463, 964, 22, 156, 489, 964,
        112, 156]
    }, {
        id: 51,
        k: 393,
        j: 418,
        c: [2, 2, 218, 226, 224, 2, 151, 151, 2, 232, 157, 158, 224, 157, 98, 62, 326, 157, 48, 45, 379, 2, 49, 59, 432, 2, 55, 57, 379, 65, 53, 63, 163, 232, 146, 147, 2, 394, 153, 163, 2, 561, 153, 166, 2, 731, 156, 169, 2, 904, 163, 175, 169, 904, 159, 175, 159, 394, 159, 159, 313, 232, 150, 150, 322, 394, 144, 150, 159, 561, 138, 146, 2, 1083, 302, 303, 301, 561, 107, 158, 412, 561, 96, 157, 2, 1390, 252, 268, 2, 1662, 278, 305, 2, 1971, 371, 397, 2, 2372, 385, 396, 2, 2772, 377, 386],
        g: [103, 130, 122, 133, 119, 131, 145, 176, 168, 182, 171, 177, 168, 182, 160, 176, 119, 128, 115, 115, 115, 112,
        115, 112, 115, 112, 119, 115, 122, 134, 131, 143, 137, 143, 140, 147, 47, 56, 143, 133, 155, 133, 69, 83, 50, 37, 6, -2, 0, -5, 8, 2]
    }, {
        id: 52,
        k: 552,
        j: 552,
        c: [0, 0, 88, 85, 0, 85, 46, 152, 46, 85, 106, 149, 0, 237, 78, 162, 78, 237, 93, 155, 0, 399, 88, 158, 152, 85, 46, 152, 88, 399, 144, 145, 0, 557, 138, 141, 0, 698, 145, 145, 0, 843, 146, 141, 0, 984, 161, 140, 0, 1124, 130, 155],
        g: [235, 190, 256, 121, 226, 124, 240, 111, 233, 118, 235, 115, 256, 121, 213, 220, 219, 232, 212, 220, 211, 232, 203, 178, 211, 273]
    }, {
        id: 53,
        k: 290,
        j: 228,
        c: [0, 0, 42, 38, 0, 38, 43, 36, 0, 74, 46, 33, 0, 107, 46, 33, 0, 140, 44, 36, 0, 176, 42,
        38, 0, 214, 40, 41, 0, 255, 43, 43, 0, 298, 40, 41, 0, 339, 45, 33, 0, 372, 48, 31, 0, 403, 49, 38, 0, 441, 50, 45, 0, 486, 52, 53, 0, 539, 50, 39, 0, 578, 49, 28, 0, 606, 47, 31, 0, 637, 45, 33, 0, 670, 53, 53, 0, 723, 43, 53, 0, 776, 32, 54, 32, 776, 23, 53, 52, 486, 12, 53, 43, 723, 12, 53, 0, 830, 23, 55, 23, 830, 32, 54, 0, 885, 43, 53],
        g: [123, 98, 122, 99, 121, 100, 121, 100, 122, 99, 123, 98, 124, 96, 122, 95, 124, 96, 121, 100, 120, 101, 119, 97, 119, 94, 118, 90, 119, 97, 119, 103, 120, 101, 121, 100, 118, 89, 123, 89, 128, 89, 133, 89, 138, 89, 138, 89, 133, 88, 128, 89, 123, 89]
    }, {
        id: 56,
        fd: 2,
        wc: 2,
        kc: 10,
        Re: "0123456789",
        af: {},
        c: [5, 5, 49, 156, 59, 5, 16, 156, 80, 5, 48, 156, 133, 5, 38, 156, 176, 5, 41, 156, 222, 5, 45, 156, 272, 5, 43, 156, 320, 5, 47, 156, 372, 5, 49, 156, 426, 5, 35, 156]
    }, {
        id: 57,
        k: 2560,
        j: 122,
        c: [0, 0, 203, 99, 0, 99, 203, 99],
        g: [2347, 9, 2347, 9]
    }, {
        id: 59,
        k: 552,
        j: 552,
        c: [0, 0, 246, 268, 0, 268, 334, 370, 246, 0, 205, 231, 0, 638, 308, 353, 0, 991, 387, 461, 0, 1452, 324, 399, 0, 1851, 335, 328, 0, 2179, 296, 266, 0, 2445, 240, 230, 296, 2179, 207, 217, 308, 638, 204, 205, 240, 2445, 200, 194, 308, 843, 195, 133],
        g: [145, 116, 76, 38, 166, 132, 113, 56, 75, -2, 113, 34, 87, 82, 102, 114, 128, 124, 148, 130, 149, 134, 151,
        138, 153, 141]
    }, {
        id: 60,
        k: 250,
        j: 250,
        c: [0, 0, 139, 170, 139, 0, 142, 169, 281, 0, 148, 163, 429, 0, 155, 155, 584, 0, 163, 148, 747, 0, 169, 142, 584, 148, 171, 139, 584, 287, 169, 141, 755, 148, 165, 145, 755, 293, 159, 151, 429, 155, 153, 159, 281, 163, 147, 164, 139, 169, 141, 169, 0, 170, 139, 170],
        g: [55, 40, 54, 41, 51, 44, 47, 48, 43, 51, 40, 54, 39, 56, 40, 55, 42, 53, 46, 50, 48, 46, 51, 44, 54, 41, 55, 40]
    }, {
        id: 61,
        k: 449,
        j: 446,
        c: [0, 0, 308, 285, 0, 285, 302, 282, 0, 567, 297, 281, 0, 848, 296, 277, 0, 1125, 293, 274, 0, 1399, 293, 273, 0, 1672, 295, 271, 0, 1943, 297, 269, 0, 2212, 239, 226, 239, 2212, 241, 223,
        0, 2438, 244, 221, 244, 2438, 249, 219],
        g: [83, 82, 87, 84, 90, 86, 91, 90, 93, 94, 92, 99, 90, 104, 88, 111, 101, 119, 97, 128, 92, 138, 86, 148]
    }, {
        id: 62,
        k: 275,
        j: 275,
        c: [0, 0, 140, 144, 0, 144, 42, 37],
        g: [69, 62, 117, 119]
    }, {
        id: 63,
        k: 833,
        j: 250,
        c: [0, 0, 566, 93],
        g: [133, 76]
    }, {
        id: 64,
        k: 250,
        j: 250,
        c: [0, 0, 155, 154, 0, 154, 181, 210, 0, 364, 185, 180, 0, 544, 183, 178],
        g: [47, 50, 32, 36, 35, 40, 35, 40]
    }, {
        id: 65,
        k: 275,
        j: 275,
        c: [0, 0, 125, 126, 0, 126, 37, 35],
        g: [78, 76, 122, 121]
    }, {
        id: 66,
        k: 275,
        j: 275,
        c: [0, 0, 125, 126, 0, 126, 37, 35],
        g: [75, 76, 119, 121]
    }, {
        id: 67,
        k: 552,
        j: 552,
        c: [2, 2, 234, 221,
        240, 2, 77, 76, 240, 82, 70, 76, 321, 2, 64, 76, 321, 82, 58, 76, 389, 2, 51, 76, 389, 82, 46, 76, 444, 2, 40, 77, 444, 83, 34, 77, 488, 2, 28, 78, 488, 84, 28, 78, 520, 2, 35, 77, 559, 2, 42, 77, 605, 2, 48, 77, 657, 2, 56, 77, 717, 2, 63, 77, 784, 2, 69, 77, 857, 2, 76, 77, 857, 83, 83, 78, 2, 227, 175, 175, 181, 227, 175, 175, 360, 227, 175, 175, 539, 227, 175, 175, 718, 227, 175, 175, 2, 406, 175, 175, 181, 406, 175, 175, 360, 406, 175, 175, 539, 406, 175, 175, 718, 406, 175, 175, 2, 585, 175, 175, 181, 585, 175, 175, 360, 585, 175, 175, 539, 585, 175, 175, 718, 585, 175, 175, 2, 764, 175, 175, 181, 764, 175, 175, 360, 764, 175, 175,
        539, 764, 175, 175, 718, 764, 175, 175, 2, 943, 175, 175, 181, 943, 175, 175, 360, 943, 175, 175, 539, 943, 175, 175, 718, 943, 175, 175, 2, 1122, 175, 175, 2, 1301, 175, 175, 2, 1480, 175, 175, 2, 1659, 175, 175, 2, 1838, 175, 175, 181, 1122, 175, 175, 360, 1122, 175, 175, 539, 1122, 175, 175, 718, 1122, 175, 175, 181, 1301, 175, 175, 181, 1480, 175, 175, 181, 1659, 175, 175, 360, 1301, 229, 231, 593, 1301, 229, 231, 360, 1536, 490, 492],
        g: [156, 156, 233, 231, 236, 231, 239, 231, 242, 231, 246, 231, 248, 231, 251, 231, 254, 231, 257, 231, 257, 231, 253, 231, 250, 231, 247, 231, 243, 231, 240, 231, 237, 231, 234, 231,
        230, 230, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 184, 155, 159, 155, 159, 27, 21]
    }, {
        id: 68,
        k: 100,
        j: 100,
        c: [0, 0, 84, 85, 84, 0, 58, 85, 142, 0, 32, 85, 174, 0, 12, 85, 186, 0, 28, 85, 214, 0, 44, 85, 258, 0, 60, 85, 318, 0, 70, 85, 388, 0, 78, 85, 466, 0, 84, 85, 550, 0, 84, 85]
    }, {
        id: 69,
        k: 833,
        j: 250,
        c: [0,
        0, 453, 93],
        g: [191, 76]
    }, {
        id: 70,
        k: 833,
        j: 250,
        c: [0, 0, 333, 93],
        g: [251, 79]
    }, {
        id: 71,
        k: 833,
        j: 250,
        c: [0, 0, 212, 93],
        g: [310, 79]
    }, {
        id: 72,
        k: 640,
        j: 640,
        c: [0, 0, 291, 302, 291, 0, 363, 409, 654, 0, 383, 309, 1037, 0, 314, 335, 1351, 0, 326, 334, 1677, 0, 374, 330, 291, 409, 405, 492, 2051, 0, 350, 334, 0, 302, 201, 207, 0, 509, 201, 206, 0, 715, 201, 207, 0, 922, 201, 207, 0, 1129, 201, 206, 0, 1335, 201, 210, 0, 1545, 201, 213, 0, 1758, 201, 215, 0, 1973, 201, 219, 0, 2192, 201, 222, 0, 2414, 201, 223, 0, 2637, 201, 222, 0, 2859, 201, 224, 0, 3083, 201, 224, 0, 3307, 201, 224, 0, 3531, 201, 221, 0, 3752, 201, 218,
        2401, 0, 201, 214, 2602, 0, 201, 211, 2803, 0, 222, 196, 2803, 196, 210, 201, 3025, 0, 203, 209, 3228, 0, 197, 214, 3425, 0, 193, 217, 3618, 0, 194, 219, 3812, 0, 197, 210, 291, 901, 200, 202, 3812, 210, 204, 197, 291, 1103, 208, 199, 291, 1302, 212, 202, 291, 1504, 214, 205, 291, 1709, 216, 206, 291, 1915, 204, 226, 291, 2141, 203, 213, 495, 1915, 201, 210, 494, 2141, 201, 208, 291, 2354, 201, 203, 3025, 209, 201, 200, 491, 901, 201, 200, 492, 2354, 201, 200, 291, 2557, 201, 200, 291, 2757, 201, 207, 291, 2964, 201, 216, 492, 2557, 204, 194, 291, 3180, 221, 171, 291, 3351, 249, 197, 291, 3548, 225, 201, 291, 3749,
        205, 205, 492, 2964, 202, 213, 696, 409, 201, 222, 897, 409, 201, 222, 1098, 409, 205, 221, 1303, 409, 229, 213, 1532, 409, 243, 205, 0, 3970, 153, 86, 654, 309, 140, 89, 1775, 409, 212, 196, 1987, 409, 208, 209, 496, 3749, 197, 233, 696, 631, 186, 247, 882, 631, 181, 245, 1063, 631, 186, 243, 1249, 631, 194, 234, 1443, 631, 199, 230, 2195, 409, 199, 221, 1642, 631, 199, 223, 1841, 631, 199, 226, 2040, 631, 199, 228, 2239, 631, 199, 230, 2438, 631, 199, 230, 2637, 631, 199, 230, 2836, 631, 195, 234, 3031, 631, 190, 238, 3221, 631, 194, 231, 2394, 409, 201, 217, 2595, 409, 207, 209, 2802, 409, 218, 202, 3020, 409,
        211, 206, 3231, 409, 206, 210, 3437, 409, 210, 213, 3647, 409, 215, 218, 3415, 631, 220, 223, 3862, 409, 224, 216, 3635, 631, 219, 212, 492, 2757, 195, 205, 3854, 631, 195, 207, 696, 878, 195, 210, 891, 878, 217, 214, 891, 1092, 225, 215, 891, 1307, 219, 215, 696, 1088, 195, 215, 696, 1303, 195, 215, 696, 1518, 195, 215, 891, 1522, 217, 215, 891, 1737, 225, 215, 891, 1952, 223, 218, 891, 2170, 219, 222, 891, 2392, 215, 224, 891, 2616, 216, 216, 1108, 878, 210, 206, 1318, 878, 218, 202, 1536, 878, 205, 190, 1741, 878, 203, 194, 1944, 878, 202, 206, 2146, 878, 203, 214, 891, 2832, 204, 217, 891, 3049, 204, 216, 2349,
        878, 204, 213, 2553, 878, 205, 204, 2758, 878, 205, 192, 2401, 214, 201, 195, 2963, 878, 201, 206, 3164, 878, 204, 212, 3368, 878, 205, 214, 891, 3265, 207, 215, 891, 3480, 208, 216, 3573, 878, 205, 205, 3778, 878, 226, 202, 891, 3696, 212, 204, 696, 1733, 195, 210, 696, 1943, 189, 213, 696, 2156, 190, 218, 696, 2374, 193, 222, 1116, 1092, 198, 213, 1314, 1092, 203, 210, 1517, 1092, 207, 202, 1724, 1092, 211, 204, 1935, 1092, 214, 207, 2149, 1092, 216, 211, 2365, 1092, 216, 212, 2581, 1092, 216, 212, 2797, 1092, 216, 212, 3013, 1092, 216, 212, 3229, 1092, 216, 212, 3445, 1092, 216, 212, 3661, 1092, 216, 212,
        3877, 1092, 216, 212, 1116, 1305, 216, 212, 1116, 1517, 212, 216, 1116, 1733, 206, 222, 1116, 1955, 202, 225, 1116, 2180, 205, 222, 1116, 2402, 210, 213, 1116, 2615, 212, 208, 1116, 2823, 198, 223, 1116, 3046, 196, 232, 696, 2596, 195, 236, 1116, 3278, 198, 236, 1116, 3514, 206, 238, 1116, 3752, 211, 226, 1332, 1305, 217, 207, 891, 3900, 213, 195, 1549, 1305, 212, 179, 1761, 1305, 221, 178, 1982, 1305, 221, 181, 2203, 1305, 215, 180, 2418, 1305, 212, 179, 2630, 1305, 221, 177, 2851, 1305, 221, 180, 3072, 1305, 215, 180, 3287, 1305, 212, 179, 3499, 1305, 221, 177, 3720, 1305, 221, 180, 1332, 1512, 215, 180,
        1332, 1692, 212, 179, 1547, 1512, 216, 176, 1332, 1871, 213, 175, 696, 2832, 194, 205, 696, 3037, 188, 236, 696, 3273, 194, 233, 1332, 2046, 210, 202, 1332, 2248, 204, 194, 1332, 2442, 202, 204],
        g: [173, 274, 137, 156, 133, 207, 152, 237, 154, 244, 134, 240, 107, 104, 148, 242, 220, 227, 220, 227, 220, 227, 220, 227, 220, 227, 220, 224, 220, 221, 220, 218, 220, 215, 220, 212, 220, 211, 220, 211, 220, 210, 220, 210, 220, 210, 220, 213, 220, 216, 220, 220, 220, 223, 211, 238, 216, 233, 220, 225, 223, 220, 225, 217, 224, 215, 223, 224, 221, 232, 219, 237, 217, 235, 215, 232, 214, 229, 213, 228, 217, 208, 218, 221, 219,
        224, 219, 226, 219, 231, 219, 234, 219, 234, 219, 234, 219, 234, 219, 226, 219, 218, 218, 240, 210, 263, 192, 237, 204, 233, 217, 229, 220, 221, 220, 212, 220, 212, 217, 212, 202, 221, 195, 229, 240, 264, 249, 265, 215, 238, 217, 225, 223, 201, 228, 187, 231, 189, 228, 191, 223, 200, 220, 204, 220, 213, 220, 211, 220, 208, 220, 206, 220, 204, 220, 204, 220, 204, 222, 200, 225, 196, 223, 203, 220, 217, 216, 225, 211, 232, 216, 228, 218, 224, 212, 221, 208, 216, 205, 211, 202, 218, 208, 222, 232, 229, 232, 227, 232, 224, 210, 220, 202, 219, 208, 219, 232, 219, 232, 219, 232, 219, 210, 219, 202, 219, 202, 216, 205, 212, 207,
        210, 208, 218, 217, 228, 211, 232, 216, 244, 218, 240, 219, 227, 220, 219, 220, 216, 220, 217, 220, 221, 218, 230, 216, 242, 220, 239, 220, 228, 217, 222, 216, 220, 214, 219, 213, 218, 216, 229, 207, 232, 214, 230, 224, 224, 227, 221, 226, 216, 225, 212, 222, 220, 219, 224, 218, 231, 216, 229, 214, 226, 213, 222, 213, 221, 213, 221, 213, 221, 213, 221, 213, 221, 213, 221, 213, 221, 213, 221, 213, 221, 215, 217, 218, 211, 220, 208, 218, 212, 216, 221, 215, 226, 222, 210, 223, 201, 223, 197, 222, 197, 219, 195, 216, 206, 211, 225, 213, 238, 213, 254, 207, 255, 207, 252, 210, 253, 213, 254, 207, 256, 207, 253, 210, 253, 213,
        254, 207, 256, 207, 253, 210, 253, 213, 254, 211, 257, 214, 258, 227, 227, 230, 195, 226, 199, 215, 232, 218, 239, 220, 230]
    }, {
        id: 73,
        k: 275,
        j: 275,
        c: [0, 0, 137, 139, 137, 0, 105, 100, 0, 139, 235, 235, 0, 374, 240, 246],
        g: [65, 70, 84, 86, 18, 19, 13, 14]
    }, {
        id: 74,
        k: 833,
        j: 250,
        c: [0, 0, 507, 85, 0, 85, 507, 100, 0, 185, 507, 100, 0, 285, 507, 97, 0, 382, 507, 92],
        g: [163, 82, 163, 73, 163, 71, 163, 70, 163, 75]
    }, {
        id: 75,
        k: 276,
        j: 276,
        c: [0, 0, 84, 128, 84, 0, 68, 109, 152, 0, 50, 109, 0, 128, 140, 121, 0, 249, 148, 147]
    }, {
        id: 76,
        k: 761,
        j: 761,
        c: [0, 0, 220, 239, 0, 239, 206, 290, 0, 529, 205, 290, 0, 819, 220, 246, 0,
        1065, 237, 219, 0, 1284, 226, 231, 220, 0, 18, 17, 238, 0, 11, 11, 206, 239, 38, 39],
        g: [271, 262, 286, 232, 287, 232, 271, 249, 262, 272, 268, 266, 382, 376, 385, 379, 372, 365]
    }, {
        id: 77,
        k: 998,
        j: 1058,
        c: [3, 3, 148, 12, 3, 21, 39, 187, 48, 21, 182, 150, 236, 21, 144, 130, 3, 214, 244, 233, 253, 214, 159, 143, 157, 3, 49, 9, 386, 21, 89, 84, 3, 453, 102, 148, 3, 607, 260, 315],
        g: [585, 767, 160, 241, 412, 548, 307, 397, 184, 663, 530, 224, 676, 540, 540, 425, 351, 211, 684, 200]
    }, {
        id: 78,
        k: 431,
        j: 431,
        c: [0, 0, 294, 335, 294, 0, 297, 336, 0, 335, 291, 252, 591, 0, 307, 293, 0, 587, 276, 224],
        g: [53, 6, 51, 3, 55, 78, 47, 57,
        63, 98]
    }, {
        id: 79,
        k: 833,
        j: 250,
        c: [0, 0, 194, 127, 0, 127, 201, 103, 0, 230, 204, 96, 0, 326, 193, 142, 0, 468, 194, 111],
        g: [319, 69, 316, 81, 314, 87, 319, 55, 319, 77]
    }, {
        id: 80,
        k: 833,
        j: 250,
        c: [0, 0, 302, 123, 302, 0, 319, 99, 621, 0, 322, 95, 302, 99, 292, 136, 0, 123, 302, 111],
        g: [268, 70, 260, 85, 258, 87, 273, 58, 268, 77]
    }, {
        id: 58,
        k: 2028,
        j: 1597,
        c: [0, 0, 239, 239],
        g: [811, 344]
    }, {
        id: 3,
        k: 936,
        j: 418,
        c: [0, 0, 735, 174, 0, 174, 727, 173],
        g: [102, 116, 107, 117]
    }, {
        id: 6,
        k: 2560,
        j: 1440,
        c: [2, 2, 58, 1303, 64, 2, 65, 1303, 133, 2, 305, 405, 133, 411, 835, 789],
        g: [1216, 67, 1274, 67, 1096, 31, 455, 578]
    }, {
        id: 40,
        k: 2560,
        j: 1440,
        c: [2, 2, 2560, 1440, 2566, 2, 2560, 920, 5130, 2, 1781, 1781],
        g: [0, 0, 0, 520, 388, -172]
    }, {
        id: 41,
        k: 193,
        j: 193,
        c: [0, 0, 187, 149, 0, 149, 187, 149],
        g: [4, 23, 4, 23]
    }, {
        id: 42,
        k: 2560,
        j: 1440,
        c: [0, 0, 792, 792, 792, 0, 7, 8, 799, 0, 7, 8, 806, 0, 7, 7, 813, 0, 7, 7, 820, 0, 7, 8],
        g: [880, 283, 1289, 403, 1289, 665, 1289, 770, 1289, 1026, 1289, 531]
    }, {
        id: 43,
        k: 833,
        j: 250,
        c: [0, 0, 128, 93],
        g: [133, 76]
    }, {
        id: 44,
        k: 1076,
        j: 983,
        c: [0, 0, 868, 795, 0, 795, 267, 300, 267, 795, 305, 135],
        g: [101, 113, 434, 316, 408, 405]
    }, {
        id: 45,
        k: 218,
        j: 218,
        c: [0, 0, 190, 196, 0, 196, 202, 208, 0, 404,
        143, 77, 0, 481, 141, 77, 0, 558, 143, 77, 0, 635, 142, 77],
        g: [10, 10, 5, 7, 58, 139, 59, 139, 58, 139, 58, 139]
    }, {
        id: 46,
        k: 1129,
        j: 1092,
        c: [2, 2, 229, 183, 235, 2, 166, 174, 405, 2, 146, 69, 405, 75, 146, 85, 555, 2, 144, 140, 703, 2, 173, 166, 2, 189, 162, 168, 2, 361, 169, 170, 2, 535, 166, 171, 2, 710, 166, 175, 172, 710, 166, 172, 342, 710, 166, 174, 512, 710, 166, 174, 682, 710, 166, 174, 2, 889, 477, 221, 880, 2, 58, 58, 2, 1114, 434, 472, 2, 1590, 445, 481, 440, 1114, 434, 472, 451, 1590, 434, 472, 2, 2075, 434, 481, 440, 2075, 434, 473, 2, 2560, 434, 473, 440, 2560, 467, 473, 2, 3037, 436, 459, 168, 189, 103, 124, 880,
        64, 84, 103, 275, 189, 103, 124, 382, 189, 83, 103],
        g: [464, 598, 499, 616, 513, 714, 511, 695, 513, 622, 496, 632, 503, 645, 497, 627, 499, 619, 499, 617, 499, 618, 499, 616, 499, 616, 499, 616, 339, 558, 548, 667, 362, 365, 358, 364, 362, 364, 362, 364, 362, 364, 362, 363, 362, 363, 329, 363, 360, 363, 533, 586, 543, 595, 534, 586, 543, 595]
    }, {
        id: 47,
        k: 679,
        j: 206,
        c: [0, 0, 208, 206, 0, 206, 205, 204, 0, 410, 92, 95, 92, 410, 92, 95],
        g: [0, -2, 1, 1, 457, 90, 563, 90]
    }, {
        id: 48,
        k: 679,
        j: 206,
        c: [0, 0, 291, 49],
        g: [143, 106]
    }, {
        id: 49,
        k: 936,
        j: 418,
        c: [0, 0, 420, 174, 0, 174, 419, 173],
        g: [262, 115, 263, 115]
    }, {
        id: 50,
        k: 2560,
        j: 122,
        c: [0, 0, 96, 97, 96, 0, 96, 97],
        g: [2237, 9, 2237, 9]
    }, {
        id: 54,
        k: 2560,
        j: 380,
        c: [0, 0, 2560, 310]
    }, {
        id: 55,
        k: 2560,
        j: 1597,
        c: [1, 1, 7, 7, 10, 1, 7, 7, 19, 1, 7, 7, 28, 1, 7, 7, 37, 1, 7, 7, 46, 1, 8, 7, 56, 1, 7, 7, 65, 1, 7, 7, 74, 1, 7, 7, 83, 1, 7, 7, 92, 1, 7, 7, 101, 1, 7, 7, 110, 1, 7, 7, 1, 10, 228, 218, 231, 10, 210, 203, 1, 230, 626, 11, 1, 243, 889, 398],
        g: [1052, 556, 1261, 556, 1467, 556, 1261, 378, 1264, 771, 1117, 721, 1461, 721, 1264, 721, 1264, 840, 1261, 1186, 1495, 993, 1052, 993, 1617, 768, 816, 350, 825, 358, 603, 465, 153, 89]
    }, {
        id: 108,
        c: [0, 0, 198, 194, 0, 194, 198, 194, 0, 388, 198, 194]
    }, {
        id: 111,
        c: [0, 0, 202, 81],
        g: [316, 87],
        k: 833,
        j: 250
    }, {
        id: 112,
        c: [0, 0, 319, 83],
        g: [260, 87],
        k: 833,
        j: 250
    }, {
        id: 113,
        c: [0, 0, 444, 86],
        g: [195, 81],
        k: 833,
        j: 250
    }, {
        id: 114,
        c: [0, 0, 559, 89],
        g: [137, 77],
        k: 833,
        j: 250
    }, {
        id: 115,
        c: [0, 0, 101, 102, 0, 102, 101, 102, 0, 204, 101, 102, 0, 306, 101, 102],
        g: [219, 29, 218, 29, 219, 29, 219, 29],
        k: 534,
        j: 160
    }, {
        id: 116,
        k: 275,
        j: 275,
        c: [0, 0, 4, 4, 2, 2, 89, 116, 95, 2, 177, 37, 276, 2, 187, 77, 95, 43, 87, 61],
        g: [143, 196, 93, 75, 50, 84, 45, 39, 95, 35]
    }, {
        id: 117,
        k: 25,
        j: 25,
        c: [0, 0, 25, 25]
    }, {
        id: C.vi,
        c: [0, 0, 291, 302, 0, 302, 363, 409, 363, 302, 383, 309, 0, 711,
        405, 492, 405, 711, 374, 330, 0, 1203, 350, 334, 0, 1537, 314, 335, 350, 1203, 326, 334, 291, 0, 339, 288, 630, 0, 275, 162, 350, 1537, 372, 317],
        g: [173, 274, 137, 156, 133, 207, 107, 104, 134, 240, 148, 242, 152, 237, 154, 244, 145, 259, 181, 392, 123, 236],
        k: 640,
        j: 640
    }, {
        id: C.nc,
        c: [1, 1, 1064, 1064, 1067, 1, 532, 495, 1601, 1, 145, 286, 1601, 289, 38, 38, 1748, 1, 204, 174, 1748, 177, 183, 154],
        g: [55, 154, 55, 686, 442, 543, 568, 667, 484, 1083, 493, 1093],
        k: 1174,
        j: 1498
    }, {
        id: C.Gk,
        xa: 1.25,
        Ca: i,
        c: [0, 0, 2048, 1152],
        g: [0, 0],
        k: 2048,
        j: 2305
    }, {
        id: C.Hk,
        xa: 1.25,
        Ca: i,
        c: [0, 0, 2048, 708],
        g: [0, 896],
        k: 2048,
        j: 2305
    }, {
        id: C.Ik,
        xa: 1.25,
        Ca: i,
        c: [0, 0, 2048, 1152],
        g: [0, 0],
        k: 2048,
        j: 2304
    }, {
        id: C.Jk,
        xa: 1.25,
        Ca: i,
        c: [0, 0, 2048, 874],
        g: [0, 835],
        k: 2048,
        j: 2304
    }, {
        id: C.ap,
        xa: 1.25,
        Ca: i,
        c: [0, 0, 2048, 1152],
        g: [0, 0],
        k: 2048,
        j: 2304
    }, {
        id: C.bp,
        xa: 1.25,
        Ca: i,
        c: [0, 0, 2048, 1052],
        g: [0, 756],
        k: 2048,
        j: 2304
    }, {
        id: C.cp,
        xa: 1.25,
        Ca: i,
        c: [0, 0, 2048, 1152],
        g: [0, 0],
        k: 2048,
        j: 2304
    }, {
        id: C.dp,
        xa: 1.25,
        Ca: i,
        c: [0, 0, 2048, 1072],
        g: [0, 768],
        k: 2048,
        j: 2304
    }, {
        id: C.ep,
        xa: 1.25,
        Ca: i,
        c: [0, 0, 2048, 1152],
        g: [0, 0],
        k: 2048,
        j: 2304
    }, {
        id: C.fp,
        xa: 1.25,
        Ca: i,
        c: [0, 0, 2048, 1124],
        g: [0, 624],
        k: 2048,
        j: 2304
    }, {
        id: C.gp,
        xa: 1.25,
        Ca: i,
        c: [0, 0, 2048, 1152],
        g: [0, 0],
        k: 2048,
        j: 1866
    }, {
        id: C.hp,
        xa: 1.25,
        Ca: i,
        c: [0, 0, 2048, 948],
        g: [0, 760],
        k: 2048,
        j: 1866
    }, {
        id: C.ip,
        xa: 1.25,
        Ca: i,
        c: [0, 0, 2048, 1152],
        g: [0, 0],
        k: 2048,
        j: 2304
    }, {
        id: C.jp,
        xa: 1.25,
        Ca: i,
        c: [0, 0, 2048, 886],
        g: [0, 881],
        k: 2048,
        j: 2304
    }, {
        id: C.Kk,
        xa: 1.25,
        Ca: i,
        c: [0, 0, 2048, 1152, 0, 0, 4, 3],
        g: [0, 0, 1028.5, 581],
        k: 2048,
        j: 2304
    }, {
        id: C.kp,
        xa: 1.25,
        Ca: i,
        c: [0, 0, 2048, 642, 0, 0, 4, 3],
        g: [0, 889, 1028.5, 581],
        k: 2048,
        j: 2304
    }, {
        id: C.lp,
        xa: 1.25,
        Ca: i,
        c: [0, 0, 2048, 1152],
        g: [0, 0],
        k: 2048,
        j: 2304
    }, {
        id: C.mp,
        xa: 1.25,
        Ca: i,
        c: [0, 0, 2048, 858],
        g: [0, 780],
        k: 2048,
        j: 1638
    }, {
        id: C.np,
        xa: 1.25,
        Ca: i,
        c: [0, 0, 2048, 1152],
        g: [0, 0],
        k: 2048,
        j: 2304
    }, {
        id: C.op,
        xa: 1.25,
        Ca: i,
        c: [0, 0, 2048, 887],
        g: [0, 792],
        k: 2048,
        j: 2304
    }, {
        id: C.pp,
        xa: 1.25,
        Ca: i,
        c: [0, 0, 2048, 1153],
        g: [0, -1],
        k: 2048,
        j: 2304
    }, {
        id: C.qp,
        xa: 1.25,
        Ca: i,
        c: [0, 0, 2048, 980],
        g: [0, 802],
        k: 2048,
        j: 2304
    }, {
        id: C.si,
        xa: 1.25,
        Ca: i,
        c: [0, 0, 2048, 1152],
        g: [0, 0],
        k: 2048,
        j: 1866
    }, {
        id: C.rp,
        xa: 1.25,
        Ca: i,
        c: [0, 0, 2048, 1152],
        g: [0, 0],
        k: 2048,
        j: 1866
    }, {
        id: C.sp,
        xa: 1.25,
        Ca: i,
        c: [0, 0, 2048, 1152],
        g: [0, 0],
        k: 2048,
        j: 1866
    }, {
        id: C.tp,
        xa: 1.25,
        Ca: i,
        c: [0, 0, 2048, 1152],
        g: [0, 0],
        k: 2048,
        j: 1866
    }, {
        id: C.up,
        xa: 1.25,
        Ca: i,
        c: [0, 0, 2048, 1152],
        g: [0, 0],
        k: 2048,
        j: 1866
    }, {
        id: C.vp,
        xa: 1.25,
        Ca: i,
        c: [0, 0, 2048, 1152],
        g: [0, 0],
        k: 2048,
        j: 1866
    }, {
        id: C.wp,
        xa: 1.25,
        Ca: i,
        c: [0, 0, 2048, 1152],
        g: [0, 0],
        k: 2048,
        j: 1866
    }],
        F = {
            i: 0,
            V: 1,
            ni: 2,
            Bv: 3
        };

    function G(a, b) {
        this.path = a;
        this.type = b
    }
    var H = [];
    H[C.Du] = new G("ZEPTOLAB.HTM", F.i);
    H[C.Gu] = new G("LOADERBA.HTM", F.i);
    H[C.Bu] = new G("DEFAULT.HTM", F.i);
    H[C.Ku] = new G("MENU_BUT.HTM", F.i);
    H[C.Ag] = new G("BIG_FONT.PNG", F.ni);
    H[C.mi] = new G("SMALL_FO.PNG", F.ni);
    H[C.Pu] = new G("MENU_LOA.HTM", F.i);
    H[C.ga] = new G("tap", F.V);
    H[C.Cv] = new G("MENU_STR.HTM", F.Bv);
    H[C.cq] = new G("button", F.V);
    H[C.ul] = new G("bubble_break", F.V);
    H[C.Jg] = new G("bubble", F.V);
    H[C.vl] = new G("candy_break", F.V);
    H[C.yl] = new G("monster_chewing", F.V);
    H[C.zl] = new G("monster_close", F.V);
    H[C.Al] = new G("monster_open", F.V);
    H[C.Bl] = new G("monster_sad", F.V);
    H[C.gq] = new G("ring", F.V);
    H[C.El] = new G("rope_bleak_1", F.V);
    H[C.iq] = new G("rope_bleak_2", F.V);
    H[C.jq] = new G("rope_bleak_3", F.V);
    H[C.kq] = new G("rope_bleak_4", F.V);
    H[C.Fl] = new G("rope_get", F.V);
    H[C.Ll] = new G("star_1", F.V);
    H[C.lq] = new G("star_2", F.V);
    H[C.nq] = new G("star_3", F.V);
    H[C.Ad] = new G("electric", F.V);
    H[C.Cl] = new G("pump_1", F.V);
    H[C.dq] = new G("pump_2", F.V);
    H[C.fq] = new G("pump_3", F.V);
    H[C.Dl] = new G("pump_4", F.V);
    H[C.Il] = new G("spider_activate", F.V);
    H[C.Jl] = new G("spider_fall", F.V);
    H[C.Kl] = new G("spider_win", F.V);
    H[C.Ml] = new G("wheel", F.V);
    H[C.Nl] = new G("win", F.V);
    H[C.Ji] = new G("gravity_off", F.V);
    H[C.Ki] = new G("gravity_on", F.V);
    H[C.wl] = new G("candy_link", F.V);
    H[C.tl] = new G("bouncer", F.V);
    H[C.Hu] = new G("MENU_BGR.HTM", F.i);
    H[C.Iu] = new G("MENU_B-2.HTM", F.i);
    H[C.Tu] = new G("MENU_POP.HTM", F.i);
    H[C.Ju] = new G("MENU_B-3.HTM", F.i);
    H[C.Qu] = new G("MENU_LOG.HTM", F.i);
    H[C.Ou] = new G("MENU_LEV.HTM", F.i);
    H[C.Ru] = new G("MENU_PAC.HTM", F.i);
    H[C.Mu] = new G("MENU_EXT.HTM", F.i);
    H[C.Nu] = new G("MENU_E-2.HTM", F.i);
    H[C.Lu] = new G("MENU_B-4.HTM", F.i);
    H[C.Eu] = new G("HUD_BUTT.HTM", F.i);
    H[C.Xc] = new G("OBJ_CAND.PNG", F.i);
    H[C.Fg] = new G("OBJ_SPID.PNG", F.i);
    H[C.Cu] = new G("CONFETTI.HTM", F.i);
    H[C.Su] = new G("MENU_PAU.HTM", F.i);
    H[C.Uu] = new G("MENU_RES.HTM", F.i);
    H[C.Ak] = new G("FONT_NUM.PNG", F.ni);
    H[C.Fu] = new G("HUD_BU-2.HTM", F.i);
    H[C.Vu] = new G("MENU_R-2.HTM", F.i);
    H[C.Zk] = new G("OBJ_STAR.PNG", F.i);
    H[C.Dg] = new G("OBJ_BUBB.PNG", F.i);
    H[C.Pk] = new G("OBJ_BU-2.PNG", F.i);
    H[C.yi] = new G("OBJ_HOOK.PNG", F.i);
    H[C.Yk] = new G("OBJ_SPIK.PNG", F.i);
    H[C.wi] = new G("OBJ_BU-3.PNG", F.i);
    H[C.Qk] = new G("OBJ_HO-2.PNG", F.i);
    H[C.Rk] = new G("OBJ_HO-3.PNG", F.i);
    H[C.Yc] = new G("OBJ_ST-2.PNG", F.i);
    H[C.Mk] = new G("HUD_STAR.PNG", F.i);
    H[C.Xk] = new G("OBJ_SP-2.PNG", F.i);
    H[C.Wk] = new G("OBJ_SP-3.PNG", F.i);
    H[C.Vk] = new G("OBJ_SP-4.PNG", F.i);
    H[C.ti] = new G("CHAR_ANI.PNG", F.i);
    H[C.Df] = new G("OBJ_HO-4.HTM", F.i);
    H[C.xi] = new G("OBJ_ELEC.HTM", F.i);
    H[C.Ge] = new G("OBJ_HO-5.HTM", F.i);
    H[C.Ai] = new G("OBJ_PUMP.PNG", F.i);
    H[C.$k] = new G("TUTORIAL.PNG", F.i);
    H[C.Ef] = new G("OBJ_HAT.HTM", F.i);
    H[C.Nk] = new G("OBJ_BOUN.PNG", F.i);
    H[C.Ok] = new G("OBJ_BO-2.PNG", F.i);
    H[C.Li] = new G("menu_music", F.V);
    H[C.xl] = new G("game_music", F.V);
    H[C.uv] = new G("game_music2", F.V);
    H[C.Lk] = new G("OBJ_DRAW.PNG", F.i);
    H[C.Bi] = new G("OBJ_ROTA.HTM", F.i);
    H[C.Sk] = new G("OBJ_RO-2.HTM", F.i);
    H[C.Tk] = new G("OBJ_RO-3.HTM", F.i);
    H[C.Uk] = new G("OBJ_RO-4.HTM", F.i);
    H[C.Eg] = new G("OBJ_RO-5.HTM", F.i);
    H[C.Cg] = new G("OBJ_BEE_.HTM", F.i);
    H[C.zi] = new G("OBJ_POLL.HTM", F.i);
    H[C.Mi] = new G("spike_rotate_in", F.V);
    H[C.Ni] = new G("spike_rotate_out", F.V);
    H[C.vi] = new G("CHAR_SUP.PNG", F.i);
    H[C.nc] = new G("OBJ_VINI.HTM", F.i);
    H[C.Gl] = new G("scratch_in", F.V);
    H[C.Hl] = new G("scratch_out", F.V);
    H[C.Ii] = new G("buzz", F.V);
    H[C.Kg] = new G("teleport", F.V);
    H[C.Gk] = new G("BGR_01_P.PNG", F.i);
    H[C.Hk] = new G("BGR_01-2.PNG", F.i);
    H[C.Ik] = new G("BGR_02_P.PNG", F.i);
    H[C.Jk] = new G("BGR_02-2.PNG", F.i);
    H[C.ap] = new G("BGR_03_P.HTM", F.i);
    H[C.bp] = new G("BGR_03-2.HTM", F.i);
    H[C.cp] = new G("BGR_04_P.HTM", F.i);
    H[C.dp] = new G("BGR_04-2.HTM", F.i);
    H[C.ep] = new G("BGR_05_P.HTM", F.i);
    H[C.fp] = new G("BGR_05-2.HTM", F.i);
    H[C.gp] = new G("BGR_06_P.HTM", F.i);
    H[C.hp] = new G("BGR_06-2.HTM", F.i);
    H[C.ip] = new G("BGR_07_P.HTM", F.i);
    H[C.jp] = new G("BGR_07-2.HTM", F.i);
    H[C.Kk] = new G("BGR_08_P.HTM", F.i);
    H[C.kp] = new G("BGR_08-2.HTM", F.i);
    H[C.lp] = new G("BGR_09_P.HTM", F.i);
    H[C.mp] = new G("BGR_09-2.HTM", F.i);
    H[C.np] = new G("BGR_10_P.HTM", F.i);
    H[C.op] = new G("BGR_10-2.HTM", F.i);
    H[C.pp] = new G("BGR_11_P.HTM", F.i);
    H[C.qp] = new G("BGR_11-2.HTM", F.i);
    H[C.si] = new G("BGR_IE.PNG", F.i);
    H[C.rp] = new G("BGR_TIME.HTM", F.i);
    H[C.sp] = new G("BGR_TI-2.HTM", F.i);
    H[C.tp] = new G("BGR_TI-3.HTM", F.i);
    H[C.up] = new G("BGR_TI-4.HTM", F.i);
    H[C.vp] = new G("BGR_TI-5.HTM", F.i);
    H[C.wp] = new G("BGR_TI-6.HTM", F.i);

    function Ga(a, b) {
        return Math.round(1E4 * a * b) / 1E4
    }
    var Ha = {};
    Ha.Kv = [C.Li, C.cq, C.ga];
    Ha.Hv = [C.ti, C.Qk, C.Rk, C.yi, C.Xc, C.Nk, C.Ok, C.wi, C.Dg, C.Pk, C.Ai, C.Fg, C.Vk, C.Wk, C.Xk, C.Yk, C.Yc, C.Zk, C.Mk, C.$k, C.Lk, C.vi];
    Ha.mB = [C.Cg, C.zi];
    Ha.nB = [C.Ii, C.Ji, C.Ki];
    Ha.rB = [C.Ef, C.Ge, C.Bi, C.Sk, C.Tk, C.Uk, C.Eg];
    Ha.sB = [C.Mi, C.Ni, C.Kg];
    Ha.XA = [C.Ge, C.Df, C.xi, C.Ef, C.Bi, C.Sk, C.Tk, C.Uk, C.Eg, C.Cg, C.zi, C.nc];
    Ha.SA = [C.Ef, C.Ge, C.xi];
    Ha.TA = [C.Kg, C.Ad];
    Ha.Gv = [C.mi, C.Ag, C.Ak];
    Ha.Iv = [C.xl, C.tl, C.Jg, C.ul, C.vl, C.wl, C.yl, C.zl, C.Al, C.Bl, C.Cl, C.dq, C.fq, C.Dl, C.El, C.iq, C.jq, C.kq, C.Fl, C.Il, C.Jl, C.Kl, C.Ll, C.lq, C.nq, C.Nl];
    Ha.YA = [C.Ad, C.Ji, C.Ki, C.gq, C.Ml, C.Mi, C.Ni, C.Gl, C.Hl, C.Ii, C.Kg];
    Ha.Jv = "BBTN_BGD.PNG box_lock.png box_nav_menu.png BOX_OMNO.PNG BOXCUTTE.PNG boxmore_bgd.png buttonsprite.png fb.png FBTN_BGD.PNG FLAGS.PNG fun-omnom.png gamecomplete.jpg LBTN_BGD.PNG level_bgd.png level_bgd_small.png leveltape.png leveltape_left.png leveltape_right.png MBTN_BGD.PNG menu_result_en.png menu_result_fr.png menu_result_gr.png menu_result_ru.png menubg.jpg options_stars_bgd.png options_stars_bgd_small.png perfect_mark.png ph_logo.png result_line.png SBTN_BGD.PNG shadow.png star_result.png star_result_small.png startbg.jpg TAPEROLL.PNG".split(" ");
    Ha.vu = ["drawing-bg.png"];
    Ha.gB = "android.png box.png comic.png facebook.png footer_dot.png footer_finger.png full_version_bg.png full_version_text.png game_bg.png ipad.png iphone.png more_close.png more_text.png more_wallpaper.png more_window_bg.png more.png papercraft.png privacy.png shop_over.png shop.png terms.png twitter.png video_bg.png youtube.png zepto.png zeptologo.png".split(" ");
    var Ia = {
        Hg: "NORMAL",
        $o: "IEPINNED",
        Dp: "MORECOMING",
        Lp: "PURCHASE"
    }, Ja, Ka = {
        zg: 0,
        oi: 1,
        ji: 2,
        Gi: 3,
        cl: 4,
        cm: 5,
        bl: 6,
        zk: 7,
        al: 8,
        hl: 9,
        po: 10,
        Ir: function (a) {
            switch (a) {
                case "de":
                    return Ka.ji;
                case "fr":
                    return Ka.oi;
                case "ru":
                    return Ka.Gi;
                case "en":
                case "en_GB":
                case "en_US":
                    return Ka.zg;
                case "ko":
                    return Ka.cl;
                case "zh":
                    return Ka.cm;
                case "ja":
                    return Ka.bl;
                case "es":
                    return Ka.zk;
                case "it":
                    return Ka.al;
                case "nl":
                    return Ka.hl;
                case "br":
                    return Ka.po
            }
            if (3 <= a.length) switch (a.substr(0, 3)) {
                case "de-":
                    return Ka.ji;
                case "fr-":
                    return Ka.oi;
                case "ru-":
                    return Ka.Gi;
                case "en-":
                    return Ka.zg;
                case "ko-":
                    return Ka.cl;
                case "zh-":
                    return Ka.cm;
                case "ja-":
                    return Ka.bl;
                case "es-":
                    return Ka.zk;
                case "it-":
                    return Ka.al;
                case "nl-":
                    return Ka.hl;
                case "br-":
                    return Ka.po
            }
            return j
        },
        rA: function (a) {
            switch (a) {
                case Ka.ji:
                    return "de";
                case Ka.oi:
                    return "fr";
                case Ka.Gi:
                    return "ru";
                case Ka.cl:
                    return "ko";
                case Ka.cm:
                    return "zh";
                case Ka.bl:
                    return "ja";
                case Ka.zk:
                    return "es";
                case Ka.al:
                    return "it";
                case Ka.hl:
                    return "nl";
                default:
                    return "en"
            }
        }
    };
    Ja = Ka;
    var I = {
        bk: "http://www.cuttherope.ie",
        PB: "http://www.cuttherope.ie/dev",
        Dw: l,
        Ew: i,
        Cr: i,
        Ym: [Ja.zg],
        lm: [{
            l: "Cardboard Box",
            n: "Carton",
            m: "Pappkiste",
            o: "\u041a\u0430\u0440\u0442\u043e\u043d\u043d\u0430\u044f"
        }, {
            l: "Fabric Box",
            n: "Tissu",
            m: "Stoffkiste",
            o: "\u0422\u043a\u0430\u043d\u0435\u0432\u0430\u044f"
        }, {
            l: "Toy Box",
            n: "Jouets",
            m: "Spielzeugkiste",
            o: "\u0418\u0433\u0440\u0443\u0448\u0435\u0447\u043d\u0430\u044f"
        }, {
            l: "New levels\ncoming soon!",
            n: "De nouveaux niveaux bient\u00f4t disponibles!",
            m: "Neue Level\nkommen bald!",
            o: "\u041d\u043e\u0432\u044b\u0435 \u0443\u0440\u043e\u0432\u043d\u0438\n\u043d\u0430 \u043f\u043e\u0434\u0445\u043e\u0434\u0435!"
        }],
        fr: ["box1_bgd.png", "box2_bgd.png", "box3_bgd.png", "boxmore_bgd.png"],
        er: ["box1_border.png", "box2_bor.png", "box3_bor.png", j],
        km: ["levelbg1.jpg", "levelbg2.jpg", "levelbg3.jpg"],
        pw: [Ia.Hg, Ia.Hg, Ia.$o, Ia.Dp],
        Xt: [0, 20, 40, j],
        pA: [0, 1, 7, j],
        bA: [l, l, l, l],
        hs: Ha.Kv,
        Jr: Ha.Iv,
        fy: Ha.Jv.concat(Ha.vu),
        ax: Ha.Hv,
        Si: [{
            yh: [{
                Ua: [{
                    name: 0,
                    Oa: 32,
                    width: 320,
                    height: 480
                }, {
                    name: 1,
                    pa: 1,
                    fa: 1,
                    I: l
                }],
                Ma: [{
                    name: 52,
                    x: 156,
                    y: 139
                }, {
                    name: 100,
                    x: 159,
                    y: 51,
                    length: 90,
                    q: l,
                    K: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 2,
                    x: 161,
                    y: 427
                }, {
                    name: 3,
                    x: 162,
                    y: 230,
                    timeout: -1
                }, {
                    name: 3,
                    x: 161,
                    y: 295,
                    timeout: -1
                }, {
                    name: 3,
                    x: 161,
                    y: 361,
                    timeout: -1
                }, {
                    name: 4,
                    x: 177,
                    y: 31,
                    Ja: "en",
                    text: "Slide across to cut the rope",
                    width: 130
                }, {
                    name: 4,
                    x: 182,
                    y: 335,
                    Ja: "en",
                    text: "Deliver candy to Om Nom",
                    width: 130
                }, {
                    name: 5,
                    x: 57,
                    y: 119,
                    Ja: "en",
                    oa: 100,
                    Ba: 100
                }, {
                    name: 8,
                    x: 231,
                    y: 416,
                    Ja: "en",
                    oa: 100,
                    Ba: 100
                }, {
                    name: 5,
                    x: 109,
                    y: 119,
                    Ja: "en",
                    oa: 100,
                    Ba: 100
                }, {
                    name: 5,
                    x: 161,
                    y: 119,
                    Ja: "en",
                    oa: 100,
                    Ba: 100
                }, {
                    name: 5,
                    x: 213,
                    y: 119,
                    Ja: "en",
                    oa: 100,
                    Ba: 100
                }, {
                    name: 5,
                    x: 265,
                    y: 119,
                    Ja: "en",
                    oa: 100,
                    Ba: 100
                }, {
                    name: 14,
                    x: 73,
                    y: 145,
                    Ja: "en",
                    oa: 100,
                    Ba: 100,
                    fa: 2
                }]
            }, {
                Ua: [{
                    name: 0,
                    Oa: 32,
                    width: 320,
                    height: 480
                }, {
                    name: 1,
                    pa: 1,
                    fa: 1,
                    I: l
                }],
                Ma: [{
                    name: 52,
                    x: 69,
                    y: 203
                }, {
                    name: 100,
                    x: 52,
                    y: 70,
                    length: 90,
                    q: l,
                    K: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 100,
                    x: 162,
                    y: 69,
                    length: 170,
                    q: l,
                    K: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 2,
                    x: 264,
                    y: 419
                }, {
                    name: 3,
                    x: 54,
                    y: 250,
                    timeout: -1
                }, {
                    name: 3,
                    x: 53,
                    y: 369,
                    timeout: -1
                }, {
                    name: 3,
                    x: 280,
                    y: 250,
                    timeout: -1
                }, {
                    name: 100,
                    x: 275,
                    y: 69,
                    length: 320,
                    q: l,
                    K: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 4,
                    x: 133,
                    y: 285,
                    Ja: "en",
                    text: "Collect as many stars as you can",
                    width: 150
                }, {
                    name: 13,
                    x: 113,
                    y: 321,
                    Ja: "en",
                    oa: 100,
                    Ba: 100
                }]
            }, {
                Ua: [{
                    name: 0,
                    Oa: 32,
                    width: 320,
                    height: 480
                }, {
                    name: 1,
                    fa: 1,
                    pa: 1
                }],
                Ma: [{
                    name: 52,
                    x: 158,
                    y: 187
                }, {
                    name: 2,
                    x: 262,
                    y: 362
                }, {
                    name: 100,
                    x: 161,
                    y: 315,
                    length: 93,
                    q: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l
                }, {
                    name: 100,
                    x: 289,
                    y: 186,
                    length: 105,
                    q: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l
                }, {
                    name: 100,
                    x: 162,
                    y: 57,
                    length: 93,
                    q: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l
                }, {
                    name: 100,
                    x: 33,
                    y: 186,
                    length: 105,
                    q: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l
                }, {
                    name: 3,
                    x: 159,
                    y: 226,
                    timeout: -1
                }, {
                    name: 3,
                    x: 32,
                    y: 312,
                    timeout: -1
                }, {
                    name: 3,
                    x: 161,
                    y: 434,
                    timeout: -1
                }]
            }, {
                Ua: [{
                    name: 0,
                    Oa: 32,
                    width: 320,
                    height: 480
                }, {
                    name: 1,
                    pa: 1,
                    fa: 1,
                    I: l
                }],
                Ma: [{
                    name: 52,
                    x: 101,
                    y: 238
                }, {
                    name: 2,
                    x: 219,
                    y: 431
                }, {
                    name: 3,
                    x: 102,
                    y: 326,
                    timeout: -1
                }, {
                    name: 3,
                    x: 217,
                    y: 209,
                    timeout: -1
                }, {
                    name: 3,
                    x: 217,
                    y: 74,
                    timeout: -1
                }, {
                    name: 100,
                    x: 96,
                    y: 139,
                    length: 90,
                    q: l,
                    K: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 54,
                    x: 99,
                    y: 391
                }, {
                    name: 100,
                    x: 219,
                    y: 252,
                    length: 140,
                    q: l,
                    K: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 4,
                    x: 50,
                    y: 44,
                    Ja: "en",
                    text: "Press to pop the bubble",
                    width: 120,
                    fa: 1
                }, {
                    name: 4,
                    x: 157,
                    y: 293,
                    Ja: "en",
                    text: "The bubble will lift the candy up",
                    width: 120
                }, {
                    name: 8,
                    x: 167,
                    y: 391,
                    Ja: "en",
                    b: 15,
                    oa: 100,
                    Ba: 100
                }, {
                    name: 9,
                    x: 218,
                    y: 78,
                    Ja: "en",
                    oa: 100,
                    Ba: 10,
                    fa: 1
                }, {
                    name: 102,
                    x: 269,
                    y: 426,
                    b: 10,
                    zm: 1
                }]
            }, {
                Ua: [{
                    name: 0,
                    Oa: 32,
                    width: 320,
                    height: 480
                }, {
                    name: 1,
                    pa: 1,
                    fa: 1,
                    I: l
                }],
                Ma: [{
                    name: 52,
                    x: 266,
                    y: 161
                }, {
                    name: 100,
                    x: 155,
                    y: 250,
                    length: 95,
                    q: l,
                    K: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 100,
                    x: 153,
                    y: 110,
                    length: 100,
                    q: l,
                    K: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 2,
                    x: 155,
                    y: 430
                }, {
                    name: 3,
                    x: 37,
                    y: 264,
                    timeout: -1
                }, {
                    name: 3,
                    x: 152,
                    y: 70,
                    timeout: -1
                }, {
                    name: 3,
                    x: 276,
                    y: 264,
                    timeout: -1
                }, {
                    name: 54,
                    x: 252,
                    y: 367
                }, {
                    name: 4,
                    x: 17,
                    y: 301,
                    Ja: "en",
                    text: "You can restart the level by pressing the",
                    width: 200
                }, {
                    name: 12,
                    x: 85,
                    y: 373,
                    Ja: "en",
                    oa: 100,
                    Ba: 100
                }, {
                    name: 4,
                    x: 85,
                    y: 348,
                    Ja: "en",
                    text: "button",
                    width: 100
                }]
            }, {
                Ua: [{
                    name: 0,
                    Oa: 32,
                    width: 320,
                    height: 480
                }, {
                    name: 1,
                    fa: 1,
                    pa: 1
                }],
                Ma: [{
                    name: 52,
                    x: 161,
                    y: 350
                }, {
                    name: 2,
                    x: 163,
                    y: 67
                }, {
                    name: 100,
                    x: 243,
                    y: 290,
                    length: 120,
                    q: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l
                }, {
                    name: 100,
                    x: 83,
                    y: 401,
                    length: 90,
                    q: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l
                }, {
                    name: 54,
                    x: 165,
                    y: 421
                }, {
                    name: 100,
                    x: 165,
                    y: 123,
                    length: 200,
                    q: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l
                }, {
                    name: 3,
                    x: 97,
                    y: 294,
                    timeout: -1
                }, {
                    name: 3,
                    x: 166,
                    y: 422,
                    timeout: -1
                }, {
                    name: 3,
                    x: 97,
                    y: 228,
                    timeout: -1
                }]
            }, {
                Ua: [{
                    name: 0,
                    Oa: 32,
                    width: 320,
                    height: 480
                }, {
                    name: 1,
                    pa: 1,
                    fa: 1,
                    I: l
                }],
                Ma: [{
                    name: 52,
                    x: 64,
                    y: 139
                }, {
                    name: 2,
                    x: 163,
                    y: 427
                }, {
                    name: 100,
                    x: 162,
                    y: 68,
                    length: 100,
                    q: l,
                    K: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 100,
                    x: 66,
                    y: 68,
                    length: 50,
                    q: l,
                    K: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 100,
                    x: 163,
                    y: 163,
                    length: 90,
                    q: l,
                    K: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 100,
                    x: 162,
                    y: 259,
                    length: 130,
                    q: l,
                    K: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 58,
                    x: 161,
                    y: 329,
                    b: 0,
                    size: 2
                }, {
                    name: 58,
                    x: 159,
                    y: 229,
                    b: 0,
                    size: 2
                }, {
                    name: 3,
                    x: 250,
                    y: 165,
                    timeout: -1
                }, {
                    name: 3,
                    x: 64,
                    y: 276,
                    timeout: -1
                }, {
                    name: 3,
                    x: 248,
                    y: 275,
                    timeout: -1
                }, {
                    name: 10,
                    x: 249,
                    y: 347,
                    Ja: "en",
                    oa: 100,
                    Ba: 100
                }, {
                    name: 4,
                    x: 190,
                    y: 359,
                    Ja: "en",
                    text: "Keep the candy away from spikes",
                    width: 120
                }]
            }, {
                Ua: [{
                    name: 0,
                    Oa: 32,
                    width: 640,
                    height: 480
                }, {
                    name: 1,
                    pa: 1,
                    fa: 1,
                    I: l
                }],
                Ma: [{
                    name: 2,
                    x: 514,
                    y: 418
                }, {
                    name: 100,
                    x: 224,
                    y: 177,
                    length: 100,
                    q: l,
                    K: l,
                    r: 45,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 100,
                    x: 448,
                    y: 337,
                    length: 100,
                    q: l,
                    K: l,
                    r: 45,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 100,
                    x: 335,
                    y: 256,
                    length: 100,
                    q: l,
                    K: l,
                    r: 45,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 52,
                    x: 178,
                    y: 103
                }, {
                    name: 3,
                    x: 222,
                    y: 269,
                    timeout: -1
                }, {
                    name: 3,
                    x: 448,
                    y: 430,
                    timeout: -1
                }, {
                    name: 3,
                    x: 328,
                    y: 345,
                    timeout: -1
                }, {
                    name: 100,
                    x: 180,
                    y: 31,
                    length: 50,
                    q: l,
                    K: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 4,
                    x: 273,
                    y: 39,
                    Ja: "en",
                    text: "Automatic ropes appear when candy gets into their area",
                    width: 140
                }, {
                    name: 8,
                    x: 316,
                    y: 164,
                    Ja: "en",
                    oa: 100,
                    Ba: 100
                }]
            }, {
                Ua: [{
                    name: 0,
                    Oa: 32,
                    width: 320,
                    height: 480
                }, {
                    name: 1,
                    pa: 1,
                    fa: 1,
                    I: l
                }],
                Ma: [{
                    name: 52,
                    x: 160,
                    y: 316
                }, {
                    name: 2,
                    x: 162,
                    y: 439
                }, {
                    name: 54,
                    x: 160,
                    y: 317
                }, {
                    name: 100,
                    x: 36,
                    y: 413,
                    length: 130,
                    q: l,
                    K: l,
                    eg: l,
                    sh: l,
                    r: -1,
                    ke: l,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 100,
                    x: 291,
                    y: 413,
                    length: 130,
                    q: l,
                    K: l,
                    eg: l,
                    sh: l,
                    r: -1,
                    ke: l,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 3,
                    x: 162,
                    y: 381,
                    oa: 100,
                    Ba: 0,
                    timeout: -1
                }, {
                    name: 100,
                    x: 93,
                    y: 231,
                    length: 100,
                    q: l,
                    K: l,
                    eg: l,
                    sh: l,
                    r: 70,
                    ke: l,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 100,
                    x: 231,
                    y: 231,
                    length: 100,
                    q: l,
                    K: l,
                    eg: l,
                    sh: l,
                    r: 70,
                    ke: l,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 59,
                    x: 232,
                    y: 232,
                    b: 0,
                    size: 3,
                    path: "0,0",
                    oa: 40,
                    Ba: 40,
                    wf: l
                }, {
                    name: 59,
                    x: 90,
                    y: 232,
                    b: 0,
                    size: 3,
                    path: "0,0",
                    oa: -40,
                    Ba: -40,
                    wf: l
                }, {
                    name: 3,
                    x: 161,
                    y: 32,
                    timeout: -1
                }, {
                    name: 3,
                    x: 161,
                    y: 73,
                    timeout: -1
                }]
            }]
        }, {
            yh: [{
                Ua: [{
                    name: 0,
                    Oa: 32,
                    width: 320,
                    height: 480
                }, {
                    name: 1,
                    pa: 1,
                    fa: 1,
                    I: l
                }],
                Ma: [{
                    name: 52,
                    x: 161,
                    y: 220
                }, {
                    name: 2,
                    x: 254,
                    y: 416
                }, {
                    name: 3,
                    x: 299,
                    y: 89,
                    timeout: -1
                }, {
                    name: 3,
                    x: 20,
                    y: 89,
                    timeout: -1
                }, {
                    name: 3,
                    x: 161,
                    y: 171,
                    timeout: -1
                }, {
                    name: 55,
                    x: 42,
                    y: 237,
                    b: 0
                }, {
                    name: 55,
                    x: 277,
                    y: 233,
                    b: 180
                }, {
                    name: 100,
                    x: 162,
                    y: 88,
                    length: 110,
                    q: l,
                    K: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 55,
                    x: 161,
                    y: 334,
                    b: -90
                }, {
                    name: 4,
                    x: 22,
                    y: 357,
                    Ja: "en",
                    text: "Tap the Air Cushion to blow objects",
                    width: 180
                }, {
                    name: 8,
                    x: 101,
                    y: 347,
                    Ja: "en",
                    b: 180,
                    oa: 100,
                    Ba: 100
                }]
            }, {
                Ua: [{
                    name: 0,
                    Oa: 32,
                    width: 320,
                    height: 480
                }, {
                    name: 1,
                    fa: 1,
                    pa: 1
                }],
                Ma: [{
                    name: 52,
                    x: 215,
                    y: 210
                }, {
                    name: 2,
                    x: 190,
                    y: 322
                }, {
                    name: 55,
                    x: 284,
                    y: 208,
                    b: -180
                }, {
                    name: 100,
                    x: 222,
                    y: 82,
                    length: 90,
                    q: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l
                }, {
                    name: 100,
                    x: 101,
                    y: 209,
                    length: 95,
                    q: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l
                }, {
                    name: 3,
                    x: 99,
                    y: 253,
                    timeout: -1
                }, {
                    name: 3,
                    x: 98,
                    y: 345,
                    timeout: -1
                }, {
                    name: 3,
                    x: 98,
                    y: 82,
                    timeout: -1
                }, {
                    name: 55,
                    x: 37,
                    y: 343,
                    b: 0
                }, {
                    name: 57,
                    x: 37,
                    y: 257,
                    b: 0,
                    size: 1
                }, {
                    name: 54,
                    x: 97,
                    y: 144
                }, {
                    name: 60,
                    x: 220,
                    y: 256,
                    b: 0,
                    size: 4
                }]
            }, {
                Ua: [{
                    name: 0,
                    Oa: 32,
                    width: 640,
                    height: 480
                }, {
                    name: 1,
                    pa: 1,
                    fa: 1,
                    I: l
                }],
                Ma: [{
                    name: 52,
                    x: 321,
                    y: 213
                }, {
                    name: 2,
                    x: 431,
                    y: 386
                }, {
                    name: 100,
                    x: 323,
                    y: 47,
                    length: 130,
                    q: l,
                    K: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 55,
                    x: 183,
                    y: 224,
                    b: 0
                }, {
                    name: 100,
                    x: 323,
                    y: 167,
                    length: 200,
                    q: l,
                    K: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 100,
                    x: 323,
                    y: 105,
                    length: 170,
                    q: l,
                    K: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 3,
                    x: 320,
                    y: 399,
                    timeout: -1
                }, {
                    name: 57,
                    x: 323,
                    y: 347,
                    b: 0,
                    size: 1
                }, {
                    name: 3,
                    x: 422,
                    y: 161,
                    timeout: -1
                }, {
                    name: 3,
                    x: 322,
                    y: 302,
                    timeout: -1
                }]
            }, {
                Ua: [{
                    name: 0,
                    Oa: 32,
                    width: 640,
                    height: 480
                }, {
                    name: 1,
                    pa: 1,
                    fa: 1,
                    I: l
                }],
                Ma: [{
                    name: 2,
                    x: 401,
                    y: 423
                }, {
                    name: 3,
                    x: 226,
                    y: 158,
                    timeout: -1
                }, {
                    name: 3,
                    x: 402,
                    y: 160,
                    timeout: -1
                }, {
                    name: 55,
                    x: 151,
                    y: 130,
                    b: 0
                }, {
                    name: 3,
                    x: 529,
                    y: 158,
                    timeout: -1
                }, {
                    name: 54,
                    x: 400,
                    y: 351
                }, {
                    name: 54,
                    x: 314,
                    y: 351
                }, {
                    name: 52,
                    x: 528,
                    y: 225
                }, {
                    name: 100,
                    x: 529,
                    y: 87,
                    length: 100,
                    q: l,
                    K: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 100,
                    x: 306,
                    y: 87,
                    length: 250,
                    q: l,
                    K: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 100,
                    x: 529,
                    y: 352,
                    length: 90,
                    q: l,
                    K: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }]
            }, {
                Ua: [{
                    name: 0,
                    Oa: 32,
                    width: 320,
                    height: 480
                }, {
                    name: 1,
                    fa: 1,
                    pa: 1
                }],
                Ma: [{
                    name: 2,
                    x: 219,
                    y: 433
                }, {
                    name: 54,
                    x: 100,
                    y: 176
                }, {
                    name: 54,
                    x: 159,
                    y: 178
                }, {
                    name: 54,
                    x: 218,
                    y: 178
                }, {
                    name: 54,
                    x: 100,
                    y: 242
                }, {
                    name: 54,
                    x: 159,
                    y: 244
                }, {
                    name: 54,
                    x: 218,
                    y: 244
                }, {
                    name: 54,
                    x: 100,
                    y: 308
                }, {
                    name: 54,
                    x: 159,
                    y: 310
                }, {
                    name: 54,
                    x: 218,
                    y: 310
                }, {
                    name: 54,
                    x: 102,
                    y: 373
                }, {
                    name: 54,
                    x: 161,
                    y: 375
                }, {
                    name: 54,
                    x: 220,
                    y: 375
                }, {
                    name: 54,
                    x: 98,
                    y: 109
                }, {
                    name: 54,
                    x: 220,
                    y: 110
                }, {
                    name: 3,
                    x: 99,
                    y: 110,
                    timeout: -1
                }, {
                    name: 3,
                    x: 218,
                    y: 244,
                    timeout: -1
                }, {
                    name: 3,
                    x: 103,
                    y: 372,
                    timeout: -1
                }, {
                    name: 52,
                    x: 157,
                    y: 97
                }, {
                    name: 55,
                    x: 36,
                    y: 376,
                    b: -20
                }, {
                    name: 55,
                    x: 35,
                    y: 247,
                    b: -20
                }, {
                    name: 55,
                    x: 284,
                    y: 245,
                    b: 200
                }, {
                    name: 55,
                    x: 284,
                    y: 374,
                    b: 200
                }, {
                    name: 54,
                    x: 40,
                    y: 312
                }, {
                    name: 54,
                    x: 277,
                    y: 310
                }, {
                    name: 54,
                    x: 280,
                    y: 178
                }, {
                    name: 54,
                    x: 37,
                    y: 180
                }, {
                    name: 100,
                    x: 163,
                    y: 33,
                    length: 50,
                    q: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l
                }, {
                    name: 54,
                    x: 280,
                    y: 111
                }, {
                    name: 54,
                    x: 37,
                    y: 108
                }]
            }, {
                Ua: [{
                    name: 0,
                    Oa: 32,
                    width: 640,
                    height: 480
                }, {
                    name: 1,
                    pa: 1,
                    fa: 1,
                    I: l
                }],
                Ma: [{
                    name: 52,
                    x: 390,
                    y: 125
                }, {
                    name: 2,
                    x: 318,
                    y: 431
                }, {
                    name: 100,
                    x: 391,
                    y: 46,
                    length: 40,
                    q: l,
                    K: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 100,
                    x: 323,
                    y: 225,
                    length: 70,
                    q: l,
                    K: l,
                    r: 80,
                    t: -1,
                    A: l,
                    w: 0,
                    e: i,
                    O: "L"
                }, {
                    name: 57,
                    x: 375,
                    y: 406,
                    b: 90,
                    size: 1
                }, {
                    name: 57,
                    x: 256,
                    y: 407,
                    b: 90,
                    size: 1
                }, {
                    name: 4,
                    x: 211,
                    y: 300,
                    Ja: "en",
                    text: "Cut the rope before the spider reaches the candy",
                    width: 240
                }, {
                    name: 13,
                    x: 194,
                    y: 335,
                    Ja: "en",
                    oa: 100,
                    Ba: 100
                }, {
                    name: 3,
                    x: 372,
                    y: 223,
                    timeout: -1
                }, {
                    name: 3,
                    x: 230,
                    y: 287,
                    timeout: -1
                }, {
                    name: 3,
                    x: 317,
                    y: 377,
                    timeout: -1
                }]
            }, {
                Ua: [{
                    name: 0,
                    Oa: 32,
                    width: 640,
                    height: 480
                }, {
                    name: 1,
                    pa: 1,
                    fa: 1,
                    I: l
                }],
                Ma: [{
                    name: 2,
                    x: 442,
                    y: 421
                }, {
                    name: 52,
                    x: 181,
                    y: 172
                }, {
                    name: 100,
                    x: 345,
                    y: 136,
                    length: 100,
                    q: l,
                    K: l,
                    r: 65,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 100,
                    x: 185,
                    y: 79,
                    length: 60,
                    q: l,
                    K: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 100,
                    x: 259,
                    y: 245,
                    length: 100,
                    q: l,
                    K: l,
                    r: 65,
                    t: -1,
                    A: l,
                    w: 0,
                    e: i,
                    O: "L"
                }, {
                    name: 3,
                    x: 256,
                    y: 127,
                    timeout: -1
                }, {
                    name: 3,
                    x: 434,
                    y: 336,
                    timeout: -1
                }, {
                    name: 3,
                    x: 257,
                    y: 335,
                    timeout: -1
                }, {
                    name: 54,
                    x: 345,
                    y: 307
                }, {
                    name: 100,
                    x: 436,
                    y: 243,
                    length: 100,
                    q: l,
                    K: l,
                    r: 65,
                    t: -1,
                    A: l,
                    w: 0,
                    e: i,
                    O: "L"
                }, {
                    name: 101,
                    x: 108,
                    y: 273,
                    b: 20,
                    zm: 2
                }]
            }, {
                Ua: [{
                    name: 0,
                    Oa: 32,
                    width: 640,
                    height: 480
                }, {
                    name: 1,
                    pa: 1,
                    fa: 1,
                    I: l
                }],
                Ma: [{
                    name: 54,
                    x: 109,
                    y: 257
                }, {
                    name: 55,
                    x: 66,
                    y: 72,
                    b: 50
                }, {
                    name: 3,
                    x: 208,
                    y: 191,
                    timeout: -1
                }, {
                    name: 3,
                    x: 385,
                    y: 195,
                    timeout: -1
                }, {
                    name: 3,
                    x: 546,
                    y: 192,
                    timeout: -1
                }, {
                    name: 2,
                    x: 458,
                    y: 416
                }, {
                    name: 52,
                    x: 111,
                    y: 174
                }, {
                    name: 100,
                    x: 113,
                    y: 83,
                    length: 50,
                    q: l,
                    K: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 55,
                    x: 161,
                    y: 72,
                    b: 50
                }, {
                    name: 55,
                    x: 258,
                    y: 73,
                    b: 50
                }, {
                    name: 55,
                    x: 349,
                    y: 73,
                    b: 50
                }, {
                    name: 100,
                    x: 47,
                    y: 154,
                    length: 460,
                    q: l,
                    K: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: i,
                    O: "L"
                }, {
                    name: 55,
                    x: 437,
                    y: 73,
                    b: 50
                }, {
                    name: 60,
                    x: 582,
                    y: 203,
                    b: 90,
                    size: 4
                }]
            }, {
                Ua: [{
                    name: 0,
                    Oa: 32,
                    width: 640,
                    height: 480
                }, {
                    name: 1,
                    pa: 1,
                    fa: 1,
                    I: l
                }],
                Ma: [{
                    name: 2,
                    x: 321,
                    y: 414
                }, {
                    name: 52,
                    x: 323,
                    y: 191
                }, {
                    name: 100,
                    x: 408,
                    y: 302,
                    length: 140,
                    q: l,
                    K: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: i,
                    O: "L"
                }, {
                    name: 100,
                    x: 224,
                    y: 304,
                    length: 140,
                    q: l,
                    K: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: i,
                    O: "L"
                }, {
                    name: 100,
                    x: 383,
                    y: 125,
                    length: 80,
                    q: l,
                    K: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: i,
                    O: "L"
                }, {
                    name: 100,
                    x: 256,
                    y: 126,
                    length: 80,
                    q: l,
                    K: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: i,
                    O: "L"
                }, {
                    name: 3,
                    x: 321,
                    y: 275,
                    oa: 100,
                    Ba: 100,
                    timeout: -1
                }, {
                    name: 3,
                    x: 675,
                    y: 133,
                    path: "-39,-17,-91,-21,-154,-11,-201,10,-240,49,-284,99,-331,159,",
                    oa: 35,
                    Ba: 0,
                    timeout: -1
                }, {
                    name: 3,
                    x: -37,
                    y: 142,
                    path: "46,-14,93,-26,142,-18,195,3,239,40,282,97,327,151,",
                    oa: 35,
                    Ba: 0,
                    timeout: -1
                }, {
                    name: 54,
                    x: 319,
                    y: 340
                }]
            }]
        }, {
            yh: [{
                Ua: [{
                    name: 0,
                    Oa: 32,
                    width: 640,
                    height: 480
                }, {
                    name: 1,
                    pa: 1,
                    I: l
                }],
                Ma: [{
                    name: 2,
                    x: 314,
                    y: 372
                }, {
                    name: 82,
                    x: 176,
                    y: 397,
                    b: 25,
                    size: 2
                }, {
                    name: 82,
                    x: 454,
                    y: 396,
                    b: -25,
                    size: 2
                }, {
                    name: 100,
                    x: 320,
                    y: 14,
                    length: 160,
                    q: l,
                    K: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 52,
                    x: 159,
                    y: 123
                }, {
                    name: 82,
                    x: 86,
                    y: 352,
                    b: 25,
                    size: 2
                }, {
                    name: 82,
                    x: 548,
                    y: 351,
                    b: -25,
                    size: 2
                }, {
                    name: 3,
                    x: 165,
                    y: 350,
                    timeout: -1
                }, {
                    name: 3,
                    x: 471,
                    y: 350,
                    timeout: -1
                }, {
                    name: 3,
                    x: 320,
                    y: 319,
                    oa: 35,
                    timeout: -1
                }, {
                    name: 82,
                    x: -6,
                    y: 306,
                    b: 25,
                    size: 2
                }, {
                    name: 82,
                    x: 643,
                    y: 304,
                    b: -25,
                    size: 2
                }, {
                    name: 82,
                    x: 360,
                    y: 440,
                    b: -25,
                    size: 2
                }, {
                    name: 82,
                    x: 267,
                    y: 440,
                    b: 25,
                    size: 2
                }]
            }, {
                Ua: [{
                    name: 0,
                    Oa: 32,
                    width: 320,
                    height: 480
                }, {
                    name: 1,
                    pa: 1,
                    I: l
                }],
                Ma: [{
                    name: 82,
                    x: 254,
                    y: 139,
                    b: -135,
                    size: 2
                }, {
                    name: 82,
                    x: 62,
                    y: 136,
                    b: 135,
                    size: 2
                }, {
                    name: 82,
                    x: 253,
                    y: 335,
                    b: -45,
                    size: 2
                }, {
                    name: 82,
                    x: 66,
                    y: 332,
                    b: 45,
                    size: 2
                }, {
                    name: 2,
                    x: 48,
                    y: 222
                }, {
                    name: 52,
                    x: 159,
                    y: 235
                }, {
                    name: 82,
                    x: 159,
                    y: 373,
                    b: 0,
                    size: 2
                }, {
                    name: 82,
                    x: 157,
                    y: 101,
                    b: 180,
                    size: 2
                }, {
                    name: 3,
                    x: 161,
                    y: 327,
                    timeout: -1
                }, {
                    name: 3,
                    x: 160,
                    y: 141,
                    timeout: -1
                }, {
                    name: 3,
                    x: 224,
                    y: 234,
                    timeout: -1
                }, {
                    name: 100,
                    x: 85,
                    y: 429,
                    length: 100,
                    q: l,
                    K: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 100,
                    x: 241,
                    y: 429,
                    length: 100,
                    q: l,
                    K: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 100,
                    x: 91,
                    y: 56,
                    length: 100,
                    q: l,
                    K: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 100,
                    x: 231,
                    y: 57,
                    length: 100,
                    q: l,
                    K: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 55,
                    x: 284,
                    y: 235,
                    b: 135
                }, {
                    name: 103,
                    x: 290,
                    y: 45,
                    b: 10,
                    zm: 3
                }]
            }, {
                Ua: [{
                    name: 0,
                    Oa: 32,
                    width: 640,
                    height: 480
                }, {
                    name: 1,
                    pa: 1,
                    I: l
                }],
                Ma: [{
                    name: 52,
                    x: 231,
                    y: 196
                }, {
                    name: 55,
                    x: 129,
                    y: 193,
                    b: 0
                }, {
                    name: 55,
                    x: 651,
                    y: 187,
                    b: 180
                }, {
                    name: 82,
                    x: 336,
                    y: 260,
                    b: 0,
                    size: 2
                }, {
                    name: 82,
                    x: 445,
                    y: 260,
                    b: 0,
                    size: 2
                }, {
                    name: 82,
                    x: 548,
                    y: 260,
                    b: 0,
                    size: 2
                }, {
                    name: 3,
                    x: 575,
                    y: 71,
                    path: "0,150",
                    oa: 30,
                    timeout: 10
                }, {
                    name: 3,
                    x: 385,
                    y: 69,
                    path: "0,150",
                    oa: 20,
                    timeout: 15
                }, {
                    name: 3,
                    x: 481,
                    y: 71,
                    path: "0,150",
                    oa: 10,
                    timeout: 20
                }, {
                    name: 2,
                    x: 55,
                    y: 422
                }, {
                    name: 82,
                    x: 225,
                    y: 260,
                    b: 0,
                    size: 2
                }, {
                    name: 100,
                    x: 57,
                    y: 308,
                    length: 100,
                    q: l,
                    K: l,
                    r: 70,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }]
            }, {
                Ua: [{
                    name: 0,
                    Oa: 32,
                    width: 320,
                    height: 480
                }, {
                    name: 1,
                    pa: 1,
                    I: l
                }],
                Ma: [{
                    name: 52,
                    x: 140,
                    y: 217
                }, {
                    name: 82,
                    x: 131,
                    y: 261,
                    b: 0,
                    size: 2
                }, {
                    name: 55,
                    x: 57,
                    y: 197,
                    b: 0
                }, {
                    name: 2,
                    x: 150,
                    y: 431
                }, {
                    name: 3,
                    x: 230,
                    y: 230,
                    timeout: -1
                }, {
                    name: 82,
                    x: 281,
                    y: 199,
                    b: -90,
                    size: 2
                }, {
                    name: 54,
                    x: 222,
                    y: 311
                }, {
                    name: 55,
                    x: 57,
                    y: 317,
                    b: 0
                }, {
                    name: 3,
                    x: 165,
                    y: 360,
                    timeout: -1
                }, {
                    name: 3,
                    x: 165,
                    y: 70,
                    timeout: -1
                }, {
                    name: 82,
                    x: 281,
                    y: 315,
                    b: -90,
                    size: 2
                }]
            }, {
                Ua: [{
                    name: 0,
                    Oa: 32,
                    width: 640,
                    height: 480
                }, {
                    name: 1,
                    pa: 1,
                    I: l
                }],
                Ma: [{
                    name: 81,
                    x: 211,
                    y: 447,
                    b: 0,
                    size: 1
                }, {
                    name: 81,
                    x: 278,
                    y: 447,
                    b: 0,
                    size: 1
                }, {
                    name: 81,
                    x: 343,
                    y: 448,
                    b: 0,
                    size: 1
                }, {
                    name: 81,
                    x: 407,
                    y: 448,
                    b: 0,
                    size: 1
                }, {
                    name: 81,
                    x: 472,
                    y: 448,
                    b: 0,
                    size: 1
                }, {
                    name: 81,
                    x: 538,
                    y: 448,
                    b: 0,
                    size: 1
                }, {
                    name: 81,
                    x: 601,
                    y: 448,
                    b: 0,
                    size: 1
                }, {
                    name: 81,
                    x: 280,
                    y: 42,
                    b: 180,
                    size: 1
                }, {
                    name: 81,
                    x: 344,
                    y: 49,
                    b: 190,
                    size: 1
                }, {
                    name: 81,
                    x: 405,
                    y: 66,
                    b: 200,
                    size: 1
                }, {
                    name: 81,
                    x: 462,
                    y: 92,
                    b: 210,
                    size: 1
                }, {
                    name: 81,
                    x: 514,
                    y: 129,
                    b: 220,
                    size: 1
                }, {
                    name: 81,
                    x: 558,
                    y: 174,
                    b: 230,
                    size: 1
                }, {
                    name: 81,
                    x: 595,
                    y: 226,
                    b: 240,
                    size: 1
                }, {
                    name: 81,
                    x: 617,
                    y: 283,
                    b: 260,
                    size: 1
                }, {
                    name: 81,
                    x: 624,
                    y: 345,
                    b: 270,
                    size: 1
                }, {
                    name: 2,
                    x: 52,
                    y: 352
                }, {
                    name: 100,
                    x: 219,
                    y: 72,
                    length: 220,
                    q: l,
                    K: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 52,
                    x: 221,
                    y: 313
                }, {
                    name: 81,
                    x: 624,
                    y: 407,
                    b: -90,
                    size: 1
                }, {
                    name: 81,
                    x: 216,
                    y: 42,
                    b: 180,
                    size: 1
                }, {
                    name: 3,
                    x: 558,
                    y: 258,
                    path: "-39,-66,-96,-120,-160,-155,",
                    oa: 70,
                    timeout: -1
                }, {
                    name: 3,
                    x: 587,
                    y: 343,
                    timeout: -1
                }, {
                    name: 3,
                    x: 277,
                    y: 409,
                    timeout: -1
                }, {
                    name: 55,
                    x: 127,
                    y: 345,
                    b: 0
                }, {
                    name: 81,
                    x: 87,
                    y: 447,
                    b: 0,
                    size: 1
                }, {
                    name: 81,
                    x: 149,
                    y: 447,
                    b: 0,
                    size: 1
                }, {
                    name: 81,
                    x: 25,
                    y: 447,
                    b: 0,
                    size: 1
                }]
            }, {
                Ua: [{
                    name: 0,
                    Oa: 32,
                    width: 320,
                    height: 480
                }, {
                    name: 1,
                    pa: 1,
                    I: l
                }],
                Ma: [{
                    name: 100,
                    x: 159,
                    y: 270,
                    length: 140,
                    q: l,
                    K: l,
                    r: -1,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 82,
                    x: 160,
                    y: 147,
                    b: 0,
                    size: 2
                }, {
                    name: 52,
                    x: 114,
                    y: 107
                }, {
                    name: 2,
                    x: 37,
                    y: 387
                }, {
                    name: 100,
                    x: 162,
                    y: 270,
                    length: 100,
                    q: l,
                    K: l,
                    r: 120,
                    t: -1,
                    A: l,
                    w: 0,
                    e: l,
                    O: "L"
                }, {
                    name: 82,
                    x: 196,
                    y: 386,
                    b: 90,
                    size: 2
                }, {
                    name: 54,
                    x: 273,
                    y: 389
                }, {
                    name: 3,
                    x: 277,
                    y: 389,
                    timeout: -1
                }, {
                    name: 3,
                    x: 267,
                    y: 145,
                    timeout: -1
                }, {
                    name: 3,
                    x: 57,
                    y: 143,
                    timeout: -1
                }]
            }, {
                Ua: [{
                    name: 0,
                    Oa: 32,
                    width: 800,
                    height: 480
                }, {
                    name: 1,
                    pa: 1,
                    I: l
                }],
                Ma: [{
                    name: 2,
                    x: 608,
                    y: 346
                }, {
                    name: 52,
                    x: 397,
                    y: 255
                }, {
                    name: 82,
                    x: 292,
                    y: 313,
                    b: 0,
                    size: 2
                }, {
                    name: 82,
                    x: 394,
                    y: 313,
                    b: 0,
                    size: 2
                }, {
                    name: 82,
                    x: 499,
                    y: 313,
                    b: 0,
                    size: 2
                }, {
                    name: 82,
                    x: 628,
                    y: 185,
                    b: -90,
                    size: 2
                }, {
                    name: 82,
                    x: 496,
                    y: 53,
                    b: 180,
                    size: 2
                }, {
                    name: 82,
                    x: 290,
                    y: 184,
                    b: 0,
                    size: 2
                }, {
                    name: 82,
                    x: 391,
                    y: 185,
                    b: 0,
                    size: 2
                }, {
                    name: 82,
                    x: 252,
                    y: 247,
                    b: 90,
                    size: 2
                }, {
                    name: 82,
                    x: 392,
                    y: 53,
                    b: 180,
                    size: 2
                }, {
                    name: 82,
                    x: 286,
                    y: 53,
                    b: 180,
                    size: 2
                }, {
                    name: 82,
                    x: 57,
                    y: 188,
                    b: 90,
                    size: 2
                }, {
                    name: 82,
                    x: 58,
                    y: 289,
                    b: 90,
                    size: 2
                }, {
                    name: 82,
                    x: 190,
                    y: 424,
                    b: 0,
                    size: 2
                }, {
                    name: 82,
                    x: 298,
                    y: 425,
                    b: 0,
                    size: 2
                }, {
                    name: 82,
                    x: 406,
                    y: 425,
                    b: 0,
                    size: 2
                }, {
                    name: 55,
                    x: 302,
                    y: 254,
                    b: 0
                }, {
                    name: 82,
                    x: 591,
                    y: 277,
                    b: -45,
                    size: 2
                }, {
                    name: 82,
                    x: 590,
                    y: 92,
                    b: -135,
                    size: 2
                }, {
                    name: 82,
                    x: 97,
                    y: 385,
                    b: 45,
                    size: 2
                }, {
                    name: 82,
                    x: 90,
                    y: 94,
                    b: 135,
                    size: 2
                }, {
                    name: 55,
                    x: 502,
                    y: 372,
                    b: 180
                }, {
                    name: 82,
                    x: 510,
                    y: 425,
                    b: 0,
                    size: 2
                }, {
                    name: 3,
                    x: 571,
                    y: 191,
                    timeout: -1
                }, {
                    name: 3,
                    x: 219,
                    y: 237,
                    timeout: -1
                }, {
                    name: 3,
                    x: 372,
                    y: 369,
                    timeout: -1
                }, {
                    name: 82,
                    x: 698,
                    y: 380,
                    b: -45,
                    size: 2
                }, {
                    name: 82,
                    x: 685,
                    y: 283,
                    b: -135,
                    size: 2
                }, {
                    name: 82,
                    x: 180,
                    y: 53,
                    b: 180,
                    size: 2
                }, {
                    name: 82,
                    x: 613,
                    y: 425,
                    b: 0,
                    size: 2
                }]
            }]
        }],
        $r: [C.Gk, C.Ik, C.si],
        as: [C.Hk, C.Jk, C.si],
        Qw: ["drawing1.jpg", "drawing2.jpg", "drawing3.jpg"],
        Tw: "ie/",
        Uw: "IE9MSG.PNG ielogo.png pin-chair.png pin-chairshadow.png pin-cursor.png pin-ieprompt.png PIN-OMNOm.PNG pin-prompt.png pin-taskbar.png".split(" ")
    };
    "undefined" !== typeof getIE9DownloadUrl && $(document).ready(function () {
        var a = $("#upgrade-button"),
            b = getIE9DownloadUrl();
        b ? a.attr("href", b).click(function () {
            Analytics.iw("SMG_MRTINX_CTR_SITE_DL", i);
            _gaq.push(["_trackEvent", "Upgrade", "Download IE"])
        }) : (a.hide(), (new IE9Download).IsIE9CompatMode && $("#upgrade-header").addClass("ie9compat"))
    });
    var J = {}, La = [];
    J.subscribe = function (a, b) {
        La.push({
            name: a,
            Xd: b
        });
        return [a, b]
    };
    J.unsubscribe = function (a, b) {
        var c, d;
        for (c = La.length; 0 <= c; c--) d = La[c], d.name === a && d.Xd === b && La.splice(c, 1)
    };
    J.Aa = function (a) {
        var b = [],
            c = Array.prototype.slice.call(arguments, 1),
            d, e;
        if (0 < La.length) {
            d = 0;
            for (e = La.length; d < e; d++) La[d].name === a && b.push(La[d].Xd);
            d = 0;
            for (e = b.length; d < e; d++) b[d].apply(this, c)
        }
    };
    J.v = {
        dl: 0,
        ev: 1,
        Fp: 2,
        No: 3,
        Lv: 4,
        Do: 5,
        Eo: 6,
        tu: 7,
        Fo: 8,
        Go: 9,
        Ho: 10,
        Io: 11,
        cc: 12,
        vq: 13,
        Ap: 14,
        Ev: 15,
        Fv: 16,
        xu: 17,
        uu: 18,
        Dv: 19,
        nu: 20,
        mu: 21,
        mo: 22,
        ov: 23,
        Mp: 24,
        PA: 25,
        Rv: 26,
        Xl: 27,
        Yl: 28,
        Oq: 29,
        Pq: 30,
        uq: 31,
        Sv: 32
    };
    var Ma, Na = I.WC || "",
        Oa = Na;
    J.subscribe(J.v.Sv, function (a) {
        Oa = a ? a + "-" + Na : Na
    });
    Ma = {
        get: function (a) {
            return !window.localStorage ? j : localStorage.getItem(Oa + a)
        },
        set: function (a, b) {
            window.localStorage && (b == j ? localStorage.removeItem(Oa + a) : localStorage.setItem(Oa + a, b.toString()))
        },
        remove: function (a) {
            window.localStorage && localStorage.removeItem(Oa + a)
        },
        hh: function (a, b) {
            var c = this.get(a);
            return c == j ? b : "true" === c
        },
        ij: function (a, b) {
            var c = this.get(a);
            return c == j ? b : parseInt(c, 10)
        }
    };
    var Pa = new function () {
            function a(a) {
                return 0 <= window.location.href.toLowerCase().indexOf(a.toLowerCase())
            }
            var b = {}, c = location.search.substring(1);
            if ("" !== c && c !== j) for (var c = c.split("&"), d = 0, e = c.length; d < e; d++) {
                var g = c[d].split("=");
                b[decodeURIComponent(g[0].replace(/\+/g, " "))] = decodeURIComponent(g[1].replace(/\+/g, " "))
            }
            this.lang = b.lang;
            this.st = a("boxBackgrounds=true");
            this.cA = true;//a("showFrameRate=true");
            this.Xw = true;//a("html5audio=true")
        }, Qa, Ra = {
            gx: function () {
                return Ja.zg
            }
        };
    Qa = {
        tt: i,
        Fw: i,
        Hr: Pa.cA,
        ak: i,
        Im: function () {
            return Ma.hh("music", i)
        },
        Yj: function (a) {
            Ma.set("music", a)
        },
        Jm: function () {
            return Ma.hh("sound", i)
        },
        Zj: function (a) {
            Ma.set("sound", a)
        },
        Gm: function () {
            return Ma.hh("clickToCut", l)
        },
        xz: function (a) {
            Ma.set("clickToCut", a)
        },
        ih: function () {
            if (Pa.lang) return Ja.Ir(Pa.lang);
            var a = Ma.ij("language", j);
            a == j && (a = Ra.gx(), a == j && (a = Ja.zg));
            return a
        },
        Hz: function (a) {
            Ma.set("language", a)
        },
        kx: function () {
            return Ma.hh("isHD", j)
        },
        Fz: function (a) {
            Ma.set("isHD", a)
        },
        Lr: function () {
            return Ma.hh("introWatched",
            l)
        },
        Ez: function () {
            Ma.set("introWatched", i)
        },
        clear: function () {
            Ma.remove("isHD");
            sessionStorage.removeItem("introWatched");
            J.Aa(J.v.Ap)
        }
    };
    var K = {
        xb: 2560,
        bb: 1440,
        bc: 1,
        H: 3,
        jb: 0,
        La: 105,
        Jo: 10,
        Ko: 6,
        vk: 60,
        Di: 3,
        Vl: 42,
        gl: 200,
        il: 400,
        jl: -400,
        Ul: new A(22, 20, 30, 30),
        Tl: new A(70, 64, 82, 82),
        Zl: new A(264, 350, 108, 2),
        am: 385,
        bm: 700,
        qk: 85,
        pk: 60,
        ei: 60,
        fi: 150,
        ok: new A(48, 48, 152, 152),
        so: -35,
        ro: 14,
        Wl: 15,
        nk: 40,
        Fi: 624,
        pl: new A(300, 300, 175, 175),
        sl: 2500,
        rl: 15,
        ql: 100,
        uk: 300,
        tk: 1400,
        sk: new A(142, 157, 112, 104),
        ii: new A(155, 176, 88, 76),
        Wo: 1,
        Wc: 110,
        ri: 5.625,
        Dk: 1400,
        Ck: 1650,
        Bk: 142,
        qi: 74,
        Fe: 65,
        Sl: 117,
        Ol: 270,
        Oi: 140,
        Pl: 15,
        Lg: 40,
        Ql: -16,
        ml: 44,
        ll: 4,
        Ud: 90,
        Fk: 100,
        nl: 800,
        ol: 400,
        el: 1E3,
        fl: 300,
        rk: 5500,
        hi: 14,
        wk: 12,
        kl: 1.4
    }, L = {
        Qq: 1024,
        xb: 1024,
        bb: 576,
        bc: 0.4,
        Lq: 1,
        dc: 1,
        Jf: 1024,
        Qv: 576,
        gi: 3,
        Jo: 3.5,
        Ko: 2,
        H: 1.2,
        jb: 0,
        Wo: 0.8,
        so: -17,
        ro: 20,
        ou: 336,
        kl: 0.925
    }, Sa = window.ZeptoLab,
        Ta = Sa == j ? j : Sa.isHD;
    Ta != j ? $(function () {
        $("#optionHd").hide();
        $("#optionSd").hide()
    }) : Ta = Qa.kx();
    Ta == j && (Ta = Modernizr.mq("screen and (min-width:1366px)"));
    Ta || (L.Lq = 0.75, L.dc = 0.75, L.Jf = 768, L.Qv = 432);
    var B = L.bc;
    L.La = K.La * B;
    L.Di = K.Di * B;
    L.Vl = K.Vl * B;
    L.gl = K.gl * B;
    L.jl = K.jl * B;
    L.il = K.il * B;
    L.vk = K.vk * B;
    L.Zl = A.qf(K.Zl);
    L.am = K.am * B;
    L.bm = K.bm * B;
    L.qk = K.qk * B;
    L.ei = K.ei * B;
    L.fi = K.fi * B;
    L.ok = A.qf(K.ok);
    L.pk = K.pk * B;
    L.Wl = K.Wl * B;
    L.Tl = A.qf(K.Tl);
    L.Ul = A.qf(K.Ul);
    L.nk = K.nk * B;
    L.Fi = L.Fi || K.Fi * B;
    L.pl = A.qf(K.pl);
    L.sl = K.sl * B;
    L.rl = K.rl * B;
    L.ql = K.ql * B;
    L.sk = A.qf(K.sk);
    L.ii = A.qf(K.ii);
    L.uk = K.uk * B;
    L.tk = K.tk * B;
    L.Fk = K.Fk * B;
    L.nl = K.nl * B;
    L.ol = K.ol * B;
    L.el = K.el * B;
    L.fl = K.fl * B;
    L.rk = K.rk * B;
    L.hi = K.hi * B;
    L.ri = K.ri * B;
    L.Dk = K.Dk * B;
    L.Wc = K.Wc * B;
    L.Ck = K.Ck * B;
    L.Bk = K.Bk * B;
    L.qi = K.qi * B;
    L.Fe = K.Fe * B;
    L.Sl = K.Sl * B;
    L.ml = K.ml * B;
    L.ll = K.ll * B;
    L.Ud = K.Ud * B;
    L.Ol = K.Ol * B;
    L.Oi = K.Oi * B;
    L.Pl = K.Pl * B;
    L.Lg = K.Lg * B;
    L.Ql = K.Ql * B;
    L.wk = K.wk * B;
    L.f = function (a) {
        return Math.round(a * L.Lq)
    };
    L.Vm = Ta;
    var Ua = {
        debug: ba(),
        alert: ba()
    }, M = wa.extend({
        init: function () {
            this.h()
        },
        ie: function (a) {
            this.C = a;
            this.Qj = l;
            this.C.c.length > 0 ? this.Za(0) : this.Az()
        },
        Hd: function (a) {
            var b = H[a].C;
            b || Ua.debug("Image not loaded: " + H[a].path);
            return b
        },
        ma: function (a) {
            this.ie(this.Hd(a))
        },
        Za: function (a) {
            this.pf = a;
            if (!this.Qj) {
                a = this.C.c[a];
                this.width = a.B;
                this.height = a.L
            }
        },
        Az: function () {
            this.pf = t.d;
            this.width = this.C.Zf;
            this.height = this.C.Yf
        },
        sa: function () {
            if (this.C.qe.x !== o.CA.x) {
                this.Qj = i;
                this.width = this.C.qe.x;
                this.height = this.C.qe.y
            }
        },
        s: function () {
            this.yc();
            if (this.color.u !== 0) if (this.pf === t.d) {
                var a = Math.round(this.aa),
                    b = Math.round(this.ba);
                u.context.drawImage(this.C.Nc, a, b)
            } else this.Mw(this.pf);
            this.xc()
        },
        Mw: function (a) {
            var b = this.C.c[a],
                c = b.B,
                d = b.L,
                e = this.aa,
                g = this.ba;
            if (this.Qj) if (a = this.C.g[a]) {
                e = e + a.x;
                g = g + a.y;
                c = c + this.C.Wd;
                d = d + this.C.Mf
            }
            if (this.Xi) {
                c = Math.round(c / this.Xi) * this.Xi;
                d = Math.round(d / this.Xi) * this.Xi
            } else {
                c = Math.ceil(c);
                d = Math.ceil(d)
            }
            if (this.Ha) {
                e = Math.round(e / this.Ha) * this.Ha;
                g = Math.round(g / this.Ha) * this.Ha
            } else {
                e = Math.round(e);
                g = Math.round(g)
            }
            u.context.drawImage(this.C.Nc, b.x, b.y, c, d, e, g, c, d)
        },
        Ow: function (a, b, c, d, e) {
            var g = u.context,
                h = 0,
                f = 0,
                k, p, q, r, s;
            if (a === t.d) {
                a = this.C.Zf;
                k = this.C.Yf
            } else {
                k = this.C.c[a];
                h = k.x;
                f = k.y;
                a = k.B;
                k = k.L
            }
            var z = Math.floor(a),
                D = Math.floor(k);
            for (p = 0; p < e;) {
                for (q = 0; q < d;) {
                    r = d - q;
                    r > a && (r = a);
                    r = Math.ceil(r);
                    s = e - p;
                    s > k && (s = k);
                    s = Math.ceil(s);
                    g.drawImage(this.C.Nc, h, f, r, s, b + q, c + p, r, s);
                    q = q + z
                }
                p = p + D
            }
        },
        Is: function (a, b) {
            if (this.pf === t.d) return A.pb(a, b, this.aa, this.ba, this.C.width, this.C.height);
            var c = this.C.c[this.pf],
                d = this.aa,
                e = this.ba;
            if (this.Qj) var g = this.C.g[this.pf],
                d = d + g.x,
                e = e + g.y;
            return A.pb(a, b, d, e, c.B, c.L)
        },
        Rr: function (a) {
            if (this.h(a)) return i;
            if (a.Rq === oa.Hi) this.Za(a.Sq);
            else return l;
            return i
        },
        Cz: function (a, b) {
            var c = this.Hd(a).g[b];
            this.x = c.x;
            this.y = c.y
        },
        PC: function (a, b) {
            var c = this.Hd(a),
                d = c.c[b],
                c = c.g[b];
            this.x = c.x + d.B / 2;
            this.y = c.y + d.L / 2
        }
    });
    M.create = function (a, b) {
        var c = new M;
        c.ma(a);
        b != j && c.Za(b);
        return c
    };
    var Va;
    Va = M.extend({
        init: function () {
            this.h();
            this.Re = "";
            this.kc = this.wc = this.fd = 0;
            this.af = j
        },
        Ax: function (a, b, c) {
            this.Re = a;
            this.ie(b);
            this.af = c
        },
        Nz: function (a, b, c) {
            this.fd = a;
            this.wc = b;
            this.kc = c
        },
        hj: function (a) {
            var b = this.Re.indexOf(a);
            if (b >= 0) return b;
            Ua.alert("Char not found in font:" + a);
            return this.Re.indexOf(".")
        },
        SB: function (a, b, c) {
            var a = this.C.c[a],
                d = Math.ceil(a.B),
                e = Math.ceil(a.L);
            u.context.drawImage(this.C.Nc, a.x, a.y, d, e, b, c, d, e)
        },
        Gt: function (a) {
            for (var b = 0, c = a.length, d = 0, e = 0; e < c; e++) {
                d = this.Vf(a,
                e);
                if (a[e] === " ") b = b + (this.kc + d);
                else var g = this.hj(a[e]),
                    b = b + (this.C.c[g].B + d)
            }
            return Math.ceil(b - d)
        },
        Cm: function () {
            return this.C.c[0].L
        },
        Vf: function (a, b) {
            if (b === a.length - 1) return 0;
            if (!this.af) return this.fd;
            var c = this.af[a[b] + a[b + 1]];
            return c != j ? c : this.fd
        }
    });

    function Wa(a) {
        this.Nc = a;
        this.c = [];
        this.g = [];
        this.qe = o.Bh();
        var b = $(a);
        this.Zf = a.width || b.width();
        this.Yf = a.height || b.height();
        this.wB = 1 / this.Zf;
        this.vB = 1 / this.Yf;
        this.Mf = this.Wd = 0
    }
    Wa.prototype.cw = function (a) {
        this.c.push(a);
        this.g.push(new o(0, 0))
    };
    Wa.prototype.Mz = function (a, b, c) {
        a = this.g[a];
        a.x = b;
        a.y = c
    };
    var Xa, Ya = {
        uz: function (a, b) {
            var c, d, e;
            d = 0;
            for (e = a.length; d < e; d++) {
                c = a[d];
                c = c.xa || 1;
                this.tz(a[d], Ga(b, c))
            }
        },
        tz: function (a, b) {
            if (a.fd) a.fd = Ga(a.fd, b);
            if (a.wc) a.wc = Ga(a.wc, b);
            if (a.kc) a.kc = Ga(a.kc, b);
            if (a.k) a.k = Math.ceil(Ga(a.k, b));
            if (a.j) a.j = Math.ceil(Ga(a.j, b));
            if (a.c) {
                a.Bs = this.My(a.c);
                a.c = this.sz(a.Bs, b)
            }
            a.Wd = 0;
            a.Wd = 0;
            if (a.g) {
                a.As = this.Ly(a.g);
                this.rz(a, b)
            }
        },
        My: function (a) {
            for (var b = 0, c = a.length, d = []; b < c;) {
                var e = new A(a[b++], a[b++], a[b++], a[b++]);
                d.push(e)
            }
            return d
        },
        sz: function (a, b) {
            for (var c = [],
            d = 0, e = a.length, g = 0; g < e; g++) {
                var h = a[g],
                    h = new A(0, d, Ga(h.B, b), Ga(h.L, b));
                c.push(h);
                d = d + (Math.ceil(h.L) + 4)
            }
            return c
        },
        Ly: function (a) {
            for (var b = 0, c = a.length, d = []; b < c;) {
                var e = new o(a[b++], a[b++]);
                d.push(e)
            }
            return d
        },
        rz: function (a, b) {
            var c = [],
                d = a.As,
                e = [],
                g, h, f, k;
            f = 0;
            for (k = d.length; f < k; f++) {
                g = d[f].copy();
                g.x = Ga(g.x, b);
                g.y = Ga(g.y, b);
                h = new o(0, 0);
                c.push(h);
                e.push(g)
            }
            a.g = e;
            a.oy = c;
            delete a.As
        }
    };
    Xa = {
        init: function () {
            Ya.uz(Fa, L.bc);
            for (var a = 0, b = Fa.length; a < b; a++) {
                var c = Fa[a];
                delete c.Bs;
                delete c.oy;
                H[c.id].info = c
            }
        },
        By: function (a, b) {
            var c = H[a];
            switch (c.type) {
                case F.i:
                    c.C = new Wa(b);
                    this.nt(c);
                    break;
                case F.ni:
                    c.C = new Wa(b);
                    this.nt(c);
                    var d = new Va,
                        e = c.info;
                    d.Ax(e.Re, c.C, e.af);
                    d.Nz(e.fd, e.wc, e.kc);
                    c.font = d
            }
        },
        nt: function (a) {
            var b = a.C,
                c = b.Zf,
                d = b.Yf,
                a = a.info,
                e = a.c,
                g = a.g;
            b.qe = o.Bh();
            if (e) {
                b.Wd = a.Wd ? a.Wd : 0;
                b.Mf = a.Mf ? a.Mf : 0;
                for (var h = 0, f = e.length; h < f; h++) {
                    var k = e[h],
                        k = new A(k.x, k.y, k.B, k.L);
                    if (k.B + b.Wd > c) k.B = c - b.Wd;
                    if (k.L + b.Mf > d) k.L = d - b.Mf;
                    b.cw(k)
                }
                if (g) {
                    c = g.length;
                    for (h = 0; h < c; h++) {
                        d = g[h];
                        b.Mz(h, d.x, d.y)
                    }
                }
                if (a.k && a.j) {
                    b.qe.x = a.k;
                    b.qe.y = a.j
                }
            }
        },
        Hd: function (a) {
            a = H[a];
            if (a.C) return a.C;
            Ua.debug("Image not yet loaded:" + a.path);
            return j
        },
        Kr: function (a) {
            a = H[a];
            if (a.font) return a.font;
            Ua.debug("Font not yet loaded:" + a.path);
            return j
        }
    };
    var N;
    N = {
        Rf: function (a, b, c) {
            return Math.max(Math.min(a, c), b)
        },
        Uj: function (a, b) {
            return a < 0 === b < 0
        },
        gb: function (a, b) {
            return Math.floor(Math.random() * (b - a + 1) + a)
        },
        Xy: function () {
            return Math.random() > 0.5
        },
        vb: function () {
            return Math.random() * 2 - 1
        },
        gs: function (a, b, c, d) {
            return a >= b && a >= c && a >= d ? a : b >= a && b >= c && b >= d ? b : c >= b && c >= a && c >= d ? c : d >= b && d >= c && d >= a ? d : t.d
        },
        js: function (a, b, c, d) {
            return a <= b && a <= c && a <= d ? a : b <= a && b <= c && b <= d ? b : c <= b && c <= a && c <= d ? c : d <= b && d <= c && d <= a ? d : t.d
        },
        Ix: function (a, b, c, d, e, g, h, f) {
            var k, p;
            k = e - a + h - c;
            p = g - b + f - d;
            a = c - a;
            b = d - b;
            e = h - e;
            f = f - g;
            g = e * p - f * k;
            k = a * p - b * k;
            p = Math.abs(b * e - f * a);
            return Math.abs(g) <= p && Math.abs(k) <= p
        },
        MC: function (a, b) {
            var c = Math.pow(10, b);
            return Math.round(a * c) / c
        },
        dt: function (a) {
            return Math.round(a * 100) / 100
        }
    };
    var O;

    function Za(a, b) {
        this.sg = a;
        this.width = b
    }
    var $a = wa.extend({
        init: function (a) {
            this.h();
            this.font = a;
            this.ee = [];
            this.height = this.width = t.d;
            this.align = n.rb;
            this.Xg = new Da(a.C);
            this.MA = l;
            this.maxHeight = t.d
        },
        pt: function (a, b) {
            this.sg = a;
            this.yg = b == j || b === t.d ? Math.ceil(this.font.Gt(a)) : Math.ceil(b);
            if (this.sg) {
                this.Zw();
                this.FA()
            }
        },
        FA: function () {
            for (var a = 0, b = 0, c = this.font.Cm(), d = 0, e = this.font.Vf("..", 0), g = this.maxHeight === t.d ? this.ee.length : Math.min(this.ee.length, this.maxHeight / c + this.font.wc), h = g !== this.ee.length, f = 0; f < g; f++) {
                for (var a = this.ee[f],
                k = a.sg, p = k.length, a = this.align !== n.rb ? this.align === n.Dc || this.align === n.M ? (this.yg - a.width) / 2 : this.yg - a.width : 0, q = 0; q < p; q++) {
                    if (k[q] === " ") a = a + (this.font.kc + this.font.Vf(k, q));
                    else {
                        var r = this.font.hj(k[q]),
                            s = this.font.C.c[r].B;
                        this.Xg.wj(r, Math.round(a), Math.round(b), d++);
                        a = a + (s + this.font.Vf(k, q))
                    }
                    if (h && f === g - 1) {
                        r = this.font.hj(".");
                        s = this.font.C.c[r].B;
                        if (q === p - 1 || q === p - 2 && a + 3 * (s + e) + this.font.kc > this.yg) {
                            this.Xg.wj(r, Math.round(a), Math.round(b), d++);
                            a = a + (s + e);
                            this.Xg.wj(r, Math.round(a), Math.round(b),
                            d++);
                            a = a + (s + e);
                            this.Xg.wj(r, Math.round(a), Math.round(b), d++);
                            a = a + (s + e);
                            break
                        }
                    }
                }
                b = b + (c + this.font.wc)
            }
            if (this.ee.length <= 1) {
                this.height = this.font.Cm();
                this.width = a
            } else {
                this.height = (this.font.Cm() + this.font.wc) * this.ee.length - this.font.wc;
                this.width = this.yg
            }
            if (this.maxHeight !== t.d) this.height = Math.min(this.height, this.maxHeight)
        },
        s: function () {
            this.yc();
            if (this.color.u !== 0) {
                var a = this.sg.length,
                    b = u.context;
                if (a > 0) {
                    b.translate(this.aa, this.ba);
                    this.Xg.zr(a);
                    b.translate(-this.aa, -this.ba)
                }
            }
            this.xc()
        },
        Zw: function () {
            for (var a = [], b = this.sg, c = b.length, d = 0, e = 0, g = 0, h = 0, f = 0, k = 0, p = 0; p < c;) {
                var q = b[p++];
                if (q == " " || q == "\n") {
                    k = k + g;
                    f = p - 1;
                    g = 0;
                    e = p;
                    if (q == " ") {
                        e--;
                        g = this.font.kc + this.font.Vf(b, p - 1)
                    }
                } else var r = this.font.hj(q),
                    g = g + (this.font.C.c[r].B + this.font.Vf(b, p - 1));
                r = N.dt(k + g) > this.yg;
                if (this.MA && r && f == h) {
                    k = k + g;
                    f = p;
                    g = 0;
                    e = p
                }
                if (N.dt(k + g) > this.yg && f != h || q == "\n") {
                    a[d++] = h;
                    for (a[d++] = f; e < c && b[e] == " ";) {
                        e++;
                        g = g - this.font.kc
                    }
                    f = h = e;
                    k = 0
                }
            }
            if (g != 0) {
                a[d++] = h;
                a[d++] = p
            }
            b = d >> 1;
            this.ee = [];
            for (c = 0; c < b; c++) {
                d = this.sg.substring(a[c << 1], a[(c << 1) + 1]);
                e = this.font.Gt(d);
                this.ee.push(new Za(d, e))
            }
        },
        KB: function (a) {
            var b = Xml.kw(a, "font"),
                b = Xa.Kr(b),
                b = new $a(b);
            if (a.hasAttribute("align")) b.align = n.parse(Xml.attr(a, "align"));
            if (a.hasAttribute("string")) {
                var c = Xml.kw("string"),
                    c = Xa.hC(c),
                    d = a.hasAttribute("width") ? Xml.jw(a, "width") : t.d;
                b.pt(c, d)
            }
            if (a.hasAttribute("height")) b.maxHeight = Xml.jw(a, "height");
            return b
        }
    });
    $a.Wi = function (a) {
        var b = a.ka;
        !b && a.mh && (b = document.getElementById(a.mh));
        !b && a.Oc && (b = $(a.Oc)[0]);
        if (!b && a.uc) {
            var b = $("#" + a.uc),
                c = b.find("img");
            c.length === 0 && (c = $("<img>").prependTo(b));
            b = c[0]
        }
        b || (b = new Image);
        var d = a.gj,
            e = a.width,
            g = a.Oe,
            h = a.alpha != j ? a.alpha : 1,
            c = a.qa ? L.dc : a.scale || 1,
            f = a.text.toString(),
            k = u.element;
        u.Vh(document.createElement("canvas"));
        d = Xa.Kr(d);
        d = new $a(d);
        d.x = Math.ceil(24 * L.bc / 2);
        d.y = 0;
        d.align = g || n.rb;
        d.pt(f, e);
        var g = u.element,
            f = u.context,
            p = (e || Math.ceil(d.width)) + Math.ceil(d.x * 2),
            e = Math.ceil(d.height);
        g.width = p;
        g.height = e;
        var q = f.globalAlpha;
        if (h !== q) f.globalAlpha = h;
        d.s();
        b.src = g.toDataURL("image/png");
        if (h !== q) f.globalAlpha = q;
        k && u.Vh(k);
        var h = p * c,
            c = e * c,
            a = a.bn,
            r;
        if (a && h > a) {
            a = a / h;
            r = Math.round((1 - a) * c / 2);
            h = h * a;
            c = c * a
        }
        c = $(b).width(h).height(c);
        r && c.css("padding-top", r);
        return b
    };
    $a.sc = function (a) {
        a.gj = C.mi;
        return $a.Wi(a)
    };
    $a.ya = function (a) {
        a.gj = C.Ag;
        return $a.Wi(a)
    };
    $a.xr = function (a) {
        a.gj = C.Ak;
        $a.Wi(a)
    };
    O = $a;
    var P = {
        nv: 0,
        Sd: 1,
        WA: 2,
        pB: 3,
        zu: 4,
        qv: 5,
        $A: 6,
        NA: 7,
        Co: 8,
        iv: 9,
        hv: 10,
        xv: 11,
        wv: 12,
        Qp: 13,
        $u: 14,
        av: 15,
        bv: 16,
        cv: 17,
        Zu: 18,
        Ov: 19,
        zv: 20,
        yu: 21,
        QA: 22,
        oB: 23,
        Tv: 24,
        kv: 25,
        Kb: 26,
        NEXT: 27,
        yb: 28,
        LOADING: 29,
        Pv: 30,
        lv: 31,
        tB: 32,
        xo: 33,
        yo: 34,
        zo: 35,
        Uo: 36,
        ZA: 37,
        ju: 38,
        su: 39,
        tv: 40,
        dv: 41,
        fv: 42,
        yp: 43,
        Ep: 44,
        Up: 45,
        Vp: 46,
        Wp: 47,
        Ro: 48,
        Lo: 49,
        Ao: 50,
        Xp: 51,
        So: 52,
        Zp: 53,
        $p: 54,
        Yp: 55,
        xp: 56,
        Pp: 57,
        Op: 58,
        Np: 59,
        Qo: 60,
        bq: 61,
        aq: 62,
        Bo: 63,
        gv: 64,
        vv: 65,
        Ie: 66,
        Ae: 67,
        ku: 68,
        Mq: 69,
        jv: 70,
        lo: 71
    }, R, ab = [{
        id: 0,
        l: "Play",
        n: "Jouer",
        m: "Spielen",
        o: "\u0418\u0433\u0440\u0430\u0442\u044c"
    }, {
        id: 1,
        l: "Options",
        n: "Options",
        m: "Optionen",
        o: "\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438"
    }, {
        id: 2,
        l: "Extras",
        n: "",
        m: "Extras",
        o: "\u0415\u0449\u0435 \u043a\u043e\u0435 \u0447\u0442\u043e"
    }, {
        id: 3,
        l: "Bonus mode",
        n: "",
        m: "Bonusmodus",
        o: "\u0411\u043e\u043d\u0443\u0441 \u0440\u0435\u0436\u0438\u043c"
    }, {
        id: 4,
        l: "Full version",
        n: "Version compl\u00e8te",
        m: "Vollversion",
        o: "\u041f\u043e\u043b\u043d\u0430\u044f \u0432\u0435\u0440\u0441\u0438\u044f"
    }, {
        id: 5,
        l: "Reset game",
        n: "R\u00e9initialiser",
        m: "Neu starten",
        o: "\u0421\u0431\u0440\u043e\u0441 \u043f\u0440\u043e\u0433\u0440\u0435\u0441\u0441\u0430"
    }, {
        id: 6,
        l: "Help",
        n: "",
        m: "Hilfe",
        o: "\u041f\u043e\u043c\u043e\u0449\u044c"
    }, {
        id: 7,
        l: "About",
        n: "",
        m: "\u00dcber",
        o: "\u041e\u0431 \u0438\u0433\u0440\u0435"
    }, {
        id: 8,
        l: "Credits",
        n: "Cr\u00e9dits",
        m: "Mitwirkende",
        o: "\u0410\u0432\u0442\u043e\u0440\u044b"
    }, {
        id: 9,
        l: "Music on",
        n: "Musique oui",
        m: "Musik an",
        o: "\u041c\u0443\u0437\u044b\u043a\u0430 \u0432\u043a\u043b."
    }, {
        id: 10,
        l: "Music off",
        n: "Musique non",
        m: "Musik aus ",
        o: "\u041c\u0443\u0437\u044b\u043a\u0430 \u0432\u044b\u043a\u043b."
    }, {
        id: 11,
        l: "Sounds on",
        n: "Sons oui",
        m: "Ger\u00e4usche an",
        o: "\u0417\u0432\u0443\u043a\u0438 \u0432\u043a\u043b."
    }, {
        id: 12,
        l: "Sounds off",
        n: "Sons non",
        m: "Ger\u00e4usche aus",
        o: "\u0417\u0432\u0443\u043a\u0438 \u0432\u044b\u043a\u043b."
    }, {
        id: P.Qp,
        l: "Are you sure you want to reset your progress?",
        n: "Voulez-vous vraiment r\u00e9initialiser votre progression?",
        m: "M\u00f6chtest du deinen Fortschritt wirklich zur\u00fccksetzen?",
        o: "\u0423\u0432\u0435\u0440\u0435\u043d\u044b \u0447\u0442\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0441\u0431\u0440\u043e\u0441\u0438\u0442\u044c \u0438\u0433\u0440\u043e\u0432\u043e\u0439 \u043f\u0440\u043e\u0433\u0440\u0435\u0441\u0441?"
    }, {
        id: 14,
        l: "Passable!",
        n: "Passable!",
        m: "Passabel!",
        o: "\u0423\u0440\u043e\u0432\u0435\u043d\u044c \u043f\u0440\u043e\u0439\u0434\u0435\u043d!"
    }, {
        id: 15,
        l: "Good!",
        n: "Bien!",
        m: "Gut!",
        o: "\u0425\u043e\u0440\u043e\u0448\u043e!"
    }, {
        id: 16,
        l: "Great!",
        n: "Super!",
        m: "Prima!",
        o: "\u041e\u0442\u043b\u0438\u0447\u043d\u043e!"
    }, {
        id: 17,
        l: "Excellent!",
        n: "Formidable!",
        m: "Hervorragend!",
        o: "\u0421\u0443\u043f\u0435\u0440!"
    }, {
        id: 18,
        l: "Level",
        n: "Niveau",
        m: "Level",
        o: "\u0423\u0440\u043e\u0432\u0435\u043d\u044c"
    }, {
        id: 19,
        l: "Time",
        n: "Temps",
        m: "Zeit",
        o: "\u0412\u0440\u0435\u043c\u044f"
    }, {
        id: 20,
        l: "Star Bonus",
        n: "Bonus \u00e9toile",
        m: "Sternenbonus",
        o: "\u0411\u043e\u043d\u0443\u0441 \u0437\u0430 \u0437\u0432\u0435\u0437\u0434\u044b"
    }, {
        id: 21,
        l: "Your Final Score",
        n: "Votre score final",
        m: "Dein Endpunktestand",
        o: "\u0418\u0442\u043e\u0433\u043e\u0432\u044b\u0435 \u043e\u0447\u043a\u0438"
    }, {
        id: 22,
        l: "Best Score",
        n: "Meilleur score",
        m: "Beste punktzahl",
        o: "\u041b\u0443\u0447\u0448\u0438\u0439 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442"
    }, {
        id: 23,
        l: "Score",
        n: "Score",
        m: "Punktzahl",
        o: "\u041e\u0447\u043a\u0438"
    }, {
        id: 24,
        l: "Yes",
        n: "Oui",
        m: "Ja",
        o: "\u0414\u0430"
    }, {
        id: 25,
        l: "No",
        n: "Non",
        m: "Nein",
        o: "\u041d\u0435\u0442"
    }, {
        id: 26,
        l: "Replay",
        n: "Rejouer",
        m: "Wieder",
        o: "\u0415\u0449\u0435 \u0440\u0430\u0437"
    }, {
        id: 27,
        l: "Next",
        n: "Suivant",
        m: "Weiter",
        o: "\u0412\u043f\u0435\u0440\u0435\u0434"
    }, {
        id: 28,
        l: "Menu",
        n: "Menu",
        m: "Men\u00fc",
        o: "\u041c\u0435\u043d\u044e"
    }, {
        id: 29,
        l: "Loading...",
        n: "Chargement...",
        m: "Laden...",
        o: "\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430..."
    }, {
        id: 30,
        l: "Total: %d",
        n: "Total: %d",
        m: "Gesamt: %d",
        o: "\u0412\u0441\u0435\u0433\u043e: %d"
    }, {
        id: 31,
        l: "Ok",
        n: "OK",
        m: "Ok",
        o: "Ok"
    }, {
        id: 32,
        l: "Collect %d stars to unlock this level pack",
        n: "Recueillez %d \u00e9toiles pour d\u00e9verrouiller ce pack de niveaux",
        m: "Sammle %d Sterne, um dieses Levelpaket freizuschalten",
        o: "\u0421\u043e\u0431\u0435\u0440\u0438\u0442\u0435 %d \u0437\u0432\u0435\u0437\u0434 \u0447\u0442\u043e\u0431\u044b \u043e\u0442\u043a\u0440\u044b\u0442\u044c \u043a\u043e\u0440\u043e\u0431\u043a\u0443"
    }, {
        id: P.xo,
        l: "You are missing",
        n: "Il vous en manque",
        m: "Dir fehlen",
        o: "\u0412\u0430\u043c \u043d\u0435\u0445\u0432\u0430\u0442\u0430\u0435\u0442 \u0432\u0441\u0435\u0433\u043e"
    }, {
        id: P.yo,
        l: "to unlock this box",
        n: "pour d\u00e9verrouiller bo\u00eete",
        m: "um dieses Box freizuschalten",
        o: "\u0447\u0442\u043e\u0431\u044b \u043e\u0442\u043a\u0440\u044b\u0442\u044c \u043a\u043e\u0440\u043e\u0431\u043a\u0443"
    }, {
        id: P.zo,
        l: "Get more stars from the earlier levels",
        n: "Recueillez plus d'\u00e9toiles dans les niveaux pr\u00e9c\u00e9dents",
        m: "Gewinne mehr Sterne in den niedrigeren Leveln",
        o: "\u0421\u043e\u0431\u0435\u0440\u0438\u0442\u0435 \u0431\u043e\u043b\u044c\u0448\u0435 \u0437\u0432\u0435\u0437\u0434 \u0432 \u043f\u0440\u0435\u0434\u044b\u0434\u0443\u0449\u0438\u0445 \u0443\u0440\u043e\u0432\u043d\u044f\u0445"
    }, {
        id: 37,
        l: "Check back for the new levels coming with the updates",
        n: "Revenez pour d\u00e9couvrir de nouveaux niveaux avec les mises \u00e0 jour",
        m: "Komm bald wieder, neue Level kommen mit den Updates",
        o: "\u041d\u043e\u0432\u044b\u0435 \u0443\u0440\u043e\u0432\u043d\u0438 \u0431\u0443\u0434\u0443\u0442 \u0434\u043e\u0431\u0430\u0432\u043b\u044f\u0442\u044c\u0441\u044f \u0441 \u0430\u043f\u0434\u0435\u0439\u0442\u0430\u043c\u0438"
    }, {
        id: P.ju,
        l: "achievement gained!",
        n: "r\u00e9alisation d\u00e9verrouill\u00e9e!",
        m: "Erfolg geschafft!",
        o: "\u043e\u0442\u043a\u0440\u044b\u0442\u043e!"
    }, {
        id: 39,
        l: "Continue",
        n: "Continuer",
        m: "Weiter",
        o: "\u041f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u0442\u044c"
    }, {
        id: 40,
        l: "Skip level",
        n: "Passer",
        m: "\u00dcberspringen",
        o: "\u041f\u0440\u043e\u043f\u0443\u0441\u0442\u0438\u0442\u044c"
    }, {
        id: 41,
        l: "Level select",
        n: "Choisir niveau",
        m: "Levelauswahl",
        o: "\u0412\u044b\u0431\u043e\u0440 \u0443\u0440\u043e\u0432\u043d\u044f"
    }, {
        id: 42,
        l: "Main menu",
        n: "Menu principal",
        m: "Hauptmen\u00fc",
        o: "\u0413\u043b\u0430\u0432\u043d\u043e\u0435 \u043c\u0435\u043d\u044e"
    }, {
        id: P.xp,
        l: "Language",
        o: "\u042f\u0437\u044b\u043a",
        n: "Langue",
        m: "Sprache"
    }, {
        id: P.Lo,
        l: "Drag to Cut",
        n: "Glisser",
        m: "Ziehe: Schneide",
        o: "\u041f\u0435\u0440\u0435\u0442\u0430\u0441\u043a\u0438\u0432\u0430\u043d\u0438\u0435\u043c"
    }, {
        id: P.Ao,
        l: "Click to Cut",
        n: "Cliquer",
        m: "Klicke: Schneide",
        o: "\u0429\u0435\u043b\u0447\u043a\u043e\u043c"
    }, {
        id: P.yp,
        l: "Let's Play",
        n: "C'est parti",
        m: "Lass uns spielen",
        o: "\u0414\u0430\u0432\u0430\u0439\u0442\u0435 \u043f\u043e\u0438\u0433\u0440\u0430\u0435\u043c"
    }, {
        id: P.Ep,
        l: "More Cut the Rope fun!",
        n: "Toujours plus de Cut the Rope !",
        m: "Mehr Cut the Rope Spa\u00df!",
        o: "\u0415\u0449\u0435 \u0431\u043e\u043b\u044c\u0448\u0435 \u0432\u0435\u0441\u0435\u043b\u044c\u044f \u0432 \u0438\u0433\u0440\u0435 Cut the Rope!"
    }, {
        id: P.Wp,
        l: "Share...",
        n: "Partager...",
        m: "Teilen...",
        o: "\u041f\u043e\u0434\u0435\u043b\u0438\u0442\u044c\u0441\u044f..."
    }, {
        id: P.Up,
        l: "Share",
        n: "Partager",
        m: "Teilen",
        o: "\u041f\u043e\u0434\u0435\u043b\u0438\u0442\u044c\u0441\u044f"
    }, {
        id: P.Bo,
        l: "Congratulations!",
        n: "F\u00e9licitations!",
        m: "Gratulation!",
        o: "\u041f\u043e\u0437\u0434\u0440\u0430\u0432\u043b\u044f\u0435\u043c!"
    }, {
        id: P.Uo,
        l: "You completed the game with %d stars!",
        n: "Tu as termin\u00e9 le jeu avec %d \u00e9toiles !",
        m: "Du hast das Spiel mit %d Sternen beendet!",
        o: "\u0412\u044b \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u043b\u0438 \u0438\u0433\u0440\u0443 \u0441\u043e \u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u043c \u043a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e\u043c \u0437\u0432\u0435\u0437\u0434: %d!"
    }, {
        id: P.Vp,
        l: "I just found one of Om Nom's secret drawings!",
        n: "Je viens juste de trouver un des dessins secrets de Om Nom !",
        m: "Ich habe gerade eine geheime Om-Nom-Zeichnung entdeckt!",
        o: "\u041c\u043d\u043e\u044e \u0442\u043e\u043b\u044c\u043a\u043e \u0447\u0442\u043e \u0431\u044b\u043b \u043e\u0431\u043d\u0430\u0440\u0443\u0436\u0435\u043d \u043e\u0434\u0438\u043d \u0438\u0437 \u0442\u0430\u0439\u043d\u044b\u0445 \u0440\u0438\u0441\u0443\u043d\u043a\u043e\u0432 \u0410\u043c \u041d\u044f\u043c\u0430!"
    }, {
        id: P.Ro,
        l: "You found a drawing!",
        n: "Tu as trouv\u00e9 un dessin !",
        m: "Du hast die Zeichnung gefunden!",
        o: "\u0412\u044b \u043e\u0431\u043d\u0430\u0440\u0443\u0436\u0438\u043b\u0438 \u0440\u0438\u0441\u0443\u043d\u043e\u043a!"
    }, {
        id: P.Xp,
        l: "Show Me",
        n: "Montre-moi",
        m: "Zeig es mir",
        o: "\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u043c\u043d\u0435"
    }, {
        id: P.So,
        l: "Free Download",
        n: "T\u00e9l\u00e9chargement gratuit",
        m: "Kostenloser Download",
        o: "\u0411\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u0430\u044f \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0430"
    }, {
        id: P.Zp,
        l: "Cut the Rope is a fun game where you feed candy to the curiously cute green monster Om-nom.",
        n: "Cut the Rope est un jeu amusant dans lequel tu dois nourrir Om Nom, un curieux petit monstre.",
        m: "Cut the Rope ist ein lustiges Spiel, wobei du dem kuriosem, niedlichem Monster Om-nom S\u00fc\u00dfigkeiten f\u00fctterst.",
        o: "Cut the Rope   \u044d\u0442\u043e \u0432\u0435\u0441\u0435\u043b\u0430\u044f \u0438\u0433\u0440\u0430, \u0432 \u043a\u043e\u0442\u043e\u0440\u043e\u0439 \u0432\u044b \u043a\u043e\u0440\u043c\u0438\u0442\u0435 \u0441\u043b\u0430\u0434\u043e\u0441\u0442\u044f\u043c\u0438 \u043b\u044e\u0431\u043e\u043f\u044b\u0442\u043d\u043e\u0433\u043e \u0438 \u043c\u0438\u043b\u043e\u0433\u043e \u043c\u043e\u043d\u0441\u0442\u0440\u0430 \u043f\u043e \u0438\u043c\u0435\u043d\u0438 \u0410\u043c \u041d\u044f\u043c."
    }, {
        id: P.$p,
        l: "Om Nom is Om Line - Cut the Rope for the Web",
        n: "Om Nom est om ligne - Cut the Rope version web",
        m: "Om Nom ist Om Line - Cut the Rope f\u00fcr das Internet",
        o: "\u0410\u043c \u041d\u044f\u043c \u0432 \u0410\u043c \u041b\u0430\u0439\u043d\u0435 \u2013 \u0432\u0435\u0431-\u0432\u0435\u0440\u0441\u0438\u044f \u0438\u0433\u0440\u044b Cut the Rope"
    }, {
        id: P.Yp,
        l: 'Play the HTML5 version of "Cut the Rope"!',
        n: "Joue \u00e0 Cut the Rope dans sa version HTML5 !",
        m: 'Spiele die HTML5 Version von "Cut the Rope"!',
        o: "\u0418\u0433\u0440\u0430\u0439\u0442\u0435 \u0432 HTML5-\u0432\u0435\u0440\u0441\u0438\u044e \u0438\u0433\u0440\u044b Cut the Rope!"
    }, {
        id: P.Pp,
        l: 'Hold the "yes" button for 3 seconds to reset.',
        n: 'Maintenir le doigt sur "Oui" pendant 3 secondes pour r\u00e9initialiser.',
        m: 'Halte zum Neustarten 3 Sekunden lang "Ja" gedr\u00fcckt.',
        o: '\u0423\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0439\u0442\u0435 "\u0414\u0430" \u0432 \u0442\u0435\u0447\u0435\u043d\u0438\u0435 3 \u0441\u0435\u043a\u0443\u043d\u0434 \u0434\u043b\u044f \u0441\u0431\u0440\u043e\u0441\u0430 \u043f\u0440\u043e\u0433\u0440\u0435\u0441\u0441\u0430.'
    }, {
        id: P.Qo,
        l: "everything off",
        n: "tout couper",
        m: "alles aus",
        o: "\u0432\u0441\u0435 \u043e\u0442\u043a\u043b\u044e\u0447\u0435\u043d\u043e"
    }, {
        id: P.Op,
        l: "reload the game in SD",
        n: "recharger le jeu en SD",
        m: "Spiel in SD neu laden",
        o: "\u043f\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0438\u0433\u0440\u0443 \u0432 SD"
    }, {
        id: P.Np,
        l: "reload the game in HD",
        n: "recharger le jeu en HD",
        m: "Spiel in HD neu laden",
        o: "\u043f\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0438\u0433\u0440\u0443 \u0432 HD"
    }, {
        id: P.bq,
        l: "A Little Too Slow...",
        n: "Un peu trop lent",
        m: "Etwas zu langsam...",
        o: "\u041a\u0430\u043a-\u0442\u043e \u043d\u0435 \u043e\u0447\u0435\u043d\u044c \u0431\u044b\u0441\u0442\u0440\u043e..."
    }, {
        id: P.aq,
        l: "Om Nom is sad because your computer is running slow. We'll do our best, but there may be some slow-downs.",
        n: "Om Nom est triste. Votre ordinateur est tr\u00e8s lent. Nous ferons notre mieux, mais il est possible que le jeu ralentisse.",
        m: "Om Nom ist traurig, weil dein Computer so langsam ist. Wir geben unser Bestes, aber es kann trotzdem zu Verz\u00f6gerungen kommen.",
        o: '\u0410\u043c \u041d\u044f\u043c \u043e\u043f\u0435\u0447\u0430\u043b\u0435\u043d: \u0443 \u0432\u0430\u0441 \u0441\u043b\u0438\u0448\u043a\u043e\u043c \u043c\u0435\u0434\u043b\u0435\u043d\u043d\u044b\u0439 \u043a\u043e\u043c\u043f\u044c\u044e\u0442\u0435\u0440. \u041c\u044b, \u043a\u043e\u043d\u0435\u0447\u043d\u043e, \u043f\u043e\u0441\u0442\u0430\u0440\u0430\u0435\u043c\u0441\u044f, \u043d\u043e \u0438\u0433\u0440\u0430 \u0443 \u0432\u0430\u0441 \u043c\u043e\u0436\u0435\u0442 "\u043f\u0440\u0438\u0442\u043e\u0440\u043c\u0430\u0436\u0438\u0432\u0430\u0442\u044c".'
    }, {
        id: P.gv,
        l: "Music",
        n: "Musique",
        m: "Musik",
        o: "\u041c\u0443\u0437\u044b\u043a\u0430"
    }, {
        id: P.vv,
        l: "Sounds",
        n: "Sons oui",
        m: "Ger\u00e4usche",
        o: "\u0417\u0432\u0443\u043a\u0438"
    }, {
        id: P.Ie,
        l: "Leaderboards",
        n: "Classements",
        m: "Bestenlisten",
        o: "\u0422\u0430\u0431\u043b\u0438\u0446\u0430 \u0440\u0435\u043a\u043e\u0440\u0434\u043e\u0432"
    }, {
        id: P.Ae,
        l: "Achievements",
        n: "Succ\u00e8s",
        m: "Erfolge",
        o: "\u0414\u043e\u0441\u0442\u0438\u0436\u0435\u043d\u0438\u044f"
    }, {
        id: P.ku,
        l: "Achievement unlocked!",
        n: "Succ\u00e8s d\u00e9bloqu\u00e9 !",
        m: "Erfolg freigeschaltet!",
        o: "\u041d\u043e\u0432\u043e\u0435 \u0434\u043e\u0441\u0442\u0438\u0436\u0435\u043d\u0438\u0435!"
    }, {
        id: P.Mq,
        l: "Get MANY MORE\n levels in the full version",
        n: "De NOMBREUX autres niveaux\n sont disponibles dans la version compl\u00e8te!",
        m: "In der Vollversion gibt\n es noch VIEL MEHR Level!",
        o: "\u041f\u043e\u043b\u0443\u0447\u0438\u0442\u0435 \u041d\u0410\u041c\u041d\u041e\u0413\u041e \u0411\u041e\u041b\u042c\u0428\u0415\n \u0443\u0440\u043e\u0432\u043d\u0435\u0439 \u0432 \u043f\u043e\u043b\u043d\u043e\u0439 \u0432\u0435\u0440\u0441\u0438\u0438!"
    }, {
        id: P.jv,
        l: "Name",
        n: "Nom",
        m: "Name",
        o: "\u0418\u043c\u044f"
    }, {
        id: P.lo,
        l: "{0} & {1}",
        n: "{0} et {1}",
        m: "{0} und {1}",
        o: "{0} \u0438 {1}"
    }];

    function bb(a) {
        switch (Qa.ih()) {
            case Ja.oi:
                return a.n || a.l;
            case Ja.ji:
                return a.m || a.l;
            case Ja.Gi:
                return a.o || a.l;
            default:
                return a.l
        }
    }
    R = {
        lm: function (a, b) {
            var c = bb(I.lm[a]);
            b && (c = a + 1 + ". " + c);
            return c
        },
        T: function (a) {
            var b, c, d = ab.length;
            for (c = 0; c < d; c++) {
                b = ab[c];
                if (b.id === a) return bb(b)
            }
            Ua.debug("Missing menu string for id: " + a);
            return ""
        },
        qx: bb,
        gC: function () {
            return Qa.ih()
        }
    };
    var S, cb = {
        l: "I just finished playing Cut the Rope on the web with %d (out of %d possible) stars!",
        n: "",
        m: "",
        o: ""
    }, eb = {
        De: i,
        VA: l,
        uB: l,
        Ur: "images/",
        Gn: "images/" + L.Jf + "/",
        Tc: "images/" + L.Jf + "/ui/",
        lw: "./audio/",
        cx: function () {
            return !soundManager.useHTML5Audio ? ".m4a" : Modernizr.audio.m4a ? ".m4a" : Modernizr.audio.ogg ? ".ogg" : j
        },
        gu: "video/",
        Qr: function () {
            return Modernizr.video.h264 ? ".mp4" : Modernizr.video.webm ? ".webm" : j
        },
        hx: function () {
            var a = window.location;
            return a.protocol + "//" + a.host + "/images/" + L.Jf + "/ui/"
        },
        ox: function () {
            var a = window.location;
            return a.protocol + "//" + a.host + "/images/scores/"
        },
        Uz: function (a, b) {
            a.click(b)
        },
        Lz: function (a, b) {
            a.click(b)
        },
        JA: function (a, b) {
            a.toggleClass("disabled", !b)
        },
        HA: function (a, b) {
            a.toggleClass("disabled", !b)
        },
        sA: function (a) {
            $("#langBtn").toggle(a)
        },
        Iz: function (a) {
            $("#langBtn").click(function () {
                a(j)
            })
        },
        GA: function () {
            eb.kt($("#langBtn"), R.T(P.xp) + ":");
            $("#flag").offset()
        },
        yz: function (a) {
            $("#cutBtn").click(a)
        },
        EA: function (a) {
            var b = 400 * L.bc,
                c = 0.8 * L.dc,
                d = n.Dc;
            O.sc({
                text: R.T(P.Lo),
                width: b,
                mh: "dragText",
                scale: c,
                Oe: d
            });
            O.sc({
                text: R.T(P.Ao),
                width: b,
                mh: "cutText",
                scale: c,
                Oe: d
            });
            $("#cutBtn").toggleClass("disabled", !a)
        },
        Sz: function (a, b) {
            eb.kt(a, b)
        },
        kt: function (a, b) {
            O.ya({
                text: b,
                ka: a.find("img")[0],
                qa: i
            })
        },
        ix: function (a, b) {
            return R.qx(cb).replace("%d", a).replace("%d", b)
        },
        ey: function () {
            var a = Modernizr.canvas && Modernizr.audio && Modernizr.video && Modernizr.localstorage && Modernizr.rgba && Modernizr.opacity && Modernizr.fontface && Modernizr.csstransforms && Modernizr.hq;
            if (!a) {
                Modernizr.load({
                    load: "css!css/nosupport.css?54"
                });
                $(function () {
                    $("#yt-video").remove()
                });
                _gaq.push(["_trackEvent", "Upgrade", "View"])
            }
            return a
        }
    };
    S = eb;
    var fb;
    $(function () {
        $("body").addClass(L.Vm ? "hd" : "sd")
    });
    fb = {
        Jy: [L.Vm ? "hd_top_bgr.jpg" : "sd_top_bgr.jpg", "FBLIKEFO.PNG", "FON_MAGA.PNG", "FON_WALP.PNG", "KRAY.PNG", "LOADER_B.PNG", "LOGOS_MA.PNG", "MAGASIN_.PNG", "MAIN_FON.PNG", "SOCIAL.PNG", "STAMPS.PNG", "TILEBG.HTM", "TOP_HOVE.PNG", "VIDEO_BG.PNG", "VIDEO_SP.PNG", "VIDEO_-2.PNG", "wallpapers.png"]
    };
    var gb, hb = window.soundManager,
        ib = l,
        jb = [],
        kb = /chrome/.test(navigator.userAgent.toLowerCase());
    hb.audioFormats.mp3.required = l;
    var lb = {};
    lb.useHTML5Audio = !kb;
    lb.preferFlash = kb;
    lb.url = "SM2/INDEX.HTM";
    lb.flashVersion = 9;
    lb.useHighPerformance = i;
    lb.debugMode = l;
    lb.flashLoadTimeout = 500;
    lb.ontimeout = function () {
        hb.useHTML5Audio = i;
        hb.preferFlash = l;
        hb.reboot()
    };
    lb.onready = function () {
        ib = i;
        for (var a = 0, b = jb.length; a < b; a++) jb[a]()
    };
    hb.setup(lb);

    function mb(a, b) {
        var c = hb.getSoundById("s" + a);
        if (c) try {
            b.call(this, c)
        } catch (d) {
            Ua.debug("Sound exception:" + d)
        } else Ua.debug("No sound loaded:" + a)
    }
    gb = {
        Ay: function (a) {
            ib ? a() : jb.push(a)
        },
        play: function (a, b) {
            mb(a, function (a) {
                var d = j;
                if (b) {
                    d = {};
                    d.onfinish = b
                }
                a.play(d)
            })
        },
        qj: function (a) {
            var b = l;
            mb(a, function (a) {
                b = a.playState === 1 && !a.paused
            });
            return b
        },
        Fx: function (a) {
            var b = i;
            mb(a, function (a) {
                b = a.paused
            });
            return b
        },
        pause: function (a) {
            mb(a, function (a) {
                a.pause()
            })
        },
        stop: function (a) {
            mb(a, function (a) {
                a.stop()
            })
        },
        aA: function (a, b) {
            mb(a, function (a) {
                a.volume = b
            })
        }
    };
    var nb;
    Array.isArray || (Array.isArray = function (a) {
        return Object.prototype.toString.call(a) == "[object Array]"
    });
    Array.prototype.indexOf || (Array.prototype.indexOf = function (a) {
        if (this == j) throw new TypeError;
        var b = Object(this),
            c = b.length >>> 0;
        if (c === 0) return -1;
        var d = 0;
        if (arguments.length > 0) {
            d = Number(arguments[1]);
            d != d ? d = 0 : d != 0 && (d != Infinity && d != -Infinity) && (d = (d > 0 || -1) * Math.floor(Math.abs(d)))
        }
        if (d >= c) return -1;
        for (d = d >= 0 ? d : Math.max(c - Math.abs(d), 0); d < c; d++) if (d in b && b[d] === a) return d;
        return -1
    });
    nb = function (a) {
        function b(a, b) {
            for (var f = j, d = 0, e = g.length; d < e; d++) if (g[d].jc === a) {
                f = g[d];
                break
            }
            if (!(f == j || f.status !== 1)) {
                f.status = b;
                k = +new Date;
                d = 0;
                for (e = h.length; d < e; d++) {
                    var p = h[d];
                    if (p.Rb.length === 0 || c(a.Rb, p.Rb)) {
                        for (var W = f, ha = 0, Q = 0, ga = 0, ka = g.length; ga < ka; ga++) {
                            var da = g[ga];
                            if (p.Rb.length === 0 || c(da.jc.Rb, p.Rb)) {
                                Q++;
                                (da.status === 2 || da.status === 3 || da.status === 4) && ha++
                            }
                        }
                        p.Xd({
                            jc: W.jc,
                            loaded: W.status === 2,
                            error: W.status === 3,
                            timeout: W.status === 4,
                            rm: ha,
                            Zn: Q
                        })
                    }
                }
            }
        }
        function c(a, b) {
            for (var f = 0, c = a.length; f < c; f++) if (b.indexOf(a[f]) >= 0) return i;
            return l
        }
        function d() {
            for (var b = l, f = +new Date - k, c = f >= a.Ch, f = f >= a.fs, e = 0, h = g.length; e < h; e++) {
                var E = g[e];
                if (E.status === 1) {
                    E.jc.or();
                    E.status === 1 && (c ? E.jc.hf() : b = i)
                }
            }
            f && b && p();
            b && setTimeout(d, a.Ct)
        }
        function e(a) {
            return a == j ? [] : Array.isArray(a) ? a : [a]
        }
        a = a || {};
        if (a.Ct == j) a.Ct = 5E3;
        if (a.fs == j) a.fs = 2E4;
        if (a.Ch == j) a.Ch = Infinity;
        var g = [],
            h = [],
            f, k = +new Date;
        this.add = function (a) {
            a.Rb = e(a.Rb);
            if (a.nf == j) a.nf = Infinity;
            g.push({
                jc: a,
                state: 0
            })
        };
        this.Yq = function (a, b) {
            h.push({
                Xd: a,
                Rb: e(b)
            })
        };
        this.Uq = function (a) {
            h.push({
                Rb: e(aa),
                Xd: function (b) {
                    b.rm === b.Zn && a()
                }
            })
        };
        this.start = function (a) {
            function b(a) {
                for (var a = a.jc, f = Infinity, d = 0, e = a.Rb.length; d < e; d++) {
                    var g = c.indexOf(a.Rb[d]);
                    g >= 0 && g < f && (f = g)
                }
                return f
            }
            f = +new Date;
            var c = a,
                c = e(c);
            g.sort(function (a, f) {
                var c = b(a),
                    d = b(f);
                return c < d ? -1 : c > d ? 1 : a.nf < f.nf ? -1 : a.nf > f.nf ? 1 : 0
            });
            for (var a = 0, h = g.length; a < h; a++) {
                var k = g[a];
                k.status = 1;
                k.jc.start(this)
            }
            setTimeout(d, 100)
        };
        this.rC = function () {
            for (var a = 0, b = g.length; a < b; a++) if (g[a].status === 0 || g[a].status === 1) return i;
            return l
        };
        this.gf = function (a) {
            b(a, 2)
        };
        this.ss = function (a) {
            b(a, 3)
        };
        this.hf = function (a) {
            b(a, 4)
        };
        var p = this.log = function (a) {
            if (window.console) {
                var b = Math.round((+new Date - f) / 1E3);
                window.console.log("PxLoader elapsed: " + b + " sec");
                for (var b = 0, c = g.length; b < c; b++) {
                    var d = g[b];
                    if (a || d.status === 1) {
                        var e = "PxLoader: #" + b + " " + d.jc.getName();
                        switch (d.status) {
                            case 0:
                                e = e + " (Not Started)";
                                break;
                            case 1:
                                e = e + " (Waiting)";
                                break;
                            case 2:
                                e = e + " (Loaded)";
                                break;
                            case 3:
                                e = e + " (Error)";
                                break;
                            case 4:
                                e = e + " (Timeout)"
                        }
                        d.jc.Rb.length > 0 && (e = e + (" Tags: [" + d.jc.Rb.join(",") + "]"));
                        window.console.log(e)
                    }
                }
            }
        }
    };

    function ob(a, b, c) {
        var d = this,
            e = j;
        this.Rb = c;
        this.nf = aa;
        this.yt = soundManager.createSound({
            id: a,
            url: b,
            zB: l,
            onload: function () {
                e.gf(d)
            },
            DC: function () {
                e.hf(d)
            },
            cD: function () {
                var a = this.bytesLoaded,
                    b = this.bytesTotal;
                a > 0 && a === b && e.gf(d)
            }
        });
        this.start = function (a) {
            e = a;
            navigator.userAgent.match(/(ipad|iphone|ipod)/i) ? e.hf(d) : this.yt.load()
        };
        this.or = function () {
            switch (d.yt.readyState) {
                case 2:
                    e.ss(d);
                    break;
                case 3:
                    e.gf(d)
            }
        };
        this.hf = function () {
            e.hf(d)
        };
        this.getName = function () {
            return b
        }
    }
    nb.prototype.Zq = function (a, b, c) {
        a = new ob(a, b, c);
        this.add(a)
    };
    var pb = [],
        qb = l,
        rb = l;

    function sb() {
        if (qb && rb) {
            var a = new nb({
                Ch: 3E4
            }),
                b = S.lw,
                c = S.cx(),
                d, e, g, h;
            d = 0;
            for (e = I.hs.length; d < e; d++) {
                g = I.hs[d];
                h = b + H[g].path + c;
                a.Zq("s" + g, h, "MENU")
            }
            d = 0;
            for (e = I.Jr.length; d < e; d++) {
                g = I.Jr[d];
                h = b + H[g].path + c;
                a.Zq("s" + g, h)
            }
            a.Uq(function () {
                for (var a = 0, b = pb.length; a < b; a++) pb[a]()
            });
            a.start()
        }
    }
    gb.Ay(function () {
        rb = i;
        sb()
    });

    function tb(a, b, c) {
        function d() {
            f.unbind("load", g);
            f.unbind("readystatechange", h);
            f.unbind("error", e)
        }
        function e() {
            d();
            //console.log("loading error:" + f.ka.src);
            k.ss(f)
        }
        function g() {
            d();
            k.gf(f)
        }
        function h() {
            if (f.ka.readyState == "complete") {
                d();
                k.gf(f)
            }
        }
        var f = this,
            k = j;
        this.ka = new Image;
        this.Rb = b;
        this.nf = c;
        this.start = function (b) {
            k = b;
            f.bind("load", g);
            f.bind("readystatechange", h);
            f.bind("error", e);
            f.ka.src = a
        };
        this.or = function () {
            if (f.ka.complete) {
                d();
                k.gf(f)
            }
        };
        this.hf = function () {
            d();
            f.ka.complete ? k.gf(f) : k.hf(f)
        };
        this.getName = function () {
            return a
        };
        this.bind = function (a, b) {
            f.ka.addEventListener ? f.ka.addEventListener(a, b, l) : f.ka.attachEvent && f.ka.attachEvent("on" + a, b)
        };
        this.unbind = function (a, b) {
            f.ka.removeEventListener ? f.ka.removeEventListener(a, b, l) : f.ka.detachEvent && f.ka.detachEvent("on" + a, b)
        }
    }
    nb.prototype.Ne = function (a, b) {
        var c = new tb(a, b, aa);
        this.add(c);
        return c.ka
    };
    var ub = new function () {
            this.en = function (a, b, c) {
                return b * a / c + 0
            };
            this.aC = function (a, b, c, d) {
                return c * Math.sqrt(1 - (a = a / d - 1) * a) + b
            };
            this.VB = function (a, b, c, d) {
                return -c * (Math.sqrt(1 - (a = a / d) * a) - 1) + b
            };
            this.YB = function (a, b, c, d) {
                return (a = a / (d / 2)) < 1 ? -c / 2 * (Math.sqrt(1 - a * a) - 1) + b : c / 2 * (Math.sqrt(1 - (a = a - 2) * a) + 1) + b
            };
            this.$B = function (a, b, c, d) {
                return -c * Math.cos(a / d * (Math.PI / 2)) + c + b
            };
            this.Sw = function (a) {
                return 0.05 * Math.sin(a / 5 * (Math.PI / 2)) + 0
            };
            this.ZB = function (a, b, c, d) {
                return -c / 2 * (Math.cos(Math.PI * a / d) - 1) + b
            };
            this.WB = function (a,
            b, c, d) {
                return c * (a = a / d) * a * a + b
            };
            this.Br = function (a, b, c, d) {
                return c * ((a = a / d - 1) * a * a + 1) + b
            };
            this.ah = function (a, b, c, d) {
                return (a = a / (d / 2)) < 1 ? c / 2 * a * a * a + b : c / 2 * ((a = a - 2) * a * a + 2) + b
            };
            this.XB = function (a, b, c, d) {
                return a == 0 ? b : c * Math.pow(2, 10 * (a / d - 1)) + b
            };
            this.We = function (a, b, c, d) {
                return a == d ? b + c : c * (-Math.pow(2, -10 * a / d) + 1) + b
            };
            this.Zi = function (a, b, c) {
                return a == 0 ? 0 : a == c ? 0 + b : (a = a / (c / 2)) < 1 ? b / 2 * Math.pow(2, 10 * (a - 1)) + 0 : b / 2 * (-Math.pow(2, -10 * --a) + 2) + 0
            };
            this.UB = function (a, b, c, d, e) {
                e == aa && (e = 1.70158);
                return c * (a = a / d) * a * ((e + 1) * a - e) + b
            };
            this.Am = function (a, b, c, d) {
                var e = 1.5;
                e == aa && (e = 1.70158);
                return c * ((a = a / d - 1) * a * ((e + 1) * a + e) + 1) + b
            };
            this.Yi = function (a, b, c, d) {
                d == aa && (d = 1.70158);
                return (a = a / (c / 2)) < 1 ? b / 2 * a * a * (((d = d * 1.525) + 1) * a - d) + 0 : b / 2 * ((a = a - 2) * a * (((d = d * 1.525) + 1) * a + d) + 2) + 0
            };
            this.Ar = function (a, b, c, d) {
                return (a = a / (d / 2)) < 1 ? c / 2 * a * a + b : -c / 2 * (--a * (a - 2) - 1) + b
            }
        }, vb = $,
        wb = {
            start: function () {
                qb = i;
                sb()
            },
            zy: function (a) {
                pb.push(a)
            }
        }, xb = new function () {
            function a(a, b, f, c, d) {
                function e() {
                    this.duration = this.vd = this.fe = this.cd = this.val = this.abs = 0;
                    this.Sf = this.Pf = l;
                    this.offset = 0
                }
                this.y = new e;
                this.x = new e;
                this.bg = a;
                this.delay = b;
                this.ka = this.bg ? p : q;
                this.re = 0.5 + Math.random() * 0.5;
                if (this.bg) {
                    this.x.fe = 0;
                    this.x.vd = 150;
                    this.x.duration = 2800;
                    this.x.Pf = i;
                    this.y.fe = 0;
                    this.y.vd = 60;
                    this.y.duration = 1300;
                    this.y.Pf = i
                } else {
                    this.x.fe = 0;
                    this.x.vd = d;
                    this.x.duration = f;
                    this.x.Pf = i;
                    this.y.fe = 0;
                    this.y.vd = 1;
                    this.y.duration = c;
                    this.y.Pf = l
                }
            }
            function b() {
                if (!d && f && k) {
                    k.width = f.offsetWidth;
                    k.height = f.offsetHeight
                }
            }
            function c() {
                if (s && z && D) {
                    vb(window).on("resize", b);
                    h = setTimeout(function () {
                        if (!d) {
                            vb("#loaderWindow").fadeIn();
                            vb("#loaderLogo").fadeIn(200);
                            var f = function () {
				                var a = +new Date - s;
                                if (z == j) {
                                    D = e;
                                    z = 0
                                } else if (e > ea) {
                                    var b = 100 / (100 - D) * (e - ea);
                                    b < 0 && (b = 0);
                                    z = z + b
                                }
                                z < ea && (z = z + 0.3);
                                ea = e;
                                z > 99 && (z = 99);
                                c.save();
                                c.setTransform(1, 0, 0, 1, 0, 0);
                                c.clearRect(0, 0, k.width, k.height);
                                c.restore();
                                for (b = 0; b < ya.length; b++) {
                                    var d = ya[b];
                                    if (d.bg) {
                                        d.y.offset = 250;
                                        d.x.offset = q / 2 - (d.ka.width + d.x.vd) / 2
                                    } else if (a < d.delay) {
                                        d.y.offset = -1E4;
                                        d.y.cd = a
                                    } else {
                                        if (a - d.y.cd >= d.y.duration) {
                                            d.y.cd = a;
                                            d.re = 0.5 + Math.random() * 0.5;
                                            d.x.offset = Math.random() * (q - d.x.vd * (1 / d.re))
                                        }
                                        d.y.offset = p + d.ka.height * 2 - ub.en(a - d.y.cd, 1, d.y.duration) * (p + d.ka.height * 2) - d.ka.height
                                    }
                                    if (a - d.x.cd >= d.x.duration) {
                                        d.x.cd = a;
                                        if (d.x.Pf) d.x.Sf = !d.x.Sf
                                    }
                                    d.x.val = ub.Ar(a - d.x.cd, d.x.fe, d.x.vd - d.x.fe, d.x.duration);
                                    d.x.abs = d.x.offset + (d.x.Sf ? d.x.vd - d.x.val : d.x.val);
                                    if (d.x.abs > q - d.ka.width * d.re) d.x.abs = q - d.ka.width * d.re;
                                    if (d.bg) {
                                        if (a - d.y.cd >= d.y.duration) {
                                            d.y.cd = a;
                                            if (d.y.Pf) d.y.Sf = !d.y.Sf
                                        }
                                        d.y.val = ub.Ar(a - d.y.cd, d.y.fe, d.y.vd - d.y.fe, d.y.duration)
                                    } else d.y.val = 0;
                                    d.y.abs = d.y.offset + (d.y.Sf ? d.y.vd - d.y.val : d.y.val);
                                    if (d.bg) {
                                        var h = Math.floor(Math.round(z) / 10) % 10,
                                            ae = Math.round(z) % 10;
                                        c.drawImage(r, h * 100, 0, 100, 100, d.x.abs + 65, d.y.abs + 75, 100, 100);
                                        c.drawImage(r, ae * 100, 0, 100, 100, d.x.abs + 105, d.y.abs + 75, 100, 100);
                                        c.drawImage(r, 1E3, 0, 100, 100, d.x.abs + 145, d.y.abs + 75, 100, 100)
                                    }
                                    c.save();
                                    if (d.bg) c.drawImage(d.ka, d.x.abs, d.y.abs);
                                    else {
                                        c.scale(d.re, d.re);
                                        c.drawImage(d.ka, d.x.abs * (1 / d.re), d.y.abs * (1 / d.re))
                                    }
                                    c.restore()
                                }
                                g && window.requestAnimationFrame(f)
                            };
                            g = i;
                            b();
                            var c = k.getContext("2d"),
                                p = k.height,
                                q = k.width,
                                s = +new Date,
                                z = j,
                                D = j,
                                ea = -1,
                                ya = [new a(i), new a(l, 0, 3E3, 5E3, 300), new a(l, 300, 5E3, 6E3, 400), new a(l, 2E3, 2E3, 4E3, 200), new a(l, 3200, 3E3, 5E3, 300)];
                            window.requestAnimationFrame(f)
                        }
                        h = j
                    }, 1E3)
                }
            }
            var d = l,
                e = 0,
                g = l,
                h = j,
                f, k, p, q, r, s = l,
                z = l,
                D = l;
            this.init = function () {
                var a = new nb({
                    Ch: 3E4
                });
                a.Ne("images/page/TILEBG.JPG");
                var b, f, d;
                if (b = I.yC) {
                    f = 0;
                    for (d = b.length; f < d; f++) a.Ne("images/page/" + b[f])
                }
                if (b = fb.zC) {
                    f = 0;
                    for (d = b.length; f < d; f++) a.Ne(S.Gn + b[f])
                }
                p = a.Ne("images/page/LOADER_B.PNG");
                q = a.Ne("images/page/LOADER_S.PNG");
                r = a.Ne("images/page/LOADER_N.PNG");
                a.Uq(function () {
                    s = i;
                    c()
                });
                a.start()
            };
            this.eb = function () {
                f = document.getElementById("loaderCanvasHost");
                k = document.getElementById("loaderCanvas");
                z = i;
                c()
            };
            this.ny = function () {
                g = l;
                d = i;
                e = 100
            };
            this.my = function (a) {
                e = a
            };
            this.show = function () {
                D = i;
                c()
            };
            this.hide = function () {
                function a() {
                    vb("#loaderWindow").hide()
                }
                if (h) {
                    clearTimeout(h);
                    h = j
                }
                if (g) {
                    g = l;
                    if (z) {
                        var f = k.getContext("2d");
                        f.save();
                        f.setTransform(1, 0, 0, 1, 0, 0);
                        f.clearRect(0, 0, k.width, k.height);
                        f.restore()
                    }
                    vb("#loaderWindow").fadeOut(500,
                    a)
                } else a();
                vb(window).off("resize", b)
            }
        }, yb = l,
        zb = l,
        Ab = j;

    function Bb() {
        if (yb && zb) {
            if (xb) {
                xb.ny();
                xb.hide()
            }
            Ab && setTimeout(Ab, 0);
            Bb = ba()
        }
    }
    var Cb, Db = String.fromCharCode(98, 112),
        Eb = String.fromCharCode(98, 115),
        Fb = Db + String.fromCharCode(50, 51, 57, 48),
        Gb = Ma.ij(Fb, j);
    Gb == j && (Gb = N.gb(1E3, 1E4), Ma.set(Fb, Gb));

    function Hb(a, b) {
        var c = Db + (a * 1E3 + b ^ Gb);
        return c === Fb ? c + "_" : c
    }
    function Ib(a, b, c) {
        Ma.set(Hb(a, b), c + b * 1E3 + a ^ Gb)
    }
    function Jb(a, b) {
        var c = Ma.ij(Hb(a, b), j);
        return c == j ? 0 : (c ^ Gb) - a - b * 1E3
    }

    function Kb(a, b, c) {
        c == j && (c = -1);
        Ma.set(Eb + (b * 1E3 + a ^ Gb), c + a * 1E3 + b ^ Gb)
    }
    function Lb(a, b) {
        var c = Ma.ij(Eb + (b * 1E3 + a ^ Gb), j);
        if (c == j) return j;
        c = (c ^ Gb) - b - a * 1E3;
        return c === -1 ? j : c
    }
    function Mb(a, b, c, d) {
        this.Vb = a;
        this.jg = b;
        this.se = c || [];
        this.mb = d || []
    }
    var Nb = new function () {
            var a = this,
                b = [];
            this.load = function () {
                b = [];
                for (var d = 0, e = I.Si.length; d < e; d++) {
                    var g = d,
                        h = I.Si[d].yh.length,
                        f = I.Xt[d],
                        k;
                    k = g;
                    for (var p = Ma.get(Hb(k, 0)) != j, q = I.Si[k].yh.length, r = I.Xt[k], s = [], z = [], D = aa, D = 0; D < q; D++) {
                        if (!p) {
                            var E = k,
                                W = D;
                            Kb(E, W, W === 0 ? 0 : j);
                            Ib(E, W, 0)
                        }
                        s.push(Jb(k, D));
                        z.push(Lb(k, D))
                    }
                    k = new Mb(q, r, s, z);
                    k != j && k.Vb == h && k.jg == f ? b[g] = k : a.aw(g, h, f);
                    if (Pa.LB == g + 1) {
                        for (f = 0; f < h; f++) a.Th(g, f, 3, i);
                        a.et(g)
                    }
                }
                c && a.kk()
            };
            J.subscribe(J.v.Xl, this.load);
            J.subscribe(J.v.Yl, this.load);
            var c = l;
            J.subscribe(J.v.mo, function () {
                c = i
            });
            this.et = function (a) {
                var c = b[a],
                    g;
                for (g = 0; g < c.Vb; g++) {
                    Ib(a, g, c.se[g]);
                    Kb(a, g, c.mb[g])
                }
            };
            this.aw = function (a, c, g) {
                for (var g = new Mb(c, g), h = 0; h < c; h++) g.se.push(0);
                for (h = 0; h < c; h++) g.mb.push(j);
                g.mb[0] = 0;
                b[a] = g;
                saveBox(a)
            };
            this.DB = function () {
                return b != j ? b.length : j
            };
            this.Vb = function (a) {
                a = b[a];
                return a != j ? a.Vb : j
            };
            this.jg = function (a) {
                a = b[a];
                return a != j ? a.jg : 0
            };
            this.dm = function (a) {
                a = b[a];
                if (a != j) {
                    for (var c = 0, g = 0; g < a.Vb; g++) var h = a.mb[g],
                        c = c + (h == j ? 0 : h);
                    return c
                }
                return 0
            };
            this.xf = function () {
                for (var c = 0, e = 0; e < b.length; e++) c = c + a.dm(e);
                return c
            };
            this.Ks = function (a) {
                a = b[a];
                return a != j ? a.Vb * 3 : 0
            };
            this.mj = function (c) {
                return c == 0 || Pa.Wt || b[c] != j && a.xf() >= a.jg(c) ? l : i
            };
            this.Ex = function (a) {
                var c = b[T.cb];
                return Pa.Wt ? i : c != j ? c.mb[a] != j : l
            };
            this.Tz = function (a, c, g) {
                var h = b[a];
                if (h != j) {
                    h.se[c] = Math.max(g, h.se[c]);
                    var c = h.se.length,
                        g = 0,
                        f;
                    for (f = 0; f < c; f++) g = g + h.se[f];
                    J.Aa(J.v.Rv, a, g)
                }
            };
            this.nx = function (a, c) {
                var g = b[a];
                return g != j ? g.se[c] : j
            };
            this.Th = function (a, c, g, h) {
                var f = this.xf(),
                    a = b[a];
                if (a != j) {
                    var k = a.mb[c];
                    a.mb[c] = k != j && !h ? Math.max(g, k) : g
                }
                c = this.xf();
                c !== f && J.Aa(J.v.Lv, c)
            };
            this.px = function (a) {
                var c = b[T.cb];
                return c != j ? c.mb[a] : j
            };
            this.ez = function () {
                var a = b.length,
                    c, g, h, f;
                for (c = 0; c < a; c++) {
                    g = b[c];
                    f = g.Vb;
                    for (h = 0; h < f; h++) {
                        var k = c,
                            p = h;
                        Kb(k, p, p === 0 ? 0 : j);
                        Ib(k, p, 0);
                        g.mb[h] = Lb(c, h);
                        g.se[h] = Jb(c, h)
                    }
                }
            };
            this.kk = function () {
                var a = R.T(P.Pv).replace("%d", Nb.xf());
                O.ya({
                    text: a,
                    Oc: "#boxScore img",
                    qa: i
                })
            };
            J.subscribe(J.v.cc, this.kk)
        };
    Cb = Nb;
    var Ob;
    Ob = la.extend({
        init: function (a, b, c, d, e) {
            this.index = a;
            this.dg = d;
            this.Jh = this.visible = i;
            this.Qg = j;
            this.opacity = 1;
            this.type = e;
            this.Oj = document.createElement("canvas");
            this.Oj.width = L.f(400);
            this.Oj.height = L.f(400);
            this.Pb = this.Oj.getContext("2d");
            this.gr = new Image;
            if (b) this.gr.src = S.Tc + b;
            var g = this.Jt = new Image,
                h = this.qw = L.f(350),
                f = this.hr = L.f(20),
                k = this;
            this.Kt = l;
            this.Xs = function () {
                O.ya({
                    text: R.lm(a, k.Sm),
                    ka: g,
                    width: (h - f * 2) / L.dc,
                    Oe: n.Dc,
                    qa: i
                });
                k.Kt = i
            };
            J.subscribe(J.v.cc, this.Xs);
            this.Qh = O.ya({
                text: c,
                qa: i
            });
            this.os = new Image;
            this.os.src = S.Tc + "box_omnom.png";
            this.es = new Image;
            this.es.src = S.Tc + "box_lock.png";
            this.ek = new Image;
            this.ek.src = S.Tc + "star_result_small.png";
            this.Fs = new Image;
            this.Fs.src = S.Tc + "perfect_mark.png";
            this.Sm = i
        },
        cg: ia(i),
        pj: ia(i),
        oj: ia(i),
        Sp: function (a, b) {
            this.Pb.save();
            this.Pb.setTransform(1, 0, 0, 1, 0, 0);
            this.Pb.clearRect(L.f(0), L.f(0), L.f(400), L.f(400));
            this.Pb.restore();
            var c = this.pj();
            if (c) {
                this.Pb.fillStyle = "rgb(45,45,53)";
                this.Pb.fillRect(L.f(130), L.f(200), L.f(140), L.f(100));
                b != j && this.Pb.drawImage(this.os, b + L.f(4), L.f(215))
            }
            this.Pb.drawImage(this.gr, L.f(25), L.f(0));
            if (c) {
                if (this.dg) {
                    var c = $(this.Qh).width() || this.Qh.width,
                        d = $(this.Qh).height() || this.Qh.height,
                        e = this.ek.width || $(this.ek).width(),
                        g = L.f(-6),
                        e = (L.f(125) - (c + g + e)) / 2,
                        e = L.f(140) + e;
                    this.Pb.scale(1.015, 1);
                    this.Pb.drawImage(this.es, L.f(23), L.f(155));
                    this.Pb.scale(1 / 1.015, 1);
                    this.Pb.drawImage(this.Qh, e, L.f(220), c, d);
                    this.Pb.drawImage(this.ek, e + c + g, L.f(225))
                }
                Cb.dm(this.index) === Cb.Ks(this.index) && this.Pb.drawImage(this.Fs,
                L.f(260), L.f(250))
            }
            this.Kt || this.Xs();
            d = $(this.Jt);
            c = d.width();
            d = d.height();
            g = Math.floor(L.f(25) + this.hr + (this.qw - this.hr * 2 - c) / 2);
            e = L.f(70);
            this.Pb.drawImage(this.Jt, g, e, c, d);
            a.globalAlpha = this.opacity;
            a.drawImage(this.Oj, 0, 0);
            a.globalAlpha = 1
        },
        to: function (a) {
            if (a != j) {
                this.Qg != j && clearInterval(this.Qg);
                var b = 0,
                    c = L.f(1024),
                    d = L.f(576),
                    e = this,
                    g = this.Qg = setInterval(function () {
                        var h, f;
                        if (b < 5) {
                            h = ub.Sw(b);
                            f = 1 - h;
                            h = 1 + h
                        } else if (b < 15) {
                            h = ub.ah(b - 5, 0, 0.11, 10);
                            f = 0.95 + h;
                            h = 1.05 - h
                        } else if (b < 30) {
                            h = ub.Br(b - 15, 0, 0.05,
                            15);
                            f = 1.06 - h;
                            h = 0.94 + h
                        }
                        f = (c - c * f) / 2;
                        h = (d - d * h) / 2;
                        var k = (c - 2 * f) / c,
                            p = (d - 2 * h) / d;
                        if (!isNaN(k) && !isNaN(p)) {
                            a.save();
                            a.setTransform(1, 0, 0, 1, 0, 0);
                            a.clearRect(L.f(312), L.f(100), L.f(400), L.f(460));
                            a.restore();
                            a.save();
                            a.scale(k, p);
                            a.translate(f, h);
                            a.translate(L.f(312), L.f(130));
                            e.Sp(a, L.f(140));
                            a.restore()
                        }
                        b > 30 && clearInterval(g);
                        b++
                    }, 20)
            }
        },
        mr: function () {
            this.Qg != j && clearInterval(this.Qg)
        },
        Bj: ba(),
        Ej: ba()
    });
    var Pb;

    function Qb(a) {
        (new Image).src = "http://view.atdmt.com/action/" + a
    }

    function Rb(a) {
        (new Image).src = "external.html?link=http://ace.adoftheyear.com/p11953/tagger_v02.php?project=p11953&amp;tag=1a&amp;channel=" + a
    }
    Pb = {
        vs: function () {
            if (S.De) {
                Qb("SMG_MRTINX_CTR_SITE_PlayNow");
                Rb("[sid=US_CTR_Game_tag_1_1|cid=10105|]")
            }
        },
        ys: function () {
            S.De && _gaq.push(["_trackEvent", "IE Box", "Pinned"])
        },
        xs: function () {
            S.De && _gaq.push(["_trackEvent", "IE Box", "Show Me"])
        },
        rs: function () {
            S.De && _gaq.push(["_trackEvent", "IE Box", "Download IE"])
        },
        us: function (a) {
            if (S.De) {
                Qb("SMG_MRTINX_CTR_SITE_Level1_Confirmation");
                Rb("[sid=US_CTR_Game_tag_2_1|cid=10106|]");
                _gaq.push(["_trackEvent", "First Level", "Completed", "FPS", Math.round(a)])
				
				//Weiwei Added
				beforeCutFPS[cur_run-1]=(before_cut/before_cnt).toFixed(2);
				afterCutFPS[cur_run-1]=(after_cut/after_cnt).toFixed(2);
		
            }
        },
        ts: function () {
            S.De && Qb("SMG_MRTINX_CTR_SITE_Facebook_Share")
        },
        zs: function () {
            S.De && Qb("SMG_MRTINX_CTR_SITE_Twitter_Share")
        }
    };
    var Sb;
    Sb = Ob.extend({
        init: function (a, b, c, d, e) {
            this.h(a, b, c, d, e);
            this.lf = -1;
            this.of = j;
            var g = this;
            $(document).ready(function () {
                $("#showMeBtn").click(function () {
                    Pb.xs && Pb.xs();
                    g.dA()
                });
                var a = $("#installieBtn"),
                    b = getIE9DownloadUrl();
                if (b) {
                    a.on("click", function () {
                        Pb.rs && Pb.rs();
                        window.location.href = b
                    });
                    J.subscribe(J.v.cc, function () {
                        O.ya({
                            text: R.T(P.So),
                            ka: a.find("img")[0],
                            qa: i
                        })
                    })
                } else a.hide()
            })
        },
        cg: function () {
            return this.lf !== 0
        },
        yx: function () {
            var a;
            a = -1;
            if (navigator.appName == "Microsoft Internet Explorer" || navigator.appName == "MSAppHost/1.0") {
                var b = /MSIE ([0-9]?[0-9]{1,}[.0-9]{0,})/.exec(navigator.userAgent);
                b != j && b.length > 1 && (a = parseInt(b[1], 10))
            }
            var c;
            a: {
                try {
                    var d = navigator.userAgent,
                        e = d.indexOf("Windows NT") != -1,
                        g = e ? parseInt(d[d.indexOf("Windows NT") + 11]) : -1;
                    if (e && g >= 6) {
                        c = i;
                        break a
                    }
                } catch (h) {}
                c = l
            }
            if (a >= 9 || Pa.Yw) {
                c = S.wu || Ma.get("msIsSiteModeActivated") == "true";
                d = S.wu === i;
                if (!d) try {
                    window.external.msIsSiteMode() && (d = i)
                } catch (f) {}
                if (c || d || Pa.Yw) {
                    this.opacity = this.lf = 1;
                    this.of = j;
                    if (!c) {
                        Ma.set("msIsSiteModeActivated",
                            "true");
                        Pb.ys && Pb.ys()
                    }
                } else {
                    this.lf = 3;
                    this.opacity = 0.35;
                    this.of = "pinPrompt";
                    J.subscribe(J.v.cc, function () {
                        O.ya({
                            text: R.T(P.Xp),
                            Oc: "#showMeBtn img",
                            qa: i
                        })
                    })
                }
            } else if (c) {
                this.lf = 2;
                this.opacity = 0.35;
                this.of = "iePrompt"
            } else {
                this.lf = 0;
                this.opacity = 0.35;
                this.of = j
            }
            return this.lf == 0 || this.lf == -1 ? l : i
        },
        Bj: function () {
            if (this.of != j) {
                $("#pinningContent").stop(i, i).delay(100).fadeIn(800);
                $("#" + this.of).show()
            }
        },
        Ej: function () {
            this.of != j && $("#pinningContent").stop(i, i).fadeOut(300)
        },
        dA: function () {
            var a = $("#pinCursor"),
                b = $("#pinOmNom"),
                c = $("#pinChairShadow"),
                d = $("#showMeBtn"),
                e = $("#pinTaskBar");
            d.fadeOut().delay(5500).fadeIn(1E3);
            c.delay(500).fadeOut().delay(6E3).fadeIn(300);
            a.delay(500).fadeIn().delay(2250).animate({
                left: L.f(200)
            }, 500, "easeInOutCirc").fadeOut().animate({
                top: L.f(65),
                left: L.f(45),
                scale: "1.0"
            }, 0);
            b.delay(500).fadeIn().delay(1E3).animate({
                top: L.f(305),
                left: L.f(165)
            }, 1E3, "easeInOutBack").delay(1500).animate({
                scale: "0.65"
            }, 200).delay(1500).fadeOut(1E3).animate({
                top: L.f(115),
                left: L.f(-49),
                scale: "1.0"
            },
            50).fadeIn(500);
            e.delay(500).fadeIn().delay(5E3).fadeOut(1E3)
        }
    });
    var Tb, Ub, Vb;
    $(function () {
        Ub = $("#boxUpgradePrompt").hide();
        Vb = $("#boxUpgradeButton").hide()
    });
    J.subscribe(J.v.cc, function () {
        O.ya({
            text: R.T(P.Mq),
            uc: "boxUpgradePrompt",
            width: L.f(650),
            Oe: n.M,
            qa: i
        });
        O.ya({
            text: R.T(P.zu),
            uc: "boxUpgradeButton",
            qa: i
        })
    });
    Tb = Ob.extend({
        init: function (a, b, c, d, e) {
            this.h(a, b, c, d, e);
            this.Sm = this.Jh = l
        },
        cg: ia(l),
        pj: ia(l),
        Bj: function () {
            Ub.fadeIn();
            Vb.fadeIn()
        },
        Ej: function () {
            Ub.fadeOut();
            Vb.fadeOut()
        }
    });
    var Wb = Ob.extend({
        init: function (a, b, c, d, e) {
            this.h(a, b, c, d, e);
            this.Sm = l
        },
        cg: ia(l),
        pj: ia(l),
        oj: ia(l)
    }),
        Xb = {
            yb: 0,
            yd: 1,
            Zc: 2,
            Ee: 3,
            pi: 4,
            zp: 5,
            Bg: 6,
            Sd: 7,
            Co: 8,
            Ie: 9,
            Ae: 10
        };

    function Yb(a) {
        this.Gd = a.element;
        this.jh = a.jh;
        var b = this;
        this.At = function (c) {
            b.zn(c);
            return a.nn ? b.jk(c, a.nn) : l
        };
        this.ns = function (c) {
            b.zn(c);
            return a.kn ? b.jk(c, a.kn) : l
        };
        this.Dr = function (c) {
            b.zn(c);
            return a.hn ? b.jk(c, a.hn) : l
        };
        this.Ds = function (c) {
            return a.ln ? b.jk(c, a.ln) : l
        }
    }
    Yb.prototype.jk = function (a, b) {
        var c = 0,
            d = 0;
        if (!a) a = window.event;
        if (a.changedTouches && a.changedTouches.length > 0) {
            c = a.changedTouches[0].pageX;
            d = a.changedTouches[0].pageY
        } else if (a.targetTouches && a.targetTouches.length > 0) {
            c = a.targetTouches[0].pageX;
            d = a.targetTouches[0].pageY
        } else if (a.pageX || a.pageY) {
            c = a.pageX;
            d = a.pageY
        } else if (a.clientX || a.clientY) {
            c = a.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            d = a.clientY + document.body.scrollTop + document.documentElement.scrollTop
        }
        var e = $(this.Gd).offset(),
            g = this.jh ? this.jh() : 1,
            c = Math.round((c - e.left) / g),
            d = Math.round((d - e.top) / g);
        return b(c, d)
    };
    Yb.prototype.zn = function (a) {
        a.preventManipulation ? a.preventManipulation() : a.preventDefault()
    };
    Yb.prototype.ad = function () {
        this.Gd.addEventListener(Yb.Un, this.At, l);
        this.Gd.addEventListener(Yb.ms, this.ns, l);
        this.Gd.addEventListener(Yb.Bm, this.Dr, l);
        this.Gd.addEventListener(Yb.Cs, this.Ds, l)
    };
    Yb.prototype.gd = function () {
        this.Gd.removeEventListener(Yb.Un, this.At, l);
        this.Gd.removeEventListener(Yb.ms, this.ns, l);
        this.Gd.removeEventListener(Yb.Bm, this.Dr, l);
        this.Gd.removeEventListener(Yb.Cs, this.Ds, l)
    };
    Yb.lk = window.navigator.msPointerEnabled;
    Yb.fo = "undefined" !== typeof Modernizr && Modernizr.touch;
    Yb.Un = Yb.lk ? "MSPointerDown" : Yb.fo ? "touchstart" : "mousedown";
    Yb.ms = Yb.lk ? "MSPointerMove" : Yb.fo ? "touchmove" : "mousemove";
    Yb.Bm = Yb.lk ? "MSPointerUp" : Yb.fo ? "touchend" : "mouseup";
    Yb.Cs = Yb.lk ? "MSPointerOut" : "mouseout";
    var Zb = new function () {
            this.mk = j;
            this.zoom = 1;
            this.yA = "top left";
            this.Bz = function () {
                this.mk = $("#c")
            };
            this.OC = function (a) {
                this.mk = $(a)
            };
            this.au = function (a) {
                var a = a || {}, b = "scale(" + this.zoom.toFixed(2) + ")",
                    c = ["ms", "o", "webkit", "moz"],
                    d = this.yA,
                    e, g, h;
                this.zoom === 1 && (b = d = "");
                e = 0;
                for (g = c.length; e < g; e++) {
                    h = "-" + c[e] + "-transform";
                    a[h] = b;
                    a[h + "-origin"] = d
                }
                this.mk.css(a)
            };
            this.dx = function () {
                return this.zoom || 1
            };
            this.Pr = function () {
                return this.zoom || 1
            };
            this.AB = function () {
                var a = this;
                $(window).resize(function () {
                    a.resize()
                });
                this.resize()
            };
            this.iy = this.jy = 0;
            this.resize = function (a) {
                var b = $(window),
                    c = b.width(),
                    b = b.height(),
                    d = this.jy,
                    e = this.iy;
                if (!a) this.zoom = Math.min(c / d, b / e);
                a = Math.round((c - d * this.zoom) / 2);
                c = Math.round((b - e * this.zoom) / 2);
                this.au({
                    "margin-top": c,
                    "margin-left": a
                })
            }
        };
    Zb.eb = function () {
        var a = L.Jf / L.xb;
        if (a !== 1) {
            this.Bz();
            this.zoom = a;
            this.au()
        }
    };
    Zb.Pr = ia(1);
    var U;
    U = {
        Ri: l,
        rf: Qa.Jm(),
        Ah: Qa.Im(),
        Kd: j,
        G: function (a) {
            this.rf && !gb.qj(a) && gb.play(a)
        },
        Ry: function (a) {
            this.rf && gb.qj(a) && gb.pause(a)
        },
        iz: function (a) {
            this.rf && gb.Fx(a) && gb.play(a)
        },
        Hs: function (a) {
            var b = this;
            this.rf && !gb.qj(a) && gb.play(a, function () {
                !b.Ri && b.rf && b.Hs(a)
            })
        },
        Wn: function (a) {
            gb.stop(a)
        },
        Hh: function (a) {
            this.Kd && this.Kd !== a && this.nA(a);
            var b = this;
            if (this.Ah && !gb.qj(a)) {
                this.Kd = a;
                gb.aA(a, 70);
                gb.play(a, function () {
                    !b.Ri && b.Ah && b.Hh(a)
                })
            }
        },
        Py: function () {
            this.Ri = i;
            this.Gh();
            this.Ry(C.Ad)
        },
        Gh: function () {
            this.Kd && gb.pause(this.Kd)
        },
        hz: function () {
            this.Ri = l;
            this.Hn();
            this.iz(C.Ad)
        },
        Hn: function () {
            this.Kd && this.Hh(this.Kd)
        },
        nA: function () {
            this.Kd && gb.stop(this.Kd)
        },
        Yj: function (a) {
            this.Ah = a;
            Qa.Yj(a);
            this.Ah ? this.Hn() : this.Gh()
        },
        Zj: function (a) {
            this.rf = a;
            Qa.Zj(a)
        }
    };

    function $b() {
        var a = ac;
        if (a === ac) {
            var a = bc[a],
                b = a.index;
            if (a.oj()) {
                U.G(C.ga);
                if (a.Jh === l) J.Aa(J.v.ov);
                else if (Cb.mj(b)) {
                    O.ya({
                        text: R.T(P.xo),
                        uc: "missingLine1",
                        qa: i
                    });
                    O.ya({
                        text: Cb.jg(b) - Cb.xf(),
                        uc: "missingCount",
                        qa: i
                    });
                    O.ya({
                        text: R.T(P.yo),
                        uc: "missingLine2",
                        qa: i
                    });
                    O.sc({
                        text: R.T(P.zo),
                        uc: "missingLine3",
                        qa: i
                    });
                    O.ya({
                        text: R.T(P.lv),
                        uc: "missingOkBtn",
                        qa: i
                    });
                    U.G(C.ga);
                    cc.Qn("missingStars")
                } else cc.Fy(b)
            }
        }
    }

    function dc(a) {
        ec = a;
        fc.setTransform(1, 0, 0, 1, 0, 0);
        fc.clearRect(0, 0, gc.width, gc.height);
        var b = hc + a,
            c = L.f(130);
        fc.translate(b, c);
        for (var d = 0, e = 0; e < bc.length; e++) {
            var g = j,
                h = a + d,
                f = bc[e];
            if (f.visible) {
                h > L.f(-100) && h < L.f(100) && (g = (hc + a) * -1 - d + L.f(452));
                fc.translate(d, 0);
                f.Sp(fc, g);
                fc.translate(-d, 0);
                d = d + ic
            }
        }
        fc.translate(-b, -c)
    }

    function jc(a) {
        kc();
        a < 0 && (a = 0);
        a > bc.length - 1 && (a = bc.length - 1);
        var b = lc;
        a == ac && (b = 0);
        mc != j && mc != bc[a] && mc.Ej != j && mc.Ej();
        ac = a;
        J.Aa(J.v.uq, bc[ac].index);
        nc != j && clearInterval(nc);
        oc = ec;
        pc = -1 * ic * a;
        qc = 0;
        nc = setInterval(function () {
            ec = ub.We(qc, oc, pc - oc, b);
            dc(ec);
            Math.abs(ec - pc) < 5 && (rc = i);
            if (qc == b) {
                clearInterval(nc);
                if (mc != bc[ac]) {
                    mc = bc[ac];
                    mc.to(fc)
                }
                mc != j && mc.Bj != j && mc.Bj()
            }
            qc++
        }, 1E3 / 45);
        sc.find("div").toggleClass("boxNavDisabled", a <= 0);
        tc.find("div").toggleClass("boxNavDisabled", a >= bc.length - 1)
    }

    function kc() {
        clearInterval(nc);
        mc != j && mc.mr()
    }
    function uc(a, b) {
        return rc && mc != j && mc.oj() && a > L.f(340) && a < L.f(680) && b > L.f(140) && b < L.f(460) ? i : l
    }
    function vc(a) {
        kc();
        wc = a;
        xc = ec;
        yc = i
    }
    function zc(a, b) {
        if (yc) {
            kc();
            Ac = a - wc;
            if (Math.abs(Ac) > 5) {
                rc = l;
                dc(xc + Ac)
            }
        } else $(gc).toggleClass("ctrPointer", uc(a, b))
    }

    function Bc(a, b) {
        if (yc) {
            kc();
            Ac = a - wc;
            if (Math.abs(Ac) > ic / 2) {
                Cc = ec;
                var c = Math.round(-1 * Cc / ic);
                jc(c)
            } else if (Math.abs(Ac) > 5) {
                c = L.f(30);
                jc(Ac > c ? ac - 1 : Ac < c * -1 ? ac + 1 : ac)
            } else {
                c = bc[ac];
                if (c.oj()) {
                    c.dg || jc(ac);
                    uc(a, b) && $b()
                }
            }
        }
        yc = l
    }
    function Dc(a, b) {
        Bc(a, b)
    }
    var bc = [],
        ac = 0,
        ec = 0,
        rc = i,
        ic = L.f(600),
        hc = L.f(312),
        mc = j,
        cc = j,
        gc, fc, sc, tc, Ec = new function (a, b, c, d) {
            this.id = a;
            this.jf = b;
            this.Qe = c;
            this.ut = d
        }(Xb.yd, "boxPanel", "menuBackground", i);
    $(function () {
        gc = document.getElementById("boxCanvas");
        fc = gc.getContext("2d");
        gc.width = L.f(1024);
        gc.height = L.f(576);
        sc = $("#boxNavBack").click($.proxy(function () {
            if (ac > 0) {
                jc(ac - 1);
                U.G(C.ga)
            }
        }, this));
        tc = $("#boxNavForward").click($.proxy(function () {
            if (ac < bc.length - 1) {
                jc(ac + 1);
                U.G(C.ga)
            }
        }, this));
        $("#missingOkBtn").click(function () {
            U.G(C.ga);
            cc.Ui()
        });
        $("#boxUpgradeButton").click(function () {
            $b()
        })
    });
    J.subscribe(J.v.Pq, function (a) {
        bc = a;
        Ec.Bn()
    });
    Ec.init = function (a) {
        cc = a
    };
    Ec.Dy = function () {
        this.ad()
    };
    Ec.wy = function () {
        this.gd()
    };
    Ec.iA = function () {
        jc(ac + 1)
    };
    Ec.nw = function () {
        if (mc != j && fc != j) {
            mc.mr();
            mc.to(fc)
        }
    };
    var oc = 0,
        pc = 0,
        qc = 0,
        lc = 25,
        nc = j,
        yc = l,
        Cc = 0,
        xc = 0,
        Ac = 0,
        wc = j;
    Ec.od = j;
    Ec.ad = function () {
        if (!this.od) this.od = new Yb({
            element: gc,
            nn: $.proxy(vc, this),
            kn: $.proxy(zc, this),
            hn: $.proxy(Bc, this),
            ln: $.proxy(Dc, this),
            jh: function () {
                return Zb.Pr()
            }
        });
        this.od.ad()
    };
    Ec.gd = function () {
        this.od && this.od.gd()
    };
    Ec.Bn = function () {
        jc(ac)
    };
    var Fc, Gc = J,
        Hc = new function () {
            function a() {
                if (e) {
                    c.cb = 0;
                    c.Cb = 1;
                    var a = I.fr,
                        h = I.pw,
                        f, k, p, q, r;
                    d = [];
                    f = 0;
                    for (k = h.length; f < k; f++) {
                        p = h[f];
                        q = Cb.jg(f);
                        r = Cb.mj(f);
                        switch (p) {
                            case Ia.$o:
                                p = new Sb(f, a[f], q, r, p);
                                p.yx() || (p = j);
                                break;
                            case Ia.Lp:
                                p = new Tb(f, a[f], q, r, p);
                                break;
                            case Ia.Dp:
                                p = new Wb(f, a[f], q, r, p);
                                break;
                            default:
                                p = new Ob(f, a[f], q, r, p)
                        }
                        p && d.push(p)
                    }
                    b()
                }
            }
            function b() {
                var a = [],
                    b, f, c;
                b = 0;
                for (c = d.length; b < c; b++) {
                    f = d[b];
                    f.index = b;
                    f.visible && a.push(f)
                }
                Gc.Aa(Gc.v.Pq, a)
            }
            var c = this,
                d = [];
            Gc.subscribe(Gc.v.uq, function (a) {
                Hc.cb = a;
                Hc.Cb = 1
            });
            var e = l;
            this.Pe = function () {
                e = i;
                a()
            };
            c.cb = 0;
            c.Cb = 1;
            Gc.subscribe(Gc.v.Xl, a);
            Gc.subscribe(Gc.v.Yl, a);
            this.Ys = function () {
                for (var a = 0, b = 0, f = d.length; b < f; b++) d[b].cg() && a++;
                return a
            };
            this.Uy = function () {
                for (var a = 0, b = d.length, f = 0; f < b; f++) d[f].cg() && (a = a + Cb.Ks(f));
                return a
            };
            this.bD = function () {
                var a = 0,
                    b, f, c;
                b = 0;
                for (f = d.length; b < f; b++) {
                    c = d[b];
                    c.cg() && c.Jh !== l && a++
                }
                return a
            };
            this.gz = function () {
                var a, b, f;
                a = 1;
                for (b = d.length; a < b; a++) {
                    f = d[a];
                    if (!f.pj()) f.dg = i
                }
                Ec.Bn()
            };
            this.$t = function () {
                var a = d.length,
                    b = l,
                    f, c;
                for (f = 1; f < a; f++) {
                    c = d[f];
                    if (!Cb.mj(f) && !c.Jh && c.dg) {
                        c.dg = l;
                        b = i;
                        Cb.Th(f, 0, 0)
                    }
                }
                b && Ec.Bn()
            };
            Gc.subscribe(Gc.v.Dv, function (a) {
                var a = a || Pa.Wt === i,
                    c, f, e;
                c = 1;
                for (f = d.length; c < f; c++) {
                    e = d[c];
                    if (e.type === Ia.Lp) e.visible = !a;
                    else {
                        e.visible = e.Jh = a;
                        e.dg = !a || Cb.mj(c)
                    }
                }
                b()
            })
        };
    Fc = Hc;
    var Ic, Jc = ub;
    Ic = new function () {
        function a() {
            clearTimeout(W);
            W = setTimeout(function () {
                if (q != j) {
                    clearInterval(q);
                    q = j
                }
            }, 6E4)
        }
        function b(a, b, f, c) {
            this.id = a;
            this.jf = b;
            this.Qe = f;
            this.ut = c
        }
        var c = this,
            d = [];
        this.mn = j;
        this.eb = function () {
            k = $("#fadeToBlack");
            s = document.getElementById("shadowCanvas");
            s.width = L.f(1280);
            s.height = L.f(576)
        };
        this.Pe = function (a) {
            z = new Image;
            z.src = S.Tc + "shadow.png";
            if (a) for (var b = 0, f = d.length; b < f; b++) a(d[b].id)
        };
        var e = this.Nr = function (a) {
            for (var b = 0; b < d.length; b++) if (d[b].id == a) return d[b];
            return j
        };
        d.push(new b(Xb.yb, "menuPanel", "startBackground", i));
        d.push(Ec);
        d.push(new b(Xb.Zc, "levelPanel", "levelBackground", i));
        d.push(new b(Xb.Ee, j, j, l));
        d.push(new b(Xb.pi, j, j, l));
        d.push(new b(Xb.zp, j, j, l));
        d.push(new b(Xb.Bg, "gameCompletePanel", "menuBackground", i));
        d.push(new b(Xb.Sd, "optionsPanel", "menuBackground", i));
        d.push(new b(Xb.Co, j, j, l));
        d.push(new b(Xb.Ie, "leaderboardPanel", "menuBackground", i));
        d.push(new b(Xb.Ae, "achievementsPanel", "menuBackground", i));
        this.Vi = Xb.yb;
        this.hb = function (b, f) {
            c.Vi = b;
            a();
            var k = e(b),
                p = f == j ? l : f;
            if (k.ut) {
                if (!E) {
                    if (s != j) {
                        var da = s.getContext("2d");
                        da.save();
                        da.setTransform(1, 0, 0, 1, 0, 0);
                        da.clearRect(0, 0, s.width, s.height);
                        da.restore()
                    }
                    D = 0;
                    E = i;
                    $("#shadowPanel").show();
                    if (q == j) {
			            var ea = s.getContext("2d");
                        q == j && (q = setInterval(function () {
                            ea.save();
                            ea.setTransform(1, 0, 0, 1, 0, 0);
                            ea.clearRect(0, 0, s.width, s.height);
                            ea.restore();
                            if (D < 1) {
                                D = D + 0.025;
                                D = Math.min(D, 1);
                                ea.globalAlpha = D
                            }
                            ea.save();
                            ea.translate(z.width * 0.5, z.height * 0.5);
                            ea.translate(L.f(-300), L.f(-510));
                            ea.rotate(r * Math.PI / 180);
                            ea.translate(-z.width * 0.5, -z.height * 0.5);
                            ea.drawImage(z, 0, 0);
                            ea.restore();
                            r = r + 0.1
                        }, 25));

						
                        a()
                    }
                }
            } else {
                E = l;
                $("#shadowPanel").hide();
                if (q != j) {
                    if (q != j) {
                        clearInterval(q);
                        q = j
                    }
                    q = j
                }
            }
            if (k.jf != j) {
                setTimeout(function () {
                    k.Qe != j && $("#" + k.Qe).show();
                    $("#" + k.jf).show();
                    if (b != Xb.Ee) for (var a = 0; a < d.length; a++) {
                        var f = d[a];
                        f.jf != j && f.jf != k.jf && $("#" + f.jf).hide();
                        f.Qe != j && f.Qe != k.Qe && $("#" + f.Qe).hide()
                    }
                    c.mn != j && c.mn(b);
                    p || c.pz()
                }, p ? 0 : g + h);
                p || c.oz()
            }
        };
        var g = 100,
            h = 50,
            f = 1,
            k, p = l;
        this.oz = function () {
            function a() {
                var c = +new Date - b;
                k.css("opacity", Jc.en(c, f, g));
                c < g ? window.requestAnimationFrame(a) : k.css("opacity", f)
            }
            p = i;
            var b = +new Date;
            k.css("opacity", 0);
            k.css("display", "block");
            window.requestAnimationFrame(a)
        };
        this.pz = function () {
            function a() {
                var c = +new Date - b;
                k.css("opacity", f - Jc.en(c, f, g));
                if (c < g) window.requestAnimationFrame(a);
                else {
                    k.css("opacity", 0);
                    k.css("display", "none");
                    p = l
                }
            }
            if (p) {
                var b = +new Date;
                window.requestAnimationFrame(a)
            }
        };
        var q = j,
            r = 15,
            s = j,
            z = j,
            D = 1,
            E = l,
            W = j
    };
    var Kc;
    Kc = new function () {
        this.bk = I.bk;
        this.hm = "278847552173744";
        var a = window.location.host || "";
        if (a.indexOf("thinkpixellab") >= 0) this.hm = "239041062884795";
        else if (a.indexOf(".dev") >= 0) this.hm = "261043477350153";
        var b = this;
        J.subscribe(J.v.cc, function () {
            b.gA = R.T(P.Zp);
            b.hA = R.T(P.$p);
            b.fA = [{
                name: R.T(P.Yp),
                link: I.bk
            }]
        });
        this.wx = function () {
            var a = {};
            a.appId = b.hm;
            a.status = i;
            a.cookie = i;
            a.xfbml = i;
            FB.init(a);
            FB.Event.subscribe("edge.create", function () {
                Pb.ts && Pb.ts()
            })
        };
        this.Ls = function (a, d, e) {
            var g = Kc.gA;
            if (S.NB) J.Aa(J.v.Ev,
            a, g, d);
            else {
                var h = {
                    method: "feed"
                };
                h.name = b.hA;
                h.caption = a;
                h.description = g;
                h.link = b.bk;
                h.picture = d;
                h.actions = b.fA;
                FB.ui(h, e)
            }
        };
        this.zx = function (a) {
            a.events.bind("tweet", function () {
                Pb.zs && Pb.zs()
            })
        }
    };
    var Lc, Mc = la.extend({
        init: function (a) {
            this.Te = Mc.U.Gg;
            this.wd = [];
            this.children = [];
            this.vn = this.Ec = this.ob = t.d;
            this.parent = a;
            this.wh = t.d;
            this.fh = this.Dm = this.Ng = this.frames = this.um = 0;
            this.Fc = 1 / 60;
            this.Hj = [this.Fc, this.Fc, this.Fc, this.Fc, this.Fc]
        },
        ad: function () {
            this.Te = Mc.U.ko;
            J.Aa(J.v.Do, this)
        },
        gd: function () {
            J.Aa(J.v.Eo, this)
        },
        ur: function () {
            this.Te = Mc.U.Gg;
            this.ob !== t.d && this.Om();
            J.Aa(J.v.UA, this);
            this.parent.ps(this.parent.Ec)
        },
        pause: function () {
            this.Te = Mc.U.Ig;
            J.Aa(J.v.Fo, this);
            if (this.ob != t.d) {
                this.vn = this.ob;
                this.Om()
            }
        },
        Yt: function () {
            this.Te = Mc.U.ko;
            if (this.Ec !== t.d) this.Ec = t.d;
            J.Aa(J.v.Go, this);
            this.vn !== t.d && this.vt(this.vn)
        },
        update: function () {
            if (this.ob !== t.d) for (var a = this.em(), b = Math.min(3, Math.floor(this.fh)), c = 0; c < b; c++) {
                a.update(0.016);
                this.fh = this.fh - 1
            }
        },
        fz: function () {
            this.wh = t.d
        },
        lr: function (a) {
            this.um = this.wh !== t.d ? (a - this.wh) / 1E3 : 0;
            this.wh = a;
            this.fh = this.fh + this.pr(this.um) / 0.016
        },
        pr: function (a) {
            return a < 0.016 ? 0.016 : a > 0.05 ? 0.05 : a
        },
        rw: function () {
            this.frames++;			
            this.Ng = this.Ng + this.um;
            if (this.Ng > 1) {
                this.Dm = this.frames / this.Ng;
                this.Ng = this.frames = 0;
                this.Hj.shift();
                this.Hj.push(this.pr(1 / this.Dm));
                for (var a = this.Fc = 0, b = this.Hj.length; a < b; a++) this.Fc = this.Fc + this.Hj[a];
                this.Fc = this.Fc / b
            }
        },
        ew: function (a, b) {
            this.wd[b] = a
        },
        Cw: function (a) {
            this.wd[a] = j
        },
        Om: function () {
            var a = this.wd[this.ob];
            if (a) {
                J.Aa(J.v.Ho, a);
                a.hide();
                this.ob = t.d
            }
        },
        vt: function (a) {
            this.ob != t.d && this.Om();
            this.ob = a;
            a = this.wd[a];
            J.Aa(J.v.Io, a);
            a.show()
        },
        em: function () {
            return this.wd[this.ob]
        },
        Ye: function (a) {
            return this.wd[a]
        },
        Vd: function (a, b) {
            this.children[b] = a
        },
        Bw: function (a) {
            this.children[a] = j;
            if (this.Ec === a) this.Ec = t.d
        },
        tr: function () {
            if (this.Ec !== t.d) {
                var a = this.children[this.Ec];
                a && a.gd();
                this.Ec = t.d
            }
        },
        Yv: function (a) {
            this.Ec !== t.d && this.tr();
            this.pause();
            this.Ec = a;
            this.children[a].ad()
        },
        ps: function () {
            this.Yt()
        },
        xB: function () {
            return this.children[this.Ec]
        },
        fb: function (a) {
            return this.children[a]
        },
        zj: function (a, b) {
            return this.ob === t.d ? l : this.wd[this.ob].Cj(a, b)
        },
        fg: function (a, b) {
            return this.ob === t.d ? l : this.wd[this.ob].Dj(a,
            b)
        },
        ks: function (a, b) {
            return this.ob === t.d ? l : this.wd[this.ob].qn(a, b)
        },
        ls: ia(l),
        Yg: function (a, b) {
            return this.ob === t.d ? l : this.wd[this.ob].qs(a, b)
        }
    });
    Mc.U = {
        Gg: 0,
        ko: 1,
        Ig: 2
    };
    Lc = Mc;
    var Nc;
    Nc = Lc.extend({
        init: function (a) {
            this.h(a);
            this.hk = l;
            this.ha = j;
            this.St = this.hu = t.d;
            this.Kj = j;
            this.zA = 0.3;
            this.Qf = this.tm = l;
            J.subscribe(J.v.Do, $.proxy(this.py, this));
            J.subscribe(J.v.Eo, $.proxy(this.ry, this));
            J.subscribe(J.v.tu, $.proxy(this.qy, this));
            J.subscribe(J.v.Fo, $.proxy(this.sy, this));
            J.subscribe(J.v.Go, $.proxy(this.ty, this));
            J.subscribe(J.v.Ho, $.proxy(this.uy, this));
            J.subscribe(J.v.Io, $.proxy(this.vy, this))
        },
        Gy: function (a) {
            if (!(this.hk || this.ha === j)) {
                this.ha.lr(a);
                this.St === t.d && this.ha.update();
                if (this.tm) {
                    this.tm = l;
                    this.ha.ur()
                }
                if (this.ha.ob !== t.d) {
                    (a = this.ha.em()) && a.s();
                    this.ha.rw();
                    if (Qa.Hr) {
                        a = this.ha.Dm.toFixed(0);
                        if (a > 0) {
                            var b = u.context;
                            b.font = "20px Arial";
                            b.fillStyle = m.Xn.Rl;
							
							//Weiwei Added
							if (has_cut)
						{
								after_cut=Number(after_cut)+Number(a);
								after_cnt++;
						}
						else 
						{
								before_cut=Number(before_cut)+Number(a);
							before_cnt++;
						}
						    b.fillText(a + " fps", 10, L.bb - 10)
                        }
                    }
                }
            }
        },
        Zv: function () {
            if (!this.od) this.od = new Yb({
                element: u.element,
                nn: $.proxy(this.zj, this),
                kn: $.proxy(this.gy, this),
                hn: $.proxy(this.fg, this),
                ln: $.proxy(this.hy, this),
                jh: function () {
                    return Zb.dx()
                }
            });
            this.od.ad()
        },
        zw: function () {
            this.od && this.od.gd()
        },
        ad: function () {
            function a() {
                b.Gy(+new Date);
                b.Dt || c(a)
            }
            this.h();
            this.Zv();
            var b = this,
                c = window.requestAnimationFrame;
            this.Dt = l;
            a()
        },
        gd: function () {
            this.h();
            this.Dt = i;
            this.zw()
        },
        gt: function (a) {
            this.ha = a;
            this.ha.oC = 1 / 60
        },
        fC: fa("ha"),
        py: function (a) {
            this.gt(a)
        },
        qy: function () {
            this.ha = j
        },
        sy: function () {
            this.ha = j
        },
        ty: function (a) {
            this.gt(a)
        },
        ry: function () {
            this.tm = i
        },
        vy: function () {
            if (this.hu !== t.d && this.Kj != j) {
                this.ha.lr();
                this.St = this.ha.wh + this.zA;
                var a = this.ha.em();
                a && a.s()
            }
        },
        uy: function (a) {
            this.Kj = a;
            this.hu !== t.d && this.Kj != j && this.Kj.s()
        },
        vC: fa("hk"),
        $C: function () {
            this.hk = i
        },
        KC: function () {
            this.ha && this.ha.fz();
            this.hk = l
        },
        zj: function (a, b) {
            if (this.ha && this.ha != this) {
                this.Qf = i;
                return this.ha.zj(a, b)
            }
            return l
        },
        gy: function (a, b) {
            if (this.ha && this.ha != this) {
                this.Qf && this.ha.ks(a, b);
                return this.ha.ls(a, b)
            }
            return l
        },
        fg: function (a, b) {
            if (this.ha && this.ha != this) {
                var c = this.ha.fg(a, b);
                this.Qf = l;
                return c
            }
            return l
        },
        hy: function (a, b) {
            if (this.ha && this.ha != this && this.Qf) {
                var c = this.ha.fg(a, b);
                this.Qf = l;
                return c
            }
            return l
        },
        Yg: function (a, b) {
            if (this.ha && this.ha != this) {
                this.ha.fg(a,
                b);
                this.Qf = l;
                return this.ha.Yg(a, b)
            }
            return l
        }
    });
    var Oc;
    Oc = M.extend({
        init: function () {
            this.h()
        },
        bd: function (a, b, c, d) {
            var e = this.xe.length;
            this.tb(e, a, b, c, d);
            return e
        },
        $v: function (a, b, c, d) {
            this.Pg(this.xe.length, a, b, c, d)
        },
        Pg: function (a, b, c, d, e) {
            this.Tq(a, b, c, d, e[0], t.d, e)
        },
        tb: function (a, b, c, d, e, g) {
            this.Tq(a, b, c, e - d + 1, d, e, g)
        },
        Tq: function (a, b, c, d, e, g, h) {
            var g = new x,
                f = [qa.create(this, oa.Hi, e, 0)];
            g.p(w.uj(f, 0));
            for (var k = 1; k < d; k++) {
                h ? e = h[k] : e++;
                f = [qa.create(this, oa.Hi, e, 0)];
                g.p(w.uj(f, b));
                k == d - 1 && c === x.U.Kb && g.p(w.uj(f, b))
            }
            if (c) g.tj = c;
            this.Lb(g, a)
        },
        zz: function (a,
        b, c) {
            this.Lc(c).Or(v.xd).ea[b].Rc = a
        },
        mt: function (a, b) {
            this.ft(oa.Gp, this, 0, 0, a, b)
        },
        ft: function (a, b, c, d, e, g) {
            e = this.Lc(g).Or(v.xd).ea[e];
            a = qa.create(b, a, c, d);
            e.value.Le.push(a)
        },
        ve: function (a, b, c) {
            b = this.Lc(b);
            a = [qa.create(this, oa.Jp, 0, a)];
            c = w.uj(a, c);
            b.p(c)
        },
        Gx: function (a) {
            this.Db.Xr(v.xd, a)
        }
    });
    var Pc = la.extend({
        init: function (a, b, c) {
            this.Oy = a;
            this.Ba = c || 0;
            this.path = [];
            if (a > 0) {
                this.oa = Array(a);
                for (c = 0; c < a; c++) this.oa[c] = b || 0
            }
            this.a = new o(0, 0);
            this.b = 0;
            this.reverse = this.paused = l;
            this.kb = 0
        },
        Kz: function (a) {
            for (var b = 0, c = this.Oy; b < c; b++) this.oa[b] = a
        },
        lt: function (a, b) {
            if (a[0] === "R") {
                var c = parseInt(a.substr(2), 10),
                    d = c / 2,
                    e = 2 * Math.PI / d,
                    g = 0;
                a[1] !== "C" && (e = -e);
                for (var h = 0; h < d; ++h) {
                    this.Lf(new o(b.x + c * Math.cos(g), b.y + c * Math.sin(g)));
                    g = g + e
                }
            } else {
                this.Lf(b.copy());
                a[a.length - 1] === "," && (a = a.substr(0, a.length - 1));
                c = a.split(",");
                d = c.length;
                for (h = 0; h < d; h = h + 2) {
                    e = new o(b.x + parseFloat(c[h]), b.y + parseFloat(c[h + 1]));
                    this.Lf(e)
                }
            }
        },
        Lf: function (a) {
            this.path.push(a)
        },
        start: function () {
            if (this.path.length > 0) {
                this.a.$(this.path[0]);
                this.Qc = 1;
                this.nm()
            }
        },
        pause: function () {
            this.paused = i
        },
        Yt: function () {
            this.paused = l
        },
        UC: ca("Ba"),
        wC: function (a) {
            this.Qc = a;
            this.a.$(this.path[a]);
            this.nm()
        },
        nm: function () {
            this.offset = o.$a(this.path[this.Qc], this.a);
            this.offset.normalize();
            this.offset.multiply(this.oa[this.Qc])
        },
        SC: function (a,
        b) {
            this.oa[b] = a
        },
        RC: ca("reverse"),
        update: function (a) {
            if (!this.paused) {
                if (this.path.length > 0) {
                    var b = this.path[this.Qc],
                        c = l;
                    if (this.a.ej(b)) c = i;
                    else {
                        var d = a;
                        if (this.kb !== 0) {
                            d = d + this.kb;
                            this.kb = 0
                        }
                        this.a.add(o.multiply(this.offset, d));
                        if (!N.Uj(this.offset.x, b.x - this.a.x) || !N.Uj(this.offset.y, b.y - this.a.y)) {
                            this.kb = o.$a(this.a, b).jd();
                            this.kb = this.kb / this.offset.jd();
                            this.a.$(b);
                            c = i
                        }
                    }
                    if (c) {
                        if (this.reverse) {
                            this.Qc--;
                            if (this.Qc < 0) this.Qc = this.path.length - 1
                        } else {
                            this.Qc++;
                            if (this.Qc >= this.path.length) this.Qc = 0
                        }
                        this.nm()
                    }
                }
                if (this.Ba !== 0) this.b = this.b + this.Ba * a
            }
        }
    });
    Pc.ef = function (a, b, c, d) {
        if (b !== a) if (b > a) {
            a = a + c * d;
            a > b && (a = b)
        } else {
            a = a - c * d;
            a < b && (a = b)
        }
        return a
    };
    Pc.nd = function (a, b, c, d) {
        var e = l;
        if (b !== a) {
            if (b > a) {
                a = a + c * d;
                a > b && (a = b)
            } else {
                a = a - c * d;
                a < b && (a = b)
            }
            b === a && (e = i)
        }
        return {
            value: a,
            pd: e
        }
    };
    Pc.Cp = 100;

    function Qc(a, b, c, d) {
        c = a + c;
        d = b + d;
        this.Lt = a;
        this.Mt = b;
        this.Qt = c;
        this.Rt = b;
        this.cr = a;
        this.dr = d;
        this.ir = c;
        this.jr = d
    }
    var Rc = Oc.extend({
        init: function () {
            this.h();
            this.Bx = l
        },
        ie: function (a) {
            this.h(a);
            this.Y = new A(0, 0, this.width, this.height);
            this.An = new Qc(this.Y.x, this.Y.y, this.Y.width, this.Y.height);
            this.anchor = n.M;
            this.Nt = this.Sj = l
        },
        NC: function () {
            var a = this.C.g[0],
                b = this.C.c[0];
            this.Y = new A(Math.round(a.x), Math.round(a.y), b.width, b.height);
            this.An = new Qc(this.Y.x, this.Y.y, this.Y.width, this.Y.height)
        },
        kf: function (a) {
            this.rotation = a.b || 0;
            var b = a.path;
            if (b) {
                var c = Pc.Cp;
                b[0] === "R" && (c = Math.round(parseInt(b.substr(2),
                10) / 2 + 1));
                a = new Pc(c, a.oa, a.Ba);
                a.b = this.rotation;
                a.lt(b, new o(this.x, this.y));
                this.Ln(a);
                a.start()
            }
        },
        Ln: function (a) {
            this.Qa = a;
            this.Ha = 1E-4
        },
        update: function (a) {
            this.h(a);
            if (!this.Nt) {
                this.Sg();
                this.Nt = i
            }
            if (this.Qa) {
                this.Qa.update(a);
                this.x = this.Qa.a.x;
                this.y = this.Qa.a.y;
                this.Sj ? this.nz(this.Qa.b) : this.rotation = this.Qa.b
            }
        },
        nz: function (a) {
            if (!this.Sj) this.Sj = i;
            this.rotation = a;
            var b = this.Y,
                c = new o(b.x, b.y),
                d = new o(b.x + b.B, b.y),
                e = new o(d.x, b.y + b.L),
                b = new o(b.x, e.y),
                a = va.hc(a),
                g = this.width / 2 + this.Od,
                h = this.height / 2 + this.mg;
            c.ja(a, g, h);
            d.ja(a, g, h);
            e.ja(a, g, h);
            c.ja(a, g, h);
            a = this.An;
            a.Lt = c.x;
            a.Mt = c.y;
            a.Qt = d.x;
            a.Rt = d.y;
            a.ir = e.x;
            a.jr = e.y;
            a.cr = b.x;
            a.dr = b.y
        },
        $g: function () {
            var a = u.context,
                b = this.aa,
                c = this.ba,
                d = this.Y,
                e = this.An;
            a.strokeStyle = "red";
            if (this.Sj) {
                a.beginPath();
                a.moveTo(b + e.Lt, c + e.Mt);
                a.lineTo(b + e.Qt, c + e.Rt);
                a.lineTo(b + e.ir, c + e.jr);
                a.lineTo(b + e.cr, c + e.dr);
                a.stroke();
                a.closePath()
            } else a.strokeRect(b + d.x, c + d.y, d.B, d.L)
        },
        wn: function (a, b) {
            var c = this.Y;
            return A.pb(a, b, this.aa + c.x, this.ba + c.y, c.B,
            c.L)
        },
        Yy: function (a, b, c, d) {
            var e = this.aa + this.Y.x,
                g = this.ba + this.Y.y;
            return A.Mh(a, b, c, d, e, g, e + this.Y.B, g + this.Y.L)
        }
    });
    Rc.oh = function (a, b) {
        var c = a.aa + a.Y.x,
            d = a.ba + a.Y.y,
            e = b.aa + b.Y.x,
            g = b.ba + b.Y.y;
        return A.Mh(c, d, c + a.Y.B, d + a.Y.L, e, g, e + b.Y.B, g + b.Y.L)
    };
    var Sc, Tc = Pc.extend({
        init: function (a, b, c) {
            this.h(a, b, c)
        },
        Oz: function (a, b, c) {
            var d, e, g, h;
            e = L.Di;
            if (a[0] === "R") {
                d = a[1] === "C";
                a = parseInt(a.substr(2), 10);
                h = Math.round(a * 3 / 2);
                var f = 2 * Math.PI / h,
                    k = 0,
                    a = a * e;
                d || (f = -f);
                for (d = 0; d < h; d++) {
                    e = b + a * Math.cos(k);
                    g = c + a * Math.sin(k);
                    this.Lf(new o(e, g));
                    k = k + f
                }
            } else {
                this.Lf(new o(b, c));
                a[a.length - 1] === "," && (a = a.substr(0, a.length - 1));
                f = a.split(",");
                k = f.length;
                for (d = 0; d < k; d = d + 2) {
                    a = f[d];
                    h = f[d + 1];
                    this.Lf(new o(b + a * e, c + h * e))
                }
            }
        }
    });
    Sc = Rc.extend({
        init: function () {
            this.h()
        },
        kf: function (a) {
            this.rotation = a.b || 0;
            var b = a.path,
                c = L.Di;
            if (b) {
                var d = Pc.Cp;
                b[0] === "R" && (d = Math.round(parseInt(b.substr(2), 10) * 3 / 2 + 1));
                a = new Tc(d, a.oa * c, a.Ba);
                a.b = this.rotation;
                a.Oz(b, this.x, this.y);
                this.Ln(a);
                a.start()
            }
        }
    });
    var Uc;
    Uc = Sc.extend({
        init: function (a, b, c, d) {
            this.h();
            this.xt = this.b = 0;
            this.Da = o.Ra();
            this.Ka = o.Ra();
            this.ua = o.Ra();
            this.va = o.Ra();
            var e = t.d;
            if (c === 1) e = C.Nk;
            else if (c === 2) e = C.Ok;
            this.ma(e);
            this.rotation = d;
            this.x = a;
            this.y = b;
            this.Sb();
            a = this.bd(0.04, x.da.Va, 0, 4);
            this.Lc(a).p(w.dy(this))
        },
        Sb: function () {
            this.Da.x = this.x - this.width / 2;
            this.Ka.x = this.x + this.width / 2;
            this.Da.y = this.Ka.y = this.y - 5;
            this.ua.x = this.Da.x;
            this.va.x = this.Ka.x;
            this.ua.y = this.va.y = this.y + 5;
            this.b = va.hc(this.rotation);
            this.Da.ja(this.b, this.x,
            this.y);
            this.Ka.ja(this.b, this.x, this.y);
            this.ua.ja(this.b, this.x, this.y);
            this.va.ja(this.b, this.x, this.y)
        },
        update: function (a) {
            this.h(a);
            this.Qa && this.Sb()
        }
    });
    var Vc = Rc.extend({
        init: function () {
            this.h();
            this.jo = this.mf = l
        },
        s: function () {
            if (this.jo) {
                this.yc();
                this.xc()
            } else this.h()
        }
    });

    function Wc(a, b, c) {
        this.x = a;
        this.y = b;
        this.size = c
    }

    function Xc() {
        this.ue = new o(0, 0);
        this.a = new o(0, 0);
        this.dir = new o(0, 0);
        this.Xh = this.Kh = 0;
        this.color = new m(0, 0, 0, 0);
        this.$d = new m(0, 0, 0, 0);
        this.height = this.width = this.b = this.vr = this.vc = this.size = 0
    }
    var Yc;
    Yc = wa.extend({
        init: function (a) {
            this.h();
            this.width = L.xb;
            this.height = L.bb;
            this.$n = a;
            this.Wb = [];
            this.Qi = l;
            this.bh = this.duration = 0;
            this.Id = new o(0, 0);
            this.Jj = new o(0, 0);
            this.bs = this.vc = this.wt = this.size = this.Rs = this.Kh = this.Ht = this.Xh = this.zt = this.speed = this.fm = this.b = 0;
            this.zc = new m(0, 0, 0, 0);
            this.te = new m(0, 0, 0, 0);
            this.tc = new m(0, 0, 0, 0);
            this.ce = new m(0, 0, 0, 0);
            this.JB = this.mw = l;
            this.Xe = this.aj = 0;
            this.C = j;
            this.ye = [];
            this.sr = [];
            this.Md = 0;
            this.ab = j
        },
        Xq: function () {
            if (this.Wb.length == this.$n) return l;
            var a = new Xc;
            this.nh(a);
            this.Wb.push(a);
            return i
        },
        nh: function (a) {
            a.a.x = this.x + this.Jj.x * N.vb();
            a.a.y = this.y + this.Jj.y * N.vb();
            a.ue.$(a.a);
            var b = va.hc(this.b + this.fm * N.vb()),
                b = new o(Math.cos(b), Math.sin(b));
            b.multiply(this.speed + this.zt * N.vb());
            a.dir = b;
            a.Kh = this.Kh + this.Rs * N.vb();
            a.Xh = this.Xh + this.Ht * N.vb();
            a.vc = this.vc + this.bs * N.vb();
            var b = new m(this.zc.z + this.te.z * N.vb(), this.zc.F + this.te.F * N.vb(), this.zc.D + this.te.D * N.vb(), this.zc.u + this.te.u * N.vb()),
                c = new m(this.tc.z + this.ce.z * N.vb(), this.tc.F + this.ce.F * N.vb(), this.tc.D + this.ce.D * N.vb(), this.tc.u + this.ce.u * N.vb());
            a.color = b;
            a.$d.z = (c.z - b.z) / a.vc;
            a.$d.F = (c.F - b.F) / a.vc;
            a.$d.D = (c.D - b.D) / a.vc;
            a.$d.u = (c.u - b.u) / a.vc;
            a.size = this.size + this.wt * N.vb()
        },
        update: function (a) {
            this.h(a);
            if (this.ab && this.Wb.length === 0 && !this.Qi) this.ab(this);
            else {
                if (this.Qi && this.aj) {
                    var b = 1 / this.aj;
                    for (this.Xe = this.Xe + a; this.Wb.length < this.$n && this.Xe > b;) {
                        this.Xq();
                        this.Xe = this.Xe - b
                    }
                    this.bh = this.bh + a;
                    this.duration !== -1 && this.duration < this.bh && this.oA()
                }
                for (this.Md = 0; this.Md < this.Wb.length;) {
                    b = this.Wb[this.Md];
                    if (b.vc > 0) {
                        this.du(b, a);
                        b.color.z = b.color.z + b.$d.z * a;
                        b.color.F = b.color.F + b.$d.F * a;
                        b.color.D = b.color.D + b.$d.D * a;
                        b.color.u = b.color.u + b.$d.u * a;
                        b.vc = b.vc - a;
                        this.co(b, this.Md, a);
                        this.Md++
                    } else this.Fn(this.Md)
                }
            }
        },
        du: function (a, b) {
            var c, d;
            if (a.a.x || a.a.y) {
                c = a.a.copy();
                c.normalize()
            } else c = new o(0, 0);
            d = c.copy();
            c.multiply(a.Kh);
            var e = d.x;
            d.x = -d.y;
            d.y = e;
            d.multiply(a.Xh);
            c = o.add(c, d);
            c.add(this.Id);
            c.multiply(b);
            a.dir.add(c);
            c.$(a.dir);
            c.multiply(b);
            a.a.add(c)
        },
        co: function (a) {
            this.ye[this.Md] = new Wc(a.a.x, a.a.y, a.size);
            this.sr[this.Md] = a.color
        },
        Fn: function (a) {
            this.Wb.splice(a, 1)
        },
        Bt: function (a) {
            this.Wb = [];
            for (var b = 0; b < a; b++) this.Xq();
            this.Qi = i
        },
        oA: function () {
            this.Qi = l;
            this.bh = this.duration;
            this.Xe = 0
        },
        HC: function () {
            this.Xe = this.bh = 0
        },
        s: function () {
            this.yc();
            if (this.color.u !== 0) for (var a = u.context, b = this.C.Nc, c = 0, d = this.Md; c < d; c++) {
                var e = this.Wb[c];
                a.drawImage(b, Math.round(e.x), Math.round(e.y))
            }
            this.xc()
        },
        sC: function () {
            return this.Wb.length === this.$n
        }
    }).extend({
        init: function (a, b) {
            this.h(a);
            this.Rm = b;
            this.Wa = new Da(b);
            this.width = L.xb;
            this.height = L.bb
        },
        nh: function (a) {
            var b = this.Rm,
                b = b.c[N.gb(0, b.c.length - 1)],
                c = new A(0, 0, 0, 0);
            this.Wa.Za(this.Wb.length, b, c, 1);
            this.h(a);
            a.width = b.B * a.size;
            a.height = b.L * a.size
        },
        co: function (a, b) {
            this.Wa.ye[b] = new A(a.a.x - a.width / 2, a.a.y - a.height / 2, a.width, a.height);
            this.Wa.Nf[b] = a.color.u;
            this.sr[b] = a.color
        },
        Fn: function (a) {
            this.Wa.bz(a);
            this.h(a)
        },
        s: function () {
            this.yc();
            this.Wa.s();
            this.xc()
        }
    });
    var Zc;
    Zc = Yc.extend({
        init: function (a, b) {
            this.h(a, b);
            this.Wa.lg = [];
            this.Wa.Tj = []
        },
        nh: function (a) {
            this.h(a);
            a.b = 0;
            a.vr = va.hc(this.Ba + this.lz * N.vb());
            a = this.Wb.length;
            this.Wa.lg[a] = 0;
            this.Wa.Tj[a] = new o(0, 0)
        },
        LC: function (a, b, c, d, e) {
            a.x = a.x - d;
            a.y = a.y - e;
            var g = a.x * c + a.y * b;
            a.x = a.x * b - a.y * c + d;
            a.y = g + e
        },
        co: function (a, b, c) {
            this.h(a, b, c);
            a.b = a.b + a.vr * c;
            this.Wa.lg[b] = a.b;
            this.Wa.Tj[b].$(a.a)
        },
        Fn: function (a) {
            this.Wa.lg.splice(a, 1);
            this.Wa.Tj.splice(a, 1);
            this.h(a)
        }
    }).extend({
        init: function (a, b) {
            this.h(a, b);
            this.duration = 2;
            this.Id.x = 0;
            this.Id.y = 500;
            this.b = -90;
            this.fm = 50;
            this.speed = 150;
            this.zt = 70;
            this.Kh = 0;
            this.Rs = 1;
            this.Xh = 0;
            this.Ht = 1;
            this.Jj.x = 0;
            this.Jj.y = 0;
            this.vc = 2;
            this.bs = 0;
            this.size = 1;
            this.wt = 0;
            this.aj = 100;
            this.zc.z = 1;
            this.zc.F = 1;
            this.zc.D = 1;
            this.zc.u = 1;
            this.te.z = 0;
            this.te.F = 0;
            this.te.D = 0;
            this.te.u = 0;
            this.tc.z = 1;
            this.tc.F = 1;
            this.tc.D = 1;
            this.tc.u = 1;
            this.ce.z = 0;
            this.ce.F = 0;
            this.ce.D = 0;
            this.Ba = this.ce.u = 0;
            this.lz = 600;
            this.mw = l
        },
        nh: function (a) {
            this.h(a);
            var b = this.Rm.c[N.gb(3, 7)],
                c = new A(0, 0, 0, 0);
            this.Wa.Za(this.Wb.length,
            b, c);
            a.width = b.B * this.size;
            a.height = b.L * this.size
        }
    });
    var $c;
    $c = Rc.extend({
        init: function (a, b) {
            this.h();
            this.ma(C.Lk);
            this.Za(a);
            this.pC = i;
            this.Rw = b;
            this.oe = l
        },
        On: function () {
            J.Aa(J.v.No, this.Rw)
        }
    });
    var ad;
    ad = la.extend({
        init: function () {
            this.Cn = 1;
            this.wa = []
        },
        Wq: function (a, b) {
            this.wa.splice(b, 0, a)
        },
        Vq: function (a) {
            this.wa.push(a)
        },
        log: function () {
            Ua.debug("Constraint System Log:");
            for (var a = 0, b = this.wa.length; a < b; a++) {
                var c = this.wa[a];
                Ua.debug("-- Point: " + c.Js());
                for (var d = 0, e = c.Ub.length; d < e; d++) {
                    var g = c.Ub[d];
                    Ua.debug("---- Constraint: " + g.Ic.Js() + " len: " + g.qd)
                }
            }
        },
        az: function (a) {
            this.wa.splice(a, 1)
        },
        update: function (a) {
            for (var b = this.wa, c = b.length, d = this.Cn, e = 0; e < c; e++) b[e].update(a);
            for (e = 0; e < d; e++) for (a = 0; a < c; a++) b[a].Vj()
        }
    });
    var bd = {
        li: 0,
        Ei: 1,
        fB: 2
    }, cd, dd = 9.8 * t.mv,
        ed = {
            Oo: dd,
            Jc: new o(0, dd),
            toggle: function () {
                ed.Jc.y = -ed.Jc.y
            },
            rh: function () {
                return ed.Jc.y === 0 && ed.Jc.x === 0
            },
            Wr: function () {
                return ed.Jc.y === ed.Oo && ed.Jc.x === 0
            },
            reset: function () {
                ed.Jc.x = 0;
                ed.Jc.y = dd
            }
        };
    cd = ed;
    var fd;

    function gd(a, b, c) {
        this.Ic = a;
        this.qd = b;
        this.type = c
    }
    fd = la.extend({
        init: function () {
            this.wm = l;
            this.rd(1);
            this.Zs()
        },
        rd: function (a) {
            this.ho = a;
            this.ph = 1 / a;
            this.Id = new o(0, t.Oo * a)
        },
        Zs: function () {
            var a = o.Ra;
            this.$b = a();
            this.u = a();
            this.a = a();
            this.Hb = a();
            this.nb = a()
        },
        aD: function (a, b) {
            var c = (a / b >> 0) + 1;
            c != 0 && (a = a / c);
            for (var d = 0; d < c; d++) this.update(a)
        },
        update: function (a) {
            this.nb = o.Ra();
            this.wm || (cd.rh() ? this.nb.add(this.Id) : this.nb.add(o.multiply(cd.Jc, this.ho)));
            a = a / t.If;
            this.nb.multiply(this.ph);
            this.u = o.multiply(this.nb, a);
            this.$b.add(this.u);
            this.Hb = o.multiply(this.$b,
            a);
            this.a.add(this.Hb)
        },
        im: function (a, b) {
            if (!a.rh()) {
                var c = o.multiply(a, b / t.If);
                this.a.add(c)
            }
        }
    }).extend({
        init: function () {
            this.ia = new o(t.He, t.He);
            this.Pc = new o(t.d, t.d);
            this.Ub = [];
            this.nb = o.Ra();
            this.h()
        },
        Zs: function () {
            this.h();
            this.ia.x = t.He;
            this.ia.y = t.He;
            this.Vs()
        },
        Vs: function () {
            this.Ub = []
        },
        Me: function (a, b, c) {
            this.Ub.push(new gd(a, b, c))
        },
        GC: function (a) {
            for (var b = this.Ub, c = b.length, d = 0; d < c; d++) if (b[d].Ic === a) {
                b.splice(d, 1);
                break
            }
        },
        Zy: function (a) {
            this.Ub.splice(a, 1)
        },
        HB: function (a, b) {
            for (var c = this.Ub, d = c.length, e = 0; e < d; e++) {
                var g = c[e];
                if (g.Ic === a) {
                    g.Ic = b;
                    break
                }
            }
        },
        ux: function (a) {
            for (var b = this.Ub, c = b.length, d = 0; d < c; d++) if (b[d].Ic === a) return i;
            return l
        },
        Ti: function (a, b) {
            for (var c = this.Ub, d = c.length, e = 0; e < d; e++) {
                var g = c[e];
                if (g.Ic === a) {
                    g.qd = b;
                    break
                }
            }
        },
        nr: function (a, b, c) {
            for (var d = this.Ub, e = d.length, g = 0; g < e; g++) {
                var h = d[g];
                if (h.Ic === a) {
                    h.Ic = b;
                    h.qd = c;
                    break
                }
            }
        },
        qd: function (a) {
            for (var b = this.Ub, c = b.length, d = 0; d < c; d++) {
                var e = b[d];
                if (e.Ic === a) return e.qd
            }
            return t.d
        },
        update: function (a) {
            this.nb.x = 0;
            this.nb.y = 0;
            this.wm || (cd.rh() ? this.nb.add(this.Id) : this.nb.add(o.multiply(cd.Jc, this.ho)));
            this.nb.multiply(this.ph);
            var b = a / t.If * a / t.If;
            this.u.x = this.nb.x * b;
            this.u.y = this.nb.y * b;
            this.ia.x === t.He && this.ia.$(this.a);
            this.Hb.x = this.a.x - this.ia.x + this.u.x;
            this.Hb.y = this.a.y - this.ia.y + this.u.y;
            if (a > 0) {
                a = 1 / a;
                this.$b.x = this.Hb.x * a;
                this.$b.y = this.Hb.y * a
            }
            this.ia.$(this.a);
            this.a.add(this.Hb)
        },
        Vj: function () {
            var a = this.Pc,
                b = this.a,
                c = this.ph,
                d, e, g, h;
            if (a.x !== -1) {
                b.x = a.x;
                b.y = a.y
            } else for (var a = this.Ub, f = a.length,
            k = 0; k < f; k++) {
                var p = a[k],
                    q = p.Ic,
                    r = q.a;
                d = r.x - b.x;
                e = r.y - b.y;
                if (d === 0 && e === 0) e = d = 1;
                var s = Math.sqrt(d * d + e * e),
                    z = p.qd,
                    p = p.type;
                if (p === 1) {
                    if (s <= z) continue
                } else if (p === 2 && s >= z) continue;
                p = q.Pc.x === -1;
                q = q.ph;
                s = (s - z) / ((s > 1 ? s : 1) * (c + q));
                if (p) {
                    g = d;
                    h = e
                }
                z = c * s;
                d = d * z;
                e = e * z;
                b.x = b.x + d;
                b.y = b.y + e;
                if (p) {
                    d = q * s;
                    r.x = r.x - g * d;
                    r.y = r.y - h * d
                }
            }
        },
        Vy: function (a) {
            this.nb.Zz();
            this.wm || (cd.rh() ? this.nb.add(this.Id) : this.nb.add(o.multiply(cd.Jc, this.ho)));
            this.nb.multiply(this.ph);
            var b = a / t.If * a / t.If;
            this.u.x = this.nb.x * b;
            this.u.y = this.nb.y * b;
            this.ia.x === t.He && this.ia.$(this.a);
            this.Hb.x = this.a.x - this.ia.x + this.u.x;
            this.Hb.y = this.a.y - this.ia.y + this.u.y;
            if (a > 0) {
                a = 1 / a;
                this.$b.x = this.Hb.x * a;
                this.$b.y = this.Hb.y * a
            }
            this.ia.$(this.a);
            this.a.add(this.Hb)
        },
        Js: function () {
            return this.a.x.toFixed(2) + ", " + this.a.y.toFixed(2)
        }
    });
    var hd = ad.extend({
        init: function (a, b, c, d, e, g, h) {
            this.h();
            this.Dn = 0;
            this.Cn = 30;
            this.lineWidth = L.Jo;
            this.width = L.Ko;
            this.Eb = t.d;
            this.EB = this.Zd = 0;
            this.lh = l;
            this.La = L.La;
            this.Ya = a != j ? a : new fd;
            if (d != j) this.ib = d;
            else {
                this.ib = new fd;
                this.ib.rd(1)
            }
            this.Ya.rd(0.02);
            this.Ya.a.x = b;
            this.Ya.a.y = c;
            this.ib.a.x = e;
            this.ib.a.y = g;
            this.Vq(this.Ya);
            this.Vq(this.ib);
            this.ib.Me(this.Ya, this.La, bd.li);
            a = o.$a(this.ib.a, this.Ya.a);
            b = Math.round(h / this.La + 2);
            a.xm(b);
            this.ct(h, a);
            this.Tf = l;
            this.je = t.d;
            this.ar = this.Iw = this.Tr = this.Vg = l;
            this.Ve = [];
            this.gi = L.gi
        },
        jd: function () {
            var a = 0,
                b = this.wa,
                c = b.length;
            if (c > 0) for (var d = b[0].a, e = 1; e < c; e++) var g = b[e],
                a = a + d.Ia(g.a),
                d = g.a;
            return a
        },
        ct: function (a, b) {
            b == j && (b = o.Ra());
            for (var c = this.wa, d = c[c.length - 2], e = this.ib, g = e.qd(d), h = j; a > 0;) if (a >= this.La) {
                d = c[c.length - 2];
                h = new fd;
                h.rd(0.02);
                h.a = o.add(d.a, b);
                this.Wq(h, this.wa.length - 1);
                e.nr(d, h, g);
                h.Me(d, this.La, bd.li);
                a = a - this.La
            } else {
                h = a + g;
                if (h > this.La) {
                    a = this.La;
                    g = h - this.La
                } else {
                    d = c[c.length - 2];
                    e.Ti(d, h);
                    a = 0
                }
            }
        },
        jz: function (a) {
            for (var b = this.wa, c = b.length, d = this.ib, e = d.qd(b[c - 2]), g; a > 0;) if (a >= this.La) {
                var h = c - 2,
                    f = b[c - 3];
                g = b[h];
                d.nr(g, f, e);
                this.az(h);
                c--;
                a = a - this.La
            } else {
                h = e - a;
                if (h < 1) {
                    a = this.La;
                    e = this.La + h + 1
                } else {
                    g = b[c - 2];
                    d.Ti(g, h);
                    a = 0
                }
            }
            b = (c - 1) * (this.La + 3);
            d = d.Ub;
            c = d.length;
            for (e = 0; e < c; e++) {
                g = d[e];
                if (g.type === bd.Ei) g.qd = b
            }
            return a
        },
        YC: function () {
            for (var a = this.wa, b = a.length, c = 0; c < b; c++) {
                var d = a[c];
                if (this.Ya.Pc.x != t.d) {
                    d != this.ib && d.rd(0.5);
                    c > 0 && d.Me(this.Ya, c * (this.La + 3), bd.Ei)
                }
            }
        },
        update: function (a) {
            if (this.Zd > 0) {
                this.Zd = Pc.ef(this.Zd,
                0, 1, a);
                this.Zd < 1.95 && this.Tf && this.Ws(this.Eb)
            }
            for (var b = this.wa, c = b.length, d = this.Cn, e = 0; e < c; e++) {
                var g = b[e];
                g !== this.ib && g.Vy(a)
            }
            for (e = 0; e < d; e++) for (a = 0; a < c; a++) b[a].Vj()
        },
        Ws: function (a) {
            this.Tf = l;
            var b = this.wa,
                c = b[a],
                d = b[a + 1];
            if (d) for (var e = d.Ub, g = e.length, h = 0; h < g; h++) {
                if (e[h].Ic === c) {
                    d.Zy(h);
                    e = new fd;
                    e.rd(1E-5);
                    e.a.$(d.a);
                    e.ia.$(d.ia);
                    this.Wq(e, a + 1);
                    e.Me(c, this.La, bd.li);
                    break
                }
            } else c.Vs();
            a = 0;
            for (c = b.length; a < c; a++) {
                d = b[a];
                d != this.ib && d.rd(1E-5)
            }
        },
        Kn: function (a) {
            this.Eb = a;
            this.Zd = 2;
            this.Tf = i;
            this.lh = l
        },
        s: function () {
            var a = this.wa,
                b = a.length,
                c = u.context,
                d, e, g;
            u.Xz("rgba(0,0,102,1)");
            c.lineWidth = this.lineWidth;
            if (this.Eb === t.d) {
                e = Array(b);
                for (d = 0; d < b; d++) e[d] = a[d].a;
                this.ym(e)
            } else {
                var h = [],
                    f = [],
                    k = l;
                for (d = 0; d < b; d++) {
                    e = a[d];
                    var p = i;
                    if (d > 0) {
                        g = a[d - 1];
                        e.ux(g) || (p = l)
                    }
                    e.Pc.x === t.d && !p && (k = i);
                    k ? f.push(e.a) : h[d] = e.a
                }
                h.length > 0 && this.ym(h);
                f.length > 0 && !this.Tr && this.ym(f)
            }
            c.lineWidth = 1
        },
        ym: function (a) {
            var b = a.length,
                c = this.gi;
            if (!(b < 2)) {
                var d = this.Eb === t.d || this.Tf ? 1 : this.Zd / 1.95,
                    e = new m(0, 0, 0, d),
                    g = new m(0.475, 0.305, 0.185, d),
                    h = new m(0.19, 0.122, 0.074, d),
                    f = this.ar ? e : new m(152 / 225, 0.44, 62 / 225, d),
                    e = this.ar ? e : new m(0.304, 0.198, 0.124, d);
                if (this.lh) {
                    g.z = g.z * 3;
                    g.F = g.F * 3;
                    g.D = g.D * 3;
                    f.z = f.z * 3;
                    f.F = f.F * 3;
                    f.D = f.D * 3;
                    h.z = h.z * 3;
                    h.F = h.F * 3;
                    h.D = h.D * 3;
                    e.z = e.z * 3;
                    e.F = e.F * 3;
                    e.D = e.D * 3
                }
                var k = a[0],
                    p = a[1],
                    k = (new o(k.x, k.y)).Ia(new o(p.x, p.y));
                this.Dn = k <= this.La + 0.3 ? 0 : k <= this.La + 1 ? 1 : k < this.La + 4 ? 2 : 3;
                if (!(b < 3)) {
                    if (k > this.La + 7 && !this.Iw) {
                        k = k / this.La * 2;
                        h.z = h.z * k;
                        e.z = e.z * k
                    }
                    var k = l,
                        b = (b - 1) * c,
                        q, r = b - 1,
                        c = (g.z - h.z) / r,
                        p = (g.F - h.F) / r,
                        g = (g.D - h.D) / r,
                        s = (f.z - e.z) / r,
                        z = (f.F - e.F) / r,
                        f = (f.D - e.D) / r,
                        r = this.gi - 1,
                        D = r - 1,
                        E = u.context,
                        W = E.globalAlpha;
                    E.lineJoin = "round";
                    E.lineWidth = this.lineWidth;
                    E.globalAlpha = d;
                    this.Ve[0] = a[0].copy();
                    for (d = 1; d <= b; d++) {
                        q = o.kr(a, d / b);
                        this.Ve[d] = q;
                        q = (d - 1) % r;
                        if (q === D || d === b) {
                            E.beginPath();
                            E.strokeStyle = this.Tf ? m.Xn.Rl : k ? h.Rh() : e.Rh();
                            var ha = d - q - 1,
                                Q = this.Ve[ha++];
                            for (E.moveTo(Q.x, Q.y); ha <= d; ha++) {
                                Q = this.Ve[ha];
                                E.lineTo(Q.x, Q.y)
                            }
                            E.stroke();
                            E.closePath();
                            k = !k;
                            q = q + 1;
                            h.z = h.z + c * q;
                            h.F = h.F + p * q;
                            h.D = h.D + g * q;
                            e.z = e.z + s * q;
                            e.F = e.F + z * q;
                            e.D = e.D + f * q
                        }
                    }
                    E.globalAlpha = W
                }
            }
        }
    });
    hd.pu = 30;
    var id;
    id = {
        ds: j,
        Ld: 0,
        Jd: 0,
        ZC: l,
        Sx: function (a, b) {
            this.Ld = a - 1;
            this.Jd = b - 1;
            this.ds = I.Si[this.Ld].yh[this.Jd]
        }
    };
    var jd = M.extend({
        init: function () {
            this.h()
        },
        ie: function (a) {
            this.h(a);
            this.td = [];
            this.g = [];
            this.align = n.M
        },
        Yz: function (a, b, c) {
            this.td[0] = a;
            this.td[1] = b;
            this.td[2] = c;
            a = this.C.c[a].L;
            b = this.C.c[b].L;
            c = this.C.c[c].L;
            this.height = a >= b && a >= c ? a : b >= a && b >= c ? b : c;
            this.g[0] = Math.floor((this.height - a) / 2);
            this.g[1] = Math.floor((this.height - b) / 2);
            this.g[2] = Math.floor((this.height - c) / 2)
        },
        s: function () {
            this.yc();
            var a = this.C.c[this.td[0]],
                b = this.C.c[this.td[1]],
                c = this.C.c[this.td[2]],
                d = this.width - (Math.floor(a.B) + Math.floor(c.B)),
                e = u.context,
                g = Math.round(this.aa),
                h = Math.round(this.ba),
                f = Math.ceil(a.B),
                k = Math.ceil(a.L),
                p = Math.ceil(c.B),
                q = Math.ceil(c.L);
            if (d >= 0) {
                e.drawImage(this.C.Nc, a.x, a.y, f, k, g, h + this.g[0], f, k);
                this.Ow(this.td[1], g + f, h + this.g[1], d, b.L);
                e.drawImage(this.C.Nc, c.x, c.y, p, q, g + f + d, h + this.g[2], p, q)
            } else {
                a = a.copy();
                b = c.copy();
                a.B = Math.min(a.B, this.width / 2);
                b.B = Math.min(b.B, this.width - a.B);
                b.x = b.x + (c.B - b.B);
                e.drawImage(this.C.Nc, a.x, a.y, a.B, a.L, g, h + this.g[0], a.B, a.L);
                e.drawImage(this.C.Nc, b.x, b.y, b.B, b.L, g + a.B, h + this.g[2], b.B, b.L)
            }
            this.xc()
        },
        jx: function () {
            var a = u.element;
            u.Vh(document.createElement("canvas"));
            var b = u.element,
                c = Math.ceil(this.width),
                d = Math.ceil(this.height);
            b.width = c;
            b.height = d;
            this.s();
            var b = b.toDataURL("image/png"),
                e = new Image;
            e.src = b;
            $(e).width(c).height(d);
            a && u.Vh(a);
            return e
        }
    }),
        kd, ld = M.extend({
            init: function (a) {
                this.h();
                var b = new jd;
                b.ma(C.Ge);
                b.Yz(0, 2, 1);
                b.width = a + L.Bk;
                a = b.jx();
                this.ie(new Wa(a))
            }
        });
    kd = Sc.extend({
        init: function () {
            this.h();
            this.na = j;
            this.q = this.sh = this.ke = this.rx = this.K = l;
            this.xg = t.d;
            this.rj = o.Ra();
            this.t = 0;
            this.A = l;
            this.w = 0;
            this.ge = this.Ze = this.Fb = j;
            this.xj = this.yj = this.ff = 0;
            this.pg = this.Mc = l;
            this.e = j;
            this.sf = 0;
            this.Zr = this.io = this.$j = l;
            this.bf = 0;
            this.kh = this.sj = l;
            this.r = this.Lh = 0;
            this.BB = l
        },
        mx: function (a, b, c) {
            a = o.$a(a, c);
            b = o.$a(b, c).gg() - a.gg();
            return va.tg(b)
        },
        tx: function (a, b) {
            this.rj.x = a;
            this.rj.y = b
        },
        sx: function (a) {
            U.G(C.Ml);
            var b = new o(this.x, this.y),
                b = this.mx(this.rj, a, b);
            b > 180 ? b = b - 360 : b < -180 && (b = b + 360);
            this.mc.rotation = this.mc.rotation + b;
            this.wg.rotation = this.wg.rotation + b;
            this.vg.rotation = this.vg.rotation + b;
            b = b > 0 ? Math.min(Math.max(1, b), L.ri) : Math.max(Math.min(-1, b), -L.ri);
            if (this.na) {
                b > 0 ? this.na.jd() < L.Ck && this.na.ct(b) : b !== 0 && this.na.wa.length > 3 && this.na.jz(-b);
                this.io = i
            }
            this.rj.$(a)
        },
        update: function (a) {
            this.h(a);
            if (this.Zr && this.na) {
                var b = this.na.Ya;
                b.a.x = this.x;
                b.a.y = this.y;
                b.Pc.$(b.a);
                if (this.sj) {
                    b = Pc.nd(this.bf, 200, 30, a);
                    this.bf = b.value;
                    if (b.pd) this.sj = l
                } else {
                    b = Pc.nd(this.bf, 130, 30, a);
                    this.bf = b.value;
                    if (b.pd) this.sj = i
                }
                this.Qa.Kz(this.bf)
            }
            if (this.kh) {
                this.Lh = this.Lh - 1.5 * a;
                if (this.Lh <= 0) {
                    this.r = t.d;
                    this.kh = l
                }
            }
            if (this.zb) {
                var b = o.$a(this.Qa.path[this.Qa.Qc], this.Qa.a),
                    c = 0;
                Math.abs(b.x) > 15 && (c = b.x > 0 ? 10 : -10);
                this.zb.rotation = Pc.ef(this.zb.rotation, c, 60, a)
            }
            if (this.q && this.io && this.na) {
                a = this.na.jd() * 0.7;
                this.mc.Q = a === 0 ? this.mc.Z = 0 : this.mc.Z = Math.max(0, Math.min(1.2, 1 - a / L.Dk))
            }
        },
        KA: function (a) {
            if (this.Mc && this.$j) {
                this.$j = l;
                this.pg = i;
                U.G(C.Il);
                this.e.P(0)
            }
            if (this.Mc && this.pg) {
                if (this.e.Of !== 0) this.sf = this.sf + a * L.Sl;
                var b = 0,
                    a = l;
                if (this.na) for (var c = this.na.Ve, d = L.La, e = 0, g = c.length; e < g; e++) {
                    var h = c[e],
                        f = c[e + 1],
                        k = Math.max(2 * d / 3, h.Ia(f));
                    if (this.sf >= b && (this.sf < b + k || e > g - 3)) {
                        b = this.sf - b;
                        f = o.$a(f, h);
                        f.multiply(b / k);
                        this.e.x = h.x + f.x;
                        this.e.y = h.y + f.y;
                        e > g - 3 && (a = i);
                        if (this.e.Of !== 0) this.e.rotation = va.tg(f.gg()) + 270;
                        break
                    } else b = b + k
                }
                if (a) this.sf = t.d
            }
        },
        Jw: function () {
            if (!this.ke && !this.K) {
                if (this.eg && this.sh && this.na) {
                    var a = this.na.Ya.a;
                    this.x = a.x;
                    this.y = a.y
                }
                this.yc();
                this.t > 0 ? this.Fb.s() : this.back.s();
                if (this.r !== t.d || this.kh) {
                    a = new m(0.2, 0.5, 0.9, this.Lh);
                    this.yr(this.x, this.y, this.r !== t.d ? this.r : this.Ns, a)
                }
            }
        },
        yr: function (a, b, c, d) {
            if (!(c < 0)) {
                var e = u.context,
                    g = 2 * Math.PI,
                    h = Math.max(16, Math.round(c / (L.bc * 2)));
                h % 2 !== 0 && h++;
                e.lineWidth = 2;
                e.strokeStyle = d.Rh();
                for (var d = g / h, f = 0; f < h; f++) if (f % 2 === 0) {
                    var k = f / h * g;
                    e.beginPath();
                    e.arc(a, b, c, k, k + d, l);
                    e.stroke();
                    e.closePath()
                }
            }
        },
        $g: function () {
            this.q && this.yr(this.x, this.y, L.Wc, m.red)
        },
        s: function () {
            if (!this.ke) {
                var a = this.na;
                if (this.q) {
                    this.vg.visible = this.xg !== t.d;
                    this.wg.visible = this.xg === t.d;
                    this.di.s()
                }
                if (this.K) {
                    this.kC.s();
                    this.rx || this.jC.s()
                }
                a && a.s();
                this.t <= 0 ? this.hd.s() : this.ff != t.d ? this.Ze.s() : this.ge.s();
                this.q && this.mc.s();
                this.xc()
            }
        },
        Nw: function () {
            this.e.s()
        },
        RB: function () {
            this.lC.s()
        },
        ot: function (a) {
            this.na = a;
            this.Ns = this.r;
            this.r = t.d;
            if (this.Mc) this.$j = i
        },
        QC: function () {
            this.sj = this.Zr = i;
            this.bf = 130;
            var a = new Pc(100, this.bf, 0);
            a.lt("RC30", new o(this.x, this.y));
            this.Ln(a);
            a.start()
        },
        Pz: function (a) {
            this.Ns = this.r;
            this.r = a;
            if (a === t.d || a === t.qu) {
                a = N.gb(C.Qk, C.Rk);
                this.back = M.create(a, 0);
                this.back.sa();
                this.back.anchor = this.back.la = n.M;
                this.hd = M.create(a, 1);
                this.hd.anchor = this.hd.la = n.M;
                this.N(this.back);
                this.N(this.hd);
                this.back.visible = l;
                this.hd.visible = l
            } else {
                this.back = M.create(C.yi, 0);
                this.back.sa();
                this.back.anchor = this.back.la = n.M;
                this.hd = M.create(C.yi, 1);
                this.hd.anchor = this.hd.la = n.M;
                this.N(this.back);
                this.N(this.hd);
                this.back.visible = l;
                this.hd.visible = l;
                this.Lh = L.Wo;
                this.kh = l
            }
            if (this.q) {
                this.di = M.create(C.Df, 0);
                this.di.anchor = this.di.la = n.M;
                this.N(this.di);
                this.di.visible = l;
                this.mc = M.create(C.Df, 1);
                this.mc.oe = l;
                this.vg = M.create(C.Df, 2);
                this.vg.anchor = this.vg.la = n.M;
                this.mc.N(this.vg);
                this.wg = M.create(C.Df, 3);
                this.wg.anchor = this.wg.la = this.mc.anchor = this.mc.la = n.M;
                this.mc.N(this.wg);
                this.N(this.mc);
                this.io = this.mc.visible = l
            }
        },
        Jz: function (a, b, c) {
            this.t = a;
            this.A = b;
            this.w = c;
            if (this.t > 0) {
                this.Fb = new ld(a);
                this.Fb.Od = -Math.round(this.Fb.width / 2) + L.qi;
                this.Fb.x = -L.qi;
                this.Ze = M.create(C.Ge, 3);
                this.Ze.visible = l;
                this.Ze.anchor = this.Ze.la = n.M;
                this.N(this.Ze);
                this.ge = M.create(C.Ge, 4);
                this.ge.visible = l;
                this.ge.anchor = this.ge.la = n.M;
                this.N(this.ge);
                this.ge.N(this.Fb);
                if (this.A) {
                    this.Fb.rotation = 90;
                    this.Fb.y = -this.w;
                    this.yj = this.y - this.w;
                    this.xj = this.y + (this.t - this.w);
                    this.ge.rotation = 90;
                    this.Ze.rotation = 90
                } else {
                    this.yj = this.x - this.w;
                    this.xj = this.x + (this.t - this.w);
                    this.Fb.x = this.Fb.x + -this.w
                }
                this.Fb.anchor = n.Kf | n.rb;
                this.Fb.x = this.Fb.x + this.x;
                this.Fb.y = this.Fb.y + this.y;
                this.Fb.visible = l
            }
            this.ff = t.d
        },
        vz: function () {
            this.zb = M.create(C.Cg,
            1);
            this.zb.sa();
            this.zb.la = n.M;
            var a = new Oc;
            a.ma(C.Cg);
            a.la = a.anchor = n.Tb | n.rb;
            a.sa();
            a.bd(0.03, x.da.Hp, 2, 4);
            a.P(0);
            a.Gx(N.gb(0, 2));
            this.zb.N(a);
            a = this.zb.C.g[0];
            this.zb.x = -a.x;
            this.zb.y = -a.y;
            this.zb.Od = a.x - this.zb.width / 2;
            this.zb.mg = a.y - this.zb.width / 2;
            this.zb.Q = this.zb.Z = 1 / 1.3;
            this.N(this.zb)
        },
        Vz: function (a) {
            this.Mc = a;
            this.pg = this.$j = l;
            this.e = new Oc;
            this.e.ma(C.Fg);
            this.e.sa();
            this.e.anchor = n.M;
            this.e.x = this.x;
            this.e.y = this.y;
            this.e.visible = l;
            this.e.tb(0, 0.05, x.da.Va, 0, 6);
            this.e.zz(0.4, 5, 0);
            this.e.tb(1,
            0.1, x.da.Kb, 7, 10);
            this.e.ve(1, 0, 0.05);
            this.N(this.e)
        },
        wr: function () {
            this.na = j
        }
    });
    var md;
    md = Rc.extend({
        init: function () {
            this.h();
            this.b = 0;
            this.Da = o.Ra();
            this.Ka = o.Ra();
            this.touch = this.ai = 0
        },
        Sb: function () {
            var a = this.Y.B / 2;
            this.Da.x = this.x - a;
            this.Ka.x = this.x + a;
            this.Da.y = this.Ka.y = this.y;
            this.b = va.hc(this.rotation);
            this.Da.ja(this.b, this.x, this.y);
            this.Ka.ja(this.b, this.x, this.y)
        }
    });
    var nd;
    nd = Yc.extend({
        init: function (a, b, c) {
            this.h(a, b);
            this.b = c;
            this.fm = 10;
            this.speed = L.sl;
            this.vc = 0.6;
            this.size = 0.0020;
            this.aj = 100;
            this.zc.z = 1;
            this.zc.F = 1;
            this.zc.D = 1;
            this.zc.u = 0.6;
            this.tc.z = 1;
            this.tc.F = 1;
            this.tc.D = 1;
            this.tc.u = 0;
            this.yB = i
        },
        nh: function (a) {
            this.h(a);
            var b = this.Rm.c[N.gb(6, 8)],
                c = new A(0, 0, 0, 0);
            this.Wa.Za(this.Wb.length, b, c, 1);
            b = L.rl;
            a.width = b;
            a.height = b
        },
        du: function (a, b) {
            a.dir.multiply(0.9);
            var c = o.multiply(a.dir, b);
            c.add(this.Id);
            a.a.add(c)
        }
    });
    var od, pd = Sc.extend({
        init: function () {
            this.h();
            this.b = this.group = 0;
            this.Da = new o(0, 0);
            this.Ka = new o(0, 0);
            this.ua = new o(0, 0);
            this.va = new o(0, 0);
            this.jj = 0
        },
        sm: function () {
            this.Mb = new Oc;
            this.Mb.ma(C.Ef);
            this.Mb.anchor = n.Bf | n.Dc;
            this.Mb.la = n.Tb | n.Dc;
            this.Mb.y = L.Ol;
            this.Mb.x = 0;
            this.Mb.Pg(0, 0.05, x.da.Va, 4, [pd.Gf.Ci, pd.Gf.Ci + 1, pd.Gf.Ci + 2, pd.Gf.Ci + 2]);
            this.Mb.sa();
            this.Mb.visible = l;
            this.N(this.Mb)
        },
        Sb: function () {
            this.Da.x = this.x - L.Oi / 2;
            this.Ka.x = this.x + L.Oi / 2;
            this.Da.y = this.Ka.y = this.y;
            this.ua.x = this.Da.x;
            this.va.x = this.Ka.x;
            this.ua.y = this.va.y = this.y + L.Pl;
            this.b = va.hc(this.rotation);
            this.Da.ja(this.b, this.x, this.y);
            this.Ka.ja(this.b, this.x, this.y);
            this.ua.ja(this.b, this.x, this.y);
            this.va.ja(this.b, this.x, this.y)
        },
        s: function () {
            var a = this.Mb.Db;
            if (a && a.state === x.U.Mg) this.Mb.visible = l;
            this.h()
        },
        $g: ba(),
        update: function (a) {
            this.h(a);
            this.Qa && this.Sb()
        }
    });
    pd.Gf = {
        Wu: 0,
        Xu: 1,
        Ci: 2,
        bB: 3,
        aB: 4
    };
    pd.U = {
        pv: 0,
        Nv: 1,
        IDLE: 2
    };
    pd.Au = 0.8;
    od = pd;
    var qd, rd = wa.extend({
        init: function (a) {
            this.h();
            this.mm = a;
            this.state = rd.U.Bd;
            this.Ot = this.bo = this.Pt = this.ao = 0;
            this.Gb = j;
            this.Uf = new A(t.d, t.d, t.d, t.d)
        },
        lj: function (a, b) {
            a.la = b.la = n.Tb | n.rb;
            this.Vd(a, rd.U.Bd);
            this.Vd(b, rd.U.Ce);
            this.Uh(rd.U.Bd)
        },
        qC: function (a, b) {
            var c = new M;
            c.ie(a);
            var d = new M;
            d.ie(b);
            this.lj(c, d)
        },
        cC: ca("Uf"),
        Wh: function (a, b, c, d) {
            this.ao = a;
            this.Pt = b;
            this.bo = c;
            this.Ot = d
        },
        Uh: function (a) {
            this.state = a;
            var b = this.fb(rd.U.Ce);
            this.fb(rd.U.Bd).Sh(a === rd.U.Bd);
            b.Sh(a === rd.U.Ce)
        },
        $e: function (a,
        b, c) {
            c = c ? 0 : 15;
            return this.Uf.B !== t.d ? A.pb(a, b, this.aa + this.Uf.x - c, this.ba + this.Uf.y - c, this.Uf.B + c * 2, this.Uf.L + c * 2) : A.pb(a, b, this.aa - this.ao - c, this.ba - this.bo - c, this.width + (this.ao + this.Pt) + c * 2, this.height + (this.bo + this.Ot) + c * 2)
        },
        Cj: function (a, b) {
            this.h(a, b);
            if (this.state === rd.U.Bd && this.$e(a, b, i)) {
                this.Uh(rd.U.Ce);
                return i
            }
            return l
        },
        Dj: function (a, b) {
            this.h(a, b);
            if (this.state === rd.U.Ce) {
                this.Uh(rd.U.Bd);
                if (this.$e(a, b, l)) {
                    this.Gb && this.Gb(this.mm);
                    return i
                }
            }
            return l
        },
        qn: function (a, b) {
            this.h(a, b);
            if (this.state === rd.U.Ce) {
                if (this.$e(a, b, l)) return i;
                this.Uh(rd.U.Bd)
            }
            return l
        },
        Vd: function (a, b) {
            this.h(a, b);
            a.la = n.Tb | n.rb;
            if (b === rd.U.Ce) {
                this.width = a.width;
                this.height = a.height;
                this.Uh(rd.U.Bd)
            }
        }
    });
    rd.U = {
        Bd: 0,
        Ce: 1
    };
    qd = rd;
    var sd;
    sd = Sc.extend({
        init: function (a, b, c, d, e) {
            this.h();
            var g;
            if (e !== t.d) g = C.Bi + c - 1;
            else switch (c) {
                case 1:
                    g = C.Vk;
                    break;
                case 2:
                    g = C.Wk;
                    break;
                case 3:
                    g = C.Xk;
                    break;
                case 4:
                    g = C.Yk;
                    break;
                case 5:
                    g = C.xi
            }
            this.ma(g);
            if (e > 0) {
                this.sa();
                g = 0 + (e - 1) * 2;
                var h = 1 + (e - 1) * 2,
                    f = M.create(C.Eg, g),
                    h = M.create(C.Eg, h);
                f.sa();
                h.sa();
                this.Xb = new qd(0);
                this.Xb.lj(f, h);
                this.Xb.Gb = $.proxy(this.Gb, this);
                this.Xb.anchor = this.Xb.la = n.M;
                this.N(this.Xb);
                h = f.C;
                f = h.g[g];
                g = h.c[g];
                g = new o(g.B, g.L);
                h = new o(h.qe.x, h.qe.y);
                h.$a(g);
                h.$a(f);
                this.Xb.Wh(-f.x + g.x / 2, -h.x + g.x / 2, -f.y + g.y / 2, -h.y + g.y / 2)
            }
            this.dk = this.Fh = l;
            this.Iy = this.rotation = d;
            this.Da = o.Ra();
            this.Ka = o.Ra();
            this.ua = o.Ra();
            this.va = o.Ra();
            this.dh = l;
            this.gn = this.pn = this.Tm = 0;
            this.$i = l;
            this.Kc = 0;
            this.x = a;
            this.y = b;
            this.$z(e);
            this.Sb();
            if (c === 5) {
                this.tb(0, 0.05, x.da.Kb, 0, 0);
                this.tb(1, 0.05, x.da.Kb, 1, 4);
                this.sa()
            }
            this.ik = t.d
        },
        Sb: function () {
            var a = this.dh ? this.width - 400 * L.bc : this.C.c[this.pf].B,
                a = a / 2;
            this.Da.x = this.x - a;
            this.Ka.x = this.x + a;
            this.Da.y = this.Ka.y = this.y - 5;
            this.ua.x = this.Da.x;
            this.va.x = this.Ka.x;
            this.ua.y = this.va.y = this.y + 5;
            this.b = va.hc(this.rotation);
            this.Da.ja(this.b, this.x, this.y);
            this.Ka.ja(this.b, this.x, this.y);
            this.ua.ja(this.b, this.x, this.y);
            this.va.ja(this.b, this.x, this.y)
        },
        BA: function () {
            this.$i = i;
            this.P(1);
            this.Kc = this.pn;
            U.Hs(C.Ad)
        },
        Vt: function () {
            this.$i = l;
            this.P(0);
            this.Kc = this.gn;
            U.Wn(C.Ad)
        },
        update: function (a) {
            this.h(a);
            (this.Qa || this.rt) && this.Sb();
            if (this.dh) if (this.$i) {
                this.Kc = Pc.ef(this.Kc, 0, 1, a);
                this.Kc === 0 && this.Vt()
            } else {
                this.Kc = Pc.ef(this.Kc, 0, 1, a);
                this.Kc === 0 && this.BA()
            }
        },
        $z: ca("wf"),
        iC: fa("wf"),
        mz: function () {
            this.dk = !this.dk;
            this.cz(2);
            var a = this.Iy + (this.dk ? 90 : 0),
                b = new x;
            b.p(w.me(this.rotation, w.W.LINEAR, 0));
            b.p(w.me(a, w.W.Jb, Math.abs(a - this.rotation) / 90 * 0.3));
            b.ab = $.proxy(this.Yn, this);
            this.Lb(b, 2);
            this.P(2);
            this.rt = i;
            this.Xb.Q = -this.Xb.Q
        },
        Yn: function () {
            this.Sb();
            this.rt = l
        },
        Gb: function (a) {
            if (a === 0) {
                this.ws && this.ws(this.wf);
                this.dk ? U.G(C.Mi) : U.G(C.Ni)
            }
        },
        $g: function () {
            var a = u.context;
            a.beginPath();
            a.strokeStyle = "red";
            a.moveTo(this.Da.x, this.Da.y);
            a.lineTo(this.Ka.x,
            this.Ka.y);
            a.lineTo(this.va.x, this.va.y);
            a.lineTo(this.ua.x, this.ua.y);
            a.lineTo(this.Da.x, this.Da.y);
            a.closePath();
            a.stroke()
        }
    });
    var td;
    td = Sc.extend({
        init: function () {
            this.h();
            this.timeout = this.time = 0;
            this.Ac = j;
            this.Ha = 1E-4
        },
        sm: function () {
            var a;
            if (this.timeout > 0) {
                this.Ac = new Oc;
                this.Ac.ma(C.Yc);
                this.Ac.anchor = this.Ac.la = n.M;
                this.Ac.tb(0, this.timeout / 37, x.da.Va, 19, 55);
                this.Ac.P(0);
                this.time = this.timeout;
                this.Ac.visible = l;
                this.N(this.Ac);
                a = new x;
                a.p(w.ta(m.lb.copy(), 0));
                a.p(w.ta(m.Ib.copy(), 0.5));
                this.Ac.Lb(a, 1);
                a = new x;
                a.p(w.vj(1, 1, 0));
                a.p(w.vj(0, 0, 0.25));
                a.p(w.ta(m.lb.copy(), 0));
                a.p(w.ta(m.Ib.copy(), 0.25));
                this.Lb(a, 1)
            }
            this.Y = A.copy(L.Ul);
            a = new x;
            a.p(w.Pa(this.x, this.y, w.W.zd, 0));
            a.p(w.Pa(this.x, this.y - 3, w.W.Jb, 0.5));
            a.p(w.Pa(this.x, this.y, w.W.zd, 0.5));
            a.p(w.Pa(this.x, this.y + 3, w.W.Jb, 0.5));
            a.p(w.Pa(this.x, this.y, w.W.zd, 0.5));
            a.tj = x.da.Kb;
            this.Lb(a, 0);
            this.P(0);
            a.update(N.gb(0, 20) / 10);
            a = new Oc;
            a.ma(C.Yc);
            a.sa();
            a.bd(0.05, x.da.Kb, 1, 18);
            a.P(0);
            a.Lc(0).update(N.gb(0, 20) / 10);
            a.anchor = a.la = n.M;
            a.Ha = 1E-4;
            this.N(a)
        },
        update: function (a) {
            if (this.timeout > 0 && this.time > 0) this.time = Pc.ef(this.time, 0, 1, a);
            this.h(a)
        },
        s: function () {
            this.Ac && this.Ac.s();
            this.h()
        }
    });
    var ud;
    ud = M.extend({
        init: function () {
            this.h()
        },
        Nn: function (a, b, c, d) {
            a = O.Wi({
                gj: a,
                text: b,
                width: c,
                Oe: d
            });
            this.ie(new Wa(a))
        }
    });
    var vd = ud.extend({
        init: function () {
            this.h();
            this.fa = 0
        }
    }),
        wd, xd = la.extend({
            init: function (a, b) {
                this.speed = a;
                this.type = b;
                this.a = o.Ra();
                this.target = o.Ra();
                this.offset = o.Ra()
            },
            moveTo: function (a, b, c) {
                this.target.x = a;
                this.target.y = b;
                if (c) this.a.$(this.target);
                else if (this.type === xd.$c.ki) {
                    this.offset = o.$a(this.target, this.a);
                    this.offset.multiply(this.speed)
                } else if (this.type === xd.$c.Ff) {
                    this.offset = o.$a(this.target, this.a);
                    this.offset.normalize();
                    this.offset.multiply(this.speed)
                }
            },
            update: function (a) {
                if (!this.a.ej(this.target)) {
                    this.a.add(o.multiply(this.offset,
                    a));
                    this.a.round();
                    (!N.Uj(this.offset.x, this.target.x - this.a.x) || !N.Uj(this.offset.y, this.target.y - this.a.y)) && this.a.$(this.target)
                }
            },
            hw: function () {
                (this.a.x !== 0 || this.a.y !== 0) && u.context.translate(-this.a.x, -this.a.y)
            },
            tw: function () {
                (this.a.x !== 0 || this.a.y !== 0) && u.context.translate(this.a.x, this.a.y)
            }
        });
    xd.$c = {
        Ff: 0,
        ki: 1
    };
    wd = xd;

    function yd(a, b, c, d) {
        this.object = a;
        this.Xd = b;
        this.param = c;
        this.delay = d
    }
    yd.prototype.Gw = function () {
        this.Xd.apply(this.object, this.param)
    };
    var V, X = {
        Bp: 0,
        To: 1,
        wq: 2,
        tq: 3,
        Kq: 4,
        $l: 5,
        xq: 6,
        yq: 7,
        zq: 8,
        Aq: 9,
        Bq: 10,
        Cq: 11,
        Dq: 12,
        Eq: 13,
        Fq: 14,
        Gq: 15,
        Hq: 16,
        Iq: 17,
        Jq: 18,
        vo: 50,
        wo: 51,
        uo: 52,
        Xo: 53,
        qo: 54,
        Kp: 55,
        oq: 56,
        pq: 57,
        qq: 58,
        rq: 59,
        sq: 60,
        yv: 61,
        yk: 80,
        no: 81,
        oo: 82,
        Vo: 100,
        Ek: 101,
        Yo: 102,
        Zo: 103,
        Rp: 120,
        Mv: 121,
        ru: 122,
        dC: function (a) {
            switch (a) {
                case "map":
                    return X.Bp;
                case "gameDesign":
                    return X.To;
                case "target":
                    return X.wq;
                case "target2":
                    return X.Mv;
                case "star":
                    return X.tq;
                case "tutorialText":
                    return X.Kq;
                case "tutorial01":
                    return X.$l;
                case "tutorial02":
                    return X.xq;
                case "tutorial03":
                    return X.yq;
                case "tutorial04":
                    return X.zq;
                case "tutorial05":
                    return X.Aq;
                case "tutorial06":
                    return X.Bq;
                case "tutorial07":
                    return X.Cq;
                case "tutorial08":
                    return X.Dq;
                case "tutorial09":
                    return X.Eq;
                case "tutorial10":
                    return X.Fq;
                case "tutorial11":
                    return X.Gq;
                case "tutorial12":
                    return X.Hq;
                case "tutorial13":
                    return X.Iq;
                case "tutorial14":
                    return X.Jq;
                case "candyL":
                    return X.vo;
                case "candyR":
                    return X.wo;
                case "candy":
                    return X.uo;
                case "candy2":
                    return X.ru;
                case "gravitySwitch":
                    return X.Xo;
                case "bubble":
                    return X.qo;
                case "pump":
                    return X.Kp;
                case "sock":
                    return X.oq;
                case "spike1":
                    return X.pq;
                case "spike2":
                    return X.qq;
                case "spike3":
                    return X.rq;
                case "spike4":
                    return X.sq;
                case "spikesSwitch":
                    return X.yv;
                case "electro":
                    return X.yk;
                case "bouncer1":
                    return X.no;
                case "bouncer2":
                    return X.oo;
                case "grab":
                    return X.Vo;
                case "hidden01":
                    return X.Ek;
                case "hidden02":
                    return X.Yo;
                case "hidden03":
                    return X.Zo;
                case "rotatedCircle":
                    return X.Rp;
                default:
                    alert("Unknown map item:" + a);
                    return j
            }
        }
    };
    V = X;
    var zd = wa.extend({
        init: function () {
            this.h();
            this.Nh = []
        },
        update: function (a) {
            for (var b = 0, c = this.Nh.length; b < c; b++) this.removeChild(this.Nh[b]);
            this.Nh = [];
            this.h(a)
        },
        Yn: function (a) {
            this.Nh.push(a.element)
        },
        we: function () {
            var a = this;
            return function (b) {
                a.Yn(b)
            }
        },
        Ny: function (a) {
            this.Nh.push(a)
        },
        Es: function () {
            var a = this;
            return function (b) {
                a.Ny(b)
            }
        }
    }),
        Ad;

    function Bd(a, b) {
        this.Pw = a;
        this.Ps = b
    }
    var Cd = wa.extend({
        init: function (a, b) {
            this.h();
            this.rows = a;
            this.Se = b;
            this.Ug = L.xb;
            this.Tg = L.bb;
            this.tn = 1;
            this.Ed = [];
            this.td = [];
            this.Zm = [];
            for (var c = 0; c < b; c++) for (var d = this.Zm[c] = [], e = 0; e < a; e++) d[e] = t.d;
            this.Oh = this.Ph = Cd.pc.NONE;
            this.LA = this.vx = l;
            this.JC = i;
            this.Ss = N.gb(1E3, 2E3)
        },
        dw: function (a, b) {
            if (b === t.d) {
                this.vf = a.Zf;
                this.uf = a.Yf
            } else {
                var c = a.c[b];
                this.vf = c.B;
                this.uf = c.L
            }
            this.eo();
            for (var c = t.d, d = 0, e = this.Ed.length; d < e; d++) if (this.Ed[d].C === a) {
                c = d;
                break
            }
            if (c === t.d) {
                d = new Da(a);
                c = this.Ed.length;
                this.Ed.push(d)
            }
            this.td.push(new Bd(c, b))
        },
        eo: function () {
            this.$m = 2 + Math.floor(this.Ug / (this.vf + 1));
            this.an = 2 + Math.floor(this.Tg / (this.uf + 1));
            if (this.Ph === Cd.pc.NONE) this.an = Math.min(this.an, this.rows);
            if (this.Oh === Cd.pc.NONE) this.$m = Math.min(this.$m, this.Se);
            this.width = this.Zh = this.Se * this.vf;
            this.height = this.Yh = this.rows * this.uf
        },
        fill: function (a, b, c, d, e) {
            for (var g = b, b = b + d; g < b; g++) for (var d = a, h = a + c; d < h; d++) this.Zm[g][d] = e
        },
        TC: ca("tn"),
        Qz: function (a) {
            this.Oh = a;
            this.eo()
        },
        Rz: function (a) {
            this.Ph = a;
            this.eo()
        },
        eu: function (a) {
            var b = Math.round(a.x / this.tn),
                c = Math.round(a.y / this.tn),
                d = this.x,
                e = this.y,
                g, h, f;
            if (this.Ph !== Cd.pc.NONE) {
                e = e - c;
                g = Math.floor(e) % this.Yh;
                e = e < 0 ? g + c : g - this.Yh + c
            }
            if (this.Oh !== Cd.pc.NONE) {
                d = d - b;
                g = Math.floor(d) % this.Zh;
                d = d < 0 ? g + b : g - this.Zh + b
            }
            if (A.Mh(b, c, b + this.Ug, c + this.Tg, d, e, d + this.Zh, e + this.Yh)) {
                g = A.Ts(d, e, this.Zh, this.Yh, b, c, this.Ug, this.Tg);
                g = new o(Math.max(0, g.x), Math.max(0, g.y));
                g = new o(Math.floor(Math.floor(g.x) / this.vf), Math.floor(Math.floor(g.y) / this.uf));
                var e = e + g.y * this.uf,
                    k = new o(d + g.x * this.vf, e),
                    d = 0;
                for (h = this.Ed.length; d < h; d++) this.Ed[d].Aj = 0;
                h = g.x + this.$m - 1;
                var p = g.y + this.an - 1;
                this.Ph === Cd.pc.NONE && (p = Math.min(this.rows - 1, p));
                this.Oh === Cd.pc.NONE && (h = Math.min(this.Se - 1, h));
                for (d = g.x; d <= h; d++) {
                    k.y = e;
                    for (var q = g.y; q <= p; q++) {
                        if (k.y >= c + this.Tg) break;
                        var r = A.Ts(b, c, this.Ug, this.Tg, k.x, k.y, this.vf, this.uf),
                            s = new A(b - k.x + r.x, c - k.y + r.y, r.B, r.L),
                            z = Math.round(d),
                            D = Math.round(q);
                        this.Ph === Cd.pc.Po && (k.y < y ? D = 0 : k.y >= this.y + this.Yh && (D = this.rows - 1));
                        this.Oh === Cd.pc.Po && (k.x < this.x ? z = 0 : k.x >= this.x + this.Zh && (z = this.Se - 1));
                        if (this.vx) {
                            f = Math.sin(k.x) * this.Ss;
                            z = Math.abs(Math.floor(f) % this.Se)
                        }
                        if (this.LA) {
                            f = Math.sin(k.y) * this.Ss;
                            D = Math.abs(Math.floor(f) % this.rows)
                        }
                        z >= this.Se && (z = z % this.Se);
                        D >= this.rows && (D = D % this.rows);
                        f = this.Zm[z][D];
                        if (f >= 0) {
                            z = this.td[f];
                            f = this.Ed[z.Pw];
                            D = f.C;
                            if (z.Ps !== t.d) {
                                z = D.c[z.Ps];
                                s.x = s.x + z.x;
                                s.y = s.y + z.y
                            }
                            r = new A(a.x + r.x, a.y + r.y, r.B, r.L);
                            f.Za(f.Aj++, s, r)
                        }
                        k.y = k.y + this.uf
                    }
                    k.x = k.x + this.vf;
                    if (k.x >= b + this.Ug) break
                }
            }
        },
        s: function () {
            this.yc();
            for (var a = 0, b = this.Ed.length; a < b; a++) this.Ed[a].s();
            this.xc()
        }
    });
    Cd.pc = {
        NONE: 0,
        lu: 1,
        Po: 2
    };
    Ad = Cd;
    var Dd;
    Dd = Ad.extend({
        init: function (a, b) {
            this.h(a, b);
            this.Yr = o.Bh()
        },
        eu: function (a) {
            if (!this.Yr.ej(a)) {
                this.h(a);
                this.Yr.$(a)
            }
        },
        s: function () {
            this.h()
        }
    });
    var Ed, Fd = wa.extend({
        init: function (a, b, c, d, e) {
            this.h();
            this.mm = e;
            this.ua = new qd(0);
            this.ua.lj(a, b);
            this.va = new qd(1);
            this.va.lj(c, d);
            this.ua.la = this.va.la = n.Tb | n.rb;
            this.width = this.ua.width;
            this.height = this.ua.height;
            this.Vd(this.ua, 0);
            this.Vd(this.va, 1);
            this.va.Sh(l);
            this.ua.Gb = $.proxy(this.Gb, this);
            this.va.Gb = $.proxy(this.Gb, this)
        },
        Gb: function (a) {
            switch (a) {
                case 0:
                case 1:
                    this.toggle()
            }
            this.Gb && this.Gb(this.mm)
        },
        Wh: function (a, b, c, d) {
            this.ua.Wh(a, b, c, d);
            this.va.Wh(a, b, c, d)
        },
        toggle: function () {
            this.ua.Sh(!this.ua.isEnabled());
            this.va.Sh(!this.va.isEnabled())
        },
        Xm: function () {
            return this.va.isEnabled()
        }
    }).extend({
        init: function () {
            var a = M.create(C.Yc, 56),
                b = M.create(C.Yc, 56),
                c = M.create(C.Yc, 57),
                d = M.create(C.Yc, 57);
            this.h(a, b, c, d, Fd.Mo);
            this.Wh(10, 10, 10, 10)
        }
    });
    Fd.Mo = 0;
    Ed = Fd;
    var Gd, Hd = M.extend({
        init: function (a, b) {
            this.h();
            this.ma(C.Yc);
            this.Za(58);
            this.anchor = n.M;
            var c = new x;
            c.p(w.me(0, w.W.LINEAR, 0));
            c.p(w.me(180, w.W.Jb, 0.3));
            this.Lb(c, Hd.Pi.Nq);
            c = new x;
            c.p(w.me(180, w.W.LINEAR, 0));
            c.p(w.me(0, w.W.Jb, 0.3));
            this.Lb(c, Hd.Pi.Hg);
            this.Cz(C.Kk, 1);
            this.x = this.x + a;
            this.y = this.y + b
        }
    });
    Hd.Pi = {
        Hg: 0,
        Nq: 1
    };
    Gd = Hd;
    var Id;

    function Jd() {
        this.y = this.x = this.Ky = 0;
        this.bj = this.Tn = this.alpha = this.dj = this.gk = this.Z = this.cj = this.fk = this.Q = 1
    }
    Id = wa.extend({
        init: function () {
            this.h();
            var a = Xa.Hd(C.zi);
            this.Qs = a.Zf;
            this.Os = a.Yf;
            this.Wa = new Da(a);
            this.Wa.Ha = 0.1;
            this.Ij = []
        },
        bw: function (a, b) {
            var c, d, e = [0.3, 0.3, 0.5, 0.5, 0.6],
                e = c = e[N.gb(0, e.length - 1)];
            N.Xy() ? c = c * (1 + N.gb(0, 1) / 10) : e = e * (1 + N.gb(0, 1) / 10);
            c = 1 * c;
            d = 1 * e;
            var g = this.Qs * c,
                h = this.Os * d,
                f = Math.min(1 - c, 1 - d),
                k = Math.random(),
                e = new Jd;
            e.Ky = b;
            e.x = a.x;
            e.y = a.y;
            e.fk = f + c;
            e.gk = f + d;
            e.Q = e.fk * k;
            e.Z = e.gk * k;
            e.cj = c;
            e.dj = d;
            e.bj = 0.3;
            e.Tn = 1;
            e.alpha = 0.7 * k + 0.3;
            c = this.Wa.C.c[0];
            g = new A(a.x - g / 2, a.y - h / 2, g, h);
            this.Wa.Za(this.Ij.length,
            c, g, e.alpha);
            this.Ij.push(e)
        },
        Fr: function (a, b, c) {
            var d = L.ml,
                e = c.Qa.path[a],
                b = o.$a(c.Qa.path[b], e),
                c = Math.floor(b.jd() / d),
                g = L.ll,
                h, f;
            b.normalize();
            for (h = 0; h <= c; h++) {
                f = o.add(e, o.multiply(b, h * d));
                f.x = f.x + N.gb(-g, g);
                f.y = f.y + N.gb(-g, g);
                this.bw(f, a)
            }
        },
        update: function (a) {
            this.h(a);
            this.Wa.update(a);
            var b = this.Ij.length,
                c, d, e, g;
            for (c = 0; c < b; c++) {
                d = this.Ij[c];
                e = Pc.nd(d.Q, d.cj, 1, a);
                d.Q = e.value;
                if (e.pd) {
                    e = d.fk;
                    d.fk = d.cj;
                    d.cj = e
                }
                e = Pc.nd(d.Z, d.dj, 1, a);
                d.Z = e.value;
                if (e.pd) {
                    e = d.gk;
                    d.gk = d.dj;
                    d.dj = e
                }
                e = this.Qs * d.Q;
                g = this.Os * d.Z;
                this.Wa.ye[c] = new A(d.x - e / 2, d.y - g / 2, e, g);
                e = Pc.nd(d.alpha, d.bj, 1, a);
                d.alpha = e.value;
                if (e.pd) {
                    e = d.Tn;
                    d.Tn = d.bj;
                    d.bj = e
                }
                this.Wa.Nf[c] = d.alpha
            }
        },
        s: function () {
            this.yc();
            this.Wa.s();
            this.xc()
        }
    });
    var Kd = 7 * L.H,
        Ld = 3 * L.H,
        Md = 22.5 * L.H,
        Nd = 0.03 * L.H,
        Pd = M.extend({
            init: function () {
                this.h();
                this.ma(C.nc);
                this.Za(Od)
            }
        }),
        Wd = wa.extend({
            init: function () {
                this.h();
                this.Hc = [];
                this.Dd = [];
                this.Rn = t.d;
                this.xh = o.Bh();
                this.Qd = new Pd;
                this.Qd.anchor = n.Hf | n.Kf;
                this.Qd.Q = 1;
                this.Qd.la = n.M;
                this.Qd.Od = this.Qd.width / 2 + 0.5;
                this.Qd.Ha = 0.0010;
                this.Rd = new Pd;
                this.Rd.Q = -1;
                this.Rd.anchor = n.Hf | n.Kf;
                this.Rd.la = n.M;
                this.Rd.Od = this.Rd.width / 2 - 0.5;
                this.Rd.Ha = 0.0010;
                this.Af = M.create(C.nc, Qd);
                this.Af.anchor = n.M;
                this.ac = M.create(C.nc,
                Sd);
                this.ac.anchor = n.Tb | n.Hf;
                this.ze = M.create(C.nc, Sd);
                this.ze.Q = -1;
                this.ze.anchor = n.Tb | n.rb;
                this.qb = M.create(C.nc, Td);
                this.qb.anchor = n.M;
                this.qb.rotation = 90;
                this.lc = M.create(C.nc, Td);
                this.lc.anchor = n.M;
                this.lc.rotation = -90;
                this.Bc = M.create(C.nc, Ud);
                this.Bc.anchor = this.qb.anchor;
                this.Bc.rotation = this.qb.rotation;
                this.Bc.visible = l;
                this.Cc = M.create(C.nc, Ud);
                this.Cc.anchor = this.lc.anchor;
                this.Cc.rotation = this.lc.rotation;
                this.Cc.visible = l;
                this.zf = M.create(C.nc, Vd);
                this.zf.anchor = n.M;
                this.Fh = l;
                this.N(this.Qd);
                this.N(this.Rd);
                this.N(this.Bc);
                this.N(this.Cc);
                this.N(this.qb);
                this.N(this.lc)
            },
            setSize: function (a) {
                this.size = a;
                var b = this.size / 167;
                this.ac.Q = this.ac.Z = this.ze.Z = b;
                this.ze.Q = -b;
                this.zf.Q = this.zf.Z = b;
                a = b >= 0.4 ? b : 0.4;
                this.Qd.Q = this.Qd.Z = this.Rd.Z = a;
                this.Rd.Q = -a;
                b = b >= 0.75 ? b : 0.75;
                this.qb.Q = this.qb.Z = this.lc.Q = this.lc.Z = b;
                this.Bc.Q = this.Bc.Z = this.Cc.Q = this.Cc.Z = b;
                this.Af.Q = 1 - (1 - a) * 0.5;
                this.Af.Z = this.Af.Q;
                this.Qb = this.ac.width * this.ac.Q;
                this.DA()
            },
            Sr: function () {
                return !this.qb.visible
            },
            ht: function (a) {
                this.qb.visible = !a
            },
            tC: function () {
                return this.Bc.visible
            },
            it: function (a) {
                this.Bc.visible = a
            },
            uC: function () {
                return this.Cc.visible
            },
            jt: function (a) {
                this.Cc.visible = a
            },
            ww: function () {
                var a = this.Dd.length,
                    b, c;
                for (b = 0; b < a; b++) {
                    c = this.Dd[b];
                    if (c != this && this.xw(c)) return i
                }
                return l
            },
            s: function () {
                var a = u.context;
                if (this.Cc.visible || this.Bc.visible) {
                    var b = (Ld + L.H) * this.qb.Q,
                        c = this.Qb + Math.floor(b / 2);
                    a.beginPath();
                    a.lineWidth = b;
                    a.arc(this.x, this.y, c, 0, 2 * Math.PI, l);
                    a.stroke()
                }
                this.ac.color = this.color;
                this.ze.color = this.color;
                this.qb.color = this.color;
                this.lc.color = this.color;
                this.zf.color = this.color;
                this.zf.s();
                var b = this.Dd.length,
                    d, e = this.Dd.indexOf(this),
                    g = a.globalAlpha;
                if (g !== 0.2) a.globalAlpha = 0.2;
                for (c = 0; c < b; c++) {
                    d = this.Dd[c];
                    d != this && (d.ww() && this.Dd.indexOf(d) < e) && this.Kw(this.x, this.y, this.Qb, d.x, d.y, d.Qb, Kd * d.ac.Q * 0.5)
                }
                if (g !== 0.2) a.globalAlpha = g;
                this.ac.s();
                this.ze.s();
                this.h();
                this.Af.s()
            },
            Kw: function (a, b, c, d, e, g, h) {
                var f = o.Ia(a, b, d, e);
                if (!(f >= c + g || c >= f + g)) {
                    c = Math.acos((f - (c * c - g * g + f * f) / (2 * f)) / g);
                    f = (new o(a - d,
                    b - e)).b();
                    b = f - c;
                    c = f + c;
                    if (d > a) {
                        b = b + Math.PI;
                        c = c + Math.PI
                    }
                    a = u.context;
                    a.beginPath();
                    a.lineWidth = h;
                    a.arc(d, e, g, b, c, l);
                    a.stroke()
                }
            },
            DA: function () {
                this.zf.x = this.Af.x = this.x;
                this.zf.y = this.Af.y = this.y;
                var a = this.ac.width / 2 * (1 - this.ac.Q),
                    b = this.ac.height / 2 * (1 - this.ac.Z),
                    c = this.Qb - (Md - Nd * this.size) + (1 - this.qb.Q) * (this.qb.width / 2);
                this.ac.x = this.x + a;
                this.ze.x = this.x - a;
                this.ac.y = this.ze.y = this.y - b;
                this.qb.x = this.x - c;
                this.lc.x = this.x + c;
                this.qb.y = this.lc.y = this.y;
                this.Bc.x = this.qb.x;
                this.Bc.y = this.qb.y;
                this.Cc.x = this.lc.x;
                this.Cc.y = this.lc.y
            },
            xw: function (a) {
                if (this.x === a.x && this.y === a.y && this.size === a.size) return l;
                var b = this.Hc.length,
                    c;
                for (c = 0; c < b; c++) if (a.Hc.indexOf(this.Hc[c]) >= 0) return i;
                return l
            },
            copy: function (a) {
                var b = new Wd;
                b.eD = a;
                b.x = this.x;
                b.y = this.y;
                b.rotation = this.rotation;
                b.Dd = this.Dd;
                b.Hc = this.Hc;
                b.Eh = t.d;
                var a = this.size * L.H,
                    c = va.hc(b.rotation);
                b.Xf = new o(b.x - a, b.y);
                b.kd = new o(b.x + a, b.y);
                b.Xf.ja(c, b.x, b.y);
                b.kd.ja(c, b.x, b.y);
                b.setSize(this.size);
                b.ht(this.Sr());
                b.qb.visible = l;
                b.lc.visible = l;
                return b
            }
        }),
        Vd = 0,
        Sd = 1,
        Od = 2,
        Qd = 3,
        Ud = 4,
        Td = 5,
        Xd;

    function Yd(a, b) {
        var c = m.iu.copy();
        this.start = a;
        this.end = b;
        this.bC = this.XC = 5;
        this.color = c
    }
    var Zd = {
        ae: [],
        Cd: function (a, b, c, d) {
            this.ae.push(new yd(a, b, c, d))
        },
        om: function () {
            this.ae = []
        },
        GB: function (a, b, c) {
            for (var d = 0, e = this.ae.length; d < e; d--) {
                var g = this.ae[d];
                if (g.object === a && g.Xd === b && g.param === c) {
                    this.ae.splice(d, 1);
                    break
                }
            }
        },
        update: function (a) {
            for (var b = this.ae.slice(0), c = 0, d = b.length; c < d; c++) {
                var e = b[c],
                    g = this.ae.indexOf(e);
                if (!(g < 0)) {
                    e.delay = e.delay - a;
                    if (e.delay <= 0) {
                        this.ae.splice(g, 1);
                        e.Gw()
                    }
                }
            }
        }
    }, be = Wd;
    Xd = wa.extend({
        init: function () {
            this.h();
            this.gc = Zd;
            this.Nd = this.Vr = t.d;
            this.Xa = new zd;
            this.Xa.visible = l;
            this.N(this.Xa);
            this.rg = new zd;
            this.rg.visible = l;
            this.N(this.rg);
            this.R = new wd(L.hi, wd.$c.ki);
            this.qg = 0;
            this.Pm = [];
            for (var a = 0; a < 3; a++) {
                var b = this.Pm[a] = new Oc;
                b.ma(C.Mk);
                b.sa();
                b.bd(0.05, x.da.Va, 0, 10);
                b.mt(10, 0);
                b.x = b.width * a;
                b.y = 0;
                this.N(b)
            }
            this.ck = o.Ra();
            this.fj = [];
            for (a = 0; a < t.oc; a++) this.fj[a] = [];
            this.pm = Qa.Gm();
            this.H = L.H;
            this.jb = L.jb;
            this.sb = 0;
            this.Fd = [];
            this.vh = this.uh = this.th = 0;
            this.Zg = Array(t.oc);
            this.ue = Array(t.oc);
            this.yn = Array(t.oc);
            for (a = 0; a < t.oc; a++) {
                this.Zg[a] = l;
                this.ue[a] = o.Ra();
                this.yn[a] = o.Ra()
            }
        },
        xn: function (a) {
            var b = L.jl;
            return a.a.y > this.ld + L.il || a.a.y < b
        },
        IC: function () {
            this.hide();
            this.show()
        },
        ak: function () {
            this.target.P(10)
        },
        qt: function (a) {
            var b = Qa.ih();
            return Ja.Ir(a.Ja) !== b ? i : l
        },
        show: function () {
            this.Xa.Us();
            this.rg.Us();
            this.gc.om();
            var a = I.as[id.Ld];
            this.br = Xa.Hd(I.$r[id.Ld]);
            this.sn = a ? Xa.Hd(a) : this.br;
            this.back = new Dd(1, 1);
            this.back.Qz(Ad.pc.NONE);
            this.back.Rz(Ad.pc.lu);
            this.back.dw(this.br,
            0);
            this.back.fill(0, 0, 1, 1, 0);
            this.Na = j;
            this.Km = t.d;
            this.I = 2;
            this.ne = 0;
            this.sd = j;
            U.Wn(C.Ad);
            this.Ea = [];
            this.Lj = [];
            this.Yb = [];
            this.mb = [];
            this.bubbles = [];
            this.ic = [];
            this.bt = [];
            this.og = [];
            this.Pd = [];
            this.yf = [];
            this.be = [];
            this.Rg = [];
            this.Sa = [];
            this.pe = j;
            this.J = new fd;
            this.J.rd(1);
            this.ca = new fd;
            this.ca.rd(1);
            this.ra = new fd;
            this.ra.rd(1);
            this.S = new Rc;
            this.S.ma(C.Xc);
            this.S.Za(0);
            this.S.sa();
            this.S.anchor = n.M;
            this.S.Y = A.copy(L.sk);
            this.S.oe = l;
            this.S.Q = this.S.Z = 0.71;
            this.S.Ha = 1E-4;
            this.Bb = new Rc;
            this.Bb.ma(C.Xc);
            this.Bb.Za(1);
            this.Bb.sa();
            this.Bb.anchor = this.Bb.la = n.M;
            this.S.N(this.Bb);
            this.Bb.Q = this.Bb.Z = 0.71;
            this.Bb.Ha = 1E-4;
            this.Gc = new Rc;
            this.Gc.ma(C.Xc);
            this.Gc.Za(2);
            this.Gc.sa();
            this.Gc.anchor = this.Gc.la = n.M;
            this.S.N(this.Gc);
            this.Gc.Q = this.Gc.Z = 0.71;
            this.Gc.Ha = 1E-4;
            this.Ab = new Oc;
            this.Ab.ma(C.Xc);
            this.Ab.sa();
            this.Ab.tb(0, 0.07, x.da.Va, 8, 17);
            this.Ab.Pg(1, 0.3, x.da.Va, 2, [18, 18]);
            a = this.Ab.Lc(1);
            a.p(w.ta(m.lb.copy(), 0));
            a.p(w.ta(m.Ib.copy(), 0.2));
            this.Ab.visible = l;
            this.Ab.anchor = this.Ab.la = n.M;
            this.Ab.Q = this.Ab.Z = 0.71;
            this.S.N(this.Ab);
            this.Ab.Ha = 1E-4;
            this.ec = new Oc;
            this.ec.ma(C.Dg);
            this.ec.x = this.S.x;
            this.ec.y = this.S.y;
            this.ec.la = this.ec.anchor = n.M;
            this.ec.bd(0.05, x.da.Kb, 0, 12);
            this.ec.P(0);
            this.S.N(this.ec);
            this.ec.visible = l;
            this.ec.Ha = 1E-4;
            for (a = 0; a < 3; a++) {
                var b = this.Pm[a];
                b.Db && b.Db.stop();
                b.Za(0)
            }
            this.Tx(id.ds);
            if (this.I !== 2) {
                this.dd = new Oc;
                this.dd.ma(C.Dg);
                this.dd.la = this.dd.anchor = n.M;
                this.dd.bd(0.05, x.da.Kb, 0, 12);
                this.dd.P(0);
                this.Fa.N(this.dd);
                this.dd.visible = l;
                this.dd.Ha = 1E-4;
                this.ed = new Oc;
                this.ed.ma(C.Dg);
                this.ed.la = this.ed.anchor = n.M;
                this.ed.bd(0.05, x.da.Kb, 0, 12);
                this.ed.P(0);
                this.Ga.N(this.ed);
                this.ed.visible = l;
                this.ed.Ha = 1E-4
            }
            for (var b = this.Sa.length, c, a = 0; a < b; a++) {
                c = this.Sa[a];
                c.Eh = t.d;
                c.Dd = this.Sa
            }
            this.mA();
            this.qg = this.AA = 0;
            this.rc = this.fc = this.qc = j;
            this.cn = l;
            this.ub = this.I !== 2;
            this.Ob = this.Nb = l;
            this.blink.P(0);
            this.jA = l;
            this.Wj = this.time = 0;
            this.Wf = i;
            cd.reset();
            this.Rj = this.In = this.Ue = 0;
            this.gc.Cd(this, this.Hw, j, 1);
            a = new ud;
            a.Nn(C.Ag, id.Ld + 1 + " - " + (id.Jd + 1));
            a.anchor = n.Bf | n.rb;
            a.x = 37 * L.bc;
            a.y = L.bb + 25 * L.bc;
            b = new ud;
            b.Nn(C.Ag, R.T(P.Zu));
            b.anchor = n.Bf | n.rb;
            b.la = n.Tb | n.rb;
            b.y = 80 * L.bc;
            b.Od = b.Od - b.width / 2;
            b.Q = b.Z = 0.7;
            a.N(b);
            b = new x;
            b.p(w.ta(m.Ib.copy(), 0));
            b.p(w.ta(m.Ib.copy(), 0.5));
            b.p(w.ta(m.lb.copy(), 0.5));
            b.p(w.ta(m.lb.copy(), 1));
            b.p(w.ta(m.Ib.copy(), 0.5));
            a.Lb(b, 0);
            a.P(0);
            b.ab = this.rg.we();
            this.rg.N(a);
            this.pm && this.$s()
        },
        mA: function () {
            var a = L.xb,
                b = L.bb;
            if (this.md > a || this.ld > b) {
                this.he = i;
                this.Er = l;
                this.R.type = wd.$c.Ff;
                this.R.speed = 10;
                this.FB = 0;
                var c, d, e = this.I !== 2 ? this.ca : this.J;
                if (this.md > a) {
                    c = e.a.x > this.md / 2 ? 0 : this.md - a;
                    d = 0
                } else if (e.a.y > this.ld / 2) d = c = 0;
                else {
                    c = 0;
                    d = this.ld - b
                }
                var g = e.a.y - b / 2,
                    a = N.Rf(e.a.x - a / 2, 0, this.md - a),
                    b = N.Rf(g, 0, this.ld - b);
                this.R.moveTo(c, d, i);
                this.Vr = this.R.a.Ia(new o(a, b))
            } else {
                this.he = l;
                this.R.moveTo(0, 0, i)
            }
        },
        Hw: function () {
            this.Ab.P(0)
        },
        Tx: function (a) {
            function b(a, b) {
                for (var f = 0, c = a.length; f < c; f++) for (var e = a[f], q = e.length, r = 0; r < q; r++) b.call(d, e[r])
            }
            var c = [],
                d = this,
                e;
            for (e in a) a.hasOwnProperty(e) && c.push(a[e]);
            b(c, function (a) {
                switch (a.name) {
                    case V.Bp:
                        this.Ux(a);
                        break;
                    case V.To:
                        this.Ox(a);
                        break;
                    case V.vo:
                        this.Mx(a);
                        break;
                    case V.wo:
                        this.Nx(a);
                        break;
                    case V.uo:
                        this.Lx(a)
                }
            });
            b(c, function (a) {
                switch (a.name) {
                    case V.Xo:
                        this.Qx(a);
                        break;
                    case V.tq:
                        this.$x(a);
                        break;
                    case V.Kq:
                        this.cy(a);
                        break;
                    case V.$l:
                    case V.xq:
                    case V.yq:
                    case V.zq:
                    case V.Aq:
                    case V.Bq:
                    case V.Cq:
                    case V.Dq:
                    case V.Eq:
                    case V.Fq:
                    case V.Gq:
                    case V.Hq:
                    case V.Iq:
                    case V.Jq:
                        this.by(a);
                        break;
                    case V.qo:
                        this.Kx(a);
                        break;
                    case V.Kp:
                        this.Wx(a);
                        break;
                    case V.oq:
                        this.Yx(a);
                        break;
                    case V.pq:
                    case V.qq:
                    case V.rq:
                    case V.sq:
                    case V.yk:
                        this.Zx(a);
                        break;
                    case V.Rp:
                        this.Xx(a);
                        break;
                    case V.no:
                    case V.oo:
                        this.Jx(a);
                        break;
                    case V.Vo:
                        this.Px(a);
                        break;
                    case V.wq:
                        this.ay(a);
                        break;
                    case V.Ek:
                    case V.Yo:
                    case V.Zo:
                        this.Rx(a)
                }
            })
        },
        Ux: function (a) {
            this.md = a.width;
            this.ld = a.height;
            this.sb = (L.xb - this.md * this.H) / 2;
            this.md = this.md * this.H;
            this.ld = this.ld * this.H;
            if (I.bA[id.Ld]) {
                this.md > L.xb && this.Fd.push(new Gd(L.xb, 0));
                this.ld > L.bb && this.Fd.push(new Gd(0, L.bb));
                this.Fd.push(new Gd(0, 0))
            }
        },
        Ox: function (a) {
            this.fa = a.fa || 0;
            this.pa = a.pa;
            this.ky = a.ky;
            this.I = a.I ? 0 : 2;
            this.pa = this.pa * L.kl
        },
        Px: function (a) {
            var b = a.x * this.H + this.sb,
                c = a.y * this.H + this.jb,
                d = a.length * this.H,
                e = a.r,
                g = a.q,
                h = a.eg,
                f = a.ke,
                k = a.t * this.H || -1,
                p = a.A,
                q = a.w * this.H || 0,
                r = a.e,
                s = a.O === "L",
                z = a.nC,
                D = a.K,
                E = new kd;
            E.x = b;
            E.y = c;
            E.q = g;
            E.K = D;
            E.eg = h;
            E.ke = f;
            E.Vz(r);
            E.kf(a);
            if (E.Qa) {
                E.vz();
                if (!z) {
                    a = a.path[0] === "R";
                    if (!this.pe) this.pe = new Id;
                    g = 0;
                    for (h = E.Qa.path.length - 1; g < h; g++)(!a || g % 3 === 0) && this.pe.Fr(g, g + 1, E);
                    E.Qa.path.length > 2 && this.pe.Fr(0, E.Qa.path.length - 1, E)
                }
            }
            e !== t.d && (e = e * this.H);
            if (e === t.d && !D) {
                D = this.J;
                this.I !== 2 && (D = s ? this.ca : this.ra);
                b = new hd(j, b, c, D, D.a.x, D.a.y, d);
                b.Ya.Pc.$(b.Ya.a);
                E.ot(b)
            }
            E.Pz(e);
            E.Jz(k, p, q);
            this.Ea.push(E)
        },
        Mx: function (a) {
            this.ca.a.x = a.x * this.H + this.sb;
            this.ca.a.y = a.y * this.H + this.jb;
            this.Fa = new Rc;
            this.Fa.ma(C.Xc);
            this.Fa.Za(19);
            this.Fa.Q = this.Fa.Z = 0.71;
            this.Fa.oe = l;
            this.Fa.sa();
            this.Fa.anchor = n.M;
            this.Fa.x = this.ca.a.x;
            this.Fa.y = this.ca.a.y;
            this.Fa.Y = A.copy(L.ii)
        },
        Nx: function (a) {
            this.ra.a.x = a.x * this.H + this.sb;
            this.ra.a.y = a.y * this.H + this.jb;
            this.Ga = new Rc;
            this.Ga.ma(C.Xc);
            this.Ga.Za(20);
            this.Ga.Q = this.Ga.Z = 0.71;
            this.Ga.oe = l;
            this.Ga.sa();
            this.Ga.anchor = n.M;
            this.Ga.x = this.ra.a.x;
            this.Ga.y = this.ra.a.y;
            this.Ga.Y = A.copy(L.ii)
        },
        Lx: function (a) {
            this.J.a.x = a.x * this.H + this.sb;
            this.J.a.y = a.y * this.H + this.jb
        },
        Qx: function (a) {
            this.Na = new Ed;
            this.Na.Gb = $.proxy(this.Gb, this);
            this.Na.visible = l;
            this.Na.Zb = l;
            this.N(this.Na);
            this.Na.x = a.x * this.H + this.sb;
            this.Na.y = a.y * this.H + this.jb;
            this.Na.anchor = n.M
        },
        $x: function (a) {
            var b = new td;
            b.ma(C.Yc);
            b.x = a.x * this.H + this.sb;
            b.y = a.y * this.H + this.jb;
            b.timeout = a.timeout;
            b.sm();
            b.Y = A.copy(L.Tl);
            b.kf(a);
            b.update(0);
            this.mb.push(b)
        },
        cy: function (a) {
            if (!this.qt(a)) if (a.text == j || a.text === "") Ua.debug("Missing tutorial text");
            else {
                var b = new vd;
                b.x = a.x * this.H + this.sb;
                b.y = a.y * this.H + this.jb;
                b.fa = a.fa || 0;
                b.align = n.Dc;
                b.Nn(C.mi, a.text, Math.ceil(a.width * this.H), n.Dc);
                b.color = m.Ib.copy();
                var a = new x,
                    c = id.Ld === 0 && id.Jd === 0;
                a.p(w.ta(m.Ib.copy(), 0));
                a.p(w.ta(m.lb.copy(), 1));
                a.p(w.ta(m.lb.copy(), c ? 10 : 5));
                a.p(w.ta(m.Ib.copy(), 0.5));
                b.Lb(a, 0);
                b.fa === 0 && b.P(0);
                this.yf.push(b)
            }
        },
        by: function (a) {
            if (!this.qt(a)) {
                var b = a.name - V.$l,
                    c = new Sc;
                c.ma(C.$k);
                c.Za(b);
                c.color = m.Ib.copy();
                c.x = a.x * this.H + this.sb;
                c.y = a.y * this.H + this.jb;
                c.rotation = a.b || 0;
                c.fa = a.fa || 0;
                c.kf(a);
                a = new x;
                a.p(w.ta(m.Ib.copy(), 0));
                a.p(w.ta(m.lb.copy(), 1));
                id.Ld === 0 && id.Jd === 0 ? a.p(w.ta(m.lb.copy(), 10)) : a.p(w.ta(m.lb.copy(), 5.2));
                a.p(w.ta(m.Ib.copy(), 0.5));
                c.Lb(a, 0);
                if (c.fa === 0) c.P(0);
                else if (c.fa === 2) {
                    a = new x;
                    a.p(w.ta(m.Ib.copy(), 0));
                    a.p(w.ta(m.lb.copy(), 0.5));
                    a.p(w.ta(m.lb.copy(), 1));
                    a.p(w.ta(m.lb.copy(), 1.1));
                    a.p(w.ta(m.Ib.copy(), 0.5));
                    a.p(w.Pa(c.x,
                    c.y, w.W.LINEAR, 0));
                    a.p(w.Pa(c.x, c.y, w.W.LINEAR, 0.5));
                    a.p(w.Pa(c.x, c.y, w.W.LINEAR, 1));
                    a.p(w.Pa(c.x + L.am, c.y, w.W.LINEAR, 0.5));
                    a.p(w.Pa(c.x + L.bm, c.y, w.W.LINEAR, 0.5));
                    a.df = 2;
                    a.tj = x.da.Kb;
                    c.Lb(a, 1);
                    c.P(1)
                }
                this.Pd.push(c)
            }
        },
        Rx: function (a) {
            var b = a.name - V.Ek,
                c = a.zm - 1;
            if (!I.Dw) {
                b = new $c(b, c);
                b.x = a.x * this.H + this.sb;
                b.y = a.y * this.H + this.jb;
                b.rotation = a.b || 0;
                this.be.push(b)
            }
        },
        Kx: function (a) {
            var b = N.gb(1, 3),
                c = new Vc;
            c.ma(C.wi);
            c.Za(b);
            c.sa();
            c.Y = A.copy(L.ok);
            c.x = a.x * this.H + this.sb;
            c.y = a.y * this.H + this.jb;
            c.anchor = n.M;
            c.mf = l;
            a = new M;
            a.ma(C.wi);
            a.Za(0);
            a.sa();
            a.la = a.anchor = n.M;
            c.N(a);
            this.bubbles.push(c)
        },
        Wx: function (a) {
            var b = new md;
            b.ma(C.Ai);
            b.sa();
            b.$v(0.05, x.da.Va, 4, [1, 2, 3, 0]);
            b.Y = A.copy(L.pl);
            b.x = a.x * this.H + this.sb;
            b.y = a.y * this.H + this.jb;
            b.rotation = a.b + 90;
            b.Sb();
            b.anchor = n.M;
            this.ic.push(b)
        },
        Yx: function (a) {
            var b = new od;
            b.ma(C.Ef);
            b.Q = b.Z = 0.7;
            b.sm();
            b.sa();
            b.x = a.x * this.H + this.sb;
            b.y = a.y * this.H + this.jb;
            b.group = a.group;
            b.anchor = n.Tb | n.Dc;
            b.mg = b.mg - (b.height / 2 - 25);
            b.Za(b.group === 0 ? od.Gf.Wu : od.Gf.Xu);
            b.state = od.U.IDLE;
            b.kf(a);
            b.rotation = b.rotation + 90;
            if (b.Qa) b.Qa.b = b.Qa.b + 90;
            b.Sb();
            this.og.push(b)
        },
        Zx: function (a) {
            var b = a.wf === l ? t.d : a.wf || t.d,
                c = new sd(a.x * this.H + this.sb, a.y * this.H + this.jb, a.size, parseFloat(a.b) || 0, b);
            c.kf(a);
            if (b) c.ws = $.proxy(this.kz, this);
            if (a.name === V.yk) {
                c.dh = i;
                c.Tm = a.Tm;
                c.pn = a.pn;
                c.gn = a.gn;
                c.Kc = 0;
                c.Vt();
                c.Kc = c.Kc + c.Tm;
                c.Sb()
            } else c.dh = l;
            this.Yb.push(c)
        },
        Xx: function (a) {
            var b = a.x * this.H + this.sb,
                c = a.y * this.H + this.jb,
                d = a.size,
                e = parseFloat(a.mC) || 0,
                g = va.hc(e),
                a = a.CC,
                h = new be;
            h.anchor = n.M;
            h.x = b;
            h.y = c;
            h.rotation = e;
            h.Xf = new o(h.x - d * this.H, h.y);
            h.kd = new o(h.x + d * this.H, h.y);
            h.Xf.ja(g, h.x, h.y);
            h.kd.ja(g, h.x, h.y);
            h.setSize(d);
            h.ht(a);
            this.Sa.push(h)
        },
        Jx: function (a) {
            var b = new Uc(a.x * this.H + this.sb, a.y * this.H + this.jb, a.size, a.b);
            b.kf(a);
            this.Rg.push(b)
        },
        ay: function (a) {
            var b = new Rc;
            this.target = b;
            b.ma(C.ti);
            b.sa();
            b.Y = A.copy(L.Zl);
            b.Ha = 1E-4;
            b.tb(10, 0.05, x.da.Va, 152, 180);
            b.tb(0, 0.05, x.da.Kb, 8, 26);
            b.tb(1, 0.05, x.da.Va, 84, 108);
            b.Pg(2, 0.05, x.da.Va, 32, [109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119,
            120, 121, 122, 123, 124, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124]);
            b.tb(3, 0.05, x.da.Va, 64, 83);
            b.tb(4, 0.05, x.da.Va, 125, 151);
            b.tb(5, 0.05, x.da.Va, 27, 39);
            b.tb(6, 0.05, x.da.Va, 49, 52);
            b.tb(7, 0.05, x.da.Va, 40, 48);
            b.tb(8, 0.05, x.da.Va, 49, 52);
            b.tb(9, 0.05, x.da.Kb, 53, 61);
            b.ve(9, 6, 0.05);
            b.ve(4, 8, 0.05);
            b.ve(0, 10, 0.05);
            b.ve(0, 1, 0.05);
            b.ve(0, 2, 0.05);
            b.ve(0, 3, 0.05);
            b.ve(0, 4, 0.05);
            if (Qa.ak) {
                this.gc.Cd(this, this.ak, j, 2);
                Qa.ak = l
            }
            b.P(0);
            b.Lc(0).Dh = $.proxy(this.xy, this);
            b.mt(8, 7);
            this.blink = new Oc;
            this.blink.ma(C.ti);
            this.blink.la = n.Tb | n.rb;
            this.blink.visible = l;
            this.blink.Pg(0, 0.05, x.da.Va, 4, [62, 63, 63, 63]);
            this.blink.ft(oa.Tp, this.blink, 0, 0, 2, 0);
            this.jm = 3;
            this.blink.sa();
            b.N(this.blink);
            this.support = M.create(C.vi, I.pA[id.Ld]);
            this.support.sa();
            this.support.anchor = n.M;
            b = a.y;
            this.target.x = this.support.x = a.x * this.H + this.sb;
            this.target.y = this.support.y = b * this.H + this.jb;
            this.Qm = N.gb(5, 20)
        },
        xy: function (a, b, c) {
            if (c === 1) {
                this.jm--;
                if (this.jm === 0) {
                    this.blink.visible = i;
                    this.blink.P(0);
                    this.jm = 3
                }
                this.Qm--;
                if (this.Qm === 0) {
                    N.gb(0,
                    1) === 1 ? this.target.P(1) : this.target.P(2);
                    this.Qm = N.gb(5, 20)
                }
            }
        },
        Cy: function (a) {
            a.element.$y = i
        },
        update: function (a) {
            function b(b) {
                b.im(new o(-b.$b.x / ka, -b.$b.y / ka + ga), a)
            }
            function c(a, b) {
                return A.cf(a.Da.x, a.Da.y, a.Ka.x, a.Ka.y, b.a.x - E, b.a.y - E, W, W) || A.cf(a.ua.x, a.ua.y, a.va.x, a.va.y, b.a.x - E, b.a.y - E, W, W)
            }
            var d, e;
            d = 0;
            for (e = this.be.length; d < e; d++) this.be[d].update(a);
            this.h(a);
            this.gc.update(a);
            this.pe && this.pe.update(a);
            for (d = 0; d < t.oc; d++) for (var g = this.fj[d], h = g.length, f = 0; f < h;) {
                var k = g[f];
                e = Pc.nd(k.color.u,
                0, 10, a);
                k.color.u = e.value;
                if (e.pd) {
                    g.splice(f, 1);
                    h--
                } else f++
            }
            d = 0;
            for (e = this.Fd.length; d < e; d++) this.Fd[d].update(a);
            this.Rj = Pc.ef(this.Rj, 0, 1, a);
            d = L.xb;
            g = L.bb;
            h = this.I != 2 ? this.ca : this.J;
            e = h.a.y - g / 2;
            d = N.Rf(h.a.x - d / 2, 0, this.md - d);
            g = N.Rf(e, 0, this.ld - g);
            this.R.moveTo(d, g, l);
            this.$w && this.R.type === wd.$c.ki || this.R.update(a);
            if (this.R.type === wd.$c.Ff) {
                e = L.Fk;
                var h = L.nl,
                    f = L.ol,
                    k = L.el,
                    p = L.fl,
                    q = this.R.a.Ia(new o(d, g));
                if (q < e) this.he = l;
                if (this.Er) {
                    if (this.R.speed < L.rk) this.R.speed = this.R.speed * 1.5
                } else if (q > this.Vr / 2) {
                    this.R.speed = this.R.speed + a * h;
                    this.R.speed = Math.min(k, this.R.speed)
                } else {
                    this.R.speed = this.R.speed - a * f;
                    this.R.speed = Math.max(p, this.R.speed)
                }
                if (Math.abs(this.R.a.x - d) < 1 && Math.abs(this.R.a.y - g) < 1) {
                    this.R.type = wd.$c.ki;
                    this.R.speed = L.hi
                }
            } else this.time = this.time + a;
            g = this.Ea.length;
            if (g > 0) {
                k = f = e = l;
                for (d = 0; d < g; d++) {
                    var r = this.Ea[d];
                    r.update(a);
                    h = r.na;
                    if (r.Qa && h) {
                        h.Ya.a.x = r.x;
                        h.Ya.a.y = r.y;
                        h.Ya.Pc.$(h.Ya.a)
                    }
                    if (h) {
                        if (h.Eb !== t.d && h.Zd === 0) {
                            r.wr();
                            continue
                        }
                        h.update(a * this.pa);
                        if (r.Mc) {
                            (this.R.type != wd.$c.Ff || !this.he) && r.KA(a);
                            if (r.sf === t.d) {
                                this.kA(r);
                                break
                            }
                        }
                    }
                    if (r.r !== t.d && !r.na) {
                        var s = L.Vl,
                            p = function (a) {
                                if ((new o(r.x, r.y)).Ia(a.a) <= r.r + s) {
                                    a = new hd(j, r.x, r.y, a, a.a.x, a.a.y, r.r + s);
                                    a.Ya.Pc.$(a.Ya.a);
                                    r.kh = i;
                                    r.ot(a);
                                    U.G(C.Fl);
                                    r.Qa && U.G(C.Ii)
                                }
                            };
                        if (this.I !== 2) {
                            this.Nb || p(this.ca);
                            !this.Ob && r.na == j && p(this.ra)
                        } else p(this.J)
                    }
                    if (h) {
                        var q = h.Ya,
                            p = h.wa[h.wa.length - 1],
                            q = o.$a(q.a, p.a),
                            z = l;
                        e || (this.I !== 2 ? p === this.ca && !this.Nb && !f ? z = i : p === this.ra && (!this.Ob && !k) && (z = i) : !this.ub && !e && (z = i));
                        if (h.Dn !== 0 && h.Eb === t.d && z) {
                            q = va.tg(q.gg());
                            if (this.I !== 2) {
                                z = p === this.ca ? this.Fa : this.Ga;
                                if (!h.Vg) h.je = z.rotation - q;
                                if (p === this.ca) {
                                    this.uh = q + h.je - z.rotation;
                                    f = i
                                } else {
                                    this.vh = q + h.je - z.rotation;
                                    k = i
                                }
                                z.rotation = q + h.je
                            } else {
                                if (!h.Vg) h.je = this.Bb.rotation - q;
                                this.th = q + h.je - this.Bb.rotation;
                                this.Bb.rotation = q + h.je;
                                e = i
                            }
                            h.Vg = i
                        } else h.Vg = l
                    }
                }
                if (this.I !== 2) {
                    if (!f && !this.Nb) {
                        this.Fa.rotation = this.Fa.rotation + Math.min(5, this.uh);
                        this.uh = this.uh * 0.98
                    }
                    if (!k && !this.Ob) {
                        this.Ga.rotation = this.Ga.rotation + Math.min(5, this.vh);
                        this.vh = this.vh * 0.98
                    }
                } else if (!e && !this.ub) {
                    this.Bb.rotation = this.Bb.rotation + Math.min(5, this.th);
                    this.th = this.th * 0.98
                }
            }
            if (!this.ub) {
                this.S.update(a);
                this.J.update(a * this.pa)
            }
            if (this.I !== 2) {
                d = a * this.pa;
                this.Fa.update(a);
                this.ca.update(d);
                this.Ga.update(a);
                this.ra.update(d);
                if (this.I === 1) for (d = 0; d < hd.pu; d++) {
                    this.ca.Vj();
                    this.ra.Vj()
                }
                if (this.ne > 0) {
                    e = Pc.nd(this.ne, 0, 200, a);
                    this.ne = e.value;
                    if (e.pd) {
                        U.G(C.wl);
                        this.I = 2;
                        this.ub = l;
                        this.Ob = this.Nb = i;
                        if (this.fc || this.rc) {
                            this.qc = this.fc ? this.fc : this.rc;
                            this.ec.visible = i
                        }
                        this.vh = this.uh = this.th = 0;
                        this.J.a.x = this.ca.a.x;
                        this.J.a.y = this.ca.a.y;
                        this.S.x = this.J.a.x;
                        this.S.y = this.J.a.y;
                        this.S.Sg();
                        d = o.$a(this.ca.a, this.ca.ia);
                        e = o.$a(this.ra.a, this.ra.ia);
                        d = new o((d.x + e.x) / 2, (d.y + e.y) / 2);
                        this.J.ia.$(this.J.a);
                        this.J.ia.$a(d);
                        d = 0;
                        for (e = this.Ea.length; d < e; d++) {
                            r = this.Ea[d];
                            if ((h = r.na) && h.Eb !== h.wa.length - 3 && (h.ib === this.ca || h.ib === this.ra)) {
                                q = h.wa[h.wa.length - 2];
                                f = h.ib.qd(q);
                                this.J.Me(q, f, bd.li);
                                h.ib = this.J;
                                h.wa[h.wa.length - 1] = this.J;
                                h.je = 0;
                                h.Vg = l
                            }
                        }
                        d = new Oc;
                        d.ma(C.Xc);
                        d.sa();
                        d.x = this.S.x;
                        d.y = this.S.y;
                        d.anchor = n.M;
                        q = d.bd(0.05, x.da.Va, 21, 25);
                        d.Lc(q).ab = this.Xa.we();
                        d.P(0);
                        this.Xa.N(d)
                    } else {
                        this.ca.Ti(this.ra, this.ne);
                        this.ra.Ti(this.ca, this.ne)
                    }
                }
                if (!this.Nb && !this.Ob && this.I === 0 && Rc.oh(this.Fa, this.Ga)) {
                    this.I = 1;
                    this.ne = this.ca.a.Ia(this.ra.a);
                    this.ca.Me(this.ra, this.ne, bd.Ei);
                    this.ra.Me(this.ca, this.ne, bd.Ei)
                }
            }
            this.target.update(a);
            if (this.R.type !== wd.$c.Ff || !this.he) {
                d = 0;
                for (e = this.mb.length; d < e; d++) {
                    f = this.mb[d];
                    f.update(a);
                    if (f.timeout > 0 && f.time === 0) {
                        f.Lc(1).ab = this.Xa.we();
                        this.Xa.N(f);
                        this.mb.splice(d, 1);
                        f.Ac.P(1);
                        f.P(1);
                        break
                    } else {
                        h = l;
                        if (h = this.I !== 2 ? Rc.oh(this.Fa, f) && !this.Nb || Rc.oh(this.Ga, f) && !this.Ob : Rc.oh(this.S, f) && !this.ub) {
                            this.Ab.P(1);
                            this.qg++;
                            this.Pm[this.qg - 1].P(0);
                            e = new Oc;
                            e.ma(C.Zk);
                            e.sa();
                            e.x = f.x;
                            e.y = f.y;
                            e.anchor = n.M;
                            h = e.bd(0.05, x.da.Va, 0, 12);
                            e.Lc(h).ab = this.Xa.we();
                            e.P(0);
                            this.Xa.N(e);
                            this.mb.splice(d, 1);
                            U.G(C.Ll + this.qg - 1);
                            this.target.Of === 0 && this.target.P(3);
                            break
                        }
                    }
                }
            }
            d = 0;
            for (e = this.bubbles.length; d < e; d++) {
                h = this.bubbles[d];
                h.update(a);
                f = L.qk;
                k = f * 2;
                if (this.I != 2) {
                    if (!this.Nb && !h.mf && A.pb(this.Fa.x, this.Fa.y, h.x - f, h.y - f, k, k)) {
                        this.fc && this.ig(h.x, h.y);
                        this.fc = h;
                        this.dd.visible = i;
                        U.G(C.Jg);
                        h.mf = i;
                        h.Nj(0);
                        break
                    }
                    if (!this.Ob && !h.mf && A.pb(this.Ga.x, this.Ga.y, h.x - f, h.y - f, k, k)) {
                        this.rc && this.ig(h.x, h.y);
                        this.rc = h;
                        this.ed.visible = i;
                        U.G(C.Jg);
                        h.mf = i;
                        h.Nj(0);
                        break
                    }
                } else if (!this.ub && !h.mf && A.pb(this.S.x, this.S.y, h.x - f, h.y - f, k, k)) {
                    this.qc && this.ig(h.x, h.y);
                    this.qc = h;
                    this.ec.visible = i;
                    U.G(C.Jg);
                    h.mf = i;
                    h.Nj(0);
                    break
                }
                if (!h.jo) {
                    p = this.Sa.length;
                    for (k = 0; k < p; k++) {
                        f = this.Sa[k];
                        if (o.Ia(h.x, h.y, f.x, f.y) < f.Qb) h.jo = i
                    }
                }
            }
            d = 0;
            for (e = this.yf.length; d < e; d++) {
                h = this.yf[d];
                h.update(a)
            }
            d = 0;
            for (e = this.Pd.length; d < e; d++) {
                h = this.Pd[d];
                h.update(a)
            }
            p = -1;
            d = 0;
            for (e = this.Sa.length; d < e; d++) {
                f = this.Sa[d];
                for (k = 0; k < g; k++) {
                    r = this.Ea[k];
                    h = f.Hc.indexOf(r);
                    q = o.Ia(r.x, r.y, f.x, f.y);
                    q <= f.Qb + 5 * this.H ? h < 0 && f.Hc.push(r) : h >= 0 && f.Hc.splice(r, 1)
                }
                z = this.bubbles.length;
                for (k = 0; k < z; k++) {
                    var h = this.bubbles[k],
                        q = o.Ia(h.x, h.y, f.x, f.y),
                        D = f.Hc.indexOf(h);
                    q <= f.Qb + 10 * this.H ? D < 0 && f.Hc.push(h) : D >= 0 && f.Hc.splice(h, 1)
                }
                f.$y && (p = d);
                f.update(a)
            }
            p >= 0 && this.Sa.splice(p, 1);
            d = 0;
            for (e = this.bt.length; d < e; d++) {
                g = this.bt[d];
                g.update(a)
            }
            d = 0;
            for (e = this.og.length; d < e; d++) {
                f = this.og[d];
                f.update(a);
                g = Pc.nd(f.jj, 0, 1, a);
                f.jj = g.value;
                if (g.pd) f.state = od.U.IDLE;
                h = f.rotation;
                f.rotation = 0;
                f.Sb();
                g = this.J.Hb.copy();
                g.rotate(va.hc(-h));
                f.rotation = h;
                f.Sb();
                h = this.J.a.x - L.Lg;
                k = this.J.a.y - L.Lg;
                q = p = L.Lg * 2;
                if (g.y >= 0 && (A.cf(f.Da.x, f.Da.y, f.Ka.x, f.Ka.y, h, k, p, q) || A.cf(f.ua.x, f.ua.y, f.va.x, f.va.y, h, k, p, q))) {
                    if (f.state === od.U.IDLE) {
                        for (k = 0; k < e; k++) {
                            d = this.og[k];
                            if (d !== f && d.group === f.group) {
                                f.state = od.U.pv;
                                d.state = od.U.Nv;
                                this.En(l);
                                this.qz = 0.9 * this.J.$b.jd() * L.kl;
                                this.sd = d;
                                f.Mb.P(0);
                                f.Mb.visible = i;
                                U.G(C.Kg);
                                this.gc.Cd(this, this.qA, j, 0.1);
                                break
                            }
                        }
                        break
                    }
                } else if (f.state !== od.U.IDLE && f.jj === 0) f.jj = od.Au
            }
            d = 0;
            for (e = this.ic.length; d < e; d++) {
                h = this.ic[d];
                h.update(a);
                g = Pc.nd(h.ai, 0, 1, a);
                h.ai = g.value;
                g.pd && this.Hy(h, a)
            }
            d = 0;
            for (e = this.Lj.length; d < e; d++) {
                g = this.Lj[d];
                g.update(a);
                this.Eb(g, j, j, l)
            }
            var E = L.Wl,
                W = E * 2;
            d = 0;
            for (e = this.Yb.length; d < e; d++) {
                f = this.Yb[d];
                f.update(a);
                if (!f.dh || f.$i) {
                    g = h = l;
                    if (this.I !== 2)(h = !this.Nb && c(f, this.ca)) ? g = i : h = !this.Ob && c(f, this.ra);
                    else h = !this.ub && c(f, this.J);
                    if (h) {
                        this.I !== 2 ? g ? this.fc && this.Ih(i) : this.rc && this.Ih(l) : this.qc && this.Ih(l);
                        d = Xa.Hd(C.Xc);
                        h = new Zc(5, d);
                        if (this.Na && !this.Wf) {
                            h.Id.y = -500;
                            h.b = 90
                        }
                        h.ab = this.Xa.Es();
                        if (this.I != 2) if (g) {
                            h.x = this.Fa.x;
                            h.y = this.Fa.y;
                            this.Nb = i
                        } else {
                            h.x = this.Ga.x;
                            h.y = this.Ga.y;
                            this.Ob = i
                        } else {
                            h.x = this.S.x;
                            h.y = this.S.y;
                            this.ub = i
                        }
                        h.Bt(5);
                        this.Xa.N(h);
                        U.G(C.vl);
                        this.En(g);
                        this.Nd !== 0 && this.gc.Cd(this, this.Fm, j, 0.3);
                        return
                    }
                }
            }
            var ha = L.nk,
                Q = ha * 2,
                c = function (a, b) {
                    return A.cf(a.Da.x, a.Da.y, a.Ka.x, a.Ka.y, b.a.x - ha, b.a.y - ha, Q, Q) || A.cf(a.ua.x, a.ua.y, a.va.x, a.va.y, b.a.x - ha, b.a.y - ha, Q, Q)
                };
            d = 0;
            for (e = this.Rg.length; d < e; d++) {
                f = this.Rg[d];
                f.update(a);
                g = h = l;
                if (this.I !== 2)(h = !this.Nb && c(f, this.ca)) ? g = i : h = !this.Ob && c(f, this.ra);
                else h = !this.ub && c(f, this.J);
                h ? this.I !== 2 ? g ? this.Lm(f, this.ca, a) : this.Lm(f, this.ra, a) : this.Lm(f, this.J, a) : f.xt = l
            }
            var ga = L.so * (this.Na && !this.Wf ? -1 : 1),
                ka = L.ro;
            if (this.I === 0) {
                this.fc && b(this.ca);
                this.rc && b(this.ra)
            }
            if (this.I === 1) {
                if (this.fc || this.rc) {
                    b(this.ca);
                    b(this.ra)
                }
            } else this.qc && b(this.J);
            if (!this.ub) {
                g = L.gl;
                if (this.cn) {
                    if (this.zh > 0) {
                        this.zh = Pc.ef(this.zh, 0, 1, a);
                        if (this.zh <= 0) {
                            d = new o(this.target.x, this.target.y);
                            if (this.J.a.Ia(d) > g) {
                                this.cn = l;
                                this.target.P(8);
                                U.G(C.zl);
                                this.AA++
                            } else this.zh = 1
                        }
                    }
                } else {
                    d = new o(this.target.x, this.target.y);
                    if (this.J.a.Ia(d) < g) {
                        this.cn = i;
                        this.target.P(7);
                        U.G(C.Al);
                        this.zh = 1
                    }
                }
                if (this.Nd !== 0 && Rc.oh(this.S, this.target)) {
                    this.bx();
                    return
                }
            }
            d = this.I === 2 && this.xn(this.J) && !this.ub;
            g = this.I !== 2 && this.xn(this.ca) && !this.Nb;
            e = this.I !== 2 && this.xn(this.ra) && !this.Ob;
            if (d || g || e) {
                if (d) this.ub = i;
                if (g) this.Nb = i;
                if (e) this.Ob = i;
                if (this.Nd !== 0) {
                    if (this.I != 2 && this.Nb && this.Ob) return;
                    this.Fm();
                    return
                }
            }
            if (this.fa !== 0 && this.fa === 1 && !this.ub && this.qc != j && this.S.y < L.uk && this.S.x > L.tk) {
                d = this.fa = 0;
                for (e = this.yf.length; d < e; d++) {
                    h = this.yf[d];
                    h.fa === 1 && h.P(0)
                }
                d = 0;
                for (e = this.Pd.length; d < e; d++) {
                    h = this.Pd[d];
                    h.fa === 1 && h.P(0)
                }
            }
            if (this.pm && !this.he) {
                this.$s();
                d = new o(0, 0);
                g = o.add(this.ck, this.R.a);
                if (h = (d = this.Mr(d, g.x, g.y)) ? d.na : j) {
                    k = l;
                    if (this.Na && this.Na.fb(this.Na.Xm() ? 1 : 0).$e(g.x, g.y, i)) k = i;
                    if (this.qc || this.I != 2 && (this.fc || this.rc)) {
                        d = 0;
                        for (e = this.bubbles.length; d < e; d++) {
                            f = this.bubbles[d];
                            f = L.pk;
                            p = f * 2;
                            if (this.qc && A.pb(g.x, g.y, this.J.a.x - f, this.J.a.y - f, p, p)) {
                                k = i;
                                break
                            }
                            if (this.fc && A.pb(g.x, g.y, this.ca.a.x - f, this.ca.a.y - f, p, p)) {
                                k = i;
                                break
                            }
                            if (this.rc && A.pb(g.x, g.y, this.ra.a.x - f, this.ra.a.y - f, p, p)) {
                                k = i;
                                break
                            }
                        }
                    }
                    d = 0;
                    for (e = this.Yb.length; d < e; d++) {
                        f = this.Yb[d];
                        f.Xb && f.Xb.$e(g.x, g.y, i) && (k = i)
                    }
                    d = 0;
                    for (e = this.ic.length; d < e; d++) if (this.ic[d].wn(g.x, g.y)) {
                        k = i;
                        break
                    }
                    d = 0;
                    for (e = this.Sa.length; d < e; d++) {
                        f = this.Sa[d];
                        if (f.Bc.visible || f.Cc.visible) {
                            k = i;
                            break
                        }
                        if (o.Ia(g.x, g.y, f.kd.x, f.kd.y) <= L.Ud || o.Ia(g.x, g.y, f.kd.x, f.kd.y) <= L.Ud) {
                            k = i;
                            break
                        }
                    }
                    d = 0;
                    for (e = this.Ea.length; d < e; d++) {
                        r = this.Ea[d];
                        if (r.q && A.pb(g.x, g.y, r.x - L.Wc, r.y - L.Wc, L.Wc * 2, L.Wc * 2)) {
                            k = i;
                            break
                        }
                        if (r.t > 0 && (A.pb(g.x, g.y, r.x - L.Fe, r.y - L.Fe, L.Fe * 2, L.Fe * 2) || r.ff !== t.d)) {
                            k = i;
                            break
                        }
                    }
                    if (!k) h.lh = i
                }
            }
            e = Pc.nd(this.Ue, 0, 1,
            a);
            this.Ue = e.value;
            if (e.pd) if (this.Nd === 0) {
                this.Nd = 1;
                this.hide();
                this.show();
                this.Ue = t.xk
            } else this.Nd = t.d
        },
        qA: function () {
            if (this.sd) {
                this.sd.Mb.P(0);
                this.sd.Mb.visible = i;
                var a = new o(0, L.Ql);
                a.rotate(va.hc(this.sd.rotation));
                this.J.a.x = this.sd.x;
                this.J.a.y = this.sd.y;
                this.J.a.add(a);
                this.J.ia.$(this.J.a);
                this.J.$b.x = 0;
                this.J.$b.y = -1;
                this.J.$b.rotate(va.hc(this.sd.rotation));
                this.J.$b.multiply(this.qz);
                this.J.Hb.$(this.J.$b);
                this.J.Hb.xm(60);
                this.J.ia.$(this.J.a);
                this.J.ia.$a(this.J.Hb);
                this.sd = j
            }
        },
        fw: function () {
            this.Nd = 0;
            this.Ue = t.xk
        },
        Cx: function () {
            return this.Nd === 0
        },
        En: function (a) {
            for (var b = 0, c = this.Ea.length; b < c; b++) {
                var d = this.Ea[b],
                    e = d.na;
                if (e && (e.ib === this.J || e.ib === this.ca && a || e.ib === this.ra && !a)) {
                    e.Eb === t.d ? e.Kn(e.wa.length - 2) : e.Tr = i;
                    d.Mc && d.pg && this.Sn(d)
                }
            }
        },
        sw: function () {
            this.$h = Math.max(0, 30 - this.time) * 100;
            this.$h = this.$h / 10;
            this.$h = this.$h * 10;
            this.lA = 1E3 * this.qg;
            this.Wj = Math.ceil(this.$h + this.lA)
        },
        bx: function () {
            this.gc.om();
            this.target.P(6);
            U.G(C.yl);
            this.qc && this.Ih(l);
            this.ub = i;
            this.S.oe = i;
            this.Bb.Q = this.Bb.Z = 1;
            this.Gc.Q = this.Gc.Z = 1;
            var a = new x;
            a.p(w.Pa(this.S.x, this.S.y, w.W.LINEAR, 0));
            a.p(w.Pa(this.target.x, this.target.y + 10, w.W.LINEAR, 0.1));
            a.p(w.vj(0.71, 0.71, 0));
            a.p(w.vj(0, 0, 0.1));
            a.p(w.ta(m.lb.copy(), 0));
            a.p(w.ta(m.Ib.copy(), 0.1));
            this.S.Lb(a, 0);
            this.S.P(0);
            a.ab = this.Xa.we();
            this.Xa.N(this.S);
            this.sw();
            this.En(l);
            var b = this;
            Qa.tt && this.gc.Cd(this, function () {
                J.Aa(J.v.dl, {
                    mb: b.qg,
                    time: b.time,
                    Wj: b.Wj,
                    Gr: 1 / b.gh.Fc
                })
            }, j, 1);
            this.gc.Cd(this, function () {
                U.Wn(C.Ad)
            }, j, 1.5);
            this.gc.Cd(this,

            function () {
                this.gh.jn.call(this.gh)
            }, j, 1.8)
        },
        Fm: function () {
            this.gc.om();
            this.target.P(5);
            U.G(C.Bl);
            this.gc.Cd(this, function () {
                this.gh.yy.call(this.gh);
                J.Aa(J.v.ev, {
                    time: this.time
                })
            }, j, 1)
        },
        s: function () {
            var a = u.context;
            a.setTransform(1, 0, 0, 1, 0, 0);
            a.clearRect(0, 0, L.xb, L.bb);
            this.yc();
            this.R.hw();
            this.back.eu(this.R.a);
            this.back.s();
            var b, c;
            if (this.ld > L.bb) {
                c = this.sn.g[0].y;
                b = this.sn.c[0];
                a.drawImage(this.sn.Nc, b.x, b.y + 2, b.B, b.L - 4, 0, c + 2, b.B, b.L - 4)
            }
            a = 0;
            for (b = this.be.length; a < b; a++) this.be[a].s();
            a = 0;
            for (b = this.Fd.length; a < b; a++) this.Fd[a].s();
            this.pe && this.pe.s();
            this.Na && this.Na.s();
            this.support.s();
            this.target.s();
            a = 0;
            for (b = this.yf.length; a < b; a++) this.yf[a].s();
            a = 0;
            for (b = this.Pd.length; a < b; a++) {
                c = this.Pd[a];
                c.fa !== 2 && c.s()
            }
            a = 0;
            for (b = this.Lj.length; a < b; a++) this.Lj[a].s();
            a = 0;
            for (b = this.Sa.length; a < b; a++) this.Sa[a].s();
            a = 0;
            for (b = this.bubbles.length; a < b; a++) this.bubbles[a].s();
            a = 0;
            for (b = this.ic.length; a < b; a++) this.ic[a].s();
            a = 0;
            for (b = this.Yb.length; a < b; a++) this.Yb[a].s();
            a = 0;
            for (b = this.Rg.length; a < b; a++) this.Rg[a].s();
            a = 0;
            for (b = this.og.length; a < b; a++) {
                c = this.og[a];
                c.y = c.y - 25;
                c.s();
                c.y = c.y + 25
            }
            c = this.Ea;
            a = 0;
            for (b = c.length; a < b; a++) c[a].Jw();
            for (a = 0; a < b; a++) c[a].s();
            a = 0;
            for (b = this.mb.length; a < b; a++) this.mb[a].s();
            if (!this.ub && !this.sd) {
                this.S.x = this.J.a.x;
                this.S.y = this.J.a.y;
                this.S.s();
                this.Ab.Db != j && this.Ab.s()
            }
            if (this.I !== 2) {
                if (!this.Nb) {
                    this.Fa.x = this.ca.a.x;
                    this.Fa.y = this.ca.a.y;
                    this.Fa.s()
                }
                if (!this.Ob) {
                    this.Ga.x = this.ra.a.x;
                    this.Ga.y = this.ra.a.y;
                    this.Ga.s()
                }
            }
            a = 0;
            for (b = c.length; a < b; a++) {
                var d = c[a];
                d.Mc && d.Nw()
            }
            this.Xa.s();
            this.Lw();
            this.R.tw();
            this.rg.s();
            a = 0;
            for (b = this.Pd.length; a < b; a++) {
                c = this.Pd[a];
                c.fa === 2 && c.s()
            }
            this.xc()
        },
        Lw: function () {
            for (var a = L.wk, b = 0; b < t.oc; b++) {
                var c = this.fj[b],
                    d = c.length;
                if (d > 0) {
                    for (var e = 1, g = j, h = [], f = 0, k = 0; k < d; k++) {
                        g = c[k];
                        if (k === 0) h[f++] = g.start;
                        h[f++] = g.end
                    }
                    k = j;
                    d = d * 2;
                    c = [];
                    g = 1 / d;
                    for (f = 0;;) {
                        f > 1 && (f = 1);
                        k = o.kr(h, f);
                        c.push(k);
                        if (f === 1) break;
                        f = f + g
                    }
                    h = a / d;
                    g = [];
                    k = 0;
                    for (f = d - 1; k < f; k++) {
                        var p = e,
                            q = k === d - 1 ? 1 : e + h,
                            r = c[k],
                            s = c[k + 1],
                            z = o.$a(s, r);
                        z.normalize();
                        var D = o.Wy(z),
                            z = o.Gs(z),
                            E = o.add(r, o.multiply(D, p)),
                            p = o.add(r, o.multiply(z, p));
                        g.push(p);
                        g.push(E);
                        D = o.add(s, o.multiply(D, q));
                        q = o.add(s, o.multiply(z, q));
                        g.push(q);
                        g.push(D);
                        e = e + h
                    }
                    u.Vw(g, m.Xn.Rl)
                }
            }
        },
        Nm: function (a, b, c, d) {
            var e = L.Fi;
            if (c.Yy(a.x - e, a.y - e, a.x + e, a.y + e)) {
                var g = new o(0, 0),
                    h = new o(0, 0),
                    f = new o(c.x, c.y);
                g.x = a.x - a.Y.B / 2;
                h.x = a.x + a.Y.B / 2;
                g.y = h.y = a.y;
                a.b != 0 && f.ja(-a.b, a.x, a.y);
                if (f.y < g.y && A.Mh(f.x - c.Y.B / 2, f.y - c.Y.L / 2, f.x + c.Y.B / 2, f.y + c.Y.L / 2, g.x, g.y - e, h.x, h.y)) {
                    c = new o(0, -(e * 2 * (e - (g.y - f.y)) / e));
                    c.rotate(a.b);
                    b.im(c,
                    d)
                }
            }
        },
        Lm: function (a, b, c) {
            if (!a.xt) {
                var d = o.$a(b.ia, b.a),
                    e = b.ia.copy();
                e.ja(-a.b, a.x, a.y);
                e = e.y < a.y ? -1 : 1;
                d = Math.max(d.jd() * 40, L.ou) * e;
                e = o.Gs(o.Ww(a.b));
                e.multiply(d);
                b.a.ja(-a.b, a.x, a.y);
                b.ia.ja(-a.b, a.x, a.y);
                b.ia.y = b.a.y;
                b.a.ja(a.b, a.x, a.y);
                b.ia.ja(a.b, a.x, a.y);
                b.im(e, c);
                a.P(0);
                U.G(C.tl)
            }
        },
        Hy: function (a, b) {
            a.P(0);
            U.G(N.gb(C.Cl, C.Dl));
            var c = Xa.Hd(C.Ai),
                c = new nd(5, c, va.tg(a.b) - 90);
            c.ab = this.Xa.Es();
            var d = new o(a.x + L.ql, a.y);
            d.ja(a.b - Math.PI / 2, a.x, a.y);
            c.x = d.x;
            c.y = d.y;
            c.Bt(5);
            this.Xa.N(c);
            this.ub || this.Nm(a,
            this.J, this.S, b);
            if (this.I !== 2) {
                this.Nb || this.Nm(a, this.ca, this.Fa, b);
                this.Ob || this.Nm(a, this.ra, this.Ga, b)
            }
        },
        Eb: function (a, b, c, d) {
            for (var e = 0, g = 0, h = this.Ea.length; g < h; g++) {
                var f = this.Ea[g],
                    k = f.na;
                if (k && k.Eb === t.d) for (var p = L.Wc, q = p * 2, r = 0, s = k.wa.length - 1; r < s; r++) {
                    var z = k.wa[r],
                        D = k.wa[r + 1],
                        E = l;
                    a ? z.ia.x !== t.He && (E = A.Mh(N.js(z.a.x, z.ia.x, D.a.x, D.ia.x), N.js(z.a.y, z.ia.y, D.a.y, D.ia.y), N.gs(z.a.x, z.ia.x, D.a.x, D.ia.x), N.gs(z.a.y, z.ia.y, D.a.y, D.ia.y), a.aa, a.ba, a.aa + a.width, a.ba + a.height)) : E = f.q && A.cf(b.x,
                    b.y, c.x, c.y, f.x - p, f.y - p, q, q) ? l : N.Ix(b.x, b.y, c.x, c.y, z.a.x, z.a.y, D.a.x, D.a.y);
                    if (E) {
                        e++;
                        f.Mc && f.pg && this.Sn(f);
                        U.G(C.El + k.Dn);
                        k.Kn(r);
                        if (d) {
                            k.Zd = 0;
                            k.Ws(r)
                        }
                        return e
                    }
                }
            }
            return e
        },
        Sn: function (a) {
            U.G(C.Jl);
            a.Mc = l;
            var b = M.create(C.Fg, 11);
            b.sa();
            var c = new x;
            if (this.Na && !this.Wf) {
                c.p(w.Pa(a.e.x, a.e.y, w.W.Jb, 0));
                c.p(w.Pa(a.e.x, a.e.y + 50, w.W.Jb, 0.3));
                c.p(w.Pa(a.e.x, a.e.y - L.bb, w.W.zd, 1))
            } else {
                c.p(w.Pa(a.e.x, a.e.y, w.W.Jb, 0));
                c.p(w.Pa(a.e.x, a.e.y - 50, w.W.Jb, 0.3));
                c.p(w.Pa(a.e.x, a.e.y + L.bb, w.W.zd, 1))
            }
            c.p(w.me(0, 0,
            0));
            c.p(w.me(N.gb(-120, 120), 0, 1));
            b.Lb(c, 0);
            b.P(0);
            b.x = a.e.x;
            b.y = a.e.y;
            b.anchor = n.M;
            c.ab = this.Xa.we();
            this.Xa.N(b)
        },
        kA: function (a) {
            U.G(C.Kl);
            for (var b = 0, c = this.Ea.length; b < c; b++) {
                var d = this.Ea[b],
                    e = d.na;
                if (e && e.ib === this.J) {
                    if (e.Eb !== t.d) d.wr();
                    else {
                        e.Kn(e.wa.length - 2);
                        e.Tf = l
                    }
                    d.Mc && (d.pg && a !== d) && this.Sn(d)
                }
            }
            a.Mc = l;
            this.ub = this.jA = i;
            b = M.create(C.Fg, 12);
            b.sa();
            this.S.anchor = this.S.la = n.M;
            this.S.x = 0;
            this.S.y = -5;
            b.N(this.S);
            c = new x;
            if (this.Na && !this.Wf) {
                c.p(w.Pa(a.e.x, a.e.y - 10, w.W.Jb, 0));
                c.p(w.Pa(a.e.x,
                a.e.y + 70, w.W.Jb, 0.3));
                c.p(w.Pa(a.e.x, a.e.y - L.bb, w.W.zd, 1))
            } else {
                c.p(w.Pa(a.e.x, a.e.y - 10, w.W.Jb, 0));
                c.p(w.Pa(a.e.x, a.e.y - 70, w.W.Jb, 0.3));
                c.p(w.Pa(a.e.x, a.e.y + L.bb, w.W.zd, 1))
            }
            b.Lb(c, 0);
            b.P(0);
            b.x = a.e.x;
            b.y = a.e.y - 10;
            b.anchor = n.M;
            c.ab = this.Xa.we();
            this.Xa.N(b);
            this.Nd !== 0 && this.gc.Cd(this, this.Fm, j, 2)
        },
        Ih: function (a) {
            if (this.I !== 2) if (a) {
                this.fc = j;
                this.dd.visible = l;
                this.ig(this.Fa.x, this.Fa.y)
            } else {
                this.rc = j;
                this.ed.visible = l;
                this.ig(this.Ga.x, this.Ga.y)
            } else {
                this.qc = j;
                this.ec.visible = l;
                this.ig(this.S.x,
                this.S.y)
            }
        },
        ig: function (a, b) {
            U.G(C.ul);
            var c = new Oc;
            c.ma(C.Pk);
            c.sa();
            c.x = a;
            c.y = b;
            c.anchor = n.M;
            var d = c.bd(0.05, x.da.Va, 0, 11);
            c.Lc(d).ab = this.Xa.we();
            c.P(0);
            this.Xa.N(c)
        },
        Mm: function (a, b, c) {
            if (A.pb(b + this.R.a.x, c + this.R.a.y, a.a.x - L.ei, a.a.y - L.ei, L.fi, L.fi)) {
                this.Ih(a === this.ca);
                return i
            }
            return l
        },
        $s: function () {
            for (var a = 0, b = this.Ea.length; a < b; a++) {
                var c = this.Ea[a].na;
                if (c && c.Eb === t.d) c.lh = l
            }
        },
        Mr: function (a, b, c) {
            for (var d = L.vk, e = j, g = d, b = new o(b, c), c = 0, h = this.Ea.length; c < h; c++) {
                var f = this.Ea[c],
                    k = f.na;
                if (k) for (var p = 0, q = k.Ve.length; p < q; p++) {
                    var r = k.Ve[p],
                        s = r.Ia(b);
                    if (s < d && s < g) {
                        g = s;
                        e = f;
                        a.$(r)
                    }
                }
            }
            return e
        },
        lx: function (a, b) {
            var c = j,
                d = Number.MAX_VALUE,
                e = a.copy(),
                g = b.na;
            if (!g || g.Eb !== t.d) return j;
            for (var h = L.Wc, f = h * 2, k = 0, p = g.wa.length - 1; k < p; k++) {
                var q = g.wa[k],
                    r = q.a.Ia(e);
                if (r < d && (!b.q || A.pb(q.a.x, q.a.y, b.x - h, b.y - h, f, f))) {
                    d = r;
                    c = g;
                    a.$(q.a)
                }
            }
            return c
        },
        uA: function (a, b, c) {
            if (this.he) {
                if (this.R.type === wd.$c.Ff) this.Er = i;
                return i
            }
            if (c >= t.oc) return i;
            this.Fj = l;
            if (this.Na) {
                var d = this.Na.Xm() ? 1 : 0;
                if (this.Na.fb(d).$e(a + this.R.a.x, b + this.R.a.y, i)) {
                    this.Km = c;
                    return i
                }
            }
            if (this.qc && this.Mm(this.J, a, b) || this.I !== 2 && (this.fc && this.Mm(this.ca, a, b) || this.rc && this.Mm(this.ra, a, b))) return i;
            d = new o(a, b);
            if (!this.Zg[c]) {
                this.Zg[c] = i;
                this.ue[c].$(d);
                this.yn[c].$(d)
            }
            var e, g, h = this.R.a,
                d = a + h.x,
                h = b + h.y;
            e = 0;
            for (g = this.Yb.length; e < g; e++) {
                var f = this.Yb[e];
                if (f.Xb && f.ik === t.d && f.Xb.Cj(d, h)) {
                    f.ik = c;
                    return i
                }
            }
            e = 0;
            for (g = this.ic.length; e < g; e++) {
                f = this.ic[e];
                if (f.wn(d, h)) {
                    f.ai = 0.05;
                    f.touch = c;
                    return i
                }
            }
            var f = j,
                k = l,
                p = l;
            e = 0;
            for (g = this.Sa.length; e < g; e++) {
                var q = this.Sa[e],
                    r = o.Ia(d, h, q.Xf.x, q.Xf.y),
                    s = o.Ia(d, h, q.kd.x, q.kd.y);
                if (r < L.Ud && !q.Sr() || s < L.Ud) {
                    for (e = e + 1; e < g; e++) {
                        var f = this.Sa[e],
                            z = o.Ia(f.x, f.y, q.x, q.y);
                        z + f.Qb <= q.Qb && (k = i);
                        z <= q.Qb + f.Qb && (p = i)
                    }
                    q.xh.x = d;
                    q.xh.y = h;
                    q.Eh = c;
                    r < L.Ud && q.it(i);
                    s < L.Ud && q.jt(i);
                    f = q;
                    break
                }
            }
            g = this.Sa.indexOf(f);
            if (g != this.Sa.length - 1 && p && !k) {
                e = new x;
                e.p(w.ta(m.Ib.copy(), 0));
                e.p(w.ta(m.lb.copy(), 0.2));
                k = new x;
                k.p(w.ta(m.lb.copy(), 0.2));
                k.ab = $.proxy(this.Cy, this);
                p = f.copy();
                p.$q(k);
                p.P(0);
                f.$q(e);
                f.P(0);
                this.Sa[g] = p;
                this.Sa.push(f)
            }
            k = L.Wc;
            p = k * 2;
            q = L.Fe;
            r = q * 2;
            e = 0;
            for (g = this.Ea.length; e < g; e++) {
                f = this.Ea[e];
                if (f.q && A.pb(d, h, f.x - k, f.y - k, p, p)) {
                    f.tx(d, h);
                    f.xg = c
                }
                if (f.t > 0 && A.pb(d, h, f.x - q, f.y - q, r, r)) {
                    f.ff = c;
                    return i
                }
            }
            if (this.pm) {
                c = o.Ra();
                (d = (f = this.Mr(c, d, h)) ? f.na : j) && d.lh && this.lx(c, f) && this.Eb(j, c, c, l)
            }
            if (this.target.Is(a, b)) this.Fj = i;
            return i
        },
        Yg: ia(i),
        xA: function (a, b, c) {
            if (this.he) return i;
            this.Zg[c] = l;
            if (this.Fj && this.target.Is(a, b)) {
                this.Fj = l;
                J.Aa(J.v.Fp)
            } else {
                this.Fj = l;
                var d, e;
                d = this.R.a;
                var g = a + d.x,
                    h = b + d.y;
                d = 0;
                for (e = this.be.length; d < e; d++) {
                    var f = this.be[d];
                    if (f.wn(g, h)) {
                        f.On();
                        this.be.splice(d, 1);
                        break
                    }
                }
                if (this.Na && this.Km === c) {
                    d = this.Na.Xm() ? 1 : 0;
                    if (this.Na.fb(d).$e(a + this.R.a.x, b + this.R.a.y, i)) {
                        this.Na.toggle();
                        this.Gb(Ed.Mo)
                    }
                    this.Km = t.d
                }
                d = 0;
                for (e = this.Yb.length; d < e; d++) {
                    g = this.Yb[d];
                    if (g.Xb && g.ik === c) {
                        g.ik = t.d;
                        if (g.Xb.Dj(a + this.R.a.x, b + this.R.a.y)) return i
                    }
                }
                d = 0;
                for (e = this.Sa.length; d < e; d++) {
                    a = this.Sa[d];
                    if (a.Eh === c) {
                        a.Eh = t.d;
                        a.Rn = t.d;
                        a.it(l);
                        a.jt(l)
                    }
                }
                d = 0;
                for (e = this.Ea.length; d < e; d++) {
                    a = this.Ea[d];
                    if (a.q && a.xg === c) a.xg = t.d;
                    if (a.t > 0 && a.ff === c) a.ff = t.d
                }
                return i
            }
        },
        wA: function (a, b, c) {
            if (this.he || c >= t.oc) return i;
            var d = new o(a, b),
                e, g;
            if (this.ue[c].Ia(d) > 10) {
                e = 0;
                for (g = this.ic.length; e < g; e++) {
                    var h = this.ic[e];
                    if (h.touch === c && h.ai !== 0) h.ai = 0
                }
            }
            this.ck.$(d);
            a = new o(a + this.R.a.x, b + this.R.a.y);
            e = 0;
            for (g = this.Sa.length; e < g; e++) {
                b = this.Sa[e];
                if (b.Eh === c) {
                    c = new o(b.x, b.y);
                    c.Ia(a) < b.Qb / 10 && b.xh.$(a);
                    e = o.$a(b.xh, c);
                    d = o.$a(a, c).gg() - e.gg();
                    d > Math.PI ? d = d - 2 * Math.PI : d < -Math.PI && (d = d + 2 * Math.PI);
                    b.Xf.ja(d, b.x, b.y);
                    b.kd.ja(d, b.x, b.y);
                    b.rotation = b.rotation + va.tg(d);
                    e = d > 0 ? C.Gl : C.Hl;
                    if (Math.abs(d) < 0.07) e = t.d;
                    if (b.Rn != e && e != t.d) {
                        U.G(e);
                        b.Rn = e
                    }
                    e = 0;
                    for (g = this.Ea.length; e < g; e++) {
                        var h = this.Ea[e],
                            f = new o(h.x, h.y);
                        if (f.Ia(c) <= b.Qb + 5 * this.H) {
                            f.ja(d, b.x, b.y);
                            h.x = f.x;
                            h.y = f.y;
                            if (h.na) {
                                h.na.Ya.a.$(f);
                                h.na.Ya.Pc.$(f)
                            }
                        }
                    }
                    e = 0;
                    for (g = this.ic.length; e < g; e++) {
                        h = this.ic[e];
                        f = new o(h.x, h.y);
                        if (f.Ia(c) <= b.Qb + 5 * this.H) {
                            f.ja(d, b.x, b.y);
                            h.x = f.x;
                            h.y = f.y;
                            h.rotation = h.rotation + va.tg(d);
                            h.Sb()
                        }
                    }
                    e = 0;
                    for (g = this.bubbles.length; e < g; e++) {
                        h = this.bubbles[e];
                        f = new o(h.x, h.y);
                        if (f.Ia(c) <= b.Qb + 10 * this.H && h !== this.qc && h !== this.rc && h !== this.fc) {
                            f.ja(d, b.x, b.y);
                            h.x = f.x;
                            h.y = f.y
                        }
                    }
                    if (A.pb(this.target.x, this.target.y, b.x - b.size, b.y - b.size, 2 * b.size, 2 * b.size)) {
                        f = new o(this.target.x, this.target.y);
                        f.ja(d, b.x, b.y);
                        this.target.x = f.x;
                        this.target.y = f.y
                    }
                    b.xh.$(a);
                    return i
                }
            }
            e = 0;
            for (g = this.Ea.length; e < g; e++) if (b = this.Ea[e]) {
                if (b.q && b.xg === c) {
                    b.sx(a);
                    return i
                }
                if (b.t > 0 && b.ff === c) {
                    b.A ? b.y = N.Rf(a.y, b.yj, b.xj) : b.x = N.Rf(a.x, b.yj, b.xj);
                    if (b.na) {
                        e = b.na.Ya;
                        e.a.x = e.Pc.x = b.x;
                        e.a.y = e.Pc.y = b.y
                    }
                    return i
                }
            }
            if (this.Zg[c]) {
                e = new Yd(o.add(this.ue[c], this.R.a), o.add(d, this.R.a));
                a = this.fj[c];
                b = 0;
                a.push(e);
                e = 0;
                for (g = a.length; e < g; e++) {
                    h = a[e];
                    b = b + this.Eb(j, h.start, h.end, l)
                }
                if (b > 0) {
                    this.$w = l;
                    this.In = this.In > 0 && this.Rj > 0 ? this.In + b : b;
                    this.Rj = 0.1
                }
                this.yn[c].$(this.ue[c]);
                this.ue[c].$(d)
            }
            return i
        },
        vA: function (a, b, c) {
            if (c > t.oc) return l;
            this.ck.x = a;
            this.ck.y = b;
            return i
        },
        Gb: function () {
            cd.toggle();
            this.Wf = cd.Wr();
            U.G(this.Wf ? C.Ji : C.Ki);
            for (var a = 0, b = this.Fd.length; a < b; a++) {
                var c = this.Fd[a];
                cd.Wr() ? c.P(Gd.Pi.Hg) : c.P(Gd.Pi.Nq)
            }
        },
        kz: function (a) {
            for (var b = 0, c = this.Yb.length; b < c; b++) this.Yb[b].wf === a && this.Yb[b].mz()
        }
    });
    var ce = wa.extend({
        init: function () {
            this.h();
            this.width = L.xb;
            this.height = L.bb
        }
    }).extend({
        init: function () {
            this.h()
        },
        s: function () {
            for (var a = this.children, b = a.length, c = 0; c < b; c++) {
                var d = a[c];
                d.visible && d.s()
            }
            b = this.fb(ce.Uc.Vc);
            if (b.Ue > 0) {
                a = b.Ue / t.xk;
                b.Cx() && (a = 1 - a);
                b = u.context;
                a = new m(1, 1, 1, a);
                b.fillStyle = a.Rh();
                b.fillRect(0, 0, L.xb, L.bb)
            }
        },
        show: function () {
            this.h();
            var a = this.fb(ce.Uc.Vc);
            a.gw && a.fw()
        }
    });
    ce.Uc = {
        Vc: 0,
        hB: 1,
        kB: 2,
        eB: 3,
        iB: 4,
        lB: 5
    };
    var de = ce,
        ee, fe = Lc.extend({
            init: function (a) {
                this.h(a);
                this.tA = Array(t.oc);
                this.gm = l
            },
            ad: function () {
                this.h();
                U.Hh(C.xl);
                this.yw();
                this.xx();
                this.vt(0)
            },
            yw: function () {
                for (var a = 0; a < t.oc; a++) this.tA[a] = 0;
                var a = new de,
                    b = new Xd;
                b.gh = this;
                b.gw = this.gm;
                this.gm = l;
                a.Vd(b, de.Uc.Vc);
                this.ew(a, 0)
            },
            xx: function () {
                this.Mn(l);
                this.Hx()
            },
            Hx: function () {
                this.Um = l
            },
            xC: function () {
                this.Um = l
            },
            jn: function () {
                U.G(C.Nl);
                this.gd()
            },
            yy: function () {
                this.Pj()
            },
            Mn: function (a) {
                this.Um = a;
                var b = this.Ye(0);
                if (b) if (b = b.fb(de.Uc.Vc)) {
                    b.Zb = !a;
                    b.ci = !a;
                    a ? U.Py() : U.hz()
                }
            },
            hg: function () {
                var a = this.Ye(0);
                if (a) if (a = a.fb(de.Uc.Vc)) {
                    a.Ue = 0;
                    this.Mn(i)
                }
            },
            kg: function () {
                this.Mn(l)
            },
            Pj: function () {
                this.Cw(0);
                this.gm = i;
                this.ad()
            },
            zj: function (a, b) {
                if (this.h(a, b)) return i;
                var c = this.Ye(0);
                if (c) if ((c = c.fb(de.Uc.Vc)) && c.Zb) {
                    c.uA(a, b, 0);
                    return i
                }
                return l
            },
            ks: function (a, b) {
                if (this.h(a, b)) return i;
                var c = this.Ye(0);
                if (c) if ((c = c.fb(de.Uc.Vc)) && c.Zb) {
                    c.vA(a, b, 0);
                    return i
                }
                return l
            },
            ls: function (a, b) {
                if (this.h(a, b)) return i;
                var c = this.Ye(0);
                if (c) if ((c = c.fb(de.Uc.Vc)) && c.Zb) {
                    c.wA(a, b, 0);
                    return i
                }
                return l
            },
            fg: function (a, b) {
                if (this.h(a, b)) return i;
                var c = this.Ye(0);
                if (c) if ((c = c.fb(de.Uc.Vc)) && c.Zb) {
                    c.xA(a, b, 0);
                    return i
                }
                return l
            },
            Yg: function (a, b) {
                if (this.h(a, b)) return i;
                var c = this.Ye(0);
                if (c) if ((c = c.fb(de.Uc.Vc)) && c.Zb) {
                    c.Yg(a, b, 0);
                    return i
                }
                return l
            }
        });
    ee = new(Nc.extend({
        init: function (a) {
            this.h(a)
        },
        Vn: function (a, b) {
            id.Sx(a, b);
            this.Te === Lc.U.Gg && this.ad();
            var c = this.fb(3);
            c && c.ur();
            c = new fe(this);
            this.Vd(c, 3);
            this.Yv(3)
        },
        hg: function () {
            var a = this.fb(3);
            a && a.hg()
        },
        kg: function () {
            var a = this.fb(3);
            a && a.kg()
        },
        Pj: function () {
            var a = this.fb(3);
            a && a.Pj()
        },
        Ft: function () {
            this.tr()
        },
        Dx: function () {
            if (this.Te === Lc.U.Gg) return l;
            var a = this.fb(3);
            return !a || a.Te === Lc.U.Gg || a.Um ? l : i
        },
        ps: function (a) {
            this.h(a);
            a == 3 && this.Bw(3)
        }
    }));
    var ge, he = L,
        ie = ub,
        je = ee;
    ge = new function () {
        function a(a, b, c, d, e, g, h) {
            a.save();
            a.setTransform(1, 0, 0, 1, 0, 0);
            a.clearRect(0, 0, a.canvas.width, a.canvas.height);
            a.restore();
            a.save();
            a.translate(d, e);
            a.scale(b, c);
            a.save();
            a.beginPath();
            a.moveTo(116.1, 38.3);
            a.bezierCurveTo(117.2, 37.9, 118.2, 37.4, 119, 36.8);
            a.lineTo(119.5, 35.6);
            a.lineTo(123.3, 21.1);
            a.bezierCurveTo(124.5, 18.2, 126.8, 14.6, 130.1, 10.3);
            a.bezierCurveTo(129.9, 15.3, 133.6, 18.2, 141.3, 19);
            a.bezierCurveTo(138.9, 19.1, 136.7, 19.9, 134.8, 21.5);
            a.bezierCurveTo(132.4, 23.5, 130.7, 25.2, 129.7,
            26.8);
            a.bezierCurveTo(128.9, 28.3, 127.9, 30.7, 126.7, 33.8);
            a.lineTo(126.4, 36.8);
            a.lineTo(126.7, 37.7);
            a.lineTo(128.6, 38.7);
            a.bezierCurveTo(124.4, 37.5, 120.2, 37.4, 116.1, 38.3);
            a.closePath();
            a.moveTo(241.8, 203.6);
            a.bezierCurveTo(241.6, 202.9, 241.1, 202.2, 240.5, 201.5);
            a.lineTo(214.2, 185.6);
            a.bezierCurveTo(212.8, 190, 210.9, 194.2, 208.4, 198.1);
            a.lineTo(208.3, 198);
            a.lineTo(209.4, 192.8);
            a.lineTo(211, 183.6);
            a.lineTo(211.2, 182.6);
            a.lineTo(212.8, 173.3);
            a.bezierCurveTo(212.3, 176, 211.3, 179, 210, 182.1);
            a.bezierCurveTo(209.9,
            182.4, 209.8, 182.6, 209.7, 182.8);
            a.bezierCurveTo(208.6, 185.2, 207.3, 187.8, 205.8, 190.5);
            a.bezierCurveTo(203.4, 194.6, 200.9, 197.9, 198.1, 200.4);
            a.bezierCurveTo(198.7, 201.8, 199, 203.2, 199.2, 204.7);
            a.bezierCurveTo(199.2, 204.8, 199.2, 204.9, 199.2, 205);
            a.bezierCurveTo(199.5, 207.9, 199.6, 209.6, 199.7, 210.2);
            a.bezierCurveTo(200, 211.2, 200.1, 212, 200.2, 212.5);
            a.lineTo(199.6, 207.8);
            a.bezierCurveTo(201.8, 213.8, 203.3, 218.7, 204, 222.5);
            a.bezierCurveTo(205.3, 222.4, 206.5, 222.4, 207.7, 222.3);
            a.bezierCurveTo(213.4, 222, 218.9, 221.9,
            224.3, 222.1);
            a.bezierCurveTo(227.5, 222.5, 230.1, 222.1, 232.3, 221.1);
            a.bezierCurveTo(232.8, 220.7, 233.4, 220.2, 233.9, 219.6);
            a.bezierCurveTo(235.2, 218.1, 236.5, 216.5, 237.8, 215);
            a.bezierCurveTo(239.1, 213.3, 240.1, 211.5, 240.9, 209.6);
            a.bezierCurveTo(241.8, 207.4, 242.1, 205.4, 241.8, 203.6);
            a.closePath();
            a.moveTo(148.8, 222.8);
            a.bezierCurveTo(139.8, 224.7, 129.5, 225.7, 117.8, 225.9);
            a.bezierCurveTo(109.6, 226, 101.7, 225.5, 94.3, 224.3);
            a.bezierCurveTo(94.3, 224.9, 94.4, 225.6, 94.4, 226.2);
            a.bezierCurveTo(94.4, 228.1, 94.3, 230,
            94, 232);
            a.lineTo(93.8, 233);
            a.bezierCurveTo(103.6, 234.6, 113.4, 235.1, 123.2, 234.4);
            a.bezierCurveTo(132.2, 234.4, 141, 233.2, 149.5, 231);
            a.bezierCurveTo(149.4, 230.6, 149.4, 230.3, 149.4, 230);
            a.bezierCurveTo(149, 227.6, 148.9, 225.2, 148.8, 222.8);
            a.closePath();
            a.moveTo(196.6, 153.6);
            a.lineTo(194.5, 152.6);
            a.bezierCurveTo(194.1, 152.8, 193.8, 153, 193.4, 153.2);
            a.bezierCurveTo(192.6, 153.8, 191.7, 154.5, 191, 155.2);
            a.lineTo(190.2, 155.8);
            a.bezierCurveTo(186.6, 158.8, 183.8, 160.7, 182, 161.5);
            a.bezierCurveTo(182, 162.2, 181.4, 164, 180.2,
            166.7);
            a.bezierCurveTo(183.2, 164.8, 186.2, 162.7, 189.3, 160.6);
            a.bezierCurveTo(192.6, 158.2, 195.6, 155.9, 198.4, 153.8);
            a.bezierCurveTo(197.6, 153.8, 197, 153.7, 196.6, 153.6);
            a.closePath();
            a.moveTo(121.1, 189);
            a.bezierCurveTo(128, 188.9, 134.8, 188, 141.7, 186);
            a.bezierCurveTo(141.3, 185.9, 141, 185.7, 140.7, 185.6);
            a.bezierCurveTo(136.2, 183.2, 133, 181.8, 131.3, 181.4);
            a.bezierCurveTo(128.8, 181.8, 125.7, 181.8, 121.9, 181.4);
            a.bezierCurveTo(118.1, 181, 114, 180.5, 109.4, 179.7);
            a.lineTo(109.3, 179.7);
            a.bezierCurveTo(108.3, 180.9, 106.5,
            182.5, 103.8, 184.6);
            a.bezierCurveTo(103.6, 184.7, 103.4, 184.9, 103.2, 185);
            a.lineTo(102.1, 185.9);
            a.lineTo(102.9, 186.1);
            a.bezierCurveTo(110.1, 188.1, 116.2, 189, 121.1, 189);
            a.closePath();
            a.moveTo(63.1, 164.7);
            a.lineTo(50.7, 157.9);
            a.lineTo(45.8, 159.6);
            a.lineTo(46.2, 159.9);
            a.bezierCurveTo(46.3, 160, 46.4, 160.1, 46.5, 160.2);
            a.bezierCurveTo(52, 164, 57.9, 167.5, 64.4, 170.9);
            a.lineTo(65.5, 171.5);
            a.lineTo(65.2, 170.7);
            a.bezierCurveTo(64, 168, 63.4, 166, 63.1, 164.7);
            a.closePath();
            a.moveTo(36.5, 191.7);
            a.bezierCurveTo(35.2, 189.5,
            34, 187.3, 33, 185);
            a.lineTo(33.1, 185.9);
            a.lineTo(34, 192.4);
            a.lineTo(31.3, 189.4);
            a.bezierCurveTo(30.8, 188, 27.8, 189.3, 22.4, 193.3);
            a.bezierCurveTo(16.9, 197.2, 13.7, 199.6, 12.7, 200.6);
            a.bezierCurveTo(11.6, 201.6, 10.2, 202.9, 8.4, 204.6);
            a.bezierCurveTo(6.7, 206.1, 5.4, 207.3, 4.5, 208.2);
            a.bezierCurveTo(3.6, 209, 3.2, 210.1, 3.3, 211.5);
            a.bezierCurveTo(3.5, 212.9, 4, 214.8, 4.8, 217.3);
            a.bezierCurveTo(5.6, 219.7, 6.5, 221.8, 7.4, 223.5);
            a.bezierCurveTo(8.3, 225.2, 9.8, 226.4, 11.9, 227.1);
            a.bezierCurveTo(13.9, 227.7, 15.9, 227.9, 17.8, 227.7);
            a.bezierCurveTo(19.7, 227.5, 21.3, 227.4, 22.6, 227.4);
            a.bezierCurveTo(24.5, 227.3, 26.4, 227.2, 28.4, 227.2);
            a.bezierCurveTo(30.2, 227.2, 32, 227.2, 33.8, 227.2);
            a.bezierCurveTo(35.8, 227.2, 37.7, 227.2, 39.7, 227.2);
            a.bezierCurveTo(41.2, 227.3, 42.9, 227.4, 44.5, 227.6);
            a.bezierCurveTo(44.5, 225.9, 44.5, 223.5, 44.6, 220.3);
            a.lineTo(44.6, 213.4);
            a.lineTo(44.7, 207.6);
            a.lineTo(45.1, 204.8);
            a.lineTo(45.4, 203);
            a.bezierCurveTo(45.4, 202.9, 45.4, 202.8, 45.5, 202.6);
            a.bezierCurveTo(43.8, 201.2, 42.3, 199.7, 40.9, 198.1);
            a.bezierCurveTo(39.3,
            196, 37.9, 193.8, 36.5, 191.7);
            a.closePath();
            a.fillStyle = "rgb(100, 150, 40)";
            a.fill();
            a.beginPath();
            a.moveTo(212.6, 151.5);
            a.bezierCurveTo(213.3, 158.8, 213.4, 166.1, 212.8, 173.3);
            a.bezierCurveTo(212.3, 176, 211.3, 179, 210, 182.2);
            a.bezierCurveTo(209.9, 182.4, 209.8, 182.6, 209.7, 182.8);
            a.bezierCurveTo(208.6, 185.3, 207.3, 187.8, 205.8, 190.5);
            a.bezierCurveTo(203.4, 194.7, 200.9, 198, 198.1, 200.5);
            a.bezierCurveTo(198.7, 201.8, 199, 203.3, 199.2, 204.7);
            a.bezierCurveTo(199.2, 204.8, 199.2, 204.9, 199.2, 205.1);
            a.bezierCurveTo(199.5,
            207.9, 199.6, 209.7, 199.7, 210.2);
            a.bezierCurveTo(199.9, 214.2, 200, 218.2, 199.9, 222.4);
            a.bezierCurveTo(199.9, 222.5, 199.9, 222.7, 199.9, 222.9);
            a.bezierCurveTo(199.9, 225, 199.7, 227, 199.4, 228.8);
            a.bezierCurveTo(199.1, 230.5, 198.7, 232, 198.3, 233.5);
            a.lineTo(196.7, 235.2);
            a.bezierCurveTo(196.6, 235.3, 196.5, 235.4, 196.3, 235.5);
            a.bezierCurveTo(195.2, 236.4, 193.3, 237.6, 190.7, 239.2);
            a.bezierCurveTo(188.1, 240.8, 184.5, 241.7, 179.9, 242.1);
            a.bezierCurveTo(175.3, 242.4, 172, 242.5, 169.8, 242.3);
            a.bezierCurveTo(167.8, 242.2, 165.5,
            241.7, 162.9, 240.8);
            a.bezierCurveTo(160.4, 240, 158, 238, 155.6, 234.8);
            a.bezierCurveTo(155.4, 234.6, 155.3, 234.4, 155.1, 234.2);
            a.bezierCurveTo(154.3, 233, 153.5, 231.6, 152.8, 230.1);
            a.bezierCurveTo(151.9, 227.9, 151.2, 225.3, 150.7, 222.4);
            a.bezierCurveTo(150.7, 222.2, 150.6, 222.1, 150.6, 221.9);
            a.bezierCurveTo(149.7, 216.4, 149.3, 213.1, 149.2, 212);
            a.bezierCurveTo(148.8, 215.6, 148.6, 219.2, 148.8, 222.8);
            a.bezierCurveTo(139.8, 224.7, 129.5, 225.7, 117.8, 225.9);
            a.bezierCurveTo(109.6, 226, 101.7, 225.5, 94.3, 224.3);
            a.bezierCurveTo(94.2,
            220.8, 94, 217.1, 93.8, 213.5);
            a.bezierCurveTo(93.8, 214.9, 93.7, 216, 93.6, 216.6);
            a.bezierCurveTo(93.5, 217.2, 93.5, 217.7, 93.4, 218.1);
            a.bezierCurveTo(93.4, 218.5, 93.2, 219.4, 92.8, 220.9);
            a.bezierCurveTo(92.6, 222, 92.3, 223, 92, 224);
            a.bezierCurveTo(91.9, 224.3, 91.8, 224.6, 91.7, 224.8);
            a.bezierCurveTo(91.3, 226, 90.8, 227.2, 90.2, 228.3);
            a.bezierCurveTo(89.9, 229, 89.5, 229.7, 89.2, 230.4);
            a.bezierCurveTo(88.8, 230.9, 88.4, 231.4, 88, 231.9);
            a.bezierCurveTo(87.5, 232.6, 86.9, 233.2, 86.2, 233.7);
            a.bezierCurveTo(85.8, 234.1, 85.4, 234.5, 84.9,
            234.9);
            a.bezierCurveTo(83.9, 235.6, 82.8, 236.2, 81.6, 236.7);
            a.bezierCurveTo(80.2, 237.3, 78.7, 237.8, 77.1, 238.2);
            a.bezierCurveTo(74.1, 238.8, 71, 239.1, 67.8, 239.1);
            a.bezierCurveTo(60.2, 239.2, 53.4, 237.3, 47.4, 233.3);
            a.bezierCurveTo(45.9, 232.5, 45, 231.7, 44.9, 230.9);
            a.lineTo(44.6, 229.2);
            a.bezierCurveTo(44.6, 228.8, 44.5, 228.3, 44.5, 227.6);
            a.bezierCurveTo(44.5, 226, 44.5, 223.5, 44.6, 220.3);
            a.lineTo(44.6, 213.4);
            a.lineTo(44.7, 207.6);
            a.lineTo(45.1, 204.9);
            a.lineTo(45.4, 203);
            a.bezierCurveTo(45.4, 202.9, 45.4, 202.8, 45.5, 202.7);
            a.bezierCurveTo(43.8, 201.2, 42.3, 199.7, 40.9, 198.2);
            a.bezierCurveTo(39.3, 196, 37.9, 193.9, 36.5, 191.7);
            a.bezierCurveTo(35.2, 189.6, 34, 187.4, 33, 185.1);
            a.lineTo(32.7, 183.5);
            a.bezierCurveTo(31.8, 176.3, 31, 168.9, 30.3, 161.3);
            a.bezierCurveTo(30.3, 161, 30.3, 160.7, 30.2, 160.4);
            a.bezierCurveTo(34.5, 162, 39, 162.1, 43.8, 160.4);
            a.bezierCurveTo(44.4, 160.2, 45.1, 159.9, 45.8, 159.6);
            a.lineTo(46.2, 159.9);
            a.bezierCurveTo(46.3, 160, 46.4, 160.1, 46.5, 160.2);
            a.bezierCurveTo(52, 164, 57.9, 167.6, 64.4, 170.9);
            a.lineTo(65.5, 171.5);
            a.bezierCurveTo(66.9,
            174.7, 68.3, 177.8, 69.8, 180.9);
            a.bezierCurveTo(71.4, 184.1, 73.4, 187, 76, 189.7);
            a.bezierCurveTo(78.5, 192.3, 81.7, 193.4, 85.5, 193.1);
            a.bezierCurveTo(89.2, 192.6, 92.8, 191.5, 96.3, 189.7);
            a.bezierCurveTo(98.5, 188.7, 100.4, 187.4, 102.1, 185.9);
            a.lineTo(102.9, 186.2);
            a.bezierCurveTo(110.1, 188.1, 116.2, 189.1, 121.1, 189.1);
            a.bezierCurveTo(128, 189, 134.8, 188, 141.7, 186.1);
            a.bezierCurveTo(142.1, 186.3, 142.6, 186.5, 143, 186.7);
            a.bezierCurveTo(143.5, 186.9, 144, 187.1, 144.5, 187.3);
            a.bezierCurveTo(147.1, 188.4, 149.8, 189.4, 152.5, 190.3);
            a.bezierCurveTo(155.3, 191.3, 158.2, 191.8, 161.2, 191.8);
            a.bezierCurveTo(164.2, 191.8, 166.7, 190.7, 168.6, 188.6);
            a.bezierCurveTo(170, 187.2, 171.1, 185.7, 172, 184.1);
            a.bezierCurveTo(173.4, 181.7, 174.7, 179.2, 175.9, 176.6);
            a.bezierCurveTo(177.1, 174, 178.3, 171.4, 179.4, 168.8);
            a.bezierCurveTo(179.7, 168, 180, 167.4, 180.2, 166.8);
            a.bezierCurveTo(183.2, 164.8, 186.2, 162.8, 189.3, 160.6);
            a.bezierCurveTo(192.6, 158.2, 195.6, 156, 198.4, 153.8);
            a.bezierCurveTo(199.3, 153.8, 200.6, 153.8, 202.1, 153.6);
            a.bezierCurveTo(204.6, 153.5, 207, 153.1,
            209.4, 152.5);
            a.bezierCurveTo(210.5, 152.2, 211.6, 151.8, 212.6, 151.4);
            a.bezierCurveTo(212.6, 151.4, 212.6, 151.4, 212.6, 151.5);
            a.closePath();
            a.moveTo(124.3, 61);
            a.bezierCurveTo(124.5, 61.3, 124.8, 61.6, 125, 61.9);
            a.bezierCurveTo(133.4, 55.3, 142.8, 50.4, 153.1, 47.4);
            a.bezierCurveTo(149.8, 46, 146.3, 44.6, 142.9, 43.3);
            a.bezierCurveTo(139.9, 42.5, 137.6, 41.7, 135.8, 41.1);
            a.bezierCurveTo(134.1, 40.4, 132.7, 40, 131.6, 39.8);
            a.bezierCurveTo(130.5, 39.6, 129.5, 39.2, 128.6, 38.8);
            a.bezierCurveTo(124.4, 37.6, 120.2, 37.4, 116.1, 38.4);
            a.bezierCurveTo(115.7,
            38.5, 115.2, 38.6, 114.8, 38.7);
            a.bezierCurveTo(114.6, 38.8, 114.2, 38.9, 113.7, 39);
            a.lineTo(106, 40.5);
            a.bezierCurveTo(102.5, 41.1, 99.2, 41.9, 95.9, 42.8);
            a.bezierCurveTo(106.9, 45.7, 116.3, 51.7, 124.3, 61);
            a.closePath();
            a.moveTo(141.3, 19);
            a.lineTo(143.4, 19);
            a.lineTo(144.6, 19.1);
            a.bezierCurveTo(147.1, 19.4, 148.8, 19.2, 149.7, 18.6);
            a.bezierCurveTo(151.7, 17.6, 152.9, 16, 153.3, 13.7);
            a.bezierCurveTo(153.7, 12.1, 153.7, 10.4, 153.5, 8.6);
            a.bezierCurveTo(152.9, 5.3, 150.9, 3.4, 147.6, 3.1);
            a.bezierCurveTo(141, 2.4, 135.2, 4.8, 130.1, 10.3);
            a.bezierCurveTo(129.9, 15.3, 133.6, 18.2, 141.3, 19);
            a.closePath();
            a.moveTo(221, 104);
            a.bezierCurveTo(220.8, 103.3, 220.5, 102.6, 220.2, 101.9);
            a.bezierCurveTo(219.3, 99.7, 218.2, 97.5, 216.9, 95.4);
            a.bezierCurveTo(213.3, 89.7, 209.2, 84.5, 204.4, 79.7);
            a.bezierCurveTo(205.4, 83, 205.9, 86.5, 205.9, 90.2);
            a.bezierCurveTo(205.8, 91.2, 205.8, 92.2, 205.7, 93.2);
            a.bezierCurveTo(205.5, 95.7, 205.1, 98.2, 204.6, 100.6);
            a.bezierCurveTo(204.9, 102.3, 205.3, 104.3, 205.7, 106.6);
            a.lineTo(205.7, 106.6);
            a.bezierCurveTo(205.2, 104.4, 204.9, 102.5, 204.6,
            101);
            a.bezierCurveTo(204.2, 103, 203.6, 104.9, 203, 106.9);
            a.lineTo(202.9, 106.9);
            a.bezierCurveTo(200.6, 113.5, 197.1, 119.7, 192.3, 125.5);
            a.bezierCurveTo(188.4, 130, 183.6, 133.5, 177.8, 135.9);
            a.bezierCurveTo(169.7, 139.6, 161.7, 140.9, 153.7, 139.7);
            a.bezierCurveTo(147.7, 138.6, 142.2, 136.2, 137.2, 132.7);
            a.bezierCurveTo(131.7, 128.8, 126.4, 125, 121.3, 121.5);
            a.lineTo(120.9, 121.3);
            a.lineTo(120.6, 121.5);
            a.bezierCurveTo(113.9, 128, 106.4, 133.2, 98, 137.3);
            a.bezierCurveTo(83.7, 144, 70, 142.9, 56.8, 134);
            a.bezierCurveTo(50.6, 130, 45.8,
            125.2, 42.5, 119.7);
            a.bezierCurveTo(38.6, 113.5, 36.7, 106.4, 36.6, 98.3);
            a.bezierCurveTo(36.6, 93.4, 37.1, 88.7, 38.2, 84.1);
            a.bezierCurveTo(37.7, 84.8, 37.1, 85.5, 36.6, 86.2);
            a.bezierCurveTo(29.8, 95.7, 24.4, 105.8, 20.3, 116.5);
            a.bezierCurveTo(20.4, 116.4, 20.4, 117, 20.3, 118.2);
            a.bezierCurveTo(20.2, 119.7, 20.7, 121.1, 21.6, 122.5);
            a.bezierCurveTo(22.2, 123.4, 23.3, 125, 25, 127.3);
            a.lineTo(26.2, 129.3);
            a.bezierCurveTo(26.3, 129.4, 26.4, 129.6, 26.5, 129.7);
            a.bezierCurveTo(27.9, 131.7, 29.4, 133.7, 31.1, 135.6);
            a.bezierCurveTo(34, 138.9, 37.4,
            142, 41.1, 144.9);
            a.bezierCurveTo(44.1, 147.2, 47.2, 149.4, 50.5, 151.6);
            a.bezierCurveTo(52.5, 152.9, 54.7, 154.4, 57, 155.8);
            a.bezierCurveTo(60.8, 158.3, 65.2, 160.8, 70.1, 163.1);
            a.bezierCurveTo(71, 163.6, 72, 164, 72.9, 164.4);
            a.bezierCurveTo(79.8, 167.5, 86.9, 170.1, 94.1, 172.2);
            a.bezierCurveTo(101.5, 174.4, 109, 175.9, 116.7, 176.5);
            a.bezierCurveTo(122.5, 177.2, 128.4, 177.1, 134.5, 176.3);
            a.bezierCurveTo(141.6, 175.3, 147.4, 174, 152, 172.4);
            a.bezierCurveTo(156.6, 170.7, 159.7, 169.4, 161.4, 168.4);
            a.lineTo(181.4, 156.2);
            a.bezierCurveTo(187.7,
            152, 192.6, 148.2, 195.9, 144.6);
            a.lineTo(202.9, 136.6);
            a.lineTo(209.8, 126.7);
            a.lineTo(211.7, 124);
            a.lineTo(214.9, 119.9);
            a.lineTo(216.7, 117.5);
            a.bezierCurveTo(217.8, 116.3, 218.7, 115.1, 219.4, 114);
            a.bezierCurveTo(219.8, 113.5, 220.1, 113, 220.3, 112.5);
            a.bezierCurveTo(220.8, 111.5, 221.1, 110.5, 221.3, 109.4);
            a.bezierCurveTo(221.5, 108.5, 221.6, 107.6, 221.6, 106.7);
            a.bezierCurveTo(221.6, 105.8, 221.4, 104.9, 221, 104);
            a.closePath();
            a.fillStyle = "rgb(153, 205, 0)";
            a.fill();
            a.beginPath();
            a.moveTo(245.5, 203.6);
            a.bezierCurveTo(245.4,
            202.9, 245.3, 202.4, 245.2, 202);
            a.bezierCurveTo(244.7, 200.9, 244.1, 200.1, 243.5, 199.7);
            a.bezierCurveTo(242.9, 199.2, 241.2, 198.1, 238.5, 196.2);
            a.bezierCurveTo(238, 195.9, 237.5, 195.5, 237, 195.2);
            a.bezierCurveTo(234.3, 193.5, 230.8, 191.6, 226.3, 189.3);
            a.bezierCurveTo(223, 187.4, 219.4, 185.7, 215.7, 184.2);
            a.lineTo(214.7, 183.8);
            a.bezierCurveTo(216, 179.3, 216.8, 174.4, 217, 169.3);
            a.bezierCurveTo(217.3, 162.5, 217.5, 155.7, 217.3, 148.8);
            a.bezierCurveTo(217.5, 148.7, 217.7, 148.6, 217.9, 148.5);
            a.bezierCurveTo(220.1, 147, 221.6, 145.1,
            222.5, 142.8);
            a.bezierCurveTo(223.5, 140.2, 224.2, 137.4, 224.6, 134.6);
            a.bezierCurveTo(224.9, 132.2, 225, 129.8, 225.1, 127.3);
            a.bezierCurveTo(225.1, 124.8, 225.1, 122.4, 224.8, 119.9);
            a.bezierCurveTo(224.8, 119.4, 224.7, 119, 224.6, 118.6);
            a.lineTo(224.5, 115.9);
            a.bezierCurveTo(225.1, 114.1, 225.4, 111.8, 225.6, 108.9);
            a.bezierCurveTo(225.7, 107.4, 225.5, 105.8, 224.9, 104.3);
            a.bezierCurveTo(220.3, 91.4, 212.2, 80.3, 200.6, 71);
            a.bezierCurveTo(195.8, 62.6, 189, 55.8, 180.1, 50.6);
            a.bezierCurveTo(172.6, 46.4, 165.2, 45, 157.9, 46.2);
            a.bezierCurveTo(155.1,
            45, 152.3, 43.9, 149.4, 42.8);
            a.bezierCurveTo(148.1, 42.3, 146.8, 41.9, 145.5, 41.4);
            a.bezierCurveTo(143.2, 40.6, 140.8, 39.9, 138.4, 39.2);
            a.bezierCurveTo(136.1, 38.4, 133.8, 37.6, 131.6, 36.7);
            a.bezierCurveTo(131.1, 36.6, 130.8, 36.3, 130.4, 36);
            a.bezierCurveTo(130.1, 35.6, 129.9, 35.3, 129.8, 35);
            a.bezierCurveTo(129.8, 34.3, 129.9, 33.8, 130.1, 33.5);
            a.bezierCurveTo(130.9, 31.6, 132.7, 30, 135.7, 29);
            a.bezierCurveTo(137.8, 27.6, 140.6, 26.5, 144, 25.5);
            a.bezierCurveTo(152.1, 23, 156.6, 19.2, 157.4, 13.9);
            a.bezierCurveTo(158.5, 7.2, 155.6, 2.8, 148.7,
            0.7);
            a.bezierCurveTo(141.1, -1.7, 133.2, 2, 125, 11.9);
            a.bezierCurveTo(121.9, 15.6, 120.1, 19, 119.4, 22.1);
            a.lineTo(118.6, 25.4);
            a.bezierCurveTo(118.2, 30, 117.2, 33, 115.7, 34.5);
            a.bezierCurveTo(114.8, 35.3, 113.3, 36, 111.2, 36.6);
            a.bezierCurveTo(104.1, 37.5, 97.2, 39.2, 90.6, 41.6);
            a.bezierCurveTo(89.4, 41.4, 88.3, 41.3, 87.1, 41.1);
            a.bezierCurveTo(71.9, 41.6, 59.7, 47.8, 50.4, 59.6);
            a.bezierCurveTo(46, 64.9, 42.7, 70.6, 40.4, 76.7);
            a.bezierCurveTo(39.8, 77.4, 39.2, 78.1, 38.5, 78.8);
            a.bezierCurveTo(29.4, 89.5, 22.3, 101, 17.2, 113.3);
            a.bezierCurveTo(16.8,
            114.3, 16.4, 115.3, 16.1, 116.3);
            a.bezierCurveTo(15.8, 117, 15.6, 117.6, 15.5, 118.3);
            a.bezierCurveTo(15.4, 118.7, 15.3, 119.1, 15.3, 119.5);
            a.bezierCurveTo(15.2, 120.4, 15.1, 121.2, 15.2, 122.1);
            a.bezierCurveTo(15.5, 124.5, 16.4, 127.1, 18, 129.6);
            a.bezierCurveTo(18.5, 132, 18.6, 134.2, 18.3, 136);
            a.bezierCurveTo(17.4, 144.5, 19.9, 151.6, 25.9, 157.5);
            a.bezierCurveTo(25.9, 159.4, 26, 161.4, 26.1, 163.4);
            a.bezierCurveTo(26.4, 169.1, 27.2, 175.1, 28.4, 181.4);
            a.bezierCurveTo(28.7, 182.6, 28.9, 183.7, 29.2, 184.9);
            a.bezierCurveTo(29.1, 184.9, 29, 185,
            28.9, 185);
            a.bezierCurveTo(25.6, 186.9, 22.7, 188.6, 20.2, 190.1);
            a.bezierCurveTo(17.8, 191.7, 15.6, 193.1, 13.8, 194.4);
            a.bezierCurveTo(12.5, 195.5, 11.1, 196.7, 9.6, 197.9);
            a.bezierCurveTo(7.9, 199, 6.3, 200.4, 4.9, 201.9);
            a.bezierCurveTo(3.7, 203, 2.7, 204.1, 1.7, 205);
            a.bezierCurveTo(0.7, 206, 0.2, 207.4, 0, 209.2);
            a.bezierCurveTo(-0.1, 211, 0, 212.5, 0.2, 213.8);
            a.bezierCurveTo(0.4, 215, 0.9, 217, 1.5, 219.7);
            a.bezierCurveTo(2.1, 222.4, 3, 224.6, 4, 226.5);
            a.bezierCurveTo(5.1, 228.3, 6.7, 229.7, 9, 230.6);
            a.bezierCurveTo(9.6, 230.8, 10.3, 231, 11.1,
            231.2);
            a.bezierCurveTo(14.9, 231.1, 18.6, 231.1, 22.4, 231.2);
            a.bezierCurveTo(24.2, 231.3, 26, 231.5, 27.8, 231.7);
            a.bezierCurveTo(29.4, 231.8, 31, 232, 32.7, 232.2);
            a.bezierCurveTo(34.1, 232.3, 35.6, 232.5, 37.1, 232.6);
            a.bezierCurveTo(38.4, 232.7, 39.8, 232.8, 41.2, 232.9);
            a.bezierCurveTo(41.5, 232.9, 41.8, 233, 42.1, 233);
            a.lineTo(42.2, 233.2);
            a.bezierCurveTo(42.4, 233.8, 42.8, 234.4, 43.1, 234.8);
            a.bezierCurveTo(48.8, 238.6, 55, 240.9, 61.6, 241.5);
            a.bezierCurveTo(68.7, 242.6, 75.6, 242.3, 82.4, 240.5);
            a.bezierCurveTo(82.5, 240.5, 82.5, 240.5,
            82.6, 240.5);
            a.bezierCurveTo(84, 240.2, 85.4, 239.9, 86.7, 239.6);
            a.bezierCurveTo(88.1, 239.3, 89.3, 238.9, 90.4, 238.4);
            a.bezierCurveTo(90.9, 238.1, 91.4, 237.8, 91.8, 237.3);
            a.bezierCurveTo(104.5, 241.2, 118.7, 242, 134.5, 239.7);
            a.bezierCurveTo(139.8, 238.9, 145.2, 237.5, 150.9, 235.6);
            a.bezierCurveTo(151.5, 237, 152.2, 238.2, 153.1, 239.5);
            a.bezierCurveTo(153.8, 240.1, 154.6, 240.7, 155.6, 241.3);
            a.bezierCurveTo(156.9, 242.2, 158.4, 242.9, 160.2, 243.5);
            a.bezierCurveTo(161.9, 243.8, 163.7, 244.1, 165.5, 244.5);
            a.bezierCurveTo(171.9, 244.8,
            178, 244.7, 183.5, 244.1);
            a.bezierCurveTo(188, 243.7, 192.3, 242.6, 196.2, 240.7);
            a.bezierCurveTo(197, 240.3, 197.6, 239.9, 198.3, 239.5);
            a.bezierCurveTo(200, 238.4, 201.4, 237.4, 202.3, 236.5);
            a.bezierCurveTo(203.2, 235.6, 203.9, 233.1, 204.5, 229.2);
            a.bezierCurveTo(204.5, 229, 204.6, 228.7, 204.6, 228.3);
            a.lineTo(223.4, 226.8);
            a.bezierCurveTo(225.5, 226.6, 227.6, 226.4, 229.8, 226.3);
            a.bezierCurveTo(232, 226.2, 233.8, 225.5, 235.2, 224.1);
            a.bezierCurveTo(237, 222.5, 238.5, 220.8, 239.4, 219.1);
            a.bezierCurveTo(240.4, 217.5, 241.3, 215.9, 242.2,
            214.4);
            a.bezierCurveTo(243, 212.9, 243.6, 211.6, 244.1, 210.5);
            a.bezierCurveTo(244.6, 209.4, 244.9, 208.1, 245.2, 206.7);
            a.bezierCurveTo(245.4, 205.2, 245.5, 204.2, 245.5, 203.6);
            a.closePath();
            a.moveTo(219.9, 140.2);
            a.bezierCurveTo(219.5, 141.6, 218.8, 143, 218, 144.5);
            a.bezierCurveTo(217.8, 144.9, 217.6, 145.2, 217.3, 145.6);
            a.bezierCurveTo(216.7, 146.3, 215.9, 146.9, 214.9, 147.4);
            a.bezierCurveTo(214.1, 147.8, 213.2, 148.2, 212.3, 148.4);
            a.bezierCurveTo(210.2, 149.1, 208, 149.5, 205.6, 149.5);
            a.bezierCurveTo(204.5, 149.5, 203.4, 149.4, 202.3,
            149.3);
            a.bezierCurveTo(200.6, 148.9, 199.7, 148, 199.8, 146.7);
            a.lineTo(200.7, 145.2);
            a.bezierCurveTo(201.3, 144.3, 201.8, 143.4, 202.4, 142.5);
            a.bezierCurveTo(202.7, 141.9, 203, 141.3, 203.4, 140.8);
            a.bezierCurveTo(203.8, 140, 204.2, 139.2, 204.7, 138.5);
            a.bezierCurveTo(205.3, 137.7, 205.9, 136.8, 206.5, 136);
            a.bezierCurveTo(206.9, 135.5, 207.3, 135, 207.6, 134.5);
            a.bezierCurveTo(208.3, 133.7, 209, 132.8, 209.7, 132);
            a.bezierCurveTo(209.9, 131.7, 210.2, 131.4, 210.5, 131);
            a.bezierCurveTo(211, 130.4, 211.5, 129.9, 212.1, 129.3);
            a.bezierCurveTo(212.6,
            128.8, 213.1, 128.3, 213.6, 127.8);
            a.bezierCurveTo(214.1, 127.4, 214.6, 127, 215.1, 126.6);
            a.bezierCurveTo(215.3, 126.4, 215.5, 126.3, 215.6, 126.2);
            a.bezierCurveTo(216.8, 125.4, 217.9, 124.8, 219, 124.5);
            a.lineTo(219.3, 125.4);
            a.bezierCurveTo(220, 127.9, 220.5, 130.6, 220.8, 133.3);
            a.bezierCurveTo(221, 135.7, 220.8, 138, 219.9, 140.2);
            a.closePath();
            a.moveTo(106, 40.4);
            a.lineTo(113.7, 38.9);
            a.bezierCurveTo(114.2, 38.8, 114.6, 38.7, 114.8, 38.6);
            a.bezierCurveTo(115.2, 38.6, 115.7, 38.4, 116.1, 38.3);
            a.bezierCurveTo(117.2, 37.9, 118.2, 37.4, 119,
            36.8);
            a.lineTo(119.5, 35.6);
            a.lineTo(123.3, 21.1);
            a.bezierCurveTo(124.5, 18.2, 126.8, 14.6, 130.1, 10.3);
            a.bezierCurveTo(135.2, 4.8, 141, 2.4, 147.6, 3.1);
            a.bezierCurveTo(150.9, 3.4, 152.9, 5.2, 153.5, 8.5);
            a.bezierCurveTo(153.7, 10.3, 153.7, 12, 153.3, 13.7);
            a.bezierCurveTo(152.9, 15.9, 151.7, 17.6, 149.7, 18.6);
            a.bezierCurveTo(148.8, 19.2, 147.1, 19.4, 144.6, 19.1);
            a.lineTo(143.4, 19);
            a.lineTo(141.3, 19);
            a.bezierCurveTo(138.9, 19.1, 136.7, 19.9, 134.8, 21.5);
            a.bezierCurveTo(132.4, 23.5, 130.7, 25.2, 129.7, 26.8);
            a.bezierCurveTo(128.9, 28.3,
            127.9, 30.7, 126.7, 33.8);
            a.lineTo(126.4, 36.8);
            a.lineTo(126.7, 37.7);
            a.lineTo(128.6, 38.7);
            a.bezierCurveTo(129.5, 39.2, 130.5, 39.5, 131.6, 39.8);
            a.bezierCurveTo(132.7, 40, 134.1, 40.4, 135.8, 41);
            a.bezierCurveTo(137.6, 41.7, 139.9, 42.4, 142.9, 43.3);
            a.bezierCurveTo(146.3, 44.6, 149.8, 46, 153.1, 47.4);
            a.bezierCurveTo(142.8, 50.4, 133.4, 55.2, 125, 61.8);
            a.bezierCurveTo(124.8, 61.6, 124.5, 61.3, 124.3, 61);
            a.bezierCurveTo(116.3, 51.7, 106.9, 45.6, 95.9, 42.7);
            a.bezierCurveTo(99.2, 41.9, 102.5, 41.1, 106, 40.4);
            a.closePath();
            a.moveTo(41.7, 90.1);
            a.bezierCurveTo(42.4, 84.8, 43.6, 79.9, 45.5, 75.3);
            a.bezierCurveTo(46.5, 72.7, 47.7, 70.1, 49.2, 67.7);
            a.bezierCurveTo(52.7, 61.9, 57.3, 56.8, 63, 52.3);
            a.bezierCurveTo(70.4, 46.7, 77.8, 43.8, 85.3, 43.7);
            a.bezierCurveTo(87.3, 43.6, 89.3, 43.8, 91.3, 44.1);
            a.bezierCurveTo(95.6, 44.9, 100, 46.5, 104.4, 49.1);
            a.bezierCurveTo(111.9, 53.4, 117.3, 59.5, 120.8, 67.4);
            a.lineTo(124.2, 73.8);
            a.lineTo(124.6, 73.8);
            a.bezierCurveTo(124.7, 73.5, 124.9, 73.2, 125, 72.9);
            a.bezierCurveTo(126.3, 71.1, 127.5, 69.4, 128.6, 67.7);
            a.bezierCurveTo(136, 57.6, 146.1,
            51.7, 158.7, 50.1);
            a.bezierCurveTo(158.9, 50.1, 159.1, 50.1, 159.2, 50.1);
            a.bezierCurveTo(162.5, 50.1, 165.7, 50.5, 168.8, 51.2);
            a.bezierCurveTo(176.5, 53, 183.4, 56.7, 189.4, 62.4);
            a.bezierCurveTo(190, 63, 190.6, 63.5, 191.1, 64.1);
            a.bezierCurveTo(193.9, 67, 196.1, 70.1, 197.8, 73.5);
            a.bezierCurveTo(201.1, 79.7, 202.5, 86.8, 202.2, 94.7);
            a.bezierCurveTo(202, 99, 201.3, 103.2, 199.9, 107.1);
            a.bezierCurveTo(197.5, 114.2, 193.1, 120.7, 186.7, 126.4);
            a.bezierCurveTo(177.6, 134.4, 168.3, 137.9, 158.5, 137);
            a.bezierCurveTo(153.1, 136.4, 149.4, 135.6,
            147.3, 134.6);
            a.bezierCurveTo(137.6, 129.8, 130.4, 122.6, 125.6, 113);
            a.bezierCurveTo(124.9, 111.7, 124.3, 110.4, 123.8, 109);
            a.bezierCurveTo(123.3, 107.9, 122.9, 106.7, 122.6, 105.5);
            a.bezierCurveTo(121.9, 106.9, 121.2, 108.3, 120.5, 109.6);
            a.bezierCurveTo(119.7, 111, 118.8, 112.4, 118, 113.7);
            a.bezierCurveTo(110.3, 125.2, 100.6, 132.5, 88.9, 135.6);
            a.bezierCurveTo(75.9, 139.1, 64.3, 136.3, 54.2, 127.3);
            a.bezierCurveTo(51.5, 124.9, 49.2, 122.2, 47.4, 119.3);
            a.bezierCurveTo(42.2, 111.4, 40.4, 101.7, 41.7, 90.1);
            a.closePath();
            a.moveTo(20.3, 118.2);
            a.bezierCurveTo(20.4, 117, 20.4, 116.4, 20.3, 116.5);
            a.bezierCurveTo(24.4, 105.8, 29.8, 95.7, 36.6, 86.2);
            a.bezierCurveTo(37.1, 85.5, 37.7, 84.8, 38.2, 84.1);
            a.bezierCurveTo(37.1, 88.6, 36.6, 93.4, 36.6, 98.3);
            a.bezierCurveTo(36.7, 106.3, 38.6, 113.5, 42.5, 119.7);
            a.bezierCurveTo(45.8, 125.2, 50.6, 129.9, 56.8, 134);
            a.bezierCurveTo(70, 142.9, 83.7, 143.9, 98, 137.2);
            a.bezierCurveTo(106.4, 133.2, 113.9, 127.9, 120.6, 121.5);
            a.lineTo(120.9, 121.3);
            a.lineTo(121.3, 121.5);
            a.bezierCurveTo(126.4, 125, 131.7, 128.7, 137.2, 132.7);
            a.bezierCurveTo(142.2,
            136.2, 147.7, 138.6, 153.7, 139.7);
            a.bezierCurveTo(161.7, 140.8, 169.7, 139.6, 177.8, 135.9);
            a.bezierCurveTo(183.6, 133.5, 188.4, 130, 192.3, 125.5);
            a.bezierCurveTo(197.1, 119.7, 200.6, 113.5, 202.9, 106.8);
            a.bezierCurveTo(203.6, 104.8, 204.2, 102.7, 204.6, 100.6);
            a.bezierCurveTo(205.1, 98.2, 205.5, 95.7, 205.7, 93.2);
            a.bezierCurveTo(205.8, 92.2, 205.8, 91.1, 205.9, 90.2);
            a.bezierCurveTo(205.9, 86.5, 205.4, 83, 204.4, 79.6);
            a.bezierCurveTo(209.2, 84.5, 213.3, 89.7, 216.9, 95.4);
            a.bezierCurveTo(218.2, 97.5, 219.3, 99.6, 220.2, 101.8);
            a.bezierCurveTo(220.5,
            102.5, 220.8, 103.3, 221, 104);
            a.bezierCurveTo(221.4, 104.9, 221.6, 105.7, 221.6, 106.6);
            a.bezierCurveTo(221.6, 107.6, 221.5, 108.5, 221.3, 109.4);
            a.bezierCurveTo(221.1, 110.4, 220.8, 111.5, 220.3, 112.5);
            a.bezierCurveTo(220.1, 113, 219.8, 113.5, 219.4, 114);
            a.bezierCurveTo(218.7, 115.1, 217.8, 116.3, 216.7, 117.4);
            a.lineTo(214.9, 119.9);
            a.lineTo(211.7, 124);
            a.lineTo(209.8, 126.7);
            a.lineTo(202.9, 136.6);
            a.lineTo(195.9, 144.6);
            a.bezierCurveTo(192.6, 148.2, 187.7, 152, 181.4, 156.2);
            a.lineTo(161.4, 168.4);
            a.bezierCurveTo(159.7, 169.4, 156.6,
            170.7, 152, 172.3);
            a.bezierCurveTo(147.4, 173.9, 141.6, 175.3, 134.5, 176.2);
            a.bezierCurveTo(128.4, 177.1, 122.5, 177.2, 116.7, 176.5);
            a.bezierCurveTo(109, 175.8, 101.5, 174.4, 94.1, 172.2);
            a.bezierCurveTo(86.9, 170, 79.8, 167.4, 72.9, 164.4);
            a.bezierCurveTo(72, 164, 71, 163.5, 70.1, 163.1);
            a.bezierCurveTo(65.2, 160.7, 60.8, 158.3, 57, 155.8);
            a.bezierCurveTo(54.7, 154.3, 52.5, 152.9, 50.5, 151.5);
            a.bezierCurveTo(47.2, 149.4, 44.1, 147.1, 41.1, 144.8);
            a.bezierCurveTo(37.4, 142, 34, 138.9, 31.1, 135.5);
            a.bezierCurveTo(29.4, 133.7, 27.9, 131.7, 26.5,
            129.7);
            a.bezierCurveTo(26.4, 129.5, 26.3, 129.4, 26.2, 129.3);
            a.lineTo(25, 127.3);
            a.bezierCurveTo(23.3, 125, 22.2, 123.4, 21.6, 122.5);
            a.bezierCurveTo(20.7, 121.1, 20.2, 119.7, 20.3, 118.2);
            a.closePath();
            a.moveTo(177.9, 163.2);
            a.lineTo(174.9, 169.8);
            a.lineTo(174.7, 170.3);
            a.lineTo(174.4, 170.9);
            a.bezierCurveTo(174, 172.1, 173.5, 173.3, 173.1, 174.5);
            a.bezierCurveTo(172.2, 177.2, 171.1, 179.7, 169.6, 182.2);
            a.bezierCurveTo(168.3, 184.5, 166.3, 186.1, 163.6, 187.2);
            a.bezierCurveTo(160.6, 188.4, 157.5, 188.5, 154.4, 187.3);
            a.bezierCurveTo(151.9,
            186.4, 149.5, 185.5, 147.2, 184.7);
            a.lineTo(146.7, 184.5);
            a.lineTo(146.3, 184.3);
            a.lineTo(140.9, 182.4);
            a.bezierCurveTo(142.8, 182.1, 145, 181.4, 147.5, 180.4);
            a.bezierCurveTo(148.2, 180, 148.9, 179.7, 149.6, 179.4);
            a.bezierCurveTo(152.5, 178, 155.3, 176.5, 158.1, 174.8);
            a.bezierCurveTo(161.2, 172.9, 164.4, 171.1, 167.5, 169.3);
            a.bezierCurveTo(170.7, 167.7, 173.7, 165.9, 176.8, 163.9);
            a.bezierCurveTo(177.2, 163.7, 177.6, 163.5, 177.9, 163.2);
            a.closePath();
            a.moveTo(101.1, 181.4);
            a.lineTo(97.1, 184.2);
            a.lineTo(96.8, 184.3);
            a.lineTo(96.3,
            184.7);
            a.bezierCurveTo(93.2, 186.5, 90.2, 187.9, 87.1, 188.9);
            a.bezierCurveTo(83.9, 189.9, 81.1, 189.2, 78.6, 186.6);
            a.bezierCurveTo(76, 184.1, 74, 181.3, 72.5, 178.3);
            a.bezierCurveTo(71.3, 175.7, 70.1, 172.9, 69, 170.1);
            a.lineTo(68, 167.8);
            a.bezierCurveTo(67.8, 167.3, 67.7, 166.8, 67.5, 166.3);
            a.bezierCurveTo(69.1, 167.1, 70.7, 167.9, 72.4, 168.8);
            a.bezierCurveTo(74.1, 169.6, 75.9, 170.5, 77.9, 171.4);
            a.bezierCurveTo(79.9, 172.3, 83.2, 173.8, 87.9, 175.9);
            a.bezierCurveTo(92.5, 177.9, 95.7, 179.3, 97.5, 180);
            a.bezierCurveTo(99.2, 180.7, 100.4,
            181.2, 101.1, 181.4);
            a.closePath();
            a.moveTo(25.8, 151.1);
            a.bezierCurveTo(23.2, 147.7, 22, 143.6, 22.3, 139);
            a.bezierCurveTo(22.3, 139, 22.3, 139, 22.3, 139);
            a.lineTo(22.4, 135.1);
            a.bezierCurveTo(22.5, 134.4, 22.9, 134.4, 23.6, 134.9);
            a.bezierCurveTo(24.4, 135.4, 25.2, 136, 26, 136.6);
            a.bezierCurveTo(27.6, 137.8, 29.1, 139, 30.7, 140.2);
            a.bezierCurveTo(34.1, 142.9, 37.3, 145.8, 40.4, 148.8);
            a.bezierCurveTo(42.4, 150.6, 44.1, 152.6, 45.6, 154.7);
            a.bezierCurveTo(45.8, 155.3, 45.9, 155.7, 45.7, 156);
            a.lineTo(45.5, 156.1);
            a.bezierCurveTo(40.5, 158.4,
            35.6, 158.3, 30.9, 155.9);
            a.bezierCurveTo(30.6, 155.7, 30.3, 155.6, 30, 155.4);
            a.bezierCurveTo(30, 155.3, 29.9, 155.3, 29.9, 155.3);
            a.bezierCurveTo(28.3, 154, 26.9, 152.6, 25.8, 151.1);
            a.closePath();
            a.moveTo(240.9, 209.6);
            a.bezierCurveTo(240.1, 211.5, 239.1, 213.3, 237.8, 215);
            a.bezierCurveTo(236.5, 216.5, 235.2, 218.1, 233.9, 219.6);
            a.bezierCurveTo(233.4, 220.2, 232.8, 220.7, 232.3, 221.1);
            a.bezierCurveTo(230.1, 222.1, 227.5, 222.5, 224.3, 222.1);
            a.bezierCurveTo(218.9, 221.9, 213.4, 222, 207.7, 222.3);
            a.bezierCurveTo(206.5, 222.4, 205.3, 222.4,
            204, 222.5);
            a.bezierCurveTo(203.3, 218.7, 201.8, 213.8, 199.6, 207.8);
            a.lineTo(200.2, 212.5);
            a.bezierCurveTo(200.1, 212, 200, 211.2, 199.7, 210.2);
            a.bezierCurveTo(199.9, 214.1, 200, 218.2, 199.9, 222.3);
            a.bezierCurveTo(199.9, 222.5, 199.9, 222.7, 199.9, 222.9);
            a.bezierCurveTo(199.9, 225, 199.7, 226.9, 199.4, 228.8);
            a.bezierCurveTo(199.1, 230.4, 198.7, 232, 198.3, 233.5);
            a.lineTo(196.7, 235.1);
            a.bezierCurveTo(196.6, 235.2, 196.5, 235.4, 196.3, 235.5);
            a.bezierCurveTo(195.2, 236.4, 193.3, 237.6, 190.7, 239.1);
            a.bezierCurveTo(188.1, 240.7, 184.5,
            241.7, 179.9, 242.1);
            a.bezierCurveTo(175.3, 242.4, 172, 242.5, 169.8, 242.3);
            a.bezierCurveTo(167.8, 242.1, 165.5, 241.6, 162.9, 240.8);
            a.bezierCurveTo(160.4, 239.9, 158, 237.9, 155.6, 234.8);
            a.bezierCurveTo(155.4, 234.6, 155.3, 234.4, 155.1, 234.2);
            a.bezierCurveTo(154.3, 233, 153.5, 231.6, 152.8, 230);
            a.bezierCurveTo(151.9, 227.8, 151.2, 225.3, 150.7, 222.4);
            a.bezierCurveTo(150.7, 222.2, 150.6, 222.1, 150.6, 221.9);
            a.bezierCurveTo(149.7, 216.4, 149.3, 213.1, 149.2, 212);
            a.bezierCurveTo(148.8, 215.6, 148.6, 219.2, 148.8, 222.8);
            a.bezierCurveTo(148.9,
            225.2, 149, 227.6, 149.4, 230);
            a.bezierCurveTo(149.4, 230.3, 149.4, 230.6, 149.5, 231);
            a.bezierCurveTo(141, 233.2, 132.2, 234.4, 123.2, 234.4);
            a.bezierCurveTo(113.4, 235.1, 103.6, 234.6, 93.8, 233);
            a.lineTo(94, 232);
            a.bezierCurveTo(94.3, 230, 94.4, 228.1, 94.4, 226.2);
            a.bezierCurveTo(94.4, 225.6, 94.3, 224.9, 94.3, 224.3);
            a.bezierCurveTo(94.2, 220.7, 94, 217.1, 93.8, 213.5);
            a.bezierCurveTo(93.8, 214.9, 93.7, 215.9, 93.6, 216.6);
            a.bezierCurveTo(93.5, 217.2, 93.5, 217.7, 93.4, 218.1);
            a.bezierCurveTo(93.4, 218.5, 93.2, 219.4, 92.8, 220.9);
            a.bezierCurveTo(92.6,
            222, 92.3, 223, 92, 223.9);
            a.bezierCurveTo(91.9, 224.2, 91.8, 224.5, 91.7, 224.8);
            a.bezierCurveTo(91.3, 226, 90.8, 227.1, 90.2, 228.3);
            a.bezierCurveTo(89.9, 229, 89.5, 229.7, 89.2, 230.4);
            a.bezierCurveTo(88.8, 230.9, 88.4, 231.4, 88, 231.9);
            a.bezierCurveTo(87.5, 232.5, 86.9, 233.1, 86.2, 233.7);
            a.bezierCurveTo(85.8, 234.1, 85.4, 234.5, 84.9, 234.8);
            a.bezierCurveTo(83.9, 235.6, 82.8, 236.2, 81.6, 236.7);
            a.bezierCurveTo(80.2, 237.3, 78.7, 237.7, 77.1, 238.1);
            a.bezierCurveTo(74.1, 238.7, 71, 239, 67.8, 239);
            a.bezierCurveTo(60.3, 239.1, 53.6, 237.3, 47.7,
            233.5);
            a.bezierCurveTo(47.6, 233.4, 47.5, 233.4, 47.4, 233.3);
            a.bezierCurveTo(45.9, 232.5, 45, 231.7, 44.9, 230.9);
            a.lineTo(44.6, 229.2);
            a.bezierCurveTo(44.6, 228.8, 44.5, 228.2, 44.5, 227.6);
            a.bezierCurveTo(44.5, 225.9, 44.5, 223.5, 44.6, 220.3);
            a.lineTo(44.6, 213.4);
            a.lineTo(44.7, 207.6);
            a.lineTo(43.7, 213);
            a.lineTo(42.4, 220.3);
            a.bezierCurveTo(41.9, 223.1, 41.7, 225.4, 41.6, 227.4);
            a.bezierCurveTo(41, 227.3, 40.3, 227.3, 39.7, 227.2);
            a.bezierCurveTo(37.7, 227.2, 35.8, 227.2, 33.8, 227.2);
            a.bezierCurveTo(32, 227.2, 30.2, 227.2, 28.4, 227.2);
            a.bezierCurveTo(26.4, 227.2, 24.5, 227.3, 22.6, 227.4);
            a.bezierCurveTo(21.3, 227.4, 19.7, 227.5, 17.8, 227.7);
            a.bezierCurveTo(15.9, 227.9, 13.9, 227.7, 11.9, 227.1);
            a.bezierCurveTo(9.8, 226.4, 8.3, 225.2, 7.4, 223.5);
            a.bezierCurveTo(6.5, 221.8, 5.6, 219.7, 4.8, 217.3);
            a.bezierCurveTo(4, 214.8, 3.5, 212.9, 3.3, 211.5);
            a.bezierCurveTo(3.2, 210.1, 3.6, 209, 4.5, 208.2);
            a.bezierCurveTo(5.4, 207.3, 6.7, 206.1, 8.4, 204.6);
            a.bezierCurveTo(10.2, 202.9, 11.6, 201.6, 12.7, 200.6);
            a.bezierCurveTo(13.7, 199.6, 16.9, 197.2, 22.4, 193.3);
            a.bezierCurveTo(26.1,
            190.5, 28.7, 189.1, 30.1, 188.9);
            a.bezierCurveTo(31.2, 193, 32.3, 197, 33.7, 201);
            a.bezierCurveTo(34.2, 202.8, 35, 204.4, 36, 205.9);
            a.lineTo(33.3, 187.7);
            a.lineTo(33.1, 185.9);
            a.lineTo(32.9, 184.7);
            a.lineTo(32.7, 183.4);
            a.bezierCurveTo(31.8, 176.3, 31, 168.9, 30.3, 161.3);
            a.bezierCurveTo(30.3, 161, 30.3, 160.7, 30.2, 160.3);
            a.bezierCurveTo(34.5, 162, 39, 162, 43.8, 160.4);
            a.bezierCurveTo(44.4, 160.1, 45.1, 159.9, 45.8, 159.6);
            a.lineTo(50.7, 157.9);
            a.lineTo(63.1, 164.7);
            a.bezierCurveTo(63.4, 166, 64, 168, 65.2, 170.7);
            a.lineTo(65.5, 171.5);
            a.bezierCurveTo(66.9,
            174.7, 68.3, 177.8, 69.8, 180.9);
            a.bezierCurveTo(71.4, 184.1, 73.4, 187, 76, 189.6);
            a.bezierCurveTo(78.5, 192.2, 81.7, 193.4, 85.5, 193.1);
            a.bezierCurveTo(89.2, 192.6, 92.8, 191.5, 96.3, 189.7);
            a.bezierCurveTo(98.5, 188.6, 100.4, 187.4, 102.1, 185.9);
            a.lineTo(103.2, 185);
            a.bezierCurveTo(103.4, 184.9, 103.6, 184.7, 103.8, 184.6);
            a.bezierCurveTo(106.5, 182.5, 108.3, 180.9, 109.3, 179.7);
            a.lineTo(109.4, 179.7);
            a.bezierCurveTo(114, 180.5, 118.1, 181, 121.9, 181.4);
            a.bezierCurveTo(125.7, 181.8, 128.8, 181.8, 131.3, 181.4);
            a.bezierCurveTo(133, 181.8,
            136.2, 183.2, 140.7, 185.6);
            a.bezierCurveTo(141, 185.7, 141.3, 185.9, 141.7, 186);
            a.bezierCurveTo(142.1, 186.3, 142.6, 186.5, 143, 186.7);
            a.bezierCurveTo(143.5, 186.9, 144, 187.1, 144.5, 187.3);
            a.bezierCurveTo(147.1, 188.4, 149.8, 189.4, 152.5, 190.3);
            a.bezierCurveTo(155.3, 191.3, 158.2, 191.7, 161.2, 191.7);
            a.bezierCurveTo(164.2, 191.7, 166.7, 190.7, 168.6, 188.6);
            a.bezierCurveTo(170, 187.2, 171.1, 185.6, 172, 184.1);
            a.bezierCurveTo(173.4, 181.6, 174.7, 179.1, 175.9, 176.6);
            a.bezierCurveTo(177.1, 174, 178.3, 171.4, 179.4, 168.7);
            a.bezierCurveTo(179.7,
            168, 180, 167.3, 180.2, 166.7);
            a.bezierCurveTo(181.4, 164, 182, 162.2, 182, 161.5);
            a.bezierCurveTo(183.8, 160.7, 186.6, 158.8, 190.2, 155.8);
            a.lineTo(191, 155.2);
            a.bezierCurveTo(191.7, 154.5, 192.6, 153.8, 193.4, 153.2);
            a.bezierCurveTo(193.8, 153, 194.1, 152.8, 194.5, 152.6);
            a.lineTo(196.6, 153.6);
            a.bezierCurveTo(197, 153.7, 197.6, 153.8, 198.4, 153.8);
            a.bezierCurveTo(199.3, 153.8, 200.6, 153.7, 202.1, 153.6);
            a.bezierCurveTo(204.6, 153.5, 207, 153.1, 209.4, 152.5);
            a.bezierCurveTo(210.5, 152.1, 211.6, 151.8, 212.6, 151.3);
            a.bezierCurveTo(212.6,
            151.4, 212.6, 151.4, 212.6, 151.4);
            a.bezierCurveTo(213.3, 158.8, 213.4, 166.1, 212.8, 173.3);
            a.lineTo(211.2, 182.6);
            a.lineTo(211, 183.6);
            a.lineTo(209.4, 192.8);
            a.lineTo(208.3, 198);
            a.lineTo(208.4, 198.1);
            a.bezierCurveTo(210.9, 194.2, 212.8, 190, 214.2, 185.6);
            a.lineTo(240.5, 201.5);
            a.bezierCurveTo(241.1, 202.2, 241.6, 202.9, 241.8, 203.6);
            a.bezierCurveTo(242.1, 205.4, 241.8, 207.4, 240.9, 209.6);
            a.closePath();
            a.fillStyle = "rgb(35, 44, 30)";
            a.fill();
            a.beginPath();
            a.moveTo(219.9, 140.2);
            a.bezierCurveTo(219.5, 141.6, 218.8, 143, 218, 144.5);
            a.bezierCurveTo(217.8, 144.9, 217.6, 145.2, 217.3, 145.6);
            a.bezierCurveTo(216.7, 146.3, 215.9, 146.9, 214.9, 147.4);
            a.bezierCurveTo(214.1, 147.8, 213.2, 148.2, 212.3, 148.4);
            a.bezierCurveTo(210.2, 149.1, 208, 149.5, 205.6, 149.5);
            a.bezierCurveTo(204.5, 149.5, 203.4, 149.4, 202.3, 149.3);
            a.bezierCurveTo(200.6, 148.9, 199.7, 148, 199.8, 146.7);
            a.lineTo(200.7, 145.2);
            a.bezierCurveTo(201.3, 144.3, 201.8, 143.4, 202.4, 142.5);
            a.bezierCurveTo(202.7, 141.9, 203, 141.3, 203.4, 140.8);
            a.bezierCurveTo(203.8, 140, 204.2, 139.2, 204.7, 138.5);
            a.bezierCurveTo(205.3,
            137.7, 205.9, 136.8, 206.5, 136);
            a.bezierCurveTo(206.9, 135.5, 207.3, 135, 207.6, 134.5);
            a.bezierCurveTo(208.3, 133.7, 209, 132.8, 209.7, 132);
            a.bezierCurveTo(209.9, 131.7, 210.2, 131.4, 210.5, 131);
            a.bezierCurveTo(211, 130.4, 211.5, 129.9, 212.1, 129.3);
            a.bezierCurveTo(212.6, 128.8, 213.1, 128.3, 213.6, 127.8);
            a.bezierCurveTo(214.1, 127.4, 214.6, 127, 215.1, 126.6);
            a.bezierCurveTo(215.3, 126.4, 215.5, 126.3, 215.6, 126.2);
            a.bezierCurveTo(216.8, 125.4, 217.9, 124.8, 219, 124.5);
            a.lineTo(219.3, 125.4);
            a.bezierCurveTo(220, 127.9, 220.5, 130.6, 220.8,
            133.3);
            a.bezierCurveTo(221, 135.7, 220.8, 138, 219.9, 140.2);
            a.closePath();
            a.moveTo(40.4, 148.8);
            a.bezierCurveTo(37.3, 145.8, 34.1, 142.9, 30.7, 140.2);
            a.bezierCurveTo(29.1, 139, 27.6, 137.8, 26, 136.6);
            a.bezierCurveTo(25.2, 136, 24.4, 135.4, 23.6, 134.9);
            a.bezierCurveTo(22.9, 134.4, 22.5, 134.4, 22.4, 135.1);
            a.lineTo(22.3, 139);
            a.bezierCurveTo(22.3, 139, 22.3, 139, 22.3, 139);
            a.bezierCurveTo(22, 143.6, 23.2, 147.7, 25.8, 151.1);
            a.bezierCurveTo(26.9, 152.6, 28.3, 154, 29.9, 155.3);
            a.bezierCurveTo(29.9, 155.3, 30, 155.3, 30, 155.4);
            a.bezierCurveTo(30.3,
            155.6, 30.6, 155.7, 30.9, 155.9);
            a.bezierCurveTo(35.6, 158.3, 40.5, 158.4, 45.5, 156.1);
            a.lineTo(45.7, 156);
            a.bezierCurveTo(45.9, 155.7, 45.8, 155.3, 45.6, 154.7);
            a.bezierCurveTo(44.1, 152.6, 42.4, 150.6, 40.4, 148.8);
            a.closePath();
            a.moveTo(87.9, 175.9);
            a.bezierCurveTo(83.2, 173.8, 79.9, 172.3, 77.9, 171.4);
            a.bezierCurveTo(75.9, 170.5, 74.1, 169.6, 72.4, 168.8);
            a.bezierCurveTo(70.7, 167.9, 69.1, 167.1, 67.5, 166.3);
            a.bezierCurveTo(67.7, 166.8, 67.8, 167.3, 68, 167.8);
            a.lineTo(69, 170.1);
            a.bezierCurveTo(70.1, 172.9, 71.3, 175.7, 72.5, 178.3);
            a.bezierCurveTo(74,
            181.3, 76, 184.1, 78.6, 186.6);
            a.bezierCurveTo(81.1, 189.2, 83.9, 189.9, 87.1, 188.9);
            a.bezierCurveTo(90.2, 187.9, 93.2, 186.5, 96.3, 184.7);
            a.lineTo(96.8, 184.3);
            a.lineTo(97.1, 184.2);
            a.lineTo(101.1, 181.4);
            a.bezierCurveTo(100.4, 181.2, 99.2, 180.7, 97.5, 180);
            a.bezierCurveTo(95.7, 179.3, 92.5, 177.9, 87.9, 175.9);
            a.closePath();
            a.moveTo(167.5, 169.3);
            a.bezierCurveTo(164.4, 171.1, 161.2, 172.9, 158.1, 174.8);
            a.bezierCurveTo(155.3, 176.5, 152.5, 178, 149.6, 179.4);
            a.bezierCurveTo(148.9, 179.7, 148.2, 180, 147.5, 180.4);
            a.bezierCurveTo(145,
            181.4, 142.8, 182.1, 140.9, 182.4);
            a.lineTo(146.3, 184.3);
            a.lineTo(146.7, 184.5);
            a.lineTo(147.2, 184.7);
            a.bezierCurveTo(149.5, 185.5, 151.9, 186.4, 154.4, 187.3);
            a.bezierCurveTo(157.5, 188.5, 160.6, 188.4, 163.6, 187.2);
            a.bezierCurveTo(166.3, 186.1, 168.3, 184.5, 169.6, 182.2);
            a.bezierCurveTo(171.1, 179.7, 172.2, 177.2, 173.1, 174.5);
            a.bezierCurveTo(173.5, 173.3, 174, 172.1, 174.4, 170.9);
            a.lineTo(174.7, 170.3);
            a.lineTo(174.9, 169.8);
            a.lineTo(177.9, 163.2);
            a.bezierCurveTo(177.6, 163.5, 177.2, 163.7, 176.8, 163.9);
            a.bezierCurveTo(173.7,
            165.9, 170.7, 167.7, 167.5, 169.3);
            a.closePath();
            a.moveTo(202.2, 94.7);
            a.bezierCurveTo(202.5, 86.8, 201.1, 79.7, 197.8, 73.5);
            a.bezierCurveTo(196.1, 70.1, 193.9, 67, 191.1, 64.1);
            a.bezierCurveTo(190.6, 63.5, 190, 63, 189.4, 62.4);
            a.bezierCurveTo(183.4, 56.7, 176.5, 53, 168.8, 51.2);
            a.bezierCurveTo(165.7, 50.5, 162.5, 50.1, 159.2, 50.1);
            a.bezierCurveTo(159.1, 50.1, 158.9, 50.1, 158.7, 50.1);
            a.bezierCurveTo(146.1, 51.7, 136, 57.6, 128.6, 67.7);
            a.bezierCurveTo(127.5, 69.4, 126.3, 71.1, 125, 72.9);
            a.bezierCurveTo(124.9, 73.2, 124.7, 73.5, 124.6, 73.8);
            a.lineTo(124.4, 74.2);
            a.lineTo(124.2, 73.8);
            a.lineTo(120.8, 67.4);
            a.bezierCurveTo(117.3, 59.5, 111.9, 53.4, 104.4, 49.1);
            a.bezierCurveTo(100, 46.5, 95.6, 44.9, 91.3, 44.1);
            a.bezierCurveTo(89.3, 43.8, 87.3, 43.6, 85.3, 43.7);
            a.bezierCurveTo(77.8, 43.8, 70.4, 46.7, 63, 52.3);
            a.bezierCurveTo(57.3, 56.8, 52.7, 61.9, 49.2, 67.7);
            a.bezierCurveTo(47.7, 70.1, 46.5, 72.7, 45.5, 75.3);
            a.bezierCurveTo(43.6, 79.9, 42.4, 84.8, 41.7, 90.1);
            a.bezierCurveTo(40.4, 101.7, 42.2, 111.4, 47.4, 119.3);
            a.bezierCurveTo(49.2, 122.2, 51.5, 124.9, 54.2, 127.3);
            a.bezierCurveTo(64.3,
            136.3, 75.9, 139.1, 88.9, 135.6);
            a.bezierCurveTo(100.6, 132.5, 110.3, 125.2, 118, 113.7);
            a.bezierCurveTo(118.8, 112.4, 119.7, 111, 120.5, 109.6);
            a.bezierCurveTo(121.2, 108.3, 121.9, 106.9, 122.6, 105.5);
            a.bezierCurveTo(122.9, 106.7, 123.3, 107.9, 123.8, 109);
            a.bezierCurveTo(124.3, 110.4, 124.9, 111.7, 125.6, 113);
            a.bezierCurveTo(130.4, 122.6, 137.6, 129.8, 147.3, 134.6);
            a.bezierCurveTo(149.4, 135.6, 153.1, 136.4, 158.5, 137);
            a.bezierCurveTo(168.3, 137.9, 177.6, 134.4, 186.7, 126.4);
            a.bezierCurveTo(193.1, 120.7, 197.5, 114.2, 199.9, 107.1);
            a.bezierCurveTo(201.3,
            103.2, 202, 99, 202.2, 94.7);
            a.closePath();
            a.fillStyle = "rgb(255, 255, 255)";
            a.fill();
            a.save();
            a.translate(g, 0);
            a.beginPath();
            a.moveTo(101.3, 71.1);
            a.bezierCurveTo(101, 71.1, 100.7, 71.2, 100.5, 71.3);
            a.bezierCurveTo(100.5, 71.3, 100.5, 71.3, 100.5, 71.3);
            a.bezierCurveTo(102.7, 72.9, 103.8, 75.8, 104, 79.9);
            a.bezierCurveTo(104.1, 84.2, 100.5, 86.1, 93, 85.6);
            a.bezierCurveTo(91, 85.5, 89.2, 85.4, 87.8, 85.3);
            a.bezierCurveTo(87.7, 86.6, 87.6, 87.9, 87.6, 89.3);
            a.bezierCurveTo(87.8, 91.8, 88.6, 94.3, 89.9, 96.7);
            a.bezierCurveTo(91.9, 101.5,
            95.2, 103.9, 99.8, 103.9);
            a.bezierCurveTo(107.4, 103.7, 112.3, 98, 114.7, 86.8);
            a.bezierCurveTo(114.7, 74.4, 110.2, 69.2, 101.3, 71.1);
            a.closePath();
            a.fillStyle = "rgb(0, 0, 0)";
            a.fill();
            a.restore();
            a.save();
            a.translate(h, 0);
            a.beginPath();
            a.moveTo(150.4, 74.1);
            a.bezierCurveTo(147.9, 71.7, 145.3, 70.5, 142.4, 70.5);
            a.bezierCurveTo(141.5, 70.5, 140.5, 70.7, 139.6, 71);
            a.bezierCurveTo(140.1, 71.3, 140.6, 71.6, 141.1, 72);
            a.bezierCurveTo(143.3, 73.6, 144.5, 76.5, 144.6, 80.6);
            a.bezierCurveTo(144.8, 84.9, 141.1, 86.8, 133.7, 86.3);
            a.bezierCurveTo(132.1,
            86.2, 130.8, 86.2, 129.6, 86.1);
            a.bezierCurveTo(129.6, 86.2, 129.6, 86.2, 129.6, 86.3);
            a.bezierCurveTo(129.6, 89.1, 130.2, 91.7, 131.5, 94.1);
            a.bezierCurveTo(134.1, 99, 138.3, 101.5, 144, 101.5);
            a.bezierCurveTo(146.8, 101.7, 149.7, 99.7, 152.5, 95.6);
            a.bezierCurveTo(154.5, 91.6, 155.5, 88.9, 155.5, 87.5);
            a.bezierCurveTo(155.5, 81.9, 153.8, 77.5, 150.4, 74.1);
            a.closePath();
            a.fillStyle = "rgb(0, 0, 0)";
            a.fill();
            a.restore();
            a.restore();
            a.restore()
        }
        function b() {
            $("#dpic").removeClass();
            $("#dframe").animate({
                top: he.f(50),
                scale: 0.2
            }, 350,
                "easeInExpo");
            $("#dmsg").animate({
                top: he.f(50),
                scale: 0.2
            }, 350, "easeInExpo");
            $("#dshareBtn").fadeTo(200, 0);
            $("#d").delay(200).fadeOut(200, function () {
                je.kg();
                g = j;
                $("#gameBtnTray").show()
            })
        }
        var c, d, e = he.f(2.2);
        this.eb = function () {
            d = document.getElementById("e");
            d.width = he.f(1024);
            d.height = he.f(576);
            if (c = document.getElementById("moreCanvas")) {
                c.width = 51;
                c.height = 51
            }
            $("#dshareBtn").click(function () {
                Kc.Ls(R.T(P.Vp), S.hx() + "drawing" + g + ".jpg", function () {
                    b();
                    return i
                });
                return l
            });
            $("#d").click(function () {
                b()
            });
            $("#moreLink").mouseenter(function () {
                if (!h) {
                    h = i;
                    var b = function () {
                        var c = +new Date - e;
                        if (c < W) g = 0 - ie.Am(c, 0, 100, W);
                        else if (c < ha) {
                            if (c > W + 100) D = z = -1 * ie.We(c - (W + 100), 0, 10, ha - (W + 100))
                        } else if (c < Q) D = z = -10 + ie.Zi(c - ha, 20, Q - ha);
                        else if (c < ga) {
                            if (c > Q + 100) D = z = 10 - ie.Zi(c - (Q + 100), 10, ga - (Q + 100))
                        } else c < ka || c < da && (s = ie.We(c - ka, E, 50, da - ka));
                        c > W && c < Q && (ea = ie.Yi(c - W, 0.02, Q - W, 6));
                        c > Q && c < ka && (ea = 0.02 - ie.Yi(c - Q, 0.02, ka - Q, 2));
                        var Ea = 0 + r,
                            db = 75 + s + g;
                        d.save();
                        d.rotate(30 * Math.PI / 180);
                        a(d, 0.32, 0.32 + ea, Ea, db, z, D);
                        d.restore();
                        c < da ? window.requestAnimationFrame(b) : h = l
                    }, d = c.getContext("2d"),
                        e = +new Date,
                        g = 0.1,
                        r = 0,
                        s = 0,
                        z = 0,
                        D = 0,
                        E = r,
                        W = 600,
                        ha = 400 + W,
                        Q = 600 + ha,
                        ga = 700 + Q,
                        ka = 500 + ga,
                        da = 800 + ka,
                        ea = 0;
                    window.requestAnimationFrame(b)
                }
            }).click(function () {
                Analytics.iw("SMG_MRTINX_CTR_SITE_BehindtheScenes")
            })
        };
        this.Pe = function () {
            J.subscribe(J.v.cc, function () {
                O.ya({
                    text: R.T(P.Ro),
                    mh: "dmsg",
                    qa: i
                });
                O.ya({
                    text: R.T(P.Up),
                    Oc: "#dshareBtn img",
                    qa: i
                })
            });
            J.subscribe(J.v.Fp, this.eA);
            J.subscribe(J.v.No, this.On)
        };
        var g = j;
        this.On = function (a) {
            g = a + 1;
            je.hg();
            $("#gameBtnTray").hide();
            $("#dpic").addClass("drawing" + g);
            $("#dframe").animate({
                top: he.f(100),
                scale: 0.35
            }, 0);
            $("#dframe").fadeTo(0, 0);
            $("#dmsg").animate({
                top: he.f(60),
                scale: 0.5
            }, 0);
            $("#dmsg").fadeTo(0, 0);
            $("#dshareBtn").fadeTo(0, 0);
            $("#d").fadeIn(100, function () {
                $("#dframe").fadeTo(0, 1);
                $("#dmsg").fadeTo(0, 1);
                $("#dframe").animate({
                    top: 0,
                    scale: 1
                }, 350, "easeOutBack");
                $("#dmsg").animate({
                    top: 0,
                    scale: 1
                }, 350, "easeOutBack");
                $("#dshareBtn").delay(600).fadeTo(200, 1)
            })
        };
        var h = l;
        this.eA = function () {
            var b = d.getContext("2d");
            je.hg();
            $("#e").fadeIn(function () {
                function c() {
                    var Z = +new Date - d;
                    if (Z < ga) {
                        g = ie.Am(Z, W, e, ga);
                        h = ie.Am(Z, ha, e, ga)
                    } else if (Z < ka) {
                        if (Z > ga + 100) E = D = -1 * ie.We(Z - (ga + 100), 0, he.f(10), ka - (ga + 100))
                    } else if (Z < da) E = D = he.f(-10) + ie.Zi(Z - ka, he.f(20), da - ka);
                    else if (Z < ea) {
                        if (Z > da + 100) E = D = he.f(10) - ie.Zi(Z - (da + 100), he.f(10), ea - (da + 100))
                    } else if (!(Z < ya) && Z < Ea) {
                        z = ie.We(Z - ya, Q, he.f(300), Ea - ya);
                        g = he.f(e) - ie.We(Z - ya, 0, he.f(2), ga);
                        h = he.f(e) - ie.We(Z - ya, 0, he.f(2), ga)
                    }
                    Z > ga && Z < da && (db = ie.Yi(Z - ga, 0.1, da - ga, 6));
                    Z > da && Z < ya && (db = 0.1 - ie.Yi(Z - da, 0.1, ya - da, 2));
                    if (Z < Ea) window.requestAnimationFrame(c);
                    else {
                        $("#e").fadeOut();
                        je.kg()
                    }
                    var Z = s + (he.f(500) - g / e * he.f(200)),
                        $d = z + (he.f(600) - h / e * he.f(400));
                    a(b, g, h + db, Z, $d, D, E)
                }
                var d = +new Date,
                    g = 0.1,
                    h = 0.1,
                    s = 0,
                    z = 0,
                    D = 0,
                    E = 0,
                    W = g,
                    ha = h,
                    Q = s,
                    ga = 600,
                    ka = 400 + ga,
                    da = 600 + ka,
                    ea = 700 + da,
                    ya = 500 + ea,
                    Ea = 800 + ya,
                    db = 0;
                window.requestAnimationFrame(c)
            })
        }
    };
    for (var ke = ["ms", "moz", "webkit", "o"], le = 0; le < ke.length && !window.requestAnimationFrame; le++) window.requestAnimationFrame = window[ke[le] + "RequestAnimationFrame"];

	
    if (!window.requestAnimationFrame) {
        var me = 1E3 / 60,
            ne = 0;
        window.requestAnimationFrame = function (a) {
		var b = +new Date,
                c = Math.max(0, me - (b - ne));
            window.setTimeout(function () {
                a(+new Date)
            }, c);
            ne = b + c
        }
    }
    var oe;

    function pe() {
        var a = document.getElementById("vid");
        /*
        if (!a) {
            try {
                a = document.createElement("video")
            } catch (b) {
                return j
            }
            a.id = "vid";
            a.className = "ctrPointer";
            $("#video").append(a)
        }*/
        return a
    }
    var qe = {
        cs: function () {
            if (!Qa.Lr()) {
                var a = pe(),
                    b = L.Qq,
                    c = S.Qr(),
                    d = S.gu;
                if (a != j && c != j) try {
                    a.src = d + "intro_" + b + c;
                    a.load()
                } catch (e) {}
            }
        },
        Sy: function () {
            var a = document.getElementById("vid");
            if (!Qa.Lr() && a) {
                var b = a.readyState;
                if (b === 2 || b === 3 || b === 4) {
                    U.Gh();
                    $(a).fadeIn(300, function () {
                        a.play()
                    });
                    a.addEventListener("ended", qe.qr);
                    a.addEventListener("mousedown", qe.qr);
                    return
                }
            }
            a && $(a).remove();
            Ic.hb(I.vm ? Xb.Zc : Xb.yd)
        },
        qr: function () {
            Ic.hb(I.vm ? Xb.Zc : Xb.yd, i);
            var a = $("#vid");
            a.fadeOut(500, function () {
                a[0].pause();
                a[0].seek = 0;
                a.remove();
                Qa.Ez(i)
            })
        },
        Vx: function () {
            var a = pe(),
                b = L.Qq,
                c = S.Qr(),
                d = S.gu;
            if (a != j && c != j) try {
                a.src = d + "outro_" + b + c;
                a.load()
            } catch (e) {}
        },
        Ty: function () {
            var a = document.getElementById("vid");
            if (a) {
                var b = a.readyState;
                if (b === 2 || b === 3 || b === 4) {
                    U.Gh();
                    $(a).fadeIn(300, function () {
                        a.play()
                    });
                    a.addEventListener("ended", qe.rr);
                    a.addEventListener("mousedown", qe.rr)
                } else {
                    $(a).remove();
                    Ic.hb(Xb.Bg, l)
                }
            }
        },
        rr: function () {
            Ic.hb(Xb.Bg, i);
            var a = $("#vid");
            a.fadeOut(500, function () {
                a[0].pause();
                a[0].seek = 0;
                a.remove()
            })
        },
        eb: function () {
            this.cs()
        }
    };
    J.subscribe(J.v.Ap, function () {
        qe.cs()
    });
    oe = qe;
    var re = j,
        T = Fc,
        Y = Xb,
        se = Ic,
        te = ub,
        ue = ee,
        ve = {
            eb: function () {
                re = $("#gameBorder")
            },
            wz: function (a) {
                a = (a = I.er[a]) ? S.Tc + a : "";
                re.removeClass("gameComplete").css("background-image", "url(" + a + ")")
            },
            Dz: function () {
                re.css("background-image", "").addClass("gameComplete")
            },
            hide: function () {
                re.hide()
            },
            show: function () {
                re.show()
            },
            fadeIn: function (a, b) {
                re.delay(b || 0).fadeIn(a)
            },
            fadeOut: function (a, b) {
                re.delay(b || 0).fadeOut(a)
            }
        }, we = new function () {
            function a(a, b, c) {
                var c = c || Q.getContext("2d"),
                    d = ga[T.cb],
                    e = Q.width / 2,
                    b = e - e * (1 - (b || 0));
                c.save();
                c.setTransform(1, 0, 0, 1, 0, 0);
                c.clearRect(0, 0, Q.width, Q.height);
                c.restore();
                c.drawImage(d, -1 * b, 0);
                a && c.drawImage(ka, e - L.f(26) - b, L.f(10));
                c.save();
                c.translate(Q.width, 0);
                c.scale(-1, 1);
                c.drawImage(d, -1 * b, 0);
                c.restore();
                a && c.drawImage(da, e + b, L.f(10))
            }
            function b() {
                $("#levelMenu").hide()
            }
            function c() {
                ue.hg();
                $("#levelMenu").show()
            }
            function d() {
                if (T.cb >= T.Ys() - 1) {
                    ve.hide();
                    oe.Ty()
                } else {
                    s.Wm = i;
                    se.hb(I.vm ? Y.yb : Y.yd, l)
                }
            }
            function e() {
			
                $("#resultScore").text(ya[Ea]);
		
		        Ea++;
                Ea < ea.length && (Ea < db ? setTimeout(function () {
                    e()
                },
                10) : setTimeout(function () {
                    e()
                }, 167))
            }
            function g() {
                s.le = i;
                W != j && clearTimeout(W);
                W = setTimeout(function () {
                    s.le = l;
                    W = j
                }, 1E3)
            }
            function h(c) {
                c == Y.yb || c == Y.yd || c == Y.Sd ? ve.fadeOut(300) : c !== Y.Zc && ve.show();
                c !== Y.pi && b();
                (c === Y.yb || c === Y.Zc) && U.Hh(C.Li);
                var d = se.Nr(Y.yd);
                if (c == Y.yd) {
                    T.$t();
                    Cb.kk();
                    d.Dy();
                    if (s.Wm) {
                        s.Wm = l;
                        setTimeout(function () {
                            $("#levelResults").hide();
                            d.iA()
                        }, 800)
                    } else {
                        clearTimeout(E);
                        E = setTimeout(function () {
                            d.nw()
                        }, 300)
                    }
                } else d.wy();
                if (c == Y.Zc) {
                    a(i, 0);
                    for (var c = Cb.Vb(T.cb), e = 0; e < c; e++) {
                        var f = $("#option" + (e + 1));
                        if (f != j) if (e < c) {
                            f.show();
                            var g = Cb.px(e);
                            if (g != j) {
                                f.removeClass("locked").addClass("open");
                                f.removeClass("ctrCursor").addClass("ctrPointer");
                                var h = $(O.ya({
                                    text: e + 1,
                                    qa: i
                                })),
                                    g = $("<div>").addClass("stars" + g);
                                f.empty().append($("<div class='txt'/>").append(h).append(g))
                            } else {
                                f.removeClass("open").addClass("locked");
                                f.removeClass("ctrPointer").addClass("ctrCursor");
                                f.html("")
                            }
                        } else f.hide()
                    }
                    c = Cb.dm(T.cb) + "/" + Cb.Vb(T.cb) * 3;
                    O.ya({
                        text: c,
                        Oc: "#levelScore img",
                        qa: i
                    });
                    T.$t();
                    Cb.kk();
                    $("#levelScore").delay(200).fadeIn(700);
                    $("#levelBack").delay(200).fadeIn(700);
                    $("#levelOptions").delay(200).fadeIn(700);
                    $("#levelResults").delay(200).fadeOut(700)
                } else if (c == Y.Ee) q(l);
                else if (c === Y.Bg) {
                    $("#levelResults").hide();
                    ve.Dz();
                    c = R.T(P.Uo).replace("%d", Cb.xf());
                    O.ya({
                        text: c,
                        Oc: "#finalScore img",
                        scale: 0.8 * L.dc
                    });
                    $("#congrats").empty().append(O.ya({
                        text: R.T(P.Bo),
                        scale: 1.2 * L.dc
                    }));
                    O.ya({
                        text: R.T(P.Wp),
                        Oc: "#finalShareBtn img",
                        scale: 0.8 * L.dc,
                        bn: L.f(130)
                    });
                    O.ya({
                        text: R.T(P.Ep),
                        Oc: "#finalFunBtn img",
                        scale: 0.8 * L.dc,
                        bn: L.f(310)
                    })
                } else c == Y.Sd ? J.Aa(J.v.vq) : c == Y.Ae ? J.Aa(J.v.Oq) : c == Y.Ie && J.Aa(J.v.Oq)
            }
            function f(e) {
                if (e == Y.yb) {
                    $("#playBtn").click(function () {
                        U.G(C.ga);
                        Pb.vs && Pb.vs();
                        oe.Sy()
                    });
                    $("#optionsBtn").click(function () {
                        U.G(C.ga);
                        S.MB ? J.Aa(J.v.Fv) : se.hb(Y.Sd)
                    });
                    $("#achievementsBtn").click(function () {
                        if (D) {
                            U.G(C.ga);
                            se.hb(Y.Ae)
                        }
                    }).toggleClass("disabled", !D);
                    $("#leaderboardsBtn").click(function () {
                        if (D) {
                            U.G(C.ga);
                            se.hb(Y.Ie)
                        }
                    }).toggleClass("disabled", !D);
                    $("#slowComputerBtn").click(function () {
                        U.G(C.ga);
                        s.Ui()
                    });
                    var f = j;
                    $("#resetYesBtn").on(Yb.Un,

                    function () {
                        U.G(C.ga);
                        f = setTimeout(function () {
                            s.Ui();
                            f = j;
                            Qa.clear();
                            Cb.ez();
                            T.gz()
                        }, 3E3)
                    }).on(Yb.Bm, function () {
                        f != j && clearTimeout(f)
                    });
                    $("#resetNoBtn").click(function () {
                        U.G(C.ga);
                        s.Ui()
                    });
                    q(l);
                    $("#optionSound").click(function () {
                        q(i, "optionMsg")
                    });
                    if (s.fu) {
                        $("#optionHd").addClass("activeResolution");
                        $("#optionSd").addClass("inActiveResolution");
                        $("#optionSd").addClass("ctrPointer");
                        $("#optionSd").hover(function () {
                            p("optionMsg", R.T(P.Op), 4E3)
                        }, function () {
                            $("#optionMsg").stop(i, i).fadeOut(500)
                        });
                        e = "optionSd"
                    } else {
                        $("#optionSd").addClass("activeResolution");
                        $("#optionHd").addClass("inActiveResolution");
                        $("#optionHd").addClass("ctrPointer");
                        $("#optionHd").hover(function () {
                            p("optionMsg", R.T(P.Np), 4E3)
                        }, function () {
                            $("#optionMsg").stop(i, i).fadeOut(500)
                        });
                        e = "optionHd"
                    }
                    $("#" + e).click(function () {
                        Qa.Fz(!s.fu);
                        window.location.reload()
                    });
                    J.subscribe(J.v.cc, function () {
                        r("#playBtn img", P.nv);
                        r("#optionsBtn img", P.Sd);
                        r("#resetYesBtn img", P.Tv);
                        r("#resetNoBtn img", P.kv);
                        O.ya({
                            text: R.T(P.Ie),
                            uc: "leaderboardsBtn",
                            scale: 0.8 * L.dc
                        });
                        O.ya({
                            text: R.T(P.Ae),
                            uc: "achievementsBtn",
                            scale: 0.8 * L.dc
                        })
                    })
                } else if (e == Y.yd) {
                    $("#boxBack").click(function () {
                        U.G(C.ga);
                        se.hb(Y.yb)
                    });
                    se.Nr(e).init(we)
                } else if (e == Y.Zc) {
                    a(i, 0);
                    var e = Cb.Vb(T.cb),
                        h = $("#levelOptions"),
                        k = 0,
                        z = 0,
                        E = L.f(420),
                        Q = L.f(153),
                        W = "";
                    if (e > 9) {
                        k = -30;
                        z = -40;
                        E = L.f(420);
                        Q = L.f(101);
                        W = "option-small"
                    }
                    for (var Z = k, da, ea = 0; ea < e; ea++) {
                        da = h.append('<div id="option' + (ea + 1) + '" class="option ' + W + ' locked ctrPointer" style="left: ' + Z + "px; top: " + z + 'px;">').children().last()[0];
                        Z = Z + Q;
                        if (Z > E) {
                            Z = k;
                            z = z + Q
                        }
                        da.Jd = ea;
                        da.addEventListener("click", function (a) {
                            U.G(C.ga);
                            a = a.currentTarget.Jd;
                            Cb.Ex(a) && ha(a + 1)
                        }, l)
                    }
                    $("#levelBack").click(function () {
                        U.G(C.ga);
                        se.hb(I.vm ? Y.yb : Y.yd)
                    })
                } else if (e == Y.Ee) {
                    $("#gameRestartBtn").click(function () {
                        if (!s.le) {
                            U.G(C.ga);
                            ha(T.Cb, i)
                        }
                    });
                    $("#gameMenuBtn").click(function () {
                        if (!s.le) {
                            U.G(C.ga);
                            c()
                        }
                    })
                } else if (e == Y.pi) {
                    $("#continueBtn").click(function () {
                        U.G(C.ga);
                        b();
                        ue.kg()
                    });
                    $("#skipBtn").click(function () {
                        U.G(C.ga);
                        b();
                        if (Cb.Vb(T.cb) > T.Cb) {
                            Cb.Th(T.cb, T.Cb, 0);
                            ha(T.Cb + 1, l, i)
                        } else {
                            $("#gameBtnTray").hide();
                            d()
                        }
                    });
                    $("#selectBtn").click(function () {
                        U.G(C.ga);
                        b();
                        ue.Ft();
                        s.ag = i;
                        s.qh = l;
                        s.qm()
                    });
                    $("#menuBtn").click(function () {
                        U.G(C.ga);
                        b();
                        ue.Ft();
                        s.ag = i;
                        s.qh = i;
                        s.qm()
                    });
                    q(l);
                    $("#gameSound").click(function () {
                        q(i, "gameMsg")
                    });
                    J.subscribe(J.v.cc, function () {
                        r("#continueBtn img", P.su);
                        r("#skipBtn img", P.tv);
                        r("#selectBtn img", P.dv);
                        r("#menuBtn img", P.fv)
                    })
                } else if (e == Y.zp) {
                    $("#nextBtn").click(function () {
                        if (!s.le) {
                            g();
                            U.G(C.ga);
                            Cb.Vb(T.cb) > T.Cb ? ha(T.Cb + 1) : d()
                        }
                    });
                    $("#replayBtn").click(function () {
                        if (!s.le) {
                            g();
                            U.G(C.ga);
                            ha(T.Cb)
                        }
                    });
                    $("#lrMenuBtn").click(function () {
                        if (!s.le) {
                            g();
                            U.G(C.ga);
                            s.ag = i;
                            s.qh = l;
                            s.It()
                        }
                    });
                    J.subscribe(J.v.cc, function () {
                        r("#nextBtn img", P.NEXT);
                        r("#replayBtn img", P.Kb);
                        r("#lrMenuBtn img", P.yb);
                        O.sc({
                            text: R.T(P.yu),
                            mh: "resultTickerMessage",
                            qa: i
                        })
                    })
                } else if (e == Y.Bg) {
                    $("#gameCompleteBack").click(function () {
                        U.G(C.ga);
                        se.hb(Y.yb);
                        ve.hide()
                    });
                    $("#finalShareBtn").click(function () {
                        var a = Cb.xf();
                        Kc.Ls(S.ix(a, T.Uy()), S.ox() + "score" + a + ".png", ia(i))
                    })
                } else if (e == Y.Sd) {
                    var ga = S.JA,
                        ka = $("#soundBtn");
                    S.Uz(ka, function () {
                        var a = !Qa.Jm();
                        U.Zj(a);
                        U.G(C.ga);
                        ga(ka, a);
                        q(l);
                        q(l)
                    });
                    var ya = S.HA,
                        Ea = $("#musicBtn");
                    S.Lz(Ea, function () {
                        U.G(C.ga);
                        var a = !Qa.Im();
                        U.Yj(a);
                        ya(Ea, a);
                        q(l);
                        q(l)
                    });
                    var Ce = S.GA;
                    S.Iz(function (a) {
                        U.G(C.ga);
                        if (a == j) {
                            a = I.Ym.indexOf(Qa.ih());
                            a = I.Ym[(a + 1) % I.Ym.length]
                        }
                        Qa.Hz(a);
                        J.Aa(J.v.cc)
                    });
                    var Rd = S.EA;
                    S.yz(function () {
                        U.G(C.ga);
                        var a = !Qa.Gm();
                        Qa.xz(a);
                        Rd(a)
                    });
                    var db = $("#resetBtn").click(function () {
                        var a = O.ya({
                            text: R.T(P.Qp),
                            Oe: n.M,
                            width: 1250 * L.bc,
                            qa: i
                        }),
                            b = O.sc({
                                text: R.T(P.Pp),
                                qa: i,
                                bn: L.f(550)
                            });
                        $("#resetText").empty().append($(a));
                        $("#resetHoldYes").empty().append($(b));
                        U.G(C.ga);
                        s.Qn("resetGame")
                    });
                    $("#optionsBack").click(function () {
                        U.G(C.ga);
                        se.hb(Y.yb)
                    });
                    S.sA(!I.Ew);
                    e = function () {
                        r("#optionsTitle img", P.Sd);
                        ga(ka, Qa.Jm());
                        ya(Ea, Qa.Im());
                        Ce();
                        Rd(Qa.Gm());
                        S.Sz(db, R.T(P.qv));
                        var a = Qa.ih();
                        $("#lang").removeClass("lang-en lang-de lang-ru lang-fr").addClass("lang-" + Ja.rA(a))
                    };
                    J.subscribe(J.v.cc, e);
                    J.subscribe(J.v.vq, e)
                } else e === Y.Ie ? $("#leaderboardBack").click(function () {
                    U.G(C.ga);
                    se.hb(Y.yb)
                }) : e === Y.Ae && $("#achievementsBack").click(function () {
                    U.G(C.ga);
                    se.hb(Y.yb)
                })
            }

            function k() {
                $("#achievementsBtn").toggleClass("disabled", !D);
                $("#leaderboardsBtn").toggleClass("disabled", !D)
            }
            function p(a, b, c) {
                if (a != aa) {
                    var c = c || 500,
                        a = $("#" + a),
                        d = a.find("img");
                    d.length === 0 && (d = $("<img/>").appendTo(a));
                    O.sc({
                        text: b,
                        ka: d[0],
                        qa: i,
                        alpha: 0.6
                    });
                    a.stop(i, i).fadeIn(500).delay(c).fadeOut(750)
                }
            }
            function q(a, b) {
                var c, d = U.rf,
                    e = U.Ah;
                if (a) {
                    if (d && e) {
                        d = i;
                        e = l
                    } else if (!d && !e) e = d = i;
                    else e = d = l;
                    U.Zj(d);
                    U.Yj(e)
                }
                c = d && !e ? "effectsOnly" : !d && !e ? "noSound" : "allSound";
                $("#optionSound").removeClass("effectsOnly noSound allSound").addClass(c);
                $("#gameSound").removeClass("effectsOnly noSound allSound").addClass(c);
                if (!e && !d) d = R.T(P.Qo);
                else {
                    c = e ? P.iv : P.hv;
                    d = d ? P.xv : P.wv;
                    d = R.T(P.lo).replace("{0}", R.T(c).toLowerCase()).replace("{1}", R.T(d).toLowerCase())
                }
                p(b, d)
            }
            function r(a, b) {
                O.ya({
                    text: R.T(b),
                    Oc: a,
                    qa: i
                })
            }
            var s = this;
            this.fu = L.Vm;
            this.le = this.nj = this.Wm = this.qh = this.ag = l;
            var z = Pa.AC || 30,
                D = l;
            J.subscribe(J.v.Xl, function () {
                D = i;
                k()
            });
            J.subscribe(J.v.Yl, function () {
                D = l;
                k()
            });
            var E = j,
                W = j,
                ha = this.EC = function (a, b) {
                    ve.fadeIn(650, 100);
                    T.Cb = a;
                    var c;
                    if (T.cb !== T.Ys() - 1) c = l;
                    else {
                        c = Cb.Vb(T.cb);
                        c = T.Cb !== c ? l : i
                    }
                    c && oe.Vx();
                    if (b) ue.Pj();
                    else {
                        se.hb(Y.Ee);
                        setTimeout(function () {
                            s.Ey()
                        }, 200)
                    }
                };
            this.Ey = function () {
                var a = $("#boxCutter"),
                    b = se.Vi == Y.Zc ? 400 : 0;
                $("#levelScore").fadeOut();
                $("#levelBack").fadeOut();
                $("#levelOptions").fadeOut(b, function () {
                    if (s.nj) {
                        $("#levelResults").fadeOut(800);
                        setTimeout(function () {
                            ue.Vn(T.cb + 1, T.Cb);
                            s.rn(l, function () {
                                s.Pn()
                            })
                        }, 400)
                    } else {
                        a.css("top", L.f(281));
                        a.delay(200).fadeIn(200, function () {
                            function b() {
							entry_cnt++;
                                var g = +new Date - d;
                                a.css("top", te.ah(g,
                                e, c - e, f));
                                if (g < f) window.requestAnimationFrame(b);
                                else {
                                    s.nj = i;
                                    a.fadeOut(300, function () {
                                        ue.Vn(T.cb + 1, T.Cb);
                                        s.rn(i, function () {
                                            s.Pn()
                                        })
                                    })
                                }
                            }
                            var c = L.f(-255),
                                d = +new Date,
                                e = parseInt(a.css("top"), 10),
                                f = 1E3;
							
							//Weiwei Added
							entry_start=(new Date()).getTime();
													
                            window.requestAnimationFrame(b)
                        })
                    }
                })
            };
            var Q = j,
                ga = [],
                ka = new Image,
                da = new Image;
            this.rn = function (b, c, d) {
                function e() {
                    var d = p(+new Date - g, 0, 1, h);
                    if (d < 1) {
                        a(b, f ? 1 - d : d, k);
                        window.requestAnimationFrame(e)
                    } else {
                        a(b, f ? 0 : 1, k);
                        f ? $("#levelPanel").show() : $("#levelPanel").hide();
                        c != j && c()
                    }
                }
                var f = d != j ? d : l,
                    g = +new Date,
                    h = 750,
                    k = Q.getContext("2d"),
                    p = d ? te.Br : te.ah;
					
					//Weiwei Added
					if (entry_cnt)
					{
						entry_end=(new Date()).getTime();
						entryFPS[cur_run-1]=((entry_cnt)/(entry_end-entry_start)*1000).toFixed(2);
						entry_cnt=0;
					}			
                window.requestAnimationFrame(e)
            };
            this.uw = function (a) {
                s.rn(l, a, i)
            };
            this.qm = function () {
                s.vw();
                setTimeout(function () {
                    s.ag || $("#levelResults").delay(750).fadeIn(250);
                    s.uw(function () {
                        s.ag ? s.It() : setTimeout(function () {
                            e()
                        }, 250)
                    })
                }, 250)
            };
            this.It = function () {
                var b = $("#tapeRoll"),
                    c = $("#levelTape");
                $("#levelResults").fadeOut(400);
                b.css("top", L.f(-14));
                b.delay(400).fadeIn(200, function () {
                    function d() {
                        var p = +new Date - f,
                            q = te.ah(p, h, e - h, k);
                        b.css("top", te.ah(p, g, e - g, k));
                        c.css("height",
                        q);
                        if (p < k) window.requestAnimationFrame(d);
                        else {
                            s.nj = l;
                            c.hide();
                            a(i);
                            b.fadeOut(400, function () {
                                setTimeout(function () {
                                    if (s.qh) se.hb(Y.yb, l);
                                    else {
                                        a(i, 0);
                                        se.hb(Y.Zc, i)
                                    }
                                }, 200)
                            })
                        }
                    }
                    var e = L.f(470);
                    L.f(553);
                    var f = +new Date,
                        g = parseInt(b.css("top"), 10),
                        h = L.f(63),
                        k = 1E3;
                    c.css("height", h);
                    c.show();
                    window.requestAnimationFrame(d)
                });
                if (s.qh) {
                    ve.fadeOut(800, 400);
                    U.Hh(C.Li);
                    setTimeout(ba(), 500)
                }
            };
            this.Pn = function () {
                $("#levelBackground").hide();
                Pa.st && I.Cr && $("#bg").show();
                $("#gameBtnTray").fadeIn()
            };
            this.vw = function () {
                a(l,
                1);
                g();
                $("#levelBackground").show();
                Pa.st && I.Cr && $("#bg").hide();
                $("#gameBtnTray").fadeOut()
            };
            this.Qn = function (a) {
                ue.hg();
                $(".popupOuterFrame").hide();
                $(".popupInnerFrame").hide();
                $("#popupWindow").fadeIn(500, function () {
                    $("#" + a).show();
                    $(".popupOuterFrame").fadeIn(500)
                })
            };
            this.Ui = function () {
                $("#popupWindow").fadeOut(500, function () {
                    ue.kg()
                })
            };
            var ea = [],
                ya = [],
                Ea = 0,
                db = 0;
            this.jn = function (a) {
                function b(a) {
                    var c = Math.floor(a / 60),
                        a = Math.round(a % 60);
                    return c + ":" + (a < 10 ? "0" + a : a)
                }
                var c = a.mb,
                    d = a.Wj,
                    e = a.time,
                    f, g = 0,
                    h = c * 1E3;
                Math.round((d - c * 1E3) / e);
                switch (c) {
                    case 3:
                        $("#resultStar1").removeClass("starEmpty").addClass("star");
                        $("#resultStar2").removeClass("starEmpty").addClass("star");
                        $("#resultStar3").removeClass("starEmpty").addClass("star");
                        f = R.T(P.cv);
                        break;
                    case 2:
                        $("#resultStar1").removeClass("starEmpty").addClass("star");
                        $("#resultStar2").removeClass("starEmpty").addClass("star");
                        $("#resultStar3").removeClass("star").addClass("starEmpty");
                        f = R.T(P.bv);
                        break;
                    case 1:
                        $("#resultStar1").removeClass("starEmpty").addClass("star");
                        $("#resultStar2").removeClass("star").addClass("starEmpty");
                        $("#resultStar3").removeClass("star").addClass("starEmpty");
                        f = R.T(P.av);
                        break;
                    default:
                        $("#resultStar1").removeClass("star").addClass("starEmpty");
                        $("#resultStar2").removeClass("star").addClass("starEmpty");
                        $("#resultStar3").removeClass("star").addClass("starEmpty");
                        f = R.T(P.$u)
                }
                O.ya({
                    text: f,
                    Oc: "#resultStatus img",
                    qa: i
                });
                var k = $("#resultTickerValue").hide(),
                    p = $("#resultTickerLabel").hide(),
                    q = $("#resultScore").empty().hide(),
                    r = $("#resultImproved").hide(),
                    D = $("#resultTickerMessage").hide();
                O.sc({
                    text: R.T(P.zv),
                    ka: p[0],
                    qa: i
                });
                O.sc({
                    text: h,
                    ka: k[0],
                    qa: i
                });
                $("#resultScore img").remove();
                setTimeout(function () {
				
				//Weiwei Added
				var res_start=(new Date()).getTime();


                    p.fadeIn(300);
                    k.fadeIn(300);
                    q.fadeIn(300, function () {
                        function a() {
                            O.sc({
                                text: R.T(P.Ov),
                                ka: p[0],
                                qa: i
                            });
                            p.fadeIn(300);
                            O.sc({
                                text: b(Math.ceil(e)),
                                ka: k[0],
                                qa: i
                            });
                            k.fadeIn(300, function () {
                                function a() {

								var res_end=(new Date()).getTime();
								calcResultFPS[cur_run-1]=((bonus_cnt+time_cnt)/(res_end-res_start)*1000).toFixed(2);
					
				
						if(cur_run==3)
							{				
								console.log("***************************************************************");
								console.log("********************************ALL FPS DATA*******************");
								console.log("***************************************************************");
				
						//		var msg1="BEFORE_CUT_FPS\t"+"AVG:"+((Number(beforeCutFPS[0])+Number(beforeCutFPS[1])+Number(beforeCutFPS[2]))/3).toFixed(2)+"\t"+"ALL RUNS:"+beforeCutFPS;
				
								var msg0="ENTRY_AVG_FPS           "+((Number(entryFPS[0])+Number(entryFPS[1])+Number(entryFPS[2]))/3).toFixed(2);
				
								var msg1="BEFORE_CUT_AVG_FPS      "+((Number(beforeCutFPS[0])+Number(beforeCutFPS[1])+Number(beforeCutFPS[2]))/3).toFixed(2);
				
								var msg2="AFTER_CUT_AVG_FPS       "+((Number(afterCutFPS[0])+Number(afterCutFPS[1])+Number(afterCutFPS[2]))/3).toFixed(2);
				
								var msg3="CALC_RESULT_AVG_FPS     "+((Number(calcResultFPS[0])+Number(calcResultFPS[1])+Number(calcResultFPS[2]))/3).toFixed(2);
				
								console.log(msg0);
								
								console.log(msg1);
				
								console.log(msg2);
				
								console.log(msg3);
				
								var aaa=((Number(beforeCutFPS[0])+Number(beforeCutFPS[1])+Number(beforeCutFPS[2]))/3).toFixed(2);
								var bbb=((Number(afterCutFPS[0])+Number(afterCutFPS[1])+Number(afterCutFPS[2]))/3).toFixed(2);

								pri_fps=((Number(aaa)+Number(bbb))/2).toFixed(2);
						//		alert(msg0+"\n"+msg1+"\n"+msg2+"\n"+msg3);
							}			
							
                                    D.fadeIn(300);
                                    Q != j && (Q > 0 && d > Q) && r.animate({
                                        scale: 2.5,
                                        opacity: 0
                                    }, 0, function () {
                                        r.css("display", "block");
                                        r.animate({
                                            scale: 1,
                                            opacity: 1
                                        }, 600, "easeInCubic")
                                    })
                                }
                                var c = Math.ceil(e),
                                    f = d - g,
                                    h = g + f,
                                    q = c,
                                    s = c > 10 ? c * 50 : 900;
                                s > 2E3 && (s = 2E3);
                                var s = s / 25,
                                    z = Math.round(f / s),
                                    E = c / s,

                                    W = setInterval(function () {
									
									//Weiwei Added
									time_cnt++;

                                        g = g + z;
                                        if (q <= 0) {
                                            q = 0;
                                            g = h;
                                            clearInterval(W);
                                            p.fadeOut(400);
                                            k.fadeOut(400, function () {
                                                a != j && a()
                                            })
                                        }
                                        O.sc({
                                            text: b(q),
                                            ka: k[0],
                                            qa: i
                                        });
                                        O.xr({
                                            text: g,
                                            uc: "resultScore",
                                            qa: i
                                        });
                                        q = q - E
                                    }, 25)
						
                            })
                        }
                        var c = h,
                            f = Math.round(h / 36),
                            q = setInterval(function () {
					
							//Weiwei Added
							bonus_cnt++;

                                c = c - f;
                                g = g + f;
                                if (c <= 0) {
                                    c = 0;
                                    g = h;
                                    clearInterval(q);
                                    p.fadeOut(400);
                                    k.fadeOut(400, function () {
                                        a != j && a()
                                    })
                                }
                                O.sc({
                                    text: c,
                                    ka: k[0],
                                    qa: i
                                });
                                O.xr({
                                    text: g,
                                    uc: "resultScore",
                                    qa: i
                                })
                            }, 25)
                    })
                }, 1E3);
                f = T.cb;
                var E = T.Cb,
                    Q = Cb.nx(f, E - 1);
                Cb.Tz(f, E - 1, d);
                Cb.Th(f, E - 1, c);
                Cb.Vb(f) > E && Cb.Th(f, E, 0);
                Cb.et(f);
                s.ag = l;
                s.qm();
                if (f === 0 && E === 1) {
	                Pb.us && Pb.us(a.Gr);
                    if (a.Gr < z && !S.QB) {
                        a = $("#slowComputer");
                        a.children("img").remove();
                        c = $(O.ya({
                            text: R.T(P.bq),
                            Oe: n.M,
                            width: 1200 * L.bc,
                            scale: 1.25 * L.dc
                        }));
                        f = $(O.ya({
                            text: R.T(P.aq),
                            width: 1200 * L.bc,
                            scale: 0.8 * L.dc
                        }));
                        f.css("margin-left", L.f(30));
                        a.append(c).append(f);
                        O.ya({
                            text: R.T(P.yp),
                            Oc: "#slowComputerBtn img",
                            scale: 0.8 * L.dc
                        });
                        setTimeout(function () {
                            s.Qn("slowComputer")
                        },
                        3E3)
                    }
                }
            };
            var Z = i;
            this.bu = function () {
                if ($(window).width() < L.f(1024) + 120 && Z) {
                    $("#moreLink").fadeOut(function () {
                        Z = l
                    });
                    $("#zenbox_tab").fadeOut()
                } else if ($(window).width() > L.f(1024) + 120 && !Z) {
                    $("#moreLink").fadeIn(function () {
                        Z = i
                    });
                    $("#zenbox_tab").fadeIn()
                }
            };
            this.Em = i;
            this.un = function () {
                se.Vi === Y.Ee && ue.Dx() && !s.le ? c() : U.Gh()
            };
            this.at = function () {
                se.Vi !== Y.pi && s.Em && U.Hn()
            };
            this.init = function () {
                Cb.load();
                se.mn = h
            };
            this.eb = function () {
                Q = document.getElementById("levelCanvas");
                Q.width = L.f(1024);
                Q.height = L.f(576);
                oe.eb();
                ge.eb();
                se.eb();
                ve.eb();
                $(window).blur(s.un);
                $(window).focus(s.at);
                $(window).resize(function () {
                    s.bu()
                })
            };
            this.Pe = function () {
                for (var a = 0, b = I.km.length; a < b; a++) {
                    var c = new Image;
                    c.src = S.Tc + I.km[a];
                    ga[a] = c
                }
                ka.src = S.Tc + "leveltape_left.png";
                da.src = S.Tc + "leveltape_right.png";
                J.subscribe(J.v.dl, this.jn);
                ge.Pe();
                se.Pe(f);
                T.Pe();
                J.Aa(J.v.cc);
                Pa.ow != j && Pa.Jd != j ? this.ly() : Qa.tt && se.hb(Y.yb, i);
                var d = this;
                J.subscribe(J.v.Mp, function () {
                    d.un()
                });
                J.subscribe(J.v.xu, function () {
                    d.Em = i;
                    d.at()
                });
                J.subscribe(J.v.uu,

                function () {
                    d.Em = l;
                    d.un()
                })
            };
            this.ly = function () {
                var a = Pa.ow - 1,
                    b = Pa.Jd - 1;
                se.hb(Y.Ee, i);
                T.cb = a;
                T.Cb = b + 1;
                ue.Vn(T.cb + 1, T.Cb);
                this.Pn()
            };
            this.Fy = function (b) {
                s.nj = l;
                a(i, 0);
                se.hb(Y.Zc);
                ve.wz(b)
            }
        }, xe = $,
        ye = {
            init: function () {
                function a(a, b) {
                    var e, g, h;
                    e = 0;
                    for (g = a.length; e < g; e++) {
                        h = a[e];
                        var s = new tb(d + H[h].path, b);
                        s.dz = h;
                        c.add(s)
                    }
                }
                function b(a, b) {
                    if (a) {
                        b = b || S.Tc;
                        e = 0;
                        for (g = a.length; e < g; e++) if (a[e]) {
                            h = b + a[e];
                            c.Ne(h, "MENU")
                        }
                    }
                }
                Xa.init();
                xb && xb.init();
                var c = new nb({
                    Ch: 3E4
                }),
                    d = S.Ur + L.xb + "/game/",
                    e, g, h;
                b(fb.Jy, S.Ur + "page/");
                b(fb.FC, S.Gn + "page/");
                b(I.fy);
                b(I.fr);
                b(I.er);
                b(I.km);
                b(I.Qw);
                b(I.Uw, S.Gn + (I.Tw || ""));
                c.Yq(function (a) {
                    var b = 100 * (a.rm / a.Zn);
                    xb && xb.my(b);
                    if (a.rm === a.Zn) {
                        yb = i;
                        Bb()
                    }
                }, ["MENU", "FONT"]);
                a(Ha.Gv, "FONT");
                a(I.ax, "GAME");
                a(I.$r, "GAME");
                a(I.as, "GAME");
                c.Yq(function (a) {
                    Xa.By(a.jc.dz, a.jc.ka)
                }, ["FONT", "GAME"]);
                c.start();
                wb.zy(function () {
                    zb = i;
                    Bb()
                });
                wb.start()
            },
            eb: function () {
                if (xb) {
                    xb.eb();
                    xb.show()
                }
            },
            Jn: function (a) {
                Ab = a;
                Bb()
            }
        }, ze = we;

    function Ae(a, b) {
        var c = window.ZeptoLab;
        c == j && (c = window.ZeptoLab = {});
        var d = c.ctr;
        d == j && (d = c.ctr = {});
        d[a] = b
    }
    Ae("forceHTML5Audio", Pa.Xw);
    window.showFpsCounter = function () {
        Qa.Hr = i
    };
    Ae("initFB", Kc.wx);
    Ae("initTwitter", Kc.zx);
    Ae("onLevelWon", function (a) {
        J.subscribe(J.v.dl, function () {
            a()
        })
    });
    Ae("pauseGame", function () {
        J.Aa(J.v.Mp)
    });
    var Be = {
        init: function () {
            ye.init();
            ze.init();
            J.Aa(J.v.nu)
        },
        eb: function () {
            Qa.Fw && typeof document.body.onselectstart != "undefined" && (document.body.onselectstart = ia(l));
            xe(".ctrCursor").on("mousedown mouseup", function () {
                xe(this).toggleClass("ctrCursorActive")
            });
            xe("body").addClass("ui-" + L.Jf);
            u.eb("c");
            u.element.width = L.xb;
            u.element.height = L.bb;
            xe(u.element).width(L.xb).height(L.bb);
            Zb.eb && Zb.eb();
            ye.eb();
            ze.eb();
            J.Aa(J.v.mu)
        },
        Jn: function () {
            ye.Jn(function () {
                ze.Pe();
                J.Aa(J.v.mo);
                xe(".hideBeforeLoad").fadeIn(500);
                ze.bu();
                xe("#gameFooterSocial").css("top", 0)
            })
        }
    };
    S.ey() && (Be.init(), $(document).ready(function () {
        Be.eb();
        Be.Jn()
    }));
})();
