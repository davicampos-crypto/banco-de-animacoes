/* ==========================================================
   ENGINE GSAP — mesmas 57 animações, reimplementadas com GSAP 3
   (global `gsap` via CDN, sem plugins)
   ========================================================== */
(window.ANIMDB = window.ANIMDB || []).push(

{
  id:'e01', cat:'entrada', title:'Fade-in + slide up',
  desc:'O clássico. IntersectionObserver dispara um tween GSAP.',
  tags:['IntersectionObserver','CSS','transition','gsap'], stage:'scroll', hint:'role ↓',
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
      background:#201d18;border:1px solid #2a2620;color:#d7d7e2;font-size:14px}`,
  js:function(root,ctx){
    var items = root.querySelectorAll('.e01-i');
    gsap.set(items, { opacity:0, y:26 });
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        gsap.to(e.target, {
          opacity: e.isIntersecting ? 1 : 0,
          y: e.isIntersecting ? 0 : 26,
          duration:.7, ease:'expo.out', overwrite:'auto'
        });
      });
    }, { root: root.closest('.stage'), threshold: .35 });
    items.forEach(function(el){ io.observe(el); });
    ctx.clean(function(){ io.disconnect(); gsap.killTweensOf(items); });
  }
},

{
  id:'e02', cat:'entrada', title:'Stagger em grid',
  desc:'Mesmo reveal, mas com stagger nativo do GSAP — o olho lê em cascata.',
  tags:['stagger','CSS var','delay','gsap'],
  html:`<div class="e02"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>`,
  css:`
    .e02{display:grid;grid-template-columns:repeat(3,58px);gap:12px}
    .e02 i{width:58px;height:58px;border-radius:12px;
      background:linear-gradient(140deg,#6b5a2e,#3a3120);border:1px solid #7a6733;opacity:0}`,
  js:function(root,ctx){
    var items = root.querySelectorAll('.e02 i');
    gsap.fromTo(items,
      { opacity:0, y:22, scale:.9 },
      { opacity:1, y:0, scale:1, duration:.62, ease:'expo.out', stagger:.07 });
    ctx.clean(function(){ gsap.killTweensOf(items); });
  }
},

{
  id:'e03', cat:'entrada', title:'Reveal por máscara',
  desc:'O texto sobe de dentro de um container com overflow:hidden — tween de yPercent.',
  tags:['overflow','mask','keyframes','gsap'],
  html:`
    <div class="e03">
      <span class="e03-l"><b>Design</b></span>
      <span class="e03-l"><b>em movimento</b></span>
      <span class="e03-l"><b>desde 2014</b></span>
    </div>`,
  css:`
    .e03{text-align:center}
    .e03-l{display:block;overflow:hidden}
    .e03-l b{display:block;font-size:26px;font-weight:800;letter-spacing:-.03em;color:#eaeaf2}
    .e03-l:nth-child(2) b{color:#d4af37}
    .e03-l:nth-child(3) b{font-size:15px;font-weight:400;color:#7f7a73}`,
  js:function(root,ctx){
    var els = root.querySelectorAll('.e03-l b');
    gsap.fromTo(els,
      { yPercent:110 },
      { yPercent:0, duration:.9, ease:'expo.out', stagger:.12 });
    ctx.clean(function(){ gsap.killTweensOf(els); });
  }
},

{
  id:'e04', cat:'entrada', title:'Clip-path wipe',
  desc:'Três variações de recorte: cortina, círculo e diagonal — clipPath tweenado.',
  tags:['clip-path','keyframes','gsap'],
  html:`
    <div class="e04">
      <div class="e04-b e04-a">wipe →</div>
      <div class="e04-b e04-c">círculo</div>
      <div class="e04-b e04-d">diagonal</div>
    </div>`,
  css:`
    .e04{display:flex;flex-direction:column;gap:10px}
    .e04-b{width:200px;padding:14px 18px;border-radius:10px;font-size:13px;color:#0d0c0b;font-weight:600;
      background:linear-gradient(90deg,#d4af37,#b08ac9)}`,
  js:function(root,ctx){
    var tl = gsap.timeline({ defaults:{ ease:'power4.inOut' } });
    tl.fromTo(root.querySelector('.e04-a'),
        { clipPath:'inset(0 100% 0 0)' },
        { clipPath:'inset(0 0% 0 0)', duration:.9 }, 0)
      .fromTo(root.querySelector('.e04-c'),
        { clipPath:'circle(0% at 50% 50%)' },
        { clipPath:'circle(75% at 50% 50%)', duration:1 }, .15)
      .fromTo(root.querySelector('.e04-d'),
        { clipPath:'polygon(0 0,0 0,0 100%,0 100%)' },
        { clipPath:'polygon(0 0,100% 0,100% 100%,0 100%)', duration:1 }, .3);
    ctx.clean(function(){ tl.kill(); });
  }
},

{
  id:'e05', cat:'entrada', title:'Blur-in',
  desc:'De desfocado e transparente para nítido — filter tweenado pelo GSAP.',
  tags:['filter','blur','transition','gsap'],
  html:`<div class="e05"><h4>Nitidez</h4><p>o olho é atraído pelo que entra em foco</p></div>`,
  css:`
    .e05{text-align:center}
    .e05 h4{font-size:30px;font-weight:800;letter-spacing:-.03em;color:#f5f2ec}
    .e05 p{margin-top:8px;color:#8f8a80;font-size:13px}`,
  js:function(root,ctx){
    var el = root.querySelector('.e05');
    gsap.fromTo(el,
      { opacity:0, filter:'blur(16px)', scale:1.06 },
      { opacity:1, filter:'blur(0px)', scale:1, duration:1.1, ease:'expo.out' });
    ctx.clean(function(){ gsap.killTweensOf(el); });
  }
},

{
  id:'e06', cat:'entrada', title:'Scale-in com mola',
  desc:'back.out — passa do destino e volta, dando "peso" ao elemento.',
  tags:['cubic-bezier','spring','scale','gsap'],
  html:`
    <div class="e06">
      <div class="e06-c"><span>✓</span><b>Pedido confirmado</b><small>chega em 3 dias</small></div>
    </div>`,
  css:`
    .e06-c{width:210px;padding:22px;border-radius:14px;background:#1d1b16;border:1px solid #2e2a22;
      text-align:center;opacity:0}
    .e06-c span{display:grid;place-items:center;width:40px;height:40px;margin:0 auto 10px;
      border-radius:50%;background:#5cc88f;color:#062b1f;font-weight:800}
    .e06-c b{display:block;font-size:14px;color:#f0ede7}
    .e06-c small{color:#7d7871;font-size:12px}`,
  js:function(root,ctx){
    var c = root.querySelector('.e06-c');
    gsap.fromTo(c,
      { scale:.86, opacity:0 },
      { scale:1, opacity:1, duration:.72, ease:'back.out(2.2)', delay:.1 });
    ctx.clean(function(){ gsap.killTweensOf(c); });
  }
},

{
  id:'e07', cat:'entrada', title:'Card com rotação 3D',
  desc:'perspective + rotationX. O card "tomba" para a posição final.',
  tags:['perspective','rotateX','3D','gsap'],
  html:`
    <div class="e07">
      <div class="e07-c"><div class="e07-h"></div><b>Relatório mensal</b><i></i><i class="s"></i></div>
    </div>`,
  css:`
    .e07{perspective:900px}
    .e07-c{width:210px;padding:16px;border-radius:12px;background:#181822;border:1px solid #2b2721;
      transform-origin:50% 100%;opacity:0}
    .e07-h{height:64px;border-radius:8px;background:linear-gradient(120deg,#3c3050,#2b2415);margin-bottom:12px}
    .e07-c b{font-size:13.5px;color:#e6e6f0}
    .e07-c i{display:block;height:7px;border-radius:99px;background:#282419;margin-top:9px}
    .e07-c i.s{width:55%}`,
  js:function(root,ctx){
    var c = root.querySelector('.e07-c');
    gsap.fromTo(c,
      { opacity:0, rotationX:-42, y:18 },
      { opacity:1, rotationX:0, y:0, duration:.9, ease:'expo.out', delay:.1 });
    ctx.clean(function(){ gsap.killTweensOf(c); });
  }
},

{
  id:'e08', cat:'entrada', title:'Reveal linha a linha',
  desc:'Quebra o parágrafo em linhas reais e revela cada uma com stagger GSAP.',
  tags:['split','lines','JS','gsap'],
  html:`<p class="e08">Tipografia animada não é enfeite: é ritmo de leitura. Ao revelar linha a linha, você controla a velocidade com que a ideia entra na cabeça de quem lê.</p>`,
  css:`
    .e08{max-width:270px;font-size:14px;line-height:1.75;color:#cdc8bd;margin:0 auto}
    .e08 .ln{display:block;overflow:hidden}
    .e08 .ln>span{display:block}`,
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
    gsap.fromTo(spans,
      { yPercent:105, opacity:0 },
      { yPercent:0, opacity:1, duration:.8, ease:'expo.out', stagger:.09 });
    ctx.clean(function(){ gsap.killTweensOf(spans); });
  }
},

