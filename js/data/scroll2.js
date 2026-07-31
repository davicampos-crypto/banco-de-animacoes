/* ==========================================================
   02b · SCROLL-DRIVEN — lote 2
   ========================================================== */
(function () {
  var A = (window.ANIMDB = window.ANIMDB || []);
  function add(o) { o.nv = 1; A.push(o); }

add({
  id:'sx01', cat:'scroll', title:'Header que some ao descer',
  desc:'Esconde na descida, volta na subida. Ganha altura de tela sem perder a navegação.',
  tags:['header','direção','sticky'], stage:'scroll flush', hint:'role ↓ e ↑',
  html:`
    <div class="sx01">
      <header class="sx01-h"><b>ACME</b><nav><a>Docs</a><a>Blog</a></nav></header>
      <div class="sx01-c">
        <p>Desça: o header sai de cena.</p><p>Suba um pouco: ele volta na hora.</p>
        <div class="sx01-f"></div>
      </div>
    </div>`,
  css:`
    .sx01-h{position:sticky;top:0;z-index:5;display:flex;align-items:center;padding:13px 16px;
      background:rgba(12,12,18,.9);backdrop-filter:blur(10px);border-bottom:1px solid #22222c;
      transition:transform .4s cubic-bezier(.22,1,.36,1)}
    .sx01-h.up{transform:translateY(-100%)}
    .sx01-h b{font-size:14px;color:#f4f1eb}
    .sx01-h nav{margin-left:auto;display:flex;gap:12px;font-size:11.5px;color:#908b82}
    .sx01-c{padding:16px}
    .sx01-c p{font-size:12.5px;color:#8a857c;margin-bottom:10px}
    .sx01-f{height:520px;border-radius:10px;background:repeating-linear-gradient(#1c1a15 0 24px,#171510 24px 48px)}`,
  js:function(root,ctx){
    var stage = root.closest('.stage'), h = root.querySelector('.sx01-h'), last = 0;
    ctx.on(stage,'scroll',function(){
      var y = stage.scrollTop;
      // só esconde depois de passar da própria altura, para não piscar no topo
      h.classList.toggle('up', y > 60 && y > last);
      last = y;
    }, { passive:true });
  }
});

add({
  id:'sx02', cat:'scroll', title:'Scroll spy',
  desc:'A navegação marca a seção que está no centro da tela — e o indicador desliza até ela.',
  tags:['scrollspy','IntersectionObserver','nav'], stage:'scroll flush', hint:'role ↓',
  html:`
    <div class="sx02">
      <nav class="sx02-n"><span class="sx02-ind"></span>
        <a data-t="a">Intro</a><a data-t="b">Uso</a><a data-t="c">API</a><a data-t="d">FAQ</a>
      </nav>
      <div class="sx02-c">
        <section id="sx02a"><b>Intro</b><p>Por que isso existe.</p></section>
        <section id="sx02b"><b>Uso</b><p>Como instalar e rodar.</p></section>
        <section id="sx02c"><b>API</b><p>Métodos e opções.</p></section>
        <section id="sx02d"><b>FAQ</b><p>As dúvidas de sempre.</p></section>
      </div>
    </div>`,
  css:`
    .sx02{position:relative}
    .sx02-n{position:sticky;top:0;z-index:5;display:flex;gap:2px;padding:10px 12px;
      background:rgba(12,12,18,.92);backdrop-filter:blur(8px);border-bottom:1px solid #22222c}
    .sx02-ind{position:absolute;top:10px;left:12px;height:26px;width:0;border-radius:7px;background:#d4af371e;
      border:1px solid #d4af3744;transition:transform .4s cubic-bezier(.22,1,.36,1),width .4s cubic-bezier(.22,1,.36,1)}
    .sx02-n a{position:relative;z-index:2;padding:5px 11px;font-size:11.5px;color:#85807a;transition:color .3s}
    .sx02-n a.on{color:#d4af37}
    .sx02 section{min-height:150px;padding:20px 16px;border-bottom:1px solid #1a1a22}
    .sx02 section b{font-size:15px;color:#f1eee8}
    .sx02 section p{font-size:12.5px;color:#8a857c;margin-top:5px}`,
  js:function(root,ctx){
    var links = root.querySelectorAll('.sx02-n a'), ind = root.querySelector('.sx02-ind');
    function marcar(t){
      links.forEach(function(a){
        var on = a.dataset.t === t;
        a.classList.toggle('on', on);
        if (on){
          ind.style.width = a.offsetWidth + 'px';
          ind.style.transform = 'translateX(' + (a.offsetLeft - 12) + 'px)';
        }
      });
    }
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if (e.isIntersecting) marcar(e.target.id.slice(-1)); });
    }, { root: root.closest('.stage'), rootMargin:'-40% 0px -55% 0px' });
    root.querySelectorAll('.sx02 section').forEach(function(s){ io.observe(s); });
    ctx.clean(function(){ io.disconnect(); });
    marcar('a');
  }
});

