/* ==========================================================
   05b · LOADERS & TRANSIÇÕES — lote 2
   ========================================================== */
(function () {
  var A = (window.ANIMDB = window.ANIMDB || []);
  function add(o) { o.nv = 1; A.push(o); }

add({
  id:'lx01', cat:'loaders', title:'View Transitions API',
  desc:'O navegador tira um "print" do antes e do depois e anima a diferença. Você só troca o DOM.',
  tags:['startViewTransition','API nativa','Chrome 111+'], hint:'clique para trocar',
  html:`
    <div class="lx01">
      <div class="lx01-slot"><article class="lx01-c" style="--c:#2b2618"><b>Cartão A</b><span>estado 1</span></article></div>
      <button class="lx01-go">document.startViewTransition()</button>
      <small class="lx01-s"></small>
    </div>`,
  css:`
    .lx01{display:flex;flex-direction:column;gap:12px;align-items:center}
    .lx01-slot{width:180px;height:96px}
    .lx01-c{display:grid;place-content:center;gap:3px;width:100%;height:100%;border-radius:14px;
      background:var(--c);border:1px solid #ffffff18;text-align:center;
      view-transition-name:lx01card}
    .lx01-c b{font-size:15px;color:#f4f1eb}
    .lx01-c span{font-size:11px;color:#ffffff77}
    .lx01-go{padding:9px 14px;border-radius:9px;background:#242019;border:1px solid #332e21;
      color:#e8e5df;font-family:var(--mono);font-size:10.5px}
    .lx01-s{font-family:var(--mono);font-size:9.5px;color:#66625a}

    /* o root inteiro seria animado por padrão — desligamos e animamos só o cartão */
    ::view-transition-old(root),::view-transition-new(root){animation:none;mix-blend-mode:normal}
    ::view-transition-old(lx01card){animation:lx01out .3s cubic-bezier(.65,0,.35,1) both}
    ::view-transition-new(lx01card){animation:lx01in .45s cubic-bezier(.22,1,.36,1) both}
    @keyframes lx01out{to{opacity:0;transform:translateY(-14px) scale(.94)}}
    @keyframes lx01in{from{opacity:0;transform:translateY(14px) scale(.94)}}`,
  js:function(root,ctx){
    var slot = root.querySelector('.lx01-slot'),
        s = root.querySelector('.lx01-s'),
        dados = [['Cartão A','estado 1','#2b2618'],['Cartão B','estado 2','#362540'],['Cartão C','estado 3','#1e352a']],
        i = 0;
    s.textContent = document.startViewTransition ? 'API disponível neste navegador' : 'sem suporte — troca seca';
    function pintar(){
      i = (i + 1) % dados.length;
      slot.innerHTML = '<article class="lx01-c" style="--c:' + dados[i][2] + '"><b>' +
        dados[i][0] + '</b><span>' + dados[i][1] + '</span></article>';
    }
    ctx.on(root.querySelector('.lx01-go'),'click',function(){
      if (!document.startViewTransition) return pintar();
      document.startViewTransition(pintar);
    });
  }
});

add({
  id:'lx02', cat:'loaders', title:'View Transitions entre documentos',
  desc:'Duas páginas HTML de verdade num iframe: a transição atravessa a navegação, sem SPA.',
  tags:['MPA','@view-transition','navigation'], stage:'flush', hint:'clique no botão da página',
  html:`<iframe class="lx02" src="pages/vt-a.html" title="demo view transition"></iframe>`,
  css:`.lx02{width:100%;height:100%;border:0;display:block;background:#14120c}`
});

add({
  id:'lx03', cat:'loaders', title:'Shared element transition',
  desc:'O card da lista vira o header do detalhe: mede origem e destino e anima a diferença (FLIP).',
  tags:['FLIP','shared element','detalhe'], hint:'clique num card',
  html:`
    <div class="lx03">
      <div class="lx03-list">
        <div class="lx03-i" data-c="#2b2618" data-t="Aurora"><i></i><b>Aurora</b></div>
        <div class="lx03-i" data-c="#362540" data-t="Nebula"><i></i><b>Nebula</b></div>
        <div class="lx03-i" data-c="#1e352a" data-t="Quasar"><i></i><b>Quasar</b></div>
      </div>
      <div class="lx03-det">
        <div class="lx03-hero"></div>
        <b class="lx03-ttl"></b>
        <p>Projeto de identidade e movimento.</p>
        <button class="lx03-back">← voltar</button>
      </div>
    </div>`,
  css:`
    .lx03{position:relative;width:100%;height:100%;overflow:hidden}
    .lx03-list{display:flex;flex-direction:column;gap:8px;padding:14px}
    .lx03-i{display:flex;align-items:center;gap:10px;padding:8px;border-radius:10px;background:#1b1915;
      border:1px solid #24211a;cursor:pointer;transition:background .2s}
    .lx03-i:hover{background:#211e18}
    .lx03-i i{width:46px;height:38px;border-radius:8px;background:#333;display:block}
    .lx03-i b{font-size:13px;color:#ece9e3}
    .lx03-det{position:absolute;inset:0;background:#121110;padding:14px;opacity:0;pointer-events:none;
      transition:opacity .3s}
    .lx03.open .lx03-det{opacity:1;pointer-events:auto}
    .lx03-hero{height:84px;border-radius:12px;background:#333}
    .lx03-ttl{display:block;margin-top:10px;font-size:17px;color:#f5f2ec}
    .lx03-det p{font-size:12px;color:#8a857c;margin-top:4px}
    .lx03-back{margin-top:12px;padding:7px 13px;border-radius:8px;background:#2b2721;color:#e8e5df;font-size:11.5px}
    .lx03-fly{position:absolute;z-index:9;border-radius:8px;pointer-events:none}`,
  js:function(root,ctx){
    var box = root.querySelector('.lx03'),
        det = root.querySelector('.lx03-det'),
        hero = root.querySelector('.lx03-hero'),
        ttl = root.querySelector('.lx03-ttl');

    root.querySelectorAll('.lx03-i').forEach(function(it){
      it.querySelector('i').style.background = it.dataset.c;
      ctx.on(it,'click',function(){
        var thumb = it.querySelector('i'), cor = it.dataset.c;
        var a = thumb.getBoundingClientRect(), base = box.getBoundingClientRect();
        hero.style.background = cor; ttl.textContent = it.dataset.t;
        box.classList.add('open');

        var b = hero.getBoundingClientRect();
        var fly = document.createElement('div');           // o elemento que "voa"
        fly.className = 'lx03-fly';
        fly.style.cssText = 'left:' + (a.left-base.left) + 'px;top:' + (a.top-base.top) + 'px;' +
          'width:' + a.width + 'px;height:' + a.height + 'px;background:' + cor;
        box.appendChild(fly);
        hero.style.opacity = 0;
        fly.animate([
          { transform:'none', borderRadius:'8px' },
          { transform:'translate(' + (b.left-a.left) + 'px,' + (b.top-a.top) + 'px) scale(' +
              (b.width/a.width) + ',' + (b.height/a.height) + ')', borderRadius:'6px' }
        ], { duration:520, easing:'cubic-bezier(.22,1,.36,1)' }).onfinish = function(){
          hero.style.opacity = 1; fly.remove();
        };
      });
    });
    ctx.on(root.querySelector('.lx03-back'),'click',function(){ box.classList.remove('open'); });
  }
});

add({
  id:'lx04', cat:'loaders', title:'Progresso circular determinado',
  desc:'Upload com porcentagem real: o anel preenche e vira check no fim.',
  tags:['SVG','upload','determinado'], hint:'clique em Replay',
  html:`
    <div class="lx04">
      <svg viewBox="0 0 80 80">
        <circle class="t" cx="40" cy="40" r="34"/><circle class="p" cx="40" cy="40" r="34"/>
        <path class="ck" d="M27 41l9 9 17-19"/>
      </svg>
      <b>0%</b>
      <small>relatorio-final.pdf</small>
    </div>`,
  css:`
    .lx04{position:relative;width:150px;text-align:center}
    .lx04 svg{width:110px;height:110px;transform:rotate(-90deg)}
    .lx04 circle{fill:none;stroke-width:5}
    .lx04 .t{stroke:#201e18}
    .lx04 .p{stroke:#d4af37;stroke-linecap:round;stroke-dasharray:213.6;stroke-dashoffset:213.6;
      transition:stroke-dashoffset .3s linear,stroke .4s}
    .lx04 .ck{fill:none;stroke:#5cc88f;stroke-width:5;stroke-linecap:round;stroke-linejoin:round;
      stroke-dasharray:40;stroke-dashoffset:40;transform:rotate(90deg);transform-origin:40px 40px}
    .lx04.done .p{stroke:#5cc88f}
    .lx04.done .ck{animation:lx04 .5s cubic-bezier(.65,0,.35,1) .1s forwards}
    .lx04 b{position:absolute;top:44px;left:0;right:0;font-size:19px;font-weight:800;color:#f4f1eb;
      font-variant-numeric:tabular-nums;transition:opacity .3s}
    .lx04.done b{opacity:0}
    .lx04 small{display:block;font-family:var(--mono);font-size:10px;color:#66625a;margin-top:4px}
    @keyframes lx04{to{stroke-dashoffset:0}}`,
  js:function(root,ctx){
    var box = root.querySelector('.lx04'), p = root.querySelector('.p'),
        n = root.querySelector('b'), C = 213.6, v = 0;
    (function passo(){
      v = Math.min(100, v + Math.random() * 11 + 2);
      p.style.strokeDashoffset = C * (1 - v/100);
      n.textContent = Math.round(v) + '%';
      if (v < 100) ctx.wait(passo, 140 + Math.random() * 200);
      else ctx.wait(function(){ box.classList.add('done'); }, 300);
    })();
  }
});

add({
  id:'lx05', cat:'loaders', title:'Barra de rota no topo (NProgress)',
  desc:'Avança rápido até 90%, trava esperando o servidor e completa quando a resposta chega.',
  tags:['NProgress','rota','fake progress'], stage:'flush', hint:'clique nos links',
  html:`
    <div class="lx05">
      <div class="lx05-bar"><i></i></div>
      <nav class="lx05-n"><a class="on">/home</a><a>/preco</a><a>/docs</a></nav>
      <div class="lx05-c"><b class="lx05-t">/home</b><p>Clique em outra rota: a barra sobe até 90% e espera.</p></div>
    </div>`,
  css:`
    .lx05{width:100%;height:100%;position:relative;background:#121110}
    .lx05-bar{position:absolute;top:0;left:0;right:0;height:2.5px;background:transparent;z-index:5}
    .lx05-bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,#d4af37,#b08ac9);
      box-shadow:0 0 10px #d4af3799;opacity:0;transition:width .35s ease,opacity .3s}
    .lx05-n{display:flex;gap:4px;padding:14px 14px 0}
    .lx05-n a{padding:6px 12px;border-radius:8px;font-family:var(--mono);font-size:11px;color:#85807a;cursor:pointer;
      transition:.2s}
    .lx05-n a.on{background:#201e18;color:#f1eee8}
    .lx05-c{padding:18px 16px}
    .lx05-c b{font-family:var(--mono);font-size:14px;color:#d4af37}
    .lx05-c p{font-size:12px;color:#8a857c;margin-top:6px}`,
  js:function(root,ctx){
    var bar = root.querySelector('.lx05-bar i'),
        ttl = root.querySelector('.lx05-t'),
        links = root.querySelectorAll('.lx05-n a'), busy = false;
    links.forEach(function(a){
      ctx.on(a,'click',function(){
        if (busy || a.classList.contains('on')) return;
        busy = true;
        links.forEach(function(x){ x.classList.remove('on'); });
        a.classList.add('on');
        bar.style.transition = 'none'; bar.style.width = '0'; bar.style.opacity = 1;
        void bar.offsetWidth;
        bar.style.transition = 'width 1.1s cubic-bezier(.1,.9,.2,1)';
        bar.style.width = '90%';                        // trava esperando a resposta
        ctx.wait(function(){
          bar.style.transition = 'width .25s ease,opacity .4s .2s';
          bar.style.width = '100%'; bar.style.opacity = 0;
          ttl.textContent = a.textContent;
          busy = false;
        }, 1300);
      });
    });
  }
});

add({
  id:'lx06', cat:'loaders', title:'Transição em círculo do clique',
  desc:'O novo conteúdo nasce exatamente no ponto clicado com clip-path circle().',
  tags:['clip-path','origem','circle()'], stage:'flush', hint:'clique em qualquer lugar',
  html:`
    <div class="lx06">
      <div class="lx06-p a"><b>Toque em qualquer ponto</b><span>a onda nasce onde você clicar</span></div>
    </div>`,
  css:`
    .lx06{position:relative;width:100%;height:100%;overflow:hidden;cursor:pointer}
    .lx06-p{position:absolute;inset:0;display:grid;place-content:center;gap:5px;text-align:center;padding:20px}
    .lx06-p b{font-size:17px;font-weight:700}
    .lx06-p span{font-size:12px;opacity:.65}
    .lx06-p.a{background:linear-gradient(140deg,#262014,#14120c);color:#f0ede7}
    .lx06-p.b{background:linear-gradient(140deg,#d4af37,#5cc88f);color:#1b1813}
    .lx06-p.c{background:linear-gradient(140deg,#cf9b6a,#b08ac9);color:#2a0a2e}`,
  js:function(root,ctx){
    var box = root.querySelector('.lx06'), tipos = ['a','b','c'], i = 0, busy = false;
    ctx.on(box,'click',function(e){
      if (busy) return; busy = true;
      var r = box.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      var raio = Math.max(Math.hypot(x,y), Math.hypot(r.width-x,y),
                          Math.hypot(x,r.height-y), Math.hypot(r.width-x,r.height-y));
      i = (i + 1) % tipos.length;
      var nova = document.createElement('div');
      nova.className = 'lx06-p ' + tipos[i];
      nova.innerHTML = '<b>Página ' + tipos[i].toUpperCase() + '</b><span>clique de novo</span>';
      nova.style.clipPath = 'circle(0px at ' + x + 'px ' + y + 'px)';
      box.appendChild(nova);
      nova.animate(
        [{ clipPath:'circle(0px at ' + x + 'px ' + y + 'px)' },
         { clipPath:'circle(' + raio + 'px at ' + x + 'px ' + y + 'px)' }],
        { duration:680, easing:'cubic-bezier(.76,0,.24,1)', fill:'forwards' }
      ).onfinish = function(){
        while (box.children.length > 1) box.removeChild(box.firstChild);
        nova.style.clipPath = 'none';
        busy = false;
      };
    });
  }
});

add({
  id:'lx07', cat:'loaders', title:'Skeleton por rota',
  desc:'Cada tela tem um esqueleto com a própria forma — genérico demais parece bug.',
  tags:['skeleton','rota','forma'], hint:'clique nas abas',
  html:`
    <div class="lx07">
      <nav><button class="on">Feed</button><button>Perfil</button><button>Tabela</button></nav>
      <div class="lx07-v"></div>
    </div>`,
  css:`
    .lx07{width:240px}
    .lx07 nav{display:flex;gap:4px;margin-bottom:10px}
    .lx07 nav button{flex:1;padding:6px;border-radius:7px;font-size:11px;color:#8a857c;background:#1d1b16;transition:.2s}
    .lx07 nav button.on{background:#d4af3722;color:#d4af37}
    .lx07-v{min-height:132px;padding:12px;border-radius:11px;background:#181611;border:1px solid #23201a}
    .lx07-v .sk{background:#1f1c17;border-radius:6px;position:relative;overflow:hidden}
    .lx07-v .sk::after{content:"";position:absolute;inset:0;
      background:linear-gradient(90deg,transparent,rgba(255,255,255,.07),transparent);
      transform:translateX(-100%);animation:lx07 1.3s ease-in-out infinite}
    .lx07-row{display:flex;gap:9px;align-items:center;margin-bottom:10px}
    .lx07-v .real{font-size:12px;color:#c6c1b6;line-height:1.7}
    .lx07-v .real b{color:#f1eee8}
    @keyframes lx07{to{transform:translateX(100%)}}`,
  js:function(root,ctx){
    var v = root.querySelector('.lx07-v'), btns = root.querySelectorAll('.lx07 nav button');
    var esqueleto = {
      Feed: '<div class="lx07-row"><div class="sk" style="width:34px;height:34px;border-radius:50%"></div>' +
            '<div style="flex:1"><div class="sk" style="height:10px;width:55%"></div>' +
            '<div class="sk" style="height:9px;width:80%;margin-top:7px"></div></div></div>' +
            '<div class="sk" style="height:56px"></div>',
      Perfil: '<div class="sk" style="height:44px"></div>' +
            '<div class="sk" style="height:34px;width:34px;border-radius:50%;margin:-17px 0 0 12px;position:relative"></div>' +
            '<div class="sk" style="height:11px;width:45%;margin-top:12px"></div>' +
            '<div class="sk" style="height:9px;width:70%;margin-top:8px"></div>',
      Tabela: [0,1,2,3].map(function(){
            return '<div class="lx07-row"><div class="sk" style="height:9px;flex:2"></div>' +
                   '<div class="sk" style="height:9px;flex:1"></div>' +
                   '<div class="sk" style="height:9px;width:36px"></div></div>'; }).join('')
    };
    var real = {
      Feed:'<p class="real"><b>Marina</b> publicou um estudo de caso.<br>“Como cortamos o LCP pela metade.”</p>',
      Perfil:'<p class="real"><b>Marina Duarte</b><br>Diretora de arte · São Paulo<br>9 anos de identidade e motion.</p>',
      Tabela:'<p class="real"><b>4 registros</b><br>Jan 1.240 · Fev 1.810<br>Mar 1.520 · Abr 2.390</p>'
    };
    function carregar(nome){
      v.innerHTML = esqueleto[nome];
      ctx.wait(function(){ v.innerHTML = real[nome]; }, 1500);
    }
    carregar('Feed');
    btns.forEach(function(b){
      ctx.on(b,'click',function(){
        btns.forEach(function(x){ x.classList.remove('on'); });
        b.classList.add('on'); carregar(b.textContent);
      });
    });
  }
});

add({
  id:'lx08', cat:'loaders', title:'Troca de tema em círculo',
  desc:'O tema novo é revelado por um círculo que cresce a partir do botão.',
  tags:['tema','clip-path','dark mode'], stage:'flush', hint:'clique no sol/lua',
  html:`
    <div class="lx08">
      <div class="lx08-p"><b>Boa noite</b><p>Interface em modo escuro.</p><i></i><i class="s"></i></div>
      <button class="lx08-b">☾</button>
    </div>`,
  css:`
    .lx08{position:relative;width:100%;height:100%;overflow:hidden}
    .lx08-p{position:absolute;inset:0;padding:24px;background:#100f0e;color:#f0ede7}
    .lx08-p.light{background:#f5f2ea;color:#191712}
    .lx08-p b{font-size:20px;font-weight:800;letter-spacing:-.03em}
    .lx08-p p{font-size:12.5px;opacity:.6;margin-top:4px}
    .lx08-p i{display:block;height:9px;border-radius:99px;background:currentColor;opacity:.12;margin-top:12px}
    .lx08-p i.s{width:60%}
    .lx08-b{position:absolute;right:14px;top:14px;z-index:5;width:34px;height:34px;border-radius:50%;
      background:#ffffff14;border:1px solid #ffffff22;font-size:15px;color:#fff;backdrop-filter:blur(6px)}`,
  js:function(root,ctx){
    var box = root.querySelector('.lx08'), btn = root.querySelector('.lx08-b'), claro = false, busy = false;
    ctx.on(btn,'click',function(){
      if (busy) return; busy = true;
      claro = !claro;
      var r = box.getBoundingClientRect(), b = btn.getBoundingClientRect();
      var x = b.left - r.left + b.width/2, y = b.top - r.top + b.height/2;
      var raio = Math.hypot(Math.max(x, r.width - x), Math.max(y, r.height - y));

      var nova = root.querySelector('.lx08-p').cloneNode(true);
      nova.classList.toggle('light', claro);
      nova.querySelector('b').textContent = claro ? 'Bom dia' : 'Boa noite';
      nova.querySelector('p').textContent = claro ? 'Interface em modo claro.' : 'Interface em modo escuro.';
      box.insertBefore(nova, btn);
      nova.animate(
        [{ clipPath:'circle(0px at ' + x + 'px ' + y + 'px)' },
         { clipPath:'circle(' + raio + 'px at ' + x + 'px ' + y + 'px)' }],
        { duration:620, easing:'cubic-bezier(.76,0,.24,1)', fill:'forwards' }
      ).onfinish = function(){
        while (box.querySelectorAll('.lx08-p').length > 1) box.removeChild(box.querySelector('.lx08-p'));
        nova.style.clipPath = 'none';
        btn.textContent = claro ? '☀' : '☾';
        btn.style.color = claro ? '#191712' : '#fff';
        busy = false;
      };
    });
  }
});

})();
