/* ==========================================================
   11 · NICHOS — demos comerciais por segmento
   (ecommerce, construção, chalés, clínicas)
   ========================================================== */
(window.ANIMDB = window.ANIMDB || []).push(

{
  id:'ni01', cat:'nav', title:'Filtro de catálogo com FLIP', nv:1,
  desc:'Ao filtrar, os cards remanescentes deslizam para a nova posição (FLIP) e os removidos somem com fade.',
  tags:['nicho','FLIP','filtro','ecommerce'], hint:'clique nas categorias',
  nichos:{ ecommerce:'Na página de coleção: ao trocar de categoria os produtos deslizam em vez de piscar, o visitante não perde o fio e continua explorando o catálogo.' },
  html:`
    <div class="ni01">
      <div class="ni01-chips">
        <button class="ni01-chip is-on" data-f="all">Tudo</button>
        <button class="ni01-chip" data-f="rel">Relógios</button>
        <button class="ni01-chip" data-f="bol">Bolsas</button>
        <button class="ni01-chip" data-f="oc">Óculos</button>
      </div>
      <div class="ni01-grid">
        <div class="ni01-c" data-t="rel"><i style="background:linear-gradient(135deg,#3a3428,#241f16)"></i><b>Aurum 40</b><s>R$ 1.290</s></div>
        <div class="ni01-c" data-t="bol"><i style="background:linear-gradient(135deg,#4a3040,#2a1c26)"></i><b>Tote Noir</b><s>R$ 890</s></div>
        <div class="ni01-c" data-t="oc"><i style="background:linear-gradient(135deg,#26343e,#161f26)"></i><b>Solar Rio</b><s>R$ 420</s></div>
        <div class="ni01-c" data-t="rel"><i style="background:linear-gradient(135deg,#33383c,#1c2023)"></i><b>Steel 38</b><s>R$ 980</s></div>
        <div class="ni01-c" data-t="bol"><i style="background:linear-gradient(135deg,#3e3626,#251f14)"></i><b>Clutch Ouro</b><s>R$ 640</s></div>
        <div class="ni01-c" data-t="oc"><i style="background:linear-gradient(135deg,#2e2a3c,#1b1824)"></i><b>Vista Alta</b><s>R$ 510</s></div>
        <div class="ni01-c" data-t="rel"><i style="background:linear-gradient(135deg,#40302a,#251b17)"></i><b>Cuero 42</b><s>R$ 1.540</s></div>
        <div class="ni01-c" data-t="bol"><i style="background:linear-gradient(135deg,#2c3a30,#18221c)"></i><b>Verde Musa</b><s>R$ 720</s></div>
      </div>
    </div>`,
  css:`
    .ni01{width:min(340px,100%)}
    .ni01-chips{display:flex;gap:6px;margin-bottom:12px}
    .ni01-chip{padding:6px 11px;border-radius:99px;font-size:11px;font-weight:600;color:#8f8a80;
      background:#201d18;border:1px solid #2a2620;transition:all .25s}
    .ni01-chip.is-on{background:#d4af37;border-color:#d4af37;color:#1b1813}
    .ni01-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
    .ni01-c{border-radius:10px;background:#201d18;border:1px solid #2a2620;padding:6px;
      transition:opacity .3s,transform .3s}
    .ni01-c.out{opacity:0;transform:scale(.85);pointer-events:none}
    .ni01-c.gone{display:none}
    .ni01-c i{display:block;height:44px;border-radius:7px;margin-bottom:6px}
    .ni01-c b{display:block;font-size:10px;color:#d7d7e2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .ni01-c s{display:block;font-size:9.5px;color:#d4af37;text-decoration:none;font-weight:700}`,
  js:function(root,ctx){
    var cards = [].slice.call(root.querySelectorAll('.ni01-c'));
    var chips = root.querySelectorAll('.ni01-chip');
    chips.forEach(function(ch){
      ctx.on(ch,'click',function(){
        chips.forEach(function(x){ x.classList.remove('is-on'); });
        ch.classList.add('is-on');
        var f = ch.dataset.f;

        // FIRST: mede a posição atual de cada card visível
        var first = new Map();
        cards.forEach(function(c){
          if (!c.classList.contains('gone')) first.set(c, c.getBoundingClientRect());
        });

        // aplica o filtro (removidos: fade/scale, depois display:none)
        cards.forEach(function(c){
          var fica = f === 'all' || c.dataset.t === f;
          if (fica){
            c.classList.remove('gone');
            // remonta o fade-in de quem estava escondido
            if (c.classList.contains('out')){
              requestAnimationFrame(function(){ c.classList.remove('out'); });
            }
          } else {
            c.classList.add('out');
            ctx.wait(function(){ if (c.classList.contains('out')) c.classList.add('gone'); }, 300);
          }
        });

        // LAST + INVERT + PLAY: quem ficou desliza da posição antiga p/ nova
        cards.forEach(function(c){
          if (c.classList.contains('out') || !first.has(c)) return;
          var a = first.get(c), b = c.getBoundingClientRect();
          var dx = a.left - b.left, dy = a.top - b.top;
          if (!dx && !dy) return;
          c.style.transition = 'none';
          c.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
          requestAnimationFrame(function(){
            c.style.transition = 'transform .45s cubic-bezier(.22,1,.36,1)';
            c.style.transform = '';
          });
        });
      });
    });
  }
},

{
  id:'ni02', cat:'estado', title:'Fly to cart', nv:1,
  desc:'Um clone do produto voa em curva até o carrinho, que dá um pulinho e incrementa o badge.',
  tags:['nicho','carrinho','ecommerce','curva'], hint:'clique em adicionar',
  nichos:{ ecommerce:'No botão "adicionar ao carrinho": o produto voar até o ícone confirma a ação sem interromper a compra — o visitante vê o carrinho crescer e segue adicionando.' },
  html:`
    <div class="ni02">
      <div class="ni02-top">
        <b>Loja</b>
        <span class="ni02-cart">
          <svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
          <i class="ni02-bd">0</i>
        </span>
      </div>
      <div class="ni02-row">
        <div class="ni02-p"><i style="background:linear-gradient(135deg,#3a3428,#241f16)"></i><b>Vela âmbar</b><button>Adicionar</button></div>
        <div class="ni02-p"><i style="background:linear-gradient(135deg,#26343e,#161f26)"></i><b>Difusor</b><button>Adicionar</button></div>
        <div class="ni02-p"><i style="background:linear-gradient(135deg,#4a3040,#2a1c26)"></i><b>Sabonete</b><button>Adicionar</button></div>
      </div>
    </div>`,
  css:`
    .ni02{position:relative;width:min(300px,100%)}
    .ni02-top{display:flex;justify-content:space-between;align-items:center;padding:0 2px 14px}
    .ni02-top>b{font-size:14px;color:#d7d7e2;letter-spacing:-.02em}
    .ni02-cart{position:relative;display:grid;place-items:center;width:38px;height:38px;border-radius:11px;
      background:#201d18;border:1px solid #2a2620;transition:transform .2s}
    .ni02-cart svg{width:18px;height:18px;fill:none;stroke:#d4af37;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
    .ni02-cart.hop{animation:ni02h .45s cubic-bezier(.34,1.56,.64,1)}
    .ni02-bd{position:absolute;top:-6px;right:-6px;min-width:17px;height:17px;padding:0 4px;border-radius:99px;
      display:grid;place-items:center;background:#d4af37;color:#1b1813;font-size:10px;font-weight:800;font-style:normal;
      transition:transform .25s cubic-bezier(.34,1.56,.64,1)}
    .ni02-bd.pop{transform:scale(1.35)}
    .ni02-row{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
    .ni02-p{border-radius:11px;background:#201d18;border:1px solid #2a2620;padding:8px;text-align:center}
    .ni02-p i{display:block;height:44px;border-radius:8px;margin-bottom:7px}
    .ni02-p b{display:block;font-size:10.5px;color:#d7d7e2;margin-bottom:7px}
    .ni02-p button{width:100%;padding:6px 0;border-radius:8px;background:#2a2620;color:#d4af37;
      font-size:10.5px;font-weight:700;transition:background .2s}
    .ni02-p button:hover{background:#332e25}
    .ni02-fly{position:fixed;z-index:99;width:26px;height:26px;border-radius:8px;pointer-events:none;
      box-shadow:0 8px 20px -6px #000}
    @keyframes ni02h{35%{transform:scale(.88)}70%{transform:scale(1.12)}}`,
  js:function(root,ctx){
    var cart = root.querySelector('.ni02-cart');
    var bd = root.querySelector('.ni02-bd');
    var n = 0;
    root.querySelectorAll('.ni02-p').forEach(function(p){
      ctx.on(p.querySelector('button'),'click',function(){
        var img = p.querySelector('i');
        var a = img.getBoundingClientRect(), b = cart.getBoundingClientRect();
        var fly = document.createElement('span');
        fly.className = 'ni02-fly';
        fly.style.background = getComputedStyle(img).backgroundImage;
        fly.style.left = (a.left + a.width/2 - 13) + 'px';
        fly.style.top = (a.top + a.height/2 - 13) + 'px';
        document.body.appendChild(fly);
        ctx.clean(function(){ fly.remove(); });

        // voo em curva quadrática: interpola manualmente com rAF
        var x0 = a.left + a.width/2 - 13, y0 = a.top + a.height/2 - 13;
        var x1 = b.left + b.width/2 - 13, y1 = b.top + b.height/2 - 13;
        var cx = (x0 + x1)/2, cy = Math.min(y0, y1) - 60;   // ponto de controle acima
        var t0 = performance.now(), dur = 550;
        (function step(){
          var k = Math.min(1, (performance.now() - t0) / dur);
          var e = 1 - Math.pow(1 - k, 2);                    // ease-out
          var u = 1 - e;
          var x = u*u*x0 + 2*u*e*cx + e*e*x1;
          var y = u*u*y0 + 2*u*e*cy + e*e*y1;
          fly.style.transform = 'translate(' + (x - x0) + 'px,' + (y - y0) + 'px) scale(' + (1 - e*.55) + ')';
          fly.style.opacity = 1 - e*.25;
          if (k < 1){ ctx.raf(step); return; }
          fly.remove();
          n++; bd.textContent = n;
          cart.classList.remove('hop'); void cart.offsetWidth; cart.classList.add('hop');
          bd.classList.add('pop');
          ctx.wait(function(){ bd.classList.remove('pop'); }, 250);
        })();
      });
    });
  }
},

{
  id:'ni03', cat:'estado', title:'Stepper de checkout', nv:1,
  desc:'Três etapas com barra de progresso que cresce e ✓ animado em cada etapa concluída.',
  tags:['nicho','checkout','stepper','ecommerce'], hint:'avance as etapas',
  nichos:{ ecommerce:'No checkout: a barra crescendo e o ✓ a cada etapa dão sensação de progresso — reduzem a ansiedade e o abandono na hora mais delicada da compra.' },
  html:`
    <div class="ni03">
      <div class="ni03-steps">
        <div class="ni03-bar"><i></i></div>
        <div class="ni03-s is-cur" data-l="Carrinho"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg><b>1</b></div>
        <div class="ni03-s" data-l="Entrega"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg><b>2</b></div>
        <div class="ni03-s" data-l="Pagamento"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg><b>3</b></div>
      </div>
      <p class="ni03-txt">Revise os itens do seu carrinho.</p>
      <div class="ni03-nav">
        <button class="ni03-back" disabled>Voltar</button>
        <button class="ni03-next">Avançar</button>
      </div>
    </div>`,
  css:`
    .ni03{width:min(280px,100%)}
    .ni03-steps{position:relative;display:flex;justify-content:space-between;margin:0 8px 34px}
    .ni03-bar{position:absolute;left:14px;right:14px;top:14px;height:2px;background:#2a2620;border-radius:9px}
    .ni03-bar i{display:block;height:100%;width:0;background:#d4af37;border-radius:9px;
      transition:width .55s cubic-bezier(.22,1,.36,1)}
    .ni03-s{position:relative;z-index:1;width:30px;height:30px;border-radius:50%;display:grid;place-items:center;
      background:#201d18;border:2px solid #2a2620;transition:border-color .35s,background .35s}
    .ni03-s b{grid-area:1/1;font-size:12px;color:#8f8a80;transition:opacity .2s}
    .ni03-s svg{grid-area:1/1;width:14px;height:14px;fill:none;stroke:#1b1813;stroke-width:3;
      stroke-linecap:round;stroke-linejoin:round;opacity:0}
    .ni03-s svg path{stroke-dasharray:22;stroke-dashoffset:22}
    .ni03-s::after{content:attr(data-l);position:absolute;top:calc(100% + 6px);left:50%;transform:translateX(-50%);
      font-size:10px;color:#8f8a80;white-space:nowrap;transition:color .3s}
    .ni03-s.is-cur{border-color:#d4af37}
    .ni03-s.is-cur b{color:#d4af37}
    .ni03-s.is-cur::after{color:#d7d7e2}
    .ni03-s.done{border-color:#d4af37;background:#d4af37;animation:ni03p .4s cubic-bezier(.34,1.56,.64,1)}
    .ni03-s.done b{opacity:0}
    .ni03-s.done svg{opacity:1}
    .ni03-s.done svg path{animation:ni03c .4s cubic-bezier(.65,0,.35,1) .1s forwards}
    .ni03-txt{margin:0 0 14px;font-size:12px;color:#8f8a80;text-align:center;min-height:16px}
    .ni03-nav{display:flex;gap:8px;justify-content:center}
    .ni03-nav button{padding:8px 18px;border-radius:9px;font-size:12px;font-weight:700;transition:opacity .25s}
    .ni03-back{background:#2a2620;color:#d7d7e2}
    .ni03-back:disabled{opacity:.35;cursor:default}
    .ni03-next{background:#d4af37;color:#1b1813}
    @keyframes ni03p{40%{transform:scale(.85)}75%{transform:scale(1.12)}}
    @keyframes ni03c{to{stroke-dashoffset:0}}`,
  js:function(root,ctx){
    var steps = root.querySelectorAll('.ni03-s');
    var bar = root.querySelector('.ni03-bar i');
    var txt = root.querySelector('.ni03-txt');
    var back = root.querySelector('.ni03-back');
    var next = root.querySelector('.ni03-next');
    var msgs = ['Revise os itens do seu carrinho.','Endereço e prazo de entrega.','Escolha a forma de pagamento.','Pedido confirmado. Obrigado!'];
    var cur = 0;

    function render(){
      steps.forEach(function(s,i){
        s.classList.toggle('done', i < cur);
        s.classList.toggle('is-cur', i === cur);
      });
      bar.style.width = Math.min(100, cur/(steps.length-1)*100) + '%';
      txt.textContent = msgs[cur];
      back.disabled = cur === 0;
      next.textContent = cur >= 2 ? 'Concluir' : 'Avançar';
      next.style.visibility = cur > 2 ? 'hidden' : '';
    }
    ctx.on(next,'click',function(){ if (cur < 3){ cur++; render(); } });
    ctx.on(back,'click',function(){ if (cur > 0){ cur--; render(); } });
    render();
  }
},

{
  id:'ni04', cat:'dados', title:'Antes / Depois (slider)', nv:1,
  desc:'Alça arrastável revela a segunda camada via clip-path, com suavização no arrasto.',
  tags:['nicho','clip-path','pointer','comparação'], hint:'arraste ⇄',
  nichos:{
    construcao:'Na página de portfólio: o visitante arrasta e vê a obra antes e depois da reforma com as próprias mãos — prova visual que nenhum texto substitui.',
    clinicas:'Na galeria de resultados: comparar o antes e depois de um procedimento no próprio ritmo gera confiança e leva ao agendamento da avaliação.'
  },
  html:`
    <div class="ni04">
      <div class="ni04-a"><span>ANTES</span></div>
      <div class="ni04-b"><span>DEPOIS</span></div>
      <div class="ni04-h"><i></i></div>
    </div>`,
  css:`
    .ni04{position:relative;width:min(300px,100%);height:180px;border-radius:14px;overflow:hidden;
      border:1px solid #2a2620;cursor:ew-resize;touch-action:none;user-select:none}
    .ni04-a,.ni04-b{position:absolute;inset:0}
    .ni04-a{background:
      radial-gradient(120px 60px at 25% 80%,#3a352c 0%,transparent 70%),
      linear-gradient(160deg,#35302a 0%,#221f19 60%,#191712 100%)}
    .ni04-b{background:
      radial-gradient(140px 70px at 70% 25%,#efd88a33 0%,transparent 70%),
      linear-gradient(160deg,#4a4030 0%,#8a713a 55%,#d4af37 130%);
      clip-path:inset(0 0 0 50%)}
    .ni04 span{position:absolute;top:10px;font-size:10px;font-weight:800;letter-spacing:.14em;
      padding:4px 8px;border-radius:6px;background:rgba(10,9,7,.55);color:#d7d7e2}
    .ni04-a span{left:10px}
    .ni04-b span{right:10px;color:#1b1813;background:rgba(244,232,190,.75)}
    .ni04-h{position:absolute;top:0;bottom:0;left:50%;width:2px;margin-left:-1px;background:#f4f1eb;
      box-shadow:0 0 14px rgba(0,0,0,.6)}
    .ni04-h i{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:32px;height:32px;
      border-radius:50%;background:#f4f1eb;display:block}
    .ni04-h i::before{content:"⇄";position:absolute;inset:0;display:grid;place-items:center;
      font-size:14px;color:#1b1813;font-weight:700}`,
  js:function(root,ctx){
    var box = root.querySelector('.ni04');
    var b = root.querySelector('.ni04-b');
    var h = root.querySelector('.ni04-h');
    var alvo = 50, pos = 50, drag = false;

    function setAlvo(clientX){
      var r = box.getBoundingClientRect();
      alvo = Math.max(2, Math.min(98, (clientX - r.left) / r.width * 100));
    }
    ctx.on(box,'pointerdown',function(e){
      drag = true; box.setPointerCapture(e.pointerId); setAlvo(e.clientX);
    });
    ctx.on(box,'pointermove',function(e){ if (drag) setAlvo(e.clientX); });
    ctx.on(box,'pointerup',function(){ drag = false; });
    ctx.on(box,'pointercancel',function(){ drag = false; });

    // suavização: a posição persegue o alvo (inércia leve)
    ctx.loop(function(){
      pos += (alvo - pos) * 0.18;
      b.style.clipPath = 'inset(0 0 0 ' + pos + '%)';
      h.style.left = pos + '%';
    });
  }
},

{
  id:'ni05', cat:'avancado', title:'Blueprint se desenhando', nv:1,
  desc:'Fachada em SVG desenhada traço a traço com dashoffset; cotas e textos entram ao final.',
  tags:['nicho','SVG','stroke-dasharray','construção'],
  nichos:{ construcao:'Na abertura do site ou da página de projetos: a planta se desenhando sozinha comunica precisão técnica de engenharia antes de qualquer palavra — o visitante entende na hora que é trabalho de especialista.' },
  html:`
    <svg class="ni05" viewBox="0 0 300 190" fill="none">
      <g class="ni05-tr">
        <rect class="d" x="60" y="70" width="180" height="90" style="--l:540;--d:0s"/>
        <path class="d" d="M50 70 L150 22 L250 70" style="--l:230;--d:.5s"/>
        <rect class="d" x="82" y="95" width="34" height="30" style="--l:128;--d:1s"/>
        <rect class="d" x="184" y="95" width="34" height="30" style="--l:128;--d:1.15s"/>
        <rect class="d" x="135" y="105" width="30" height="55" style="--l:170;--d:1.3s"/>
        <line class="d f" x1="90" y1="110" x2="108" y2="110" style="--l:20;--d:1.6s"/>
        <line class="d f" x1="192" y1="110" x2="210" y2="110" style="--l:20;--d:1.7s"/>
        <line class="d f" x1="40" y1="160" x2="260" y2="160" style="--l:220;--d:1.8s"/>
      </g>
      <g class="ni05-cota">
        <line class="f" x1="60" y1="174" x2="240" y2="174"/>
        <line class="f" x1="60" y1="169" x2="60" y2="179"/>
        <line class="f" x1="240" y1="169" x2="240" y2="179"/>
        <text x="150" y="186" text-anchor="middle">12,00 m</text>
        <line class="f" x1="262" y1="70" x2="262" y2="160"/>
        <line class="f" x1="257" y1="70" x2="267" y2="70"/>
        <line class="f" x1="257" y1="160" x2="267" y2="160"/>
        <text x="272" y="118" transform="rotate(90 272 118)" text-anchor="middle">6,00 m</text>
        <text x="150" y="14" text-anchor="middle" class="ni05-ttl">FACHADA · ESC 1:50</text>
      </g>
    </svg>`,
  css:`
    .ni05{width:min(300px,100%);height:auto}
    .ni05 .d{stroke:#d4af37;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;
      stroke-dasharray:var(--l);stroke-dashoffset:var(--l)}
    .ni05 .f{stroke-width:.9!important;stroke:#8f8a80}
    .ni05 .d.f{stroke:#8f8a80}
    .ni05.go .d{animation:ni05d 1s cubic-bezier(.6,0,.3,1) var(--d) forwards}
    .ni05-cota{opacity:0;transition:opacity .8s}
    .ni05-cota line{stroke:#8f8a80;stroke-width:.9}
    .ni05-cota text{fill:#8f8a80;font-size:8px;font-family:ui-monospace,monospace;letter-spacing:.08em}
    .ni05-cota .ni05-ttl{fill:#d4af37;font-size:8.5px;letter-spacing:.22em}
    .ni05.go .ni05-cota{opacity:1;transition-delay:2.2s}
    @keyframes ni05d{to{stroke-dashoffset:0}}`,
  js:function(root,ctx){
    var svg = root.querySelector('.ni05');
    // pequeno atraso para o traço começar já com o card visível
    ctx.wait(function(){ svg.classList.add('go'); }, 250);
  }
},

{
  id:'ni06', cat:'entrada', title:'Timeline de obra', nv:1,
  desc:'Linha vertical cresce e os marcos acendem em cascata, com labels em fade-slide.',
  tags:['nicho','timeline','cascata','construção'],
  nichos:{ construcao:'Na página "como trabalhamos": as etapas da obra acendendo em sequência mostram método e previsibilidade — exatamente o que quem vai construir quer sentir antes de assinar.' },
  html:`
    <div class="ni06">
      <div class="ni06-l"><i></i></div>
      <div class="ni06-e" style="--i:0"><b></b><div><s>MÊS 1</s><h4>Fundação</h4></div></div>
      <div class="ni06-e" style="--i:1"><b></b><div><s>MÊS 3</s><h4>Estrutura</h4></div></div>
      <div class="ni06-e" style="--i:2"><b></b><div><s>MÊS 7</s><h4>Acabamento</h4></div></div>
      <div class="ni06-e" style="--i:3"><b></b><div><s>MÊS 10</s><h4>Entrega</h4></div></div>
    </div>`,
  css:`
    .ni06{position:relative;width:min(230px,100%);padding-left:26px;display:flex;flex-direction:column;gap:18px}
    .ni06-l{position:absolute;left:7px;top:8px;bottom:8px;width:2px;background:#2a2620;border-radius:9px}
    .ni06-l i{display:block;width:100%;height:0;background:linear-gradient(#d4af37,#8a713a);border-radius:9px;
      transition:height 1.6s cubic-bezier(.22,1,.36,1)}
    .ni06.go .ni06-l i{height:100%}
    .ni06-e{position:relative;display:flex;align-items:center;gap:12px}
    .ni06-e b{position:absolute;left:-26px;width:16px;height:16px;border-radius:50%;
      background:#201d18;border:2px solid #2a2620;transition:all .4s cubic-bezier(.34,1.56,.64,1);
      transition-delay:calc(.25s + var(--i) * .38s)}
    .ni06.go .ni06-e b{background:#d4af37;border-color:#d4af37;box-shadow:0 0 0 4px rgba(212,175,55,.15);transform:scale(1.05)}
    .ni06-e div{opacity:0;transform:translateX(14px);transition:all .55s cubic-bezier(.22,1,.36,1);
      transition-delay:calc(.35s + var(--i) * .38s)}
    .ni06.go .ni06-e div{opacity:1;transform:none}
    .ni06-e s{display:block;font-size:9.5px;letter-spacing:.16em;color:#8f8a80;text-decoration:none;font-weight:700}
    .ni06-e h4{margin:1px 0 0;font-size:14px;font-weight:700;color:#d7d7e2;letter-spacing:-.01em}`,
  js:function(root,ctx){
    var box = root.querySelector('.ni06');
    ctx.wait(function(){ box.classList.add('go'); }, 200);
  }
},

{
  id:'ni07', cat:'fundos', title:'Ken Burns', nv:1,
  desc:'Três cenas em crossfade lento com zoom e pan contínuos, indicador de bolinhas.',
  tags:['nicho','ken burns','crossfade','chalés'], stage:'flush',
  nichos:{ chales:'No hero do site do chalé: as paisagens deslizando devagar em zoom criam a mesma calma que o hóspede vai comprar — o visitante desacelera junto e imagina-se lá.' },
  html:`
    <div class="ni07">
      <div class="ni07-s" style="background:radial-gradient(220px 140px at 30% 80%,#2f5a3c 0%,transparent 65%),linear-gradient(170deg,#0d1f14 0%,#1c3a26 55%,#3d6b45 130%)"></div>
      <div class="ni07-s" style="background:radial-gradient(240px 130px at 70% 30%,#e8a54e55 0%,transparent 60%),linear-gradient(160deg,#2a1508 0%,#6b3a16 55%,#c97b2e 135%)"></div>
      <div class="ni07-s" style="background:radial-gradient(200px 120px at 55% 20%,#5a76c455 0%,transparent 60%),linear-gradient(175deg,#060a18 0%,#101b3a 60%,#25336b 140%)"></div>
      <div class="ni07-tx"><s>SERRA DA MANTIQUEIRA</s><b>Chalés Alto da Bruma</b></div>
      <div class="ni07-dots"><i class="on"></i><i></i><i></i></div>
    </div>`,
  css:`
    .ni07{position:relative;width:100%;height:100%;min-height:200px;overflow:hidden}
    .ni07-s{position:absolute;inset:-8%;opacity:0;transition:opacity 1.8s ease;will-change:transform,opacity}
    .ni07-s.on{opacity:1}
    .ni07-s:nth-child(1).on{animation:ni07a 9s linear forwards}
    .ni07-s:nth-child(2).on{animation:ni07b 9s linear forwards}
    .ni07-s:nth-child(3).on{animation:ni07c 9s linear forwards}
    .ni07-tx{position:absolute;left:20px;bottom:34px;z-index:2}
    .ni07-tx s{display:block;font-size:9.5px;letter-spacing:.24em;color:#d4af37;text-decoration:none;font-weight:700}
    .ni07-tx b{display:block;margin-top:4px;font-size:19px;color:#f4f1eb;letter-spacing:-.02em;
      text-shadow:0 2px 18px rgba(0,0,0,.6)}
    .ni07-dots{position:absolute;left:20px;bottom:14px;z-index:2;display:flex;gap:6px}
    .ni07-dots i{width:6px;height:6px;border-radius:99px;background:rgba(244,241,235,.3);transition:all .5s}
    .ni07-dots i.on{width:18px;background:#d4af37}
    @keyframes ni07a{from{transform:scale(1) translate(0,0)}to{transform:scale(1.12) translate(-1.5%,-1%)}}
    @keyframes ni07b{from{transform:scale(1.12) translate(1.5%,0)}to{transform:scale(1) translate(0,1%)}}
    @keyframes ni07c{from{transform:scale(1) translate(0,1.5%)}to{transform:scale(1.1) translate(1%,-1%)}}`,
  js:function(root,ctx){
    var slides = root.querySelectorAll('.ni07-s');
    var dots = root.querySelectorAll('.ni07-dots i');
    var cur = 0;
    slides[0].classList.add('on');
    ctx.every(function(){
      slides[cur].classList.remove('on');
      dots[cur].classList.remove('on');
      cur = (cur + 1) % slides.length;
      slides[cur].classList.add('on');
      dots[cur].classList.add('on');
    }, 4500);
  }
},

{
  id:'ni08', cat:'estado', title:'Reserva com confirmação', nv:1,
  desc:'Grade de dias e horários com seleção elegante; o botão reservar vira um ✓ discreto.',
  tags:['nicho','reserva','agendamento','chalés','clínicas'], hint:'escolha dia e horário',
  nichos:{
    chales:'No widget de reserva: escolher a data com uma resposta visual suave e receber o ✓ na hora dá segurança de que a estadia está garantida — sem sair para outra tela.',
    clinicas:'No agendamento de avaliação: o fluxo curto dia → horário → ✓ tira a fricção do primeiro contato, e a confirmação sóbria conversa com o padrão da clínica.'
  },
  html:`
    <div class="ni08">
      <b class="ni08-t">Reserve sua data</b>
      <div class="ni08-days">
        <button data-d="Seg">12</button>
        <button data-d="Ter">13</button>
        <button data-d="Qua" disabled>14</button>
        <button data-d="Qui">15</button>
        <button data-d="Sex" disabled>16</button>
        <button data-d="Sáb">17</button>
        <button data-d="Dom">18</button>
      </div>
      <div class="ni08-hrs">
        <button>09:00</button><button>11:30</button><button>14:00</button><button>16:30</button>
      </div>
      <button class="ni08-go" disabled>
        <span class="t">Reservar</span>
        <svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
      </button>
    </div>`,
  css:`
    .ni08{width:min(270px,100%);padding:16px;border-radius:14px;background:#201d18;border:1px solid #2a2620}
    .ni08-t{display:block;font-size:13px;color:#d7d7e2;margin-bottom:12px;letter-spacing:-.01em}
    .ni08-days{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-bottom:10px}
    .ni08-days button{position:relative;padding:14px 0 6px;border-radius:9px;font-size:11.5px;font-weight:700;
      color:#d7d7e2;background:#1d1b16;border:1px solid #2a2620;transition:all .3s cubic-bezier(.22,1,.36,1)}
    .ni08-days button::before{content:attr(data-d);position:absolute;top:3px;left:0;right:0;
      font-size:7.5px;font-weight:600;letter-spacing:.08em;color:#8f8a80;transition:color .3s}
    .ni08-days button:hover:not(:disabled){border-color:#3a352a;transform:translateY(-2px)}
    .ni08-days button:disabled{opacity:.28;text-decoration:line-through;cursor:default}
    .ni08-days button.sel{background:#d4af37;border-color:#d4af37;color:#1b1813;transform:translateY(-2px);
      box-shadow:0 8px 18px -8px rgba(212,175,55,.5)}
    .ni08-days button.sel::before{color:#1b1813}
    .ni08-hrs{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;margin-bottom:12px;
      opacity:.4;pointer-events:none;transition:opacity .35s}
    .ni08.has-day .ni08-hrs{opacity:1;pointer-events:auto}
    .ni08-hrs button{padding:7px 0;border-radius:8px;font-size:10.5px;font-weight:600;color:#8f8a80;
      background:#1d1b16;border:1px solid #2a2620;transition:all .28s}
    .ni08-hrs button:hover{color:#d7d7e2;border-color:#3a352a}
    .ni08-hrs button.sel{background:#2e2a1d;border-color:#d4af37;color:#d4af37}
    .ni08-go{position:relative;width:100%;height:40px;border-radius:10px;display:grid;place-items:center;
      background:#d4af37;color:#1b1813;font-size:12.5px;font-weight:800;overflow:hidden;
      transition:opacity .3s,background .4s}
    .ni08-go:disabled{opacity:.35;cursor:default}
    .ni08-go>*{grid-area:1/1;transition:opacity .25s,transform .35s cubic-bezier(.34,1.56,.64,1)}
    .ni08-go svg{width:18px;height:18px;fill:none;stroke:#0f2b21;stroke-width:2.6;stroke-linecap:round;
      stroke-linejoin:round;opacity:0;transform:scale(.6)}
    .ni08-go svg path{stroke-dasharray:26;stroke-dashoffset:26}
    .ni08-go.ok{background:#5cc88f}
    .ni08-go.ok .t{opacity:0;transform:scale(.85)}
    .ni08-go.ok svg{opacity:1;transform:none}
    .ni08-go.ok svg path{animation:ni08c .45s cubic-bezier(.65,0,.35,1) .12s forwards}
    @keyframes ni08c{to{stroke-dashoffset:0}}`,
  js:function(root,ctx){
    var box = root.querySelector('.ni08');
    var go = root.querySelector('.ni08-go');
    var dia = null, hora = null;

    function habilita(){ go.disabled = !(dia && hora) || go.classList.contains('ok'); }

    root.querySelectorAll('.ni08-days button').forEach(function(b){
      ctx.on(b,'click',function(){
        if (b.disabled) return;
        root.querySelectorAll('.ni08-days .sel').forEach(function(x){ x.classList.remove('sel'); });
        b.classList.add('sel');
        dia = b.textContent;
        box.classList.add('has-day');
        habilita();
      });
    });
    root.querySelectorAll('.ni08-hrs button').forEach(function(b){
      ctx.on(b,'click',function(){
        root.querySelectorAll('.ni08-hrs .sel').forEach(function(x){ x.classList.remove('sel'); });
        b.classList.add('sel');
        hora = b.textContent;
        habilita();
      });
    });
    ctx.on(go,'click',function(){
      if (go.disabled) return;
      go.classList.add('ok');
      go.disabled = true;
      ctx.wait(function(){
        go.classList.remove('ok');
        habilita();
      }, 2600);
    });
  }
}

);