{
  id:'e09', cat:'entrada', title:'Palavra a palavra / letra a letra',
  desc:'Split manual de texto: cada token vira um elemento tweenado com stagger.',
  tags:['split text','stagger','JS','gsap'],
  html:`
    <div class="e09">
      <h4 data-split="word">Movimento com propósito</h4>
      <p data-split="char">letra por letra</p>
    </div>`,
  css:`
    .e09{text-align:center}
    .e09 h4{font-size:22px;font-weight:800;letter-spacing:-.03em;color:#eee}
    .e09 p{margin-top:10px;font-size:13px;color:#d4af37;font-family:var(--mono)}
    .e09 u{display:inline-block;text-decoration:none}`,
  js:function(root,ctx){
    var tweened = [];
    root.querySelectorAll('[data-split]').forEach(function(el, k){
      var mode = el.dataset.split, txt = el.textContent, out = '';
      var parts = mode === 'word' ? txt.split(' ') : txt.split('');
      parts.forEach(function(p){
        var sep = mode === 'word' ? '&nbsp;' : '';
        out += '<u>' + (p === ' ' ? '&nbsp;' : p) + '</u>' + sep;
      });
      el.innerHTML = out;
      var tokens = el.querySelectorAll('u');
      tweened.push(tokens);
      gsap.fromTo(tokens,
        { opacity:0, y:14, rotation:4 },
        { opacity:1, y:0, rotation:0, duration:.6, ease:'expo.out',
          delay: k * .38, stagger: mode === 'word' ? .09 : .032 });
    });
    ctx.clean(function(){ tweened.forEach(function(t){ gsap.killTweensOf(t); }); });
  }
},

{
  id:'e10', cat:'entrada', title:'Draw-on de SVG',
  desc:'stroke-dasharray + dashoffset tweenado: o traço se desenha sozinho.',
  tags:['SVG','stroke-dasharray','path','gsap'],
  html:`
    <svg class="e10" viewBox="0 0 200 120" fill="none">
      <path class="p1" d="M12 96 C 46 96, 44 24, 78 24 S 122 96, 156 96 L 188 96"
            stroke="#d4af37" stroke-width="3" stroke-linecap="round"/>
      <path class="p2" d="M12 108 L188 108" stroke="#302b24" stroke-width="2"/>
      <circle class="c" cx="78" cy="24" r="5" fill="#b08ac9"/>
    </svg>`,
  css:`
    .e10{width:210px}`,
  js:function(root,ctx){
    var tl = gsap.timeline();
    root.querySelectorAll('.e10 path').forEach(function(p){
      var len = p.getTotalLength();
      gsap.set(p, { strokeDasharray:len, strokeDashoffset:len });
      tl.to(p, {
        strokeDashoffset:0,
        duration: p.classList.contains('p2') ? .9 : 1.6,
        ease:'power2.inOut'
      }, 0);
    });
    tl.fromTo(root.querySelector('.e10 .c'),
      { opacity:0, scale:0, transformOrigin:'50% 50%' },
      { opacity:1, scale:1, duration:.5, ease:'power1.out' }, 1.1);
    ctx.clean(function(){ tl.kill(); });
  }
},

{
  id:'e11', cat:'entrada', title:'Contador numérico',
  desc:'Tween de um objeto proxy com ease power4.out — o GSAP faz o rAF.',
  tags:['rAF','easing','counter','gsap'],
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
    var proxies = [];
    root.querySelectorAll('[data-to]').forEach(function(el){
      var to = +el.dataset.to, pre = el.dataset.pre || '', suf = el.dataset.suf || '';
      var obj = { v:0 };
      proxies.push(obj);
      gsap.to(obj, {
        v:to, duration:1.6, ease:'power4.out',
        onUpdate:function(){
          el.textContent = pre + Math.round(obj.v).toLocaleString('pt-BR') + suf;
        }
      });
    });
    ctx.clean(function(){ proxies.forEach(function(o){ gsap.killTweensOf(o); }); });
  }
},

{
  id:'e12', cat:'entrada', title:'Barra de progresso / skill',
  desc:'Largura tweenada com delay em cascata e número acompanhando via proxy.',
  tags:['width','stagger','rAF','gsap'],
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
    var alive = [];
    root.querySelectorAll('.e12-r').forEach(function(r,i){
      var v = +r.dataset.v, bar = r.querySelector('b'), num = r.querySelector('em');
      var obj = { v:0 };
      alive.push(bar, obj);
      gsap.to(bar, { width:v + '%', duration:1.3, ease:'expo.out', delay:.12 + i * .15 });
      gsap.to(obj, {
        v:v, duration:1.3, ease:'power3.out', delay:.12 + i * .15,
        onUpdate:function(){ num.textContent = Math.round(obj.v) + '%'; }
      });
    });
    ctx.clean(function(){ alive.forEach(function(t){ gsap.killTweensOf(t); }); });
  }
},

{
  id:'s01', cat:'scroll', title:'Parallax de camadas',
  desc:'Cada camada anda numa fração da rolagem — quickSetter do GSAP.',
  tags:['parallax','transform','scroll','gsap'], stage:'scroll', hint:'role ↓',
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
    var layers = [];
    root.querySelectorAll('[data-sp]').forEach(function(l){
      layers.push({ set: gsap.quickSetter(l, 'y', 'px'), sp: +l.dataset.sp, el: l });
    });
    function onScroll(){
      var y = stage.scrollTop;
      layers.forEach(function(l){ l.set(y * l.sp); });
    }
    ctx.on(stage, 'scroll', onScroll, { passive:true });
    onScroll();
    ctx.clean(function(){ layers.forEach(function(l){ gsap.killTweensOf(l.el); }); });
  }
},

{
  id:'s02', cat:'scroll', title:'Header que encolhe',
  desc:'Passou de N px, um timeline GSAP compacta o header com fundo e blur.',
  tags:['sticky','scroll','header','gsap'], stage:'scroll flush', hint:'role ↓',
  html:`
    <div class="s02">
      <header class="s02-h"><b>ACME</b><nav><a>Produto</a><a>Preço</a><a>Blog</a></nav><button>Entrar</button></header>
      <div class="s02-c">
        <h5>Role para ver o header compactar</h5>
        <p>O truque é só um timeline tocado/revertido num limiar de scroll.</p>
        <div class="s02-fill"></div>
      </div>
    </div>`,
  css:`
    .s02{position:relative}
    .s02-h{position:sticky;top:0;z-index:5;display:flex;align-items:center;gap:12px;
      padding:20px 16px;background:transparent;border-bottom:1px solid transparent}
    .s02-h b{font-size:17px;letter-spacing:-.02em}
    .s02-h nav{display:flex;gap:12px;margin-left:auto;font-size:11.5px;color:#908b82}
    .s02-h button{font-size:11.5px;padding:6px 12px;border-radius:99px;background:#d4af37;color:#1b1813;font-weight:600}
    .s02-c{padding:26px 18px 0;background:linear-gradient(#171410,#0d0d12)}
    .s02-c h5{font-size:16px;color:#f1eee8;margin:0 0 8px}
    .s02-c p{font-size:12.5px;color:#85807a;line-height:1.7}
    .s02-fill{height:420px;margin-top:20px;border-radius:10px;
      background:repeating-linear-gradient(#1c1a15 0 26px,#171510 26px 52px)}`,
  js:function(root,ctx){
    var stage = root.closest('.stage'), h = root.querySelector('.s02-h');
    var tl = gsap.timeline({ paused:true, defaults:{ duration:.35, ease:'expo.out' } });
    tl.to(h, { padding:'9px 16px', backgroundColor:'rgba(12,12,18,.82)',
               borderColor:'#26262f', backdropFilter:'blur(10px)' }, 0)
      .to(h.querySelector('b'), { fontSize:'13.5px' }, 0)
      .to(h.querySelector('button'), { scale:.9, ease:'back.out(2.2)' }, 0);
    ctx.on(stage, 'scroll', function(){
      if (stage.scrollTop > 40) tl.play(); else tl.reverse();
    }, { passive:true });
    ctx.clean(function(){ tl.kill(); });
  }
},

{
  id:'s03', cat:'scroll', title:'Barra de progresso de leitura',
  desc:'scrollTop / (scrollHeight - clientHeight), aplicado com gsap.set.',
  tags:['progress','scroll','%','gsap'], stage:'scroll flush', hint:'role ↓',
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
      gsap.set(bar, { width: (k * 100) + '%' });
      pct.textContent = Math.round(k * 100) + '%';
    }
    ctx.on(stage, 'scroll', upd, { passive:true });
    upd();
    ctx.clean(function(){ gsap.killTweensOf(bar); });
  }
},

