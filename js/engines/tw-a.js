/* ==========================================================
   TW-A · Réplica em Tailwind CSS (Play CDN) das seções
   entrada / scroll / hover / texto / loaders (57 itens).
   O estilo estático vive em utilitárias no HTML; o campo css
   guarda só keyframes, pseudo-elementos e regras de estado.
   ========================================================== */
(window.ANIMDB = window.ANIMDB || []).push(

{
  id:'e01', cat:'entrada', title:'Fade-in + slide up',
  desc:'O clássico. IntersectionObserver liga uma classe e o CSS faz o resto.',
  tags:['IntersectionObserver','CSS','transition','tailwind'], stage:'scroll', hint:'role ↓',
  html:`
    <div class="e01 p-[14px]">
      <div class="e01-sp h-[150px] flex items-center justify-center text-[#524e47] text-[12px] [font-family:var(--mono)]">role para baixo</div>
      <div class="e01-i p-5 mb-[14px] rounded-[10px] bg-[#201d18] border border-[#2a2620] text-[#d7d7e2] text-[14px] opacity-0 translate-y-[26px] [transition:opacity_.7s_cubic-bezier(.22,1,.36,1),transform_.7s_cubic-bezier(.22,1,.36,1)]">Primeiro bloco</div>
      <div class="e01-i p-5 mb-[14px] rounded-[10px] bg-[#201d18] border border-[#2a2620] text-[#d7d7e2] text-[14px] opacity-0 translate-y-[26px] [transition:opacity_.7s_cubic-bezier(.22,1,.36,1),transform_.7s_cubic-bezier(.22,1,.36,1)]">Segundo bloco</div>
      <div class="e01-i p-5 mb-[14px] rounded-[10px] bg-[#201d18] border border-[#2a2620] text-[#d7d7e2] text-[14px] opacity-0 translate-y-[26px] [transition:opacity_.7s_cubic-bezier(.22,1,.36,1),transform_.7s_cubic-bezier(.22,1,.36,1)]">Terceiro bloco</div>
      <div class="e01-sp h-[150px]"></div>
    </div>`,
  css:`
    .e01-i.in{opacity:1;transform:none}`,
  js:function(root,ctx){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ e.target.classList.toggle('in', e.isIntersecting); });
    }, { root: root.closest('.stage'), threshold: .35 });
    root.querySelectorAll('.e01-i').forEach(function(el){ io.observe(el); });
    ctx.clean(function(){ io.disconnect(); });
  }
},

{
  id:'e02', cat:'entrada', title:'Stagger em grid',
  desc:'Mesmo reveal, mas com atraso incremental por índice — o olho lê em cascata.',
  tags:['stagger','CSS var','delay','tailwind'],
  html:`<div class="e02 grid grid-cols-[repeat(3,58px)] gap-3"><i class="w-[58px] h-[58px] rounded-xl bg-[linear-gradient(140deg,#6b5a2e,#3a3120)] border border-[#7a6733] opacity-0 [transform:translateY(22px)_scale(.9)] animate-[e02in_.62s_cubic-bezier(.22,1,.36,1)_forwards] [animation-delay:calc(var(--i)*70ms)]"></i><i class="w-[58px] h-[58px] rounded-xl bg-[linear-gradient(140deg,#6b5a2e,#3a3120)] border border-[#7a6733] opacity-0 [transform:translateY(22px)_scale(.9)] animate-[e02in_.62s_cubic-bezier(.22,1,.36,1)_forwards] [animation-delay:calc(var(--i)*70ms)]"></i><i class="w-[58px] h-[58px] rounded-xl bg-[linear-gradient(140deg,#6b5a2e,#3a3120)] border border-[#7a6733] opacity-0 [transform:translateY(22px)_scale(.9)] animate-[e02in_.62s_cubic-bezier(.22,1,.36,1)_forwards] [animation-delay:calc(var(--i)*70ms)]"></i><i class="w-[58px] h-[58px] rounded-xl bg-[linear-gradient(140deg,#6b5a2e,#3a3120)] border border-[#7a6733] opacity-0 [transform:translateY(22px)_scale(.9)] animate-[e02in_.62s_cubic-bezier(.22,1,.36,1)_forwards] [animation-delay:calc(var(--i)*70ms)]"></i><i class="w-[58px] h-[58px] rounded-xl bg-[linear-gradient(140deg,#6b5a2e,#3a3120)] border border-[#7a6733] opacity-0 [transform:translateY(22px)_scale(.9)] animate-[e02in_.62s_cubic-bezier(.22,1,.36,1)_forwards] [animation-delay:calc(var(--i)*70ms)]"></i><i class="w-[58px] h-[58px] rounded-xl bg-[linear-gradient(140deg,#6b5a2e,#3a3120)] border border-[#7a6733] opacity-0 [transform:translateY(22px)_scale(.9)] animate-[e02in_.62s_cubic-bezier(.22,1,.36,1)_forwards] [animation-delay:calc(var(--i)*70ms)]"></i><i class="w-[58px] h-[58px] rounded-xl bg-[linear-gradient(140deg,#6b5a2e,#3a3120)] border border-[#7a6733] opacity-0 [transform:translateY(22px)_scale(.9)] animate-[e02in_.62s_cubic-bezier(.22,1,.36,1)_forwards] [animation-delay:calc(var(--i)*70ms)]"></i><i class="w-[58px] h-[58px] rounded-xl bg-[linear-gradient(140deg,#6b5a2e,#3a3120)] border border-[#7a6733] opacity-0 [transform:translateY(22px)_scale(.9)] animate-[e02in_.62s_cubic-bezier(.22,1,.36,1)_forwards] [animation-delay:calc(var(--i)*70ms)]"></i><i class="w-[58px] h-[58px] rounded-xl bg-[linear-gradient(140deg,#6b5a2e,#3a3120)] border border-[#7a6733] opacity-0 [transform:translateY(22px)_scale(.9)] animate-[e02in_.62s_cubic-bezier(.22,1,.36,1)_forwards] [animation-delay:calc(var(--i)*70ms)]"></i></div>`,
  css:`
    @keyframes e02in{to{opacity:1;transform:none}}`,
  js:function(root){
    root.querySelectorAll('.e02 i').forEach(function(el,i){ el.style.setProperty('--i', i); });
  }
},

{
  id:'e03', cat:'entrada', title:'Reveal por máscara',
  desc:'O texto sobe de dentro de um container com overflow:hidden. Elegante e barato.',
  tags:['overflow','mask','keyframes','tailwind'],
  html:`
    <div class="e03 text-center">
      <span class="e03-l block overflow-hidden"><b class="block text-[26px] font-extrabold tracking-[-.03em] text-[#eaeaf2] translate-y-[110%] animate-[e03up_.9s_cubic-bezier(.22,1,.36,1)_forwards]">Design</b></span>
      <span class="e03-l block overflow-hidden"><b class="block text-[26px] font-extrabold tracking-[-.03em] text-[#d4af37] translate-y-[110%] animate-[e03up_.9s_cubic-bezier(.22,1,.36,1)_forwards] [animation-delay:.12s]">em movimento</b></span>
      <span class="e03-l block overflow-hidden"><b class="block text-[15px] font-normal tracking-[-.03em] text-[#7f7a73] translate-y-[110%] animate-[e03up_.9s_cubic-bezier(.22,1,.36,1)_forwards] [animation-delay:.24s]">desde 2014</b></span>
    </div>`,
  css:`
    @keyframes e03up{to{transform:none}}`
},

{
  id:'e04', cat:'entrada', title:'Clip-path wipe',
  desc:'Três variações de recorte: cortina, círculo e diagonal.',
  tags:['clip-path','keyframes','tailwind'],
  html:`
    <div class="e04 flex flex-col gap-[10px]">
      <div class="e04-b e04-a w-[200px] px-[18px] py-[14px] rounded-[10px] text-[13px] text-[#0d0c0b] font-semibold bg-[linear-gradient(90deg,#d4af37,#b08ac9)] animate-[e04a_.9s_cubic-bezier(.76,0,.24,1)_forwards]">wipe →</div>
      <div class="e04-b e04-c w-[200px] px-[18px] py-[14px] rounded-[10px] text-[13px] text-[#0d0c0b] font-semibold bg-[linear-gradient(90deg,#d4af37,#b08ac9)] animate-[e04c_1s_cubic-bezier(.76,0,.24,1)_.15s_both]">círculo</div>
      <div class="e04-b e04-d w-[200px] px-[18px] py-[14px] rounded-[10px] text-[13px] text-[#0d0c0b] font-semibold bg-[linear-gradient(90deg,#d4af37,#b08ac9)] animate-[e04d_1s_cubic-bezier(.76,0,.24,1)_.3s_both]">diagonal</div>
    </div>`,
  css:`
    @keyframes e04a{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
    @keyframes e04c{from{clip-path:circle(0% at 50% 50%)}to{clip-path:circle(75% at 50% 50%)}}
    @keyframes e04d{from{clip-path:polygon(0 0,0 0,0 100%,0 100%)}
                    to{clip-path:polygon(0 0,100% 0,100% 100%,0 100%)}}`
},

{
  id:'e05', cat:'entrada', title:'Blur-in',
  desc:'De desfocado e transparente para nítido. Dá sensação de "foco de câmera".',
  tags:['filter','blur','transition','tailwind'],
  html:`<div class="e05 text-center animate-[e05_1.1s_cubic-bezier(.22,1,.36,1)_both]"><h4 class="text-[30px] font-extrabold tracking-[-.03em] text-[#f5f2ec]">Nitidez</h4><p class="mt-2 text-[#8f8a80] text-[13px]">o olho é atraído pelo que entra em foco</p></div>`,
  css:`
    @keyframes e05{
      from{opacity:0;filter:blur(16px);transform:scale(1.06)}
      to{opacity:1;filter:blur(0);transform:none}}`
},

{
  id:'e06', cat:'entrada', title:'Scale-in com mola',
  desc:'Curva de easing que passa do destino e volta — dá "peso" ao elemento.',
  tags:['cubic-bezier','spring','scale','tailwind'],
  html:`
    <div class="e06">
      <div class="e06-c w-[210px] p-[22px] rounded-[14px] bg-[#1d1b16] border border-[#2e2a22] text-center scale-[.86] opacity-0 animate-[e06_.72s_cubic-bezier(.34,1.56,.64,1)_.1s_forwards]"><span class="grid place-items-center w-10 h-10 mx-auto mb-[10px] rounded-full bg-[#5cc88f] text-[#062b1f] font-extrabold">✓</span><b class="block text-[14px] text-[#f0ede7]">Pedido confirmado</b><small class="text-[#7d7871] text-[12px]">chega em 3 dias</small></div>
    </div>`,
  css:`
    @keyframes e06{to{transform:none;opacity:1}}`
},

{
  id:'e07', cat:'entrada', title:'Card com rotação 3D',
  desc:'perspective + rotateX. O card "tomba" para a posição final.',
  tags:['perspective','rotateX','3D','tailwind'],
  html:`
    <div class="e07 [perspective:900px]">
      <div class="e07-c w-[210px] p-4 rounded-xl bg-[#181822] border border-[#2b2721] origin-[50%_100%] opacity-0 animate-[e07_.9s_cubic-bezier(.22,1,.36,1)_.1s_forwards]"><div class="e07-h h-16 rounded-lg bg-[linear-gradient(120deg,#3c3050,#2b2415)] mb-3"></div><b class="text-[13.5px] text-[#e6e6f0]">Relatório mensal</b><i class="block h-[7px] rounded-full bg-[#282419] mt-[9px]"></i><i class="s block h-[7px] w-[55%] rounded-full bg-[#282419] mt-[9px]"></i></div>
    </div>`,
  css:`
    @keyframes e07{from{opacity:0;transform:rotateX(-42deg) translateY(18px)}to{opacity:1;transform:none}}`
},

