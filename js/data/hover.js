/* ==========================================================
   03 · HOVER & MICRO-INTERAÇÕES
   ========================================================== */
(window.ANIMDB = window.ANIMDB || []).push(

{
  id:'h01', cat:'hover', title:'Botão com preenchimento deslizante',
  desc:'Pseudo-elemento que entra por um lado e sai pelo outro no unhover.',
  tags:['::before','transform-origin','CSS only'], hint:'passe o mouse',
  html:`<div class="h01"><button class="h01-b"><span>Começar agora</span></button>
        <button class="h01-b alt"><span>De baixo pra cima</span></button></div>`,
  css:`
    .h01{display:flex;flex-direction:column;gap:14px;align-items:center}
    .h01-b{position:relative;overflow:hidden;padding:13px 26px;border-radius:99px;
      border:1px solid #3e3931;color:#e8e8f2;font-size:13.5px;font-weight:600;background:#15151d}
    .h01-b span{position:relative;z-index:2;transition:color .35s}
    .h01-b::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#d4af37,#b08ac9);
      transform:scaleX(0);transform-origin:right;transition:transform .45s cubic-bezier(.65,0,.35,1)}
    .h01-b:hover::before{transform:scaleX(1);transform-origin:left}
    .h01-b:hover span{color:#0d0c0b}
    .h01-b.alt::before{background:#5cc88f;transform:scaleY(0);transform-origin:top}
    .h01-b.alt:hover::before{transform:scaleY(1);transform-origin:bottom}`
},

{
  id:'h02', cat:'hover', title:'Botão magnético',
  desc:'O botão persegue o cursor com amortecimento e volta com mola.',
  tags:['lerp','rAF','pointer'], hint:'aproxime o mouse',
  html:`<div class="h02"><button class="h02-b"><b>Magnético</b></button></div>`,
  css:`
    .h02{padding:40px}
    .h02-b{padding:16px 30px;border-radius:99px;background:linear-gradient(120deg,#d4af37,#b08ac9);
      color:#1b1813;font-weight:700;font-size:14px;will-change:transform}
    .h02-b b{display:block;will-change:transform}`,
  js:function(root,ctx){
    var btn = root.querySelector('.h02-b'), inner = btn.querySelector('b');
    var tx=0,ty=0,cx=0,cy=0, R = 90;
    ctx.on(root,'mousemove',function(e){
      var r = btn.getBoundingClientRect();
      var dx = e.clientX - (r.left + r.width/2);
      var dy = e.clientY - (r.top  + r.height/2);
      var d = Math.hypot(dx,dy);
      if (d < R + 70){ tx = dx * .38; ty = dy * .5; } else { tx = ty = 0; }
    });
    ctx.on(root,'mouseleave',function(){ tx = ty = 0; });
    ctx.loop(function(){
      cx += (tx - cx) * .14; cy += (ty - cy) * .14;
      btn.style.transform = 'translate(' + cx.toFixed(2) + 'px,' + cy.toFixed(2) + 'px)';
      inner.style.transform = 'translate(' + (cx*.28).toFixed(2) + 'px,' + (cy*.28).toFixed(2) + 'px)';
    });
  }
},

{
  id:'h03', cat:'hover', title:'Underline animado',
  desc:'Três origens diferentes: da esquerda, do centro e "sai e entra".',
  tags:['scaleX','::after','CSS only'], hint:'passe o mouse',
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
      transform:scaleX(0);transition:transform .4s cubic-bezier(.65,0,.35,1)}
    .h03 .l1::after{transform-origin:left}
    .h03 .l1:hover::after{transform:scaleX(1)}
    .h03 .l2::after{transform-origin:center;background:#b08ac9}
    .h03 .l2:hover::after{transform:scaleX(1)}
    .h03 .l3::after{transform-origin:right;background:#5cc88f}
    .h03 .l3:hover::after{transform:scaleX(1);transform-origin:left}`
},

{
  id:'h04', cat:'hover', title:'Card com tilt 3D',
  desc:'rotateX/rotateY a partir da posição relativa do mouse + brilho especular.',
  tags:['3D','perspective','pointer'], hint:'passe o mouse',
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
      transform-style:preserve-3d;transition:transform .5s cubic-bezier(.22,1,.36,1)}
    .h04-c.live{transition:none}
    .h04-gl{position:absolute;inset:-40%;opacity:0;transition:opacity .3s;
      background:radial-gradient(circle at var(--x,50%) var(--y,50%),rgba(255,255,255,.22),transparent 45%)}
    .h04-c:hover .h04-gl{opacity:1}
    .h04-in{position:absolute;inset:0;padding:16px;display:flex;flex-direction:column;justify-content:flex-end;
      transform:translateZ(34px)}
    .h04-in span{position:absolute;top:14px;left:16px;font-family:var(--mono);font-size:10px;color:#d4af37;
      border:1px solid #d4af3755;border-radius:5px;padding:1px 6px}
    .h04-in b{font-size:16px;color:#f4f1eb}
    .h04-in small{color:#908b82;font-size:12px}`,
  js:function(root,ctx){
    var c = root.querySelector('.h04-c'), gl = root.querySelector('.h04-gl');
    ctx.on(c,'mouseenter',function(){ c.classList.add('live'); });
    ctx.on(c,'mousemove',function(e){
      var r = c.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      c.style.transform = 'rotateY(' + ((px - .5) * 22) + 'deg) rotateX(' + ((.5 - py) * 22) + 'deg) scale(1.05)';
      gl.style.setProperty('--x', px * 100 + '%');
      gl.style.setProperty('--y', py * 100 + '%');
    });
    ctx.on(c,'mouseleave',function(){
      c.classList.remove('live');
      c.style.transform = '';
    });
  }
},

{
  id:'h05', cat:'hover', title:'Spotlight que segue o cursor',
  desc:'Uma CSS var atualizada por JS ilumina a borda e o fundo dos cards.',
  tags:['CSS vars','radial-gradient','grupo'], hint:'passe o mouse',
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
    .h05-c::before{content:"";position:absolute;inset:0;opacity:0;transition:opacity .35s;
      background:radial-gradient(180px circle at var(--mx) var(--my),rgba(212,175,55,.14),transparent 60%)}
    .h05:hover .h05-c::before{opacity:1}
    .h05-c::after{content:"";position:absolute;inset:0;border-radius:12px;padding:1px;opacity:0;transition:opacity .35s;
      background:radial-gradient(180px circle at var(--mx) var(--my),rgba(212,175,55,.75),transparent 60%);
      -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
      -webkit-mask-composite:xor;mask-composite:exclude}
    .h05:hover .h05-c::after{opacity:1}
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
  }
},

{
  id:'h06', cat:'hover', title:'Troca de texto no hover',
  desc:'Duas cópias empilhadas deslizando juntas dentro de um overflow:hidden.',
  tags:['overflow','translateY','CSS only'], hint:'passe o mouse',
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
    .h06 i{display:block;height:1.35em;line-height:1.35em;font-style:normal;
      transition:transform .42s cubic-bezier(.65,0,.35,1)}
    .h06-b:hover i,.h06-l:hover i{transform:translateY(-100%)}`
},

{
  id:'h07', cat:'hover', title:'Ícones reativos',
  desc:'Rotação, pulso, "wiggle" e desenho de traço — cada um com sua curva.',
  tags:['SVG','rotate','keyframes'], hint:'passe o mouse',
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
      background:#1c1a15;border:1px solid #2b2721;transition:background .25s,border-color .25s,transform .3s}
    .h07-i:hover{background:#242019;border-color:#3d3729;transform:translateY(-3px)}
    .h07-i svg{width:22px;height:22px;fill:none;stroke:#ccc7bc;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
    .h07-i.r:hover svg{animation:h07r .7s cubic-bezier(.65,0,.35,1)}
    @keyframes h07r{to{transform:rotate(360deg)}}
    .h07-i.p:hover svg{animation:h07p .6s cubic-bezier(.34,1.56,.64,1);stroke:#e5645f;fill:#e5645f22}
    @keyframes h07p{0%{transform:scale(1)}45%{transform:scale(1.3)}100%{transform:scale(1.12)}}
    .h07-i.w:hover svg{animation:h07w .55s ease-in-out;transform-origin:50% 15%}
    @keyframes h07w{0%,100%{transform:rotate(0)}25%{transform:rotate(14deg)}60%{transform:rotate(-11deg)}}
    .h07-i.d svg path{stroke-dasharray:30;stroke-dashoffset:0;transition:stroke .25s}
    .h07-i.d:hover svg path{stroke:#5cc88f;animation:h07d .55s cubic-bezier(.65,0,.35,1)}
    @keyframes h07d{from{stroke-dashoffset:30}to{stroke-dashoffset:0}}`
},

{
  id:'h08', cat:'hover', title:'Zoom dentro da moldura',
  desc:'A imagem escala, a moldura não. Overflow hidden + escala assimétrica.',
  tags:['overflow','scale','mask'], hint:'passe o mouse',
  html:`
    <div class="h08">
      <figure class="h08-f"><div class="h08-img a"></div><figcaption>Projeto Aurora</figcaption></figure>
      <figure class="h08-f"><div class="h08-img b"></div><figcaption>Projeto Nebula</figcaption></figure>
    </div>`,
  css:`
    .h08{display:flex;gap:14px}
    .h08-f{margin:0;width:130px;border-radius:12px;overflow:hidden;background:#15120f;cursor:pointer}
    .h08-img{height:110px;transition:transform .8s cubic-bezier(.22,1,.36,1),filter .6s}
    .h08-img.a{background:conic-gradient(from 40deg,#d4af37,#b08ac9,#cf9b6a,#d4af37)}
    .h08-img.b{background:conic-gradient(from 200deg,#5cc88f,#b8871f,#b08ac9,#5cc88f)}
    .h08-f:hover .h08-img{transform:scale(1.18) rotate(2deg);filter:saturate(1.3)}
    .h08-f figcaption{padding:10px 12px;font-size:12px;color:#aca79d;
      transition:color .3s,transform .5s cubic-bezier(.22,1,.36,1)}
    .h08-f:hover figcaption{color:#fff;transform:translateX(4px)}`
},

{
  id:'h09', cat:'hover', title:'Overlay com clip-path',
  desc:'A cor entra em diagonal e o texto sobe junto — hover de portfólio.',
  tags:['clip-path','overlay','stagger'], hint:'passe o mouse',
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
      clip-path:polygon(0 100%,0 100%,0 100%,0 100%);
      transition:clip-path .6s cubic-bezier(.76,0,.24,1)}
    .h09-c:hover .h09-ov{clip-path:polygon(0 0,100% 0,100% 100%,0 100%)}
    .h09-ov b{font-size:17px;color:#1b1813;transform:translateY(14px);opacity:0;
      transition:all .5s cubic-bezier(.22,1,.36,1) .12s}
    .h09-ov span{font-size:12px;color:#1b1813;transform:translateY(14px);opacity:0;
      transition:all .5s cubic-bezier(.22,1,.36,1) .2s}
    .h09-c:hover .h09-ov b,.h09-c:hover .h09-ov span{transform:none;opacity:1}`
},

{
  id:'h10', cat:'hover', title:'Cursor customizado (dot + ring)',
  desc:'O ponto acompanha na hora; o anel chega atrasado por interpolação.',
  tags:['cursor','lerp','rAF'], hint:'mova o mouse aqui'
  , html:`
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
    .h10-ring{width:34px;height:34px;border:1px solid #d4af3788;margin:-17px 0 0 -17px;
      transition:width .3s,height .3s,margin .3s,background .3s}
    .h10-ring.big{width:64px;height:64px;margin:-32px 0 0 -32px;background:#d4af371f}`,
  js:function(root,ctx){
    var dot = root.querySelector('.h10-dot'),
        ring = root.querySelector('.h10-ring'),
        t = root.querySelector('.h10-t');
    var mx=0,my=0,rx=0,ry=0;
    ctx.on(root,'mousemove',function(e){
      var r = root.getBoundingClientRect();
      mx = e.clientX - r.left; my = e.clientY - r.top;
      dot.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
    });
    ctx.on(t,'mouseenter',function(){ ring.classList.add('big'); });
    ctx.on(t,'mouseleave',function(){ ring.classList.remove('big'); });
    ctx.loop(function(){
      rx += (mx - rx) * .16; ry += (my - ry) * .16;
      ring.style.transform = 'translate(' + rx.toFixed(2) + 'px,' + ry.toFixed(2) + 'px)';
    });
  }
},

{
  id:'h11', cat:'hover', title:'Cursor que vira rótulo',
  desc:'Ao entrar na mídia o cursor expande e escreve a ação.',
  tags:['cursor','scale','label'], hint:'passe sobre o card',
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
      transform:translate(-200px,-200px) scale(0);transition:transform .35s cubic-bezier(.34,1.56,.64,1)}
    .h11-cur.on{transform:translate(var(--x),var(--y)) scale(1)}`,
  js:function(root,ctx){
    var m = root.querySelector('.h11-media'), cur = root.querySelector('.h11-cur');
    var x=0,y=0,tx=0,ty=0,on=false;
    ctx.on(m,'mouseenter',function(){ on = true; cur.classList.add('on'); });
    ctx.on(m,'mouseleave',function(){ on = false; cur.classList.remove('on'); });
    ctx.on(root,'mousemove',function(e){
      var r = root.getBoundingClientRect();
      tx = e.clientX - r.left; ty = e.clientY - r.top;
    });
    ctx.loop(function(){
      x += (tx - x) * .18; y += (ty - y) * .18;
      cur.style.setProperty('--x', x.toFixed(1) + 'px');
      cur.style.setProperty('--y', y.toFixed(1) + 'px');
      cur.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px) scale(' + (on ? 1 : 0) + ')';
    });
  }
},

{
  id:'h12', cat:'hover', title:'Ripple no clique',
  desc:'Um círculo criado no ponto do clique e removido no fim da animação.',
  tags:['ripple','Material','JS'], hint:'clique nos botões',
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
    .h12-rp{position:absolute;border-radius:50%;background:rgba(255,255,255,.55);
      transform:scale(0);animation:h12 .62s cubic-bezier(.22,1,.36,1) forwards;pointer-events:none}
    .h12-b.ghost .h12-rp{background:rgba(212,175,55,.35)}
    @keyframes h12{to{transform:scale(2.6);opacity:0}}`,
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
        s.addEventListener('animationend', function(){ s.remove(); });
      });
    });
  }
},