{
  id:'s04', cat:'scroll', title:'Sticky scrollytelling',
  desc:'Um painel fixo enquanto os passos passam ao lado — cada passo dispara um tween.',
  tags:['sticky','IntersectionObserver','storytelling','gsap'], stage:'scroll flush tall', hint:'role ↓',
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
        states = [
          { borderRadius:'8px',  backgroundColor:'#d4af37', rotation:0,   scale:1 },
          { borderRadius:'50%',  backgroundColor:'#b08ac9', rotation:45,  scale:1.15 },
          { borderRadius:'14px', backgroundColor:'#5cc88f', rotation:180, scale:.85 }
        ];
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){
        if (e.isIntersecting){
          var i = +e.target.dataset.i;
          gsap.to(shape, Object.assign({ duration:.7, ease:'expo.out', overwrite:'auto' }, states[i]));
          lbl.textContent = '0' + (i + 1);
          steps.forEach(function(s){
            gsap.to(s, { opacity: s === e.target ? 1 : .28, duration:.5, overwrite:'auto' });
          });
        }
      });
    }, { root: root.closest('.stage'), rootMargin:'-45% 0px -45% 0px' });
    steps.forEach(function(s){ io.observe(s); });
    ctx.clean(function(){ io.disconnect(); gsap.killTweensOf(shape); gsap.killTweensOf(steps); });
  }
},

{
  id:'s05', cat:'scroll', title:'Scroll horizontal',
  desc:'A rolagem vertical vira deslocamento lateral dentro de uma seção presa.',
  tags:['sticky','translateX','pin','gsap'], stage:'scroll flush', hint:'role ↓',
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
        track = root.querySelector('.s05-track'),
        setX = gsap.quickSetter(track, 'x', 'px');
    function upd(){
      var max = sec.offsetHeight - stage.clientHeight;
      var k = Math.min(1, Math.max(0, stage.scrollTop / max));
      var dist = track.scrollWidth - stage.clientWidth + 40;
      setX(-k * dist);
    }
    ctx.on(stage, 'scroll', upd, { passive:true });
    upd();
    ctx.clean(function(){ gsap.killTweensOf(track); });
  }
},

{
  id:'s06', cat:'scroll', title:'Pin + scrub (estilo ScrollTrigger)',
  desc:'Timeline pausado com progress() amarrado ao scroll — scrub manual.',
  tags:['scrub','progress','transform','gsap'], stage:'scroll flush', hint:'role ↓',
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
    var tl = gsap.timeline({ paused:true, defaults:{ ease:'none', duration:1 } });
    tl.to(obj, { rotation:360, scale:1.55, borderRadius:'50px', filter:'hue-rotate(160deg)' }, 0)
      .to(bar, { width:'100%' }, 0);
    function upd(){
      var k = Math.min(1, Math.max(0, stage.scrollTop / (sec.offsetHeight - stage.clientHeight)));
      tl.progress(k);
      val.textContent = k.toFixed(2);
    }
    ctx.on(stage, 'scroll', upd, { passive:true });
    upd();
    ctx.clean(function(){ tl.kill(); });
  }
},

{
  id:'s07', cat:'scroll', title:'Image sequence scrubbing',
  desc:'Frames pré-renderizados num canvas, trocados pela posição do scroll (efeito Apple).',
  tags:['canvas','frames','scrub','gsap'], stage:'scroll flush', hint:'role ↓',
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
    // proxy tweenado pelo GSAP faz a suavização entre frames
    var state = { f:0 };
    function draw(){
      var f = Math.min(N - 1, Math.round(state.f));
      c.clearRect(0,0,420,420);
      c.drawImage(frames[f], 0, 0);
      lbl.textContent = 'frame ' + String(f + 1).padStart(2,'0') + '/' + N;
    }
    function upd(){
      var k = Math.min(1, Math.max(0, stage.scrollTop / (sec.offsetHeight - stage.clientHeight)));
      gsap.to(state, { f: k * (N - 1), duration:.12, ease:'none', overwrite:'auto', onUpdate:draw });
    }
    ctx.on(stage, 'scroll', upd, { passive:true });
    draw();
    upd();
    ctx.clean(function(){ gsap.killTweensOf(state); });
  }
},

{
  id:'s08', cat:'scroll', title:'Texto colorindo no scroll',
  desc:'Cada palavra acende quando cruza a linha do meio da viewport.',
  tags:['scroll','word','opacity','gsap'], stage:'scroll', hint:'role ↓',
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
        if (w._on !== on){
          w._on = on;
          gsap.to(w, { color: on ? '#f5f2ec' : '#302b24', duration:.35, overwrite:'auto' });
        }
      });
    }
    ctx.on(stage,'scroll',upd,{ passive:true });
    upd();
    ctx.clean(function(){ gsap.killTweensOf(words); });
  }
},

{
  id:'s09', cat:'scroll', title:'Stacking cards',
  desc:'Cards sticky que empilham; o de baixo encolhe conforme o próximo cobre.',
  tags:['sticky','stack','scale','gsap'], stage:'scroll flush', hint:'role ↓',
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
        gsap.set(c, { scale: 1 - over * .07, filter: 'brightness(' + (1 - over * .35) + ')' });
      });
    }
    ctx.on(stage,'scroll',upd,{ passive:true });
    upd();
    ctx.clean(function(){ gsap.killTweensOf(cards); });
  }
},

{
  id:'s10', cat:'scroll', title:'Hero com zoom no scroll',
  desc:'A imagem cresce e escurece enquanto o conteúdo sobe por cima.',
  tags:['scale','sticky','overlay','gsap'], stage:'scroll flush', hint:'role ↓',
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
    var tl = gsap.timeline({ paused:true, defaults:{ ease:'none', duration:1 } });
    tl.to(img, { scale:1.45 }, 0)
      .to(sh, { opacity:.72 }, 0)
      .to(h, { y:-40, scale:.88, letterSpacing:'.55em' }, 0);
    function upd(){
      tl.progress(Math.min(1, stage.scrollTop / 230));
    }
    ctx.on(stage,'scroll',upd,{ passive:true });
    upd();
    ctx.clean(function(){ tl.kill(); });
  }
},

{
  id:'s11', cat:'scroll', title:'Scroll snap por seção',
  desc:'CSS puro: cada painel encaixa. Zero JavaScript (nem GSAP precisa).',
  tags:['scroll-snap','CSS only','gsap'], stage:'scroll flush', hint:'role ↓',
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
  desc:'Um painel sólido sobe revelando a seção seguinte — clipPath scrubado.',
  tags:['clip','curtain','sticky','gsap'], stage:'scroll flush', hint:'role ↓',
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
    var tl = gsap.timeline({ paused:true });
    tl.fromTo(b, { clipPath:'inset(100% 0% 0% 0%)' },
                 { clipPath:'inset(0% 0% 0% 0%)', duration:1, ease:'none' });
    function upd(){
      tl.progress(Math.min(1, Math.max(0, stage.scrollTop / (sec.offsetHeight - stage.clientHeight))));
    }
    ctx.on(stage,'scroll',upd,{ passive:true });
    upd();
    ctx.clean(function(){ tl.kill(); });
  }
},

{
  id:'s13', cat:'scroll', title:'CSS scroll-driven (animation-timeline)',
  desc:'Versão GSAP do view(): o progresso de entrada de cada item vira progress de um tween.',
  tags:['animation-timeline','view()','CSS only','gsap'], stage:'scroll', hint:'role ↓',
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
      color:#d7d7e2;font-size:14px}`,
  js:function(root,ctx){
    var stage = root.closest('.stage');
    var items = [];
    root.querySelectorAll('.s13-i').forEach(function(el){
      var tl = gsap.timeline({ paused:true });
      tl.fromTo(el,
        { opacity:0, y:30, scale:.94, filter:'blur(6px)' },
        { opacity:1, y:0, scale:1, filter:'blur(0px)', duration:1, ease:'none' });
      items.push({ el:el, tl:tl });
    });
    function upd(){
      var r = stage.getBoundingClientRect();
      items.forEach(function(it){
        // ~ animation-range: entry 5% → cover 42%
        var top = it.el.getBoundingClientRect().top - r.top;
        var k = (r.height - top) / (r.height * .42);
        it.tl.progress(Math.min(1, Math.max(0, k - .05)));
      });
    }
    ctx.on(stage,'scroll',upd,{ passive:true });
    upd();
    ctx.clean(function(){ items.forEach(function(it){ it.tl.kill(); }); });
  }
},