{
  id:'e08', cat:'entrada', title:'Reveal linha a linha',
  desc:'Quebra o parágrafo em linhas reais e revela cada uma com atraso.',
  tags:['split','lines','JS','tailwind'],
  html:`<p class="e08 max-w-[270px] text-[14px] leading-[1.75] text-[#cdc8bd] mx-auto">Tipografia animada não é enfeite: é ritmo de leitura. Ao revelar linha a linha, você controla a velocidade com que a ideia entra na cabeça de quem lê.</p>`,
  css:`
    .e08 .ln{display:block;overflow:hidden}
    .e08 .ln>span{display:block;transform:translateY(105%);opacity:0;
      animation:e08 .8s cubic-bezier(.22,1,.36,1) forwards}
    @keyframes e08{to{transform:none;opacity:1}}`,
  js:function(root){
    var p = root.querySelector('.e08');
    var words = p.textContent.trim().split(/\s+/);
    p.innerHTML = words.map(function(w){ return '<span class="w">' + w + '</span>'; }).join(' ');

    // agrupa palavras pela posição vertical → linhas reais do layout
    var lines = [], last = null;
    p.querySelectorAll('.w').forEach(function(w){
      var top = w.offsetTop;
      if (top !== last){ lines.push([]); last = top; }
      lines[lines.length-1].push(w.textContent);
    });
    p.innerHTML = lines.map(function(l,i){
      return '<span class="ln"><span style="animation-delay:'+(i*90)+'ms">'+l.join(' ')+'</span></span>';
    }).join('');
  }
},

{
  id:'e09', cat:'entrada', title:'Palavra a palavra / letra a letra',
  desc:'Split manual de texto: cada token vira um elemento com delay próprio.',
  tags:['split text','stagger','JS','tailwind'],
  html:`
    <div class="e09 text-center">
      <h4 class="text-[22px] font-extrabold tracking-[-.03em] text-[#eee]" data-split="word">Movimento com propósito</h4>
      <p class="mt-[10px] text-[13px] text-[#d4af37] [font-family:var(--mono)]" data-split="char">letra por letra</p>
    </div>`,
  css:`
    .e09 u{display:inline-block;text-decoration:none;opacity:0;transform:translateY(14px) rotate(4deg);
      animation:e09 .6s cubic-bezier(.22,1,.36,1) forwards}
    @keyframes e09{to{opacity:1;transform:none}}`,
  js:function(root){
    root.querySelectorAll('[data-split]').forEach(function(el, k){
      var mode = el.dataset.split, txt = el.textContent, out = '', d = k * 380;
      var parts = mode === 'word' ? txt.split(' ') : txt.split('');
      parts.forEach(function(p, i){
        var sep = mode === 'word' ? '&nbsp;' : '';
        out += '<u style="animation-delay:' + (d + i * (mode === 'word' ? 90 : 32)) + 'ms">' +
               (p === ' ' ? '&nbsp;' : p) + '</u>' + sep;
      });
      el.innerHTML = out;
    });
  }
},

{
  id:'e10', cat:'entrada', title:'Draw-on de SVG',
  desc:'stroke-dasharray + dashoffset animado: o traço se desenha sozinho.',
  tags:['SVG','stroke-dasharray','path','tailwind'],
  html:`
    <svg class="e10 w-[210px]" viewBox="0 0 200 120" fill="none">
      <path class="p1" d="M12 96 C 46 96, 44 24, 78 24 S 122 96, 156 96 L 188 96"
            stroke="#d4af37" stroke-width="3" stroke-linecap="round"/>
      <path class="p2" d="M12 108 L188 108" stroke="#302b24" stroke-width="2"/>
      <circle class="c" cx="78" cy="24" r="5" fill="#b08ac9"/>
    </svg>`,
  css:`
    .e10 .p1,.e10 .p2{stroke-dasharray:var(--len);stroke-dashoffset:var(--len);
      animation:e10draw 1.6s cubic-bezier(.65,0,.35,1) forwards}
    .e10 .p2{animation-duration:.9s}
    .e10 .c{opacity:0;animation:e10dot .5s ease 1.1s forwards}
    @keyframes e10draw{to{stroke-dashoffset:0}}
    @keyframes e10dot{from{opacity:0;transform:scale(0)}to{opacity:1;transform:scale(1)}}`,
  js:function(root){
    root.querySelectorAll('.e10 path').forEach(function(p){
      p.style.setProperty('--len', p.getTotalLength());
    });
  }
},

{
  id:'e11', cat:'entrada', title:'Contador numérico',
  desc:'requestAnimationFrame + easing. Nunca use setInterval para isso.',
  tags:['rAF','easing','counter','tailwind'],
  html:`
    <div class="e11 flex gap-[22px] text-center">
      <div><b class="block text-[26px] font-extrabold tracking-[-.03em] [font-variant-numeric:tabular-nums] text-[#f4f1eb]" data-to="1284">0</b><span class="text-[10.5px] uppercase tracking-[.09em] text-[#736f68]">usuários</span></div>
      <div><b class="block text-[26px] font-extrabold tracking-[-.03em] [font-variant-numeric:tabular-nums] text-[#f4f1eb]" data-to="98" data-suf="%">0</b><span class="text-[10.5px] uppercase tracking-[.09em] text-[#736f68]">satisfação</span></div>
      <div><b class="block text-[26px] font-extrabold tracking-[-.03em] [font-variant-numeric:tabular-nums] text-[#f4f1eb]" data-to="24" data-pre="R$ " data-suf="k">0</b><span class="text-[10.5px] uppercase tracking-[.09em] text-[#736f68]">receita</span></div>
    </div>`,
  js:function(root,ctx){
    root.querySelectorAll('[data-to]').forEach(function(el){
      var to = +el.dataset.to, pre = el.dataset.pre || '', suf = el.dataset.suf || '', t0 = null;
      function frame(t){
        if (!t0) t0 = t;
        var k = Math.min(1, (t - t0) / 1600);
        var e = 1 - Math.pow(1 - k, 4);            // easeOutQuart
        el.textContent = pre + Math.round(to * e).toLocaleString('pt-BR') + suf;
        if (k < 1) ctx.raf(frame);
      }
      ctx.raf(frame);
    });
  }
},

{
  id:'e12', cat:'entrada', title:'Barra de progresso / skill',
  desc:'Largura animada com delay em cascata e número acompanhando.',
  tags:['width','stagger','rAF','tailwind'],
  html:`
    <div class="e12 w-[250px] flex flex-col gap-[14px]">
      <div class="e12-r grid grid-cols-[52px_1fr_38px] items-center gap-[10px] text-[12px]" data-v="92"><span class="text-[#a09b91]">CSS</span><i class="block h-[6px] rounded-full bg-[#242019] overflow-hidden"><b class="block h-full w-0 rounded-full bg-[linear-gradient(90deg,#d4af37,#b08ac9)] [transition:width_1.3s_cubic-bezier(.22,1,.36,1)]"></b></i><em class="not-italic [font-family:var(--mono)] text-[11px] text-[#736f68] text-right">0%</em></div>
      <div class="e12-r grid grid-cols-[52px_1fr_38px] items-center gap-[10px] text-[12px]" data-v="78"><span class="text-[#a09b91]">JS</span><i class="block h-[6px] rounded-full bg-[#242019] overflow-hidden"><b class="block h-full w-0 rounded-full bg-[linear-gradient(90deg,#d4af37,#b08ac9)] [transition:width_1.3s_cubic-bezier(.22,1,.36,1)]"></b></i><em class="not-italic [font-family:var(--mono)] text-[11px] text-[#736f68] text-right">0%</em></div>
      <div class="e12-r grid grid-cols-[52px_1fr_38px] items-center gap-[10px] text-[12px]" data-v="64"><span class="text-[#a09b91]">WebGL</span><i class="block h-[6px] rounded-full bg-[#242019] overflow-hidden"><b class="block h-full w-0 rounded-full bg-[linear-gradient(90deg,#d4af37,#b08ac9)] [transition:width_1.3s_cubic-bezier(.22,1,.36,1)]"></b></i><em class="not-italic [font-family:var(--mono)] text-[11px] text-[#736f68] text-right">0%</em></div>
    </div>`,
  js:function(root,ctx){
    root.querySelectorAll('.e12-r').forEach(function(r,i){
      var v = +r.dataset.v, bar = r.querySelector('b'), num = r.querySelector('em');
      ctx.wait(function(){
        bar.style.width = v + '%';
        var t0 = null;
        function f(t){
          if (!t0) t0 = t;
          var k = Math.min(1, (t - t0) / 1300);
          num.textContent = Math.round(v * (1 - Math.pow(1 - k, 3))) + '%';
          if (k < 1) ctx.raf(f);
        }
        ctx.raf(f);
      }, 120 + i * 150);
    });
  }
},

{
  id:'s01', cat:'scroll', title:'Parallax de camadas',
  desc:'Cada camada anda numa fração da rolagem. Profundidade sem 3D.',
  tags:['parallax','transform','scroll','tailwind'], stage:'scroll', hint:'role ↓',
  html:`
    <div class="s01">
      <div class="s01-sky sticky top-0 h-[230px] overflow-hidden bg-[linear-gradient(#171309,#241d10_60%,#322817)]">
        <div class="s01-l absolute inset-0 will-change-transform" data-sp="0.15"><i class="m m1 absolute bottom-10 left-[10px] w-[150px] h-[110px] rounded-[50%_50%_0_0] bg-[#2c2718]"></i><i class="m m2 absolute bottom-10 left-[120px] w-[190px] h-[140px] rounded-[50%_50%_0_0] bg-[#262114]"></i></div>
        <div class="s01-l absolute inset-0 will-change-transform" data-sp="0.4"><i class="h h1 absolute bottom-6 left-[-20px] w-[130px] h-[70px] rounded-[50%_50%_0_0] bg-[#3d3520]"></i><i class="h h2 absolute bottom-6 right-[-10px] w-[170px] h-[70px] rounded-[50%_50%_0_0] bg-[#3d352060]"></i></div>
        <div class="s01-l absolute inset-0 will-change-transform" data-sp="0.75"><i class="t absolute bottom-0 left-0 right-0 h-[34px] bg-[#4a4028]"></i><i class="t t2 absolute bottom-0 left-0 right-0 h-[14px] bg-[#5c4f31]"></i></div>
        <h4 class="absolute left-0 right-0 top-[78px] text-center text-[30px] font-extrabold tracking-[.22em] text-[#e4dcc9] mix-blend-overlay" data-sp="-0.25">PARALLAX</h4>
      </div>
      <div class="s01-body h-[420px] py-[26px] px-5 bg-[#111010] text-[#948f86] text-[13px] leading-[1.7]">A camada mais distante se move menos. O cérebro lê isso como profundidade.</div>
    </div>`,
  js:function(root,ctx){
    var stage = root.closest('.stage');
    var layers = root.querySelectorAll('[data-sp]');
    function onScroll(){
      var y = stage.scrollTop;
      layers.forEach(function(l){
        l.style.transform = 'translate3d(0,' + (y * +l.dataset.sp) + 'px,0)';
      });
    }
    ctx.on(stage, 'scroll', onScroll, { passive:true });
    onScroll();
  }
},

