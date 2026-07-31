/* ==========================================================
   03b · HOVER & MICRO — lote 2
   ========================================================== */
(function () {
  var A = (window.ANIMDB = window.ANIMDB || []);
  function add(o) { o.nv = 1; A.push(o); }

add({
  id:'hx01', cat:'hover', title:'Image trail',
  desc:'Imagens surgem no rastro do cursor a cada N pixels percorridos e somem sozinhas.',
  tags:['trail','distância','pool'], stage:'flush', hint:'mova o mouse',
  html:`<div class="hx01"><span class="hx01-h">mova →</span></div>`,
  css:`
    .hx01{position:relative;width:100%;height:100%;overflow:hidden;background:#0d0c0b;cursor:crosshair}
    .hx01-h{position:absolute;left:50%;top:50%;translate:-50% -50%;font-family:var(--mono);font-size:11px;
      letter-spacing:.24em;text-transform:uppercase;color:#34301f;pointer-events:none}
    .hx01-t{position:absolute;width:86px;height:64px;border-radius:8px;margin:-32px 0 0 -43px;
      pointer-events:none;will-change:transform,opacity;
      animation:hx01 .9s cubic-bezier(.22,1,.36,1) forwards}
    @keyframes hx01{
      0%{opacity:0;transform:scale(.6) rotate(var(--r))}
      18%{opacity:1;transform:scale(1) rotate(var(--r))}
      100%{opacity:0;transform:scale(.86) translateY(18px) rotate(var(--r))}}`,
  js:function(root,ctx){
    var box = root.querySelector('.hx01'),
        cores = ['linear-gradient(140deg,#b8871f,#8a6a17)','linear-gradient(140deg,#b08ac9,#5c3f70)',
                 'linear-gradient(140deg,#5cc88f,#065f46)','linear-gradient(140deg,#cf9b6a,#86198f)',
                 'linear-gradient(140deg,#e8c96a,#92400e)'],
        lx = 0, ly = 0, n = 0;
    ctx.on(box,'mousemove',function(e){
      var r = box.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      if (Math.hypot(x - lx, y - ly) < 52) return;        // só solta a cada 52px
      lx = x; ly = y;
      var t = document.createElement('div');
      t.className = 'hx01-t';
      t.style.cssText = 'left:' + x + 'px;top:' + y + 'px;background:' + cores[n++ % 5] +
                        ';--r:' + ((Math.random() - .5) * 16).toFixed(1) + 'deg';
      box.appendChild(t);
      t.addEventListener('animationend', function(){ t.remove(); });
    });
  }
});

add({
  id:'hx02', cat:'hover', title:'Cursor em blend difference',
  desc:'Um círculo com mix-blend-mode: difference inverte tudo o que passa por baixo.',
  tags:['mix-blend-mode','cursor','invert'], stage:'flush', hint:'mova o mouse',
  html:`
    <div class="hx02">
      <div class="hx02-a">INVERTE</div>
      <div class="hx02-b">o que estiver embaixo</div>
      <div class="hx02-c"></div>
    </div>`,
  css:`
    .hx02{position:relative;width:100%;height:100%;overflow:hidden;background:#f2efe8;cursor:none;
      display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px}
    .hx02-a{font-size:34px;font-weight:800;letter-spacing:-.04em;color:#0e0d0c}
    .hx02-b{font-size:13px;color:#625e57}
    .hx02-c{position:absolute;top:0;left:0;width:78px;height:78px;border-radius:50%;background:#fff;
      margin:-39px 0 0 -39px;mix-blend-mode:difference;pointer-events:none;
      transform:translate(-200px,-200px);transition:width .3s,height .3s,margin .3s}
    .hx02:active .hx02-c{width:120px;height:120px;margin:-60px 0 0 -60px}`,
  js:function(root,ctx){
    var box = root.querySelector('.hx02'), c = root.querySelector('.hx02-c');
    var x = 0, y = 0, tx = 0, ty = 0;
    ctx.on(box,'mousemove',function(e){
      var r = box.getBoundingClientRect(); tx = e.clientX - r.left; ty = e.clientY - r.top;
    });
    ctx.loop(function(){
      x += (tx - x) * .22; y += (ty - y) * .22;
      c.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
    });
  }
});

add({
  id:'hx03', cat:'hover', title:'Botão com seta que desliza',
  desc:'A seta sai por um lado e uma cópia entra pelo outro — movimento contínuo, sem "pulo".',
  tags:['ícone','overflow','CSS only'], hint:'passe o mouse',
  html:`
    <div class="hx03">
      <button class="hx03-b">Ver planos<span><i>→</i><i>→</i></span></button>
      <button class="hx03-b alt">Baixar<span><i>↓</i><i>↓</i></span></button>
    </div>`,
  css:`
    .hx03{display:flex;flex-direction:column;gap:14px;align-items:center}
    .hx03-b{display:flex;align-items:center;gap:10px;padding:13px 22px;border-radius:10px;
      background:#d4af37;color:#1b1813;font-size:13.5px;font-weight:700}
    .hx03-b.alt{background:#221f19;border:1px solid #34301f;color:#ece9e3}
    .hx03-b span{position:relative;display:block;width:16px;height:18px;overflow:hidden}
    .hx03-b i{position:absolute;left:0;top:0;width:16px;height:18px;line-height:18px;font-style:normal;
      text-align:center;transition:transform .42s cubic-bezier(.65,0,.35,1)}
    .hx03-b i:nth-child(2){transform:translateX(-120%)}
    .hx03-b:hover i:nth-child(1){transform:translateX(120%)}
    .hx03-b:hover i:nth-child(2){transform:none}
    .hx03-b.alt i:nth-child(2){transform:translateY(-120%)}
    .hx03-b.alt:hover i:nth-child(1){transform:translateY(120%)}
    .hx03-b.alt:hover i:nth-child(2){transform:none}`
});

add({
  id:'hx04', cat:'hover', title:'Segurar para confirmar',
  desc:'Ação destrutiva sem modal: só acontece se o dedo ficar 1,2s no botão.',
  tags:['hold','progresso','confirmação'], hint:'pressione e segure',
  html:`
    <div class="hx04">
      <button class="hx04-b"><i></i><span>Segure para excluir</span></button>
      <small class="hx04-s">nada aconteceu ainda</small>
    </div>`,
  css:`
    .hx04{display:flex;flex-direction:column;gap:12px;align-items:center}
    .hx04-b{position:relative;overflow:hidden;padding:14px 26px;border-radius:11px;
      background:#241318;border:1px solid #e5645f55;color:#f0a09b;font-size:13px;font-weight:700;
      user-select:none;touch-action:none}
    .hx04-b i{position:absolute;left:0;top:0;bottom:0;width:100%;background:#e5645f;
      transform-origin:0 50%;transform:scaleX(0)}
    .hx04-b span{position:relative;z-index:2;transition:color .2s}
    .hx04-b.on span{color:#2a0710}
    .hx04-b.done{background:#0f2b21;border-color:#5cc88f55;color:#5cc88f}
    .hx04-s{font-size:11.5px;color:#6b675f;font-family:var(--mono)}`,
  js:function(root,ctx){
    var b = root.querySelector('.hx04-b'), bar = b.querySelector('i'),
        txt = b.querySelector('span'), st = root.querySelector('.hx04-s');
    var t0 = 0, on = false, DUR = 1200;
    function press(){
      if (b.classList.contains('done')) return;
      on = true; t0 = performance.now(); b.classList.add('on'); st.textContent = 'segurando…';
    }
    function solta(){
      if (!on) return;
      on = false; b.classList.remove('on');
      bar.style.transition = 'transform .3s ease'; bar.style.transform = 'scaleX(0)';
      st.textContent = 'cancelado — soltou cedo';
    }
    ctx.on(b,'pointerdown',press);
    ctx.on(b,'pointerup',solta);
    ctx.on(b,'pointerleave',solta);
    ctx.loop(function(){
      if (!on) return;
      var k = Math.min(1, (performance.now() - t0) / DUR);
      bar.style.transition = 'none';
      bar.style.transform = 'scaleX(' + k + ')';
      if (k === 1){
        on = false; b.classList.remove('on'); b.classList.add('done');
        txt.textContent = 'Excluído ✓'; st.textContent = 'confirmado sem modal';
        ctx.wait(function(){
          b.classList.remove('done'); txt.textContent = 'Segure para excluir';
          bar.style.transform = 'scaleX(0)'; st.textContent = 'nada aconteceu ainda';
        }, 2200);
      }
    });
  }
});

add({
  id:'hx05', cat:'hover', title:'Swipe to delete',
  desc:'Arrasta, passa do limiar e o item colapsa; abaixo do limiar, volta com mola.',
  tags:['swipe','threshold','mobile'], hint:'arraste os itens ←',
  html:`
    <div class="hx05">
      <div class="hx05-r"><div class="hx05-bg">excluir</div><div class="hx05-f">Fatura de março</div></div>
      <div class="hx05-r"><div class="hx05-bg">excluir</div><div class="hx05-f">Fatura de abril</div></div>
      <div class="hx05-r"><div class="hx05-bg">excluir</div><div class="hx05-f">Fatura de maio</div></div>
    </div>`,
  css:`
    .hx05{width:220px;display:flex;flex-direction:column;gap:6px}
    .hx05-r{position:relative;height:44px;border-radius:9px;overflow:hidden;touch-action:pan-y;
      transition:height .32s cubic-bezier(.65,0,.35,1),opacity .3s,margin .32s}
    .hx05-r.gone{height:0;opacity:0}
    .hx05-bg{position:absolute;inset:0;background:#e5645f;color:#2a0710;display:flex;align-items:center;
      justify-content:flex-end;padding-right:14px;font-size:11.5px;font-weight:700}
    .hx05-f{position:absolute;inset:0;background:#1f1c17;border:1px solid #2a2620;border-radius:9px;
      display:flex;align-items:center;padding:0 14px;font-size:12.5px;color:#dad5cb;cursor:grab;
      will-change:transform}`,
  js:function(root,ctx){
    root.querySelectorAll('.hx05-r').forEach(function(r){
      var f = r.querySelector('.hx05-f'), x = 0, sx = 0, down = false;
      ctx.on(f,'pointerdown',function(e){ down = true; sx = e.clientX - x; f.style.transition = 'none'; f.setPointerCapture(e.pointerId); });
      ctx.on(f,'pointermove',function(e){ if (down) { x = Math.min(0, e.clientX - sx); f.style.transform = 'translateX(' + x + 'px)'; } });
      ctx.on(f,'pointerup',function(){
        down = false;
        f.style.transition = 'transform .42s cubic-bezier(.34,1.4,.64,1)';
        if (x < -95){                                  // passou do limiar → some
          f.style.transform = 'translateX(-100%)';
          ctx.wait(function(){ r.classList.add('gone'); }, 180);
        } else { x = 0; f.style.transform = ''; }
      });
    });
  }
});

add({
  id:'hx06', cat:'hover', title:'Card 3D com camadas',
  desc:'Cada elemento em um translateZ diferente: no tilt, eles se deslocam em velocidades distintas.',
  tags:['3D','profundidade','parallax'], hint:'passe o mouse',
  html:`
    <div class="hx06">
      <div class="hx06-c">
        <div class="hx06-bg"></div>
        <span class="hx06-l" style="--z:20px">NOVO</span>
        <b class="hx06-l" style="--z:46px">Fone Studio</b>
        <small class="hx06-l" style="--z:34px">cancelamento ativo</small>
        <em class="hx06-l" style="--z:70px">R$ 1.290</em>
      </div>
    </div>`,
  css:`
    .hx06{perspective:750px}
    .hx06-c{position:relative;width:200px;height:160px;border-radius:16px;padding:16px;
      transform-style:preserve-3d;background:#12121c;border:1px solid #2d2921;
      transition:transform .55s cubic-bezier(.22,1,.36,1)}
    .hx06-c.live{transition:none}
    .hx06-bg{position:absolute;inset:0;border-radius:16px;transform:translateZ(4px);
      background:radial-gradient(70% 70% at 30% 20%,#363018,transparent 65%),
                 radial-gradient(60% 60% at 80% 90%,#5c3f70,transparent 65%)}
    .hx06-l{position:relative;display:block;transform:translateZ(var(--z))}
    .hx06 span{font-family:var(--mono);font-size:9.5px;color:#d4af37;border:1px solid #d4af3755;
      border-radius:5px;padding:1px 6px;width:max-content}
    .hx06 b{margin-top:44px;font-size:17px;color:#f5f2ec}
    .hx06 small{font-size:11.5px;color:#a5a099}
    .hx06 em{margin-top:10px;font-style:normal;font-size:20px;font-weight:800;color:#5cc88f}`,
  js:function(root,ctx){
    var c = root.querySelector('.hx06-c');
    ctx.on(c,'mouseenter',function(){ c.classList.add('live'); });
    ctx.on(c,'mousemove',function(e){
      var r = c.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
      c.style.transform = 'rotateY(' + (px * 26) + 'deg) rotateX(' + (-py * 26) + 'deg)';
    });
    ctx.on(c,'mouseleave',function(){ c.classList.remove('live'); c.style.transform = ''; });
  }
});

add({
  id:'hx07', cat:'hover', title:'Grid distortion',
  desc:'Uma malha que se afasta do cursor como se fosse tecido esticado.',
  tags:['canvas','malha','deformação'], stage:'flush', hint:'mova o mouse',
  html:`<canvas class="hx07"></canvas>`,
  css:`.hx07{width:100%;height:100%;display:block;background:#0d0c0b;cursor:crosshair}`,
  js:function(root,ctx){
    var cv = root.querySelector('.hx07'), c = cv.getContext('2d');
    var w = cv.width = cv.offsetWidth, h = cv.height = cv.offsetHeight;
    var G = 20, cols = Math.ceil(w/G) + 1, rows = Math.ceil(h/G) + 1, P = [];
    for (var y = 0; y < rows; y++) for (var x = 0; x < cols; x++)
      P.push({ x:x*G, y:y*G, ox:x*G, oy:y*G });
    var m = { x:-999, y:-999 };
    ctx.on(cv,'mousemove',function(e){
      var r = cv.getBoundingClientRect(); m.x = e.clientX - r.left; m.y = e.clientY - r.top;
    });
    ctx.on(cv,'mouseleave',function(){ m.x = m.y = -999; });
    ctx.loop(function(){
      P.forEach(function(p){
        var dx = p.ox - m.x, dy = p.oy - m.y, d = Math.hypot(dx,dy);
        var f = Math.max(0, 1 - d/130);
        var tx = p.ox + (dx/(d||1)) * f * 38, ty = p.oy + (dy/(d||1)) * f * 38;
        p.x += (tx - p.x) * .16; p.y += (ty - p.y) * .16;
      });
      c.clearRect(0,0,w,h);
      c.strokeStyle = 'rgba(212,175,55,.24)'; c.lineWidth = 1;
      for (var r2 = 0; r2 < rows; r2++){
        c.beginPath();
        for (var x2 = 0; x2 < cols; x2++){ var p2 = P[r2*cols+x2]; x2 ? c.lineTo(p2.x,p2.y) : c.moveTo(p2.x,p2.y); }
        c.stroke();
      }
      for (var x3 = 0; x3 < cols; x3++){
        c.beginPath();
        for (var y3 = 0; y3 < rows; y3++){ var p3 = P[y3*cols+x3]; y3 ? c.lineTo(p3.x,p3.y) : c.moveTo(p3.x,p3.y); }
        c.stroke();
      }
    });
  }
});

add({
  id:'hx08', cat:'hover', title:'Marca-texto que pinta a frase',
  desc:'background-size no eixo X com origem à esquerda: o traço "escreve" atrás do texto.',
  tags:['highlight','background-size','CSS only'], hint:'passe o mouse',
  html:`
    <p class="hx08">Uma frase comum vira <mark>destaque de verdade</mark> quando o traço é
    <mark class="b">pintado na hora</mark> em vez de já estar lá.</p>`,
  css:`
    .hx08{max-width:250px;margin:0;font-size:15px;line-height:2.1;color:#cdc8bd}
    .hx08 mark{background-image:linear-gradient(#d4af3766,#d4af3766);background-repeat:no-repeat;
      background-size:0% 42%;background-position:0 85%;color:inherit;padding:0 2px;cursor:pointer;
      transition:background-size .55s cubic-bezier(.65,0,.35,1),color .3s}
    .hx08 mark.b{background-image:linear-gradient(#cf9b6a66,#cf9b6a66)}
    .hx08:hover mark{background-size:100% 42%}
    .hx08:hover mark{color:#fff}
    .hx08 mark:nth-of-type(2){transition-delay:.18s}`
});

add({
  id:'hx09', cat:'hover', title:'Sublinhado magnético',
  desc:'Um único sublinhado que viaja entre os links em vez de um por item.',
  tags:['indicador','medida','nav'], hint:'passe pelos links',
  html:`
    <nav class="hx09">
      <a>Trabalhos</a><a>Estúdio</a><a>Processo</a><a>Contato</a>
      <span class="hx09-u"></span>
    </nav>`,
  css:`
    .hx09{position:relative;display:flex;gap:18px;padding-bottom:8px}
    .hx09 a{font-size:14px;color:#a09b91;cursor:pointer;transition:color .25s}
    .hx09 a:hover{color:#fff}
    .hx09-u{position:absolute;bottom:0;left:0;height:2px;width:0;border-radius:9px;background:#d4af37;
      opacity:0;transition:transform .42s cubic-bezier(.22,1,.36,1),width .42s cubic-bezier(.22,1,.36,1),opacity .25s}`,
  js:function(root,ctx){
    var nav = root.querySelector('.hx09'), u = root.querySelector('.hx09-u');
    root.querySelectorAll('.hx09 a').forEach(function(a){
      ctx.on(a,'mouseenter',function(){
        u.style.opacity = 1;
        u.style.width = a.offsetWidth + 'px';
        u.style.transform = 'translateX(' + a.offsetLeft + 'px)';
      });
    });
    ctx.on(nav,'mouseleave',function(){ u.style.opacity = 0; });
  }
});

add({
  id:'hx10', cat:'hover', title:'Anel de foco animado',
  desc:':focus-visible só aparece para quem navega no teclado — e merece animação também.',
  tags:['a11y',':focus-visible','teclado'], hint:'clique e use Tab',
  html:`
    <div class="hx10">
      <button class="hx10-b">Primeiro</button>
      <button class="hx10-b">Segundo</button>
      <input class="hx10-i" placeholder="campo">
      <small>clique aqui e aperte Tab</small>
    </div>`,
  css:`
    .hx10{display:flex;flex-direction:column;gap:10px;align-items:center;width:200px}
    .hx10-b,.hx10-i{width:100%;padding:11px 14px;border-radius:10px;background:#1d1b16;border:1px solid #2c2820;
      color:#ece9e3;font-size:12.5px;outline:0;position:relative;
      transition:box-shadow .32s cubic-bezier(.34,1.56,.64,1),border-color .25s,transform .25s}
    .hx10-b:focus-visible,.hx10-i:focus-visible{
      border-color:#d4af37;transform:translateY(-1px);
      box-shadow:0 0 0 3px rgba(212,175,55,.28),0 0 0 6px rgba(212,175,55,.1)}
    .hx10-b:hover{background:#1f1c17}
    .hx10 small{font-size:10.5px;color:#66625a;font-family:var(--mono)}`
});

add({
  id:'hx11', cat:'hover', title:'Tabela com destaque deslizante',
  desc:'Um único bloco de realce que desliza entre as linhas em vez de piscar em cada uma.',
  tags:['tabela','indicador','hover'], hint:'passe pelas linhas',
  html:`
    <div class="hx11">
      <span class="hx11-hl"></span>
      <table>
        <tr><td>Plano Free</td><td>R$ 0</td></tr>
        <tr><td>Plano Start</td><td>R$ 49</td></tr>
        <tr><td>Plano Studio</td><td>R$ 249</td></tr>
        <tr><td>Enterprise</td><td>sob consulta</td></tr>
      </table>
    </div>`,
  css:`
    .hx11{position:relative;width:230px}
    .hx11 table{width:100%;border-collapse:collapse;position:relative;z-index:2}
    .hx11 td{padding:11px 12px;font-size:12.5px;color:#c6c1b6;border-bottom:1px solid #1f1c17}
    .hx11 td:last-child{text-align:right;font-family:var(--mono);font-size:11.5px;color:#8f8a80}
    .hx11 tr{cursor:pointer}
    .hx11-hl{position:absolute;left:0;right:0;top:0;height:0;border-radius:8px;background:#d4af3712;
      border:1px solid #d4af3733;opacity:0;z-index:1;
      transition:transform .38s cubic-bezier(.22,1,.36,1),height .38s cubic-bezier(.22,1,.36,1),opacity .25s}`,
  js:function(root,ctx){
    var box = root.querySelector('.hx11'), hl = root.querySelector('.hx11-hl');
    root.querySelectorAll('.hx11 tr').forEach(function(tr){
      ctx.on(tr,'mouseenter',function(){
        hl.style.opacity = 1;
        hl.style.height = tr.offsetHeight + 'px';
        hl.style.transform = 'translateY(' + tr.offsetTop + 'px)';
      });
    });
    ctx.on(box,'mouseleave',function(){ hl.style.opacity = 0; });
  }
});

})();
