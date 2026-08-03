<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import CodeBox from './CodeBox.svelte';

  export let item;
  export let n;

  const DC = window.DemoCore;
  const dispatch = createEventDispatcher();
  const MARGIN = 300;

  let el, stage;
  let near = false, seen = false, open = false;
  let off = null;

  // notificador de scroll compartilhado entre todos os cards
  if (!window.__svSubs) {
    window.__svSubs = new Set();
    const notify = () => window.__svSubs.forEach(f => f());
    addEventListener('scroll', notify, { passive: true });
    addEventListener('resize', notify);
    let lastY = -1;
    (function watch() {
      requestAnimationFrame(watch);
      if (window.scrollY !== lastY) { lastY = window.scrollY; notify(); }
    })();
  }

  function check() {
    if (!el) return;
    const r = el.getBoundingClientRect();
    near = r.bottom > -MARGIN && r.top < innerHeight + MARGIN;
    if (r.top < innerHeight) seen = true;
  }

  function remount() {
    if (off) { off(); off = null; }
    if (near && stage) off = DC.mountDemo(stage, item);
  }

  $: if (el) { near; remount(); }

  onMount(() => { window.__svSubs.add(check); check(); });
  onDestroy(() => { window.__svSubs.delete(check); if (off) off(); });

  $: stageCls = 'stage' + (item.stage
    ? item.stage.split(' ').filter(Boolean).map(s => ' stage--' + s).join('')
    : '');
</script>

<article class="card" class:in={seen} bind:this={el}>
  <div class="card__top">
    <span class="card__num">{String(n).padStart(3, '0')}</span>
    <div>
      <h3 class="card__ttl">{item.title}</h3>
      {#if item.desc}<p class="card__desc">{item.desc}</p>{/if}
    </div>
  </div>
  <div class={stageCls} bind:this={stage}>
    {#if item.hint}<span class="stage__hint">{item.hint}</span>{/if}
  </div>
  <div class="card__bar">
    {#each item.tags || [] as t}<span class="tag">{t}</span>{/each}
    <div class="card__acts">
      <button class="act" on:click={remount}>Replay</button>
      <button class="act" class:is-on={open} on:click={() => (open = !open)}>Código</button>
    </div>
  </div>
  {#if open}
    <CodeBox {item} on:toast={e => dispatch('toast', e.detail)} />
  {/if}
</article>
