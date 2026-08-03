<script>
  import { onMount } from 'svelte';
  import Card from './Card.svelte';

  const DC = window.DemoCore;
  const DB = window.ANIMDB || [];

  let cat = 'all';
  let q = '';
  let toastMsg = '';
  let toastTmr;

  const chips = DC.CATS
    .map(c => ({ id: c.id, nome: c.nome, qt: DB.filter(i => i.cat === c.id).length }))
    .filter(c => c.qt);

  function onToast(e) {
    toastMsg = e.detail;
    clearTimeout(toastTmr);
    toastTmr = setTimeout(() => (toastMsg = ''), 1500);
  }

  function pad(x) { return String(x).padStart(2, '0'); }

  $: ql = q.trim().toLowerCase();
  $: blocks = (() => {
    let n = 0, vis = 0;
    const out = DC.CATS.map(c => {
      const items = DB.filter(i => i.cat === c.id);
      const cards = items.map(it => {
        n++;
        const okCat = cat === 'all' || it.cat === cat;
        const blob = (it.title + ' ' + (it.desc || '') + ' ' + (it.tags || []).join(' ')).toLowerCase();
        if (!(okCat && (!ql || blob.includes(ql)))) return null;
        vis++;
        return { item: it, n };
      }).filter(Boolean);
      return cards.length ? { cat: c, cards, total: items.length } : null;
    }).filter(Boolean);
    const el = document.getElementById('result');
    if (el) el.textContent = vis + '/' + DB.length;
    return out;
  })();

  onMount(() => {
    // liga o input de busca e os chips (fora da árvore do app, no toolbar estático)
    const si = document.getElementById('search');
    let tmr;
    const oninput = () => { clearTimeout(tmr); tmr = setTimeout(() => (q = si.value), 140); };
    if (si) si.addEventListener('input', oninput);

    const slot = document.getElementById('chips');
    const render = () => {
      slot.innerHTML = '';
      const mk = (id, label, qt) => {
        const b = document.createElement('button');
        b.className = 'chip' + (cat === id ? ' is-on' : '');
        b.innerHTML = label + ' <b>' + qt + '</b>';
        b.addEventListener('click', () => { cat = id; render(); });
        slot.appendChild(b);
      };
      mk('all', 'Tudo', DB.length);
      chips.forEach(c => mk(c.id, c.nome, c.qt));
    };
    if (slot) render();

    document.getElementById('tgTheme').addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme') ||
        (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', cur === 'dark' ? 'light' : 'dark');
    });
    document.getElementById('tgReduce').addEventListener('click', () => {
      document.body.classList.toggle('no-motion');
    });

    const totals = document.getElementById('totals');
    if (totals) {
      totals.innerHTML = '<span><b>' + DB.length + '</b>animações executáveis</span>' +
        '<span><b>' + DC.CATS.length + '</b>categorias</span>' +
        '<span><b>Svelte</b>renderiza o shell</span>';
    }

    return () => { if (si) si.removeEventListener('input', oninput); };
  });
</script>

{#each blocks as b (b.cat.id)}
  <section class="catblock">
    <div class="catblock__head">
      <h2>{b.cat.nome}</h2>
      <span>{pad(b.total)} exemplos</span>
      <p>{b.cat.desc}</p>
    </div>
    <div class="grid">
      {#each b.cards as c (c.item.id)}
        <Card item={c.item} n={c.n} on:toast={onToast} />
      {/each}
    </div>
  </section>
{/each}

{#if !blocks.length}
  <div class="empty"><b>Nada encontrado</b>Tente outra busca.</div>
{/if}

<div class="toast" class:on={toastMsg}>{toastMsg || 'Copiado'}</div>