add({
  id:'sx03', cat:'scroll', title:'Skew por velocidade',
  desc:'Quanto mais rápido o scroll, mais o conteúdo inclina. Volta ao repouso com atrito.',
  tags:['velocity','skew','inércia'], stage:'scroll flush', hint:'role rápido ↓',
  html:`
    <div class="sx03">
      <div class="sx03-w">
        <div class="sx03-c" style="--c:#2b2618">Velocidade</div>
        <div class="sx03-c" style="--c:#362540">Deformação</div>
        <div class="sx03-c" style="--c:#1e352a">Atrito</div>
        <div class="sx03-c" style="--c:#3f2a1d">Repouso</div>
      </div>
    </div>`,
  css:`
    .sx03{padding:16px}
    .sx03-w{display:flex;flex-direction:column;gap:12px;will-change:transform;transform-origin:50% 50%}
    .sx03-c{height:80px;border-radius:12px;background:var(--c);display:grid;place-items:center;
      color:#e6e1d6;font-size:14px;font-weight:600;border:1px solid #ffffff12}`,
  js:function(root,ctx){
    var stage = root.closest('.stage'), w = root.querySelector('.sx03-w');
    var last = stage.scrollTop, vel = 0;
    ctx.on(stage,'scroll',function(){
      vel += stage.scrollTop - last; last = stage.scrollTop;
    }, { passive:true });
    ctx.loop(function(){
      vel *= .88;
      var s = Math.max(-9, Math.min(9, vel * .28));
      w.style.transform = 'skewY(' + s.toFixed(2) + 'deg) scaleY(' + (1 + Math.abs(s) * .012) + ')';
    });
  }
});

add({
  id:'sx04', cat:'scroll', title:'Parallax 3D sem JavaScript',
  desc:'perspective no container + translateZ nas camadas: o navegador faz o parallax sozinho.',
  tags:['translateZ','perspective','CSS only'], stage:'scroll flush', hint:'role ↓',
  html:`
    <div class="sx04">
      <div class="sx04-l back"></div>
      <div class="sx04-l mid"></div>
      <div class="sx04-l front"><b>3D</b><span>zero JS</span></div>
      <div class="sx04-after">O deslocamento vem da projeção em perspectiva, não de um listener.</div>
    </div>`,
  css:`
    .stage:has(.sx04){perspective:2px;perspective-origin:50% 0}
    .sx04{transform-style:preserve-3d;position:relative;height:520px}
    .sx04-l{position:absolute;left:0;right:0;height:230px;border-radius:0}
    .sx04-l.back{top:0;transform:translateZ(-3px) scale(2.5);
      background:radial-gradient(70% 90% at 40% 20%,#3b3320,#12100e)}
    .sx04-l.mid{top:60px;transform:translateZ(-1.4px) scale(1.7);
      background:radial-gradient(60% 70% at 70% 60%,#3a2a45aa,transparent 70%)}
    .sx04-l.front{top:70px;height:120px;transform:translateZ(0);display:grid;place-content:center;text-align:center}
    .sx04-l.front b{font-size:34px;font-weight:800;color:#f4f1eb;letter-spacing:-.03em}
    .sx04-l.front span{font-family:var(--mono);font-size:10px;letter-spacing:.2em;color:#d4af37}
    .sx04-after{position:absolute;top:300px;left:0;right:0;padding:20px 18px;background:#0e0d0c;
      border-top:1px solid #22222c;font-size:12.5px;color:#8a857c;transform:translateZ(0)}`
});

