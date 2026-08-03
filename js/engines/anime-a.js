/* ==========================================================
   ENGINE · ANIME.JS v3 — réplica de entrada/scroll/hover/texto/loaders
   Requer o global `anime` (CDN). API v3: anime(), anime.timeline,
   anime.stagger, anime.remove, anime.setDashoffset.
   ========================================================== */
(window.ANIMDB = window.ANIMDB || []).push(

/* ---------- 01 · ENTRADA ---------- */

{
  id:'e01', cat:'entrada', title:'Fade-in + slide up',
  desc:'O clássico. IntersectionObserver dispara um tween do Anime.js.',
  tags:['IntersectionObserver','CSS','transition','anime.js'], stage:'scroll', hint:'role ↓',
  html:`
    <div class="e01">
      <div class="e01-sp">role para baixo</div>
      <div class="e01-i">Primeiro bloco</div>
      <div class="e01-i">Segundo bloco</div>
      <div class="e01-i">Terceiro bloco</div>
      <div class="e01-sp"></div>
    </div>`,
  css:`
    .e01{padding:14px}
    .e01-sp{height:150px;display:flex;align-items:center;justify-content:center;
      color:#524e47;font-size:12px;font-family:var(--mono)}
    .e01-i{padding:20px;margin-bottom:14px;border-radius:10px;
      background:#201d18;border:1px solid #2a2620;color:#d7d7e2;font-size:14px;
      opacity:0;transform:translateY(26px)}`,
  js:function(root,ctx){
    var itens = root.querySelectorAll('.e01-i');
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        anime.remove(e.target);
        anime({
          targets: e.target,
          opacity: e.isIntersecting ? 1 : 0,
          translateY: e.isIntersecting ? 0 : 26,
          duration: 700,
          easing: 'cubicBezier(.22,1,.36,1)'
        });
      });
    }, { root: root.closest('.stage'), threshold: .35 });
    itens.forEach(function(el){ io.observe(el); });
    ctx.clean(function(){ io.disconnect(); anime.remove(itens); });
  }
},

{
  id:'e02', cat:'entrada', title:'Stagger em grid',
  desc:'Mesmo reveal, mas com anime.stagger — o olho lê em cascata.',
  tags:['stagger','CSS var','delay','anime.js'],
  html:`<div class="e02"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>`,
  css:`
    .e02{display:grid;grid-template-columns:repeat(3,58px);gap:12px}
    .e02 i{width:58px;height:58px;border-radius:12px;
      background:linear-gradient(140deg,#6b5a2e,#3a3120);border:1px solid #7a6733;
      opacity:0;transform:translateY(22px) scale(.9)}`,
  js:function(root,ctx){
    var els = root.querySelectorAll('.e02 i');
    anime({
      targets: els,
      opacity: 1,
      translateY: 0,
      scale: 1,
      duration: 620,
      delay: anime.stagger(70),
      easing: 'cubicBezier(.22,1,.36,1)'
    });
    ctx.clean(function(){ anime.remove(els); });
  }
},

{
  id:'e03', cat:'entrada', title:'Reveal por máscara',
  desc:'O texto sobe de dentro de um container com overflow:hidden. Tween do Anime.js.',
  tags:['overflow','mask','keyframes','anime.js'],
  html:`
    <div class="e03">
      <span class="e03-l"><b>Design</b></span>
      <span class="e03-l"><b>em movimento</b></span>
      <span class="e03-l"><b>desde 2014</b></span>
    </div>`,
  css:`
    .e03{text-align:center}
    .e03-l{display:block;overflow:hidden}
    .e03-l b{display:block;font-size:26px;font-weight:800;letter-spacing:-.03em;color:#eaeaf2;
      transform:translateY(110%)}
    .e03-l:nth-child(2) b{color:#d4af37}
    .e03-l:nth-child(3) b{font-size:15px;font-weight:400;color:#7f7a73}`,
  js:function(root,ctx){
    var els = root.querySelectorAll('.e03-l b');
    anime({
      targets: els,
      translateY: ['110%','0%'],
      duration: 900,
      delay: anime.stagger(120),
      easing: 'cubicBezier(.22,1,.36,1)'
    });
    ctx.clean(function(){ anime.remove(els); });
  }
},

{
  id:'e04', cat:'entrada', title:'Clip-path wipe',
  desc:'Três variações de recorte: cortina, círculo e diagonal — clipPath tweenado.',
  tags:['clip-path','keyframes','anime.js'],
  html:`
    <div class="e04">
      <div class="e04-b e04-a">wipe →</div>
      <div class="e04-b e04-c">círculo</div>
      <div class="e04-b e04-d">diagonal</div>
    </div>`,
  css:`
    .e04{display:flex;flex-direction:column;gap:10px}
    .e04-b{width:200px;padding:14px 18px;border-radius:10px;font-size:13px;color:#0d0c0b;font-weight:600;
      background:linear-gradient(90deg,#d4af37,#b08ac9)}
    .e04-a{clip-path:inset(0 100% 0 0)}
    .e04-c{clip-path:circle(0% at 50% 50%)}
    .e04-d{clip-path:polygon(0 0,0 0,0 100%,0 100%)}`,
  js:function(root,ctx){
    var a = root.querySelector('.e04-a'),
        c = root.querySelector('.e04-c'),
        d = root.querySelector('.e04-d');
    anime({ targets:a, clipPath:['inset(0 100% 0 0)','inset(0 0% 0 0)'],
      duration:900, easing:'cubicBezier(.76,0,.24,1)' });
    anime({ targets:c, clipPath:['circle(0% at 50% 50%)','circle(75% at 50% 50%)'],
      duration:1000, delay:150, easing:'cubicBezier(.76,0,.24,1)' });
    anime({ targets:d, clipPath:['polygon(0 0,0 0,0 100%,0 100%)','polygon(0 0,100% 0,100% 100%,0 100%)'],
      duration:1000, delay:300, easing:'cubicBezier(.76,0,.24,1)' });
    ctx.clean(function(){ anime.remove([a,c,d]); });
  }
},

{
  id:'e05', cat:'entrada', title:'Blur-in',
  desc:'De desfocado e transparente para nítido — filter animado pelo Anime.js.',
  tags:['filter','blur','transition','anime.js'],
  html:`<div class="e05"><h4>Nitidez</h4><p>o olho é atraído pelo que entra em foco</p></div>`,
  css:`
    .e05{text-align:center;opacity:0;filter:blur(16px);transform:scale(1.06)}
    .e05 h4{font-size:30px;font-weight:800;letter-spacing:-.03em;color:#f5f2ec}
    .e05 p{margin-top:8px;color:#8f8a80;font-size:13px}`,
  js:function(root,ctx){
    var el = root.querySelector('.e05');
    anime({
      targets: el,
      opacity: [0,1],
      filter: ['blur(16px)','blur(0px)'],
      scale: [1.06,1],
      duration: 1100,
      easing: 'cubicBezier(.22,1,.36,1)'
    });
    ctx.clean(function(){ anime.remove(el); });
  }
},

{
  id:'e06', cat:'entrada', title:'Scale-in com mola',
  desc:'Curva que passa do destino e volta — dá "peso" ao elemento.',
  tags:['cubic-bezier','spring','scale','anime.js'],
  html:`
    <div class="e06">
      <div class="e06-c"><span>✓</span><b>Pedido confirmado</b><small>chega em 3 dias</small></div>
    </div>`,
  css:`
    .e06-c{width:210px;padding:22px;border-radius:14px;background:#1d1b16;border:1px solid #2e2a22;
      text-align:center;transform:scale(.86);opacity:0}
    .e06-c span{display:grid;place-items:center;width:40px;height:40px;margin:0 auto 10px;
      border-radius:50%;background:#5cc88f;color:#062b1f;font-weight:800}
    .e06-c b{display:block;font-size:14px;color:#f0ede7}
    .e06-c small{color:#7d7871;font-size:12px}`,
  js:function(root,ctx){
    var el = root.querySelector('.e06-c');
    anime({
      targets: el,
      scale: [.86,1],
      opacity: [0,1],
      duration: 720,
      delay: 100,
      easing: 'cubicBezier(.34,1.56,.64,1)'
    });
    ctx.clean(function(){ anime.remove(el); });
  }
},

{
  id:'e07', cat:'entrada', title:'Card com rotação 3D',
  desc:'perspective + rotateX. O card "tomba" para a posição final.',
  tags:['perspective','rotateX','3D','anime.js'],
  html:`
    <div class="e07">
      <div class="e07-c"><div class="e07-h"></div><b>Relatório mensal</b><i></i><i class="s"></i></div>
    </div>`,
  css:`
    .e07{perspective:900px}
    .e07-c{width:210px;padding:16px;border-radius:12px;background:#181822;border:1px solid #2b2721;
      transform-origin:50% 100%;opacity:0;transform:rotateX(-42deg) translateY(18px)}
    .e07-h{height:64px;border-radius:8px;background:linear-gradient(120deg,#3c3050,#2b2415);margin-bottom:12px}
    .e07-c b{font-size:13.5px;color:#e6e6f0}
    .e07-c i{display:block;height:7px;border-radius:99px;background:#282419;margin-top:9px}
    .e07-c i.s{width:55%}`,
  js:function(root,ctx){
    var el = root.querySelector('.e07-c');
    anime({
      targets: el,
      rotateX: [-42,0],
      translateY: [18,0],
      opacity: [0,1],
      duration: 900,
      delay: 100,
      easing: 'cubicBezier(.22,1,.36,1)'
    });
    ctx.clean(function(){ anime.remove(el); });
  }
},

{
  id:'e08', cat:'entrada', title:'Reveal linha a linha',
  desc:'Quebra o parágrafo em linhas reais e revela cada uma com atraso.',
  tags:['split','lines','JS','anime.js'],
  html:`<p class="e08">Tipografia animada não é enfeite: é ritmo de leitura. Ao revelar linha a linha, você controla a velocidade com que a ideia entra na cabeça de quem lê.</p>`,
  css:`
    .e08{max-width:270px;font-size:14px;line-height:1.75;color:#cdc8bd;margin:0 auto}
    .e08 .ln{display:block;overflow:hidden}
    .e08 .ln>span{display:block;transform:translateY(105%);opacity:0}`,
  js:function(root,ctx){
    var p = root.querySelector('.e08');
    var words = p.textContent.trim().split(/\s+/);
    p.innerHTML = words.map(function(w){ return '<span class="w">' + w + '</span>'; }).join(' ');

    // agrupa palavras pela posição vertical → linhas reais do layout
    var lines = [], last = null;
    p.querySelectorAll('.w').forEach(function(w){
      var top = w.offsetTop;
      if (top !== last){ lines.push([]); last = top; }
      lines[lines.length-1].push(w.textContent);
    });
    p.innerHTML = lines.map(function(l){
      return '<span class="ln"><span>' + l.join(' ') + '</span></span>';
    }).join('');

    var spans = p.querySelectorAll('.ln>span');
    anime({
      targets: spans,
      translateY: ['105%','0%'],
      opacity: [0,1],
      duration: 800,
      delay: anime.stagger(90),
      easing: 'cubicBezier(.22,1,.36,1)'
    });
    ctx.clean(function(){ anime.remove(spans); });
  }
},

{
  id:'e09', cat:'entrada', title:'Palavra a palavra / letra a letra',
  desc:'Split manual de texto: cada token vira um alvo do anime.stagger.',
  tags:['split text','stagger','JS','anime.js'],
  html:`
    <div class="e09">
      <h4 data-split="word">Movimento com propósito</h4>
      <p data-split="char">letra por letra</p>
    </div>`,
  css:`
    .e09{text-align:center}
    .e09 h4{font-size:22px;font-weight:800;letter-spacing:-.03em;color:#eee}
    .e09 p{margin-top:10px;font-size:13px;color:#d4af37;font-family:var(--mono)}
    .e09 u{display:inline-block;text-decoration:none;opacity:0;transform:translateY(14px) rotate(4deg)}`,
  js:function(root,ctx){
    var alvos = [];
    root.querySelectorAll('[data-split]').forEach(function(el, k){
      var mode = el.dataset.split, txt = el.textContent, out = '';
      var parts = mode === 'word' ? txt.split(' ') : txt.split('');
      parts.forEach(function(p){
        var sep = mode === 'word' ? '&nbsp;' : '';
        out += '<u>' + (p === ' ' ? '&nbsp;' : p) + '</u>' + sep;
      });
      el.innerHTML = out;
      var us = el.querySelectorAll('u');
      alvos.push(us);
      anime({
        targets: us,
        opacity: [0,1],
        translateY: [14,0],
        rotate: [4,0],
        duration: 600,
        delay: anime.stagger(mode === 'word' ? 90 : 32, { start: k * 380 }),
        easing: 'cubicBezier(.22,1,.36,1)'
      });
    });
    ctx.clean(function(){ alvos.forEach(function(a){ anime.remove(a); }); });
  }
},

{
  id:'e10', cat:'entrada', title:'Draw-on de SVG',
  desc:'anime.setDashoffset + strokeDashoffset: o traço se desenha sozinho.',
  tags:['SVG','stroke-dasharray','path','anime.js'],
  html:`
    <svg class="e10" viewBox="0 0 200 120" fill="none">
      <path class="p1" d="M12 96 C 46 96, 44 24, 78 24 S 122 96, 156 96 L 188 96"
            stroke="#d4af37" stroke-width="3" stroke-linecap="round"/>
      <path class="p2" d="M12 108 L188 108" stroke="#302b24" stroke-width="2"/>
      <circle class="c" cx="78" cy="24" r="5" fill="#b08ac9"/>
    </svg>`,
  css:`
    .e10{width:210px}
    .e10 .c{opacity:0;transform:scale(0);transform-origin:78px 24px}`,
  js:function(root,ctx){
    var p1 = root.querySelector('.e10 .p1'),
        p2 = root.querySelector('.e10 .p2'),
        c  = root.querySelector('.e10 .c');
    anime({ targets:p1, strokeDashoffset:[anime.setDashoffset,0],
      duration:1600, easing:'cubicBezier(.65,0,.35,1)' });
    anime({ targets:p2, strokeDashoffset:[anime.setDashoffset,0],
      duration:900, easing:'cubicBezier(.65,0,.35,1)' });
    anime({ targets:c, opacity:[0,1], scale:[0,1], duration:500, delay:1100, easing:'easeOutQuad' });
    ctx.clean(function(){ anime.remove([p1,p2,c]); });
  }
},

