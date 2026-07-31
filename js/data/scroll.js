/* ==========================================================
   02 · SCROLL-DRIVEN   (todas as demos rolam DENTRO do card)
   ========================================================== */
(window.ANIMDB = window.ANIMDB || []).push(

{
  id:'s01', cat:'scroll', title:'Parallax de camadas',
  desc:'Cada camada anda numa fração da rolagem. Profundidade sem 3D.',
  tags:['parallax','transform','scroll'], stage:'scroll', hint:'role ↓',
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
        l.style.transform = 'translate3d(0,' + (y * +l.dataset.sp) + 'px,0)';
      });
    }
    ctx.on(stage, 'scroll', onScroll, { passive:true });
    onScroll();
  }
},

{
  id:'s02', cat:'scroll', title:'Header que encolhe',
  desc:'Passou de N px, o header compacta, ganha fundo e blur.',
  tags:['sticky','scroll','header'], stage:'scroll flush', hint:'role ↓',
  html:`
    <div class="s02">
      <header class="s02-h"><b>ACME</b><nav><a>Produto</a><a>Preço</a><a>Blog</a></nav><button>Entrar</button></header>
      <div class="s02-c">
        <h5>Role para ver o header compactar</h5>
        <p>O truque é só uma classe alternada em um limiar de scroll — todo o resto é transition.</p>
        <div class="s02-fill"></div>
      </div>
    </div>`,
  css:`
    .s02{position:relative}
    .s02-h{position:sticky;top:0;z-index:5;display:flex;align-items:center;gap:12px;
      padding:20px 16px;background:transparent;border-bottom:1px solid transparent;
      transition:padding .35s cubic-bezier(.22,1,.36,1),background .35s,border-color .35s,backdrop-filter .35s}
    .s02-h b{font-size:17px;letter-spacing:-.02em;transition:font-size .35s cubic-bezier(.22,1,.36,1)}
    .s02-h nav{display:flex;gap:12px;margin-left:auto;font-size:11.5px;color:#908b82}
    .s02-h button{font-size:11.5px;padding:6px 12px;border-radius:99px;background:#d4af37;color:#1b1813;font-weight:600;
      transition:transform .35s cubic-bezier(.34,1.56,.64,1)}
    .s02-h.small{padding:9px 16px;background:rgba(12,12,18,.82);border-color:#26262f;backdrop-filter:blur(10px)}
    .s02-h.small b{font-size:13.5px}
    .s02-h.small button{transform:scale(.9)}
    .s02-c{padding:26px 18px 0;background:linear-gradient(#171410,#0d0d12)}
    .s02-c h5{font-size:16px;color:#f1eee8;margin:0 0 8px}
    .s02-c p{font-size:12.5px;color:#85807a;line-height:1.7}
    .s02-fill{height:420px;margin-top:20px;border-radius:10px;
      background:repeating-linear-gradient(#1c1a15 0 26px,#171510 26px 52px)}`,
  js:function(root,ctx){
    var stage = root.closest('.stage'), h = root.querySelector('.s02-h');
    ctx.on(stage, 'scroll', function(){
      h.classList.toggle('small', stage.scrollTop > 40);
    }, { passive:true });
  }
},

{
  id:'s03', cat:'scroll', title:'Barra de progresso de leitura',
  desc:'scrollTop / (scrollHeight - clientHeight). Uma linha de matemática.',
  tags:['progress','scroll','%'], stage:'scroll flush', hint:'role ↓',
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
      bar.style.width = (k * 100) + '%';
      pct.textContent = Math.round(k * 100) + '%';
    }
    ctx.on(stage, 'scroll', upd, { passive:true });
    upd();
  }
},