add({
  id:'sx05', cat:'scroll', title:'Linha do tempo desenhando',
  desc:'O traço do SVG avança com a rolagem e cada marco acende ao ser alcançado.',
  tags:['SVG','dashoffset','timeline'], stage:'scroll flush', hint:'role ↓',
  html:`
    <div class="sx05">
      <svg class="sx05-s" viewBox="0 0 40 600" preserveAspectRatio="none">
        <path class="bg" d="M20 10 L20 590"/><path class="fg" d="M20 10 L20 590"/>
      </svg>
      <div class="sx05-items">
        <div class="sx05-i"><b>2014</b><p>Primeiro cliente.</p></div>
        <div class="sx05-i"><b>2018</b><p>Time de cinco.</p></div>
        <div class="sx05-i"><b>2022</b><p>Primeiro produto próprio.</p></div>
        <div class="sx05-i"><b>2025</b><p>Operação em três países.</p></div>
      </div>
    </div>`,
  css:`
    .sx05{position:relative;padding:20px 16px 40px 46px;min-height:600px}
    .sx05-s{position:absolute;left:10px;top:0;width:40px;height:100%}
    .sx05-s path{fill:none;stroke-width:2;stroke-linecap:round}
    .sx05-s .bg{stroke:#22201a}
    .sx05-s .fg{stroke:#d4af37;stroke-dasharray:var(--l);stroke-dashoffset:var(--l)}
    .sx05-i{position:relative;margin-bottom:60px;opacity:.3;transition:opacity .4s}
    .sx05-i.on{opacity:1}
    .sx05-i::before{content:"";position:absolute;left:-32px;top:5px;width:11px;height:11px;border-radius:50%;
      background:#111010;border:2px solid #2b2721;transition:all .4s cubic-bezier(.34,1.56,.64,1)}
    .sx05-i.on::before{border-color:#d4af37;background:#d4af37;transform:scale(1.25)}
    .sx05-i b{font-family:var(--mono);font-size:12px;color:#d4af37}
    .sx05-i p{font-size:13px;color:#c6c1b6;margin-top:3px}`,
  js:function(root,ctx){
    var stage = root.closest('.stage'),
        fg = root.querySelector('.sx05-s .fg'),
        len = fg.getTotalLength(),
        itens = root.querySelectorAll('.sx05-i');
    fg.style.setProperty('--l', len);
    function upd(){
      var max = stage.scrollHeight - stage.clientHeight;
      var k = max > 0 ? Math.min(1, stage.scrollTop / max) : 0;
      fg.style.strokeDashoffset = len * (1 - k);
      var linha = stage.getBoundingClientRect().top + stage.clientHeight * .55;
      itens.forEach(function(i){ i.classList.toggle('on', i.getBoundingClientRect().top < linha); });
    }
    ctx.on(stage,'scroll',upd,{ passive:true });
    upd();
  }
});

add({
  id:'sx06', cat:'scroll', title:'animation-timeline: scroll()',
  desc:'Diferente de view(): aqui o keyframe segue o progresso do container inteiro, não a entrada do elemento.',
  tags:['scroll()','CSS only','progresso'], stage:'scroll flush', hint:'role ↓',
  html:`
    <div class="sx06">
      <div class="sx06-bar"><i></i></div>
      <div class="sx06-pin"><div class="sx06-obj"></div></div>
      <div class="sx06-sp"></div>
    </div>`,
  css:`
    .sx06{height:800px;position:relative}
    .sx06-bar{position:sticky;top:0;z-index:4;height:4px;background:#1f1c17}
    .sx06-bar i{display:block;height:100%;transform-origin:0 50%;transform:scaleX(0);
      background:linear-gradient(90deg,#d4af37,#cf9b6a);
      animation:sx06a linear both;animation-timeline:scroll(nearest)}
    .sx06-pin{position:sticky;top:4px;height:226px;display:grid;place-items:center}
    .sx06-obj{width:80px;height:80px;border-radius:20px;background:linear-gradient(140deg,#d4af37,#b08ac9);
      animation:sx06b linear both;animation-timeline:scroll(nearest)}
    .sx06-sp{height:1px}
    @keyframes sx06a{to{transform:scaleX(1)}}
    @keyframes sx06b{
      from{transform:rotate(0) scale(.75);border-radius:20px}
      to{transform:rotate(315deg) scale(1.35);border-radius:50%}}`
});