{
  id:'h01', cat:'hover', title:'Botão com preenchimento deslizante',
  desc:'Pseudo-elemento dirigido por CSS var tweenada pelo GSAP — entra por um lado, sai pelo outro.',
  tags:['::before','transform-origin','CSS only','gsap'], hint:'passe o mouse',
  html:`<div class="h01"><button class="h01-b"><span>Começar agora</span></button>
        <button class="h01-b alt"><span>De baixo pra cima</span></button></div>`,
  css:`
    .h01{display:flex;flex-direction:column;gap:14px;align-items:center}
    .h01-b{position:relative;overflow:hidden;padding:13px 26px;border-radius:99px;
      border:1px solid #3e3931;color:#e8e8f2;font-size:13.5px;font-weight:600;background:#15151d}
    .h01-b span{position:relative;z-index:2}
    .h01-b::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#d4af37,#b08ac9);
      transform:scaleX(var(--k,0));transform-origin:var(--o,right)}
    .h01-b.alt::before{background:#5cc88f;transform:scaleY(var(--k,0));transform-origin:var(--o,top)}`,
  js:function(root,ctx){
    root.querySelectorAll('.h01-b').forEach(function(b){
      var alt = b.classList.contains('alt'),
          span = b.querySelector('span');
      ctx.on(b,'mouseenter',function(){
        b.style.setProperty('--o', alt ? 'bottom' : 'left');
        gsap.to(b, { '--k':1, duration:.45, ease:'power3.inOut', overwrite:'auto' });
        gsap.to(span, { color:'#0d0c0b', duration:.35, overwrite:'auto' });
      });
      ctx.on(b,'mouseleave',function(){
        b.style.setProperty('--o', alt ? 'top' : 'right');
        gsap.to(b, { '--k':0, duration:.45, ease:'power3.inOut', overwrite:'auto' });
        gsap.to(span, { color:'#e8e8f2', duration:.35, overwrite:'auto' });
      });
      ctx.clean(function(){ gsap.killTweensOf([b, span]); });
    });
  }
},

{
  id:'h02', cat:'hover', title:'Botão magnético',
  desc:'gsap.quickTo faz o amortecimento; a volta é a mesma mola.',
  tags:['lerp','rAF','pointer','gsap'], hint:'aproxime o mouse',
  html:`<div class="h02"><button class="h02-b"><b>Magnético</b></button></div>`,
  css:`
    .h02{padding:40px}
    .h02-b{padding:16px 30px;border-radius:99px;background:linear-gradient(120deg,#d4af37,#b08ac9);
      color:#1b1813;font-weight:700;font-size:14px;will-change:transform}
    .h02-b b{display:block;will-change:transform}`,
  js:function(root,ctx){
    var btn = root.querySelector('.h02-b'), inner = btn.querySelector('b'), R = 90;
    var bx = gsap.quickTo(btn, 'x', { duration:.5, ease:'power3' }),
        by = gsap.quickTo(btn, 'y', { duration:.5, ease:'power3' }),
        ix = gsap.quickTo(inner, 'x', { duration:.5, ease:'power3' }),
        iy = gsap.quickTo(inner, 'y', { duration:.5, ease:'power3' });
    function move(tx, ty){
      bx(tx); by(ty); ix(tx * .28); iy(ty * .28);
    }
    ctx.on(root,'mousemove',function(e){
      var r = btn.getBoundingClientRect();
      var dx = e.clientX - (r.left + r.width/2);
      var dy = e.clientY - (r.top  + r.height/2);
      if (Math.hypot(dx,dy) < R + 70) move(dx * .38, dy * .5);
      else move(0, 0);
    });
    ctx.on(root,'mouseleave',function(){ move(0, 0); });
    ctx.clean(function(){ gsap.killTweensOf([btn, inner]); });
  }
},

{
  id:'h03', cat:'hover', title:'Underline animado',
  desc:'Três origens diferentes: da esquerda, do centro e "sai e entra".',
  tags:['scaleX','::after','CSS only','gsap'], hint:'passe o mouse',
  html:`
    <div class="h03">
      <a class="l1">Da esquerda</a>
      <a class="l2">Do centro</a>
      <a class="l3">Sai e volta</a>
    </div>`,
  css:`
    .h03{display:flex;flex-direction:column;gap:16px;font-size:16px;color:#e6e6f0;font-weight:600}
    .h03 a{position:relative;cursor:pointer;width:max-content;padding-bottom:3px}
    .h03 a::after{content:"";position:absolute;left:0;right:0;bottom:0;height:2px;background:#d4af37;
      transform:scaleX(var(--u,0));transform-origin:var(--uo,left)}
    .h03 .l2::after{background:#b08ac9}
    .h03 .l3::after{background:#5cc88f}`,
  js:function(root,ctx){
    var conf = {
      l1:{ inO:'left',   outO:'left'  },
      l2:{ inO:'center', outO:'center'},
      l3:{ inO:'left',   outO:'right' }   // sai por um lado, volta pelo outro
    };
    root.querySelectorAll('.h03 a').forEach(function(a){
      var c = conf[a.className];
      a.style.setProperty('--uo', c.outO);
      ctx.on(a,'mouseenter',function(){
        a.style.setProperty('--uo', c.inO);
        gsap.to(a, { '--u':1, duration:.4, ease:'power3.inOut', overwrite:'auto' });
      });
      ctx.on(a,'mouseleave',function(){
        a.style.setProperty('--uo', c.outO);
        gsap.to(a, { '--u':0, duration:.4, ease:'power3.inOut', overwrite:'auto' });
      });
      ctx.clean(function(){ gsap.killTweensOf(a); });
    });
  }
},

{
  id:'h04', cat:'hover', title:'Card com tilt 3D',
  desc:'rotationX/rotationY a partir da posição do mouse + brilho especular; volta com expo.out.',
  tags:['3D','perspective','pointer','gsap'], hint:'passe o mouse',
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
      gsap.to(gl, { opacity:1, duration:.3, overwrite:'auto' });
    });
    ctx.on(c,'mousemove',function(e){
      var r = c.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      gsap.set(c, { rotationY:(px - .5) * 22, rotationX:(.5 - py) * 22, scale:1.05 });
      gl.style.setProperty('--x', px * 100 + '%');
      gl.style.setProperty('--y', py * 100 + '%');
    });
    ctx.on(c,'mouseleave',function(){
      gsap.to(c, { rotationX:0, rotationY:0, scale:1, duration:.5, ease:'expo.out', overwrite:'auto' });
      gsap.to(gl, { opacity:0, duration:.3, overwrite:'auto' });
    });
    ctx.clean(function(){ gsap.killTweensOf([c, gl]); });
  }
},

