!function(c, g) {
  "object" == typeof exports && "undefined" != typeof module ? g(exports) : "function" == typeof define && define.amd ? define(["exports"], g) : g((c = "undefined" != typeof globalThis ? globalThis : c || self).leaflet = {})
}(this, function(c) {
  function g(a) {
      for (var b, e, r = 1, x = arguments.length; r < x; r++)
          for (b in e = arguments[r])
              a[b] = e[b];
      return a
  }
  function u() {}
  function p(a, b) {
      var e = Array.prototype.slice;
      if (a.bind)
          return a.bind.apply(a, e.call(arguments, 1));
      var r = e.call(arguments, 2);
      return function() {
          return a.apply(b, r.length ? r.concat(e.call(arguments)) : arguments)
      }
  }
  function d(a) {
      return "_leaflet_id"in a || (a._leaflet_id = ++Ac),
      a._leaflet_id
  }
  function m(a, b, e) {
      var r, x, D = function() {
          r = !1;
          x && (G.apply(e, x),
          x = !1)
      }, G = function() {
          r ? x = arguments : (a.apply(e, arguments),
          setTimeout(D, b),
          r = !0)
      };
      return G
  }
  function f(a, b, e) {
      var r = b[1];
      b = b[0];
      var x = r - b;
      return a === r && e ? a : ((a - b) % x + x) % x + b
  }
  function q() {
      return !1
  }
  function h(a, b) {
      if (!1 === b)
          return a;
      b = Math.pow(10, void 0 === b ? 6 : b);
      return Math.round(a * b) / b
  }
  function t(a) {
      return a.trim ? a.trim() : a.replace(/^\s+|\s+$/g, "")
  }
  function l(a) {
      return t(a).split(/\s+/)
  }
  function v(a, b) {
      for (var e in Object.prototype.hasOwnProperty.call(a, "options") || (a.options = a.options ? zb(a.options) : {}),
      b)
          a.options[e] = b[e];
      return a.options
  }
  function w(a, b, e) {
      var r, x = [];
      for (r in a)
          x.push(encodeURIComponent(e ? r.toUpperCase() : r) + "=" + encodeURIComponent(a[r]));
      return (b && -1 !== b.indexOf("?") ? "&" : "?") + x.join("&")
  }
  function y(a, b) {
      return a.replace(od, function(e, r) {
          r = b[r];
          if (void 0 === r)
              throw Error("No value provided for variable " + e);
          return "function" == typeof r ? r(b) : r
      })
  }
  function A(a, b) {
      for (var e = 0; e < a.length; e++)
          if (a[e] === b)
              return e;
      return -1
  }
  function C(a) {
      return window["webkit" + a] || window["moz" + a] || window["ms" + a]
  }
  function B(a) {
      var b = +new Date
        , e = Math.max(0, 16 - (b - Bc));
      return Bc = b + e,
      window.setTimeout(a, e)
  }
  function z(a, b, e) {
      if (!e || ac !== B)
          return ac.call(window, p(a, b));
      a.call(b)
  }
  function F(a) {
      a && Cc.call(window, a)
  }
  function I() {}
  function H(a, b, e) {
      this.x = e ? Math.round(a) : a;
      this.y = e ? Math.round(b) : b
  }
  function J(a, b, e) {
      return a instanceof H ? a : Aa(a) ? new H(a[0],a[1]) : null == a ? a : "object" == typeof a && "x"in a && "y"in a ? new H(a.x,a.y) : new H(a,b,e)
  }
  function O(a, b) {
      if (a) {
          a = b ? [a, b] : a;
          b = 0;
          for (var e = a.length; b < e; b++)
              this.extend(a[b])
      }
  }
  function P(a, b) {
      return !a || a instanceof O ? a : new O(a,b)
  }
  function N(a, b) {
      if (a) {
          a = b ? [a, b] : a;
          b = 0;
          for (var e = a.length; b < e; b++)
              this.extend(a[b])
      }
  }
  function T(a, b) {
      return a instanceof N ? a : new N(a,b)
  }
  function U(a, b, e) {
      if (isNaN(a) || isNaN(b))
          throw Error("Invalid LatLng object: (" + a + ", " + b + ")");
      this.lat = +a;
      this.lng = +b;
      void 0 !== e && (this.alt = +e)
  }
  function W(a, b, e) {
      return a instanceof U ? a : Aa(a) && "object" != typeof a[0] ? 3 === a.length ? new U(a[0],a[1],a[2]) : 2 === a.length ? new U(a[0],a[1]) : null : null == a ? a : "object" == typeof a && "lat"in a ? new U(a.lat,"lng"in a ? a.lng : a.lon,a.alt) : void 0 === b ? null : new U(a,b,e)
  }
  function ka(a, b, e, r) {
      if (Aa(a))
          return this._a = a[0],
          this._b = a[1],
          this._c = a[2],
          void (this._d = a[3]);
      this._a = a;
      this._b = b;
      this._c = e;
      this._d = r
  }
  function fa(a, b, e, r) {
      return new ka(a,b,e,r)
  }
  function ma(a) {
      return document.createElementNS("http://www.w3.org/2000/svg", a)
  }
  function pa(a, b) {
      for (var e, r, x, D, G = "", K = 0, Q = a.length; K < Q; K++) {
          e = 0;
          for (r = (x = a[K]).length; e < r; e++)
              G += (e ? "L" : "M") + (D = x[e]).x + " " + D.y;
          G += b ? S.svg ? "z" : "x" : ""
      }
      return G || "M0 0"
  }
  function ia(a) {
      return 0 <= navigator.userAgent.toLowerCase().indexOf(a)
  }
  function oa(a, b, e) {
      return "touchstart" !== b || Dc || (document.addEventListener(Ec, E, !0),
      document.addEventListener(Fc, M, !0),
      document.addEventListener(Gc, R, !0),
      document.addEventListener(Hc, R, !0),
      Dc = !0),
      Ic[b] ? (e = Ic[b].bind(this, e),
      a.addEventListener(bc[b], e, !1),
      e) : (console.warn("wrong event specified:", b),
      L.Util.falseFn)
  }
  function E(a) {
      Xa[a.pointerId] = a
  }
  function M(a) {
      Xa[a.pointerId] && (Xa[a.pointerId] = a)
  }
  function R(a) {
      delete Xa[a.pointerId]
  }
  function ca(a, b) {
      if (b.pointerType !== (b.MSPOINTER_TYPE_MOUSE || "mouse")) {
          for (var e in b.touches = [],
          Xa)
              b.touches.push(Xa[e]);
          b.changedTouches = [b];
          a(b)
      }
  }
  function ba(a, b) {
      function e(D) {
          var G;
          if (1 !== D.detail)
              r = D.detail;
          else if ("mouse" !== D.pointerType && (!D.sourceCapabilities || D.sourceCapabilities.firesTouchEvents)) {
              if (200 >= (G = Date.now()) - x) {
                  if (2 === ++r) {
                      var K = {};
                      for (X in D) {
                          var Q = D[X];
                          K[X] = Q && Q.bind ? Q.bind(D) : Q
                      }
                      var X = ((D = K).type = "dblclick",
                      K.detail = 2,
                      K.isTrusted = !1,
                      K._simulated = !0,
                      K);
                      b(X)
                  }
              } else
                  r = 1;
              x = G
          }
      }
      a.addEventListener("dblclick", b);
      var r, x = 0;
      return a.addEventListener("click", e),
      {
          dblclick: b,
          simDblclick: e
      }
  }
  function qa(a) {
      return "string" == typeof a ? document.getElementById(a) : a
  }
  function xa(a, b) {
      var e = a.style[b] || a.currentStyle && a.currentStyle[b];
      return "auto" === (e = e && "auto" !== e || !document.defaultView ? e : (a = document.defaultView.getComputedStyle(a, null)) ? a[b] : null) ? null : e
  }
  function V(a, b, e) {
      a = document.createElement(a);
      return a.className = b || "",
      e && e.appendChild(a),
      a
  }
  function ha(a) {
      var b = a.parentNode;
      b && b.removeChild(a)
  }
  function Ab(a) {
      for (; a.firstChild; )
          a.removeChild(a.firstChild)
  }
  function Ya(a) {
      var b = a.parentNode;
      b && b.lastChild !== a && b.appendChild(a)
  }
  function Za(a) {
      var b = a.parentNode;
      b && b.firstChild !== a && b.insertBefore(a, b.firstChild)
  }
  function cc(a, b) {
      if (void 0 !== a.classList)
          return a.classList.contains(b);
      a = Bb(a);
      return 0 < a.length && (new RegExp("(^|\\s)" + b + "(\\s|$)")).test(a)
  }
  function Z(a, b) {
      if (void 0 !== a.classList) {
          b = l(b);
          var e = 0;
          for (var r = b.length; e < r; e++)
              a.classList.add(b[e])
      } else
          cc(a, b) || dc(a, ((e = Bb(a)) ? e + " " : "") + b)
  }
  function ja(a, b) {
      void 0 !== a.classList ? a.classList.remove(b) : dc(a, t((" " + Bb(a) + " ").replace(" " + b + " ", " ")))
  }
  function dc(a, b) {
      void 0 === a.className.baseVal ? a.className = b : a.className.baseVal = b
  }
  function Bb(a) {
      return void 0 === (a = a.correspondingElement ? a.correspondingElement : a).className.baseVal ? a.className : a.className.baseVal
  }
  function wa(a, b) {
      if ("opacity"in a.style)
          a.style.opacity = b;
      else if ("filter"in a.style) {
          var e = !1;
          try {
              e = a.filters.item("DXImageTransform.Microsoft.Alpha")
          } catch (r) {
              if (1 === b)
                  return
          }
          b = Math.round(100 * b);
          e ? (e.Enabled = 100 !== b,
          e.Opacity = b) : a.style.filter += " progid:DXImageTransform.Microsoft.Alpha(opacity=" + b + ")"
      }
  }
  function Cb(a) {
      for (var b = document.documentElement.style, e = 0; e < a.length; e++)
          if (a[e]in b)
              return a[e];
      return !1
  }
  function Oa(a, b, e) {
      b = b || new H(0,0);
      a.style[ec] = (S.ie3d ? "translate(" + b.x + "px," + b.y + "px)" : "translate3d(" + b.x + "px," + b.y + "px,0)") + (e ? " scale(" + e + ")" : "")
  }
  function la(a, b) {
      a._leaflet_pos = b;
      S.any3d ? Oa(a, b) : (a.style.left = b.x + "px",
      a.style.top = b.y + "px")
  }
  function Pa(a) {
      return a._leaflet_pos || new H(0,0)
  }
  function fc() {
      Y(window, "dragstart", ra)
  }
  function gc() {
      da(window, "dragstart", ra)
  }
  function hc(a) {
      for (; -1 === a.tabIndex; )
          a = a.parentNode;
      a.style && (Db(),
      ic = (Eb = a).style.outline,
      a.style.outline = "none",
      Y(window, "keydown", Db))
  }
  function Db() {
      Eb && (Eb.style.outline = ic,
      ic = Eb = void 0,
      da(window, "keydown", Db))
  }
  function Jc(a) {
      for (; !((a = a.parentNode).offsetWidth && a.offsetHeight || a === document.body); )
          ;
      return a
  }
  function jc(a) {
      var b = a.getBoundingClientRect();
      return {
          x: b.width / a.offsetWidth || 1,
          y: b.height / a.offsetHeight || 1,
          boundingClientRect: b
      }
  }
  function Y(a, b, e, r) {
      if (b && "object" == typeof b)
          for (var x in b)
              kc(a, x, b[x], e);
      else {
          x = 0;
          for (var D = (b = l(b)).length; x < D; x++)
              kc(a, b[x], e, r)
      }
      return this
  }
  function da(a, b, e, r) {
      if (1 === arguments.length)
          Kc(a),
          delete a[Ba];
      else if (b && "object" == typeof b)
          for (var x in b)
              lc(a, x, b[x], e);
      else if (b = l(b),
      2 === arguments.length)
          Kc(a, function(G) {
              return -1 !== A(b, G)
          });
      else {
          x = 0;
          for (var D = b.length; x < D; x++)
              lc(a, b[x], e, r)
      }
      return this
  }
  function Kc(a, b) {
      for (var e in a[Ba]) {
          var r = e.split(/\d/)[0];
          b && !b(r) || lc(a, r, null, null, e)
      }
  }
  function kc(a, b, e, r) {
      var x, D, G = b + d(e) + (r ? "_" + d(r) : "");
      a[Ba] && a[Ba][G] || (D = x = function(K) {
          return e.call(r || a, K || window.event)
      }
      ,
      !S.touchNative && S.pointer && 0 === b.indexOf("touch") ? x = oa(a, b, x) : S.touch && "dblclick" === b ? x = ba(a, x) : "addEventListener"in a ? "touchstart" === b || "touchmove" === b || "wheel" === b || "mousewheel" === b ? a.addEventListener(mc[b] || b, x, !!S.passiveEvents && {
          passive: !1
      }) : "mouseenter" === b || "mouseleave" === b ? a.addEventListener(mc[b], x = function(K) {
          K = K || window.event;
          nc(a, K) && D(K)
      }
      , !1) : a.addEventListener(b, D, !1) : a.attachEvent("on" + b, x),
      a[Ba] = a[Ba] || {},
      a[Ba][G] = x)
  }
  function lc(a, b, e, r, x) {
      x = x || b + d(e) + (r ? "_" + d(r) : "");
      var D;
      (e = a[Ba] && a[Ba][x]) && (!S.touchNative && S.pointer && 0 === b.indexOf("touch") ? (r = a,
      D = e,
      bc[b] ? r.removeEventListener(bc[b], D, !1) : console.warn("wrong event specified:", b)) : S.touch && "dblclick" === b ? (r = e,
      (D = a).removeEventListener("dblclick", r.dblclick),
      D.removeEventListener("click", r.simDblclick)) : "removeEventListener"in a ? a.removeEventListener(mc[b] || b, e, !1) : a.detachEvent("on" + b, e),
      a[Ba][x] = null)
  }
  function Qa(a) {
      return a.stopPropagation ? a.stopPropagation() : a.originalEvent ? a.originalEvent._stopped = !0 : a.cancelBubble = !0,
      this
  }
  function oc(a) {
      return kc(a, "wheel", Qa),
      this
  }
  function hb(a) {
      return Y(a, "mousedown touchstart dblclick contextmenu", Qa),
      a._leaflet_disable_click = !0,
      this
  }
  function ra(a) {
      return a.preventDefault ? a.preventDefault() : a.returnValue = !1,
      this
  }
  function Ra(a) {
      return ra(a),
      Qa(a),
      this
  }
  function Lc(a, b) {
      if (!b)
          return new H(a.clientX,a.clientY);
      var e = jc(b)
        , r = e.boundingClientRect;
      return new H((a.clientX - r.left) / e.x - b.clientLeft,(a.clientY - r.top) / e.y - b.clientTop)
  }
  function Mc(a) {
      return S.edge ? a.wheelDeltaY / 2 : a.deltaY && 0 === a.deltaMode ? -a.deltaY / pd : a.deltaY && 1 === a.deltaMode ? 20 * -a.deltaY : a.deltaY && 2 === a.deltaMode ? 60 * -a.deltaY : a.deltaX || a.deltaZ ? 0 : a.wheelDelta ? (a.wheelDeltaY || a.wheelDelta) / 2 : a.detail && 32765 > Math.abs(a.detail) ? 20 * -a.detail : a.detail ? a.detail / -32765 * 60 : 0
  }
  function nc(a, b) {
      b = b.relatedTarget;
      if (!b)
          return !0;
      try {
          for (; b && b !== a; )
              b = b.parentNode
      } catch (e) {
          return !1
      }
      return b !== a
  }
  function ib(a) {
      return new ya(a)
  }
  function Nc(a, b) {
      if (!b || !a.length)
          return a.slice();
      b *= b;
      return a = function(e, r) {
          var x = e.length
            , D = new ("undefined" != typeof Uint8Array ? Uint8Array : Array)(x);
          D[0] = D[x - 1] = 1;
          (function Fb(Q, X, ea, na, za) {
              var Sa, Ta, sa = 0;
              for (Ta = na + 1; Ta <= za - 1; Ta++) {
                  var Gb = jb(Q[Ta], Q[na], Q[za], !0);
                  sa < Gb && (Sa = Ta,
                  sa = Gb)
              }
              ea < sa && (X[Sa] = 1,
              Fb(Q, X, ea, na, Sa),
              Fb(Q, X, ea, Sa, za))
          }
          )(e, D, r, 0, x - 1);
          var G = [];
          for (r = 0; r < x; r++)
              D[r] && G.push(e[r]);
          return G
      }(a = function(e, r) {
          for (var x = [e[0]], D = 1, G = 0, K = e.length; D < K; D++) {
              var Q = e[D]
                , X = e[G]
                , ea = X.x - Q.x;
              X = X.y - Q.y;
              ea * ea + X * X > r && (x.push(e[D]),
              G = D)
          }
          G < K - 1 && x.push(e[K - 1]);
          return x
      }(a, b), b)
  }
  function Oc(a, b, e) {
      return Math.sqrt(jb(a, b, e, !0))
  }
  function Pc(a, b, e, r, x) {
      var D, G = r ? Qc : Ua(a, e), K = Ua(b, e);
      for (Qc = K; ; ) {
          if (!(G | K))
              return [a, b];
          if (G & K)
              return !1;
          var Q = Ua(D = Hb(a, b, r = G || K, e, x), e);
          r === G ? (a = D,
          G = Q) : (b = D,
          K = Q)
      }
  }
  function Hb(a, b, e, r, x) {
      var D, G, K = b.x - a.x;
      b = b.y - a.y;
      var Q = r.min;
      r = r.max;
      return 8 & e ? (D = a.x + K * (r.y - a.y) / b,
      G = r.y) : 4 & e ? (D = a.x + K * (Q.y - a.y) / b,
      G = Q.y) : 2 & e ? (D = r.x,
      G = a.y + b * (r.x - a.x) / K) : 1 & e && (D = Q.x,
      G = a.y + b * (Q.x - a.x) / K),
      new H(D,G,x)
  }
  function Ua(a, b) {
      var e = 0;
      return a.x < b.min.x ? e |= 1 : a.x > b.max.x && (e |= 2),
      a.y < b.min.y ? e |= 4 : a.y > b.max.y && (e |= 8),
      e
  }
  function jb(a, b, e, r) {
      var x = b.x;
      b = b.y;
      var D = e.x - x
        , G = e.y - b
        , K = D * D + G * G;
      return 0 < K && (1 < (K = ((a.x - x) * D + (a.y - b) * G) / K) ? (x = e.x,
      b = e.y) : 0 < K && (x += D * K,
      b += G * K)),
      D = a.x - x,
      G = a.y - b,
      r ? D * D + G * G : new H(x,b)
  }
  function Da(a) {
      return !Aa(a[0]) || "object" != typeof a[0][0] && void 0 !== a[0][0]
  }
  function Rc(a) {
      return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."),
      Da(a)
  }
  function Sc(a, b, e) {
      for (var r, x, D, G, K, Q, X = [1, 4, 2, 8], ea = 0, na = a.length; ea < na; ea++)
          a[ea]._code = Ua(a[ea], b);
      for (D = 0; 4 > D; D++) {
          K = X[D];
          r = [];
          ea = 0;
          for (x = (na = a.length) - 1; ea < na; x = ea++)
              G = a[ea],
              x = a[x],
              G._code & K ? x._code & K || ((Q = Hb(x, G, K, b, e))._code = Ua(Q, b),
              r.push(Q)) : (x._code & K && ((Q = Hb(x, G, K, b, e))._code = Ua(Q, b),
              r.push(Q)),
              r.push(G));
          a = r
      }
      return a
  }
  function pc(a, b) {
      var e, r = "Feature" === a.type ? a.geometry : a, x = r ? r.coordinates : null, D = [], G = b && b.pointToLayer, K = b && b.coordsToLatLng || qc;
      if (!x && !r)
          return null;
      switch (r.type) {
      case "Point":
          return D = K(x),
          G ? G(a, D) : new kb(D,b && b.markersInheritOptions && b);
      case "MultiPoint":
          var Q = 0;
          for (e = x.length; Q < e; Q++) {
              var X = K(x[Q]);
              r = D;
              var ea = r.push
                , na = b;
              X = G ? G(a, X) : new kb(X,na && na.markersInheritOptions && na);
              ea.call(r, X)
          }
          return new $a(D);
      case "LineString":
      case "MultiLineString":
          return Q = Ib(x, "LineString" === r.type ? 0 : 1, K),
          new Ea(Q,b);
      case "Polygon":
      case "MultiPolygon":
          return Q = Ib(x, "Polygon" === r.type ? 1 : 2, K),
          new ab(Q,b);
      case "GeometryCollection":
          Q = 0;
          for (e = r.geometries.length; Q < e; Q++)
              (G = pc({
                  geometry: r.geometries[Q],
                  type: "Feature",
                  properties: a.properties
              }, b)) && D.push(G);
          return new $a(D);
      default:
          throw Error("Invalid GeoJSON object.");
      }
  }
  function qc(a) {
      return new U(a[1],a[0],a[2])
  }
  function Ib(a, b, e) {
      for (var r, x = [], D = 0, G = a.length; D < G; D++)
          r = b ? Ib(a[D], b - 1, e) : (e || qc)(a[D]),
          x.push(r);
      return x
  }
  function rc(a, b) {
      return void 0 !== (a = W(a)).alt ? [h(a.lng, b), h(a.lat, b), h(a.alt, b)] : [h(a.lng, b), h(a.lat, b)]
  }
  function Jb(a, b, e, r) {
      for (var x = [], D = 0, G = a.length; D < G; D++)
          x.push(b ? Jb(a[D], b - 1, e, r) : rc(a[D], r));
      return !b && e && x.push(x[0]),
      x
  }
  function bb(a, b) {
      return a.feature ? g({}, a.feature, {
          geometry: b
      }) : Kb(b)
  }
  function Kb(a) {
      return "Feature" === a.type || "FeatureCollection" === a.type ? a : {
          type: "Feature",
          properties: {},
          geometry: a
      }
  }
  function Tc(a, b) {
      return new Fa(a,b)
  }
  function Uc(a, b) {
      return new cb(a,b)
  }
  function Vc(a) {
      return S.canvas ? new Wc(a) : null
  }
  function Xc(a) {
      return S.svg || S.vml ? new lb(a) : null
  }
  var zb = Object.create || function(a) {
      return u.prototype = a,
      new u
  }
    , Ac = 0
    , od = /\{ *([\w_ -]+) *\}/g
    , Aa = Array.isArray || function(a) {
      return "[object Array]" === Object.prototype.toString.call(a)
  }
    , Bc = 0
    , ac = window.requestAnimationFrame || C("RequestAnimationFrame") || B
    , Cc = window.cancelAnimationFrame || C("CancelAnimationFrame") || C("CancelRequestAnimationFrame") || function(a) {
      window.clearTimeout(a)
  }
    , qd = {
      __proto__: null,
      extend: g,
      create: zb,
      bind: p,
      get lastId() {
          return Ac
      },
      stamp: d,
      throttle: m,
      wrapNum: f,
      falseFn: q,
      formatNum: h,
      trim: t,
      splitWords: l,
      setOptions: v,
      getParamString: w,
      template: y,
      isArray: Aa,
      indexOf: A,
      emptyImageUrl: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
      requestFn: ac,
      cancelFn: Cc,
      requestAnimFrame: z,
      cancelAnimFrame: F
  };
  I.extend = function(a) {
      function b() {
          v(this);
          this.initialize && this.initialize.apply(this, arguments);
          this.callInitHooks()
      }
      var e = b.__super__ = this.prototype
        , r = zb(e);
      for (x in (r.constructor = b).prototype = r,
      this)
          Object.prototype.hasOwnProperty.call(this, x) && "prototype" !== x && "__super__" !== x && (b[x] = this[x]);
      if (a.statics && g(b, a.statics),
      a.includes) {
          var x = a.includes;
          if ("undefined" != typeof L && L && L.Mixin) {
              x = Aa(x) ? x : [x];
              for (var D = 0; D < x.length; D++)
                  x[D] === L.Mixin.Events && console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", Error().stack)
          }
          g.apply(null, [r].concat(a.includes))
      }
      return g(r, a),
      delete r.statics,
      delete r.includes,
      r.options && (r.options = e.options ? zb(e.options) : {},
      g(r.options, a.options)),
      r._initHooks = [],
      r.callInitHooks = function() {
          if (!this._initHooksCalled) {
              e.callInitHooks && e.callInitHooks.call(this);
              this._initHooksCalled = !0;
              for (var G = 0, K = r._initHooks.length; G < K; G++)
                  r._initHooks[G].call(this)
          }
      }
      ,
      b
  }
  ;
  I.include = function(a) {
      var b = this.prototype.options;
      return g(this.prototype, a),
      a.options && (this.prototype.options = b,
      this.mergeOptions(a.options)),
      this
  }
  ;
  I.mergeOptions = function(a) {
      return g(this.prototype.options, a),
      this
  }
  ;
  I.addInitHook = function(a) {
      var b = Array.prototype.slice.call(arguments, 1);
      return this.prototype._initHooks = this.prototype._initHooks || [],
      this.prototype._initHooks.push("function" == typeof a ? a : function() {
          this[a].apply(this, b)
      }
      ),
      this
  }
  ;
  var ua = {
      on: function(a, b, e) {
          if ("object" == typeof a)
              for (var r in a)
                  this._on(r, a[r], b);
          else {
              r = 0;
              for (var x = (a = l(a)).length; r < x; r++)
                  this._on(a[r], b, e)
          }
          return this
      },
      off: function(a, b, e) {
          if (arguments.length)
              if ("object" == typeof a)
                  for (var r in a)
                      this._off(r, a[r], b);
              else {
                  a = l(a);
                  r = 1 === arguments.length;
                  for (var x = 0, D = a.length; x < D; x++)
                      r ? this._off(a[x]) : this._off(a[x], b, e)
              }
          else
              delete this._events;
          return this
      },
      _on: function(a, b, e) {
          if ("function" != typeof b)
              console.warn("wrong listener type: " + typeof b);
          else {
              this._events = this._events || {};
              var r = this._events[a];
              a = (r || (this._events[a] = r = []),
              {
                  fn: b,
                  ctx: e = e === this ? void 0 : e
              });
              for (var x = 0, D = r.length; x < D; x++)
                  if (r[x].fn === b && r[x].ctx === e)
                      return;
              r.push(a)
          }
      },
      _off: function(a, b, e) {
          var r, x;
          if (this._events && (r = this._events[a]))
              if (1 === arguments.length) {
                  if (this._firingCount) {
                      var D = 0;
                      for (x = r.length; D < x; D++)
                          r[D].fn = q
                  }
                  delete this._events[a]
              } else if (e === this && (e = void 0),
              "function" != typeof b)
                  console.warn("wrong listener type: " + typeof b);
              else {
                  D = 0;
                  for (x = r.length; D < x; D++) {
                      var G = r[D];
                      if (G.ctx === e && G.fn === b)
                          return this._firingCount && (G.fn = q,
                          this._events[a] = r = r.slice()),
                          void r.splice(D, 1)
                  }
                  console.warn("listener not found")
              }
      },
      fire: function(a, b, e) {
          if (!this.listens(a, e))
              return this;
          b = g({}, b, {
              type: a,
              target: this,
              sourceTarget: b && b.sourceTarget || this
          });
          if (this._events && (a = this._events[a])) {
              this._firingCount = this._firingCount + 1 || 1;
              for (var r = 0, x = a.length; r < x; r++) {
                  var D = a[r];
                  D.fn.call(D.ctx || this, b)
              }
              this._firingCount--
          }
          return e && this._propagateEvent(b),
          this
      },
      listens: function(a, b) {
          "string" != typeof a && console.warn('"string" type argument expected');
          var e = this._events && this._events[a];
          if (e && e.length)
              return !0;
          if (b)
              for (var r in this._eventParents)
                  if (this._eventParents[r].listens(a, b))
                      return !0;
          return !1
      },
      once: function(a, b, e) {
          if ("object" == typeof a) {
              for (var r in a)
                  this.once(r, a[r], b);
              return this
          }
          var x = p(function() {
              this.off(a, b, e).off(a, x, e)
          }, this);
          return this.on(a, b, e).on(a, x, e)
      },
      addEventParent: function(a) {
          return this._eventParents = this._eventParents || {},
          this._eventParents[d(a)] = a,
          this
      },
      removeEventParent: function(a) {
          return this._eventParents && delete this._eventParents[d(a)],
          this
      },
      _propagateEvent: function(a) {
          for (var b in this._eventParents)
              this._eventParents[b].fire(a.type, g({
                  layer: a.target,
                  propagatedFrom: a.target
              }, a), !0)
      }
  }
    , mb = (ua.addEventListener = ua.on,
  ua.removeEventListener = ua.clearAllEventListeners = ua.off,
  ua.addOneTimeEventListener = ua.once,
  ua.fireEvent = ua.fire,
  ua.hasEventListeners = ua.listens,
  I.extend(ua))
    , Yc = Math.trunc || function(a) {
      return 0 < a ? Math.floor(a) : Math.ceil(a)
  }
  ;
  H.prototype = {
      clone: function() {
          return new H(this.x,this.y)
      },
      add: function(a) {
          return this.clone()._add(J(a))
      },
      _add: function(a) {
          return this.x += a.x,
          this.y += a.y,
          this
      },
      subtract: function(a) {
          return this.clone()._subtract(J(a))
      },
      _subtract: function(a) {
          return this.x -= a.x,
          this.y -= a.y,
          this
      },
      divideBy: function(a) {
          return this.clone()._divideBy(a)
      },
      _divideBy: function(a) {
          return this.x /= a,
          this.y /= a,
          this
      },
      multiplyBy: function(a) {
          return this.clone()._multiplyBy(a)
      },
      _multiplyBy: function(a) {
          return this.x *= a,
          this.y *= a,
          this
      },
      scaleBy: function(a) {
          return new H(this.x * a.x,this.y * a.y)
      },
      unscaleBy: function(a) {
          return new H(this.x / a.x,this.y / a.y)
      },
      round: function() {
          return this.clone()._round()
      },
      _round: function() {
          return this.x = Math.round(this.x),
          this.y = Math.round(this.y),
          this
      },
      floor: function() {
          return this.clone()._floor()
      },
      _floor: function() {
          return this.x = Math.floor(this.x),
          this.y = Math.floor(this.y),
          this
      },
      ceil: function() {
          return this.clone()._ceil()
      },
      _ceil: function() {
          return this.x = Math.ceil(this.x),
          this.y = Math.ceil(this.y),
          this
      },
      trunc: function() {
          return this.clone()._trunc()
      },
      _trunc: function() {
          return this.x = Yc(this.x),
          this.y = Yc(this.y),
          this
      },
      distanceTo: function(a) {
          var b = (a = J(a)).x - this.x;
          a = a.y - this.y;
          return Math.sqrt(b * b + a * a)
      },
      equals: function(a) {
          return (a = J(a)).x === this.x && a.y === this.y
      },
      contains: function(a) {
          return a = J(a),
          Math.abs(a.x) <= Math.abs(this.x) && Math.abs(a.y) <= Math.abs(this.y)
      },
      toString: function() {
          return "Point(" + h(this.x) + ", " + h(this.y) + ")"
      }
  };
  O.prototype = {
      extend: function(a) {
          return a = J(a),
          this.min || this.max ? (this.min.x = Math.min(a.x, this.min.x),
          this.max.x = Math.max(a.x, this.max.x),
          this.min.y = Math.min(a.y, this.min.y),
          this.max.y = Math.max(a.y, this.max.y)) : (this.min = a.clone(),
          this.max = a.clone()),
          this
      },
      getCenter: function(a) {
          return new H((this.min.x + this.max.x) / 2,(this.min.y + this.max.y) / 2,a)
      },
      getBottomLeft: function() {
          return new H(this.min.x,this.max.y)
      },
      getTopRight: function() {
          return new H(this.max.x,this.min.y)
      },
      getTopLeft: function() {
          return this.min
      },
      getBottomRight: function() {
          return this.max
      },
      getSize: function() {
          return this.max.subtract(this.min)
      },
      contains: function(a) {
          var b, e;
          return (a = ("number" == typeof a[0] || a instanceof H ? J : P)(a))instanceof O ? (b = a.min,
          e = a.max) : b = e = a,
          b.x >= this.min.x && e.x <= this.max.x && b.y >= this.min.y && e.y <= this.max.y
      },
      intersects: function(a) {
          a = P(a);
          var b = this.min
            , e = this.max
            , r = a.min;
          a = a.max;
          var x = a.x >= b.x && r.x <= e.x;
          a = a.y >= b.y && r.y <= e.y;
          return x && a
      },
      overlaps: function(a) {
          a = P(a);
          var b = this.min
            , e = this.max
            , r = a.min;
          a = a.max;
          var x = a.x > b.x && r.x < e.x;
          a = a.y > b.y && r.y < e.y;
          return x && a
      },
      isValid: function() {
          return !(!this.min || !this.max)
      }
  };
  N.prototype = {
      extend: function(a) {
          var b, e = this._southWest, r = this._northEast;
          if (a instanceof U)
              var x = b = a;
          else {
              if (!(a instanceof N))
                  return a ? this.extend(W(a) || T(a)) : this;
              if (b = a._southWest,
              x = a._northEast,
              !b || !x)
                  return this
          }
          return e || r ? (e.lat = Math.min(b.lat, e.lat),
          e.lng = Math.min(b.lng, e.lng),
          r.lat = Math.max(x.lat, r.lat),
          r.lng = Math.max(x.lng, r.lng)) : (this._southWest = new U(b.lat,b.lng),
          this._northEast = new U(x.lat,x.lng)),
          this
      },
      pad: function(a) {
          var b = this._southWest
            , e = this._northEast
            , r = Math.abs(b.lat - e.lat) * a;
          a *= Math.abs(b.lng - e.lng);
          return new N(new U(b.lat - r,b.lng - a),new U(e.lat + r,e.lng + a))
      },
      getCenter: function() {
          return new U((this._southWest.lat + this._northEast.lat) / 2,(this._southWest.lng + this._northEast.lng) / 2)
      },
      getSouthWest: function() {
          return this._southWest
      },
      getNorthEast: function() {
          return this._northEast
      },
      getNorthWest: function() {
          return new U(this.getNorth(),this.getWest())
      },
      getSouthEast: function() {
          return new U(this.getSouth(),this.getEast())
      },
      getWest: function() {
          return this._southWest.lng
      },
      getSouth: function() {
          return this._southWest.lat
      },
      getEast: function() {
          return this._northEast.lng
      },
      getNorth: function() {
          return this._northEast.lat
      },
      contains: function(a) {
          a = ("number" == typeof a[0] || a instanceof U || "lat"in a ? W : T)(a);
          var b, e, r = this._southWest, x = this._northEast;
          return a instanceof N ? (b = a.getSouthWest(),
          e = a.getNorthEast()) : b = e = a,
          b.lat >= r.lat && e.lat <= x.lat && b.lng >= r.lng && e.lng <= x.lng
      },
      intersects: function(a) {
          a = T(a);
          var b = this._southWest
            , e = this._northEast
            , r = a.getSouthWest();
          a = a.getNorthEast();
          var x = a.lat >= b.lat && r.lat <= e.lat;
          a = a.lng >= b.lng && r.lng <= e.lng;
          return x && a
      },
      overlaps: function(a) {
          a = T(a);
          var b = this._southWest
            , e = this._northEast
            , r = a.getSouthWest();
          a = a.getNorthEast();
          var x = a.lat > b.lat && r.lat < e.lat;
          a = a.lng > b.lng && r.lng < e.lng;
          return x && a
      },
      toBBoxString: function() {
          return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join()
      },
      equals: function(a, b) {
          return !!a && (a = T(a),
          this._southWest.equals(a.getSouthWest(), b) && this._northEast.equals(a.getNorthEast(), b))
      },
      isValid: function() {
          return !(!this._southWest || !this._northEast)
      }
  };
  var Ga = {
      latLngToPoint: function(a, b) {
          a = this.projection.project(a);
          b = this.scale(b);
          return this.transformation._transform(a, b)
      },
      pointToLatLng: function(a, b) {
          b = this.scale(b);
          a = this.transformation.untransform(a, b);
          return this.projection.unproject(a)
      },
      project: function(a) {
          return this.projection.project(a)
      },
      unproject: function(a) {
          return this.projection.unproject(a)
      },
      scale: function(a) {
          return 256 * Math.pow(2, a)
      },
      zoom: function(a) {
          return Math.log(a / 256) / Math.LN2
      },
      getProjectedBounds: function(a) {
          if (this.infinite)
              return null;
          var b = this.projection.bounds;
          a = this.scale(a);
          return new O(this.transformation.transform(b.min, a),this.transformation.transform(b.max, a))
      },
      infinite: !(U.prototype = {
          equals: function(a, b) {
              return !!a && (a = W(a),
              Math.max(Math.abs(this.lat - a.lat), Math.abs(this.lng - a.lng)) <= (void 0 === b ? 1E-9 : b))
          },
          toString: function(a) {
              return "LatLng(" + h(this.lat, a) + ", " + h(this.lng, a) + ")"
          },
          distanceTo: function(a) {
              return Ka.distance(this, W(a))
          },
          wrap: function() {
              return Ka.wrapLatLng(this)
          },
          toBounds: function(a) {
              a = 180 * a / 40075017;
              var b = a / Math.cos(Math.PI / 180 * this.lat);
              return T([this.lat - a, this.lng - b], [this.lat + a, this.lng + b])
          },
          clone: function() {
              return new U(this.lat,this.lng,this.alt)
          }
      }),
      wrapLatLng: function(a) {
          var b = this.wrapLng ? f(a.lng, this.wrapLng, !0) : a.lng;
          return new U(this.wrapLat ? f(a.lat, this.wrapLat, !0) : a.lat,b,a.alt)
      },
      wrapLatLngBounds: function(a) {
          var b = a.getCenter()
            , e = this.wrapLatLng(b)
            , r = b.lat - e.lat;
          b = b.lng - e.lng;
          if (0 == r && 0 == b)
              return a;
          e = a.getSouthWest();
          a = a.getNorthEast();
          return new N(new U(e.lat - r,e.lng - b),new U(a.lat - r,a.lng - b))
      }
  }
    , Ka = g({}, Ga, {
      wrapLng: [-180, 180],
      R: 6371E3,
      distance: function(a, b) {
          var e = Math.PI / 180
            , r = a.lat * e
            , x = b.lat * e
            , D = Math.sin((b.lat - a.lat) * e / 2);
          b = Math.sin((b.lng - a.lng) * e / 2);
          a = D * D + Math.cos(r) * Math.cos(x) * b * b;
          e = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          return this.R * e
      }
  })
    , Ha = 6378137;
  Ha = {
      R: Ha,
      MAX_LATITUDE: 85.0511287798,
      project: function(a) {
          var b = Math.PI / 180
            , e = this.MAX_LATITUDE;
          e = Math.max(Math.min(e, a.lat), -e);
          e = Math.sin(e * b);
          return new H(this.R * a.lng * b,this.R * Math.log((1 + e) / (1 - e)) / 2)
      },
      unproject: function(a) {
          var b = 180 / Math.PI;
          return new U((2 * Math.atan(Math.exp(a.y / this.R)) - Math.PI / 2) * b,a.x * b / this.R)
      },
      bounds: new O([-(Ha *= Math.PI), -Ha],[Ha, Ha])
  };
  ka.prototype = {
      transform: function(a, b) {
          return this._transform(a.clone(), b)
      },
      _transform: function(a, b) {
          return a.x = (b = b || 1) * (this._a * a.x + this._b),
          a.y = b * (this._c * a.y + this._d),
          a
      },
      untransform: function(a, b) {
          return new H((a.x / (b = b || 1) - this._b) / this._a,(a.y / b - this._d) / this._c)
      }
  };
  var nb = g({}, Ka, {
      code: "EPSG:3857",
      projection: Ha,
      transformation: fa(nb = .5 / (Math.PI * Ha.R), .5, -nb, .5)
  })
    , rd = g({}, nb, {
      code: "EPSG:900913"
  })
    , Ia = document.documentElement.style
    , db = "ActiveXObject"in window
    , sc = db && !document.addEventListener
    , va = "msLaunchUri"in navigator && !("documentMode"in document)
    , ob = ia("webkit")
    , Lb = ia("android")
    , Mb = ia("android 2") || ia("android 3")
    , Va = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10);
  Va = Lb && ia("Google") && 537 > Va && !("AudioNode"in window);
  var Wa = !!window.opera
    , Nb = !va && ia("chrome")
    , Ob = ia("gecko") && !ob && !Wa && !db
    , tc = !Nb && ia("safari")
    , Pb = ia("phantom")
    , ta = "OTransition"in Ia
    , pb = 0 === navigator.platform.indexOf("Win")
    , Qb = db && "transition"in Ia
    , qb = "WebKitCSSMatrix"in window && "m11"in new window.WebKitCSSMatrix && !Mb;
  Ia = "MozPerspective"in Ia;
  var Rb = !window.L_DISABLE_3D && (Qb || qb || Ia) && !ta && !Pb, La = "undefined" != typeof orientation || ia("mobile"), Sb = La && ob, Tb = La && qb, rb = !window.PointerEvent && window.MSPointerEvent, sb = !(!window.PointerEvent && !rb), Zc = "ontouchstart"in window || !!window.TouchEvent, sd = !window.L_NO_TOUCH && (Zc || sb), td = La && Wa, ud = La && Ob, vd = 1 < (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI), wd = function() {
      var a = !1;
      try {
          var b = Object.defineProperty({}, "passive", {
              get: function() {
                  a = !0
              }
          });
          window.addEventListener("testPassiveEventSupport", q, b);
          window.removeEventListener("testPassiveEventSupport", q, b)
      } catch (e) {}
      return a
  }(), xd = !!document.createElement("canvas").getContext, uc = !(!document.createElementNS || !ma("svg").createSVGRect), Ub = !!uc && ((Ub = document.createElement("div")).innerHTML = "<svg/>",
  "http://www.w3.org/2000/svg" === (Ub.firstChild && Ub.firstChild.namespaceURI)), S = {
      ie: db,
      ielt9: sc,
      edge: va,
      webkit: ob,
      android: Lb,
      android23: Mb,
      androidStock: Va,
      opera: Wa,
      chrome: Nb,
      gecko: Ob,
      safari: tc,
      phantom: Pb,
      opera12: ta,
      win: pb,
      ie3d: Qb,
      webkit3d: qb,
      gecko3d: Ia,
      any3d: Rb,
      mobile: La,
      mobileWebkit: Sb,
      mobileWebkit3d: Tb,
      msPointer: rb,
      pointer: sb,
      touch: sd,
      touchNative: Zc,
      mobileOpera: td,
      mobileGecko: ud,
      retina: vd,
      passiveEvents: wd,
      canvas: xd,
      svg: uc,
      vml: !uc && function() {
          try {
              var a = document.createElement("div")
                , b = (a.innerHTML = '<v:shape adj="1"/>',
              a.firstChild);
              return b.style.behavior = "url(#default#VML)",
              b && "object" == typeof b.adj
          } catch (e) {
              return !1
          }
      }(),
      inlineSvg: Ub
  }, Ec = S.msPointer ? "MSPointerDown" : "pointerdown", Fc = S.msPointer ? "MSPointerMove" : "pointermove", Gc = S.msPointer ? "MSPointerUp" : "pointerup", Hc = S.msPointer ? "MSPointerCancel" : "pointercancel", bc = {
      touchstart: Ec,
      touchmove: Fc,
      touchend: Gc,
      touchcancel: Hc
  }, Ic = {
      touchstart: function(a, b) {
          b.MSPOINTER_TYPE_TOUCH && b.pointerType === b.MSPOINTER_TYPE_TOUCH && ra(b);
          ca(a, b)
      },
      touchmove: ca,
      touchend: ca,
      touchcancel: ca
  }, Xa = {}, Dc = !1, vc, eb, tb, Eb, ic, ec = Cb(["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]), ub = Cb(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]), $c = "webkitTransition" === ub || "OTransition" === ub ? ub + "End" : "transitionend";
  var wc = "onselectstart"in document ? (tb = function() {
      Y(window, "selectstart", ra)
  }
  ,
  function() {
      da(window, "selectstart", ra)
  }
  ) : (eb = Cb(["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]),
  tb = function() {
      var a;
      eb && (a = document.documentElement.style,
      vc = a[eb],
      a[eb] = "none")
  }
  ,
  function() {
      eb && (document.documentElement.style[eb] = vc,
      vc = void 0)
  }
  );
  db = {
      __proto__: null,
      TRANSFORM: ec,
      TRANSITION: ub,
      TRANSITION_END: $c,
      get: qa,
      getStyle: xa,
      create: V,
      remove: ha,
      empty: Ab,
      toFront: Ya,
      toBack: Za,
      hasClass: cc,
      addClass: Z,
      removeClass: ja,
      setClass: dc,
      getClass: Bb,
      setOpacity: wa,
      testProp: Cb,
      setTransform: Oa,
      setPosition: la,
      getPosition: Pa,
      get disableTextSelection() {
          return tb
      },
      get enableTextSelection() {
          return wc
      },
      disableImageDrag: fc,
      enableImageDrag: gc,
      preventOutline: hc,
      restoreOutline: Db,
      getSizedParentNode: Jc,
      getScale: jc
  };
  var Ba = "_leaflet_events"
    , mc = {
      mouseenter: "mouseover",
      mouseleave: "mouseout",
      wheel: !("onwheel"in window) && "mousewheel"
  }
    , pd = S.win && S.chrome ? 2 * window.devicePixelRatio : S.gecko ? window.devicePixelRatio : 1;
  sc = {
      __proto__: null,
      on: Y,
      off: da,
      stopPropagation: Qa,
      disableScrollPropagation: oc,
      disableClickPropagation: hb,
      preventDefault: ra,
      stop: Ra,
      getMousePosition: Lc,
      getWheelDelta: Mc,
      isExternalTarget: nc,
      addListener: Y,
      removeListener: da
  };
  var ad = mb.extend({
      run: function(a, b, e, r) {
          this.stop();
          this._el = a;
          this._inProgress = !0;
          this._duration = e || .25;
          this._easeOutPower = 1 / Math.max(r || .5, .2);
          this._startPos = Pa(a);
          this._offset = b.subtract(this._startPos);
          this._startTime = +new Date;
          this.fire("start");
          this._animate()
      },
      stop: function() {
          this._inProgress && (this._step(!0),
          this._complete())
      },
      _animate: function() {
          this._animId = z(this._animate, this);
          this._step()
      },
      _step: function(a) {
          var b = +new Date - this._startTime
            , e = 1E3 * this._duration;
          b < e ? this._runFrame(this._easeOut(b / e), a) : (this._runFrame(1),
          this._complete())
      },
      _runFrame: function(a, b) {
          a = this._startPos.add(this._offset.multiplyBy(a));
          b && a._round();
          la(this._el, a);
          this.fire("step")
      },
      _complete: function() {
          F(this._animId);
          this._inProgress = !1;
          this.fire("end")
      },
      _easeOut: function(a) {
          return 1 - Math.pow(1 - a, this._easeOutPower)
      }
  }), aa = mb.extend({
      options: {
          crs: nb,
          center: void 0,
          zoom: void 0,
          minZoom: void 0,
          maxZoom: void 0,
          layers: [],
          maxBounds: void 0,
          renderer: void 0,
          zoomAnimation: !0,
          zoomAnimationThreshold: 4,
          fadeAnimation: !0,
          markerZoomAnimation: !0,
          transform3DLimit: 8388608,
          zoomSnap: 1,
          zoomDelta: 1,
          trackResize: !0
      },
      initialize: function(a, b) {
          b = v(this, b);
          this._handlers = [];
          this._layers = {};
          this._zoomBoundLayers = {};
          this._sizeChanged = !0;
          this._initContainer(a);
          this._initLayout();
          this._onResize = p(this._onResize, this);
          this._initEvents();
          b.maxBounds && this.setMaxBounds(b.maxBounds);
          void 0 !== b.zoom && (this._zoom = this._limitZoom(b.zoom));
          b.center && void 0 !== b.zoom && this.setView(W(b.center), b.zoom, {
              reset: !0
          });
          this.callInitHooks();
          (this._zoomAnimated = ub && S.any3d && !S.mobileOpera && this.options.zoomAnimation) && (this._createAnimProxy(),
          Y(this._proxy, $c, this._catchTransitionEnd, this));
          this._addLayers(this.options.layers)
      },
      setView: function(a, b, e) {
          return (b = void 0 === b ? this._zoom : this._limitZoom(b),
          a = this._limitCenter(W(a), b, this.options.maxBounds),
          e = e || {},
          this._stop(),
          this._loaded && !e.reset && !0 !== e) && (void 0 !== e.animate && (e.zoom = g({
              animate: e.animate
          }, e.zoom),
          e.pan = g({
              animate: e.animate,
              duration: e.duration
          }, e.pan)),
          this._zoom !== b ? this._tryAnimatedZoom && this._tryAnimatedZoom(a, b, e.zoom) : this._tryAnimatedPan(a, e.pan)) ? (clearTimeout(this._sizeTimer),
          this) : (this._resetView(a, b),
          this)
      },
      setZoom: function(a, b) {
          return this._loaded ? this.setView(this.getCenter(), a, {
              zoom: b
          }) : (this._zoom = a,
          this)
      },
      zoomIn: function(a, b) {
          return a = a || (S.any3d ? this.options.zoomDelta : 1),
          this.setZoom(this._zoom + a, b)
      },
      zoomOut: function(a, b) {
          return a = a || (S.any3d ? this.options.zoomDelta : 1),
          this.setZoom(this._zoom - a, b)
      },
      setZoomAround: function(a, b, e) {
          var r = this.getZoomScale(b)
            , x = this.getSize().divideBy(2);
          a = (a instanceof H ? a : this.latLngToContainerPoint(a)).subtract(x).multiplyBy(1 - 1 / r);
          r = this.containerPointToLatLng(x.add(a));
          return this.setView(r, b, {
              zoom: e
          })
      },
      _getBoundsCenterZoom: function(a, b) {
          b = b || {};
          a = a.getBounds ? a.getBounds() : T(a);
          var e = J(b.paddingTopLeft || b.padding || [0, 0])
            , r = J(b.paddingBottomRight || b.padding || [0, 0])
            , x = this.getBoundsZoom(a, !1, e.add(r));
          if ((x = "number" == typeof b.maxZoom ? Math.min(b.maxZoom, x) : x) === 1 / 0)
              return {
                  center: a.getCenter(),
                  zoom: x
              };
          b = r.subtract(e).divideBy(2);
          r = this.project(a.getSouthWest(), x);
          e = this.project(a.getNorthEast(), x);
          return {
              center: this.unproject(r.add(e).divideBy(2).add(b), x),
              zoom: x
          }
      },
      fitBounds: function(a, b) {
          if (!(a = T(a)).isValid())
              throw Error("Bounds are not valid.");
          a = this._getBoundsCenterZoom(a, b);
          return this.setView(a.center, a.zoom, b)
      },
      fitWorld: function(a) {
          return this.fitBounds([[-90, -180], [90, 180]], a)
      },
      panTo: function(a, b) {
          return this.setView(a, this._zoom, {
              pan: b
          })
      },
      panBy: function(a, b) {
          return b = b || {},
          (a = J(a).round()).x || a.y ? (!0 === b.animate || this.getSize().contains(a) ? (this._panAnim || (this._panAnim = new ad,
          this._panAnim.on({
              step: this._onPanTransitionStep,
              end: this._onPanTransitionEnd
          }, this)),
          b.noMoveStart || this.fire("movestart"),
          !1 !== b.animate ? (Z(this._mapPane, "leaflet-pan-anim"),
          e = this._getMapPanePos().subtract(a).round(),
          this._panAnim.run(this._mapPane, e, b.duration || .25, b.easeLinearity)) : (this._rawPanBy(a),
          this.fire("move").fire("moveend"))) : this._resetView(this.unproject(this.project(this.getCenter()).add(a)), this.getZoom()),
          this) : this.fire("moveend");
          var e
      },
      flyTo: function(a, b, e) {
          function r(sa) {
              sa = (ea * ea - X * X + 2.0164 * (sa ? -1 : 1) * 2.0164 * na * na) / (4.0328 * (sa ? ea : X) * na);
              sa = Math.sqrt(sa * sa + 1) - sa;
              return 1E-9 > sa ? -18 : Math.log(sa)
          }
          function x(sa) {
              return (Math.exp(sa) + Math.exp(-sa)) / 2
          }
          if (!1 === (e = e || {}).animate || !S.any3d)
              return this.setView(a, b, e);
          this._stop();
          var D = this.project(this.getCenter())
            , G = this.project(a)
            , K = this.getSize()
            , Q = this._zoom
            , X = (a = W(a),
          b = void 0 === b ? Q : b,
          Math.max(K.x, K.y))
            , ea = X * this.getZoomScale(Q, b)
            , na = G.distanceTo(D) || 1
            , za = r(0)
            , Fb = Date.now()
            , Sa = (r(1) - za) / 1.42
            , Ta = e.duration ? 1E3 * e.duration : 800 * Sa;
          return this._moveStart(!0, e.noMoveStart),
          function Gb() {
              var Vb = (Date.now() - Fb) / Ta
                , bd = (1 - Math.pow(1 - Vb, 1.5)) * Sa;
              if (1 >= Vb) {
                  this._flyToFrame = z(Gb, this);
                  var yd = this._move
                    , zd = this.unproject
                    , Ad = D.add
                    , cd = G.subtract(D)
                    , Bd = cd.multiplyBy;
                  var vb = bd;
                  var Cd = x(za)
                    , dd = vb = za + 1.42 * vb;
                  vb = X * (Cd * ((Math.exp(dd) - Math.exp(-dd)) / 2 / x(vb)) - (Math.exp(za) - Math.exp(-za)) / 2) / 2.0164;
                  yd.call(this, zd.call(this, Ad.call(D, Bd.call(cd, vb / na)), Q), this.getScaleZoom(X / (Vb = bd,
                  X * (x(za) / x(za + 1.42 * Vb))), Q), {
                      flyTo: !0
                  })
              } else
                  this._move(a, b)._moveEnd(!0)
          }
          .call(this),
          this
      },
      flyToBounds: function(a, b) {
          a = this._getBoundsCenterZoom(a, b);
          return this.flyTo(a.center, a.zoom, b)
      },
      setMaxBounds: function(a) {
          return (a = T(a)).isValid() ? (this.options.maxBounds && this.off("moveend", this._panInsideMaxBounds),
          this.options.maxBounds = a,
          this._loaded && this._panInsideMaxBounds(),
          this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null,
          this.off("moveend", this._panInsideMaxBounds))
      },
      setMinZoom: function(a) {
          var b = this.options.minZoom;
          return this.options.minZoom = a,
          this._loaded && b !== a && (this.fire("zoomlevelschange"),
          this.getZoom() < this.options.minZoom) ? this.setZoom(a) : this
      },
      setMaxZoom: function(a) {
          var b = this.options.maxZoom;
          return this.options.maxZoom = a,
          this._loaded && b !== a && (this.fire("zoomlevelschange"),
          this.getZoom() > this.options.maxZoom) ? this.setZoom(a) : this
      },
      panInsideBounds: function(a, b) {
          this._enforcingBounds = !0;
          var e = this.getCenter();
          a = this._limitCenter(e, this._zoom, T(a));
          return e.equals(a) || this.panTo(a, b),
          this._enforcingBounds = !1,
          this
      },
      panInside: function(a, b) {
          var e = J((b = b || {}).paddingTopLeft || b.padding || [0, 0])
            , r = J(b.paddingBottomRight || b.padding || [0, 0])
            , x = this.project(this.getCenter());
          a = this.project(a);
          var D = this.getPixelBounds();
          e = P([D.min.add(e), D.max.subtract(r)]);
          D = e.getSize();
          return e.contains(a) || (this._enforcingBounds = !0,
          r = a.subtract(e.getCenter()),
          e = e.extend(a).getSize().subtract(D),
          x.x += 0 > r.x ? -e.x : e.x,
          x.y += 0 > r.y ? -e.y : e.y,
          this.panTo(this.unproject(x), b),
          this._enforcingBounds = !1),
          this
      },
      invalidateSize: function(a) {
          if (!this._loaded)
              return this;
          a = g({
              animate: !1,
              pan: !0
          }, !0 === a ? {
              animate: !0
          } : a);
          var b = this.getSize()
            , e = (this._sizeChanged = !0,
          this._lastCenter = null,
          this.getSize())
            , r = b.divideBy(2).round()
            , x = e.divideBy(2).round();
          r = r.subtract(x);
          return r.x || r.y ? (a.animate && a.pan ? this.panBy(r) : (a.pan && this._rawPanBy(r),
          this.fire("move"),
          a.debounceMoveend ? (clearTimeout(this._sizeTimer),
          this._sizeTimer = setTimeout(p(this.fire, this, "moveend"), 200)) : this.fire("moveend")),
          this.fire("resize", {
              oldSize: b,
              newSize: e
          })) : this
      },
      stop: function() {
          return this.setZoom(this._limitZoom(this._zoom)),
          this.options.zoomSnap || this.fire("viewreset"),
          this._stop()
      },
      locate: function(a) {
          if (a = this._locateOptions = g({
              timeout: 1E4,
              watch: !1
          }, a),
          !("geolocation"in navigator))
              return this._handleGeolocationError({
                  code: 0,
                  message: "Geolocation not supported."
              }),
              this;
          var b = p(this._handleGeolocationResponse, this)
            , e = p(this._handleGeolocationError, this);
          return a.watch ? this._locationWatchId = navigator.geolocation.watchPosition(b, e, a) : navigator.geolocation.getCurrentPosition(b, e, a),
          this
      },
      stopLocate: function() {
          return navigator.geolocation && navigator.geolocation.clearWatch && navigator.geolocation.clearWatch(this._locationWatchId),
          this._locateOptions && (this._locateOptions.setView = !1),
          this
      },
      _handleGeolocationError: function(a) {
          var b;
          this._container._leaflet_id && (b = a.code,
          a = a.message || (1 === b ? "permission denied" : 2 === b ? "position unavailable" : "timeout"),
          this._locateOptions.setView && !this._loaded && this.fitWorld(),
          this.fire("locationerror", {
              code: b,
              message: "Geolocation error: " + a + "."
          }))
      },
      _handleGeolocationResponse: function(a) {
          if (this._container._leaflet_id) {
              var b, e, r = new U(a.coords.latitude,a.coords.longitude), x = r.toBounds(2 * a.coords.accuracy), D = this._locateOptions, G = (D.setView && (b = this.getBoundsZoom(x),
              this.setView(r, D.maxZoom ? Math.min(b, D.maxZoom) : b)),
              {
                  latlng: r,
                  bounds: x,
                  timestamp: a.timestamp
              });
              for (e in a.coords)
                  "number" == typeof a.coords[e] && (G[e] = a.coords[e]);
              this.fire("locationfound", G)
          }
      },
      addHandler: function(a, b) {
          if (!b)
              return this;
          b = this[a] = new b(this);
          return this._handlers.push(b),
          this.options[a] && b.enable(),
          this
      },
      remove: function() {
          if (this._initEvents(!0),
          this.options.maxBounds && this.off("moveend", this._panInsideMaxBounds),
          this._containerId !== this._container._leaflet_id)
              throw Error("Map container is being reused by another instance");
          try {
              delete this._container._leaflet_id,
              delete this._containerId
          } catch (b) {
              this._containerId = this._container._leaflet_id = void 0
          }
          for (var a in void 0 !== this._locationWatchId && this.stopLocate(),
          this._stop(),
          ha(this._mapPane),
          this._clearControlPos && this._clearControlPos(),
          this._resizeRequest && (F(this._resizeRequest),
          this._resizeRequest = null),
          this._clearHandlers(),
          this._loaded && this.fire("unload"),
          this._layers)
              this._layers[a].remove();
          for (a in this._panes)
              ha(this._panes[a]);
          return this._layers = [],
          this._panes = [],
          delete this._mapPane,
          delete this._renderer,
          this
      },
      createPane: function(a, b) {
          b = V("div", "leaflet-pane" + (a ? " leaflet-" + a.replace("Pane", "") + "-pane" : ""), b || this._mapPane);
          return a && (this._panes[a] = b),
          b
      },
      getCenter: function() {
          return this._checkIfLoaded(),
          this._lastCenter && !this._moved() ? this._lastCenter : this.layerPointToLatLng(this._getCenterLayerPoint())
      },
      getZoom: function() {
          return this._zoom
      },
      getBounds: function() {
          var a = this.getPixelBounds();
          return new N(this.unproject(a.getBottomLeft()),this.unproject(a.getTopRight()))
      },
      getMinZoom: function() {
          return void 0 === this.options.minZoom ? this._layersMinZoom || 0 : this.options.minZoom
      },
      getMaxZoom: function() {
          return void 0 === this.options.maxZoom ? void 0 === this._layersMaxZoom ? 1 / 0 : this._layersMaxZoom : this.options.maxZoom
      },
      getBoundsZoom: function(a, b, e) {
          a = T(a);
          e = J(e || [0, 0]);
          var r = this.getZoom() || 0
            , x = this.getMinZoom()
            , D = this.getMaxZoom()
            , G = a.getNorthWest();
          a = a.getSouthEast();
          e = this.getSize().subtract(e);
          a = P(this.project(a, r), this.project(G, r)).getSize();
          G = S.any3d ? this.options.zoomSnap : 1;
          var K = e.x / a.x;
          e = e.y / a.y;
          a = b ? Math.max(K, e) : Math.min(K, e);
          r = this.getScaleZoom(a, r);
          return G && (r = G / 100 * Math.round(r / (G / 100)),
          r = b ? Math.ceil(r / G) * G : Math.floor(r / G) * G),
          Math.max(x, Math.min(D, r))
      },
      getSize: function() {
          return this._size && !this._sizeChanged || (this._size = new H(this._container.clientWidth || 0,this._container.clientHeight || 0),
          this._sizeChanged = !1),
          this._size.clone()
      },
      getPixelBounds: function(a, b) {
          a = this._getTopLeftPoint(a, b);
          return new O(a,a.add(this.getSize()))
      },
      getPixelOrigin: function() {
          return this._checkIfLoaded(),
          this._pixelOrigin
      },
      getPixelWorldBounds: function(a) {
          return this.options.crs.getProjectedBounds(void 0 === a ? this.getZoom() : a)
      },
      getPane: function(a) {
          return "string" == typeof a ? this._panes[a] : a
      },
      getPanes: function() {
          return this._panes
      },
      getContainer: function() {
          return this._container
      },
      getZoomScale: function(a, b) {
          var e = this.options.crs;
          return b = void 0 === b ? this._zoom : b,
          e.scale(a) / e.scale(b)
      },
      getScaleZoom: function(a, b) {
          var e = this.options.crs;
          a = (b = void 0 === b ? this._zoom : b,
          e.zoom(a * e.scale(b)));
          return isNaN(a) ? 1 / 0 : a
      },
      project: function(a, b) {
          return b = void 0 === b ? this._zoom : b,
          this.options.crs.latLngToPoint(W(a), b)
      },
      unproject: function(a, b) {
          return b = void 0 === b ? this._zoom : b,
          this.options.crs.pointToLatLng(J(a), b)
      },
      layerPointToLatLng: function(a) {
          a = J(a).add(this.getPixelOrigin());
          return this.unproject(a)
      },
      latLngToLayerPoint: function(a) {
          return this.project(W(a))._round()._subtract(this.getPixelOrigin())
      },
      wrapLatLng: function(a) {
          return this.options.crs.wrapLatLng(W(a))
      },
      wrapLatLngBounds: function(a) {
          return this.options.crs.wrapLatLngBounds(T(a))
      },
      distance: function(a, b) {
          return this.options.crs.distance(W(a), W(b))
      },
      containerPointToLayerPoint: function(a) {
          return J(a).subtract(this._getMapPanePos())
      },
      layerPointToContainerPoint: function(a) {
          return J(a).add(this._getMapPanePos())
      },
      containerPointToLatLng: function(a) {
          a = this.containerPointToLayerPoint(J(a));
          return this.layerPointToLatLng(a)
      },
      latLngToContainerPoint: function(a) {
          return this.layerPointToContainerPoint(this.latLngToLayerPoint(W(a)))
      },
      mouseEventToContainerPoint: function(a) {
          return Lc(a, this._container)
      },
      mouseEventToLayerPoint: function(a) {
          return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(a))
      },
      mouseEventToLatLng: function(a) {
          return this.layerPointToLatLng(this.mouseEventToLayerPoint(a))
      },
      _initContainer: function(a) {
          a = this._container = qa(a);
          if (!a)
              throw Error("Map container not found.");
          if (a._leaflet_id)
              throw Error("Map container is already initialized.");
          Y(a, "scroll", this._onScroll, this);
          this._containerId = d(a)
      },
      _initLayout: function() {
          var a = this._container
            , b = (this._fadeAnimated = this.options.fadeAnimation && S.any3d,
          Z(a, "leaflet-container" + (S.touch ? " leaflet-touch" : "") + (S.retina ? " leaflet-retina" : "") + (S.ielt9 ? " leaflet-oldie" : "") + (S.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : "")),
          xa(a, "position"));
          "absolute" !== b && "relative" !== b && "fixed" !== b && (a.style.position = "relative");
          this._initPanes();
          this._initControlPos && this._initControlPos()
      },
      _initPanes: function() {
          var a = this._panes = {};
          this._paneRenderers = {};
          this._mapPane = this.createPane("mapPane", this._container);
          la(this._mapPane, new H(0,0));
          this.createPane("tilePane");
          this.createPane("overlayPane");
          this.createPane("shadowPane");
          this.createPane("markerPane");
          this.createPane("tooltipPane");
          this.createPane("popupPane");
          this.options.markerZoomAnimation || (Z(a.markerPane, "leaflet-zoom-hide"),
          Z(a.shadowPane, "leaflet-zoom-hide"))
      },
      _resetView: function(a, b) {
          la(this._mapPane, new H(0,0));
          var e = !this._loaded
            , r = (this._loaded = !0,
          b = this._limitZoom(b),
          this.fire("viewprereset"),
          this._zoom !== b);
          this._moveStart(r, !1)._move(a, b)._moveEnd(r);
          this.fire("viewreset");
          e && this.fire("load")
      },
      _moveStart: function(a, b) {
          return a && this.fire("zoomstart"),
          b || this.fire("movestart"),
          this
      },
      _move: function(a, b, e, r) {
          void 0 === b && (b = this._zoom);
          var x = this._zoom !== b;
          return this._zoom = b,
          this._lastCenter = a,
          this._pixelOrigin = this._getNewPixelOrigin(a),
          r ? e && e.pinch && this.fire("zoom", e) : ((x || e && e.pinch) && this.fire("zoom", e),
          this.fire("move", e)),
          this
      },
      _moveEnd: function(a) {
          return a && this.fire("zoomend"),
          this.fire("moveend")
      },
      _stop: function() {
          return F(this._flyToFrame),
          this._panAnim && this._panAnim.stop(),
          this
      },
      _rawPanBy: function(a) {
          la(this._mapPane, this._getMapPanePos().subtract(a))
      },
      _getZoomSpan: function() {
          return this.getMaxZoom() - this.getMinZoom()
      },
      _panInsideMaxBounds: function() {
          this._enforcingBounds || this.panInsideBounds(this.options.maxBounds)
      },
      _checkIfLoaded: function() {
          if (!this._loaded)
              throw Error("Set map center and zoom first.");
      },
      _initEvents: function(a) {
          this._targets = {};
          var b = a ? da : Y;
          b((this._targets[d(this._container)] = this)._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this);
          this.options.trackResize && b(window, "resize", this._onResize, this);
          S.any3d && this.options.transform3DLimit && (a ? this.off : this.on).call(this, "moveend", this._onMoveEnd)
      },
      _onResize: function() {
          F(this._resizeRequest);
          this._resizeRequest = z(function() {
              this.invalidateSize({
                  debounceMoveend: !0
              })
          }, this)
      },
      _onScroll: function() {
          this._container.scrollTop = 0;
          this._container.scrollLeft = 0
      },
      _onMoveEnd: function() {
          var a = this._getMapPanePos();
          Math.max(Math.abs(a.x), Math.abs(a.y)) >= this.options.transform3DLimit && this._resetView(this.getCenter(), this.getZoom())
      },
      _findEventTargets: function(a, b) {
          for (var e, r = [], x = "mouseout" === b || "mouseover" === b, D = a.target || a.srcElement, G = !1; D; ) {
              if ((e = this._targets[d(D)]) && ("click" === b || "preclick" === b) && this._draggableMoved(e)) {
                  G = !0;
                  break
              }
              if (e && e.listens(b, !0)) {
                  if (x && !nc(D, a))
                      break;
                  if (r.push(e),
                  x)
                      break
              }
              if (D === this._container)
                  break;
              D = D.parentNode
          }
          return r.length || G || x || !this.listens(b, !0) ? r : [this]
      },
      _isClickDisabled: function(a) {
          for (; a !== this._container; ) {
              if (a._leaflet_disable_click)
                  return !0;
              a = a.parentNode
          }
      },
      _handleDOMEvent: function(a) {
          var b, e = a.target || a.srcElement;
          !this._loaded || e._leaflet_disable_events || "click" === a.type && this._isClickDisabled(e) || ("mousedown" === (b = a.type) && hc(e),
          this._fireDOMEvent(a, b))
      },
      _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
      _fireDOMEvent: function(a, b, e) {
          "click" === a.type && ((G = g({}, a)).type = "preclick",
          this._fireDOMEvent(G, G.type, e));
          var r = this._findEventTargets(a, b);
          if (e) {
              var x = [];
              for (G = 0; G < e.length; G++)
                  e[G].listens(b, !0) && x.push(e[G]);
              r = x.concat(r)
          }
          if (r.length) {
              "contextmenu" === b && ra(a);
              var D, G = r[0];
              e = {
                  originalEvent: a
              };
              "keypress" !== a.type && "keydown" !== a.type && "keyup" !== a.type && (D = G.getLatLng && (!G._radius || 10 >= G._radius),
              e.containerPoint = D ? this.latLngToContainerPoint(G.getLatLng()) : this.mouseEventToContainerPoint(a),
              e.layerPoint = this.containerPointToLayerPoint(e.containerPoint),
              e.latlng = D ? G.getLatLng() : this.layerPointToLatLng(e.layerPoint));
              for (G = 0; G < r.length && !(r[G].fire(b, e, !0),
              e.originalEvent._stopped || !1 === r[G].options.bubblingMouseEvents && -1 !== A(this._mouseEvents, b)); G++)
                  ;
          }
      },
      _draggableMoved: function(a) {
          return (a = a.dragging && a.dragging.enabled() ? a : this).dragging && a.dragging.moved() || this.boxZoom && this.boxZoom.moved()
      },
      _clearHandlers: function() {
          for (var a = 0, b = this._handlers.length; a < b; a++)
              this._handlers[a].disable()
      },
      whenReady: function(a, b) {
          return this._loaded ? a.call(b || this, {
              target: this
          }) : this.on("load", a, b),
          this
      },
      _getMapPanePos: function() {
          return Pa(this._mapPane) || new H(0,0)
      },
      _moved: function() {
          var a = this._getMapPanePos();
          return a && !a.equals([0, 0])
      },
      _getTopLeftPoint: function(a, b) {
          return (a && void 0 !== b ? this._getNewPixelOrigin(a, b) : this.getPixelOrigin()).subtract(this._getMapPanePos())
      },
      _getNewPixelOrigin: function(a, b) {
          var e = this.getSize()._divideBy(2);
          return this.project(a, b)._subtract(e)._add(this._getMapPanePos())._round()
      },
      _latLngToNewLayerPoint: function(a, b, e) {
          e = this._getNewPixelOrigin(e, b);
          return this.project(a, b)._subtract(e)
      },
      _latLngBoundsToNewLayerBounds: function(a, b, e) {
          e = this._getNewPixelOrigin(e, b);
          return P([this.project(a.getSouthWest(), b)._subtract(e), this.project(a.getNorthWest(), b)._subtract(e), this.project(a.getSouthEast(), b)._subtract(e), this.project(a.getNorthEast(), b)._subtract(e)])
      },
      _getCenterLayerPoint: function() {
          return this.containerPointToLayerPoint(this.getSize()._divideBy(2))
      },
      _getCenterOffset: function(a) {
          return this.latLngToLayerPoint(a).subtract(this._getCenterLayerPoint())
      },
      _limitCenter: function(a, b, e) {
          if (!e)
              return a;
          var r = this.project(a, b)
            , x = this.getSize().divideBy(2);
          x = new O(r.subtract(x),r.add(x));
          x = this._getBoundsOffset(x, e, b);
          return x.round().equals([0, 0]) ? a : this.unproject(r.add(x), b)
      },
      _limitOffset: function(a, b) {
          if (!b)
              return a;
          var e = this.getPixelBounds();
          e = new O(e.min.add(a),e.max.add(a));
          return a.add(this._getBoundsOffset(e, b))
      },
      _getBoundsOffset: function(a, b, e) {
          b = P(this.project(b.getNorthEast(), e), this.project(b.getSouthWest(), e));
          e = b.min.subtract(a.min);
          b = b.max.subtract(a.max);
          return new H(this._rebound(e.x, -b.x),this._rebound(e.y, -b.y))
      },
      _rebound: function(a, b) {
          return 0 < a + b ? Math.round(a - b) / 2 : Math.max(0, Math.ceil(a)) - Math.max(0, Math.floor(b))
      },
      _limitZoom: function(a) {
          var b = this.getMinZoom()
            , e = this.getMaxZoom()
            , r = S.any3d ? this.options.zoomSnap : 1;
          return r && (a = Math.round(a / r) * r),
          Math.max(b, Math.min(e, a))
      },
      _onPanTransitionStep: function() {
          this.fire("move")
      },
      _onPanTransitionEnd: function() {
          ja(this._mapPane, "leaflet-pan-anim");
          this.fire("moveend")
      },
      _tryAnimatedPan: function(a, b) {
          a = this._getCenterOffset(a)._trunc();
          return !(!0 !== (b && b.animate) && !this.getSize().contains(a)) && (this.panBy(a, b),
          !0)
      },
      _createAnimProxy: function() {
          var a = this._proxy = V("div", "leaflet-proxy leaflet-zoom-animated");
          this._panes.mapPane.appendChild(a);
          this.on("zoomanim", function(b) {
              var e = ec
                , r = this._proxy.style[e];
              Oa(this._proxy, this.project(b.center, b.zoom), this.getZoomScale(b.zoom, 1));
              r === this._proxy.style[e] && this._animatingZoom && this._onZoomTransitionEnd()
          }, this);
          this.on("load moveend", this._animMoveEnd, this);
          this._on("unload", this._destroyAnimProxy, this)
      },
      _destroyAnimProxy: function() {
          ha(this._proxy);
          this.off("load moveend", this._animMoveEnd, this);
          delete this._proxy
      },
      _animMoveEnd: function() {
          var a = this.getCenter()
            , b = this.getZoom();
          Oa(this._proxy, this.project(a, b), this.getZoomScale(b, 1))
      },
      _catchTransitionEnd: function(a) {
          this._animatingZoom && 0 <= a.propertyName.indexOf("transform") && this._onZoomTransitionEnd()
      },
      _nothingToAnimate: function() {
          return !this._container.getElementsByClassName("leaflet-zoom-animated").length
      },
      _tryAnimatedZoom: function(a, b, e) {
          if (this._animatingZoom)
              return !0;
          if (e = e || {},
          !this._zoomAnimated || !1 === e.animate || this._nothingToAnimate() || Math.abs(b - this._zoom) > this.options.zoomAnimationThreshold)
              return !1;
          var r = this.getZoomScale(b);
          r = this._getCenterOffset(a)._divideBy(1 - 1 / r);
          return !(!0 !== e.animate && !this.getSize().contains(r)) && (z(function() {
              this._moveStart(!0, !1)._animateZoom(a, b, !0)
          }, this),
          !0)
      },
      _animateZoom: function(a, b, e, r) {
          this._mapPane && (e && (this._animatingZoom = !0,
          this._animateToCenter = a,
          this._animateToZoom = b,
          Z(this._mapPane, "leaflet-zoom-anim")),
          this.fire("zoomanim", {
              center: a,
              zoom: b,
              noUpdate: r
          }),
          this._tempFireZoomEvent || (this._tempFireZoomEvent = this._zoom !== this._animateToZoom),
          this._move(this._animateToCenter, this._animateToZoom, void 0, !0),
          setTimeout(p(this._onZoomTransitionEnd, this), 250))
      },
      _onZoomTransitionEnd: function() {
          this._animatingZoom && (this._mapPane && ja(this._mapPane, "leaflet-zoom-anim"),
          this._animatingZoom = !1,
          this._move(this._animateToCenter, this._animateToZoom, void 0, !0),
          this._tempFireZoomEvent && this.fire("zoom"),
          delete this._tempFireZoomEvent,
          this.fire("move"),
          this._moveEnd(!0))
      }
  }), Qc, ya = I.extend({
      options: {
          position: "topright"
      },
      initialize: function(a) {
          v(this, a)
      },
      getPosition: function() {
          return this.options.position
      },
      setPosition: function(a) {
          var b = this._map;
          return b && b.removeControl(this),
          this.options.position = a,
          b && b.addControl(this),
          this
      },
      getContainer: function() {
          return this._container
      },
      addTo: function(a) {
          this.remove();
          this._map = a;
          var b = this._container = this.onAdd(a)
            , e = this.getPosition();
          a = a._controlCorners[e];
          return Z(b, "leaflet-control"),
          -1 !== e.indexOf("bottom") ? a.insertBefore(b, a.firstChild) : a.appendChild(b),
          this._map.on("unload", this.remove, this),
          this
      },
      remove: function() {
          return this._map && (ha(this._container),
          this.onRemove && this.onRemove(this._map),
          this._map.off("unload", this.remove, this),
          this._map = null),
          this
      },
      _refocusOnMap: function(a) {
          this._map && a && 0 < a.screenX && 0 < a.screenY && this._map.getContainer().focus()
      }
  }), ed = (aa.include({
      addControl: function(a) {
          return a.addTo(this),
          this
      },
      removeControl: function(a) {
          return a.remove(),
          this
      },
      _initControlPos: function() {
          function a(r, x) {
              b[r + x] = V("div", "leaflet-" + r + " leaflet-" + x, e)
          }
          var b = this._controlCorners = {}
            , e = this._controlContainer = V("div", "leaflet-control-container", this._container);
          a("top", "left");
          a("top", "right");
          a("bottom", "left");
          a("bottom", "right")
      },
      _clearControlPos: function() {
          for (var a in this._controlCorners)
              ha(this._controlCorners[a]);
          ha(this._controlContainer);
          delete this._controlCorners;
          delete this._controlContainer
      }
  }),
  ya.extend({
      options: {
          collapsed: !0,
          position: "topright",
          autoZIndex: !0,
          hideSingleBase: !1,
          sortLayers: !1,
          sortFunction: function(a, b, e, r) {
              return e < r ? -1 : r < e ? 1 : 0
          }
      },
      initialize: function(a, b, e) {
          for (var r in v(this, e),
          this._layerControlInputs = [],
          this._layers = [],
          this._lastZIndex = 0,
          this._handlingClick = !1,
          a)
              this._addLayer(a[r], r);
          for (r in b)
              this._addLayer(b[r], r, !0)
      },
      onAdd: function(a) {
          this._initLayout();
          this._update();
          (this._map = a).on("zoomend", this._checkDisabledLayers, this);
          for (a = 0; a < this._layers.length; a++)
              this._layers[a].layer.on("add remove", this._onLayerChange, this);
          return this._container
      },
      addTo: function(a) {
          return ya.prototype.addTo.call(this, a),
          this._expandIfNotCollapsed()
      },
      onRemove: function() {
          this._map.off("zoomend", this._checkDisabledLayers, this);
          for (var a = 0; a < this._layers.length; a++)
              this._layers[a].layer.off("add remove", this._onLayerChange, this)
      },
      addBaseLayer: function(a, b) {
          return this._addLayer(a, b),
          this._map ? this._update() : this
      },
      addOverlay: function(a, b) {
          return this._addLayer(a, b, !0),
          this._map ? this._update() : this
      },
      removeLayer: function(a) {
          a.off("add remove", this._onLayerChange, this);
          a = this._getLayer(d(a));
          return a && this._layers.splice(this._layers.indexOf(a), 1),
          this._map ? this._update() : this
      },
      expand: function() {
          Z(this._container, "leaflet-control-layers-expanded");
          this._section.style.height = null;
          var a = this._map.getSize().y - (this._container.offsetTop + 50);
          return a < this._section.clientHeight ? (Z(this._section, "leaflet-control-layers-scrollbar"),
          this._section.style.height = a + "px") : ja(this._section, "leaflet-control-layers-scrollbar"),
          this._checkDisabledLayers(),
          this
      },
      collapse: function() {
          return ja(this._container, "leaflet-control-layers-expanded"),
          this
      },
      _initLayout: function() {
          var a = this._container = V("div", "leaflet-control-layers")
            , b = this.options.collapsed
            , e = (a.setAttribute("aria-haspopup", !0),
          hb(a),
          oc(a),
          this._section = V("section", "leaflet-control-layers-list"))
            , r = (b && (this._map.on("click", this.collapse, this),
          Y(a, {
              mouseenter: function() {
                  Y(e, "click", ra);
                  this.expand();
                  setTimeout(function() {
                      da(e, "click", ra)
                  })
              },
              mouseleave: this.collapse
          }, this)),
          this._layersLink = V("a", "leaflet-control-layers-toggle", a));
          r.href = "#";
          r.title = "Layers";
          r.setAttribute("role", "button");
          Y(r, "click", ra);
          Y(r, "focus", this.expand, this);
          b || this.expand();
          this._baseLayersList = V("div", "leaflet-control-layers-base", e);
          this._separator = V("div", "leaflet-control-layers-separator", e);
          this._overlaysList = V("div", "leaflet-control-layers-overlays", e);
          a.appendChild(e)
      },
      _getLayer: function(a) {
          for (var b = 0; b < this._layers.length; b++)
              if (this._layers[b] && d(this._layers[b].layer) === a)
                  return this._layers[b]
      },
      _addLayer: function(a, b, e) {
          this._map && a.on("add remove", this._onLayerChange, this);
          this._layers.push({
              layer: a,
              name: b,
              overlay: e
          });
          this.options.sortLayers && this._layers.sort(p(function(r, x) {
              return this.options.sortFunction(r.layer, x.layer, r.name, x.name)
          }, this));
          this.options.autoZIndex && a.setZIndex && (this._lastZIndex++,
          a.setZIndex(this._lastZIndex));
          this._expandIfNotCollapsed()
      },
      _update: function() {
          if (!this._container)
              return this;
          Ab(this._baseLayersList);
          Ab(this._overlaysList);
          this._layerControlInputs = [];
          for (var a, b, e, r = 0, x = 0; x < this._layers.length; x++)
              e = this._layers[x],
              this._addItem(e),
              b = b || e.overlay,
              a = a || !e.overlay,
              r += e.overlay ? 0 : 1;
          return this.options.hideSingleBase && (this._baseLayersList.style.display = (a = a && 1 < r) ? "" : "none"),
          this._separator.style.display = b && a ? "" : "none",
          this
      },
      _onLayerChange: function(a) {
          this._handlingClick || this._update();
          var b = this._getLayer(d(a.target));
          (a = b.overlay ? "add" === a.type ? "overlayadd" : "overlayremove" : "add" === a.type ? "baselayerchange" : null) && this._map.fire(a, b)
      },
      _createRadioElement: function(a, b) {
          a = '<input type="radio" class="leaflet-control-layers-selector" name="' + a + '"' + (b ? ' checked="checked"' : "") + "/>";
          b = document.createElement("div");
          return b.innerHTML = a,
          b.firstChild
      },
      _addItem: function(a) {
          var b, e = document.createElement("label"), r = this._map.hasLayer(a.layer);
          r = (a.overlay ? ((b = document.createElement("input")).type = "checkbox",
          b.className = "leaflet-control-layers-selector",
          b.defaultChecked = r) : b = this._createRadioElement("leaflet-base-layers_" + d(this), r),
          this._layerControlInputs.push(b),
          b.layerId = d(a.layer),
          Y(b, "click", this._onInputClick, this),
          document.createElement("span"));
          var x = (r.innerHTML = " " + a.name,
          document.createElement("span"));
          return e.appendChild(x),
          x.appendChild(b),
          x.appendChild(r),
          (a.overlay ? this._overlaysList : this._baseLayersList).appendChild(e),
          this._checkDisabledLayers(),
          e
      },
      _onInputClick: function() {
          var a = this._layerControlInputs
            , b = []
            , e = [];
          this._handlingClick = !0;
          for (var r = a.length - 1; 0 <= r; r--) {
              var x = a[r];
              var D = this._getLayer(x.layerId).layer;
              x.checked ? b.push(D) : x.checked || e.push(D)
          }
          for (r = 0; r < e.length; r++)
              this._map.hasLayer(e[r]) && this._map.removeLayer(e[r]);
          for (r = 0; r < b.length; r++)
              this._map.hasLayer(b[r]) || this._map.addLayer(b[r]);
          this._handlingClick = !1;
          this._refocusOnMap()
      },
      _checkDisabledLayers: function() {
          for (var a, b, e = this._layerControlInputs, r = this._map.getZoom(), x = e.length - 1; 0 <= x; x--)
              a = e[x],
              b = this._getLayer(a.layerId).layer,
              a.disabled = void 0 !== b.options.minZoom && r < b.options.minZoom || void 0 !== b.options.maxZoom && r > b.options.maxZoom
      },
      _expandIfNotCollapsed: function() {
          return this._map && !this.options.collapsed && this.expand(),
          this
      }
  })), xc = ya.extend({
      options: {
          position: "topleft",
          zoomInText: '<span aria-hidden="true">+</span>',
          zoomInTitle: "Zoom in",
          zoomOutText: '<span aria-hidden="true">&#x2212;</span>',
          zoomOutTitle: "Zoom out"
      },
      onAdd: function(a) {
          var b = V("div", "leaflet-control-zoom leaflet-bar")
            , e = this.options;
          return this._zoomInButton = this._createButton(e.zoomInText, e.zoomInTitle, "leaflet-control-zoom-in", b, this._zoomIn),
          this._zoomOutButton = this._createButton(e.zoomOutText, e.zoomOutTitle, "leaflet-control-zoom-out", b, this._zoomOut),
          this._updateDisabled(),
          a.on("zoomend zoomlevelschange", this._updateDisabled, this),
          b
      },
      onRemove: function(a) {
          a.off("zoomend zoomlevelschange", this._updateDisabled, this)
      },
      disable: function() {
          return this._disabled = !0,
          this._updateDisabled(),
          this
      },
      enable: function() {
          return this._disabled = !1,
          this._updateDisabled(),
          this
      },
      _zoomIn: function(a) {
          !this._disabled && this._map._zoom < this._map.getMaxZoom() && this._map.zoomIn(this._map.options.zoomDelta * (a.shiftKey ? 3 : 1))
      },
      _zoomOut: function(a) {
          !this._disabled && this._map._zoom > this._map.getMinZoom() && this._map.zoomOut(this._map.options.zoomDelta * (a.shiftKey ? 3 : 1))
      },
      _createButton: function(a, b, e, r, x) {
          e = V("a", e, r);
          return e.innerHTML = a,
          e.href = "#",
          e.title = b,
          e.setAttribute("role", "button"),
          e.setAttribute("aria-label", b),
          hb(e),
          Y(e, "click", Ra),
          Y(e, "click", x, this),
          Y(e, "click", this._refocusOnMap, this),
          e
      },
      _updateDisabled: function() {
          var a = this._map;
          ja(this._zoomInButton, "leaflet-disabled");
          ja(this._zoomOutButton, "leaflet-disabled");
          this._zoomInButton.setAttribute("aria-disabled", "false");
          this._zoomOutButton.setAttribute("aria-disabled", "false");
          !this._disabled && a._zoom !== a.getMinZoom() || (Z(this._zoomOutButton, "leaflet-disabled"),
          this._zoomOutButton.setAttribute("aria-disabled", "true"));
          !this._disabled && a._zoom !== a.getMaxZoom() || (Z(this._zoomInButton, "leaflet-disabled"),
          this._zoomInButton.setAttribute("aria-disabled", "true"))
      }
  }), fd = (aa.mergeOptions({
      zoomControl: !0
  }),
  aa.addInitHook(function() {
      this.options.zoomControl && (this.zoomControl = new xc,
      this.addControl(this.zoomControl))
  }),
  ya.extend({
      options: {
          position: "bottomleft",
          maxWidth: 100,
          metric: !0,
          imperial: !0
      },
      onAdd: function(a) {
          var b = V("div", "leaflet-control-scale")
            , e = this.options;
          return this._addScales(e, "leaflet-control-scale-line", b),
          a.on(e.updateWhenIdle ? "moveend" : "move", this._update, this),
          a.whenReady(this._update, this),
          b
      },
      onRemove: function(a) {
          a.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this)
      },
      _addScales: function(a, b, e) {
          a.metric && (this._mScale = V("div", b, e));
          a.imperial && (this._iScale = V("div", b, e))
      },
      _update: function() {
          var a = this._map
            , b = a.getSize().y / 2;
          a = a.distance(a.containerPointToLatLng([0, b]), a.containerPointToLatLng([this.options.maxWidth, b]));
          this._updateScales(a)
      },
      _updateScales: function(a) {
          this.options.metric && a && this._updateMetric(a);
          this.options.imperial && a && this._updateImperial(a)
      },
      _updateMetric: function(a) {
          var b = this._getRoundNum(a);
          this._updateScale(this._mScale, 1E3 > b ? b + " m" : b / 1E3 + " km", b / a)
      },
      _updateImperial: function(a) {
          var b, e;
          a *= 3.2808399;
          5280 < a ? (e = this._getRoundNum(b = a / 5280),
          this._updateScale(this._iScale, e + " mi", e / b)) : (e = this._getRoundNum(a),
          this._updateScale(this._iScale, e + " ft", e / a))
      },
      _updateScale: function(a, b, e) {
          a.style.width = Math.round(this.options.maxWidth * e) + "px";
          a.innerHTML = b
      },
      _getRoundNum: function(a) {
          var b = Math.pow(10, (Math.floor(a) + "").length - 1);
          a /= b;
          return b * (10 <= a ? 10 : 5 <= a ? 5 : 3 <= a ? 3 : 2 <= a ? 2 : 1)
      }
  })), yc = ya.extend({
      options: {
          position: "bottomright",
          prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (S.inlineSvg ? '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg> ' : "") + "Leaflet</a>"
      },
      initialize: function(a) {
          v(this, a);
          this._attributions = {}
      },
      onAdd: function(a) {
          for (var b in (a.attributionControl = this)._container = V("div", "leaflet-control-attribution"),
          hb(this._container),
          a._layers)
              a._layers[b].getAttribution && this.addAttribution(a._layers[b].getAttribution());
          return this._update(),
          a.on("layeradd", this._addAttribution, this),
          this._container
      },
      onRemove: function(a) {
          a.off("layeradd", this._addAttribution, this)
      },
      _addAttribution: function(a) {
          a.layer.getAttribution && (this.addAttribution(a.layer.getAttribution()),
          a.layer.once("remove", function() {
              this.removeAttribution(a.layer.getAttribution())
          }, this))
      },
      setPrefix: function(a) {
          return this.options.prefix = a,
          this._update(),
          this
      },
      addAttribution: function(a) {
          return a && (this._attributions[a] || (this._attributions[a] = 0),
          this._attributions[a]++,
          this._update()),
          this
      },
      removeAttribution: function(a) {
          return a && this._attributions[a] && (this._attributions[a]--,
          this._update()),
          this
      },
      _update: function() {
          if (this._map) {
              var a = [];
              for (b in this._attributions)
                  this._attributions[b] && a.push(b);
              var b = [];
              this.options.prefix && b.push(this.options.prefix);
              a.length && b.push(a.join(", "));
              this._container.innerHTML = b.join(' <span aria-hidden="true">|</span> ')
          }
      }
  });
  va = (aa.mergeOptions({
      attributionControl: !0
  }),
  aa.addInitHook(function() {
      this.options.attributionControl && (new yc).addTo(this)
  }),
  ya.Layers = ed,
  ya.Zoom = xc,
  ya.Scale = fd,
  ya.Attribution = yc,
  ib.layers = function(a, b, e) {
      return new ed(a,b,e)
  }
  ,
  ib.zoom = function(a) {
      return new xc(a)
  }
  ,
  ib.scale = function(a) {
      return new fd(a)
  }
  ,
  ib.attribution = function(a) {
      return new yc(a)
  }
  ,
  I.extend({
      initialize: function(a) {
          this._map = a
      },
      enable: function() {
          return this._enabled || (this._enabled = !0,
          this.addHooks()),
          this
      },
      disable: function() {
          return this._enabled && (this._enabled = !1,
          this.removeHooks()),
          this
      },
      enabled: function() {
          return !!this._enabled
      }
  }));
  ob = (va.addTo = function(a, b) {
      return a.addHandler(b, this),
      this
  }
  ,
  {
      Events: ua
  });
  var gd = S.touch ? "touchstart mousedown" : "mousedown"
    , Ma = mb.extend({
      options: {
          clickTolerance: 3
      },
      initialize: function(a, b, e, r) {
          v(this, r);
          this._element = a;
          this._dragStartTarget = b || a;
          this._preventOutline = e
      },
      enable: function() {
          this._enabled || (Y(this._dragStartTarget, gd, this._onDown, this),
          this._enabled = !0)
      },
      disable: function() {
          this._enabled && (Ma._dragging === this && this.finishDrag(!0),
          da(this._dragStartTarget, gd, this._onDown, this),
          this._enabled = !1,
          this._moved = !1)
      },
      _onDown: function(a) {
          var b, e;
          this._enabled && (this._moved = !1,
          cc(this._element, "leaflet-zoom-anim") || (a.touches && 1 !== a.touches.length ? Ma._dragging === this && this.finishDrag() : Ma._dragging || a.shiftKey || 1 !== a.which && 1 !== a.button && !a.touches || ((Ma._dragging = this)._preventOutline && hc(this._element),
          fc(),
          tb(),
          this._moving || (this.fire("down"),
          e = a.touches ? a.touches[0] : a,
          b = Jc(this._element),
          this._startPoint = new H(e.clientX,e.clientY),
          this._startPos = Pa(this._element),
          this._parentScale = jc(b),
          e = "mousedown" === a.type,
          Y(document, e ? "mousemove" : "touchmove", this._onMove, this),
          Y(document, e ? "mouseup" : "touchend touchcancel", this._onUp, this)))))
      },
      _onMove: function(a) {
          var b;
          this._enabled && (a.touches && 1 < a.touches.length ? this._moved = !0 : !(b = (new H((b = a.touches && 1 === a.touches.length ? a.touches[0] : a).clientX,b.clientY))._subtract(this._startPoint)).x && !b.y || Math.abs(b.x) + Math.abs(b.y) < this.options.clickTolerance || (b.x /= this._parentScale.x,
          b.y /= this._parentScale.y,
          ra(a),
          this._moved || (this.fire("dragstart"),
          this._moved = !0,
          Z(document.body, "leaflet-dragging"),
          this._lastTarget = a.target || a.srcElement,
          window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement),
          Z(this._lastTarget, "leaflet-drag-target")),
          this._newPos = this._startPos.add(b),
          this._moving = !0,
          this._lastEvent = a,
          this._updatePosition()))
      },
      _updatePosition: function() {
          var a = {
              originalEvent: this._lastEvent
          };
          this.fire("predrag", a);
          la(this._element, this._newPos);
          this.fire("drag", a)
      },
      _onUp: function() {
          this._enabled && this.finishDrag()
      },
      finishDrag: function(a) {
          ja(document.body, "leaflet-dragging");
          this._lastTarget && (ja(this._lastTarget, "leaflet-drag-target"),
          this._lastTarget = null);
          da(document, "mousemove touchmove", this._onMove, this);
          da(document, "mouseup touchend touchcancel", this._onUp, this);
          gc();
          wc();
          this._moved && this._moving && this.fire("dragend", {
              noInertia: a,
              distance: this._newPos.distanceTo(this._startPos)
          });
          this._moving = !1;
          Ma._dragging = !1
      }
  });
  Lb = {
      __proto__: null,
      simplify: Nc,
      pointToSegmentDistance: Oc,
      closestPointOnSegment: function(a, b, e) {
          return jb(a, b, e)
      },
      clipSegment: Pc,
      _getEdgeIntersection: Hb,
      _getBitCode: Ua,
      _sqClosestPointOnSegment: jb,
      isFlat: Da,
      _flat: Rc
  };
  Mb = {
      __proto__: null,
      clipPolygon: Sc
  };
  Va = {
      project: function(a) {
          return new H(a.lng,a.lat)
      },
      unproject: function(a) {
          return new U(a.y,a.x)
      },
      bounds: new O([-180, -90],[180, 90])
  };
  Wa = {
      R: 6378137,
      R_MINOR: 6356752.314245179,
      bounds: new O([-2.003750834279E7, -1.549657073972E7],[2.003750834279E7, 1.876465623138E7]),
      project: function(a) {
          var b = Math.PI / 180
            , e = this.R
            , r = a.lat * b
            , x = this.R_MINOR / e;
          x = Math.sqrt(1 - x * x);
          var D = x * Math.sin(r);
          D = Math.tan(Math.PI / 4 - r / 2) / Math.pow((1 - D) / (1 + D), x / 2);
          r = -e * Math.log(Math.max(D, 1E-10));
          return new H(a.lng * b * e,r)
      },
      unproject: function(a) {
          var b, e = 180 / Math.PI, r = this.R, x = this.R_MINOR / r;
          x = Math.sqrt(1 - x * x);
          var D = Math.exp(-a.y / r)
            , G = Math.PI / 2 - 2 * Math.atan(D)
            , K = 0;
          for (b = .1; 15 > K && 1E-7 < Math.abs(b); K++)
              b = x * Math.sin(G),
              b = Math.pow((1 - b) / (1 + b), x / 2),
              G += b = Math.PI / 2 - 2 * Math.atan(D * b) - G;
          return new U(G * e,a.x * e / r)
      }
  };
  Nb = {
      __proto__: null,
      LonLat: Va,
      Mercator: Wa,
      SphericalMercator: Ha
  };
  tc = g({}, Ka, {
      code: "EPSG:3395",
      projection: Wa,
      transformation: fa(Ob = .5 / (Math.PI * Wa.R), .5, -Ob, .5)
  });
  var hd = g({}, Ka, {
      code: "EPSG:4326",
      projection: Va,
      transformation: fa(1 / 180, 1, -1 / 180, .5)
  });
  Pb = g({}, Ga, {
      projection: Va,
      transformation: fa(1, 0, -1, 0),
      scale: function(a) {
          return Math.pow(2, a)
      },
      zoom: function(a) {
          return Math.log(a) / Math.LN2
      },
      distance: function(a, b) {
          var e = b.lng - a.lng;
          b = b.lat - a.lat;
          return Math.sqrt(e * e + b * b)
      },
      infinite: !0
  });
  ta = (Ga.Earth = Ka,
  Ga.EPSG3395 = tc,
  Ga.EPSG3857 = nb,
  Ga.EPSG900913 = rd,
  Ga.EPSG4326 = hd,
  Ga.Simple = Pb,
  mb.extend({
      options: {
          pane: "overlayPane",
          attribution: null,
          bubblingMouseEvents: !0
      },
      addTo: function(a) {
          return a.addLayer(this),
          this
      },
      remove: function() {
          return this.removeFrom(this._map || this._mapToAdd)
      },
      removeFrom: function(a) {
          return a && a.removeLayer(this),
          this
      },
      getPane: function(a) {
          return this._map.getPane(a ? this.options[a] || a : this.options.pane)
      },
      addInteractiveTarget: function(a) {
          return this._map._targets[d(a)] = this
      },
      removeInteractiveTarget: function(a) {
          return delete this._map._targets[d(a)],
          this
      },
      getAttribution: function() {
          return this.options.attribution
      },
      _layerAdd: function(a) {
          var b, e = a.target;
          e.hasLayer(this) && (this._map = e,
          this._zoomAnimated = e._zoomAnimated,
          this.getEvents && (b = this.getEvents(),
          e.on(b, this),
          this.once("remove", function() {
              e.off(b, this)
          }, this)),
          this.onAdd(e),
          this.fire("add"),
          e.fire("layeradd", {
              layer: this
          }))
      }
  }));
  var fb = (aa.include({
      addLayer: function(a) {
          if (!a._layerAdd)
              throw Error("The provided object is not a Layer.");
          var b = d(a);
          return this._layers[b] || ((this._layers[b] = a)._mapToAdd = this,
          a.beforeAdd && a.beforeAdd(this),
          this.whenReady(a._layerAdd, a)),
          this
      },
      removeLayer: function(a) {
          var b = d(a);
          return this._layers[b] && (this._loaded && a.onRemove(this),
          delete this._layers[b],
          this._loaded && (this.fire("layerremove", {
              layer: a
          }),
          a.fire("remove")),
          a._map = a._mapToAdd = null),
          this
      },
      hasLayer: function(a) {
          return d(a)in this._layers
      },
      eachLayer: function(a, b) {
          for (var e in this._layers)
              a.call(b, this._layers[e]);
          return this
      },
      _addLayers: function(a) {
          for (var b = 0, e = (a = a ? Aa(a) ? a : [a] : []).length; b < e; b++)
              this.addLayer(a[b])
      },
      _addZoomLimit: function(a) {
          isNaN(a.options.maxZoom) && isNaN(a.options.minZoom) || (this._zoomBoundLayers[d(a)] = a,
          this._updateZoomLevels())
      },
      _removeZoomLimit: function(a) {
          a = d(a);
          this._zoomBoundLayers[a] && (delete this._zoomBoundLayers[a],
          this._updateZoomLevels())
      },
      _updateZoomLevels: function() {
          var a, b = 1 / 0, e = -1 / 0, r = this._getZoomSpan();
          for (a in this._zoomBoundLayers) {
              var x = this._zoomBoundLayers[a].options;
              b = void 0 === x.minZoom ? b : Math.min(b, x.minZoom);
              e = void 0 === x.maxZoom ? e : Math.max(e, x.maxZoom)
          }
          this._layersMaxZoom = e === -1 / 0 ? void 0 : e;
          this._layersMinZoom = b === 1 / 0 ? void 0 : b;
          r !== this._getZoomSpan() && this.fire("zoomlevelschange");
          void 0 === this.options.maxZoom && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom);
          void 0 === this.options.minZoom && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom)
      }
  }),
  ta.extend({
      initialize: function(a, b) {
          var e;
          if (v(this, b),
          this._layers = {},
          a)
              for (b = 0,
              e = a.length; b < e; b++)
                  this.addLayer(a[b])
      },
      addLayer: function(a) {
          var b = this.getLayerId(a);
          return this._layers[b] = a,
          this._map && this._map.addLayer(a),
          this
      },
      removeLayer: function(a) {
          a = a in this._layers ? a : this.getLayerId(a);
          return this._map && this._layers[a] && this._map.removeLayer(this._layers[a]),
          delete this._layers[a],
          this
      },
      hasLayer: function(a) {
          return ("number" == typeof a ? a : this.getLayerId(a))in this._layers
      },
      clearLayers: function() {
          return this.eachLayer(this.removeLayer, this)
      },
      invoke: function(a) {
          var b, e, r = Array.prototype.slice.call(arguments, 1);
          for (b in this._layers)
              (e = this._layers[b])[a] && e[a].apply(e, r);
          return this
      },
      onAdd: function(a) {
          this.eachLayer(a.addLayer, a)
      },
      onRemove: function(a) {
          this.eachLayer(a.removeLayer, a)
      },
      eachLayer: function(a, b) {
          for (var e in this._layers)
              a.call(b, this._layers[e]);
          return this
      },
      getLayer: function(a) {
          return this._layers[a]
      },
      getLayers: function() {
          var a = [];
          return this.eachLayer(a.push, a),
          a
      },
      setZIndex: function(a) {
          return this.invoke("setZIndex", a)
      },
      getLayerId: d
  }))
    , $a = fb.extend({
      addLayer: function(a) {
          return this.hasLayer(a) ? this : (a.addEventParent(this),
          fb.prototype.addLayer.call(this, a),
          this.fire("layeradd", {
              layer: a
          }))
      },
      removeLayer: function(a) {
          return this.hasLayer(a) ? ((a = a in this._layers ? this._layers[a] : a).removeEventParent(this),
          fb.prototype.removeLayer.call(this, a),
          this.fire("layerremove", {
              layer: a
          })) : this
      },
      setStyle: function(a) {
          return this.invoke("setStyle", a)
      },
      bringToFront: function() {
          return this.invoke("bringToFront")
      },
      bringToBack: function() {
          return this.invoke("bringToBack")
      },
      getBounds: function() {
          var a, b = new N;
          for (a in this._layers) {
              var e = this._layers[a];
              b.extend(e.getBounds ? e.getBounds() : e.getLatLng())
          }
          return b
      }
  })
    , gb = I.extend({
      options: {
          popupAnchor: [0, 0],
          tooltipAnchor: [0, 0],
          crossOrigin: !1
      },
      initialize: function(a) {
          v(this, a)
      },
      createIcon: function(a) {
          return this._createIcon("icon", a)
      },
      createShadow: function(a) {
          return this._createIcon("shadow", a)
      },
      _createIcon: function(a, b) {
          var e = this._getIconUrl(a);
          if (!e) {
              if ("icon" === a)
                  throw Error("iconUrl not set in Icon options (see the docs).");
              return null
          }
          e = this._createImg(e, b && "IMG" === b.tagName ? b : null);
          return this._setIconStyles(e, a),
          !this.options.crossOrigin && "" !== this.options.crossOrigin || (e.crossOrigin = !0 === this.options.crossOrigin ? "" : this.options.crossOrigin),
          e
      },
      _setIconStyles: function(a, b) {
          var e = this.options
            , r = e[b + "Size"];
          r = J(r = "number" == typeof r ? [r, r] : r);
          var x = J("shadow" === b && e.shadowAnchor || e.iconAnchor || r && r.divideBy(2, !0));
          a.className = "leaflet-marker-" + b + " " + (e.className || "");
          x && (a.style.marginLeft = -x.x + "px",
          a.style.marginTop = -x.y + "px");
          r && (a.style.width = r.x + "px",
          a.style.height = r.y + "px")
      },
      _createImg: function(a, b) {
          return (b = b || document.createElement("img")).src = a,
          b
      },
      _getIconUrl: function(a) {
          return S.retina && this.options[a + "RetinaUrl"] || this.options[a + "Url"]
      }
  })
    , wb = gb.extend({
      options: {
          iconUrl: "marker-icon.png",
          iconRetinaUrl: "marker-icon-2x.png",
          shadowUrl: "marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
          shadowSize: [41, 41]
      },
      _getIconUrl: function(a) {
          return "string" != typeof wb.imagePath && (wb.imagePath = this._detectIconPath()),
          (this.options.imagePath || wb.imagePath) + gb.prototype._getIconUrl.call(this, a)
      },
      _stripUrl: function(a) {
          var b = /^url\((['"])?(.+)\1\)$/, e;
          if (e = a = (b = b.exec(a)) && b[2])
              b = /^(.*)marker-icon\.png$/,
              e = (b = b.exec(a)) && b[1];
          return e
      },
      _detectIconPath: function() {
          var a = V("div", "leaflet-default-icon-path", document.body)
            , b = xa(a, "background-image") || xa(a, "backgroundImage");
          return (document.body.removeChild(a),
          b = this._stripUrl(b)) ? b : (a = document.querySelector('link[href$="leaflet.css"]')) ? a.href.substring(0, a.href.length - 11 - 1) : ""
      }
  })
    , id = va.extend({
      initialize: function(a) {
          this._marker = a
      },
      addHooks: function() {
          var a = this._marker._icon;
          this._draggable || (this._draggable = new Ma(a,a,!0));
          this._draggable.on({
              dragstart: this._onDragStart,
              predrag: this._onPreDrag,
              drag: this._onDrag,
              dragend: this._onDragEnd
          }, this).enable();
          Z(a, "leaflet-marker-draggable")
      },
      removeHooks: function() {
          this._draggable.off({
              dragstart: this._onDragStart,
              predrag: this._onPreDrag,
              drag: this._onDrag,
              dragend: this._onDragEnd
          }, this).disable();
          this._marker._icon && ja(this._marker._icon, "leaflet-marker-draggable")
      },
      moved: function() {
          return this._draggable && this._draggable._moved
      },
      _adjustPan: function(a) {
          var b = this._marker
            , e = b._map
            , r = this._marker.options.autoPanSpeed
            , x = this._marker.options.autoPanPadding
            , D = Pa(b._icon)
            , G = e.getPixelBounds()
            , K = e.getPixelOrigin();
          K = P(G.min._subtract(K).add(x), G.max._subtract(K).subtract(x));
          K.contains(D) || (x = J((Math.max(K.max.x, D.x) - K.max.x) / (G.max.x - K.max.x) - (Math.min(K.min.x, D.x) - K.min.x) / (G.min.x - K.min.x), (Math.max(K.max.y, D.y) - K.max.y) / (G.max.y - K.max.y) - (Math.min(K.min.y, D.y) - K.min.y) / (G.min.y - K.min.y)).multiplyBy(r),
          e.panBy(x, {
              animate: !1
          }),
          this._draggable._newPos._add(x),
          this._draggable._startPos._add(x),
          la(b._icon, this._draggable._newPos),
          this._onDrag(a),
          this._panRequest = z(this._adjustPan.bind(this, a)))
      },
      _onDragStart: function() {
          this._oldLatLng = this._marker.getLatLng();
          this._marker.closePopup && this._marker.closePopup();
          this._marker.fire("movestart").fire("dragstart")
      },
      _onPreDrag: function(a) {
          this._marker.options.autoPan && (F(this._panRequest),
          this._panRequest = z(this._adjustPan.bind(this, a)))
      },
      _onDrag: function(a) {
          var b = this._marker
            , e = b._shadow
            , r = Pa(b._icon)
            , x = b._map.layerPointToLatLng(r);
          e && la(e, r);
          b._latlng = x;
          a.latlng = x;
          a.oldLatLng = this._oldLatLng;
          b.fire("move", a).fire("drag", a)
      },
      _onDragEnd: function(a) {
          F(this._panRequest);
          delete this._oldLatLng;
          this._marker.fire("moveend").fire("dragend", a)
      }
  })
    , kb = ta.extend({
      options: {
          icon: new wb,
          interactive: !0,
          keyboard: !0,
          title: "",
          alt: "Marker",
          zIndexOffset: 0,
          opacity: 1,
          riseOnHover: !1,
          riseOffset: 250,
          pane: "markerPane",
          shadowPane: "shadowPane",
          bubblingMouseEvents: !1,
          autoPanOnFocus: !0,
          draggable: !1,
          autoPan: !1,
          autoPanPadding: [50, 50],
          autoPanSpeed: 10
      },
      initialize: function(a, b) {
          v(this, b);
          this._latlng = W(a)
      },
      onAdd: function(a) {
          (this._zoomAnimated = this._zoomAnimated && a.options.markerZoomAnimation) && a.on("zoomanim", this._animateZoom, this);
          this._initIcon();
          this.update()
      },
      onRemove: function(a) {
          this.dragging && this.dragging.enabled() && (this.options.draggable = !0,
          this.dragging.removeHooks());
          delete this.dragging;
          this._zoomAnimated && a.off("zoomanim", this._animateZoom, this);
          this._removeIcon();
          this._removeShadow()
      },
      getEvents: function() {
          return {
              zoom: this.update,
              viewreset: this.update
          }
      },
      getLatLng: function() {
          return this._latlng
      },
      setLatLng: function(a) {
          var b = this._latlng;
          return this._latlng = W(a),
          this.update(),
          this.fire("move", {
              oldLatLng: b,
              latlng: this._latlng
          })
      },
      setZIndexOffset: function(a) {
          return this.options.zIndexOffset = a,
          this.update()
      },
      getIcon: function() {
          return this.options.icon
      },
      setIcon: function(a) {
          return this.options.icon = a,
          this._map && (this._initIcon(),
          this.update()),
          this._popup && this.bindPopup(this._popup, this._popup.options),
          this
      },
      getElement: function() {
          return this._icon
      },
      update: function() {
          var a;
          return this._icon && this._map && (a = this._map.latLngToLayerPoint(this._latlng).round(),
          this._setPos(a)),
          this
      },
      _initIcon: function() {
          var a = this.options
            , b = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide")
            , e = a.icon.createIcon(this._icon)
            , r = !1;
          e = (e !== this._icon && (this._icon && this._removeIcon(),
          r = !0,
          a.title && (e.title = a.title),
          "IMG" === e.tagName && (e.alt = a.alt || "")),
          Z(e, b),
          a.keyboard && (e.tabIndex = "0",
          e.setAttribute("role", "button")),
          this._icon = e,
          a.riseOnHover && this.on({
              mouseover: this._bringToFront,
              mouseout: this._resetZIndex
          }),
          this.options.autoPanOnFocus && Y(e, "focus", this._panOnFocus, this),
          a.icon.createShadow(this._shadow));
          var x = !1;
          e !== this._shadow && (this._removeShadow(),
          x = !0);
          e && (Z(e, b),
          e.alt = "");
          this._shadow = e;
          1 > a.opacity && this._updateOpacity();
          r && this.getPane().appendChild(this._icon);
          this._initInteraction();
          e && x && this.getPane(a.shadowPane).appendChild(this._shadow)
      },
      _removeIcon: function() {
          this.options.riseOnHover && this.off({
              mouseover: this._bringToFront,
              mouseout: this._resetZIndex
          });
          this.options.autoPanOnFocus && da(this._icon, "focus", this._panOnFocus, this);
          ha(this._icon);
          this.removeInteractiveTarget(this._icon);
          this._icon = null
      },
      _removeShadow: function() {
          this._shadow && ha(this._shadow);
          this._shadow = null
      },
      _setPos: function(a) {
          this._icon && la(this._icon, a);
          this._shadow && la(this._shadow, a);
          this._zIndex = a.y + this.options.zIndexOffset;
          this._resetZIndex()
      },
      _updateZIndex: function(a) {
          this._icon && (this._icon.style.zIndex = this._zIndex + a)
      },
      _animateZoom: function(a) {
          a = this._map._latLngToNewLayerPoint(this._latlng, a.zoom, a.center).round();
          this._setPos(a)
      },
      _initInteraction: function() {
          var a;
          this.options.interactive && (Z(this._icon, "leaflet-interactive"),
          this.addInteractiveTarget(this._icon),
          id && (a = this.options.draggable,
          this.dragging && (a = this.dragging.enabled(),
          this.dragging.disable()),
          this.dragging = new id(this),
          a && this.dragging.enable()))
      },
      setOpacity: function(a) {
          return this.options.opacity = a,
          this._map && this._updateOpacity(),
          this
      },
      _updateOpacity: function() {
          var a = this.options.opacity;
          this._icon && wa(this._icon, a);
          this._shadow && wa(this._shadow, a)
      },
      _bringToFront: function() {
          this._updateZIndex(this.options.riseOffset)
      },
      _resetZIndex: function() {
          this._updateZIndex(0)
      },
      _panOnFocus: function() {
          var a, b, e = this._map;
          e && (a = (b = this.options.icon.options).iconSize ? J(b.iconSize) : J(0, 0),
          b = b.iconAnchor ? J(b.iconAnchor) : J(0, 0),
          e.panInside(this._latlng, {
              paddingTopLeft: b,
              paddingBottomRight: a.subtract(b)
          }))
      },
      _getPopupAnchor: function() {
          return this.options.icon.options.popupAnchor
      },
      _getTooltipAnchor: function() {
          return this.options.icon.options.tooltipAnchor
      }
  })
    , Na = ta.extend({
      options: {
          stroke: !0,
          color: "#3388ff",
          weight: 3,
          opacity: 1,
          lineCap: "round",
          lineJoin: "round",
          dashArray: null,
          dashOffset: null,
          fill: !1,
          fillColor: null,
          fillOpacity: .2,
          fillRule: "evenodd",
          interactive: !0,
          bubblingMouseEvents: !0
      },
      beforeAdd: function(a) {
          this._renderer = a.getRenderer(this)
      },
      onAdd: function() {
          this._renderer._initPath(this);
          this._reset();
          this._renderer._addPath(this)
      },
      onRemove: function() {
          this._renderer._removePath(this)
      },
      redraw: function() {
          return this._map && this._renderer._updatePath(this),
          this
      },
      setStyle: function(a) {
          return v(this, a),
          this._renderer && (this._renderer._updateStyle(this),
          this.options.stroke && a && Object.prototype.hasOwnProperty.call(a, "weight") && this._updateBounds()),
          this
      },
      bringToFront: function() {
          return this._renderer && this._renderer._bringToFront(this),
          this
      },
      bringToBack: function() {
          return this._renderer && this._renderer._bringToBack(this),
          this
      },
      getElement: function() {
          return this._path
      },
      _reset: function() {
          this._project();
          this._update()
      },
      _clickTolerance: function() {
          return (this.options.stroke ? this.options.weight / 2 : 0) + (this._renderer.options.tolerance || 0)
      }
  })
    , Wb = Na.extend({
      options: {
          fill: !0,
          radius: 10
      },
      initialize: function(a, b) {
          v(this, b);
          this._latlng = W(a);
          this._radius = this.options.radius
      },
      setLatLng: function(a) {
          var b = this._latlng;
          return this._latlng = W(a),
          this.redraw(),
          this.fire("move", {
              oldLatLng: b,
              latlng: this._latlng
          })
      },
      getLatLng: function() {
          return this._latlng
      },
      setRadius: function(a) {
          return this.options.radius = this._radius = a,
          this.redraw()
      },
      getRadius: function() {
          return this._radius
      },
      setStyle: function(a) {
          var b = a && a.radius || this._radius;
          return Na.prototype.setStyle.call(this, a),
          this.setRadius(b),
          this
      },
      _project: function() {
          this._point = this._map.latLngToLayerPoint(this._latlng);
          this._updateBounds()
      },
      _updateBounds: function() {
          var a = this._radius
            , b = this._radiusY || a
            , e = this._clickTolerance();
          a = [a + e, b + e];
          this._pxBounds = new O(this._point.subtract(a),this._point.add(a))
      },
      _update: function() {
          this._map && this._updatePath()
      },
      _updatePath: function() {
          this._renderer._updateCircle(this)
      },
      _empty: function() {
          return this._radius && !this._renderer._bounds.intersects(this._pxBounds)
      },
      _containsPoint: function(a) {
          return a.distanceTo(this._point) <= this._radius + this._clickTolerance()
      }
  })
    , zc = Wb.extend({
      initialize: function(a, b, e) {
          if (v(this, "number" == typeof b ? g({}, e, {
              radius: b
          }) : b),
          this._latlng = W(a),
          isNaN(this.options.radius))
              throw Error("Circle radius cannot be NaN");
          this._mRadius = this.options.radius
      },
      setRadius: function(a) {
          return this._mRadius = a,
          this.redraw()
      },
      getRadius: function() {
          return this._mRadius
      },
      getBounds: function() {
          var a = [this._radius, this._radiusY || this._radius];
          return new N(this._map.layerPointToLatLng(this._point.subtract(a)),this._map.layerPointToLatLng(this._point.add(a)))
      },
      setStyle: Na.prototype.setStyle,
      _project: function() {
          var a, b, e, r, x, D = this._latlng.lng, G = this._latlng.lat, K = this._map, Q = K.options.crs;
          Q.distance === Ka.distance ? (r = Math.PI / 180,
          x = this._mRadius / Ka.R / r,
          a = K.project([G + x, D]),
          b = K.project([G - x, D]),
          b = a.add(b).divideBy(2),
          e = K.unproject(b).lat,
          r = Math.acos((Math.cos(x * r) - Math.sin(G * r) * Math.sin(e * r)) / (Math.cos(G * r) * Math.cos(e * r))) / r,
          !isNaN(r) && 0 !== r || (r = x / Math.cos(Math.PI / 180 * G)),
          this._point = b.subtract(K.getPixelOrigin()),
          this._radius = isNaN(r) ? 0 : b.x - K.project([e, D - r]).x,
          this._radiusY = b.y - a.y) : (x = Q.unproject(Q.project(this._latlng).subtract([this._mRadius, 0])),
          this._point = K.latLngToLayerPoint(this._latlng),
          this._radius = this._point.x - K.latLngToLayerPoint(x).x);
          this._updateBounds()
      }
  })
    , Ea = Na.extend({
      options: {
          smoothFactor: 1,
          noClip: !1
      },
      initialize: function(a, b) {
          v(this, b);
          this._setLatLngs(a)
      },
      getLatLngs: function() {
          return this._latlngs
      },
      setLatLngs: function(a) {
          return this._setLatLngs(a),
          this.redraw()
      },
      isEmpty: function() {
          return !this._latlngs.length
      },
      closestLayerPoint: function(a) {
          for (var b = 1 / 0, e = null, r = jb, x = 0, D = this._parts.length; x < D; x++)
              for (var G = this._parts[x], K = 1, Q = G.length; K < Q; K++) {
                  var X, ea, na = r(a, X = G[K - 1], ea = G[K], !0);
                  na < b && (b = na,
                  e = r(a, X, ea))
              }
          return e && (e.distance = Math.sqrt(b)),
          e
      },
      getCenter: function() {
          if (!this._map)
              throw Error("Must add layer to map before using getCenter()");
          var a, b, e, r, x, D, G = this._rings[0], K = G.length;
          if (!K)
              return null;
          for (b = a = 0; a < K - 1; a++)
              b += G[a].distanceTo(G[a + 1]) / 2;
          if (0 === b)
              return this._map.layerPointToLatLng(G[0]);
          for (e = a = 0; a < K - 1; a++)
              if (r = G[a],
              x = G[a + 1],
              b < (e += D = r.distanceTo(x)))
                  return this._map.layerPointToLatLng([x.x - (D = (e - b) / D) * (x.x - r.x), x.y - D * (x.y - r.y)])
      },
      getBounds: function() {
          return this._bounds
      },
      addLatLng: function(a, b) {
          return b = b || this._defaultShape(),
          a = W(a),
          b.push(a),
          this._bounds.extend(a),
          this.redraw()
      },
      _setLatLngs: function(a) {
          this._bounds = new N;
          this._latlngs = this._convertLatLngs(a)
      },
      _defaultShape: function() {
          return Da(this._latlngs) ? this._latlngs : this._latlngs[0]
      },
      _convertLatLngs: function(a) {
          for (var b = [], e = Da(a), r = 0, x = a.length; r < x; r++)
              e ? (b[r] = W(a[r]),
              this._bounds.extend(b[r])) : b[r] = this._convertLatLngs(a[r]);
          return b
      },
      _project: function() {
          var a = new O;
          this._rings = [];
          this._projectLatlngs(this._latlngs, this._rings, a);
          this._bounds.isValid() && a.isValid() && (this._rawPxBounds = a,
          this._updateBounds())
      },
      _updateBounds: function() {
          var a = this._clickTolerance();
          a = new H(a,a);
          this._rawPxBounds && (this._pxBounds = new O([this._rawPxBounds.min.subtract(a), this._rawPxBounds.max.add(a)]))
      },
      _projectLatlngs: function(a, b, e) {
          var r, x = a.length;
          if (a[0]instanceof U) {
              var D = [];
              for (r = 0; r < x; r++)
                  D[r] = this._map.latLngToLayerPoint(a[r]),
                  e.extend(D[r]);
              b.push(D)
          } else
              for (r = 0; r < x; r++)
                  this._projectLatlngs(a[r], b, e)
      },
      _clipPoints: function() {
          var a = this._renderer._bounds;
          if (this._parts = [],
          this._pxBounds && this._pxBounds.intersects(a))
              if (this.options.noClip)
                  this._parts = this._rings;
              else
                  for (var b, e, r, x, D = this._parts, G = 0, K = 0, Q = this._rings.length; G < Q; G++)
                      for (b = 0,
                      e = (x = this._rings[G]).length; b < e - 1; b++)
                          (r = Pc(x[b], x[b + 1], a, b, !0)) && (D[K] = D[K] || [],
                          D[K].push(r[0]),
                          r[1] === x[b + 1] && b !== e - 2 || (D[K].push(r[1]),
                          K++))
      },
      _simplifyPoints: function() {
          for (var a = this._parts, b = this.options.smoothFactor, e = 0, r = a.length; e < r; e++)
              a[e] = Nc(a[e], b)
      },
      _update: function() {
          this._map && (this._clipPoints(),
          this._simplifyPoints(),
          this._updatePath())
      },
      _updatePath: function() {
          this._renderer._updatePoly(this)
      },
      _containsPoint: function(a, b) {
          var e, r, x, D, G = this._clickTolerance();
          if (!this._pxBounds || !this._pxBounds.contains(a))
              return !1;
          var K = 0;
          for (r = this._parts.length; K < r; K++) {
              var Q = 0;
              for (e = (x = (D = this._parts[K]).length) - 1; Q < x; e = Q++)
                  if ((b || 0 !== Q) && Oc(a, D[e], D[Q]) <= G)
                      return !0
          }
          return !1
      }
  });
  Ea._flat = Rc;
  var ab = Ea.extend({
      options: {
          fill: !0
      },
      isEmpty: function() {
          return !this._latlngs.length || !this._latlngs[0].length
      },
      getCenter: function() {
          if (!this._map)
              throw Error("Must add layer to map before using getCenter()");
          var a, b, e, r, x, D = this._rings[0], G = D.length;
          if (!G)
              return null;
          var K = b = e = r = 0;
          for (a = G - 1; K < G; a = K++) {
              var Q = D[K];
              a = D[a];
              var X = Q.y * a.x - a.y * Q.x;
              e += (Q.x + a.x) * X;
              r += (Q.y + a.y) * X;
              b += 3 * X
          }
          return x = 0 === b ? D[0] : [e / b, r / b],
          this._map.layerPointToLatLng(x)
      },
      _convertLatLngs: function(a) {
          a = Ea.prototype._convertLatLngs.call(this, a);
          var b = a.length;
          return 2 <= b && a[0]instanceof U && a[0].equals(a[b - 1]) && a.pop(),
          a
      },
      _setLatLngs: function(a) {
          Ea.prototype._setLatLngs.call(this, a);
          Da(this._latlngs) && (this._latlngs = [this._latlngs])
      },
      _defaultShape: function() {
          return (Da(this._latlngs[0]) ? this._latlngs : this._latlngs[0])[0]
      },
      _clipPoints: function() {
          var a = this._renderer._bounds
            , b = this.options.weight;
          b = new H(b,b);
          a = new O(a.min.subtract(b),a.max.add(b));
          if (this._parts = [],
          this._pxBounds && this._pxBounds.intersects(a))
              if (this.options.noClip)
                  this._parts = this._rings;
              else {
                  var e;
                  b = 0;
                  for (var r = this._rings.length; b < r; b++)
                      (e = Sc(this._rings[b], a, !0)).length && this._parts.push(e)
              }
      },
      _updatePath: function() {
          this._renderer._updatePoly(this, !0)
      },
      _containsPoint: function(a) {
          var b, e, r, x, D = !1;
          if (!this._pxBounds || !this._pxBounds.contains(a))
              return !1;
          var G = 0;
          for (r = this._parts.length; G < r; G++) {
              var K = 0;
              for (e = (x = (b = this._parts[G]).length) - 1; K < x; e = K++) {
                  var Q = b[K];
                  e = b[e];
                  Q.y > a.y != e.y > a.y && a.x < (e.x - Q.x) * (a.y - Q.y) / (e.y - Q.y) + Q.x && (D = !D)
              }
          }
          return D || Ea.prototype._containsPoint.call(this, a, !0)
      }
  })
    , Fa = $a.extend({
      initialize: function(a, b) {
          v(this, b);
          this._layers = {};
          a && this.addData(a)
      },
      addData: function(a) {
          var b, e, r = Aa(a) ? a : a.features;
          if (r) {
              a = 0;
              for (b = r.length; a < b; a++)
                  ((e = r[a]).geometries || e.geometry || e.features || e.coordinates) && this.addData(e);
              return this
          }
          e = this.options;
          return e.filter && !e.filter(a) ? this : (r = pc(a, e)) ? (r.feature = Kb(a),
          r.defaultOptions = r.options,
          this.resetStyle(r),
          e.onEachFeature && e.onEachFeature(a, r),
          this.addLayer(r)) : this
      },
      resetStyle: function(a) {
          return void 0 === a ? this.eachLayer(this.resetStyle, this) : (a.options = g({}, a.defaultOptions),
          this._setLayerStyle(a, this.options.style),
          this)
      },
      setStyle: function(a) {
          return this.eachLayer(function(b) {
              this._setLayerStyle(b, a)
          }, this)
      },
      _setLayerStyle: function(a, b) {
          a.setStyle && ("function" == typeof b && (b = b(a.feature)),
          a.setStyle(b))
      }
  });
  pb = {
      toGeoJSON: function(a) {
          return bb(this, {
              type: "Point",
              coordinates: rc(this.getLatLng(), a)
          })
      }
  };
  kb.include(pb);
  zc.include(pb);
  Wb.include(pb);
  Ea.include({
      toGeoJSON: function(a) {
          var b = !Da(this._latlngs);
          return bb(this, {
              type: (b ? "Multi" : "") + "LineString",
              coordinates: Jb(this._latlngs, b ? 1 : 0, !1, a)
          })
      }
  });
  ab.include({
      toGeoJSON: function(a) {
          var b = !Da(this._latlngs)
            , e = b && !Da(this._latlngs[0]);
          a = Jb(this._latlngs, e ? 2 : b ? 1 : 0, !0, a);
          return bb(this, {
              type: (e ? "Multi" : "") + "Polygon",
              coordinates: b ? a : [a]
          })
      }
  });
  fb.include({
      toMultiPoint: function(a) {
          var b = [];
          return this.eachLayer(function(e) {
              b.push(e.toGeoJSON(a).geometry.coordinates)
          }),
          bb(this, {
              type: "MultiPoint",
              coordinates: b
          })
      },
      toGeoJSON: function(a) {
          var b = this.feature && this.feature.geometry && this.feature.geometry.type;
          if ("MultiPoint" === b)
              return this.toMultiPoint(a);
          var e = "GeometryCollection" === b
            , r = [];
          return this.eachLayer(function(x) {
              x.toGeoJSON && (x = x.toGeoJSON(a),
              e ? r.push(x.geometry) : "FeatureCollection" === (x = Kb(x)).type ? r.push.apply(r, x.features) : r.push(x))
          }),
          e ? bb(this, {
              geometries: r,
              type: "GeometryCollection"
          }) : {
              type: "FeatureCollection",
              features: r
          }
      }
  });
  Qb = Tc;
  var Xb = ta.extend({
      options: {
          opacity: 1,
          alt: "",
          interactive: !1,
          crossOrigin: !1,
          errorOverlayUrl: "",
          zIndex: 1,
          className: ""
      },
      initialize: function(a, b, e) {
          this._url = a;
          this._bounds = T(b);
          v(this, e)
      },
      onAdd: function() {
          this._image || (this._initImage(),
          1 > this.options.opacity && this._updateOpacity());
          this.options.interactive && (Z(this._image, "leaflet-interactive"),
          this.addInteractiveTarget(this._image));
          this.getPane().appendChild(this._image);
          this._reset()
      },
      onRemove: function() {
          ha(this._image);
          this.options.interactive && this.removeInteractiveTarget(this._image)
      },
      setOpacity: function(a) {
          return this.options.opacity = a,
          this._image && this._updateOpacity(),
          this
      },
      setStyle: function(a) {
          return a.opacity && this.setOpacity(a.opacity),
          this
      },
      bringToFront: function() {
          return this._map && Ya(this._image),
          this
      },
      bringToBack: function() {
          return this._map && Za(this._image),
          this
      },
      setUrl: function(a) {
          return this._url = a,
          this._image && (this._image.src = a),
          this
      },
      setBounds: function(a) {
          return this._bounds = T(a),
          this._map && this._reset(),
          this
      },
      getEvents: function() {
          var a = {
              zoom: this._reset,
              viewreset: this._reset
          };
          return this._zoomAnimated && (a.zoomanim = this._animateZoom),
          a
      },
      setZIndex: function(a) {
          return this.options.zIndex = a,
          this._updateZIndex(),
          this
      },
      getBounds: function() {
          return this._bounds
      },
      getElement: function() {
          return this._image
      },
      _initImage: function() {
          var a = "IMG" === this._url.tagName
            , b = this._image = a ? this._url : V("img");
          Z(b, "leaflet-image-layer");
          this._zoomAnimated && Z(b, "leaflet-zoom-animated");
          this.options.className && Z(b, this.options.className);
          b.onselectstart = q;
          b.onmousemove = q;
          b.onload = p(this.fire, this, "load");
          b.onerror = p(this._overlayOnError, this, "error");
          !this.options.crossOrigin && "" !== this.options.crossOrigin || (b.crossOrigin = !0 === this.options.crossOrigin ? "" : this.options.crossOrigin);
          this.options.zIndex && this._updateZIndex();
          a ? this._url = b.src : (b.src = this._url,
          b.alt = this.options.alt)
      },
      _animateZoom: function(a) {
          var b = this._map.getZoomScale(a.zoom);
          a = this._map._latLngBoundsToNewLayerBounds(this._bounds, a.zoom, a.center).min;
          Oa(this._image, a, b)
      },
      _reset: function() {
          var a = this._image
            , b = new O(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast()))
            , e = b.getSize();
          la(a, b.min);
          a.style.width = e.x + "px";
          a.style.height = e.y + "px"
      },
      _updateOpacity: function() {
          wa(this._image, this.options.opacity)
      },
      _updateZIndex: function() {
          this._image && void 0 !== this.options.zIndex && null !== this.options.zIndex && (this._image.style.zIndex = this.options.zIndex)
      },
      _overlayOnError: function() {
          this.fire("error");
          var a = this.options.errorOverlayUrl;
          a && this._url !== a && (this._url = a,
          this._image.src = a)
      },
      getCenter: function() {
          return this._bounds.getCenter()
      }
  })
    , jd = Xb.extend({
      options: {
          autoplay: !0,
          loop: !0,
          keepAspectRatio: !0,
          muted: !1,
          playsInline: !0
      },
      _initImage: function() {
          var a = "VIDEO" === this._url.tagName
            , b = this._image = a ? this._url : V("video");
          if (Z(b, "leaflet-image-layer"),
          this._zoomAnimated && Z(b, "leaflet-zoom-animated"),
          this.options.className && Z(b, this.options.className),
          b.onselectstart = q,
          b.onmousemove = q,
          b.onloadeddata = p(this.fire, this, "load"),
          a) {
              a = b.getElementsByTagName("source");
              for (var e = [], r = 0; r < a.length; r++)
                  e.push(a[r].src);
              this._url = 0 < a.length ? e : [b.src]
          } else
              for (Aa(this._url) || (this._url = [this._url]),
              !this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(b.style, "objectFit") && (b.style.objectFit = "fill"),
              b.autoplay = !!this.options.autoplay,
              b.loop = !!this.options.loop,
              b.muted = !!this.options.muted,
              b.playsInline = !!this.options.playsInline,
              a = 0; a < this._url.length; a++)
                  e = V("source"),
                  e.src = this._url[a],
                  b.appendChild(e)
      }
  })
    , kd = Xb.extend({
      _initImage: function() {
          var a = this._image = this._url;
          Z(a, "leaflet-image-layer");
          this._zoomAnimated && Z(a, "leaflet-zoom-animated");
          this.options.className && Z(a, this.options.className);
          a.onselectstart = q;
          a.onmousemove = q
      }
  })
    , Ca = ta.extend({
      options: {
          interactive: !1,
          offset: [0, 0],
          className: "",
          pane: void 0
      },
      initialize: function(a, b) {
          v(this, a);
          this._source = b
      },
      openOn: function(a) {
          return (a = arguments.length ? a : this._source._map).hasLayer(this) || a.addLayer(this),
          this
      },
      close: function() {
          return this._map && this._map.removeLayer(this),
          this
      },
      toggle: function(a) {
          return this._map ? this.close() : (arguments.length ? this._source = a : a = this._source,
          this._prepareOpen(),
          this.openOn(a._map)),
          this
      },
      onAdd: function(a) {
          this._zoomAnimated = a._zoomAnimated;
          this._container || this._initLayout();
          a._fadeAnimated && wa(this._container, 0);
          clearTimeout(this._removeTimeout);
          this.getPane().appendChild(this._container);
          this.update();
          a._fadeAnimated && wa(this._container, 1);
          this.bringToFront();
          this.options.interactive && (Z(this._container, "leaflet-interactive"),
          this.addInteractiveTarget(this._container))
      },
      onRemove: function(a) {
          a._fadeAnimated ? (wa(this._container, 0),
          this._removeTimeout = setTimeout(p(ha, void 0, this._container), 200)) : ha(this._container);
          this.options.interactive && (ja(this._container, "leaflet-interactive"),
          this.removeInteractiveTarget(this._container))
      },
      getLatLng: function() {
          return this._latlng
      },
      setLatLng: function(a) {
          return this._latlng = W(a),
          this._map && (this._updatePosition(),
          this._adjustPan()),
          this
      },
      getContent: function() {
          return this._content
      },
      setContent: function(a) {
          return this._content = a,
          this.update(),
          this
      },
      getElement: function() {
          return this._container
      },
      update: function() {
          this._map && (this._container.style.visibility = "hidden",
          this._updateContent(),
          this._updateLayout(),
          this._updatePosition(),
          this._container.style.visibility = "",
          this._adjustPan())
      },
      getEvents: function() {
          var a = {
              zoom: this._updatePosition,
              viewreset: this._updatePosition
          };
          return this._zoomAnimated && (a.zoomanim = this._animateZoom),
          a
      },
      isOpen: function() {
          return !!this._map && this._map.hasLayer(this)
      },
      bringToFront: function() {
          return this._map && Ya(this._container),
          this
      },
      bringToBack: function() {
          return this._map && Za(this._container),
          this
      },
      _prepareOpen: function(a) {
          if (!(e = this._source)._map)
              return !1;
          if (e instanceof $a) {
              var b, e = null, r = this._source._layers;
              for (b in r)
                  if (r[b]._map) {
                      e = r[b];
                      break
                  }
              if (!e)
                  return !1;
              this._source = e
          }
          if (!a)
              if (e.getCenter)
                  a = e.getCenter();
              else if (e.getLatLng)
                  a = e.getLatLng();
              else {
                  if (!e.getBounds)
                      throw Error("Unable to get source layer LatLng.");
                  a = e.getBounds().getCenter()
              }
          return this.setLatLng(a),
          this._map && this.update(),
          !0
      },
      _updateContent: function() {
          if (this._content) {
              var a = this._contentNode
                , b = "function" == typeof this._content ? this._content(this._source || this) : this._content;
              if ("string" == typeof b)
                  a.innerHTML = b;
              else {
                  for (; a.hasChildNodes(); )
                      a.removeChild(a.firstChild);
                  a.appendChild(b)
              }
              this.fire("contentupdate")
          }
      },
      _updatePosition: function() {
          var a, b, e;
          this._map && (b = this._map.latLngToLayerPoint(this._latlng),
          a = J(this.options.offset),
          e = this._getAnchor(),
          this._zoomAnimated ? la(this._container, b.add(e)) : a = a.add(b).add(e),
          b = this._containerBottom = -a.y,
          e = this._containerLeft = -Math.round(this._containerWidth / 2) + a.x,
          this._container.style.bottom = b + "px",
          this._container.style.left = e + "px")
      },
      _getAnchor: function() {
          return [0, 0]
      }
  })
    , Yb = (aa.include({
      _initOverlay: function(a, b, e, r) {
          var x = b;
          return x instanceof a || (x = (new a(r)).setContent(b)),
          e && x.setLatLng(e),
          x
      }
  }),
  ta.include({
      _initOverlay: function(a, b, e, r) {
          var x = e;
          return x instanceof a ? (v(x, r),
          x._source = this) : (x = b && !r ? b : new a(r,this)).setContent(e),
          x
      }
  }),
  Ca.extend({
      options: {
          pane: "popupPane",
          offset: [0, 7],
          maxWidth: 300,
          minWidth: 50,
          maxHeight: null,
          autoPan: !0,
          autoPanPaddingTopLeft: null,
          autoPanPaddingBottomRight: null,
          autoPanPadding: [5, 5],
          keepInView: !1,
          closeButton: !0,
          autoClose: !0,
          closeOnEscapeKey: !0,
          className: ""
      },
      openOn: function(a) {
          return !(a = arguments.length ? a : this._source._map).hasLayer(this) && a._popup && a._popup.options.autoClose && a.removeLayer(a._popup),
          a._popup = this,
          Ca.prototype.openOn.call(this, a)
      },
      onAdd: function(a) {
          Ca.prototype.onAdd.call(this, a);
          a.fire("popupopen", {
              popup: this
          });
          this._source && (this._source.fire("popupopen", {
              popup: this
          }, !0),
          this._source instanceof Na || this._source.on("preclick", Qa))
      },
      onRemove: function(a) {
          Ca.prototype.onRemove.call(this, a);
          a.fire("popupclose", {
              popup: this
          });
          this._source && (this._source.fire("popupclose", {
              popup: this
          }, !0),
          this._source instanceof Na || this._source.off("preclick", Qa))
      },
      getEvents: function() {
          var a = Ca.prototype.getEvents.call(this);
          return (void 0 !== this.options.closeOnClick ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (a.preclick = this.close),
          this.options.keepInView && (a.moveend = this._adjustPan),
          a
      },
      _initLayout: function() {
          var a = this._container = V("div", "leaflet-popup " + (this.options.className || "") + " leaflet-zoom-animated")
            , b = this._wrapper = V("div", "leaflet-popup-content-wrapper", a);
          this._contentNode = V("div", "leaflet-popup-content", b);
          hb(a);
          oc(this._contentNode);
          Y(a, "contextmenu", Qa);
          this._tipContainer = V("div", "leaflet-popup-tip-container", a);
          this._tip = V("div", "leaflet-popup-tip", this._tipContainer);
          this.options.closeButton && ((b = this._closeButton = V("a", "leaflet-popup-close-button", a)).setAttribute("role", "button"),
          b.setAttribute("aria-label", "Close popup"),
          b.href = "#close",
          b.innerHTML = '<span aria-hidden="true">&#215;</span>',
          Y(b, "click", this.close, this))
      },
      _updateLayout: function() {
          var a = this._contentNode
            , b = a.style
            , e = (b.width = "",
          b.whiteSpace = "nowrap",
          a.offsetWidth);
          e = Math.min(e, this.options.maxWidth);
          e = (e = Math.max(e, this.options.minWidth),
          b.width = e + 1 + "px",
          b.whiteSpace = "",
          b.height = "",
          a.offsetHeight);
          var r = this.options.maxHeight;
          r && r < e ? (b.height = r + "px",
          Z(a, "leaflet-popup-scrolled")) : ja(a, "leaflet-popup-scrolled");
          this._containerWidth = this._container.offsetWidth
      },
      _animateZoom: function(a) {
          a = this._map._latLngToNewLayerPoint(this._latlng, a.zoom, a.center);
          var b = this._getAnchor();
          la(this._container, a.add(b))
      },
      _adjustPan: function(a) {
          var b, e, r, x, D, G, K, Q;
          this.options.autoPan && (this._map._panAnim && this._map._panAnim.stop(),
          b = this._map,
          e = parseInt(xa(this._container, "marginBottom"), 10) || 0,
          e = this._container.offsetHeight + e,
          Q = this._containerWidth,
          (r = new H(this._containerLeft,-e - this._containerBottom))._add(Pa(this._container)),
          r = b.layerPointToContainerPoint(r),
          D = J(this.options.autoPanPadding),
          x = J(this.options.autoPanPaddingTopLeft || D),
          D = J(this.options.autoPanPaddingBottomRight || D),
          G = b.getSize(),
          K = 0,
          r.x + Q + D.x > G.x && (K = r.x + Q - G.x + D.x),
          r.x - K - x.x < (Q = 0) && (K = r.x - x.x),
          r.y + e + D.y > G.y && (Q = r.y + e - G.y + D.y),
          0 > r.y - Q - x.y && (Q = r.y - x.y),
          (K || Q) && b.fire("autopanstart").panBy([K, Q], {
              animate: a && "moveend" === a.type
          }))
      },
      _getAnchor: function() {
          return J(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0])
      }
  }))
    , Zb = (aa.mergeOptions({
      closePopupOnClick: !0
  }),
  aa.include({
      openPopup: function(a, b, e) {
          return this._initOverlay(Yb, a, b, e).openOn(this),
          this
      },
      closePopup: function(a) {
          return (a = arguments.length ? a : this._popup) && a.close(),
          this
      }
  }),
  ta.include({
      bindPopup: function(a, b) {
          return this._popup = this._initOverlay(Yb, this._popup, a, b),
          this._popupHandlersAdded || (this.on({
              click: this._openPopup,
              keypress: this._onKeyPress,
              remove: this.closePopup,
              move: this._movePopup
          }),
          this._popupHandlersAdded = !0),
          this
      },
      unbindPopup: function() {
          return this._popup && (this.off({
              click: this._openPopup,
              keypress: this._onKeyPress,
              remove: this.closePopup,
              move: this._movePopup
          }),
          this._popupHandlersAdded = !1,
          this._popup = null),
          this
      },
      openPopup: function(a) {
          return this._popup && this._popup._prepareOpen(a) && this._popup.openOn(this._map),
          this
      },
      closePopup: function() {
          return this._popup && this._popup.close(),
          this
      },
      togglePopup: function() {
          return this._popup && this._popup.toggle(this),
          this
      },
      isPopupOpen: function() {
          return !!this._popup && this._popup.isOpen()
      },
      setPopupContent: function(a) {
          return this._popup && this._popup.setContent(a),
          this
      },
      getPopup: function() {
          return this._popup
      },
      _openPopup: function(a) {
          var b;
          this._popup && this._map && (Ra(a),
          b = a.layer || a.target,
          this._popup._source !== b || b instanceof Na ? (this._popup._source = b,
          this.openPopup(a.latlng)) : this._map.hasLayer(this._popup) ? this.closePopup() : this.openPopup(a.latlng))
      },
      _movePopup: function(a) {
          this._popup.setLatLng(a.latlng)
      },
      _onKeyPress: function(a) {
          13 === a.originalEvent.keyCode && this._openPopup(a)
      }
  }),
  Ca.extend({
      options: {
          pane: "tooltipPane",
          offset: [0, 0],
          direction: "auto",
          permanent: !1,
          sticky: !1,
          opacity: .9
      },
      onAdd: function(a) {
          Ca.prototype.onAdd.call(this, a);
          this.setOpacity(this.options.opacity);
          a.fire("tooltipopen", {
              tooltip: this
          });
          this._source && (this.addEventParent(this._source),
          this._source.fire("tooltipopen", {
              tooltip: this
          }, !0))
      },
      onRemove: function(a) {
          Ca.prototype.onRemove.call(this, a);
          a.fire("tooltipclose", {
              tooltip: this
          });
          this._source && (this.removeEventParent(this._source),
          this._source.fire("tooltipclose", {
              tooltip: this
          }, !0))
      },
      getEvents: function() {
          var a = Ca.prototype.getEvents.call(this);
          return this.options.permanent || (a.preclick = this.close),
          a
      },
      _initLayout: function() {
          this._contentNode = this._container = V("div", "leaflet-tooltip " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide"))
      },
      _updateLayout: function() {},
      _adjustPan: function() {},
      _setPosition: function(a) {
          var b, e = this._map, r = this._container, x = e.latLngToContainerPoint(e.getCenter());
          e = e.layerPointToContainerPoint(a);
          var D = this.options.direction
            , G = r.offsetWidth
            , K = r.offsetHeight
            , Q = J(this.options.offset)
            , X = this._getAnchor();
          e = "top" === D ? (b = G / 2,
          K) : "bottom" === D ? (b = G / 2,
          0) : (b = "center" === D ? G / 2 : "right" === D ? 0 : "left" === D ? G : e.x < x.x ? (D = "right",
          0) : (D = "left",
          G + 2 * (Q.x + X.x)),
          K / 2);
          a = a.subtract(J(b, e, !0)).add(Q).add(X);
          ja(r, "leaflet-tooltip-right");
          ja(r, "leaflet-tooltip-left");
          ja(r, "leaflet-tooltip-top");
          ja(r, "leaflet-tooltip-bottom");
          Z(r, "leaflet-tooltip-" + D);
          la(r, a)
      },
      _updatePosition: function() {
          var a = this._map.latLngToLayerPoint(this._latlng);
          this._setPosition(a)
      },
      setOpacity: function(a) {
          this.options.opacity = a;
          this._container && wa(this._container, a)
      },
      _animateZoom: function(a) {
          a = this._map._latLngToNewLayerPoint(this._latlng, a.zoom, a.center);
          this._setPosition(a)
      },
      _getAnchor: function() {
          return J(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0])
      }
  }))
    , ld = (aa.include({
      openTooltip: function(a, b, e) {
          return this._initOverlay(Zb, a, b, e).openOn(this),
          this
      },
      closeTooltip: function(a) {
          return a.close(),
          this
      }
  }),
  ta.include({
      bindTooltip: function(a, b) {
          return this._tooltip && this.isTooltipOpen() && this.unbindTooltip(),
          this._tooltip = this._initOverlay(Zb, this._tooltip, a, b),
          this._initTooltipInteractions(),
          this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(),
          this
      },
      unbindTooltip: function() {
          return this._tooltip && (this._initTooltipInteractions(!0),
          this.closeTooltip(),
          this._tooltip = null),
          this
      },
      _initTooltipInteractions: function(a) {
          var b, e;
          !a && this._tooltipHandlersAdded || (b = a ? "off" : "on",
          e = {
              remove: this.closeTooltip,
              move: this._moveTooltip
          },
          this._tooltip.options.permanent ? e.add = this._openTooltip : (e.mouseover = this._openTooltip,
          e.mouseout = this.closeTooltip,
          e.click = this._openTooltip),
          this._tooltip.options.sticky && (e.mousemove = this._moveTooltip),
          this[b](e),
          this._tooltipHandlersAdded = !a)
      },
      openTooltip: function(a) {
          return this._tooltip && this._tooltip._prepareOpen(a) && this._tooltip.openOn(this._map),
          this
      },
      closeTooltip: function() {
          if (this._tooltip)
              return this._tooltip.close()
      },
      toggleTooltip: function() {
          return this._tooltip && this._tooltip.toggle(this),
          this
      },
      isTooltipOpen: function() {
          return this._tooltip.isOpen()
      },
      setTooltipContent: function(a) {
          return this._tooltip && this._tooltip.setContent(a),
          this
      },
      getTooltip: function() {
          return this._tooltip
      },
      _openTooltip: function(a) {
          !this._tooltip || !this._map || this._map.dragging && this._map.dragging.moving() || (this._tooltip._source = a.layer || a.target,
          this.openTooltip(this._tooltip.options.sticky ? a.latlng : void 0))
      },
      _moveTooltip: function(a) {
          var b = a.latlng;
          this._tooltip.options.sticky && a.originalEvent && (a = this._map.mouseEventToContainerPoint(a.originalEvent),
          a = this._map.containerPointToLayerPoint(a),
          b = this._map.layerPointToLatLng(a));
          this._tooltip.setLatLng(b)
      }
  }),
  gb.extend({
      options: {
          iconSize: [12, 12],
          html: !1,
          bgPos: null,
          className: "leaflet-div-icon"
      },
      createIcon: function(a) {
          a = a && "DIV" === a.tagName ? a : document.createElement("div");
          var b = this.options;
          return b.html instanceof Element ? (Ab(a),
          a.appendChild(b.html)) : a.innerHTML = !1 !== b.html ? b.html : "",
          b.bgPos && (b = J(b.bgPos),
          a.style.backgroundPosition = -b.x + "px " + -b.y + "px"),
          this._setIconStyles(a, "icon"),
          a
      },
      createShadow: function() {
          return null
      }
  }));
  gb.Default = wb;
  var xb = ta.extend({
      options: {
          tileSize: 256,
          opacity: 1,
          updateWhenIdle: S.mobile,
          updateWhenZooming: !0,
          updateInterval: 200,
          zIndex: 1,
          bounds: null,
          minZoom: 0,
          maxZoom: void 0,
          maxNativeZoom: void 0,
          minNativeZoom: void 0,
          noWrap: !1,
          pane: "tilePane",
          className: "",
          keepBuffer: 2
      },
      initialize: function(a) {
          v(this, a)
      },
      onAdd: function() {
          this._initContainer();
          this._levels = {};
          this._tiles = {};
          this._resetView()
      },
      beforeAdd: function(a) {
          a._addZoomLimit(this)
      },
      onRemove: function(a) {
          this._removeAllTiles();
          ha(this._container);
          a._removeZoomLimit(this);
          this._container = null;
          this._tileZoom = void 0
      },
      bringToFront: function() {
          return this._map && (Ya(this._container),
          this._setAutoZIndex(Math.max)),
          this
      },
      bringToBack: function() {
          return this._map && (Za(this._container),
          this._setAutoZIndex(Math.min)),
          this
      },
      getContainer: function() {
          return this._container
      },
      setOpacity: function(a) {
          return this.options.opacity = a,
          this._updateOpacity(),
          this
      },
      setZIndex: function(a) {
          return this.options.zIndex = a,
          this._updateZIndex(),
          this
      },
      isLoading: function() {
          return this._loading
      },
      redraw: function() {
          var a;
          return this._map && (this._removeAllTiles(),
          (a = this._clampZoom(this._map.getZoom())) !== this._tileZoom && (this._tileZoom = a,
          this._updateLevels()),
          this._update()),
          this
      },
      getEvents: function() {
          var a = {
              viewprereset: this._invalidateAll,
              viewreset: this._resetView,
              zoom: this._resetView,
              moveend: this._onMoveEnd
          };
          return this.options.updateWhenIdle || (this._onMove || (this._onMove = m(this._onMoveEnd, this.options.updateInterval, this)),
          a.move = this._onMove),
          this._zoomAnimated && (a.zoomanim = this._animateZoom),
          a
      },
      createTile: function() {
          return document.createElement("div")
      },
      getTileSize: function() {
          var a = this.options.tileSize;
          return a instanceof H ? a : new H(a,a)
      },
      _updateZIndex: function() {
          this._container && void 0 !== this.options.zIndex && null !== this.options.zIndex && (this._container.style.zIndex = this.options.zIndex)
      },
      _setAutoZIndex: function(a) {
          for (var b, e = this.getPane().children, r = -a(-1 / 0, 1 / 0), x = 0, D = e.length; x < D; x++)
              b = e[x].style.zIndex,
              e[x] !== this._container && b && (r = a(r, +b));
          isFinite(r) && (this.options.zIndex = r + a(-1, 1),
          this._updateZIndex())
      },
      _updateOpacity: function() {
          if (this._map && !S.ielt9) {
              wa(this._container, this.options.opacity);
              var a, b = +new Date, e = !1, r = !1;
              for (a in this._tiles) {
                  var x, D = this._tiles[a];
                  D.current && D.loaded && (x = Math.min(1, (b - D.loaded) / 200),
                  wa(D.el, x),
                  1 > x ? e = !0 : (D.active ? r = !0 : this._onOpaqueTile(D),
                  D.active = !0))
              }
              r && !this._noPrune && this._pruneTiles();
              e && (F(this._fadeFrame),
              this._fadeFrame = z(this._updateOpacity, this))
          }
      },
      _onOpaqueTile: q,
      _initContainer: function() {
          this._container || (this._container = V("div", "leaflet-layer " + (this.options.className || "")),
          this._updateZIndex(),
          1 > this.options.opacity && this._updateOpacity(),
          this.getPane().appendChild(this._container))
      },
      _updateLevels: function() {
          var a = this._tileZoom
            , b = this.options.maxZoom;
          if (void 0 !== a) {
              for (var e in this._levels)
                  e = Number(e),
                  this._levels[e].el.children.length || e === a ? (this._levels[e].el.style.zIndex = b - Math.abs(a - e),
                  this._onUpdateLevel(e)) : (ha(this._levels[e].el),
                  this._removeTilesAtZoom(e),
                  this._onRemoveLevel(e),
                  delete this._levels[e]);
              e = this._levels[a];
              var r = this._map;
              return e || ((e = this._levels[a] = {}).el = V("div", "leaflet-tile-container leaflet-zoom-animated", this._container),
              e.el.style.zIndex = b,
              e.origin = r.project(r.unproject(r.getPixelOrigin()), a).round(),
              e.zoom = a,
              this._setZoomTransform(e, r.getCenter(), r.getZoom()),
              this._onCreateLevel(e)),
              this._level = e
          }
      },
      _onUpdateLevel: q,
      _onRemoveLevel: q,
      _onCreateLevel: q,
      _pruneTiles: function() {
          if (this._map) {
              var a, b, e, r = this._map.getZoom();
              if (r > this.options.maxZoom || r < this.options.minZoom)
                  this._removeAllTiles();
              else {
                  for (a in this._tiles)
                      (e = this._tiles[a]).retain = e.current;
                  for (a in this._tiles)
                      (e = this._tiles[a]).current && !e.active && (b = e.coords,
                      this._retainParent(b.x, b.y, b.z, b.z - 5) || this._retainChildren(b.x, b.y, b.z, b.z + 2));
                  for (a in this._tiles)
                      this._tiles[a].retain || this._removeTile(a)
              }
          }
      },
      _removeTilesAtZoom: function(a) {
          for (var b in this._tiles)
              this._tiles[b].coords.z === a && this._removeTile(b)
      },
      _removeAllTiles: function() {
          for (var a in this._tiles)
              this._removeTile(a)
      },
      _invalidateAll: function() {
          for (var a in this._levels)
              ha(this._levels[a].el),
              this._onRemoveLevel(Number(a)),
              delete this._levels[a];
          this._removeAllTiles();
          this._tileZoom = void 0
      },
      _retainParent: function(a, b, e, r) {
          a = Math.floor(a / 2);
          b = Math.floor(b / 2);
          --e;
          var x = new H(+a,+b);
          x = (x.z = e,
          this._tileCoordsToKey(x));
          return (x = this._tiles[x]) && x.active ? x.retain = !0 : (x && x.loaded && (x.retain = !0),
          r < e && this._retainParent(a, b, e, r))
      },
      _retainChildren: function(a, b, e, r) {
          for (var x = 2 * a; x < 2 * a + 2; x++)
              for (var D = 2 * b; D < 2 * b + 2; D++) {
                  var G = new H(x,D);
                  G = (G.z = e + 1,
                  this._tileCoordsToKey(G));
                  (G = this._tiles[G]) && G.active ? G.retain = !0 : (G && G.loaded && (G.retain = !0),
                  e + 1 < r && this._retainChildren(x, D, e + 1, r))
              }
      },
      _resetView: function(a) {
          a = a && (a.pinch || a.flyTo);
          this._setView(this._map.getCenter(), this._map.getZoom(), a, a)
      },
      _animateZoom: function(a) {
          this._setView(a.center, a.zoom, !0, a.noUpdate)
      },
      _clampZoom: function(a) {
          var b = this.options;
          return void 0 !== b.minNativeZoom && a < b.minNativeZoom ? b.minNativeZoom : void 0 !== b.maxNativeZoom && b.maxNativeZoom < a ? b.maxNativeZoom : a
      },
      _setView: function(a, b, e, r) {
          var x = Math.round(b);
          x = void 0 !== this.options.maxZoom && x > this.options.maxZoom || void 0 !== this.options.minZoom && x < this.options.minZoom ? void 0 : this._clampZoom(x);
          var D = this.options.updateWhenZooming && x !== this._tileZoom;
          r && !D || (this._tileZoom = x,
          this._abortLoading && this._abortLoading(),
          this._updateLevels(),
          this._resetGrid(),
          void 0 !== x && this._update(a),
          e || this._pruneTiles(),
          this._noPrune = !!e);
          this._setZoomTransforms(a, b)
      },
      _setZoomTransforms: function(a, b) {
          for (var e in this._levels)
              this._setZoomTransform(this._levels[e], a, b)
      },
      _setZoomTransform: function(a, b, e) {
          var r = this._map.getZoomScale(e, a.zoom);
          b = a.origin.multiplyBy(r).subtract(this._map._getNewPixelOrigin(b, e)).round();
          S.any3d ? Oa(a.el, b, r) : la(a.el, b)
      },
      _resetGrid: function() {
          var a = this._map
            , b = a.options.crs
            , e = this._tileSize = this.getTileSize()
            , r = this._tileZoom
            , x = this._map.getPixelWorldBounds(this._tileZoom);
          x && (this._globalTileRange = this._pxBoundsToTileRange(x));
          this._wrapX = b.wrapLng && !this.options.noWrap && [Math.floor(a.project([0, b.wrapLng[0]], r).x / e.x), Math.ceil(a.project([0, b.wrapLng[1]], r).x / e.y)];
          this._wrapY = b.wrapLat && !this.options.noWrap && [Math.floor(a.project([b.wrapLat[0], 0], r).y / e.x), Math.ceil(a.project([b.wrapLat[1], 0], r).y / e.y)]
      },
      _onMoveEnd: function() {
          this._map && !this._map._animatingZoom && this._update()
      },
      _getTiledPixelBounds: function(a) {
          var b = this._map
            , e = b._animatingZoom ? Math.max(b._animateToZoom, b.getZoom()) : b.getZoom();
          e = b.getZoomScale(e, this._tileZoom);
          a = b.project(a, this._tileZoom).floor();
          b = b.getSize().divideBy(2 * e);
          return new O(a.subtract(b),a.add(b))
      },
      _update: function(a) {
          var b = this._map;
          if (b) {
              var e = this._clampZoom(b.getZoom());
              if (void 0 === a && (a = b.getCenter()),
              void 0 !== this._tileZoom) {
                  b = this._getTiledPixelBounds(a);
                  var r = this._pxBoundsToTileRange(b)
                    , x = r.getCenter()
                    , D = [];
                  b = this.options.keepBuffer;
                  b = new O(r.getBottomLeft().subtract([b, -b]),r.getTopRight().add([b, -b]));
                  if (!(isFinite(r.min.x) && isFinite(r.min.y) && isFinite(r.max.x) && isFinite(r.max.y)))
                      throw Error("Attempted to load an infinite number of tiles");
                  for (Q in this._tiles) {
                      var G = this._tiles[Q].coords;
                      G.z === this._tileZoom && b.contains(new H(G.x,G.y)) || (this._tiles[Q].current = !1)
                  }
                  if (1 < Math.abs(e - this._tileZoom))
                      this._setView(a, e);
                  else {
                      for (e = r.min.y; e <= r.max.y; e++)
                          for (a = r.min.x; a <= r.max.x; a++) {
                              var K;
                              var Q = new H(a,e);
                              Q.z = this._tileZoom;
                              this._isValidTile(Q) && ((K = this._tiles[this._tileCoordsToKey(Q)]) ? K.current = !0 : D.push(Q))
                          }
                      if (D.sort(function(X, ea) {
                          return X.distanceTo(x) - ea.distanceTo(x)
                      }),
                      0 !== D.length) {
                          this._loading || (this._loading = !0,
                          this.fire("loading"));
                          r = document.createDocumentFragment();
                          for (a = 0; a < D.length; a++)
                              this._addTile(D[a], r);
                          this._level.el.appendChild(r)
                      }
                  }
              }
          }
      },
      _isValidTile: function(a) {
          var b = this._map.options.crs;
          if (!b.infinite) {
              var e = this._globalTileRange;
              if (!b.wrapLng && (a.x < e.min.x || a.x > e.max.x) || !b.wrapLat && (a.y < e.min.y || a.y > e.max.y))
                  return !1
          }
          if (!this.options.bounds)
              return !0;
          b = this._tileCoordsToBounds(a);
          return T(this.options.bounds).overlaps(b)
      },
      _keyToBounds: function(a) {
          return this._tileCoordsToBounds(this._keyToTileCoords(a))
      },
      _tileCoordsToNwSe: function(a) {
          var b = this._map
            , e = this.getTileSize()
            , r = a.scaleBy(e);
          e = r.add(e);
          return [b.unproject(r, a.z), b.unproject(e, a.z)]
      },
      _tileCoordsToBounds: function(a) {
          a = this._tileCoordsToNwSe(a);
          a = new N(a[0],a[1]);
          return this.options.noWrap ? a : this._map.wrapLatLngBounds(a)
      },
      _tileCoordsToKey: function(a) {
          return a.x + ":" + a.y + ":" + a.z
      },
      _keyToTileCoords: function(a) {
          a = a.split(":");
          var b = new H(+a[0],+a[1]);
          return b.z = +a[2],
          b
      },
      _removeTile: function(a) {
          var b = this._tiles[a];
          b && (ha(b.el),
          delete this._tiles[a],
          this.fire("tileunload", {
              tile: b.el,
              coords: this._keyToTileCoords(a)
          }))
      },
      _initTile: function(a) {
          Z(a, "leaflet-tile");
          var b = this.getTileSize();
          a.style.width = b.x + "px";
          a.style.height = b.y + "px";
          a.onselectstart = q;
          a.onmousemove = q;
          S.ielt9 && 1 > this.options.opacity && wa(a, this.options.opacity)
      },
      _addTile: function(a, b) {
          var e = this._getTilePos(a)
            , r = this._tileCoordsToKey(a)
            , x = this.createTile(this._wrapCoords(a), p(this._tileReady, this, a));
          this._initTile(x);
          2 > this.createTile.length && z(p(this._tileReady, this, a, null, x));
          la(x, e);
          this._tiles[r] = {
              el: x,
              coords: a,
              current: !0
          };
          b.appendChild(x);
          this.fire("tileloadstart", {
              tile: x,
              coords: a
          })
      },
      _tileReady: function(a, b, e) {
          b && this.fire("tileerror", {
              error: b,
              tile: e,
              coords: a
          });
          var r = this._tileCoordsToKey(a);
          (e = this._tiles[r]) && (e.loaded = +new Date,
          this._map._fadeAnimated ? (wa(e.el, 0),
          F(this._fadeFrame),
          this._fadeFrame = z(this._updateOpacity, this)) : (e.active = !0,
          this._pruneTiles()),
          b || (Z(e.el, "leaflet-tile-loaded"),
          this.fire("tileload", {
              tile: e.el,
              coords: a
          })),
          this._noTilesToLoad() && (this._loading = !1,
          this.fire("load"),
          S.ielt9 || !this._map._fadeAnimated ? z(this._pruneTiles, this) : setTimeout(p(this._pruneTiles, this), 250)))
      },
      _getTilePos: function(a) {
          return a.scaleBy(this.getTileSize()).subtract(this._level.origin)
      },
      _wrapCoords: function(a) {
          var b = new H(this._wrapX ? f(a.x, this._wrapX) : a.x,this._wrapY ? f(a.y, this._wrapY) : a.y);
          return b.z = a.z,
          b
      },
      _pxBoundsToTileRange: function(a) {
          var b = this.getTileSize();
          return new O(a.min.unscaleBy(b).floor(),a.max.unscaleBy(b).ceil().subtract([1, 1]))
      },
      _noTilesToLoad: function() {
          for (var a in this._tiles)
              if (!this._tiles[a].loaded)
                  return !1;
          return !0
      }
  })
    , cb = xb.extend({
      options: {
          minZoom: 0,
          maxZoom: 18,
          subdomains: "abc",
          errorTileUrl: "",
          zoomOffset: 0,
          tms: !1,
          zoomReverse: !1,
          detectRetina: !1,
          crossOrigin: !1,
          referrerPolicy: !1
      },
      initialize: function(a, b) {
          this._url = a;
          (b = v(this, b)).detectRetina && S.retina && 0 < b.maxZoom && (b.tileSize = Math.floor(b.tileSize / 2),
          b.zoomReverse ? (b.zoomOffset--,
          b.minZoom++) : (b.zoomOffset++,
          b.maxZoom--),
          b.minZoom = Math.max(0, b.minZoom));
          "string" == typeof b.subdomains && (b.subdomains = b.subdomains.split(""));
          this.on("tileunload", this._onTileRemove)
      },
      setUrl: function(a, b) {
          return this._url === a && void 0 === b && (b = !0),
          this._url = a,
          b || this.redraw(),
          this
      },
      createTile: function(a, b) {
          var e = document.createElement("img");
          return Y(e, "load", p(this._tileOnLoad, this, b, e)),
          Y(e, "error", p(this._tileOnError, this, b, e)),
          !this.options.crossOrigin && "" !== this.options.crossOrigin || (e.crossOrigin = !0 === this.options.crossOrigin ? "" : this.options.crossOrigin),
          "string" == typeof this.options.referrerPolicy && (e.referrerPolicy = this.options.referrerPolicy),
          e.alt = "",
          e.setAttribute("role", "presentation"),
          e.src = this.getTileUrl(a),
          e
      },
      getTileUrl: function(a) {
          var b = {
              r: S.retina ? "@2x" : "",
              s: this._getSubdomain(a),
              x: a.x,
              y: a.y,
              z: this._getZoomForUrl()
          };
          return this._map && !this._map.options.crs.infinite && (a = this._globalTileRange.max.y - a.y,
          this.options.tms && (b.y = a),
          b["-y"] = a),
          y(this._url, g(b, this.options))
      },
      _tileOnLoad: function(a, b) {
          S.ielt9 ? setTimeout(p(a, this, null, b), 0) : a(null, b)
      },
      _tileOnError: function(a, b, e) {
          var r = this.options.errorTileUrl;
          r && b.getAttribute("src") !== r && (b.src = r);
          a(e, b)
      },
      _onTileRemove: function(a) {
          a.tile.onload = null
      },
      _getZoomForUrl: function() {
          var a = this._tileZoom
            , b = this.options.maxZoom;
          return (this.options.zoomReverse ? b - a : a) + this.options.zoomOffset
      },
      _getSubdomain: function(a) {
          a = Math.abs(a.x + a.y) % this.options.subdomains.length;
          return this.options.subdomains[a]
      },
      _abortLoading: function() {
          var a, b, e;
          for (a in this._tiles)
              this._tiles[a].coords.z !== this._tileZoom && ((e = this._tiles[a].el).onload = q,
              e.onerror = q,
              e.complete || (e.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
              b = this._tiles[a].coords,
              ha(e),
              delete this._tiles[a],
              this.fire("tileabort", {
                  tile: e,
                  coords: b
              })))
      },
      _removeTile: function(a) {
          var b = this._tiles[a];
          if (b)
              return b.el.setAttribute("src", "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="),
              xb.prototype._removeTile.call(this, a)
      },
      _tileReady: function(a, b, e) {
          if (this._map && (!e || "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" !== e.getAttribute("src")))
              return xb.prototype._tileReady.call(this, a, b, e)
      }
  })
    , md = cb.extend({
      defaultWmsParams: {
          service: "WMS",
          request: "GetMap",
          layers: "",
          styles: "",
          format: "image/jpeg",
          transparent: !1,
          version: "1.1.1"
      },
      options: {
          crs: null,
          uppercase: !1
      },
      initialize: function(a, b) {
          this._url = a;
          var e, r = g({}, this.defaultWmsParams);
          for (e in b)
              e in this.options || (r[e] = b[e]);
          a = v(this, b).detectRetina && S.retina ? 2 : 1;
          b = this.getTileSize();
          r.width = b.x * a;
          r.height = b.y * a;
          this.wmsParams = r
      },
      onAdd: function(a) {
          this._crs = this.options.crs || a.options.crs;
          this._wmsVersion = parseFloat(this.wmsParams.version);
          this.wmsParams[1.3 <= this._wmsVersion ? "crs" : "srs"] = this._crs.code;
          cb.prototype.onAdd.call(this, a)
      },
      getTileUrl: function(a) {
          var b = this._tileCoordsToNwSe(a)
            , e = this._crs;
          e = P(e.project(b[0]), e.project(b[1]));
          b = e.min;
          e = e.max;
          b = (1.3 <= this._wmsVersion && this._crs === hd ? [b.y, b.x, e.y, e.x] : [b.x, b.y, e.x, e.y]).join(",");
          e = cb.prototype.getTileUrl.call(this, a);
          return e + w(this.wmsParams, e, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + b
      },
      setParams: function(a, b) {
          return g(this.wmsParams, a),
          b || this.redraw(),
          this
      }
  });
  cb.WMS = md;
  Uc.wms = function(a, b) {
      return new md(a,b)
  }
  ;
  var Ja = ta.extend({
      options: {
          padding: .1
      },
      initialize: function(a) {
          v(this, a);
          d(this);
          this._layers = this._layers || {}
      },
      onAdd: function() {
          this._container || (this._initContainer(),
          this._zoomAnimated && Z(this._container, "leaflet-zoom-animated"));
          this.getPane().appendChild(this._container);
          this._update();
          this.on("update", this._updatePaths, this)
      },
      onRemove: function() {
          this.off("update", this._updatePaths, this);
          this._destroyContainer()
      },
      getEvents: function() {
          var a = {
              viewreset: this._reset,
              zoom: this._onZoom,
              moveend: this._update,
              zoomend: this._onZoomEnd
          };
          return this._zoomAnimated && (a.zoomanim = this._onAnimZoom),
          a
      },
      _onAnimZoom: function(a) {
          this._updateTransform(a.center, a.zoom)
      },
      _onZoom: function() {
          this._updateTransform(this._map.getCenter(), this._map.getZoom())
      },
      _updateTransform: function(a, b) {
          var e = this._map.getZoomScale(b, this._zoom)
            , r = this._map.getSize().multiplyBy(.5 + this.options.padding)
            , x = this._map.project(this._center, b);
          r = r.multiplyBy(-e).add(x).subtract(this._map._getNewPixelOrigin(a, b));
          S.any3d ? Oa(this._container, r, e) : la(this._container, r)
      },
      _reset: function() {
          for (var a in this._update(),
          this._updateTransform(this._center, this._zoom),
          this._layers)
              this._layers[a]._reset()
      },
      _onZoomEnd: function() {
          for (var a in this._layers)
              this._layers[a]._project()
      },
      _updatePaths: function() {
          for (var a in this._layers)
              this._layers[a]._update()
      },
      _update: function() {
          var a = this.options.padding
            , b = this._map.getSize()
            , e = this._map.containerPointToLayerPoint(b.multiplyBy(-a)).round();
          this._bounds = new O(e,e.add(b.multiplyBy(1 + 2 * a)).round());
          this._center = this._map.getCenter();
          this._zoom = this._map.getZoom()
      }
  })
    , Wc = Ja.extend({
      options: {
          tolerance: 0
      },
      getEvents: function() {
          var a = Ja.prototype.getEvents.call(this);
          return a.viewprereset = this._onViewPreReset,
          a
      },
      _onViewPreReset: function() {
          this._postponeUpdatePaths = !0
      },
      onAdd: function() {
          Ja.prototype.onAdd.call(this);
          this._draw()
      },
      _initContainer: function() {
          var a = this._container = document.createElement("canvas");
          Y(a, "mousemove", this._onMouseMove, this);
          Y(a, "click dblclick mousedown mouseup contextmenu", this._onClick, this);
          Y(a, "mouseout", this._handleMouseOut, this);
          a._leaflet_disable_events = !0;
          this._ctx = a.getContext("2d")
      },
      _destroyContainer: function() {
          F(this._redrawRequest);
          delete this._ctx;
          ha(this._container);
          da(this._container);
          delete this._container
      },
      _updatePaths: function() {
          if (!this._postponeUpdatePaths) {
              for (var a in this._redrawBounds = null,
              this._layers)
                  this._layers[a]._update();
              this._redraw()
          }
      },
      _update: function() {
          var a, b, e, r;
          this._map._animatingZoom && this._bounds || (Ja.prototype._update.call(this),
          a = this._bounds,
          b = this._container,
          e = a.getSize(),
          r = S.retina ? 2 : 1,
          la(b, a.min),
          b.width = r * e.x,
          b.height = r * e.y,
          b.style.width = e.x + "px",
          b.style.height = e.y + "px",
          S.retina && this._ctx.scale(2, 2),
          this._ctx.translate(-a.min.x, -a.min.y),
          this.fire("update"))
      },
      _reset: function() {
          Ja.prototype._reset.call(this);
          this._postponeUpdatePaths && (this._postponeUpdatePaths = !1,
          this._updatePaths())
      },
      _initPath: function(a) {
          this._updateDashArray(a);
          a = (this._layers[d(a)] = a)._order = {
              layer: a,
              prev: this._drawLast,
              next: null
          };
          this._drawLast && (this._drawLast.next = a);
          this._drawLast = a;
          this._drawFirst = this._drawFirst || this._drawLast
      },
      _addPath: function(a) {
          this._requestRedraw(a)
      },
      _removePath: function(a) {
          var b = a._order
            , e = b.next;
          b = b.prev;
          e ? e.prev = b : this._drawLast = b;
          b ? b.next = e : this._drawFirst = e;
          delete a._order;
          delete this._layers[d(a)];
          this._requestRedraw(a)
      },
      _updatePath: function(a) {
          this._extendRedrawBounds(a);
          a._project();
          a._update();
          this._requestRedraw(a)
      },
      _updateStyle: function(a) {
          this._updateDashArray(a);
          this._requestRedraw(a)
      },
      _updateDashArray: function(a) {
          if ("string" == typeof a.options.dashArray) {
              for (var b, e = a.options.dashArray.split(/[, ]+/), r = [], x = 0; x < e.length; x++) {
                  if (b = Number(e[x]),
                  isNaN(b))
                      return;
                  r.push(b)
              }
              a.options._dashArray = r
          } else
              a.options._dashArray = a.options.dashArray
      },
      _requestRedraw: function(a) {
          this._map && (this._extendRedrawBounds(a),
          this._redrawRequest = this._redrawRequest || z(this._redraw, this))
      },
      _extendRedrawBounds: function(a) {
          var b;
          a._pxBounds && (b = (a.options.weight || 0) + 1,
          this._redrawBounds = this._redrawBounds || new O,
          this._redrawBounds.extend(a._pxBounds.min.subtract([b, b])),
          this._redrawBounds.extend(a._pxBounds.max.add([b, b])))
      },
      _redraw: function() {
          this._redrawRequest = null;
          this._redrawBounds && (this._redrawBounds.min._floor(),
          this._redrawBounds.max._ceil());
          this._clear();
          this._draw();
          this._redrawBounds = null
      },
      _clear: function() {
          var a, b = this._redrawBounds;
          b ? (a = b.getSize(),
          this._ctx.clearRect(b.min.x, b.min.y, a.x, a.y)) : (this._ctx.save(),
          this._ctx.setTransform(1, 0, 0, 1, 0, 0),
          this._ctx.clearRect(0, 0, this._container.width, this._container.height),
          this._ctx.restore())
      },
      _draw: function() {
          var a, b = this._redrawBounds;
          this._ctx.save();
          b && (a = b.getSize(),
          this._ctx.beginPath(),
          this._ctx.rect(b.min.x, b.min.y, a.x, a.y),
          this._ctx.clip());
          this._drawing = !0;
          for (var e = this._drawFirst; e; e = e.next)
              a = e.layer,
              (!b || a._pxBounds && a._pxBounds.intersects(b)) && a._updatePath();
          this._drawing = !1;
          this._ctx.restore()
      },
      _updatePoly: function(a, b) {
          if (this._drawing) {
              var e, r, x = a._parts, D = x.length, G = this._ctx;
              if (D) {
                  G.beginPath();
                  for (e = 0; e < D; e++) {
                      var K = 0;
                      for (r = x[e].length; K < r; K++) {
                          var Q = x[e][K];
                          G[K ? "lineTo" : "moveTo"](Q.x, Q.y)
                      }
                      b && G.closePath()
                  }
                  this._fillStroke(G, a)
              }
          }
      },
      _updateCircle: function(a) {
          var b, e, r, x;
          this._drawing && !a._empty() && (b = a._point,
          e = this._ctx,
          r = Math.max(Math.round(a._radius), 1),
          1 != (x = (Math.max(Math.round(a._radiusY), 1) || r) / r) && (e.save(),
          e.scale(1, x)),
          e.beginPath(),
          e.arc(b.x, b.y / x, r, 0, 2 * Math.PI, !1),
          1 != x && e.restore(),
          this._fillStroke(e, a))
      },
      _fillStroke: function(a, b) {
          var e = b.options;
          e.fill && (a.globalAlpha = e.fillOpacity,
          a.fillStyle = e.fillColor || e.color,
          a.fill(e.fillRule || "evenodd"));
          e.stroke && 0 !== e.weight && (a.setLineDash && a.setLineDash(b.options && b.options._dashArray || []),
          a.globalAlpha = e.opacity,
          a.lineWidth = e.weight,
          a.strokeStyle = e.color,
          a.lineCap = e.lineCap,
          a.lineJoin = e.lineJoin,
          a.stroke())
      },
      _onClick: function(a) {
          for (var b, e, r = this._map.mouseEventToLayerPoint(a), x = this._drawFirst; x; x = x.next)
              (b = x.layer).options.interactive && b._containsPoint(r) && (("click" === a.type || "preclick" === a.type) && this._map._draggableMoved(b) || (e = b));
          this._fireEvent(!!e && [e], a)
      },
      _onMouseMove: function(a) {
          var b;
          !this._map || this._map.dragging.moving() || this._map._animatingZoom || (b = this._map.mouseEventToLayerPoint(a),
          this._handleMouseHover(a, b))
      },
      _handleMouseOut: function(a) {
          var b = this._hoveredLayer;
          b && (ja(this._container, "leaflet-interactive"),
          this._fireEvent([b], a, "mouseout"),
          this._hoveredLayer = null,
          this._mouseHoverThrottled = !1)
      },
      _handleMouseHover: function(a, b) {
          if (!this._mouseHoverThrottled) {
              for (var e, r, x = this._drawFirst; x; x = x.next)
                  (e = x.layer).options.interactive && e._containsPoint(b) && (r = e);
              r !== this._hoveredLayer && (this._handleMouseOut(a),
              r && (Z(this._container, "leaflet-interactive"),
              this._fireEvent([r], a, "mouseover"),
              this._hoveredLayer = r));
              this._fireEvent(!!this._hoveredLayer && [this._hoveredLayer], a);
              this._mouseHoverThrottled = !0;
              setTimeout(p(function() {
                  this._mouseHoverThrottled = !1
              }, this), 32)
          }
      },
      _fireEvent: function(a, b, e) {
          this._map._fireDOMEvent(b, e || b.type, a)
      },
      _bringToFront: function(a) {
          var b, e, r = a._order;
          r && (b = r.next,
          e = r.prev,
          b && ((b.prev = e) ? e.next = b : b && (this._drawFirst = b),
          r.prev = this._drawLast,
          (this._drawLast.next = r).next = null,
          this._drawLast = r,
          this._requestRedraw(a)))
      },
      _bringToBack: function(a) {
          var b, e, r = a._order;
          r && (b = r.next,
          (e = r.prev) && ((e.next = b) ? b.prev = e : e && (this._drawLast = e),
          r.prev = null,
          r.next = this._drawFirst,
          this._drawFirst.prev = r,
          this._drawFirst = r,
          this._requestRedraw(a)))
      }
  })
    , yb = function() {
      try {
          return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"),
          function(a) {
              return document.createElement("<lvml:" + a + ' class="lvml">')
          }
      } catch (a) {}
      return function(a) {
          return document.createElement("<" + a + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')
      }
  }();
  qb = {
      _initContainer: function() {
          this._container = V("div", "leaflet-vml-container")
      },
      _update: function() {
          this._map._animatingZoom || (Ja.prototype._update.call(this),
          this.fire("update"))
      },
      _initPath: function(a) {
          var b = a._container = yb("shape");
          Z(b, "leaflet-vml-shape " + (this.options.className || ""));
          b.coordsize = "1 1";
          a._path = yb("path");
          b.appendChild(a._path);
          this._updateStyle(a);
          this._layers[d(a)] = a
      },
      _addPath: function(a) {
          var b = a._container;
          this._container.appendChild(b);
          a.options.interactive && a.addInteractiveTarget(b)
      },
      _removePath: function(a) {
          var b = a._container;
          ha(b);
          a.removeInteractiveTarget(b);
          delete this._layers[d(a)]
      },
      _updateStyle: function(a) {
          var b = a._stroke
            , e = a._fill
            , r = a.options
            , x = a._container;
          x.stroked = !!r.stroke;
          x.filled = !!r.fill;
          r.stroke ? (b = b || (a._stroke = yb("stroke")),
          x.appendChild(b),
          b.weight = r.weight + "px",
          b.color = r.color,
          b.opacity = r.opacity,
          r.dashArray ? b.dashStyle = Aa(r.dashArray) ? r.dashArray.join(" ") : r.dashArray.replace(/( *, *)/g, " ") : b.dashStyle = "",
          b.endcap = r.lineCap.replace("butt", "flat"),
          b.joinstyle = r.lineJoin) : b && (x.removeChild(b),
          a._stroke = null);
          r.fill ? (e = e || (a._fill = yb("fill")),
          x.appendChild(e),
          e.color = r.fillColor || r.color,
          e.opacity = r.fillOpacity) : e && (x.removeChild(e),
          a._fill = null)
      },
      _updateCircle: function(a) {
          var b = a._point.round()
            , e = Math.round(a._radius)
            , r = Math.round(a._radiusY || e);
          this._setPath(a, a._empty() ? "M0 0" : "AL " + b.x + "," + b.y + " " + e + "," + r + " 0,23592600")
      },
      _setPath: function(a, b) {
          a._path.v = b
      },
      _bringToFront: function(a) {
          Ya(a._container)
      },
      _bringToBack: function(a) {
          Za(a._container)
      }
  };
  var $b = S.vml ? yb : ma
    , lb = Ja.extend({
      _initContainer: function() {
          this._container = $b("svg");
          this._container.setAttribute("pointer-events", "none");
          this._rootGroup = $b("g");
          this._container.appendChild(this._rootGroup)
      },
      _destroyContainer: function() {
          ha(this._container);
          da(this._container);
          delete this._container;
          delete this._rootGroup;
          delete this._svgSize
      },
      _update: function() {
          var a, b, e;
          this._map._animatingZoom && this._bounds || (Ja.prototype._update.call(this),
          b = (a = this._bounds).getSize(),
          e = this._container,
          this._svgSize && this._svgSize.equals(b) || (this._svgSize = b,
          e.setAttribute("width", b.x),
          e.setAttribute("height", b.y)),
          la(e, a.min),
          e.setAttribute("viewBox", [a.min.x, a.min.y, b.x, b.y].join(" ")),
          this.fire("update"))
      },
      _initPath: function(a) {
          var b = a._path = $b("path");
          a.options.className && Z(b, a.options.className);
          a.options.interactive && Z(b, "leaflet-interactive");
          this._updateStyle(a);
          this._layers[d(a)] = a
      },
      _addPath: function(a) {
          this._rootGroup || this._initContainer();
          this._rootGroup.appendChild(a._path);
          a.addInteractiveTarget(a._path)
      },
      _removePath: function(a) {
          ha(a._path);
          a.removeInteractiveTarget(a._path);
          delete this._layers[d(a)]
      },
      _updatePath: function(a) {
          a._project();
          a._update()
      },
      _updateStyle: function(a) {
          var b = a._path;
          a = a.options;
          b && (a.stroke ? (b.setAttribute("stroke", a.color),
          b.setAttribute("stroke-opacity", a.opacity),
          b.setAttribute("stroke-width", a.weight),
          b.setAttribute("stroke-linecap", a.lineCap),
          b.setAttribute("stroke-linejoin", a.lineJoin),
          a.dashArray ? b.setAttribute("stroke-dasharray", a.dashArray) : b.removeAttribute("stroke-dasharray"),
          a.dashOffset ? b.setAttribute("stroke-dashoffset", a.dashOffset) : b.removeAttribute("stroke-dashoffset")) : b.setAttribute("stroke", "none"),
          a.fill ? (b.setAttribute("fill", a.fillColor || a.color),
          b.setAttribute("fill-opacity", a.fillOpacity),
          b.setAttribute("fill-rule", a.fillRule || "evenodd")) : b.setAttribute("fill", "none"))
      },
      _updatePoly: function(a, b) {
          this._setPath(a, pa(a._parts, b))
      },
      _updateCircle: function(a) {
          var b = a._point
            , e = Math.max(Math.round(a._radius), 1)
            , r = "a" + e + "," + (Math.max(Math.round(a._radiusY), 1) || e) + " 0 1,0 ";
          b = a._empty() ? "M0 0" : "M" + (b.x - e) + "," + b.y + r + 2 * e + ",0 " + r + 2 * -e + ",0 ";
          this._setPath(a, b)
      },
      _setPath: function(a, b) {
          a._path.setAttribute("d", b)
      },
      _bringToFront: function(a) {
          Ya(a._path)
      },
      _bringToBack: function(a) {
          Za(a._path)
      }
  });
  S.vml && lb.include(qb);
  aa.include({
      getRenderer: function(a) {
          a = (a = a.options.renderer || this._getPaneRenderer(a.options.pane) || this.options.renderer || this._renderer) || (this._renderer = this._createRenderer());
          return this.hasLayer(a) || this.addLayer(a),
          a
      },
      _getPaneRenderer: function(a) {
          if ("overlayPane" === a || void 0 === a)
              return !1;
          var b = this._paneRenderers[a];
          return void 0 === b && (b = this._createRenderer({
              pane: a
          }),
          this._paneRenderers[a] = b),
          b
      },
      _createRenderer: function(a) {
          return this.options.preferCanvas && Vc(a) || Xc(a)
      }
  });
  var nd = ab.extend({
      initialize: function(a, b) {
          ab.prototype.initialize.call(this, this._boundsToLatLngs(a), b)
      },
      setBounds: function(a) {
          return this.setLatLngs(this._boundsToLatLngs(a))
      },
      _boundsToLatLngs: function(a) {
          return [(a = T(a)).getSouthWest(), a.getNorthWest(), a.getNorthEast(), a.getSouthEast()]
      }
  });
  lb.create = $b;
  lb.pointsToPath = pa;
  Fa.geometryToLayer = pc;
  Fa.coordsToLatLng = qc;
  Fa.coordsToLatLngs = Ib;
  Fa.latLngToCoords = rc;
  Fa.latLngsToCoords = Jb;
  Fa.getFeature = bb;
  Fa.asFeature = Kb;
  aa.mergeOptions({
      boxZoom: !0
  });
  Ia = va.extend({
      initialize: function(a) {
          this._map = a;
          this._container = a._container;
          this._pane = a._panes.overlayPane;
          this._resetStateTimeout = 0;
          a.on("unload", this._destroy, this)
      },
      addHooks: function() {
          Y(this._container, "mousedown", this._onMouseDown, this)
      },
      removeHooks: function() {
          da(this._container, "mousedown", this._onMouseDown, this)
      },
      moved: function() {
          return this._moved
      },
      _destroy: function() {
          ha(this._pane);
          delete this._pane
      },
      _resetState: function() {
          this._resetStateTimeout = 0;
          this._moved = !1
      },
      _clearDeferredResetState: function() {
          0 !== this._resetStateTimeout && (clearTimeout(this._resetStateTimeout),
          this._resetStateTimeout = 0)
      },
      _onMouseDown: function(a) {
          if (!a.shiftKey || 1 !== a.which && 1 !== a.button)
              return !1;
          this._clearDeferredResetState();
          this._resetState();
          tb();
          fc();
          this._startPoint = this._map.mouseEventToContainerPoint(a);
          Y(document, {
              contextmenu: Ra,
              mousemove: this._onMouseMove,
              mouseup: this._onMouseUp,
              keydown: this._onKeyDown
          }, this)
      },
      _onMouseMove: function(a) {
          this._moved || (this._moved = !0,
          this._box = V("div", "leaflet-zoom-box", this._container),
          Z(this._container, "leaflet-crosshair"),
          this._map.fire("boxzoomstart"));
          this._point = this._map.mouseEventToContainerPoint(a);
          a = new O(this._point,this._startPoint);
          var b = a.getSize();
          la(this._box, a.min);
          this._box.style.width = b.x + "px";
          this._box.style.height = b.y + "px"
      },
      _finish: function() {
          this._moved && (ha(this._box),
          ja(this._container, "leaflet-crosshair"));
          wc();
          gc();
          da(document, {
              contextmenu: Ra,
              mousemove: this._onMouseMove,
              mouseup: this._onMouseUp,
              keydown: this._onKeyDown
          }, this)
      },
      _onMouseUp: function(a) {
          1 !== a.which && 1 !== a.button || (this._finish(),
          this._moved && (this._clearDeferredResetState(),
          this._resetStateTimeout = setTimeout(p(this._resetState, this), 0),
          a = new N(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point)),
          this._map.fitBounds(a).fire("boxzoomend", {
              boxZoomBounds: a
          })))
      },
      _onKeyDown: function(a) {
          27 === a.keyCode && (this._finish(),
          this._clearDeferredResetState(),
          this._resetState())
      }
  });
  Rb = (aa.addInitHook("addHandler", "boxZoom", Ia),
  aa.mergeOptions({
      doubleClickZoom: !0
  }),
  va.extend({
      addHooks: function() {
          this._map.on("dblclick", this._onDoubleClick, this)
      },
      removeHooks: function() {
          this._map.off("dblclick", this._onDoubleClick, this)
      },
      _onDoubleClick: function(a) {
          var b = this._map
            , e = b.getZoom()
            , r = b.options.zoomDelta;
          e = a.originalEvent.shiftKey ? e - r : e + r;
          "center" === b.options.doubleClickZoom ? b.setZoom(e) : b.setZoomAround(a.containerPoint, e)
      }
  }));
  La = (aa.addInitHook("addHandler", "doubleClickZoom", Rb),
  aa.mergeOptions({
      dragging: !0,
      inertia: !0,
      inertiaDeceleration: 3400,
      inertiaMaxSpeed: 1 / 0,
      easeLinearity: .2,
      worldCopyJump: !1,
      maxBoundsViscosity: 0
  }),
  va.extend({
      addHooks: function() {
          var a;
          this._draggable || (a = this._map,
          this._draggable = new Ma(a._mapPane,a._container),
          this._draggable.on({
              dragstart: this._onDragStart,
              drag: this._onDrag,
              dragend: this._onDragEnd
          }, this),
          this._draggable.on("predrag", this._onPreDragLimit, this),
          a.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this),
          a.on("zoomend", this._onZoomEnd, this),
          a.whenReady(this._onZoomEnd, this)));
          Z(this._map._container, "leaflet-grab leaflet-touch-drag");
          this._draggable.enable();
          this._positions = [];
          this._times = []
      },
      removeHooks: function() {
          ja(this._map._container, "leaflet-grab");
          ja(this._map._container, "leaflet-touch-drag");
          this._draggable.disable()
      },
      moved: function() {
          return this._draggable && this._draggable._moved
      },
      moving: function() {
          return this._draggable && this._draggable._moving
      },
      _onDragStart: function() {
          var a, b = this._map;
          b._stop();
          this._map.options.maxBounds && this._map.options.maxBoundsViscosity ? (a = T(this._map.options.maxBounds),
          this._offsetLimit = P(this._map.latLngToContainerPoint(a.getNorthWest()).multiplyBy(-1), this._map.latLngToContainerPoint(a.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),
          this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity))) : this._offsetLimit = null;
          b.fire("movestart").fire("dragstart");
          b.options.inertia && (this._positions = [],
          this._times = [])
      },
      _onDrag: function(a) {
          var b, e;
          this._map.options.inertia && (b = this._lastTime = +new Date,
          e = this._lastPos = this._draggable._absPos || this._draggable._newPos,
          this._positions.push(e),
          this._times.push(b),
          this._prunePositions(b));
          this._map.fire("move", a).fire("drag", a)
      },
      _prunePositions: function(a) {
          for (; 1 < this._positions.length && 50 < a - this._times[0]; )
              this._positions.shift(),
              this._times.shift()
      },
      _onZoomEnd: function() {
          var a = this._map.getSize().divideBy(2);
          this._initialWorldOffset = this._map.latLngToLayerPoint([0, 0]).subtract(a).x;
          this._worldWidth = this._map.getPixelWorldBounds().getSize().x
      },
      _viscousLimit: function(a, b) {
          return a - (a - b) * this._viscosity
      },
      _onPreDragLimit: function() {
          var a, b;
          this._viscosity && this._offsetLimit && (a = this._draggable._newPos.subtract(this._draggable._startPos),
          b = this._offsetLimit,
          a.x < b.min.x && (a.x = this._viscousLimit(a.x, b.min.x)),
          a.y < b.min.y && (a.y = this._viscousLimit(a.y, b.min.y)),
          a.x > b.max.x && (a.x = this._viscousLimit(a.x, b.max.x)),
          a.y > b.max.y && (a.y = this._viscousLimit(a.y, b.max.y)),
          this._draggable._newPos = this._draggable._startPos.add(a))
      },
      _onPreDragWrap: function() {
          var a = this._worldWidth
            , b = Math.round(a / 2)
            , e = this._initialWorldOffset
            , r = this._draggable._newPos.x
            , x = (r - b + e) % a + b - e;
          r = (r + b + e) % a - b - e;
          a = Math.abs(x + e) < Math.abs(r + e) ? x : r;
          this._draggable._absPos = this._draggable._newPos.clone();
          this._draggable._newPos.x = a
      },
      _onDragEnd: function(a) {
          var b, e, r, x, D = this._map, G = D.options, K = !G.inertia || a.noInertia || 2 > this._times.length;
          D.fire("dragend", a);
          K ? D.fire("moveend") : (this._prunePositions(+new Date),
          a = this._lastPos.subtract(this._positions[0]),
          K = (this._lastTime - this._times[0]) / 1E3,
          b = G.easeLinearity,
          K = (a = a.multiplyBy(b / K)).distanceTo([0, 0]),
          e = Math.min(G.inertiaMaxSpeed, K),
          a = a.multiplyBy(e / K),
          r = e / (G.inertiaDeceleration * b),
          (x = a.multiplyBy(-r / 2).round()).x || x.y ? (x = D._limitOffset(x, D.options.maxBounds),
          z(function() {
              D.panBy(x, {
                  duration: r,
                  easeLinearity: b,
                  noMoveStart: !0,
                  animate: !0
              })
          })) : D.fire("moveend"))
      }
  }));
  Sb = (aa.addInitHook("addHandler", "dragging", La),
  aa.mergeOptions({
      keyboard: !0,
      keyboardPanDelta: 80
  }),
  va.extend({
      keyCodes: {
          left: [37],
          right: [39],
          down: [40],
          up: [38],
          zoomIn: [187, 107, 61, 171],
          zoomOut: [189, 109, 54, 173]
      },
      initialize: function(a) {
          this._map = a;
          this._setPanDelta(a.options.keyboardPanDelta);
          this._setZoomDelta(a.options.zoomDelta)
      },
      addHooks: function() {
          var a = this._map._container;
          0 >= a.tabIndex && (a.tabIndex = "0");
          Y(a, {
              focus: this._onFocus,
              blur: this._onBlur,
              mousedown: this._onMouseDown
          }, this);
          this._map.on({
              focus: this._addHooks,
              blur: this._removeHooks
          }, this)
      },
      removeHooks: function() {
          this._removeHooks();
          da(this._map._container, {
              focus: this._onFocus,
              blur: this._onBlur,
              mousedown: this._onMouseDown
          }, this);
          this._map.off({
              focus: this._addHooks,
              blur: this._removeHooks
          }, this)
      },
      _onMouseDown: function() {
          var a, b, e;
          this._focused || (e = document.body,
          a = document.documentElement,
          b = e.scrollTop || a.scrollTop,
          e = e.scrollLeft || a.scrollLeft,
          this._map._container.focus(),
          window.scrollTo(e, b))
      },
      _onFocus: function() {
          this._focused = !0;
          this._map.fire("focus")
      },
      _onBlur: function() {
          this._focused = !1;
          this._map.fire("blur")
      },
      _setPanDelta: function(a) {
          for (var b = this._panKeys = {}, e = this.keyCodes, r = 0, x = e.left.length; r < x; r++)
              b[e.left[r]] = [-1 * a, 0];
          r = 0;
          for (x = e.right.length; r < x; r++)
              b[e.right[r]] = [a, 0];
          r = 0;
          for (x = e.down.length; r < x; r++)
              b[e.down[r]] = [0, a];
          r = 0;
          for (x = e.up.length; r < x; r++)
              b[e.up[r]] = [0, -1 * a]
      },
      _setZoomDelta: function(a) {
          for (var b = this._zoomKeys = {}, e = this.keyCodes, r = 0, x = e.zoomIn.length; r < x; r++)
              b[e.zoomIn[r]] = a;
          r = 0;
          for (x = e.zoomOut.length; r < x; r++)
              b[e.zoomOut[r]] = -a
      },
      _addHooks: function() {
          Y(document, "keydown", this._onKeyDown, this)
      },
      _removeHooks: function() {
          da(document, "keydown", this._onKeyDown, this)
      },
      _onKeyDown: function(a) {
          if (!(a.altKey || a.ctrlKey || a.metaKey)) {
              var b, e = a.keyCode, r = this._map;
              if (e in this._panKeys)
                  r._panAnim && r._panAnim._inProgress || (b = this._panKeys[e],
                  a.shiftKey && (b = J(b).multiplyBy(3)),
                  r.panBy(b),
                  r.options.maxBounds && r.panInsideBounds(r.options.maxBounds));
              else if (e in this._zoomKeys)
                  r.setZoom(r.getZoom() + (a.shiftKey ? 3 : 1) * this._zoomKeys[e]);
              else {
                  if (27 !== e || !r._popup || !r._popup.options.closeOnEscapeKey)
                      return;
                  r.closePopup()
              }
              Ra(a)
          }
      }
  }));
  Tb = (aa.addInitHook("addHandler", "keyboard", Sb),
  aa.mergeOptions({
      scrollWheelZoom: !0,
      wheelDebounceTime: 40,
      wheelPxPerZoomLevel: 60
  }),
  va.extend({
      addHooks: function() {
          Y(this._map._container, "wheel", this._onWheelScroll, this);
          this._delta = 0
      },
      removeHooks: function() {
          da(this._map._container, "wheel", this._onWheelScroll, this)
      },
      _onWheelScroll: function(a) {
          var b = Mc(a)
            , e = this._map.options.wheelDebounceTime;
          b = (this._delta += b,
          this._lastMousePos = this._map.mouseEventToContainerPoint(a),
          this._startTime || (this._startTime = +new Date),
          Math.max(e - (+new Date - this._startTime), 0));
          clearTimeout(this._timer);
          this._timer = setTimeout(p(this._performZoom, this), b);
          Ra(a)
      },
      _performZoom: function() {
          var a = this._map
            , b = a.getZoom()
            , e = this._map.options.zoomSnap || 0
            , r = (a._stop(),
          this._delta / (4 * this._map.options.wheelPxPerZoomLevel));
          r = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(r)))) / Math.LN2;
          e = e ? Math.ceil(r / e) * e : r;
          r = a._limitZoom(b + (0 < this._delta ? e : -e)) - b;
          this._delta = 0;
          this._startTime = null;
          r && ("center" === a.options.scrollWheelZoom ? a.setZoom(b + r) : a.setZoomAround(this._lastMousePos, b + r))
      }
  }));
  rb = (aa.addInitHook("addHandler", "scrollWheelZoom", Tb),
  aa.mergeOptions({
      tapHold: S.touchNative && S.safari && S.mobile,
      tapTolerance: 15
  }),
  va.extend({
      addHooks: function() {
          Y(this._map._container, "touchstart", this._onDown, this)
      },
      removeHooks: function() {
          da(this._map._container, "touchstart", this._onDown, this)
      },
      _onDown: function(a) {
          var b;
          clearTimeout(this._holdTimeout);
          1 === a.touches.length && (b = a.touches[0],
          this._startPos = this._newPos = new H(b.clientX,b.clientY),
          this._holdTimeout = setTimeout(p(function() {
              this._cancel();
              this._isTapValid() && (Y(document, "touchend", ra),
              Y(document, "touchend touchcancel", this._cancelClickPrevent),
              this._simulateEvent("contextmenu", b))
          }, this), 600),
          Y(document, "touchend touchcancel contextmenu", this._cancel, this),
          Y(document, "touchmove", this._onMove, this))
      },
      _cancelClickPrevent: function b() {
          da(document, "touchend", ra);
          da(document, "touchend touchcancel", b)
      },
      _cancel: function() {
          clearTimeout(this._holdTimeout);
          da(document, "touchend touchcancel contextmenu", this._cancel, this);
          da(document, "touchmove", this._onMove, this)
      },
      _onMove: function(b) {
          b = b.touches[0];
          this._newPos = new H(b.clientX,b.clientY)
      },
      _isTapValid: function() {
          return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance
      },
      _simulateEvent: function(b, e) {
          b = new MouseEvent(b,{
              bubbles: !0,
              cancelable: !0,
              view: window,
              screenX: e.screenX,
              screenY: e.screenY,
              clientX: e.clientX,
              clientY: e.clientY
          });
          b._simulated = !0;
          e.target.dispatchEvent(b)
      }
  }));
  sb = (aa.addInitHook("addHandler", "tapHold", rb),
  aa.mergeOptions({
      touchZoom: S.touch,
      bounceAtZoomLimits: !0
  }),
  va.extend({
      addHooks: function() {
          Z(this._map._container, "leaflet-touch-zoom");
          Y(this._map._container, "touchstart", this._onTouchStart, this)
      },
      removeHooks: function() {
          ja(this._map._container, "leaflet-touch-zoom");
          da(this._map._container, "touchstart", this._onTouchStart, this)
      },
      _onTouchStart: function(b) {
          var e, r, x = this._map;
          !b.touches || 2 !== b.touches.length || x._animatingZoom || this._zooming || (e = x.mouseEventToContainerPoint(b.touches[0]),
          r = x.mouseEventToContainerPoint(b.touches[1]),
          this._centerPoint = x.getSize()._divideBy(2),
          this._startLatLng = x.containerPointToLatLng(this._centerPoint),
          "center" !== x.options.touchZoom && (this._pinchStartLatLng = x.containerPointToLatLng(e.add(r)._divideBy(2))),
          this._startDist = e.distanceTo(r),
          this._startZoom = x.getZoom(),
          this._moved = !1,
          this._zooming = !0,
          x._stop(),
          Y(document, "touchmove", this._onTouchMove, this),
          Y(document, "touchend touchcancel", this._onTouchEnd, this),
          ra(b))
      },
      _onTouchMove: function(b) {
          if (b.touches && 2 === b.touches.length && this._zooming) {
              var e = this._map
                , r = e.mouseEventToContainerPoint(b.touches[0])
                , x = e.mouseEventToContainerPoint(b.touches[1])
                , D = r.distanceTo(x) / this._startDist;
              if (this._zoom = e.getScaleZoom(D, this._startZoom),
              !e.options.bounceAtZoomLimits && (this._zoom < e.getMinZoom() && 1 > D || this._zoom > e.getMaxZoom() && 1 < D) && (this._zoom = e._limitZoom(this._zoom)),
              "center" === e.options.touchZoom) {
                  if (this._center = this._startLatLng,
                  1 == D)
                      return
              } else {
                  r = r._add(x)._divideBy(2)._subtract(this._centerPoint);
                  if (1 == D && 0 === r.x && 0 === r.y)
                      return;
                  this._center = e.unproject(e.project(this._pinchStartLatLng, this._zoom).subtract(r), this._zoom)
              }
              this._moved || (e._moveStart(!0, !1),
              this._moved = !0);
              F(this._animRequest);
              x = p(e._move, e, this._center, this._zoom, {
                  pinch: !0,
                  round: !1
              });
              this._animRequest = z(x, this, !0);
              ra(b)
          }
      },
      _onTouchEnd: function() {
          this._moved && this._zooming ? (this._zooming = !1,
          F(this._animRequest),
          da(document, "touchmove", this._onTouchMove, this),
          da(document, "touchend touchcancel", this._onTouchEnd, this),
          this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom))) : this._zooming = !1
      }
  }));
  var Dd = (aa.addInitHook("addHandler", "touchZoom", sb),
  aa.BoxZoom = Ia,
  aa.DoubleClickZoom = Rb,
  aa.Drag = La,
  aa.Keyboard = Sb,
  aa.ScrollWheelZoom = Tb,
  aa.TapHold = rb,
  aa.TouchZoom = sb,
  c.Bounds = O,
  c.Browser = S,
  c.CRS = Ga,
  c.Canvas = Wc,
  c.Circle = zc,
  c.CircleMarker = Wb,
  c.Class = I,
  c.Control = ya,
  c.DivIcon = ld,
  c.DivOverlay = Ca,
  c.DomEvent = sc,
  c.DomUtil = db,
  c.Draggable = Ma,
  c.Evented = mb,
  c.FeatureGroup = $a,
  c.GeoJSON = Fa,
  c.GridLayer = xb,
  c.Handler = va,
  c.Icon = gb,
  c.ImageOverlay = Xb,
  c.LatLng = U,
  c.LatLngBounds = N,
  c.Layer = ta,
  c.LayerGroup = fb,
  c.LineUtil = Lb,
  c.Map = aa,
  c.Marker = kb,
  c.Mixin = ob,
  c.Path = Na,
  c.Point = H,
  c.PolyUtil = Mb,
  c.Polygon = ab,
  c.Polyline = Ea,
  c.Popup = Yb,
  c.PosAnimation = ad,
  c.Projection = Nb,
  c.Rectangle = nd,
  c.Renderer = Ja,
  c.SVG = lb,
  c.SVGOverlay = kd,
  c.TileLayer = cb,
  c.Tooltip = Zb,
  c.Transformation = ka,
  c.Util = qd,
  c.VideoOverlay = jd,
  c.bind = p,
  c.bounds = P,
  c.canvas = Vc,
  c.circle = function(b, e, r) {
      return new zc(b,e,r)
  }
  ,
  c.circleMarker = function(b, e) {
      return new Wb(b,e)
  }
  ,
  c.control = ib,
  c.divIcon = function(b) {
      return new ld(b)
  }
  ,
  c.extend = g,
  c.featureGroup = function(b, e) {
      return new $a(b,e)
  }
  ,
  c.geoJSON = Tc,
  c.geoJson = Qb,
  c.gridLayer = function(b) {
      return new xb(b)
  }
  ,
  c.icon = function(b) {
      return new gb(b)
  }
  ,
  c.imageOverlay = function(b, e, r) {
      return new Xb(b,e,r)
  }
  ,
  c.latLng = W,
  c.latLngBounds = T,
  c.layerGroup = function(b, e) {
      return new fb(b,e)
  }
  ,
  c.map = function(b, e) {
      return new aa(b,e)
  }
  ,
  c.marker = function(b, e) {
      return new kb(b,e)
  }
  ,
  c.point = J,
  c.polygon = function(b, e) {
      return new ab(b,e)
  }
  ,
  c.polyline = function(b, e) {
      return new Ea(b,e)
  }
  ,
  c.popup = function(b, e) {
      return new Yb(b,e)
  }
  ,
  c.rectangle = function(b, e) {
      return new nd(b,e)
  }
  ,
  c.setOptions = v,
  c.stamp = d,
  c.svg = Xc,
  c.svgOverlay = function(b, e, r) {
      return new kd(b,e,r)
  }
  ,
  c.tileLayer = Uc,
  c.tooltip = function(b, e) {
      return new Zb(b,e)
  }
  ,
  c.transformation = fa,
  c.version = "1.8.0",
  c.videoOverlay = function(b, e, r) {
      return new jd(b,e,r)
  }
  ,
  window.L);
  c.noConflict = function() {
      return window.L = Dd,
      this
  }
  ;
  window.L = c
});
!function(c) {
  if ("object" == typeof exports)
      module.exports = c();
  else if ("function" == typeof define && define.amd)
      define(c);
  else {
      var g;
      "undefined" != typeof window ? g = window : "undefined" != typeof global ? g = global : "undefined" != typeof self && (g = self);
      g.proj4 = c()
  }
}(function() {
  return function d(g, u, p) {
      function m(h, t) {
          if (!u[h]) {
              if (!g[h]) {
                  var l = "function" == typeof require && require;
                  if (!t && l)
                      return l(h, !0);
                  if (f)
                      return f(h, !0);
                  throw Error("Cannot find module '" + h + "'");
              }
              t = u[h] = {
                  exports: {}
              };
              g[h][0].call(t.exports, function(v) {
                  var w = g[h][1][v];
                  return m(w ? w : v)
              }, t, t.exports, d, g, u, p)
          }
          return u[h].exports
      }
      for (var f = "function" == typeof require && require, q = 0; q < p.length; q++)
          m(p[q]);
      return m
  }({
      1: [function(g, u, p) {
          function d(f, q, h) {
              if (!(this instanceof d))
                  return new d(f,q,h);
              Array.isArray(f) ? (this.x = f[0],
              this.y = f[1],
              this.z = f[2] || 0) : "object" == typeof f ? (this.x = f.x,
              this.y = f.y,
              this.z = f.z || 0) : "string" == typeof f && "undefined" == typeof q ? (f = f.split(","),
              this.x = parseFloat(f[0], 10),
              this.y = parseFloat(f[1], 10),
              this.z = parseFloat(f[2], 10) || 0) : (this.x = f,
              this.y = q,
              this.z = h || 0);
              console.warn("proj4.Point will be removed in version 3, use proj4.toPoint")
          }
          var m = g("mgrs");
          d.fromMGRS = function(f) {
              return new d(m.toPoint(f))
          }
          ;
          d.prototype.toMGRS = function(f) {
              return m.forward([this.x, this.y], f)
          }
          ;
          u.exports = d
      }
      , {
          mgrs: 67
      }],
      2: [function(g, u, p) {
          function d(h, t) {
              if (!(this instanceof d))
                  return new d(h);
              t = t || function(w) {
                  if (w)
                      throw w;
              }
              ;
              var l = m(h);
              if ("object" != typeof l)
                  return void t(h);
              l = q(l);
              var v = d.projections.get(l.projName);
              v ? (f(this, l),
              f(this, v),
              this.init(),
              t(null, this)) : t(h)
          }
          var m = g("./parseCode")
            , f = g("./extend");
          p = g("./projections");
          var q = g("./deriveConstants");
          d.projections = p;
          d.projections.start();
          u.exports = d
      }
      , {
          "./deriveConstants": 33,
          "./extend": 34,
          "./parseCode": 37,
          "./projections": 39
      }],
      3: [function(g, u, p) {
          u.exports = function(d, m, f) {
              var q, h, t, l = f.x, v = f.y, w = f.z || 0;
              for (t = 0; 3 > t; t++)
                  if (!m || 2 !== t || void 0 !== f.z)
                      switch (0 === t ? (q = l,
                      h = "x") : 1 === t ? (q = v,
                      h = "y") : (q = w,
                      h = "z"),
                      d.axis[t]) {
                      case "e":
                          f[h] = q;
                          break;
                      case "w":
                          f[h] = -q;
                          break;
                      case "n":
                          f[h] = q;
                          break;
                      case "s":
                          f[h] = -q;
                          break;
                      case "u":
                          void 0 !== f[h] && (f.z = q);
                          break;
                      case "d":
                          void 0 !== f[h] && (f.z = -q);
                          break;
                      default:
                          return null
                      }
              return f
          }
      }
      , {}],
      4: [function(g, u, p) {
          var d = Math.PI / 2
            , m = g("./sign");
          u.exports = function(f) {
              return Math.abs(f) < d ? f : f - m(f) * Math.PI
          }
      }
      , {
          "./sign": 21
      }],
      5: [function(g, u, p) {
          var d = 2 * Math.PI
            , m = g("./sign");
          u.exports = function(f) {
              return 3.14159265359 >= Math.abs(f) ? f : f - m(f) * d
          }
      }
      , {
          "./sign": 21
      }],
      6: [function(g, u, p) {
          u.exports = function(d) {
              return 1 < Math.abs(d) && (d = 1 < d ? 1 : -1),
              Math.asin(d)
          }
      }
      , {}],
      7: [function(g, u, p) {
          u.exports = function(d) {
              return 1 - .25 * d * (1 + d / 16 * (3 + 1.25 * d))
          }
      }
      , {}],
      8: [function(g, u, p) {
          u.exports = function(d) {
              return .375 * d * (1 + .25 * d * (1 + .46875 * d))
          }
      }
      , {}],
      9: [function(g, u, p) {
          u.exports = function(d) {
              return .05859375 * d * d * (1 + .75 * d)
          }
      }
      , {}],
      10: [function(g, u, p) {
          u.exports = function(d) {
              return 35 / 3072 * d * d * d
          }
      }
      , {}],
      11: [function(g, u, p) {
          u.exports = function(d, m, f) {
              m *= f;
              return d / Math.sqrt(1 - m * m)
          }
      }
      , {}],
      12: [function(g, u, p) {
          u.exports = function(d, m, f, q, h) {
              var t;
              var l = d / m;
              for (var v = 0; 15 > v; v++)
                  if (t = (d - (m * l - f * Math.sin(2 * l) + q * Math.sin(4 * l) - h * Math.sin(6 * l))) / (m - 2 * f * Math.cos(2 * l) + 4 * q * Math.cos(4 * l) - 6 * h * Math.cos(6 * l)),
                  l += t,
                  1E-10 >= Math.abs(t))
                      return l;
              return 0 / 0
          }
      }
      , {}],
      13: [function(g, u, p) {
          var d = Math.PI / 2;
          u.exports = function(m, f) {
              if (1E-6 > Math.abs(Math.abs(f) - (1 - (1 - m * m) / (2 * m) * Math.log((1 - m) / (1 + m)))))
                  return 0 > f ? -1 * d : d;
              for (var q, h, t, l, v = Math.asin(.5 * f), w = 0; 30 > w; w++)
                  if (h = Math.sin(v),
                  t = Math.cos(v),
                  l = m * h,
                  q = Math.pow(1 - l * l, 2) / (2 * t) * (f / (1 - m * m) - h / (1 - l * l) + .5 / m * Math.log((1 - l) / (1 + l))),
                  v += q,
                  1E-10 >= Math.abs(q))
                      return v;
              return 0 / 0
          }
      }
      , {}],
      14: [function(g, u, p) {
          u.exports = function(d, m, f, q, h) {
              return d * h - m * Math.sin(2 * h) + f * Math.sin(4 * h) - q * Math.sin(6 * h)
          }
      }
      , {}],
      15: [function(g, u, p) {
          u.exports = function(d, m, f) {
              d *= m;
              return f / Math.sqrt(1 - d * d)
          }
      }
      , {}],
      16: [function(g, u, p) {
          var d = Math.PI / 2;
          u.exports = function(m, f) {
              for (var q, h, t = .5 * m, l = d - 2 * Math.atan(f), v = 0; 15 >= v; v++)
                  if (q = m * Math.sin(l),
                  h = d - 2 * Math.atan(f * Math.pow((1 - q) / (1 + q), t)) - l,
                  l += h,
                  1E-10 >= Math.abs(h))
                      return l;
              return -9999
          }
      }
      , {}],
      17: [function(g, u, p) {
          u.exports = function(d) {
              var m = [];
              m[0] = 1 - d * (.25 + d * (.046875 + d * (.01953125 + .01068115234375 * d)));
              m[1] = d * (.75 - d * (.046875 + d * (.01953125 + .01068115234375 * d)));
              var f = d * d;
              return m[2] = f * (.46875 - d * (.013020833333333334 + .007120768229166667 * d)),
              f *= d,
              m[3] = f * (.3645833333333333 - .005696614583333333 * d),
              m[4] = f * d * .3076171875,
              m
          }
      }
      , {}],
      18: [function(g, u, p) {
          var d = g("./pj_mlfn");
          u.exports = function(m, f, q) {
              for (var h = 1 / (1 - f), t = m, l = 20; l; --l) {
                  var v = Math.sin(t)
                    , w = 1 - f * v * v;
                  if (w = (d(t, v, Math.cos(t), q) - m) * w * Math.sqrt(w) * h,
                  t -= w,
                  1E-10 > Math.abs(w))
                      break
              }
              return t
          }
      }
      , {
          "./pj_mlfn": 19
      }],
      19: [function(g, u, p) {
          u.exports = function(d, m, f, q) {
              return f *= m,
              m *= m,
              q[0] * d - f * (q[1] + m * (q[2] + m * (q[3] + m * q[4])))
          }
      }
      , {}],
      20: [function(g, u, p) {
          u.exports = function(d, m) {
              var f;
              return 1E-7 < d ? (f = d * m,
              (1 - d * d) * (m / (1 - f * f) - .5 / d * Math.log((1 - f) / (1 + f)))) : 2 * m
          }
      }
      , {}],
      21: [function(g, u, p) {
          u.exports = function(d) {
              return 0 > d ? -1 : 1
          }
      }
      , {}],
      22: [function(g, u, p) {
          u.exports = function(d, m) {
              return Math.pow((1 - d) / (1 + d), m)
          }
      }
      , {}],
      23: [function(g, u, p) {
          u.exports = function(d) {
              var m = {
                  x: d[0],
                  y: d[1]
              };
              return 2 < d.length && (m.z = d[2]),
              3 < d.length && (m.m = d[3]),
              m
          }
      }
      , {}],
      24: [function(g, u, p) {
          var d = Math.PI / 2;
          u.exports = function(m, f, q) {
              q *= m;
              return q = Math.pow((1 - q) / (1 + q), .5 * m),
              Math.tan(.5 * (d - f)) / q
          }
      }
      , {}],
      25: [function(g, u, p) {
          p.wgs84 = {
              towgs84: "0,0,0",
              ellipse: "WGS84",
              datumName: "WGS84"
          };
          p.ch1903 = {
              towgs84: "674.374,15.056,405.346",
              ellipse: "bessel",
              datumName: "swiss"
          };
          p.ggrs87 = {
              towgs84: "-199.87,74.79,246.62",
              ellipse: "GRS80",
              datumName: "Greek_Geodetic_Reference_System_1987"
          };
          p.nad83 = {
              towgs84: "0,0,0",
              ellipse: "GRS80",
              datumName: "North_American_Datum_1983"
          };
          p.nad27 = {
              nadgrids: "@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",
              ellipse: "clrk66",
              datumName: "North_American_Datum_1927"
          };
          p.potsdam = {
              towgs84: "606.0,23.0,413.0",
              ellipse: "bessel",
              datumName: "Potsdam Rauenberg 1950 DHDN"
          };
          p.carthage = {
              towgs84: "-263.0,6.0,431.0",
              ellipse: "clark80",
              datumName: "Carthage 1934 Tunisia"
          };
          p.hermannskogel = {
              towgs84: "653.0,-212.0,449.0",
              ellipse: "bessel",
              datumName: "Hermannskogel"
          };
          p.ire65 = {
              towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
              ellipse: "mod_airy",
              datumName: "Ireland 1965"
          };
          p.rassadiran = {
              towgs84: "-133.63,-157.5,-158.62",
              ellipse: "intl",
              datumName: "Rassadiran"
          };
          p.nzgd49 = {
              towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",
              ellipse: "intl",
              datumName: "New Zealand Geodetic Datum 1949"
          };
          p.osgb36 = {
              towgs84: "446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",
              ellipse: "airy",
              datumName: "Airy 1830"
          };
          p.s_jtsk = {
              towgs84: "589,76,480",
              ellipse: "bessel",
              datumName: "S-JTSK (Ferro)"
          };
          p.beduaram = {
              towgs84: "-106,-87,188",
              ellipse: "clrk80",
              datumName: "Beduaram"
          };
          p.gunung_segara = {
              towgs84: "-403,684,41",
              ellipse: "bessel",
              datumName: "Gunung Segara Jakarta"
          };
          p.rnb72 = {
              towgs84: "106.869,-52.2978,103.724,-0.33657,0.456955,-1.84218,1",
              ellipse: "intl",
              datumName: "Reseau National Belge 1972"
          }
      }
      , {}],
      26: [function(g, u, p) {
          p.MERIT = {
              a: 6378137,
              rf: 298.257,
              ellipseName: "MERIT 1983"
          };
          p.SGS85 = {
              a: 6378136,
              rf: 298.257,
              ellipseName: "Soviet Geodetic System 85"
          };
          p.GRS80 = {
              a: 6378137,
              rf: 298.257222101,
              ellipseName: "GRS 1980(IUGG, 1980)"
          };
          p.IAU76 = {
              a: 6378140,
              rf: 298.257,
              ellipseName: "IAU 1976"
          };
          p.airy = {
              a: 6377563.396,
              b: 6356256.91,
              ellipseName: "Airy 1830"
          };
          p.APL4 = {
              a: 6378137,
              rf: 298.25,
              ellipseName: "Appl. Physics. 1965"
          };
          p.NWL9D = {
              a: 6378145,
              rf: 298.25,
              ellipseName: "Naval Weapons Lab., 1965"
          };
          p.mod_airy = {
              a: 6377340.189,
              b: 6356034.446,
              ellipseName: "Modified Airy"
          };
          p.andrae = {
              a: 6377104.43,
              rf: 300,
              ellipseName: "Andrae 1876 (Den., Iclnd.)"
          };
          p.aust_SA = {
              a: 6378160,
              rf: 298.25,
              ellipseName: "Australian Natl & S. Amer. 1969"
          };
          p.GRS67 = {
              a: 6378160,
              rf: 298.247167427,
              ellipseName: "GRS 67(IUGG 1967)"
          };
          p.bessel = {
              a: 6377397.155,
              rf: 299.1528128,
              ellipseName: "Bessel 1841"
          };
          p.bess_nam = {
              a: 6377483.865,
              rf: 299.1528128,
              ellipseName: "Bessel 1841 (Namibia)"
          };
          p.clrk66 = {
              a: 6378206.4,
              b: 6356583.8,
              ellipseName: "Clarke 1866"
          };
          p.clrk80 = {
              a: 6378249.145,
              rf: 293.4663,
              ellipseName: "Clarke 1880 mod."
          };
          p.clrk58 = {
              a: 6378293.645208759,
              rf: 294.2606763692654,
              ellipseName: "Clarke 1858"
          };
          p.CPM = {
              a: 6375738.7,
              rf: 334.29,
              ellipseName: "Comm. des Poids et Mesures 1799"
          };
          p.delmbr = {
              a: 6376428,
              rf: 311.5,
              ellipseName: "Delambre 1810 (Belgium)"
          };
          p.engelis = {
              a: 6378136.05,
              rf: 298.2566,
              ellipseName: "Engelis 1985"
          };
          p.evrst30 = {
              a: 6377276.345,
              rf: 300.8017,
              ellipseName: "Everest 1830"
          };
          p.evrst48 = {
              a: 6377304.063,
              rf: 300.8017,
              ellipseName: "Everest 1948"
          };
          p.evrst56 = {
              a: 6377301.243,
              rf: 300.8017,
              ellipseName: "Everest 1956"
          };
          p.evrst69 = {
              a: 6377295.664,
              rf: 300.8017,
              ellipseName: "Everest 1969"
          };
          p.evrstSS = {
              a: 6377298.556,
              rf: 300.8017,
              ellipseName: "Everest (Sabah & Sarawak)"
          };
          p.fschr60 = {
              a: 6378166,
              rf: 298.3,
              ellipseName: "Fischer (Mercury Datum) 1960"
          };
          p.fschr60m = {
              a: 6378155,
              rf: 298.3,
              ellipseName: "Fischer 1960"
          };
          p.fschr68 = {
              a: 6378150,
              rf: 298.3,
              ellipseName: "Fischer 1968"
          };
          p.helmert = {
              a: 6378200,
              rf: 298.3,
              ellipseName: "Helmert 1906"
          };
          p.hough = {
              a: 6378270,
              rf: 297,
              ellipseName: "Hough"
          };
          p.intl = {
              a: 6378388,
              rf: 297,
              ellipseName: "International 1909 (Hayford)"
          };
          p.kaula = {
              a: 6378163,
              rf: 298.24,
              ellipseName: "Kaula 1961"
          };
          p.lerch = {
              a: 6378139,
              rf: 298.257,
              ellipseName: "Lerch 1979"
          };
          p.mprts = {
              a: 6397300,
              rf: 191,
              ellipseName: "Maupertius 1738"
          };
          p.new_intl = {
              a: 6378157.5,
              b: 6356772.2,
              ellipseName: "New International 1967"
          };
          p.plessis = {
              a: 6376523,
              rf: 6355863,
              ellipseName: "Plessis 1817 (France)"
          };
          p.krass = {
              a: 6378245,
              rf: 298.3,
              ellipseName: "Krassovsky, 1942"
          };
          p.SEasia = {
              a: 6378155,
              b: 6356773.3205,
              ellipseName: "Southeast Asia"
          };
          p.walbeck = {
              a: 6376896,
              b: 6355834.8467,
              ellipseName: "Walbeck"
          };
          p.WGS60 = {
              a: 6378165,
              rf: 298.3,
              ellipseName: "WGS 60"
          };
          p.WGS66 = {
              a: 6378145,
              rf: 298.25,
              ellipseName: "WGS 66"
          };
          p.WGS7 = {
              a: 6378135,
              rf: 298.26,
              ellipseName: "WGS 72"
          };
          p.WGS84 = {
              a: 6378137,
              rf: 298.257223563,
              ellipseName: "WGS 84"
          };
          p.sphere = {
              a: 6370997,
              b: 6370997,
              ellipseName: "Normal Sphere (r=6370997)"
          }
      }
      , {}],
      27: [function(g, u, p) {
          p.greenwich = 0;
          p.lisbon = -9.131906111111;
          p.paris = 2.337229166667;
          p.bogota = -74.080916666667;
          p.madrid = -3.687938888889;
          p.rome = 12.452333333333;
          p.bern = 7.439583333333;
          p.jakarta = 106.807719444444;
          p.ferro = -17.666666666667;
          p.brussels = 4.367975;
          p.stockholm = 18.058277777778;
          p.athens = 23.7163375;
          p.oslo = 10.722916666667
      }
      , {}],
      28: [function(g, u, p) {
          p.ft = {
              to_meter: .3048
          };
          p["us-ft"] = {
              to_meter: 1200 / 3937
          }
      }
      , {}],
      29: [function(g, u, p) {
          function d(t, l, v) {
              var w;
              return Array.isArray(v) ? (w = q(t, l, v),
              3 === v.length ? [w.x, w.y, w.z] : [w.x, w.y]) : q(t, l, v)
          }
          function m(t) {
              return t instanceof f ? t : t.oProj ? t.oProj : f(t)
          }
          var f = g("./Proj")
            , q = g("./transform")
            , h = f("WGS84");
          u.exports = function(t, l, v) {
              t = m(t);
              var w, y = !1;
              return "undefined" == typeof l ? (l = t,
              t = h,
              y = !0) : ("undefined" != typeof l.x || Array.isArray(l)) && (v = l,
              l = t,
              t = h,
              y = !0),
              l = m(l),
              v ? d(t, l, v) : (w = {
                  forward: function(A) {
                      return d(t, l, A)
                  },
                  inverse: function(A) {
                      return d(l, t, A)
                  }
              },
              y && (w.oProj = l),
              w)
          }
      }
      , {
          "./Proj": 2,
          "./transform": 65
      }],
      30: [function(g, u, p) {
          var d = Math.PI / 2
            , m = function(f) {
              if (!(this instanceof m))
                  return new m(f);
              if (this.datum_type = 4,
              f) {
                  if (f.datumCode && "none" === f.datumCode && (this.datum_type = 5),
                  f.datum_params) {
                      for (var q = 0; q < f.datum_params.length; q++)
                          f.datum_params[q] = parseFloat(f.datum_params[q]);
                      0 === f.datum_params[0] && 0 === f.datum_params[1] && 0 === f.datum_params[2] || (this.datum_type = 1);
                      3 < f.datum_params.length && (0 !== f.datum_params[3] || 0 !== f.datum_params[4] || 0 !== f.datum_params[5] || 0 !== f.datum_params[6]) && (this.datum_type = 2,
                      f.datum_params[3] *= 4.84813681109536E-6,
                      f.datum_params[4] *= 4.84813681109536E-6,
                      f.datum_params[5] *= 4.84813681109536E-6,
                      f.datum_params[6] = f.datum_params[6] / 1E6 + 1)
                  }
                  this.datum_type = f.grids ? 3 : this.datum_type;
                  this.a = f.a;
                  this.b = f.b;
                  this.es = f.es;
                  this.ep2 = f.ep2;
                  this.datum_params = f.datum_params;
                  3 === this.datum_type && (this.grids = f.grids)
              }
          };
          m.prototype = {
              compare_datums: function(f) {
                  return this.datum_type !== f.datum_type ? !1 : this.a !== f.a || 5E-11 < Math.abs(this.es - f.es) ? !1 : 1 === this.datum_type ? this.datum_params[0] === f.datum_params[0] && this.datum_params[1] === f.datum_params[1] && this.datum_params[2] === f.datum_params[2] : 2 === this.datum_type ? this.datum_params[0] === f.datum_params[0] && this.datum_params[1] === f.datum_params[1] && this.datum_params[2] === f.datum_params[2] && this.datum_params[3] === f.datum_params[3] && this.datum_params[4] === f.datum_params[4] && this.datum_params[5] === f.datum_params[5] && this.datum_params[6] === f.datum_params[6] : 3 === this.datum_type || 3 === f.datum_type ? this.nadgrids === f.nadgrids : !0
              },
              geodetic_to_geocentric: function(f) {
                  var q, h, t, l, v, w, y, A = f.x, C = f.y, B = f.z ? f.z : 0;
                  if (-d > C && C > -1.001 * d)
                      C = -d;
                  else if (C > d && 1.001 * d > C)
                      C = d;
                  else if (-d > C || C > d)
                      return null;
                  return A > Math.PI && (A -= 2 * Math.PI),
                  v = Math.sin(C),
                  y = Math.cos(C),
                  w = v * v,
                  l = this.a / Math.sqrt(1 - this.es * w),
                  q = (l + B) * y * Math.cos(A),
                  h = (l + B) * y * Math.sin(A),
                  t = (l * (1 - this.es) + B) * v,
                  f.x = q,
                  f.y = h,
                  f.z = t,
                  0
              },
              geocentric_to_geodetic: function(f) {
                  var q, h, t;
                  var l = f.x;
                  var v = f.y;
                  var w = f.z ? f.z : 0;
                  if (q = Math.sqrt(l * l + v * v),
                  h = Math.sqrt(l * l + v * v + w * w),
                  1E-12 > q / this.a) {
                      if (v = 0,
                      1E-12 > h / this.a)
                          return
                  } else
                      v = Math.atan2(v, l);
                  l = w / h;
                  h = q / h;
                  var y = 1 / Math.sqrt(1 - this.es * (2 - this.es) * h * h);
                  var A = h * (1 - this.es) * y;
                  var C = l * y;
                  var B = 0;
                  do {
                      B++;
                      var z = this.a / Math.sqrt(1 - this.es * C * C);
                      var F = q * A + w * C - z * (1 - this.es * C * C);
                      z = this.es * z / (z + F);
                      y = 1 / Math.sqrt(1 - z * (2 - z) * h * h);
                      z = h * (1 - z) * y;
                      y *= l;
                      var I = y * A - z * C;
                      A = z;
                      C = y
                  } while (1E-24 < I * I && 30 > B);
                  return t = Math.atan(y / Math.abs(z)),
                  f.x = v,
                  f.y = t,
                  f.z = F,
                  f
              },
              geocentric_to_geodetic_noniter: function(f) {
                  var q, h, t, l, v, w, y, A, C, B, z, F, I, H, J, O = f.x, P = f.y, N = f.z ? f.z : 0;
                  if (O = parseFloat(O),
                  P = parseFloat(P),
                  N = parseFloat(N),
                  J = !1,
                  0 !== O)
                      var T = Math.atan2(P, O);
                  else if (0 < P)
                      T = d;
                  else if (0 > P)
                      T = -d;
                  else if (J = !0,
                  T = 0,
                  0 < N)
                      var U = d;
                  else {
                      if (!(0 > N))
                          return;
                      U = -d
                  }
                  return t = O * O + P * P,
                  h = Math.sqrt(t),
                  l = 1.0026 * N,
                  w = Math.sqrt(l * l + t),
                  A = l / w,
                  B = h / w,
                  C = A * A * A,
                  v = N + this.b * this.ep2 * C,
                  H = h - this.a * this.es * B * B * B,
                  y = Math.sqrt(v * v + H * H),
                  z = v / y,
                  F = H / y,
                  I = this.a / Math.sqrt(1 - this.es * z * z),
                  q = .3826834323650898 <= F ? h / F - I : -.3826834323650898 >= F ? h / -F - I : N / z + I * (this.es - 1),
                  !1 === J && (U = Math.atan(z / F)),
                  f.x = T,
                  f.y = U,
                  f.z = q,
                  f
              },
              geocentric_to_wgs84: function(f) {
                  if (1 === this.datum_type)
                      f.x += this.datum_params[0],
                      f.y += this.datum_params[1],
                      f.z += this.datum_params[2];
                  else if (2 === this.datum_type) {
                      var q = this.datum_params[3]
                        , h = this.datum_params[4]
                        , t = this.datum_params[5]
                        , l = this.datum_params[6]
                        , v = l * (t * f.x + f.y - q * f.z) + this.datum_params[1];
                      q = l * (-h * f.x + q * f.y + f.z) + this.datum_params[2];
                      f.x = l * (f.x - t * f.y + h * f.z) + this.datum_params[0];
                      f.y = v;
                      f.z = q
                  }
              },
              geocentric_from_wgs84: function(f) {
                  if (1 === this.datum_type)
                      f.x -= this.datum_params[0],
                      f.y -= this.datum_params[1],
                      f.z -= this.datum_params[2];
                  else if (2 === this.datum_type) {
                      var q = this.datum_params[3]
                        , h = this.datum_params[4]
                        , t = this.datum_params[5]
                        , l = this.datum_params[6]
                        , v = (f.x - this.datum_params[0]) / l
                        , w = (f.y - this.datum_params[1]) / l;
                      l = (f.z - this.datum_params[2]) / l;
                      f.x = v + t * w - h * l;
                      f.y = -t * v + w + q * l;
                      f.z = h * v - q * w + l
                  }
              }
          };
          u.exports = m
      }
      , {}],
      31: [function(g, u, p) {
          u.exports = function(d, m, f) {
              function q(C) {
                  return 1 === C || 2 === C
              }
              var h;
              if (d.compare_datums(m) || 5 === d.datum_type || 5 === m.datum_type)
                  return f;
              var t = d.a
                , l = d.es
                , v = m.a
                , w = m.es;
              var y = d.datum_type;
              if (3 === y)
                  if (0 === this.apply_gridshift(d, 0, f))
                      d.a = 6378137,
                      d.es = .006694379990141316;
                  else {
                      if (!d.datum_params)
                          return d.a = t,
                          d.es = d.es,
                          f;
                      y = 1;
                      var A = 0;
                      for (h = d.datum_params.length; h > A; A++)
                          y *= d.datum_params[A];
                      if (0 === y)
                          return d.a = t,
                          d.es = d.es,
                          f;
                      y = 3 < d.datum_params.length ? 2 : 1
                  }
              return 3 === m.datum_type && (m.a = 6378137,
              m.es = .006694379990141316),
              (d.es !== m.es || d.a !== m.a || q(y) || q(m.datum_type)) && (d.geodetic_to_geocentric(f),
              q(d.datum_type) && d.geocentric_to_wgs84(f),
              q(m.datum_type) && m.geocentric_from_wgs84(f),
              m.geocentric_to_geodetic(f)),
              3 === m.datum_type && this.apply_gridshift(m, 1, f),
              d.a = t,
              d.es = l,
              m.a = v,
              m.es = w,
              f
          }
      }
      , {}],
      32: [function(g, u, p) {
          function d(q) {
              var h = this;
              if (2 === arguments.length) {
                  var t = arguments[1];
                  d[q] = "string" == typeof t ? "+" === t.charAt(0) ? m(arguments[1]) : f(arguments[1]) : t
              } else if (1 === arguments.length) {
                  if (Array.isArray(q))
                      return q.map(function(l) {
                          Array.isArray(l) ? d.apply(h, l) : d(l)
                      });
                  if ("string" == typeof q) {
                      if (q in d)
                          return d[q]
                  } else
                      "EPSG"in q ? d["EPSG:" + q.EPSG] = q : "ESRI"in q ? d["ESRI:" + q.ESRI] = q : "IAU2000"in q ? d["IAU2000:" + q.IAU2000] = q : console.log(q)
              }
          }
          p = g("./global");
          var m = g("./projString")
            , f = g("./wkt");
          p(d);
          u.exports = d
      }
      , {
          "./global": 35,
          "./projString": 38,
          "./wkt": 66
      }],
      33: [function(g, u, p) {
          var d = g("./constants/Datum")
            , m = g("./constants/Ellipsoid")
            , f = g("./extend")
            , q = g("./datum");
          u.exports = function(h) {
              if (h.datumCode && "none" !== h.datumCode) {
                  var t = d[h.datumCode];
                  t && (h.datum_params = t.towgs84 ? t.towgs84.split(",") : null,
                  h.ellps = t.ellipse,
                  h.datumName = t.datumName ? t.datumName : h.datumCode)
              }
              h.a || f(h, m[h.ellps] ? m[h.ellps] : m.WGS84);
              return h.rf && !h.b && (h.b = (1 - 1 / h.rf) * h.a),
              (0 === h.rf || 1E-10 > Math.abs(h.a - h.b)) && (h.sphere = !0,
              h.b = h.a),
              h.a2 = h.a * h.a,
              h.b2 = h.b * h.b,
              h.es = (h.a2 - h.b2) / h.a2,
              h.e = Math.sqrt(h.es),
              h.R_A && (h.a *= 1 - h.es * (.16666666666666666 + h.es * (.04722222222222222 + .022156084656084655 * h.es)),
              h.a2 = h.a * h.a,
              h.b2 = h.b * h.b,
              h.es = 0),
              h.ep2 = (h.a2 - h.b2) / h.b2,
              h.k0 || (h.k0 = 1),
              h.axis || (h.axis = "enu"),
              h.datum || (h.datum = q(h)),
              h
          }
      }
      , {
          "./constants/Datum": 25,
          "./constants/Ellipsoid": 26,
          "./datum": 30,
          "./extend": 34
      }],
      34: [function(g, u, p) {
          u.exports = function(d, m) {
              d = d || {};
              var f;
              if (!m)
                  return d;
              for (f in m) {
                  var q = m[f];
                  void 0 !== q && (d[f] = q)
              }
              return d
          }
      }
      , {}],
      35: [function(g, u, p) {
          u.exports = function(d) {
              d("EPSG:4326", "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees");
              d("EPSG:4269", "+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees");
              d("EPSG:3857", "+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs");
              d.WGS84 = d["EPSG:4326"];
              d["EPSG:3785"] = d["EPSG:3857"];
              d.GOOGLE = d["EPSG:3857"];
              d["EPSG:900913"] = d["EPSG:3857"];
              d["EPSG:102113"] = d["EPSG:3857"]
          }
      }
      , {}],
      36: [function(g, u, p) {
          p = g("./core");
          p.defaultDatum = "WGS84";
          p.Proj = g("./Proj");
          p.WGS84 = new p.Proj("WGS84");
          p.Point = g("./Point");
          p.toPoint = g("./common/toPoint");
          p.defs = g("./defs");
          p.transform = g("./transform");
          p.mgrs = g("mgrs");
          p.version = g("../package.json").version;
          g("./includedProjections")(p);
          u.exports = p
      }
      , {
          "../package.json": 68,
          "./Point": 1,
          "./Proj": 2,
          "./common/toPoint": 23,
          "./core": 29,
          "./defs": 32,
          "./includedProjections": "hTEDpn",
          "./transform": 65,
          mgrs: 67
      }],
      37: [function(g, u, p) {
          function d(h) {
              return ["GEOGCS", "GEOCCS", "PROJCS", "LOCAL_CS"].reduce(function(t, l) {
                  return t + 1 + h.indexOf(l)
              }, 0)
          }
          var m = g("./defs")
            , f = g("./wkt")
            , q = g("./projString");
          u.exports = function(h) {
              return "string" == typeof h ? h in m ? m[h] : d(h) ? f(h) : "+" === h[0] ? q(h) : void 0 : h
          }
      }
      , {
          "./defs": 32,
          "./projString": 38,
          "./wkt": 66
      }],
      38: [function(g, u, p) {
          var d = g("./constants/PrimeMeridian")
            , m = g("./constants/units");
          u.exports = function(f) {
              var q = {}
                , h = {};
              f.split("+").map(function(w) {
                  return w.trim()
              }).filter(function(w) {
                  return w
              }).forEach(function(w) {
                  w = w.split("=");
                  w.push(!0);
                  h[w[0].toLowerCase()] = w[1]
              });
              var t, l, v = {
                  proj: "projName",
                  datum: "datumCode",
                  rf: function(w) {
                      q.rf = parseFloat(w)
                  },
                  lat_0: function(w) {
                      q.lat0 = .017453292519943295 * w
                  },
                  lat_1: function(w) {
                      q.lat1 = .017453292519943295 * w
                  },
                  lat_2: function(w) {
                      q.lat2 = .017453292519943295 * w
                  },
                  lat_ts: function(w) {
                      q.lat_ts = .017453292519943295 * w
                  },
                  lon_0: function(w) {
                      q.long0 = .017453292519943295 * w
                  },
                  lon_1: function(w) {
                      q.long1 = .017453292519943295 * w
                  },
                  lon_2: function(w) {
                      q.long2 = .017453292519943295 * w
                  },
                  alpha: function(w) {
                      q.alpha = .017453292519943295 * parseFloat(w)
                  },
                  lonc: function(w) {
                      q.longc = .017453292519943295 * w
                  },
                  x_0: function(w) {
                      q.x0 = parseFloat(w)
                  },
                  y_0: function(w) {
                      q.y0 = parseFloat(w)
                  },
                  k_0: function(w) {
                      q.k0 = parseFloat(w)
                  },
                  k: function(w) {
                      q.k0 = parseFloat(w)
                  },
                  a: function(w) {
                      q.a = parseFloat(w)
                  },
                  b: function(w) {
                      q.b = parseFloat(w)
                  },
                  r_a: function() {
                      q.R_A = !0
                  },
                  zone: function(w) {
                      q.zone = parseInt(w, 10)
                  },
                  south: function() {
                      q.utmSouth = !0
                  },
                  towgs84: function(w) {
                      q.datum_params = w.split(",").map(function(y) {
                          return parseFloat(y)
                      })
                  },
                  to_meter: function(w) {
                      q.to_meter = parseFloat(w)
                  },
                  units: function(w) {
                      q.units = w;
                      m[w] && (q.to_meter = m[w].to_meter)
                  },
                  from_greenwich: function(w) {
                      q.from_greenwich = .017453292519943295 * w
                  },
                  pm: function(w) {
                      q.from_greenwich = .017453292519943295 * (d[w] ? d[w] : parseFloat(w))
                  },
                  nadgrids: function(w) {
                      "@null" === w ? q.datumCode = "none" : q.nadgrids = w
                  },
                  axis: function(w) {
                      3 === w.length && -1 !== "ewnsud".indexOf(w.substr(0, 1)) && -1 !== "ewnsud".indexOf(w.substr(1, 1)) && -1 !== "ewnsud".indexOf(w.substr(2, 1)) && (q.axis = w)
                  }
              };
              for (t in h)
                  f = h[t],
                  t in v ? (l = v[t],
                  "function" == typeof l ? l(f) : q[l] = f) : q[t] = f;
              return "string" == typeof q.datumCode && "WGS84" !== q.datumCode && (q.datumCode = q.datumCode.toLowerCase()),
              q
          }
      }
      , {
          "./constants/PrimeMeridian": 27,
          "./constants/units": 28
      }],
      39: [function(g, u, p) {
          function d(h, t) {
              var l = q.length;
              return h.names ? (q[l] = h,
              h.names.forEach(function(v) {
                  f[v.toLowerCase()] = l
              }),
              this) : (console.log(t),
              !0)
          }
          var m = [g("./projections/merc"), g("./projections/longlat")]
            , f = {}
            , q = [];
          p.add = d;
          p.get = function(h) {
              if (!h)
                  return !1;
              h = h.toLowerCase();
              return "undefined" != typeof f[h] && q[f[h]] ? q[f[h]] : void 0
          }
          ;
          p.start = function() {
              m.forEach(d)
          }
      }
      , {
          "./projections/longlat": 51,
          "./projections/merc": 52
      }],
      40: [function(g, u, p) {
          var d = g("../common/msfnz")
            , m = g("../common/qsfnz")
            , f = g("../common/adjust_lon")
            , q = g("../common/asinz");
          p.init = function() {
              1E-10 > Math.abs(this.lat1 + this.lat2) || (this.temp = this.b / this.a,
              this.es = 1 - Math.pow(this.temp, 2),
              this.e3 = Math.sqrt(this.es),
              this.sin_po = Math.sin(this.lat1),
              this.cos_po = Math.cos(this.lat1),
              this.t1 = this.sin_po,
              this.con = this.sin_po,
              this.ms1 = d(this.e3, this.sin_po, this.cos_po),
              this.qs1 = m(this.e3, this.sin_po, this.cos_po),
              this.sin_po = Math.sin(this.lat2),
              this.cos_po = Math.cos(this.lat2),
              this.t2 = this.sin_po,
              this.ms2 = d(this.e3, this.sin_po, this.cos_po),
              this.qs2 = m(this.e3, this.sin_po, this.cos_po),
              this.sin_po = Math.sin(this.lat0),
              this.cos_po = Math.cos(this.lat0),
              this.t3 = this.sin_po,
              this.qs0 = m(this.e3, this.sin_po, this.cos_po),
              this.ns0 = 1E-10 < Math.abs(this.lat1 - this.lat2) ? (this.ms1 * this.ms1 - this.ms2 * this.ms2) / (this.qs2 - this.qs1) : this.con,
              this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1,
              this.rh = this.a * Math.sqrt(this.c - this.ns0 * this.qs0) / this.ns0)
          }
          ;
          p.forward = function(h) {
              var t = h.x
                , l = h.y;
              this.sin_phi = Math.sin(l);
              this.cos_phi = Math.cos(l);
              l = m(this.e3, this.sin_phi, this.cos_phi);
              l = this.a * Math.sqrt(this.c - this.ns0 * l) / this.ns0;
              t = this.ns0 * f(t - this.long0);
              var v = this.rh - l * Math.cos(t) + this.y0;
              return h.x = l * Math.sin(t) + this.x0,
              h.y = v,
              h
          }
          ;
          p.inverse = function(h) {
              var t, l, v, w, y, A;
              return h.x -= this.x0,
              h.y = this.rh - h.y + this.y0,
              0 <= this.ns0 ? (t = Math.sqrt(h.x * h.x + h.y * h.y),
              v = 1) : (t = -Math.sqrt(h.x * h.x + h.y * h.y),
              v = -1),
              w = 0,
              0 !== t && (w = Math.atan2(v * h.x, v * h.y)),
              v = t * this.ns0 / this.a,
              this.sphere ? A = Math.asin((this.c - v * v) / (2 * this.ns0)) : (l = (this.c - v * v) / this.ns0,
              A = this.phi1z(this.e3, l)),
              y = f(w / this.ns0 + this.long0),
              h.x = y,
              h.y = A,
              h
          }
          ;
          p.phi1z = function(h, t) {
              var l, v, w, y, A, C = q(.5 * t);
              if (1E-10 > h)
                  return C;
              for (var B = h * h, z = 1; 25 >= z; z++)
                  if (l = Math.sin(C),
                  v = Math.cos(C),
                  w = h * l,
                  y = 1 - w * w,
                  A = .5 * y * y / v * (t / (1 - B) - l / y + .5 / h * Math.log((1 - w) / (1 + w))),
                  C += A,
                  1E-7 >= Math.abs(A))
                      return C;
              return null
          }
          ;
          p.names = ["Albers_Conic_Equal_Area", "Albers", "aea"]
      }
      , {
          "../common/adjust_lon": 5,
          "../common/asinz": 6,
          "../common/msfnz": 15,
          "../common/qsfnz": 20
      }],
      41: [function(g, u, p) {
          var d = g("../common/adjust_lon")
            , m = Math.PI / 2
            , f = g("../common/mlfn")
            , q = g("../common/e0fn")
            , h = g("../common/e1fn")
            , t = g("../common/e2fn")
            , l = g("../common/e3fn")
            , v = g("../common/gN")
            , w = g("../common/asinz")
            , y = g("../common/imlfn");
          p.init = function() {
              this.sin_p12 = Math.sin(this.lat0);
              this.cos_p12 = Math.cos(this.lat0)
          }
          ;
          p.forward = function(A) {
              var C, B, z, F, I, H, J, O, P, N, T, U, W, ka, fa, ma, pa, ia, oa, E, M, R, ca, ba = A.y, qa = Math.sin(A.y), xa = Math.cos(A.y), V = d(A.x - this.long0);
              return this.sphere ? 1E-10 >= Math.abs(this.sin_p12 - 1) ? (A.x = this.x0 + this.a * (m - ba) * Math.sin(V),
              A.y = this.y0 - this.a * (m - ba) * Math.cos(V),
              A) : 1E-10 >= Math.abs(this.sin_p12 + 1) ? (A.x = this.x0 + this.a * (m + ba) * Math.sin(V),
              A.y = this.y0 + this.a * (m + ba) * Math.cos(V),
              A) : (ia = this.sin_p12 * qa + this.cos_p12 * xa * Math.cos(V),
              ma = Math.acos(ia),
              pa = ma / Math.sin(ma),
              A.x = this.x0 + this.a * pa * xa * Math.sin(V),
              A.y = this.y0 + this.a * pa * (this.cos_p12 * qa - this.sin_p12 * xa * Math.cos(V)),
              A) : (C = q(this.es),
              B = h(this.es),
              z = t(this.es),
              F = l(this.es),
              1E-10 >= Math.abs(this.sin_p12 - 1) ? (I = this.a * f(C, B, z, F, m),
              H = this.a * f(C, B, z, F, ba),
              A.x = this.x0 + (I - H) * Math.sin(V),
              A.y = this.y0 - (I - H) * Math.cos(V),
              A) : 1E-10 >= Math.abs(this.sin_p12 + 1) ? (I = this.a * f(C, B, z, F, m),
              H = this.a * f(C, B, z, F, ba),
              A.x = this.x0 + (I + H) * Math.sin(V),
              A.y = this.y0 + (I + H) * Math.cos(V),
              A) : (J = qa / xa,
              O = v(this.a, this.e, this.sin_p12),
              P = v(this.a, this.e, qa),
              N = Math.atan((1 - this.es) * J + this.es * O * this.sin_p12 / (P * xa)),
              T = Math.atan2(Math.sin(V), this.cos_p12 * Math.tan(N) - this.sin_p12 * Math.cos(V)),
              oa = 0 === T ? Math.asin(this.cos_p12 * Math.sin(N) - this.sin_p12 * Math.cos(N)) : 1E-10 >= Math.abs(Math.abs(T) - Math.PI) ? -Math.asin(this.cos_p12 * Math.sin(N) - this.sin_p12 * Math.cos(N)) : Math.asin(Math.sin(V) * Math.cos(N) / Math.sin(T)),
              U = this.e * this.sin_p12 / Math.sqrt(1 - this.es),
              W = this.e * this.cos_p12 * Math.cos(T) / Math.sqrt(1 - this.es),
              ka = U * W,
              fa = W * W,
              E = oa * oa,
              M = E * oa,
              R = M * oa,
              ca = R * oa,
              ma = O * oa * (1 - E * fa * (1 - fa) / 6 + M / 8 * ka * (1 - 2 * fa) + R / 120 * (fa * (4 - 7 * fa) - 3 * U * U * (1 - 7 * fa)) - ca / 48 * ka),
              A.x = this.x0 + ma * Math.sin(T),
              A.y = this.y0 + ma * Math.cos(T),
              A))
          }
          ;
          p.inverse = function(A) {
              A.x -= this.x0;
              A.y -= this.y0;
              var C, B, z, F, I, H, J, O, P, N, T, U, W, ka, fa, ma, pa, ia, oa, E, M, R, ca;
              return this.sphere ? (C = Math.sqrt(A.x * A.x + A.y * A.y),
              C > 2 * m * this.a) ? void 0 : (B = C / this.a,
              z = Math.sin(B),
              F = Math.cos(B),
              I = this.long0,
              1E-10 >= Math.abs(C) ? H = this.lat0 : (H = w(F * this.sin_p12 + A.y * z * this.cos_p12 / C),
              J = Math.abs(this.lat0) - m,
              I = d(1E-10 >= Math.abs(J) ? 0 <= this.lat0 ? this.long0 + Math.atan2(A.x, -A.y) : this.long0 - Math.atan2(-A.x, A.y) : this.long0 + Math.atan2(A.x * z, C * this.cos_p12 * F - A.y * this.sin_p12 * z))),
              A.x = I,
              A.y = H,
              A) : (O = q(this.es),
              P = h(this.es),
              N = t(this.es),
              T = l(this.es),
              1E-10 >= Math.abs(this.sin_p12 - 1) ? (U = this.a * f(O, P, N, T, m),
              C = Math.sqrt(A.x * A.x + A.y * A.y),
              W = U - C,
              H = y(W / this.a, O, P, N, T),
              I = d(this.long0 + Math.atan2(A.x, -1 * A.y)),
              A.x = I,
              A.y = H,
              A) : 1E-10 >= Math.abs(this.sin_p12 + 1) ? (U = this.a * f(O, P, N, T, m),
              C = Math.sqrt(A.x * A.x + A.y * A.y),
              W = C - U,
              H = y(W / this.a, O, P, N, T),
              I = d(this.long0 + Math.atan2(A.x, A.y)),
              A.x = I,
              A.y = H,
              A) : (C = Math.sqrt(A.x * A.x + A.y * A.y),
              ma = Math.atan2(A.x, A.y),
              ka = v(this.a, this.e, this.sin_p12),
              pa = Math.cos(ma),
              ia = this.e * this.cos_p12 * pa,
              oa = -ia * ia / (1 - this.es),
              E = 3 * this.es * (1 - oa) * this.sin_p12 * this.cos_p12 * pa / (1 - this.es),
              M = C / ka,
              R = M - oa * (1 + oa) * Math.pow(M, 3) / 6 - E * (1 + 3 * oa) * Math.pow(M, 4) / 24,
              ca = 1 - oa * R * R / 2 - M * R * R * R / 6,
              fa = Math.asin(this.sin_p12 * Math.cos(R) + this.cos_p12 * Math.sin(R) * pa),
              I = d(this.long0 + Math.asin(Math.sin(ma) * Math.sin(R) / Math.cos(fa))),
              H = Math.atan((1 - this.es * ca * this.sin_p12 / Math.sin(fa)) * Math.tan(fa) / (1 - this.es)),
              A.x = I,
              A.y = H,
              A))
          }
          ;
          p.names = ["Azimuthal_Equidistant", "aeqd"]
      }
      , {
          "../common/adjust_lon": 5,
          "../common/asinz": 6,
          "../common/e0fn": 7,
          "../common/e1fn": 8,
          "../common/e2fn": 9,
          "../common/e3fn": 10,
          "../common/gN": 11,
          "../common/imlfn": 12,
          "../common/mlfn": 14
      }],
      42: [function(g, u, p) {
          var d = g("../common/mlfn")
            , m = g("../common/e0fn")
            , f = g("../common/e1fn")
            , q = g("../common/e2fn")
            , h = g("../common/e3fn")
            , t = g("../common/gN")
            , l = g("../common/adjust_lon")
            , v = g("../common/adjust_lat")
            , w = g("../common/imlfn")
            , y = Math.PI / 2;
          p.init = function() {
              this.sphere || (this.e0 = m(this.es),
              this.e1 = f(this.es),
              this.e2 = q(this.es),
              this.e3 = h(this.es),
              this.ml0 = this.a * d(this.e0, this.e1, this.e2, this.e3, this.lat0))
          }
          ;
          p.forward = function(A) {
              var C = A.x
                , B = A.y;
              if (C = l(C - this.long0),
              this.sphere) {
                  var z = this.a * Math.asin(Math.cos(B) * Math.sin(C));
                  var F = this.a * (Math.atan2(Math.tan(B), Math.cos(C)) - this.lat0)
              } else {
                  F = Math.sin(B);
                  var I = Math.cos(B)
                    , H = t(this.a, this.e, F)
                    , J = Math.tan(B) * Math.tan(B);
                  z = C * Math.cos(B);
                  C = z * z;
                  var O = this.es * I * I / (1 - this.es);
                  B = this.a * d(this.e0, this.e1, this.e2, this.e3, B);
                  z = H * z * (1 - C * J * (1 / 6 - (8 - J + 8 * O) * C / 120));
                  F = B - this.ml0 + H * F / I * C * (.5 + (5 - J + 6 * O) * C / 24)
              }
              return A.x = z + this.x0,
              A.y = F + this.y0,
              A
          }
          ;
          p.inverse = function(A) {
              A.x -= this.x0;
              A.y -= this.y0;
              var C = A.x / this.a;
              var B = A.y / this.a;
              if (this.sphere) {
                  var z = B + this.lat0;
                  B = Math.asin(Math.sin(z) * Math.cos(C));
                  z = Math.atan2(Math.tan(C), Math.cos(z))
              } else {
                  z = w(this.ml0 / this.a + B, this.e0, this.e1, this.e2, this.e3);
                  if (1E-10 >= Math.abs(Math.abs(z) - y))
                      return A.x = this.long0,
                      A.y = y,
                      0 > B && (A.y *= -1),
                      A;
                  B = t(this.a, this.e, Math.sin(z));
                  var F = Math.pow(Math.tan(z), 2);
                  C = C * this.a / B;
                  var I = C * C;
                  B = z - B * Math.tan(z) / (B * B * B / this.a / this.a * (1 - this.es)) * C * C * (.5 - (1 + 3 * F) * C * C / 24);
                  z = C * (1 - I * (F / 3 + (1 + 3 * F) * F * I / 15)) / Math.cos(z)
              }
              return A.x = l(z + this.long0),
              A.y = v(B),
              A
          }
          ;
          p.names = ["Cassini", "Cassini_Soldner", "cass"]
      }
      , {
          "../common/adjust_lat": 4,
          "../common/adjust_lon": 5,
          "../common/e0fn": 7,
          "../common/e1fn": 8,
          "../common/e2fn": 9,
          "../common/e3fn": 10,
          "../common/gN": 11,
          "../common/imlfn": 12,
          "../common/mlfn": 14
      }],
      43: [function(g, u, p) {
          var d = g("../common/adjust_lon")
            , m = g("../common/qsfnz")
            , f = g("../common/msfnz")
            , q = g("../common/iqsfnz");
          p.init = function() {
              this.sphere || (this.k0 = f(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)))
          }
          ;
          p.forward = function(h) {
              var t = h.y;
              var l = d(h.x - this.long0);
              this.sphere ? (l = this.x0 + this.a * l * Math.cos(this.lat_ts),
              t = this.y0 + this.a * Math.sin(t) / Math.cos(this.lat_ts)) : (t = m(this.e, Math.sin(t)),
              l = this.x0 + this.a * this.k0 * l,
              t = this.y0 + this.a * t * .5 / this.k0);
              return h.x = l,
              h.y = t,
              h
          }
          ;
          p.inverse = function(h) {
              h.x -= this.x0;
              h.y -= this.y0;
              var t, l;
              return this.sphere ? (t = d(this.long0 + h.x / this.a / Math.cos(this.lat_ts)),
              l = Math.asin(h.y / this.a * Math.cos(this.lat_ts))) : (l = q(this.e, 2 * h.y * this.k0 / this.a),
              t = d(this.long0 + h.x / (this.a * this.k0))),
              h.x = t,
              h.y = l,
              h
          }
          ;
          p.names = ["cea"]
      }
      , {
          "../common/adjust_lon": 5,
          "../common/iqsfnz": 13,
          "../common/msfnz": 15,
          "../common/qsfnz": 20
      }],
      44: [function(g, u, p) {
          var d = g("../common/adjust_lon")
            , m = g("../common/adjust_lat");
          p.init = function() {
              this.x0 = this.x0 || 0;
              this.y0 = this.y0 || 0;
              this.lat0 = this.lat0 || 0;
              this.long0 = this.long0 || 0;
              this.lat_ts = this.lat_ts || 0;
              this.title = this.title || "Equidistant Cylindrical (Plate Carre)";
              this.rc = Math.cos(this.lat_ts)
          }
          ;
          p.forward = function(f) {
              var q = f.y
                , h = d(f.x - this.long0);
              q = m(q - this.lat0);
              return f.x = this.x0 + this.a * h * this.rc,
              f.y = this.y0 + this.a * q,
              f
          }
          ;
          p.inverse = function(f) {
              var q = f.y;
              return f.x = d(this.long0 + (f.x - this.x0) / (this.a * this.rc)),
              f.y = m(this.lat0 + (q - this.y0) / this.a),
              f
          }
          ;
          p.names = ["Equirectangular", "Equidistant_Cylindrical", "eqc"]
      }
      , {
          "../common/adjust_lat": 4,
          "../common/adjust_lon": 5
      }],
      45: [function(g, u, p) {
          var d = g("../common/e0fn")
            , m = g("../common/e1fn")
            , f = g("../common/e2fn")
            , q = g("../common/e3fn")
            , h = g("../common/msfnz")
            , t = g("../common/mlfn")
            , l = g("../common/adjust_lon")
            , v = g("../common/adjust_lat")
            , w = g("../common/imlfn");
          p.init = function() {
              1E-10 > Math.abs(this.lat1 + this.lat2) || (this.lat2 = this.lat2 || this.lat1,
              this.temp = this.b / this.a,
              this.es = 1 - Math.pow(this.temp, 2),
              this.e = Math.sqrt(this.es),
              this.e0 = d(this.es),
              this.e1 = m(this.es),
              this.e2 = f(this.es),
              this.e3 = q(this.es),
              this.sinphi = Math.sin(this.lat1),
              this.cosphi = Math.cos(this.lat1),
              this.ms1 = h(this.e, this.sinphi, this.cosphi),
              this.ml1 = t(this.e0, this.e1, this.e2, this.e3, this.lat1),
              1E-10 > Math.abs(this.lat1 - this.lat2) ? this.ns = this.sinphi : (this.sinphi = Math.sin(this.lat2),
              this.cosphi = Math.cos(this.lat2),
              this.ms2 = h(this.e, this.sinphi, this.cosphi),
              this.ml2 = t(this.e0, this.e1, this.e2, this.e3, this.lat2),
              this.ns = (this.ms1 - this.ms2) / (this.ml2 - this.ml1)),
              this.g = this.ml1 + this.ms1 / this.ns,
              this.ml0 = t(this.e0, this.e1, this.e2, this.e3, this.lat0),
              this.rh = this.a * (this.g - this.ml0))
          }
          ;
          p.forward = function(y) {
              var A = y.x;
              var C = y.y;
              this.sphere ? C = this.a * (this.g - C) : (C = t(this.e0, this.e1, this.e2, this.e3, C),
              C = this.a * (this.g - C));
              A = this.ns * l(A - this.long0);
              var B = this.y0 + this.rh - C * Math.cos(A);
              return y.x = this.x0 + C * Math.sin(A),
              y.y = B,
              y
          }
          ;
          p.inverse = function(y) {
              y.x -= this.x0;
              y.y = this.rh - y.y + this.y0;
              var A, C, B, z;
              0 <= this.ns ? (C = Math.sqrt(y.x * y.x + y.y * y.y),
              A = 1) : (C = -Math.sqrt(y.x * y.x + y.y * y.y),
              A = -1);
              var F = 0;
              return (0 !== C && (F = Math.atan2(A * y.x, A * y.y)),
              this.sphere) ? (z = l(this.long0 + F / this.ns),
              B = v(this.g - C / this.a),
              y.x = z,
              y.y = B,
              y) : (B = w(this.g - C / this.a, this.e0, this.e1, this.e2, this.e3),
              z = l(this.long0 + F / this.ns),
              y.x = z,
              y.y = B,
              y)
          }
          ;
          p.names = ["Equidistant_Conic", "eqdc"]
      }
      , {
          "../common/adjust_lat": 4,
          "../common/adjust_lon": 5,
          "../common/e0fn": 7,
          "../common/e1fn": 8,
          "../common/e2fn": 9,
          "../common/e3fn": 10,
          "../common/imlfn": 12,
          "../common/mlfn": 14,
          "../common/msfnz": 15
      }],
      46: [function(g, u, p) {
          var d = Math.PI / 4
            , m = g("../common/srat")
            , f = Math.PI / 2;
          p.init = function() {
              var q = Math.sin(this.lat0)
                , h = Math.cos(this.lat0);
              h *= h;
              this.rc = Math.sqrt(1 - this.es) / (1 - this.es * q * q);
              this.C = Math.sqrt(1 + this.es * h * h / (1 - this.es));
              this.phic0 = Math.asin(q / this.C);
              this.ratexp = .5 * this.C * this.e;
              this.K = Math.tan(.5 * this.phic0 + d) / (Math.pow(Math.tan(.5 * this.lat0 + d), this.C) * m(this.e * q, this.ratexp))
          }
          ;
          p.forward = function(q) {
              var h = q.x
                , t = q.y;
              return q.y = 2 * Math.atan(this.K * Math.pow(Math.tan(.5 * t + d), this.C) * m(this.e * Math.sin(t), this.ratexp)) - f,
              q.x = this.C * h,
              q
          }
          ;
          p.inverse = function(q) {
              for (var h = q.x / this.C, t = q.y, l = Math.pow(Math.tan(.5 * t + d) / this.K, 1 / this.C), v = 20; 0 < v && (t = 2 * Math.atan(l * m(this.e * Math.sin(q.y), -.5 * this.e)) - f,
              !(1E-14 > Math.abs(t - q.y))); --v)
                  q.y = t;
              return v ? (q.x = h,
              q.y = t,
              q) : null
          }
          ;
          p.names = ["gauss"]
      }
      , {
          "../common/srat": 22
      }],
      47: [function(g, u, p) {
          var d = g("../common/adjust_lon")
            , m = g("../common/asinz");
          p.init = function() {
              this.sin_p14 = Math.sin(this.lat0);
              this.cos_p14 = Math.cos(this.lat0);
              this.infinity_dist = 1E3 * this.a;
              this.rc = 1
          }
          ;
          p.forward = function(f) {
              var q, h, t, l, v, w, y, A = f.y;
              return t = d(f.x - this.long0),
              q = Math.sin(A),
              h = Math.cos(A),
              l = Math.cos(t),
              v = this.sin_p14 * q + this.cos_p14 * h * l,
              0 < v || 1E-10 >= Math.abs(v) ? (w = this.x0 + 1 * this.a * h * Math.sin(t) / v,
              y = this.y0 + 1 * this.a * (this.cos_p14 * q - this.sin_p14 * h * l) / v) : (w = this.x0 + this.infinity_dist * h * Math.sin(t),
              y = this.y0 + this.infinity_dist * (this.cos_p14 * q - this.sin_p14 * h * l)),
              f.x = w,
              f.y = y,
              f
          }
          ;
          p.inverse = function(f) {
              var q, h, t, l, v, w;
              return f.x = (f.x - this.x0) / this.a,
              f.y = (f.y - this.y0) / this.a,
              f.x /= this.k0,
              f.y /= this.k0,
              (q = Math.sqrt(f.x * f.x + f.y * f.y)) ? (l = Math.atan2(q, this.rc),
              h = Math.sin(l),
              t = Math.cos(l),
              w = m(t * this.sin_p14 + f.y * h * this.cos_p14 / q),
              v = Math.atan2(f.x * h, q * this.cos_p14 * t - f.y * this.sin_p14 * h),
              v = d(this.long0 + v)) : (w = this.phic0,
              v = 0),
              f.x = v,
              f.y = w,
              f
          }
          ;
          p.names = ["gnom"]
      }
      , {
          "../common/adjust_lon": 5,
          "../common/asinz": 6
      }],
      48: [function(g, u, p) {
          var d = g("../common/adjust_lon");
          p.init = function() {
              this.a = 6377397.155;
              this.es = .006674372230614;
              this.e = Math.sqrt(this.es);
              this.lat0 || (this.lat0 = .863937979737193);
              this.long0 || (this.long0 = .4334234309119251);
              this.k0 || (this.k0 = .9999);
              this.s45 = .785398163397448;
              this.s90 = 2 * this.s45;
              this.fi0 = this.lat0;
              this.e2 = this.es;
              this.e = Math.sqrt(this.e2);
              this.alfa = Math.sqrt(1 + this.e2 * Math.pow(Math.cos(this.fi0), 4) / (1 - this.e2));
              this.uq = 1.04216856380474;
              this.u0 = Math.asin(Math.sin(this.fi0) / this.alfa);
              this.g = Math.pow((1 + this.e * Math.sin(this.fi0)) / (1 - this.e * Math.sin(this.fi0)), this.alfa * this.e / 2);
              this.k = Math.tan(this.u0 / 2 + this.s45) / Math.pow(Math.tan(this.fi0 / 2 + this.s45), this.alfa) * this.g;
              this.k1 = this.k0;
              this.n0 = this.a * Math.sqrt(1 - this.e2) / (1 - this.e2 * Math.pow(Math.sin(this.fi0), 2));
              this.s0 = 1.37008346281555;
              this.n = Math.sin(this.s0);
              this.ro0 = this.k1 * this.n0 / Math.tan(this.s0);
              this.ad = this.s90 - this.uq
          }
          ;
          p.forward = function(m) {
              var f, q, h, t, l, v, w, y = m.y, A = d(m.x - this.long0);
              return f = Math.pow((1 + this.e * Math.sin(y)) / (1 - this.e * Math.sin(y)), this.alfa * this.e / 2),
              q = 2 * (Math.atan(this.k * Math.pow(Math.tan(y / 2 + this.s45), this.alfa) / f) - this.s45),
              h = -A * this.alfa,
              t = Math.asin(Math.cos(this.ad) * Math.sin(q) + Math.sin(this.ad) * Math.cos(q) * Math.cos(h)),
              l = Math.asin(Math.cos(q) * Math.sin(h) / Math.cos(t)),
              v = this.n * l,
              w = this.ro0 * Math.pow(Math.tan(this.s0 / 2 + this.s45), this.n) / Math.pow(Math.tan(t / 2 + this.s45), this.n),
              m.y = w * Math.cos(v),
              m.x = w * Math.sin(v),
              this.czech || (m.y *= -1,
              m.x *= -1),
              m
          }
          ;
          p.inverse = function(m) {
              var f = m.x;
              m.x = m.y;
              m.y = f;
              this.czech || (m.y *= -1,
              m.x *= -1);
              f = Math.sqrt(m.x * m.x + m.y * m.y);
              var q = Math.atan2(m.y, m.x) / Math.sin(this.s0);
              var h = 2 * (Math.atan(Math.pow(this.ro0 / f, 1 / this.n) * Math.tan(this.s0 / 2 + this.s45)) - this.s45);
              f = Math.asin(Math.cos(this.ad) * Math.sin(h) - Math.sin(this.ad) * Math.cos(h) * Math.cos(q));
              m.x = this.long0 - Math.asin(Math.cos(h) * Math.sin(q) / Math.cos(f)) / this.alfa;
              q = f;
              var t = h = 0;
              do
                  m.y = 2 * (Math.atan(Math.pow(this.k, -1 / this.alfa) * Math.pow(Math.tan(f / 2 + this.s45), 1 / this.alfa) * Math.pow((1 + this.e * Math.sin(q)) / (1 - this.e * Math.sin(q)), this.e / 2)) - this.s45),
                  1E-10 > Math.abs(q - m.y) && (h = 1),
                  q = m.y,
                  t += 1;
              while (0 === h && 15 > t);
              return 15 <= t ? null : m
          }
          ;
          p.names = ["Krovak", "krovak"]
      }
      , {
          "../common/adjust_lon": 5
      }],
      49: [function(g, u, p) {
          var d = Math.PI / 2
            , m = Math.PI / 4
            , f = g("../common/qsfnz")
            , q = g("../common/adjust_lon");
          p.S_POLE = 1;
          p.N_POLE = 2;
          p.EQUIT = 3;
          p.OBLIQ = 4;
          p.init = function() {
              var h = Math.abs(this.lat0);
              if (this.mode = 1E-10 > Math.abs(h - d) ? 0 > this.lat0 ? this.S_POLE : this.N_POLE : 1E-10 > Math.abs(h) ? this.EQUIT : this.OBLIQ,
              0 < this.es)
                  switch (this.qp = f(this.e, 1),
                  this.mmf = .5 / (1 - this.es),
                  this.apa = this.authset(this.es),
                  this.mode) {
                  case this.N_POLE:
                      this.dd = 1;
                      break;
                  case this.S_POLE:
                      this.dd = 1;
                      break;
                  case this.EQUIT:
                      this.rq = Math.sqrt(.5 * this.qp);
                      this.dd = 1 / this.rq;
                      this.xmf = 1;
                      this.ymf = .5 * this.qp;
                      break;
                  case this.OBLIQ:
                      this.rq = Math.sqrt(.5 * this.qp),
                      h = Math.sin(this.lat0),
                      this.sinb1 = f(this.e, h) / this.qp,
                      this.cosb1 = Math.sqrt(1 - this.sinb1 * this.sinb1),
                      this.dd = Math.cos(this.lat0) / (Math.sqrt(1 - this.es * h * h) * this.rq * this.cosb1),
                      this.ymf = (this.xmf = this.rq) / this.dd,
                      this.xmf *= this.dd
                  }
              else
                  this.mode === this.OBLIQ && (this.sinph0 = Math.sin(this.lat0),
                  this.cosph0 = Math.cos(this.lat0))
          }
          ;
          p.forward = function(h) {
              var t, l, v, w, y, A, C, B, z = h.x, F = h.y;
              if (z = q(z - this.long0),
              this.sphere)
                  if (w = Math.sin(F),
                  v = Math.cos(F),
                  l = Math.cos(z),
                  this.mode === this.OBLIQ || this.mode === this.EQUIT) {
                      if (t = this.mode === this.EQUIT ? 1 + v * l : 1 + this.sinph0 * w + this.cosph0 * v * l,
                      1E-10 >= t)
                          return null;
                      t = Math.sqrt(2 / t);
                      var I = t * v * Math.sin(z);
                      t *= this.mode === this.EQUIT ? w : this.cosph0 * w - this.sinph0 * v * l
                  } else {
                      if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
                          if (this.mode === this.N_POLE && (l = -l),
                          1E-10 > Math.abs(F + this.phi0))
                              return null;
                          t = m - .5 * F;
                          t = 2 * (this.mode === this.S_POLE ? Math.cos(t) : Math.sin(t));
                          I = t * Math.sin(z);
                          t *= l
                      }
                  }
              else {
                  switch (A = 0,
                  C = 0,
                  B = 0,
                  l = Math.cos(z),
                  v = Math.sin(z),
                  w = Math.sin(F),
                  y = f(this.e, w),
                  (this.mode === this.OBLIQ || this.mode === this.EQUIT) && (A = y / this.qp,
                  C = Math.sqrt(1 - A * A)),
                  this.mode) {
                  case this.OBLIQ:
                      B = 1 + this.sinb1 * A + this.cosb1 * C * l;
                      break;
                  case this.EQUIT:
                      B = 1 + C * l;
                      break;
                  case this.N_POLE:
                      B = d + F;
                      y = this.qp - y;
                      break;
                  case this.S_POLE:
                      B = F - d,
                      y = this.qp + y
                  }
                  if (1E-10 > Math.abs(B))
                      return null;
                  switch (this.mode) {
                  case this.OBLIQ:
                  case this.EQUIT:
                      B = Math.sqrt(2 / B);
                      t = this.mode === this.OBLIQ ? this.ymf * B * (this.cosb1 * A - this.sinb1 * C * l) : (B = Math.sqrt(2 / (1 + C * l))) * A * this.ymf;
                      I = this.xmf * B * C * v;
                      break;
                  case this.N_POLE:
                  case this.S_POLE:
                      0 <= y ? (I = (B = Math.sqrt(y)) * v,
                      t = l * (this.mode === this.S_POLE ? B : -B)) : I = t = 0
                  }
              }
              return h.x = this.a * I + this.x0,
              h.y = this.a * t + this.y0,
              h
          }
          ;
          p.inverse = function(h) {
              h.x -= this.x0;
              h.y -= this.y0;
              var t, l, v;
              var w = h.x / this.a;
              var y = h.y / this.a;
              if (this.sphere) {
                  var A = v = 0;
                  if (l = Math.sqrt(w * w + y * y),
                  t = .5 * l,
                  1 < t)
                      return null;
                  switch (t = 2 * Math.asin(t),
                  (this.mode === this.OBLIQ || this.mode === this.EQUIT) && (A = Math.sin(t),
                  v = Math.cos(t)),
                  this.mode) {
                  case this.EQUIT:
                      t = 1E-10 >= Math.abs(l) ? 0 : Math.asin(y * A / l);
                      w *= A;
                      y = v * l;
                      break;
                  case this.OBLIQ:
                      t = 1E-10 >= Math.abs(l) ? this.phi0 : Math.asin(v * this.sinph0 + y * A * this.cosph0 / l);
                      w *= A * this.cosph0;
                      y = (v - Math.sin(t) * this.sinph0) * l;
                      break;
                  case this.N_POLE:
                      y = -y;
                      t = d - t;
                      break;
                  case this.S_POLE:
                      t -= d
                  }
                  w = 0 !== y || this.mode !== this.EQUIT && this.mode !== this.OBLIQ ? Math.atan2(w, y) : 0
              } else {
                  if (t = 0,
                  this.mode === this.OBLIQ || this.mode === this.EQUIT) {
                      if (w /= this.dd,
                      y *= this.dd,
                      v = Math.sqrt(w * w + y * y),
                      1E-10 > v)
                          return h.x = 0,
                          h.y = this.phi0,
                          h;
                      A = 2 * Math.asin(.5 * v / this.rq);
                      l = Math.cos(A);
                      w *= A = Math.sin(A);
                      this.mode === this.OBLIQ ? (t = l * this.sinb1 + y * A * this.cosb1 / v,
                      y = v * this.cosb1 * l - y * this.sinb1 * A) : (t = y * A / v,
                      y = v * l)
                  } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
                      if (this.mode === this.N_POLE && (y = -y),
                      A = w * w + y * y,
                      !A)
                          return h.x = 0,
                          h.y = this.phi0,
                          h;
                      t = 1 - A / this.qp;
                      this.mode === this.S_POLE && (t = -t)
                  }
                  w = Math.atan2(w, y);
                  t = this.authlat(Math.asin(t), this.apa)
              }
              return h.x = q(this.long0 + w),
              h.y = t,
              h
          }
          ;
          p.P00 = .3333333333333333;
          p.P01 = .17222222222222222;
          p.P02 = .10257936507936508;
          p.P10 = .06388888888888888;
          p.P11 = .0664021164021164;
          p.P20 = .016415012942191543;
          p.authset = function(h) {
              var t, l = [];
              return l[0] = h * this.P00,
              t = h * h,
              l[0] += t * this.P01,
              l[1] = t * this.P10,
              t *= h,
              l[0] += t * this.P02,
              l[1] += t * this.P11,
              l[2] = t * this.P20,
              l
          }
          ;
          p.authlat = function(h, t) {
              var l = h + h;
              return h + t[0] * Math.sin(l) + t[1] * Math.sin(l + l) + t[2] * Math.sin(l + l + l)
          }
          ;
          p.names = ["Lambert Azimuthal Equal Area", "Lambert_Azimuthal_Equal_Area", "laea"]
      }
      , {
          "../common/adjust_lon": 5,
          "../common/qsfnz": 20
      }],
      50: [function(g, u, p) {
          var d = g("../common/msfnz")
            , m = g("../common/tsfnz")
            , f = Math.PI / 2
            , q = g("../common/sign")
            , h = g("../common/adjust_lon")
            , t = g("../common/phi2z");
          p.init = function() {
              if (this.lat2 || (this.lat2 = this.lat1),
              this.k0 || (this.k0 = 1),
              this.x0 = this.x0 || 0,
              this.y0 = this.y0 || 0,
              !(1E-10 > Math.abs(this.lat1 + this.lat2))) {
                  var l = this.b / this.a;
                  this.e = Math.sqrt(1 - l * l);
                  l = Math.sin(this.lat1);
                  var v = d(this.e, l, Math.cos(this.lat1))
                    , w = m(this.e, this.lat1, l)
                    , y = Math.sin(this.lat2)
                    , A = d(this.e, y, Math.cos(this.lat2));
                  y = m(this.e, this.lat2, y);
                  var C = m(this.e, this.lat0, Math.sin(this.lat0));
                  this.ns = 1E-10 < Math.abs(this.lat1 - this.lat2) ? Math.log(v / A) / Math.log(w / y) : l;
                  isNaN(this.ns) && (this.ns = l);
                  this.f0 = v / (this.ns * Math.pow(w, this.ns));
                  this.rh = this.a * this.f0 * Math.pow(C, this.ns);
                  this.title || (this.title = "Lambert Conformal Conic")
              }
          }
          ;
          p.forward = function(l) {
              var v = l.x
                , w = l.y;
              1E-10 >= Math.abs(2 * Math.abs(w) - Math.PI) && (w = q(w) * (f - 2E-10));
              var y = Math.abs(Math.abs(w) - f);
              if (1E-10 < y)
                  w = m(this.e, w, Math.sin(w)),
                  w = this.a * this.f0 * Math.pow(w, this.ns);
              else {
                  if (y = w * this.ns,
                  0 >= y)
                      return null;
                  w = 0
              }
              v = this.ns * h(v - this.long0);
              return l.x = this.k0 * w * Math.sin(v) + this.x0,
              l.y = this.k0 * (this.rh - w * Math.cos(v)) + this.y0,
              l
          }
          ;
          p.inverse = function(l) {
              var v, w, y, A, C, B = (l.x - this.x0) / this.k0, z = this.rh - (l.y - this.y0) / this.k0;
              0 < this.ns ? (v = Math.sqrt(B * B + z * z),
              w = 1) : (v = -Math.sqrt(B * B + z * z),
              w = -1);
              var F = 0;
              if (0 !== v && (F = Math.atan2(w * B, w * z)),
              0 !== v || 0 < this.ns) {
                  if (w = 1 / this.ns,
                  y = Math.pow(v / (this.a * this.f0), w),
                  A = t(this.e, y),
                  -9999 === A)
                      return null
              } else
                  A = -f;
              return C = h(F / this.ns + this.long0),
              l.x = C,
              l.y = A,
              l
          }
          ;
          p.names = ["Lambert Tangential Conformal Conic Projection", "Lambert_Conformal_Conic", "Lambert_Conformal_Conic_2SP", "lcc"]
      }
      , {
          "../common/adjust_lon": 5,
          "../common/msfnz": 15,
          "../common/phi2z": 16,
          "../common/sign": 21,
          "../common/tsfnz": 24
      }],
      51: [function(g, u, p) {
          function d(m) {
              return m
          }
          p.init = function() {}
          ;
          p.forward = d;
          p.inverse = d;
          p.names = ["longlat", "identity"]
      }
      , {}],
      52: [function(g, u, p) {
          var d = g("../common/msfnz")
            , m = Math.PI / 2
            , f = g("../common/adjust_lon")
            , q = Math.PI / 4
            , h = g("../common/tsfnz")
            , t = g("../common/phi2z");
          p.init = function() {
              var l = this.b / this.a;
              this.es = 1 - l * l;
              "x0"in this || (this.x0 = 0);
              "y0"in this || (this.y0 = 0);
              this.e = Math.sqrt(this.es);
              this.lat_ts ? this.k0 = this.sphere ? Math.cos(this.lat_ts) : d(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) : this.k0 || (this.k0 = this.k ? this.k : 1)
          }
          ;
          p.forward = function(l) {
              var v = l.x
                , w = l.y;
              if (90 < 57.29577951308232 * w && -90 > 57.29577951308232 * w && 180 < 57.29577951308232 * v && -180 > 57.29577951308232 * v || 1E-10 >= Math.abs(Math.abs(w) - m))
                  return null;
              this.sphere ? (v = this.x0 + this.a * this.k0 * f(v - this.long0),
              w = this.y0 + this.a * this.k0 * Math.log(Math.tan(q + .5 * w))) : (w = h(this.e, w, Math.sin(w)),
              v = this.x0 + this.a * this.k0 * f(v - this.long0),
              w = this.y0 - this.a * this.k0 * Math.log(w));
              return l.x = v,
              l.y = w,
              l
          }
          ;
          p.inverse = function(l) {
              var v, w = l.x - this.x0, y = l.y - this.y0;
              if (this.sphere)
                  var A = m - 2 * Math.atan(Math.exp(-y / (this.a * this.k0)));
              else if (A = t(this.e, Math.exp(-y / (this.a * this.k0))),
              -9999 === A)
                  return null;
              return v = f(this.long0 + w / (this.a * this.k0)),
              l.x = v,
              l.y = A,
              l
          }
          ;
          p.names = ["Mercator", "Popular Visualisation Pseudo Mercator", "Mercator_1SP", "Mercator_Auxiliary_Sphere", "merc"]
      }
      , {
          "../common/adjust_lon": 5,
          "../common/msfnz": 15,
          "../common/phi2z": 16,
          "../common/tsfnz": 24
      }],
      53: [function(g, u, p) {
          var d = g("../common/adjust_lon");
          p.init = function() {}
          ;
          p.forward = function(m) {
              var f = m.y
                , q = d(m.x - this.long0);
              f = this.y0 + this.a * Math.log(Math.tan(Math.PI / 4 + f / 2.5)) * 1.25;
              return m.x = this.x0 + this.a * q,
              m.y = f,
              m
          }
          ;
          p.inverse = function(m) {
              m.x -= this.x0;
              m.y -= this.y0;
              var f = d(this.long0 + m.x / this.a)
                , q = 2.5 * (Math.atan(Math.exp(.8 * m.y / this.a)) - Math.PI / 4);
              return m.x = f,
              m.y = q,
              m
          }
          ;
          p.names = ["Miller_Cylindrical", "mill"]
      }
      , {
          "../common/adjust_lon": 5
      }],
      54: [function(g, u, p) {
          var d = g("../common/adjust_lon");
          p.init = function() {}
          ;
          p.forward = function(m) {
              for (var f = m.y, q = d(m.x - this.long0), h = f, t = Math.PI * Math.sin(f), l = 0; ; l++) {
                  var v = -(h + Math.sin(h) - t) / (1 + Math.cos(h));
                  if (h += v,
                  1E-10 > Math.abs(v))
                      break
              }
              h /= 2;
              1E-10 > Math.PI / 2 - Math.abs(f) && (q = 0);
              f = 1.4142135623731 * this.a * Math.sin(h) + this.y0;
              return m.x = .900316316158 * this.a * q * Math.cos(h) + this.x0,
              m.y = f,
              m
          }
          ;
          p.inverse = function(m) {
              m.x -= this.x0;
              m.y -= this.y0;
              var f = m.y / (1.4142135623731 * this.a);
              .999999999999 < Math.abs(f) && (f = .999999999999);
              f = Math.asin(f);
              var q = d(this.long0 + m.x / (.900316316158 * this.a * Math.cos(f)));
              q < -Math.PI && (q = -Math.PI);
              q > Math.PI && (q = Math.PI);
              f = (2 * f + Math.sin(2 * f)) / Math.PI;
              1 < Math.abs(f) && (f = 1);
              f = Math.asin(f);
              return m.x = q,
              m.y = f,
              m
          }
          ;
          p.names = ["Mollweide", "moll"]
      }
      , {
          "../common/adjust_lon": 5
      }],
      55: [function(g, u, p) {
          p.iterations = 1;
          p.init = function() {
              this.A = [];
              this.A[1] = .6399175073;
              this.A[2] = -.1358797613;
              this.A[3] = .063294409;
              this.A[4] = -.02526853;
              this.A[5] = .0117879;
              this.A[6] = -.0055161;
              this.A[7] = .0026906;
              this.A[8] = -.001333;
              this.A[9] = 6.7E-4;
              this.A[10] = -3.4E-4;
              this.B_re = [];
              this.B_im = [];
              this.B_re[1] = .7557853228;
              this.B_im[1] = 0;
              this.B_re[2] = .249204646;
              this.B_im[2] = .003371507;
              this.B_re[3] = -.001541739;
              this.B_im[3] = .04105856;
              this.B_re[4] = -.10162907;
              this.B_im[4] = .01727609;
              this.B_re[5] = -.26623489;
              this.B_im[5] = -.36249218;
              this.B_re[6] = -.6870983;
              this.B_im[6] = -1.1651967;
              this.C_re = [];
              this.C_im = [];
              this.C_re[1] = 1.3231270439;
              this.C_im[1] = 0;
              this.C_re[2] = -.577245789;
              this.C_im[2] = -.007809598;
              this.C_re[3] = .508307513;
              this.C_im[3] = -.112208952;
              this.C_re[4] = -.15094762;
              this.C_im[4] = .18200602;
              this.C_re[5] = 1.01418179;
              this.C_im[5] = 1.64497696;
              this.C_re[6] = 1.9660549;
              this.C_im[6] = 2.5127645;
              this.D = [];
              this.D[1] = 1.5627014243;
              this.D[2] = .5185406398;
              this.D[3] = -.03333098;
              this.D[4] = -.1052906;
              this.D[5] = -.0368594;
              this.D[6] = .007317;
              this.D[7] = .0122;
              this.D[8] = .00394;
              this.D[9] = -.0013
          }
          ;
          p.forward = function(d) {
              var m, f = d.x - this.long0, q = (d.y - this.lat0) / 4.84813681109536E-6 * 1E-5, h = 1, t = 0;
              for (m = 1; 10 >= m; m++)
                  h *= q,
                  t += this.A[m] * h;
              var l;
              h = t;
              t = 1;
              var v = l = 0
                , w = 0;
              for (m = 1; 6 >= m; m++)
                  q = t * h - l * f,
                  l = l * h + t * f,
                  t = q,
                  v = v + this.B_re[m] * t - this.B_im[m] * l,
                  w = w + this.B_im[m] * t + this.B_re[m] * l;
              return d.x = w * this.a + this.x0,
              d.y = v * this.a + this.y0,
              d
          }
          ;
          p.inverse = function(d) {
              var m, f, q = (d.y - this.y0) / this.a, h = (d.x - this.x0) / this.a, t = 1, l = f = 0, v = 0;
              for (m = 1; 6 >= m; m++) {
                  var w = t * q - f * h;
                  f = f * q + t * h;
                  t = w;
                  l = l + this.C_re[m] * t - this.C_im[m] * f;
                  v = v + this.C_im[m] * t + this.C_re[m] * f
              }
              for (w = 0; w < this.iterations; w++) {
                  var y = l;
                  var A = v;
                  t = q;
                  f = h;
                  for (m = 2; 6 >= m; m++) {
                      var C = y * l - A * v;
                      A = A * l + y * v;
                      y = C;
                      t += (m - 1) * (this.B_re[m] * y - this.B_im[m] * A);
                      f += (m - 1) * (this.B_im[m] * y + this.B_re[m] * A)
                  }
                  y = 1;
                  A = 0;
                  var B = this.B_re[1]
                    , z = this.B_im[1];
                  for (m = 2; 6 >= m; m++)
                      C = y * l - A * v,
                      A = A * l + y * v,
                      y = C,
                      B += m * (this.B_re[m] * y - this.B_im[m] * A),
                      z += m * (this.B_im[m] * y + this.B_re[m] * A);
                  v = B * B + z * z;
                  l = (t * B + f * z) / v;
                  v = (f * B - t * z) / v
              }
              q = l;
              h = 1;
              l = 0;
              for (m = 1; 9 >= m; m++)
                  h *= q,
                  l += this.D[m] * h;
              m = this.lat0 + .484813681109536 * l;
              return d.x = this.long0 + v,
              d.y = m,
              d
          }
          ;
          p.names = ["New_Zealand_Map_Grid", "nzmg"]
      }
      , {}],
      56: [function(g, u, p) {
          var d = g("../common/tsfnz")
            , m = g("../common/adjust_lon")
            , f = g("../common/phi2z")
            , q = Math.PI / 2
            , h = Math.PI / 4;
          p.init = function() {
              this.no_off = this.no_off || !1;
              this.no_rot = this.no_rot || !1;
              isNaN(this.k0) && (this.k0 = 1);
              var t = Math.sin(this.lat0)
                , l = Math.cos(this.lat0)
                , v = this.e * t;
              this.bl = Math.sqrt(1 + this.es / (1 - this.es) * Math.pow(l, 4));
              this.al = this.a * this.bl * this.k0 * Math.sqrt(1 - this.es) / (1 - v * v);
              t = d(this.e, this.lat0, t);
              l = this.bl / l * Math.sqrt((1 - this.es) / (1 - v * v));
              1 > l * l && (l = 1);
              if (isNaN(this.longc)) {
                  v = d(this.e, this.lat1, Math.sin(this.lat1));
                  var w = d(this.e, this.lat2, Math.sin(this.lat2));
                  this.el = 0 <= this.lat0 ? (l + Math.sqrt(l * l - 1)) * Math.pow(t, this.bl) : (l - Math.sqrt(l * l - 1)) * Math.pow(t, this.bl);
                  v = Math.pow(v, this.bl);
                  var y = Math.pow(w, this.bl);
                  w = this.el / v;
                  t = .5 * (w - 1 / w);
                  w = (this.el * this.el - y * v) / (this.el * this.el + y * v);
                  v = (y - v) / (y + v);
                  y = m(this.long1 - this.long2);
                  this.long0 = .5 * (this.long1 + this.long2) - Math.atan(w * Math.tan(.5 * this.bl * y) / v) / this.bl;
                  this.long0 = m(this.long0);
                  v = m(this.long1 - this.long0);
                  this.gamma0 = Math.atan(Math.sin(this.bl * v) / t);
                  this.alpha = Math.asin(l * Math.sin(this.gamma0))
              } else
                  w = 0 <= this.lat0 ? l + Math.sqrt(l * l - 1) : l - Math.sqrt(l * l - 1),
                  this.el = w * Math.pow(t, this.bl),
                  this.gamma0 = Math.asin(Math.sin(this.alpha) / l),
                  this.long0 = this.longc - Math.asin(.5 * (w - 1 / w) * Math.tan(this.gamma0)) / this.bl;
              this.uc = this.no_off ? 0 : 0 <= this.lat0 ? this.al / this.bl * Math.atan2(Math.sqrt(l * l - 1), Math.cos(this.alpha)) : -1 * this.al / this.bl * Math.atan2(Math.sqrt(l * l - 1), Math.cos(this.alpha))
          }
          ;
          p.forward = function(t) {
              var l = t.y;
              var v = m(t.x - this.long0);
              if (1E-10 >= Math.abs(Math.abs(l) - q))
                  v = 0 < l ? -1 : 1,
                  l = this.al / this.bl * Math.log(Math.tan(h + v * this.gamma0 * .5)),
                  v = -1 * v * q * this.al / this.bl;
              else {
                  l = d(this.e, l, Math.sin(l));
                  l = this.el / Math.pow(l, this.bl);
                  var w = .5 * (l - 1 / l)
                    , y = Math.sin(this.bl * v);
                  l = (w * Math.sin(this.gamma0) - y * Math.cos(this.gamma0)) / (.5 * (l + 1 / l));
                  l = 1E-10 >= Math.abs(Math.abs(l) - 1) ? Number.POSITIVE_INFINITY : .5 * this.al * Math.log((1 - l) / (1 + l)) / this.bl;
                  v = 1E-10 >= Math.abs(Math.cos(this.bl * v)) ? this.al * this.bl * v : this.al * Math.atan2(w * Math.cos(this.gamma0) + y * Math.sin(this.gamma0), Math.cos(this.bl * v)) / this.bl
              }
              return this.no_rot ? (t.x = this.x0 + v,
              t.y = this.y0 + l) : (v -= this.uc,
              t.x = this.x0 + l * Math.cos(this.alpha) + v * Math.sin(this.alpha),
              t.y = this.y0 + v * Math.cos(this.alpha) - l * Math.sin(this.alpha)),
              t
          }
          ;
          p.inverse = function(t) {
              var l, v;
              this.no_rot ? (v = t.y - this.y0,
              l = t.x - this.x0) : (v = (t.x - this.x0) * Math.cos(this.alpha) - (t.y - this.y0) * Math.sin(this.alpha),
              l = (t.y - this.y0) * Math.cos(this.alpha) + (t.x - this.x0) * Math.sin(this.alpha),
              l += this.uc);
              var w = Math.exp(-1 * this.bl * v / this.al);
              v = .5 * (w - 1 / w);
              var y = Math.sin(this.bl * l / this.al);
              w = (y * Math.cos(this.gamma0) + v * Math.sin(this.gamma0)) / (.5 * (w + 1 / w));
              var A = Math.pow(this.el / Math.sqrt((1 + w) / (1 - w)), 1 / this.bl);
              return 1E-10 > Math.abs(w - 1) ? (t.x = this.long0,
              t.y = q) : 1E-10 > Math.abs(w + 1) ? (t.x = this.long0,
              t.y = -1 * q) : (t.y = f(this.e, A),
              t.x = m(this.long0 - Math.atan2(v * Math.cos(this.gamma0) - y * Math.sin(this.gamma0), Math.cos(this.bl * l / this.al)) / this.bl)),
              t
          }
          ;
          p.names = ["Hotine_Oblique_Mercator", "Hotine Oblique Mercator", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin", "Hotine_Oblique_Mercator_Azimuth_Center", "omerc"]
      }
      , {
          "../common/adjust_lon": 5,
          "../common/phi2z": 16,
          "../common/tsfnz": 24
      }],
      57: [function(g, u, p) {
          var d = g("../common/e0fn")
            , m = g("../common/e1fn")
            , f = g("../common/e2fn")
            , q = g("../common/e3fn")
            , h = g("../common/adjust_lon")
            , t = g("../common/adjust_lat")
            , l = g("../common/mlfn")
            , v = g("../common/gN");
          p.init = function() {
              this.temp = this.b / this.a;
              this.es = 1 - Math.pow(this.temp, 2);
              this.e = Math.sqrt(this.es);
              this.e0 = d(this.es);
              this.e1 = m(this.es);
              this.e2 = f(this.es);
              this.e3 = q(this.es);
              this.ml0 = this.a * l(this.e0, this.e1, this.e2, this.e3, this.lat0)
          }
          ;
          p.forward = function(w) {
              var y, A, C, B = w.y, z = h(w.x - this.long0);
              (C = z * Math.sin(B),
              this.sphere) ? 1E-10 >= Math.abs(B) ? (y = this.a * z,
              A = -1 * this.a * this.lat0) : (y = this.a * Math.sin(C) / Math.tan(B),
              A = this.a * (t(B - this.lat0) + (1 - Math.cos(C)) / Math.tan(B))) : 1E-10 >= Math.abs(B) ? (y = this.a * z,
              A = -1 * this.ml0) : (A = v(this.a, this.e, Math.sin(B)) / Math.tan(B),
              y = A * Math.sin(C),
              A = this.a * l(this.e0, this.e1, this.e2, this.e3, B) - this.ml0 + A * (1 - Math.cos(C)));
              return w.x = y + this.x0,
              w.y = A + this.y0,
              w
          }
          ;
          p.inverse = function(w) {
              var y, A, C;
              if (y = w.x - this.x0,
              A = w.y - this.y0,
              this.sphere)
                  if (1E-10 >= Math.abs(A + this.a * this.lat0)) {
                      y = h(y / this.a + this.long0);
                      var B = 0
                  } else {
                      var z = this.lat0 + A / this.a;
                      var F = y * y / this.a / this.a + z * z;
                      var I = z;
                      var H;
                      for (A = 20; A; --A)
                          if (H = Math.tan(I),
                          C = -1 * (z * (I * H + 1) - I - .5 * (I * I + F) * H) / ((I - z) / H - 1),
                          I += C,
                          1E-10 >= Math.abs(C)) {
                              B = I;
                              break
                          }
                      y = h(this.long0 + Math.asin(y * Math.tan(I) / this.a) / Math.sin(B))
                  }
              else if (1E-10 >= Math.abs(A + this.ml0))
                  B = 0,
                  y = h(this.long0 + y / this.a);
              else {
                  z = (this.ml0 + A) / this.a;
                  F = y * y / this.a / this.a + z * z;
                  I = z;
                  var J, O, P, N, T;
                  for (A = 20; A; --A)
                      if (T = this.e * Math.sin(I),
                      J = Math.sqrt(1 - T * T) * Math.tan(I),
                      O = this.a * l(this.e0, this.e1, this.e2, this.e3, I),
                      P = this.e0 - 2 * this.e1 * Math.cos(2 * I) + 4 * this.e2 * Math.cos(4 * I) - 6 * this.e3 * Math.cos(6 * I),
                      N = O / this.a,
                      C = (z * (J * N + 1) - N - .5 * J * (N * N + F)) / (this.es * Math.sin(2 * I) * (N * N + F - 2 * z * N) / (4 * J) + (z - N) * (J * P - 2 / Math.sin(2 * I)) - P),
                      I -= C,
                      1E-10 >= Math.abs(C)) {
                          B = I;
                          break
                      }
                  J = Math.sqrt(1 - this.es * Math.pow(Math.sin(B), 2)) * Math.tan(B);
                  y = h(this.long0 + Math.asin(y * J / this.a) / Math.sin(B))
              }
              return w.x = y,
              w.y = B,
              w
          }
          ;
          p.names = ["Polyconic", "poly"]
      }
      , {
          "../common/adjust_lat": 4,
          "../common/adjust_lon": 5,
          "../common/e0fn": 7,
          "../common/e1fn": 8,
          "../common/e2fn": 9,
          "../common/e3fn": 10,
          "../common/gN": 11,
          "../common/mlfn": 14
      }],
      58: [function(g, u, p) {
          var d = g("../common/adjust_lon")
            , m = g("../common/adjust_lat")
            , f = g("../common/pj_enfn")
            , q = g("../common/pj_mlfn")
            , h = g("../common/pj_inv_mlfn")
            , t = Math.PI / 2
            , l = g("../common/asinz");
          p.init = function() {
              this.sphere ? (this.n = 1,
              this.m = 0,
              this.es = 0,
              this.C_y = Math.sqrt((this.m + 1) / this.n),
              this.C_x = this.C_y / (this.m + 1)) : this.en = f(this.es)
          }
          ;
          p.forward = function(v) {
              var w = v.x;
              var y = v.y;
              if (w = d(w - this.long0),
              this.sphere) {
                  if (this.m)
                      for (var A = this.n * Math.sin(y), C = 20; C; --C) {
                          var B = (this.m * y + Math.sin(y) - A) / (this.m + Math.cos(y));
                          if (y -= B,
                          1E-10 > Math.abs(B))
                              break
                      }
                  else
                      y = 1 !== this.n ? Math.asin(this.n * Math.sin(y)) : y;
                  w = this.a * this.C_x * w * (this.m + Math.cos(y));
                  y *= this.a * this.C_y
              } else
                  A = Math.sin(y),
                  C = Math.cos(y),
                  y = this.a * q(y, A, C, this.en),
                  w = this.a * w * C / Math.sqrt(1 - this.es * A * A);
              return v.x = w,
              v.y = y,
              v
          }
          ;
          p.inverse = function(v) {
              var w, y, A, C;
              return v.x -= this.x0,
              A = v.x / this.a,
              v.y -= this.y0,
              w = v.y / this.a,
              this.sphere ? (w /= this.C_y,
              A /= this.C_x * (this.m + Math.cos(w)),
              this.m ? w = l((this.m * w + Math.sin(w)) / this.n) : 1 !== this.n && (w = l(Math.sin(w) / this.n)),
              A = d(A + this.long0),
              w = m(w)) : (w = h(v.y / this.a, this.es, this.en),
              C = Math.abs(w),
              t > C ? (C = Math.sin(w),
              y = this.long0 + v.x * Math.sqrt(1 - this.es * C * C) / (this.a * Math.cos(w)),
              A = d(y)) : t > C - 1E-10 && (A = this.long0)),
              v.x = A,
              v.y = w,
              v
          }
          ;
          p.names = ["Sinusoidal", "sinu"]
      }
      , {
          "../common/adjust_lat": 4,
          "../common/adjust_lon": 5,
          "../common/asinz": 6,
          "../common/pj_enfn": 17,
          "../common/pj_inv_mlfn": 18,
          "../common/pj_mlfn": 19
      }],
      59: [function(g, u, p) {
          p.init = function() {
              var d = this.lat0;
              this.lambda0 = this.long0;
              var m = Math.sin(d)
                , f = this.a
                , q = 1 / this.rf;
              q = 2 * q - Math.pow(q, 2);
              var h = this.e = Math.sqrt(q);
              this.R = this.k0 * f * Math.sqrt(1 - q) / (1 - q * Math.pow(m, 2));
              this.alpha = Math.sqrt(1 + q / (1 - q) * Math.pow(Math.cos(d), 4));
              this.b0 = Math.asin(m / this.alpha);
              this.K = Math.log(Math.tan(Math.PI / 4 + this.b0 / 2)) - this.alpha * Math.log(Math.tan(Math.PI / 4 + d / 2)) + this.alpha * h / 2 * Math.log((1 + h * m) / (1 - h * m))
          }
          ;
          p.forward = function(d) {
              var m = 2 * (Math.atan(Math.exp(-this.alpha * (Math.log(Math.tan(Math.PI / 4 - d.y / 2)) + this.e / 2 * Math.log((1 + this.e * Math.sin(d.y)) / (1 - this.e * Math.sin(d.y)))) + this.K)) - Math.PI / 4)
                , f = this.alpha * (d.x - this.lambda0)
                , q = Math.atan(Math.sin(f) / (Math.sin(this.b0) * Math.tan(m) + Math.cos(this.b0) * Math.cos(f)));
              m = Math.asin(Math.cos(this.b0) * Math.sin(m) - Math.sin(this.b0) * Math.cos(m) * Math.cos(f));
              return d.y = this.R / 2 * Math.log((1 + Math.sin(m)) / (1 - Math.sin(m))) + this.y0,
              d.x = this.R * q + this.x0,
              d
          }
          ;
          p.inverse = function(d) {
              var m = (d.x - this.x0) / this.R
                , f = 2 * (Math.atan(Math.exp((d.y - this.y0) / this.R)) - Math.PI / 4)
                , q = Math.asin(Math.cos(this.b0) * Math.sin(f) + Math.sin(this.b0) * Math.cos(f) * Math.cos(m));
              m = this.lambda0 + Math.atan(Math.sin(m) / (Math.cos(this.b0) * Math.cos(m) - Math.sin(this.b0) * Math.tan(f))) / this.alpha;
              for (var h = q, t = -1E3, l = 0; 1E-7 < Math.abs(h - t); ) {
                  if (20 < ++l)
                      return;
                  f = 1 / this.alpha * (Math.log(Math.tan(Math.PI / 4 + q / 2)) - this.K) + this.e * Math.log(Math.tan(Math.PI / 4 + Math.asin(this.e * Math.sin(h)) / 2));
                  t = h;
                  h = 2 * Math.atan(Math.exp(f)) - Math.PI / 2
              }
              return d.x = m,
              d.y = h,
              d
          }
          ;
          p.names = ["somerc"]
      }
      , {}],
      60: [function(g, u, p) {
          var d = Math.PI / 2
            , m = g("../common/sign")
            , f = g("../common/msfnz")
            , q = g("../common/tsfnz")
            , h = g("../common/phi2z")
            , t = g("../common/adjust_lon");
          p.ssfn_ = function(l, v, w) {
              return v *= w,
              Math.tan(.5 * (d + l)) * Math.pow((1 - v) / (1 + v), .5 * w)
          }
          ;
          p.init = function() {
              this.coslat0 = Math.cos(this.lat0);
              this.sinlat0 = Math.sin(this.lat0);
              this.sphere ? 1 === this.k0 && !isNaN(this.lat_ts) && 1E-10 >= Math.abs(this.coslat0) && (this.k0 = .5 * (1 + m(this.lat0) * Math.sin(this.lat_ts))) : (1E-10 >= Math.abs(this.coslat0) && (this.con = 0 < this.lat0 ? 1 : -1),
              this.cons = Math.sqrt(Math.pow(1 + this.e, 1 + this.e) * Math.pow(1 - this.e, 1 - this.e)),
              1 === this.k0 && !isNaN(this.lat_ts) && 1E-10 >= Math.abs(this.coslat0) && (this.k0 = .5 * this.cons * f(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) / q(this.e, this.con * this.lat_ts, this.con * Math.sin(this.lat_ts))),
              this.ms1 = f(this.e, this.sinlat0, this.coslat0),
              this.X0 = 2 * Math.atan(this.ssfn_(this.lat0, this.sinlat0, this.e)) - d,
              this.cosX0 = Math.cos(this.X0),
              this.sinX0 = Math.sin(this.X0))
          }
          ;
          p.forward = function(l) {
              var v, w, y, A, C, B, z = l.x, F = l.y, I = Math.sin(F), H = Math.cos(F), J = t(z - this.long0);
              return 1E-10 >= Math.abs(Math.abs(z - this.long0) - Math.PI) && 1E-10 >= Math.abs(F + this.lat0) ? (l.x = 0 / 0,
              l.y = 0 / 0,
              l) : this.sphere ? (v = 2 * this.k0 / (1 + this.sinlat0 * I + this.coslat0 * H * Math.cos(J)),
              l.x = this.a * v * H * Math.sin(J) + this.x0,
              l.y = this.a * v * (this.coslat0 * I - this.sinlat0 * H * Math.cos(J)) + this.y0,
              l) : (w = 2 * Math.atan(this.ssfn_(F, I, this.e)) - d,
              A = Math.cos(w),
              y = Math.sin(w),
              1E-10 >= Math.abs(this.coslat0) ? (C = q(this.e, F * this.con, this.con * I),
              B = 2 * this.a * this.k0 * C / this.cons,
              l.x = this.x0 + B * Math.sin(z - this.long0),
              l.y = this.y0 - this.con * B * Math.cos(z - this.long0),
              l) : (1E-10 > Math.abs(this.sinlat0) ? (v = 2 * this.a * this.k0 / (1 + A * Math.cos(J)),
              l.y = v * y) : (v = 2 * this.a * this.k0 * this.ms1 / (this.cosX0 * (1 + this.sinX0 * y + this.cosX0 * A * Math.cos(J))),
              l.y = v * (this.cosX0 * y - this.sinX0 * A * Math.cos(J)) + this.y0),
              l.x = v * A * Math.sin(J) + this.x0,
              l))
          }
          ;
          p.inverse = function(l) {
              l.x -= this.x0;
              l.y -= this.y0;
              var v, w, y = Math.sqrt(l.x * l.x + l.y * l.y);
              if (this.sphere) {
                  var A = 2 * Math.atan(y / (.5 * this.a * this.k0));
                  return v = this.long0,
                  w = this.lat0,
                  1E-10 >= y ? (l.x = v,
                  l.y = w,
                  l) : (w = Math.asin(Math.cos(A) * this.sinlat0 + l.y * Math.sin(A) * this.coslat0 / y),
                  v = t(1E-10 > Math.abs(this.coslat0) ? 0 < this.lat0 ? this.long0 + Math.atan2(l.x, -1 * l.y) : this.long0 + Math.atan2(l.x, l.y) : this.long0 + Math.atan2(l.x * Math.sin(A), y * this.coslat0 * Math.cos(A) - l.y * this.sinlat0 * Math.sin(A))),
                  l.x = v,
                  l.y = w,
                  l)
              }
              if (1E-10 >= Math.abs(this.coslat0)) {
                  if (1E-10 >= y)
                      return w = this.lat0,
                      v = this.long0,
                      l.x = v,
                      l.y = w,
                      l;
                  l.x *= this.con;
                  l.y *= this.con;
                  v = y * this.cons / (2 * this.a * this.k0);
                  w = this.con * h(this.e, v);
                  v = this.con * t(this.con * this.long0 + Math.atan2(l.x, -1 * l.y))
              } else
                  w = 2 * Math.atan(y * this.cosX0 / (2 * this.a * this.k0 * this.ms1)),
                  v = this.long0,
                  1E-10 >= y ? A = this.X0 : (A = Math.asin(Math.cos(w) * this.sinX0 + l.y * Math.sin(w) * this.cosX0 / y),
                  v = t(this.long0 + Math.atan2(l.x * Math.sin(w), y * this.cosX0 * Math.cos(w) - l.y * this.sinX0 * Math.sin(w)))),
                  w = -1 * h(this.e, Math.tan(.5 * (d + A)));
              return l.x = v,
              l.y = w,
              l
          }
          ;
          p.names = ["stere", "Stereographic_South_Pole", "Polar Stereographic (variant B)"]
      }
      , {
          "../common/adjust_lon": 5,
          "../common/msfnz": 15,
          "../common/phi2z": 16,
          "../common/sign": 21,
          "../common/tsfnz": 24
      }],
      61: [function(g, u, p) {
          var d = g("./gauss")
            , m = g("../common/adjust_lon");
          p.init = function() {
              d.init.apply(this);
              this.rc && (this.sinc0 = Math.sin(this.phic0),
              this.cosc0 = Math.cos(this.phic0),
              this.R2 = 2 * this.rc,
              this.title || (this.title = "Oblique Stereographic Alternative"))
          }
          ;
          p.forward = function(f) {
              var q, h, t, l;
              return f.x = m(f.x - this.long0),
              d.forward.apply(this, [f]),
              q = Math.sin(f.y),
              h = Math.cos(f.y),
              t = Math.cos(f.x),
              l = this.k0 * this.R2 / (1 + this.sinc0 * q + this.cosc0 * h * t),
              f.x = l * h * Math.sin(f.x),
              f.y = l * (this.cosc0 * q - this.sinc0 * h * t),
              f.x = this.a * f.x + this.x0,
              f.y = this.a * f.y + this.y0,
              f
          }
          ;
          p.inverse = function(f) {
              var q;
              if (f.x = (f.x - this.x0) / this.a,
              f.y = (f.y - this.y0) / this.a,
              f.x /= this.k0,
              f.y /= this.k0,
              q = Math.sqrt(f.x * f.x + f.y * f.y)) {
                  var h = 2 * Math.atan2(q, this.R2);
                  var t = Math.sin(h);
                  var l = Math.cos(h);
                  h = Math.asin(l * this.sinc0 + f.y * t * this.cosc0 / q);
                  t = Math.atan2(f.x * t, q * this.cosc0 * l - f.y * this.sinc0 * t)
              } else
                  h = this.phic0,
                  t = 0;
              return f.x = t,
              f.y = h,
              d.inverse.apply(this, [f]),
              f.x = m(f.x + this.long0),
              f
          }
          ;
          p.names = ["Stereographic_North_Pole", "Oblique_Stereographic", "Polar_Stereographic", "sterea", "Oblique Stereographic Alternative"]
      }
      , {
          "../common/adjust_lon": 5,
          "./gauss": 46
      }],
      62: [function(g, u, p) {
          var d = g("../common/e0fn")
            , m = g("../common/e1fn")
            , f = g("../common/e2fn")
            , q = g("../common/e3fn")
            , h = g("../common/mlfn")
            , t = g("../common/adjust_lon")
            , l = Math.PI / 2
            , v = g("../common/sign")
            , w = g("../common/asinz");
          p.init = function() {
              this.e0 = d(this.es);
              this.e1 = m(this.es);
              this.e2 = f(this.es);
              this.e3 = q(this.es);
              this.ml0 = this.a * h(this.e0, this.e1, this.e2, this.e3, this.lat0)
          }
          ;
          p.forward = function(y) {
              var A = y.y;
              var C = t(y.x - this.long0);
              var B = Math.sin(A);
              var z = Math.cos(A);
              if (this.sphere) {
                  var F = z * Math.sin(C);
                  if (1E-10 > Math.abs(Math.abs(F) - 1))
                      return 93;
                  var I = .5 * this.a * this.k0 * Math.log((1 + F) / (1 - F));
                  B = Math.acos(z * Math.cos(C) / Math.sqrt(1 - F * F));
                  0 > A && (B = -B);
                  A = this.a * this.k0 * (B - this.lat0)
              } else {
                  I = z * C;
                  C = Math.pow(I, 2);
                  z = this.ep2 * Math.pow(z, 2);
                  F = Math.tan(A);
                  var H = Math.pow(F, 2);
                  B = 1 - this.es * Math.pow(B, 2);
                  B = this.a / Math.sqrt(B);
                  A = this.a * h(this.e0, this.e1, this.e2, this.e3, A);
                  I = this.k0 * B * I * (1 + C / 6 * (1 - H + z + C / 20 * (5 - 18 * H + Math.pow(H, 2) + 72 * z - 58 * this.ep2))) + this.x0;
                  A = this.k0 * (A - this.ml0 + B * F * C * (.5 + C / 24 * (5 - H + 9 * z + 4 * Math.pow(z, 2) + C / 30 * (61 - 58 * H + Math.pow(H, 2) + 600 * z - 330 * this.ep2)))) + this.y0
              }
              return y.x = I,
              y.y = A,
              y
          }
          ;
          p.inverse = function(y) {
              var A;
              if (this.sphere) {
                  var C = Math.exp(y.x / (this.a * this.k0));
                  var B = .5 * (C - 1 / C);
                  var z = this.lat0 + y.y / (this.a * this.k0);
                  var F = Math.cos(z);
                  C = Math.sqrt((1 - F * F) / (1 + B * B));
                  C = w(C);
                  0 > z && (C = -C);
                  B = 0 === B && 0 === F ? this.long0 : t(Math.atan2(B, F) + this.long0)
              } else {
                  z = y.x - this.x0;
                  var I = y.y - this.y0;
                  B = C = (this.ml0 + I / this.k0) / this.a;
                  for (A = 0; F = (C + this.e1 * Math.sin(2 * B) - this.e2 * Math.sin(4 * B) + this.e3 * Math.sin(6 * B)) / this.e0 - B,
                  B += F,
                  !(1E-10 >= Math.abs(F)); A++)
                      if (6 <= A)
                          return 95;
                  if (Math.abs(B) < l) {
                      F = Math.cos(B);
                      var H = Math.tan(B);
                      A = this.ep2 * Math.pow(F, 2);
                      I = Math.pow(A, 2);
                      var J = Math.pow(H, 2)
                        , O = Math.pow(J, 2);
                      C = 1 - this.es * Math.pow(Math.sin(B), 2);
                      var P = this.a / Math.sqrt(C);
                      z /= P * this.k0;
                      var N = Math.pow(z, 2);
                      C = B - P * H * N / (P * (1 - this.es) / C) * (.5 - N / 24 * (5 + 3 * J + 10 * A - 4 * I - 9 * this.ep2 - N / 30 * (61 + 90 * J + 298 * A + 45 * O - 252 * this.ep2 - 3 * I)));
                      B = t(this.long0 + z * (1 - N / 6 * (1 + 2 * J + A - N / 20 * (5 - 2 * A + 28 * J - 3 * I + 8 * this.ep2 + 24 * O))) / F)
                  } else
                      C = l * v(I),
                      B = this.long0
              }
              return y.x = B,
              y.y = C,
              y
          }
          ;
          p.names = ["Transverse_Mercator", "Transverse Mercator", "tmerc"]
      }
      , {
          "../common/adjust_lon": 5,
          "../common/asinz": 6,
          "../common/e0fn": 7,
          "../common/e1fn": 8,
          "../common/e2fn": 9,
          "../common/e3fn": 10,
          "../common/mlfn": 14,
          "../common/sign": 21
      }],
      63: [function(g, u, p) {
          var d = g("./tmerc");
          p.dependsOn = "tmerc";
          p.init = function() {
              this.zone && (this.lat0 = 0,
              this.long0 = .017453292519943295 * (6 * Math.abs(this.zone) - 183),
              this.x0 = 5E5,
              this.y0 = this.utmSouth ? 1E7 : 0,
              this.k0 = .9996,
              d.init.apply(this),
              this.forward = d.forward,
              this.inverse = d.inverse)
          }
          ;
          p.names = ["Universal Transverse Mercator System", "utm"]
      }
      , {
          "./tmerc": 62
      }],
      64: [function(g, u, p) {
          var d = g("../common/adjust_lon")
            , m = Math.PI / 2
            , f = g("../common/asinz");
          p.init = function() {
              this.R = this.a
          }
          ;
          p.forward = function(q) {
              var h, t = q.y;
              var l = d(q.x - this.long0);
              1E-10 >= Math.abs(t) && (h = this.y0);
              var v = f(2 * Math.abs(t / Math.PI));
              (1E-10 >= Math.abs(l) || 1E-10 >= Math.abs(Math.abs(t) - m)) && (h = 0 <= t ? this.y0 + Math.PI * this.R * Math.tan(.5 * v) : this.y0 + Math.PI * this.R * -Math.tan(.5 * v));
              var w = .5 * Math.abs(Math.PI / l - l / Math.PI)
                , y = w * w
                , A = Math.sin(v);
              v = Math.cos(v);
              v /= A + v - 1;
              A = v * (2 / A - 1);
              var C = A * A
                , B = Math.PI * this.R * (w * (v - C) + Math.sqrt(y * (v - C) * (v - C) - (C + y) * (v * v - C))) / (C + y);
              0 > l && (B = -B);
              l = this.x0 + B;
              v = y + v;
              return B = Math.PI * this.R * (A * v - w * Math.sqrt((C + y) * (y + 1) - v * v)) / (C + y),
              h = 0 <= t ? this.y0 + B : this.y0 - B,
              q.x = l,
              q.y = h,
              q
          }
          ;
          p.inverse = function(q) {
              var h, t, l, v, w, y, A, C, B, z, F, I, H;
              return q.x -= this.x0,
              q.y -= this.y0,
              F = Math.PI * this.R,
              l = q.x / F,
              v = q.y / F,
              w = l * l + v * v,
              y = -Math.abs(v) * (1 + w),
              A = y - 2 * v * v + l * l,
              C = -2 * y + 1 + 2 * v * v + w * w,
              H = v * v / C + (2 * A * A * A / C / C / C - 9 * y * A / C / C) / 27,
              B = (y - A * A / 3 / C) / C,
              z = 2 * Math.sqrt(-B / 3),
              F = 3 * H / B / z,
              1 < Math.abs(F) && (F = 0 <= F ? 1 : -1),
              I = Math.acos(F) / 3,
              t = 0 <= q.y ? (-z * Math.cos(I + Math.PI / 3) - A / 3 / C) * Math.PI : -(-z * Math.cos(I + Math.PI / 3) - A / 3 / C) * Math.PI,
              h = 1E-10 > Math.abs(l) ? this.long0 : d(this.long0 + Math.PI * (w - 1 + Math.sqrt(1 + 2 * (l * l - v * v) + w * w)) / 2 / l),
              q.x = h,
              q.y = t,
              q
          }
          ;
          p.names = ["Van_der_Grinten_I", "VanDerGrinten", "vandg"]
      }
      , {
          "../common/adjust_lon": 5,
          "../common/asinz": 6
      }],
      65: [function(g, u, p) {
          var d = g("./datum_transform")
            , m = g("./adjust_axis")
            , f = g("./Proj")
            , q = g("./common/toPoint");
          u.exports = function w(t, l, v) {
              var y;
              return Array.isArray(v) && (v = q(v)),
              t.datum && l.datum && ((1 === t.datum.datum_type || 2 === t.datum.datum_type) && "WGS84" !== l.datumCode || (1 === l.datum.datum_type || 2 === l.datum.datum_type) && "WGS84" !== t.datumCode) && (y = new f("WGS84"),
              w(t, y, v),
              t = y),
              "enu" !== t.axis && m(t, !1, v),
              "longlat" === t.projName ? (v.x *= .017453292519943295,
              v.y *= .017453292519943295) : (t.to_meter && (v.x *= t.to_meter,
              v.y *= t.to_meter),
              t.inverse(v)),
              t.from_greenwich && (v.x += t.from_greenwich),
              v = d(t.datum, l.datum, v),
              l.from_greenwich && (v.x -= l.from_greenwich),
              "longlat" === l.projName ? (v.x *= 57.29577951308232,
              v.y *= 57.29577951308232) : (l.forward(v),
              l.to_meter && (v.x /= l.to_meter,
              v.y /= l.to_meter)),
              "enu" !== l.axis && m(l, !0, v),
              v
          }
      }
      , {
          "./Proj": 2,
          "./adjust_axis": 3,
          "./common/toPoint": 23,
          "./datum_transform": 31
      }],
      66: [function(g, u, p) {
          function d(l, v, w) {
              l[v] = w.map(function(y) {
                  var A = {};
                  return m(y, A),
                  A
              }).reduce(function(y, A) {
                  return t(y, A)
              }, {})
          }
          function m(l, v) {
              var w;
              return Array.isArray(l) ? (w = l.shift(),
              "PARAMETER" === w && (w = l.shift()),
              1 === l.length ? Array.isArray(l[0]) ? (v[w] = {},
              m(l[0], v[w])) : v[w] = l[0] : l.length ? "TOWGS84" === w ? v[w] = l : (v[w] = {},
              -1 < ["UNIT", "PRIMEM", "VERT_DATUM"].indexOf(w) ? (v[w] = {
                  name: l[0].toLowerCase(),
                  convert: l[1]
              },
              3 === l.length && (v[w].auth = l[2])) : "SPHEROID" === w ? (v[w] = {
                  name: l[0],
                  a: l[1],
                  rf: l[2]
              },
              4 === l.length && (v[w].auth = l[3])) : -1 < "GEOGCS GEOCCS DATUM VERT_CS COMPD_CS LOCAL_CS FITTED_CS LOCAL_DATUM".split(" ").indexOf(w) ? (l[0] = ["name", l[0]],
              d(v, w, l)) : l.every(function(y) {
                  return Array.isArray(y)
              }) ? d(v, w, l) : m(l, v[w])) : v[w] = !0,
              void 0) : void (v[l] = !0)
          }
          function f(l) {
              return l * h
          }
          function q(l) {
              function v(w) {
                  var y = l.to_meter || 1;
                  return parseFloat(w, 10) * y
              }
              "GEOGCS" === l.type ? l.projName = "longlat" : "LOCAL_CS" === l.type ? (l.projName = "identity",
              l.local = !0) : l.projName = "object" == typeof l.PROJECTION ? Object.keys(l.PROJECTION)[0] : l.PROJECTION;
              l.UNIT && (l.units = l.UNIT.name.toLowerCase(),
              "metre" === l.units && (l.units = "meter"),
              l.UNIT.convert && (l.to_meter = parseFloat(l.UNIT.convert, 10)));
              l.GEOGCS && (l.datumCode = l.GEOGCS.DATUM ? l.GEOGCS.DATUM.name.toLowerCase() : l.GEOGCS.name.toLowerCase(),
              "d_" === l.datumCode.slice(0, 2) && (l.datumCode = l.datumCode.slice(2)),
              ("new_zealand_geodetic_datum_1949" === l.datumCode || "new_zealand_1949" === l.datumCode) && (l.datumCode = "nzgd49"),
              "wgs_1984" === l.datumCode && ("Mercator_Auxiliary_Sphere" === l.PROJECTION && (l.sphere = !0),
              l.datumCode = "wgs84"),
              "_ferro" === l.datumCode.slice(-6) && (l.datumCode = l.datumCode.slice(0, -6)),
              "_jakarta" === l.datumCode.slice(-8) && (l.datumCode = l.datumCode.slice(0, -8)),
              ~l.datumCode.indexOf("belge") && (l.datumCode = "rnb72"),
              l.GEOGCS.DATUM && l.GEOGCS.DATUM.SPHEROID && (l.ellps = l.GEOGCS.DATUM.SPHEROID.name.replace("_19", "").replace(/[Cc]larke_18/, "clrk"),
              "international" === l.ellps.toLowerCase().slice(0, 13) && (l.ellps = "intl"),
              l.a = l.GEOGCS.DATUM.SPHEROID.a,
              l.rf = parseFloat(l.GEOGCS.DATUM.SPHEROID.rf, 10)),
              ~l.datumCode.indexOf("osgb_1936") && (l.datumCode = "osgb36"));
              l.b && !isFinite(l.b) && (l.b = l.a);
              [["standard_parallel_1", "Standard_Parallel_1"], ["standard_parallel_2", "Standard_Parallel_2"], ["false_easting", "False_Easting"], ["false_northing", "False_Northing"], ["central_meridian", "Central_Meridian"], ["latitude_of_origin", "Latitude_Of_Origin"], ["latitude_of_origin", "Central_Parallel"], ["scale_factor", "Scale_Factor"], ["k0", "scale_factor"], ["latitude_of_center", "Latitude_of_center"], ["lat0", "latitude_of_center", f], ["longitude_of_center", "Longitude_Of_Center"], ["longc", "longitude_of_center", f], ["x0", "false_easting", v], ["y0", "false_northing", v], ["long0", "central_meridian", f], ["lat0", "latitude_of_origin", f], ["lat0", "standard_parallel_1", f], ["lat1", "standard_parallel_1", f], ["lat2", "standard_parallel_2", f], ["alpha", "azimuth", f], ["srsCode", "name"]].forEach(function(w) {
                  var y = w[0]
                    , A = w[1];
                  !(y in l) && A in l && (l[y] = l[A],
                  3 === w.length && (l[y] = w[2](l[y])))
              });
              l.long0 || !l.longc || "Albers_Conic_Equal_Area" !== l.projName && "Lambert_Azimuthal_Equal_Area" !== l.projName || (l.long0 = l.longc);
              l.lat_ts || !l.lat1 || "Stereographic_South_Pole" !== l.projName && "Polar Stereographic (variant B)" !== l.projName || (l.lat0 = (0 < l.lat1 ? 90 : -90) * h,
              l.lat_ts = l.lat1)
          }
          var h = .017453292519943295
            , t = g("./extend");
          u.exports = function(l, v) {
              l = JSON.parse(("," + l).replace(/\s*,\s*([A-Z_0-9]+?)(\[)/g, ',["$1",').slice(1).replace(/\s*,\s*([A-Z_0-9]+?)\]/g, ',"$1"]').replace(/,\["VERTCS".+/, ""));
              var w = l.shift()
                , y = l.shift();
              l.unshift(["name", y]);
              l.unshift(["type", w]);
              l.unshift("output");
              w = {};
              return m(l, w),
              q(w.output),
              t(v, w.output)
          }
      }
      , {
          "./extend": 34
      }],
      67: [function(g, u, p) {
          function d(B) {
              var z = B.easting
                , F = B.zoneNumber;
              if (0 > F || 60 < F)
                  return null;
              var I = (1 - Math.sqrt(.99330562)) / (1 + Math.sqrt(.99330562));
              var H = B.northing;
              "N" > B.zoneLetter && (H -= 1E7);
              H = H / .9996 / 6367449.145945056;
              var J = H + (3 * I / 2 - 27 * I * I * I / 32) * Math.sin(2 * H) + (21 * I * I / 16 - 55 * I * I * I * I / 32) * Math.sin(4 * H) + 151 * I * I * I / 96 * Math.sin(6 * H);
              var O = 6378137 / Math.sqrt(1 - .00669438 * Math.sin(J) * Math.sin(J));
              I = Math.tan(J) * Math.tan(J);
              H = .006739496752268451 * Math.cos(J) * Math.cos(J);
              var P = 6335439.32722994 / Math.pow(1 - .00669438 * Math.sin(J) * Math.sin(J), 1.5);
              z = (z - 5E5) / (.9996 * O);
              O = J - O * Math.tan(J) / P * (z * z / 2 - (5 + 3 * I + 10 * H - 4 * H * H - .06065547077041606) * z * z * z * z / 24 + (61 + 90 * I + 298 * H + 45 * I * I - 1.6983531815716497 - 3 * H * H) * z * z * z * z * z * z / 720);
              O = O / Math.PI * 180;
              z = (z - (1 + 2 * I + H) * z * z * z / 6 + (5 - 2 * H + 28 * I - 3 * H * H + .05391597401814761 + 24 * I * I) * z * z * z * z * z / 120) / Math.cos(J);
              z = 6 * (F - 1) - 180 + 3 + z / Math.PI * 180;
              B.accuracy ? (B = d({
                  northing: B.northing + B.accuracy,
                  easting: B.easting + B.accuracy,
                  zoneLetter: B.zoneLetter,
                  zoneNumber: B.zoneNumber
              }),
              B = {
                  top: B.lat,
                  right: B.lon,
                  bottom: O,
                  left: z
              }) : B = {
                  lat: O,
                  lon: z
              };
              return B
          }
          function m(B) {
              B %= h;
              return 0 === B && (B = h),
              B
          }
          function f(B) {
              if (B && 0 === B.length)
                  throw "MGRSPoint coverting from nothing";
              for (var z, F = B.length, I, H = "", J = 0; !/[A-Z]/.test(z = B.charAt(J)); ) {
                  if (2 <= J)
                      throw "MGRSPoint bad conversion from: " + B;
                  H += z;
                  J++
              }
              z = parseInt(H, 10);
              if (0 === J || J + 3 > F)
                  throw "MGRSPoint bad conversion from: " + B;
              H = B.charAt(J++);
              if ("A" >= H || "B" === H || "Y" === H || "Z" <= H || "I" === H || "O" === H)
                  throw "MGRSPoint zone letter " + H + " not handled: " + B;
              I = B.substring(J, J += 2);
              var O = m(z);
              var P = I.charAt(0);
              for (var N = t.charCodeAt(O - 1), T = 1E5, U = !1; N !== P.charCodeAt(0); ) {
                  if (N++,
                  N === w && N++,
                  N === y && N++,
                  N > C) {
                      if (U)
                          throw "Bad character: " + P;
                      N = v;
                      U = !0
                  }
                  T += 1E5
              }
              P = T;
              I = I.charAt(1);
              if ("V" < I)
                  throw "MGRSPoint given invalid Northing " + I;
              O = l.charCodeAt(O - 1);
              N = 0;
              for (T = !1; O !== I.charCodeAt(0); ) {
                  if (O++,
                  O === w && O++,
                  O === y && O++,
                  O > A) {
                      if (T)
                          throw "Bad character: " + I;
                      O = v;
                      T = !0
                  }
                  N += 1E5
              }
              for (O = N; O < q(H); )
                  O += 2E6;
              F -= J;
              if (0 !== F % 2)
                  throw "MGRSPoint has to have an even number \nof digits after the zone letter and two 100km letters - front \nhalf for easting meters, second half for \nnorthing meters" + B;
              var W, ka, fa, ma, pa;
              F /= 2;
              N = I = 0;
              return 0 < F && (W = 1E5 / Math.pow(10, F),
              ka = B.substring(J, J + F),
              I = parseFloat(ka) * W,
              fa = B.substring(J + F),
              N = parseFloat(fa) * W),
              ma = I + P,
              pa = N + O,
              {
                  easting: ma,
                  northing: pa,
                  zoneLetter: H,
                  zoneNumber: z,
                  accuracy: W
              }
          }
          function q(B) {
              switch (B) {
              case "C":
                  var z = 11E5;
                  break;
              case "D":
                  z = 2E6;
                  break;
              case "E":
                  z = 28E5;
                  break;
              case "F":
                  z = 37E5;
                  break;
              case "G":
                  z = 46E5;
                  break;
              case "H":
                  z = 55E5;
                  break;
              case "J":
                  z = 64E5;
                  break;
              case "K":
                  z = 73E5;
                  break;
              case "L":
                  z = 82E5;
                  break;
              case "M":
                  z = 91E5;
                  break;
              case "N":
                  z = 0;
                  break;
              case "P":
                  z = 8E5;
                  break;
              case "Q":
                  z = 17E5;
                  break;
              case "R":
                  z = 26E5;
                  break;
              case "S":
                  z = 35E5;
                  break;
              case "T":
                  z = 44E5;
                  break;
              case "U":
                  z = 53E5;
                  break;
              case "V":
                  z = 62E5;
                  break;
              case "W":
                  z = 7E6;
                  break;
              case "X":
                  z = 79E5;
                  break;
              default:
                  z = -1
              }
              if (0 <= z)
                  return z;
              throw "Invalid zone letter: " + B;
          }
          var h = 6
            , t = "AJSAJS"
            , l = "AFAFAF"
            , v = 65
            , w = 73
            , y = 79
            , A = 86
            , C = 90;
          p.forward = function(B, z) {
              var F = B[1];
              var I = B[0];
              var H = Math.PI / 180 * F;
              var J = Math.PI / 180 * I;
              B = Math.floor((I + 180) / 6) + 1;
              180 === I && (B = 60);
              56 <= F && 64 > F && 3 <= I && 12 > I && (B = 32);
              72 <= F && 84 > F && (0 <= I && 9 > I ? B = 31 : 9 <= I && 21 > I ? B = 33 : 21 <= I && 33 > I ? B = 35 : 33 <= I && 42 > I && (B = 37));
              var O = Math.PI / 180 * (6 * (B - 1) - 180 + 3);
              I = 6378137 / Math.sqrt(1 - .00669438 * Math.sin(H) * Math.sin(H));
              var P = Math.tan(H) * Math.tan(H);
              var N = .006739496752268451 * Math.cos(H) * Math.cos(H);
              J = Math.cos(H) * (J - O);
              H = .9996 * (6378137 * (.9983242984503243 * H - .002514607064228144 * Math.sin(2 * H) + 2.639046602129982E-6 * Math.sin(4 * H) - 3.4180461016968582E-9 * Math.sin(6 * H)) + I * Math.tan(H) * (J * J / 2 + (5 - P + 9 * N + 4 * N * N) * J * J * J * J / 24 + (61 - 58 * P + P * P + 600 * N - 2.2240339282485886) * J * J * J * J * J * J / 720));
              0 > F && (H += 1E7);
              H = Math.round(H);
              N = Math.round(.9996 * I * (J + (1 - P + N) * J * J * J / 6 + (5 - 18 * P + P * P + 72 * N - .39089081163157013) * J * J * J * J * J / 120) + 5E5);
              P = "Z";
              I = (84 >= F && 72 <= F ? P = "X" : 72 > F && 64 <= F ? P = "W" : 64 > F && 56 <= F ? P = "V" : 56 > F && 48 <= F ? P = "U" : 48 > F && 40 <= F ? P = "T" : 40 > F && 32 <= F ? P = "S" : 32 > F && 24 <= F ? P = "R" : 24 > F && 16 <= F ? P = "Q" : 16 > F && 8 <= F ? P = "P" : 8 > F && 0 <= F ? P = "N" : 0 > F && -8 <= F ? P = "M" : -8 > F && -16 <= F ? P = "L" : -16 > F && -24 <= F ? P = "K" : -24 > F && -32 <= F ? P = "J" : -32 > F && -40 <= F ? P = "H" : -40 > F && -48 <= F ? P = "G" : -48 > F && -56 <= F ? P = "F" : -56 > F && -64 <= F ? P = "E" : -64 > F && -72 <= F ? P = "D" : -72 > F && -80 <= F && (P = "C"),
              P);
              P = H;
              H = N;
              N = B;
              z = z || 5;
              B = "00000" + H;
              F = "00000" + P;
              I = N + I;
              J = m(N);
              N = Math.floor(H / 1E5);
              H = Math.floor(P / 1E5) % 20;
              --J;
              P = t.charCodeAt(J);
              J = l.charCodeAt(J);
              N = P + N - 1;
              H = J + H;
              O = !1;
              N > C && (N = N - C + v - 1,
              O = !0);
              (N === w || w > P && N > w || (N > w || w > P) && O) && N++;
              (N === y || y > P && N > y || (N > y || y > P) && O) && (N++,
              N === w && N++);
              N > C && (N = N - C + v - 1);
              H > A ? (H = H - A + v - 1,
              O = !0) : O = !1;
              (H === w || w > J && H > w || (H > w || w > J) && O) && H++;
              (H === y || y > J && H > y || (H > y || y > J) && O) && (H++,
              H === w && H++);
              H > A && (H = H - A + v - 1);
              P = String.fromCharCode(N) + String.fromCharCode(H);
              return I + P + B.substr(B.length - 5, z) + F.substr(F.length - 5, z)
          }
          ;
          p.inverse = function(B) {
              B = d(f(B.toUpperCase()));
              return B.lat && B.lon ? [B.lon, B.lat, B.lon, B.lat] : [B.left, B.bottom, B.right, B.top]
          }
          ;
          p.toPoint = function(B) {
              B = d(f(B.toUpperCase()));
              return B.lat && B.lon ? [B.lon, B.lat] : [(B.left + B.right) / 2, (B.top + B.bottom) / 2]
          }
      }
      , {}],
      68: [function(g, u, p) {
          u.exports = {
              name: "proj4",
              version: "2.3.10",
              description: "Proj4js is a JavaScript library to transform point coordinates from one coordinate system to another, including datum transformations.",
              main: "lib/index.js",
              directories: {
                  test: "test",
                  doc: "docs"
              },
              scripts: {
                  test: "./node_modules/istanbul/lib/cli.js test ./node_modules/mocha/bin/_mocha test/test.js"
              },
              repository: {
                  type: "git",
                  url: "git://github.com/proj4js/proj4js.git"
              },
              author: "",
              license: "MIT",
              jam: {
                  main: "dist/proj4.js",
                  include: ["dist/proj4.js", "README.md", "AUTHORS", "LICENSE.md"]
              },
              devDependencies: {
                  "grunt-cli": "~0.1.13",
                  grunt: "~0.4.2",
                  "grunt-contrib-connect": "~0.6.0",
                  "grunt-contrib-jshint": "~0.8.0",
                  chai: "~1.8.1",
                  mocha: "~1.17.1",
                  "grunt-mocha-phantomjs": "~0.4.0",
                  browserify: "~3.24.5",
                  "grunt-browserify": "~1.3.0",
                  "grunt-contrib-uglify": "~0.3.2",
                  curl: "git://github.com/cujojs/curl.git",
                  istanbul: "~0.2.4",
                  tin: "~0.4.0"
              },
              dependencies: {
                  mgrs: "~0.0.2"
              }
          }
      }
      , {}],
      "./includedProjections": [function(g, u, p) {
          u.exports = g("hTEDpn")
      }
      , {}],
      hTEDpn: [function(g, u, p) {
          var d = [g("./lib/projections/tmerc"), g("./lib/projections/utm"), g("./lib/projections/sterea"), g("./lib/projections/stere"), g("./lib/projections/somerc"), g("./lib/projections/omerc"), g("./lib/projections/lcc"), g("./lib/projections/krovak"), g("./lib/projections/cass"), g("./lib/projections/laea"), g("./lib/projections/aea"), g("./lib/projections/gnom"), g("./lib/projections/cea"), g("./lib/projections/eqc"), g("./lib/projections/poly"), g("./lib/projections/nzmg"), g("./lib/projections/mill"), g("./lib/projections/sinu"), g("./lib/projections/moll"), g("./lib/projections/eqdc"), g("./lib/projections/vandg"), g("./lib/projections/aeqd")];
          u.exports = function(m) {
              d.forEach(function(f) {
                  m.Proj.projections.add(f)
              })
          }
      }
      , {
          "./lib/projections/aea": 40,
          "./lib/projections/aeqd": 41,
          "./lib/projections/cass": 42,
          "./lib/projections/cea": 43,
          "./lib/projections/eqc": 44,
          "./lib/projections/eqdc": 45,
          "./lib/projections/gnom": 47,
          "./lib/projections/krovak": 48,
          "./lib/projections/laea": 49,
          "./lib/projections/lcc": 50,
          "./lib/projections/mill": 53,
          "./lib/projections/moll": 54,
          "./lib/projections/nzmg": 55,
          "./lib/projections/omerc": 56,
          "./lib/projections/poly": 57,
          "./lib/projections/sinu": 58,
          "./lib/projections/somerc": 59,
          "./lib/projections/stere": 60,
          "./lib/projections/sterea": 61,
          "./lib/projections/tmerc": 62,
          "./lib/projections/utm": 63,
          "./lib/projections/vandg": 64
      }]
  }, {}, [36])(36)
});
(function(c) {
  if ("function" === typeof define && define.amd)
      define(["leaflet", "proj4"], c);
  else if ("object" === typeof module && "object" === typeof module.exports) {
      var g = require("leaflet");
      var u = require("proj4");
      module.exports = c(g, u)
  } else {
      if ("undefined" === typeof window.L || "undefined" === typeof window.proj4)
          throw "Leaflet and proj4 must be loaded first";
      c(window.L, window.proj4)
  }
}
)(function(c, g) {
  c.Proj = {};
  c.Proj._isProj4Obj = function(u) {
      return "undefined" !== typeof u.inverse && "undefined" !== typeof u.forward
  }
  ;
  c.Proj.Projection = c.Class.extend({
      initialize: function(u, p, d) {
          var m = c.Proj._isProj4Obj(u);
          this._proj = m ? u : this._projFromCodeDef(u, p);
          this.bounds = m ? p : d
      },
      project: function(u) {
          u = this._proj.forward([u.lng, u.lat]);
          return new c.Point(u[0],u[1])
      },
      unproject: function(u, p) {
          u = this._proj.inverse([u.x, u.y]);
          return new c.LatLng(u[1],u[0],p)
      },
      _projFromCodeDef: function(u, p) {
          if (p)
              g.defs(u, p);
          else if (void 0 === g.defs[u] && (p = u.split(":"),
          3 < p.length && (u = p[p.length - 3] + ":" + p[p.length - 1]),
          void 0 === g.defs[u]))
              throw "No projection definition for code " + u;
          return g(u)
      }
  });
  c.Proj.CRS = c.Class.extend({
      includes: c.CRS,
      options: {
          transformation: new c.Transformation(1,0,-1,0)
      },
      initialize: function(u, p, d) {
          if (c.Proj._isProj4Obj(u)) {
              var m = u.srsCode;
              d = p || {};
              this.projection = new c.Proj.Projection(u,d.bounds)
          } else
              m = u,
              d = d || {},
              this.projection = new c.Proj.Projection(m,p,d.bounds);
          c.Util.setOptions(this, d);
          this.code = m;
          this.transformation = this.options.transformation;
          this.options.origin && (this.transformation = new c.Transformation(1,-this.options.origin[0],-1,this.options.origin[1]));
          if (this.options.scales)
              this._scales = this.options.scales;
          else if (this.options.resolutions)
              for (this._scales = [],
              u = this.options.resolutions.length - 1; 0 <= u; u--)
                  this.options.resolutions[u] && (this._scales[u] = 1 / this.options.resolutions[u]);
          this.infinite = !this.options.bounds
      },
      scale: function(u) {
          var p = Math.floor(u);
          if (u === p)
              return this._scales[u];
          var d = this._scales[p];
          return d + (this._scales[p + 1] - d) * (u - p)
      },
      zoom: function(u) {
          var p = this._closestElement(this._scales, u)
            , d = this._scales.indexOf(p);
          return u === p ? d : (u - p) / (this._scales[d + 1] - p) + d
      },
      _closestElement: function(u, p) {
          for (var d, m = u.length; m--; )
              u[m] <= p && (void 0 === d || d < u[m]) && (d = u[m]);
          return d
      }
  });
  c.Proj.GeoJSON = c.GeoJSON.extend({
      initialize: function(u, p) {
          this._callLevel = 0;
          c.GeoJSON.prototype.initialize.call(this, u, p)
      },
      addData: function(u) {
          var p;
          u && (u.crs && "name" === u.crs.type ? p = new c.Proj.CRS(u.crs.properties.name) : u.crs && u.crs.type && (p = new c.Proj.CRS(u.crs.type + ":" + u.crs.properties.code)),
          void 0 !== p && (this.options.coordsToLatLng = function(d) {
              d = c.point(d[0], d[1]);
              return p.projection.unproject(d)
          }
          ));
          this._callLevel++;
          try {
              c.GeoJSON.prototype.addData.call(this, u)
          } finally {
              this._callLevel--,
              0 === this._callLevel && delete this.options.coordsToLatLng
          }
      }
  });
  c.Proj.geoJson = function(u, p) {
      return new c.Proj.GeoJSON(u,p)
  }
  ;
  return c.Proj
});
(function(c, g) {
  if ("function" === typeof define && define.amd)
      define(["leaflet"], c);
  else if ("undefined" !== typeof module)
      module.exports = g.L ? c(g.L) : c(require("leaflet"));
  else {
      if ("undefined" === typeof g.L)
          throw "Leaflet must be loaded first.";
      g.L = c(g.L)
  }
}
)(function(c) {
  c.TileLayer.MML = c.TileLayer.extend({
      options: {
          attribution: '&copy; <a href="http://www.maanmittauslaitos.fi/avoindata_lisenssi_versio1_20120501"target=new>Maanmittauslaitos</a>'
      },
      statics: {
          get3067Proj: function() {
              return new c.Proj.CRS("EPSG:3067","+proj=utm +zone=35 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs",{
                  origin: [-548576, 8388608],
                  bounds: c.bounds([-548576, 8388608], [1548576, 6291456]),
                  resolutions: [8192, 4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, .5, .25, .125, .0625, .03125, .015625]
              })
          }
      },
      urls: {
          peruskartta: "http://tiles.kartat.kapsi.fi/peruskartta/{z}/{x}/{y}.jpg",
          taustakartta: "http://tiles.kartat.kapsi.fi/taustakartta/{z}/{x}/{y}.jpg",
          ortokuva: "http://tiles.kartat.kapsi.fi/ortokuva/{z}/{x}/{y}.jpg",
          peruskartta_3067: "http://tiles.kartat.kapsi.fi/peruskartta_3067/{z}/{x}/{y}.jpg",
          taustakartta_3067: "http://tiles.kartat.kapsi.fi/taustakartta_3067/{z}/{x}/{y}.jpg",
          ortokuva_3067: "http://tiles.kartat.kapsi.fi/ortokuva_3067/{z}/{x}/{y}.jpg"
      },
      initialize: function(g, u) {
          c.setOptions(this, u);
          var p = this.urls[g.toLowerCase()];
          if (-1 != g.indexOf("3067") && void 0 === c.Proj)
              throw "Use of EPSG:3067 layers requires Proj4Leaflet plugin.";
          c.TileLayer.prototype.initialize.call(this, p, u)
      }
  });
  c.tileLayer.mml = function(g, u) {
      return new c.TileLayer.MML(g,u)
  }
  ;
  c.TileLayer.MML_WMTS = c.TileLayer.extend({
      options: {
          style: "default",
          maxZoom: 15,
          minZoom: 0,
          attribution: '&copy; <a href="http://www.maanmittauslaitos.fi/avoindata_lisenssi_versio1_20120501"target=new>Maanmittauslaitos</a>'
      }
  });
  c.tileLayer.mml_wmts = function(g) {
      return new c.TileLayer.MML_WMTS("https://avoin-karttakuva.maanmittauslaitos.fi/avoin/wmts/1.0.0/" + (g.layer || "taustakartta") + "/default/ETRS-TM35FIN/{z}/{y}/{x}.png",g)
  }
  ;
  return c
}, window);
/*
jQuery UI Touch Punch 0.2.3

Copyright 2011?2014, Dave Furfero
Dual licensed under the MIT or GPL Version 2 licenses.

Depends:
jquery.ui.widget.js
jquery.ui.mouse.js
*/
!function(c) {
  function g(f, q) {
      if (!(1 < f.originalEvent.touches.length)) {
          f.preventDefault();
          var h = f.originalEvent.changedTouches[0]
            , t = document.createEvent("MouseEvents");
          t.initMouseEvent(q, !0, !0, window, 1, h.screenX, h.screenY, h.clientX, h.clientY, !1, !1, !1, !1, 0, null);
          f.target.dispatchEvent(t)
      }
  }
  if (c.support.touch = "ontouchend"in document,
  c.support.touch) {
      var u, p = c.ui.mouse.prototype, d = p._mouseInit, m = p._mouseDestroy;
      p._touchStart = function(f) {
          !u && this._mouseCapture(f.originalEvent.changedTouches[0]) && (u = !0,
          this._touchMoved = !1,
          g(f, "mouseover"),
          g(f, "mousemove"),
          g(f, "mousedown"))
      }
      ;
      p._touchMove = function(f) {
          u && (this._touchMoved = !0,
          g(f, "mousemove"))
      }
      ;
      p._touchEnd = function(f) {
          u && (g(f, "mouseup"),
          g(f, "mouseout"),
          this._touchMoved || g(f, "click"),
          u = !1)
      }
      ;
      p._mouseInit = function() {
          this.element.bind({
              touchstart: c.proxy(this, "_touchStart"),
              touchmove: c.proxy(this, "_touchMove"),
              touchend: c.proxy(this, "_touchEnd")
          });
          d.call(this)
      }
      ;
      p._mouseDestroy = function() {
          this.element.unbind({
              touchstart: c.proxy(this, "_touchStart"),
              touchmove: c.proxy(this, "_touchMove"),
              touchend: c.proxy(this, "_touchEnd")
          });
          m.call(this)
      }
  }
}(jQuery);
!function(c, g) {
  "object" == typeof exports ? module.exports = g() : "function" == typeof define && define.amd ? define(g) : c.Spinner = g()
}(this, function() {
  function c(C, B) {
      var z;
      C = document.createElement(C || "div");
      for (z in B)
          C[z] = B[z];
      return C
  }
  function g(C) {
      for (var B = 1, z = arguments.length; z > B; B++)
          C.appendChild(arguments[B]);
      return C
  }
  function u(C, B, z, F) {
      var I = ["opacity", B, ~~(100 * C), z, F].join("-");
      z = .01 + z / F * 100;
      F = Math.max(1 - (1 - C) / B * (100 - z), C);
      var H = t.substring(0, t.indexOf("Animation")).toLowerCase();
      return v[I] || (w.insertRule("@" + (H && "-" + H + "-" || "") + "keyframes " + I + "{0%{opacity:" + F + "}" + z + "%{opacity:" + C + "}" + (z + .01) + "%{opacity:1}" + (z + B) % 100 + "%{opacity:" + C + "}100%{opacity:" + F + "}}", w.cssRules.length),
      v[I] = 1),
      I
  }
  function p(C, B) {
      var z, F = C.style;
      B = B.charAt(0).toUpperCase() + B.slice(1);
      for (C = 0; C < l.length; C++)
          if (z = l[C] + B,
          void 0 !== F[z])
              return z;
      return void 0 !== F[B] ? B : void 0
  }
  function d(C, B) {
      for (var z in B)
          C.style[p(C, z) || z] = B[z];
      return C
  }
  function m(C) {
      for (var B = 1; B < arguments.length; B++) {
          var z = arguments[B], F;
          for (F in z)
              void 0 === C[F] && (C[F] = z[F])
      }
      return C
  }
  function f(C, B) {
      return "string" == typeof C ? C : C[B % C.length]
  }
  function q(C) {
      this.opts = m(C || {}, q.defaults, y)
  }
  function h() {
      function C(B, z) {
          return c("<" + B + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', z)
      }
      w.addRule(".spin-vml", "behavior:url(#default#VML)");
      q.prototype.lines = function(B, z) {
          function F() {
              return d(C("group", {
                  coordsize: J + " " + J,
                  coordorigin: -H + " " + -H
              }), {
                  width: J,
                  height: J
              })
          }
          function I(N, T, U) {
              g(P, g(d(F(), {
                  rotation: 360 / z.lines * N + "deg",
                  left: ~~T
              }), g(d(C("roundrect", {
                  arcsize: z.corners
              }), {
                  width: H,
                  height: z.width,
                  left: z.radius,
                  top: -z.width >> 1,
                  filter: U
              }), C("fill", {
                  color: f(z.color, N),
                  opacity: z.opacity
              }), C("stroke", {
                  opacity: 0
              }))))
          }
          var H = z.length + z.width
            , J = 2 * H;
          var O = 2 * -(z.width + z.length) + "px";
          var P = d(F(), {
              position: "absolute",
              top: O,
              left: O
          });
          if (z.shadow)
              for (O = 1; O <= z.lines; O++)
                  I(O, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
          for (O = 1; O <= z.lines; O++)
              I(O);
          return g(B, P)
      }
      ;
      q.prototype.opacity = function(B, z, F, I) {
          B = B.firstChild;
          I = I.shadow && I.lines || 0;
          B && z + I < B.childNodes.length && (B = B.childNodes[z + I],
          B = B && B.firstChild,
          B = B && B.firstChild,
          B && (B.opacity = F))
      }
  }
  var t, l = ["webkit", "Moz", "ms", "O"], v = {}, w = function() {
      var C = c("style", {
          type: "text/css"
      });
      return g(document.getElementsByTagName("head")[0], C),
      C.sheet || C.styleSheet
  }(), y = {
      lines: 12,
      length: 7,
      width: 5,
      radius: 10,
      rotate: 0,
      corners: 1,
      color: "#000",
      direction: 1,
      speed: 1,
      trail: 100,
      opacity: .25,
      fps: 20,
      zIndex: 2E9,
      className: "spinner",
      top: "50%",
      left: "50%",
      position: "absolute"
  };
  q.defaults = {};
  m(q.prototype, {
      spin: function(C) {
          this.stop();
          var B = this
            , z = B.opts
            , F = B.el = d(c(0, {
              className: z.className
          }), {
              position: z.position,
              width: 0,
              zIndex: z.zIndex
          });
          z.radius + z.length + z.width;
          if (d(F, {
              left: z.left,
              top: z.top
          }),
          C && C.insertBefore(F, C.firstChild || null),
          F.setAttribute("role", "progressbar"),
          B.lines(F, B.opts),
          !t) {
              var I, H = 0, J = (z.lines - 1) * (1 - z.direction) / 2, O = z.fps, P = O / z.speed, N = (1 - z.opacity) / (P * z.trail / 100), T = P / z.lines;
              !function W() {
                  H++;
                  for (var ka = 0; ka < z.lines; ka++)
                      I = Math.max(1 - (H + (z.lines - ka) * T) % P * N, z.opacity),
                      B.opacity(F, ka * z.direction + J, I, z);
                  B.timeout = B.el && setTimeout(W, ~~(1E3 / O))
              }()
          }
          return B
      },
      stop: function() {
          var C = this.el;
          return C && (clearTimeout(this.timeout),
          C.parentNode && C.parentNode.removeChild(C),
          this.el = void 0),
          this
      },
      lines: function(C, B) {
          function z(J, O) {
              return d(c(), {
                  position: "absolute",
                  width: B.length + B.width + "px",
                  height: B.width + "px",
                  background: J,
                  boxShadow: O,
                  transformOrigin: "left",
                  transform: "rotate(" + ~~(360 / B.lines * I + B.rotate) + "deg) translate(" + B.radius + "px,0)",
                  borderRadius: (B.corners * B.width >> 1) + "px"
              })
          }
          for (var F, I = 0, H = (B.lines - 1) * (1 - B.direction) / 2; I < B.lines; I++)
              F = d(c(), {
                  position: "absolute",
                  top: 1 + ~(B.width / 2) + "px",
                  transform: B.hwaccel ? "translate3d(0,0,0)" : "",
                  opacity: B.opacity,
                  animation: t && u(B.opacity, B.trail, H + I * B.direction, B.lines) + " " + 1 / B.speed + "s linear infinite"
              }),
              B.shadow && g(F, d(z("#000", "0 0 4px #000"), {
                  top: "2px"
              })),
              g(C, g(F, z(f(B.color, I), "0 0 1px rgba(0,0,0,.1)")));
          return C
      },
      opacity: function(C, B, z) {
          B < C.childNodes.length && (C.childNodes[B].style.opacity = z)
      }
  });
  var A = d(c("group"), {
      behavior: "url(#default#VML)"
  });
  return !p(A, "transform") && A.adj ? h() : t = p(A, "animation"),
  q
});
(function(c) {
  var g = function() {
      var h = {
          showEvent: "click",
          onShow: function() {},
          onBeforeShow: function() {},
          onHide: function() {},
          onChange: function() {},
          onSubmit: function() {},
          colorScheme: "light",
          color: "3289c7",
          livePreview: !0,
          flat: !1,
          layout: "full",
          submit: 1,
          submitText: "OK",
          height: 156
      }
        , t = function(E, M) {
          E = m(E);
          c(M).data("colpick").fields.eq(1).val(E.r).end().eq(2).val(E.g).end().eq(3).val(E.b).end()
      }
        , l = function(E, M) {
          c(M).data("colpick").fields.eq(4).val(Math.round(E.h)).end().eq(5).val(Math.round(E.s)).end().eq(6).val(Math.round(E.b)).end()
      }
        , v = function(E, M) {
          c(M).data("colpick").fields.eq(0).val(q(E))
      }
        , w = function(E, M) {
          c(M).data("colpick").selector.css("backgroundColor", "#" + q({
              h: E.h,
              s: 100,
              b: 100
          }));
          c(M).data("colpick").selectorIndic.css({
              left: parseInt(c(M).data("colpick").height * E.s / 100, 10),
              top: parseInt(c(M).data("colpick").height * (100 - E.b) / 100, 10)
          })
      }
        , y = function(E, M) {
          c(M).data("colpick").hue.css("top", parseInt(c(M).data("colpick").height - c(M).data("colpick").height * E.h / 360, 10))
      }
        , A = function(E, M) {
          c(M).data("colpick").currentColor.css("backgroundColor", "#" + q(E))
      }
        , C = function(E, M) {
          c(M).data("colpick").newColor.css("backgroundColor", "#" + q(E))
      }
        , B = function(E) {
          E = c(this).parent().parent();
          if (0 < this.parentNode.className.indexOf("_hex")) {
              var M = E.data("colpick");
              var R = this.value
                , ca = 6 - R.length;
              if (0 < ca) {
                  for (var ba = [], qa = 0; qa < ca; qa++)
                      ba.push("0");
                  ba.push(R);
                  R = ba.join("")
              }
              M.color = M = p(R);
              t(M, E.get(0));
              l(M, E.get(0))
          } else
              0 < this.parentNode.className.indexOf("_hsb") ? (E.data("colpick").color = M = ia({
                  h: parseInt(E.data("colpick").fields.eq(4).val(), 10),
                  s: parseInt(E.data("colpick").fields.eq(5).val(), 10),
                  b: parseInt(E.data("colpick").fields.eq(6).val(), 10)
              }),
              t(M, E.get(0)),
              v(M, E.get(0))) : (M = E.data("colpick"),
              R = parseInt(E.data("colpick").fields.eq(1).val(), 10),
              ca = parseInt(E.data("colpick").fields.eq(2).val(), 10),
              ba = parseInt(E.data("colpick").fields.eq(3).val(), 10),
              M.color = M = d({
                  r: Math.min(255, Math.max(0, R)),
                  g: Math.min(255, Math.max(0, ca)),
                  b: Math.min(255, Math.max(0, ba))
              }),
              v(M, E.get(0)),
              l(M, E.get(0)));
          w(M, E.get(0));
          y(M, E.get(0));
          C(M, E.get(0));
          E.data("colpick").onChange.apply(E.parent(), [M, q(M), m(M), E.data("colpick").el, 0])
      }
        , z = function(E) {
          c(this).parent().removeClass("colpick_focus")
      }
        , F = function() {
          c(this).parent().parent().data("colpick").fields.parent().removeClass("colpick_focus");
          c(this).parent().addClass("colpick_focus")
      }
        , I = function(E) {
          E.preventDefault ? E.preventDefault() : E.returnValue = !1;
          var M = c(this).parent().find("input").focus();
          E = {
              el: c(this).parent().addClass("colpick_slider"),
              max: 0 < this.parentNode.className.indexOf("_hsb_h") ? 360 : 0 < this.parentNode.className.indexOf("_hsb") ? 100 : 255,
              y: E.pageY,
              field: M,
              val: parseInt(M.val(), 10),
              preview: c(this).parent().parent().data("colpick").livePreview
          };
          c(document).mouseup(E, J);
          c(document).mousemove(E, H)
      }
        , H = function(E) {
          E.data.field.val(Math.max(0, Math.min(E.data.max, parseInt(E.data.val - E.pageY + E.data.y, 10))));
          E.data.preview && B.apply(E.data.field.get(0), [!0]);
          return !1
      }
        , J = function(E) {
          B.apply(E.data.field.get(0), [!0]);
          E.data.el.removeClass("colpick_slider").find("input").focus();
          c(document).off("mouseup", J);
          c(document).off("mousemove", H);
          return !1
      }
        , O = function(E) {
          E.preventDefault ? E.preventDefault() : E.returnValue = !1;
          var M = {
              cal: c(this).parent(),
              y: c(this).offset().top
          };
          c(document).on("mouseup touchend", M, N);
          c(document).on("mousemove touchmove", M, P);
          E = "touchstart" == E.type ? E.originalEvent.changedTouches[0].pageY : E.pageY;
          B.apply(M.cal.data("colpick").fields.eq(4).val(parseInt(360 * (M.cal.data("colpick").height - (E - M.y)) / M.cal.data("colpick").height, 10)).get(0), [M.cal.data("colpick").livePreview]);
          return !1
      }
        , P = function(E) {
          var M = "touchmove" == E.type ? E.originalEvent.changedTouches[0].pageY : E.pageY;
          B.apply(E.data.cal.data("colpick").fields.eq(4).val(parseInt(360 * (E.data.cal.data("colpick").height - Math.max(0, Math.min(E.data.cal.data("colpick").height, M - E.data.y))) / E.data.cal.data("colpick").height, 10)).get(0), [E.data.preview]);
          return !1
      }
        , N = function(E) {
          t(E.data.cal.data("colpick").color, E.data.cal.get(0));
          v(E.data.cal.data("colpick").color, E.data.cal.get(0));
          c(document).off("mouseup touchend", N);
          c(document).off("mousemove touchmove", P);
          return !1
      }
        , T = function(E) {
          E.preventDefault ? E.preventDefault() : E.returnValue = !1;
          var M = {
              cal: c(this).parent(),
              pos: c(this).offset()
          };
          M.preview = M.cal.data("colpick").livePreview;
          c(document).on("mouseup touchend", M, W);
          c(document).on("mousemove touchmove", M, U);
          "touchstart" == E.type ? (pageX = E.originalEvent.changedTouches[0].pageX,
          E = E.originalEvent.changedTouches[0].pageY) : (pageX = E.pageX,
          E = E.pageY);
          B.apply(M.cal.data("colpick").fields.eq(6).val(parseInt(100 * (M.cal.data("colpick").height - (E - M.pos.top)) / M.cal.data("colpick").height, 10)).end().eq(5).val(parseInt(100 * (pageX - M.pos.left) / M.cal.data("colpick").height, 10)).get(0), [M.preview]);
          return !1
      }
        , U = function(E) {
          if ("touchmove" == E.type) {
              pageX = E.originalEvent.changedTouches[0].pageX;
              var M = E.originalEvent.changedTouches[0].pageY
          } else
              pageX = E.pageX,
              M = E.pageY;
          B.apply(E.data.cal.data("colpick").fields.eq(6).val(parseInt(100 * (E.data.cal.data("colpick").height - Math.max(0, Math.min(E.data.cal.data("colpick").height, M - E.data.pos.top))) / E.data.cal.data("colpick").height, 10)).end().eq(5).val(parseInt(100 * Math.max(0, Math.min(E.data.cal.data("colpick").height, pageX - E.data.pos.left)) / E.data.cal.data("colpick").height, 10)).get(0), [E.data.preview]);
          return !1
      }
        , W = function(E) {
          t(E.data.cal.data("colpick").color, E.data.cal.get(0));
          v(E.data.cal.data("colpick").color, E.data.cal.get(0));
          c(document).off("mouseup touchend", W);
          c(document).off("mousemove touchmove", U);
          return !1
      }
        , ka = function(E) {
          E = c(this).parent();
          var M = E.data("colpick").color;
          E.data("colpick").origColor = M;
          A(M, E.get(0));
          E.data("colpick").onSubmit(M, q(M), m(M), E.data("colpick").el)
      }
        , fa = function(E) {
          E.stopPropagation();
          E = c("#" + c(this).data("colpickId"));
          E.data("colpick").onBeforeShow.apply(this, [E.get(0)]);
          var M = c(this).offset()
            , R = M.top + this.offsetHeight;
          M = M.left;
          var ca = pa()
            , ba = E.width();
          M + ba > ca.l + ca.w && (M -= ba);
          E.css({
              left: M + "px",
              top: R + "px"
          });
          0 != E.data("colpick").onShow.apply(this, [E.get(0)]) && E.show();
          c("html").mousedown({
              cal: E
          }, ma);
          E.mousedown(function(qa) {
              qa.stopPropagation()
          })
      }
        , ma = function(E) {
          0 != E.data.cal.data("colpick").onHide.apply(this, [E.data.cal.get(0)]) && E.data.cal.hide();
          c("html").off("mousedown", ma)
      }
        , pa = function() {
          var E = "CSS1Compat" == document.compatMode;
          return {
              l: window.pageXOffset || (E ? document.documentElement.scrollLeft : document.body.scrollLeft),
              w: window.innerWidth || (E ? document.documentElement.clientWidth : document.body.clientWidth)
          }
      }
        , ia = function(E) {
          return {
              h: Math.min(360, Math.max(0, E.h)),
              s: Math.min(100, Math.max(0, E.s)),
              b: Math.min(100, Math.max(0, E.b))
          }
      }
        , oa = function() {
          var E = c(this).parent()
            , M = E.data("colpick").origColor;
          E.data("colpick").color = M;
          t(M, E.get(0));
          v(M, E.get(0));
          l(M, E.get(0));
          w(M, E.get(0));
          y(M, E.get(0));
          C(M, E.get(0))
      };
      return {
          init: function(E) {
              E = c.extend({}, h, E || {});
              if ("string" == typeof E.color)
                  E.color = p(E.color);
              else if (void 0 != E.color.r && void 0 != E.color.g && void 0 != E.color.b)
                  E.color = d(E.color);
              else if (void 0 != E.color.h && void 0 != E.color.s && void 0 != E.color.b)
                  E.color = ia(E.color);
              else
                  return this;
              return this.each(function() {
                  if (!c(this).data("colpickId")) {
                      var M = c.extend({}, E);
                      M.origColor = E.color;
                      var R = "collorpicker_" + parseInt(1E3 * Math.random());
                      c(this).data("colpickId", R);
                      R = c('<div class="colpick"><div class="colpick_color"><div class="colpick_color_overlay1"><div class="colpick_color_overlay2"><div class="colpick_selector_outer"><div class="colpick_selector_inner"></div></div></div></div></div><div class="colpick_hue"><div class="colpick_hue_arrs"><div class="colpick_hue_larr"></div><div class="colpick_hue_rarr"></div></div></div><div class="colpick_new_color"></div><div class="colpick_current_color"></div><div class="colpick_hex_field"><div class="colpick_field_letter">#</div><input type="text" maxlength="6" size="6" /></div><div class="colpick_rgb_r colpick_field"><div class="colpick_field_letter">R</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_rgb_g colpick_field"><div class="colpick_field_letter">G</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_rgb_b colpick_field"><div class="colpick_field_letter">B</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_hsb_h colpick_field"><div class="colpick_field_letter">H</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_hsb_s colpick_field"><div class="colpick_field_letter">S</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_hsb_b colpick_field"><div class="colpick_field_letter">B</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_submit"></div></div>').attr("id", R);
                      R.addClass("colpick_" + M.layout + (M.submit ? "" : " colpick_" + M.layout + "_ns"));
                      "light" != M.colorScheme && R.addClass("colpick_" + M.colorScheme);
                      R.find("div.colpick_submit").html(M.submitText).click(ka);
                      M.fields = R.find("input").change(B).blur(z).focus(F);
                      R.find("div.colpick_field_arrs").mousedown(I).end().find("div.colpick_current_color").click(oa);
                      M.selector = R.find("div.colpick_color").on("mousedown touchstart", T);
                      M.selectorIndic = M.selector.find("div.colpick_selector_outer");
                      M.el = this;
                      M.hue = R.find("div.colpick_hue_arrs");
                      huebar = M.hue.parent();
                      var ca = navigator.userAgent.toLowerCase()
                        , ba = "Microsoft Internet Explorer" === navigator.appName
                        , qa = ba ? parseFloat(ca.match(/msie ([0-9]{1,}[\.0-9]{0,})/)[1]) : 0;
                      ca = "#ff0000 #ff0080 #ff00ff #8000ff #0000ff #0080ff #00ffff #00ff80 #00ff00 #80ff00 #ffff00 #ff8000 #ff0000".split(" ");
                      if (ba && 10 > qa)
                          for (ba = 0; 11 >= ba; ba++)
                              qa = c("<div></div>").attr("style", "height:8.333333%; filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=" + ca[ba] + ", endColorstr=" + ca[ba + 1] + '); -ms-filter: "progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=' + ca[ba] + ", endColorstr=" + ca[ba + 1] + ')";'),
                              huebar.append(qa);
                      else
                          stopList = ca.join(","),
                          huebar.attr("style", "background:-webkit-linear-gradient(top," + stopList + "); background: -o-linear-gradient(top," + stopList + "); background: -ms-linear-gradient(top," + stopList + "); background:-moz-linear-gradient(top," + stopList + "); -webkit-linear-gradient(top," + stopList + "); background:linear-gradient(to bottom," + stopList + "); ");
                      R.find("div.colpick_hue").on("mousedown touchstart", O);
                      M.newColor = R.find("div.colpick_new_color");
                      M.currentColor = R.find("div.colpick_current_color");
                      R.data("colpick", M);
                      t(M.color, R.get(0));
                      l(M.color, R.get(0));
                      v(M.color, R.get(0));
                      y(M.color, R.get(0));
                      w(M.color, R.get(0));
                      A(M.color, R.get(0));
                      C(M.color, R.get(0));
                      M.flat ? (R.appendTo(this).show(),
                      R.css({
                          position: "relative",
                          display: "block"
                      })) : (R.appendTo(document.body),
                      c(this).on(M.showEvent, fa),
                      R.css({
                          position: "absolute"
                      }))
                  }
              })
          },
          showPicker: function() {
              return this.each(function() {
                  c(this).data("colpickId") && fa.apply(this)
              })
          },
          hidePicker: function() {
              return this.each(function() {
                  c(this).data("colpickId") && c("#" + c(this).data("colpickId")).hide()
              })
          },
          setColor: function(E, M) {
              M = "undefined" === typeof M ? 1 : M;
              if ("string" == typeof E)
                  E = p(E);
              else if (void 0 != E.r && void 0 != E.g && void 0 != E.b)
                  E = d(E);
              else if (void 0 != E.h && void 0 != E.s && void 0 != E.b)
                  E = ia(E);
              else
                  return this;
              return this.each(function() {
                  if (c(this).data("colpickId")) {
                      var R = c("#" + c(this).data("colpickId"));
                      R.data("colpick").color = E;
                      R.data("colpick").origColor = E;
                      t(E, R.get(0));
                      l(E, R.get(0));
                      v(E, R.get(0));
                      y(E, R.get(0));
                      w(E, R.get(0));
                      C(E, R.get(0));
                      R.data("colpick").onChange.apply(R.parent(), [E, q(E), m(E), R.data("colpick").el, 1]);
                      M && A(E, R.get(0))
                  }
              })
          }
      }
  }()
    , u = function(h) {
      h = parseInt(-1 < h.indexOf("#") ? h.substring(1) : h, 16);
      return {
          r: h >> 16,
          g: (h & 65280) >> 8,
          b: h & 255
      }
  }
    , p = function(h) {
      return d(u(h))
  }
    , d = function(h) {
      var t = {
          h: 0,
          s: 0,
          b: 0
      }
        , l = Math.max(h.r, h.g, h.b)
        , v = l - Math.min(h.r, h.g, h.b);
      t.b = l;
      t.s = 0 != l ? 255 * v / l : 0;
      t.h = 0 != t.s ? h.r == l ? (h.g - h.b) / v : h.g == l ? 2 + (h.b - h.r) / v : 4 + (h.r - h.g) / v : -1;
      t.h *= 60;
      0 > t.h && (t.h += 360);
      t.s *= 100 / 255;
      t.b *= 100 / 255;
      return t
  }
    , m = function(h) {
      var t, l;
      var v = h.h;
      var w = 255 * h.s / 100;
      h = 255 * h.b / 100;
      if (0 == w)
          v = t = l = h;
      else {
          w = (255 - w) * h / 255;
          var y = v % 60 * (h - w) / 60;
          360 == v && (v = 0);
          60 > v ? (v = h,
          l = w,
          t = w + y) : 120 > v ? (t = h,
          l = w,
          v = h - y) : 180 > v ? (t = h,
          v = w,
          l = w + y) : 240 > v ? (l = h,
          v = w,
          t = h - y) : 300 > v ? (l = h,
          t = w,
          v = w + y) : 360 > v ? (v = h,
          t = w,
          l = h - y) : l = t = v = 0
      }
      return {
          r: Math.round(v),
          g: Math.round(t),
          b: Math.round(l)
      }
  }
    , f = function(h) {
      var t = [h.r.toString(16), h.g.toString(16), h.b.toString(16)];
      c.each(t, function(l, v) {
          1 == v.length && (t[l] = "0" + v)
      });
      return t.join("")
  }
    , q = function(h) {
      return f(m(h))
  };
  c.fn.extend({
      colpick: g.init,
      colpickHide: g.hidePicker,
      colpickShow: g.showPicker,
      colpickSetColor: g.setColor
  });
  c.extend({
      colpick: {
          rgbToHex: f,
          rgbToHsb: d,
          hsbToHex: q,
          hsbToRgb: m,
          hexToHsb: p,
          hexToRgb: u
      }
  })
}
)(jQuery);
(function(c) {
  if ("function" === typeof define && define.amd)
      define(["leaflet"], c);
  else if ("object" === typeof module && "object" === typeof module.exports) {
      var g = require("leaflet");
      module.exports = c(g)
  } else {
      if ("undefined" === typeof window.L)
          throw Error("Leaflet must be loaded first");
      c(window.L)
  }
}
)(function(c) {
  c.Map.mergeOptions({
      contextmenuItems: []
  });
  c.Map.ContextMenu = c.Handler.extend({
      _touchstart: c.Browser.msPointer ? "MSPointerDown" : c.Browser.pointer ? "pointerdown" : "touchstart",
      statics: {
          BASE_CLS: "leaflet-contextmenu"
      },
      initialize: function(f) {
          c.Handler.prototype.initialize.call(this, f);
          this._items = [];
          this._visible = !1;
          var q = this._container = c.DomUtil.create("div", c.Map.ContextMenu.BASE_CLS, f._container);
          q.style.zIndex = 1E4;
          q.style.position = "absolute";
          f.options.contextmenuWidth && (q.style.width = f.options.contextmenuWidth + "px");
          this._createItems();
          c.DomEvent.on(q, "click", c.DomEvent.stop).on(q, "mousedown", c.DomEvent.stop).on(q, "dblclick", c.DomEvent.stop).on(q, "contextmenu", c.DomEvent.stop)
      },
      addHooks: function() {
          var f = this._map.getContainer();
          c.DomEvent.on(f, "mouseleave", this._hide, this).on(document, "keydown", this._onKeyDown, this);
          if (c.Browser.touch)
              c.DomEvent.on(document, this._touchstart, this._hide, this);
          this._map.on({
              contextmenu: this._show,
              mousedown: this._hide,
              zoomstart: this._hide
          }, this)
      },
      removeHooks: function() {
          var f = this._map.getContainer();
          c.DomEvent.off(f, "mouseleave", this._hide, this).off(document, "keydown", this._onKeyDown, this);
          c.Browser.touch && c.DomEvent.off(document, this._touchstart, this._hide, this);
          this._map.off({
              contextmenu: this._show,
              mousedown: this._hide,
              zoomstart: this._hide
          }, this)
      },
      showAt: function(f, q) {
          f instanceof c.LatLng && (f = this._map.latLngToContainerPoint(f));
          this._showAtPoint(f, q)
      },
      hide: function() {
          this._hide()
      },
      addItem: function(f) {
          return this.insertItem(f)
      },
      insertItem: function(f, q) {
          q = void 0 !== q ? q : this._items.length;
          f = this._createItem(this._container, f, q);
          this._items.push(f);
          this._sizeChanged = !0;
          this._map.fire("contextmenu.additem", {
              contextmenu: this,
              el: f.el,
              index: q
          });
          return f.el
      },
      removeItem: function(f) {
          var q = this._container;
          isNaN(f) || (f = q.children[f]);
          return f ? (this._removeItem(c.Util.stamp(f)),
          this._sizeChanged = !0,
          this._map.fire("contextmenu.removeitem", {
              contextmenu: this,
              el: f
          }),
          f) : null
      },
      removeAllItems: function() {
          for (var f = this._container.children, q; f.length; )
              q = f[0],
              this._removeItem(c.Util.stamp(q));
          return f
      },
      hideAllItems: function() {
          var f;
          var q = 0;
          for (f = this._items.length; q < f; q++) {
              var h = this._items[q];
              h.el.style.display = "none"
          }
      },
      showAllItems: function() {
          var f;
          var q = 0;
          for (f = this._items.length; q < f; q++) {
              var h = this._items[q];
              h.el.style.display = ""
          }
      },
      setDisabled: function(f, q) {
          var h = this._container
            , t = c.Map.ContextMenu.BASE_CLS + "-item";
          isNaN(f) || (f = h.children[f]);
          f && c.DomUtil.hasClass(f, t) && (q ? (c.DomUtil.addClass(f, t + "-disabled"),
          this._map.fire("contextmenu.disableitem", {
              contextmenu: this,
              el: f
          })) : (c.DomUtil.removeClass(f, t + "-disabled"),
          this._map.fire("contextmenu.enableitem", {
              contextmenu: this,
              el: f
          })))
      },
      isVisible: function() {
          return this._visible
      },
      _createItems: function() {
          var f = this._map.options.contextmenuItems, q;
          var h = 0;
          for (q = f.length; h < q; h++)
              this._items.push(this._createItem(this._container, f[h]))
      },
      _createItem: function(f, q, h) {
          if (q.separator || "-" === q)
              return this._createSeparator(f, h);
          var t = c.Map.ContextMenu.BASE_CLS + "-item";
          f = this._insertElementAt("a", q.disabled ? t + " " + t + "-disabled" : t, f, h);
          h = this._createEventHandler(f, q.callback, q.context, q.hideOnSelect);
          t = this._getIcon(q);
          var l = this._getIconCls(q)
            , v = "";
          t ? v = '<img class="' + c.Map.ContextMenu.BASE_CLS + '-icon" src="' + t + '"/>' : l && (v = '<span class="' + c.Map.ContextMenu.BASE_CLS + "-icon " + l + '"></span>');
          f.innerHTML = v + q.text;
          f.href = "#";
          c.DomEvent.on(f, "mouseover", this._onItemMouseOver, this).on(f, "mouseout", this._onItemMouseOut, this).on(f, "mousedown", c.DomEvent.stopPropagation).on(f, "click", h);
          if (c.Browser.touch)
              c.DomEvent.on(f, this._touchstart, c.DomEvent.stopPropagation);
          if (!c.Browser.pointer)
              c.DomEvent.on(f, "click", this._onItemMouseOut, this);
          return {
              id: c.Util.stamp(f),
              el: f,
              callback: h
          }
      },
      _removeItem: function(f) {
          var q;
          var h = 0;
          for (q = this._items.length; h < q; h++) {
              var t = this._items[h];
              if (t.id === f) {
                  f = t.el;
                  if (q = t.callback)
                      if (c.DomEvent.off(f, "mouseover", this._onItemMouseOver, this).off(f, "mouseover", this._onItemMouseOut, this).off(f, "mousedown", c.DomEvent.stopPropagation).off(f, "click", q),
                      c.Browser.touch && c.DomEvent.off(f, this._touchstart, c.DomEvent.stopPropagation),
                      !c.Browser.pointer)
                          c.DomEvent.on(f, "click", this._onItemMouseOut, this);
                  this._container.removeChild(f);
                  this._items.splice(h, 1);
                  return t
              }
          }
          return null
      },
      _createSeparator: function(f, q) {
          f = this._insertElementAt("div", c.Map.ContextMenu.BASE_CLS + "-separator", f, q);
          return {
              id: c.Util.stamp(f),
              el: f
          }
      },
      _createEventHandler: function(f, q, h, t) {
          var l = this
            , v = c.Map.ContextMenu.BASE_CLS + "-item-disabled";
          t = void 0 !== t ? t : !0;
          return function(w) {
              if (!c.DomUtil.hasClass(f, v)) {
                  w = l._map;
                  var y = l._showLocation.containerPoint
                    , A = w.containerPointToLayerPoint(y)
                    , C = w.layerPointToLatLng(A);
                  y = {
                      containerPoint: y,
                      layerPoint: A,
                      latlng: C,
                      relatedTarget: l._showLocation.relatedTarget
                  };
                  t && l._hide();
                  q && q.call(h || w, y);
                  l._map.fire("contextmenu.select", {
                      contextmenu: l,
                      el: f
                  })
              }
          }
      },
      _insertElementAt: function(f, q, h, t) {
          var l;
          f = document.createElement(f);
          f.className = q;
          void 0 !== t && (l = h.children[t]);
          l ? h.insertBefore(f, l) : h.appendChild(f);
          return f
      },
      _show: function(f) {
          this._showAtPoint(f.containerPoint, f)
      },
      _showAtPoint: function(f, q) {
          if (this._items.length) {
              var h = c.extend(q || {}, {
                  contextmenu: this
              });
              this._showLocation = {
                  containerPoint: f
              };
              q && q.relatedTarget && (this._showLocation.relatedTarget = q.relatedTarget);
              this._setPosition(f);
              this._visible || (this._container.style.display = "block",
              this._visible = !0);
              this._map.fire("contextmenu.show", h)
          }
      },
      _hide: function() {
          this._visible && (this._visible = !1,
          this._container.style.display = "none",
          this._map.fire("contextmenu.hide", {
              contextmenu: this
          }))
      },
      _getIcon: function(f) {
          return c.Browser.retina && f.retinaIcon || f.icon
      },
      _getIconCls: function(f) {
          return c.Browser.retina && f.retinaIconCls || f.iconCls
      },
      _setPosition: function(f) {
          var q = this._map.getSize()
            , h = this._container
            , t = this._getElementSize(h);
          if (this._map.options.contextmenuAnchor) {
              var l = c.point(this._map.options.contextmenuAnchor);
              f = f.add(l)
          }
          h._leaflet_pos = f;
          f.x + t.x > q.x ? (h.style.left = "auto",
          h.style.right = Math.min(Math.max(q.x - f.x, 0), q.x - t.x - 1) + "px") : (h.style.left = Math.max(f.x, 0) + "px",
          h.style.right = "auto");
          f.y + t.y > q.y ? (h.style.top = "auto",
          h.style.bottom = Math.min(Math.max(q.y - f.y, 0), q.y - t.y - 1) + "px") : (h.style.top = Math.max(f.y, 0) + "px",
          h.style.bottom = "auto")
      },
      _getElementSize: function(f) {
          var q = this._size
            , h = f.style.display;
          if (!q || this._sizeChanged)
              q = {},
              f.style.left = "-999999px",
              f.style.right = "auto",
              f.style.display = "block",
              q.x = f.offsetWidth,
              q.y = f.offsetHeight,
              f.style.left = "auto",
              f.style.display = h,
              this._sizeChanged = !1;
          return q
      },
      _onKeyDown: function(f) {
          27 === f.keyCode && this._hide()
      },
      _onItemMouseOver: function(f) {
          c.DomUtil.addClass(f.target || f.srcElement, "over")
      },
      _onItemMouseOut: function(f) {
          c.DomUtil.removeClass(f.target || f.srcElement, "over")
      }
  });
  c.Map.addInitHook("addHandler", "contextmenu", c.Map.ContextMenu);
  c.Mixin.ContextMenu = {
      bindContextMenu: function(f) {
          c.setOptions(this, f);
          this._initContextMenu();
          return this
      },
      unbindContextMenu: function() {
          this.off("contextmenu", this._showContextMenu, this);
          return this
      },
      addContextMenuItem: function(f) {
          this.options.contextmenuItems.push(f)
      },
      removeContextMenuItemWithIndex: function(f) {
          for (var q = [], h = 0; h < this.options.contextmenuItems.length; h++)
              this.options.contextmenuItems[h].index == f && q.push(h);
          for (f = q.pop(); void 0 !== f; )
              this.options.contextmenuItems.splice(f, 1),
              f = q.pop()
      },
      replaceContextMenuItem: function(f) {
          this.removeContextMenuItemWithIndex(f.index);
          this.addContextMenuItem(f)
      },
      _initContextMenu: function() {
          this._items = [];
          this.on("contextmenu", this._showContextMenu, this)
      },
      _showContextMenu: function(f) {
          var q;
          if (this._map.contextmenu) {
              var h = c.extend({
                  relatedTarget: this
              }, f);
              var t = this._map.mouseEventToContainerPoint(f.originalEvent);
              this.options.contextmenuInheritItems || this._map.contextmenu.hideAllItems();
              var l = 0;
              for (q = this.options.contextmenuItems.length; l < q; l++)
                  f = this.options.contextmenuItems[l],
                  this._items.push(this._map.contextmenu.insertItem(f, f.index));
              this._map.once("contextmenu.hide", this._hideContextMenu, this);
              this._map.contextmenu.showAt(t, h)
          }
      },
      _hideContextMenu: function() {
          var f;
          var q = 0;
          for (f = this._items.length; q < f; q++)
              this._map.contextmenu.removeItem(this._items[q]);
          this._items.length = 0;
          this.options.contextmenuInheritItems || this._map.contextmenu.showAllItems()
      }
  };
  var g = [c.Marker, c.Path], u = {
      contextmenu: !1,
      contextmenuItems: [],
      contextmenuInheritItems: !0
  }, p;
  var d = 0;
  for (p = g.length; d < p; d++) {
      var m = g[d];
      m.prototype.options ? m.mergeOptions(u) : m.prototype.options = u;
      m.addInitHook(function() {
          this.options.contextmenu && this._initContextMenu()
      });
      m.include(c.Mixin.ContextMenu)
  }
  return c.Map.ContextMenu
});
L.Control.Fullscreen = L.Control.extend({
  options: {
      position: "topleft",
      title: {
          "false": "View Fullscreen",
          "true": "Exit Fullscreen"
      }
  },
  onAdd: function(c) {
      var g = L.DomUtil.create("div", "leaflet-control-fullscreen leaflet-bar leaflet-control");
      this.link = L.DomUtil.create("a", "leaflet-control-fullscreen-button leaflet-bar-part", g);
      this.link.href = "#";
      this._map = c;
      this._map.on("fullscreenchange", this._toggleTitle, this);
      this._toggleTitle();
      L.DomEvent.on(this.link, "click", this._click, this);
      return g
  },
  _click: function(c) {
      L.DomEvent.stopPropagation(c);
      L.DomEvent.preventDefault(c);
      this._map.toggleFullscreen()
  },
  _toggleTitle: function() {
      this.link.title = this.options.title[this._map.isFullscreen()]
  }
});
L.Map.include({
  isFullscreen: function() {
      return this._isFullscreen || !1
  },
  toggleFullscreen: function() {
      var c = this.getContainer();
      this.isFullscreen() ? document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen ? document.webkitCancelFullScreen() : document.msExitFullscreen ? document.msExitFullscreen() : (L.DomUtil.removeClass(c, "leaflet-pseudo-fullscreen"),
      this._setFullscreen(!1),
      this.invalidateSize(),
      this.fire("fullscreenchange")) : c.requestFullscreen ? c.requestFullscreen() : c.mozRequestFullScreen ? c.mozRequestFullScreen() : c.webkitRequestFullscreen ? c.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT) : c.msRequestFullscreen ? c.msRequestFullscreen() : (L.DomUtil.addClass(c, "leaflet-pseudo-fullscreen"),
      this._setFullscreen(!0),
      this.invalidateSize(),
      this.fire("fullscreenchange"))
  },
  _setFullscreen: function(c) {
      this._isFullscreen = c;
      var g = this.getContainer();
      c ? L.DomUtil.addClass(g, "leaflet-fullscreen-on") : L.DomUtil.removeClass(g, "leaflet-fullscreen-on")
  },
  _onFullscreenChange: function(c) {
      c = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
      c !== this.getContainer() || this._isFullscreen ? c !== this.getContainer() && this._isFullscreen && (this._setFullscreen(!1),
      this.fire("fullscreenchange")) : (this._setFullscreen(!0),
      this.fire("fullscreenchange"))
  }
});
L.Map.mergeOptions({
  fullscreenControl: !1
});
L.Map.addInitHook(function() {
  this.options.fullscreenControl && (this.fullscreenControl = new L.Control.Fullscreen,
  this.addControl(this.fullscreenControl));
  var c;
  "onfullscreenchange"in document ? c = "fullscreenchange" : "onmozfullscreenchange"in document ? c = "mozfullscreenchange" : "onwebkitfullscreenchange"in document ? c = "webkitfullscreenchange" : "onmsfullscreenchange"in document && (c = "MSFullscreenChange");
  if (c) {
      var g = L.bind(this._onFullscreenChange, this);
      this.whenReady(function() {
          L.DomEvent.on(document, c, g)
      });
      this.on("unload", function() {
          L.DomEvent.off(document, c, g)
      })
  }
});
L.control.fullscreen = function(c) {
  return new L.Control.Fullscreen(c)
}
;
L.Control.ViewCenter = L.Control.extend({
  options: {
      position: "topleft",
      title: "Center map",
      forceSeparateButton: !1,
      vcLatLng: [52.03, 19.27],
      vcZoom: 6
  },
  onAdd: function(c) {
      var g = c.zoomControl && !this.options.forceSeparateButton ? c.zoomControl._container : L.DomUtil.create("div", "leaflet-bar");
      this._createButton(this.options, "leaflet-control-view-center", g, this.setCenterView, c);
      return g
  },
  _createButton: function(c, g, u, p, d) {
      g = L.DomUtil.create("a", g, u);
      g.href = "";
      g.title = c.title;
      L.DomEvent.addListener(g, "click", L.DomEvent.stopPropagation).addListener(g, "click", L.DomEvent.preventDefault).addListener(g, "click", function() {
          centerMapByImage()
      }, d);
      return g
  }
});
L.control.viewcenter = function(c) {
  return new L.Control.ViewCenter(c)
}
;
window.L_PREFER_CANVAS = !0;
var mapLoverlay = null
, osmOverlay = null
, attributionText = "gpsseuranta.net";
opts = {
  lines: 13,
  length: 40,
  width: 10,
  radius: 25,
  corners: 1,
  rotate: 0,
  direction: 1,
  color: "#000",
  speed: .8,
  trail: 60,
  shadow: !1,
  hwaccel: !1,
  className: "spinner",
  zIndex: 2E9,
  top: "50%",
  left: "50%"
};
var target = document.getElementById("map");
spinner = (new Spinner(opts)).spin(target);
opts2 = {
  lines: 10,
  length: 6,
  width: 3,
  radius: 3,
  corners: 1,
  rotate: 0,
  direction: 1,
  color: "#ff1818",
  speed: 1,
  trail: 60,
  shadow: !1,
  hwaccel: !1,
  className: "spinner2",
  zIndex: 2E9,
  top: "50%",
  left: "50%",
  position: "relative"
};
spinner2 = (new Spinner(opts2)).spin();
document.getElementById("playTime").appendChild(spinner2.el);
L.CRS.CustomZoom = L.extend({}, L.CRS.Simple, {
  scale: function(c) {
      return Math.pow(2, .5 * (c + 1))
  }
});
var map = L.map("map", {
  minZoom: -4,
  maxZoom: 4,
  crs: L.CRS.Simple,
  zoomSnap: 0,
  zoomDelta: 1,
  fadeAnimation: !0,
  contextmenu: hideallmenus ? !1 : !0,
  contextmenuWidth: 180,
  contextmenuItems: [{
      text: Strings_Add_splitpoint[langu],
      callback: cmenu_splitpoint
  }, {
      text: Strings_Add_splitline[langu],
      callback: cmenu_splitline
  }, {
      text: Strings_Mass_start_here[langu],
      callback: massstartHere
  }, {
      text: Strings_Reset_all_offsets[langu],
      callback: resetAllOffsets
  }]
}).setView([0, 0], -1);
map.contextmenu.setDisabled(3, !0);
map.on("zoomend", function(c) {
  updatescalebar()
});
map.on("zoomstart", function(c) {
  zoomstarted()
});
map.on("contextmenu.show", function(c) {
  markcmenupoint(c.contextmenu._showLocation.latlng)
});
map.on("contextmenu.hide", function() {
  hidecmenupoint()
});
map.on("mousemove", function(c) {
  isdrawingsline && (splitlinecandidate.setLatLngs([splitlinecandidate.getLatLngs()[0], c.latlng]),
  splitlinecandidate2.setLatLngs([splitlinecandidate.getLatLngs()[0], c.latlng]))
});
map.on("click", function(c) {
  isdrawingsline && endsplitline(c.latlng)
});
map.on("contextmenu", function(c) {
  L.DomEvent.stopPropagation(c)
});
var offsetBtn = L.Control.extend({
  options: {
      position: "bottomleft"
  },
  onAdd: function(c) {
      c = L.DomUtil.create("div", "btnOffsetReset");
      c.innerHTML = "diff";
      return c
  }
});
map.addControl(new offsetBtn);
$(".btnOffsetReset").click(function(c) {
  resetAllOffset()
});
function setMapSystem(c, g, u, p, d) {
  if (0 < c) {
      new L.Proj.CRS("EPSG:3067","+proj=utm +zone=35 +ellps=GRS80 +towgs84=0,0,0,-0,-0,-0,0 + +units=m +no_defs",{
          resolutions: [8192, 4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, .5, .25, .125, .0625],
          bounds: L.bounds([-548576, 6291456], [1548576, 8388608]),
          origin: [-548576, 0]
      });
      new L.Proj.CRS("EPSG:3067","+proj=utm +zone=35 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 + +units=m +no_defs",{
          resolutions: [8192, 4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, .5, .25, .125, .0625, .03125, .015625],
          origin: [-548576, 8388608],
          bounds: L.bounds([-548576, 8388608], [1548576, 6291456])
      });
      map.remove();
      var m = "";
      m = 7;
      var f = 5
        , q = 15;
      4 == c ? (m = u + "/{z}/{x}/{y}.png",
      u = p.split("|"),
      q = u[1],
      osmOverlay = L.tileLayer(m, {
          minZoom: u[0],
          maxZoom: u[1]
      }),
      m = f = u[0]) : 3 == c ? (osmOverlay = L.tileLayer("//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 18,
          attribution: "&copy; OpenStreetMap"
      }),
      attributionText = "&copy; OpenStreetMap") : 7 == c ? (osmOverlay = L.tileLayer("https://opentopomap.org/{z}/{x}/{y}.png", {
          maxZoom: 18,
          attribution: 'Kartendaten: &copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende, <a href="http://viewfinderpanoramas.org">SRTM</a> | Kartendarstellung: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      }),
      m = 12,
      attributionText = "&copy; OpenStreetMap") : 8 == c ? (osmOverlay = L.tileLayer("https://api.lantmateriet.se/open/topowebb-ccby/v1/wmts/token/5bc30503-b2e4-35fc-a765-cbdd335c283b/?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=topowebb&STYLE=default&TILEMATRIXSET=3857&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/png", {
          maxZoom: 15,
          attribution: "&copy; Lantm\u00e4teriet"
      }),
      attributionText = "\u00a9 Lantm\u00e4teriet") : 9 == c ? (attribution9 = "DigitalGlobe, GeoEye, i-cubed, USDA, USGS, AEX, Getmapping, Aerogrid, IGN, IGP, swisstopo, and the GIS User Community",
      attributionUrl9 = "https://static.arcgis.com/attribution/World_Imagery",
      osmOverlay = L.tileLayer("http://{s}.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
          maxZoom: 17,
          subdomains: ["server", "services"],
          attribution: attribution9,
          attributionUrl: attributionUrl9
      }),
      osmUrlLabels = "http://{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      osmOverlayLabels = L.tileLayer(osmUrlLabels, {
          maxZoom: 17,
          subdomains: ["server", "services"],
          attribution: ""
      })) : 2 == c ? (osmOverlay = L.tileLayer("https://opencache.statkart.no/gatekeeper/gk/gk.open_wmts?&layer=topo4&style=default&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A{z}&TileCol={x}&TileRow={y}", {
          maxZoom: 18,
          attribution: "&copy; Kartverket"
      }),
      attributionText = "&copy; Kartverket") : 1 == c ? osmOverlay = L.tileLayer.mml_wmts({
          layer: "maastokartta"
      }) : 5 == c ? (m = 10,
      attrib = "&copy; Maanmittauslaitos",
      osmOverlay = new L.TileLayer("https://avoin-karttakuva.maanmittauslaitos.fi/avoin/wmts/1.0.0/maastokartta/default/ETRS-TM35FIN/{z}/{y}/{x}.png?api-key=72a77515-abda-4715-b8e5-2ed0820a5cac",{
          maxZoom: 15,
          minZoom: 0,
          tileSize: 256,
          tms: !1,
          continuousWorld: !1,
          attribution: attrib,
          subdomains: ["tiles"]
      })) : 6 == c && (m = 10,
      attrib = "&copy; Maanmittauslaitos",
      osmOverlay = new L.TileLayer("https://avoin-karttakuva.maanmittauslaitos.fi/avoin/wmts/1.0.0/taustakartta/default/ETRS-TM35FIN/{z}/{y}/{x}.png?api-key=72a77515-abda-4715-b8e5-2ed0820a5cac",{
          maxZoom: 15,
          minZoom: 0,
          tileSize: 256,
          tms: !1,
          continuousWorld: !1,
          attribution: attrib,
          subdomains: ["tiles"]
      }));
      map = L.map("map", {
          minZoom: f,
          crs: 1 == c || 5 == c || 6 == c ? L.TileLayer.MML.get3067Proj() : L.CRS.EPSG3857,
          zoomSnap: 1 == c || 5 == c || 6 == c || 4 == c || 8 == c || 9 == c ? 1 : 0,
          zoomDelta: 1,
          contextmenu: hideallmenus ? !1 : !0,
          maxZoom: 1 == c || 5 == c || 6 == c || 8 == c ? 15 : 4 == c ? q : 7 == c || 9 == c ? 17 : 18,
          contextmenuWidth: 180,
          bounceAtZoomLimits: !1,
          fadeAnimation: !0,
          contextmenuItems: [{
              text: Strings_Add_splitpoint[langu],
              callback: cmenu_splitpoint
          }, {
              text: Strings_Add_splitline[langu],
              callback: cmenu_splitline
          }, {
              text: Strings_Mass_start_here[langu],
              callback: massstartHere
          }, {
              text: Strings_Reset_all_offsets[langu],
              callback: resetAllOffsets
          }]
      }).setView([g.y, g.x], m).addLayer(osmOverlay);
      4 == c && (c = d.split("|"),
      c = new L.LatLngBounds(new L.LatLng(c[1],c[0]),new L.LatLng(c[3],c[2])),
      map.fitBounds(c));
      map.contextmenu.setDisabled(3, !0);
      map.on("zoomend", function(h) {
          updatescalebar()
      });
      map.on("zoomstart", function(h) {
          zoomstarted()
      });
      map.on("contextmenu.show", function(h) {
          markcmenupoint(h.contextmenu._showLocation.latlng)
      });
      map.on("contextmenu.hide", function() {
          hidecmenupoint()
      });
      map.on("mousemove", function(h) {
          isdrawingsline && (splitlinecandidate.setLatLngs([splitlinecandidate.getLatLngs()[0], h.latlng]),
          splitlinecandidate2.setLatLngs([splitlinecandidate.getLatLngs()[0], h.latlng]))
      });
      map.on("click", function(h) {
          isdrawingsline && endsplitline(h.latlng)
      });
      map.addControl(new offsetBtn);
      $(".btnOffsetReset").click(function(h) {
          resetAllOffset()
      });
      spinner.stop();
      splitlgroup.addTo(map);
      rogcgroup.addTo(map)
  }
}
var group = L.layerGroup().addTo(map)
, group2 = L.layerGroup().addTo(map)
, splitlgroup = L.layerGroup().addTo(map)
, rogcgroup = L.layerGroup().addTo(map)
, mapHeight = 0
, mapWidth = 0;
function centerMapByImage() {
  var c = mapWidth / 2
    , g = mapHeight / 2;
  null != trevent && 0 < trevent.mapsystem ? map.setView([trevent.cpoint.y, trevent.cpoint.x], 12) : map.setView([g, c], -1)
}
function drawLeafletMap(c, g, u, p) {
  imageSize(c, g, u, function(d) {
      if (0 == mapsystem) {
          var m = d.height;
          d = d.width;
          mapHeight = m;
          mapWidth = d;
          console.log(m + " " + d);
          var f = [[0, 0], [m, d]];
          map.setView([m / 2, d / 2], -1);
          mapLoverlay = L.imageOverlay(c, f, {
              attribution: '<a href="http://www.gpsseuranta.net/">GPS-seuranta</a> <div id="evName"></div>'
          }).addTo(map);
          0 < trevent.predefcradius && 0 == mapsystem && map.contextmenu.addItem({
              text: Strings_Predefsplitpoints[langu],
              callback: usePredefSplitpoints
          });
          p("")
      }
  })
}
function imageSize(c, g, u, p) {
  var d = {};
  if (0 < g)
      d = {
          width: g,
          height: u
      },
      p && p(d);
  else {
      var m = new Image;
      m.onload = function() {
          d = {
              width: m.width,
              height: m.height
          };
          p && p(d)
      }
      ;
      console.log("map downloaded");
      m.src = c
  }
}
function cmenu_splitpoint(c) {
  addsplitpoint(c.latlng)
}
function cmenu_splitline(c) {
  startsplitline(c.latlng)
}
function massstartHere(c) {
  setoneclickmassstart(c.latlng.lng, c.latlng.lat)
}
function centerMap(c) {
  map.panTo(c.latlng, {})
}
function resetAllOffsets(c) {
  resetAllOffset()
}
function zoomIn(c) {
  var g = map.getZoom() + 1;
  map.setZoomAround(c.latlng, g)
}
function zoomOut(c) {
  var g = map.getZoom() - 1;
  map.setZoomAround(c.latlng, g)
}
function usePredefSplitpoints(c) {
  map.contextmenu.removeItem(4);
  definepredefsplitpoints()
}
L.Control.Fullscreen;
$(".leaflet-container").css("cursor", "auto");
function point(c, g) {
  this.x = c;
  this.y = g
}
function calibration() {
  this.calibrated = !1;
  this.a23 = this.a22 = this.a21 = this.a13 = this.a12 = this.a11 = this.centralmeridian = 0;
  this.overallscale = 1;
  this.MML = !1;
  this.calibrate = function(c, g) {
      var u = c.split("|");
      this.centralmeridian = u[0];
      var p = new point(u[0],u[1]);
      var d = new point(u[4],u[5]);
      var m = new point(u[8],u[9]);
      c = this.KKJLaLo_to_KKJxy(p, this.centralmeridian).x;
      p = this.KKJLaLo_to_KKJxy(p, this.centralmeridian).y;
      var f = this.KKJLaLo_to_KKJxy(d, this.centralmeridian).x;
      d = this.KKJLaLo_to_KKJxy(d, this.centralmeridian).y;
      var q = this.KKJLaLo_to_KKJxy(m, this.centralmeridian).x;
      var h = this.KKJLaLo_to_KKJxy(m, this.centralmeridian).y;
      m = u[2] / g;
      var t = -u[3] / g;
      var l = u[6] / g;
      var v = -u[7] / g;
      var w = u[10] / g;
      g = -u[11] / g;
      if (1 > Math.abs(d - h)) {
          u = f;
          var y = l
            , A = d
            , C = v;
          f = c;
          l = m;
          d = p;
          v = t;
          c = u;
          m = y;
          p = A;
          t = C
      }
      this.a11 = (m * (d - h) - p * (l - w) + l * h - d * w) / (c * (d - h) - p * (f - q) + f * h - d * q);
      this.a12 = -(m * (d - h) - p * (l - w) + l * h - d * w) * (f - q) / ((c * (d - h) - p * (f - q) + f * h - d * q) * (d - h)) + l / (d - h) - w / (d - h);
      this.a13 = (m * (d - h) - p * (l - w) + l * h - d * w) * (f * h - d * q) / ((c * (d - h) - p * (f - q) + f * h - d * q) * (d - h)) - l * h / (d - h) + d * w / (d - h);
      this.a21 = -(p * (v - g) - t * (d - h) + d * g - v * h) / (c * (d - h) - p * (f - q) + f * h - d * q);
      this.a22 = (p * (v - g) - t * (d - h) + d * g - v * h) * (f - q) / ((c * (d - h) - p * (f - q) + f * h - d * q) * (d - h)) + (v - g) / (d - h);
      this.a23 = -(p * (v - g) - t * (d - h) + d * g - v * h) * (f * h - d * q) / ((c * (d - h) - p * (f - q) + f * h - d * q) * (d - h)) - (v - g) * h / (d - h) + g;
      this.calibrated = !0;
      this.overallscale = (Math.pow((Math.pow(l - m, 2) + Math.pow(v - t, 2)) / (Math.pow(f - c, 2) + Math.pow(d - p, 2)), .5) + Math.pow((Math.pow(w - m, 2) + Math.pow(g - t, 2)) / (Math.pow(q - c, 2) + Math.pow(h - p, 2)), .5) + Math.pow((Math.pow(l - w, 2) + Math.pow(v - g, 2)) / (Math.pow(f - q, 2) + Math.pow(d - h, 2)), .5)) / 3
  }
  ;
  this.getmapx = function(c, g) {
      if (this.MML)
          return this.KKJLaLo_to_KKJxy(new point(c,g), this.centralmeridian).x;
      if (!this.calibrated)
          return 0;
      var u = this.KKJLaLo_to_KKJxy(new point(c,g), this.centralmeridian).x;
      c = this.KKJLaLo_to_KKJxy(new point(c,g), this.centralmeridian).y;
      return this.a11 * u + this.a12 * c + this.a13
  }
  ;
  this.getmapy = function(c, g) {
      if (this.MML || !this.calibrated)
          return this.KKJLaLo_to_KKJxy(new point(c,g), this.centralmeridian).y;
      var u = this.KKJLaLo_to_KKJxy(new point(c,g), this.centralmeridian).x;
      c = this.KKJLaLo_to_KKJxy(new point(c,g), this.centralmeridian).y;
      return -(this.a21 * u + this.a22 * c + this.a23)
  }
  ;
  this.setMML = function() {
      this.MML = !0
  }
  ;
  this.setCenterMer = function(c) {
      this.centralmeridian = c
  }
  ;
  this.KKJLaLo_to_KKJxy = function(c, g) {
      var u = (c.x - g) * Math.PI / 180
        , p = 6378137 * (1 - 1 / 298.257223563)
        , d = p * p;
      g = 6378137 / p * 6378137;
      var m = (40680631590769 - d) / d;
      p = (6378137 - p) / (6378137 + p);
      d = p * p;
      var f = Math.cos(c.y * Math.PI / 180);
      c = Math.atan(Math.tan(c.y * Math.PI / 180) / Math.cos(u * Math.sqrt(1 + m * f * f)));
      f = Math.cos(c);
      u = Math.tan(u) * f / Math.sqrt(1 + m * f * f);
      var q = 6378137 / (1 + p);
      m = q * (1 + d / 4 + d * d / 64);
      f = 1.5 * q * p * (1 - d / 8);
      var h = .9375 * q * d * (1 - d / 4);
      p *= 35 * q / 48 * d;
      d = new point(0,0);
      d.y = m * c - f * Math.sin(2 * c) + h * Math.sin(4 * c) - p * Math.sin(6 * c);
      d.x = g * Math.log(u + Math.sqrt(1 + u * u)) + 15E5;
      return d
  }
  ;
  this.GetDistance2 = function(c, g, u, p) {
      var d = Math.sin((g - p) * Math.PI / 180 * .5);
      c = Math.sin((c - u) * Math.PI / 180 * .5);
      return 12756274 * Math.asin(Math.sqrt(d * d + Math.cos(g * Math.PI / 180) * Math.cos(p * Math.PI / 180) * c * c))
  }
}
function ETRStoWGS(c, g) {
  var u = 27 * Math.PI / 180
    , p = 1 / 298.257223563
    , d = d = p / (2 - p)
    , m = 6378137 / (1 + d) * (1 + Math.pow(d, 2) / 4 + Math.pow(d, 4) / 64);
  p = Math.sqrt(2 * p - Math.pow(p, 2));
  var f = .5 * d - 2 / 3 * Math.pow(d, 2) + 37 / 96 * Math.pow(d, 3) - 1 / 360 * Math.pow(d, 4)
    , q = 1 / 48 * Math.pow(d, 2) + 1 / 15 * Math.pow(d, 3) - 437 / 1440 * Math.pow(d, 4)
    , h = 17 / 480 * Math.pow(d, 3) - 37 / 840 * Math.pow(d, 4);
  d = 4397 / 161280 * Math.pow(d, 4);
  g /= .9996 * m;
  m = (c - 5E5) / (.9996 * m);
  c = m - f * Math.cos(2 * g) * Math.sinh(2 * m) - q * Math.cos(4 * g) * Math.sinh(4 * m) - h * Math.cos(6 * g) * Math.sinh(6 * m) - d * Math.cos(8 * g) * Math.sinh(8 * m);
  f = Math.asin(Math.sin(g - f * Math.sin(2 * g) * Math.cosh(2 * m) - q * Math.sin(4 * g) * Math.cosh(4 * m) - h * Math.sin(6 * g) * Math.cosh(6 * m) - d * Math.sin(8 * g) * Math.cosh(8 * m)) / Math.cosh(c));
  q = Math.asinh(Math.tan(f));
  h = q + p * Math.atanh(p * Math.tanh(q));
  h = q + p * Math.atanh(p * Math.tanh(h));
  h = q + p * Math.atanh(p * Math.tanh(h));
  h = q + p * Math.atanh(p * Math.tanh(h));
  LALO = {};
  return {
      x: 180 * (u + Math.asin(Math.tanh(c) / Math.cos(f))) / Math.PI,
      y: 180 * Math.atan(Math.sinh(h)) / Math.PI
  }
}
Math.sinh = Math.sinh || function(c) {
  return (Math.exp(c) - Math.exp(-c)) / 2
}
;
Math.cosh = Math.cosh || function(c) {
  return (Math.exp(c) + Math.exp(-c)) / 2
}
;
Math.tanh = Math.tanh || function(c) {
  return Infinity === c ? 1 : -Infinity === c ? -1 : (Math.exp(c) - Math.exp(-c)) / (Math.exp(c) + Math.exp(-c))
}
;
Math.asinh = Math.asinh || function(c) {
  return -Infinity === c ? c : Math.log(c + Math.sqrt(c * c + 1))
}
;
Math.acosh = Math.acosh || function(c) {
  return Math.log(c + Math.sqrt(c * c - 1))
}
;
Math.atanh = Math.atanh || function(c) {
  return Math.log((1 + c) / (1 - c)) / 2
}
;
L.NumberedDivIcon = L.Icon.extend({
  balloondiv: null,
  numdiv: null,
  options: {
      number: "",
      shadowUrl: null,
      iconSize: new L.Point(12,12),
      iconAnchor: new L.Point(6,6),
      popupAnchor: new L.Point(12,-33),
      color: "red",
      opacityB: 1,
      size: 12,
      lsize: 20,
      highlighted: 0,
      zIndex: 0,
      blackshadow: !1,
      isbuoy: !1,
      rallymode: 0
  },
  createIcon: function() {
      var c = document.createElement("div");
      this.balloondiv = document.createElement("div");
      this.balloondiv.style.backgroundColor = this.options.color;
      this.balloondiv.style.opacity = this.options.opacityB;
      this.numdiv = document.createElement("div");
      c.setAttribute("class", "Leaf_marker");
      this.balloondiv.setAttribute("class", "Leaf_balloon");
      this.numdiv.setAttribute("class", this.options.blackshadow ? "Leaf_label_black" : "Leaf_label_white");
      this.numdiv.innerHTML = this.options.number || "";
      this.numdiv.style.color = this.options.color;
      c.appendChild(this.balloondiv);
      c.appendChild(this.numdiv);
      this.balloondiv.style.width = this.options.size + "px";
      this.balloondiv.style.height = this.options.size + "px";
      this.balloondiv.style.top = "-" + (this.options.size / 2 + 2) + "px";
      this.balloondiv.style.left = "-" + (this.options.size / 2 + 2) + "px";
      this.numdiv.style.top = .35 * this.options.size + "px";
      this.numdiv.style.left = .35 * this.options.size + "px";
      this.numdiv.style.fontSize = this.options.lsize + "px";
      this.numdiv.style.lineHeight = "1.0";
      0 < this.options.highlighted && (this.numdiv.style.backgroundColor = "rgba(255, 255, 255, 0.9)",
      this.numdiv.style.border = "1px solid",
      this.numdiv.style.borderRadius = "25%",
      this.numdiv.style.borderColor = "black",
      this.numdiv.style.padding = "2px");
      this.options.isbuoy && (this.balloondiv.style.width = this.options.size / 2 + "px",
      this.balloondiv.style.height = this.options.size / 2 + "px",
      this.balloondiv.style.top = "-" + (this.options.size / 4 + 1) + "px",
      this.balloondiv.style.left = "-" + (this.options.size / 4 + 1) + "px",
      this.balloondiv.style.boxShadow = "0px 0px 0px " + (this.options.size / 2 + "px rgba(100, 100, 100, 0.7)"));
      c.style.pointerEvents = "none";
      return c
  },
  createShadow: function() {
      return null
  },
  setopacity: function(c) {
      this.balloondiv.style.borderColor = .9 < c ? "black" : "gray"
  },
  settext: function(c) {
      this.options.number = c;
      this.numdiv.innerHTML = this.options.number || ""
  },
  setsizes: function(c, g) {
      this.options.size = c;
      this.options.lsize = g;
      this.balloondiv.style.width = this.options.size + "px";
      this.balloondiv.style.height = this.options.size + "px";
      this.balloondiv.style.top = "-" + (this.options.size / 2 + 2) + "px";
      this.balloondiv.style.left = "-" + (this.options.size / 2 + 2) + "px";
      this.numdiv.style.top = .35 * this.options.size + "px";
      this.numdiv.style.left = .35 * this.options.size + "px";
      this.numdiv.style.fontSize = this.options.lsize + "px";
      this.numdiv.style.lineHeight = "1.0";
      0 < this.options.highlighted && (this.numdiv.style.backgroundColor = "rgba(255, 255, 255, 0.9)",
      this.numdiv.style.border = "1px solid",
      this.numdiv.style.borderRadius = "25%",
      this.numdiv.style.borderColor = "black",
      this.numdiv.style.padding = "2px");
      this.options.isbuoy && (this.balloondiv.style.width = this.options.size / 2 + "px",
      this.balloondiv.style.height = this.options.size / 2 + "px",
      this.balloondiv.style.top = "-" + (this.options.size / 4 + 1) + "px",
      this.balloondiv.style.left = "-" + (this.options.size / 4 + 1) + "px",
      this.balloondiv.style.boxShadow = "0px 0px 0px " + (this.options.size / 2 + "px rgba(100, 100, 100, 0.7)"))
  },
  setcolor: function(c, g) {
      this.options.color = c;
      this.options.blackshadow = g;
      this.balloondiv.style.backgroundColor = this.options.color;
      this.numdiv.setAttribute("class", this.options.blackshadow ? "Leaf_label_black" : "Leaf_label_white");
      this.numdiv.style.color = this.options.color
  },
  sethl: function(c) {
      this.options.highlighted = c;
      0 < this.options.highlighted ? (this.numdiv.style.backgroundColor = "rgba(255, 255, 255, 0.9)",
      this.numdiv.style.border = "1px solid",
      this.numdiv.style.borderRadius = "25%",
      this.numdiv.style.borderColor = "black",
      this.numdiv.style.padding = "2px") : (this.numdiv.style.backgroundColor = "transparent",
      this.numdiv.style.border = "0px",
      this.numdiv.style.padding = "0px")
  },
  setrallystate: function(c) {
      1 == c ? (this.balloondiv.style.backgroundColor = "green",
      this.balloondiv.style.border = "1px solid black") : 2 == c ? (this.balloondiv.style.backgroundColor = "red",
      this.balloondiv.style.border = "1px solid black") : 3 == c ? (this.balloondiv.style.backgroundColor = "yellow",
      this.balloondiv.style.border = "3px solid green") : 4 == c ? (this.balloondiv.style.backgroundColor = "yellow",
      this.balloondiv.style.border = "3px solid red") : 5 == c ? (this.balloondiv.style.backgroundColor = "white",
      this.balloondiv.style.border = "3px solid green") : 6 == c ? (this.balloondiv.style.backgroundColor = "white",
      this.balloondiv.style.border = "3px solid red") : 0 == c && (this.balloondiv.style.backgroundColor = this.options.color,
      this.balloondiv.style.border = "1px solid black")
  }
});
function hexToRgb(c) {
  return (c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c)) ? {
      r: parseInt(c[1], 16),
      g: parseInt(c[2], 16),
      b: parseInt(c[3], 16)
  } : null
}
function trackpoint(c, g, u, p, d, m, f, q) {
  this.time = c;
  this.timefromstart = g;
  this.wgsx = u;
  this.wgsy = p;
  this.mapx = d;
  this.mapy = m;
  this.speed = f;
  this.distance = 0;
  this.battery = q;
  this.coursedistance = -1
}
trackpoint.prototype.setdistance = function(c, g) {
  g = Math.pow(Math.pow(this.mapx - c.mapx, 2) + Math.pow(this.mapy - c.mapy, 2), .5) / g.overallscale;
  this.distance = 1 * c.distance + g;
  0 > c.timefromstart && (this.distance = 0 > this.timefromstart ? 0 : g * this.timefromstart / (this.time - c.time));
  .001 > this.speed && (this.speed = g / (this.time - c.time) * 3.6)
}
;
function competitor() {
  this.letters = this.name = this.id = "undef";
  this.additionaldata = "";
  this.trackpoints = [];
  this.pointcount = 0;
  this.color = "red";
  this.starttime = 0;
  this.starttimestring = "00:00:00";
  this.timedifference = 0;
  this.checked = !0;
  this.showbeforestart = 0;
  this.isbuoy = !1;
  this.isconnectedtoid = "";
  this.isconnectedto = null;
  this.index = 0;
  this.fullroute = this.highlighted = this.autocenter = !1;
  this.battery = -100;
  this.offset = 0;
  this.mapyalltodraw = this.mapxalltodraw = this.mapytodraw = this.mapxtodraw = -1E4;
  this.wgsytodraw = this.wgsxtodraw = 0;
  this.currentspeed = -1;
  this.currentdistance = 0;
  this.dataage = -1;
  this.status = Strings_NA[langu];
  this.lowestadded = 0;
  this.isovertime = !1;
  this.multipointlist = this.marker = this.path = this.layer = null;
  this.oneclicktempsplit = -999999;
  this.isonmap = !0;
  this.split1 = -999999;
  this.splitInstance2 = this.splitInstance2b = this.splitInstance2a = this.splitInstance = null;
  this.maxtimemins = -1;
  this.rallymode = !1;
  this.rallystate = 0;
  this.sectormode = !1;
  this.popuptext = "";
  this.sectorfactor = 0;
  this.sectorcolor = "green";
  this.rogc = null;
  this.rogpoints = 0;
  this.retired = this.finished = !1;
  this.finishtime = -1;
  this.finishtimeupperlimit = 999999999;
  this.highestwcd = 0;
  this.nocourse = !1
}
competitor.prototype.set_from_inistring = function(c, g, u, p, d, m, f, q, h, t, l) {
  this.color = u;
  this.timedifference = g;
  this.index = m;
  c = c.split("|");
  this.maxtimemins = l;
  this.id = c[0];
  l = "000000";
  switch (c[2].length) {
  case 3:
      l = "0" + c[2] + "00";
      break;
  case 4:
      l = c[2] + "00";
      break;
  case 5:
      l = "0" + c[2];
      break;
  case 6:
      l = c[2]
  }
  var v = c[1];
  -1 != d && (v = (d + "").substring(0, 8),
  l = (d + "").substring(8, 12));
  d = v.substring(0, 4);
  u = v.substring(4, 6) - 1;
  v = v.substring(6, 8);
  var w = l.substring(0, 2)
    , y = l.substring(2, 4)
    , A = l.substring(4, 6);
  g = Date.UTC(d, u, v, w, y, A) - 1E3 * g;
  this.starttimestring = l.substring(0, 2) + ":" + l.substring(2, 4) + ":" + l.substring(4, 6);
  this.starttime = g / 1E3 - 1136073600;
  g = c[3].replace(/&amp;/g, "&");
  this.name = decodeURIComponent(g);
  g = c[4].replace(/&amp;/g, "&");
  this.letters = decodeURIComponent(g);
  for (ii = 5; ii < c.length; ii++)
      "A=" == c[ii].substring(0, 2) && (this.additionaldata = c[ii].substring(2)),
      "C=" == c[ii].substring(0, 2) && (this.color = "rgb(" + c[ii].substring(2, 5) + "," + c[ii].substring(5, 8) + "," + c[ii].substring(8, 11) + ")"),
      "H=" == c[ii].substring(0, 2) && (this.nocourse = !0);
  "XXPOIJUXX" == this.name && (this.isbuoy = !0,
  this.name = this.letters,
  7 < c.length && (this.isconnectedtoid = c[7],
  console.log(this.id + " connected to " + this.isconnectedtoid)));
  this.showbeforestart = p;
  this.path = L.polyline([[0, 0]], {
      contextmenu: !0,
      color: this.isbuoy ? "rgba(100, 100, 100, 0.7)" : this.color,
      weight: h,
      opacity: t,
      lineJoin: "round",
      pointerEvents: "none"
  });
  p = 0;
  (h = hexToRgb(this.color)) && (p = Math.round((299 * parseInt(h.r) + 587 * parseInt(h.g) + 114 * parseInt(h.b)) / 1E3));
  this.marker = new L.Marker(L.latLng(1E6, 1E6),{
      contextmenu: !0,
      pointerEvents: "none",
      fullname: this.name,
      zIndexOffset: m * (this.isbuoy ? 1 : 1E3),
      icon: new L.NumberedDivIcon({
          color: this.color,
          blackshadow: 100 < p,
          number: this.letters,
          size: f,
          lsize: q,
          isbuoy: this.isbuoy
      })
  })
}
;
competitor.prototype.getOffsetString = function() {
  var c = Math.round(this.offset);
  0 > c && (c *= -1);
  var g = Math.floor(c % 60);
  return (0 > this.offset ? "-" : "+") + Math.floor(c / 60) + (10 > g ? ":0" : ":") + g
}
;
competitor.prototype.adddata = function(c, g) {
  c = c.split(".");
  if (!(2 > c.length || -1 < c[1].indexOf("*"))) {
      var u = c[1].split("_")
        , p = u[1] / 5E4
        , d = u[2] / 1E5
        , m = u[0] / 1
        , f = -100
        , q = -100
        , h = -100
        , t = 0
        , l = -100
        , v = 0;
      if (3 < u.length)
          for (i1 = 3; i1 < u.length; i1++)
              "B" == u[i1].substring(0, 1) ? (v = i1,
              f = l = u[i1].substring(1)) : "S" == u[i1].substring(0, 1) && (t = i1,
              h = u[i1].substring(1),
              q = h / 10);
      u = g.getmapx(p, d);
      var w = g.getmapy(p, d);
      f = new trackpoint(m,m - this.starttime,p,d,u,w,q,f);
      this.addtrackpoint(f);
      for (k = 2; k < c.length; k++) {
          f = q = -100;
          if (3 > c[k].length)
              break;
          u = c[k].split("_");
          3 > u.length ? (m = m + "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".indexOf(c[k].substring(0, 1)) - 31,
          p = (5E4 * p + "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".indexOf(c[k].substring(1, 2)) - 31) / 5E4,
          d = (1E5 * d + "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".indexOf(c[k].substring(2, 3)) - 31) / 1E5,
          -1 < h && c[k].length > t && "*" != c[k].substring(t, t + 1) && (h = 1 * h + 1 * "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".indexOf(c[k].substring(t, t + 1)) - 31,
          q = h / 10),
          -1 < l && c[k].length > t && "*" != c[k].substring(v, v + 1) && (f = l = 1 * l + 1 * "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".indexOf(c[k].substring(v, v + 1)) - 31)) : (m += u[0] / 1,
          p += u[1] / 5E4,
          d += u[2] / 1E5,
          -1 < h && u.length > t && "*" != u[t] && (h = 1 * h + 1 * u[t],
          q = h / 10),
          -1 < l && u.length > v && "*" != u[v] && (f = l = 1 * l + 1 * u[v]));
          u = g.getmapx(p, d);
          w = g.getmapy(p, d);
          f = new trackpoint(m,m - this.starttime,p,d,u,w,q,f);
          this.addtrackpoint(f)
      }
  }
}
;
competitor.prototype.setchecked = function(c, g, u) {
  u && (c && !this.checked && (this.marker.addTo(g),
  this.rallymode && this.marker.options.icon.setrallystate(this.rallystate),
  this.path.addTo(g),
  this.isonmap = !0),
  !c && this.checked && (g.removeLayer(this.path),
  g.removeLayer(this.marker),
  this.isonmap = !1));
  this.checked = c
}
;
competitor.prototype.setuprog = function(c) {
  this.rogc = [];
  for (i = 0; i < c; i++)
      this.rogc[i] = -1
}
;
competitor.prototype.changeiconsize = function(c, g) {
  null != this.marker && this.marker.options.icon.setsizes(c, g)
}
;
competitor.prototype.changeiconhl = function() {
  console.log("click " + this.id);
  null != this.marker && (this.marker.options.icon.sethl(this.highlighted ? 1 : 0),
  this.marker.setZIndexOffset(1E3 * this.index + (this.highlighted ? 1E6 : 0)))
}
;
competitor.prototype.setrallymode = function(c) {
  this.rallymode = c;
  this.rallystate = 0;
  c ? (this.marker.setOpacity(1),
  this.marker.options.icon.setopacity(1)) : this.marker.options.icon.setrallystate(0)
}
;
competitor.prototype.temphighlight = function() {
  console.log("click");
  null != this.marker && this.marker.options.icon.sethl(!0);
  setTimeout(this.removetemphighlight, 2E3)
}
;
competitor.prototype.removetemphighlight = function() {
  null == this.marker || this.highlighted || this.marker.options.icon.sethl(!1)
}
;
competitor.prototype.changeiconcolor = function() {
  var c = 0
    , g = hexToRgb(this.color);
  g && (c = Math.round((299 * parseInt(g.r) + 587 * parseInt(g.g) + 114 * parseInt(g.b)) / 1E3));
  null != this.marker && this.marker.options.icon.setcolor(this.color, 100 < c);
  this.rallystate = 0
}
;
competitor.prototype.changelinestyle = function(c, g) {
  this.path.setStyle({
      weight: c,
      opacity: g,
      color: this.sectorcolormode && this.sectormode ? this.sectorcolor : this.color
  })
}
;
competitor.prototype.get1sttime = function() {
  return this.starttime - this.showbeforestart
}
;
competitor.prototype.getlasttime = function() {
  return 1 > this.pointcount ? -1 : this.trackpoints[this.pointcount - 1].time
}
;
competitor.prototype.printdata = function(c) {
  var g = "id:" + this.id + "|name:" + this.name + "|start:" + this.starttimestring + "\n";
  for (i = 0; i < this.trackpoints.length; i++)
      g += this.trackpoints[i].time + " " + this.trackpoints[i].mapx + " " + this.trackpoints[i].mapy + "\n";
  c.innerHTML = g
}
;
competitor.prototype.addtrackpoint = function(c) {
  var g = this.pointcount - 1;
  if (!(c.time < this.starttime - this.showbeforestart || 0 < this.maxtimemins && c.time - this.starttime > this.maxtimemins)) {
      for (; -1 < g && this.trackpoints[g].time > c.time; )
          g--;
      if (!(-1 < g && (this.trackpoints[g].time > c.time - 1.1 || g < this.pointcount - 1 && this.trackpoints[g + 1].time < c.time + 1.1))) {
          this.pointcount++;
          for (j = this.pointcount - 1; j > g + 1; j--)
              this.trackpoints[j] = this.trackpoints[j - 1];
          this.trackpoints[g + 1] = c;
          g + 1 < this.lowestadded && (this.lowestadded = g + 1)
      }
      for (g = this.trackpoints.length - 1; -1 < g; g--)
          if (-1 < this.trackpoints[g].battery) {
              this.battery = this.trackpoints[g].battery;
              break
          }
  }
}
;
competitor.prototype.testlog = function() {
  console.log(this.pointcount + " " + this.trackpoints.length);
  for (i = this.trackpoints.length - 1; i > this.trackpoints.length - 15; i--)
      console.log(this.trackpoints[i].time)
}
;
competitor.prototype.drawbattery = function(c, g, u, p, d) {
  d = this.battery + "%";
  0 > this.battery && (d = "?");
  c.fillStyle = "rgb(150,29,28)";
  if (0 < this.battery) {
      var m = this.battery / 100 * 180;
      console.log(batterwi);
      c.fillRect(g + 50 - 1, u - p - 1, m, p + 2)
  }
  c.font = p + "px Verdana";
  c.strokeText(this.id, g + 0, u);
  c.strokeText(d, g + 50, u);
  c.strokeText(this.name, g + 250, u)
}
;
competitor.prototype.setsectormode = function(c, g) {
  (this.sectormode = c) ? (this.path.on("mouseover", function(u) {
      u.target.setStyle({
          weight: u.target.options.weight + 10
      })
  }),
  this.path.on("mouseout", function(u) {
      u.target.setStyle({
          weight: u.target.options.weight - 10
      })
  }),
  this.path.on("click", function(u) {
      L.popup().setLatLng(u.latlng).setContent('<span style="color:' + u.target.options.color + ';">' + this.popuptext + "<span>").openOn(g)
  }, this)) : (this.path.off("mouseover"),
  this.path.off("mouseout"),
  this.path.off("click"))
}
;
competitor.prototype.drawtrackL = function(c, g, u, p, d, m, f, q, h) {
  if (!(1 > this.pointcount)) {
      var t = 0;
      c.getZoom();
      this.fullroute && (p = this.starttime - this.showbeforestart);
      p < this.starttime - this.showbeforestart && (p = this.starttime - this.showbeforestart);
      this.status = f ? Strings_LIVE[langu] : Strings_OK[langu];
      if (u < this.starttime - this.showbeforestart) {
          for (g = 0; g < this.pointcount && this.trackpoints[g].time < this.starttime - this.showbeforestart; )
              g++;
          this.mapxalltodraw = this.getmapxy(this.starttime - this.showbeforestart, !0, g + 1, !1);
          this.mapyalltodraw = this.getmapxy(this.starttime - this.showbeforestart, !1, g + 1, !1);
          this.isovertime = !0;
          this.status = Strings_PRE[langu];
          this.currentspeed = -1;
          this.currentdistance = 0
      } else {
          var l = !1;
          u > this.trackpoints[this.pointcount - 1].time ? (l = this.isovertime = !0,
          this.status = POST[langu],
          this.dataage = u - this.trackpoints[this.pointcount - 1].time,
          this.currentspeed = this.trackpoints[this.pointcount - 1].speed,
          this.currentdistance = this.trackpoints[this.pointcount - 1].distance) : this.isovertime = !1;
          for (var v = this.pointcount - 1; 0 < v && this.trackpoints[v - 1].time > u; )
              v--;
          this.mapxalltodraw = this.getmapxy(u, !0, v, !1);
          this.mapyalltodraw = this.getmapxy(u, !1, v, !1);
          c = this.mapxalltodraw;
          f = this.mapyalltodraw;
          this.currentspeed = this.getspeed(u, v - 1);
          this.currentdistance = this.getdistance(u, v - 1);
          this.mapxtodraw = c;
          this.mapytodraw = f;
          0 < v && !l && (this.isovertime = u = this.trackpoints[v].time - this.trackpoints[v - 1].time > d) && (this.status = Strings_BREAK[langu]);
          if (this.checked) {
              u = [];
              u.push(L.latLng(q - f, c));
              for (j = v - 1; -1 < j && (v = !1,
              this.trackpoints[j].time < p ? (c = this.getmapxy(p, !0, j + 1, !1),
              f = this.getmapxy(p, !1, j + 1, !1),
              v = !0) : (c = this.trackpoints[j].mapx,
              f = this.trackpoints[j].mapy),
              this.trackpoints[j + 1].time - this.trackpoints[j].time > d ? (g.push(new L.polyline(u,{
                  color: this.color,
                  weight: m,
                  lineJoin: "round",
                  opacity: h,
                  noClip: !1
              })),
              u = [],
              u.push(L.latLng(q - f, c)),
              t = 1) : (u.push(L.latLng(q - f, c)),
              t++),
              !v); j--)
                  ;
              0 < t && g.push(new L.polyline(u,{
                  color: this.color,
                  weight: m,
                  lineJoin: "round",
                  opacity: h,
                  noClip: !1
              }))
          }
      }
  }
}
;
competitor.prototype.drawtrackL2 = function(c, g, u, p, d, m, f, q, h, t, l, v) {
  this.multipointlist = null;
  if (t)
      this.drawtrackL2wgs(c, g, u, p, d, m, f, q, h, l, v);
  else if (g += this.offset,
  u += this.offset,
  m && (g += this.starttime,
  u += this.starttime),
  !(1 > this.pointcount)) {
      c = [];
      m = 0;
      this.fullroute && (u = this.starttime - this.showbeforestart);
      u < this.starttime - this.showbeforestart && (u = this.starttime - this.showbeforestart);
      this.status = d ? Strings_LIVE[langu] : Strings_OK[langu];
      if (g < this.starttime - this.showbeforestart || g < this.trackpoints[0].time) {
          for (d = 0; d < this.pointcount && this.trackpoints[d].time < this.starttime - this.showbeforestart; )
              d++;
          this.mapxalltodraw = this.getmapxy(this.starttime - this.showbeforestart, !0, d + 1, !1);
          this.mapyalltodraw = this.getmapxy(this.starttime - this.showbeforestart, !1, d + 1, !1);
          this.isovertime = !0;
          this.status = Strings_PRE[langu];
          this.currentspeed = -1;
          this.currentdistance = 0;
          this.path.setLatLngs(c);
          this.rallymode && (4 != this.rallystate && this.marker.options.icon.setrallystate(4),
          this.rallystate = 4);
          if (!this.sectormode)
              return
      } else {
          c = !1;
          g > this.trackpoints[this.pointcount - 1].time ? (c = this.isovertime = !0,
          this.status = d ? this.getovertimestring(g - this.trackpoints[this.pointcount - 1].time) : Strings_POST[langu],
          this.dataage = g - this.trackpoints[this.pointcount - 1].time,
          this.currentspeed = this.trackpoints[this.pointcount - 1].speed,
          this.currentdistance = this.trackpoints[this.pointcount - 1].distance) : this.isovertime = !1;
          for (var w = this.pointcount - 1; 0 < w && this.trackpoints[w - 1].time > g; )
              w--;
          this.mapxalltodraw = this.getmapxy(g, !0, w, !1);
          this.mapyalltodraw = this.getmapxy(g, !1, w, !1);
          var y = this.mapxalltodraw
            , A = this.mapyalltodraw;
          this.currentspeed = this.getspeed(g, w - 1);
          this.currentdistance = this.getdistance(g, w - 1);
          this.mapxtodraw = y;
          this.mapytodraw = A;
          0 < w && !c && (this.isovertime = g = this.trackpoints[w].time - this.trackpoints[w - 1].time > p) && (this.status = Strings_BREAK[langu]);
          this.rallymode && (d = d ? this.isovertime ? 100 > this.dataage ? this.currentspeed > 5 / 3.6 ? 3 : 4 : this.currentspeed > 5 / 3.6 ? 5 : 6 : this.currentspeed > 5 / 3.6 ? 1 : 2 : c && 100 < this.dataage ? this.currentspeed > 5 / 3.6 ? 5 : 6 : this.isovertime ? this.currentspeed > 5 / 3.6 ? 3 : 4 : this.currentspeed > 5 / 3.6 ? 1 : 2,
          this.rallystate != d && this.marker.options.icon.setrallystate(d),
          this.rallystate = d)
      }
      if (this.isbuoy && null != this.isconnectedto)
          h = [],
          c = [],
          h.push(L.latLng(f - A, y)),
          p = this.isconnectedto.mapxalltodraw,
          l = this.isconnectedto.mapyalltodraw,
          -1E4 != p && (h.push(L.latLng(f - A, y)),
          h.push(L.latLng(f - l, p)),
          c.push(h),
          this.path.setLatLngs(c));
      else if (this.checked && h) {
          h = [];
          c = [];
          if (this.sectormode) {
              if (null === this.splitInstance2a || null === this.splitInstance2b || this.splitInstance2b.time < this.splitInstance2a.time) {
                  this.path.setLatLngs(c);
                  return
              }
              u = this.splitInstance2a.time;
              g = this.splitInstance2b.time;
              for (w = this.pointcount - 1; 0 < w && this.trackpoints[w - 1].time > g; )
                  w--;
              y = this.getmapxy(g, !0, w, !1);
              A = this.getmapxy(g, !1, w, !1)
          }
          h.push(L.latLng(f - A, y));
          for (j = w - 1; -1 < j && (w = !1,
          this.trackpoints[j].time < u ? (y = this.getmapxy(u, !0, j + 1, !1),
          A = this.getmapxy(u, !1, j + 1, !1),
          w = !0) : (y = this.trackpoints[j].mapx,
          A = this.trackpoints[j].mapy),
          this.trackpoints[j + 1].time - this.trackpoints[j].time > p ? (c.push(h),
          h = [],
          h.push(L.latLng(f - A, y)),
          m = 1) : (h.push(L.latLng(f - A, y)),
          m++),
          !w); j--)
              ;
          0 < m && c.push(h);
          v && u > this.starttime - this.showbeforestart && 0 < c.length && 1 < c[c.length - 1].length && (vikalista = c[c.length - 1],
          vex1 = vikalista[vikalista.length - 2].lng,
          vey1 = vikalista[vikalista.length - 2].lat,
          vx1 = vikalista[vikalista.length - 1].lng,
          vy1 = vikalista[vikalista.length - 1].lat,
          wi = 4 * this.path.options.weight,
          d1 = vx1 - vex1,
          d2 = vy1 - vey1,
          pituus = Math.pow(Math.pow(d1, 2) + Math.pow(d2, 2), .5),
          0 < pituus ? (h = [],
          h.push(L.latLng(1 * vy1 + wi / 2 * d1 / (1 * pituus), vx1 - wi / 2 * d2 / (1 * pituus))),
          h.push(L.latLng(1 * vy1 - wi / 2 * d1 / (1 * pituus), vx1 + wi / 2 * d2 / (1 * pituus))),
          c.push(h)) : 2 < vikalista.length && (vex1 = vikalista[vikalista.length - 3].lng,
          vey1 = vikalista[vikalista.length - 3].lat,
          d1 = vx1 - vex1,
          d2 = vy1 - vey1,
          pituus = Math.pow(Math.pow(d1, 2) + Math.pow(d2, 2), .5),
          0 < pituus && (h = [],
          h.push(L.latLng(1 * vy1 + wi / 2 * d1 / (1 * pituus), vx1 - wi / 2 * d2 / (1 * pituus))),
          h.push(L.latLng(1 * vy1 - wi / 2 * d1 / (1 * pituus), vx1 + wi / 2 * d2 / (1 * pituus))),
          c.push(h))));
          this.path.setLatLngs(c);
          l && (this.multipointlist = c)
      }
  }
}
;
competitor.prototype.drawtrackL2wgs = function(c, g, u, p, d, m, f, q, h, t, l) {
  g += this.offset;
  u += this.offset;
  m && (g += this.starttime,
  u += this.starttime);
  if (!(1 > this.pointcount)) {
      f = [];
      m = 0;
      this.fullroute && (u = this.starttime - this.showbeforestart);
      u < this.starttime - this.showbeforestart && (u = this.starttime - this.showbeforestart);
      this.status = d ? Strings_LIVE[langu] : Strings_OK[langu];
      if (g < this.starttime - this.showbeforestart || g < this.trackpoints[0].time) {
          for (d = 0; d < this.pointcount && this.trackpoints[d].time < this.starttime - this.showbeforestart; )
              d++;
          this.mapxalltodraw = this.getmapxy(this.starttime - this.showbeforestart, !0, d + 1, !0);
          this.mapyalltodraw = this.getmapxy(this.starttime - this.showbeforestart, !1, d + 1, !0);
          this.isovertime = !0;
          this.status = Strings_PRE[langu];
          this.currentspeed = -1;
          this.currentdistance = 0;
          this.path.setLatLngs(f);
          this.rallymode && (4 != this.rallystate && this.marker.options.icon.setrallystate(4),
          this.rallystate = 4);
          if (!this.sectormode)
              return
      } else {
          f = !1;
          g > this.trackpoints[this.pointcount - 1].time ? (f = this.isovertime = !0,
          this.status = d ? this.getovertimestring(g - this.trackpoints[this.pointcount - 1].time) : "POST",
          this.dataage = g - this.trackpoints[this.pointcount - 1].time,
          this.currentspeed = this.trackpoints[this.pointcount - 1].speed,
          this.currentdistance = this.trackpoints[this.pointcount - 1].distance) : this.isovertime = !1;
          for (var v = this.pointcount - 1; 0 < v && this.trackpoints[v - 1].time > g; )
              v--;
          this.mapxalltodraw = this.getmapxy(g, !0, v, !0);
          this.mapyalltodraw = this.getmapxy(g, !1, v, !0);
          var w = this.mapxalltodraw
            , y = this.mapyalltodraw;
          this.currentspeed = this.getspeed(g, v - 1);
          this.currentdistance = this.getdistance(g, v - 1);
          this.mapxtodraw = w;
          this.mapytodraw = y;
          0 < v && !f && (this.isovertime = g = this.trackpoints[v].time - this.trackpoints[v - 1].time > p) && (this.status = Strings_BREAK[langu]);
          this.rallymode && (d = d ? this.isovertime ? 100 > this.dataage ? this.currentspeed > 5 / 3.6 ? 3 : 4 : this.currentspeed > 5 / 3.6 ? 5 : 6 : this.currentspeed > 5 / 3.6 ? 1 : 2 : f && 100 < this.dataage ? this.currentspeed > 5 / 3.6 ? 5 : 6 : this.isovertime ? this.currentspeed > 5 / 3.6 ? 3 : 4 : this.currentspeed > 5 / 3.6 ? 1 : 2,
          this.rallystate != d && this.marker.options.icon.setrallystate(d),
          this.rallystate = d)
      }
      if ((this.checked || !this.isbuoy) && h) {
          h = [];
          f = [];
          if (this.sectormode) {
              if (null === this.splitInstance2a || null === this.splitInstance2b || this.splitInstance2b.time < this.splitInstance2a.time) {
                  this.path.setLatLngs(f);
                  return
              }
              u = this.splitInstance2a.time;
              g = this.splitInstance2b.time;
              for (v = this.pointcount - 1; 0 < v && this.trackpoints[v - 1].time > g; )
                  v--;
              w = this.getmapxy(g, !0, v, !0);
              y = this.getmapxy(g, !1, v, !0)
          }
          h.push(L.latLng(y, w));
          for (j = v - 1; -1 < j && (v = !1,
          this.trackpoints[j].time < u ? (w = this.getmapxy(u, !0, j + 1, !0),
          y = this.getmapxy(u, !1, j + 1, !0),
          v = !0) : (w = this.trackpoints[j].wgsx,
          y = this.trackpoints[j].wgsy),
          this.trackpoints[j + 1].time - this.trackpoints[j].time > p ? (f.push(h),
          h = [],
          h.push(L.latLng(y, w)),
          m = 1) : (h.push(L.latLng(y, w)),
          m++),
          !v); j--)
              ;
          0 < m && f.push(h);
          l && u > this.starttime - this.showbeforestart && 0 < f.length && 1 < f[f.length - 1].length && (vikalista = f[f.length - 1],
          vex1 = c.project(vikalista[vikalista.length - 2]).x,
          vey1 = c.project(vikalista[vikalista.length - 2]).y,
          vx1 = c.project(vikalista[vikalista.length - 1]).x,
          vy1 = c.project(vikalista[vikalista.length - 1]).y,
          wi = 4 * this.path.options.weight,
          d1 = vx1 - vex1,
          d2 = vy1 - vey1,
          pituus = Math.pow(Math.pow(d1, 2) + Math.pow(d2, 2), .5),
          0 < pituus ? (h = [],
          h.push(c.unproject([vx1 - wi / 2 * d2 / (1 * pituus), 1 * vy1 + wi / 2 * d1 / (1 * pituus)])),
          h.push(c.unproject([vx1 + wi / 2 * d2 / (1 * pituus), 1 * vy1 - wi / 2 * d1 / (1 * pituus)])),
          f.push(h)) : 2 < vikalista.length && (vex1 = c.project(vikalista[vikalista.length - 3]).x,
          vey1 = c.project(vikalista[vikalista.length - 3]).y,
          d1 = vx1 - vex1,
          d2 = vy1 - vey1,
          pituus = Math.pow(Math.pow(d1, 2) + Math.pow(d2, 2), .5),
          0 < pituus && (h = [],
          h.push(c.unproject([vx1 - wi / 2 * d2 / (1 * pituus), 1 * vy1 + wi / 2 * d1 / (1 * pituus)])),
          h.push(c.unproject([vx1 + wi / 2 * d2 / (1 * pituus), 1 * vy1 - wi / 2 * d1 / (1 * pituus)])),
          f.push(h))));
          this.path.setLatLngs(f);
          t && (this.multipointlist = f)
      }
  }
}
;
competitor.prototype.drawtrackNEW = function(c, g, u, p, d, m) {
  var f = 0;
  if (!(1 > this.pointcount))
      if (this.fullroute && (p = this.starttime - this.showbeforestart),
      p < this.starttime - this.showbeforestart && (p = this.starttime - this.showbeforestart),
      this.status = m ? Strings_LIVE[langu] : Strings_OK[langu],
      u < this.starttime - this.showbeforestart) {
          for (c = 0; c < this.pointcount && this.trackpoints[c].time < this.starttime - this.showbeforestart; )
              c++;
          c = this.getmapxyNEW(this.starttime - this.showbeforestart, c + 1);
          this.mapxalltodraw = c.x;
          this.mapyalltodraw = c.y;
          g = g.maptoscreen(this.mapxalltodraw, this.mapyalltodraw);
          this.mapxtodraw = g.x;
          this.mapytodraw = g.y;
          this.isovertime = !0;
          this.status = Strings_PRE[langu];
          this.currentspeed = -1;
          this.currentdistance = 0
      } else {
          c.strokeStyle = this.color;
          var q = !1;
          u > this.trackpoints[this.pointcount - 1].time ? (q = this.isovertime = !0,
          this.status = Strings_POST[langu],
          this.dataage = u - this.trackpoints[this.pointcount - 1].time,
          this.status = this.status + " (" + Math.round(this.dataage, 0) + ")",
          this.currentspeed = this.trackpoints[this.pointcount - 1].speed,
          this.currentdistance = this.trackpoints[this.pointcount - 1].distance) : this.isovertime = !1;
          for (m = this.pointcount - 1; 0 < m && this.trackpoints[m - 1].time > u; )
              m--;
          var h = this.getmapxyNEW(u, m);
          this.mapxalltodraw = h.x;
          this.mapyalltodraw = h.y;
          var t = g.maptoscreen(this.mapxalltodraw, this.mapyalltodraw);
          h = t.x;
          t = t.y;
          this.currentspeed = this.getspeed(u, m - 1);
          this.currentdistance = this.getdistance(u, m - 1);
          this.mapxtodraw = h;
          this.mapytodraw = t;
          0 < m && !q && (this.isovertime = u = this.trackpoints[m].time - this.trackpoints[m - 1].time > d) && (this.status = Strings_BREAK[langu]);
          if (this.checked) {
              c.beginPath();
              c.moveTo(h, t);
              for (j = m - 1; -1 < j && (u = !1,
              this.trackpoints[j].time < p ? (h = this.getmapxyNEW(p, j + 1),
              t = g.maptoscreen(h.x, h.y),
              h = t.x,
              t = t.y,
              u = !0) : (t = g.maptoscreen(this.trackpoints[j].mapx, this.trackpoints[j].mapy),
              h = t.x,
              t = t.y),
              this.trackpoints[j + 1].time - this.trackpoints[j].time > d ? (c.stroke(),
              f = 0,
              c.beginPath(),
              c.moveTo(h, t)) : (c.lineTo(h, t),
              f++,
              500 < f && (c.stroke(),
              f = 0,
              c.beginPath(),
              c.moveTo(h, t))),
              !u); j--)
                  ;
              c.stroke()
          }
      }
}
;
competitor.prototype.drawtrack = function(c, g, u, p, d, m, f, q) {
  var h = 0;
  if (!(1 > this.pointcount))
      if (this.fullroute && (m = this.starttime - this.showbeforestart),
      m < this.starttime - this.showbeforestart && (m = this.starttime - this.showbeforestart),
      this.status = q ? Strings_LIVE[langu] : Strings_OK[langu],
      d < this.starttime - this.showbeforestart) {
          for (c = 0; c < this.pointcount && this.trackpoints[c].time < this.starttime - this.showbeforestart; )
              c++;
          this.mapxalltodraw = this.getmapxy(this.starttime - this.showbeforestart, !0, c + 1, !1);
          this.mapyalltodraw = this.getmapxy(this.starttime - this.showbeforestart, !1, c + 1, !1);
          this.mapxtodraw = (this.mapxalltodraw - g) * p;
          this.mapytodraw = (this.mapyalltodraw - u) * p;
          this.isovertime = !0;
          this.status = Strings_PRE[langu];
          this.currentspeed = -1;
          this.currentdistance = 0
      } else {
          c.strokeStyle = this.color;
          var t = !1;
          d > this.trackpoints[this.pointcount - 1].time ? (t = this.isovertime = !0,
          this.status = Strings_POST[langu],
          this.dataage = d - this.trackpoints[this.pointcount - 1].time,
          this.currentspeed = this.trackpoints[this.pointcount - 1].speed,
          this.currentdistance = this.trackpoints[this.pointcount - 1].distance) : this.isovertime = !1;
          for (var l = this.pointcount - 1; 0 < l && this.trackpoints[l - 1].time > d; )
              l--;
          this.mapxalltodraw = this.getmapxy(d, !0, l, !1);
          this.mapyalltodraw = this.getmapxy(d, !1, l, !1);
          q = (this.mapxalltodraw - g) * p;
          var v = (this.mapyalltodraw - u) * p;
          this.currentspeed = this.getspeed(d, l - 1);
          this.currentdistance = this.getdistance(d, l - 1);
          this.mapxtodraw = q;
          this.mapytodraw = v;
          0 < l && !t && (this.isovertime = d = this.trackpoints[l].time - this.trackpoints[l - 1].time > f) && (this.status = Strings_BREAK[langu]);
          if (this.checked) {
              c.beginPath();
              c.moveTo(q, v);
              for (j = l - 1; -1 < j && (d = !1,
              this.trackpoints[j].time < m ? (q = (this.getmapxy(m, !0, j + 1, !1) - g) * p,
              v = (this.getmapxy(m, !1, j + 1, !1) - u) * p,
              d = !0) : (q = (this.trackpoints[j].mapx - g) * p,
              v = (this.trackpoints[j].mapy - u) * p),
              this.trackpoints[j + 1].time - this.trackpoints[j].time > f ? (c.stroke(),
              h = 0,
              c.beginPath(),
              c.moveTo(q, v)) : (c.lineTo(q, v),
              h++,
              500 < h && (c.stroke(),
              h = 0,
              c.beginPath(),
              c.moveTo(q, v))),
              !d); j--)
                  ;
              c.stroke()
          }
      }
}
;
competitor.prototype.getspeed = function(c, g) {
  return 0 > g ? -1 : c > this.trackpoints[this.pointcount - 1].time ? this.trackpoints[this.pointcount - 1].speed : this.trackpoints[g].speed + (this.trackpoints[g + 1].speed - this.trackpoints[g].speed) * (c - this.trackpoints[g].time) / (this.trackpoints[g + 1].time - this.trackpoints[g].time)
}
;
competitor.prototype.getdistance = function(c, g) {
  return 0 > g ? 0 : c > this.trackpoints[this.pointcount - 1].time ? this.trackpoints[this.pointcount - 1].distance : this.trackpoints[g].distance + (this.trackpoints[g + 1].distance - this.trackpoints[g].distance) * (c - this.trackpoints[g].time) / (this.trackpoints[g + 1].time - this.trackpoints[g].time)
}
;
competitor.prototype.updatedistances = function(c, g, u, p, d, m) {
  if (!(2 > this.pointcount) && this.lowestadded != this.pointcount - 1) {
      1 > this.lowestadded && (this.lowestadded = 1);
      for (i5 = this.lowestadded; i5 < this.pointcount; i5++)
          this.trackpoints[i5].setdistance(this.trackpoints[i5 - 1], c);
      if (null != d && !this.nocourse) {
          if (this.lowestadded < this.highestwcd) {
              for (var f = this.lowestadded - 1; 0 < f && 0 > this.trackpoints[f].coursedistance; )
                  f--;
              this.highestwcd = f
          }
          var q = f = 0
            , h = 0;
          -1 < this.highestwcd && (f = this.trackpoints[this.highestwcd].coursedistance,
          q = this.trackpoints[this.highestwcd].timefromstart,
          h = this.trackpoints[this.highestwcd].speed);
          for (i5 = this.lowestadded; i5 < this.pointcount; i5++)
              0 < this.trackpoints[i5].timefromstart && this.trackpoints[i5].timefromstart < this.finishtimeupperlimit && (f = d.getsimplecoursedistance(this.trackpoints[i5].mapx, this.trackpoints[i5].mapy, f, this.highestwcd, this.trackpoints[i5].timefromstart, q, this.trackpoints[i5].distance, h, this.id),
              this.trackpoints[i5].coursedistance = f.d,
              f.f && (this.finished = !0,
              this.finishtime = f.ft,
              this.finishtimeupperlimit = this.trackpoints[i5].timefromstart),
              this.highestwcd = i5,
              f = this.trackpoints[this.highestwcd].coursedistance,
              q = this.trackpoints[this.highestwcd].timefromstart,
              h = this.trackpoints[this.highestwcd].speed)
      }
      if (null != this.rogc)
          for (i10 = this.rogpoints = 0; i10 < this.rogc.length; i10++)
              0 > this.rogc[i10] && (this.rogc[i10] = this.calcrog(g[i10].x, g[i10].y, u * c.overallscale, p, m)),
              0 < this.rogc[i10] && (this.rogpoints += 1 * g[i10].points);
      this.lowestadded = this.pointcount - 1
  }
}
;
competitor.prototype.drawballoon = function(c, g) {
  -1E4 != this.mapxtodraw && (c.globalAlpha = this.isovertime ? .5 : 1,
  c.beginPath(),
  c.arc(this.mapxtodraw, this.mapytodraw, g / 2, 0, 2 * Math.PI, !0),
  c.closePath(),
  c.strokeStyle = this.isovertime ? "gray" : "black",
  c.lineWidth = 2,
  c.fillStyle = this.color,
  c.fill(),
  c.stroke())
}
;
competitor.prototype.drawballoonL = function(c, g, u, p, d, m) {
  -1E4 != this.mapxalltodraw && g.push(marker2)
}
;
competitor.prototype.drawballoonL2 = function(c, g) {
  if (-1E4 != this.mapxalltodraw) {
      var u = 1;
      !this.isovertime || this.isbuoy || this.rallymode || (u = .6);
      this.rallymode || this.marker.setOpacity(u);
      this.marker.setLatLng(L.latLng(g ? this.mapyalltodraw : c - this.mapyalltodraw, this.mapxalltodraw));
      this.rallymode || this.marker.options.icon.setopacity(u)
  }
}
;
competitor.prototype.drawletters = function(c, g, u, p) {
  -1E4 != this.mapxtodraw && (c.strokeStyle = "black",
  c.lineWidth = 1,
  p && (p = c.measureText(this.letters).width,
  c.fillStyle = "white",
  c.globalAlpha = .5,
  fillRoundedRect(c, this.mapxtodraw + u - 3, this.mapytodraw + u - 2, p + 6, g + 5, 4),
  c.globalAlpha = 1,
  strokeRoundedRect(c, this.mapxtodraw + u - 3, this.mapytodraw + u - 2, p + 6, g + 5, 4)),
  c.fillStyle = this.color,
  c.fillText(this.letters, this.mapxtodraw + u, this.mapytodraw + u + g),
  c.strokeText(this.letters, this.mapxtodraw + u, this.mapytodraw + u + g))
}
;
competitor.prototype.getcoordstodraw = function(c, g, u) {
  var p = [];
  if (1 > this.pointcount)
      return p;
  if (c <= this.trackpoints[0].time)
      return this.wgsxtodraw = this.trackpoints[0].wgsx,
      this.wgsytodraw = this.trackpoints[0].wgsy,
      this.isovertime = !0,
      p;
  this.isovertime = c > this.trackpoints[this.pointcount - 1].time ? !0 : !1;
  for (var d = this.pointcount - 1; 0 < d && this.trackpoints[d - 1].time > c; )
      d--;
  var m = this.getwgsxy(c, !0, d);
  c = this.getwgsxy(c, !1, d);
  p.push(new LatLon(c,m));
  this.wgsxtodraw = m;
  this.wgsytodraw = c;
  0 < d && (this.isovertime = this.trackpoints[d].time - this.trackpoints[d - 1].time > u);
  for (j = d - 1; -1 < j && (u = !1,
  this.trackpoints[j].time < g ? (m = this.getwgsxy(g, !0, j),
  c = this.getwgsxy(g, !1, j),
  u = !0) : (m = this.trackpoints[j].wgsx,
  c = this.trackpoints[j].wgsy),
  p.push(new LatLon(c,m)),
  !u); j--)
      ;
  return p
}
;
competitor.prototype.getmapcoordstodraw = function(c, g, u) {
  var p = [];
  if (1 > this.pointcount)
      return p;
  if (c <= this.trackpoints[0].time)
      return this.wgsxtodraw = this.trackpoints[0].wgsx,
      this.wgsytodraw = this.trackpoints[0].wgsy,
      this.isovertime = !0,
      p;
  this.isovertime = c > this.trackpoints[this.pointcount - 1].time ? !0 : !1;
  for (var d = this.pointcount - 1; 0 < d && this.trackpoints[d - 1].time > c; )
      d--;
  var m = this.getmapxy(c, !0, d, !1);
  c = this.getmapxy(c, !1, d, !1);
  p.push(new LatLon(c,m));
  this.wgsxtodraw = m;
  this.wgsytodraw = c;
  0 < d && (this.isovertime = this.trackpoints[d].time - this.trackpoints[d - 1].time > u);
  for (j = d - 1; -1 < j && (u = !1,
  this.trackpoints[j].time < g ? (m = this.getmapxy(g, !0, j),
  c = this.getmapxy(g, !1, j),
  u = !0) : (m = this.trackpoints[j].mapx,
  c = this.trackpoints[j].mapy),
  p.push(new LatLon(c,m)),
  !u); j--)
      ;
  return p
}
;
competitor.prototype.getmapxy = function(c, g, u, p) {
  if (p) {
      if (c <= this.trackpoints[0].time)
          return g ? this.trackpoints[0].wgsx : this.trackpoints[0].wgsy;
      if (c > this.trackpoints[this.pointcount - 1].time || u > this.pointcount - 1)
          return g ? this.trackpoints[this.pointcount - 1].wgsx : this.trackpoints[this.pointcount - 1].wgsy;
      c = g ? (1 * c - this.trackpoints[u - 1].time) / (this.trackpoints[u].time - this.trackpoints[u - 1].time) * (this.trackpoints[u].wgsx - this.trackpoints[u - 1].wgsx) + this.trackpoints[u - 1].wgsx : (1 * c - this.trackpoints[u - 1].time) / (this.trackpoints[u].time - this.trackpoints[u - 1].time) * (this.trackpoints[u].wgsy - this.trackpoints[u - 1].wgsy) + this.trackpoints[u - 1].wgsy
  } else {
      if (c <= this.trackpoints[0].time)
          return g ? this.trackpoints[0].mapx : this.trackpoints[0].mapy;
      if (c > this.trackpoints[this.pointcount - 1].time || u > this.pointcount - 1)
          return g ? this.trackpoints[this.pointcount - 1].mapx : this.trackpoints[this.pointcount - 1].mapy;
      c = g ? (1 * c - this.trackpoints[u - 1].time) / (this.trackpoints[u].time - this.trackpoints[u - 1].time) * (this.trackpoints[u].mapx - this.trackpoints[u - 1].mapx) + this.trackpoints[u - 1].mapx : (1 * c - this.trackpoints[u - 1].time) / (this.trackpoints[u].time - this.trackpoints[u - 1].time) * (this.trackpoints[u].mapy - this.trackpoints[u - 1].mapy) + this.trackpoints[u - 1].mapy
  }
  return c
}
;
competitor.prototype.getmapxyNEW = function(c, g) {
  return c <= this.trackpoints[0].time ? {
      x: this.trackpoints[0].mapx,
      y: this.trackpoints[0].mapy
  } : c > this.trackpoints[this.pointcount - 1].time || g > this.pointcount - 1 ? {
      x: this.trackpoints[this.pointcount - 1].mapx,
      y: this.trackpoints[this.pointcount - 1].mapy
  } : {
      x: (1 * c - this.trackpoints[g - 1].time) / (this.trackpoints[g].time - this.trackpoints[g - 1].time) * (this.trackpoints[g].mapx - this.trackpoints[g - 1].mapx) + this.trackpoints[g - 1].mapx,
      y: (1 * c - this.trackpoints[g - 1].time) / (this.trackpoints[g].time - this.trackpoints[g - 1].time) * (this.trackpoints[g].mapy - this.trackpoints[g - 1].mapy) + this.trackpoints[g - 1].mapy
  }
}
;
competitor.prototype.getwgsxy = function(c, g, u) {
  return c <= this.trackpoints[0].time ? g ? this.trackpoints[0].wgsx : this.trackpoints[0].wgsy : c > this.trackpoints[this.pointcount - 1].time || u > this.pointcount - 1 ? g ? this.trackpoints[this.pointcount - 1].wgsx : this.trackpoints[this.pointcount - 1].wgsy : paikka
}
;
competitor.prototype.getnearesttimetopoint = function(c, g) {
  var u = -1
    , p = -999999;
  if (1 < this.pointcount)
      for (n = 1; n < this.pointcount; n++) {
          var d = this.trackpoints[n - 1].mapx;
          var m = this.trackpoints[n - 1].mapy
            , f = this.trackpoints[n].mapx - d
            , q = this.trackpoints[n].mapy - m
            , h = 0;
          if (0 != f || 0 != q)
              h = ((c - d) * f + (g - m) * q) / (f * f + q * q);
          1 < h && (h = 1);
          0 > h && (h = 0);
          d = Math.pow(c - (d + h * f), 2) + Math.pow(g - (m + h * q), 2);
          if (-1 == u || u > d)
              u = d,
              p = this.trackpoints[n - 1].time + h * (this.trackpoints[n].time - this.trackpoints[n - 1].time)
      }
  return p
}
;
competitor.prototype.getnearesttimetopointlimited = function(c, g, u, p, d, m, f) {
  var q = -1
    , h = -9999999;
  d = u ? d : d + this.starttime;
  p = u ? p : p + this.starttime;
  if (1 < this.pointcount) {
      for (n = 1; n < this.pointcount; n++)
          if (this.trackpoints[n - 1].time < d && this.trackpoints[n].time > p) {
              var t = this.trackpoints[n - 1].mapx;
              var l = this.trackpoints[n - 1].mapy
                , v = this.trackpoints[n].mapx - t
                , w = this.trackpoints[n].mapy - l
                , y = 0;
              if (0 != v || 0 != w)
                  y = ((c - t) * v + (g - l) * w) / (v * v + w * w);
              1 < y && (y = 1);
              0 > y && (y = 0);
              t = Math.pow(c - (1 * t + y * v), 2) + Math.pow(g - (1 * l + y * w), 2);
              if (-1 == q || q > t)
                  q = t,
                  h = this.trackpoints[n - 1].time + y * (this.trackpoints[n].time - this.trackpoints[n - 1].time)
          }
      h > d && (h = d);
      h < p && (h = p);
      return -1 == q || 0 < m && q > m * m * f * f || h < this.starttime ? -9999999 : u ? h : h - this.starttime
  }
  return -9999999
}
;
competitor.prototype.getovertimestring = function(c) {
  var g = Math.floor(c / 60);
  c = Math.floor(c - 60 * g);
  return g + ":" + (10 > c ? "0" : "") + c
}
;
competitor.prototype.setsectoratstart = function() {
  this.splitInstance2a = {
      name: this.letters,
      time: this.starttime,
      hl: !1,
      distance: 0
  }
}
;
competitor.prototype.calcrog = function(c, g, u, p, d) {
  var m = -1
    , f = -999999;
  if (1 < this.pointcount) {
      var q = 1;
      1 > q && (q = 1);
      for (n = q; n < this.pointcount; n++) {
          var h = this.trackpoints[n - 1].mapx;
          var t = this.trackpoints[n - 1].mapy
            , l = this.trackpoints[n].mapx - h
            , v = this.trackpoints[n].mapy - t;
          q = 0;
          if (0 != l || 0 != v)
              q = ((c - h) * l + (g - t) * v) / (l * l + v * v);
          1 < q && (q = 1);
          0 > q && (q = 0);
          h = Math.pow(c - (h + q * l), 2) + Math.pow(g - (t + q * v), 2);
          (-1 == m || m > h) && this.trackpoints[n].time - this.trackpoints[n - 1].time < p && (m = h,
          f = this.trackpoints[n - 1].time + q * (this.trackpoints[n].time - this.trackpoints[n - 1].time))
      }
      if (0 <= m && m < u * u && 0 < f && f < d + 1)
          return f
  }
  return -1
}
;
competitor.prototype.calcsplit1 = function(c, g, u, p, d, m, f, q, h, t) {
  switch (t) {
  case 0:
      this.splitInstance = null;
      break;
  case 1:
      this.splitInstance2a = null;
      break;
  case 2:
      this.splitInstance2b = null
  }
  if (!f || this.checked) {
      this.split1 = -999999;
      f = -1;
      var l = -999999
        , v = -9999;
      if (1 < this.pointcount) {
          for (var w = 1; w < this.pointcount && (this.trackpoints[w].time < q || this.trackpoints[w].timefromstart < h); )
              w++;
          for (n = w; n < this.pointcount; n++) {
              h = this.trackpoints[n - 1].mapx;
              w = this.trackpoints[n - 1].mapy;
              var y = this.trackpoints[n].mapx - h
                , A = this.trackpoints[n].mapy - w;
              q = 0;
              if (0 != y || 0 != A)
                  q = ((c - h) * y + (g - w) * A) / (y * y + A * A);
              1 < q && (q = 1);
              0 > q && (q = 0);
              h = Math.pow(c - (h + q * y), 2) + Math.pow(g - (w + q * A), 2);
              if (-1 == f || f > h)
                  f = h,
                  l = this.trackpoints[n - 1].time + q * (this.trackpoints[n].time - this.trackpoints[n - 1].time),
                  v = n - 1
          }
          0 <= f && f < u * p * u * p && 0 < l && (this.split1 = l)
      }
      if (-999998 < this.split1)
          switch (t) {
          case 0:
              this.splitInstance = {
                  name: m ? this.letters : this.name,
                  time: d ? this.split1 - this.starttime : this.split1 + this.timedifference,
                  hl: this.highlighted
              };
              break;
          case 1:
              this.splitInstance2a = {
                  name: m ? this.letters : this.name,
                  time: this.split1,
                  hl: this.highlighted,
                  distance: this.getdistance(this.split1, v)
              };
              break;
          case 2:
              this.splitInstance2b = {
                  name: m ? this.letters : this.name,
                  time: this.split1,
                  hl: this.highlighted,
                  distance: this.getdistance(this.split1, v)
              }
          }
  }
}
;
competitor.prototype.calcsplit1line = function(c, g, u, p, d, m, f, q, h, t, l, v) {
  switch (v) {
  case 0:
      this.splitInstance = null;
      break;
  case 1:
      this.splitInstance2a = null;
      break;
  case 2:
      this.splitInstance2b = null
  }
  if (!(q && !this.checked || 2 > this.pointcount)) {
      q = [];
      this.split1 = -999999;
      var w = this.pointcount
        , y = [];
      if (d) {
          for (d = 0; d < this.pointcount && (this.trackpoints[d].time < h || this.trackpoints[d].timefromstart < t); )
              d++;
          for (i = d; i < w - 1; i++)
              doLineSegmentsIntersect(this.trackpoints[i].wgsx, this.trackpoints[i].wgsy, this.trackpoints[i + 1].wgsx, this.trackpoints[i + 1].wgsy, c, g, u, p) && (h = this.trackpoints[i].time,
              t = this.trackpoints[i + 1].time,
              t -= h,
              d = this.intersectPoint(this.trackpoints[i].wgsx, this.trackpoints[i].wgsy, this.trackpoints[i + 1].wgsx, this.trackpoints[i + 1].wgsy, c, g, u, p),
              h = d * t + h,
              q[q.length] = h,
              y[y.length] = i)
      } else {
          for (d = 0; d < this.pointcount && (this.trackpoints[d].time < h || this.trackpoints[d].timefromstart < t); )
              d++;
          for (i = d; i < w - 1; i++)
              doLineSegmentsIntersect(this.trackpoints[i].mapx, this.trackpoints[i].mapy, this.trackpoints[i + 1].mapx, this.trackpoints[i + 1].mapy, c, g, u, p) && (h = this.trackpoints[i].time,
              t = this.trackpoints[i + 1].time,
              t -= h,
              d = this.intersectPoint(this.trackpoints[i].mapx, this.trackpoints[i].mapy, this.trackpoints[i + 1].mapx, this.trackpoints[i + 1].mapy, c, g, u, p),
              h = d * t + h,
              q[q.length] = h,
              y[y.length] = i)
      }
      if (q.length > l)
          switch (v) {
          case 0:
              this.splitInstance = {
                  name: f ? this.letters : this.name,
                  time: m ? q[l] - this.starttime : q[l] + this.timedifference,
                  hl: this.highlighted
              };
              break;
          case 1:
              this.splitInstance2a = {
                  name: f ? this.letters : this.name,
                  time: q[l],
                  hl: this.highlighted,
                  distance: this.getdistance(q[l], y[l])
              };
              break;
          case 2:
              this.splitInstance2b = {
                  name: f ? this.letters : this.name,
                  time: q[l],
                  hl: this.highlighted,
                  distance: this.getdistance(q[l], y[l])
              }
          }
  }
}
;
competitor.prototype.calcsectortime = function(c) {
  this.splitInstance2 = null;
  null == this.splitInstance2a || null == this.splitInstance2b || this.splitInstance2a.time > this.splitInstance2b.time || (this.splitInstance2 = {
      name: c ? this.letters : this.name,
      time: this.splitInstance2b.time - this.splitInstance2a.time,
      hl: this.highlighted,
      distance: Math.round(this.splitInstance2b.distance - this.splitInstance2a.distance),
      index: this.index
  })
}
;
competitor.prototype.getsplit1 = function() {
  return -999990 > this.split1 ? this.letters + " N/A" : this.letters + " " + this.getovertimestring(this.split1)
}
;
competitor.prototype.getcompare2time = function(c, g) {
  c = g ? c : c + this.starttime;
  return 0 == this.pointcount || c < this.starttime ? -9999999 : c > this.trackpoints[this.pointcount - 1].time ? this.trackpoints[this.pointcount - 1].time - (g ? 0 : this.starttime) : c - (g ? 0 : this.starttime)
}
;
competitor.prototype.intersectPoint = function(c, g, u, p, d, m, f, q) {
  var h = q - m
    , t = (u - c) * h - (p - g) * (f - d);
  return 0 != t ? (t = ((g - m) * (f - d) - (c - d) * h) / t,
  0 > t ? (console.log("R=" + t),
  0) : 1 < t ? (console.log("R=" + t + " (" + c + "," + g + ")(" + u + "," + p + ")(" + d + "," + m + ")(" + f + "," + q + ")"),
  1) : t) : 0
}
;
function doLineSegmentsIntersect(c, g, u, p, d, m, f, q) {
  if (d < f) {
      if (c < d && u < d || c > f && u > f)
          return !1
  } else if (c < f && u < f || c > d && u > d)
      return !1;
  if (m < q) {
      if (g < m && p < m || g > q && p > q)
          return !1
  } else if (g < q && p < q || g > m && p > m)
      return !1;
  var h = {}
    , t = {}
    , l = {}
    , v = {};
  h.x = c;
  h.y = g;
  t.x = u;
  t.y = p;
  l.x = d;
  l.y = m;
  v.x = f;
  v.y = q;
  u = subtractPoints(t, h);
  c = subtractPoints(v, l);
  g = crossProduct(subtractPoints(l, h), u);
  u = crossProduct(u, c);
  if (0 == g && 0 == u)
      return equalPoints(h, l) || equalPoints(h, v) || equalPoints(t, l) || equalPoints(t, v) ? !0 : 0 > l.x - h.x != 0 > l.x - t.x != 0 > v.x - h.x != 0 > v.x - t.x || 0 > l.y - h.y != 0 > l.y - t.y != 0 > v.y - h.y != 0 > v.y - t.y;
  if (0 == u)
      return !1;
  t = g / u;
  h = crossProduct(subtractPoints(l, h), c) / u;
  return 0 <= h && 1 >= h && 0 <= t && 1 >= t
}
function crossProduct(c, g) {
  return c.x * g.y - c.y * g.x
}
function subtractPoints(c, g) {
  var u = {};
  u.x = c.x - g.x;
  u.y = c.y - g.y;
  return u
}
function equalPoints(c, g) {
  return c.x == g.x && c.y == g.y
}
;function Event(c, g, u) {
  this.eventpath = c;
  this.iFactor = g;
  this.initloaded = !1;
  this.replaymode = !0;
  this.tfsmode = !1;
  this.racename = "";
  this.timedifference = 10800;
  this.livegrabinterval = 15;
  this.livebuffer = 30;
  this.rogbuffer = 0;
  this.dashlimit = 45;
  this.markersize = 10;
  this.lettersize = 16;
  this.linewidth = 5;
  this.lineopacity = .8;
  this.taillength = 60;
  this.showbeforestart = 0;
  this.maxtimemins = -1;
  this.isliveevent = !1;
  this.lkm = 0;
  this.tracks = [];
  this.buoys = [];
  this.splitlines = [];
  this.nextsplitid = 1;
  this.splitdefaultrt = "";
  this.calibration = this.setdefaulttail = this.enablerog = this.updaterogonmap = this.updateroglist = this.data_added = this.createnamelist = null;
  this.replaymintime = 999999999999;
  this.timetodraw = this.replaymaxtimeTFS = this.replaymintimeTFS = this.replaymaxtime = 0;
  this.resetvalue = -1;
  this.bytesrecieved = 0;
  this.lastline = "undef";
  this.last10drawtime = this.draws = 0;
  this.autocentered = -1;
  this.mapsystem = this.numberoflogos = 0;
  this.forcedMapSystem = u;
  this.overlay = this.cpoint = null;
  this.showlines = !0;
  this.liveCenterLogin = this.showrogs = !1;
  this.lcLogoutText = "WOC2017";
  this.difference = -9999999;
  this.sectorcolormode = this.sectormode = !1;
  this.sectorhl = -1;
  this.sectorhlpath = L.polyline([[0, 0]], {
      contextmenu: !0,
      color: "black",
      weight: 10,
      opacity: 1,
      lineJoin: "round",
      pointerEvents: "none"
  });
  this.sectorhlpath2 = L.polyline([[0, 0]], {
      contextmenu: !0,
      color: "yellow",
      weight: 6,
      opacity: 1,
      lineJoin: "round",
      pointerEvents: "none"
  });
  this.sectororder = null;
  this.sectorhlpopuptext = "";
  this.sectorhlpath2.bindPopup(this.sectorhlpopuptext);
  this.isrogaining = !1;
  this.rogctrls = null;
  this.rogradius = 50;
  this.leadingrog = this.selectedrog = -1;
  this.nomorelive = !1;
  this.centeredonce = !0;
  this.drawTailEnd = !1;
  this.course = null;
  this.colors = [];
  this.colors[0] = "rgb(0,0,255)";
  this.colors[1] = "rgb(255,0,0)";
  this.colors[2] = "rgb(0,128,0)";
  this.colors[3] = "rgb(128,0,0)";
  this.colors[4] = "rgb(0,0,128)";
  this.colors[5] = "rgb(255,0,128)";
  this.colors[6] = "rgb(255,128,0)";
  this.colors[7] = "rgb(0,128,255)";
  this.colors[8] = "rgb(128,0,255)";
  this.colors[9] = "#08bf08";
  this.load_init = function() {
      $.ajax({
          type: "get",
          url: this.eventpath + "init.txt" + (issessioned ? "?GpsSeurantaSessionID=" + sessionid : ""),
          contentType: "application/text; charset=ISO-8859-1",
          error: function() {
              status = "Can't get init data";
              window.alert(this.eventpath + "init.txt " + status)
          },
          cache: !1,
          context: this,
          success: function(d) {
              this.handleinidata(d)
          }
      })
  }
  ;
  this.initialiseMarkersizes = function(d, m, f, q) {
      this.markersize = d;
      this.lettersize = m;
      this.linewidth = f;
      this.lineopacity = q
  }
  ;
  this.setMarkerSize = function(d) {
      this.markersize = d;
      for (i = 0; i < this.tracks.length; i++)
          this.tracks[i].changeiconsize(this.markersize, this.lettersize);
      for (i = 0; i < this.buoys.length; i++)
          this.buoys[i].changeiconsize(this.markersize, this.lettersize)
  }
  ;
  this.setLetterSize = function(d) {
      this.lettersize = d;
      for (i = 0; i < this.tracks.length; i++)
          this.tracks[i].changeiconsize(this.markersize, this.lettersize);
      for (i = 0; i < this.buoys.length; i++)
          this.tracks[i].changeiconsize(this.markersize, this.lettersize)
  }
  ;
  this.setLineWidth = function(d) {
      this.linewidth = d;
      for (i = 0; i < this.tracks.length; i++)
          this.tracks[i].changelinestyle(this.linewidth, this.lineopacity)
  }
  ;
  this.setLineOpacity = function(d) {
      this.lineopacity = d;
      for (i = 0; i < this.tracks.length; i++)
          this.tracks[i].changelinestyle(this.linewidth, this.lineopacity)
  }
  ;
  this.setTailLength = function(d) {
      this.taillength = d
  }
  ;
  this.checkAll = function(d, m) {
      for (i = 0; i < this.tracks.length; i++)
          this.tracks[i].setchecked(!0, d, m);
      m && this.reorderPaths(d)
  }
  ;
  this.checkNone = function(d, m) {
      for (i = 0; i < this.tracks.length; i++)
          this.tracks[i].setchecked(!1, d, m)
  }
  ;
  this.checkUntil = function(d, m, f) {
      for (i = 0; i < this.tracks.length; i++)
          this.tracks[i].setchecked(i <= d ? !0 : !1, m, f);
      f && this.reorderPaths(m)
  }
  ;
  this.toggleCheck = function(d, m, f) {
      this.tracks[d].setchecked(!this.tracks[d].checked, m, f);
      f && this.reorderPaths(m)
  }
  ;
  this.addbuoys = function(d) {
      for (i = 0; i < this.buoys.length; i++)
          this.buoys[i].marker.addTo(d);
      for (i = 0; i < this.buoys.length; i++)
          null != this.buoys[i].isconnectedto && this.buoys[i].path.addTo(d),
          console.log(this.buoys[i].isconnectedto)
  }
  ;
  this.toggleAutocenter = function(d) {
      this.tracks[d].autocenter = !this.tracks[d].autocenter;
      if (this.tracks[d].autocenter) {
          for (i = 0; i < this.tracks.length; i++)
              this.tracks[i].autocenter = i == d ? !0 : !1;
          this.autocentered = d
      } else
          this.autocentered = -1
  }
  ;
  this.setDrawTailEnd = function(d) {
      this.drawTailEnd = d
  }
  ;
  this.getOffset = function(d) {
      return this.tracks[d].offset
  }
  ;
  this.setOffset = function(d, m) {
      this.tracks[d].offset = m
  }
  ;
  this.resetAllOffsets = function() {
      for (i = 0; i < this.tracks.length; i++)
          this.tracks[i].offset = 0
  }
  ;
  this.setoneclickmassstart = function(d, m) {
      var f = d
        , q = m;
      0 < this.mapsystem && (f = this.calibration.getmapx(d, m),
      q = this.calibration.getmapy(d, m));
      d = 1E20;
      for (i = 0; i < this.tracks.length; i++)
          this.tracks[i].offset = 0,
          this.tracks[i].checked && (m = this.tracks[i].getnearesttimetopoint(f, q),
          -1E5 < m && (tfsmode && (m -= this.tracks[i].starttime),
          m < d && (d = m)),
          this.tracks[i].oneclicktempsplit = m);
      if (1E20 > d)
          for (i = 0; i < this.tracks.length; i++)
              this.tracks[i].checked && -1E5 < this.tracks[i].oneclicktempsplit && (this.tracks[i].offset = this.tracks[i].oneclicktempsplit - d);
      return d
  }
  ;
  this.setsectormode = function(d, m) {
      this.sectormode = d;
      for (i = 0; i < this.tracks.length; i++)
          this.tracks[i].setsectormode(d, m);
      d ? (this.sectorhlpath.addTo(m),
      this.sectorhlpath2.addTo(m)) : m.hasLayer(this.sectorhlpath) && (m.removeLayer(this.sectorhlpath),
      m.removeLayer(this.sectorhlpath2));
      this.sectorcolormode && this.sectorcolortracks(d);
      this.reorderPaths(m)
  }
  ;
  this.setsectorcolormode = function(d, m) {
      this.sectorcolormode = d;
      for (i = 0; i < this.tracks.length; i++)
          this.tracks[i].sectorcolormode = d;
      d && this.sectormode ? this.sectorcolortracks(!0) : this.sectorcolortracks(!1);
      this.reorderPaths(m)
  }
  ;
  this.sectorcolortracks = function(d) {
      if (d)
          for (i = 0; i < this.tracks.length; i++) {
              d = .5 < this.tracks[i].sectorfactor ? 255 : Math.round(this.tracks[i].sectorfactor / .5 * 255);
              var m = .5 < this.tracks[i].sectorfactor ? Math.round(255 - (this.tracks[i].sectorfactor - .5) / .5 * 255) : Math.round(128 + this.tracks[i].sectorfactor / .5 * 127);
              this.tracks[i].sectorcolor = "rgb(" + d + "," + m + ",0)";
              this.tracks[i].path.setStyle({
                  color: "rgb(" + d + "," + m + ",0)"
              })
          }
      else
          for (i = 0; i < this.tracks.length; i++)
              this.tracks[i].path.setStyle({
                  color: this.tracks[i].color
              })
  }
  ;
  this.calcsectortimes = function(d, m, f, q, h, t, l, v) {
      if (0 == this.splitlines.length)
          return "";
      if (0 > d)
          for (i = 0; i < this.tracks.length; i++)
              this.tracks[i].setsectoratstart();
      else if (this.splitlines[d].ispoint)
          for (i = 0; i < this.tracks.length; i++)
              this.tracks[i].calcsplit1(this.splitlines[d].x1B, 0 < this.mapsystem ? this.splitlines[d].y1B : h - this.splitlines[d].y1B, this.splitlines[d].radiusmeters, this.calibration.overallscale, !1, l, v, this.splitlines[d].ignorebeforerealtime, this.splitlines[d].ignorebeforetfs, 1);
      else
          for (i2 = 0; i2 < this.tracks.length; i2++)
              this.tracks[i2].calcsplit1line(this.splitlines[d].x1, 0 < this.mapsystem ? this.splitlines[d].y1 : h - this.splitlines[d].y1, this.splitlines[d].x2, 0 < this.mapsystem ? this.splitlines[d].y2 : h - this.splitlines[d].y2, 0 < this.mapsystem, !1, l, v, this.splitlines[d].ignorebeforerealtime, this.splitlines[d].ignorebeforetfs, f, 1);
      if (this.splitlines[m].ispoint)
          for (i = 0; i < this.tracks.length; i++)
              this.tracks[i].calcsplit1(this.splitlines[m].x1B, 0 < this.mapsystem ? this.splitlines[m].y1B : h - this.splitlines[m].y1B, this.splitlines[m].radiusmeters, this.calibration.overallscale, !1, l, v, this.splitlines[m].ignorebeforerealtime, this.splitlines[m].ignorebeforetfs, 2);
      else
          for (i2 = 0; i2 < this.tracks.length; i2++)
              this.tracks[i2].calcsplit1line(this.splitlines[m].x1, 0 < this.mapsystem ? this.splitlines[m].y1 : h - this.splitlines[m].y1, this.splitlines[m].x2, 0 < this.mapsystem ? this.splitlines[m].y2 : h - this.splitlines[m].y2, 0 < this.mapsystem, !1, l, v, this.splitlines[m].ignorebeforerealtime, this.splitlines[m].ignorebeforetfs, q, 2);
      for (i2 = 0; i2 < this.tracks.length; i2++)
          this.tracks[i2].calcsectortime(l);
      d = [];
      for (i = 0; i < this.tracks.length; i++)
          null != this.tracks[i].splitInstance2 && d.push(this.tracks[i].splitInstance2);
      d.sort(function(w, y) {
          return w.time - y.time
      });
      m = "";
      f = 1;
      q = 0;
      h = 1;
      0 < d.length ? (q = d[0].time,
      h = d[d.length - 1].time + 1E-4,
      this.sectorhl = d[0].index - 1) : this.sectorhl = -1;
      this.sectororder = [];
      for (i = 0; i < d.length; i++)
          m = m + '<span id="sect' + (d[i].index - 1) + '" class="sectornamebase ' + (0 == i ? "hlsectorname" : "sectorname") + '">',
          d[i].hl && (m += '<span class="hlsplit">'),
          m = m + f + ". ",
          l = "",
          l = t && 0 != i ? this.showtimestring2b(d[i].time - q) : this.showtimestring3b(d[i].time),
          m = m + l + " " + d[i].name + " (" + d[i].distance + " m)" + (d[i].hl ? "</span>" : "") + "</span><br />",
          this.tracks[d[i].index - 1].popuptext = f + ". " + this.showtimestring2b(d[i].time - q) + " " + d[i].name + " (" + d[i].distance + " m)",
          this.tracks[d[i].index - 1].sectorfactor = 1 - Math.pow((h - d[i].time) / (h - q), 2),
          f++,
          this.sectororder[i] = d[i].index - 1;
      this.sectormode && this.sectorcolormode && this.sectorcolortracks(!0);
      return m
  }
  ;
  this.calcrog = function() {
      if (!this.isrogaining)
          return "";
      var d = [];
      for (i = 0; i < this.tracks.length; i++)
          d.push({
              name: this.tracks[i].name,
              points: this.tracks[i].rogpoints,
              hl: this.tracks[i].highlighted,
              i: i
          });
      d.sort(function(t, l) {
          return l.points - t.points
      });
      var m = ""
        , f = 0
        , q = 0
        , h = 9999999;
      0 < this.tracks.length && (this.leadingrog = d[0].i);
      for (i = 0; i < d.length; i++)
          q += 1,
          d[i].points < h && (f = q),
          h = d[i].points,
          m = m + '<span id="rog' + d[i].i + '" class="rognamebase ' + (d[i].i == this.selectedrog ? "hlrogname" : "rogname") + '">' + f + ". " + d[i].points + " " + d[i].name + "</span><br />";
      return m
  }
  ;
  this.updaterogonmap = function() {
      if (-1 < this.selectedrog)
          for (i = 0; i < this.rogctrls.length; i++)
              this.rogctrls[i].marker.setStyle({
                  color: 0 < this.tracks[this.selectedrog].rogc[i] ? "green" : "red"
              }),
              this.rogctrls[i].marker.setStyle({
                  fillColor: 0 < this.tracks[this.selectedrog].rogc[i] ? "green" : "red"
              })
  }
  ;
  this.calcsplitpointtimes = function(d, m, f, q, h, t, l) {
      if (0 == this.splitlines.length)
          return "";
      if (this.splitlines[d].ispoint)
          for (i = 0; i < this.tracks.length; i++)
              this.tracks[i].calcsplit1(this.splitlines[d].x1B, 0 < this.mapsystem ? this.splitlines[d].y1B : m - this.splitlines[d].y1B, this.splitlines[d].radiusmeters, this.calibration.overallscale, f, h, t, this.splitlines[d].ignorebeforerealtime, this.splitlines[d].ignorebeforetfs, 0);
      else
          for (i2 = 0; i2 < this.tracks.length; i2++)
              this.tracks[i2].calcsplit1line(this.splitlines[d].x1, 0 < this.mapsystem ? this.splitlines[d].y1 : m - this.splitlines[d].y1, this.splitlines[d].x2, 0 < this.mapsystem ? this.splitlines[d].y2 : m - this.splitlines[d].y2, 0 < this.mapsystem, f, h, t, this.splitlines[d].ignorebeforerealtime, this.splitlines[d].ignorebeforetfs, l, 0);
      d = [];
      for (i = 0; i < this.tracks.length; i++)
          null != this.tracks[i].splitInstance && d.push(this.tracks[i].splitInstance);
      d.sort(function(v, w) {
          return v.time - w.time
      });
      m = "";
      h = 1;
      t = 0;
      0 < d.length && (t = d[0].time);
      for (i = 0; i < d.length; i++)
          d[i].hl && (m += '<span class="hlsplit">'),
          m = m + h + ". ",
          l = "",
          l = f ? q && 0 != i ? this.showtimestring2b(d[i].time - t) : this.showtimestring3b(d[i].time) : q && 0 != i ? this.showtimestring2b(d[i].time - t) : this.showtimestring(d[i].time),
          m = m + l + " " + d[i].name + (d[i].hl ? "</span>" : "") + "<br />",
          h++;
      return m
  }
  ;
  this.addsplitpoint = function(d, m, f, q, h, t) {
      var l = new splitline;
      l.x1 = d.lng;
      l.y1 = d.lat;
      0 < this.mapsystem ? (l.x1B = this.calibration.getmapx(d.lng, d.lat),
      l.y1B = this.calibration.getmapy(d.lng, d.lat)) : (l.x1B = l.x1,
      l.y1B = l.y1);
      l.radiusmeters = m;
      l.ispoint = !0;
      l.id = this.nextsplitid;
      l.title = h.replace("<", "").replace(">", "");
      this.nextsplitid++;
      l.marker = new L.Marker(d,{
          contextmenu: !0,
          clickable: !1,
          pointerEvents: "none",
          zIndexOffset: 1E6,
          icon: new L.NumberedDivIcon2({
              color: "red",
              blackshadow: !1,
              number: l.title,
              size: 2 * l.radiusmeters / q,
              lsize: 14
          })
      });
      this.showlines && f.addLayer(l.marker);
      this.splitlines.splice(t, 0, l)
  }
  ;
  this.removesplitpoint = function(d, m) {
      this.splitlines.length < d - 1 || (this.splitlines[d].ispoint || m.removeLayer(this.splitlines[d].polyline),
      m.removeLayer(this.splitlines[d].marker),
      this.splitlines.splice(d, 1))
  }
  ;
  this.isline = function(d) {
      return 0 == this.splitlines.length || this.splitlines[d].ispoint ? !1 : !0
  }
  ;
  this.addsplitline = function(d, m, f, q) {
      var h = new splitline;
      h.x1 = d.getLatLngs()[0].lng;
      h.y1 = d.getLatLngs()[0].lat;
      h.x2 = d.getLatLngs()[1].lng;
      h.y2 = d.getLatLngs()[1].lat;
      h.ispoint = !1;
      h.id = this.nextsplitid;
      h.title = f.replace("<", "").replace(">", "");
      this.nextsplitid++;
      h.polyline = new L.polyline(d.getLatLngs(),{
          contextmenu: !0,
          clickable: !1,
          pointerEvents: "none",
          color: "red",
          weight: 4,
          opacity: .8
      });
      h.marker = new L.Marker(d.getLatLngs()[h.y1 > h.y2 ? 1 : 0],{
          contextmenu: !0,
          clickable: !1,
          pointerEvents: "none",
          zIndexOffset: 1E6,
          icon: new L.NumberedDivIcon3({
              color: "red",
              blackshadow: !1,
              number: h.title,
              lsize: 14
          })
      });
      this.showlines && (m.addLayer(h.polyline),
      m.addLayer(h.marker));
      this.splitlines.splice(q, 0, h)
  }
  ;
  this.showhidelines = function(d, m) {
      if (d) {
          if (!this.showlines)
              for (this.showlines = !0,
              i = 0; i < this.splitlines.length; i++)
                  this.splitlines[i].ispoint || m.addLayer(this.splitlines[i].polyline),
                  m.addLayer(this.splitlines[i].marker)
      } else
          this.showlines && (this.showlines = !1,
          m.clearLayers())
  }
  ;
  this.showhiderogs = function(d, m, f) {
      if (d) {
          if (!this.showrogs) {
              this.showrogs = !0;
              d = this.getmperpixel();
              for (i = 0; i < this.rogctrls.length; i++)
                  this.rogctrls[i].marker = 0 < this.mapsystem ? L.circle([this.rogctrls[i].lat, this.rogctrls[i].lon], {
                      radius: this.rogradius,
                      color: "red",
                      fillColor: "red"
                  }) : L.circle([f - this.rogctrls[i].y, this.rogctrls[i].x], {
                      radius: 100 / d,
                      color: "red",
                      fillColor: "red"
                  }),
                  m.addLayer(this.rogctrls[i].marker);
              this.selectedrog = this.leadingrog;
              this.updaterogonmap()
          }
      } else
          this.showrogs && (this.showrogs = !1,
          m.clearLayers(),
          this.selectedrog = -1)
  }
  ;
  this.resizesplitpoints = function(d) {
      for (i = 0; i < this.splitlines.length; i++)
          this.splitlines[i].ispoint && this.splitlines[i].marker.options.icon.setsize(2 * this.splitlines[i].radiusmeters / d)
  }
  ;
  this.getsplitpointlist = function(d, m) {
      var f = "";
      d && (f = f + '<option value="0">' + Strings_first[langu] + "</option>");
      m && (f = f + '<option value="0">' + Strings_start[langu] + "</option>");
      for (i = 0; i < this.splitlines.length; i++)
          f = f + '<option value="' + ((d || m ? 1 : 0) + i) + '">' + this.splitlines[i].title + "</option>";
      return f
  }
  ;
  this.getsplitsettingRT = function(d) {
      if (0 > d || d > this.splitlines.length)
          return -1;
      d = this.splitlines[d].ignorebeforerealtime;
      if (-1 == d)
          return -1;
      d = d + 1136073600 + this.timedifference;
      return (new Date(1E3 * d)).toISOString()
  }
  ;
  this.getsplitsettingTFS = function(d) {
      if (0 > d || d > this.splitlines.length)
          return -1;
      d = this.splitlines[d].ignorebeforetfs;
      return -1 == d ? -1 : this.showtimestring3(d)
  }
  ;
  this.setsplitsettingRT = function(d, m) {
      0 > d || d > this.splitlines.length || (-1 == m ? this.splitlines[d].ignorebeforerealtime = -1 : (m = m.replace(" ", "T") + ".000Z",
      m = Date.parse(m),
      this.splitlines[d].ignorebeforerealtime = m / 1E3 - 1136073600 - this.timedifference))
  }
  ;
  this.setsplitsettingTFS = function(d, m) {
      0 > d || d > this.splitlines.length || (-1 == m ? this.splitlines[d].ignorebeforetfs = -1 : (m = m.split(":"),
      this.splitlines[d].ignorebeforetfs = Math.round(3600 * m[0] + 60 * m[1] + 1 * m[2])))
  }
  ;
  this.setRallymode = function(d) {
      for (i = 0; i < this.tracks.length; i++)
          this.tracks[i].setrallymode(d)
  }
  ;
  this.centercompetitor = function(d, m) {
      var f = this.tracks[m].mapxalltodraw;
      m = this.tracks[m].mapyalltodraw;
      -1E4 != f && map.setView([0 == this.mapsystem ? d - m : m, f])
  }
  ;
  this.centercompetitorid = function(d, m) {
      var f = -1;
      for (i = 0; i < this.tracks.length; i++)
          if (this.tracks[i].id == m) {
              f = i;
              break
          }
      -1 != f && (m = this.tracks[f].mapxalltodraw,
      f = this.tracks[f].mapyalltodraw,
      -1E4 != m && map.setView([0 == this.mapsystem ? d - f : f, m]))
  }
  ;
  this.toggleHighlight = function(d, m, f) {
      this.tracks[d].highlighted = !this.tracks[d].highlighted;
      this.tracks[d].changeiconhl();
      f && this.reorderPaths(m)
  }
  ;
  this.toggleFullroute = function(d) {
      this.tracks[d].fullroute = !this.tracks[d].fullroute
  }
  ;
  this.setColor = function(d, m) {
      this.tracks[d].color = m;
      this.tracks[d].changeiconcolor();
      this.tracks[d].changelinestyle(this.linewidth, this.lineopacity)
  }
  ;
  this.getReplayMinTime = function() {
      return this.tfsmode ? this.replaymintimeTFS : this.replaymintime
  }
  ;
  this.getReplayMaxTime = function() {
      return (this.tfsmode ? this.replaymaxtimeTFS : this.replaymaxtime) - this.rogbuffer
  }
  ;
  this.getRaceName = function() {
      return this.racename
  }
  ;
  this.setTimeToDraw = function(d) {
      if (d == this.timetodraw)
          return !1;
      this.timetodraw = d;
      return !0
  }
  ;
  this.getTimeDifference = function() {
      return this.timedifference
  }
  ;
  this.getLiveStatus = function() {
      return this.isliveevent
  }
  ;
  this.setTFSmode = function(d) {
      this.tfsmode = d
  }
  ;
  this.setreplaymode = function(d) {
      this.replaymode = d
  }
  ;
  this.getlaststarttime = function() {
      var d = -1E3
        , m = 1E20;
      for (i = 0; i < this.tracks.length; i++)
          this.tracks[i].checked && this.tracks[i].starttime > d && (d = this.tracks[i].starttime),
          this.tracks[i].starttime < m && (m = this.tracks[i].starttime);
      return -1E3 < d ? d : m
  }
  ;
  this.getmperpixel = function() {
      return null == this.calibration ? -1 : 1 / this.calibration.overallscale
  }
  ;
  this.updatenamelist = function(d, m) {
      for (i = 0; i < this.tracks.length; i++) {
          var f = "?";
          var q = " km/h";
          1 == d ? f = Number(this.tracks[i].currentspeed.toFixed(0)) : 2 == d ? (.2 < this.tracks[i].currentspeed && (f = 3600 / this.tracks[i].currentspeed,
          f = 5 * Math.round(f / 5),
          f = this.tracks[i].getovertimestring(f)),
          q = "/km") : 3 == d ? (f = Number((this.tracks[i].currentspeed / 1.852).toFixed(1)),
          q = " kn") : 4 == d && (f = this.tracks[i].battery,
          q = "%");
          f = m ? (0 != this.tracks[i].offset ? '<span style="color:red;">' + this.tracks[i].getOffsetString() + "</span>" : this.tracks[i].starttimestring) + ' <span style="float:right; width:48px; text-align:right;">' + this.tracks[i].status + '</span><span style="float:right; width:63px; text-align:right;">' + Number(this.tracks[i].currentdistance / 1E3).toFixed(2) + ' km </span><span style="float:right; width:auto; text-align:right;">' + (0 > this.tracks[i].currentspeed ? "?" : f) + q + "</span>" : (0 != this.tracks[i].offset ? '<span style="color:red;">' + this.tracks[i].getOffsetString() + "</span>" : this.tracks[i].starttimestring) + ' <span style="float:right; width:40px; text-align:right;">' + this.tracks[i].status + '</span><span style="float:right; width:52px; text-align:right;">' + Number(this.tracks[i].currentdistance / 1E3).toFixed(2) + ' km </span><span style="float:right; width:auto; text-align:right;">' + (0 > this.tracks[i].currentspeed ? "?" : f) + q + "</span>";
          this.updatecompinfo(i, f)
      }
  }
  ;
  this.reorderPaths = function(d) {
      for (i = 0; i < this.tracks.length; i++)
          d.hasLayer(this.tracks[i].path) && d.removeLayer(this.tracks[i].path);
      d.hasLayer(this.sectorhlpath) && (d.removeLayer(this.sectorhlpath),
      d.removeLayer(this.sectorhlpath2));
      if (this.sectormode && this.sectorcolormode && null != this.sectororder)
          for (i = this.sectororder.length - 1; -1 < i; i--)
              this.tracks[this.sectororder[i]].checked && this.tracks[this.sectororder[i]].path.addTo(d);
      else {
          for (i = 0; i < this.tracks.length; i++)
              this.tracks[i].checked && !this.tracks[i].highlighted && this.tracks[i].path.addTo(d);
          for (i = 0; i < this.tracks.length; i++)
              this.tracks[i].checked && this.tracks[i].highlighted && this.tracks[i].path.addTo(d)
      }
      this.sectormode && (this.sectorhlpath.addTo(d),
      this.sectorhlpath2.addTo(d))
  }
  ;
  this.updatemarkers = function(d) {
      this.reorderPaths(d);
      for (i = 0; i < this.tracks.length; i++)
          this.tracks[i].checked && !this.tracks[i].isonmap ? (this.tracks[i].marker.addTo(d),
          this.tracks[i].rallymode && this.tracks[i].marker.options.icon.setrallystate(this.tracks[i].rallystate),
          this.tracks[i].isonmap = !0) : !this.tracks[i].checked && this.tracks[i].isonmap && (d.removeLayer(this.tracks[i].marker),
          this.tracks[i].isonmap = !1)
  }
  ;
  this.handleinidata = function(d) {
      this.replaymode = !0;
      var m = -1
        , f = 0
        , q = 0
        , h = !1
        , t = d.split("\n")
        , l = ""
        , v = ""
        , w = ""
        , y = ""
        , A = d = !1
        , C = !1
        , B = "";
      for (i = 0; i < t.length; i++) {
          var z = t[i].split(":");
          if ("CALIBRATION" == z[0])
              this.calibration = new calibration,
              this.calibration.calibrate(z[1], g),
              z = z[1].split("|"),
              f = z[0],
              q = z[1];
          else if ("RACENAME" == z[0])
              this.racename = z[1];
          else if ("TIMEZONE" == z[0])
              this.timedifference = 60 * z[1];
          else if ("GRABINTERVAL" == z[0])
              this.livegrabinterval = 1 * z[1];
          else if ("LIVEBUFFER" == z[0])
              this.livebuffer = 1 * z[1];
          else if ("ROGBUFFER" == z[0])
              this.rogbuffer = 1 * z[1];
          else if ("DATETIME" == z[0])
              h = "1" == z[1];
          else if ("LIVE" == z[0]) {
              if (this.isliveevent = "1" == z[1])
                  this.replaymode = !1
          } else if ("NUMBEROFLOGOS" == z[0])
              this.numberoflogos = 1 * z[1];
          else if ("PREC" == z[0])
              for (z = z[1].split("|"),
              this.predefc = [],
              this.predefcradius = z[0],
              i65 = 1; i65 < z.length - 1; i65 += 2)
                  this.predefc[this.predefc.length] = {
                      x: z[i65] / this.iFactor,
                      y: z[i65 + 1] / this.iFactor
                  };
          else if ("ROGC" == z[0])
              z = z[1].split("|"),
              0 == this.isrogaining && (this.isrogaining = !0,
              this.rogctrls = []),
              this.rogctrls[this.rogctrls.length] = {
                  x: z[0] / this.iFactor,
                  y: z[1] / this.iFactor,
                  code: z[2],
                  points: z[3],
                  marker: null
              };
          else if ("ROGD" == z[0])
              this.rogradius = z[1];
          else if ("MAPSYSTEM" == z[0])
              "MML" == z[1] && (this.mapsystem = 5),
              "NOR" == z[1] && (this.mapsystem = 2),
              "OSM" == z[1] && (this.mapsystem = 3),
              "OWN" == z[1] && (this.mapsystem = 4),
              "MML2" == z[1] && (this.mapsystem = 5),
              "MML3" == z[1] && (this.mapsystem = 6),
              "OTM" == z[1] && (this.mapsystem = 7),
              "SWE" == z[1] && (this.mapsystem = 8),
              "OTH" == z[1] && (this.mapsystem = 9),
              this.calibration = new calibration,
              this.calibration.setMML();
          else if ("OWNWMS" == z[0])
              v = "//" + z[1].replace("+", "/");
          else if ("OWNZOOMS" == z[0])
              y = z[1];
          else if ("FORCEAUTOCENTER" == z[0])
              C = !0;
          else if ("OWNBOUNDS" == z[0])
              w = z[1];
          else if ("CENTERPOINT" == z[0])
              q = z[1].split("|"),
              f = q[0],
              q = q[1];
          else if ("DASHLIMIT" == z[0])
              this.dashlimit = 1 * z[1];
          else if ("TAILLEN" == z[0])
              this.taillength = 1 * z[1],
              this.setdefaulttail(this.taillength);
          else if ("MAXTIMEMINS" == z[0])
              this.maxtimemins = 60 * z[1];
          else if ("RALLYMODE" == z[0] && "1" == z[1])
              d = !0;
          else if ("ALLOWGPXUPLOAD" == z[0] && "1" == z[1])
              A = !0;
          else if ("MINBEFORESTART" == z[0])
              this.showbeforestart = 60 * z[1],
              this.replaymintimeTFS = -1 * this.showbeforestart,
              this.replaymaxtimeTFS = -1 * this.showbeforestart;
          else if ("OVERLAY" == z[0])
              l = 2 < z.length ? z[1].trim() + ":" + z[2].trim() : timeeventhost + "/gps/extrafile.php?a=" + z[1].trim();
          else if ("EXTRAFILE" == z[0])
              z = z[1].split("|"),
              "OVERLAY" == z[0] && (l = this.eventpath + "extrafile" + z[1].trim() + ".txt");
          else if ("COMMONSTARTTIME" == z[0])
              m = z[1];
          else if ("CENTERONCE" == z[0])
              this.centeredonce = !1;
          else if ("COURSE" == z[0])
              B = 2 < z.length ? z[1].trim() + ":" + z[2].trim() : timeeventhost + "/gps/extrafile.php?a=" + z[1].trim();
          else if ("PUBLICLOGIN" == z[0])
              "LiveOrienteering" == z[1] && (this.liveCenterLogin = !0);
          else if ("COMPETITOR" == z[0]) {
              var F = new competitor;
              -1 < z[1].indexOf("XXPOIJUXX") ? (F.set_from_inistring(z[1], this.timedifference, "#ffffff", this.showbeforestart, m, this.lkm, this.markersize, this.lettersize, this.linewidth, this.lineopacity, this.maxtimemins),
              this.buoys[this.buoys.length] = F) : (F.set_from_inistring(z[1], this.timedifference, this.colors[this.tracks.length % this.colors.length], this.showbeforestart, m, this.lkm + 1, this.markersize, this.lettersize, this.linewidth, this.lineopacity, this.maxtimemins),
              this.tracks[this.lkm] = F,
              this.lkm++)
          }
      }
      for (i = 0; i < this.buoys.length; i++)
          if (2 < this.buoys[i].isconnectedtoid.length)
              for (j = 0; j < this.buoys.length; j++)
                  if (this.buoys[j].id == this.buoys[i].isconnectedtoid) {
                      this.buoys[i].isconnectedto = this.buoys[j];
                      break
                  }
      0 < this.forcedMapSystem && (this.mapsystem = this.forcedMapSystem,
      this.calibration = new calibration,
      this.calibration.setMML());
      0 == f && (1 == this.mapsystem || 3 == this.mapsystem || 5 == this.mapsystem || 6 == this.mapsystem ? (f = 25.748997,
      q = 62.239674) : 2 == this.mapsystem ? (f = 11.394069,
      q = 59.122785) : 4 == this.mapsystem && (m = w.split("|"),
      f = (1 * m[0] + 1 * m[2]) / 2,
      q = (1 * m[1] + 1 * m[3]) / 2));
      this.cpoint = {
          x: f,
          y: q
      };
      0 < this.mapsystem && this.calibration.setCenterMer(f);
      this.mapsystemset(this.mapsystem, f, q, 0 < this.mapsystem && 0 < l.length, v, y, w);
      0 < this.mapsystem && 0 < l.length && (this.overlay = new overlay(l));
      this.createnamelist(this.tracks, h);
      this.initloaded = !0;
      f = 1704110400;
      for (i = 0; i < this.tracks.length; i++)
          this.tracks[i].get1sttime(),
          this.tracks[i].starttime < f && (f = this.tracks[i].starttime);
      f = f + 1136073600 + this.timedifference;
      this.splitdefaultrt = (new Date(1E3 * f)).toISOString().replace("T", " ").replace(".000Z", "");
      if (this.isrogaining) {
          this.enablerog();
          if (0 < this.mapsystem)
              for (i234 = 0; i234 < this.rogctrls.length; i234++)
                  x1r = this.rogctrls[i234].x,
                  y1r = this.rogctrls[i234].y,
                  this.rogctrls[i234].x = this.calibration.getmapx(x1r, y1r),
                  this.rogctrls[i234].y = this.calibration.getmapy(x1r, y1r),
                  this.rogctrls[i234].lon = x1r,
                  this.rogctrls[i234].lat = y1r;
          for (i234 = 0; i234 < this.tracks.length; i234++)
              this.tracks[i234].setuprog(this.rogctrls.length)
      }
      5 < B.length && this.readcourse(B);
      if (this.isliveevent)
          this.startlivepreparations();
      else {
          this.showLoading();
          this.load_data();
          for (i = 0; i < this.tracks.length; i++)
              f = this.tracks[i].get1sttime(),
              f < this.replaymintime && (this.replaymintime = f);
          this.timetodraw = this.replaymintime
      }
      document.title = "GPS-seuranta | " + this.racename;
      d && this.enablerallymode();
      A && this.enablegpxuploadmode();
      C && (this.autocentered = 0,
      this.tracks[0].autocenter = !0)
  }
  ;
  this.logoutLC = function(d) {
      1 == confirm("Logout " + d.lcLogoutText + " tracking?") && window.open(d.eventpath + "?logout=1", "_self")
  }
  ;
  this.courseread = function(d) {
      this.course = new gsacourse(d,this.calibration);
      console.log("course read")
  }
  ;
  this.readcourse = function(d) {
      $.ajax({
          type: "get",
          url: d,
          cache: !1,
          context: this,
          error: function() {
              console.log("Can't read course")
          },
          success: function(m, f, q) {
              this.courseread(m)
          }
      })
  }
  ;
  this.startlivepreparations = function() {
      $.ajax({
          type: "get",
          url: timeeventhost + "/gps/time.php?a=" + Math.floor(100 * Math.random() + 1),
          cache: !1,
          context: this,
          error: function() {},
          success: function(d, m, f) {
              d = parseInt(d);
              this.setLive(new Date, d);
              this.showLoading();
              this.load_data()
          }
      })
  }
  ;
  var p = this;
  this.load_data = function() {
      $.ajax({
          type: "get",
          url: this.eventpath + "data.lst" + (issessioned ? "?GpsSeurantaSessionID=" + sessionid : ""),
          context: this,
          xhr: function() {
              var d = new window.XMLHttpRequest;
              d.addEventListener("progress", function(m) {
                  m.lengthComputable && p.updateLoading(Strings_loading_data[langu] + " <br>" + Math.round(m.loaded / m.total * 100) + "%")
              }, !1);
              return d
          },
          error: function() {
              this.handledata("", !1);
              var d = this;
              this.isliveevent && setTimeout(function() {
                  d.reload_data()
              }, 1E3 * d.datagrabinterval)
          },
          cache: !1,
          success: function(d, m, f) {
              p.updateLoading("processing data...");
              if ("<HTML>" == d.substring(6, 0)) {
                  if (this.isliveevent) {
                      var q = this;
                      setTimeout(function() {
                          q.reload_data()
                      }, 1E3 * q.livegrabinterval)
                  }
              } else
                  this.bytesrecieved = d.length,
                  p.updateLoading("processing data..."),
                  this.handledata(d, !1),
                  this.isliveevent && (q = this,
                  setTimeout(function() {
                      q.reload_data()
                  }, 1E3 * q.livegrabinterval))
          }
      })
  }
  ;
  this.reload_data = function() {
      $.ajax({
          type: "get",
          url: this.eventpath + "data.php?" + (-1 < this.bytesrecieved ? "offset=" + this.bytesrecieved + "&reset=" + this.resetvalue : "data=" + this.lastline) + (issessioned ? "&GpsSeurantaSessionID=" + sessionid : ""),
          error: function() {
              var d = this;
              this.isliveevent && !this.nomorelive && setTimeout(function() {
                  d.reload_data()
              }, 1E3 * d.livegrabinterval)
          },
          cache: !1,
          statusCode: {
              410: function() {
                  this.nomorelive = !0;
                  console.log("no more live")
              },
              402: function() {
                  this.nomorelive = !0;
                  console.log("status 402")
              }
          },
          context: this,
          success: function(d, m, f) {
              if ("<HTML>" == d.substring(6, 0)) {
                  if (this.isliveevent && !this.nomorelive) {
                      var q = this;
                      setTimeout(function() {
                          q.reload_data()
                      }, 1E3 * q.livegrabinterval)
                  }
              } else
                  this.bytesrecieved = f.getResponseHeader("X-GPS-Server-Filesize"),
                  this.resetvalue = f.getResponseHeader("X-GPS-Server-Reset"),
                  this.resetvalue || (this.resetvalue = -1),
                  this.bytesrecieved || (this.bytesrecieved = -1),
                  this.handledata(d, !0),
                  this.isliveevent && !this.nomorelive && (q = this,
                  setTimeout(function() {
                      q.reload_data()
                  }, 1E3 * q.livegrabinterval))
          }
      })
  }
  ;
  this.handledata = function(d, m) {
      var f = d.split("\n");
      1 < f.length && 0 < f[0].indexOf("DOCTYPE") && (this.nomorelive = !0);
      for (d = f.length - 1; -1 < d; d--)
          if (10 < f[d].length) {
              this.lastline = f[d];
              break
          }
      30 < this.lastline.length && (this.lastline = this.lastline.substring(0, 29));
      10 > this.lastline.length && (this.lastline = "undef");
      for (d = 0; d < f.length; d++) {
          var q = f[d].split(".")[0]
            , h = !1;
          for (j = 0; j < this.lkm; j++)
              if (this.tracks[j].id == q) {
                  this.tracks[j].adddata(f[d], this.calibration);
                  h = !0;
                  break
              }
          if (!h)
              for (j = 0; j < this.buoys.length; j++)
                  if (this.buoys[j].id == q) {
                      this.buoys[j].adddata(f[d], this.calibration);
                      break
                  }
      }
      for (d = 0; d < this.tracks.length; d++)
          f = this.tracks[d].get1sttime(),
          q = this.tracks[d].getlasttime(),
          f < this.replaymintime && (this.replaymintime = f),
          q > this.replaymaxtime && (this.replaymaxtime = q),
          q - this.tracks[d].starttime > this.replaymaxtimeTFS && (this.replaymaxtimeTFS = q - this.tracks[d].starttime);
      f = (new Date).getTime();
      for (d = 0; d < this.tracks.length; d++)
          this.tracks[d].updatedistances(this.calibration, this.rogctrls, this.rogradius, this.dashlimit, this.course, this.replaymaxtime - this.rogbuffer),
          this.updateroglist();
      d = (new Date).getTime();
      console.log("cd took " + (d - f) + " ms");
      m || (this.timetodraw = this.replaymintime);
      this.data_added(m)
  }
  ;
  this.drawL = function(d, m, f) {
      0 == this.mapheight && (this.mapheight = m);
      if (null != d) {
          if (f) {
              for (i = 0; i < this.buoys.length; i++)
                  this.buoys[i].drawtrackL2(d, this.timetodraw, this.timetodraw - this.taillength, this.dashlimit, !this.replaymode, this.tfsmode, m, this.lineopacity, f, 0 < this.mapsystem, !1);
              for (i = 0; i < this.buoys.length; i++)
                  this.buoys[i].drawballoonL2(m, 0 < this.mapsystem)
          }
          for (i = 0; i < this.tracks.length; i++)
              this.tracks[i].highlighted || this.tracks[i].drawtrackL2(d, this.timetodraw, this.timetodraw - this.taillength, this.dashlimit, !this.replaymode, this.tfsmode, m, this.lineopacity, f, 0 < this.mapsystem, this.sectormode && this.sectorhl == i, this.drawTailEnd);
          for (i = 0; i < this.tracks.length; i++)
              this.tracks[i].highlighted && this.tracks[i].drawtrackL2(d, this.timetodraw, this.timetodraw - this.taillength, this.dashlimit, !this.replaymode, this.tfsmode, m, this.lineopacity, f, 0 < this.mapsystem, this.sectormode && this.sectorhl == i, this.drawTailEnd);
          this.sectormode && (this.sectorhlpath.setLatLngs([[0, 0]]),
          this.sectorhlpath2.setLatLngs([[0, 0]]),
          -1 < this.sectorhl && null != this.tracks[this.sectorhl].multipointlist && (this.sectorhlpath.setLatLngs(this.tracks[this.sectorhl].multipointlist),
          this.sectorhlpath2.setLatLngs(this.tracks[this.sectorhl].multipointlist),
          this.sectorhlpath2.setPopupContent($("#sect" + this.sectorhl).text())));
          if (f) {
              for (i = 0; i < this.tracks.length; i++)
                  this.tracks[i].checked && !this.tracks[i].highlighted && this.tracks[i].drawballoonL2(m, 0 < this.mapsystem);
              for (i = 0; i < this.tracks.length; i++)
                  this.tracks[i].checked && this.tracks[i].highlighted && this.tracks[i].drawballoonL2(m, 0 < this.mapsystem)
          }
          if (-1 < this.autocentered) {
              f = this.tracks[this.autocentered].mapxalltodraw;
              var q = this.tracks[this.autocentered].mapyalltodraw;
              0 == this.mapsystem && (q = m - q);
              if (-1E4 != f) {
                  m = d.latLngToContainerPoint([q, f]);
                  var h = d.getSize();
                  1E4 < Math.pow(m.x - h.x / 2, 2) + Math.pow(m.y - h.y / 2, 2) && (m = d.getZoom(),
                  d.setView([q, f], m, {
                      animate: !1
                  }))
              }
          } else
              this.centeredonce || (f = this.tracks[0].mapxalltodraw,
              q = this.tracks[0].mapyalltodraw,
              0 == this.mapsystem && (q = m - q),
              -1E4 != f && (d.latLngToContainerPoint([q, f]),
              d.getSize(),
              m = d.getZoom(),
              d.setView([q, f], m, {
                  animate: !1
              }),
              this.centeredonce = !0));
          d = new Date;
          this.draws++;
          10 == this.draws && (this.draws = 0,
          0 < this.last10drawtime && (f = d.getTime() - this.last10drawtime.getTime(),
          f = Math.round(1E5 / f),
          $("#fps").text("fps " + f / 10)),
          this.last10drawtime = d)
      }
  }
  ;
  this.getCurrentTimeString = function() {
      var d = this.timetodraw;
      tfsmode || (d = this.timetodraw + this.timedifference);
      return this.showtimestring(d)
  }
  ;
  this.getCurrentDateString = function() {
      var d = this.timetodraw;
      if (tfsmode)
          return Math.floor(d / 86400) + "d";
      d = this.timetodraw + this.timedifference + 1136073600;
      return (new Date(1E3 * d)).toISOString().slice(0, 10)
  }
  ;
  this.showtimestring = function(d) {
      var m = 0 > d;
      m && (d *= -1);
      var f = Math.floor(d % 86400 / 3600)
        , q = Math.floor((d % 86400 - 3600 * f) / 60);
      d = Math.floor(d % 86400 - 3600 * f - 60 * q);
      return (m ? "-" : "") + (10 > f ? "0" : "") + f + ":" + (10 > q ? "0" : "") + q + ":" + (10 > d ? "0" : "") + d
  }
  ;
  this.showtimestring2 = function(d) {
      var m = 0 > d;
      m && (d *= -1);
      var f = Math.floor(d % 86400 / 3600)
        , q = Math.floor((d % 86400 - 3600 * f) / 60);
      d = Math.floor(d % 86400 - 3600 * f - 60 * q);
      return (m ? "-" : "") + (0 < f ? f + ":" + (10 > q ? "0" : "") : "") + q + ":" + (10 > d ? "0" : "") + d
  }
  ;
  this.showtimestring2b = function(d) {
      var m = 0 > d;
      m && (d *= -1);
      var f = Math.floor(d / 3600)
        , q = Math.floor((d - 3600 * f) / 60);
      d = Math.floor(d - 3600 * f - 60 * q);
      return (m ? "-" : "+") + (0 < f ? f + ":" + (10 > q ? "0" : "") : "") + q + ":" + (10 > d ? "0" : "") + d
  }
  ;
  this.showtimestring3 = function(d) {
      var m = Math.floor(d / 3600)
        , f = Math.floor((d - 3600 * m) / 60);
      d = Math.floor(d - 3600 * m - 60 * f);
      return m + ":" + (10 > f ? "0" : "") + f + ":" + (10 > d ? "0" : "") + d
  }
  ;
  this.showtimestring3b = function(d) {
      var m = Math.floor(d / 3600)
        , f = Math.floor((d - 3600 * m) / 60);
      d = Math.floor(d - 3600 * m - 60 * f);
      return (0 < m ? m + ":" + (10 > f ? "0" : "") : "") + f + ":" + (10 > d ? "0" : "") + d
  }
  ;
  this.calcdifference = function(d, m, f, q) {
      this.difference = -9999999;
      var h = this.tracks[m].getcompare2time(this.timetodraw, !this.tfsmode);
      var t = this.tracks[m].mapxalltodraw;
      var l = this.tracks[m].mapyalltodraw;
      this.calibration.MML && (m = this.calibration.getmapx(t, l),
      l = this.calibration.getmapy(t, l),
      t = m);
      if (!(-1E5 > h))
          if (t = this.tracks[d].getnearesttimetopointlimited(t, l, !this.tfsmode, h - q, h - f, 50, this.calibration.overallscale),
          -1E5 > t)
              this.difference = -9999999;
          else if (this.difference = h > t ? h - t : -9999999,
          t > this.tracks[d].trackpoints[this.tracks[d].pointcount - 1].time - .01 && (this.difference = -9999999),
          h - t < f + 1E-4 || h - t > q - 1E-4)
              this.difference = -9999999
  }
}
;L.NumberedDivIcon2 = L.Icon.extend({
  balloondiv: null,
  numdiv: null,
  options: {
      number: "",
      iconSize: new L.Point(12,12),
      iconAnchor: new L.Point(6,6),
      popupAnchor: new L.Point(12,-33),
      color: "red",
      opacityB: 1,
      size: 12,
      lsize: 20,
      highlighted: 0,
      zIndex: 0,
      blackshadow: !1,
      isbuoy: !1
  },
  createIcon: function() {
      var c = document.createElement("div");
      this.balloondiv = document.createElement("div");
      this.numdiv = document.createElement("div");
      c.setAttribute("class", "Leaf_marker");
      this.balloondiv.setAttribute("class", "Leaf_balloon");
      this.numdiv.setAttribute("class", this.options.blackshadow ? "Leaf_label_black" : "Leaf_label_white");
      this.numdiv.innerHTML = this.options.number || "";
      this.numdiv.style.color = this.options.color;
      this.balloondiv.style.backgroundColor = "transparent";
      c.appendChild(this.balloondiv);
      c.appendChild(this.numdiv);
      this.balloondiv.style.width = this.options.size + "px";
      this.balloondiv.style.height = this.options.size + "px";
      this.balloondiv.style.top = "-" + (this.options.size / 2 + 2) + "px";
      this.balloondiv.style.left = "-" + (this.options.size / 2 + 2) + "px";
      this.balloondiv.style.border = "3px solid rgba(255, 0, 0, 0.75)";
      this.numdiv.style.top = .35 * this.options.size + "px";
      this.numdiv.style.left = .35 * this.options.size + "px";
      this.numdiv.style.fontSize = this.options.lsize + "px";
      this.numdiv.style.lineHeight = "1.0";
      this.numdiv.style.backgroundColor = "rgba(255, 255, 255, 0.6)";
      this.numdiv.style.borderRadius = "25%";
      this.numdiv.style.border = "1px solid red";
      c.style.pointerEvents = "none";
      return c
  },
  createShadow: function() {
      return null
  },
  setsize: function(c) {
      this.options.size = c;
      this.balloondiv.style.width = this.options.size + "px";
      this.balloondiv.style.height = this.options.size + "px";
      this.balloondiv.style.top = "-" + (this.options.size / 2 + 2) + "px";
      this.balloondiv.style.left = "-" + (this.options.size / 2 + 2) + "px";
      this.numdiv.style.top = .35 * this.options.size + "px";
      this.numdiv.style.left = .35 * this.options.size + "px"
  },
  settitle: function(c) {
      this.options.number = c
  }
});
L.NumberedDivIcon3 = L.Icon.extend({
  balloondiv: null,
  numdiv: null,
  options: {
      number: "",
      iconSize: new L.Point(12,12),
      iconAnchor: new L.Point(6,6),
      popupAnchor: new L.Point(12,-33),
      color: "red",
      opacityB: 1,
      size: 12,
      lsize: 20,
      highlighted: 0,
      zIndex: 0,
      blackshadow: !1,
      isbuoy: !1
  },
  createIcon: function() {
      var c = document.createElement("div");
      this.numdiv = document.createElement("div");
      c.setAttribute("class", "Leaf_marker");
      this.numdiv.setAttribute("class", this.options.blackshadow ? "Leaf_label_black" : "Leaf_label_white");
      this.numdiv.innerHTML = this.options.number || "";
      this.numdiv.style.color = this.options.color;
      c.appendChild(this.numdiv);
      this.numdiv.style.top = "0px";
      this.numdiv.style.left = "0px";
      this.numdiv.style.fontSize = this.options.lsize + "px";
      this.numdiv.style.lineHeight = "1.0";
      this.numdiv.style.backgroundColor = "rgba(255, 255, 255, 0.6)";
      this.numdiv.style.borderRadius = "25%";
      this.numdiv.style.border = "1px solid red";
      c.style.pointerEvents = "none";
      return c
  },
  createShadow: function() {
      return null
  },
  setsize: function(c) {
      this.options.size = c;
      this.balloondiv.style.width = this.options.size + "px";
      this.balloondiv.style.height = this.options.size + "px";
      this.balloondiv.style.top = "-" + (this.options.size / 2 + 2) + "px";
      this.balloondiv.style.left = "-" + (this.options.size / 2 + 2) + "px";
      this.numdiv.style.top = .35 * this.options.size + "px";
      this.numdiv.style.left = .35 * this.options.size + "px"
  },
  settitle: function(c) {
      this.options.number = c
  }
});
function splitline() {
  this.y1B = this.x1B = this.y2 = this.y1 = this.x2 = this.x1 = 0;
  this.radiuspixels = this.radiusmeters = 30;
  this.ispoint = !1;
  this.title = "";
  this.ignorebeforetfs = this.ignorebeforerealtime = this.id = -1;
  this.polyline = this.marker = null
}
;L.CanvasOverlay = (L.Layer ? L.Layer : L.Class).extend({
  initialize: function(c, g) {
      this._userDrawFunc = c;
      L.setOptions(this, g)
  },
  drawing: function(c, g) {
      this._userDrawFunc = c;
      this.isMML = g;
      return this
  },
  params: function(c) {
      L.setOptions(this, c);
      return this
  },
  canvas: function() {
      return this._canvas
  },
  redraw: function() {
      this._frame || (this._frame = L.Util.requestAnimFrame(this._redraw, this));
      return this
  },
  onAdd: function(c) {
      this._map = c;
      this._canvas = L.DomUtil.create("canvas", "leaflet-heatmap-layer");
      var g = L.DomUtil.testProp(["transformOrigin", "WebkitTransformOrigin", "msTransformOrigin"]);
      this._canvas.style[g] = "50% 50%";
      g = this._map.getSize();
      this._canvas.width = g.x;
      this._canvas.height = g.y;
      L.DomUtil.addClass(this._canvas, "leaflet-zoom-" + (this._map.options.zoomAnimation && L.Browser.any3d ? "animated" : "hide"));
      c._panes.overlayPane.appendChild(this._canvas);
      c.on("moveend", this._reset, this);
      c.on("resize", this._resize, this);
      if (c.options.zoomAnimation && L.Browser.any3d)
          c.on("zoomanim", this._animateZoom, this);
      this._reset()
  },
  onRemove: function(c) {
      c.getPanes().overlayPane.removeChild(this._canvas);
      c.off("moveend", this._reset, this);
      c.off("resize", this._resize, this);
      c.options.zoomAnimation && c.off("zoomanim", this._animateZoom, this);
      this_canvas = null
  },
  addTo: function(c) {
      c.addLayer(this);
      return this
  },
  _resize: function(c) {
      this._canvas.width = c.newSize.x;
      this._canvas.height = c.newSize.y
  },
  _reset: function() {
      var c = this._map.containerPointToLayerPoint([0, 0]);
      L.DomUtil.setPosition(this._canvas, c);
      this._redraw()
  },
  _redraw: function() {
      var c = this._map.getSize()
        , g = this._map.getBounds()
        , u = 180 * c.x / (2.003750834E7 * (g.getEast() - g.getWest()))
        , p = this._map.getZoom();
      this._userDrawFunc && this._userDrawFunc(this, {
          canvas: this._canvas,
          bounds: g,
          size: c,
          zoomScale: u,
          zoom: p,
          options: this.options,
          isMML: this.isMML
      });
      this._frame = null
  },
  _animateZoom: function(c) {
      var g = this._map.getZoomScale(c.zoom);
      c = this._map._getCenterOffset(c.center)._multiplyBy(-g).subtract(this._map._getMapPanePos());
      L.DomUtil.setTransform ? L.DomUtil.setTransform(this._canvas, c, g) : this._canvas.style[L.DomUtil.TRANSFORM] = L.DomUtil.getTranslateString(c) + " scale(" + g + ")"
  }
});
L.canvasOverlay = function(c, g) {
  return new L.CanvasOverlay(c,g)
}
;
function overlay(c) {
  this.ctrls = [];
  this.clines = [];
  this.lines = [];
  $.ajax({
      type: "get",
      url: c,
      contentType: "application/text; charset=ISO-8859-1",
      error: function() {},
      cache: !1,
      context: this,
      success: function(g) {
          this.handleoverlaydata(g)
      }
  });
  this.handleoverlaydata = function(g) {
      var u = !0;
      g = g.split("\n");
      for (i = 0; i < g.length; i++) {
          var p = g[i].split("|");
          if ("COORDS" == p[0])
              u = "ETRS" != p[1];
          else if ("POINT" == p[0]) {
              var d = p[1]
                , m = d
                , f = p[2]
                , q = p[3];
              if (!u) {
                  var h = ETRStoWGS(f, q);
                  f = h.x;
                  q = h.y
              }
              4 < p.length && (m = p[4]);
              h = "rgba(200,6,80, 0.88)";
              var t = 1;
              for (i5 = 5; i5 < p.length; i5++)
                  "COLOR:" == p[i5].substring(0, 6) && 15 == p[i5].length ? h = "rgba(" + p[i5].substring(6, 9) + "," + p[i5].substring(9, 12) + "," + p[i5].substring(12, 15) + ",0.88)" : "SIZE:" == p[i5].substring(0, 5) && (t = p[i5].substring(5));
              this.ctrls.push({
                  id: d,
                  x: f,
                  y: q,
                  def: m,
                  color: h,
                  sizefactor: t
              })
          } else if ("CLINE" == p[0]) {
              h = p[1];
              t = p[2];
              var l = q = f = m = 0
                , v = d = !1;
              for (i649 = 0; i649 < this.ctrls.length && (this.ctrls[i649].id == h && (m = this.ctrls[i649].x,
              f = this.ctrls[i649].y,
              d = !0),
              this.ctrls[i649].id == t && (q = this.ctrls[i649].x,
              l = this.ctrls[i649].y,
              v = !0),
              !d || !v); i649++)
                  ;
              d = 0;
              h = "rgba(200,6,80, 0.88)";
              t = 1;
              for (i5 = 3; i5 < p.length; i5++)
                  "COLOR:" == p[i5].substring(0, 6) && 15 == p[i5].length ? h = "rgba(" + p[i5].substring(6, 9) + "," + p[i5].substring(9, 12) + "," + p[i5].substring(12, 15) + ",0.88)" : "SIZE:" == p[i5].substring(0, 5) ? t = p[i5].substring(5) : "DASH:" == p[i5].substring(0, 5) && (d = p[i5].substring(5));
              this.clines.push({
                  x1: m,
                  y1: f,
                  x2: q,
                  y2: l,
                  dash: d,
                  color: h,
                  sizefactor: t
              })
          } else if ("LINESTART" == p[0]) {
              d = 0;
              m = h = "rgba(200,6,80";
              f = 88;
              q = l = 0;
              for (i5 = t = 1; i5 < p.length; i5++)
                  "COLOR:" == p[i5].substring(0, 6) && 15 == p[i5].length ? m = h = "rgba(" + p[i5].substring(6, 9) + "," + p[i5].substring(9, 12) + "," + p[i5].substring(12, 15) : "SIZE:" == p[i5].substring(0, 5) ? t = p[i5].substring(5) : "DASH:" == p[i5].substring(0, 5) ? d = p[i5].substring(5) : "OPACITY:" == p[i5].substring(0, 8) ? f = p[i5].substring(8) : "ZONE:" == p[i5].substring(0, 5) && (l = p[i5].substring(5).split("-"),
                  q = l[0],
                  l = l[1]);
              h = h + "," + f / 100 + ")";
              m = m + "," + l / 100 + ")";
              this.lines.push({
                  dash: d,
                  color: h,
                  zonecolor: m,
                  zonewidth: q,
                  sizefactor: t,
                  points: []
              })
          } else
              "LINEPOINT" == p[0] && (f = p[1],
              q = p[2],
              u || (h = ETRStoWGS(f, q),
              f = h.x,
              q = h.y),
              this.lines[this.lines.length - 1].points.push({
                  x: f,
                  y: q
              }))
      }
  }
  ;
  this.draw = function(g, u) {
      var p = new Date
        , d = g._map.getZoom()
        , m = g._map.containerPointToLatLng(L.point(0, 0))
        , f = g._map.containerPointToLatLng(L.point(0, 100));
      f = 111319.9 * (m.lat - f.lat) / 100;
      u.isMML && (d += 3);
      m = 1;
      m = 13 < d ? Math.pow(Math.pow(2, d - 14), .5) : 8 < d ? Math.pow(Math.pow(2, d - 14), .125) : Math.pow(Math.pow(2, -5), .125);
      d = u.canvas.getContext("2d");
      d.clearRect(0, 0, u.canvas.width, u.canvas.height);
      d.setLineDash || (d.setLineDash = function() {}
      );
      d.fillStyle = "#88C425";
      d.strokeStyle = "#88C425";
      d.lineJoin = "round";
      for (i = 0; i < this.clines.length; i++) {
          d.strokeStyle = this.clines[i].color;
          d.lineWidth = 3 * m * this.clines[i].sizefactor;
          u = g._map.latLngToContainerPoint([this.clines[i].y1, this.clines[i].x1]);
          var q = g._map.latLngToContainerPoint([this.clines[i].y2, this.clines[i].x2]);
          d.beginPath();
          1 == this.clines[i].dash && d.setLineDash([5]);
          d.moveTo(u.x, u.y);
          d.lineTo(q.x, q.y);
          d.stroke();
          1 == this.clines[i].dash && d.setLineDash([])
      }
      d.globalCompositeOperation = "destination-out";
      for (i = 0; i < this.ctrls.length; i++) {
          u = 10 * m * this.ctrls[i].sizefactor;
          q = Math.round(16 * m * this.ctrls[i].sizefactor);
          d.font = "bold " + q + "px Arial";
          var h = g._map.latLngToContainerPoint([this.ctrls[i].y, this.ctrls[i].x])
            , t = d.measureText(this.ctrls[i].def).width;
          d.fillRect(h.x + u + 1, h.y - u - 1 - q, t, q);
          d.lineWidth = 3 * m * this.ctrls[i].sizefactor;
          d.beginPath();
          d.arc(h.x, h.y, u, 0, 2 * Math.PI, !1);
          d.fill()
      }
      d.globalCompositeOperation = "source-over";
      for (i = 0; i < this.lines.length; i++)
          if (0 < this.lines[i].zonewidth) {
              h = g._map.latLngToContainerPoint([this.lines[i].points[0].y, this.lines[i].points[0].x]);
              d.beginPath();
              d.moveTo(h.x, h.y);
              for (j = 1; j < this.lines[i].points.length; j++)
                  h = g._map.latLngToContainerPoint([this.lines[i].points[j].y, this.lines[i].points[j].x]),
                  d.lineTo(h.x, h.y);
              d.strokeStyle = this.lines[i].zonecolor;
              d.lineWidth = this.lines[i].zonewidth / f * 2;
              d.stroke()
          }
      for (i = 0; i < this.lines.length; i++) {
          h = g._map.latLngToContainerPoint([this.lines[i].points[0].y, this.lines[i].points[0].x]);
          d.beginPath();
          d.moveTo(h.x, h.y);
          for (j = 1; j < this.lines[i].points.length; j++)
              h = g._map.latLngToContainerPoint([this.lines[i].points[j].y, this.lines[i].points[j].x]),
              d.lineTo(h.x, h.y);
          d.strokeStyle = this.lines[i].color;
          d.lineWidth = 3 * m * this.lines[i].sizefactor;
          1 == this.lines[i].dash && d.setLineDash([5]);
          d.stroke();
          1 == this.lines[i].dash && d.setLineDash([])
      }
      for (i = 0; i < this.ctrls.length; i++)
          d.strokeStyle = this.ctrls[i].color,
          d.lineWidth = 3 * m * this.ctrls[i].sizefactor,
          f = g._map.latLngToContainerPoint([this.ctrls[i].y, this.ctrls[i].x]),
          d.beginPath(),
          d.arc(f.x, f.y, 10 * m * this.ctrls[i].sizefactor, 0, 2 * Math.PI, !1),
          d.closePath(),
          d.stroke();
      for (i = 0; i < this.ctrls.length; i++)
          u = 10 * m * this.ctrls[i].sizefactor,
          q = Math.round(16 * m * this.ctrls[i].sizefactor),
          d.font = "bold " + q + "px Arial",
          d.fillStyle = this.ctrls[i].color,
          f = g._map.latLngToContainerPoint([this.ctrls[i].y, this.ctrls[i].x]),
          d.fillText(this.ctrls[i].def, f.x + u + 1, f.y - u - 1);
      console.log((new Date).getTime() - p.getTime() + " ms")
  }
}
;$(".textbox").val("");
var versioninfo = "version 2020-04-29", divHeights = ["calc(100% - 61px)", "calc(100% - 41px)"], iswp = !1, appIsReady = !1, trevent = null, compFullName = "", compOffId, pickCompIdForColor = 0, isCompSelected = !1, tfsmode = !1, replaymode = !0, eventIsLive = !1, continueReplaying = !1, logos = [], logotoshow = 0, ismapvisible = !0, compSettingsWindowVisible = !1, compMenuVisible = null, replaystartrealtime, replayspeed = 10, replaystartracetime, myAnimationReq = null, sliding = !1, myReplayAnimationReq = null, replaying = !1, previousreplaydrawtime = 0, replayfps = 30, replayfpsmobile = 10, mobileinfoupdatefps = 1, previousinfoupdatetime = 0, mapsystem = 0, wgscenterpoint = {
  x: 0,
  y: 0
}, canvasoverlay = null, timeshowdate = !0, contextmenumarker = L.circleMarker([0, 0], 15);
contextmenumarker.setStyle({
  fillColor: "red",
  fill: !0,
  fillOpacity: .3,
  color: "black",
  weight: 2
});
var splitcandidate = null, prevsplitpointradius = 30, nsdialog, splitlinecandidate = null, splitlinecandidate2 = null, isdrawingsline = !1, iszooming = !1, iniwidth = 0, iniheight = 0, speedunit = 1, timedifference = 0, isdiffvisible = !1, maxPT, minPT, requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(c) {
  window.setTimeout(c, 0)
}
, cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelRequestAnimationFrame || window.mozCancelAnimationFrame || window.oCancelRequestAnimationFrame || window.oCancelAnimationFrame || window.msCancelRequestAnimationFrame || window.msCancelAnimationFrame || function(c) {
  window.clearTimeout(c)
}
, livestartrealtime, livestartlocaltime, previouslivedrawtime = 0, livefps = 10, livefpsmobile = 4, myLiveAnimationReq = null, livelaststarttime = 0, curV = 0, fSpeed = 1E3, multiplier = 1.5, splitsVisible = !1, diffcomp1 = "?", diffcomp2 = "?", diffcomp1nro = -1, diffcomp2nro = -1, mindiff = 0, maxdiff = 10, splitlapval = 1, splitlap1val = 1, splitlap2val = 1;
function addOption(c, g, u) {
  $("#optionsCont").append("<div id=" + c + " class=btnSetting>" + g + "</div>");
  $("#optionsCont").append("<div class=setAreaID id=" + c + "Area></div>");
  $("#" + c + "Area").append("<div class=settingArea>" + u + "</div>");
  $("#" + c + "Area").css("display", "none");
  addClickFunction(c)
}
var appModeOptions = '<div id="appModeRadio"><input type="radio" id="appModeDesktopRadio" name="radioAppMode" value="Desktop" checked><label for="appModeDesktopRadio">' + Strings_Desktop[langu] + '</label><input type="radio" id="appModeMobileRadio" name="radioAppMode" value="Mobile"><label for="appModeMobileRadio">' + Strings_Mobile[langu] + "</label></div>"
, tailOptions = '<div id="tailOnOffRadio"><input type="radio" id="tailOnRadio" name="radioTail" value="On" checked><label for="tailOnRadio">' + Strings_Tail[langu] + '</label><input type="radio" id="tailOffRadio" name="radioTail" value="Off"><label for="tailOffRadio">' + Strings_Route[langu] + "</label></div><div class=tailContHolder> <div class=tailTextCont>" + Strings_Len[langu] + "</div> <div class=tailSetCont> <div class=tailBtnCont> <a class=addbtn id=addbtnH></a><a class=addbtn id=addbtnM></a><a class=addbtn id=addbtnS></a> </div> <div class=tailTbCont> <input type=text class=textboxOptions id=tailBox maxlength=8> </div> <div class=tailBtnCont> <a class=minusbtn id=minusbtnH></a><a class=minusbtn id=minusbtnM></a><a class=minusbtn id=minusbtnS></a> </div> </div> <div class=tailApplyCont><button id=changeTailLength class=tailOkBtn>OK</button></div><div class=tailEndCont><input type=checkbox id=drawtailendcb> " + Strings_draw_tail_end[langu] + "</div></div>"
, markerOptions = "<div id=showMS></div><div id=markerSizeSlider></div><div id=showML></div><div id=markerLetSlider></div><div id=showLW></div><div id=lineWidthSlider></div><div id=showLO></div><div id=lineOpacitySlider></div><div id=showMO></div><div id=mapOpacitySlider></div>"
, rallyOptions = '<div id="rallymodeRadio"><input type="radio" id="rmOnRadio" name="radioRally" value="On" checked><label for="rmOnRadio">On</label><input type="radio" id="rmOffRadio" name="radioRally" value="Off"><label for="rmOffRadio">Off</label></div>'
, linkOptions = '<a href="?v=j" id="javalink">Java client</a><br><a href="?v=m" id="mobilelink">Old mobile client</a>'
, gpxuploadOptions = '<a href="#" id="gpxlink" target="_blank">Upload GPX</a><br>(requires login)';
addOption("appMode", Strings_App_Mode[langu], appModeOptions);
addOption("tailSet", Strings_Tail[langu], tailOptions);
addOption("markerSet", Strings_Marker_line_map[langu], markerOptions);
addOption("infoSet", Strings_Competitor_info[langu], '<div id="infoRadios"><input type="radio" id="sinforadio" name="inforadio" value="Show" checked="checked"><label for="sinforadio">' + Strings_Show[langu] + '</label><input type="radio" id="hinforadio" value="Hide" name="inforadio"><label for="hinforadio">' + Strings_Hide[langu] + '</label></div> <div id="unitRadios"><input type="radio" id="kmhradio" name="unitradio" value="kmh" checked="checked"><label for="kmhradio">km/h</label><input type="radio" id="minkmradio" name="unitradio" value="minkm"><label for="minkmradio">min/km</label><input type="radio" id="knotradio" name="unitradio" value="knot"><label for="knotradio">knot</label>');
addOption("offsetSet", Strings_Offset[langu], "<div class=showSelOffName>" + Strings_Select_competitor_first[langu] + '</div><div class=showSelOffID></div> <div class=offsetContHolder> <input id=offBox class=textboxSetOff type=text maxlength=8 value=0:00><button id="offokbutton">OK </button></div> <button id="resetOff">' + Strings_Reset_all_offsets[langu] + "</button>");
addOption("debugSet", Strings_Debug[langu], "<div id=fps>fps ?</div><div id=versio>" + versioninfo + "</div>");
addOption("rallySet", "Rally mode", rallyOptions);
addOption("gpxuploadSet", "GPX upload", gpxuploadOptions);
var eventPath2 = new String(document.location)
, pathArray2 = eventPath2.split("?")
, hasversion = !1;
if (1 < pathArray2.length) {
  var params2 = pathArray2[1];
  -1 < params2.indexOf("v=m3") && (hasversion = !0)
}
var clienttime = 15;
function closecdialog() {
  $("#cdialog").dialog("close")
}
function calcclienttime() {
  $("#cdialog").dialog("isOpen") && (clienttime--,
  1 > clienttime ? $("#cdialog").dialog("close") : ($("#cdialog").dialog("option", "title", "Switch client (" + clienttime + ")"),
  setTimeout(function() {
      calcclienttime()
  }, 1E3)))
}
hasversion || calcclienttime();
$(document).mouseup(function(c) {
  if (compSettingsWindowVisible) {
      var g = $(".compSettingsCont, .competitorSelected, #colorBox");
      g.is(c.target) || 0 !== g.has(c.target).length || $("#colorBox").hide()
  }
});
$(window).resize(function() {
  !iswp && detectIE() && $("#competitorCont").height(15E3);
  compSettingsWindowVisible && $("#colorBox").hide()
});
$("#boxclose").click(function() {
  $(".compSettingsCont").hide();
  $("#colorBox").hide();
  hideCompMenu();
  compSettingsWindowVisible = !1
});
function hideCompMenu() {
  null != compMenuVisible && (compMenuVisible.hide(),
  compMenuVisible.parent().height(compMenuVisible.parent().height() - ("desktop" == appMode ? 70 : 90)),
  compMenuVisible = null)
}
$("#hideStatusBox").click(function() {
  $(this).hasClass("hideStatusBox") ? $(this).addClass("showStatusBox").removeClass("hideStatusBox") : $(this).addClass("hideStatusBox").removeClass("showStatusBox");
  $("#btnMassStart").toggle();
  eventIsLive && $("#liveStatus").toggle();
  $("#scalebox").toggle()
});
function redrawMap() {
  iszooming || trevent.drawL(map, mapHeight, ismapvisible);
  updatedifference()
}
function updatedifference() {
  if (null != trevent && isdiffvisible) {
      trevent.calcdifference(diffcomp1nro, diffcomp2nro, 60 * mindiff, 60 * maxdiff);
      var c = "???";
      0 < trevent.difference && (c = "<strong>+" + trevent.showtimestring2(trevent.difference) + "</strong>");
      tfsmode || trevent.tracks[diffcomp1nro].starttime == trevent.tracks[diffcomp2nro].starttime || (c += '<span class="smallerdiff"> (\u25b7 ' + trevent.showtimestring2b(trevent.tracks[diffcomp2nro].starttime - trevent.tracks[diffcomp1nro].starttime) + ")</span>");
      $(".btnOffsetReset").html(diffcomp1 + "<br>" + c + "<br>" + diffcomp2)
  }
}
function timeslided(c) {
  null != trevent && trevent.setTimeToDraw($("#timeSlider").slider("option", "value")) && (redrawMap(),
  updateTime(),
  "desktop" == appMode && trevent.updatenamelist(speedunit, "desktop" != appMode));
  sliding && (myAnimationReq = requestAnimationFrame(timeslided))
}
function timesliderstopped() {
  null != trevent && trevent.setTimeToDraw($("#timeSlider").slider("option", "value")) && (redrawMap(),
  updateTime(),
  "desktop" == appMode && trevent.updatenamelist(speedunit, "desktop" != appMode))
}
$("#timeSlider").slider({
  min: 0,
  max: 0,
  value: 0,
  range: "min",
  start: function(c, g) {
      console.log("slide start");
      replaying && (replaying = !1,
      window.cancelAnimationFrame(myReplayAnimationReq),
      $("#btnPlay").addClass("paused").removeClass("playing"),
      continueReplaying = !0);
      myAnimationReq = requestAnimationFrame(timeslided);
      sliding = !0
  },
  stop: function(c, g) {
      console.log("slide stop");
      window.cancelAnimationFrame(myAnimationReq);
      sliding = !1;
      timesliderstopped();
      continueReplaying && (replaying = !0,
      continueReplaying = !1,
      replaystartrealtime = new Date,
      replaystartracetime = trevent.timetodraw,
      myReplayAnimationReq = requestAnimationFrame(replaytimer),
      $("#btnPlay").addClass("playing").removeClass("paused"))
  }
});
$("#speed-select, #speed-selectMob").change(function() {
  replaying && (replaystartrealtime = new Date,
  replaystartracetime = trevent.timetodraw);
  replayspeed = this.value
});
function setTimeDifference() {
  timedifference = trevent.getTimeDifference()
}
function updateTime() {
  $("#curTime").text(trevent.getCurrentTimeString());
  timeshowdate && $("#curDate").text(trevent.getCurrentDateString())
}
function replaytimer(c) {
  if (replaying)
      if (c = (new Date).getTime(),
      c - previousreplaydrawtime > 1E3 / ("desktop" == appMode ? replayfps : replayfpsmobile)) {
          var g = (c - replaystartrealtime.getTime()) / 1E3;
          g = replaystartracetime + g * replayspeed;
          updateTime();
          null != trevent && g < maxPT && (trevent.setTimeToDraw(g) && (redrawMap(),
          "desktop" == appMode || $("#compMenu").is(":visible") && c - previousinfoupdatetime > 1E3 / mobileinfoupdatefps) && (trevent.updatenamelist(speedunit, "desktop" != appMode),
          previousinfoupdatetime = c),
          $("#timeSlider").slider("option", "value", g));
          previousreplaydrawtime = c;
          replaying && (g < maxPT ? myReplayAnimationReq = requestAnimationFrame(replaytimer) : (replaying = !1,
          resetPlayBtn()))
      } else
          replaying && (myReplayAnimationReq = requestAnimationFrame(replaytimer))
}
function livetimer(c) {
  c = (new Date).getTime();
  if (c - previouslivedrawtime > 1E3 / ("desktop" == appMode ? livefps : livefpsmobile)) {
      var g = livestartrealtime + (c / 1E3 - livestartlocaltime) - trevent.livebuffer - trevent.rogbuffer;
      tfsmode && (g -= livelaststarttime);
      updateTime();
      trevent.setTimeToDraw(g) && (redrawMap(),
      "desktop" == appMode || $("#compMenu").is(":visible") && c - previousinfoupdatetime > 1E3 / mobileinfoupdatefps) && (trevent.updatenamelist(speedunit, "desktop" != appMode),
      previousinfoupdatetime = c);
      previouslivedrawtime = c
  }
  myLiveAnimationReq = requestAnimationFrame(livetimer)
}
function updatelivefromstarttime() {
  livelaststarttime = trevent.getlaststarttime()
}
$("#markerLetSlider").slider({
  min: 6,
  max: 40,
  value: 16,
  range: "min",
  slide: function(c, g) {
      m_val = g.value;
      $("#showML").text(Strings_Letters[langu] + " " + m_val + " px");
      null != trevent && (trevent.setLetterSize(m_val),
      redrawMap())
  }
});
$("#markerSizeSlider").slider({
  min: 2,
  max: 30,
  value: 10,
  range: "min",
  slide: function(c, g) {
      s_val = g.value;
      $("#showMS").text(Strings_Marker_size[langu] + " " + s_val + " px");
      null != trevent && (trevent.setMarkerSize(s_val),
      redrawMap())
  }
});
$("#lineWidthSlider").slider({
  min: 2,
  max: 10,
  value: 4,
  range: "min",
  slide: function(c, g) {
      lw_val = g.value;
      $("#showLW").text(Strings_Line_width[langu] + " " + lw_val + " px");
      null != trevent && (trevent.setLineWidth(lw_val),
      redrawMap())
  }
});
$("#lineOpacitySlider").slider({
  min: 0,
  max: 100,
  value: 80,
  range: "min",
  slide: function(c, g) {
      lo_val = g.value;
      $("#showLO").text(Strings_Line_opacity[langu] + " " + lo_val + " %");
      null != trevent && (trevent.setLineOpacity(lo_val / 100),
      redrawMap())
  }
});
$("#mapOpacitySlider").slider({
  min: 0,
  max: 100,
  value: 100,
  range: "min",
  slide: function(c, g) {
      mo_val = g.value;
      $("#showMO").text(Strings_Map_opacity[langu] + " " + mo_val + " %");
      null != trevent && (null != osmOverlay ? osmOverlay.setOpacity(mo_val / 100) : mapLoverlay.setOpacity(mo_val / 100))
  }
});
function showMS() {
  var c = $("#markerSizeSlider").slider("value");
  $("#showMS").html(Strings_Marker_size[langu] + " " + c + " px")
}
showMS();
function showML() {
  var c = $("#markerLetSlider").slider("value");
  $("#showML").html(Strings_Letters[langu] + " " + c + " px")
}
showML();
function showLW() {
  var c = $("#lineWidthSlider").slider("value");
  $("#showLW").html(Strings_Line_width[langu] + " " + c + " px")
}
showLW();
function showLO() {
  var c = $("#lineOpacitySlider").slider("value");
  $("#showLO").html(Strings_Line_opacity[langu] + " " + c + " %")
}
showLO();
function showMO() {
  var c = $("#mapOpacitySlider").slider("value");
  $("#showMO").html(Strings_Map_opacity[langu] + " " + c + " %")
}
showMO();
$("#showMS").css({
  "margin-bottom": "4px"
});
$("#showML").css({
  "margin-bottom": "4px"
});
$("#showLW").css({
  "margin-bottom": "4px"
});
$("#showLO").css({
  "margin-bottom": "4px"
});
$("#showMO").css({
  "margin-bottom": "4px"
});
"desktop" == appMode ? ($("#appModeDesktopRadio").prop("checked", !0),
$("#btnShowMenu").addClass("hideMenu")) : ($("#appModeMobileRadio").prop("checked", !0),
$("#btnShowMenu").addClass("showMenu"),
setTimeout(function() {
  map.invalidateSize(!1);
  null != canvasoverlay && canvasoverlay.redraw()
}, 1E3));
"" == compFullName && ($(".offsetContHolder").hide(),
$("#resetOff").hide());
$("#picker").colpick({
  flat: !0,
  layout: "hex",
  onSubmit: function(c, g, u, p) {
      compColArray[pickCompIdForColor] = "#" + g;
      $("#ccol" + pickCompIdForColor).css("background-color", compColArray[pickCompIdForColor]);
      $("#compID" + pickCompIdForColor).find(".checkboxFour label").css("background-color", "#" + g);
      trevent.setColor(pickCompIdForColor, "#" + g);
      redrawMap();
      $("#colorBox").hide(0, function() {})
  }
});
$(function() {
  $("#resetOff").button().click(function(c) {
      resetAllOffset()
  })
});
$(function() {
  $("#calcSectorButton").button().click(function(c) {
      calcsectortimes()
  })
});
$("#offBox").bind("enterKey", function(c) {
  setOff()
});
$("#offBox").keyup(function(c) {
  13 == c.keyCode && $(this).trigger("enterKey")
});
$(function() {
  $("#offokbutton").button().click(function(c) {
      setOff()
  })
});
function setOff() {
  var c = /^([-]?[0-9]?[0-9]?[0-9]?[0-9]?[0-9])$/
    , g = $(".showSelOffID").text().replace(/^\D+/g, "");
  if (/^([-]?[0-9]?[0-9]?[0-9]?[:]?[0-5]?[0-9])$|^([-]?[0-9]?[0-9]?[0-9]?[0-9]?[0-9])$/.test($("#offBox").val())) {
      if (c.test($("#offBox").val()))
          curV = $("#offBox").val(),
          trevent.setOffset(g, curV);
      else {
          curV = $("#offBox").val();
          var u = curV.split(":");
          c = "-" == u[0].charAt(0);
          var p = Number(u[0]);
          u = Number(u[1]);
          curV = 0 == p && c ? -1 * u : 0 > p ? 60 * p - u : 60 * p + u;
          trevent.setOffset(g, curV);
          redrawMap();
          trevent.updatenamelist(speedunit, "desktop" != appMode)
      }
      updateOffsetStuff()
  } else
      $("#offBox").val(curV);
  updateOffBox()
}
function resetAllOffset() {
  $("#offBox").val("0:00");
  var c = 0;
  $(".compName").each(function() {
      $(this).css("color", "black");
      $("#cst" + c).css("color", "black");
      c += 1
  });
  trevent.resetAllOffsets();
  redrawMap();
  trevent.updatenamelist(speedunit, "desktop" != appMode);
  updateOffsetStuff()
}
function updateOffBox() {
  console.log(curV);
  if (0 <= curV) {
      var c = Math.floor(curV / 60)
        , g = Math.floor(curV - 60 * c);
      $("#offBox").val(c + ":" + pad(g))
  } else
      c = Math.floor(-curV / 60),
      g = Math.floor(-curV - 60 * c),
      $("#offBox").val("-" + c + ":" + pad(g))
}
function updateOffsetStuff() {
  trevent.updatenamelist(speedunit, "desktop" != appMode);
  var c = 0
    , g = !1;
  $(".compName").each(function() {
      0 != trevent.getOffset(c) ? ($(this).css("color", "red"),
      g = !0) : $(this).css("color", "black");
      c += 1
  });
  g ? map.contextmenu.setDisabled(3, !1) : map.contextmenu.setDisabled(3, !0)
}
var tailLength = 60
, tailHour = 0
, tailMin = 1
, tailSec = 0
, canIUpdate = !1;
$("#tailBox").bind("enterKey", function(c) {
  canIUpdate = !0;
  setTail()
});
$("#tailBox").keyup(function(c) {
  13 == c.keyCode && $(this).trigger("enterKey")
});
$("#tailBox").focusout(function(c) {
  canIUpdate = !0
});
$("#drawtailendcb").change(function() {
  trevent.setDrawTailEnd($("#drawtailendcb").is(":checked"));
  redrawMap()
});
$(document).mouseup(function(c) {
  var g = $("#tailBox, #changeTailLength");
  g.is(c.target) || 0 !== g.has(c.target).length || canIUpdate && updateTailBox()
});
$("#changeTailLength").button().on("click", function() {
  canIUpdate = !0;
  setTail()
});
function setTail() {
  var c = /^\d+$/
    , g = /^[0-9]?[0-9][:][0-9]?[0-9]([:][0-9]?[0-9])?$/;
  if (/^(([1-9]?([0-9]){1,5}))$|^(([0-9]?[0-9])[:]([0-5]?[0-9])([:][0-5]?[0-9]))$|^([0-9]?[0-9][:][0-5]?[0-9])$/.test($("#tailBox").val())) {
      var u = $("#tailBox").val();
      c.test(u) ? (tailLength = Number(u),
      0 < u ? (tailHour = Math.floor(u / 60 / 60),
      tailMin = Math.floor((u - 3600 * tailHour) / 60),
      tailSec = Math.floor(u - 3600 * tailHour - 60 * tailMin)) : (tailHour = Math.ceil(u / 60 / 60),
      tailMin = Math.floor((Math.abs(u) - 3600 * Math.abs(tailHour)) / 60),
      tailSec = Math.floor(Math.abs(u) - 3600 * Math.abs(tailHour) - 60 * tailMin))) : g.test(u) && (c = u.split(":"),
      2 >= c.length ? (tailHour = 0,
      tailMin = Number(c[0]),
      tailSec = Number(c[1]),
      tailLength = "-" == c[0].charAt(0) ? -(60 * tailMin + tailSec) : 60 * tailMin + tailSec) : (tailHour = Number(c[0]),
      tailMin = Number(c[1]),
      tailSec = Number(c[2]),
      tailLength = "-" == c[0].charAt(0) ? -(3600 * tailHour + 60 * tailMin + tailSec) : 3600 * tailHour + 60 * tailMin + tailSec));
      trevent.setTailLength(tailLength);
      redrawMap()
  } else
      window.alert("Invalid value.");
  updateTailBox()
}
function updateTailBox() {
  var c = Math.floor(tailLength / 60 / 60)
    , g = Math.floor((tailLength - 3600 * c) / 60)
    , u = Math.floor(tailLength - 3600 * c - 60 * g);
  0 == c ? $("#tailBox").val(g + ":" + pad(u)) : $("#tailBox").val(c + ":" + pad(g) + ":" + pad(u));
  canIUpdate = !1
}
function updateTailBox2(c) {
  tailLength = c;
  updateTailBox()
}
function addTailLength(c) {
  tailLength += c;
  0 > tailLength && (tailLength = 0);
  359999 < tailLength && (tailLength = 359999)
}
$("#addbtnS").click(function() {
  addTailLength(1);
  updateTailBox();
  trevent.setTailLength(tailLength);
  redrawMap()
});
$("#addbtnM").click(function() {
  addTailLength(60);
  updateTailBox();
  trevent.setTailLength(tailLength);
  redrawMap()
});
$("#addbtnH").click(function() {
  addTailLength(3600);
  updateTailBox();
  trevent.setTailLength(tailLength);
  redrawMap()
});
$("#minusbtnH").click(function() {
  addTailLength(-3600);
  updateTailBox();
  trevent.setTailLength(tailLength);
  redrawMap()
});
function pad(c) {
  return 10 > c ? "0" + c : c
}
$("#minusbtnS").click(function() {
  addTailLength(-1);
  updateTailBox();
  trevent.setTailLength(tailLength);
  redrawMap()
});
$("#minusbtnM").click(function() {
  addTailLength(-60);
  updateTailBox();
  trevent.setTailLength(tailLength);
  redrawMap()
});
$("#sectorroutescb").change(function() {
  null != trevent && trevent.setsectormode($("#sectorroutescb").prop("checked"), map);
  map.closePopup();
  $("#sectorcolorcb").prop("disabled", !$("#sectorroutescb").prop("checked"));
  redrawMap()
});
$("#sectorcolorcb").change(function() {
  null != trevent && trevent.setsectorcolormode($("#sectorcolorcb").prop("checked"), map);
  map.closePopup();
  redrawMap()
});
$("#liveStatus").click(function() {
  appIsReady && eventIsLive && ($("#liveStatus").hasClass("liveMode") ? (replaymode = !0,
  $("#liveStatus").addClass("replayMode").removeClass("liveMode"),
  $("#text").html('<span class="smallertext">LIVE</span>&nbsp;&nbsp;<span class="boldertext">REPLAY</span>'),
  $("#ball").css("background-color", "red"),
  map.contextmenu.setDisabled(2, !1)) : (replaymode = !1,
  map.contextmenu.setDisabled(2, !0),
  $("#liveStatus").addClass("liveMode").removeClass("replayMode"),
  $("#text").html('<span class="boldertext">LIVE</span>&nbsp;&nbsp;<span class="smallertext">REPLAY</span>'),
  $("#ball").css("background-color", "green")),
  replaymodechanged())
});
function replaymodechanged() {
  trevent.setreplaymode(replaymode);
  if (replaymode) {
      window.cancelAnimationFrame(myLiveAnimationReq);
      var c = trevent.getReplayMinTime()
        , g = trevent.getReplayMaxTime();
      g < c && (g = c);
      $("#timeSlider").slider("option", "max", g);
      $("#timeSlider").slider("option", "min", c);
      trevent.timetodraw < c && trevent.setTimeToDraw(c);
      trevent.timetodraw > g && trevent.setTimeToDraw(g);
      $("#timeSlider").slider("option", "value", trevent.timetodraw);
      updateTime();
      redrawMap();
      trevent.updatenamelist(speedunit, "desktop" != appMode)
  } else
      sliding = replaying = !1,
      window.cancelAnimationFrame(myReplayAnimationReq),
      window.cancelAnimationFrame(myAnimationReq),
      myLiveAnimationReq = requestAnimationFrame(livetimer),
      $("#btnPlay").addClass("paused").removeClass("playing");
  uiLiveReplay(!replaymode, !1)
}
$("#btnShowSetMenu").click(function() {
  $("#btnShowSetMenu").hide();
  $("#btnShowSetMenu").hasClass("showSetMenu") ? ($("#btnShowSetMenu").addClass("hideSetMenu").removeClass("showSetMenu"),
  $("#statusBox").css("right", "190px"),
  $("#btnShowSetMenu").css("right", "180px"),
  $("#settingsMenu").toggle("fast", "linear", function() {
      $("#btnShowSetMenu").show();
      map.invalidateSize(!1);
      null != canvasoverlay && canvasoverlay.redraw()
  }),
  1 == $("#setMenuTabs").tabs("option", "active") && (splitsVisible = !0,
  updateSplits())) : ($("#settingsMenu").toggle("fast", "linear", function() {
      $("#btnShowSetMenu").show();
      map.invalidateSize(!1);
      null != canvasoverlay && canvasoverlay.redraw()
  }),
  $("#btnShowSetMenu").addClass("showSetMenu").removeClass("hideSetMenu"),
  $("#btnShowSetMenu").css("right", "0px"),
  $("#statusBox").css("right", "10px"),
  splitsVisible = !1);
  console.log(map.getSize().x)
});
$(function() {
  $("#infoRadios").buttonset()
});
$("#infoRadios input[type=radio]").change(function() {
  hideCompMenu();
  $(".compData").toggle();
  "Show" == this.value ? "desktop" == appMode ? changeUI("30px", "30px", "1px", "30px", "6px") : changeUI("39px", "39px", "1px", "39px", "7px") : "desktop" == appMode ? changeUI("24px", "24px", "3px", "24px", "3px") : changeUI("28px", "28px", "4px", "28px", "3px")
});
function changeUI(c, g, u, p, d) {
  $(".competitor").css({
      height: c
  });
  $(".competitorSelected").css({
      height: g
  });
  $(".compName").css({
      "margin-top": u
  });
  $(".compSelect").css("height", p);
  $(".checkboxFour").css("margin-top", d)
}
$("#btnShowMenu").click(function() {
  "desktop" == appMode ? ($("#btnShowMenu").hide(),
  $("#menu").toggle("fast", "linear", function() {
      $("#btnShowMenu").hasClass("showMenu") ? ($("#btnShowMenu").addClass("hideMenu").removeClass("showMenu"),
      "desktop" == appMode && $("#btnShowMenu").css("left", "230px")) : ($("#btnShowMenu").addClass("showMenu").removeClass("hideMenu"),
      "desktop" == appMode && $("#btnShowMenu").css("left", "0px"));
      $("#btnShowMenu").show();
      map.invalidateSize(!1);
      null != canvasoverlay && canvasoverlay.redraw();
      console.log(map.getSize().x)
  })) : ($("#menuBtnContainerMobile").hasClass("showMobileMenu") ? ($("#menuBtnContainerMobile").hide(),
  $("#menu, #settingsMenu").hide(),
  $("#statusBox").show(),
  splitsVisible = !1,
  playerStatus(),
  $("#menuBtnContainerMobile").removeClass("showMobileMenu"),
  $("#btnShowMenu").addClass("showMenu").removeClass("hideMenu"),
  ismapvisible = !0,
  mapbecamevisible()) : $("#btnShowMenu").hasClass("showMenu") ? ($("#btnShowMenu").hide(),
  $("#btnShowMenu").css("top", "130px"),
  $("#menuBtnContainerMobile").slideDown(400, function() {
      $("#btnShowMenu").show()
  }),
  $("#btnShowMenu").addClass("hideMenu").removeClass("showMenu")) : ($("#menuBtnContainerMobile").hide(),
  $("#btnShowMenu").addClass("showMenu").removeClass("hideMenu"),
  $("#btnShowMenu").css("top", "0px")),
  map.invalidateSize(!1),
  null != canvasoverlay && canvasoverlay.redraw())
});
$("#btnShowPlayer").click(function() {
  $("#player").toggle(0, "linear", function() {
      $("#btnShowPlayer").hasClass("hidePlayer") ? ($("#btnShowPlayer").addClass("showPlayer").removeClass("hidePlayer"),
      $("#btnShowPlayer").css("bottom", "0px"),
      $("#map").css("height", "100%")) : ($("#btnShowPlayer").addClass("hidePlayer").removeClass("showPlayer"),
      $("#btnShowPlayer").css("bottom", "61px"),
      $("#map").css("height", divHeights[0]));
      map.invalidateSize(!1);
      null != canvasoverlay && canvasoverlay.redraw()
  })
});
function playerStatus() {
  replaymode && ($("#btnShowPlayer").show(),
  $("#btnShowPlayer").hasClass("hidePlayer") ? ($("#player").show(),
  $("#btnShowPlayer").css("bottom", "61px"),
  $("#map").css("height", divHeights[0])) : ($("#player").hide(),
  $("#btnShowPlayer").css("bottom", "0px")),
  map.invalidateSize(!1),
  null != canvasoverlay && canvasoverlay.redraw())
}
$("#btnOptions, #btnList").click(function() {
  var c = this.id;
  $(this).hasClass("btnNotSelected") && ($(this).addClass("btnSelected").removeClass("btnNotSelected"),
  "btnList" == c ? ($("#btnList").hide(),
  $("#btnOptions").show(),
  $("#btnOptions").addClass("btnNotSelected").removeClass("btnSelected")) : ($("#btnOptions").hide(),
  $("#btnList").show(),
  $("#btnList").addClass("btnNotSelected").removeClass("btnSelected")),
  $("#compMenu").toggle(0, "linear", function() {}),
  $("#optionsMenu").toggle(0, "linear", function() {}))
});
$("#listoptionsButton").click(function() {
  $(this).hasClass("fa-wrench") ? $(this).addClass("fa-list-ul").removeClass("fa-wrench") : $(this).addClass("fa-wrench").removeClass("fa-list-ul");
  $("#compMenu").toggle(0, "linear", function() {});
  $("#optionsMenu").toggle(0, "linear", function() {})
});
$("#btnOptionsMobile, #btnListMobile, #btnSettingsMobile").click(function() {
  var c = this.id;
  $("#menuBtnContainerMobile").hide();
  $("#btnShowMenu").css("top", "0px");
  $("#btnShowPlayer").hide();
  $("#player").hide();
  $("#menuBtnContainerMobile").addClass("showMobileMenu");
  ismapvisible = !1;
  "btnListMobile" == c ? ($("#menu").show(),
  $("#statusBox").hide(),
  $("#optionsMenu").hide(0, "linear", function() {}),
  $("#compMenu").show(0, "linear", function() {}),
  trevent.updatenamelist(speedunit, "desktop" != appMode)) : "btnOptionsMobile" == c ? ($("#menu").show(),
  $("#statusBox").hide(),
  $("#compMenu").hide(0, "linear", function() {}),
  $("#optionsMenu").show(0, "linear", function() {})) : ($("#settingsMenu").show(),
  $("#statusBox").hide(),
  1 == $("#setMenuTabs").tabs("option", "active") && (splitsVisible = !0,
  updateSplits()))
});
$("#btnPlay, #btnPlayMob").click(function() {
  maxPT = $("#timeSlider").slider("option", "max");
  minPT = $("#timeSlider").slider("option", "min");
  $(this).hasClass("paused") ? ($(this).addClass("playing").removeClass("paused"),
  replaystartrealtime = new Date,
  replaystartracetime = trevent.timetodraw,
  replaying = !0,
  myReplayAnimationReq = requestAnimationFrame(replaytimer)) : ($(this).addClass("paused").removeClass("playing"),
  replaying = !1,
  window.cancelAnimationFrame(myReplayAnimationReq))
});
function resetPlayBtn() {
  $("#btnPlay, #btnPlayMob").addClass("paused").removeClass("playing")
}
function tfsmodechanged() {
  trevent.setTFSmode(tfsmode);
  updatelivefromstarttime();
  var c = trevent.getReplayMinTime()
    , g = trevent.getReplayMaxTime();
  g < c && (g = c);
  $("#timeSlider").slider("option", "max", g);
  $("#timeSlider").slider("option", "min", c);
  $("#timeSlider").slider("option", "value", c);
  replaymode && trevent.setTimeToDraw(c) && (redrawMap(),
  updateTime(),
  trevent.updatenamelist(speedunit, "desktop" != appMode))
}
$("#btnMassStart").click(function() {
  appIsReady && ($(this).hasClass("btnMSoff") ? (tfsmode = !0,
  $("#btnMassStart").addClass("btnMSon").removeClass("btnMSoff"),
  $("#btnMassStartText").html('<span class="smallertext">' + Strings_REAL[langu] + '</span>&nbsp;&nbsp;&nbsp;<span class="boldertext">' + Strings_SYNC[langu] + "</span>")) : (tfsmode = !1,
  $("#btnMassStart").addClass("btnMSoff").removeClass("btnMSon"),
  $("#btnMassStartText").html('<span class="boldertext">' + Strings_REAL[langu] + '</span>&nbsp;&nbsp;&nbsp;<span class="smallertext">' + Strings_SYNC[langu] + "</span>")),
  replaying && (replaying = !1,
  window.cancelAnimationFrame(myReplayAnimationReq),
  resetPlayBtn()),
  tfsmodechanged())
});
$("#btnCheckAll").click(function() {
  $(this).hasClass("fa-circle") ? ($(this).addClass("fa-check").removeClass("fa-circle"),
  $("#btnClear").is(":visible") ? ($("#competitorCont input:checkbox").prop("checked", !0),
  trevent.checkNone(map, ismapvisible),
  $(".competitor:visible, .competitorSelected:visible").each(function() {
      var c = $(this).attr("id").replace(/^\D+/g, "");
      $(this).find("input:checkbox").prop("checked", !1);
      trevent.toggleCheck(c, map, ismapvisible)
  })) : ($("#competitorCont input:checkbox").prop("checked", !1),
  trevent.checkAll(map, ismapvisible))) : ($(this).addClass("fa-circle").removeClass("fa-check"),
  $("#competitorCont input:checkbox").prop("checked", !0),
  trevent.checkNone(map, ismapvisible));
  eventIsLive && updatelivefromstarttime();
  splitsVisible && updateSplits();
  redrawMap()
});
$("#btnSel").click(function() {
  if ("-> Sel." == $("#btnSel").text()) {
      $("#competitorCont input:checkbox").prop("checked", !0);
      var c = $(".competitor").length;
      if (isCompSelected)
          for (var g = 0; g < c + 1; g++) {
              if ($("#compID" + g).hasClass("competitorSelected")) {
                  isCompSelected = !0;
                  for (var u = 0; u <= g; u++)
                      $("#c" + u).prop("checked", !1);
                  trevent.checkUntil(g, map, ismapvisible);
                  eventIsLive && updatelivefromstarttime()
              }
          }
      else
          trevent.checkNone(map, ismapvisible)
  } else
      $("#competitorCont input:checkbox").prop("checked", !0),
      trevent.checkNone(map, ismapvisible),
      $(".competitor:visible, .competitorSelected:visible").each(function() {
          var p = $(this).attr("id").replace(/^\D+/g, "");
          $(this).find("input:checkbox").prop("checked", !1);
          trevent.toggleCheck(p, map, ismapvisible)
      }),
      eventIsLive && updatelivefromstarttime();
  redrawMap()
});
var textFlag = !1;
$(".textbox").on("input", function() {
  var c = ""
    , g = ""
    , u = $(this).val();
  0 == textFlag && ($("#btnClear").show(),
  textFlag = !0);
  if ("" == u)
      $("#btnClear").hide(),
      $(".competitor, .competitorSelected").each(function() {
          $(this).show()
      }),
      textFlag = !1;
  else {
      u = escapeRegExp(u);
      var p = new RegExp(u,"i");
      $(".competitor, .competitorSelected").each(function() {
          var d = $(this).attr("id").replace(/^\D+/g, "");
          c = $("#" + d).text();
          g = $("#compLetters" + d).text();
          p.test(c) || p.test(g) ? $(this).show() : $(this).hide()
      })
  }
});
function escapeRegExp(c) {
  return c.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
}
$("#btnClear").click(function() {
  $(".textbox").val("");
  $(".competitor, .competitorSelected").each(function() {
      $(this).show()
  });
  $("#btnClear").hide();
  $(".textbox").css("width", "180px");
  $(".textbox").css("border-top-right-radius", "6px");
  $(".textbox").css("border-bottom-right-radius", "6px");
  textFlag = !1
});
$(function() {
  $("#appModeRadio").buttonset()
});
$("#appModeRadio input[type=radio]").change(function() {
  hideCompMenu();
  "Mobile" == this.value ? (document.cookie = "gpsAppMode=mobile",
  appMode = "mobile",
  replaymode ? ($("#player").show(),
  $("#map").css("height", divHeights[0]),
  $("#menu").css("height", "100%"),
  $("#btnShowPlayer").addClass("hidePlayer").removeClass("showPlayer"),
  $("#btnShowPlayer").show(),
  $("#btnShowPlayer").css("bottom", "61px")) : $("#btnShowPlayer").hide(),
  $("#btnShowMenu").css("left", "50%"),
  $("#btnShowMenu").css("top", "0px"),
  $("#cssMode").attr("href", cdnpath + "css/mobile.css"),
  $("#btnShowMenu").hasClass("hideMenu") && ($("#menu").hide(),
  $("#btnShowMenu").addClass("showMenu").removeClass("hideMenu")),
  $("#btnShowSetMenu").hasClass("hideSetMenu") && ($("#settingsMenu").hide(),
  $("#btnShowSetMenu").addClass("showSetMenu").removeClass("hideSetMenu"),
  $("#btnShowSetMenu").css("right", "0px"),
  $("#statusBox").css("right", "20px")),
  "Show" == $("#infoRadios :radio:checked").val() ? changeUI("39px", "39px", "1px", "39px", "7px") : changeUI("28px", "28px", "4px", "28px", "3px")) : ($("#menuBtnContainerMobile").removeClass("showMobileMenu"),
  document.cookie = "gpsAppMode=desktop",
  appMode = "desktop",
  $("#statusBox").show(),
  replaymode && ($("#player").show(),
  $("#map, #menu").css("height", divHeights[1])),
  $("#btnShowMenu").css("top", "50%"),
  $("#btnShowMenu").css("left", "230px"),
  $("#cssMode").attr("href", cdnpath + "css/style.css"),
  ismapvisible = !0,
  mapbecamevisible(),
  "Show" == $("#infoRadios :radio:checked").val() ? changeUI("30px", "30px", "1px", "30px", "6px") : changeUI("24px", "24px", "3px", "24px", "3px"));
  0 < logos.length && changelogo(!1);
  map.invalidateSize(!1);
  null != canvasoverlay && canvasoverlay.redraw();
  setTimeout(function() {
      map.invalidateSize(!1);
      null != canvasoverlay && canvasoverlay.redraw()
  }, 1E3);
  splitsVisible = !1;
  initTooltip()
});
var tailLengthBU = 0;
$(function() {
  $("#rallymodeRadio").buttonset()
});
$("#rallymodeRadio input[type=radio]").change(function() {
  "Off" == this.value ? trevent.setRallymode(!1) : trevent.setRallymode(!0);
  redrawMap()
});
$(function() {
  $("#tailOnOffRadio").buttonset()
});
$("#tailOnOffRadio input[type=radio]").change(function() {
  "Off" == this.value ? (document.getElementById("tailBox").disabled = !0,
  $("#tailBox").val("0:00"),
  tailLengthBU = tailLength,
  tailLength = 1E10) : (document.getElementById("tailBox").disabled = !1,
  tailLength = tailLengthBU,
  updateTailBox());
  toggleTailButtons();
  trevent.setTailLength(tailLength);
  redrawMap()
});
$(function() {
  $("#showDifferenceRadio").buttonset()
});
$("#showDifferenceRadio input[type=radio]").change(function() {
  "dion" == this.value ? ($(".btnOffsetReset").show(),
  isdiffvisible = !0,
  updatedifference()) : ($(".btnOffsetReset").hide(),
  isdiffvisible = !1)
});
$(function() {
  var c = $("#mindiffspinner").spinner({
      min: 0,
      max: 1E5,
      change: function(u, p) {
          mindiff = $("#mindiffspinner").val();
          updatedifference()
      },
      spin: function(u, p) {
          mindiff = p.value;
          updatedifference()
      }
  })
    , g = $("#maxdiffspinner").spinner({
      min: 0,
      max: 1E5,
      change: function(u, p) {
          maxdiff = $("#maxdiffspinner").val();
          updatedifference()
      },
      spin: function(u, p) {
          maxdiff = p.value;
          updatedifference()
      }
  });
  c.spinner("value", 0);
  g.spinner("value", 10)
});
$(function() {
  $("#lapselspinner").spinner({
      min: 1,
      max: 1E3,
      change: function(c, g) {
          splitlapval = $("#lapselspinner").val();
          updateSplits()
      },
      spin: function(c, g) {
          splitlapval = g.value;
          updateSplits()
      }
  }).spinner("value", 1)
});
$(function() {
  $("#lap1selspinner").spinner({
      min: 1,
      max: 1E3,
      change: function(c, g) {
          splitlap1val = $("#lap1selspinner").val()
      },
      spin: function(c, g) {
          splitlap1val = g.value
      }
  }).spinner("value", 1)
});
$(function() {
  $("#lap2selspinner").spinner({
      min: 1,
      max: 1E3,
      change: function(c, g) {
          splitlap2val = $("#lap2selspinner").val()
      },
      spin: function(c, g) {
          splitlap2val = g.value
      }
  }).spinner("value", 1)
});
function toggleTailButtons() {
  $(".tailContHolder").toggle()
}
function addClickFunction(c) {
  $("#" + c).click(function() {
      $("#" + this.id + "Area").slideToggle("fast", "linear", function() {});
      $(this).hasClass("btnSetting") ? $(this).addClass("btnSettingOpen").removeClass("btnSetting") : $(this).addClass("btnSetting").removeClass("btnSettingOpen")
  })
}
$("#exAll").click(function() {
  $(".setAreaID").each(function() {
      $(this).show("slide", {
          direction: "up"
      }, 400, function() {});
      $(".btnSetting").addClass("btnSettingOpen").removeClass("btnSetting")
  })
});
$("#colAll").click(function() {
  $(".setAreaID").each(function() {
      $(this).hide("slide", {
          direction: "up"
      }, 400, function() {});
      $(".btnSettingOpen").addClass("btnSetting").removeClass("btnSettingOpen")
  })
});
$("#helpBtn, #helpboxclose").click(function() {
  $("#helpBox").toggle(0, function() {})
});
var colo = "";
$("#colorboxclose").click(function() {
  $("#colorBox").toggle(0, function() {})
});
function hexc(c) {
  c = c.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  delete c[0];
  for (var g = 1; 3 >= g; ++g)
      c[g] = parseInt(c[g]).toString(16),
      1 == c[g].length && (c[g] = "0" + c[g]);
  colo = c.join("")
}
$(function() {
  $("#unitRadios").buttonset()
});
$("#unitRadios input[type=radio]").change(function() {
  "kmh" == this.value ? speedunit = 1 : "minkm" == this.value ? speedunit = 2 : "knot" == this.value ? speedunit = 3 : "batt" == this.value && (speedunit = 4);
  trevent.updatenamelist(speedunit, "desktop" != appMode)
});
$("#chooseSpointselect").change(function() {
  checkandhidelaps();
  updateSplits();
  updateSplitIgnore()
});
$("#deleteSpointbutton").button().on("click", function() {
  trevent.removesplitpoint($("#chooseSpointselect").val(), splitlgroup);
  $("#splitlinesettings").slideToggle("fast", "linear", function() {});
  $("#splitsettingscb").button("option", "icons", {
      primary: "ui-icon-carat-1-s"
  });
  $("#chooseSpointselect ").html(trevent.getsplitpointlist(!1, !1));
  $("#chooseSpointselect option:last").attr("selected", "selected");
  $("#chooseS1pointselect ").html(trevent.getsplitpointlist(!1, !0));
  $("#chooseS1pointselect option:first").attr("selected", "selected");
  $("#chooseS2pointselect ").html(trevent.getsplitpointlist(!1, !1));
  $("#chooseS2pointselect option:last").attr("selected", "selected");
  checkandhidelaps();
  1 > $("#chooseSpointselect option").length ? $("#splitsettingscb").button("option", "disabled", !0) : updateSplitIgnore();
  updateSplits()
});
function checkandhidelaps() {
  null != trevent && (trevent.isline($("#chooseSpointselect").val()) ? $("#lapselspan").show() : $("#lapselspan").hide())
}
function updateSplits() {
  if (null != trevent) {
      var c = 1 * splitlapval;
      $("#splitlist").html(trevent.calcsplitpointtimes($("#chooseSpointselect").val(), mapHeight, "start" == $("input[name=radio2]:checked").val(), "diff" == $("input[name=radio3]:checked").val(), "let" == $("input[name=radio4]:checked").val(), "checked" == $("input[name=radio5]:checked").val(), c - 1))
  }
}
function updateRog() {
  $("#roglist").html(trevent.calcrog());
  $(".rognamebase").click(function() {
      if (-1 < trevent.selectedrog) {
          if (!$(this).hasClass("hlrogname")) {
              $(".hlrogname").addClass("rogname").removeClass("hlrogname");
              $(this).addClass("hlrogname").removeClass("rogname");
              var c = Number($(this).attr("id").substring(3));
              trevent.selectedrog = c
          }
          trevent.updaterogonmap()
      }
      trevent.updaterogonmap()
  })
}
function enablerog() {
  $("#setMenuTabs").tabs("enable", 4);
  $("#rogonthemapcb").prop("checked", !1)
}
function calcsectortimes() {
  if (null != trevent) {
      var c = 1 * splitlap1val
        , g = 1 * splitlap2val
        , u = new Date;
      $("#sectorlist").html(trevent.calcsectortimes($("#chooseS1pointselect").val() - 1, $("#chooseS2pointselect").val(), c - 1, g - 1, mapHeight, "diff" == $("input[name=radio3]:checked").val(), "let" == $("input[name=radio4]:checked").val(), "checked" == $("input[name=radio5]:checked").val()));
      console.log("sector took " + (new Date - u) + " ms");
      $(".sectornamebase").click(function() {
          if ($(this).hasClass("hlsectorname"))
              $(this).addClass("sectorname").removeClass("hlsectorname"),
              trevent.sectorhl = -1;
          else {
              $(".hlsectorname").addClass("sectorname").removeClass("hlsectorname");
              $(this).addClass("hlsectorname").removeClass("sectorname");
              var p = Number($(this).attr("id").substring(4));
              trevent.sectorhl = p
          }
          map.closePopup();
          redrawMap()
      });
      map.closePopup();
      trevent.reorderPaths(map);
      redrawMap()
  }
}
function updateSplitIgnore() {
  var c = trevent.getsplitsettingRT($("#chooseSpointselect").val());
  -1 == c ? $("#igRTlabel").text(Strings_not_set[langu]) : $("#igRTlabel").text(c.replace("T", " ").replace(".000Z", ""));
  c = trevent.getsplitsettingTFS($("#chooseSpointselect").val());
  -1 == c ? $("#igTFSlabel").text(Strings_not_set[langu]) : $("#igTFSlabel").text(c)
}
$(function() {
  $("#splitsettingscb").button({
      icons: {
          primary: "ui-icon-carat-1-s"
      },
      text: !1,
      disabled: !0
  }).click(function(c) {
      $("#splitlinesettings").slideToggle("fast", "linear", function() {});
      this.checked ? $(this).button("option", "icons", {
          primary: "ui-icon-carat-1-s"
      }) : $(this).button("option", "icons", {
          primary: "ui-icon-carat-1-n"
      })
  })
});
$(function() {
  $("#showHideLinesRadio").buttonset()
});
$("#showHideLinesRadio input[type=radio]").change(function() {
  null != trevent && trevent.showhidelines("show" == this.value, splitlgroup)
});
$("#rogonthemapcb").change(function() {
  null != trevent && (trevent.showhiderogs(this.checked, rogcgroup, mapHeight),
  trevent.updateroglist())
});
$(function() {
  $("#timeToUseRadio").buttonset()
});
$("#timeToUseRadio input[type=radio]").change(function() {
  console.log(this.value)
});
$(function() {
  $("#showDiffTimeRadio").buttonset()
});
$("#showDiffTimeRadio input[type=radio]").change(function() {
  console.log(this.value)
});
$(function() {
  $("#showLetNamesRadio").buttonset()
});
$("#showLetNamesRadio input[type=radio]").change(function() {
  console.log(this.value)
});
$(function() {
  $("#showAllCheckRadio").buttonset()
});
$("#showAllCheckRadio input[type=radio]").change(function() {
  console.log(this.value)
});
$("#decFontSize").button({
  icons: {
      primary: "ui-icon-minusthick"
  },
  text: !1
}).click(function(c) {
  $("#fontSizeSpan").button("option", "label", 1 * $("#fontSizeSpan").button("option", "label") - 1);
  c = $("#fontSizeSpan").button("option", "label");
  $("#splitlist").css({
      fontSize: c
  });
  $("#sectorlist").css({
      fontSize: c
  })
});
$("#incFontSize").button({
  icons: {
      primary: "ui-icon-plusthick"
  },
  text: !1
}).click(function(c) {
  $("#fontSizeSpan").button("option", "label", 1 * $("#fontSizeSpan").button("option", "label") + 1);
  c = $("#fontSizeSpan").button("option", "label");
  $("#splitlist").css({
      fontSize: c
  });
  $("#sectorlist").css({
      fontSize: c
  })
});
$("#fontSizeSpan").button({
  disabled: !0
});
$(function() {
  $("#fontSizeButtons").buttonset()
});
$(function() {
  function c(y) {
      l.text(y).addClass("ui-state-highlight");
      setTimeout(function() {
          l.removeClass("ui-state-highlight", 1500)
      }, 500)
  }
  function g(y, A, C) {
      if (A.test(y.val()))
          return !0;
      y.addClass("ui-state-error");
      c(C);
      return !1
  }
  function u() {
      var y = !0;
      t.removeClass("ui-state-error");
      q.prop("checked") && (y = y && g(m, p, "YYYY-MM-DD HH:MM:SS"));
      h.prop("checked") && (y = y && g(f, d, "HHH:MM:SS"));
      y && (trevent.setsplitsettingTFS($("#chooseSpointselect").val(), h.prop("checked") ? f.val() : -1),
      trevent.setsplitsettingRT($("#chooseSpointselect").val(), q.prop("checked") ? m.val() : -1),
      updateSplitIgnore(),
      updateSplits(),
      v.dialog("close"));
      return y
  }
  var p = /^(\d\d\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01]) (0[0-9]|1[0-9]|2[0-4]):([0-5][0-9]):([0-5][0-9]))$/
    , d = /^(\d\d\d|\d\d|\d):([0-5][0-9]):([0-5][0-9])$/
    , m = $("#ignoreRT")
    , f = $("#ignoreTFS")
    , q = $("#ignoreRTcb")
    , h = $("#ignoreTFScb")
    , t = $([]).add(m).add(f)
    , l = $(".validateTips");
  q.change(function() {
      q.prop("checked") ? m.prop("disabled", !1) : m.prop("disabled", !0)
  });
  h.change(function() {
      h.prop("checked") ? f.prop("disabled", !1) : f.prop("disabled", !0)
  });
  var v = $("#ignore-dialog-form").dialog({
      autoOpen: !1,
      height: "auto",
      width: 160,
      modal: !0,
      dialogClass: "ignoredialog",
      position: {
          my: "center top",
          at: "center bottom",
          of: "#ignorebutton"
      },
      buttons: {
          OK: u,
          Cancel: function() {
              w[0].reset();
              t.removeClass("ui-state-error");
              v.dialog("close")
          }
      },
      open: function() {
          var y = trevent.getsplitsettingRT($("#chooseSpointselect").val());
          -1 == y ? (q.prop("checked", !1),
          m.prop("disabled", !0),
          m.val(trevent.splitdefaultrt)) : (q.prop("checked", !0),
          m.prop("disabled", !1),
          m.val(y.replace("T", " ").replace(".000Z", "")));
          y = trevent.getsplitsettingTFS($("#chooseSpointselect").val());
          -1 == y ? (h.prop("checked", !1),
          f.prop("disabled", !0),
          f.val("00:00:00")) : (h.prop("checked", !0),
          f.prop("disabled", !1),
          f.val(y))
      },
      close: function() {
          w[0].reset();
          t.removeClass("ui-state-error")
      }
  });
  var w = v.find("form").on("submit", function(y) {
      y.preventDefault();
      u()
  });
  $("#ignorebutton").button().on("click", function() {
      v.dialog("open")
  })
});
$(function() {
  function c() {
      nsdialog.dialog("option", "title") == Strings_New_split_line[langu] ? (map.removeLayer(splitlinecandidate),
      map.removeLayer(splitlinecandidate2),
      savesplitline(),
      splitlinecandidate2 = splitlinecandidate = null) : (map.removeLayer(splitcandidate.marker),
      savesplitpoint(),
      splitcandidate = null);
      nsdialog.dialog("close");
      return !0
  }
  nsdialog = $("#newpoint-dialog-form").dialog({
      autoOpen: !1,
      height: "auto",
      width: 240,
      modal: !0,
      dialogClass: "ignoredialog",
      position: {
          my: "center center",
          at: "center center",
          of: window
      },
      buttons: {
          OK: c,
          Cancel: function() {
              nsdialog.dialog("close")
          }
      },
      close: function() {
          nsdialog.dialog("option", "title") == Strings_New_split_line[langu] ? null != splitlinecandidate && (map.removeLayer(splitlinecandidate),
          map.removeLayer(splitlinecandidate2),
          splitlinecandidate2 = splitlinecandidate = null) : null != splitcandidate && (map.removeLayer(splitcandidate.marker),
          splitcandidate = null);
          g[0].reset()
      },
      open: function() {
          nsdialog.dialog("option", "title") == Strings_New_split_line[langu] ? $("#newsplitradiusdiv").hide() : $("#newsplitradiusdiv").show()
      }
  });
  var g = nsdialog.find("form").on("submit", function(u) {
      u.preventDefault();
      c()
  });
  $("#newsplitradiusselect").change(function() {
      splitcandidate.radiusmeters = $("#newsplitradiusselect").val();
      prevsplitpointradius = splitcandidate.radiusmeters;
      var u = trevent.getmperpixel()
        , p = map.containerPointToLatLng(L.point(0, 0))
        , d = map.containerPointToLatLng(L.point(0, 100));
      splitcandidate.marker.options.icon.setsize(2 * splitcandidate.radiusmeters / (u / (0 < trevent.mapsystem ? 100 / (111319.9 * (p.lat - d.lat)) : Math.pow(1E4 / (Math.pow(p.lat - d.lat, 2) + Math.pow(p.lng - d.lng, 2)), .5))))
  })
});
$("#diffFirstselect").change(function() {
  diffcomp1 = $("#diffFirstselect").val();
  diffcomp1nro = $("#diffFirstselect option:selected").index();
  updatedifference()
});
$("#diffBehindselect").change(function() {
  diffcomp2 = $("#diffBehindselect").val();
  diffcomp2nro = $("#diffBehindselect option:selected").index();
  updatedifference()
});
document.getElementById("tailBox").defaultValue = "1:00";
window.onload = function() {
  var c = document.getElementById("speed-select")
    , g = document.getElementById("speed-selectMob");
  c = [c, g];
  g = "1 2 3 5 7 10 15 20 30 50 120 300 600 1200".split(" ");
  for (var u = g.length, p = 0; 2 > p; p++)
      for (var d = 0; d < u; d++) {
          var m = document.createElement("option");
          m.text = m.value = g[d];
          5 == d && (m.selected = "true");
          c[p].add(m, 0)
      }
}
;
function holdit(c, g, u, p) {
  var d = 0
    , m = null
    , f = function() {
      d++;
      (1 == d || 4 == d || 5 < d) && g();
      m = window.setTimeout(f, 100)
  };
  c.onmousedown = function() {
      d = 0;
      f()
  }
  ;
  c.onmouseup = function() {
      window.clearTimeout(m);
      d = 0;
      replayspeed = $("#speed-select").val();
      continueReplaying && (replaying = !0,
      continueReplaying = !1,
      replaystartrealtime = new Date,
      replaystartracetime = trevent.timetodraw,
      myReplayAnimationReq = requestAnimationFrame(replaytimer))
  }
  ;
  c.onmouseout = function() {
      window.clearTimeout(m);
      d = 0;
      replayspeed = $("#speed-select").val();
      continueReplaying && (replaying = !0,
      continueReplaying = !1,
      replaystartrealtime = new Date,
      replaystartracetime = trevent.timetodraw,
      myReplayAnimationReq = requestAnimationFrame(replaytimer))
  }
}
holdit(document.getElementById("a1l"), function() {
  windTime(-1)
}, fSpeed, multiplier);
holdit(document.getElementById("a2l"), function() {
  windTime(-10)
}, fSpeed, multiplier);
holdit(document.getElementById("a3l"), function() {
  windTime(-60)
}, fSpeed, multiplier);
holdit(document.getElementById("a4l"), function() {
  windTime(-600)
}, fSpeed, multiplier);
holdit(document.getElementById("a1r"), function() {
  windTime(1)
}, fSpeed, multiplier);
holdit(document.getElementById("a2r"), function() {
  windTime(10)
}, fSpeed, multiplier);
holdit(document.getElementById("a3r"), function() {
  windTime(60)
}, fSpeed, multiplier);
holdit(document.getElementById("a4r"), function() {
  windTime(600)
}, fSpeed, multiplier);
$("#ma1l").click(function() {
  windTime(-10)
});
$("#ma2l").click(function() {
  windTime(-60)
});
$("#ma1r").click(function() {
  windTime(10)
});
$("#ma2r").click(function() {
  windTime(60)
});
function windTime(c) {
  maxPT = $("#timeSlider").slider("option", "max");
  minPT = $("#timeSlider").slider("option", "min");
  replaying && (replaying = !1,
  continueReplaying = !0);
  var g = trevent.timetodraw + c;
  g > maxPT && (g = maxPT);
  0 > c && g < minPT && (g = minPT);
  null != trevent && g <= maxPT && g >= minPT && (trevent.setTimeToDraw(g) && (redrawMap(),
  trevent.updatenamelist(speedunit, "desktop" != appMode)),
  $("#timeSlider").slider("option", "value", g),
  updateTime())
}
function uiLiveReplay(c, g) {
  c ? (g && $("#liveStatus").addClass("liveMode").removeClass("onlyReplay"),
  $("#text").html('<span class="boldertext">' + Strings_LIVE[langu] + '</span>&nbsp;&nbsp;<span class="smallertext">' + Strings_REPLAY[langu] + "</span>"),
  $("#ball").css("background-color", "green"),
  $("#player").hide(),
  $("#btnShowPlayer").hide(),
  $("#map, #menu, #settingsMenu").css("height", "100%"),
  g && $("#liveStatus").show()) : (g && $("#liveStatus").hide(),
  "desktop" == appMode ? ($("#map, #menu, #settingsMenu").css("height", divHeights[1]),
  $("#player").show()) : ($("#btnShowPlayer").show(),
  $("#btnShowPlayer").hasClass("hidePlayer") && ($("#player").show(),
  $("#map").css("height", divHeights[0]))));
  map.invalidateSize(!1);
  null != canvasoverlay && canvasoverlay.redraw()
}
function initTooltip() {
  $(document).tooltip({
      items: "[owntitle]",
      content: function() {
          return $("#selCompName").is(":visible") ? "" : $(this).attr("owntitle")
      },
      position: {
          my: "desktop" == appMode ? "left top" : "right top",
          at: "desktop" == appMode ? "left+204 top" : "left+2304 top",
          collision: "flipfit"
      },
      show: {
          delay: 500
      }
  })
}
function drawingOnCanvas(c, g) {
  null != trevent.overlay && trevent.overlay.draw(c, g)
}
function detectIE() {
  var c = window.navigator.userAgent
    , g = c.indexOf("MSIE ");
  if (0 < g)
      return parseInt(c.substring(g + 5, c.indexOf(".", g)), 10);
  if (0 < c.indexOf("Trident/"))
      return g = c.indexOf("rv:"),
      parseInt(c.substring(g + 3, c.indexOf(".", g)), 10);
  g = c.indexOf("Edge/");
  return 0 < g ? parseInt(c.substring(g + 5, c.indexOf(".", g)), 10) : !1
}
$(document).ready(function() {
  hideallmenus && ($("#statusBox").hide(),
  $("#btnShowMenu").hide(),
  $("#btnShowSetMenu").hide(),
  $("#menu").hide());
  inIframe() || $("#newtaba").hide();
  var c = !1
    , g = 1;
  iswp = !1;
  (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i)) && !navigator.userAgent.match(/IEMobile/i) && (c = !0);
  navigator.userAgent.match(/ARM/) && navigator.userAgent.match(/Touch/) && navigator.userAgent.match(/Trident/) && (iswp = !0);
  (c || iswp) && $.ajax({
      type: "get",
      url: testEventPath + "data.php?map=1&factor=1" + (iswp ? "&wp=1" : "") + (issessioned ? "&GpsSeurantaSessionID=" + sessionid : ""),
      async: !1,
      cache: !1,
      error: function() {},
      success: function(p, d, m) {
          iniwidth = m.getResponseHeader("X-GPS-Server-Mapwidth");
          iniheight = m.getResponseHeader("X-GPS-Server-Mapheight");
          iniwidth || (iniwidth = 0);
          iniheight || (iniheight = 0);
          g = p
      }
  });
  c || initTooltip();
  var u = .1 == g;
  u && (g = 1);
  $("#rallySet").hide();
  $("#gpxuploadSet").hide();
  trevent = new Event(testEventPath,g,forceMapSystem);
  trevent.mapsystemset = function(p, d, m, f, q, h, t) {
      mapsystem = p;
      wgscenterpoint = {
          x: d,
          y: m
      };
      0 == mapsystem ? drawLeafletMap(u || 1 < g ? testEventPath + "data.php?map=1" + (iswp ? "&wp=1" : "") + (issessioned ? "&GpsSeurantaSessionID=" + sessionid : "") : testEventPath + "map" + (issessioned ? "?GpsSeurantaSessionID=" + sessionid : ""), iniwidth, iniheight, function(l) {
          spinner.stop()
      }) : (setMapSystem(p, wgscenterpoint, q, h, t),
      f && (canvasoverlay = L.canvasOverlay().drawing(drawingOnCanvas, 1 == p).addTo(map)),
      null != osmOverlay && osmOverlay.setOpacity(.7),
      $("#mapOpacitySlider").slider("value", 70),
      $("#showMO").html("Map opacity: 70 %"))
  }
  ;
  trevent.enablerallymode = function() {
      console.log("RALLY!");
      $("#rallySet").show();
      trevent.setRallymode(!0)
  }
  ;
  trevent.enablegpxuploadmode = function() {
      console.log("GPX!");
      $("#gpxlink").attr("href", "https://www.tulospalvelu.fi/gpxlogin/?eventID=" + eventId);
      $("#gpxuploadSet").show()
  }
  ;
  trevent.load_init();
  trevent.createnamelist = function(p, d) {
      timeshowdate = d;
      !iswp && detectIE() && $("#competitorCont").height(15E3);
      timeshowdate && $("#playDate").show();
      updatescalebar();
      0 < trevent.numberoflogos && initializelogos(trevent.numberoflogos);
      d = [];
      for (var m = [], f = [], q = [], h = 0; h < p.length; h++)
          d.push(p[h].letters),
          f.push(0),
          m.push(0),
          q.push(0),
          $("#competitorCont").append("<div id=compID" + h + " class=competitor> <div class=compSelect> <div class=checkboxFour> <input type=checkbox name=competitor class=compCb id=c" + h + " value=id" + h + "> <label for=c" + h + "></label> </div> </div> <div class=compNameHolder><div id=" + h + ' class=compName owntitle="' + p[h].name + "<br><b>" + p[h].letters + "</b>" + ("" == p[h].additionaldata ? "" : "<br>" + p[h].additionaldata) + '">' + p[h].name + "</div></div> <div class=compLet id=compLetters" + h + ">" + p[h].letters + "</div> <div id=compDI" + h + " class=compData><div class=cst id=cst" + h + ">" + p[h].starttimestring + "</div> " + (0 > p[h].currentspeed ? "?" : Number(p[h].currentspeed).toFixed(0)) + "&#8199;km/h " + Number(p[h].currentdistance / 1E3).toFixed(2) + "&#8199;km " + p[h].status + '</div><div id="compMenu' + h + '" class="cMenu"></div></div>'),
          $("#compMenu" + h).html(' <span id="selCompName">' + p[h].letters + '</span><br><span id="cen' + h + '" class="btnCompCenter">' + Strings_Center[langu] + '</span> <span id="ac' + h + '" class="btnAutoCompCenter">' + Strings_Autocenter_OFF[langu] + '</span> <br><span id="h' + h + '" class="btnCompHighLight"  title="CTRL+Click Name">' + Strings_Highlight_OFF[langu] + '</span> <span id="fr' + h + '" class="btnCompFullRoute">' + Strings_Full_route_OFF[langu] + '</span> <br><span id="ccol' + h + '" class="showColor">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span id="seluntil' + h + '" class="btnSelUntil">' + Strings_Check_above[langu] + "</span> "),
          $("#ccol" + h).css("background-color", p[h].color),
          $("#c" + h).change(function() {
              var t = $(this).attr("id").replace(/^\D+/g, "");
              1 == $(this).prop("checked") ? $(this).prop("checked", !0) : $(this).prop("checked", !1);
              trevent.toggleCheck(t, map, ismapvisible);
              eventIsLive && updatelivefromstarttime();
              splitsVisible && updateSplits();
              redrawMap()
          });
      trevent.updatenamelist(speedunit, "desktop" != appMode);
      $(".compName").click(function(t) {
          if (t.ctrlKey)
              t = Number($(this).attr("id")),
              0 == m[t] ? ($("#h" + t).addClass("btnCompHighLightOn").removeClass("btnCompHighLight").html("Highlight ON"),
              m[t] = 1,
              $("#" + t).css({
                  "font-weight": "bold"
              })) : ($("#h" + t).addClass("btnCompHighLight").removeClass("btnCompHighLightOn").html("Highlight OFF"),
              m[t] = 0,
              $("#" + t).css({
                  "font-weight": "normal"
              })),
              trevent.toggleHighlight(t, map, ismapvisible),
              redrawMap(),
              splitsVisible && updateSplits();
          else {
              t = "#" + $(this).attr("id");
              $(this).attr("id");
              t = $(t).position();
              var l = $("#competitorCont").height();
              $(document).height();
              t = "desktop" == appMode ? l + 60 - (t.top - 1) : l + 35 - (t.top - 1);
              $(".compSettingsCont").height();
              l = 50 < $("#compID" + $(this).attr("id")).height();
              null != compMenuVisible && hideCompMenu();
              if (!l) {
                  $("#compID" + $(this).attr("id")).height($("#compID" + $(this).attr("id")).height() + ("desktop" == appMode ? 70 : 90));
                  $("#compMenu" + $(this).attr("id")).show();
                  compMenuVisible = $("#compMenu" + $(this).attr("id"));
                  var v = $("#compID" + $(this).attr("id")).height();
                  t < v && $("#competitorCont").scrollTop($("#competitorCont").scrollTop() + (v - t))
              }
              compSettingsWindowVisible = !l
          }
      });
      $(".btnAutoCompCenter, .btnAutoCompCenterOn").click(function() {
          var t = $(this).attr("id").replace(/^\D+/g, "");
          0 == q[t] ? (setAll(q, 0),
          q[t] = 1,
          $(".btnAutoCompCenterOn").addClass("btnAutoCompCenter").removeClass("btnAutoCompCenterOn").html(Strings_Autocenter_OFF[langu]),
          $(this).addClass("btnAutoCompCenterOn").removeClass("btnAutoCompCenter").html(Strings_Autocenter_ON[langu]),
          $(".compName").css({
              "font-style": "normal"
          }),
          $("#" + t).css({
              "font-style": "italic"
          })) : (q[t] = 0,
          $(this).addClass("btnAutoCompCenter").removeClass("btnAutoCompCenterOn").html(Strings_Autocenter_OFF[langu]),
          $("#" + t).css({
              "font-style": "normal"
          }));
          trevent.toggleAutocenter(t)
      });
      $(".btnCompFullRoute, .btnCompFullRouteOn").click(function() {
          var t = $(this).attr("id").replace(/^\D+/g, "");
          0 == f[t] ? (f[t] = 1,
          $(this).addClass("btnCompFullRouteOn").removeClass("btnCompFullRoute").html(Strings_Full_route_ON[langu]),
          $("#" + t).css({
              "text-decoration": "underline"
          })) : (f[t] = 0,
          $(this).addClass("btnCompFullRoute").removeClass("btnCompFullRouteOn").html(Strings_Full_route_OFF[langu]),
          $("#" + t).css({
              "text-decoration": "none"
          }));
          trevent.toggleFullroute(t);
          redrawMap()
      });
      $(".btnCompHighLight, .btnCompHighLightOn").click(function() {
          var t = $(this).attr("id").replace(/^\D+/g, "");
          0 == m[t] ? (m[t] = 1,
          $(this).addClass("btnCompHighLightOn").removeClass("btnCompHighLight").html(Strings_Highlight_ON[langu]),
          $("#" + t).css({
              "font-weight": "bold"
          })) : (m[t] = 0,
          $(this).addClass("btnCompHighLight").removeClass("btnCompHighLightOn").html(Strings_Highlight_OFF[langu]),
          $("#" + t).css({
              "font-weight": "normal"
          }));
          trevent.toggleHighlight(t, map, ismapvisible);
          splitsVisible && updateSplits()
      });
      $(".btnCompCenter").click(function() {
          "mobile" == appMode && ($("#menuBtnContainerMobile").hide(),
          $("#menu").hide(),
          $("#statusBox").show(),
          playerStatus(),
          $("#menuBtnContainerMobile").removeClass("showMobileMenu"),
          $("#btnShowMenu").addClass("showMenu").removeClass("hideMenu"),
          ismapvisible = !0,
          mapbecamevisible());
          var t = $(this).attr("id").replace(/^\D+/g, "");
          trevent.centercompetitor(mapHeight, t)
      });
      $(".btnSelUntil").click(function() {
          var t = $(this).attr("id").replace(/^\D+/g, "");
          $("#competitorCont input:checkbox").prop("checked", !0);
          for (var l = 0; l <= t; l++)
              console.log("#c" + l),
              $("#c" + l).prop("checked", !1);
          trevent.checkUntil(t, map, ismapvisible);
          eventIsLive && updatelivefromstarttime();
          splitsVisible && updateSplits()
      });
      h = 0;
      $(".checkboxFour label").each(function() {
          $(this).css("background-color", p[h].color);
          compColArray.push(p[h].color);
          h += 1
      });
      $(".competitor").click(function() {
          isCompSelected = !0;
          $(".competitorSelected").each(function() {
              $(this).addClass("competitor").removeClass("competitorSelected")
          });
          $(this).addClass("competitorSelected").removeClass("competitor");
          var t = $(this).attr("id").replace(/^\D+/g, "")
            , l = p[t].getOffsetString();
          l = l.replace(/\+/g, "");
          $("#offBox").val(l);
          "" == compFullName && ($(".offsetContHolder").show(),
          $("#resetOff").show());
          compFullName = $("#" + t).text();
          compOffId = t;
          $(".showSelOffName").text(compFullName);
          $(".showSelOffID").text(compOffId)
      });
      $(".showColor").click(function() {
          pickCompIdForColor = $(this).attr("id").replace(/^\D+/g, "");
          var t = $(this).css("background-color");
          hexc(t);
          $("#compID" + pickCompIdForColor).find(".checkboxFour label").css("background-color", "#" + colo);
          $("#picker").colpickSetColor(colo, !0);
          $("#colorBox").toggle(0, function() {})
      });
      for (h = 0; h < p.length; h++)
          p[h].marker.addTo(map),
          p[h].path.addTo(map);
      d = "";
      for (h = 0; h < p.length; h++)
          d += "<option>" + p[h].name + "</option>";
      $("#diffFirstselect ").html(d);
      $("#diffBehindselect ").html(d);
      0 < p.length && ($("#diffFirstselect option:eq(0)").prop("selected", !0),
      diffcomp1 = $("#diffFirstselect").val(),
      diffcomp1nro = 0);
      1 < p.length && ($("#diffBehindselect option:eq(1)").prop("selected", !0),
      diffcomp2 = $("#diffBehindselect").val(),
      diffcomp2nro = 1)
  }
  ;
  trevent.data_added = function(p) {
      p || (updateTime(),
      spinner2.stop(),
      setTimeDifference(),
      hideLoadingBox(),
      trevent.addbuoys(map),
      appIsReady = !0,
      null != canvasoverlay && canvasoverlay.redraw());
      var d = trevent.getReplayMinTime()
        , m = trevent.getReplayMaxTime();
      m < d && (m = d);
      $("#timeSlider").slider("option", "max", m);
      $("#timeSlider").slider("option", "min", d);
      maxPT = $("#timeSlider").slider("option", "max");
      minPT = $("#timeSlider").slider("option", "min");
      p || ($("#timeSlider").slider("option", "value", d),
      eventIsLive && (myLiveAnimationReq = requestAnimationFrame(livetimer)));
      replaymode && !replaying && (redrawMap(),
      trevent.updatenamelist(speedunit, "desktop" != appMode));
      splitsVisible && updateSplits()
  }
  ;
  trevent.setLive = function(p, d) {
      livestartlocaltime = p.getTime() / 1E3;
      livestartrealtime = d;
      eventIsLive = !0;
      replaymode = !1;
      uiLiveReplay(eventIsLive, !0);
      map.contextmenu.setDisabled(2, !0)
  }
  ;
  trevent.showLoading = showLoadingBox;
  trevent.updateLoading = updateLoadingBox;
  trevent.hideLoading = hideLoadingBox;
  trevent.updatecompinfo = function(p, d) {
      $("#compDI" + p).html(d)
  }
  ;
  trevent.updateroglist = updateRog;
  trevent.enablerog = enablerog;
  trevent.setdefaulttail = updateTailBox2;
  $("#sectorroutescb").prop("checked", !1);
  $("#sectorcolorcb").prop("checked", !1);
  $("#sectorcolorcb").prop("disabled", !0);
  trevent.initialiseMarkersizes($("#markerSizeSlider").slider("option", "value"), $("#markerLetSlider").slider("option", "value"), $("#lineWidthSlider").slider("option", "value"), $("#lineOpacitySlider").slider("option", "value") / 100)
});
function setoneclickmassstart(c, g) {
  if (replaymode) {
      var u = g;
      0 == trevent.mapsystem && (u = mapHeight - g);
      c = trevent.setoneclickmassstart(c, u);
      replaying = !1;
      1E20 > c && (trevent.setTimeToDraw(c),
      $("#timeSlider").slider("option", "value", c),
      updateTime(),
      redrawMap(),
      trevent.updatenamelist(speedunit, "desktop" != appMode),
      updateOffsetStuff());
      c = $(".showSelOffID").text();
      "" != c && (c = c.replace(/^\D+/g, ""),
      c = trevent.tracks[c].getOffsetString(),
      c = c.replace(/\+/g, ""),
      $("#offBox").val(c))
  }
}
function zoomstarted() {
  iszooming = !0
}
function updatescalebar() {
  if (null != trevent) {
      iszooming = !1;
      var c = trevent.getmperpixel()
        , g = map.containerPointToLatLng(L.point(0, 0))
        , u = map.containerPointToLatLng(L.point(0, 100));
      c /= 0 < trevent.mapsystem ? 100 / (111319.9 * (g.lat - u.lat)) : Math.pow(1E4 / (Math.pow(g.lat - u.lat, 2) + Math.pow(g.lng - u.lng, 2)), .5);
      g = 0;
      u = 45 * c;
      for (i = 0; 100 > i; i++) {
          var p = Math.pow(10, i);
          if (1 * p > u) {
              g = 1 * p;
              break
          }
          if (2 * p > u) {
              g = 2 * p;
              break
          }
          if (3 * p > u) {
              g = 3 * p;
              break
          }
          if (5 * p > u) {
              g = 5 * p;
              break
          }
      }
      if (0 < g) {
          p = 1 * g / c;
          u = Math.round(p);
          p = Math.round((100 - p - 4) / 2);
          var d = g + " m";
          999 < g && (d = g / 1E3 + " km");
          $("#scaleline").css("width", u + "px");
          $("#scaleline").css("left", p + "px");
          $("#scaleline").text(d)
      }
      null != trevent && trevent.resizesplitpoints(c);
      null != splitcandidate && splitcandidate.marker.options.icon.setsize(2 * splitcandidate.radiusmeters / c)
  }
}
function showLoadingBox() {
  $("#loadingBox").html(Strings_loading_data[langu]);
  $("#loadingBox").show(0, function() {})
}
function hideLoadingBox() {
  $("#loadingBox").hide(0, function() {})
}
function updateLoadingBox(c) {
  $("#loadingBox").html(c)
}
function initializelogos(c) {
  for (i = 1; i < c + 1; i++)
      logos.push(new Logo(testEventPath + "logo" + i + (issessioned ? "?GpsSeurantaSessionID=" + sessionid : ""))),
      console.log(testEventPath + "logo" + i);
  setTimeout("changelogo(true)", 5E3)
}
function changelogo(c) {
  "desktop" == appMode && logotoshow < logos.length && 0 < logos[logotoshow].logowidth ? ($(".leaflet-bottom.leaflet-right").html('<img src="' + logos[logotoshow].url + '">'),
  $(".leaflet-bottom.leaflet-right").css("margin-bottom", "0px"),
  $(".leaflet-bottom.leaflet-right").css("line-height", "0")) : ($(".leaflet-bottom.leaflet-right").html('<div class="leaflet-control-attribution leaflet-control"><a href="http://leafletjs.com" >Leaflet</a> |\ufffd' + attributionText + "</div>"),
  $(".leaflet-bottom.leaflet-right").css("margin-right", "0px"),
  $(".leaflet-bottom.leaflet-right").css("line-height", "1.5"));
  logotoshow++;
  logotoshow > logos.length && (logotoshow = 0);
  c && setTimeout("changelogo(true)", 15E3)
}
function setAll(c, g) {
  var u, p = c.length;
  for (u = 0; u < p; ++u)
      c[u] = g
}
function Logo(c) {
  this.logoheight = this.logowidth = 0;
  this.logo = new Image;
  this.url = c;
  var g = this;
  g.logo.onload = function() {
      g.logowidth = g.logo.width;
      g.logoheight = g.logo.height
  }
  ;
  this.logo.src = c
}
function mapbecamevisible() {
  null != trevent && (trevent.updatemarkers(map),
  redrawMap())
}
function markcmenupoint(c) {
  contextmenumarker.setLatLng(c);
  contextmenumarker.addTo(map)
}
function hidecmenupoint() {
  map.removeLayer(contextmenumarker)
}
function startsplitline(c) {
  null == splitlinecandidate ? (splitlinecandidate = (new L.polyline([c, c],{
      contextmenu: !0,
      clickable: !1,
      pointerEvents: "none",
      color: "red",
      weight: 10,
      opacity: .4
  })).addTo(map),
  splitlinecandidate2 = (new L.polyline([c, c],{
      contextmenu: !0,
      clickable: !1,
      pointerEvents: "none",
      color: "black",
      weight: 2,
      opacity: 1
  })).addTo(map)) : (splitlinecandidate.setLatLngs([c, c]),
  splitlinecandidate2.setLatLngs([c, c]));
  isdrawingsline = !0
}
function endsplitline(c) {
  splitlinecandidate.setLatLngs([splitlinecandidate.getLatLngs()[0], c]);
  splitlinecandidate2.setLatLngs([splitlinecandidate.getLatLngs()[0], c]);
  isdrawingsline = !1;
  $("#newsplitname").val(trevent.nextsplitid);
  $("#newsplitorderselect").html(trevent.getsplitpointlist(!0, !1));
  $("#newsplitorderselect option:last").attr("selected", "selected");
  nsdialog.dialog("option", "title", Strings_New_split_line[langu]);
  nsdialog.dialog("open");
  $("#newpointsubmit").focus()
}
function addsplitpoint(c) {
  if (null != trevent) {
      var g = trevent.getmperpixel()
        , u = map.containerPointToLatLng(L.point(0, 0))
        , p = map.containerPointToLatLng(L.point(0, 100));
      g /= 0 < trevent.mapsystem ? 100 / (111319.9 * (u.lat - p.lat)) : Math.pow(1E4 / (Math.pow(u.lat - p.lat, 2) + Math.pow(u.lng - p.lng, 2)), .5);
      null != splitcandidate && (map.removeLayer(splitcandidate.marker),
      splitcandidate = null);
      splitcandidate = new splitline;
      splitcandidate.x1 = c.lng;
      splitcandidate.y1 = c.lat;
      splitcandidate.radiusmeters = prevsplitpointradius;
      splitcandidate.ispoint = !0;
      splitcandidate.id = trevent.nextsplitid;
      splitcandidate.marker = (new L.Marker(c,{
          contextmenu: !0,
          clickable: !1,
          zIndexOffset: 1E6,
          icon: new L.NumberedDivIcon2({
              color: "purple",
              blackshadow: !1,
              number: splitcandidate.id,
              size: 2 * splitcandidate.radiusmeters / g,
              lsize: 14
          })
      })).addTo(map);
      $("#newsplitname").val(splitcandidate.id);
      $("#newsplitradiusselect").val(prevsplitpointradius);
      $("#newsplitorderselect").html(trevent.getsplitpointlist(!0, !1));
      $("#newsplitorderselect option:last").attr("selected", "selected");
      nsdialog.dialog("option", "title", Strings_New_split_point[langu]);
      nsdialog.dialog("open");
      $("#newpointsubmit").focus()
  }
}
function savesplitpoint() {
  var c = trevent.getmperpixel()
    , g = map.containerPointToLatLng(L.point(0, 0))
    , u = map.containerPointToLatLng(L.point(0, 100));
  c /= 0 < trevent.mapsystem ? 100 / (111319.9 * (g.lat - u.lat)) : Math.pow(1E4 / (Math.pow(g.lat - u.lat, 2) + Math.pow(g.lng - u.lng, 2)), .5);
  trevent.addsplitpoint(L.latLng(splitcandidate.y1, splitcandidate.x1), splitcandidate.radiusmeters, splitlgroup, c, $("#newsplitname").val(), $("#newsplitorderselect").val());
  $("#chooseSpointselect ").html(trevent.getsplitpointlist(!1, !1));
  $("#chooseSpointselect option:last").attr("selected", "selected");
  $("#chooseS1pointselect ").html(trevent.getsplitpointlist(!1, !0));
  $("#chooseS1pointselect option:first").attr("selected", "selected");
  $("#chooseS2pointselect ").html(trevent.getsplitpointlist(!1, !1));
  $("#chooseS2pointselect option:last").attr("selected", "selected");
  checkandhidelaps();
  updateSplitIgnore();
  $("#splitsettingscb").button("option", "disabled", !1);
  splitsVisible && updateSplits()
}
function definepredefsplitpoints() {
  var c = trevent.getmperpixel()
    , g = map.containerPointToLatLng(L.point(0, 0))
    , u = map.containerPointToLatLng(L.point(0, 100));
  c /= 0 < trevent.mapsystem ? 100 / (111319.9 * (g.lat - u.lat)) : Math.pow(1E4 / (Math.pow(g.lat - u.lat, 2) + Math.pow(g.lng - u.lng, 2)), .5);
  for (i67 = 0; i67 < trevent.predefc.length; i67++)
      trevent.addsplitpoint(L.latLng(mapHeight - trevent.predefc[i67].y, trevent.predefc[i67].x), trevent.predefcradius, splitlgroup, c, i67 + 1 + "", trevent.splitlines.length);
  $("#chooseSpointselect ").html(trevent.getsplitpointlist(!1, !1));
  $("#chooseSpointselect option:last").attr("selected", "selected");
  $("#chooseS1pointselect ").html(trevent.getsplitpointlist(!1, !0));
  $("#chooseS1pointselect option:first").attr("selected", "selected");
  $("#chooseS2pointselect ").html(trevent.getsplitpointlist(!1, !1));
  $("#chooseS2pointselect option:last").attr("selected", "selected");
  checkandhidelaps();
  updateSplitIgnore();
  $("#splitsettingscb").button("option", "disabled", !1);
  splitsVisible && updateSplits()
}
function savesplitline() {
  trevent.addsplitline(splitlinecandidate, splitlgroup, $("#newsplitname").val(), $("#newsplitorderselect").val());
  $("#chooseSpointselect ").html(trevent.getsplitpointlist(!1, !1));
  $("#chooseSpointselect option:last").attr("selected", "selected");
  $("#chooseS1pointselect ").html(trevent.getsplitpointlist(!1, !0));
  $("#chooseS1pointselect option:first").attr("selected", "selected");
  $("#chooseS2pointselect ").html(trevent.getsplitpointlist(!1, !1));
  $("#chooseS2pointselect option:last").attr("selected", "selected");
  checkandhidelaps();
  $("#splitsettingscb").button("option", "disabled", !1);
  updateSplitIgnore();
  splitsVisible && updateSplits()
}
function inIframe() {
  try {
      return window.self !== window.top
  } catch (c) {
      return !0
  }
}
$(function() {
  $("#setMenuTabs").tabs({
      activate: function(c, g) {
          1 == $("#setMenuTabs").tabs("option", "active") ? (splitsVisible = !0,
          updateSplits()) : splitsVisible = !1
      },
      disabled: [4]
  })
});
function Piste(c, g) {
  this.x = c;
  this.y = g
}
function gsacourse(c, g) {
  this.maxdeltam = 9E4;
  this.reallength = this.scaledlength = 0;
  this.maxhe = -999999999;
  this.minhe = 999999999;
  this.profilepoints = [];
  this.segments = [];
  this.segmentids = [];
  this.segmentstarts = [];
  this.fullcourse = [];
  this.cal = g;
  this.speed = 5.6;
  this.timelimitforestimates = 999999999;
  this.metersperpixel = 1;
  this.useestimateddistances = !1;
  this.debug = !0;
  this.getdistance = getdistance;
  this.getsimplecoursedistance = getsimplecoursedistance;
  c = c.split("\n");
  this.debug && console.log(c.length + "rows");
  for (i = 0; i < c.length; i++)
      if (g = c[i].split(":"),
      "DISTANCE" == g[0])
          this.scaledlength = g[1];
      else if ("SEGMENTS" == g[0])
          for (g = g[1].split("|"),
          i2 = 0; i2 < g.length; i2++)
              this.segmentids.push(g[i2]);
      else
          "SPEED" == g[0] ? this.speed = g[1] : "MAXDELTA" == g[0] ? (g = g[1],
          this.maxdeltam = g * g) : "TIMELIMIT" == g[0] ? this.timelimitforestimates = g[1] : "ESTDIST" == g[0] ? this.useestimateddistances = !0 : 0 === c[i].lastIndexOf("[", 0) ? (g = c[i].substring(1, c[i].length - 1),
          g = new gsacoursesegment(g,this.cal),
          this.segments.push(g)) : 0 < this.segments.length && this.segments[this.segments.length - 1].addpoint(c[i]);
  for (i = this.reallength = 0; i < this.segmentids.length; i++)
      for (j = 0; j < this.segments.length; j++)
          if (this.segmentids[i] == this.segments[j].id) {
              this.reallength += this.segments[j].truelength;
              break
          }
  c = 0;
  g = this.scaledlength / this.reallength;
  for (j = 0; j < this.segments.length; j++)
      this.segments[j].scaleall(g);
  for (i = 0; i < this.segmentids.length; i++)
      for (this.segmentstarts.push(c),
      j = 0; j < this.segments.length; j++)
          if (this.segmentids[i] == this.segments[j].id) {
              c += this.segments[j].scaledlength;
              for (k = 0; k < this.segments[j].points.length; k++)
                  (0 < k || 0 == i) && this.fullcourse.push({
                      x: this.segments[j].points[k].mapx,
                      y: this.segments[j].points[k].mapy,
                      z: this.segments[j].points[k].height,
                      d: this.segmentstarts[i] + this.segments[j].points[k].scaleddistance
                  }),
                  this.profilepoints.push(new Piste(this.segmentstarts[i] + this.segments[j].points[k].scaleddistance,this.segments[j].points[k].height)),
                  this.segments[j].points[k].height > this.maxhe && (this.maxhe = this.segments[j].points[k].height),
                  this.segments[j].points[k].height < this.minhe && (this.minhe = this.segments[j].points[k].height);
              break
          }
  this.debug && (console.log("m " + this.reallength),
  console.log("p " + this.fullcourse.length))
}
function getsimplecoursedistance(c, g, u, p, d, m, f, q, h) {
  var t = p;
  0 > t && (t = 0);
  for (t > this.fullcourse.length - 1 && (t = this.fullcourse.length - 1); 0 < t && this.fullcourse[t].d > u - 100; )
      t--;
  var l = p;
  0 > l && (l = 0);
  l > this.fullcourse.length - 1 && (l = this.fullcourse.length - 1);
  for (p = u + 10 * (d - m) * this.speed; l < this.fullcourse.length - 2 && this.fullcourse[l].d < p; )
      l++;
  var v = -1;
  p = -1;
  for (k11 = t; k11 < l; k11++) {
      t = this.fullcourse[k11].x;
      var w = this.fullcourse[k11].y
        , y = this.fullcourse[k11 + 1].x - t
        , A = this.fullcourse[k11 + 1].y - w
        , C = 0;
      if (0 != y || 0 != A)
          C = ((c - t) * y + (g - w) * A) / (y * y + A * A);
      1 < C && (C = 1);
      0 > C && (C = 0);
      dist = Math.pow(c - (t + C * y), 2) + Math.pow(g - (w + C * A), 2);
      if (-1 == v || v > dist)
          v = dist,
          p = this.fullcourse[k11].d + C * (this.fullcourse[k11 + 1].d - this.fullcourse[k11].d)
  }
  c = !1;
  g = -1;
  u < this.scaledlength && p > this.scaledlength - 1 && f > .3 * this.scaledlength && (c = !0,
  0 < q && (g = m + (this.scaledlength - u) / (q / 3.6)),
  -1 == g || g > d) && (g = d);
  "t611" == h && console.log(d + " " + p);
  return {
      d: p,
      f: c,
      ft: g
  }
}
function getdistance(c, g, u, p, d, m, f, q, h, t) {
  q = 9999999999;
  p = -1;
  u = this.maxdeltam / (this.metersperpixel * this.metersperpixel);
  for (i6 = 0; i6 < this.segments.length; i6++)
      t = this.segments[i6].getnearestdisttopoint(c, g),
      t < q && (q = t,
      p = i6);
  c = d - m * this.speed;
  if (60 < h && c > h * this.speed * 10 || 60.1 > h && c > h * this.speed * 20)
      c = h * this.speed;
  for (j = 0; j < this.segmentstarts.length; j++)
      for (k = 0; k < this.segments.length; k++)
          if (this.segmentids[j] == this.segments[k].id) {
              g = this.segmentstarts[j] + this.segments[k].nearestdist;
              m = Math.abs(g - (this.useestimateddistances ? h * this.speed : f) / this.reallength * this.scaledlength);
              h > this.timelimitforestimates && (m = Math.abs(g - c));
              m < this.segments[k].totaldistancedelta && (this.segments[k].totaldistanceehdokas = g,
              this.segments[k].totaldistancedelta = m,
              this.segments[k].predictiondiff = Math.abs(c - g),
              g < d && (this.segments[k].predictiondiff *= 2),
              this.segments[k].firstorlast && 1E-6 < g && g < this.scaledlength - 1E-5 && (this.segments[k].predictiondiff = 10 * Math.abs(c - g)));
              break
          }
  d = this.segments[p].totaldistanceehdokas;
  f = this.segments[p].predictiondiff;
  for (k = 0; k < this.segments.length; k++)
      this.segments[k].deltafromsegment < u && this.segments[k].predictiondiff < f && (d = this.segments[k].totaldistanceehdokas,
      f = this.segments[k].predictiondiff);
  if (500 < f)
      for (u *= 4,
      k = 0; k < this.segments.length; k++)
          this.segments[k].deltafromsegment < u && this.segments[k].predictiondiff < f && (d = this.segments[k].totaldistanceehdokas,
          f = this.segments[k].predictiondiff);
  f = 999999999;
  if (60 < h && d > h * this.speed * 10 || 60.1 > h && d > h * this.speed * 50)
      for (k = 0; k < this.segments.length; k++)
          (60 < h && this.segments[k].totaldistanceehdokas < h * this.speed * 10 || 60.1 > h && this.segments[k].totaldistanceehdokas < h * this.speed * 50) && this.segments[k].predictiondiff < f && (d = this.segments[k].totaldistanceehdokas,
          f = this.segments[k].predictiondiff);
  return d
}
function gsacoursewaypoint() {
  this.mapy = this.mapx = this.scaleddistance = this.truedistance = this.height = this.lat = this.lon = 0
}
function gsacoursesegment(c, g) {
  this.scaledlength = this.truelength = 0;
  this.id = c;
  this.calibration = g;
  this.points = [];
  this.nearestdist = 0;
  this.firstorlast = !1;
  this.totaldistanceehdokas = this.deltayfornearest = this.deltaxfornearest = 0;
  this.predictiondiff = this.deltafromsegment = this.totaldistancedelta = 999999999;
  this.addpoint = addcoursepoint;
  this.scaleall = scaleall;
  this.getnearestdisttopoint = getnearestdisttopoint
}
function addcoursepoint(c) {
  var g = c.split("|");
  if (2 < g.length) {
      c = new gsacoursewaypoint;
      c.lon = g[0] / 1E5;
      c.lat = g[1] / 1E5;
      c.height = g[2];
      c.mapx = this.calibration.getmapx(c.lon, c.lat);
      c.mapy = this.calibration.getmapy(c.lon, c.lat);
      g = this.points.length;
      if (0 < g) {
          var u = this.calibration.GetDistance2(this.points[g - 1].lon, this.points[g - 1].lat, c.lon, c.lat);
          c.truedistance = this.points[g - 1].truedistance + u;
          c.scaleddistance = c.truedistance
      }
      this.points[g] = c;
      this.truelength = this.points[g].truedistance
  }
}
function scaleall(c) {
  for (i = 0; i < this.points.length; i++)
      this.points[i].scaleddistance = this.points[i].truedistance * c;
  this.scaledlength = this.truelength * c
}
function getnearestdisttopoint(c, g) {
  this.firstorlast = !1;
  var u = -1;
  this.totaldistanceehdokas = 0;
  this.predictiondiff = this.totaldistancedelta = 999999999;
  var p = -99999999;
  if (1 < this.points.length) {
      for (n = 1; n < this.points.length; n++) {
          var d = this.points[n - 1].mapx;
          var m = this.points[n - 1].mapy
            , f = this.points[n].mapx - d
            , q = this.points[n].mapy - m
            , h = 0;
          if (0 != f || 0 != q)
              h = ((c - d) * f + (g - m) * q) / (f * f + q * q);
          1 < h && (h = 1);
          0 > h && (h = 0);
          d = Math.pow(c - (d + h * f), 2) + Math.pow(g - (m + h * q), 2);
          if (-1 == u || u > d)
              u = d,
              p = this.points[n - 1].scaleddistance + h * (this.points[n].scaleddistance - this.points[n - 1].scaleddistance),
              this.deltaxfornearest = this.points[n].mapx - this.points[n - 1].mapx,
              this.deltayfornearest = this.points[n].mapy - this.points[n - 1].mapy
      }
      this.nearestdist = p;
      this.deltafromsegment = u;
      if (1E-6 > this.nearestdist || this.nearestdist > this.scaledlength - 1E-6)
          this.firstorlast = !0;
      return u
  }
  this.nearestdist = 0;
  return 999999999
}
;
