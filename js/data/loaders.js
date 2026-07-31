/* ==========================================================
   05 · LOADERS & TRANSIÇÕES
   ========================================================== */
(window.ANIMDB = window.ANIMDB || []).push(

{
  id:'l01', cat:'loaders', title:'Preloader com porcentagem',
  desc:'Progresso falso com passos irregulares — parece mais "real" que linear.',
  tags:['loader','counter','rAF'], hint:'clique em Replay',
  html:`
    <div class="l01">
      <div class="l01-num">0<small>%</small></div>
      <div class="l01-bar"><i></i></div>
      <div class="l01-lbl">carregando assets…</div>
      <div class="l01-done">pronto ✦</div>
    </div>`,
  css:`
    .l01{width:230px;text-align:center;position:relative}
    .l01-num{font-size:44px;font-weight:800;letter-spacing:-.04em;color:#f4f1eb;font-variant-numeric:tabular-nums}
    .l01-num small{font-size:16px;color:#66625a;margin-left:2px}
    .l01-bar{height:3px;background:#22201a;border-radius:9px;overflow:hidden;margin:12px 0 10px}
    .l01-bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,#d4af37,#b08ac9)}
    .l01-lbl{font-family:var(--mono);font-size:10.5px;color:#66625a;letter-spacing:.06em}
    .l01-done{position:absolute;inset:0;display:grid;place-items:center;font-size:20px;font-weight:700;color:#5cc88f;
      opacity:0;transform:scale(.9);transition:all .5s cubic-bezier(.34,1.56,.64,1)}
    .l01.end .l01-done{opacity:1;transform:none}
    .l01.end .l01-num,.l01.end .l01-bar,.l01.end .l01-lbl{opacity:0;transition:opacity .3s}`,
  js:function(root,ctx){
    var box = root.querySelector('.l01'),
        num = root.querySelector('.l01-num'),
        bar = root.querySelector('.l01-bar i'),
        lbl = root.querySelector('.l01-lbl'),
        msgs = ['carregando assets…','decodificando fontes…','montando o layout…','quase lá…'];
    var p = 0;
    (function step(){
      p += Math.random() * 14 + 3;
      if (p > 100) p = 100;
      num.firstChild.nodeValue = Math.floor(p);
      bar.style.width = p + '%';
      lbl.textContent = msgs[Math.min(3, Math.floor(p / 26))];
      if (p < 100) ctx.wait(step, 120 + Math.random() * 260);
      else ctx.wait(function(){ box.classList.add('end'); }, 450);
    })();
  }
},

{
  id:'l02', cat:'loaders', title:'Cortina de transição',
  desc:'Painéis verticais fecham, o conteúdo troca escondido, e eles abrem.',
  tags:['page transition','stagger','clip'], hint:'clique para trocar',
  html:`
    <div class="l02">
      <div class="l02-page"><b>Página A</b><span>clique no botão</span></div>
      <div class="l02-cur"><i></i><i></i><i></i><i></i><i></i></div>
      <button class="l02-go">Navegar →</button>
    </div>`,
  css:`
    .l02{position:relative;width:100%;height:100%;overflow:hidden}
    .l02-page{position:absolute;inset:0;display:grid;place-content:center;text-align:center;gap:6px;
      background:linear-gradient(140deg,#262014,#17140e)}
    .l02-page b{font-size:22px;font-weight:800;color:#eef}
    .l02-page span{font-size:12px;color:#85807a}
    .l02-cur{position:absolute;inset:0;display:flex;pointer-events:none}
    .l02-cur i{flex:1;background:#d4af37;transform:scaleY(0);transform-origin:bottom;
      transition:transform .5s cubic-bezier(.76,0,.24,1)}
    .l02.close i{transform:scaleY(1)}
    .l02.open i{transform:scaleY(0);transform-origin:top}
    .l02-cur i:nth-child(2){transition-delay:.06s}
    .l02-cur i:nth-child(3){transition-delay:.12s}
    .l02-cur i:nth-child(4){transition-delay:.18s}
    .l02-cur i:nth-child(5){transition-delay:.24s}
    .l02-go{position:absolute;left:50%;bottom:16px;translate:-50% 0;z-index:3;
      padding:9px 18px;border-radius:99px;background:#f0ede7;color:#0e0d0c;font-size:12px;font-weight:700}`,
  js:function(root,ctx){
    var box = root.querySelector('.l02'),
        page = root.querySelector('.l02-page'),
        btn = root.querySelector('.l02-go'),
        pages = [['Página A','clique no botão'],['Página B','conteúdo trocado'],['Página C','sem flash branco']],
        k = 0, busy = false;
    ctx.on(btn,'click',function(){
      if (busy) return;
      busy = true;
      box.classList.remove('open'); box.classList.add('close');
      ctx.wait(function(){
        k = (k + 1) % pages.length;
        page.innerHTML = '<b>' + pages[k][0] + '</b><span>' + pages[k][1] + '</span>';
        page.style.background = ['linear-gradient(140deg,#262014,#17140e)',
          'linear-gradient(140deg,#362540,#181310)','linear-gradient(140deg,#1e352a,#0b1f1d)'][k];
        box.classList.remove('close'); box.classList.add('open');
        ctx.wait(function(){ busy = false; }, 700);
      }, 780);
    });
  }
},

{
  id:'l03', cat:'loaders', title:'Crossfade de rota (SPA)',
  desc:'Saída e entrada sobrepostas com deslocamento oposto — padrão do Framer Motion.',
  tags:['SPA','crossfade','router'], hint:'troque as abas',
  html:`
    <div class="l03">
      <nav class="l03-nav"><button class="on">Início</button><button>Sobre</button><button>Contato</button></nav>
      <div class="l03-view">
        <section class="l03-p in"><h5>Início</h5><p>Conteúdo da home, com dois blocos entrando em cascata.</p><i></i><i></i></section>
      </div>
    </div>`,
  css:`
    .l03{width:100%;height:100%;display:flex;flex-direction:column}
    .l03-nav{display:flex;gap:4px;padding:12px 14px;border-bottom:1px solid #22222c}
    .l03-nav button{font-size:12px;padding:5px 12px;border-radius:7px;color:#8a857c;transition:.2s}
    .l03-nav button.on{background:#201e18;color:#f4f1eb}
    .l03-view{position:relative;flex:1;overflow:hidden}
    .l03-p{position:absolute;inset:0;padding:18px}
    .l03-p h5{font-size:17px;color:#eee;margin-bottom:6px}
    .l03-p p{font-size:12.5px;color:#8a857c;line-height:1.6}
    .l03-p i{display:block;height:8px;border-radius:99px;background:#201e18;margin-top:10px}
    .l03-p i:last-child{width:60%}
    .l03-p.in{animation:l03in .5s cubic-bezier(.22,1,.36,1) both}
    .l03-p.out{animation:l03out .35s cubic-bezier(.65,0,.35,1) both}
    @keyframes l03in{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
    @keyframes l03out{to{opacity:0;transform:translateY(-14px)}}`,
  js:function(root,ctx){
    var view = root.querySelector('.l03-view'),
        btns = root.querySelectorAll('.l03-nav button'),
        data = {
          'Início':'Conteúdo da home, com dois blocos entrando em cascata.',
          'Sobre':'Somos três pessoas e um gato. O gato revisa o CSS.',
          'Contato':'Responder em até 24h é meta, não promessa.'
        };
    btns.forEach(function(b){
      ctx.on(b,'click',function(){
        if (b.classList.contains('on')) return;
        btns.forEach(function(x){ x.classList.remove('on'); });
        b.classList.add('on');
        var old = view.querySelector('.l03-p');
        old.classList.remove('in'); old.classList.add('out');
        ctx.wait(function(){ old.remove(); }, 360);
        var el = document.createElement('section');
        el.className = 'l03-p in';
        el.innerHTML = '<h5>' + b.textContent + '</h5><p>' + data[b.textContent] + '</p><i></i><i></i>';
        view.appendChild(el);
      });
    });
  }
},

{
  id:'l04', cat:'loaders', title:'Skeleton shimmer',
  desc:'Placeholder com brilho atravessando — reduz a ansiedade de espera.',
  tags:['skeleton','shimmer','loading'], hint:'carrega em 2,4s',
  html:`
    <div class="l04">
      <div class="l04-sk">
        <div class="s av"></div>
        <div class="s l1"></div><div class="s l2"></div><div class="s l3"></div>
      </div>
      <div class="l04-real">
        <div class="av"></div>
        <b>Marina Duarte</b>
        <span>Diretora de arte · São Paulo</span>
        <p>Trabalha com identidade visual e motion há 9 anos.</p>
      </div>
    </div>`,
  css:`
    .l04{position:relative;width:240px;height:132px}
    .l04-sk,.l04-real{position:absolute;inset:0;padding:16px;border-radius:12px;background:#191712;border:1px solid #24211a}
    .l04-real{opacity:0;transition:opacity .45s}
    .l04.done .l04-real{opacity:1}
    .l04.done .l04-sk{opacity:0;transition:opacity .45s}
    .l04-sk .s{background:#1f1c17;border-radius:7px;position:relative;overflow:hidden}
    .l04-sk .s::after{content:"";position:absolute;inset:0;
      background:linear-gradient(90deg,transparent,rgba(255,255,255,.07),transparent);
      transform:translateX(-100%);animation:l04 1.35s ease-in-out infinite}
    .l04-sk .av{width:38px;height:38px;border-radius:50%}
    .l04-sk .l1{height:11px;width:60%;margin-top:14px}
    .l04-sk .l2{height:9px;width:80%;margin-top:9px}
    .l04-sk .l3{height:9px;width:45%;margin-top:9px}
    .l04-real .av{width:38px;height:38px;border-radius:50%;background:linear-gradient(140deg,#d4af37,#b08ac9)}
    .l04-real b{display:block;margin-top:12px;font-size:14px;color:#f4f1eb}
    .l04-real span{font-size:11.5px;color:#d4af37}
    .l04-real p{font-size:11.5px;color:#85807a;margin-top:6px;line-height:1.5}
    @keyframes l04{to{transform:translateX(100%)}}`,
  js:function(root,ctx){
    ctx.wait(function(){ root.querySelector('.l04').classList.add('done'); }, 2400);
  }
},

{
  id:'l05', cat:'loaders', title:'Seis spinners em CSS',
  desc:'Ring, dots, bars, orbit, morph e dual-ring — sem uma linha de JS.',
  tags:['spinner','keyframes','CSS only'],
  html:`
    <div class="l05">
      <div class="sp ring"></div>
      <div class="sp dots"><i></i><i></i><i></i></div>
      <div class="sp bars"><i></i><i></i><i></i><i></i></div>
      <div class="sp orbit"><i></i></div>
      <div class="sp morph"></div>
      <div class="sp dual"></div>
    </div>`,
  css:`
    .l05{display:grid;grid-template-columns:repeat(3,60px);gap:18px;place-items:center}
    .l05 .sp{width:34px;height:34px;display:grid;place-items:center}
    .ring{border:3px solid #2b2721;border-top-color:#d4af37;border-radius:50%;animation:l05spin .8s linear infinite}
    .dots{display:flex;gap:5px}
    .dots i{width:8px;height:8px;border-radius:50%;background:#b08ac9;animation:l05b .9s ease-in-out infinite}
    .dots i:nth-child(2){animation-delay:.15s}
    .dots i:nth-child(3){animation-delay:.3s}
    .bars{display:flex;gap:3px;align-items:center}
    .bars i{width:4px;height:22px;border-radius:2px;background:#5cc88f;animation:l05h .95s ease-in-out infinite}
    .bars i:nth-child(2){animation-delay:.12s}
    .bars i:nth-child(3){animation-delay:.24s}
    .bars i:nth-child(4){animation-delay:.36s}
    .orbit{border:1px dashed #302c22;border-radius:50%;animation:l05spin 2.4s linear infinite}
    .orbit i{position:absolute;width:9px;height:9px;border-radius:50%;background:#cf9b6a;margin-top:-24px}
    .morph{background:#d4af37;animation:l05m 1.6s ease-in-out infinite}
    .dual{border:3px solid transparent;border-top-color:#cf9b6a;border-bottom-color:#d4af37;border-radius:50%;
      animation:l05spin 1.1s cubic-bezier(.65,0,.35,1) infinite}
    @keyframes l05spin{to{transform:rotate(360deg)}}
    @keyframes l05b{0%,100%{transform:translateY(0);opacity:.4}50%{transform:translateY(-8px);opacity:1}}
    @keyframes l05h{0%,100%{transform:scaleY(.4)}50%{transform:scaleY(1)}}
    @keyframes l05m{0%,100%{border-radius:6px;transform:rotate(0)}
      50%{border-radius:50%;transform:rotate(180deg) scale(.7)}}`
},

{
  id:'l06', cat:'loaders', title:'Logo que se desenha',
  desc:'O traço aparece, preenche e a marca assenta no lugar.',
  tags:['SVG','stroke','fill'], hint:'clique em Replay',
  html:`
    <div class="l06">
      <svg viewBox="0 0 120 120" class="l06-s">
        <path class="p" d="M60 12 L104 90 L16 90 Z"/>
        <circle class="c" cx="60" cy="66" r="16"/>
      </svg>
      <b class="l06-n">FORMA<span>studio</span></b>
    </div>`,
  css:`
    .l06{display:flex;flex-direction:column;align-items:center;gap:14px}
    .l06-s{width:78px;height:78px;overflow:visible}
    .l06-s .p,.l06-s .c{fill:transparent;stroke:#d4af37;stroke-width:3;stroke-linejoin:round;
      stroke-dasharray:var(--l);stroke-dashoffset:var(--l);
      animation:l06d 1.5s cubic-bezier(.65,0,.35,1) forwards,l06f .8s ease 1.35s forwards}
    .l06-s .c{stroke:#b08ac9;animation-delay:.35s,1.6s}
    .l06-n{font-size:15px;font-weight:800;letter-spacing:.18em;color:#f1eee8;
      opacity:0;animation:l06t .8s cubic-bezier(.22,1,.36,1) 1.75s forwards}
    .l06-n span{display:block;font-size:9.5px;letter-spacing:.42em;color:#716d66;font-weight:400;text-align:center}
    @keyframes l06d{to{stroke-dashoffset:0}}
    @keyframes l06f{to{fill:#d4af3722}}
    @keyframes l06t{from{opacity:0;letter-spacing:.34em}to{opacity:1;letter-spacing:.18em}}`,
  js:function(root){
    root.querySelectorAll('.l06-s .p,.l06-s .c').forEach(function(p){
      p.style.setProperty('--l', p.getTotalLength());
    });
  }
},

{
  id:'l07', cat:'loaders', title:'Barra de progresso indeterminada',
  desc:'Quando você não sabe quanto falta: duas barras em fase diferente.',
  tags:['indeterminate','CSS only','loading'],
  html:`
    <div class="l07">
      <div class="l07-b"><i></i><i></i></div>
      <div class="l07-t">enviando arquivo…</div>
      <div class="l07-b thin"><i></i></div>
    </div>`,
  css:`
    .l07{width:240px}
    .l07-b{position:relative;height:4px;border-radius:9px;background:#201e18;overflow:hidden}
    .l07-b i{position:absolute;top:0;bottom:0;border-radius:9px;background:#d4af37;
      animation:l07a 2.1s cubic-bezier(.65,.81,.74,1) infinite}
    .l07-b i:nth-child(2){animation:l07b 2.1s cubic-bezier(.16,.84,.44,1) 1.15s infinite;background:#b08ac9}
    .l07-b.thin{margin-top:16px;height:2px}
    .l07-b.thin i{background:linear-gradient(90deg,transparent,#5cc88f,transparent);
      width:40%;animation:l07c 1.4s ease-in-out infinite}
    .l07-t{margin:10px 0;font-family:var(--mono);font-size:10.5px;color:#66625a}
    @keyframes l07a{0%{left:-35%;right:100%}60%,100%{left:100%;right:-90%}}
    @keyframes l07b{0%{left:-200%;right:100%}60%,100%{left:107%;right:-8%}}
    @keyframes l07c{0%{transform:translateX(-110%)}100%{transform:translateX(260%)}}`
}

);