add({
  id:'sx07', cat:'scroll', title:'Cover flow',
  desc:'Os itens crescem ao cruzar o centro e se inclinam nas bordas.',
  tags:['carousel','scale','centro'], stage:'scroll flush', hint:'role ↓',
  html:`
    <div class="sx07">
      <div class="sx07-i" style="--c:#2b2618">01</div><div class="sx07-i" style="--c:#362540">02</div>
      <div class="sx07-i" style="--c:#1e352a">03</div><div class="sx07-i" style="--c:#3f2a1d">04</div>
      <div class="sx07-i" style="--c:#2c2822">05</div>
    </div>`,
  css:`
    .sx07{padding:90px 20px;display:flex;flex-direction:column;gap:16px;perspective:600px}
    .sx07-i{height:96px;border-radius:14px;background:var(--c);border:1px solid #ffffff14;
      display:grid;place-items:center;font-family:var(--mono);font-size:20px;color:#ffffff55;
      will-change:transform;transform-origin:50% 50%}`,
  js:function(root,ctx){
    var stage = root.closest('.stage'), itens = root.querySelectorAll('.sx07-i');
    function upd(){
      var r = stage.getBoundingClientRect(), meio = r.top + r.height / 2;
      itens.forEach(function(el){
        var b = el.getBoundingClientRect();
        var d = (b.top + b.height / 2 - meio) / (r.height / 2);   // -1 … 1
        d = Math.max(-1.4, Math.min(1.4, d));
        var s = 1 - Math.abs(d) * .28;
        el.style.transform = 'scale(' + s.toFixed(3) + ') rotateX(' + (d * -26).toFixed(1) + 'deg)';
        el.style.opacity = (1 - Math.abs(d) * .55).toFixed(2);
      });
    }
    ctx.on(stage,'scroll',upd,{ passive:true });
    upd();
  }
});

add({
  id:'sx08', cat:'scroll', title:'Rubber band no fim da lista',
  desc:'Passou do limite, o conteúdo estica e volta com mola — o feedback do iOS.',
  tags:['overscroll','mola','pointer'], hint:'arraste para cima/baixo',
  html:`
    <div class="sx08">
      <div class="sx08-w">
        <div class="sx08-r">Item 01</div><div class="sx08-r">Item 02</div><div class="sx08-r">Item 03</div>
        <div class="sx08-r">Item 04</div><div class="sx08-r">Item 05</div>
      </div>
    </div>`,
  css:`
    .sx08{width:210px;height:100%;overflow:hidden;touch-action:none;cursor:grab;display:flex;align-items:center}
    .sx08:active{cursor:grabbing}
    .sx08-w{width:100%;will-change:transform}
    .sx08-r{padding:13px 16px;border-bottom:1px solid #1d1d26;font-size:12.5px;color:#c4bfb4}
    .sx08-r:first-child{border-top:1px solid #1d1d26}`,
  js:function(root,ctx){
    var box = root.querySelector('.sx08'), w = root.querySelector('.sx08-w');
    var y = 0, vel = 0, down = false, ly = 0, LIM = 34;
    ctx.on(box,'pointerdown',function(e){ down = true; ly = e.clientY; vel = 0; box.setPointerCapture(e.pointerId); });
    ctx.on(box,'pointermove',function(e){
      if (!down) return;
      var d = e.clientY - ly; ly = e.clientY;
      // resistência crescente quanto mais longe do repouso
      y += d * (1 - Math.min(.85, Math.abs(y) / (LIM * 2.6)));
      vel = d;
    });
    ctx.on(box,'pointerup',function(){ down = false; });
    ctx.loop(function(){
      if (!down){ y += vel; vel *= .9; y += (0 - y) * .16; }        // mola de volta ao zero
      w.style.transform = 'translateY(' + y.toFixed(2) + 'px)';
    });
  }
});