{
  id:'e11', cat:'entrada', title:'Contador numérico',
  desc:'Objeto JS tweenado pelo anime, com update escrevendo o texto.',
  tags:['rAF','easing','counter','anime.js'],
  html:`
    <div class="e11">
      <div><b data-to="1284">0</b><span>usuários</span></div>
      <div><b data-to="98" data-suf="%">0</b><span>satisfação</span></div>
      <div><b data-to="24" data-pre="R$ " data-suf="k">0</b><span>receita</span></div>
    </div>`,
  css:`
    .e11{display:flex;gap:22px;text-align:center}
    .e11 b{display:block;font-size:26px;font-weight:800;letter-spacing:-.03em;
      font-variant-numeric:tabular-nums;color:#f4f1eb}
    .e11 span{font-size:10.5px;text-transform:uppercase;letter-spacing:.09em;color:#736f68}`,
  js:function(root,ctx){
    var objs = [];
    root.querySelectorAll('[data-to]').forEach(function(el){
      var to = +el.dataset.to, pre = el.dataset.pre || '', suf = el.dataset.suf || '';
      var obj = { v: 0 };
      objs.push(obj);
      anime({
        targets: obj,
        v: to,
        duration: 1600,
        easing: 'easeOutQuart',
        update: function(){
          el.textContent = pre + Math.round(obj.v).toLocaleString('pt-BR') + suf;
        }
      });
    });
    ctx.clean(function(){ objs.forEach(function(o){ anime.remove(o); }); });
  }
},

{
  id:'e12', cat:'entrada', title:'Barra de progresso / skill',
  desc:'Largura animada com delay em cascata e número acompanhando.',
  tags:['width','stagger','rAF','anime.js'],
  html:`
    <div class="e12">
      <div class="e12-r" data-v="92"><span>CSS</span><i><b></b></i><em>0%</em></div>
      <div class="e12-r" data-v="78"><span>JS</span><i><b></b></i><em>0%</em></div>
      <div class="e12-r" data-v="64"><span>WebGL</span><i><b></b></i><em>0%</em></div>
    </div>`,
  css:`
    .e12{width:250px;display:flex;flex-direction:column;gap:14px}
    .e12-r{display:grid;grid-template-columns:52px 1fr 38px;align-items:center;gap:10px;font-size:12px}
    .e12-r span{color:#a09b91}
    .e12-r i{height:6px;border-radius:99px;background:#242019;overflow:hidden;display:block}
    .e12-r b{display:block;height:100%;width:0;border-radius:99px;
      background:linear-gradient(90deg,#d4af37,#b08ac9)}
    .e12-r em{font-style:normal;font-family:var(--mono);font-size:11px;color:#736f68;text-align:right}`,
  js:function(root,ctx){
    var alvos = [];
    root.querySelectorAll('.e12-r').forEach(function(r,i){
      var v = +r.dataset.v, bar = r.querySelector('b'), num = r.querySelector('em');
      var obj = { v: 0 };
      alvos.push(bar, obj);
      anime({
        targets: bar,
        width: v + '%',
        duration: 1300,
        delay: 120 + i * 150,
        easing: 'cubicBezier(.22,1,.36,1)'
      });
      anime({
        targets: obj,
        v: v,
        duration: 1300,
        delay: 120 + i * 150,
        easing: 'easeOutCubic',
        update: function(){ num.textContent = Math.round(obj.v) + '%'; }
      });
    });
    ctx.clean(function(){ anime.remove(alvos); });
  }
},

/* ---------- 02 · SCROLL-DRIVEN ---------- */

{
  id:'s01', cat:'scroll', title:'Parallax de camadas',
  desc:'Cada camada anda numa fração da rolagem — anime.set a cada scroll.',
  tags:['parallax','transform','scroll','anime.js'], stage:'scroll', hint:'role ↓',
  html:`
    <div class="s01">
      <div class="s01-sky">
        <div class="s01-l" data-sp="0.15"><i class="m m1"></i><i class="m m2"></i></div>
        <div class="s01-l" data-sp="0.4"><i class="h h1"></i><i class="h h2"></i></div>
        <div class="s01-l" data-sp="0.75"><i class="t"></i><i class="t t2"></i></div>
        <h4 data-sp="-0.25">PARALLAX</h4>
      </div>
      <div class="s01-body">A camada mais distante se move menos. O cérebro lê isso como profundidade.</div>
    </div>`,
  css:`
    .s01-sky{position:sticky;top:0;height:230px;overflow:hidden;
      background:linear-gradient(#171309,#241d10 60%,#322817)}
    .s01-l{position:absolute;inset:0;will-change:transform}
    .s01 .m{position:absolute;bottom:40px;width:150px;height:110px;border-radius:50% 50% 0 0;background:#2c2718}
    .s01 .m1{left:10px}
    .s01 .m2{left:120px;width:190px;height:140px;background:#262114}
    .s01 .h{position:absolute;bottom:24px;width:130px;height:70px;border-radius:50% 50% 0 0;background:#3d3520}
    .s01 .h1{left:-20px}
    .s01 .h2{right:-10px;width:170px;background:#3d352060}
    .s01 .t{position:absolute;bottom:0;left:0;right:0;height:34px;background:#4a4028}
    .s01 .t2{height:14px;background:#5c4f31}
    .s01 h4{position:absolute;left:0;right:0;top:78px;text-align:center;font-size:30px;font-weight:800;
      letter-spacing:.22em;color:#e4dcc9;mix-blend-mode:overlay}
    .s01-body{height:420px;padding:26px 20px;background:#111010;color:#948f86;font-size:13px;line-height:1.7}`,
  js:function(root,ctx){
    var stage = root.closest('.stage');
    var layers = root.querySelectorAll('[data-sp]');
    function onScroll(){
      var y = stage.scrollTop;
      layers.forEach(function(l){
        anime.set(l, { translateY: y * +l.dataset.sp });
      });
    }
    ctx.on(stage, 'scroll', onScroll, { passive:true });
    onScroll();
    ctx.clean(function(){ anime.remove(layers); });
  }
},

{
  id:'s02', cat:'scroll', title:'Header que encolhe',
  desc:'Passou de N px, o Anime.js compacta o header com fundo e blur.',
  tags:['sticky','scroll','header','anime.js'], stage:'scroll flush', hint:'role ↓',
  html:`
    <div class="s02">
      <header class="s02-h"><b>ACME</b><nav><a>Produto</a><a>Preço</a><a>Blog</a></nav><button>Entrar</button></header>
      <div class="s02-c">
        <h5>Role para ver o header compactar</h5>
        <p>O truque é só um limiar de scroll — todo o resto é tween.</p>
        <div class="s02-fill"></div>
      </div>
    </div>`,
  css:`
    .s02{position:relative}
    .s02-h{position:sticky;top:0;z-index:5;display:flex;align-items:center;gap:12px;
      padding:20px 16px;background:rgba(12,12,18,0);border-bottom:1px solid rgba(38,38,47,0)}
    .s02-h b{font-size:17px;letter-spacing:-.02em}
    .s02-h nav{display:flex;gap:12px;margin-left:auto;font-size:11.5px;color:#908b82}
    .s02-h button{font-size:11.5px;padding:6px 12px;border-radius:99px;background:#d4af37;color:#1b1813;font-weight:600}
    .s02-h.small{backdrop-filter:blur(10px)}
    .s02-c{padding:26px 18px 0;background:linear-gradient(#171410,#0d0d12)}
    .s02-c h5{font-size:16px;color:#f1eee8;margin:0 0 8px}
    .s02-c p{font-size:12.5px;color:#85807a;line-height:1.7}
    .s02-fill{height:420px;margin-top:20px;border-radius:10px;
      background:repeating-linear-gradient(#1c1a15 0 26px,#171510 26px 52px)}`,
  js:function(root,ctx){
    var stage = root.closest('.stage'),
        h = root.querySelector('.s02-h'),
        b = h.querySelector('b'),
        btn = h.querySelector('button'),
        small = null;
    function set(on){
      if (on === small) return;
      small = on;
      h.classList.toggle('small', on);
      anime.remove([h,b,btn]);
      anime({ targets:h,
        paddingTop: on ? 9 : 20, paddingBottom: on ? 9 : 20,
        backgroundColor: on ? 'rgba(12,12,18,.82)' : 'rgba(12,12,18,0)',
        borderBottomColor: on ? 'rgba(38,38,47,1)' : 'rgba(38,38,47,0)',
        duration:350, easing:'cubicBezier(.22,1,.36,1)' });
      anime({ targets:b, fontSize: on ? 13.5 : 17, duration:350, easing:'cubicBezier(.22,1,.36,1)' });
      anime({ targets:btn, scale: on ? .9 : 1, duration:350, easing:'cubicBezier(.34,1.56,.64,1)' });
    }
    ctx.on(stage, 'scroll', function(){ set(stage.scrollTop > 40); }, { passive:true });
    set(false);
    ctx.clean(function(){ anime.remove([h,b,btn]); });
  }
},

{
  id:'s03', cat:'scroll', title:'Barra de progresso de leitura',
  desc:'scrollTop / (scrollHeight - clientHeight). Uma linha de matemática.',
  tags:['progress','scroll','%','anime.js'], stage:'scroll flush', hint:'role ↓',
  html:`
    <div class="s03">
      <div class="s03-bar"><i></i></div>
      <div class="s03-pct">0%</div>
      <article>
        <h5>Como escrever para a web</h5>
        <p>Parágrafos curtos. Frases diretas. O leitor decide em três segundos se continua.</p>
        <p>A barra no topo é um contrato visual: ela promete que isso tem fim.</p>
        <p>Quando o usuário sabe quanto falta, ele lê mais. É psicologia básica de esforço percebido.</p>
        <p>Some a barra em telas curtas — indicar progresso do que não é longo só polui.</p>
        <p>Fim.</p>
      </article>
    </div>`,
  css:`
    .s03-bar{position:sticky;top:0;z-index:4;height:3px;background:#1f1c17}
    .s03-bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,#d4af37,#b08ac9,#cf9b6a)}
    .s03-pct{position:sticky;top:12px;float:right;margin-right:12px;z-index:5;
      font-family:var(--mono);font-size:10px;color:#736f68;background:#171510;
      border:1px solid #282419;border-radius:6px;padding:2px 7px}
    .s03 article{padding:18px 18px 40px}
    .s03 h5{font-size:16px;color:#f2efe9;margin:0 0 12px}
    .s03 p{font-size:13px;color:#908b82;line-height:1.85;margin-bottom:14px}`,
  js:function(root,ctx){
    var stage = root.closest('.stage'),
        bar = root.querySelector('.s03-bar i'),
        pct = root.querySelector('.s03-pct');
    function upd(){
      var max = stage.scrollHeight - stage.clientHeight;
      var k = max > 0 ? stage.scrollTop / max : 0;
      anime.set(bar, { width: (k * 100) + '%' });
      pct.textContent = Math.round(k * 100) + '%';
    }
    ctx.on(stage, 'scroll', upd, { passive:true });
    upd();
    ctx.clean(function(){ anime.remove(bar); });
  }
},

{
  id:'s04', cat:'scroll', title:'Sticky scrollytelling',
  desc:'Um painel fixo enquanto os passos passam ao lado — troca tweenada pelo Anime.js.',
  tags:['sticky','IntersectionObserver','storytelling','anime.js'], stage:'scroll flush tall', hint:'role ↓',
  html:`
    <div class="s04">
      <div class="s04-viz"><div class="s04-shape"></div><b class="s04-lbl">01</b></div>
      <div class="s04-steps">
        <div class="s04-st" data-i="0"><b>Coleta</b><p>Os dados brutos chegam sem forma.</p></div>
        <div class="s04-st" data-i="1"><b>Transformação</b><p>Filtramos, normalizamos, agrupamos.</p></div>
        <div class="s04-st" data-i="2"><b>Entrega</b><p>Vira decisão em segundos.</p></div>
      </div>
    </div>`,
  css:`
    .s04{position:relative}
    .s04-viz{position:sticky;top:0;height:150px;display:grid;place-items:center;
      background:radial-gradient(60% 80% at 50% 40%,#1d1a15,#0e0d0c);border-bottom:1px solid #212129}
    .s04-shape{width:70px;height:70px;background:#d4af37;border-radius:8px}
    .s04-lbl{position:absolute;top:12px;left:14px;font-family:var(--mono);font-size:11px;color:#625e57}
    .s04-st{min-height:190px;padding:26px 20px;border-bottom:1px solid #18181f;opacity:.28}
    .s04-st b{font-size:15px;color:#eee}
    .s04-st p{font-size:12.5px;color:#8a857c;margin-top:6px}`,
  js:function(root,ctx){
    var shape = root.querySelector('.s04-shape'),
        lbl   = root.querySelector('.s04-lbl'),
        steps = root.querySelectorAll('.s04-st'),
        cfg = [
          { borderRadius:8,  backgroundColor:'#d4af37', rotate:0,   scale:1 },
          { borderRadius:35, backgroundColor:'#b08ac9', rotate:45,  scale:1.15 },
          { borderRadius:14, backgroundColor:'#5cc88f', rotate:180, scale:.85 }
        ];
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){
        if (e.isIntersecting){
          var i = +e.target.dataset.i;
          lbl.textContent = '0' + (i + 1);
          anime.remove(shape);
          anime({ targets:shape,
            borderRadius:cfg[i].borderRadius, backgroundColor:cfg[i].backgroundColor,
            rotate:cfg[i].rotate, scale:cfg[i].scale,
            duration:700, easing:'cubicBezier(.22,1,.36,1)' });
          anime.remove(steps);
          steps.forEach(function(s){
            anime({ targets:s, opacity: s === e.target ? 1 : .28, duration:500, easing:'linear' });
          });
        }
      });
    }, { root: root.closest('.stage'), rootMargin:'-45% 0px -45% 0px' });
    steps.forEach(function(s){ io.observe(s); });
    ctx.clean(function(){ io.disconnect(); anime.remove(shape); anime.remove(steps); });
  }
},

