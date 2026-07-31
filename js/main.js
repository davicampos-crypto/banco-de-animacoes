/* ============================================================
   ANIM.DB — engine
   Monta/desmonta demos sob demanda, filtra, e exibe o código
   REAL que está rodando (o JS vem de Function.prototype.toString).
   ============================================================ */
(function () {
  'use strict';

  var DB = window.ANIMDB || [];

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

  /* ---------- utils ---------- */
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var esc = function (s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };

  var RE = new RegExp(
    '(\\/\\*[\\s\\S]*?\\*\\/|\\/\\/[^\\n]*|&lt;!--[\\s\\S]*?--&gt;)' +   // 1 comentário
    '|("[^"\\n]*"|\'[^\'\\n]*\'|`[^`]*`)' +                              // 2 string
    '|\\b(const|let|var|function|return|if|else|for|of|in|new|class|this|null|true|false|async|await|typeof)\\b' + // 3 keyword
    '|(@[a-z-]+|:[a-z-]+(?=\\s*\\{)|\\.[a-zA-Z][\\w-]*(?=[\\s,{:.>#\\[]))' + // 4 seletor/at-rule
    '|(-?\\d+\\.?\\d*(?:px|s|ms|deg|%|em|rem|vh|vw|fr)?)',               // 5 número
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

  /** tira a indentação comum de um template literal */
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

  /** fonte legível da função js(root, ctx) — só o corpo */
  function jsSource(fn) {
    if (!fn) return '';
    var s = fn.toString();
    var i = s.indexOf('{');
    var body = s.slice(i + 1, s.lastIndexOf('}'));
    return dedent(body);
  }

  function toast(msg) {
    var t = $('#toast');
    t.textContent = msg;
    t.classList.add('on');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { t.classList.remove('on'); }, 1500);
  }

  function copy(txt) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(txt).then(function () { toast('Código copiado'); });
    } else {
      var ta = document.createElement('textarea');
      ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); toast('Código copiado'); } catch (e) { toast('Falhou ao copiar'); }
      document.body.removeChild(ta);
    }
  }

  /* ---------- contexto entregue a cada demo ---------- */
  function makeCtx() {
    var rafs = [], timers = [], offs = [], dead = false;
    return {
      /** loop de rAF que morre junto com a demo */
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
      /** registra um teardown arbitrário (observers, etc.) */
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

  /* ---------- montagem ---------- */
  var styleSheet = document.createElement('style');
  document.head.appendChild(styleSheet);
  var injected = {};

  function injectCSS(item) {
    if (injected[item.id] || !item.css) return;
    injected[item.id] = 1;
    styleSheet.appendChild(document.createTextNode('\n/* ' + item.id + ' */\n' + dedent(item.css) + '\n'));
  }

  function mount(card) {
    var item = card._item;
    if (card._ctx) return;
    injectCSS(item);
    var stage = $('.stage', card);
    var hint = $('.stage__hint', card);
    stage.innerHTML = '';
    if (hint) stage.appendChild(hint);
    var host = document.createElement('div');
    host.className = 'demo-host';
    host.style.cssText = 'width:100%;height:100%;display:flex;align-items:center;justify-content:center';
    if (item.stage && item.stage.indexOf('flush') > -1) host.style.display = 'block';
    if (item.stage && item.stage.indexOf('scroll') > -1) host.style.cssText = 'width:100%;display:block';
    host.innerHTML = dedent(item.html || '');
    stage.appendChild(host);
    if (item.stage && item.stage.indexOf('scroll') > -1) stage.scrollTop = 0;
    var ctx = makeCtx();
    card._ctx = ctx;
    try { if (item.js) item.js(host, ctx); }
    catch (e) { console.error('[' + item.id + ']', e); }
  }

  function unmount(card) {
    if (!card._ctx) return;
    card._ctx.kill();
    card._ctx = null;
    var stage = $('.stage', card);
    var hint = $('.stage__hint', card);
    stage.innerHTML = '';
    if (hint) stage.appendChild(hint);
  }

  /* ---------- construção do card ---------- */
  function buildCard(item, n) {
    var card = document.createElement('article');
    card.className = 'card';
    card._item = item;
    card.dataset.cat = item.cat;
    card.dataset.q = (item.title + ' ' + (item.desc || '') + ' ' +
      (item.tags || []).join(' ') + (item.nv ? ' novo novos' : '')).toLowerCase();
    if (item.nv) card.dataset.nv = '1';

    var stageCls = 'stage';
    if (item.stage) {
      item.stage.split(' ').forEach(function (s) { if (s) stageCls += ' stage--' + s; });
    }

    card.innerHTML =
      '<div class="card__top">' +
        '<span class="card__num">' + String(n).padStart(3, '0') + '</span>' +
        (item.nv ? '<span class="card__new">novo</span>' : '') +
        '<div><h3 class="card__ttl">' + esc(item.title) + '</h3>' +
        (item.desc ? '<p class="card__desc">' + esc(item.desc) + '</p>' : '') + '</div>' +
      '</div>' +
      '<div class="' + stageCls + '">' + (item.hint ? '<span class="stage__hint">' + esc(item.hint) + '</span>' : '') + '</div>' +
      '<div class="card__bar">' +
        (item.tags || []).map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') +
        '<div class="card__acts">' +
          '<button class="act js-replay" title="Rodar de novo"><svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg>Replay</button>' +
          '<button class="act js-code" title="Ver código"><svg viewBox="0 0 24 24"><path d="m8 17-5-5 5-5"/><path d="m16 7 5 5-5 5"/></svg>Código</button>' +
        '</div>' +
      '</div>' +
      '<div class="code"></div>';

    $('.js-replay', card).addEventListener('click', function () {
      unmount(card); mount(card);
    });
    $('.js-code', card).addEventListener('click', function () {
      var open = card.classList.toggle('is-open');
      this.classList.toggle('is-on', open);
      if (open) buildCode(card);
    });
    return card;
  }

  function buildCode(card) {
    var box = $('.code', card);
    if (box._built) return;
    box._built = 1;
    var item = card._item;
    var parts = [];
    if (item.html) parts.push({ k: 'HTML', v: dedent(item.html) });
    if (item.css) parts.push({ k: 'CSS', v: dedent(item.css) });
    if (item.js) parts.push({ k: 'JS', v: jsSource(item.js) });

    box.innerHTML =
      '<div class="code__tabs">' +
        parts.map(function (p, i) {
          return '<button class="code__tab' + (i === 0 ? ' is-on' : '') + '" data-i="' + i + '">' + p.k + '</button>';
        }).join('') +
        '<button class="act code__copy js-copy">Copiar</button>' +
      '</div><pre><code></code></pre>';

    var code = $('code', box);
    var show = function (i) {
      code.innerHTML = hl(parts[i].v);
      box._i = i;
    };
    show(0);
    box.querySelectorAll('.code__tab').forEach(function (t) {
      t.addEventListener('click', function () {
        box.querySelectorAll('.code__tab').forEach(function (x) { x.classList.remove('is-on'); });
        t.classList.add('is-on');
        show(+t.dataset.i);
      });
    });
    $('.js-copy', box).addEventListener('click', function () {
      copy(parts.map(function (p) { return '/* ===== ' + p.k + ' ===== */\n' + p.v; }).join('\n\n'));
    });
  }

  /* ---------- render ---------- */
  var grid = $('#grid');
  var allCards = [];

  function render() {
    var frag = document.createDocumentFragment();
    var n = 0;
    CATS.forEach(function (c) {
      var items = DB.filter(function (i) { return i.cat === c.id; });
      if (!items.length) return;
      var block = document.createElement('section');
      block.className = 'catblock';
      block.id = 'cat-' + c.id;
      block.dataset.cat = c.id;
      block.innerHTML =
        '<div class="catblock__head"><h2>' + c.nome + '</h2>' +
        '<span>' + String(items.length).padStart(2, '0') + ' exemplos</span>' +
        '<p>' + c.desc + '</p></div><div class="grid"></div>';
      var g = $('.grid', block);
      items.forEach(function (it) {
        n++;
        var card = buildCard(it, n);
        g.appendChild(card);
        allCards.push(card);
      });
      frag.appendChild(block);
    });
    grid.appendChild(frag);

    // chips: fazem as vezes da navegação por categoria
    var novos = DB.filter(function (i) { return i.nv; }).length;
    $('#chips').innerHTML = '<button class="chip is-on" data-cat="all">Tudo <b>' + DB.length + '</b></button>' +
      (novos ? '<button class="chip chip--new" data-cat="__nv">Novos <b>' + novos + '</b></button>' : '') +
      CATS.map(function (c) {
        var q = DB.filter(function (i) { return i.cat === c.id; }).length;
        return '<button class="chip" data-cat="' + c.id + '">' + c.nome + ' <b>' + q + '</b></button>';
      }).join('');
    var chips = $('#chips');
    chips.addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (!b) return;
      chips.querySelectorAll('.chip').forEach(function (x) { x.classList.remove('is-on'); });
      b.classList.add('is-on');
      state.cat = b.dataset.cat;
      applyFilter();
    });

    /* Quando a régua de chips ainda rola (telas estreitas), a barra fica
       escondida — então damos as duas formas de puxar que o usuário espera:
       arrastar com o ponteiro e girar a roda do mouse na horizontal. */
    var arr = { on: false, x: 0, esq: 0, moveu: 0 };
    chips.addEventListener('pointerdown', function (e) {
      if (chips.scrollWidth <= chips.clientWidth) return;
      arr.on = true; arr.moveu = 0;
      arr.x = e.clientX; arr.esq = chips.scrollLeft;
      chips.setPointerCapture(e.pointerId);
    });
    chips.addEventListener('pointermove', function (e) {
      if (!arr.on) return;
      var d = e.clientX - arr.x;
      if (Math.abs(d) > 4) { arr.moveu = 1; chips.classList.add('arrastando'); }
      chips.scrollLeft = arr.esq - d;
    });
    function soltar() { arr.on = false; chips.classList.remove('arrastando'); }
    chips.addEventListener('pointerup', soltar);
    chips.addEventListener('pointercancel', soltar);
    // o clique só é cancelado se de fato houve arrasto
    chips.addEventListener('click', function (e) { if (arr.moveu) { e.stopPropagation(); arr.moveu = 0; } }, true);
    chips.addEventListener('wheel', function (e) {
      if (chips.scrollWidth <= chips.clientWidth) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;   // trackpad horizontal já funciona
      e.preventDefault();
      chips.scrollLeft += e.deltaY;
    }, { passive: false });

    $('#totals').innerHTML =
      '<span><b data-count="' + DB.length + '">0</b>animações executáveis</span>' +
      '<span><b data-count="' + CATS.length + '">0</b>categorias</span>' +
      '<span><b data-count="' + DB.filter(function (i) { return i.js; }).length + '">0</b>com JavaScript</span>' +
      '<span><b data-count="0">0</b>bibliotecas</span>';
  }

  /* ---------- filtro ---------- */
  var state = { cat: 'all', q: '' };

  function applyFilter() {
    var vis = 0;
    allCards.forEach(function (c) {
      var okCat = state.cat === 'all' ||
                  (state.cat === '__nv' ? c.dataset.nv === '1' : c.dataset.cat === state.cat);
      var okQ = !state.q || c.dataset.q.indexOf(state.q) > -1;
      var on = okCat && okQ;
      c.style.display = on ? '' : 'none';
      if (on) vis++; else unmount(c);
    });
    document.querySelectorAll('.catblock').forEach(function (b) {
      var any = Array.prototype.some.call(b.querySelectorAll('.card'), function (c) { return c.style.display !== 'none'; });
      b.style.display = any ? '' : 'none';
    });
    $('#result').textContent = vis + '/' + allCards.length;
    allCards.forEach(function (c) { io.observe(c); });
    reconcile();
    var empty = $('#emptyState');
    if (!vis && !empty) {
      empty = document.createElement('div');
      empty.id = 'emptyState'; empty.className = 'empty';
      empty.innerHTML = '<b>Nada encontrado</b>Tente “parallax”, “canvas”, “svg”, “hover”…';
      grid.appendChild(empty);
    } else if (empty) {
      empty.style.display = vis ? 'none' : '';
    }
  }

  /* ---------- lazy mount ----------
     Reconciliação por posição em vez de reagir a cada entry do
     IntersectionObserver: durante uma rolagem rápida os entries chegam
     como snapshots defasados e um "saiu da tela" atrasado desmontava um
     card que já tinha voltado — deixando-o vazio até sair e entrar de novo. */
  var MARGIN = 300, pending = false;

  function reconcile() {
    pending = false;
    var vh = innerHeight;
    allCards.forEach(function (c) {
      if (c.style.display === 'none') { unmount(c); return; }
      var r = c.getBoundingClientRect();
      var near = r.bottom > -MARGIN && r.top < vh + MARGIN;
      if (near) {
        if (r.top < vh) c.classList.add('in');
        mount(c);
      } else {
        unmount(c);
      }
    });
  }
  function schedule() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(reconcile);
  }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);

  // o observer não decide nada: serve só como gatilho barato de
  // "a visibilidade mudou, recalcule" — quem manda é o reconcile.
  var io = new IntersectionObserver(schedule, { rootMargin: MARGIN + 'px 0px' });

  // rede de segurança: compara scrollY a cada frame (custo ~zero) e só
  // recalcula quando ele muda. Cobre ambientes onde o evento 'scroll' e o
  // IntersectionObserver chegam atrasados ou nem chegam.
  var lastY = -1;
  (function watch() {
    requestAnimationFrame(watch);
    if (window.scrollY !== lastY) { lastY = window.scrollY; reconcile(); }
  })();

  /* ---------- contadores do masthead ---------- */
  function counters() {
    document.querySelectorAll('#totals b').forEach(function (el) {
      var to = +el.dataset.count, t0 = null;
      (function run(t) {
        if (!t0) t0 = t;
        var k = Math.min(1, (t - t0) / 1100);
        el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(run);
      })(performance.now());
    });
  }

  /* ---------- tema ---------- */
  function temaAtual() {
    var forcado = document.documentElement.getAttribute('data-theme');
    if (forcado) return forcado;
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function aplicarTema(t) {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('animdb-tema', t); } catch (e) {}
  }
  try {
    var salvo = localStorage.getItem('animdb-tema');
    if (salvo) document.documentElement.setAttribute('data-theme', salvo);
  } catch (e) {}

  /* ---------- boot ---------- */
  render();
  applyFilter();
  setTimeout(counters, 550);

  var si = $('#search'), tmr;
  si.addEventListener('input', function () {
    clearTimeout(tmr);
    tmr = setTimeout(function () { state.q = si.value.trim().toLowerCase(); applyFilter(); }, 140);
  });
  addEventListener('keydown', function (e) {
    if (e.key === '/' && document.activeElement !== si) { e.preventDefault(); si.focus(); }
    if (e.key === 'Escape') si.blur();
  });
  $('#tgTheme').addEventListener('click', function () {
    aplicarTema(temaAtual() === 'dark' ? 'light' : 'dark');
  });
  $('#tgReduce').addEventListener('click', function () {
    document.body.classList.toggle('no-motion');
  });

  console.log('%c♛ Impero Solutions', 'font:600 18px Georgia,serif;color:#d4af37',
              DB.length + ' animações carregadas');
})();
