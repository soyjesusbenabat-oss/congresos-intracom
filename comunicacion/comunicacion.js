/* Propuesta para asociaciones de comunicación: menú, hilo del recorrido y demostraciones por pasos. */
(function () {
  "use strict";
  var reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Menú
  var nav = document.getElementById("nav");
  var enlaces = document.getElementById("navLinks");
  var boton = document.getElementById("navToggle");
  function sombra() { nav.classList.toggle("scrolled", window.scrollY > 14); }
  window.addEventListener("scroll", sombra, { passive: true });
  sombra();
  boton.addEventListener("click", function () { enlaces.classList.toggle("open"); });
  enlaces.addEventListener("click", function (e) { if (e.target.closest("a")) enlaces.classList.remove("open"); });

  // QR decorativo: no codifica nada
  function qr(semilla, n) {
    var x = semilla, celdas = [];
    function azar() { x = (x * 1103515245 + 12345) & 0x7fffffff; return x / 0x7fffffff; }
    var zonas = [[0, 0], [0, n - 7], [n - 7, 0]];
    function enBuscador(f, c) {
      return zonas.some(function (z) { var df = f - z[0], dc = c - z[1]; return df >= -1 && df <= 7 && dc >= -1 && dc <= 7; });
    }
    for (var f = 0; f < n; f++) for (var c = 0; c < n; c++) if (!enBuscador(f, c) && azar() > 0.52) celdas.push("M" + c + " " + f + "h1v1h-1z");
    var marcas = zonas.map(function (z) {
      return "M" + z[1] + " " + z[0] + "h7v7h-7zM" + (z[1] + 1) + " " + (z[0] + 1) + "v5h5v-5zM" + (z[1] + 2) + " " + (z[0] + 2) + "h3v3h-3z";
    }).join("");
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 ' + (n + 2) + " " + (n + 2) + '" shape-rendering="crispEdges"><path fill-rule="evenodd" fill="#003871" d="' + marcas + celdas.join("") + '"/></svg>';
    return 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")';
  }
  document.querySelectorAll(".qr").forEach(function (el) { el.style.setProperty("--qr", qr(20270312, 25)); });

  // Texto que se escribe solo
  function escribir(el) {
    var texto = el.dataset.texto || "", i = 0;
    var retraso = Number(el.dataset.retraso || 300);
    el.textContent = "";
    el.classList.remove("listo");
    if (reducido) { el.textContent = texto; el.classList.add("listo"); return function () {}; }
    var t2, t1 = setTimeout(function paso() {
      el.textContent = texto.slice(0, ++i);
      if (i < texto.length) t2 = setTimeout(paso, 24 + Math.random() * 34);
      else el.classList.add("listo");
    }, retraso);
    return function () { clearTimeout(t1); clearTimeout(t2); el.textContent = texto; el.classList.add("listo"); };
  }

  // Demostración por pasos
  function Demo(raiz) {
    this.raiz = raiz;
    this.pasos = Number(raiz.dataset.pasos);
    this.tiempos = raiz.dataset.tiempos.split(",").map(Number);
    this.paso = 0;
    this.enPausa = reducido;
    this.visible = false;
    this.temporizador = null;
    this.paradas = [];
    this.items = raiz.querySelectorAll(".demo__pasos li");
    this.botonPausa = raiz.querySelector('[data-accion="pausa"]');
    var self = this;
    raiz.querySelector(".demo__mandos").addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      if (b.dataset.accion === "pausa") self.alternar();
      else if (b.dataset.accion === "siguiente") self.ir(self.paso % self.pasos + 1);
      else self.ir((self.paso + self.pasos - 2) % self.pasos + 1);
    });
    this.rotular();
  }
  Demo.prototype.ir = function (n) {
    var self = this;
    clearTimeout(this.temporizador);
    this.paradas.forEach(function (p) { p(); });
    this.paradas = [];
    this.paso = n;
    // Reiniciar las animaciones CSS del paso
    this.raiz.removeAttribute("data-paso");
    void this.raiz.offsetWidth;
    this.raiz.setAttribute("data-paso", String(n));
    this.items.forEach(function (li, i) {
      li.classList.toggle("hecho", i + 1 < n);
      li.classList.toggle("activo", i + 1 === n);
    });
    var capa = this.raiz.querySelector(".capa--p" + n);
    if (capa) capa.querySelectorAll(".escribe").forEach(function (el) { self.paradas.push(escribir(el)); });
    this.programar();
  };
  Demo.prototype.programar = function () {
    var self = this;
    clearTimeout(this.temporizador);
    if (this.enPausa || !this.visible) return;
    this.temporizador = setTimeout(function () { self.ir(self.paso % self.pasos + 1); }, this.tiempos[this.paso - 1] || 4000);
  };
  Demo.prototype.alternar = function () {
    this.enPausa = !this.enPausa;
    this.rotular();
    if (this.enPausa) clearTimeout(this.temporizador); else this.programar();
  };
  Demo.prototype.rotular = function () {
    this.botonPausa.textContent = this.enPausa ? "Reanudar" : "Pausar";
    this.botonPausa.setAttribute("aria-pressed", String(this.enPausa));
  };
  Demo.prototype.mostrar = function (si) {
    this.visible = si;
    if (si) { if (!this.paso) this.ir(1); else this.programar(); }
    else clearTimeout(this.temporizador);
  };

  var demos = [];
  document.querySelectorAll(".demo").forEach(function (el) { demos.push(new Demo(el)); });
  if ("IntersectionObserver" in window) {
    var verDemo = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        var d = demos.filter(function (x) { return x.raiz === en.target; })[0];
        d.mostrar(en.isIntersecting && !document.hidden);
      });
    }, { threshold: 0.4 });
    demos.forEach(function (d) { verDemo.observe(d.raiz); });

    // Hilo del recorrido: marca el capítulo que se está viendo
    var hilo = document.getElementById("hilo");
    var marcas = Array.prototype.slice.call(hilo.querySelectorAll("a"));
    var verCapitulo = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (!en.isIntersecting) return;
        var indice = -1;
        marcas.forEach(function (a, i) { if (a.getAttribute("href") === "#" + en.target.id) indice = i; });
        marcas.forEach(function (a, i) {
          a.classList.toggle("activo", i === indice);
          a.classList.toggle("hecho", i < indice);
        });
        var a = marcas[indice];
        if (a) hilo.scrollTo({ left: a.offsetLeft - 16, behavior: reducido ? "auto" : "smooth" });
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    demos.forEach(function (d) { verCapitulo.observe(d.raiz); });
  } else demos.forEach(function (d) { d.mostrar(true); });
  document.addEventListener("visibilitychange", function () {
    demos.forEach(function (d) { if (document.hidden) clearTimeout(d.temporizador); else if (d.paso) d.programar(); });
  });
})();
