/* ==========================================================
   07b · FUNDOS & AMBIENTE — lote 2
   ========================================================== */
(function () {
  var A = (window.ANIMDB = window.ANIMDB || []);
  function add(o) { o.nv = 1; A.push(o); }

/* ruído coerente (value noise) — serve para flow field e topografia */
function ruido(seed){
  var p = [];
  for (var i = 0; i < 256; i++) p[i] = Math.sin((i + 1) * 12.9898 + seed) * 43758.5453 % 1;
  function g(x,y){ return p[((x * 57 + y * 131) % 256 + 256) % 256]; }
  function suave(t){ return t * t * (3 - 2 * t); }
  return function(x,y){
    var xi = Math.floor(x), yi = Math.floor(y), xf = suave(x - xi), yf = suave(y - yi);
    var a = g(xi,yi), b = g(xi+1,yi), c = g(xi,yi+1), d = g(xi+1,yi+1);
    return (a + (b - a) * xf) * (1 - yf) + (c + (d - c) * xf) * yf;
  };
}

add({
  id:'fx01', cat:'fundos', title:'Flow field',
  desc:'Um campo de ângulos gerado por ruído; as partículas apenas seguem a seta da célula onde estão.',
  tags:['ruído','campo vetorial','canvas'], stage:'flush', hint:'sempre ativo',
  html:`<canvas class="fx01"></canvas>`,
  css:`.fx01{width:100%;height:100%;display:block;background:#090807}`,
  js:function(root,ctx){
    var cv = root.querySelector('.fx01'), c = cv.getContext('2d');
    var w = cv.width = cv.offsetWidth, h = cv.height = cv.offsetHeight;
    var n = ruido(7), P = [], t = 0;
    for (var i = 0; i < 260; i++)
      P.push({ x:Math.random()*w, y:Math.random()*h, h:Math.random()*44 + 26 });
    c.fillStyle = '#090807'; c.fillRect(0,0,w,h);
    ctx.loop(function(){
      t += .0016;
      c.fillStyle = 'rgba(9,8,7,.055)';
      c.fillRect(0,0,w,h);
      P.forEach(function(p){
        var a = n(p.x * .012, p.y * .012 + t) * Math.PI * 4;
        var px = p.x, py = p.y;
        p.x += Math.cos(a) * 1.5; p.y += Math.sin(a) * 1.5;
        c.strokeStyle = 'hsla(' + p.h + ',90%,68%,.5)';
        c.lineWidth = 1.1;
        c.beginPath(); c.moveTo(px,py); c.lineTo(p.x,p.y); c.stroke();
        if (p.x < 0 || p.x > w || p.y < 0 || p.y > h){ p.x = Math.random()*w; p.y = Math.random()*h; }
      });
    });
  }
});

add({
  id:'fx02', cat:'fundos', title:'Matrix rain',
  desc:'Cada coluna tem sua velocidade; o rastro vem de pintar o fundo com alfa em vez de limpar.',
  tags:['canvas','trilha','alpha'], stage:'flush', hint:'sempre ativo',
  html:`<canvas class="fx02"></canvas>`,
  css:`.fx02{width:100%;height:100%;display:block;background:#000}`,
  js:function(root,ctx){
    var cv = root.querySelector('.fx02'), c = cv.getContext('2d');
    var w = cv.width = cv.offsetWidth, h = cv.height = cv.offsetHeight;
    var F = 13, cols = Math.floor(w / F), y = [], vel = [];
    for (var i = 0; i < cols; i++){ y[i] = Math.random() * h; vel[i] = .5 + Math.random(); }
    var glifos = 'アイウエオカキクケコサシスセソ0123456789ABCDEF';
    ctx.loop(function(){
      c.fillStyle = 'rgba(0,0,0,.075)';
      c.fillRect(0,0,w,h);
      c.font = F + 'px "JetBrains Mono",monospace';
      for (var i = 0; i < cols; i++){
        var ch = glifos[(Math.random() * glifos.length) | 0];
        c.fillStyle = '#f4ecd2';                        // cabeça clara
        c.fillText(ch, i * F, y[i]);
        c.fillStyle = '#5cc88f';                        // corpo verde
        c.fillText(glifos[(Math.random()*glifos.length)|0], i * F, y[i] - F);
        y[i] += F * vel[i] * .55;
        if (y[i] > h + Math.random() * 220){ y[i] = -20; vel[i] = .5 + Math.random(); }
      }
    });
  }
});

add({
  id:'fx03', cat:'fundos', title:'Chuva e neve',
  desc:'Mesma estrutura, parâmetros diferentes: gota é rápida e reta, floco é lento e oscila.',
  tags:['partículas','clima','canvas'], stage:'flush', hint:'clique para trocar',
  html:`<div class="fx03"><canvas></canvas><button class="fx03-b">chuva ⇄ neve</button></div>`,
  css:`
    .fx03{position:relative;width:100%;height:100%}
    .fx03 canvas{width:100%;height:100%;display:block;background:linear-gradient(#151109,#241d12)}
    .fx03-b{position:absolute;left:12px;bottom:12px;padding:6px 12px;border-radius:8px;
      background:#ffffff14;border:1px solid #ffffff22;color:#e4ded0;font-size:11px;backdrop-filter:blur(6px)}`,
  js:function(root,ctx){
    var cv = root.querySelector('canvas'), c = cv.getContext('2d');
    var w = cv.width = cv.offsetWidth, h = cv.height = cv.offsetHeight;
    var neve = false, P = [];
    function povoar(){
      P = [];
      for (var i = 0; i < (neve ? 130 : 200); i++) P.push(nova(Math.random() * h));
    }
    function nova(y){
      return neve
        ? { x:Math.random()*w, y:y, r:1 + Math.random()*2.4, v:.35 + Math.random()*.7, f:Math.random()*6.3 }
        : { x:Math.random()*w, y:y, len:8 + Math.random()*12, v:5 + Math.random()*5 };
    }
    povoar();
    ctx.on(root.querySelector('.fx03-b'),'click',function(){ neve = !neve; povoar(); });
    var t = 0;
    ctx.loop(function(){
      t += .02;
      c.clearRect(0,0,w,h);
      P.forEach(function(p,i){
        if (neve){
          p.y += p.v; p.x += Math.sin(t + p.f) * .5;
          c.fillStyle = 'rgba(245,240,226,.85)';
          c.beginPath(); c.arc(p.x,p.y,p.r,0,6.284); c.fill();
        } else {
          p.y += p.v;
          c.strokeStyle = 'rgba(226,214,180,.45)'; c.lineWidth = 1;
          c.beginPath(); c.moveTo(p.x,p.y); c.lineTo(p.x - 1.5, p.y - p.len); c.stroke();
        }
        if (p.y > h + 12) P[i] = nova(-12);
      });
    });
  }
});

add({
  id:'fx04', cat:'fundos', title:'Lava lamp',
  desc:'Bolhas sobem, esfriam no topo e descem — com o mesmo filtro goo dos metaballs.',
  tags:['goo','SVG filter','loop lento'], stage:'flush', hint:'sempre ativo',
  html:`
    <div class="fx04">
      <svg width="0" height="0"><defs><filter id="fx04goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="11" result="b"/>
        <feColorMatrix in="b" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 26 -12"/>
      </filter></defs></svg>
      <div class="fx04-w"></div>
    </div>`,
  css:`
    .fx04{position:relative;width:100%;height:100%;overflow:hidden;
      background:linear-gradient(#1c1410,#2e2113 60%,#33231a)}
    .fx04-w{position:absolute;inset:0;filter:url(#fx04goo)}
    .fx04-b{position:absolute;border-radius:50%;background:#d98a4a;will-change:transform}`,
  js:function(root,ctx){
    var wrap = root.querySelector('.fx04-w');
    var w = root.offsetWidth, h = root.offsetHeight, B = [];
    for (var i = 0; i < 7; i++){
      var s = 34 + Math.random() * 40;
      var el = document.createElement('div');
      el.className = 'fx04-b';
      el.style.cssText = 'width:' + s + 'px;height:' + s + 'px;background:hsl(' + (10 + Math.random()*34) + ',95%,60%)';
      wrap.appendChild(el);
      B.push({ el:el, x:Math.random()*(w-s), y:Math.random()*h, s:s, v:(Math.random() < .5 ? 1 : -1) * (.16 + Math.random()*.24), f:Math.random()*6.3 });
    }
    var t = 0;
    ctx.loop(function(){
      t += .008;
      B.forEach(function(b){
        b.y += b.v;
        b.x += Math.sin(t * 1.4 + b.f) * .28;
        if (b.y < -b.s * .4){ b.v = Math.abs(b.v); }      // esfria no topo, desce
        if (b.y > h - b.s * .6){ b.v = -Math.abs(b.v); }  // esquenta no fundo, sobe
        b.el.style.transform = 'translate3d(' + b.x.toFixed(1) + 'px,' + b.y.toFixed(1) + 'px,0)';
      });
    });
  }
});

add({
  id:'fx05', cat:'fundos', title:'Grid isométrico',
  desc:'Losangos numa projeção 2:1 que acendem em ondas concêntricas.',
  tags:['isométrico','canvas','onda'], stage:'flush', hint:'mova o mouse',
  html:`<canvas class="fx05"></canvas>`,
  css:`.fx05{width:100%;height:100%;display:block;background:#0a0908;cursor:crosshair}`,
  js:function(root,ctx){
    var cv = root.querySelector('.fx05'), c = cv.getContext('2d');
    var w = cv.width = cv.offsetWidth, h = cv.height = cv.offsetHeight;
    var TW = 34, TH = 17, m = { x:w/2, y:h/2 }, t = 0;
    ctx.on(cv,'mousemove',function(e){
      var r = cv.getBoundingClientRect(); m.x = e.clientX - r.left; m.y = e.clientY - r.top;
    });
    ctx.loop(function(){
      t += .05;
      c.clearRect(0,0,w,h);
      for (var y = -1; y < h/TH + 2; y++){
        for (var x = -1; x < w/TW + 2; x++){
          var px = x * TW + (y % 2 ? TW/2 : 0), py = y * TH;
          var d = Math.hypot(px - m.x, py - m.y);
          var alt = Math.sin(d * .05 - t) * 7 * Math.max(0, 1 - d/240);
          var lum = 12 + Math.max(0, 1 - d/240) * 46;
          c.beginPath();
          c.moveTo(px, py - TH/2 - alt);
          c.lineTo(px + TW/2, py - alt);
          c.lineTo(px, py + TH/2 - alt);
          c.lineTo(px - TW/2, py - alt);
          c.closePath();
          c.fillStyle = 'hsl(' + (38 + alt * 4) + ',62%,' + lum + '%)';
          c.fill();
          c.strokeStyle = 'rgba(212,175,55,.14)'; c.stroke();
        }
      }
    });
  }
});

add({
  id:'fx06', cat:'fundos', title:'Orb com halo',
  desc:'Esfera com brilho interno, anel de luz e partículas em órbita elíptica.',
  tags:['orb','órbita','canvas'], stage:'flush', hint:'sempre ativo',
  html:`<canvas class="fx06"></canvas>`,
  css:`.fx06{width:100%;height:100%;display:block;background:radial-gradient(60% 70% at 50% 50%,#16110a,#070605)}`,
  js:function(root,ctx){
    var cv = root.querySelector('.fx06'), c = cv.getContext('2d');
    var w = cv.width = cv.offsetWidth, h = cv.height = cv.offsetHeight;
    var cx = w/2, cy = h/2, R = Math.min(w,h) * .22, t = 0;
    var orb = [];
    for (var i = 0; i < 40; i++) orb.push({ a:Math.random()*6.3, v:.006 + Math.random()*.014, r:R*1.5 + Math.random()*R, s:.6 + Math.random()*1.6 });
    ctx.loop(function(){
      t += .01;
      c.clearRect(0,0,w,h);
      // halo
      var g = c.createRadialGradient(cx,cy,R*.2,cx,cy,R*2.4);
      g.addColorStop(0,'rgba(176,138,201,.5)');
      g.addColorStop(.5,'rgba(212,175,55,.14)');
      g.addColorStop(1,'rgba(0,0,0,0)');
      c.fillStyle = g; c.fillRect(0,0,w,h);
      // esfera
      var s = c.createRadialGradient(cx - R*.35, cy - R*.4, R*.1, cx, cy, R);
      s.addColorStop(0,'#f3f0e8'); s.addColorStop(.45,'#d4af37'); s.addColorStop(1,'#4a3a6e');
      c.fillStyle = s;
      c.beginPath(); c.arc(cx, cy, R * (1 + Math.sin(t*1.6) * .03), 0, 6.284); c.fill();
      // anel
      c.save(); c.translate(cx,cy); c.rotate(Math.sin(t*.5) * .3); c.scale(1,.3);
      c.strokeStyle = 'rgba(207,155,106,.55)'; c.lineWidth = 2;
      c.beginPath(); c.arc(0,0,R*1.7,0,6.284); c.stroke();
      c.restore();
      // partículas em órbita
      orb.forEach(function(o){
        o.a += o.v;
        var x = cx + Math.cos(o.a) * o.r, y = cy + Math.sin(o.a) * o.r * .32;
        c.fillStyle = 'rgba(240,232,210,' + (Math.sin(o.a) > 0 ? .9 : .35) + ')';
        c.beginPath(); c.arc(x,y,o.s,0,6.284); c.fill();
      });
    });
  }
});

add({
  id:'fx07', cat:'fundos', title:'Mídia de fundo com máscara',
  desc:'Vídeo (aqui um canvas) escurecido por overlay e recortado por uma máscara em gradiente.',
  tags:['overlay','mask','mídia'], stage:'flush', hint:'sempre ativo',
  html:`
    <div class="fx07">
      <canvas class="fx07-v"></canvas>
      <div class="fx07-ov"></div>
      <div class="fx07-txt"><b>Bem-vindo</b><p>o mesmo CSS funciona com &lt;video autoplay muted loop&gt;</p></div>
    </div>`,
  css:`
    .fx07{position:relative;width:100%;height:100%;overflow:hidden}
    .fx07-v{position:absolute;inset:0;width:100%;height:100%;
      -webkit-mask-image:radial-gradient(120% 100% at 50% 0%,#000 35%,transparent 85%);
      mask-image:radial-gradient(120% 100% at 50% 0%,#000 35%,transparent 85%)}
    .fx07-ov{position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,8,6,.15),rgba(10,8,6,.9))}
    .fx07-txt{position:absolute;left:0;right:0;bottom:22px;text-align:center;padding:0 20px}
    .fx07-txt b{display:block;font-size:22px;font-weight:800;color:#f5f2ec;letter-spacing:-.03em}
    .fx07-txt p{font-family:var(--mono);font-size:9.5px;color:#a09681;margin-top:5px}`,
  js:function(root,ctx){
    var cv = root.querySelector('.fx07-v'), c = cv.getContext('2d');
    var w = cv.width = cv.offsetWidth, h = cv.height = cv.offsetHeight, t = 0;
    ctx.loop(function(){
      t += .006;
      var g = c.createLinearGradient(0,0,w,h);
      g.addColorStop(0,'#3b3018'); g.addColorStop(1,'#2c2340');
      c.fillStyle = g; c.fillRect(0,0,w,h);
      c.lineWidth = 2;
      for (var i = 0; i < 7; i++){
        c.beginPath();
        for (var x = 0; x <= w; x += 8){
          var y = h*.45 + Math.sin(x*.014 + t*2 + i*.6) * (16 + i*5) + i*9;
          x ? c.lineTo(x,y) : c.moveTo(x,y);
        }
        c.strokeStyle = 'hsla(' + (30 + i*8) + ',70%,62%,.4)';
        c.stroke();
      }
    });
  }
});

add({
  id:'fx08', cat:'fundos', title:'CSS Houdini paint worklet',
  desc:'O padrão é desenhado por JS mas consumido como background-image, com propriedades animáveis.',
  tags:['Houdini','paint()','@property'], stage:'flush', hint:'Chrome/Edge',
  html:`<div class="fx08"><span class="fx08-f">carregando worklet…</span></div>`,
  css:`
    @property --fx08t{syntax:'<number>';initial-value:0;inherits:true}
    .fx08{width:100%;height:100%;background-image:paint(fx08pattern);
      --fx08t:0;animation:fx08 9s linear infinite;display:grid;place-items:center}
    .fx08-f{font-family:var(--mono);font-size:10.5px;color:#66625a}
    .fx08.ok .fx08-f{display:none}
    @keyframes fx08{to{--fx08t:100}}`,
  js:function(root,ctx){
    var box = root.querySelector('.fx08');
    if (!window.CSS || !CSS.paintWorklet){
      box.querySelector('.fx08-f').textContent = 'sem suporte a paint worklet neste navegador';
      box.style.background = 'repeating-linear-gradient(45deg,#12121c 0 10px,#191611 10px 20px)';
      return;
    }
    if (!window.__fx08loaded){
      var src = `
        registerPaint('fx08pattern', class {
          static get inputProperties(){ return ['--fx08t']; }
          paint(c, geom, props){
            const t = parseFloat(props.get('--fx08t')) || 0;
            c.fillStyle = '#0a0908';
            c.fillRect(0, 0, geom.width, geom.height);
            const S = 26;
            for (let y = 0; y < geom.height + S; y += S){
              for (let x = 0; x < geom.width + S; x += S){
                const d = Math.sin((x + y) * 0.03 + t * 0.12);
                const r = 3 + d * 3;
                c.fillStyle = 'hsl(' + (34 + d * 26) + ',72%,' + (48 + d * 16) + '%)';
                c.beginPath();
                c.arc(x, y, Math.max(0.6, r), 0, 6.284);
                c.fill();
              }
            }
          }
        });`;
      var url = URL.createObjectURL(new Blob([src], { type:'text/javascript' }));
      window.__fx08loaded = CSS.paintWorklet.addModule(url);
    }
    window.__fx08loaded.then(function(){ box.classList.add('ok'); })
      .catch(function(){ box.querySelector('.fx08-f').textContent = 'worklet bloqueado (abra via http)'; });
  }
});

add({
  id:'fx09', cat:'fundos', title:'Linhas topográficas',
  desc:'Curvas de nível de um campo de ruído que muda devagar — mapa que nunca é o mesmo.',
  tags:['ruído','contorno','canvas'], stage:'flush', hint:'sempre ativo',
  html:`<canvas class="fx09"></canvas>`,
  css:`.fx09{width:100%;height:100%;display:block;background:#0a0c14}`,
  js:function(root,ctx){
    var cv = root.querySelector('.fx09'), c = cv.getContext('2d');
    var w = cv.width = cv.offsetWidth, h = cv.height = cv.offsetHeight;
    var n = ruido(3), t = 0;
    ctx.loop(function(){
      t += .0025;
      c.clearRect(0,0,w,h);
      for (var nivel = 0; nivel < 11; nivel++){
        c.beginPath();
        // uma curva por nível: y deslocado pelo campo de ruído
        for (var x = 0; x <= w; x += 5){
          var v = n(x * .008, nivel * .6 + t) + n(x * .019, nivel * .3 - t) * .5;
          var y = (nivel + .5) * (h / 11) + (v - .75) * 46;
          x ? c.lineTo(x,y) : c.moveTo(x,y);
        }
        c.strokeStyle = nivel % 4 === 0 ? 'rgba(212,175,55,.55)' : 'rgba(212,175,55,.2)';
        c.lineWidth = nivel % 4 === 0 ? 1.5 : 1;
        c.stroke();
      }
    });
  }
});

add({
  id:'fx10', cat:'fundos', title:'Fundo reagindo ao áudio',
  desc:'AnalyserNode entrega o espectro em tempo real; as barras são só o FFT desenhado.',
  tags:['Web Audio','FFT','AnalyserNode'], stage:'flush', hint:'clique para ligar o som',
  html:`
    <div class="fx10">
      <canvas></canvas>
      <button class="fx10-b">▶ ligar áudio</button>
    </div>`,
  css:`
    .fx10{position:relative;width:100%;height:100%}
    .fx10 canvas{width:100%;height:100%;display:block;background:linear-gradient(#0a0a14,#14100c)}
    .fx10-b{position:absolute;left:50%;top:50%;translate:-50% -50%;padding:9px 16px;border-radius:99px;
      background:#d4af37;color:#1b1813;font-size:12px;font-weight:700;transition:opacity .3s}
    .fx10.on .fx10-b{opacity:0;pointer-events:none}`,
  js:function(root,ctx){
    var box = root.querySelector('.fx10'), cv = root.querySelector('canvas'), c = cv.getContext('2d');
    var w = cv.width = cv.offsetWidth, h = cv.height = cv.offsetHeight;
    var ana = null, dados = null, t = 0;

    ctx.on(root.querySelector('.fx10-b'),'click',function(){
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      var ac = new AC();
      ana = ac.createAnalyser(); ana.fftSize = 128;
      dados = new Uint8Array(ana.frequencyBinCount);
      var gain = ac.createGain(); gain.gain.value = .05;   // baixinho de propósito
      [110, 165, 220, 330].forEach(function(f,i){
        var o = ac.createOscillator();
        o.type = ['sine','triangle','sine','sawtooth'][i];
        o.frequency.value = f;
        var g2 = ac.createGain(); g2.gain.value = .25;
        // um LFO por voz para o espectro não ficar parado
        var lfo = ac.createOscillator(); lfo.frequency.value = .12 + i * .07;
        var lg = ac.createGain(); lg.gain.value = .22;
        lfo.connect(lg); lg.connect(g2.gain); lfo.start();
        o.connect(g2); g2.connect(gain); o.start();
      });
      gain.connect(ana); ana.connect(ac.destination);
      ac.resume();
      box.classList.add('on');
      ctx.clean(function(){ ac.close(); });
    });

    ctx.loop(function(){
      t += .02;
      c.clearRect(0,0,w,h);
      if (ana) ana.getByteFrequencyData(dados);            // uma leitura por frame
      var N = 48, bw = w / N;
      for (var i = 0; i < N; i++){
        var v = ana ? dados[i] / 255
                    : Math.abs(Math.sin(t + i * .35)) * .3; // pré-visualização sem áudio
        var bh = Math.max(2, v * h * .8);
        var g = c.createLinearGradient(0, h - bh, 0, h);
        g.addColorStop(0, 'hsl(' + (44 + i * 2) + ',78%,64%)');
        g.addColorStop(1, 'hsl(' + (22 + i) + ',62%,38%)');
        c.fillStyle = g;
        c.fillRect(i * bw + 1, h - bh, bw - 2, bh);
        c.fillStyle = 'rgba(255,255,255,.08)';
        c.fillRect(i * bw + 1, h - bh - 3, bw - 2, 2);
      }
    });
  }
});

})();
