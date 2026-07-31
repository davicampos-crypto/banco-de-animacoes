/* ==========================================================
   10 · AVANÇADO / WOW  —  tudo vanilla, sem bibliotecas
   ========================================================== */
(window.ANIMDB = window.ANIMDB || []).push(

{
  id:'a01', cat:'avancado', title:'Objeto 3D em CSS puro',
  desc:'Cubo com preserve-3d girando sozinho — e arrastável com o mouse.',
  tags:['3D','preserve-3d','drag'], hint:'arraste o cubo',
  html:`
    <div class="a01">
      <div class="a01-sc">
        <div class="a01-cb">
          <span class="f1">01</span><span class="f2">02</span><span class="f3">03</span>
          <span class="f4">04</span><span class="f5">05</span><span class="f6">06</span>
        </div>
      </div>
    </div>`,
  css:`
    .a01{width:100%;height:100%;display:grid;place-items:center;perspective:700px;cursor:grab}
    .a01:active{cursor:grabbing}
    .a01-sc{transform-style:preserve-3d}
    .a01-cb{position:relative;width:96px;height:96px;transform-style:preserve-3d}
    .a01-cb span{position:absolute;inset:0;display:grid;place-items:center;
      font-family:var(--mono);font-size:15px;color:#100e0c;font-weight:600;
      border:1px solid #ffffff30;backface-visibility:visible}
    .a01-cb .f1{background:#d4af37dd;transform:translateZ(48px)}
    .a01-cb .f2{background:#b08ac9dd;transform:rotateY(180deg) translateZ(48px)}
    .a01-cb .f3{background:#5cc88fdd;transform:rotateY(90deg) translateZ(48px)}
    .a01-cb .f4{background:#cf9b6add;transform:rotateY(-90deg) translateZ(48px)}
    .a01-cb .f5{background:#e8c96add;transform:rotateX(90deg) translateZ(48px)}
    .a01-cb .f6{background:#e5645fdd;transform:rotateX(-90deg) translateZ(48px)}`,
  js:function(root,ctx){
    var box = root.querySelector('.a01'), cb = root.querySelector('.a01-cb');
    var rx = -20, ry = 25, vx = 0, vy = .35, down = false, lx = 0, ly = 0;
    ctx.on(box,'pointerdown',function(e){ down = true; lx = e.clientX; ly = e.clientY; box.setPointerCapture(e.pointerId); });
    ctx.on(box,'pointermove',function(e){
      if (!down) return;
      vy = (e.clientX - lx) * .45; vx = -(e.clientY - ly) * .45;
      lx = e.clientX; ly = e.clientY;
    });
    ctx.on(box,'pointerup',function(){ down = false; });
    ctx.loop(function(){
      if (!down){ vy += (.35 - vy) * .02; vx *= .95; }
      rx += vx; ry += vy;
      cb.style.transform = 'rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)';
    });
  }
},

{
  id:'a02', cat:'avancado', title:'Distorção de imagem no hover',
  desc:'A imagem é redesenhada em fatias deslocadas por uma onda centrada no cursor.',
  tags:['canvas','displacement','slices'], stage:'flush', hint:'mova o mouse',
  html:`<canvas class="a02"></canvas>`,
  css:`.a02{width:100%;height:100%;display:block;background:#090807;cursor:crosshair}`,
  js:function(root,ctx){
    var cv = root.querySelector('.a02'), c = cv.getContext('2d');
    var w = cv.width = cv.offsetWidth, h = cv.height = cv.offsetHeight;

    // "imagem" gerada proceduralmente (no real: drawImage de um <img>)
    var src = document.createElement('canvas'); src.width = w; src.height = h;
    (function(g){
      var grd = g.createLinearGradient(0,0,w,h);
      grd.addColorStop(0,'#b8871f'); grd.addColorStop(.5,'#6f4f86'); grd.addColorStop(1,'#cf9b6a');
      g.fillStyle = grd; g.fillRect(0,0,w,h);
      g.globalAlpha = .16; g.strokeStyle = '#fff'; g.lineWidth = 2;
      for (var i = -h; i < w; i += 16){ g.beginPath(); g.moveTo(i,0); g.lineTo(i+h,h); g.stroke(); }
      g.globalAlpha = 1; g.fillStyle = '#0d0c0a';
      g.font = '700 34px Inter,sans-serif'; g.textAlign = 'center';
      g.fillText('DISTORÇÃO', w/2, h/2 + 12);
    })(src.getContext('2d'));

    var mx = -999, my = -999, amp = 0, tAmp = 0;
    ctx.on(cv,'mousemove',function(e){
      var r = cv.getBoundingClientRect();
      mx = e.clientX - r.left; my = e.clientY - r.top; tAmp = 1;
    });
    ctx.on(cv,'mouseleave',function(){ tAmp = 0; });

    var t = 0;
    ctx.loop(function(){
      t += .06; amp += (tAmp - amp) * .08;
      c.clearRect(0,0,w,h);
      for (var y = 0; y < h; y += 3){
        var d = Math.abs(y - my);
        var f = Math.exp(-d * d / 2600);                    // gaussiana em torno do cursor
        var off = Math.sin(y * .05 + t) * 26 * f * amp;
        c.drawImage(src, 0, y, w, 3, off, y, w, 3);
      }
    });
  }
},

{
  id:'a03', cat:'avancado', title:'Ripple de água (buffer duplo)',
  desc:'Algoritmo clássico de propagação de ondas em dois buffers, deformando a imagem.',
  tags:['canvas','simulation','pixels'], stage:'flush', hint:'clique e arraste',
  html:`<canvas class="a03"></canvas>`,
  css:`.a03{width:100%;height:100%;display:block;cursor:pointer;image-rendering:auto}`,
  js:function(root,ctx){
    var cv = root.querySelector('.a03'), c = cv.getContext('2d');
    var W = 150, H = 90;                                    // simulação em baixa resolução
    cv.width = W; cv.height = H;
    cv.style.width = '100%'; cv.style.height = '100%';

    // imagem base
    var src = document.createElement('canvas'); src.width = W; src.height = H;
    (function(g){
      var grd = g.createLinearGradient(0,0,0,H);
      grd.addColorStop(0,'#241f14'); grd.addColorStop(1,'#2b3a2a');
      g.fillStyle = grd; g.fillRect(0,0,W,H);
      g.fillStyle = '#d4af37'; g.font = '700 22px Inter,sans-serif'; g.textAlign = 'center';
      g.fillText('ÁGUA', W/2, H/2 + 8);
      g.strokeStyle = '#ffffff22';
      for (var i = 0; i < H; i += 6){ g.beginPath(); g.moveTo(0,i); g.lineTo(W,i); g.stroke(); }
    })(src.getContext('2d'));
    var base = src.getContext('2d').getImageData(0,0,W,H).data;
    var out = c.createImageData(W,H);

    var cur = new Float32Array(W*H), prev = new Float32Array(W*H);
    function drop(x,y,f){
      x = x|0; y = y|0;
      if (x < 2 || y < 2 || x > W-3 || y > H-3) return;
      prev[y*W+x] = f;
    }
    ctx.on(cv,'pointermove',function(e){
      var r = cv.getBoundingClientRect();
      drop((e.clientX - r.left) / r.width * W, (e.clientY - r.top) / r.height * H, 420);
    });
    ctx.every(function(){ drop(Math.random()*W, Math.random()*H, 700); }, 1400);

    ctx.loop(function(){
      for (var y = 1; y < H-1; y++){
        for (var x = 1; x < W-1; x++){
          var i = y*W+x;
          cur[i] = ((prev[i-1] + prev[i+1] + prev[i-W] + prev[i+W]) / 2) - cur[i];
          cur[i] *= .96;
        }
      }
      var t = prev; prev = cur; cur = t;

      var o = out.data;
      for (var y2 = 0; y2 < H; y2++){
        for (var x2 = 0; x2 < W; x2++){
          var i2 = y2*W+x2;
          var dx = (prev[i2 === 0 ? 0 : i2-1] - prev[i2+1 >= W*H ? i2 : i2+1]) | 0;
          var dy = (prev[i2-W < 0 ? i2 : i2-W] - prev[i2+W >= W*H ? i2 : i2+W]) | 0;
          var sx = Math.max(0, Math.min(W-1, x2 + (dx>>3)));
          var sy = Math.max(0, Math.min(H-1, y2 + (dy>>3)));
          var s = (sy*W+sx)*4, d2 = i2*4;
          var lum = 128 + (dx>>1);
          o[d2]   = Math.min(255, base[s]   * lum / 128);
          o[d2+1] = Math.min(255, base[s+1] * lum / 128);
          o[d2+2] = Math.min(255, base[s+2] * lum / 128);
          o[d2+3] = 255;
        }
      }
      c.putImageData(out, 0, 0);
    });
  }
},

{
  id:'a04', cat:'avancado', title:'Galeria infinita com drag',
  desc:'Grade que se repete nos dois eixos por módulo — nunca acaba.',
  tags:['drag','infinite','modulo'], stage:'flush', hint:'arraste em qualquer direção',
  html:`<div class="a04"><div class="a04-w"></div><b class="a04-h">drag</b></div>`,
  css:`
    .a04{position:relative;width:100%;height:100%;overflow:hidden;cursor:grab;background:#0a0908}
    .a04:active{cursor:grabbing}
    .a04-w{position:absolute;inset:0}
    .a04-t{position:absolute;width:92px;height:70px;border-radius:10px;overflow:hidden;
      display:grid;place-items:center;font-family:var(--mono);font-size:12px;color:#ffffff66;
      border:1px solid #ffffff14;will-change:transform;user-select:none}
    .a04-h{position:absolute;left:10px;top:8px;font-family:var(--mono);font-size:9.5px;letter-spacing:.2em;
      text-transform:uppercase;color:#453f38;pointer-events:none}`,
  js:function(root,ctx){
    var box = root.querySelector('.a04'), wrap = root.querySelector('.a04-w');
    var CW = 102, CH = 80, COLS = 6, ROWS = 5;
    var cores = ['#2b2618','#362540','#1e352a','#3f2a1d','#2c2822','#33291a'];
    var tiles = [];
    for (var r = 0; r < ROWS; r++) for (var col = 0; col < COLS; col++){
      var el = document.createElement('div');
      el.className = 'a04-t';
      el.style.background = cores[(r + col) % cores.length];
      el.textContent = String(r * COLS + col + 1).padStart(2,'0');
      wrap.appendChild(el);
      tiles.push({ el:el, x:col*CW, y:r*CH });
    }
    var TW = COLS*CW, TH = ROWS*CH;
    var x = 0, y = 0, tx = 0, ty = 0, down = false, lx, ly, vx = 0, vy = 0;

    ctx.on(box,'pointerdown',function(e){ down = true; lx = e.clientX; ly = e.clientY; box.setPointerCapture(e.pointerId); });
    ctx.on(box,'pointermove',function(e){
      if (!down) return;
      vx = e.clientX - lx; vy = e.clientY - ly;
      tx += vx; ty += vy; lx = e.clientX; ly = e.clientY;
    });
    ctx.on(box,'pointerup',function(){ down = false; });

    ctx.loop(function(){
      if (!down){ tx += vx; ty += vy; vx *= .94; vy *= .94; }
      x += (tx - x) * .12; y += (ty - y) * .12;
      tiles.forEach(function(t){
        var px = ((t.x + x) % TW + TW) % TW - CW;
        var py = ((t.y + y) % TH + TH) % TH - CH;
        t.el.style.transform = 'translate3d(' + px.toFixed(1) + 'px,' + py.toFixed(1) + 'px,0)';
      });
    });
  }
},

{
  id:'a05', cat:'avancado', title:'Morph de SVG',
  desc:'Dois paths com o mesmo número de pontos: basta interpolar coordenada a coordenada.',
  tags:['SVG','morph','interpolate'], hint:'clique nas formas',
  html:`
    <div class="a05">
      <svg viewBox="0 0 200 200"><path class="a05-p"/></svg>
      <div class="a05-btns"><button class="on">estrela</button><button>flor</button><button>engrenagem</button></div>
    </div>`,
  css:`
    .a05{display:flex;flex-direction:column;align-items:center;gap:10px}
    .a05 svg{width:150px;height:150px}
    .a05-p{fill:url(#none);fill:#d4af37;filter:drop-shadow(0 6px 18px #d4af3733)}
    .a05-btns{display:flex;gap:5px}
    .a05-btns button{padding:5px 11px;border-radius:7px;font-size:11px;color:#8a857c;background:#1d1b16;transition:.2s}
    .a05-btns button.on{background:#d4af3722;color:#d4af37}`,
  js:function(root,ctx){
    var N = 120, cx = 100, cy = 100;
    // cada forma é uma função raio(ângulo) amostrada nos MESMOS N pontos
    var shapes = [
      function(a){ return 26 + 46 * Math.pow(Math.abs(Math.cos(a * 2.5)), 5); },   // estrela
      function(a){ return 46 + 26 * Math.sin(a * 6); },                            // flor
      function(a){ return 52 + 12 * Math.sign(Math.sin(a * 9)); }                  // engrenagem
    ];
    function sample(fn){
      var p = [];
      for (var i = 0; i < N; i++){
        var a = i / N * Math.PI * 2, r = fn(a);
        p.push(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
      }
      return p;
    }
    var cur = sample(shapes[0]), goal = cur.slice(), path = root.querySelector('.a05-p');

    root.querySelectorAll('.a05-btns button').forEach(function(b,i){
      ctx.on(b,'click',function(){
        root.querySelectorAll('.a05-btns button').forEach(function(x){ x.classList.remove('on'); });
        b.classList.add('on');
        goal = sample(shapes[i]);
        path.style.fill = ['#d4af37','#cf9b6a','#5cc88f'][i];
      });
    });

    ctx.loop(function(){
      var d = '';
      for (var i = 0; i < cur.length; i += 2){
        cur[i]   += (goal[i]   - cur[i])   * .12;
        cur[i+1] += (goal[i+1] - cur[i+1]) * .12;
        d += (i ? 'L' : 'M') + cur[i].toFixed(1) + ' ' + cur[i+1].toFixed(1);
      }
      path.setAttribute('d', d + 'Z');
    });
  }
},

{
  id:'a06', cat:'avancado', title:'Smooth scroll + parallax (estilo Lenis)',
  desc:'A rolagem real é interpolada; o conteúdo se move com atraso e inércia.',
  tags:['lerp','smooth scroll','parallax'], stage:'scroll flush', hint:'role ↓',
  html:`
    <div class="a06">
      <div class="a06-vp">
        <div class="a06-in">
          <h5 data-d="0.4">Suave</h5>
          <p data-d="0.7">A posição desejada é o scrollTop real; a exibida persegue com lerp.</p>
          <div class="a06-card" data-d="1.25">camada rápida</div>
          <div class="a06-card b" data-d="0.55">camada lenta</div>
          <h5 data-d="0.9">Inércia</h5>
          <p data-d="1.1">É o mesmo princípio do Lenis, Locomotive e afins.</p>
        </div>
      </div>
      <div class="a06-spacer"></div>
    </div>`,
  css:`
    .a06{height:820px;position:relative}
    .a06-vp{position:sticky;top:0;height:230px;overflow:hidden;background:linear-gradient(#0e0d0c,#161310)}
    .a06-in{padding:24px 20px;display:flex;flex-direction:column;gap:12px}
    .a06-in h5{font-size:20px;font-weight:800;letter-spacing:-.03em;color:#f4f1eb;will-change:transform}
    .a06-in p{font-size:12.5px;color:#8a857c;line-height:1.6;will-change:transform}
    .a06-card{padding:12px 14px;border-radius:10px;background:#241e12;border:1px solid #3b3119;
      font-size:12px;color:#c8bfa6;will-change:transform}
    .a06-card.b{background:#362540;border-color:#55406b;color:#ded0b8}`,
  js:function(root,ctx){
    var stage = root.closest('.stage'), items = root.querySelectorAll('[data-d]');
    var target = 0, cur = 0;
    ctx.on(stage,'scroll',function(){ target = stage.scrollTop; }, { passive:true });
    ctx.loop(function(){
      cur += (target - cur) * .075;                    // o coração do smooth scroll
      items.forEach(function(el){
        el.style.transform = 'translate3d(0,' + (-cur * +el.dataset.d).toFixed(2) + 'px,0)';
      });
    });
  }
},

{
  id:'a07', cat:'avancado', title:'Rastro de cursor em canvas',
  desc:'Uma corrente de pontos que se seguem — cada um mira no anterior.',
  tags:['canvas','trail','chain'], stage:'flush', hint:'mova o mouse',
  html:`<canvas class="a07"></canvas>`,
  css:`.a07{width:100%;height:100%;display:block;background:#090807;cursor:none}`,
  js:function(root,ctx){
    var cv = root.querySelector('.a07'), c = cv.getContext('2d');
    var w = cv.width = cv.offsetWidth, h = cv.height = cv.offsetHeight;
    var N = 26, pts = [], mx = w/2, my = h/2, t = 0;
    for (var i = 0; i < N; i++) pts.push({ x:mx, y:my });

    ctx.on(cv,'mousemove',function(e){
      var r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top;
    });

    ctx.loop(function(){
      t += .02;
      c.fillStyle = 'rgba(9,8,7,.22)';
      c.fillRect(0,0,w,h);
      pts[0].x += (mx - pts[0].x) * .28;
      pts[0].y += (my - pts[0].y) * .28;
      for (var i = 1; i < N; i++){
        pts[i].x += (pts[i-1].x - pts[i].x) * .32;
        pts[i].y += (pts[i-1].y - pts[i].y) * .32;
      }
      for (var j = N-1; j >= 0; j--){
        var k = 1 - j / N;
        c.beginPath();
        c.arc(pts[j].x, pts[j].y, 1 + k * 9, 0, 6.284);
        c.fillStyle = 'hsla(' + (26 + ((t * 22 + j * 3) % 44)) + ',72%,62%,' + (k * .85) + ')';
        c.fill();
      }
    });
  }
},

{
  id:'a08', cat:'avancado', title:'Física: queda e empilhamento',
  desc:'Integração de Verlet + colisão entre círculos. ~40 linhas, sem Matter.js.',
  tags:['física','verlet','colisão'], stage:'flush', hint:'clique para soltar',
  html:`<canvas class="a08"></canvas>`,
  css:`.a08{width:100%;height:100%;display:block;background:#0d0c0b;cursor:pointer}`,
  js:function(root,ctx){
    var cv = root.querySelector('.a08'), c = cv.getContext('2d');
    var w = cv.width = cv.offsetWidth, h = cv.height = cv.offsetHeight;
    var B = [], cores = ['#d4af37','#b08ac9','#5cc88f','#e8c96a','#e5645f','#cf9b6a'];

    function add(x,y){
      if (B.length > 46) B.shift();
      var r = 7 + Math.random() * 9;
      B.push({ x:x, y:y, px:x - (Math.random()-.5)*4, py:y - 2, r:r, c:cores[(Math.random()*6)|0] });
    }
    for (var i = 0; i < 16; i++) add(20 + Math.random()*(w-40), Math.random()*60);
    ctx.on(cv,'pointerdown',function(e){
      var b = cv.getBoundingClientRect(); add(e.clientX - b.left, e.clientY - b.top);
    });
    ctx.every(function(){ add(20 + Math.random()*(w-40), -10); }, 900);

    ctx.loop(function(){
      // integração de Verlet
      B.forEach(function(o){
        var vx = (o.x - o.px) * .992, vy = (o.y - o.py) * .992;
        o.px = o.x; o.py = o.y;
        o.x += vx; o.y += vy + .38;                       // gravidade
      });
      // colisões (2 iterações bastam visualmente)
      for (var it = 0; it < 2; it++){
        for (var i = 0; i < B.length; i++){
          var a = B[i];
          for (var j = i+1; j < B.length; j++){
            var b = B[j], dx = b.x - a.x, dy = b.y - a.y;
            var d = Math.hypot(dx,dy) || .01, min = a.r + b.r;
            if (d < min){
              var f = (min - d) / d * .5;
              a.x -= dx*f; a.y -= dy*f; b.x += dx*f; b.y += dy*f;
            }
          }
          if (a.x < a.r){ a.x = a.r; a.px = a.x + (a.x - a.px)*.4; }
          if (a.x > w - a.r){ a.x = w - a.r; a.px = a.x + (a.x - a.px)*.4; }
          if (a.y > h - a.r){ a.y = h - a.r; a.py = a.y + (a.y - a.py)*.4; }
        }
      }
      c.clearRect(0,0,w,h);
      B.forEach(function(o){
        c.beginPath(); c.arc(o.x,o.y,o.r,0,6.284);
        c.fillStyle = o.c; c.globalAlpha = .9; c.fill();
        c.globalAlpha = 1; c.strokeStyle = '#ffffff22'; c.stroke();
      });
    });
  }
},

{
  id:'a09', cat:'avancado', title:'Metaballs (efeito goo)',
  desc:'blur + contrast num filtro SVG faz os blobs se fundirem como líquido.',
  tags:['SVG filter','goo','blend'], stage:'flush', hint:'mova o mouse',
  html:`
    <div class="a09">
      <svg width="0" height="0"><defs><filter id="a09goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="b"/>
        <feColorMatrix in="b" mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -11" result="g"/>
        <feBlend in="SourceGraphic" in2="g"/>
      </filter></defs></svg>
      <div class="a09-w"></div>
    </div>`,
  css:`
    .a09{position:relative;width:100%;height:100%;overflow:hidden;background:#0a0908}
    .a09-w{position:absolute;inset:0;filter:url(#a09goo)}
    .a09-b{position:absolute;border-radius:50%;will-change:transform}`,
  js:function(root,ctx){
    var wrap = root.querySelector('.a09-w');
    var w = root.offsetWidth, h = root.offsetHeight;
    var cores = ['#d4af37','#b08ac9','#5cc88f','#cf9b6a','#b8871f','#c49ad6'];
    var B = [];
    for (var i = 0; i < 7; i++){
      var s = 30 + Math.random() * 34;
      var el = document.createElement('div');
      el.className = 'a09-b';
      el.style.cssText = 'width:'+s+'px;height:'+s+'px;background:'+cores[i%6];
      wrap.appendChild(el);
      B.push({ el:el, x:Math.random()*w, y:Math.random()*h,
               vx:(Math.random()-.5)*1.6, vy:(Math.random()-.5)*1.6, s:s });
    }
    var mx = -999, my = -999;
    ctx.on(root,'mousemove',function(e){
      var r = root.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top;
    });
    ctx.on(root,'mouseleave',function(){ mx = my = -999; });

    ctx.loop(function(){
      B.forEach(function(o){
        var dx = mx - o.x, dy = my - o.y, d = Math.hypot(dx,dy);
        if (d < 150){ o.vx += dx/d * .22; o.vy += dy/d * .22; }   // atraídos pelo cursor
        o.vx *= .985; o.vy *= .985;
        o.x += o.vx; o.y += o.vy;
        if (o.x < 0 || o.x > w - o.s) o.vx *= -1;
        if (o.y < 0 || o.y > h - o.s) o.vy *= -1;
        o.x = Math.max(0, Math.min(w - o.s, o.x));
        o.y = Math.max(0, Math.min(h - o.s, o.y));
        o.el.style.transform = 'translate3d(' + o.x.toFixed(1) + 'px,' + o.y.toFixed(1) + 'px,0)';
      });
    });
  }
},

{
  id:'a10', cat:'avancado', title:'Texto-máscara sobre mídia',
  desc:'O tipo vira janela: background-clip:text com uma cena animada por trás.',
  tags:['background-clip','mask','scale'], stage:'flush', hint:'passe o mouse',
  html:`
    <div class="a10">
      <div class="a10-scene"></div>
      <h4 class="a10-t">CINEMA</h4>
      <span class="a10-s">o texto é a janela</span>
    </div>`,
  css:`
    .a10{position:relative;width:100%;height:100%;display:grid;place-items:center;background:#090807;overflow:hidden}
    .a10-scene{position:absolute;inset:-20%;
      background:
        radial-gradient(38% 44% at 22% 30%,#c9762f,transparent 60%),
        radial-gradient(42% 40% at 78% 26%,#b8871f,transparent 60%),
        radial-gradient(50% 46% at 50% 82%,#b08ac9,transparent 62%),
        linear-gradient(120deg,#2a2340,#1c2a1e);
      filter:blur(14px);animation:a10 11s ease-in-out infinite alternate}
    .a10-t{position:relative;z-index:2;font-size:52px;font-weight:800;letter-spacing:-.045em;
      color:#0d0c0b;mix-blend-mode:multiply;
      transition:letter-spacing .6s cubic-bezier(.22,1,.36,1),font-size .6s cubic-bezier(.22,1,.36,1)}
    .a10::after{content:"";position:absolute;inset:0;z-index:1;background:#090807;
      -webkit-mask:radial-gradient(120% 100% at 50% 50%,transparent 38%,#000 72%);
      mask:radial-gradient(120% 100% at 50% 50%,transparent 38%,#000 72%)}
    .a10:hover .a10-t{letter-spacing:.02em;font-size:56px}
    .a10-s{position:absolute;bottom:16px;z-index:3;font-family:var(--mono);font-size:9.5px;
      letter-spacing:.24em;text-transform:uppercase;color:#66625a}
    @keyframes a10{
      0%{transform:scale(1) rotate(0deg)}
      50%{transform:scale(1.25) rotate(6deg)}
      100%{transform:scale(1.1) rotate(-5deg)}}`
}

);