{
  id:'s02', cat:'scroll', title:'Header que encolhe',
  desc:'Passou de N px, o header compacta, ganha fundo e blur.',
  tags:['sticky','scroll','header','tailwind'], stage:'scroll flush', hint:'role ↓',
  html:`
    <div class="s02 relative">
      <header class="s02-h sticky top-0 z-[5] flex items-center gap-3 px-4 py-5 bg-transparent border-b border-transparent [transition:padding_.35s_cubic-bezier(.22,1,.36,1),background_.35s,border-color_.35s,backdrop-filter_.35s]"><b class="text-[17px] tracking-[-.02em] [transition:font-size_.35s_cubic-bezier(.22,1,.36,1)]">ACME</b><nav class="flex gap-3 ml-auto text-[11.5px] text-[#908b82]"><a>Produto</a><a>Preço</a><a>Blog</a></nav><button class="text-[11.5px] px-3 py-[6px] rounded-full bg-[#d4af37] text-[#1b1813] font-semibold [transition:transform_.35s_cubic-bezier(.34,1.56,.64,1)]">Entrar</button></header>
      <div class="s02-c pt-[26px] px-[18px] pb-0 bg-[linear-gradient(#171410,#0d0d12)]">
        <h5 class="text-[16px] text-[#f1eee8] m-0 mb-2">Role para ver o header compactar</h5>
        <p class="text-[12.5px] text-[#85807a] leading-[1.7]">O truque é só uma classe alternada em um limiar de scroll — todo o resto é transition.</p>
        <div class="s02-fill h-[420px] mt-5 rounded-[10px] bg-[repeating-linear-gradient(#1c1a15_0_26px,#171510_26px_52px)]"></div>
      </div>
    </div>`,
  css:`
    .s02-h.small{padding:9px 16px;background:rgba(12,12,18,.82);border-color:#26262f;backdrop-filter:blur(10px)}
    .s02-h.small b{font-size:13.5px}
    .s02-h.small button{transform:scale(.9)}`,
  js:function(root,ctx){
    var stage = root.closest('.stage'), h = root.querySelector('.s02-h');
    ctx.on(stage, 'scroll', function(){
      h.classList.toggle('small', stage.scrollTop > 40);
    }, { passive:true });
  }
},

{
  id:'s03', cat:'scroll', title:'Barra de progresso de leitura',
  desc:'scrollTop / (scrollHeight - clientHeight). Uma linha de matemática.',
  tags:['progress','scroll','%','tailwind'], stage:'scroll flush', hint:'role ↓',
  html:`
    <div class="s03">
      <div class="s03-bar sticky top-0 z-[4] h-[3px] bg-[#1f1c17]"><i class="block h-full w-0 bg-[linear-gradient(90deg,#d4af37,#b08ac9,#cf9b6a)]"></i></div>
      <div class="s03-pct sticky top-3 float-right mr-3 z-[5] [font-family:var(--mono)] text-[10px] text-[#736f68] bg-[#171510] border border-[#282419] rounded-md px-[7px] py-[2px]">0%</div>
      <article class="px-[18px] pt-[18px] pb-10">
        <h5 class="text-[16px] text-[#f2efe9] m-0 mb-3">Como escrever para a web</h5>
        <p class="text-[13px] text-[#908b82] leading-[1.85] mb-[14px]">Parágrafos curtos. Frases diretas. O leitor decide em três segundos se continua.</p>
        <p class="text-[13px] text-[#908b82] leading-[1.85] mb-[14px]">A barra no topo é um contrato visual: ela promete que isso tem fim.</p>
        <p class="text-[13px] text-[#908b82] leading-[1.85] mb-[14px]">Quando o usuário sabe quanto falta, ele lê mais. É psicologia básica de esforço percebido.</p>
        <p class="text-[13px] text-[#908b82] leading-[1.85] mb-[14px]">Some a barra em telas curtas — indicar progresso do que não é longo só polui.</p>
        <p class="text-[13px] text-[#908b82] leading-[1.85] mb-[14px]">Fim.</p>
      </article>
    </div>`,
  js:function(root,ctx){
    var stage = root.closest('.stage'),
        bar = root.querySelector('.s03-bar i'),
        pct = root.querySelector('.s03-pct');
    function upd(){
      var max = stage.scrollHeight - stage.clientHeight;
      var k = max > 0 ? stage.scrollTop / max : 0;
      bar.style.width = (k * 100) + '%';
      pct.textContent = Math.round(k * 100) + '%';
    }
    ctx.on(stage, 'scroll', upd, { passive:true });
    upd();
  }
},

{
  id:'s04', cat:'scroll', title:'Sticky scrollytelling',
  desc:'Um painel fixo enquanto os passos passam ao lado e trocam o conteúdo.',
  tags:['sticky','IntersectionObserver','storytelling','tailwind'], stage:'scroll flush tall', hint:'role ↓',
  html:`
    <div class="s04 relative">
      <div class="s04-viz sticky top-0 h-[150px] grid place-items-center bg-[radial-gradient(60%_80%_at_50%_40%,#1d1a15,#0e0d0c)] border-b border-[#212129]"><div class="s04-shape w-[70px] h-[70px] bg-[#d4af37] rounded-lg [transition:all_.7s_cubic-bezier(.22,1,.36,1)]"></div><b class="s04-lbl absolute top-3 left-[14px] [font-family:var(--mono)] text-[11px] text-[#625e57]">01</b></div>
      <div class="s04-steps">
        <div class="s04-st min-h-[190px] px-5 py-[26px] border-b border-[#18181f] opacity-[.28] [transition:opacity_.5s]" data-i="0"><b class="text-[15px] text-[#eee]">Coleta</b><p class="text-[12.5px] text-[#8a857c] mt-[6px]">Os dados brutos chegam sem forma.</p></div>
        <div class="s04-st min-h-[190px] px-5 py-[26px] border-b border-[#18181f] opacity-[.28] [transition:opacity_.5s]" data-i="1"><b class="text-[15px] text-[#eee]">Transformação</b><p class="text-[12.5px] text-[#8a857c] mt-[6px]">Filtramos, normalizamos, agrupamos.</p></div>
        <div class="s04-st min-h-[190px] px-5 py-[26px] border-b border-[#18181f] opacity-[.28] [transition:opacity_.5s]" data-i="2"><b class="text-[15px] text-[#eee]">Entrega</b><p class="text-[12.5px] text-[#8a857c] mt-[6px]">Vira decisão em segundos.</p></div>
      </div>
    </div>`,
  css:`
    .s04[data-on="1"] .s04-shape{border-radius:50%;background:#b08ac9;transform:rotate(45deg) scale(1.15)}
    .s04[data-on="2"] .s04-shape{border-radius:14px;background:#5cc88f;transform:rotate(180deg) scale(.85)}
    .s04-st.on{opacity:1}`,
  js:function(root,ctx){
    var wrap = root.querySelector('.s04'),
        lbl  = root.querySelector('.s04-lbl'),
        io = new IntersectionObserver(function(es){
          es.forEach(function(e){
            if (e.isIntersecting){
              wrap.dataset.on = e.target.dataset.i;
              lbl.textContent = '0' + (+e.target.dataset.i + 1);
              root.querySelectorAll('.s04-st').forEach(function(s){ s.classList.remove('on'); });
              e.target.classList.add('on');
            }
          });
        }, { root: root.closest('.stage'), rootMargin:'-45% 0px -45% 0px' });
    root.querySelectorAll('.s04-st').forEach(function(s){ io.observe(s); });
    ctx.clean(function(){ io.disconnect(); });
  }
},

{
  id:'s05', cat:'scroll', title:'Scroll horizontal',
  desc:'A rolagem vertical vira deslocamento lateral dentro de uma seção presa.',
  tags:['sticky','translateX','pin','tailwind'], stage:'scroll flush', hint:'role ↓',
  html:`
    <div class="s05 h-[900px] relative">
      <div class="s05-pin sticky top-0 h-[230px] overflow-hidden flex items-center bg-[linear-gradient(120deg,#141312,#171410)]">
        <div class="s05-track flex gap-4 pl-5 will-change-transform">
          <div class="s05-card flex-none w-[150px] h-[150px] rounded-[14px] p-[14px] bg-[#1c1914] border border-[#2b2721] flex flex-col justify-between [font-family:var(--mono)] text-[11px] text-[#736f68]">01<span class="[font-family:Inter,sans-serif] text-[15px] font-semibold text-[#e8e8f2]">Briefing</span></div>
          <div class="s05-card flex-none w-[150px] h-[150px] rounded-[14px] p-[14px] bg-[#1c1914] border border-[#2b2721] flex flex-col justify-between [font-family:var(--mono)] text-[11px] text-[#736f68]">02<span class="[font-family:Inter,sans-serif] text-[15px] font-semibold text-[#e8e8f2]">Conceito</span></div>
          <div class="s05-card flex-none w-[150px] h-[150px] rounded-[14px] p-[14px] bg-[#1c1914] border border-[#2b2721] flex flex-col justify-between [font-family:var(--mono)] text-[11px] text-[#736f68]">03<span class="[font-family:Inter,sans-serif] text-[15px] font-semibold text-[#e8e8f2]">Design</span></div>
          <div class="s05-card flex-none w-[150px] h-[150px] rounded-[14px] p-[14px] bg-[#1c1914] border border-[#2b2721] flex flex-col justify-between [font-family:var(--mono)] text-[11px] text-[#736f68]">04<span class="[font-family:Inter,sans-serif] text-[15px] font-semibold text-[#e8e8f2]">Build</span></div>
          <div class="s05-card flex-none w-[150px] h-[150px] rounded-[14px] p-[14px] bg-[#1c1914] border border-[#2b2721] flex flex-col justify-between [font-family:var(--mono)] text-[11px] text-[#736f68]">05<span class="[font-family:Inter,sans-serif] text-[15px] font-semibold text-[#e8e8f2]">Deploy</span></div>
        </div>
      </div>
    </div>`,
  css:`
    .s05-card:nth-child(odd){background:linear-gradient(150deg,#2a2417,#1e1a12)}`,
  js:function(root,ctx){
    var stage = root.closest('.stage'),
        sec = root.querySelector('.s05'),
        track = root.querySelector('.s05-track');
    function upd(){
      var max = sec.offsetHeight - stage.clientHeight;
      var k = Math.min(1, Math.max(0, stage.scrollTop / max));
      var dist = track.scrollWidth - stage.clientWidth + 40;
      track.style.transform = 'translate3d(' + (-k * dist) + 'px,0,0)';
    }
    ctx.on(stage, 'scroll', upd, { passive:true });
    upd();
  }
},