add({
  id:'sx09', cat:'scroll', title:'Anel de progresso no canto',
  desc:'Alternativa discreta à barra: um anel com a porcentagem e um botão de topo.',
  tags:['SVG','progresso','conic'], stage:'scroll flush', hint:'role ↓',
  html:`
    <div class="sx09">
      <div class="sx09-ring">
        <svg viewBox="0 0 44 44"><circle class="t" cx="22" cy="22" r="19"/><circle class="p" cx="22" cy="22" r="19"/></svg>
        <b>0</b>
      </div>
      <article>
        <h5>Texto longo</h5>
        <p>O anel fica preso ao canto e conta o quanto falta.</p>
        <p>Quando chega a 100%, ele vira um botão de "voltar ao topo".</p>
        <div class="sx09-f"></div>
      </article>
    </div>`,
  css:`
    .sx09{position:relative}
    .sx09-ring{position:sticky;top:12px;float:right;margin-right:12px;z-index:5;width:44px;height:44px;
      display:grid;place-items:center;background:#171510;border-radius:50%;border:1px solid #24211a}
    .sx09-ring svg{position:absolute;inset:0;transform:rotate(-90deg)}
    .sx09-ring circle{fill:none;stroke-width:3}
    .sx09-ring .t{stroke:#22201a}
    .sx09-ring .p{stroke:#d4af37;stroke-linecap:round;stroke-dasharray:119.4;stroke-dashoffset:119.4}
    .sx09-ring b{font-family:var(--mono);font-size:10px;color:#a5a099}
    .sx09-ring.full{background:#d4af37;cursor:pointer}
    .sx09-ring.full b{color:#1b1813}
    .sx09 article{padding:16px}
    .sx09 h5{font-size:15px;color:#eee;margin:0 0 8px}
    .sx09 p{font-size:12.5px;color:#8a857c;margin-bottom:10px}
    .sx09-f{height:480px;border-radius:10px;background:repeating-linear-gradient(#1c1a15 0 24px,#171510 24px 48px)}`,
  js:function(root,ctx){
    var stage = root.closest('.stage'),
        p = root.querySelector('.sx09-ring .p'),
        n = root.querySelector('.sx09-ring b'),
        ring = root.querySelector('.sx09-ring'), C = 119.4;
    function upd(){
      var max = stage.scrollHeight - stage.clientHeight;
      var k = max > 0 ? stage.scrollTop / max : 0;
      p.style.strokeDashoffset = C * (1 - k);
      var full = k > .985;
      n.textContent = full ? '↑' : Math.round(k * 100);
      ring.classList.toggle('full', full);
    }
    ctx.on(stage,'scroll',upd,{ passive:true });
    ctx.on(ring,'click',function(){ stage.scrollTo({ top:0, behavior:'smooth' }); });
    upd();
  }
});

add({
  id:'sx10', cat:'scroll', title:'Colunas em contra-scroll',
  desc:'Uma coluna sobe, a outra desce. Truque de galeria que dá vida a imagens estáticas.',
  tags:['parallax','colunas','oposto'], stage:'scroll flush', hint:'role ↓',
  html:`
    <div class="sx10">
      <div class="sx10-col" data-d="-0.28"></div>
      <div class="sx10-col" data-d="0.22"></div>
      <div class="sx10-col" data-d="-0.16"></div>
    </div>`,
  css:`
    .sx10{height:760px;padding:0 12px;display:grid;grid-template-columns:repeat(3,1fr);gap:10px;overflow:hidden}
    .sx10-col{display:flex;flex-direction:column;gap:10px;will-change:transform;padding-top:14px}
    .sx10-col i{display:block;height:86px;border-radius:9px;border:1px solid #ffffff10}`,
  js:function(root,ctx){
    var stage = root.closest('.stage'),
        cols = root.querySelectorAll('.sx10-col'),
        cores = ['#2b2618','#362540','#1e352a','#3f2a1d','#2c2822','#33291a','#322544'];
    cols.forEach(function(c,ci){
      for (var i = 0; i < 8; i++){
        var el = document.createElement('i');
        el.style.background = cores[(i + ci * 3) % cores.length];
        c.appendChild(el);
      }
    });
    function upd(){
      var y = stage.scrollTop;
      cols.forEach(function(c){ c.style.transform = 'translate3d(0,' + (y * +c.dataset.d) + 'px,0)'; });
    }
    ctx.on(stage,'scroll',upd,{ passive:true });
    upd();
  }
});

})();