{
  id:'s05', cat:'scroll', title:'Scroll horizontal',
  desc:'A rolagem vertical vira deslocamento lateral dentro de uma seção presa.',
  tags:['sticky','translateX','pin','anime.js'], stage:'scroll flush', hint:'role ↓',
  html:`
    <div class="s05">
      <div class="s05-pin">
        <div class="s05-track">
          <div class="s05-card">01<span>Briefing</span></div>
          <div class="s05-card">02<span>Conceito</span></div>
          <div class="s05-card">03<span>Design</span></div>
          <div class="s05-card">04<span>Build</span></div>
          <div class="s05-card">05<span>Deploy</span></div>
        </div>
      </div>
    </div>`,
  css:`
    .s05{height:900px;position:relative}
    .s05-pin{position:sticky;top:0;height:230px;overflow:hidden;display:flex;align-items:center;
      background:linear-gradient(120deg,#141312,#171410)}
    .s05-track{display:flex;gap:16px;padding-left:20px;will-change:transform}
    .s05-card{flex:none;width:150px;height:150px;border-radius:14px;padding:14px;
      background:#1c1914;border:1px solid #2b2721;display:flex;flex-direction:column;justify-content:space-between;
      font-family:var(--mono);font-size:11px;color:#736f68}
    .s05-card span{font-family:Inter,sans-serif;font-size:15px;font-weight:600;color:#e8e8f2}
    .s05-card:nth-child(odd){background:linear-gradient(150deg,#2a2417,#1e1a12)}`,
  js:function(root,ctx){
    var stage = root.closest('.stage'),
        sec = root.querySelector('.s05'),
        track = root.querySelector('.s05-track');
    function upd(){
      var max = sec.offsetHeight - stage.clientHeight;
      var k = Math.min(1, Math.max(0, stage.scrollTop / max));
      var dist = track.scrollWidth - stage.clientWidth + 40;
      anime.set(track, { translateX: -k * dist });
    }
    ctx.on(stage, 'scroll', upd, { passive:true });
    upd();
    ctx.clean(function(){ anime.remove(track); });
  }
},

{
  id:'s06', cat:'scroll', title:'Pin + scrub (estilo ScrollTrigger)',
  desc:'Anime.js autoplay:false + seek() amarrado ao progresso do scroll.',
  tags:['scrub','progress','transform','anime.js'], stage:'scroll flush', hint:'role ↓',
  html:`
    <div class="s06">
      <div class="s06-pin">
        <div class="s06-obj"></div>
        <div class="s06-meter"><i></i></div>
        <b class="s06-val">0.00</b>
      </div>
    </div>`,
  css:`
    .s06{height:820px}
    .s06-pin{position:sticky;top:0;height:230px;display:grid;place-items:center;
      background:radial-gradient(70% 70% at 50% 50%,#1a1712,#0d0c0b)}
    .s06-obj{width:82px;height:82px;border-radius:16px;background:linear-gradient(140deg,#d4af37,#b08ac9);
      will-change:transform}
    .s06-meter{position:absolute;left:20px;right:20px;bottom:18px;height:4px;background:#22222c;border-radius:9px}
    .s06-meter i{display:block;height:100%;width:0;border-radius:9px;background:#d4af37}
    .s06-val{position:absolute;top:14px;right:16px;font-family:var(--mono);font-size:11px;color:#736f68}`,
  js:function(root,ctx){
    var stage = root.closest('.stage'),
        sec  = root.querySelector('.s06'),
        obj  = root.querySelector('.s06-obj'),
        bar  = root.querySelector('.s06-meter i'),
        val  = root.querySelector('.s06-val');
    // timeline "scrubada": autoplay:false, o scroll faz seek()
    var tl = anime.timeline({ autoplay:false, easing:'linear', duration:1000 })
      .add({ targets:obj, rotate:360, scale:1.55, borderRadius:'50px',
             filter:['hue-rotate(0deg)','hue-rotate(160deg)'], duration:1000 }, 0)
      .add({ targets:bar, width:'100%', duration:1000 }, 0);
    function upd(){
      var k = Math.min(1, Math.max(0, stage.scrollTop / (sec.offsetHeight - stage.clientHeight)));
      tl.seek(k * tl.duration);
      val.textContent = k.toFixed(2);
    }
    ctx.on(stage, 'scroll', upd, { passive:true });
    upd();
    ctx.clean(function(){ tl.pause(); anime.remove([obj,bar]); });
  }
},

{
  id:'s07', cat:'scroll', title:'Image sequence scrubbing',
  desc:'Frames pré-renderizados num canvas; um tween do anime suaviza o índice do frame.',
  tags:['canvas','frames','scrub','anime.js'], stage:'scroll flush', hint:'role ↓',
  html:`
    <div class="s07">
      <div class="s07-pin"><canvas class="s07-cv" width="420" height="420"></canvas><b class="s07-f">frame 00</b></div>
    </div>`,
  css:`
    .s07{height:1000px}
    .s07-pin{position:sticky;top:0;height:230px;display:grid;place-items:center;background:#08080d}
    .s07-cv{width:210px;height:210px}
    .s07-f{position:absolute;left:14px;top:12px;font-family:var(--mono);font-size:10.5px;color:#66625a}`,
  js:function(root,ctx){
    var stage = root.closest('.stage'),
        sec = root.querySelector('.s07'),
        cv = root.querySelector('.s07-cv'),
        c = cv.getContext('2d'),
        lbl = root.querySelector('.s07-f'),
        N = 48, frames = [];

    // pré-renderiza os frames (na vida real: 48 JPGs pré-carregados)
    for (var i = 0; i < N; i++){
      var off = document.createElement('canvas');
      off.width = off.height = 420;
      drawFrame(off.getContext('2d'), i / (N - 1));
      frames.push(off);
    }
    function drawFrame(g, k){
      g.clearRect(0,0,420,420);
      var cx = 210, cy = 210, R = 120, rot = k * Math.PI * 2;
      for (var r = 0; r < 3; r++){
        g.beginPath();
        for (var a = 0; a <= 64; a++){
          var t = a / 64 * Math.PI * 2;
          var wob = Math.sin(t * 5 + rot * 2 + r) * (10 + r * 6) * (0.4 + k * .9);
          var rad = R - r * 30 + wob;
          var x = cx + Math.cos(t + rot * (1 - r * .2)) * rad;
          var y = cy + Math.sin(t + rot * (1 - r * .2)) * rad;
          a ? g.lineTo(x,y) : g.moveTo(x,y);
        }
        g.closePath();
        g.strokeStyle = ['rgba(212,175,55,.9)','rgba(176,138,201,.75)','rgba(207,155,106,.6)'][r];
        g.lineWidth = 3; g.stroke();
      }
    }
    var st = { f: 0 };  // o anime tweena o índice → scrub com leve inércia
    function draw(){
      var f = Math.min(N - 1, Math.round(st.f));
      c.clearRect(0,0,420,420);
      c.drawImage(frames[f], 0, 0);
      lbl.textContent = 'frame ' + String(f + 1).padStart(2,'0') + '/' + N;
    }
    function upd(){
      var k = Math.min(1, Math.max(0, stage.scrollTop / (sec.offsetHeight - stage.clientHeight)));
      anime.remove(st);
      anime({ targets:st, f: k * (N - 1), duration:120, easing:'linear', update:draw });
    }
    ctx.on(stage, 'scroll', upd, { passive:true });
    draw();
    upd();
    ctx.clean(function(){ anime.remove(st); });
  }
},

{
  id:'s08', cat:'scroll', title:'Texto colorindo no scroll',
  desc:'Cada palavra acende (tween de cor) quando cruza a linha do meio.',
  tags:['scroll','word','opacity','anime.js'], stage:'scroll', hint:'role ↓',
  html:`<p class="s08">Boas animações não pedem atenção. Elas guiam o olho, explicam a hierarquia e desaparecem antes de virar ruído.</p>`,
  css:`
    .s08{padding:120px 20px;font-size:19px;font-weight:700;line-height:1.65;letter-spacing:-.02em}
    .s08 w{color:#302b24}`,
  js:function(root,ctx){
    var stage = root.closest('.stage'), p = root.querySelector('.s08');
    p.innerHTML = p.textContent.trim().split(' ').map(function(w){ return '<w>'+w+'</w>'; }).join(' ');
    var words = p.querySelectorAll('w');
    function upd(){
      var mid = stage.getBoundingClientRect().top + stage.clientHeight * .62;
      words.forEach(function(w){
        var on = w.getBoundingClientRect().top < mid;
        if (w._on === on) return;
        w._on = on;
        anime.remove(w);
        anime({ targets:w, color: on ? '#f5f2ec' : '#302b24', duration:350, easing:'easeOutQuad' });
      });
    }
    ctx.on(stage,'scroll',upd,{ passive:true });
    upd();
    ctx.clean(function(){ anime.remove(words); });
  }
},

{
  id:'s09', cat:'scroll', title:'Stacking cards',
  desc:'Cards sticky que empilham; o de baixo encolhe conforme o próximo cobre.',
  tags:['sticky','stack','scale','anime.js'], stage:'scroll flush', hint:'role ↓',
  html:`
    <div class="s09">
      <div class="s09-c" style="--i:0"><b>Descoberta</b><span>01</span></div>
      <div class="s09-c" style="--i:1"><b>Estratégia</b><span>02</span></div>
      <div class="s09-c" style="--i:2"><b>Execução</b><span>03</span></div>
      <div class="s09-c" style="--i:3"><b>Resultado</b><span>04</span></div>
    </div>`,
  css:`
    .s09{padding:16px 16px 60px;display:flex;flex-direction:column;gap:14px}
    .s09-c{position:sticky;top:calc(14px + var(--i) * 10px);height:120px;padding:18px;border-radius:14px;
      display:flex;align-items:flex-end;justify-content:space-between;
      border:1px solid #2f2b23;box-shadow:0 10px 40px -20px #000;
      transform-origin:50% 0;will-change:transform}
    .s09-c:nth-child(1){background:linear-gradient(140deg,#262013,#171410)}
    .s09-c:nth-child(2){background:linear-gradient(140deg,#362540,#221a14)}
    .s09-c:nth-child(3){background:linear-gradient(140deg,#1e352a,#0d2422)}
    .s09-c:nth-child(4){background:linear-gradient(140deg,#3f2a1d,#2a1713)}
    .s09-c b{font-size:17px;color:#f4f1eb}
    .s09-c span{font-family:var(--mono);font-size:11px;color:#948f86}`,
  js:function(root,ctx){
    var stage = root.closest('.stage'), cards = root.querySelectorAll('.s09-c');
    function upd(){
      var top = stage.getBoundingClientRect().top;
      cards.forEach(function(c,i){
        if (i === cards.length - 1) return;
        var next = cards[i+1].getBoundingClientRect().top - top;
        var mine = c.getBoundingClientRect().top - top;
        var over = Math.min(1, Math.max(0, (mine + 130 - next) / 130));
        anime.set(c, { scale: 1 - over * .07, filter: 'brightness(' + (1 - over * .35) + ')' });
      });
    }
    ctx.on(stage,'scroll',upd,{ passive:true });
    upd();
    ctx.clean(function(){ anime.remove(cards); });
  }
},

{
  id:'s10', cat:'scroll', title:'Hero com zoom no scroll',
  desc:'A imagem cresce e escurece enquanto o conteúdo sobe por cima.',
  tags:['scale','sticky','overlay','anime.js'], stage:'scroll flush', hint:'role ↓',
  html:`
    <div class="s10">
      <div class="s10-pin"><div class="s10-img"></div><div class="s10-sh"></div><h4>MONTANHA</h4></div>
      <div class="s10-next">Conteúdo seguinte sobe por cima do hero.</div>
    </div>`,
  css:`
    .s10-pin{position:sticky;top:0;height:230px;overflow:hidden;display:grid;place-items:center}
    .s10-img{position:absolute;inset:0;will-change:transform;
      background:
        radial-gradient(50% 40% at 70% 20%,#f7d08a55,transparent 60%),
        linear-gradient(#211b10 0 45%,#3a3220 45% 100%);}
    .s10-img::after{content:"";position:absolute;left:-10%;right:-10%;bottom:0;height:58%;
      background:conic-gradient(from 200deg at 50% 100%,#17150f,#3a352a,#17150f);
      clip-path:polygon(0 100%,18% 40%,32% 62%,52% 18%,72% 55%,86% 34%,100% 100%)}
    .s10-sh{position:absolute;inset:0;background:#05050a;opacity:0}
    .s10 h4{position:relative;font-size:24px;letter-spacing:.3em;color:#fff;text-shadow:0 2px 20px #0008}
    .s10-next{height:400px;padding:28px 20px;background:#0d0d13;color:#8a857c;font-size:13px;
      border-top:1px solid #22222c;position:relative;z-index:2}`,
  js:function(root,ctx){
    var stage = root.closest('.stage'),
        img = root.querySelector('.s10-img'),
        sh  = root.querySelector('.s10-sh'),
        h   = root.querySelector('h4');
    function upd(){
      var k = Math.min(1, stage.scrollTop / 230);
      anime.set(img, { scale: 1 + k * .45 });
      anime.set(sh, { opacity: k * .72 });
      anime.set(h, { translateY: k * -40, scale: 1 - k * .12, letterSpacing: (.3 + k * .25) + 'em' });
    }
    ctx.on(stage,'scroll',upd,{ passive:true });
    upd();
    ctx.clean(function(){ anime.remove([img,sh,h]); });
  }
},

{
  id:'s11', cat:'scroll', title:'Scroll snap por seção',
  desc:'CSS puro: cada painel encaixa. Zero JavaScript (nada aqui para o Anime.js tweenar).',
  tags:['scroll-snap','CSS only','anime.js'], stage:'scroll flush', hint:'role ↓',
  html:`
    <div class="s11">
      <section style="--c:#2b2618">01 · Início</section>
      <section style="--c:#362540">02 · Meio</section>
      <section style="--c:#1e352a">03 · Fim</section>
    </div>`,
  css:`
    .stage:has(.s11){scroll-snap-type:y mandatory}
    .s11 section{height:230px;scroll-snap-align:start;display:grid;place-items:center;
      background:var(--c);color:#ece8df;font-size:17px;font-weight:600;letter-spacing:-.02em}`
},

