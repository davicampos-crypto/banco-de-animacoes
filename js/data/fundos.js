/* ==========================================================
   07 · FUNDOS & AMBIENTE
   ========================================================== */
(window.ANIMDB = window.ANIMDB || []).push(

{
  id:'f01', cat:'fundos', title:'Mesh gradient animado',
  desc:'Quatro radiais coloridas em blur, cada uma com seu ciclo. Zero JS.',
  tags:['radial-gradient','blur','CSS only'], stage:'flush',
  html:`<div class="f01"><i></i><i></i><i></i><i></i><b>mesh</b></div>`,
  css:`
    .f01{position:relative;width:100%;height:100%;overflow:hidden;background:#0d0c0b;display:grid;place-items:center}
    .f01 i{position:absolute;width:230px;height:230px;border-radius:50%;filter:blur(58px);opacity:.75;
      mix-blend-mode:screen}
    .f01 i:nth-child(1){background:#d4af37;top:-70px;left:-50px;animation:f01a 9s ease-in-out infinite alternate}
    .f01 i:nth-child(2){background:#b08ac9;bottom:-90px;right:-40px;animation:f01b 11s ease-in-out infinite alternate}
    .f01 i:nth-child(3){background:#cf9b6a;top:30px;right:-70px;animation:f01c 13s ease-in-out infinite alternate}
    .f01 i:nth-child(4){background:#5cc88f;bottom:-40px;left:-20px;animation:f01d 10s ease-in-out infinite alternate}
    .f01 b{position:relative;z-index:2;font-size:26px;font-weight:800;letter-spacing:.3em;color:#0b0b14;
      mix-blend-mode:overlay}
    @keyframes f01a{to{transform:translate(90px,70px) scale(1.25)}}
    @keyframes f01b{to{transform:translate(-70px,-60px) scale(1.15)}}
    @keyframes f01c{to{transform:translate(-90px,90px) scale(.85)}}
    @keyframes f01d{to{transform:translate(80px,-70px) scale(1.2)}}`
},

{
  id:'f02', cat:'fundos', title:'Blobs orgânicos',
  desc:'border-radius de 8 valores animado — parece morph de SVG e custa menos.',
  tags:['border-radius','morph','CSS only'],
  html:`<div class="f02"><i class="b1"></i><i class="b2"></i><i class="b3"></i></div>`,
  css:`
    .f02{position:relative;width:200px;height:200px;display:grid;place-items:center}
    .f02 i{position:absolute;width:150px;height:150px;
      animation:f02 8s ease-in-out infinite;mix-blend-mode:screen}
    .f02 .b1{background:linear-gradient(140deg,#d4af37,#b8871f)}
    .f02 .b2{background:linear-gradient(140deg,#b08ac9,#6f4f86);animation-delay:-2.6s;transform:scale(.85)}
    .f02 .b3{background:linear-gradient(140deg,#5cc88f,#2f7d55);animation-delay:-5.2s;transform:scale(.7)}
    @keyframes f02{
      0%,100%{border-radius:62% 38% 46% 54%/54% 46% 62% 38%;rotate:0deg}
      33%{border-radius:38% 62% 63% 37%/41% 64% 36% 59%;rotate:120deg}
      66%{border-radius:55% 45% 32% 68%/70% 33% 67% 30%;rotate:240deg}}`
},

{
  id:'f03', cat:'fundos', title:'Constelação de partículas',
  desc:'Pontos ligados por linhas quando estão perto; o mouse os empurra.',
  tags:['canvas','particles','rAF'], stage:'flush', hint:'mova o mouse',
  html:`<canvas class="f03"></canvas>`,
  css:`.f03{width:100%;height:100%;display:block;background:#0a0908}`,
  js:function(root,ctx){
    var cv = root.querySelector('.f03'), c = cv.getContext('2d');
    var w = cv.width = cv.offsetWidth, h = cv.height = cv.offsetHeight;
    var m = { x:-999, y:-999 }, P = [];
    for (var i = 0; i < 55; i++)
      P.push({ x:Math.random()*w, y:Math.random()*h, vx:(Math.random()-.5)*.5, vy:(Math.random()-.5)*.5 });

    ctx.on(cv,'mousemove',function(e){
      var r = cv.getBoundingClientRect(); m.x = e.clientX - r.left; m.y = e.clientY - r.top;
    });
    ctx.on(cv,'mouseleave',function(){ m.x = m.y = -999; });

    ctx.loop(function(){
      c.clearRect(0,0,w,h);
      for (var i = 0; i < P.length; i++){
        var p = P[i];
        var dx = p.x - m.x, dy = p.y - m.y, d = Math.hypot(dx,dy);
        if (d < 90){ p.vx += dx/d*.35; p.vy += dy/d*.35; }
        p.vx *= .97; p.vy *= .97;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        for (var j = i+1; j < P.length; j++){
          var q = P[j], dd = Math.hypot(p.x-q.x, p.y-q.y);
          if (dd < 78){
            c.strokeStyle = 'rgba(212,175,55,' + (.35*(1-dd/78)) + ')';
            c.beginPath(); c.moveTo(p.x,p.y); c.lineTo(q.x,q.y); c.stroke();
          }
        }
        c.fillStyle = '#e4dcc9'; c.beginPath(); c.arc(p.x,p.y,1.5,0,6.284); c.fill();
      }
    });
  }
},

{
  id:'f04', cat:'fundos', title:'Grade de pontos reativa',
  desc:'Cada ponto cresce e é atraído pelo cursor. Padrão de fundo "vivo".',
  tags:['canvas','grid','mouse'], stage:'flush', hint:'mova o mouse',
  html:`<canvas class="f04"></canvas>`,
  css:`.f04{width:100%;height:100%;display:block;background:#0d0c0b}`,
  js:function(root,ctx){
    var cv = root.querySelector('.f04'), c = cv.getContext('2d');
    var w = cv.width = cv.offsetWidth, h = cv.height = cv.offsetHeight;
    var G = 22, m = { x:-999, y:-999 }, pts = [];
    for (var y = G/2; y < h; y += G)
      for (var x = G/2; x < w; x += G) pts.push({ x:x, y:y, ox:x, oy:y });

    ctx.on(cv,'mousemove',function(e){
      var r = cv.getBoundingClientRect(); m.x = e.clientX - r.left; m.y = e.clientY - r.top;
    });
    ctx.on(cv,'mouseleave',function(){ m.x = m.y = -999; });

    ctx.loop(function(){
      c.clearRect(0,0,w,h);
      pts.forEach(function(p){
        var dx = m.x - p.ox, dy = m.y - p.oy, d = Math.hypot(dx,dy);
        var f = Math.max(0, 1 - d/110);
        p.x += ((p.ox + dx*f*.42) - p.x) * .18;
        p.y += ((p.oy + dy*f*.42) - p.y) * .18;
        var r = 1 + f*3.2;
        c.fillStyle = f > .02 ? 'rgba(176,138,201,' + (.35 + f*.65) + ')' : 'rgba(110,100,84,.4)';
        c.beginPath(); c.arc(p.x, p.y, r, 0, 6.284); c.fill();
      });
    });
  }
},

{
  id:'f05', cat:'fundos', title:'Aurora',
  desc:'Faixas em blur pesado com rotação lenta e blend screen.',
  tags:['blur','blend-mode','CSS only'], stage:'flush',
  html:`<div class="f05"><i></i><i></i><i></i><span>aurora</span></div>`,
  css:`
    .f05{position:relative;width:100%;height:100%;overflow:hidden;background:#070605;display:grid;place-items:center}
    .f05 i{position:absolute;left:-40%;right:-40%;height:120px;filter:blur(42px);opacity:.6;mix-blend-mode:screen;
      border-radius:50%}
    .f05 i:nth-child(1){top:20px;background:linear-gradient(90deg,transparent,#5cc88f,#b8871f,transparent);
      animation:f05a 8s ease-in-out infinite alternate}
    .f05 i:nth-child(2){top:80px;background:linear-gradient(90deg,transparent,#b08ac9,#cf9b6a,transparent);
      animation:f05b 11s ease-in-out infinite alternate}
    .f05 i:nth-child(3){top:140px;background:linear-gradient(90deg,transparent,#d4af37,#8a6fb0,transparent);
      animation:f05c 9s ease-in-out infinite alternate}
    .f05 span{position:relative;z-index:2;font-family:var(--mono);font-size:11px;letter-spacing:.4em;
      text-transform:uppercase;color:#ddd6c499}
    @keyframes f05a{to{transform:translateY(24px) rotate(-6deg) scaleY(1.5)}}
    @keyframes f05b{to{transform:translateY(-30px) rotate(5deg) scaleY(1.8)}}
    @keyframes f05c{to{transform:translateY(-50px) rotate(-4deg) scaleY(1.3)}}`
},

{
  id:'f06', cat:'fundos', title:'Grain / ruído de filme',
  desc:'Ruído gerado em canvas e reciclado a ~12fps — textura analógica.',
  tags:['canvas','noise','overlay'], stage:'flush',
  html:`
    <div class="f06">
      <div class="f06-bg"><b>GRAIN</b></div>
      <canvas class="f06-n"></canvas>
    </div>`,
  css:`
    .f06{position:relative;width:100%;height:100%;overflow:hidden}
    .f06-bg{position:absolute;inset:0;display:grid;place-items:center;
      background:linear-gradient(140deg,#3c3050,#221d13 60%,#0d0c0b)}
    .f06-bg b{font-size:28px;font-weight:800;letter-spacing:.28em;color:#ffffff22}
    .f06-n{position:absolute;inset:0;width:100%;height:100%;opacity:.42;mix-blend-mode:overlay;pointer-events:none}`,
  js:function(root,ctx){
    var cv = root.querySelector('.f06-n'), c = cv.getContext('2d');
    var w = cv.width = 160, h = cv.height = 160;   // pequeno e esticado por CSS = barato
    var buf = c.createImageData(w,h), d = buf.data;
    var frames = [], F = 5;
    for (var f = 0; f < F; f++){
      for (var i = 0; i < d.length; i += 4){
        var v = 40 + Math.random() * 215;
        d[i] = d[i+1] = d[i+2] = v; d[i+3] = 255;
      }
      var off = document.createElement('canvas'); off.width = w; off.height = h;
      off.getContext('2d').putImageData(buf, 0, 0);
      frames.push(off);
    }
    var k = 0;
    ctx.every(function(){
      c.drawImage(frames[k++ % F], 0, 0);
    }, 80);
  }
},

{
  id:'f07', cat:'fundos', title:'Ondas SVG',
  desc:'Três paths em fase diferente. Loop perfeito por translateX de -50%.',
  tags:['SVG','wave','loop'], stage:'flush',
  html:`
    <div class="f07">
      <svg viewBox="0 0 1200 200" preserveAspectRatio="none">
        <path class="w1" d="M0,120 C150,80 350,160 600,120 C850,80 1050,160 1200,120 L1200,200 L0,200Z"/>
        <path class="w2" d="M0,140 C200,100 400,180 600,140 C800,100 1000,180 1200,140 L1200,200 L0,200Z"/>
        <path class="w3" d="M0,160 C180,130 380,190 600,160 C820,130 1020,190 1200,160 L1200,200 L0,200Z"/>
      </svg>
      <b>ondas</b>
    </div>`,
  css:`
    .f07{position:relative;width:100%;height:100%;overflow:hidden;
      background:linear-gradient(#171410,#201c13)}
    .f07 svg{position:absolute;bottom:0;left:0;width:200%;height:130px}
    .f07 path{transform-origin:0 0}
    .f07 .w1{fill:#3a3320;animation:f07 7s ease-in-out infinite alternate}
    .f07 .w2{fill:#4a4028;opacity:.75;animation:f07 5s ease-in-out infinite alternate-reverse}
    .f07 .w3{fill:#6b5a35;opacity:.6;animation:f07 9s ease-in-out infinite alternate}
    .f07 b{position:absolute;top:34px;left:0;right:0;text-align:center;font-size:11px;font-family:var(--mono);
      letter-spacing:.4em;text-transform:uppercase;color:#d4af3799}
    @keyframes f07{from{transform:translateX(0) scaleY(1)}to{transform:translateX(-14%) scaleY(1.18)}}`
},

{
  id:'f08', cat:'fundos', title:'Starfield / hiperespaço',
  desc:'Projeção em perspectiva: as estrelas aceleram do centro para fora.',
  tags:['canvas','3D','projection'], stage:'flush', hint:'mova o mouse p/ acelerar',
  html:`<canvas class="f08"></canvas>`,
  css:`.f08{width:100%;height:100%;display:block;background:#060504;cursor:crosshair}`,
  js:function(root,ctx){
    var cv = root.querySelector('.f08'), c = cv.getContext('2d');
    var w = cv.width = cv.offsetWidth, h = cv.height = cv.offsetHeight;
    var N = 220, S = [], speed = 1.2, target = 1.2;
    for (var i = 0; i < N; i++) S.push(reset({}));
    function reset(s){
      s.x = (Math.random()-.5) * w * 1.6;
      s.y = (Math.random()-.5) * h * 1.6;
      s.z = Math.random() * w;
      s.pz = s.z;
      return s;
    }
    ctx.on(cv,'mouseenter',function(){ target = 9; });
    ctx.on(cv,'mouseleave',function(){ target = 1.2; });
    ctx.loop(function(){
      speed += (target - speed) * .05;
      c.fillStyle = 'rgba(6,5,4,.35)';
      c.fillRect(0,0,w,h);
      c.save(); c.translate(w/2, h/2);
      S.forEach(function(s){
        s.pz = s.z; s.z -= speed * 6;
        if (s.z < 1){ reset(s); s.pz = s.z; }
        var k = 128 / s.z, pk = 128 / s.pz;
        var x = s.x * k, y = s.y * k, px = s.x * pk, py = s.y * pk;
        var a = Math.min(1, (1 - s.z / w) * 1.4);
        c.strokeStyle = 'rgba(236,226,198,' + a + ')';
        c.lineWidth = Math.max(.6, 2.4 * (1 - s.z / w));
        c.beginPath(); c.moveTo(px,py); c.lineTo(x,y); c.stroke();
      });
      c.restore();
    });
  }
},

{
  id:'f09', cat:'fundos', title:'Ondas de água no clique',
  desc:'Ripples concêntricos com decaimento — cada clique gera uma nova.',
  tags:['canvas','ripple','click'], stage:'flush', hint:'clique no quadro',
  html:`<canvas class="f09"></canvas>`,
  css:`.f09{width:100%;height:100%;display:block;background:radial-gradient(60% 70% at 50% 40%,#201c12,#0a0908);cursor:pointer}`,
  js:function(root,ctx){
    var cv = root.querySelector('.f09'), c = cv.getContext('2d');
    var w = cv.width = cv.offsetWidth, h = cv.height = cv.offsetHeight;
    var R = [];
    function add(x,y){ R.push({ x:x, y:y, r:0, a:1 }); if (R.length > 14) R.shift(); }
    ctx.on(cv,'pointerdown',function(e){
      var b = cv.getBoundingClientRect(); add(e.clientX - b.left, e.clientY - b.top);
    });
    ctx.every(function(){ add(Math.random()*w, Math.random()*h); }, 1600);
    ctx.loop(function(){
      c.clearRect(0,0,w,h);
      R.forEach(function(o){
        o.r += 1.9; o.a *= .985;
        for (var k = 0; k < 3; k++){
          var rr = o.r - k*13;
          if (rr <= 0) continue;
          c.strokeStyle = 'rgba(212,175,55,' + (o.a * (1 - k*.3) * .8) + ')';
          c.lineWidth = 1.4 - k*.35;
          c.beginPath(); c.arc(o.x, o.y, rr, 0, 6.284); c.stroke();
        }
      });
      R = R.filter(function(o){ return o.a > .04; });
    });
  }
},

{
  id:'f10', cat:'fundos', title:'Spotlight da seção',
  desc:'Uma máscara radial revela o conteúdo só onde o cursor está.',
  tags:['mask','radial-gradient','mouse'], stage:'flush', hint:'mova o mouse',
  html:`
    <div class="f10">
      <div class="f10-base">
        <span>PRODUTO</span><span>PREÇO</span><span>DOCS</span><span>API</span>
        <span>BLOG</span><span>SUPORTE</span><span>STATUS</span><span>LEGAL</span>
      </div>
      <div class="f10-lit">
        <span>PRODUTO</span><span>PREÇO</span><span>DOCS</span><span>API</span>
        <span>BLOG</span><span>SUPORTE</span><span>STATUS</span><span>LEGAL</span>
      </div>
    </div>`,
  css:`
    .f10{position:relative;width:100%;height:100%;overflow:hidden;background:#0d0c0b}
    .f10-base,.f10-lit{position:absolute;inset:0;display:grid;grid-template-columns:repeat(2,1fr);
      align-content:center;gap:14px;padding:26px;font-size:19px;font-weight:800;letter-spacing:-.02em}
    .f10-base{color:#201d17}
    .f10-lit{color:#d4af37;
      -webkit-mask-image:radial-gradient(120px circle at var(--x,-999px) var(--y,-999px),#000 0%,transparent 70%);
      mask-image:radial-gradient(120px circle at var(--x,-999px) var(--y,-999px),#000 0%,transparent 70%)}`,
  js:function(root,ctx){
    var box = root.querySelector('.f10'), lit = root.querySelector('.f10-lit');
    ctx.on(box,'mousemove',function(e){
      var r = box.getBoundingClientRect();
      lit.style.setProperty('--x', (e.clientX - r.left) + 'px');
      lit.style.setProperty('--y', (e.clientY - r.top) + 'px');
    });
    ctx.on(box,'mouseleave',function(){ lit.style.setProperty('--x','-999px'); });
  }
}

);
