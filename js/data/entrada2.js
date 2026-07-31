/* ==========================================================
   01b · ENTRADA / REVEAL — lote 2
   ========================================================== */
(function () {
  var A = (window.ANIMDB = window.ANIMDB || []);
  function add(o) { o.nv = 1; A.push(o); }

add({
  id:'ex01', cat:'entrada', title:'Odômetro de dígitos',
  desc:'Cada casa é uma coluna de 0–9 que rola até o número certo.',
  tags:['odometer','translateY','counter'], hint:'clique em Replay',
  html:`<div class="ex01"><div class="ex01-n"></div><small>assinantes</small></div>`,
  css:`
    .ex01{text-align:center}
    .ex01-n{display:flex;gap:1px;justify-content:center;font-variant-numeric:tabular-nums}
    .ex01-d{height:44px;overflow:hidden;width:26px;border-radius:6px;background:#1b1915;border:1px solid #26221900}
    .ex01-d u{display:block;height:44px;line-height:44px;font-size:30px;font-weight:800;text-decoration:none;
      color:#f4f1eb;transition:transform 1.5s cubic-bezier(.22,1,.36,1)}
    .ex01-s{width:12px;height:44px;line-height:44px;font-size:26px;color:#55514a}
    .ex01 small{display:block;margin-top:8px;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#6b675f}`,
  js:function(root,ctx){
    var box = root.querySelector('.ex01-n'), alvo = '184920';
    alvo.split('').forEach(function(ch,i){
      // separador de milhar entre as casas
      if (i && (alvo.length - i) % 3 === 0){
        var s = document.createElement('span'); s.className = 'ex01-s'; s.textContent = '.';
        box.appendChild(s);
      }
      var d = document.createElement('div'); d.className = 'ex01-d';
      var u = document.createElement('u');
      u.innerHTML = '0123456789'.split('').join('<br>');   // a coluna inteira
      d.appendChild(u); box.appendChild(d);
      ctx.wait(function(){
        u.style.transitionDelay = (i * 90) + 'ms';
        u.style.transform = 'translateY(' + (-44 * +ch) + 'px)';
      }, 60);
    });
  }
});

add({
  id:'ex02', cat:'entrada', title:'Reveal de imagem com escala inversa',
  desc:'A moldura abre para um lado enquanto a imagem escala para o outro — sem "puxão".',
  tags:['clip-path','contra-escala','reveal'], hint:'clique em Replay',
  html:`<figure class="ex02"><div class="ex02-i"></div><figcaption>Aurora / 2025</figcaption></figure>`,
  css:`
    .ex02{margin:0;width:220px}
    .ex02 div{height:140px;border-radius:12px;overflow:hidden;position:relative;
      clip-path:inset(0 100% 0 0);animation:ex02a 1.1s cubic-bezier(.76,0,.24,1) .1s forwards}
    .ex02-i::after{content:"";position:absolute;inset:0;
      background:conic-gradient(from 30deg,#b8871f,#6f4f86,#cf9b6a,#b8871f);
      transform:scale(1.45);animation:ex02b 1.3s cubic-bezier(.22,1,.36,1) .1s forwards}
    .ex02 figcaption{margin-top:10px;font-size:12px;color:#8f8a80;overflow:hidden}
    @keyframes ex02a{to{clip-path:inset(0 0 0 0)}}
    @keyframes ex02b{to{transform:scale(1)}}`
});

add({
  id:'ex03', cat:'entrada', title:'Ordens de stagger',
  desc:'O mesmo grid entrando de três jeitos: do centro, na diagonal e aleatório.',
  tags:['stagger','ordem','delay'], hint:'clique para trocar a ordem',
  html:`
    <div class="ex03">
      <div class="ex03-g"></div>
      <div class="ex03-b"><button class="on">centro</button><button>diagonal</button><button>aleatório</button></div>
    </div>`,
  css:`
    .ex03{display:flex;flex-direction:column;gap:12px;align-items:center}
    .ex03-g{display:grid;grid-template-columns:repeat(7,20px);gap:5px}
    .ex03-g i{width:20px;height:20px;border-radius:5px;background:#322c1c;opacity:0;transform:scale(.2)}
    .ex03-g i.go{animation:ex03 .5s cubic-bezier(.34,1.56,.64,1) forwards}
    .ex03-b{display:flex;gap:5px}
    .ex03-b button{padding:5px 11px;border-radius:7px;font-size:11px;color:#8a857c;background:#1d1b16;transition:.2s}
    .ex03-b button.on{background:#d4af3722;color:#d4af37}
    @keyframes ex03{to{opacity:1;transform:none}}`,
  js:function(root,ctx){
    var C = 7, R = 5, g = root.querySelector('.ex03-g'), cells = [];
    for (var i = 0; i < C*R; i++){ var el = document.createElement('i'); g.appendChild(el); cells.push(el); }

    var ordens = {
      centro: function(x,y){ return Math.hypot(x - (C-1)/2, y - (R-1)/2) * 60; },
      diagonal: function(x,y){ return (x + y) * 45; },
      aleatório: function(){ return Math.random() * 600; }
    };
    function tocar(nome){
      cells.forEach(function(el,i){
        el.classList.remove('go'); el.style.animationDelay = '';
        void el.offsetWidth;
        el.style.animationDelay = ordens[nome](i % C, (i / C) | 0) + 'ms';
        el.classList.add('go');
      });
    }
    tocar('centro');
    root.querySelectorAll('.ex03-b button').forEach(function(b){
      ctx.on(b,'click',function(){
        root.querySelectorAll('.ex03-b button').forEach(function(x){ x.classList.remove('on'); });
        b.classList.add('on'); tocar(b.textContent);
      });
    });
  }
});

add({
  id:'ex04', cat:'entrada', title:'Blur-up de imagem (LQIP)',
  desc:'Miniatura minúscula esticada e desfocada segura o layout até a imagem real chegar.',
  tags:['LQIP','progressive','blur'], hint:'carrega em 1,8s',
  html:`
    <div class="ex04">
      <canvas class="ex04-lq" width="16" height="10"></canvas>
      <canvas class="ex04-hd" width="440" height="275"></canvas>
      <span class="ex04-t">16×10 px → 440×275</span>
    </div>`,
  css:`
    .ex04{position:relative;width:220px;height:138px;border-radius:12px;overflow:hidden;background:#151412}
    .ex04 canvas{position:absolute;inset:0;width:100%;height:100%}
    .ex04-lq{filter:blur(12px);transform:scale(1.12)}
    .ex04-hd{opacity:0;transition:opacity .7s ease}
    .ex04.on .ex04-hd{opacity:1}
    .ex04-t{position:absolute;left:8px;bottom:7px;font-family:var(--mono);font-size:9px;color:#ffffff88;
      background:#0008;border-radius:4px;padding:2px 6px}`,
  js:function(root,ctx){
    function cena(g,w,h,det){
      var grd = g.createLinearGradient(0,0,0,h);
      grd.addColorStop(0,'#c9762f'); grd.addColorStop(.55,'#6f4f86'); grd.addColorStop(1,'#17150f');
      g.fillStyle = grd; g.fillRect(0,0,w,h);
      g.fillStyle = '#100e0c';
      g.beginPath(); g.moveTo(0,h);
      for (var x = 0; x <= w; x += w/12) g.lineTo(x, h*.62 + Math.sin(x/w*7)*h*.16);
      g.lineTo(w,h); g.fill();
      if (det){                                   // detalhes que só existem na versão nítida
        g.fillStyle = '#f2e2b0';
        g.beginPath(); g.arc(w*.72, h*.26, h*.09, 0, 6.284); g.fill();
        g.strokeStyle = '#ffffff22';
        for (var i = 0; i < h; i += 4){ g.beginPath(); g.moveTo(0,i); g.lineTo(w,i); g.stroke(); }
      }
    }
    cena(root.querySelector('.ex04-lq').getContext('2d'), 16, 10, false);
    cena(root.querySelector('.ex04-hd').getContext('2d'), 440, 275, true);
    ctx.wait(function(){ root.querySelector('.ex04').classList.add('on'); }, 1800);
  }
});

add({
  id:'ex05', cat:'entrada', title:'Reveal por máscara de gradiente',
  desc:'A máscara desliza e o texto aparece com borda esfumada, sem corte duro.',
  tags:['mask-image','gradient','CSS only'],
  html:`
    <p class="ex05">Nem toda revelação precisa de uma borda reta. Uma máscara em gradiente entrega o
    conteúdo com um degradê que o olho nem registra como transição.</p>`,
  css:`
    .ex05{max-width:250px;margin:0;font-size:14px;line-height:1.8;color:#d6d1c6;
      -webkit-mask-image:linear-gradient(90deg,#000 0 30%,transparent 62%);
      mask-image:linear-gradient(90deg,#000 0 30%,transparent 62%);
      -webkit-mask-size:330% 100%;mask-size:330% 100%;
      -webkit-mask-position:100% 0;mask-position:100% 0;
      animation:ex05 2.2s cubic-bezier(.5,0,.2,1) .15s forwards}
    @keyframes ex05{to{-webkit-mask-position:0 0;mask-position:0 0}}`
});

add({
  id:'ex06', cat:'entrada', title:'Letter-spacing colapsando',
  desc:'O título nasce esparramado e se junta — dá sensação de "assentar".',
  tags:['letter-spacing','tracking','keyframes'],
  html:`<div class="ex06"><h4>COLAPSO</h4><span>tracking .6em → .02em</span></div>`,
  css:`
    .ex06{text-align:center}
    .ex06 h4{font-size:28px;font-weight:800;color:#f5f2ec;
      animation:ex06 1.3s cubic-bezier(.22,1,.36,1) .1s both}
    .ex06 span{display:block;margin-top:10px;font-family:var(--mono);font-size:10.5px;color:#66625a;
      animation:ex06b .8s ease .9s both}
    @keyframes ex06{from{letter-spacing:.6em;opacity:0;filter:blur(5px)}
      to{letter-spacing:.02em;opacity:1;filter:blur(0)}}
    @keyframes ex06b{from{opacity:0}to{opacity:1}}`
});

add({
  id:'ex07', cat:'entrada', title:'Reveal simétrico (some ao sair)',
  desc:'Entra ao aparecer e desfaz ao sair. Bom para listas longas, ruim para leitura corrida.',
  tags:['IntersectionObserver','exit','reversível'], stage:'scroll', hint:'role ↓ e ↑',
  html:`
    <div class="ex07">
      <div class="ex07-sp">role nos dois sentidos</div>
      <div class="ex07-i">Bloco A</div><div class="ex07-i">Bloco B</div>
      <div class="ex07-i">Bloco C</div><div class="ex07-i">Bloco D</div>
      <div class="ex07-sp"></div>
    </div>`,
  css:`
    .ex07{padding:14px}
    .ex07-sp{height:120px;display:grid;place-items:center;color:#524e47;font-size:12px;font-family:var(--mono)}
    .ex07-i{padding:18px;margin-bottom:12px;border-radius:10px;background:#201d18;border:1px solid #2a2620;
      color:#d7d7e2;font-size:13.5px;
      opacity:0;transform:translateY(22px) scale(.96);filter:blur(4px);
      transition:opacity .5s,transform .5s cubic-bezier(.22,1,.36,1),filter .5s}
    .ex07-i.in{opacity:1;transform:none;filter:blur(0)}`,
  js:function(root,ctx){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ e.target.classList.toggle('in', e.isIntersecting); });
    }, { root: root.closest('.stage'), threshold:.5 });
    root.querySelectorAll('.ex07-i').forEach(function(el){ io.observe(el); });
    ctx.clean(function(){ io.disconnect(); });
  }
});

