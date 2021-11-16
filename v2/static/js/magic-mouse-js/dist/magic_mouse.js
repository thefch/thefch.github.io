/*! MagicMouse.js - v1.2.0
 * A lightweight javascript library to create some amazing effects for the mouse (cursor) on your website
 * https://github.com/dshongphuc/magic-mouse-js
 * Copyright (c) 2020 Phuc H. <dshongphuc@gmail.com> under MIT license; */
const STYLES = "\nbody #magicMouseCursor {\n  position: fixed;\n  width: 35px;\n  height: 35px;\n  border: 1px solid #fff;\n  border-radius: 50%;\n  z-index: 9999;\n  left: 0;\n  top: 0;\n  transition: transform 0.07s, width 0.3s, height 0.3s;\n  pointer-events: none; }\n  body #magicMouseCursor.cursor-square {\n    border-radius: 0; }\n\nbody #magicPointer {\n  height: 5px;\n  width: 5px;\n  top: 0;\n  left: 0;\n  position: fixed;\n  background: #fff;\n  border-radius: 50%;\n  pointer-events: none;\n  transition: background 0.2s, width 0.2s, height 0.2s, box-shadow 0.2s; }\n  body #magicPointer.is-hover {\n    background: red; }\n  body #magicPointer.pointer-blur {\n    height: 50px;\n    width: 50px;\n    background: none;\n    border: 1px solid #fff;\n    box-shadow: 0px 0px 15px -5px white; }\n  body #magicPointer.pointer-overlay {\n    height: 50px;\n    width: 50px;\n    mix-blend-mode: difference;\n    box-shadow: 0px 0px 15px -5px white; }\n\nbody .magic-hover {\n  transition: all 0.2s; }\n  body .magic-hover:hover {\n    cursor: none; }\n";
export const magicMouse = e => {
    if (!Modernizr.touchevents) {
        if ((e = e || {}).outerWidth = e.outerWidth || 30, e.outerHeight = e.outerHeight || 30, e.cursorOuter = e.cursorOuter || "circle-basic", e.hoverEffect = e.hoverEffect || "circle-move", e.hoverItemMove = e.hoverItemMove || !1, e.defaultCursor = e.defaultCursor || !1, "disable" != e.cursorOuter) {
            var t = document.createElement("div");
            t.setAttribute("id", "magicMouseCursor"), document.body.appendChild(t);
            var o = document.getElementById("magicMouseCursor");
            (() => {
                let e = document.createElement("style");
                e.type = "text/css", e.innerText = STYLES, document.head.appendChild(e)
            })()
        }
        if (!e.defaultCursor) {
            document.body.style.cursor = "none";
            var n = document.createElement("div");
            n.setAttribute("id", "magicPointer"), document.body.appendChild(n);
            var r = document.getElementById("magicPointer")
        }
        if (o) {
            o.style.width = e.outerWidth + "px", o.style.height = e.outerHeight + "px";
            var s = e.outerWidth,
                i = e.outerHeight,
                a = e.outerWidth,
                d = e.outerHeight
        }
        var c = 0,
            l = 0,
            u = 0,
            h = 0,
            f = !1;
        document.addEventListener("mousemove", (function (e) {
            u = e.clientX, h = e.clientY, setTimeout(() => {
                f || (c = e.clientX - s / 2, l = e.clientY - i / 2)
            }, 50)
        })), document.querySelectorAll(".magic-hover").forEach((t, o) => {
            t.addEventListener("mouseenter", o => {
                switch (e.hoverEffect) {
                    case "circle-move":
                        p(t), e.hoverItemMove && b(o, t);
                        break;
                    case "pointer-blur":
                        y(t, "pointer-blur");
                        break;
                    case "pointer-overlay":
                        y(t, "pointer-overlay")
                }
            }), t.addEventListener("mouseleave", o => {
                switch (t.style.transform = "translate3d(0,0,0)", e.hoverEffect) {
                    case "circle-move":
                        v();
                        break;
                    case "pointer-blur":
                        g("pointer-blur");
                        break;
                    case "pointer-overlay":
                        g("pointer-overlay")
                }
            })
        }), document.querySelectorAll(".no-cursor").forEach((e, t) => {
            e.addEventListener("mouseenter", e => {
                o.style.opacity = 0, r.style.opacity = 0, document.body.style.cursor = "auto"
            }), e.addEventListener("mouseleave", e => {
                o.style.opacity = 1, r.style.opacity = 1, document.body.style.cursor = "none"
            })
        });
        var m = () => {
            o && (o.style.transform = "matrix(1, 0, 0, 1, " + c + ", " + l + ")", o.style.width = s + "px", o.style.height = i + "px"), r && (r.style.transform = "matrix(1, 0, 0, 1, " + u + ", " + h + ") translate3d(-50%, -50%, 0)"), requestAnimationFrame(m)
        };
        requestAnimationFrame(m);
        const p = e => {
                if (f = !0, o) {
                    o.style.transition = "transform 0.2s, width 0.3s, height 0.3s, border-radius 0.2s", o.classList.add("is-hover");
                    var t = event.currentTarget.getBoundingClientRect();
                    e.classList.contains("magic-hover__square") ? (o.classList.add("cursor-square"), c = t.left, l = t.top, s = t.width, i = t.height) : (c = t.left, l = t.top, s = t.width, i = t.height)
                }
                r && r.classList.add("is-hover")
            },
            v = () => {
                f = !1, o && (s = a, i = d, o.style.transition = "transform 0.07s, width 0.3s, height 0.3s, border-radius 0.2s", o.classList.remove("cursor-square"), o.classList.remove("is-hover")), r && r.classList.remove("is-hover")
            },
            y = (e, t) => {
                r && r.classList.add(t)
            },
            g = e => {
                r && r.classList.remove(e)
            },
            b = (e, t) => {
                e.clientX, e.clientY, t.addEventListener("mousemove", e => {
                    t.style.transform = "matrix(1,0,0,1," + (e.offsetX - e.target.offsetWidth / 2) / 2 + ", " + (e.offsetY - e.target.offsetHeight / 2) / 2 + ")"
                })
            }
    }
}
/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-touchevents-setclasses !*/
;
! function (e, t, o) {
    function n(e, t) {
        return typeof e === t
    }

    function r() {
        return "function" != typeof t.createElement ? t.createElement(arguments[0]) : h ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", arguments[0]) : t.createElement.apply(t, arguments)
    }

    function s() {
        var e = t.body;
        return e || ((e = r(h ? "svg" : "body")).fake = !0), e
    }
    var i = [],
        a = [],
        d = {
            _version: "3.6.0",
            _config: {
                classPrefix: "",
                enableClasses: !0,
                enableJSClass: !0,
                usePrefixes: !0
            },
            _q: [],
            on: function (e, t) {
                var o = this;
                setTimeout((function () {
                    t(o[e])
                }), 0)
            },
            addTest: function (e, t, o) {
                a.push({
                    name: e,
                    fn: t,
                    options: o
                })
            },
            addAsyncTest: function (e) {
                a.push({
                    name: null,
                    fn: e
                })
            }
        },
        c = function () {};
    c.prototype = d, c = new c;
    var l = d._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
    d._prefixes = l;
    var u = t.documentElement,
        h = "svg" === u.nodeName.toLowerCase(),
        f = d.testStyles = function (e, o, n, i) {
            var a, d, c, l, h = "modernizr",
                f = r("div"),
                m = s();
            if (parseInt(n, 10))
                for (; n--;)(c = r("div")).id = i ? i[n] : h + (n + 1), f.appendChild(c);
            return (a = r("style")).type = "text/css", a.id = "s" + h, (m.fake ? m : f).appendChild(a), m.appendChild(f), a.styleSheet ? a.styleSheet.cssText = e : a.appendChild(t.createTextNode(e)), f.id = h, m.fake && (m.style.background = "", m.style.overflow = "hidden", l = u.style.overflow, u.style.overflow = "hidden", u.appendChild(m)), d = o(f, e), m.fake ? (m.parentNode.removeChild(m), u.style.overflow = l, u.offsetHeight) : f.parentNode.removeChild(f), !!d
        };
    c.addTest("touchevents", (function () {
            var o;
            if ("ontouchstart" in e || e.DocumentTouch && t instanceof DocumentTouch) o = !0;
            else {
                var n = ["@media (", l.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
                f(n, (function (e) {
                    o = 9 === e.offsetTop
                }))
            }
            return o
        })),
        function () {
            var e, t, o, r, s, d;
            for (var l in a)
                if (a.hasOwnProperty(l)) {
                    if (e = [], (t = a[l]).name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length))
                        for (o = 0; o < t.options.aliases.length; o++) e.push(t.options.aliases[o].toLowerCase());
                    for (r = n(t.fn, "function") ? t.fn() : t.fn, s = 0; s < e.length; s++) 1 === (d = e[s].split(".")).length ? c[d[0]] = r : (!c[d[0]] || c[d[0]] instanceof Boolean || (c[d[0]] = new Boolean(c[d[0]])), c[d[0]][d[1]] = r), i.push((r ? "" : "no-") + d.join("-"))
                }
        }(),
        function (e) {
            var t = u.className,
                o = c._config.classPrefix || "";
            if (h && (t = t.baseVal), c._config.enableJSClass) {
                var n = new RegExp("(^|\\s)" + o + "no-js(\\s|$)");
                t = t.replace(n, "$1" + o + "js$2")
            }
            c._config.enableClasses && (t += " " + o + e.join(" " + o), h ? u.className.baseVal = t : u.className = t)
        }(i), delete d.addTest, delete d.addAsyncTest;
    for (var m = 0; m < c._q.length; m++) c._q[m]();
    e.Modernizr = c
}(window, document);
export default magicMouse;