{
  id:'s06', cat:'scroll', title:'Pin + scrub (estilo ScrollTrigger)',
  desc:'Progresso 0→1 da seção controla várias propriedades ao mesmo tempo.',
  tags:['scrub','progress','transform','tailwind'], stage:'scroll flush', hint:'role ↓',
  html:`
    <div class="s06 h-[820px]">
      <div class="s06-pin sticky top-0 h-[230px] grid place-items-center bg-[radial-gradient(70%_70%_at_50%_50%,#1a1712,#0d0c0b)]">
        <div class="s06-obj w-[82px] h-[82px] rounded-2xl bg-[linear-gradient(140deg,#d4af37,#b08ac9)] will-change-transform"></div>
        <div class="s06-meter absolute left-5 right-5 bottom-[18px] h-1 bg-[#22222c] rounded-[9px]"><i class="block h-full w-0 rounded-[9px] bg-[#d4af37]"></i></div>
        <b class="s06-val absolute top-[14px] right-4 [font-family:var(--mono)] text-[11px] text-[#736f68]">0.00</b>
      </div>
    </div>`,
  js:function(root,ctx){
    var stage = root.closest('.stage'),
        sec  = root.querySelector('.s06'),
        obj  = root.querySelector('.s06-obj'),
        bar  = root.querySelector('.s06-meter i'),
        val  = root.querySelector('.s06-val');
    function upd(){
      var k = Math.min(1, Math.max(0, stage.scrollTop / (sec.offsetHeight - stage.clientHeight)));
      obj.style.transform = 'rotate(' + (k * 360) + 'deg) scale(' + (1 + k * .55) + ')';
      obj.style.borderRadius = (16 + k * 34) + 'px';
      obj.style.filter = 'hue-rotate(' + (k * 160) + 'deg)';
      bar.style.width = (k * 100) + '%';
      val.textContent = k.toFixed(2);
    }
    ctx.on(stage, 'scroll', upd, { passive:true });
    upd();
  }
},

{
  id:'s07', cat:'scroll', title:'Image sequence scrubbing',
  desc:'Frames pré-renderizados num canvas, trocados pela posição do scroll (efeito Apple).',
  tags:['canvas','frames','scrub','tailwind'], stage:'scroll flush', hint:'role ↓',
  html:`
    <div class="s07 h-[1000px]">
      <div class="s07-pin sticky top-0 h-[230px] grid place-items-center bg-[#08080d]"><canvas class="s07-cv w-[210px] h-[210px]" width="420" height="420"></canvas><b class="s07-f absolute left-[14px] top-3 [font-family:var(--mono)] text-[10.5px] text-[#66625a]">frame 00</b></div>
    </div>`,
  js:function(root,ctx){
    var stage = root.closest('.stage'),
        sec = root.querySelector('.s07'),
        cv = root.querySelector('.s07-cv'),
        c = cv.getContext('2d'),
        lbl = root.querySelector('.s07-f'),
        N = 48, frames = [];

    // pré-renderiza os frames (na vida real: 48 JPGs pré-carregados)
    for (var i = 0; i < N; i++){
      var off = document.createElement('canvas');
      off.width = off.height = 420;
      drawFrame(off.getContext('2d'), i / (N - 1));
      frames.push(off);
    }
    function drawFrame(g, k){
      g.clearRect(0,0,420,420);
      var cx = 210, cy = 210, R = 120, rot = k * Math.PI * 2;
      for (var r = 0; r < 3; r++){
        g.beginPath();
        for (var a = 0; a <= 64; a++){
          var t = a / 64 * Math.PI * 2;
          var wob = Math.sin(t * 5 + rot * 2 + r) * (10 + r * 6) * (0.4 + k * .9);
          var rad = R - r * 30 + wob;
          var x = cx + Math.cos(t + rot * (1 - r * .2)) * rad;
          var y = cy + Math.sin(t + rot * (1 - r * .2)) * rad;
          a ? g.lineTo(x,y) : g.moveTo(x,y);
        }
        g.closePath();
        g.strokeStyle = ['rgba(212,175,55,.9)','rgba(176,138,201,.75)','rgba(207,155,106,.6)'][r];
        g.lineWidth = 3; g.stroke();
      }
    }
    function upd(){
      var k = Math.min(1, Math.max(0, stage.scrollTop / (sec.offsetHeight - stage.clientHeight)));
      var f = Math.min(N - 1, Math.round(k * (N - 1)));
      c.clearRect(0,0,420,420);
      c.drawImage(frames[f], 0, 0);
      lbl.textContent = 'frame ' + String(f + 1).padStart(2,'0') + '/' + N;
    }
    ctx.on(stage, 'scroll', upd, { passive:true });
    upd();
  }
},

{
  id:'s08', cat:'scroll', title:'Texto colorindo no scroll',
  desc:'Cada palavra acende quando cruza a linha do meio da viewport.',
  tags:['scroll','word','opacity','tailwind'], stage:'scroll', hint:'role ↓',
  html:`<p class="s08 px-5 py-[120px] text-[19px] font-bold leading-[1.65] tracking-[-.02em]">Boas animações não pedem atenção. Elas guiam o olho, explicam a hierarquia e desaparecem antes de virar ruído.</p>`,
  css:`
    .s08 w{color:#302b24;transition:color .35s ease}
    .s08 w.on{color:#f5f2ec}`,
  js:function(root,ctx){
    var stage = root.closest('.stage'), p = root.querySelector('.s08');
    p.innerHTML = p.textContent.trim().split(' ').map(function(w){ return '<w>'+w+'</w>'; }).join(' ');
    var words = p.querySelectorAll('w');
    function upd(){
      var mid = stage.getBoundingClientRect().top + stage.clientHeight * .62;
      words.forEach(function(w){
        w.classList.toggle('on', w.getBoundingClientRect().top < mid);
      });
    }
    ctx.on(stage,'scroll',upd,{ passive:true });
    upd();
  }
},

{
  id:'s09', cat:'scroll', title:'Stacking cards',
  desc:'Cards sticky que empilham; o de baixo encolhe conforme o próximo cobre.',
  tags:['sticky','stack','scale','tailwind'], stage:'scroll flush', hint:'role ↓',
  html:`
    <div class="s09 pt-4 px-4 pb-[60px] flex flex-col gap-[14px]">
      <div class="s09-c sticky top-[calc(14px+var(--i)*10px)] h-[120px] p-[18px] rounded-[14px] flex items-end justify-between border border-[#2f2b23] shadow-[0_10px_40px_-20px_#000] origin-[50%_0] will-change-transform bg-[linear-gradient(140deg,#262013,#171410)]" style="--i:0"><b class="text-[17px] text-[#f4f1eb]">Descoberta</b><span class="[font-family:var(--mono)] text-[11px] text-[#948f86]">01</span></div>
      <div class="s09-c sticky top-[calc(14px+var(--i)*10px)] h-[120px] p-[18px] rounded-[14px] flex items-end justify-between border border-[#2f2b23] shadow-[0_10px_40px_-20px_#000] origin-[50%_0] will-change-transform bg-[linear-gradient(140deg,#362540,#221a14)]" style="--i:1"><b class="text-[17px] text-[#f4f1eb]">Estratégia</b><span class="[font-family:var(--mono)] text-[11px] text-[#948f86]">02</span></div>
      <div class="s09-c sticky top-[calc(14px+var(--i)*10px)] h-[120px] p-[18px] rounded-[14px] flex items-end justify-between border border-[#2f2b23] shadow-[0_10px_40px_-20px_#000] origin-[50%_0] will-change-transform bg-[linear-gradient(140deg,#1e352a,#0d2422)]" style="--i:2"><b class="text-[17px] text-[#f4f1eb]">Execução</b><span class="[font-family:var(--mono)] text-[11px] text-[#948f86]">03</span></div>
      <div class="s09-c sticky top-[calc(14px+var(--i)*10px)] h-[120px] p-[18px] rounded-[14px] flex items-end justify-between border border-[#2f2b23] shadow-[0_10px_40px_-20px_#000] origin-[50%_0] will-change-transform bg-[linear-gradient(140deg,#3f2a1d,#2a1713)]" style="--i:3"><b class="text-[17px] text-[#f4f1eb]">Resultado</b><span class="[font-family:var(--mono)] text-[11px] text-[#948f86]">04</span></div>
    </div>`,
  js:function(root,ctx){
    var stage = root.closest('.stage'), cards = root.querySelectorAll('.s09-c');
    function upd(){
      var top = stage.getBoundingClientRect().top;
      cards.forEach(function(c,i){
        if (i === cards.length - 1) return;
        var next = cards[i+1].getBoundingClientRect().top - top;
        var mine = c.getBoundingClientRect().top - top;
        var over = Math.min(1, Math.max(0, (mine + 130 - next) / 130));
        c.style.transform = 'scale(' + (1 - over * .07) + ')';
        c.style.filter = 'brightness(' + (1 - over * .35) + ')';
      });
    }
    ctx.on(stage,'scroll',upd,{ passive:true });
    upd();
  }
},

{
  id:'s10', cat:'scroll', title:'Hero com zoom no scroll',
  desc:'A imagem cresce e escurece enquanto o conteúdo sobe por cima.',
  tags:['scale','sticky','overlay','tailwind'], stage:'scroll flush', hint:'role ↓',
  html:`
    <div class="s10">
      <div class="s10-pin sticky top-0 h-[230px] overflow-hidden grid place-items-center"><div class="s10-img absolute inset-0 will-change-transform bg-[radial-gradient(50%_40%_at_70%_20%,#f7d08a55,transparent_60%),linear-gradient(#211b10_0_45%,#3a3220_45%_100%)]"></div><div class="s10-sh absolute inset-0 bg-[#05050a] opacity-0"></div><h4 class="relative text-[24px] tracking-[.3em] text-white [text-shadow:0_2px_20px_#0008]">MONTANHA</h4></div>
      <div class="s10-next h-[400px] py-[28px] px-5 bg-[#0d0d13] text-[#8a857c] text-[13px] border-t border-[#22222c] relative z-[2]">Conteúdo seguinte sobe por cima do hero.</div>
    </div>`,
  css:`
    .s10-img::after{content:"";position:absolute;left:-10%;right:-10%;bottom:0;height:58%;
      background:conic-gradient(from 200deg at 50% 100%,#17150f,#3a352a,#17150f);
      clip-path:polygon(0 100%,18% 40%,32% 62%,52% 18%,72% 55%,86% 34%,100% 100%)}`,
  js:function(root,ctx){
    var stage = root.closest('.stage'),
        img = root.querySelector('.s10-img'),
        sh  = root.querySelector('.s10-sh'),
        h   = root.querySelector('h4');
    function upd(){
      var k = Math.min(1, stage.scrollTop / 230);
      img.style.transform = 'scale(' + (1 + k * .45) + ')';
      sh.style.opacity = k * .72;
      h.style.transform = 'translateY(' + (k * -40) + 'px) scale(' + (1 - k * .12) + ')';
      h.style.letterSpacing = (.3 + k * .25) + 'em';
    }
    ctx.on(stage,'scroll',upd,{ passive:true });
    upd();
  }
},

{
  id:'s11', cat:'scroll', title:'Scroll snap por seção',
  desc:'CSS puro: cada painel encaixa. Zero JavaScript.',
  tags:['scroll-snap','CSS only','tailwind'], stage:'scroll flush', hint:'role ↓',
  html:`
    <div class="s11">
      <section class="h-[230px] snap-start grid place-items-center bg-[var(--c)] text-[#ece8df] text-[17px] font-semibold tracking-[-.02em]" style="--c:#2b2618">01 · Início</section>
      <section class="h-[230px] snap-start grid place-items-center bg-[var(--c)] text-[#ece8df] text-[17px] font-semibold tracking-[-.02em]" style="--c:#362540">02 · Meio</section>
      <section class="h-[230px] snap-start grid place-items-center bg-[var(--c)] text-[#ece8df] text-[17px] font-semibold tracking-[-.02em]" style="--c:#1e352a">03 · Fim</section>
    </div>`,
  css:`
    .stage:has(.s11){scroll-snap-type:y mandatory}`
},