add({
  id:'ex08', cat:'entrada', title:'Splash que vira o header',
  desc:'O logo do preloader mede o destino e voa até lá com FLIP — sem corte entre as telas.',
  tags:['FLIP','splash','shared element'], hint:'clique em Replay',
  html:`
    <div class="ex08">
      <header class="ex08-h"><span class="ex08-slot"></span><nav><i></i><i></i><i></i></nav></header>
      <div class="ex08-body"><b>Conteúdo</b><i></i><i class="s"></i></div>
      <div class="ex08-splash"><div class="ex08-logo">◆</div></div>
    </div>`,
  css:`
    .ex08{position:relative;width:100%;height:100%;overflow:hidden;background:#111010}
    .ex08-h{display:flex;align-items:center;padding:14px 16px;border-bottom:1px solid #211e18}
    .ex08-slot{width:26px;height:26px}
    .ex08-h nav{display:flex;gap:8px;margin-left:auto}
    .ex08-h nav i{width:26px;height:6px;border-radius:9px;background:#22201a}
    .ex08-body{padding:18px 16px;opacity:0;transform:translateY(10px);
      transition:opacity .6s .1s,transform .6s cubic-bezier(.22,1,.36,1) .1s}
    .ex08.done .ex08-body{opacity:1;transform:none}
    .ex08-body b{font-size:14px;color:#f1eee8}
    .ex08-body i{display:block;height:8px;border-radius:99px;background:#1f1c17;margin-top:10px}
    .ex08-body i.s{width:55%}
    .ex08-splash{position:absolute;inset:0;display:grid;place-items:center;background:#111010;
      transition:background .5s .35s}
    .ex08.done .ex08-splash{background:transparent;pointer-events:none}
    .ex08-logo{font-size:52px;line-height:1;color:#d4af37;transform-origin:0 0;
      animation:ex08p 1s ease-in-out infinite alternate}
    .ex08.fly .ex08-logo{animation:none;transition:transform .8s cubic-bezier(.76,0,.24,1)}
    @keyframes ex08p{to{opacity:.45}}`,
  js:function(root,ctx){
    var box = root.querySelector('.ex08'),
        logo = root.querySelector('.ex08-logo'),
        slot = root.querySelector('.ex08-slot');
    ctx.wait(function(){
      var a = logo.getBoundingClientRect(), b = slot.getBoundingClientRect();
      box.classList.add('fly');
      // FLIP: mede origem e destino, aplica a diferença
      logo.style.transform = 'translate(' + (b.left - a.left) + 'px,' + (b.top - a.top) + 'px) scale(' + (b.width / a.width) + ')';
      ctx.wait(function(){ box.classList.add('done'); }, 260);
    }, 1100);
  }
});

})();
