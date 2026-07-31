/* ==========================================================
   06 · NAVEGAÇÃO & UI
   ========================================================== */
(window.ANIMDB = window.ANIMDB || []).push(

{
  id:'n01', cat:'nav', title:'Hambúrguer → X',
  desc:'Três traços viram um X. Quatro variações de morph.',
  tags:['menu','transform','CSS only'], hint:'clique nos ícones',
  html:`
    <div class="n01">
      <button class="n01-b v1"><i></i><i></i><i></i></button>
      <button class="n01-b v2"><i></i><i></i><i></i></button>
      <button class="n01-b v3"><i></i><i></i></button>
      <button class="n01-b v4"><i></i><i></i><i></i></button>
    </div>`,
  css:`
    .n01{display:flex;gap:14px}
    .n01-b{width:50px;height:50px;border-radius:14px;background:#1c1a15;border:1px solid #2b2721;
      display:grid;align-content:center;justify-items:center;gap:5px;transition:background .2s}
    .n01-b:hover{background:#242019}
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
  desc:'O painel entra por clip-path e os links sobem em cascata.',
  tags:['overlay','stagger','clip-path'], hint:'clique no menu',
  html:`
    <div class="n02">
      <header><b>ACME</b><button class="n02-t"><i></i><i></i></button></header>
      <div class="n02-p">
        <a style="--i:0">Trabalhos</a><a style="--i:1">Estúdio</a>
        <a style="--i:2">Serviços</a><a style="--i:3">Contato</a>
      </div>
    </div>`,
  css:`
    .n02{position:relative;width:100%;height:100%;overflow:hidden;background:#141312}
    .n02 header{position:relative;z-index:3;display:flex;align-items:center;justify-content:space-between;padding:16px}
    .n02 header b{font-size:15px;letter-spacing:-.02em;color:#f4f1eb;mix-blend-mode:difference}
    .n02-t{width:34px;height:34px;display:grid;align-content:center;justify-items:center;gap:6px}
    .n02-t i{width:20px;height:2px;background:#fff;border-radius:9px;mix-blend-mode:difference;
      transition:transform .4s cubic-bezier(.22,1,.36,1)}
    .n02.on .n02-t i:first-child{transform:translateY(4px) rotate(45deg)}
    .n02.on .n02-t i:last-child{transform:translateY(-4px) rotate(-45deg)}
    .n02-p{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;justify-content:center;gap:2px;
      padding:0 22px;background:linear-gradient(140deg,#d4af37,#b08ac9);
      clip-path:circle(0% at calc(100% - 32px) 32px);
      transition:clip-path .7s cubic-bezier(.76,0,.24,1)}
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
  desc:'Painel desliza, fundo escurece e desfoca, scroll travado.',
  tags:['drawer','backdrop-filter','slide'], hint:'clique em abrir',
  html:`
    <div class="n03">
      <div class="n03-bg"><b>Dashboard</b><p>Conteúdo por trás do drawer.</p><button class="n03-o">Abrir painel</button></div>
      <div class="n03-sh"></div>
      <aside class="n03-d">
        <b>Filtros</b>
        <label><input type="checkbox" checked> Disponível</label>
        <label><input type="checkbox"> Em promoção</label>
        <label><input type="checkbox"> Frete grátis</label>
        <button class="n03-c">Fechar</button>
      </aside>
    </div>`,
  css:`
    .n03{position:relative;width:100%;height:100%;overflow:hidden}
    .n03-bg{padding:20px;height:100%;background:#141312}
    .n03-bg b{font-size:16px;color:#eee}
    .n03-bg p{font-size:12.5px;color:#85807a;margin:6px 0 14px}
    .n03-o,.n03-c{padding:9px 16px;border-radius:9px;background:#d4af37;color:#1b1813;font-size:12.5px;font-weight:700}
    .n03-sh{position:absolute;inset:0;background:rgba(4,4,8,.6);opacity:0;pointer-events:none;
      backdrop-filter:blur(3px);transition:opacity .4s}
    .n03.on .n03-sh{opacity:1;pointer-events:auto}
    .n03-d{position:absolute;top:0;right:0;bottom:0;width:190px;padding:20px;background:#1b1915;
      border-left:1px solid #2a2620;display:flex;flex-direction:column;gap:12px;
      transform:translateX(100%);transition:transform .48s cubic-bezier(.22,1,.36,1);
      box-shadow:-20px 0 60px -30px #000}
    .n03.on .n03-d{transform:none}
    .n03-d b{font-size:14px;color:#f4f1eb}
    .n03-d label{display:flex;gap:8px;align-items:center;font-size:12.5px;color:#a5a099;
      opacity:0;transform:translateX(16px);transition:all .4s cubic-bezier(.22,1,.36,1)}
    .n03.on .n03-d label{opacity:1;transform:none}
    .n03.on .n03-d label:nth-of-type(1){transition-delay:.14s}
    .n03.on .n03-d label:nth-of-type(2){transition-delay:.2s}
    .n03.on .n03-d label:nth-of-type(3){transition-delay:.26s}
    .n03-c{margin-top:auto;background:#2b2721;color:#e8e5df}`,
  js:function(root,ctx){
    var box = root.querySelector('.n03');
    ctx.on(root.querySelector('.n03-o'),'click',function(){ box.classList.add('on'); });
    ctx.on(root.querySelector('.n03-c'),'click',function(){ box.classList.remove('on'); });
    ctx.on(root.querySelector('.n03-sh'),'click',function(){ box.classList.remove('on'); });
  }
},

{
  id:'n04', cat:'nav', title:'Mega-menu',
  desc:'Abre com altura animada e os itens entram escalonados. Fecha com delay.',
  tags:['dropdown','stagger','height'], hint:'passe o mouse',
  html:`
    <div class="n04">
      <nav class="n04-n">
        <a>Início</a>
        <a class="n04-tr">Produtos ▾</a>
        <a>Preço</a>
      </nav>
      <div class="n04-m">
        <div class="n04-col"><b>Para times</b><span>Colaboração</span><span>Permissões</span><span>SSO</span></div>
        <div class="n04-col"><b>Para devs</b><span>API</span><span>Webhooks</span><span>CLI</span></div>
      </div>
    </div>`,
  css:`
    .n04{width:100%;height:100%;background:#131211}
    .n04-n{display:flex;gap:18px;padding:16px 20px;font-size:13px;color:#a5a099;border-bottom:1px solid #211e18}
    .n04-n a{cursor:pointer;transition:color .2s}
    .n04-n a:hover{color:#fff}
    .n04-m{display:grid;grid-template-columns:1fr 1fr;gap:18px;padding:0 20px;
      max-height:0;opacity:0;overflow:hidden;
      transition:max-height .45s cubic-bezier(.22,1,.36,1),opacity .3s,padding .45s}
    .n04.on .n04-m{max-height:180px;opacity:1;padding:18px 20px}
    .n04-col b{display:block;font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:#d4af37;margin-bottom:8px}
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
  desc:'O indicador mede a posição do botão ativo — nada de larguras fixas.',
  tags:['tabs','FLIP','measure'], hint:'clique nas abas',
  html:`
    <div class="n05">
      <div class="n05-t"><span class="n05-ind"></span>
        <button class="on">Visão geral</button><button>Métricas</button><button>Time</button><button>API</button>
      </div>
      <div class="n05-body"><b>Visão geral</b><p>O conteúdo troca com um fade curto.</p></div>
    </div>`,
  css:`
    .n05{width:250px}
    .n05-t{position:relative;display:flex;gap:2px;padding:4px;border-radius:11px;background:#1b1915;border:1px solid #28241900}
    .n05-ind{position:absolute;top:4px;bottom:4px;left:0;width:0;border-radius:8px;background:#2c2820;
      transition:transform .42s cubic-bezier(.22,1,.36,1),width .42s cubic-bezier(.22,1,.36,1)}
    .n05-t button{position:relative;z-index:2;padding:7px 11px;font-size:11.5px;color:#8f8a80;
      border-radius:8px;transition:color .25s;white-space:nowrap}
    .n05-t button.on{color:#f5f2ec}
    .n05-body{margin-top:14px;padding:14px;border-radius:11px;background:#181611;border:1px solid #23201a}
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
  desc:'Altura automática animável sem medir nada em JS. O truque moderno.',
  tags:['grid-template-rows','accordion','CSS'], hint:'clique nos itens',
  html:`
    <div class="n06">
      <div class="n06-i open"><button>Como funciona o teste grátis?<i></i></button><div class="n06-c"><p>14 dias, sem cartão. No fim escolhe um plano ou a conta vira somente-leitura.</p></div></div>
      <div class="n06-i"><button>Posso cancelar quando quiser?<i></i></button><div class="n06-c"><p>Sim. O cancelamento vale até o fim do ciclo já pago.</p></div></div>
      <div class="n06-i"><button>Vocês emitem nota fiscal?<i></i></button><div class="n06-c"><p>Emitimos NF-e automaticamente todo dia 1º.</p></div></div>
    </div>`,
  css:`
    .n06{width:250px;display:flex;flex-direction:column;gap:8px}
    .n06-i{border:1px solid #28241900;border-radius:11px;background:#191712;overflow:hidden;
      border:1px solid #24211a}
    .n06-i button{width:100%;display:flex;align-items:center;gap:10px;padding:13px 14px;
      font-size:12.5px;color:#e8e5df;text-align:left}
    .n06-i i{margin-left:auto;width:11px;height:11px;position:relative;flex:none}
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
  desc:'Entrada com mola, saída rápida. Fecha no ESC e no clique fora.',
  tags:['modal','spring','ESC'], hint:'clique para abrir',
  html:`
    <div class="n07">
      <button class="n07-o">Excluir projeto</button>
      <div class="n07-w">
        <div class="n07-bd"></div>
        <div class="n07-m">
          <b>Excluir “Aurora”?</b>
          <p>Essa ação não pode ser desfeita. Todos os 42 arquivos serão removidos.</p>
          <div class="n07-a"><button class="c">Cancelar</button><button class="d">Excluir</button></div>
        </div>
      </div>
    </div>`,
  css:`
    .n07{position:relative;width:100%;height:100%;display:grid;place-items:center}
    .n07-o{padding:10px 18px;border-radius:9px;background:#22201a;border:1px solid #34301f;
      color:#efece6;font-size:12.5px;font-weight:600}
    .n07-w{position:absolute;inset:0;display:grid;place-items:center;pointer-events:none}
    .n07-bd{position:absolute;inset:0;background:rgba(4,4,8,.65);opacity:0;transition:opacity .3s}
    .n07-m{position:relative;width:230px;padding:20px;border-radius:14px;background:#181820;border:1px solid #2e2a22;
      opacity:0;transform:scale(.9) translateY(10px);
      transition:opacity .2s,transform .25s cubic-bezier(.65,0,.35,1)}
    .n07.on .n07-w{pointer-events:auto}
    .n07.on .n07-bd{opacity:1}
    .n07.on .n07-m{opacity:1;transform:none;transition:opacity .28s,transform .45s cubic-bezier(.34,1.56,.64,1)}
    .n07-m b{font-size:15px;color:#f5f2ec}
    .n07-m p{font-size:12px;color:#8a857c;margin-top:6px;line-height:1.55}
    .n07-a{display:flex;gap:8px;margin-top:16px;justify-content:flex-end}
    .n07-a button{padding:8px 14px;border-radius:8px;font-size:12px;font-weight:600}
    .n07-a .c{background:#2b2721;color:#e8e5df}
    .n07-a .d{background:#e5645f;color:#2a0710}`,
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
  desc:'Entram pela direita, empurram os anteriores e saem sozinhos.',
  tags:['toast','stack','timeout'], hint:'clique para disparar',
  html:`
    <div class="n08">
      <button class="n08-b">Disparar toast</button>
      <div class="n08-st"></div>
    </div>`,
  css:`
    .n08{position:relative;width:100%;height:100%;display:grid;place-items:center;padding:14px}
    .n08-b{padding:10px 18px;border-radius:9px;background:#d4af37;color:#1b1813;font-size:12.5px;font-weight:700}
    .n08-st{position:absolute;right:12px;bottom:12px;display:flex;flex-direction:column;gap:8px;align-items:flex-end}
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
  desc:'O ícone ativo sobe, a bolha desliza e o rótulo aparece.',
  tags:['mobile','indicator','spring'], hint:'clique nos ícones',
  html:`
    <div class="n09">
      <div class="n09-bar">
        <span class="n09-bub"></span>
        <button class="on"><svg viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5V21H3z"/></svg><b>Início</b></button>
        <button><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><b>Buscar</b></button>
        <button><svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8z"/></svg><b>Salvos</b></button>
        <button><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg><b>Perfil</b></button>
      </div>
    </div>`,
  css:`
    .n09-bar{position:relative;display:flex;gap:4px;padding:10px 12px;border-radius:18px;
      background:#1a1814;border:1px solid #28241900;border:1px solid #242119}
    .n09-bub{position:absolute;top:8px;left:0;width:52px;height:44px;border-radius:13px;
      background:linear-gradient(140deg,#d4af3722,#b08ac922);border:1px solid #d4af3744;
      transition:transform .5s cubic-bezier(.34,1.4,.64,1)}
    .n09-bar button{position:relative;z-index:2;width:52px;height:44px;display:grid;place-items:center;gap:0;
      color:#736f68;transition:color .3s}
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
  desc:'transform-origin no canto do gatilho + itens em cascata.',
  tags:['dropdown','transform-origin','stagger'], hint:'clique no botão',
  html:`
    <div class="n10">
      <button class="n10-t">Ordenar por <i>▾</i></button>
      <ul class="n10-m">
        <li>Mais recentes</li><li>Mais antigos</li><li>A–Z</li><li>Preço ↑</li><li>Preço ↓</li>
      </ul>
    </div>`,
  css:`
    .n10{position:relative}
    .n10-t{display:flex;align-items:center;gap:8px;padding:10px 16px;border-radius:10px;
      background:#1d1b16;border:1px solid #2f2b23;color:#ece9e3;font-size:12.5px;font-weight:600}
    .n10-t i{font-style:normal;color:#d4af37;transition:transform .35s cubic-bezier(.22,1,.36,1)}
    .n10.on .n10-t i{transform:rotate(180deg)}
    .n10-m{position:absolute;top:calc(100% + 8px);left:0;width:150px;margin:0;padding:6px;list-style:none;
      background:#1c1a15;border:1px solid #2d2921;border-radius:11px;box-shadow:0 20px 50px -25px #000;
      transform-origin:0 0;transform:scale(.86) translateY(-6px);opacity:0;pointer-events:none;
      transition:opacity .2s,transform .38s cubic-bezier(.34,1.4,.64,1)}
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
  desc:'Pointer events + atrito + snap no slide mais próximo.',
  tags:['drag','inertia','snap'], hint:'arraste ←→',
  html:`
    <div class="n11">
      <div class="n11-tr">
        <div class="n11-s" style="--c:#2b2618">01</div>
        <div class="n11-s" style="--c:#362540">02</div>
        <div class="n11-s" style="--c:#1e352a">03</div>
        <div class="n11-s" style="--c:#3f2a1d">04</div>
        <div class="n11-s" style="--c:#2c2822">05</div>
      </div>
      <div class="n11-dots"><i class="on"></i><i></i><i></i><i></i><i></i></div>
    </div>`,
  css:`
    .n11{width:100%;height:100%;display:flex;flex-direction:column;justify-content:center;gap:14px;
      overflow:hidden;cursor:grab}
    .n11.drag{cursor:grabbing}
    .n11-tr{display:flex;gap:12px;padding-left:20px;will-change:transform}
    .n11-s{flex:none;width:140px;height:120px;border-radius:14px;background:var(--c);
      display:grid;place-items:center;font-family:var(--mono);font-size:22px;color:#ffffff44;
      border:1px solid #ffffff12;user-select:none;transition:transform .4s cubic-bezier(.22,1,.36,1)}
    .n11-dots{display:flex;gap:6px;justify-content:center}
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
}

);
