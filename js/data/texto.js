/* ==========================================================
   04 · TIPOGRAFIA
   ========================================================== */
(window.ANIMDB = window.ANIMDB || []).push(

{
  id:'t01', cat:'texto', title:'Typewriter',
  desc:'Digita, pausa, apaga, troca de frase. Cursor piscando em CSS.',
  tags:['typing','setTimeout','loop'],
  html:`<div class="t01"><span>Eu construo </span><b class="t01-w"></b><i class="t01-c"></i></div>`,
  css:`
    .t01{font-size:18px;font-weight:600;color:#dededf;display:flex;align-items:center;letter-spacing:-.01em}
    .t01-w{color:#d4af37}
    .t01-c{width:2px;height:20px;background:#d4af37;margin-left:3px;animation:t01 .9s steps(1) infinite}
    @keyframes t01{0%,49%{opacity:1}50%,100%{opacity:0}}`,
  js:function(root,ctx){
    var el = root.querySelector('.t01-w');
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
  }
},

{
  id:'t02', cat:'texto', title:'Palavras rotativas',
  desc:'A headline fica; só o substantivo troca, com a caixa acompanhando a largura.',
  tags:['rotate','width','transition'],
  html:`
    <div class="t02">
      <h4>Feito para <span class="t02-box"><i class="on">designers</i><i>devs</i><i>agências</i><i>startups</i></span></h4>
    </div>`,
  css:`
    .t02 h4{font-size:21px;font-weight:800;letter-spacing:-.03em;color:#eee;display:flex;gap:8px;align-items:center}
    .t02-box{position:relative;display:inline-block;height:1.3em;overflow:hidden;
      transition:width .5s cubic-bezier(.22,1,.36,1)}
    .t02-box i{position:absolute;left:0;top:0;font-style:normal;white-space:nowrap;
      color:#b08ac9;transform:translateY(110%);opacity:0;
      transition:transform .55s cubic-bezier(.22,1,.36,1),opacity .4s}
    .t02-box i.on{transform:none;opacity:1}
    .t02-box i.out{transform:translateY(-110%);opacity:0}`,
  js:function(root,ctx){
    var box = root.querySelector('.t02-box'),
        items = box.querySelectorAll('i'), k = 0;
    function setW(){ box.style.width = items[k].offsetWidth + 'px'; }
    setW();
    ctx.every(function(){
      items[k].classList.remove('on'); items[k].classList.add('out');
      var prev = items[k];
      k = (k + 1) % items.length;
      items[k].classList.remove('out');
      items[k].classList.add('on');
      setW();
      ctx.wait(function(){ prev.classList.remove('out'); }, 600);
    }, 1900);
  }
},

{
  id:'t03', cat:'texto', title:'Scramble / decrypt',
  desc:'Letras aleatórias que se resolvem da esquerda para a direita.',
  tags:['scramble','rAF','hover'], hint:'passe o mouse',
  html:`<div class="t03"><b class="t03-t" data-v="DESCRIPTOGRAFANDO">DESCRIPTOGRAFANDO</b><small>hover para rodar de novo</small></div>`,
  css:`
    .t03{text-align:center}
    .t03-t{font-family:var(--mono);font-size:19px;font-weight:500;color:#5cc88f;letter-spacing:.04em;cursor:pointer}
    .t03 small{display:block;margin-top:10px;font-size:11px;color:#66625a}`,
  js:function(root,ctx){
    var el = root.querySelector('.t03-t'),
        target = el.dataset.v,
        chars = '!<>-_\\\\/[]{}—=+*^?#01';
    function run(){
      var frame = 0, queue = [];
      for (var i = 0; i < target.length; i++){
        queue.push({ to:target[i], start:Math.floor(Math.random()*18), end:Math.floor(Math.random()*18)+18 });
      }
      function tick(){
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
        if (done < queue.length) ctx.raf(tick);
      }
      tick();
    }
    run();
    ctx.on(el,'mouseenter',run);
  }
},

{
  id:'t04', cat:'texto', title:'Gradiente animado no texto',
  desc:'background-clip:text com o gradiente deslizando — e uma versão "aurora".',
  tags:['background-clip','gradient','CSS only'],
  html:`<div class="t04"><h4 class="a">GRADIENTE VIVO</h4><h4 class="b">aurora boreal</h4></div>`,
  css:`
    .t04{text-align:center;display:flex;flex-direction:column;gap:12px}
    .t04 h4{font-size:26px;font-weight:800;letter-spacing:-.03em;
      -webkit-background-clip:text;background-clip:text;color:transparent}
    .t04 .a{background-image:linear-gradient(90deg,#d4af37,#b08ac9,#cf9b6a,#d4af37);
      background-size:220% 100%;animation:t04slide 3.4s linear infinite}
    .t04 .b{font-size:20px;font-style:italic;
      background-image:radial-gradient(60% 120% at 20% 0%,#5cc88f,transparent 60%),
                       radial-gradient(60% 120% at 80% 100%,#b8871f,transparent 60%),
                       linear-gradient(90deg,#b08ac9,#cf9b6a);
      background-size:180% 180%;animation:t04aur 6s ease-in-out infinite alternate}
    @keyframes t04slide{to{background-position:220% 0}}
    @keyframes t04aur{from{background-position:0% 50%}to{background-position:100% 50%}}`
},

{
  id:'t05', cat:'texto', title:'Marquee infinito',
  desc:'Conteúdo duplicado + translateX de -50%: loop sem emenda. Pausa no hover.',
  tags:['marquee','loop','CSS only'], hint:'passe o mouse p/ pausar',
  html:`
    <div class="t05">
      <div class="t05-row"><div class="t05-tr"><span>DESIGN</span><span>·</span><span>MOTION</span><span>·</span><span>CODE</span><span>·</span><span>DESIGN</span><span>·</span><span>MOTION</span><span>·</span><span>CODE</span><span>·</span></div></div>
      <div class="t05-row rev"><div class="t05-tr"><span>2025</span><span>◆</span><span>SÃO PAULO</span><span>◆</span><span>REMOTO</span><span>◆</span><span>2025</span><span>◆</span><span>SÃO PAULO</span><span>◆</span><span>REMOTO</span><span>◆</span></div></div>
    </div>`,
  css:`
    .t05{width:100%;display:flex;flex-direction:column;gap:14px;
      mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}
    .t05-row{overflow:hidden}
    .t05-tr{display:flex;gap:22px;width:max-content;animation:t05 14s linear infinite}
    .t05-row.rev .t05-tr{animation-direction:reverse;animation-duration:19s}
    .t05:hover .t05-tr{animation-play-state:paused}
    .t05-tr span{font-size:20px;font-weight:800;letter-spacing:-.02em;color:#2e2a22;white-space:nowrap}
    .t05-row.rev span{font-size:13px;font-family:var(--mono);font-weight:400;color:#d4af3799}
    @keyframes t05{to{transform:translateX(-50%)}}`
},

{
  id:'t06', cat:'texto', title:'Marquee que reage ao scroll',
  desc:'A velocidade base soma o delta da rolagem — e a direção inverte junto.',
  tags:['scroll','velocity','rAF'], stage:'scroll flush', hint:'role ↓ rápido',
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
    ctx.loop(function(){
      if (!half) half = tr.scrollWidth / 2;
      vel *= .92;
      x -= 0.9 + vel * .1;
      if (half){ if (x <= -half) x += half; if (x > 0) x -= half; }
      tr.style.transform = 'translate3d(' + x.toFixed(2) + 'px,0,0) skewX(' + Math.max(-14, Math.min(14, -vel*.25)) + 'deg)';
    });
  }
},