{
  id:'h05', cat:'hover', title:'Spotlight que segue o cursor',
  desc:'CSS vars atualizadas por JS; o fade do brilho é um tween GSAP.',
  tags:['CSS vars','radial-gradient','grupo','gsap'], hint:'passe o mouse',
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
    ctx.on(root,'mousemove',function(e){
      cards.forEach(function(c){
        var r = c.getBoundingClientRect();
        c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        c.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
    ctx.on(root,'mouseenter',function(){
      gsap.to(cards, { '--on':1, duration:.35, overwrite:'auto' });
    });
    ctx.on(root,'mouseleave',function(){
      gsap.to(cards, { '--on':0, duration:.35, overwrite:'auto' });
    });
    ctx.clean(function(){ gsap.killTweensOf(cards); });
  }
},

{
  id:'h06', cat:'hover', title:'Troca de texto no hover',
  desc:'Duas cópias empilhadas deslizando juntas dentro de um overflow:hidden.',
  tags:['overflow','translateY','CSS only','gsap'], hint:'passe o mouse',
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
    root.querySelectorAll('.h06-b,.h06-l').forEach(function(b){
      var is = b.querySelectorAll('i');
      ctx.on(b,'mouseenter',function(){
        gsap.to(is, { yPercent:-100, duration:.42, ease:'power3.inOut', overwrite:'auto' });
      });
      ctx.on(b,'mouseleave',function(){
        gsap.to(is, { yPercent:0, duration:.42, ease:'power3.inOut', overwrite:'auto' });
      });
      ctx.clean(function(){ gsap.killTweensOf(is); });
    });
  }
},

{
  id:'h07', cat:'hover', title:'Ícones reativos',
  desc:'Rotação, pulso, "wiggle" e desenho de traço — cada um com sua curva GSAP.',
  tags:['SVG','rotate','keyframes','gsap'], hint:'passe o mouse',
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
    .h07-i svg{width:22px;height:22px;fill:none;stroke:#ccc7bc;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}`,
  js:function(root,ctx){
    var anims = {
      r: function(svg){
        return gsap.fromTo(svg, { rotation:0 }, { rotation:360, duration:.7, ease:'power3.inOut' });
      },
      p: function(svg){
        return gsap.timeline()
          .to(svg, { scale:1.3, stroke:'#e5645f', fill:'rgba(229,100,95,.13)', duration:.27, ease:'back.out(2.2)' })
          .to(svg, { scale:1.12, duration:.33 });
      },
      w: function(svg){
        gsap.set(svg, { transformOrigin:'50% 15%' });
        return gsap.timeline()
          .to(svg, { rotation:14, duration:.14, ease:'sine.inOut' })
          .to(svg, { rotation:-11, duration:.19, ease:'sine.inOut' })
          .to(svg, { rotation:0, duration:.22, ease:'sine.inOut' });
      },
      d: function(svg){
        var path = svg.querySelector('path');
        gsap.set(path, { strokeDasharray:30 });
        gsap.to(path, { stroke:'#5cc88f', duration:.25 });
        return gsap.fromTo(path, { strokeDashoffset:30 },
          { strokeDashoffset:0, duration:.55, ease:'power3.inOut' });
      }
    };
    root.querySelectorAll('.h07-i').forEach(function(btn){
      var svg = btn.querySelector('svg'),
          kind = btn.className.replace('h07-i','').trim(),
          run = null;
      ctx.on(btn,'mouseenter',function(){
        gsap.to(btn, { y:-3, backgroundColor:'#242019', borderColor:'#3d3729', duration:.3, overwrite:'auto' });
        if (run) run.kill();
        run = anims[kind](svg);
      });
      ctx.on(btn,'mouseleave',function(){
        gsap.to(btn, { y:0, backgroundColor:'#1c1a15', borderColor:'#2b2721', duration:.3, overwrite:'auto' });
        if (kind === 'p') gsap.to(svg, { scale:1, stroke:'#ccc7bc', fill:'rgba(229,100,95,0)', duration:.3 });
        if (kind === 'd') gsap.to(svg.querySelector('path'), { stroke:'#ccc7bc', duration:.25 });
      });
      ctx.clean(function(){
        if (run) run.kill();
        gsap.killTweensOf([btn, svg, svg.querySelector('path')]);
      });
    });
  }
},

{
  id:'h08', cat:'hover', title:'Zoom dentro da moldura',
  desc:'A imagem escala, a moldura não. Overflow hidden + escala assimétrica.',
  tags:['overflow','scale','mask','gsap'], hint:'passe o mouse',
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
    root.querySelectorAll('.h08-f').forEach(function(f){
      var img = f.querySelector('.h08-img'), cap = f.querySelector('figcaption');
      ctx.on(f,'mouseenter',function(){
        gsap.to(img, { scale:1.18, rotation:2, filter:'saturate(1.3)', duration:.8, ease:'expo.out', overwrite:'auto' });
        gsap.to(cap, { color:'#fff', x:4, duration:.5, ease:'expo.out', overwrite:'auto' });
      });
      ctx.on(f,'mouseleave',function(){
        gsap.to(img, { scale:1, rotation:0, filter:'saturate(1)', duration:.8, ease:'expo.out', overwrite:'auto' });
        gsap.to(cap, { color:'#aca79d', x:0, duration:.5, ease:'expo.out', overwrite:'auto' });
      });
      ctx.clean(function(){ gsap.killTweensOf([img, cap]); });
    });
  }
},

{
  id:'h09', cat:'hover', title:'Overlay com clip-path',
  desc:'A cor entra em diagonal e o texto sobe junto — hover de portfólio.',
  tags:['clip-path','overlay','stagger','gsap'], hint:'passe o mouse',
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
    .h09-ov b{font-size:17px;color:#1b1813;opacity:0}
    .h09-ov span{font-size:12px;color:#1b1813;opacity:0}`,
  js:function(root,ctx){
    var c = root.querySelector('.h09-c'),
        ov = root.querySelector('.h09-ov'),
        b = ov.querySelector('b'),
        s = ov.querySelector('span');
    gsap.set([b, s], { y:14, opacity:0 });
    var tl = gsap.timeline({ paused:true });
    tl.to(ov, { clipPath:'polygon(0 0,100% 0,100% 100%,0 100%)', duration:.6, ease:'power4.inOut' }, 0)
      .to(b,  { y:0, opacity:1, duration:.5, ease:'expo.out' }, .12)
      .to(s,  { y:0, opacity:1, duration:.5, ease:'expo.out' }, .2);
    ctx.on(c,'mouseenter',function(){ tl.play(); });
    ctx.on(c,'mouseleave',function(){ tl.reverse(); });
    ctx.clean(function(){ tl.kill(); });
  }
},

{
  id:'h10', cat:'hover', title:'Cursor customizado (dot + ring)',
  desc:'O ponto acompanha na hora; o anel chega atrasado via gsap.quickTo.',
  tags:['cursor','lerp','rAF','gsap'], hint:'mova o mouse aqui',
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
    var rx = gsap.quickTo(ring, 'x', { duration:.4, ease:'power3' }),
        ry = gsap.quickTo(ring, 'y', { duration:.4, ease:'power3' });
    ctx.on(root,'mousemove',function(e){
      var r = root.getBoundingClientRect();
      var mx = e.clientX - r.left, my = e.clientY - r.top;
      gsap.set(dot, { x:mx, y:my });
      rx(mx); ry(my);
    });
    ctx.on(t,'mouseenter',function(){
      gsap.to(ring, { width:64, height:64, margin:'-32px 0 0 -32px',
        backgroundColor:'rgba(212,175,55,.12)', duration:.3, overwrite:'auto' });
    });
    ctx.on(t,'mouseleave',function(){
      gsap.to(ring, { width:34, height:34, margin:'-17px 0 0 -17px',
        backgroundColor:'rgba(212,175,55,0)', duration:.3, overwrite:'auto' });
    });
    ctx.clean(function(){ gsap.killTweensOf([dot, ring]); });
  }
},

{
  id:'h11', cat:'hover', title:'Cursor que vira rótulo',
  desc:'Ao entrar na mídia o cursor expande e escreve a ação.',
  tags:['cursor','scale','label','gsap'], hint:'passe sobre o card',
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
    var cx = gsap.quickTo(cur, 'x', { duration:.35, ease:'power3' }),
        cy = gsap.quickTo(cur, 'y', { duration:.35, ease:'power3' });
    ctx.on(m,'mouseenter',function(){
      gsap.to(cur, { scale:1, duration:.35, ease:'back.out(2.2)', overwrite:'auto' });
    });
    ctx.on(m,'mouseleave',function(){
      gsap.to(cur, { scale:0, duration:.35, ease:'back.in(1.4)', overwrite:'auto' });
    });
    ctx.on(root,'mousemove',function(e){
      var r = root.getBoundingClientRect();
      cx(e.clientX - r.left); cy(e.clientY - r.top);
    });
    ctx.clean(function(){ gsap.killTweensOf(cur); });
  }
},

{
  id:'h12', cat:'hover', title:'Ripple no clique',
  desc:'Um círculo criado no ponto do clique, tweenado e removido no onComplete.',
  tags:['ripple','Material','JS','gsap'], hint:'clique nos botões',
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
    .h12-rp{position:absolute;border-radius:50%;background:rgba(255,255,255,.55);pointer-events:none}
    .h12-b.ghost .h12-rp{background:rgba(212,175,55,.35)}`,
  js:function(root,ctx){
    root.querySelectorAll('.h12-b').forEach(function(b){
      ctx.on(b,'click',function(e){
        var r = b.getBoundingClientRect(),
            d = Math.max(r.width, r.height),
            s = document.createElement('span');
        s.className = 'h12-rp';
        s.style.cssText = 'width:' + d + 'px;height:' + d + 'px;left:' +
          (e.clientX - r.left - d/2) + 'px;top:' + (e.clientY - r.top - d/2) + 'px';
        b.appendChild(s);
        gsap.fromTo(s, { scale:0, opacity:1 },
          { scale:2.6, opacity:0, duration:.62, ease:'expo.out',
            onComplete:function(){ s.remove(); } });
      });
    });
    ctx.clean(function(){
      root.querySelectorAll('.h12-rp').forEach(function(s){ gsap.killTweensOf(s); s.remove(); });
    });
  }
},

{
  id:'h13', cat:'hover', title:'Borda em gradiente girando',
  desc:'Uma CSS var de ângulo tweenada em loop gira o conic-gradient da borda.',
  tags:['@property','conic-gradient','mask','gsap'], hint:'sempre ativo',
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
    var c = root.querySelector('.h13-c');
    var spin = gsap.fromTo(c, { '--h13a':'0deg' },
      { '--h13a':'360deg', duration:4, ease:'none', repeat:-1 });
    ctx.clean(function(){ spin.kill(); });
  }
},

{
  id:'h14', cat:'hover', title:'Shine / varredura de luz',
  desc:'Um gradiente inclinado atravessa a superfície no hover — left tweenado via CSS var.',
  tags:['skew','gradient','CSS only','gsap'], hint:'passe o mouse',
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
    .h14-c::after,.h14-b::after{content:"";position:absolute;top:0;bottom:0;width:60%;left:var(--sh,-90%);
      background:linear-gradient(100deg,transparent,rgba(255,255,255,.35),transparent);
      transform:skewX(-22deg)}`,
  js:function(root,ctx){
    root.querySelectorAll('.h14-c,.h14-b').forEach(function(el){
      ctx.on(el,'mouseenter',function(){
        gsap.fromTo(el, { '--sh':'-90%' },
          { '--sh':'130%', duration:.75, ease:'power3.inOut', overwrite:'auto' });
      });
      ctx.clean(function(){ gsap.killTweensOf(el); });
    });
  }
},

{
  id:'h15', cat:'hover', title:'Tooltip com origem correta',
  desc:'transform-origin no lado certo evita a sensação de "pipoco" aleatório.',
  tags:['tooltip','transform-origin','delay','gsap'], hint:'passe o mouse',
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
    .h15-t::after{content:attr(data-tip);position:absolute;left:50%;bottom:calc(100% + 9px);translate:-50% 0;
      white-space:nowrap;background:#f0ede7;color:#0e0d0c;font-size:11.5px;font-weight:600;
      padding:5px 10px;border-radius:7px;pointer-events:none;
      opacity:var(--to,0);transform:var(--tt,scale(.82) translateY(6px));transform-origin:50% 100%}
    .h15-t.b::after{bottom:auto;top:calc(100% + 9px);transform-origin:50% 0}
    .h15-t.r::after{left:auto;right:calc(100% + 9px);bottom:auto;top:50%;translate:0 -50%;
      transform-origin:100% 50%}`,
  js:function(root,ctx){
    root.querySelectorAll('.h15-t').forEach(function(t){
      var hidden = t.classList.contains('r') ? 'scale(.82) translateX(6px)' :
                   t.classList.contains('b') ? 'scale(.82) translateY(-6px)' :
                                               'scale(.82) translateY(6px)';
      var shown = hidden.replace('.82','1').replace('6px','0px');
      t.style.setProperty('--tt', hidden);
      ctx.on(t,'mouseenter',function(){
        gsap.to(t, { '--to':1, duration:.2, overwrite:'auto' });
        gsap.to(t, { '--tt':shown, duration:.32, ease:'back.out(2.2)', overwrite:'auto' });
      });
      ctx.on(t,'mouseleave',function(){
        gsap.to(t, { '--to':0, duration:.2, overwrite:'auto' });
        gsap.to(t, { '--tt':hidden, duration:.32, ease:'power2.in', overwrite:'auto' });
      });
      ctx.clean(function(){ gsap.killTweensOf(t); });
    });
  }
},

{
  id:'t01', cat:'texto', title:'Typewriter',
  desc:'Digita, pausa, apaga, troca de frase. Cursor piscando com repeat do GSAP.',
  tags:['typing','setTimeout','loop','gsap'],
  html:`<div class="t01"><span>Eu construo </span><b class="t01-w"></b><i class="t01-c"></i></div>`,
  css:`
    .t01{font-size:18px;font-weight:600;color:#dededf;display:flex;align-items:center;letter-spacing:-.01em}
    .t01-w{color:#d4af37}
    .t01-c{width:2px;height:20px;background:#d4af37;margin-left:3px}`,
  js:function(root,ctx){
    var el = root.querySelector('.t01-w'),
        cur = root.querySelector('.t01-c');
    var blink = gsap.to(cur, { opacity:0, duration:.45, repeat:-1, yoyo:true, ease:'steps(1)' });
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
    ctx.clean(function(){ blink.kill(); });
  }
},

{
  id:'t02', cat:'texto', title:'Palavras rotativas',
  desc:'A headline fica; só o substantivo troca, com a caixa acompanhando a largura.',
  tags:['rotate','width','transition','gsap'],
  html:`
    <div class="t02">
      <h4>Feito para <span class="t02-box"><i class="on">designers</i><i>devs</i><i>agências</i><i>startups</i></span></h4>
    </div>`,
  css:`
    .t02 h4{font-size:21px;font-weight:800;letter-spacing:-.03em;color:#eee;display:flex;gap:8px;align-items:center}
    .t02-box{position:relative;display:inline-block;height:1.3em;overflow:hidden}
    .t02-box i{position:absolute;left:0;top:0;font-style:normal;white-space:nowrap;color:#b08ac9}`,
  js:function(root,ctx){
    var box = root.querySelector('.t02-box'),
        items = box.querySelectorAll('i'), k = 0;
    items.forEach(function(it,i){
      gsap.set(it, i === 0 ? { yPercent:0, opacity:1 } : { yPercent:110, opacity:0 });
    });
    gsap.set(box, { width: items[0].offsetWidth });
    ctx.every(function(){
      var prev = items[k];
      k = (k + 1) % items.length;
      var next = items[k];
      gsap.to(prev, { yPercent:-110, opacity:0, duration:.55, ease:'expo.out', overwrite:'auto' });
      gsap.fromTo(next, { yPercent:110, opacity:0 },
        { yPercent:0, opacity:1, duration:.55, ease:'expo.out', overwrite:'auto' });
      gsap.to(box, { width: next.offsetWidth, duration:.5, ease:'expo.out', overwrite:'auto' });
    }, 1900);
    ctx.clean(function(){ gsap.killTweensOf(items); gsap.killTweensOf(box); });
  }
},

{
  id:'t03', cat:'texto', title:'Scramble / decrypt',
  desc:'Letras aleatórias que se resolvem da esquerda para a direita — loop no gsap.ticker.',
  tags:['scramble','rAF','hover','gsap'], hint:'passe o mouse',
  html:`<div class="t03"><b class="t03-t" data-v="DESCRIPTOGRAFANDO">DESCRIPTOGRAFANDO</b><small>hover para rodar de novo</small></div>`,
  css:`
    .t03{text-align:center}
    .t03-t{font-family:var(--mono);font-size:19px;font-weight:500;color:#5cc88f;letter-spacing:.04em;cursor:pointer}
    .t03 small{display:block;margin-top:10px;font-size:11px;color:#66625a}`,
  js:function(root,ctx){
    var el = root.querySelector('.t03-t'),
        target = el.dataset.v,
        chars = '!<>-_\\\\/[]{}—=+*^?#01',
        tickFn = null;
    function stop(){
      if (tickFn){ gsap.ticker.remove(tickFn); tickFn = null; }
    }
    function run(){
      stop();
      var frame = 0, queue = [];
      for (var i = 0; i < target.length; i++){
        queue.push({ to:target[i], start:Math.floor(Math.random()*18), end:Math.floor(Math.random()*18)+18 });
      }
      tickFn = function(){
        var out = '', done = 0;
        queue.forEach(function(q){
          if (frame >= q.end){ done++; out += q.to; }
          else if (frame >= q.start){
            if (!q.c || Math.random() < .3) q.c = chars[Math.floor(Math.random()*chars.length)];
            out += '<span style="color:#d4af37">' + q.c + '</span>';
          } else out += ' ';
        });
        el.innerHTML = out;
        frame++;
        if (done === queue.length) stop();
      };
      gsap.ticker.add(tickFn);
    }
    run();
    ctx.on(el,'mouseenter',run);
    ctx.clean(stop);
  }
},

{
  id:'t04', cat:'texto', title:'Gradiente animado no texto',
  desc:'background-clip:text com o gradiente deslizando via tween de background-position.',
  tags:['background-clip','gradient','CSS only','gsap'],
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
    var t1 = gsap.fromTo(a, { backgroundPosition:'0% 0%' },
      { backgroundPosition:'220% 0%', duration:3.4, ease:'none', repeat:-1 });
    var t2 = gsap.fromTo(b, { backgroundPosition:'0% 50%' },
      { backgroundPosition:'100% 50%', duration:6, ease:'sine.inOut', repeat:-1, yoyo:true });
    ctx.clean(function(){ t1.kill(); t2.kill(); });
  }
},

{
  id:'t05', cat:'texto', title:'Marquee infinito',
  desc:'Conteúdo duplicado + xPercent de -50: loop sem emenda. Pausa no hover.',
  tags:['marquee','loop','CSS only','gsap'], hint:'passe o mouse p/ pausar',
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
    var trs = root.querySelectorAll('.t05-tr');
    var tweens = [
      gsap.fromTo(trs[0], { xPercent:0 },   { xPercent:-50, duration:14, ease:'none', repeat:-1 }),
      gsap.fromTo(trs[1], { xPercent:-50 }, { xPercent:0,   duration:19, ease:'none', repeat:-1 })
    ];
    ctx.on(root,'mouseenter',function(){ tweens.forEach(function(t){ t.pause(); }); });
    ctx.on(root,'mouseleave',function(){ tweens.forEach(function(t){ t.resume(); }); });
    ctx.clean(function(){ tweens.forEach(function(t){ t.kill(); }); });
  }
},

{
  id:'t06', cat:'texto', title:'Marquee que reage ao scroll',
  desc:'A velocidade base soma o delta da rolagem — loop no gsap.ticker.',
  tags:['scroll','velocity','rAF','gsap'], stage:'scroll flush', hint:'role ↓ rápido',
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
    var tick = function(){
      if (!half) half = tr.scrollWidth / 2;
      vel *= .92;
      x -= 0.9 + vel * .1;
      if (half){ if (x <= -half) x += half; if (x > 0) x -= half; }
      gsap.set(tr, { x: x, skewX: Math.max(-14, Math.min(14, -vel * .25)) });
    };
    gsap.ticker.add(tick);
    ctx.clean(function(){ gsap.ticker.remove(tick); gsap.killTweensOf(tr); });
  }
},

{
  id:'t07', cat:'texto', title:'Texto em curva (textPath)',
  desc:'SVG textPath num círculo, girando devagar. Selo clássico.',
  tags:['SVG','textPath','rotate','gsap'],
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
    var svg = root.querySelector('.t07-s'), mid = root.querySelector('.t07-mid');
    var spin = gsap.to(svg, { rotation:360, duration:18, ease:'none', repeat:-1 });
    var bob = gsap.fromTo(mid, { y:-3 }, { y:3, duration:1.2, ease:'sine.inOut', repeat:-1, yoyo:true });
    ctx.clean(function(){ spin.kill(); bob.kill(); });
  }
},

{
  id:'t08', cat:'texto', title:'Glitch',
  desc:'Duas cópias em ciano e magenta com clip-path pulando — timeline em steps.',
  tags:['glitch','clip-path','::before','gsap'], hint:'passe o mouse',
  html:`<div class="t08"><b class="t08-t" data-t="SYSTEM_ERROR">SYSTEM_ERROR</b></div>`,
  css:`
    .t08-t{position:relative;font-family:var(--mono);font-size:24px;font-weight:600;color:#f0ede7;letter-spacing:.02em;
      cursor:pointer;display:inline-block}
    .t08-t::before,.t08-t::after{content:attr(data-t);position:absolute;left:0;top:0;width:100%;overflow:hidden}
    .t08-t::before{color:#0ff;clip-path:var(--c1,inset(0 0 65% 0));transform:var(--t1,translate(-2px,-1px));opacity:.85}
    .t08-t::after{color:#f0f;clip-path:var(--c2,inset(70% 0 0 0));transform:var(--t2,translate(2px,1px));opacity:.85}`,
  js:function(root,ctx){
    var t = root.querySelector('.t08-t'), tl = null;
    var A = ['inset(0 0 78% 0)','inset(28% 0 40% 0)','inset(66% 0 8% 0)'],
        TA = ['translate(-4px,-1px)','translate(4px,1px)','translate(-3px,0px)'],
        B = ['inset(72% 0 0 0)','inset(38% 0 34% 0)','inset(6% 0 74% 0)'],
        TB = ['translate(4px,1px)','translate(-4px,-1px)','translate(3px,0px)'];
    function reset(){
      gsap.set(t, { '--c1':'inset(0 0 65% 0)', '--t1':'translate(-2px,-1px)',
                    '--c2':'inset(70% 0 0 0)',  '--t2':'translate(2px,1px)', x:0 });
    }
    ctx.on(t,'mouseenter',function(){
      if (tl) tl.kill();
      tl = gsap.timeline({ repeat:-1 });
      for (var i = 0; i < 3; i++){
        tl.set(t, { '--c1':A[i], '--t1':TA[i], '--c2':B[i], '--t2':TB[i] }, i * .21)
          .set(t, { x: i % 2 ? 1 : 0 }, i * .21);
      }
      tl.set(t, { x:0 }, .63);
    });
    ctx.on(t,'mouseleave',function(){
      if (tl){ tl.kill(); tl = null; }
      reset();
    });
    ctx.clean(function(){ if (tl) tl.kill(); gsap.killTweensOf(t); });
  }
},

{
  id:'t09', cat:'texto', title:'Contorno → preenchido',
  desc:'-webkit-text-stroke com o fill entrando por background-size tweenado.',
  tags:['text-stroke','background-size','hover','gsap'], hint:'passe o mouse',
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
    var conf = [
      { el: root.querySelector('.t09-a'), off:'0% 100%',  on:'100% 100%' },
      { el: root.querySelector('.t09-b'), off:'100% 0%',  on:'100% 100%' }
    ];
    conf.forEach(function(c){
      ctx.on(c.el,'mouseenter',function(){
        gsap.to(c.el, { backgroundSize:c.on, duration:.6, ease:'power3.inOut', overwrite:'auto' });
      });
      ctx.on(c.el,'mouseleave',function(){
        gsap.to(c.el, { backgroundSize:c.off, duration:.6, ease:'power3.inOut', overwrite:'auto' });
      });
      ctx.clean(function(){ gsap.killTweensOf(c.el); });
    });
  }
},

