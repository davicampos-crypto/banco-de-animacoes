/* ==========================================================
   01 · ENTRADA / REVEAL
   ========================================================== */
(window.ANIMDB = window.ANIMDB || []).push(

{
  id:'e01', cat:'entrada', title:'Fade-in + slide up',
  desc:'O clássico. IntersectionObserver liga uma classe e o CSS faz o resto.',
  tags:['IntersectionObserver','CSS','transition'], stage:'scroll', hint:'role ↓',
  html:`
    <div class="e01">
      <div class="e01-sp">role para baixo</div>
      <div class="e01-i">Primeiro bloco</div>
      <div class="e01-i">Segundo bloco</div>
      <div class="e01-i">Terceiro bloco</div>
      <div class="e01-sp"></div>
    </div>`,
  css:`
    .e01{padding:14px}
    .e01-sp{height:150px;display:flex;align-items:center;justify-content:center;
      color:#524e47;font-size:12px;font-family:var(--mono)}
    .e01-i{padding:20px;margin-bottom:14px;border-radius:10px;
      background:#201d18;border:1px solid #2a2620;color:#d7d7e2;font-size:14px;
      opacity:0;transform:translateY(26px);
      transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
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
  tags:['stagger','CSS var','delay'],
  html:`<div class="e02"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>`,
  css:`
    .e02{display:grid;grid-template-columns:repeat(3,58px);gap:12px}
    .e02 i{width:58px;height:58px;border-radius:12px;
      background:linear-gradient(140deg,#6b5a2e,#3a3120);border:1px solid #7a6733;
      opacity:0;transform:translateY(22px) scale(.9);
      animation:e02in .62s cubic-bezier(.22,1,.36,1) forwards;
      animation-delay:calc(var(--i) * 70ms)}
    @keyframes e02in{to{opacity:1;transform:none}}`,
  js:function(root){
    root.querySelectorAll('.e02 i').forEach(function(el,i){ el.style.setProperty('--i', i); });
  }
},

{
  id:'e03', cat:'entrada', title:'Reveal por máscara',
  desc:'O texto sobe de dentro de um container com overflow:hidden. Elegante e barato.',
  tags:['overflow','mask','keyframes'],
  html:`
    <div class="e03">
      <span class="e03-l"><b>Design</b></span>
      <span class="e03-l"><b>em movimento</b></span>
      <span class="e03-l"><b>desde 2014</b></span>
    </div>`,
  css:`
    .e03{text-align:center}
    .e03-l{display:block;overflow:hidden}
    .e03-l b{display:block;font-size:26px;font-weight:800;letter-spacing:-.03em;color:#eaeaf2;
      transform:translateY(110%);animation:e03up .9s cubic-bezier(.22,1,.36,1) forwards}
    .e03-l:nth-child(2) b{animation-delay:.12s;color:#d4af37}
    .e03-l:nth-child(3) b{animation-delay:.24s;font-size:15px;font-weight:400;color:#7f7a73}
    @keyframes e03up{to{transform:none}}`
},

{
  id:'e04', cat:'entrada', title:'Clip-path wipe',
  desc:'Três variações de recorte: cortina, círculo e diagonal.',
  tags:['clip-path','keyframes'],
  html:`
    <div class="e04">
      <div class="e04-b e04-a">wipe →</div>
      <div class="e04-b e04-c">círculo</div>
      <div class="e04-b e04-d">diagonal</div>
    </div>`,
  css:`
    .e04{display:flex;flex-direction:column;gap:10px}
    .e04-b{width:200px;padding:14px 18px;border-radius:10px;font-size:13px;color:#0d0c0b;font-weight:600;
      background:linear-gradient(90deg,#d4af37,#b08ac9)}
    .e04-a{animation:e04a .9s cubic-bezier(.76,0,.24,1) forwards}
    .e04-c{animation:e04c 1s cubic-bezier(.76,0,.24,1) .15s both}
    .e04-d{animation:e04d 1s cubic-bezier(.76,0,.24,1) .3s both}
    @keyframes e04a{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
    @keyframes e04c{from{clip-path:circle(0% at 50% 50%)}to{clip-path:circle(75% at 50% 50%)}}
    @keyframes e04d{from{clip-path:polygon(0 0,0 0,0 100%,0 100%)}
                    to{clip-path:polygon(0 0,100% 0,100% 100%,0 100%)}}`
},

{
  id:'e05', cat:'entrada', title:'Blur-in',
  desc:'De desfocado e transparente para nítido. Dá sensação de "foco de câmera".',
  tags:['filter','blur','transition'],
  html:`<div class="e05"><h4>Nitidez</h4><p>o olho é atraído pelo que entra em foco</p></div>`,
  css:`
    .e05{text-align:center;animation:e05 1.1s cubic-bezier(.22,1,.36,1) both}
    .e05 h4{font-size:30px;font-weight:800;letter-spacing:-.03em;color:#f5f2ec}
    .e05 p{margin-top:8px;color:#8f8a80;font-size:13px}
    @keyframes e05{
      from{opacity:0;filter:blur(16px);transform:scale(1.06)}
      to{opacity:1;filter:blur(0);transform:none}}`
},

{
  id:'e06', cat:'entrada', title:'Scale-in com mola',
  desc:'Curva de easing que passa do destino e volta — dá "peso" ao elemento.',
  tags:['cubic-bezier','spring','scale'],
  html:`
    <div class="e06">
      <div class="e06-c"><span>✓</span><b>Pedido confirmado</b><small>chega em 3 dias</small></div>
    </div>`,
  css:`
    .e06-c{width:210px;padding:22px;border-radius:14px;background:#1d1b16;border:1px solid #2e2a22;
      text-align:center;transform:scale(.86);opacity:0;
      animation:e06 .72s cubic-bezier(.34,1.56,.64,1) .1s forwards}
    .e06-c span{display:grid;place-items:center;width:40px;height:40px;margin:0 auto 10px;
      border-radius:50%;background:#5cc88f;color:#062b1f;font-weight:800}
    .e06-c b{display:block;font-size:14px;color:#f0ede7}
    .e06-c small{color:#7d7871;font-size:12px}
    @keyframes e06{to{transform:none;opacity:1}}`
},

{
  id:'e07', cat:'entrada', title:'Card com rotação 3D',
  desc:'perspective + rotateX. O card "tomba" para a posição final.',
  tags:['perspective','rotateX','3D'],
  html:`
    <div class="e07">
      <div class="e07-c"><div class="e07-h"></div><b>Relatório mensal</b><i></i><i class="s"></i></div>
    </div>`,
  css:`
    .e07{perspective:900px}
    .e07-c{width:210px;padding:16px;border-radius:12px;background:#181822;border:1px solid #2b2721;
      transform-origin:50% 100%;opacity:0;
      animation:e07 .9s cubic-bezier(.22,1,.36,1) .1s forwards}
    .e07-h{height:64px;border-radius:8px;background:linear-gradient(120deg,#3c3050,#2b2415);margin-bottom:12px}
    .e07-c b{font-size:13.5px;color:#e6e6f0}
    .e07-c i{display:block;height:7px;border-radius:99px;background:#282419;margin-top:9px}
    .e07-c i.s{width:55%}
    @keyframes e07{from{opacity:0;transform:rotateX(-42deg) translateY(18px)}to{opacity:1;transform:none}}`
},

{
  id:'e08', cat:'entrada', title:'Reveal linha a linha',
  desc:'Quebra o parágrafo em linhas reais e revela cada uma com atraso.',
  tags:['split','lines','JS'],
  html:`<p class="e08">Tipografia animada não é enfeite: é ritmo de leitura. Ao revelar linha a linha, você controla a velocidade com que a ideia entra na cabeça de quem lê.</p>`,
  css:`
    .e08{max-width:270px;font-size:14px;line-height:1.75;color:#cdc8bd;margin:0 auto}
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
  tags:['split text','stagger','JS'],
  html:`
    <div class="e09">
      <h4 data-split="word">Movimento com propósito</h4>
      <p data-split="char">letra por letra</p>
    </div>`,
  css:`
    .e09{text-align:center}
    .e09 h4{font-size:22px;font-weight:800;letter-spacing:-.03em;color:#eee}
    .e09 p{margin-top:10px;font-size:13px;color:#d4af37;font-family:var(--mono)}
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
  tags:['SVG','stroke-dasharray','path'],
  html:`
    <svg class="e10" viewBox="0 0 200 120" fill="none">
      <path class="p1" d="M12 96 C 46 96, 44 24, 78 24 S 122 96, 156 96 L 188 96"
            stroke="#d4af37" stroke-width="3" stroke-linecap="round"/>
      <path class="p2" d="M12 108 L188 108" stroke="#302b24" stroke-width="2"/>
      <circle class="c" cx="78" cy="24" r="5" fill="#b08ac9"/>
    </svg>`,
  css:`
    .e10{width:210px}
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
  tags:['rAF','easing','counter'],
  html:`
    <div class="e11">
      <div><b data-to="1284">0</b><span>usuários</span></div>
      <div><b data-to="98" data-suf="%">0</b><span>satisfação</span></div>
      <div><b data-to="24" data-pre="R$ " data-suf="k">0</b><span>receita</span></div>
    </div>`,
  css:`
    .e11{display:flex;gap:22px;text-align:center}
    .e11 b{display:block;font-size:26px;font-weight:800;letter-spacing:-.03em;
      font-variant-numeric:tabular-nums;color:#f4f1eb}
    .e11 span{font-size:10.5px;text-transform:uppercase;letter-spacing:.09em;color:#736f68}`,
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
  tags:['width','stagger','rAF'],
  html:`
    <div class="e12">
      <div class="e12-r" data-v="92"><span>CSS</span><i><b></b></i><em>0%</em></div>
      <div class="e12-r" data-v="78"><span>JS</span><i><b></b></i><em>0%</em></div>
      <div class="e12-r" data-v="64"><span>WebGL</span><i><b></b></i><em>0%</em></div>
    </div>`,
  css:`
    .e12{width:250px;display:flex;flex-direction:column;gap:14px}
    .e12-r{display:grid;grid-template-columns:52px 1fr 38px;align-items:center;gap:10px;font-size:12px}
    .e12-r span{color:#a09b91}
    .e12-r i{height:6px;border-radius:99px;background:#242019;overflow:hidden;display:block}
    .e12-r b{display:block;height:100%;width:0;border-radius:99px;
      background:linear-gradient(90deg,#d4af37,#b08ac9);
      transition:width 1.3s cubic-bezier(.22,1,.36,1)}
    .e12-r em{font-style:normal;font-family:var(--mono);font-size:11px;color:#736f68;text-align:right}`,
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
}

);