{
  id:'s04', cat:'scroll', title:'Sticky scrollytelling',
  desc:'Um painel fixo enquanto os passos passam ao lado e trocam o conteúdo.',
  tags:['sticky','IntersectionObserver','storytelling'], stage:'scroll flush tall', hint:'role ↓',
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
    .s04-shape{width:70px;height:70px;background:#d4af37;border-radius:8px;
      transition:all .7s cubic-bezier(.22,1,.36,1)}
    .s04[data-on="1"] .s04-shape{border-radius:50%;background:#b08ac9;transform:rotate(45deg) scale(1.15)}
    .s04[data-on="2"] .s04-shape{border-radius:14px;background:#5cc88f;transform:rotate(180deg) scale(.85)}
    .s04-lbl{position:absolute;top:12px;left:14px;font-family:var(--mono);font-size:11px;color:#625e57}
    .s04-st{min-height:190px;padding:26px 20px;border-bottom:1px solid #18181f;
      opacity:.28;transition:opacity .5s}
    .s04-st.on{opacity:1}
    .s04-st b{font-size:15px;color:#eee}
    .s04-st p{font-size:12.5px;color:#8a857c;margin-top:6px}`,
  js:function(root,ctx){
    var wrap = root.querySelector('.s04'),
        lbl  = root.querySelector('.s04-lbl'),
        io = new IntersectionObserver(function(es){
          es.forEach(function(e){
            if (e.isIntersecting){
              wrap.dataset.on = e.target.dataset.i;
              lbl.textContent = '0' + (+e.target.dataset.i + 1);
              root.querySelectorAll('.s04-st').forEach(function(s){ s.classList.remove('on'); });
              e.target.classList.add('on');
            }
          });
        }, { root: root.closest('.stage'), rootMargin:'-45% 0px -45% 0px' });
    root.querySelectorAll('.s04-st').forEach(function(s){ io.observe(s); });
    ctx.clean(function(){ io.disconnect(); });
  }
},

{
  id:'s05', cat:'scroll', title:'Scroll horizontal',
  desc:'A rolagem vertical vira deslocamento lateral dentro de uma seção presa.',
  tags:['sticky','translateX','pin'], stage:'scroll flush', hint:'role ↓',
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
      track.style.transform = 'translate3d(' + (-k * dist) + 'px,0,0)';
    }
    ctx.on(stage, 'scroll', upd, { passive:true });
    upd();
  }
},

{
  id:'s06', cat:'scroll', title:'Pin + scrub (estilo ScrollTrigger)',
  desc:'Progresso 0→1 da seção controla várias propriedades ao mesmo tempo.',
  tags:['scrub','progress','transform'], stage:'scroll flush', hint:'role ↓',
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
    function upd(){
      var k = Math.min(1, Math.max(0, stage.scrollTop / (sec.offsetHeight - stage.clientHeight)));
      obj.style.transform = 'rotate(' + (k * 360) + 'deg) scale(' + (1 + k * .55) + ')';
      obj.style.borderRadius = (16 + k * 34) + 'px';
      obj.style.filter = 'hue-rotate(' + (k * 160) + 'deg)';
      bar.style.width = (k * 100) + '%';
      val.textContent = k.toFixed(2);
    }
    ctx.on(stage, 'scroll', upd, { passive:true });
    upd();
  }
},

{
  id:'s07', cat:'scroll', title:'Image sequence scrubbing',
  desc:'Frames pré-renderizados num canvas, trocados pela posição do scroll (efeito Apple).',
  tags:['canvas','frames','scrub'], stage:'scroll flush', hint:'role ↓',
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
    function upd(){
      var k = Math.min(1, Math.max(0, stage.scrollTop / (sec.offsetHeight - stage.clientHeight)));
      var f = Math.min(N - 1, Math.round(k * (N - 1)));
      c.clearRect(0,0,420,420);
      c.drawImage(frames[f], 0, 0);
      lbl.textContent = 'frame ' + String(f + 1).padStart(2,'0') + '/' + N;
    }
    ctx.on(stage, 'scroll', upd, { passive:true });
    upd();
  }
},

{
  id:'s08', cat:'scroll', title:'Texto colorindo no scroll',
  desc:'Cada palavra acende quando cruza a linha do meio da viewport.',
  tags:['scroll','word','opacity'], stage:'scroll', hint:'role ↓',
  html:`<p class="s08">Boas animações não pedem atenção. Elas guiam o olho, explicam a hierarquia e desaparecem antes de virar ruído.</p>`,
  css:`
    .s08{padding:120px 20px;font-size:19px;font-weight:700;line-height:1.65;letter-spacing:-.02em}
    .s08 w{color:#302b24;transition:color .35s ease}
    .s08 w.on{color:#f5f2ec}`,
  js:function(root,ctx){
    var stage = root.closest('.stage'), p = root.querySelector('.s08');
    p.innerHTML = p.textContent.trim().split(' ').map(function(w){ return '<w>'+w+'</w>'; }).join(' ');
    var words = p.querySelectorAll('w');
    function upd(){
      var mid = stage.getBoundingClientRect().top + stage.clientHeight * .62;
      words.forEach(function(w){
        w.classList.toggle('on', w.getBoundingClientRect().top < mid);
      });
    }
    ctx.on(stage,'scroll',upd,{ passive:true });
    upd();
  }
},

{
  id:'s09', cat:'scroll', title:'Stacking cards',
  desc:'Cards sticky que empilham; o de baixo encolhe conforme o próximo cobre.',
  tags:['sticky','stack','scale'], stage:'scroll flush', hint:'role ↓',
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
        c.style.transform = 'scale(' + (1 - over * .07) + ')';
        c.style.filter = 'brightness(' + (1 - over * .35) + ')';
      });
    }
    ctx.on(stage,'scroll',upd,{ passive:true });
    upd();
  }
},

{
  id:'s10', cat:'scroll', title:'Hero com zoom no scroll',
  desc:'A imagem cresce e escurece enquanto o conteúdo sobe por cima.',
  tags:['scale','sticky','overlay'], stage:'scroll flush', hint:'role ↓',
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
      img.style.transform = 'scale(' + (1 + k * .45) + ')';
      sh.style.opacity = k * .72;
      h.style.transform = 'translateY(' + (k * -40) + 'px) scale(' + (1 - k * .12) + ')';
      h.style.letterSpacing = (.3 + k * .25) + 'em';
    }
    ctx.on(stage,'scroll',upd,{ passive:true });
    upd();
  }
},

{
  id:'s11', cat:'scroll', title:'Scroll snap por seção',
  desc:'CSS puro: cada painel encaixa. Zero JavaScript.',
  tags:['scroll-snap','CSS only'], stage:'scroll flush', hint:'role ↓',
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
  tags:['clip','curtain','sticky'], stage:'scroll flush', hint:'role ↓',
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
    function upd(){
      var k = Math.min(1, Math.max(0, stage.scrollTop / (sec.offsetHeight - stage.clientHeight)));
      b.style.clipPath = 'inset(' + ((1 - k) * 100) + '% 0 0 0)';
    }
    ctx.on(stage,'scroll',upd,{ passive:true });
    upd();
  }
},

{
  id:'s13', cat:'scroll', title:'CSS scroll-driven (animation-timeline)',
  desc:'Sem JS: view() amarra o keyframe à entrada do elemento na viewport. Chrome/Edge 115+.',
  tags:['animation-timeline','view()','CSS only'], stage:'scroll', hint:'role ↓',
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
      animation:s13 linear both;
      animation-timeline:view();
      animation-range:entry 5% cover 42%}
    @keyframes s13{
      from{opacity:0;transform:translateY(30px) scale(.94);filter:blur(6px)}
      to{opacity:1;transform:none;filter:blur(0)}}`
}

);
