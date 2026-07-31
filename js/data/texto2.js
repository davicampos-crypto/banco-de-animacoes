/* ==========================================================
   04b · TIPOGRAFIA — lote 2
   ========================================================== */
(function () {
  var A = (window.ANIMDB = window.ANIMDB || []);
  function add(o) { o.nv = 1; A.push(o); }

add({
  id:'tx01', cat:'texto', title:'Variable font animada',
  desc:'O peso é um eixo contínuo: dá para interpolar 100→900 sem trocar de arquivo.',
  tags:['variable font','font-variation-settings','wght'], hint:'passe o mouse',
  html:`
    <div class="tx01">
      <b class="tx01-a">RESPIRA</b>
      <b class="tx01-b">peso segue o mouse</b>
      <small>requer fonte variável (Inter 100–900)</small>
    </div>`,
  css:`
    .tx01{text-align:center;display:flex;flex-direction:column;gap:10px;align-items:center}
    .tx01-a{font-size:34px;letter-spacing:-.03em;color:#f4f1eb;
      animation:tx01 3.4s cubic-bezier(.45,0,.55,1) infinite alternate}
    .tx01-b{font-size:17px;color:#d4af37;cursor:crosshair;font-variation-settings:'wght' 400}
    .tx01 small{font-family:var(--mono);font-size:10px;color:#66625a}
    @keyframes tx01{
      from{font-variation-settings:'wght' 150;letter-spacing:.12em}
      to{font-variation-settings:'wght' 900;letter-spacing:-.04em}}`,
  js:function(root,ctx){
    var el = root.querySelector('.tx01-b');
    ctx.on(root,'mousemove',function(e){
      var r = root.getBoundingClientRect();
      var k = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
      el.style.fontVariationSettings = "'wght' " + Math.round(100 + k * 800);
    });
  }
});

add({
  id:'tx02', cat:'texto', title:'Kinetic typography',
  desc:'Uma grade de palavras onde cada célula pulsa em fase própria — ritmo visual, não informação.',
  tags:['kinetic','grid','fase'],
  html:`<div class="tx02"></div>`,
  css:`
    .tx02{display:grid;grid-template-columns:repeat(4,1fr);gap:4px 8px;width:250px;text-align:center}
    .tx02 u{text-decoration:none;font-size:15px;font-weight:800;letter-spacing:-.02em;color:#302b24;
      animation:tx02 2.6s cubic-bezier(.45,0,.55,1) infinite}
    @keyframes tx02{
      0%,100%{color:#302b24;transform:scale(1) translateY(0)}
      45%{color:#d4af37;transform:scale(1.16) translateY(-3px)}}`,
  js:function(root){
    var box = root.querySelector('.tx02'),
        pal = ['MOVE','FLUI','PULSA','GIRA','SALTA','CORRE','VIBRA','CAI','SOBE','VOA','ROLA','BATE'];
    box.innerHTML = pal.map(function(p,i){
      var d = ((i % 4) * 120 + ((i/4)|0) * 200);
      return '<u style="animation-delay:' + d + 'ms">' + p + '</u>';
    }).join('');
  }
});

add({
  id:'tx03', cat:'texto', title:'Wave text',
  desc:'Cada letra é um ponto de uma senoide com defasagem constante.',
  tags:['seno','stagger','loop'],
  html:`<div class="tx03"><b>ONDULANDO</b><span>seno com defasagem</span></div>`,
  css:`
    .tx03{text-align:center}
    .tx03 b{display:flex;gap:1px;font-size:28px;font-weight:800;color:#b08ac9;letter-spacing:-.01em}
    .tx03 u{text-decoration:none;display:inline-block;animation:tx03 1.5s cubic-bezier(.45,0,.55,1) infinite}
    .tx03 span{display:block;margin-top:10px;font-family:var(--mono);font-size:10px;color:#66625a}
    @keyframes tx03{0%,100%{transform:translateY(9px);color:#7a5c96}50%{transform:translateY(-9px);color:#cf9b6a}}`,
  js:function(root){
    var b = root.querySelector('.tx03 b'), t = b.textContent;
    b.innerHTML = t.split('').map(function(c,i){
      return '<u style="animation-delay:' + (i * 75) + 'ms">' + c + '</u>';
    }).join('');
  }
});

add({
  id:'tx04', cat:'texto', title:'Texto 3D extrudado',
  desc:'Uma pilha de text-shadow finge profundidade e a luz gira em volta.',
  tags:['text-shadow','3D','extrusão'],
  html:`<div class="tx04"><b>VOLUME</b></div>`,
  css:`
    .tx04{perspective:600px}
    .tx04 b{display:block;font-size:36px;font-weight:800;letter-spacing:-.03em;color:#f6f3ed;
      animation:tx04 6s ease-in-out infinite alternate}
    @keyframes tx04{
      from{transform:rotateX(16deg) rotateY(-20deg);
        text-shadow:1px 1px 0 #5f512f,2px 2px 0 #574a2c,3px 3px 0 #4f4429,4px 4px 0 #403820,
                    5px 5px 0 #37301c,6px 6px 0 #2f2818,7px 7px 12px rgba(0,0,0,.6)}
      to{transform:rotateX(-10deg) rotateY(22deg);
        text-shadow:-1px 1px 0 #b06bb0,-2px 2px 0 #9d5f9d,-3px 3px 0 #8a538a,-4px 4px 0 #774777,
                    -5px 5px 0 #643b64,-6px 6px 0 #512f51,-7px 7px 12px rgba(0,0,0,.6)}}`
});

add({
  id:'tx05', cat:'texto', title:'Marquee em cilindro 3D',
  desc:'As palavras ficam nas faces de um prisma que gira no eixo Y.',
  tags:['3D','rotateY','preserve-3d'],
  html:`<div class="tx05"><div class="tx05-c"></div></div>`,
  css:`
    .tx05{perspective:700px;width:100%;display:grid;place-items:center}
    .tx05-c{position:relative;width:150px;height:44px;transform-style:preserve-3d;
      animation:tx05 12s linear infinite}
    .tx05-c u{position:absolute;inset:0;display:grid;place-items:center;text-decoration:none;
      font-size:17px;font-weight:800;letter-spacing:-.01em;color:#d4af37;
      border:1px solid #d4af3722;background:#d4af3708;border-radius:6px;backface-visibility:hidden}
    @keyframes tx05{to{transform:rotateY(-360deg)}}`,
  js:function(root){
    var c = root.querySelector('.tx05-c'),
        pal = ['DESIGN','MOTION','CODE','CRAFT','SHIP','REPEAT'],
        n = pal.length, r = 150 / (2 * Math.tan(Math.PI / n));
    c.innerHTML = pal.map(function(p,i){
      return '<u style="transform:rotateY(' + (i * 360 / n) + 'deg) translateZ(' + r.toFixed(1) + 'px)">' + p + '</u>';
    }).join('');
  }
});

add({
  id:'tx06', cat:'texto', title:'Ticker de preço',
  desc:'O número pisca em verde ou vermelho conforme sobe ou desce, e a seta vira junto.',
  tags:['ticker','delta','cor'],
  html:`
    <div class="tx06">
      <div class="tx06-r"><b>PETR4</b><em class="v">0,00</em><i class="d">—</i></div>
      <div class="tx06-r"><b>VALE3</b><em class="v">0,00</em><i class="d">—</i></div>
      <div class="tx06-r"><b>ITUB4</b><em class="v">0,00</em><i class="d">—</i></div>
    </div>`,
  css:`
    .tx06{width:210px;display:flex;flex-direction:column;gap:8px}
    .tx06-r{display:grid;grid-template-columns:60px 1fr 46px;align-items:center;gap:8px;
      padding:9px 11px;border-radius:9px;background:#191712;border:1px solid #23201a}
    .tx06-r b{font-size:11.5px;color:#a5a099;font-family:var(--mono)}
    .tx06-r em{font-style:normal;font-size:15px;font-weight:700;color:#f1eee8;text-align:right;
      font-variant-numeric:tabular-nums;transition:color .35s}
    .tx06-r i{font-style:normal;font-size:10.5px;text-align:right;font-family:var(--mono);transition:color .35s}
    .tx06-r.up em,.tx06-r.up i{color:#5cc88f}
    .tx06-r.down em,.tx06-r.down i{color:#e5645f}
    .tx06-r.up{animation:tx06u .7s ease}
    .tx06-r.down{animation:tx06d .7s ease}
    @keyframes tx06u{0%{background:#0f2b21}100%{background:#191712}}
    @keyframes tx06d{0%{background:#2b1219}100%{background:#191712}}`,
  js:function(root,ctx){
    var rows = [].map.call(root.querySelectorAll('.tx06-r'), function(r){
      return { el:r, v:20 + Math.random() * 30 };
    });
    function tick(){
      rows.forEach(function(o){
        var d = (Math.random() - .48) * 1.4;
        o.v = Math.max(1, o.v + d);
        o.el.classList.remove('up','down'); void o.el.offsetWidth;
        o.el.classList.add(d >= 0 ? 'up' : 'down');
        o.el.querySelector('.v').textContent = o.v.toFixed(2).replace('.', ',');
        o.el.querySelector('.d').textContent = (d >= 0 ? '▲ ' : '▼ ') + Math.abs(d).toFixed(2).replace('.', ',');
      });
    }
    tick();
    ctx.every(tick, 1400);
  }
});

add({
  id:'tx07', cat:'texto', title:'Texto como janela para a mídia',
  desc:'mix-blend-mode: screen sobre a mídia — funciona igual com <video> no lugar do canvas.',
  tags:['mix-blend-mode','máscara','mídia'], stage:'flush', hint:'mídia animada por trás',
  html:`
    <div class="tx07">
      <canvas class="tx07-m"></canvas>
      <div class="tx07-ov"><b>JANELA</b></div>
    </div>`,
  css:`
    .tx07{position:relative;width:100%;height:100%;overflow:hidden;background:#000}
    .tx07-m{position:absolute;inset:0;width:100%;height:100%}
    .tx07-ov{position:absolute;inset:0;display:grid;place-items:center;background:#fff;
      mix-blend-mode:screen;pointer-events:none}
    .tx07-ov b{font-size:46px;font-weight:800;letter-spacing:-.04em;color:#000}`,
  js:function(root,ctx){
    var cv = root.querySelector('.tx07-m'), c = cv.getContext('2d');
    var w = cv.width = cv.offsetWidth, h = cv.height = cv.offsetHeight, t = 0;
    ctx.loop(function(){
      t += .012;
      var g = c.createLinearGradient(0,0,w,h);
      g.addColorStop(0, 'hsl(' + (26 + (t*14) % 42) + ',74%,52%)');
      g.addColorStop(1, 'hsl(' + (280 + (t*10) % 30) + ',36%,42%)');
      c.fillStyle = g; c.fillRect(0,0,w,h);
      c.globalAlpha = .5;
      for (var i = 0; i < 5; i++){
        c.beginPath();
        c.arc(w/2 + Math.cos(t + i) * w * .3, h/2 + Math.sin(t * 1.3 + i) * h * .35, 40 + i * 12, 0, 6.284);
        c.fillStyle = 'hsl(' + (24 + ((t * 18 + i * 14) % 46)) + ',76%,58%)';
        c.fill();
      }
      c.globalAlpha = 1;
    });
  }
});

add({
  id:'tx08', cat:'texto', title:'Reticências de espera',
  desc:'Três variações: pontos pulando, opacidade em sequência e largura crescendo.',
  tags:['loading','steps','CSS only'],
  html:`
    <div class="tx08">
      <p>Analisando<span class="a"><i>.</i><i>.</i><i>.</i></span></p>
      <p>Aguardando resposta<span class="b"></span></p>
      <p>Processando<span class="c">...</span></p>
    </div>`,
  css:`
    .tx08{display:flex;flex-direction:column;gap:14px;font-size:14px;color:#cdc8bd}
    .tx08 p{display:flex;align-items:baseline}
    .tx08 .a i{display:inline-block;font-style:normal;animation:tx08a 1.2s ease-in-out infinite}
    .tx08 .a i:nth-child(2){animation-delay:.15s}
    .tx08 .a i:nth-child(3){animation-delay:.3s}
    .tx08 .b::after{content:"...";animation:tx08b 1.4s steps(4,end) infinite;
      display:inline-block;width:0;overflow:hidden;vertical-align:bottom}
    .tx08 .c{display:inline-block;width:0;overflow:hidden;vertical-align:bottom;color:#d4af37;
      animation:tx08c 1.6s steps(3,end) infinite}
    @keyframes tx08a{0%,100%{transform:translateY(0);opacity:.35}45%{transform:translateY(-5px);opacity:1}}
    @keyframes tx08b{to{width:1.2em}}
    @keyframes tx08c{to{width:1.2em}}`
});

add({
  id:'tx09', cat:'texto', title:'Scramble por proximidade',
  desc:'Diferente do scramble em bloco: cada letra só embaralha quando o cursor chega perto dela.',
  tags:['scramble','proximidade','rAF'], hint:'passe o mouse pelo texto',
  html:`<div class="tx09"><b class="tx09-t">PASSE O MOUSE POR AQUI</b></div>`,
  css:`
    .tx09{text-align:center;padding:0 14px}
    .tx09-t{display:flex;flex-wrap:wrap;justify-content:center;font-family:var(--mono);font-size:19px;
      font-weight:500;color:#6b675f;cursor:crosshair}
    .tx09-t u{text-decoration:none;display:inline-block;min-width:.62em;transition:color .25s}
    .tx09-t u.hot{color:#5cc88f}`,
  js:function(root,ctx){
    var el = root.querySelector('.tx09-t'),
        alvo = el.textContent,
        chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@%&',
        letras = [];
    el.innerHTML = alvo.split('').map(function(c){
      return '<u>' + (c === ' ' ? '&nbsp;' : c) + '</u>';
    }).join('');
    el.querySelectorAll('u').forEach(function(u,i){ letras.push({ el:u, ch:alvo[i], k:0 }); });

    var mx = -999, my = -999;
    ctx.on(root,'mousemove',function(e){ mx = e.clientX; my = e.clientY; });
    ctx.on(root,'mouseleave',function(){ mx = my = -999; });

    ctx.loop(function(){
      letras.forEach(function(l){
        if (l.ch === ' ') return;
        var r = l.el.getBoundingClientRect();
        var d = Math.hypot(r.left + r.width/2 - mx, r.top + r.height/2 - my);
        var perto = d < 46;
        l.k = perto ? 1 : Math.max(0, l.k - .06);
        l.el.classList.toggle('hot', l.k > .2);
        l.el.textContent = l.k > .2 && Math.random() < l.k * .5
          ? chars[(Math.random() * chars.length) | 0]
          : l.ch;
      });
    });
  }
});

})();