{
  id:'t10', cat:'texto', title:'Headline em três tempos',
  desc:'Máscara + escala + peso entrando em ordem num timeline — abertura de página.',
  tags:['composição','stagger','letter-spacing','gsap'],
  html:`
    <div class="t10">
      <span class="t10-k">estúdio independente</span>
      <h4><span class="m"><i>Fazemos marcas</i></span><span class="m"><i>se moverem.</i></span></h4>
      <div class="t10-cta"><button>Ver trabalhos</button><span>desde 2014</span></div>
    </div>`,
  css:`
    .t10{text-align:center;padding:0 16px}
    .t10-k{display:inline-block;font-family:var(--mono);font-size:10px;letter-spacing:.22em;text-transform:uppercase;
      color:#d4af37;opacity:0}
    .t10 h4{margin-top:12px;font-size:25px;font-weight:800;letter-spacing:-.04em;color:#f5f2ec}
    .t10 .m{display:block;overflow:hidden}
    .t10 .m i{display:block;font-style:normal}
    .t10 .m:nth-child(2) i{color:#b08ac9}
    .t10-cta{margin-top:18px;display:flex;gap:12px;align-items:center;justify-content:center;opacity:0}
    .t10-cta button{padding:9px 18px;border-radius:99px;background:#f0ede7;color:#0d0c0b;font-size:12.5px;font-weight:700}
    .t10-cta span{font-size:11.5px;color:#726e67}`,
  js:function(root,ctx){
    var k = root.querySelector('.t10-k'),
        lines = root.querySelectorAll('.t10 .m i'),
        cta = root.querySelector('.t10-cta');
    var tl = gsap.timeline({ defaults:{ ease:'expo.out' } });
    tl.fromTo(k,   { opacity:0, y:10 },   { opacity:1, y:0, duration:.7 }, .05)
      .fromTo(lines[0], { yPercent:105 }, { yPercent:0, duration:.95 }, .2)
      .fromTo(lines[1], { yPercent:105 }, { yPercent:0, duration:.95 }, .32)
      .fromTo(cta, { opacity:0, y:10 },   { opacity:1, y:0, duration:.8 }, .75);
    ctx.clean(function(){ tl.kill(); });
  }
},

