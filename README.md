# Banco de Animações · Impero Solutions

205 animações executáveis, agrupadas em 10 categorias. Cada card mostra o preview ao vivo
e o **código real que está rodando** (o JS é extraído da própria função via `toString()`,
então nunca fica desatualizado em relação ao demo).

Zero bibliotecas: sem GSAP, sem Framer Motion, sem Three.js, sem Matter.js, sem Lottie.
Tudo HTML + CSS + JS vanilla — incluindo WebGL cru, WebGPU/WGSL, Web Audio, Worker com
OffscreenCanvas, Houdini paint worklet e View Transitions. A única requisição externa é a
fonte (Google Fonts); sem ela a página cai para a fonte do sistema e continua funcionando.

O filtro **Novos** isola as 101 animações do segundo lote.

## Identidade

Os tokens vêm do [Banco de Skills](https://banco-de-skills.vercel.app/) — mesmo sistema, mesma
marca. O tema claro não é a inversão do escuro: é papel quente, com o mesmo ouro escurecido
até passar em contraste sobre papel.

| | claro | escuro |
|---|---|---|
| papel / fundo | `#f6f3ec` | `#0a0b0c` |
| superfície | `#fffdf8` | `#131618` |
| linha | `#e0d9c9` | `#26292b` |
| texto | `#1b1813` | `#f4f3f1` |
| ouro | `#8a6a17` | `#d4af37` |

- **Tipografia**: display `Iowan Old Style`/Palatino/Georgia, corpo `system-ui`, código `ui-monospace`
  — tudo do sistema, nenhuma webfont, nenhuma requisição externa.
- **Tema**: segue o `prefers-color-scheme` e o botão ☀/☾ força e grava em `localStorage`.
- **Palco**: a área de preview de cada card é sempre tinta (`--stage`), em qualquer tema — é a
  área de mídia da página, como uma foto numa revista.
- **Paleta dos demos**: ouro `#d4af37`, ameixa `#b08ac9`, oliva `#5cc88f`, bronze `#cf9b6a`,
  coral `#e5645f`, ouro claro `#e8c96a`. Todos legíveis sobre o palco.

## Rodar

Abra `index.html` direto no navegador, ou sirva a pasta:

```bash
python -m http.server 9412
# http://127.0.0.1:9412
```

## Estrutura

```
index.html            masthead, toolbar e a marca (crest ♛)
css/style.css         tokens dos dois temas + layout, cards, painel de código
js/main.js            engine: monta/desmonta demos, filtro, busca, viewer de código
js/data/*.js          as animações, uma categoria por arquivo (lote 1)
js/data/*2.js         segundo lote da mesma categoria
pages/vt-a|b.html     duas páginas usadas pela demo de View Transitions entre documentos
```

| Categoria | Arquivos | Qtd |
|---|---|---|
| Entrada / Reveal     | `entrada.js` + `entrada2.js`   | 20 |
| Scroll-driven        | `scroll.js` + `scroll2.js`     | 23 |
| Hover & micro        | `hover.js` + `hover2.js`       | 26 |
| Tipografia           | `texto.js` + `texto2.js`       | 19 |
| Loaders & transições | `loaders.js` + `loaders2.js`   | 15 |
| Navegação & UI       | `nav.js` + `nav2.js`           | 23 |
| Fundos & ambiente    | `fundos.js` + `fundos2.js`     | 20 |
| Estado & feedback    | `estado.js` + `estado2.js`     | 20 |
| Dados & gráficos     | `dados.js` + `dados2.js`       | 17 |
| Avançado / WOW       | `avancado.js` + `avancado2.js` | 22 |

Os arquivos do lote 2 usam um `add()` que marca `nv: 1` — é isso que gera o selo **novo**
no card e alimenta o chip de filtro.

## Como funciona a engine

Cada demo é um objeto empurrado em `window.ANIMDB`:

```js
{
  id:'h02',                    // prefixo único — TODO seletor CSS da demo usa esse prefixo
  cat:'hover',                 // id da categoria (ver CATS em js/main.js)
  title:'Botão magnético',
  desc:'…',                    // uma linha explicando a técnica
  tags:['lerp','rAF'],         // entram na busca
  stage:'scroll flush tall light',   // opcional: modificadores do palco
  hint:'aproxime o mouse',     // etiqueta no canto do preview
  html:`…`,                    // injetado no host
  css:`…`,                     // injetado uma vez em <style> global
  js:function(root, ctx){ … }  // root = host da demo
}
```

O CSS é global — por isso **todo seletor precisa carregar o prefixo do `id`** (`.h02-b`),
senão uma demo vaza estilo na outra.

### O `ctx`

Tudo que o `ctx` cria é destruído quando o card sai da tela ou você clica em Replay:

| método | para quê |
|---|---|
| `ctx.loop(fn)` | loop de `requestAnimationFrame` |
| `ctx.raf(fn)` | um frame só |
| `ctx.wait(fn, ms)` / `ctx.every(fn, ms)` | timers |
| `ctx.on(el, ev, fn)` | listener |
| `ctx.clean(fn)` | teardown arbitrário (ex.: `observer.disconnect()`) |

Sem isso, 205 demos rodando ao mesmo tempo derrubariam a página — por isso cada card só
monta quando chega perto da viewport e desmonta quando se afasta.

A montagem é decidida por uma **reconciliação por posição** (`reconcile()` em `js/main.js`),
não pelos entries do IntersectionObserver: durante uma rolagem rápida os entries chegam como
snapshots defasados e um "saiu da tela" atrasado deixava cards vazios. O observer e o evento
`scroll` só disparam o recálculo; quem decide é a posição real no momento do frame.

### Palcos (`stage`)

- `scroll` — o preview vira um container rolável (para demos scroll-driven)
- `flush` — o conteúdo ocupa 100% do palco, sem centralização
- `tall` — palco de 300px
- `light` — fundo claro

## Adicionar uma animação

1. Escolha o arquivo da categoria em `js/data/`.
2. Copie o objeto de uma demo parecida, troque o `id` por um prefixo novo.
3. Renomeie **todas** as classes CSS para esse prefixo.
4. Salve e recarregue — a contagem e os filtros se ajustam sozinhos.

---

## Páginas por tecnologia (benchmark)

Além do `index.html` (site completo, 205 animações em vanilla), existem quatro páginas
com a **mesma suíte de 104 animações** (leva 1, todas as 10 categorias), cada uma
executada por uma tecnologia diferente — troque pelo seletor ⚙ na toolbar:

| Página         | Tecnologia                     | Origem do código de animação          |
|----------------|--------------------------------|---------------------------------------|
| `vanilla.html` | HTML/CSS/JS puro (referência)  | `js/data/*.js` (arquivos da leva 1)   |
| `gsap.html`    | GSAP 3 (CDN)                   | `js/engines/gsap-a.js` / `gsap-b.js`  |
| `anime.html`   | Anime.js 3 (CDN)               | `js/engines/anime-a.js` / `anime-b.js`|
| `waapi.html`   | Web Animations API (nativa)    | `js/engines/waapi-a.js` / `waapi-b.js`|
| `react.html`   | React 18 (CDN) — shell em componentes | `js/apps/react-app.js` + `js/data/*`  |
| `vue.html`     | Vue 3 (CDN) — shell em componentes    | `js/apps/vue-app.js` + `js/data/*`    |
| `svelte.html`  | Svelte (compilado) — shell em componentes | `js/apps/svelte-app.js` (fonte em `svelte-src/`, `npm run build`) |
| `tailwind.html`| Tailwind CSS (Play CDN) — estilo utilitário | `js/engines/tw-a.js` / `tw-b.js`  |

Nas páginas de framework (React/Vue/Svelte), o shell — cards, filtros, busca e o
mount/desmount por scroll — é renderizado pelo framework e cada demo vive num
componente com teardown; o código de animação dos demos é o vanilla original
(é o overhead do framework que entra no teste). Na página Tailwind, o JS é o
vanilla original e o que muda é o CSS, reescrito em classes utilitárias.

O HTML e o CSS estático de cada demo são idênticos entre as páginas; só o driver de
movimento muda. Isso torna a comparação de performance justa (mesmo DOM, mesmo paint).

### Como medir

1. Sirva a pasta (`npx serve .` ou similar) — as páginas GSAP/Anime precisam de internet (CDN).
2. Abra cada página em janela anônima, DevTools → Performance, grave ~20 s rolando a página inteira.
3. Compare: FPS médio, tempo de scripting, long tasks e memória (os cards montam/desmontam ao rolar, então a rolagem é o cenário de estresse).
4. Lighthouse/PageSpeed também funcionam, mas o Performance panel captura melhor o custo de runtime das animações.

---

## Curadoria por nicho

O `index.html` tem uma segunda régua de filtros — **Nichos** — que enxerga o banco pela ótica
comercial: "vou montar um site para um cliente do segmento X; quais animações oferecer?".
Ao ativar um nicho, só as animações curadas aparecem e cada card mostra uma nota ♛ com o
**porquê** daquela animação funcionar naquele segmento (onde entra no site e o efeito no visitante).

| Nicho | Onde está | Inclui |
|---|---|---|
| Construção & Arquitetura | `js/nichos.js` | reveals estruturais, contadores de obra, SVG de traço, before/after, timeline de obra, blueprint |
| E-commerce | `js/nichos.js` | filtros/organização de catálogo (FLIP, tabs, busca) + micro-interações de compra (fly-to-cart, stepper, toasts, skeletons) |
| Chalés & Hospedagem | `js/nichos.js` | atmosfera: parallax de paisagem, partículas suaves, ken burns, reserva com confirmação |
| Clínicas de alto padrão | `js/nichos.js` | elegância clínica: fades/blur-in, credibilidade em números, agendamento com micro-feedback, before/after |

- O mapeamento das 205 animações originais vive em `js/nichos.js` (id → porquê, por nicho).
- 8 demos novas essenciais aos nichos estão em `js/data/nichos-demos.js` (ids `ni01–ni08`,
  busque "nicho"): filtro FLIP, fly-to-cart, stepper de checkout, antes/depois, blueprint,
  timeline de obra, ken burns e reserva — elas carregam o próprio mapeamento inline (campo `nichos`).
- Um item pode servir a mais de um nicho, com porquês diferentes.
- As páginas de benchmark (suíte de 104) não carregam a camada de nichos — seguem idênticas
  entre si para o teste de performance continuar justo.

---

## Guia "Efeitos Avançados" (`efeitos.html`)

Segunda guia do site (navegação no topo): mapeamento técnico de **animação 3D integrada a
imagens**, 16 técnicas em 7 famílias, com a mesma engine de cards/busca/filtros do banco.
Cada card traz o nome técnico, as skills nas tags, um demo executável em vanilla (WebGL cru,
CSS 3D ou canvas — texturas procedurais, sem imagens externas) e as referências do gênero
linkadas no rodapé do card.

| Família | Técnicas |
|---|---|
| 2.5D / Depth map | parallax por depth map, displacement de vértices, scanning reveal |
| Walkthrough no scroll | sequência de frames scrubbed, câmera 3D no scroll, colagem cinemática |
| WebGL sobre imagens | distortion hover, gooey reveal, warp transitions, velocity skew |
| CSS puro / leve | tilt 3D em camadas, flip + holográfico |
| Orquestração de scroll | zoom-into-image (portal), parallax multicamada + smooth scroll |
| Gaussian Splatting | nuvem de pontos navegável (referências SuperSplat/Spark) |
| Câmera por IA | dolly zoom (Vertigo) + presets orbit/crane (referências Higgsfield/Immersity) |

Dados em `js/data/efeitos-a.js` (WebGL) e `efeitos-b.js` (scroll/CSS/canvas); as categorias
da guia são definidas em `window.ANIMCATS` no próprio `efeitos.html` (o `js/main.js` usa
`ANIMCATS` quando existe). Demos WebGL degradam para fallback estático sem WebGL.

### Gravações das referências (`referencias/`)

Vídeos `.webm` (1280×720, ~20–40 s) gravados com navegador automatizado direto nos demos
originais — mouse varrendo nos efeitos de hover, rolagem cinematográfica nos scroll-driven.
Cada card da guia Efeitos Avançados linka sua gravação ("🎬 gravação do demo"):

fake3d-depth-map · distortion-hover · gooey-hover · awwwards-manet · gsap-scrolltrigger ·
lenis-smooth-scroll · supersplat-gallery · higgsfield-camera · immersity-ai-25d

Uso interno (estudo/referência) — o crédito e o link da fonte original permanecem em cada card.
