/* ==========================================================
   EFEITOS AVANÇADOS · bloco B (fx04–fx16)
   3D integrado a imagens — tudo vanilla, cenas procedurais
   ========================================================== */
(window.ANIMDB = window.ANIMDB || []).push(

{
  id:'fx04', cat:'walk', title:'Sequência de frames scrubbed no scroll',
  desc:'Um voo de câmera é pré-renderizado em ~40 canvases na montagem; o scroll vira só um índice nesse array — desenhar um frame pronto por rolagem é O(1), como fazem Apple e Samsung com sequências de JPEG/WebP.',
  tags:['image sequence','canvas','FFmpeg workflow','scroll scrub'],
  stage:'scroll', hint:'role ↓',
  html:`
    <div class="fx04">
      <div class="fx04-view">
        <canvas class="fx04-cv" width="640" height="300"></canvas>
        <b class="fx04-lbl">frame <i>00</i>/39</b>
      </div>
      <div class="fx04-body">
        <p>Em produção os frames vêm de um render (Blender, AE) quebrado em imagens via FFmpeg; aqui cada frame é desenhado proceduralmente uma única vez e guardado.</p>
        <div class="fx04-fill"></div>
        <div class="fx-refs"><span class="fx-refs__label">Referências</span><a href="https://dev.to/" target="_blank" rel="noopener">Guia no DEV</a><a href="https://scrollmagic.io/" target="_blank" rel="noopener">ScrollMagic image sequence</a></div>
      </div>
    </div>`,
  css:`
    .fx04-view{position:sticky;top:0;height:240px;overflow:hidden;background:#0b0b10}
    .fx04-cv{width:100%;height:100%;display:block}
    .fx04-lbl{position:absolute;top:10px;right:12px;font-family:var(--mono);font-size:10px;
      color:#d7d7e2;background:rgba(10,10,14,.6);border:1px solid #2a2a33;border-radius:6px;padding:3px 8px}
    .fx04-lbl i{font-style:normal;color:#d4af37}
    .fx04-body{padding:22px 18px;background:#101014;color:#8b8a95;font-size:12.5px;line-height:1.7}
    .fx04-fill{height:520px;margin:18px 0;border-radius:10px;
      background:repeating-linear-gradient(#16161c 0 26px,#121218 26px 52px)}`,
  js:function(root,ctx){
    var stage = root.closest('.stage');
    var cv = root.querySelector('.fx04-cv'), g = cv.getContext('2d');
    var lbl = root.querySelector('.fx04-lbl i');
    var W = cv.width, H = cv.height, N = 40, frames = [];

    // pré-render: 40 frames de um voo sobre "montanhas" procedurais
    for (var f = 0; f < N; f++){
      var k = f / (N - 1);                       // progresso do voo 0..1
      var c = document.createElement('canvas');
      c.width = W; c.height = H;
      var x = c.getContext('2d');
      // céu esquenta conforme "avançamos" para o horizonte
      var sky = x.createLinearGradient(0,0,0,H);
      sky.addColorStop(0,'#0b0b14');
      sky.addColorStop(.6,'rgb(' + Math.round(38+60*k) + ',' + Math.round(26+22*k) + ',' + Math.round(46+8*k) + ')');
      sky.addColorStop(1,'#1a1410');
      x.fillStyle = sky; x.fillRect(0,0,W,H);
      // sol que sobe
      x.beginPath(); x.arc(W*.62, H*(.62-.25*k), 18+26*k, 0, 7);
      x.fillStyle = 'rgba(212,175,55,' + (.25+.5*k) + ')'; x.fill();
      // 4 cordilheiras: zoom + deslocamento lateral crescem com k
      for (var m = 0; m < 4; m++){
        var depth = m / 3;                       // 0 = fundo, 1 = frente
        var zoom = 1 + k * (0.4 + depth * 2.2);  // frente cresce mais = voo
        var shift = k * (30 + depth * 260);      // e desliza mais rápido
        x.beginPath(); x.moveTo(0,H);
        for (var px = 0; px <= W; px += 8){
          var wx = (px + shift) / zoom;
          var yv = Math.sin(wx*.012 + m*17) * 24 + Math.sin(wx*.05 + m*7) * 9;
          x.lineTo(px, H - (34 + m*38 + yv) * zoom * (.35 + depth*.35));
        }
        x.lineTo(W,H); x.closePath();
        var tons = ['#232032','#2e2540','#42315a','#5a3f74'];
        x.fillStyle = tons[m]; x.globalAlpha = .55 + depth*.45; x.fill();
        x.globalAlpha = 1;
      }
      frames.push(c);
    }

    var cur = -1;
    function draw(){
      var max = stage.scrollHeight - stage.clientHeight;
      var k = max > 0 ? stage.scrollTop / max : 0;
      var i = Math.min(N - 1, Math.floor(k * N));
      if (i === cur) return;                     // frame já está na tela
      cur = i;
      g.clearRect(0,0,W,H);
      g.drawImage(frames[i],0,0);
      lbl.textContent = String(i).padStart(2,'0');
    }
    ctx.on(stage,'scroll',draw,{passive:true});
    draw();
  }
},

{
  id:'fx05', cat:'walk', title:'Câmera 3D no scroll (mundo CSS)',
  desc:'Painéis vivem num mundo preserve-3d em profundidades (translateZ) diferentes; o scroll não move os painéis, move a CÂMERA — um único transform no container (translateZ + rotateY) atravessa a cena.',
  tags:['preserve-3d','perspective','camera rig','scroll-driven'],
  stage:'scroll', hint:'role ↓',
  html:`
    <div class="fx05">
      <div class="fx05-view">
        <div class="fx05-scene">
          <div class="fx05-world">
            <div class="fx05-p" style="transform:translate3d(-150px,-10px,-200px)"><b>01</b>ENTRADA</div>
            <div class="fx05-p fx05-p--b" style="transform:translate3d(140px,20px,-600px)"><b>02</b>GALERIA</div>
            <div class="fx05-p fx05-p--c" style="transform:translate3d(-120px,-25px,-1050px)"><b>03</b>ESTÚDIO</div>
            <div class="fx05-p fx05-p--d" style="transform:translate3d(130px,10px,-1500px)"><b>04</b>SAÍDA</div>
          </div>
        </div>
      </div>
      <div class="fx05-body">
        <div class="fx05-fill"></div>
        <div class="fx-refs"><span class="fx-refs__label">Referências</span><a href="https://www.awwwards.com/" target="_blank" rel="noopener">Awwwards — scroll 3D</a><a href="https://gsap.com/docs/v3/Plugins/ScrollTrigger/" target="_blank" rel="noopener">GSAP ScrollTrigger</a></div>
      </div>
    </div>`,
  css:`
    .fx05-view{position:sticky;top:0;height:250px;overflow:hidden;
      background:radial-gradient(80% 100% at 50% 30%,#15121e,#0a0a10)}
    .fx05-scene{position:absolute;inset:0;perspective:520px}
    .fx05-world{position:absolute;inset:0;transform-style:preserve-3d;will-change:transform}
    .fx05-p{position:absolute;left:50%;top:50%;width:190px;height:120px;margin:-60px 0 0 -95px;
      display:flex;flex-direction:column;justify-content:flex-end;padding:12px;border-radius:10px;
      background:linear-gradient(160deg,#2a2440,#171326);border:1px solid #3d3660;
      color:#d7d7e2;font-size:12px;letter-spacing:.14em;backface-visibility:hidden}
    .fx05-p b{font-family:var(--mono);font-size:10px;color:#d4af37;margin-bottom:4px}
    .fx05-p--b{background:linear-gradient(160deg,#33224a,#1a1226);border-color:#5a3f74}
    .fx05-p--c{background:linear-gradient(160deg,#14332a,#0e1c17);border-color:#2c5c48}
    .fx05-p--c b{color:#5cc88f}
    .fx05-p--d{background:linear-gradient(160deg,#3a2f16,#1c160c);border-color:#6a5626}
    .fx05-body{background:#101014}
    .fx05-fill{height:700px;background:repeating-linear-gradient(#14141a 0 26px,#101016 26px 52px)}`,
  js:function(root,ctx){
    var stage = root.closest('.stage');
    var world = root.querySelector('.fx05-world');
    function cam(){
      var max = stage.scrollHeight - stage.clientHeight;
      var k = max > 0 ? stage.scrollTop / max : 0;
      // a câmera avança 1500px pelo eixo Z e faz um leve slalom em Y
      var z = k * 1500;
      var ry = Math.sin(k * Math.PI * 2) * 7;
      world.style.transform = 'translateZ(' + z + 'px) rotateY(' + ry + 'deg)';
    }
    ctx.on(stage,'scroll',cam,{passive:true});
    cam();
  }
},

{
  id:'fx06', cat:'walk', title:'Colagem cinemática (painéis)',
  desc:'Cada painel calcula seu próprio progresso pela posição no palco e anima clip-path (máscara) + scale em fases diferentes — a imagem "revela" em vez de só aparecer, o corte editorial dos sites premiados.',
  tags:['panel transitions','clip-path','editorial'],
  stage:'scroll', hint:'role ↓',
  html:`
    <div class="fx06">
      <header class="fx06-hd"><b>Nº 07</b><h4>COLAGEM</h4><span>edição de inverno</span></header>
      <figure class="fx06-pn fx06-pn--a" data-fx="wipe-x"><div class="fx06-img fx06-img--a"></div><figcaption>a luz entra pela esquerda</figcaption></figure>
      <figure class="fx06-pn fx06-pn--b" data-fx="wipe-y"><div class="fx06-img fx06-img--b"></div><figcaption>a cortina sobe</figcaption></figure>
      <figure class="fx06-pn fx06-pn--c" data-fx="iris"><div class="fx06-img fx06-img--c"></div><figcaption>íris fecha o ensaio</figcaption></figure>
      <div class="fx-refs"><span class="fx-refs__label">Referências</span><a href="https://www.awwwards.com/sites/manet" target="_blank" rel="noopener">Awwwards — Manet</a><a href="referencias/awwwards-manet.webm" target="_blank" rel="noopener">🎬 gravação do demo</a></div>
    </div>`,
  css:`
    .fx06{background:#0e0e13;padding-bottom:16px}
    .fx06-hd{display:flex;align-items:baseline;gap:12px;padding:22px 18px 8px;color:#d7d7e2}
    .fx06-hd b{font-family:var(--mono);font-size:10px;color:#d4af37}
    .fx06-hd h4{margin:0;font-size:22px;letter-spacing:.3em}
    .fx06-hd span{font-size:11px;color:#6f6e7a;margin-left:auto}
    .fx06-pn{margin:26px 18px;position:relative}
    .fx06-pn--b{margin-left:70px}
    .fx06-pn--c{margin-right:70px}
    .fx06-img{height:170px;border-radius:8px;will-change:clip-path,transform}
    .fx06-img--a{background:linear-gradient(115deg,#5a3f74 0%,#2a1f3a 55%,#d4af37 130%)}
    .fx06-img--b{background:radial-gradient(120% 100% at 20% 100%,#1f4a38,#0f1f18 70%),#0f1f18;
      background-blend-mode:screen}
    .fx06-img--c{background:conic-gradient(from 210deg at 60% 40%,#b08ac9,#2a1f3a 40%,#d4af37 75%,#b08ac9)}
    .fx06-pn figcaption{margin-top:8px;font-size:11px;color:#777682;font-family:var(--mono)}`,
  js:function(root,ctx){
    var stage = root.closest('.stage');
    var pns = root.querySelectorAll('.fx06-pn');
    function prog(el){
      // 0 quando o topo do painel encosta na base do palco, 1 no meio
      var s = stage.getBoundingClientRect(), r = el.getBoundingClientRect();
      return Math.max(0, Math.min(1, (s.bottom - r.top) / (s.height * .75)));
    }
    function upd(){
      pns.forEach(function(pn){
        var k = prog(pn), img = pn.querySelector('.fx06-img');
        var e = 1 - Math.pow(1 - k, 3);          // easeOutCubic
        var fx = pn.dataset.fx;
        if (fx === 'wipe-x') img.style.clipPath = 'inset(0 ' + ((1-e)*100) + '% 0 0 round 8px)';
        if (fx === 'wipe-y') img.style.clipPath = 'inset(' + ((1-e)*100) + '% 0 0 0 round 8px)';
        if (fx === 'iris')   img.style.clipPath = 'circle(' + (e*75) + '% at 50% 50%)';
        img.style.transform = 'scale(' + (1.15 - .15*e) + ')';
      });
    }
    ctx.on(stage,'scroll',upd,{passive:true});
    upd();
  }
},

{
  id:'fx11', cat:'css3d', title:'Tilt 3D em camadas',
  desc:'Cinco camadas em translateZ crescente dentro de um preserve-3d; o mouse define um alvo de rotateX/Y e um loop de lerp persegue o alvo — a paralaxe entre camadas vende a profundidade, o glare segue o cursor.',
  tags:['preserve-3d','translateZ','tilt','glare'], hint:'mova o mouse',
  html:`
    <div class="fx11">
      <div class="fx11-card">
        <div class="fx11-l fx11-bg"></div>
        <div class="fx11-l fx11-mid"><i></i><i></i><i></i></div>
        <div class="fx11-l fx11-subj"></div>
        <div class="fx11-l fx11-glare"></div>
        <div class="fx11-l fx11-txt"><b>AURUM</b><span>edição limitada</span></div>
      </div>
      <div class="fx-refs"><span class="fx-refs__label">Referências</span><a href="https://www.frontend.fyi/" target="_blank" rel="noopener">Frontend.fyi — parallax tilt</a><a href="https://alvarotrigo.com/blog/" target="_blank" rel="noopener">fullPage 3D generator</a></div>
    </div>`,
  css:`
    .fx11{perspective:700px;text-align:center}
    .fx11-card{position:relative;width:210px;height:270px;margin:0 auto;border-radius:14px;
      transform-style:preserve-3d;will-change:transform;
      box-shadow:0 30px 50px -20px rgba(0,0,0,.7)}
    .fx11-l{position:absolute;inset:0;border-radius:14px}
    .fx11-bg{background:linear-gradient(160deg,#1c1830,#0d0c14 70%);border:1px solid #322c4c}
    .fx11-mid{transform:translateZ(22px)}
    .fx11-mid i{position:absolute;border-radius:50%;background:radial-gradient(circle,#b08ac955,transparent 70%)}
    .fx11-mid i:nth-child(1){width:90px;height:90px;top:18px;left:-12px}
    .fx11-mid i:nth-child(2){width:60px;height:60px;bottom:40px;right:-6px}
    .fx11-mid i:nth-child(3){width:40px;height:40px;top:90px;right:40px;background:radial-gradient(circle,#5cc88f44,transparent 70%)}
    .fx11-subj{transform:translateZ(44px);
      background:radial-gradient(45% 38% at 50% 42%,#d4af37,#8a6b1c 60%,transparent 72%)}
    .fx11-glare{transform:translateZ(56px);pointer-events:none;opacity:.5;
      background:radial-gradient(120px 90px at var(--gx,50%) var(--gy,30%),rgba(255,255,255,.28),transparent 70%)}
    .fx11-txt{transform:translateZ(66px);display:flex;flex-direction:column;justify-content:flex-end;
      align-items:center;padding-bottom:20px;color:#d7d7e2}
    .fx11-txt b{font-size:19px;letter-spacing:.32em}
    .fx11-txt span{font-size:10px;color:#8b8a95;font-family:var(--mono);margin-top:4px}`,
  js:function(root,ctx){
    var card = root.querySelector('.fx11-card');
    var tx = 0, ty = 0, rx = 0, ry = 0;          // alvo e atual
    ctx.on(root,'pointermove',function(e){
      var r = card.getBoundingClientRect();
      var kx = (e.clientX - r.left) / r.width - .5;   // -.5 .. .5
      var ky = (e.clientY - r.top) / r.height - .5;
      tx = -ky * 22; ty = kx * 26;
      card.style.setProperty('--gx', ((kx+.5)*100) + '%');
      card.style.setProperty('--gy', ((ky+.5)*100) + '%');
    });
    ctx.on(root,'pointerleave',function(){ tx = 0; ty = 0; });
    ctx.loop(function(){
      rx += (tx - rx) * .09;                     // lerp = peso da inércia
      ry += (ty - ry) * .09;
      card.style.transform = 'rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
      card.style.boxShadow = (ry*-1.2) + 'px ' + (30+rx) + 'px 50px -20px rgba(0,0,0,.7)';
    });
  }
},

{
  id:'fx12', cat:'css3d', title:'Flip 3D + shimmer holográfico',
  desc:'Frente e verso ocupam o mesmo lugar com backface-visibility:hidden; o clique gira o pai 180° em Y. O holográfico é um conic-gradient girando sob uma mask radial, deslizando pela superfície como foil.',
  tags:['backface-visibility','conic-gradient','holographic','mask'], hint:'clique',
  html:`
    <div class="fx12">
      <div class="fx12-flip">
        <div class="fx12-inner">
          <div class="fx12-face fx12-front">
            <div class="fx12-holo"></div>
            <b>♛</b><span>IMPERO</span><i>clique para virar</i>
          </div>
          <div class="fx12-face fx12-back">
            <em>№ 004 / 100</em>
            <p>Impresso em foil dourado sobre papel de algodão. Autenticado.</p>
            <i>clique para voltar</i>
          </div>
        </div>
      </div>
      <div class="fx-refs"><span class="fx-refs__label">Referências</span><a href="https://codepen.io/" target="_blank" rel="noopener">Effect.Labs</a><a href="https://freefrontend.com/css-3d/" target="_blank" rel="noopener">CSS 3D examples</a></div>
    </div>`,
  css:`
    .fx12{perspective:900px;text-align:center}
    .fx12-flip{width:200px;height:260px;margin:0 auto;cursor:pointer}
    .fx12-inner{position:relative;width:100%;height:100%;transform-style:preserve-3d;
      transition:transform .9s cubic-bezier(.34,1.3,.5,1)}
    .fx12-flip.is-flip .fx12-inner{transform:rotateY(180deg)}
    .fx12-face{position:absolute;inset:0;border-radius:14px;backface-visibility:hidden;
      display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;
      overflow:hidden;border:1px solid #3a3450}
    .fx12-front{background:linear-gradient(155deg,#181428,#0c0b12 70%);color:#d7d7e2}
    .fx12-front b{font-size:44px;color:#d4af37;position:relative;z-index:1}
    .fx12-front span{letter-spacing:.34em;font-size:13px;position:relative;z-index:1}
    .fx12-face i{position:absolute;bottom:12px;font-size:9.5px;font-style:normal;
      color:#777682;font-family:var(--mono)}
    .fx12-holo{position:absolute;inset:-40%;opacity:.5;
      background:conic-gradient(from 0deg,#d4af37,#b08ac9,#5cc88f,#d4af37);
      -webkit-mask:radial-gradient(60% 45% at var(--hx,30%) var(--hy,20%),#000,transparent 70%);
      mask:radial-gradient(60% 45% at var(--hx,30%) var(--hy,20%),#000,transparent 70%);
      animation:fx12-spin 6s linear infinite}
    @keyframes fx12-spin{to{transform:rotate(360deg)}}
    .fx12-back{background:linear-gradient(155deg,#241d10,#12100a 70%);transform:rotateY(180deg);
      color:#c9c4b4;padding:22px}
    .fx12-back em{font-family:var(--mono);font-size:11px;color:#d4af37;font-style:normal}
    .fx12-back p{font-size:11.5px;line-height:1.7;color:#8f8a7c}`,
  js:function(root,ctx){
    var flip = root.querySelector('.fx12-flip');
    var holo = root.querySelector('.fx12-holo');
    ctx.on(flip,'click',function(){ flip.classList.toggle('is-flip'); });
    // a mask do foil persegue o cursor — o brilho "anda" pela carta
    ctx.on(flip,'pointermove',function(e){
      var r = flip.getBoundingClientRect();
      holo.style.setProperty('--hx', ((e.clientX-r.left)/r.width*100) + '%');
      holo.style.setProperty('--hy', ((e.clientY-r.top)/r.height*100) + '%');
    });
  }
},

{
  id:'fx13', cat:'orquestra', title:'Zoom-into-image (portal)',
  desc:'Uma janela pequena fica pinada (sticky) enquanto o scroll escala ela até cobrir o viewport do palco; cruzado o limiar, o conteúdo de dentro assume a tela — o pin+scale que o ScrollTrigger popularizou.',
  tags:['pin','scale','portal','scroll scrub'],
  stage:'scroll', hint:'role ↓',
  html:`
    <div class="fx13">
      <div class="fx13-pin">
        <p class="fx13-intro">todo projeto começa por uma porta</p>
        <div class="fx13-win">
          <div class="fx13-inside"><b>DENTRO</b><span>você atravessou o portal</span></div>
        </div>
      </div>
      <div class="fx13-after">
        <p>A seção seguinte já nasce "dentro" da imagem — a transição não corta, atravessa.</p>
        <div class="fx-refs"><span class="fx-refs__label">Referências</span><a href="https://gsap.com/docs/v3/Plugins/ScrollTrigger/" target="_blank" rel="noopener">GSAP ScrollTrigger docs</a><a href="https://codepen.io/GreenSock" target="_blank" rel="noopener">showcase CodePen</a><a href="referencias/gsap-scrolltrigger.webm" target="_blank" rel="noopener">🎬 gravação do demo</a></div>
      </div>
    </div>`,
  css:`
    .fx13-pin{position:sticky;top:0;height:250px;overflow:hidden;background:#0d0d12;
      display:grid;place-items:center}
    .fx13-intro{position:absolute;top:26px;left:0;right:0;text-align:center;
      font-size:12px;color:#777682;font-family:var(--mono);transition:opacity .3s}
    .fx13-win{width:110px;height:74px;border-radius:10px;overflow:hidden;
      border:1px solid #6a5626;will-change:transform;
      background:radial-gradient(90% 120% at 50% 100%,#3a2c10,#191308 60%),
                 linear-gradient(#141019,#0e0c12)}
    .fx13-inside{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;
      gap:6px;opacity:0;transition:opacity .4s;color:#d7d7e2}
    .fx13-inside b{font-size:15px;letter-spacing:.3em;color:#d4af37}
    .fx13-inside span{font-size:9px;color:#8b8a95;font-family:var(--mono)}
    .fx13-scroller{height:620px}
    .fx13-after{padding:26px 18px 30px;background:#0b0b0f;color:#8b8a95;font-size:12.5px;line-height:1.7}`,
  js:function(root,ctx){
    var stage = root.closest('.stage');
    // o "trilho" que dá curso de scroll ao pin
    var rail = document.createElement('div');
    rail.className = 'fx13-scroller';
    root.querySelector('.fx13-pin').after(rail);
    var win = root.querySelector('.fx13-win');
    var intro = root.querySelector('.fx13-intro');
    var inside = root.querySelector('.fx13-inside');
    function upd(){
      var k = Math.max(0, Math.min(1, stage.scrollTop / 560));
      var e = k*k*(3-2*k);                       // smoothstep
      // 110px precisa virar ~palco inteiro: escala até ~6x
      win.style.transform = 'scale(' + (1 + e*5.4) + ')';
      win.style.borderRadius = (10 - e*10) + 'px';
      intro.style.opacity = 1 - k*2.5;
      inside.style.opacity = k > .55 ? 1 : 0;
    }
    ctx.on(stage,'scroll',upd,{passive:true});
    upd();
  }
},

{
  id:'fx14', cat:'orquestra', title:'Parallax multicamada + smooth scroll',
  desc:'O scrollTop cru nunca chega às camadas: um valor "suave" o persegue por lerp a cada frame (o mesmo princípio do Lenis) e é ele que dirige as 4 velocidades de parallax — o movimento ganha peso de câmera.',
  tags:['parallax','lerp','smooth scroll','Lenis'],
  stage:'scroll', hint:'role ↓',
  html:`
    <div class="fx14">
      <div class="fx14-view">
        <div class="fx14-l fx14-ceu" data-sp="0.06"></div>
        <div class="fx14-l fx14-serra" data-sp="0.2"><i></i><i></i></div>
        <div class="fx14-l fx14-mata" data-sp="0.45"><i></i><i></i><i></i></div>
        <div class="fx14-l fx14-chao" data-sp="0.8"></div>
        <h4 class="fx14-ttl" data-sp="-0.18">VALE</h4>
      </div>
      <div class="fx14-body">
        <p>Compare: solte a roda do mouse com força — as camadas desaceleram juntas em vez de travar no último tick.</p>
        <div class="fx14-fill"></div>
        <div class="fx-refs"><span class="fx-refs__label">Referências</span><a href="https://lenis.darkroom.engineering/" target="_blank" rel="noopener">Lenis</a><a href="https://freefrontend.com/css-parallax/" target="_blank" rel="noopener">FreeFrontend parallax</a><a href="referencias/lenis-smooth-scroll.webm" target="_blank" rel="noopener">🎬 gravação do demo</a></div>
      </div>
    </div>`,
  css:`
    .fx14-view{position:sticky;top:0;height:230px;overflow:hidden;
      background:linear-gradient(#0d0d16,#1b1526 65%,#241a2e)}
    .fx14-l{position:absolute;inset:0;will-change:transform}
    .fx14-ceu{background:radial-gradient(30% 26% at 70% 30%,#b08ac966,transparent 70%)}
    .fx14-serra i{position:absolute;bottom:36px;width:200px;height:120px;border-radius:50% 50% 0 0;background:#241f38}
    .fx14-serra i:nth-child(1){left:-30px}
    .fx14-serra i:nth-child(2){right:-40px;width:260px;height:150px;background:#1e1a30}
    .fx14-mata i{position:absolute;bottom:16px;width:150px;height:80px;border-radius:50% 50% 0 0;background:#173626}
    .fx14-mata i:nth-child(1){left:0}
    .fx14-mata i:nth-child(2){left:130px;height:60px;background:#12291d}
    .fx14-mata i:nth-child(3){right:-20px;width:190px;background:#1a3f2c}
    .fx14-chao{top:auto;height:26px;background:linear-gradient(#0e2418,#081510)}
    .fx14-ttl{position:absolute;left:0;right:0;top:70px;text-align:center;margin:0;
      font-size:34px;font-weight:800;letter-spacing:.3em;color:#d7d7e2;mix-blend-mode:overlay}
    .fx14-body{padding:22px 18px;background:#0c0c11;color:#8b8a95;font-size:12.5px;line-height:1.7}
    .fx14-fill{height:560px;margin-top:18px;border-radius:10px;
      background:repeating-linear-gradient(#13131a 0 26px,#0f0f15 26px 52px)}`,
  js:function(root,ctx){
    var stage = root.closest('.stage');
    var layers = root.querySelectorAll('[data-sp]');
    var smooth = 0;
    ctx.loop(function(){
      // núcleo do "Lenis caseiro": persegue o alvo com 8% por frame
      smooth += (stage.scrollTop - smooth) * .08;
      if (Math.abs(stage.scrollTop - smooth) < .05) smooth = stage.scrollTop;
      layers.forEach(function(l){
        l.style.transform = 'translate3d(0,' + (-smooth * +l.dataset.sp) + 'px,0)';
      });
    });
  }
},

{
  id:'fx15', cat:'splat', title:'Nuvem de pontos navegável (splat-like)',
  desc:'~2500 pontos 3D (casa + árvore gerados por código) projetados em canvas 2D com perspectiva simples (f/(f+z)); arraste orbita com inércia e os pontos são ordenados por profundidade — o esqueleto do que um gaussian splat renderiza com gaussianas em vez de dots.',
  tags:['gaussian splatting','point cloud','orbit','projeção 3D'], hint:'arraste',
  html:`
    <div class="fx15">
      <canvas class="fx15-cv" width="560" height="330"></canvas>
      <div class="fx-refs"><span class="fx-refs__label">Referências</span><a href="https://superspl.at/" target="_blank" rel="noopener">SuperSplat</a><a href="https://sparkjs.dev/" target="_blank" rel="noopener">Spark</a><a href="https://github.com/mkkellogg/GaussianSplats3D" target="_blank" rel="noopener">GaussianSplats3D (three.js)</a><a href="referencias/supersplat-gallery.webm" target="_blank" rel="noopener">🎬 gravação do demo</a></div>
    </div>`,
  css:`
    .fx15{width:100%;padding:0 14px}
    .fx15-cv{width:100%;display:block;border-radius:12px;cursor:grab;touch-action:none;
      background:radial-gradient(80% 100% at 50% 20%,#12121c,#08080d)}
    .fx15-cv:active{cursor:grabbing}`,
  js:function(root,ctx){
    var cv = root.querySelector('.fx15-cv'), g = cv.getContext('2d');
    var W = cv.width, H = cv.height;
    var pts = [];
    function pt(x,y,z,c){ pts.push({x:x,y:y,z:z,c:c}); }
    var R = Math.random;

    // ---- cena procedural: casa + árvore + chão ----
    var i;
    for (i = 0; i < 700; i++)                    // paredes da casa
      pt((R()-.5)*80, R()*50, (R()-.5)*60, '#d4af37');
    for (i = 0; i < 500; i++){                   // telhado (pirâmide)
      var h = R()*30;
      pt((R()-.5)*(80-h*2.2), 50+h, (R()-.5)*(60-h*1.6), '#b08ac9');
    }
    for (i = 0; i < 250; i++)                    // tronco
      pt(85+(R()-.5)*10, R()*45, (R()-.5)*10, '#8a6b4a');
    for (i = 0; i < 600; i++){                   // copa (esfera)
      var a = R()*6.283, b = Math.acos(2*R()-1), r = 24*Math.cbrt(R());
      pt(85+r*Math.sin(b)*Math.cos(a), 62+r*Math.cos(b), r*Math.sin(b)*Math.sin(a), '#5cc88f');
    }
    for (i = 0; i < 450; i++){                   // chão (disco)
      var a2 = R()*6.283, r2 = 130*Math.sqrt(R());
      pt(r2*Math.cos(a2), 0, r2*Math.sin(a2), '#3a3948');
    }

    var yaw = .7, pitch = .3, vy = .004, vp = 0; // órbita + inércia
    var drag = null;
    ctx.on(cv,'pointerdown',function(e){
      drag = {x:e.clientX, y:e.clientY};
      cv.setPointerCapture(e.pointerId);
    });
    ctx.on(cv,'pointermove',function(e){
      if (!drag) return;
      vy = (e.clientX - drag.x) * .005;
      vp = (e.clientY - drag.y) * .004;
      drag = {x:e.clientX, y:e.clientY};
    });
    ctx.on(cv,'pointerup',function(){ drag = null; });
    ctx.on(cv,'pointercancel',function(){ drag = null; });

    var proj = [];
    ctx.loop(function(){
      yaw += vy; pitch += vp;
      if (!drag){ vy *= .95; vp *= .92; if (Math.abs(vy) < .0015) vy = .0015; }
      pitch = Math.max(.05, Math.min(1.2, pitch));

      var cy = Math.cos(yaw), sy = Math.sin(yaw);
      var cp = Math.cos(pitch), sp = Math.sin(pitch);
      var f = 300, camz = 260;
      proj.length = 0;
      for (var j = 0; j < pts.length; j++){
        var p = pts[j];
        var x = p.x*cy - p.z*sy, z1 = p.x*sy + p.z*cy;   // gira em Y
        var y = (p.y-30)*cp - z1*sp, z = (p.y-30)*sp + z1*cp; // inclina
        var d = camz + z;
        if (d < 40) continue;
        var s = f / d;
        proj.push({sx:W/2 + x*s, sy:H*.55 - y*s, s:s, z:d, c:p.c});
      }
      proj.sort(function(a,b){ return b.z - a.z; }); // pinta o fundo antes

      g.clearRect(0,0,W,H);
      for (var k = 0; k < proj.length; k++){
        var q = proj[k];
        g.globalAlpha = Math.min(1, q.s*1.1);
        g.fillStyle = q.c;
        g.fillRect(q.sx, q.sy, Math.max(1, q.s*2.2), Math.max(1, q.s*2.2));
      }
      g.globalAlpha = 1;
    });
  }
},

{
  id:'fx16', cat:'ia', title:'Dolly zoom (Vertigo) + presets de câmera',
  desc:'No dolly zoom o fundo escala numa direção enquanto o enquadramento compensa na outra — o sujeito fica do mesmo tamanho e o espaço "respira". Cada preset é só uma curva diferente aplicada às mesmas camadas, como os camera controls dos geradores de vídeo por IA.',
  tags:['dolly zoom','Vertigo','orbit','crane','IA video'], hint:'escolha um preset',
  html:`
    <div class="fx16">
      <div class="fx16-scene">
        <div class="fx16-bg"></div>
        <div class="fx16-mid"><i></i><i></i></div>
        <div class="fx16-subj">♛</div>
        <b class="fx16-tag">dolly zoom</b>
      </div>
      <div class="fx16-btns">
        <button data-cam="vertigo" class="is-on">Vertigo</button>
        <button data-cam="dolly">Dolly in</button>
        <button data-cam="orbit">Orbit</button>
        <button data-cam="crane">Crane</button>
      </div>
      <div class="fx-refs"><span class="fx-refs__label">Referências</span><a href="https://higgsfield.ai/" target="_blank" rel="noopener">Higgsfield Camera Controls</a><a href="https://www.immersity.ai/" target="_blank" rel="noopener">Immersity AI</a><a href="referencias/higgsfield-camera.webm" target="_blank" rel="noopener">🎬 gravação do demo</a><a href="referencias/immersity-ai-25d.webm" target="_blank" rel="noopener">🎬 gravação Immersity</a></div>
    </div>`,
  css:`
    .fx16{width:100%;padding:0 14px;text-align:center}
    .fx16-scene{position:relative;height:230px;border-radius:12px;overflow:hidden;
      perspective:600px;background:#08080d}
    .fx16-bg{position:absolute;inset:-30%;will-change:transform;
      background:
        repeating-linear-gradient(90deg,transparent 0 54px,#2a2440 54px 58px),
        repeating-linear-gradient(0deg,transparent 0 44px,#221d36 44px 47px),
        radial-gradient(70% 90% at 50% 30%,#1d1830,#0a0a12)}
    .fx16-mid{position:absolute;inset:0;will-change:transform}
    .fx16-mid i{position:absolute;bottom:20%;width:44px;height:110px;border-radius:6px 6px 0 0;
      background:linear-gradient(#3a3454,#211d34)}
    .fx16-mid i:nth-child(1){left:16%}
    .fx16-mid i:nth-child(2){right:16%;height:88px;background:linear-gradient(#31294a,#1d1930)}
    .fx16-subj{position:absolute;left:50%;top:52%;transform:translate(-50%,-50%);
      font-size:56px;color:#d4af37;will-change:transform;
      text-shadow:0 14px 30px rgba(0,0,0,.8)}
    .fx16-tag{position:absolute;top:10px;left:12px;font-family:var(--mono);font-size:10px;
      color:#d7d7e2;background:rgba(10,10,14,.6);border:1px solid #2a2a33;border-radius:6px;padding:3px 8px}
    .fx16-btns{display:flex;gap:8px;justify-content:center;margin-top:12px;flex-wrap:wrap}
    .fx16-btns button{font-size:11px;padding:7px 14px;border-radius:99px;cursor:pointer;
      background:#16151e;color:#8b8a95;border:1px solid #2a2936;font-family:var(--mono);
      transition:all .25s}
    .fx16-btns button:hover{color:#d7d7e2;border-color:#3d3a4e}
    .fx16-btns button.is-on{background:#d4af37;color:#1b1813;border-color:#d4af37;font-weight:600}`,
  js:function(root,ctx){
    var bg   = root.querySelector('.fx16-bg');
    var mid  = root.querySelector('.fx16-mid');
    var subj = root.querySelector('.fx16-subj');
    var tag  = root.querySelector('.fx16-tag');
    var btns = root.querySelectorAll('.fx16-btns button');
    var cam = 'vertigo', t0 = performance.now();

    var presets = {
      // fundo escala para lá, "lente" compensa: sujeito estável, espaço estica
      vertigo: function(k){
        var w = (Math.sin(k*2)+1)/2;             // 0..1 vai-e-vem
        bg.style.transform   = 'scale(' + (1 + w*.7) + ')';
        mid.style.transform  = 'scale(' + (1 + w*.25) + ')';
        subj.style.transform = 'translate(-50%,-50%) scale(' + (1.12 - w*.12) + ')';
      },
      dolly: function(k){
        var w = (Math.sin(k*1.6)+1)/2;           // tudo cresce junto = aproximar
        bg.style.transform   = 'scale(' + (1 + w*.5) + ')';
        mid.style.transform  = 'scale(' + (1 + w*.35) + ') translateY(' + (w*8) + 'px)';
        subj.style.transform = 'translate(-50%,-50%) scale(' + (1 + w*.3) + ')';
      },
      orbit: function(k){
        var a = Math.sin(k*1.4)*10;              // parallax lateral oposto = órbita
        bg.style.transform   = 'translateX(' + (a*2.4) + 'px) scale(1.15)';
        mid.style.transform  = 'translateX(' + (a*1.1) + 'px) rotateY(' + (a*.7) + 'deg)';
        subj.style.transform = 'translate(-50%,-50%) translateX(' + (-a*.8) + 'px) rotateY(' + (-a) + 'deg)';
      },
      crane: function(k){
        var w = (Math.sin(k*1.5)+1)/2;           // câmera sobe: cena desce e inclina
        bg.style.transform   = 'translateY(' + (w*26) + 'px) scale(1.2)';
        mid.style.transform  = 'translateY(' + (w*14) + 'px) rotateX(' + (w*7) + 'deg)';
        subj.style.transform = 'translate(-50%,-50%) translateY(' + (w*6) + 'px) scale(' + (1 - w*.08) + ')';
      }
    };

    btns.forEach(function(b){
      ctx.on(b,'click',function(){
        btns.forEach(function(x){ x.classList.remove('is-on'); });
        b.classList.add('is-on');
        cam = b.dataset.cam; t0 = performance.now();
        tag.textContent = b.textContent.toLowerCase();
      });
    });
    ctx.loop(function(t){
      presets[cam]((t - t0) / 1000);
    });
  }
}

);
