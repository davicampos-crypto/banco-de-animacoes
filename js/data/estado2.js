/* ==========================================================
   08b · ESTADO & FEEDBACK — lote 2
   ========================================================== */
(function () {
  var A = (window.ANIMDB = window.ANIMDB || []);
  function add(o) { o.nv = 1; A.push(o); }

add({
  id:'qx01', cat:'estado', title:'Confetti',
  desc:'Papéis com rotação 3D e gravidade, desenhados como retângulos girando no canvas.',
  tags:['confetti','física','canvas'], stage:'flush', hint:'clique em comemorar',
  html:`
    <div class="qx01">
      <canvas></canvas>
      <button class="qx01-b">🎉 Comemorar</button>
    </div>`,
  css:`
    .qx01{position:relative;width:100%;height:100%;background:#100f0e;display:grid;place-items:center}
    .qx01 canvas{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
    .qx01-b{position:relative;z-index:2;padding:11px 20px;border-radius:10px;background:#d4af37;
      color:#1b1813;font-size:13px;font-weight:700;transition:transform .3s cubic-bezier(.34,1.56,.64,1)}
    .qx01-b:active{transform:scale(.94)}`,
  js:function(root,ctx){
    var cv = root.querySelector('canvas'), c = cv.getContext('2d');
    var w = cv.width = cv.offsetWidth, h = cv.height = cv.offsetHeight;
    var P = [], cores = ['#d4af37','#b08ac9','#5cc88f','#e8c96a','#e5645f','#cf9b6a'];

    function soltar(){
      var ox = w/2, oy = h*.55;
      for (var i = 0; i < 90; i++){
        var a = -Math.PI/2 + (Math.random()-.5) * 2.1, v = 5 + Math.random() * 9;
        P.push({ x:ox, y:oy, vx:Math.cos(a)*v, vy:Math.sin(a)*v,
                 w:4 + Math.random()*5, h:6 + Math.random()*7,
                 r:Math.random()*6.3, vr:(Math.random()-.5)*.35,
                 c:cores[(Math.random()*6)|0], vida:1 });
      }
      if (P.length > 400) P.splice(0, P.length - 400);
    }
    ctx.on(root.querySelector('.qx01-b'),'click',soltar);
    ctx.wait(soltar, 500);

    ctx.loop(function(){
      c.clearRect(0,0,w,h);
      P.forEach(function(p){
        p.vy += .22; p.vx *= .995; p.x += p.vx; p.y += p.vy;
        p.r += p.vr; p.vida -= .006;
        c.save();
        c.translate(p.x, p.y);
        c.rotate(p.r);
        c.scale(1, Math.cos(p.r * 1.6));        // "vira" o papel no eixo
        c.globalAlpha = Math.max(0, p.vida);
        c.fillStyle = p.c;
        c.fillRect(-p.w/2, -p.h/2, p.w, p.h);
        c.restore();
      });
      P = P.filter(function(p){ return p.vida > 0 && p.y < h + 30; });
    });
  }
});

add({
  id:'qx02', cat:'estado', title:'Rating por estrelas',
  desc:'Preenchimento por fração (aceita meia estrela) e salto na estrela sob o cursor.',
  tags:['rating','clip','hover'], hint:'passe o mouse e clique',
  html:`
    <div class="qx02">
      <div class="qx02-s"></div>
      <b class="qx02-v">sem nota</b>
    </div>`,
  css:`
    .qx02{display:flex;flex-direction:column;gap:10px;align-items:center}
    .qx02-s{display:flex;gap:5px;cursor:pointer}
    .qx02-st{position:relative;width:30px;height:30px;transition:transform .3s cubic-bezier(.34,1.56,.64,1)}
    .qx02-st svg{position:absolute;inset:0;width:30px;height:30px}
    .qx02-st .bg{fill:#24211a}
    .qx02-st .fg{fill:#e8c96a;clip-path:inset(0 100% 0 0);transition:clip-path .28s cubic-bezier(.22,1,.36,1)}
    .qx02-st.hot{transform:scale(1.22) rotate(-6deg)}
    .qx02-v{font-size:12.5px;color:#a5a099;font-variant-numeric:tabular-nums}`,
  js:function(root,ctx){
    var box = root.querySelector('.qx02-s'), out = root.querySelector('.qx02-v'), N = 5, fixo = 0;
    var d = 'M15 2.6l3.9 7.9 8.7 1.3-6.3 6.1 1.5 8.7L15 22.5l-7.8 4.1 1.5-8.7-6.3-6.1 8.7-1.3z';
    for (var i = 0; i < N; i++){
      box.insertAdjacentHTML('beforeend',
        '<span class="qx02-st"><svg viewBox="0 0 30 30"><path class="bg" d="'+d+'"/>' +
        '<path class="fg" d="'+d+'"/></svg></span>');
    }
    var sts = box.querySelectorAll('.qx02-st');
    function pintar(v){
      sts.forEach(function(s,i){
        var f = Math.max(0, Math.min(1, v - i));
        s.querySelector('.fg').style.clipPath = 'inset(0 ' + ((1-f)*100) + '% 0 0)';
        s.classList.toggle('hot', Math.ceil(v) - 1 === i && v > 0);
      });
      out.textContent = v ? v.toFixed(1).replace('.', ',') + ' de 5' : 'sem nota';
    }
    ctx.on(box,'mousemove',function(e){
      var r = box.getBoundingClientRect();
      var v = Math.ceil((e.clientX - r.left) / r.width * N * 2) / 2;  // meia estrela
      pintar(Math.max(.5, Math.min(N, v)));
    });
    ctx.on(box,'mouseleave',function(){ pintar(fixo); });
    ctx.on(box,'click',function(e){
      var r = box.getBoundingClientRect();
      fixo = Math.max(.5, Math.min(N, Math.ceil((e.clientX - r.left) / r.width * N * 2) / 2));
      pintar(fixo);
    });
    pintar(0);
  }
});

add({
  id:'qx03', cat:'estado', title:'Campo de código (OTP)',
  desc:'O foco pula sozinho, colar preenche tudo e o conjunto sacode quando o código erra.',
  tags:['OTP','foco','paste'], hint:'digite 1234',
  html:`
    <div class="qx03">
      <div class="qx03-g">
        <input maxlength="1" inputmode="numeric" autocomplete="one-time-code"><input maxlength="1" inputmode="numeric" autocomplete="one-time-code">
        <input maxlength="1" inputmode="numeric" autocomplete="one-time-code"><input maxlength="1" inputmode="numeric" autocomplete="one-time-code">
      </div>
      <small class="qx03-s">o código certo é 1234</small>
    </div>`,
  css:`
    .qx03{display:flex;flex-direction:column;gap:12px;align-items:center}
    .qx03-g{display:flex;gap:9px}
    .qx03-g input{width:42px;height:52px;text-align:center;font-size:21px;font-weight:700;
      border-radius:11px;background:#1a1814;border:1.5px solid #2b2721;color:#f4f1eb;outline:0;
      transition:border-color .25s,transform .3s cubic-bezier(.34,1.56,.64,1),background .25s}
    .qx03-g input:focus{border-color:#d4af37;transform:translateY(-2px);background:#1a1712}
    .qx03-g.bad{animation:qx03 .4s cubic-bezier(.36,.07,.19,.97)}
    .qx03-g.bad input{border-color:#e5645f}
    .qx03-g.ok input{border-color:#5cc88f;background:#0f2b21}
    .qx03-s{font-size:11px;color:#6b675f;font-family:var(--mono)}
    @keyframes qx03{10%,90%{transform:translateX(-2px)}20%,80%{transform:translateX(4px)}
      30%,50%,70%{transform:translateX(-7px)}40%,60%{transform:translateX(7px)}}`,
  js:function(root,ctx){
    var g = root.querySelector('.qx03-g'),
        ins = [].slice.call(g.querySelectorAll('input')),
        s = root.querySelector('.qx03-s');
    function conferir(){
      var v = ins.map(function(i){ return i.value; }).join('');
      if (v.length < 4) return;
      g.classList.remove('bad','ok'); void g.offsetWidth;
      if (v === '1234'){ g.classList.add('ok'); s.textContent = 'código válido ✓'; }
      else {
        g.classList.add('bad'); s.textContent = 'código inválido';
        ctx.wait(function(){ ins.forEach(function(i){ i.value = ''; }); ins[0].focus(); g.classList.remove('bad'); }, 600);
      }
    }
    ins.forEach(function(inp,i){
      ctx.on(inp,'input',function(){
        inp.value = inp.value.replace(/\D/g,'').slice(0,1);
        if (inp.value && ins[i+1]) ins[i+1].focus();
        conferir();
      });
      ctx.on(inp,'keydown',function(e){
        if (e.key === 'Backspace' && !inp.value && ins[i-1]) ins[i-1].focus();
      });
      ctx.on(inp,'paste',function(e){
        e.preventDefault();
        var t = (e.clipboardData.getData('text') || '').replace(/\D/g,'');
        ins.forEach(function(x,j){ x.value = t[j] || ''; });
        ins[Math.min(3, t.length)].focus();
        conferir();
      });
    });
  }
});

add({
  id:'qx04', cat:'estado', title:'Força de senha',
  desc:'Quatro segmentos que acendem em sequência, com cor e rótulo mudando junto.',
  tags:['senha','segmentos','validação'], hint:'digite uma senha',
  html:`
    <div class="qx04">
      <input class="qx04-i" type="text" autocomplete="off" placeholder="digite uma senha" value="senha">
      <div class="qx04-bar"><i></i><i></i><i></i><i></i></div>
      <div class="qx04-l"><b>fraca</b><span class="qx04-tips"></span></div>
    </div>`,
  css:`
    .qx04{width:230px}
    .qx04-i{width:100%;padding:11px 13px;border-radius:10px;background:#1a1814;border:1px solid #2b2721;
      color:#efece6;font-size:13px;outline:0;transition:border-color .3s}
    .qx04-bar{display:flex;gap:5px;margin-top:10px}
    .qx04-bar i{flex:1;height:4px;border-radius:9px;background:#22201a;
      transition:background .4s cubic-bezier(.22,1,.36,1),transform .4s cubic-bezier(.34,1.56,.64,1);
      transform-origin:0 50%}
    .qx04-l{display:flex;align-items:baseline;gap:8px;margin-top:9px}
    .qx04-l b{font-size:11.5px;transition:color .3s}
    .qx04-tips{font-size:10.5px;color:#66625a;font-family:var(--mono)}`,
  js:function(root,ctx){
    var inp = root.querySelector('.qx04-i'),
        segs = root.querySelectorAll('.qx04-bar i'),
        lbl = root.querySelector('.qx04-l b'),
        tips = root.querySelector('.qx04-tips');
    var niveis = [['fraca','#e5645f'],['ok','#e8c96a'],['boa','#d4af37'],['forte','#5cc88f']];
    function medir(){
      var v = inp.value, faltam = [];
      var pontos = 0;
      if (v.length >= 8) pontos++; else faltam.push('8+ caracteres');
      if (/[A-Z]/.test(v)) pontos++; else faltam.push('maiúscula');
      if (/\d/.test(v)) pontos++; else faltam.push('número');
      if (/[^\w\s]/.test(v)) pontos++; else faltam.push('símbolo');
      var n = niveis[Math.max(0, pontos - 1)];
      segs.forEach(function(s,i){
        s.style.background = i < pontos ? n[1] : '#22201a';
        s.style.transform = i < pontos ? 'scaleX(1)' : 'scaleX(.96)';
        s.style.transitionDelay = (i * 55) + 'ms';
      });
      lbl.textContent = v ? n[0] : '—';
      lbl.style.color = v ? n[1] : '#66625a';
      tips.textContent = faltam.length ? 'falta: ' + faltam.join(', ') : 'nada a melhorar';
      inp.style.borderColor = v ? n[1] + '66' : '#2b2721';
    }
    ctx.on(inp,'input',medir);
    medir();
  }
});

add({
  id:'qx05', cat:'estado', title:'Slider com bolha de valor',
  desc:'A bolha acompanha o polegar, aparece só durante o arrasto e estica com a velocidade.',
  tags:['range','bolha','pointer'], hint:'arraste o slider',
  html:`
    <div class="qx05">
      <div class="qx05-b">R$ 0</div>
      <input class="qx05-i" type="range" min="0" max="5000" step="50" value="1800">
      <div class="qx05-lbl"><span>R$ 0</span><span>R$ 5.000</span></div>
    </div>`,
  css:`
    .qx05{position:relative;width:230px;padding-top:34px}
    .qx05-i{width:100%;-webkit-appearance:none;appearance:none;height:5px;border-radius:9px;
      background:linear-gradient(90deg,#d4af37 var(--p,36%),#22201a var(--p,36%));outline:0}
    .qx05-i::-webkit-slider-thumb{-webkit-appearance:none;width:19px;height:19px;border-radius:50%;
      background:#fff;border:3px solid #d4af37;cursor:grab;
      transition:transform .25s cubic-bezier(.34,1.56,.64,1)}
    .qx05-i:active::-webkit-slider-thumb{transform:scale(1.25);cursor:grabbing}
    .qx05-i::-moz-range-thumb{width:15px;height:15px;border-radius:50%;background:#fff;border:3px solid #d4af37}
    .qx05-b{position:absolute;top:0;left:0;padding:4px 9px;border-radius:8px;background:#d4af37;color:#1b1813;
      font-size:11.5px;font-weight:700;white-space:nowrap;
      opacity:0;transform:translate(-50%,6px) scale(.85);transform-origin:50% 100%;
      transition:opacity .2s,transform .32s cubic-bezier(.34,1.56,.64,1)}
    .qx05.on .qx05-b{opacity:1}
    .qx05-b::after{content:"";position:absolute;left:50%;top:100%;translate:-50% 0;border:5px solid transparent;
      border-top-color:#d4af37}
    .qx05-lbl{display:flex;justify-content:space-between;margin-top:9px;font-size:10px;color:#66625a;
      font-family:var(--mono)}`,
  js:function(root,ctx){
    var box = root.querySelector('.qx05'), inp = root.querySelector('.qx05-i'),
        bub = root.querySelector('.qx05-b'), last = 0, vel = 0;
    function upd(){
      var k = (inp.value - inp.min) / (inp.max - inp.min);
      inp.style.setProperty('--p', (k*100) + '%');
      var x = 9 + k * (inp.offsetWidth - 18);
      vel = Math.min(1, Math.abs(inp.value - last) / 400); last = inp.value;
      bub.style.transform = 'translate(-50%,0) scale(' + (1 + vel*.12) + ',' + (1 - vel*.1) + ')';
      bub.style.left = x + 'px';
      bub.textContent = 'R$ ' + (+inp.value).toLocaleString('pt-BR');
    }
    ctx.on(inp,'input',upd);
    ctx.on(inp,'pointerdown',function(){ box.classList.add('on'); });
    ctx.on(document,'pointerup',function(){ box.classList.remove('on'); });
    ctx.on(inp,'mouseenter',function(){ box.classList.add('on'); });
    ctx.on(inp,'mouseleave',function(){ box.classList.remove('on'); });
    upd();
  }
});

add({
  id:'qx06', cat:'estado', title:'Desfazer com timer circular',
  desc:'A ação já aconteceu; o anel mostra o tempo restante para voltar atrás.',
  tags:['undo','timer','snackbar'], hint:'clique em arquivar',
  html:`
    <div class="qx06">
      <div class="qx06-item"><b>Proposta comercial.pdf</b><button class="qx06-go">Arquivar</button></div>
      <div class="qx06-sn">
        <svg viewBox="0 0 28 28"><circle cx="14" cy="14" r="11"/></svg>
        <span>Arquivado</span><button class="qx06-un">Desfazer</button>
      </div>
    </div>`,
  css:`
    .qx06{position:relative;width:100%;height:100%;display:grid;place-items:center;padding:14px}
    .qx06-item{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:11px;
      background:#1d1b16;border:1px solid #2a2620;transition:opacity .4s,transform .4s}
    .qx06.gone .qx06-item{opacity:.25;transform:scale(.97)}
    .qx06-item b{font-size:12.5px;color:#e8e5df;font-weight:500}
    .qx06-go{padding:6px 12px;border-radius:8px;background:#2b2721;color:#e8e5df;font-size:11.5px;font-weight:600}
    .qx06-sn{position:absolute;left:12px;right:12px;bottom:12px;display:flex;align-items:center;gap:10px;
      padding:10px 12px;border-radius:10px;background:#f0ede7;color:#171510;
      opacity:0;transform:translateY(16px);pointer-events:none;
      transition:opacity .25s,transform .42s cubic-bezier(.34,1.56,.64,1)}
    .qx06.gone .qx06-sn{opacity:1;transform:none;pointer-events:auto}
    .qx06-sn svg{width:24px;height:24px;transform:rotate(-90deg);flex:none}
    .qx06-sn circle{fill:none;stroke:#171510;stroke-width:3;stroke-dasharray:69.1;stroke-dashoffset:0}
    .qx06.gone circle{animation:qx06 4s linear forwards}
    .qx06-sn span{font-size:12px;font-weight:600;flex:1}
    .qx06-un{padding:5px 11px;border-radius:7px;background:#171510;color:#fff;font-size:11px;font-weight:700}
    @keyframes qx06{to{stroke-dashoffset:69.1}}`,
  js:function(root,ctx){
    var box = root.querySelector('.qx06'), t;
    function arquivar(){
      box.classList.add('gone');
      t = ctx.wait(function(){ box.classList.remove('gone'); }, 4200);
    }
    ctx.on(root.querySelector('.qx06-go'),'click',arquivar);
    ctx.on(root.querySelector('.qx06-un'),'click',function(){
      clearTimeout(t); box.classList.remove('gone');
    });
  }
});

add({
  id:'qx07', cat:'estado', title:'Empty state vivo',
  desc:'Nada para mostrar não é motivo para tela morta: a ilustração respira e reage ao hover.',
  tags:['empty state','SVG','ilustração'], hint:'passe o mouse',
  html:`
    <div class="qx07">
      <svg viewBox="0 0 120 90" class="qx07-i">
        <ellipse class="sh" cx="60" cy="78" rx="30" ry="5"/>
        <rect class="bx" x="34" y="34" width="52" height="36" rx="5"/>
        <path class="lid" d="M30 34h60l-6-12H36z"/>
        <circle class="p p1" cx="46" cy="20" r="3"/>
        <circle class="p p2" cx="60" cy="14" r="3.6"/>
        <circle class="p p3" cx="74" cy="20" r="3"/>
      </svg>
      <b>Nenhum projeto ainda</b>
      <p>Crie o primeiro para ver a mágica.</p>
      <button>+ Novo projeto</button>
    </div>`,
  css:`
    .qx07{text-align:center;display:flex;flex-direction:column;align-items:center;gap:3px}
    .qx07-i{width:130px;height:98px;overflow:visible}
    .qx07-i .sh{fill:#000;opacity:.32;animation:qx07s 2.6s ease-in-out infinite}
    .qx07-i .bx{fill:#201d17;stroke:#34301f;stroke-width:1.5}
    .qx07-i .lid{fill:#2b2721;stroke:#3d3729;stroke-width:1.5;transform-origin:60px 34px;
      animation:qx07l 2.6s ease-in-out infinite}
    .qx07-i .p{fill:#d4af37;animation:qx07p 2.6s ease-in-out infinite}
    .qx07-i .p2{fill:#b08ac9;animation-delay:.18s}
    .qx07-i .p3{fill:#5cc88f;animation-delay:.36s}
    .qx07:hover .lid{animation-duration:1.1s}
    .qx07:hover .p{animation-duration:1.1s}
    .qx07 b{font-size:14.5px;color:#f1eee8;margin-top:6px}
    .qx07 p{font-size:12px;color:#85807a}
    .qx07 button{margin-top:10px;padding:8px 16px;border-radius:9px;background:#d4af37;color:#1b1813;
      font-size:12px;font-weight:700;transition:transform .3s cubic-bezier(.34,1.56,.64,1)}
    .qx07 button:hover{transform:translateY(-2px)}
    @keyframes qx07s{0%,100%{rx:30;opacity:.32}50%{rx:24;opacity:.2}}
    @keyframes qx07l{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-4px) rotate(-4deg)}}
    @keyframes qx07p{0%,100%{transform:translateY(0);opacity:.5}50%{transform:translateY(-7px);opacity:1}}`
});

add({
  id:'qx08', cat:'estado', title:'404 que reage ao mouse',
  desc:'Os olhos seguem o cursor e o número flutua em parallax — erro sem sensação de beco sem saída.',
  tags:['404','parallax','olhos'], stage:'flush', hint:'mova o mouse',
  html:`
    <div class="qx08">
      <div class="qx08-n" data-d="14">4<span class="qx08-eye"><i></i></span>4</div>
      <b data-d="7">Página não encontrada</b>
      <button data-d="4">← Voltar ao início</button>
    </div>`,
  css:`
    .qx08{position:relative;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;
      justify-content:center;gap:8px;background:radial-gradient(70% 70% at 50% 40%,#1a1712,#0d0c0b);overflow:hidden}
    .qx08-n{display:flex;align-items:center;gap:6px;font-size:52px;font-weight:800;color:#f4f1eb;
      letter-spacing:-.05em;will-change:transform}
    .qx08-eye{width:44px;height:44px;border-radius:50%;background:#f4f1eb;display:grid;place-items:center;
      box-shadow:inset 0 -4px 10px #c9c1ad}
    .qx08-eye i{width:17px;height:17px;border-radius:50%;background:#171510;display:block;
      transition:transform .08s linear}
    .qx08 b{font-size:14px;color:#a7a299;will-change:transform}
    .qx08 button{margin-top:6px;padding:8px 16px;border-radius:9px;background:#2b2721;color:#e8e5df;
      font-size:12px;font-weight:600;will-change:transform}`,
  js:function(root,ctx){
    var box = root.querySelector('.qx08'),
        camadas = root.querySelectorAll('[data-d]'),
        pupila = root.querySelector('.qx08-eye i');
    ctx.on(box,'mousemove',function(e){
      var r = box.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
      camadas.forEach(function(el){
        var d = +el.dataset.d;
        el.style.transform = 'translate(' + (px * d) + 'px,' + (py * d) + 'px)';
      });
      var o = pupila.parentElement.getBoundingClientRect();
      var a = Math.atan2(e.clientY - (o.top + o.height/2), e.clientX - (o.left + o.width/2));
      pupila.style.transform = 'translate(' + (Math.cos(a) * 9) + 'px,' + (Math.sin(a) * 9) + 'px)';
    });
  }
});

add({
  id:'qx09', cat:'estado', title:'Cartão que vira no CVV',
  desc:'Foco no campo de segurança gira o cartão em 3D e mostra a tarja.',
  tags:['3D','flip','checkout'], hint:'clique no campo CVV',
  html:`
    <div class="qx09">
      <div class="qx09-sc">
        <div class="qx09-c">
          <div class="qx09-f"><i class="chip"></i><b class="num">•••• •••• •••• 4429</b><span>RAFFAELA M. SOUZA</span></div>
          <div class="qx09-bk"><i class="tar"></i><div class="cvv"><em>CVV</em><b class="cv">•••</b></div></div>
        </div>
      </div>
      <div class="qx09-in">
        <input class="n" placeholder="número" maxlength="19">
        <input class="c" placeholder="CVV" maxlength="3">
      </div>
    </div>`,
  css:`
    .qx09{display:flex;flex-direction:column;gap:12px;align-items:center}
    .qx09-sc{perspective:900px}
    .qx09-c{position:relative;width:206px;height:124px;transform-style:preserve-3d;
      transition:transform .7s cubic-bezier(.4,.9,.3,1)}
    .qx09.flip .qx09-c{transform:rotateY(180deg)}
    .qx09-f,.qx09-bk{position:absolute;inset:0;border-radius:12px;backface-visibility:hidden;padding:14px;
      background:linear-gradient(135deg,#363018,#1a1712);border:1px solid #4a4028}
    .qx09-bk{transform:rotateY(180deg);background:linear-gradient(135deg,#282214,#161311)}
    .qx09-f .chip{display:block;width:30px;height:22px;border-radius:5px;
      background:linear-gradient(140deg,#e8c96a,#8a5a1c)}
    .qx09-f .num{display:block;margin-top:22px;font-family:var(--mono);font-size:14px;color:#f3f0e8;letter-spacing:.04em}
    .qx09-f span{display:block;margin-top:8px;font-size:9.5px;letter-spacing:.1em;color:#b0a894}
    .qx09-bk .tar{display:block;height:28px;background:#100e0a;margin:6px -14px 0}
    .qx09-bk .cvv{display:flex;align-items:center;justify-content:flex-end;gap:8px;margin-top:16px}
    .qx09-bk em{font-style:normal;font-size:9px;color:#95907f;letter-spacing:.1em}
    .qx09-bk .cv{background:#f0ece2;color:#171510;border-radius:4px;padding:3px 9px;font-family:var(--mono);font-size:12px}
    .qx09-in{display:flex;gap:8px}
    .qx09-in input{padding:9px 11px;border-radius:9px;background:#1a1814;border:1px solid #2b2721;
      color:#efece6;font-size:12px;outline:0;transition:border-color .25s}
    .qx09-in input:focus{border-color:#d4af37}
    .qx09-in .n{width:140px}
    .qx09-in .c{width:66px}`,
  js:function(root,ctx){
    var box = root.querySelector('.qx09'),
        num = root.querySelector('.qx09-in .n'), cvv = root.querySelector('.qx09-in .c');
    ctx.on(cvv,'focus',function(){ box.classList.add('flip'); });
    ctx.on(cvv,'blur',function(){ box.classList.remove('flip'); });
    ctx.on(cvv,'input',function(){
      cvv.value = cvv.value.replace(/\D/g,'');
      root.querySelector('.cv').textContent = (cvv.value + '•••').slice(0,3);
    });
    ctx.on(num,'input',function(){
      var v = num.value.replace(/\D/g,'').slice(0,16);
      num.value = v.replace(/(.{4})/g,'$1 ').trim();
      root.querySelector('.num').textContent = (v + '••••••••••••••••').slice(0,16).replace(/(.{4})/g,'$1 ').trim();
    });
  }
});

add({
  id:'qx10', cat:'estado', title:'Upload com fila',
  desc:'Cada arquivo tem sua barra, sua velocidade e seu desfecho — inclusive falhar.',
  tags:['upload','fila','progresso'], hint:'clique em enviar',
  html:`
    <div class="qx10">
      <div class="qx10-l"></div>
      <button class="qx10-b">+ Enviar arquivos</button>
    </div>`,
  css:`
    .qx10{width:240px}
    .qx10-l{display:flex;flex-direction:column;gap:7px;margin-bottom:10px;min-height:20px}
    .qx10-f{position:relative;overflow:hidden;padding:9px 11px;border-radius:9px;background:#1d1b16;
      border:1px solid #2a2620;animation:qx10 .4s cubic-bezier(.22,1,.36,1) both}
    .qx10-f .top{display:flex;align-items:center;gap:8px}
    .qx10-f .ico{width:20px;height:20px;border-radius:5px;background:#2b2721;display:grid;place-items:center;
      font-size:9px;color:#a5a099;flex:none}
    .qx10-f b{font-size:11.5px;color:#e8e5df;font-weight:500;flex:1;overflow:hidden;white-space:nowrap;
      text-overflow:ellipsis}
    .qx10-f s{text-decoration:none;font-family:var(--mono);font-size:10px;color:#736f68}
    .qx10-f i{position:absolute;left:0;bottom:0;height:2.5px;width:0;background:#d4af37;transition:width .3s linear}
    .qx10-f.ok i{background:#5cc88f;width:100%!important}
    .qx10-f.err{border-color:#e5645f55}
    .qx10-f.err i{background:#e5645f}
    .qx10-f.ok s{color:#5cc88f}
    .qx10-f.err s{color:#e5645f}
    .qx10-b{width:100%;padding:9px;border-radius:9px;background:#d4af37;color:#1b1813;font-size:12px;font-weight:700}
    @keyframes qx10{from{opacity:0;transform:translateY(-8px)}}`,
  js:function(root,ctx){
    var lista = root.querySelector('.qx10-l');
    var nomes = [['relatorio-anual.pdf','PDF'],['capa-final.png','PNG'],['dados-2025.csv','CSV'],['video-demo.mp4','MP4']];
    var n = 0;
    ctx.on(root.querySelector('.qx10-b'),'click',function(){
      if (lista.children.length >= 3) lista.innerHTML = '';
      var d = nomes[n++ % nomes.length];
      var f = document.createElement('div');
      f.className = 'qx10-f';
      f.innerHTML = '<div class="top"><span class="ico">' + d[1] + '</span><b>' + d[0] + '</b><s>0%</s></div><i></i>';
      lista.appendChild(f);
      var bar = f.querySelector('i'), pct = f.querySelector('s');
      var v = 0, vel = .5 + Math.random(), vaiFalhar = Math.random() < .25;
      (function passo(){
        v = Math.min(100, v + (6 + Math.random() * 13) * vel);
        bar.style.width = v + '%';
        pct.textContent = Math.round(v) + '%';
        if (vaiFalhar && v > 55){ f.classList.add('err'); pct.textContent = 'falhou'; return; }
        if (v < 100) ctx.wait(passo, 130 + Math.random() * 160);
        else { f.classList.add('ok'); pct.textContent = 'pronto ✓'; }
      })();
    });
  }
});

})();