{
  id:'s12', cat:'scroll', title:'Cortina de seção',
  desc:'Um painel sólido sobe revelando a seção seguinte — troca de "cena".',
  tags:['clip','curtain','sticky','tailwind'], stage:'scroll flush', hint:'role ↓',
  html:`
    <div class="s12 h-[760px]">
      <div class="s12-pin sticky top-0 h-[230px] overflow-hidden">
        <div class="s12-a absolute inset-0 grid place-items-center text-[22px] font-extrabold tracking-[.18em] bg-[linear-gradient(140deg,#2e2340,#171210)] text-[#e0d3bc]">CENA A</div>
        <div class="s12-b absolute inset-0 grid place-items-center text-[22px] font-extrabold tracking-[.18em] bg-[linear-gradient(140deg,#d4af37,#5cc88f)] text-[#1b1813] [clip-path:inset(100%_0_0_0)] [will-change:clip-path]">CENA B</div>
      </div>
    </div>`,
  js:function(root,ctx){
    var stage = root.closest('.stage'),
        sec = root.querySelector('.s12'),
        b = root.querySelector('.s12-b');
    function upd(){
      var k = Math.min(1, Math.max(0, stage.scrollTop / (sec.offsetHeight - stage.clientHeight)));
      b.style.clipPath = 'inset(' + ((1 - k) * 100) + '% 0 0 0)';
    }
    ctx.on(stage,'scroll',upd,{ passive:true });
    upd();
  }
},

{
  id:'s13', cat:'scroll', title:'CSS scroll-driven (animation-timeline)',
  desc:'Sem JS: view() amarra o keyframe à entrada do elemento na viewport. Chrome/Edge 115+.',
  tags:['animation-timeline','view()','CSS only','tailwind'], stage:'scroll', hint:'role ↓',
  html:`
    <div class="s13 p-[14px]">
      <div class="s13-sp h-[140px] grid place-items-center text-[#524e47] text-[12px] [font-family:var(--mono)]">CSS puro, sem observer</div>
      <div class="s13-i p-5 mb-[14px] rounded-[10px] bg-[#201d18] border border-[#2a2620] text-[#d7d7e2] text-[14px]">Entrando…</div>
      <div class="s13-i p-5 mb-[14px] rounded-[10px] bg-[#201d18] border border-[#2a2620] text-[#d7d7e2] text-[14px]">Entrando…</div>
      <div class="s13-i p-5 mb-[14px] rounded-[10px] bg-[#201d18] border border-[#2a2620] text-[#d7d7e2] text-[14px]">Entrando…</div>
      <div class="s13-sp h-[140px]"></div>
    </div>`,
  css:`
    .s13-i{animation:s13 linear both;
      animation-timeline:view();
      animation-range:entry 5% cover 42%}
    @keyframes s13{
      from{opacity:0;transform:translateY(30px) scale(.94);filter:blur(6px)}
      to{opacity:1;transform:none;filter:blur(0)}}`
},

{
  id:'h01', cat:'hover', title:'Botão com preenchimento deslizante',
  desc:'Pseudo-elemento que entra por um lado e sai pelo outro no unhover.',
  tags:['::before','transform-origin','CSS only','tailwind'], hint:'passe o mouse',
  html:`<div class="h01 flex flex-col gap-[14px] items-center"><button class="h01-b relative overflow-hidden px-[26px] py-[13px] rounded-full border border-[#3e3931] text-[#e8e8f2] text-[13.5px] font-semibold bg-[#15151d]"><span class="relative z-[2] [transition:color_.35s]">Começar agora</span></button>
        <button class="h01-b alt relative overflow-hidden px-[26px] py-[13px] rounded-full border border-[#3e3931] text-[#e8e8f2] text-[13.5px] font-semibold bg-[#15151d]"><span class="relative z-[2] [transition:color_.35s]">De baixo pra cima</span></button></div>`,
  css:`
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
  tags:['lerp','rAF','pointer','tailwind'], hint:'aproxime o mouse',
  html:`<div class="h02 p-10"><button class="h02-b px-[30px] py-4 rounded-full bg-[linear-gradient(120deg,#d4af37,#b08ac9)] text-[#1b1813] font-bold text-[14px] will-change-transform"><b class="block will-change-transform">Magnético</b></button></div>`,
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
  tags:['scaleX','::after','CSS only','tailwind'], hint:'passe o mouse',
  html:`
    <div class="h03 flex flex-col gap-4 text-[16px] text-[#e6e6f0] font-semibold">
      <a class="l1 relative cursor-pointer w-max pb-[3px]">Da esquerda</a>
      <a class="l2 relative cursor-pointer w-max pb-[3px]">Do centro</a>
      <a class="l3 relative cursor-pointer w-max pb-[3px]">Sai e volta</a>
    </div>`,
  css:`
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
  tags:['3D','perspective','pointer','tailwind'], hint:'passe o mouse',
  html:`
    <div class="h04 [perspective:800px]">
      <div class="h04-c relative w-[190px] h-[150px] rounded-2xl overflow-hidden bg-[linear-gradient(150deg,#3a3120,#221d13)] border border-[#34301f] [transform-style:preserve-3d] [transition:transform_.5s_cubic-bezier(.22,1,.36,1)]">
        <div class="h04-gl absolute inset-[-40%] opacity-0 [transition:opacity_.3s] bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(255,255,255,.22),transparent_45%)]"></div>
        <div class="h04-in absolute inset-0 p-4 flex flex-col justify-end [transform:translateZ(34px)]"><span class="absolute top-[14px] left-4 [font-family:var(--mono)] text-[10px] text-[#d4af37] border border-[#d4af3755] rounded-[5px] px-[6px] py-[1px]">PRO</span><b class="text-[16px] text-[#f4f1eb]">Plano Studio</b><small class="text-[#908b82] text-[12px]">R$ 249 / mês</small></div>
      </div>
    </div>`,
  css:`
    .h04-c.live{transition:none}
    .h04-c:hover .h04-gl{opacity:1}`,
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
  tags:['CSS vars','radial-gradient','grupo','tailwind'], hint:'passe o mouse',
  html:`
    <div class="h05 grid grid-cols-2 gap-[10px] p-[14px]">
      <div class="h05-c relative p-4 rounded-xl bg-[#1b1915] border border-[#262219] overflow-hidden"><b class="text-[14px] text-[#f1eee8] relative">Velocidade</b><p class="text-[12px] text-[#85807a] mt-[3px] relative">LCP &lt; 1s</p></div>
      <div class="h05-c relative p-4 rounded-xl bg-[#1b1915] border border-[#262219] overflow-hidden"><b class="text-[14px] text-[#f1eee8] relative">SEO</b><p class="text-[12px] text-[#85807a] mt-[3px] relative">Schema pronto</p></div>
      <div class="h05-c relative p-4 rounded-xl bg-[#1b1915] border border-[#262219] overflow-hidden"><b class="text-[14px] text-[#f1eee8] relative">A11y</b><p class="text-[12px] text-[#85807a] mt-[3px] relative">WCAG AA</p></div>
      <div class="h05-c relative p-4 rounded-xl bg-[#1b1915] border border-[#262219] overflow-hidden"><b class="text-[14px] text-[#f1eee8] relative">Deploy</b><p class="text-[12px] text-[#85807a] mt-[3px] relative">Edge global</p></div>
    </div>`,
  css:`
    .h05-c::before{content:"";position:absolute;inset:0;opacity:0;transition:opacity .35s;
      background:radial-gradient(180px circle at var(--mx) var(--my),rgba(212,175,55,.14),transparent 60%)}
    .h05:hover .h05-c::before{opacity:1}
    .h05-c::after{content:"";position:absolute;inset:0;border-radius:12px;padding:1px;opacity:0;transition:opacity .35s;
      background:radial-gradient(180px circle at var(--mx) var(--my),rgba(212,175,55,.75),transparent 60%);
      -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
      -webkit-mask-composite:xor;mask-composite:exclude}
    .h05:hover .h05-c::after{opacity:1}`,
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
  tags:['overflow','translateY','CSS only','tailwind'], hint:'passe o mouse',
  html:`
    <div class="h06 flex flex-col gap-4 items-center">
      <button class="h06-b block px-6 py-[13px] rounded-[10px] text-[13.5px] font-semibold cursor-pointer bg-[#d4af37] text-[#1b1813]"><span class="block h-[1.35em] overflow-hidden relative"><i class="block h-[1.35em] leading-[1.35em] not-italic [transition:transform_.42s_cubic-bezier(.65,0,.35,1)]">Baixar PDF</i><i class="block h-[1.35em] leading-[1.35em] not-italic [transition:transform_.42s_cubic-bezier(.65,0,.35,1)]">Vamos lá →</i></span></button>
      <a class="h06-l block px-6 py-[13px] rounded-[10px] font-semibold cursor-pointer border border-[#34301f] text-[#e8e5df] [font-family:var(--mono)] text-[12.5px]"><span class="block h-[1.35em] overflow-hidden relative"><i class="block h-[1.35em] leading-[1.35em] not-italic [transition:transform_.42s_cubic-bezier(.65,0,.35,1)]">contato@studio.com</i><i class="block h-[1.35em] leading-[1.35em] not-italic [transition:transform_.42s_cubic-bezier(.65,0,.35,1)]">Copiar e-mail</i></span></a>
    </div>`,
  css:`
    .h06-b:hover i,.h06-l:hover i{transform:translateY(-100%)}`
},

