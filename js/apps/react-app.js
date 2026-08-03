/* ============================================================
   REACT APP — a mesma suíte de 104 animações, com o shell
   (cards, filtro, busca, lazy mount) renderizado pelo React 18.
   As demos rodam dentro de componentes via useEffect + teardown.
   Sem JSX: React.createElement puro, para ficar 100% estático.
   ============================================================ */
(function () {
  'use strict';

  var h = React.createElement;
  var useState = React.useState, useEffect = React.useEffect,
      useRef = React.useRef, useMemo = React.useMemo;
  var DC = window.DemoCore;
  var DB = window.ANIMDB || [];
  var MARGIN = 300;

  /* -------- notificador de scroll compartilhado -------- */
  var subs = new Set();
  function notify() { subs.forEach(function (f) { f(); }); }
  addEventListener('scroll', notify, { passive: true });
  addEventListener('resize', notify);
  var lastY = -1;
  (function watch() {
    requestAnimationFrame(watch);
    if (window.scrollY !== lastY) { lastY = window.scrollY; notify(); }
  })();

  /* -------- visor de código -------- */
  function CodeBox(props) {
    var parts = useMemo(function () { return DC.codeParts(props.item); }, [props.item]);
    var st = useState(0), i = st[0], setI = st[1];
    function copiar() {
      var txt = parts.map(function (p) { return '/* ===== ' + p.k + ' ===== */\n' + p.v; }).join('\n\n');
      if (navigator.clipboard) navigator.clipboard.writeText(txt);
      props.onToast('Código copiado');
    }
    return h('div', { className: 'code', style: { display: 'block' } },
      h('div', { className: 'code__tabs' },
        parts.map(function (p, k) {
          return h('button', {
            key: p.k, className: 'code__tab' + (k === i ? ' is-on' : ''),
            onClick: function () { setI(k); }
          }, p.k);
        }),
        h('button', { className: 'act code__copy', onClick: copiar }, 'Copiar')),
      h('pre', null, h('code', {
        dangerouslySetInnerHTML: { __html: DC.hl(parts[i].v) }
      })));
  }

  /* -------- card -------- */
  function Card(props) {
    var item = props.item;
    var ref = useRef(null);
    var stageRef = useRef(null);
    var nearSt = useState(false), near = nearSt[0], setNear = nearSt[1];
    var inSt = useState(false), seen = inSt[0], setSeen = inSt[1];
    var openSt = useState(false), open = openSt[0], setOpen = openSt[1];
    var genSt = useState(0), gen = genSt[0], setGen = genSt[1];

    useEffect(function () {
      function check() {
        var el = ref.current;
        if (!el) return;
        var r = el.getBoundingClientRect();
        var ok = r.bottom > -MARGIN && r.top < innerHeight + MARGIN;
        setNear(ok);
        if (r.top < innerHeight) setSeen(true);
      }
      subs.add(check);
      check();
      return function () { subs.delete(check); };
    }, []);

    useEffect(function () {
      if (!near || !stageRef.current) return;
      var off = DC.mountDemo(stageRef.current, item);
      return off;
    }, [near, gen, item]);

    var stageCls = 'stage';
    if (item.stage) item.stage.split(' ').forEach(function (s) { if (s) stageCls += ' stage--' + s; });

    return h('article', { className: 'card' + (seen ? ' in' : ''), ref: ref },
      h('div', { className: 'card__top' },
        h('span', { className: 'card__num' }, String(props.n).padStart(3, '0')),
        h('div', null,
          h('h3', { className: 'card__ttl' }, item.title),
          item.desc ? h('p', { className: 'card__desc' }, item.desc) : null)),
      h('div', { className: stageCls, ref: stageRef },
        item.hint ? h('span', { className: 'stage__hint', key: 'hint' }, item.hint) : null),
      h('div', { className: 'card__bar' },
        (item.tags || []).map(function (t) { return h('span', { className: 'tag', key: t }, t); }),
        h('div', { className: 'card__acts' },
          h('button', { className: 'act', onClick: function () { setGen(gen + 1); } }, 'Replay'),
          h('button', {
            className: 'act' + (open ? ' is-on' : ''),
            onClick: function () { setOpen(!open); }
          }, 'Código'))),
      open ? h(CodeBox, { item: item, onToast: props.onToast }) : null);
  }

  /* -------- app -------- */
  function App() {
    var catSt = useState('all'), cat = catSt[0], setCat = catSt[1];
    var qSt = useState(''), q = qSt[0], setQ = qSt[1];
    var toastSt = useState(''), toastMsg = toastSt[0], setToast = toastSt[1];
    var toastTmr = useRef(0);

    function onToast(m) {
      setToast(m);
      clearTimeout(toastTmr.current);
      toastTmr.current = setTimeout(function () { setToast(''); }, 1500);
    }

    var ql = q.trim().toLowerCase();
    function passa(item) {
      if (cat !== 'all' && item.cat !== cat) return false;
      if (!ql) return true;
      var blob = (item.title + ' ' + (item.desc || '') + ' ' + (item.tags || []).join(' ')).toLowerCase();
      return blob.indexOf(ql) > -1;
    }

    var vis = 0, n = 0;
    var blocks = DC.CATS.map(function (c) {
      var items = DB.filter(function (i) { return i.cat === c.id; });
      if (!items.length) return null;
      var cards = items.map(function (it) {
        n++;
        if (!passa(it)) return null;
        vis++;
        return h(Card, { key: it.id, item: it, n: n, onToast: onToast });
      }).filter(Boolean);
      if (!cards.length) return null;
      return h('section', { className: 'catblock', key: c.id },
        h('div', { className: 'catblock__head' },
          h('h2', null, c.nome),
          h('span', null, String(items.length).padStart(2, '0') + ' exemplos'),
          h('p', null, c.desc)),
        h('div', { className: 'grid' }, cards));
    }).filter(Boolean);

    useEffect(function () {
      var el = document.getElementById('result');
      if (el) el.textContent = vis + '/' + DB.length;
      requestAnimationFrame(notify);
    });

    var chips = h(React.Fragment, null,
        h('button', {
          className: 'chip' + (cat === 'all' ? ' is-on' : ''),
          onClick: function () { setCat('all'); }
        }, 'Tudo ', h('b', null, DB.length)),
        DC.CATS.map(function (c) {
          var qt = DB.filter(function (i) { return i.cat === c.id; }).length;
          if (!qt) return null;
          return h('button', {
            key: c.id, className: 'chip' + (cat === c.id ? ' is-on' : ''),
            onClick: function () { setCat(c.id); }
          }, c.nome + ' ', h('b', null, qt));
        }));

    return h(React.Fragment, null,
      ReactDOM.createPortal(chips, document.getElementById('chips')),
      blocks.length ? blocks :
        h('div', { className: 'empty' }, h('b', null, 'Nada encontrado'), 'Tente outra busca.'),
      h('div', { className: 'toast' + (toastMsg ? ' on' : '') }, toastMsg || 'Copiado'),
      h(SearchBridge, { onQ: setQ }));
  }

  /* liga o input de busca (fora da árvore React, no toolbar) ao estado */
  function SearchBridge(props) {
    useEffect(function () {
      var si = document.getElementById('search'), tmr;
      if (!si) return;
      function oninput() {
        clearTimeout(tmr);
        tmr = setTimeout(function () { props.onQ(si.value); }, 140);
      }
      si.addEventListener('input', oninput);
      return function () { si.removeEventListener('input', oninput); clearTimeout(tmr); };
    }, []);
    return null;
  }

  ReactDOM.createRoot(document.getElementById('grid')).render(h(App));

  /* tema + pausa (iguais ao site) */
  document.getElementById('tgTheme').addEventListener('click', function () {
    var cur = document.documentElement.getAttribute('data-theme') ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', cur === 'dark' ? 'light' : 'dark');
  });
  document.getElementById('tgReduce').addEventListener('click', function () {
    document.body.classList.toggle('no-motion');
  });

  var totals = document.getElementById('totals');
  if (totals) {
    totals.innerHTML = '<span><b>' + DB.length + '</b>animações executáveis</span>' +
      '<span><b>' + DC.CATS.length + '</b>categorias</span>' +
      '<span><b>React 18</b>renderiza o shell</span>';
  }
})();