{
  id:'t07', cat:'texto', title:'Texto em curva (textPath)',
  desc:'SVG textPath num círculo, girando devagar. Selo clássico.',
  tags:['SVG','textPath','rotate'],
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
    .t07-s{width:180px;height:180px;animation:t07 18s linear infinite}
    .t07-s text{font-family:var(--mono);font-size:12.5px;letter-spacing:.14em;fill:#b08ac9}
    .t07-mid{position:absolute;width:56px;height:56px;border-radius:50%;background:#d4af37;color:#1b1813;
      display:grid;place-items:center;font-size:22px;font-weight:700;
      animation:t07b 2.4s ease-in-out infinite}
    @keyframes t07{to{transform:rotate(360deg)}}
    @keyframes t07b{0%,100%{transform:translateY(-3px)}50%{transform:translateY(3px)}}`
},

{
  id:'t08', cat:'texto', title:'Glitch',
  desc:'Duas cópias em ciano e magenta deslocadas com clip-path pulando.',
  tags:['glitch','clip-path','::before'], hint:'passe o mouse',
  html:`<div class="t08"><b class="t08-t" data-t="SYSTEM_ERROR">SYSTEM_ERROR</b></div>`,
  css:`
    .t08-t{position:relative;font-family:var(--mono);font-size:24px;font-weight:600;color:#f0ede7;letter-spacing:.02em;
      cursor:pointer;display:inline-block}
    .t08-t::before,.t08-t::after{content:attr(data-t);position:absolute;left:0;top:0;width:100%;overflow:hidden}
    .t08-t::before{color:#0ff;clip-path:inset(0 0 65% 0);transform:translate(-2px,-1px);opacity:.85}
    .t08-t::after{color:#f0f;clip-path:inset(70% 0 0 0);transform:translate(2px,1px);opacity:.85}
    .t08-t:hover::before{animation:t08a .42s steps(2) infinite}
    .t08-t:hover::after{animation:t08b .42s steps(2) infinite}
    .t08-t:hover{animation:t08c .42s steps(3) infinite}
    @keyframes t08a{0%{clip-path:inset(0 0 78% 0);transform:translate(-4px,-1px)}
      50%{clip-path:inset(28% 0 40% 0);transform:translate(4px,1px)}
      100%{clip-path:inset(66% 0 8% 0);transform:translate(-3px,0)}}
    @keyframes t08b{0%{clip-path:inset(72% 0 0 0);transform:translate(4px,1px)}
      50%{clip-path:inset(38% 0 34% 0);transform:translate(-4px,-1px)}
      100%{clip-path:inset(6% 0 74% 0);transform:translate(3px,0)}}
    @keyframes t08c{0%,100%{transform:none}50%{transform:translateX(1px)}}`
},

{
  id:'t09', cat:'texto', title:'Contorno → preenchido',
  desc:'-webkit-text-stroke com o fill entrando por background-size.',
  tags:['text-stroke','background-size','hover'], hint:'passe o mouse',
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
      -webkit-background-clip:text;background-clip:text;
      transition:background-size .6s cubic-bezier(.65,0,.35,1)}
    .t09-a{background-size:0% 100%;background-position:left center}
    .t09-a:hover{background-size:100% 100%}
    .t09-b{-webkit-text-stroke-color:#cf9b6a;background-image:linear-gradient(#cf9b6a,#cf9b6a);
      background-size:100% 0%;background-position:left bottom}
    .t09-b:hover{background-size:100% 100%}`
},

{
  id:'t10', cat:'texto', title:'Headline em três tempos',
  desc:'Máscara + escala + peso variável entrando em ordem — abertura de página.',
  tags:['composição','stagger','letter-spacing'],
  html:`
    <div class="t10">
      <span class="t10-k">estúdio independente</span>
      <h4><span class="m"><i>Fazemos marcas</i></span><span class="m"><i>se moverem.</i></span></h4>
      <div class="t10-cta"><button>Ver trabalhos</button><span>desde 2014</span></div>
    </div>`,
  css:`
    .t10{text-align:center;padding:0 16px}
    .t10-k{display:inline-block;font-family:var(--mono);font-size:10px;letter-spacing:.22em;text-transform:uppercase;
      color:#d4af37;opacity:0;animation:t10f .7s cubic-bezier(.22,1,.36,1) .05s forwards}
    .t10 h4{margin-top:12px;font-size:25px;font-weight:800;letter-spacing:-.04em;color:#f5f2ec}
    .t10 .m{display:block;overflow:hidden}
    .t10 .m i{display:block;font-style:normal;transform:translateY(105%);
      animation:t10u .95s cubic-bezier(.22,1,.36,1) forwards}
    .t10 .m:nth-child(1) i{animation-delay:.2s}
    .t10 .m:nth-child(2) i{animation-delay:.32s;color:#b08ac9}
    .t10-cta{margin-top:18px;display:flex;gap:12px;align-items:center;justify-content:center;
      opacity:0;animation:t10f .8s cubic-bezier(.22,1,.36,1) .75s forwards}
    .t10-cta button{padding:9px 18px;border-radius:99px;background:#f0ede7;color:#0d0c0b;font-size:12.5px;font-weight:700}
    .t10-cta span{font-size:11.5px;color:#726e67}
    @keyframes t10u{to{transform:none}}
    @keyframes t10f{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}`
}

);
