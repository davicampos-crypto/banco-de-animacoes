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