{
  id:'s12', cat:'scroll', title:'Cortina de seção',
  desc:'Um painel sólido sobe revelando a seção seguinte — troca de "cena".',
  tags:['clip','curtain','sticky','anime.js'], stage:'scroll flush', hint:'role ↓',
  html:`
    <div class="s12">
      <div class="s12-pin">
        <div class="s12-a">CENA A</div>
        <div class="s12-b">CENA B</div>
      </div>
    </div>`,
  css:`
    .s12{height:760px}
    .s12-pin{position:sticky;top:0;height:230px;overflow:hidden}
    .s12-a,.s12-b{position:absolute;inset:0;display:grid;place-items:center;font-size:22px;font-weight:800;letter-spacing:.18em}
    .s12-a{background:linear-gradient(140deg,#2e2340,#171210);color:#e0d3bc}
    .s12-b{background:linear-gradient(140deg,#d4af37,#5cc88f);color:#1b1813;
      clip-path:inset(100% 0 0 0);will-change:clip-path}`,
  js:function(root,ctx){
    var stage = root.closest('.stage'),
        sec = root.querySelector('.s12'),
        b = root.querySelector('.s12-b');
    // anime autoplay:false: o scroll faz seek() no tween de clip-path
    var an = anime({ targets:b, clipPath:['inset(100% 0 0 0)','inset(0% 0 0 0)'],
      duration:1000, easing:'linear', autoplay:false });
    function upd(){
      var k = Math.min(1, Math.max(0, stage.scrollTop / (sec.offsetHeight - stage.clientHeight)));
      an.seek(k * an.duration);
    }
    ctx.on(stage,'scroll',upd,{ passive:true });
    upd();
    ctx.clean(function(){ an.pause(); anime.remove(b); });
  }
},

{
  id:'s13', cat:'scroll', title:'CSS scroll-driven (animation-timeline)',
  desc:'A versão CSS usa view(); aqui o progresso na viewport faz seek() num tween do anime.',
  tags:['animation-timeline','view()','CSS only','anime.js'], stage:'scroll', hint:'role ↓',
  html:`
    <div class="s13">
      <div class="s13-sp">CSS puro, sem observer</div>
      <div class="s13-i">Entrando…</div>
      <div class="s13-i">Entrando…</div>
      <div class="s13-i">Entrando…</div>
      <div class="s13-sp"></div>
    </div>`,
  css:`
    .s13{padding:14px}
    .s13-sp{height:140px;display:grid;place-items:center;color:#524e47;font-size:12px;font-family:var(--mono)}
    .s13-i{padding:20px;margin-bottom:14px;border-radius:10px;background:#201d18;border:1px solid #2a2620;
      color:#d7d7e2;font-size:14px;
      opacity:0;transform:translateY(30px) scale(.94);filter:blur(6px)}`,
  js:function(root,ctx){
    var stage = root.closest('.stage'),
        itens = root.querySelectorAll('.s13-i'),
        anims = [];
    itens.forEach(function(el){
      anims.push({
        el: el,
        an: anime({ targets:el,
          opacity:[0,1], translateY:[30,0], scale:[.94,1], filter:['blur(6px)','blur(0px)'],
          duration:1000, easing:'linear', autoplay:false })
      });
    });
    function upd(){
      var r = stage.getBoundingClientRect();
      anims.forEach(function(a){
        var er = a.el.getBoundingClientRect();
        // equivale a animation-range: entry 5% → cover ~42%
        var k = (r.bottom - er.top) / (r.height * .42);
        k = Math.min(1, Math.max(0, k));
        a.an.seek(k * a.an.duration);
      });
    }
    ctx.on(stage,'scroll',upd,{ passive:true });
    upd();
    ctx.clean(function(){
      anims.forEach(function(a){ a.an.pause(); anime.remove(a.el); });
    });
  }
},

/* ---------- 03 · HOVER & MICRO ---------- */

{
  id:'h01', cat:'hover', title:'Botão com preenchimento deslizante',
  desc:'Camada de fill criada por JS: entra por um lado e sai pelo outro no unhover.',
  tags:['::before','transform-origin','CSS only','anime.js'], hint:'passe o mouse',
  html:`<div class="h01"><button class="h01-b"><span>Começar agora</span></button>
        <button class="h01-b alt"><span>De baixo pra cima</span></button></div>`,
  css:`
    .h01{display:flex;flex-direction:column;gap:14px;align-items:center}
    .h01-b{position:relative;overflow:hidden;padding:13px 26px;border-radius:99px;
      border:1px solid #3e3931;color:#e8e8f2;font-size:13.5px;font-weight:600;background:#15151d}
    .h01-b span{position:relative;z-index:2}
    .h01-fill{position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,#d4af37,#b08ac9);
      transform:scaleX(0);pointer-events:none}
    .h01-b.alt .h01-fill{background:#5cc88f;transform:scaleY(0)}`,
  js:function(root,ctx){
    var alvos = [];
    root.querySelectorAll('.h01-b').forEach(function(b){
      var alt = b.classList.contains('alt'),
          fill = document.createElement('i'),
          span = b.querySelector('span');
      fill.className = 'h01-fill';
      b.insertBefore(fill, span);
      alvos.push(fill, span);
      var prop = alt ? 'scaleY' : 'scaleX';
      function go(on){
        anime.remove([fill, span]);
        // entra por um lado, sai pelo outro
        fill.style.transformOrigin = alt ? (on ? 'bottom' : 'top') : (on ? 'left' : 'right');
        var o = { targets:fill, duration:450, easing:'cubicBezier(.65,0,.35,1)' };
        o[prop] = on ? 1 : 0;
        anime(o);
        anime({ targets:span, color: on ? '#0d0c0b' : '#e8e8f2', duration:350, easing:'linear' });
      }
      ctx.on(b,'mouseenter',function(){ go(true); });
      ctx.on(b,'mouseleave',function(){ go(false); });
    });
    ctx.clean(function(){ anime.remove(alvos); });
  }
},

{
  id:'h02', cat:'hover', title:'Botão magnético',
  desc:'O botão persegue o cursor com tweens curtos e volta com mola elástica.',
  tags:['lerp','rAF','pointer','anime.js'], hint:'aproxime o mouse',
  html:`<div class="h02"><button class="h02-b"><b>Magnético</b></button></div>`,
  css:`
    .h02{padding:40px}
    .h02-b{padding:16px 30px;border-radius:99px;background:linear-gradient(120deg,#d4af37,#b08ac9);
      color:#1b1813;font-weight:700;font-size:14px;will-change:transform}
    .h02-b b{display:block;will-change:transform}`,
  js:function(root,ctx){
    var btn = root.querySelector('.h02-b'), inner = btn.querySelector('b'), R = 90;
    ctx.on(root,'mousemove',function(e){
      var r = btn.getBoundingClientRect();
      var dx = e.clientX - (r.left + r.width/2);
      var dy = e.clientY - (r.top  + r.height/2);
      var d = Math.hypot(dx,dy);
      var tx = 0, ty = 0;
      if (d < R + 70){ tx = dx * .38; ty = dy * .5; }
      anime.remove([btn, inner]);
      anime({ targets:btn,   translateX:tx,      translateY:ty,      duration:400, easing:'easeOutQuad' });
      anime({ targets:inner, translateX:tx * .28, translateY:ty * .28, duration:400, easing:'easeOutQuad' });
    });
    ctx.on(root,'mouseleave',function(){
      anime.remove([btn, inner]);
      anime({ targets:[btn,inner], translateX:0, translateY:0, duration:700, easing:'easeOutElastic(1, .5)' });
    });
    ctx.clean(function(){ anime.remove([btn, inner]); });
  }
},

{
  id:'h03', cat:'hover', title:'Underline animado',
  desc:'Três origens diferentes: da esquerda, do centro e "sai e entra".',
  tags:['scaleX','::after','CSS only','anime.js'], hint:'passe o mouse',
  html:`
    <div class="h03">
      <a class="l1">Da esquerda</a>
      <a class="l2">Do centro</a>
      <a class="l3">Sai e volta</a>
    </div>`,
  css:`
    .h03{display:flex;flex-direction:column;gap:16px;font-size:16px;color:#e6e6f0;font-weight:600}
    .h03 a{position:relative;cursor:pointer;width:max-content;padding-bottom:3px}
    .h03-u{position:absolute;left:0;right:0;bottom:0;height:2px;background:#d4af37;transform:scaleX(0)}
    .h03 .l2 .h03-u{background:#b08ac9}
    .h03 .l3 .h03-u{background:#5cc88f}`,
  js:function(root,ctx){
    var alvos = [];
    root.querySelectorAll('.h03 a').forEach(function(a){
      var u = document.createElement('i');
      u.className = 'h03-u';
      a.appendChild(u);
      alvos.push(u);
      var origIn  = a.classList.contains('l2') ? 'center' : 'left';
      var origOut = a.classList.contains('l1') ? 'left'
                  : a.classList.contains('l2') ? 'center' : 'right';
      // l3: entra pela esquerda, sai pela direita ("sai e volta")
      if (a.classList.contains('l3')) origIn = 'left';
      function go(on){
        anime.remove(u);
        u.style.transformOrigin = on ? origIn : origOut;
        anime({ targets:u, scaleX: on ? 1 : 0, duration:400, easing:'cubicBezier(.65,0,.35,1)' });
      }
      ctx.on(a,'mouseenter',function(){ go(true); });
      ctx.on(a,'mouseleave',function(){ go(false); });
    });
    ctx.clean(function(){ anime.remove(alvos); });
  }
},

{
  id:'h04', cat:'hover', title:'Card com tilt 3D',
  desc:'rotateX/rotateY seguem o mouse; a volta é um tween suave do Anime.js.',
  tags:['3D','perspective','pointer','anime.js'], hint:'passe o mouse',
  html:`
    <div class="h04">
      <div class="h04-c">
        <div class="h04-gl"></div>
        <div class="h04-in"><span>PRO</span><b>Plano Studio</b><small>R$ 249 / mês</small></div>
      </div>
    </div>`,
  css:`
    .h04{perspective:800px}
    .h04-c{position:relative;width:190px;height:150px;border-radius:16px;overflow:hidden;
      background:linear-gradient(150deg,#3a3120,#221d13);border:1px solid #34301f;
      transform-style:preserve-3d}
    .h04-gl{position:absolute;inset:-40%;opacity:0;
      background:radial-gradient(circle at var(--x,50%) var(--y,50%),rgba(255,255,255,.22),transparent 45%)}
    .h04-in{position:absolute;inset:0;padding:16px;display:flex;flex-direction:column;justify-content:flex-end;
      transform:translateZ(34px)}
    .h04-in span{position:absolute;top:14px;left:16px;font-family:var(--mono);font-size:10px;color:#d4af37;
      border:1px solid #d4af3755;border-radius:5px;padding:1px 6px}
    .h04-in b{font-size:16px;color:#f4f1eb}
    .h04-in small{color:#908b82;font-size:12px}`,
  js:function(root,ctx){
    var c = root.querySelector('.h04-c'), gl = root.querySelector('.h04-gl');
    ctx.on(c,'mouseenter',function(){
      anime.remove(gl);
      anime({ targets:gl, opacity:1, duration:300, easing:'linear' });
    });
    ctx.on(c,'mousemove',function(e){
      var r = c.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      anime.remove(c);
      anime.set(c, { rotateY:(px - .5) * 22, rotateX:(.5 - py) * 22, scale:1.05 });
      gl.style.setProperty('--x', px * 100 + '%');
      gl.style.setProperty('--y', py * 100 + '%');
    });
    ctx.on(c,'mouseleave',function(){
      anime.remove([c, gl]);
      anime({ targets:c, rotateY:0, rotateX:0, scale:1, duration:500, easing:'cubicBezier(.22,1,.36,1)' });
      anime({ targets:gl, opacity:0, duration:300, easing:'linear' });
    });
    ctx.clean(function(){ anime.remove([c, gl]); });
  }
},