{
  id:'l01', cat:'loaders', title:'Preloader com porcentagem',
  desc:'Progresso falso com passos irregulares — parece mais "real" que linear.',
  tags:['loader','counter','rAF','gsap'], hint:'clique em Replay',
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
      opacity:0}`,
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
      gsap.set(bar, { width: p + '%' });
      lbl.textContent = msgs[Math.min(3, Math.floor(p / 26))];
      if (p < 100) ctx.wait(step, 120 + Math.random() * 260);
      else ctx.wait(function(){
        gsap.to([num, bar.parentNode, lbl], { opacity:0, duration:.3 });
        gsap.fromTo(done, { opacity:0, scale:.9 },
          { opacity:1, scale:1, duration:.5, ease:'back.out(2.2)' });
      }, 450);
    })();
    ctx.clean(function(){ gsap.killTweensOf([num, bar, bar.parentNode, lbl, done]); });
  }
},

{
  id:'l02', cat:'loaders', title:'Cortina de transição',
  desc:'Painéis verticais fecham, o conteúdo troca escondido, e eles abrem — stagger GSAP.',
  tags:['page transition','stagger','clip','gsap'], hint:'clique para trocar',
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
        bgs = ['linear-gradient(140deg,#262014,#17140e)',
               'linear-gradient(140deg,#362540,#181310)',
               'linear-gradient(140deg,#1e352a,#0b1f1d)'],
        k = 0, busy = false;
    ctx.on(btn,'click',function(){
      if (busy) return;
      busy = true;
      var tl = gsap.timeline({ onComplete:function(){ busy = false; } });
      tl.set(panels, { transformOrigin:'bottom' })
        .to(panels, { scaleY:1, duration:.5, ease:'power4.inOut', stagger:.06 })
        .add(function(){
          k = (k + 1) % pages.length;
          page.innerHTML = '<b>' + pages[k][0] + '</b><span>' + pages[k][1] + '</span>';
          page.style.background = bgs[k];
        })
        .set(panels, { transformOrigin:'top' })
        .to(panels, { scaleY:0, duration:.5, ease:'power4.inOut', stagger:.06 });
      ctx.clean(function(){ tl.kill(); });
    });
    ctx.clean(function(){ gsap.killTweensOf(panels); });
  }
},

{
  id:'l03', cat:'loaders', title:'Crossfade de rota (SPA)',
  desc:'Saída e entrada sobrepostas com deslocamento oposto — padrão do Framer Motion.',
  tags:['SPA','crossfade','router','gsap'], hint:'troque as abas',
  html:`
    <div class="l03">
      <nav class="l03-nav"><button class="on">Início</button><button>Sobre</button><button>Contato</button></nav>
      <div class="l03-view">
        <section class="l03-p"><h5>Início</h5><p>Conteúdo da home, com dois blocos entrando em cascata.</p><i></i><i></i></section>
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
    gsap.from(view.querySelector('.l03-p'), { opacity:0, y:14, duration:.5, ease:'expo.out' });
    btns.forEach(function(b){
      ctx.on(b,'click',function(){
        if (b.classList.contains('on')) return;
        btns.forEach(function(x){ x.classList.remove('on'); });
        b.classList.add('on');
        var old = view.querySelector('.l03-p');
        gsap.to(old, { opacity:0, y:-14, duration:.35, ease:'power3.in',
          onComplete:function(){ old.remove(); } });
        var el = document.createElement('section');
        el.className = 'l03-p';
        el.innerHTML = '<h5>' + b.textContent + '</h5><p>' + data[b.textContent] + '</p><i></i><i></i>';
        view.appendChild(el);
        gsap.fromTo(el, { opacity:0, y:14 }, { opacity:1, y:0, duration:.5, ease:'expo.out' });
      });
    });
    ctx.clean(function(){
      view.querySelectorAll('.l03-p').forEach(function(p){ gsap.killTweensOf(p); });
    });
  }
},