{
  id:'h13', cat:'hover', title:'Borda em gradiente girando',
  desc:'@property + conic-gradient mascarado: a borda gira sem repintar o conteúdo.',
  tags:['@property','conic-gradient','mask'], hint:'sempre ativo',
  html:`<div class="h13"><div class="h13-c"><b>Plano Pro</b><span>borda viva</span></div></div>`,
  css:`
    @property --h13a{syntax:'<angle>';initial-value:0deg;inherits:false}
    .h13-c{position:relative;width:200px;padding:24px;border-radius:16px;background:#141312;text-align:center}
    .h13-c::before{content:"";position:absolute;inset:0;border-radius:16px;padding:1.5px;
      background:conic-gradient(from var(--h13a),#d4af37,#b08ac9,#cf9b6a,#5cc88f,#d4af37);
      -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
      -webkit-mask-composite:xor;mask-composite:exclude;
      animation:h13spin 4s linear infinite}
    .h13-c::after{content:"";position:absolute;inset:-2px;border-radius:18px;z-index:-1;filter:blur(14px);opacity:.5;
      background:conic-gradient(from var(--h13a),#d4af37,#b08ac9,#cf9b6a,#5cc88f,#d4af37);
      animation:h13spin 4s linear infinite}
    @keyframes h13spin{to{--h13a:360deg}}
    .h13-c b{display:block;font-size:16px;color:#f4f1eb}
    .h13-c span{font-size:12px;color:#85807a}`
},

