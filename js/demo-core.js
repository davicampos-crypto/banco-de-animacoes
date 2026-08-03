/* ============================================================
   DEMO CORE — utilitários compartilhados entre os apps de
   framework (React, Vue, Svelte). Mesmo contrato do main.js:
   dedent, ctx com teardown, injeção de CSS por item, highlight.
   ============================================================ */
(function () {
  'use strict';

  var CATS = [
    { id: 'entrada',  nome: 'Entrada / Reveal',      desc: 'Elementos aparecendo ao entrar na viewport.' },
    { id: 'scroll',   nome: 'Scroll-driven',         desc: 'Movimento amarrado à posição da rolagem.' },
    { id: 'hover',    nome: 'Hover & micro',         desc: 'Resposta imediata ao cursor e ao clique.' },
    { id: 'texto',    nome: 'Tipografia',            desc: 'Texto como matéria-prima da animação.' },
    { id: 'loaders',  nome: 'Loaders & transições',  desc: 'Estados de espera e troca de página.' },
    { id: 'nav',      nome: 'Navegação & UI',        desc: 'Menus, modais, abas, carrosséis.' },
    { id: 'fundos',   nome: 'Fundos & ambiente',     desc: 'Atmosfera: gradientes, partículas, ruído.' },
    { id: 'estado',   nome: 'Estado & feedback',     desc: 'Formulários, ações, listas, sucesso e erro.' },
    { id: 'dados',    nome: 'Dados & gráficos',      desc: 'Números que se movem com intenção.' },
    { id: 'avancado', nome: 'Avançado / WOW',        desc: 'Canvas, física, shaders caseiros, 3D.' }
  ];

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  var RE = new RegExp(
    '(\\/\\*[\\s\\S]*?\\*\\/|\\/\\/[^\\n]*|&lt;!--[\\s\\S]*?--&gt;)' +
    '|("[^"\\n]*"|\'[^\'\\n]*\'|`[^`]*`)' +
    '|\\b(const|let|var|function|return|if|else|for|of|in|new|class|this|null|true|false|async|await|typeof)\\b' +
    '|(@[a-z-]+|:[a-z-]+(?=\\s*\\{)|\\.[a-zA-Z][\\w-]*(?=[\\s,{:.>#\\[]))' +
    '|(-?\\d+\\.?\\d*(?:px|s|ms|deg|%|em|rem|vh|vw|fr)?)',
    'g'
  );
  function hl(src) {
    return esc(src).replace(RE, function (m, c, s, k, p, n) {
      if (c) return '<span class="tk-c">' + c + '</span>';
      if (s) return '<span class="tk-s">' + s + '</span>';
      if (k) return '<span class="tk-k">' + k + '</span>';
      if (p) return '<span class="tk-p">' + p + '</span>';
      if (n) return '<span class="tk-n">' + n + '</span>';
      return m;
    });
  }

  function dedent(s) {
    if (!s) return '';
    var lines = String(s).replace(/\t/g, '  ').split('\n');
    while (lines.length && !lines[0].trim()) lines.shift();
    while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
    var min = 1e9;
    lines.forEach(function (l) {
      if (!l.trim()) return;
      min = Math.min(min, l.match(/^ */)[0].length);
    });
    if (min === 1e9) min = 0;
    return lines.map(function (l) { return l.slice(min); }).join('\n');
  }

  function jsSource(fn) {
    if (!fn) return '';
    var s = fn.toString();
    var i = s.indexOf('{');
    return dedent(s.slice(i + 1, s.lastIndexOf('}')));
  }

  function makeCtx() {
    var rafs = [], timers = [], offs = [], dead = false;
    return {
      loop: function (fn) {
        var id;
        var tick = function (t) { if (dead) return; fn(t); id = requestAnimationFrame(tick); rafs[rafs.length - 1] = id; };
        rafs.push(0); id = requestAnimationFrame(tick); rafs[rafs.length - 1] = id;
      },
      raf: function (fn) { var id = requestAnimationFrame(fn); rafs.push(id); return id; },
      wait: function (fn, ms) { var id = setTimeout(fn, ms); timers.push(id); return id; },
      every: function (fn, ms) { var id = setInterval(fn, ms); timers.push(id); return id; },
      on: function (el, ev, fn, opt) {
        el.addEventListener(ev, fn, opt);
        offs.push(function () { el.removeEventListener(ev, fn, opt); });
      },
      clean: function (fn) { offs.push(fn); },
      kill: function () {
        dead = true;
        rafs.forEach(cancelAnimationFrame);
        timers.forEach(function (t) { clearTimeout(t); clearInterval(t); });
        offs.forEach(function (f) { f(); });
        rafs = []; timers = []; offs = [];
      }
    };
  }

  /* injeção global de CSS por item, uma vez só */
  var sheet = null, injected = {};
  function injectCSS(item) {
    if (injected[item.id] || !item.css) return;
    injected[item.id] = 1;
    if (!sheet) { sheet = document.createElement('style'); document.head.appendChild(sheet); }
    sheet.appendChild(document.createTextNode('\n/* ' + item.id + ' */\n' + dedent(item.css) + '\n'));
  }

  /** monta a demo de um item dentro do elemento .stage; retorna função de teardown */
  function mountDemo(stage, item) {
    var host = document.createElement('div');
    host.className = 'demo-host';
    host.style.cssText = 'width:100%;height:100%;display:flex;align-items:center;justify-content:center';
    if (item.stage && item.stage.indexOf('flush') > -1) host.style.display = 'block';
    if (item.stage && item.stage.indexOf('scroll') > -1) host.style.cssText = 'width:100%;display:block';
    injectCSS(item);
    host.innerHTML = dedent(item.html || '');
    stage.appendChild(host);
    if (item.stage && item.stage.indexOf('scroll') > -1) stage.scrollTop = 0;
    var ctx = makeCtx();
    try { if (item.js) item.js(host, ctx); }
    catch (e) { console.error('[' + item.id + ']', e); }
    return function () {
      ctx.kill();
      if (host.parentNode) host.parentNode.removeChild(host);
    };
  }

  /** partes de código exibíveis de um item: [{k:'HTML',v:...},...] */
  function codeParts(item) {
    var parts = [];
    if (item.html) parts.push({ k: 'HTML', v: dedent(item.html) });
    if (item.css) parts.push({ k: 'CSS', v: dedent(item.css) });
    if (item.js) parts.push({ k: 'JS', v: jsSource(item.js) });
    return parts;
  }

  window.DemoCore = {
    CATS: CATS, esc: esc, hl: hl, dedent: dedent, jsSource: jsSource,
    makeCtx: makeCtx, injectCSS: injectCSS, mountDemo: mountDemo, codeParts: codeParts
  };
})();