{
  id:'l04', cat:'loaders', title:'Skeleton shimmer',
  desc:'Placeholder com brilho atravessando — reduz a ansiedade de espera.',
  tags:['skeleton','shimmer','loading','gsap'], hint:'carrega em 2,4s',
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
    .l04-sk .s::after{content:"";position:absolute;inset:0;
      background:linear-gradient(90deg,transparent,rgba(255,255,255,.07),transparent);
      transform:translateX(var(--shx,-100%))}
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
        bones = sk.querySelectorAll('.s');
    var shimmer = gsap.fromTo(bones, { '--shx':'-100%' },
      { '--shx':'100%', duration:1.35, ease:'sine.inOut', repeat:-1 });
    ctx.wait(function(){
      shimmer.kill();
      gsap.to(sk, { opacity:0, duration:.45 });
      gsap.to(real, { opacity:1, duration:.45 });
    }, 2400);
    ctx.clean(function(){ shimmer.kill(); gsap.killTweensOf([sk, real]); });
  }
},

{
  id:'l05', cat:'loaders', title:'Seis spinners em GSAP',
  desc:'Ring, dots, bars, orbit, morph e dual-ring — cada um é um tween em loop.',
  tags:['spinner','keyframes','CSS only','gsap'],
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
    .l05 .ring{border:3px solid #2b2721;border-top-color:#d4af37;border-radius:50%}
    .l05 .dots{display:flex;gap:5px}
    .l05 .dots i{width:8px;height:8px;border-radius:50%;background:#b08ac9;opacity:.4}
    .l05 .bars{display:flex;gap:3px;align-items:center}
    .l05 .bars i{width:4px;height:22px;border-radius:2px;background:#5cc88f;transform:scaleY(.4)}
    .l05 .orbit{border:1px dashed #302c22;border-radius:50%}
    .l05 .orbit i{position:absolute;width:9px;height:9px;border-radius:50%;background:#cf9b6a;margin-top:-24px}
    .l05 .morph{background:#d4af37;border-radius:6px}
    .l05 .dual{border:3px solid transparent;border-top-color:#cf9b6a;border-bottom-color:#d4af37;border-radius:50%}`,
  js:function(root,ctx){
    var kills = [];
    function reg(t){ kills.push(t); return t; }

    reg(gsap.to(root.querySelector('.ring'), { rotation:360, duration:.8, ease:'none', repeat:-1 }));
    reg(gsap.to(root.querySelectorAll('.dots i'),
      { y:-8, opacity:1, duration:.45, ease:'sine.inOut', repeat:-1, yoyo:true, stagger:.15 }));
    reg(gsap.to(root.querySelectorAll('.bars i'),
      { scaleY:1, duration:.475, ease:'sine.inOut', repeat:-1, yoyo:true, stagger:.12 }));
    reg(gsap.to(root.querySelector('.orbit'), { rotation:360, duration:2.4, ease:'none', repeat:-1 }));
    reg(gsap.timeline({ repeat:-1 })
      .to(root.querySelector('.morph'),
        { borderRadius:'50%', rotation:180, scale:.7, duration:.8, ease:'sine.inOut' })
      .to(root.querySelector('.morph'),
        { borderRadius:'6px', rotation:360, scale:1, duration:.8, ease:'sine.inOut' }));
    reg(gsap.to(root.querySelector('.dual'), { rotation:360, duration:1.1, ease:'power3.inOut', repeat:-1 }));

    ctx.clean(function(){ kills.forEach(function(t){ t.kill(); }); });
  }
},

{
  id:'l06', cat:'loaders', title:'Logo que se desenha',
  desc:'O traço aparece, preenche e a marca assenta no lugar — tudo num timeline.',
  tags:['SVG','stroke','fill','gsap'], hint:'clique em Replay',
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
    .l06-s .p,.l06-s .c{fill:transparent;stroke:#d4af37;stroke-width:3;stroke-linejoin:round}
    .l06-s .c{stroke:#b08ac9}
    .l06-n{font-size:15px;font-weight:800;letter-spacing:.18em;color:#f1eee8;opacity:0}
    .l06-n span{display:block;font-size:9.5px;letter-spacing:.42em;color:#716d66;font-weight:400;text-align:center}`,
  js:function(root,ctx){
    var p = root.querySelector('.l06-s .p'),
        c = root.querySelector('.l06-s .c'),
        n = root.querySelector('.l06-n');
    [p, c].forEach(function(el){
      var len = el.getTotalLength();
      gsap.set(el, { strokeDasharray:len, strokeDashoffset:len });
    });
    var tl = gsap.timeline();
    tl.to(p, { strokeDashoffset:0, duration:1.5, ease:'power2.inOut' }, 0)
      .to(c, { strokeDashoffset:0, duration:1.5, ease:'power2.inOut' }, .35)
      .to(p, { fill:'rgba(212,175,55,.13)', duration:.8 }, 1.35)
      .to(c, { fill:'rgba(212,175,55,.13)', duration:.8 }, 1.6)
      .fromTo(n, { opacity:0, letterSpacing:'.34em' },
        { opacity:1, letterSpacing:'.18em', duration:.8, ease:'expo.out' }, 1.75);
    ctx.clean(function(){ tl.kill(); });
  }
},

{
  id:'l07', cat:'loaders', title:'Barra de progresso indeterminada',
  desc:'Quando você não sabe quanto falta: duas barras em fase diferente.',
  tags:['indeterminate','CSS only','loading','gsap'],
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
      width:40%;left:0;right:auto}
    .l07-t{margin:10px 0;font-family:var(--mono);font-size:10.5px;color:#66625a}`,
  js:function(root,ctx){
    var bars = root.querySelectorAll('.l07-b:not(.thin) i'),
        thin = root.querySelector('.l07-b.thin i');
    // keyframe 0→60% move, 60→100% segura — vira tween + gap no repeatDelay
    var t1 = gsap.timeline({ repeat:-1, repeatDelay:.84 })
      .fromTo(bars[0], { left:'-35%', right:'100%' },
        { left:'100%', right:'-90%', duration:1.26, ease:'power2.inOut' });
    var t2 = gsap.timeline({ repeat:-1, repeatDelay:.84, delay:1.15 })
      .fromTo(bars[1], { left:'-200%', right:'100%' },
        { left:'107%', right:'-8%', duration:1.26, ease:'power3.out' });
    var t3 = gsap.fromTo(thin, { xPercent:-110 },
      { xPercent:260, duration:1.4, ease:'sine.inOut', repeat:-1 });
    ctx.clean(function(){ t1.kill(); t2.kill(); t3.kill(); });
  }
}

);
