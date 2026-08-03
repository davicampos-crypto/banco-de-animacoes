/* ============================================================
   VUE APP — a mesma suíte de 104 animações, com o shell
   (cards, filtro, busca, lazy mount) renderizado pelo Vue 3.
   As demos rodam dentro de componentes via onMounted + teardown.
   ============================================================ */
(function () {
  'use strict';

  var createApp = Vue.createApp, ref = Vue.ref, computed = Vue.computed,
      onMounted = Vue.onMounted, onUnmounted = Vue.onUnmounted, watch = Vue.watch;
  var DC = window.DemoCore;
  var DB = window.ANIMDB || [];
  var MARGIN = 300;

  /* -------- notificador de scroll compartilhado -------- */
  var subs = new Set();
  function notify() { subs.forEach(function (f) { f(); }); }
  addEventListener('scroll', notify, { passive: true });
  addEventListener('resize', notify);
  var lastY = -1;
  (function watchY() {
    requestAnimationFrame(watchY);
    if (window.scrollY !== lastY) { lastY = window.scrollY; notify(); }
  })();

  var CodeBox = {
    props: ['item'],
    emits: ['toast'],
    setup: function (props, ctx) {
      var parts = DC.codeParts(props.item);
      var i = ref(0);
      function copiar() {
        var txt = parts.map(function (p) { return '/* ===== ' + p.k + ' ===== */\n' + p.v; }).join('\n\n');
        if (navigator.clipboard) navigator.clipboard.writeText(txt);
        ctx.emit('toast', 'Código copiado');
      }
      var html = computed(function () { return DC.hl(parts[i.value].v); });
      return { parts: parts, i: i, copiar: copiar, html: html };
    },
    template:
      '<div class="code" style="display:block">' +
      '  <div class="code__tabs">' +
      '    <button v-for="(p,k) in parts" :key="p.k" class="code__tab" :class="{\'is-on\':k===i}" @click="i=k">{{p.k}}</button>' +
      '    <button class="act code__copy" @click="copiar">Copiar</button>' +
      '  </div>' +
      '  <pre><code v-html="html"></code></pre>' +
      '</div>'
  };

  var Card = {
    props: ['item', 'n'],
    emits: ['toast'],
    components: { CodeBox: CodeBox },
    setup: function (props) {
      var el = ref(null), stage = ref(null);
      var near = ref(false), seen = ref(false), open = ref(false), gen = ref(0);
      var off = null;

      function check() {
        if (!el.value) return;
        var r = el.value.getBoundingClientRect();
        near.value = r.bottom > -MARGIN && r.top < innerHeight + MARGIN;
        if (r.top < innerHeight) seen.value = true;
      }

      function remount() {
        if (off) { off(); off = null; }
        if (near.value && stage.value) off = DC.mountDemo(stage.value, props.item);
      }

      onMounted(function () { subs.add(check); check(); remount(); });
      onUnmounted(function () { subs.delete(check); if (off) off(); });
      watch([near, gen], remount);

      var stageCls = computed(function () {
        var c = 'stage';
        if (props.item.stage) props.item.stage.split(' ').forEach(function (s) { if (s) c += ' stage--' + s; });
        return c;
      });
      var num = computed(function () { return String(props.n).padStart(3, '0'); });

      return { el: el, stage: stage, near: near, seen: seen, open: open, gen: gen,
               stageCls: stageCls, num: num, replay: function () { gen.value++; } };
    },
    template:
      '<article class="card" :class="{in:seen}" ref="el">' +
      '  <div class="card__top">' +
      '    <span class="card__num">{{num}}</span>' +
      '    <div><h3 class="card__ttl">{{item.title}}</h3>' +
      '    <p v-if="item.desc" class="card__desc">{{item.desc}}</p></div>' +
      '  </div>' +
      '  <div :class="stageCls" ref="stage"><span v-if="item.hint" class="stage__hint">{{item.hint}}</span></div>' +
      '  <div class="card__bar">' +
      '    <span v-for="t in item.tags" :key="t" class="tag">{{t}}</span>' +
      '    <div class="card__acts">' +
      '      <button class="act" @click="replay">Replay</button>' +
      '      <button class="act" :class="{\'is-on\':open}" @click="open=!open">Código</button>' +
      '    </div>' +
      '  </div>' +
      '  <CodeBox v-if="open" :item="item" @toast="$emit(\'toast\', $event)" />' +
      '</article>'
  };

  var App = {
    components: { Card: Card },
    setup: function () {
      var cat = ref('all'), q = ref(''), toastMsg = ref('');
      var toastTmr = 0;

      function onToast(m) {
        toastMsg.value = m;
        clearTimeout(toastTmr);
        toastTmr = setTimeout(function () { toastMsg.value = ''; }, 1500);
      }

      var chips = DC.CATS.map(function (c) {
        return { id: c.id, nome: c.nome, qt: DB.filter(function (i) { return i.cat === c.id; }).length };
      }).filter(function (c) { return c.qt; });

      var blocks = computed(function () {
        var ql = q.value.trim().toLowerCase();
        var n = 0, vis = 0;
        var out = DC.CATS.map(function (c) {
          var items = DB.filter(function (i) { return i.cat === c.id; });
          var cards = items.map(function (it) {
            n++;
            var okCat = cat.value === 'all' || it.cat === cat.value;
            var blob = (it.title + ' ' + (it.desc || '') + ' ' + (it.tags || []).join(' ')).toLowerCase();
            var okQ = !ql || blob.indexOf(ql) > -1;
            if (!(okCat && okQ)) return null;
            vis++;
            return { item: it, n: n };
          }).filter(Boolean);
          return cards.length ? { cat: c, cards: cards, total: items.length } : null;
        }).filter(Boolean);
        var el = document.getElementById('result');
        if (el) el.textContent = vis + '/' + DB.length;
        requestAnimationFrame(notify);
        return out;
      });

      onMounted(function () {
        var si = document.getElementById('search'), tmr;
        if (si) si.addEventListener('input', function () {
          clearTimeout(tmr);
          tmr = setTimeout(function () { q.value = si.value; }, 140);
        });
      });

      return { cat: cat, chips: chips, blocks: blocks, total: DB.length,
               toastMsg: toastMsg, onToast: onToast,
               pad: function (x) { return String(x).padStart(2, '0'); } };
    },
    template:
      '<Teleport to="#chips">' +
      '  <button class="chip" :class="{\'is-on\':cat===\'all\'}" @click="cat=\'all\'">Tudo <b>{{total}}</b></button>' +
      '  <button v-for="c in chips" :key="c.id" class="chip" :class="{\'is-on\':cat===c.id}" @click="cat=c.id">{{c.nome}} <b>{{c.qt}}</b></button>' +
      '</Teleport>' +
      '<section v-for="b in blocks" :key="b.cat.id" class="catblock">' +
      '  <div class="catblock__head"><h2>{{b.cat.nome}}</h2>' +
      '  <span>{{pad(b.total)}} exemplos</span><p>{{b.cat.desc}}</p></div>' +
      '  <div class="grid"><Card v-for="c in b.cards" :key="c.item.id" :item="c.item" :n="c.n" @toast="onToast" /></div>' +
      '</section>' +
      '<div v-if="!blocks.length" class="empty"><b>Nada encontrado</b>Tente outra busca.</div>' +
      '<div class="toast" :class="{on:toastMsg}">{{toastMsg || "Copiado"}}</div>'
  };

  createApp(App).mount('#grid');

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
      '<span><b>Vue 3</b>renderiza o shell</span>';
  }
})();