{
  id:'h05', cat:'hover', title:'Spotlight que segue o cursor',
  desc:'Uma CSS var atualizada por JS ilumina a borda e o fundo dos cards.',
  tags:['CSS vars','radial-gradient','grupo','anime.js'], hint:'passe o mouse',
  html:`
    <div class="h05">
      <div class="h05-c"><b>Velocidade</b><p>LCP &lt; 1s</p></div>
      <div class="h05-c"><b>SEO</b><p>Schema pronto</p></div>
      <div class="h05-c"><b>A11y</b><p>WCAG AA</p></div>
      <div class="h05-c"><b>Deploy</b><p>Edge global</p></div>
    </div>`,
  css:`
    .h05{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:14px}
    .h05-c{position:relative;padding:16px;border-radius:12px;background:#1b1915;border:1px solid #262219;
      overflow:hidden}
    .h05-c::before{content:"";position:absolute;inset:0;opacity:var(--on,0);
      background:radial-gradient(180px circle at var(--mx) var(--my),rgba(212,175,55,.14),transparent 60%)}
    .h05-c::after{content:"";position:absolute;inset:0;border-radius:12px;padding:1px;opacity:var(--on,0);
      background:radial-gradient(180px circle at var(--mx) var(--my),rgba(212,175,55,.75),transparent 60%);
      -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
      -webkit-mask-composite:xor;mask-composite:exclude}
    .h05-c b{font-size:14px;color:#f1eee8;position:relative}
    .h05-c p{font-size:12px;color:#85807a;margin-top:3px;position:relative}`,
  js:function(root,ctx){
    var cards = root.querySelectorAll('.h05-c');
    var fade = { v: 0 };  // anime tweena a var --on (os pseudo-elementos herdam)
    function setOn(v){
      anime.remove(fade);
      anime({ targets:fade, v:v, duration:350, easing:'linear',
        update:function(){
          cards.forEach(function(c){ c.style.setProperty('--on', fade.v); });
        } });
    }
    ctx.on(root,'mousemove',function(e){
      cards.forEach(function(c){
        var r = c.getBoundingClientRect();
        c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        c.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
    ctx.on(root,'mouseenter',function(){ setOn(1); });
    ctx.on(root,'mouseleave',function(){ setOn(0); });
    ctx.clean(function(){ anime.remove(fade); });
  }
},

{
  id:'h06', cat:'hover', title:'Troca de texto no hover',
  desc:'Duas cópias empilhadas deslizando juntas dentro de um overflow:hidden.',
  tags:['overflow','translateY','CSS only','anime.js'], hint:'passe o mouse',
  html:`
    <div class="h06">
      <button class="h06-b"><span><i>Baixar PDF</i><i>Vamos lá →</i></span></button>
      <a class="h06-l"><span><i>contato@studio.com</i><i>Copiar e-mail</i></span></a>
    </div>`,
  css:`
    .h06{display:flex;flex-direction:column;gap:16px;align-items:center}
    .h06-b,.h06-l{display:block;padding:13px 24px;border-radius:10px;font-size:13.5px;font-weight:600;cursor:pointer}
    .h06-b{background:#d4af37;color:#1b1813}
    .h06-l{border:1px solid #34301f;color:#e8e5df;font-family:var(--mono);font-size:12.5px}
    .h06 span{display:block;height:1.35em;overflow:hidden;position:relative}
    .h06 i{display:block;height:1.35em;line-height:1.35em;font-style:normal}`,
  js:function(root,ctx){
    var alvos = [];
    root.querySelectorAll('.h06-b,.h06-l').forEach(function(b){
      var is = b.querySelectorAll('i');
      alvos.push(is);
      function go(on){
        anime.remove(is);
        anime({ targets:is, translateY: on ? '-100%' : '0%',
          duration:420, easing:'cubicBezier(.65,0,.35,1)' });
      }
      ctx.on(b,'mouseenter',function(){ go(true); });
      ctx.on(b,'mouseleave',function(){ go(false); });
    });
    ctx.clean(function(){ alvos.forEach(function(a){ anime.remove(a); }); });
  }
},

{
  id:'h07', cat:'hover', title:'Ícones reativos',
  desc:'Rotação, pulso, "wiggle" e desenho de traço — cada um com sua curva.',
  tags:['SVG','rotate','keyframes','anime.js'], hint:'passe o mouse',
  html:`
    <div class="h07">
      <button class="h07-i r"><svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v6h-6"/></svg></button>
      <button class="h07-i p"><svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8z"/></svg></button>
      <button class="h07-i w"><svg viewBox="0 0 24 24"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg></button>
      <button class="h07-i d"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></button>
    </div>`,
  css:`
    .h07{display:flex;gap:14px}
    .h07-i{width:52px;height:52px;display:grid;place-items:center;border-radius:14px;
      background:#1c1a15;border:1px solid #2b2721}
    .h07-i svg{width:22px;height:22px;fill:none;stroke:#ccc7bc;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
    .h07-i.w svg{transform-origin:50% 15%}
    .h07-i.d svg path{stroke-dasharray:30;stroke-dashoffset:0}`,
  js:function(root,ctx){
    var svgs = [], btns = root.querySelectorAll('.h07-i');
    btns.forEach(function(b){
      var svg = b.querySelector('svg');
      svgs.push(svg);
      ctx.on(b,'mouseenter',function(){
        anime.remove(b);
        anime({ targets:b, translateY:-3, backgroundColor:'#242019', borderColor:'#3d3729',
          duration:300, easing:'easeOutQuad' });
        anime.remove(svg);
        if (b.classList.contains('r')){
          anime({ targets:svg, rotate:[0,360], duration:700, easing:'cubicBezier(.65,0,.35,1)' });
        } else if (b.classList.contains('p')){
          anime({ targets:svg,
            scale:[{value:1.3,duration:270},{value:1.12,duration:330}],
            stroke:'#e5645f', fill:'rgba(229,100,95,.13)',
            easing:'cubicBezier(.34,1.56,.64,1)' });
        } else if (b.classList.contains('w')){
          anime({ targets:svg,
            rotate:[{value:14,duration:140},{value:-11,duration:190},{value:0,duration:220}],
            easing:'easeInOutSine' });
        } else {
          var path = svg.querySelector('path');
          anime({ targets:path, strokeDashoffset:[30,0], stroke:'#5cc88f',
            duration:550, easing:'cubicBezier(.65,0,.35,1)' });
        }
      });
      ctx.on(b,'mouseleave',function(){
        anime.remove(b);
        anime({ targets:b, translateY:0, backgroundColor:'#1c1a15', borderColor:'#2b2721',
          duration:300, easing:'easeOutQuad' });
        anime.remove(svg);
        anime.remove(svg.querySelectorAll('path'));
        anime({ targets:svg, rotate:0, scale:1, stroke:'#ccc7bc', fill:'rgba(0,0,0,0)',
          duration:250, easing:'easeOutQuad' });
        var path = svg.querySelector('path');
        if (b.classList.contains('d')) anime.set(path, { strokeDashoffset:0, stroke:'#ccc7bc' });
      });
    });
    ctx.clean(function(){
      anime.remove(btns);
      svgs.forEach(function(s){ anime.remove(s); anime.remove(s.querySelectorAll('path')); });
    });
  }
},

{
  id:'h08', cat:'hover', title:'Zoom dentro da moldura',
  desc:'A imagem escala, a moldura não. Overflow hidden + escala assimétrica.',
  tags:['overflow','scale','mask','anime.js'], hint:'passe o mouse',
  html:`
    <div class="h08">
      <figure class="h08-f"><div class="h08-img a"></div><figcaption>Projeto Aurora</figcaption></figure>
      <figure class="h08-f"><div class="h08-img b"></div><figcaption>Projeto Nebula</figcaption></figure>
    </div>`,
  css:`
    .h08{display:flex;gap:14px}
    .h08-f{margin:0;width:130px;border-radius:12px;overflow:hidden;background:#15120f;cursor:pointer}
    .h08-img{height:110px}
    .h08-img.a{background:conic-gradient(from 40deg,#d4af37,#b08ac9,#cf9b6a,#d4af37)}
    .h08-img.b{background:conic-gradient(from 200deg,#5cc88f,#b8871f,#b08ac9,#5cc88f)}
    .h08-f figcaption{padding:10px 12px;font-size:12px;color:#aca79d}`,
  js:function(root,ctx){
    var alvos = [];
    root.querySelectorAll('.h08-f').forEach(function(f){
      var img = f.querySelector('.h08-img'), cap = f.querySelector('figcaption');
      alvos.push(img, cap);
      function go(on){
        anime.remove([img, cap]);
        anime({ targets:img, scale: on ? 1.18 : 1, rotate: on ? 2 : 0,
          filter: on ? 'saturate(1.3)' : 'saturate(1)',
          duration:800, easing:'cubicBezier(.22,1,.36,1)' });
        anime({ targets:cap, translateX: on ? 4 : 0, color: on ? '#ffffff' : '#aca79d',
          duration:500, easing:'cubicBezier(.22,1,.36,1)' });
      }
      ctx.on(f,'mouseenter',function(){ go(true); });
      ctx.on(f,'mouseleave',function(){ go(false); });
    });
    ctx.clean(function(){ anime.remove(alvos); });
  }
},

{
  id:'h09', cat:'hover', title:'Overlay com clip-path',
  desc:'A cor entra em diagonal e o texto sobe junto — hover de portfólio.',
  tags:['clip-path','overlay','stagger','anime.js'], hint:'passe o mouse',
  html:`
    <div class="h09">
      <div class="h09-c">
        <div class="h09-bg"></div>
        <div class="h09-ov"><b>Ver projeto</b><span>Branding · 2025</span></div>
      </div>
    </div>`,
  css:`
    .h09-c{position:relative;width:220px;height:150px;border-radius:14px;overflow:hidden;cursor:pointer}
    .h09-bg{position:absolute;inset:0;background:linear-gradient(140deg,#3b3320,#3a2a45)}
    .h09-ov{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;
      padding:20px;background:linear-gradient(140deg,#d4af37,#b08ac9);
      clip-path:polygon(0 100%,0 100%,0 100%,0 100%)}
    .h09-ov b{font-size:17px;color:#1b1813;transform:translateY(14px);opacity:0}
    .h09-ov span{font-size:12px;color:#1b1813;transform:translateY(14px);opacity:0}`,
  js:function(root,ctx){
    var c = root.querySelector('.h09-c'),
        ov = root.querySelector('.h09-ov'),
        b = ov.querySelector('b'),
        s = ov.querySelector('span');
    function go(on){
      anime.remove([ov, b, s]);
      anime({ targets:ov,
        clipPath: on ? 'polygon(0 0,100% 0,100% 100%,0 100%)' : 'polygon(0 100%,0 100%,0 100%,0 100%)',
        duration:600, easing:'cubicBezier(.76,0,.24,1)' });
      anime({ targets:b, translateY: on ? 0 : 14, opacity: on ? 1 : 0,
        delay: on ? 120 : 0, duration:500, easing:'cubicBezier(.22,1,.36,1)' });
      anime({ targets:s, translateY: on ? 0 : 14, opacity: on ? 1 : 0,
        delay: on ? 200 : 0, duration:500, easing:'cubicBezier(.22,1,.36,1)' });
    }
    ctx.on(c,'mouseenter',function(){ go(true); });
    ctx.on(c,'mouseleave',function(){ go(false); });
    ctx.clean(function(){ anime.remove([ov, b, s]); });
  }
},

{
  id:'h10', cat:'hover', title:'Cursor customizado (dot + ring)',
  desc:'O ponto acompanha na hora; o anel chega atrasado por tweens curtos do anime.',
  tags:['cursor','lerp','rAF','anime.js'], hint:'mova o mouse aqui',
  html:`
    <div class="h10">
      <span class="h10-dot"></span><span class="h10-ring"></span>
      <p>Mova o mouse dentro deste quadro.<br><b class="h10-t">Passe por cima deste texto.</b></p>
    </div>`,
  css:`
    .h10{position:relative;width:100%;height:100%;display:grid;place-items:center;cursor:none;overflow:hidden}
    .h10 p{text-align:center;color:#948f86;font-size:13px;line-height:2;pointer-events:none}
    .h10-t{color:#f0ede7;font-size:15px;pointer-events:auto}
    .h10-dot,.h10-ring{position:absolute;top:0;left:0;border-radius:50%;pointer-events:none;
      transform:translate(-100px,-100px)}
    .h10-dot{width:6px;height:6px;background:#d4af37;margin:-3px 0 0 -3px}
    .h10-ring{width:34px;height:34px;border:1px solid #d4af3788;margin:-17px 0 0 -17px}`,
  js:function(root,ctx){
    var dot = root.querySelector('.h10-dot'),
        ring = root.querySelector('.h10-ring'),
        t = root.querySelector('.h10-t');
    ctx.on(root,'mousemove',function(e){
      var r = root.getBoundingClientRect();
      var mx = e.clientX - r.left, my = e.clientY - r.top;
      anime.set(dot, { translateX:mx, translateY:my });
      anime.remove(ring);
      // duração curta a cada move = o "atraso" do anel
      anime({ targets:ring, translateX:mx, translateY:my, duration:320, easing:'easeOutQuad' });
    });
    ctx.on(t,'mouseenter',function(){
      anime({ targets:ring, width:64, height:64, marginTop:-32, marginLeft:-32,
        backgroundColor:'rgba(212,175,55,.12)', duration:300, easing:'easeOutQuad' });
    });
    ctx.on(t,'mouseleave',function(){
      anime({ targets:ring, width:34, height:34, marginTop:-17, marginLeft:-17,
        backgroundColor:'rgba(212,175,55,0)', duration:300, easing:'easeOutQuad' });
    });
    ctx.clean(function(){ anime.remove([dot, ring]); });
  }
},

{
  id:'h11', cat:'hover', title:'Cursor que vira rótulo',
  desc:'Ao entrar na mídia o cursor expande e escreve a ação.',
  tags:['cursor','scale','label','anime.js'], hint:'passe sobre o card',
  html:`
    <div class="h11">
      <div class="h11-media"><span>galeria</span></div>
      <div class="h11-cur"><b>Ver<br>projeto</b></div>
    </div>`,
  css:`
    .h11{position:relative;width:100%;height:100%;display:grid;place-items:center;overflow:hidden}
    .h11-media{width:210px;height:140px;border-radius:14px;cursor:none;display:grid;place-items:center;
      background:linear-gradient(140deg,#262013,#3a2a45);color:#8d8677;font-family:var(--mono);font-size:11px;
      letter-spacing:.2em;text-transform:uppercase}
    .h11-cur{position:absolute;top:0;left:0;width:72px;height:72px;margin:-36px 0 0 -36px;border-radius:50%;
      background:#d4af37;color:#1b1813;display:grid;place-items:center;text-align:center;
      font-size:11px;font-weight:700;line-height:1.2;pointer-events:none;
      transform:translate(-200px,-200px) scale(0)}`,
  js:function(root,ctx){
    var m = root.querySelector('.h11-media'), cur = root.querySelector('.h11-cur');
    ctx.on(m,'mouseenter',function(){
      anime.remove(cur);
      anime({ targets:cur, scale:1, duration:350, easing:'cubicBezier(.34,1.56,.64,1)' });
    });
    ctx.on(m,'mouseleave',function(){
      anime.remove(cur);
      anime({ targets:cur, scale:0, duration:350, easing:'cubicBezier(.34,1.56,.64,1)' });
    });
    ctx.on(root,'mousemove',function(e){
      var r = root.getBoundingClientRect();
      anime.remove(cur);
      // um tween curto por move = o cursor persegue com atraso
      anime({ targets:cur,
        translateX: e.clientX - r.left, translateY: e.clientY - r.top,
        duration:280, easing:'easeOutQuad' });
    });
    ctx.clean(function(){ anime.remove(cur); });
  }
},

{
  id:'h12', cat:'hover', title:'Ripple no clique',
  desc:'Um círculo criado no ponto do clique e removido no fim do tween.',
  tags:['ripple','Material','JS','anime.js'], hint:'clique nos botões',
  html:`
    <div class="h12">
      <button class="h12-b">Clique aqui</button>
      <button class="h12-b ghost">E aqui também</button>
    </div>`,
  css:`
    .h12{display:flex;flex-direction:column;gap:14px;align-items:center}
    .h12-b{position:relative;overflow:hidden;padding:14px 30px;border-radius:10px;
      background:#d4af37;color:#1b1813;font-weight:700;font-size:13.5px;isolation:isolate}
    .h12-b.ghost{background:#1d1b16;color:#ece9e3;border:1px solid #34301f}
    .h12-rp{position:absolute;border-radius:50%;background:rgba(255,255,255,.55);
      transform:scale(0);pointer-events:none}
    .h12-b.ghost .h12-rp{background:rgba(212,175,55,.35)}`,
  js:function(root,ctx){
    var vivos = [];
    root.querySelectorAll('.h12-b').forEach(function(b){
      ctx.on(b,'click',function(e){
        var r = b.getBoundingClientRect(),
            d = Math.max(r.width, r.height),
            s = document.createElement('span');
        s.className = 'h12-rp';
        s.style.cssText = 'width:' + d + 'px;height:' + d + 'px;left:' +
          (e.clientX - r.left - d/2) + 'px;top:' + (e.clientY - r.top - d/2) + 'px';
        b.appendChild(s);
        vivos.push(s);
        anime({ targets:s, scale:[0,2.6], opacity:[1,0],
          duration:620, easing:'cubicBezier(.22,1,.36,1)',
          complete:function(){ s.remove(); } });
      });
    });
    ctx.clean(function(){ vivos.forEach(function(s){ anime.remove(s); s.remove(); }); });
  }
},

{
  id:'h13', cat:'hover', title:'Borda em gradiente girando',
  desc:'CSS var de ângulo tweenada em loop pelo anime — a borda gira sem repintar o conteúdo.',
  tags:['@property','conic-gradient','mask','anime.js'], hint:'sempre ativo',
  html:`<div class="h13"><div class="h13-c"><b>Plano Pro</b><span>borda viva</span></div></div>`,
  css:`
    .h13-c{position:relative;width:200px;padding:24px;border-radius:16px;background:#141312;text-align:center}
    .h13-c::before{content:"";position:absolute;inset:0;border-radius:16px;padding:1.5px;
      background:conic-gradient(from var(--h13a,0deg),#d4af37,#b08ac9,#cf9b6a,#5cc88f,#d4af37);
      -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
      -webkit-mask-composite:xor;mask-composite:exclude}
    .h13-c::after{content:"";position:absolute;inset:-2px;border-radius:18px;z-index:-1;filter:blur(14px);opacity:.5;
      background:conic-gradient(from var(--h13a,0deg),#d4af37,#b08ac9,#cf9b6a,#5cc88f,#d4af37)}
    .h13-c b{display:block;font-size:16px;color:#f4f1eb}
    .h13-c span{font-size:12px;color:#85807a}`,
  js:function(root,ctx){
    var c = root.querySelector('.h13-c'), ang = { a: 0 };
    anime({
      targets: ang,
      a: 360,
      duration: 4000,
      loop: true,
      easing: 'linear',
      update: function(){ c.style.setProperty('--h13a', ang.a + 'deg'); }
    });
    ctx.clean(function(){ anime.remove(ang); });
  }
},

{
  id:'h14', cat:'hover', title:'Shine / varredura de luz',
  desc:'Um gradiente inclinado atravessa a superfície no hover.',
  tags:['skew','gradient','CSS only','anime.js'], hint:'passe o mouse',
  html:`
    <div class="h14">
      <div class="h14-c"><b>Cartão Black</b><span>•••• 4429</span></div>
      <button class="h14-b">Assinar</button>
    </div>`,
  css:`
    .h14{display:flex;flex-direction:column;gap:16px;align-items:center}
    .h14-c,.h14-b{position:relative;overflow:hidden}
    .h14-c{width:210px;height:120px;border-radius:14px;padding:18px;
      background:linear-gradient(140deg,#22201a,#0d0d13);border:1px solid #302c24;
      display:flex;flex-direction:column;justify-content:space-between}
    .h14-c b{font-size:14px;color:#f2efe9}
    .h14-c span{font-family:var(--mono);font-size:12px;color:#85807a}
    .h14-b{padding:12px 26px;border-radius:10px;background:#d4af37;color:#1b1813;font-weight:700;font-size:13px}
    .h14-sh{position:absolute;top:0;bottom:0;width:60%;left:-90%;
      background:linear-gradient(100deg,transparent,rgba(255,255,255,.35),transparent);
      transform:skewX(-22deg);pointer-events:none}`,
  js:function(root,ctx){
    var shines = [];
    root.querySelectorAll('.h14-c,.h14-b').forEach(function(el){
      var sh = document.createElement('i');
      sh.className = 'h14-sh';
      el.appendChild(sh);
      shines.push(sh);
      ctx.on(el,'mouseenter',function(){
        anime.remove(sh);
        anime({ targets:sh, left:['-90%','130%'], duration:750, easing:'cubicBezier(.65,0,.35,1)' });
      });
      ctx.on(el,'mouseleave',function(){
        anime.remove(sh);
        anime.set(sh, { left:'-90%' });
      });
    });
    ctx.clean(function(){ anime.remove(shines); });
  }
},

{
  id:'h15', cat:'hover', title:'Tooltip com origem correta',
  desc:'transform-origin no lado certo evita a sensação de "pipoco" aleatório.',
  tags:['tooltip','transform-origin','delay','anime.js'], hint:'passe o mouse',
  html:`
    <div class="h15">
      <span class="h15-t" data-tip="Aparece de baixo">topo</span>
      <span class="h15-t b" data-tip="Aparece de cima">base</span>
      <span class="h15-t r" data-tip="Aparece da esquerda">direita</span>
    </div>`,
  css:`
    .h15{display:flex;gap:12px;align-items:center}
    .h15-t{position:relative;padding:9px 14px;border-radius:9px;background:#1d1b16;border:1px solid #2f2b23;
      font-size:12.5px;color:#cdc8bd;cursor:default}
    .h15-tip{position:absolute;left:50%;bottom:calc(100% + 9px);translate:-50% 0;
      white-space:nowrap;background:#f0ede7;color:#0e0d0c;font-size:11.5px;font-weight:600;
      padding:5px 10px;border-radius:7px;opacity:0;pointer-events:none;
      transform-origin:50% 100%}
    .h15-t.b .h15-tip{bottom:auto;top:calc(100% + 9px);transform-origin:50% 0}
    .h15-t.r .h15-tip{left:auto;right:calc(100% + 9px);bottom:auto;top:50%;translate:0 -50%;
      transform-origin:100% 50%}`,
  js:function(root,ctx){
    var tips = [];
    root.querySelectorAll('.h15-t').forEach(function(t){
      var tip = document.createElement('em');
      tip.className = 'h15-tip';
      tip.style.fontStyle = 'normal';
      tip.textContent = t.dataset.tip;
      t.appendChild(tip);
      tips.push(tip);
      // eixo de entrada conforme o lado do tooltip
      var axis = t.classList.contains('r') ? 'translateX' : 'translateY';
      var from = t.classList.contains('b') ? -6 : 6;
      anime.set(tip, (function(){ var o = { scale:.82 }; o[axis] = from; return o; })());
      ctx.on(t,'mouseenter',function(){
        anime.remove(tip);
        var o = { targets:tip, opacity:1, scale:1, duration:320, easing:'cubicBezier(.34,1.56,.64,1)' };
        o[axis] = 0;
        anime(o);
      });
      ctx.on(t,'mouseleave',function(){
        anime.remove(tip);
        var o = { targets:tip, opacity:0, scale:.82, duration:200, easing:'easeOutQuad' };
        o[axis] = from;
        anime(o);
      });
    });
    ctx.clean(function(){ anime.remove(tips); });
  }
},

/* ---------- 04 · TIPOGRAFIA ---------- */

{
  id:'t01', cat:'texto', title:'Typewriter',
  desc:'Digita, pausa, apaga, troca de frase. Cursor piscando via anime loop.',
  tags:['typing','setTimeout','loop','anime.js'],
  html:`<div class="t01"><span>Eu construo </span><b class="t01-w"></b><i class="t01-c"></i></div>`,
  css:`
    .t01{font-size:18px;font-weight:600;color:#dededf;display:flex;align-items:center;letter-spacing:-.01em}
    .t01-w{color:#d4af37}
    .t01-c{width:2px;height:20px;background:#d4af37;margin-left:3px}`,
  js:function(root,ctx){
    var el = root.querySelector('.t01-w'),
        cur = root.querySelector('.t01-c');
    anime({ targets:cur, opacity:[1,0], duration:900, loop:true, easing:'steps(1)' });
    var words = ['interfaces.','micro-interações.','sites rápidos.','coisas que se movem.'];
    var w = 0, i = 0, del = false;
    (function step(){
      var full = words[w];
      i += del ? -1 : 1;
      el.textContent = full.slice(0, i);
      var wait = del ? 45 : 85;
      if (!del && i === full.length){ del = true; wait = 1400; }
      else if (del && i === 0){ del = false; w = (w + 1) % words.length; wait = 250; }
      ctx.wait(step, wait);
    })();
    ctx.clean(function(){ anime.remove(cur); });
  }
},

{
  id:'t02', cat:'texto', title:'Palavras rotativas',
  desc:'A headline fica; só o substantivo troca, com a caixa acompanhando a largura.',
  tags:['rotate','width','transition','anime.js'],
  html:`
    <div class="t02">
      <h4>Feito para <span class="t02-box"><i class="on">designers</i><i>devs</i><i>agências</i><i>startups</i></span></h4>
    </div>`,
  css:`
    .t02 h4{font-size:21px;font-weight:800;letter-spacing:-.03em;color:#eee;display:flex;gap:8px;align-items:center}
    .t02-box{position:relative;display:inline-block;height:1.3em;overflow:hidden}
    .t02-box i{position:absolute;left:0;top:0;font-style:normal;white-space:nowrap;
      color:#b08ac9;transform:translateY(110%);opacity:0}
    .t02-box i.on{transform:none;opacity:1}`,
  js:function(root,ctx){
    var box = root.querySelector('.t02-box'),
        items = box.querySelectorAll('i'), k = 0;
    anime.set(box, { width: items[k].offsetWidth });
    ctx.every(function(){
      var prev = items[k];
      k = (k + 1) % items.length;
      var next = items[k];
      prev.classList.remove('on'); next.classList.add('on');
      anime.remove([prev, next, box]);
      anime({ targets:prev, translateY:'-110%', opacity:0,
        duration:550, easing:'cubicBezier(.22,1,.36,1)' });
      anime({ targets:next, translateY:['110%','0%'], opacity:[0,1],
        duration:550, easing:'cubicBezier(.22,1,.36,1)' });
      anime({ targets:box, width: next.offsetWidth,
        duration:500, easing:'cubicBezier(.22,1,.36,1)' });
    }, 1900);
    ctx.clean(function(){ anime.remove(items); anime.remove(box); });
  }
},

{
  id:'t03', cat:'texto', title:'Scramble / decrypt',
  desc:'Letras aleatórias que se resolvem da esquerda para a direita.',
  tags:['scramble','rAF','hover','anime.js'], hint:'passe o mouse',
  html:`<div class="t03"><b class="t03-t" data-v="DESCRIPTOGRAFANDO">DESCRIPTOGRAFANDO</b><small>hover para rodar de novo</small></div>`,
  css:`
    .t03{text-align:center}
    .t03-t{font-family:var(--mono);font-size:19px;font-weight:500;color:#5cc88f;letter-spacing:.04em;cursor:pointer}
    .t03 small{display:block;margin-top:10px;font-size:11px;color:#66625a}`,
  js:function(root,ctx){
    var el = root.querySelector('.t03-t'),
        target = el.dataset.v,
        chars = '!<>-_\\\\/[]{}—=+*^?#01',
        driver = { f: 0 };
    function run(){
      var queue = [];
      for (var i = 0; i < target.length; i++){
        queue.push({ to:target[i], start:Math.floor(Math.random()*18), end:Math.floor(Math.random()*18)+18 });
      }
      // o anime avança o "frame" — o update resolve as letras
      anime.remove(driver);
      driver.f = 0;
      anime({ targets:driver, f:40, duration:40*(1000/60), easing:'linear',
        update:function(){
          var frame = driver.f, out = '';
          queue.forEach(function(q){
            if (frame >= q.end){ out += q.to; }
            else if (frame >= q.start){
              if (!q.c || Math.random() < .3) q.c = chars[Math.floor(Math.random()*chars.length)];
              out += '<span style="color:#d4af37">' + q.c + '</span>';
            } else out += ' ';
          });
          el.innerHTML = out;
        } });
    }
    run();
    ctx.on(el,'mouseenter',run);
    ctx.clean(function(){ anime.remove(driver); });
  }
},

{
  id:'t04', cat:'texto', title:'Gradiente animado no texto',
  desc:'background-clip:text com o gradiente deslizando — e uma versão "aurora".',
  tags:['background-clip','gradient','CSS only','anime.js'],
  html:`<div class="t04"><h4 class="a">GRADIENTE VIVO</h4><h4 class="b">aurora boreal</h4></div>`,
  css:`
    .t04{text-align:center;display:flex;flex-direction:column;gap:12px}
    .t04 h4{font-size:26px;font-weight:800;letter-spacing:-.03em;
      -webkit-background-clip:text;background-clip:text;color:transparent}
    .t04 .a{background-image:linear-gradient(90deg,#d4af37,#b08ac9,#cf9b6a,#d4af37);
      background-size:220% 100%}
    .t04 .b{font-size:20px;font-style:italic;
      background-image:radial-gradient(60% 120% at 20% 0%,#5cc88f,transparent 60%),
                       radial-gradient(60% 120% at 80% 100%,#b8871f,transparent 60%),
                       linear-gradient(90deg,#b08ac9,#cf9b6a);
      background-size:180% 180%}`,
  js:function(root,ctx){
    var a = root.querySelector('.t04 .a'), b = root.querySelector('.t04 .b');
    anime({ targets:a, backgroundPosition:['0% 0%','220% 0%'],
      duration:3400, loop:true, easing:'linear' });
    anime({ targets:b, backgroundPosition:['0% 50%','100% 50%'],
      duration:6000, loop:true, direction:'alternate', easing:'easeInOutSine' });
    ctx.clean(function(){ anime.remove([a,b]); });
  }
},

{
  id:'t05', cat:'texto', title:'Marquee infinito',
  desc:'Conteúdo duplicado + translateX de -50%: loop sem emenda. Pausa no hover.',
  tags:['marquee','loop','CSS only','anime.js'], hint:'passe o mouse p/ pausar',
  html:`
    <div class="t05">
      <div class="t05-row"><div class="t05-tr"><span>DESIGN</span><span>·</span><span>MOTION</span><span>·</span><span>CODE</span><span>·</span><span>DESIGN</span><span>·</span><span>MOTION</span><span>·</span><span>CODE</span><span>·</span></div></div>
      <div class="t05-row rev"><div class="t05-tr"><span>2025</span><span>◆</span><span>SÃO PAULO</span><span>◆</span><span>REMOTO</span><span>◆</span><span>2025</span><span>◆</span><span>SÃO PAULO</span><span>◆</span><span>REMOTO</span><span>◆</span></div></div>
    </div>`,
  css:`
    .t05{width:100%;display:flex;flex-direction:column;gap:14px;
      mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}
    .t05-row{overflow:hidden}
    .t05-tr{display:flex;gap:22px;width:max-content}
    .t05-tr span{font-size:20px;font-weight:800;letter-spacing:-.02em;color:#2e2a22;white-space:nowrap}
    .t05-row.rev span{font-size:13px;font-family:var(--mono);font-weight:400;color:#d4af3799}`,
  js:function(root,ctx){
    var t1 = root.querySelector('.t05-row:not(.rev) .t05-tr'),
        t2 = root.querySelector('.t05-row.rev .t05-tr'),
        anims = [
          anime({ targets:t1, translateX:['0%','-50%'], duration:14000, loop:true, easing:'linear' }),
          anime({ targets:t2, translateX:['-50%','0%'], duration:19000, loop:true, easing:'linear' })
        ];
    ctx.on(root,'mouseenter',function(){ anims.forEach(function(a){ a.pause(); }); });
    ctx.on(root,'mouseleave',function(){ anims.forEach(function(a){ a.play(); }); });
    ctx.clean(function(){
      anims.forEach(function(a){ a.pause(); });
      anime.remove([t1,t2]);
    });
  }
},

{
  id:'t06', cat:'texto', title:'Marquee que reage ao scroll',
  desc:'A velocidade base soma o delta da rolagem — e a direção inverte junto.',
  tags:['scroll','velocity','rAF','anime.js'], stage:'scroll flush', hint:'role ↓ rápido',
  html:`
    <div class="t06">
      <div class="t06-pin"><div class="t06-tr"><span>VELOCIDADE&nbsp;·&nbsp;INÉRCIA&nbsp;·&nbsp;RITMO&nbsp;·&nbsp;</span><span>VELOCIDADE&nbsp;·&nbsp;INÉRCIA&nbsp;·&nbsp;RITMO&nbsp;·&nbsp;</span></div></div>
    </div>`,
  css:`
    .t06{height:900px;background:linear-gradient(#0e0d0c,#1a1814)}
    .t06-pin{position:sticky;top:0;height:230px;display:grid;place-items:center;overflow:hidden}
    .t06-tr{display:flex;width:max-content;will-change:transform}
    .t06-tr span{font-size:30px;font-weight:800;letter-spacing:-.03em;color:#d4af37;white-space:nowrap}`,
  js:function(root,ctx){
    var stage = root.closest('.stage'), tr = root.querySelector('.t06-tr');
    var x = 0, last = stage.scrollTop, vel = 0, half = 0;
    ctx.on(stage,'scroll',function(){
      vel += (stage.scrollTop - last) * .9;
      last = stage.scrollTop;
    },{ passive:true });
    // física por frame: o rAF do engine integra, o anime só aplica o estado
    ctx.loop(function(){
      if (!half) half = tr.scrollWidth / 2;
      vel *= .92;
      x -= 0.9 + vel * .1;
      if (half){ if (x <= -half) x += half; if (x > 0) x -= half; }
      anime.set(tr, { translateX:x, skewX: Math.max(-14, Math.min(14, -vel*.25)) });
    });
    ctx.clean(function(){ anime.remove(tr); });
  }
},

{
  id:'t07', cat:'texto', title:'Texto em curva (textPath)',
  desc:'SVG textPath num círculo, girando devagar. Selo clássico.',
  tags:['SVG','textPath','rotate','anime.js'],
  html:`
    <div class="t07">
      <svg viewBox="0 0 200 200" class="t07-s">
        <defs><path id="t07p" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0"/></defs>
        <text><textPath href="#t07p" startOffset="0">DISPONÍVEL PARA PROJETOS · 2025 · DISPONÍVEL PARA PROJETOS · 2025 · </textPath></text>
      </svg>
      <div class="t07-mid">↓</div>
    </div>`,
  css:`
    .t07{position:relative;width:180px;height:180px;display:grid;place-items:center}
    .t07-s{width:180px;height:180px}
    .t07-s text{font-family:var(--mono);font-size:12.5px;letter-spacing:.14em;fill:#b08ac9}
    .t07-mid{position:absolute;width:56px;height:56px;border-radius:50%;background:#d4af37;color:#1b1813;
      display:grid;place-items:center;font-size:22px;font-weight:700}`,
  js:function(root,ctx){
    var s = root.querySelector('.t07-s'), mid = root.querySelector('.t07-mid');
    anime({ targets:s, rotate:'360deg', duration:18000, loop:true, easing:'linear' });
    anime({ targets:mid, translateY:[-3,3], duration:1200, loop:true,
      direction:'alternate', easing:'easeInOutSine' });
    ctx.clean(function(){ anime.remove([s,mid]); });
  }
},

{
  id:'t08', cat:'texto', title:'Glitch',
  desc:'Duas cópias em ciano e magenta deslocadas com clip-path pulando (vars tweenadas em steps).',
  tags:['glitch','clip-path','::before','anime.js'], hint:'passe o mouse',
  html:`<div class="t08"><b class="t08-t" data-t="SYSTEM_ERROR">SYSTEM_ERROR</b></div>`,
  css:`
    .t08-t{position:relative;font-family:var(--mono);font-size:24px;font-weight:600;color:#f0ede7;letter-spacing:.02em;
      cursor:pointer;display:inline-block;transform:translateX(var(--t08x,0px))}
    .t08-t::before,.t08-t::after{content:attr(data-t);position:absolute;left:0;top:0;width:100%;overflow:hidden}
    .t08-t::before{color:#0ff;clip-path:var(--t08ca,inset(0 0 65% 0));transform:var(--t08ta,translate(-2px,-1px));opacity:.85}
    .t08-t::after{color:#f0f;clip-path:var(--t08cb,inset(70% 0 0 0));transform:var(--t08tb,translate(2px,1px));opacity:.85}`,
  js:function(root,ctx){
    var el = root.querySelector('.t08-t'),
        A = [ ['inset(0 0 78% 0)','translate(-4px,-1px)'],
              ['inset(28% 0 40% 0)','translate(4px,1px)'],
              ['inset(66% 0 8% 0)','translate(-3px,0)'] ],
        B = [ ['inset(72% 0 0 0)','translate(4px,1px)'],
              ['inset(38% 0 34% 0)','translate(-4px,-1px)'],
              ['inset(6% 0 74% 0)','translate(3px,0)'] ],
        drv = { k: 0 }, an = null;
    function apply(i){
      el.style.setProperty('--t08ca', A[i][0]);
      el.style.setProperty('--t08ta', A[i][1]);
      el.style.setProperty('--t08cb', B[i][0]);
      el.style.setProperty('--t08tb', B[i][1]);
      el.style.setProperty('--t08x', (i === 1 ? 1 : 0) + 'px');
    }
    ctx.on(el,'mouseenter',function(){
      drv.k = 0;
      an = anime({ targets:drv, k:2, duration:420, loop:true, easing:'steps(2)',
        update:function(){ apply(Math.min(2, Math.round(drv.k))); } });
    });
    ctx.on(el,'mouseleave',function(){
      if (an){ an.pause(); an = null; }
      anime.remove(drv);
      el.style.setProperty('--t08ca','inset(0 0 65% 0)');
      el.style.setProperty('--t08ta','translate(-2px,-1px)');
      el.style.setProperty('--t08cb','inset(70% 0 0 0)');
      el.style.setProperty('--t08tb','translate(2px,1px)');
      el.style.setProperty('--t08x','0px');
    });
    ctx.clean(function(){ if (an) an.pause(); anime.remove(drv); });
  }
},

{
  id:'t09', cat:'texto', title:'Contorno → preenchido',
  desc:'-webkit-text-stroke com o fill entrando por background-size.',
  tags:['text-stroke','background-size','hover','anime.js'], hint:'passe o mouse',
  html:`
    <div class="t09">
      <b class="t09-a">PREENCHER</b>
      <b class="t09-b">DE BAIXO</b>
    </div>`,
  css:`
    .t09{display:flex;flex-direction:column;gap:8px;text-align:center}
    .t09 b{font-size:30px;font-weight:800;letter-spacing:-.02em;cursor:pointer;
      -webkit-text-stroke:1.4px #d4af37;color:transparent;
      background-image:linear-gradient(#d4af37,#d4af37);background-repeat:no-repeat;
      -webkit-background-clip:text;background-clip:text}
    .t09-a{background-size:0% 100%;background-position:left center}
    .t09-b{-webkit-text-stroke-color:#cf9b6a;background-image:linear-gradient(#cf9b6a,#cf9b6a);
      background-size:100% 0%;background-position:left bottom}`,
  js:function(root,ctx){
    var a = root.querySelector('.t09-a'), b = root.querySelector('.t09-b');
    function bind(el, off, on){
      ctx.on(el,'mouseenter',function(){
        anime.remove(el);
        anime({ targets:el, backgroundSize:on, duration:600, easing:'cubicBezier(.65,0,.35,1)' });
      });
      ctx.on(el,'mouseleave',function(){
        anime.remove(el);
        anime({ targets:el, backgroundSize:off, duration:600, easing:'cubicBezier(.65,0,.35,1)' });
      });
    }
    bind(a, '0% 100%', '100% 100%');
    bind(b, '100% 0%', '100% 100%');
    ctx.clean(function(){ anime.remove([a,b]); });
  }
},

{
  id:'t10', cat:'texto', title:'Headline em três tempos',
  desc:'Máscara + escala + peso variável entrando em ordem — timeline do Anime.js.',
  tags:['composição','stagger','letter-spacing','anime.js'],
  html:`
    <div class="t10">
      <span class="t10-k">estúdio independente</span>
      <h4><span class="m"><i>Fazemos marcas</i></span><span class="m"><i>se moverem.</i></span></h4>
      <div class="t10-cta"><button>Ver trabalhos</button><span>desde 2014</span></div>
    </div>`,
  css:`
    .t10{text-align:center;padding:0 16px}
    .t10-k{display:inline-block;font-family:var(--mono);font-size:10px;letter-spacing:.22em;text-transform:uppercase;
      color:#d4af37;opacity:0;transform:translateY(10px)}
    .t10 h4{margin-top:12px;font-size:25px;font-weight:800;letter-spacing:-.04em;color:#f5f2ec}
    .t10 .m{display:block;overflow:hidden}
    .t10 .m i{display:block;font-style:normal;transform:translateY(105%)}
    .t10 .m:nth-child(2) i{color:#b08ac9}
    .t10-cta{margin-top:18px;display:flex;gap:12px;align-items:center;justify-content:center;
      opacity:0;transform:translateY(10px)}
    .t10-cta button{padding:9px 18px;border-radius:99px;background:#f0ede7;color:#0d0c0b;font-size:12.5px;font-weight:700}
    .t10-cta span{font-size:11.5px;color:#726e67}`,
  js:function(root,ctx){
    var k = root.querySelector('.t10-k'),
        lines = root.querySelectorAll('.t10 .m i'),
        cta = root.querySelector('.t10-cta');
    var tl = anime.timeline({ easing:'cubicBezier(.22,1,.36,1)' })
      .add({ targets:k, opacity:[0,1], translateY:[10,0], duration:700 }, 50)
      .add({ targets:lines, translateY:['105%','0%'], duration:950,
             delay:anime.stagger(120) }, 200)
      .add({ targets:cta, opacity:[0,1], translateY:[10,0], duration:800 }, 750);
    ctx.clean(function(){ tl.pause(); anime.remove([k, cta]); anime.remove(lines); });
  }
},

/* ---------- 05 · LOADERS & TRANSIÇÕES ---------- */

{
  id:'l01', cat:'loaders', title:'Preloader com porcentagem',
  desc:'Progresso falso com passos irregulares — parece mais "real" que linear.',
  tags:['loader','counter','rAF','anime.js'], hint:'clique em Replay',
  html:`
    <div class="l01">
      <div class="l01-num">0<small>%</small></div>
      <div class="l01-bar"><i></i></div>
      <div class="l01-lbl">carregando assets…</div>
      <div class="l01-done">pronto ✦</div>
    </div>`,
  css:`
    .l01{width:230px;text-align:center;position:relative}
    .l01-num{font-size:44px;font-weight:800;letter-spacing:-.04em;color:#f4f1eb;font-variant-numeric:tabular-nums}
    .l01-num small{font-size:16px;color:#66625a;margin-left:2px}
    .l01-bar{height:3px;background:#22201a;border-radius:9px;overflow:hidden;margin:12px 0 10px}
    .l01-bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,#d4af37,#b08ac9)}
    .l01-lbl{font-family:var(--mono);font-size:10.5px;color:#66625a;letter-spacing:.06em}
    .l01-done{position:absolute;inset:0;display:grid;place-items:center;font-size:20px;font-weight:700;color:#5cc88f;
      opacity:0;transform:scale(.9)}`,
  js:function(root,ctx){
    var num = root.querySelector('.l01-num'),
        bar = root.querySelector('.l01-bar i'),
        lbl = root.querySelector('.l01-lbl'),
        done = root.querySelector('.l01-done'),
        msgs = ['carregando assets…','decodificando fontes…','montando o layout…','quase lá…'];
    var p = 0;
    (function step(){
      p += Math.random() * 14 + 3;
      if (p > 100) p = 100;
      num.firstChild.nodeValue = Math.floor(p);
      anime.remove(bar);
      anime({ targets:bar, width:p + '%', duration:180, easing:'easeOutQuad' });
      lbl.textContent = msgs[Math.min(3, Math.floor(p / 26))];
      if (p < 100) ctx.wait(step, 120 + Math.random() * 260);
      else ctx.wait(function(){
        anime({ targets:[num,bar.parentNode,lbl], opacity:0, duration:300, easing:'linear' });
        anime({ targets:done, opacity:[0,1], scale:[.9,1],
          duration:500, easing:'cubicBezier(.34,1.56,.64,1)' });
      }, 450);
    })();
    ctx.clean(function(){ anime.remove([num, bar, bar.parentNode, lbl, done]); });
  }
},

{
  id:'l02', cat:'loaders', title:'Cortina de transição',
  desc:'Painéis verticais fecham, o conteúdo troca escondido, e eles abrem.',
  tags:['page transition','stagger','clip','anime.js'], hint:'clique para trocar',
  html:`
    <div class="l02">
      <div class="l02-page"><b>Página A</b><span>clique no botão</span></div>
      <div class="l02-cur"><i></i><i></i><i></i><i></i><i></i></div>
      <button class="l02-go">Navegar →</button>
    </div>`,
  css:`
    .l02{position:relative;width:100%;height:100%;overflow:hidden}
    .l02-page{position:absolute;inset:0;display:grid;place-content:center;text-align:center;gap:6px;
      background:linear-gradient(140deg,#262014,#17140e)}
    .l02-page b{font-size:22px;font-weight:800;color:#eef}
    .l02-page span{font-size:12px;color:#85807a}
    .l02-cur{position:absolute;inset:0;display:flex;pointer-events:none}
    .l02-cur i{flex:1;background:#d4af37;transform:scaleY(0);transform-origin:bottom}
    .l02-go{position:absolute;left:50%;bottom:16px;translate:-50% 0;z-index:3;
      padding:9px 18px;border-radius:99px;background:#f0ede7;color:#0e0d0c;font-size:12px;font-weight:700}`,
  js:function(root,ctx){
    var page = root.querySelector('.l02-page'),
        btn = root.querySelector('.l02-go'),
        panels = root.querySelectorAll('.l02-cur i'),
        pages = [['Página A','clique no botão'],['Página B','conteúdo trocado'],['Página C','sem flash branco']],
        k = 0, busy = false;
    ctx.on(btn,'click',function(){
      if (busy) return;
      busy = true;
      anime.remove(panels);
      panels.forEach(function(p){ p.style.transformOrigin = 'bottom'; });
      anime({ targets:panels, scaleY:[0,1], duration:500,
        delay:anime.stagger(60), easing:'cubicBezier(.76,0,.24,1)' });
      ctx.wait(function(){
        k = (k + 1) % pages.length;
        page.innerHTML = '<b>' + pages[k][0] + '</b><span>' + pages[k][1] + '</span>';
        page.style.background = ['linear-gradient(140deg,#262014,#17140e)',
          'linear-gradient(140deg,#362540,#181310)','linear-gradient(140deg,#1e352a,#0b1f1d)'][k];
        panels.forEach(function(p){ p.style.transformOrigin = 'top'; });
        anime({ targets:panels, scaleY:[1,0], duration:500,
          delay:anime.stagger(60), easing:'cubicBezier(.76,0,.24,1)' });
        ctx.wait(function(){ busy = false; }, 700);
      }, 780);
    });
    ctx.clean(function(){ anime.remove(panels); });
  }
},

{
  id:'l03', cat:'loaders', title:'Crossfade de rota (SPA)',
  desc:'Saída e entrada sobrepostas com deslocamento oposto — padrão do Framer Motion.',
  tags:['SPA','crossfade','router','anime.js'], hint:'troque as abas',
  html:`
    <div class="l03">
      <nav class="l03-nav"><button class="on">Início</button><button>Sobre</button><button>Contato</button></nav>
      <div class="l03-view">
        <section class="l03-p in"><h5>Início</h5><p>Conteúdo da home, com dois blocos entrando em cascata.</p><i></i><i></i></section>
      </div>
    </div>`,
  css:`
    .l03{width:100%;height:100%;display:flex;flex-direction:column}
    .l03-nav{display:flex;gap:4px;padding:12px 14px;border-bottom:1px solid #22222c}
    .l03-nav button{font-size:12px;padding:5px 12px;border-radius:7px;color:#8a857c}
    .l03-nav button.on{background:#201e18;color:#f4f1eb}
    .l03-view{position:relative;flex:1;overflow:hidden}
    .l03-p{position:absolute;inset:0;padding:18px}
    .l03-p h5{font-size:17px;color:#eee;margin-bottom:6px}
    .l03-p p{font-size:12.5px;color:#8a857c;line-height:1.6}
    .l03-p i{display:block;height:8px;border-radius:99px;background:#201e18;margin-top:10px}
    .l03-p i:last-child{width:60%}`,
  js:function(root,ctx){
    var view = root.querySelector('.l03-view'),
        btns = root.querySelectorAll('.l03-nav button'),
        data = {
          'Início':'Conteúdo da home, com dois blocos entrando em cascata.',
          'Sobre':'Somos três pessoas e um gato. O gato revisa o CSS.',
          'Contato':'Responder em até 24h é meta, não promessa.'
        };
    // entrada inicial da primeira página
    anime({ targets:view.querySelector('.l03-p'), opacity:[0,1], translateY:[14,0],
      duration:500, easing:'cubicBezier(.22,1,.36,1)' });
    btns.forEach(function(b){
      ctx.on(b,'click',function(){
        if (b.classList.contains('on')) return;
        btns.forEach(function(x){ x.classList.remove('on'); });
        b.classList.add('on');
        var old = view.querySelector('.l03-p');
        anime.remove(old);
        anime({ targets:old, opacity:0, translateY:-14,
          duration:350, easing:'cubicBezier(.65,0,.35,1)',
          complete:function(){ old.remove(); } });
        var el = document.createElement('section');
        el.className = 'l03-p';
        el.innerHTML = '<h5>' + b.textContent + '</h5><p>' + data[b.textContent] + '</p><i></i><i></i>';
        view.appendChild(el);
        anime({ targets:el, opacity:[0,1], translateY:[14,0],
          duration:500, easing:'cubicBezier(.22,1,.36,1)' });
      });
    });
    ctx.clean(function(){
      view.querySelectorAll('.l03-p').forEach(function(p){ anime.remove(p); });
    });
  }
},

{
  id:'l04', cat:'loaders', title:'Skeleton shimmer',
  desc:'Placeholder com brilho atravessando — reduz a ansiedade de espera.',
  tags:['skeleton','shimmer','loading','anime.js'], hint:'carrega em 2,4s',
  html:`
    <div class="l04">
      <div class="l04-sk">
        <div class="s av"></div>
        <div class="s l1"></div><div class="s l2"></div><div class="s l3"></div>
      </div>
      <div class="l04-real">
        <div class="av"></div>
        <b>Marina Duarte</b>
        <span>Diretora de arte · São Paulo</span>
        <p>Trabalha com identidade visual e motion há 9 anos.</p>
      </div>
    </div>`,
  css:`
    .l04{position:relative;width:240px;height:132px}
    .l04-sk,.l04-real{position:absolute;inset:0;padding:16px;border-radius:12px;background:#191712;border:1px solid #24211a}
    .l04-real{opacity:0}
    .l04-sk .s{background:#1f1c17;border-radius:7px;position:relative;overflow:hidden}
    .l04-sh{position:absolute;inset:0;
      background:linear-gradient(90deg,transparent,rgba(255,255,255,.07),transparent);
      transform:translateX(-100%)}
    .l04-sk .av{width:38px;height:38px;border-radius:50%}
    .l04-sk .l1{height:11px;width:60%;margin-top:14px}
    .l04-sk .l2{height:9px;width:80%;margin-top:9px}
    .l04-sk .l3{height:9px;width:45%;margin-top:9px}
    .l04-real .av{width:38px;height:38px;border-radius:50%;background:linear-gradient(140deg,#d4af37,#b08ac9)}
    .l04-real b{display:block;margin-top:12px;font-size:14px;color:#f4f1eb}
    .l04-real span{font-size:11.5px;color:#d4af37}
    .l04-real p{font-size:11.5px;color:#85807a;margin-top:6px;line-height:1.5}`,
  js:function(root,ctx){
    var sk = root.querySelector('.l04-sk'),
        real = root.querySelector('.l04-real'),
        shines = [];
    root.querySelectorAll('.l04-sk .s').forEach(function(s){
      var sh = document.createElement('i');
      sh.className = 'l04-sh';
      s.appendChild(sh);
      shines.push(sh);
    });
    anime({ targets:shines, translateX:['-100%','100%'],
      duration:1350, loop:true, easing:'easeInOutSine' });
    ctx.wait(function(){
      anime.remove(shines);
      anime({ targets:sk, opacity:0, duration:450, easing:'linear' });
      anime({ targets:real, opacity:1, duration:450, easing:'linear' });
    }, 2400);
    ctx.clean(function(){ anime.remove(shines); anime.remove([sk, real]); });
  }
},

{
  id:'l05', cat:'loaders', title:'Seis spinners em CSS',
  desc:'Ring, dots, bars, orbit, morph e dual-ring — todos como loops do Anime.js.',
  tags:['spinner','keyframes','CSS only','anime.js'],
  html:`
    <div class="l05">
      <div class="sp ring"></div>
      <div class="sp dots"><i></i><i></i><i></i></div>
      <div class="sp bars"><i></i><i></i><i></i><i></i></div>
      <div class="sp orbit"><i></i></div>
      <div class="sp morph"></div>
      <div class="sp dual"></div>
    </div>`,
  css:`
    .l05{display:grid;grid-template-columns:repeat(3,60px);gap:18px;place-items:center}
    .l05 .sp{width:34px;height:34px;display:grid;place-items:center}
    .ring{border:3px solid #2b2721;border-top-color:#d4af37;border-radius:50%}
    .dots{display:flex;gap:5px}
    .dots i{width:8px;height:8px;border-radius:50%;background:#b08ac9;opacity:.4}
    .bars{display:flex;gap:3px;align-items:center}
    .bars i{width:4px;height:22px;border-radius:2px;background:#5cc88f;transform:scaleY(.4)}
    .orbit{border:1px dashed #302c22;border-radius:50%}
    .orbit i{position:absolute;width:9px;height:9px;border-radius:50%;background:#cf9b6a;margin-top:-24px}
    .morph{background:#d4af37;border-radius:6px}
    .dual{border:3px solid transparent;border-top-color:#cf9b6a;border-bottom-color:#d4af37;border-radius:50%}`,
  js:function(root,ctx){
    var ring = root.querySelector('.ring'),
        dots = root.querySelectorAll('.dots i'),
        bars = root.querySelectorAll('.bars i'),
        orbit = root.querySelector('.orbit'),
        morph = root.querySelector('.morph'),
        dual = root.querySelector('.dual');
    anime({ targets:ring, rotate:'360deg', duration:800, loop:true, easing:'linear' });
    anime({ targets:dots, translateY:[{value:-8,duration:450},{value:0,duration:450}],
      opacity:[{value:1,duration:450},{value:.4,duration:450}],
      delay:anime.stagger(150), loop:true, easing:'easeInOutSine' });
    anime({ targets:bars, scaleY:[{value:1,duration:475},{value:.4,duration:475}],
      delay:anime.stagger(120), loop:true, easing:'easeInOutSine' });
    anime({ targets:orbit, rotate:'360deg', duration:2400, loop:true, easing:'linear' });
    anime({ targets:morph,
      borderRadius:[{value:'50%',duration:800},{value:'6px',duration:800}],
      rotate:[{value:180,duration:800},{value:360,duration:800}],
      scale:[{value:.7,duration:800},{value:1,duration:800}],
      loop:true, easing:'easeInOutSine' });
    anime({ targets:dual, rotate:'360deg', duration:1100, loop:true,
      easing:'cubicBezier(.65,0,.35,1)' });
    ctx.clean(function(){
      anime.remove([ring, orbit, morph, dual]);
      anime.remove(dots);
      anime.remove(bars);
    });
  }
},

{
  id:'l06', cat:'loaders', title:'Logo que se desenha',
  desc:'O traço aparece, preenche e a marca assenta no lugar.',
  tags:['SVG','stroke','fill','anime.js'], hint:'clique em Replay',
  html:`
    <div class="l06">
      <svg viewBox="0 0 120 120" class="l06-s">
        <path class="p" d="M60 12 L104 90 L16 90 Z"/>
        <circle class="c" cx="60" cy="66" r="16"/>
      </svg>
      <b class="l06-n">FORMA<span>studio</span></b>
    </div>`,
  css:`
    .l06{display:flex;flex-direction:column;align-items:center;gap:14px}
    .l06-s{width:78px;height:78px;overflow:visible}
    .l06-s .p,.l06-s .c{fill:rgba(212,175,55,0);stroke:#d4af37;stroke-width:3;stroke-linejoin:round}
    .l06-s .c{stroke:#b08ac9}
    .l06-n{font-size:15px;font-weight:800;letter-spacing:.18em;color:#f1eee8;opacity:0}
    .l06-n span{display:block;font-size:9.5px;letter-spacing:.42em;color:#716d66;font-weight:400;text-align:center}`,
  js:function(root,ctx){
    var p = root.querySelector('.l06-s .p'),
        c = root.querySelector('.l06-s .c'),
        n = root.querySelector('.l06-n');
    anime({ targets:p, strokeDashoffset:[anime.setDashoffset,0],
      duration:1500, easing:'cubicBezier(.65,0,.35,1)' });
    anime({ targets:c, strokeDashoffset:[anime.setDashoffset,0],
      duration:1500, delay:350, easing:'cubicBezier(.65,0,.35,1)' });
    anime({ targets:p, fill:'rgba(212,175,55,.13)', duration:800, delay:1350, easing:'linear' });
    anime({ targets:c, fill:'rgba(212,175,55,.13)', duration:800, delay:1600, easing:'linear' });
    anime({ targets:n, opacity:[0,1], letterSpacing:['.34em','.18em'],
      duration:800, delay:1750, easing:'cubicBezier(.22,1,.36,1)' });
    ctx.clean(function(){ anime.remove([p,c,n]); });
  }
},

{
  id:'l07', cat:'loaders', title:'Barra de progresso indeterminada',
  desc:'Quando você não sabe quanto falta: duas barras em fase diferente.',
  tags:['indeterminate','CSS only','loading','anime.js'],
  html:`
    <div class="l07">
      <div class="l07-b"><i></i><i></i></div>
      <div class="l07-t">enviando arquivo…</div>
      <div class="l07-b thin"><i></i></div>
    </div>`,
  css:`
    .l07{width:240px}
    .l07-b{position:relative;height:4px;border-radius:9px;background:#201e18;overflow:hidden}
    .l07-b i{position:absolute;top:0;bottom:0;border-radius:9px;background:#d4af37;left:-35%;right:100%}
    .l07-b i:nth-child(2){background:#b08ac9;left:-200%;right:100%}
    .l07-b.thin{margin-top:16px;height:2px}
    .l07-b.thin i{background:linear-gradient(90deg,transparent,#5cc88f,transparent);
      width:40%;left:0;right:auto;transform:translateX(-110%)}
    .l07-t{margin:10px 0;font-family:var(--mono);font-size:10.5px;color:#66625a}`,
  js:function(root,ctx){
    var b = root.querySelectorAll('.l07-b:not(.thin) i'),
        i1 = b[0], i2 = b[1],
        thin = root.querySelector('.l07-b.thin i');
    anime({ targets:i1,
      left:[{value:'100%', duration:1260}], right:[{value:'-90%', duration:1260}],
      duration:2100, endDelay:840, loop:true, easing:'cubicBezier(.65,.81,.74,1)' });
    anime({ targets:i2,
      left:[{value:'107%', duration:1260}], right:[{value:'-8%', duration:1260}],
      duration:2100, endDelay:840, delay:1150, loop:true, easing:'cubicBezier(.16,.84,.44,1)' });
    anime({ targets:thin, translateX:['-110%','260%'],
      duration:1400, loop:true, easing:'easeInOutSine' });
    ctx.clean(function(){ anime.remove([i1,i2,thin]); });
  }
}

);
