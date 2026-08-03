<script>
  import { createEventDispatcher } from 'svelte';
  export let item;

  const DC = window.DemoCore;
  const dispatch = createEventDispatcher();
  const parts = DC.codeParts(item);
  let i = 0;

  function copiar() {
    const txt = parts.map(p => '/* ===== ' + p.k + ' ===== */\n' + p.v).join('\n\n');
    if (navigator.clipboard) navigator.clipboard.writeText(txt);
    dispatch('toast', 'Código copiado');
  }
</script>

<div class="code" style="display:block">
  <div class="code__tabs">
    {#each parts as p, k}
      <button class="code__tab" class:is-on={k === i} on:click={() => (i = k)}>{p.k}</button>
    {/each}
    <button class="act code__copy" on:click={copiar}>Copiar</button>
  </div>
  <pre><code>{@html DC.hl(parts[i].v)}</code></pre>
</div>
