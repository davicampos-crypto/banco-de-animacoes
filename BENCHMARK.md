# Benchmark — Banco de Animações por tecnologia

**Data:** 03/08/2026 · **Método:** 2 passadas por página, rolagem contínua de 15 s do topo ao fim,
CPU throttling 6× (Chrome/CDP), medindo FPS, long tasks (>50 ms), tempo total travado e heap JS.
Valores `a→b` mostram 1ª passada (fria) → 2ª passada (aquecida); a aquecida é a mais representativa.

## Ranking — da mais pesada à mais leve

| # | Página | FPS | Long tasks | Tempo travado | Pior travada | Heap |
|---|--------|-----|------------|----------------|---------------|------|
| 1º 🔴 | **tailwind.html** (Tailwind Play CDN) | **~42** | 14–15 | **~1,5 s** | 331 ms | ~15 MB |
| 2º 🟠 | index.html (site completo, 205 anims) | ~47 | 15 | ~1,2 s | 140 ms | ~14 MB |
| 3º | gsap.html (GSAP 3) | 52→58 | 12→4 | 1,1→0,3 s | 309 ms | ~7 MB |
| 4º | vanilla.html (JS puro, referência) | 52→57 | 11→3 | 0,9→0,3 s | 189 ms | ~8 MB |
| 5º | anime.html (Anime.js 3) | 55→58 | 8→2 | 0,6→0,1 s | 134 ms | ~7 MB |
| 6º | waapi.html (Web Animations API) | 57→59 | 8→1 | 0,5→0,1 s | 73 ms | ~7 MB |
| 7º | react.html (React 18) | 58→59 | 2→1 | ~0,1 s | 79 ms | ~10 MB |
| 8º | vue.html (Vue 3) | 58→59 | 2 | ~0,1 s | 81 ms | ~9 MB |
| 9º 🟢 | **svelte.html** (Svelte compilado) | **~59,5** | 0–1 | ~0 s | 55 ms | ~8 MB |

## Conclusões rápidas

- **Tailwind é disparada a mais pesada** — culpa do Play CDN, que recompila CSS via
  MutationObserver a cada card montado na rolagem. Com Tailwind pré-compilado (build de
  produção) esse custo desaparece.
- **index.html** pesa pelo volume: 205 animações contra 104 das demais.
- **Entre as libs de animação** (passada aquecida): WAAPI < Anime.js < Vanilla ≈ GSAP —
  diferenças pequenas, todas entre 57–59 fps. GSAP teve a pior long task fria (parse/init da lib).
- **React, Vue e Svelte quase não pesam no scroll**: o framework renderiza o shell; quem
  custa são as animações (código vanilla igual nas três). O overhead de framework apareceria
  em interações de estado (filtrar/buscar), não na rolagem.

> Obs.: todas as páginas com a mesma suíte de 104 demos usam HTML/CSS estático idêntico —
> só o driver de animação/estilo muda, então a comparação é apples-to-apples.
