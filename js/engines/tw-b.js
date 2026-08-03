/* ==========================================================
   ENGINE B · TAILWIND CSS (Play CDN)
   Réplica de nav/fundos/estado/dados/avancado (47 itens)
   com o estilo estático reescrito em utilitárias Tailwind.
   O JS continua vanilla, idêntico ao original.
   ========================================================== */
(window.ANIMDB = window.ANIMDB || []).push(

{
  id:'n01', cat:'nav', title:'Hambúrguer → X',
  desc:'Três traços viram um X. Quatro variações de morph (estilo em Tailwind).',
  tags:['menu','transform','CSS only','tailwind'], hint:'clique nos ícones',
  html:`
    <div class="n01 flex gap-[14px]">
      <button class="n01-b v1 w-[50px] h-[50px] rounded-[14px] bg-[#1c1a15] border border-[#2b2721] grid content-center justify-items-center gap-[5px] transition-[background] duration-200 hover:bg-[#242019]"><i></i><i></i><i></i></button>
      <button class="n01-b v2 w-[50px] h-[50px] rounded-[14px] bg-[#1c1a15] border border-[#2b2721] grid content-center justify-items-center gap-[5px] transition-[background] duration-200 hover:bg-[#242019]"><i></i><i></i><i></i></button>
      <button class="n01-b v3 w-[50px] h-[50px] rounded-[14px] bg-[#1c1a15] border border-[#2b2721] grid content-center justify-items-center gap-[5px] transition-[background] duration-200 hover:bg-[#242019]"><i></i><i></i></button>
      <button class="n01-b v4 w-[50px] h-[50px] rounded-[14px] bg-[#1c1a15] border border-[#2b2721] grid content-center justify-items-center gap-[5px] transition-[background] duration-200 hover:bg-[#242019]"><i></i><i></i><i></i></button>
    </div>`,
  css:`
    .n01-b i{display:block;width:20px;height:2px;background:#e8e5df;border-radius:9px;
      transition:transform .42s cubic-bezier(.22,1,.36,1),opacity .2s,width .3s}
    .n01-b.on.v1 i:nth-child(1){transform:translateY(7px) rotate(45deg)}
    .n01-b.on.v1 i:nth-child(2){opacity:0}
    .n01-b.on.v1 i:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
    .n01-b.on.v2 i:nth-child(1){transform:translateY(7px) rotate(135deg)}
    .n01-b.on.v2 i:nth-child(2){transform:scaleX(0)}
    .n01-b.on.v2 i:nth-child(3){transform:translateY(-7px) rotate(-135deg)}
    .n01-b.v3 i:nth-child(2){width:13px;margin-left:-7px}
    .n01-b.on.v3 i:nth-child(1){transform:translateY(3.5px) rotate(45deg)}
    .n01-b.on.v3 i:nth-child(2){width:20px;margin-left:0;transform:translateY(-3.5px) rotate(-45deg)}
    .n01-b.v4 i:nth-child(1){width:14px}
    .n01-b.v4 i:nth-child(3){width:9px}
    .n01-b.on.v4 i{width:20px}
    .n01-b.on.v4 i:nth-child(1){transform:translateY(7px) rotate(-45deg)}
    .n01-b.on.v4 i:nth-child(2){opacity:0;transform:translateX(14px)}
    .n01-b.on.v4 i:nth-child(3){transform:translateY(-7px) rotate(45deg)}`,
  js:function(root,ctx){
    root.querySelectorAll('.n01-b').forEach(function(b){
      ctx.on(b,'click',function(){ b.classList.toggle('on'); });
    });
  }
},

{
  id:'n02', cat:'nav', title:'Menu fullscreen com stagger',
  desc:'O painel entra por clip-path e os links sobem em cascata (estilo em Tailwind).',
  tags:['overlay','stagger','clip-path','tailwind'], hint:'clique no menu',
  html:`
    <div class="n02 relative w-full h-full overflow-hidden bg-[#141312]">
      <header class="relative z-[3] flex items-center justify-between p-[16px]">
        <b class="text-[15px] tracking-[-.02em] text-[#f4f1eb] mix-blend-difference">ACME</b>
        <button class="n02-t w-[34px] h-[34px] grid content-center justify-items-center gap-[6px]"><i></i><i></i></button>
      </header>
      <div class="n02-p absolute inset-0 z-[2] flex flex-col justify-center gap-[2px] px-[22px] bg-[linear-gradient(140deg,#d4af37,#b08ac9)] [clip-path:circle(0%_at_calc(100%_-_32px)_32px)] transition-[clip-path] duration-[.7s] ease-[cubic-bezier(.76,0,.24,1)]">
        <a style="--i:0">Trabalhos</a><a style="--i:1">Estúdio</a>
        <a style="--i:2">Serviços</a><a style="--i:3">Contato</a>
      </div>
    </div>`,
  css:`
    .n02-t i{width:20px;height:2px;background:#fff;border-radius:9px;mix-blend-mode:difference;
      transition:transform .4s cubic-bezier(.22,1,.36,1)}
    .n02.on .n02-t i:first-child{transform:translateY(4px) rotate(45deg)}
    .n02.on .n02-t i:last-child{transform:translateY(-4px) rotate(-45deg)}
    .n02.on .n02-p{clip-path:circle(150% at calc(100% - 32px) 32px)}
    .n02-p a{font-size:24px;font-weight:800;letter-spacing:-.035em;color:#1b1813;cursor:pointer;
      opacity:0;transform:translateY(24px);transition:all .5s cubic-bezier(.22,1,.36,1)}
    .n02.on .n02-p a{opacity:1;transform:none;transition-delay:calc(.2s + var(--i) * .07s)}
    .n02-p a:hover{transform:translateX(8px)}`,
  js:function(root,ctx){
    var box = root.querySelector('.n02');
    ctx.on(root.querySelector('.n02-t'),'click',function(){ box.classList.toggle('on'); });
  }
},

{
  id:'n03', cat:'nav', title:'Drawer lateral com backdrop',
  desc:'Painel desliza, fundo escurece e desfoca, scroll travado (estilo em Tailwind).',
  tags:['drawer','backdrop-filter','slide','tailwind'], hint:'clique em abrir',
  html:`
    <div class="n03 relative w-full h-full overflow-hidden">
      <div class="n03-bg p-[20px] h-full bg-[#141312]">
        <b class="text-[16px] text-[#eee]">Dashboard</b>
        <p class="text-[12.5px] text-[#85807a] mt-[6px] mb-[14px]">Conteúdo por trás do drawer.</p>
        <button class="n03-o px-[16px] py-[9px] rounded-[9px] bg-[#d4af37] text-[#1b1813] text-[12.5px] font-bold">Abrir painel</button>
      </div>
      <div class="n03-sh absolute inset-0 bg-[rgba(4,4,8,.6)] opacity-0 pointer-events-none backdrop-blur-[3px] transition-opacity duration-[.4s]"></div>
      <aside class="n03-d absolute top-0 right-0 bottom-0 w-[190px] p-[20px] bg-[#1b1915] border-l border-[#2a2620] flex flex-col gap-[12px] translate-x-full transition-transform duration-[.48s] ease-[cubic-bezier(.22,1,.36,1)] shadow-[-20px_0_60px_-30px_#000]">
        <b class="text-[14px] text-[#f4f1eb]">Filtros</b>
        <label><input type="checkbox" checked> Disponível</label>
        <label><input type="checkbox"> Em promoção</label>
        <label><input type="checkbox"> Frete grátis</label>
        <button class="n03-c mt-auto px-[16px] py-[9px] rounded-[9px] bg-[#2b2721] text-[#e8e5df] text-[12.5px] font-bold">Fechar</button>
      </aside>
    </div>`,
  css:`
    .n03.on .n03-sh{opacity:1;pointer-events:auto}
    .n03.on .n03-d{transform:none}
    .n03-d label{display:flex;gap:8px;align-items:center;font-size:12.5px;color:#a5a099;
      opacity:0;transform:translateX(16px);transition:all .4s cubic-bezier(.22,1,.36,1)}
    .n03.on .n03-d label{opacity:1;transform:none}
    .n03.on .n03-d label:nth-of-type(1){transition-delay:.14s}
    .n03.on .n03-d label:nth-of-type(2){transition-delay:.2s}
    .n03.on .n03-d label:nth-of-type(3){transition-delay:.26s}`,
  js:function(root,ctx){
    var box = root.querySelector('.n03');
    ctx.on(root.querySelector('.n03-o'),'click',function(){ box.classList.add('on'); });
    ctx.on(root.querySelector('.n03-c'),'click',function(){ box.classList.remove('on'); });
    ctx.on(root.querySelector('.n03-sh'),'click',function(){ box.classList.remove('on'); });
  }
},

{
  id:'n04', cat:'nav', title:'Mega-menu',
  desc:'Abre com altura animada e os itens entram escalonados. Fecha com delay (estilo em Tailwind).',
  tags:['dropdown','stagger','height','tailwind'], hint:'passe o mouse',
  html:`
    <div class="n04 w-full h-full bg-[#131211]">
      <nav class="n04-n flex gap-[18px] px-[20px] py-[16px] text-[13px] text-[#a5a099] border-b border-[#211e18]">
        <a class="cursor-pointer transition-colors duration-200 hover:text-white">Início</a>
        <a class="n04-tr cursor-pointer transition-colors duration-200 hover:text-white">Produtos ▾</a>
        <a class="cursor-pointer transition-colors duration-200 hover:text-white">Preço</a>
      </nav>
      <div class="n04-m grid grid-cols-2 gap-[18px] px-[20px] py-0 max-h-0 opacity-0 overflow-hidden transition-[max-height_.45s_cubic-bezier(.22,1,.36,1),opacity_.3s,padding_.45s]">
        <div class="n04-col"><b class="block text-[11px] uppercase tracking-[.12em] text-[#d4af37] mb-[8px]">Para times</b><span>Colaboração</span><span>Permissões</span><span>SSO</span></div>
        <div class="n04-col"><b class="block text-[11px] uppercase tracking-[.12em] text-[#d4af37] mb-[8px]">Para devs</b><span>API</span><span>Webhooks</span><span>CLI</span></div>
      </div>
    </div>`,
  css:`
    .n04.on .n04-m{max-height:180px;opacity:1;padding:18px 20px}
    .n04-col span{display:block;font-size:13px;color:#c6c1b6;padding:4px 0;cursor:pointer;
      opacity:0;transform:translateY(8px);transition:all .4s cubic-bezier(.22,1,.36,1)}
    .n04.on .n04-col span{opacity:1;transform:none}
    .n04.on .n04-col span:nth-child(2){transition-delay:.08s}
    .n04.on .n04-col span:nth-child(3){transition-delay:.14s}
    .n04.on .n04-col span:nth-child(4){transition-delay:.2s}
    .n04-col span:hover{color:#fff}`,
  js:function(root,ctx){
    var box = root.querySelector('.n04'), t;
    ctx.on(root.querySelector('.n04-tr'),'mouseenter',function(){ clearTimeout(t); box.classList.add('on'); });
    ctx.on(box,'mouseleave',function(){ t = setTimeout(function(){ box.classList.remove('on'); }, 220); });
    ctx.on(root.querySelector('.n04-m'),'mouseenter',function(){ clearTimeout(t); });
  }
},

{
  id:'n05', cat:'nav', title:'Tabs com indicador deslizante',
  desc:'O indicador mede a posição do botão ativo — nada de larguras fixas (estilo em Tailwind).',
  tags:['tabs','FLIP','measure','tailwind'], hint:'clique nas abas',
  html:`
    <div class="n05 w-[250px]">
      <div class="n05-t relative flex gap-[2px] p-[4px] rounded-[11px] bg-[#1b1915] border border-[#28241900]">
        <span class="n05-ind absolute top-[4px] bottom-[4px] left-0 w-0 rounded-[8px] bg-[#2c2820] transition-[transform_.42s_cubic-bezier(.22,1,.36,1),width_.42s_cubic-bezier(.22,1,.36,1)]"></span>
        <button class="on relative z-[2] px-[11px] py-[7px] text-[11.5px] text-[#8f8a80] rounded-[8px] transition-colors duration-[.25s] whitespace-nowrap">Visão geral</button>
        <button class="relative z-[2] px-[11px] py-[7px] text-[11.5px] text-[#8f8a80] rounded-[8px] transition-colors duration-[.25s] whitespace-nowrap">Métricas</button>
        <button class="relative z-[2] px-[11px] py-[7px] text-[11.5px] text-[#8f8a80] rounded-[8px] transition-colors duration-[.25s] whitespace-nowrap">Time</button>
        <button class="relative z-[2] px-[11px] py-[7px] text-[11.5px] text-[#8f8a80] rounded-[8px] transition-colors duration-[.25s] whitespace-nowrap">API</button>
      </div>
      <div class="n05-body mt-[14px] p-[14px] rounded-[11px] bg-[#181611] border border-[#23201a]"><b>Visão geral</b><p>O conteúdo troca com um fade curto.</p></div>
    </div>`,
  css:`
    .n05-t button.on{color:#f5f2ec}
    .n05-body b{font-size:13.5px;color:#eee}
    .n05-body p{font-size:12px;color:#85807a;margin-top:4px}
    .n05-body.fade{animation:n05 .35s cubic-bezier(.22,1,.36,1)}
    @keyframes n05{from{opacity:0;transform:translateY(6px)}}`,
  js:function(root,ctx){
    var ind = root.querySelector('.n05-ind'),
        btns = root.querySelectorAll('.n05-t button'),
        body = root.querySelector('.n05-body'),
        texts = ['O conteúdo troca com um fade curto.','Sessões, cliques e retenção.',
                 'Quem faz o quê, e desde quando.','Chaves, limites e webhooks.'];
    function move(b){
      ind.style.width = b.offsetWidth + 'px';
      ind.style.transform = 'translateX(' + b.offsetLeft + 'px)';
    }
    move(root.querySelector('.n05-t button.on'));
    btns.forEach(function(b,i){
      ctx.on(b,'click',function(){
        btns.forEach(function(x){ x.classList.remove('on'); });
        b.classList.add('on');
        move(b);
        body.innerHTML = '<b>' + b.textContent + '</b><p>' + texts[i] + '</p>';
        body.classList.remove('fade'); void body.offsetWidth; body.classList.add('fade');
      });
    });
  }
},

{
  id:'n06', cat:'nav', title:'Accordion (grid 0fr → 1fr)',
  desc:'Altura automática animável sem medir nada em JS. O truque moderno (estilo em Tailwind).',
  tags:['grid-template-rows','accordion','CSS','tailwind'], hint:'clique nos itens',
  html:`
    <div class="n06 w-[250px] flex flex-col gap-[8px]">
      <div class="n06-i open rounded-[11px] bg-[#191712] overflow-hidden border border-[#24211a]"><button class="w-full flex items-center gap-[10px] px-[14px] py-[13px] text-[12.5px] text-[#e8e5df] text-left">Como funciona o teste grátis?<i class="ml-auto w-[11px] h-[11px] relative flex-none"></i></button><div class="n06-c"><p>14 dias, sem cartão. No fim escolhe um plano ou a conta vira somente-leitura.</p></div></div>
      <div class="n06-i rounded-[11px] bg-[#191712] overflow-hidden border border-[#24211a]"><button class="w-full flex items-center gap-[10px] px-[14px] py-[13px] text-[12.5px] text-[#e8e5df] text-left">Posso cancelar quando quiser?<i class="ml-auto w-[11px] h-[11px] relative flex-none"></i></button><div class="n06-c"><p>Sim. O cancelamento vale até o fim do ciclo já pago.</p></div></div>
      <div class="n06-i rounded-[11px] bg-[#191712] overflow-hidden border border-[#24211a]"><button class="w-full flex items-center gap-[10px] px-[14px] py-[13px] text-[12.5px] text-[#e8e5df] text-left">Vocês emitem nota fiscal?<i class="ml-auto w-[11px] h-[11px] relative flex-none"></i></button><div class="n06-c"><p>Emitimos NF-e automaticamente todo dia 1º.</p></div></div>
    </div>`,
  css:`
    .n06-i i::before,.n06-i i::after{content:"";position:absolute;background:#d4af37;border-radius:9px;
      transition:transform .4s cubic-bezier(.22,1,.36,1)}
    .n06-i i::before{left:0;right:0;top:5px;height:1.6px}
    .n06-i i::after{top:0;bottom:0;left:5px;width:1.6px}
    .n06-i.open i::after{transform:scaleY(0)}
    .n06-i.open i::before{transform:rotate(180deg)}
    .n06-c{display:grid;grid-template-rows:0fr;transition:grid-template-rows .45s cubic-bezier(.22,1,.36,1)}
    .n06-i.open .n06-c{grid-template-rows:1fr}
    .n06-c p{overflow:hidden;margin:0;padding:0 14px;font-size:11.5px;line-height:1.6;color:#8a857c;
      transition:padding .45s cubic-bezier(.22,1,.36,1)}
    .n06-i.open .n06-c p{padding:0 14px 13px}`,
  js:function(root,ctx){
    root.querySelectorAll('.n06-i button').forEach(function(b){
      ctx.on(b,'click',function(){
        var it = b.parentElement, was = it.classList.contains('open');
        root.querySelectorAll('.n06-i').forEach(function(x){ x.classList.remove('open'); });
        it.classList.toggle('open', !was);
      });
    });
  }
},

{
  id:'n07', cat:'nav', title:'Modal com scale + backdrop',
  desc:'Entrada com mola, saída rápida. Fecha no ESC e no clique fora (estilo em Tailwind).',
  tags:['modal','spring','ESC','tailwind'], hint:'clique para abrir',
  html:`
    <div class="n07 relative w-full h-full grid place-items-center">
      <button class="n07-o px-[18px] py-[10px] rounded-[9px] bg-[#22201a] border border-[#34301f] text-[#efece6] text-[12.5px] font-semibold">Excluir projeto</button>
      <div class="n07-w absolute inset-0 grid place-items-center pointer-events-none">
        <div class="n07-bd absolute inset-0 bg-[rgba(4,4,8,.65)] opacity-0 transition-opacity duration-300"></div>
        <div class="n07-m relative w-[230px] p-[20px] rounded-[14px] bg-[#181820] border border-[#2e2a22] opacity-0 [transform:scale(.9)_translateY(10px)] transition-[opacity_.2s,transform_.25s_cubic-bezier(.65,0,.35,1)]">
          <b class="text-[15px] text-[#f5f2ec]">Excluir “Aurora”?</b>
          <p class="text-[12px] text-[#8a857c] mt-[6px] leading-[1.55]">Essa ação não pode ser desfeita. Todos os 42 arquivos serão removidos.</p>
          <div class="n07-a flex gap-[8px] mt-[16px] justify-end">
            <button class="c px-[14px] py-[8px] rounded-[8px] text-[12px] font-semibold bg-[#2b2721] text-[#e8e5df]">Cancelar</button>
            <button class="d px-[14px] py-[8px] rounded-[8px] text-[12px] font-semibold bg-[#e5645f] text-[#2a0710]">Excluir</button>
          </div>
        </div>
      </div>
    </div>`,
  css:`
    .n07.on .n07-w{pointer-events:auto}
    .n07.on .n07-bd{opacity:1}
    .n07.on .n07-m{opacity:1;transform:none;transition:opacity .28s,transform .45s cubic-bezier(.34,1.56,.64,1)}`,
  js:function(root,ctx){
    var box = root.querySelector('.n07');
    function open(){ box.classList.add('on'); }
    function close(){ box.classList.remove('on'); }
    ctx.on(root.querySelector('.n07-o'),'click',open);
    ctx.on(root.querySelector('.n07-bd'),'click',close);
    ctx.on(root.querySelector('.n07-a .c'),'click',close);
    ctx.on(root.querySelector('.n07-a .d'),'click',close);
    ctx.on(document,'keydown',function(e){ if (e.key === 'Escape') close(); });
  }
},

{
  id:'n08', cat:'nav', title:'Toasts empilhando',
  desc:'Entram pela direita, empurram os anteriores e saem sozinhos (estilo em Tailwind).',
  tags:['toast','stack','timeout','tailwind'], hint:'clique para disparar',
  html:`
    <div class="n08 relative w-full h-full grid place-items-center p-[14px]">
      <button class="n08-b px-[18px] py-[10px] rounded-[9px] bg-[#d4af37] text-[#1b1813] text-[12.5px] font-bold">Disparar toast</button>
      <div class="n08-st absolute right-[12px] bottom-[12px] flex flex-col gap-[8px] items-end"></div>
    </div>`,
  css:`
    .n08-t{display:flex;align-items:center;gap:9px;padding:9px 13px;border-radius:10px;
      background:#211e18;border:1px solid #332e21;font-size:12px;color:#e9e5dc;white-space:nowrap;
      animation:n08in .45s cubic-bezier(.34,1.56,.64,1) both}
    .n08-t.out{animation:n08out .3s cubic-bezier(.65,0,.35,1) forwards}
    .n08-t s{width:7px;height:7px;border-radius:50%;text-decoration:none}
    @keyframes n08in{from{opacity:0;transform:translateX(90px) scale(.9)}to{opacity:1;transform:none}}
    @keyframes n08out{to{opacity:0;transform:translateX(60px) scale(.95)}}`,
  js:function(root,ctx){
    var st = root.querySelector('.n08-st'), n = 0;
    var kinds = [['Arquivo salvo','#5cc88f'],['Convite enviado','#d4af37'],
                 ['Falha ao sincronizar','#e5645f'],['Cache limpo','#e8c96a']];
    ctx.on(root.querySelector('.n08-b'),'click',function(){
      var k = kinds[n++ % kinds.length];
      var t = document.createElement('div');
      t.className = 'n08-t';
      t.innerHTML = '<s style="background:' + k[1] + '"></s>' + k[0];
      st.appendChild(t);
      if (st.children.length > 3) st.firstChild.remove();
      ctx.wait(function(){
        t.classList.add('out');
        ctx.wait(function(){ t.remove(); }, 320);
      }, 2600);
    });
  }
},

{
  id:'n09', cat:'nav', title:'Bottom nav com bolha',
  desc:'O ícone ativo sobe, a bolha desliza e o rótulo aparece (estilo em Tailwind).',
  tags:['mobile','indicator','spring','tailwind'], hint:'clique nos ícones',
  html:`
    <div class="n09">
      <div class="n09-bar relative flex gap-[4px] px-[12px] py-[10px] rounded-[18px] bg-[#1a1814] border border-[#242119]">
        <span class="n09-bub absolute top-[8px] left-0 w-[52px] h-[44px] rounded-[13px] bg-[linear-gradient(140deg,#d4af3722,#b08ac922)] border border-[#d4af3744] transition-transform duration-500 ease-[cubic-bezier(.34,1.4,.64,1)]"></span>
        <button class="on relative z-[2] w-[52px] h-[44px] grid place-items-center gap-0 text-[#736f68] transition-colors duration-300"><svg viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5V21H3z"/></svg><b>Início</b></button>
        <button class="relative z-[2] w-[52px] h-[44px] grid place-items-center gap-0 text-[#736f68] transition-colors duration-300"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><b>Buscar</b></button>
        <button class="relative z-[2] w-[52px] h-[44px] grid place-items-center gap-0 text-[#736f68] transition-colors duration-300"><svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8z"/></svg><b>Salvos</b></button>
        <button class="relative z-[2] w-[52px] h-[44px] grid place-items-center gap-0 text-[#736f68] transition-colors duration-300"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg><b>Perfil</b></button>
      </div>
    </div>`,
  css:`
    .n09-bar button svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.8;
      stroke-linecap:round;stroke-linejoin:round;
      transition:transform .45s cubic-bezier(.34,1.56,.64,1)}
    .n09-bar button b{position:absolute;bottom:1px;font-size:8.5px;font-weight:600;opacity:0;
      transition:opacity .3s,transform .45s cubic-bezier(.34,1.56,.64,1);transform:translateY(6px)}
    .n09-bar button.on{color:#d4af37}
    .n09-bar button.on svg{transform:translateY(-6px) scale(1.05)}
    .n09-bar button.on b{opacity:1;transform:none}`,
  js:function(root,ctx){
    var bub = root.querySelector('.n09-bub'),
        btns = root.querySelectorAll('.n09-bar button');
    function move(b){ bub.style.transform = 'translateX(' + b.offsetLeft + 'px)'; }
    move(btns[0]);
    btns.forEach(function(b){
      ctx.on(b,'click',function(){
        btns.forEach(function(x){ x.classList.remove('on'); });
        b.classList.add('on'); move(b);
      });
    });
  }
},

{
  id:'n10', cat:'nav', title:'Dropdown com origem correta',
  desc:'transform-origin no canto do gatilho + itens em cascata (estilo em Tailwind).',
  tags:['dropdown','transform-origin','stagger','tailwind'], hint:'clique no botão',
  html:`
    <div class="n10 relative">
      <button class="n10-t flex items-center gap-[8px] px-[16px] py-[10px] rounded-[10px] bg-[#1d1b16] border border-[#2f2b23] text-[#ece9e3] text-[12.5px] font-semibold">Ordenar por <i class="not-italic text-[#d4af37] transition-transform duration-[.35s] ease-[cubic-bezier(.22,1,.36,1)]">▾</i></button>
      <ul class="n10-m absolute top-[calc(100%+8px)] left-0 w-[150px] m-0 p-[6px] list-none bg-[#1c1a15] border border-[#2d2921] rounded-[11px] shadow-[0_20px_50px_-25px_#000] origin-top-left [transform:scale(.86)_translateY(-6px)] opacity-0 pointer-events-none transition-[opacity_.2s,transform_.38s_cubic-bezier(.34,1.4,.64,1)]">
        <li>Mais recentes</li><li>Mais antigos</li><li>A–Z</li><li>Preço ↑</li><li>Preço ↓</li>
      </ul>
    </div>`,
  css:`
    .n10.on .n10-t i{transform:rotate(180deg)}
    .n10.on .n10-m{opacity:1;transform:none;pointer-events:auto}
    .n10-m li{padding:7px 10px;border-radius:7px;font-size:12px;color:#a19c92;cursor:pointer;
      opacity:0;transform:translateY(-5px);transition:all .3s cubic-bezier(.22,1,.36,1),background .15s}
    .n10.on .n10-m li{opacity:1;transform:none}
    .n10.on li:nth-child(1){transition-delay:.05s}
    .n10.on li:nth-child(2){transition-delay:.09s}
    .n10.on li:nth-child(3){transition-delay:.13s}
    .n10.on li:nth-child(4){transition-delay:.17s}
    .n10.on li:nth-child(5){transition-delay:.21s}
    .n10-m li:hover{background:#22201a;color:#fff}`,
  js:function(root,ctx){
    var box = root.querySelector('.n10');
    ctx.on(root.querySelector('.n10-t'),'click',function(e){
      e.stopPropagation(); box.classList.toggle('on');
    });
    ctx.on(document,'click',function(){ box.classList.remove('on'); });
    root.querySelectorAll('.n10-m li').forEach(function(li){
      ctx.on(li,'click',function(){
        root.querySelector('.n10-t').firstChild.nodeValue = li.textContent + ' ';
        box.classList.remove('on');
      });
    });
  }
},

{
  id:'n11', cat:'nav', title:'Carrossel com drag e inércia',
  desc:'Pointer events + atrito + snap no slide mais próximo (estilo em Tailwind).',
  tags:['drag','inertia','snap','tailwind'], hint:'arraste ←→',
  html:`
    <div class="n11 w-full h-full flex flex-col justify-center gap-[14px] overflow-hidden cursor-grab">
      <div class="n11-tr flex gap-[12px] pl-[20px] will-change-transform">
        <div class="n11-s flex-none w-[140px] h-[120px] rounded-[14px] bg-[var(--c)] grid place-items-center [font-family:var(--mono)] text-[22px] text-[#ffffff44] border border-[#ffffff12] select-none transition-transform duration-[.4s] ease-[cubic-bezier(.22,1,.36,1)]" style="--c:#2b2618">01</div>
        <div class="n11-s flex-none w-[140px] h-[120px] rounded-[14px] bg-[var(--c)] grid place-items-center [font-family:var(--mono)] text-[22px] text-[#ffffff44] border border-[#ffffff12] select-none transition-transform duration-[.4s] ease-[cubic-bezier(.22,1,.36,1)]" style="--c:#362540">02</div>
        <div class="n11-s flex-none w-[140px] h-[120px] rounded-[14px] bg-[var(--c)] grid place-items-center [font-family:var(--mono)] text-[22px] text-[#ffffff44] border border-[#ffffff12] select-none transition-transform duration-[.4s] ease-[cubic-bezier(.22,1,.36,1)]" style="--c:#1e352a">03</div>
        <div class="n11-s flex-none w-[140px] h-[120px] rounded-[14px] bg-[var(--c)] grid place-items-center [font-family:var(--mono)] text-[22px] text-[#ffffff44] border border-[#ffffff12] select-none transition-transform duration-[.4s] ease-[cubic-bezier(.22,1,.36,1)]" style="--c:#3f2a1d">04</div>
        <div class="n11-s flex-none w-[140px] h-[120px] rounded-[14px] bg-[var(--c)] grid place-items-center [font-family:var(--mono)] text-[22px] text-[#ffffff44] border border-[#ffffff12] select-none transition-transform duration-[.4s] ease-[cubic-bezier(.22,1,.36,1)]" style="--c:#2c2822">05</div>
      </div>
      <div class="n11-dots flex gap-[6px] justify-center"><i class="on"></i><i></i><i></i><i></i><i></i></div>
    </div>`,
  css:`
    .n11.drag{cursor:grabbing}
    .n11-dots i{width:6px;height:6px;border-radius:9px;background:#302c24;transition:all .35s}
    .n11-dots i.on{width:18px;background:#d4af37}`,
  js:function(root,ctx){
    var box = root.querySelector('.n11'),
        tr = root.querySelector('.n11-tr'),
        dots = root.querySelectorAll('.n11-dots i'),
        W = 152;                                   // largura do slide + gap
    var x = 0, target = 0, down = false, sx = 0, sxa = 0, vel = 0, last = 0, max;
    ctx.wait(function(){ max = -(tr.scrollWidth - box.clientWidth + 20); }, 30);

    ctx.on(box,'pointerdown',function(e){
      down = true; sx = e.clientX; sxa = x; vel = 0; last = e.clientX;
      box.classList.add('drag'); box.setPointerCapture(e.pointerId);
    });
    ctx.on(box,'pointermove',function(e){
      if (!down) return;
      x = sxa + (e.clientX - sx);
      vel = e.clientX - last; last = e.clientX;
      target = x;
    });
    ctx.on(box,'pointerup',function(){
      down = false; box.classList.remove('drag');
      target = Math.round((x + vel * 6) / W) * W;   // snap com impulso
      target = Math.max(max || -600, Math.min(0, target));
    });
    ctx.loop(function(){
      if (!down) x += (target - x) * .12;
      tr.style.transform = 'translate3d(' + x.toFixed(2) + 'px,0,0)';
      var idx = Math.min(dots.length - 1, Math.max(0, Math.round(-x / W)));
      dots.forEach(function(d,i){ d.classList.toggle('on', i === idx); });
    });
  }
},

{
  id:'f01', cat:'fundos', title:'Mesh gradient animado',
  desc:'Quatro radiais coloridas em blur, cada uma com seu ciclo. Zero JS (estilo em Tailwind).',
  tags:['radial-gradient','blur','CSS only','tailwind'], stage:'flush',
  html:`
    <div class="f01 relative w-full h-full overflow-hidden bg-[#0d0c0b] grid place-items-center">
      <i class="absolute w-[230px] h-[230px] rounded-full blur-[58px] opacity-75 mix-blend-screen bg-[#d4af37] top-[-70px] left-[-50px] animate-[f01a_9s_ease-in-out_infinite_alternate]"></i>
      <i class="absolute w-[230px] h-[230px] rounded-full blur-[58px] opacity-75 mix-blend-screen bg-[#b08ac9] bottom-[-90px] right-[-40px] animate-[f01b_11s_ease-in-out_infinite_alternate]"></i>
      <i class="absolute w-[230px] h-[230px] rounded-full blur-[58px] opacity-75 mix-blend-screen bg-[#cf9b6a] top-[30px] right-[-70px] animate-[f01c_13s_ease-in-out_infinite_alternate]"></i>
      <i class="absolute w-[230px] h-[230px] rounded-full blur-[58px] opacity-75 mix-blend-screen bg-[#5cc88f] bottom-[-40px] left-[-20px] animate-[f01d_10s_ease-in-out_infinite_alternate]"></i>
      <b class="relative z-[2] text-[26px] font-extrabold tracking-[.3em] text-[#0b0b14] mix-blend-overlay">mesh</b>
    </div>`,
  css:`
    @keyframes f01a{to{transform:translate(90px,70px) scale(1.25)}}
    @keyframes f01b{to{transform:translate(-70px,-60px) scale(1.15)}}
    @keyframes f01c{to{transform:translate(-90px,90px) scale(.85)}}
    @keyframes f01d{to{transform:translate(80px,-70px) scale(1.2)}}`
},

{
  id:'f02', cat:'fundos', title:'Blobs orgânicos',
  desc:'border-radius de 8 valores animado — parece morph de SVG e custa menos (estilo em Tailwind).',
  tags:['border-radius','morph','CSS only','tailwind'],
  html:`
    <div class="f02 relative w-[200px] h-[200px] grid place-items-center">
      <i class="b1 absolute w-[150px] h-[150px] mix-blend-screen bg-[linear-gradient(140deg,#d4af37,#b8871f)] animate-[f02_8s_ease-in-out_infinite]"></i>
      <i class="b2 absolute w-[150px] h-[150px] mix-blend-screen bg-[linear-gradient(140deg,#b08ac9,#6f4f86)] animate-[f02_8s_ease-in-out_infinite] [animation-delay:-2.6s] scale-[.85]"></i>
      <i class="b3 absolute w-[150px] h-[150px] mix-blend-screen bg-[linear-gradient(140deg,#5cc88f,#2f7d55)] animate-[f02_8s_ease-in-out_infinite] [animation-delay:-5.2s] scale-[.7]"></i>
    </div>`,
  css:`
    @keyframes f02{
      0%,100%{border-radius:62% 38% 46% 54%/54% 46% 62% 38%;rotate:0deg}
      33%{border-radius:38% 62% 63% 37%/41% 64% 36% 59%;rotate:120deg}
      66%{border-radius:55% 45% 32% 68%/70% 33% 67% 30%;rotate:240deg}}`
},

{
  id:'f03', cat:'fundos', title:'Constelação de partículas',
  desc:'Pontos ligados por linhas quando estão perto; o mouse os empurra (container em Tailwind).',
  tags:['canvas','particles','rAF','tailwind'], stage:'flush', hint:'mova o mouse',
  html:`<canvas class="f03 w-full h-full block bg-[#0a0908]"></canvas>`,
  css:``,
  js:function(root,ctx){
    var cv = root.querySelector('.f03'), c = cv.getContext('2d');
    var w = cv.width = cv.offsetWidth, h = cv.height = cv.offsetHeight;
    var m = { x:-999, y:-999 }, P = [];
    for (var i = 0; i < 55; i++)
      P.push({ x:Math.random()*w, y:Math.random()*h, vx:(Math.random()-.5)*.5, vy:(Math.random()-.5)*.5 });

    ctx.on(cv,'mousemove',function(e){
      var r = cv.getBoundingClientRect(); m.x = e.clientX - r.left; m.y = e.clientY - r.top;
    });
    ctx.on(cv,'mouseleave',function(){ m.x = m.y = -999; });

    ctx.loop(function(){
      c.clearRect(0,0,w,h);
      for (var i = 0; i < P.length; i++){
        var p = P[i];
        var dx = p.x - m.x, dy = p.y - m.y, d = Math.hypot(dx,dy);
        if (d < 90){ p.vx += dx/d*.35; p.vy += dy/d*.35; }
        p.vx *= .97; p.vy *= .97;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        for (var j = i+1; j < P.length; j++){
          var q = P[j], dd = Math.hypot(p.x-q.x, p.y-q.y);
          if (dd < 78){
            c.strokeStyle = 'rgba(212,175,55,' + (.35*(1-dd/78)) + ')';
            c.beginPath(); c.moveTo(p.x,p.y); c.lineTo(q.x,q.y); c.stroke();
          }
        }
        c.fillStyle = '#e4dcc9'; c.beginPath(); c.arc(p.x,p.y,1.5,0,6.284); c.fill();
      }
    });
  }
},

{
  id:'f04', cat:'fundos', title:'Grade de pontos reativa',
  desc:'Cada ponto cresce e é atraído pelo cursor. Padrão de fundo "vivo" (container em Tailwind).',
  tags:['canvas','grid','mouse','tailwind'], stage:'flush', hint:'mova o mouse',
  html:`<canvas class="f04 w-full h-full block bg-[#0d0c0b]"></canvas>`,
  css:``,
  js:function(root,ctx){
    var cv = root.querySelector('.f04'), c = cv.getContext('2d');
    var w = cv.width = cv.offsetWidth, h = cv.height = cv.offsetHeight;
    var G = 22, m = { x:-999, y:-999 }, pts = [];
    for (var y = G/2; y < h; y += G)
      for (var x = G/2; x < w; x += G) pts.push({ x:x, y:y, ox:x, oy:y });

    ctx.on(cv,'mousemove',function(e){
      var r = cv.getBoundingClientRect(); m.x = e.clientX - r.left; m.y = e.clientY - r.top;
    });
    ctx.on(cv,'mouseleave',function(){ m.x = m.y = -999; });

    ctx.loop(function(){
      c.clearRect(0,0,w,h);
      pts.forEach(function(p){
        var dx = m.x - p.ox, dy = m.y - p.oy, d = Math.hypot(dx,dy);
        var f = Math.max(0, 1 - d/110);
        p.x += ((p.ox + dx*f*.42) - p.x) * .18;
        p.y += ((p.oy + dy*f*.42) - p.y) * .18;
        var r = 1 + f*3.2;
        c.fillStyle = f > .02 ? 'rgba(176,138,201,' + (.35 + f*.65) + ')' : 'rgba(110,100,84,.4)';
        c.beginPath(); c.arc(p.x, p.y, r, 0, 6.284); c.fill();
      });
    });
  }
},

{
  id:'f05', cat:'fundos', title:'Aurora',
  desc:'Faixas em blur pesado com rotação lenta e blend screen (estilo em Tailwind).',
  tags:['blur','blend-mode','CSS only','tailwind'], stage:'flush',
  html:`
    <div class="f05 relative w-full h-full overflow-hidden bg-[#070605] grid place-items-center">
      <i class="absolute left-[-40%] right-[-40%] h-[120px] blur-[42px] opacity-60 mix-blend-screen rounded-full top-[20px] bg-[linear-gradient(90deg,transparent,#5cc88f,#b8871f,transparent)] animate-[f05a_8s_ease-in-out_infinite_alternate]"></i>
      <i class="absolute left-[-40%] right-[-40%] h-[120px] blur-[42px] opacity-60 mix-blend-screen rounded-full top-[80px] bg-[linear-gradient(90deg,transparent,#b08ac9,#cf9b6a,transparent)] animate-[f05b_11s_ease-in-out_infinite_alternate]"></i>
      <i class="absolute left-[-40%] right-[-40%] h-[120px] blur-[42px] opacity-60 mix-blend-screen rounded-full top-[140px] bg-[linear-gradient(90deg,transparent,#d4af37,#8a6fb0,transparent)] animate-[f05c_9s_ease-in-out_infinite_alternate]"></i>
      <span class="relative z-[2] [font-family:var(--mono)] text-[11px] tracking-[.4em] uppercase text-[#ddd6c499]">aurora</span>
    </div>`,
  css:`
    @keyframes f05a{to{transform:translateY(24px) rotate(-6deg) scaleY(1.5)}}
    @keyframes f05b{to{transform:translateY(-30px) rotate(5deg) scaleY(1.8)}}
    @keyframes f05c{to{transform:translateY(-50px) rotate(-4deg) scaleY(1.3)}}`
},

{
  id:'f06', cat:'fundos', title:'Grain / ruído de filme',
  desc:'Ruído gerado em canvas e reciclado a ~12fps — textura analógica (estilo em Tailwind).',
  tags:['canvas','noise','overlay','tailwind'], stage:'flush',
  html:`
    <div class="f06 relative w-full h-full overflow-hidden">
      <div class="f06-bg absolute inset-0 grid place-items-center bg-[linear-gradient(140deg,#3c3050,#221d13_60%,#0d0c0b)]"><b class="text-[28px] font-extrabold tracking-[.28em] text-[#ffffff22]">GRAIN</b></div>
      <canvas class="f06-n absolute inset-0 w-full h-full opacity-[.42] mix-blend-overlay pointer-events-none"></canvas>
    </div>`,
  css:``,
  js:function(root,ctx){
    var cv = root.querySelector('.f06-n'), c = cv.getContext('2d');
    var w = cv.width = 160, h = cv.height = 160;   // pequeno e esticado por CSS = barato
    var buf = c.createImageData(w,h), d = buf.data;
    var frames = [], F = 5;
    for (var f = 0; f < F; f++){
      for (var i = 0; i < d.length; i += 4){
        var v = 40 + Math.random() * 215;
        d[i] = d[i+1] = d[i+2] = v; d[i+3] = 255;
      }
      var off = document.createElement('canvas'); off.width = w; off.height = h;
      off.getContext('2d').putImageData(buf, 0, 0);
      frames.push(off);
    }
    var k = 0;
    ctx.every(function(){
      c.drawImage(frames[k++ % F], 0, 0);
    }, 80);
  }
},

{
  id:'f07', cat:'fundos', title:'Ondas SVG',
  desc:'Três paths em fase diferente. Loop perfeito por translateX de -50% (estilo em Tailwind).',
  tags:['SVG','wave','loop','tailwind'], stage:'flush',
  html:`
    <div class="f07 relative w-full h-full overflow-hidden bg-[linear-gradient(#171410,#201c13)]">
      <svg class="absolute bottom-0 left-0 w-[200%] h-[130px]" viewBox="0 0 1200 200" preserveAspectRatio="none">
        <path class="w1" d="M0,120 C150,80 350,160 600,120 C850,80 1050,160 1200,120 L1200,200 L0,200Z"/>
        <path class="w2" d="M0,140 C200,100 400,180 600,140 C800,100 1000,180 1200,140 L1200,200 L0,200Z"/>
        <path class="w3" d="M0,160 C180,130 380,190 600,160 C820,130 1020,190 1200,160 L1200,200 L0,200Z"/>
      </svg>
      <b class="absolute top-[34px] left-0 right-0 text-center text-[11px] [font-family:var(--mono)] tracking-[.4em] uppercase text-[#d4af3799]">ondas</b>
    </div>`,
  css:`
    .f07 path{transform-origin:0 0}
    .f07 .w1{fill:#3a3320;animation:f07 7s ease-in-out infinite alternate}
    .f07 .w2{fill:#4a4028;opacity:.75;animation:f07 5s ease-in-out infinite alternate-reverse}
    .f07 .w3{fill:#6b5a35;opacity:.6;animation:f07 9s ease-in-out infinite alternate}
    @keyframes f07{from{transform:translateX(0) scaleY(1)}to{transform:translateX(-14%) scaleY(1.18)}}`
},

{
  id:'f08', cat:'fundos', title:'Starfield / hiperespaço',
  desc:'Projeção em perspectiva: as estrelas aceleram do centro para fora (container em Tailwind).',
  tags:['canvas','3D','projection','tailwind'], stage:'flush', hint:'mova o mouse p/ acelerar',
  html:`<canvas class="f08 w-full h-full block bg-[#060504] cursor-crosshair"></canvas>`,
  css:``,
  js:function(root,ctx){
    var cv = root.querySelector('.f08'), c = cv.getContext('2d');
    var w = cv.width = cv.offsetWidth, h = cv.height = cv.offsetHeight;
    var N = 220, S = [], speed = 1.2, target = 1.2;
    for (var i = 0; i < N; i++) S.push(reset({}));
    function reset(s){
      s.x = (Math.random()-.5) * w * 1.6;
      s.y = (Math.random()-.5) * h * 1.6;
      s.z = Math.random() * w;
      s.pz = s.z;
      return s;
    }
    ctx.on(cv,'mouseenter',function(){ target = 9; });
    ctx.on(cv,'mouseleave',function(){ target = 1.2; });
    ctx.loop(function(){
      speed += (target - speed) * .05;
      c.fillStyle = 'rgba(6,5,4,.35)';
      c.fillRect(0,0,w,h);
      c.save(); c.translate(w/2, h/2);
      S.forEach(function(s){
        s.pz = s.z; s.z -= speed * 6;
        if (s.z < 1){ reset(s); s.pz = s.z; }
        var k = 128 / s.z, pk = 128 / s.pz;
        var x = s.x * k, y = s.y * k, px = s.x * pk, py = s.y * pk;
        var a = Math.min(1, (1 - s.z / w) * 1.4);
        c.strokeStyle = 'rgba(236,226,198,' + a + ')';
        c.lineWidth = Math.max(.6, 2.4 * (1 - s.z / w));
        c.beginPath(); c.moveTo(px,py); c.lineTo(x,y); c.stroke();
      });
      c.restore();
    });
  }
},

{
  id:'f09', cat:'fundos', title:'Ondas de água no clique',
  desc:'Ripples concêntricos com decaimento — cada clique gera uma nova (container em Tailwind).',
  tags:['canvas','ripple','click','tailwind'], stage:'flush', hint:'clique no quadro',
  html:`<canvas class="f09 w-full h-full block bg-[radial-gradient(60%_70%_at_50%_40%,#201c12,#0a0908)] cursor-pointer"></canvas>`,
  css:``,
  js:function(root,ctx){
    var cv = root.querySelector('.f09'), c = cv.getContext('2d');
    var w = cv.width = cv.offsetWidth, h = cv.height = cv.offsetHeight;
    var R = [];
    function add(x,y){ R.push({ x:x, y:y, r:0, a:1 }); if (R.length > 14) R.shift(); }
    ctx.on(cv,'pointerdown',function(e){
      var b = cv.getBoundingClientRect(); add(e.clientX - b.left, e.clientY - b.top);
    });
    ctx.every(function(){ add(Math.random()*w, Math.random()*h); }, 1600);
    ctx.loop(function(){
      c.clearRect(0,0,w,h);
      R.forEach(function(o){
        o.r += 1.9; o.a *= .985;
        for (var k = 0; k < 3; k++){
          var rr = o.r - k*13;
          if (rr <= 0) continue;
          c.strokeStyle = 'rgba(212,175,55,' + (o.a * (1 - k*.3) * .8) + ')';
          c.lineWidth = 1.4 - k*.35;
          c.beginPath(); c.arc(o.x, o.y, rr, 0, 6.284); c.stroke();
        }
      });
      R = R.filter(function(o){ return o.a > .04; });
    });
  }
},

{
  id:'f10', cat:'fundos', title:'Spotlight da seção',
  desc:'Uma máscara radial revela o conteúdo só onde o cursor está (estilo em Tailwind).',
  tags:['mask','radial-gradient','mouse','tailwind'], stage:'flush', hint:'mova o mouse',
  html:`
    <div class="f10 relative w-full h-full overflow-hidden bg-[#0d0c0b]">
      <div class="f10-base absolute inset-0 grid grid-cols-2 content-center gap-[14px] p-[26px] text-[19px] font-extrabold tracking-[-.02em] text-[#201d17]">
        <span>PRODUTO</span><span>PREÇO</span><span>DOCS</span><span>API</span>
        <span>BLOG</span><span>SUPORTE</span><span>STATUS</span><span>LEGAL</span>
      </div>
      <div class="f10-lit absolute inset-0 grid grid-cols-2 content-center gap-[14px] p-[26px] text-[19px] font-extrabold tracking-[-.02em] text-[#d4af37]">
        <span>PRODUTO</span><span>PREÇO</span><span>DOCS</span><span>API</span>
        <span>BLOG</span><span>SUPORTE</span><span>STATUS</span><span>LEGAL</span>
      </div>
    </div>`,
  css:`
    .f10-lit{
      -webkit-mask-image:radial-gradient(120px circle at var(--x,-999px) var(--y,-999px),#000 0%,transparent 70%);
      mask-image:radial-gradient(120px circle at var(--x,-999px) var(--y,-999px),#000 0%,transparent 70%)}`,
  js:function(root,ctx){
    var box = root.querySelector('.f10'), lit = root.querySelector('.f10-lit');
    ctx.on(box,'mousemove',function(e){
      var r = box.getBoundingClientRect();
      lit.style.setProperty('--x', (e.clientX - r.left) + 'px');
      lit.style.setProperty('--y', (e.clientY - r.top) + 'px');
    });
    ctx.on(box,'mouseleave',function(){ lit.style.setProperty('--x','-999px'); });
  }
},

{
  id:'x01', cat:'estado', title:'Botão: enviar → carregando → ok',
  desc:'Três estados numa largura que se ajusta. O check é desenhado no SVG (estilo em Tailwind).',
  tags:['loading','state machine','SVG','tailwind'], hint:'clique',
  html:`
    <button class="x01 relative grid place-items-center h-[46px] w-[170px] rounded-[12px] bg-[#d4af37] text-[#1b1813] text-[13.5px] font-bold overflow-hidden transition-[width_.45s_cubic-bezier(.22,1,.36,1),background_.35s,border-radius_.45s]">
      <span class="t">Enviar pedido</span>
      <span class="sp"></span>
      <svg class="ck" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
    </button>`,
  css:`
    .x01>*{grid-area:1/1;transition:opacity .25s,transform .35s cubic-bezier(.34,1.56,.64,1)}
    .x01 .sp,.x01 .ck{opacity:0;transform:scale(.6)}
    .x01.load{width:46px;border-radius:50%}
    .x01.load .t{opacity:0;transform:scale(.8)}
    .x01.load .sp{opacity:1;transform:none}
    .x01.done{width:46px;border-radius:50%;background:#5cc88f}
    .x01.done .t,.x01.done .sp{opacity:0}
    .x01.done .ck{opacity:1;transform:none}
    .x01 .sp{width:20px;height:20px;border:2.5px solid rgba(7,18,28,.25);border-top-color:#1b1813;
      border-radius:50%;animation:x01s .7s linear infinite}
    .x01 .ck{width:24px;height:24px;fill:none;stroke:#052e22;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
    .x01 .ck path{stroke-dasharray:26;stroke-dashoffset:26}
    .x01.done .ck path{animation:x01d .45s cubic-bezier(.65,0,.35,1) .1s forwards}
    @keyframes x01s{to{transform:rotate(360deg)}}
    @keyframes x01d{to{stroke-dashoffset:0}}`,
  js:function(root,ctx){
    var b = root.querySelector('.x01');
    ctx.on(b,'click',function(){
      if (b.className !== 'x01') return;
      b.classList.add('load');
      ctx.wait(function(){
        b.classList.remove('load'); b.classList.add('done');
        ctx.wait(function(){ b.className = 'x01'; }, 2200);
      }, 1600);
    });
  }
},

{
  id:'x02', cat:'estado', title:'Shake de erro',
  desc:'Sacudida curta e assimétrica + borda vermelha. Nunca passe de 400ms (estilo em Tailwind).',
  tags:['error','shake','validation','tailwind'], hint:'clique em entrar',
  html:`
    <form class="x02 w-[220px] flex flex-col gap-[12px]" onsubmit="return false">
      <div class="x02-f relative"><input class="w-full px-[13px] py-[11px] rounded-[10px] bg-[#1a1814] border border-[#2b2721] text-[#efece6] text-[13px] outline-0 transition-[border-color_.25s,background_.25s] focus:border-[#d4af37]" placeholder="e-mail" value="raffa@"><small>e-mail inválido</small></div>
      <div class="x02-f relative"><input class="w-full px-[13px] py-[11px] rounded-[10px] bg-[#1a1814] border border-[#2b2721] text-[#efece6] text-[13px] outline-0 transition-[border-color_.25s,background_.25s] focus:border-[#d4af37]" type="password" autocomplete="current-password" placeholder="senha" value="123"><small>mínimo 8 caracteres</small></div>
      <button class="p-[11px] rounded-[10px] bg-[#d4af37] text-[#1b1813] font-bold text-[13px] mt-[4px]">Entrar</button>
    </form>`,
  css:`
    .x02-f small{position:absolute;left:2px;top:calc(100% + 3px);font-size:10.5px;color:#e5645f;
      opacity:0;transform:translateY(-4px);transition:all .25s}
    .x02-f.bad small{opacity:1;transform:none}
    .x02-f.bad input{border-color:#e5645f;background:#1d1216;animation:x02 .38s cubic-bezier(.36,.07,.19,.97)}
    @keyframes x02{
      10%,90%{transform:translateX(-2px)}
      20%,80%{transform:translateX(4px)}
      30%,50%,70%{transform:translateX(-7px)}
      40%,60%{transform:translateX(7px)}}`,
  js:function(root,ctx){
    var fs = root.querySelectorAll('.x02-f');
    ctx.on(root.querySelector('button'),'click',function(){
      fs.forEach(function(f,i){
        f.classList.remove('bad');
        void f.offsetWidth;                      // reinicia a animação
        ctx.wait(function(){ f.classList.add('bad'); }, i * 90);
      });
    });
  }
},

{
  id:'x03', cat:'estado', title:'Label flutuante',
  desc:':placeholder-shown resolve tudo em CSS puro, sem JS de estado (estilo em Tailwind).',
  tags:['form',':placeholder-shown','CSS only','tailwind'], hint:'clique e digite',
  html:`
    <div class="x03 w-[220px] flex flex-col gap-[16px]">
      <div class="x03-f relative"><input class="w-full pt-[18px] pb-[8px] px-[13px] rounded-[10px] bg-[#1a1814] border border-[#2b2721] text-[#efece6] text-[13px] outline-0 transition-[border-color] duration-[.25s] focus:border-[#d4af37]" id="x03a" placeholder=" "><label for="x03a">Nome completo</label></div>
      <div class="x03-f relative"><input class="w-full pt-[18px] pb-[8px] px-[13px] rounded-[10px] bg-[#1a1814] border border-[#2b2721] text-[#efece6] text-[13px] outline-0 transition-[border-color] duration-[.25s] focus:border-[#d4af37]" id="x03b" placeholder=" " value="raffa@empresa.com"><label for="x03b">E-mail</label></div>
    </div>`,
  css:`
    .x03 label{position:absolute;left:13px;top:14px;font-size:13px;color:#736f68;pointer-events:none;
      transform-origin:0 0;transition:transform .28s cubic-bezier(.22,1,.36,1),color .25s}
    .x03 input:focus + label,
    .x03 input:not(:placeholder-shown) + label{transform:translateY(-9px) scale(.76);color:#d4af37}`
},

{
  id:'x04', cat:'estado', title:'Like com explosão de partículas',
  desc:'Coração com mola + 8 partículas radiais geradas na hora (estilo em Tailwind).',
  tags:['burst','spring','particles','tailwind'], hint:'clique no coração',
  html:`
    <div class="x04 flex items-center gap-[12px]">
      <button class="x04-b relative w-[56px] h-[56px] grid place-items-center">
        <svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8z"/></svg>
      </button>
      <b class="x04-n text-[15px] font-bold text-[#ccc7bc] tabular-nums transition-colors duration-300">128</b>
    </div>`,
  css:`
    .x04-b svg{width:30px;height:30px;fill:none;stroke:#736f68;stroke-width:1.8;
      transition:stroke .25s,fill .25s,transform .4s cubic-bezier(.34,1.56,.64,1)}
    .x04-b.on svg{fill:#e5645f;stroke:#e5645f;animation:x04 .55s cubic-bezier(.34,1.56,.64,1)}
    .x04-p{position:absolute;width:5px;height:5px;border-radius:50%;pointer-events:none;
      animation:x04p .62s cubic-bezier(.22,1,.36,1) forwards}
    .x04-n.on{color:#e5645f}
    @keyframes x04{0%{transform:scale(1)}35%{transform:scale(.82)}70%{transform:scale(1.25)}100%{transform:scale(1)}}
    @keyframes x04p{from{transform:translate(0,0) scale(1);opacity:1}
      to{transform:translate(var(--dx),var(--dy)) scale(0);opacity:0}}`,
  js:function(root,ctx){
    var b = root.querySelector('.x04-b'), n = root.querySelector('.x04-n'), v = 128;
    ctx.on(b,'click',function(){
      var on = b.classList.toggle('on');
      n.classList.toggle('on', on);
      n.textContent = (v += on ? 1 : -1);
      if (!on) return;
      for (var i = 0; i < 9; i++){
        var s = document.createElement('span'), a = (i/9) * Math.PI * 2, d = 26 + Math.random()*14;
        s.className = 'x04-p';
        s.style.cssText = 'background:' + ['#e5645f','#cf9b6a','#e8c96a'][i%3] +
          ';--dx:' + (Math.cos(a)*d).toFixed(1) + 'px;--dy:' + (Math.sin(a)*d).toFixed(1) + 'px' +
          ';animation-delay:' + (i*8) + 'ms';
        b.appendChild(s);
        s.addEventListener('animationend', function(){ this.remove(); });
      }
    });
  }
},

{
  id:'x05', cat:'estado', title:'Toggle com física',
  desc:'A bolinha estica no meio do caminho (squash) e assenta com mola (estilo em Tailwind).',
  tags:['toggle','spring','squash','tailwind'], hint:'clique',
  html:`
    <div class="x05 flex flex-col gap-[18px] items-center">
      <label class="x05-s cursor-pointer"><input type="checkbox" checked><i></i></label>
      <label class="x05-s alt cursor-pointer"><input type="checkbox"><i></i></label>
    </div>`,
  css:`
    .x05-s input{position:absolute;opacity:0;pointer-events:none}
    .x05-s i{display:block;width:62px;height:34px;border-radius:99px;background:#2a2620;padding:4px;
      transition:background .35s cubic-bezier(.22,1,.36,1)}
    .x05-s i::after{content:"";display:block;width:26px;height:26px;border-radius:99px;background:#fff;
      transition:transform .48s cubic-bezier(.34,1.5,.5,1),width .3s cubic-bezier(.34,1.5,.5,1)}
    .x05-s:active i::after{width:34px}
    .x05-s input:checked + i{background:#5cc88f}
    .x05-s input:checked + i::after{transform:translateX(28px)}
    .x05-s:active input:checked + i::after{transform:translateX(20px)}
    .x05-s.alt input:checked + i{background:#b08ac9}
    .x05-s.alt i::after{border-radius:9px}`
},

{
  id:'x06', cat:'estado', title:'Copiar com confirmação',
  desc:'O ícone morfa para check e o rótulo desliza. Volta sozinho em 1,6s (estilo em Tailwind).',
  tags:['clipboard','morph','feedback','tailwind'], hint:'clique em copiar',
  html:`
    <div class="x06 flex flex-col gap-[12px] items-center">
      <pre class="x06-c m-0 px-[16px] py-[12px] rounded-[10px] bg-[#141312] border border-[#24211a] [font-family:var(--mono)] text-[12.5px] text-[#dcd0a8]">npm i motion-db</pre>
      <button class="x06-b relative flex items-center gap-[8px] py-[9px] pr-[15px] pl-[34px] rounded-[9px] bg-[#221f19] border border-[#2e2a22] text-[12.5px] font-semibold text-[#e8e5df] transition-[background_.3s,border-color_.3s,color_.3s]">
        <svg class="i1" viewBox="0 0 24 24"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        <svg class="i2" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
        <span class="block h-[1.35em] overflow-hidden"><i>Copiar</i><i>Copiado!</i></span>
      </button>
    </div>`,
  css:`
    .x06-b.ok{background:#0f2b21;border-color:#5cc88f55;color:#5cc88f}
    .x06-b svg{width:15px;height:15px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;
      stroke-linejoin:round;transition:opacity .25s,transform .35s cubic-bezier(.34,1.56,.64,1);
      position:absolute;left:13px;top:50%;margin-top:-7.5px;display:block}
    .x06-b .i2{opacity:0;transform:scale(.5) rotate(-30deg)}
    .x06-b.ok .i1{opacity:0;transform:scale(.5) rotate(30deg)}
    .x06-b.ok .i2{opacity:1;transform:none}
    .x06-b i{display:block;height:1.35em;line-height:1.35em;font-style:normal;
      transition:transform .4s cubic-bezier(.22,1,.36,1)}
    .x06-b.ok i{transform:translateY(-100%)}`,
  js:function(root,ctx){
    var b = root.querySelector('.x06-b'), txt = root.querySelector('.x06-c').textContent;
    ctx.on(b,'click',function(){
      if (navigator.clipboard) navigator.clipboard.writeText(txt).catch(function(){});
      b.classList.add('ok');
      ctx.wait(function(){ b.classList.remove('ok'); }, 1600);
    });
  }
},

{
  id:'x07', cat:'estado', title:'Drag & drop com placeholder',
  desc:'O item some do fluxo, um vazio abre espaço e a solta encaixa com mola (estilo em Tailwind).',
  tags:['drag','pointer events','drop','tailwind'], hint:'arraste os cards',
  html:`
    <div class="x07 flex gap-[10px] w-full p-[14px] items-start">
      <div class="x07-col flex-1 min-h-[150px] p-[10px] rounded-[12px] bg-[#171510] border border-dashed border-[#2a2620] transition-[background_.25s,border-color_.25s]" data-c="A"><b class="block text-[10.5px] uppercase tracking-[.1em] text-[#6b675f] mb-[9px]">A fazer</b><div class="x07-i">Escrever briefing</div><div class="x07-i">Coletar refs</div></div>
      <div class="x07-col flex-1 min-h-[150px] p-[10px] rounded-[12px] bg-[#171510] border border-dashed border-[#2a2620] transition-[background_.25s,border-color_.25s]" data-c="B"><b class="block text-[10.5px] uppercase tracking-[.1em] text-[#6b675f] mb-[9px]">Feito</b><div class="x07-i">Setup do repo</div></div>
    </div>`,
  css:`
    .x07-col.hot{background:#191611;border-color:#d4af3788}
    .x07-i{padding:10px;margin-bottom:7px;border-radius:9px;background:#221f19;border:1px solid #2e2a22;
      font-size:12px;color:#d8d3c8;cursor:grab;touch-action:none;
      animation:x07 .4s cubic-bezier(.34,1.56,.64,1)}
    .x07-i.drag{position:fixed;z-index:99;pointer-events:none;cursor:grabbing;width:120px;
      box-shadow:0 18px 40px -14px #000;transform:rotate(-3deg) scale(1.04);animation:none}
    .x07-ph{height:36px;margin-bottom:7px;border-radius:9px;border:1px dashed #d4af3755;background:#d4af370e}
    @keyframes x07{from{transform:scale(.94);opacity:0}}`,
  js:function(root,ctx){
    var cur = null, ph = null, ox = 0, oy = 0;
    function grab(e){
      var it = e.target.closest('.x07-i'); if (!it) return;
      cur = it;
      var r = it.getBoundingClientRect();
      ox = e.clientX - r.left; oy = e.clientY - r.top;
      ph = document.createElement('div'); ph.className = 'x07-ph';
      it.parentNode.insertBefore(ph, it);
      it.classList.add('drag');
      it.style.left = r.left + 'px'; it.style.top = r.top + 'px';
      root.setPointerCapture(e.pointerId);
    }
    function move(e){
      if (!cur) return;
      cur.style.left = (e.clientX - ox) + 'px';
      cur.style.top  = (e.clientY - oy) + 'px';
      root.querySelectorAll('.x07-col').forEach(function(c){
        var r = c.getBoundingClientRect();
        var hot = e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom;
        c.classList.toggle('hot', hot);
        if (hot) c.appendChild(ph);
      });
    }
    function drop(){
      if (!cur) return;
      ph.parentNode.insertBefore(cur, ph);
      ph.remove();
      cur.classList.remove('drag');
      cur.style.left = cur.style.top = '';
      root.querySelectorAll('.x07-col').forEach(function(c){ c.classList.remove('hot'); });
      cur = null;
    }
    ctx.on(root,'pointerdown',grab);
    ctx.on(root,'pointermove',move);
    ctx.on(root,'pointerup',drop);
    ctx.on(root,'pointercancel',drop);
  }
},

{
  id:'x08', cat:'estado', title:'Reorder de lista com FLIP',
  desc:'First-Last-Invert-Play: mede antes e depois e anima a diferença (estilo em Tailwind).',
  tags:['FLIP','reorder','performance','tailwind'], hint:'clique em embaralhar',
  html:`
    <div class="x08 w-[230px]">
      <ul class="x08-l list-none m-0 mb-[12px] p-0 flex flex-col gap-[6px]">
        <li class="flex items-center gap-[10px] px-[12px] py-[9px] rounded-[9px] bg-[#1f1c17] border border-[#2a2620] text-[12.5px] text-[#dad5cb] will-change-transform" data-k="1"><i>1</i> Definir escopo</li>
        <li class="flex items-center gap-[10px] px-[12px] py-[9px] rounded-[9px] bg-[#1f1c17] border border-[#2a2620] text-[12.5px] text-[#dad5cb] will-change-transform" data-k="2"><i>2</i> Wireframe</li>
        <li class="flex items-center gap-[10px] px-[12px] py-[9px] rounded-[9px] bg-[#1f1c17] border border-[#2a2620] text-[12.5px] text-[#dad5cb] will-change-transform" data-k="3"><i>3</i> UI kit</li>
        <li class="flex items-center gap-[10px] px-[12px] py-[9px] rounded-[9px] bg-[#1f1c17] border border-[#2a2620] text-[12.5px] text-[#dad5cb] will-change-transform" data-k="4"><i>4</i> Protótipo</li>
        <li class="flex items-center gap-[10px] px-[12px] py-[9px] rounded-[9px] bg-[#1f1c17] border border-[#2a2620] text-[12.5px] text-[#dad5cb] will-change-transform" data-k="5"><i>5</i> Handoff</li>
      </ul>
      <button class="x08-b w-full p-[9px] rounded-[9px] bg-[#2b2721] text-[#e8e5df] text-[12px] font-semibold">Embaralhar</button>
    </div>`,
  css:`
    .x08-l i{width:19px;height:19px;border-radius:6px;background:#d4af3722;color:#d4af37;
      display:grid;place-items:center;font-style:normal;font-size:10.5px;font-family:var(--mono)}`,
  js:function(root,ctx){
    var ul = root.querySelector('.x08-l');
    ctx.on(root.querySelector('.x08-b'),'click',function(){
      var items = Array.prototype.slice.call(ul.children);

      // FIRST — posição atual
      var first = items.map(function(el){ return el.getBoundingClientRect().top; });

      // embaralha o DOM
      items.slice().sort(function(){ return Math.random() - .5; })
           .forEach(function(el){ ul.appendChild(el); });

      // LAST + INVERT + PLAY
      items.forEach(function(el,i){
        var d = first[i] - el.getBoundingClientRect().top;
        if (!d) return;
        el.animate(
          [{ transform:'translateY(' + d + 'px)' }, { transform:'none' }],
          { duration:520, easing:'cubic-bezier(.22,1,.36,1)' }
        );
      });
    });
  }
},

{
  id:'x09', cat:'estado', title:'Pull to refresh',
  desc:'Arraste para baixo: o indicador gira conforme a distância e solta o loading (estilo em Tailwind).',
  tags:['pull','pointer','mobile','tailwind'], hint:'arraste para baixo',
  html:`
    <div class="x09 relative w-[210px] h-full overflow-hidden touch-none cursor-grab active:cursor-grabbing">
      <div class="x09-ind absolute top-[8px] left-1/2 ml-[-15px] w-[30px] h-[30px] rounded-full bg-[#211e18] border border-[#2e2a22] grid place-items-center opacity-0"><svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v6h-6"/></svg></div>
      <div class="x09-list py-[14px] will-change-transform">
        <div class="x09-r"><i></i><span>Nova mensagem de Ana</span></div>
        <div class="x09-r"><i></i><span>Build #482 concluído</span></div>
        <div class="x09-r"><i></i><span>Fatura disponível</span></div>
        <div class="x09-r"><i></i><span>3 comentários novos</span></div>
      </div>
    </div>`,
  css:`
    .x09-ind svg{width:15px;height:15px;fill:none;stroke:#d4af37;stroke-width:2;stroke-linecap:round}
    .x09-ind.spin svg{animation:x09 .8s linear infinite}
    .x09-r{display:flex;align-items:center;gap:10px;padding:11px 14px;border-bottom:1px solid #221f19}
    .x09-r i{width:8px;height:8px;border-radius:50%;background:#d4af37;flex:none}
    .x09-r span{font-size:12px;color:#bdb8ad}
    .x09-r.new{animation:x09n .5s cubic-bezier(.22,1,.36,1)}
    @keyframes x09{to{transform:rotate(360deg)}}
    @keyframes x09n{from{opacity:0;transform:translateY(-12px)}}`,
  js:function(root,ctx){
    var box = root.querySelector('.x09'),
        list = root.querySelector('.x09-list'),
        ind = root.querySelector('.x09-ind'),
        icon = ind.querySelector('svg'),
        y0 = 0, d = 0, down = false, busy = false, n = 5;

    ctx.on(box,'pointerdown',function(e){
      if (busy) return; down = true; y0 = e.clientY; box.setPointerCapture(e.pointerId);
      list.style.transition = ind.style.transition = 'none';
    });
    ctx.on(box,'pointermove',function(e){
      if (!down) return;
      d = Math.max(0, (e.clientY - y0) * .5);
      d = Math.min(d, 70);
      list.style.transform = 'translateY(' + d + 'px)';
      ind.style.opacity = Math.min(1, d / 40);
      ind.style.transform = 'translateY(' + (d * .5) + 'px)';
      icon.style.transform = 'rotate(' + (d * 5) + 'deg)';
    });
    ctx.on(box,'pointerup',function(){
      if (!down) return;
      down = false;
      list.style.transition = ind.style.transition = 'transform .45s cubic-bezier(.22,1,.36,1),opacity .3s';
      if (d > 48){
        busy = true; ind.classList.add('spin');
        list.style.transform = 'translateY(34px)';
        ind.style.transform = 'translateY(14px)'; ind.style.opacity = 1;
        ctx.wait(function(){
          var r = document.createElement('div');
          r.className = 'x09-r new';
          r.innerHTML = '<i></i><span>Item novo #' + (++n) + '</span>';
          list.prepend(r);
          list.style.transform = ''; ind.style.opacity = 0; ind.style.transform = '';
          ind.classList.remove('spin'); busy = false;
        }, 1200);
      } else {
        list.style.transform = ''; ind.style.opacity = 0; ind.style.transform = '';
      }
      d = 0;
    });
  }
},

{
  id:'x10', cat:'estado', title:'UI otimista',
  desc:'O item aparece imediatamente em estado "pendente" e confirma depois (estilo em Tailwind).',
  tags:['optimistic','pending','UX','tailwind'], hint:'clique em adicionar',
  html:`
    <div class="x10 w-[220px]">
      <ul class="x10-l list-none m-0 mb-[12px] p-0 flex flex-col gap-[6px]">
        <li><b>Comprar café</b><s>ok</s></li>
        <li><b>Renovar domínio</b><s>ok</s></li>
      </ul>
      <button class="x10-b w-full p-[9px] rounded-[9px] bg-[#d4af37] text-[#1b1813] text-[12px] font-bold">+ Adicionar tarefa</button>
    </div>`,
  css:`
    .x10-l li{display:flex;align-items:center;gap:8px;padding:10px 12px;border-radius:9px;
      background:#1f1c17;border:1px solid #2a2620;font-size:12.5px;color:#dad5cb;
      animation:x10in .45s cubic-bezier(.22,1,.36,1)}
    .x10-l li b{font-weight:500;flex:1}
    .x10-l s{text-decoration:none;font-size:9.5px;font-family:var(--mono);color:#5cc88f;
      border:1px solid #5cc88f44;border-radius:5px;padding:1px 5px}
    .x10-l li.pend{opacity:.55;border-style:dashed}
    .x10-l li.pend s{color:#e8c96a;border-color:#e8c96a44}
    .x10-l li.pend b::after{content:"";display:inline-block;width:5px;height:5px;border-radius:50%;
      background:#e8c96a;margin-left:6px;animation:x10p .9s ease-in-out infinite}
    @keyframes x10in{from{opacity:0;transform:translateY(-8px) scale(.97)}}
    @keyframes x10p{0%,100%{opacity:.3}50%{opacity:1}}`,
  js:function(root,ctx){
    var ul = root.querySelector('.x10-l'), n = 0;
    var nomes = ['Revisar contrato','Subir para produção','Ligar pro cliente','Fechar sprint'];
    ctx.on(root.querySelector('.x10-b'),'click',function(){
      var li = document.createElement('li');
      li.className = 'pend';
      li.innerHTML = '<b>' + nomes[n++ % nomes.length] + '</b><s>salvando</s>';
      ul.prepend(li);
      ctx.wait(function(){
        li.classList.remove('pend');
        li.querySelector('s').textContent = 'ok';
      }, 1200 + Math.random() * 700);
    });
  }
},

{
  id:'d01', cat:'dados', title:'Barras crescendo',
  desc:'Altura animada com stagger e o valor subindo junto no topo (estilo em Tailwind).',
  tags:['chart','stagger','transition','tailwind'], hint:'passe o mouse',
  html:`
    <div class="d01">
      <div class="d01-ch flex items-end gap-[10px] h-[150px]">
        <div class="d01-b relative w-[26px] h-full flex flex-col justify-end" style="--v:62"><b>62</b><i></i><small>Jan</small></div>
        <div class="d01-b relative w-[26px] h-full flex flex-col justify-end" style="--v:88"><b>88</b><i></i><small>Fev</small></div>
        <div class="d01-b relative w-[26px] h-full flex flex-col justify-end" style="--v:41"><b>41</b><i></i><small>Mar</small></div>
        <div class="d01-b relative w-[26px] h-full flex flex-col justify-end" style="--v:95"><b>95</b><i></i><small>Abr</small></div>
        <div class="d01-b relative w-[26px] h-full flex flex-col justify-end" style="--v:73"><b>73</b><i></i><small>Mai</small></div>
        <div class="d01-b relative w-[26px] h-full flex flex-col justify-end" style="--v:100"><b>100</b><i></i><small>Jun</small></div>
      </div>
    </div>`,
  css:`
    .d01-b i{display:block;height:0;border-radius:6px 6px 3px 3px;
      background:linear-gradient(#d4af37,#b8871f);
      transition:height 1s cubic-bezier(.22,1,.36,1),filter .25s}
    .d01-b.go i{height:calc(var(--v) * .87%)}
    .d01-b:hover i{filter:brightness(1.35)}
    .d01-b b{position:absolute;left:0;right:0;text-align:center;font-size:10px;font-family:var(--mono);
      color:#948f86;opacity:0;transition:all .5s cubic-bezier(.22,1,.36,1);
      bottom:calc(var(--v) * .87%)}
    .d01-b.go b{opacity:1;transform:translateY(-4px)}
    .d01-b:hover b{color:#d4af37}
    .d01-b small{position:absolute;bottom:-18px;left:0;right:0;text-align:center;font-size:9.5px;color:#66625a}`,
  js:function(root,ctx){
    root.querySelectorAll('.d01-b').forEach(function(b,i){
      ctx.wait(function(){ b.classList.add('go'); }, 80 + i * 90);
    });
  }
},

{
  id:'d02', cat:'dados', title:'Donut desenhando',
  desc:'stroke-dashoffset em círculos SVG + contador no centro (estilo em Tailwind).',
  tags:['SVG','donut','dashoffset','tailwind'],
  html:`
    <div class="d02 relative w-[170px] h-[170px] grid place-items-center">
      <svg class="w-[170px] h-[170px] -rotate-90" viewBox="0 0 120 120">
        <circle class="tr" cx="60" cy="60" r="50"/>
        <circle class="a"  cx="60" cy="60" r="50"/>
        <circle class="b"  cx="60" cy="60" r="50"/>
        <circle class="c"  cx="60" cy="60" r="50"/>
      </svg>
      <div class="d02-mid absolute text-center"><b class="text-[28px] font-extrabold text-[#f4f1eb] tabular-nums">0</b><small class="block text-[10px] text-[#6b675f] tracking-[.05em]">%&nbsp;concluído</small></div>
    </div>`,
  css:`
    .d02 circle{fill:none;stroke-width:11;stroke-linecap:round}
    .d02 .tr{stroke:#1f1c17}
    .d02 .a{stroke:#d4af37}
    .d02 .b{stroke:#b08ac9}
    .d02 .c{stroke:#5cc88f}`,
  js:function(root,ctx){
    var C = 2 * Math.PI * 50;                        // circunferência
    var segs = [{ el:'.a', v:.46, off:0 }, { el:'.b', v:.28, off:.46 }, { el:'.c', v:.14, off:.74 }];
    segs.forEach(function(s,i){
      var el = root.querySelector(s.el);
      el.style.strokeDasharray = C;
      el.style.strokeDashoffset = C;
      el.style.transform = 'rotate(' + (s.off * 360) + 'deg)';
      el.style.transformOrigin = '60px 60px';
      el.style.transition = 'stroke-dashoffset 1.1s cubic-bezier(.22,1,.36,1)';
      ctx.wait(function(){ el.style.strokeDashoffset = C * (1 - s.v); }, 120 + i * 260);
    });
    var out = root.querySelector('.d02-mid b'), t0 = null, to = 88;
    function f(t){
      if (!t0) t0 = t;
      var k = Math.min(1, (t - t0) / 1700);
      out.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
      if (k < 1) ctx.raf(f);
    }
    ctx.raf(f);
  }
},

{
  id:'d03', cat:'dados', title:'Linha se desenhando + área',
  desc:'O path é traçado, a área entra em fade e os pontos aparecem em cascata (container em Tailwind).',
  tags:['SVG','path','area','tailwind'],
  html:`<svg class="d03 w-[250px] h-[130px] overflow-visible" viewBox="0 0 260 130" preserveAspectRatio="none"></svg>`,
  css:`
    .d03 .grid{stroke:#1d1d28;stroke-width:1}
    .d03 .area{fill:url(#d03g);opacity:0;transition:opacity .8s ease .5s}
    .d03.go .area{opacity:1}
    .d03 .line{fill:none;stroke:#d4af37;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;
      stroke-dasharray:var(--l);stroke-dashoffset:var(--l);
      transition:stroke-dashoffset 1.5s cubic-bezier(.65,0,.35,1)}
    .d03.go .line{stroke-dashoffset:0}
    .d03 .dot{fill:#0d0c0b;stroke:#d4af37;stroke-width:2.2;opacity:0;transform:scale(0);
      transform-box:fill-box;transform-origin:center;
      transition:opacity .3s,transform .45s cubic-bezier(.34,1.56,.64,1)}
    .d03.go .dot{opacity:1;transform:scale(1)}`,
  js:function(root,ctx){
    var svg = root.querySelector('.d03');
    var vals = [42, 58, 35, 72, 55, 90, 68, 105];
    var W = 260, H = 130, step = W / (vals.length - 1);
    var pts = vals.map(function(v,i){ return [i * step, H - (v / 120) * (H - 14) - 7]; });
    var d = pts.map(function(p,i){ return (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' ');

    svg.innerHTML =
      '<defs><linearGradient id="d03g" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#d4af37" stop-opacity=".38"/>' +
        '<stop offset="1" stop-color="#d4af37" stop-opacity="0"/></linearGradient></defs>' +
      [0,1,2,3].map(function(i){ var y = 12 + i * 34; return '<line class="grid" x1="0" y1="'+y+'" x2="260" y2="'+y+'"/>'; }).join('') +
      '<path class="area" d="' + d + ' L' + W + ' ' + H + ' L0 ' + H + 'Z"/>' +
      '<path class="line" d="' + d + '"/>' +
      pts.map(function(p,i){
        return '<circle class="dot" cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="3.4" style="transition-delay:'+(700+i*70)+'ms"/>';
      }).join('');

    var line = svg.querySelector('.line');
    line.style.setProperty('--l', line.getTotalLength());
    ctx.wait(function(){ svg.classList.add('go'); }, 80);
  }
},

{
  id:'d04', cat:'dados', title:'Tooltip que segue o dado',
  desc:'Encontra o ponto mais próximo do cursor e move o marcador com transição (estilo em Tailwind).',
  tags:['chart','tooltip','hover','tailwind'], hint:'passe o mouse',
  html:`
    <div class="d04 relative w-[250px] h-[120px] cursor-crosshair">
      <svg class="w-full h-full overflow-visible" viewBox="0 0 260 120" preserveAspectRatio="none"></svg>
      <div class="d04-cur absolute top-0 bottom-0 w-px bg-[#b08ac955] opacity-0 transition-[transform_.18s_cubic-bezier(.22,1,.36,1),opacity_.2s]"></div>
      <div class="d04-tip absolute top-[-4px] left-0 px-[9px] py-[5px] rounded-[8px] bg-[#f0ede7] text-[#0e0d0c] text-[11px] font-bold whitespace-nowrap pointer-events-none opacity-0 transition-[transform_.18s_cubic-bezier(.22,1,.36,1),opacity_.2s]"><b>0</b><span>—</span></div>
    </div>`,
  css:`
    .d04 .ln{fill:none;stroke:#b08ac9;stroke-width:2.4;stroke-linejoin:round}
    .d04 .ar{fill:#b08ac91a}
    .d04-cur::after{content:"";position:absolute;left:-4.5px;width:9px;height:9px;border-radius:50%;
      background:#0d0c0b;border:2.2px solid #b08ac9;top:var(--dy,0);margin-top:-4.5px;
      transition:top .18s cubic-bezier(.22,1,.36,1)}
    .d04-tip span{font-weight:400;color:#635f58;margin-left:5px}
    .d04:hover .d04-cur,.d04:hover .d04-tip{opacity:1}`,
  js:function(root,ctx){
    var box = root.querySelector('.d04'),
        svg = box.querySelector('svg'),
        cur = box.querySelector('.d04-cur'),
        tip = box.querySelector('.d04-tip');
    var meses = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago'],
        vals  = [1240, 1810, 1520, 2390, 2050, 3120, 2870, 3640];
    var W = 260, H = 120, mx = Math.max.apply(null, vals), step = W / (vals.length - 1);
    var pts = vals.map(function(v,i){ return [i * step, H - (v / mx) * (H - 16) - 8]; });
    var d = pts.map(function(p,i){ return (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' ');
    svg.innerHTML = '<path class="ar" d="' + d + ' L260 120 L0 120Z"/><path class="ln" d="' + d + '"/>';

    ctx.on(box,'mousemove',function(e){
      var r = box.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width * W;
      var i = Math.max(0, Math.min(pts.length - 1, Math.round(x / step)));
      var px = pts[i][0] / W * r.width, py = pts[i][1] / H * r.height;
      cur.style.transform = 'translateX(' + px + 'px)';
      cur.style.setProperty('--dy', py + 'px');
      tip.innerHTML = '<b>R$ ' + vals[i].toLocaleString('pt-BR') + '</b><span>' + meses[i] + '</span>';
      tip.style.transform = 'translate(' + Math.min(r.width - 100, Math.max(0, px - 40)) + 'px,' + Math.max(0, py - 34) + 'px)';
    });
  }
},

{
  id:'d05', cat:'dados', title:'Transição entre datasets',
  desc:'Interpolação dos valores antigos para os novos — nunca corte seco (estilo em Tailwind).',
  tags:['morph','interpolate','rAF','tailwind'], hint:'clique para trocar',
  html:`
    <div class="d05 w-[250px]">
      <svg class="w-full h-[70px] block" viewBox="0 0 250 110" preserveAspectRatio="none"><path class="pp"/></svg>
      <div class="d05-bars flex items-end gap-[6px] h-[52px] mt-[6px]"></div>
      <div class="d05-tabs flex gap-[4px] mt-[12px]">
        <button class="on flex-1 p-[6px] rounded-[7px] text-[11px] text-[#8a857c] bg-[#1d1b16] transition-all duration-200">2024</button>
        <button class="flex-1 p-[6px] rounded-[7px] text-[11px] text-[#8a857c] bg-[#1d1b16] transition-all duration-200">2025</button>
        <button class="flex-1 p-[6px] rounded-[7px] text-[11px] text-[#8a857c] bg-[#1d1b16] transition-all duration-200">meta</button>
      </div>
    </div>`,
  css:`
    .d05 .pp{fill:none;stroke:#5cc88f;stroke-width:2.4;stroke-linejoin:round;stroke-linecap:round}
    .d05-bars i{flex:1;border-radius:4px 4px 2px 2px;background:linear-gradient(#5cc88f,#2f7d55)}
    .d05-tabs button.on{background:#5cc88f22;color:#5cc88f}`,
  js:function(root,ctx){
    var sets = [
      [30, 55, 42, 70, 60, 85, 74],
      [80, 45, 92, 38, 70, 55, 96],
      [50, 58, 66, 74, 82, 90, 98]
    ];
    var cur = sets[0].slice(), goal = sets[0].slice();
    var path = root.querySelector('.pp'), bars = root.querySelector('.d05-bars');
    bars.innerHTML = cur.map(function(){ return '<i></i>'; }).join('');
    var els = bars.querySelectorAll('i');

    root.querySelectorAll('.d05-tabs button').forEach(function(b,i){
      ctx.on(b,'click',function(){
        root.querySelectorAll('.d05-tabs button').forEach(function(x){ x.classList.remove('on'); });
        b.classList.add('on');
        goal = sets[i].slice();
      });
    });

    ctx.loop(function(){
      var d = '';
      cur.forEach(function(v,i){
        cur[i] += (goal[i] - v) * .09;                     // interpolação exponencial
        var x = i * (250 / (cur.length - 1));
        var y = 105 - (cur[i] / 100) * 96;
        d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
        els[i].style.height = cur[i].toFixed(1) + '%';
      });
      path.setAttribute('d', d);
    });
  }
},

{
  id:'d06', cat:'dados', title:'Heatmap em onda',
  desc:'As células acendem numa diagonal — leitura guiada em vez de tudo de uma vez (estilo em Tailwind).',
  tags:['heatmap','stagger','grid','tailwind'],
  html:`<div class="d06 grid grid-cols-[repeat(14,1fr)] gap-[4px] w-[250px]"></div>`,
  css:`
    .d06 i{aspect-ratio:1;border-radius:3px;background:#1c1a15;
      transform:scale(.3);opacity:0;
      animation:d06 .5s cubic-bezier(.34,1.56,.64,1) forwards;
      transition:transform .2s,filter .2s}
    .d06 i:hover{transform:scale(1.35);filter:brightness(1.5);z-index:2}
    @keyframes d06{to{transform:scale(1);opacity:1}}`,
  js:function(root){
    var box = root.querySelector('.d06'), C = 14, R = 7, out = '';
    var cores = ['#1c1a15','#24382c','#2b6b4d','#3f8a63','#5cc88f'];
    for (var r = 0; r < R; r++){
      for (var c = 0; c < C; c++){
        var v = Math.max(0, Math.min(4, Math.round(
          (Math.sin(c * .5) + Math.cos(r * .8)) * 1.2 + Math.random() * 2
        )));
        out += '<i style="background:' + cores[v] + ';animation-delay:' + ((c + r) * 34) + 'ms"></i>';
      }
    }
    box.innerHTML = out;
  }
},

{
  id:'a01', cat:'avancado', title:'Objeto 3D em CSS puro',
  desc:'Cubo com preserve-3d girando sozinho — e arrastável com o mouse (estilo em Tailwind).',
  tags:['3D','preserve-3d','drag','tailwind'], hint:'arraste o cubo',
  html:`
    <div class="a01 w-full h-full grid place-items-center [perspective:700px] cursor-grab active:cursor-grabbing">
      <div class="a01-sc [transform-style:preserve-3d]">
        <div class="a01-cb relative w-[96px] h-[96px] [transform-style:preserve-3d]">
          <span class="f1">01</span><span class="f2">02</span><span class="f3">03</span>
          <span class="f4">04</span><span class="f5">05</span><span class="f6">06</span>
        </div>
      </div>
    </div>`,
  css:`
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
  desc:'A imagem é redesenhada em fatias deslocadas por uma onda centrada no cursor (container em Tailwind).',
  tags:['canvas','displacement','slices','tailwind'], stage:'flush', hint:'mova o mouse',
  html:`<canvas class="a02 w-full h-full block bg-[#090807] cursor-crosshair"></canvas>`,
  css:``,
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
  desc:'Algoritmo clássico de propagação de ondas em dois buffers, deformando a imagem (container em Tailwind).',
  tags:['canvas','simulation','pixels','tailwind'], stage:'flush', hint:'clique e arraste',
  html:`<canvas class="a03 w-full h-full block cursor-pointer [image-rendering:auto]"></canvas>`,
  css:``,
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
  desc:'Grade que se repete nos dois eixos por módulo — nunca acaba (estilo em Tailwind).',
  tags:['drag','infinite','modulo','tailwind'], stage:'flush', hint:'arraste em qualquer direção',
  html:`
    <div class="a04 relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing bg-[#0a0908]">
      <div class="a04-w absolute inset-0"></div>
      <b class="a04-h absolute left-[10px] top-[8px] [font-family:var(--mono)] text-[9.5px] tracking-[.2em] uppercase text-[#453f38] pointer-events-none">drag</b>
    </div>`,
  css:`
    .a04-t{position:absolute;width:92px;height:70px;border-radius:10px;overflow:hidden;
      display:grid;place-items:center;font-family:var(--mono);font-size:12px;color:#ffffff66;
      border:1px solid #ffffff14;will-change:transform;user-select:none}`,
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
  desc:'Dois paths com o mesmo número de pontos: basta interpolar coordenada a coordenada (estilo em Tailwind).',
  tags:['SVG','morph','interpolate','tailwind'], hint:'clique nas formas',
  html:`
    <div class="a05 flex flex-col items-center gap-[10px]">
      <svg class="w-[150px] h-[150px]" viewBox="0 0 200 200"><path class="a05-p fill-[#d4af37] drop-shadow-[0_6px_18px_#d4af3733]"/></svg>
      <div class="a05-btns flex gap-[5px]">
        <button class="on px-[11px] py-[5px] rounded-[7px] text-[11px] text-[#8a857c] bg-[#1d1b16] transition-all duration-200">estrela</button>
        <button class="px-[11px] py-[5px] rounded-[7px] text-[11px] text-[#8a857c] bg-[#1d1b16] transition-all duration-200">flor</button>
        <button class="px-[11px] py-[5px] rounded-[7px] text-[11px] text-[#8a857c] bg-[#1d1b16] transition-all duration-200">engrenagem</button>
      </div>
    </div>`,
  css:`
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
  desc:'A rolagem real é interpolada; o conteúdo se move com atraso e inércia (estilo em Tailwind).',
  tags:['lerp','smooth scroll','parallax','tailwind'], stage:'scroll flush', hint:'role ↓',
  html:`
    <div class="a06 h-[820px] relative">
      <div class="a06-vp sticky top-0 h-[230px] overflow-hidden bg-[linear-gradient(#0e0d0c,#161310)]">
        <div class="a06-in px-[20px] py-[24px] flex flex-col gap-[12px]">
          <h5 class="text-[20px] font-extrabold tracking-[-.03em] text-[#f4f1eb] will-change-transform" data-d="0.4">Suave</h5>
          <p class="text-[12.5px] text-[#8a857c] leading-[1.6] will-change-transform" data-d="0.7">A posição desejada é o scrollTop real; a exibida persegue com lerp.</p>
          <div class="a06-card px-[14px] py-[12px] rounded-[10px] bg-[#241e12] border border-[#3b3119] text-[12px] text-[#c8bfa6] will-change-transform" data-d="1.25">camada rápida</div>
          <div class="a06-card b px-[14px] py-[12px] rounded-[10px] bg-[#362540] border border-[#55406b] text-[12px] text-[#ded0b8] will-change-transform" data-d="0.55">camada lenta</div>
          <h5 class="text-[20px] font-extrabold tracking-[-.03em] text-[#f4f1eb] will-change-transform" data-d="0.9">Inércia</h5>
          <p class="text-[12.5px] text-[#8a857c] leading-[1.6] will-change-transform" data-d="1.1">É o mesmo princípio do Lenis, Locomotive e afins.</p>
        </div>
      </div>
      <div class="a06-spacer"></div>
    </div>`,
  css:``,
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
  desc:'Uma corrente de pontos que se seguem — cada um mira no anterior (container em Tailwind).',
  tags:['canvas','trail','chain','tailwind'], stage:'flush', hint:'mova o mouse',
  html:`<canvas class="a07 w-full h-full block bg-[#090807] cursor-none"></canvas>`,
  css:``,
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
  desc:'Integração de Verlet + colisão entre círculos. ~40 linhas, sem Matter.js (container em Tailwind).',
  tags:['física','verlet','colisão','tailwind'], stage:'flush', hint:'clique para soltar',
  html:`<canvas class="a08 w-full h-full block bg-[#0d0c0b] cursor-pointer"></canvas>`,
  css:``,
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
  desc:'blur + contrast num filtro SVG faz os blobs se fundirem como líquido (estilo em Tailwind).',
  tags:['SVG filter','goo','blend','tailwind'], stage:'flush', hint:'mova o mouse',
  html:`
    <div class="a09 relative w-full h-full overflow-hidden bg-[#0a0908]">
      <svg width="0" height="0"><defs><filter id="a09goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="b"/>
        <feColorMatrix in="b" mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -11" result="g"/>
        <feBlend in="SourceGraphic" in2="g"/>
      </filter></defs></svg>
      <div class="a09-w absolute inset-0 [filter:url(#a09goo)]"></div>
    </div>`,
  css:`
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
  desc:'O tipo vira janela: background-clip:text com uma cena animada por trás (estilo em Tailwind).',
  tags:['background-clip','mask','scale','tailwind'], stage:'flush', hint:'passe o mouse',
  html:`
    <div class="a10 relative w-full h-full grid place-items-center bg-[#090807] overflow-hidden">
      <div class="a10-scene absolute inset-[-20%] blur-[14px] animate-[a10_11s_ease-in-out_infinite_alternate] bg-[radial-gradient(38%_44%_at_22%_30%,#c9762f,transparent_60%),radial-gradient(42%_40%_at_78%_26%,#b8871f,transparent_60%),radial-gradient(50%_46%_at_50%_82%,#b08ac9,transparent_62%),linear-gradient(120deg,#2a2340,#1c2a1e)]"></div>
      <h4 class="a10-t relative z-[2] text-[52px] font-extrabold tracking-[-.045em] text-[#0d0c0b] mix-blend-multiply transition-[letter-spacing_.6s_cubic-bezier(.22,1,.36,1),font-size_.6s_cubic-bezier(.22,1,.36,1)]">CINEMA</h4>
      <span class="a10-s absolute bottom-[16px] z-[3] [font-family:var(--mono)] text-[9.5px] tracking-[.24em] uppercase text-[#66625a]">o texto é a janela</span>
    </div>`,
  css:`
    .a10::after{content:"";position:absolute;inset:0;z-index:1;background:#090807;
      -webkit-mask:radial-gradient(120% 100% at 50% 50%,transparent 38%,#000 72%);
      mask:radial-gradient(120% 100% at 50% 50%,transparent 38%,#000 72%)}
    .a10:hover .a10-t{letter-spacing:.02em;font-size:56px}
    @keyframes a10{
      0%{transform:scale(1) rotate(0deg)}
      50%{transform:scale(1.25) rotate(6deg)}
      100%{transform:scale(1.1) rotate(-5deg)}}`
}

);