{
  id:'h07', cat:'hover', title:'Ícones reativos',
  desc:'Rotação, pulso, "wiggle" e desenho de traço — cada um com sua curva.',
  tags:['SVG','rotate','keyframes','tailwind'], hint:'passe o mouse',
  html:`
    <div class="h07 flex gap-[14px]">
      <button class="h07-i r w-[52px] h-[52px] grid place-items-center rounded-[14px] bg-[#1c1a15] border border-[#2b2721] [transition:background_.25s,border-color_.25s,transform_.3s]"><svg class="w-[22px] h-[22px] fill-none stroke-[#ccc7bc] stroke-2 [stroke-linecap:round] [stroke-linejoin:round]" viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v6h-6"/></svg></button>
      <button class="h07-i p w-[52px] h-[52px] grid place-items-center rounded-[14px] bg-[#1c1a15] border border-[#2b2721] [transition:background_.25s,border-color_.25s,transform_.3s]"><svg class="w-[22px] h-[22px] fill-none stroke-[#ccc7bc] stroke-2 [stroke-linecap:round] [stroke-linejoin:round]" viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8z"/></svg></button>
      <button class="h07-i w w-[52px] h-[52px] grid place-items-center rounded-[14px] bg-[#1c1a15] border border-[#2b2721] [transition:background_.25s,border-color_.25s,transform_.3s]"><svg class="w-[22px] h-[22px] fill-none stroke-[#ccc7bc] stroke-2 [stroke-linecap:round] [stroke-linejoin:round]" viewBox="0 0 24 24"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg></button>
      <button class="h07-i d w-[52px] h-[52px] grid place-items-center rounded-[14px] bg-[#1c1a15] border border-[#2b2721] [transition:background_.25s,border-color_.25s,transform_.3s]"><svg class="w-[22px] h-[22px] fill-none stroke-[#ccc7bc] stroke-2 [stroke-linecap:round] [stroke-linejoin:round]" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></button>
    </div>`,
  css:`
    .h07-i:hover{background:#242019;border-color:#3d3729;transform:translateY(-3px)}
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
  tags:['overflow','scale','mask','tailwind'], hint:'passe o mouse',
  html:`
    <div class="h08 flex gap-[14px]">
      <figure class="h08-f m-0 w-[130px] rounded-xl overflow-hidden bg-[#15120f] cursor-pointer"><div class="h08-img a h-[110px] [transition:transform_.8s_cubic-bezier(.22,1,.36,1),filter_.6s] bg-[conic-gradient(from_40deg,#d4af37,#b08ac9,#cf9b6a,#d4af37)]"></div><figcaption class="px-3 py-[10px] text-[12px] text-[#aca79d] [transition:color_.3s,transform_.5s_cubic-bezier(.22,1,.36,1)]">Projeto Aurora</figcaption></figure>
      <figure class="h08-f m-0 w-[130px] rounded-xl overflow-hidden bg-[#15120f] cursor-pointer"><div class="h08-img b h-[110px] [transition:transform_.8s_cubic-bezier(.22,1,.36,1),filter_.6s] bg-[conic-gradient(from_200deg,#5cc88f,#b8871f,#b08ac9,#5cc88f)]"></div><figcaption class="px-3 py-[10px] text-[12px] text-[#aca79d] [transition:color_.3s,transform_.5s_cubic-bezier(.22,1,.36,1)]">Projeto Nebula</figcaption></figure>
    </div>`,
  css:`
    .h08-f:hover .h08-img{transform:scale(1.18) rotate(2deg);filter:saturate(1.3)}
    .h08-f:hover figcaption{color:#fff;transform:translateX(4px)}`
},

{
  id:'h09', cat:'hover', title:'Overlay com clip-path',
  desc:'A cor entra em diagonal e o texto sobe junto — hover de portfólio.',
  tags:['clip-path','overlay','stagger','tailwind'], hint:'passe o mouse',
  html:`
    <div class="h09">
      <div class="h09-c relative w-[220px] h-[150px] rounded-[14px] overflow-hidden cursor-pointer">
        <div class="h09-bg absolute inset-0 bg-[linear-gradient(140deg,#3b3320,#3a2a45)]"></div>
        <div class="h09-ov absolute inset-0 flex flex-col justify-center p-5 bg-[linear-gradient(140deg,#d4af37,#b08ac9)] [clip-path:polygon(0_100%,0_100%,0_100%,0_100%)] [transition:clip-path_.6s_cubic-bezier(.76,0,.24,1)]"><b class="text-[17px] text-[#1b1813] translate-y-[14px] opacity-0 [transition:all_.5s_cubic-bezier(.22,1,.36,1)_.12s]">Ver projeto</b><span class="text-[12px] text-[#1b1813] translate-y-[14px] opacity-0 [transition:all_.5s_cubic-bezier(.22,1,.36,1)_.2s]">Branding · 2025</span></div>
      </div>
    </div>`,
  css:`
    .h09-c:hover .h09-ov{clip-path:polygon(0 0,100% 0,100% 100%,0 100%)}
    .h09-c:hover .h09-ov b,.h09-c:hover .h09-ov span{transform:none;opacity:1}`
},

{
  id:'h10', cat:'hover', title:'Cursor customizado (dot + ring)',
  desc:'O ponto acompanha na hora; o anel chega atrasado por interpolação.',
  tags:['cursor','lerp','rAF','tailwind'], hint:'mova o mouse aqui'
  , html:`
    <div class="h10 relative w-full h-full grid place-items-center cursor-none overflow-hidden">
      <span class="h10-dot absolute top-0 left-0 rounded-full pointer-events-none [transform:translate(-100px,-100px)] w-[6px] h-[6px] bg-[#d4af37] mt-[-3px] ml-[-3px]"></span><span class="h10-ring absolute top-0 left-0 rounded-full pointer-events-none [transform:translate(-100px,-100px)] w-[34px] h-[34px] border border-[#d4af3788] mt-[-17px] ml-[-17px] [transition:width_.3s,height_.3s,margin_.3s,background_.3s]"></span>
      <p class="text-center text-[#948f86] text-[13px] leading-[2] pointer-events-none">Mova o mouse dentro deste quadro.<br><b class="h10-t text-[#f0ede7] text-[15px] pointer-events-auto">Passe por cima deste texto.</b></p>
    </div>`,
  css:`
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
  tags:['cursor','scale','label','tailwind'], hint:'passe sobre o card',
  html:`
    <div class="h11 relative w-full h-full grid place-items-center overflow-hidden">
      <div class="h11-media w-[210px] h-[140px] rounded-[14px] cursor-none grid place-items-center bg-[linear-gradient(140deg,#262013,#3a2a45)] text-[#8d8677] [font-family:var(--mono)] text-[11px] tracking-[.2em] uppercase"><span>galeria</span></div>
      <div class="h11-cur absolute top-0 left-0 w-[72px] h-[72px] mt-[-36px] ml-[-36px] rounded-full bg-[#d4af37] text-[#1b1813] grid place-items-center text-center text-[11px] font-bold leading-[1.2] pointer-events-none [transform:translate(-200px,-200px)_scale(0)] [transition:transform_.35s_cubic-bezier(.34,1.56,.64,1)]"><b>Ver<br>projeto</b></div>
    </div>`,
  css:`
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
  tags:['ripple','Material','JS','tailwind'], hint:'clique nos botões',
  html:`
    <div class="h12 flex flex-col gap-[14px] items-center">
      <button class="h12-b relative overflow-hidden px-[30px] py-[14px] rounded-[10px] bg-[#d4af37] text-[#1b1813] font-bold text-[13.5px] isolate">Clique aqui</button>
      <button class="h12-b ghost relative overflow-hidden px-[30px] py-[14px] rounded-[10px] bg-[#1d1b16] text-[#ece9e3] border border-[#34301f] font-bold text-[13.5px] isolate">E aqui também</button>
    </div>`,
  css:`
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
  tags:['@property','conic-gradient','mask','tailwind'], hint:'sempre ativo',
  html:`<div class="h13"><div class="h13-c relative w-[200px] p-6 rounded-2xl bg-[#141312] text-center"><b class="block text-[16px] text-[#f4f1eb]">Plano Pro</b><span class="text-[12px] text-[#85807a]">borda viva</span></div></div>`,
  css:`
    @property --h13a{syntax:'<angle>';initial-value:0deg;inherits:false}
    .h13-c::before{content:"";position:absolute;inset:0;border-radius:16px;padding:1.5px;
      background:conic-gradient(from var(--h13a),#d4af37,#b08ac9,#cf9b6a,#5cc88f,#d4af37);
      -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
      -webkit-mask-composite:xor;mask-composite:exclude;
      animation:h13spin 4s linear infinite}
    .h13-c::after{content:"";position:absolute;inset:-2px;border-radius:18px;z-index:-1;filter:blur(14px);opacity:.5;
      background:conic-gradient(from var(--h13a),#d4af37,#b08ac9,#cf9b6a,#5cc88f,#d4af37);
      animation:h13spin 4s linear infinite}
    @keyframes h13spin{to{--h13a:360deg}}`
},

{
  id:'h14', cat:'hover', title:'Shine / varredura de luz',
  desc:'Um gradiente inclinado atravessa a superfície no hover.',
  tags:['skew','gradient','CSS only','tailwind'], hint:'passe o mouse',
  html:`
    <div class="h14 flex flex-col gap-4 items-center">
      <div class="h14-c relative overflow-hidden w-[210px] h-[120px] rounded-[14px] p-[18px] bg-[linear-gradient(140deg,#22201a,#0d0d13)] border border-[#302c24] flex flex-col justify-between"><b class="text-[14px] text-[#f2efe9]">Cartão Black</b><span class="[font-family:var(--mono)] text-[12px] text-[#85807a]">•••• 4429</span></div>
      <button class="h14-b relative overflow-hidden px-[26px] py-3 rounded-[10px] bg-[#d4af37] text-[#1b1813] font-bold text-[13px]">Assinar</button>
    </div>`,
  css:`
    .h14-c::after,.h14-b::after{content:"";position:absolute;top:0;bottom:0;width:60%;left:-90%;
      background:linear-gradient(100deg,transparent,rgba(255,255,255,.35),transparent);
      transform:skewX(-22deg);transition:left .75s cubic-bezier(.65,0,.35,1)}
    .h14-c:hover::after,.h14-b:hover::after{left:130%}`
},

{
  id:'h15', cat:'hover', title:'Tooltip com origem correta',
  desc:'transform-origin no lado certo evita a sensação de "pipoco" aleatório.',
  tags:['tooltip','transform-origin','delay','tailwind'], hint:'passe o mouse',
  html:`
    <div class="h15 flex gap-3 items-center">
      <span class="h15-t relative px-[14px] py-[9px] rounded-[9px] bg-[#1d1b16] border border-[#2f2b23] text-[12.5px] text-[#cdc8bd] cursor-default" data-tip="Aparece de baixo">topo</span>
      <span class="h15-t b relative px-[14px] py-[9px] rounded-[9px] bg-[#1d1b16] border border-[#2f2b23] text-[12.5px] text-[#cdc8bd] cursor-default" data-tip="Aparece de cima">base</span>
      <span class="h15-t r relative px-[14px] py-[9px] rounded-[9px] bg-[#1d1b16] border border-[#2f2b23] text-[12.5px] text-[#cdc8bd] cursor-default" data-tip="Aparece da esquerda">direita</span>
    </div>`,
  css:`
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
},

{
  id:'t01', cat:'texto', title:'Typewriter',
  desc:'Digita, pausa, apaga, troca de frase. Cursor piscando em CSS.',
  tags:['typing','setTimeout','loop','tailwind'],
  html:`<div class="t01 text-[18px] font-semibold text-[#dededf] flex items-center tracking-[-.01em]"><span>Eu construo </span><b class="t01-w text-[#d4af37]"></b><i class="t01-c w-[2px] h-5 bg-[#d4af37] ml-[3px] animate-[t01_.9s_steps(1)_infinite]"></i></div>`,
  css:`
    @keyframes t01{0%,49%{opacity:1}50%,100%{opacity:0}}`,
  js:function(root,ctx){
    var el = root.querySelector('.t01-w');
    var words = ['interfaces.','micro-interações.','sites rápidos.','coisas que se movem.'];
    var w = 0, i = 0, del = false;
    (function step(){
      var full = words[w];
      i += del ? -1 : 1;
      el.textContent = full.slice(0, i);
      var wait = del ? 45 : 85;
      if (!del && i === full.length){ del = true; wait = 1400; }
      else if (del && i === 0){ del = false; w = (w + 1) % words.length; wait = 250; }
      ctx.wait(step, wait);
    })();
  }
},

{
  id:'t02', cat:'texto', title:'Palavras rotativas',
  desc:'A headline fica; só o substantivo troca, com a caixa acompanhando a largura.',
  tags:['rotate','width','transition','tailwind'],
  html:`
    <div class="t02">
      <h4 class="text-[21px] font-extrabold tracking-[-.03em] text-[#eee] flex gap-2 items-center">Feito para <span class="t02-box relative inline-block h-[1.3em] overflow-hidden [transition:width_.5s_cubic-bezier(.22,1,.36,1)]"><i class="on absolute left-0 top-0 not-italic whitespace-nowrap text-[#b08ac9] translate-y-[110%] opacity-0 [transition:transform_.55s_cubic-bezier(.22,1,.36,1),opacity_.4s]">designers</i><i class="absolute left-0 top-0 not-italic whitespace-nowrap text-[#b08ac9] translate-y-[110%] opacity-0 [transition:transform_.55s_cubic-bezier(.22,1,.36,1),opacity_.4s]">devs</i><i class="absolute left-0 top-0 not-italic whitespace-nowrap text-[#b08ac9] translate-y-[110%] opacity-0 [transition:transform_.55s_cubic-bezier(.22,1,.36,1),opacity_.4s]">agências</i><i class="absolute left-0 top-0 not-italic whitespace-nowrap text-[#b08ac9] translate-y-[110%] opacity-0 [transition:transform_.55s_cubic-bezier(.22,1,.36,1),opacity_.4s]">startups</i></span></h4>
    </div>`,
  css:`
    .t02-box i.on{transform:none;opacity:1}
    .t02-box i.out{transform:translateY(-110%);opacity:0}`,
  js:function(root,ctx){
    var box = root.querySelector('.t02-box'),
        items = box.querySelectorAll('i'), k = 0;
    function setW(){ box.style.width = items[k].offsetWidth + 'px'; }
    setW();
    ctx.every(function(){
      items[k].classList.remove('on'); items[k].classList.add('out');
      var prev = items[k];
      k = (k + 1) % items.length;
      items[k].classList.remove('out');
      items[k].classList.add('on');
      setW();
      ctx.wait(function(){ prev.classList.remove('out'); }, 600);
    }, 1900);
  }
},

{
  id:'t03', cat:'texto', title:'Scramble / decrypt',
  desc:'Letras aleatórias que se resolvem da esquerda para a direita.',
  tags:['scramble','rAF','hover','tailwind'], hint:'passe o mouse',
  html:`<div class="t03 text-center"><b class="t03-t [font-family:var(--mono)] text-[19px] font-medium text-[#5cc88f] tracking-[.04em] cursor-pointer" data-v="DESCRIPTOGRAFANDO">DESCRIPTOGRAFANDO</b><small class="block mt-[10px] text-[11px] text-[#66625a]">hover para rodar de novo</small></div>`,
  js:function(root,ctx){
    var el = root.querySelector('.t03-t'),
        target = el.dataset.v,
        chars = '!<>-_\\\\/[]{}—=+*^?#01';
    function run(){
      var frame = 0, queue = [];
      for (var i = 0; i < target.length; i++){
        queue.push({ to:target[i], start:Math.floor(Math.random()*18), end:Math.floor(Math.random()*18)+18 });
      }
      function tick(){
        var out = '', done = 0;
        queue.forEach(function(q){
          if (frame >= q.end){ done++; out += q.to; }
          else if (frame >= q.start){
            if (!q.c || Math.random() < .3) q.c = chars[Math.floor(Math.random()*chars.length)];
            out += '<span style="color:#d4af37">' + q.c + '</span>';
          } else out += ' ';
        });
        el.innerHTML = out;
        frame++;
        if (done < queue.length) ctx.raf(tick);
      }
      tick();
    }
    run();
    ctx.on(el,'mouseenter',run);
  }
},

{
  id:'t04', cat:'texto', title:'Gradiente animado no texto',
  desc:'background-clip:text com o gradiente deslizando — e uma versão "aurora".',
  tags:['background-clip','gradient','CSS only','tailwind'],
  html:`<div class="t04 text-center flex flex-col gap-3"><h4 class="a text-[26px] font-extrabold tracking-[-.03em] [-webkit-background-clip:text] bg-clip-text text-transparent bg-[linear-gradient(90deg,#d4af37,#b08ac9,#cf9b6a,#d4af37)] [background-size:220%_100%] animate-[t04slide_3.4s_linear_infinite]">GRADIENTE VIVO</h4><h4 class="b text-[20px] italic font-extrabold tracking-[-.03em] [-webkit-background-clip:text] bg-clip-text text-transparent bg-[radial-gradient(60%_120%_at_20%_0%,#5cc88f,transparent_60%),radial-gradient(60%_120%_at_80%_100%,#b8871f,transparent_60%),linear-gradient(90deg,#b08ac9,#cf9b6a)] [background-size:180%_180%] animate-[t04aur_6s_ease-in-out_infinite_alternate]">aurora boreal</h4></div>`,
  css:`
    @keyframes t04slide{to{background-position:220% 0}}
    @keyframes t04aur{from{background-position:0% 50%}to{background-position:100% 50%}}`
},

{
  id:'t05', cat:'texto', title:'Marquee infinito',
  desc:'Conteúdo duplicado + translateX de -50%: loop sem emenda. Pausa no hover.',
  tags:['marquee','loop','CSS only','tailwind'], hint:'passe o mouse p/ pausar',
  html:`
    <div class="t05 w-full flex flex-col gap-[14px] [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <div class="t05-row overflow-hidden"><div class="t05-tr flex gap-[22px] w-max animate-[t05_14s_linear_infinite]"><span>DESIGN</span><span>·</span><span>MOTION</span><span>·</span><span>CODE</span><span>·</span><span>DESIGN</span><span>·</span><span>MOTION</span><span>·</span><span>CODE</span><span>·</span></div></div>
      <div class="t05-row rev overflow-hidden"><div class="t05-tr flex gap-[22px] w-max animate-[t05_19s_linear_infinite] [animation-direction:reverse]"><span>2025</span><span>◆</span><span>SÃO PAULO</span><span>◆</span><span>REMOTO</span><span>◆</span><span>2025</span><span>◆</span><span>SÃO PAULO</span><span>◆</span><span>REMOTO</span><span>◆</span></div></div>
    </div>`,
  css:`
    .t05:hover .t05-tr{animation-play-state:paused}
    .t05-tr span{font-size:20px;font-weight:800;letter-spacing:-.02em;color:#2e2a22;white-space:nowrap}
    .t05-row.rev span{font-size:13px;font-family:var(--mono);font-weight:400;color:#d4af3799}
    @keyframes t05{to{transform:translateX(-50%)}}`
},

{
  id:'t06', cat:'texto', title:'Marquee que reage ao scroll',
  desc:'A velocidade base soma o delta da rolagem — e a direção inverte junto.',
  tags:['scroll','velocity','rAF','tailwind'], stage:'scroll flush', hint:'role ↓ rápido',
  html:`
    <div class="t06 h-[900px] bg-[linear-gradient(#0e0d0c,#1a1814)]">
      <div class="t06-pin sticky top-0 h-[230px] grid place-items-center overflow-hidden"><div class="t06-tr flex w-max will-change-transform"><span class="text-[30px] font-extrabold tracking-[-.03em] text-[#d4af37] whitespace-nowrap">VELOCIDADE&nbsp;·&nbsp;INÉRCIA&nbsp;·&nbsp;RITMO&nbsp;·&nbsp;</span><span class="text-[30px] font-extrabold tracking-[-.03em] text-[#d4af37] whitespace-nowrap">VELOCIDADE&nbsp;·&nbsp;INÉRCIA&nbsp;·&nbsp;RITMO&nbsp;·&nbsp;</span></div></div>
    </div>`,
  js:function(root,ctx){
    var stage = root.closest('.stage'), tr = root.querySelector('.t06-tr');
    var x = 0, last = stage.scrollTop, vel = 0, half = 0;
    ctx.on(stage,'scroll',function(){
      vel += (stage.scrollTop - last) * .9;
      last = stage.scrollTop;
    },{ passive:true });
    ctx.loop(function(){
      if (!half) half = tr.scrollWidth / 2;
      vel *= .92;
      x -= 0.9 + vel * .1;
      if (half){ if (x <= -half) x += half; if (x > 0) x -= half; }
      tr.style.transform = 'translate3d(' + x.toFixed(2) + 'px,0,0) skewX(' + Math.max(-14, Math.min(14, -vel*.25)) + 'deg)';
    });
  }
},

{
  id:'t07', cat:'texto', title:'Texto em curva (textPath)',
  desc:'SVG textPath num círculo, girando devagar. Selo clássico.',
  tags:['SVG','textPath','rotate','tailwind'],
  html:`
    <div class="t07 relative w-[180px] h-[180px] grid place-items-center">
      <svg viewBox="0 0 200 200" class="t07-s w-[180px] h-[180px] animate-[t07_18s_linear_infinite]">
        <defs><path id="t07p" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0"/></defs>
        <text class="[font-family:var(--mono)] text-[12.5px] tracking-[.14em] fill-[#b08ac9]"><textPath href="#t07p" startOffset="0">DISPONÍVEL PARA PROJETOS · 2025 · DISPONÍVEL PARA PROJETOS · 2025 · </textPath></text>
      </svg>
      <div class="t07-mid absolute w-14 h-14 rounded-full bg-[#d4af37] text-[#1b1813] grid place-items-center text-[22px] font-bold animate-[t07b_2.4s_ease-in-out_infinite]">↓</div>
    </div>`,
  css:`
    @keyframes t07{to{transform:rotate(360deg)}}
    @keyframes t07b{0%,100%{transform:translateY(-3px)}50%{transform:translateY(3px)}}`
},

{
  id:'t08', cat:'texto', title:'Glitch',
  desc:'Duas cópias em ciano e magenta deslocadas com clip-path pulando.',
  tags:['glitch','clip-path','::before','tailwind'], hint:'passe o mouse',
  html:`<div class="t08"><b class="t08-t relative [font-family:var(--mono)] text-[24px] font-semibold text-[#f0ede7] tracking-[.02em] cursor-pointer inline-block" data-t="SYSTEM_ERROR">SYSTEM_ERROR</b></div>`,
  css:`
    .t08-t::before,.t08-t::after{content:attr(data-t);position:absolute;left:0;top:0;width:100%;overflow:hidden}
    .t08-t::before{color:#0ff;clip-path:inset(0 0 65% 0);transform:translate(-2px,-1px);opacity:.85}
    .t08-t::after{color:#f0f;clip-path:inset(70% 0 0 0);transform:translate(2px,1px);opacity:.85}
    .t08-t:hover::before{animation:t08a .42s steps(2) infinite}
    .t08-t:hover::after{animation:t08b .42s steps(2) infinite}
    .t08-t:hover{animation:t08c .42s steps(3) infinite}
    @keyframes t08a{0%{clip-path:inset(0 0 78% 0);transform:translate(-4px,-1px)}
      50%{clip-path:inset(28% 0 40% 0);transform:translate(4px,1px)}
      100%{clip-path:inset(66% 0 8% 0);transform:translate(-3px,0)}}
    @keyframes t08b{0%{clip-path:inset(72% 0 0 0);transform:translate(4px,1px)}
      50%{clip-path:inset(38% 0 34% 0);transform:translate(-4px,-1px)}
      100%{clip-path:inset(6% 0 74% 0);transform:translate(3px,0)}}
    @keyframes t08c{0%,100%{transform:none}50%{transform:translateX(1px)}}`
},

{
  id:'t09', cat:'texto', title:'Contorno → preenchido',
  desc:'-webkit-text-stroke com o fill entrando por background-size.',
  tags:['text-stroke','background-size','hover','tailwind'], hint:'passe o mouse',
  html:`
    <div class="t09 flex flex-col gap-2 text-center">
      <b class="t09-a text-[30px] font-extrabold tracking-[-.02em] cursor-pointer [-webkit-text-stroke:1.4px_#d4af37] text-transparent bg-[linear-gradient(#d4af37,#d4af37)] bg-no-repeat [-webkit-background-clip:text] bg-clip-text [background-size:0%_100%] [background-position:left_center] [transition:background-size_.6s_cubic-bezier(.65,0,.35,1)]">PREENCHER</b>
      <b class="t09-b text-[30px] font-extrabold tracking-[-.02em] cursor-pointer [-webkit-text-stroke:1.4px_#cf9b6a] text-transparent bg-[linear-gradient(#cf9b6a,#cf9b6a)] bg-no-repeat [-webkit-background-clip:text] bg-clip-text [background-size:100%_0%] [background-position:left_bottom] [transition:background-size_.6s_cubic-bezier(.65,0,.35,1)]">DE BAIXO</b>
    </div>`,
  css:`
    .t09-a:hover{background-size:100% 100%}
    .t09-b:hover{background-size:100% 100%}`
},

{
  id:'t10', cat:'texto', title:'Headline em três tempos',
  desc:'Máscara + escala + peso variável entrando em ordem — abertura de página.',
  tags:['composição','stagger','letter-spacing','tailwind'],
  html:`
    <div class="t10 text-center px-4">
      <span class="t10-k inline-block [font-family:var(--mono)] text-[10px] tracking-[.22em] uppercase text-[#d4af37] opacity-0 animate-[t10f_.7s_cubic-bezier(.22,1,.36,1)_.05s_forwards]">estúdio independente</span>
      <h4 class="mt-3 text-[25px] font-extrabold tracking-[-.04em] text-[#f5f2ec]"><span class="m block overflow-hidden"><i class="block not-italic translate-y-[105%] animate-[t10u_.95s_cubic-bezier(.22,1,.36,1)_forwards] [animation-delay:.2s]">Fazemos marcas</i></span><span class="m block overflow-hidden"><i class="block not-italic translate-y-[105%] text-[#b08ac9] animate-[t10u_.95s_cubic-bezier(.22,1,.36,1)_forwards] [animation-delay:.32s]">se moverem.</i></span></h4>
      <div class="t10-cta mt-[18px] flex gap-3 items-center justify-center opacity-0 animate-[t10f_.8s_cubic-bezier(.22,1,.36,1)_.75s_forwards]"><button class="px-[18px] py-[9px] rounded-full bg-[#f0ede7] text-[#0d0c0b] text-[12.5px] font-bold">Ver trabalhos</button><span class="text-[11.5px] text-[#726e67]">desde 2014</span></div>
    </div>`,
  css:`
    @keyframes t10u{to{transform:none}}
    @keyframes t10f{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}`
},

{
  id:'l01', cat:'loaders', title:'Preloader com porcentagem',
  desc:'Progresso falso com passos irregulares — parece mais "real" que linear.',
  tags:['loader','counter','rAF','tailwind'], hint:'clique em Replay',
  html:`
    <div class="l01 w-[230px] text-center relative">
      <div class="l01-num text-[44px] font-extrabold tracking-[-.04em] text-[#f4f1eb] [font-variant-numeric:tabular-nums]">0<small class="text-[16px] text-[#66625a] ml-[2px]">%</small></div>
      <div class="l01-bar h-[3px] bg-[#22201a] rounded-[9px] overflow-hidden mt-3 mb-[10px]"><i class="block h-full w-0 bg-[linear-gradient(90deg,#d4af37,#b08ac9)]"></i></div>
      <div class="l01-lbl [font-family:var(--mono)] text-[10.5px] text-[#66625a] tracking-[.06em]">carregando assets…</div>
      <div class="l01-done absolute inset-0 grid place-items-center text-[20px] font-bold text-[#5cc88f] opacity-0 scale-[.9] [transition:all_.5s_cubic-bezier(.34,1.56,.64,1)]">pronto ✦</div>
    </div>`,
  css:`
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
  tags:['page transition','stagger','clip','tailwind'], hint:'clique para trocar',
  html:`
    <div class="l02 relative w-full h-full overflow-hidden">
      <div class="l02-page absolute inset-0 grid place-content-center text-center gap-[6px] bg-[linear-gradient(140deg,#262014,#17140e)]"><b>Página A</b><span>clique no botão</span></div>
      <div class="l02-cur absolute inset-0 flex pointer-events-none"><i></i><i></i><i></i><i></i><i></i></div>
      <button class="l02-go absolute left-1/2 bottom-4 [translate:-50%_0] z-[3] px-[18px] py-[9px] rounded-full bg-[#f0ede7] text-[#0e0d0c] text-[12px] font-bold">Navegar →</button>
    </div>`,
  css:`
    .l02-page b{font-size:22px;font-weight:800;color:#eef}
    .l02-page span{font-size:12px;color:#85807a}
    .l02-cur i{flex:1;background:#d4af37;transform:scaleY(0);transform-origin:bottom;
      transition:transform .5s cubic-bezier(.76,0,.24,1)}
    .l02.close i{transform:scaleY(1)}
    .l02.open i{transform:scaleY(0);transform-origin:top}
    .l02-cur i:nth-child(2){transition-delay:.06s}
    .l02-cur i:nth-child(3){transition-delay:.12s}
    .l02-cur i:nth-child(4){transition-delay:.18s}
    .l02-cur i:nth-child(5){transition-delay:.24s}`,
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
  tags:['SPA','crossfade','router','tailwind'], hint:'troque as abas',
  html:`
    <div class="l03 w-full h-full flex flex-col">
      <nav class="l03-nav flex gap-1 px-[14px] py-3 border-b border-[#22222c]"><button class="on text-[12px] px-3 py-[5px] rounded-[7px] text-[#8a857c] [transition:all_.2s]">Início</button><button class="text-[12px] px-3 py-[5px] rounded-[7px] text-[#8a857c] [transition:all_.2s]">Sobre</button><button class="text-[12px] px-3 py-[5px] rounded-[7px] text-[#8a857c] [transition:all_.2s]">Contato</button></nav>
      <div class="l03-view relative flex-1 overflow-hidden">
        <section class="l03-p in"><h5>Início</h5><p>Conteúdo da home, com dois blocos entrando em cascata.</p><i></i><i></i></section>
      </div>
    </div>`,
  css:`
    .l03-nav button.on{background:#201e18;color:#f4f1eb}
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
  tags:['skeleton','shimmer','loading','tailwind'], hint:'carrega em 2,4s',
  html:`
    <div class="l04 relative w-[240px] h-[132px]">
      <div class="l04-sk absolute inset-0 p-4 rounded-xl bg-[#191712] border border-[#24211a]">
        <div class="s av w-[38px] h-[38px] rounded-full bg-[#1f1c17] relative overflow-hidden"></div>
        <div class="s l1 h-[11px] w-[60%] mt-[14px] rounded-[7px] bg-[#1f1c17] relative overflow-hidden"></div><div class="s l2 h-[9px] w-[80%] mt-[9px] rounded-[7px] bg-[#1f1c17] relative overflow-hidden"></div><div class="s l3 h-[9px] w-[45%] mt-[9px] rounded-[7px] bg-[#1f1c17] relative overflow-hidden"></div>
      </div>
      <div class="l04-real absolute inset-0 p-4 rounded-xl bg-[#191712] border border-[#24211a] opacity-0 [transition:opacity_.45s]">
        <div class="av w-[38px] h-[38px] rounded-full bg-[linear-gradient(140deg,#d4af37,#b08ac9)]"></div>
        <b class="block mt-3 text-[14px] text-[#f4f1eb]">Marina Duarte</b>
        <span class="text-[11.5px] text-[#d4af37]">Diretora de arte · São Paulo</span>
        <p class="text-[11.5px] text-[#85807a] mt-[6px] leading-[1.5]">Trabalha com identidade visual e motion há 9 anos.</p>
      </div>
    </div>`,
  css:`
    .l04.done .l04-real{opacity:1}
    .l04.done .l04-sk{opacity:0;transition:opacity .45s}
    .l04-sk .s::after{content:"";position:absolute;inset:0;
      background:linear-gradient(90deg,transparent,rgba(255,255,255,.07),transparent);
      transform:translateX(-100%);animation:l04 1.35s ease-in-out infinite}
    @keyframes l04{to{transform:translateX(100%)}}`,
  js:function(root,ctx){
    ctx.wait(function(){ root.querySelector('.l04').classList.add('done'); }, 2400);
  }
},

{
  id:'l05', cat:'loaders', title:'Seis spinners em CSS',
  desc:'Ring, dots, bars, orbit, morph e dual-ring — sem uma linha de JS.',
  tags:['spinner','keyframes','CSS only','tailwind'],
  html:`
    <div class="l05 grid grid-cols-[repeat(3,60px)] gap-[18px] place-items-center">
      <div class="sp sring w-[34px] h-[34px] grid place-items-center"></div>
      <div class="sp dots w-[34px] h-[34px]"><i></i><i></i><i></i></div>
      <div class="sp bars w-[34px] h-[34px]"><i></i><i></i><i></i><i></i></div>
      <div class="sp orbit w-[34px] h-[34px] grid place-items-center"><i></i></div>
      <div class="sp morph w-[34px] h-[34px]"></div>
      <div class="sp dual w-[34px] h-[34px] grid place-items-center"></div>
    </div>`,
  css:`
    .sring{border:3px solid #2b2721;border-top-color:#d4af37;border-radius:50%;animation:l05spin .8s linear infinite}
    .dots{display:flex;gap:5px;align-items:center;justify-content:center}
    .dots i{width:8px;height:8px;border-radius:50%;background:#b08ac9;animation:l05b .9s ease-in-out infinite}
    .dots i:nth-child(2){animation-delay:.15s}
    .dots i:nth-child(3){animation-delay:.3s}
    .bars{display:flex;gap:3px;align-items:center;justify-content:center}
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
  tags:['SVG','stroke','fill','tailwind'], hint:'clique em Replay',
  html:`
    <div class="l06 flex flex-col items-center gap-[14px]">
      <svg viewBox="0 0 120 120" class="l06-s w-[78px] h-[78px] overflow-visible">
        <path class="p" d="M60 12 L104 90 L16 90 Z"/>
        <circle class="c" cx="60" cy="66" r="16"/>
      </svg>
      <b class="l06-n text-[15px] font-extrabold tracking-[.18em] text-[#f1eee8] opacity-0 animate-[l06t_.8s_cubic-bezier(.22,1,.36,1)_1.75s_forwards]">FORMA<span class="block text-[9.5px] tracking-[.42em] text-[#716d66] font-normal text-center">studio</span></b>
    </div>`,
  css:`
    .l06-s .p,.l06-s .c{fill:transparent;stroke:#d4af37;stroke-width:3;stroke-linejoin:round;
      stroke-dasharray:var(--l);stroke-dashoffset:var(--l);
      animation:l06d 1.5s cubic-bezier(.65,0,.35,1) forwards,l06f .8s ease 1.35s forwards}
    .l06-s .c{stroke:#b08ac9;animation-delay:.35s,1.6s}
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
  tags:['indeterminate','CSS only','loading','tailwind'],
  html:`
    <div class="l07 w-[240px]">
      <div class="l07-b relative h-1 rounded-[9px] bg-[#201e18] overflow-hidden"><i></i><i></i></div>
      <div class="l07-t my-[10px] [font-family:var(--mono)] text-[10.5px] text-[#66625a]">enviando arquivo…</div>
      <div class="l07-b thin relative h-[2px] mt-4 rounded-[9px] bg-[#201e18] overflow-hidden"><i></i></div>
    </div>`,
  css:`
    .l07-b i{position:absolute;top:0;bottom:0;border-radius:9px;background:#d4af37;
      animation:l07a 2.1s cubic-bezier(.65,.81,.74,1) infinite}
    .l07-b i:nth-child(2){animation:l07b 2.1s cubic-bezier(.16,.84,.44,1) 1.15s infinite;background:#b08ac9}
    .l07-b.thin i{background:linear-gradient(90deg,transparent,#5cc88f,transparent);
      width:40%;animation:l07c 1.4s ease-in-out infinite}
    @keyframes l07a{0%{left:-35%;right:100%}60%,100%{left:100%;right:-90%}}
    @keyframes l07b{0%{left:-200%;right:100%}60%,100%{left:107%;right:-8%}}
    @keyframes l07c{0%{transform:translateX(-110%)}100%{transform:translateX(260%)}}`
}

);