{
  id:'h14', cat:'hover', title:'Shine / varredura de luz',
  desc:'Um gradiente inclinado atravessa a superfície no hover.',
  tags:['skew','gradient','CSS only'], hint:'passe o mouse',
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
    .h14-c::after,.h14-b::after{content:"";position:absolute;top:0;bottom:0;width:60%;left:-90%;
      background:linear-gradient(100deg,transparent,rgba(255,255,255,.35),transparent);
      transform:skewX(-22deg);transition:left .75s cubic-bezier(.65,0,.35,1)}
    .h14-c:hover::after,.h14-b:hover::after{left:130%}`
},

{
  id:'h15', cat:'hover', title:'Tooltip com origem correta',
  desc:'transform-origin no lado certo evita a sensação de "pipoco" aleatório.',
  tags:['tooltip','transform-origin','delay'], hint:'passe o mouse',
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
      padding:5px 10px;border-radius:7px;
      opacity:0;transform:scale(.82) translateY(6px);transform-origin:50% 100%;pointer-events:none;
      transition:opacity .2s,transform .32s cubic-bezier(.34,1.56,.64,1)}
    .h15-t:hover::after{opacity:1;transform:none}
    .h15-t.b::after{bottom:auto;top:calc(100% + 9px);transform-origin:50% 0;transform:scale(.82) translateY(-6px)}
    .h15-t.b:hover::after{transform:none}
    .h15-t.r::after{left:auto;right:calc(100% + 9px);bottom:auto;top:50%;translate:0 -50%;
      transform-origin:100% 50%;transform:scale(.82) translateX(6px)}
    .h15-t.r:hover::after{transform:none}`
}

);
